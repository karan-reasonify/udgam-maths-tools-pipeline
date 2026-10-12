/* ═══ M2.S3.T4.C12.2D1 · compare_and_order · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "compare_and_order";
const MEDIA_ID = "M2.S3.T4.C12.2D1";
const TOOL_NAME = "Compare and Order";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["Two numbers, one chart. Count how long each one is before you read it."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "One place decided it, and everything after it could be greyed out.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Any two numbers, any cards, either order.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r13+: `lineFor(line, lang, TR)`); the
   English stays what the checks read. NCERT class 4 terms; digits stay digits (the runtime speaks them
   in the language in use). The walker is a पट्टी / પટ્ટી, the rail a खाँचा / ખાંચો. A first draft; wants a
   native speaker's read. */
const TR: any = {
  hi: {
    "Compare and Order": "तुलना और क्रम",
    "Two numbers, one chart. Count how long each one is before you read it.": "दो संख्याएँ, एक चार्ट। पढ़ने से पहले गिनो कि हर एक कितनी लंबी है।",
    "One place decided it, and everything after it could be greyed out.": "एक स्थान ने फ़ैसला किया, और उसके बाद का सब कुछ धूसर हो गया।",
    "Free play. Any two numbers, any cards, either order.": "मुक्त खेल। कोई भी दो संख्याएँ, कोई भी कार्ड, कोई भी क्रम।",
    "More digits means a bigger number": "ज़्यादा अंक यानी बड़ी संख्या",
    "Do not read them yet. Just count how long each one is.": "अभी इन्हें मत पढ़ो। बस गिनो कि हर एक कितनी लंबी है।",
    "Tap the box at the end of a row to count its digits.": "पंक्ति के अंक गिनने के लिए उसके आखिरी डिब्बे पर टैप करो।",
    "How many digits has the bottom one?": "नीचे वाली संख्या में कितने अंक हैं?",
    "Look at the counts only. Which row is longer?": "सिर्फ़ गिनती देखो। कौन सी पंक्ति लंबी है?",
    "More digits always means a greater number, and nothing else needs checking.": "ज़्यादा अंक यानी हमेशा बड़ी संख्या, और कुछ जाँचना नहीं पड़ता।",
    "You learned: more digits always means a greater number.": "तुमने सीखा: ज़्यादा अंक यानी हमेशा बड़ी संख्या।",
    "Which sign goes between?": "बीच में कौन सा चिह्न आएगा?",
    "Which is greater, 8,424 or 39,526? Count the digits, then pick the sign.": "कौन बड़ी है, 8,424 या 39,526? अंक गिनो, फिर चिह्न चुनो।",
    "How many digits has the top number?": "ऊपर वाली संख्या में कितने अंक हैं?",
    "Which is greater, 50,361 or 1,60,972? Pick the sign that goes between them.": "कौन बड़ी है, 50,361 या 1,60,972? उनके बीच आने वाला चिह्न चुनो।",
    "Count the digits in each row first.": "पहले हर पंक्ति के अंक गिनो।",
    "Can 4 digits ever beat 5?": "क्या 4 अंक कभी 5 से बड़े?",
    "One number has five digits and another has four. Can the four digit one ever be greater?": "एक संख्या में पाँच अंक हैं और दूसरी में चार। क्या चार अंकों वाली कभी बड़ी हो सकती है?",
    "The top number is the biggest with four digits. Set it beside the bottom one.": "ऊपर वाली, चार अंकों की सबसे बड़ी संख्या है। उसे नीचे वाली के साथ रखकर देखो।",
    "Same digit count, so compare from the left": "अंक बराबर, तो बाईं ओर से तुलना करो",
    "Same number of digits, so start from the left. Tap step to move the walker.": "अंक बराबर हैं, तो बाईं ओर से शुरू करो। पट्टी चलाने के लिए कदम पर टैप करो।",
    "Keep stepping. Stop the moment they are different.": "आगे बढ़ते रहो। जैसे ही अंक अलग हों, रुक जाओ।",
    "Which column is the walker standing on?": "पट्टी किस खाने पर खड़ी है?",
    "Look at the first three columns only. Where do they first differ?": "सिर्फ़ पहले तीन खाने देखो। वे पहली बार कहाँ अलग होते हैं?",
    "The first place from the left where the digits differ decides the comparison.": "बाईं ओर से जिस पहले स्थान पर अंक अलग हों, वही तुलना तय करता है।",
    "You learned: the first place from the left that differs decides it.": "तुमने सीखा: बाईं ओर से पहला अलग स्थान फ़ैसला करता है।",
    "Which is greater, 9,38,769 or 9,17,654? Step the walker, then pick the sign.": "कौन बड़ी है, 9,38,769 या 9,17,654? पट्टी चलाओ, फिर चिह्न चुनो।",
    "Do these two digits match?": "क्या ये दो अंक एक जैसे हैं?",
    "Compare 9,92,364 and 9,93,695 using the correct sign.": "सही चिह्न लगाकर 9,92,364 और 9,93,695 की तुलना करो।",
    "Step past the digits that are the same. What comes next?": "एक जैसे अंकों से आगे बढ़ो। आगे क्या आता है?",
    "Compare 96,321 and 75,632 using the correct sign.": "सही चिह्न लगाकर 96,321 और 75,632 की तुलना करो।",
    "Which pair does the walker reach first?": "पट्टी सबसे पहले किस जोड़ी पर पहुँचती है?",
    "Smallest first is ascending order": "सबसे छोटी पहले, यह आरोही क्रम है",
    "Sort them by how long they are before you read any of them.": "किसी को पढ़ने से पहले, उन्हें लंबाई के हिसाब से छाँटो।",
    "Drag or tap each card into the rail.": "हर कार्ड को खींचकर या टैप करके खाँचे में रखो।",
    "Which cards are the short ones?": "कौन से कार्ड छोटे हैं?",
    "Put the short cards first, then order each group.": "छोटे कार्ड पहले रखो, फिर हर समूह को क्रम में लगाओ।",
    "Split a set by digit count first, then order inside each group.": "पहले अंक गिनकर समूह बनाओ, फिर हर समूह के अंदर क्रम लगाओ।",
    "You learned: split a set by digit count first, then order each group.": "तुमने सीखा: पहले अंक गिनकर बाँटो, फिर हर समूह का क्रम लगाओ।",
    "Ascending: smallest first": "आरोही: सबसे छोटी पहले",
    "Put these four cards in ascending order, smallest first. Then press enter.": "इन चार कार्डों को आरोही क्रम में रखो, सबसे छोटी पहले। फिर एंटर दबाओ।",
    "How many digits has each card?": "हर कार्ड में कितने अंक हैं?",
    "Write these four in ascending order.": "इन चारों को आरोही क्रम में लिखो।",
    "They all have five digits. Which place tells them apart?": "सब में पाँच अंक हैं। कौन सा स्थान उन्हें अलग करता है?",
    "Now these four, in ascending order.": "अब ये चार, आरोही क्रम में।",
    "Look at the lakhs digit of each card first.": "पहले हर कार्ड का लाख वाला अंक देखो।",
    "Biggest first is descending order": "सबसे बड़ी पहले, यह अवरोही क्रम है",
    "Same cards, other way round. Which one goes first now?": "वही कार्ड, उल्टी तरफ़ से। अब सबसे पहले कौन जाएगा?",
    "Set the switch, then lay the cards and press enter.": "स्विच सेट करो, फिर कार्ड रखो और एंटर दबाओ।",
    "Which end of the rail does the biggest go to now?": "अब सबसे बड़ी खाँचे के किस सिरे पर जाएगी?",
    "Read the smallest first order from the other end.": "सबसे छोटी पहले वाला क्रम दूसरे सिरे से पढ़ो।",
    "Descending is the ascending order turned round, not a fresh sort.": "अवरोही क्रम, आरोही क्रम को उलटना है, नई छँटाई नहीं।",
    "You learned: descending is the ascending order turned round.": "तुमने सीखा: अवरोही क्रम, आरोही क्रम का उल्टा है।",
    "Descending: biggest first": "अवरोही: सबसे बड़ी पहले",
    "Write these four in descending order. Then press enter.": "इन चारों को अवरोही क्रम में लिखो। फिर एंटर दबाओ।",
    "Which card is the biggest?": "सबसे बड़ा कार्ड कौन सा है?",
    "Increasing order": "बढ़ता क्रम",
    "Five salaries are on the cards. Put them in increasing order.": "कार्डों पर पाँच वेतन लिखे हैं। उन्हें बढ़ते क्रम में रखो।",
    "Increasing means smallest first. Check the switch, then the cards.": "बढ़ते क्रम का मतलब सबसे छोटी पहले। स्विच जाँचो, फिर कार्ड।",
    "Now order these four, greatest first.": "अब इन चारों का क्रम लगाओ, सबसे बड़ी पहले।",
    "Two cards look almost the same. Which place tells them apart?": "दो कार्ड लगभग एक जैसे दिखते हैं। कौन सा स्थान उन्हें अलग करता है?",
    "Put every card in the rail first.": "पहले हर कार्ड खाँचे में रखो।",
    /* the working area's own words, and the choices */
    "ones": "इकाई", "thousands": "हज़ार", "lakhs": "लाख",
    "O": "इ", "T": "द", "H": "सै", "Th": "ह", "TTh": "द.ह.", "L": "ल",
    "digits": "अंक", "top": "ऊपर वाली", "bottom": "नीचे वाली", "step": "कदम", "Walk it": "चलाओ",
    "New numbers": "नई संख्याएँ", "New pair": "नई जोड़ी", "Cards": "कार्ड", "Chart": "चार्ट", "New cards": "नए कार्ड",
    "smallest": "सबसे छोटी", "biggest": "सबसे बड़ी", "smallest first": "सबसे छोटी पहले", "biggest first": "सबसे बड़ी पहले",
    "Order: smallest first": "क्रम: सबसे छोटी पहले", "Order: biggest first": "क्रम: सबसे बड़ी पहले",
    "Order: smallest first. Tap to switch": "क्रम: सबसे छोटी पहले। बदलने के लिए टैप करो",
    "Order: biggest first. Tap to switch": "क्रम: सबसे बड़ी पहले। बदलने के लिए टैप करो",
    "compared": "तुलना हुई", "placed": "रखे गए",
    "> greater": "> बड़ा", "< less": "< छोटा", "= equal": "= बराबर", "Yes": "हाँ", "No": "नहीं",
  },
  gu: {
    "Compare and Order": "સરખામણી અને ક્રમ",
    "Two numbers, one chart. Count how long each one is before you read it.": "બે સંખ્યા, એક ચાર્ટ. વાંચતાં પહેલાં ગણો કે દરેક કેટલી લાંબી છે.",
    "One place decided it, and everything after it could be greyed out.": "એક સ્થાને નિર્ણય કર્યો, અને તેના પછીનું બધું ઝાંખું થઈ ગયું.",
    "Free play. Any two numbers, any cards, either order.": "મુક્ત રમત. કોઈ પણ બે સંખ્યા, કોઈ પણ કાર્ડ, કોઈ પણ ક્રમ.",
    "More digits means a bigger number": "વધુ અંક એટલે મોટી સંખ્યા",
    "Do not read them yet. Just count how long each one is.": "હજી વાંચશો નહીં. બસ ગણો કે દરેક કેટલી લાંબી છે.",
    "Tap the box at the end of a row to count its digits.": "હારના અંક ગણવા તેના છેડાના ખાના પર ટૅપ કરો.",
    "How many digits has the bottom one?": "નીચેની સંખ્યામાં કેટલા અંક છે?",
    "Look at the counts only. Which row is longer?": "ફક્ત ગણતરી જુઓ. કઈ હાર લાંબી છે?",
    "More digits always means a greater number, and nothing else needs checking.": "વધુ અંક એટલે હંમેશાં મોટી સંખ્યા, બીજું કંઈ ચકાસવું પડતું નથી.",
    "You learned: more digits always means a greater number.": "તમે શીખ્યા: વધુ અંક એટલે હંમેશાં મોટી સંખ્યા.",
    "Which sign goes between?": "વચ્ચે કયું ચિહ્ન આવશે?",
    "Which is greater, 8,424 or 39,526? Count the digits, then pick the sign.": "કઈ મોટી છે, 8,424 કે 39,526? અંક ગણો, પછી ચિહ્ન પસંદ કરો.",
    "How many digits has the top number?": "ઉપરની સંખ્યામાં કેટલા અંક છે?",
    "Which is greater, 50,361 or 1,60,972? Pick the sign that goes between them.": "કઈ મોટી છે, 50,361 કે 1,60,972? તેમની વચ્ચે આવતું ચિહ્ન પસંદ કરો.",
    "Count the digits in each row first.": "પહેલાં દરેક હારના અંક ગણો.",
    "Can 4 digits ever beat 5?": "શું 4 અંક ક્યારેય 5 થી મોટા?",
    "One number has five digits and another has four. Can the four digit one ever be greater?": "એક સંખ્યામાં પાંચ અંક છે અને બીજીમાં ચાર. શું ચાર અંકવાળી ક્યારેય મોટી હોઈ શકે?",
    "The top number is the biggest with four digits. Set it beside the bottom one.": "ઉપરની સંખ્યા ચાર અંકની સૌથી મોટી સંખ્યા છે. તેને નીચેની પાસે મૂકીને જુઓ.",
    "Same digit count, so compare from the left": "અંક સરખા, તો ડાબી બાજુથી સરખાવો",
    "Same number of digits, so start from the left. Tap step to move the walker.": "અંક સરખા છે, તો ડાબી બાજુથી શરૂ કરો. પટ્ટી ચલાવવા પગલું પર ટૅપ કરો.",
    "Keep stepping. Stop the moment they are different.": "આગળ વધતા રહો. અંક જુદા થાય કે તરત અટકો.",
    "Which column is the walker standing on?": "પટ્ટી કયા ખાના પર ઊભી છે?",
    "Look at the first three columns only. Where do they first differ?": "ફક્ત પહેલાં ત્રણ ખાનાં જુઓ. તે પહેલી વાર ક્યાં જુદાં પડે છે?",
    "The first place from the left where the digits differ decides the comparison.": "ડાબી બાજુથી જે પહેલા સ્થાને અંક જુદા હોય, તે જ સરખામણી નક્કી કરે છે.",
    "You learned: the first place from the left that differs decides it.": "તમે શીખ્યા: ડાબી બાજુથી પહેલું જુદું સ્થાન નિર્ણય કરે છે.",
    "Which is greater, 9,38,769 or 9,17,654? Step the walker, then pick the sign.": "કઈ મોટી છે, 9,38,769 કે 9,17,654? પટ્ટી ચલાવો, પછી ચિહ્ન પસંદ કરો.",
    "Do these two digits match?": "શું આ બે અંક સરખા છે?",
    "Compare 9,92,364 and 9,93,695 using the correct sign.": "સાચું ચિહ્ન મૂકીને 9,92,364 અને 9,93,695 ને સરખાવો.",
    "Step past the digits that are the same. What comes next?": "સરખા અંકથી આગળ વધો. પછી શું આવે છે?",
    "Compare 96,321 and 75,632 using the correct sign.": "સાચું ચિહ્ન મૂકીને 96,321 અને 75,632 ને સરખાવો.",
    "Which pair does the walker reach first?": "પટ્ટી સૌથી પહેલાં કઈ જોડી પર પહોંચે છે?",
    "Smallest first is ascending order": "સૌથી નાની પહેલાં, એ ચડતો ક્રમ છે",
    "Sort them by how long they are before you read any of them.": "કોઈને વાંચતાં પહેલાં, તેમને લંબાઈ પ્રમાણે છૂટાં પાડો.",
    "Drag or tap each card into the rail.": "દરેક કાર્ડને ખેંચીને કે ટૅપ કરીને ખાંચામાં મૂકો.",
    "Which cards are the short ones?": "કયાં કાર્ડ ટૂંકાં છે?",
    "Put the short cards first, then order each group.": "ટૂંકાં કાર્ડ પહેલાં મૂકો, પછી દરેક જૂથને ક્રમમાં ગોઠવો.",
    "Split a set by digit count first, then order inside each group.": "પહેલાં અંક ગણીને જૂથ બનાવો, પછી દરેક જૂથમાં ક્રમ ગોઠવો.",
    "You learned: split a set by digit count first, then order each group.": "તમે શીખ્યા: પહેલાં અંક ગણીને વહેંચો, પછી દરેક જૂથનો ક્રમ ગોઠવો.",
    "Ascending: smallest first": "ચડતો: સૌથી નાની પહેલાં",
    "Put these four cards in ascending order, smallest first. Then press enter.": "આ ચાર કાર્ડને ચડતા ક્રમમાં મૂકો, સૌથી નાની પહેલાં. પછી એન્ટર દબાવો.",
    "How many digits has each card?": "દરેક કાર્ડમાં કેટલા અંક છે?",
    "Write these four in ascending order.": "આ ચારને ચડતા ક્રમમાં લખો.",
    "They all have five digits. Which place tells them apart?": "બધામાં પાંચ અંક છે. કયું સ્થાન તેમને જુદાં પાડે છે?",
    "Now these four, in ascending order.": "હવે આ ચાર, ચડતા ક્રમમાં.",
    "Look at the lakhs digit of each card first.": "પહેલાં દરેક કાર્ડનો લાખનો અંક જુઓ.",
    "Biggest first is descending order": "સૌથી મોટી પહેલાં, એ ઊતરતો ક્રમ છે",
    "Same cards, other way round. Which one goes first now?": "એ જ કાર્ડ, ઊલટી બાજુથી. હવે પહેલું કયું જશે?",
    "Set the switch, then lay the cards and press enter.": "સ્વિચ ગોઠવો, પછી કાર્ડ મૂકો અને એન્ટર દબાવો.",
    "Which end of the rail does the biggest go to now?": "હવે સૌથી મોટી ખાંચાના કયા છેડે જશે?",
    "Read the smallest first order from the other end.": "સૌથી નાની પહેલાંવાળો ક્રમ બીજા છેડેથી વાંચો.",
    "Descending is the ascending order turned round, not a fresh sort.": "ઊતરતો ક્રમ એ ચડતા ક્રમને ઊલટાવવો છે, નવી ગોઠવણી નહીં.",
    "You learned: descending is the ascending order turned round.": "તમે શીખ્યા: ઊતરતો ક્રમ એ ચડતા ક્રમનો ઊલટો છે.",
    "Descending: biggest first": "ઊતરતો: સૌથી મોટી પહેલાં",
    "Write these four in descending order. Then press enter.": "આ ચારને ઊતરતા ક્રમમાં લખો. પછી એન્ટર દબાવો.",
    "Which card is the biggest?": "સૌથી મોટું કાર્ડ કયું છે?",
    "Increasing order": "વધતો ક્રમ",
    "Five salaries are on the cards. Put them in increasing order.": "કાર્ડ પર પાંચ પગાર લખ્યા છે. તેમને વધતા ક્રમમાં મૂકો.",
    "Increasing means smallest first. Check the switch, then the cards.": "વધતો ક્રમ એટલે સૌથી નાની પહેલાં. સ્વિચ ચકાસો, પછી કાર્ડ.",
    "Now order these four, greatest first.": "હવે આ ચારનો ક્રમ ગોઠવો, સૌથી મોટી પહેલાં.",
    "Two cards look almost the same. Which place tells them apart?": "બે કાર્ડ લગભગ સરખાં દેખાય છે. કયું સ્થાન તેમને જુદાં પાડે છે?",
    "Put every card in the rail first.": "પહેલાં દરેક કાર્ડ ખાંચામાં મૂકો.",
    /* the working area's own words, and the choices */
    "ones": "એકમ", "thousands": "હજાર", "lakhs": "લાખ",
    "O": "એ", "T": "દ", "H": "શ", "Th": "હ", "TTh": "દ.હ.", "L": "લ",
    "digits": "અંક", "top": "ઉપરની", "bottom": "નીચેની", "step": "પગલું", "Walk it": "ચલાવો",
    "New numbers": "નવી સંખ્યાઓ", "New pair": "નવી જોડી", "Cards": "કાર્ડ", "Chart": "ચાર્ટ", "New cards": "નવાં કાર્ડ",
    "smallest": "સૌથી નાની", "biggest": "સૌથી મોટી", "smallest first": "સૌથી નાની પહેલાં", "biggest first": "સૌથી મોટી પહેલાં",
    "Order: smallest first": "ક્રમ: સૌથી નાની પહેલાં", "Order: biggest first": "ક્રમ: સૌથી મોટી પહેલાં",
    "Order: smallest first. Tap to switch": "ક્રમ: સૌથી નાની પહેલાં. બદલવા ટૅપ કરો",
    "Order: biggest first. Tap to switch": "ક્રમ: સૌથી મોટી પહેલાં. બદલવા ટૅપ કરો",
    "compared": "સરખાવ્યાં", "placed": "મૂક્યાં",
    "> greater": "> મોટું", "< less": "< નાનું", "= equal": "= બરાબર", "Yes": "હા", "No": "ના",
  },
};

/* ── the shared chart ────────────────────────────────────────────────────────────────
   Six columns, TL left out: every number in this topic has at most six digits, and the space
   it would take is the walker's parking bay. Headings use the book's short names; the period
   bands above them carry the long ones. A place takes its PERIOD's colour, as in the chapter's
   first tool: ones deep blue, thousands green, lakhs vermilion. Amber marks what is under
   discussion (the walker, a counted digit, the deciding pair); grey is a zero holding a place
   or a digit that can no longer matter. */
const PLACES = ["O", "T", "H", "Th", "TTh", "L"];
const PLACE_NAMES = ["ones", "tens", "hundreds", "thousands", "ten thousands", "lakhs"];
const PERIODS = [
  { name: "ones", color: CONTENT.hundred, places: [0, 1, 2] },
  { name: "thousands", color: CONTENT.one, places: [3, 4] },
  { name: "lakhs", color: CONTENT.pointer, places: [5] },
];
const PERIOD_OF = [0, 0, 0, 1, 1, 2];
const AMBER = CONTENT.ten;
const GREY = "#767676";
const colorOf = (k: number) => PERIODS[PERIOD_OF[Math.min(Math.max(k, 0), 5)]].color;
/* numerals take a deeper ink of their period colour (4.5:1 on white and on the bands) */
const inkOf = (k: number) => shade(colorOf(k), 0.25);

/* geometry in working-area units (1086 x 528) */
const NCOL = 6, CW = 120, X0 = 246;
const colX = (k: number) => X0 + (NCOL - 1 - k) * CW;
const colC = (k: number) => colX(k) + CW / 2;
const PARK = X0 - CW; /* the walker waits here, left of the chart */
const G = { label: 26, headTop: 38, headH: 44, rowA: 90, rowB: 206, rowH: 96, bottom: 306 };
const rowTop = (r: number) => (r === 0 ? G.rowA : G.rowB);
const SIGN = { x: 12, y: 148, s: 96 }; /* level with the gap between the rows */
const BADGE = { x: 978, w: 92, h: 52 };
const GRIP = { y: 312, h: 76 };
const KEYS_Y = 414;
const LINE = { x: 400, y: 444, w: 560, h: 76 }; /* the pair on one line, clear of the Walk it key */
/* the rail: an outlined groove with a slot per card, the arrow of growth under it */
const RAIL = { y: 300, h: 136, slotY: 310, slotH: 116, cardY: 320, cardH: 96, arrowY: 476, labelY: 486 };
const SW = { x: 714, y: 212, w: 360, h: 76 };
const GHOST_Y = 60;
const railOf = (N: number) => { const pitch = N >= 5 ? 212 : 220, w = N * pitch + 16; return { pitch, w, x: Math.round((W.w - w) / 2), cw: pitch - 24 }; };

const SIGNS = [{ id: "greater", label: "> greater" }, { id: "less", label: "< less" }, { id: "equal", label: "= equal" }];
const YESNO = [{ id: "yes", label: "Yes" }, { id: "no", label: "No" }];
const SIGN_SYM: Record<string, string> = { greater: ">", less: "<", equal: "=" };
const SIGN_WORD: Record<string, string> = { greater: "greater than", less: "less than", equal: "equal to" };

/* ── the maths the working area runs on (count the digits first, then left to right) ── */
const lenOf = (v: number) => String(Math.max(0, Math.trunc(Number(v) || 0))).length;
const digitAt = (v: number, k: number) => { const s = String(Math.max(0, Math.trunc(Number(v) || 0))); return k < s.length ? Number(s[s.length - 1 - k]) : null; };
/* the first place from the left where the two numbers differ (null when they are equal) */
const deciderOf = (a: number, b: number) => {
  const L = Math.max(lenOf(a), lenOf(b));
  for (let k = L - 1; k >= 0; k--) if (digitAt(a, k) !== digitAt(b, k)) return k;
  return null;
};
const signOf = (a: number, b: number) => {
  if (lenOf(a) !== lenOf(b)) return lenOf(a) > lenOf(b) ? "greater" : "less";
  const k = deciderOf(a, b);
  if (k === null) return "equal";
  return (digitAt(a, k) as number) > (digitAt(b, k) as number) ? "greater" : "less";
};
/* an order as the rail gives it: "biggest: 7,41,230; 5,69,874; ..." (the setting, then the cards) */
const parseOrder = (v: any) => {
  const s = String(v ?? "");
  const m = /^\s*(smallest|biggest)\s*:/i.exec(s);
  const dir = m ? m[1].toLowerCase() : null;
  const list = (m ? s.slice(m[0].length) : s).split(";").map((x) => x.replace(/[^0-9]/g, "")).filter(Boolean).map(Number);
  return { dir, list };
};
const orderText = (dir: string, list: number[]) => `${dir}: ${list.map((x) => indian(x)).join("; ")}`;
const alongOf = (dir: string, N: number) => Array.from({ length: N }, (_, s) => (dir === "biggest" ? N - 1 - s : s)); /* slots, tail to head of the arrow */

/* ── phases ─────────────────────────────────────────────────────────────────────────────
   kinds: greater (type the greater number) · sign (pick >, < or = for top then bottom; walk:
          the walker is on the chart) · yesno · order (lay the cards in the rail, set the switch,
          Enter commits; dir = the setting the question asks for, sw = where the switch starts) */
const PHASES = [
  {
    n: 1,
    concept: "More digits means a bigger number",
    conceptId: "M2.S3.T4.C12", objectiveIds: ["O5"],
    says: ["Do not read them yet. Just count how long each one is.", "Tap the box at the end of a row to count its digits."],
    ladder: ["How many digits has the bottom one?", "Look at the counts only. Which row is longer?"],
    closing: "More digits always means a greater number, and nothing else needs checking.",
    learned: "You learned: more digits always means a greater number.",
    traceback: "The shorter row's empty columns rule in grey, both badges count their digits one ring at a time, the two counts sit side by side, and the right sign writes itself.",
    items: [
      { qid: "M2.S3.T4.C12:ML1", kind: "sign", top: 8424, bottom: 39526, answer: "less", choices: SIGNS, winMs: 3600, ask: "Which sign goes between?",
        say: "Which is greater, 8,424 or 39,526? Count the digits, then pick the sign.", miss: "How many digits has the top number?" },
      { qid: "M2.S3.T4.C12:1", kind: "sign", top: 50361, bottom: 160972, answer: "less", choices: SIGNS, winMs: 3600, ask: "Which sign goes between?",
        say: "Which is greater, 50,361 or 1,60,972? Pick the sign that goes between them.", miss: "Count the digits in each row first." },
      { qid: "M2.S3.T4.C12:2", kind: "yesno", top: 9999, bottom: 10000, answer: "no", choices: YESNO, winMs: 3600, ask: "Can 4 digits ever beat 5?",
        say: "One number has five digits and another has four. Can the four digit one ever be greater?", miss: "The top number is the biggest with four digits. Set it beside the bottom one." },
    ],
  },
  {
    n: 2,
    concept: "Same digit count, so compare from the left",
    conceptId: "M2.S3.T4.C13", objectiveIds: ["O5"],
    says: ["Same number of digits, so start from the left. Tap step to move the walker.", "Keep stepping. Stop the moment they are different."],
    ladder: ["Which column is the walker standing on?", "Look at the first three columns only. Where do they first differ?"],
    closing: "The first place from the left where the digits differ decides the comparison.",
    learned: "You learned: the first place from the left that differs decides it.",
    traceback: "The walker runs again from the left, dimming each pair that matches; it holds at the first pair that differs, every column after it greys out, and the right sign writes itself.",
    items: [
      { qid: "M2.S3.T4.C13:ML2", kind: "sign", walk: true, top: 938769, bottom: 917654, answer: "greater", choices: SIGNS, winMs: 4200, ask: "Which sign goes between?",
        say: "Which is greater, 9,38,769 or 9,17,654? Step the walker, then pick the sign.", miss: "Do these two digits match?" },
      { qid: "M2.S3.T4.C13:4", kind: "sign", walk: true, top: 992364, bottom: 993695, answer: "less", choices: SIGNS, winMs: 4200, ask: "Which sign goes between?",
        say: "Compare 9,92,364 and 9,93,695 using the correct sign.", miss: "Step past the digits that are the same. What comes next?" },
      { qid: "M2.S3.T4.C13:3", kind: "sign", walk: true, top: 96321, bottom: 75632, answer: "greater", choices: SIGNS, winMs: 4200, ask: "Which sign goes between?",
        say: "Compare 96,321 and 75,632 using the correct sign.", miss: "Which pair does the walker reach first?" },
    ],
  },
  {
    n: 3,
    concept: "Smallest first is ascending order",
    conceptId: "M2.S3.T4.C14", objectiveIds: ["O6"],
    says: ["Sort them by how long they are before you read any of them.", "Drag or tap each card into the rail."],
    ladder: ["Which cards are the short ones?", "Put the short cards first, then order each group."],
    closing: "Split a set by digit count first, then order inside each group.",
    learned: "You learned: split a set by digit count first, then order each group.",
    traceback: "Each card's badge fills and the short and long cards part into two groups, or the arrow redraws; then the cards are laid in the right order.",
    items: [
      { qid: "M2.S3.T4.C14:ML3", kind: "order", cards: [63215, 402365, 23651, 523691], dir: "smallest", sw: "smallest", start: "loose", pad: "enter", winMs: 2400,
        answer: "23,651; 63,215; 4,02,365; 5,23,691", ask: "Ascending: smallest first",
        say: "Put these four cards in ascending order, smallest first. Then press enter.", miss: "How many digits has each card?" },
      { qid: "M2.S3.T4.C14:5", kind: "order", cards: [65781, 20549, 19680, 54187], dir: "smallest", sw: "smallest", start: "loose", pad: "enter", winMs: 2400,
        answer: "19,680; 20,549; 54,187; 65,781", ask: "Ascending: smallest first",
        say: "Write these four in ascending order.", miss: "They all have five digits. Which place tells them apart?" },
      { qid: "M2.S3.T4.C14:6", kind: "order", cards: [396452, 209586, 817492, 618045], dir: "smallest", sw: "smallest", start: "loose", pad: "enter", winMs: 2400,
        answer: "2,09,586; 3,96,452; 6,18,045; 8,17,492", ask: "Ascending: smallest first",
        say: "Now these four, in ascending order.", miss: "Look at the lakhs digit of each card first." },
    ],
  },
  {
    n: 4,
    concept: "Biggest first is descending order",
    conceptId: "M2.S3.T4.C15", objectiveIds: ["O6"],
    says: ["Same cards, other way round. Which one goes first now?", "Set the switch, then lay the cards and press enter."],
    ladder: ["Which end of the rail does the biggest go to now?", "Read the smallest first order from the other end."],
    closing: "Descending is the ascending order turned round, not a fresh sort.",
    learned: "You learned: descending is the ascending order turned round.",
    traceback: "The arrow turns round with the cards where they lie, or the old order lifts above the rail; then the cards are laid in the right order, read from its far end.",
    items: [
      { qid: "M2.S3.T4.C15:ML4", kind: "order", cards: [236589, 569874, 741230, 441296], dir: "biggest", sw: "smallest", swLive: true, start: "rail", pad: "enter", winMs: 2400,
        answer: "7,41,230; 5,69,874; 4,41,296; 2,36,589", ask: "Descending: biggest first",
        say: "Write these four in descending order. Then press enter.", miss: "Which card is the biggest?" },
      { qid: "M2.S3.T4.C15:8", kind: "order", cards: [235000, 179800, 100000, 235185, 197750], dir: "smallest", sw: "biggest", swLive: true, start: "loose", pad: "enter", winMs: 2600,
        answer: "1,00,000; 1,79,800; 1,97,750; 2,35,000; 2,35,185", ask: "Increasing order",
        say: "Five salaries are on the cards. Put them in increasing order.", miss: "Increasing means smallest first. Check the switch, then the cards." },
      { qid: "M2.S3.T4.C15:7", kind: "order", cards: [23658, 78965, 63254, 78966], dir: "biggest", sw: "smallest", swLive: true, start: "loose", pad: "enter", winMs: 2400,
        answer: "78,966; 78,965; 63,254; 23,658", ask: "Descending: biggest first",
        say: "Now order these four, greatest first.", miss: "Two cards look almost the same. Which place tells them apart?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  columns: PLACES, placeNames: PLACE_NAMES, columnWidth: CW, periods: PERIODS.map((p) => ({ name: p.name, places: p.places })),
  rows: ["top", "bottom"], signBox: SIGN, signs: SIGNS.map((c) => c.id), rail: { slotPitch: { four: 220, five: 212 }, cardHeight: RAIL.cardH },
  settings: ["smallest", "biggest"],
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a sign or a word is compared as a word, the greater number as a number, an order card by
   card together with the setting it was laid under */
const judge = (item: any, v: any) => {
  if (item.kind === "order") {
    const want = parseOrder(item.answer).list, got = parseOrder(v);
    return got.list.length === want.length && got.list.every((x, i) => x === want[i]) && (got.dir === null || got.dir === item.dir);
  }
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v ?? "").trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a route that shares no code with judge or Work:
   subtraction for a comparison, a numeric sort for an order, the place-value limits for the rule */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "greater") return it.answer === Math.max(it.top, it.bottom) && it.top !== it.bottom;
  if (it.kind === "sign") { const d = it.top - it.bottom; return it.answer === (d > 0 ? "greater" : d < 0 ? "less" : "equal"); }
  if (it.kind === "yesno") {
    const biggestFour = Math.pow(10, 4) - 1, smallestFive = Math.pow(10, 4);
    return it.answer === (biggestFour > smallestFive ? "yes" : "no") && it.top === biggestFour && it.bottom === smallestFive;
  }
  if (it.kind === "order") {
    const sorted = it.cards.slice().sort((a: number, b: number) => a - b);
    if (it.dir === "biggest") sorted.reverse();
    const plan = String(it.answer).split(";").map((x: string) => Number(x.replace(/,/g, "").trim()));
    return plan.length === sorted.length && plan.every((x: number, i: number) => x === sorted[i]);
  }
  return false;
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => {
  if (item.kind === "greater") return Math.min(item.top, item.bottom); /* the one with the bigger leading digit */
  if (item.kind === "yesno") return "yes";
  if (item.kind === "sign") {
    const a = String(item.top), b = String(item.bottom);
    const cmp = (x: number, y: number) => (x > y ? "greater" : x < y ? "less" : "equal");
    /* phase 1: the leading digits alone; phase 2: the ones digits (read from the right), else
       stopping on the first pair that matches and calling it equal */
    const guess = item.walk ? cmp(Number(a[a.length - 1]), Number(b[b.length - 1])) : cmp(Number(a[0]), Number(b[0]));
    return guess !== item.answer ? guess : item.answer === "equal" ? "greater" : "equal";
  }
  if (item.kind === "order") {
    const want = parseOrder(item.answer).list;
    if (!item.swLive) {
      /* ordered on the leading digit alone, long and short mixed; if that happens to be right,
         the largest put first and still called smallest first */
      const lead = item.cards.slice().sort((x: number, y: number) => Number(String(x)[0]) - Number(String(y)[0]));
      if (lead.some((x: number, i: number) => x !== want[i])) return orderText(item.dir, lead);
      return orderText(item.dir, want.slice().reverse());
    }
    return orderText("biggest", want.slice().reverse()); /* the ascending order labelled biggest first */
  }
  return "~";
};
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => {
  if (item.kind === "greater") return [`${indian(item.answer)} is greater`, `${item.answer} is greater`];
  if (item.kind === "sign") {
    const w = SIGN_WORD[item.answer];
    return [w, `${indian(item.top)} is ${w} ${indian(item.bottom)}`, `${item.top} is ${w} ${item.bottom}`];
  }
  if (item.kind === "yesno") return item.answer === "no" ? ["no", "never"] : ["yes"];
  if (item.kind === "order") return [String(item.answer), agentKey(item)];
  return [String(item.answer)];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => (item.kind === "order" ? orderText(item.dir, parseOrder(item.answer).list) : item.answer);
/* what the slot shows: the sign itself, a number with its commas, or how many cards were laid */
const format = (typed: any, _j?: any, ctx?: any) => {
  const t = String(typed ?? "");
  if (SIGN_SYM[t]) return SIGN_SYM[t];
  if (t === "yes" || t === "no") return t === "yes" ? "Yes" : "No";
  if (/[;:]/.test(t)) { const p = parseOrder(t); return p.list.length ? (ctx && ctx.lang === "hi" ? `${p.list.length} कार्ड` : ctx && ctx.lang === "gu" ? `${p.list.length} કાર્ડ` : `${p.list.length} cards`) : ""; }
  if (/^\d+$/.test(t)) return indian(Number(t));
  return t;
};

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (item.kind === "order") {
    if (HOOK.setRail) HOOK.setRail(parseOrder(item.answer).list, item.dir);
    setTimeout(() => HOOK.enter && HOOK.enter(), 40);
    return;
  }
  return T.submit(item.answer);
};
/* the agent's answer(): an order is laid in the rail and the switch set, as a child would */
const answer = (item: any, v: any) => {
  if (item.kind !== "order") return undefined;
  const p = parseOrder(v);
  return p.list.length && HOOK.setRail ? !!HOOK.setRail(p.list, p.dir) : false;
};
/* the agent's check(): nothing waits on the working area here, so Enter is pressed */
const check = () => undefined;

/* ── free play: any two numbers, any cards, either order ───────────────────────────── */
const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const randNum = (len: number) => { let s = String(rnd(1, 9)); while (s.length < len) s += String(rnd(0, 9)); return Number(s); };
const freePair = () => {
  if (rnd(0, 2) === 0) { const a = rnd(4, 6), b = a === 6 ? 5 : a + 1; return rnd(0, 1) ? [randNum(a), randNum(b)] : [randNum(b), randNum(a)]; }
  const len = rnd(5, 6), a = String(randNum(len)), keep = rnd(1, len - 2);
  let d = rnd(0, 9);
  while (d === Number(a[keep])) d = rnd(0, 9);
  let b = a.slice(0, keep) + String(d);
  while (b.length < len) b += String(rnd(0, 9));
  return rnd(0, 1) ? [Number(a), Number(b)] : [Number(b), Number(a)];
};
const freeCards = () => {
  for (;;) {
    const twin = randNum(6);
    const out = [randNum(5), randNum(5), randNum(6), twin, Number(String(twin).slice(0, 4) + String(rnd(10, 99)))];
    if (new Set(out).size === out.length) return out.sort(() => Math.random() - 0.5);
  }
};
const freeItem = (m: string) => {
  if (m === "cards") return { kind: "freecards", cards: freeCards(), sw: "smallest", swLive: true, start: "loose" };
  const [top, bottom] = freePair();
  return { kind: "freechart", walk: true, top, bottom };
};

const setupOf = (it: any) => {
  if (it.kind === "order" || it.kind === "freecards") {
    const cards = it.cards.slice(), N = cards.length, rail: any[] = Array(N).fill(null);
    if (it.start === "rail") cards.map((_: any, i: number) => i).sort((a: number, b: number) => cards[a] - cards[b]).forEach((ci: number, s: number) => { rail[s] = ci; });
    return { scene: "cards", kind: it.kind, cards, N, rail, sw: it.sw || "smallest", swLive: !!it.swLive, walk: false, nums: [0, 0],
      filled: it.start === "rail" ? cards.map((_: any, i: number) => i) : [] };
  }
  return { scene: "chart", kind: it.kind, nums: [it.top || 0, it.bottom || 0], walk: !!it.walk, cards: [], N: 0, rail: [], sw: "smallest", swLive: false, filled: [] };
};

const CO_CSS = `
.co-move{transition:transform 340ms cubic-bezier(.3,.7,.25,1)}
.co-digit{transition:fill 420ms ease,transform 460ms ease}
.co-turn{transition:transform 650ms ease}
.co-write{stroke-dasharray:1;stroke-dashoffset:1;animation:coWrite 640ms ease-out forwards}
@keyframes coWrite{to{stroke-dashoffset:0}}
.co-in{animation:coIn 420ms ease-out both}
@keyframes coIn{from{opacity:0}to{opacity:1}}
.co-grab{cursor:grab}
@media (prefers-reduced-motion:reduce){.co-move,.co-digit,.co-turn{transition:none}.co-write,.co-in{animation:none}.co-write{stroke-dashoffset:0}}
`;

/* after a finger or a mouse press, let go of the focus, so a keyboard Enter commits the answer
   instead of pressing that piece again; focus that came from the keyboard stays where it is */
const release = () => {
  try { const a: any = document.activeElement; if (a && a.blur && !(a.matches && a.matches(":focus-visible"))) a.blur(); } catch (e) {}
};

/* a comparison sign drawn as strokes, centred at (x, y), `size` tall; `write` draws it on */
function SignGlyph({ s, x, y, size, color, write }: any) {
  const h = size / 2, w = size * 0.36;
  const p: any = { fill: "none", stroke: color, strokeWidth: Math.max(4, size * 0.14), strokeLinecap: "round", strokeLinejoin: "round", pathLength: 1, className: write ? "co-write" : undefined };
  if (s === "greater") return <path d={`M ${x - w} ${y - h} L ${x + w} ${y} L ${x - w} ${y + h}`} {...p} />;
  if (s === "less") return <path d={`M ${x + w} ${y - h} L ${x - w} ${y} L ${x + w} ${y + h}`} {...p} />;
  if (s === "equal") return <path d={`M ${x - w * 1.2} ${y - h * 0.4} H ${x + w * 1.2} M ${x - w * 1.2} ${y + h * 0.4} H ${x + w * 1.2}`} {...p} />;
  return null;
}

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const busy = tl.busy;
  const free = stage === "free";
  const init = useMemo(() => setupOf(item), []);
  const [cfg, setCfg] = useState<any>(init);
  /* the chart */
  const [nums, setNums] = useState<number[]>(init.nums);
  const [counted, setCounted] = useState<number[]>([0, 0]); /* digits counted so far, per row */
  const [ring, setRing] = useState<any>(null);             /* the digit being counted { r, k } */
  const [hatch, setHatch] = useState(false);               /* the shorter row's empty columns ruled grey */
  const [compare, setCompare] = useState(false);           /* the two counts side by side */
  const [cover, setCover] = useState(false);               /* digits covered: only the lengths show */
  const [walker, setWalker] = useState(-1);                /* -1 parked, else the column it stands on */
  const [cutAt, setCutAt] = useState<number | null>(null); /* every column right of this one greyed */
  const [lay, setLay] = useState<number | null>(null);     /* a matching pair laid one over the other */
  const [cut3, setCut3] = useState(false);                 /* only the first three columns shown */
  const [sign, setSign] = useState<string | null>(null);   /* the sign written in the box */
  const [glow, setGlow] = useState<number | null>(null);   /* the greater row, lit on a win */
  const [line, setLine] = useState(false);                 /* the pair on one line, as the book writes it */
  /* the rail */
  const [rail, setRail] = useState<any[]>(init.rail);      /* slot -> card index (null = empty) */
  const [dir, setDir] = useState<string>(init.sw);         /* the order setting */
  const [filled, setFilled] = useState<number[]>(init.filled); /* cards whose digit badge is counted */
  const [rings, setRings] = useState<number[]>([]);
  const [ghost, setGhost] = useState<any[] | null>(null);  /* the order the rail held, lifted above it */
  const [pointer, setPointer] = useState<number | null>(null);
  const [arrowKey, setArrowKey] = useState(0);
  const [arrowFrom, setArrowFrom] = useState<string | null>(null); /* the arrow still pointing the old way */
  const [switchLit, setSwitchLit] = useState(false);
  const [closed, setClosed] = useState(false);
  const [wave, setWave] = useState(-1);
  const [touched, setTouched] = useState(false);
  const setupFor = useRef(0);
  const walkRef = useRef(walker); walkRef.current = walker;
  const railRef = useRef(rail); railRef.current = rail;
  const dirRef = useRef(dir); dirRef.current = dir;
  const cfgRef = useRef(cfg); cfgRef.current = cfg;

  const reset = (it: any) => {
    tl.stop();
    const s = setupOf(it);
    setCfg(s); cfgRef.current = s;
    setNums(s.nums); setCounted([0, 0]); setRing(null); setHatch(false); setCompare(false); setCover(false);
    setWalker(-1); walkRef.current = -1; setCutAt(null); setLay(null); setCut3(false); setSign(null); setGlow(null); setLine(false);
    setRail(s.rail); railRef.current = s.rail; setDir(s.sw); dirRef.current = s.sw; setFilled(s.filled);
    setRings([]); setGhost(null); setPointer(null); setArrowFrom(null); setSwitchLit(false); setClosed(false); setWave(-1); setTouched(false);
    api.lock(false);
  };

  useEffect(() => {
    if (stage === "ask" && setupFor.current !== index) { setupFor.current = index; reset(item); }
  }, [stage, index]);

  /* free play (the plan's freePlay): any two numbers in the chart, any cards in the rail, either
     order; nothing to get right, and the sign writes itself when the walker stops */
  useEffect(() => {
    if (!free) return;
    setupFor.current = -2;
    reset(freeItem("chart"));
  }, [free]);

  /* ── the chart ── */
  const chart = cfg.scene === "chart";
  const walks = chart && cfg.walk;
  const top = nums[0], bot = nums[1];
  const L = Math.max(lenOf(top), lenOf(bot));
  const dec = deciderOf(top, bot);
  const stopAt = dec === null ? 0 : dec;
  const playing = stage === "ask" || free;
  const gripLive = walks && playing && (walker === -1 || walker > stopAt);
  const canCount = chart && playing && !busy;
  const canEdit = free && chart && !busy;

  /* the walker steps from `from` towards `target`, never past the first pair that differs; when
     it halts there, every column to its right greys out together */
  const walkSteps = (from: number, target: number, ms: number, cutMs = 600) => {
    const S: any[] = [];
    const goal = Math.max(target, stopAt);
    let w = from;
    while (w === -1 || w > goal) {
      w = w === -1 ? L - 1 : w - 1;
      const ww = w;
      S.push([ms, () => { setWalker(ww); walkRef.current = ww; api.sfx.tick(); }]);
    }
    if (w === stopAt && dec !== null) S.push([cutMs, () => setCutAt(dec)]);
    return S;
  };
  const afterStop = (S: any[], reached: boolean) => { if (free && reached) S.push([200, () => setSign(signOf(top, bot))]); return S; };
  const step = () => {
    if (!gripLive || busy) return;
    setTouched(true);
    const w = walkRef.current, next = w === -1 ? L - 1 : w - 1;
    tl.run(afterStop(walkSteps(w, next, 320), Math.max(next, stopAt) === stopAt));
  };
  const walkIt = () => {
    release();
    if (!gripLive || busy) return;
    setTouched(true);
    tl.run(afterStop(walkSteps(walkRef.current, stopAt, 480), true));
  };
  const walkToCol = (k: number) => {
    if (!gripLive || busy) return;
    setTouched(true);
    tl.run(afterStop(walkSteps(walkRef.current, k, 300), Math.max(k, stopAt) === stopAt));
  };

  /* a badge counts its row from the left, ringing each digit as it goes */
  const countSteps = (r: number, ms: number) => {
    const len = lenOf(nums[r]), S: any[] = [];
    for (let i = 0; i < len; i++) {
      const k = len - 1 - i, c = i + 1;
      S.push([ms, () => { setRing({ r, k }); setCounted((x) => { const y = x.slice(); y[r] = c; return y; }); api.sfx.tick(); }]);
    }
    S.push([220, () => setRing(null)]);
    return S;
  };
  const countRow = (r: number) => {
    release();
    if (!canCount) return;
    setTouched(true);
    tl.run(countSteps(r, 300));
  };

  /* free play: a tap raises a digit by one; the empty cell left of a number gives it one more place */
  const editDigit = (r: number, k: number) => {
    release();
    if (!canEdit) return;
    const s = String(nums[r]), len = s.length;
    let out = s;
    if (k < len) {
      const i = len - 1 - k, d = Number(s[i]);
      if (i === 0) out = d < 9 ? String(d + 1) + s.slice(1) : len > 1 ? String(Number(s.slice(1)) || 1) : "1";
      else out = s.slice(0, i) + String((d + 1) % 10) + s.slice(i + 1);
    } else if (k === len && len < NCOL) out = "1" + s;
    else return;
    const nn = nums.slice(); nn[r] = Number(out);
    setNums(nn); setCounted((c) => { const x = c.slice(); x[r] = 0; return x; });
    setWalker(-1); walkRef.current = -1; setCutAt(null); setSign(null); setGlow(null); setTouched(true);
    api.sfx.tick();
  };
  const newPair = () => {
    release();
    if (!canEdit) return;
    const [a, b] = freePair();
    setNums([a, b]); setCounted([0, 0]); setWalker(-1); walkRef.current = -1; setCutAt(null); setSign(null); setGlow(null);
    api.sfx.tick();
  };
  const switchMode = (m: string) => { release(); if (busy) return; reset(freeItem(m)); };

  /* ── the rail ── */
  const N = cfg.N || 0;
  const R = railOf(Math.max(N, 4));
  const cardsLive = cfg.scene === "cards" && !busy && ((stage === "ask" && cfg.kind === "order") || (free && cfg.kind === "freecards"));
  const swLive = cfg.scene === "cards" && cfg.swLive && playing && !busy;
  const placed = rail.filter((x: any) => x !== null && x !== undefined).length;
  const slotX = (s: number) => R.x + 8 + s * R.pitch;
  const cardX = (s: number) => slotX(s) + (R.pitch - 8 - R.cw) / 2;
  /* loose cards lie staggered above the groove; the first lies low, so its invite ring clears it */
  const looseAt = (ci: number) => { const pl = W.w / Math.max(N, 1); return { x: Math.round(ci * pl + (pl - R.cw) / 2), y: ci % 2 ? 26 : 104 }; };
  const slotAt = (p: any) => {
    if (!(p.y > RAIL.y - 30 && p.y < RAIL.y + RAIL.h + 40)) return null;
    const s = Math.floor((p.x - R.x - 8) / R.pitch);
    return s >= 0 && s < N ? s : null;
  };
  /* numbers grow along the arrow; the rail closes only when every neighbour pair agrees */
  const inOrder = (r: any[], d: string) => {
    if (r.some((x) => x === null || x === undefined)) return false;
    const seq = alongOf(d, r.length).map((s) => cfgRef.current.cards[r[s]]);
    return seq.every((x, i) => i === 0 || seq[i - 1] < x);
  };
  const closeSteps = (d: string) => {
    const S: any[] = alongOf(d, cfgRef.current.N).map((s) => [240, () => { setWave(s); api.sfx.tick(); }]);
    S.push([220, () => { setWave(-1); setClosed(true); }], [500, () => {}]);
    return S;
  };
  const freeClose = (r: any[], d: string) => { if (free && inOrder(r, d)) { api.sfx.correct(); tl.run(closeSteps(d)); } };
  const clearMarks = () => { setRings([]); setGhost(null); setPointer(null); setClosed(false); setSwitchLit(false); };

  /* a card settles where it is put: into a slot (the one there swaps back to where this came
     from), or back above the groove. Nothing is ever sprung back for breaking the order. */
  const put = (ci: number, slot: number | null) => {
    const r = railRef.current.slice();
    const from = r.indexOf(ci);
    if (slot === null) { if (from < 0) return; r[from] = null; }
    else { if (from === slot) return; const other = r[slot]; if (from >= 0) r[from] = other === undefined ? null : other; r[slot] = ci; }
    railRef.current = r; setRail(r);
    if (slot !== null) setFilled((f) => (f.includes(ci) ? f : [...f, ci]));
    clearMarks(); setTouched(true);
    api.sfx.tick();
    freeClose(r, dirRef.current);
  };
  /* a tap: a loose card goes to the first free slot; a card in the rail lifts back out */
  const tapCard = (ci: number) => {
    const r = railRef.current, s = r.indexOf(ci);
    if (s >= 0) return put(ci, null);
    const e = r.findIndex((x: any) => x === null || x === undefined);
    if (e >= 0) put(ci, e);
  };
  const flip = () => {
    release();
    if (!swLive) return;
    const d = dirRef.current === "smallest" ? "biggest" : "smallest";
    dirRef.current = d; setDir(d); clearMarks(); setTouched(true);
    api.sfx.tick();
    freeClose(railRef.current, d);
  };
  const newCards = () => { release(); if (!busy) reset(freeItem("cards")); };

  const drag = useDrag((payload: any, p: any, moved: boolean) => {
    if (!Number.isNaN(p.x)) release();
    if (payload.grip) {
      if (!moved) return step();
      if (!(p.x >= X0)) return;
      return walkToCol(Math.max(0, Math.min(L - 1, NCOL - 1 - Math.floor((p.x - X0) / CW))));
    }
    if (payload.card === undefined || !cardsLive) return;
    if (!moved) return tapCard(payload.card);
    const s = slotAt(p);
    if (s !== null) put(payload.card, s);
    else if (p.y < RAIL.y - 30) put(payload.card, null);
  });

  /* Enter on an order item commits the rail as it lies, with its setting */
  const enterFn: any = stage === "ask" && cfg.kind === "order" ? () => {
    if (tl.busy) return;
    const r = railRef.current;
    if (r.some((x: any) => x === null || x === undefined)) { api.say("Put every card in the rail first."); return; }
    api.submit(orderText(dirRef.current, r.map((ci: number) => cfgRef.current.cards[ci])));
  } : null;
  api.onEnter(enterFn);
  HOOK.enter = () => enterFn && enterFn();
  HOOK.setRail = (list: number[], d?: any) => {
    const cards = cfgRef.current.cards || [];
    if (!list || list.length !== cards.length) return false;
    const used: number[] = [];
    for (const x of list) { const ci = cards.findIndex((c: number, i: number) => c === x && !used.includes(i)); if (ci < 0) return false; used.push(ci); }
    railRef.current = used; setRail(used); setFilled(used.slice());
    if (d === "smallest" || d === "biggest") { dirRef.current = d; setDir(d); }
    clearMarks(); setTouched(true);
    return true;
  };

  /* ── win motions ── */
  useEffect(() => {
    if (stage !== "win") return;
    const c = cfgRef.current;
    if (c.kind === "order") { tl.run(closeSteps(dirRef.current)); return; }
    if (c.scene !== "chart") return;
    const S: any[] = [[60, () => { setCut3(false); setCover(false); setCompare(false); setRing(null); setLay(null); }]];
    if (c.walk) {
      /* the delight: the walker dims each matching pair, stops dead on the one that differs, every
         column to its right greys out together, and the sign writes itself between the rows */
      S.push(...walkSteps(walkRef.current, stopAt, 420, 650), [250, () => {}]);
    } else {
      if (counted[0] < lenOf(top)) S.push(...countSteps(0, 120));
      if (counted[1] < lenOf(bot)) S.push(...countSteps(1, 120));
      S.push([450, () => setGlow(top === bot ? null : top > bot ? 0 : 1)]);
    }
    tl.run([...S, ...answerSteps()]);
  }, [stage]);

  /* the whole right answer: the sign writes itself between the rows, then the pair is laid out on
     one line under the chart, left to right, the way the book writes it */
  const answerSteps = () => [[800, () => setSign(signOf(top, bot))], [600, () => setLine(true)]];

  /* ── the traceback: the mathematics redrawn in steps, ending on the whole right answer;
        nothing marked, and the child's answer stays in the slot ── */
  const countTrace = () => {
    const S: any[] = [[300, () => { setRing(null); setCompare(false); setGlow(null); setSign(null); setLine(false); if (wrong.tries >= 3) setCover(true); }]];
    S.push([500, () => setHatch(true)], [300, () => setCounted([0, 0])]);
    S.push(...countSteps(0, 340), [350, () => {}], ...countSteps(1, 520), [450, () => setCompare(true)], [700, () => {}], ...answerSteps());
    return S;
  };
  const walkTrace = () => {
    const w0 = walkRef.current, S: any[] = [[100, () => { setSign(null); setLine(false); }]];
    if (String(wrong.value) === "equal" && dec !== null && dec < L - 1) {
      /* stopped on a matching pair and called it equal: those two digits lie one over the other,
         then the walker carries on by itself to the pair that will not lie flat */
      const back = w0 > dec ? w0 : L - 1;
      S.push([400, () => { setCutAt(null); setWalker(back); walkRef.current = back; if (wrong.tries >= 3) setCut3(true); }]);
      S.push([500, () => setLay(back)], [1100, () => setLay(null)], [450, () => {}]);
      S.push(...walkSteps(back, stopAt, 560, 700));
    } else {
      /* read from the right: the walker runs from the left instead, one column at a time */
      S.push([300, () => { setCutAt(null); setWalker(-1); walkRef.current = -1; if (wrong.tries >= 3) setCut3(true); }], [700, () => {}]);
      S.push(...walkSteps(-1, stopAt, 600, 700));
    }
    S.push([300, () => {}], ...answerSteps());
    return S;
  };
  const cardTrace = () => {
    const c = cfgRef.current, NN = c.N, S: any[] = [];
    const p = parseOrder(wrong.value);
    let r = railRef.current.slice(), D = dirRef.current;
    /* the order as it was given, if the rail does not already hold it (the agent typed it) */
    if (p.list.length === NN) {
      const cur = r.map((ci: any) => (ci === null || ci === undefined ? null : c.cards[ci]));
      if (p.list.some((x, i) => x !== cur[i]) || (p.dir && p.dir !== D)) {
        const used: number[] = [];
        for (const x of p.list) { const ci = c.cards.findIndex((v: number, i: number) => v === x && !used.includes(i)); used.push(ci); }
        if (!used.includes(-1)) {
          r = used; if (p.dir) D = p.dir;
          const rr = r.slice(), DD = D;
          S.push([200, () => { railRef.current = rr; setRail(rr); setFilled(rr.slice()); dirRef.current = DD; setDir(DD); }]);
        }
      }
    }
    if (r.some((x: any) => x === null || x === undefined || x < 0)) return [[400, () => {}]];
    const list = r.map((ci: number) => c.cards[ci]);
    const want = parseOrder(item.answer).list;
    const reversed = list.length === want.length && list.every((x: number, i: number) => x === want[want.length - 1 - i]);
    const along = alongOf(D, NN);
    const lens = along.map((s) => lenOf(list[s]));
    const grouped = lens.every((x, i) => i === 0 || lens[i - 1] <= x);
    const ringAlong = () => [...along.map((s) => [440, () => setRings([r[s]])]), [300, () => setRings([])]];
    let cur = r.slice(), reading = false;
    S.push([300, () => clearMarks()]);
    if (D !== item.dir && reversed && n === 4) {
      /* the order the rail holds lifts into a second row above it; the pointer then reads it from
         its far end, card by card, as each card is laid below (the ending) */
      S.push([900, () => setGhost(r.slice())]);
      reading = true;
    } else if (D !== item.dir) {
      /* the setting says the other way: it lights, the arrow redraws, and the cards are read out
         along it in the order they lie */
      S.push([700, () => setSwitchLit(true)], [900, () => setArrowKey((k) => k + 1)], ...ringAlong());
    } else if (!grouped) {
      /* long and short mixed: each badge fills in the groove, then the cards part into a short
         group and a long group, the order inside each group untouched */
      r.forEach((ci: number) => S.push([340, () => { setFilled((f) => (f.includes(ci) ? f : [...f, ci])); setRings([ci]); api.sfx.tick(); }]));
      S.push([300, () => setRings([])]);
      const seq = along.map((s) => r[s]).sort((a: number, b: number) => lenOf(c.cards[a]) - lenOf(c.cards[b]));
      const out: number[] = Array(NN).fill(null);
      along.forEach((s, i) => { out[s] = seq[i]; });
      S.push([800, () => { railRef.current = out; setRail(out); api.sfx.tick(); }], [500, () => {}]);
      cur = out.slice();
    } else if (reversed && n === 4) {
      /* the setting was switched but no card moved: the arrow turns round and the cards stay
         exactly where they are, running against it; the card at each end is ringed */
      S.push([100, () => setArrowFrom(D === "smallest" ? "biggest" : "smallest")], [800, () => setArrowFrom(null)], [900, () => setRings([r[0], r[NN - 1]])]);
    } else if (reversed) {
      /* largest first, called smallest first: the arrow draws itself again from its low end, the
         setting stays lit, and the cards are read out along the arrow as they lie */
      S.push([100, () => { setArrowKey((k) => k + 1); setSwitchLit(true); }], [1000, () => {}], ...ringAlong(), [300, () => setSwitchLit(false)]);
    } else {
      /* along the arrow, pair by pair: it holds on the first pair that runs the wrong way */
      for (let i = 0; i < NN - 1; i++) {
        const a = r[along[i]], b = r[along[i + 1]], ok = c.cards[a] < c.cards[b];
        S.push([ok ? 480 : 700, () => setRings([a, b])]);
        if (!ok) break;
      }
    }
    /* the ending: the switch is set the way the question asks, then the cards are laid in the right
       order one slot at a time, each card swapping with the one standing in its place */
    const target = want.map((x: number) => c.cards.indexOf(x));
    if (D !== item.dir) S.push([800, () => { dirRef.current = item.dir; setDir(item.dir); setSwitchLit(true); api.sfx.tick(); }]);
    S.push([300, () => setFilled(c.cards.map((_: any, i: number) => i))]);
    for (let j = 0; j < NN; j++) {
      const i = cur.indexOf(target[j]);
      if (i !== j) { const t = cur[j]; cur[j] = cur[i]; cur[i] = t; }
      const snap = cur.slice(), cj = target[j], ss = reading ? NN - 1 - j : null;
      S.push([i !== j || reading ? 560 : 260, () => { railRef.current = snap; setRail(snap); setRings([cj]); if (ss !== null) setPointer(ss); api.sfx.tick(); }]);
    }
    S.push([400, () => { setRings([]); setPointer(null); setSwitchLit(false); }]);
    return S;
  };
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    setTouched(true);
    const c = cfgRef.current;
    tl.run(c.scene === "cards" ? cardTrace() : c.walk ? walkTrace() : countTrace(), () => api.lock(false));
  }, [wrong]);

  /* ── what the host and the agent read back (toolApi.getState) ── */
  api.share({
    upper: chart ? top : null, lower: chart ? bot : null,
    digitCounts: chart ? [counted[0] || null, counted[1] || null] : null,
    walkerAt: walks ? walker : null,
    decidedAt: walks && walker >= 0 && walker === stopAt && dec !== null ? dec : null,
    sign: chart ? sign || (SIGN_SYM[typed] ? typed : null) : null,
    cards: chart ? null : cfg.cards,
    railOrder: chart ? null : rail.map((ci: any) => (ci === null || ci === undefined ? null : cfg.cards[ci])),
    setting: chart ? null : dir,
  });

  /* ── drawing ── */
  const runs = chart ? { a: walks && walker >= 0 ? L - walker : 0, b: L, label: "compared" } : { a: placed, b: N, label: "placed" };
  const typedSign = chart && cfg.kind === "sign" && stage === "ask" && SIGN_SYM[typed] ? typed : null;
  const gripDrag = drag.drag && drag.drag.payload && drag.drag.payload.grip && drag.drag.moved ? drag.drag : null;
  const cardDrag = drag.drag && drag.drag.payload && drag.drag.payload.card !== undefined && drag.drag.moved ? drag.drag : null;

  const invite =
    stage !== "ask" || busy ? null
      : chart && !walks && counted[0] === 0 ? { x: BADGE.x + BADGE.w / 2, y: rowTop(0) + G.rowH / 2, r: 54 }
        : chart && !walks && counted[1] === 0 ? { x: BADGE.x + BADGE.w / 2, y: rowTop(1) + G.rowH / 2, r: 54 }
          : walks && walker === -1 ? { x: PARK + CW / 2, y: GRIP.y + GRIP.h / 2, r: 58 }
            : !chart && index === 0 && !touched ? (item.start === "rail" ? { x: SW.x + 42, y: SW.y + SW.h / 2, r: 44 }
              : { x: looseAt(0).x + R.cw / 2, y: looseAt(0).y + RAIL.cardH / 2, r: R.cw / 2 + 10 })
              : null;

  const chartView = () => (
    <g>
      {/* period bands behind both rows at once */}
      {PERIODS.map((P, pi) => {
        const x0 = colX(Math.max(...P.places)), x1 = colX(Math.min(...P.places)) + CW;
        return (
          <g key={"p" + pi}>
            <rect x={x0 + 2} y={0} width={x1 - x0 - 4} height={G.bottom} rx={16} fill={P.color} fillOpacity={0.1} />
            <text x={(x0 + x1) / 2} y={G.label} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={shade(P.color, 0.25)}>{tx(P.name)}</text>
          </g>
        );
      })}
      {PLACES.map((h, k) => (
        <g key={"h" + k}>
          <rect x={colX(k) + 4} y={G.headTop} width={CW - 8} height={G.headH} rx={12} fill={tint(C.panel, 0.25)} stroke={C.rule} strokeWidth={1.5} />
          <text x={colC(k)} y={G.headTop + 32} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(h)}</text>
        </g>
      ))}
      <text x={BADGE.x + BADGE.w / 2} y={G.headTop + 32} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("digits")}</text>

      {/* the cells: a shorter number leaves its high columns ruled and empty */}
      {[0, 1].map((r) => PLACES.map((_, k) => {
        const has = digitAt(nums[r], k) !== null, ruled = !has && digitAt(nums[1 - r], k) !== null;
        const x = colX(k) + 4, y = rowTop(r);
        return (
          <g key={"c" + r + k}>
            <rect x={x} y={y} width={CW - 8} height={G.rowH} rx={14} fill="#FFFFFF" fillOpacity={0.92}
              stroke={ruled ? GREY : C.rule} strokeWidth={ruled ? 2.5 : 1.5} strokeDasharray={ruled ? "8 7" : undefined} />
            {ruled && hatch && [0, 1, 2, 3].map((i) => (
              <line key={i} className="co-in" x1={x + 12 + i * 22} y1={y + 84} x2={x + 40 + i * 22} y2={y + 12} stroke={GREY} strokeWidth={3} strokeLinecap="round" />
            ))}
          </g>
        );
      }))}

      {glow !== null && (() => {
        const x0 = colX(lenOf(nums[glow]) - 1) + 2, x1 = colX(0) + CW - 2;
        return <rect className="co-in" x={x0} y={rowTop(glow) - 3} width={x1 - x0} height={G.rowH + 6} rx={18} fill={AMBER} fillOpacity={0.2} stroke={AMBER} strokeWidth={4} pointerEvents="none" />;
      })()}

      {/* the walker: an amber band over one column pair at a time */}
      {walks && (
        <g className="co-move" style={{ transform: `translate(${walker >= 0 ? colX(walker) : PARK}px, 0px)` } as any} pointerEvents="none">
          <rect x={3} y={G.rowA - 6} width={CW - 6} height={G.rowB + G.rowH - G.rowA + 12} rx={20} fill={AMBER}
            fillOpacity={walker >= 0 ? 0.3 : 0.1} stroke={AMBER} strokeWidth={walker >= 0 ? 5 : 3} strokeDasharray={walker >= 0 ? undefined : "10 8"} />
        </g>
      )}

      {/* the digits: period inks; passed pairs and everything right of the deciding pair grey */}
      {[0, 1].map((r) => PLACES.map((_, k) => {
        const d = digitAt(nums[r], k);
        if (d === null || (cut3 && k < L - 3)) return null;
        if (cover) return <rect key={"d" + r + k} x={colC(k) - 36} y={rowTop(r) + 18} width={72} height={60} rx={14} fill={tint(C.rule, 0.3)} stroke={C.rule} strokeWidth={1.5} />;
        const grey = d === 0 || (walks && walker >= 0 && k > walker) || (cutAt !== null && k < cutAt);
        return (
          <text key={"d" + r + k} className="co-digit" x={colC(k)} y={rowTop(r) + 68} textAnchor="middle" fontSize={T.xl} fontWeight={700}
            fill={grey ? GREY : inkOf(k)} pointerEvents="none"
            style={{ transform: lay === k && r === 1 ? `translateY(${G.rowA - G.rowB}px)` : "translateY(0px)" } as any}>{d}</text>
        );
      }))}
      {ring && <circle cx={colC(ring.k)} cy={rowTop(ring.r) + 48} r={40} fill="none" stroke={AMBER} strokeWidth={5} pointerEvents="none" />}

      {/* the sign box, level with the gap between the rows */}
      <rect x={SIGN.x} y={SIGN.y} width={SIGN.s} height={SIGN.s} rx={20} fill="#FFFFFF" stroke={sign ? C.accent : C.rule}
        strokeWidth={sign ? 3 : 2} strokeDasharray={sign || typedSign ? undefined : "8 8"} />
      {sign ? <SignGlyph key={"w" + sign} s={sign} x={SIGN.x + SIGN.s / 2} y={SIGN.y + SIGN.s / 2} size={60} color={C.ink} write />
        : typedSign ? <SignGlyph s={typedSign} x={SIGN.x + SIGN.s / 2} y={SIGN.y + SIGN.s / 2} size={60} color={C.ink} /> : null}

      {/* the digit count badges */}
      {[0, 1].map((r) => {
        const y = rowTop(r) + (G.rowH - BADGE.h) / 2, c = counted[r];
        return (
          <g key={"b" + r}>
            <rect x={BADGE.x} y={y} width={BADGE.w} height={BADGE.h} rx={16} fill="#FFFFFF" stroke={c ? C.accent : C.rule} strokeWidth={c ? 3 : 2} strokeDasharray={c ? undefined : "6 6"} />
            {c > 0 ? <text x={BADGE.x + BADGE.w / 2} y={y + 38} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{c}</text>
              : [0, 1, 2].map((i) => <circle key={i} cx={BADGE.x + BADGE.w / 2 + (i - 1) * 16} cy={y + BADGE.h / 2} r={4} fill={C.dim} />)}
          </g>
        );
      })}

      {/* the two counts, side by side under the chart (the traceback) */}
      {compare && [0, 1].map((r) => (
        <g key={"t" + r} className="co-in">
          <rect x={X0 + r * 270} y={320} width={240} height={112} rx={20} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
          <text x={X0 + 20 + r * 270} y={354} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(r ? "bottom" : "top")}</text>
          <text x={X0 + 20 + r * 270} y={412} fontSize={T.speech} fontWeight={700} fill={C.ink}>{lang === "hi" ? `${lenOf(nums[r])} अंक` : lang === "gu" ? `${lenOf(nums[r])} અંક` : `${lenOf(nums[r])} digits`}</text>
        </g>
      ))}

      {/* the pair on one line, left to right, the way the book writes it (a win, or a correction) */}
      {line && !free && (
        <g className="co-in">
          <rect x={LINE.x} y={LINE.y} width={LINE.w} height={LINE.h} rx={20} fill="#FFFFFF" stroke={C.accent} strokeWidth={2.5} />
          <text x={LINE.x + LINE.w / 2} y={LINE.y + LINE.h / 2 + T.speech * 0.36} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>
            {`${indian(top)} ${SIGN_SYM[signOf(top, bot)]} ${indian(bot)}`}
          </text>
        </g>
      )}

      {/* the walker's grip: tap to step one place, drag to walk it along */}
      {walks && (
        <g className={gripLive ? "co-grab c4-piece" : ""}
          {...(gripLive ? { ...control("walker", "Step the walker one place"), ...drag.bind({ grip: true }), ...drag.keys({ grip: true }) } : {})}>
          <g className="co-move" style={{ transform: `translate(${walker >= 0 ? colX(walker) : PARK}px, 0px)` } as any}>
            <rect x={6} y={GRIP.y} width={CW - 12} height={GRIP.h} rx={18} fill={gripLive ? "url(#gTen)" : tint(AMBER, 0.6)}
              stroke={gripDrag ? AMBER : shade(AMBER, 0.2)} strokeWidth={2} strokeDasharray={gripDrag ? "8 6" : undefined} fillOpacity={gripDrag ? 0.35 : 1} />
            {gripLive && <text x={CW / 2} y={GRIP.y + 48} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink} opacity={gripDrag ? 0 : 1}>{tx("step")}</text>}
          </g>
        </g>
      )}
      {walks && playing && (
        <Key id="walk" label={tx("Walk it")} x={PARK} y={KEYS_Y} w={240} h={80} C={C} disabled={!gripLive || busy} onClick={walkIt}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("Walk it")}</text>
        </Key>
      )}
      {free && (
        <g>
          <Key id="new-pair" label={tx("New numbers")} x={PARK + 260} y={KEYS_Y} w={240} h={80} C={C} disabled={busy} onClick={newPair}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("New pair")}</text>
          </Key>
          <Key id="to-cards" label={tx("Cards")} x={846} y={KEYS_Y} w={220} h={80} C={C} disabled={busy} onClick={() => switchMode("cards")}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("Cards")}</text>
          </Key>
        </g>
      )}

      {/* tap targets on top: the badges count, and in free play every cell can be changed */}
      {canCount && [0, 1].map((r) => (
        <Hit key={"hb" + r} id={"count-" + (r ? "bottom" : "top")} label={`Count the digits of the ${r ? "bottom" : "top"} number`}
          x={BADGE.x} y={rowTop(r) + 4} w={BADGE.w} h={G.rowH - 8} onPress={() => countRow(r)} />
      ))}
      {canEdit && [0, 1].map((r) => PLACES.map((_, k) => (k <= lenOf(nums[r]) && k < NCOL ? (
        <Hit key={"he" + r + k} id={`cell-${r}-${k}`} label={`${k < lenOf(nums[r]) ? "Change" : "Add"} the ${PLACE_NAMES[k]} digit of the ${r ? "bottom" : "top"} number`}
          x={colX(k) + 4} y={rowTop(r)} w={CW - 8} h={G.rowH} onPress={() => editDigit(r, k)} />
      ) : null)))}
    </g>
  );

  const cardsView = () => {
    const pointsLeft = (arrowFrom || dir) === "biggest";
    const [labL, labR] = dir === "biggest" ? ["biggest", "smallest"] : ["smallest", "biggest"];
    const ax0 = R.x + 160, ax1 = R.x + R.w - 160, ay = RAIL.arrowY;
    const knobX = dir === "smallest" ? SW.x + 42 : SW.x + SW.w - 42;
    const textX = dir === "smallest" ? SW.x + 84 + (SW.w - 96) / 2 : SW.x + 12 + (SW.w - 96) / 2;
    const cardFace = (v: number, ci: number, lifted: boolean) => {
      const len = lenOf(v), on = filled.includes(ci), ringed = rings.includes(ci);
      return (
        <g>
          <rect x={0} y={0} width={R.cw} height={RAIL.cardH} rx={16} fill={C.paper} stroke={ringed ? AMBER : C.rule} strokeWidth={ringed ? 6 : 2}
            filter={lifted ? "url(#fLift)" : "url(#fShadowSoft)"} />
          <text x={R.cw / 2} y={62} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{indian(v)}</text>
          {on && <circle cx={R.cw - 26} cy={0} r={20} fill="#FFFFFF" stroke={colorOf(len - 1)} strokeWidth={3} />}
          {on && <text x={R.cw - 26} y={10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={shade(colorOf(len - 1), 0.25)}>{len}</text>}
        </g>
      );
    };
    return (
      <g>
        {/* the groove and its slots */}
        <rect x={R.x} y={RAIL.y} width={R.w} height={RAIL.h} rx={24} fill="url(#gPanel)" stroke={closed ? shade(C.accent, 0.1) : C.rule} strokeWidth={closed ? 5 : 2} />
        {Array.from({ length: N }).map((_, s) => (
          <rect key={"s" + s} x={slotX(s)} y={RAIL.slotY} width={R.pitch - 8} height={RAIL.slotH} rx={18} fill="#FFFFFF" fillOpacity={0.55} stroke={C.rule} strokeWidth={1.5} strokeDasharray="8 7" />
        ))}
        {closed && [R.x + 4, R.x + R.w - 16].map((x, i) => <rect key={"e" + i} className="co-in" x={x} y={RAIL.y + 14} width={12} height={RAIL.h - 28} rx={6} fill={C.accent} />)}

        {/* the arrow of growth: it points from the smallest towards the biggest */}
        <text x={R.x + 12} y={RAIL.labelY} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(labL)}</text>
        <text x={R.x + R.w - 12} y={RAIL.labelY} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(labR)}</text>
        <g className="co-turn" style={{ transformBox: "fill-box", transformOrigin: "center", transform: `scaleX(${pointsLeft ? -1 : 1})` } as any}>
          <path key={"a" + arrowKey} className="co-write" pathLength={1} d={`M ${ax0} ${ay} H ${ax1 - 4}`} fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
          <path d={`M ${ax1 - 22} ${ay - 14} L ${ax1} ${ay} L ${ax1 - 22} ${ay + 14}`} fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* the order setting */}
        <Key id="order-switch" label={tx(swLive ? `Order: ${dir} first. Tap to switch` : `Order: ${dir} first`)} x={SW.x} y={SW.y} w={SW.w} h={SW.h} C={C} disabled={!swLive} onClick={flip}>
          <circle cx={knobX - (SW.x + SW.w / 2)} cy={0} r={24} fill={swLive ? "url(#gAccent)" : tint(C.accent, 0.5)} stroke={shade(C.accent, 0.2)} strokeWidth={2} />
          <text x={textX - (SW.x + SW.w / 2)} y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(`${dir} first`)}</text>
        </Key>
        {switchLit && <rect x={SW.x - 6} y={SW.y - 6} width={SW.w + 12} height={SW.h + 12} rx={24} fill="none" stroke={AMBER} strokeWidth={5} pointerEvents="none" />}
        {free && (
          <g>
            <Key id="new-cards" label={tx("New cards")} x={0} y={SW.y} w={220} h={SW.h} C={C} disabled={busy} onClick={newCards}>
              <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("New cards")}</text>
            </Key>
            <Key id="to-chart" label={tx("Chart")} x={240} y={SW.y} w={200} h={SW.h} C={C} disabled={busy} onClick={() => switchMode("chart")}>
              <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("Chart")}</text>
            </Key>
          </g>
        )}

        {/* the order the rail held, lifted above it and read from its far end */}
        {ghost && ghost.map((ci: number, s: number) => (
          <g key={"g" + s} className="co-in" pointerEvents="none">
            <rect x={cardX(s)} y={GHOST_Y} width={R.cw} height={RAIL.cardH} rx={16} fill="#FFFFFF" fillOpacity={0.8}
              stroke={pointer === s ? AMBER : C.rule} strokeWidth={pointer === s ? 5 : 2} strokeDasharray={pointer === s ? undefined : "8 6"} />
            <text x={cardX(s) + R.cw / 2} y={GHOST_Y + 62} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{indian(cfg.cards[ci])}</text>
          </g>
        ))}
        {ghost && pointer !== null && <path d={`M ${cardX(pointer) + R.cw / 2 - 16} ${GHOST_Y - 32} h 32 l -16 24 z`} fill={AMBER} pointerEvents="none" />}

        {/* the cards: each stays where it is while it is dragged (a dashed place), and a lifted copy
            follows the finger */}
        {cfg.cards.map((v: number, ci: number) => {
          const s = rail.indexOf(ci);
          const at = s >= 0 ? { x: cardX(s), y: RAIL.cardY - (wave === s ? 14 : 0) } : looseAt(ci);
          const held = cardDrag && cardDrag.payload.card === ci;
          return (
            <g key={"k" + ci} className={"co-move" + (cardsLive ? " co-grab c4-piece" : "")} style={{ transform: `translate(${at.x}px, ${at.y}px)` } as any}
              {...(cardsLive ? { ...control("card-" + ci, `Card ${indian(v)}`), ...drag.bind({ card: ci }), ...drag.keys({ card: ci }) } : {})}>
              {/* the same elements while held (only faded), so the pointer capture is never lost */}
              <g opacity={held ? 0.3 : 1}>{cardFace(v, ci, false)}</g>
            </g>
          );
        })}
        {cardDrag && (
          <g pointerEvents="none" transform={`translate(${Math.max(0, Math.min(W.w - R.cw, cardDrag.x - R.cw / 2))},${Math.max(22, Math.min(W.h - RAIL.cardH, cardDrag.y - RAIL.cardH / 2))})`}>
            {cardFace(cfg.cards[cardDrag.payload.card], cardDrag.payload.card, true)}
          </g>
        )}
      </g>
    );
  };

  return (
    <g>
      <style>{CO_CSS}</style>

      {/* running count, in the runs zone (64,108): places compared, or cards laid in the rail */}
      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        <text x={20} y={-56 + T.speech * 0.36} fontSize={T.speech} fontWeight={700} fill={C.ink}>{`${runs.a} / ${runs.b}`}</text>
        <text x={312} y={-56 + T.micro * 0.36} textAnchor="end" fontSize={T.micro} fontWeight={500} fill={C.ink}>{tx(runs.label)}</text>
      </g>

      {chart ? chartView() : cardsView()}

      {/* the grip under the finger while it is dragged */}
      {gripDrag && (
        <g pointerEvents="none" transform={`translate(${Math.max(PARK, Math.min(colX(0), gripDrag.x - CW / 2))},0)`}>
          <rect x={6} y={GRIP.y} width={CW - 12} height={GRIP.h} rx={18} fill="url(#gTen)" stroke={shade(AMBER, 0.2)} strokeWidth={2} filter="url(#fLift)" />
          <text x={CW / 2} y={GRIP.y + 48} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("step")}</text>
        </g>
      )}

      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   the two numbers ones under ones with their sign, or the rail's order as a staircase */
function Thumb({ result, C, w, h }: any) {
  const L = (result && result.last) || {};
  const sh = L.shared || {};
  if (typeof sh.upper === "number" && typeof sh.lower === "number" && sh.upper > 0) {
    const a = sh.upper, b = sh.lower, s = signOf(a, b), k = lenOf(a) === lenOf(b) ? deciderOf(a, b) : null;
    const deep = shade(AMBER, 0.45);
    const row = (v: number, y: number) => {
      const txt = indian(v);
      let place = txt.replace(/,/g, "").length - 1;
      return (
        <text x={w - 18} y={y} textAnchor="end" fontSize={T.micro} fontWeight={700}>
          {txt.split("").map((ch, i) => {
            if (ch === ",") return <tspan key={i} fill={C.ink}>{ch}</tspan>;
            const pl = place--;
            return <tspan key={i} fill={k === null ? C.ink : pl === k ? deep : pl < k ? GREY : C.ink}>{ch}</tspan>;
          })}
        </text>
      );
    };
    return (
      <g>
        <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
        <rect x={14} y={h / 2 - 24} width={48} height={48} rx={12} fill="#FFFFFF" stroke={C.rule} strokeWidth={1.5} />
        <SignGlyph s={s} x={38} y={h / 2} size={28} color={C.ink} />
        {row(a, h / 2 - 8)}
        {row(b, h / 2 + 28)}
      </g>
    );
  }
  const p = parseOrder(L.value);
  if (!p.list.length) return null;
  const NN = p.list.length, sorted = p.list.slice().sort((x, y) => x - y);
  const gap = 8, bw = (w - 28 - gap * (NN - 1)) / NN, top = 10, room = h - 20;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {p.list.map((v, i) => {
        const bh = room * (0.3 + (0.7 * sorted.indexOf(v)) / Math.max(1, NN - 1));
        return <rect key={i} x={14 + i * (bw + gap)} y={top + room - bh} width={bw} height={bh} rx={6} fill="url(#gBead)" stroke={shade(CONTENT.bead, 0.25)} strokeWidth={1.5} />;
      })}
    </g>
  );
}

function CompareAndOrder(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null }} />
  );
}

export default CompareAndOrder;
