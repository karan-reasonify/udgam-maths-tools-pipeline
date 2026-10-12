/* ═══ M2.S4.T7.C24.2D1 · estimate_gap · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "estimate_gap";
const MEDIA_ID = "M2.S4.T7.C24.2D1";
const TOOL_NAME = "Estimate Gap";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["Round both numbers first. Then take one from the other."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "A fast answer and a worked one, standing together with the gap drawn between them.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Any two numbers, any place, both sides running and the gap bar live.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r13+: `lineFor(line, lang, TR)`); the
   English above and below stays what the checks read. NCERT class 4 terms: इकाई दहाई सैकड़ा हज़ार /
   એકમ દશક શતક હજાર, अनुमान / અંદાજ, अंतर / તફાવત; to round: गोल करना / ગોળ કરવું. Digits stay digits:
   the runtime speaks them in the language in use. A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Estimate Gap": "अनुमान का अंतर",
    "Round both numbers first. Then take one from the other.": "पहले दोनों संख्याओं को गोल करो। फिर एक में से दूसरी घटाओ।",
    "A fast answer and a worked one, standing together with the gap drawn between them.": "एक जल्दी वाला उत्तर और एक हल किया हुआ, साथ-साथ, और बीच में उनका अंतर।",
    "Free play. Any two numbers, any place, both sides running and the gap bar live.": "मुक्त खेल। कोई भी दो संख्याएँ, कोई भी स्थान, दोनों तरफ़ हल, और अंतर की पट्टी चालू।",
    "Round first, then take away": "पहले गोल करो, फिर घटाओ",
    "Round each number first, then take away. Not the other way round.": "पहले हर संख्या को गोल करो, फिर घटाओ। उल्टा नहीं।",
    "Tap the end each number is nearer to, or slide its pin there.": "हर संख्या जिस सिरे के ज़्यादा पास है, उस पर टैप करो, या पिन वहाँ खिसकाओ।",
    "Which two thousands is the other one sitting between?": "दूसरी संख्या किन दो हज़ारों के बीच है?",
    "Round just the first number. Then round the second, and take one from the other.": "बस पहली संख्या गोल करो। फिर दूसरी गोल करो, और एक में से दूसरी घटाओ।",
    "Round both numbers first, then take one from the other. They end in zeros, so they need no columns.": "पहले दोनों संख्याएँ गोल करो, फिर एक में से दूसरी घटाओ। उनके अंत में शून्य हैं, इसलिए खानों की ज़रूरत नहीं।",
    "You learned: round both numbers first, then take one from the other.": "तुमने सीखा: पहले दोनों संख्याएँ गोल करो, फिर घटाओ।",
    "Estimate 8,640 − 3,315. Round each number to the nearest thousand.": "8,640 − 3,315 का अनुमान लगाओ। हर संख्या को निकटतम हज़ार तक गोल करो।",
    "Estimated difference?": "अनुमानित अंतर?",
    "Which of your two numbers is already rounded?": "तुम्हारी दोनों संख्याओं में से कौन सी पहले से गोल है?",
    "Estimate 5,870 − 2,140 to the nearest thousand.": "5,870 − 2,140 का निकटतम हज़ार तक अनुमान लगाओ।",
    "Did you round both numbers before taking away?": "क्या तुमने घटाने से पहले दोनों संख्याएँ गोल कीं?",
    "Estimate 8,430 − 5,910. Round both to the nearest thousand first.": "8,430 − 5,910 का अनुमान लगाओ। पहले दोनों को निकटतम हज़ार तक गोल करो।",
    "Did you round first, or work it out first?": "तुमने पहले गोल किया, या पहले हल किया?",
    "Close, not equal": "पास, पर बराबर नहीं",
    "Put the two answers beside each other. How far apart are they?": "दोनों उत्तर साथ-साथ रखो। उनमें कितनी दूरी है?",
    "Tap the line to look closer.": "पास से देखने के लिए रेखा पर टैप करो।",
    "Is the gap a big part of the worked answer, or only a small part?": "क्या अंतर हल किए उत्तर का बड़ा हिस्सा है, या बस छोटा सा?",
    "Count up to the next hundred first. Then count on to the bigger number.": "पहले अगले सैकड़े तक गिनो। फिर बड़ी संख्या तक आगे गिनो।",
    "An estimate lands near the worked answer, not on it. How near depends on which way each number was rounded.": "अनुमान हल किए उत्तर के पास आता है, ठीक उस पर नहीं। कितना पास, यह इस पर है कि हर संख्या किस ओर गोल हुई।",
    "You learned: an estimate lands near the worked answer, not on it.": "तुमने सीखा: अनुमान हल किए उत्तर के पास आता है, उस पर नहीं।",
    "8,713 − 4,297, estimated and worked. The estimate is 5,000. The worked answer is 4,416. What is the gap between them?": "8,713 − 4,297, अनुमान से और हल करके। अनुमान 5,000 है। हल किया उत्तर 4,416 है। दोनों में कितना अंतर है?",
    "How far apart?": "कितनी दूरी?",
    "Start at 4,416. How much more makes 5,000?": "4,416 से शुरू करो। और कितना मिलकर 5,000 बनता है?",
    "They are 584 apart. Near, but not equal.": "दोनों में 584 का अंतर है। पास, पर बराबर नहीं।",
    "7,624 − 4,180 is about 4,000. Now work the exact difference.": "7,624 − 4,180 लगभग 4,000 है। अब सटीक अंतर निकालो।",
    "Worked answer?": "हल किया उत्तर?",
    "Is any top digit smaller than the one under it?": "क्या ऊपर का कोई अंक अपने नीचे वाले से छोटा है?",
    "A child says 4,000 must be wrong. The worked answer is 3,444. How far short of 4,000 is it?": "एक बच्चा कहता है कि 4,000 गलत होगा। हल किया उत्तर 3,444 है। यह 4,000 से कितना कम है?",
    "Start at 3,444. How much more makes 4,000?": "3,444 से शुरू करो। और कितना मिलकर 4,000 बनता है?",
    "Only 556 apart. An estimate lands near the answer, not on it.": "बस 556 का अंतर। अनुमान उत्तर के पास आता है, उस पर नहीं।",
    "Both numbers, and the same place": "दोनों संख्याएँ, और एक ही स्थान",
    "One number went to the nearest thousand. Can the other go somewhere else?": "एक संख्या निकटतम हज़ार तक गई। क्या दूसरी कहीं और जा सकती है?",
    "The picker moves both numbers together.": "स्थान वाला बटन दोनों संख्याओं को साथ चलाता है।",
    "Which two round numbers of that size is each one sitting between?": "हर संख्या उस माप की किन दो गोल संख्याओं के बीच है?",
    "Press one place for both numbers. Then send each pin to its nearer end.": "दोनों संख्याओं के लिए एक स्थान दबाओ। फिर हर पिन को उसके पास वाले सिरे पर भेजो।",
    "Both numbers go to the same place, or the estimate means nothing. If a question names no place, use the place of the worked case beside it.": "दोनों संख्याएँ एक ही स्थान तक जाती हैं, नहीं तो अनुमान का कोई मतलब नहीं। सवाल में स्थान न हो, तो पास वाले हल किए सवाल का स्थान लो।",
    "You learned: round both numbers to the same place before subtracting.": "तुमने सीखा: घटाने से पहले दोनों संख्याएँ एक ही स्थान तक गोल करो।",
    "A child rounds 7,480 to the nearest thousand. Then 2,360 goes to the nearest hundred. Why is that no use? Round both to the nearest thousand.": "एक बच्चा 7,480 को निकटतम हज़ार तक गोल करता है। फिर 2,360 निकटतम सौ तक जाता है। यह बेकार क्यों है? दोनों को निकटतम हज़ार तक गोल करो।",
    "Estimate, same place?": "अनुमान, एक ही स्थान?",
    "What place are both of your numbers going to?": "तुम्हारी दोनों संख्याएँ किस स्थान तक जा रही हैं?",
    "Both at the nearest thousand, and 5,000 lands near 5,120.": "दोनों निकटतम हज़ार पर, और 5,000 आता है 5,120 के पास।",
    "Estimate 34,780 − 12,240. Round each number to the nearest thousand.": "34,780 − 12,240 का अनुमान लगाओ। हर संख्या को निकटतम हज़ार तक गोल करो।",
    "Is 12,240 nearer to 12,000 or to 13,000?": "12,240, 12,000 के ज़्यादा पास है या 13,000 के?",
    "Why must both numbers go to the same place? Round 7,480 and 2,360 both to the nearest hundred.": "दोनों संख्याएँ एक ही स्थान तक क्यों जाएँ? 7,480 और 2,360 दोनों को निकटतम सौ तक गोल करो।",
    "Nearest hundred estimate?": "निकटतम सौ तक अनुमान?",
    "Is each number going to the nearest hundred?": "क्या हर संख्या निकटतम सौ तक जा रही है?",
    "At the same place, each estimate lands near 5,120.": "एक ही स्थान पर, हर अनुमान 5,120 के पास आता है।",
    "An estimate tells you when an answer cannot be right": "अनुमान बताता है कि कब कोई उत्तर सही नहीं हो सकता",
    "Somebody worked this and wrote an answer.": "किसी ने इसे हल करके एक उत्तर लिखा है।",
    "Build the estimate beside it. Then see how far apart they are.": "उसके पास अनुमान बनाओ। फिर देखो दोनों में कितनी दूरी है।",
    "How far from your estimate is the written answer?": "लिखा हुआ उत्तर तुम्हारे अनुमान से कितनी दूर है?",
    "Round both numbers to the nearest thousand first. Then take one from the other.": "पहले दोनों संख्याओं को निकटतम हज़ार तक गोल करो। फिर एक में से दूसरी घटाओ।",
    "An answer far from its estimate is the one to go back to. Building the estimate costs almost nothing.": "जो उत्तर अपने अनुमान से दूर हो, उसी को दोबारा देखो। अनुमान बनाने में लगभग कुछ नहीं लगता।",
    "You learned: an answer far from its estimate is the one to work again.": "तुमने सीखा: जो उत्तर अनुमान से दूर हो, उसे फिर से हल करो।",
    "A child works 9,215 − 3,684. The answer written is 6,531. Estimate to the nearest thousand to judge it.": "एक बच्चा 9,215 − 3,684 हल करता है। लिखा उत्तर 6,531 है। इसे परखने के लिए निकटतम हज़ार तक अनुमान लगाओ।",
    "What does your estimate say the answer should be near?": "तुम्हारा अनुमान कहता है उत्तर किसके पास होना चाहिए?",
    "Far from the estimate. Go back and work it again.": "अनुमान से बहुत दूर। वापस जाओ और फिर से हल करो।",
    "A shop takes 62,410 one week. The next week it takes 27,865. A till prints the difference as 3,455. Round the two takings first. Can the till be right?": "एक दुकान की एक हफ़्ते की कमाई 62,410 है। अगले हफ़्ते 27,865 है। बिल मशीन अंतर 3,455 छापती है। पहले दोनों कमाई गोल करो। क्या मशीन सही हो सकती है?",
    "Can the till be right?": "क्या मशीन सही हो सकती है?",
    "Could rounding alone move an answer that far?": "क्या बस गोल करने से उत्तर इतना दूर जा सकता है?",
    "Could be right": "सही हो सकता है", "Work it again": "फिर से हल करो",
    "First round both numbers. Then decide.": "पहले दोनों संख्याएँ गोल करो। फिर तय करो।",
    "Far from the estimate, so the till cannot be right.": "अनुमान से बहुत दूर, इसलिए मशीन सही नहीं हो सकती।",
    "Estimate 20,850 − 20,130. Round each number to the nearest thousand. Then see if the estimate is much use.": "20,850 − 20,130 का अनुमान लगाओ। हर संख्या को निकटतम हज़ार तक गोल करो। फिर देखो अनुमान कितना काम का है।",
    "Were you asked for a worked answer or a quick one?": "तुमसे हल किया उत्तर माँगा गया था या जल्दी वाला?",
    "The gap is 280, on an answer of only 720. Here the estimate is not much use.": "अंतर 280 है, जबकि उत्तर बस 720 है। यहाँ अनुमान ज़्यादा काम का नहीं।",
    "First round both numbers.": "पहले दोनों संख्याएँ गोल करो।",
    /* the working area's own words */
    "O": "इ", "T": "द", "H": "सै", "Th": "ह", "TTh": "द.ह.", "L": "ला",
    "nearest": "निकटतम", "hundred": "सौ", "thousand": "हज़ार", "ten thousand": "दस हज़ार", "no place yet": "अभी स्थान नहीं",
    "exact": "सटीक", "estimate": "अनुमान", "rounded": "गोल करके", "work it again": "फिर से हल करो",
    "written": "लिखा", "till": "मशीन", "put right": "सही किया", "New numbers": "नई संख्याएँ", "new numbers": "नई संख्याएँ",
  },
  gu: {
    "Estimate Gap": "અંદાજનો તફાવત",
    "Round both numbers first. Then take one from the other.": "પહેલાં બંને સંખ્યાઓ ગોળ કરો. પછી એકમાંથી બીજી બાદ કરો.",
    "A fast answer and a worked one, standing together with the gap drawn between them.": "એક ઝડપી જવાબ અને એક ઉકેલેલો, સાથે સાથે, અને વચ્ચે તેમનો તફાવત.",
    "Free play. Any two numbers, any place, both sides running and the gap bar live.": "મુક્ત રમત. કોઈ પણ બે સંખ્યાઓ, કોઈ પણ સ્થાન, બંને બાજુ ગણતરી, અને તફાવતની પટ્ટી ચાલુ.",
    "Round first, then take away": "પહેલાં ગોળ કરો, પછી બાદ કરો",
    "Round each number first, then take away. Not the other way round.": "પહેલાં દરેક સંખ્યા ગોળ કરો, પછી બાદ કરો. ઊલટું નહીં.",
    "Tap the end each number is nearer to, or slide its pin there.": "દરેક સંખ્યા જે છેડાની વધુ નજીક છે તેના પર ટૅપ કરો, અથવા પિન ત્યાં સરકાવો.",
    "Which two thousands is the other one sitting between?": "બીજી સંખ્યા કયા બે હજારની વચ્ચે છે?",
    "Round just the first number. Then round the second, and take one from the other.": "ફક્ત પહેલી સંખ્યા ગોળ કરો. પછી બીજી ગોળ કરો, અને એકમાંથી બીજી બાદ કરો.",
    "Round both numbers first, then take one from the other. They end in zeros, so they need no columns.": "પહેલાં બંને સંખ્યાઓ ગોળ કરો, પછી એકમાંથી બીજી બાદ કરો. તેમના અંતે શૂન્ય છે, તેથી ખાનાંની જરૂર નથી.",
    "You learned: round both numbers first, then take one from the other.": "તમે શીખ્યા: પહેલાં બંને સંખ્યાઓ ગોળ કરો, પછી બાદ કરો.",
    "Estimate 8,640 − 3,315. Round each number to the nearest thousand.": "8,640 − 3,315 નો અંદાજ કાઢો. દરેક સંખ્યાને નજીકના હજારમાં ગોળ કરો.",
    "Estimated difference?": "અંદાજિત તફાવત?",
    "Which of your two numbers is already rounded?": "તમારી બે સંખ્યાઓમાંથી કઈ પહેલેથી ગોળ છે?",
    "Estimate 5,870 − 2,140 to the nearest thousand.": "5,870 − 2,140 નો નજીકના હજાર સુધી અંદાજ કાઢો.",
    "Did you round both numbers before taking away?": "શું તમે બાદ કરતાં પહેલાં બંને સંખ્યાઓ ગોળ કરી?",
    "Estimate 8,430 − 5,910. Round both to the nearest thousand first.": "8,430 − 5,910 નો અંદાજ કાઢો. પહેલાં બંનેને નજીકના હજારમાં ગોળ કરો.",
    "Did you round first, or work it out first?": "તમે પહેલાં ગોળ કર્યું, કે પહેલાં ઉકેલ્યું?",
    "Close, not equal": "નજીક, પણ સરખું નહીં",
    "Put the two answers beside each other. How far apart are they?": "બંને જવાબ બાજુ-બાજુમાં મૂકો. તેમની વચ્ચે કેટલું અંતર છે?",
    "Tap the line to look closer.": "નજીકથી જોવા રેખા પર ટૅપ કરો.",
    "Is the gap a big part of the worked answer, or only a small part?": "શું તફાવત ઉકેલેલા જવાબનો મોટો ભાગ છે, કે ફક્ત નાનો?",
    "Count up to the next hundred first. Then count on to the bigger number.": "પહેલાં આગળના સો સુધી ગણો. પછી મોટી સંખ્યા સુધી આગળ ગણો.",
    "An estimate lands near the worked answer, not on it. How near depends on which way each number was rounded.": "અંદાજ ઉકેલેલા જવાબની નજીક આવે છે, બરાબર તેના પર નહીં. કેટલું નજીક, તે દરેક સંખ્યા કઈ બાજુ ગોળ થઈ તેના પર છે.",
    "You learned: an estimate lands near the worked answer, not on it.": "તમે શીખ્યા: અંદાજ ઉકેલેલા જવાબની નજીક આવે છે, તેના પર નહીં.",
    "8,713 − 4,297, estimated and worked. The estimate is 5,000. The worked answer is 4,416. What is the gap between them?": "8,713 − 4,297, અંદાજથી અને ઉકેલીને. અંદાજ 5,000 છે. ઉકેલેલો જવાબ 4,416 છે. બંને વચ્ચે કેટલો તફાવત છે?",
    "How far apart?": "કેટલું અંતર?",
    "Start at 4,416. How much more makes 5,000?": "4,416 થી શરૂ કરો. હજી કેટલા ઉમેરતાં 5,000 બને?",
    "They are 584 apart. Near, but not equal.": "બંને વચ્ચે 584 નો તફાવત છે. નજીક, પણ સરખા નહીં.",
    "7,624 − 4,180 is about 4,000. Now work the exact difference.": "7,624 − 4,180 આશરે 4,000 છે. હવે ચોક્કસ તફાવત શોધો.",
    "Worked answer?": "ઉકેલેલો જવાબ?",
    "Is any top digit smaller than the one under it?": "શું ઉપરનો કોઈ અંક તેની નીચેના કરતાં નાનો છે?",
    "A child says 4,000 must be wrong. The worked answer is 3,444. How far short of 4,000 is it?": "એક બાળક કહે છે કે 4,000 ખોટું હશે. ઉકેલેલો જવાબ 3,444 છે. તે 4,000 થી કેટલો ઓછો છે?",
    "Start at 3,444. How much more makes 4,000?": "3,444 થી શરૂ કરો. હજી કેટલા ઉમેરતાં 4,000 બને?",
    "Only 556 apart. An estimate lands near the answer, not on it.": "ફક્ત 556 નો તફાવત. અંદાજ જવાબની નજીક આવે છે, તેના પર નહીં.",
    "Both numbers, and the same place": "બંને સંખ્યાઓ, અને એક જ સ્થાન",
    "One number went to the nearest thousand. Can the other go somewhere else?": "એક સંખ્યા નજીકના હજારમાં ગઈ. શું બીજી બીજે ક્યાંક જઈ શકે?",
    "The picker moves both numbers together.": "સ્થાનનું બટન બંને સંખ્યાઓને સાથે ખસેડે છે.",
    "Which two round numbers of that size is each one sitting between?": "દરેક સંખ્યા એ માપની કઈ બે ગોળ સંખ્યાઓની વચ્ચે છે?",
    "Press one place for both numbers. Then send each pin to its nearer end.": "બંને સંખ્યાઓ માટે એક સ્થાન દબાવો. પછી દરેક પિનને તેના નજીકના છેડે મોકલો.",
    "Both numbers go to the same place, or the estimate means nothing. If a question names no place, use the place of the worked case beside it.": "બંને સંખ્યાઓ એક જ સ્થાને જાય, નહીં તો અંદાજનો કોઈ અર્થ નથી. સવાલમાં સ્થાન ન હોય, તો બાજુના ઉકેલેલા દાખલાનું સ્થાન લો.",
    "You learned: round both numbers to the same place before subtracting.": "તમે શીખ્યા: બાદ કરતાં પહેલાં બંને સંખ્યાઓ એક જ સ્થાન સુધી ગોળ કરો.",
    "A child rounds 7,480 to the nearest thousand. Then 2,360 goes to the nearest hundred. Why is that no use? Round both to the nearest thousand.": "એક બાળક 7,480 ને નજીકના હજારમાં ગોળ કરે છે. પછી 2,360 નજીકના સોમાં જાય છે. એ નકામું કેમ છે? બંનેને નજીકના હજારમાં ગોળ કરો.",
    "Estimate, same place?": "અંદાજ, એક જ સ્થાન?",
    "What place are both of your numbers going to?": "તમારી બંને સંખ્યાઓ કયા સ્થાન સુધી જાય છે?",
    "Both at the nearest thousand, and 5,000 lands near 5,120.": "બંને નજીકના હજાર પર, અને 5,000 આવે છે 5,120 ની નજીક.",
    "Estimate 34,780 − 12,240. Round each number to the nearest thousand.": "34,780 − 12,240 નો અંદાજ કાઢો. દરેક સંખ્યાને નજીકના હજારમાં ગોળ કરો.",
    "Is 12,240 nearer to 12,000 or to 13,000?": "12,240, 12,000 ની વધુ નજીક છે કે 13,000 ની?",
    "Why must both numbers go to the same place? Round 7,480 and 2,360 both to the nearest hundred.": "બંને સંખ્યાઓ એક જ સ્થાને કેમ જાય? 7,480 અને 2,360 બંનેને નજીકના સોમાં ગોળ કરો.",
    "Nearest hundred estimate?": "નજીકના સો સુધી અંદાજ?",
    "Is each number going to the nearest hundred?": "શું દરેક સંખ્યા નજીકના સો સુધી જાય છે?",
    "At the same place, each estimate lands near 5,120.": "એક જ સ્થાને, દરેક અંદાજ 5,120 ની નજીક આવે છે.",
    "An estimate tells you when an answer cannot be right": "અંદાજ કહે છે કે ક્યારે કોઈ જવાબ સાચો ન હોઈ શકે",
    "Somebody worked this and wrote an answer.": "કોઈએ આ ઉકેલીને એક જવાબ લખ્યો છે.",
    "Build the estimate beside it. Then see how far apart they are.": "તેની બાજુમાં અંદાજ બનાવો. પછી જુઓ બંને વચ્ચે કેટલું અંતર છે.",
    "How far from your estimate is the written answer?": "લખેલો જવાબ તમારા અંદાજથી કેટલો દૂર છે?",
    "Round both numbers to the nearest thousand first. Then take one from the other.": "પહેલાં બંને સંખ્યાઓને નજીકના હજારમાં ગોળ કરો. પછી એકમાંથી બીજી બાદ કરો.",
    "An answer far from its estimate is the one to go back to. Building the estimate costs almost nothing.": "જે જવાબ પોતાના અંદાજથી દૂર હોય, તેને જ ફરી જુઓ. અંદાજ બનાવવામાં લગભગ કશું લાગતું નથી.",
    "You learned: an answer far from its estimate is the one to work again.": "તમે શીખ્યા: જે જવાબ અંદાજથી દૂર હોય, તેને ફરી ઉકેલો.",
    "A child works 9,215 − 3,684. The answer written is 6,531. Estimate to the nearest thousand to judge it.": "એક બાળક 9,215 − 3,684 ઉકેલે છે. લખેલો જવાબ 6,531 છે. તેને પરખવા નજીકના હજાર સુધી અંદાજ કાઢો.",
    "What does your estimate say the answer should be near?": "તમારો અંદાજ કહે છે જવાબ શેની નજીક હોવો જોઈએ?",
    "Far from the estimate. Go back and work it again.": "અંદાજથી ઘણો દૂર. પાછા જાઓ અને ફરી ઉકેલો.",
    "A shop takes 62,410 one week. The next week it takes 27,865. A till prints the difference as 3,455. Round the two takings first. Can the till be right?": "એક દુકાનની એક અઠવાડિયાની કમાણી 62,410 છે. પછીના અઠવાડિયે 27,865 છે. બિલ મશીન તફાવત 3,455 છાપે છે. પહેલાં બંને કમાણી ગોળ કરો. શું મશીન સાચું હોઈ શકે?",
    "Can the till be right?": "શું મશીન સાચું હોઈ શકે?",
    "Could rounding alone move an answer that far?": "શું ફક્ત ગોળ કરવાથી જવાબ આટલો દૂર જઈ શકે?",
    "Could be right": "સાચું હોઈ શકે", "Work it again": "ફરી ઉકેલો",
    "First round both numbers. Then decide.": "પહેલાં બંને સંખ્યાઓ ગોળ કરો. પછી નક્કી કરો.",
    "Far from the estimate, so the till cannot be right.": "અંદાજથી ઘણો દૂર, તેથી મશીન સાચું ન હોઈ શકે.",
    "Estimate 20,850 − 20,130. Round each number to the nearest thousand. Then see if the estimate is much use.": "20,850 − 20,130 નો અંદાજ કાઢો. દરેક સંખ્યાને નજીકના હજારમાં ગોળ કરો. પછી જુઓ અંદાજ કેટલો કામનો છે.",
    "Were you asked for a worked answer or a quick one?": "તમારી પાસે ઉકેલેલો જવાબ માગ્યો હતો કે ઝડપી?",
    "The gap is 280, on an answer of only 720. Here the estimate is not much use.": "તફાવત 280 છે, જ્યારે જવાબ ફક્ત 720 છે. અહીં અંદાજ બહુ કામનો નથી.",
    "First round both numbers.": "પહેલાં બંને સંખ્યાઓ ગોળ કરો.",
    /* the working area's own words */
    "O": "એ", "T": "દ", "H": "શ", "Th": "હ", "TTh": "દ.હ.", "L": "લા",
    "nearest": "નજીકના", "hundred": "સો", "thousand": "હજાર", "ten thousand": "દસ હજાર", "no place yet": "હજી સ્થાન નથી",
    "exact": "ચોક્કસ", "estimate": "અંદાજ", "rounded": "ગોળ કરીને", "work it again": "ફરી ઉકેલો",
    "written": "લખેલું", "till": "મશીન", "put right": "સુધાર્યું", "New numbers": "નવી સંખ્યાઓ", "new numbers": "નવી સંખ્યાઓ",
  },
};

/* ── the picture: the worked subtraction in columns on the left, a rounding strip per number in the
   middle, the estimate on the right (no columns there at all), and under both a gap line from nothing
   up past both answers. A trade is drawn the book's way: the lending digit struck through in ink with
   its smaller value written above it in rose, and the ten it lent travelling to the column it joins. */
const PLACE_WORD: Record<number, string> = { 100: "hundred", 1000: "thousand", 10000: "ten thousand" };
const HEADS = ["O", "T", "H", "Th", "TTh", "L"];
const BLUE = CONTENT.hundred, GREEN = CONTENT.one, ROSE = CONTENT.bead, AMBER = CONTENT.ten, VERM = CONTENT.pointer;
const ZERO = "#767676";
const deep = (c: string) => shade(c, 0.25);
const G = {
  xr: 306, cw: 54,               /* exact columns: right edge, column width */
  divX: 322,                     /* the ruled line between the two sides */
  sa: 465, sb: 680,              /* a rounding strip runs from sa to sb ... */
  plateW: 100, plateGap: 37,     /* ... between its two end keys, clear of the pin's finger box */
  el: 840, er: 1070, minusE: 864, /* the estimate stack */
  headY: 88, headH: 34, tradeY: 160, /* the trade values sit between the headings and the top number */
  row0: 200, pitch: 92,
  gx0: 124, gx1: 960, gAxis: 490, /* the gap line: a band along the foot of both sides */
};
const rowY = (i: number) => G.row0 + i * G.pitch;
const RULE_Y = rowY(1) + 44;
const ANS_CY = RULE_Y + 46;
const ANS_BASE = ANS_CY + 20;
const colC = (k: number) => G.xr - (k + 0.5) * G.cw;
const clampTo = (x: number, a: number, b: number) => Math.min(b, Math.max(a, x));
const setAt = (a: any[], i: number, x: any) => { const b = a.slice(); b[i] = x; return b; };
const rowInk = (i: number) => (i === 0 ? BLUE : AMBER);

/* the tool's own arithmetic (the oracle below takes a different road) */
const lowOf = (a: number, u: number) => Math.floor(a / u) * u;
const nearOf = (a: number, u: number) => (a - lowOf(a, u) >= u / 2 ? lowOf(a, u) + u : lowOf(a, u));
const estOf = (xs: number[], u: number) => nearOf(xs[0], u) - nearOf(xs[1], u);
const digitAt = (v: number, k: number) => Math.floor(v / Math.pow(10, k)) % 10;
const lenOf = (v: number) => String(Math.max(0, Math.trunc(v))).length;
/* rounding each number to a different place: what a child who mixes places gets */
const mixedOf = (xs: number[]) => {
  const out: any[] = [];
  [100, 1000, 10000].forEach((p) => [100, 1000, 10000].forEach((q) => {
    if (p !== q) { const e = nearOf(xs[0], p) - nearOf(xs[1], q); if (e >= 0) out.push({ p, q, e }); }
  }));
  return out;
};
/* column subtraction from the ones. A column whose top digit is too small opens a ten from the nearest
   column on its left that has one (across zeros each zero becomes a nine on the way). After each column:
   `from` = the column that lent (-1 for none), `use` = what every column of the top number now holds,
   `digit` = the digit written in the answer */
const tradesOf = (a: number, b: number, cols: number) => {
  const cur = Array.from({ length: cols }, (_, k) => digitAt(a, k));
  const out: any[] = [];
  for (let k = 0; k < cols; k++) {
    const bd = digitAt(b, k);
    let from = -1;
    if (cur[k] < bd) {
      let j = k + 1;
      while (j < cols - 1 && cur[j] === 0) j++;
      from = j;
      cur[j] -= 1;
      for (let m = j - 1; m > k; m--) cur[m] += 9;
      cur[k] += 10;
    }
    out.push({ from, use: cur.slice(), digit: cur[k] - bd });
  }
  return out;
};
/* the values written above the top number: only where a column changed */
const tvOf = (a: number, use: number[]) => use.map((x, k) => (x !== digitAt(a, k) ? x : null));
const cellsOf = (v: number, cols: number, tone: string) => Array.from({ length: cols }, (_, k) => (k < lenOf(v) ? { d: digitAt(v, k), tone } : null));
/* the gap line runs from 0 to a round number just past everything it will carry */
const gapTop = (m: number) => { const x = Math.max(1, m), p = Math.pow(10, Math.floor(Math.log10(x))); return Math.ceil((x * 1.1) / p) * p; };
/* zoomed in on the gap: whole steps of the gap's own size either side of it */
const zoomOf = (a: number, b: number) => {
  const d = Math.max(1, Math.abs(a - b)), s = Math.pow(10, Math.floor(Math.log10(d)));
  const lo = Math.floor(Math.min(a, b) / s) * s, hi = Math.ceil(Math.max(a, b) / s) * s;
  return [lo, hi === lo ? lo + s : hi, s];
};
/* counting up from the smaller answer to the larger: to the next round step, then on */
const hopsOf = (a: number, b: number, s: number) => {
  const lo = Math.min(a, b), hi = Math.max(a, b);
  const pts = [lo, Math.ceil(lo / s) * s, Math.floor(hi / s) * s, hi].filter((x, i, arr) => x >= lo && x <= hi && arr.indexOf(x) === i).sort((x, y) => x - y);
  return pts.slice(1).map((t, i) => ({ from: pts[i], to: t }));
};
/* a rounded number: its leading digits in rose, its trailing zeros grey ("4,000", "7,500") */
const roseParts = (v: number) => { const s = indian(v); const m = /^(.*[1-9])([0,]*)$/.exec(s); return m ? [m[1], m[2]] : ["", s]; };

/* the judge bay's two keys (phase 4): the child's own verdict on an answer somebody else wrote */
const VERDICT = [{ id: "could be right", label: "Could be right" }, { id: "work it again", label: "Work it again" }];

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   items   three a phase. kind: "estimate" (round both numbers, take one rounded number off the
           other), "exact" (the worked difference, in columns with the trades), "gap" (how far apart
           the estimate and the worked answer stand), "judge" (round both pins, the estimate lands and the
           gap bar runs to a written answer, then the child's verdict on it). nums = [greater, smaller], unit = the place the
           question names, near = the misconception's answer, pick = the place picker is live
           (phase 3), start = a number already rounded when the question opens, also = a second place
           shown at the win, worked = the win works the exact difference, compare = the exact
           difference and the gap follow the win, written = an answer somebody else wrote (wtv = the
           trade values that working wrote above the top number) */
const PHASES = [
  {
    n: 1,
    concept: "Round first, then take away",
    conceptId: "M2.S4.T7.C24", objectiveIds: ["O11"],
    says: ["Round each number first, then take away. Not the other way round.", "Tap the end each number is nearer to, or slide its pin there."],
    /* tries, as the plan writes it: rung 1 the item's miss; rung 2 which two thousands the other one
       sits between; rung 3 round one number on its own before the other comes back */
    ladder: ["Which two thousands is the other one sitting between?", "Round just the first number. Then round the second, and take one from the other."],
    closing: "Round both numbers first, then take one from the other. They end in zeros, so they need no columns.",
    learned: "You learned: round both numbers first, then take one from the other.",
    traceback: "Each pin slides to its nearer thousand, the rounded numbers stand in rose and their difference lands under the rule; an answer worked first and rounded after stands on the exact side, not crossed out.",
    items: [
      /* learn ML1: answer in the plan = 3,000. The plan's pair (6,284 and 2,715) puts 3,000 on a strip end
         before the answer (2,715 sits between 2,000 and 3,000), so the pair is 8,640 and 3,315: estimate
         9,000 − 3,000 = 6,000, with ends 8,000 / 9,000 and 3,000 / 4,000. Worked first it is 5,325, which
         rounds to 5,000, so working first and rounding after is caught here (round the greater only: 5,685) */
      { qid: "M2.S4.T7.C24:ML1", kind: "estimate", nums: [8640, 3315], unit: 1000, near: 5685, winMs: 2600, ask: "Estimated difference?",
        say: "Estimate 8,640 − 3,315. Round each number to the nearest thousand.", answer: 6000, miss: "Which of your two numbers is already rounded?" },
      /* practice 1: answer in the plan = 4,000, because the rounded numbers are 6,000 and 2,000 */
      { qid: "M2.S4.T7.C24:1", kind: "estimate", nums: [5870, 2140], unit: 1000, near: 3860, winMs: 2600, ask: "Estimated difference?",
        say: "Estimate 5,870 − 2,140 to the nearest thousand.", answer: 4000, miss: "Did you round both numbers before taking away?" },
      /* practice 2: answer in the plan = 2,000, because the rounded numbers are 8,000 and 6,000
         (worked first and rounded after, 2,520 would give 3,000: the misconception) */
      { qid: "M2.S4.T7.C24:2", kind: "estimate", nums: [8430, 5910], unit: 1000, near: 3000, winMs: 2600, ask: "Estimated difference?",
        say: "Estimate 8,430 − 5,910. Round both to the nearest thousand first.", answer: 2000, miss: "Did you round first, or work it out first?" },
    ],
  },
  {
    n: 2,
    concept: "Close, not equal",
    conceptId: "M2.S4.T7.C25", objectiveIds: ["O12"],
    says: ["Put the two answers beside each other. How far apart are they?", "Tap the line to look closer."],
    /* tries, as the plan writes it: rung 1 the item's (count on from the worked answer); rung 2 the size
       of the gap against the size of the answer; rung 3 the gap read along the worked answer, counted up
       in steps */
    ladder: ["Is the gap a big part of the worked answer, or only a small part?", "Count up to the next hundred first. Then count on to the bigger number."],
    closing: "An estimate lands near the worked answer, not on it. How near depends on which way each number was rounded.",
    learned: "You learned: an estimate lands near the worked answer, not on it.",
    traceback: "The line zooms in on the gap and counts up from the smaller answer in hops to the other, and the gap is labelled; for the worked answer, the columns are worked from the ones with every trade drawn.",
    items: [
      /* learn ML2: answer in the plan = The estimate is 5,000 and the exact difference is 4,416, which
         sits close to it. Both stand finished (the phase's screen); the child reads how close: 584 */
      { qid: "M2.S4.T7.C25:ML2", kind: "gap", nums: [8713, 4297], unit: 1000, near: 1416, winMs: 4400, ask: "How far apart?",
        say: "8,713 − 4,297, estimated and worked. The estimate is 5,000. The worked answer is 4,416. What is the gap between them?", answer: 584,
        miss: "Start at 4,416. How much more makes 5,000?", winLine: "They are 584 apart. Near, but not equal." },
      /* practice 3: answer in the plan = The estimate is 4,000 and the exact difference is 3,444
         (the estimate stands; the child gives the exact difference, and the gap bar is drawn at the win) */
      { qid: "M2.S4.T7.C25:3", kind: "exact", nums: [7624, 4180], unit: 1000, near: 3564, winMs: 4600, ask: "Worked answer?",
        say: "7,624 − 4,180 is about 4,000. Now work the exact difference.", answer: 3444, miss: "Is any top digit smaller than the one under it?" },
      /* practice 4: answer in the plan = That an estimate is meant to land near the exact difference and
         not to equal it, and 4,000 does. Asked as the gap the phase draws: 3,444 is 556 short of 4,000 */
      { qid: "M2.S4.T7.C25:4", kind: "gap", nums: [7624, 4180], unit: 1000, near: 1444, winMs: 4800, ask: "How far apart?",
        say: "A child says 4,000 must be wrong. The worked answer is 3,444. How far short of 4,000 is it?", answer: 556,
        miss: "Start at 3,444. How much more makes 4,000?", winLine: "Only 556 apart. An estimate lands near the answer, not on it." },
    ],
  },
  {
    n: 3,
    concept: "Both numbers, and the same place",
    conceptId: "M2.S4.T7.C26", objectiveIds: ["O11"],
    says: ["One number went to the nearest thousand. Can the other go somewhere else?", "The picker moves both numbers together."],
    /* tries, as the plan writes it: rung 1 what place both numbers go to; rung 2 which two round numbers
       of that size each one sits between; rung 3 the picker cut to one place for both */
    ladder: ["Which two round numbers of that size is each one sitting between?", "Press one place for both numbers. Then send each pin to its nearer end."],
    closing: "Both numbers go to the same place, or the estimate means nothing. If a question names no place, use the place of the worked case beside it.",
    learned: "You learned: round both numbers to the same place before subtracting.",
    traceback: "The picker lights the question's place and moves both strips together, each pin slides to its nearer end and the estimate lands; an estimate made another way stands above it, not crossed out.",
    items: [
      /* learn ML3: answer in the plan = Both numbers have to go to the same place. To the nearest thousand
         the estimate is 5,000, and the exact difference is 5,120 (the mixed rounding gives 4,600) */
      { qid: "M2.S4.T7.C26:ML3", kind: "estimate", pick: true, worked: true, start: { unit: 1000, rounded: [7000, null] }, nums: [7480, 2360], unit: 1000, near: 4600, winMs: 5200,
        ask: "Estimate, same place?", say: "A child rounds 7,480 to the nearest thousand. Then 2,360 goes to the nearest hundred. Why is that no use? Round both to the nearest thousand.",
        answer: 5000, miss: "What place are both of your numbers going to?", winLine: "Both at the nearest thousand, and 5,000 lands near 5,120." },
      /* practice 5: answer in the plan = 23,000, because the rounded numbers are 35,000 and 12,000 */
      { qid: "M2.S4.T7.C26:5", kind: "estimate", pick: true, nums: [34780, 12240], unit: 1000, near: 22800, winMs: 2800, ask: "Estimated difference?",
        say: "Estimate 34,780 − 12,240. Round each number to the nearest thousand.", answer: 23000, miss: "Is 12,240 nearer to 12,000 or to 13,000?" },
      /* practice 6: answer in the plan = Because rounding them to different places changes the two by
         different amounts, so the gap between them shifts and the estimate is no use. Asked on the pair
         of the learn item, both to the nearest hundred (5,100); the win stands the thousand estimate
         (5,000) and the worked 5,120 beside it, so the same place works either way and mixing does not */
      { qid: "M2.S4.T7.C26:6", kind: "estimate", pick: true, worked: true, also: 1000, nums: [7480, 2360], unit: 100, near: 4600, winMs: 7600, ask: "Nearest hundred estimate?",
        say: "Why must both numbers go to the same place? Round 7,480 and 2,360 both to the nearest hundred.", answer: 5100,
        miss: "Is each number going to the nearest hundred?", winLine: "At the same place, each estimate lands near 5,120." },
    ],
  },
  {
    n: 4,
    concept: "An estimate tells you when an answer cannot be right",
    conceptId: "M2.S4.T7.C27", objectiveIds: ["O12"],
    says: ["Somebody worked this and wrote an answer.", "Build the estimate beside it. Then see how far apart they are."],
    /* tries, as the plan writes it: rung 1 what the estimate says the answer should be near; rung 2 how
       far from it the written answer stands; rung 3 (here) build the estimate one step at a time */
    ladder: ["How far from your estimate is the written answer?", "Round both numbers to the nearest thousand first. Then take one from the other."],
    closing: "An answer far from its estimate is the one to go back to. Building the estimate costs almost nothing.",
    learned: "You learned: an answer far from its estimate is the one to work again.",
    traceback: "The estimate builds on the right and the gap bar runs from it to the written answer with the distance labelled; on the verdict, work it again stands ringed and the written working is gone over from the ones, only the columns that disagree put right.",
    items: [
      /* learn ML4: answer in the plan = The estimate is 5,000, so 6,531 cannot be right. The exact
         difference is 5,531 (the thousands lent a ten to the hundreds and was never left one less) */
      { qid: "M2.S4.T7.C27:ML4", kind: "estimate", written: 6531, wtv: [null, 11, 11, null], tag: "written", nums: [9215, 3684], unit: 1000, near: 7000, winMs: 9400,
        ask: "Estimated difference?", say: "A child works 9,215 − 3,684. The answer written is 6,531. Estimate to the nearest thousand to judge it.", answer: 5000,
        miss: "What does your estimate say the answer should be near?", winLine: "Far from the estimate. Go back and work it again." },
      /* practice 7: answer in the plan = The estimate is 34,000, and 3,455 is nowhere near it, so the till
         is wrong. The difference is 34,545. The verdict is the child's: the pins round both numbers, the
         estimate lands and the gap bar runs to the till's 3,455, and a choice counts only after that */
      { qid: "M2.S4.T7.C27:7", kind: "judge", written: 3455, tag: "till", nums: [62410, 27865], unit: 1000, choices: VERDICT, near: "could be right", winMs: 8400,
        ask: "Can the till be right?", say: "A shop takes 62,410 one week. The next week it takes 27,865. A till prints the difference as 3,455. Round the two takings first. Can the till be right?",
        answer: "work it again", miss: "Could rounding alone move an answer that far?", wait: "First round both numbers. Then decide.",
        winLine: "Far from the estimate, so the till cannot be right." },
      /* practice 8: answer in the plan = The estimate is 1,000 and the exact difference is 720, so the
         estimate is 280 out, which is a large slice of so small a difference; rounding pushed the two
         numbers apart (the child gives the estimate; the win works 720 and runs the gap bar) */
      { qid: "M2.S4.T7.C27:8", kind: "estimate", compare: true, nums: [20850, 20130], unit: 1000, near: 720, winMs: 7200, ask: "Estimated difference?",
        say: "Estimate 20,850 − 20,130. Round each number to the nearest thousand. Then see if the estimate is much use.", answer: 1000,
        miss: "Were you asked for a worked answer or a quick one?", winLine: "The gap is 280, on an answer of only 720. Here the estimate is not much use." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  places: { hundred: 100, thousand: 1000, "ten thousand": 10000 },
  columns: ["TTh", "Th", "H", "T", "O"],
  rounding: "the child sends each pin to an end of its strip: a tap on an end key sends it there, a drag drops it at the end it is let go nearer to, the arrow keys send a focused pin left or right; a tap on the pin does not move it. A correction slides it to the nearer end; exactly halfway goes up",
  picker: "one place for both numbers: a new place un-rounds both and restretches both strips together, so two numbers can never stand at different places",
  trades: "a column whose top digit is too small opens a ten from the column on its left: the lender is struck through in ink with its smaller value above it in rose, the ten travels to the column it joins, and that column's new value is written above it",
  gapLine: "from 0 to a round number past both answers; a tap zooms it to the gap; a correction counts up from the smaller answer in hops",
  verdict: "rounding to the nearest thousand moves each number by at most 499 down or 500 up, so an estimate and the true difference are less than 1,000 apart: a written answer 1,000 or more from the estimate cannot be right (work it again); a choice counts only once both pins are rounded",
  colours: { greater: "blue", takenAway: "amber", answer: "green", tenOnTheMove: "vermilion", rewritten: "rose", rounded: "rose", placeZero: "grey" },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work:
   rounding by reading the digit just below the place, subtracting digit strings with a borrow flag */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const zeros = (u: number) => String(u).length - 1;
  const roundStr = (a: number, u: number) => {
    const s = String(a), z = zeros(u), head = s.slice(0, Math.max(0, s.length - z)) || "0";
    const below = s.length - z >= 0 ? s.charAt(s.length - z) : "0";
    return (Number(head) + (Number(below || "0") >= 5 ? 1 : 0)) * Number("1" + "0".repeat(z));
  };
  const subStr = (x: number, y: number) => {
    const s = String(x), t = String(y).padStart(s.length, "0");
    let out = "", br = 0;
    for (let k = s.length - 1; k >= 0; k--) {
      let d = s.charCodeAt(k) - 48 - br - (t.charCodeAt(k) - 48);
      br = d < 0 ? 1 : 0;
      if (br) d += 10;
      out = String(d) + out;
    }
    return br ? -1 : Number(out);
  };
  const [a, b] = it.nums;
  if (!(a > b)) return false;
  const ra = roundStr(a, it.unit), rb = roundStr(b, it.unit);
  const est = subStr(ra, rb), exact = subStr(a, b);
  if (it.also && subStr(roundStr(a, it.also), roundStr(b, it.also)) === it.answer) return false; /* the second place must give a different estimate */
  if (it.written !== undefined && it.written === exact) return false;                                /* a written answer to judge is not the difference */
  if (it.kind === "estimate") return it.answer === est && it.near !== est;
  if (it.kind === "exact") return it.answer === exact;
  if (it.kind === "gap") return it.answer === (est > exact ? subStr(est, exact) : subStr(exact, est));
  if (it.kind === "judge") {
    const off = est > it.written ? subStr(est, it.written) : subStr(it.written, est);
    return it.answer === (off >= it.unit ? "work it again" : "could be right") && it.near !== it.answer;
  }
  return false;
}));
/* the most likely wrong answer (the item's misconception); judge must reject it:
   phase 1 rounds one number and keeps the other, or works first and rounds after; phase 2 takes the
   smaller digit from the larger in every column; phase 3 rounds the two to different places;
   phase 4 rounds the written answer instead of the numbers, or gives the worked answer as the estimate */
const nearMiss = (item: any) => (item.near !== undefined ? item.near : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;
/* what the slot shows while the child types: a number from 1,000 up with its Indian commas */
const format = (s: any) => (/^\d{4,9}$/.test(String(s ?? "")) ? indian(Number(s)) : String(s ?? ""));

/* every answer is typed on the pad; the working area is where the child rounds and reads the gap, and
   where the traceback and the win redraw the maths */
const HOOK: any = {};
/* the verdict item: the agent rounds both pins first, as a child would, then gives the verdict */
const solve = (item: any, T: any) => { if (item.choices && HOOK.build) HOOK.build(); return T.submit(item.answer); };
const answer = (item: any, v: any) => { if (item.choices && HOOK.build) HOOK.build(); return undefined; };
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* what the working area holds for one question */
const freshOf = (it: any) => {
  const nums = (it.nums || []).slice();
  const exact = nums[0] - nums[1];
  const cols = Math.max(4, lenOf(nums[0]));
  const u = it.unit;
  const estDone = it.kind === "gap" || it.kind === "exact"; /* the estimate stands when the question opens */
  const exDone = it.kind === "gap";                         /* so does the worked answer */
  const est = estOf(nums, u);
  const w = it.written === undefined ? null : it.written;
  const s0 = it.start || null;
  const unit0 = s0 ? s0.unit : it.pick && it.kind !== "free" ? null : u;
  const rounded0 = estDone ? nums.map((a: number) => nearOf(a, u)) : s0 ? s0.rounded.slice() : [null, null];
  const fin = tradesOf(nums[0], nums[1], cols)[cols - 1].use;
  return {
    kind: it.kind, nums, qUnit: u, unit: unit0, pick: !!it.pick, also: it.also || null, worked: !!it.worked,
    compare: !!it.compare, written: w, tag: it.tag || null, cols, exact,
    pins: nums.map((a: number, i: number) => (rounded0[i] !== null ? rounded0[i] : a)),
    rounded: rounded0,
    by: rounded0.map((r: any) => (r === null ? null : "tool")),
    ests: estDone ? [{ unit: u, value: est }] : [],
    cells: exDone ? cellsOf(exact, cols, "sum") : w !== null ? cellsOf(w, cols, "written") : Array.from({ length: cols }, () => null),
    tv: exDone ? tvOf(nums[0], fin) : Array.from({ length: cols }, (_, k) => (it.wtv && it.wtv[k] !== undefined ? it.wtv[k] : null)),
    gap: exDone ? { a: est, b: exact, tone: "sum", label: false, zoom: false, slide: true, top: gapTop(Math.max(est, exact)), hops: null, hopN: 0 } : null,
    lit: [], focus: -1, ring: null, fly: null, verdict: null, unitRing: null, touched: false, zoomFree: false, after: null, both: false, nudge: false,
  };
};
/* free play: the exact side always worked, the estimate and the gap as soon as both pins are rounded */
const freeView = (s: any) => {
  const [a, b] = s.nums, tr = tradesOf(a, b, s.cols), L = lenOf(s.exact);
  const all = s.unit !== null && s.rounded.every((x: any) => x !== null);
  const est = all ? s.rounded[0] - s.rounded[1] : null;
  return {
    ...s,
    cells: Array.from({ length: s.cols }, (_, k) => (k < L ? { d: tr[k].digit, tone: "sum" } : null)),
    tv: tvOf(a, tr[s.cols - 1].use),
    ests: all ? [{ unit: s.unit, value: est }] : [],
    gap: all ? { a: est, b: s.exact, tone: "sum", label: true, zoom: s.zoomFree, slide: true, top: gapTop(Math.max(est as number, s.exact)), hops: null, hopN: 0 } : null,
  };
};
const freePair = () => {
  const a = 3000 + Math.floor(Math.random() * 46000);
  return [a, 1000 + Math.floor(Math.random() * (a - 2000))];
};

const EG_CSS = `
.eg-move{transition:transform 380ms cubic-bezier(.3,.7,.25,1)}
.eg-slide{transition:transform 760ms cubic-bezier(.3,.7,.25,1)}
.eg-in{animation:egIn 420ms ease-out both}
.eg-late{animation:egIn 300ms ease-out 700ms both}
@keyframes egIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
.eg-grab{cursor:grab}
@media (prefers-reduced-motion:reduce){.eg-move,.eg-slide{transition:none}.eg-in,.eg-late{animation:none}}
`;

/* a pin: its tip at (0,0); down = the head above the line. The strip's pin is the bigger one (a thing to
   hold); the gap line's pins are smaller so both fit under the answers */
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
/* the translator comes in as `trn`: `tx` and `tr` are already local names in this file (a trade's x, the trades) */
function Work({ phase, n, item, index, stage, wrong, typed, api, lang = "en", tx: trn = (v: any) => v }: any) {
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
  /* free play (the plan's freePlay): any two numbers, any place, both sides running, the gap bar live */
  useEffect(() => { if (!free) return; setupFor.current = -2; reset({ kind: "free", nums: freePair(), unit: 1000, pick: true }); }, [free]);

  /* answers are typed on the pad and Enter goes straight to them; on the verdict item a choice counts
     only once the estimate stands beside the written answer (both pins rounded), else the pins pulse */
  const onVerdict = (val: any) => {
    if (ref.current.rounded.some((r: any) => r === null)) { put({ nudge: true }); api.say(item.wait || "First round both numbers."); return false; }
    return api.submit(val);
  };
  api.onEnter(stage === "ask" && item && item.choices ? onVerdict : null);

  const v = free ? freeView(st) : st;
  const u = v.unit;
  const asking = stage === "ask" && !busy;
  const pinsLive = !busy && u !== null && ((stage === "ask" && (v.kind === "estimate" || v.kind === "judge")) || free);
  const pickLive = !busy && ((stage === "ask" && v.pick) || free);
  const zoomLive = !busy && ((stage === "ask" && v.kind === "gap") || (free && !!v.gap));

  /* ── the child's acts ── */
  /* the picker moves both numbers as one piece: a new place un-rounds both and restretches both strips,
     and if one had been rounded, both strips light until a pin is sent */
  const choosePlace = (uu: number) => {
    if (!pickLive || ref.current.unit === uu) return;
    const q = ref.current, had = q.rounded.some((r: any) => r !== null);
    put({ unit: uu, pins: q.nums.slice(), rounded: [null, null], by: [null, null], zoomFree: false, touched: true, both: had });
    api.sfx.tick();
  };
  const sendPin = (i: number, to: number) => {
    put((q: any) => ({ pins: setAt(q.pins, i, to), rounded: setAt(q.rounded, i, to), by: setAt(q.by, i, "child"), touched: true, zoomFree: false, both: false, nudge: false }));
    api.sfx.tick();
    if (ref.current.kind === "judge") runJudge();
  };
  /* the judge bay: once both numbers are rounded, the estimate lands (two round numbers, no columns) and
     the gap bar runs from it to the written answer. It never says which way to judge */
  const runJudge = () => {
    const q = ref.current;
    if (q.rounded.some((r: any) => r === null)) { put({ ests: [], gap: null }); return; }
    const a = q.rounded[0] - q.rounded[1];
    const g0 = { a, b: q.written, tone: "written", label: false, zoom: false, slide: false, top: gapTop(Math.max(a, q.written, q.exact)), hops: null, hopN: 0 };
    put({ ests: [{ unit: q.unit, value: a, tag: null }], gap: g0 });
    tl.run([[700, () => put({ gap: { ...g0, slide: true } })], [420, () => { put({ gap: { ...g0, slide: true, label: true } }); api.sfx.tick(); }]]);
  };
  /* the agent (and the dev driver) round both pins as a child would, before the verdict */
  HOOK.build = () => {
    const q = ref.current;
    if (q.kind !== "judge" || q.unit === null) return;
    q.nums.forEach((a: number, i: number) => { if (ref.current.rounded[i] !== nearOf(a, q.unit)) sendPin(i, nearOf(a, q.unit)); });
  };
  /* the child does the rounding, so nothing rounds for them: a tap on an end key sends that strip's pin
     there; a drag drops the pin at the end it is let go nearer to; a tap on the pin does not move it;
     on a focused pin the arrows send it left or right */
  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (!pinsLive || !pay || !moved || !isFinite(p.x)) return;
    const q = ref.current, i = pay.row, a = q.nums[i], uu = q.unit;
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
      const lo = lowOf(q.nums[i], uu);
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
    ref.current = { ...freshOf({ kind: "free", nums: freePair(), unit: uu, pick: true }) };
    setSt(ref.current);
    api.sfx.tick();
  };

  /* ── motion, built on a simulated copy so every step knows what came before it ── */
  const roundSteps = (sim: any, slow: number) => {
    const out: any[] = [];
    if (sim.unit === null) return out;
    sim.nums.forEach((a: number, i: number) => {
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
    sim.unit = uu; sim.pins = sim.nums.slice(); sim.rounded = [null, null]; sim.by = [null, null];
    const p = sim.pins;
    return [[520 * slow, () => put({ unitRing: uu })], [520 * slow, () => { put({ unit: uu, pins: p, rounded: [null, null], by: [null, null], unitRing: null, both: false }); api.sfx.tick(); }]];
  };
  const estSteps = (sim: any, value: number, uu: number, keep: boolean, ring: boolean, slow: number, tag: any = null) => {
    const next = keep ? [...sim.ests, { unit: uu, value, tag }].slice(-2) : [{ unit: uu, value, tag }];
    sim.ests = next;
    return [[520 * slow, () => { put({ ests: next, ring: ring ? { kind: "est", j: next.length - 1 } : null }); api.sfx.tick(); }]];
  };
  /* the difference worked from the ones. A column whose top digit is too small opens a ten from the left:
     the ten travels to it, the lender is struck through and rewritten one less, the column is rewritten
     ten more, and its digit lands. With `checking`, the written answer is gone over the same way: a digit
     that agrees turns green, one that does not is put right and stays lit, and the gap bar follows */
  const exactSteps = (sim: any, slow: number, checking = false) => {
    const [a, b] = sim.nums, tr = tradesOf(a, b, sim.cols), L = lenOf(sim.exact), out: any[] = [];
    if (!checking) {
      sim.cells = sim.cells.map(() => null); sim.tv = sim.tv.map(() => null);
      const c0 = sim.cells, t0 = sim.tv;
      out.push([200, () => put({ cells: c0, tv: t0, lit: [] })]);
    }
    let cur = checking ? sim.written : 0, keep: number[] = [];
    for (let k = 0; k < sim.cols; k++) {
      const t = tr[k];
      if (k >= L && t.from < 0 && !(checking && sim.cells[k])) continue;
      const litNow = [...keep, k];
      out.push([(checking ? 320 : 260) * slow, () => put({ lit: litNow })]);
      if (t.from >= 0) {
        const tvNext = tvOf(a, t.use);
        sim.tv = tvNext;
        const fx = colC(t.from), tx = colC(k);
        out.push([60, () => put({ fly: { x: fx, y: G.tradeY - 10 } })]);
        out.push([520 * slow, () => put({ fly: { x: tx, y: G.tradeY - 10 } })]);
        out.push([80, () => { put({ fly: null, tv: tvNext }); api.sfx.tick(); }]);
      }
      const want = k < L ? t.digit : null;
      if (checking) {
        const has = sim.cells[k] ? sim.cells[k].d : null;
        if (has !== want) {
          cur += ((want || 0) - (has || 0)) * Math.pow(10, k);
          keep = [...keep, k];
          sim.cells = setAt(sim.cells, k, want === null ? null : { d: want, tone: "sum", fixed: true });
          sim.gap = sim.gap ? { ...sim.gap, b: cur } : sim.gap;
          const cs = sim.cells, g = sim.gap, kp = keep;
          out.push([460 * slow, () => { put({ cells: cs, gap: g, lit: kp }); api.sfx.tick(); }]);
        } else if (want !== null) {
          sim.cells = setAt(sim.cells, k, { d: has, tone: "sum" });
          const cs = sim.cells, kp = keep;
          out.push([240 * slow, () => put({ cells: cs, lit: kp })]);
        }
      } else if (want !== null) {
        sim.cells = setAt(sim.cells, k, { d: want, tone: "sum" });
        const cs = sim.cells;
        out.push([320 * slow, () => { put({ cells: cs }); api.sfx.tick(); }]);
      }
    }
    if (checking && sim.gap) {
      sim.gap = { ...sim.gap, b: sim.exact, tone: "sum" };
      const g = sim.gap, kp = keep;
      out.push([300, () => put({ gap: g, lit: kp })]);
    } else out.push([160, () => put({ lit: [] })]);
    return out;
  };
  /* the gap bar: both answers slide down onto one line from nothing, and the space between them is drawn */
  const gapSteps = (sim: any, b: number, tone: string, slow: number, label = true) => {
    const a = sim.ests[sim.ests.length - 1].value;
    const top = gapTop(Math.max(a, b, sim.exact));
    const g0 = { a, b, tone, label: false, zoom: false, slide: false, top, hops: null, hopN: 0 };
    const g1 = { ...g0, slide: true }, g2 = { ...g1, label };
    sim.gap = g2;
    const S: any[] = [[60, () => put({ gap: g0 })], [940 * slow, () => put({ gap: g1 })]];
    if (label) S.push([420, () => { put({ gap: g2 }); api.sfx.tick(); }]);
    return S;
  };
  const exactShown = (s: any) => s.cells.every((c: any, k: number) => k >= lenOf(s.exact) || (c && c.tone === "sum" && c.d === digitAt(s.exact, k)));

  /* ── the traceback: the mathematics redrawn in steps, ending on the whole right answer;
     nothing marked, the child's answer stays in the slot ── */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    const q = ref.current, sim: any = { ...q }, got = leadNumber(wrong.value), slow = 1.25;
    const S: any[] = [[300, () => put({ touched: true, ring: null, verdict: null, both: false, after: null })]];
    if (q.kind === "estimate") {
      if (q.pick) {
        /* an estimate made another way is built first and left standing with its place named (or
           "mixed"); then the question's place is lit, both strips move together and the estimate lands */
        sim.ests = []; S.push([200, () => put({ ests: [] })]);
        const other = [100, 1000, 10000].find((p) => p !== q.qUnit && estOf(q.nums, p) === got);
        const mix = mixedOf(q.nums).find((m: any) => m.e === got);
        if (other) {
          if (sim.unit !== other) S.push(...unitSteps(sim, other, slow));
          S.push(...roundSteps(sim, slow), ...estSteps(sim, got as number, other, true, false, slow), [500, () => {}]);
        } else if (mix) {
          sim.rounded = [nearOf(q.nums[0], mix.p), nearOf(q.nums[1], mix.q)]; sim.by = ["tool", "tool"];
          const r0 = sim.rounded;
          S.push([520 * slow, () => { put({ rounded: r0, by: ["tool", "tool"] }); api.sfx.tick(); }]);
          S.push(...estSteps(sim, got as number, 0, true, false, slow, "mixed"), [600, () => {}]);
          sim.unit = null;
        }
        if (sim.unit !== q.qUnit) S.push(...unitSteps(sim, q.qUnit, slow));
        S.push(...roundSteps(sim, slow), ...estSteps(sim, item.answer, q.qUnit, true, true, slow));
      } else {
        if (got !== null && got !== item.answer && got === nearOf(q.exact, q.qUnit) && !exactShown(sim) && q.written === null) {
          /* worked first and rounded after: that road is drawn on the exact side and left standing */
          S.push(...exactSteps(sim, slow), [400, () => put({ after: got })], [500, () => {}]);
        } else if (q.compare && got === q.exact && !exactShown(sim)) {
          /* the worked answer handed in as the estimate: it is shown where it belongs, on the exact side */
          S.push(...exactSteps(sim, slow), [400, () => {}]);
        }
        S.push(...roundSteps(sim, slow), ...estSteps(sim, item.answer, q.qUnit, false, true, slow));
        if (q.written !== null) S.push(...gapSteps(sim, q.written, "written", slow), [300, () => put({ ring: { kind: "est", j: 0 } })]);
      }
    } else if (q.kind === "gap") {
      /* the line zooms in on the gap and counts up from the smaller answer in hops, then the gap is labelled */
      const g = q.gap, zr = zoomOf(g.a, g.b), hops = hopsOf(g.a, g.b, zr[2]);
      S.push([760, () => put((s: any) => ({ gap: { ...s.gap, zoom: true, label: false, hops, hopN: 0 } }))]);
      hops.forEach((_: any, i: number) => S.push([720 * slow, () => { put((s: any) => ({ gap: { ...s.gap, hopN: i + 1 } })); api.sfx.tick(); }]));
      S.push([640, () => { put((s: any) => ({ gap: { ...s.gap, label: true }, ring: { kind: "label" } })); api.sfx.tick(); }]);
    } else if (q.kind === "exact") {
      S.push(...exactSteps(sim, slow), [300, () => put({ ring: { kind: "sum" } })]);
    } else if (q.kind === "judge") {
      /* the estimate built right, the gap bar run to the till, the verdict standing, and the till's
         working gone over from the ones with only the columns that disagree put right */
      S.push(...roundSteps(sim, slow), ...estSteps(sim, estOf(q.nums, q.qUnit), q.qUnit, false, false, slow));
      S.push(...gapSteps(sim, q.written, "written", slow), [500, () => put({ verdict: "far", ring: { kind: "verdict" } })]);
      if (!exactShown(sim)) S.push(...exactSteps(sim, slow, true), [300, () => put({ tag: "put right" })]);
    }
    tl.run(S, () => api.lock(false));
  }, [wrong]);

  /* ── the win: the maths moving on from the right answer ── */
  useEffect(() => {
    if (stage !== "win") return;
    /* the steps the child has seen already (rounding, the estimate landing) go quickly, so the part
       that is new (the other place, the worked answer and its gap, the column check) has the time */
    const q = ref.current, sim: any = { ...q }, S: any[] = [[60, () => put({ ring: null, focus: -1, both: false })]], f = 0.6;
    if (q.kind === "estimate") {
      if (sim.unit !== q.qUnit) S.push(...unitSteps(sim, q.qUnit, f));
      S.push(...roundSteps(sim, f));
      const last = sim.ests[sim.ests.length - 1];
      if (!last || last.value !== item.answer || last.unit !== q.qUnit) S.push(...estSteps(sim, item.answer, q.qUnit, q.pick, false, f));
      if (q.also && !sim.ests.some((e: any) => e.unit === q.also)) {
        /* the same pair to another place: a different estimate, and neither is crossed out */
        S.push(...unitSteps(sim, q.also, 0.8), ...roundSteps(sim, 0.8));
        S.push(...estSteps(sim, estOf(q.nums, q.also), q.also, true, false, 0.8));
      }
      if (q.worked && !exactShown(sim)) S.push(...exactSteps(sim, 0.55));
      if (q.compare) {
        if (!exactShown(sim)) S.push(...exactSteps(sim, 0.55));
        S.push(...gapSteps(sim, q.exact, "sum", 1));
      }
      if (q.written !== null) {
        S.push(...gapSteps(sim, q.written, "written", 0.85));
        S.push([500, () => { put({ verdict: "far" }); api.say(item.winLine); }]);
        S.push(...exactSteps(sim, 0.75, true), [200, () => put({ tag: "put right" })]);
      } else if (item.winLine) S.push([200, () => api.say(item.winLine)]);
    } else if (q.kind === "gap") {
      S.push([600, () => { put((s: any) => ({ gap: { ...s.gap, label: true } })); api.sfx.tick(); if (item.winLine) api.say(item.winLine); }]);
      S.push([900, () => put((s: any) => ({ gap: { ...s.gap, zoom: false } }))]);
    } else if (q.kind === "judge") {
      /* the child's verdict stands; the till's working is gone over and put right */
      S.push(...roundSteps(sim, f));
      const want = estOf(q.nums, q.qUnit), last = sim.ests[sim.ests.length - 1];
      if (!last || last.value !== want) S.push(...estSteps(sim, want, q.qUnit, false, false, f));
      if (!sim.gap || sim.gap.a !== want || !sim.gap.slide || !sim.gap.label) S.push(...gapSteps(sim, exactShown(sim) ? sim.exact : q.written, exactShown(sim) ? "sum" : "written", 0.85));
      S.push([400, () => { put({ verdict: "far" }); api.say(item.winLine); }]);
      if (!exactShown(sim)) S.push(...exactSteps(sim, 0.75, true), [200, () => put({ tag: "put right" })]);
    } else if (q.kind === "exact") {
      if (!exactShown(sim)) S.push(...exactSteps(sim, 0.6));
      /* the worked answer slides onto the gap line beside the estimate; the gap waits to be read */
      S.push(...gapSteps(sim, q.exact, "sum", 1, false));
    }
    tl.run(S);
  }, [stage]);

  /* ── what the host and the agent read back (toolApi.getState): only what is on the stage ── */
  api.share({
    numbers: v.nums, place: u ? PLACE_WORD[u] : null, rounded: v.rounded,
    estimate: v.ests.length ? v.ests[v.ests.length - 1].value : null,
    exact: exactShown(v) ? v.exact : null,
    gap: v.gap && v.gap.label ? Math.abs(v.gap.a - v.gap.b) : null,
    judgeTarget: v.written, verdict: v.verdict ? "work it again" : null,
  });

  /* ── drawing ── */
  const cols = v.cols;
  const lit = new Set<number>(v.lit || []);
  const tagged = (v.pick && !free) || v.ests.length > 1;
  const top = v.nums[0];
  const PICKS = [{ uu: 100, x: 480, w: 176 }, { uu: 1000, x: 668, w: 176 }, { uu: 10000, x: 856, w: 230 }];
  const numberRow = (val: number, cy: number, ink: string, key: string) => (
    <g key={key}>
      {Array.from({ length: lenOf(val) }).map((_, k) => {
        const d = digitAt(val, k);
        return <text key={k} x={colC(k)} y={cy + 20} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={d === 0 ? ZERO : deep(ink)}>{d}</text>;
      })}
    </g>
  );

  /* the gap line: positions on it, and where each pin starts before it slides down onto it */
  const g = v.gap;
  const zr = g && g.zoom ? zoomOf(g.a, g.b) : null;
  const range = g ? (zr ? [zr[0], zr[1]] : [0, g.top]) : [0, 1];
  const gX = (val: number) => G.gx0 + ((val - range[0]) / (range[1] - range[0])) * (G.gx1 - G.gx0);
  const gapMid = g ? clampTo((gX(g.a) + gX(g.b)) / 2, G.gx0 + 60, G.gx1 - 60) : 0;
  const hopsOn = !!(g && g.zoom && g.hops);
  const barFrom = g ? Math.min(g.a, g.b) : 0;
  const barTo = g ? (hopsOn && g.hopN < g.hops.length ? (g.hopN ? g.hops[g.hopN - 1].to : barFrom) : Math.max(g.a, g.b)) : 0;
  const workedTone = g && g.tone === "sum";

  const firstOpen = v.rounded[0] === null ? 0 : v.rounded[1] === null ? 1 : -1;
  const invite =
    asking && !wrong && ((!v.touched && index === 0) || v.nudge) && (v.kind === "estimate" || v.kind === "judge") && u !== null && firstOpen >= 0
      ? { x: G.sa + ((v.pins[firstOpen] - lowOf(v.nums[firstOpen], u)) / u) * (G.sb - G.sa), y: rowY(firstOpen) - 16, r: 44 }
      : asking && !wrong && !v.touched && v.kind === "gap" && g
        ? { x: gapMid, y: G.gAxis, r: 36 }
        : null;

  return (
    <g>
      <style>{EG_CSS}</style>

      {/* the running count (runs zone): the place both numbers go to, in words, and one pip per number
          that fills rose once it is rounded */}
      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        <text x={18} y={-64} fontSize={T.micro} fontWeight={500} fill={C.ink}>{trn("nearest")}</text>
        <text x={18} y={-30} fontSize={T.label} fontWeight={700} fill={C.ink}>{trn(u ? PLACE_WORD[u] : "no place yet")}</text>
        {v.nums.map((_: any, i: number) => (
          <circle key={i} cx={306 - (1 - i) * 30} cy={-56} r={10} fill={v.rounded[i] !== null ? ROSE : "#FFFFFF"} stroke={deep(ROSE)} strokeWidth={2} />
        ))}
      </g>

      {/* the place picker: set by the question (and locked) except on phase 3 and in free play */}
      {!free && <text x={8} y={46} fontSize={T.micro} fontWeight={600} fill={C.ink}>{trn("exact")}</text>}
      <text x={466} y={46} textAnchor="end" fontSize={T.micro} fontWeight={500} fill={C.ink}>{trn("nearest")}</text>
      {PICKS.map(({ uu, x, w }) => {
        const word = PLACE_WORD[uu], sel = u === uu, live = pickLive && (free || uu !== 10000 || top >= 10000);
        if (live) return (
          <Key key={uu} id={"place-" + uu} label={"Round both to the nearest " + word} x={x} y={0} w={w} h={72} C={C} primary={sel} onClick={() => choosePlace(uu)}>
            <text y={10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={sel ? "#FFFFFF" : C.ink}>{trn(word)}</text>
          </Key>
        );
        if (sel) return (
          <g key={uu}>
            <rect x={x} y={0} width={w} height={72} rx={RAD.key} fill="url(#gAccent)" stroke={shade(C.accent, 0.18)} strokeWidth={2} />
            <text x={x + w / 2} y={46} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF">{trn(word)}</text>
          </g>
        );
        return (
          <Key key={uu} id={"place-" + uu} label={"Nearest " + word} x={x} y={0} w={w} h={72} C={C} disabled>
            <text y={10} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={mix(C.ink, C.panel, 0.5)}>{trn(word)}</text>
          </Key>
        );
      })}
      {v.unitRing && (() => { const P = PICKS.find((p) => p.uu === v.unitRing) as any; return <rect x={P.x - 7} y={-4} width={P.w + 14} height={80} rx={RAD.key + 4} fill="none" stroke={C.accent} strokeWidth={4} pointerEvents="none" />; })()}

      {/* the two sides never borrow each other's room */}
      <line x1={G.divX} y1={84} x2={G.divX} y2={v.gap ? 412 : 528} stroke={C.rule} strokeWidth={2} />

      {/* ── the exact side: place-value columns, the trades above the top number ── */}
      {Array.from({ length: cols }).map((_, k) => (
        <g key={"h" + k}>
          {lit.has(k) && <rect x={colC(k) - G.cw / 2 + 3} y={G.headY + G.headH + 4} width={G.cw - 6} height={ANS_CY + 34 - (G.headY + G.headH + 4)} rx={10} fill={C.accent} fillOpacity={0.14} />}
          <rect x={colC(k) - G.cw / 2 + 2} y={G.headY} width={G.cw - 4} height={G.headH} rx={8}
            fill={lit.has(k) ? tint(C.accent, 0.7) : tint(C.panel, 0.3)} stroke={lit.has(k) ? C.accent : C.rule} strokeWidth={lit.has(k) ? 3 : 1.5} />
          <text x={colC(k)} y={G.headY + 25} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{trn(HEADS[k])}</text>
          {v.tv[k] !== null && v.tv[k] !== undefined && k < lenOf(top) && (
            <g>
              <text x={colC(k)} y={G.tradeY} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={deep(ROSE)}>{v.tv[k]}</text>
              <rect x={colC(k) - 20} y={rowY(0) - 2} width={40} height={4} rx={2} fill={C.ink} />
            </g>
          )}
        </g>
      ))}
      {numberRow(v.nums[0], rowY(0), BLUE, "a0")}
      {numberRow(v.nums[1], rowY(1), AMBER, "a1")}
      <text x={16} y={rowY(1) + 16} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>−</text>
      <rect x={8} y={RULE_Y - 2} width={G.xr + 2} height={4} rx={2} fill={C.ink} />
      {/* the answer row: empty cells, somebody's written answer in ink, or the worked answer in green */}
      {v.cells.every((c: any) => !c)
        ? Array.from({ length: lenOf(top) }).map((_, k) => (
          <rect key={"e" + k} x={colC(k) - 21} y={ANS_CY - 26} width={42} height={52} rx={8} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="6 6" />
        ))
        : v.cells.map((c: any, k: number) => c && (
          <text key={"s" + k} x={colC(k)} y={ANS_BASE} textAnchor="middle" fontSize={T.xl} fontWeight={700}
            fill={c.d === 0 ? ZERO : c.tone === "sum" ? deep(GREEN) : C.ink}>{c.d}</text>
        ))}
      {v.cells.map((c: any, k: number) => c && c.fixed && <rect key={"f" + k} x={colC(k) - 18} y={ANS_BASE + 8} width={36} height={4} rx={2} fill={C.ink} />)}
      {v.tag && !free && <text x={8} y={ANS_BASE + 36} fontSize={T.micro} fontWeight={600} fill={C.ink}>{trn(v.tag)}</text>}
      {v.after !== null && !free && <text className="eg-in" x={8} y={ANS_BASE + 36} fontSize={T.micro} fontWeight={600} fill={C.ink}>{trn("rounded") + " " + indian(v.after)}</text>}
      {v.verdict && !free && (
        <g className="eg-in">
          <rect x={(G.divX + G.el) / 2 - 141} y={346} width={282} height={54} rx={16} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          <text x={(G.divX + G.el) / 2} y={382} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{trn("work it again")}</text>
        </g>
      )}

      {/* ── the rounding strips: each number's pin between the two nearest multiples of the place ── */}
      {v.nums.map((a: number, i: number) => {
        const cy = rowY(i), ly = cy + 4, ink = rowInk(i);
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
        const px = dragging ? clampTo(drag.drag.x, G.sa, G.sb) : clampTo(X(v.pins[i]), G.sa, G.sb);
        const r = v.rounded[i];
        const onEnd = r === lo || r === hi;
        const atNow = lo + ((px - G.sa) / span) * u;
        /* the distance shows only once the pin has gone to an end (how far it went), or on the strip a
           correction is working on (how far it has to go); before that: the two ends, halfway, the pin */
        const showBar = !dragging && ((r !== null && onEnd) || v.focus === i);
        const from = r === null || !onEnd ? px : X(a), to = r === null || !onEnd ? (atNow >= lo + u / 2 ? G.sb : G.sa) : X(r);
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
            {v.focus === i && !v.both && <rect x={G.divX + 10} y={cy - 46} width={G.el - G.divX - 20} height={90} rx={16} fill="none" stroke={C.accent} strokeWidth={4} />}
            <line x1={G.sa} y1={ly} x2={G.sb} y2={ly} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
            {showBar && <rect x={Math.min(from, to)} y={ly - 6} width={Math.max(0, Math.abs(to - from))} height={12} rx={6} fill={tint(ink, 0.3)} />}
            <rect x={G.sa - 2} y={ly - 12} width={4} height={28} fill={C.ink} />
            <rect x={G.sb - 2} y={ly - 12} width={4} height={28} fill={C.ink} />
            <rect x={mid - 1.5} y={ly - 8} width={3} height={20} fill={C.ink} />
            <text x={mid} y={cy + 38} textAnchor="middle" fontSize={T.micro} fontWeight={500} fill={C.ink}>{indian(lo + u / 2)}</text>
            {endKey(lo, pxL, "lo")}
            {endKey(hi, pxR, "hi")}
            {/* where the number really sits, once its pin has gone to an end */}
            {r !== null && onEnd && <rect x={X(a) - 2} y={ly - 14} width={4} height={24} rx={2} fill={ink} />}
            <g className={(dragging ? "" : "eg-move") + (pinsLive ? " eg-grab c4-piece" : "")} style={{ transform: `translate(${px}px, ${ly}px)` } as any}
              {...(pinsLive ? { ...control("pin-" + i, "Pin for " + indian(a) + ": slide it to an end, or use the arrow keys"), ...drag.bind(pay), ...pinKeys(i) } : {})}>
              <rect x={-36} y={-60} width={72} height={72} fill="transparent" />
              <path d={pinPath(true, true)} fill={dragging ? tint(ink, 0.15) : ink} stroke={deep(ink)} strokeWidth={2} />
              <circle cx={-5} cy={-31} r={4.5} fill="#FFFFFF" fillOpacity={0.6} />
            </g>
          </g>
        );
      })}

      {/* the picker moved both numbers together: both strips light as one until a pin is sent */}
      {v.both && u !== null && <rect x={G.divX + 10} y={rowY(0) - 50} width={G.el - G.divX - 20} height={rowY(1) - rowY(0) + 96} rx={18} fill="none" stroke={C.accent} strokeWidth={4} pointerEvents="none" />}

      {/* ── the estimate stack: rounded numbers in rose, one under the other, no columns at all ── */}
      <text x={G.er} y={G.headY + 26} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{trn("estimate")}</text>
      {v.nums.map((_: any, i: number) => (v.rounded[i] !== null
        ? <g key={"r" + i} className="eg-in"><RoseNum v={v.rounded[i]} x={G.er} y={rowY(i) + 20} /></g>
        : <rect key={"r" + i} x={G.er - 150} y={rowY(i) - 24} width={150} height={52} rx={10} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="6 6" />))}
      <text x={G.minusE} y={rowY(1) + 16} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>−</text>
      <rect x={G.el} y={RULE_Y - 2} width={G.er + 10 - G.el} height={4} rx={2} fill={C.ink} />
      {v.ests.length === 0 && <rect x={G.er - 170} y={ANS_CY - 26} width={170} height={54} rx={10} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="6 6" />}
      {v.ests.map((e: any, j: number) => (
        <g key={"est" + j + "-" + e.unit + "-" + (e.tag || "")} className="eg-in">
          {tagged && <text x={G.el - 20} y={ANS_CY + j * 66 + 12} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{trn(e.tag || PLACE_WORD[e.unit])}</text>}
          {e.tag
            ? <text x={G.er} y={ANS_CY + j * 66 + 20} textAnchor="end" fontSize={T.xl} fontWeight={700} fill={C.ink}>{indian(e.value)}</text>
            : <RoseNum v={e.value} x={G.er} y={ANS_CY + j * 66 + 20} />}
        </g>
      ))}

      {/* ── the gap line: both answers as pins on one line from nothing, the gap between them in ink ── */}
      {g && (
        <g>
          <line x1={G.gx0} y1={G.gAxis} x2={G.gx1} y2={G.gAxis} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
          <rect x={G.gx0 - 1.5} y={G.gAxis - 10} width={3} height={20} fill={C.ink} />
          <rect x={G.gx1 - 1.5} y={G.gAxis - 10} width={3} height={20} fill={C.ink} />
          <text x={G.gx0 - 14} y={G.gAxis + 10} textAnchor="end" fontSize={T.micro} fontWeight={500} fill={C.ink}>{indian(range[0])}</text>
          <text x={G.gx1 + 14} y={G.gAxis + 10} fontSize={T.micro} fontWeight={500} fill={C.ink}>{indian(range[1])}</text>
          {g.slide && barTo > barFrom - 1 && (
            <rect key={"bar" + g.zoom} className={g.label || hopsOn ? "" : "eg-late"} x={gX(barFrom) - (Math.abs(gX(barTo) - gX(barFrom)) < 4 ? 2 : 0)} y={G.gAxis - 7}
              width={Math.max(4, Math.abs(gX(barTo) - gX(barFrom)))} height={14} rx={4} fill={C.ink} />
          )}
          {/* zoomed in: a tick at every step of the gap's own size, standing clear of the bar and notched
              into it, so the bar can be counted step by step */}
          {zr && Array.from({ length: Math.max(0, Math.round((zr[1] - zr[0]) / zr[2]) - 1) }).map((_, t) => {
            const val = zr[0] + (t + 1) * zr[2], x = gX(val), inBar = g.slide && val > barFrom && val < barTo;
            return (
              <g key={"z" + t}>
                <rect x={x - 1.5} y={G.gAxis - 16} width={3} height={32} fill={C.ink} />
                {inBar && <rect x={x - 1} y={G.gAxis - 7} width={2} height={14} fill="#FFFFFF" />}
              </g>
            );
          })}
          {/* counting up: each hop marked off on the bar, its size under it */}
          {hopsOn && g.hops.slice(0, g.hopN).map((h: any, i: number) => (
            <g key={"hop" + i} className="eg-in">
              {i > 0 && <rect x={gX(h.from) - 2} y={G.gAxis - 9} width={4} height={18} fill="#FFFFFF" />}
              <text x={(gX(h.from) + gX(h.to)) / 2} y={G.gAxis + 36} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{indian(h.to - h.from)}</text>
            </g>
          ))}
          <g className="eg-slide" style={{ transform: g.slide ? `translate(${gX(g.a)}px, ${G.gAxis}px)` : `translate(${G.er - 80}px, ${ANS_CY - 6}px)` } as any}>
            <path d={pinPath(true)} fill={ROSE} stroke={deep(ROSE)} strokeWidth={2} />
          </g>
          <g className="eg-slide" style={{ transform: g.slide ? `translate(${gX(g.b)}px, ${G.gAxis}px)` : `translate(${colC(2)}px, ${ANS_CY + 6}px)` } as any}>
            <path d={pinPath(false)} fill={workedTone ? GREEN : C.ink} stroke={workedTone ? deep(GREEN) : C.ink} strokeWidth={2} />
          </g>
          {g.slide && (g.label
            ? <text key={"gl" + Math.abs(g.a - g.b)} className="eg-in" x={gapMid} y={G.gAxis - 46} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{indian(Math.abs(g.a - g.b))}</text>
            : <rect x={gapMid - 56} y={G.gAxis - 84} width={112} height={44} rx={10} fill="none" stroke={C.ink} strokeWidth={2} strokeDasharray="6 6" />)}
          {zoomLive && <Hit id="gap-zoom" label={g.zoom ? "Show the whole line" : "Zoom in on the gap"} x={G.gx0 - 24} y={G.gAxis - 78} w={G.gx1 - G.gx0 + 48} h={106} onPress={toggleZoom} />}
        </g>
      )}

      {/* a ten on its way to the column it joins */}
      {v.fly && (
        <g className="eg-move" style={{ transform: `translate(${v.fly.x}px, ${v.fly.y}px)` } as any} pointerEvents="none">
          <circle cx={0} cy={0} r={21} fill={deep(VERM)} stroke="#FFFFFF" strokeWidth={2} />
          <text x={0} y={10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF">10</text>
        </g>
      )}

      {/* the right answer, ringed at the end of a traceback */}
      {v.ring && v.ring.kind === "est" && <rect x={G.el - 8} y={ANS_CY + v.ring.j * 66 - 34} width={G.er + 16 - G.el} height={66} rx={14} fill="none" stroke={C.ink} strokeWidth={4} pointerEvents="none" />}
      {v.ring && v.ring.kind === "sum" && <rect x={4} y={ANS_CY - 34} width={G.xr + 8} height={66} rx={14} fill="none" stroke={C.ink} strokeWidth={4} pointerEvents="none" />}
      {v.ring && v.ring.kind === "verdict" && v.verdict && <rect x={(G.divX + G.el) / 2 - 149} y={338} width={298} height={70} rx={20} fill="none" stroke={C.ink} strokeWidth={4} pointerEvents="none" />}
      {v.ring && v.ring.kind === "label" && g && <rect x={gapMid - 66} y={G.gAxis - 86} width={132} height={52} rx={12} fill="none" stroke={C.ink} strokeWidth={4} pointerEvents="none" />}

      {free && (
        <Key id="new-numbers" label={trn("New numbers")} x={0} y={0} w={300} h={72} C={C} onClick={newNumbers}>
          <text y={10} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{trn("new numbers")}</text>
        </Key>
      )}

      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing: the child's last right answer of the phase, in its own colour
   (an estimate rose, a worked answer green, a gap as an ink bar between two pins) */
function Thumb({ result, C, w, h }: any) {
  const L = (result && result.last) || {};
  const val = leadNumber(L.value);
  const k = L.kind, my = h / 2;
  if ((val === null || val === undefined) && typeof L.value === "string" && L.value) return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <text x={w / 2} y={my + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{L.value}</text>
    </g>
  );
  if (val === null || val === undefined) return null;
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

function EstimateGap(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null }} />
  );
}

export default EstimateGap;
