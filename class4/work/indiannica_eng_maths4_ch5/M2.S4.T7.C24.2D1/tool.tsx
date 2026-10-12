/* ═══ M2.S4.T7.C24.2D1 · story_divider · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "story_divider";
const MEDIA_ID = "M2.S4.T7.C24.2D1";
const TOOL_NAME = "Story Divider";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A story with its numbers lit. Which one is being shared out?"];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every story shared the right way round, every zero written, and every question answered in full.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Pick any story and bring its digits down, one at a time.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r13+: `lineFor(line, lang, TR)`); the
   English stays what the checks read. NCERT class 4 terms: भाज्य भाजक भागफल शेषफल / ભાજ્ય ભાજક ભાગફળ શેષ,
   गुणनखंड / અવયવ (factor). Digits stay digits: the runtime speaks them in the language in use. Units are
   words in the spoken lines (किलोमीटर, મિલીલિટર) and the usual short forms on the picture (किमी, મિલી).
   A first draft; wants a native speaker's read. (The two-box labels and units are drawn by the runtime as
   written: r17 does not translate them.) */
const TR: any = {
  hi: {
    "Story Divider": "कहानी से भाग",
    "A story with its numbers lit. Which one is being shared out?": "एक कहानी, जिसकी संख्याएँ चमक रही हैं। कौन सी संख्या बाँटी जा रही है?",
    "Every story shared the right way round, every zero written, and every question answered in full.": "हर कहानी सही तरह से बाँटी गई, हर शून्य लिखा गया, और हर सवाल का पूरा उत्तर दिया गया।",
    "Free play. Pick any story and bring its digits down, one at a time.": "मुक्त खेल। कोई भी कहानी चुनो और उसके अंक एक-एक करके नीचे लाओ।",
    "What is shared, and into how many": "क्या बाँटा गया, और कितने में",
    "Into how many equal parts is it shared?": "इसे कितने बराबर हिस्सों में बाँटा गया है?",
    "Put each number in its place in the frame.": "हर संख्या को ढाँचे में उसकी जगह पर रखो।",
    "Which words say how many equal parts?": "कौन से शब्द बताते हैं कि कितने बराबर हिस्से हैं?",
    "Point to the number that is shared, then to the number of equal parts.": "पहले उस संख्या को दिखाओ जो बाँटी गई, फिर बराबर हिस्सों की संख्या को।",
    "The total being shared is the dividend and the number of equal parts is the divisor.": "जो कुल बाँटा जाता है वह भाज्य है, और बराबर हिस्सों की संख्या भाजक है।",
    "You learned: the whole shared is the dividend, the parts the divisor.": "तुमने सीखा: बाँटा गया कुल भाज्य है, हिस्से भाजक हैं।",
    "A van travels 456 km and uses 24 litres of petrol. Every litre carries it the same distance. How far does it go on one litre?": "एक वैन 456 किलोमीटर चलती है और 24 लीटर पेट्रोल खर्च करती है। हर लीटर में वह बराबर दूरी चलती है। एक लीटर में वह कितनी दूर जाती है?",
    "How many km per litre?": "एक लीटर में कितने किमी?",
    "Which is shared out here, the kilometres or the litres?": "यहाँ क्या बाँटा जा रहा है, किलोमीटर या लीटर?",
    "A car park has 8 levels, and every level holds the same number of cars. It holds 3,560 cars in all. How many does each level hold?": "एक पार्किंग में 8 मंज़िलें हैं, और हर मंज़िल पर बराबर कारें आती हैं। उसमें कुल 3,560 कारें आती हैं। हर मंज़िल पर कितनी कारें आती हैं?",
    "How many cars on each level?": "हर मंज़िल पर कितनी कारें?",
    "Which number is all the cars, and which is the levels?": "कौन सी संख्या सारी कारें है, और कौन सी मंज़िलें?",
    "A child answers 18 questions in 54 minutes and spends the same time on each. How many minutes does each question take?": "एक बच्चा 54 मिनट में 18 सवाल हल करता है और हर एक पर बराबर समय लगाता है। हर सवाल में कितने मिनट लगते हैं?",
    "Minutes for each question?": "हर सवाल के लिए कितने मिनट?",
    "Which is shared out here, the minutes or the questions?": "यहाँ क्या बाँटा जा रहा है, मिनट या सवाल?",
    "Finding a missing factor": "छूटा हुआ गुणनखंड ढूँढना",
    "You know the product and one number. How do you find the other?": "तुम्हें गुणनफल और एक संख्या पता है। दूसरी कैसे ढूँढोगे?",
    "Put the product and the number you know in the frame.": "गुणनफल और जानी हुई संख्या को ढाँचे में रखो।",
    "What do you do to the product with the number you know?": "जानी हुई संख्या से गुणनफल के साथ क्या करोगे?",
    "Divide the product by the number you know, then multiply back to check.": "गुणनफल को जानी हुई संख्या से भाग दो, फिर वापस गुणा करके जाँचो।",
    "A missing factor is the product divided by the factor that is known.": "छूटा हुआ गुणनखंड, गुणनफल को जाने हुए गुणनखंड से भाग देने पर मिलता है।",
    "You learned: divide the product by the known factor to find the other.": "तुमने सीखा: दूसरा गुणनखंड पाने के लिए गुणनफल को जाने हुए से भाग दो।",
    "Two numbers multiply to make 2,944, and one of them is 32. What is the other?": "दो संख्याओं का गुणा 2,944 है, और उनमें से एक 32 है। दूसरी संख्या कौन सी है?",
    "What is the other number?": "दूसरी संख्या कौन सी है?",
    "Is 2,944 the product, or one of the two numbers?": "क्या 2,944 गुणनफल है, या दोनों में से एक संख्या?",
    "Two numbers multiply to make 1,386, and one of them is 42. Find the other.": "दो संख्याओं का गुणा 1,386 है, और उनमें से एक 42 है। दूसरी संख्या निकालो।",
    "Which number is the product here, and which do you know?": "यहाँ गुणनफल कौन सी संख्या है, और तुम्हें कौन सी पता है?",
    "1,564 tiles are laid in 34 equal rows. How many tiles are in each row?": "1,564 टाइलें 34 बराबर पंक्तियों में लगाई गई हैं। हर पंक्ति में कितनी टाइलें हैं?",
    "How many tiles in each row?": "हर पंक्ति में कितनी टाइलें?",
    "Which number is all the tiles together?": "कौन सी संख्या सारी टाइलें मिलाकर है?",
    "The zero the working hides": "हल में छिपा शून्य",
    "Bring down one digit only. How many fit into that?": "सिर्फ़ एक अंक नीचे लाओ। उसमें कितने समाते हैं?",
    "Drag the next digit down, one at a time.": "अगला अंक नीचे खींचो, एक बार में एक।",
    "Is the number now being divided smaller than the divisor?": "क्या अभी भाग दी जा रही संख्या भाजक से छोटी है?",
    "Bring the digits down one at a time. Each one puts a digit in the quotient.": "अंक एक-एक करके नीचे लाओ। हर एक भागफल में एक अंक लिखता है।",
    "A zero goes in the quotient when the number brought down is smaller than the divisor. One digit at a time shows it.": "जब नीचे लाई गई संख्या भाजक से छोटी हो, तो भागफल में शून्य आता है। एक-एक अंक लाने से यह दिखता है।",
    "You learned: a number smaller than the divisor puts a 0 in the quotient.": "तुमने सीखा: भाजक से छोटी संख्या भागफल में 0 लाती है।",
    "A child works 4,968 divided by 24 and gets 27. They brought the 6 and the 8 down together. What is the right answer?": "एक बच्चा 4,968 ÷ 24 करता है और उसे 27 मिलता है। उसने 6 और 8 एक साथ नीचे लाए। सही उत्तर क्या है?",
    "What is the right answer?": "सही उत्तर क्या है?",
    "How many digits come down at a time?": "एक बार में कितने अंक नीचे आते हैं?",
    "Two numbers multiply to make 6,432, and one of them is 32. Find the other, and watch for the step that puts a zero in the quotient.": "दो संख्याओं का गुणा 6,432 है, और उनमें से एक 32 है। दूसरी संख्या निकालो, और उस चरण पर ध्यान दो जो भागफल में शून्य लाता है।",
    "When the 3 comes down, how many 32s fit?": "जब 3 नीचे आता है, तो उसमें 32 कितनी बार समाता है?",
    "A child divides 7,560 by 36 and writes 21. Multiply back to test it, then find the right quotient.": "एक बच्चा 7,560 को 36 से भाग देकर 21 लिखता है। वापस गुणा करके परखो, फिर सही भागफल निकालो।",
    "What is the right quotient?": "सही भागफल क्या है?",
    "Multiply 36 by 21. Does it make 7,560?": "36 को 21 से गुणा करो। क्या 7,560 बनता है?",
    "When the leftover is part of the answer": "जब बचा हुआ भी उत्तर का हिस्सा हो",
    "The question asks two things. Which part of the division answers each?": "सवाल दो बातें पूछता है। भाग का कौन सा हिस्सा हर एक का उत्तर देता है?",
    "Put the numbers in the frame, then fill both boxes.": "संख्याओं को ढाँचे में रखो, फिर दोनों खाने भरो।",
    "How many things does the question ask?": "सवाल कितनी बातें पूछता है?",
    "The quotient goes in the first box. What is left over goes in the second.": "भागफल पहले खाने में जाता है। जो बचा, वह दूसरे में।",
    "When a question asks what is left, the remainder is part of the answer.": "जब सवाल पूछे कि क्या बचा, तो शेषफल भी उत्तर का हिस्सा है।",
    "You learned: if the question asks what is left, give the remainder too.": "तुमने सीखा: सवाल पूछे कि क्या बचा, तो शेषफल भी बताओ।",
    "A cook pours 4,705 mL of soup equally into 15 bowls, as much as possible in each. How much is in each bowl, and how much is left in the pot?": "एक रसोइया 4,705 मिलीलीटर सूप 15 कटोरों में बराबर डालता है, हर एक में जितना हो सके। हर कटोरे में कितना है, और बर्तन में कितना बचा?",
    "In each bowl? Left in pot?": "हर कटोरे में? बर्तन में बचा?",
    "What is left in the pot after the bowls are filled?": "कटोरे भरने के बाद बर्तन में क्या बचा?",
    "5,237 children are split equally into 25 teams for a sports day. How many are in each team, and how many are left out?": "खेल दिवस के लिए 5,237 बच्चों को 25 टीमों में बराबर बाँटा जाता है। हर टीम में कितने हैं, और कितने बाहर रह गए?",
    "In each team? Left out?": "हर टीम में? बाहर?",
    "How many children are not in any team?": "कितने बच्चे किसी टीम में नहीं हैं?",
    "A tailor cuts 2,650 cm of cloth into 48 equal pieces, each as long as possible in whole centimetres. How long is each piece, and how much cloth is left?": "एक दर्ज़ी 2,650 सेंटीमीटर कपड़े को 48 बराबर टुकड़ों में काटता है, हर टुकड़ा पूरे सेंटीमीटर में जितना लंबा हो सके। हर टुकड़ा कितना लंबा है, और कितना कपड़ा बचा?",
    "Each piece? Cloth left?": "हर टुकड़ा? बचा कपड़ा?",
    "How much cloth is left after the 48 pieces?": "48 टुकड़ों के बाद कितना कपड़ा बचा?",
    /* the Work's own lines and words */
    "The dividend is the product. Find the box that holds it.": "भाज्य गुणनफल है। वह खाना ढूँढो जिसमें वह है।",
    "Read the story again, and point to the words for the whole amount.": "कहानी फिर से पढ़ो, और कुल मात्रा बताने वाले शब्दों को दिखाओ।",
    "The divisor is the number you know.": "भाजक वह संख्या है जो तुम्हें पता है।",
    "Read the story again, and point to the words that say how many parts.": "कहानी फिर से पढ़ो, और उन शब्दों को दिखाओ जो बताते हैं कि कितने हिस्से।",
    "km": "किमी", "litres": "लीटर", "cars": "कारें", "levels": "मंज़िलें", "minutes": "मिनट", "questions": "सवाल", "mL": "मिली",
    "bowls": "कटोरे", "children": "बच्चे", "teams": "टीमें", "cm": "सेमी", "pieces": "टुकड़े", "seats": "सीटें", "rows": "पंक्तियाँ", "parts": "हिस्से",
    "whole trip": "पूरी यात्रा", "each litre the same": "हर लीटर बराबर", "cars in all": "कुल कारें", "each level the same": "हर मंज़िल बराबर",
    "minutes in all": "कुल मिनट", "same time on each": "हर एक पर बराबर समय", "soup in the pot": "बर्तन में सूप", "equal bowls": "बराबर कटोरे",
    "children in all": "कुल बच्चे", "equal teams": "बराबर टीमें", "cloth in all": "कुल कपड़ा", "equal pieces": "बराबर टुकड़े",
    "seats in all": "कुल सीटें", "each row the same": "हर पंक्ति बराबर", "product": "गुणनफल", "known number": "ज्ञात संख्या",
    "mL left": "मिली बचा", "left out": "बाहर", "cm left": "सेमी बचा", "left": "बचे",
    "missing": "छूटा हुआ", "known": "ज्ञात", "in each row": "हर पंक्ति में", "tiles": "टाइलें",
    "each bowl": "हर कटोरा", "left over": "बचा", "each team": "हर टीम", "each piece": "हर टुकड़ा",
    "Th": "ह", "H": "सै", "T": "द", "O": "इ", "divisor": "भाजक", "dividend": "भाज्य",
    "their answer": "उनका उत्तर", "answered": "उत्तर दिए", "Next story": "अगली कहानी",
    /* the summary page's little drawings (Thumb) */
    "r": "शे",
  },
  gu: {
    "Story Divider": "વાર્તાથી ભાગાકાર",
    "A story with its numbers lit. Which one is being shared out?": "એક વાર્તા, જેની સંખ્યાઓ ચમકે છે. કઈ સંખ્યા વહેંચાઈ રહી છે?",
    "Every story shared the right way round, every zero written, and every question answered in full.": "દરેક વાર્તા સાચી રીતે વહેંચાઈ, દરેક શૂન્ય લખાયું, અને દરેક પ્રશ્નનો પૂરો જવાબ અપાયો.",
    "Free play. Pick any story and bring its digits down, one at a time.": "મુક્ત રમત. કોઈ પણ વાર્તા પસંદ કરો અને તેના અંકો એક-એક કરીને નીચે લાવો.",
    "What is shared, and into how many": "શું વહેંચાયું, અને કેટલામાં",
    "Into how many equal parts is it shared?": "તેને કેટલા સરખા ભાગમાં વહેંચ્યું છે?",
    "Put each number in its place in the frame.": "દરેક સંખ્યાને માળખામાં તેની જગ્યાએ મૂકો.",
    "Which words say how many equal parts?": "કયા શબ્દો કહે છે કે કેટલા સરખા ભાગ છે?",
    "Point to the number that is shared, then to the number of equal parts.": "પહેલાં વહેંચાયેલી સંખ્યા બતાવો, પછી સરખા ભાગની સંખ્યા.",
    "The total being shared is the dividend and the number of equal parts is the divisor.": "જે કુલ વહેંચાય છે તે ભાજ્ય છે, અને સરખા ભાગની સંખ્યા ભાજક છે.",
    "You learned: the whole shared is the dividend, the parts the divisor.": "તમે શીખ્યા: વહેંચાયેલું કુલ ભાજ્ય છે, ભાગ ભાજક છે.",
    "A van travels 456 km and uses 24 litres of petrol. Every litre carries it the same distance. How far does it go on one litre?": "એક વાન 456 કિલોમીટર ચાલે છે અને 24 લિટર પેટ્રોલ વાપરે છે. દરેક લિટરમાં તે સરખું અંતર કાપે છે. એક લિટરમાં તે કેટલું દૂર જાય છે?",
    "How many km per litre?": "એક લિટરમાં કેટલા કિમી?",
    "Which is shared out here, the kilometres or the litres?": "અહીં શું વહેંચાય છે, કિલોમીટર કે લિટર?",
    "A car park has 8 levels, and every level holds the same number of cars. It holds 3,560 cars in all. How many does each level hold?": "એક પાર્કિંગમાં 8 માળ છે, અને દરેક માળ પર સરખી ગાડીઓ રહે છે. તેમાં કુલ 3,560 ગાડીઓ રહે છે. દરેક માળ પર કેટલી ગાડીઓ રહે છે?",
    "How many cars on each level?": "દરેક માળ પર કેટલી ગાડીઓ?",
    "Which number is all the cars, and which is the levels?": "કઈ સંખ્યા બધી ગાડીઓ છે, અને કઈ માળ?",
    "A child answers 18 questions in 54 minutes and spends the same time on each. How many minutes does each question take?": "એક બાળક 54 મિનિટમાં 18 પ્રશ્નો ઉકેલે છે અને દરેક પર સરખો સમય લે છે. દરેક પ્રશ્નમાં કેટલી મિનિટ લાગે છે?",
    "Minutes for each question?": "દરેક પ્રશ્ન માટે કેટલી મિનિટ?",
    "Which is shared out here, the minutes or the questions?": "અહીં શું વહેંચાય છે, મિનિટ કે પ્રશ્નો?",
    "Finding a missing factor": "ખૂટતો અવયવ શોધવો",
    "You know the product and one number. How do you find the other?": "તમને ગુણનફળ અને એક સંખ્યા ખબર છે. બીજી કેવી રીતે શોધશો?",
    "Put the product and the number you know in the frame.": "ગુણનફળ અને જાણીતી સંખ્યાને માળખામાં મૂકો.",
    "What do you do to the product with the number you know?": "જાણીતી સંખ્યા વડે ગુણનફળનું શું કરશો?",
    "Divide the product by the number you know, then multiply back to check.": "ગુણનફળને જાણીતી સંખ્યા વડે ભાગો, પછી પાછો ગુણાકાર કરીને ચકાસો.",
    "A missing factor is the product divided by the factor that is known.": "ખૂટતો અવયવ, ગુણનફળને જાણીતા અવયવ વડે ભાગતાં મળે છે.",
    "You learned: divide the product by the known factor to find the other.": "તમે શીખ્યા: બીજો અવયવ શોધવા ગુણનફળને જાણીતા અવયવ વડે ભાગો.",
    "Two numbers multiply to make 2,944, and one of them is 32. What is the other?": "બે સંખ્યાનો ગુણાકાર 2,944 છે, અને તેમાંની એક 32 છે. બીજી સંખ્યા કઈ છે?",
    "What is the other number?": "બીજી સંખ્યા કઈ છે?",
    "Is 2,944 the product, or one of the two numbers?": "શું 2,944 ગુણનફળ છે, કે બેમાંની એક સંખ્યા?",
    "Two numbers multiply to make 1,386, and one of them is 42. Find the other.": "બે સંખ્યાનો ગુણાકાર 1,386 છે, અને તેમાંની એક 42 છે. બીજી સંખ્યા શોધો.",
    "Which number is the product here, and which do you know?": "અહીં ગુણનફળ કઈ સંખ્યા છે, અને તમને કઈ ખબર છે?",
    "1,564 tiles are laid in 34 equal rows. How many tiles are in each row?": "1,564 ટાઇલ્સ 34 સરખી હારમાં લગાવી છે. દરેક હારમાં કેટલી ટાઇલ્સ છે?",
    "How many tiles in each row?": "દરેક હારમાં કેટલી ટાઇલ્સ?",
    "Which number is all the tiles together?": "કઈ સંખ્યા બધી ટાઇલ્સ મળીને છે?",
    "The zero the working hides": "ગણતરીમાં છુપાયેલું શૂન્ય",
    "Bring down one digit only. How many fit into that?": "ફક્ત એક અંક નીચે લાવો. તેમાં કેટલા સમાય છે?",
    "Drag the next digit down, one at a time.": "આગળનો અંક નીચે ખેંચો, એક વારમાં એક.",
    "Is the number now being divided smaller than the divisor?": "શું અત્યારે ભાગાતી સંખ્યા ભાજક કરતાં નાની છે?",
    "Bring the digits down one at a time. Each one puts a digit in the quotient.": "અંકો એક-એક કરીને નીચે લાવો. દરેક ભાગફળમાં એક અંક મૂકે છે.",
    "A zero goes in the quotient when the number brought down is smaller than the divisor. One digit at a time shows it.": "જ્યારે નીચે લાવેલી સંખ્યા ભાજક કરતાં નાની હોય, ત્યારે ભાગફળમાં શૂન્ય આવે. એક-એક અંક લાવવાથી તે દેખાય છે.",
    "You learned: a number smaller than the divisor puts a 0 in the quotient.": "તમે શીખ્યા: ભાજક કરતાં નાની સંખ્યા ભાગફળમાં 0 મૂકે છે.",
    "A child works 4,968 divided by 24 and gets 27. They brought the 6 and the 8 down together. What is the right answer?": "એક બાળક 4,968 ÷ 24 કરે છે અને તેને 27 મળે છે. તેણે 6 અને 8 એકસાથે નીચે લાવ્યા. સાચો જવાબ શું છે?",
    "What is the right answer?": "સાચો જવાબ શું છે?",
    "How many digits come down at a time?": "એક વારમાં કેટલા અંક નીચે આવે છે?",
    "Two numbers multiply to make 6,432, and one of them is 32. Find the other, and watch for the step that puts a zero in the quotient.": "બે સંખ્યાનો ગુણાકાર 6,432 છે, અને તેમાંની એક 32 છે. બીજી સંખ્યા શોધો, અને એ પગલા પર ધ્યાન આપો જે ભાગફળમાં શૂન્ય મૂકે છે.",
    "When the 3 comes down, how many 32s fit?": "જ્યારે 3 નીચે આવે, ત્યારે તેમાં 32 કેટલી વાર સમાય?",
    "A child divides 7,560 by 36 and writes 21. Multiply back to test it, then find the right quotient.": "એક બાળક 7,560 ને 36 વડે ભાગીને 21 લખે છે. પાછો ગુણાકાર કરીને ચકાસો, પછી સાચું ભાગફળ શોધો.",
    "What is the right quotient?": "સાચું ભાગફળ શું છે?",
    "Multiply 36 by 21. Does it make 7,560?": "36 ને 21 વડે ગુણો. શું 7,560 બને છે?",
    "When the leftover is part of the answer": "જ્યારે વધેલું પણ જવાબનો ભાગ હોય",
    "The question asks two things. Which part of the division answers each?": "પ્રશ્ન બે વાત પૂછે છે. ભાગાકારનો કયો ભાગ દરેકનો જવાબ આપે છે?",
    "Put the numbers in the frame, then fill both boxes.": "સંખ્યાઓને માળખામાં મૂકો, પછી બંને ખાનાં ભરો.",
    "How many things does the question ask?": "પ્રશ્ન કેટલી વાત પૂછે છે?",
    "The quotient goes in the first box. What is left over goes in the second.": "ભાગફળ પહેલા ખાનામાં જાય છે. જે વધ્યું, તે બીજામાં.",
    "When a question asks what is left, the remainder is part of the answer.": "જ્યારે પ્રશ્ન પૂછે કે શું વધ્યું, ત્યારે શેષ પણ જવાબનો ભાગ છે.",
    "You learned: if the question asks what is left, give the remainder too.": "તમે શીખ્યા: પ્રશ્ન પૂછે કે શું વધ્યું, તો શેષ પણ કહો.",
    "A cook pours 4,705 mL of soup equally into 15 bowls, as much as possible in each. How much is in each bowl, and how much is left in the pot?": "એક રસોઇયો 4,705 મિલીલિટર સૂપ 15 વાટકામાં સરખો રેડે છે, દરેકમાં બને તેટલો. દરેક વાટકામાં કેટલો છે, અને તપેલામાં કેટલો વધ્યો?",
    "In each bowl? Left in pot?": "દરેક વાટકામાં? તપેલામાં વધ્યો?",
    "What is left in the pot after the bowls are filled?": "વાટકા ભર્યા પછી તપેલામાં શું વધ્યું?",
    "5,237 children are split equally into 25 teams for a sports day. How many are in each team, and how many are left out?": "રમતોત્સવ માટે 5,237 બાળકોને 25 ટીમમાં સરખાં વહેંચવામાં આવે છે. દરેક ટીમમાં કેટલાં છે, અને કેટલાં બહાર રહી ગયાં?",
    "In each team? Left out?": "દરેક ટીમમાં? બહાર?",
    "How many children are not in any team?": "કેટલાં બાળકો કોઈ ટીમમાં નથી?",
    "A tailor cuts 2,650 cm of cloth into 48 equal pieces, each as long as possible in whole centimetres. How long is each piece, and how much cloth is left?": "એક દરજી 2,650 સેન્ટિમીટર કાપડને 48 સરખા ટુકડામાં કાપે છે, દરેક ટુકડો આખા સેન્ટિમીટરમાં બને તેટલો લાંબો. દરેક ટુકડો કેટલો લાંબો છે, અને કેટલું કાપડ વધ્યું?",
    "Each piece? Cloth left?": "દરેક ટુકડો? વધેલું કાપડ?",
    "How much cloth is left after the 48 pieces?": "48 ટુકડા પછી કેટલું કાપડ વધ્યું?",
    /* the Work's own lines and words */
    "The dividend is the product. Find the box that holds it.": "ભાજ્ય ગુણનફળ છે. તે જે ખાનામાં છે તે શોધો.",
    "Read the story again, and point to the words for the whole amount.": "વાર્તા ફરી વાંચો, અને કુલ રકમ બતાવતા શબ્દો બતાવો.",
    "The divisor is the number you know.": "ભાજક એ સંખ્યા છે જે તમને ખબર છે.",
    "Read the story again, and point to the words that say how many parts.": "વાર્તા ફરી વાંચો, અને એ શબ્દો બતાવો જે કહે છે કે કેટલા ભાગ.",
    "km": "કિમી", "litres": "લિટર", "cars": "ગાડીઓ", "levels": "માળ", "minutes": "મિનિટ", "questions": "પ્રશ્નો", "mL": "મિલી",
    "bowls": "વાટકા", "children": "બાળકો", "teams": "ટીમ", "cm": "સેમી", "pieces": "ટુકડા", "seats": "બેઠકો", "rows": "હાર", "parts": "ભાગ",
    "whole trip": "આખી મુસાફરી", "each litre the same": "દરેક લિટર સરખું", "cars in all": "કુલ ગાડીઓ", "each level the same": "દરેક માળ સરખો",
    "minutes in all": "કુલ મિનિટ", "same time on each": "દરેક પર સરખો સમય", "soup in the pot": "તપેલામાં સૂપ", "equal bowls": "સરખા વાટકા",
    "children in all": "કુલ બાળકો", "equal teams": "સરખી ટીમ", "cloth in all": "કુલ કાપડ", "equal pieces": "સરખા ટુકડા",
    "seats in all": "કુલ બેઠકો", "each row the same": "દરેક હાર સરખી", "product": "ગુણનફળ", "known number": "જાણીતી સંખ્યા",
    "mL left": "મિલી વધ્યું", "left out": "બહાર", "cm left": "સેમી વધ્યું", "left": "વધ્યા",
    "missing": "ખૂટતો", "known": "જાણીતો", "in each row": "દરેક હારમાં", "tiles": "ટાઇલ્સ",
    "each bowl": "દરેક વાટકો", "left over": "વધેલું", "each team": "દરેક ટીમ", "each piece": "દરેક ટુકડો",
    "Th": "હ", "H": "શ", "T": "દ", "O": "એ", "divisor": "ભાજક", "dividend": "ભાજ્ય",
    "their answer": "તેમનો જવાબ", "answered": "જવાબ આપ્યા", "Next story": "આગળની વાર્તા",
    /* the summary page's little drawings (Thumb) */
    "r": "શે",
  },
};

/* ── the story divider: a division set up from a story and worked the book's way ────────────
   The chapter's colours: the whole being shared (the dividend) deep blue, the number of equal
   parts (the divisor) amber, the quotient green, a multiple of the divisor rose, what is left over
   vermilion, a zero written in the quotient grey. Numerals take a deeper ink, so they read at
   4.5:1 on white and on the panel; bars and dishes keep the true colour. */
const SD_INK: any = {
  total: shade(CONTENT.hundred, 0.25), parts: shade(CONTENT.ten, 0.4), q: shade(CONTENT.one, 0.3),
  prod: shade(CONTENT.bead, 0.3), rem: shade(CONTENT.pointer, 0.25), down: shade(CONTENT.hundred, 0.25),
};
const SD_ZERO = "#767676";

/* the long division, the book's way: digits are taken from the left until the number is not smaller
   than the divisor, then one digit at a time; a step whose number is smaller than the divisor writes
   0 in the quotient. `atoms` are what the frame writes, in order: a digit brought down, a quotient
   digit, a product (a multiple of the divisor), a remainder. */
function sdDivide(D: number, d: number) {
  const digits = String(D).split("").map(Number), n = digits.length;
  const steps: any[] = [];
  let rem = 0, started = false;
  for (let j = 0; j < n; j++) {
    const cur = rem * 10 + digits[j];
    if (!started && cur < d && j < n - 1) { rem = cur; continue; }
    started = true;
    const q = Math.floor(cur / d);
    steps.push({ j, cur, q, prod: q * d, rem: cur - q * d });
    rem = cur - q * d;
  }
  const atoms: any[] = [];
  steps.forEach((s: any, i: number) => {
    if (i > 0) atoms.push({ t: "down", j: s.j, s: i });
    atoms.push({ t: "q", s: i });
    if (s.q > 0) { atoms.push({ t: "prod", s: i }); atoms.push({ t: "rem", s: i }); }
  });
  return { D, d, digits, n, off: 4 - n, steps, atoms, Q: Number(steps.map((s: any) => s.q).join("")), R: rem };
}

/* what the frame shows after `at` atoms, with digits brought down by the child up to `downTo`
   (a digit the child brings down joins the working row before its step is worked) */
function sdFrame(dv: any, at: number, downTo: number) {
  const col = (j: number) => dv.off + j;
  const qs: any[] = [], rows: any[] = [], brought: any[] = [];
  const row = (r: number) => rows[r] || (rows[r] = { r, cells: [], minus: null, rule: null, s: -1 });
  const right = (r: number, str: string, c: number, kind: string) =>
    str.split("").forEach((ch, i) => row(r).cells.push({ col: c - str.length + 1 + i, ch, kind }));
  let wr = 0, lastJ = -1;
  for (let a = 0; a < Math.min(at, dv.atoms.length); a++) {
    const A = dv.atoms[a], s = dv.steps[A.s];
    if (A.t === "down") { row(wr).cells.push({ col: col(A.j), ch: String(dv.digits[A.j]), kind: "down" }); brought.push({ j: A.j, r: wr }); lastJ = A.j; }
    else if (A.t === "q") { qs.push({ col: col(s.j), ch: String(s.q), zero: s.q === 0, s: A.s }); lastJ = Math.max(lastJ, s.j); }
    else if (A.t === "prod") {
      const str = String(s.prod), R = row(wr + 1);
      right(wr + 1, str, col(s.j), "prod");
      R.minus = col(s.j) - str.length + 1; R.rule = [R.minus, col(s.j)]; R.s = A.s;
    } else { right(wr + 2, String(s.rem), col(s.j), "rem"); row(wr + 2).s = A.s; wr += 2; }
  }
  if (wr > 0) for (let j = lastJ + 1; j < Math.min(downTo, dv.n); j++) { row(wr).cells.push({ col: col(j), ch: String(dv.digits[j]), kind: "down" }); brought.push({ j, r: wr }); }
  return { qs, rows: rows.filter(Boolean), brought, wr, lastJ };
}

/* a word's width on the stage, near enough to lay out a chip (Poppins) */
const sdTextW = (s: string, size: number) => String(s).split("").reduce((w, ch) => w + size * (
  /\d/.test(ch) ? 0.66 : /[,.]/.test(ch) ? 0.3 : ch === " " ? 0.3 : /[A-Z]/.test(ch) ? 0.72 : /[mw]/.test(ch) ? 0.9 : /[iljtfr]/.test(ch) ? 0.38 : 0.62), 0);

/* ── geometry, in working-area units (1086 x 528) ──────────────────────────────────────────
   Left column (0..600): the story card, the share bar and the checks, or the missing factor bay.
   Right column (610..1086): the division frame, place headings Th H T O over four columns. */
const SD_LW = 600;
const SD_FR = { x: 610, c0: 796, cw: 80, head: 34, qy: 88, top: 104, y0: 150, pitch: 56, dvx: 724, brx: 742, right: 1074 };
const sdColC = (c: number) => SD_FR.c0 + SD_FR.cw * c;
const sdRowY = (r: number) => SD_FR.y0 + SD_FR.pitch * r;
const SD_SPOT: any = { divisor: { x: 638, y: 110, w: 96, h: 64, cx: 686 }, dividend: { x: 754, y: 110, w: 320, h: 64, cx: 914 } };
const SD_HEADS = ["Th", "H", "T", "O"];
const SD_BAR = { label: 212, y: 228, h: 56, call: 334 };
/* where a dragged number is let go: the divisor's place or the dividend's, else nowhere */
const sdSpotAt = (p: any) => (p.y < 50 || p.y > 250 ? null : p.x >= 600 && p.x < 746 ? "divisor" : p.x >= 746 ? "dividend" : null);

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   items   three a phase, every one the plan's own question (qid).
           kind  share (a story's numbers into the frame, then each part) · factor (a missing factor,
                 found by dividing) · zero (bring digits down one at a time; the hidden zero) ·
                 left (a story that asks each part AND what is left: two boxes, `parts`)
           D, d  the dividend and the divisor the item's division needs
           st    a story: its two numbers, the words that name each one's job, the answer's unit
           bay   a missing factor: which box is missing first, and the boxes' names
           z     the frame given part way (`given` steps worked), and the answer the story's child gave */
const PHASES = [
  {
    n: 1,
    concept: "What is shared, and into how many",
    conceptId: "M2.S4.T7.C24", objectiveIds: ["O11"],
    says: ["Into how many equal parts is it shared?", "Put each number in its place in the frame."],
    /* tries, as the plan writes it: first rung, the item's own miss line (what is the whole amount?); second, which
       words say how many equal parts; third, a smaller share pointed at (the plan's twelve apples in three bags, said
       without its numbers, since three is an answer of this phase). The pad stays open behind all three. */
    ladder: ["Which words say how many equal parts?", "Point to the number that is shared, then to the number of equal parts."],
    closing: "The total being shared is the dividend and the number of equal parts is the divisor.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: the whole shared is the dividend, the parts the divisor.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The story's numbers go to their places in the frame, the share bar splits into equal parts, the frame works the division one digit at a time, and one part lights with its size; the multiplying back rebuilds the total.",
    items: [
      /* learn ML1: answer in the plan = 19 km, because 456 divided by 24 is 19 */
      { qid: "M2.S4.T7.C24:ML1", kind: "share", D: 456, d: 24, answer: 19, winMs: 4200,
        st: { first: "total", total: { n: 456, unit: "km", cap: "whole trip" }, parts: { n: 24, unit: "litres", cap: "each litre the same" }, each: "km" },
        say: "A van travels 456 km and uses 24 litres of petrol. Every litre carries it the same distance. How far does it go on one litre?",
        ask: "How many km per litre?", miss: "Which is shared out here, the kilometres or the litres?" },
      /* practice 1: answer in the plan = 445 cars, because 3560 divided by 8 is 445 */
      { qid: "M2.S4.T7.C24:1", kind: "share", D: 3560, d: 8, answer: 445, winMs: 4600,
        st: { first: "parts", total: { n: 3560, unit: "cars", cap: "cars in all" }, parts: { n: 8, unit: "levels", cap: "each level the same" }, each: "cars" },
        say: "A car park has 8 levels, and every level holds the same number of cars. It holds 3,560 cars in all. How many does each level hold?",
        ask: "How many cars on each level?", miss: "Which number is all the cars, and which is the levels?" },
      /* practice 2: answer in the plan = 3 minutes, because 54 minutes shared among 18 questions is 3 each */
      { qid: "M2.S4.T7.C24:2", kind: "share", D: 54, d: 18, answer: 3, winMs: 3400,
        st: { first: "parts", total: { n: 54, unit: "minutes", cap: "minutes in all" }, parts: { n: 18, unit: "questions", cap: "same time on each" }, each: "minutes" },
        say: "A child answers 18 questions in 54 minutes and spends the same time on each. How many minutes does each question take?",
        ask: "Minutes for each question?", miss: "Which is shared out here, the minutes or the questions?" },
    ],
  },
  {
    n: 2,
    concept: "Finding a missing factor",
    conceptId: "M2.S4.T7.C25", objectiveIds: ["O11"],
    says: ["You know the product and one number. How do you find the other?", "Put the product and the number you know in the frame."],
    /* tries, as the plan writes it: first rung, the item's (which number is the product?); second, what to do to the
       product with the number known; third, the method said plainly (divide, then multiply back), never the number. */
    ladder: ["What do you do to the product with the number you know?", "Divide the product by the number you know, then multiply back to check."],
    closing: "A missing factor is the product divided by the factor that is known.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: divide the product by the known factor to find the other.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The bay writes the child's number in the empty box and multiplies it back; then the frame divides the product by the known number one digit at a time, the missing number settles, and the two multiply back to the product exactly.",
    items: [
      /* learn ML2: answer in the plan = 92, because 2944 divided by 32 is 92 */
      { qid: "M2.S4.T7.C25:ML2", kind: "factor", D: 2944, d: 32, answer: 92, winMs: 3600,
        bay: { missingFirst: true, caps: { missing: "missing", known: "known", product: "product" } },
        say: "Two numbers multiply to make 2,944, and one of them is 32. What is the other?",
        ask: "What is the other number?", miss: "Is 2,944 the product, or one of the two numbers?" },
      /* practice 3: answer in the plan = 33, because 1386 divided by 42 is 33 */
      { qid: "M2.S4.T7.C25:3", kind: "factor", D: 1386, d: 42, answer: 33, winMs: 3600,
        bay: { missingFirst: false, caps: { missing: "missing", known: "known", product: "product" } },
        say: "Two numbers multiply to make 1,386, and one of them is 42. Find the other.",
        ask: "What is the other number?", miss: "Which number is the product here, and which do you know?" },
      /* practice 4: answer in the plan = 46, because 1564 divided by 34 is 46 */
      { qid: "M2.S4.T7.C25:4", kind: "factor", D: 1564, d: 34, answer: 46, winMs: 3600,
        bay: { missingFirst: false, caps: { missing: "in each row", known: "rows", product: "tiles" } },
        say: "1,564 tiles are laid in 34 equal rows. How many tiles are in each row?",
        ask: "How many tiles in each row?", miss: "Which number is all the tiles together?" },
    ],
  },
  {
    n: 3,
    concept: "The zero the working hides",
    conceptId: "M2.S4.T7.C26", objectiveIds: ["O12"],
    says: ["Bring down one digit only. How many fit into that?", "Drag the next digit down, one at a time."],
    /* tries, as the plan writes it: first rung, the item's (how many digits did you bring down?); second, is the
       number now being divided smaller than the divisor; third, one digit at a time, each writing one quotient digit. */
    ladder: ["Is the number now being divided smaller than the divisor?", "Bring the digits down one at a time. Each one puts a digit in the quotient."],
    closing: "A zero goes in the quotient when the number brought down is smaller than the divisor. One digit at a time shows it.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: a number smaller than the divisor puts a 0 in the quotient.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The digits the child brought go back up; the frame brings one down alone, lays the number against the divisor, drops a grey zero into the quotient, brings the next one down and finishes; the child's quotient and the right one are multiplied back.",
    items: [
      /* learn ML3: answer in the plan = The step for 16 tens was skipped. 16 tens is smaller than 24, so a zero goes in the
         tens place, and the answer is 207 (the scaffold read 16 from the plan's prose; the quotient asked for is 207) */
      { qid: "M2.S4.T7.C26:ML3", kind: "zero", D: 4968, d: 24, answer: 207, winMs: 3400, z: { given: 1, theirs: 27 },
        say: "A child works 4,968 divided by 24 and gets 27. They brought the 6 and the 8 down together. What is the right answer?",
        ask: "What is the right answer?", miss: "How many digits come down at a time?" },
      /* practice 5: answer in the plan = 201. After 64 hundreds gives 2, the 3 tens come down, and 3 tens is smaller than 32,
         so a zero goes in the tens place of the quotient */
      { qid: "M2.S4.T7.C26:5", kind: "zero", D: 6432, d: 32, answer: 201, winMs: 3400, z: { given: 1, theirs: null, bay: true },
        say: "Two numbers multiply to make 6,432, and one of them is 32. Find the other, and watch for the step that puts a zero in the quotient.",
        ask: "What is the other number?", miss: "When the 3 comes down, how many 32s fit?" },
      /* practice 6: answer in the plan = 36 times 21 is 756, not 7560, so it is wrong. The last step divides 0 ones, which is
         smaller than 36, so a zero goes in the ones place: the quotient is 210 (the scaffold read 36; the quotient is 210) */
      { qid: "M2.S4.T7.C26:6", kind: "zero", D: 7560, d: 36, answer: 210, winMs: 3400, z: { given: 2, theirs: 21 },
        say: "A child divides 7,560 by 36 and writes 21. Multiply back to test it, then find the right quotient.",
        ask: "What is the right quotient?", miss: "Multiply 36 by 21. Does it make 7,560?" },
    ],
  },
  {
    n: 4,
    concept: "When the leftover is part of the answer",
    conceptId: "M2.S4.T7.C27", objectiveIds: ["O12"],
    says: ["The question asks two things. Which part of the division answers each?", "Put the numbers in the frame, then fill both boxes."],
    /* tries, as the plan writes it: first rung, the item's (how many things does the question ask?); second, which part
       of the division answers each; third, where each part goes (quotient first, what is left second). */
    ladder: ["How many things does the question ask?", "The quotient goes in the first box. What is left over goes in the second."],
    closing: "When a question asks what is left, the remainder is part of the answer.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: if the question asks what is left, give the remainder too.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The story's numbers go to the frame, the frame works the division to its foot, one bar part lights with the amount in each, and the remainder at the foot of the frame is set apart in a dish of its own, with its unit; quotient times divisor plus remainder rebuilds the total.",
    items: [
      /* learn ML4: answer in the plan = 313 mL in each bowl, and 10 mL left in the pot */
      { qid: "M2.S4.T7.C27:ML4", kind: "left", D: 4705, d: 15, answer: [313, 10], winMs: 4600,
        parts: [{ label: "each bowl", unit: "mL" }, { label: "left over", unit: "mL" }],
        st: { first: "total", total: { n: 4705, unit: "mL", cap: "soup in the pot" }, parts: { n: 15, unit: "bowls", cap: "equal bowls" }, each: "mL", left: "mL left" },
        say: "A cook pours 4,705 mL of soup equally into 15 bowls, as much as possible in each. How much is in each bowl, and how much is left in the pot?",
        ask: "In each bowl? Left in pot?", miss: "What is left in the pot after the bowls are filled?" },
      /* practice 7: answer in the plan = 209 in each team and 12 left out. The quotient answers the first question and the
         remainder answers the second */
      { qid: "M2.S4.T7.C27:7", kind: "left", D: 5237, d: 25, answer: [209, 12], winMs: 4200,
        parts: [{ label: "each team" }, { label: "left out" }],
        st: { first: "total", total: { n: 5237, unit: "children", cap: "children in all" }, parts: { n: 25, unit: "teams", cap: "equal teams" }, each: "children", left: "left out" },
        say: "5,237 children are split equally into 25 teams for a sports day. How many are in each team, and how many are left out?",
        ask: "In each team? Left out?", miss: "How many children are not in any team?" },
      /* practice 8: answer in the plan = 55 cm each, with 10 cm left over, because 48 times 55 is 2640 */
      { qid: "M2.S4.T7.C27:8", kind: "left", D: 2650, d: 48, answer: [55, 10], winMs: 4200,
        parts: [{ label: "each piece", unit: "cm" }, { label: "left over", unit: "cm" }],
        st: { first: "total", total: { n: 2650, unit: "cm", cap: "cloth in all" }, parts: { n: 48, unit: "pieces", cap: "equal pieces" }, each: "cm", left: "cm left" },
        say: "A tailor cuts 2,650 cm of cloth into 48 equal pieces, each as long as possible in whole centimetres. How long is each piece, and how much cloth is left?",
        ask: "Each piece? Cloth left?", miss: "How much cloth is left after the 48 pieces?" },
    ],
  },
];

/* Free play: any story of the tool, and the book's own two (180 seats in 30 rows; 5,075 divided by 25,
   whose zero the book's figure hides), each worked one digit at a time as the child brings it down. */
const sdBare = (D: number, d: number) => ({ first: "total", total: { n: D, unit: "", cap: "product" }, parts: { n: d, unit: "", cap: "known number" }, each: "", left: "left" });
const SD_FREE: any[] = [
  ...PHASES.flatMap((p: any) => p.items).map((it: any) => ({ kind: "free", D: it.D, d: it.d, st: it.st || sdBare(it.D, it.d) })),
  { kind: "free", D: 180, d: 30, st: { first: "total", total: { n: 180, unit: "seats", cap: "seats in all" }, parts: { n: 30, unit: "rows", cap: "each row the same" }, each: "seats", left: "left" } },
  { kind: "free", D: 5075, d: 25, st: sdBare(5075, 25) },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  frame: { headings: SD_HEADS, columnWidth: SD_FR.cw, rowPitch: SD_FR.pitch, layout: "quotient above the dividend, place headings over it" },
  colours: { dividend: CONTENT.hundred, divisor: CONTENT.ten, quotient: CONTENT.one, multiple: CONTENT.bead, remainder: CONTENT.pointer, zero: SD_ZERO },
  freeStories: SD_FREE.map((s: any) => ({ dividend: s.D, divisor: s.d })),
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers; two boxes each hold their own) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by multiplying back (quotient x divisor + remainder = dividend, the
   remainder smaller than the divisor), which shares no code with judge or the frame's long division;
   and the numbers of each item are the numbers its question says */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const said = String(it.say).includes(it.D >= 1000 ? indian(it.D) : String(it.D)) && new RegExp("\\b" + it.d + "\\b").test(it.say);
  if (!said) return false;
  if (it.parts) { const [q, r] = it.answer; return q * it.d + r === it.D && r >= 0 && r < it.d && r > 0; }
  if (it.answer * it.d !== it.D) return false;
  if (it.kind === "zero") return /0/.test(String(it.answer).slice(1)); /* the hidden zero is really there */
  if (it.kind === "share") return it.st.total.n === it.D && it.st.parts.n === it.d;
  return true;
}));
/* the most likely wrong answer (the item's misconception); judge must reject it */
const nearMiss = (item: any) => {
  if (item.parts) return item.answer.map((x: number, k: number) => (k === item.answer.length - 1 ? 0 : x)).join("|"); /* the remainder dropped */
  if (item.kind === "factor") return item.D * item.d;                              /* the two numbers given, multiplied */
  if (item.kind === "zero") return Number(String(item.answer).replace(/(?!^)0/g, "")); /* two digits brought down together: 207 read as 27 */
  return 0; /* shared the wrong way round: the parts divided by the whole gives no whole one */
};
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* every answer is typed (the working area sets the division up and shows the working); undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* nothing waits on the working area before Enter; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* the item's setup: its division, and how much of the frame is already worked (phase 3 opens part way) */
function sdSetup(it: any) {
  const dv = sdDivide(it.D, it.d);
  if (it.kind === "zero") {
    const g = it.z.given, at = dv.atoms.findIndex((a: any) => a.t === "down" && a.s === g);
    return { kind: it.kind, it, dv, given: at < 0 ? dv.atoms.length : at, down0: dv.steps[g - 1].j + 1 };
  }
  return { kind: it.kind, it, dv, given: 0, down0: 0 };
}
const sdPlaced0 = (kind: string) => (kind === "zero" || kind === "free" ? { dividend: true, divisor: true } : { dividend: false, divisor: false });
/* a multiplying-back line as its pieces: the number that answers is lit on the right line only */
const sdEq = (cfg: any, q: number, r: number, lit: boolean) => {
  const d = cfg.dv.d, tot = d * q + r, first = cfg.kind === "factor" && cfg.it.bay.missingFirst;
  const tail = (r ? ` + ${indian(r)}` : "") + ` = ${indian(tot)}`;
  return first ? { pre: "", mid: indian(q), post: ` × ${d}` + tail, lit, key: `${q}|${r}` }
    : { pre: `${d} × `, mid: indian(q), post: tail, lit, key: `${q}|${r}` };
};
/* the child's own answer, multiplied back (only when it is a sensible number) */
const sdChild = (cfg: any, v: any) => {
  if (cfg.it.parts) {
    const ps = slotPartsOf(v, 2), q = Number(ps[0] || 0), r = Number(ps[1] || 0);
    return q > 0 && q < 1000000 && r < 1000000 ? { q, r, line: sdEq(cfg, q, r, false) } : null;
  }
  const x = leadNumber(v);
  return x !== null && x > 0 && x < 1000000 && Math.round(x) === x ? { q: x, r: 0, line: sdEq(cfg, x, 0, false) } : null;
};
const sdLines = (cfg: any, child: any) => {
  const out: any[] = [];
  if (child) out.push(child.line);
  const th = cfg.kind === "zero" ? cfg.it.z.theirs : null;
  if (th && !(child && child.q === th && child.r === 0)) out.push(sdEq(cfg, th, 0, false));
  out.push(sdEq(cfg, cfg.dv.Q, cfg.dv.R, true));
  return out;
};

const SD_CSS = `
.sd-in{animation:sdIn 380ms ease-out both}
@keyframes sdIn{from{opacity:0;transform:translateY(-12px)}to{opacity:1;transform:none}}
.sd-grab{cursor:grab}
@media (prefers-reduced-motion:reduce){.sd-in{animation:none}}
`;

/* ── the working area: 1086 x 528, origin at its top-left ────────────────────────────────────
   Countable things use CONTENT colours (url(#gHundred|gTen|gOne|gBead|gPointer)); coloured numerals
   and words use a deeper ink, so they read at 4.5:1. Type uses T.* only.
   Pieces: drag = useDrag(onDrop) then {...control(id, label), ...drag.bind(pay), ...drag.keys(pay)};
   taps = <Hit id x y w h onPress label />. One <Invite/> marks the one thing to touch.
   Nothing is written here that the voice already says. `wrong` = { value, tries } after a miss:
   lock, redraw the mathematics in steps (the traceback), unlock; never mark it, never reset it.
   stage === "free" is Free play (the plan's writeup.freePlay): no target, every control unlocked. */
function Work({ phase, n, item, index, stage, wrong, typed, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const init = useMemo(() => sdSetup(item), []);
  const [cfg, setCfg] = useState<any>(init);
  const [placed, setPlacedS] = useState<any>(() => sdPlaced0(init.kind));
  const [at, setAtS] = useState<number>(init.given);
  const [downTo, setDownS] = useState<number>(init.down0);
  const [lit, setLit] = useState<string | null>(null);     /* the story's words for a job, lit after a number went to the wrong place */
  const [nudge, setNudge] = useState<number | null>(null); /* the digit that must come down first */
  const [partOn, setPartOn] = useState(false);             /* one part of the share bar lit, with its size */
  const [dish, setDish] = useState(false);                 /* what is left over, set apart in its dish */
  const [guess, setGuess] = useState<any>(null);           /* the child's number, written in the missing box */
  const [boxVal, setBoxVal] = useState<number | null>(null); /* the missing number, settled */
  const [lines, setLines] = useState<any[]>([]);           /* multiplying back */
  const [cmp, setCmp] = useState<any>(null);               /* a number laid against the divisor: 16 < 24 */
  const [hi, setHi] = useState<number | null>(null);       /* a step lit while the working is read again */
  const [touched, setTouched] = useState(false);
  const [freeK, setFreeK] = useState(0);
  const atRef = useRef(at), downRef = useRef(downTo), placedRef = useRef(placed);
  const setAt = (k: number) => { atRef.current = k; setAtS(k); };
  const setDown = (k: number) => { downRef.current = k; setDownS(k); };
  const setPlaced = (p: any) => { placedRef.current = p; setPlacedS(p); };
  const litTimer = useRef<any>(null), nudgeTimer = useRef<any>(null);
  const setupFor = useRef("");
  useEffect(() => () => { clearTimeout(litTimer.current); clearTimeout(nudgeTimer.current); }, []);

  const reset = (it: any) => {
    tl.stop();
    const c = sdSetup(it);
    setCfg(c); setPlaced(sdPlaced0(c.kind)); setAt(c.given); setDown(c.down0);
    setLit(null); setNudge(null); setPartOn(false); setDish(false); setGuess(null); setBoxVal(null);
    setLines([]); setCmp(null); setHi(null); setTouched(false);
    api.lock(false);
  };

  useEffect(() => {
    const key = n + ":" + index;
    if ((stage === "ask" || stage === "teach") && setupFor.current !== key) { setupFor.current = key; reset(item); }
  }, [stage, index]);

  /* free play (the plan's freePlay): any story, its digits brought down one at a time, the frame
     writing each step; nothing to get right */
  useEffect(() => {
    if (!free) return;
    setupFor.current = "free";
    reset(SD_FREE[0]); setFreeK(0);
  }, [free]);

  const kind = cfg.kind, dv = cfg.dv, it = cfg.it;
  const busy = tl.busy;
  const story = kind === "share" || kind === "left" || kind === "free";
  const both = placed.dividend && placed.divisor;
  const canPlace = stage === "ask" && !busy && (kind === "share" || kind === "left" || kind === "factor") && !both;
  const worked = at >= dv.atoms.length;

  /* a number from the story (or the bay) goes to the place of the job it does in the frame; a number
     let go in the other place springs back while the story's words for that job light up */
  const roleOf = (spot: string) => (spot === "dividend" ? (kind === "factor" ? "product" : "total") : (kind === "factor" ? "known" : "parts"));
  const place = (role: string, spot: string | null, tapped: boolean) => {
    if (!canPlace) return;
    setTouched(true);
    const want = role === "total" || role === "product" ? "dividend" : "divisor";
    const target = tapped ? (!placedRef.current.dividend ? "dividend" : "divisor") : spot;
    if (!target || placedRef.current[target]) return;           /* let go away from the frame: it goes back */
    if (target !== want) {
      setLit(roleOf(target));
      clearTimeout(litTimer.current);
      litTimer.current = setTimeout(() => setLit(null), 2400);
      /* four literal lines, one api.say each, so the voice bake finds and records them */
      if (target === "dividend") { if (kind === "factor") api.say("The dividend is the product. Find the box that holds it."); else api.say("Read the story again, and point to the words for the whole amount."); }
      else if (kind === "factor") api.say("The divisor is the number you know.");
      else api.say("Read the story again, and point to the words that say how many parts.");
      return;
    }
    setPlaced({ ...placedRef.current, [want]: true });
    api.sfx.tick();
  };

  /* phase 3: bring down the next digit only; a later digit springs back, and the next one is shown */
  const canBring = stage === "ask" && !busy && kind === "zero";
  const bring = (j: number, ok: boolean) => {
    if (!canBring || atRef.current >= dv.atoms.length) return;
    setTouched(true);
    if (!ok) return;
    const nx = Math.max(downRef.current, sdFrame(dv, atRef.current, 0).lastJ + 1);
    if (j !== nx) {
      setNudge(nx);
      clearTimeout(nudgeTimer.current);
      nudgeTimer.current = setTimeout(() => setNudge(null), 1400);
      return;
    }
    setDown(j + 1);
    api.sfx.tick();
  };


  /* free play: the next digit (or the first digits) comes down and the frame works that step */
  const freeGo = (ok: boolean) => {
    if (!free || tl.busy || !ok) return;
    const atoms = dv.atoms;
    let k = atRef.current;
    if (k >= atoms.length) return;
    setTouched(true);
    const S: any[] = [];
    do {
      const A = atoms[k], idx = k + 1;
      S.push([A.t === "down" ? 220 : 380, () => { setAt(idx); if (A.t !== "down") api.sfx.tick(); }]);
      k++;
    } while (k < atoms.length && atoms[k].t !== "down");
    if (k >= atoms.length) S.push([300, () => { setPartOn(true); if (dv.R > 0) setDish(true); setLines([sdEq(cfg, dv.Q, dv.R, true)]); }]);
    tl.run(S);
  };
  const nextStory = () => {
    if (!free || tl.busy) return;
    const k = (freeK + 1) % SD_FREE.length;
    setFreeK(k); reset(SD_FREE[k]);
  };

  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (pay.kind === "tok") place(pay.role, moved ? sdSpotAt(p) : null, !moved);
    else if (pay.kind === "digit") bring(pay.j, !moved || p.y > SD_FR.y0 + 24);
    else if (pay.kind === "free") freeGo(!moved || p.y > SD_FR.y0 + 24);
  });

  /* ── the working, as timed steps: the numbers to their places, each atom of the division, the answer ── */
  const placeSteps = (S: any[]) => {
    if (kind === "zero" || (placedRef.current.dividend && placedRef.current.divisor)) return;
    S.push([560, () => { setPlaced({ dividend: true, divisor: true }); api.sfx.tick(); }]);
  };
  const workSteps = (S: any[], ms: number) => {
    const atoms = dv.atoms;
    for (let a = atRef.current; a < atoms.length; a++) {
      const A = atoms[a], k = a + 1, s = dv.steps[A.s];
      if (A.t === "q" && s.q === 0 && kind === "zero") S.push([ms * 1.8, () => setCmp({ cur: s.cur, d: dv.d })]);
      S.push([A.t === "down" ? ms * 0.8 : ms, () => { setAt(k); if (A.t !== "down") api.sfx.tick(); }]);
    }
  };
  const answerSteps = (S: any[], ms: number, child: any) => {
    if (kind === "share" || kind === "left") S.push([ms, () => setPartOn(true)]);
    if (kind === "left" && dv.R > 0) S.push([ms, () => setDish(true)]);
    if (kind === "factor") S.push([ms, () => setBoxVal(dv.Q)]);
    S.push([ms, () => setLines(sdLines(cfg, child))]);
  };

  /* the win: the maths moves (the division is worked, the part lights, the number settles) */
  useEffect(() => {
    if (stage !== "win") return;
    const S: any[] = [];
    if (atRef.current < dv.atoms.length) { placeSteps(S); workSteps(S, 250); }
    answerSteps(S, 260, null);
    tl.run(S);
  }, [stage]);

  /* ── the traceback: the mathematics redrawn in steps, ending on the whole right answer;
        nothing marked, nothing cleared, the child's answer stays in the slot ── */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    setTouched(true);
    const child = sdChild(cfg, wrong.value);
    const S: any[] = [[300, () => {}]];
    if (atRef.current >= dv.atoms.length) {
      /* the working already stands: read it again, one step at a time */
      dv.steps.forEach((_: any, i: number) => S.push([520, () => setHi(i)]));
      S.push([300, () => setHi(null)]);
      answerSteps(S, 200, child);
    } else {
      if (kind === "zero" && downRef.current > cfg.down0) S.push([700, () => setDown(cfg.down0)]); /* the digits go back: one at a time */
      placeSteps(S);
      if (kind === "factor" && child) S.push([1100, () => { setGuess(child.q); setLines([child.line]); }]);
      else if (child && kind !== "zero") S.push([900, () => setLines([child.line])]);
      workSteps(S, 520);
      answerSteps(S, 560, child);
    }
    tl.run(S, () => api.lock(false));
  }, [wrong]);

  /* what the host and the agent read back (toolApi.getState): the slots, and only what the frame shows */
  const fm = sdFrame(dv, at, downTo);
  const np = it && it.parts ? it.parts.length : 1;
  const filled = it && it.parts ? slotPartsOf(typed, np).filter((x: string) => x !== "").length : typed ? 1 : 0;
  api.onEnter(null);
  api.share({
    story: it && it.qid ? it.qid : null,
    totalSlot: kind === "zero" ? null : placed.dividend ? dv.D : null,
    partsSlot: kind === "zero" ? null : placed.divisor ? dv.d : null,
    quotient: fm.qs.length ? fm.qs.map((q: any) => q.ch).join("") : null,
    remainder: worked ? dv.R : null,
    asks: np, asksAnswered: stage === "win" || stage === "idle" ? np : filled,
    units: it && it.parts ? it.parts.map((p: any) => p.unit || "") : it && it.st ? [it.st.each] : [],
  });

  /* ── drawing ── */
  const quiet = mix(C.ink, "#FFFFFF", 0.3);
  const dragging = drag.drag && drag.drag.moved ? drag.drag.payload : null;
  const overSpot = dragging && dragging.kind === "tok" ? sdSpotAt(drag.drag) : null;
  const inkOf = (k: string) => SD_INK[k] || C.ink;

  /* the story card: each number a piece the child moves, with the story's words for its job */
  const chipW = (tk: any) => 38 + sdTextW(indian(tk.n), T.prompt) + (tk.unit ? sdTextW(" " + tx(tk.unit), T.label) : 0);
  const storyCard = () => {
    const st = it.st;
    const order = st.first === "parts" ? ["parts", "total"] : ["total", "parts"];
    return (
      <g>
        <rect x={0} y={0} width={SD_LW} height={182} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        {order.map((role: string, r: number) => {
          const tk = st[role], y = 14 + r * 86, w = chipW(tk);
          const spot = role === "total" ? "dividend" : "divisor";
          const on = placed[spot], live = canPlace && !on;
          const pay = { kind: "tok", role };
          const ink = on ? inkOf(role === "total" ? "total" : "parts") : C.ink;
          const hidden = dragging && dragging.kind === "tok" && dragging.role === role;
          const capW = sdTextW(tx(tk.cap), T.micro);
          /* the story's words for a number's job are shown only once they cannot decide for the child: the
             number placed, the words lit after a wrong drop, the win, the correction, free play */
          const showCap = on || lit === role || stage === "win" || stage === "idle" || kind === "free";
          return (
            <g key={role}>
              {lit === role && <rect x={w + 26} y={y + 12} width={capW + 24} height={48} rx={12} fill={tint(CONTENT.ten, 0.55)} stroke={CONTENT.ten} strokeWidth={3} />}
              {showCap && <text className="sd-in" x={w + 38} y={y + 46} fontSize={T.micro} fontWeight={lit === role ? 700 : 500} fill={C.ink}>{tx(tk.cap)}</text>}
              {!hidden && (
                <g className={live ? "sd-grab c4-piece" : ""} {...(live ? { ...control("tok-" + role, "Put " + indian(tk.n) + (tk.unit ? " " + tk.unit : "") + " in the frame"), ...drag.bind(pay), ...drag.keys(pay) } : {})}>
                  <rect x={12} y={y} width={w} height={72} rx={16} fill="#FFFFFF" stroke={on ? (role === "total" ? CONTENT.hundred : CONTENT.ten) : C.rule} strokeWidth={on ? 4 : 2} filter="url(#fShadowSoft)" />
                  <text x={31} y={y + 50} fontSize={T.prompt} fontWeight={700} fill={ink}>{indian(tk.n)}
                    {tk.unit && <tspan fontSize={T.label} fontWeight={500} fill={ink}>{" " + tx(tk.unit)}</tspan>}</text>
                </g>
              )}
            </g>
          );
        })}
      </g>
    );
  };

  /* the share bar: the whole in deep blue, cut into as many equal parts as the divisor says */
  const shareBar = () => {
    const st = it.st, left = kind === "left" || (kind === "free" && dv.R > 0);
    const bw = left ? 472 : SD_LW, d = dv.d, pw = bw / d;
    const eachQ = `${indian(dv.Q)}${st.each ? " " + tx(st.each) : ""}`;
    const each = lang === "hi" ? `हर एक ${eachQ}` : lang === "gu" ? `દરેક ${eachQ}` : `${eachQ} each`;
    const leftTxt = `${indian(dv.R)} ${tx(st.left || "left")}`;
    return (
      <g className="sd-in">
        <text x={0} y={SD_BAR.label} fontSize={T.label} fontWeight={700} fill={SD_INK.total}>{indian(dv.D)}{st.total.unit ? " " + tx(st.total.unit) : ""}</text>
        <text x={bw} y={SD_BAR.label} textAnchor="end" fontSize={T.label} fontWeight={700} fill={SD_INK.parts}>{d}{" " + tx(st.parts.unit || "parts")}</text>
        <rect x={0} y={SD_BAR.y} width={bw} height={SD_BAR.h} rx={10} fill="url(#gHundred)" />
        {Array.from({ length: d - 1 }).map((_, i) => (
          <line key={i} x1={pw * (i + 1)} x2={pw * (i + 1)} y1={SD_BAR.y} y2={SD_BAR.y + SD_BAR.h} stroke="#FFFFFF" strokeWidth={d > 30 ? 1.5 : 2.5} />
        ))}
        <rect x={0} y={SD_BAR.y} width={bw} height={SD_BAR.h} rx={10} fill="none" stroke={C.ink} strokeWidth={2} />
        {partOn && <rect className="sd-in" x={0} y={SD_BAR.y - 10} width={Math.max(pw, 14)} height={SD_BAR.h + 20} rx={6} fill="url(#gOne)" stroke={shade(CONTENT.one, 0.35)} strokeWidth={3} />}
        {partOn && (
          <g className="sd-in">
            <path d={`M ${Math.max(pw, 14) / 2} ${SD_BAR.y + SD_BAR.h + 12} V ${SD_BAR.y + SD_BAR.h + 24}`} stroke={SD_INK.q} strokeWidth={3} strokeLinecap="round" />
            <text x={0} y={SD_BAR.call} fontSize={T.label} fontWeight={700} fill={SD_INK.q}>{each}</text>
          </g>
        )}
        {left && dish && (
          <g className="sd-in">
            <rect x={bw + 28} y={SD_BAR.y - 4} width={SD_LW - bw - 28} height={SD_BAR.h + 8} rx={24} fill="url(#gPointer)" stroke={shade(CONTENT.pointer, 0.3)} strokeWidth={2} />
            <text x={SD_LW} y={SD_BAR.call} textAnchor="end" fontSize={T.label} fontWeight={700} fill={SD_INK.rem}>{leftTxt}</text>
          </g>
        )}
      </g>
    );
  };

  /* the missing factor bay: [?] x [known] = [product], the known number and the product are pieces */
  const bay = () => {
    const b = it.bay;
    const order = b.missingFirst ? ["missing", "known", "product"] : ["known", "missing", "product"];
    const W0: any = { missing: 160, known: 124, product: 196 };
    let x = 6;
    const boxes: any[] = [];
    order.forEach((k, i) => { boxes.push({ k, x, w: W0[k] }); x += W0[k] + (i < 2 ? 54 : 0); });
    const val = (k: string) => (k === "known" ? String(dv.d) : k === "product" ? indian(dv.D) : boxVal !== null ? indian(boxVal) : guess !== null ? indian(guess) : "?");
    return (
      <g>
        {boxes.map((bx: any, i: number) => {
          const k = bx.k, role = k === "product" ? "product" : k === "known" ? "known" : null;
          const spot = k === "product" ? "dividend" : "divisor";
          const on = role ? placed[spot] : false, live = !!role && canPlace && !on;
          const hidden = dragging && dragging.kind === "tok" && dragging.role === role;
          const txt = val(k);
          const size = Math.min(T.xl, (bx.w - 24) / Math.max(1, sdTextW(txt, 1)));
          const ink = k === "missing" ? (boxVal !== null ? SD_INK.q : guess !== null ? C.ink : quiet) : on ? inkOf(k === "product" ? "total" : "parts") : C.ink;
          const face = (
            <g>
              <rect x={bx.x} y={24} width={bx.w} height={92} rx={18} fill="#FFFFFF"
                stroke={k === "missing" ? (boxVal !== null ? CONTENT.one : C.rule) : on ? (k === "product" ? CONTENT.hundred : CONTENT.ten) : C.rule}
                strokeWidth={k === "missing" ? 3 : on ? 4 : 2} strokeDasharray={k === "missing" && boxVal === null ? "10 8" : undefined} filter={k === "missing" ? undefined : "url(#fShadowSoft)"} />
              <text key={txt} className={k === "missing" && txt !== "?" ? "sd-in" : ""} x={bx.x + bx.w / 2} y={70 + size * 0.36} textAnchor="middle" fontSize={size} fontWeight={700} fill={ink}>{txt}</text>
            </g>
          );
          const pay = { kind: "tok", role };
          const capLit = lit && role === lit;
          const capW = sdTextW(tx(b.caps[k]), T.micro);
          /* the boxes' names (product, known) are shown only once the division is set up, or lit after a wrong drop */
          const showCap = both || capLit || stage === "win" || stage === "idle";
          return (
            <g key={k}>
              {capLit && <rect x={bx.x + bx.w / 2 - capW / 2 - 12} y={130} width={capW + 24} height={42} rx={12} fill={tint(CONTENT.ten, 0.55)} stroke={CONTENT.ten} strokeWidth={3} />}
              {showCap && <text className="sd-in" x={bx.x + bx.w / 2} y={160} textAnchor="middle" fontSize={T.micro} fontWeight={capLit ? 700 : 500} fill={C.ink}>{tx(b.caps[k])}</text>}
              {!hidden && (live ? <g className="sd-grab c4-piece" {...control("tok-" + role, "Put " + txt + " in the frame")} {...drag.bind(pay)} {...drag.keys(pay)}>{face}</g> : face)}
              {/* the operators: times is drawn as a stroke (a lone "×" glyph would read as a cross mark), equals as text */}
              {i === 0 && <path d={`M ${bx.x + bx.w + 16} ${59} l 22 22 m 0 -22 l -22 22`} fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />}
              {i === 1 && <text x={bx.x + bx.w + 27} y={90} textAnchor="middle" fontSize={T.xl} fontWeight={600} fill={C.ink}>=</text>}
            </g>
          );
        })}
      </g>
    );
  };

  /* multiplying back: quotient x divisor (+ remainder) = dividend; the child's own line is plain ink */
  const eqLines = (y0: number) => (
    <g data-role="reading">
      {lines.map((L: any, i: number) => (
        <text key={L.key + ":" + i} className="sd-in" x={0} y={y0 + i * 66} fontSize={T.prompt} fontWeight={700} fill={C.ink}>
          {L.pre}<tspan fill={L.lit ? SD_INK.q : C.ink}>{L.mid}</tspan>{L.post}
        </text>
      ))}
    </g>
  );

  /* ── the division frame (right column) ── */
  const col = (j: number) => dv.off + j;
  const down = Math.max(downTo, fm.lastJ + 1); /* the next digit to come down, after the ones the frame has worked */
  const digitLive = kind === "zero" ? canBring && !worked && down < dv.n : free && !busy && !worked;
  let nextJ: number | null = null, groupTo = -1;
  if (kind === "zero" && down < dv.n) nextJ = down;
  if (free && !worked) {
    const A = dv.atoms[at];
    if (at === 0) groupTo = dv.steps[0].j; else if (A && A.t === "down") nextJ = A.j;
  }
  const qCells = new Set(fm.qs.map((q: any) => q.col));
  const landRow = fm.wr;
  const frame = () => (
    <g>
      <rect x={SD_FR.x} y={2} width={1086 - SD_FR.x - 2} height={524} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      {SD_HEADS.map((h, c) => <text key={h} x={sdColC(c)} y={SD_FR.head} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={quiet}>{tx(h)}</text>)}
      {/* the quotient, above the dividend: each digit sits over the digit whose step wrote it */}
      {fm.qs.map((q: any) => (
        <g key={"q" + q.col}>
          {hi === q.s && <circle cx={sdColC(q.col)} cy={SD_FR.qy - 16} r={30} fill="none" stroke={C.accent} strokeWidth={4} />}
          <text className="sd-in" x={sdColC(q.col)} y={SD_FR.qy} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={q.zero ? SD_ZERO : SD_INK.q}>{q.ch}</text>
        </g>
      ))}
      {/* a digit brought down and not yet worked: its quotient digit will sit above it */}
      {fm.brought.filter((b: any) => !qCells.has(col(b.j))).map((b: any) => (
        <rect key={"cell" + b.j} x={sdColC(col(b.j)) - 28} y={52} width={56} height={46} rx={10} fill="none" stroke={C.accent} strokeWidth={3} strokeDasharray="8 6" />
      ))}
      <path d={`M ${SD_FR.brx} 178 Q ${SD_FR.brx + 18} 141 ${SD_FR.brx} ${SD_FR.top} H ${SD_FR.right}`} fill="none" stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
      {/* the divisor, or its empty place */}
      {placed.divisor ? (
        <text className="sd-in" x={SD_FR.dvx} y={SD_FR.y0} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={SD_INK.parts}>{dv.d}</text>
      ) : (
        <g>
          <rect x={SD_SPOT.divisor.x} y={SD_SPOT.divisor.y} width={SD_SPOT.divisor.w} height={SD_SPOT.divisor.h} rx={14} fill={overSpot === "divisor" ? tint(C.accent, 0.8) : tint(C.panel, 0.45)}
            stroke={overSpot === "divisor" ? C.accent : shade(C.rule, 0.2)} strokeWidth={overSpot === "divisor" ? 4 : 3} strokeDasharray="10 8" />
          <text x={SD_SPOT.divisor.cx} y={214} textAnchor="middle" fontSize={T.micro} fontWeight={500} fill={quiet}>{tx("divisor")}</text>
        </g>
      )}
      {/* the dividend, or its empty place; a comma after the thousands, as everywhere */}
      {placed.dividend ? (
        <g>
          {dv.digits.map((g: number, j: number) => {
            const live = digitLive && (j === nextJ || (groupTo >= 0 && j <= groupTo));
            const used = fm.brought.some((b: any) => b.j === j);
            return (
              <g key={"dd" + j}>
                {live && <rect x={sdColC(col(j)) - 37} y={110} width={74} height={64} rx={14} fill={tint(C.accent, 0.82)} stroke={nudge === j ? C.accent : C.rule} strokeWidth={nudge === j ? 5 : 2} />}
                <text className="sd-in" x={sdColC(col(j))} y={SD_FR.y0} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={SD_INK.total}>{g}</text>
                {used && <path d={`M ${sdColC(col(j)) - 8} ${SD_FR.y0 + 12} l 8 8 l 8 -8`} fill="none" stroke={quiet} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />}
              </g>
            );
          })}
          {dv.n === 4 && <text x={(sdColC(0) + sdColC(1)) / 2} y={SD_FR.y0} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={SD_INK.total}>,</text>}
        </g>
      ) : (
        <g>
          <rect x={SD_SPOT.dividend.x} y={SD_SPOT.dividend.y} width={SD_SPOT.dividend.w} height={SD_SPOT.dividend.h} rx={14} fill={overSpot === "dividend" ? tint(C.accent, 0.8) : tint(C.panel, 0.45)}
            stroke={overSpot === "dividend" ? C.accent : shade(C.rule, 0.2)} strokeWidth={overSpot === "dividend" ? 4 : 3} strokeDasharray="10 8" />
          <text x={SD_SPOT.dividend.cx} y={214} textAnchor="middle" fontSize={T.micro} fontWeight={500} fill={quiet}>{tx("dividend")}</text>
        </g>
      )}
      {/* the working: each product (a multiple of the divisor) ruled off, each remainder, each digit brought down */}
      {fm.rows.map((R: any) => (
        <g key={"r" + R.r}>
          {R.minus !== null && <text className="sd-in" x={sdColC(R.minus) - 44} y={sdRowY(R.r)} textAnchor="middle" fontSize={T.speech} fontWeight={600} fill={C.ink}>−</text>}
          {R.cells.map((c: any, i: number) => (
            <text key={i + ":" + c.col} className="sd-in" x={sdColC(c.col)} y={sdRowY(R.r)} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={inkOf(c.kind)}>{c.ch}</text>
          ))}
          {R.rule && <line className="sd-in" x1={sdColC(R.rule[0]) - 62} x2={sdColC(R.rule[1]) + 34} y1={sdRowY(R.r) + 15} y2={sdRowY(R.r) + 15} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />}
          {hi !== null && R.s === hi && R.cells.length > 0 && (
            <rect x={sdColC(Math.min(...R.cells.map((c: any) => c.col))) - 34} y={sdRowY(R.r) - 40} width={(Math.max(...R.cells.map((c: any) => c.col)) - Math.min(...R.cells.map((c: any) => c.col))) * SD_FR.cw + 68} height={50}
              rx={12} fill="none" stroke={C.accent} strokeWidth={3} />
          )}
        </g>
      ))}
      {/* what is left over, at the foot of the frame, ringed when it goes to its dish */}
      {dish && worked && (() => {
        const R = fm.rows[fm.rows.length - 1];
        if (!R || !R.cells.length) return null;
        const c0 = Math.min(...R.cells.map((c: any) => c.col)), c1 = Math.max(...R.cells.map((c: any) => c.col));
        return <rect className="sd-in" x={sdColC(c0) - 34} y={sdRowY(R.r) - 42} width={(c1 - c0) * SD_FR.cw + 68} height={54} rx={14} fill="none" stroke={CONTENT.pointer} strokeWidth={4} />;
      })()}
      {/* the bring down arrow from the next digit to where it lands */}
      {nextJ !== null && digitLive && (
        <path d={`M ${sdColC(col(nextJ))} 182 V ${sdRowY(landRow) - 40} m -9 -12 l 9 12 l 9 -12`} fill="none" stroke={C.accent} strokeWidth={3} strokeDasharray="6 6" strokeLinecap="round" />
      )}
      {/* the pieces: the next digit to bring down (or, in free play, the first digits to divide) */}
      {digitLive && nextJ !== null && (
        <g className="sd-grab c4-piece" {...control("digit-" + nextJ, "Bring down the " + dv.digits[nextJ])}
          {...drag.bind(free ? { kind: "free" } : { kind: "digit", j: nextJ })} {...drag.keys(free ? { kind: "free" } : { kind: "digit", j: nextJ })}>
          <rect x={sdColC(col(nextJ)) - 36} y={108} width={72} height={72} fill="transparent" />
        </g>
      )}
      {kind === "zero" && digitLive && dv.n - down > 1 && Array.from({ length: dv.n - down - 1 }).map((_, k) => {
        const j = down + 1 + k;
        return (
          <g key={"later" + j} className="sd-grab c4-piece" {...control("digit-" + j, "Bring down the " + dv.digits[j])} {...drag.bind({ kind: "digit", j })} {...drag.keys({ kind: "digit", j })}>
            <rect x={sdColC(col(j)) - 36} y={108} width={72} height={72} fill="transparent" />
          </g>
        );
      })}
      {digitLive && groupTo >= 0 && (
        <g className="sd-grab c4-piece" {...control("digits-first", "Divide the first digits")} {...drag.bind({ kind: "free" })} {...drag.keys({ kind: "free" })}>
          <rect x={sdColC(col(0)) - 36} y={108} width={(groupTo) * SD_FR.cw + 72} height={72} fill="transparent" />
        </g>
      )}
    </g>
  );

  /* the one thing to touch: one slow pulse around the piece (the runtime's pulse, drawn round the piece) */
  const invite = (() => {
    if (dragging) return null;
    if (stage === "ask" && canPlace && !touched && index === 0) {
      if (kind === "factor") {
        const px = it.bay.missingFirst ? 6 + 160 + 54 + 124 + 54 : 6 + 124 + 54 + 160 + 54;
        return { x: px - 7, y: 17, w: 196 + 14, h: 106 };
      }
      const st = it.st, first = st.first === "parts" ? st.parts : st.total;
      return { x: 5, y: 7, w: chipW(first) + 14, h: 86 };
    }
    const dig = (j: number) => ({ x: sdColC(col(j)) - 41, y: 103, w: 82, h: 78 });
    if (stage === "ask" && kind === "zero" && digitLive && nextJ !== null && !touched) return dig(nextJ);
    if (free && digitLive && !touched) return nextJ !== null ? dig(nextJ) : { x: sdColC(col(0)) - 41, y: 103, w: groupTo * SD_FR.cw + 82, h: 78 };
    return null;
  })();

  /* the left column of phase 3: the answer the story's child gave, or the product and the known number */
  const zeroLeft = () => (
    <g>
      {it.z.theirs ? (
        <g>
          <rect x={0} y={0} width={300} height={116} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          <text x={22} y={38} fontSize={T.micro} fontWeight={500} fill={C.ink}>{tx("their answer")}</text>
          <text x={22} y={96} fontSize={T.xl} fontWeight={700} fill={C.ink}>{it.z.theirs}</text>
        </g>
      ) : (
        <g data-role="reading">
          <text x={0} y={80} fontSize={T.xl} fontWeight={700} fill={C.ink}>
            <tspan fill={quiet}>?</tspan>{" × "}<tspan fill={SD_INK.parts}>{dv.d}</tspan>{" = "}<tspan fill={SD_INK.total}>{indian(dv.D)}</tspan>
          </text>
        </g>
      )}
      {cmp && (
        <g className="sd-in" data-role="reading">
          <text x={0} y={222} fontSize={T.xl} fontWeight={700} fill={C.ink}>
            <tspan fill={C.ink}>{cmp.cur}</tspan>{" < "}<tspan fill={SD_INK.parts}>{cmp.d}</tspan>
          </text>
        </g>
      )}
      {eqLines(314)}
    </g>
  );

  return (
    <g>
      <style>{SD_CSS}</style>

      {/* the running count (phase 4): the asks answered against the asks this question makes */}
      {kind === "left" && (
        <g data-zone="runs">
          <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          <text x={20} y={-40} fontSize={T.speech} fontWeight={700} fill={C.ink}>{lang === "hi" ? `${np} में से ${Math.min(filled, np)}` : lang === "gu" ? `${np} માંથી ${Math.min(filled, np)}` : `${Math.min(filled, np)} of ${np}`}</text>
          <text x={314} y={-44} textAnchor="end" fontSize={T.micro} fontWeight={500} fill={C.ink}>{tx("answered")}</text>
        </g>
      )}

      {story && storyCard()}
      {story && both && shareBar()}
      {story && eqLines(kind === "free" ? 404 : 406)}
      {kind === "factor" && bay()}
      {kind === "factor" && eqLines(290)}
      {kind === "zero" && zeroLeft()}
      {frame()}

      {free && (
        <Key id="free-next" label={tx("Next story")} x={0} y={432} w={260} h={84} C={C} onClick={nextStory}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("Next story")}</text>
        </Key>
      )}

      {/* the number or digit under the finger */}
      {dragging && dragging.kind === "tok" && (() => {
        const tk = kind === "factor" ? null : it.st[dragging.role];
        const txt = tk ? indian(tk.n) + (tk.unit ? " " + tx(tk.unit) : "") : dragging.role === "product" ? indian(dv.D) : String(dv.d);
        const w = tk ? chipW(tk) : 38 + sdTextW(txt, T.prompt);
        return (
          <g pointerEvents="none" filter="url(#fLift)">
            <rect x={drag.drag.x - w / 2} y={drag.drag.y - 36} width={w} height={72} rx={16} fill="#FFFFFF" stroke={C.accent} strokeWidth={3} />
            <text x={drag.drag.x} y={drag.drag.y + 14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{txt}</text>
          </g>
        );
      })()}
      {dragging && dragging.kind === "digit" && (
        <g pointerEvents="none" filter="url(#fLift)">
          <rect x={drag.drag.x - 34} y={drag.drag.y - 34} width={68} height={68} rx={14} fill="#FFFFFF" stroke={C.accent} strokeWidth={3} />
          <text x={drag.drag.x} y={drag.drag.y + 15} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={SD_INK.total}>{dv.digits[dragging.j]}</text>
        </g>
      )}

      {invite && <rect className="c4-pulse" x={invite.x} y={invite.y} width={invite.w} height={invite.h} rx={20} fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" />}
    </g>
  );
}

/* the summary page's small drawing: the child's last right answer of the phase, as a little frame
   (the quotient, and what was left, over the division it answers) */
function Thumb({ n, result, C, w, h, tx = (v: any) => v }: any) {
  const L = (result && result.last) || {};
  const P: any = PHASES[(n || 1) - 1];
  const it = P && P.items[L.item];
  if (!it || L.value === undefined || L.value === null) return null;
  const ps = slotPartsOf(L.value, 2);
  const q = it.parts ? `${ps[0]} ${tx("r")} ${ps[1]}` : String(leadNumber(L.value));
  const bx = w - 128;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <text x={w - 16} y={32} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={SD_INK.q}>{q}</text>
      <path d={`M ${bx} ${h - 8} Q ${bx + 9} ${(h + 38) / 2} ${bx} 40 H ${w - 10}`} fill="none" stroke={C.ink} strokeWidth={2.5} strokeLinecap="round" />
      <text x={bx - 10} y={h - 14} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={SD_INK.parts}>{it.d}</text>
      <text x={w - 16} y={h - 14} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={SD_INK.total}>{indian(it.D)}</text>
    </g>
  );
}

function StoryDivider(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default StoryDivider;
