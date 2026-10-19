/* ═══ M4.S6.T12.C55.2D1 · measure_chain · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists. THE LESSON IS SILENT (runtime r30) and action-driven; the new look (keyOnly,
   navDots, one sentence a screen, every act performed on screen through api.act; docs/LAYOUT.md §1d-§1e,
   docs/PATTERNS.md §15-§16). NO imports in this file; only the five host hooks.
   One measuring scene at a time (a tape, a scale, a bag of scoops, a rope, a list or a jug) on the left, the
   column strip on the right, ONE key at the bottom centre whose label follows the act (Join, Write ...).
   Every answer is one decimal in one unit, typed with the point key (pointKey) in its written form. */

const TOOL_ID = "measure_chain";
const MEDIA_ID = "M4.S6.T12.C55.2D1";
const TOOL_NAME = "Measure Chain";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

const OPENING = ["Measures waiting to be joined, weighed or poured."];
const FINISH_LINE = "One unit, one step at a time, every answer written down.";
const FREE_LINE = "Free play. Join rope, weigh bags or pour water.";

const START_HOOK = "How long, how heavy, how much water?";
/* the start page: a tape, a kitchen scale and a measuring jug (no number that answers a question) */
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  const ink = C.ink;
  return (
    <g>
      {/* the jug */}
      <path d="M 300 60 C 352 60 352 190 300 190" fill="none" stroke={shade(C.rule, 0.3)} strokeWidth={14} strokeLinecap="round" />
      <rect x={130} y={20} width={170} height={300} rx={18} fill="#FFFFFF" stroke={ink} strokeWidth={4} />
      <rect x={134} y={170} width={162} height={146} rx={14} fill={tint(CONTENT.hundred, 0.6)} />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((t) => <line key={t} x1={130} y1={316 - t * 14} x2={130 + (t % 5 === 0 ? 40 : 18)} y2={316 - t * 14} stroke={ink} strokeWidth={t % 5 === 0 ? 3.5 : 2} />)}
      <text x={215} y={360} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ink}>{tx("litres")}</text>
      {/* the tape */}
      <rect x={410} y={190} width={420} height={64} rx={10} fill="#FCEFB4" stroke={ink} strokeWidth={3} />
      {Array.from({ length: 41 }, (_, t) => <line key={t} x1={420 + t * 10} y1={190} x2={420 + t * 10} y2={190 + (t % 10 === 0 ? 28 : t % 5 === 0 ? 18 : 10)} stroke={ink} strokeWidth={t % 10 === 0 ? 3 : 1.5} />)}
      {[0, 1, 2, 3, 4].map((m) => <text key={m} x={420 + m * 100} y={248} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ink}>{m}</text>)}
      <rect x={420} y={150} width={260} height={20} rx={10} fill={CONTENT.hundred} stroke={shade(CONTENT.hundred, 0.3)} strokeWidth={2} />
      <text x={620} y={300} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ink}>{tx("metres")}</text>
      {/* the scale */}
      <rect x={920} y={110} width={260} height={210} rx={26} fill={tint(C.panel, 0.3)} stroke={ink} strokeWidth={3} />
      <rect x={910} y={80} width={280} height={16} rx={8} fill={shade(C.rule, 0.3)} />
      <circle cx={1050} cy={215} r={84} fill="#FFFFFF" stroke={ink} strokeWidth={3} />
      {Array.from({ length: 6 }, (_, m) => { const a = ((-150 + m * 60) * Math.PI) / 180; return <line key={m} x1={1050 + Math.sin(a) * 84} y1={215 - Math.cos(a) * 84} x2={1050 + Math.sin(a) * 66} y2={215 - Math.cos(a) * 66} stroke={ink} strokeWidth={3} />; })}
      <line x1={1050} y1={215} x2={1100} y2={170} stroke={ink} strokeWidth={5} strokeLinecap="round" />
      <circle cx={1050} cy={215} r={8} fill={ink} />
      <text x={1050} y={360} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ink}>{tx("kilograms")}</text>
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11), keyed by the English byte for byte. Digits and the units m, kg, km and L stay
   as written. Terms: unit मात्रक / એકમ, decimal point दशमलव बिंदु / દશાંશ ચિહ્ન, tenths दशांश / દશાંશ, hundredths शतांश / શતાંશ,
   carry हासिल / વદી, column स्तंभ / સ્તંભ, step चरण / પગલું, total योग / સરવાળો, add जोड़ो / ઉમેરો, take away घटाओ / બાદ કરો.
   Hand-added (tr-coverage cannot list them): the item `win` lines, key labels, column titles, list names, units, free-play
   tabs, StartArt words and the Answer card's label. */
const TR: any = {
  hi: {
    "Measure Chain": "माप की कड़ी",
    "Measures waiting to be joined, weighed or poured.": "माप तैयार हैं: जोड़ने, तौलने या डालने के लिए।",
    "Free play. Join rope, weigh bags or pour water.": "खुला खेल। रस्सी मिलाओ, थैले तौलो या पानी डालो।",
    "Adding measures in one unit": "एक मात्रक में मापों का जोड़",
    "One answer feeds the next": "एक उत्तर से अगला चरण",
    "A list of parts and its total": "भागों की सूची और उसका योग",
    "Pouring and measuring in litres": "लीटर में डालना और मापना",
    "Every rope is in metres, so tap Join to lay the three end to end on the tape.": "हर रस्सी मीटर में है, तो मिलाओ बटन दबाकर तीनों को फीते पर जोड़ो।",
    "The Join key is under the picture.": "मिलाओ बटन चित्र के नीचे है।",
    "Tap Measure to slide the ruler along the joined rope.": "नापो बटन दबाओ, पैमाना जुड़ी रस्सी पर खिसकेगा।",
    "Measure reads the tape for you.": "नापो बटन फीते को पढ़ देता है।",
    "Tap Write to add the three with every point in one line.": "लिखो बटन दबाओ और दशमलव बिंदु सीध में रखकर तीनों जोड़ो।",
    "Write sends the pencil to the strip.": "लिखो बटन पेंसिल को पट्टी पर भेजता है।",
    "Write a 0 in each empty hundredths place, so every row has two places.": "हर खाली शतांश स्थान में 0 लिखो, ताकि दशमलव के बाद दो अंक हों।",
    "Add each column from the right, and carry a ten to the next column.": "दाएँ से हर स्तंभ जोड़ो और दस का हासिल अगले स्तंभ में ले जाओ।",
    "Measures in one unit add like decimals, unit and all.": "एक मात्रक के माप दशमलव की तरह जुड़ते हैं, मात्रक के साथ।",
    "You learned: add measures in one unit like decimals, points in line.": "तुमने सीखा: एक मात्रक के माप दशमलव बिंदु सीध में रखकर जोड़ना।",
    "What is the total length of a fence with sections of 3.2 m, 2.45 m and 1.7 m?": "3.2 मी, 2.45 मी और 1.7 मी के हिस्सों वाली बाड़ की कुल लंबाई कितनी है?",
    "Length of fence, in m?": "बाड़ की लंबाई, मी में?",
    "Yes, the fence is 7.35 m long.": "हाँ, बाड़ 7.35 मी लंबी है।",
    "Line up the points, not the last digits, since 3.2 has no hundredths.": "3.2 में शतांश नहीं है, इसलिए आखिरी अंक नहीं, दशमलव बिंदु सीध में रखो।",
    "Add 2.3 kg and 1.45 kg on the scale.": "तराज़ू पर 2.3 किग्रा और 1.45 किग्रा जोड़ो।",
    "Total weight, in kg?": "कुल वज़न, किग्रा में?",
    "Yes, the two bags weigh 3.75 kg.": "हाँ, दोनों थैलों का वज़न 3.75 किग्रा है।",
    "The 3 in 2.3 kg is tenths, so it goes under the 4 in 1.45 kg.": "2.3 किग्रा का 3 दशांश है, इसलिए वह 1.45 किग्रा के 4 के नीचे आएगा।",
    "Add 4.6 m and 2.72 m.": "4.6 मी और 2.72 मी जोड़ो।",
    "Total length, in m?": "कुल लंबाई, मी में?",
    "Yes, 4.6 m and 2.72 m make 7.32 m.": "हाँ, 4.6 मी और 2.72 मी मिलकर 7.32 मी होते हैं।",
    "The 6 in 4.6 m is tenths, so it shares a column with the 7 in 2.72 m.": "4.6 मी का 6 दशांश है, इसलिए वह 2.72 मी के 7 वाले स्तंभ में आएगा।",
    "Tap Add to write the two scoops' total on the Answer card.": "जोड़ो बटन दबाओ और दोनों कटोरियों का योग उत्तर कार्ड पर लिखो।",
    "Add writes step 1 on the card.": "जोड़ो बटन चरण 1 को कार्ड पर लिखता है।",
    "Tap Use card to take the Answer card into step 2.": "कार्ड लगाओ बटन दबाओ और उत्तर कार्ड को चरण 2 में ले जाओ।",
    "Step 2 waits for the card.": "चरण 2 कार्ड का इंतज़ार कर रहा है।",
    "Write the two parts' total on the Answer card, then use the card in step 2.": "दोनों भागों का योग उत्तर कार्ड पर लिखो, फिर कार्ड चरण 2 में लगाओ।",
    "Give the whole two zeros after the point, then take away from the right.": "पूरी मात्रा में दशमलव के बाद दो शून्य लिखो, फिर दाएँ से घटाओ।",
    "Each written answer feeds the next step.": "हर लिखा उत्तर अगले चरण में काम आता है।",
    "You learned: write each answer down and use it in the next step.": "तुमने सीखा: हर उत्तर लिखो और उसे अगले चरण में इस्तेमाल करो।",
    "From 5 kg of rice, a cook uses 1.25 kg and then 0.9 kg, so how much is left?": "5 किग्रा चावल में से रसोइया 1.25 किग्रा और फिर 0.9 किग्रा लेता है, कितना बचा?",
    "Rice that is left, in kg?": "बचे चावल, किग्रा में?",
    "Yes, 2.85 kg of rice is left.": "हाँ, 2.85 किग्रा चावल बचे हैं।",
    "Both amounts come out of the rice, not just the first one.": "दोनों मात्राएँ चावल में से निकलती हैं, सिर्फ़ पहली नहीं।",
    "Of 3 kg of flour, bread uses 0.75 kg and cakes 1.1 kg, so how much is left?": "3 किग्रा आटे में से ब्रेड में 0.75 किग्रा और केक में 1.1 किग्रा लगा, कितना बचा?",
    "Flour that is left, in kg?": "बचा आटा, किग्रा में?",
    "Yes, 1.15 kg of flour is left.": "हाँ, 1.15 किग्रा आटा बचा है।",
    "The cakes use flour too, not only the bread.": "केक में भी आटा लगा, सिर्फ़ ब्रेड में नहीं।",
    "A 10 m rope has 2.6 m cut off and then 3.15 m more, so how much rope is left?": "10 मी की रस्सी से 2.6 मी और फिर 3.15 मी काटी गई, कितनी रस्सी बची?",
    "Rope that is left, in m?": "बची रस्सी, मी में?",
    "Yes, 4.25 m of rope is left.": "हाँ, 4.25 मी रस्सी बची है।",
    "Two pieces were cut off the rope, not one.": "रस्सी से दो टुकड़े कटे थे, एक नहीं।",
    "The list holds three garden beds, so tap Total to add it from the top.": "सूची में तीन क्यारियाँ हैं, कुल बटन दबाकर ऊपर से जोड़ो।",
    "The Total key is under the picture.": "कुल बटन चित्र के नीचे है।",
    "Tap Check to add the same list from the bottom.": "जाँच बटन दबाओ और वही सूची नीचे से जोड़ो।",
    "Adding in another order checks a total.": "दूसरे क्रम में जोड़ने से योग की जाँच होती है।",
    "Line up the points of all three parts, writing zeros in empty places.": "तीनों भागों के दशमलव बिंदु सीध में रखो और खाली जगह शून्य लिखो।",
    "Add the list again from the bottom, and the two totals must match.": "सूची को नीचे से फिर जोड़ो, दोनों योग बराबर होने चाहिए।",
    "A total is checked by adding in another order.": "योग को दूसरे क्रम में जोड़कर जाँचा जाता है।",
    "You learned: total a list, then check it by adding in another order.": "तुमने सीखा: सूची का योग करो, फिर दूसरे क्रम में जोड़कर जाँचो।",
    "Add the trail: 1.6 km to a pond, 2.35 km to a hill, 0.9 km back to the gate.": "रास्ता जोड़ो: तालाब तक 1.6 किमी, पहाड़ी तक 2.35 किमी, फाटक तक वापस 0.9 किमी।",
    "Trail in all, in km?": "पूरा रास्ता, किमी में?",
    "Yes, the trail is 4.85 km long.": "हाँ, रास्ता 4.85 किमी लंबा है।",
    "Every part of the trail counts, so add all three.": "रास्ते का हर भाग गिना जाता है, तो तीनों जोड़ो।",
    "Find the total of a walk in three parts of 0.8 km, 1.25 km and 2 km.": "0.8 किमी, 1.25 किमी और 2 किमी के तीन भागों वाली सैर का योग निकालो।",
    "Length of walk, in km?": "सैर की लंबाई, किमी में?",
    "Yes, the walk is 4.05 km in all.": "हाँ, सैर कुल 4.05 किमी की है।",
    "The last part, 2 km, counts too, even with no point.": "आखिरी भाग 2 किमी भी गिनो, उसमें दशमलव बिंदु न हो तब भी।",
    "What do three boxes of 1.35 kg, 2.4 kg and 0.72 kg weigh in all?": "1.35 किग्रा, 2.4 किग्रा और 0.72 किग्रा के तीन डिब्बों का कुल वज़न कितना है?",
    "Yes, the three boxes weigh 4.47 kg.": "हाँ, तीनों डिब्बों का वज़न 4.47 किग्रा है।",
    "The third box weighs something too, so add it in.": "तीसरे डिब्बे का भी वज़न है, उसे भी जोड़ो।",
    "The jug holds 1.4 L, so tap Pour out to fill the 0.35 L cup from it.": "जग में 1.4 ली है, बाहर डालो बटन दबाकर 0.35 ली का कप भरो।",
    "Pour out tips the jug into the cup.": "बाहर डालो बटन जग को कप में उड़ेलता है।",
    "Tap Pour in to empty the 0.8 L bottle into the jug.": "अंदर डालो बटन दबाओ और 0.8 ली की बोतल जग में खाली करो।",
    "The bottle goes in next.": "अब बोतल की बारी है।",
    "Tap Write to work both steps in litres.": "लिखो बटन दबाओ और दोनों चरण लीटर में हल करो।",
    "Write sends the pencil to the steps.": "लिखो बटन पेंसिल को चरणों पर भेजता है।",
    "Write the starting water, then do each pour in order.": "शुरू का पानी लिखो, फिर हर बार का डालना क्रम से करो।",
    "Write each step in litres with two places, then work it from the right.": "हर चरण लीटर में दशमलव के बाद दो अंकों से लिखो, फिर दाएँ से हल करो।",
    "Pours in and out add and take away in litres.": "अंदर डालना जोड़ना है और बाहर डालना घटाना, लीटर में।",
    "You learned: pour and measure water in litres, as decimals.": "तुमने सीखा: पानी डालना और लीटर में दशमलव से मापना।",
    "A jug with 1.6 L of water has 0.45 L poured out, then 0.3 L in; how much now?": "1.6 ली पानी वाले जग से 0.45 ली निकाला, फिर 0.3 ली डाला, अब कितना है?",
    "Water in the jug, in L?": "जग में पानी, ली में?",
    "Yes, the jug holds 1.45 L now.": "हाँ, अब जग में 1.45 ली है।",
    "Take away the 0.45 L first, then add the 0.3 L.": "पहले 0.45 ली घटाओ, फिर 0.3 ली जोड़ो।",
    "A jug has 0.9 L and 0.6 L more is poured in, so how much is in it?": "जग में 0.9 ली है और 0.6 ली और डाला गया, अब उसमें कितना है?",
    "Water in it now, in L?": "अब उसमें पानी, ली में?",
    "Yes, 0.9 L and 0.6 L fill it to 1.5 L.": "हाँ, 0.9 ली और 0.6 ली मिलकर 1.5 ली होते हैं।",
    "Water poured in makes more, so add it.": "अंदर डाला पानी बढ़ाता है, तो उसे जोड़ो।",
    "A jug has 1.9 L of water and 0.55 L is poured out, so how much is left?": "जग में 1.9 ली पानी है और 0.55 ली बाहर डाला, कितना बचा?",
    "Water that is left, in L?": "बचा पानी, ली में?",
    "Yes, 1.35 L is left in the jug.": "हाँ, जग में 1.35 ली बचा है।",
    "Poured out means less, so take 0.55 L away.": "बाहर डालने से कम होता है, तो 0.55 ली घटाओ।",
    "Join": "मिलाओ", "Weigh": "तौलो", "Measure": "नापो", "Write": "लिखो", "Cut": "काटो", "Add": "जोड़ो", "Use card": "कार्ड लगाओ",
    "Total": "कुल", "Check": "जाँच", "Pour out": "बाहर डालो", "Pour in": "अंदर डालो",
    "Step 1": "चरण 1", "Step 2": "चरण 2", "Answer card": "उत्तर कार्ड",
    "How long, how heavy, how much water?": "कितना लंबा, कितना भारी, कितना पानी?",
    "Do the steps first.": "पहले चरण पूरे करो।",
    "to the pond": "तालाब तक", "to the hill": "पहाड़ी तक", "back to the gate": "फाटक तक वापस",
    "part 1": "भाग 1", "part 2": "भाग 2", "part 3": "भाग 3", "box 1": "डिब्बा 1", "box 2": "डिब्बा 2", "box 3": "डिब्बा 3",
    "bed 1": "क्यारी 1", "bed 2": "क्यारी 2", "bed 3": "क्यारी 3",
    "Rope": "रस्सी", "Bags": "थैले", "Jug": "जग", "litres": "लीटर", "metres": "मीटर", "kilograms": "किलोग्राम",
    "m": "मी", "kg": "किग्रा", "km": "किमी", "L": "ली",
  },
  gu: {
    "Measure Chain": "માપની સાંકળ",
    "Measures waiting to be joined, weighed or poured.": "માપ તૈયાર છે: જોડવા, તોલવા કે રેડવા માટે.",
    "Free play. Join rope, weigh bags or pour water.": "મુક્ત રમત. દોરડું જોડો, થેલી તોલો કે પાણી રેડો.",
    "Adding measures in one unit": "એક એકમમાં માપનો સરવાળો",
    "One answer feeds the next": "એક જવાબથી આગળનું પગલું",
    "A list of parts and its total": "ભાગોની યાદી અને તેનો સરવાળો",
    "Pouring and measuring in litres": "લિટરમાં રેડવું અને માપવું",
    "Every rope is in metres, so tap Join to lay the three end to end on the tape.": "દરેક દોરડું મીટરમાં છે, તો જોડો બટન દબાવી ત્રણેયને માપપટ્ટી પર જોડો.",
    "The Join key is under the picture.": "જોડો બટન ચિત્રની નીચે છે.",
    "Tap Measure to slide the ruler along the joined rope.": "માપો બટન દબાવો, ફૂટપટ્ટી જોડેલા દોરડા પર સરકશે.",
    "Measure reads the tape for you.": "માપો બટન માપપટ્ટી વાંચી આપે છે.",
    "Tap Write to add the three with every point in one line.": "લખો બટન દબાવો અને દશાંશ ચિહ્ન એક લીટીમાં રાખી ત્રણેય ઉમેરો.",
    "Write sends the pencil to the strip.": "લખો બટન પેન્સિલને પટ્ટી પર મોકલે છે.",
    "Write a 0 in each empty hundredths place, so every row has two places.": "દરેક ખાલી શતાંશ સ્થાને 0 લખો, જેથી દશાંશ ચિહ્ન પછી બે અંક હોય.",
    "Add each column from the right, and carry a ten to the next column.": "જમણેથી દરેક સ્તંભ ઉમેરો અને દસની વદી આગળના સ્તંભમાં લઈ જાઓ.",
    "Measures in one unit add like decimals, unit and all.": "એક એકમનાં માપ દશાંશની જેમ ઉમેરાય છે, એકમ સાથે.",
    "You learned: add measures in one unit like decimals, points in line.": "તમે શીખ્યા: એક એકમનાં માપ દશાંશ ચિહ્ન એક લીટીમાં રાખી ઉમેરવાં.",
    "What is the total length of a fence with sections of 3.2 m, 2.45 m and 1.7 m?": "3.2 મી, 2.45 મી અને 1.7 મી ના ભાગવાળી વાડની કુલ લંબાઈ કેટલી છે?",
    "Length of fence, in m?": "વાડની લંબાઈ, મી માં?",
    "Yes, the fence is 7.35 m long.": "હા, વાડ 7.35 મી લાંબી છે.",
    "Line up the points, not the last digits, since 3.2 has no hundredths.": "3.2 માં શતાંશ નથી, તેથી છેલ્લા અંક નહીં, દશાંશ ચિહ્ન એક લીટીમાં રાખો.",
    "Add 2.3 kg and 1.45 kg on the scale.": "વજનકાંટા પર 2.3 કિગ્રા અને 1.45 કિગ્રા ઉમેરો.",
    "Total weight, in kg?": "કુલ વજન, કિગ્રા માં?",
    "Yes, the two bags weigh 3.75 kg.": "હા, બંને થેલીનું વજન 3.75 કિગ્રા છે.",
    "The 3 in 2.3 kg is tenths, so it goes under the 4 in 1.45 kg.": "2.3 કિગ્રા નો 3 દશાંશ છે, તેથી તે 1.45 કિગ્રા ના 4 ની નીચે આવે.",
    "Add 4.6 m and 2.72 m.": "4.6 મી અને 2.72 મી ઉમેરો.",
    "Total length, in m?": "કુલ લંબાઈ, મી માં?",
    "Yes, 4.6 m and 2.72 m make 7.32 m.": "હા, 4.6 મી અને 2.72 મી મળીને 7.32 મી થાય.",
    "The 6 in 4.6 m is tenths, so it shares a column with the 7 in 2.72 m.": "4.6 મી નો 6 દશાંશ છે, તેથી તે 2.72 મી ના 7 વાળા સ્તંભમાં આવે.",
    "Tap Add to write the two scoops' total on the Answer card.": "ઉમેરો બટન દબાવો અને બંને વાટકીનો સરવાળો જવાબ કાર્ડ પર લખો.",
    "Add writes step 1 on the card.": "ઉમેરો બટન પગલું 1 કાર્ડ પર લખે છે.",
    "Tap Use card to take the Answer card into step 2.": "કાર્ડ વાપરો બટન દબાવો અને જવાબ કાર્ડ પગલું 2 માં લઈ જાઓ.",
    "Step 2 waits for the card.": "પગલું 2 કાર્ડની રાહ જુએ છે.",
    "Write the two parts' total on the Answer card, then use the card in step 2.": "બંને ભાગનો સરવાળો જવાબ કાર્ડ પર લખો, પછી કાર્ડ પગલું 2 માં વાપરો.",
    "Give the whole two zeros after the point, then take away from the right.": "આખા માપમાં દશાંશ ચિહ્ન પછી બે શૂન્ય લખો, પછી જમણેથી બાદ કરો.",
    "Each written answer feeds the next step.": "દરેક લખેલો જવાબ આગળના પગલામાં કામ આવે છે.",
    "You learned: write each answer down and use it in the next step.": "તમે શીખ્યા: દરેક જવાબ લખો અને તેને આગળના પગલામાં વાપરો.",
    "From 5 kg of rice, a cook uses 1.25 kg and then 0.9 kg, so how much is left?": "5 કિગ્રા ચોખામાંથી રસોઇયો 1.25 કિગ્રા અને પછી 0.9 કિગ્રા વાપરે છે, કેટલું બાકી?",
    "Rice that is left, in kg?": "બાકી ચોખા, કિગ્રા માં?",
    "Yes, 2.85 kg of rice is left.": "હા, 2.85 કિગ્રા ચોખા બાકી છે.",
    "Both amounts come out of the rice, not just the first one.": "બંને માપ ચોખામાંથી નીકળે છે, ફક્ત પહેલું નહીં.",
    "Of 3 kg of flour, bread uses 0.75 kg and cakes 1.1 kg, so how much is left?": "3 કિગ્રા લોટમાંથી બ્રેડમાં 0.75 કિગ્રા અને કેકમાં 1.1 કિગ્રા વપરાયો, કેટલો બાકી?",
    "Flour that is left, in kg?": "બાકી લોટ, કિગ્રા માં?",
    "Yes, 1.15 kg of flour is left.": "હા, 1.15 કિગ્રા લોટ બાકી છે.",
    "The cakes use flour too, not only the bread.": "કેકમાં પણ લોટ વપરાયો, ફક્ત બ્રેડમાં નહીં.",
    "A 10 m rope has 2.6 m cut off and then 3.15 m more, so how much rope is left?": "10 મી ના દોરડામાંથી 2.6 મી અને પછી 3.15 મી કાપ્યું, કેટલું દોરડું બાકી?",
    "Rope that is left, in m?": "બાકી દોરડું, મી માં?",
    "Yes, 4.25 m of rope is left.": "હા, 4.25 મી દોરડું બાકી છે.",
    "Two pieces were cut off the rope, not one.": "દોરડામાંથી બે ટુકડા કપાયા હતા, એક નહીં.",
    "The list holds three garden beds, so tap Total to add it from the top.": "યાદીમાં ત્રણ ક્યારા છે, કુલ બટન દબાવી ઉપરથી સરવાળો કરો.",
    "The Total key is under the picture.": "કુલ બટન ચિત્રની નીચે છે.",
    "Tap Check to add the same list from the bottom.": "તપાસ બટન દબાવો અને એ જ યાદી નીચેથી ઉમેરો.",
    "Adding in another order checks a total.": "બીજા ક્રમમાં ઉમેરવાથી સરવાળો તપાસાય છે.",
    "Line up the points of all three parts, writing zeros in empty places.": "ત્રણેય ભાગનાં દશાંશ ચિહ્ન એક લીટીમાં રાખો, ખાલી સ્થાને શૂન્ય લખો.",
    "Add the list again from the bottom, and the two totals must match.": "યાદી નીચેથી ફરી ઉમેરો, બંને સરવાળા સરખા હોવા જોઈએ.",
    "A total is checked by adding in another order.": "સરવાળો બીજા ક્રમમાં ઉમેરીને તપાસાય છે.",
    "You learned: total a list, then check it by adding in another order.": "તમે શીખ્યા: યાદીનો સરવાળો કરો, પછી બીજા ક્રમમાં ઉમેરી તપાસો.",
    "Add the trail: 1.6 km to a pond, 2.35 km to a hill, 0.9 km back to the gate.": "રસ્તો ઉમેરો: તળાવ સુધી 1.6 કિમી, ટેકરી સુધી 2.35 કિમી, પાછા દરવાજે 0.9 કિમી.",
    "Trail in all, in km?": "આખો રસ્તો, કિમી માં?",
    "Yes, the trail is 4.85 km long.": "હા, રસ્તો 4.85 કિમી લાંબો છે.",
    "Every part of the trail counts, so add all three.": "રસ્તાનો દરેક ભાગ ગણાય, તો ત્રણેય ઉમેરો.",
    "Find the total of a walk in three parts of 0.8 km, 1.25 km and 2 km.": "0.8 કિમી, 1.25 કિમી અને 2 કિમી ના ત્રણ ભાગવાળી ચાલનો સરવાળો શોધો.",
    "Length of walk, in km?": "ચાલની લંબાઈ, કિમી માં?",
    "Yes, the walk is 4.05 km in all.": "હા, ચાલ કુલ 4.05 કિમી ની છે.",
    "The last part, 2 km, counts too, even with no point.": "છેલ્લો ભાગ 2 કિમી પણ ગણો, ભલે તેમાં દશાંશ ચિહ્ન ન હોય.",
    "What do three boxes of 1.35 kg, 2.4 kg and 0.72 kg weigh in all?": "1.35 કિગ્રા, 2.4 કિગ્રા અને 0.72 કિગ્રા નાં ત્રણ ખોખાંનું કુલ વજન કેટલું?",
    "Yes, the three boxes weigh 4.47 kg.": "હા, ત્રણેય ખોખાંનું વજન 4.47 કિગ્રા છે.",
    "The third box weighs something too, so add it in.": "ત્રીજા ખોખાનું પણ વજન છે, તેને પણ ઉમેરો.",
    "The jug holds 1.4 L, so tap Pour out to fill the 0.35 L cup from it.": "જગમાં 1.4 લી છે, બહાર રેડો બટન દબાવી 0.35 લી નો કપ ભરો.",
    "Pour out tips the jug into the cup.": "બહાર રેડો બટન જગને કપમાં રેડે છે.",
    "Tap Pour in to empty the 0.8 L bottle into the jug.": "અંદર રેડો બટન દબાવો અને 0.8 લી ની બોટલ જગમાં ખાલી કરો.",
    "The bottle goes in next.": "હવે બોટલનો વારો છે.",
    "Tap Write to work both steps in litres.": "લખો બટન દબાવો અને બંને પગલાં લિટરમાં ઉકેલો.",
    "Write sends the pencil to the steps.": "લખો બટન પેન્સિલને પગલાં પર મોકલે છે.",
    "Write the starting water, then do each pour in order.": "શરૂઆતનું પાણી લખો, પછી દરેક રેડવાનું ક્રમમાં કરો.",
    "Write each step in litres with two places, then work it from the right.": "દરેક પગલું લિટરમાં દશાંશ પછી બે અંકથી લખો, પછી જમણેથી ઉકેલો.",
    "Pours in and out add and take away in litres.": "અંદર રેડવું સરવાળો અને બહાર રેડવું બાદબાકી છે, લિટરમાં.",
    "You learned: pour and measure water in litres, as decimals.": "તમે શીખ્યા: પાણી રેડવું અને લિટરમાં દશાંશથી માપવું.",
    "A jug with 1.6 L of water has 0.45 L poured out, then 0.3 L in; how much now?": "1.6 લી પાણીવાળા જગમાંથી 0.45 લી કાઢ્યું, પછી 0.3 લી નાખ્યું, હવે કેટલું?",
    "Water in the jug, in L?": "જગમાં પાણી, લી માં?",
    "Yes, the jug holds 1.45 L now.": "હા, હવે જગમાં 1.45 લી છે.",
    "Take away the 0.45 L first, then add the 0.3 L.": "પહેલાં 0.45 લી બાદ કરો, પછી 0.3 લી ઉમેરો.",
    "A jug has 0.9 L and 0.6 L more is poured in, so how much is in it?": "જગમાં 0.9 લી છે અને 0.6 લી વધુ રેડ્યું, હવે તેમાં કેટલું છે?",
    "Water in it now, in L?": "હવે તેમાં પાણી, લી માં?",
    "Yes, 0.9 L and 0.6 L fill it to 1.5 L.": "હા, 0.9 લી અને 0.6 લી મળીને 1.5 લી થાય.",
    "Water poured in makes more, so add it.": "અંદર રેડેલું પાણી વધારે છે, તો તેને ઉમેરો.",
    "A jug has 1.9 L of water and 0.55 L is poured out, so how much is left?": "જગમાં 1.9 લી પાણી છે અને 0.55 લી બહાર રેડ્યું, કેટલું બાકી?",
    "Water that is left, in L?": "બાકી પાણી, લી માં?",
    "Yes, 1.35 L is left in the jug.": "હા, જગમાં 1.35 લી બાકી છે.",
    "Poured out means less, so take 0.55 L away.": "બહાર રેડવાથી ઓછું થાય, તો 0.55 લી બાદ કરો.",
    "Join": "જોડો", "Weigh": "તોલો", "Measure": "માપો", "Write": "લખો", "Cut": "કાપો", "Add": "ઉમેરો", "Use card": "કાર્ડ વાપરો",
    "Total": "કુલ", "Check": "તપાસ", "Pour out": "બહાર રેડો", "Pour in": "અંદર રેડો",
    "Step 1": "પગલું 1", "Step 2": "પગલું 2", "Answer card": "જવાબ કાર્ડ",
    "How long, how heavy, how much water?": "કેટલું લાંબું, કેટલું ભારે, કેટલું પાણી?",
    "Do the steps first.": "પહેલાં પગલાં પૂરાં કરો.",
    "to the pond": "તળાવ સુધી", "to the hill": "ટેકરી સુધી", "back to the gate": "દરવાજા સુધી પાછા",
    "part 1": "ભાગ 1", "part 2": "ભાગ 2", "part 3": "ભાગ 3", "box 1": "ખોખું 1", "box 2": "ખોખું 2", "box 3": "ખોખું 3",
    "bed 1": "ક્યારો 1", "bed 2": "ક્યારો 2", "bed 3": "ક્યારો 3",
    "Rope": "દોરડું", "Bags": "થેલી", "Jug": "જગ", "litres": "લિટર", "metres": "મીટર", "kilograms": "કિલોગ્રામ",
    "m": "મી", "kg": "કિગ્રા", "km": "કિમી", "L": "લી",
  },
};

/* One entry per phase = one mount. Each item's numbers are data (the picture, judge and oracle read them):
   join   pcs: the measures joined on the tape (scene "tape") or weighed on the scale (scene "scale")
   chain  whole minus (pcs[0] + pcs[1]): step 1 adds the parts on the Answer card, step 2 takes the card away
   list   lines: [name, measure]; Total adds top to bottom, Check bottom to top
   jug    start, then pours [op, measure] in order; the jug is marked in tenths of a litre
   The guide steps play the brief's worked example (MODEL.warm), never question 1's numbers. */
const PHASES = [
  {
    n: 1,
    concept: "Adding measures in one unit",
    conceptId: "M4.S6.T12.C55", objectiveIds: ["O21"],
    says: ["Every measure in a sum is in one unit, so join them and add the column."],
    steps: [
      { say: "Every rope is in metres, so tap Join to lay the three end to end on the tape.", on: "join", hint: "The Join key is under the picture." },
      { say: "Tap Measure to slide the ruler along the joined rope.", on: "measure", hint: "Measure reads the tape for you." },
      { say: "Tap Write to add the three with every point in one line.", on: "write", hint: "Write sends the pencil to the strip." },
    ],
    stepHold: 2400,
    ladder: ["Write a 0 in each empty hundredths place, so every row has two places.", "Add each column from the right, and carry a ten to the next column."],
    closing: "Measures in one unit add like decimals, unit and all.",
    learned: "You learned: add measures in one unit like decimals, points in line.",
    traceback: "every piece is joined and every measure written with two places, then the column is added from the right, carries and all, to the green total with its unit",
    items: [
      /* learn MC1: answer in the plan = 7.35 m */
      { qid: "M4.S6.T12.C55:MC1", kind: "join", scene: "tape", unit: "m", pcs: ["3.2", "2.45", "1.7"], near: "2.94",
        say: "What is the total length of a fence with sections of 3.2 m, 2.45 m and 1.7 m?", ask: "Length of fence, in m?", answer: "7.35", win: "Yes, the fence is 7.35 m long.",
        miss: "Line up the points, not the last digits, since 3.2 has no hundredths." },
      /* practice 1: answer in the plan = 3.75 kg */
      { qid: "M4.S6.T12.C55:1", kind: "join", scene: "scale", unit: "kg", pcs: ["2.3", "1.45"], near: "1.68",
        say: "Add 2.3 kg and 1.45 kg on the scale.", ask: "Total weight, in kg?", answer: "3.75", win: "Yes, the two bags weigh 3.75 kg.",
        miss: "The 3 in 2.3 kg is tenths, so it goes under the 4 in 1.45 kg." },
      /* practice 3: answer in the plan = 7.32 m */
      { qid: "M4.S6.T12.C55:3", kind: "join", scene: "tape", unit: "m", pcs: ["4.6", "2.72"], near: "3.18",
        say: "Add 4.6 m and 2.72 m.", ask: "Total length, in m?", answer: "7.32", win: "Yes, 4.6 m and 2.72 m make 7.32 m.",
        miss: "The 6 in 4.6 m is tenths, so it shares a column with the 7 in 2.72 m." },
    ],
  },
  {
    n: 2,
    concept: "One answer feeds the next",
    conceptId: "M4.S6.T12.C56", objectiveIds: ["O21"],
    says: ["Write the first answer down. The next step needs it."],
    steps: [
      { say: "Tap Add to write the two scoops' total on the Answer card.", on: "add", hint: "Add writes step 1 on the card." },
      { say: "Tap Use card to take the Answer card into step 2.", on: "use-card", hint: "Step 2 waits for the card." },
    ],
    stepHold: 2400,
    ladder: ["Write the two parts' total on the Answer card, then use the card in step 2.", "Give the whole two zeros after the point, then take away from the right."],
    closing: "Each written answer feeds the next step.",
    learned: "You learned: write each answer down and use it in the next step.",
    traceback: "the two parts are added on the Answer card, the card is carried into step 2, and the take away runs from the right to the green amount left",
    items: [
      /* learn MC2: answer in the plan = 2.85 kg */
      { qid: "M4.S6.T12.C56:MC2", kind: "chain", scene: "sack", unit: "kg", whole: "5", pcs: ["1.25", "0.9"], near: "3.75",
        say: "From 5 kg of rice, a cook uses 1.25 kg and then 0.9 kg, so how much is left?", ask: "Rice that is left, in kg?", answer: "2.85", win: "Yes, 2.85 kg of rice is left.",
        miss: "Both amounts come out of the rice, not just the first one." },
      /* practice 4: answer in the plan = 1.15 kg. First 0.75 + 1.10 = 1.85 kg is used, then 3.00 - 1.85 = 1.15 */
      { qid: "M4.S6.T12.C56:4", kind: "chain", scene: "sack", unit: "kg", whole: "3", pcs: ["0.75", "1.1"], near: "2.25",
        say: "Of 3 kg of flour, bread uses 0.75 kg and cakes 1.1 kg, so how much is left?", ask: "Flour that is left, in kg?", answer: "1.15", win: "Yes, 1.15 kg of flour is left.",
        miss: "The cakes use flour too, not only the bread." },
      /* practice 7: answer in the plan = 4.25 m. First 2.60 + 3.15 = 5.75 m is cut off, then 10.00 - 5.75 = 4.25 */
      { qid: "M4.S6.T12.C56:7", kind: "chain", scene: "rope", unit: "m", whole: "10", pcs: ["2.6", "3.15"], near: "7.4",
        say: "A 10 m rope has 2.6 m cut off and then 3.15 m more, so how much rope is left?", ask: "Rope that is left, in m?", answer: "4.25", win: "Yes, 4.25 m of rope is left.",
        miss: "Two pieces were cut off the rope, not one." },
    ],
  },
  {
    n: 3,
    concept: "A list of parts and its total",
    conceptId: "M4.S6.T12.C57", objectiveIds: ["O22"],
    says: ["Add the list. Now add it the other way. Do they match?"],
    steps: [
      { say: "The list holds three garden beds, so tap Total to add it from the top.", on: "total", hint: "The Total key is under the picture." },
      { say: "Tap Check to add the same list from the bottom.", on: "recheck", hint: "Adding in another order checks a total." },
    ],
    stepHold: 2400,
    ladder: ["Line up the points of all three parts, writing zeros in empty places.", "Add the list again from the bottom, and the two totals must match."],
    closing: "A total is checked by adding in another order.",
    learned: "You learned: total a list, then check it by adding in another order.",
    traceback: "the list is written in both orders and each column is added from the right to the green total, the two the same",
    items: [
      /* learn MC3: answer in the plan = 4.85 km */
      { qid: "M4.S6.T12.C57:MC3", kind: "list", unit: "km", lines: [["to the pond", "1.6"], ["to the hill", "2.35"], ["back to the gate", "0.9"]], near: "3.95",
        say: "Add the trail: 1.6 km to a pond, 2.35 km to a hill, 0.9 km back to the gate.", ask: "Trail in all, in km?", answer: "4.85", win: "Yes, the trail is 4.85 km long.",
        miss: "Every part of the trail counts, so add all three." },
      /* practice 5: answer in the plan = 4.05 km. 0.80 + 1.25 + 2.00 = 4.05, and 2.00 + 1.25 + 0.80 = 4.05 */
      { qid: "M4.S6.T12.C57:5", kind: "list", unit: "km", lines: [["part 1", "0.8"], ["part 2", "1.25"], ["part 3", "2"]], near: "2.05",
        say: "Find the total of a walk in three parts of 0.8 km, 1.25 km and 2 km.", ask: "Length of walk, in km?", answer: "4.05", win: "Yes, the walk is 4.05 km in all.",
        miss: "The last part, 2 km, counts too, even with no point." },
      /* practice 8: answer in the plan = 4.47 kg. 1.35 + 2.40 + 0.72 = 4.47, and 0.72 + 2.40 + 1.35 = 4.47 */
      { qid: "M4.S6.T12.C57:8", kind: "list", unit: "kg", lines: [["box 1", "1.35"], ["box 2", "2.4"], ["box 3", "0.72"]], near: "3.75",
        say: "What do three boxes of 1.35 kg, 2.4 kg and 0.72 kg weigh in all?", ask: "Total weight, in kg?", answer: "4.47", win: "Yes, the three boxes weigh 4.47 kg.",
        miss: "The third box weighs something too, so add it in." },
    ],
  },
  {
    n: 4,
    concept: "Pouring and measuring in litres",
    conceptId: "M4.S6.T12.C58", objectiveIds: ["O21"],
    says: ["Pour out, pour in, and work each step in litres."],
    steps: [
      { say: "The jug holds 1.4 L, so tap Pour out to fill the 0.35 L cup from it.", on: "pour-out", hint: "Pour out tips the jug into the cup." },
      { say: "Tap Pour in to empty the 0.8 L bottle into the jug.", on: "pour-in", hint: "The bottle goes in next." },
      { say: "Tap Write to work both steps in litres.", on: "write", hint: "Write sends the pencil to the steps." },
    ],
    stepHold: 2400,
    ladder: ["Write the starting water, then do each pour in order.", "Write each step in litres with two places, then work it from the right."],
    closing: "Pours in and out add and take away in litres.",
    learned: "You learned: pour and measure water in litres, as decimals.",
    traceback: "every pour is made, each step written in litres, and the last column is worked from the right to the green reading",
    items: [
      /* learn MC4: answer in the plan = 1.45 L */
      { qid: "M4.S6.T12.C58:MC4", kind: "jug", unit: "L", start: "1.6", pours: [["−", "0.45"], ["+", "0.3"]], near: "2.35",
        say: "A jug with 1.6 L of water has 0.45 L poured out, then 0.3 L in; how much now?", ask: "Water in the jug, in L?", answer: "1.45", win: "Yes, the jug holds 1.45 L now.",
        miss: "Take away the 0.45 L first, then add the 0.3 L." },
      /* practice 2: answer in the plan = 1.5 L, because 0.9 + 0.6 = 1.5 (1.50 L is the same measure, so it is taken too);
         near: the phase's in/out error turned round, the water poured in taken away (0.9 - 0.6 = 0.3) */
      { qid: "M4.S6.T12.C58:2", kind: "jug", unit: "L", start: "0.9", pours: [["+", "0.6"]], near: "0.3", alt: ["1.50"],
        say: "A jug has 0.9 L and 0.6 L more is poured in, so how much is in it?", ask: "Water in it now, in L?", answer: "1.5", win: "Yes, 0.9 L and 0.6 L fill it to 1.5 L.",
        miss: "Water poured in makes more, so add it." },
      /* practice 6: answer in the plan = 1.35 L, because 1.90 - 0.55 = 1.35 */
      { qid: "M4.S6.T12.C58:6", kind: "jug", unit: "L", start: "1.9", pours: [["−", "0.55"]], near: "2.45",
        say: "A jug has 1.9 L of water and 0.55 L is poured out, so how much is left?", ask: "Water that is left, in L?", answer: "1.35", win: "Yes, 1.35 L is left in the jug.",
        miss: "Poured out means less, so take 0.55 L away." },
    ],
  },
];

/* The numbers the working area needs (they go into the sidecar too): the worked example of each phase's guide steps
   (the brief's own numbers, never a question's), the three free-play scenes, and the measuring objects. */
const MODEL: any = {
  warm: [
    { kind: "join", scene: "tape", unit: "m", pcs: ["2.4", "1.35", "0.8"], show: true },
    { kind: "chain", scene: "sack", unit: "kg", whole: "6", pcs: ["1.65", "0.7"], show: true },
    { kind: "list", unit: "m", lines: [["bed 1", "2.6"], ["bed 2", "3.25"], ["bed 3", "1.8"]], show: true },
    { kind: "jug", unit: "L", start: "1.4", pours: [["−", "0.35"], ["+", "0.8"]], show: true },
  ],
  free: {
    rope: { kind: "join", scene: "tape", unit: "m", pcs: ["1.5", "2.25", "0.8"], show: true },
    bags: { kind: "join", scene: "scale", unit: "kg", pcs: ["1.2", "2.5"], show: true },
    jug: { kind: "jug", unit: "L", start: "1", pours: [["−", "0.25"], ["+", "0.5"]], show: true },
  },
  tape: { metres: 8, marks: "tenths of a metre, a long line at each metre" },
  dial: { kilograms: 5, marks: "tenths of a kilogram, a long line at each kilogram" },
  jug: { litres: 2, marks: "tenths of a litre, a long line at each litre" },
  strip: "a column: every point in one line, a zero written to fill an empty place (violet), carries and trades (vermilion), the result (green)",
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: the decimal in its written form, exactly (an item may list another written form of the same measure) */
const judge = (item: any, v: any) => {
  const s = String(v ?? "").trim();
  return s === String(item.answer) || (item.alt || []).includes(s);
};
/* oracle: every answer re-derived from the item's own measures in floating point, sharing no code with judge or the
   column the picture writes; the written form keeps the most places given */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const f = (s: any) => parseFloat(String(s));
  const given: string[] = it.kind === "join" ? it.pcs : it.kind === "chain" ? [it.whole, ...it.pcs]
    : it.kind === "list" ? it.lines.map((l: any) => l[1]) : [it.start, ...it.pours.map((q: any) => q[1])];
  const v = it.kind === "join" ? it.pcs.reduce((a: number, s: string) => a + f(s), 0)
    : it.kind === "chain" ? f(it.whole) - it.pcs.reduce((a: number, s: string) => a + f(s), 0)
    : it.kind === "list" ? it.lines.reduce((a: number, l: any) => a + f(l[1]), 0)
    : it.pours.reduce((a: number, q: any) => a + (q[0] === "+" ? f(q[1]) : -f(q[1])), f(it.start));
  const places = Math.max(...given.map((s) => (String(s).split(".")[1] || "").length));
  return v.toFixed(places) === String(it.answer);
}));
/* the most likely wrong answer (the item's misconception); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => [String(item.answer), speakable(item.answer), ...(item.alt || [])];
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer(): it does every act a child does on the working area, then types the decimal with its point
   (toolApi.answer alone would strip the point) */
const answer = (item: any, v: any) => (HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check(): undefined, so Enter answers (and in a guide step performs the step) */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── measures: the arithmetic and the column the strip writes (names start mc: the runtime shares this scope) ── */
const MC = { given: CONTENT.hundred, result: CONTENT.one, carry: CONTENT.pointer, zero: "#6F4BAF", taken: CONTENT.bead, now: CONTENT.ten, hold: "#767676" };
const mcInk = (c: string) => shade(c, 0.25);
const MC_NOW = shade(CONTENT.ten, 0.45);
const MC_DW = 40, MC_PW = 20, MC_OPW = 44, MC_RH = 66;
const MC_FW = 900;
const mcDp = (s: any) => (String(s).split(".")[1] || "").length;
/* a measure as a whole number of its smallest place (hundredths when dp = 2): exact, no floating point */
const mcUnits = (s: any, dp: number) => { const [a, b = ""] = String(s).split("."); return parseInt(a + (b + "0000").slice(0, dp), 10); };
const mcStr = (u: number, dp: number) => { const t = String(Math.abs(u)).padStart(dp + 1, "0"); return dp ? t.slice(0, t.length - dp) + "." + t.slice(t.length - dp) : t; };

/* the column for a sum (op "+") or a take away (op "−", two rows): places, the result, and what is written above the
   top row: carries for a sum, the opened (traded) digits for a take away */
function mcWork(nums: string[], op: string) {
  const dp = Math.max(...nums.map(mcDp));
  const us = nums.map((s) => mcUnits(s, dp));
  const ru = op === "−" ? us[0] - us[1] : us.reduce((a, b) => a + b, 0);
  const res = mcStr(ru, dp);
  const ip = Math.max(...nums.map((s) => String(s).split(".")[0].length), res.split(".")[0].length);
  const nc = ip + dp;
  const grid = nums.map((s) => {
    const [a, b = ""] = String(s).split(".");
    return Array.from({ length: nc }, (_, j) => (j < ip ? (j - (ip - a.length) >= 0 ? a[j - (ip - a.length)] : "") : b[j - ip] ?? "0"));
  });
  const above: string[] = Array(nc).fill(""), struck: boolean[] = Array(nc).fill(false);
  if (op === "−") {
    let bi = 0;
    for (let j = nc - 1; j >= 0; j--) {
      const a = Number(grid[0][j] || 0), b = Number(grid[1][j] || 0);
      let t = a - bi; bi = 0;
      if (t < b) { t += 10; bi = 1; }
      if (t !== a) { above[j] = String(t); struck[j] = true; }
    }
  } else {
    let c = 0;
    for (let j = nc - 1; j >= 0; j--) {
      const s = grid.reduce((acc, r) => acc + Number(r[j] || 0), 0) + c;
      c = Math.floor(s / 10);
      if (c && j > 0) above[j - 1] = String(c);
    }
  }
  return { dp, ip, nc, res, above, struck };
}

/* each written digit's place in the column: a zero written to fill an empty place is "add" (violet), a zero holding a
   place open inside the number is "hold" (grey); the point is "add" when the number had none */
function mcCells(s: string, ip: number, dp: number) {
  const [a, b = ""] = String(s).split(".");
  const ds = (a + b).split("");
  const hold = (k: number) => ds[k] === "0" && ds.slice(0, k).some((x) => x !== "0") && ds.slice(k + 1).some((x) => x !== "0");
  const cells: any[] = [];
  for (let k = 0; k < a.length; k++) cells.push({ j: ip - a.length + k, ch: a[k], kind: hold(k) ? "hold" : "d" });
  for (let k = 0; k < dp; k++) cells.push(k < b.length ? { j: ip + k, ch: b[k], kind: hold(a.length + k) ? "hold" : "d" } : { j: ip + k, ch: "0", kind: "add" });
  return { cells, point: dp > 0 ? (String(s).includes(".") ? "pt" : "add") : "" };
}

/* the columns an item writes, and the acts (in order) that the one key performs. cv: the step-1 answer the child
   wrote on the Answer card (a chain, or a two-pour jug at a question), which step 2 then uses, right or not */
const mcNorm = (s: any) => { let v = String(s || ""); if (v.endsWith(".")) v = v.slice(0, -1); if (v.startsWith(".")) v = "0" + v; return /^\d+(\.\d+)?$/.test(v) ? v : ""; };
function mcCols(it: any, cv: string = "") {
  if (!it || !it.kind) return [];
  const col = (title: any, nums: string[], op: string, final: boolean, inks: string[]) => {
    const work = mcWork(nums, op);
    return { title, op, final, work, res: work.res, rows: nums.map((s, i) => ({ s, ink: inks[i] || MC.given })) };
  };
  if (it.kind === "join") return [col(null, it.pcs, "+", true, [])];
  if (it.kind === "chain") {
    const a = col("Step 1", it.pcs, "+", false, []);
    return [a, { ...col("Step 2", [it.whole, mcNorm(cv) || a.res], "−", true, [MC.given, MC.result]), pre: 1, cardRow: 1 }];
  }
  if (it.kind === "list") { const v = it.lines.map((l: any) => l[1]); return [col("Total", v, "+", true, []), col("Check", v.slice().reverse(), "+", true, [])]; }
  let cur = it.start;
  const two = it.pours.length > 1;
  return it.pours.map((q: any, j: number) => {
    const c = col(two ? "Step " + (j + 1) : null, [j ? mcNorm(cv) || cur : cur, q[1]], q[0], j === it.pours.length - 1, [j ? MC.result : MC.given, q[0] === "−" ? MC.taken : MC.given]);
    cur = c.res;
    return j ? { ...c, cardRow: 0 } : c;
  });
}
/* the Answer card the child writes: a chain always, a two-pour jug at a question (the worked example writes it all) */
const mcHasCard = (it: any) => it.kind === "chain" || (it.kind === "jug" && it.pours.length > 1 && !it.show);
function mcActs(it: any) {
  if (!it || !it.kind) return [];
  if (it.kind === "join") return it.show && it.scene === "tape" ? ["join", "measure", "write"] : ["join", "write"];
  if (it.kind === "chain") return [...(it.scene === "rope" ? ["cut"] : []), "add", "use-card"];
  if (it.kind === "list") return ["total", "recheck"];
  return [...it.pours.map((q: any) => (q[0] === "+" ? "pour-in" : "pour-out")), "write", ...(mcHasCard(it) ? ["use-card"] : [])];
}
const MC_LABEL: any = { join: "Join", weigh: "Weigh", measure: "Measure", write: "Write", cut: "Cut", add: "Add", "use-card": "Use card",
  total: "Total", recheck: "Check", "pour-out": "Pour out", "pour-in": "Pour in" };
/* a column's geometry: one cell per place, the point in its own narrow cell, so every point sits in one line. The unit is
   written once, in the title row at the right (the rows carry digits only, so the digits can be big); cw: the column's width */
function mcGeo(x: number, y: number, w: any, n: number, cw: number) {
  const L = x + 12 + MC_OPW;
  const cx = (j: number) => L + j * MC_DW + MC_DW / 2 + (j >= w.ip ? MC_PW : 0);
  const rb = (i: number) => y + 136 + i * MC_RH;   /* the title row, then the carries, clear of a Hindi or Gujarati matra */
  const ruleY = rb(n - 1) + 24;
  const r = L + w.nc * MC_DW + MC_PW + 6;
  return { x, y, ip: w.ip, dp: w.dp, nc: w.nc, cx, rb, ruleY, resB: ruleY + 68, px: L + w.ip * MC_DW + MC_PW / 2,
    l: L - 8, r, ox: x + 8 + MC_OPW / 2, w: cw, h: ruleY + 88 - y };
}
const mcColW = (w: any) => 12 + MC_OPW + w.nc * MC_DW + MC_PW + 6 + 12;
const mcColH = (n: number) => 136 + (n - 1) * MC_RH + 24 + 88;

function mcDigits(g: any, s: string, base: number, fill: string, C: any, vis: (j: number) => boolean = () => true) {
  const { cells, point } = mcCells(s, g.ip, g.dp);
  return [
    ...cells.filter((c: any) => vis(c.j)).map((c: any) => (
      <text key={"d" + c.j} x={g.cx(c.j)} y={base} textAnchor="middle" fontSize={T.xl} fontWeight={700}
        fill={c.kind === "add" ? MC.zero : c.kind === "hold" ? MC.hold : fill}>{c.ch}</text>)),
    point && vis(g.ip) ? <text key="pt" x={g.px} y={base} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={point === "add" ? MC.zero : C.ink}>.</text> : null,
  ];
}

/* ── the working area: 1472 x 520 shut, 900 x 520 open (bigPad); the picture is laid out in a 900-wide frame ── */
function Work({ phase, n, item, index, stage, wrong, typed, captured, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const demo = stage === "demo";
  const solved = stage === "win" || stage === "idle";
  const quiet = mix(C.ink, "#FFFFFF", 0.3);
  const fast = reducedMotion();
  const M: any = MODEL || {};

  const [S0, setS] = useState<any>(() => ({ sid: "", scene: "rope", fk: 0 }));
  const SR = useRef<any>(S0);
  const put = (o: any) => { SR.current = { ...SR.current, ...o }; setS(SR.current); };
  const playing = useRef(false);
  const lastKey = useRef(0);

  /* the item on show: the phase's worked example during the guide steps, Free play's scene, else the question */
  const scene = S0.scene || "rope";
  const it: any = free ? M.free[scene] : demo ? M.warm[n - 1] : (item || {});
  const sid = free ? "f:" + scene + ":" + S0.fk : demo ? "w" + n : n + ":" + index;
  const cols0: any[] = useMemo(() => mcCols(it), [sid]);
  const acts: string[] = useMemo(() => mcActs(it), [sid]);
  const hasCard = mcHasCard(it);
  const pcs: string[] = it.pcs || [];
  const startLev = it.kind === "jug" ? mcUnits(it.start, 2) : 0;
  const endLev = it.kind === "jug" ? it.pours.reduce((a: number, q: any) => a + (q[0] === "+" ? 1 : -1) * mcUnits(q[1], 2), startLev) : 0;
  const blank = () => ({ sid, done: 0, joined: 0, measured: false, cut: 0, wr: cols0.map((c: any) => c.pre || 0), rin: cols0.map(() => false),
    cardIn: false, carrying: false, card: "", cardSet: false, typing: false, cardPrev: "", setPrev: false, ml: null, cardLit: false, lev: startLev, poured: 0, lit: -1, tb: null, acting: false });
  /* every act done and every step written (the right step-1 answer on the card): the win, the traceback, the agent */
  const fullOf = () => ({ done: acts.length, joined: pcs.length, measured: !!it.show, cut: 2, wr: cols0.map((c: any) => c.rows.length),
    rin: cols0.map((c: any) => !c.final), cardIn: true, carrying: false, card: cols0.length ? cols0[0].res : "", cardSet: true, typing: false,
    lev: endLev, poured: (it.pours || []).length, lit: -1 });
  /* the render right after the scene changes still holds the last scene's state: draw a fresh one for it */
  const S: any = S0.sid === sid ? S0 : { ...S0, ...blank() };
  useEffect(() => { tl.stop(); playing.current = false; put(blank()); }, [sid]);
  const V: any = solved ? { ...S, ...fullOf() } : S;
  const show = !!it.show || solved;
  /* the columns as written: step 2 uses the card the child wrote */
  const cv = hasCard && V.cardSet ? mcNorm(V.card) : "";
  const cols: any[] = useMemo(() => mcCols(it, cv), [sid, cv]);
  /* the pad lent to the Answer card is given back by the runtime too (a tap elsewhere, the next question): a card left
     without Enter keeps what it had before it was opened */
  useEffect(() => { const s = SR.current; if (!captured && s.typing) put({ typing: false, card: s.cardPrev, cardSet: s.setPrev }); }, [captured]);

  /* ── the layout: a 900-wide frame laid out for the OPEN panel, the same size and place with it shut (never under
     the key's corner, which starts at x 1190) ── */
  const H = (box && box.h) || 520;
  const x0 = 0;
  const P = (p: any) => (p ? { x: p.x + x0, y: p.y } : p);
  const KY = H - 84, SH = KY - 16;
  const unit = it.unit || "L";
  const tag = (v: string, u: string = unit) => v + " " + tx(u);
  /* a label's width at T.label (an over-estimate, for room): Latin by count; a Devanagari or Gujarati sign narrower, a virama nothing */
  const twide = (s: string) => Array.from(String(s)).reduce((a: number, ch: string) => {
    const c = ch.charCodeAt(0);
    if (c === 0x94d || c === 0xacd) return a;
    if ((c >= 0x93e && c <= 0x94c) || (c >= 0xabe && c <= 0xacc) || (c >= 0x900 && c <= 0x903) || (c >= 0xa81 && c <= 0xa83)) return a + T.label * 0.45;
    return a + T.label * (c >= 0x900 ? 0.75 : 0.58);
  }, 0);
  /* the same, nearer the real width (measured: Devanagari runs about a fifth under twide, Gujarati about a third): for fitting a row */
  const tfit = (s: string) => twide(s) * (/[઀-૿]/.test(String(s)) ? 0.7 : /[ऀ-ॿ]/.test(String(s)) ? 0.8 : 1);
  /* each column: its cells, or its title and unit side by side, whichever is wider */
  const ws = cols.map((c: any) => Math.max(mcColW(c.work), (c.title ? tfit(tx(c.title)) : 0) + tfit(tx(unit)) + 60));
  const stripW = ws.reduce((a: number, b: number) => a + b, 0) + 16 * Math.max(0, cols.length - 1);
  const sx = MC_FW - stripW;
  const sy = Math.max(0, Math.round((SH - Math.max(0, ...cols.map((c: any) => mcColH(c.rows.length)))) / 2));
  const geos: any[] = [];
  { let xx = sx; cols.forEach((c: any, i: number) => { geos.push(mcGeo(xx, sy, c.work, c.rows.length, ws[i])); xx += ws[i] + 16; }); }
  const SW = sx - 24;

  /* the scenes' geometry (the act and the drawing read the same numbers) */
  const u2 = pcs.map((s) => mcUnits(s, 2));
  const cum = u2.reduce((a: number[], u: number) => [...a, a[a.length - 1] + u], [0]);
  const tapeG = { TX: 40, TY: 150, ppm: Math.max(40, Math.floor((SW - 40 - 76) / 8)) };
  /* at a question the joined rope lies 0.43 m along the tape, not from its zero, so its end does not read the total;
     Measure (the worked example and free play), the win and the correction slide it back to 0 */
  const tOff = () => (it.show || V.measured || reveal ? 0 : 43);
  const pieceAt = (i: number, on: boolean) => (on ? { x: tapeG.TX + ((cum[i] + tOff()) * tapeG.ppm) / 100, y: tapeG.TY - 22 } : { x: tapeG.TX, y: 262 + i * 52 });
  /* the scale skin (120 x 200: a sack on the pan, a blank dial face low on the body) is drawn at its own aspect; the dial
     is drawn in code over its face. Phase 1 clips the skin's own sack away (the child's bags go on the pan) */
  /* the scale at its full height; phase 2's has its whole's tag beside the sack, never on it */
  const SBW = Math.min(230, SW - 166);   /* phase 2: the scale and the two bowls beside it fit left of the strip */
  const SB = it.kind === "chain" ? { x: 4, y: 420 - Math.round((SBW * 5) / 3), w: SBW, h: Math.round((SBW * 5) / 3) } : { x: SW - 268, y: 0, w: 252, h: 420 };
  const dial = { cx: SB.x + SB.w * 0.5, cy: SB.y + SB.h * 0.73, r: Math.round(SB.w * 0.36) };
  const panY = SB.y + SB.h * 0.27;
  /* the bags: side by side inside the pan's rim; off the pan, stacked at the left */
  const BAG = { w: 106, h: 100 };
  const bagAt = (i: number, on: boolean) => (on ? { x: SB.x + SB.w / 2 - BAG.w - 3 + i * (BAG.w + 6), y: panY - BAG.h + 4 } : { x: 40, y: 40 + i * 170 });
  const rope = { RX: 20, RY: 100, ppm: Math.max(24, Math.floor((SW - 52) / 10)) };
  const ru = it.kind === "chain" ? [mcUnits(it.pcs[0], 2), mcUnits(it.pcs[1], 2)] : [0, 0];
  /* the jug skin (112 x 171, the handle at the right) at its own aspect; J is the glass inside it, 2 L to the top mark, its
     label below the rim; the reading goes on a chip under the jug, never over the marks */
  const JS = { x: 16, y: 20, w: 220, h: 336 };
  const J = { x: JS.x + JS.w * 0.09, y: JS.y + JS.h * 0.2, w: JS.w * 0.62, h: JS.h * 0.72 };
  const levY = (u: number) => J.y + J.h - (u / 200) * J.h;
  const potX = JS.x + JS.w + 14;
  const hasOut = it.kind === "jug" && it.pours.some((q: any) => q[0] === "−");
  const hasIn = it.kind === "jug" && it.pours.some((q: any) => q[0] === "+");

  /* ── the acts: every one performed on screen (api.act); the pieces react as the tool passes each point ── */
  const runAct = (on: string, o: any, fin: () => void) => {
    if (playing.current) return;
    playing.current = true;
    const snap = SR.current;
    put({ acting: true });
    api.act({ ...o, at: o.at.map(P), from: P(o.from), to: P(o.to) }).then((ok: boolean) => {
      playing.current = false;
      if (SR.current.sid !== snap.sid) return;
      if (ok !== true) { tl.stop(); put({ ...snap, acting: false }); return; }
      fin();
      const next = acts[SR.current.done + 1];
      put({ done: SR.current.done + 1, acting: false });
      api.sfx.settle();
      api.did(on);
      /* the keyboard stays where the child is: the next act's key, the Answer card it waits for, else the Answer key */
      focusOn(next === "use-card" && !SR.current.cardSet ? ["card", "answer-open"] : [next, "answer-open"]);
    });
  };
  const focusOn = (ids: any[]) => setTimeout(() => {
    const d: any = document;
    for (const id of ids) {
      const el = id && d.querySelector('[data-control="' + id + '"]');
      if (el && el.getAttribute("aria-disabled") !== "true" && el.focus) { el.focus(); return; }
    }
  }, 60);
  const setWr = (c: number, v: number) => { const wr = SR.current.wr.slice(); wr[c] = Math.max(wr[c], v); put({ wr }); };
  const setRin = (c: number) => { const rin = SR.current.rin.slice(); rin[c] = true; put({ rin }); };
  const rowPt = (c: number, i: number) => ({ x: geos[c].cx(geos[c].nc - 1) + 8, y: geos[c].rb(i) - 14 });
  const resPt = (c: number) => ({ x: geos[c].cx(geos[c].nc - 1) + 8, y: geos[c].resB - 14 });
  const writeAct = (on: string, tg: any[]) => runAct(on, { tool: "pencil", moves: "draw", at: tg.map((t) => t.p), onPoint: (i: number) => { tg[i].go(); api.sfx.tick(); } },
    () => { tg.forEach((t) => t.go()); put({ lit: -1 }); });
  /* the jug's level slides past the tenths marks, with a soft tick at each mark */
  const pourTo = (to: number) => {
    const from = SR.current.lev, d = to > from ? 5 : -5, seq: any[] = [];
    for (let u = from + d; d > 0 ? u < to : u > to; u += d) { const uu = u; seq.push([70, () => { put({ lev: uu }); if (uu % 10 === 0) api.sfx.tick(); }]); }
    seq.push([40, () => put({ lev: to })]);
    tl.run(seq);
  };

  const act = (on: string) => {
    if (playing.current) return;
    const st = SR.current;
    if (st.sid !== sid || on !== acts[st.done]) { api.did(on); return; }
    if (on === "use-card" && !it.show && !st.cardSet) { api.did(on); return; }   /* the card is written first */
    if (on === "join") {
      const at: any[] = [];
      pcs.forEach((_: any, i: number) => {
        if (it.scene === "scale") { const a = bagAt(i, false), b = bagAt(i, true); at.push({ x: a.x + BAG.w / 2, y: a.y + BAG.h / 2 }, { x: b.x + BAG.w / 2, y: b.y + BAG.h / 2 }); }
        else { const a = pieceAt(i, false), b = pieceAt(i, true); const len = (u2[i] * tapeG.ppm) / 100; at.push({ x: a.x + len / 2, y: a.y }, { x: b.x + len / 2, y: b.y }); }
      });
      return runAct(on, { tool: "hand", moves: "carry", at, onPoint: (i: number) => { if (i % 2 === 0) put({ joined: i / 2 + 1 }); else api.sfx.tick(); } },
        () => put({ joined: pcs.length }));
    }
    if (on === "measure") {
      const xs = cum.slice(1).map((u: number) => tapeG.TX + (u * tapeG.ppm) / 100);
      return runAct(on, { tool: "ruler", moves: "slide", from: { x: tapeG.TX, y: tapeG.TY }, to: { x: xs[xs.length - 1], y: tapeG.TY },
        at: xs.map((x: number) => ({ x, y: tapeG.TY })), onPoint: (i: number) => { if (i === xs.length - 1) put({ measured: true }); } }, () => put({ measured: true }));
    }
    if (on === "cut") {
      const xs = [ru[0], ru[0] + ru[1]].map((u) => rope.RX + (u * rope.ppm) / 100);
      return runAct(on, { tool: "scissors", moves: "snip", at: xs.map((x) => ({ x, y: rope.RY })), onPoint: (i: number) => { put({ cut: i + 1 }); api.sfx.cut(); } },
        () => put({ cut: 2 }));
    }
    /* Add: the pencil writes step 1's rows; the worked example also writes its total on the Answer card, a question
       leaves the card for the child to write */
    if (on === "add") return writeAct(on, [0, 1].map((i) => ({ p: rowPt(0, i), go: () => setWr(0, i + 1) })).concat(it.show ? [{ p: resPt(0), go: () => setRin(0) }] : []));
    if (on === "use-card") {
      const a = resPt(0), b = rowPt(1, cols[1].cardRow);
      const v = it.show ? cols0[0].res : mcNorm(st.card);
      const hold = (
        <g>
          <rect x={-78} y={-38} width={156} height={72} rx={12} fill="#FFFFFF" stroke={mcInk(MC.result)} strokeWidth={4} />
          <text x={0} y={18} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={mcInk(MC.result)}>{v}</text>
        </g>
      );
      return runAct(on, { tool: "hand", moves: "carry", from: a, at: [a, b], hold, onPoint: (i: number) => { if (i === 0) put({ carrying: true }); else { put({ cardIn: true, carrying: false }); setWr(1, 2); } } },
        () => { put({ cardIn: true, carrying: false }); setWr(1, 2); });
    }
    if (on === "total" || on === "recheck") {
      const c = on === "total" ? 0 : 1;
      return writeAct(on, [0, 1, 2].map((i) => ({ p: rowPt(c, i), go: () => { setWr(c, i + 1); put({ lit: c ? 2 - i : i }); } })));
    }
    if (on === "pour-out" || on === "pour-in") {
      const q = it.pours[st.poured];
      const to = st.lev + (q[0] === "+" ? 1 : -1) * mcUnits(q[1], 2);
      const mouth = { x: JS.x + JS.w * 0.12, y: JS.y + 14 };
      const pot = on === "pour-out" ? { x: potX + 65, y: 88 } : { x: potX + 65, y: 290 };
      const o = on === "pour-out" ? { tool: "hand", moves: "push", from: mouth, at: [pot] } : { tool: "hand", moves: "carry", from: pot, at: [pot, mouth] };
      return runAct(on, { ...o, onPoint: (i: number) => { if (i === o.at.length - 1) { put({ poured: SR.current.poured + 1 }); pourTo(to); } } },
        () => { if (SR.current.poured <= st.poured) { put({ poured: st.poured + 1 }); pourTo(to); } });
    }
    if (on === "write") {
      if (it.kind === "join") return writeAct(on, pcs.map((_: any, i: number) => ({ p: rowPt(0, i), go: () => setWr(0, i + 1) })));
      const tg: any[] = [];
      if (hasCard) {   /* a question's two pours: step 1's rows and step 2's pour; the child writes step 1 on the card */
        [0, 1].forEach((i) => tg.push({ p: rowPt(0, i), go: () => setWr(0, i + 1) }));
        tg.push({ p: rowPt(1, 1), go: () => setWr(1, 2) });
        return writeAct(on, tg);
      }
      cols.forEach((c: any, ci: number) => {
        [0, 1].forEach((i) => tg.push({ p: rowPt(ci, i), go: () => setWr(ci, i + 1) }));
        if (!c.final) tg.push({ p: resPt(ci), go: () => setRin(ci) });
      });
      return writeAct(on, tg);
    }
  };
  /* the Answer card at a question: a tap lends the pad to it (api.capture), with what it already holds; Enter writes it down */
  const cardKey = (key: string) => {
    const s = SR.current, c = s.card;
    if (key === "enter") {
      const v = mcNorm(c);
      put(v ? { typing: false, card: v, cardSet: true } : { typing: false, card: s.cardPrev, cardSet: s.setPrev });
      api.capture(null);
      if (v) { api.sfx.tick(); focusOn(["use-card", "answer-open"]); }
      return;
    }
    if (key === "clear") { put({ card: "" }); return; }
    if (key === "back") { put({ card: c.slice(0, -1) }); return; }
    if (key === "point") { if (!c.includes(".") && c.length < 4) put({ card: c + "." }); return; }
    if (/^\d$/.test(key) && c.length < 5 && !(c.includes(".") && c.split(".")[1].length >= 2)) put({ card: c + key });
  };
  const openCard = () => { const s = SR.current; api.did("card"); put({ typing: true, cardPrev: s.card, setPrev: s.cardSet, cardSet: false }); api.capture(cardKey); };
  const pressKey = (on: string) => {
    const t = Date.now();
    if (t - lastKey.current < 400) return;   /* one tap never also presses the next label */
    lastKey.current = t;
    act(on);
  };
  /* the chain (an Answer card to write and use) is answered only when every step is done: until then the Answer key does not
     blink (cardReady false) and Enter refuses with a line; the other questions' acts are aids, their Answer key stays live */
  const gated = hasCard && stage === "ask" && !it.show;
  const ready = !gated || V.done >= acts.length;
  useEffect(() => { if (stage === "ask") api.cardReady(ready); }, [stage, ready, sid]);
  /* Enter, the agent's toolApi.check() and the dev __tool.solve() perform the CURRENT guide step */
  /* the refusal is read, then the question comes back to the bubble */
  api.onEnter(demo && stepOn ? () => pressKey(stepOn) : !ready ? () => { api.say(["Do the steps first.", item.say]); return false; } : null);
  HOOK.demo = demo && stepOn ? () => act(stepOn) : null;
  /* a right answer's own line (at a phase's last question the runtime shows the closing in its place) */
  useEffect(() => { if (stage === "win" && item && item.win) api.say(item.win); }, [stage, n, index]);
  HOOK.check = undefined;
  /* the agent: it does every act on the working area, then types the decimal with its point */
  HOOK.set = (v: any) => { if (stage !== "ask") return false; tl.stop(); api.capture(null); put(fullOf()); api.setTyped(String(v ?? "")); return true; };

  /* ── the traceback: every act done (the right step-1 answer on the card); when the answer is the item's misconception,
     the part it left out or turned round is lit first (amber); then each final column worked from the right, carries
     and all, to the green answer ── */
  const fin: number[] = cols0.map((_: any, i: number) => i).filter((i: number) => cols0[i].final);
  const mlOf = (): any => {
    if (it.kind === "chain") return { part: 1, row: { c: 0, r: 1 } };
    if (it.kind === "list") return { line: 2, row: { c: 0, r: 2 } };
    if (it.kind === "jug") { const j = Math.max(0, it.pours.findIndex((q: any) => q[0] === "−")); return { pour: j, row: { c: j, r: 1 } }; }
    return null;
  };
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    api.capture(null);
    tl.stop();
    const near = String(wrong.value ?? "").trim() === String(item.near) ? mlOf() : null;
    /* a card the child wrote that is not step 1's answer lights amber first, where it is, before the right one replaces it */
    const st = SR.current;
    const badCard = hasCard && st.cardSet && mcNorm(st.card) !== cols0[0].res;
    const seq: any[] = badCard ? [[10, () => put({ cardLit: true })], [1500, () => {}]] : [];
    seq.push([450, () => put({ ...fullOf(), tb: null, cardLit: false, ml: near, lit: near && near.line !== undefined ? near.line : -1 })]);
    if (near) seq.push([1500, () => {}], [10, () => put({ ml: null, lit: -1 })]);
    const nc = Math.max(...fin.map((c) => cols0[c].work.nc));
    for (let k = 1; k <= nc; k++) { const kk = k; seq.push([560, () => put({ tb: { k: kk } })]); }
    seq.push([300, () => put({ tb: { k: nc, done: true } })]);
    tl.run(seq, () => api.lock(false));
  }, [wrong]);

  /* how the result of column c is drawn: "none", "q" (not found yet), "part" (k digits from the right), "show" */
  const resMode = (c: number) => {
    const col = cols[c];
    if (V.wr[c] < col.rows.length) return "none";
    if (!col.final) return V.rin[c] ? "show" : "none";
    if (show || (V.tb && V.tb.done)) return "show";
    if (V.tb) return "part";
    return "q";
  };
  const reveal = show || !!(V.tb && V.tb.done);

  /* what the host and the agent read back (toolApi.getState); never the answer before it is given */
  api.share({ scene: free ? scene : it.scene || it.kind || null, unit: it.unit || null, stepsDone: V.done, stepsOf: acts.length,
    answerCard: hasCard ? (V.cardSet ? V.card : V.rin[0] ? cols0[0].res : null) : null, complete: stage === "idle" });

  /* ═══ drawing (helpers are called, never mounted) ═══ */
  const slide = (x: number, y: number) => ({ transform: `translate(${x}px, ${y}px)`, transition: fast ? undefined : "transform 420ms ease" } as any);
  const chip = (cx: number, y: number, w: number, label: string, ink: string) => (
    <g>
      <rect x={cx - w / 2} y={y} width={w} height={46} rx={10} fill="#FFFFFF" stroke={ink} strokeWidth={2} />
      <text x={cx} y={y + 34} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ink}>{label}</text>
    </g>
  );
  /* a rope piece: the twist tiled at its own pitch along the piece (never stretched) and clipped to its length, a whipped
     band and a frayed tip at each end; the plain tan capsule under it is the fallback */
  const RP_H = 30, RP_TW = Math.round((RP_H * 200) / 22);
  const ropePiece = (id: string, x: number, y: number, len: number) => (
    <g>
      <clipPath id={"mc-rp-" + id}><rect x={x} y={y - RP_H / 2} width={len} height={RP_H} rx={RP_H / 2} /></clipPath>
      <rect x={x} y={y - RP_H / 2} width={len} height={RP_H} rx={RP_H / 2} fill="#D9A55E" />
      {Array.from({ length: Math.max(1, Math.ceil(len / RP_TW)) }, (_, k) => (
        <Skin key={k} name="rope" x={x + k * RP_TW} y={y - RP_H / 2} w={RP_TW} h={RP_H} fit="stretch" clip={"url(#mc-rp-" + id + ")"} />))}
      {[0, 1].map((e) => {
        const ex = e ? x + len : x, s = e ? 1 : -1;
        return (
          <g key={e}>
            <rect x={e ? ex - 12 : ex + 6} y={y - RP_H / 2 - 1} width={6} height={RP_H + 2} rx={2} fill="#6B4423" />
            {[-9, 0, 9].map((dy) => <line key={dy} x1={ex - s * 2} y1={y + dy * 0.5} x2={ex + s * 7} y2={y + dy} stroke="#B07A3C" strokeWidth={2.5} strokeLinecap="round" />)}
          </g>
        );
      })}
    </g>
  );

  /* the column strip */
  const colView = (c: any, ci: number) => {
    const g = geos[ci];
    const wr = V.wr[ci];
    const mode = resMode(ci);
    const k = mode === "part" ? Math.min(V.tb.k, g.nc) : mode === "show" ? g.nc : 0;
    const w = c.work;
    const slot = (i: number) => hasCard && ci === 1 && i === c.cardRow;   /* where the Answer card goes in step 2 */
    /* step 1's card, once carried into step 2, leaves a dashed slot; the correction and the win fill it again */
    const moved = hasCard && ci === 0 && (V.cardIn || V.carrying) && !V.tb && !solved;
    const own = hasCard && ci === 0 && !moved && mode === "none" && wr >= c.rows.length;   /* the child's card, at a question */
    const lit = (i: number) => V.ml && V.ml.row.c === ci && V.ml.row.r === i;
    const cardBox = (y: number, solid: boolean) => (V.cardLit && solid
      ? <rect x={g.l} y={y - 54} width={g.r - g.l} height={72} rx={10} fill={tint(MC.now, 0.72)} stroke={MC_NOW} strokeWidth={4} />
      : <rect x={g.l} y={y - 54} width={g.r - g.l} height={72} rx={10} fill="#FFFFFF" stroke={solid ? mcInk(MC.result) : shade(C.rule, 0.2)} strokeWidth={solid ? 4 : 3} strokeDasharray={solid ? undefined : "8 7"} />
    );
    const typingNow = S.typing && captured;
    const op = (i: number) => <text x={g.ox} y={g.rb(i)} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{c.op}</text>;
    return (
      <g key={"col" + ci}>
        <rect x={g.x} y={g.y} width={g.w} height={g.h} rx={18} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={2} />
        {/* the title row: the step's name at the left, the unit of every number in the column at the right */}
        {c.title && <text x={g.x + 16} y={g.y + 42} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(c.title)}</text>}
        <text x={g.x + g.w - 16} y={g.y + 42} textAnchor="end" fontSize={T.label} fontWeight={700} fill={mcInk(MC.given)}>{tx(unit)}</text>
        {mode === "part" && <rect x={g.cx(g.nc - k) - MC_DW / 2 - 2} y={g.rb(0) - 54} width={MC_DW + 4} height={g.resB - g.rb(0) + 70} rx={8} fill={tint(MC.now, 0.72)} />}
        {c.rows.map((r: any, i: number) => {
          if (slot(i) && !V.cardIn) return wr === 0 ? null : (
            <g key={"r" + i}>
              {i > 0 && op(i)}
              {cardBox(g.rb(i), false)}
            </g>
          );
          if (i >= wr && !slot(i)) return null;
          return (
            <g key={"r" + i}>
              {lit(i) && <rect x={g.x + 6} y={g.rb(i) - 56} width={g.w - 12} height={74} rx={10} fill={tint(MC.now, 0.72)} stroke={MC_NOW} strokeWidth={3} />}
              {slot(i) && cardBox(g.rb(i), true)}
              {i > 0 && op(i)}
              {mcDigits(g, r.s, g.rb(i), mcInk(r.ink), C)}
            </g>
          );
        })}
        {wr >= c.rows.length && <line x1={g.x + 10} y1={g.ruleY} x2={g.x + g.w - 10} y2={g.ruleY} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />}
        {k > 0 && w.above.map((a: string, j: number) => (a && (c.op === "−" || j >= g.nc - k - 1)
          ? <text key={"a" + j} x={g.cx(j)} y={g.rb(0) - 56} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={mcInk(MC.carry)}>{a}</text> : null))}
        {k > 0 && c.op === "−" && w.struck.map((s: boolean, j: number) => (s
          ? <line key={"s" + j} x1={g.cx(j) - 18} y1={g.rb(0) - 21} x2={g.cx(j) + 18} y2={g.rb(0) - 21} stroke={C.ink} strokeWidth={3} strokeLinecap="round" /> : null))}   {/* a level strike: a slashed 0 reads as "Ø" */}
        {mode === "q" && <text x={(g.cx(0) + g.cx(g.nc - 1)) / 2 + MC_PW / 2} y={g.resB} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={quiet}>?</text>}
        {hasCard && ci === 0 && mode === "show" && !moved && cardBox(g.resB, true)}
        {moved && wr >= c.rows.length && cardBox(g.resB, false)}
        {own && cardBox(g.resB, S.cardSet || typingNow)}
        {own && (
          <g>
            <text x={(g.l + g.r) / 2} y={g.resB} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={S.cardSet || typingNow ? C.ink : quiet}>{typingNow ? S.card : S.cardSet ? S.card : "?"}</text>
            {typingNow && <rect className="c4-caret" x={(g.l + g.r) / 2 + S.card.length * 17 + 4} y={g.resB - 44} width={4} height={50} rx={2} fill={C.accent} />}
          </g>
        )}
        {k > 0 && !moved && mcDigits(g, c.res, g.resB, mcInk(MC.result), C, (j) => j >= g.nc - k)}
      </g>
    );
  };

  /* phase 1 and Free play: rope pieces on a tape in metres and tenths */
  const tapeView = () => {
    const { TX, TY, ppm } = tapeG;
    const L = 8 * ppm;
    const total = cum[cum.length - 1];
    const endX = TX + (total * ppm) / 100;
    let last = [-999, -999];
    const tagLv = pcs.map((v, i) => {
      const mid = TX + ((cum[i] + tOff() + u2[i] / 2) * ppm) / 100, w = twide(tag(v));
      const lv = mid - w / 2 < last[0] + 10 ? 1 : 0;
      last[lv] = mid + w / 2;
      return { mid, lv };
    });
    return (
      <g>
        <rect x={TX - 26} y={TY} width={L + 52} height={60} rx={8} fill="#FCEFB4" stroke={C.ink} strokeWidth={2.5} />
        {Array.from({ length: 81 }, (_, t) => {
          const x = TX + (t * ppm) / 10, l = t % 10 === 0 ? 28 : t % 5 === 0 ? 18 : 10;
          return <line key={t} x1={x} y1={TY} x2={x} y2={TY + l} stroke={C.ink} strokeWidth={t % 10 === 0 ? 3 : 1.5} />;
        })}
        {Array.from({ length: 9 }, (_, m) => <text key={"m" + m} x={TX + m * ppm} y={TY + 56} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{m}</text>)}
        <text x={TX + L + 36} y={TY + 42} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("m")}</text>
        {pcs.map((v, i) => {
          const on = i < V.joined, p = pieceAt(i, on), len = (u2[i] * ppm) / 100;
          return (
            <g key={"pc" + i}>
              <g style={slide(p.x, p.y)}>{ropePiece("t" + i, 0, 0, len)}</g>
              {on
                ? <text x={tagLv[i].mid} y={TY - 52 - tagLv[i].lv * 44} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={mcInk(MC.given)}>{tag(v)}</text>
                : <text x={p.x + len + 20} y={p.y + 11} fontSize={T.label} fontWeight={700} fill={mcInk(MC.given)}>{tag(v)}</text>}
            </g>
          );
        })}
        {/* the joints; at a question the end's mark (it stands on the answer) waits for the win or the correction */}
        {V.joined === pcs.length && pcs.map((_, i) => (i < pcs.length - 1 || V.measured || reveal) && <circle key={"j" + i} cx={TX + ((cum[i + 1] + tOff()) * ppm) / 100} cy={TY - 22} r={6} fill={C.ink} />)}
        {(V.measured || solved || !!(V.tb && V.tb.done)) && V.joined === pcs.length && (
          <g>
            <line x1={endX} y1={TY - 40} x2={endX} y2={TY + 70} stroke={mcInk(MC.result)} strokeWidth={5} />
            <text x={Math.max(TX + 60, Math.min(endX, TX + L - 40))} y={TY + 108} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={mcInk(MC.result)}>{tag(cols[0].res)}</text>
          </g>
        )}
      </g>
    );
  };

  /* a sack (of rice, flour or a weighed bag), drawn in its own box so a skin can lie over it */
  const sack = (x: number, y: number, w: number, h: number, fill: string, edge: string) => (
    <g>
      <path d={`M ${x + w * 0.36} ${y + h * 0.1} L ${x + w * 0.26} ${y} L ${x + w * 0.5} ${y + h * 0.06} L ${x + w * 0.74} ${y} L ${x + w * 0.64} ${y + h * 0.1} Z`}
        fill={fill} stroke={edge} strokeWidth={2.5} strokeLinejoin="round" />
      <path d={`M ${x + w * 0.34} ${y + h * 0.16} Q ${x + w * 0.5} ${y + h * 0.1} ${x + w * 0.66} ${y + h * 0.16} L ${x + w * 0.95} ${y + h * 0.72} Q ${x + w} ${y + h} ${x + w * 0.5} ${y + h} Q ${x} ${y + h} ${x + w * 0.05} ${y + h * 0.72} Z`}
        fill={fill} stroke={edge} strokeWidth={3} strokeLinejoin="round" />
      <rect x={x + w * 0.33} y={y + h * 0.1} width={w * 0.34} height={h * 0.07} rx={3} fill={edge} />
    </g>
  );

  /* the kitchen scale: the plain body (the fallback), the skin over it, then the dial drawn in code over its blank face.
     The marks run inward from a ring, the numerals stand OUTSIDE that ring and the needle stops short of them, so it never
     covers a numeral. max: the dial's top in kg; every: the numbered step; plate: the chip between the pan and the dial
     (the unit, or the reading once it is found) */
  const scaleBody = (u: number, max: number, every: number, clipId: string | null, plate: string, plateInk: string) => {
    const D = dial;
    const ang = (v: number) => -150 + (v / (max * 100)) * 300;
    const pt = (v: number, r: number) => { const a = (ang(v) * Math.PI) / 180; return [D.cx + Math.sin(a) * r, D.cy - Math.cos(a) * r]; };
    const n10 = max * 10, ring = D.r * 0.66;
    const plateY = (panY + 16 + D.cy - D.r - 6) / 2 - 23;
    return (
      <g>
        {clipId && <clipPath id={clipId}><rect x={SB.x} y={panY - 10} width={SB.w} height={SB.y + SB.h - panY + 10} /></clipPath>}
        <rect x={SB.x + SB.w * 0.12} y={SB.y + SB.h * 0.38} width={SB.w * 0.76} height={SB.h * 0.58} rx={30} fill="#F2D27A" stroke={C.ink} strokeWidth={3} />
        <rect x={SB.x + SB.w * 0.06} y={panY} width={SB.w * 0.88} height={16} rx={8} fill="#C9963E" stroke={C.ink} strokeWidth={2} />
        <Skin name="scale" x={SB.x} y={SB.y} w={SB.w} h={SB.h} clip={clipId ? "url(#" + clipId + ")" : undefined} />
        <circle cx={D.cx} cy={D.cy} r={D.r + 6} fill="#FFFDF2" stroke={C.ink} strokeWidth={2.5} />
        {Array.from({ length: n10 + 1 }, (_, t) => {
          const long = t % 10 === 0, half = t % 5 === 0;
          if (max > 5 && !half) return null;
          const a = pt(t * 10, ring), b = pt(t * 10, ring - (long ? 18 : half ? 12 : 7));
          return <line key={t} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={C.ink} strokeWidth={long ? 3 : 1.5} />;
        })}
        {Array.from({ length: Math.floor(max / every) + 1 }, (_, k) => {
          const m = k * every, q = pt(m * 100, D.r * 0.86);
          return <text key={"l" + m} x={q[0]} y={q[1] + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{m}</text>;
        })}
        <g transform={`translate(${D.cx},${D.cy})`}>
          <g style={{ transform: `rotate(${ang(u)}deg)`, transition: fast ? undefined : "transform 600ms ease" } as any}>
            <line x1={0} y1={8} x2={0} y2={-(ring - 2)} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
          </g>
          <circle cx={0} cy={0} r={7} fill={C.ink} />
        </g>
        {chip(D.cx, plateY, twide(plate) + 24, plate, plateInk)}
      </g>
    );
  };

  /* a bag: its measure on a two-line label inside the bag (the number, then the unit), so two bags fit inside the pan's rim */
  const bag = (v: string) => {
    const lw = Math.max(tfit(v), tfit(tx(unit))) + 18;
    return (
      <g>
        {sack(0, 0, BAG.w, BAG.h, tint(MC.given, 0.5), mcInk(MC.given))}
        <rect x={BAG.w / 2 - lw / 2} y={22} width={lw} height={74} rx={10} fill="#FFFFFF" stroke={mcInk(MC.given)} strokeWidth={2} />
        <text x={BAG.w / 2} y={52} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={mcInk(MC.given)}>{v}</text>
        <text x={BAG.w / 2} y={86} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={mcInk(MC.given)}>{tx(unit)}</text>
      </g>
    );
  };

  /* phase 1 (and Free play): bags carried onto the kitchen scale, whose dial reads kilograms in tenths */
  const scaleView = () => {
    const on = V.joined;
    const total = cum[Math.min(on, pcs.length)];
    const read = reveal && on === pcs.length;
    return (
      <g>
        {/* at a question the needle waits at 0 (its reading is the answer) until the win or the correction */}
        {scaleBody(reveal ? total : 0, 5, 1, "mc-scale-pan", read ? tag(cols[0].res) : tx("kg"), read ? mcInk(MC.result) : C.ink)}
        {pcs.map((v, i) => {
          const p = bagAt(i, i < on);
          return <g key={"bag" + i} style={slide(p.x, p.y)}>{bag(v)}</g>;
        })}
      </g>
    );
  };

  /* phase 2: the whole (a sack, or a rope to cut) and the two parts used */
  const chainView = () => {
    if (it.scene === "rope") {
      const { RX, RY, ppm } = rope;
      const a = ru[0], b = ru[1], whole = mcUnits(it.whole, 2);
      const seg = (i: number) => {
        const x = RX + ((i ? a : 0) * ppm) / 100, len = ((i ? b : a) * ppm) / 100, cut = V.cut > i;
        const dx = cut ? RX - x : 0, dy = cut ? 130 + i * 96 : 0;
        return (
          <g key={"seg" + i}>
            <g style={slide(dx, dy)}>
              {ropePiece("c" + i, x, RY, len)}
              {cut && <rect x={x} y={RY - RP_H / 2} width={len} height={RP_H} rx={RP_H / 2} fill={MC.taken} fillOpacity={0.45} />}
              {V.ml && V.ml.part === i && <rect x={x - 12} y={RY - RP_H / 2 - 8} width={len + 24} height={RP_H + 16} rx={20} fill="none" stroke={MC_NOW} strokeWidth={5} />}
            </g>
            {cut
              ? <text x={RX + len + 18} y={RY + dy + 11} fontSize={T.label} fontWeight={700} fill={mcInk(MC.taken)}>{tag(it.pcs[i])}</text>
              : <text x={x + len / 2} y={RY + 50 + i * 44} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={mcInk(MC.given)}>{tag(it.pcs[i])}</text>}
          </g>
        );
      };
      const restX = RX + ((a + b) * ppm) / 100;
      return (
        <g>
          <text x={RX + (whole * ppm) / 200} y={RY - 34} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={mcInk(MC.given)}>{tag(it.whole)}</text>
          {ropePiece("cw", restX, RY, RX + (whole * ppm) / 100 - restX)}
          {reveal && <rect x={restX} y={RY - RP_H / 2} width={RX + (whole * ppm) / 100 - restX} height={RP_H} rx={RP_H / 2} fill={MC.result} fillOpacity={0.45} />}
          {/* once found, what is left is written under the rope that is left */}
          {reveal && chip((restX + RX + (whole * ppm) / 100) / 2, RY + 26, twide(tag(cols0[1].res)) + 24, tag(cols0[1].res), mcInk(MC.result))}
          {seg(0)}{seg(1)}
          {V.cut < 2 && [a, a + b].map((u, j) => <line key={"mk" + j} x1={RX + (u * ppm) / 100} y1={RY - 24} x2={RX + (u * ppm) / 100} y2={RY + 24} stroke={C.ink} strokeWidth={3} />)}
        </g>
      );
    }
    /* the whole is the sack on the scale (the skin's own sack, one bag), its dial at the whole in kilograms; its tag stands
       above the sack */
    return (
      <g>
        {/* once found, the scale reads what is left in the sack, on its plate and by its needle */}
        {scaleBody(reveal ? mcUnits(cols0[1].res, 2) : mcUnits(it.whole, 2), 10, 2, null, reveal ? tag(cols0[1].res) : tx("kg"), reveal ? mcInk(MC.result) : C.ink)}
        {chip(SB.x + SB.w + 4 + (twide(tag(it.whole)) + 24) / 2, 8, twide(tag(it.whole)) + 24, tag(it.whole), mcInk(MC.given))}
        {it.pcs.map((v: string, j: number) => {
          const x = SB.x + SB.w - 6, y = 60 + j * 180;
          return (
            <g key={"sc" + j}>
              {V.ml && V.ml.part === j && <rect x={x + 6} y={y + 10} width={168} height={160} rx={16} fill={tint(MC.now, 0.72)} stroke={MC_NOW} strokeWidth={4} />}
              <path d={`M ${x + 24} ${y + 50} Q ${x + 90} ${y + 22} ${x + 156} ${y + 50} Z`} fill={tint(MC.taken, 0.45)} stroke={mcInk(MC.taken)} strokeWidth={2.5} />
              <path d={`M ${x + 16} ${y + 50} L ${x + 164} ${y + 50} Q ${x + 156} ${y + 110} ${x + 90} ${y + 110} Q ${x + 24} ${y + 110} ${x + 16} ${y + 50} Z`} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
              <text x={x + 90} y={y + 156} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={mcInk(MC.taken)}>{tag(v)}</text>
            </g>
          );
        })}
      </g>
    );
  };

  /* phase 3: the List panel, a line lit as it is added */
  const listView = () => (
    <g>
      <rect x={6} y={30} width={SW - 12} height={330} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      {it.lines.map((l: any, j: number) => {
        const y = 54 + j * 96;
        return (
          <g key={"ln" + j}>
            {V.lit === j && <rect x={16} y={y} width={SW - 32} height={84} rx={12} fill={tint(MC.now, 0.72)} stroke={MC_NOW} strokeWidth={3} />}
            {j > 0 && <line x1={28} y1={y - 6} x2={SW - 28} y2={y - 6} stroke={tint(C.rule, 0.3)} strokeWidth={2} />}
            {(() => {
              /* name and measure on one line when they fit; else an authored break: the name on top, the measure under it at the right */
              /* Hindi and Gujarati always break (their width on a phone's font is not known here) */
              const name = String(tx(l[0])), one = lang === "en" && tfit(name) + tfit(tag(l[1])) + 20 <= SW - 68;
              return (
                <g>
                  <text x={34} y={y + (one ? 54 : 36)} fontSize={T.label} fontWeight={600} fill={C.ink}>{name}</text>
                  <text x={SW - 34} y={y + (one ? 54 : 74)} textAnchor="end" fontSize={T.label} fontWeight={700} fill={mcInk(MC.given)}>{tag(l[1])}</text>
                </g>
              );
            })()}
          </g>
        );
      })}
      {/* once found, the list's total is written under it */}
      {reveal && V.wr[0] >= 3 && chip(SW / 2, 370, twide(tag(cols[0].res)) + 22, tag(cols[0].res), mcInk(MC.result))}
    </g>
  );

  /* phase 4 (and Free play): the jug marked in tenths of a litre, a cup to pour into and a bottle to pour in */
  const jugView = () => {
    const ly = levY(V.lev);
    const pouredOut = it.pours.some((q: any, j: number) => q[0] === "−" && j < V.poured);
    const pouredIn = it.pours.some((q: any, j: number) => q[0] === "+" && j < V.poured);
    const outV = (it.pours.find((q: any) => q[0] === "−") || [])[1], inV = (it.pours.find((q: any) => q[0] === "+") || [])[1];
    return (
      <g>
        <path d={`M ${J.x + J.w + 8} ${J.y + 30} C ${JS.x + JS.w + 4} ${J.y + 30} ${JS.x + JS.w + 4} ${J.y + 170} ${J.x + J.w + 8} ${J.y + 170}`} fill="none" stroke="#C9822E" strokeWidth={12} strokeLinecap="round" />
        <rect x={J.x - 8} y={JS.y + 6} width={J.w + 16} height={JS.h - 12} rx={20} fill="#FBE3C2" stroke="#9A5A1A" strokeWidth={3} />
        <Skin name="jug" x={JS.x} y={JS.y} w={JS.w} h={JS.h} />
        {reveal && (
          <g>
            <rect x={J.x} y={ly} width={J.w} height={Math.max(0, J.y + J.h - ly)} rx={6} fill={tint(V.poured ? MC.result : MC.given, 0.45)} fillOpacity={0.85} />
            <line x1={J.x} y1={ly} x2={J.x + J.w} y2={ly} stroke={mcInk(V.poured ? MC.result : MC.given)} strokeWidth={3} />
            {Array.from({ length: 21 }, (_, t) => {
              const y = levY(t * 10), l = t % 10 === 0 ? 46 : t % 5 === 0 ? 28 : 16;
              return <line key={t} x1={J.x} y1={y} x2={J.x + l} y2={y} stroke={C.ink} strokeWidth={t % 10 === 0 ? 3.5 : 2} />;
            })}
            {[1, 2].map((m) => <text key={"L" + m} x={J.x + 56} y={levY(m * 100) + 11} fontSize={T.label} fontWeight={700} fill={C.ink}>{tag(String(m), "L")}</text>)}
          </g>
        )}
        {/* at a question a cloth hides the glass (its level is the answer) until the win or the correction */}
        {!reveal && (
          <g>
            <rect x={J.x - 14} y={J.y - 20} width={J.w + 28} height={J.h + 30} rx={16} fill="#EFE3C8" stroke="#8C7A55" strokeWidth={3} />
            {[0.28, 0.36, 0.7, 0.78].map((f, k) => <rect key={k} x={J.x - 14} y={J.y - 20 + (J.h + 30) * f} width={J.w + 28} height={10} fill={k % 2 ? "#B8C9E0" : "#D99A8C"} />)}
            <path d={`M ${J.x + J.w * 0.3} ${J.y - 18} Q ${J.x + J.w * 0.36} ${J.y + J.h * 0.5} ${J.x + J.w * 0.26} ${J.y + J.h + 8}`} fill="none" stroke="#C9B48A" strokeWidth={3} />
          </g>
        )}
        {V.ml && V.ml.pour !== undefined && <rect x={potX + 4} y={it.pours[V.ml.pour][0] === "−" ? 26 : 200} width={122} height={it.pours[V.ml.pour][0] === "−" ? 160 : 210} rx={16} fill={tint(MC.now, 0.72)} stroke={MC_NOW} strokeWidth={4} />}
        {hasOut && (
          <g>
            <path d={`M ${potX + 22} 40 L ${potX + 108} 40 L ${potX + 98} 130 L ${potX + 32} 130 Z`} fill={pouredOut ? tint(MC.taken, 0.5) : "#FFFFFF"} stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
            <path d={`M ${potX + 106} 58 C ${potX + 130} 58 ${potX + 130} 100 ${potX + 102} 100`} fill="none" stroke={C.ink} strokeWidth={3} />
            <text x={potX + 65} y={174} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={mcInk(MC.taken)}>{tag(outV, "L")}</text>
          </g>
        )}
        {hasIn && (
          <g>
            <path d={`M ${potX + 50} 214 L ${potX + 80} 214 L ${potX + 80} 238 Q ${potX + 112} 252 ${potX + 112} 280 L ${potX + 112} 352 L ${potX + 18} 352 L ${potX + 18} 280 Q ${potX + 18} 252 ${potX + 50} 238 Z`}
              fill={pouredIn ? "#FFFFFF" : tint(MC.given, 0.55)} stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
            <text x={potX + 65} y={396} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={mcInk(MC.given)}>{tag(inV, "L")}</text>
          </g>
        )}
        {(reveal || (show && V.poured > 0)) && (() => {
          /* the reading on a chip under the jug, never over its marks */
          const dpJ = Math.max(...[it.start, ...it.pours.map((q: any) => q[1])].map(mcDp));
          const s = tag(mcStr(Math.round(V.lev / Math.pow(10, 2 - dpJ)), dpJ), "L"), w = twide(s) + 24;
          return chip(Math.max(w / 2 + 4, J.x + J.w / 2), JS.y + JS.h + 6, w, s, mcInk(MC.result));
        })()}
      </g>
    );
  };

  /* the one key at the bottom centre: its label follows the act; in Free play the scene keys stand at its left */
  const keyAct = (demo || stage === "ask" || free) && !V.tb && V.done < acts.length ? acts[V.done] : null;
  /* Use card waits for the card to be written */
  const keyOn = keyAct === "use-card" && !it.show && !V.cardSet ? null : keyAct;
  /* the Answer card at a question: a tap target over it (the pad is lent to it), the one invite while it waits */
  const cardLive = hasCard && stage === "ask" && !it.show && !V.tb && keyAct === "use-card" && !V.acting && geos[0];
  const cardRect = cardLive ? { x: geos[0].l, y: geos[0].resB - 54, w: geos[0].r - geos[0].l, h: 72 } : null;
  const keyLabel = (on: string) => (on === "join" && it.scene === "scale" ? "Weigh" : MC_LABEL[on]);
  const KW = 260, kxk = free ? 470 : (MC_FW - KW) / 2;
  const keys = (
    <g>
      {keyOn && (
        <Key key="act0" id={keyOn} label={tx(keyLabel(keyOn))} x={kxk} y={KY} w={KW} h={80} C={C} tone="key" disabled={V.acting} onClick={() => pressKey(keyOn)}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{tx(keyLabel(keyOn))}</text>
        </Key>
      )}
      {keyOn && demo && stepOn === keyOn && !V.acting && <Invite x={kxk + KW / 2} y={KY + 40} w={KW} h={80} rx={18} C={C} />}
      {cardRect && <Hit id="card" x={cardRect.x} y={cardRect.y} w={Math.max(72, cardRect.w)} h={cardRect.h} label={tx("Answer card")} enabled={!captured} onPress={openCard} />}
      {cardRect && !V.cardSet && !S.typing && <Invite x={cardRect.x + cardRect.w / 2} y={cardRect.y + cardRect.h / 2} w={cardRect.w} h={cardRect.h} rx={10} C={C} />}
      {free && ["rope", "bags", "jug"].map((sc, j) => (
        <Key key={"sc" + j} id={"scene-" + sc} label={tx(sc === "rope" ? "Rope" : sc === "bags" ? "Bags" : "Jug")} x={j * 150} y={KY} w={140} h={80} C={C} tone={scene === sc ? "key" : undefined}
          disabled={V.acting} onClick={() => { if (!playing.current) put({ scene: sc, fk: (SR.current.fk || 0) + 1 }); }}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={scene === sc ? toneInk("key", C.ink) : C.ink}>{tx(sc === "rope" ? "Rope" : sc === "bags" ? "Bags" : "Jug")}</text>
        </Key>
      ))}
    </g>
  );

  const sceneView = it.kind === "join" ? (it.scene === "scale" ? scaleView() : tapeView()) : it.kind === "chain" ? chainView()
    : it.kind === "list" ? listView() : it.kind === "jug" ? jugView() : null;
  return (
    <g transform={`translate(${x0},0)`}>
      {sceneView}
      <g pointerEvents="none">{cols.map(colView)}</g>
      {keys}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: its object and its measure in green */
function Thumb({ result, it, C, w, h, n, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const itm: any = it || last.it || ((PHASES[(n || 1) - 1] || PHASES[0]).items || [])[last.item] || {};
  const ink = shade(CONTENT.one, 0.25);
  const blue = shade(CONTENT.hundred, 0.25);
  /* the unit only where it is written in the page's language (no Latin letter in Hindi or Gujarati) */
  const u = tx(itm.unit || "L");
  const unit = lang === "en" || u !== (itm.unit || "L") ? " " + u : "";
  const fs = Math.max(T.micro, Math.min(T.label, h - 24));
  /* the phase's object, small: a rope on a tape, a kitchen scale, a list, a jug of water (inside a 56 x 48 box, scaled to the card) */
  const s = Math.min(1, (h - 12) / 48);
  const dark = C.ink;
  const obj = itm.scene === "tape" || itm.scene === "rope" ? (
    <g>
      <rect x={-27} y={4} width={54} height={14} rx={3} fill="#FCEFB4" stroke={dark} strokeWidth={1.5} />
      {[-20, -10, 0, 10, 20].map((x) => <line key={x} x1={x} y1={4} x2={x} y2={11} stroke={dark} strokeWidth={1.5} />)}
      <rect x={-24} y={-14} width={48} height={12} rx={6} fill="#D9A55E" stroke="#8A5A2B" strokeWidth={1.5} />
      {[-16, -8, 0, 8, 16].map((x) => <line key={x} x1={x - 3} y1={-13} x2={x + 3} y2={-3} stroke="#8A5A2B" strokeWidth={1.5} />)}
    </g>
  ) : itm.scene === "scale" || itm.scene === "sack" ? (
    <g>
      <rect x={-22} y={-20} width={44} height={6} rx={3} fill="#C9963E" stroke={dark} strokeWidth={1.5} />
      <rect x={-18} y={-14} width={36} height={36} rx={8} fill="#F2D27A" stroke={dark} strokeWidth={1.5} />
      <circle cx={0} cy={6} r={11} fill="#FFFDF2" stroke={dark} strokeWidth={1.5} />
      <line x1={0} y1={6} x2={6} y2={-1} stroke={dark} strokeWidth={2} strokeLinecap="round" />
    </g>
  ) : itm.kind === "jug" ? (
    <g>
      <path d="M 14 -12 C 24 -12 24 6 14 6" fill="none" stroke="#C9822E" strokeWidth={3} />
      <rect x={-16} y={-22} width={30} height={44} rx={5} fill="#FFFFFF" stroke="#9A5A1A" strokeWidth={2} />
      <rect x={-14} y={0} width={26} height={20} rx={3} fill={tint(CONTENT.one, 0.4)} />
      {[-12, -4, 4, 12].map((y) => <line key={y} x1={-16} y1={y} x2={-9} y2={y} stroke={dark} strokeWidth={1.5} />)}
    </g>
  ) : (
    <g>
      <rect x={-20} y={-22} width={40} height={44} rx={5} fill="#FFFFFF" stroke={dark} strokeWidth={1.5} />
      {[-12, -2, 8].map((y) => <line key={y} x1={-14} y1={y} x2={14} y2={y} stroke={blue} strokeWidth={2.5} strokeLinecap="round" />)}
      <line x1={-14} y1={15} x2={14} y2={15} stroke={dark} strokeWidth={2} />
    </g>
  );
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <g transform={`translate(${12 + 28 * s},${h / 2}) scale(${s})`}>{obj}</g>
      <text x={w - 14} y={h / 2 + fs * 0.36} textAnchor="end" fontSize={fs} fontWeight={700} fill={ink}>{String(last.value) + unit}</text>
    </g>
  );
}

function MeasureChain(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      pointKey: true, judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      board: true,
      keyOnly: true,
      /* the wide keypad: the picture is laid out in a 900-wide frame, so it fits x 64 to 964 with the panel open */
      bigPad: true,
      nextKey: true,
      navDots: true,
      StartArt, START_HOOK,
      }} />
  );
}

export default MeasureChain;
