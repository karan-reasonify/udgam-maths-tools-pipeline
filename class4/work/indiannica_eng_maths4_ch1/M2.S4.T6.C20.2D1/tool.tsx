/* ═══ M2.S4.T6.C20.2D1 · two_systems · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "two_systems";
const MEDIA_ID = "M2.S4.T6.C20.2D1";
const TOOL_NAME = "Two Systems, One Number";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["The same digits, and two charts. Lay the commas in from the right."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "One number written two ways, and both of them right.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Any number, either chart, and the switch is yours.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r13+: `lineFor(line, lang, TR)`); the
   English stays what the checks read and what a reading is judged in. NCERT class 4 terms (आवर्त /
   આવર્ત, भारतीय / अंतरराष्ट्रीय पद्धति, मिलियन); digits stay digits (the runtime speaks them in the
   language in use); a reading on the strip is drawn with wordsIn. A first draft; wants a native
   speaker's read. */
const TR: any = {
  hi: {
    "Two Systems, One Number": "दो पद्धतियाँ, एक संख्या",
    "The same digits, and two charts. Lay the commas in from the right.": "वही अंक, और दो चार्ट। दाईं ओर से अल्पविराम लगाओ।",
    "One number written two ways, and both of them right.": "एक संख्या दो तरह से लिखी, और दोनों सही।",
    "Free play. Any number, either chart, and the switch is yours.": "मुक्त खेल। कोई भी संख्या, कोई भी चार्ट, और स्विच तुम्हारा।",
    "The Indian chart groups two, two and three": "भारतीय चार्ट में दो, दो और तीन के समूह",
    "Commas go in from the right. Count three places, then two, then two.": "अल्पविराम दाईं ओर से लगते हैं। तीन स्थान गिनो, फिर दो, फिर दो।",
    "How many places are in the first group?": "पहले समूह में कितने स्थान हैं?",
    "Put a finger on the ones card. Count left, three cards, then two.": "इकाई के कार्ड पर उँगली रखो। बाईं ओर गिनो, तीन कार्ड, फिर दो।",
    "The Indian chart groups the places three, then two, then two, counted in from the right.": "भारतीय चार्ट दाईं ओर से गिनकर स्थानों को तीन, फिर दो, फिर दो में बाँटता है।",
    "You learned: Indian commas group three, then two, then two.": "तुमने सीखा: भारतीय अल्पविराम तीन, फिर दो, फिर दो के समूह बनाते हैं।",
    "Lay the Indian commas": "भारतीय अल्पविराम लगाओ",
    "Drag the commas into this number, the Indian way. Then press enter.": "इस संख्या में भारतीय तरीके से अल्पविराम खींचकर लगाओ। फिर एंटर दबाओ।",
    "Which end did you count from?": "तुमने किस सिरे से गिना?",
    "Now this number. Lay its Indian commas, then press enter.": "अब यह संख्या। इसके भारतीय अल्पविराम लगाओ, और एंटर दबाओ।",
    "Start at the ones card. How many cards come before the first comma?": "इकाई के कार्ड से शुरू करो। पहले अल्पविराम से पहले कितने कार्ड आते हैं?",
    "One more. Lay the Indian commas.": "एक और। भारतीय अल्पविराम लगाओ।",
    "After the first group of three, how many go in each group?": "तीन के पहले समूह के बाद, हर समूह में कितने आते हैं?",
    "The international chart groups three, three and three": "अंतरराष्ट्रीय चार्ट में तीन, तीन और तीन के समूह",
    "Watch the digits, not the commas. Throw the switch. Did any digit move?": "अल्पविराम नहीं, अंक देखो। स्विच दबाओ। क्या कोई अंक हिला?",
    "Not one digit moved. Only the commas slid along.": "एक भी अंक नहीं हिला। सिर्फ़ अल्पविराम खिसके।",
    "The same digits now sit in the international chart.": "वही अंक अब अंतरराष्ट्रीय चार्ट में हैं।",
    "Which group does the leftmost digit belong to in each chart?": "हर चार्ट में सबसे बाईं ओर का अंक किस समूह में है?",
    "In this chart, every group counted from the right has three places.": "इस चार्ट में, दाईं ओर से गिने हर समूह में तीन स्थान हैं।",
    "Only the grouping moves. Two sets of commas can sit under one row of digits and neither is wrong.": "सिर्फ़ समूह बदलते हैं। अंकों की एक पंक्ति में दो तरह के अल्पविराम हो सकते हैं, और कोई भी गलत नहीं।",
    "You learned: a new chart moves the commas, never the digits.": "तुमने सीखा: नया चार्ट अल्पविराम खिसकाता है, अंक कभी नहीं।",
    "International commas": "अंतरराष्ट्रीय अल्पविराम",
    "Now you lay the international commas into the same digits.": "अब तुम उन्हीं अंकों में अंतरराष्ट्रीय अल्पविराम लगाओ।",
    "Count from the ones card. How many places go in each group here?": "इकाई के कार्ड से गिनो। यहाँ हर समूह में कितने स्थान आते हैं?",
    "Lay the international commas into this number, then press enter.": "इस संख्या में अंतरराष्ट्रीय अल्पविराम लगाओ, फिर एंटर दबाओ।",
    "How many places are left after the first group of three?": "तीन के पहले समूह के बाद कितने स्थान बचते हैं?",
    "Last one. Lay the international commas.": "आखिरी। अंतरराष्ट्रीय अल्पविराम लगाओ।",
    "Does each group you made have three places?": "क्या तुम्हारे बनाए हर समूह में तीन स्थान हैं?",
    "Each period is read with its own name": "हर आवर्त उसके अपने नाम के साथ पढ़ा जाता है",
    "Read a big number one chunk at a time. Read the chunk, then say its name.": "बड़ी संख्या को एक-एक हिस्सा करके पढ़ो। हिस्सा पढ़ो, फिर उसका नाम बोलो।",
    "What does the chart call that chunk?": "चार्ट उस हिस्से को क्या कहता है?",
    "Read just one band of digits, then the name above it.": "अंकों की सिर्फ़ एक पट्टी पढ़ो, फिर उसके ऊपर का नाम।",
    "A number is read one period at a time, each followed by its name, and the ones period keeps its name unspoken.": "संख्या एक-एक आवर्त करके पढ़ी जाती है, हर एक के बाद उसका नाम, पर इकाई आवर्त का नाम नहीं बोला जाता।",
    "You learned: read period by period; the ones name is not said.": "तुमने सीखा: आवर्त-आवर्त पढ़ो; इकाई का नाम नहीं बोलते।",
    "Read it out": "पढ़कर सुनाओ",
    "Read this number the Indian way, chunk by chunk. Tap a name to say after a chunk, then press enter.": "इस संख्या को भारतीय तरीके से, हिस्सा-हिस्सा पढ़ो। हर हिस्से के बाद नाम पर टैप करो, फिर एंटर दबाओ।",
    "How many digits are in the chunk you are reading?": "जो हिस्सा तुम पढ़ रहे हो, उसमें कितने अंक हैं?",
    "Write it in numerals": "अंकों में लिखो",
    "Write two hundred four thousand six hundred one in numerals.": "दो सौ चार हज़ार छह सौ एक को अंकों में लिखो।",
    "Which digits go in the thousands chunk?": "हज़ार वाले हिस्से में कौन से अंक जाते हैं?",
    "Write seven hundred thousand four hundred seven in numerals.": "सात सौ हज़ार चार सौ सात को अंकों में लिखो।",
    "Every chunk after the first needs three digits. Where do the zeros go?": "पहले के बाद हर हिस्से में तीन अंक चाहिए। शून्य कहाँ जाएँगे?",
    "One lakh, one million, and the numbers from the first page": "एक लाख, एक मिलियन, और पहले पन्ने की संख्याएँ",
    "Ten lakh make one million. The switch shows both names for one amount.": "दस लाख मिलकर एक मिलियन बनते हैं। स्विच एक ही मात्रा के दोनों नाम दिखाता है।",
    "Throw the switch. Which chunk does the question ask about?": "स्विच दबाओ। सवाल किस हिस्से के बारे में पूछता है?",
    "Read that whole chunk as one number, not just its first digit.": "उस पूरे हिस्से को एक संख्या की तरह पढ़ो, सिर्फ़ पहला अंक नहीं।",
    "Ten lakh and one million are two names for one amount, so one library can be counted in either.": "दस लाख और एक मिलियन एक ही मात्रा के दो नाम हैं, इसलिए एक पुस्तकालय किसी में भी गिना जा सकता है।",
    "You learned: ten lakh and one million are one amount, two names.": "तुमने सीखा: दस लाख और एक मिलियन, एक मात्रा, दो नाम।",
    "9 million is how many lakh?": "9 मिलियन कितने लाख?",
    "A library holds 9 million books. How many lakh is that?": "एक पुस्तकालय में 9 मिलियन किताबें हैं। यह कितने लाख हुईं?",
    "How many lakh make one million?": "कितने लाख मिलकर एक मिलियन बनते हैं?",
    "Thousands in one lakh?": "एक लाख में कितने हज़ार?",
    "How many thousands make one lakh?": "कितने हज़ार मिलकर एक लाख बनते हैं?",
    "Throw the switch to the international chart. Read its thousands chunk.": "स्विच को अंतरराष्ट्रीय चार्ट पर करो। उसका हज़ार वाला हिस्सा पढ़ो।",
    "Which one is international?": "कौन सा अंतरराष्ट्रीय है?",
    "The opening page gives ten thousand students and nine million books. Which of those uses an international period name?": "पहले पन्ने पर दस हज़ार विद्यार्थी और नौ मिलियन किताबें हैं। इनमें से किसमें अंतरराष्ट्रीय आवर्त का नाम है?",
    "Look at the period names on each chart. Which name is on only one?": "हर चार्ट पर आवर्तों के नाम देखो। कौन सा नाम सिर्फ़ एक पर है?",
    /* the working area's own words, and the choices */
    "ones": "इकाई", "tens": "दहाई", "hundreds": "सैकड़ा", "thousands": "हज़ार", "ten thousands": "दस हज़ार", "lakhs": "लाख", "ten lakhs": "दस लाख",
    "hundred thousands": "सौ हज़ार", "millions": "मिलियन", "lakh": "लाख", "thousand": "हज़ार", "million": "मिलियन",
    "Indian": "भारतीय", "international": "अंतरराष्ट्रीय", "System switch, now Indian": "पद्धति का स्विच, अभी भारतीय", "System switch, now international": "पद्धति का स्विच, अभी अंतरराष्ट्रीय",
    "1 lakh": "1 लाख", "100 thousand": "100 हज़ार", "? thousand": "? हज़ार", "10 lakh": "10 लाख", "1 million": "1 मिलियन",
    "Say lakh": "लाख बोलो", "Say thousand": "हज़ार बोलो", "Say million": "मिलियन बोलो", "Say ones": "इकाई बोलो",
    "10,000 students": "10,000 विद्यार्थी", "9 million books": "9 मिलियन किताबें",
    "Opening page, 10,000 students": "पहला पन्ना, 10,000 विद्यार्थी", "Opening page, 9 million books": "पहला पन्ना, 9 मिलियन किताबें",
    "Commas": "अल्पविराम", "Lay the commas": "अल्पविराम लगाओ", "Read it": "पढ़ो",
    "ten thousand": "दस हज़ार", "nine million": "नौ मिलियन", "both": "दोनों", "neither": "कोई नहीं",
  },
  gu: {
    "Two Systems, One Number": "બે પદ્ધતિ, એક સંખ્યા",
    "The same digits, and two charts. Lay the commas in from the right.": "એ જ અંક, અને બે ચાર્ટ. જમણી બાજુથી અલ્પવિરામ મૂકો.",
    "One number written two ways, and both of them right.": "એક સંખ્યા બે રીતે લખી, અને બંને સાચી.",
    "Free play. Any number, either chart, and the switch is yours.": "મુક્ત રમત. કોઈ પણ સંખ્યા, કોઈ પણ ચાર્ટ, અને સ્વિચ તમારી.",
    "The Indian chart groups two, two and three": "ભારતીય ચાર્ટમાં બે, બે અને ત્રણનાં જૂથ",
    "Commas go in from the right. Count three places, then two, then two.": "અલ્પવિરામ જમણી બાજુથી મુકાય છે. ત્રણ સ્થાન ગણો, પછી બે, પછી બે.",
    "How many places are in the first group?": "પહેલા જૂથમાં કેટલાં સ્થાન છે?",
    "Put a finger on the ones card. Count left, three cards, then two.": "એકમના કાર્ડ પર આંગળી મૂકો. ડાબી તરફ ગણો, ત્રણ કાર્ડ, પછી બે.",
    "The Indian chart groups the places three, then two, then two, counted in from the right.": "ભારતીય ચાર્ટ જમણી બાજુથી ગણીને સ્થાનોને ત્રણ, પછી બે, પછી બેમાં વહેંચે છે.",
    "You learned: Indian commas group three, then two, then two.": "તમે શીખ્યા: ભારતીય અલ્પવિરામ ત્રણ, પછી બે, પછી બેનાં જૂથ બનાવે છે.",
    "Lay the Indian commas": "ભારતીય અલ્પવિરામ મૂકો",
    "Drag the commas into this number, the Indian way. Then press enter.": "આ સંખ્યામાં ભારતીય રીતે અલ્પવિરામ ખેંચીને મૂકો. પછી એન્ટર દબાવો.",
    "Which end did you count from?": "તમે કયા છેડેથી ગણ્યું?",
    "Now this number. Lay its Indian commas, then press enter.": "હવે આ સંખ્યા. તેના ભારતીય અલ્પવિરામ મૂકો, અને એન્ટર દબાવો.",
    "Start at the ones card. How many cards come before the first comma?": "એકમના કાર્ડથી શરૂ કરો. પહેલા અલ્પવિરામ પહેલાં કેટલાં કાર્ડ આવે છે?",
    "One more. Lay the Indian commas.": "એક વધુ. ભારતીય અલ્પવિરામ મૂકો.",
    "After the first group of three, how many go in each group?": "ત્રણના પહેલા જૂથ પછી, દરેક જૂથમાં કેટલા આવે છે?",
    "The international chart groups three, three and three": "આંતરરાષ્ટ્રીય ચાર્ટમાં ત્રણ, ત્રણ અને ત્રણનાં જૂથ",
    "Watch the digits, not the commas. Throw the switch. Did any digit move?": "અલ્પવિરામ નહીં, અંક જુઓ. સ્વિચ દબાવો. શું કોઈ અંક ખસ્યો?",
    "Not one digit moved. Only the commas slid along.": "એક પણ અંક ન ખસ્યો. ફક્ત અલ્પવિરામ ખસ્યા.",
    "The same digits now sit in the international chart.": "એ જ અંક હવે આંતરરાષ્ટ્રીય ચાર્ટમાં છે.",
    "Which group does the leftmost digit belong to in each chart?": "દરેક ચાર્ટમાં સૌથી ડાબો અંક કયા જૂથમાં છે?",
    "In this chart, every group counted from the right has three places.": "આ ચાર્ટમાં, જમણેથી ગણેલા દરેક જૂથમાં ત્રણ સ્થાન છે.",
    "Only the grouping moves. Two sets of commas can sit under one row of digits and neither is wrong.": "ફક્ત જૂથ બદલાય છે. અંકોની એક હારમાં બે રીતના અલ્પવિરામ હોઈ શકે, અને એક પણ ખોટા નથી.",
    "You learned: a new chart moves the commas, never the digits.": "તમે શીખ્યા: નવો ચાર્ટ અલ્પવિરામ ખસેડે છે, અંક ક્યારેય નહીં.",
    "International commas": "આંતરરાષ્ટ્રીય અલ્પવિરામ",
    "Now you lay the international commas into the same digits.": "હવે તમે એ જ અંકોમાં આંતરરાષ્ટ્રીય અલ્પવિરામ મૂકો.",
    "Count from the ones card. How many places go in each group here?": "એકમના કાર્ડથી ગણો. અહીં દરેક જૂથમાં કેટલાં સ્થાન આવે છે?",
    "Lay the international commas into this number, then press enter.": "આ સંખ્યામાં આંતરરાષ્ટ્રીય અલ્પવિરામ મૂકો, પછી એન્ટર દબાવો.",
    "How many places are left after the first group of three?": "ત્રણના પહેલા જૂથ પછી કેટલાં સ્થાન બાકી રહે છે?",
    "Last one. Lay the international commas.": "છેલ્લી. આંતરરાષ્ટ્રીય અલ્પવિરામ મૂકો.",
    "Does each group you made have three places?": "શું તમે બનાવેલા દરેક જૂથમાં ત્રણ સ્થાન છે?",
    "Each period is read with its own name": "દરેક આવર્ત તેના પોતાના નામ સાથે વંચાય છે",
    "Read a big number one chunk at a time. Read the chunk, then say its name.": "મોટી સંખ્યાને એક એક ભાગ કરીને વાંચો. ભાગ વાંચો, પછી તેનું નામ બોલો.",
    "What does the chart call that chunk?": "ચાર્ટ તે ભાગને શું કહે છે?",
    "Read just one band of digits, then the name above it.": "અંકોની ફક્ત એક પટ્ટી વાંચો, પછી તેની ઉપરનું નામ.",
    "A number is read one period at a time, each followed by its name, and the ones period keeps its name unspoken.": "સંખ્યા એક એક આવર્ત કરીને વંચાય છે, દરેક પછી તેનું નામ, પણ એકમ આવર્તનું નામ બોલાતું નથી.",
    "You learned: read period by period; the ones name is not said.": "તમે શીખ્યા: આવર્ત પ્રમાણે વાંચો; એકમનું નામ બોલાતું નથી.",
    "Read it out": "વાંચી સંભળાવો",
    "Read this number the Indian way, chunk by chunk. Tap a name to say after a chunk, then press enter.": "આ સંખ્યાને ભારતીય રીતે, ભાગ પ્રમાણે વાંચો. દરેક ભાગ પછી નામ પર ટૅપ કરો, પછી એન્ટર દબાવો.",
    "How many digits are in the chunk you are reading?": "તમે જે ભાગ વાંચો છો, તેમાં કેટલા અંક છે?",
    "Write it in numerals": "અંકોમાં લખો",
    "Write two hundred four thousand six hundred one in numerals.": "બસો ચાર હજાર છસો એકને અંકોમાં લખો.",
    "Which digits go in the thousands chunk?": "હજારના ભાગમાં કયા અંક જાય છે?",
    "Write seven hundred thousand four hundred seven in numerals.": "સાતસો હજાર ચારસો સાતને અંકોમાં લખો.",
    "Every chunk after the first needs three digits. Where do the zeros go?": "પહેલા પછી દરેક ભાગમાં ત્રણ અંક જોઈએ. શૂન્ય ક્યાં જશે?",
    "One lakh, one million, and the numbers from the first page": "એક લાખ, એક મિલિયન, અને પહેલા પાનાની સંખ્યાઓ",
    "Ten lakh make one million. The switch shows both names for one amount.": "દસ લાખ મળીને એક મિલિયન બને છે. સ્વિચ એક જ રકમનાં બંને નામ બતાવે છે.",
    "Throw the switch. Which chunk does the question ask about?": "સ્વિચ દબાવો. પ્રશ્ન કયા ભાગ વિશે પૂછે છે?",
    "Read that whole chunk as one number, not just its first digit.": "તે આખા ભાગને એક સંખ્યા તરીકે વાંચો, ફક્ત પહેલો અંક નહીં.",
    "Ten lakh and one million are two names for one amount, so one library can be counted in either.": "દસ લાખ અને એક મિલિયન એક જ રકમનાં બે નામ છે, તેથી એક પુસ્તકાલય કોઈમાં પણ ગણી શકાય.",
    "You learned: ten lakh and one million are one amount, two names.": "તમે શીખ્યા: દસ લાખ અને એક મિલિયન, એક રકમ, બે નામ.",
    "9 million is how many lakh?": "9 મિલિયન કેટલા લાખ?",
    "A library holds 9 million books. How many lakh is that?": "એક પુસ્તકાલયમાં 9 મિલિયન પુસ્તકો છે. તે કેટલા લાખ થયા?",
    "How many lakh make one million?": "કેટલા લાખ મળીને એક મિલિયન બને?",
    "Thousands in one lakh?": "એક લાખમાં કેટલા હજાર?",
    "How many thousands make one lakh?": "કેટલા હજાર મળીને એક લાખ બને?",
    "Throw the switch to the international chart. Read its thousands chunk.": "સ્વિચને આંતરરાષ્ટ્રીય ચાર્ટ પર કરો. તેનો હજારનો ભાગ વાંચો.",
    "Which one is international?": "કયું આંતરરાષ્ટ્રીય છે?",
    "The opening page gives ten thousand students and nine million books. Which of those uses an international period name?": "પહેલા પાના પર દસ હજાર વિદ્યાર્થીઓ અને નવ મિલિયન પુસ્તકો છે. આમાંથી કોનામાં આંતરરાષ્ટ્રીય આવર્તનું નામ છે?",
    "Look at the period names on each chart. Which name is on only one?": "દરેક ચાર્ટ પર આવર્તનાં નામ જુઓ. કયું નામ ફક્ત એક પર છે?",
    /* the working area's own words, and the choices */
    "ones": "એકમ", "tens": "દશક", "hundreds": "શતક", "thousands": "હજાર", "ten thousands": "દસ હજાર", "lakhs": "લાખ", "ten lakhs": "દસ લાખ",
    "hundred thousands": "સો હજાર", "millions": "મિલિયન", "lakh": "લાખ", "thousand": "હજાર", "million": "મિલિયન",
    "Indian": "ભારતીય", "international": "આંતરરાષ્ટ્રીય", "System switch, now Indian": "પદ્ધતિની સ્વિચ, હમણાં ભારતીય", "System switch, now international": "પદ્ધતિની સ્વિચ, હમણાં આંતરરાષ્ટ્રીય",
    "1 lakh": "1 લાખ", "100 thousand": "100 હજાર", "? thousand": "? હજાર", "10 lakh": "10 લાખ", "1 million": "1 મિલિયન",
    "Say lakh": "લાખ બોલો", "Say thousand": "હજાર બોલો", "Say million": "મિલિયન બોલો", "Say ones": "એકમ બોલો",
    "10,000 students": "10,000 વિદ્યાર્થીઓ", "9 million books": "9 મિલિયન પુસ્તકો",
    "Opening page, 10,000 students": "પહેલું પાનું, 10,000 વિદ્યાર્થીઓ", "Opening page, 9 million books": "પહેલું પાનું, 9 મિલિયન પુસ્તકો",
    "Commas": "અલ્પવિરામ", "Lay the commas": "અલ્પવિરામ મૂકો", "Read it": "વાંચો",
    "ten thousand": "દસ હજાર", "nine million": "નવ મિલિયન", "both": "બંને", "neither": "એક પણ નહીં",
  },
};

/* ── the two charts: seven columns that every layer shares ──────────────────────────────
   The Indian chart sits above the digit row, the international chart below it, the same
   columns in the same places, so one digit card stands in a column of both at once. */
const PLACES_IN = ["ones", "tens", "hundreds", "thousands", "ten thousands", "lakhs", "ten lakhs"];
const HEAD_IN = [["ones"], ["tens"], ["hundreds"], ["thousands"], ["ten", "thousands"], ["lakhs"], ["ten", "lakhs"]];
const HEAD_INTL = [["ones"], ["tens"], ["hundreds"], ["thousands"], ["ten", "thousands"], ["hundred", "thousands"], ["millions"]];
/* the chapter's period colours: ones deep blue, thousands green, lakhs vermilion, millions rose;
   amber settles the answer (the comma tiles, the gap under discussion); grey is a zero holding a place */
const PER: any = {
  ones: { name: "ones", word: "", color: CONTENT.hundred },
  thousands: { name: "thousands", word: "thousand", color: CONTENT.one },
  lakhs: { name: "lakhs", word: "lakh", color: CONTENT.pointer },
  millions: { name: "millions", word: "million", color: CONTENT.bead },
};
const SYS: Record<string, any[]> = {
  indian: [{ ...PER.ones, places: [0, 1, 2], size: 1 }, { ...PER.thousands, places: [3, 4], size: 1e3 }, { ...PER.lakhs, places: [5, 6], size: 1e5 }],
  intl: [{ ...PER.ones, places: [0, 1, 2], size: 1 }, { ...PER.thousands, places: [3, 4, 5], size: 1e3 }, { ...PER.millions, places: [6], size: 1e6 }],
};
const AMBER = CONTENT.ten;
const ZERO = "#767676";
/* numerals and words take a deeper ink of their colour, so they read at 4.5:1; bands keep the true colour */
const ink = (c: string) => shade(c, 0.25);
const periodIdx = (sy: string, k: number) => Math.max(0, SYS[sy].findIndex((P: any) => P.places.includes(Math.min(k, 6))));
/* the period names a reading may add after a chunk (the word keys of phase 3) */
const NAMES = ["lakh", "thousand", "million", "ones"];

/* geometry in working-area units (1086 × 528). Columns are 150 wide so every heading fits at the
   type floor; the ones column is on the right. Gap g sits between place g+1 and place g. */
const CW = 150, X0 = 18, CARD_W = 108;
const colX = (k: number) => X0 + (6 - k) * CW;
const colC = (k: number) => colX(k) + CW / 2;
const gapX = (g: number) => colX(g);
const G = { ipY: 0, ipH: 36, ihY: 40, ihH: 60, rowY: 108, rowH: 108, tileY: 222, railY: 246, xhY: 264, xhH: 60, xpY: 328, xpH: 36,
  stripY: 376, stripH: 52, ctrlY: 446, ctrlH: 76 };
/* the comma dock: right under the rail's end when there is one chart, in the controls row with two */
const DOCK = { x: 868, y: 446, w: 200, h: 76, y1: 276 };
const dockTop = (charts: number) => (charts === 1 ? DOCK.y1 : DOCK.y);
const dockSlot = (i: number, charts = 2) => ({ x: DOCK.x + 62 + i * 76, y: dockTop(charts) + DOCK.h / 2 });
const SPARE = { x: 1066, y: G.tileY };
const SWITCH = { x: 18, y: G.ctrlY, w: 460, h: 76 };

/* ── numbers ─────────────────────────────────────────────────────────────────────────── */
const digitStr = (v: number) => String(Math.max(0, Math.trunc(Number(v) || 0)));
/* where a chart wants its commas in an n-digit number: Indian 3 then every 2, international every 3 */
const wantGaps = (sy: string, n: number) => (sy === "indian" ? [2, 4, 6] : [2, 5, 8]).filter((g) => g <= n - 2);
const park = (gs: number[]) => [gs[0] ?? -1, gs[1] ?? -1];
const withCommas = (ds: string, gaps: number[]) => {
  let out = "";
  for (let i = 0; i < ds.length; i++) { const k = ds.length - 1 - i; out += ds[i]; if (k >= 1 && gaps.includes(k - 1)) out += ","; }
  return out;
};
/* comma positions written in a string ("56,87,709" -> gaps 2 and 4), counted from the right */
const gapsOfString = (s: string) => {
  const out: number[] = [];
  let d = 0;
  for (let i = s.length - 1; i >= 0; i--) { if (s[i] === ",") out.push(d - 1); else if (/\d/.test(s[i])) d++; }
  return out.sort((a, b) => a - b);
};
/* the periods of a number, left to right, each read as a number and then its name (ones: no name) */
const chunksOf = (v: number, sy: string) => SYS[sy].map((P: any, pi: number) => {
  const next = SYS[sy][pi + 1];
  const val = Math.floor(v / P.size) % (next ? next.size / P.size : 1e9);
  return { pi, val, words: val ? words(val) : "", name: P.word, color: P.color, places: P.places };
}).filter((c: any) => c.val > 0).reverse();
const readingOf = (v: number, sy: string) => chunksOf(v, sy).map((c: any) => c.words + (c.name ? " " + c.name : "")).join(" ");
/* the same reading in Hindi or Gujarati, for the voice and the strip only (the English is what is judged) */
const readingIn = (v: number, sy: string, lg: string) => chunksOf(v, sy).map((c: any) => wordsIn(c.val, lg) + (c.name ? " " + TR[lg][c.name] : "")).join(" ");
/* a strip part keeps its chunk's value and name, so the strip can draw it in the language in use */
const partOf = (c: any) => ({ text: c.words + (c.name ? " " + c.name : ""), color: ink(c.color), val: c.val, name: c.name });
const norm = (s: any) => String(s ?? "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   demo?   { ... } when the phase opens on the child's one physical act (see api.demoDone)
   items   the authored fallback: three a phase, the third tests whether the phase landed.
   kinds:  commas (lay the comma tiles for one chart, Enter commits) · read (name each chunk on the
           working area, Enter commits) · numeral (type the number a reading names) · count (type
           how many of one unit make the other) · which (a word choice)
   A spoken question never holds the number on the chart: the voice reads numbers as Indian words,
   which would lay the commas for the child. */
const PHASES = [
  {
    n: 1,
    concept: "The Indian chart groups two, two and three",
    conceptId: "M2.S4.T6.C20", objectiveIds: ["O9"],
    says: ["Commas go in from the right. Count three places, then two, then two."],
    ladder: ["How many places are in the first group?", "Put a finger on the ones card. Count left, three cards, then two."],
    closing: "The Indian chart groups the places three, then two, then two, counted in from the right.",
    learned: "You learned: Indian commas group three, then two, then two.",
    traceback: "The cards are counted in from the right, three then two; the gaps light and the commas end in the right gaps.",
    items: [
      /* learn ML1: answer in the plan = 56,87,709, grouped as two, then two, then three */
      { qid: "M2.S4.T6.C20:ML1", kind: "commas", system: "indian", start: 5687709, answer: 5687709, plan: "56,87,709", pad: "enter", winMs: 3900,
        ask: "Lay the Indian commas", say: "Drag the commas into this number, the Indian way. Then press enter.", miss: "Which end did you count from?" },
      /* practice 1: answer in the plan = 3,25,047 */
      { qid: "M2.S4.T6.C20:1", kind: "commas", system: "indian", start: 325047, answer: 325047, plan: "3,25,047", pad: "enter", winMs: 3900,
        ask: "Lay the Indian commas", say: "Now this number. Lay its Indian commas, then press enter.", miss: "Start at the ones card. How many cards come before the first comma?" },
      /* practice 2: answer in the plan = 7,52,368, seven lakh fifty-two thousand three hundred sixty-eight
         (the words are printed on the reading strip when it is right; they are not asked) */
      { qid: "M2.S4.T6.C20:2", kind: "commas", system: "indian", start: 752368, answer: 752368, plan: "7,52,368", pad: "enter", winMs: 3900,
        ask: "Lay the Indian commas", say: "One more. Lay the Indian commas.", miss: "After the first group of three, how many go in each group?" },
    ],
  },
  {
    n: 2,
    concept: "The international chart groups three, three and three",
    conceptId: "M2.S4.T6.C21", objectiveIds: ["O9"],
    says: ["Watch the digits, not the commas. Throw the switch. Did any digit move?"],
    /* the plan's delight: the child throws the switch once and watches the commas slide */
    demo: { start: 5687709 },
    demoLines: ["Not one digit moved. Only the commas slid along.", "The same digits now sit in the international chart."],
    ladder: ["Which group does the leftmost digit belong to in each chart?", "In this chart, every group counted from the right has three places."],
    closing: "Only the grouping moves. Two sets of commas can sit under one row of digits and neither is wrong.",
    learned: "You learned: a new chart moves the commas, never the digits.",
    traceback: "Every card draws a line into its column in both charts, the commas slide back, and the cards are counted in threes from the right.",
    items: [
      /* learn ML2: answer in the plan = 5,687,709 */
      { qid: "M2.S4.T6.C21:ML2", kind: "commas", system: "intl", start: 5687709, answer: 5687709, plan: "5,687,709", pad: "enter", winMs: 3900,
        ask: "International commas", say: "Now you lay the international commas into the same digits.", miss: "Count from the ones card. How many places go in each group here?" },
      /* practice 3: answer in the plan = 652,104 */
      { qid: "M2.S4.T6.C21:3", kind: "commas", system: "intl", start: 652104, answer: 652104, plan: "652,104", pad: "enter", winMs: 3900,
        ask: "International commas", say: "Lay the international commas into this number, then press enter.", miss: "How many places are left after the first group of three?" },
      /* practice 4: answer in the plan = 963,258, nine hundred sixty-three thousand two hundred fifty-eight */
      { qid: "M2.S4.T6.C21:4", kind: "commas", system: "intl", start: 963258, answer: 963258, plan: "963,258", pad: "enter", winMs: 3900,
        ask: "International commas", say: "Last one. Lay the international commas.", miss: "Does each group you made have three places?" },
    ],
  },
  {
    n: 3,
    concept: "Each period is read with its own name",
    conceptId: "M2.S4.T6.C22", objectiveIds: ["O10"],
    says: ["Read a big number one chunk at a time. Read the chunk, then say its name."],
    ladder: ["What does the chart call that chunk?", "Read just one band of digits, then the name above it."],
    closing: "A number is read one period at a time, each followed by its name, and the ones period keeps its name unspoken.",
    learned: "You learned: read period by period; the ones name is not said.",
    traceback: "The bands come forward and each chunk lifts while the strip reads it, digits then name, ending on the right reading or number.",
    items: [
      /* learn ML3: answer in the plan = Fifty-six lakh eighty-seven thousand seven hundred nine */
      { qid: "M2.S4.T6.C22:ML3", kind: "read", system: "indian", start: 5687709, answer: "fifty-six lakh eighty-seven thousand seven hundred nine", pad: "enter", winMs: 4600,
        ask: "Read it out", say: "Read this number the Indian way, chunk by chunk. Tap a name to say after a chunk, then press enter.",
        miss: "How many digits are in the chunk you are reading?" },
      /* practice 5: answer in the plan = 2,04,601 */
      { qid: "M2.S4.T6.C22:5", kind: "numeral", system: "intl", answer: 204601, near: 24601, winMs: 3400,
        ask: "Write it in numerals", say: "Write two hundred four thousand six hundred one in numerals.", miss: "Which digits go in the thousands chunk?" },
      /* practice 6: answer in the plan = 7,00,407 */
      { qid: "M2.S4.T6.C22:6", kind: "numeral", system: "intl", answer: 700407, near: 70407, winMs: 3400,
        ask: "Write it in numerals", say: "Write seven hundred thousand four hundred seven in numerals.", miss: "Every chunk after the first needs three digits. Where do the zeros go?" },
    ],
  },
  {
    n: 4,
    concept: "One lakh, one million, and the numbers from the first page",
    conceptId: "M2.S4.T6.C23", objectiveIds: ["O10"],
    says: ["Ten lakh make one million. The switch shows both names for one amount."],
    ladder: ["Throw the switch. Which chunk does the question ask about?", "Read that whole chunk as one number, not just its first digit."],
    closing: "Ten lakh and one million are two names for one amount, so one library can be counted in either.",
    learned: "You learned: ten lakh and one million are one amount, two names.",
    traceback: "The conversion plates draw out to the same length, then ten lakh plates are laid end to end and counted along in tens of lakh.",
    items: [
      /* learn ML4: answer in the plan = Ninety lakh (typed as 90: the number of lakh) */
      { qid: "M2.S4.T6.C23:ML4", kind: "count", system: "intl", start: 9000000, of: 9000000, unit: 100000, answer: 90, near: 9, winMs: 3600,
        ask: "9 million is how many lakh?", say: "A library holds 9 million books. How many lakh is that?", miss: "How many lakh make one million?" },
      /* practice 7: answer in the plan = One hundred thousands (typed as 100) */
      { qid: "M2.S4.T6.C23:7", kind: "count", system: "indian", start: 100000, of: 100000, unit: 1000, answer: 100, near: 10, winMs: 3600,
        ask: "Thousands in one lakh?", say: "How many thousands make one lakh?", miss: "Throw the switch to the international chart. Read its thousands chunk." },
      /* practice 8: answer in the plan = Nine million, because million is an international period. In the Indian system that is ninety lakh */
      { qid: "M2.S4.T6.C23:8", kind: "which", system: "intl", start: 9000000, answer: "nine million", winMs: 2600,
        choices: [{ id: "ten thousand", label: "ten thousand" }, { id: "nine million", label: "nine million" }, { id: "both", label: "both" }, { id: "neither", label: "neither" }],
        ask: "Which one is international?", say: "The opening page gives ten thousand students and nine million books. Which of those uses an international period name?",
        miss: "Look at the period names on each chart. Which name is on only one?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  columns: 7, columnWidth: CW, commaTiles: 2,
  headings: { indian: HEAD_IN.map((h) => h.join(" ")), international: HEAD_INTL.map((h) => h.join(" ")) },
  periods: { indian: SYS.indian.map((P: any) => ({ name: P.name, places: P.places })), international: SYS.intl.map((P: any) => ({ name: P.name, places: P.places })) },
  conversion: [{ left: "1 lakh", right: "100 thousand" }, { left: "10 lakh", right: "1 million" }],
  openingPage: [{ figure: 10000, says: "10,000 students" }, { figure: 9000000, says: "9 million books" }],
  stateFields: ["phase", "digits", "value", "system", "commaPositions", "bandsShown", "readAloud", "complete"],
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

const commaKey = (item: any) => (item.system === "indian" ? indian(item.answer) : intl(item.answer));
/* judge: commas must sit exactly where the item's chart wants them; a reading compares as words; numbers as numbers */
const judge = (item: any, v: any) => {
  if (item.kind === "commas") return String(v ?? "").trim() === commaKey(item);
  if (item.kind === "read") return norm(v && typeof v === "object" ? v.reading : v) === norm(item.answer);
  if (item.kind === "which") return norm(v) === norm(item.answer);
  return leadNumber(v) === item.answer;
};

/* a word reading turned back into a number, word by word (shares nothing with words() or judge) */
const WORDNUM: Record<string, number> = { zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
  eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19,
  twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 };
const parseWords = (s: string) => {
  let total = 0, cur = 0, found = false;
  for (const w of String(s).toLowerCase().split(/[^a-z]+/)) {
    if (w in WORDNUM) { cur += WORDNUM[w]; found = true; }
    else if (w === "hundred") cur *= 100;
    else if (w === "thousand") { total += cur * 1000; cur = 0; }
    else if (w === "lakh") { total += cur * 100000; cur = 0; }
    else if (w === "million") { total += cur * 1000000; cur = 0; }
  }
  return found ? total + cur : null;
};

/* oracle: every answer re-derived by a second route that shares no code with judge or Work */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "commas") {
    /* group the digits by hand from the right: 3 then 2s (Indian) or 3s (international) */
    const ds = String(it.answer).split(""), sizes = it.system === "indian" ? [3, 2, 2, 2] : [3, 3, 3];
    const groups: string[] = [];
    let end = ds.length, s = 0;
    while (end > 0) { const size = sizes[Math.min(s, sizes.length - 1)]; groups.unshift(ds.slice(Math.max(0, end - size), end).join("")); end -= size; s++; }
    const built = groups.join(",");
    return built === it.plan && judge(it, built);
  }
  if (it.kind === "read") {
    const n = it.start, lakh = Math.floor(n / 100000), th = Math.floor(n / 1000) % 100, on = n % 1000;
    const built = [lakh ? words(lakh) + " lakh" : "", th ? words(th) + " thousand" : "", on ? words(on) : ""].filter(Boolean).join(" ");
    return norm(built) === norm(it.answer) && judge(it, built);
  }
  if (it.kind === "numeral") return parseWords(it.say) === it.answer && judge(it, String(it.answer));
  if (it.kind === "count") return it.of / it.unit === it.answer && it.of % it.unit === 0;
  if (it.kind === "which") {
    /* the figure whose period name is in the international list and not in the Indian one */
    const IN = ["ones", "thousand", "lakh", "crore"], INTL = ["ones", "thousand", "million", "billion"];
    const only = ["ten thousand", "nine million"].filter((f) => { const nm = f.split(" ").pop() as string; return INTL.includes(nm) && !IN.includes(nm); });
    return only.length === 1 && only[0] === it.answer && it.choices.some((c: any) => c.id === it.answer);
  }
  return false;
}));

/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => {
  if (item.kind === "commas") return item.system === "indian" ? intl(item.answer) : indian(item.answer); /* the other chart's habit */
  if (item.kind === "read") return digitStr(item.start).split("").join(" ");                            /* digit by digit */
  if (item.kind === "which") return "both";                                                              /* one system for both */
  return item.near;                                                                                      /* a zero dropped; a million taken for a lakh */
};
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) =>
  item.kind === "commas" ? [commaKey(item), String(item.answer), words(item.answer)]
    : item.kind === "read" ? [item.answer, indian(item.start)]
      : item.kind === "numeral" ? [String(item.answer), indian(item.answer), intl(item.answer)]
        : item.kind === "count" ? [String(item.answer), words(item.answer)]
          : []; /* which: the answer is one of the two figures the question names */
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => (item.kind === "commas" ? commaKey(item) : item.answer);

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const namesFor = (item: any) => chunksOf(item.start, item.system).map((c: any) => c.name || null);
const solve = (item: any, T: any) => {
  if (T.state().stage === "demo") return HOOK.demo && HOOK.demo();
  if (item.kind === "commas") { HOOK.commas(wantGaps(item.system, digitStr(item.answer).length)); setTimeout(() => HOOK.enter(), 40); return; }
  if (item.kind === "read") { HOOK.read(namesFor(item)); setTimeout(() => HOOK.enter(), 40); return; }
  return T.submit(item.answer);
};
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => {
  if (item.kind === "commas") { HOOK.commas(gapsOfString(String(v ?? ""))); return true; }
  if (item.kind === "read") return HOOK.readAs ? HOOK.readAs(String(v ?? "")) : false;
  return undefined;
};
/* the agent's check() before Enter: in the demo it throws the switch; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* a reading ("fifty-six lakh eighty-seven thousand seven hundred nine") -> the name after each chunk */
const parseNames = (v: string, num: number, sy: string) => {
  let rest = norm(v);
  const out: any[] = [];
  for (const c of chunksOf(num, sy)) {
    const w = norm(c.words);
    if (!rest.startsWith(w)) return null;
    rest = rest.slice(w.length).trim();
    const nm = NAMES.find((x) => rest === x || rest.startsWith(x + " "));
    if (nm) { out.push(nm); rest = rest.slice(nm.length).trim(); } else out.push(null);
  }
  return rest ? null : out;
};

/* what each item puts on the working area when it opens */
const BOTH = { indian: true, intl: true };
const setupOf = (it: any) => {
  const k = it.kind, s = it.system || "indian";
  if (k === "free") return { kind: k, num: 5687709, sys: "indian", tiles: park(wantGaps("indian", 7)), bands: true, named: BOTH, charts: 2, rail: "live", dock: true, conv: null };
  if (k === "demo") return { kind: k, num: it.start, sys: "indian", tiles: park(wantGaps("indian", digitStr(it.start).length)), bands: true,
    named: { indian: true, intl: false }, charts: 2, rail: "show", dock: true, conv: null };
  if (k === "commas") return { kind: k, num: it.start, sys: s, tiles: [-1, -1], bands: false, named: { indian: s === "intl", intl: false },
    charts: s === "indian" ? 1 : 2, rail: "live", dock: true, conv: null };
  if (k === "read") return { kind: k, num: it.start, sys: s, tiles: [-1, -1], bands: true, named: BOTH, charts: 2, rail: "none", dock: false, conv: null };
  if (k === "numeral") return { kind: k, num: 0, sys: s, tiles: [-1, -1], bands: true, named: BOTH, charts: 2, rail: "none", dock: false, conv: null };
  /* count, which: the switch is live and the commas ride with it */
  return { kind: k, num: it.start, sys: s, tiles: park(wantGaps(s, digitStr(it.start).length)), bands: true, named: BOTH, charts: 2, rail: "show", dock: false,
    conv: k === "count" ? (it.unit === 100000 ? "lower" : "upper") : "both" };
};
const fresh = (it: any) => {
  const s = setupOf(it);
  return {
    ...s, bandSys: s.sys, morph: null, lift: [] as number[], figs: {} as Record<number, number>, lit: [] as number[], hollow: [] as number[],
    rings: false, lines: false, strong: false,
    strip: s.kind === "numeral" ? chunksOf(it.answer, s.sys).map(partOf) : null, strip2: null as any,
    given: s.kind === "read" ? chunksOf(s.num, s.sys).map(() => ({ read: false, name: null as any })) : [],
    cursor: 0, show: null as any, said: null as any, fade: false, conv: s.conv ? { rows: s.conv, filled: s.conv !== "upper", grow: 1, count: 0 } : null,
    cells: [] as string[], fig8: null as any, touched: false,
  };
};

const TS_CSS = `
.ts-move{transition:transform 520ms cubic-bezier(.3,.7,.25,1)}
.ts-lift{transition:transform 240ms ease}
.ts-fill{transition:fill 450ms ease,stroke 450ms ease}
.ts-fade{transition:fill-opacity 700ms ease}
.ts-in{animation:tsIn 420ms ease-out both}
@keyframes tsIn{from{opacity:0}to{opacity:1}}
.ts-grab{cursor:grab}
@media (prefers-reduced-motion:reduce){.ts-move,.ts-lift,.ts-fill,.ts-fade{transition:none}.ts-in{animation:none}}
`;

/* a comma tile: an amber tile with an ink comma on it (grey while it waits as a spare) */
const COMMA_D = "M 4.96 -8 A 4.96 4.96 0 1 0 -1.24 -3.23 C 0 0.68 -1.86 6.26 -6.2 10.6 C 1.86 7.5 5.58 0.68 4.96 -8 Z";
const Tile = ({ grey, C }: any) => (
  <g filter="url(#fShadowSoft)">
    <rect x={-14} y={-22} width={28} height={44} rx={8} fill={grey ? tint(ZERO, 0.72) : "url(#gTen)"} stroke={grey ? ZERO : shade(AMBER, 0.3)} strokeWidth={2} />
    <path d={COMMA_D} fill={grey ? ZERO : C.ink} transform="scale(1.25)" />
  </g>
);

/* the system switch: a two-ended rocker, Indian at one end and international at the other */
function Rocker({ sys, live, C, onFlip, tx = (v: any) => v }: any) {
  const p = usePress(onFlip, live);
  const { x, y, w, h } = SWITCH, half = w / 2, right = sys === "intl";
  const lab = (t: string, cx: number, sel: boolean) => (
    <text x={cx} y={y + h / 2 + 11} textAnchor="middle" fontSize={T.label} fontWeight={600} className="ts-fill" style={{ fill: sel && live ? "#FFFFFF" : C.ink } as any}>{t}</text>
  );
  const body = (
    <g>
      {live && <rect x={x} y={y + EDGE} width={w} height={h} rx={h / 2} fill={shade(C.rule, 0.08)} />}
      <g className="c4-body" style={{ transform: `translateY(${live && p.down ? EDGE : 0}px)` } as any}>
        <rect className="c4-face" x={x} y={y} width={w} height={h} rx={h / 2} fill={live ? "url(#gKey)" : tint(C.panel, 0.55)} stroke={live ? C.rule : tint(C.rule, 0.35)} strokeWidth={2} />
        <g className="ts-move" style={{ transform: `translateX(${right ? half : 0}px)` } as any}>
          <rect x={x + 6} y={y + 6} width={half - 12} height={h - 12} rx={(h - 12) / 2} fill={live ? C.accent : tint(C.accent, 0.72)} />
        </g>
        {live && <path d={`M ${x + h / 2} ${y + 3} H ${x + w - h / 2}`} stroke="#FFFFFF" strokeOpacity={0.9} strokeWidth={3} strokeLinecap="round" />}
        {lab(tx("Indian"), x + half / 2, !right)}
        {lab(tx("international"), x + half + half / 2, right)}
      </g>
    </g>
  );
  /* one element whether live or not, so keyboard focus stays on it while it flips */
  return (
    <g className={"c4-ctl" + (live ? "" : " is-off") + (live && p.down ? " is-down" : "")} data-control="switch" role="button" tabIndex={live ? 0 : -1}
      aria-disabled={live ? undefined : "true"} aria-label={tx("System switch, now " + (right ? "international" : "Indian"))} {...p.bind()} onKeyDown={p.keys}>{body}</g>
  );
}

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const [st, setSt] = useState<any>(() => fresh(phase.demo ? { kind: "demo", ...phase.demo } : item));
  const S = useRef(st); S.current = st;
  const patch = (o: any) => setSt((s: any) => { const v = typeof o === "function" ? o(s) : o; const nx = { ...s, ...v }; S.current = nx; return nx; });
  const setupFor = useRef(phase.demo ? -1 : 0);
  const lastMoved = useRef(0);
  const liftTimer = useRef<any>(null);
  useEffect(() => () => clearTimeout(liftTimer.current), []);
  const busy = tl.busy;
  const kind = st.kind;

  const reset = (it: any) => { tl.stop(); const f = fresh(it); S.current = f; setSt(f); api.lock(false); };
  useEffect(() => {
    if (stage === "ask" && setupFor.current !== index) { setupFor.current = index; reset(item); }
  }, [stage, index]);
  /* free play (the plan's freePlay): any number, either chart, the switch, the commas and the reading */
  useEffect(() => {
    if (!free) return;
    setupFor.current = -2;
    reset({ kind: "free" });
  }, [free]);

  /* the digit row: the chart's number, or what the child types when the answer is a numeral */
  const typedDigits = String(typed || "").replace(/\D/g, "").slice(0, 7);
  const shown = kind === "numeral" && st.show !== null && st.show !== undefined ? digitStr(st.show) : null;
  const ds = kind === "numeral" ? shown ?? typedDigits : digitStr(st.num);
  const nd = ds.length;
  const value = kind === "numeral" ? (ds ? Number(ds) : 0) : st.num;
  const onRail = st.tiles.filter((g: number) => g >= 0).sort((a: number, b: number) => a - b);
  const cardsN = free || kind === "numeral" ? 7 : nd;
  const bandN = free || kind === "numeral" ? 7 : nd;
  const stripY = G.stripY;

  /* live controls */
  const railLive = !busy && ((stage === "ask" && kind === "commas") || free);
  const switchLive = !busy && (stage === "demo" || (stage === "ask" && (kind === "count" || kind === "which")) || free);
  const readLive = !busy && stage === "ask" && kind === "read";
  const figLive = !busy && stage === "ask" && kind === "which";

  /* the chart holds seven places: an eighth typed digit is not taken, so the slot and the row agree */
  useEffect(() => {
    if (kind !== "numeral" || stage !== "ask") return;
    const d = String(typed || "").replace(/\D/g, "");
    if (d.length > 7) api.setTyped(d.slice(0, 7));
  }, [typed]);
  /* keyboard focus goes somewhere sensible after a comma moves (pointer presses never take focus) */
  const focusLater = (id: string) => setTimeout(() => { try { const el: any = document.querySelector("[data-control=\"" + id + "\"]"); if (el) el.focus(); } catch (e) {} }, 60);
  const byKeys = (id: string) => { try { const a: any = document.activeElement; return !!a && a.getAttribute && a.getAttribute("data-control") === id; } catch (e) { return false; } };

  /* ── the comma tiles ── */
  const moveTile = (i: number, g: number) => {
    const s0 = S.current, t = s0.tiles.slice();
    const other = t.indexOf(g);
    if (g >= 0 && other >= 0 && other !== i) t[other] = -1;
    t[i] = g;
    patch({ tiles: t, hollow: [], lit: [], touched: true, strip: s0.kind === "free" ? null : s0.strip });
  };
  const tapGap = (g: number) => {
    if (!railLive) return;
    const kb = byKeys("gap-" + g);
    const t = S.current.tiles, at = t.indexOf(g);
    if (at >= 0) { moveTile(at, -1); api.sfx.tick(); return; }
    let i = t.indexOf(-1);
    if (i < 0) i = lastMoved.current;
    lastMoved.current = i;
    moveTile(i, g); api.sfx.tick();
    if (kb) {
      /* from the keyboard: on to the next free gap leftwards while a comma still waits, else the comma just laid */
      const now = t.map((x: number, j: number) => (j === i ? g : x === g ? -1 : x));
      let nx = -1;
      if (now.includes(-1)) for (let h = g + 1; h <= nd - 2; h++) if (!now.includes(h)) { nx = h; break; }
      focusLater(nx >= 0 ? "gap-" + nx : "comma-" + i);
    }
  };
  const nearestGap = (p: any) => {
    if (!(p.y > G.rowY - 30 && p.y < G.railY + 60)) return null;
    const g = Math.round(6 - (p.x - X0) / CW);
    return g >= 0 && g <= nd - 2 && Math.abs(p.x - gapX(g)) <= 75 ? g : null;
  };
  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (!pay || pay.src !== "tile" || !railLive) return;
    /* a finger or mouse leaves no keyboard focus on the tile, so the next Enter reaches the pad */
    if (isFinite(p.x)) { try { (document.activeElement as any)?.blur?.(); } catch (e) {} }
    const i = pay.i, cur = S.current.tiles[i];
    if (!moved) {
      const kb = !isFinite(p.x);
      if (cur >= 0) { moveTile(i, -1); if (kb) focusLater("gap-" + cur); }           /* a tap takes a laid comma out */
      else if (kb) { const t = S.current.tiles; let h = 0; while (h <= nd - 2 && t.includes(h)) h++; if (h <= nd - 2) focusLater("gap-" + h); } /* Enter on a waiting comma: choose a gap */
      api.sfx.tick();
      return;
    }
    const g = nearestGap(p);
    if (g === null) { moveTile(i, -1); return; }                          /* let go off the rail: it goes back */
    lastMoved.current = i;
    moveTile(i, g); api.sfx.tick();
  });

  /* ── the switch: the commas slide, the bands regroup, the digits hold still (the plan's delight) ── */
  const flipSteps = (slow: number) => {
    const s0 = S.current, from = s0.sys, to = from === "indian" ? "intl" : "indian";
    const target = wantGaps(to, digitStr(s0.num).length);
    const keep = s0.tiles.map((g: number) => (target.includes(g) ? g : null));
    const rest = target.filter((g) => !keep.includes(g));
    const next = keep.map((g: any) => (g !== null ? g : rest.length ? rest.shift() : -1));
    /* a timeline step runs, then waits: the rings hold, the commas slide while the bands regroup, it settles, the rings lift */
    const out: any[] = [[380 * slow, () => patch({ rings: true, touched: true, morph: null, bandSys: from, strip: null })]];
    out.push([75 * slow, () => { patch((s: any) => ({ sys: to, tiles: next, named: { ...s.named, [to]: true }, morph: { from, to, t: 0 } })); api.sfx.tick(); }]);
    for (let f = 1; f <= 8; f++) { const t = f / 8; out.push([75 * slow, () => patch({ morph: { from, to, t } })]); }
    out.push([500 * slow, () => patch({ morph: null, bandSys: to })]);
    out.push([80, () => patch({ rings: false })]);
    return out;
  };
  const flip = () => {
    if (!switchLive) return;
    const demo = stage === "demo";
    tl.run(flipSteps(demo ? 1.5 : 1), demo ? () => api.demoDone(phase.demoLines) : undefined);
  };
  /* everything a new run starts from: no half-finished regrouping, nothing lifted */
  const settle = () => patch((s: any) => ({ morph: null, bandSys: s.sys, rings: false, lift: [], figs: {}, lines: false, strong: false }));

  /* count the cards in from the right, one lifting per count, the gap behind each group lighting
     (and, with drop, a waiting comma sliding into it) */
  const countSteps = (sy: string, nn: number, drop: boolean, slow: number) => {
    const sizes = sy === "indian" ? [3, 2, 2] : [3, 3, 3];
    const out: any[] = [];
    let k = 0, gi = 0;
    while (k < nn) {
      const size = sizes[Math.min(gi, 2)];
      for (let j = 0; j < size && k < nn; j++, k++) {
        const place = k, fig = j + 1;
        out.push([380 * slow, () => { patch((s: any) => ({ lift: [...s.lift, place], figs: { ...s.figs, [place]: fig } })); api.sfx.tick(); }]);
      }
      if (k < nn) {
        const g = k - 1;
        out.push([420 * slow, () => patch((s: any) => ({ lit: [...s.lit, g] }))]);
        if (drop) out.push([560 * slow, () => { patch((s: any) => { const t = s.tiles.slice(), i = t.indexOf(-1); if (i >= 0) t[i] = g; return { tiles: t }; }); api.sfx.tick(); }]);
      }
      out.push([300 * slow, () => patch({ lift: [], figs: {} })]);
      gi++;
    }
    return out;
  };
  /* the reading strip filling one period at a time, each chunk lifting as it is read */
  const readSteps = (v: number, sy: string, ms: number, key: string) => {
    const cks = chunksOf(v, sy), out: any[] = [[60, () => patch({ [key]: [] })]];
    cks.forEach((c: any, i: number) => out.push([ms, () => patch({ lift: c.places.filter((k: number) => k < Math.max(digitStr(v).length, 1)), [key]: cks.slice(0, i + 1).map(partOf) })]));
    out.push([ms, () => patch({ lift: [] })]);
    return out;
  };

  /* ── the reading (phase 3): tap a chunk to read it, tap a name to say after it ── */
  const chunksNow = () => chunksOf(S.current.num, S.current.sys);
  const tapBand = (i: number) => {
    if (!readLive) return;
    const g = S.current.given.slice(), c = chunksNow()[i];
    if (g[i].name) { g[i] = { read: true, name: null }; patch({ given: g, cursor: i, touched: true, said: null }); api.sfx.tick(); return; }
    g[i] = { read: true, name: null };
    patch({ given: g, cursor: i, touched: true, said: null, lift: c.places.slice() });
    clearTimeout(liftTimer.current);
    liftTimer.current = setTimeout(() => patch({ lift: [] }), 520);
    api.say({ en: c.words, hi: wordsIn(c.val, "hi"), gu: wordsIn(c.val, "gu") });
  };
  const tapName = (nm: string) => {
    if (!readLive) return;
    /* the name goes after the chunk the reading is on; the reading then moves to the next chunk */
    const g = S.current.given.slice(), i = S.current.cursor;
    if (!(i >= 0 && i < g.length)) { api.sfx.tick(); return; }
    g[i] = { read: true, name: nm };
    if (i + 1 < g.length) g[i + 1] = { ...g[i + 1], read: true };
    patch({ given: g, cursor: i + 1, touched: true, said: null });
    api.sfx.tick();
    api.say({ en: chunksNow()[i].words + " " + nm,
      hi: wordsIn(chunksNow()[i].val, "hi") + " " + TR.hi[nm], gu: wordsIn(chunksNow()[i].val, "gu") + " " + TR.gu[nm] });
  };
  const submitReading = () => {
    const g = S.current.given;
    if (!g.some((x: any) => x.read || x.name)) return;
    const all = g.map((x: any) => ({ ...x, read: true }));
    patch({ given: all, cursor: all.length });
    const reading = chunksNow().map((c: any, i: number) => c.words + (all[i].name ? " " + all[i].name : "")).join(" ");
    api.submit({ reading, names: all.map((x: any) => x.name) });
  };

  /* ── free play: tap a card to change its digit ── */
  const bump = (k: number) => {
    if (!free || busy) return;
    const cur = S.current.num, p = Math.pow(10, k), d = Math.floor(cur / p) % 10;
    const nv = cur - d * p + ((d + 1) % 10) * p, nn = digitStr(nv).length;
    patch((s: any) => ({ num: nv, strip: null, lit: [], hollow: [], tiles: s.tiles.map((g: number) => (g > nn - 2 ? -1 : g)) }));
    api.sfx.tick();
  };
  const layCommas = () => {
    if (!free || busy) return;
    tl.run([[60, () => patch({ tiles: [-1, -1], lit: [], hollow: [], strip: null })], [520, () => {}],
      ...countSteps(S.current.sys, digitStr(S.current.num).length, true, 0.6), [400, () => patch({ lit: [] })]]);
  };
  const readOut = () => {
    if (!free || busy) return;
    api.say({ en: readingOf(S.current.num, S.current.sys),
      hi: readingIn(S.current.num, S.current.sys, "hi"), gu: readingIn(S.current.num, S.current.sys, "gu") });
    tl.run([...readSteps(S.current.num, S.current.sys, 650, "strip")]);
  };
  /* the opening page's two figures (phase 4): tap one to stand it in the row */
  const loadFig = (f: string) => {
    if (!figLive) return;
    const v = f === "students" ? 10000 : 9000000;
    patch((s: any) => ({ num: v, tiles: park(wantGaps(s.sys, digitStr(v).length)), cells: [], fig8: null, touched: true }));
    api.sfx.tick();
  };

  /* Enter (and in the demo, the agent's check) goes to the working area when it owns the answer */
  const enterFn: any =
    stage === "demo" ? (switchLive ? () => flip() : null)
      : stage !== "ask" || busy ? null
        : kind === "commas" ? () => {
          const gs = S.current.tiles.filter((g: number) => g >= 0).sort((a: number, b: number) => a - b);
          if (!gs.length) return; /* nothing laid yet */
          api.submit(withCommas(ds, gs));
        }
          : kind === "read" ? () => submitReading()
            : null;
  api.onEnter(enterFn);
  HOOK.enter = () => enterFn && enterFn();
  HOOK.demo = () => (stage === "demo" && switchLive ? (flip(), true) : undefined);
  HOOK.check = () => (stage === "demo" ? HOOK.demo() : undefined);
  HOOK.commas = (gs: number[]) => patch({ tiles: park(gs), touched: true, lit: [], hollow: [] });
  HOOK.read = (names: any[]) => patch({ given: names.map((nm: any) => ({ read: true, name: nm })), cursor: names.length, touched: true });
  HOOK.readAs = (v: string) => { const nm = parseNames(v, S.current.num, S.current.sys); if (!nm) return false; HOOK.read(nm); return true; };

  /* ── win motions: the maths moving ── */
  useEffect(() => {
    if (stage !== "win") return;
    settle();
    const it = item, sy = S.current.sys;
    if (kind === "commas") {
      tl.run([[60, () => patch((s: any) => ({ bands: true, bandSys: s.sys, named: { ...s.named, [s.sys]: true } }))], [500, () => {}],
        ...readSteps(S.current.num, sy, 650, "strip")]);
    } else if (kind === "read") {
      const cks = chunksNow();
      api.say({ en: readingOf(S.current.num, sy), hi: readingIn(S.current.num, sy, "hi"), gu: readingIn(S.current.num, sy, "gu") });
      const out: any[] = [[60, () => patch({ given: cks.map((c: any) => ({ read: true, name: c.name || null })), cursor: cks.length })]];
      cks.forEach((c: any) => out.push([700, () => patch({ lift: c.places.slice() })]));
      out.push([700, () => patch({ lift: [] })]);
      tl.run(out);
    } else if (kind === "numeral") {
      tl.run(readSteps(value, sy, 650, "strip2"));
    } else if (kind === "count") {
      const lakhs = it.unit === 100000, want = lakhs ? "indian" : "intl";
      const band = lakhs ? [5, 6] : [3, 4, 5];
      tl.run([[60, () => patch((s: any) => ({ conv: s.conv ? { ...s.conv, filled: true, grow: 1 } : s.conv }))],
        ...(sy !== want ? flipSteps(1) : []), [1100, () => patch({ lift: band })], [200, () => patch({ lift: [] })]]);
    } else if (kind === "which") {
      tl.run([[60, () => patch((s: any) => ({ num: 9000000, tiles: park(wantGaps(s.sys, 7)), fig8: "books", cells: ["intl-2"] }))], [1400, () => {}]]);
    }
  }, [stage]);

  /* ── the traceback: the mathematics redrawn in steps; nothing marked, nothing cleared ── */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    settle();
    patch({ touched: true, lit: [], hollow: [] });
    const done = () => api.lock(false);
    const s0 = S.current, sy = s0.sys;
    if (kind === "commas") {
      const said = String(wrong.value ?? "");
      const child = gapsOfString(said), right = wantGaps(sy, nd);
      const other = wantGaps(sy === "indian" ? "intl" : "indian", nd);
      const habit = child.length > 0 && child.length === other.length && child.every((g, i) => g === other[i]);
      const pre: any[] = sy === "intl" ? [[1400, () => patch({ lines: true })], [80, () => patch({ lines: false })]] : [];
      if (habit) {
        /* the other chart's grouping: the tiles go back, the count runs again, and they drop in */
        tl.run([...pre, [200, () => patch({ tiles: [-1, -1], hollow: child })], [700, () => {}], ...countSteps(sy, nd, true, 1), [300, () => patch({ lit: [] })]], done);
      } else {
        /* counted from the wrong end: figures from the right light the gaps; from the left nothing lights */
        const back: any[] = [];
        if (sy === "indian") {
          for (let j = 0; j < 3 && j < nd; j++) { const place = nd - 1 - j, fig = j + 1; back.push([420, () => patch((s: any) => ({ figs: { ...s.figs, [place]: fig } }))]); }
          back.push([600, () => patch({ figs: {} })]);
        }
        /* and the correction ends on the right commas: the child's slide into the lit gaps, their old places outlined */
        tl.run([...pre, ...countSteps(sy, nd, false, 1), ...back,
          [700, () => { patch({ tiles: park(right), hollow: child.filter((g) => !right.includes(g)), lit: [] }); api.sfx.tick(); }], [600, () => {}]], done);
      }
    } else if (kind === "read") {
      const cks = chunksNow(), v = wrong.value, said = String(v && typeof v === "object" ? v.reading : v ?? "");
      const last = cks.length - 1;
      if (norm(said) === norm(readingOf(s0.num, sy) + " ones")) {
        /* "ones" said at the end: the whole reading is printed, then that one word thins out */
        tl.run([
          [1200, () => patch({ said, given: cks.map((c: any, i: number) => ({ read: true, name: i === last ? "ones" : c.name || null })), cursor: cks.length, lift: cks[last].places.slice() })],
          [900, () => patch({ fade: true })],
          [900, () => patch((s: any) => ({ fade: false, given: s.given.map((g: any, i: number) => (i === last ? { read: true, name: null } : g)) }))],
          [80, () => patch({ lift: [] })],
        ], done);
      } else {
        /* the bands come forward; each chunk lifts as one and is read, its digits then its name */
        const out: any[] = [[80, () => patch({ said, strong: true, cursor: cks.length, given: cks.map(() => ({ read: false, name: null })) })], [500, () => {}]];
        cks.forEach((c: any, i: number) => {
          out.push([700, () => patch((s: any) => ({ lift: c.places.slice(), given: s.given.map((g: any, j: number) => (j === i ? { read: true, name: null } : g)) }))]);
          if (c.name) out.push([700, () => patch((s: any) => ({ given: s.given.map((g: any, j: number) => (j === i ? { read: true, name: c.name } : g)) }))]);
        });
        out.push([700, () => patch({ lift: [], strong: false })]);
        tl.run(out, done);
      }
    } else if (kind === "numeral") {
      /* the child's own number is read back, chunk by chunk, under the reading it was asked for */
      const dw = String(wrong.value ?? "").replace(/\D/g, "").slice(-7), vw = Number(dw) || 0;
      const out: any[] = [[80, () => patch({ strong: true, strip2: [] })], [500, () => {}]];
      chunksOf(vw, sy).forEach((c: any) => {
        out.push([700, () => patch((s: any) => ({ lift: c.places.filter((k: number) => k < dw.length), strip2: [...(s.strip2 || []), { text: c.words, color: ink(c.color), val: c.val }] }))]);
        if (c.name) out.push([600, () => patch((s: any) => { const a = (s.strip2 || []).slice(); a[a.length - 1] = { ...a[a.length - 1], text: a[a.length - 1].text + " " + c.name, name: c.name }; return { strip2: a }; })]);
      });
      out.push([900, () => patch({ lift: [] })]);
      /* then the right number stands in the row, read chunk by chunk against the reading that was asked */
      out.push([200, () => { patch({ show: item.answer, strip2: null }); api.sfx.tick(); }]);
      chunksOf(item.answer, sy).forEach((c: any) => out.push([650, () => patch({ lift: c.places.slice() })]));
      out.push([650, () => patch({ lift: [], strong: false })]);
      tl.run(out, done);
    } else if (kind === "count") {
      if (item.unit === 100000) {
        /* ten lakh against one million, drawn out together; then nine ten lakh plates counted along */
        const out: any[] = [[80, () => patch({ conv: { rows: "lower", filled: true, grow: 0, count: 0 } })]];
        for (let f = 1; f <= 6; f++) { const g = f / 6; out.push([110, () => patch((s: any) => ({ conv: { ...s.conv, grow: g } }))]); }
        out.push([900, () => {}]);
        for (let c = 1; c <= 9; c++) { const cc = c; out.push([420, () => { patch((s: any) => ({ conv: { ...s.conv, count: cc } })); api.sfx.tick(); }]); }
        out.push([700, () => {}]);
        tl.run(out, done);
      } else {
        /* the switch thrown slowly: the lakh regroups and the thousands chunk lifts as one */
        tl.run([...(sy === "indian" ? flipSteps(1.7) : []), [400, () => patch({ lift: [3, 4, 5] })],
          [900, () => patch((s: any) => ({ conv: s.conv ? { ...s.conv, filled: true, grow: 1 } : s.conv }))], [1200, () => patch({ lift: [] })]], done);
      }
    } else if (kind === "which") {
      /* each opening-page figure stood in the row: the students' comma sits where both charts agree;
         the library's name is a period only the chart below has */
      tl.run([
        [1900, () => patch((s: any) => ({ fig8: "students", num: 10000, tiles: park(wantGaps(s.sys, 5)), cells: ["indian-1", "intl-1"] }))],
        [1900, () => patch((s: any) => ({ fig8: "books", num: 9000000, tiles: park(wantGaps(s.sys, 7)), cells: ["intl-2"] }))],
      ], done);
    } else done();
  }, [wrong]);

  /* a typed answer changed after a miss: the read-back belongs to the old number */
  useEffect(() => { if (kind === "numeral" && stage === "ask" && !busy && (S.current.strip2 || S.current.show !== null)) patch({ strip2: null, show: null }); }, [typed]);

  /* ── what the host and the agent read back (toolApi.getState) ── */
  const written = kind === "numeral" ? (typedDigits ? withCommas(typedDigits, wantGaps(st.sys, nd)) : "")
    : kind === "read" ? withCommas(ds, wantGaps(st.sys, nd)) : withCommas(ds, onRail);
  api.share({ phase: n, digits: ds, value, system: st.sys === "intl" ? "international" : "indian", commaPositions: onRail, bandsShown: !!st.bands,
    readAloud: !!(st.strip && st.strip.length) || st.given.some((g: any) => g.read), written, complete: stage === "idle" });

  /* ── drawing ── */
  const coloursOn = st.bands;
  const partsML3 = kind === "read" ? (() => {
    const cks = chunksOf(st.num, st.sys), out: any[] = [];
    cks.forEach((c: any, i: number) => {
      const g = st.given[i] || {};
      if (!g.read && !g.name) return;
      out.push({ text: (out.length ? " " : "") + (lang === "en" ? c.words : wordsIn(c.val, lang)), color: ink(c.color) });
      if (g.name) out.push({ text: " " + tx(g.name), color: ink(c.color), fade: st.fade && g.name === "ones" });
    });
    return out;
  })() : null;
  /* after a miss the child's own reading, drawn in the language in use (it is kept in English) */
  const saidShown = !st.said || lang === "en" ? st.said : (() => {
    const v = wrong && wrong.value;
    const names = v && typeof v === "object" && Array.isArray(v.names) ? v.names : parseNames(st.said, st.num, st.sys);
    if (!names) return st.said;
    return chunksOf(st.num, st.sys).map((c: any, i: number) => wordsIn(c.val, lang) + (names[i] ? " " + tx(names[i]) : "")).join(" ");
  })();
  /* a reading part in the language in use: its number in words, then its period's name */
  const locPart = (p: any) => (lang === "en" || p.val === undefined ? p
    : { ...p, text: (p.text.startsWith(" ") ? " " : "") + wordsIn(p.val, lang) + (p.name ? " " + tx(p.name) : "") });
  /* the chunk the reading is on (an amber edge round its band) */
  const target = kind === "read" && readLive && st.cursor < st.given.length ? st.cursor : -1;

  const bandGeo = (sy: string, j: number) => {
    const pl = SYS[sy][j].places.filter((k: number) => k < bandN);
    if (!pl.length) return null;
    const x0 = colX(Math.max(...pl)), x1 = colX(Math.min(...pl)) + CW;
    return { x: x0 + 4, w: x1 - x0 - 8, c: SYS[sy][j].color };
  };
  const bandsNow = [0, 1, 2].map((j) => {
    if (!st.morph) return bandGeo(st.bandSys, j);
    let a = bandGeo(st.morph.from, j), b = bandGeo(st.morph.to, j);
    if (!a && !b) return null;
    if (!a) a = { x: b!.x + b!.w, w: 0, c: b!.c };
    if (!b) b = { x: a.x + a.w, w: 0, c: a.c };
    const t = st.morph.t;
    return { x: a.x + (b.x - a.x) * t, w: a.w + (b.w - a.w) * t, c: mix(a.c, b.c, t) };
  });

  const strip = (y: number, parts: any[] | null, frame: boolean, role: string, said?: string | null) => {
    if (!parts && !frame) return null;
    const ps = (parts || []).map(locPart);
    const len = ps.reduce((a: number, p: any) => a + p.text.length, 0) + (ps.length ? 0 : 0);
    const two = !!said;
    const size = !two && len * 0.56 * T.label <= 1000 ? T.label : T.micro;
    const fy = two ? G.xpY + G.xpH + 5 : y, fh = two ? 74 : G.stripH;
    return (
      <g data-role="reading" data-strip={role}>
        <rect x={X0} y={fy} width={7 * CW} height={fh} rx={16} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
        {/* after a miss the child's own reading stays on the first line; the right reading builds below it */}
        {two && <text x={X0 + (7 * CW) / 2} y={fy + 30} textAnchor="middle" fontSize={T.micro} fontWeight={500} fill={C.ink}>{said}</text>}
        {ps.length > 0 && (
          <text x={X0 + (7 * CW) / 2} y={two ? fy + 64 : y + 36} textAnchor="middle" fontSize={size} fontWeight={700}>
            {ps.map((p: any, i: number) => <tspan key={i} fill={p.color} className={p.fade !== undefined ? "ts-fade" : undefined} style={p.fade !== undefined ? ({ fillOpacity: p.fade ? 0 : 1 } as any) : undefined}>{p.text}</tspan>)}
          </text>
        )}
      </g>
    );
  };
  /* numerals read as parts need their joining spaces */
  const spaced = (ps: any[] | null) => (ps ? ps.map((p: any, i: number) => ({ ...p, text: (i ? " " : "") + p.text })) : null);

  const chart = (which: string) => {
    const heads = which === "indian" ? HEAD_IN : HEAD_INTL;
    const hY = which === "indian" ? G.ihY : G.xhY, pY = which === "indian" ? G.ipY : G.xpY;
    const on = st.sys === which, nm = st.named[which];
    const topCol = st.lines ? nd - 1 : -1;
    return (
      <g key={which}>
        {SYS[which].map((P: any, pi: number) => {
          const x0 = colX(Math.max(...P.places)), x1 = colX(Math.min(...P.places)) + CW;
          const hot = st.cells.includes(which + "-" + pi);
          const barY = which === "indian" ? pY : pY + G.ipH - 6;
          return (
            <g key={pi}>
              <rect x={x0 + 4} y={pY} width={x1 - x0 - 8} height={G.ipH} rx={12} fill={nm ? tint(P.color, 0.9) : "#FFFFFF"}
                stroke={hot ? AMBER : nm ? P.color : C.rule} strokeWidth={hot ? 5 : 2} strokeDasharray={nm || hot ? undefined : "8 7"} />
              {nm && <rect x={x0 + 16} y={barY} width={x1 - x0 - 32} height={6} rx={3} fill={P.color} />}
              {nm && <text x={(x0 + x1) / 2} y={pY + 27} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={ink(P.color)}>{tx(P.name)}</text>}
            </g>
          );
        })}
        {heads.map((ln: string[], k: number) => {
          const amber = k === topCol;
          return (
            <g key={k}>
              {/* the chart being read is the lit one: warm cells, a firm edge, bold names; the other stays plain */}
              <rect x={colX(k) + 4} y={hY} width={CW - 8} height={G.ihH} rx={12} className="ts-fill"
                style={{ fill: amber ? tint(AMBER, 0.62) : on ? mix(C.panel, "#FFFFFF", 0.1) : "#FFFFFF", stroke: st.lines && k < nd ? C.ink : on ? shade(C.rule, 0.18) : tint(C.rule, 0.45) } as any}
                strokeWidth={st.lines && k < nd ? 2.5 : on ? 2 : 1.5} />
              {(lang === "en" ? ln : [tx(ln.join(" "))]).map((w: string, i: number, arr: string[]) => ( /* one line fits in hi/gu */
                <text key={i} x={colC(k)} y={hY + (arr.length === 1 ? 40 : 27 + i * 27)} textAnchor="middle" fontSize={T.micro} fontWeight={on ? 600 : 500} fill={C.ink}>{w}</text>
              ))}
            </g>
          );
        })}
      </g>
    );
  };

  /* the running count: the number as it is written with the commas laid so far */
  const runSize = [T.xl, T.speech, T.prompt].find((sz) => written.length * sz * 0.6 <= 296) || T.prompt;
  const runChars: any[] = [];
  { let place = written.replace(/,/g, "").length - 1;
    for (const ch of written) {
      if (ch === ",") runChars.push({ ch, fill: C.ink });
      else { const k = place--; runChars.push({ ch, fill: ch === "0" && value > 0 ? ZERO : coloursOn ? ink(SYS[st.sys][periodIdx(st.sys, k)].color) : C.ink }); }
    } }

  const showSwitch = st.charts === 2 && ["demo", "commas", "count", "which", "free"].includes(kind);
  const dragging = drag.drag && drag.drag.moved && drag.drag.payload && drag.drag.payload.src === "tile" ? drag.drag : null;

  const invite =
    stage === "demo" && switchLive ? { x: SWITCH.x + SWITCH.w * 0.75, y: SWITCH.y + SWITCH.h / 2, r: 38 }
      : stage !== "ask" || index !== 0 || st.touched || busy ? null
        : kind === "commas" && st.tiles[0] < 0 ? { x: dockSlot(0, st.charts).x, y: dockSlot(0, st.charts).y, r: 38 }
          : kind === "read" ? (() => { const c = chunksOf(st.num, st.sys)[0]; const x0 = colX(Math.max(...c.places)), x1 = colX(Math.min(...c.places)) + CW; return { x: (x0 + x1) / 2, y: G.rowY + G.rowH / 2, r: 66 }; })()
            : kind === "count" ? { x: SWITCH.x + SWITCH.w * (st.sys === "intl" ? 0.25 : 0.75), y: SWITCH.y + SWITCH.h / 2, r: 38 }
              : null;

  const plate = (x: number, w: number, label: string, color: string, size: number, key: string) => (
    <g key={key}>
      <rect x={x} y={G.stripY + 4} width={Math.max(0, w)} height={44} rx={12} fill={tint(color, 0.9)} stroke={color} strokeWidth={2.5} />
      {w > 40 && <rect x={x + 6} y={G.stripY + 10} width={8} height={32} rx={4} fill={color} />}
      {label && <text x={x + w / 2 + 4} y={G.stripY + 26 + size * 0.35} textAnchor="middle" fontSize={size} fontWeight={700} fill={ink(color)}>{tx(label)}</text>}
    </g>
  );
  const conv = st.conv;
  const convRows = conv ? (conv.rows === "both" ? ["upper", "lower"] : [conv.rows]) : [];
  const pairOf = (r: string) => (r === "upper"
    ? { a: "1 lakh", ca: PER.lakhs.color, b: conv.filled ? "100 thousand" : "? thousand", cb: PER.thousands.color }
    : { a: "10 lakh", ca: PER.lakhs.color, b: "1 million", cb: PER.millions.color });

  return (
    <g>
      <style>{TS_CSS}</style>

      {/* running count, in the runs zone (64,108) */}
      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        {written && (
          <text x={165} y={-56 + runSize * 0.36} textAnchor="middle" fontSize={runSize} fontWeight={700}>
            {runChars.map((c, i) => <tspan key={i} fill={c.fill}>{c.ch}</tspan>)}
          </text>
        )}
      </g>

      {/* the charts: Indian above the row, international below it */}
      {chart("indian")}
      {st.charts === 2 && chart("intl")}

      {/* the columns are the same in both charts: a line from each card into both headings */}
      {st.lines && Array.from({ length: nd }).map((_, k) => (
        <g key={"ln" + k} stroke={C.ink} strokeWidth={2.5}>
          <line x1={colC(k)} y1={G.ihY + G.ihH} x2={colC(k)} y2={G.rowY} />
          <line x1={colC(k)} y1={G.rowY + G.rowH} x2={colC(k)} y2={G.xhY} />
        </g>
      ))}

      {/* period bands behind the digits (translucent: fill-opacity) */}
      {st.bands && bandsNow.map((b: any, j: number) => b && b.w > 0 && (
        <rect key={"b" + j} x={b.x} y={G.rowY - 6} width={b.w} height={G.rowH + 12} rx={18} fill={b.c} fillOpacity={st.strong ? 0.3 : 0.16}
          stroke={target >= 0 && chunksOf(st.num, st.sys)[target] && chunksOf(st.num, st.sys)[target].pi === j ? AMBER : "none"} strokeWidth={4} />
      ))}

      {/* the comma rail: a groove under the row, a dot at every gap a comma could take */}
      {st.rail !== "none" && nd > 1 && (
        <g>
          <rect x={colX(nd - 1) + 12} y={G.railY} width={colX(0) + CW - 12 - (colX(nd - 1) + 12)} height={8} rx={4} fill={tint(C.rule, 0.3)} />
          {railLive && Array.from({ length: nd - 1 }).map((_, g) => <circle key={"d" + g} cx={gapX(g)} cy={G.tileY + 12} r={5} fill={C.rule} />)}
          {st.hollow.map((g: number) => <rect key={"h" + g} x={gapX(g) - 15} y={G.tileY - 23} width={30} height={46} rx={9} fill="none" stroke={shade(C.rule, 0.25)} strokeWidth={2.5} strokeDasharray="5 4" />)}
          {st.lit.map((g: number) => <rect key={"l" + g} x={gapX(g) - 19} y={G.tileY - 27} width={38} height={54} rx={11} fill={AMBER} fillOpacity={0.3} stroke={AMBER} strokeWidth={3} />)}
        </g>
      )}

      {/* the digit cards: they never move sideways, whatever the chart */}
      {Array.from({ length: 7 }).map((_, k) => {
        if (k >= cardsN) return null;
        const has = k < nd, d = has ? ds[nd - 1 - k] : "";
        const up = st.lift.includes(k);
        const x = colC(k) - CARD_W / 2;
        return (
          <g key={"c" + k} className="ts-lift" style={{ transform: `translateY(${up ? -10 : 0}px)` } as any}>
            <rect x={x} y={G.rowY} width={CARD_W} height={G.rowH} rx={16} fill={has ? "#FFFFFF" : tint(C.panel, 0.55)} stroke={up ? AMBER : has ? C.rule : tint(C.rule, 0.2)}
              strokeWidth={up ? 3 : 2} strokeDasharray={has ? undefined : "8 8"} filter={has ? (up ? "url(#fLift)" : "url(#fShadowSoft)") : undefined} />
            {st.rings && has && <rect x={x - 6} y={G.rowY - 6} width={CARD_W + 12} height={G.rowH + 12} rx={20} fill="none" stroke={C.ink} strokeWidth={2.5} />}
            {has && <text x={colC(k)} y={G.rowY + 80} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={d === "0" ? ZERO : C.ink}>{d}</text>}
          </g>
        );
      })}
      {/* the count, a small ink figure under each card */}
      {Object.keys(st.figs).map((kk) => { const k = Number(kk); return <text key={"f" + k} x={colC(k)} y={G.tileY + 20} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{st.figs[k]}</text>; })}

      {/* free play: a tap on a card turns its digit on by one */}
      {free && Array.from({ length: 7 }).map((_, k) => (
        <Hit key={"ch" + k} id={"card-" + k} label={"Change the " + PLACES_IN[k] + " digit"} x={colC(k) - CARD_W / 2} y={G.rowY} w={CARD_W} h={76} onPress={() => bump(k)} />
      ))}
      {/* the reading: a tap on a chunk reads it */}
      {readLive && chunksOf(st.num, st.sys).map((c: any, i: number) => {
        const x0 = colX(Math.max(...c.places)), x1 = colX(Math.min(...c.places)) + CW;
        return <Hit key={"bh" + i} id={"chunk-" + i} label={"Read the " + SYS[st.sys][c.pi].name + " chunk"} x={x0 + 3} y={G.rowY} w={x1 - x0 - 6} h={G.rowH} onPress={() => tapBand(i)} />;
      })}

      {/* the comma dock, where waiting commas sit */}
      {st.dock && (
        <g>
          <rect x={DOCK.x} y={dockTop(st.charts)} width={DOCK.w} height={DOCK.h} rx={20} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          {[0, 1].map((i) => <rect key={"s" + i} x={dockSlot(i, st.charts).x - 17} y={dockSlot(i, st.charts).y - 25} width={34} height={50} rx={10} fill="none" stroke={shade(C.rule, 0.2)} strokeWidth={2} strokeDasharray="5 5" />)}
        </g>
      )}
      {/* gap targets: a tap lays a waiting comma there */}
      {railLive && Array.from({ length: Math.max(0, nd - 1) }).map((_, g) => !st.tiles.includes(g) && (
        <Hit key={"gh" + g} id={"gap-" + g} label={"Comma between the " + PLACES_IN[g + 1] + " and the " + PLACES_IN[g]} x={gapX(g) - 36} y={G.tileY - 36} w={72} h={72} onPress={() => tapGap(g)} />
      ))}
      {/* the two comma tiles */}
      {st.rail !== "none" && st.tiles.map((g: number, i: number) => {
        /* the tile under the finger stays mounted (the gesture lives on it), only unseen */
        const carried = !!(dragging && dragging.payload.i === i);
        const parked = g < 0;
        if (parked && !st.dock && kind !== "count" && kind !== "which") return null;
        const pos = parked ? (st.dock ? dockSlot(i, st.charts) : SPARE) : { x: gapX(g), y: G.tileY };
        const pay = { src: "tile", i };
        return (
          <g key={"t" + i} className="ts-move" style={{ transform: `translate(${pos.x}px, ${pos.y}px)` } as any}>
            <g className={railLive ? "ts-grab c4-piece" : ""} opacity={carried ? 0 : undefined} style={railLive ? ({ touchAction: "none" } as any) : undefined}
              {...(railLive ? { ...control("comma-" + i, parked ? "Comma tile, drag it to a gap or press to choose a gap" : "Comma in a gap, tap to take it out"), ...drag.bind(pay), ...drag.keys(pay) } : {})}>
              {railLive && <rect x={-36} y={-36} width={72} height={72} fill="transparent" />}
              <Tile C={C} grey={parked && !railLive} />
            </g>
          </g>
        );
      })}

      {/* the reading strip (and, after a miss on a numeral, the child's own number read back) */}
      {kind === "read" ? strip(stripY, partsML3, true, "reading", saidShown)
        : kind === "numeral" ? strip(stripY, spaced(st.strip), true, "asked")
          : st.strip && st.strip.length > 0 ? strip(stripY, spaced(st.strip), false, "reading") : null}
      {kind === "numeral" && st.strip2 && strip(G.ctrlY + 6, spaced(st.strip2), true, "yours")}

      {/* phase 4: the conversion plates, a pair the same length, or ten lakh plates counted along */}
      {conv && conv.count > 0 ? (
        <g>{Array.from({ length: conv.count }).map((_, c) => plate(25 + c * 116, 108, String((c + 1) * 10), PER.lakhs.color, T.label, "n" + c))}</g>
      ) : conv && (
        <g>{convRows.map((r: string, ri: number) => {
          const pr = pairOf(r), single = convRows.length === 1;
          const pw = single ? 300 : 210, gap = single ? 64 : 44, pairW = pw * 2 + gap;
          const x0 = single ? (W.w - pairW) / 2 : 49 + ri * (pairW + 60);
          const w = pw * conv.grow, size = single ? T.label : T.micro;
          return (
            <g key={r}>
              {plate(x0, w, conv.grow >= 1 ? pr.a : "", pr.ca, size, r + "a")}
              <text x={x0 + pw + gap / 2} y={G.stripY + 42} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>=</text>
              {plate(x0 + pw + gap, w, conv.grow >= 1 ? pr.b : "", pr.cb, size, r + "b")}
            </g>
          );
        })}</g>
      )}

      {/* the controls row */}
      {showSwitch && <Rocker sys={st.sys} live={switchLive} C={C} onFlip={flip} tx={tx} />}
      {kind === "read" && NAMES.map((nm, i) => (
        <Key key={nm} id={"name-" + nm} label={tx("Say " + nm)} x={153 + i * 200} y={G.ctrlY + 5} w={180} h={72} C={C} disabled={!readLive} onClick={() => tapName(nm)}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={readLive ? C.ink : mix(C.ink, C.panel, 0.5)}>{tx(nm)}</text>
        </Key>
      ))}
      {kind === "which" && [["students", "10,000 students", 494, 280], ["books", "9 million books", 790, 278]].map(([id, lab, x, w]: any) => (
        <g key={id}>
          <Key id={"fig-" + id} label={tx("Opening page, " + lab)} x={x} y={G.ctrlY} w={w} h={G.ctrlH} C={C} disabled={!figLive} onClick={() => loadFig(id)}>
            <text y={10} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={figLive ? C.ink : mix(C.ink, C.panel, 0.5)}>{tx(lab)}</text>
          </Key>
          {st.fig8 === id && <rect x={x - 6} y={G.ctrlY - 6} width={w + 12} height={G.ctrlH + 14} rx={24} fill="none" stroke={AMBER} strokeWidth={5} pointerEvents="none" />}
        </g>
      ))}
      {free && (
        <g>
          <Key id="lay-commas" label={tx("Lay the commas")} x={494} y={G.ctrlY} w={170} h={G.ctrlH} C={C} disabled={busy} onClick={layCommas}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={busy ? mix(C.ink, C.panel, 0.5) : C.ink}>{tx("Commas")}</text>
          </Key>
          <Key id="read-out" label={tx("Read it out")} x={680} y={G.ctrlY} w={170} h={G.ctrlH} C={C} disabled={busy} onClick={readOut}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={busy ? mix(C.ink, C.panel, 0.5) : C.ink}>{tx("Read it")}</text>
          </Key>
        </g>
      )}

      {/* the tile under the finger */}
      {dragging && <g pointerEvents="none" transform={`translate(${dragging.x},${dragging.y})`}><g filter="url(#fLift)"><Tile C={C} /></g></g>}

      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing: the child's last right answer, written in its period inks */
function Thumb({ result, C, w, h, tx = (v: any) => v }: any) {
  const L = (result && result.last) || {};
  const sh = L.shared || {};
  const box = <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />;
  if (L.kind === "which") {
    return (
      <g>
        {box}
        <rect x={16} y={h / 2 - 16} width={10} height={32} rx={5} fill={PER.millions.color} />
        <text x={w / 2 + 10} y={h / 2 + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ink(PER.millions.color)}>{tx(String(L.answer || ""))}</text>
      </g>
    );
  }
  const s = String(sh.written || (typeof L.value === "number" ? L.value : ""));
  if (!s) return null;
  const sy = sh.system === "international" ? "intl" : "indian";
  let place = s.replace(/,/g, "").length - 1;
  const chars = s.split("").map((ch) => {
    if (ch === ",") return { ch, fill: C.ink };
    const k = place--;
    return { ch, fill: ch === "0" ? ZERO : ink(SYS[sy][periodIdx(sy, k)].color) };
  });
  return (
    <g>
      {box}
      <text x={w / 2} y={h / 2 + 12} textAnchor="middle" fontSize={T.label} fontWeight={700}>
        {chars.map((c, i) => <tspan key={i} fill={c.fill}>{c.ch}</tspan>)}
      </text>
    </g>
  );
}

function TwoSystems(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default TwoSystems;
