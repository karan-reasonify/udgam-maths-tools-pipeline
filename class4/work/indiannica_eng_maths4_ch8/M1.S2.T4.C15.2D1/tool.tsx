/* ═══ M1.S2.T4.C15.2D1 · say_it_bar · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, the sound effects, the printed bubble, scoring, the
   events, idle and restart. THE LESSON IS SILENT (runtime r30): nothing is spoken; every line is
   printed on the bubble, which is the guide. The lesson is action-driven (r34): nothing moves on unless
   the child acts. Board layout (r27), the Next key (r48), the point key on every question (pointKey).
   NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md and docs/PATTERNS.md.
   Every English line the tool prints, in its data or drawn by Work (tx("...")), gets a Hindi and a
   Gujarati entry in TR once the English is final (check's tr-coverage row lists what is missing). */

const TOOL_ID = "say_it_bar";
const MEDIA_ID = "M1.S2.T4.C15.2D1";
const TOOL_NAME = "Say It Bar";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (not shown: phase 1 has guide steps) */
const OPENING = ["A number along a bar, with a dot standing in the middle of it. Cut it there."];
/* the whole-tool line (r44: no longer shown on the summary page; kept for the sidecar) */
const FINISH_LINE = "Every sentence built to its last word, and every last word doing a job.";
/* printed when the child opens Free play: every control it names is in the free branch of Work */
const FREE_LINE = "Free play. Tap New number for another one, cut it at the dot and count its places.";

/* THE START PAGE (runtime r28; docs/LAYOUT.md §1c): one question to wonder at, and the bar the lesson is about */
const START_HOOK = "How do you say a number that has a dot in it?";
function StartArt({ box, C, lang, tx }: any) {
  const G = sibBarGeo("26.58", false, box.w / 2, 70);
  return (
    <g>
      {sibBarDraw(G, { C })}
      {/* one blank label under each half, 16 apart at the point */}
      <rect x={G.x0 - 40} y={236} width={G.pc - 8 - (G.x0 - 40)} height={56} rx={16} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} strokeDasharray="10 8" />
      <rect x={G.pc + 8} y={236} width={G.rx0 + G.rw + 40 - (G.pc + 8)} height={56} rx={16} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} strokeDasharray="10 8" />
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11), keyed by the English byte for byte; the English stays what the checks read.
   Terms (NCERT class 4, as the chapter's first build had them): दशमलव / દશાંશ (decimal, and the everyday word for the
   point), the dot in prose बिंदु / ટપકું, पूर्ण / પૂર્ણ for the proper reading's "and", दसवाँ भाग / દશમો ભાગ, सौवाँ भाग /
   સોમો ભાગ, हज़ारवाँ भाग / હજારમો ભાગ. Digits stay digits (the runtime prints them as words). Each instruction and its
   hint take one bubble line each in Hindi and Gujarati. A first draft that wants a native speaker's read. */
const TR: any = {
  hi: {
    "Say It Bar": "पट्टी पर बोलो",
    "A number along a bar, with a dot standing in the middle of it. Cut it there.": "पट्टी पर एक संख्या है, बीच में एक बिंदु खड़ा है। उसे वहीं से काटो।",
    "Every sentence built to its last word, and every last word doing a job.": "हर वाक्य अपने आखिरी शब्द तक बना, और हर आखिरी शब्द का अपना काम है।",
    "Free play. Tap New number for another one, cut it at the dot and count its places.": "मुक्त खेल। नई संख्या टैप करो, बिंदु पर काटो और उसके स्थान गिनो।",
    "How do you say a number that has a dot in it?": "बिंदु वाली संख्या को कैसे बोलते हैं?",
    /* phase 1 */
    "The point divides the number in two": "बिंदु संख्या को दो भागों में बाँटता है",
    "Cut it where the dot is. What is each side counting?": "जहाँ बिंदु है, वहाँ से काटो। हर तरफ़ क्या गिना जा रहा है?",
    "Tap the dot to cut the number.": "बिंदु पर टैप करके संख्या काटो।",
    "The dot sits between digits.": "बिंदु अंकों के बीच में है।",
    "Tap the digits left of the dot.": "बिंदु के बाईं ओर के अंक टैप करो।",
    "Look before the dot.": "बिंदु से पहले देखो।",
    "Now tap the digits right of it.": "अब दाईं ओर के अंक टैप करो।",
    "Look after the dot this time.": "इस बार बिंदु के बाद देखो।",
    "Which side counts whole ones?": "किस तरफ़ पूर्ण इकाइयाँ हैं?",
    "Wholes on one side, pieces on the other.": "एक तरफ़ पूर्ण, दूसरी तरफ़ टुकड़े।",
    "A decimal has two parts, split by the point.": "दशमलव बिंदु दशमलव संख्या को दो भागों में बाँटता है।",
    "You learned: the point splits a decimal into two parts.": "तुमने सीखा: बिंदु दशमलव को दो भागों में बाँटता है।",
    "Type both parts of this number.": "इस संख्या के दोनों भाग लिखो।",
    "Parts of this number": "इस संख्या के भाग",
    "Where is the dot in this number?": "इस संख्या में बिंदु कहाँ है?",
    "Now split 13.9.": "अब 13.9 को बाँटो।",
    "Parts of 13.9": "13.9 के भाग",
    "Where do the whole ones stop?": "पूर्ण इकाइयाँ कहाँ रुकती हैं?",
    "Which part counts less than one?": "कौन सा भाग एक से कम गिनता है?",
    "Smaller than one?": "एक से छोटा?",
    "What is on each side of the dot?": "बिंदु की हर तरफ़ क्या है?",
    "Whole ones stop at the dot.": "पूर्ण इकाइयाँ बिंदु पर रुकती हैं।",
    "Even one digit makes a part.": "एक अंक भी एक भाग बनाता है।",
    /* phase 2 */
    "Saying the point out loud": "बिंदु को बोलकर पढ़ना",
    "What word goes where the dot is? Now try the everyday way.": "बिंदु की जगह कौन सा शब्द आता है? अब रोज़ के तरीके से बोलकर देखो।",
    "Tap the left card to fill a gap.": "बायाँ कार्ड टैप करके जगह भरो।",
    "The cards wait in the row below.": "कार्ड नीचे की पंक्ति में हैं।",
    "Now tap the other card.": "अब दूसरा कार्ड टैप करो।",
    "One card is still in the row.": "पंक्ति में एक कार्ड बाकी है।",
    "Which reading is that word from?": "वह शब्द किस तरीके का है?",
    "Only one ends on a place name.": "एक ही तरीका स्थान-नाम पर रुकता है।",
    "The proper reading says and for the point. The everyday reading says point.": "सही तरीके में बिंदु को पूर्ण कहते हैं। रोज़ के तरीके में उसे दशमलव कहते हैं।",
    "You learned: the point is read as and, or as point.": "तुमने सीखा: बिंदु को पूर्ण या दशमलव कहकर पढ़ते हैं।",
    "Fill the gap in both readings.": "दोनों तरीकों में खाली जगह भरो।",
    "Fill both gaps": "दोनों जगहें भरो",
    "Which word goes in each gap?": "हर जगह में कौन सा शब्द जाएगा?",
    "Build its everyday reading now.": "अब इसे रोज़ के तरीके से बनाओ।",
    "Everyday reading": "रोज़ का तरीका",
    "Do not mix the two readings.": "दोनों तरीके मत मिलाओ।",
    "What joins the proper reading?": "सही तरीके को क्या जोड़ता है?",
    "The joining word": "जोड़ने वाला शब्द",
    "Read it with your word in it.": "अपने शब्द के साथ इसे पढ़ो।",
    "Two readings, one number.": "दो तरीके, एक ही संख्या।",
    "Each digit is said on its own.": "हर अंक अलग से बोला जाता है।",
    /* phase 3 */
    "Naming the last digit's place": "आखिरी अंक के स्थान का नाम बताना",
    "Count what is after the dot. Which place does the last one sit in?": "बिंदु के बाद के अंक गिनो। आखिरी अंक किस स्थान में है?",
    "Tap Count to count the digits.": "गिनो पर टैप करके अंक गिनो।",
    "Count is the key beside the bar.": "गिनो बटन पट्टी के पास है।",
    "Tap the last digit you counted.": "गिना हुआ आखिरी अंक टैप करो।",
    "It is furthest from the dot.": "वह बिंदु से सबसे दूर है।",
    "Which digit after the dot is the last one?": "बिंदु के बाद आखिरी अंक कौन सा है?",
    "The count stops at the last one.": "गिनती आखिरी अंक पर रुकती है।",
    "The last word names the place of the last digit.": "आखिरी शब्द आखिरी अंक के स्थान का नाम है।",
    "You learned: the reading ends on the place of the last digit.": "तुमने सीखा: पढ़ना आखिरी अंक के स्थान के नाम पर रुकता है।",
    "Which word ends this reading?": "यह पढ़ना किस शब्द पर रुकता है?",
    "The last word": "आखिरी शब्द",
    "How many digits follow the dot?": "बिंदु के बाद कितने अंक हैं?",
    "Now end this number's reading.": "अब इस संख्या का पढ़ना पूरा करो।",
    "End the sentence": "वाक्य पूरा करो",
    "Count again, from the dot out.": "बिंदु से बाहर की ओर फिर गिनो।",
    "Where does its last digit sit?": "इसका आखिरी अंक किस स्थान में है?",
    "Name that place": "उस स्थान का नाम",
    "Only the digits after the dot count.": "बस बिंदु के बाद के अंक गिनो।",
    "Three digits: thousandths.": "तीन अंक: हज़ारवाँ भाग।",
    "Two digits: hundredths.": "दो अंक: सौवाँ भाग।",
    /* phase 4 */
    "Writing one down from what you hear": "जो सुनो, उसे लिखना",
    "The last word tells you how many places. The digits go in from the far end.": "आखिरी शब्द बताता है कि कितने स्थान हैं। अंक दूर वाले सिरे से भरते हैं।",
    "Tap the sentence's last word.": "वाक्य का आखिरी शब्द टैप करो।",
    "It is at the right end.": "वह दाएँ सिरे पर है।",
    "Tap the five to move it into the places.": "पाँच को टैप करके स्थानों में रखो।",
    "Five is a card in the sentence.": "पाँच वाक्य में एक कार्ड है।",
    "Tap the open place.": "खाली स्थान टैप करो।",
    "One place is still empty.": "एक स्थान अभी खाली है।",
    "How many places does it ask for?": "वह कितने स्थान माँगता है?",
    "Tap the last word to see them.": "उन्हें देखने को आखिरी शब्द टैप करो।",
    "The place name says how many digits come after the point.": "स्थान का नाम बताता है कि बिंदु के बाद कितने अंक आते हैं।",
    "You learned: the place name says how many decimal places to write.": "तुमने सीखा: स्थान का नाम बताता है कि दशमलव के कितने स्थान लिखने हैं।",
    "Write what you read in digits.": "जो पढ़ा, उसे अंकों में लिखो।",
    "From words to digits": "शब्दों से अंकों में",
    "What place does it end on?": "यह किस स्थान पर रुकता है?",
    "Now write the new sentence.": "अब नया वाक्य लिखो।",
    "Write this one": "इसे लिखो",
    "The six must reach that place.": "छह को उस स्थान तक पहुँचना है।",
    "Do the same for this sentence.": "इस वाक्य के लिए भी यही करो।",
    "The last one": "आखिरी वाला",
    "Count your number's places.": "अपनी संख्या के स्थान गिनो।",
    "The zero holds the tenths.": "शून्य दसवें भाग का स्थान भरता है।",
    "Six lands in the hundredths.": "छह सौवें भाग में पहुँचा।",
    /* the two answer boxes, the working area's words, the word cards and the summary drawing */
    "whole": "पूर्ण", "decimal": "दशमलव",
    "whole number part": "पूर्ण संख्या भाग", "decimal part": "दशमलव भाग",
    "whole ones": "पूर्ण इकाइयाँ", "smaller than one": "एक से छोटे", "one whole": "एक पूर्ण", "without the dot": "बिना बिंदु के",
    "proper": "सही", "everyday": "रोज़ का",
    "and": "पूर्ण", "point": "दशमलव", "dot": "बिंदु", "seven": "सात", "seven tenths": "सात दसवाँ भाग",
    "tenths": "दसवाँ भाग", "hundredths": "सौवाँ भाग", "thousandths": "हज़ारवाँ भाग",
    "tenth": "दसवाँ भाग", "hundredth": "सौवाँ भाग", "thousandth": "हज़ारवाँ भाग",
    "Count": "गिनो", "New number": "नई संख्या",
    /* Enter before an answer made on the working area is complete */
    "Tap a part first.": "पहले एक भाग टैप करो।", "Fill both gaps.": "दोनों जगहें भरो।", "Fill the gap first.": "पहले खाली जगह भरो।",
  },
  gu: {
    "Say It Bar": "પટ્ટી પર બોલો",
    "A number along a bar, with a dot standing in the middle of it. Cut it there.": "પટ્ટી પર એક સંખ્યા છે, વચ્ચે એક ટપકું ઊભું છે. તેને ત્યાંથી કાપો.",
    "Every sentence built to its last word, and every last word doing a job.": "દરેક વાક્ય તેના છેલ્લા શબ્દ સુધી બન્યું, અને દરેક છેલ્લા શબ્દનું પોતાનું કામ છે.",
    "Free play. Tap New number for another one, cut it at the dot and count its places.": "મુક્ત રમત. નવી સંખ્યા ટૅપ કરો, ટપકા પર કાપો અને તેનાં સ્થાન ગણો.",
    "How do you say a number that has a dot in it?": "ટપકાવાળી સંખ્યા કેવી રીતે બોલાય?",
    /* phase 1 */
    "The point divides the number in two": "ટપકું સંખ્યાને બે ભાગમાં વહેંચે છે",
    "Cut it where the dot is. What is each side counting?": "જ્યાં ટપકું છે ત્યાંથી કાપો. દરેક બાજુ શું ગણે છે?",
    "Tap the dot to cut the number.": "ટપકા પર ટૅપ કરી સંખ્યા કાપો.",
    "The dot sits between digits.": "ટપકું અંકોની વચ્ચે છે.",
    "Tap the digits left of the dot.": "ટપકાની ડાબી બાજુના અંકો ટૅપ કરો.",
    "Look before the dot.": "ટપકા પહેલાં જુઓ.",
    "Now tap the digits right of it.": "હવે જમણી બાજુના અંકો ટૅપ કરો.",
    "Look after the dot this time.": "આ વખતે ટપકા પછી જુઓ.",
    "Which side counts whole ones?": "કઈ બાજુ પૂર્ણ એકમ છે?",
    "Wholes on one side, pieces on the other.": "એક બાજુ પૂર્ણ, બીજી બાજુ ટુકડા.",
    "A decimal has two parts, split by the point.": "દશાંશ ચિહ્ન દશાંશ સંખ્યાને બે ભાગમાં વહેંચે છે.",
    "You learned: the point splits a decimal into two parts.": "તમે શીખ્યા: ટપકું દશાંશને બે ભાગમાં વહેંચે છે.",
    "Type both parts of this number.": "આ સંખ્યાના બંને ભાગ લખો.",
    "Parts of this number": "આ સંખ્યાના ભાગ",
    "Where is the dot in this number?": "આ સંખ્યામાં ટપકું ક્યાં છે?",
    "Now split 13.9.": "હવે 13.9 ને વહેંચો.",
    "Parts of 13.9": "13.9 ના ભાગ",
    "Where do the whole ones stop?": "પૂર્ણ એકમ ક્યાં અટકે છે?",
    "Which part counts less than one?": "કયો ભાગ એકથી ઓછું ગણે છે?",
    "Smaller than one?": "એકથી નાનું?",
    "What is on each side of the dot?": "ટપકાની દરેક બાજુ શું છે?",
    "Whole ones stop at the dot.": "પૂર્ણ એકમ ટપકા પર અટકે છે.",
    "Even one digit makes a part.": "એક અંક પણ એક ભાગ બનાવે છે.",
    /* phase 2 */
    "Saying the point out loud": "ટપકાને બોલીને વાંચવું",
    "What word goes where the dot is? Now try the everyday way.": "ટપકાની જગ્યાએ કયો શબ્દ આવે? હવે રોજની રીતે બોલીને જુઓ.",
    "Tap the left card to fill a gap.": "ડાબું કાર્ડ ટૅપ કરી જગ્યા ભરો.",
    "The cards wait in the row below.": "કાર્ડ નીચેની હરોળમાં છે.",
    "Now tap the other card.": "હવે બીજું કાર્ડ ટૅપ કરો.",
    "One card is still in the row.": "હરોળમાં એક કાર્ડ બાકી છે.",
    "Which reading is that word from?": "તે શબ્દ કઈ રીતનો છે?",
    "Only one ends on a place name.": "એક જ રીત સ્થાનના નામ પર અટકે છે.",
    "The proper reading says and for the point. The everyday reading says point.": "સાચી રીતમાં ટપકાને પૂર્ણ કહીએ છીએ. રોજની રીતમાં તેને દશાંશ કહીએ છીએ.",
    "You learned: the point is read as and, or as point.": "તમે શીખ્યા: ટપકાને પૂર્ણ અથવા દશાંશ કહીને વાંચીએ છીએ.",
    "Fill the gap in both readings.": "બંને રીતમાં ખાલી જગ્યા ભરો.",
    "Fill both gaps": "બંને જગ્યા ભરો",
    "Which word goes in each gap?": "દરેક જગ્યામાં કયો શબ્દ જશે?",
    "Build its everyday reading now.": "હવે તેની રોજની રીત બનાવો.",
    "Everyday reading": "રોજની રીત",
    "Do not mix the two readings.": "બે રીતો ભેળવશો નહીં.",
    "What joins the proper reading?": "સાચી રીતને શું જોડે છે?",
    "The joining word": "જોડતો શબ્દ",
    "Read it with your word in it.": "તમારા શબ્દ સાથે તે વાંચો.",
    "Two readings, one number.": "બે રીત, એક જ સંખ્યા.",
    "Each digit is said on its own.": "દરેક અંક અલગ બોલાય છે.",
    /* phase 3 */
    "Naming the last digit's place": "છેલ્લા અંકના સ્થાનનું નામ આપવું",
    "Count what is after the dot. Which place does the last one sit in?": "ટપકા પછીના અંકો ગણો. છેલ્લો અંક કયા સ્થાનમાં છે?",
    "Tap Count to count the digits.": "ગણો પર ટૅપ કરી અંકો ગણો.",
    "Count is the key beside the bar.": "ગણો બટન પટ્ટીની બાજુમાં છે.",
    "Tap the last digit you counted.": "ગણેલો છેલ્લો અંક ટૅપ કરો.",
    "It is furthest from the dot.": "તે ટપકાથી સૌથી દૂર છે.",
    "Which digit after the dot is the last one?": "ટપકા પછી છેલ્લો અંક કયો છે?",
    "The count stops at the last one.": "ગણતરી છેલ્લા અંક પર અટકે છે.",
    "The last word names the place of the last digit.": "છેલ્લો શબ્દ છેલ્લા અંકના સ્થાનનું નામ છે.",
    "You learned: the reading ends on the place of the last digit.": "તમે શીખ્યા: વાંચન છેલ્લા અંકના સ્થાનના નામ પર પૂરું થાય છે.",
    "Which word ends this reading?": "આ વાંચન કયા શબ્દ પર પૂરું થાય?",
    "The last word": "છેલ્લો શબ્દ",
    "How many digits follow the dot?": "ટપકા પછી કેટલા અંક છે?",
    "Now end this number's reading.": "હવે આ સંખ્યાનું વાંચન પૂરું કરો.",
    "End the sentence": "વાક્ય પૂરું કરો",
    "Count again, from the dot out.": "ટપકાથી બહારની તરફ ફરી ગણો.",
    "Where does its last digit sit?": "તેનો છેલ્લો અંક કયા સ્થાનમાં છે?",
    "Name that place": "તે સ્થાનનું નામ",
    "Only the digits after the dot count.": "ફક્ત ટપકા પછીના અંકો ગણો.",
    "Three digits: thousandths.": "ત્રણ અંક: હજારમો ભાગ.",
    "Two digits: hundredths.": "બે અંક: સોમો ભાગ.",
    /* phase 4 */
    "Writing one down from what you hear": "જે સાંભળો તે લખવું",
    "The last word tells you how many places. The digits go in from the far end.": "છેલ્લો શબ્દ કહે છે કે કેટલાં સ્થાન છે. અંકો દૂરના છેડેથી ભરાય છે.",
    "Tap the sentence's last word.": "વાક્યનો છેલ્લો શબ્દ ટૅપ કરો.",
    "It is at the right end.": "તે જમણા છેડે છે.",
    "Tap the five to move it into the places.": "પાંચ ટૅપ કરી સ્થાનોમાં મૂકો.",
    "Five is a card in the sentence.": "પાંચ વાક્યમાં એક કાર્ડ છે.",
    "Tap the open place.": "ખાલી સ્થાન ટૅપ કરો.",
    "One place is still empty.": "એક સ્થાન હજી ખાલી છે.",
    "How many places does it ask for?": "તે કેટલાં સ્થાન માગે છે?",
    "Tap the last word to see them.": "તે જોવા છેલ્લો શબ્દ ટૅપ કરો.",
    "The place name says how many digits come after the point.": "સ્થાનનું નામ કહે છે કે ટપકા પછી કેટલા અંક આવે.",
    "You learned: the place name says how many decimal places to write.": "તમે શીખ્યા: સ્થાનનું નામ કહે છે કે દશાંશનાં કેટલાં સ્થાન લખવાં.",
    "Write what you read in digits.": "જે વાંચ્યું તે અંકોમાં લખો.",
    "From words to digits": "શબ્દોથી અંકોમાં",
    "What place does it end on?": "તે કયા સ્થાન પર પૂરું થાય?",
    "Now write the new sentence.": "હવે નવું વાક્ય લખો.",
    "Write this one": "આ લખો",
    "The six must reach that place.": "છને તે સ્થાન સુધી પહોંચવું છે.",
    "Do the same for this sentence.": "આ વાક્ય માટે પણ એમ જ કરો.",
    "The last one": "છેલ્લું",
    "Count your number's places.": "તમારી સંખ્યાનાં સ્થાન ગણો.",
    "The zero holds the tenths.": "શૂન્ય દશમા ભાગનું સ્થાન ભરે છે.",
    "Six lands in the hundredths.": "છ સોમા ભાગમાં પહોંચે છે.",
    /* the two answer boxes, the working area's words, the word cards and the summary drawing */
    "whole": "પૂર્ણ", "decimal": "દશાંશ",
    "whole number part": "પૂર્ણ સંખ્યા ભાગ", "decimal part": "દશાંશ ભાગ",
    "whole ones": "પૂર્ણ એકમ", "smaller than one": "એકથી નાના", "one whole": "એક પૂર્ણ", "without the dot": "ટપકા વગર",
    "proper": "સાચી", "everyday": "રોજની",
    "and": "પૂર્ણ", "point": "દશાંશ", "dot": "ટપકું", "seven": "સાત", "seven tenths": "સાત દશમો ભાગ",
    "tenths": "દશમો ભાગ", "hundredths": "સોમો ભાગ", "thousandths": "હજારમો ભાગ",
    "tenth": "દશમો ભાગ", "hundredth": "સોમો ભાગ", "thousandth": "હજારમો ભાગ",
    "Count": "ગણો", "New number": "નવી સંખ્યા",
    /* Enter before an answer made on the working area is complete */
    "Tap a part first.": "પહેલાં એક ભાગ ટૅપ કરો.", "Fill both gaps.": "બંને જગ્યા ભરો.", "Fill the gap first.": "પહેલાં ખાલી જગ્યા ભરો.",
  },
};

/* ── the chapter's colours: a digit left of the point is deep blue, right of it green, the point vermilion;
   the count and anything lit is amber; a zero that only holds a place open is grey at full size and weight ── */
const SIB = { whole: CONTENT.hundred, dec: CONTENT.one, point: CONTENT.pointer, mark: CONTENT.ten };
const SIB_GREY = "#767676";
const sibInk = (c: string) => shade(c, 0.35);
const sibFace = (c: string) => tint(c, 0.85);
const SIB_PLATE = tint(CHROME.panel, 0.45);

const SIB_PLACES = ["tenths", "hundredths", "thousandths"];
const SIB_FREE = ["4.7", "12.56", "0.309", "8.25", "31.4", "6.072"];

/* a decimal is never written with a comma inside its digits (the book writes 12.563) */
const sibCut = (s: any) => {
  const t = String(s === null || s === undefined ? "" : s);
  const i = t.indexOf(".");
  return i < 0 ? { whole: t, dec: "" } : { whole: t.slice(0, i), dec: t.slice(i + 1) };
};
const sibPlaceOf = (d: string) => SIB_PLACES[Math.max(0, Math.min(2, d.length - 1))];
/* the words of a reading: "whole" reads the decimal part as one number and ends on its last digit's place
   (one piece is singular: "one tenth"); "single" says the digits one at a time and names no place.
   A whole part of zero is not read in the proper reading (0.608 is "six hundred eight thousandths"). */
const sibLane = (num: string, read: string, lang: string = "en", tx: any = (v: any) => v) => {
  const c = sibCut(num);
  if (read === "single") return [wordsIn(Number(c.whole), lang), tx("point"), c.dec.split("").map((x) => wordsIn(Number(x), lang)).join(" ")];
  const unit = sibPlaceOf(c.dec);
  const last = tx(Number(c.dec) === 1 ? unit.slice(0, -1) : unit);
  if (Number(c.whole) === 0) return [wordsIn(Number(c.dec), lang), last];
  return [wordsIn(Number(c.whole), lang), tx("and"), wordsIn(Number(c.dec), lang), last];
};

/* geometry, in working-area units (origin at the area's top-left). The picture is only a bar of a few cards, so it is
   drawn big enough to read from the last bench (the owner, 2026-10-14): digit cards 124 wide with their digits at 72,
   every word at 40 where the room allows (36 at the least; 28 only for a minor caption). A card shrinks only when a
   number would not otherwise fit the room the working area has just now (the panel open: 900 wide). */
const SIB_PT = { w: 28, gap: 14, open: 24 };
const SIB_SLOT_H = 100;
const SIB_WORD = 40, SIB_SMALL = 36;
/* Devanagari and Gujarati letters run wider than Latin ones a character: Work sets the language each render */
let SIB_LANG = "en";
const sibTextW = (s: any, z: number) => String(s).length * z * (SIB_LANG === "en" ? 0.56 : 0.68);
const sibCardOf = (w: number) => {
  const cw = Math.round(Math.max(72, Math.min(124, w)));
  return { w: cw, h: Math.round(cw * 1.06), gap: cw >= 110 ? 10 : 8, z: cw >= 110 ? T.display : T.xl };
};
const SIB_BIG = sibCardOf(124);
/* the widest card that lets a number (cut or whole) stand inside `room` units, plates included */
const sibCardFor = (num: string, cut: boolean, room: number) => {
  const c = sibCut(num), n = Math.max(1, c.whole.length + c.dec.length);
  const fixed = (w: number) => Math.max(0, c.whole.length - 1) * sibCardOf(w).gap + Math.max(0, c.dec.length - 1) * sibCardOf(w).gap
    + 2 * SIB_PT.gap + SIB_PT.w + (cut ? 2 * SIB_PT.open : 0) + 32;
  let w = 124;
  while (w > 72 && n * w + fixed(w) > room) w -= 4;
  return sibCardOf(w);
};

/* where every card of a number sits on the bar; `cut` slides the halves apart */
const sibBarGeo = (num: string, cut: boolean, cx: number, y: number, K: any = SIB_BIG) => {
  const c = sibCut(num);
  const nl = c.whole.length, nr = c.dec.length;
  const lw = nl * K.w + Math.max(0, nl - 1) * K.gap;
  const rw = nr * K.w + Math.max(0, nr - 1) * K.gap;
  const total = lw + 2 * SIB_PT.gap + SIB_PT.w + rw;
  const x0 = cx - total / 2;
  const px = x0 + lw + SIB_PT.gap;
  const rx0 = px + SIB_PT.w + SIB_PT.gap;
  const g = cut ? SIB_PT.open : 0;
  return { c, nl, nr, lw, rw, x0, px, pc: px + SIB_PT.w / 2, rx0, g, y, cx, K,
    leftC: x0 + lw / 2 - g, rightC: rx0 + rw / 2 + g,
    lx: (k: number) => x0 + k * (K.w + K.gap) - g,
    rx: (k: number) => rx0 + k * (K.w + K.gap) + g };
};

const sibDigit = (x: number, y: number, d: string, col: string, key: any, o: any = {}) => {
  const K = o.K || SIB_BIG;
  return (
    <g key={key}>
      <rect x={x} y={y} width={K.w} height={K.h} rx={16} fill={o.lit ? sibFace(SIB.mark) : sibFace(col)}
        stroke={o.lit ? shade(SIB.mark, 0.1) : col} strokeWidth={o.lit ? 6 : 4} />
      <text x={x + K.w / 2} y={y + K.h / 2 + K.z * 0.36} textAnchor="middle" fontSize={K.z} fontWeight={700} fill={o.grey ? SIB_GREY : sibInk(col)}>{d}</text>
    </g>
  );
};

/* the bar: two plates meeting under the standing point, the digit cards on them; the halves slide when cut */
function sibBarDraw(G: any, o: any) {
  const { C } = o;
  const K = G.K, y = G.y, step = K.w + K.gap;
  const lit = (k: number) => (o.countTo || 0) > k;
  return (
    <g pointerEvents="none">
      <g className="sib-slide" style={{ transform: `translateX(${-G.g}px)` } as any}>
        <rect x={G.x0 - 16} y={y - 10} width={G.pc - G.x0 + 16} height={K.h + 20} rx={22} fill={SIB_PLATE} stroke={C.rule} strokeWidth={2} />
        {G.c.whole.split("").map((d: string, k: number) => sibDigit(G.x0 + k * step, y, d, SIB.whole, "w" + k, { K }))}
      </g>
      <g className="sib-slide" style={{ transform: `translateX(${G.g}px)` } as any}>
        <rect x={G.pc} y={y - 10} width={G.rx0 + G.rw + 16 - G.pc} height={K.h + 20} rx={22} fill={SIB_PLATE} stroke={C.rule} strokeWidth={2} />
        {G.c.dec.split("").map((d: string, k: number) => sibDigit(G.rx0 + k * step, y, d, SIB.dec, "d" + k, { K, lit: lit(k) }))}
      </g>
      <rect x={G.pc - 4} y={y - 4} width={8} height={K.h + 8} rx={4} fill={SIB.point} />
      <circle cx={G.pc} cy={y + K.h * 0.62} r={14} fill={SIB.point} stroke="#FFFFFF" strokeWidth={3} />
      {G.c.dec.split("").map((_d: string, k: number) => lit(k) && (
        <g key={"b" + k}>
          <circle cx={G.rx(k) + K.w / 2} cy={y - 40} r={28} fill={sibFace(SIB.mark)} stroke={shade(SIB.mark, 0.1)} strokeWidth={3} />
          <text x={G.rx(k) + K.w / 2} y={y - 40 + SIB_SMALL * 0.36} textAnchor="middle" fontSize={SIB_SMALL} fontWeight={700} fill={shade(SIB.mark, 0.55)}>{k + 1}</text>
        </g>
      ))}
      {o.ringLast && G.nr > 0 && (
        <rect x={G.rx(G.nr - 1) - 8} y={y - 8} width={K.w + 16} height={K.h + 16} rx={22} fill="none" stroke={shade(SIB.mark, 0.1)} strokeWidth={6} />
      )}
    </g>
  );
}

/* a word in a box: one line, or two lines when the layout says so (`two`), at the size z */
const sibSplit2 = (s: string) => {
  const ws = String(s).split(" ");
  if (ws.length < 2) return null;
  let best: any = null, bm = 1e9;
  for (let k = 1; k < ws.length; k++) {
    const a = ws.slice(0, k).join(" "), b = ws.slice(k).join(" "), m = Math.max(a.length, b.length);
    if (m < bm) { bm = m; best = [a, b]; }
  }
  return best;
};
const sibText = (s: any, cx: number, cy: number, z: number, two: boolean, fill: string, weight: number = 600) => {
  const str = String(s === null || s === undefined ? "" : s);
  const lines = (two && sibSplit2(str)) || [str], lh = z + 6;
  return lines.map((ln: string, k: number) => (
    <text key={k} x={cx} y={cy + z * 0.36 + (k - (lines.length - 1) / 2) * lh} textAnchor="middle" fontSize={z} fontWeight={weight} fill={fill}>{ln}</text>
  ));
};

/* the columns of a reading (one or more lanes share them, so the words of two readings stand one above the other): each
   column is as wide as the longest thing it may hold (its word, or any card that can fill its gap), one font size for
   the whole row, the biggest that fits [x, x + w]: 40, else a long one on two lines, else 36, 32, 28 */
const sibLaneLay = (cols: string[][], x: number, w: number) => {
  const gap = 14, n = cols.length;
  const lineW = (s: string, z: number, two: boolean) => {
    const sp = two ? sibSplit2(s) : null;
    return Math.max(...(sp || [s]).map((l: string) => sibTextW(l, z)));
  };
  for (const z of [SIB_WORD, SIB_SMALL, 32, T.micro]) {
    const two = cols.map(() => false);
    const colW = (k: number) => Math.max(110, ...cols[k].map((s) => lineW(s, z, two[k]) + 36));
    const tot = () => cols.reduce((a, _c, k) => a + colW(k), 0) + gap * (n - 1);
    while (tot() > w) {
      let best = -1, bw = 0;
      cols.forEach((c, k) => { if (!two[k] && c.some((s) => sibSplit2(s)) && colW(k) > bw) { bw = colW(k); best = k; } });
      if (best < 0) break;
      two[best] = true;
    }
    if (tot() <= w || z === T.micro) {
      const ws = cols.map((_c, k) => colW(k)), x0 = x + Math.max(0, (w - tot()) / 2);
      const xs: number[] = [];
      ws.reduce((a, cw) => { xs.push(a); return a + cw + gap; }, x0);
      return { z, two, ws, xs };
    }
  }
  return { z: T.micro, two: cols.map(() => true), ws: cols.map(() => w / n), xs: cols.map((_c, k) => x + k * (w / n)) };
};

/* the runtime's own pulse (the invite's animation) on a rounded box round a wide target, so no ring cuts a digit or a word */
const sibPulse = (x: number, y: number, w: number, h: number, C: any) => (
  <rect className="c4-pulse" x={x} y={y} width={w} height={h} rx={24} fill="none" pointerEvents="none" strokeWidth={5}
    stroke={(typeof THEME !== "undefined" && THEME && THEME.enter && THEME.enter[1]) || C.accent} />
);

/* ── phases ─────────────────────────────────────────────────────────────────────────────
   kinds: split (type the two parts of a number) · side (which part counts pieces smaller than one) ·
          join (fill a reading's gaps from the word cards, then Enter) · place (the last word of a reading) ·
          write (type the decimal a heard sentence asks for) */
const PHASES = [
  {
    n: 1,
    concept: "The point divides the number in two",
    conceptId: "M1.S2.T4.C15", objectiveIds: ["O5"],
    says: ["Cut it where the dot is. What is each side counting?"],
    steps: [
      { say: "Tap the dot to cut the number.", on: "cut", hint: "The dot sits between digits." },
      { say: "Tap the digits left of the dot.", on: "left", hint: "Look before the dot." },
      { say: "Now tap the digits right of it.", on: "right", hint: "Look after the dot this time." },
    ],
    ladder: ["Which side counts whole ones?", "Wholes on one side, pieces on the other."],
    closing: "A decimal has two parts, split by the point.",
    learned: "You learned: the point splits a decimal into two parts.",
    traceback: "The bar opens at the point and each half gets its name and its number: whole ones on the left, pieces smaller than one on the right.",
    items: [
      /* learn ML1: answer in the plan = 45 is the whole number part and 317 is the decimal part */
      { qid: "M1.S2.T4.C15:ML1", kind: "split", num: "45.317", parts: [{ label: "whole" }, { label: "decimal" }], answer: [45, 317],
        say: "Type both parts of this number.", ask: "Parts of this number",
        miss: "Where is the dot in this number?" },
      /* practice 1: answer in the plan = 13 is the whole number part and 9 is the decimal part */
      { qid: "M1.S2.T4.C15:1", kind: "split", num: "13.9", parts: [{ label: "whole" }, { label: "decimal" }], answer: [13, 9],
        say: "Now split 13.9.", ask: "Parts of 13.9",
        miss: "Where do the whole ones stop?" },
      /* practice 2: answer in the plan = The decimal part, which is written to the right of the point
         (asked on a number already cut and named, so the child taps that part of the bar, then Enter) */
      { qid: "M1.S2.T4.C15:2", kind: "side", num: "6.24", pad: "enter", answer: "decimal",
        say: "Which part counts less than one?", ask: "Smaller than one?",
        miss: "What is on each side of the dot?" },
    ],
  },
  {
    n: 2,
    concept: "Saying the point out loud",
    conceptId: "M1.S2.T4.C16", objectiveIds: ["O5"],
    says: ["What word goes where the dot is? Now try the everyday way."],
    steps: [
      { say: "Tap the left card to fill a gap.", on: "card-and", hint: "The cards wait in the row below." },
      { say: "Now tap the other card.", on: "card-point", hint: "One card is still in the row." },
    ],
    ladder: ["Which reading is that word from?", "Only one ends on a place name."],
    closing: "The proper reading says and for the point. The everyday reading says point.",
    learned: "You learned: the point is read as and, or as point.",
    traceback: "Both readings stand under the bar with the right word lit in each gap, each reading whole from start to end.",
    items: [
      /* learn ML2: answer in the plan = Eight and sixty-four hundredths, or eight point six four
         (built here as the joining word of each reading, so both readings stand whole, side by side) */
      { qid: "M1.S2.T4.C16:ML2", kind: "join", num: "8.64", reads: ["whole", "single"], lanes: [0, 1],
        holes: [{ lane: 0, slot: 1 }, { lane: 1, slot: 1 }], cards: ["point", "and"], pad: "enter",
        answer: "and point", near: "point and", ask: "Fill both gaps",
        say: "Fill the gap in both readings.",
        miss: "Which word goes in each gap?" },
      /* practice 3: answer in the plan = Two point seven */
      { qid: "M1.S2.T4.C16:3", kind: "join", num: "2.7", reads: ["whole", "single"], lanes: [1],
        holes: [{ lane: 1, slot: 1 }, { lane: 1, slot: 2 }], cards: ["and", "point", "seven", "seven tenths"], pad: "enter",
        answer: "point seven", near: "point seven tenths", ask: "Everyday reading",
        say: "Build its everyday reading now.",
        miss: "Do not mix the two readings." },
      /* practice 4: answer in the plan = The word and */
      { qid: "M1.S2.T4.C16:4", kind: "join", num: "5.3", reads: ["whole", "single"], lanes: [0],
        holes: [{ lane: 0, slot: 1 }], cards: ["point", "dot", "and"], pad: "enter",
        answer: "and", near: "point", ask: "The joining word",
        say: "What joins the proper reading?",
        miss: "Read it with your word in it." },
    ],
  },
  {
    n: 3,
    concept: "Naming the last digit's place",
    conceptId: "M1.S2.T4.C17", objectiveIds: ["O6"],
    says: ["Count what is after the dot. Which place does the last one sit in?"],
    steps: [
      { say: "Tap Count to count the digits.", on: "count", hint: "Count is the key beside the bar." },
      { say: "Tap the last digit you counted.", on: "last-digit", hint: "It is furthest from the dot." },
    ],
    ladder: ["Which digit after the dot is the last one?", "The count stops at the last one."],
    closing: "The last word names the place of the last digit.",
    learned: "You learned: the reading ends on the place of the last digit.",
    traceback: "The count runs from the point outwards, digit by digit, and the place of the last one drops into the sentence's last slot.",
    items: [
      /* learn ML3: answer in the plan = Fifty-six and two hundred four thousandths */
      { qid: "M1.S2.T4.C17:ML3", kind: "place", num: "56.204", cards: SIB_PLACES, pad: "enter",
        answer: "thousandths", ask: "The last word",
        say: "Which word ends this reading?",
        miss: "How many digits follow the dot?" },
      /* practice 5: answer in the plan = Thirty and forty-five hundredths */
      { qid: "M1.S2.T4.C17:5", kind: "place", num: "30.45", cards: SIB_PLACES, pad: "enter",
        answer: "hundredths", ask: "End the sentence",
        say: "Now end this number's reading.",
        miss: "Count again, from the dot out." },
      /* practice 6: answer in the plan = Six hundred eight thousandths */
      { qid: "M1.S2.T4.C17:6", kind: "place", num: "0.608", cards: SIB_PLACES, pad: "enter",
        answer: "thousandths", ask: "Name that place",
        say: "Where does its last digit sit?",
        miss: "Only the digits after the dot count." },
    ],
  },
  {
    n: 4,
    concept: "Writing one down from what you hear",
    conceptId: "M1.S2.T4.C18", objectiveIds: ["O6"],
    says: ["The last word tells you how many places. The digits go in from the far end."],
    steps: [
      { say: "Tap the sentence's last word.", on: "last-word", hint: "It is at the right end." },
      { say: "Tap the five to move it into the places.", on: "heard-digits", hint: "Five is a card in the sentence." },
      { say: "Tap the open place.", on: "open-place", hint: "One place is still empty." },
    ],
    ladder: ["How many places does it ask for?", "Tap the last word to see them."],
    closing: "The place name says how many digits come after the point.",
    learned: "You learned: the place name says how many decimal places to write.",
    traceback: "The places the last word asks for are drawn, the heard digits walk in from the right, and a grey zero fills the place left open.",
    items: [
      /* learn ML4: answer in the plan = 7.085 */
      { qid: "M1.S2.T4.C18:ML4", kind: "write", heard: { whole: 7, part: 85, place: "thousandths" },
        answer: "7.085", ask: "From words to digits",
        say: "Write what you read in digits.",
        miss: "What place does it end on?" },
      /* practice 7: answer in the plan = 41.06 (its miss is the zero hung on the right hand end, 41.60) */
      { qid: "M1.S2.T4.C18:7", kind: "write", heard: { whole: 41, part: 6, place: "hundredths" }, wrongEnd: true,
        answer: "41.06", ask: "Write this one",
        say: "Now write the new sentence.",
        miss: "The six must reach that place." },
      /* practice 8: answer in the plan = 26.45, and it needs two decimal places (the places it needs are drawn
         on the working area when the child taps the last word, so what the child writes is the decimal itself) */
      { qid: "M1.S2.T4.C18:8", kind: "write", heard: { whole: 26, part: 45, place: "hundredths" },
        answer: "26.45", ask: "The last one",
        say: "Do the same for this sentence.",
        miss: "Count your number's places." },
    ],
  },
];

/* The numbers, rows and sizes the working area needs (they go into the sidecar too). The warm-up numbers of the guide
   steps are none of the questions' numbers, so a step never answers a question. */
const MODEL = {
  places: SIB_PLACES, readings: ["proper", "everyday"],
  warmUp: {
    1: { kind: "split", num: "62.48" },
    2: { kind: "join", num: "6.2", reads: ["whole", "single"], lanes: [0, 1], holes: [{ lane: 0, slot: 1 }, { lane: 1, slot: 1 }], cards: ["and", "point"] },
    3: { kind: "place", num: "9.35", cards: SIB_PLACES },
    4: { kind: "write", heard: { whole: 3, part: 5, place: "hundredths" } },
  } as any,
  card: { w: SIB_BIG.w, h: SIB_BIG.h }, point: { w: SIB_PT.w, colour: "vermilion" },
  freeNumbers: SIB_FREE,
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: the two parts compare as numbers; every other answer is a written form, compared exactly, so a decimal
   keeps the zero the book writes in front of it ("7.85" is not "7.085", and "0.30" is not "0.3") */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  return String(v === null || v === undefined ? "" : v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};

/* the word a gap waits for, worked out from the reading its lane runs: a reading that says the decimal part as one
   number joins with "and", one that says the digits singly joins with "point" */
const sibExpect = (it: any, h: any) => {
  const parts = String(it.num).split(".");
  const single = it.reads[h.lane] === "single";
  if (h.slot === 1) return single ? "point" : "and";
  if (h.slot === 2) return single ? parts[1].split("").map((x: string) => words(Number(x))).join(" ") : words(Number(parts[1]));
  return "";
};

/* oracle: every answer re-derived by a second route that shares no code with judge or Work */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "split") {
    const parts = String(it.num).split(".");
    return parts.length === 2 && it.answer[0] === parseInt(parts[0], 10) && it.answer[1] === parseInt(parts[1], 10);
  }
  if (it.kind === "side") return /^\d+\.\d+$/.test(it.num) && it.answer === "decimal";
  if (it.kind === "join") return it.answer === it.holes.map((h: any) => sibExpect(it, h)).join(" ");
  if (it.kind === "place") {
    const after = String(it.num).length - String(it.num).indexOf(".") - 1;
    return it.answer === ["", "tenths", "hundredths", "thousandths"][after];
  }
  if (it.kind === "write") {
    const need = ["tenths", "hundredths", "thousandths"].indexOf(it.heard.place) + 1;
    const value = it.heard.whole + it.heard.part / Math.pow(10, need);
    return it.answer === value.toFixed(need);
  }
  return false;
}));

/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => {
  /* the number read straight through as one long number, the point lost (45.317 typed as 45317 and nothing after it) */
  if (item.kind === "split") return String(item.answer[0]) + String(item.answer[1]) + "|0";
  if (item.kind === "side") return "whole";
  if (item.kind === "join") return item.near;                                  /* the two readings mixed into one */
  if (item.kind === "place") return "tenths";                                  /* the place of the FIRST digit */
  const need = SIB_PLACES.indexOf(item.heard.place) + 1, part = String(item.heard.part);
  const short = need - part.length;
  /* the two errors the writeup names: too few places (the zero left out), and the zero hung on the RIGHT hand end.
     An amount whose heard digits already fill its places (26.45) misses by a zero hung on its end. */
  if (short > 0) return String(item.heard.whole) + "." + (item.wrongEnd ? part + new Array(short + 1).join("0") : part);
  return String(item.heard.whole) + "." + part + "0";
};

/* the forms of an answer that no question, hint or ladder line may print. A split's digits are the question's own
   number (45.317 holds 45 and 317), so its giveaway is naming a part's value in words */
const answerForms = (item: any) => {
  if (item.kind === "split") return item.answer.map((x: number) => words(x));
  if (item.kind === "side") return ["decimal part"];
  if (item.kind === "write") return [String(item.answer), speakable(item.answer)];
  return [String(item.answer)];
};

/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* what the answer slot shows: an answer made of the cards' words ("point and", "whole") reads word by word in Hindi
   and Gujarati; digits and English stay exactly as typed */
const SIB_SLOT_WORDS = ["seven tenths", "thousandths", "hundredths", "tenths", "decimal", "whole", "point", "seven", "and", "dot"];
const format = (v: any, _j?: any, o?: any) => {
  const s = String(v === null || v === undefined ? "" : v);
  if (!o || !o.lang || o.lang === "en" || !o.tx || !/[a-z]/.test(s)) return s;
  let rest = s.trim().toLowerCase();
  const out: string[] = [];
  while (rest) {
    const hit = SIB_SLOT_WORDS.find((w) => rest === w || rest.indexOf(w + " ") === 0);
    if (!hit) return s;
    out.push(o.tx(hit));
    rest = rest.slice(hit.length).trim();
  }
  return out.join(" ");
};

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (item.pad === "enter" && HOOK.set && HOOK.set(item.answer)) { if (HOOK.check) HOOK.check(); return; }
  return T.submit(item.answer);
};
/* the agent's answer(): a reading, a place name or a tapped half is made on the working area as a child would; a typed
   decimal keeps its point (toolApi.answer strips non-digits, so "7.085" would arrive as 7085) */
const answer = (item: any, v: any) => {
  if (item.kind === "write") { if (!HOOK.type) return undefined; HOOK.type(String(v === null || v === undefined ? "" : v)); return true; }
  if (item.pad === "enter") return HOOK.set ? HOOK.set(v) : undefined;
  return undefined;
};
/* the agent's check() before Enter: a made answer sends itself; undefined = press Enter (always in the demo stage) */
const check = () => (HOOK.check ? HOOK.check() : undefined);

const SIB_CSS = `
.sib-in{animation:sibIn 420ms ease-out both}
@keyframes sibIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.sib-slide{transition:transform 420ms ease}
@media (prefers-reduced-motion:reduce){.sib-in{animation:none}.sib-slide{transition:none}}
`;

/* parse a built reading ("point seven tenths") into the cards that make it, one a gap, longest card first */
const sibParse = (v: any, cards: string[], n: number) => {
  let rest = String(v === null || v === undefined ? "" : v).trim().toLowerCase();
  const out: string[] = [];
  const byLen = cards.slice().sort((a, b) => b.length - a.length);
  while (rest && out.length < n) {
    const hit = byLen.find((cd) => rest === cd || rest.indexOf(cd + " ") === 0);
    if (!hit) return null;
    out.push(hit);
    rest = rest.slice(hit.length).trim();
  }
  return rest || out.length !== n ? null : out;
};

/* ── the working area ────────────────────────────────────────────────────────────────────────
   Its size is `box` ({ w, h, open }): 1472 x 528 with the answer panel shut, 1086 x 528 with it open; everything is
   laid out from box.w. Every clickable piece carries a data-control and reports itself with api.did during a step. */
function Work({ phase, n, item, index, stage, wrong, typed, api, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  SIB_LANG = lang || "en";
  const tl = useTimeline();
  const tc = useTimeline();
  const Wd = box ? box.w : W.w;
  const Ht = box ? box.h : W.h;
  const cx = Wd / 2;
  const free = stage === "free", demo = stage === "demo";
  const done = stage === "win" || stage === "idle";
  /* in free play `item` is the last question of the last phase: read the stage first (PATTERNS §13) */
  const Q: any = free ? null : demo ? MODEL.warmUp[n] : item;
  const fam = free ? "free" : Q.kind;

  /* the picture's state, one per question (and one for the warm-up, one for free play): a ref, so the agent's
     answer() and check() read what they just set; a tick re-draws */
  const mode = free ? "free" : demo ? "demo" : "q";
  const qkey = n + ":" + index + ":" + mode;
  const R = useRef<any>({ key: null });
  if (R.current.key !== qkey) R.current = { key: qkey, fk: R.current.fk || 0, fills: [] };
  const S = R.current;
  const [, setTick] = useState(0);
  const put = (o: any) => { if (R.current.key !== qkey) return; Object.assign(R.current, o); setTick((t: number) => t + 1); };
  const num: string = free ? SIB_FREE[S.fk % SIB_FREE.length] : Q.num || "";

  /* ── the acts, one per control ── */
  const runCount = (s: string, after?: any) => {
    if (S.counting) return;
    const nr = sibCut(s).dec.length;
    put({ counting: true, countTo: 0 });
    const seq: any[] = [];
    for (let k = 1; k <= nr; k++) seq.push([420, () => { put({ countTo: k }); api.sfx.tick(); }]);
    tc.run([[120, () => {}], ...seq], () => { put({ counting: false }); if (after) after(); });
  };
  /* the gaps a reading waits for: phase 2's joining gaps, phase 3's last slot (the place name) */
  const placeLast = fam === "place" ? sibLane(num, "whole").length - 1 : -1;
  const holes = fam === "join" ? Q.holes : fam === "place" ? [{ lane: 0, slot: placeLast }] : [];
  /* a card goes to the gap the child picked (a tap on a gap picks it), else to the first empty gap */
  const fillNext = (cd: string) => {
    const f = (S.fills || []).slice();
    if (f.indexOf(cd) >= 0) return;
    let k = typeof S.sel === "number" && S.sel < holes.length ? S.sel : holes.findIndex((_h: any, j: number) => !f[j]);
    if (k < 0 && holes.length === 1) k = 0;      /* one slot: a new card takes the place of the old one */
    if (k < 0) return;
    f[k] = cd;
    put({ fills: f, sel: null, tbOn: false, acted: true });
    api.sfx.tick();
  };
  const doers: any = {
    cut: () => { if (free) { put({ cut: !S.cut, countTo: 0 }); api.sfx.cut(); return; } if (!S.cut) { put({ cut: true }); api.sfx.cut(); } },
    left: () => { if (!S.labL) { put({ labL: true }); api.sfx.tick(); } },
    right: () => { if (!S.labR) { put({ labR: true }); api.sfx.tick(); } },
    count: () => runCount(num),
    "last-digit": () => { if (!S.named) { put({ named: true }); api.sfx.settle(); } },
    "last-word": () => { if (!S.out) { put({ out: true }); api.sfx.tick(); } },
    "heard-digits": () => { if (S.out && !S.walked) { put({ walked: true }); api.sfx.settle(); } },
    "open-place": () => { if (S.walked && !S.zero) { put({ zero: true }); api.sfx.tick(); } },
    "new-number": () => { put({ fk: (S.fk || 0) + 1, cut: false, countTo: 0 }); tc.stop(); put({ counting: false }); api.sfx.tick(); },
    "half-left": () => { put({ pick: "left", tbOn: false, acted: true }); api.sfx.tick(); },
    "half-right": () => { put({ pick: "right", tbOn: false, acted: true }); api.sfx.tick(); },
  };
  if (fam === "join" || fam === "place") (Q.cards || []).forEach((cd: string) => { doers["card-" + cd.replace(/ /g, "-")] = () => fillNext(cd); });
  holes.forEach((_h: any, k: number) => {
    /* a tap on a gap picks it for the next card; a filled gap gives its card back as it is picked */
    doers["gap-" + (k + 1)] = () => {
      const f = (S.fills || []).slice();
      if (S.sel === k && !f[k]) { put({ sel: null }); return; }
      f[k] = null;
      put({ fills: f, sel: k, tbOn: false, acted: true });
      api.sfx.tick();
    };
  });
  /* a click on a control: in a guide step only the awaited act is done, and EVERY act is reported (a wrong one shows
     the step's hint); in a question the act is the child's own, never during a correction */
  const press = (name: string) => {
    if (demo) { if (name === stepOn && doers[name]) doers[name](); api.did(name); return; }
    if (S.busy) return;
    if (free || stage === "ask") { if (doers[name]) doers[name](); }
  };

  /* the answer made on the working area: a tapped half, or a built reading (null while a gap is empty) */
  const built = () => {
    if (fam === "side") return S.pick ? (S.pick === "right" ? "decimal" : "whole") : null;
    if (fam !== "join" && fam !== "place") return null;
    const f = S.fills || [];
    if (holes.some((_h: any, k: number) => !f[k])) return null;
    return holes.map((_h: any, k: number) => f[k]).join(" ");
  };
  const sendBuilt = () => {
    const v = built();
    if (S.busy) return;
    /* Enter before the answer is made: one short nudge on the bubble, nothing sent, no try taken */
    if (v === null) {
      if (fam === "side") api.say("Tap a part first.");
      else if (holes.length > 1) api.say("Fill both gaps.");
      else api.say("Fill the gap first.");
      return;
    }
    if (wrong && !S.acted) return;           /* the reading that just missed is never sent again unchanged */
    put({ acted: false });
    api.submit(v);
  };

  /* Enter: in a guide step it performs the current step; on an answer made on the working area it sends it; a typed
     answer goes through the runtime (null) */
  const madeHere = !free && !demo && Q.pad === "enter";
  api.onEnter(demo && stepOn ? () => press(stepOn) : madeHere && stage === "ask" ? sendBuilt : null);
  /* r24 (PATTERNS 9f): the Enter key in the bar blinks only while something is ready to send: a half picked, every gap
     filled; never during the correction, and never for the answer that just missed until the child changes it */
  const readyNow = madeHere && stage === "ask" && !S.busy && built() !== null && !(wrong && !S.acted);
  useEffect(() => { if (api.answerReady) api.answerReady(!!readyNow); }, [readyNow, qkey]);
  HOOK.type = (v: string) => api.setTyped(String(v));
  HOOK.set = (v: any) => {
    if (stage !== "ask" || !madeHere) return false;
    if (fam === "side") {
      const s = String(v === null || v === undefined ? "" : v).trim().toLowerCase();
      if (s !== "decimal" && s !== "whole") return false;
      put({ pick: s === "decimal" ? "right" : "left", tbOn: false, acted: true });
      return true;
    }
    const f = sibParse(v, Q.cards, holes.length);
    if (!f) return false;
    put({ fills: f, tbOn: false, acted: true });
    return true;
  };
  HOOK.check = () => {
    if (stage !== "ask" || !madeHere) return undefined;
    const v = built();
    if (v === null) return undefined;
    sendBuilt();
    return true;
  };

  /* the traceback: lock, redraw the maths in steps ending on the whole right answer, unlock; nothing is marked and
     the child's answer stays (a built reading stays in its gaps, under a correction that clears on the next act) */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    put({ busy: true, tbOn: true, tb: 0, acted: false, tbTyped: typed });
    api.lock(true);
    const end = () => { put({ busy: false }); api.lock(false); };
    const tbAt = (k: number) => () => { put({ tb: k }); api.sfx.tick(); };
    if (fam === "split") tl.run([[420, () => { put({ cut: true }); api.sfx.cut(); }], [700, tbAt(1)], [700, tbAt(2)], [700, tbAt(3)], [500, () => {}]], end);
    else if (fam === "side") tl.run([[300, () => {}], [700, tbAt(1)], [700, tbAt(2)], [500, () => {}]], end);
    else if (fam === "join") tl.run([[300, () => {}], ...holes.map((_h: any, k: number) => [650, tbAt(k + 1)]), [500, () => {}]], end);
    else if (fam === "place") {
      const nr = sibCut(num).dec.length;
      const seq: any[] = [[200, () => put({ countTo: 0, named: false })]];
      for (let k = 1; k <= nr; k++) seq.push([450, () => { put({ countTo: k }); api.sfx.tick(); }]);
      tl.run([...seq, [650, () => { put({ tb: 1 }); api.sfx.settle(); }], [500, () => {}]], end);
    } else if (fam === "write") tl.run([[300, () => {}], [650, tbAt(1)], [750, () => { put({ tb: 2 }); api.sfx.settle(); }], [750, tbAt(3)], [650, tbAt(4)], [400, () => {}]], end);
    else end();
  }, [wrong]);

  /* the win: the maths moves to its finished state; the win line is the tool's own (the last question of a phase
     gets the phase's closing line from the runtime instead) */
  useEffect(() => {
    if (stage !== "win" || free) return;
    put({ won: true, tbOn: false });
    if (fam === "place") runCount(num);
    switch (item.qid) {
      case "M1.S2.T4.C15:ML1": api.say("Whole ones stop at the dot."); break;
      case "M1.S2.T4.C15:1": api.say("Even one digit makes a part."); break;
      case "M1.S2.T4.C16:ML2": api.say("Two readings, one number."); break;
      case "M1.S2.T4.C16:3": api.say("Each digit is said on its own."); break;
      case "M1.S2.T4.C17:ML3": api.say("Three digits: thousandths."); break;
      case "M1.S2.T4.C17:5": api.say("Two digits: hundredths."); break;
      case "M1.S2.T4.C18:ML4": api.say("The zero holds the tenths."); break;
      case "M1.S2.T4.C18:7": api.say("Six lands in the hundredths."); break;
      default: break;
    }
  }, [stage]);

  /* what the host and the agent read back (toolApi.getState): only what the child has built, never the target */
  api.share({
    number: fam === "write" ? null : num, cut: !!S.cut, sentenceSlots: fam === "join" || fam === "place" ? (S.fills || []).slice() : null,
    halfTapped: fam === "side" ? S.pick || null : null,
    placesLaidOut: fam === "write" ? !!S.out : null, counted: S.countTo || 0,
    heardSentence: fam === "write" ? [Q.heard.whole, "and", Q.heard.part, Q.heard.place].join(" ") : null,
  });

  let invite: any = null;
  const out: any[] = [];

  /* ── phase 1: the bar, cut at the point, each half named ── */
  if (fam === "split" || fam === "side") {
    const side = fam === "side";
    const by = side ? 70 : 40;
    const tbk = S.tbOn ? S.tb || 0 : -1;
    const cutNow = side || !!S.cut || done;
    const K = sibCardFor(num, true, Wd - 48);
    const G = sibBarGeo(num, cutNow, cx, by, K);
    /* the split correction redraws the misconception first (tb 1: the digits with no dot), then the right answer (tb 2: the
       whole number part, tb 3: the decimal part) */
    const showL = side || !!S.labL || tbk >= 2 || done;
    const showR = side || !!S.labR || tbk >= 3 || done;
    const capL = demo ? !!S.labL : side ? tbk >= 1 || done : tbk >= 2 || done;
    const capR = demo ? !!S.labR : side ? tbk >= 1 || done : tbk >= 3 || done;
    const vals = !side && !demo && (tbk >= 1 || done);
    /* the side question asks for a name, so its labels stand blank until the correction or the win drops the names in */
    const named = !side || tbk >= 1 || done;
    const nmL = tx("whole number part"), nmR = tx("decimal part");
    /* blank labels are one width, so their size never tells which name goes where */
    const padL = lang === "hi" ? 72 : 48;      /* Devanagari ink runs nearer the pill's ends: more room in Hindi */
    const wl0 = sibTextW(nmL, SIB_WORD) + padL, wr0 = sibTextW(nmR, SIB_WORD) + padL;
    const wl = named ? wl0 : Math.max(wl0, wr0), wr = named ? wr0 : Math.max(wl0, wr0);
    let lc = G.leftC, rc = G.rightC;
    const need = (wl + wr) / 2 + 24;
    if (rc - lc < need) { const d = (need - (rc - lc)) / 2; lc -= d; rc += d; }
    /* the two names stand inside the working area, whatever its width */
    if (lc - wl / 2 < 12) { const d = 12 - (lc - wl / 2); lc += d; rc += d; }
    if (rc + wr / 2 > Wd - 12) { const d = rc + wr / 2 - (Wd - 12); lc -= d; rc -= d; }
    const ly = by + K.h + 28;
    out.push(<g key="bar">{sibBarDraw(G, { C })}</g>);
    const label = (on: boolean, x: number, w: number, nm: string, col: string, hx: number, cap: boolean, capTxt: string, val: any, k: string) => on && (
      <g key={k + (named ? "-n" : "-b")} pointerEvents="none" className="sib-in">
        <line x1={hx} y1={by + K.h + 12} x2={x} y2={ly} stroke={col} strokeWidth={4} />
        <rect x={x - w / 2} y={ly} width={w} height={60} rx={18} fill="#FFFFFF" stroke={col} strokeWidth={4} strokeDasharray={named ? undefined : "12 9"} />
        {named && <text x={x} y={ly + 30 + SIB_WORD * 0.36} textAnchor="middle" fontSize={SIB_WORD} fontWeight={700} fill={sibInk(col)}>{nm}</text>}
        {cap && <text x={x} y={ly + 104} textAnchor="middle" fontSize={SIB_SMALL} fontWeight={600} fill={C.ink}>{capTxt}</text>}
        {val !== null && (
          <g>
            <rect x={x - 96} y={ly + 120} width={192} height={80} rx={20} fill={sibFace(col)} stroke={col} strokeWidth={4} />
            <text x={x} y={ly + 160 + T.xl * 0.36} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={sibInk(col)}>{val}</text>
          </g>
        )}
      </g>
    );
    out.push(label(showL, lc, wl, nmL, SIB.whole, G.leftC, capL, tx("whole ones"), vals ? G.c.whole : null, "lab-l"));
    out.push(label(showR, rc, wr, nmR, SIB.dec, G.rightC, capR, tx("smaller than one"), vals ? G.c.dec : null, "lab-r"));
    /* the split correction first lays the same digits under the bar with no point at all (45317, no comma: as the child
       typed it), the number read straight through as one long number; it stays there to be read against the two parts */
    if (!side && tbk >= 1) {
      const flat = G.c.whole + G.c.dec, fw = sibTextW(flat, T.xl) + 64, fy = ly + 212;
      const lab = tx("without the dot"), labW = sibTextW(lab, SIB_SMALL), gw = labW + 20 + fw, gx = cx - gw / 2;
      out.push(
        <g key="flat" pointerEvents="none" className="sib-in">
          <text x={gx + labW} y={fy + 40 + SIB_SMALL * 0.36} textAnchor="end" fontSize={SIB_SMALL} fontWeight={600} fill={C.ink}>{lab}</text>
          <rect x={gx + labW + 20} y={fy} width={fw} height={80} rx={20} fill="#FFFFFF" stroke={C.rule} strokeWidth={4} />
          <text x={gx + labW + 20 + fw / 2} y={fy + 40 + T.xl * 0.36} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{flat}</text>
        </g>
      );
    }
    /* the side question: the half the child tapped is ringed (its own pick, hidden while the correction stands) */
    const ringHalf = (h: string, k: string) => (h === "left"
      ? <rect key={k} x={G.lx(0) - 10} y={by - 10} width={G.lw + 20} height={K.h + 20} rx={24} fill="none" stroke={shade(SIB.mark, 0.1)} strokeWidth={6} pointerEvents="none" />
      : <rect key={k} x={G.rx(0) - 10} y={by - 10} width={G.rw + 20} height={K.h + 20} rx={24} fill="none" stroke={shade(SIB.mark, 0.1)} strokeWidth={6} pointerEvents="none" />);
    if (side && S.pick && !S.tbOn && !done) out.push(ringHalf(S.pick, "pick"));
    /* the side correction: the half that counts pieces smaller than one is ringed, and one whole is drawn beside the
       part of one it makes */
    if (side && (tbk >= 2 || done)) {
      const frac = Number("0." + G.c.dec);
      const sw = 300, sx = Math.max(12, Math.min(Wd - 12 - sw, rc - sw / 2)), sy = ly + 124;
      out.push(ringHalf("right", "ring-r"));
      out.push(
        <g key="strip" pointerEvents="none" className="sib-in">
          <rect x={sx} y={sy} width={sw} height={52} rx={12} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} />
          <rect x={sx} y={sy} width={sw * frac} height={52} rx={12} fill={SIB.dec} fillOpacity={0.75} />
          <text x={sx + sw / 2} y={sy + 96} textAnchor="middle" fontSize={SIB_SMALL} fontWeight={600} fill={C.ink}>{tx("one whole")}</text>
        </g>
      );
    }
    if (side && stage === "ask") {
      const lx0 = G.lx(0) - 8, lx1 = G.pc - 10, rx0 = G.pc + 10, rx1 = G.rx(G.nr - 1) + K.w + 8;
      out.push(<Hit key="h-hl" id="half-left" label="The part before the dot" x={lx0} y={by - 12} w={Math.max(72, lx1 - lx0)} h={K.h + 24} onPress={() => press("half-left")} />);
      out.push(<Hit key="h-hr" id="half-right" label="The part after the dot" x={rx0} y={by - 12} w={Math.max(72, rx1 - rx0)} h={K.h + 24} onPress={() => press("half-right")} />);
      /* the one invite: the runtime's pulse on a box round the whole bar, until a half is tapped */
      if (!S.pick && !S.tbOn) {
        const a = G.lx(0) - 20, b = G.rx(G.nr - 1) + K.w + 20;
        invite = { rect: [a, by - 20, b - a, K.h + 40] };
      }
    }
    /* controls: the dot cuts the bar (a question's warm act, and the first step); in the steps each half names itself */
    if (!cutNow && (demo || stage === "ask")) out.push(<Hit key="h-cut" id="cut" label="Cut the number at the dot" x={G.pc - 36} y={by - 12} w={72} h={K.h + 24} onPress={() => press("cut")} />);
    if (demo) {
      const lx0 = G.lx(0) - 6, lx1 = G.pc - 36, rx0 = G.pc + 36, rx1 = G.rx(G.nr - 1) + K.w + 6;
      if (!S.labL) out.push(<Hit key="h-left" id="left" label="The digits before the dot" x={Math.min(lx0, lx1 - 72)} y={by - 12} w={Math.max(72, lx1 - lx0)} h={K.h + 24} onPress={() => press("left")} />);
      if (!S.labR) out.push(<Hit key="h-right" id="right" label="The digits after the dot" x={rx0} y={by - 12} w={Math.max(72, rx1 - rx0)} h={K.h + 24} onPress={() => press("right")} />);
      if (stepOn === "cut") invite = { x: G.pc, y: by + K.h / 2, r: 40 };
      if (stepOn === "left") invite = { rect: [G.lx(0) - 16, by - 16, G.lw + 32, K.h + 32] };
      if (stepOn === "right") invite = { rect: [G.rx(0) - 16, by - 16, G.rw + 32, K.h + 32] };
    }
  }

  /* ── phase 2: the readings, each a row of slots under the bar, gaps filled from the word cards ── */
  /* a row of sentence slots, laid out by sibLaneLay (`lay`: xs, ws, z, two), with its name to the left when it has one */
  const laneRow = (words: string[], y: number, lay: any, label: string, gapAt: any, k: string) => (
    <g key={k}>
      {label && <text x={lay.xs[0] - 18} y={y + SIB_SLOT_H / 2 + SIB_SMALL * 0.36} textAnchor="end" fontSize={SIB_SMALL} fontWeight={600} fill={C.ink} pointerEvents="none">{label}</text>}
      {words.map((wd: string, s: number) => {
        const g = gapAt ? gapAt(s) : null;
        const sx = lay.xs[s], sw = lay.ws[s], two = lay.two[s];
        if (g) {
          const shown = g.word;
          return (
            <g key={s} pointerEvents="none">
              <rect x={sx} y={y} width={sw} height={SIB_SLOT_H} rx={18} fill={g.lit ? sibFace(SIB.mark) : shown ? "#FFFFFF" : g.sel ? tint(SIB.mark, 0.8) : tint(C.panel, 0.5)}
                stroke={g.lit || g.sel ? shade(SIB.mark, 0.1) : shown ? C.ink : C.rule} strokeWidth={g.lit || g.sel ? 5 : 3} strokeDasharray={shown ? undefined : "12 9"} />
              {shown && sibText(shown, sx + sw / 2, y + SIB_SLOT_H / 2, lay.z, two, g.lit ? shade(SIB.mark, 0.55) : C.ink, 700)}
            </g>
          );
        }
        return (
          <g key={s} pointerEvents="none">
            <rect x={sx} y={y} width={sw} height={SIB_SLOT_H} rx={18} fill="#FFFFFF" stroke={C.rule} strokeWidth={3} />
            {sibText(wd, sx + sw / 2, y + SIB_SLOT_H / 2, lay.z, two, C.ink)}
          </g>
        );
      })}
    </g>
  );

  /* every gap is a control: a tap picks it for the next card, and a filled gap gives its card back as it is picked */
  const gapHits = (lay: any, y: number, li: number) => holes.forEach((h: any, hk: number) => {
    if (h.lane !== li || done) return;
    if (!(demo || stage === "ask")) return;
    const full = !!(S.fills || [])[hk];
    out.push(<Hit key={"h-gap" + hk} id={"gap-" + (hk + 1)} label={(full ? "Take the card out of gap " : "Choose gap ") + (hk + 1)} x={lay.xs[h.slot]} y={y} w={lay.ws[h.slot]} h={SIB_SLOT_H} onPress={() => press("gap-" + (hk + 1))} />);
  });
  /* the word cards (phase 2) or the place names (phase 3): a tap puts the card in the picked gap, else the next empty one;
     the biggest type that lets the row stand inside the working area */
  const tray = (cards: string[], ty: number) => {
    const gap = 28;
    let z = SIB_WORD;
    const widths = (zz: number) => cards.map((cd: string) => Math.max(150, sibTextW(tx(cd), zz) + 56));
    while (z > T.micro && widths(z).reduce((a: number, b: number) => a + b, 0) + (cards.length - 1) * gap > Wd - 48) z -= 4;
    const cw = widths(z);
    const tot = cw.reduce((a: number, b: number) => a + b, 0) + (cards.length - 1) * gap;
    let x = cx - tot / 2;
    cards.forEach((cd: string, k: number) => {
      const used = (S.fills || []).indexOf(cd) >= 0;
      const id = "card-" + cd.replace(/ /g, "-");
      const w = cw[k], cx0 = x;
      out.push(
        <g key={"c" + k} pointerEvents="none">
          <rect x={cx0} y={ty} width={w} height={88} rx={20} fill={used ? "none" : "#FFFFFF"} stroke={used ? C.rule : shade(C.accent, 0.1)}
            strokeWidth={used ? 3 : 4} strokeDasharray={used ? "12 9" : undefined} />
          {!used && <rect x={cx0 + 4} y={ty + 81} width={w - 8} height={7} rx={3.5} fill={tint(C.accent, 0.5)} />}
          {!used && <text x={cx0 + w / 2} y={ty + 44 + z * 0.36} textAnchor="middle" fontSize={z} fontWeight={700} fill={C.ink}>{tx(cd)}</text>}
        </g>
      );
      if (!used && !done && (demo || stage === "ask")) out.push(<Hit key={"h-c" + k} id={id} label={"Put " + cd + " in the next gap"} x={cx0} y={ty} w={w} h={88} onPress={() => press(id)} />);
      if (demo && stepOn === id) invite = { rect: [cx0 - 12, ty - 12, w + 24, 112] };
      x += w + gap;
    });
  };

  if (fam === "join") {
    const K = sibCardFor(num, true, Wd - 48);
    const G = sibBarGeo(num, true, cx, 18, K);
    out.push(<g key="bar">{sibBarDraw(G, { C })}</g>);
    const lanes: number[] = Q.lanes;
    const ys = lanes.length > 1 ? [182, 296] : [214];
    /* the readings share their columns, so eight stands over eight and gap over gap; a reading's name stands to its left */
    const labW = Math.max(sibTextW(tx("proper"), SIB_SMALL), sibTextW(tx("everyday"), SIB_SMALL)) + 18;
    const lx = 24 + labW, lw = Wd - lx - 24;
    const rows = lanes.map((li: number) => sibLane(num, Q.reads[li], lang, tx));
    const nCols = Math.max(...rows.map((r: string[]) => r.length));
    const cols: string[][] = Array.from({ length: nCols }, (_x: any, s: number) => {
      const c: string[] = rows.map((r: string[]) => r[s]).filter((x: any) => !!x);
      holes.forEach((h: any) => { if (h.slot === s) { c.push(tx(sibExpect(Q, h))); (Q.cards || []).forEach((cd: string) => c.push(tx(cd))); } });
      return c;
    });
    const lay = sibLaneLay(cols, lx, lw);
    const tbk = S.tbOn ? S.tb || 0 : 0;
    lanes.forEach((li: number, row: number) => {
      const read = Q.reads[li];
      const gapAt = (s: number) => {
        const hk = holes.findIndex((h: any) => h.lane === li && h.slot === s);
        if (hk < 0) return null;
        if (S.tbOn && tbk > hk) return { word: tx(sibExpect(Q, holes[hk])), lit: true };
        const f = (S.fills || [])[hk];
        return { word: f ? tx(f) : null, lit: done && !!f, sel: !demo && S.sel === hk && !f };
      };
      out.push(laneRow(rows[row], ys[row], lay, read === "single" ? tx("everyday") : tx("proper"), gapAt, "lane" + li));
      gapHits(lay, ys[row], li);
    });
    tray(Q.cards, lanes.length > 1 ? 416 : 352);
  }

  /* ── phase 3: the reading built up to its last word; Count runs from the point outwards; a place name from the
     tray ends it ── */
  if (fam === "place") {
    /* the bar and the Count key stand side by side, the pair centred */
    const kw = 210, kh = 100;
    const K = sibCardFor(num, false, Wd - 48 - 32 - kw);
    const G0 = sibBarGeo(num, false, 0, 0, K), barW = G0.rx0 + G0.rw - G0.x0 + 32;
    const bcx = cx - (32 + kw) / 2;
    const G = sibBarGeo(num, false, bcx, 80, K);
    const kx = bcx + barW / 2 + 32, ky = G.y + (K.h - kh) / 2;
    const tbk = S.tbOn ? S.tb || 0 : 0;
    const wds = sibLane(num, "whole", lang, tx);
    /* the last slot: the warm-up's own name (its second step), the correction's, or the child's card */
    const f0 = (S.fills || [])[0];
    const slotWord = demo ? (S.named ? wds[placeLast] : null) : tbk >= 1 ? wds[placeLast] : f0 ? tx(f0) : null;
    const slotLit = demo ? !!S.named : tbk >= 1 || (done && !!f0);
    out.push(<g key="bar">{sibBarDraw(G, { C, countTo: S.countTo || 0, ringLast: slotLit })}</g>);
    const ly = 252;
    /* the last column holds any place name; a reading of fewer words (0.608 has no whole part to read) stands centred */
    const cols: string[][] = wds.slice(0, placeLast).map((w: string) => [w]).concat([[wds[placeLast], ...(Q.cards || []).map((cd: string) => tx(cd))]]);
    const lay = sibLaneLay(cols, 24, Wd - 48);
    const slotSel = !demo && S.sel === 0 && !f0;
    out.push(laneRow(wds.slice(0, placeLast).concat([""]), ly, lay, "", (s: number) => (s === placeLast ? { word: slotWord, lit: slotLit, sel: slotSel } : null), "lane"));
    gapHits(lay, ly, 0);
    out.push(<Key key="k-count" id="count" label={tx("Count")} x={kx} y={ky} w={kw} h={kh} C={C} onClick={() => press("count")}>
      <text y={SIB_WORD * 0.36} textAnchor="middle" fontSize={SIB_WORD} fontWeight={700} fill={C.ink}>{tx("Count")}</text>
    </Key>);
    tray(Q.cards, 380);
    if (demo) {
      G.c.dec.split("").forEach((_d: string, k: number) => {
        const id = k === G.nr - 1 ? "last-digit" : "dec-digit-" + (k + 1);
        out.push(<Hit key={"h-d" + k} id={id} label={"Digit " + (k + 1) + " after the dot"} x={G.rx(k) - 4} y={G.y - 4} w={K.w + 8} h={K.h + 8} onPress={() => press(id)} />);
      });
      if (stepOn === "count") invite = { rect: [kx - 14, ky - 14, kw + 28, kh + 28] };
      if (stepOn === "last-digit") invite = { rect: [G.rx(G.nr - 1) - 12, G.y - 8, K.w + 24, K.h + 16] };
    }
  }

  /* ── phase 4: the heard sentence in the bay; the places its last word asks for, filled from the left ── */
  if (fam === "write") {
    const hd = Q.heard;
    const need = SIB_PLACES.indexOf(hd.place) + 1;
    const part = String(hd.part);
    const pad = new Array(Math.max(0, need - part.length) + 1).join("0");
    const tbk = S.tbOn && typed === S.tbTyped ? S.tb || 0 : -1;
    /* what the row shows: the warm-up's acts, the correction, the win, or the child's own typing */
    let whole = "", cells: any[] = [], arrow = false, readout: any = null;
    if (demo) {
      if (S.out) { whole = String(hd.whole); cells = Array.from({ length: need }, () => ({ d: null })); }
      if (S.walked) cells = cells.map((c: any, k: number) => (k >= need - part.length ? { d: part[k - (need - part.length)] } : c));
      if (S.zero) cells = cells.map((c: any) => (c.d === null ? { d: "0", grey: true } : c));
    } else if (tbk >= 0 || done) {
      const t = done ? 9 : tbk;
      whole = String(hd.whole);
      if (t >= 1) cells = Array.from({ length: need }, () => ({ d: null }));
      if (t >= 2) cells = cells.map((c: any, k: number) => (k >= need - part.length ? { d: part[k - (need - part.length)], lit: !done } : c));
      if (t >= 3) { cells = cells.map((c: any) => (c.d === null ? { d: "0", grey: true } : c)); arrow = pad.length > 0; }
      if (t >= 4) readout = item.answer;
    } else {
      const tc0 = sibCut(typed || "");
      whole = String(typed || "").indexOf(".") >= 0 || typed ? tc0.whole : "";
      const td = tc0.dec;
      const nCells = Math.max(S.out ? need : 0, td.length);
      cells = Array.from({ length: nCells }, (_x: any, k: number) => ({ d: k < td.length ? td[k] : null }));
    }
    /* the row: the whole part, the point and the places, at the biggest card that lets it stand in the room there is */
    const nw = Math.max(1, whole.length);
    const K = sibCardFor("0".repeat(nw) + "." + "0".repeat(Math.max(1, cells.length)), false, Wd - 48);
    const ry = 24, step = K.w + K.gap;
    const lw = nw * K.w + (nw - 1) * K.gap;
    const rw = cells.length ? cells.length * K.w + (cells.length - 1) * K.gap : 0;
    const total = lw + 2 * SIB_PT.gap + SIB_PT.w + rw;
    const x0 = cx - total / 2, pc = x0 + lw + SIB_PT.gap + SIB_PT.w / 2, rx0 = pc + SIB_PT.w / 2 + SIB_PT.gap;
    out.push(
      <g key="row" pointerEvents="none">
        <rect x={x0 - 16} y={ry - 10} width={total + 32} height={K.h + 20} rx={22} fill={SIB_PLATE} stroke={C.rule} strokeWidth={2} />
        {whole
          ? whole.split("").map((d: string, k: number) => sibDigit(x0 + k * step, ry, d, SIB.whole, "w" + k, { K }))
          : <rect x={x0} y={ry} width={K.w} height={K.h} rx={16} fill="#FFFFFF" stroke={SIB.whole} strokeWidth={4} strokeDasharray="12 9" />}
        <rect x={pc - 4} y={ry - 4} width={8} height={K.h + 8} rx={4} fill={SIB.point} />
        <circle cx={pc} cy={ry + K.h * 0.62} r={14} fill={SIB.point} stroke="#FFFFFF" strokeWidth={3} />
        {cells.map((c: any, k: number) => (c.d === null
          ? <rect key={"e" + k} x={rx0 + k * step} y={ry} width={K.w} height={K.h} rx={16} fill="#FFFFFF" stroke={SIB.dec} strokeWidth={4} strokeDasharray="12 9" />
          : sibDigit(rx0 + k * step, ry, c.d, SIB.dec, "c" + k, { K, grey: c.grey, lit: c.lit })))}
        {arrow && (
          <g>
            <line x1={pc} y1={ry + K.h + 24} x2={rx0 + K.w / 2 - 16} y2={ry + K.h + 24} stroke={shade(SIB.mark, 0.35)} strokeWidth={5} strokeLinecap="round" />
            <path d={`M ${rx0 + K.w / 2 - 2} ${ry + K.h + 24} l -18 -11 v 22 z`} fill={shade(SIB.mark, 0.35)} />
          </g>
        )}
        {readout && <text x={cx} y={ry + K.h + 108} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>{readout}</text>}
      </g>
    );
    /* the hearing bay: the sentence as it was heard, its last word lit */
    const wds = [wordsIn(hd.whole, lang), tx("and"), wordsIn(hd.part, lang), tx(hd.place)];
    const lay = sibLaneLay(wds.map((w: string) => [w]), 40, Wd - 80);
    const by = 312;
    const bx0 = lay.xs[0] - 16, bx1 = lay.xs[3] + lay.ws[3] + 16;
    out.push(
      <g key="bay" pointerEvents="none">
        <rect x={bx0} y={by - 16} width={bx1 - bx0} height={SIB_SLOT_H + 32} rx={24} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={2} />
        {wds.map((wd: string, s: number) => (
          <g key={s}>
            <rect x={lay.xs[s]} y={by} width={lay.ws[s]} height={SIB_SLOT_H} rx={18} fill={s === 3 ? sibFace(SIB.mark) : "#FFFFFF"}
              stroke={s === 3 ? shade(SIB.mark, 0.1) : C.rule} strokeWidth={s === 3 ? 5 : 3} />
            {sibText(wd, lay.xs[s] + lay.ws[s] / 2, by + SIB_SLOT_H / 2, lay.z, lay.two[s], s === 3 ? shade(SIB.mark, 0.55) : C.ink, s === 3 ? 700 : 600)}
          </g>
        ))}
      </g>
    );
    if ((demo || stage === "ask") && !S.out) out.push(<Hit key="h-last" id="last-word" label="The last word of the sentence" x={lay.xs[3]} y={by} w={lay.ws[3]} h={SIB_SLOT_H} onPress={() => press("last-word")} />);
    if (demo) {
      if (!S.walked) out.push(<Hit key="h-heard" id="heard-digits" label="The digits heard after the and" x={lay.xs[2]} y={by} w={lay.ws[2]} h={SIB_SLOT_H} onPress={() => press("heard-digits")} />);
      const openK = cells.findIndex((c: any) => c.d === null);
      if (S.walked && !S.zero && openK >= 0) out.push(<Hit key="h-open" id="open-place" label="The place still open" x={rx0 + openK * step} y={ry} w={K.w} h={K.h} onPress={() => press("open-place")} />);
      if (stepOn === "last-word") invite = { rect: [lay.xs[3] - 10, by - 10, lay.ws[3] + 20, SIB_SLOT_H + 20] };
      if (stepOn === "heard-digits") invite = { rect: [lay.xs[2] - 10, by - 10, lay.ws[2] + 20, SIB_SLOT_H + 20] };
      if (stepOn === "open-place" && openK >= 0) invite = { rect: [rx0 + openK * step - 10, ry - 8, K.w + 20, K.h + 16] };
    }
  }

  /* ── free play: any number on the bar, cut or whole, counted, both readings standing under it ── */
  if (fam === "free") {
    const K = sibCardFor(num, true, Wd - 48);
    const G = sibBarGeo(num, !!S.cut, cx, 76, K);
    out.push(<g key="bar">{sibBarDraw(G, { C, countTo: S.countTo || 0 })}</g>);
    out.push(<Hit key="h-cut" id="cut" label={S.cut ? "Close the bar at the dot" : "Cut the number at the dot"} x={G.pc - 36} y={G.y - 12} w={72} h={K.h + 24} onPress={() => press("cut")} />);
    const labW = Math.max(sibTextW(tx("proper"), SIB_SMALL), sibTextW(tx("everyday"), SIB_SMALL)) + 18;
    const lx = 24 + labW, lw = Wd - lx - 24;
    const counted = (S.countTo || 0) >= G.nr && !S.counting && G.nr > 0;
    const pw = sibLane(num, "whole", lang, tx), ew = sibLane(num, "single", lang, tx);
    const layP = sibLaneLay(pw.map((w: string) => [w]), lx, lw), layE = sibLaneLay(ew.map((w: string) => [w]), lx, lw);
    out.push(laneRow(pw.slice(0, pw.length - 1).concat([""]), 232, layP, tx("proper"), (s: number) => (s === pw.length - 1 ? { word: pw[pw.length - 1], lit: counted } : null), "free-p"));
    out.push(laneRow(ew, 344, layE, tx("everyday"), null, "free-e"));
    out.push(<Key key="k-new" id="new-number" label={tx("New number")} x={cx - 320} y={454} w={300} h={72} C={C} onClick={() => press("new-number")}>
      <text y={SIB_WORD * 0.36} textAnchor="middle" fontSize={SIB_WORD} fontWeight={700} fill={C.ink}>{tx("New number")}</text>
    </Key>);
    out.push(<Key key="k-count" id="count" label={tx("Count")} x={cx + 20} y={454} w={300} h={72} C={C} onClick={() => press("count")}>
      <text y={SIB_WORD * 0.36} textAnchor="middle" fontSize={SIB_WORD} fontWeight={700} fill={C.ink}>{tx("Count")}</text>
    </Key>);
  }

  /* the one invite: the runtime's ring on a small target, its pulse on a box round a wide one (kept inside the area) */
  const pulse = invite && invite.rect ? (() => {
    const [x, y, w, h] = invite.rect;
    const x0 = Math.max(4, x), y0 = Math.max(4, y), x1 = Math.min(Wd - 4, x + w), y1 = Math.min(Ht - 4, y + h);
    return sibPulse(x0, y0, x1 - x0, y1 - y0, C);
  })() : null;
  return (
    <g>
      <style>{SIB_CSS}</style>
      {out}
      {pulse}
      {invite && !invite.rect && <Invite x={invite.x} y={invite.y} r={Math.max(36, Math.min(invite.r, invite.y - 6, Ht - invite.y - 6, invite.x - 6, Wd - invite.x - 6))} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ n, result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  /* result.last.item is the question's INDEX in its phase (BUILD_CARD §4): the question itself is PHASES[n - 1].items[item] */
  const ph: any = PHASES[(n || 1) - 1] || {};
  const it: any = (typeof last.item === "number" ? (ph.items || [])[last.item] : last.item) || {};
  const kind = it.kind || last.kind;
  const ans = it.answer !== undefined ? it.answer : last.answer;
  let num = String(it.num || (last.shared && last.shared.number) || ""), note = "";
  if (kind === "split" && Array.isArray(ans)) { num = ans[0] + "." + ans[1]; note = ans[0] + " | " + ans[1]; }
  else if (kind === "side") note = tx("decimal part");
  else if (kind === "join") note = String(ans).split(" ").map((x: string) => tx(x)).join(" · ");
  else if (kind === "place") note = tx(String(ans));
  else if (kind === "write") { num = String(ans); note = ""; }
  const c = sibCut(num);
  const y1 = note ? h / 2 - 4 : h / 2 + 12;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <text x={w / 2} y={y1} textAnchor="middle" fontSize={T.label} fontWeight={700}>
        <tspan fill={sibInk(SIB.whole)}>{c.whole}</tspan>
        <tspan fill={shade(SIB.point, 0.2)}>.</tspan>
        <tspan fill={sibInk(SIB.dec)}>{c.dec}</tspan>
      </text>
      {note && <text x={w / 2} y={y1 + 34} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{note}</text>}
    </g>
  );
}

function SayItBar(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null,
      /* a decimal is typed with the pad's point key, on every question so the pad's shape never hints */
      pointKey: true,
      /* the board layout (LAYOUT.md §1b): the question and an Answer key on a bar across the top, the working area the
         whole card until the child taps Answer, the answer box and keypad in a panel that slides in from the right */
      board: true,
      bigPad: true,   /* r26: this picture is small, so the keypad panel takes the room beside it (the owner, 2026-10-14) */
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself; after a right answer the win picture waits for the
         child's tap on the blinking Next key */
      nextKey: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key (above) */
      StartArt, START_HOOK,
      }} />
  );
}

export default SayItBar;
