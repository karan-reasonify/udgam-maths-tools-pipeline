/* ═══ M1.S2.T4.C12.2D1 · say_it_bar · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "say_it_bar";
const MEDIA_ID = "M1.S2.T4.C12.2D1";
const TOOL_NAME = "Say It Bar";
const CHROME = { dim: "#9AA4AC", ink: "#2B2B2B", rule: "#C9BCA6", panel: "#F2E4CE", paper: "#FFFDF7", accent: "#5B6770" };
const VOICE = { rate: 0.92, pitch: 1.06 };

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A number along a bar, with a dot standing in the middle of it. Cut it there."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every sentence built to its last word, and every last word doing a job.";
/* said when the child opens Free play from the summary page */
const FREE_LINE = "Free play. Any number on the bar, both readings, and say it as often as you like.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r21: lineFor(line, lang, TR)); the English
   above and below stays what the checks read. Terms follow NCERT class 4: दशमलव / દશાંશ (decimal), दशमलव बिंदु /
   દશાંશ ચિહ્ન (the point), the dot in prose बिंदु / ટપકું, दसवाँ भाग / દશમો ભાગ, सौवाँ भाग / સોમો ભાગ,
   हज़ारवाँ भाग / હજારમો ભાગ, पूर्ण / પૂર્ણ for the reading word "and". Digits stay digits (the runtime speaks
   them in the language in use); number words are spelled in the language. A first draft that wants a native read. */
const TR: any = {
  hi: {
    "Say It Bar": "पट्टी पर बोलो",
    "A number along a bar, with a dot standing in the middle of it. Cut it there.": "पट्टी पर एक संख्या है, और उसके बीच में एक बिंदु खड़ा है। उसे वहीं से काटो।",
    "Every sentence built to its last word, and every last word doing a job.": "हर वाक्य अपने आखिरी शब्द तक बना, और हर आखिरी शब्द का अपना काम है।",
    "Free play. Any number on the bar, both readings, and say it as often as you like.": "मुक्त खेल। पट्टी पर कोई भी संख्या, दोनों तरह से पढ़ना, और जितनी बार चाहो बोलो।",
    /* phase 1 */
    "The point divides the number in two": "बिंदु संख्या को दो भागों में बाँटता है",
    "Cut it where the dot is. What is each side counting?": "जहाँ बिंदु है, वहाँ से काटो। हर तरफ़ क्या गिन रहा है?",
    "Which side of it counts whole ones?": "किस तरफ़ पूर्ण इकाइयाँ गिनी जाती हैं?",
    "Read the digits before the dot as a number of their own.": "बिंदु से पहले के अंकों को एक अलग संख्या की तरह पढ़ो।",
    "A decimal has two parts, split by the point. The whole number part is on the left and the decimal part on the right.": "दशमलव के दो भाग होते हैं, जिन्हें दशमलव बिंदु बाँटता है। पूर्ण संख्या का भाग बाईं ओर और दशमलव भाग दाईं ओर होता है।",
    "You learned: the point splits a decimal into two parts.": "तुमने सीखा: दशमलव बिंदु दशमलव को दो भागों में बाँटता है।",
    "Here is a decimal on the bar. Open it at the point, then drop a label under each half.": "पट्टी पर यह एक दशमलव है। इसे बिंदु पर खोलो, फिर हर आधे के नीचे एक लेबल रखो।",
    "Label each half": "हर आधे को नाम दो",
    "Where is the dot in this number?": "इस संख्या में बिंदु कहाँ है?",
    "A new number, with just one digit after the dot. Name its two parts.": "एक नई संख्या, जिसमें बिंदु के बाद सिर्फ़ एक अंक है। इसके दोनों भागों के नाम बताओ।",
    "Name both parts": "दोनों भागों के नाम बताओ",
    "Say it out loud. Where do the whole ones stop?": "इसे ज़ोर से बोलो। पूर्ण इकाइयाँ कहाँ खत्म होती हैं?",
    "Which part of a decimal counts pieces smaller than one? Tap that half.": "दशमलव का कौन सा भाग एक से छोटे टुकड़े गिनता है? उस आधे पर टैप करो।",
    "Tap that half": "उस आधे पर टैप करो",
    "The dot is the edge of one whole. Which side of the edge is smaller?": "बिंदु एक पूर्ण का किनारा है। किनारे की किस तरफ़ छोटा भाग है?",
    /* phase 2 */
    "Saying the point out loud": "बिंदु को बोलकर पढ़ना",
    "What word goes where the dot is? Now try the everyday way.": "बिंदु की जगह कौन सा शब्द आता है? अब रोज़ के तरीके से बोलकर देखो।",
    "Which reading does that word belong to?": "वह शब्द किस पढ़ने के तरीके का है?",
    "One reading names the place at the end. The other never does.": "एक तरीके में आखिर में स्थान का नाम आता है। दूसरे में कभी नहीं।",
    "The word and stands for the point in the proper reading. The word point stands for it in the everyday one.": "सही तरीके में बिंदु की जगह पूर्ण शब्द आता है। रोज़ के तरीके में उसकी जगह दशमलव शब्द आता है।",
    "You learned: the point is said as and, or as point.": "तुमने सीखा: बिंदु को पूर्ण या दशमलव कहकर पढ़ते हैं।",
    "Read the number on the bar the proper way, then the everyday way. Fill both joining slots.": "पट्टी की संख्या पहले सही तरीके से पढ़ो, फिर रोज़ के तरीके से। जोड़ने वाली दोनों जगहें भरो।",
    "Fill both gaps": "दोनों खाली जगहें भरो",
    "Which word is standing in the joining slot?": "जोड़ने वाली जगह में कौन सा शब्द है?",
    "Now a shorter number. Say it the everyday way, all the way through.": "अब एक छोटी संख्या। इसे रोज़ के तरीके से पूरा बोलो।",
    "Build the reading": "पढ़ने का वाक्य बनाओ",
    "Half of one reading and half of the other is not a reading.": "एक तरीके का आधा और दूसरे का आधा मिलकर पढ़ना नहीं बनता।",
    "One slot is empty in the proper reading. Which word fills it?": "सही तरीके में एक जगह खाली है। उसे कौन सा शब्द भरता है?",
    "Fill the gap": "खाली जगह भरो",
    "Read the whole sentence out with your word in it.": "अपने शब्द के साथ पूरा वाक्य बोलकर पढ़ो।",
    /* phase 3 */
    "Naming the last digit's place": "आखिरी अंक के स्थान का नाम बताना",
    "Count what is after the dot. Which place does the last one sit in?": "बिंदु के बाद के अंक गिनो। आखिरी अंक किस स्थान में है?",
    "Which of them is the last one?": "उनमें से आखिरी अंक कौन सा है?",
    "Tap count the places and watch where the counting stops.": "स्थान गिनो पर टैप करो और देखो कि गिनती कहाँ रुकती है।",
    "The last word of the sentence names the place the last digit sits in.": "वाक्य का आखिरी शब्द उस स्थान का नाम बताता है जिसमें आखिरी अंक है।",
    "You learned: the sentence ends on the place of the last digit.": "तुमने सीखा: वाक्य आखिरी अंक के स्थान के नाम पर खत्म होता है।",
    "This sentence is built but for its last word. Give me that word.": "इस वाक्य में सिर्फ़ आखिरी शब्द बाकी है। वह शब्द बताओ।",
    "Pick the last word": "आखिरी शब्द चुनो",
    "How many digits are after the dot?": "बिंदु के बाद कितने अंक हैं?",
    "Now a different number. Which word ends its sentence?": "अब एक दूसरी संख्या। उसका वाक्य किस शब्द पर खत्म होता है?",
    "End the sentence": "वाक्य पूरा करो",
    "Run the count again, from the dot outwards.": "गिनती फिर से करो, बिंदु से बाहर की ओर।",
    "This one has nothing but a zero in front of the point. Finish its sentence.": "इसमें बिंदु के आगे सिर्फ़ शून्य है। इसका वाक्य पूरा करो।",
    "Name that place": "उस स्थान का नाम बताओ",
    "The last digit is the one furthest from the dot.": "आखिरी अंक वह है जो बिंदु से सबसे दूर है।",
    /* phase 4 */
    "Writing one down from what you hear": "जो सुनो, उसे लिखना",
    "The last word tells you how many places. Fill them in from the left.": "आखिरी शब्द बताता है कि कितने स्थान हैं। उन्हें बाईं ओर से भरो।",
    "How many places does that word ask for?": "वह शब्द कितने स्थान माँगता है?",
    "Lay the digits in from the left, and see which place stays empty.": "अंकों को बाईं ओर से रखो, और देखो कौन सा स्थान खाली रहता है।",
    "The place name at the end says how many digits the decimal part must have.": "आखिर का स्थान-नाम बताता है कि दशमलव भाग में कितने अंक होने चाहिए।",
    "You learned: the place name says how many decimal places to write.": "तुमने सीखा: स्थान का नाम बताता है कि दशमलव के कितने स्थान लिखने हैं।",
    "Write seven and eighty-five thousandths as a decimal.": "सात पूर्ण पचासी हज़ारवाँ भाग को दशमलव में लिखो।",
    "Write the number": "संख्या लिखो",
    "What is the last word of the sentence?": "वाक्य का आखिरी शब्द क्या है?",
    "Now forty-one and six hundredths. Write that one down.": "अब इकतालीस पूर्ण छह सौवाँ भाग। इसे लिखो।",
    "Write it down": "इसे लिखो",
    "That last word names the place the last digit must reach.": "वह आखिरी शब्द उस स्थान का नाम बताता है जहाँ आखिरी अंक को पहुँचना है।",
    "The last one is twenty-six and forty-five hundredths. Write that number.": "आखिरी है छब्बीस पूर्ण पैंतालीस सौवाँ भाग। वह संख्या लिखो।",
    "Write it in digits": "अंकों में लिखो",
    "Count the places your number has after the dot.": "बिंदु के बाद अपनी संख्या के स्थान गिनो।",
    /* say it again (phase 4) */
    "seven and eighty-five thousandths.": "सात पूर्ण पचासी हज़ारवाँ भाग।",
    "forty-one and six hundredths.": "इकतालीस पूर्ण छह सौवाँ भाग।",
    "twenty-six and forty-five hundredths.": "छब्बीस पूर्ण पैंतालीस सौवाँ भाग।",
    /* the working area's own words, the choices and the slot */
    "tenths": "दसवाँ भाग", "hundredths": "सौवाँ भाग", "thousandths": "हज़ारवाँ भाग",
    "tenth": "दसवाँ भाग", "hundredth": "सौवाँ भाग", "thousandth": "हज़ारवाँ भाग",
    "and": "पूर्ण", "point": "दशमलव", "dot": "बिंदु", "seven": "सात", "seven tenths": "सात दसवाँ भाग",
    "whole ones": "पूर्ण इकाइयाँ", "smaller than one": "एक से छोटे",
    "proper way": "सही तरीका", "everyday way": "रोज़ का तरीका", "proper": "सही", "everyday": "रोज़ का", "you said": "तुमने कहा",
    "places": "स्थान", "sentences": "वाक्य", "Count the places": "स्थान गिनो",
    "Say it again": "फिर से बोलो", "Say it": "बोलो", "Say it, both readings": "दोनों तरह से बोलो",
    "New number": "नई संख्या", "Keep it": "रखो", "Your number": "अपनी संख्या", "More places": "और स्थान", "Fewer places": "कम स्थान", "Count them": "गिनो",
    "pieces": "टुकड़े", "two parts": "दो भाग",
  },
  gu: {
    "Say It Bar": "પટ્ટી પર બોલો",
    "A number along a bar, with a dot standing in the middle of it. Cut it there.": "પટ્ટી પર એક સંખ્યા છે, અને તેની વચ્ચે એક ટપકું ઊભું છે. તેને ત્યાંથી કાપો.",
    "Every sentence built to its last word, and every last word doing a job.": "દરેક વાક્ય તેના છેલ્લા શબ્દ સુધી બન્યું, અને દરેક છેલ્લા શબ્દનું પોતાનું કામ છે.",
    "Free play. Any number on the bar, both readings, and say it as often as you like.": "મુક્ત રમત. પટ્ટી પર કોઈ પણ સંખ્યા, બંને રીતે વાંચન, અને ગમે તેટલી વાર બોલો.",
    /* phase 1 */
    "The point divides the number in two": "ટપકું સંખ્યાને બે ભાગમાં વહેંચે છે",
    "Cut it where the dot is. What is each side counting?": "જ્યાં ટપકું છે ત્યાંથી કાપો. દરેક બાજુ શું ગણે છે?",
    "Which side of it counts whole ones?": "કઈ બાજુ પૂર્ણ એકમ ગણાય છે?",
    "Read the digits before the dot as a number of their own.": "ટપકા પહેલાંના અંકોને એક અલગ સંખ્યાની જેમ વાંચો.",
    "A decimal has two parts, split by the point. The whole number part is on the left and the decimal part on the right.": "દશાંશના બે ભાગ હોય છે, જેને દશાંશ ચિહ્ન વહેંચે છે. પૂર્ણ સંખ્યાનો ભાગ ડાબી બાજુ અને દશાંશ ભાગ જમણી બાજુ હોય છે.",
    "You learned: the point splits a decimal into two parts.": "તમે શીખ્યા: દશાંશ ચિહ્ન દશાંશને બે ભાગમાં વહેંચે છે.",
    "Here is a decimal on the bar. Open it at the point, then drop a label under each half.": "પટ્ટી પર આ એક દશાંશ છે. તેને ટપકા પર ખોલો, પછી દરેક અડધા નીચે એક લેબલ મૂકો.",
    "Label each half": "દરેક અડધાને નામ આપો",
    "Where is the dot in this number?": "આ સંખ્યામાં ટપકું ક્યાં છે?",
    "A new number, with just one digit after the dot. Name its two parts.": "એક નવી સંખ્યા, જેમાં ટપકા પછી ફક્ત એક અંક છે. તેના બંને ભાગનાં નામ આપો.",
    "Name both parts": "બંને ભાગનાં નામ આપો",
    "Say it out loud. Where do the whole ones stop?": "તેને મોટેથી બોલો. પૂર્ણ એકમ ક્યાં પૂરા થાય છે?",
    "Which part of a decimal counts pieces smaller than one? Tap that half.": "દશાંશનો કયો ભાગ એકથી નાના ટુકડા ગણે છે? તે અડધા પર ટૅપ કરો.",
    "Tap that half": "તે અડધા પર ટૅપ કરો",
    "The dot is the edge of one whole. Which side of the edge is smaller?": "ટપકું એક પૂર્ણની કિનારી છે. કિનારીની કઈ બાજુ નાનો ભાગ છે?",
    /* phase 2 */
    "Saying the point out loud": "ટપકાને બોલીને વાંચવું",
    "What word goes where the dot is? Now try the everyday way.": "ટપકાની જગ્યાએ કયો શબ્દ આવે? હવે રોજની રીતે બોલીને જુઓ.",
    "Which reading does that word belong to?": "તે શબ્દ વાંચવાની કઈ રીતનો છે?",
    "One reading names the place at the end. The other never does.": "એક રીતમાં છેલ્લે સ્થાનનું નામ આવે છે. બીજીમાં ક્યારેય નહીં.",
    "The word and stands for the point in the proper reading. The word point stands for it in the everyday one.": "સાચી રીતમાં ટપકાની જગ્યાએ પૂર્ણ શબ્દ આવે છે. રોજની રીતમાં તેની જગ્યાએ દશાંશ શબ્દ આવે છે.",
    "You learned: the point is said as and, or as point.": "તમે શીખ્યા: ટપકાને પૂર્ણ અથવા દશાંશ કહીને વાંચીએ છીએ.",
    "Read the number on the bar the proper way, then the everyday way. Fill both joining slots.": "પટ્ટીની સંખ્યા પહેલાં સાચી રીતે વાંચો, પછી રોજની રીતે. જોડતી બંને જગ્યાઓ ભરો.",
    "Fill both gaps": "બંને ખાલી જગ્યા ભરો",
    "Which word is standing in the joining slot?": "જોડતી જગ્યામાં કયો શબ્દ છે?",
    "Now a shorter number. Say it the everyday way, all the way through.": "હવે એક ટૂંકી સંખ્યા. તેને રોજની રીતે પૂરેપૂરી બોલો.",
    "Build the reading": "વાંચવાનું વાક્ય બનાવો",
    "Half of one reading and half of the other is not a reading.": "એક રીતનો અડધો ભાગ અને બીજીનો અડધો ભાગ મળીને વાંચવાની રીત બનતી નથી.",
    "One slot is empty in the proper reading. Which word fills it?": "સાચી રીતમાં એક જગ્યા ખાલી છે. તેમાં કયો શબ્દ આવશે?",
    "Fill the gap": "ખાલી જગ્યા ભરો",
    "Read the whole sentence out with your word in it.": "તમારા શબ્દ સાથે આખું વાક્ય બોલીને વાંચો.",
    /* phase 3 */
    "Naming the last digit's place": "છેલ્લા અંકના સ્થાનનું નામ આપવું",
    "Count what is after the dot. Which place does the last one sit in?": "ટપકા પછીના અંકો ગણો. છેલ્લો અંક કયા સ્થાનમાં છે?",
    "Which of them is the last one?": "તેમાંથી છેલ્લો અંક કયો છે?",
    "Tap count the places and watch where the counting stops.": "સ્થાન ગણો પર ટૅપ કરો અને જુઓ ગણતરી ક્યાં અટકે છે.",
    "The last word of the sentence names the place the last digit sits in.": "વાક્યનો છેલ્લો શબ્દ છેલ્લો અંક જે સ્થાનમાં છે તેનું નામ આપે છે.",
    "You learned: the sentence ends on the place of the last digit.": "તમે શીખ્યા: વાક્ય છેલ્લા અંકના સ્થાનના નામ પર પૂરું થાય છે.",
    "This sentence is built but for its last word. Give me that word.": "આ વાક્યમાં ફક્ત છેલ્લો શબ્દ બાકી છે. તે શબ્દ આપો.",
    "Pick the last word": "છેલ્લો શબ્દ પસંદ કરો",
    "How many digits are after the dot?": "ટપકા પછી કેટલા અંક છે?",
    "Now a different number. Which word ends its sentence?": "હવે બીજી સંખ્યા. તેનું વાક્ય કયા શબ્દ પર પૂરું થાય છે?",
    "End the sentence": "વાક્ય પૂરું કરો",
    "Run the count again, from the dot outwards.": "ગણતરી ફરી કરો, ટપકાથી બહારની તરફ.",
    "This one has nothing but a zero in front of the point. Finish its sentence.": "આમાં ટપકા પહેલાં ફક્ત શૂન્ય છે. તેનું વાક્ય પૂરું કરો.",
    "Name that place": "તે સ્થાનનું નામ આપો",
    "The last digit is the one furthest from the dot.": "છેલ્લો અંક તે છે જે ટપકાથી સૌથી દૂર છે.",
    /* phase 4 */
    "Writing one down from what you hear": "જે સાંભળો તે લખવું",
    "The last word tells you how many places. Fill them in from the left.": "છેલ્લો શબ્દ કહે છે કે કેટલાં સ્થાન છે. તેમને ડાબી બાજુથી ભરો.",
    "How many places does that word ask for?": "તે શબ્દ કેટલાં સ્થાન માગે છે?",
    "Lay the digits in from the left, and see which place stays empty.": "અંકોને ડાબી બાજુથી મૂકો, અને જુઓ કયું સ્થાન ખાલી રહે છે.",
    "The place name at the end says how many digits the decimal part must have.": "છેલ્લા સ્થાનનું નામ કહે છે કે દશાંશ ભાગમાં કેટલા અંક હોવા જોઈએ.",
    "You learned: the place name says how many decimal places to write.": "તમે શીખ્યા: સ્થાનનું નામ કહે છે કે દશાંશના કેટલાં સ્થાન લખવાં.",
    "Write seven and eighty-five thousandths as a decimal.": "સાત પૂર્ણ પંચાસી હજારમો ભાગ દશાંશ તરીકે લખો.",
    "Write the number": "સંખ્યા લખો",
    "What is the last word of the sentence?": "વાક્યનો છેલ્લો શબ્દ કયો છે?",
    "Now forty-one and six hundredths. Write that one down.": "હવે એકતાલીસ પૂર્ણ છ સોમો ભાગ. તે લખો.",
    "Write it down": "તે લખો",
    "That last word names the place the last digit must reach.": "તે છેલ્લો શબ્દ જે સ્થાન સુધી છેલ્લો અંક પહોંચવો જોઈએ, તેનું નામ આપે છે.",
    "The last one is twenty-six and forty-five hundredths. Write that number.": "છેલ્લી છે છવ્વીસ પૂર્ણ પિસ્તાલીસ સોમો ભાગ. તે સંખ્યા લખો.",
    "Write it in digits": "અંકોમાં લખો",
    "Count the places your number has after the dot.": "ટપકા પછી તમારી સંખ્યાના સ્થાન ગણો.",
    /* say it again (phase 4) */
    "seven and eighty-five thousandths.": "સાત પૂર્ણ પંચાસી હજારમો ભાગ.",
    "forty-one and six hundredths.": "એકતાલીસ પૂર્ણ છ સોમો ભાગ.",
    "twenty-six and forty-five hundredths.": "છવ્વીસ પૂર્ણ પિસ્તાલીસ સોમો ભાગ.",
    /* the working area's own words, the choices and the slot */
    "tenths": "દશમો ભાગ", "hundredths": "સોમો ભાગ", "thousandths": "હજારમો ભાગ",
    "tenth": "દશમો ભાગ", "hundredth": "સોમો ભાગ", "thousandth": "હજારમો ભાગ",
    "and": "પૂર્ણ", "point": "દશાંશ", "dot": "ટપકું", "seven": "સાત", "seven tenths": "સાત દશમો ભાગ",
    "whole ones": "પૂર્ણ એકમ", "smaller than one": "એકથી નાના",
    "proper way": "સાચી રીત", "everyday way": "રોજની રીત", "proper": "સાચી", "everyday": "રોજની", "you said": "તમે કહ્યું",
    "places": "સ્થાન", "sentences": "વાક્યો", "Count the places": "સ્થાન ગણો",
    "Say it again": "ફરી બોલો", "Say it": "બોલો", "Say it, both readings": "બંને રીતે બોલો",
    "New number": "નવી સંખ્યા", "Keep it": "રાખો", "Your number": "તમારી સંખ્યા", "More places": "વધુ સ્થાન", "Fewer places": "ઓછાં સ્થાન", "Count them": "ગણો",
    "pieces": "ટુકડા", "two parts": "બે ભાગ",
  },
};

/* ── the chapter's own picture ────────────────────────────────────────────────────────────
   A digit left of the point is deep blue, a digit right of it green, and the point itself is
   vermilion between them on every phase. Amber marks what is being counted or read back.
   A zero that is only holding a place open is grey, at full size and weight, never dimmed. */
const SIB = { whole: CONTENT.hundred, dec: CONTENT.one, point: CONTENT.pointer };
const SIB_GREY = "#767676";
/* coloured numerals and words take a deeper ink, so they read at 4.5:1 on white and on a tinted card */
const sibInk = (c: string) => shade(c, 0.35);
const sibFace = (c: string) => tint(c, 0.85);
const SIB_MARK_INK = shade(CONTENT.ten, 0.5);
const SIB_MARK_FACE = tint(CONTENT.ten, 0.72);
const SIB_QUIET = shade(CHROME.accent, 0.2);

const SIB_PLACES = ["tenths", "hundredths", "thousandths"];
const PLACE_CHOICES = SIB_PLACES.map((p) => ({ id: p, label: p }));
const SIB_SIDE_WORDS: Record<string, string> = { whole: "whole ones", part: "smaller than one" };
const SIB_FREE_NUMS = ["4.7", "12.56", "0.309", "8.25", "31.4", "6.072"];

/* a decimal is never written with a comma inside its digits (the book writes 12.563) */
const sibCut = (s: any) => {
  const t = String(s === null || s === undefined ? "" : s);
  const i = t.indexOf(".");
  return i < 0 ? { whole: t, dec: "" } : { whole: t.slice(0, i), dec: t.slice(i + 1) };
};
const sibSingly = (d: string) => d.split("").map((x) => words(Number(x))).join(" ");
const sibPlaceOf = (d: string) => SIB_PLACES[Math.max(0, Math.min(2, d.length - 1))];
/* free play's k-th number, given as many decimal places as asked (1 to 3) */
const sibFreeNum = (k: number, dec: number) => {
  const base = sibCut(SIB_FREE_NUMS[k % SIB_FREE_NUMS.length]);
  let d = base.dec;
  while (d.length < dec) d = d + String(((Number(base.whole) + d.length) % 9) + 1);
  return base.whole + "." + d.slice(0, Math.max(1, dec));
};
/* one more place on the end of a number (at most thousandths), or one fewer (at least tenths) */
const sibGrow = (s: string) => { const c = sibCut(s); return c.dec.length >= 3 ? s : s + String(((Number(c.whole) + c.dec.length) % 9) + 1); };
const sibShrink = (s: string) => (sibCut(s).dec.length > 1 ? s.slice(0, -1) : s);
/* the words a lane holds: "whole" reads the decimal part as one number and names the place its last
   digit sits in; "single" says the digits one at a time and never reaches a place name. The last
   word counts pieces, so one of them is singular: 5.1 is "five and one tenth". With a language and its
   lookup the same four words come back in that language (English: exactly as before) */
const sibLane = (num: string, read: string, lang: string = "en", tx: any = (v: any) => v) => {
  const c = sibCut(num);
  if (read === "single") return [wordsIn(Number(c.whole), lang), tx("point"), c.dec.split("").map((x) => wordsIn(Number(x), lang)).join(" "), ""];
  const unit = sibPlaceOf(c.dec);
  return [wordsIn(Number(c.whole), lang), tx("and"), wordsIn(Number(c.dec), lang), tx(Number(c.dec) === 1 ? unit.slice(0, -1) : unit)];
};
/* the words of a join answer ("and point", "seven tenths") in the language in use, or "" when the string is not
   made of the cards' words; the slot and the summary drawing show a built answer this way */
const SIB_CARD_WORDS = ["seven tenths", "and", "point", "seven", "dot"];
const sibJoinIn = (s: string, tx: any) => {
  let rest = String(s).trim();
  const out: string[] = [];
  while (rest) {
    const hit = SIB_CARD_WORDS.find((cd) => rest === cd || rest.indexOf(cd + " ") === 0);
    if (!hit) return "";
    out.push(tx(hit));
    rest = rest.slice(hit.length).trim();
  }
  return out.join(" ");
};
const sibShow = (s: any, tx: any) => sibJoinIn(String(s === null || s === undefined ? "" : s), tx) || tx(s);

/* geometry, in working-area units (1086 × 528) */
const CARD = { w: 84, h: 104, gap: 8 };
const PT = { w: 16, gap: 12 };
const LANE = { x: 140, w: 226, gap: 10, h: 80 };
const laneX = (i: number) => LANE.x + i * (LANE.w + LANE.gap);
const sibRow = (n: number, w: number, gap: number) => (W.w - (n * w + (n - 1) * gap)) / 2;
const sibClamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

/* where every card of a number sits on the bar, cut open at the point or standing whole */
const sibBar = (num: string, open: boolean) => {
  const c = sibCut(num);
  const lw = c.whole.length * CARD.w + Math.max(0, c.whole.length - 1) * CARD.gap;
  const rw = c.dec.length * CARD.w + Math.max(0, c.dec.length - 1) * CARD.gap;
  const g = open ? 20 : 0;
  const total = lw + PT.gap + g + PT.w + g + PT.gap + rw;
  const x0 = (W.w - total) / 2;
  const px = x0 + lw + PT.gap + g;
  const rx0 = px + PT.w + g + PT.gap;
  return { whole: c.whole, dec: c.dec, x0, lw, rx0, rw, px, leftC: x0 + lw / 2, rightC: rx0 + rw / 2 };
};
const sibCellX = (b: any, k: number) => b.rx0 + k * (CARD.w + CARD.gap);

/* ── phases ─────────────────────────────────────────────────────────────────────────────
   kinds: split (drop a label under each half) · side (tap the half that counts the pieces) ·
          join (drag a word into the empty slot of a reading) · place (name the last digit's
          place, from the tray) · write (type the decimal the heard sentence asks for) */

const PHASES = [
  {
    n: 1,
    concept: "The point divides the number in two",
    conceptId: "M1.S2.T4.C12", objectiveIds: ["O5"],
    says: ["Cut it where the dot is. What is each side counting?"],
    ladder: ["Which side of it counts whole ones?", "Read the digits before the dot as a number of their own."],
    closing: "A decimal has two parts, split by the point. The whole number part is on the left and the decimal part on the right.",
    learned: "You learned: the point splits a decimal into two parts.",
    traceback: "The bar opens at the point, each half is read on its own, and the label that names it drops under it.",
    items: [
      /* learn ML1: answer in the plan = 45 is the whole number part and 317 is the decimal part */
      { qid: "M1.S2.T4.C12:ML1", kind: "split", num: "45.317", tray: ["whole", "part"], pad: "enter", winMs: 2000,
        answer: "45 whole ones", ask: "Label each half",
        say: "Here is a decimal on the bar. Open it at the point, then drop a label under each half.",
        miss: "Where is the dot in this number?" },
      /* practice 1: answer in the plan = 13 is the whole number part and 9 is the decimal part */
      { qid: "M1.S2.T4.C12:1", kind: "split", num: "13.9", tray: ["part", "whole"], pad: "enter", winMs: 2000,
        answer: "13 whole ones", ask: "Name both parts",
        say: "A new number, with just one digit after the dot. Name its two parts.",
        miss: "Say it out loud. Where do the whole ones stop?" },
      /* practice 2: answer in the plan = The decimal part, which is written to the right of the point
         (asked here on a number, so the child answers by tapping the half itself) */
      { qid: "M1.S2.T4.C12:2", kind: "side", num: "6.24", pad: "enter", winMs: 2000,
        answer: "24 pieces", ask: "Tap that half",
        say: "Which part of a decimal counts pieces smaller than one? Tap that half.",
        miss: "The dot is the edge of one whole. Which side of the edge is smaller?" },
    ],
  },
  {
    n: 2,
    concept: "Saying the point out loud",
    conceptId: "M1.S2.T4.C13", objectiveIds: ["O5"],
    says: ["What word goes where the dot is? Now try the everyday way."],
    ladder: ["Which reading does that word belong to?", "One reading names the place at the end. The other never does."],
    closing: "The word and stands for the point in the proper reading. The word point stands for it in the everyday one.",
    learned: "You learned: the point is said as and, or as point.",
    traceback: "Both readings run under the bar, word by word, each one whole, with its joining word lit.",
    items: [
      /* learn ML2: answer in the plan = Eight and sixty-four hundredths, or eight point six four
         (built here as the joining word of each lane, so both readings stand whole, side by side) */
      { qid: "M1.S2.T4.C13:ML2", kind: "join", num: "8.64", reads: ["whole", "single"], lanes: [0, 1],
        holes: [{ lane: 0, slot: 1 }, { lane: 1, slot: 1 }], cards: ["and", "point"], pad: "enter", winMs: 2200,
        answer: "and point", near: "point and", ask: "Fill both gaps",
        say: "Read the number on the bar the proper way, then the everyday way. Fill both joining slots.",
        miss: "Which word is standing in the joining slot?" },
      /* practice 3: answer in the plan = Two point seven */
      { qid: "M1.S2.T4.C13:3", kind: "join", num: "2.7", reads: ["whole", "single"], lanes: [1],
        holes: [{ lane: 1, slot: 1 }, { lane: 1, slot: 2 }], cards: ["and", "point", "seven", "seven tenths"],
        pad: "enter", winMs: 2200, answer: "point seven", near: "point seven tenths", ask: "Build the reading",
        say: "Now a shorter number. Say it the everyday way, all the way through.",
        miss: "Half of one reading and half of the other is not a reading." },
      /* practice 4: answer in the plan = The word and */
      { qid: "M1.S2.T4.C13:4", kind: "join", num: "5.3", reads: ["whole", "single"], lanes: [0],
        holes: [{ lane: 0, slot: 1 }], cards: ["and", "point", "dot"], pad: "enter", winMs: 2200,
        answer: "and", near: "point", ask: "Fill the gap",
        say: "One slot is empty in the proper reading. Which word fills it?",
        miss: "Read the whole sentence out with your word in it." },
    ],
  },
  {
    n: 3,
    concept: "Naming the last digit's place",
    conceptId: "M1.S2.T4.C14", objectiveIds: ["O6"],
    says: ["Count what is after the dot. Which place does the last one sit in?"],
    ladder: ["Which of them is the last one?", "Tap count the places and watch where the counting stops."],
    closing: "The last word of the sentence names the place the last digit sits in.",
    learned: "You learned: the sentence ends on the place of the last digit.",
    traceback: "The count runs from the point outwards, digit by digit, and holds on the last one under its place name.",
    items: [
      /* learn ML3: answer in the plan = Fifty-six and two hundred four thousandths */
      { qid: "M1.S2.T4.C14:ML3", kind: "place", num: "56.204", choices: PLACE_CHOICES, winMs: 2600,
        answer: "thousandths", ask: "Pick the last word",
        say: "This sentence is built but for its last word. Give me that word.",
        miss: "How many digits are after the dot?" },
      /* practice 5: answer in the plan = Thirty and forty-five hundredths */
      { qid: "M1.S2.T4.C14:5", kind: "place", num: "30.45", choices: PLACE_CHOICES, winMs: 2600,
        answer: "hundredths", ask: "End the sentence",
        say: "Now a different number. Which word ends its sentence?",
        miss: "Run the count again, from the dot outwards." },
      /* practice 6: answer in the plan = Six hundred eight thousandths */
      { qid: "M1.S2.T4.C14:6", kind: "place", num: "0.608", choices: PLACE_CHOICES, winMs: 2600,
        answer: "thousandths", ask: "Name that place",
        say: "This one has nothing but a zero in front of the point. Finish its sentence.",
        miss: "The last digit is the one furthest from the dot." },
    ],
  },
  {
    n: 4,
    concept: "Writing one down from what you hear",
    conceptId: "M1.S2.T4.C15", objectiveIds: ["O6"],
    says: ["The last word tells you how many places. Fill them in from the left."],
    ladder: ["How many places does that word ask for?", "Lay the digits in from the left, and see which place stays empty."],
    closing: "The place name at the end says how many digits the decimal part must have.",
    learned: "You learned: the place name says how many decimal places to write.",
    traceback: "The places the last word asks for are drawn out, the digits heard walk in from the right, and a zero takes the one left open.",
    items: [
      /* learn ML4: answer in the plan = 7.085 */
      { qid: "M1.S2.T4.C15:ML4", kind: "write", heard: { whole: 7, part: 85, place: "thousandths" }, winMs: 2600,
        answer: "7.085", ask: "Write the number",
        say: "Write seven and eighty-five thousandths as a decimal.",
        miss: "What is the last word of the sentence?" },
      /* practice 7: answer in the plan = 41.06 */
      /* wrongEnd: this is the item that tests the writeup's second error, the filling zero hung on the
         right hand end (41.60) instead of in the tenths place where the gap really is */
      { qid: "M1.S2.T4.C15:7", kind: "write", heard: { whole: 41, part: 6, place: "hundredths" }, wrongEnd: true, winMs: 2600,
        answer: "41.06", ask: "Write it down",
        say: "Now forty-one and six hundredths. Write that one down.",
        miss: "That last word names the place the last digit must reach." },
      /* practice 8: answer in the plan = 26.45, and it needs two decimal places (the places it needs
         are drawn under the number, so what the child writes is the decimal itself) */
      { qid: "M1.S2.T4.C15:8", kind: "write", heard: { whole: 26, part: 45, place: "hundredths" }, winMs: 2600,
        answer: "26.45", ask: "Write it in digits",
        say: "The last one is twenty-six and forty-five hundredths. Write that number.",
        miss: "Count the places your number has after the dot." },
    ],
  },
];

/* The numbers, rows and sizes the working area needs (they go into the sidecar too). */
const MODEL = {
  places: SIB_PLACES, readings: ["proper", "everyday"], sideWords: SIB_SIDE_WORDS,
  card: { w: CARD.w, h: CARD.h }, point: { w: PT.w, colour: "vermilion" },
  lane: { x: LANE.x, w: LANE.w, gap: LANE.gap, h: LANE.h, slots: 4 },
  freeNumbers: SIB_FREE_NUMS,
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: every answer here is a written form, compared exactly, so a decimal keeps the zero the book
   writes in front of it ("7.85" is not "7.085", and "0.30" is not "0.3") */
const judge = (item: any, v: any) => String(v === null || v === undefined ? "" : v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();

/* the word a hole waits for, worked out from the reading its lane runs: a lane that reads its decimal
   part as one number joins with "and", one that says the digits singly joins with "point" */
const sibExpect = (it: any, h: any) => {
  const c = sibCut(it.num);
  const single = it.reads[h.lane] === "single";
  if (h.slot === 0) return words(Number(c.whole));
  if (h.slot === 1) return single ? "point" : "and";
  if (h.slot === 2) return single ? sibSingly(c.dec) : words(Number(c.dec));
  if (single) return "";
  const pl = ["tenth", "hundredth", "thousandth"][Math.min(2, Math.max(0, c.dec.length - 1))];   /* one piece, else pieces */
  return Number(c.dec) === 1 ? pl : pl + "s";
};

/* oracle: every answer re-derived by a second route that shares no code with judge or Work */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "split" || it.kind === "side") {
    const c = sibCut(it.num);
    if (!c.whole.length || !c.dec.length) return false;
    return it.answer === (it.kind === "split" ? c.whole + " whole ones" : c.dec + " pieces");
  }
  if (it.kind === "join") return it.answer === it.holes.map((h: any) => sibExpect(it, h)).join(" ");
  if (it.kind === "place") return it.answer === sibPlaceOf(sibCut(it.num).dec);
  if (it.kind === "write") {
    const need = SIB_PLACES.indexOf(it.heard.place) + 1, part = String(it.heard.part);
    if (need < 1 || part.length > need) return false;
    let pad = part;
    while (pad.length < need) pad = "0" + pad;          /* the filling zero goes in FRONT */
    return it.answer === String(it.heard.whole) + "." + pad;
  }
  return false;
}));

/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => {
  const c = sibCut(item.num);
  if (item.kind === "split") return c.dec + " whole ones";     /* the two halves read the wrong way round */
  if (item.kind === "side") return c.whole + " pieces";
  if (item.kind === "join") return item.near;                  /* the two readings mixed into one */
  if (item.kind === "place") return "tenths";                  /* the place of the FIRST digit */
  const need = SIB_PLACES.indexOf(item.heard.place) + 1, part = String(item.heard.part);
  const short = need - part.length;
  /* the two errors the writeup names, each on an item that really needs a filling zero: too few
     places (the zero left out), and the zero hung on the RIGHT hand end instead of the left.
     An amount whose heard digits already fill its places (26.45) cannot miss by either: leaving a
     zero out or placing one gives the right number. Its miss is the second error's own move made
     where no place is empty, a zero hung on the right hand end, one place past the word it heard. */
  if (short > 0) return String(item.heard.whole) + "." + (item.wrongEnd ? part + new Array(short + 1).join("0") : part);
  return String(item.heard.whole) + "." + part + "0";
};

/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.kind === "write" ? [String(item.answer), speakable(item.answer)] : [String(item.answer)]);

/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the slot shows the number the child named; the words that name it stand on the working area */
const format = (v: any, _j?: any, o?: any) => {
  const s = String(v === null || v === undefined ? "" : v);
  const m = /^(\d+)\s/.exec(s);
  if (m) return m[1];
  /* a built reading ("and point") shows in the language in use, word by word */
  if (o && o.lang && o.lang !== "en" && o.tx) { const t = sibJoinIn(s, o.tx); if (t) return t; }
  return s;
};

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (HOOK.set && HOOK.set(item.answer)) { if (HOOK.check) HOOK.check(); return; }
  return T.submit(item.answer);
};
/* the agent's answer(): set it on the working area as a child would; a typed decimal keeps its point */
const answer = (item: any, v: any) => {
  if (item.kind === "write") { if (!HOOK.type) return undefined; HOOK.type(String(v === null || v === undefined ? "" : v)); return true; }
  if (item.choices) return undefined;
  return HOOK.set ? HOOK.set(v) : undefined;
};
/* the agent's check() before Enter: a built answer sends itself; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

const SIB_CSS = `
.sib-in{animation:sibIn 420ms ease-out both}
@keyframes sibIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.sib-grab{cursor:grab}
.sib-caret{animation:sibBlink 1s steps(1) infinite}
@keyframes sibBlink{50%{opacity:0}}
@media (prefers-reduced-motion:reduce){.sib-in,.sib-caret{animation:none}}
`;

/* ── the working area: 1086 × 528, origin at its top-left ──────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, captured, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const kind = free ? "free" : item.kind || "";
  const busy = tl.busy;

  const [cut, setCut] = useState(false);
  const [plates, setPlates] = useState<any>({ left: null, right: null });
  const [side, setSide] = useState<string | null>(null);
  const [fills, setFills] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  /* the correction layer: it is drawn beside the child's pieces, never written into them, and it
     goes the moment the child touches anything, so the act that mends the answer is the act that
     sends it (no tap of the child's is spent undoing the correction) */
  const [shown, setShown] = useState<any>(null);
  const [lit, setLit] = useState(false);
  const [freeK, setFreeK] = useState(0);
  const [freeStr, setFreeStr] = useState(sibFreeNum(0, 2));
  /* free play: a number the child types onto the bar with the pad (null while not typing) */
  const [own, setOwn] = useState<string | null>(null);
  const ownRef = useRef<string | null>(null);
  const setOwnTo = (s: string | null) => { ownRef.current = s; setOwn(s); };
  /* the answer that just missed: a bare Enter, or pieces dropped back the same, never sends it again */
  const wrongRef = useRef<any>(null);
  wrongRef.current = wrong;
  const [touched, setTouched] = useState(false);
  const platesRef = useRef<any>({ left: null, right: null });
  const sideRef = useRef<string | null>(null);
  const fillsRef = useRef<any[]>([]);
  const setupFor = useRef(-1);

  const reset = () => {
    tl.stop();
    platesRef.current = { left: null, right: null }; setPlates({ left: null, right: null });
    sideRef.current = null; setSide(null);
    fillsRef.current = []; setFills([]);
    setCut(false); setCount(0); setShown(null); setLit(false); setTouched(false);
    api.lock(false);
  };
  useEffect(() => { if (stage === "ask" && setupFor.current !== index) { setupFor.current = index; reset(); } }, [stage, index]);
  /* a write item: the first key typed on the pad is the child's first move, so the invite ring goes */
  useEffect(() => { if (!free && kind === "write" && stage === "ask" && String(typed || "") !== "") setTouched(true); }, [typed]);
  useEffect(() => { if (!free) return; setupFor.current = -2; reset(); setFreeK(0); setFreeStr(sibFreeNum(0, 2)); setOwnTo(null); }, [free]);

  /* ── the number on the bar ── */
  const freeNum = own !== null ? own : freeStr;
  const num = free ? freeNum : kind === "write" ? String(typed || "") : String(item.num || "");
  const B = sibBar(kind === "write" && !free ? num || "0" : num || "0.0", kind === "split" ? cut : true);
  const parts = sibCut(num);
  const seen = stage === "win" || stage === "idle";
  const laneTop = (li: number) => (free ? (li === 0 ? 196 : 286) : item.lanes && item.lanes.length > 1 ? (li === 0 ? 150 : 240) : 170);

  /* ── the pieces the child moves ── */
  const valueOf = (p: any, s: any, f: any) => {
    if (kind === "split") { const q = p || platesRef.current; if (!q.left || !q.right) return null; return (q.left === "whole" ? parts.whole : parts.dec) + " whole ones"; }
    if (kind === "side") { const q = s || sideRef.current; if (!q) return null; return (q === "right" ? parts.dec : parts.whole) + " pieces"; }
    if (kind === "join") {
      const q = f || fillsRef.current, holes = item.holes || [];
      if (!holes.length || holes.some((_h: any, k: number) => !q[k])) return null;
      return holes.map((_h: any, k: number) => q[k]).join(" ");
    }
    return null;
  };
  const sendBuilt = (p: any, s: any, f: any) => {
    const v = valueOf(p, s, f), w = wrongRef.current;
    if (v === null || (w && String(w.value) === v)) return;
    api.submit(v);
  };

  const placeCard = (id: string, target: string | null) => {
    if (stage !== "ask" || busy) return;
    setTouched(true); setShown(null);
    if (kind === "split") {
      const p = { ...platesRef.current };
      const from = p.left === id ? "left" : p.right === id ? "right" : null;
      let to = target;
      if (!to) to = !p.left ? "left" : !p.right ? "right" : from === "left" ? "right" : "left";
      const held = p[to];
      p[to] = id;
      if (from && from !== to) p[from] = held || null;
      platesRef.current = p; setPlates(p); setCut(true); api.sfx.tick();
      if (p.left && p.right) sendBuilt(p, null, null);
      return;
    }
    const holes = item.holes || [];
    if (!holes.length) return;
    const f = fillsRef.current.slice();
    const from = f.indexOf(id);
    let to = target === null ? f.findIndex((x: any, k: number) => k < holes.length && !x) : Number(target);
    if (!(to >= 0 && to < holes.length)) to = 0;
    const held = f[to] || null;
    f[to] = id;
    if (from >= 0 && from !== to) f[from] = held;
    fillsRef.current = f; setFills(f); api.sfx.tick();
    if (holes.every((_h: any, k: number) => f[k])) sendBuilt(null, null, f);
  };
  const pickSide = (s: string) => {
    if (stage !== "ask" || busy) return;
    setTouched(true); setShown(null);
    sideRef.current = s; setSide(s);
    sendBuilt(null, s, null);
  };
  const openBar = () => {
    if (stage !== "ask" || busy) return;
    setTouched(true); setCut(true); api.sfx.tick();
  };

  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (!moved || !isFinite(p.x)) { placeCard(pay.id, null); return; }
    if (kind === "split") {
      if (p.y < 130 || p.y > 320) return;                       /* let go off the ledge: it goes back */
      placeCard(pay.id, p.x < W.w / 2 ? "left" : "right");
      return;
    }
    const holes = item.holes || [];
    let best = -1, bd = 1e9;
    holes.forEach((h: any, k: number) => {
      const d = Math.hypot(p.x - (laneX(h.slot) + LANE.w / 2), p.y - (laneTop(h.lane) + LANE.h / 2));
      if (d < bd) { bd = d; best = k; }
    });
    if (best >= 0 && bd <= 230) placeCard(pay.id, String(best));
  });

  /* Enter sends what stands on the working area; a choice and a typed decimal go straight through */
  const enterFn: any = stage !== "ask" || busy || kind === "place" || kind === "write" ? null : () => sendBuilt(null, null, null);
  api.onEnter(enterFn);
  HOOK.type = (v: string) => api.setTyped(String(v));
  HOOK.check = () => {
    if (stage !== "ask" || kind === "place" || kind === "write") return undefined;
    const v = valueOf(null, null, null);
    if (v === null) return undefined;
    api.submit(v);
    return true;
  };
  HOOK.set = (v: any) => {
    if (stage !== "ask") return false;
    const s = String(v === null || v === undefined ? "" : v);
    if (kind === "split") {
      const p = s.split(" ")[0] === parts.whole ? { left: "whole", right: "part" } : { left: "part", right: "whole" };
      platesRef.current = p; setPlates(p); setCut(true); setTouched(true);
      return true;
    }
    if (kind === "side") {
      const q = s.split(" ")[0] === parts.dec ? "right" : "left";
      sideRef.current = q; setSide(q); setTouched(true);
      return true;
    }
    if (kind === "join") {
      const cards = (item.cards || []).slice().sort((a: string, b: string) => b.length - a.length);
      const f: any[] = [];
      let rest = s.trim();
      (item.holes || []).forEach(() => {
        const hit = cards.find((cd: string) => rest === cd || rest.indexOf(cd + " ") === 0);
        if (hit) { f.push(hit); rest = rest.slice(hit.length).trim(); } else f.push(null);
      });
      fillsRef.current = f; setFills(f); setTouched(true);
      return f.every((x) => !!x);
    }
    return false;
  };

  /* ── the one aid on the working area: it counts, and never names the place ── */
  const runCount = () => {
    if (busy || (stage !== "ask" && stage !== "free")) return;
    setTouched(true);
    const d = parts.dec || "";
    const steps: any[] = [[60, () => setCount(0)]];
    for (let k = 1; k <= d.length; k++) { const j = k; steps.push([460, () => { setCount(j); api.sfx.tick(); }]); }
    steps.push([500, () => {}]);
    tl.run(steps);
  };
  /* ── free play: type any number onto the bar with the pad. The pad is lent to the bar only once the
     child asks for it (the bar or "Your number"); Enter keeps the number, Escape puts the old one back ── */
  const endOwn = (keep: boolean) => {
    const s = ownRef.current;
    if (s === null) return;
    const c = sibCut(s);
    if (keep && c.whole.length && c.dec.length) setFreeStr(s);
    setOwnTo(null); setCount(0);
    api.capture(null);
  };
  const ownKey = (k: string) => {
    let s = ownRef.current;
    if (s === null) return;
    const c = sibCut(s), hasPoint = s.indexOf(".") >= 0;
    if (k === "enter") { endOwn(true); return; }
    if (k === "clear") { endOwn(false); return; }
    if (k === "back") s = s.slice(0, -1);
    else if (k === "point") { if (hasPoint) return; s = (s === "" ? "0" : s) + "."; }
    else if (/^[0-9]$/.test(k)) {
      if (hasPoint) { if (c.dec.length >= 3) return; s = s + k; }
      else if (s === "0") s = k;
      else { if (s.length >= 3) return; s = s + k; }
    } else return;
    setOwnTo(s); setCount(0); api.sfx.tick();
  };
  const startOwn = () => {
    if (!free || busy) return;
    if (ownRef.current !== null) { endOwn(true); return; }
    tl.stop(); setOwnTo(""); setCount(0); setLit(false); sayTurn.current++;
    api.capture(ownKey);
  };
  const freeSet = (f: (s: string) => string) => { if (ownRef.current !== null) endOwn(true); setFreeStr((s: string) => f(s)); setCount(0); setLit(false); sayTurn.current++; };
  /* the pad went back to the slot some other way (a tap on the answer box): keep what was typed */
  useEffect(() => { if (!captured && ownRef.current !== null) endOwn(true); }, [captured]);

  const sayAgain = () => {
    if (stage !== "ask") return;
    setTouched(true);
    const h = item.heard || {};
    /* one literal call per question, so each has its baked Hindi and Gujarati clip (a built string cannot be baked) */
    const key = String(h.whole) + "/" + String(h.part) + "/" + h.place;
    if (key === "7/85/thousandths") api.say("seven and eighty-five thousandths.");
    else if (key === "41/6/hundredths") api.say("forty-one and six hundredths.");
    else if (key === "26/45/hundredths") api.say("twenty-six and forty-five hundredths.");
    else api.say(words(h.whole) + " and " + words(h.part) + " " + h.place + ".");
  };
  /* free play's read-aloud: both readings of the number on the bar, each said whole, exactly as the two
     lanes spell them. The proper lane's last word is lit only while the proper line is spoken; the
     everyday line, which names no place, follows with nothing lit. A number still being typed is kept
     first (if it has both halves), so what is heard is what stands on the bar. A new number or a new
     press starts a new turn, so an old number's second line is never said after it. */
  const sayTurn = useRef(0);
  const sayFree = () => {
    if (!free) return;
    const o = ownRef.current, oc = sibCut(o || "");
    const s = o !== null && oc.whole.length && oc.dec.length ? o : freeStr;
    if (o !== null) endOwn(true);
    const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
    const line = (read: string) => cap(sibLane(s, read).filter((x: string) => !!x).join(" ")) + ".";
    /* the number on the bar is the child's own, so its line cannot be baked: in Hindi and Gujarati it shows
       translated and is silent (a Spoken value { en, hi, gu }) */
    const lineIn = (read: string, lg: string) => sibLane(s, read, lg, (v: any) => lineFor(v, lg, TR)).filter((x: string) => !!x).join(" ") + (lg === "hi" ? "।" : ".");
    const spoken = (read: string) => ({ en: line(read), hi: lineIn(read, "hi"), gu: lineIn(read, "gu") });
    const turn = ++sayTurn.current;
    setLit(true);
    api.say([spoken("whole")], () => {
      if (sayTurn.current !== turn) return;
      setLit(false);
      api.say([spoken("single")]);
    });
  };

  /* ── the traceback: the maths redrawn, ending on the whole right answer, nothing marked ── */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    /* a miss that was not built on the pieces (the agent's or a driver's submit) is laid onto them first,
       so the child's answer stands on the working area exactly as a child would have built it: the
       labels under their halves, the words in their slots, and the tray no longer crowding the correction */
    if ((kind === "split" || kind === "side" || kind === "join") && HOOK.set && valueOf(null, null, null) !== String(wrong.value)) HOOK.set(wrong.value);
    api.lock(true);
    const done = () => api.lock(false);
    if (kind === "split" || kind === "side") {
      tl.run([[300, () => setCut(true)], [700, () => setShown({ step: 1 })], [900, () => setShown({ step: 2 })], [700, () => {}]], done);
    } else if (kind === "join") {
      /* the right reading of every lane first, then the child's own reading on a line of its own */
      const steps: any[] = [[400, () => setShown({ rows: 1 })]];
      for (let r = 2; r <= (item.lanes || []).length + 1; r++) { const j = r; steps.push([1100, () => setShown({ rows: j })]); }
      steps.push([800, () => {}]);
      tl.run(steps, done);
    } else if (kind === "place") {
      const d = parts.dec || "";
      const steps: any[] = [[300, () => setCount(0)]];
      for (let k = 1; k <= d.length; k++) { const j = k; steps.push([520, () => { setCount(j); api.sfx.tick(); }]); }
      steps.push([700, () => setShown({ name: true })]);
      steps.push([800, () => {}]);
      tl.run(steps, done);
    } else if (kind === "write") {
      const need = SIB_PLACES.indexOf(item.heard.place) + 1, part = String(item.heard.part).slice(0, need);
      const steps: any[] = [[400, () => setShown({ need, fill: 0 })]];
      for (let k = 1; k <= part.length; k++) { const j = k; steps.push([520, () => { setShown({ need, fill: j }); api.sfx.tick(); }]); }
      steps.push([700, () => setShown({ need, fill: part.length, zero: true })]);
      steps.push([700, () => setShown({ need, fill: part.length, zero: true, read: true })]);
      steps.push([600, () => {}]);
      tl.run(steps, done);
    } else done();
  }, [wrong]);

  /* ── the win: the maths moving. Phase 3 is the plan's delight: the digits light back from the
     point outwards, counted as they go, and the last one holds under the name just chosen ── */
  useEffect(() => {
    if (stage !== "win") return;
    if (kind === "place") {
      const d = parts.dec || "";
      const steps: any[] = [[60, () => setCount(0)]];
      for (let k = 1; k <= d.length; k++) { const j = k; steps.push([380, () => setCount(j)]); }
      steps.push([300, () => { setShown({ name: true }); setLit(true); }]);
      steps.push([500, () => {}]);
      tl.run(steps);
    } else tl.run([[120, () => setLit(true)], [600, () => {}]]);
  }, [stage]);

  /* ── the words of a lane, with the holes the child is filling left open ── */
  const laneWords = (li: number, drawn?: boolean) => {
    const src = free ? freeNum : String(item.num || "0.0");
    const read = free ? (li === 0 ? "whole" : "single") : (item.reads || ["whole", "single"])[li];
    /* the state the agent reads stays English; what is drawn has the fixed words in the language in use, and
       the words the child drops in (English card ids) or the place name are translated as they are drawn */
    const w0 = drawn ? sibLane(src, read, lang, tx) : sibLane(src, read);
    if (kind === "place") {
      const last = seen ? item.answer : null;
      return parts.whole === "0" ? [w0[2], last] : [w0[0], w0[1], w0[2], last];
    }
    const out: any[] = w0.slice();
    if (!free) (item.holes || []).forEach((h: any, k: number) => { if (h.lane === li) out[h.slot] = fills[k] || null; });
    return out;
  };
  const lanesOn: number[] = free ? [0, 1] : kind === "join" ? item.lanes : kind === "place" ? [0] : [];

  /* ── what the host and the agent read back (toolApi.getState) ── */
  api.share({
    number: num, wholePart: parts.whole, decimalPart: parts.dec,
    sentenceSlots: lanesOn.length ? laneWords(lanesOn[0]) : null,
    placeName: free ? sibPlaceOf(sibCut(freeNum).dec) : kind === "write" ? item.heard.place : kind === "place" && seen ? item.answer : null,
    lane: free ? "both" : kind === "join" ? (item.lanes.length > 1 ? "both" : item.lanes[0] === 0 ? "proper" : "everyday") : kind === "place" ? "proper" : null,
    heardSentence: kind === "write" ? words(item.heard.whole) + " and " + words(item.heard.part) + " " + item.heard.place : null,
    complete: stage === "idle",
  });

  /* ── drawing ── */
  const fitLine = (s: string, maxW: number) => {
    const t = String(tx(s || ""));
    if (t.length * T.label * 0.55 <= maxW) return { lines: [t], size: T.label };
    return { lines: wrapText(t, Math.max(6, Math.floor(maxW / (T.micro * 0.55)))).slice(0, 2), size: T.micro };
  };
  const boxText = (s: string, x: number, y: number, w: number, h: number, fill: string) => {
    const f = fitLine(s, w - 22);
    return f.lines.map((ln, k) => (
      <text key={k} x={x + w / 2} y={y + h / 2 + (f.size === T.label ? 11 : f.lines.length > 1 ? -4 + k * 32 : 10)}
        textAnchor="middle" fontSize={f.size} fontWeight={600} fill={fill}>{ln}</text>
    ));
  };
  const digitCard = (ch: string, x: number, y: number, colour: string, mode: string, key: string) => {
    const grey = mode === "zero", marked = mode === "lit";
    const ink = grey ? SIB_GREY : marked ? SIB_MARK_INK : sibInk(colour);
    return (
      <g key={key}>
        <rect x={x} y={y} width={CARD.w} height={CARD.h} rx={14} fill={grey ? "#FFFFFF" : marked ? SIB_MARK_FACE : sibFace(colour)}
          stroke={ink} strokeWidth={marked ? 4 : 2} strokeDasharray={grey ? "9 7" : undefined} />
        <text x={x + CARD.w / 2} y={y + CARD.h / 2 + 20} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={ink}>{ch}</text>
      </g>
    );
  };
  const emptyCard = (x: number, y: number, key: string) => (
    <rect key={key} x={x} y={y} width={CARD.w} height={CARD.h} rx={14} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} strokeDasharray="9 8" />
  );
  const barAt = (b: any, y: number, o: any) => (
    <g>
      {b.whole.split("").map((ch: string, k: number) =>
        digitCard(ch, b.x0 + k * (CARD.w + CARD.gap), y, SIB.whole, o.litWhole ? "lit" : "", "w" + k))}
      <rect x={b.px} y={y} width={PT.w} height={CARD.h} rx={7} fill={SIB.point} />
      {b.dec.split("").map((ch: string, k: number) =>
        digitCard(ch, sibCellX(b, k), y, SIB.dec, o.litDec || (o.countTo && k < o.countTo) ? "lit" : "", "d" + k))}
      {!!o.countTo && b.dec.split("").slice(0, o.countTo).map((_c: string, k: number) => (
        <text key={"c" + k} x={sibCellX(b, k) + CARD.w / 2} y={y + CARD.h + 30} textAnchor="middle"
          fontSize={T.micro} fontWeight={700} fill={SIB_MARK_INK}>{k + 1}</text>
      ))}
    </g>
  );
  /* a word card: the piece the child drags (lift: a solid edge under a white face, as a toy key), the
     plate it lands in (empty: dashed), and a word that only reads the number (flat: no box at all, the
     word on a ruled line), so nothing that cannot move looks as if it could */
  const wordPlate = (label: string, x: number, y: number, w: number, h: number, o: any) => {
    if (o.flat && !o.lit) return (
      <g>
        <line x1={x + 14} y1={y + h - 12} x2={x + w - 14} y2={y + h - 12} stroke={C.rule} strokeWidth={2} strokeLinecap="round" />
        {/* a word that wraps to two lines is lifted clear of its rule, so no descender touches it */}
        {!!label && boxText(label, x, y - (fitLine(label, w - 22).lines.length > 1 ? 12 : 4), w, h, C.ink)}
      </g>
    );
    return (
      <g>
        {o.lift && !o.lit && <rect x={x} y={y + 6} width={w} height={h} rx={16} fill={shade(C.rule, 0.18)} />}
        <rect x={x} y={y} width={w} height={h} rx={16} fill={o.empty ? tint(C.panel, 0.4) : o.lit ? SIB_MARK_FACE : "#FFFFFF"}
          stroke={o.lit ? SIB_MARK_INK : o.lift ? shade(C.rule, 0.18) : C.rule} strokeWidth={o.lit ? 4 : 2} strokeDasharray={o.empty ? "9 8" : undefined} />
        {!!label && boxText(label, x, y, w, h, o.lit ? SIB_MARK_INK : C.ink)}
      </g>
    );
  };
  const drawLane = (li: number, y: number) => {
    const w0 = laneWords(li, true);
    return (
      <g key={"lane" + li}>
        {boxText(li === 0 ? "proper way" : "everyday way", 0, y, 132, LANE.h, SIB_QUIET)}
        {w0.map((wd: any, s: number) => {
          if (wd === "" || wd === undefined) return null;
          const hole = free ? -1 : (item.holes || []).findIndex((h: any) => h.lane === li && h.slot === s);
          const held = hole >= 0 ? fills[hole] : wd;
          const waiting = held === null || held === undefined;
          const glow = lit && (hole >= 0 || ((kind === "place" || (free && li === 0)) && s === w0.length - 1));
          return (
            <g key={s}>
              {wordPlate(waiting ? "" : held, laneX(s), y, LANE.w, LANE.h,
                { empty: waiting, lit: glow, flat: hole < 0, lift: hole >= 0 && !waiting && stage === "ask" })}
              {hole >= 0 && !waiting && stage === "ask" ? (
                <g className="sib-grab c4-piece" {...control("slot-" + li + "-" + s, "Move " + held)}
                  {...drag.bind({ id: held })} {...drag.keys({ id: held })}>
                  <rect x={laneX(s)} y={y} width={LANE.w} height={LANE.h} fill="transparent" />
                </g>
              ) : null}
            </g>
          );
        })}
      </g>
    );
  };

  const ledgeCards = (item.cards || []).filter((cd: string) => fills.indexOf(cd) < 0);
  const twoLanes = kind === "join" && (item.lanes || []).length > 1;
  const ledgeY = twoLanes ? 442 : 424;
  /* the child's reading, exactly as it was said: its words put into the holes of the first lane they
     change, word for word under the right reading's slots (read from the answer that missed, so it
     stands whether the words came by drag, by keys or from the agent) */
  const childLine = (() => {
    const w = wrong;
    if (kind !== "join" || !w) return null;
    const cards = (item.cards || []).slice().sort((a: string, b: string) => b.length - a.length);
    let rest = String(w.value === null || w.value === undefined ? "" : w.value).trim();
    const got = (item.holes || []).map(() => {
      const hit = cards.find((cd: string) => rest === cd || rest.indexOf(cd + " ") === 0);
      if (!hit) return null;
      rest = rest.slice(hit.length).trim();
      return hit;
    });
    for (const li of item.lanes || []) {
      const right = sibLane(String(item.num), (item.reads || [])[li]);
      const mine = right.slice();
      (item.holes || []).forEach((h: any, k: number) => { if (h.lane === li) mine[h.slot] = got[k] || "___"; });
      if (mine.join(" ") !== right.join(" ")) {
        /* the same row in the language in use, for drawing */
        const shownRow = sibLane(String(item.num), (item.reads || [])[li], lang, tx);
        (item.holes || []).forEach((h: any, k: number) => { if (h.lane === li) shownRow[h.slot] = got[k] ? tx(got[k]) : "___"; });
        return { li, ws: mine, wsT: shownRow };
      }
    }
    return null;
  })();
  const ledgeX0 = sibRow(Math.max(ledgeCards.length, 1), LANE.w, 20);
  const plateCx = (k: string) => (k === "left" ? Math.min(B.leftC, W.w / 2 - 158) : Math.max(B.rightC, W.w / 2 + 158));

  const invite = (() => {
    if (stage !== "ask" || busy) return null;
    if (kind === "split") {
      if (!cut) return { x: B.px + PT.w / 2, y: 14 + CARD.h / 2, r: 60 };
      /* the pulse stays clear of the working area's floor at 528 */
      if (!plates.left && !plates.right) return { x: sibRow(2, 300, 60) + 150, y: 462, r: 54 };
      return null;
    }
    /* the pulse sits on the empty joining slot, never on a word card: on a question with one gap the
       first card of the ledge would be the answer itself */
    if (kind === "join") return fills.filter(Boolean).length || !(item.holes || []).length ? null
      : { x: laneX(item.holes[0].slot) + LANE.w / 2, y: laneTop(item.holes[0].lane) + LANE.h / 2, r: 54 };
    if (kind === "place") return count ? null : { x: 543, y: 358, r: 66 };
    if (kind === "write") return touched ? null : { x: 543, y: 150, r: 60 };
    return null;
  })();

  const runsDone = stage === "idle" || stage === "summary" ? (phase.items || []).length : index + (stage === "win" ? 1 : 0);
  const runsBig = free ? String(parts.dec.length) : runsDone + " / " + (phase.items || []).length;

  return (
    <g>
      <style>{SIB_CSS}</style>

      {/* the running count: sentences finished against the sentences this phase lays out */}
      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        <text x={18} y={-56 + T.xl * 0.36} fontSize={T.xl} fontWeight={700} fill={C.ink}>{runsBig}</text>
        <text x={314} y={-56 + T.micro * 0.36} textAnchor="end" fontSize={T.micro} fontWeight={500} fill={C.ink}>{tx(free ? "places" : "sentences")}</text>
      </g>

      {/* ── phase 1: the bar, the two plates under its halves, and the labels ── */}
      {(kind === "split" || kind === "side") && (
        <g>
          {barAt(B, kind === "side" ? 40 : 14, { litWhole: lit && kind === "split", litDec: lit && kind === "side" })}
          {kind === "split" && !cut && stage === "ask" && (
            <Hit id="open-bar" label="Open the bar at the point" x={B.px + PT.w / 2 - 36} y={14} w={72} h={CARD.h} onPress={openBar} />
          )}
          {kind === "split" && cut && ["left", "right"].map((k) => {
            const cx = plateCx(k), id = plates[k];
            return (
              <g key={k}>
                <path d={`M ${k === "left" ? B.leftC : B.rightC} 122 L ${cx} 156`} stroke={C.rule} strokeWidth={2} fill="none" />
                {wordPlate(id ? SIB_SIDE_WORDS[id] : "", cx - 150, 160, 300, 92, { empty: !id, lit: lit && !!id, lift: !!id && stage === "ask" })}
                {id && stage === "ask" ? (
                  <g className="sib-grab c4-piece" {...control("placed-" + k, "Move " + SIB_SIDE_WORDS[id])}
                    {...drag.bind({ id })} {...drag.keys({ id })}>
                    <rect x={cx - 150} y={160} width={300} height={92} fill="transparent" />
                  </g>
                ) : null}
              </g>
            );
          })}
          {kind === "split" && (item.tray || []).map((id: string, k: number) => {
            if (plates.left === id || plates.right === id) return null;
            return (
              <g key={id} className="sib-grab c4-piece" {...control("card-" + id, "Drop " + SIB_SIDE_WORDS[id] + " under a half")}
                {...drag.bind({ id })} {...drag.keys({ id })}>
                {wordPlate(SIB_SIDE_WORDS[id], sibRow(2, 300, 60) + k * 360, 420, 300, 92, { lift: true })}
              </g>
            );
          })}
          {kind === "side" && ["left", "right"].map((k) => {
            const x = k === "left" ? B.x0 : B.rx0, w = Math.max(k === "left" ? B.lw : B.rw, 72);
            return (
              <g key={k}>
                {side === k && <rect x={x - 10} y={30} width={w + 20} height={CARD.h + 20} rx={22} fill="none" stroke={SIB_MARK_INK} strokeWidth={5} />}
                <Hit id={"half-" + k} label={k === "left" ? "The half before the dot" : "The half after the dot"}
                  x={x - 10} y={30} w={w + 20} h={CARD.h + 20} onPress={() => pickSide(k)} />
              </g>
            );
          })}
          {/* the correction: each half read on its own, under the label that names it */}
          {shown && (
            <g data-role="reading" pointerEvents="none" className="sib-in">
              {["left", "right"].map((k, j) => {
                if (shown.step < j + 1) return null;
                const cx = plateCx(k), digits = k === "left" ? parts.whole : parts.dec;
                const colour = k === "left" ? SIB.whole : SIB.dec;
                return (
                  <g key={k}>
                    <rect x={cx - 150} y={286} width={300} height={118} rx={18} fill={sibFace(colour)} stroke={sibInk(colour)} strokeWidth={2} />
                    <text x={cx} y={344} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={sibInk(colour)}>{digits}</text>
                    <text x={cx} y={386} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(SIB_SIDE_WORDS[k === "left" ? "whole" : "part"])}</text>
                  </g>
                );
              })}
            </g>
          )}
        </g>
      )}

      {/* ── phase 2: the bar, the reading lanes and the ledge of words ── */}
      {kind === "join" && (
        <g>
          {barAt(B, 6, {})}
          {/* the two names are held apart, so a short number never runs them into each other */}
          {["whole", "part"].map((sk, j) => (
            <text key={sk} x={j === 0 ? Math.min(B.leftC, W.w / 2 - 148) : Math.max(B.rightC, W.w / 2 + 148)}
              y={136} textAnchor="middle" fontSize={T.micro} fontWeight={600}
              fill={sibInk(j === 0 ? SIB.whole : SIB.dec)}>{tx(SIB_SIDE_WORDS[sk])}</text>
          ))}
          {(item.lanes || []).map((li: number) => drawLane(li, laneTop(li)))}
          {stage === "ask" && ledgeCards.map((cd: string, k: number) => (
            <g key={cd} className="sib-grab c4-piece" {...control("card-" + cd.replace(/ /g, "-"), "Drop " + cd + " into a gap")}
              {...drag.bind({ id: cd })} {...drag.keys({ id: cd })}>
              {wordPlate(cd, ledgeX0 + k * (LANE.w + 20), ledgeY, LANE.w, LANE.h, { lift: true })}
            </g>
          ))}
          {shown && (() => {
            /* one row per reading, the words in the same four columns as the lanes' slots: the right
               reading of each lane with its joining word lit, then the child's own reading under a rule,
               with nothing lit in it */
            const lanes = item.lanes || [];
            const nRows = lanes.length + (childLine ? 1 : 0);
            /* two lanes with the ledge emptied into them (every miss on them is built from both cards):
               the box stands clear of the lower lane and keeps the single lane's roomier rows */
            const tight = twoLanes && ledgeCards.length > 0;
            const top = tight ? 326 : twoLanes ? 346 : 262, pitch = tight ? 34 : 40, off = tight ? 30 : 36;
            const childY = top + off + lanes.length * pitch;
            const colX = (s: number) => laneX(s) + LANE.w / 2;
            const rowOf = (label: string, ws: any[], y: number, right: boolean, key: string) => (
              <g key={key}>
                <text x={18} y={y} fontSize={T.micro} fontWeight={500} fill={SIB_QUIET}>{tx(label)}</text>
                {ws.map((wd: string, s: number) => (!wd ? null : (
                  <text key={s} x={colX(s)} y={y} textAnchor="middle" fontSize={T.micro}
                    fontWeight={right && s === 1 ? 700 : 500} fill={right && s === 1 ? SIB_MARK_INK : C.ink}>{wd}</text>
                )))}
              </g>
            );
            return (
              <g data-role="reading" pointerEvents="none" className="sib-in">
                <rect x={0} y={top} width={W.w} height={off + (nRows - 1) * pitch + 12} rx={18} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
                {lanes.slice(0, shown.rows).map((li: number, r: number) =>
                  rowOf(li === 0 ? "proper" : "everyday", sibLane(String(item.num), (item.reads || [])[li], lang, tx), top + off + r * pitch, true, "r" + li))}
                {childLine && shown.rows > lanes.length && (
                  <g className="sib-in">
                    <line x1={18} y1={childY - 25} x2={W.w - 18} y2={childY - 25}
                      stroke={C.rule} strokeWidth={2} strokeDasharray="6 6" />
                    {rowOf("you said", childLine.wsT, childY, false, "mine")}
                  </g>
                )}
              </g>
            );
          })()}
        </g>
      )}

      {/* ── phase 3: the count from the point outwards, and the sentence waiting for its last word ── */}
      {kind === "place" && (
        <g>
          {barAt(B, 20, { countTo: count })}
          {shown && shown.name && (
            <text data-role="reading" pointerEvents="none" className="sib-in" x={sibClamp(sibCellX(B, parts.dec.length - 1) + CARD.w / 2, 110, W.w - 110)} y={186}
              textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={SIB_MARK_INK}>{tx(item.answer)}</text>
          )}
          {drawLane(0, 210)}
          <Key id="count-places" label={tx("Count the places")} x={373} y={320} w={340} h={76} C={C} onClick={runCount}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("Count the places")}</text>
          </Key>
          {shown && shown.name && (
            <g data-role="reading" pointerEvents="none" className="sib-in">
              <rect x={293} y={420} width={500} height={90} rx={18} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
              <text x={420} y={476} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{wordsIn(parts.dec.length, lang)} {tx("places")}</text>
              <text x={660} y={476} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={SIB_MARK_INK}>{tx(item.answer)}</text>
            </g>
          )}
        </g>
      )}

      {/* ── phase 4: the heard sentence, and the number written from it ── */}
      {kind === "write" && (
        <g>
          <g data-role="reading">
            {[wordsIn(item.heard.whole, lang), tx("and"), wordsIn(item.heard.part, lang), tx(item.heard.place)].map((wd: string, k: number) => {
              const x = sibRow(4, 240, 16) + k * 256;
              return (
                <g key={k}>
                  <rect x={x} y={10} width={240} height={90} rx={16} fill={k === 3 ? SIB_MARK_FACE : "#FFFFFF"}
                    stroke={k === 3 ? SIB_MARK_INK : C.rule} strokeWidth={k === 3 ? 4 : 2} />
                  {boxText(wd, x, 10, 240, 90, k === 3 ? SIB_MARK_INK : C.ink)}
                </g>
              );
            })}
          </g>
          <Key id="say-again" label={tx("Say it again")} x={403} y={112} w={280} h={76} C={C} onClick={sayAgain}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("Say it again")}</text>
          </Key>
          {/* the places the last word asks for, drawn empty from the first frame and filled from the
             left as the child writes: the place name settles how many boxes there are before there is
             a digit to put in any of them. One box waits for the whole number part, and grows with it. */}
          {(() => {
            const need = SIB_PLACES.indexOf(item.heard.place) + 1;
            const wrote = sibCut(num);
            const head = wrote.whole || "0";
            const cells = Math.max(need, wrote.dec.length);
            const F = sibBar(head + "." + new Array(cells + 1).join("0"), true);
            const lastDec = wrote.dec.length - 1;
            /* a very long number still stands inside the working area */
            const s = F.x0 < 10 ? (W.w - 20) / (W.w - 2 * F.x0) : 1;
            return (
              <g transform={s < 1 ? `translate(${W.w / 2},258) scale(${s}) translate(${-W.w / 2},-258)` : undefined}>
                {head.split("").map((ch: string, k: number) => (wrote.whole
                  ? digitCard(ch, F.x0 + k * (CARD.w + CARD.gap), 206, SIB.whole, "", "fw" + k)
                  : emptyCard(F.x0 + k * (CARD.w + CARD.gap), 206, "fw" + k)))}
                <rect x={F.px} y={206} width={PT.w} height={CARD.h} rx={7} fill={SIB.point} />
                {new Array(cells).fill(0).map((_z: any, k: number) => (k < wrote.dec.length
                  ? digitCard(wrote.dec[k], sibCellX(F, k), 206, SIB.dec, lit ? "lit" : "", "fd" + k)
                  : emptyCard(sibCellX(F, k), 206, "fd" + k)))}
                {/* the place the child's last digit has reached, named under it */}
                {(lit || (shown && shown.need)) && lastDec >= 0 && lastDec < 3 && (
                  <text data-role="reading" x={sibClamp(sibCellX(F, lastDec) + CARD.w / 2, 110, W.w - 110)} y={342}
                    textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={SIB_QUIET}>{tx(SIB_PLACES[lastDec])}</text>
                )}
              </g>
            );
          })()}
          {shown && shown.need && (() => {
            const heard = String(item.heard.part).slice(0, shown.need);
            const cells = shown.need, lead = cells - heard.length;
            const wholeStr = String(item.heard.whole);
            const bb = sibBar(wholeStr + "." + new Array(cells + 1).join("0"), true);
            return (
              <g data-role="reading" pointerEvents="none" className="sib-in">
                {wholeStr.split("").map((ch: string, k: number) =>
                  digitCard(ch, bb.x0 + k * (CARD.w + CARD.gap), 360, SIB.whole, "", "cw" + k))}
                <rect x={bb.px} y={360} width={PT.w} height={CARD.h} rx={7} fill={SIB.point} />
                {new Array(cells).fill(0).map((_z: any, k: number) => {
                  const x = sibCellX(bb, k), from = k - lead;
                  if (from >= 0 && from >= heard.length - shown.fill) return digitCard(heard[from], x, 360, SIB.dec, "", "cd" + k);
                  if (k < lead && shown.zero) return digitCard("0", x, 360, SIB.dec, "zero", "cz" + k);
                  return emptyCard(x, 360, "ce" + k);
                })}
                {shown.zero && lead > 0 && (() => {
                  const x2 = sibCellX(bb, lead - 1) + CARD.w / 2;
                  return <path d={`M ${bb.px + PT.w + 6} 350 L ${x2} 350 M ${x2 - 15} 342 L ${x2} 350 L ${x2 - 15} 358`}
                    stroke={SIB_MARK_INK} strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />;
                })()}
                {shown.read && (
                  <text x={W.w / 2} y={506} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{item.answer}</text>
                )}
              </g>
            );
          })()}
        </g>
      )}

      {/* ── free play: any number, both readings, nothing to get right ── */}
      {free && (
        <g>
          {own === null ? barAt(B, 20, { countTo: count }) : (() => {
            /* the number as it is typed: the point stands only once it is typed, and the next card waits
               with a caret at the end */
            const row: any[] = [];
            parts.whole.split("").forEach((ch: string) => row.push({ t: "w", ch }));
            if (own.indexOf(".") >= 0) row.push({ t: "p" });
            parts.dec.split("").forEach((ch: string) => row.push({ t: "d", ch }));
            if (parts.dec.length < 3) row.push({ t: "c" });
            const wOf = (r: any) => (r.t === "p" ? PT.w : CARD.w);
            const gapOf = (a: any, b: any) => (a.t === "p" || b.t === "p" ? PT.gap : CARD.gap);
            let tw = 0;
            row.forEach((r: any, k: number) => { tw += wOf(r) + (k ? gapOf(row[k - 1], r) : 0); });
            let x = (W.w - tw) / 2;
            return (
              <g data-role="typing">
                {row.map((r: any, k: number) => {
                  if (k) x += gapOf(row[k - 1], r);
                  const at = x;
                  x += wOf(r);
                  if (r.t === "p") return <rect key={k} x={at} y={20} width={PT.w} height={CARD.h} rx={7} fill={SIB.point} />;
                  if (r.t === "c") return (
                    <g key={k}>
                      {emptyCard(at, 20, "caret-card")}
                      <line className="sib-caret" x1={at + CARD.w / 2} y1={44} x2={at + CARD.w / 2} y2={20 + CARD.h - 24} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
                    </g>
                  );
                  return digitCard(r.ch, at, 20, r.t === "w" ? SIB.whole : SIB.dec, "", "o" + k);
                })}
              </g>
            );
          })()}
          {own === null && stage === "free" && (
            <Hit id="free-bar" label="Type your own number onto the bar" x={B.x0 - 10} y={10} w={W.w - 2 * B.x0 + 20} h={CARD.h + 20} onPress={startOwn} />
          )}
          {/* the read-aloud, beside the number it reads: the bar's widest reach (3 + 3 digits) ends at 851
             and its tap box at 861, so the key keeps well apart from both, its right edge in line with
             the proper lane's last word */}
          {stage === "free" && (
            <Key id="free-say" label={tx("Say it, both readings")} x={908} y={30} w={168} h={84} C={C} onClick={sayFree}>
              <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("Say it")}</text>
            </Key>
          )}
          {(own === null || (parts.whole.length > 0 && parts.dec.length > 0)) && drawLane(0, 196)}
          {(own === null || (parts.whole.length > 0 && parts.dec.length > 0)) && drawLane(1, 286)}
          {[["new", "New number", () => { const k = freeK + 1; setFreeK(k); freeSet((s: string) => sibFreeNum(k, Math.max(1, sibCut(s).dec.length))); }],
            ["own", own !== null ? "Keep it" : "Your number", startOwn],
            ["more", "More places", () => freeSet(sibGrow)],
            ["fewer", "Fewer places", () => freeSet(sibShrink)],
            ["count", "Count them", () => { if (ownRef.current !== null) endOwn(true); runCount(); }]].map((row: any, k: number) => (
            <Key key={row[0]} id={"free-" + row[0]} label={tx(row[1])} x={sibRow(5, 204, 16) + k * 220} y={420} w={204} h={80} C={C} onClick={row[2]}>
              <text y={10} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(row[1])}</text>
            </Key>
          ))}
        </g>
      )}

      {/* the card under the finger */}
      {drag.drag && drag.drag.moved && (
        <g pointerEvents="none">
          {wordPlate(SIB_SIDE_WORDS[drag.drag.payload.id] || drag.drag.payload.id,
            drag.drag.x - (kind === "split" ? 150 : LANE.w / 2), drag.drag.y - (kind === "split" ? 46 : 40),
            kind === "split" ? 300 : LANE.w, kind === "split" ? 92 : LANE.h, { lit: true })}
        </g>
      )}

      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
/* the number is taken from the phase's own item (the question the child last got right) and, on a
   written answer, from the value the child wrote: the shared fields may be a render behind the answer */
function Thumb({ n, result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const L = (result && result.last) || {};
  const ph: any = PHASES[(Number(n) || 0) - 1] || {};
  const it: any = (ph.items || [])[L.item] || {};
  const kind = L.kind || it.kind || "";
  const top = kind === "write" ? String(L.value || it.answer || "") : String(it.num || (L.shared || {}).number || "");
  if (!top || top.indexOf(".") < 0) return null;
  const c = sibCut(top);
  const bottom = kind === "write" ? String((it.heard || {}).place || sibPlaceOf(c.dec))
    : kind === "place" || kind === "join" ? String(L.answer || it.answer || "")
    : kind === "side" ? "pieces" : "two parts";
  /* a small bar: blue cards, the vermilion point, green cards; amber on what the answer pointed at */
  const cw = 30, ch = lang === "en" ? 40 : 34, g = 3, pg = 7, pw = 7;   /* Hindi and Gujarati words stand taller: the cards leave them room */
  const nw = c.whole.length, nd = c.dec.length;
  const total = nw * cw + Math.max(0, nw - 1) * g + pg + pw + pg + nd * cw + Math.max(0, nd - 1) * g;
  const x0 = (w - total) / 2, px = x0 + nw * cw + Math.max(0, nw - 1) * g + pg, rx = px + pw + pg;
  const card = (d: string, x: number, colour: string, mark: boolean, key: string) => {
    const ink = mark ? SIB_MARK_INK : sibInk(colour);
    return (
      <g key={key}>
        <rect x={x} y={7} width={cw} height={ch} rx={6} fill={mark ? SIB_MARK_FACE : sibFace(colour)} stroke={ink} strokeWidth={mark ? 2.5 : 1.5} />
        <text x={x + cw / 2} y={7 + ch / 2 + 9} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={ink}>{d}</text>
      </g>
    );
  };
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {c.whole.split("").map((d, k) => card(d, x0 + k * (cw + g), SIB.whole, false, "w" + k))}
      <rect x={px} y={7} width={pw} height={ch} rx={3} fill={SIB.point} />
      {c.dec.split("").map((d, k) => card(d, rx + k * (cw + g), SIB.dec, kind === "side" || (kind === "place" && k === nd - 1), "d" + k))}
      <text x={w / 2} y={h - 8} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{sibShow(bottom, tx)}</text>
    </g>
  );
}

function SayItBar(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, pointKey: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null }} />
  );
}

export default SayItBar;
