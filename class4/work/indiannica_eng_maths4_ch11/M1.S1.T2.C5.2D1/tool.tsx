/* ═══ M1.S1.T2.C5.2D1 · ruler_bench · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ mascot, action kit, font kit) is prepended at build: the header, canvas, key, drawer, bubble,
   Kiko, phase dots, window.toolApi, scoring and the events are the runtime's. THE LESSON IS SILENT (r30) and
   action-driven (r34); the new look (keyOnly, navDots, bigPad, nextKey; LAYOUT §1d-§1e, PATTERNS §15-§16).
   NO imports in this file; only the five host hooks. Edit, never rewrite.

   Ruler Bench (v3 remake of the v2 voiced tool), one picture a phase, every picture laid out in 900 x 520
   (the room left with the wide panel open) and centred while the panel is shut:
   1  a tray of things over three bins (length, weight, capacity), each with its unit cards: tap a thing, tap its bin
      (a hand carries it in), tap a card of that bin (a hand carries it onto the thing); a card of another bin will not stick
   2  a bench (a table, two strips of cloth) and two hands: a tap on a hand lays its whole row of handspans (the hand taps
      each span), a tap on the tape pulls it along and reads the bench in centimetres
   3  a 15 cm ruler whose first mark carries "cm" and no 0: read the far end; Count (a pencil ticks each space) and
      Slide (a hand pushes the object back to the zero mark)
   4  a unit picker (a fingertip, a big step, a road between towns), and a guess card beside a measure card on a 30 cm scale */

const TOOL_ID = "ruler_bench";
const MEDIA_ID = "M1.S1.T2.C5.2D1";
const TOOL_NAME = "Ruler Bench";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* the plan's opening line (not shown: phase 1 opens on its guide steps) */
const OPENING = ["A bench of things to measure. What kind of measure does each one need?"];
/* the whole-tool line (no longer shown from r44; kept for the sidecar) */
const FINISH_LINE = "Every thing got a unit of its own kind, every reading started at the zero mark, and every unit suited the size.";
/* printed when the child opens Free play: exactly what the free branch offers (the ruler, four things, slide, count) */
const FREE_LINE = "Free play: pick a thing, slide it along the ruler, read it from the zero mark.";

/* THE START PAGE (LAYOUT §1c): one printed question to wonder at, and the object the lesson is about */
const START_HOOK = "Where does a ruler start when no 0 is printed on it?";
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  /* a ruler's first four centimetres, seen close: the first mark carries "cm" and no 0 */
  const Z = 230, S = 200, top = 160;
  return (
    <g>
      {rbThing("rope", 92, 120, 1.15, C.ink)}
      {rbThing("bottle", box.w - 92, 112, 1.2, C.ink)}
      <rect x={Z - 40} y={top} width={4 * S + 90} height={130} rx={12} fill="#FBF5E6" stroke={C.ink} strokeWidth={3} />
      {[0, 1, 2, 3, 4].map((c: number) => (
        <g key={c}>
          <line x1={Z + c * S} y1={top} x2={Z + c * S} y2={top + 58} stroke={C.ink} strokeWidth={4} />
          {c < 4 && <line x1={Z + c * S + S / 2} y1={top} x2={Z + c * S + S / 2} y2={top + 32} stroke={C.ink} strokeWidth={3} />}
          <text x={Z + c * S} y={top + 106} textAnchor="middle" fontSize={c === 0 ? T.prompt : T.speech} fontWeight={700} fill={C.ink}>{c === 0 ? tx("cm") : String(c)}</text>
        </g>
      ))}
    </g>
  );
}

/* Hindi and Gujarati (PATTERNS §11): filled in the language pass, once the English is final */
const TR: any = {
  hi: {
    "Ruler Bench": "पैमाना बेंच",
    "A bench of things to measure. What kind of measure does each one need?": "मापने के लिए चीज़ों से भरी एक बेंच। हर चीज़ को किस तरह का माप चाहिए?",
    "Free play: pick a thing, slide it along the ruler, read it from the zero mark.": "मुक्त खेल: कोई चीज़ चुनो, पैमाने पर खिसकाओ, शून्य के निशान से पढ़ो।",
    "Where does a ruler start when no 0 is printed on it?": "जब पैमाने पर 0 छपा न हो, तो वह कहाँ से शुरू होता है?",
    "A unit for every kind of measure": "हर तरह के माप का मात्रक",
    "Is it a length, a weight or a capacity? Which units belong to it?": "यह लंबाई है, भार है या धारिता? कौन से मात्रक इसके हैं?",
    "You weigh a coin, so tap the weight bin to put the coin in it.": "सिक्का तौला जाता है, इसलिए उसे रखने के लिए भार वाला डिब्बा दबाओ।",
    "Weight is how heavy a thing is.": "भार बताता है कि चीज़ कितनी भारी है।",
    "Now tap the g card in that bin to give the coin its unit.": "अब सिक्के को मात्रक देने के लिए उसी डिब्बे का ग्रा कार्ड दबाओ।",
    "g stands for grams, a small unit of weight.": "ग्रा का मतलब ग्राम है, भार का एक छोटा मात्रक।",
    "Each bin's cards can say only its own kind of measure.": "हर डिब्बे के कार्ड सिर्फ़ उसी तरह का माप बता सकते हैं।",
    "Cards like km and cm say how long, kg how heavy, and L how much it holds.": "किमी और सेमी लंबाई बताते हैं, किग्रा भार, और ली बताता है कितना आता है।",
    "Length, weight and capacity each take a unit of their own kind.": "लंबाई, भार और धारिता, हर एक अपनी तरह का मात्रक लेता है।",
    "You learned: length, weight and capacity each take their own units.": "तुमने सीखा: लंबाई, भार और धारिता के अपने अपने मात्रक होते हैं।",
    "Sort the rope, the school bag and the jug of milk into bins, with unit cards.": "रस्सी, स्कूल बैग और दूध के जग को डिब्बों में छाँटो और मात्रक कार्ड दो।",
    "Bin and unit for each": "हर एक का डिब्बा और मात्रक",
    "Take one thing at a time and ask what you want to know about it.": "एक बार में एक चीज़ लो और सोचो कि उसके बारे में क्या जानना है।",
    "Yes, each one went in the right bin with a card that fits.": "हाँ, हर चीज़ सही डिब्बे में गई और उसे सही कार्ड मिला।",
    "A bucket holds 12 ___ of water: which unit fills the gap, cm, kg or L?": "बाल्टी में 12 ___ पानी आता है: कौन सा मात्रक सही है, सेमी, किग्रा या ली?",
    "A bucket holds 12 ___ of water.": "बाल्टी में 12 ___ पानी आता है।",
    "Think of filling the bucket: which kind of measure tells how much goes in?": "बाल्टी भरने के बारे में सोचो: कौन सा माप बताता है कि इसमें कितना आता है?",
    "Yes, the bucket holds 12 litres.": "हाँ, बाल्टी में 12 लीटर आता है।",
    "Which bin has the cards that say how much a thing holds?": "किस डिब्बे के कार्ड बताते हैं कि किसी चीज़ में कितना आता है?",
    "Of cm, kg and L, which one is a unit for water, milk and juice?": "सेमी, किग्रा और ली में से पानी, दूध और जूस का मात्रक कौन सा है?",
    "Now a bag of rice, a ribbon and a glass of juice: sort them the same way.": "अब चावल की थैली, एक रिबन और जूस का गिलास: इन्हें भी इसी तरह छाँटो।",
    "Sort all three.": "तीनों को छाँटो।",
    "Would you lift it, lay it out straight, or pour it to measure it?": "इसे नापने के लिए तुम उठाओगे, सीधा फैलाओगे, या उँडेलोगे?",
    "Yes, the rice, ribbon and juice each got a card from the right bin.": "हाँ, चावल, रिबन और जूस, हर एक को सही डिब्बे का कार्ड मिला।",
    "Each thing needs a bin and a unit card first.": "पहले हर चीज़ को डिब्बा और मात्रक कार्ड चाहिए।",
    "Why everyone uses the same units": "सब एक जैसे मात्रक क्यों लेते हैं",
    "Two hands, two counts. Now the tape. Does it matter whose hand lays it?": "दो हाथ, दो गिनतियाँ। अब फ़ीता। क्या फ़र्क पड़ता है कि हाथ किसका है?",
    "Tap the big hand to lay its handspans along the desk.": "बड़ा हाथ दबाओ, वह डेस्क पर अपने बित्ते रखेगा।",
    "The big hand's key is at the bottom left.": "बड़ा हाथ वाला बटन नीचे बाईं ओर है।",
    "Now tap the small hand to lay its handspans along the same desk.": "अब छोटा हाथ दबाओ, वह उसी डेस्क पर अपने बित्ते रखेगा।",
    "The small hand's key is in the middle at the bottom.": "छोटा हाथ वाला बटन नीचे बीच में है।",
    "Tap the tape to measure the desk in centimetres.": "डेस्क को सेंटीमीटर में नापने के लिए फ़ीता दबाओ।",
    "The tape's key is at the bottom right.": "फ़ीता वाला बटन नीचे दाईं ओर है।",
    "Which hand fits more times along it?": "कौन सा हाथ इस पर ज़्यादा बार आता है?",
    "Pull out the tape: does its reading care whose hand it is?": "फ़ीता खींचो: क्या उसका माप इस पर निर्भर है कि हाथ किसका है?",
    "Handspans differ from person to person, so standard units give one reading.": "बित्ता हर व्यक्ति का अलग होता है, इसलिए मानक मात्रक सबको एक ही माप देते हैं।",
    "You learned: handspans differ, so everyone uses standard units.": "तुमने सीखा: बित्ते अलग होते हैं, इसलिए सब मानक मात्रक लेते हैं।",
    "Two children count 9 and 12 handspans along the same bench: which is right?": "दो बच्चे एक ही बेंच पर 9 और 12 बित्ते गिनते हैं: कौन सही है?",
    "Which count is right?": "कौन सी गिनती सही है?",
    "Did the bench change between the two counts?": "क्या दोनों गिनतियों के बीच बेंच बदल गई?",
    "Yes, both are right, each by their hand.": "हाँ, दोनों सही हैं, हर एक ने अपने हाथ से नापा।",
    "A table is 6 handspans for a grown-up and 9 for a child: why do they differ?": "बड़े व्यक्ति के लिए मेज़ 6 बित्ते की है और बच्चे के लिए 9 की: ऐसा क्यों?",
    "Why do the counts differ?": "गिनतियाँ अलग क्यों हैं?",
    "Lay both hands along the table: whose handspan is longer?": "दोनों हाथ मेज़ पर रखो: किसका बित्ता लंबा है?",
    "Yes, a bigger hand fits fewer times.": "हाँ, बड़ा हाथ कम बार आता है।",
    "Why is cloth sold by the metre and not by the handspan?": "कपड़ा बित्ते से नहीं, मीटर से क्यों बिकता है?",
    "Why sell cloth by the metre?": "कपड़ा मीटर से क्यों?",
    "Would the buyer's bigger handspans give the same cloth?": "क्या खरीदार के बड़े बित्तों से उतना ही कपड़ा मिलेगा?",
    "Yes, a metre is the same for everyone.": "हाँ, मीटर सबके लिए एक जैसा है।",
    "just 9": "सिर्फ़ 9",
    "just 12": "सिर्फ़ 12",
    "both": "दोनों",
    "hand size": "हाथ का आकार",
    "table changed": "मेज़ बदली",
    "a miscount": "गलत गिनती",
    "same for all": "सबके लिए एक",
    "a longer unit": "बड़ा मात्रक",
    "quicker": "जल्दी होता है",
    "big hand": "बड़ा हाथ",
    "small hand": "छोटा हाथ",
    "grown-up": "बड़े व्यक्ति",
    "child": "बच्चा",
    "seller": "दुकानदार",
    "buyer": "खरीदार",
    "both are right": "दोनों सही हैं",
    "the hands differ in size": "हाथों का आकार अलग है",
    "a metre never changes": "मीटर कभी नहीं बदलता",
    "tape": "फ़ीता",
    "Measuring from the zero mark": "शून्य के निशान से मापना",
    "Where does the ruler start? Count the centimetres it really covers.": "पैमाना कहाँ से शुरू होता है? वह सचमुच जितने सेंटीमीटर ढकता है, गिनो।",
    "The eraser starts on the mark for 1, so tap Count to count the spaces it covers.": "रबड़ 1 के निशान से शुरू है, इसलिए उसकी जगहें गिनने के लिए गिनो दबाओ।",
    "Tap the Count key under the ruler.": "पैमाने के नीचे गिनो वाला बटन दबाओ।",
    "Now tap Slide to move the eraser back to the first mark, the zero mark.": "अब खिसकाओ दबाओ, रबड़ पहले निशान यानी शून्य के निशान पर लौट आएगा।",
    "The key under the ruler now reads Slide.": "पैमाने के नीचे वाले बटन पर अब खिसकाओ लिखा है।",
    "Which mark is the zero mark on this ruler?": "इस पैमाने पर शून्य का निशान कौन सा है?",
    "Put a finger on the object's left end and count one centimetre space at a time.": "चीज़ के बाएँ सिरे पर उँगली रखो और एक एक सेंटीमीटर की जगह गिनो।",
    "Start at the zero mark, even if no 0 is printed, and read the other end.": "शून्य के निशान से शुरू करो, चाहे 0 छपा न हो, और दूसरा सिरा पढ़ो।",
    "You learned: measure from the zero mark, the ruler's first mark.": "तुमने सीखा: शून्य के निशान, यानी पैमाने के पहले निशान से नापो।",
    "The crayon lies from the zero mark: how many centimetres long is it?": "क्रेयॉन शून्य के निशान से रखा है: वह कितने सेंटीमीटर लंबा है?",
    "Crayon's length in cm?": "क्रेयॉन की लंबाई सेमी में?",
    "Count the spaces between the marks, not the marks themselves.": "निशानों के बीच की जगहें गिनो, निशान नहीं।",
    "Yes, the crayon is 7 cm long.": "हाँ, क्रेयॉन 7 सेमी लंबा है।",
    "Now a pencil, laid from the same first mark: what is its length in cm?": "अब एक पेंसिल, उसी पहले निशान से रखी: उसकी लंबाई कितने सेमी है?",
    "Pencil's length in cm?": "पेंसिल की लंबाई सेमी में?",
    "The pencil starts at the zero mark: which number sits under its tip?": "पेंसिल शून्य के निशान से शुरू होती है: उसकी नोक के नीचे कौन सी संख्या है?",
    "Yes, the pencil is 12 cm long.": "हाँ, पेंसिल 12 सेमी लंबी है।",
    "A key lies from the mark for 1 to the mark for 6: how long is the key, in cm?": "एक चाबी 1 के निशान से 6 के निशान तक रखी है: चाबी कितने सेमी लंबी है?",
    "Key's length in cm?": "चाबी की लंबाई सेमी में?",
    "Does the key's left end sit on the first mark, or on another mark?": "चाबी का बायाँ सिरा पहले निशान पर है, या किसी और निशान पर?",
    "Yes, 5 spaces, so the key is 5 cm long.": "हाँ, 5 जगहें, इसलिए चाबी 5 सेमी लंबी है।",
    "Count": "गिनो",
    "Slide": "खिसकाओ",
    "slide left": "बाएँ खिसकाओ",
    "slide right": "दाएँ खिसकाओ",
    "crayon": "क्रेयॉन",
    "eraser": "रबड़",
    "key": "चाबी",
    "pencil": "पेंसिल",
    "Choosing a sensible unit": "सही मात्रक चुनना",
    "Pick a unit that fits. Now guess. How close was your guess?": "सही मात्रक चुनो। अब अनुमान लगाओ। तुम्हारा अनुमान कितना पास था?",
    "Tap the unit that suits a pencil: cm, m or km.": "पेंसिल के लिए सही मात्रक दबाओ: सेमी, मी या किमी।",
    "A pencil is about as long as your hand.": "पेंसिल लगभग तुम्हारे हाथ जितनी लंबी होती है।",
    "Tap Guess to write a guess of 15 cm on the guess card.": "अनुमान दबाओ, अनुमान कार्ड पर 15 सेमी लिखा जाएगा।",
    "Tap the Guess key under the cards.": "कार्डों के नीचे अनुमान वाला बटन दबाओ।",
    "Now tap Measure to lay a ruler along the pencil from its zero mark.": "अब नापो दबाओ, पैमाना शून्य के निशान से पेंसिल के साथ रखा जाएगा।",
    "The key under the cards now reads Measure.": "कार्डों के नीचे वाले बटन पर अब नापो लिखा है।",
    "Which unit's picture matches that size?": "किस मात्रक का चित्र उस आकार से मेल खाता है?",
    "A fingertip is about 1 cm, a big step about 1 m, and towns are many km apart.": "उँगली का सिरा लगभग 1 सेमी, बड़ा कदम लगभग 1 मी, और शहर कई किमी दूर होते हैं।",
    "Pick a unit that suits the size, guess, then measure: the gap shows how close.": "आकार के हिसाब से मात्रक चुनो, अनुमान लगाओ, फिर नापो: अंतर बताता है कितना पास।",
    "You learned: pick a unit to suit the size; find how far a guess is out.": "तुमने सीखा: आकार देखकर मात्रक चुनो; अनुमान कितना दूर है, जानो।",
    "Tap the unit that fits: is a school bus about 10 cm, 10 m or 10 km long?": "सही मात्रक दबाओ: स्कूल बस लगभग 10 सेमी, 10 मी या 10 किमी लंबी है?",
    "A bus is about 10 ___ long.": "बस लगभग 10 ___ लंबी है।",
    "How big is a bus: about a finger, a step or a journey?": "बस कितनी बड़ी है: एक उँगली, एक कदम या एक सफ़र जितनी?",
    "Yes, a bus is about 10 metres long.": "हाँ, बस लगभग 10 मीटर लंबी होती है।",
    "And a cricket pitch: is it about 20 cm, 20 m or 20 km long?": "और क्रिकेट पिच: क्या वह लगभग 20 सेमी, 20 मी या 20 किमी लंबी है?",
    "A pitch is about 20 ___ long.": "पिच लगभग 20 ___ लंबी है।",
    "Walk the pitch in your head: is it a short walk, or a long ride?": "मन में पिच पर चलकर देखो: क्या यह थोड़ी सी सैर है, या लंबा सफ़र?",
    "Yes, a pitch is about 20 metres long.": "हाँ, पिच लगभग 20 मीटर लंबी होती है।",
    "A notebook guessed at 30 cm measures 24 cm: by how many cm was the guess out?": "कॉपी का अनुमान 30 सेमी था और नाप 24 सेमी है: अनुमान कितने सेमी ग़लत था?",
    "Out by how many cm?": "कितने सेमी का अंतर?",
    "Compare the two cards: how far is the guess from the measure?": "दोनों कार्डों की तुलना करो: अनुमान नाप से कितना दूर है?",
    "Look from the notebook's end to the dashed line: the bar fills that gap.": "कॉपी के सिरे से टूटी रेखा तक देखो: पट्टी वही अंतर भरती है।",
    "Count the centimetre spaces under the bar, one at a time.": "पट्टी के नीचे सेंटीमीटर की जगहें एक एक करके गिनो।",
    "Yes, the guess was 6 cm too long.": "हाँ, अनुमान 6 सेमी ज़्यादा था।",
    "Tap one of the three units first.": "पहले तीनों में से एक मात्रक दबाओ।",
    "Guess": "अनुमान",
    "Measure": "नापो",
    "guess": "अनुमान",
    "measure": "नाप",
    "about": "लगभग",
    "length": "लंबाई",
    "weight": "भार",
    "capacity": "धारिता",
    "rope": "रस्सी",
    "school bag": "स्कूल बैग",
    "jug of milk": "दूध का जग",
    "bag of rice": "चावल की थैली",
    "ribbon": "रिबन",
    "glass of juice": "जूस का गिलास",
    "bucket": "बाल्टी",
    "bottle of water": "पानी की बोतल",
    "coin": "सिक्का",
    "mm": "मिमी",
    "cm": "सेमी",
    "m": "मी",
    "km": "किमी",
    "g": "ग्रा",
    "kg": "किग्रा",
    "mL": "मिली",
    "L": "ली",
    "Tap a thing first, then tap its bin.": "पहले कोई चीज़ दबाओ, फिर उसका डिब्बा दबाओ।",
    "Put the thing in a bin first, then give it a card.": "पहले चीज़ को डिब्बे में रखो, फिर उसे कार्ड दो।",
    "The coin now sits in the weight bin with its g card.": "अब सिक्का अपने ग्रा कार्ड के साथ भार वाले डिब्बे में है।",
    "The tape gives the desk one reading for both hands.": "फ़ीता दोनों हाथों के लिए डेस्क का एक ही माप देता है।",
    "Now the eraser starts at the zero mark and reads 3.": "अब रबड़ शून्य के निशान से शुरू है और 3 पढ़ता है।",
    "The pencil measures 17 cm, so the guess was 2 cm short.": "पेंसिल 17 सेमी नापी गई, इसलिए अनुमान 2 सेमी कम था।",
  },
  gu: {
    "Ruler Bench": "માપપટ્ટી બેન્ચ",
    "A bench of things to measure. What kind of measure does each one need?": "માપવા માટેની વસ્તુઓની એક બેન્ચ. દરેક વસ્તુને કેવા પ્રકારનું માપ જોઈએ?",
    "Free play: pick a thing, slide it along the ruler, read it from the zero mark.": "મુક્ત રમત: કોઈ વસ્તુ પસંદ કરો, માપપટ્ટી પર સરકાવો, શૂન્યના નિશાનથી વાંચો.",
    "Where does a ruler start when no 0 is printed on it?": "માપપટ્ટી પર 0 છાપેલો ન હોય, તો તે ક્યાંથી શરૂ થાય?",
    "A unit for every kind of measure": "દરેક પ્રકારના માપ માટે એકમ",
    "Is it a length, a weight or a capacity? Which units belong to it?": "આ લંબાઈ છે, વજન છે કે ક્ષમતા? કયા એકમ તેના છે?",
    "You weigh a coin, so tap the weight bin to put the coin in it.": "સિક્કો તોલાય છે, તેથી તેને મૂકવા વજનનો ડબ્બો દબાવો.",
    "Weight is how heavy a thing is.": "વજન કહે છે કે વસ્તુ કેટલી ભારે છે.",
    "Now tap the g card in that bin to give the coin its unit.": "હવે સિક્કાને એકમ આપવા એ જ ડબ્બાનું ગ્રા કાર્ડ દબાવો.",
    "g stands for grams, a small unit of weight.": "ગ્રા એટલે ગ્રામ, વજનનો એક નાનો એકમ.",
    "Each bin's cards can say only its own kind of measure.": "દરેક ડબ્બાનાં કાર્ડ ફક્ત એ જ પ્રકારનું માપ કહી શકે છે.",
    "Cards like km and cm say how long, kg how heavy, and L how much it holds.": "કિમી અને સેમી લંબાઈ કહે, કિગ્રા વજન, અને લિ કહે કે કેટલું સમાય.",
    "Length, weight and capacity each take a unit of their own kind.": "લંબાઈ, વજન અને ક્ષમતા, દરેક પોતાના પ્રકારનો એકમ લે છે.",
    "You learned: length, weight and capacity each take their own units.": "તમે શીખ્યા: લંબાઈ, વજન અને ક્ષમતાના પોતપોતાના એકમ હોય છે.",
    "Sort the rope, the school bag and the jug of milk into bins, with unit cards.": "દોરડું, દફતર અને દૂધના જગને ડબ્બામાં ગોઠવો અને એકમ કાર્ડ આપો.",
    "Bin and unit for each": "દરેકનો ડબ્બો અને એકમ",
    "Take one thing at a time and ask what you want to know about it.": "એક વારમાં એક વસ્તુ લો અને વિચારો કે તેના વિશે શું જાણવું છે.",
    "Yes, each one went in the right bin with a card that fits.": "હા, દરેક વસ્તુ સાચા ડબ્બામાં ગઈ અને તેને બંધબેસતું કાર્ડ મળ્યું.",
    "A bucket holds 12 ___ of water: which unit fills the gap, cm, kg or L?": "ડોલમાં 12 ___ પાણી સમાય છે: ખાલી જગ્યામાં કયો એકમ આવે, સેમી, કિગ્રા કે લિ?",
    "A bucket holds 12 ___ of water.": "ડોલમાં 12 ___ પાણી સમાય છે.",
    "Think of filling the bucket: which kind of measure tells how much goes in?": "ડોલ ભરવાનું વિચારો: કયું માપ કહે છે કે તેમાં કેટલું સમાય?",
    "Yes, the bucket holds 12 litres.": "હા, ડોલમાં 12 લિટર સમાય છે.",
    "Which bin has the cards that say how much a thing holds?": "કયા ડબ્બાનાં કાર્ડ કહે છે કે વસ્તુમાં કેટલું સમાય?",
    "Of cm, kg and L, which one is a unit for water, milk and juice?": "સેમી, કિગ્રા અને લિમાંથી પાણી, દૂધ અને જ્યૂસનો એકમ કયો છે?",
    "Now a bag of rice, a ribbon and a glass of juice: sort them the same way.": "હવે ચોખાની થેલી, એક રિબન અને જ્યૂસનો ગ્લાસ: તેમને પણ એ જ રીતે ગોઠવો.",
    "Sort all three.": "ત્રણેયને ગોઠવો.",
    "Would you lift it, lay it out straight, or pour it to measure it?": "તેને માપવા તમે ઉપાડશો, સીધું પાથરશો, કે રેડશો?",
    "Yes, the rice, ribbon and juice each got a card from the right bin.": "હા, ચોખા, રિબન અને જ્યૂસ, દરેકને સાચા ડબ્બાનું કાર્ડ મળ્યું.",
    "Each thing needs a bin and a unit card first.": "પહેલાં દરેક વસ્તુને ડબ્બો અને એકમ કાર્ડ જોઈએ.",
    "Why everyone uses the same units": "બધા એક જ એકમ કેમ વાપરે છે",
    "Two hands, two counts. Now the tape. Does it matter whose hand lays it?": "બે હાથ, બે ગણતરી. હવે ફીત. શું ફરક પડે કે હાથ કોનો છે?",
    "Tap the big hand to lay its handspans along the desk.": "મોટો હાથ દબાવો, તે ડેસ્ક પર પોતાની વેંત મૂકશે.",
    "The big hand's key is at the bottom left.": "મોટો હાથ વાળું બટન નીચે ડાબી બાજુ છે.",
    "Now tap the small hand to lay its handspans along the same desk.": "હવે નાનો હાથ દબાવો, તે એ જ ડેસ્ક પર પોતાની વેંત મૂકશે.",
    "The small hand's key is in the middle at the bottom.": "નાનો હાથ વાળું બટન નીચે વચ્ચે છે.",
    "Tap the tape to measure the desk in centimetres.": "ડેસ્કને સેન્ટિમીટરમાં માપવા ફીત દબાવો.",
    "The tape's key is at the bottom right.": "ફીત વાળું બટન નીચે જમણી બાજુ છે.",
    "Which hand fits more times along it?": "કયો હાથ તેના પર વધુ વાર સમાય છે?",
    "Pull out the tape: does its reading care whose hand it is?": "ફીત ખેંચો: શું તેનું માપ હાથ કોનો છે તેના પર આધાર રાખે છે?",
    "Handspans differ from person to person, so standard units give one reading.": "વેંત દરેક વ્યક્તિની જુદી હોય છે, તેથી પ્રમાણભૂત એકમ બધાને એક જ માપ આપે છે.",
    "You learned: handspans differ, so everyone uses standard units.": "તમે શીખ્યા: વેંત જુદી હોય છે, તેથી બધા પ્રમાણભૂત એકમ વાપરે છે.",
    "Two children count 9 and 12 handspans along the same bench: which is right?": "બે બાળકો એક જ બેન્ચ પર 9 અને 12 વેંત ગણે છે: કોણ સાચું છે?",
    "Which count is right?": "કઈ ગણતરી સાચી છે?",
    "Did the bench change between the two counts?": "શું બે ગણતરી વચ્ચે બેન્ચ બદલાઈ ગઈ?",
    "Yes, both are right, each by their hand.": "હા, બંને સાચા છે, દરેકે પોતાના હાથથી માપ્યું.",
    "A table is 6 handspans for a grown-up and 9 for a child: why do they differ?": "વડીલ માટે ટેબલ 6 વેંતનું છે અને બાળક માટે 9નું: આવું કેમ?",
    "Why do the counts differ?": "ગણતરી જુદી કેમ છે?",
    "Lay both hands along the table: whose handspan is longer?": "બંને હાથ ટેબલ પર મૂકો: કોની વેંત લાંબી છે?",
    "Yes, a bigger hand fits fewer times.": "હા, મોટો હાથ ઓછી વાર સમાય છે.",
    "Why is cloth sold by the metre and not by the handspan?": "કાપડ વેંતથી નહીં, મીટરથી કેમ વેચાય છે?",
    "Why sell cloth by the metre?": "કાપડ મીટરથી કેમ?",
    "Would the buyer's bigger handspans give the same cloth?": "શું ગ્રાહકની મોટી વેંતથી એટલું જ કાપડ મળશે?",
    "Yes, a metre is the same for everyone.": "હા, મીટર બધા માટે સરખો છે.",
    "just 9": "ફક્ત 9",
    "just 12": "ફક્ત 12",
    "both": "બંને",
    "hand size": "હાથનું કદ",
    "table changed": "ટેબલ બદલાયું",
    "a miscount": "ખોટી ગણતરી",
    "same for all": "બધા માટે સરખો",
    "a longer unit": "મોટો એકમ",
    "quicker": "ઝડપી",
    "big hand": "મોટો હાથ",
    "small hand": "નાનો હાથ",
    "grown-up": "વડીલ",
    "child": "બાળક",
    "seller": "વેપારી",
    "buyer": "ગ્રાહક",
    "both are right": "બંને સાચા છે",
    "the hands differ in size": "હાથનું કદ જુદું છે",
    "a metre never changes": "મીટર કદી બદલાતો નથી",
    "tape": "ફીત",
    "Measuring from the zero mark": "શૂન્યના નિશાનથી માપવું",
    "Where does the ruler start? Count the centimetres it really covers.": "માપપટ્ટી ક્યાંથી શરૂ થાય છે? તે ખરેખર જેટલા સેન્ટિમીટર ઢાંકે છે, ગણો.",
    "The eraser starts on the mark for 1, so tap Count to count the spaces it covers.": "રબર 1ના નિશાનથી શરૂ થાય છે, તેથી તેની જગ્યાઓ ગણવા ગણો દબાવો.",
    "Tap the Count key under the ruler.": "માપપટ્ટી નીચેનું ગણો બટન દબાવો.",
    "Now tap Slide to move the eraser back to the first mark, the zero mark.": "હવે સરકાવો દબાવો, રબર પહેલા નિશાન એટલે શૂન્યના નિશાન પર પાછું આવશે.",
    "The key under the ruler now reads Slide.": "માપપટ્ટી નીચેના બટન પર હવે સરકાવો લખેલું છે.",
    "Which mark is the zero mark on this ruler?": "આ માપપટ્ટી પર શૂન્યનું નિશાન કયું છે?",
    "Put a finger on the object's left end and count one centimetre space at a time.": "વસ્તુના ડાબા છેડે આંગળી મૂકો અને એક એક સેન્ટિમીટરની જગ્યા ગણો.",
    "Start at the zero mark, even if no 0 is printed, and read the other end.": "શૂન્યના નિશાનથી શરૂ કરો, ભલે 0 છાપેલો ન હોય, અને બીજો છેડો વાંચો.",
    "You learned: measure from the zero mark, the ruler's first mark.": "તમે શીખ્યા: શૂન્યના નિશાનથી, એટલે માપપટ્ટીના પહેલા નિશાનથી માપો.",
    "The crayon lies from the zero mark: how many centimetres long is it?": "ક્રેયોન શૂન્યના નિશાનથી મૂકેલો છે: તે કેટલા સેન્ટિમીટર લાંબો છે?",
    "Crayon's length in cm?": "ક્રેયોનની લંબાઈ સેમીમાં?",
    "Count the spaces between the marks, not the marks themselves.": "નિશાનો વચ્ચેની જગ્યા ગણો, નિશાન નહીં.",
    "Yes, the crayon is 7 cm long.": "હા, ક્રેયોન 7 સેમી લાંબો છે.",
    "Now a pencil, laid from the same first mark: what is its length in cm?": "હવે એક પેન્સિલ, એ જ પહેલા નિશાનથી મૂકેલી: તેની લંબાઈ કેટલા સેમી છે?",
    "Pencil's length in cm?": "પેન્સિલની લંબાઈ સેમીમાં?",
    "The pencil starts at the zero mark: which number sits under its tip?": "પેન્સિલ શૂન્યના નિશાનથી શરૂ થાય છે: તેની અણી નીચે કઈ સંખ્યા છે?",
    "Yes, the pencil is 12 cm long.": "હા, પેન્સિલ 12 સેમી લાંબી છે.",
    "A key lies from the mark for 1 to the mark for 6: how long is the key, in cm?": "એક ચાવી 1ના નિશાનથી 6ના નિશાન સુધી મૂકેલી છે: ચાવી કેટલા સેમી લાંબી છે?",
    "Key's length in cm?": "ચાવીની લંબાઈ સેમીમાં?",
    "Does the key's left end sit on the first mark, or on another mark?": "ચાવીનો ડાબો છેડો પહેલા નિશાન પર છે, કે બીજા કોઈ નિશાન પર?",
    "Yes, 5 spaces, so the key is 5 cm long.": "હા, 5 જગ્યા, તેથી ચાવી 5 સેમી લાંબી છે.",
    "Count": "ગણો",
    "Slide": "સરકાવો",
    "slide left": "ડાબે સરકાવો",
    "slide right": "જમણે સરકાવો",
    "crayon": "ક્રેયોન",
    "eraser": "રબર",
    "key": "ચાવી",
    "pencil": "પેન્સિલ",
    "Choosing a sensible unit": "યોગ્ય એકમ પસંદ કરવો",
    "Pick a unit that fits. Now guess. How close was your guess?": "યોગ્ય એકમ પસંદ કરો. હવે અંદાજ લગાવો. તમારો અંદાજ કેટલો નજીક હતો?",
    "Tap the unit that suits a pencil: cm, m or km.": "પેન્સિલ માટે યોગ્ય એકમ દબાવો: સેમી, મી કે કિમી.",
    "A pencil is about as long as your hand.": "પેન્સિલ લગભગ તમારા હાથ જેટલી લાંબી હોય છે.",
    "Tap Guess to write a guess of 15 cm on the guess card.": "અંદાજ દબાવો, અંદાજ કાર્ડ પર 15 સેમી લખાશે.",
    "Tap the Guess key under the cards.": "કાર્ડની નીચેનું અંદાજ બટન દબાવો.",
    "Now tap Measure to lay a ruler along the pencil from its zero mark.": "હવે માપો દબાવો, માપપટ્ટી શૂન્યના નિશાનથી પેન્સિલ સાથે મુકાશે.",
    "The key under the cards now reads Measure.": "કાર્ડ નીચેના બટન પર હવે માપો લખેલું છે.",
    "Which unit's picture matches that size?": "કયા એકમનું ચિત્ર એ કદ સાથે મેળ ખાય છે?",
    "A fingertip is about 1 cm, a big step about 1 m, and towns are many km apart.": "ટેરવું આશરે 1 સેમી, મોટું પગલું આશરે 1 મી, અને શહેરો ઘણા કિમી દૂર હોય છે.",
    "Pick a unit that suits the size, guess, then measure: the gap shows how close.": "કદ પ્રમાણે એકમ પસંદ કરો, અંદાજ લગાવો, પછી માપો: તફાવત કહે છે કેટલું નજીક.",
    "You learned: pick a unit to suit the size; find how far a guess is out.": "તમે શીખ્યા: કદ જોઈને એકમ પસંદ કરો; અંદાજ કેટલો દૂર છે તે શોધો.",
    "Tap the unit that fits: is a school bus about 10 cm, 10 m or 10 km long?": "યોગ્ય એકમ દબાવો: સ્કૂલ બસ આશરે 10 સેમી, 10 મી કે 10 કિમી લાંબી છે?",
    "A bus is about 10 ___ long.": "બસ આશરે 10 ___ લાંબી છે.",
    "How big is a bus: about a finger, a step or a journey?": "બસ કેટલી મોટી છે: એક આંગળી, એક પગલું કે એક મુસાફરી જેટલી?",
    "Yes, a bus is about 10 metres long.": "હા, બસ આશરે 10 મીટર લાંબી હોય છે.",
    "And a cricket pitch: is it about 20 cm, 20 m or 20 km long?": "અને ક્રિકેટ પીચ: શું તે આશરે 20 સેમી, 20 મી કે 20 કિમી લાંબી છે?",
    "A pitch is about 20 ___ long.": "પીચ આશરે 20 ___ લાંબી છે.",
    "Walk the pitch in your head: is it a short walk, or a long ride?": "મનમાં પીચ પર ચાલી જુઓ: શું તે ટૂંકું ચાલવું છે, કે લાંબી મુસાફરી?",
    "Yes, a pitch is about 20 metres long.": "હા, પીચ આશરે 20 મીટર લાંબી હોય છે.",
    "A notebook guessed at 30 cm measures 24 cm: by how many cm was the guess out?": "નોટબુકનો અંદાજ 30 સેમી હતો અને માપ 24 સેમી છે: અંદાજ કેટલા સેમી જુદો હતો?",
    "Out by how many cm?": "કેટલા સેમીનો ફરક?",
    "Compare the two cards: how far is the guess from the measure?": "બંને કાર્ડની સરખામણી કરો: અંદાજ માપથી કેટલો દૂર છે?",
    "Look from the notebook's end to the dashed line: the bar fills that gap.": "નોટબુકના છેડાથી તૂટક રેખા સુધી જુઓ: પટ્ટી એ જ ગાળો ભરે છે.",
    "Count the centimetre spaces under the bar, one at a time.": "પટ્ટી નીચેની સેન્ટિમીટરની જગ્યાઓ એક એક કરીને ગણો.",
    "Yes, the guess was 6 cm too long.": "હા, અંદાજ 6 સેમી વધારે હતો.",
    "Tap one of the three units first.": "પહેલાં ત્રણમાંથી એક એકમ દબાવો.",
    "Guess": "અંદાજ",
    "Measure": "માપો",
    "guess": "અંદાજ",
    "measure": "માપ",
    "about": "આશરે",
    "length": "લંબાઈ",
    "weight": "વજન",
    "capacity": "ક્ષમતા",
    "rope": "દોરડું",
    "school bag": "દફતર",
    "jug of milk": "દૂધનો જગ",
    "bag of rice": "ચોખાની થેલી",
    "ribbon": "રિબન",
    "glass of juice": "જ્યૂસનો ગ્લાસ",
    "bucket": "ડોલ",
    "bottle of water": "પાણીની બોટલ",
    "coin": "સિક્કો",
    "mm": "મિમી",
    "cm": "સેમી",
    "m": "મી",
    "km": "કિમી",
    "g": "ગ્રા",
    "kg": "કિગ્રા",
    "mL": "મિલિ",
    "L": "લિ",
    "Tap a thing first, then tap its bin.": "પહેલાં કોઈ વસ્તુ દબાવો, પછી તેનો ડબ્બો દબાવો.",
    "Put the thing in a bin first, then give it a card.": "પહેલાં વસ્તુને ડબ્બામાં મૂકો, પછી તેને કાર્ડ આપો.",
    "The coin now sits in the weight bin with its g card.": "હવે સિક્કો પોતાના ગ્રા કાર્ડ સાથે વજનના ડબ્બામાં છે.",
    "The tape gives the desk one reading for both hands.": "ફીત બંને હાથ માટે ડેસ્કનું એક જ માપ આપે છે.",
    "Now the eraser starts at the zero mark and reads 3.": "હવે રબર શૂન્યના નિશાનથી શરૂ થાય છે અને 3 વંચાય છે.",
    "The pencil measures 17 cm, so the guess was 2 cm short.": "પેન્સિલ 17 સેમી માપાઈ, તેથી અંદાજ 2 સેમી ઓછો હતો.",
  },
};

/* One entry per phase = one mount. The guide steps work a WARM-UP (`warm`), never question 1's own item. */
const PHASES = [
  {
    n: 1,
    concept: "A unit for every kind of measure",
    conceptId: "M1.S1.T2.C5", objectiveIds: ["O1"],
    says: ["Is it a length, a weight or a capacity? Which units belong to it?"],
    warm: { kind: "sort", things: ["coin"] },
    steps: [
      { say: "You weigh a coin, so tap the weight bin to put the coin in it.", on: "bin-weight", hint: "Weight is how heavy a thing is." },
      { say: "Now tap the g card in that bin to give the coin its unit.", on: "card-g", hint: "g stands for grams, a small unit of weight." },
    ],
    stepHold: 2000,
    ladder: ["Each bin's cards can say only its own kind of measure.", "Cards like km and cm say how long, kg how heavy, and L how much it holds."],
    closing: "Length, weight and capacity each take a unit of their own kind.",
    learned: "You learned: length, weight and capacity each take their own units.",
    traceback: "Each thing in a wrong bin is drawn again, dashed, in the bin of its own kind wearing a unit card from that bin, while the child's own pieces stay where they were set.",
    items: [
      /* learn ML1: answer in the plan = The rope needs a length, in metres; the bag needs a weight, in kilograms; the milk needs a capacity, in litres or millilitres
         (plan: A skipping rope, a school bag and a jug of milk are to be measured. Which kind of measure does each need, and which unit could each take?) */
      { qid: "M1.S1.T2.C5:ML1", kind: "sort", things: ["rope", "bag", "milk"], pad: "enter", winMs: 4300,
        say: "Sort the rope, the school bag and the jug of milk into bins, with unit cards.",
        ask: "Bin and unit for each", answer: "rope=length:m|bag=weight:kg|milk=capacity:L",
        near: "rope=length:m|bag=weight:kg|milk=length:cm",
        miss: "Take one thing at a time and ask what you want to know about it.",
        win: "Yes, each one went in the right bin with a card that fits." },
      /* practice 1: answer in the plan = L, because how much water a bucket holds is a capacity
         (plan: Which unit fits the gap: a bucket holds 12 ___ of water? Choose from cm, kg and L.) */
      { qid: "M1.S1.T2.C5:1", kind: "blank", things: ["bucket"], amount: 12, winMs: 2800,
        say: "A bucket holds 12 ___ of water: which unit fills the gap, cm, kg or L?",
        ask: "A bucket holds 12 ___ of water.",
        choices: [{ id: "cm", label: "cm" }, { id: "kg", label: "kg" }, { id: "L", label: "L" }],
        answer: "L", near: "kg",
        miss: "Think of filling the bucket: which kind of measure tells how much goes in?",
        ladder: ["Which bin has the cards that say how much a thing holds?", "Of cm, kg and L, which one is a unit for water, milk and juice?"],
        win: "Yes, the bucket holds 12 litres." },
      /* practice 2: answer in the plan = The rice is a weight, in kg; the ribbon is a length, in cm or m; the juice is a capacity, in mL
         (plan: Say which kind of measure each is, and give each a unit: the weight of a bag of rice, the length of a ribbon, the juice in a glass.) */
      { qid: "M1.S1.T2.C5:2", kind: "sort", things: ["rice", "ribbon", "juice"], pad: "enter", winMs: 4800,
        say: "Now a bag of rice, a ribbon and a glass of juice: sort them the same way.",
        ask: "Sort all three.", answer: "rice=weight:kg|ribbon=length:cm|juice=capacity:mL",
        near: "rice=weight:kg|ribbon=length:cm|juice=length:cm",
        miss: "Would you lift it, lay it out straight, or pour it to measure it?",
        win: "Yes, the rice, ribbon and juice each got a card from the right bin." },
    ],
  },
  {
    n: 2,
    concept: "Why everyone uses the same units",
    conceptId: "M1.S1.T2.C6", objectiveIds: ["O1"],
    says: ["Two hands, two counts. Now the tape. Does it matter whose hand lays it?"],
    warm: { kind: "whose", thing: "desk", bench: 72, hands: [18, 12], who: ["big hand", "small hand"], counts: [4, 6] },
    steps: [
      { say: "Tap the big hand to lay its handspans along the desk.", on: "hand-a", hint: "The big hand's key is at the bottom left." },
      { say: "Now tap the small hand to lay its handspans along the same desk.", on: "hand-b", hint: "The small hand's key is in the middle at the bottom." },
      { say: "Tap the tape to measure the desk in centimetres.", on: "tape", hint: "The tape's key is at the bottom right." },
    ],
    stepHold: 2200,
    ladder: ["Which hand fits more times along it?", "Pull out the tape: does its reading care whose hand it is?"],
    closing: "Handspans differ from person to person, so standard units give one reading.",
    learned: "You learned: handspans differ, so everyone uses standard units.",
    traceback: "Both hands lay their handspans along the one bench, each row ending at its end, and the tape reads the bench once in centimetres under both rows.",
    items: [
      /* learn ML2: answer in the plan = Both counted correctly with their own hands. Their hands are different sizes, so the counts differ, and a centimetre tape gives both of them the same length
         (plan: Two children measure the same bench with their hands. One counts 9 handspans and the other counts 12. Which count is right?) */
      { qid: "M1.S1.T2.C6:ML2", kind: "whose", thing: "bench", bench: 108, hands: [12, 9], who: ["big hand", "small hand"],
        counts: [9, 12], note: "both are right", winMs: 2800,
        say: "Two children count 9 and 12 handspans along the same bench: which is right?",
        ask: "Which count is right?",
        choices: [{ id: "only9", label: "just 9" }, { id: "only12", label: "just 12" }, { id: "bothright", label: "both" }],
        answer: "bothright", near: "only12",
        miss: "Did the bench change between the two counts?",
        win: "Yes, both are right, each by their hand." },
      /* practice 3: answer in the plan = Their hands are different sizes, so the same table takes more of the child's handspans. A standard unit such as the centimetre gives one answer
         (plan: A grown-up measures a table as 6 handspans and a child measures it as 9 handspans. Why are the numbers different?) */
      { qid: "M1.S1.T2.C6:3", kind: "why", thing: "table", bench: 108, hands: [18, 12], who: ["grown-up", "child"],
        counts: [6, 9], note: "the hands differ in size", winMs: 2800,
        say: "A table is 6 handspans for a grown-up and 9 for a child: why do they differ?",
        ask: "Why do the counts differ?",
        choices: [{ id: "handsize", label: "hand size" }, { id: "tablegrew", label: "table changed" }, { id: "miscount", label: "a miscount" }],
        answer: "handsize", near: "miscount",
        miss: "Lay both hands along the table: whose handspan is longer?",
        win: "Yes, a bigger hand fits fewer times." },
      /* practice 4: answer in the plan = A metre is the same for everyone, so the seller and the buyer get the same length. Handspans change from person to person */
      { qid: "M1.S1.T2.C6:4", kind: "cloth", thing: "cloth", bench: 108, hands: [12, 18], who: ["seller", "buyer"],
        counts: [9, 9], note: "a metre never changes", winMs: 2800,
        say: "Why is cloth sold by the metre and not by the handspan?",
        ask: "Why sell cloth by the metre?",
        choices: [{ id: "sameforall", label: "same for all" }, { id: "longerunit", label: "a longer unit" }, { id: "quicker", label: "quicker" }],
        answer: "sameforall", near: "longerunit",
        miss: "Would the buyer's bigger handspans give the same cloth?",
        win: "Yes, a metre is the same for everyone." },
    ],
  },
  {
    n: 3,
    concept: "Measuring from the zero mark",
    conceptId: "M1.S1.T2.C7", objectiveIds: ["O2"],
    says: ["Where does the ruler start? Count the centimetres it really covers."],
    warm: { kind: "read", obj: "eraser", from: 1, to: 4 },
    steps: [
      { say: "The eraser starts on the mark for 1, so tap Count to count the spaces it covers.", on: "count", hint: "Tap the Count key under the ruler." },
      { say: "Now tap Slide to move the eraser back to the first mark, the zero mark.", on: "slide", hint: "The key under the ruler now reads Slide." },
    ],
    stepHold: 2400,
    ladder: ["Which mark is the zero mark on this ruler?", "Put a finger on the object's left end and count one centimetre space at a time."],
    closing: "Start at the zero mark, even if no 0 is printed, and read the other end.",
    learned: "You learned: measure from the zero mark, the ruler's first mark.",
    traceback: "A bracket under the object counts the centimetre spaces it covers, the object slides back to the zero mark, and its length is written in centimetres.",
    items: [
      /* learn ML3: answer in the plan = 7 cm
         (plan: A crayon lies along a ruler. Its left end is on the first mark, which has no 0 printed on it, and its right end is on the mark for 7. How long is the crayon?) */
      { qid: "M1.S1.T2.C7:ML3", kind: "read", obj: "crayon", from: 0, to: 7, answer: 7, winMs: 2800,
        say: "The crayon lies from the zero mark: how many centimetres long is it?",
        ask: "Crayon's length in cm?",
        miss: "Count the spaces between the marks, not the marks themselves.",
        win: "Yes, the crayon is 7 cm long." },
      /* practice 5: answer in the plan = 12 cm, because the first mark is the zero mark
         (plan: A pencil's left end is on the first mark of a ruler, where no 0 is printed. Its right end is at 12. How long is the pencil?) */
      { qid: "M1.S1.T2.C7:5", kind: "read", obj: "pencil", from: 0, to: 12, answer: 12, winMs: 2800,
        say: "Now a pencil, laid from the same first mark: what is its length in cm?",
        ask: "Pencil's length in cm?",
        miss: "The pencil starts at the zero mark: which number sits under its tip?",
        win: "Yes, the pencil is 12 cm long." },
      /* practice 6: answer in the plan = 5 cm. From the mark for 1 to the mark for 6 is five centimetres; laid from the zero mark, its other end would sit at 5
         (plan: A child lays a key with one end on the mark for 1 and reads 6 at the other end. How long is the key?) */
      { qid: "M1.S1.T2.C7:6", kind: "read", obj: "key", from: 1, to: 6, answer: 5, winMs: 2800,
        say: "A key lies from the mark for 1 to the mark for 6: how long is the key, in cm?",
        ask: "Key's length in cm?",
        miss: "Does the key's left end sit on the first mark, or on another mark?",
        win: "Yes, 5 spaces, so the key is 5 cm long." },
    ],
  },
  {
    n: 4,
    concept: "Choosing a sensible unit",
    conceptId: "M1.S1.T2.C8", objectiveIds: ["O2"],
    says: ["Pick a unit that fits. Now guess. How close was your guess?"],
    warm: { kind: "warm4", thing: "pencil", estimate: 15, measure: 17 },
    steps: [
      { say: "Tap the unit that suits a pencil: cm, m or km.", on: "unit-cm", hint: "A pencil is about as long as your hand." },
      { say: "Tap Guess to write a guess of 15 cm on the guess card.", on: "guess", hint: "Tap the Guess key under the cards." },
      { say: "Now tap Measure to lay a ruler along the pencil from its zero mark.", on: "measure", hint: "The key under the cards now reads Measure." },
    ],
    stepHold: 2400,
    ladder: ["Which unit's picture matches that size?", "A fingertip is about 1 cm, a big step about 1 m, and towns are many km apart."],
    closing: "Pick a unit that suits the size, guess, then measure: the gap shows how close.",
    learned: "You learned: pick a unit to suit the size; find how far a guess is out.",
    traceback: "Metre sticks are laid along the thing and counted until it is covered, or the gap between the guess and the measure is counted on centimetre by centimetre.",
    items: [
      /* learn ML4: answer in the plan = About 10 m (the unit is the answer: the amount is given in the question) */
      { qid: "M1.S1.T2.C8:ML4", kind: "unit", thing: "bus", amount: 10, realCm: 1100, pad: "enter", winMs: 2800,
        say: "Tap the unit that fits: is a school bus about 10 cm, 10 m or 10 km long?",
        ask: "A bus is about 10 ___ long.", answer: "m", near: "cm",
        miss: "How big is a bus: about a finger, a step or a journey?",
        win: "Yes, a bus is about 10 metres long." },
      /* practice 7: answer in the plan = About 20 m. 20 cm is about the length of a new pencil, and 20 km is a long journey */
      { qid: "M1.S1.T2.C8:7", kind: "unit", thing: "pitch", amount: 20, realCm: 2012, pad: "enter", winMs: 2800,
        say: "And a cricket pitch: is it about 20 cm, 20 m or 20 km long?",
        ask: "A pitch is about 20 ___ long.", answer: "m", near: "km",
        miss: "Walk the pitch in your head: is it a short walk, or a long ride?",
        win: "Yes, a pitch is about 20 metres long." },
      /* practice 8: answer in the plan = By 6 cm; the estimate was 6 cm too long
         (plan: A child estimates a notebook to be 30 cm long, then measures it from the zero mark and finds 24 cm. By how much was the estimate out?) */
      { qid: "M1.S1.T2.C8:8", kind: "gap", thing: "notebook", estimate: 30, measure: 24, answer: 6, winMs: 2800,
        say: "A notebook guessed at 30 cm measures 24 cm: by how many cm was the guess out?",
        ask: "Out by how many cm?",
        miss: "Compare the two cards: how far is the guess from the measure?",
        ladder: ["Look from the notebook's end to the dashed line: the bar fills that gap.", "Count the centimetre spaces under the bar, one at a time."],
        win: "Yes, the guess was 6 cm too long." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL: any = {
  families: { length: ["mm", "cm", "m", "km"], weight: ["g", "kg"], capacity: ["mL", "L"] },
  bins: ["length", "weight", "capacity"],
  things: {
    rope: { name: "rope", kind: "length", unit: "m" },
    bag: { name: "school bag", kind: "weight", unit: "kg" },
    milk: { name: "jug of milk", kind: "capacity", unit: "L" },
    rice: { name: "bag of rice", kind: "weight", unit: "kg" },
    ribbon: { name: "ribbon", kind: "length", unit: "cm" },
    juice: { name: "glass of juice", kind: "capacity", unit: "mL" },
    bucket: { name: "bucket", kind: "capacity", unit: "L" },
    bottle: { name: "bottle of water", kind: "capacity", unit: "L" },
    coin: { name: "coin", kind: "weight", unit: "g" },
  },
  bench: { cmScale: 6.8, clothScale: 5 },
  ruler: { cm: 15, zeroPrinted: false, unitsPerCm: 52 },
  scale: { cm: 30, unitsPerCm: 27 },
  picker: [{ id: "cm", name: "centimetres" }, { id: "m", name: "metres" }, { id: "km", name: "kilometres" }],
  freeThings: [{ id: "crayon", cm: 7 }, { id: "eraser", cm: 4 }, { id: "key", cm: 5 }, { id: "pencil", cm: 12 }],
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* a sort is written "rope=length:m|bag=weight:kg|…": each thing, its bin and the unit card it wears */
const rbPlaces = (v: any) => {
  const out: any = {};
  String(v ?? "").split("|").forEach((s: string) => {
    const m = /^([a-z]+)=([a-z]*):([A-Za-z]*)$/.exec(s.trim());
    if (m) out[m[1]] = { bin: m[2] || null, unit: m[3] || null };
  });
  return out;
};
const rbCode = (things: string[], place: any) =>
  things.map((t: string) => t + "=" + ((place[t] && place[t].bin) || "") + ":" + ((place[t] && place[t].unit) || "")).join("|");

/* judge: is this value right for this item? (numbers compare as numbers; a sort takes any unit of the right kind) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (item.kind === "sort") {
    const pl = rbPlaces(v);
    return item.things.every((t: string) => pl[t] && pl[t].bin === MODEL.things[t].kind && MODEL.families[pl[t].bin].indexOf(pl[t].unit) >= 0);
  }
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work:
   a thing's kind from what you would do to it (lay it out, lift it, pour it), handspan counts times
   the handspan against the bench, spaces counted one by one, the unit whose size is nearest the thing */
const oracle = () => {
  const how: any = { rope: "lay", ribbon: "lay", bag: "lift", rice: "lift", milk: "pour", juice: "pour", bucket: "pour" };
  const fam: any = { lay: ["length", "mm cm m km"], lift: ["weight", "g kg"], pour: ["capacity", "mL L"] };
  const unitOk = (t: string, u: string) => fam[how[t]][1].split(" ").indexOf(u) >= 0;
  return PHASES.every((p: any) => p.items.every((it: any) => {
    if (it.kind === "sort") return it.things.every((t: string) => {
      const m = new RegExp("(^|\\|)" + t + "=(\\w+):(\\w+)").exec(it.answer);
      return !!m && m[2] === fam[how[t]][0] && unitOk(t, m[3]);
    });
    if (it.kind === "blank") return unitOk(it.things[0], it.answer) && it.choices.filter((c: any) => unitOk(it.things[0], c.id)).length === 1;
    if (it.kind === "whose") return it.counts[0] * it.hands[0] === it.bench && it.counts[1] * it.hands[1] === it.bench && it.answer === "bothright";
    if (it.kind === "why") return it.hands[0] !== it.hands[1] && it.counts[0] * it.hands[0] === it.counts[1] * it.hands[1] && it.answer === "handsize";
    if (it.kind === "cloth") return it.counts[0] * it.hands[0] !== it.counts[1] * it.hands[1] && it.answer === "sameforall";
    if (it.kind === "read") { let c = 0; for (let x = it.from; x < it.to; x++) c++; return c === it.answer; }
    if (it.kind === "unit") {
      const cmIn: any = { cm: 1, m: 100, km: 100000 };
      const off = (u: string) => Math.abs(Math.log((it.amount * cmIn[u]) / it.realCm));
      return Object.keys(cmIn).sort((a, b) => off(a) - off(b))[0] === it.answer;
    }
    if (it.kind === "gap") { let c = 0; for (let x = it.measure; x < it.estimate; x++) c++; return c === it.answer; }
    return false;
  }));
};
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => (item.near !== undefined ? item.near : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print (a word answer is one of the
   choices the question names, so only numbers have forms to hide) */
const answerForms = (item: any) => (typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)] : []);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* what the slot shows for an answer: a sort's unit cards, a choice's own words */
const RB_SHOWN: any = {};
PHASES.forEach((p: any) => p.items.forEach((it: any) => (it.choices || []).forEach((c: any) => { RB_SHOWN[c.id] = c.label; })));
const format = (v: any, _j?: any, o?: any) => {
  const s = String(v ?? ""), t = (o && o.tx) || ((x: any) => x);
  if (s.indexOf("=") >= 0) return s.split("|").map((x: string) => x.split(":")[1] || "").filter((x: string) => x).map((u: string) => t(u))
    .join(o && o.lang && o.lang !== "en" ? " " : "  ");
  return RB_SHOWN[s] || s;
};

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: nothing waits on this board, so Enter (and onEnter in a guide step) does it */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the picture ──────────────────────────────────────────────────────────────────────────── */

/* the chapter's colours: a count sky blue, a zero mark and a reading mark vermilion, a gap reddish
   purple, a larger unit (the metre stick) deep blue, every liquid pale blue */
const RB_SKY = "#56B4E9";
const RB_SKY_INK = shade(RB_SKY, 0.4);
const RB_MARK = CONTENT.pointer;
const RB_MARK_INK = shade(CONTENT.pointer, 0.25);
const RB_GAP = CONTENT.bead;
const RB_GAP_INK = shade(CONTENT.bead, 0.3);
const RB_METRE = CONTENT.hundred;
const RB_LIQUID = "#C4E4F4";
const RB_WOOD = "#E6D5B2";
const RB_CLOTH = "#DCE6EF";
const RB_TAPE = "#F5E6A8";
/* every phase is laid out in 900 x 520: the room the working area keeps with the wide panel open */
const RB_DW = 900;
/* phase 1: the tray (0-150) and three bins, the length bin wide enough for its four cards */
const RB_BIN_X = [0, 435, 675], RB_BIN_W = [420, 225, 225];
/* a thing sorted into a bin is drawn at RB_IN_BIN of its tray size, so three fit side by side in the narrow bins */
const RB_IN_BIN = 0.75;
/* each thing's drawn width at scale 1, so a long thing (the rope, the ribbon) shrinks to stay inside a narrow bin's third */
const RB_THING_W: any = { rope: 100, ribbon: 152, bag: 84, milk: 100, rice: 96, juice: 52, bucket: 80, bottle: 56, coin: 76 };
const rbInBin = (t: string, bin: string) => Math.min(RB_IN_BIN, (RB_BIN_W[Math.max(0, MODEL.bins.indexOf(bin))] / 3 - 12) / (RB_THING_W[t] || 100));
const RB_BIN_Y = 158, RB_BAR_H = 76, RB_BODY_Y = 240, RB_CARD_Y = 428, RB_CARD = 80, RB_BIN_B = 516, RB_BODY_B = 420;
/* a unit card is 92 wide: the Hindi and Gujarati symbols (किग्रा, મિલિ) need the room at the label size */
const RB_CARD_W = 92, RB_CARD_GAP = 8;
/* phase 2: the bench (or the cloth) strips and the three keys */
/* a strip is 80 tall: its tape on top and, under it, a reading chip tall enough for a Devanagari or Gujarati line */
const RB_STRIP_H = 80, RB_KEY2_Y = 410, RB_KEY2_H = 96, RB_KEY2_W = 250, RB_KEY2_X = [50, 325, 600];
/* phase 3 and free play: the 15 cm ruler, 52 units a centimetre, its first mark (the zero mark) at Z */
const RB3 = { Z: 84, sc: 52, y: 182, h: 108, objY: 110, brY: 306, keyY: 442, keyH: 72 };
const RB_RULER_CM = 15;
/* phase 4: the 30 cm scale, 27 units a centimetre; the picker; the guess and measure cards */
const RB4 = { Z: 62, sc: 27, cm: 30, objY: 60, scaleY: 150, scaleH: 76, barY: 232, cntY: 290, cardY: 296, cardH: 128, keyY: 438, keyH: 72, pickY: 288, pickH: 222 };
const RB_CARD4_X = [110, 510];

const rbBinOf = (u: string) => MODEL.bins.find((b: string) => MODEL.families[b].indexOf(u) >= 0) || "length";
const rbCardBox = (u: string) => {
  const bin = rbBinOf(u), b = MODEL.bins.indexOf(bin), fam = MODEL.families[bin], k = fam.indexOf(u);
  const tot = fam.length * RB_CARD_W + (fam.length - 1) * RB_CARD_GAP;
  return { x: RB_BIN_X[b] + (RB_BIN_W[b] - tot) / 2 + k * (RB_CARD_W + RB_CARD_GAP), y: RB_CARD_Y, w: RB_CARD_W, h: RB_CARD };
};
const rbFreeLen = (id: string) => (MODEL.freeThings.find((f: any) => f.id === id) || MODEL.freeThings[0]).cm;

/* phase 2: one strip (a bench, a table, a desk) with a row of handspans above and below it, or two strips of cloth,
   each with its own row above it */
function rbLanes(it: any) {
  const cloth = it.kind === "cloth", sc = cloth ? MODEL.bench.clothScale : MODEL.bench.cmScale, x0 = 80;
  const hh = (cm: number) => cm * sc * RB_HAND_H;
  if (!cloth) {
    const sy = 150;
    return { cloth, sc, x0, noteY: 352, strips: [{ y: sy, len: it.bench }],
      lanes: [{ span: it.hands[0], max: it.counts[0], y: sy - 4 - hh(it.hands[0]), h: hh(it.hands[0]) },
        { span: it.hands[1], max: it.counts[1], y: sy + RB_STRIP_H + 4, h: hh(it.hands[1]) }] };
  }
  /* two strips of cloth, the caption clear of the lower strip and of the keys */
  const ya = 100, yb = 250;
  return { cloth, sc, x0, noteY: 380, strips: [{ y: ya, len: it.counts[0] * it.hands[0] }, { y: yb, len: it.counts[1] * it.hands[1] }],
    lanes: [{ span: it.hands[0], max: it.counts[0], y: ya - 4 - hh(it.hands[0]), h: hh(it.hands[0]) },
      { span: it.hands[1], max: it.counts[1], y: yb - 4 - hh(it.hands[1]), h: hh(it.hands[1]) }] };
}

/* an everyday thing, drawn plainly about 150 x 100 around (cx, cy); quiet = a pale outline only */
function rbThing(id: string, cx: number, cy: number, s: number, ink: string, quiet?: boolean) {
  const f = (c: string) => (quiet ? "#FFFFFF" : c);
  const liq = f(RB_LIQUID);
  let body: any = null;
  if (id === "rope") body = (
    <g>
      <circle cx={0} cy={0} r={45} fill={f("#D9C39A")} stroke={ink} strokeWidth={3} />
      <circle cx={0} cy={0} r={33} fill="none" stroke={ink} strokeWidth={2.5} />
      <circle cx={0} cy={0} r={21} fill="none" stroke={ink} strokeWidth={2.5} />
      <circle cx={0} cy={0} r={9} fill={f("#C2A672")} stroke={ink} strokeWidth={2.5} />
      <path d="M 30 32 Q 40 40 44 46" fill="none" stroke={ink} strokeWidth={8} strokeLinecap="round" />
    </g>
  );
  else if (id === "bag") body = (
    <g>
      <path d="M -18 -30 Q 0 -56 18 -30" fill="none" stroke={ink} strokeWidth={6} />
      <rect x={-40} y={-32} width={80} height={76} rx={16} fill={f("#B7C2CC")} stroke={ink} strokeWidth={3} />
      <path d="M -40 -4 Q 0 18 40 -4" fill="none" stroke={ink} strokeWidth={3} />
      <rect x={-16} y={14} width={32} height={20} rx={5} fill={f("#DCE2E7")} stroke={ink} strokeWidth={2} />
    </g>
  );
  else if (id === "milk") body = (
    <g>
      <path d="M -32 -36 L 28 -36 L 22 40 Q 0 46 -26 40 Z" fill="#FFFFFF" />
      <path d="M -29.6 -6 L 25.6 -6 L 22 40 Q 0 46 -26 40 Z" fill={liq} />
      <path d="M -32 -36 L 28 -36 L 22 40 Q 0 46 -26 40 Z" fill="none" stroke={ink} strokeWidth={3} />
      <path d="M -32 -36 L -44 -44" stroke={ink} strokeWidth={3} strokeLinecap="round" />
      <path d="M 27 -26 Q 52 -22 48 4 Q 44 22 23 22" fill="none" stroke={ink} strokeWidth={5} />
    </g>
  );
  else if (id === "rice") body = (
    <g>
      <path d="M -34 -18 Q -46 40 -30 44 L 30 44 Q 46 40 34 -18 Q 16 -28 0 -24 Q -16 -28 -34 -18 Z" fill={f("#EFE6D0")} stroke={ink} strokeWidth={3} />
      <path d="M -14 -38 L 14 -38 L 9 -22 L -9 -22 Z" fill={f("#EFE6D0")} stroke={ink} strokeWidth={3} />
      <line x1={-13} y1={-25} x2={13} y2={-25} stroke={ink} strokeWidth={4} />
      {[[-12, 14], [4, 22], [16, 8], [-4, 32], [-18, 30], [20, 30]].map((q: number[], k: number) => <ellipse key={k} cx={q[0]} cy={q[1]} rx={3} ry={2} fill={ink} />)}
    </g>
  );
  else if (id === "ribbon") body = (
    <g>
      <path d="M -66 12 C -40 -22 -18 30 4 2 S 44 -24 66 6" fill="none" stroke={ink} strokeWidth={20} strokeLinecap="round" />
      <path d="M -66 12 C -40 -22 -18 30 4 2 S 44 -24 66 6" fill="none" stroke={f("#B98A64")} strokeWidth={13} strokeLinecap="round" />
    </g>
  );
  else if (id === "juice") body = (
    <g>
      <path d="M -24 -38 L 24 -38 L 18 40 L -18 40 Z" fill="#FFFFFF" />
      <path d="M -21.8 -10 L 21.8 -10 L 18 40 L -18 40 Z" fill={liq} />
      <path d="M -24 -38 L 24 -38 L 18 40 L -18 40 Z" fill="none" stroke={ink} strokeWidth={3} />
      <path d="M 6 -30 L 18 -52" stroke={ink} strokeWidth={4} strokeLinecap="round" />
    </g>
  );
  else if (id === "bottle") {
    const out = "M -8 -40 L 8 -40 L 8 -30 Q 20 -22 20 -6 L 20 40 Q 20 46 15 46 L -15 46 Q -20 46 -20 40 L -20 -6 Q -20 -22 -8 -30 Z";
    body = (
      <g>
        <path d={out} fill="#FFFFFF" />
        <path d="M -20 4 L 20 4 L 20 40 Q 20 46 15 46 L -15 46 Q -20 46 -20 40 Z" fill={liq} />
        <path d={out} fill="none" stroke={ink} strokeWidth={3} />
        <rect x={-10} y={-52} width={20} height={14} rx={4} fill={f("#7FA7C9")} stroke={ink} strokeWidth={3} />
      </g>
    );
  }
  else if (id === "coin") body = (
    <g>
      <circle cx={0} cy={4} r={36} fill={f("#C3CAD1")} stroke={ink} strokeWidth={3} />
      <circle cx={0} cy={4} r={27} fill="none" stroke={ink} strokeWidth={2} />
      <path d="M 0 -12 L 5 -1 L 17 0 L 8 8 L 11 20 L 0 13 L -11 20 L -8 8 L -17 0 L -5 -1 Z" fill={f("#A9B2BB")} stroke={ink} strokeWidth={2} strokeLinejoin="round" />
    </g>
  );
  else body = (
    <g>
      <path d="M -38 -22 L 38 -22 L 29 42 L -29 42 Z" fill={f("#CDD3D9")} stroke={ink} strokeWidth={3} />
      <ellipse cx={0} cy={-22} rx={38} ry={9} fill={liq} stroke={ink} strokeWidth={3} />
      <path d="M -38 -22 Q 0 -72 38 -22" fill="none" stroke={ink} strokeWidth={3} />
    </g>
  );
  return (
    <g transform={`translate(${cx},${cy}) scale(${s})`}>
      {body}
      {!quiet && id === "rope" && <Skin name="rope" x={-50} y={-49.4} w={100} h={98.8} />}
      {!quiet && id === "bag" && <Skin name="bag" x={-50} y={-56} w={100} h={100} />}
      {!quiet && id === "bottle" && <Skin name="bottle" x={-20.6} y={-53} w={41.25} h={100} />}
    </g>
  );
}

/* a unit card worn by a thing in its bin (the label is already in the language in use); 88 wide, so the
   Hindi and Gujarati symbols (किग्रा, મિલિ) keep the label size */
/* a tag stays inside its bin's walls */
const rbTagX = (x: number, b: number) => Math.min(Math.max(x, RB_BIN_X[b] + 48), RB_BIN_X[b] + RB_BIN_W[b] - 48);
function rbTag(cx: number, y: number, u: string, C: any, dashed?: boolean) {
  return (
    <g>
      <rect x={cx - 44} y={y} width={88} height={46} rx={10} fill="#FFFFFF" stroke={C.ink} strokeWidth={dashed ? 2.5 : 2} strokeDasharray={dashed ? "7 5" : undefined} />
      <text x={cx} y={y + 34} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{u}</text>
    </g>
  );
}

/* an open hand whose span (thumb tip to little finger tip) is w, top-left at (x, y), RB_HAND_H * w tall */
const RB_HAND_H = 0.66;
function rbHand(x: number, y: number, w: number, line: string, fill: string, sw: number) {
  const h = w * RB_HAND_H;
  const parts = [[0.5, 0.64, 0.19, 0.3, 0], [0.2, 0.7, 0.2, 0.1, 22], [0.36, 0.3, 0.075, 0.28, -12],
    [0.5, 0.24, 0.078, 0.31, 0], [0.64, 0.3, 0.074, 0.27, 12], [0.82, 0.46, 0.17, 0.085, -28]];
  const el = (q: number[], k: string, edge: boolean) => {
    const cx = x + q[0] * w, cy = y + q[1] * h;
    return <ellipse key={k} cx={cx} cy={cy} rx={q[2] * w} ry={q[3] * h} transform={`rotate(${q[4]} ${cx} ${cy})`}
      fill={edge ? line : fill} stroke={edge ? line : "none"} strokeWidth={edge ? sw * 2 : 0} />;
  };
  return <g>{parts.map((q, k) => el(q, "e" + k, true))}{parts.map((q, k) => el(q, "f" + k, false))}</g>;
}

/* the things laid on a ruler: the left end at x, the right end at x + w, inside a 90-tall band from y */
function rbObj(id: string, x: number, y: number, w: number, ink: string) {
  if (id === "crayon") return (
    <g>
      <rect x={x} y={y + 22} width={w - 54} height={46} rx={10} fill="#BFD8F2" stroke={ink} strokeWidth={3} />
      <rect x={x + 26} y={y + 22} width={Math.max(10, w - 140)} height={46} fill="#8FB6DE" stroke={ink} strokeWidth={2} />
      <path d={`M ${x + w - 56} ${y + 22} L ${x + w} ${y + 45} L ${x + w - 56} ${y + 68} Z`} fill="#BFD8F2" stroke={ink} strokeWidth={3} strokeLinejoin="round" />
    </g>
  );
  if (id === "pencil") return (
    <g>
      <rect x={x} y={y + 24} width={36} height={42} rx={8} fill="#D9D3CC" stroke={ink} strokeWidth={3} />
      <rect x={x + 34} y={y + 24} width={28} height={42} fill="#BCC3CA" stroke={ink} strokeWidth={3} />
      <rect x={x + 60} y={y + 24} width={Math.max(8, w - 130)} height={42} fill="#EAD9AE" stroke={ink} strokeWidth={3} />
      <path d={`M ${x + w - 70} ${y + 24} L ${x + w - 14} ${y + 41} L ${x + w - 14} ${y + 49} L ${x + w - 70} ${y + 66} Z`} fill="#E3CBA2" stroke={ink} strokeWidth={3} strokeLinejoin="round" />
      <path d={`M ${x + w - 14} ${y + 41} L ${x + w} ${y + 45} L ${x + w - 14} ${y + 49} Z`} fill={ink} />
    </g>
  );
  if (id === "key") return (
    <g>
      <rect x={x + 58} y={y + 36} width={w - 58} height={18} rx={4} fill="#C6CCD2" stroke={ink} strokeWidth={3} />
      <path d={`M ${x + w - 16} ${y + 54} v 14 h -14 v -8 h -14 v 10 h -14 v -16`} fill="#C6CCD2" stroke={ink} strokeWidth={3} strokeLinejoin="round" />
      <circle cx={x + 34} cy={y + 45} r={32} fill="#C6CCD2" stroke={ink} strokeWidth={3} />
      <circle cx={x + 26} cy={y + 45} r={9} fill="#FFFFFF" stroke={ink} strokeWidth={2} />
    </g>
  );
  return (
    <g>
      <rect x={x} y={y + 24} width={w} height={44} rx={9} fill="#E6E2DB" stroke={ink} strokeWidth={3} />
      <rect x={x + w * 0.5} y={y + 24} width={w * 0.5} height={44} rx={9} fill="#C8CFD6" stroke={ink} strokeWidth={3} />
    </g>
  );
}

/* the coiled tape, drawn round (0, -14) */
function rbCoil(C: any) {
  return (
    <g>
      <rect x={20} y={-14} width={46} height={16} rx={3} fill={RB_TAPE} stroke={C.ink} strokeWidth={2} />
      <circle cx={0} cy={-14} r={32} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} />
      <circle cx={0} cy={-14} r={21} fill="none" stroke={C.ink} strokeWidth={1.5} />
      <circle cx={0} cy={-14} r={10} fill="none" stroke={C.ink} strokeWidth={1.5} />
    </g>
  );
}

/* phase 4's things: a school bus 360 long (10 m) and a cricket pitch 530 long (20 m) */
function rbBus(C: any) {
  return (
    <g>
      <rect x={40} y={34} width={360} height={116} rx={18} fill="#E4DCC6" stroke={C.ink} strokeWidth={3} />
      {[0, 1, 2, 3, 4].map((k: number) => <rect key={k} x={60 + k * 58} y={52} width={44} height={40} rx={6} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />)}
      <rect x={354} y={52} width={30} height={78} rx={5} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
      {[112, 326].map((x: number) => (
        <g key={x}>
          <circle cx={x} cy={150} r={22} fill="#5A5A5A" stroke={C.ink} strokeWidth={3} />
          <circle cx={x} cy={150} r={8} fill="#D0D0D0" />
        </g>
      ))}
    </g>
  );
}
function rbPitch(C: any) {
  return (
    <g>
      <rect x={30} y={78} width={530} height={64} rx={6} fill="#E7DCBF" stroke={C.ink} strokeWidth={3} />
      <line x1={72} y1={78} x2={72} y2={142} stroke={C.ink} strokeWidth={1.5} />
      <line x1={518} y1={78} x2={518} y2={142} stroke={C.ink} strokeWidth={1.5} />
      {[40, 48, 56, 534, 542, 550].map((x: number) => <line key={x} x1={x} y1={64} x2={x} y2={100} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />)}
    </g>
  );
}
/* a notebook lying from x, w long */
function rbBook(x: number, y: number, w: number, C: any) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={80} rx={8} fill="#DCE4EA" stroke={C.ink} strokeWidth={3} />
      <rect x={x + 40} y={y + 22} width={Math.max(20, w * 0.4)} height={30} rx={5} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
      {Array.from({ length: 5 }).map((_: any, k: number) => <circle key={k} cx={x + 16} cy={y + 10 + k * 15} r={5} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />)}
    </g>
  );
}
/* the unit picker's pictures, top at y0, about 132 tall: a fingertip across a centimetre, one big step for a metre,
   a road between two towns for a kilometre; each with a bracket under it for its one unit */
function rbPick(id: string, cx: number, y0: number, C: any) {
  const bracket = (x0: number, x1: number) => <path d={`M ${x0} ${y0 + 122} v 10 H ${x1} v -10`} fill="none" stroke={C.ink} strokeWidth={3} />;
  if (id === "cm") return (
    <g>
      <rect x={cx - 110} y={y0 + 92} width={220} height={24} fill="#FBF5E6" stroke={C.ink} strokeWidth={2} />
      {[-78, -26, 26, 78].map((d: number) => <line key={d} x1={cx + d} y1={y0 + 92} x2={cx + d} y2={y0 + 104} stroke={C.ink} strokeWidth={2} />)}
      <rect x={cx - 24} y={y0} width={48} height={100} rx={24} fill="#EFE2D0" stroke={C.ink} strokeWidth={3} />
      <rect x={cx - 14} y={y0 + 8} width={28} height={26} rx={10} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
      <path d={`M ${cx - 12} ${y0 + 62} Q ${cx} ${y0 + 68} ${cx + 12} ${y0 + 62} M ${cx - 12} ${y0 + 72} Q ${cx} ${y0 + 78} ${cx + 12} ${y0 + 72}`} fill="none" stroke={C.ink} strokeWidth={1.5} />
      {bracket(cx - 26, cx + 26)}
    </g>
  );
  if (id === "m") return (
    <g>
      <path d={`M ${cx - 96} ${y0 + 54} Q ${cx} ${y0 - 6} ${cx + 96} ${y0 + 36}`} fill="none" stroke={C.ink} strokeWidth={2} strokeDasharray="8 7" />
      <ellipse cx={cx - 96} cy={y0 + 84} rx={19} ry={32} fill="#E6DDCF" stroke={C.ink} strokeWidth={3} />
      <ellipse cx={cx + 96} cy={y0 + 72} rx={19} ry={32} fill="#E6DDCF" stroke={C.ink} strokeWidth={3} />
      {bracket(cx - 96, cx + 96)}
    </g>
  );
  const town = (x: number) => (
    <g>
      {[0, 30].map((d: number) => (
        <g key={d}>
          <rect x={x + d - 13} y={y0 + 56 - d / 3} width={26} height={34 + d / 3} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
          <path d={`M ${x + d - 17} ${y0 + 56 - d / 3} L ${x + d} ${y0 + 40 - d / 3} L ${x + d + 17} ${y0 + 56 - d / 3} Z`} fill="#D9CDBB" stroke={C.ink} strokeWidth={2} />
        </g>
      ))}
    </g>
  );
  return (
    <g>
      {town(cx - 118)}
      {town(cx + 84)}
      <rect x={cx - 120} y={y0 + 92} width={240} height={24} rx={4} fill="#B9BDC1" stroke={C.ink} strokeWidth={2} />
      <line x1={cx - 110} y1={y0 + 104} x2={cx + 110} y2={y0 + 104} stroke="#FFFFFF" strokeWidth={3} strokeDasharray="14 10" />
      {bracket(cx - 110, cx + 110)}
    </g>
  );
}

/* a tap target on the working area: a labelled, focusable button; aria-disabled when it cannot act now (a tap on it is
   then inert, so in a guide step the runtime shows the step's hint) */
function RbTap({ id, x, y, w, h, onPress, label, on = true }: any) {
  const p = usePress(onPress, on);
  return (
    <rect className="c4-hit" data-control={id} role="button" tabIndex={on ? 0 : -1} aria-label={label || id}
      aria-disabled={on ? undefined : "true"} x={x} y={y} width={w} height={h} fill="transparent"
      {...(on ? p.bind() : {})} onKeyDown={p.keys} />
  );
}

/* the working area: 1472 x 520 (900 x 520 with the panel open), origin at its top-left; each phase's picture is
   900 wide, centred while the panel is shut and clear of the key's corner. Drawing helpers are called, never mounted. */
function Work({ n, item, index, stage, wrong, api, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const P: any = PHASES[(n || 1) - 1] || PHASES[0];
  /* a phase opens on "teach" for one frame before "demo": treat it as the warm-up, at step 0 (PATTERNS §18) */
  const warm = !free && !!P.warm && (stage === "demo" || stage === "teach");
  const stp = stage === "teach" ? 0 : step || 0;
  const it: any = free ? { kind: "free" } : warm ? P.warm : item || { kind: "none" };
  const K = it.kind;
  const won = !free && !warm && (stage === "win" || stage === "idle");
  const asking = !free && !warm && stage === "ask";

  /* the board belongs to one ENTRY of a question (PATTERNS §18): rebuilt in render when the entry changes */
  const qk = free ? "free" : warm ? n + ":w" : n + ":" + index;
  const ent = useRef<any>({ k: qk, e: 0 });
  if (ent.current.k !== qk) ent.current = { k: qk, e: ent.current.e + 1 };
  const ik = qk + "#" + ent.current.e;
  const ikRef = useRef(ik);
  ikRef.current = ik;
  const fresh = (): any => ({
    place: {}, sel: warm && K === "sort" ? { t: "thing", id: it.things[0] } : null, carry: null, flash: null, demo: null,
    a: 0, b: 0, tape: 0,
    left: K === "read" ? it.from : 1, pos: null, count: 0, obj: "crayon",
    pick: null, gw: 0, measured: false, nudged: false, flagAt: 0,
  });
  const [raw, setRaw] = useState<any>(() => ({ ik, ...fresh() }));
  const st: any = raw.ik === ik ? raw : { ik, ...fresh() };
  const stRef = useRef<any>(st);
  stRef.current = st;
  const put = (o: any) => {
    if (ikRef.current !== ik) return;
    const next = { ...stRef.current, ...o };
    stRef.current = next;
    setRaw(next);
  };

  /* the picture's origin: 900 wide, centred in the room, never under the key's corner */
  const bw = box && box.w ? box.w : 1472;
  const kx = box && box.key ? box.key.x - 12 : bw;
  const ox = Math.round(Math.max(0, Math.min((bw - RB_DW) / 2, kx - RB_DW)));
  const WP = (p: any) => ({ x: p.x + ox, y: p.y });

  /* an act performed on screen (PATTERNS §15): one at a time; the state changes only when it resolves true */
  const playing = useRef(false);
  const run = (o: any, done: () => void, fail?: () => void) => {
    if (playing.current) return;
    playing.current = true;
    const mine = ik;
    api.act(o).then((ok: boolean) => setTimeout(() => {
      playing.current = false;
      if (ikRef.current !== mine) return;
      if (ok) done(); else if (fail) fail();
    }, 60));
  };
  const busy = () => playing.current || !!tl.busy;
  /* a nudge said at an early Enter stays until the child's next act brings the question back (PATTERNS §18) */
  const restore = () => { if (stRef.current.nudged) { put({ nudged: false }); api.say(it.say); } };

  /* the correction's layer (st.demo) or, once the answer is given, the same picture finished */
  const LN: any = K === "whose" || K === "why" || K === "cloth" ? rbLanes(it) : null;
  const doneDemo = (): any => {
    if (K === "sort") return { list: [], k: 0, done: true };
    if (K === "blank") return { k: 2, done: true };
    if (LN) return { k: 99, tape: 1, done: true };
    if (K === "read") return { k: it.to - it.from, pos: 0, done: true };
    if (K === "unit") return { k: it.amount, done: true };
    if (K === "gap") return { k: it.estimate - it.measure, done: true };
    return null;
  };
  const D: any = st.demo || (won ? doneDemo() : null);

  /* ── phase 1: tap a thing, then its bin (anywhere on the bin), then a card of that bin ── */
  const things: string[] = it.things || [];
  const idxOf = (t: string) => Math.max(0, things.indexOf(t));
  const trayPt = (t: string) => ({ x: (RB_DW * (idxOf(t) + 0.5)) / Math.max(1, things.length), y: 56 });
  /* a tray place: as wide as a long name needs, never wider than its share of the tray */
  const trayW = Math.min(300, RB_DW / Math.max(1, things.length) - 10);
  /* each bin's pieces, ONE slot a piece (the child's own things in item order, then the correction's copies): up to four in
     a row in the length bin, two a row in the narrow bins, so no two pieces, tags or tap boxes ever overlap */
  const binCells = (place: any, ghosts: string[]) => {
    const out: any = {};
    MODEL.bins.forEach((bin: string, b: number) => {
      const own = things.filter((t: string) => place[t] && place[t].bin === bin);
      const gh = ghosts.filter((t: string) => MODEL.things[t].kind === bin && own.indexOf(t) < 0);
      const ps = [...own.map((t: string) => ({ t, ghost: false })), ...gh.map((t: string) => ({ t, ghost: true }))];
      const cols = ps.length <= 1 ? 1 : Math.min(ps.length, RB_BIN_W[b] >= 400 ? 4 : 2), rows = Math.max(1, Math.ceil(ps.length / cols));
      const cw = RB_BIN_W[b] / cols, ch = (RB_BODY_B - RB_BODY_Y) / rows;
      ps.forEach((p: any, j: number) => {
        const x = RB_BIN_X[b] + (j % cols) * cw, y = RB_BODY_Y + Math.floor(j / cols) * ch;
        const sc = Math.min(RB_IN_BIN, (cw - 14) / (RB_THING_W[p.t] || 100), (ch - 52) / 100);
        out[(p.ghost ? "g:" : "") + p.t] = { bin, b, x, y, w: cw, h: ch, cx: x + cw / 2, cy: y + (ch - 50) / 2, sc, tagY: y + ch - 50 };
      });
    });
    return out;
  };
  const cardNode = (u: string) => (
    <g>
      <rect x={-46} y={-40} width={92} height={80} rx={14} fill="#FFFFFF" stroke={C.ink} strokeWidth={2.5} />
      <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(u)}</text>
    </g>
  );
  /* the guide step's own result line replaces its instruction once the LAST step's act is done (one literal a phase) */
  const stepDone = (name: string) => {
    const sts = P.steps || [];
    if (warm && sts.length && sts[sts.length - 1].on === name) {
      if (n === 1) api.say("The coin now sits in the weight bin with its g card.");
      else if (n === 2) api.say("The tape gives the desk one reading for both hands.");
      else if (n === 3) api.say("Now the eraser starts at the zero mark and reads 3.");
      else if (n === 4) api.say("The pencil measures 17 cm, so the guess was 2 cm short.");
    }
    api.did(name);
  };
  /* a tap during the correction ends it at once (its whole answer stays drawn) and then does what the child asked */
  const endTrace = () => {
    if (!tl.busy) return;
    tl.stop();
    const cur = stRef.current.demo;
    put({ demo: cur && cur.list ? { ...cur, k: cur.list.length, done: true } : doneDemo() });
    api.lock(false);
  };
  /* the warm-up: a hand carries the coin to its bin, then its card onto it (the act performed on screen) */
  const warmPlace = (t: string, bin: string) => {
    if (stRef.current.place[t]) { api.did("bin-" + bin); return; }
    const to = binCells({ ...stRef.current.place, [t]: { bin, unit: null } }, [])[t];
    put({ carry: t });
    run({ tool: "hand", moves: "carry", from: WP(trayPt(t)), at: [WP({ x: to.cx, y: to.cy })], hold: rbThing(t, 0, 0, to.sc, C.ink) },
      () => { const s2 = stRef.current; put({ place: { ...s2.place, [t]: { bin, unit: null } }, carry: null, sel: { t: "thing", id: t } }); stepDone("bin-" + bin); },
      () => put({ carry: null }));
  };
  const warmCard = (t: string, u: string) => {
    const c = binCells(stRef.current.place, [])[t];
    if (!c) { api.did("card-" + u); return; }
    const cb = rbCardBox(u);
    run({ tool: "hand", moves: "carry", from: WP({ x: cb.x + cb.w / 2, y: cb.y + cb.h / 2 }), at: [WP({ x: c.cx, y: c.tagY + 23 })], hold: cardNode(u) },
      () => { const s2 = stRef.current; put({ place: { ...s2.place, [t]: { bin: c.bin, unit: u } }, sel: null }); stepDone("card-" + u); });
  };
  /* a question: a move is the child's own and lands at once (the thing glides into its slot), so no tap or Enter is ever lost */
  const placeThing = (t: string, bin: string) => {
    const s = stRef.current, old = s.place[t];
    put({ place: { ...s.place, [t]: { bin, unit: old && old.bin === bin ? old.unit : null } }, sel: { t: "thing", id: t }, demo: null });
    api.sfx.tick();
    restore();
  };
  /* a tap on a thing counts once: a double tap never selects and lets go again */
  const lastThing = useRef<any>({ t: "", at: 0 });
  const pressThing = (t: string) => {
    if (warm) { api.did("thing-" + t); return; }
    if (!asking) return;
    endTrace();
    const now = Date.now();
    if (lastThing.current.t === t && now - lastThing.current.at < 400) return;
    lastThing.current = { t, at: now };
    const s = stRef.current, pl = s.place[t];
    if (s.sel && s.sel.t === "card" && pl) { giveCard(s.sel.u, t); return; }
    /* another thing is held: a tap on a thing that sits in a bin is a tap on that bin */
    if (s.sel && s.sel.t === "thing" && s.sel.id !== t && pl) {
      const held = s.place[s.sel.id];
      if (!held || held.bin !== pl.bin) { placeThing(s.sel.id, pl.bin); return; }
    }
    put({ sel: s.sel && s.sel.t === "thing" && s.sel.id === t ? null : { t: "thing", id: t }, demo: null });
    api.sfx.tick();
  };
  const pressBin = (bin: string) => {
    const name = "bin-" + bin;
    if (warm) { if (stepOn === name && !busy()) warmPlace(things[0], bin); else api.did(name); return; }
    if (!asking) return;
    endTrace();
    const s = stRef.current;
    if (s.sel && s.sel.t === "thing") { placeThing(s.sel.id, bin); return; }
    put({ nudged: true });
    api.say("Tap a thing first, then tap its bin.");
  };
  /* a card sticks only to a thing sorted into the card's own bin; else it stays home and the thing's bin lights */
  const giveCard = (u: string, t: string) => {
    const pl = stRef.current.place[t];
    if (!pl) return;
    if (pl.bin !== rbBinOf(u)) { put({ sel: null, flash: pl.bin, demo: null }); api.sfx.tick(); return; }
    const s2 = stRef.current;
    put({ place: { ...s2.place, [t]: { bin: pl.bin, unit: u } }, sel: null, demo: null });
    api.sfx.tick();
    restore();
  };
  const pressCard = (u: string) => {
    const name = "card-" + u;
    if (warm) {
      if (stepOn === name && !busy() && stRef.current.place[things[0]]) warmCard(things[0], u);
      else api.did(name);
      return;
    }
    if (!asking) return;
    endTrace();
    const s = stRef.current;
    if (s.sel && s.sel.t === "thing") {
      if (s.place[s.sel.id]) giveCard(u, s.sel.id);
      else { put({ flash: rbBinOf(u), nudged: true }); api.sfx.tick(); api.say("Put the thing in a bin first, then give it a card."); }
      return;
    }
    put({ sel: s.sel && s.sel.t === "card" && s.sel.u === u ? null : { t: "card", u }, demo: null });
    api.sfx.tick();
  };

  /* ── phase 2: a hand lays its whole row of handspans (the hand taps each), the tape reads the bench ── */
  const pressHand = (r: number) => {
    const name = r ? "hand-b" : "hand-a";
    if (warm && stepOn !== name) { api.did(name); return; }
    if (asking) endTrace();
    if (!LN || busy() || (!warm && !asking)) return;
    const s = stRef.current, L = LN.lanes[r], cur = r ? s.b : s.a;
    if (cur >= L.max) { if (warm) api.did(name); return; }
    const at: any[] = [];
    for (let k = cur; k < L.max; k++) at.push(WP({ x: LN.x0 + (k + 0.5) * L.span * LN.sc, y: L.y + L.h * 0.55 }));
    put({ demo: null });
    run({ tool: "hand", moves: "tap", at, onPoint: (i: number) => put(r ? { b: cur + i + 1 } : { a: cur + i + 1 }) },
      () => { put(r ? { b: L.max } : { a: L.max }); if (warm) stepDone(name); });
  };
  const pressTape = () => {
    if (warm && stepOn !== "tape") { api.did("tape"); return; }
    if (asking) endTrace();
    if (!LN || busy() || (!warm && !asking)) return;
    if (stRef.current.tape >= 1) { if (warm) api.did("tape"); return; }
    const S = LN.strips[LN.strips.length - 1], N = 6, y = S.y + 13;
    const at: any[] = [];
    for (let j = 1; j <= N; j++) at.push(WP({ x: LN.x0 + (S.len * LN.sc * j) / N, y }));
    put({ demo: null });
    run({ tool: "hand", moves: "push", from: WP({ x: LN.x0, y }), at, onPoint: (i: number) => put({ tape: (i + 1) / N }),
      hold: <rect x={-8} y={-12} width={16} height={24} rx={3} fill={RB_TAPE} stroke={C.ink} strokeWidth={2} /> },
    () => { put({ tape: 1 }); if (warm) stepDone("tape"); });
  };

  /* ── phase 3 and free play: Count (a pencil ticks each space), Slide (a hand pushes the thing) ── */
  const objId = free ? st.obj : it.obj || "crayon";
  const objLen = free ? rbFreeLen(st.obj) : K === "read" ? it.to - it.from : 0;
  const pressCount = () => {
    if (warm && stepOn !== "count") { api.did("count"); return; }
    if (busy() || (!warm && !free)) return;
    const s = stRef.current;
    if (warm && s.count >= objLen) { api.did("count"); return; }
    const at: any[] = [];
    for (let j = 0; j < objLen; j++) at.push(WP({ x: RB3.Z + (s.left + j + 0.5) * RB3.sc, y: RB3.brY + 18 }));
    put({ count: 0 });
    run({ tool: "pencil", moves: "tap", at, onPoint: (i: number) => put({ count: i + 1 }) },
      () => { put({ count: objLen }); if (warm) stepDone("count"); });
  };
  const pressSlide = (dir: number) => {
    if (warm && stepOn !== "slide") { api.did("slide"); return; }
    if (busy() || (!warm && !free)) return;
    const s = stRef.current, from = s.left, to = warm ? 0 : Math.max(0, Math.min(RB_RULER_CM - objLen, from + dir));
    if (to === from) { if (warm) api.did("slide"); return; }
    const right = !warm && dir > 0, N = Math.min(8, 4 * Math.abs(to - from)), y = RB3.objY + 45;
    const edge = (l: number) => RB3.Z + (right ? l : l + objLen) * RB3.sc + (right ? -18 : 18);
    const at: any[] = [];
    for (let j = 1; j <= N; j++) at.push(WP({ x: edge(from + ((to - from) * j) / N), y }));
    run({ tool: "hand", moves: "push", from: WP({ x: edge(from), y }), at, onPoint: (i: number) => put({ pos: from + ((to - from) * (i + 1)) / N }) },
      () => { put({ left: to, pos: null }); if (warm) stepDone("slide"); },
      () => put({ pos: null }));
  };
  const pickObj = (id: string) => {
    if (!free || busy()) return;
    put({ obj: id, left: Math.min(stRef.current.left, RB_RULER_CM - rbFreeLen(id)), count: 0, pos: null });
    api.sfx.tick();
  };

  /* ── phase 4: pick a unit (Enter answers); Guess (a pencil writes it), Measure (a ruler slides in) ── */
  const pressUnit = (u: string) => {
    const name = "unit-" + u;
    if (warm) { if (stepOn === name) { put({ pick: u }); api.sfx.tick(); stepDone(name); } else api.did(name); return; }
    if (asking) endTrace();
    if (!asking || busy() || K !== "unit") return;
    put({ pick: u, demo: null });
    api.sfx.tick();
    restore();
  };
  const guessText = (k: number) => {
    const ds = String(it.estimate || "");
    return ds.slice(0, Math.min(k, ds.length)) + (k > ds.length ? " " + tx("cm") : "");
  };
  const pressGuess = () => {
    if (stepOn !== "guess") { api.did("guess"); return; }
    if (busy()) return;
    const ds = String(it.estimate), N = ds.length + 1, x0 = RB_CARD4_X[0] + 64, y = RB4.cardY + 108;
    const at: any[] = [];
    for (let j = 0; j < N; j++) at.push(WP({ x: x0 + 18 + j * 34, y }));
    run({ tool: "pencil", moves: "push", at, onPoint: (i: number) => put({ gw: i + 1 }) },
      () => { put({ gw: N }); stepDone("guess"); });
  };
  const pressMeasure = () => {
    if (stepOn !== "measure") { api.did("measure"); return; }
    if (busy()) return;
    const y = RB4.scaleY;
    run({ tool: "ruler", moves: "slide", from: WP({ x: RB4.Z - 14, y }), to: WP({ x: RB4.Z + RB4.cm * RB4.sc + 14, y }),
      at: [WP({ x: RB4.Z + it.measure * RB4.sc, y })], onPoint: () => put({ measured: true }) },
    () => { put({ measured: true }); stepDone("measure"); });
  };

  /* GUIDE STEPS: Enter, the agent's check() and the dev solve() perform the CURRENT step's act */
  const act = (on: any) => {
    if (!on) return;
    if (on.indexOf("bin-") === 0) pressBin(on.slice(4));
    else if (on.indexOf("card-") === 0) pressCard(on.slice(5));
    else if (on === "hand-a") pressHand(0);
    else if (on === "hand-b") pressHand(1);
    else if (on === "tape") pressTape();
    else if (on === "count") pressCount();
    else if (on === "slide") pressSlide(-1);
    else if (on.indexOf("unit-") === 0) pressUnit(on.slice(5));
    else if (on === "guess") pressGuess();
    else if (on === "measure") pressMeasure();
  };
  HOOK.demo = () => { if (stage === "demo" && stepOn) act(stepOn); };

  /* what the child has made on the working area, as the judge reads it */
  const sortDone = K === "sort" && things.every((t: string) => st.place[t] && st.place[t].unit);
  const code = K === "sort" ? rbCode(things, st.place) : K === "unit" ? st.pick || "" : "";
  const ready = asking && (K === "sort" ? sortDone : K === "unit" ? !!st.pick : false);
  const sameMiss = !!wrong && String(wrong.value) === code;

  /* the agent sets a working-area answer as a child would */
  HOOK.set = (v: any) => {
    if (!asking) return false;
    if (K === "sort") {
      const pl = rbPlaces(v);
      if (!things.every((t: string) => pl[t])) return false;
      put({ place: pl, sel: null, demo: null });
      return true;
    }
    if (K === "unit") {
      const u = String(v ?? "").trim();
      if (!MODEL.picker.some((c: any) => c.id === u)) return false;
      put({ pick: u, demo: null });
      return true;
    }
    return false;
  };

  /* Enter answers what the child has made on the working area, never the same work twice */
  if (warm) api.onEnter(stage === "demo" && stepOn ? () => act(stepOn) : null);
  else if (asking && (K === "sort" || K === "unit")) api.onEnter(() => {
    if (busy()) return;
    const s = stRef.current;
    const c = K === "sort" ? rbCode(things, s.place) : s.pick || "";
    const whole = K === "sort" ? things.every((t: string) => s.place[t] && s.place[t].unit) : !!s.pick;
    if (!whole) {
      /* the things still waiting ring for a moment, so the nudge shows on the board even while a miss's hint holds the bubble */
      put({ nudged: true, flagAt: K === "sort" ? Date.now() : 0 });
      api.say(K === "sort" ? "Each thing needs a bin and a unit card first." : "Tap one of the three units first.");
      return;
    }
    if (wrong && String(wrong.value) === c) return;
    put({ sel: null });
    api.submit(c);
  });
  else api.onEnter(null);

  /* the Enter key in the corner blinks once the work is whole (and is not the answer just missed) */
  useEffect(() => {
    if (!asking || it.pad !== "enter") return;
    api.answerReady(ready && !sameMiss);
  }, [ready, code, stage, ik, sameMiss]);

  /* a win line of the question's own (the phase's closing replaces the last one) */
  useEffect(() => {
    if (stage === "win" && !free && item && item.win) api.say(item.win);
  }, [stage]);

  /* a card that will not stick lights the thing's own bin for a moment */
  useEffect(() => {
    if (!st.flash) return;
    const t = setTimeout(() => put({ flash: null }), 900);
    return () => clearTimeout(t);
  }, [st.flash, ik]);

  /* the early-Enter rings fade after a moment */
  useEffect(() => {
    if (!st.flagAt) return;
    const t = setTimeout(() => put({ flagAt: 0 }), 1600);
    return () => clearTimeout(t);
  }, [st.flagAt, ik]);

  /* a correction replay never outlives its question */
  useEffect(() => () => { tl.stop(); }, [ik]);

  /* the traceback: redraw the maths in steps, ending on the whole right answer; nothing marked */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    const set = (d: any) => put({ demo: d });
    const tick = () => api.sfx.tick();
    const steps: any[] = [];
    if (K === "sort") {
      const pl = rbPlaces(wrong.value);
      /* each thing not in its own bin, in the answer given or on the board, is drawn again in its own bin */
      const bd = stRef.current.place;
      const list = things.filter((t: string) => !(pl[t] && pl[t].bin === MODEL.things[t].kind) || !(bd[t] && bd[t].bin === MODEL.things[t].kind));
      steps.push([600, () => put({ sel: null, demo: { list, k: 0 } })]);
      list.forEach((_t: string, j: number) => steps.push([900, () => { set({ list, k: j + 1 }); tick(); }]));
      steps.push([0, () => set({ list, k: list.length, done: true })]);
    } else if (K === "blank") {
      steps.push([300, () => set({ k: -1 })]);
      for (let b = 0; b < 3; b++) steps.push([800, () => { set({ k: b }); tick(); }]);
      steps.push([0, () => set({ k: 2, done: true })]);
    } else if (LN) {
      const mx = Math.max(it.counts[0], it.counts[1]);
      steps.push([300, () => set({ k: 0 })]);
      for (let k = 1; k <= mx; k++) steps.push([170, () => { set({ k }); tick(); }]);
      [0.25, 0.5, 0.75, 1].forEach((f: number) => steps.push([220, () => set({ k: mx, tape: f })]));
      steps.push([0, () => set({ k: mx, tape: 1, done: true })]);
    } else if (K === "read") {
      const len = it.to - it.from;
      steps.push([400, () => set({ k: 0, pos: it.from })]);
      for (let j = 1; j <= len; j++) steps.push([300, () => { set({ k: j, pos: it.from }); tick(); }]);
      if (it.from > 0) for (let f = 1; f <= 4; f++) steps.push([180, () => set({ k: len, pos: it.from * (1 - f / 4) })]);
      steps.push([0, () => set({ k: len, pos: 0, done: true })]);
    } else if (K === "unit") {
      const gap = it.amount > 12 ? 110 : 200;
      steps.push([400, () => set({ k: 0 })]);
      for (let j = 1; j <= it.amount; j++) steps.push([gap, () => { set({ k: j }); if (it.amount <= 12 || j % 5 === 0) tick(); }]);
      steps.push([0, () => set({ k: it.amount, done: true })]);
    } else if (K === "gap") {
      const g = it.estimate - it.measure;
      steps.push([400, () => set({ k: 0 })]);
      for (let j = 1; j <= g; j++) steps.push([320, () => { set({ k: j }); tick(); }]);
      steps.push([0, () => set({ k: g, done: true })]);
    }
    if (!steps.length) return;
    api.lock(true);
    tl.run(steps, () => api.lock(false));
  }, [wrong]);

  /* what the host and the agent read back (toolApi.getState): the child's own work, never an answer */
  api.share({
    complete: stage === "idle",
    bins: K === "sort" ? st.place : null,
    spanCount: LN ? [st.a, st.b] : null,
    tapeReading: LN && st.tape >= 1 ? LN.strips.map((x: any) => x.len) : null,
    objectStart: K === "read" || free ? st.left : null,
    unitPicked: K === "unit" || K === "warm4" ? st.pick : null,
  });

  /* ── drawing ── */
  const inviteBox = (x: number, y: number, w: number, h: number, rx = 18) => <Invite x={x + w / 2} y={y + h / 2} w={w} h={h} rx={rx} C={C} />;
  /* a key's word: the theme's key ink on a live key, the plain ink on a flat (disabled) one, so it never fades away */
  const keyText = (s: string, y = 11, off = false) => <text y={y} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={off ? C.ink : toneInk("key", C.ink)}>{s}</text>;

  /* phase 1 */
  const drawBins = (live: boolean, cells: any) => {
    const lit = (bin: string) => st.flash === bin || (K === "blank" && D && D.k >= 0 && MODEL.bins[D.k] === bin)
      || (K === "sort" && D && D.list && D.list.slice(0, D.k).some((t: string) => MODEL.things[t].kind === bin));
    const used = (bin: string) => Object.keys(cells).some((k: string) => cells[k].bin === bin);
    return (
      <g>
        {MODEL.bins.map((bin: string, b: number) => {
          const x = RB_BIN_X[b], w = RB_BIN_W[b];
          return (
            <g key={bin}>
              <rect x={x} y={RB_BIN_Y} width={w} height={RB_BIN_B - RB_BIN_Y} rx={18} fill={tint(C.panel, 0.45)} stroke={C.ink} strokeWidth={2.5} />
              <rect x={x} y={RB_BIN_Y} width={w} height={RB_BAR_H} rx={18} fill={lit(bin) ? tint(C.accent, 0.6) : C.panel} stroke={C.ink} strokeWidth={2.5} />
              <text x={x + w / 2} y={RB_BIN_Y + 52} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{tx(bin)}</text>
              {MODEL.families[bin].map((u: string) => {
                const cb = rbCardBox(u), on = st.sel && st.sel.t === "card" && st.sel.u === u;
                return (
                  <g key={u}>
                    <rect x={cb.x} y={cb.y} width={cb.w} height={cb.h} rx={14} fill="#FFFFFF" stroke={on ? shade(C.accent, 0.1) : C.ink} strokeWidth={on ? 6 : 2.5} />
                    <text x={cb.x + cb.w / 2} y={cb.y + 51} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(u)}</text>
                  </g>
                );
              })}
            </g>
          );
        })}
        {/* the whole bin takes a tap: its name bar always, its body too while nothing sits in it (a piece in it is its own control,
            and a tap on that piece while another thing is held puts the held thing in this bin) */}
        {live && MODEL.bins.map((bin: string, b: number) => (
          <RbTap key={"tb" + bin} id={"bin-" + bin} label={tx(bin)} x={RB_BIN_X[b]} y={RB_BIN_Y} w={RB_BIN_W[b]}
            h={used(bin) ? RB_BAR_H : RB_BODY_B - RB_BIN_Y} onPress={() => pressBin(bin)} />
        ))}
        {live && MODEL.bins.map((bin: string) => MODEL.families[bin].map((u: string) => {
          const cb = rbCardBox(u);
          return <RbTap key={"tc" + u} id={"card-" + u} label={tx(u)} x={cb.x} y={cb.y} w={cb.w} h={cb.h} onPress={() => pressCard(u)} />;
        }))}
      </g>
    );
  };
  const drawSort = () => {
    const live = warm || asking;
    const selT = st.sel && st.sel.t === "thing" ? st.sel.id : null;
    const ghosts: string[] = D && D.list ? D.list.slice(0, D.k) : [];
    const cells = binCells(st.place, ghosts);
    const glide = reducedMotion() ? undefined : "transform 0.35s ease";
    const ring = (x: number, y: number, w: number, h: number, dashed?: boolean) => (
      <rect x={x + 2} y={y + 2} width={w - 4} height={h - 4} rx={14} fill="none" stroke={shade(C.accent, 0.1)} strokeWidth={5} strokeDasharray={dashed ? "10 8" : undefined} pointerEvents="none" />
    );
    const boxOf = (t: string) => { const c = cells[t], p = trayPt(t); return c ? { x: c.x, y: c.y, w: c.w, h: c.h } : { x: p.x - trayW / 2, y: 4, w: trayW, h: 142 }; };
    return (
      <g>
        <rect x={0} y={0} width={RB_DW} height={150} rx={20} fill={tint(C.panel, 0.25)} stroke={C.rule} strokeWidth={2} />
        {drawBins(live, cells)}
        {/* the correction: each thing not yet in its own bin, its own copy as a faint picture in a dashed outline (no fill) in a
            slot of its own, wearing a unit card of that bin; the child's own pieces stay where they were set */}
        {ghosts.length > 0 && (
          <g pointerEvents="none">
            {ghosts.map((t: string) => {
              const c = cells["g:" + t];
              if (!c) return null;
              return (
                <g key={"g" + t}>
                  <rect x={c.x + 4} y={c.y + 4} width={c.w - 8} height={c.h - 8} rx={14} fill="none" stroke={C.ink} strokeWidth={2.5} strokeDasharray="9 7" />
                  <g opacity={0.45}>{rbThing(t, c.cx, c.cy, c.sc, C.ink)}</g>
                  {rbTag(c.cx, c.tagY, tx(MODEL.things[t].unit), C)}
                </g>
              );
            })}
          </g>
        )}
        {things.map((t: string) => {
          if (st.carry === t) return null;
          const c = cells[t], tp = trayPt(t), pl = st.place[t];
          const x = c ? c.cx : tp.x, y = c ? c.cy : 54, sc = c ? c.sc : 0.95;
          return (
            <g key={t}>
              {!c && <text x={tp.x} y={132} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(MODEL.things[t].name)}</text>}
              {c && pl && pl.unit && rbTag(c.cx, c.tagY, tx(pl.unit), C)}
              <g style={{ transform: `translate(${x}px, ${y}px)`, transition: glide } as any}>{rbThing(t, 0, 0, sc, C.ink)}</g>
            </g>
          );
        })}
        {selT && !st.carry && (() => { const bx = boxOf(selT); return ring(bx.x, bx.y, bx.w, bx.h); })()}
        {st.flagAt && things.filter((t: string) => !(st.place[t] && st.place[t].unit)).map((t: string) => {
          const bx = boxOf(t);
          return <g key={"f" + t}>{ring(bx.x, bx.y, bx.w, bx.h, true)}</g>;
        })}
        {live && ghosts.map((t: string) => {
          const c = cells["g:" + t];
          return c ? <RbTap key={"tg" + t} id={"binslot-" + t} label={tx(c.bin)} x={c.x} y={c.y} w={c.w} h={c.h} onPress={() => pressBin(c.bin)} /> : null;
        })}
        {live && things.map((t: string) => {
          if (st.carry === t) return null;
          const bx = boxOf(t);
          return <RbTap key={"tt" + t} id={"thing-" + t} label={tx(MODEL.things[t].name)} x={bx.x} y={bx.y} w={bx.w} h={bx.h} onPress={() => pressThing(t)} />;
        })}
        {warm && stepOn && stepOn.indexOf("bin-") === 0 && (() => {
          const b = MODEL.bins.indexOf(stepOn.slice(4)), full = Object.keys(cells).some((k: string) => cells[k].bin === stepOn.slice(4));
          return inviteBox(RB_BIN_X[b], RB_BIN_Y, RB_BIN_W[b], full ? RB_BAR_H : RB_BODY_B - RB_BIN_Y);
        })()}
        {warm && stepOn && stepOn.indexOf("card-") === 0 && (() => { const cb = rbCardBox(stepOn.slice(5)); return inviteBox(cb.x, cb.y, cb.w, cb.h, 14); })()}
      </g>
    );
  };
  const drawBlank = () => {
    const done = D && D.done;
    return (
      <g>
        <rect x={0} y={0} width={RB_DW} height={150} rx={20} fill={tint(C.panel, 0.25)} stroke={C.rule} strokeWidth={2} />
        {rbThing("bucket", 240, 82, 1.1, C.ink)}
        <rect x={400} y={20} width={380} height={112} rx={18} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} />
        <text x={520} y={98} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>{String(it.amount)}</text>
        <rect x={600} y={36} width={150} height={80} rx={14} fill={done ? tint(C.accent, 0.75) : "#FFFFFF"} stroke={C.ink} strokeWidth={done ? 3 : 2.5} strokeDasharray={done ? undefined : "10 8"} />
        {done && <text x={675} y={96} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{tx(it.answer)}</text>}
        {drawBins(false, {})}
      </g>
    );
  };

  /* phase 2 */
  const drawBench = () => {
    const s = st, L = LN;
    const shown = (r: number) => Math.max(r ? s.b : s.a, D ? Math.min(D.k || 0, L.lanes[r].max) : 0);
    const tapeF = Math.max(s.tape, D && D.tape ? D.tape : 0);
    const maxLen = Math.max(...L.strips.map((x: any) => x.len));
    const live = warm || asking;
    const keyBoxes = [0, 1, 2].map((j: number) => ({ x: RB_KEY2_X[j], y: RB_KEY2_Y, w: RB_KEY2_W, h: RB_KEY2_H }));
    const handW = (span: number) => 30 + 3 * span;
    const ids = ["hand-a", "hand-b", "tape"];
    return (
      <g>
        {L.strips.map((S: any, j: number) => (
          <rect key={"s" + j} x={L.x0} y={S.y} width={S.len * L.sc} height={RB_STRIP_H} rx={8} fill={L.cloth ? RB_CLOTH : RB_WOOD} stroke={C.ink} strokeWidth={2.5} />
        ))}
        {L.lanes.map((ln: any, r: number) => (
          <g key={"l" + r}>
            {Array.from({ length: shown(r) }).map((_: any, k: number) => (
              <g key={k}>{rbHand(L.x0 + k * ln.span * L.sc, ln.y, ln.span * L.sc, RB_SKY_INK, "#EEF7FC", 1.5)}</g>
            ))}
            {shown(r) > 0 && <text x={40} y={ln.y + ln.h / 2 + 15} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={RB_SKY_INK}>{String(shown(r))}</text>}
          </g>
        ))}
        {tapeF > 0 && L.strips.map((S: any, j: number) => {
          const tl2 = Math.min(S.len, tapeF * maxLen);
          return (
            <g key={"t" + j}>
              <rect x={L.x0} y={S.y + 4} width={tl2 * L.sc} height={18} fill={RB_TAPE} stroke={C.ink} strokeWidth={1.5} />
              {Array.from({ length: Math.floor(tl2 / 10) }).map((_: any, q: number) => (
                <line key={q} x1={L.x0 + (q + 1) * 10 * L.sc} y1={S.y + 4} x2={L.x0 + (q + 1) * 10 * L.sc} y2={S.y + 14} stroke={C.ink} strokeWidth={1.5} />
              ))}
              <rect x={L.x0 - 2} y={S.y} width={5} height={26} fill={RB_MARK} />
              {tapeF >= 1 && (
                <g>
                  <rect x={L.x0 + S.len * L.sc - 170} y={S.y + 24} width={160} height={52} rx={10} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
                  <text x={L.x0 + S.len * L.sc - 90} y={S.y + 62} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{indian(S.len) + " " + tx("cm")}</text>
                </g>
              )}
            </g>
          );
        })}
        {D && D.done && it.note && <text x={RB_DW / 2} y={L.noteY} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{tx(it.note)}</text>}
        {[0, 1].map((r: number) => {
          const ln = L.lanes[r], full = (r ? s.b : s.a) >= ln.max, kb = keyBoxes[r], hw = handW(ln.span), off = !live || (!warm && full);
          return (
            <Key key={"hk" + r} id={ids[r]} label={tx(it.who[r])} x={kb.x} y={kb.y} w={kb.w} h={kb.h} C={C} tone="key"
              disabled={off} onClick={() => pressHand(r)}>
              {rbHand(-hw / 2, -44, hw, C.ink, "#F3EDE4", 1.2)}
              {keyText(tx(it.who[r]), 38, off)}
            </Key>
          );
        })}
        <Key key="tk" id="tape" label={tx("tape")} x={keyBoxes[2].x} y={keyBoxes[2].y} w={keyBoxes[2].w} h={keyBoxes[2].h} C={C} tone="key"
          disabled={!live || (!warm && s.tape >= 1)} onClick={() => pressTape()}>
          <g transform="translate(-58,14) scale(0.8)">{rbCoil(C)}</g>
          <text x={40} y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={!live || (!warm && s.tape >= 1) ? C.ink : toneInk("key", C.ink)}>{tx("tape")}</text>
        </Key>
        {warm && stepOn && ids.indexOf(stepOn) >= 0 && (() => { const kb = keyBoxes[ids.indexOf(stepOn)]; return inviteBox(kb.x, kb.y, kb.w, kb.h); })()}
      </g>
    );
  };

  /* phase 3 and free play */
  const drawRuler = () => {
    const len = objLen;
    let left = st.pos !== null && st.pos !== undefined ? st.pos : st.left;
    if (D && D.pos !== undefined) left = D.pos;
    const settled = Math.abs(left - Math.round(left)) < 1e-6;
    const xl = RB3.Z + left * RB3.sc, xr = RB3.Z + (left + len) * RB3.sc;
    const cnt = D ? D.k || 0 : st.count;
    const total = D ? !!D.done : st.count >= len && len > 0;
    const zeroLit = settled && Math.round(left) === 0;
    const keyRow: any[] = [];
    if (warm && (stepOn === "count" || stepOn === "slide")) keyRow.push({ id: stepOn, label: stepOn === "count" ? "Count" : "Slide", x: 330, w: 240 });
    return (
      <g>
        <rect x={RB3.Z - 50} y={RB3.y} width={RB_RULER_CM * RB3.sc + 76} height={RB3.h} rx={10} fill="#FBF5E6" stroke={C.ink} strokeWidth={3} />
        {Array.from({ length: RB_RULER_CM + 1 }).map((_: any, c: number) => (
          <g key={c}>
            <line x1={RB3.Z + c * RB3.sc} y1={RB3.y} x2={RB3.Z + c * RB3.sc} y2={RB3.y + 46} stroke={C.ink} strokeWidth={3} />
            {c < RB_RULER_CM && <line x1={RB3.Z + (c + 0.5) * RB3.sc} y1={RB3.y} x2={RB3.Z + (c + 0.5) * RB3.sc} y2={RB3.y + 24} stroke={C.ink} strokeWidth={2} />}
            <text x={RB3.Z + c * RB3.sc} y={RB3.y + 86} textAnchor="middle" fontSize={c === 0 ? T.label : T.prompt} fontWeight={700} fill={C.ink}>{c === 0 ? tx("cm") : String(c)}</text>
          </g>
        ))}
        {zeroLit && <rect x={RB3.Z - 4} y={RB3.y - 6} width={8} height={58} rx={3} fill={RB_MARK} />}
        {settled && len > 0 && <rect x={xr - 4} y={RB3.y - 6} width={8} height={58} rx={3} fill={RB_MARK} />}
        {len > 0 && rbObj(objId, xl, RB3.objY, len * RB3.sc, C.ink)}
        {cnt > 0 && (
          <g pointerEvents="none">
            <path d={`M ${xl} ${RB3.brY} v 28 H ${xr} v -28`} fill="none" stroke={C.ink} strokeWidth={3} />
            {Array.from({ length: Math.max(0, len - 1) }).map((_: any, j: number) => (
              <line key={j} x1={xl + (j + 1) * RB3.sc} y1={RB3.brY + 18} x2={xl + (j + 1) * RB3.sc} y2={RB3.brY + 28} stroke={C.ink} strokeWidth={2} />
            ))}
            {Array.from({ length: Math.min(cnt, len) }).map((_: any, j: number) => (
              <text key={"c" + j} x={xl + (j + 0.5) * RB3.sc} y={RB3.brY + 66} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={RB_SKY_INK}>{String(j + 1)}</text>
            ))}
            {total && <text x={(xl + xr) / 2} y={RB3.brY + 126} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={RB_SKY_INK}>{len + " " + tx("cm")}</text>}
          </g>
        )}
        {keyRow.map((k: any, j: number) => (
          <Key key={"act" + j} id={k.id} label={tx(k.label)} x={k.x} y={RB3.keyY} w={k.w} h={RB3.keyH} C={C} tone="key" onClick={() => act(k.id)}>
            {keyText(tx(k.label))}
          </Key>
        ))}
        {keyRow.length > 0 && inviteBox(keyRow[0].x, RB3.keyY, keyRow[0].w, RB3.keyH)}
        {free && MODEL.freeThings.map((f: any, j: number) => (
          <Key key={"ob" + j} id={"obj-" + f.id} label={tx(f.id)} x={j * 118} y={RB3.keyY} w={110} h={RB3.keyH} C={C} tone="key" primary={st.obj === f.id} onClick={() => pickObj(f.id)}>
            <g transform="translate(-45,-22) scale(0.5)">{rbObj(f.id, 0, 0, 180, C.ink)}</g>
          </Key>
        ))}
        {free && [-1, 1].map((d: number, j: number) => (
          <Key key={"sl" + j} id={d < 0 ? "slide-left" : "slide-right"} label={tx(d < 0 ? "slide left" : "slide right")} x={498 + j * 110} y={RB3.keyY} w={100} h={RB3.keyH} C={C} tone="key" onClick={() => pressSlide(d)}>
            <path d={d < 0 ? "M 16 -18 L -16 0 L 16 18 Z" : "M -16 -18 L 16 0 L -16 18 Z"} fill={toneInk("key", C.ink)} />
          </Key>
        ))}
        {free && (
          <Key key="cnt" id="count" label={tx("Count")} x={724} y={RB3.keyY} w={176} h={RB3.keyH} C={C} tone="key" onClick={() => pressCount()}>
            {keyText(tx("Count"))}
          </Key>
        )}
      </g>
    );
  };

  /* phase 4 */
  const drawPicker = (live: boolean) => (
    <g>
      {MODEL.picker.map((c: any, j: number) => {
        const x = j * 310, y = RB4.pickY, w = 280, h = RB4.pickH;
        const on = st.pick === c.id, right = D && D.done && c.id === it.answer && st.pick !== it.answer;
        return (
          <g key={c.id}>
            <rect x={x} y={y} width={w} height={h} rx={20} fill="#FFFFFF" stroke={on ? shade(C.accent, 0.1) : C.ink} strokeWidth={on ? 6 : 2.5} />
            {right && <rect x={x + 8} y={y + 8} width={w - 16} height={h - 16} rx={14} fill="none" stroke={C.ink} strokeWidth={3} strokeDasharray="10 8" pointerEvents="none" />}
            <text x={x + w / 2} y={y + 52} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{tx(c.id)}</text>
            {rbPick(c.id, x + w / 2, y + 70, C)}
          </g>
        );
      })}
      {live && MODEL.picker.map((c: any, j: number) => (
        <RbTap key={"tp" + c.id} id={"unit-" + c.id} label={tx(c.id)} x={j * 310} y={RB4.pickY} w={280} h={RB4.pickH} onPress={() => pressUnit(c.id)} />
      ))}
      {warm && stepOn && stepOn.indexOf("unit-") === 0 && inviteBox(MODEL.picker.findIndex((c: any) => "unit-" + c.id === stepOn) * 310, RB4.pickY, 280, RB4.pickH, 20)}
    </g>
  );
  const drawUnitQ = () => {
    const bus = it.thing === "bus";
    const L0 = bus ? 270 : 185, LW = bus ? 360 : 530, sy = bus ? 178 : 160;
    const shownU = D && D.done ? it.answer : st.pick;
    const seg = LW / it.amount;
    return (
      <g>
        <g transform={bus ? "translate(230,0)" : "translate(155,8)"}>{bus ? rbBus(C) : rbPitch(C)}</g>
        {D && D.k > 0 && (
          <g pointerEvents="none">
            {Array.from({ length: Math.min(D.k, it.amount) }).map((_: any, j: number) => (
              <rect key={j} x={L0 + j * seg} y={sy} width={seg} height={14} fill={j % 2 ? "#FFFFFF" : RB_METRE} stroke={C.ink} strokeWidth={1.5} />
            ))}
          </g>
        )}
        <text x={480} y={250} textAnchor="end" fontSize={T.xl} fontWeight={700} fill={C.ink}>{tx("about") + " " + it.amount}</text>
        <rect x={500} y={200} width={130} height={68} rx={14} fill={shownU ? tint(C.accent, 0.75) : "#FFFFFF"} stroke={C.ink} strokeWidth={shownU ? 3 : 2.5} strokeDasharray={shownU ? undefined : "10 8"} />
        {shownU && <text x={565} y={250} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{tx(shownU)}</text>}
        {drawPicker(asking)}
      </g>
    );
  };
  const drawScaleQ = () => {
    const isWarm = K === "warm4", E = it.estimate, M = it.measure;
    const showScale = !isWarm || st.measured;
    const guessW = isWarm ? st.gw : 99, guessDone = !isWarm || st.gw > String(E).length;
    const measured = !isWarm || st.measured;
    const lo = Math.min(E, M), hi = Math.max(E, M);
    const keyId = isWarm && (stepOn === "guess" || stepOn === "measure") ? stepOn : null;
    const cardVal = (j: number) => (j === 0 ? (isWarm ? guessText(guessW) : E + " " + tx("cm")) : measured ? M + " " + tx("cm") : "");
    return (
      <g>
        {isWarm ? rbObj("pencil", RB4.Z, RB4.objY, M * RB4.sc, C.ink) : rbBook(RB4.Z, RB4.objY + 4, M * RB4.sc, C)}
        {showScale && (
          <g>
            <rect x={RB4.Z - 36} y={RB4.scaleY} width={RB4.cm * RB4.sc + 61} height={RB4.scaleH} rx={8} fill="#FBF5E6" stroke={C.ink} strokeWidth={3} />
            {Array.from({ length: RB4.cm + 1 }).map((_: any, c: number) => (
              <g key={c}>
                <line x1={RB4.Z + c * RB4.sc} y1={RB4.scaleY} x2={RB4.Z + c * RB4.sc} y2={RB4.scaleY + (c % 5 === 0 ? 34 : 16)} stroke={c === 0 ? RB_MARK : C.ink} strokeWidth={c === 0 ? 6 : c % 5 === 0 ? 3 : 2} />
                {c % 5 === 0 && <text x={RB4.Z + c * RB4.sc} y={RB4.scaleY + 66} textAnchor="middle" fontSize={c === 0 ? T.micro : T.label} fontWeight={700} fill={C.ink}>{c === 0 ? tx("cm") : String(c)}</text>}
              </g>
            ))}
          </g>
        )}
        {guessDone && <line x1={RB4.Z + E * RB4.sc} y1={RB4.objY - 6} x2={RB4.Z + E * RB4.sc} y2={RB4.scaleY + 36} stroke={C.ink} strokeWidth={3} strokeDasharray="9 7" />}
        {measured && guessDone && <rect x={RB4.Z + lo * RB4.sc} y={RB4.barY} width={(hi - lo) * RB4.sc} height={24} rx={4} fill={RB_GAP} stroke={C.ink} strokeWidth={1.5} />}
        {D && D.k > 0 && (
          <g pointerEvents="none">
            {Array.from({ length: Math.min(D.k, hi - lo) }).map((_: any, j: number) => (
              <text key={j} x={RB4.Z + (lo + j + 0.5) * RB4.sc} y={RB4.cntY} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={RB_SKY_INK}>{String(j + 1)}</text>
            ))}
          </g>
        )}
        {[0, 1].map((j: number) => (
          <g key={"cd" + j}>
            <rect x={RB_CARD4_X[j]} y={RB4.cardY} width={280} height={RB4.cardH} rx={18} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} />
            <text x={RB_CARD4_X[j] + 140} y={RB4.cardY + 44} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(j === 0 ? "guess" : "measure")}</text>
            {j === 0 && isWarm
              ? <text x={RB_CARD4_X[0] + 64} y={RB4.cardY + 116} textAnchor="start" fontSize={T.xl} fontWeight={700} fill={C.ink}>{cardVal(0)}</text>
              : <text x={RB_CARD4_X[j] + 140} y={RB4.cardY + 116} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{cardVal(j)}</text>}
          </g>
        ))}
        {D && D.done && <text x={RB_DW / 2} y={500} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={RB_GAP_INK}>{(hi - lo) + " " + tx("cm")}</text>}
        {keyId && (
          <Key key="act0" id={keyId} label={tx(keyId === "guess" ? "Guess" : "Measure")} x={330} y={RB4.keyY} w={240} h={RB4.keyH} C={C} tone="key" onClick={() => act(keyId)}>
            {keyText(tx(keyId === "guess" ? "Guess" : "Measure"))}
          </Key>
        )}
        {keyId && inviteBox(330, RB4.keyY, 240, RB4.keyH)}
      </g>
    );
  };
  const drawWarm4 = () => (stp === 0 && !st.pick ? (
    <g>
      {rbObj("pencil", (RB_DW - it.measure * RB4.sc) / 2, RB4.objY, it.measure * RB4.sc, C.ink)}
      {drawPicker(true)}
    </g>
  ) : drawScaleQ());

  let pic: any = null;
  if (free || K === "read") pic = drawRuler();
  else if (K === "sort") pic = drawSort();
  else if (K === "blank") pic = drawBlank();
  else if (LN) pic = drawBench();
  else if (K === "unit") pic = drawUnitQ();
  else if (K === "gap") pic = drawScaleQ();
  else if (K === "warm4") pic = drawWarm4();

  return <g transform={`translate(${ox},0)`}>{pic}</g>;
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ result, it, C, w, h, n, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const itm: any = it || last.it || ((PHASES[(n || 1) - 1] || { items: [] }).items[last.item]) || {};
  const v = String(last.value), kind = itm.kind || last.kind;
  const big = (s: string) => <text x={w - 12} y={h / 2 + 11} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{s}</text>;
  const wide = lang !== "en";
  const pw = wide ? 96 : 128;
  /* a unit chip inside its tile (74 wide): never wider than the tile, never below the thumbnail's foot */
  const chip = (x: number, u: string) => (
    <g>
      <rect x={x + 4} y={h - 42} width={66} height={38} rx={8} fill="#FFFFFF" stroke={C.ink} strokeWidth={1.5} />
      <text x={x + 37} y={wide ? h - 9 : h - 14} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(u)}</text>
    </g>
  );
  let pic: any = null;
  if (kind === "sort") pic = (
    <g>
      {v.split("|").slice(0, 3).map((s: string, j: number) => {
        const t = s.split("=")[0], u = (s.split(":")[1] || ""), x = 4 + j * 77;
        return (
          <g key={t}>
            <rect x={x} y={4} width={74} height={h - 8} rx={10} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={1.5} />
            {rbThing(t, x + 37, (h - 42) / 2 + 2, Math.min(0.4, (h - 50) / 100), C.ink)}
            {chip(x, u)}
          </g>
        );
      })}
    </g>
  );
  else if (kind === "blank") pic = (
    <g>
      {rbThing((itm.things || ["bucket"])[0], 40, 40, 0.55, C.ink)}
      {big((itm.amount || "") + " " + tx(v))}
    </g>
  );
  else if (kind === "whose" || kind === "why" || kind === "cloth") pic = (
    <g>
      {/* the hands and the tape on top, the reason UNDER the tape line */}
      {[0, 1].map((k: number) => <g key={"big" + k}>{rbHand(10 + k * 34, 2, 30, RB_SKY, "#EEF7FC", 1.2)}</g>)}
      {[0, 1, 2].map((k: number) => <g key={"small" + k}>{rbHand(90 + k * 28, 4, 24, RB_SKY, "#EEF7FC", 1.2)}</g>)}
      <rect x={8} y={22} width={w - 16} height={6} rx={2} fill="#FFFFFF" stroke={C.ink} strokeWidth={1.5} />
      {[8, w - 8].map((x: number) => <rect key={x} x={x - 2} y={19} width={4} height={12} fill={RB_MARK} />)}
      <text x={w / 2} y={h - 4} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(RB_SHOWN[v] || v)}</text>
    </g>
  );
  else if (kind === "read") {
    const len = itm.to !== undefined ? itm.to - itm.from : leadNumber(v) || 1, s = pw / (len + 1);
    pic = (
      <g>
        <rect x={8} y={20} width={len * s} height={18} rx={5} fill="#E7D6B3" stroke={C.ink} strokeWidth={1.5} />
        <rect x={4} y={42} width={(len + 1) * s + 8} height={Math.min(24, h - 46)} rx={4} fill="#FBF5E6" stroke={C.ink} strokeWidth={1.5} />
        {Array.from({ length: len + 2 }).map((_: any, j: number) => <line key={j} x1={8 + j * s} y1={42} x2={8 + j * s} y2={52} stroke={C.ink} strokeWidth={1.5} />)}
        <rect x={6} y={38} width={4} height={18} fill={RB_MARK} />
        {big(leadNumber(v) + " " + tx("cm"))}
      </g>
    );
  } else if (kind === "unit") pic = (
    <g>
      {Array.from({ length: 5 }).map((_: any, j: number) => (
        <rect key={j} x={8 + j * 22} y={34} width={22} height={16} fill={j % 2 ? "#FFFFFF" : RB_METRE} stroke={C.ink} strokeWidth={1.5} />
      ))}
      {big((itm.amount || "") + " " + tx(v))}
    </g>
  );
  else {
    const E = itm.estimate || 30, Mv = itm.measure || 24, s = (pw - 8) / E;
    pic = (
      <g>
        <rect x={8} y={12} width={Mv * s} height={22} rx={4} fill="#DCE4EA" stroke={C.ink} strokeWidth={1.5} />
        <line x1={8 + E * s} y1={6} x2={8 + E * s} y2={h - 6} stroke={C.ink} strokeWidth={2} strokeDasharray="5 4" />
        <rect x={8 + Mv * s} y={42} width={(E - Mv) * s} height={14} rx={3} fill={RB_GAP} stroke={C.ink} strokeWidth={1.5} />
        <line x1={8} y1={h - 8} x2={8 + E * s} y2={h - 8} stroke={C.ink} strokeWidth={1.5} />
        <rect x={6} y={8} width={4} height={h - 16} fill={RB_MARK} />
        {big(leadNumber(v) + " " + tx("cm"))}
      </g>
    );
  }
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {pic}
    </g>
  );
}

function RulerBench(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b) */
      board: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d, PATTERNS.md §16): no question bar, only its blinking key at the top right */
      keyOnly: true,
      /* the wide keypad (LAYOUT.md §1b, PATTERNS.md 9g): every picture is laid out in x 0 to 900 */
      bigPad: true,
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself */
      nextKey: true,
      /* NAV DOTS (LAYOUT.md §1d): one small clickable dot per phase */
      navDots: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key (above) */
      StartArt, START_HOOK,
      }} />
  );
}

export default RulerBench;
