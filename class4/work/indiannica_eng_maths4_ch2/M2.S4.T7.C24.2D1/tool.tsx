/* ═══ M2.S4.T7.C24.2D1 · estimate_check · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "estimate_check";
const MEDIA_ID = "M2.S4.T7.C24.2D1";
const TOOL_NAME = "Estimate and Check";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["Sometimes a close answer is all you need."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "A fast answer and an exact one, standing together with the gap drawn between them.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Any numbers, any unit, both sides running and the gap bar live.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r13+: `lineFor(line, lang, TR)`); the
   English stays what the checks read. NCERT class 4 terms: इकाई दहाई सैकड़ा हज़ार / એકમ દશક શતક હજાર,
   योज्य / ઉમેરણ (addend), योगफल / સરવાળો (sum), हासिल / વદી (carry), अनुमान / અંદાજ (estimate), round to
   the nearest ... निकटतम ... तक पूर्णांकित करो / નજીકના ... સુધી ફેરવો; the rounding "unit" is a place:
   स्थान / સ્થાન. Digits stay digits: the runtime speaks them in the language in use. A first draft;
   wants a native speaker's read. */
const TR: any = {
  hi: {
    "Estimate and Check": "अनुमान लगाओ और जाँचो",
    "Sometimes a close answer is all you need.": "कभी-कभी पास का उत्तर ही काफ़ी होता है।",
    "A fast answer and an exact one, standing together with the gap drawn between them.": "एक जल्दी वाला उत्तर और एक सटीक उत्तर, साथ-साथ, और बीच में उनका अंतर।",
    "Free play. Any numbers, any unit, both sides running and the gap bar live.": "मुक्त खेल। कोई भी संख्याएँ, किसी भी स्थान तक, दोनों तरफ़ चालू, और अंतर की पट्टी भी।",
    "Round each addend before adding": "जोड़ने से पहले हर योज्य पूर्णांकित करो",
    "Round each number first, then add. Not the other way round.": "पहले हर संख्या को पूर्णांकित करो, फिर जोड़ो। उल्टा नहीं।",
    "Tap the end each number is nearer to, or slide its pin there.": "हर संख्या जिस सिरे के पास है, उस पर टैप करो, या उसकी पिन वहाँ खिसकाओ।",
    "Which two round numbers is the other one sitting between?": "दूसरी संख्या किन दो गोल संख्याओं के बीच है?",
    "Round just the first number. Then round the second, and add the two.": "सिर्फ़ पहली संख्या पूर्णांकित करो। फिर दूसरी, और दोनों को जोड़ो।",
    "Round every addend first, then add the rounded numbers. They end in zeros, so they need no columns.": "पहले हर योज्य पूर्णांकित करो, फिर उन्हें जोड़ो। उनके अंत में शून्य होते हैं, इसलिए खानों की ज़रूरत नहीं।",
    "You learned: round every addend first, then add the rounded numbers.": "तुमने सीखा: पहले हर योज्य पूर्णांकित करो, फिर उन्हें जोड़ो।",
    "Estimated sum?": "अनुमानित योगफल?",
    "Estimate 3,780 + 4,150. Round each addend to the nearest thousand.": "3,780 + 4,150 का अनुमान लगाओ। हर योज्य को निकटतम हज़ार तक पूर्णांकित करो।",
    "Which of your two numbers is already rounded?": "तुम्हारी दो संख्याओं में से कौन सी पहले से गोल है?",
    "Estimate 4,180 + 2,730 to the nearest thousand.": "4,180 + 2,730 का निकटतम हज़ार तक अनुमान लगाओ।",
    "Did you add the rounded numbers, or the exact ones?": "तुमने पूर्णांकित संख्याएँ जोड़ीं, या असली?",
    "Now estimate 6,420 + 1,850 the same way.": "अब 6,420 + 1,850 का इसी तरह अनुमान लगाओ।",
    "Which thousand is 1,850 nearer to?": "1,850 किस हज़ार के ज़्यादा पास है?",
    "The question names the unit": "सवाल स्थान बताता है",
    "Read the question again. Which unit is it asking for?": "सवाल फिर से पढ़ो। वह किस स्थान तक पूछ रहा है?",
    "Press that unit, then round both numbers and add.": "वह स्थान दबाओ, फिर दोनों संख्याएँ पूर्णांकित करके जोड़ो।",
    "Which two numbers of that size is your addend between?": "तुम्हारा योज्य उस आकार की किन दो संख्याओं के बीच है?",
    "Press the unit the question names. Then round every number to it.": "सवाल में लिखा स्थान दबाओ। फिर हर संख्या को उस तक पूर्णांकित करो।",
    "The question sets the unit. Read it before you round, and name it when you give an estimate.": "सवाल स्थान तय करता है। पूर्णांकित करने से पहले पढ़ो, और अनुमान बताते समय उसका नाम लो।",
    "You learned: the question names the unit, so read it before rounding.": "तुमने सीखा: सवाल स्थान बताता है, इसलिए पूर्णांकन से पहले पढ़ो।",
    "Nearest hundred?": "निकटतम सौ तक?",
    "Estimate 2,640 + 5,180 to the nearest hundred. The nearest thousand comes after.": "2,640 + 5,180 का निकटतम सौ तक अनुमान लगाओ। निकटतम हज़ार बाद में आएगा।",
    "What unit does the question name?": "सवाल किस स्थान का नाम लेता है?",
    "To the nearest thousand, the estimate changes.": "निकटतम हज़ार तक, अनुमान बदल जाता है।",
    "Estimate 2,470 + 3,820 to the nearest hundred.": "2,470 + 3,820 का निकटतम सौ तक अनुमान लगाओ।",
    "Which hundred is 2,470 nearer to?": "2,470 किस सौ के ज़्यादा पास है?",
    "Total, nearest hundred?": "कुल, निकटतम सौ तक?",
    "Day one, a pump sold 1,260 L. Day two, 2,740 L. Day three, 3,580 L. Estimate the total to the nearest hundred.": "पहले दिन एक पंप ने 1,260 लीटर बेचा। दूसरे दिन 2,740 लीटर। तीसरे दिन 3,580 लीटर। कुल का निकटतम सौ तक अनुमान लगाओ।",
    "Which two hundreds is 2,740 between?": "2,740 किन दो सैकड़ों के बीच है?",
    "An estimate sits close to the exact answer": "अनुमान सटीक उत्तर के पास होता है",
    "Estimate first. Then stand it beside the exact sum.": "पहले अनुमान लगाओ। फिर उसे सटीक योगफल के पास रखो।",
    "See how far apart the two answers land.": "देखो दोनों उत्तर कितनी दूर हैं।",
    "How far apart are your two answers?": "तुम्हारे दोनों उत्तर कितनी दूर हैं?",
    "Lay the gap against the whole sum. Is it big or small?": "अंतर को पूरे योगफल से मिलाकर देखो। वह बड़ा है या छोटा?",
    "An estimate lands near the exact sum, not on it. The gap stays small, because each number moved only a little.": "अनुमान सटीक योगफल के पास आता है, उस पर नहीं। अंतर छोटा रहता है, क्योंकि हर संख्या थोड़ी ही खिसकी।",
    "You learned: an estimate lands near the exact sum, not on it.": "तुमने सीखा: अनुमान सटीक योगफल के पास आता है, उस पर नहीं।",
    "Estimate 42,860 + 37,410. Round each addend to the nearest ten thousand.": "42,860 + 37,410 का अनुमान लगाओ। हर योज्य को निकटतम दस हज़ार तक पूर्णांकित करो।",
    "Were you asked for an exact sum or a quick one?": "तुमसे सटीक योगफल पूछा गया या जल्दी वाला?",
    "Estimate 26,380 + 43,910 to the nearest ten thousand.": "26,380 + 43,910 का निकटतम दस हज़ार तक अनुमान लगाओ।",
    "Which ten thousand is 26,380 nearer to?": "26,380 किस दस हज़ार के ज़्यादा पास है?",
    "How far apart?": "कितनी दूरी?",
    "A child says 70,000 cannot be right. The exact sum is 70,290. How far apart are they?": "एक बच्चा कहता है कि 70,000 सही नहीं हो सकता। सटीक योगफल 70,290 है। दोनों में कितनी दूरी है?",
    "Start at the estimate. How much more is the exact sum?": "अनुमान से शुरू करो। सटीक योगफल कितना ज़्यादा है?",
    "An estimate is how you check an exact answer": "अनुमान से सटीक उत्तर की जाँच होती है",
    "An estimate is a quick way to check an answer.": "अनुमान उत्तर जाँचने का जल्दी वाला तरीका है।",
    "If an answer is far from its estimate, go back and check it.": "अगर उत्तर अपने अनुमान से दूर है, तो वापस जाकर जाँचो।",
    "How far from your estimate is the answer?": "उत्तर तुम्हारे अनुमान से कितना दूर है?",
    "Build the estimate first. Then check the answer one column at a time, from the ones.": "पहले अनुमान बनाओ। फिर उत्तर को इकाई से, एक-एक खाना करके जाँचो।",
    "An answer far from its estimate is the one to go back to. Building the estimate costs almost nothing.": "जो उत्तर अपने अनुमान से दूर हो, उसी को दोबारा देखो। अनुमान बनाने में लगभग कोई मेहनत नहीं लगती।",
    "You learned: an answer far from its estimate is the one to check.": "तुमने सीखा: अनुमान से दूर वाला उत्तर ही जाँचना है।",
    "A child added 28,450 and 31,260. The answer written was 5,971. Estimate to the nearest ten thousand to check it.": "एक बच्चे ने 28,450 और 31,260 जोड़े। लिखा हुआ उत्तर 5,971 था। इसे जाँचने के लिए निकटतम दस हज़ार तक अनुमान लगाओ।",
    "What does your estimate say the answer should be near?": "तुम्हारा अनुमान कहता है कि उत्तर किसके पास होना चाहिए?",
    "5,971 is nowhere near 60,000, so that answer is wrong.": "5,971 तो 60,000 के आस-पास भी नहीं, इसलिए वह उत्तर गलत है।",
    "Exact sum?": "सटीक योगफल?",
    "Day one of a tournament drew 31,480 people. Day two drew 24,615. How many came in all?": "एक प्रतियोगिता के पहले दिन 31,480 लोग आए। दूसरे दिन 24,615। कुल कितने आए?",
    "Did you carry when a column made ten or more?": "जब किसी खाने में दस या ज़्यादा हुए, क्या तुमने हासिल लिया?",
    "About 56,000, close to its estimate. It could be right.": "लगभग 56,000, अपने अनुमान के पास। यह सही हो सकता है।",
    "Day one, a shop took 18,940. Day two, it took 27,320. The till printed a total of 36,260. Round both to the nearest ten thousand. What is the estimate?": "पहले दिन एक दुकान में 18,940 आए। दूसरे दिन 27,320। बिल मशीन ने कुल 36,260 छापा। दोनों को निकटतम दस हज़ार तक पूर्णांकित करो। अनुमान क्या है?",
    "What does your estimate say the total should be near?": "तुम्हारा अनुमान कहता है कि कुल किसके पास होना चाहिए?",
    "36,260 is far below 50,000. The till got it wrong.": "36,260 तो 50,000 से बहुत नीचे है। बिल मशीन ने गलती की।",
    /* the working area's own words */
    "O": "इ", "T": "द", "H": "सै", "Th": "ह", "TTh": "द.ह.", "L": "ला",
    "nearest": "निकटतम", "hundred": "सौ", "thousand": "हज़ार", "ten thousand": "दस हज़ार", "no unit yet": "अभी चुना नहीं",
    "exact": "सटीक", "estimate": "अनुमान", "written": "लिखा हुआ", "till": "बिल मशीन", "put right": "ठीक किया",
    "go back and check": "वापस जाकर जाँचो", "could be right": "सही हो सकता है", "new numbers": "नई संख्याएँ", "New numbers": "नई संख्याएँ",
  },
  gu: {
    "Estimate and Check": "અંદાજ લગાવો અને ચકાસો",
    "Sometimes a close answer is all you need.": "ક્યારેક નજીકનો જવાબ જ પૂરતો હોય છે.",
    "A fast answer and an exact one, standing together with the gap drawn between them.": "એક ઝડપી જવાબ અને એક ચોક્કસ જવાબ, સાથે સાથે, અને વચ્ચે તેમનો તફાવત.",
    "Free play. Any numbers, any unit, both sides running and the gap bar live.": "મુક્ત રમત. કોઈ પણ સંખ્યાઓ, કોઈ પણ સ્થાન સુધી, બંને બાજુ ચાલુ, અને તફાવતની પટ્ટી પણ.",
    "Round each addend before adding": "ઉમેરતાં પહેલાં દરેક ઉમેરણ ફેરવો",
    "Round each number first, then add. Not the other way round.": "પહેલાં દરેક સંખ્યાનું નજીકનું મૂલ્ય લો, પછી ઉમેરો. ઊલટું નહીં.",
    "Tap the end each number is nearer to, or slide its pin there.": "દરેક સંખ્યા જે છેડાની નજીક છે તેના પર ટેપ કરો, અથવા તેની પિન ત્યાં ખસેડો.",
    "Which two round numbers is the other one sitting between?": "બીજી સંખ્યા કઈ બે ગોળ સંખ્યાઓની વચ્ચે છે?",
    "Round just the first number. Then round the second, and add the two.": "ફક્ત પહેલી સંખ્યા ફેરવો. પછી બીજી, અને બંને ઉમેરો.",
    "Round every addend first, then add the rounded numbers. They end in zeros, so they need no columns.": "પહેલાં દરેક ઉમેરણ ફેરવો, પછી તે ઉમેરો. તેમના અંતે શૂન્ય હોય છે, તેથી ખાનાંની જરૂર નથી.",
    "You learned: round every addend first, then add the rounded numbers.": "તમે શીખ્યા: પહેલાં દરેક ઉમેરણ ફેરવો, પછી તે ઉમેરો.",
    "Estimated sum?": "અંદાજિત સરવાળો?",
    "Estimate 3,780 + 4,150. Round each addend to the nearest thousand.": "3,780 + 4,150 નો અંદાજ લગાવો. દરેક ઉમેરણને નજીકના હજાર સુધી ફેરવો.",
    "Which of your two numbers is already rounded?": "તમારી બે સંખ્યાઓમાંથી કઈ પહેલેથી ગોળ છે?",
    "Estimate 4,180 + 2,730 to the nearest thousand.": "4,180 + 2,730 નો નજીકના હજાર સુધી અંદાજ લગાવો.",
    "Did you add the rounded numbers, or the exact ones?": "તમે ફેરવેલી સંખ્યાઓ ઉમેરી, કે ચોક્કસ?",
    "Now estimate 6,420 + 1,850 the same way.": "હવે 6,420 + 1,850 નો આ જ રીતે અંદાજ લગાવો.",
    "Which thousand is 1,850 nearer to?": "1,850 કયા હજારની વધુ નજીક છે?",
    "The question names the unit": "પ્રશ્ન સ્થાન કહે છે",
    "Read the question again. Which unit is it asking for?": "પ્રશ્ન ફરી વાંચો. તે કયા સ્થાન સુધી પૂછે છે?",
    "Press that unit, then round both numbers and add.": "એ સ્થાન દબાવો, પછી બંને સંખ્યાઓ ફેરવીને ઉમેરો.",
    "Which two numbers of that size is your addend between?": "તમારું ઉમેરણ એ માપની કઈ બે સંખ્યાઓ વચ્ચે છે?",
    "Press the unit the question names. Then round every number to it.": "પ્રશ્નમાં લખેલું સ્થાન દબાવો. પછી દરેક સંખ્યાને તે સુધી ફેરવો.",
    "The question sets the unit. Read it before you round, and name it when you give an estimate.": "પ્રશ્ન સ્થાન નક્કી કરે છે. ફેરવતાં પહેલાં વાંચો, અને અંદાજ કહો ત્યારે તેનું નામ લો.",
    "You learned: the question names the unit, so read it before rounding.": "તમે શીખ્યા: પ્રશ્ન સ્થાન કહે છે, તેથી ફેરવતાં પહેલાં વાંચો.",
    "Nearest hundred?": "નજીકના સો સુધી?",
    "Estimate 2,640 + 5,180 to the nearest hundred. The nearest thousand comes after.": "2,640 + 5,180 નો નજીકના સો સુધી અંદાજ લગાવો. નજીકના હજાર પછી આવશે.",
    "What unit does the question name?": "પ્રશ્ન કયા સ્થાનનું નામ લે છે?",
    "To the nearest thousand, the estimate changes.": "નજીકના હજાર સુધી, અંદાજ બદલાઈ જાય છે.",
    "Estimate 2,470 + 3,820 to the nearest hundred.": "2,470 + 3,820 નો નજીકના સો સુધી અંદાજ લગાવો.",
    "Which hundred is 2,470 nearer to?": "2,470 કયા સોની વધુ નજીક છે?",
    "Total, nearest hundred?": "કુલ, નજીકના સો સુધી?",
    "Day one, a pump sold 1,260 L. Day two, 2,740 L. Day three, 3,580 L. Estimate the total to the nearest hundred.": "પહેલા દિવસે એક પંપે 1,260 લિટર વેચ્યું. બીજા દિવસે 2,740 લિટર. ત્રીજા દિવસે 3,580 લિટર. કુલનો નજીકના સો સુધી અંદાજ લગાવો.",
    "Which two hundreds is 2,740 between?": "2,740 કયા બે સોની વચ્ચે છે?",
    "An estimate sits close to the exact answer": "અંદાજ ચોક્કસ જવાબની નજીક હોય છે",
    "Estimate first. Then stand it beside the exact sum.": "પહેલાં અંદાજ લગાવો. પછી તેને ચોક્કસ સરવાળાની બાજુમાં મૂકો.",
    "See how far apart the two answers land.": "જુઓ બંને જવાબ કેટલા દૂર છે.",
    "How far apart are your two answers?": "તમારા બંને જવાબ કેટલા દૂર છે?",
    "Lay the gap against the whole sum. Is it big or small?": "તફાવતને આખા સરવાળા સાથે સરખાવો. તે મોટો છે કે નાનો?",
    "An estimate lands near the exact sum, not on it. The gap stays small, because each number moved only a little.": "અંદાજ ચોક્કસ સરવાળાની નજીક આવે છે, તેના પર નહીં. તફાવત નાનો રહે છે, કારણ કે દરેક સંખ્યા થોડી જ ખસી.",
    "You learned: an estimate lands near the exact sum, not on it.": "તમે શીખ્યા: અંદાજ ચોક્કસ સરવાળાની નજીક આવે છે, તેના પર નહીં.",
    "Estimate 42,860 + 37,410. Round each addend to the nearest ten thousand.": "42,860 + 37,410 નો અંદાજ લગાવો. દરેક ઉમેરણને નજીકના દસ હજાર સુધી ફેરવો.",
    "Were you asked for an exact sum or a quick one?": "તમને ચોક્કસ સરવાળો પૂછ્યો કે ઝડપી?",
    "Estimate 26,380 + 43,910 to the nearest ten thousand.": "26,380 + 43,910 નો નજીકના દસ હજાર સુધી અંદાજ લગાવો.",
    "Which ten thousand is 26,380 nearer to?": "26,380 કયા દસ હજારની વધુ નજીક છે?",
    "How far apart?": "કેટલું અંતર?",
    "A child says 70,000 cannot be right. The exact sum is 70,290. How far apart are they?": "એક બાળક કહે છે કે 70,000 સાચું ન હોઈ શકે. ચોક્કસ સરવાળો 70,290 છે. બંને વચ્ચે કેટલું અંતર છે?",
    "Start at the estimate. How much more is the exact sum?": "અંદાજથી શરૂ કરો. ચોક્કસ સરવાળો કેટલો વધુ છે?",
    "An estimate is how you check an exact answer": "અંદાજથી ચોક્કસ જવાબ ચકાસાય છે",
    "An estimate is a quick way to check an answer.": "અંદાજ જવાબ ચકાસવાની ઝડપી રીત છે.",
    "If an answer is far from its estimate, go back and check it.": "જો જવાબ તેના અંદાજથી દૂર હોય, તો પાછા જઈ ચકાસો.",
    "How far from your estimate is the answer?": "જવાબ તમારા અંદાજથી કેટલો દૂર છે?",
    "Build the estimate first. Then check the answer one column at a time, from the ones.": "પહેલાં અંદાજ બનાવો. પછી જવાબ એકમથી, એક પછી એક ખાનું ચકાસો.",
    "An answer far from its estimate is the one to go back to. Building the estimate costs almost nothing.": "જે જવાબ તેના અંદાજથી દૂર હોય, તેને જ ફરી જુઓ. અંદાજ બનાવવામાં લગભગ કોઈ મહેનત નથી.",
    "You learned: an answer far from its estimate is the one to check.": "તમે શીખ્યા: અંદાજથી દૂર હોય તે જવાબ જ ચકાસવો.",
    "A child added 28,450 and 31,260. The answer written was 5,971. Estimate to the nearest ten thousand to check it.": "એક બાળકે 28,450 અને 31,260 ઉમેર્યા. લખેલો જવાબ 5,971 હતો. તેને ચકાસવા નજીકના દસ હજાર સુધી અંદાજ લગાવો.",
    "What does your estimate say the answer should be near?": "તમારો અંદાજ કહે છે કે જવાબ શેની નજીક હોવો જોઈએ?",
    "5,971 is nowhere near 60,000, so that answer is wrong.": "5,971 તો 60,000 ની આસપાસ પણ નથી, તેથી એ જવાબ ખોટો છે.",
    "Exact sum?": "ચોક્કસ સરવાળો?",
    "Day one of a tournament drew 31,480 people. Day two drew 24,615. How many came in all?": "એક સ્પર્ધાના પહેલા દિવસે 31,480 લોકો આવ્યા. બીજા દિવસે 24,615. કુલ કેટલા આવ્યા?",
    "Did you carry when a column made ten or more?": "કોઈ ખાનામાં દસ કે વધુ થયા ત્યારે શું તમે વદી લીધી?",
    "About 56,000, close to its estimate. It could be right.": "લગભગ 56,000, તેના અંદાજની નજીક. તે સાચો હોઈ શકે.",
    "Day one, a shop took 18,940. Day two, it took 27,320. The till printed a total of 36,260. Round both to the nearest ten thousand. What is the estimate?": "પહેલા દિવસે એક દુકાનમાં 18,940 આવ્યા. બીજા દિવસે 27,320. બિલ મશીને કુલ 36,260 છાપ્યા. બંનેને નજીકના દસ હજાર સુધી ફેરવો. અંદાજ શું છે?",
    "What does your estimate say the total should be near?": "તમારો અંદાજ કહે છે કે કુલ શેની નજીક હોવું જોઈએ?",
    "36,260 is far below 50,000. The till got it wrong.": "36,260 તો 50,000 થી ઘણું નીચે છે. બિલ મશીને ભૂલ કરી.",
    /* the working area's own words */
    "O": "એ", "T": "દ", "H": "શ", "Th": "હ", "TTh": "દ.હ.", "L": "લા",
    "nearest": "નજીકના", "hundred": "સો", "thousand": "હજાર", "ten thousand": "દસ હજાર", "no unit yet": "હજી પસંદ નથી",
    "exact": "ચોક્કસ", "estimate": "અંદાજ", "written": "લખેલું", "till": "બિલ મશીન", "put right": "સુધાર્યું",
    "go back and check": "પાછા જઈ ચકાસો", "could be right": "સાચું હોઈ શકે", "new numbers": "નવી સંખ્યાઓ", "New numbers": "નવી સંખ્યાઓ",
  },
};

/* ── the picture: exact columns on the left, a rounding strip per addend, the estimate on the right ──
   The stage is split at the divider: the exact side works in place-value columns; the estimate side
   sends each addend's pin to the nearer end of its strip and stacks the rounded numbers, which need
   no columns. Under both sums, a gap line from nothing up past both answers. */
const UNIT_WORD: Record<number, string> = { 100: "hundred", 1000: "thousand", 10000: "ten thousand" };
const HEADS = ["O", "T", "H", "Th", "TTh", "L"];
const BLUE = CONTENT.hundred, GREEN = CONTENT.one, ROSE = CONTENT.bead, AMBER = CONTENT.ten, VERM = CONTENT.pointer;
const ZERO = "#767676";
const deep = (c: string) => shade(c, 0.25);
const G = {
  xr: 306, cw: 54,               /* exact columns: right edge, column width */
  divX: 322,                     /* the ruled line between the two sides */
  sa: 465, sb: 680,              /* a rounding strip runs from sa to sb ... */
  plateW: 100, plateGap: 37,     /* ... between its two end keys, clear of the pin's finger box */
  el: 840, er: 1070, plusE: 864, /* the estimate stack */
  headY: 88, headH: 34, carryY: 150, /* the carry circles sit between the headings and the first addend */
  row0: 200, pitch: 92,
  gx0: 64, gx1: 976, gAxis: 490,  /* the gap line: a band along the foot of both sides */
};
/* a column told as one line in a correction: the equation at the left, its counters in a row */
const STORY = { eqX: 24, eqY: 504, x0: 380, pitch: 34, y: 488 };
const rowY = (i: number) => G.row0 + i * G.pitch;
const ruleYOf = (n: number) => rowY(n - 1) + 44;
const sumYOf = (n: number) => ruleYOf(n) + 46;
const colC = (k: number) => G.xr - (k + 0.5) * G.cw;
const clampTo = (x: number, a: number, b: number) => Math.min(b, Math.max(a, x));
const setAt = (a: any[], i: number, x: any) => { const b = a.slice(); b[i] = x; return b; };

/* the tool's own arithmetic (the oracle below takes a different road) */
const lowOf = (a: number, u: number) => Math.floor(a / u) * u;
const nearOf = (a: number, u: number) => (a - lowOf(a, u) >= u / 2 ? lowOf(a, u) + u : lowOf(a, u));
const totalOf = (xs: number[]) => xs.reduce((s, x) => s + x, 0);
const estOf = (xs: number[], u: number) => totalOf(xs.map((x) => nearOf(x, u)));
const digitAt = (v: number, k: number) => Math.floor(v / Math.pow(10, k)) % 10;
const lenOf = (v: number) => String(Math.max(0, Math.trunc(v))).length;
/* column addition from the ones: the digit written in each column and the carry it sends on */
const columnsOf = (xs: number[], cols: number) => {
  const out: any[] = [];
  let carry = 0;
  for (let k = 0; k < cols; k++) {
    const s = xs.reduce((t, x) => t + digitAt(x, k), 0) + carry;
    out.push({ digit: s % 10, carry: Math.floor(s / 10) });
    carry = Math.floor(s / 10);
  }
  return out;
};
/* the gap line: from 0 to the next ten thousand past both answers, or zoomed to the gap itself */
const gapMax = (a: number, b: number) => Math.max(10000, Math.ceil((Math.max(a, b) * 1.12) / 10000) * 10000);
const zoomOf = (a: number, b: number) => {
  const d = Math.max(1, Math.abs(a - b)), span = Math.pow(10, Math.ceil(Math.log10(d * 2))), step = span / 10;
  const lo = Math.floor(Math.min(a, b) / step) * step;
  return [lo, lo + span];
};
/* a rounded number: its leading digits in rose, its trailing zeros grey ("4,000", "7,800") */
const roseParts = (v: number) => { const s = indian(v); const m = /^(.*[1-9])([0,]*)$/.exec(s); return m ? [m[1], m[2]] : ["", s]; };

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   items   three a phase. kind: "estimate" (round the addends, add the rounded ones), "gap" (how far
           the estimate is from the exact sum), "exact" (the column sum, checked by its estimate).
           adds = the addends, unit = the unit the question names, near = the misconception's answer,
           pick = the unit picker is live (phase 2), also = a second unit shown at the win,
           compare = the exact sum and the gap follow the win, written = an answer someone else wrote */
const PHASES = [
  {
    n: 1,
    concept: "Round each addend before adding",
    conceptId: "M2.S4.T7.C24", objectiveIds: ["O11"],
    says: ["Round each number first, then add. Not the other way round.", "Tap the end each number is nearer to, or slide its pin there."],
    /* tries, as the plan writes it: rung 1 the item's miss; rung 2 which two round numbers the other sits
       between; rung 3 round one addend on its own, then the other */
    ladder: ["Which two round numbers is the other one sitting between?", "Round just the first number. Then round the second, and add the two."],
    closing: "Round every addend first, then add the rounded numbers. They end in zeros, so they need no columns.",
    learned: "You learned: round every addend first, then add the rounded numbers.",
    traceback: "Each pin slides to its nearer thousand, the rounded numbers stand in rose, and their sum lands under the rule.",
    items: [
      /* learn ML1: answer in the plan = 8,000 */
      { qid: "M2.S4.T7.C24:ML1", kind: "estimate", adds: [3780, 4150], unit: 1000, near: 8150, winMs: 2600, ask: "Estimated sum?",
        say: "Estimate 3,780 + 4,150. Round each addend to the nearest thousand.", answer: 8000, miss: "Which of your two numbers is already rounded?" },
      /* practice 1: answer in the plan = 7,000, because the rounded addends are 4,000 and 3,000 */
      { qid: "M2.S4.T7.C24:1", kind: "estimate", adds: [4180, 2730], unit: 1000, near: 6730, winMs: 2600, ask: "Estimated sum?",
        say: "Estimate 4,180 + 2,730 to the nearest thousand.", answer: 7000, miss: "Did you add the rounded numbers, or the exact ones?" },
      /* practice 2: answer in the plan = 8,000, because the rounded addends are 6,000 and 2,000 */
      { qid: "M2.S4.T7.C24:2", kind: "estimate", adds: [6420, 1850], unit: 1000, near: 7850, winMs: 2600, ask: "Estimated sum?",
        say: "Now estimate 6,420 + 1,850 the same way.", answer: 8000, miss: "Which thousand is 1,850 nearer to?" },
    ],
  },
  {
    n: 2,
    concept: "The question names the unit",
    conceptId: "M2.S4.T7.C25", objectiveIds: ["O11"],
    says: ["Read the question again. Which unit is it asking for?", "Press that unit, then round both numbers and add."],
    /* tries, as the plan writes it: rung 1 what unit the question names; rung 2 which two numbers of that
       size the addend is between; rung 3 the picker is cut to the question's unit */
    ladder: ["Which two numbers of that size is your addend between?", "Press the unit the question names. Then round every number to it."],
    closing: "The question sets the unit. Read it before you round, and name it when you give an estimate.",
    learned: "You learned: the question names the unit, so read it before rounding.",
    traceback: "The question's unit key is lit, the strips rezoom to it, each pin slides to its nearer end and the estimate lands with its unit named; an estimate made in the other unit stands above it, not crossed out.",
    items: [
      /* learn ML2: answer in the plan = 7,800 to the nearest hundred, and 8,000 to the nearest thousand
         (the child gives the hundred; the win rezooms to the thousand and stands 8,000 beside it) */
      { qid: "M2.S4.T7.C25:ML2", kind: "estimate", pick: true, also: 1000, adds: [2640, 5180], unit: 100, near: 8000, winMs: 5600, ask: "Nearest hundred?",
        say: "Estimate 2,640 + 5,180 to the nearest hundred. The nearest thousand comes after.", answer: 7800, miss: "What unit does the question name?",
        alsoLine: "To the nearest thousand, the estimate changes." },
      /* practice 3: answer in the plan = 6,300, because the rounded addends are 2,500 and 3,800 */
      { qid: "M2.S4.T7.C25:3", kind: "estimate", pick: true, adds: [2470, 3820], unit: 100, near: 6000, winMs: 2600, ask: "Nearest hundred?",
        say: "Estimate 2,470 + 3,820 to the nearest hundred.", answer: 6300, miss: "Which hundred is 2,470 nearer to?" },
      /* practice 4: answer in the plan = 7,600 L, because the rounded addends are 1,300, 2,700 and 3,600 */
      { qid: "M2.S4.T7.C25:4", kind: "estimate", pick: true, adds: [1260, 2740, 3580], unit: 100, near: 8000, winMs: 3000, ask: "Total, nearest hundred?",
        say: "Day one, a pump sold 1,260 L. Day two, 2,740 L. Day three, 3,580 L. Estimate the total to the nearest hundred.", answer: 7600, miss: "Which two hundreds is 2,740 between?" },
    ],
  },
  {
    n: 3,
    concept: "An estimate sits close to the exact answer",
    conceptId: "M2.S4.T7.C26", objectiveIds: ["O12"],
    says: ["Estimate first. Then stand it beside the exact sum.", "See how far apart the two answers land."],
    /* tries, as the plan writes it: rung 1 exact sum or a quick one; rung 2 how far apart the two answers
       are; rung 3 the gap laid against the length of the exact sum */
    ladder: ["How far apart are your two answers?", "Lay the gap against the whole sum. Is it big or small?"],
    closing: "An estimate lands near the exact sum, not on it. The gap stays small, because each number moved only a little.",
    learned: "You learned: an estimate lands near the exact sum, not on it.",
    traceback: "The rounded numbers are added straight across while the exact side keeps its columns and its carries; for the gap, the line zooms in and the distance is drawn and labelled.",
    items: [
      /* learn ML3: answer in the plan = The estimate is 80,000 and the exact sum is 80,270, which is close to it */
      { qid: "M2.S4.T7.C26:ML3", kind: "estimate", compare: true, adds: [42860, 37410], unit: 10000, near: 80270, winMs: 6400, ask: "Estimated sum?",
        say: "Estimate 42,860 + 37,410. Round each addend to the nearest ten thousand.", answer: 80000, miss: "Were you asked for an exact sum or a quick one?" },
      /* practice 5: answer in the plan = The estimate is 70,000 and the exact sum is 70,290 */
      { qid: "M2.S4.T7.C26:5", kind: "estimate", compare: true, adds: [26380, 43910], unit: 10000, near: 70290, winMs: 6400, ask: "Estimated sum?",
        say: "Estimate 26,380 + 43,910 to the nearest ten thousand.", answer: 70000, miss: "Which ten thousand is 26,380 nearer to?" },
      /* practice 6: answer in the plan = That an estimate is not meant to match the exact sum. It is meant to
         land near it, and 70,000 does. Asked as the gap the phase draws: 70,290 is 290 past 70,000 */
      { qid: "M2.S4.T7.C26:6", kind: "gap", adds: [26380, 43910], unit: 10000, near: 710, winMs: 3000, ask: "How far apart?",
        say: "A child says 70,000 cannot be right. The exact sum is 70,290. How far apart are they?", answer: 290, miss: "Start at the estimate. How much more is the exact sum?" },
    ],
  },
  {
    n: 4,
    concept: "An estimate is how you check an exact answer",
    conceptId: "M2.S4.T7.C27", objectiveIds: ["O12"],
    says: ["An estimate is a quick way to check an answer.", "If an answer is far from its estimate, go back and check it."],
    /* tries, as the plan writes it: rung 1 what the estimate says the answer should be near; rung 2 how far
       the answer stands from it; rung 3 the written sum lit a column at a time from the ones */
    ladder: ["How far from your estimate is the answer?", "Build the estimate first. Then check the answer one column at a time, from the ones."],
    closing: "An answer far from its estimate is the one to go back to. Building the estimate costs almost nothing.",
    learned: "You learned: an answer far from its estimate is the one to check.",
    traceback: "The estimate builds on the right and the gap bar runs to the written answer; for the exact sum, the columns are worked from the ones, and the column that makes ten is told as one line whose ten counters tie off into the carry circle over the next column.",
    items: [
      /* learn ML4: answer in the plan = The estimate is 60,000 and 5,971 is nowhere near it, so the answer is wrong. The sum is 59,710 */
      { qid: "M2.S4.T7.C27:ML4", kind: "estimate", written: 5971, tag: "written", adds: [28450, 31260], unit: 10000, near: 5971, winMs: 8000, ask: "Estimated sum?",
        say: "A child added 28,450 and 31,260. The answer written was 5,971. Estimate to the nearest ten thousand to check it.", answer: 60000,
        miss: "What does your estimate say the answer should be near?", winLine: "5,971 is nowhere near 60,000, so that answer is wrong." },
      /* practice 7: answer in the plan = 56,095 people, which is about 56,000 (the exact sum is asked; the
         win stands its estimate of 56,000 beside it) */
      { qid: "M2.S4.T7.C27:7", kind: "exact", adds: [31480, 24615], unit: 1000, near: 55095, winMs: 6400, ask: "Exact sum?",
        say: "Day one of a tournament drew 31,480 people. Day two drew 24,615. How many came in all?", answer: 56095,
        miss: "Did you carry when a column made ten or more?", winLine: "About 56,000, close to its estimate. It could be right." },
      /* practice 8: answer in the plan = The estimate is 50,000, and 36,260 is far from it, so the till is wrong. The total is 46,260 */
      { qid: "M2.S4.T7.C27:8", kind: "estimate", written: 36260, tag: "till", adds: [18940, 27320], unit: 10000, near: 36260, winMs: 8000, ask: "Estimated sum?",
        say: "Day one, a shop took 18,940. Day two, it took 27,320. The till printed a total of 36,260. Round both to the nearest ten thousand. What is the estimate?", answer: 50000,
        miss: "What does your estimate say the total should be near?", winLine: "36,260 is far below 50,000. The till got it wrong." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  units: { hundred: 100, thousand: 1000, "ten thousand": 10000 },
  columns: ["TTh", "Th", "H", "T", "O"],
  rounding: "the child sends each pin to an end of its strip: a tap on an end key sends it there, a drag drops it at the end it is let go nearer to, the arrow keys send a focused pin left or right; a tap on the pin does not move it. A correction slides it to the nearer end; exactly halfway goes up",
  gapLine: "from 0 to the next ten thousand past both answers; a tap zooms it to the gap",
  colours: { addend: "blue", sum: "green", carry: "vermilion", rounded: "rose", underDiscussion: "amber", placeZero: "grey" },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work:
   rounding by reading the digit just below the unit, adding digit strings column by column */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const zeros = (u: number) => String(u).length - 1;
  const roundStr = (a: number, u: number) => {
    const s = String(a), z = zeros(u), head = s.slice(0, Math.max(0, s.length - z)) || "0";
    const below = s.length - z >= 0 ? s.charAt(s.length - z) : "0";
    return (Number(head) + (Number(below || "0") >= 5 ? 1 : 0)) * Number("1" + "0".repeat(z));
  };
  const addStr = (xs: number[]) => {
    const ss = xs.map(String), L = Math.max(...ss.map((s) => s.length));
    let out = "", c = 0;
    for (let k = 0; k < L; k++) {
      let s = c;
      for (const t of ss) { const d = t.charAt(t.length - 1 - k); s += d ? d.charCodeAt(0) - 48 : 0; }
      out = String(s % 10) + out; c = (s - (s % 10)) / 10;
    }
    return Number((c ? String(c) : "") + out);
  };
  const est = addStr(it.adds.map((a: number) => roundStr(a, it.unit))), exact = addStr(it.adds);
  if (it.also && addStr(it.adds.map((a: number) => roundStr(a, it.also))) === it.answer) return false; /* the second unit must give a different estimate */
  if (it.written !== undefined && it.written === exact) return false;                                  /* a written answer to check is not the sum */
  if (it.kind === "estimate") return it.answer === est && it.near !== est;
  if (it.kind === "exact") return it.answer === exact;
  if (it.kind === "gap") return it.answer === (exact > est ? exact - est : est - exact);
  return false;
}));
/* the most likely wrong answer (the item's misconception); judge must reject it:
   phase 1 rounds one addend and keeps the other, phase 2 rounds to the other unit, phase 3 gives the
   exact sum as the estimate, phase 4 trusts the written answer or drops a carry */
const nearMiss = (item: any) => (item.near !== undefined ? item.near : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;
/* what the slot shows while the child types: a number from 1,000 up with its Indian commas */
const format = (s: any) => (/^\d{4,9}$/.test(String(s ?? "")) ? indian(Number(s)) : String(s ?? ""));

/* every answer is typed on the pad; the working area is where the child rounds, and where the
   traceback and the win redraw the maths */
const solve = (item: any, T: any) => T.submit(item.answer);
const answer = (item: any, v: any) => undefined;
const check = () => undefined;

/* what the working area holds for one question */
const freshOf = (it: any) => {
  const adds = (it.adds || []).slice();
  const exact = totalOf(adds);
  const cols = Math.max(4, lenOf(Math.max(exact, it.written || 0, ...adds)));
  const done = it.kind === "gap"; /* the gap question comes in with both sides finished */
  const est = estOf(adds, it.unit);
  const work = columnsOf(adds, cols);
  const w = it.written === undefined ? null : it.written;
  return {
    kind: it.kind, adds, qUnit: it.unit, unit: it.pick && it.kind !== "free" ? null : it.unit, pick: !!it.pick,
    also: it.also || null, compare: !!it.compare, written: w, tag: it.tag || null, cols, exact,
    pins: adds.map((a: number) => (done ? nearOf(a, it.unit) : a)),
    rounded: adds.map((a: number) => (done ? nearOf(a, it.unit) : null)),
    by: adds.map(() => (done ? "tool" : null)),
    ests: done ? [{ unit: it.unit, value: est }] : [],
    cells: Array.from({ length: cols }, (_, k) => (done ? (k < lenOf(exact) ? { d: digitAt(exact, k), tone: "sum" } : null)
      : w !== null ? (k < lenOf(w) ? { d: digitAt(w, k), tone: "written" } : null) : null)),
    carries: Array.from({ length: cols }, (_, k) => (done && k > 0 ? work[k - 1].carry : 0)),
    gap: done ? { a: est, b: exact, tone: "sum", label: false, zoom: false, slide: true } : null,
    lit: [], focus: -1, ring: null, fly: null, story: null, verdict: null, unitRing: null, touched: false, zoomFree: false,
  };
};
/* free play: the exact side always worked, the estimate and the gap as soon as both pins are rounded */
const freeView = (s: any) => {
  const work = columnsOf(s.adds, s.cols), L = lenOf(s.exact);
  const all = s.unit !== null && s.rounded.every((x: any) => x !== null);
  const est = all ? totalOf(s.rounded) : null;
  return {
    ...s,
    cells: Array.from({ length: s.cols }, (_, k) => (k < L ? { d: work[k].digit, tone: "sum" } : null)),
    carries: work.map((_: any, k: number) => (k > 0 ? work[k - 1].carry : 0)),
    ests: all ? [{ unit: s.unit, value: est }] : [],
    gap: all ? { a: est, b: s.exact, tone: "sum", label: true, zoom: s.zoomFree, slide: true } : null,
  };
};
const freePair = () => [1000 + Math.floor(Math.random() * 49000), 1000 + Math.floor(Math.random() * 49000)];

const EC_CSS = `
.ec-move{transition:transform 380ms cubic-bezier(.3,.7,.25,1)}
.ec-slide{transition:transform 760ms cubic-bezier(.3,.7,.25,1)}
.ec-in{animation:ecIn 420ms ease-out both}
.ec-late{animation:ecIn 300ms ease-out 700ms both}
@keyframes ecIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
.ec-grab{cursor:grab}
@media (prefers-reduced-motion:reduce){.ec-move,.ec-slide{transition:none}.ec-in,.ec-late{animation:none}}
`;

/* a pin: its tip at (0,0); down = the head above the line. The strip's pin is the bigger one (a thing to
   hold); the gap line's pins are smaller so both fit under the sums */
const pinPath = (down: boolean, big = false) => (big ? "M 0 0 L -12.3 -17.4 A 15 15 0 1 1 12.3 -17.4 Z"
  : down ? "M 0 0 L -10.5 -14.3 A 13 13 0 1 1 10.5 -14.3 Z" : "M 0 0 L -10.5 14.3 A 13 13 0 1 0 10.5 14.3 Z");

/* a rounded number or an estimate: rose digits, grey trailing zeros */
const RoseNum = ({ v, x, y, size = T.xl, anchor = "end" }: any) => {
  const [lead, tail] = roseParts(v);
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700}>
      <tspan fill={deep(ROSE)}>{lead}</tspan><tspan fill={ZERO}>{tail}</tspan>
    </text>
  );
};

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const [st, setSt] = useState<any>(() => freshOf(item));
  const ref = useRef<any>(st);
  const put = (p: any) => { ref.current = { ...ref.current, ...(typeof p === "function" ? p(ref.current) : p) }; setSt(ref.current); };
  const setupFor = useRef(index);
  const busy = tl.busy;

  const reset = (it: any) => { tl.stop(); ref.current = freshOf(it); setSt(ref.current); api.lock(false); };
  useEffect(() => { if (stage === "ask" && setupFor.current !== index) { setupFor.current = index; reset(item); } }, [stage, index]);
  /* free play (the plan's freePlay): any numbers, any unit, both sides running, the gap bar live */
  useEffect(() => { if (!free) return; setupFor.current = -2; reset({ kind: "free", adds: freePair(), unit: 1000, pick: true }); }, [free]);

  /* every answer is typed on the pad: Enter goes straight to the answer */
  api.onEnter(null);

  const v = free ? freeView(st) : st;
  const nA = v.adds.length;
  const u = v.unit;
  const asking = stage === "ask" && !busy;
  const pinsLive = !busy && u !== null && ((stage === "ask" && v.kind !== "gap") || free);
  const pickLive = !busy && ((stage === "ask" && v.pick) || free);
  const zoomLive = !busy && ((stage === "ask" && v.kind === "gap") || (free && !!v.gap));

  /* ── the child's acts ── */
  const chooseUnit = (uu: number) => {
    if (!pickLive || ref.current.unit === uu) return;
    const a = ref.current.adds;
    put({ unit: uu, pins: a.slice(), rounded: a.map(() => null), by: a.map(() => null), zoomFree: false });
    api.sfx.tick();
  };
  const sendPin = (i: number, to: number) => {
    put((q: any) => ({ pins: setAt(q.pins, i, to), rounded: setAt(q.rounded, i, to), by: setAt(q.by, i, "child"), touched: true, zoomFree: false }));
    api.sfx.tick();
  };
  /* the child does the rounding (taught in chapter 1; here it is half the estimate), so nothing rounds
     for them: a tap on an end key sends that strip's pin there; a drag drops the pin at the end it is
     let go nearer to; a tap on the pin does not move it; on a focused pin the arrows send it left or right */
  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (!pinsLive || !pay || !moved || !isFinite(p.x)) return;
    const q = ref.current, i = pay.row, a = q.adds[i], uu = q.unit;
    if (uu === null || uu === undefined) return;
    const lo = lowOf(a, uu), at = lo + ((clampTo(p.x, G.sa, G.sb) - G.sa) / (G.sb - G.sa)) * uu;
    sendPin(i, at >= lo + uu / 2 ? lo + uu : lo);
  });
  const pinKeys = (i: number) => ({
    onKeyDown: (e: any) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault(); e.stopPropagation();
      const q = ref.current, uu = q.unit;
      if (!pinsLive || !uu) return;
      const lo = lowOf(q.adds[i], uu);
      sendPin(i, e.key === "ArrowLeft" ? lo : lo + uu);
    },
  });
  const sendTo = (i: number, to: number) => { if (pinsLive) sendPin(i, to); };
  const toggleZoom = () => {
    if (!zoomLive) return;
    if (free) put((q: any) => ({ zoomFree: !q.zoomFree }));
    else put((q: any) => ({ gap: q.gap ? { ...q.gap, zoom: !q.gap.zoom } : q.gap, touched: true }));
    api.sfx.tick();
  };
  const newNumbers = () => {
    if (!free || busy) return;
    const uu = ref.current.unit || 1000;
    ref.current = { ...freshOf({ kind: "free", adds: freePair(), unit: uu, pick: true }) };
    setSt(ref.current);
    api.sfx.tick();
  };

  /* ── motion, built on a simulated copy so every step knows what came before it ── */
  const roundSteps = (sim: any, slow: number) => {
    const out: any[] = [];
    if (sim.unit === null) return out;
    sim.adds.forEach((a: number, i: number) => {
      const to = nearOf(a, sim.unit);
      if (sim.rounded[i] === to) return;
      out.push([300 * slow, () => put({ focus: i })]);
      if (sim.rounded[i] !== null) {
        sim.pins = setAt(sim.pins, i, a); sim.rounded = setAt(sim.rounded, i, null); sim.by = setAt(sim.by, i, null);
        const p0 = sim.pins, r0 = sim.rounded, b0 = sim.by;
        out.push([420 * slow, () => put({ pins: p0, rounded: r0, by: b0 })]);
      }
      sim.pins = setAt(sim.pins, i, to); sim.rounded = setAt(sim.rounded, i, to); sim.by = setAt(sim.by, i, "tool");
      const p1 = sim.pins, r1 = sim.rounded, b1 = sim.by;
      out.push([460 * slow, () => { put({ pins: p1, rounded: r1, by: b1 }); api.sfx.tick(); }]);
    });
    out.push([160, () => put({ focus: -1 })]);
    return out;
  };
  const unitSteps = (sim: any, uu: number, slow: number) => {
    sim.unit = uu; sim.pins = sim.adds.slice(); sim.rounded = sim.adds.map(() => null); sim.by = sim.adds.map(() => null);
    const p = sim.pins, r = sim.rounded, b = sim.by;
    return [[520 * slow, () => put({ unitRing: uu })], [520 * slow, () => { put({ unit: uu, pins: p, rounded: r, by: b }); api.sfx.tick(); }]];
  };
  const estSteps = (sim: any, value: number, uu: number, keep: boolean, ring: boolean, slow: number) => {
    const next = keep && sim.adds.length < 3 ? [...sim.ests, { unit: uu, value }] : [{ unit: uu, value }];
    sim.ests = next;
    return [[520 * slow, () => { put({ ests: next, ring: ring ? { kind: "est", j: next.length - 1 } : null }); api.sfx.tick(); }]];
  };
  /* the exact sum worked from the ones. A column that makes ten or more sends one counter up into the
     carry circle over the next column. With `explain` (a correction) that column is told as one line,
     its digits in blue, and its counters tie off ten; what is left is the digit that stays */
  const exactSteps = (sim: any, slow: number, explain = false) => {
    const work = columnsOf(sim.adds, sim.cols), L = lenOf(sim.exact), out: any[] = [];
    sim.cells = sim.cells.map(() => null); sim.carries = sim.carries.map(() => 0);
    { const c0 = sim.cells, k0 = sim.carries; out.push([200, () => put({ cells: c0, carries: k0, lit: [], story: null })]); }
    const base = sumYOf(sim.adds.length) + 20;
    for (let k = 0; k < L; k++) {
      const carryIn = sim.carries[k];
      sim.cells = setAt(sim.cells, k, { d: work[k].digit, tone: "sum" });
      const cs = sim.cells;
      const up = work[k].carry && k + 1 < sim.cols ? work[k].carry : 0;
      if (up) sim.carries = setAt(sim.carries, k + 1, up);
      const ks = sim.carries;
      if (explain && up) {
        const parts = [...(carryIn ? [{ v: carryIn, carry: true }] : []),
          ...sim.adds.filter((a: number) => k < lenOf(a)).map((a: number) => ({ v: digitAt(a, k) }))];
        const story = { k, parts, s: work[k].digit + 10 * up, st: 0 };
        out.push([900 * slow, () => put({ lit: [k], story })]);
        out.push([800 * slow, () => put({ story: { ...story, st: 1 } })]);
        out.push([60, () => put({ story: { ...story, st: 2 }, fly: { x: STORY.x0 + 4.5 * STORY.pitch, y: STORY.y } })]);
        out.push([600 * slow, () => put({ fly: { x: colC(k + 1), y: G.carryY } })]);
        out.push([80, () => { put({ fly: null, carries: ks }); api.sfx.tick(); }]);
        out.push([1000 * slow, () => { put({ cells: cs, story: { ...story, st: 3 } }); api.sfx.tick(); }]);
      } else {
        out.push([200 * slow, () => put({ lit: [k] })]);
        out.push([300 * slow, () => { put({ cells: cs }); api.sfx.tick(); }]);
        if (up) {
          out.push([40, () => put({ fly: { x: colC(k), y: base - 44 } })]);
          out.push([440 * slow, () => put({ fly: { x: colC(k + 1), y: G.carryY } })]);
          out.push([60, () => put({ fly: null, carries: ks })]);
        }
      }
    }
    out.push([160, () => put({ lit: [], story: null })]);
    return out;
  };
  const gapSteps = (sim: any, b: number, tone: string, slow: number) => {
    const a = sim.ests[sim.ests.length - 1].value;
    const g0 = { a, b, tone, label: false, zoom: false, slide: false }, g1 = { ...g0, slide: true }, g2 = { ...g1, label: true };
    sim.gap = g2;
    return [[60, () => put({ gap: g0 })], [940 * slow, () => put({ gap: g1 })], [420, () => { put({ gap: g2 }); api.sfx.tick(); }]];
  };
  /* the written answer checked a column at a time from the ones: a column that disagrees is put right
     and stays lit, and the gap bar shortens as it goes; a carry stands small over the column it joins */
  const checkSteps = (sim: any, slow: number) => {
    const work = columnsOf(sim.adds, sim.cols), L = Math.min(sim.cols, Math.max(lenOf(sim.exact), lenOf(sim.written))), out: any[] = [];
    let cur = sim.written, keep: number[] = [];
    sim.carries = sim.carries.map(() => 0);
    { const k0 = sim.carries; out.push([120, () => put({ carries: k0 })]); }
    for (let k = 0; k < L; k++) {
      const want = k < lenOf(sim.exact) ? work[k].digit : null;
      const has = sim.cells[k] ? sim.cells[k].d : null;
      const litNow = [...keep, k];
      out.push([300 * slow, () => put({ lit: litNow })]);
      if (k > 0 && work[k - 1].carry) sim.carries = setAt(sim.carries, k, work[k - 1].carry);
      const ks = sim.carries;
      if (has !== want) {
        cur += ((want || 0) - (has || 0)) * Math.pow(10, k);
        keep = [...keep, k];
        sim.cells = setAt(sim.cells, k, want === null ? null : { d: want, tone: "sum", fixed: true });
        sim.gap = { ...sim.gap, b: cur };
        const cs = sim.cells, g = sim.gap, kp = keep;
        out.push([440 * slow, () => { put({ cells: cs, gap: g, carries: ks, lit: kp }); api.sfx.tick(); }]);
      } else {
        sim.cells = setAt(sim.cells, k, has === null ? null : { d: has, tone: "sum" });
        const cs = sim.cells, kp = keep;
        out.push([220 * slow, () => put({ cells: cs, carries: ks, lit: kp })]);
      }
    }
    sim.gap = { ...sim.gap, tone: "sum" };
    const g = sim.gap;
    out.push([300, () => put({ gap: g, lit: [] })]);
    return out;
  };
  const exactShown = (s: any) => s.cells.every((c: any, k: number) => k >= lenOf(s.exact) || (c && c.tone === "sum" && c.d === digitAt(s.exact, k)));

  /* ── the traceback: the mathematics redrawn in steps, ending on the whole right answer;
     nothing marked, the child's answer stays in the slot ── */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    const q = ref.current, sim: any = { ...q }, got = leadNumber(wrong.value), slow = 1.25;
    const S: any[] = [[300, () => put({ touched: true, ring: null, verdict: null })]];
    if (q.kind === "estimate") {
      if (q.pick) {
        /* the unit comes out of the question: an estimate made in the other unit is built and left
           standing with its unit named, then the question's own unit is lit and the estimate rebuilt */
        const other = q.qUnit === 100 ? 1000 : 100;
        sim.ests = []; S.push([200, () => put({ ests: [] })]);
        if (got === estOf(q.adds, other) && q.adds.length < 3) {
          if (sim.unit !== other) S.push(...unitSteps(sim, other, slow));
          S.push(...roundSteps(sim, slow), ...estSteps(sim, got as number, other, true, false, slow), [500, () => {}]);
        }
        if (sim.unit !== q.qUnit) S.push(...unitSteps(sim, q.qUnit, slow));
        S.push(...roundSteps(sim, slow), ...estSteps(sim, item.answer, q.qUnit, true, true, slow));
      } else {
        /* the exact sum handed in as the estimate: it is shown where it belongs, on the exact side */
        if (q.compare && got === q.exact && !exactShown(sim)) S.push(...exactSteps(sim, slow), [400, () => {}]);
        S.push(...roundSteps(sim, slow), ...estSteps(sim, item.answer, q.qUnit, false, true, slow));
        if (q.written !== null) S.push(...gapSteps(sim, q.written, "written", slow), [300, () => put({ ring: { kind: "est", j: 0 } })]);
      }
    } else if (q.kind === "gap") {
      /* the gap is zoomed until it can be counted, then drawn and labelled */
      S.push([760, () => put((s: any) => ({ gap: { ...s.gap, zoom: true, label: false } }))]);
      S.push([520, () => { put((s: any) => ({ gap: { ...s.gap, label: true }, ring: { kind: "label" } })); api.sfx.tick(); }]);
    } else if (q.kind === "exact") {
      S.push(...exactSteps(sim, slow, true), [300, () => put({ ring: { kind: "sum" } })]);
    }
    tl.run(S, () => api.lock(false));
  }, [wrong]);

  /* ── the win: the maths moving on from the right answer ── */
  /* item.alsoLine and item.winLine are spoken below; written out here so `node cli.mjs voice` bakes them:
     api.say("To the nearest thousand, the estimate changes.")
     api.say("5,971 is nowhere near 60,000, so that answer is wrong.")
     api.say("About 56,000, close to its estimate. It could be right.")
     api.say("36,260 is far below 50,000. The till got it wrong.") */
  useEffect(() => {
    if (stage !== "win") return;
    /* the steps the child has seen already (rounding, the estimate landing) go quickly, so the part
       that is new (the other unit, the exact sum and its gap, the column check) has the time */
    const q = ref.current, sim: any = { ...q }, S: any[] = [[60, () => put({ ring: null, focus: -1 })]], f = 0.6;
    if (q.kind === "estimate") {
      if (sim.unit !== q.qUnit) S.push(...unitSteps(sim, q.qUnit, f));
      S.push(...roundSteps(sim, f));
      const last = sim.ests[sim.ests.length - 1];
      if (!last || last.value !== item.answer || last.unit !== q.qUnit) S.push(...estSteps(sim, item.answer, q.qUnit, q.pick, false, f));
      if (q.also && !sim.ests.some((e: any) => e.unit === q.also)) {
        /* the same pair to the other unit: a different estimate, and neither is crossed out */
        S.push([300, () => api.say(item.alsoLine)], ...unitSteps(sim, q.also, 0.8), ...roundSteps(sim, 0.8));
        S.push(...estSteps(sim, estOf(q.adds, q.also), q.also, true, false, 0.8));
      }
      if (q.compare) {
        if (!exactShown(sim)) S.push(...exactSteps(sim, 0.55));
        S.push(...gapSteps(sim, q.exact, "sum", 1));
      }
      if (q.written !== null) {
        S.push(...gapSteps(sim, q.written, "written", 0.85));
        S.push([500, () => { put({ verdict: "far" }); api.say(item.winLine); }]);
        S.push(...checkSteps(sim, 0.75), [200, () => put({ tag: "put right" })]);
      }
    } else if (q.kind === "gap") {
      S.push([600, () => { put((s: any) => ({ gap: { ...s.gap, label: true } })); api.sfx.tick(); }]);
      S.push([900, () => put((s: any) => ({ gap: { ...s.gap, zoom: false } }))]);
    } else if (q.kind === "exact") {
      if (!exactShown(sim)) S.push(...exactSteps(sim, 0.6));
      S.push(...roundSteps(sim, f), ...estSteps(sim, estOf(q.adds, q.qUnit), q.qUnit, false, false, f));
      S.push(...gapSteps(sim, q.exact, "sum", 1), [300, () => { put({ verdict: "near" }); api.say(item.winLine); }]);
    }
    tl.run(S);
  }, [stage]);

  /* ── what the host and the agent read back (toolApi.getState): only what is on the stage ── */
  const shownExact = v.cells.length && v.cells.every((c: any, k: number) => k >= lenOf(v.exact) || (c && c.tone === "sum" && c.d === digitAt(v.exact, k)));
  api.share({
    addends: v.adds, unit: u ? UNIT_WORD[u] : null, rounded: v.rounded,
    estimate: v.ests.length ? v.ests[v.ests.length - 1].value : null,
    exact: shownExact ? v.exact : null,
    gap: v.gap && v.gap.label ? Math.abs(v.gap.a - v.gap.b) : null,
    checkTarget: v.written,
  });

  /* ── drawing ── */
  const cols = v.cols;
  const sumCy = sumYOf(nA), sumBase = sumCy + 20;
  const lit = new Set<number>(v.lit || []);
  const tagged = (v.pick && !free) || v.ests.length > 1;
  const PICKS = [{ uu: 100, x: 480, w: 176 }, { uu: 1000, x: 668, w: 176 }, { uu: 10000, x: 856, w: 230 }];
  const numberRow = (val: number, cy: number, fill: (d: number) => string, key: string) => (
    <g key={key}>
      {Array.from({ length: lenOf(val) }).map((_, k) => {
        const d = digitAt(val, k);
        return <text key={k} x={colC(k)} y={cy + 20} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={fill(d)}>{d}</text>;
      })}
    </g>
  );

  /* the gap line: positions on it, and where each pin starts before it slides down onto it */
  const g = v.gap;
  const range = g ? (g.zoom ? zoomOf(g.a, g.b) : [0, gapMax(g.a, g.b)]) : [0, 1];
  const gX = (val: number) => G.gx0 + ((val - range[0]) / (range[1] - range[0])) * (G.gx1 - G.gx0);
  const gapMid = g ? clampTo((gX(g.a) + gX(g.b)) / 2, G.gx0 + 150, G.gx1 - 60) : 0;

  const invite =
    asking && !wrong && !v.touched && index === 0 && v.kind === "estimate" && u !== null
      ? { x: G.sa + ((v.pins[0] - lowOf(v.adds[0], u)) / u) * (G.sb - G.sa), y: rowY(0) - 16, r: 44 }
      : asking && !wrong && !v.touched && v.kind === "gap" && g
        ? { x: gapMid, y: G.gAxis, r: 36 }
        : null;

  return (
    <g>
      <style>{EC_CSS}</style>

      {/* the running count (runs zone): the unit the question names, in words, and one pip per addend
          that fills rose once it is rounded */}
      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        <text x={18} y={-64} fontSize={T.micro} fontWeight={500} fill={C.ink}>{tx("nearest")}</text>
        <text x={18} y={-30} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(u ? UNIT_WORD[u] : "no unit yet")}</text>
        {v.adds.map((_: any, i: number) => (
          <circle key={i} cx={306 - (nA - 1 - i) * 30} cy={-56} r={10} fill={v.rounded[i] !== null ? ROSE : "#FFFFFF"} stroke={deep(ROSE)} strokeWidth={2} />
        ))}
      </g>

      {/* the unit picker: set by the question (and locked) except on phase 2 and in free play */}
      {!free && <text x={8} y={46} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("exact")}</text>}
      <text x={466} y={46} textAnchor="end" fontSize={T.micro} fontWeight={500} fill={C.ink}>{tx("nearest")}</text>
      {PICKS.map(({ uu, x, w }) => {
        const word = tx(UNIT_WORD[uu]), sel = u === uu, live = pickLive && (free || uu !== 10000);
        const near = lang === "hi" ? `निकटतम ${word} तक` : lang === "gu" ? `નજીકના ${word} સુધી` : null;
        if (live) return (
          <Key key={uu} id={"unit-" + uu} label={near || "Round to the nearest " + word} x={x} y={0} w={w} h={72} C={C} primary={sel} onClick={() => chooseUnit(uu)}>
            <text y={10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={sel ? "#FFFFFF" : C.ink}>{word}</text>
          </Key>
        );
        if (sel) return (
          <g key={uu}>
            <rect x={x} y={0} width={w} height={72} rx={RAD.key} fill="url(#gAccent)" stroke={shade(C.accent, 0.18)} strokeWidth={2} />
            <text x={x + w / 2} y={46} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF">{word}</text>
          </g>
        );
        return (
          <Key key={uu} id={"unit-" + uu} label={near || "Nearest " + word} x={x} y={0} w={w} h={72} C={C} disabled>
            <text y={10} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={mix(C.ink, C.panel, 0.5)}>{word}</text>
          </Key>
        );
      })}
      {v.unitRing && (() => { const P = PICKS.find((p) => p.uu === v.unitRing) as any; return <rect x={P.x - 7} y={2} width={P.w + 14} height={80} rx={RAD.key + 4} fill="none" stroke={AMBER} strokeWidth={4} pointerEvents="none" />; })()}

      {/* the two sides never borrow each other's room */}
      <line x1={G.divX} y1={84} x2={G.divX} y2={v.gap ? 412 : 528} stroke={C.rule} strokeWidth={2} />

      {/* ── the exact side: place-value columns ── */}
      {Array.from({ length: cols }).map((_, k) => (
        <g key={"h" + k}>
          {lit.has(k) && <rect x={colC(k) - G.cw / 2 + 3} y={G.headY + G.headH + 4} width={G.cw - 6} height={sumCy + 34 - (G.headY + G.headH + 4)} rx={10} fill={AMBER} fillOpacity={0.16} />}
          <rect x={colC(k) - G.cw / 2 + 2} y={G.headY} width={G.cw - 4} height={G.headH} rx={8}
            fill={lit.has(k) ? tint(AMBER, 0.6) : tint(C.panel, 0.3)} stroke={lit.has(k) ? AMBER : C.rule} strokeWidth={lit.has(k) ? 3 : 1.5} />
          <text x={colC(k)} y={G.headY + 25} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(HEADS[k])}</text>
          {k > 0 && (v.carries[k] > 0
            ? <Disc x={colC(k)} y={G.carryY} r={23} paint="gPointer" />
            : <circle cx={colC(k)} cy={G.carryY} r={23} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="5 5" />)}
        </g>
      ))}
      {v.adds.map((a: number, i: number) => numberRow(a, rowY(i), (d) => (d === 0 ? ZERO : deep(BLUE)), "a" + i))}
      <text x={22} y={rowY(nA - 1) + 16} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>+</text>
      <rect x={8} y={ruleYOf(nA) - 2} width={G.xr + 2} height={4} rx={2} fill={C.ink} />
      {/* the sum row: empty cells, somebody's written answer in ink, or the exact sum in green */}
      {v.cells.every((c: any) => !c)
        ? Array.from({ length: lenOf(v.exact) }).map((_, k) => (
          <rect key={"e" + k} x={colC(k) - 21} y={sumCy - 26} width={42} height={52} rx={8} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="6 6" />
        ))
        : v.cells.map((c: any, k: number) => c && (
          <text key={"s" + k} x={colC(k)} y={sumBase} textAnchor="middle" fontSize={T.xl} fontWeight={700}
            fill={c.d === 0 ? ZERO : c.tone === "sum" ? deep(GREEN) : C.ink}>{c.d}</text>
        ))}
      {v.cells.map((c: any, k: number) => c && c.fixed && <rect key={"f" + k} x={colC(k) - 18} y={sumBase + 8} width={36} height={4} rx={2} fill={C.ink} />)}
      {v.tag && !free && <text x={8} y={sumBase + 30} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(v.tag)}</text>}
      {v.verdict && !free && (
        <g className="ec-in">
          <rect x={(G.divX + G.el) / 2 - 141} y={346} width={282} height={54} rx={16} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          <text x={(G.divX + G.el) / 2} y={382} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(v.verdict === "far" ? "go back and check" : "could be right")}</text>
        </g>
      )}

      {/* ── the rounding strips: each addend's pin between the two nearest multiples of the unit ── */}
      {v.adds.map((a: number, i: number) => {
        const cy = rowY(i), ly = cy + 4;
        const pxL = G.sa - G.plateGap - G.plateW, pxR = G.sb + G.plateGap;
        if (u === null) return (
          <g key={"s" + i}>
            <line x1={G.sa} y1={ly} x2={G.sb} y2={ly} stroke={C.rule} strokeWidth={4} strokeDasharray="10 10" />
            {[pxL, pxR].map((x) => <rect key={x} x={x} y={ly - 36} width={G.plateW} height={72} rx={RAD.key} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="6 6" />)}
          </g>
        );
        const lo = lowOf(a, u), hi = lo + u, span = G.sb - G.sa;
        const X = (val: number) => G.sa + ((val - lo) / u) * span;
        const dragging = !!(drag.drag && drag.drag.moved && drag.drag.payload && drag.drag.payload.row === i);
        const px = dragging ? clampTo(drag.drag.x, G.sa, G.sb) : X(v.pins[i]);
        const r = v.rounded[i];
        const atNow = lo + ((px - G.sa) / span) * u;
        /* the amber distance shows only once the pin has moved (how far it went), or on the strip a
           correction is working on (how far it has to go); before that: the two ends, halfway, the pin */
        const showBar = !dragging && (r !== null || v.focus === i);
        /* amber while the strip is being worked; neutral once an estimate or the exact sum stands (four hues at most) */
        const working = v.focus === i || (!free && v.ests.length === 0 && !v.cells.some((c: any) => c && c.tone === "sum"));
        const from = r === null ? px : X(a), to = r === null ? (atNow >= lo + u / 2 ? G.sb : G.sa) : X(r);
        const mid = (G.sa + G.sb) / 2;
        const pay = { row: i };
        /* an end key: live, it sends this strip's pin there; otherwise a plate showing the value */
        const endKey = (val: number, x: number, side: string) => (pinsLive
          ? <g key={side}>
              <Key id={"end-" + i + "-" + side} label={"Round to " + indian(val)} x={x} y={ly - 36} w={G.plateW} h={72} C={C} primary={r === val && v.by[i] === "child"} onClick={() => sendTo(i, val)}>
                <text y={10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={r === val && v.by[i] === "child" ? "#FFFFFF" : C.ink}>{indian(val)}</text>
              </Key>
              {r === val && v.by[i] === "tool" && <rect x={x - 4} y={ly - 40} width={G.plateW + 8} height={85} rx={RAD.key + 3} fill="none" stroke={deep(ROSE)} strokeWidth={3} pointerEvents="none" />}
            </g>
          : <g key={side}>
              <rect x={x} y={ly - 36} width={G.plateW} height={72} rx={RAD.key} fill={tint(C.panel, 0.45)} stroke={r === val ? deep(ROSE) : C.rule} strokeWidth={r === val ? 3 : 1.5} />
              <text x={x + G.plateW / 2} y={ly + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={r === val ? deep(ROSE) : C.ink}>{indian(val)}</text>
            </g>);
        return (
          <g key={"s" + i}>
            {v.focus === i && <rect x={G.divX + 10} y={cy - 54} width={G.el - G.divX - 20} height={108} rx={16} fill="none" stroke={AMBER} strokeWidth={4} />}
            <line x1={G.sa} y1={ly} x2={G.sb} y2={ly} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
            {showBar && <rect x={Math.min(from, to)} y={ly - 6} width={Math.max(0, Math.abs(to - from))} height={12} rx={6} fill={working ? AMBER : shade(C.rule, 0.18)} />}
            <rect x={G.sa - 2} y={ly - 12} width={4} height={28} fill={C.ink} />
            <rect x={G.sb - 2} y={ly - 12} width={4} height={28} fill={C.ink} />
            <rect x={mid - 1.5} y={ly - 8} width={3} height={20} fill={v.focus === i ? AMBER : C.ink} />
            <text x={mid} y={cy + 38} textAnchor="middle" fontSize={T.micro} fontWeight={500} fill={C.ink}>{indian(lo + u / 2)}</text>
            {endKey(lo, pxL, "lo")}
            {endKey(hi, pxR, "hi")}
            {/* where the addend really sits, once its pin has gone to an end */}
            {r !== null && <rect x={X(a) - 2} y={ly - 14} width={4} height={24} rx={2} fill={BLUE} />}
            <g className={(dragging ? "" : "ec-move") + (pinsLive ? " ec-grab c4-piece" : "")} style={{ transform: `translate(${px}px, ${ly}px)` } as any}
              {...(pinsLive ? { ...control("pin-" + i, "Pin for " + indian(a) + ": slide it to an end, or use the arrow keys"), ...drag.bind(pay), ...pinKeys(i) } : {})}>
              <rect x={-36} y={-60} width={72} height={72} fill="transparent" />
              <path d={pinPath(true, true)} fill={dragging ? tint(BLUE, 0.15) : BLUE} stroke={deep(BLUE)} strokeWidth={2} />
              <circle cx={-5} cy={-31} r={4.5} fill="#FFFFFF" fillOpacity={0.6} />
            </g>
          </g>
        );
      })}

      {/* ── the estimate stack: rounded numbers in rose, one under another, and their sum under the rule ── */}
      <text x={G.er} y={G.headY + 26} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("estimate")}</text>
      {v.adds.map((_: any, i: number) => (v.rounded[i] !== null
        ? <g key={"r" + i} className="ec-in"><RoseNum v={v.rounded[i]} x={G.er} y={rowY(i) + 20} /></g>
        : <rect key={"r" + i} x={G.er - 150} y={rowY(i) - 24} width={150} height={52} rx={10} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="6 6" />))}
      <text x={G.plusE} y={rowY(nA - 1) + 16} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>+</text>
      <rect x={G.el} y={ruleYOf(nA) - 2} width={G.er + 10 - G.el} height={4} rx={2} fill={C.ink} />
      {v.ests.length === 0 && <rect x={G.er - 170} y={sumCy - 26} width={170} height={54} rx={10} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="6 6" />}
      {v.ests.map((e: any, j: number) => (
        <g key={"est" + j + "-" + e.unit} className="ec-in">
          {tagged && <text x={G.el - 12} y={sumCy + j * 66 + 12} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(UNIT_WORD[e.unit])}</text>}
          <RoseNum v={e.value} x={G.er} y={sumCy + j * 66 + 20} />
        </g>
      ))}

      {/* ── the gap line: both answers as pins on one line from nothing, the gap between them in ink ── */}
      {g && (
        <g>
          <line x1={G.gx0} y1={G.gAxis} x2={G.gx1} y2={G.gAxis} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
          <rect x={G.gx0 - 1.5} y={G.gAxis - 10} width={3} height={20} fill={C.ink} />
          <rect x={G.gx1 - 1.5} y={G.gAxis - 10} width={3} height={20} fill={C.ink} />
          {g.zoom && Array.from({ length: 9 }).map((_, t) => (
            <rect key={"z" + t} x={G.gx0 + ((t + 1) * (G.gx1 - G.gx0)) / 10 - 1} y={G.gAxis - 7} width={2} height={14} fill={C.ink} />
          ))}
          <text x={G.gx0 - 14} y={G.gAxis + 10} textAnchor="end" fontSize={T.micro} fontWeight={500} fill={C.ink}>{indian(range[0])}</text>
          <text x={G.gx1 + 14} y={G.gAxis + 10} fontSize={T.micro} fontWeight={500} fill={C.ink}>{indian(range[1])}</text>
          {g.slide && (
            <rect key={"bar" + g.zoom} className={g.label ? "" : "ec-late"} x={Math.min(gX(g.a), gX(g.b)) - (Math.abs(gX(g.a) - gX(g.b)) < 4 ? 2 : 0)} y={G.gAxis - 7}
              width={Math.max(4, Math.abs(gX(g.a) - gX(g.b)))} height={14} rx={4} fill={C.ink} />
          )}
          <g className="ec-slide" style={{ transform: g.slide ? `translate(${gX(g.a)}px, ${G.gAxis}px)` : `translate(${G.er - 80}px, ${sumCy - 6}px)` } as any}>
            <path d={pinPath(true)} fill={ROSE} stroke={deep(ROSE)} strokeWidth={2} />
          </g>
          <g className="ec-slide" style={{ transform: g.slide ? `translate(${gX(g.b)}px, ${G.gAxis}px)` : `translate(${colC(2)}px, ${sumCy + 6}px)` } as any}>
            <path d={pinPath(false)} fill={g.tone === "sum" ? GREEN : C.ink} stroke={g.tone === "sum" ? deep(GREEN) : C.ink} strokeWidth={2} />
          </g>
          {g.slide && (g.label
            ? <text key={"gl" + Math.abs(g.a - g.b)} className="ec-in" x={gapMid} y={G.gAxis - 46} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{indian(Math.abs(g.a - g.b))}</text>
            : <rect x={gapMid - 56} y={G.gAxis - 84} width={112} height={44} rx={10} fill="none" stroke={C.ink} strokeWidth={2} strokeDasharray="6 6" />)}
          {zoomLive && <Hit id="gap-zoom" label={g.zoom ? "Show the whole line" : "Zoom in on the gap"} x={G.gx0 - 24} y={G.gAxis - 78} w={G.gx1 - G.gx0 + 48} h={116} onPress={toggleZoom} />}
        </g>
      )}

      {v.story && (() => {
        const S = v.story, gl: any[] = [];
        let x = STORY.eqX;
        S.parts.forEach((p: any, i: number) => {
          if (i) { gl.push({ t: "+", x: x + 16, fill: C.ink }); x += 34; }
          gl.push(p.carry ? { disc: true, x: x + 14 } : { t: String(p.v), x: x + 14, fill: deep(BLUE) }); x += 30;
        });
        gl.push({ t: "=", x: x + 16, fill: C.ink }); x += 34;
        gl.push({ t: String(Math.floor(S.s / 10)), x: x + 14, fill: deep(VERM) }); x += 30;
        const stayX = x + 14;
        gl.push({ t: String(S.s % 10), x: stayX, fill: S.st >= 3 ? deep(GREEN) : C.ink });
        return (
          <g className="ec-in">
            {gl.map((q: any, i: number) => (q.disc ? <Disc key={i} x={q.x} y={STORY.eqY - 15} r={13} paint="gPointer" />
              : <text key={i} x={q.x} y={STORY.eqY} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={q.fill}>{q.t}</text>))}
            {S.st >= 3 && <rect x={stayX - 21} y={STORY.eqY - 42} width={42} height={52} rx={8} fill="none" stroke={AMBER} strokeWidth={4} />}
            {/* the column's counters: ten tie off and go up as the carry; what is left is the digit that stays */}
            {Array.from({ length: S.s }).map((_, j) => (S.st >= 2 && j < 10 ? null
              : <Disc key={j} x={STORY.x0 + j * STORY.pitch} y={STORY.y} r={14} paint={S.st >= 3 ? "gOne" : "gHundred"} flat />))}
            {S.st === 1 && <rect x={STORY.x0 - 22} y={STORY.y - 24} width={9 * STORY.pitch + 44} height={48} rx={22} fill={AMBER} fillOpacity={0.12} stroke={AMBER} strokeWidth={4} />}
          </g>
        );
      })()}

      {/* a carry on its way up to the column it joins */}
      {v.fly && (
        <g className="ec-move" style={{ transform: `translate(${v.fly.x}px, ${v.fly.y}px)` } as any} pointerEvents="none">
          <Disc x={0} y={0} r={16} paint="gPointer" lift />
        </g>
      )}

      {/* the right answer, ringed at the end of a traceback */}
      {v.ring && v.ring.kind === "est" && <rect x={G.el - 8} y={sumCy + v.ring.j * 66 - 34} width={G.er + 16 - G.el} height={66} rx={14} fill="none" stroke={C.ink} strokeWidth={4} pointerEvents="none" />}
      {v.ring && v.ring.kind === "sum" && <rect x={4} y={sumCy - 34} width={G.xr + 8} height={66} rx={14} fill="none" stroke={C.ink} strokeWidth={4} pointerEvents="none" />}
      {v.ring && v.ring.kind === "label" && g && <rect x={gapMid - 66} y={G.gAxis - 86} width={132} height={52} rx={12} fill="none" stroke={C.ink} strokeWidth={4} pointerEvents="none" />}

      {free && (
        <Key id="new-numbers" label={tx("New numbers")} x={0} y={0} w={300} h={72} C={C} onClick={newNumbers}>
          <text y={10} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("new numbers")}</text>
        </Key>
      )}

      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing: the child's last right answer of the phase, in its own colour
   (an estimate rose, an exact sum green, a gap as an ink bar between two pins) */
function Thumb({ result, C, w, h }: any) {
  const L = (result && result.last) || {};
  const val = leadNumber(L.value);
  if (val === null || val === undefined) return null;
  const k = L.kind, my = h / 2;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {k === "gap" ? (
        <g>
          <rect x={20} y={my - 5} width={40} height={10} rx={4} fill={C.ink} />
          <g transform={`translate(20,${my})`}><path d={pinPath(true)} fill={ROSE} stroke={deep(ROSE)} strokeWidth={2} /></g>
          <g transform={`translate(60,${my})`}><path d={pinPath(false)} fill={GREEN} stroke={deep(GREEN)} strokeWidth={2} /></g>
        </g>
      ) : (
        <g transform={`translate(34,${my + 14})`}><path d={pinPath(true)} fill={k === "exact" ? GREEN : ROSE} stroke={deep(k === "exact" ? GREEN : ROSE)} strokeWidth={2} /></g>
      )}
      <text x={w - 16} y={my + 12} textAnchor="end" fontSize={T.label} fontWeight={700} fill={k === "exact" ? deep(GREEN) : k === "gap" ? C.ink : deep(ROSE)}>{indian(val)}</text>
    </g>
  );
}

function EstimateCheck(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null }} />
  );
}

export default EstimateCheck;
