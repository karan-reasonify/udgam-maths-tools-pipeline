/* ═══ M1.S1.T2.C5.2D1 · measure_it · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, the sound effects, the printed bubble, scoring, the
   events, idle and restart. THE LESSON IS SILENT (runtime r30): nothing is spoken; every line is
   printed on the bubble, which is the guide. The lesson is action-driven: nothing moves on unless the
   child acts. THE NEW LOOK (keyOnly, navDots): the question lives only in the bubble, one sentence a screen.
   NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md and docs/PATTERNS.md.

   The OWNER'S DESCRIPTION (2026-10-28, work/<chapter>/NOTES.md) sets the four phases, not the plan brief:
   1 choose the unit (cm, m or km) for a familiar thing, 2 drag a ruler to measure from 0 and type the length,
   3 a metre rod marked in 100 cm, cut in halves and quarters, 4 measuring challenges with new things.
   Every thing is a photo skin (images.json); the ruler's scale, the rod's marks, every digit and label are code. */

const TOOL_ID = "measure_it";
const MEDIA_ID = "M1.S1.T2.C5.2D1";
const TOOL_NAME = "Measure It";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed before phase 1's teach lines only (phase 1 has guide steps, so it is not shown) */
const OPENING = ["Let us measure real things with the right unit."];
/* the whole-tool line (no longer shown from r44; kept for the sidecar) */
const FINISH_LINE = "You chose the unit and measured from 0 every time.";
/* printed when the child opens Free play: free play is the ruler bench with a New thing key */
const FREE_LINE = "Free play: drag the ruler to measure each thing from 0.";

/* THE START PAGE: one question to wonder at, and the things the lesson is about */
const START_HOOK = "How would you measure a pencil, a door or a road?";

/* Hindi and Gujarati (docs/PATTERNS.md §11): filled at the language pass, once the English is final. */
/* Terms (one per idea): सेंटीमीटर/સેન્ટીમીટર, मीटर/મીટર, किलोमीटर/કિલોમીટર; the unit symbols as the Hindi and Gujarati books write
   them: सेमी, मी, किमी / સેમી, મી, કિમી; ruler पटरी/પટ્ટી; rod छड़/સળિયો; half आधा/અડધો; quarter चौथाई/ચોથો ભાગ; unit इकाई/એકમ */
const TR: any = {
  hi: {
    "Measure It": "इसे नापो",
    "Free play: drag the ruler to measure each thing from 0.": "मुक्त खेल: पटरी खींचकर हर चीज़ को 0 से नापो।",
    "How would you measure a pencil, a door or a road?": "तुम पेंसिल, दरवाज़ा या सड़क को कैसे नापोगे?",
    "Choosing cm, m or km": "सेमी, मी या किमी चुनना",
    "Tap the cm card: a centimetre is about as wide as your finger.": "सेमी कार्ड को छुओ: एक सेंटीमीटर लगभग तुम्हारी उँगली जितना चौड़ा होता है।",
    "Look for the card on the left.": "बाईं ओर वाला कार्ड देखो।",
    "Tap the m card: a metre is about one big step.": "मी कार्ड को छुओ: एक मीटर लगभग एक बड़े कदम जितना होता है।",
    "The card you need is in the middle.": "तुम्हें जो कार्ड चाहिए वह बीच में है।",
    "Tap the km card: a kilometre is about a 15 minute walk.": "किमी कार्ड छुओ: एक किलोमीटर लगभग 15 मिनट की पैदल दूरी है।",
    "Try the last card, on the right.": "दाईं ओर वाला आख़िरी कार्ड आज़माओ।",
    "Compare it with your hand, your classroom and the road to school.": "इसे अपने हाथ, अपनी कक्षा और स्कूल की सड़क से मिलाकर देखो।",
    "Picture walking along it: does it take a moment or a long time?": "सोचो कि तुम उस पर चल रहे हो: कुछ पल लगेंगे या बहुत देर?",
    "Short things take cm, longer things take m, and far places take km.": "छोटी चीज़ों के लिए सेमी, लंबी चीज़ों के लिए मी और दूर की जगहों के लिए किमी।",
    "You learned: cm, m and km; 1 m = 100 cm and 1 km = 1,000 m": "तुमने सीखा: सेमी, मी और किमी; 1 मी = 100 सेमी और 1 किमी = 1,000 मी",
    "Drag the card with the best unit for the road from one town to the next.": "एक शहर से दूसरे शहर की सड़क के लिए सबसे सही इकाई वाला कार्ड खींचो।",
    "Unit for a road?": "सड़क के लिए इकाई?",
    "Is this road longer than your classroom?": "क्या यह सड़क तुम्हारी कक्षा से लंबी है?",
    "Could you walk from one town to the next in a few steps?": "क्या तुम एक शहर से दूसरे शहर तक कुछ ही कदमों में पहुँच सकते हो?",
    "Is the road longer than a hundred doors put end to end?": "क्या सड़क एक कतार में रखे सौ दरवाज़ों से भी लंबी है?",
    "Now drag the card that fits a pencil.": "अब पेंसिल के लिए सही कार्ड खींचो।",
    "Unit for a pencil?": "पेंसिल के लिए इकाई?",
    "Is a pencil longer or shorter than your hand?": "क्या पेंसिल तुम्हारे हाथ से लंबी है या छोटी?",
    "Can you hold a whole pencil in one hand?": "क्या तुम पूरी पेंसिल एक हाथ में पकड़ सकते हो?",
    "Would you need even one big step to pass a pencil?": "क्या पेंसिल को पार करने के लिए एक बड़ा कदम भी चाहिए?",
    "Which card fits the height of a classroom door?": "कक्षा के दरवाज़े की ऊँचाई के लिए कौन-सा कार्ड सही है?",
    "Unit for a door?": "दरवाज़े के लिए इकाई?",
    "Is a door taller than you are?": "क्या दरवाज़ा तुमसे ऊँचा है?",
    "Is a door much taller than a pencil?": "क्या दरवाज़ा पेंसिल से बहुत ऊँचा है?",
    "Is a door as long as the road between two towns?": "क्या दरवाज़ा दो शहरों के बीच की सड़क जितना लंबा है?",
    "Measuring with a ruler from 0": "0 से शुरू करके पटरी से नापना",
    "Drag the ruler up so its 0 is at the left end of the eraser.": "पटरी को ऊपर खींचो ताकि उसका 0 रबड़ के बाएँ सिरे पर आए।",
    "Line up the ruler's 0 with the eraser's left end.": "पटरी के 0 को रबड़ के बाएँ सिरे से मिलाओ।",
    "Now tap the right end of the eraser to read its length.": "अब लंबाई पढ़ने के लिए रबड़ के दाएँ सिरे को छुओ।",
    "Tap just above where the eraser ends.": "रबड़ जहाँ खत्म होती है, उसके ठीक ऊपर छुओ।",
    "Touch each space between two marks and count them.": "दो निशानों के बीच की हर जगह को छुओ और गिनो।",
    "Look straight down from the far end to the ruler's number.": "दूर वाले सिरे से सीधे नीचे पटरी की संख्या देखो।",
    "Put 0 at one end and read the number at the other end.": "0 को एक सिरे पर रखो और दूसरे सिरे की संख्या पढ़ो।",
    "You learned: put 0 at one end, read the number at the other end": "तुमने सीखा: 0 को एक सिरे पर रखो, दूसरे सिरे की संख्या पढ़ो",
    "Measure the ribbon with the ruler, then type its length.": "पटरी से रिबन नापो, फिर उसकी लंबाई लिखो।",
    "Ribbon length?": "रिबन की लंबाई?",
    "Start your count at the 0 mark, not at 1.": "गिनती 1 से नहीं, 0 के निशान से शुरू करो।",
    "length": "लंबाई",
    "cm": "सेमी",
    "m": "मी",
    "km": "किमी",
    "Now measure the pencil the same way.": "अब पेंसिल को भी इसी तरह नापो।",
    "Pencil length?": "पेंसिल की लंबाई?",
    "Read the number just under the pencil's sharp tip.": "पेंसिल की नुकीली नोक के ठीक नीचे की संख्या पढ़ो।",
    "Measure this longer ribbon from 0 as well.": "इस लंबे रिबन को भी 0 से नापो।",
    "Find the mark where this ribbon stops.": "वह निशान ढूँढ़ो जहाँ यह रिबन खत्म होता है।",
    "The metre rod: halves and quarters": "मीटर छड़: आधे और चौथाई",
    "Tap Mark to mark the metre rod in centimetres.": "छड़ पर सेंटीमीटर अंकित करने के लिए निशान बटन छुओ।",
    "The Mark key is under the rod.": "निशान बटन छड़ के नीचे है।",
    "Tap Tens to cut the rod into 10 equal parts.": "छड़ को 10 बराबर भागों में काटने के लिए दस भाग को छुओ।",
    "Find the key that says Tens.": "जिस बटन पर दस भाग लिखा है, उसे ढूँढ़ो।",
    "Tap the part that starts at 0 to colour it.": "0 से शुरू होने वाले भाग को रंगने के लिए छुओ।",
    "Tap the first part, at the left end.": "बाएँ सिरे का पहला भाग छुओ।",
    "The whole rod is 100 cm: split it into equal parts.": "पूरी छड़ 100 सेमी की है: इसे बराबर भागों में बाँटो।",
    "How many cm is one of the equal parts?": "एक बराबर भाग कितने सेमी का है?",
    "Put the 2 coloured quarters together: what part of the rod is that?": "2 रंगे हुए चौथाई भाग मिलाओ: यह छड़ का कौन-सा भाग है?",
    "So a metre rod shares into 2 halves of 50 cm or 4 quarters of 25 cm.": "मीटर छड़ में 50 सेमी के 2 आधे या 25 सेमी के 4 चौथाई भाग।",
    "You learned: half a metre is 50 cm and a quarter of a metre is 25 cm": "तुमने सीखा: आधा मीटर 50 सेमी और चौथाई मीटर 25 सेमी होता है",
    "Tap Halves, colour one half, then type how many cm half a metre is.": "आधे को छुओ, एक आधा भाग रंगो, फिर लिखो कि आधा मीटर कितने सेमी का है।",
    "Half a metre?": "आधा मीटर?",
    "Half a metre is 1 of 2 equal parts of the rod.": "आधा मीटर, छड़ के 2 बराबर भागों में से 1 भाग है।",
    "Now tap Quarters and colour one quarter: how many cm is it?": "अब चौथाई छुओ और एक भाग रंगो: वह कितने सेमी है?",
    "A quarter of a metre?": "चौथाई मीटर?",
    "A quarter is half of a half, so it ends before the half.": "चौथाई, आधे का आधा होता है, इसलिए वह आधे से पहले खत्म होता है।",
    "Colour 2 quarters of the rod: how many cm do they make together?": "छड़ के 2 चौथाई भाग रंगो: वे मिलकर कितने सेमी होते हैं?",
    "2 quarters?": "2 चौथाई?",
    "Look at where the key starts on the ruler.": "देखो, चाबी पटरी पर कहाँ से शुरू होती है।",
    "A length is counted from the 0 mark, not from 3.": "लंबाई 0 के निशान से गिनी जाती है, 3 से नहीं।",
    "Which number is under the crayon's left end?": "क्रेयॉन के बाएँ सिरे के नीचे कौन-सी संख्या है?",
    "Measuring starts at 0, so this ruler is in the wrong place.": "नापना 0 से शुरू होता है, इसलिए यह पटरी गलत जगह है।",
    "Drag it, or use the arrow keys.": "इसे खींचो, या तीर वाले बटन दबाओ।",
    "Cut the rod, then colour the parts.": "छड़ को काटो, फिर भाग रंगो।",
    "Measuring new things": "नई चीज़ें नापना",
    "Now measure new things on your own.": "अब नई चीज़ें खुद नापो।",
    "Count each centimetre space from one end of it to the other.": "एक सिरे से दूसरे सिरे तक हर सेंटीमीटर की जगह गिनो।",
    "Say each number as you pass it, starting from 0.": "0 से शुरू करके हर संख्या बोलते जाओ।",
    "You measured every new thing from 0, well done.": "तुमने हर नई चीज़ 0 से नापी, शाबाश।",
    "You learned: start at 0 every time, whatever you measure": "तुमने सीखा: कुछ भी नापो, हर बार 0 से शुरू करो",
    "Measure the comb with the ruler and type its length.": "पटरी से कंघी नापो और उसकी लंबाई लिखो।",
    "Comb length?": "कंघी की लंबाई?",
    "Read the number under the comb's far end.": "कंघी के दूर वाले सिरे के नीचे की संख्या पढ़ो।",
    "Find the key's length.": "चाबी की लंबाई ढूँढ़ो।",
    "Key length?": "चाबी की लंबाई?",
    "Slide the key so its round end sits on the 0 mark.": "चाबी सरकाओ ताकि उसका गोल सिरा 0 पर आए।",
    "How long is the crayon?": "क्रेयॉन कितना लंबा है?",
    "Crayon length?": "क्रेयॉन की लंबाई?",
    "This ruler starts at 1 under the crayon, so move the ruler to 0.": "क्रेयॉन के नीचे यह पटरी 1 से शुरू होती है, इसलिए पटरी को 0 पर ले जाओ।",
    /* printed at run time (win lines, nudges) and drawn by Work through tx */
    "Correct, a road between towns is measured in kilometres.": "सही, शहरों के बीच की सड़क किलोमीटर में नापी जाती है।",
    "Correct, a pencil can be measured in centimetres.": "सही, पेंसिल सेंटीमीटर में नापी जा सकती है।",
    "Correct, a door can be measured in metres.": "सही, दरवाज़ा मीटर में नापा जा सकता है।",
    "Correct, the ribbon is 9 cm long.": "सही, रिबन 9 सेमी लंबा है।",
    "Correct, the pencil is 12 cm long.": "सही, पेंसिल 12 सेमी लंबी है।",
    "Correct, this ribbon is 14 cm long.": "सही, यह रिबन 14 सेमी लंबा है।",
    "Correct, half a metre is 50 cm.": "सही, आधा मीटर 50 सेमी है।",
    "Correct, a quarter of a metre is 25 cm.": "सही, चौथाई मीटर 25 सेमी है।",
    "Correct, 2 quarters are 50 cm long.": "सही, 2 चौथाई मिलकर 50 सेमी हैं।",
    "Correct, the comb is 13 cm long.": "सही, कंघी 13 सेमी लंबी है।",
    "Correct, the key is 6 cm long.": "सही, चाबी 6 सेमी लंबी है।",
    "Correct, the crayon is 8 cm long.": "सही, क्रेयॉन 8 सेमी लंबा है।",
    "Start measuring from zero.": "शून्य से नापना शुरू करो।",
    "Put a unit card on the tag first.": "पहले टैग पर इकाई वाला कार्ड रखो।",
    "finger width": "उँगली की चौड़ाई",
    "a big step": "एक बड़ा कदम",
    "15 minute walk": "15 मिनट पैदल",
    "Mark": "निशान", "Tens": "दस भाग", "Halves": "आधे", "Quarters": "चौथाई",
    "Answer": "उत्तर", "unit": "इकाई", "part": "भाग", "ruler": "पटरी", "eraser end": "रबड़ का सिरा", "New thing": "नई चीज़",
    "1 m": "1 मी", "100 cm": "100 सेमी",
    "pencil": "पेंसिल", "ribbon": "रिबन", "eraser": "रबड़", "key": "चाबी", "comb": "कंघी", "crayon": "क्रेयॉन",
  },
  gu: {
    "Measure It": "તેને માપો",
    "Free play: drag the ruler to measure each thing from 0.": "મુક્ત રમત: દરેક વસ્તુને 0 થી માપવા પટ્ટીને ખેંચો.",
    "How would you measure a pencil, a door or a road?": "તમે પેન્સિલ, દરવાજો કે રસ્તો કેવી રીતે માપશો?",
    "Choosing cm, m or km": "સેમી, મી કે કિમી પસંદ કરવા",
    "Tap the cm card: a centimetre is about as wide as your finger.": "સેમી કાર્ડને સ્પર્શ કરો: એક સેન્ટીમીટર લગભગ તમારી આંગળી જેટલો પહોળો હોય છે.",
    "Look for the card on the left.": "ડાબી બાજુનું કાર્ડ શોધો.",
    "Tap the m card: a metre is about one big step.": "મી કાર્ડને સ્પર્શ કરો: એક મીટર લગભગ એક મોટા ડગલા જેટલો હોય છે.",
    "The card you need is in the middle.": "તમારે જોઈતું કાર્ડ વચ્ચે છે.",
    "Tap the km card: a kilometre is about a 15 minute walk.": "કિમી કાર્ડને સ્પર્શ કરો: એક કિલોમીટર લગભગ 15 મિનિટ ચાલવા જેટલો હોય છે.",
    "Try the last card, on the right.": "જમણી બાજુનું છેલ્લું કાર્ડ અજમાવો.",
    "Compare it with your hand, your classroom and the road to school.": "તેને તમારા હાથ, તમારા વર્ગ અને શાળાના રસ્તા સાથે સરખાવો.",
    "Picture walking along it: does it take a moment or a long time?": "કલ્પના કરો કે તમે તેના પર ચાલો છો: થોડી ક્ષણ લાગશે કે ઘણો સમય?",
    "Short things take cm, longer things take m, and far places take km.": "ટૂંકી વસ્તુ માટે સેમી, લાંબી વસ્તુ માટે મી અને દૂરની જગ્યા માટે કિમી.",
    "You learned: cm, m and km; 1 m = 100 cm and 1 km = 1,000 m": "તમે શીખ્યા: સેમી, મી અને કિમી; 1 મી = 100 સેમી અને 1 કિમી = 1,000 મી",
    "Drag the card with the best unit for the road from one town to the next.": "એક શહેરથી બીજા શહેર સુધીના રસ્તા માટે સૌથી યોગ્ય એકમવાળું કાર્ડ ખેંચો.",
    "Unit for a road?": "રસ્તા માટે એકમ?",
    "Is this road longer than your classroom?": "શું આ રસ્તો તમારા વર્ગ કરતાં લાંબો છે?",
    "Could you walk from one town to the next in a few steps?": "શું તમે એક શહેરથી બીજા શહેર સુધી થોડા ડગલામાં પહોંચી શકો?",
    "Is the road longer than a hundred doors put end to end?": "શું રસ્તો એક લાઇનમાં મૂકેલા સો દરવાજા કરતાં પણ લાંબો છે?",
    "Now drag the card that fits a pencil.": "હવે પેન્સિલ માટે યોગ્ય કાર્ડ ખેંચો.",
    "Unit for a pencil?": "પેન્સિલ માટે એકમ?",
    "Is a pencil longer or shorter than your hand?": "શું પેન્સિલ તમારા હાથ કરતાં લાંબી છે કે ટૂંકી?",
    "Can you hold a whole pencil in one hand?": "શું તમે આખી પેન્સિલ એક હાથમાં પકડી શકો?",
    "Would you need even one big step to pass a pencil?": "શું પેન્સિલ પાર કરવા માટે એક મોટું ડગલું પણ જોઈએ?",
    "Which card fits the height of a classroom door?": "વર્ગના દરવાજાની ઊંચાઈ માટે કયું કાર્ડ યોગ્ય છે?",
    "Unit for a door?": "દરવાજા માટે એકમ?",
    "Is a door taller than you are?": "શું દરવાજો તમારા કરતાં ઊંચો છે?",
    "Is a door much taller than a pencil?": "શું દરવાજો પેન્સિલ કરતાં ઘણો ઊંચો છે?",
    "Is a door as long as the road between two towns?": "શું દરવાજો બે શહેર વચ્ચેના રસ્તા જેટલો લાંબો છે?",
    "Measuring with a ruler from 0": "0 થી શરૂ કરીને પટ્ટીથી માપવું",
    "Drag the ruler up so its 0 is at the left end of the eraser.": "પટ્ટીને ઉપર ખેંચો, જેથી તેનો 0 રબરના ડાબા છેડે આવે.",
    "Line up the ruler's 0 with the eraser's left end.": "પટ્ટીના 0 ને રબરના ડાબા છેડા સાથે મેળવો.",
    "Now tap the right end of the eraser to read its length.": "હવે લંબાઈ વાંચવા રબરના જમણા છેડાને સ્પર્શ કરો.",
    "Tap just above where the eraser ends.": "રબર જ્યાં પૂરું થાય છે તેની બરાબર ઉપર સ્પર્શ કરો.",
    "Touch each space between two marks and count them.": "બે નિશાન વચ્ચેની દરેક જગ્યાને સ્પર્શ કરો અને ગણો.",
    "Look straight down from the far end to the ruler's number.": "દૂરના છેડેથી સીધા નીચે પટ્ટીનો આંકડો જુઓ.",
    "Put 0 at one end and read the number at the other end.": "0 ને એક છેડે મૂકો અને બીજા છેડાનો આંકડો વાંચો.",
    "You learned: put 0 at one end, read the number at the other end": "તમે શીખ્યા: 0 ને એક છેડે મૂકો, બીજા છેડાનો આંકડો વાંચો",
    "Measure the ribbon with the ruler, then type its length.": "પટ્ટીથી રિબન માપો, પછી તેની લંબાઈ લખો.",
    "Ribbon length?": "રિબનની લંબાઈ?",
    "Start your count at the 0 mark, not at 1.": "ગણતરી 1 થી નહીં, 0 ના નિશાનથી શરૂ કરો.",
    "length": "લંબાઈ",
    "cm": "સેમી",
    "m": "મી",
    "km": "કિમી",
    "Now measure the pencil the same way.": "હવે પેન્સિલને પણ આ જ રીતે માપો.",
    "Pencil length?": "પેન્સિલની લંબાઈ?",
    "Read the number just under the pencil's sharp tip.": "પેન્સિલની અણીદાર ટોચની બરાબર નીચેનો આંકડો વાંચો.",
    "Measure this longer ribbon from 0 as well.": "આ લાંબા રિબનને પણ 0 થી માપો.",
    "Find the mark where this ribbon stops.": "જ્યાં આ રિબન પૂરું થાય છે તે નિશાન શોધો.",
    "The metre rod: halves and quarters": "મીટરનો સળિયો: અડધા અને ચોથા ભાગ",
    "Tap Mark to mark the metre rod in centimetres.": "સળિયા પર સેન્ટીમીટર આંકવા નિશાન બટનને સ્પર્શ કરો.",
    "The Mark key is under the rod.": "નિશાન બટન સળિયાની નીચે છે.",
    "Tap Tens to cut the rod into 10 equal parts.": "સળિયાના 10 સરખા ભાગ કરવા દસ ભાગને સ્પર્શ કરો.",
    "Find the key that says Tens.": "જેના પર દસ ભાગ લખેલું છે તે બટન શોધો.",
    "Tap the part that starts at 0 to colour it.": "0 થી શરૂ થતા ભાગને રંગવા માટે સ્પર્શ કરો.",
    "Tap the first part, at the left end.": "ડાબા છેડાનો પહેલો ભાગ સ્પર્શ કરો.",
    "The whole rod is 100 cm: split it into equal parts.": "આખો સળિયો 100 સેમી નો છે: તેના સરખા ભાગ કરો.",
    "How many cm is one of the equal parts?": "એક સરખો ભાગ કેટલા સેમી નો છે?",
    "Put the 2 coloured quarters together: what part of the rod is that?": "2 રંગેલા ચોથા ભાગ ભેગા કરો: તે સળિયાનો કયો ભાગ છે?",
    "So a metre rod shares into 2 halves of 50 cm or 4 quarters of 25 cm.": "તેથી મીટરના સળિયાના 50 સેમી ના 2 અડધા ભાગ અથવા 25 સેમી ના 4 ચોથા ભાગ થાય છે.",
    "You learned: half a metre is 50 cm and a quarter of a metre is 25 cm": "તમે શીખ્યા: અડધો મીટર 50 સેમી અને મીટરનો ચોથો ભાગ 25 સેમી",
    "Tap Halves, colour one half, then type how many cm half a metre is.": "અડધાને સ્પર્શ કરો, એક અડધો ભાગ રંગો, પછી લખો કે અડધો મીટર કેટલા સેમી છે.",
    "Half a metre?": "અડધો મીટર?",
    "Half a metre is 1 of 2 equal parts of the rod.": "અડધો મીટર એટલે સળિયાના 2 સરખા ભાગમાંથી 1 ભાગ.",
    "Now tap Quarters and colour one quarter: how many cm is it?": "હવે ચોથા ભાગને સ્પર્શ કરો અને એક ચોથો ભાગ રંગો: તે કેટલા સેમી છે?",
    "A quarter of a metre?": "મીટરનો ચોથો ભાગ?",
    "A quarter is half of a half, so it ends before the half.": "ચોથો ભાગ અડધાનો અડધો હોય છે, તેથી તે અડધા પહેલાં પૂરો થાય છે.",
    "Colour 2 quarters of the rod: how many cm do they make together?": "સળિયાના 2 ચોથા ભાગ રંગો: તે બંને મળીને કેટલા સેમી થાય?",
    "2 quarters?": "2 ચોથા ભાગ?",
    "Look at where the key starts on the ruler.": "જુઓ, ચાવી પટ્ટી પર ક્યાંથી શરૂ થાય છે.",
    "A length is counted from the 0 mark, not from 3.": "લંબાઈ 0 ના નિશાનથી ગણાય છે, 3 થી નહીં.",
    "Which number is under the crayon's left end?": "ક્રેયોનના ડાબા છેડા નીચે કયો આંકડો છે?",
    "Measuring starts at 0, so this ruler is in the wrong place.": "માપવાનું 0 થી શરૂ થાય છે, તેથી આ પટ્ટી ખોટી જગ્યાએ છે.",
    "Drag it, or use the arrow keys.": "તેને ખેંચો, અથવા તીરનાં બટન દબાવો.",
    "Cut the rod, then colour the parts.": "સળિયો કાપો, પછી ભાગ રંગો.",
    "Measuring new things": "નવી વસ્તુઓ માપવી",
    "Now measure new things on your own.": "હવે નવી વસ્તુઓ જાતે માપો.",
    "Count each centimetre space from one end of it to the other.": "એક છેડેથી બીજા છેડા સુધી દરેક સેન્ટીમીટરની જગ્યા ગણો.",
    "Say each number as you pass it, starting from 0.": "0 થી શરૂ કરીને દરેક આંકડો બોલતા જાઓ.",
    "You measured every new thing from 0, well done.": "તમે દરેક નવી વસ્તુ 0 થી માપી, શાબાશ.",
    "You learned: start at 0 every time, whatever you measure": "તમે શીખ્યા: ગમે તે માપો, દર વખતે 0 થી શરૂ કરો",
    "Measure the comb with the ruler and type its length.": "પટ્ટીથી કાંસકો માપો અને તેની લંબાઈ લખો.",
    "Comb length?": "કાંસકાની લંબાઈ?",
    "Read the number under the comb's far end.": "કાંસકાના દૂરના છેડા નીચેનો આંકડો વાંચો.",
    "Find the key's length.": "ચાવીની લંબાઈ શોધો.",
    "Key length?": "ચાવીની લંબાઈ?",
    "Slide the key so its round end sits on the 0 mark.": "ચાવીને સરકાવો, જેથી તેનો ગોળ છેડો 0 ના નિશાન પર આવે.",
    "How long is the crayon?": "ક્રેયોન કેટલું લાંબું છે?",
    "Crayon length?": "ક્રેયોનની લંબાઈ?",
    "This ruler starts at 1 under the crayon, so move the ruler to 0.": "ક્રેયોન નીચે આ પટ્ટી 1 થી શરૂ થાય છે, તેથી પટ્ટીને 0 પર લઈ જાઓ.",
    /* printed at run time (win lines, nudges) and drawn by Work through tx */
    "Correct, a road between towns is measured in kilometres.": "સાચું, શહેરો વચ્ચેનો રસ્તો કિલોમીટરમાં મપાય છે.",
    "Correct, a pencil can be measured in centimetres.": "સાચું, પેન્સિલ સેન્ટીમીટરમાં માપી શકાય છે.",
    "Correct, a door can be measured in metres.": "સાચું, દરવાજો મીટરમાં માપી શકાય છે.",
    "Correct, the ribbon is 9 cm long.": "સાચું, રિબનની લંબાઈ 9 સેમી છે.",
    "Correct, the pencil is 12 cm long.": "સાચું, પેન્સિલની લંબાઈ 12 સેમી છે.",
    "Correct, this ribbon is 14 cm long.": "સાચું, આ રિબનની લંબાઈ 14 સેમી છે.",
    "Correct, half a metre is 50 cm.": "સાચું, અડધો મીટર 50 સેમી હોય છે.",
    "Correct, a quarter of a metre is 25 cm.": "સાચું, મીટરનો ચોથો ભાગ 25 સેમી હોય છે.",
    "Correct, 2 quarters are 50 cm long.": "સાચું, 2 ચોથા ભાગ મળીને 50 સેમી થાય છે.",
    "Correct, the comb is 13 cm long.": "સાચું, કાંસકાની લંબાઈ 13 સેમી છે.",
    "Correct, the key is 6 cm long.": "સાચું, ચાવીની લંબાઈ 6 સેમી છે.",
    "Correct, the crayon is 8 cm long.": "સાચું, ક્રેયોનની લંબાઈ 8 સેમી છે.",
    "Start measuring from zero.": "શૂન્યથી માપવાનું શરૂ કરો.",
    "Put a unit card on the tag first.": "પહેલાં ટેગ પર એકમનું કાર્ડ મૂકો.",
    "finger width": "આંગળીની પહોળાઈ",
    "a big step": "એક મોટું ડગલું",
    "15 minute walk": "15 મિનિટ ચાલવું",
    "Mark": "નિશાન", "Tens": "દસ ભાગ", "Halves": "અડધા", "Quarters": "ચોથા ભાગ",
    "Answer": "જવાબ", "unit": "એકમ", "part": "ભાગ", "ruler": "પટ્ટી", "eraser end": "રબરનો છેડો", "New thing": "નવી વસ્તુ",
    "1 m": "1 મી", "100 cm": "100 સેમી",
    "pencil": "પેન્સિલ", "ribbon": "રિબન", "eraser": "રબર", "key": "ચાવી", "comb": "કાંસકો", "crayon": "ક્રેયોન",
  },
};

/* ── the things, the ruler and the metre rod ─────────────────────────────────────────────── */
const MI_BLUE = "#0072B2", MI_GREEN = "#009E73", MI_VERM = "#D55E00", MI_INK = "#2B2B2B";
/* each photo skin and its own aspect (images.json `made`: w / h); a strip takes its height from code */
const MI_THING: any = {
  pencil: { skin: "pencil", ar: 800 / 105 },
  book: { skin: "book", ar: 119 / 150 },
  ribbon: { skin: "ribbon", ar: 720 / 113 },   /* a tile: flat left end, swallowtail right end whose outer tips are the box's edge */
  eraser: { skin: "eraser", ar: 291 / 150 },
  key: { skin: "key", ar: 440 / 140 },
  comb: { skin: "comb", ar: 600 / 150 },
  crayon: { skin: "crayon", ar: 600 / 89 },
  door: { skin: "door", ar: 200 / 397 },
  road: { skin: "road", ar: 648 / 228 },
};
/* the ruler: 0 to 16 cm, 42 units a centimetre, half a centimetre of blank wood before 0 and 2.4 after 16 (the unit sits
   inside the wood, clear of 16 and of the end); the bench line (lane) where a thing lies and the ruler's top edge meets it; the
   ruler's home under the bench, 1 cm to the right and clear of the board's foot; the scene is 880 wide, laid out once from the
   OPEN keypad's room (x 12 to 892), so nothing moves when it opens */
const MI_R = { sc: 42, cm: 16, mg: 0.5, mgR: 2.4, h: 118, lane: 250, homeY: 380, x0: 40, sw: 880, ox: 12, homeCm: 1 };
/* the metre rod: 0 to 100 cm, 7.2 units a centimetre; the wood runs from the 0 tick to the 100 tick, its face at its own aspect */
const MI_ROD = { z: 24, sc: 7.2, top: 196, h: 46 };
/* phase 1: the thing at the top, the tag it hangs from at the right, the three unit cards below (tall enough for a 32 caption
   chip and the Hindi and Gujarati matras over the title) */
const MI_U = { cw: 300, ch: 160, homeY: 324, homeX: [80, 440, 800], slot: { x: 860, y: 100 }, sw: 1180 };
const MI_UNITS = ["cm", "m", "km"];
const MI_CAP: any = { cm: "finger width", m: "a big step", km: "15 minute walk" };
const MI_FULL: any = { cm: "centimetres", m: "metres", km: "kilometres" };
/* one answer box with its unit beside it */
const MI_CM = [{ label: "length", unit: "cm" }];
/* free play: the things the New thing key brings, one at a time */
const MI_FREE = [{ obj: "eraser", cm: 5 }, { obj: "crayon", cm: 8 }, { obj: "key", cm: 6 }, { obj: "comb", cm: 13 }, { obj: "pencil", cm: 12 }, { obj: "ribbon", cm: 9 }];
/* the nudges Work prints (TR keys) */
const MI_ZERO = "Start measuring from zero.";
const MI_NEED_CARD = "Put a unit card on the tag first.";
const MI_MOVE_LINE = "Drag it, or use the arrow keys.";
const MI_CUT_LINE = "Cut the rod, then colour the parts.";
/* a real child in user mode has touched the board: from then on a question's answer waits for its act (survives
   every question and remount; a toolApi-driven session never touches, so it is never gated) */
const MI_TOUCH = { on: false };

/* One entry per phase = one mount. */
const PHASES = [
  {
    n: 1,
    concept: "Choosing cm, m or km",
    conceptId: "M1.S1.T2.C5", objectiveIds: ["O1"],
    says: ["Which unit fits each thing?"],
    /* warm-up: the three unit cards, one tap each shows what the unit is about */
    warm: { kind: "unit", warm: true },
    steps: [
      { say: "Tap the cm card: a centimetre is about as wide as your finger.", on: "unit-cm", hint: "Look for the card on the left." },
      { say: "Tap the m card: a metre is about one big step.", on: "unit-m", hint: "The card you need is in the middle." },
      { say: "Tap the km card: a kilometre is about a 15 minute walk.", on: "unit-km", hint: "Try the last card, on the right." },
    ],
    stepHold: 1400,
    ladder: ["Compare it with your hand, your classroom and the road to school.", "Picture walking along it: does it take a moment or a long time?"],
    closing: "Short things take cm, longer things take m, and far places take km.",
    learned: "You learned: cm, m and km; 1 m = 100 cm and 1 km = 1,000 m",
    traceback: "The right card's size (finger width, a big step, a long walk) lights beside the thing, then the card is ringed and its unit pinned in a green chip.",
    items: [
      /* authored (qid null): the owner's phase 1 (choose the unit) replaced the plan's handspan phase, whose questions (C5) were dropped.
         Ungated (the coordinator, 2026-10-28): the card on the tag IS the answer, so there is no act before it. Not in card order. */
      { qid: null, kind: "unit", obj: "road", pad: "enter", answer: "km", near: "m", winMs: 2400,
        say: "Drag the card with the best unit for the road from one town to the next.", ask: "Unit for a road?",
        miss: "Is this road longer than your classroom?",
        ladder: ["Could you walk from one town to the next in a few steps?", "Is the road longer than a hundred doors put end to end?"],
        win: "Correct, a road between towns is measured in kilometres." },
      { qid: null, kind: "unit", obj: "pencil", pad: "enter", answer: "cm", near: "m", winMs: 2400,
        say: "Now drag the card that fits a pencil.", ask: "Unit for a pencil?",
        miss: "Is a pencil longer or shorter than your hand?",
        ladder: ["Can you hold a whole pencil in one hand?", "Would you need even one big step to pass a pencil?"],
        win: "Correct, a pencil can be measured in centimetres." },
      { qid: null, kind: "unit", obj: "door", pad: "enter", answer: "m", near: "km", winMs: 2400,
        say: "Which card fits the height of a classroom door?", ask: "Unit for a door?",
        miss: "Is a door taller than you are?",
        ladder: ["Is a door much taller than a pencil?", "Is a door as long as the road between two towns?"],
        win: "Correct, a door can be measured in metres." },
    ],
  },
  {
    n: 2,
    concept: "Measuring with a ruler from 0",
    conceptId: "M1.S1.T2.C6", objectiveIds: ["O1"],
    says: ["Measure each thing with the ruler."],
    /* warm-up: an eraser of 5 cm (none of the phase's answers) */
    warm: { kind: "measure", obj: "eraser", cm: 5, warm: true },
    steps: [
      { say: "Drag the ruler up so its 0 is at the left end of the eraser.", on: "ruler", hint: "Line up the ruler's 0 with the eraser's left end." },
      { say: "Now tap the right end of the eraser to read its length.", on: "read", hint: "Tap just above where the eraser ends." },
    ],
    stepHold: 2000,
    ladder: ["Touch each space between two marks and count them.", "Look straight down from the far end to the ruler's number."],
    closing: "Put 0 at one end and read the number at the other end.",
    learned: "You learned: put 0 at one end, read the number at the other end",
    traceback: "The ruler slides so its 0 meets the left end, the marks light one by one to the right end and the length shows in a blue tag.",
    items: [
      /* authored (qid null): the plan's C6 questions choose units (now phase 1's work); the ribbon's 9 cm is the plan's ME3 reading */
      { qid: null, kind: "measure", obj: "ribbon", cm: 9, parts: MI_CM, answer: [9],
        say: "Measure the ribbon with the ruler, then type its length.", ask: "Ribbon length?",
        miss: "Start your count at the 0 mark, not at 1.",
        win: "Correct, the ribbon is 9 cm long." },
      { qid: null, kind: "measure", obj: "pencil", cm: 12, parts: MI_CM, answer: [12],
        say: "Now measure the pencil the same way.", ask: "Pencil length?",
        miss: "Read the number just under the pencil's sharp tip.",
        win: "Correct, the pencil is 12 cm long." },
      { qid: null, kind: "measure", obj: "ribbon", cm: 14, parts: MI_CM, answer: [14],
        say: "Measure this longer ribbon from 0 as well.", ask: "Ribbon length?",
        miss: "Find the mark where this ribbon stops.",
        win: "Correct, this ribbon is 14 cm long." },
    ],
  },
  {
    n: 3,
    concept: "The metre rod: halves and quarters",
    conceptId: "M1.S1.T2.C7", objectiveIds: ["O2"],
    says: ["A metre rod is 100 cm long."],
    /* warm-up: mark the rod, cut it in tens, colour 10 cm (none of the phase's answers) */
    warm: { kind: "rod", warm: true },
    steps: [
      { say: "Tap Mark to mark the metre rod in centimetres.", on: "mark", hint: "The Mark key is under the rod." },
      { say: "Tap Tens to cut the rod into 10 equal parts.", on: "tens", hint: "Find the key that says Tens." },
      { say: "Tap the part that starts at 0 to colour it.", on: "piece-1", hint: "Tap the first part, at the left end." },
    ],
    stepHold: 2000,
    ladder: ["The whole rod is 100 cm: split it into equal parts.", "How many cm is one of the equal parts?"],
    closing: "So a metre rod shares into 2 halves of 50 cm or 4 quarters of 25 cm.",
    learned: "You learned: half a metre is 50 cm and a quarter of a metre is 25 cm",
    traceback: "The rod is cut into the asked equal parts and a blue bracket from 0 gives their length in cm.",
    items: [
      /* authored (qid null): the owner's phase 3 (the metre rod in halves and quarters); the plan's C7 questions are ruler readings.
         near = the folded-twice mix-up (a half read as a quarter's 25, a quarter as the half's 50) */
      { qid: null, kind: "rod", div: 2, take: 1, near: 25, parts: MI_CM, answer: [50],
        say: "Tap Halves, colour one half, then type how many cm half a metre is.", ask: "Half a metre?",
        miss: "Half a metre is 1 of 2 equal parts of the rod.",
        win: "Correct, half a metre is 50 cm." },
      { qid: null, kind: "rod", div: 4, take: 1, near: 50, parts: MI_CM, answer: [25],
        say: "Now tap Quarters and colour one quarter: how many cm is it?", ask: "A quarter of a metre?",
        miss: "A quarter is half of a half, so it ends before the half.",
        win: "Correct, a quarter of a metre is 25 cm." },
      { qid: null, kind: "rod", div: 4, take: 2, near: 25, parts: MI_CM, answer: [50],
        say: "Colour 2 quarters of the rod: how many cm do they make together?", ask: "2 quarters?",
        miss: "Put the 2 coloured quarters together: what part of the rod is that?",
        win: "Correct, 2 quarters are 50 cm long." },
    ],
  },
  {
    n: 4,
    concept: "Measuring new things",
    conceptId: "M1.S1.T2.C8", objectiveIds: ["O2"],
    says: ["Now measure new things on your own."],
    ladder: ["Count each centimetre space from one end of it to the other.", "Say each number as you pass it, starting from 0."],
    closing: "You measured every new thing from 0, well done.",
    learned: "You learned: start at 0 every time, whatever you measure",
    traceback: "The thing or the ruler slides so 0 meets one end, the marks light to the other end and a blue tag gives the length.",
    items: [
      /* authored (qid null): new things with fewer visual hints (no glowing 0, no invite); a tap does NOT line anything up here,
         the child drags it (or nudges it with the arrow keys) to 0 */
      { qid: null, kind: "measure", obj: "comb", cm: 13, parts: MI_CM, answer: [13],
        say: "Measure the comb with the ruler and type its length.", ask: "Comb length?",
        miss: "Read the number under the comb's far end.",
        win: "Correct, the comb is 13 cm long." },
      /* after the plan's practice 7 (a pencil from the 2 mark to the 9 mark): the key lies from 3 to 9 on a fixed ruler */
      { qid: null, kind: "measure", obj: "key", cm: 6, mode: "slide", start: 3, near: 9, parts: MI_CM, answer: [6],
        say: "Find the key's length.", ask: "Key length?",
        miss: "Look at where the key starts on the ruler.",
        ladder: ["A length is counted from the 0 mark, not from 3.", "Slide the key so its round end sits on the 0 mark."],
        win: "Correct, the key is 6 cm long." },
      /* the ruler already lies under the crayon, but from its 1 mark: the child slides the ruler to 0 */
      { qid: null, kind: "measure", obj: "crayon", cm: 8, mode: "nudge", start: 1, near: 9, parts: MI_CM, answer: [8],
        say: "How long is the crayon?", ask: "Crayon length?",
        miss: "Which number is under the crayon's left end?",
        ladder: ["Measuring starts at 0, so this ruler is in the wrong place.", "This ruler starts at 1 under the crayon, so move the ruler to 0."],
        win: "Correct, the crayon is 8 cm long." },
    ],
  },
];

/* The numbers, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = { ruler: { cmFrom: 0, cmTo: 16, unitsPerCm: MI_R.sc }, rod: { cmFrom: 0, cmTo: 100, unitsPerCm: MI_ROD.sc },
  units: MI_UNITS, free: MI_FREE.map((f) => f.obj) };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a unit by its name, a length by its one box */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  return String(v ?? "").trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: a second route that shares no code with judge or Work. A unit from the thing's real size (cm < 100 cm,
   m < 1,00,000 cm, else km); a ruler length by counting centimetre steps from 0; a rod part as 100 cm shared out */
const MI_REAL_CM: any = { pencil: 15, door: 210, road: 1500000 };
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "unit") { const c = MI_REAL_CM[it.obj]; return (c < 100 ? "cm" : c < 100000 ? "m" : "km") === it.answer; }
  if (it.kind === "measure") { let k = 0; for (let d = 0; d < it.cm - 0.001; d += 1) k++; return it.answer[0] === k; }
  if (it.kind === "rod") return it.answer[0] * it.div === 100 * it.take;
  return false;
}));
/* the most likely wrong answer: the item's own (`near`: the wrong card, the end read off a thing that is not at 0, the
   folded-twice mix-up), else a length counted from the 1 mark */
const nearMiss = (item: any) => (item.kind === "unit" ? item.near : String(item.near ?? item.answer[0] + 1));
/* the forms of an answer that no question, hint or ladder line may print. A unit question may list all three
   units ("cm, m or km") without giving its answer away; a line that says WHICH one ("in cm") would */
const answerForms = (item: any) => (item.kind === "unit" ? ["in " + MI_FULL[item.answer], "in " + item.answer]
  : item.answer.flatMap((x: number) => [String(x), indian(x), words(x)]));
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for a unit question: put that card on the tag; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: it does the question's act AT ONCE (the ruler to 0, the rod cut), then Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── defs for SVG gradients and filters ──────────────────────────────────────────────────── */
function MiDefs() {
  return (
    <defs>
      <linearGradient id="mi-bench-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFDF9" />
        <stop offset="100%" stopColor="#F4EAD9" />
      </linearGradient>
      <linearGradient id="mi-card-plain" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#F9F6F0" />
      </linearGradient>
      <linearGradient id="mi-card-win" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#E6F7F0" />
        <stop offset="100%" stopColor="#C6EFE0" />
      </linearGradient>
      <linearGradient id="mi-tag-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0084CC" />
        <stop offset="100%" stopColor="#0064A0" />
      </linearGradient>
      <filter id="mi-shadow" x="-10%" y="-10%" width="125%" height="125%">
        <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#2B2B2B" floodOpacity="0.14" />
      </filter>
    </defs>
  );
}

/* ── drawing helpers (called, never mounted) ─────────────────────────────────────────────── */
function miGeo(it: any) {
  const R = MI_R, t = MI_THING[it.obj] || MI_THING.eraser, L = it.cm * R.sc;
  const oh = t.strip || Math.round(L / t.ar);
  const mode = it.mode || "drag";
  const start = mode === "drag" ? 0 : it.start || 0;
  const thingX = R.x0 + start * R.sc;                                   /* where the thing lies at first */
  const zero = mode === "nudge" ? thingX : R.x0;                       /* where the ruler's 0 belongs */
  const home = mode === "drag" ? { x: R.x0 + R.homeCm * R.sc, y: R.homeY } : { x: R.x0, y: R.lane };
  return { L, oh, mode, thingX, zero, home };
}
/* a rod question's act is done: the cut it asks for is made and exactly the number of parts it asks for is coloured */
const miRodOk = (it: any, s: any) => !!it && s.div === it.div && s.divN >= it.div - 1 && !s.cutting && (s.sel || []).filter(Boolean).length === it.take;
/* the order the pencil cuts the rod: a quarter is half of a half, so the middle (50) first, then 25 and 75 */
const miCutOrder = (d: number) => (d === 4 ? [2, 1, 3] : Array.from({ length: d - 1 }, (_, k) => k + 1));
const miAligned = (g: any, s: any) => (g.mode === "slide" ? s.kx === MI_R.x0 : s.rx === g.zero && s.ry === MI_R.lane);
function miFresh(it: any, qk: string) {
  const s: any = { qk, acted: false, tracing: false, D: null, lit: 0, tag: false, carry: null, nudged: false, missed: null };
  if (it.kind === "unit") Object.assign(s, { card: null, seen: it.warm ? {} : { cm: 1, m: 1, km: 1 } });
  if (it.kind === "measure") { const g = miGeo(it); Object.assign(s, { rx: g.home.x, ry: g.home.y, kx: g.thingX }); }
  if (it.kind === "rod") Object.assign(s, { marked: it.warm ? 0 : 10, fact: !it.warm, div: 0, divN: 0, sel: [] });
  return s;
}
/* the plain drawing of each thing (the whole drawing when a picture is missing; the photo skin goes over it) */
function miPlain(obj: string, x: number, y: number, w: number, h: number) {
  const cy = y + h / 2;
  if (obj === "pencil") return (
    <g>
      <rect x={x} y={y + h * 0.14} width={w * 0.06} height={h * 0.72} rx={2} fill="#C9A24A" stroke="#2B2B2B" strokeWidth={1.5} />
      <rect x={x + w * 0.06} y={y + h * 0.14} width={w * 0.76} height={h * 0.72} fill="#F2C230" stroke="#2B2B2B" strokeWidth={2} />
      <line x1={x + w * 0.06} y1={y + h * 0.38} x2={x + w * 0.82} y2={y + h * 0.38} stroke="#B08A1E" strokeWidth={1.5} />
      <line x1={x + w * 0.06} y1={y + h * 0.62} x2={x + w * 0.82} y2={y + h * 0.62} stroke="#B08A1E" strokeWidth={1.5} />
      <polygon points={`${x + w * 0.82},${y + h * 0.14} ${x + w},${cy} ${x + w * 0.82},${y + h * 0.86}`} fill="#E8C08A" stroke="#2B2B2B" strokeWidth={2} strokeLinejoin="round" />
      <polygon points={`${x + w * 0.94},${cy - h * 0.1} ${x + w},${cy} ${x + w * 0.94},${cy + h * 0.1}`} fill="#2B2B2B" />
    </g>
  );
  if (obj === "book") return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={4} fill="#A5694F" stroke="#2B2B2B" strokeWidth={2.5} />
    </g>
  );
  if (obj === "ribbon") return (
    <g>
      <polygon points={`${x},${y} ${x + w},${y} ${x + w - h * 0.45},${cy} ${x + w},${y + h} ${x},${y + h}`} fill="#B5172E" stroke="#2B2B2B" strokeWidth={2.4} strokeLinejoin="round" />
    </g>
  );
  if (obj === "eraser") return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={h * 0.18} fill="#F2A7B5" stroke="#2B2B2B" strokeWidth={2.5} />
      <rect x={x + 4} y={y + 4} width={w * 0.4} height={h - 8} rx={h * 0.1} fill="#E58DA0" />
    </g>
  );
  if (obj === "key") {
    const r = h * 0.44;
    return (
      <g>
        <circle cx={x + r + 2} cy={cy} r={r} fill="#D9AE3F" stroke="#2B2B2B" strokeWidth={2.5} />
        <circle cx={x + r + 2} cy={cy} r={r * 0.4} fill="#FFFDF7" stroke="#2B2B2B" strokeWidth={2} />
        <rect x={x + 2 * r} y={cy - h * 0.1} width={w - 2 * r} height={h * 0.2} fill="#D9AE3F" stroke="#2B2B2B" strokeWidth={2.5} />
        <rect x={x + w * 0.76} y={cy} width={w * 0.16} height={h * 0.35} rx={2} fill="#D9AE3F" stroke="#2B2B2B" strokeWidth={2} />
      </g>
    );
  }
  if (obj === "comb") {
    const sh = h * 0.36, n = Math.max(8, Math.round(w / 16)), p = (w - 8) / n;
    return (
      <g>
        <rect x={x} y={y} width={w} height={sh} rx={6} fill="#C8915A" stroke="#2B2B2B" strokeWidth={2.5} />
        <path d={Array.from({ length: n }, (_, i) => `M ${x + 4 + i * p} ${y + sh} h ${p * 0.5} v ${h - sh} h ${-p * 0.5} Z`).join(" ")} fill="#C8915A" stroke="#2B2B2B" strokeWidth={1.5} />
      </g>
    );
  }
  if (obj === "crayon") return (
    <g>
      <rect x={x} y={y + h * 0.1} width={w * 0.82} height={h * 0.8} rx={h * 0.12} fill="#F07A1F" stroke="#2B2B2B" strokeWidth={2.5} />
      <rect x={x + w * 0.16} y={y + h * 0.1} width={w * 0.5} height={h * 0.8} fill="#F7B267" stroke="#2B2B2B" strokeWidth={2} />
      <polygon points={`${x + w * 0.82},${y + h * 0.1} ${x + w},${cy} ${x + w * 0.82},${y + h * 0.9}`} fill="#E0661A" stroke="#2B2B2B" strokeWidth={2} strokeLinejoin="round" />
    </g>
  );
  if (obj === "door") return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={4} fill="#8B5A2B" stroke="#2B2B2B" strokeWidth={3} />
      <rect x={x + w * 0.15} y={y + h * 0.08} width={w * 0.7} height={h * 0.36} rx={3} fill="#9C6833" stroke="#2B2B2B" strokeWidth={2} />
      <rect x={x + w * 0.15} y={y + h * 0.52} width={w * 0.7} height={h * 0.4} rx={3} fill="#9C6833" stroke="#2B2B2B" strokeWidth={2} />
      <circle cx={x + w * 0.82} cy={y + h * 0.5} r={w * 0.06} fill="#D9AE3F" stroke="#2B2B2B" strokeWidth={2} />
    </g>
  );
  if (obj === "road") return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} fill="#3A3A3A" stroke="#2B2B2B" strokeWidth={3} />
      <line x1={x + 10} y1={cy} x2={x + w - 10} y2={cy} stroke="#FFFFFF" strokeWidth={5} strokeDasharray="30 22" />
    </g>
  );
  return <rect x={x} y={y} width={w} height={h} rx={8} fill="#D8C7A8" stroke="#2B2B2B" strokeWidth={2.5} />;
}
/* a picture is on hand for this skin (the ?noskins page and a missing picture leave the plain drawing showing) */
const miHasSkin = (name: string) => { try { return !!name && SKINS && typeof TOOL_IMAGES !== "undefined" && !!(TOOL_IMAGES as any)[name]; } catch (e) { return false; } };
/* a thing: its plain drawing, then its photo over it in the same box. Under a photo the plain drawing is kept (same shapes)
   but painted clear, so nothing of it peeks out round the photo's transparent edges */
function miThingArt(obj: string, x: number, y: number, w: number, h: number) {
  const t = MI_THING[obj] || {};
  const clear = miHasSkin(t.skin);
  return (
    <g filter="url(#mi-shadow)">
      <g fillOpacity={clear ? 0 : 1} strokeOpacity={clear ? 0 : 1}>{miPlain(obj, x, y, w, h)}</g>
      {t.skin ? <Skin name={t.skin} x={x} y={y} w={w} h={h} fit={t.strip ? "slice" : "stretch"} /> : null}
      {t.strip ? <rect x={x} y={y} width={w} height={h} rx={4} fill="none" stroke="#2B2B2B" strokeWidth={2.5} /> : null}
    </g>
  );
}
/* the ruler: its photo body, then the scale drawn in code (a tick every centimetre and half, a number every centimetre);
   zx is where its 0 stands, ty its top edge. lit lights the marks 1 to lit in blue; glow sets the 0 on a white pill */
function miRulerArt(zx: number, ty: number, lit: number, glow: boolean, cmLab = "cm") {
  const R = MI_R, x = zx - R.mg * R.sc, w = (R.cm + R.mg + R.mgR) * R.sc, marks: any[] = [];
  for (let k = 0; k <= R.cm; k++) {
    const mx = zx + k * R.sc, on = k >= 1 && k <= lit;
    marks.push(<line key={"t" + k} x1={mx} y1={ty} x2={mx} y2={ty + 36} stroke={on ? MI_BLUE : MI_INK} strokeWidth={on ? 5 : 3} strokeLinecap="round" />);
    if (k < R.cm) marks.push(<line key={"h" + k} x1={mx + R.sc / 2} y1={ty} x2={mx + R.sc / 2} y2={ty + 18} stroke={MI_INK} strokeWidth={2.4} strokeLinecap="round" />);
    marks.push(<text key={"n" + k} x={mx} y={ty + 84} textAnchor="middle" fontSize={T.label} fontWeight={on ? 800 : 700} fill={on ? shade(MI_BLUE, 0.3) : MI_INK}>{k}</text>);
  }
  return (
    <g filter="url(#mi-shadow)">
      <rect x={x} y={ty} width={w} height={R.h} rx={10} fill="#E9CF9C" />
      <Skin name="ruler" x={x} y={ty} w={w} h={R.h} fit="stretch" />
      <rect x={x} y={ty} width={w} height={R.h} rx={10} fill="none" stroke="#2B2B2B" strokeWidth={2.5} />
      {glow ? <rect x={zx - 22} y={ty + 48} width={44} height={44} rx={12} fill="#FFFFFF" fillOpacity={0.92} stroke={MI_GREEN} strokeWidth={3.5} filter="url(#mi-shadow)" /> : null}
      {marks}<text x={zx + R.cm * R.sc + 26} y={ty + 84} fontSize={T.micro} fontWeight={700} fill={MI_INK}>{cmLab}</text>
    </g>
  );
}
/* a length found: a bracket from x0 to x1 just above yb and a tag on it. Blue (Given) for the reading; green (Answer) once the
   child's answer is confirmed, the label then starting with the word Answer */
function miTag(x0: number, x1: number, yb: number, label: string, ok = false) {
  const mid = (x0 + x1) / 2, tw = Math.max(140, label.length * 25 + 40), ty = yb - 84, col = ok ? MI_GREEN : MI_BLUE;
  const tx0 = Math.max(4, mid - tw / 2);
  return (
    <g pointerEvents="none" filter="url(#mi-shadow)">
      <path d={`M ${x0} ${yb} V ${yb - 14} H ${x1} V ${yb}`} fill="none" stroke={col} strokeWidth={4} strokeLinejoin="round" strokeLinecap="round" />
      <rect x={tx0} y={ty} width={tw} height={60} rx={14} fill={ok ? shade(MI_GREEN, 0.2) : "url(#mi-tag-grad)"} stroke="#FFFFFF" strokeWidth={2} />
      <text x={tx0 + tw / 2} y={ty + 43} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill="#FFFFFF">{label}</text>
    </g>
  );
}
/* a unit card: the unit big, what it is about under it (once its step has shown it) */
function miCardArt(label: string, cap: string | null, x: number, y: number, tone: string) {
  const W2 = MI_U.cw, H2 = MI_U.ch, win = tone === "win";
  return (
    <g filter="url(#mi-shadow)">
      <rect x={x} y={y + 5} width={W2} height={H2} rx={18} fill="#C9BCA6" opacity={0.5} />
      <rect x={x} y={y} width={W2} height={H2} rx={18} fill={win ? "url(#mi-card-win)" : "url(#mi-card-plain)"} stroke={win ? MI_GREEN : "#2B2B2B"} strokeWidth={win ? 4 : 2.5} />
      <text x={x + W2 / 2} y={y + (cap ? 88 : 104)} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={win ? shade(MI_GREEN, 0.45) : MI_INK}>{label}</text>
      {cap ? (
        <g pointerEvents="none">
          <rect x={x + 12} y={y + H2 - 58} width={W2 - 24} height={50} rx={12} fill="#F0E8DC" stroke="#C9BCA6" strokeWidth={1} />
          <text x={x + W2 / 2} y={y + H2 - 22} textAnchor="middle" fontSize={T.label} fontWeight={700} fill="#333333">{cap}</text>
        </g>
      ) : null}
    </g>
  );
}
/* phase 1: where each thing stands (its photo's own aspect) */
function miUnitBox(obj: string) {
  if (obj === "pencil") { const w = 620, h = Math.round(w / MI_THING.pencil.ar); return { x: 390 - w / 2, y: 147 - h / 2, w, h }; }
  if (obj === "book") { const w = 240, h = Math.round(w / MI_THING.book.ar); return { x: 390 - w / 2, y: 150 - h / 2, w, h }; }
  if (obj === "door") return { x: 390 - 64, y: 8, w: 128, h: 256 };
  if (obj === "road") { const w = 540, h = Math.round(w / MI_THING.road.ar); return { x: 390 - w / 2, y: 125 - h / 2, w, h }; }
  return null;
}

/* ── the working area ──────────────────────────────────────────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, api, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const [fi, setFi] = useState(0);
  const free = stage === "free";
  const P: any = PHASES[(n || 1) - 1] || PHASES[0];
  const warmOn = !free && (stage === "demo" || stage === "teach") && !!P.warm;
  const it: any = free ? { kind: "measure", ...MI_FREE[fi % MI_FREE.length], free: true } : warmOn ? P.warm : item;
  const kind = it.kind;
  const demo = stage === "demo";
  const asking = stage === "ask";
  const playing = asking || stage === "teach" || free;
  /* the board belongs to this ENTRY of the question (an away-and-back opens it fresh) */
  const base = free ? "f" + fi : n + ":" + (warmOn ? "w" : index);
  const ent = useRef({ k: "", n: 0 });
  if (ent.current.k !== base) ent.current = { k: base, n: ent.current.n + 1 };
  const qk = base + "#" + ent.current.n;
  const [raw, setRaw] = useState<any>(() => miFresh(it, qk));
  const S = raw && raw.qk === qk ? raw : miFresh(it, qk);
  const live = useRef<any>(S);
  live.current = S;
  const put = (o: any) => {
    const b = live.current && live.current.qk === qk ? live.current : miFresh(it, qk);
    const nx = { ...b, ...(typeof o === "function" ? o(b) : o) };
    live.current = nx;
    setRaw(nx);
  };
  const busy = useRef(false);
  const lastKey = useRef(0);
  const grab = useRef<any>(null);
  const nudgeT = useRef<any>(null);
  const kbAt = useRef(0);
  const stageRef = useRef(stage);
  stageRef.current = stage;
  /* a correction, an act or a nudge in flight never outlives its question */
  useEffect(() => () => { tl.stop(); busy.current = false; clearTimeout(nudgeT.current); }, [qk]);

  const R = MI_R;
  const g = kind === "measure" ? miGeo(it) : null;
  const ox = kind === "unit" ? Math.round(Math.max(12, ((box ? box.w : W.w) - MI_U.sw) / 2)) : R.ox;
  const guided = !free && n === 2;
  const tapAligns = free || n !== 4;   /* phase 4 (the challenges): a tap never lines the ruler or the thing up for the child */
  /* the child's own pointer or key on a piece or a key arms the gate, and a real Enter on a guide step (a window keydown:
     the agent's check() and the dev solve() never make one) */
  const realTouch = () => { if (!MI_TOUCH.on && (asking || demo)) MI_TOUCH.on = true; };
  const sayBack = () => { if (live.current.nudged) { clearTimeout(nudgeT.current); put({ nudged: false }); api.say(item.say); } };
  /* a nudge replaces the question for about 3 s, then the question comes back by itself */
  const sayNudge = (line: string) => {
    const q0 = qk, say0 = item.say;
    put({ nudged: true });
    api.say(line);
    clearTimeout(nudgeT.current);
    nudgeT.current = setTimeout(() => {
      if (live.current.qk !== q0 || stageRef.current !== "ask" || !live.current.nudged) return;
      put({ nudged: false });
      api.say(say0);
    }, 3000);
  };
  /* the line a locked question gives on a tap of the dimmed Answer key or the Hint key: the act, never the answer */
  const lockLine = n === 3 ? MI_CUT_LINE : n === 4 ? MI_MOVE_LINE : "";
  const lockInfo = useRef<any>({});
  lockInfo.current = { lockLine, sayNudge };
  useEffect(() => {
    const onKey = (e: any) => {
      if (e.key === "Enter" || e.key === " ") kbAt.current = Date.now();
      if (e.key === "Enter" && !e.repeat && stageRef.current === "demo") MI_TOUCH.on = true;
    };
    const onUp = (e: any) => {
      const t = e.target && e.target.closest ? e.target.closest('[data-control="answer-open"], [data-control="again"]') : null;
      const L = lockInfo.current;
      if (!t || !L.lockLine || !lockSent.current || stageRef.current !== "ask") return;
      setTimeout(() => { if (lockSent.current) L.sayNudge(L.lockLine); }, 90);
    };
    window.addEventListener("keydown", onKey, true);
    window.addEventListener("pointerup", onUp, true);
    return () => { window.removeEventListener("keydown", onKey, true); window.removeEventListener("pointerup", onUp, true); };
  }, []);

  /* the drag (ruler, a sliding thing, a unit card) */
  const drag = useDrag((pay: any, p: any, moved: boolean) => onDrop(pay, p, moved));
  const dd = drag.drag;
  const cardPos = (u: string, s: any) => (s.card === u ? MI_U.slot : { x: MI_U.homeX[MI_UNITS.indexOf(u)], y: MI_U.homeY });
  if (dd && dd.payload) {
    if (!grab.current) {
      const pk = dd.payload.k;
      if (pk === "ruler") grab.current = { dx: S.rx + ox - dd.x, dy: S.ry - dd.y };
      else if (pk === "thing") grab.current = { dx: S.kx + ox - dd.x, dy: 0 };
      else if (pk === "card") { const c = cardPos(dd.payload.u, S); grab.current = { dx: c.x + ox - dd.x, dy: c.y - dd.y }; }
    }
  } else grab.current = null;

  /* ── phase 1: the unit cards ── */
  const placeCard = (u: string) => {
    put({ card: u, carry: null, acted: true, D: null });
    api.sfx.tick();
    sayBack();
  };
  const tapCard = async (u: string) => {
    const s = live.current, on = "unit-" + u;
    if (demo) {
      if (stepOn !== on || s.seen[u]) { api.did(on); return; }
      if (busy.current) return;
      busy.current = true;
      const c = cardPos(u, s);
      const ok = await api.act({ tool: "hand", moves: "tap", at: [{ x: c.x + MI_U.cw / 2 + ox, y: c.y + MI_U.ch / 2 }] });
      busy.current = false;
      if (!ok) return;
      put((b: any) => ({ seen: { ...b.seen, [u]: 1 } }));
      api.sfx.settle();
      api.did(on);
      return;
    }
    if (!playing || s.tracing || busy.current) return;
    if (s.card === u) { put({ card: null, D: null }); return; }
    busy.current = true;
    const c = cardPos(u, s), sl = MI_U.slot;
    put({ carry: u, D: null });
    const ok = await api.act({ tool: "hand", moves: "carry", from: { x: c.x + MI_U.cw / 2 + ox, y: c.y + MI_U.ch / 2 },
      to: { x: sl.x + MI_U.cw / 2 + ox, y: sl.y + MI_U.ch / 2 }, hold: miCardArt(tx(u), tx(MI_CAP[u]), -MI_U.cw / 2, -MI_U.ch / 2, "plain") });
    busy.current = false;
    if (!ok) { put({ carry: null }); return; }
    placeCard(u);
  };
  const dropCard = (u: string, p: any, g0: any) => {
    if (demo) { tapCard(u); return; }
    const s = live.current;
    if (!playing || s.tracing || !g0) return;
    const cx = p.x + g0.dx - ox + MI_U.cw / 2, cy = p.y + g0.dy + MI_U.ch / 2, sl = MI_U.slot, tb = miUnitBox(it.obj);
    const inSlot = cx > sl.x - 70 && cx < sl.x + MI_U.cw + 70 && cy > sl.y - 70 && cy < sl.y + MI_U.ch + 70;
    const onThing = !!tb && cx > tb.x - 30 && cx < tb.x + tb.w + 30 && cy > tb.y - 30 && cy < tb.y + tb.h + 30;
    if (inSlot || onThing) placeCard(u);
    else if (s.card === u) put({ card: null, D: null });
  };
  /* Enter on a unit question sends the card on the tag (never the same card again straight after a miss) */
  const enterUnit = () => {
    const s = live.current;
    if (s.tracing) return;   /* the correction is playing: the missed card is still on the tag, never sent again */
    if (!s.card) { sayNudge(MI_NEED_CARD); return; }
    api.submit(s.card);
  };

  /* ── phases 2 and 4: the ruler and the thing ── */
  const afterMove = (al: boolean, inLane: boolean) => {
    if (al) { api.sfx.tick(); sayBack(); return; }
    /* no nudge once the question's act has been done (its Answer key is open): it would contradict the key */
    if (asking && inLane && !live.current.acted) sayNudge(MI_ZERO);
  };
  /* the ruler or the thing put down at a place (a drop or an arrow-key nudge): it snaps to 0 within half a centimetre */
  const placeRuler = (zx0: number, ty0: number) => {
    const s = live.current;
    let zx = Math.max(R.mg * R.sc, Math.min(R.sw - (R.cm + R.mgR) * R.sc, zx0)), ty = Math.max(R.lane, Math.min(520 - R.h - 6, ty0));
    if (Math.abs(ty - R.lane) < 72) ty = R.lane;
    const al = ty === R.lane && Math.abs(zx - g!.zero) <= 0.3 * R.sc;   /* tight: the clamp (0.5 cm of wood) lies outside it */
    if (al) zx = g!.zero;
    put({ rx: zx, ry: ty, lit: al && free ? it.cm : 0, tag: al && free, D: null, acted: s.acted || al });
    if (demo) { if (al) api.sfx.tick(); api.did(al ? "ruler" : "ruler-off"); return; }
    afterMove(al, ty === R.lane);
  };
  const placeThing = (kx0: number) => {
    const s = live.current;
    let kx = Math.max(R.x0 - R.mg * R.sc, Math.min(R.sw - g!.L - 10, kx0));
    const al = Math.abs(kx - R.x0) <= 0.3 * R.sc;
    if (al) kx = R.x0;
    put({ kx, lit: 0, tag: false, D: null, acted: s.acted || al });
    afterMove(al, true);
  };
  const dropRuler = (p: any, g0: any) => {
    const s = live.current;
    if (demo && stepOn !== "ruler") { api.did("ruler"); return; }
    if (!(playing || demo) || s.tracing || !g0) return;
    placeRuler(p.x + g0.dx - ox, p.y + g0.dy);
  };
  /* the keyboard's nudge keys: left and right move a centimetre, up lays the ruler on the bench line, down takes it home */
  const nudge = (k: string, key: string) => {
    const s = live.current, dx = key === "ArrowLeft" ? -R.sc : key === "ArrowRight" ? R.sc : 0;
    if (busy.current || s.tracing) return;
    if (demo && (k !== "ruler" || stepOn !== "ruler")) { api.did(k); return; }
    if (!(playing || demo)) return;
    if (k === "ruler") placeRuler(s.rx + dx, key === "ArrowUp" ? R.lane : key === "ArrowDown" ? R.homeY : s.ry);
    else if (k === "thing" && dx) placeThing(s.kx + dx);
  };
  const tapRuler = async () => {
    const s = live.current;
    if (demo && stepOn !== "ruler") { api.did("ruler"); return; }
    if (miAligned(g!, s)) { if (demo) api.did("ruler"); return; }
    if (!(playing || demo) || s.tracing || busy.current) return;
    busy.current = true;
    put({ carry: "ruler", lit: 0, tag: false, D: null });
    const ok = await api.act({ tool: "hand", moves: "carry", from: { x: s.rx + ox, y: s.ry }, to: { x: g!.zero + ox, y: R.lane }, hold: miRulerArt(0, 0, 0, false, tx("cm")) });
    busy.current = false;
    if (!ok) { put({ carry: null }); return; }
    put({ carry: null, rx: g!.zero, ry: R.lane, acted: true, lit: free ? it.cm : 0, tag: free });
    api.sfx.settle();
    if (demo) { api.did("ruler"); return; }
    sayBack();
  };
  const dropThing = (p: any, g0: any) => {
    const s = live.current;
    if (!playing || s.tracing || !g0) return;
    placeThing(p.x + g0.dx - ox);
  };
  const tapThing = async () => {
    const s = live.current;
    if (s.kx === R.x0 || !playing || s.tracing || busy.current) return;
    busy.current = true;
    const cy = R.lane - g!.oh / 2;
    put({ carry: "thing", lit: 0, tag: false, D: null });
    const ok = await api.act({ tool: "hand", moves: "push", from: { x: s.kx + g!.L + ox + 8, y: cy }, to: { x: R.x0 + g!.L + ox + 8, y: cy },
      hold: <g transform={`translate(${-g!.L - 8},${-g!.oh / 2})`}>{miThingArt(it.obj, 0, 0, g!.L, g!.oh)}</g> });
    busy.current = false;
    if (!ok) { put({ carry: null }); return; }
    put({ carry: null, kx: R.x0, acted: true });
    api.sfx.settle();
    sayBack();
  };
  /* the warm-up's second step: the hand counts the marks from 0 to the eraser's end, then the length shows */
  const readAct = async () => {
    const s = live.current;
    if (!demo) return;
    if (stepOn !== "read" || s.tag) { api.did("read"); return; }
    if (busy.current) return;
    busy.current = true;
    const pts: any[] = [];
    for (let k = 1; k <= it.cm; k++) pts.push({ x: s.rx + k * R.sc + ox, y: R.lane + 66 });
    const ok = await api.act({ tool: "hand", moves: "tap", at: pts, onPoint: (i: number) => put({ lit: i + 1 }) });
    busy.current = false;
    if (!ok) return;
    put({ lit: it.cm, tag: true });
    api.sfx.settle();
    api.did("read");
  };

  /* ── phase 3: the metre rod ── */
  const RD = MI_ROD;
  const rodPts = (d: number) => miCutOrder(d).map((c) => ({ x: RD.z + (c * 100 / d) * RD.sc + ox, y: RD.top + RD.h / 2 }));
  const markAct = async () => {
    const s = live.current;
    if (s.marked >= 10) { if (demo) api.did("mark"); return; }
    if (busy.current) return;
    busy.current = true;
    const at = Array.from({ length: 10 }, (_, k) => ({ x: RD.z + (k + 1) * 10 * RD.sc + ox, y: RD.top + 8 }));
    const ok = await api.act({ tool: "pencil", moves: "tap", marks: true, at, onPoint: (i: number) => put({ marked: i + 1 }) });
    busy.current = false;
    if (!ok) return;
    put({ marked: 10, fact: true });
    api.sfx.settle();
    if (demo) api.did("mark");
  };
  const divAct = async (d: number) => {
    const s = live.current, on = d === 10 ? "tens" : d === 2 ? "halves" : "quarters";
    if (demo && stepOn !== on) { api.did(on); return; }
    if (s.div === d && s.divN >= d - 1) { if (demo) api.did(on); return; }
    if (busy.current || s.tracing || !(demo || playing)) return;
    const viaKeys = Date.now() - kbAt.current < 400;
    busy.current = true;
    /* the parts are drawn (and tappable) only once the pencil has finished cutting */
    put({ div: d, divN: 0, sel: [], D: null, cutting: true });
    const ok = await api.act({ tool: "pencil", moves: "tap", marks: true, at: rodPts(d), onPoint: (i: number) => put({ divN: i + 1 }) });
    busy.current = false;
    put({ divN: d - 1, cutting: false });
    if (!ok) return;
    api.sfx.settle();
    if (demo) api.did(on);
    /* a keyboard child goes on to the first part (the parts keep the focus: Hit keep) */
    if (viaKeys) setTimeout(() => { const el: any = document.querySelector('[data-control="piece-1"]'); if (el && el.focus) el.focus(); }, 60);
  };
  const tapPiece = (i: number) => {
    const s = live.current, on = "piece-" + (i + 1);
    if (demo) {
      if (stepOn === on && !s.sel[i]) { const sel: boolean[] = []; sel[i] = true; put({ sel, D: { div: s.div, take: 1, from: i } }); api.sfx.tick(); }
      api.did(on);
      return;
    }
    if (!playing || s.tracing || busy.current) return;
    const sel = Array.from({ length: s.div }, (_, k) => (k === i ? !s.sel[k] : !!s.sel[k]));
    put({ sel, D: null });   /* the gate follows the state (miRodOk), it is not sticky */
    api.sfx.tick();
  };
  const pressKey = (id: string) => {
    const t = Date.now();
    if (t - lastKey.current < 400) return;
    lastKey.current = t;
    realTouch();
    if (id === "mark") markAct();
    else if (id === "tens") divAct(10);
    else if (id === "halves") divAct(2);
    else if (id === "quarters") divAct(4);
    else if (id === "new-thing") { setFi((f) => f + 1); api.sfx.settle(); }
  };

  /* every drop and every tap of a drag piece lands here (a tap, Enter or Space means "put it where it belongs") */
  const onDrop = (pay: any, p: any, moved: boolean) => {
    const g0 = grab.current;
    grab.current = null;
    if (!pay) return;
    if (!busy.current) realTouch();
    const real = moved && isFinite(p.x) && isFinite(p.y);
    if (pay.k === "card") { if (real) dropCard(pay.u, p, g0); else tapCard(pay.u); return; }
    if (pay.k === "ruler") { if (real) dropRuler(p, g0); else if (tapAligns) tapRuler(); return; }
    if (pay.k === "thing") { if (real) dropThing(p, g0); else if (tapAligns) tapThing(); }
  };
  /* a placed card, an aligned ruler or a slid thing lets Enter pass to the window (PATTERNS 5b); the arrow keys nudge the
     ruler or the thing; in phase 4 Enter or Space on them lines nothing up (the child moves it to 0 by hand) */
  const passKeys = (pay: any, done: boolean) => {
    const k = drag.keys(pay);
    return { onKeyDown: (e: any) => {
      if (pay.k !== "card" && /^Arrow/.test(e.key)) { e.preventDefault(); e.stopPropagation(); realTouch(); nudge(pay.k, e.key); return; }
      if (e.key === "Enter" && done) return;
      if (!tapAligns && pay.k !== "card" && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); e.stopPropagation(); return; }
      k.onKeyDown(e);
    } };
  };

  /* the act of a guide step: Enter, the agent's check() and the dev solve() perform the CURRENT step */
  const act = (on: any) => {
    const o = String(on || "");
    if (o.startsWith("unit-")) return tapCard(o.slice(5));
    if (o === "ruler") return tapRuler();
    if (o === "read") return readAct();
    if (o === "mark") return markAct();
    if (o === "tens") return divAct(10);
    if (o.startsWith("piece-")) return tapPiece(Number(o.slice(6)) - 1);
  };
  api.onEnter(demo && stepOn ? () => act(stepOn) : asking && it.pad === "enter" ? enterUnit : null);

  /* the agent: a unit card on the tag; check() does the question's act at once (no animation), then Enter answers */
  HOOK.set = asking && kind === "unit" ? (v: any) => {
    const u = String(v ?? "").trim().toLowerCase();
    if (!MI_UNITS.includes(u)) return false;
    put({ card: u, acted: true, D: null });
    return true;
  } : null;
  HOOK.check = asking ? () => {
    const s = live.current;
    if (!s.acted && kind === "measure") put(g!.mode === "slide" ? { kx: R.x0, acted: true } : { rx: g!.zero, ry: R.lane, acted: true });
    if (kind === "rod" && !miRodOk(it, s)) put({ div: it.div, divN: it.div - 1, sel: Array.from({ length: it.div }, (_, k) => k < it.take), acted: true, D: null });
    return undefined;
  } : null;
  HOOK.demo = demo && stepOn ? () => act(stepOn) : null;

  /* the answer waits for the act (PATTERNS 19): locked only for a real child in user mode who has touched the board,
     only while the question's act is still to do; and while a correction plays */
  const isUser = () => { try { const t = (window as any).toolApi; return !!(t && t.getState && t.getState().mode === "user"); } catch (e) { return false; } };
  /* phase 1 is ungated (the card on the tag IS the answer); phase 3's gate follows the rod's state (the cut asked, exactly
     the parts asked coloured); phases 2 and 4 open once the thing is measured from 0 */
  const gateOn = asking && kind !== "unit" && (kind === "rod" ? !miRodOk(it, S) : !S.acted);
  /* only a CHANGE of what this tool wants is sent, and never while its own act plays (the runtime holds the lock then) */
  const lockSent = useRef(false);
  useEffect(() => {
    if (busy.current) return;
    /* the correction does not hold the pad: a lock set one frame after the miss raced the child's (and check's) next digit;
       the board itself ignores taps while it plays (S.tracing) and the picture fits beside an open keypad */
    const want = !!(gateOn && MI_TOUCH.on && isUser());
    if (lockSent.current === want) return;
    lockSent.current = want;
    api.lock(want);
  });
  /* a unit question's Enter blinks once a card is on the tag */
  useEffect(() => { if (asking && it.pad === "enter") api.answerReady(!!S.card); }, [asking, S.card, qk]);

  /* the traceback: redraw the maths and end on the whole right answer, unmarked */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    const s0 = live.current;
    if (kind === "unit") {
      /* why: the right card's size lights beside the thing, then the card is ringed and its unit pinned; the wrong card leaves the tag */
      put({ tracing: true, missed: s0.card, D: null });
      tl.run([[350, () => put({ D: { unit: it.answer, k: 1 } })], [900, () => put({ D: { unit: it.answer, k: 2 } })], [700, null]], () => put({ tracing: false, card: null }));
      return;
    }
    if (kind === "measure") {
      const gg = miGeo(it), steps: any[] = [];
      put({ tracing: true, lit: 0, tag: false, D: null });
      if (!miAligned(gg, s0)) {
        const slide = gg.mode === "slide", a = slide ? s0.kx : s0.rx, b = slide ? R.x0 : gg.zero, ay = s0.ry;
        for (let f = 1; f <= 6; f++) steps.push([70, () => put(slide ? { kx: a + (b - a) * f / 6 } : { rx: a + (b - a) * f / 6, ry: ay + (R.lane - ay) * f / 6 })]);
        steps.push([250, () => put(slide ? { kx: b } : { rx: b, ry: R.lane })]);
      }
      for (let i = 1; i <= it.cm; i++) steps.push([110, () => put({ lit: i })]);
      steps.push([300, () => put({ tag: true })]);
      tl.run(steps, () => put({ tracing: false, acted: true }));
      return;
    }
    if (kind === "rod") {
      put({ tracing: true });
      tl.run([[300, () => put({ D: { div: it.div, take: it.take, from: 0 } })], [700, null]], () => put({ tracing: false }));
    }
  }, [wrong]);

  /* the win: the maths moves (the marks light to the end, the length lands in its tag); one win line */
  useEffect(() => {
    if (stage !== "win" || free) return;
    if (item && item.win) api.say(item.win);
    if (kind === "measure") {
      const gg = miGeo(it);
      put(gg.mode === "slide" ? { kx: R.x0, D: null, carry: null } : { rx: gg.zero, ry: R.lane, D: null, carry: null });
      const st: any[] = [[0, () => put({ lit: 0, tag: false })]];
      for (let i = 1; i <= it.cm; i++) st.push([90, () => put({ lit: i })]);
      st.push([200, () => put({ tag: true })]);
      tl.run(st);
    }
    if (kind === "rod") put({ D: { div: it.div, take: it.take, from: 0, win: true } });
    if (kind === "unit") put({ D: null });
  }, [stage]);

  /* what the host and the agent read back (toolApi.getState); never the length before it is given */
  api.share({ thing: it.obj || (kind === "rod" ? "metre rod" : null), unit: kind === "unit" ? S.card : undefined,
    aligned: g ? miAligned(g, S) : undefined, parts: kind === "rod" ? S.div : undefined,
    coloured: kind === "rod" ? (S.sel || []).filter(Boolean).length : undefined });

  const won = stage === "win" || stage === "idle";
  const bench = (x: number, y: number, w: number, h: number) => (
    <g>
      <rect x={x + 4} y={y + 6} width={w} height={h} rx={22} fill="#000000" fillOpacity={0.06} />
      <rect x={x} y={y} width={w} height={h} rx={22} fill="url(#mi-bench-grad)" stroke="#C9BCA6" strokeWidth={2.5} />
      <rect x={x + 3} y={y + 3} width={w - 6} height={h - 6} rx={19} fill="none" stroke="#FFFFFF" strokeOpacity={0.8} strokeWidth={1.5} />
    </g>
  );

  /* ── draw: phase 1 ── */
  if (kind === "unit") {
    const tb = it.obj ? miUnitBox(it.obj) : null, sl = MI_U.slot;
    const dragU = dd && dd.payload && dd.payload.k === "card" && dd.moved && grab.current ? dd.payload.u : null;
    const chipAt = tb ? (it.obj === "door" ? { x: tb.x + tb.w + 18, y: tb.y + 90 } : { x: tb.x + tb.w - 120, y: tb.y + tb.h + 10 }) : null;
    const cardEl = (u: string, at: any) => {
      const placed = S.card === u;
      const tone = placed && won ? "win" : "plain";
      return (
        <g key={u} {...control("unit-" + u, tx(u))} {...drag.bind({ k: "card", u })} {...passKeys({ k: "card", u }, placed && asking)} style={{ cursor: "grab" } as any}>
          {/* while the hand carries it the card stays mounted (unseen), so a keyboard child keeps the focus on it */}
          <g opacity={S.carry === u ? 0 : 1}>{miCardArt(tx(u), S.seen[u] ? tx(MI_CAP[u]) : null, at.x, at.y, tone)}</g>
        </g>
      );
    };
    return (
      <g transform={`translate(${ox},0)`}>
        <MiDefs />
        {tb ? bench(0, 0, 790, 300) : null}
        {it.obj === "door" && tb ? <line x1={tb.x - 130} y1={tb.y + tb.h} x2={tb.x + tb.w + 130} y2={tb.y + tb.h} stroke="#2B2B2B" strokeWidth={5} strokeLinecap="round" /> : null}
        {tb ? miThingArt(it.obj, tb.x, tb.y, tb.w, tb.h) : null}
        {tb ? (
          <g pointerEvents="none">
            <line x1={tb.x + tb.w + 6} y1={tb.y + tb.h / 2} x2={sl.x} y2={sl.y + MI_U.ch / 2} stroke="#8C7A5B" strokeWidth={3} strokeDasharray="10 8" />
            <rect x={sl.x} y={sl.y} width={MI_U.cw} height={MI_U.ch} rx={18} fill="#FFFFFF" stroke="#5B6770" strokeWidth={3} strokeDasharray="14 10" filter="url(#mi-shadow)" />
            <text x={sl.x + MI_U.cw / 2} y={sl.y + MI_U.ch / 2 + 10} textAnchor="middle" fontSize={T.label} fontWeight={700} fill="#5B6770">{tx("unit")}</text>
          </g>
        ) : null}
        {MI_UNITS.map((u) => (S.card === u || dragU === u ? <rect key={"h" + u} x={MI_U.homeX[MI_UNITS.indexOf(u)]} y={MI_U.homeY} width={MI_U.cw} height={MI_U.ch} rx={18} fill="none" stroke="#C9BCA6" strokeWidth={3} strokeDasharray="12 10" /> : null))}
        {MI_UNITS.filter((u) => u !== dragU).map((u) => cardEl(u, cardPos(u, S)))}
        {dragU ? cardEl(dragU, { x: dd.x + grab.current.dx - ox, y: dd.y + grab.current.dy }) : null}
        {S.D && S.D.unit && chipAt ? (() => {
          const nt = it.obj === "door" ? { x: chipAt.x, y: chipAt.y + 76 } : { x: chipAt.x - 280, y: chipAt.y };
          return (
            <g pointerEvents="none">
              <rect x={nt.x} y={nt.y} width={266} height={64} rx={16} fill="#FFF4D6" stroke="#2B2B2B" strokeWidth={2.5} filter="url(#mi-shadow)" />
              <text x={nt.x + 133} y={nt.y + 43} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={MI_INK}>{tx(MI_CAP[S.D.unit])}</text>
              {S.D.k >= 2 ? <g>
                <rect x={chipAt.x} y={chipAt.y} width={120} height={64} rx={16} fill={tint(MI_GREEN, 0.82)} stroke={MI_GREEN} strokeWidth={4} filter="url(#mi-shadow)" />
                <text x={chipAt.x + 60} y={chipAt.y + 45} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={shade(MI_GREEN, 0.45)}>{tx(S.D.unit)}</text>
                {S.card !== S.D.unit ? <rect x={cardPos(S.D.unit, S).x - 8} y={cardPos(S.D.unit, S).y - 8} width={MI_U.cw + 16} height={MI_U.ch + 16} rx={24} fill="none" stroke={MI_GREEN} strokeWidth={5} /> : null}
              </g> : null}
            </g>
          );
        })() : null}
        {demo && stepOn && stepOn.startsWith("unit-") ? (() => { const c = cardPos(stepOn.slice(5), S); return <Invite x={c.x + MI_U.cw / 2} y={c.y + MI_U.ch / 2} w={MI_U.cw} h={MI_U.ch} rx={18} C={C} />; })() : null}
      </g>
    );
  }

  /* ── draw: phase 3 ── */
  if (kind === "rod") {
    const rx0 = RD.z, rw = 100 * RD.sc, ticks: any[] = [];
    for (let k = 0; k <= 100; k++) {
      if (k > 0 && k < 100 && k > S.marked * 10) continue;   /* the 0 and 100 end ticks from the first frame */
      const x = RD.z + k * RD.sc, len = k % 10 === 0 ? 30 : k % 5 === 0 ? 20 : 12;
      ticks.push(<line key={"t" + k} x1={x} y1={RD.top} x2={x} y2={RD.top + len} stroke={MI_INK} strokeWidth={k % 10 === 0 ? 3 : 2} strokeLinecap="round" />);
    }
    const d = S.div || 0, seg = d ? 100 / d : 0;
    /* the numbers under the rod: 0 and 100 cm always; a cut's number (the answer) only after the right answer, with the tens */
    const cutCm = d ? miCutOrder(d).slice(0, Math.min(S.divN, d - 1)).map((c) => c * seg) : [];
    const labCm = Array.from(new Set([0, ...(won ? [10, 20, 30, 40, 50, 60, 70, 80, 90, ...cutCm] : [])]));
    labCm.forEach((c) => ticks.push(<text key={"n" + c} x={RD.z + c * RD.sc} y={RD.top + RD.h + 38} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={MI_INK}>{c}</text>));
    ticks.push(<text key="n100" x={RD.z + 100 * RD.sc} y={RD.top + RD.h + 38} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={MI_INK}>100</text>);
    ticks.push(<text key="ncm" x={RD.z + 100 * RD.sc + 38} y={RD.top + RD.h + 38} fontSize={T.micro} fontWeight={700} fill={MI_INK}>{tx("cm")}</text>);
    const keysNow: string[] = demo ? (stepOn === "mark" || stepOn === "tens" ? [stepOn] : []) : asking ? ["halves", "quarters"] : [];
    const KEYLAB: any = { mark: "Mark", tens: "Tens", halves: "Halves", quarters: "Quarters" };
    const kw = 240, kgap = 40, ktot = keysNow.length * kw + (keysNow.length - 1) * kgap, kx0 = R.sw / 2 - ktot / 2, ky = 420;
    const D = S.D;
    return (
      <g transform={`translate(${ox},0)`}>
        <MiDefs />
        {bench(-6, 6, 892, 506)}
        {S.fact ? (
          <g pointerEvents="none" filter="url(#mi-shadow)">
            <rect x={510} y={36} width={340} height={66} rx={33} fill="#FFFFFF" stroke={MI_VERM} strokeWidth={3.5} />
            <text x={576} y={81} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={shade(MI_VERM, 0.3)}>{tx("1 m")}</text>
            <text x={636} y={81} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={shade(MI_VERM, 0.3)}>=</text>
            <text x={744} y={81} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={shade(MI_VERM, 0.3)}>{tx("100 cm")}</text>
          </g>
        ) : null}
        {/* the rod: its plain face, the photo, the coloured parts, the marks, the cut lines */}
        <g filter="url(#mi-shadow)">
          <rect x={rx0} y={RD.top} width={rw} height={RD.h} rx={6} fill="#E7C893" />
          <Skin name="rod" x={rx0} y={RD.top} w={rw} h={RD.h} />
          {d ? Array.from({ length: d }, (_, i) => (S.sel[i] ? (
            <g key={"s" + i} pointerEvents="none">
              <rect x={RD.z + i * seg * RD.sc} y={RD.top} width={seg * RD.sc} height={RD.h} fill={tint(MI_BLUE, 0.45)} />
              <rect x={RD.z + i * seg * RD.sc + 3} y={RD.top + RD.h + 50} width={seg * RD.sc - 6} height={22} rx={8} fill={MI_BLUE} />
            </g>
          ) : null)) : null}
          <rect x={rx0} y={RD.top} width={rw} height={RD.h} rx={6} fill="none" stroke="#2B2B2B" strokeWidth={3} />
          {ticks}
          {d ? cutCm.map((c, k) => {
            const x = RD.z + c * RD.sc;
            return <line key={"d" + k} x1={x} y1={RD.top - 16} x2={x} y2={RD.top + RD.h + 3} stroke={MI_INK} strokeWidth={6} strokeLinecap="round" />;
          }) : null}
        </g>
        {/* the parts the child taps (a transparent box over each part, so a gap never falls through) */}
        {d && S.divN >= d - 1 && !S.cutting && (demo || asking) ? Array.from({ length: d }, (_, i) => (
          <Hit key={"p" + i} id={"piece-" + (i + 1)} x={RD.z + i * seg * RD.sc} y={RD.top - 30} w={seg * RD.sc} h={RD.h + 110}
            onPress={() => { realTouch(); tapPiece(i); }} label={tx("part") + " " + (i + 1)} keep />
        )) : null}
        {/* the correction, the warm-up's result and the win: a blue bracket from the part's start and its length */}
        {D && D.div ? (
          <g pointerEvents="none">
            {!S.div || S.div !== D.div ? Array.from({ length: D.div - 1 }, (_, k) => {
              const x = RD.z + (k + 1) * (100 / D.div) * RD.sc;
              return <line key={"dd" + k} x1={x} y1={RD.top - 16} x2={x} y2={RD.top + RD.h + 3} stroke={MI_BLUE} strokeWidth={5} strokeDasharray="10 8" strokeLinecap="round" />;
            }) : null}
            {miTag(RD.z + (D.from || 0) * (100 / D.div) * RD.sc, RD.z + ((D.from || 0) + D.take) * (100 / D.div) * RD.sc, RD.top - 8,
              (D.win ? tx("Answer") + ": " : "") + `${D.take * 100 / D.div} ${tx("cm")}`, !!D.win)}
          </g>
        ) : null}
        {keysNow.map((id, j) => (
          <Key key={"act" + j} id={id} label={tx(KEYLAB[id])} x={kx0 + j * (kw + kgap)} y={ky} w={kw} h={80} C={C} tone="key" onClick={() => pressKey(id)}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{tx(KEYLAB[id])}</text>
          </Key>
        ))}
        {demo && (stepOn === "mark" || stepOn === "tens") ? <Invite x={kx0 + kw / 2} y={ky + 40} w={kw} h={80} C={C} /> : null}
        {demo && stepOn === "piece-1" && d ? <Invite x={RD.z + seg * RD.sc / 2} y={RD.top + RD.h / 2} w={seg * RD.sc} h={RD.h} rx={6} C={C} /> : null}
      </g>
    );
  }

  /* ── draw: phases 2 and 4 (and free play): a thing on the bench and the ruler ── */
  let rx = S.rx, ry = S.ry, kx = S.kx;
  const dk = dd && dd.payload && dd.moved && grab.current ? dd.payload.k : null;
  if (dk === "ruler") { rx = Math.max(0, Math.min(R.sw, dd.x + grab.current.dx - ox)); ry = Math.max(0, Math.min(520 - R.h, dd.y + grab.current.dy)); }
  if (dk === "thing") kx = Math.max(0, Math.min(R.sw - g!.L, dd.x + grab.current.dx - ox));
  const slide = g!.mode === "slide";
  const thX = slide ? kx : g!.thingX, thY = R.lane - g!.oh;
  const al = miAligned(g!, S);
  const glow = guided && !slide;
  const showTag = S.tag && (al || (slide && S.kx === R.x0));
  return (
    <g transform={`translate(${ox},0)`}>
      <MiDefs />
      {bench(-6, 6, 892, 506)}
      {/* the ruler (fixed under a thing that slides) */}
      {slide ? miRulerArt(R.x0, R.lane, S.lit, false, tx("cm")) : (
        <g {...control("ruler", tx("ruler"))} {...drag.bind({ k: "ruler" })} {...passKeys({ k: "ruler" }, al && !demo)} style={{ cursor: "grab" } as any}>
          {S.carry === "ruler" ? null : miRulerArt(rx, ry, S.lit, glow, tx("cm"))}
        </g>
      )}
      {/* the thing, its left end on the bench line */}
      {slide ? (
        <g {...control("thing", tx(it.obj))} {...drag.bind({ k: "thing" })} {...passKeys({ k: "thing" }, S.kx === R.x0)} style={{ cursor: "grab" } as any}>
          {S.carry === "thing" ? null : <g><rect x={thX} y={thY - 6} width={g!.L} height={g!.oh + 6} fill="transparent" />{miThingArt(it.obj, thX, thY, g!.L, g!.oh)}</g>}
        </g>
      ) : miThingArt(it.obj, thX, thY, g!.L, g!.oh)}
      {showTag ? miTag(thX, thX + g!.L, thY - 6, (won && !free ? tx("Answer") + ": " : "") + `${it.cm} ${tx("cm")}`, won && !free) : null}
      {/* the warm-up's second step: the eraser's right end, above the ruler */}
      {demo && warmOn && stepOn === "read" ? (
        <g>
          <Hit id="read" x={thX + g!.L - 50} y={thY - 70} w={100} h={g!.oh + 66} onPress={readAct} label={tx("eraser end")} />
          <Invite x={thX + g!.L} y={thY - 70 + (g!.oh + 66) / 2} w={100} h={g!.oh + 66} rx={14} C={C} />
        </g>
      ) : null}
      {(demo && stepOn === "ruler") || (asking && guided && !S.acted && !slide) ? <Invite x={rx} y={ry + 70} w={44} h={44} rx={12} C={C} /> : null}
      {free ? (
        <Key id="new-thing" label={tx("New thing")} x={600} y={14} w={260} h={76} C={C} tone="key" onClick={() => pressKey("new-thing")}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{tx("New thing")}</text>
        </Key>
      ) : null}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase (plain shapes, words through tx) */
function Thumb({ result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  const item = it || (last && last.it) || null;
  if (!item) return null;
  const Wd = w || 236, Hd = h || 80;
  const frame = <rect x={0} y={0} width={Wd} height={Hd} rx={12} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />;
  if (item.kind === "unit") {
    const mini = item.obj === "door" ? miPlain("door", 30, 8, Math.round((Hd - 16) / 2), Hd - 16)
      : item.obj === "road" ? miPlain("road", 12, Hd / 2 - 18, 100, 36) : miPlain("pencil", 12, Hd / 2 - 9, 100, 16);
    return (
      <g>
        {frame}{mini}
        <rect x={Wd - 100} y={Hd / 2 - 26} width={88} height={52} rx={12} fill={tint(MI_GREEN, 0.82)} stroke={MI_GREEN} strokeWidth={3} />
        <text x={Wd - 56} y={Hd / 2 + 10} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(MI_GREEN, 0.45)}>{lang === "en" || tx(item.answer) !== item.answer ? tx(item.answer) : ""}</text>
      </g>
    );
  }
  const v = (last && slotPartsOf(last.value, 1)[0]) || String(item.answer[0]);
  if (item.kind === "rod") {
    const L = 84, part = L * Number(v) / 100;   /* the label starts well clear of the picture (at least 12 apart) */
    return (
      <g>
        {frame}
        <rect x={12} y={Hd / 2 - 10} width={L} height={20} rx={4} fill="#E7C893" stroke="#2B2B2B" strokeWidth={1.5} />
        <rect x={12} y={Hd / 2 - 10} width={part} height={20} rx={2} fill={MI_BLUE} fillOpacity={0.55} />
        <text x={Wd - 14} y={Hd / 2 + 10} textAnchor="end" fontSize={T.label} fontWeight={700} fill={shade(MI_BLUE, 0.3)}>{v + (lang === "en" || tx("cm") !== "cm" ? " " + tx("cm") : "")}</text>
      </g>
    );
  }
  return (
    <g>
      {frame}
      {miPlain(item.obj, 12, Hd / 2 - 20, 76, 18)}
      <rect x={10} y={Hd / 2} width={84} height={18} rx={3} fill="#E9CF9C" stroke="#2B2B2B" strokeWidth={1.5} />
      {Array.from({ length: 6 }, (_, k) => <line key={k} x1={14 + k * 14} y1={Hd / 2} x2={14 + k * 14} y2={Hd / 2 + 8} stroke={MI_INK} strokeWidth={1.5} />)}
      <text x={Wd - 14} y={Hd / 2 + 10} textAnchor="end" fontSize={T.label} fontWeight={700} fill={shade(MI_BLUE, 0.3)}>{v + (lang === "en" || tx("cm") !== "cm" ? " " + tx("cm") : "")}</text>
    </g>
  );
}

/* the start page: a road, a classroom door and a pencil lying on a ruler from its 0 (no reading printed) */
function StartArt({ box, C, lang, tx }: any) {
  /* three things side by side with even gaps (36 each) across the 1200 box, standing on one line at y 316 */
  const rw = 476, rh = 79, rxs = 688, rys = 316 - rh, sc = 28, z = rxs + sc / 2;
  const roadW = 440, roadH = Math.round(440 / MI_THING.road.ar);
  const pl = 11 * sc, ph = Math.round(pl / MI_THING.pencil.ar);   /* 11 cm: no question's answer */
  return (
    <g>
      <MiDefs />
      {miThingArt("road", 36, 316 - roadH, roadW, roadH)}
      <line x1={482} y1={316} x2={682} y2={316} stroke="#2B2B2B" strokeWidth={4} strokeLinecap="round" />
      {miThingArt("door", 512, 36, 140, 280)}
      <g filter="url(#mi-shadow)">
        <rect x={rxs} y={rys} width={rw} height={rh} rx={8} fill="#E9CF9C" />
        <Skin name="ruler" x={rxs} y={rys} w={rw} h={rh} fit="stretch" />
        <rect x={rxs} y={rys} width={rw} height={rh} rx={8} fill="none" stroke="#2B2B2B" strokeWidth={2.5} />
        {Array.from({ length: 17 }, (_, k) => <line key={k} x1={z + k * sc} y1={rys} x2={z + k * sc} y2={rys + 26} stroke={MI_INK} strokeWidth={2.5} strokeLinecap="round" />)}
        <text x={z} y={rys + 64} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={MI_INK}>0</text>
      </g>
      {miThingArt("pencil", z, rys - ph, pl, ph)}
    </g>
  );
}

function MeasureIt(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b) */
      board: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d, PATTERNS.md §16) */
      keyOnly: true,
      /* the wide keypad: the measuring scene is laid out once in x 20 to 880, the room the open panel leaves */
      bigPad: true,
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself */
      nextKey: true,
      /* NAV DOTS (the new look; LAYOUT.md §1d) */
      navDots: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key */
      StartArt, START_HOOK,
      }} />
  );
}

export default MeasureIt;
