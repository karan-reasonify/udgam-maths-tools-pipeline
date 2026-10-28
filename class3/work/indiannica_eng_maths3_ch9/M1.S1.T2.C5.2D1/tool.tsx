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
    "Tap the cm card: a centimetre is about as wide as your finger.": "सेमी कार्ड छुओ: एक सेंटीमीटर लगभग उँगली जितना चौड़ा है।",
    "Look for the card on the left.": "बाईं ओर वाला कार्ड देखो।",
    "Tap the m card: a metre is about one big step.": "मी कार्ड को छुओ: एक मीटर लगभग एक बड़े कदम जितना होता है।",
    "The card you need is in the middle.": "तुम्हें जो कार्ड चाहिए वह बीच में है।",
    "Tap the km card: a kilometre is about a 15 minute walk.": "किमी कार्ड छुओ: एक किलोमीटर, लगभग 15 मिनट पैदल।",
    "Try the last card, on the right.": "दाईं ओर वाला आख़िरी कार्ड आज़माओ।",
    "Compare it with your hand, your classroom and the road to school.": "इसे अपने हाथ, अपनी कक्षा और स्कूल की सड़क से मिलाकर देखो।",
    "Picture walking along it: does it take a moment or a long time?": "सोचो कि तुम उस पर चल रहे हो: कुछ पल लगेंगे या बहुत देर?",
    "Short things take cm, longer take m, far places take km, and 1 km is 1,000 m.": "छोटी चीज़ें सेमी, लंबी मी, दूर की जगहें किमी में; 1 किमी = 1,000 मी।",
    "You learned: cm, m and km; 1 m = 100 cm and 1 km = 1,000 m": "तुमने सीखा: सेमी, मी और किमी; 1 मी = 100 सेमी और 1 किमी = 1,000 मी",
    "Drag the card with the best unit for the road from one town to the next.": "एक शहर से दूसरे शहर की सड़क के लिए सबसे सही इकाई वाला कार्ड खींचो।",
    "Unit for a road?": "सड़क के लिए इकाई?",
    "Could you walk from one town to the next in a few big steps?": "क्या तुम एक शहर से दूसरे शहर तक कुछ बड़े कदमों में पहुँच सकते हो?",
    "Would walking from one town to the next take many minutes?": "क्या एक शहर से दूसरे शहर तक चलने में कई मिनट लगेंगे?",
    "Is the road longer than a hundred doors put end to end?": "क्या सड़क एक कतार में रखे सौ दरवाज़ों से भी लंबी है?",
    "Now drag the card that fits a pencil.": "अब पेंसिल के लिए सही कार्ड खींचो।",
    "Unit for a pencil?": "पेंसिल के लिए इकाई?",
    "Is a pencil longer than your arm, or shorter?": "क्या पेंसिल तुम्हारी बाँह से लंबी है या छोटी?",
    "Can you hold a whole pencil in one hand?": "क्या तुम पूरी पेंसिल एक हाथ में पकड़ सकते हो?",
    "Would you need even one big step to walk along a pencil?": "क्या पेंसिल के साथ-साथ चलने के लिए एक बड़ा कदम भी चाहिए?",
    "Which card fits the height of a classroom door?": "कक्षा के दरवाज़े की ऊँचाई के लिए कौन-सा कार्ड सही है?",
    "Unit for a door?": "दरवाज़े के लिए इकाई?",
    "Would it take 15 minutes to walk past a door?": "क्या एक दरवाज़े के पास से गुज़रने में 15 मिनट लगेंगे?",
    "Is a door much taller than a pencil?": "क्या दरवाज़ा पेंसिल से बहुत ऊँचा है?",
    "Is a door about as high as two big steps?": "क्या दरवाज़ा लगभग दो बड़े कदमों जितना ऊँचा है?",
    "Measuring with a ruler from 0": "0 से शुरू करके पटरी से नापना",
    "Drag the ruler up so its 0 is at the left end of the eraser.": "पटरी को ऊपर खींचो ताकि उसका 0 रबड़ के बाएँ सिरे पर आए।",
    "Slide it until the eraser starts exactly at 0.": "इसे तब तक सरकाओ जब तक रबड़ ठीक 0 से शुरू न हो।",
    "Now tap the right end of the eraser to read its length.": "अब लंबाई पढ़ने के लिए रबड़ के दाएँ सिरे को छुओ।",
    "Tap just above where the eraser ends.": "रबड़ जहाँ खत्म होती है, उसके ठीक ऊपर छुओ।",
    "Touch each space between two marks and count them.": "दो निशानों के बीच की हर जगह को छुओ और गिनो।",
    "Look straight down from the far end to the ruler's number.": "दूर वाले सिरे से सीधे नीचे पटरी की संख्या देखो।",
    "Count the spaces from 0 to where the ribbon ends.": "0 से रिबन के सिरे तक की जगहें गिनो।",
    "Find the number right under the ribbon's right end.": "रिबन के दाएँ सिरे के ठीक नीचे की संख्या ढूँढ़ो।",
    "Hop your finger one space at a time along the pencil.": "पेंसिल के साथ उँगली को एक-एक जगह आगे बढ़ाओ।",
    "Read the number just below the pencil's sharp tip.": "पेंसिल की नुकीली नोक के ठीक नीचे की संख्या पढ़ो।",
    "Check that the ribbon's left end sits on the 0 mark.": "देखो कि रिबन का बायाँ सिरा 0 के निशान पर है।",
    "Read the big number under the far end of the ribbon.": "रिबन के दूर वाले सिरे के नीचे की बड़ी संख्या पढ़ो।",
    "Tap Halves or Quarters first.": "पहले आधे या चौथाई बटन को छुओ।",
    "length box": "लंबाई का खाना",
    "Put 0 at one end and read the number at the other end.": "0 को एक सिरे पर रखो और दूसरे सिरे की संख्या पढ़ो।",
    "You learned: put 0 at one end, read the number at the other end": "तुमने सीखा: 0 को एक सिरे पर रखो, दूसरे सिरे की संख्या पढ़ो",
    "Measure the ribbon with the ruler, then type its length.": "पटरी से रिबन नापो, फिर उसकी लंबाई लिखो।",
    "Ribbon length?": "रिबन की लंबाई?",
    "Is your first space the one that starts at 0?": "क्या तुम्हारी पटरी 0 से शुरू हो रही है?",
    "length": "लंबाई",
    "cm": "सेमी",
    "m": "मी",
    "km": "किमी",
    "Now measure the pencil the same way.": "अब पेंसिल को भी इसी तरह नापो।",
    "Pencil length?": "पेंसिल की लंबाई?",
    "Count again, slowly, from the start.": "शुरू से धीरे-धीरे गिनो।",
    "Measure this longer ribbon from 0 as well.": "इस लंबे रिबन को भी 0 से नापो।",
    "Look again at both ends of the ribbon.": "रिबन के दोनों सिरों को फिर से देखो।",
    "The metre rod: halves and quarters": "मीटर छड़: आधे और चौथाई",
    "Tap Mark to mark the metre rod in centimetres.": "छड़ पर सेंटीमीटर अंकित करने के लिए निशान बटन छुओ।",
    "The Mark key is under the rod.": "निशान बटन छड़ के नीचे है।",
    "Tap Halves to get ready to cut the rod in 2 equal parts.": "छड़ को 2 बराबर भागों में काटने के लिए आधे बटन को छुओ।",
    "Find the key that says Halves.": "आधे लिखा हुआ बटन ढूँढ़ो।",
    "Now tap the middle of the rod to cut it.": "अब काटने के लिए छड़ के बीच में छुओ।",
    "Tap the rod halfway between its two ends.": "छड़ के दोनों सिरों के ठीक बीच में छुओ।",
    "The whole rod is 100 cm: split it into equal parts.": "पूरी छड़ 100 सेमी की है: इसे बराबर भागों में बाँटो।",
    "How many cm is one of the equal parts?": "एक बराबर भाग कितने सेमी का है?",
    "Put the 2 coloured quarters together: what part of the rod is that?": "2 रंगे हुए चौथाई भाग मिलाओ: यह छड़ का कौन-सा भाग है?",
    "So a metre rod shares into 2 halves of 50 cm or 4 quarters of 25 cm.": "मीटर छड़ में 50 सेमी के 2 आधे या 25 सेमी के 4 चौथाई भाग।",
    "You learned: half a metre is 50 cm and a quarter of a metre is 25 cm": "तुमने सीखा: आधा मीटर 50 सेमी और चौथाई मीटर 25 सेमी होता है",
    "Cut the rod in halves, colour one half, then type how many cm half a metre is.": "छड़ के दो आधे करो, एक आधा रंगो, फिर लिखो कि आधा मीटर कितने सेमी है।",
    "Half a metre?": "आधा मीटर?",
    "Half a metre is 1 of 2 equal parts of the rod.": "आधा मीटर, छड़ के 2 बराबर भागों में से 1 भाग है।",
    "Now cut the rod in quarters and colour one quarter: how many cm is it?": "अब छड़ के चार चौथाई करो और एक रंगो: वह कितने सेमी है?",
    "A quarter of a metre?": "चौथाई मीटर?",
    "A quarter is half of a half, so it ends before the half.": "चौथाई, आधे का आधा होता है, इसलिए वह आधे से पहले खत्म होता है।",
    "Cut the rod in quarters, colour 2 of them: how many cm do they make?": "छड़ के चौथाई करो, 2 रंगो: वे कितने सेमी होते हैं?",
    "2 quarters?": "2 चौथाई?",
    "Look at where the key starts on the ruler.": "देखो, चाबी पटरी पर कहाँ से शुरू होती है।",
    "A length is counted from the 0 mark, not from 3.": "लंबाई 0 के निशान से गिनी जाती है, 3 से नहीं।",
    "Which number is under the crayon's left end?": "क्रेयॉन के बाएँ सिरे के नीचे कौन-सी संख्या है?",
    "Measuring starts at 0, so this ruler is in the wrong place.": "नापना 0 से शुरू होता है, इसलिए यह पटरी गलत जगह है।",
    "Drag it, or use the arrow keys.": "इसे खींचो, या तीर वाले बटन दबाओ।",
    "Tap the rod where the cut goes.": "जहाँ काटना है, छड़ पर वहाँ छुओ।",
    "The parts must be equal, so try another place.": "भाग बराबर होने चाहिए, दूसरी जगह आज़माओ।",
    "Tap inside the ring.": "गोले के अंदर छुओ।",
    "Colour the parts the question asks for.": "प्रश्न में जितने भाग कहे गए हैं, उतने रंगो।",
    "rod": "छड़",
    "Measuring new things": "नई चीज़ें नापना",
    "Now measure new things on your own.": "अब नई चीज़ें खुद नापो।",
    "Use the ruler's marks, one centimetre at a time.": "पटरी के निशान इस्तेमाल करो, एक-एक सेंटीमीटर करके।",
    "The 0 mark goes at one end of the thing.": "0 का निशान चीज़ के एक सिरे पर आता है।",
    "You measured every new thing from 0, well done.": "तुमने हर नई चीज़ 0 से नापी, बहुत अच्छा किया।",
    "You learned: start at 0 every time, whatever you measure": "तुमने सीखा: कुछ भी नापो, हर बार 0 से शुरू करो",
    "Measure the comb with the ruler and type its length.": "पटरी से कंघी नापो और उसकी लंबाई लिखो।",
    "Comb length?": "कंघी की लंबाई?",
    "Count the spaces from one end to the other.": "एक सिरे से दूसरे सिरे तक की जगहें गिनो।",
    "Check that the comb's left end sits on the 0 mark.": "देखो कि कंघी का बायाँ सिरा 0 के निशान पर है।",
    "Start at 0, then read the number under the far end.": "0 से शुरू करो, फिर दूर वाले सिरे के नीचे की संख्या पढ़ो।",
    "Find the key's length.": "चाबी की लंबाई ढूँढ़ो।",
    "Key length?": "चाबी की लंबाई?",
    "Slide the key so its round end sits on the 0 mark.": "चाबी सरकाओ ताकि उसका गोल सिरा 0 पर आए।",
    "How long is the crayon?": "क्रेयॉन कितना लंबा है?",
    "Crayon length?": "क्रेयॉन की लंबाई?",
    "The crayon starts at the 1 mark, so move the ruler until its 0 meets the crayon.": "क्रेयॉन 1 से शुरू है, पटरी का 0 क्रेयॉन तक सरकाओ।",
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
    "Short things take cm, longer take m, far places take km, and 1 km is 1,000 m.": "ટૂંકી વસ્તુ સેમી, લાંબી મી, દૂરની જગ્યા કિમીમાં; 1 કિમી = 1,000 મી.",
    "You learned: cm, m and km; 1 m = 100 cm and 1 km = 1,000 m": "તમે શીખ્યા: સેમી, મી અને કિમી; 1 મી = 100 સેમી અને 1 કિમી = 1,000 મી",
    "Drag the card with the best unit for the road from one town to the next.": "એક શહેરથી બીજા શહેર સુધીના રસ્તા માટે સૌથી યોગ્ય એકમવાળું કાર્ડ ખેંચો.",
    "Unit for a road?": "રસ્તા માટે એકમ?",
    "Could you walk from one town to the next in a few big steps?": "શું તમે એક શહેરથી બીજા શહેર સુધી થોડા મોટા ડગલામાં પહોંચી શકો?",
    "Would walking from one town to the next take many minutes?": "શું એક શહેરથી બીજા શહેર સુધી ચાલવામાં ઘણી મિનિટ લાગશે?",
    "Is the road longer than a hundred doors put end to end?": "શું રસ્તો એક લાઇનમાં મૂકેલા સો દરવાજા કરતાં પણ લાંબો છે?",
    "Now drag the card that fits a pencil.": "હવે પેન્સિલ માટે યોગ્ય કાર્ડ ખેંચો.",
    "Unit for a pencil?": "પેન્સિલ માટે એકમ?",
    "Is a pencil longer than your arm, or shorter?": "શું પેન્સિલ તમારા આખા હાથ કરતાં લાંબી છે કે ટૂંકી?",
    "Can you hold a whole pencil in one hand?": "શું તમે આખી પેન્સિલ એક હાથમાં પકડી શકો?",
    "Would you need even one big step to walk along a pencil?": "શું પેન્સિલ જેટલું ચાલવા માટે એક મોટું ડગલું પણ જોઈએ?",
    "Which card fits the height of a classroom door?": "વર્ગના દરવાજાની ઊંચાઈ માટે કયું કાર્ડ યોગ્ય છે?",
    "Unit for a door?": "દરવાજા માટે એકમ?",
    "Would it take 15 minutes to walk past a door?": "શું એક દરવાજા પાસેથી પસાર થવામાં 15 મિનિટ લાગશે?",
    "Is a door much taller than a pencil?": "શું દરવાજો પેન્સિલ કરતાં ઘણો ઊંચો છે?",
    "Is a door about as high as two big steps?": "શું દરવાજો લગભગ બે મોટા ડગલા જેટલો ઊંચો છે?",
    "Measuring with a ruler from 0": "0 થી શરૂ કરીને પટ્ટીથી માપવું",
    "Drag the ruler up so its 0 is at the left end of the eraser.": "પટ્ટીને ઉપર ખેંચો, જેથી તેનો 0 રબરના ડાબા છેડે આવે.",
    "Slide it until the eraser starts exactly at 0.": "રબર બરાબર 0 થી શરૂ થાય ત્યાં સુધી તેને સરકાવો.",
    "Now tap the right end of the eraser to read its length.": "હવે લંબાઈ વાંચવા રબરના જમણા છેડાને સ્પર્શ કરો.",
    "Tap just above where the eraser ends.": "રબર જ્યાં પૂરું થાય છે તેની બરાબર ઉપર સ્પર્શ કરો.",
    "Touch each space between two marks and count them.": "બે નિશાન વચ્ચેની દરેક જગ્યાને સ્પર્શ કરો અને ગણો.",
    "Look straight down from the far end to the ruler's number.": "દૂરના છેડેથી સીધા નીચે પટ્ટીનો આંકડો જુઓ.",
    "Count the spaces from 0 to where the ribbon ends.": "0 થી રિબનના છેડા સુધીની જગ્યાઓ ગણો.",
    "Find the number right under the ribbon's right end.": "રિબનના જમણા છેડાની બરાબર નીચેનો આંકડો શોધો.",
    "Hop your finger one space at a time along the pencil.": "પેન્સિલ સાથે આંગળીને એક-એક જગ્યા આગળ ખસેડો.",
    "Read the number just below the pencil's sharp tip.": "પેન્સિલની અણીની બરાબર નીચેનો આંકડો વાંચો.",
    "Check that the ribbon's left end sits on the 0 mark.": "જુઓ કે રિબનનો ડાબો છેડો 0 ના નિશાન પર છે.",
    "Read the big number under the far end of the ribbon.": "રિબનના દૂરના છેડા નીચેનો મોટો આંકડો વાંચો.",
    "Tap Halves or Quarters first.": "પહેલાં અડધા કે ચોથા ભાગ બટનને સ્પર્શ કરો.",
    "length box": "લંબાઈનું ખાનું",
    "Put 0 at one end and read the number at the other end.": "0 ને એક છેડે મૂકો અને બીજા છેડાનો આંકડો વાંચો.",
    "You learned: put 0 at one end, read the number at the other end": "તમે શીખ્યા: 0 ને એક છેડે મૂકો, બીજા છેડાનો આંકડો વાંચો",
    "Measure the ribbon with the ruler, then type its length.": "પટ્ટીથી રિબન માપો, પછી તેની લંબાઈ લખો.",
    "Ribbon length?": "રિબનની લંબાઈ?",
    "Is your first space the one that starts at 0?": "શું તમારી પટ્ટી 0 થી શરૂ થાય છે?",
    "length": "લંબાઈ",
    "cm": "સેમી",
    "m": "મી",
    "km": "કિમી",
    "Now measure the pencil the same way.": "હવે પેન્સિલને પણ આ જ રીતે માપો.",
    "Pencil length?": "પેન્સિલની લંબાઈ?",
    "Count again, slowly, from the start.": "શરૂઆતથી ધીમે ધીમે ગણો.",
    "Measure this longer ribbon from 0 as well.": "આ લાંબા રિબનને પણ 0 થી માપો.",
    "Look again at both ends of the ribbon.": "રિબનના બંને છેડા ફરીથી જુઓ.",
    "The metre rod: halves and quarters": "મીટરનો સળિયો: અડધા અને ચોથા ભાગ",
    "Tap Mark to mark the metre rod in centimetres.": "સળિયા પર સેન્ટીમીટર આંકવા નિશાન બટનને સ્પર્શ કરો.",
    "The Mark key is under the rod.": "નિશાન બટન સળિયાની નીચે છે.",
    "Tap Halves to get ready to cut the rod in 2 equal parts.": "સળિયાના 2 સરખા ભાગ કરવા અડધા બટનને સ્પર્શ કરો.",
    "Find the key that says Halves.": "જેના પર અડધા લખેલું છે તે બટન શોધો.",
    "Now tap the middle of the rod to cut it.": "હવે કાપવા માટે સળિયાની વચ્ચે સ્પર્શ કરો.",
    "Tap the rod halfway between its two ends.": "સળિયાના બંને છેડાની બરાબર વચ્ચે સ્પર્શ કરો.",
    "The whole rod is 100 cm: split it into equal parts.": "આખો સળિયો 100 સેમી નો છે: તેના સરખા ભાગ કરો.",
    "How many cm is one of the equal parts?": "એક સરખો ભાગ કેટલા સેમી નો છે?",
    "Put the 2 coloured quarters together: what part of the rod is that?": "2 રંગેલા ચોથા ભાગ ભેગા કરો: તે સળિયાનો કયો ભાગ છે?",
    "So a metre rod shares into 2 halves of 50 cm or 4 quarters of 25 cm.": "તેથી મીટરના સળિયાના 50 સેમી ના 2 અડધા ભાગ અથવા 25 સેમી ના 4 ચોથા ભાગ થાય છે.",
    "You learned: half a metre is 50 cm and a quarter of a metre is 25 cm": "તમે શીખ્યા: અડધો મીટર 50 સેમી અને મીટરનો ચોથો ભાગ 25 સેમી",
    "Cut the rod in halves, colour one half, then type how many cm half a metre is.": "સળિયાના બે અડધા કરો, એક અડધો રંગો, પછી લખો કે અડધો મીટર કેટલા સેમી છે.",
    "Half a metre?": "અડધો મીટર?",
    "Half a metre is 1 of 2 equal parts of the rod.": "અડધો મીટર એટલે સળિયાના 2 સરખા ભાગમાંથી 1 ભાગ.",
    "Now cut the rod in quarters and colour one quarter: how many cm is it?": "હવે સળિયાના ચાર ચોથા ભાગ કરો અને એક રંગો: તે કેટલા સેમી છે?",
    "A quarter of a metre?": "મીટરનો ચોથો ભાગ?",
    "A quarter is half of a half, so it ends before the half.": "ચોથો ભાગ અડધાનો અડધો હોય છે, તેથી તે અડધા પહેલાં પૂરો થાય છે.",
    "Cut the rod in quarters, colour 2 of them: how many cm do they make?": "સળિયાના ચોથા ભાગ કરો, 2 રંગો: તે કેટલા સેમી થાય?",
    "2 quarters?": "2 ચોથા ભાગ?",
    "Look at where the key starts on the ruler.": "જુઓ, ચાવી પટ્ટી પર ક્યાંથી શરૂ થાય છે.",
    "A length is counted from the 0 mark, not from 3.": "લંબાઈ 0 ના નિશાનથી ગણાય છે, 3 થી નહીં.",
    "Which number is under the crayon's left end?": "ક્રેયોનના ડાબા છેડા નીચે કયો આંકડો છે?",
    "Measuring starts at 0, so this ruler is in the wrong place.": "માપવાનું 0 થી શરૂ થાય છે, તેથી આ પટ્ટી ખોટી જગ્યાએ છે.",
    "Drag it, or use the arrow keys.": "તેને ખેંચો, અથવા તીરનાં બટન દબાવો.",
    "Tap the rod where the cut goes.": "જ્યાં કાપવું છે, સળિયા પર ત્યાં સ્પર્શ કરો.",
    "The parts must be equal, so try another place.": "ભાગ સરખા હોવા જોઈએ, બીજી જગ્યા અજમાવો.",
    "Tap inside the ring.": "વર્તુળની અંદર સ્પર્શ કરો.",
    "Colour the parts the question asks for.": "પ્રશ્નમાં કહ્યા છે એટલા ભાગ રંગો.",
    "rod": "સળિયો",
    "Measuring new things": "નવી વસ્તુઓ માપવી",
    "Now measure new things on your own.": "હવે નવી વસ્તુઓ જાતે માપો.",
    "Use the ruler's marks, one centimetre at a time.": "પટ્ટીનાં નિશાન વાપરો, એક એક સેન્ટીમીટર કરીને.",
    "The 0 mark goes at one end of the thing.": "0 નું નિશાન વસ્તુના એક છેડે આવે છે.",
    "You measured every new thing from 0, well done.": "તમે દરેક નવી વસ્તુ 0 થી માપી, ખૂબ સરસ કામ કર્યું.",
    "You learned: start at 0 every time, whatever you measure": "તમે શીખ્યા: ગમે તે માપો, દર વખતે 0 થી શરૂ કરો",
    "Measure the comb with the ruler and type its length.": "પટ્ટીથી કાંસકો માપો અને તેની લંબાઈ લખો.",
    "Comb length?": "કાંસકાની લંબાઈ?",
    "Count the spaces from one end to the other.": "એક છેડેથી બીજા છેડા સુધીની જગ્યાઓ ગણો.",
    "Check that the comb's left end sits on the 0 mark.": "જુઓ કે કાંસકાનો ડાબો છેડો 0 ના નિશાન પર છે.",
    "Start at 0, then read the number under the far end.": "0 થી શરૂ કરો, પછી દૂરના છેડા નીચેનો આંકડો વાંચો.",
    "Find the key's length.": "ચાવીની લંબાઈ શોધો.",
    "Key length?": "ચાવીની લંબાઈ?",
    "Slide the key so its round end sits on the 0 mark.": "ચાવીને સરકાવો, જેથી તેનો ગોળ છેડો 0 ના નિશાન પર આવે.",
    "How long is the crayon?": "ક્રેયોન કેટલું લાંબું છે?",
    "Crayon length?": "ક્રેયોનની લંબાઈ?",
    "The crayon starts at the 1 mark, so move the ruler until its 0 meets the crayon.": "ક્રેયોન 1 થી શરૂ થાય છે, પટ્ટીનો 0 ક્રેયોન સુધી ખસેડો.",
    /* printed at run time (win lines, nudges) and drawn by Work through tx */
    "Correct, a road between towns is measured in kilometres.": "સાચું, શહેરો વચ્ચેનો રસ્તો કિલોમીટરમાં મપાય છે.",
    "Correct, a pencil can be measured in centimetres.": "સાચું, પેન્સિલ સેન્ટીમીટરમાં માપી શકાય છે.",
    "Correct, a door can be measured in metres.": "સાચું, દરવાજો મીટરમાં માપી શકાય છે.",
    "Correct, the ribbon is 9 cm long.": "સાચું, રિબનની લંબાઈ 9 સેમી છે.",
    "Correct, the pencil is 12 cm long.": "સાચું, પેન્સિલની લંબાઈ 12 સેમી છે.",
    "Correct, this ribbon is 14 cm long.": "સાચું, આ રિબનની લંબાઈ 14 સેમી છે.",
    "Correct, half a metre is 50 cm.": "સાચું, અડધો મીટર એટલે 50 સેમી.",
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
/* ink: where each photo's visible ink starts and ends across its width (measured on the pictures' alpha, round 2c): the photo is
   drawn that much wider and clipped to the box, so a measured thing's ink meets the 0 tick and its whole-cm tick; the road's ink
   is cut on the gap after its sixth dash (its own right end is a half dash) */
const MI_THING: any = {
  pencil: { skin: "pencil", ar: 800 / 105, ink: [2 / 800, 791 / 800] },
  book: { skin: "book", ar: 119 / 150 },
  ribbon: { skin: "ribbon", ar: 689 / 120, ink: [3 / 689, 683 / 689] },   /* a tile: both ends straight and square, the box's edges */
  eraser: { skin: "eraser", ar: 291 / 150, ink: [2 / 291, 289 / 291] },
  key: { skin: "key", ar: 440 / 140, ink: [2 / 440, 438 / 440] },
  comb: { skin: "comb", ar: 600 / 150, ink: [2 / 600, 598 / 600] },
  crayon: { skin: "crayon", ar: 600 / 89, ink: [2 / 600, 598 / 600] },
  door: { skin: "door", ar: 200 / 397 },
  road: { skin: "road", ar: 648 / 228, ink: [0, 560 / 648] },
};
/* the aspect of what shows of a thing (its ink across, its full height) */
const miInkAr = (obj: string) => { const t = MI_THING[obj] || {}, k = t.ink || [0, 1]; return (t.ar || 1) * (k[1] - k[0]); };
/* the ruler: 0 to 16 cm, 42 units a centimetre, half a centimetre of blank wood before 0 and 2.4 after 16 (the unit sits
   inside the wood, clear of 16 and of the end); the bench line (lane) where a thing lies and the ruler's top edge meets it; the
   ruler's home under the bench, 1 cm to the right and clear of the board's foot; the scene is 880 wide, laid out once from the
   OPEN keypad's room (x 12 to 892), so nothing moves when it opens */
const MI_R = { sc: 42, cm: 16, mg: 0.5, mgR: 2.4, h: 118, lane: 250, homeY: 380, x0: 40, sw: 880, ox: 12, homeCm: 1 };
/* the metre rod: 0 to 100 cm, 7.2 units a centimetre; the wood runs from the 0 tick to the 100 tick, its face at its own aspect */
const MI_ROD = { z: 24, sc: 7.2, top: 196, h: 46 };
/* phase 1: the thing at the top, the tag it hangs from at the right, the three unit cards below (tall enough for a 32 caption
   chip and the Hindi and Gujarati matras over the title) */
/* (round 2e) the cards stand at 336 so the correction's copies (up to 60 high, the door 30 x 60) fit between the tag and the cards */
const MI_U = { cw: 300, ch: 160, homeY: 336, homeX: [80, 440, 800], slot: { x: 860, y: 100 }, sw: 1180 };
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
const MI_CUT_LINE = "Tap the rod where the cut goes.";
const MI_EQUAL = "The parts must be equal, so try another place.";
const MI_RING = "Tap inside the ring.";
const MI_COLOUR = "Colour the parts the question asks for.";
const MI_MODE_FIRST = "Tap Halves or Quarters first.";
/* the phases whose ruler (or key) has played its one demonstration move */
const MI_DEMOED: any = {};
/* where the child's taps cut the rod: halves at 50, quarters at 25, 50 and 75 (cm) */
const miCutTargets = (d: number) => Array.from({ length: d - 1 }, (_, k) => ((k + 1) * 100) / d);
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
    closing: "Short things take cm, longer take m, far places take km, and 1 km is 1,000 m.",
    learned: "You learned: cm, m and km; 1 m = 100 cm and 1 km = 1,000 m",
    /* MISS HIDES THE ANSWER (the owner, 2026-10-28): nothing singles out the right card after a miss */
    traceback: "A small copy of the thing appears beside each of the three cards' sizes, none singled out, and the wrong card leaves the tag.",
    items: [
      /* authored (qid null): the owner's phase 1 (choose the unit) replaced the plan's handspan phase, whose questions (C5) were dropped.
         Ungated (the coordinator, 2026-10-28): the card on the tag IS the answer, so there is no act before it. Not in card order. */
      { qid: null, kind: "unit", obj: "road", pad: "enter", answer: "km", near: "m", winMs: 2400,
        say: "Drag the card with the best unit for the road from one town to the next.", ask: "Unit for a road?",
        miss: "Could you walk from one town to the next in a few big steps?",
        ladder: ["Is the road longer than a hundred doors put end to end?", "Would walking from one town to the next take many minutes?"],
        win: "Correct, a road between towns is measured in kilometres." },
      { qid: null, kind: "unit", obj: "pencil", pad: "enter", answer: "cm", near: "m", winMs: 2400,
        say: "Now drag the card that fits a pencil.", ask: "Unit for a pencil?",
        miss: "Is a pencil longer than your arm, or shorter?",
        ladder: ["Can you hold a whole pencil in one hand?", "Would you need even one big step to walk along a pencil?"],
        win: "Correct, a pencil can be measured in centimetres." },
      { qid: null, kind: "unit", obj: "door", pad: "enter", answer: "m", near: "km", winMs: 2400,
        say: "Which card fits the height of a classroom door?", ask: "Unit for a door?",
        miss: "Would it take 15 minutes to walk past a door?",
        ladder: ["Is a door much taller than a pencil?", "Is a door about as high as two big steps?"],
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
      { say: "Drag the ruler up so its 0 is at the left end of the eraser.", on: "ruler", hint: "Slide it until the eraser starts exactly at 0." },
      { say: "Now tap the right end of the eraser to read its length.", on: "read", hint: "Tap just above where the eraser ends." },
    ],
    stepHold: 2000,
    ladder: ["Touch each space between two marks and count them.", "Look straight down from the far end to the ruler's number."],
    closing: "Put 0 at one end and read the number at the other end.",
    learned: "You learned: put 0 at one end, read the number at the other end",
    traceback: "The ruler slides so its 0 meets the left end and the marks light one by one from 0, stopping one mark short of the end; no number is printed.",
    items: [
      /* authored (qid null): the plan's C6 questions choose units (now phase 1's work); the ribbon's 9 cm is the plan's ME3 reading */
      { qid: null, kind: "measure", obj: "ribbon", cm: 9, parts: MI_CM, answer: [9],
        say: "Measure the ribbon with the ruler, then type its length.", ask: "Ribbon length?",
        miss: "Is your first space the one that starts at 0?",
        /* each question its own rungs, weak to strong, never the answer (round 2c) */
        ladder: ["Count the spaces from 0 to where the ribbon ends.", "Find the number right under the ribbon's right end."],
        win: "Correct, the ribbon is 9 cm long." },
      { qid: null, kind: "measure", obj: "pencil", cm: 12, parts: MI_CM, answer: [12],
        say: "Now measure the pencil the same way.", ask: "Pencil length?",
        miss: "Count again, slowly, from the start.",
        ladder: ["Hop your finger one space at a time along the pencil.", "Read the number just below the pencil's sharp tip."],
        win: "Correct, the pencil is 12 cm long." },
      { qid: null, kind: "measure", obj: "ribbon", cm: 14, parts: MI_CM, answer: [14],
        say: "Measure this longer ribbon from 0 as well.", ask: "Ribbon length?",
        miss: "Look again at both ends of the ribbon.",
        ladder: ["Check that the ribbon's left end sits on the 0 mark.", "Read the big number under the far end of the ribbon."],
        win: "Correct, this ribbon is 14 cm long." },
    ],
  },
  {
    n: 3,
    concept: "The metre rod: halves and quarters",
    conceptId: "M1.S1.T2.C7", objectiveIds: ["O2"],
    says: ["A metre rod is 100 cm long."],
    /* warm-up (the owner, round 2): mark the rod, choose Halves, then the child taps the rod at its middle to cut it */
    warm: { kind: "rod", warm: true },
    steps: [
      { say: "Tap Mark to mark the metre rod in centimetres.", on: "mark", hint: "The Mark key is under the rod." },
      { say: "Tap Halves to get ready to cut the rod in 2 equal parts.", on: "halves", hint: "Find the key that says Halves." },
      { say: "Now tap the middle of the rod to cut it.", on: "rod", hint: "Tap the rod halfway between its two ends." },
    ],
    stepHold: 2000,
    ladder: ["The whole rod is 100 cm: split it into equal parts.", "How many cm is one of the equal parts?"],
    closing: "So a metre rod shares into 2 halves of 50 cm or 4 quarters of 25 cm.",
    learned: "You learned: half a metre is 50 cm and a quarter of a metre is 25 cm",
    traceback: "The rod shows the asked equal parts as dashed cut lines, with no number on any cut and no bracket.",
    items: [
      /* authored (qid null): the owner's phase 3 (the metre rod in halves and quarters); the plan's C7 questions are ruler readings.
         near = the folded-twice mix-up (a half read as a quarter's 25, a quarter as the half's 50) */
      { qid: null, kind: "rod", div: 2, take: 1, near: 25, parts: MI_CM, answer: [50],
        say: "Cut the rod in halves, colour one half, then type how many cm half a metre is.", ask: "Half a metre?",
        miss: "Half a metre is 1 of 2 equal parts of the rod.",
        win: "Correct, half a metre is 50 cm." },
      { qid: null, kind: "rod", div: 4, take: 1, near: 50, parts: MI_CM, answer: [25],
        say: "Now cut the rod in quarters and colour one quarter: how many cm is it?", ask: "A quarter of a metre?",
        miss: "A quarter is half of a half, so it ends before the half.",
        win: "Correct, a quarter of a metre is 25 cm." },
      { qid: null, kind: "rod", div: 4, take: 2, near: 25, parts: MI_CM, answer: [50],
        say: "Cut the rod in quarters, colour 2 of them: how many cm do they make?", ask: "2 quarters?",
        miss: "Put the 2 coloured quarters together: what part of the rod is that?",
        win: "Correct, 2 quarters are 50 cm long." },
    ],
  },
  {
    n: 4,
    concept: "Measuring new things",
    conceptId: "M1.S1.T2.C8", objectiveIds: ["O2"],
    says: ["Now measure new things on your own."],
    ladder: ["Use the ruler's marks, one centimetre at a time.", "The 0 mark goes at one end of the thing."],
    closing: "You measured every new thing from 0, well done.",
    learned: "You learned: start at 0 every time, whatever you measure",
    traceback: "The thing or the ruler slides so 0 meets one end; no end mark is lit and no length is printed.",
    items: [
      /* authored (qid null): new things with fewer visual hints (no glowing 0, no invite); a tap does NOT line anything up here,
         the child drags it (or nudges it with the arrow keys) to 0 */
      { qid: null, kind: "measure", obj: "comb", cm: 13, parts: MI_CM, answer: [13],
        say: "Measure the comb with the ruler and type its length.", ask: "Comb length?",
        miss: "Count the spaces from one end to the other.",
        ladder: ["Check that the comb's left end sits on the 0 mark.", "Start at 0, then read the number under the far end."],
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
        ladder: ["Measuring starts at 0, so this ruler is in the wrong place.", "The crayon starts at the 1 mark, so move the ruler until its 0 meets the crayon."],
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
const miRodOk = (it: any, s: any) => !!it && s.div === it.div && (s.cuts || []).length === it.div - 1 && !s.cutting && (s.sel || []).filter(Boolean).length === it.take;
/* the order the pencil cuts the rod: a quarter is half of a half, so the middle (50) first, then 25 and 75 */
const miCutOrder = (d: number) => (d === 4 ? [2, 1, 3] : Array.from({ length: d - 1 }, (_, k) => k + 1));
const miAligned = (g: any, s: any) => (g.mode === "slide" ? s.kx === MI_R.x0 : s.rx === g.zero && s.ry === MI_R.lane);
function miFresh(it: any, qk: string) {
  const s: any = { qk, acted: false, tracing: false, D: null, lit: 0, tag: false, carry: null, nudged: false, missed: null };
  if (it.kind === "unit") Object.assign(s, { card: null, seen: it.warm ? {} : { cm: 1, m: 1, km: 1 } });
  if (it.kind === "measure") { const g = miGeo(it); Object.assign(s, { rx: g.home.x, ry: g.home.y, kx: g.thingX }); }
  if (it.kind === "rod") Object.assign(s, { marked: it.warm ? 0 : 10, fact: !it.warm, div: 0, divN: 0, cuts: [], sel: [], kmark: 0, pointer: null, hintN: 0 });
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
      <rect x={x} y={y} width={w} height={h} fill="#B5172E" stroke="#2B2B2B" strokeWidth={2.4} />
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
function miThingArt(obj: string, x: number, y: number, w: number, h: number, clip?: string, opt: any = {}) {
  const t = MI_THING[obj] || {};
  const clear = miHasSkin(t.skin);
  /* the photo drawn wider by its transparent margins (opt.raw: the whole photo in the box) and clipped to the box */
  const ink = t.ink && !opt.raw ? t.ink : null, sw = ink ? w / (ink[1] - ink[0]) : w, sx = ink ? x - ink[0] * sw : x;
  const cid = ink && t.skin ? `mi-ink-${obj}-${Math.round(x)}-${Math.round(y)}-${Math.round(w)}` : "";
  return (
    <g filter={opt.flat ? undefined : "url(#mi-shadow)"}>
      <g fillOpacity={clear ? 0 : 1} strokeOpacity={clear ? 0 : 1}>{miPlain(obj, x, y, w, h)}</g>
      {cid ? <clipPath id={cid}><rect x={x} y={y - 4} width={w} height={h + 8} /></clipPath> : null}
      {t.skin ? <Skin name={t.skin} x={sx} y={y} w={sw} h={h} fit={t.strip ? "slice" : "stretch"} clip={clip || (cid ? `url(#${cid})` : undefined)} /> : null}
      {t.strip ? <rect x={x} y={y} width={w} height={h} rx={4} fill="none" stroke="#2B2B2B" strokeWidth={2.5} /> : null}
    </g>
  );
}
/* the ruler: its photo body, then the scale drawn in code (a tick every centimetre and half, a number every centimetre);
   zx is where its 0 stands, ty its top edge. lit lights the marks 1 to lit in blue; glow sets the 0 on a white pill */
/* revealEnd (the win only): the lit end mark is the answer, tagged data-reveals; every other number is the printed scale (data-scale) */
function miRulerArt(zx: number, ty: number, lit: number, glow: boolean, cmLab = "cm", revealEnd = false) {
  const R = MI_R, x = zx - R.mg * R.sc, w = (R.cm + R.mg + R.mgR) * R.sc, marks: any[] = [];
  for (let k = 0; k <= R.cm; k++) {
    const mx = zx + k * R.sc, on = k >= 1 && k <= lit;
    marks.push(<line key={"t" + k} x1={mx} y1={ty} x2={mx} y2={ty + 36} stroke={on ? MI_BLUE : MI_INK} strokeWidth={on ? 5 : 3} strokeLinecap="round" />);
    if (k < R.cm) marks.push(<line key={"h" + k} x1={mx + R.sc / 2} y1={ty} x2={mx + R.sc / 2} y2={ty + 18} stroke={MI_INK} strokeWidth={2.4} strokeLinecap="round" />);
    const rv = revealEnd && k === lit ? { "data-reveals": "answer" } : { "data-scale": "" };
    marks.push(<text key={"n" + k} {...rv} x={mx} y={ty + 84} textAnchor="middle" fontSize={T.label} fontWeight={on ? 800 : 700} fill={on ? shade(MI_BLUE, 0.3) : MI_INK}>{k}</text>);
  }
  return (
    <g filter="url(#mi-shadow)">
      <rect x={x} y={ty} width={w} height={R.h} rx={10} fill="#E9CF9C" />
      <Skin name="ruler" x={x} y={ty} w={w} h={R.h} fit="stretch" />
      <rect x={x} y={ty} width={w} height={R.h} rx={10} fill="none" stroke="#2B2B2B" strokeWidth={2.5} />
      {/* the 0 start mark: ink, never the Answer green (green is the confirmed length's only) */}
      {glow ? <rect x={zx - 22} y={ty + 48} width={44} height={44} rx={12} fill="#FFFFFF" fillOpacity={0.92} stroke={MI_INK} strokeWidth={3} filter="url(#mi-shadow)" /> : null}
      {marks}<text x={zx + R.cm * R.sc + 32} y={ty + 84} fontSize={T.micro} fontWeight={700} fill={MI_INK}>{cmLab}</text>
    </g>
  );
}
/* a length found: a bracket from x0 to x1 just above yb and a tag on it. Blue (Given) for the reading; green (Answer) once the
   child's answer is confirmed, the label then starting with the word Answer */
function miTag(x0: number, x1: number, yb: number, label: string, ok = false) {
  const mid = (x0 + x1) / 2, tw = Math.max(140, label.length * 25 + 40), ty = yb - 84, col = ok ? MI_GREEN : MI_BLUE;
  const tx0 = Math.max(4, mid - tw / 2);
  return (
    <g pointerEvents="none" filter="url(#mi-shadow)" {...(ok ? { "data-reveals": "answer" } : {})}>
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
    <g filter="url(#mi-shadow)" {...(win ? { "data-reveals": "answer" } : {})}>
      <rect x={x} y={y + 5} width={W2} height={H2} rx={18} fill="#C9BCA6" opacity={0.5} />
      <rect x={x} y={y} width={W2} height={H2} rx={18} fill={win ? "url(#mi-card-win)" : "url(#mi-card-plain)"} stroke={win ? MI_GREEN : "#2B2B2B"} strokeWidth={win ? 4 : 2.5} />
      <text x={x + W2 / 2} y={y + (cap ? 88 : 104)} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={win ? shade(MI_GREEN, 0.45) : MI_INK}>{label}</text>
      {cap ? (
        <g pointerEvents="none">
          <rect x={x + 6} y={y + H2 - 64} width={W2 - 12} height={58} rx={12} fill="#F0E8DC" stroke="#C9BCA6" strokeWidth={1} />
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
  /* the bench is 258 high (round 2c: the correction's small copies sit between it and the cards), so the door is 120 x 238 */
  if (obj === "door") return { x: 390 - 60, y: 8, w: 120, h: 238 };
  /* the road: what shows of it (cut on a gap between two dashes), the photo itself 540 wide */
  if (obj === "road") { const h = Math.round(540 / MI_THING.road.ar), w = Math.round(h * miInkAr("road")); return { x: 390 - w / 2, y: 125 - h / 2, w, h }; }
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
  const cutQ = useRef<any[]>([]);   /* phase 3: rod taps made while the pencil cuts, made next */
  const rodRef = useRef<any>(null);   /* phase 3: the rod's drawing (maps a tap on the act layer to a place on the rod) */
  const rodUp = useRef<any>(null);    /* phase 3: the last pointer release on the rod itself */
  const rodDownCut = useRef(false);   /* phase 3: the last press came while the pencil cut */
  const lastKey = useRef(0);
  const grab = useRef<any>(null);
  const nudgeT = useRef<any>(null);
  const kbAt = useRef(0);
  const stageRef = useRef(stage);
  stageRef.current = stage;
  /* a correction, an act or a nudge in flight never outlives its question */
  useEffect(() => () => { tl.stop(); busy.current = false; cutQ.current = []; clearTimeout(nudgeT.current); }, [qk]);

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
  const lastNudge = useRef("");
  const sayNudge = (line: string) => {
    const q0 = qk, say0 = item.say;
    /* never the same line twice in a row: a nudge already on show only keeps its time */
    const same = live.current.nudged && lastNudge.current === line;
    lastNudge.current = line;
    put({ nudged: true });
    if (!same) api.say(line);
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
  /* the ghost move (phase 4 only): the ruler, or the key, shows once how it moves (drawn offset only, never its real place) */
  const [ghost, setGhost] = useState<any>(null);
  const ghostT = useRef<any[]>([]);
  const timersT = useRef<any[]>([]);
  useEffect(() => () => { ghostT.current.forEach(clearTimeout); ghostT.current = []; timersT.current.forEach(clearTimeout); timersT.current = []; setGhost(null); }, [qk]);
  const later = (ms: number, fn: () => void) => { timersT.current.push(setTimeout(fn, ms)); };
  const startGhost = () => {
    if (reducedMotion()) return;
    ghostT.current.forEach(clearTimeout); ghostT.current = [];
    /* neutral, net zero, never toward the target: up 0.5 cm and back, then left 0.5 cm and back (the key slides only, so only the
       sideways half) */
    const slideOnly = !!g && g.mode === "slide";
    const upBack = [[0, -7], [0, -14], [0, -21], [0, -14], [0, -7], [0, 0]], leftBack = [[-7, 0], [-14, 0], [-21, 0], [-14, 0], [-7, 0], [0, 0]];
    const path = slideOnly ? leftBack : [...upBack, ...leftBack];
    path.forEach(([dx, dy], i) => ghostT.current.push(setTimeout(() => setGhost(i === path.length - 1 ? null : { dx, dy }), (i + 1) * 130)));
  };
  /* the strongest Hint (its third press): the piece is shown sliding all the way to the alignment line, which rings for 2 s, then
     it goes back (a drawn offset only) */
  const startGhostTo = () => {
    if (!g) return;
    ghostT.current.forEach(clearTimeout); ghostT.current = [];
    const s = live.current, slideOnly = g.mode === "slide";
    const tx0 = slideOnly ? MI_R.x0 - s.kx : g.zero - s.rx, ty0 = slideOnly ? 0 : MI_R.lane - s.ry, N = reducedMotion() ? 1 : 6;
    for (let i = 1; i <= N; i++) ghostT.current.push(setTimeout(() => setGhost({ dx: (tx0 * i) / N, dy: (ty0 * i) / N }), i * 120));
    ghostT.current.push(setTimeout(() => put({ hintTarget: true }), (N + 1) * 120));
    ghostT.current.push(setTimeout(() => { setGhost(null); put({ hintTarget: false }); }, (N + 1) * 120 + 2000));
  };
  /* phase 3 before Halves or Quarters is chosen: both keys pulse for 2.5 s and the line says to choose one (said when asked to) */
  const modeFirst = (say: boolean) => {
    put({ modePulse: Date.now() });
    later(2600, () => put({}));
    if (say) sayNudge(MI_MODE_FIRST);
  };
  /* a press of the Hint key, or of the dimmed Answer key while the question is locked */
  const onLockedPress = (hintKey: boolean) => {
    const s = live.current, locked = lockSent.current;
    if (kind === "rod") {
      /* no cut chosen yet: the two choice keys pulse and the line names them (no ring that points at nothing) */
      if (!s.div) { modeFirst(locked); return; }
      const cutDone = s.div === it.div && (s.cuts || []).length === it.div - 1;
      if (!cutDone && hintKey) {
        /* a cut is still missing: the first press says what to do, the next ones point at the spot (the strongest rung) */
        const hn = (s.hintN || 0) + 1;
        put({ hintN: hn, ...(hn >= 2 ? { pointer: { faint: false } } : {}) });
        if (hn >= 2) later(4000, () => { if (live.current.pointer) put({ pointer: { faint: true } }); });
        if (locked) sayNudge(hn >= 2 ? MI_RING : MI_CUT_LINE);
        return;
      }
      /* every cut is in but not the asked number of parts is coloured: the colouring line (no number) */
      if (cutDone && (s.sel || []).filter(Boolean).length !== it.take) { if (locked) sayNudge(MI_COLOUR); return; }
    }
    if (kind === "measure" && hintKey && !free && n === 4 && !(g && miAligned(g, s))) {
      /* the Hint's own ladder for the move: a neutral wiggle twice, then (the strongest) the slide to the alignment line */
      const hn = (s.hintN || 0) + 1;
      put({ hintN: hn });
      if (hn >= 3) startGhostTo(); else startGhost();
      put({ keycaps: true });
      later(4000, () => put({ keycaps: false }));
    }
    if (locked && lockLine) sayNudge(lockLine);
  };
  lockInfo.current = { onLockedPress };
  useEffect(() => {
    const onKey = (e: any) => {
      if (e.key === "Enter" || e.key === " ") kbAt.current = Date.now();
      if (e.key === "Enter" && !e.repeat && stageRef.current === "demo") MI_TOUCH.on = true;
    };
    const onUp = (e: any) => {
      /* (round 2d, B2) a tap on the rod while the pencil cuts lands on the runtime's act layer, not on the rod: it is kept and made
         when the cut ends */
      if (lockInfo.current.rodTap) lockInfo.current.rodTap(e);
      const t = e.target && e.target.closest ? e.target.closest('[data-control="answer-open"], [data-control="again"]') : null;
      if (!t || stageRef.current !== "ask") return;
      const hintKey = t.getAttribute("data-control") === "again";
      setTimeout(() => { if (stageRef.current === "ask") lockInfo.current.onLockedPress(hintKey); }, 90);
    };
    /* (round 2e) a press made while the pencil cuts is remembered, so its release still counts if the cut ends in between */
    const onDown = (e: any) => { if (lockInfo.current.rodDown) lockInfo.current.rodDown(e); };
    window.addEventListener("keydown", onKey, true);
    window.addEventListener("pointerup", onUp, true);
    window.addEventListener("pointerdown", onDown, true);
    return () => { window.removeEventListener("keydown", onKey, true); window.removeEventListener("pointerup", onUp, true); window.removeEventListener("pointerdown", onDown, true); };
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
      /* the owner (round 2, F and F2): no tapping hand on any of the three card steps, it covered the card's word; the card
         shows its size at once */
      put((b: any) => ({ seen: { ...b.seen, [u]: 1 } })); api.sfx.settle(); api.did(on); return;
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
    put({ rx: zx, ry: ty, lit: al && free ? it.cm : 0, tag: al && free, D: null, acted: s.acted || al, moved: true });
    if (demo) { if (al) api.sfx.tick(); api.did(al ? "ruler" : "ruler-off"); return; }
    afterMove(al, ty === R.lane);
  };
  const placeThing = (kx0: number) => {
    const s = live.current;
    let kx = Math.max(R.x0 - R.mg * R.sc, Math.min(R.sw - g!.L - 10, kx0));
    const al = Math.abs(kx - R.x0) <= 0.3 * R.sc;
    if (al) kx = R.x0;
    put({ kx, lit: 0, tag: false, D: null, acted: s.acted || al, moved: true });
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
    /* (round 2d, B1) a key step that reaches or passes the place where it lines up stops there; at the board's edge it stops on the
       1 cm grid of that place, so the keys can always get back (a drag may leave it anywhere: the next step toward it still lands) */
    const keyStep = (p0: number, at: number, lo: number, hi: number) => {
      if (!dx) return p0;
      const p1 = p0 + dx;
      if ((p0 < at && p1 >= at) || (p0 > at && p1 <= at)) return at;
      if (p1 < lo) return Math.min(p0, at - Math.floor((at - lo) / R.sc + 1e-6) * R.sc);
      if (p1 > hi) return Math.max(p0, at + Math.floor((hi - at) / R.sc + 1e-6) * R.sc);
      return p1;
    };
    if (k === "ruler") placeRuler(keyStep(s.rx, g!.zero, R.mg * R.sc, R.sw - (R.cm + R.mgR) * R.sc), key === "ArrowUp" ? R.lane : key === "ArrowDown" ? R.homeY : s.ry);
    else if (k === "thing" && dx) placeThing(keyStep(s.kx, R.x0, R.x0 - R.mg * R.sc, R.sw - g!.L - 10));
    /* phase 4: the alignment line shows for 1.5 s after a key nudge */
    if (n === 4 && !free) { put({ alignKey: Date.now() }); later(1500, () => put({})); }
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
    put({ carry: null, rx: g!.zero, ry: R.lane, acted: true, lit: free ? it.cm : 0, tag: free, moved: true });
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
    put({ carry: null, kx: R.x0, acted: true, moved: true });
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
  /* Halves or Quarters only chooses how the rod will be cut (the owner, round 2): no mark, no parts yet */
  const setMode = (d: number) => {
    const s = live.current, on = d === 2 ? "halves" : "quarters";
    if (demo && stepOn !== on) { api.did(on); return; }
    if (busy.current || s.tracing || !(demo || playing)) return;
    if (s.div !== d) put({ div: d, cuts: [], divN: 0, sel: [], D: null, pointer: null });
    api.sfx.tick();
    if (demo) api.did(on);
  };
  /* a keyboard child keeps the focus on the board: the runtime's Key and a remounted rod drop it to the page, so it is put back
     on the next tick */
  const focusOn = (id: string) => setTimeout(() => { const el: any = document.querySelector(`[data-control="${id}"]`); if (el && el.focus) el.focus(); }, 80);
  /* the child's tap on the rod at cm: within 4 cm of a cut still to make, the pencil draws that cut (snapped to its true
     place); elsewhere nothing is drawn and a short line says the parts must be equal; a cut already made does nothing */
  const tapRod = async (cm: number, viaKeys = false): Promise<void> => {
    const s = live.current, d = s.div, q0 = qk;
    if (s.tracing) return;
    /* no cut chosen yet (a question): the two choice keys pulse and the line names them */
    if (!d) { if (asking) modeFirst(true); return; }
    /* a tap while the pencil is still cutting is kept (up to 3) and made when the cut ends: never dropped silently */
    if (busy.current) { if (s.cutting && cutQ.current.length < 3) cutQ.current.push([cm, viaKeys]); return; }
    const targets = miCutTargets(d);
    const near = targets.reduce((b, t) => (Math.abs(t - cm) < Math.abs(b - cm) ? t : b), targets[0]);
    const close = Math.abs(near - cm) <= 5;   /* 5 cm either side: about 15 px even on a phone */
    if (demo && (stepOn !== "rod" || !close)) { api.did(stepOn === "rod" ? "rod-off" : "rod"); return; }
    /* (round 2e) a tap in a wrong place, or on a cut already made, only says so: the good taps queued after it still cut */
    const next = () => { const nx = cutQ.current.shift(); if (nx) setTimeout(() => { if (live.current.qk === q0) tapRod(nx[0], nx[1]); }, 0); };
    if (!close) { if (asking) sayNudge(MI_EQUAL); next(); return; }
    if ((s.cuts || []).includes(near)) { next(); return; }
    busy.current = true;
    put({ cutting: true, pointer: null, kmark: near });
    const x = RD.z + near * RD.sc + ox;
    /* about 1 s (round 2d, B2: it was 1.8 s and every tap in it was lost) */
    const ok = await api.act({ tool: "pencil", moves: "draw", marks: true, from: { x, y: RD.top - 16 }, at: [{ x, y: RD.top + RD.h / 2 }], to: { x, y: RD.top + RD.h + 3 }, ms: 400 });
    busy.current = false;
    if (!ok || live.current.qk !== q0) { cutQ.current = []; put({ cutting: false }); return; }
    const cuts = [...(live.current.cuts || []), near].sort((a, b) => a - b);
    put({ cuts, divN: cuts.length, cutting: false, cutOnce: true });
    api.sfx.settle();
    if (demo) { cutQ.current = []; api.did("rod"); return; }
    /* the next tap made during the cut, if any */
    const nx = cutQ.current.shift();
    if (nx) { setTimeout(() => { if (live.current.qk === q0) tapRod(nx[0], nx[1]); }, 0); return; }
    /* a keyboard child goes on to the first part once the rod is all cut (the parts keep the focus: Hit keep); before that the
       rod keeps the focus (it was remounted while the pencil cut) */
    if (viaKeys) focusOn(cuts.length === d - 1 ? "piece-1" : "rod");
  };
  /* where a pointer released over the rod lies on it (cm), or null off the rod */
  const rodCmAt = (cx: number, cy: number) => {
    const el = rodRef.current;
    if (!el || !el.getScreenCTM || !isFinite(cx) || !isFinite(cy)) return null;
    const m = el.getScreenCTM(), svg = el.ownerSVGElement;
    if (!m || !svg) return null;
    const pt = svg.createSVGPoint(); pt.x = cx; pt.y = cy;
    const q = pt.matrixTransform(m.inverse());
    if (q.y < RD.top - 30 || q.y > RD.top + RD.h + 30 || q.x < RD.z - 10 || q.x > RD.z + 100 * RD.sc + 10) return null;
    return (q.x - RD.z) / RD.sc;
  };
  /* every pointer release (window, capture): one on the rod itself is remembered (a finger tap whose drop has no point then cuts
     where the finger was, never at the keyboard marker); one over the rod while the pencil cuts (the act layer takes it) is queued */
  lockInfo.current.rodTap = kind === "rod" ? (e: any) => {
    const pressedInCut = !!rodDownCut.current;
    rodDownCut.current = false;
    /* a release on the rod whose press the rod itself took: the rod's own drop handles it (this only remembers the place) */
    if (!pressedInCut && e.target && e.target.closest && e.target.closest('[data-control="rod"]')) { rodUp.current = { x: e.clientX, y: e.clientY, t: Date.now() }; return; }
    if (!live.current.cutting && !pressedInCut) return;
    const cm = rodCmAt(e.clientX, e.clientY);
    if (cm !== null) tapRod(cm);
  } : null;
  lockInfo.current.rodDown = kind === "rod" ? (e: any) => { rodDownCut.current = !!live.current.cutting; } : null;
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
    /* by key (Enter or Space): after Halves or Quarters the focus goes to the rod, where the cuts are made */
    const kb = t - kbAt.current < 600;
    if (id === "mark") markAct();
    else if (id === "halves" || id === "quarters") { setMode(id === "halves" ? 2 : 4); if (kb) focusOn("rod"); }
    else if (id === "new-thing") { setFi((f) => f + 1); api.sfx.settle(); }
  };

  /* every drop and every tap of a drag piece lands here (a tap, Enter or Space means "put it where it belongs") */
  const onDrop = (pay: any, p: any, moved: boolean) => {
    const g0 = grab.current;
    grab.current = null;    if (!pay) return;
    if (!busy.current) realTouch();
    const real = moved && isFinite(p.x) && isFinite(p.y);
    if (pay.k === "card") { if (real) dropCard(pay.u, p, g0); else tapCard(pay.u); return; }
    /* the rod: a finger or mouse tap (or a short drag) cuts where it lands; Enter or Space cuts at the keyboard marker */
    if (pay.k === "rod") {
      if (isFinite(p.x)) { tapRod((p.x - ox - RD.z) / RD.sc); return; }
      /* (round 2e) no point: a finger released on the rod just now cuts where it was; else it is Enter or Space at the marker */
      const u = rodUp.current, cm = u && Date.now() - u.t < 400 && Date.now() - kbAt.current > 400 ? rodCmAt(u.x, u.y) : null;
      rodUp.current = null;
      if (cm !== null) tapRod(cm); else tapRod(live.current.kmark || 0, true);
      return;
    }
    /* phase 4: a tap lines nothing up; while the thing is not yet measured from 0 it says how to move it */
    const tapHelp = () => { if (asking && !live.current.acted && !live.current.tracing) sayNudge(MI_MOVE_LINE); };
    if (pay.k === "ruler") { if (real) dropRuler(p, g0); else if (tapAligns) tapRuler(); else tapHelp(); return; }
    if (pay.k === "thing") { if (real) dropThing(p, g0); else if (tapAligns) tapThing(); else tapHelp(); }
  };
  /* a placed card, an aligned ruler or a slid thing lets Enter pass to the window (PATTERNS 5b); the arrow keys nudge the
     ruler or the thing; in phase 4 Enter or Space on them lines nothing up (the child moves it to 0 by hand) */
  const passKeys = (pay: any, done: boolean) => {
    const k = drag.keys(pay);
    return { onKeyDown: (e: any) => {
      if (pay.k === "rod" && /^Arrow(Left|Right)$/.test(e.key)) {
        e.preventDefault(); e.stopPropagation(); realTouch();
        const m0 = live.current.kmark || 0;
        put({ kmark: Math.max(0, Math.min(100, m0 + (e.key === "ArrowLeft" ? -5 : 5))), rodFocus: true });
        return;
      }
      if (pay.k === "ruler" || pay.k === "thing") { if (/^Arrow/.test(e.key)) { e.preventDefault(); e.stopPropagation(); realTouch(); nudge(pay.k, e.key); return; } }
      if (e.key === "Enter" && done) return;
      if (!tapAligns && (pay.k === "ruler" || pay.k === "thing") && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault(); e.stopPropagation();
        if (!e.repeat && asking && !live.current.acted && !live.current.tracing) { realTouch(); sayNudge(MI_MOVE_LINE); }
        return;
      }
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
    if (o === "halves") return setMode(2);
    if (o === "rod") return tapRod(50);   /* Enter, check() and solve() cut at the middle, as the step asks */
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
    if (kind === "rod" && !miRodOk(it, s)) put({ div: it.div, cuts: miCutTargets(it.div), divN: it.div - 1, cutting: false, sel: Array.from({ length: it.div }, (_, k) => k < it.take), acted: true, D: null, pointer: null });
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
  const lockQk = useRef("");   /* (round 2c) sent again on each entry of a question: the runtime resets the gate on a jump */
  useEffect(() => {
    if (busy.current) return;
    /* the correction does not hold the pad: a lock set one frame after the miss raced the child's (and check's) next digit;
       the board itself ignores taps while it plays (S.tracing) and the picture fits beside an open keypad */
    const want = !!(gateOn && MI_TOUCH.on && isUser());
    if (lockSent.current === want && lockQk.current === qk) return;
    lockSent.current = want;
    lockQk.current = qk;
    api.lock(want);
  });
  /* a unit question's Enter blinks once a card is on the tag */
  useEffect(() => { if (asking && it.pad === "enter") api.answerReady(!!S.card); }, [asking, S.card, qk]);
  /* phases 2 and 4: the move cue shows while the piece is not at 0; the first time in a phase the piece shows its move once */
  /* the owner (round 2, item G): the cue and the ghost are phase 4's only (phase 2's tap already lines the ruler up) */
  const cueOn = kind === "measure" && !free && n === 4 && asking && !(g && miAligned(g, S));
  useEffect(() => {
    if (cueOn && (n === 2 || n === 4) && !MI_DEMOED[n]) { MI_DEMOED[n] = true; later(500, startGhost); }
  }, [cueOn, qk]);

  /* the correction (MISS HIDES THE ANSWER, the owner 2026-10-28): it replays the WORKING and stops one step before the
     answer, so the child finishes it; nothing shows, rings or points at the right answer (that is the win's alone) */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    const s0 = live.current;
    if (kind === "unit") {
      /* the wrong card leaves the tag first; then a copy of the thing above each of the three cards in turn, none singled out */
      put({ tracing: true, missed: s0.card, card: null, D: null });
      tl.run([[300, () => put({ D: { cmp: 1 } })], [450, () => put({ D: { cmp: 2 } })], [450, () => put({ D: { cmp: 3 } })], [500, null]],
        () => put({ tracing: false, card: null }));
      return;
    }
    if (kind === "measure") {
      /* the thing or the ruler slides so 0 meets one end; phase 2 also counts the marks from 0, stopping one short of the end */
      const gg = miGeo(it), steps: any[] = [];
      put({ tracing: true, lit: 0, tag: false, D: null });
      if (!miAligned(gg, s0)) {
        const slide = gg.mode === "slide", a = slide ? s0.kx : s0.rx, b = slide ? R.x0 : gg.zero, ay = s0.ry;
        for (let f = 1; f <= 6; f++) steps.push([70, () => put(slide ? { kx: a + (b - a) * f / 6 } : { rx: a + (b - a) * f / 6, ry: ay + (R.lane - ay) * f / 6 })]);
        steps.push([250, () => put(slide ? { kx: b } : { rx: b, ry: R.lane })]);
      } else if (n === 4) {
        /* already at 0: the working is still shown, the piece slides 1 cm away (whichever side stays on the board) and back to 0 */
        const slide = gg.mode === "slide", b = slide ? R.x0 : gg.zero;
        const away = slide || b + R.sc <= R.sw - (R.cm + R.mgR) * R.sc ? R.sc : -R.sc;
        for (let f = 1; f <= 3; f++) steps.push([90, () => put(slide ? { kx: b + away * f / 3 } : { rx: b + away * f / 3 })]);
        for (let f = 2; f >= 0; f--) steps.push([90, () => put(slide ? { kx: b + away * f / 3 } : { rx: b + away * f / 3 })]);
        steps.push([200, null]);
      }
      if (n === 2) for (let i = 1; i <= it.cm - 1; i++) steps.push([110, () => put({ lit: i })]);
      tl.run(steps, () => put({ tracing: false, acted: true }));
      return;
    }
    if (kind === "rod") {
      /* in stages: the cut at the middle, a pause, then 25 and 75 for quarters; for an answer of 50 the tens light from 0 and stop
         one ten short; no number, no bracket, no tag */
      put({ tracing: true });
      const st: any[] = [[300, () => put({ D: { div: it.div, cuts: [50] } })], [700, null]];
      if (it.div === 4) st.push([0, () => put({ D: { div: it.div, cuts: [25, 50, 75] } })], [700, null]);
      const ans = it.take * 100 / it.div;
      if (ans === 50) for (let c = 10; c < ans; c += 10) st.push([0, () => put((b: any) => ({ D: { ...(b.D || {}), lit: c } }))], [280, null]);
      tl.run(st, () => put({ tracing: false }));
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
        {tb ? bench(0, 0, 790, 258) : null}
        {it.obj === "door" && tb ? <line x1={tb.x - 130} y1={tb.y + tb.h} x2={tb.x + tb.w + 130} y2={tb.y + tb.h} stroke="#2B2B2B" strokeWidth={5} strokeLinecap="round" /> : null}
        {/* the road photo ends on a half dash: it is cut on the gap after its sixth dash (MI_THING.road.ink) */}
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
        {/* the correction: a copy of the thing just above each card (between the bench and the cards, touching no letter), one
            card after another and none singled out (no ring, no chip, no halo: MISS HIDES THE ANSWER); the road and the pencil
            about 140 to 180 across, the door 30 x 60 */}
        {S.D && S.D.cmp && it.obj ? (
          <g pointerEvents="none">
            {MI_UNITS.slice(0, S.D.cmp).map((u) => {
              const ar = miInkAr(it.obj), w = Math.min(it.obj === "pencil" ? 180 : 140, 60 * ar), h = w / ar;
              const cx = MI_U.homeX[MI_UNITS.indexOf(u)] + MI_U.cw / 2, cy = MI_U.homeY - 38;
              return <g key={"cmp" + u}>{miThingArt(it.obj, cx - w / 2, cy - h / 2, w, h, undefined, { flat: true })}</g>;
            })}
          </g>
        ) : null}
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
    const cutCm: number[] = d ? (S.cuts || []) : [];
    const cutDone = !!d && cutCm.length === d - 1 && !S.cutting;
    /* the numbers under the rod: 0 and 100 cm always (the printed scale); a cut's number (the answer) only after the right answer */
    const labCm = Array.from(new Set([0, ...(won ? [10, 20, 30, 40, 50, 60, 70, 80, 90, ...cutCm] : [])]));
    /* the tens (and 50) in the first row; a quarter cut's number (25, 75) in a second row below, joined to its cut by a dashed leader */
    labCm.forEach((c) => {
      const x = RD.z + c * RD.sc, rv = c === 0 ? { "data-scale": "" } : { "data-reveals": "answer" };
      if (c % 10 === 0) { ticks.push(<text key={"n" + c} {...rv} x={x} y={RD.top + RD.h + 38} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={MI_INK}>{c}</text>); return; }
      /* below the coloured-part bars (y +50 to +72), the leader passing between two bars at the cut */
      ticks.push(<line key={"l" + c} x1={x} y1={RD.top + RD.h + 2} x2={x} y2={RD.top + RD.h + 88} stroke={MI_BLUE} strokeWidth={3} strokeDasharray="6 6" />);
      ticks.push(<text key={"n" + c} {...rv} x={x} y={RD.top + RD.h + 122} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={MI_INK}>{c}</text>);
    });
    ticks.push(<text key="n100" data-scale="" x={RD.z + 100 * RD.sc} y={RD.top + RD.h + 38} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={MI_INK}>100</text>);
    ticks.push(<text key="ncm" data-scale="" x={RD.z + 100 * RD.sc + 38} y={RD.top + RD.h + 38} fontSize={T.micro} fontWeight={700} fill={MI_INK}>{tx("cm")}</text>);
    const keysNow: string[] = demo ? (stepOn === "mark" || stepOn === "halves" ? [stepOn] : []) : asking ? ["halves", "quarters"] : [];
    const KEYLAB: any = { mark: "Mark", halves: "Halves", quarters: "Quarters" };
    const kw = 240, kgap = 40, ktot = keysNow.length * kw + (keysNow.length - 1) * kgap, kx0 = R.sw / 2 - ktot / 2, ky = 420;
    const keyX = (id: string) => kx0 + keysNow.indexOf(id) * (kw + kgap);
    const D = S.D;
    /* the rod takes the child's cut taps while a cut is still to make (a question, or the warm-up's tap step) */
    /* (round 2c) in a question before a cut is chosen the rod is live too: a tap on it says to choose Halves or Quarters first */
    /* (round 2d, B2) it stays live while the pencil cuts: a tap then is kept and made when the cut ends (tapRod's queue) */
    const rodLive = (asking && !d && !S.tracing) || (!!d && !cutDone && (asking || (demo && stepOn === "rod")));
    /* the Hint key's pointer: the next spot to tap on the rod, or the key the question asks for when another is chosen */
    const ptr = S.pointer && asking ? (S.div !== it.div ? { key: it.div === 2 ? "halves" : "quarters" }
      : { cm: miCutOrder(it.div).map((c) => (c * 100) / it.div).find((c) => !(S.cuts || []).includes(c)) }) : null;   /* 50 first, then 25, 75 */
    const ringCol = (typeof THEME !== "undefined" && THEME && THEME.enter) ? THEME.enter[1] : C.accent;
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
        {/* the rod: its plain face, the photo, the coloured parts, the marks, the child's cuts */}
        <g filter="url(#mi-shadow)" ref={rodRef}>
          <rect x={rx0} y={RD.top} width={rw} height={RD.h} rx={6} fill="#E7C893" />
          <Skin name="rod" x={rx0} y={RD.top} w={rw} h={RD.h} />
          {cutDone ? Array.from({ length: d }, (_, i) => (S.sel[i] ? (
            <g key={"s" + i} pointerEvents="none">
              <rect x={RD.z + i * seg * RD.sc} y={RD.top} width={seg * RD.sc} height={RD.h} fill={tint(MI_BLUE, 0.45)} />
              <rect x={RD.z + i * seg * RD.sc + 3} y={RD.top + RD.h + 50} width={seg * RD.sc - 6} height={22} rx={8} fill={MI_BLUE} />
            </g>
          ) : null)) : null}
          <rect x={rx0} y={RD.top} width={rw} height={RD.h} rx={6} fill="none" stroke="#2B2B2B" strokeWidth={3} />
          {ticks}
          {cutCm.map((c, k) => {
            const x = RD.z + c * RD.sc;
            return <line key={"d" + k} x1={x} y1={RD.top - 16} x2={x} y2={RD.top + RD.h + 3} stroke={MI_INK} strokeWidth={6} strokeLinecap="round" />;
          })}
        </g>
        {/* the rod as a tap target for the cuts (finger, mouse; the arrow keys move a marker in 5 cm steps, Enter or Space cuts) */}
        {rodLive ? (
          <g {...control("rod", tx("rod"))} {...drag.bind({ k: "rod" })} {...passKeys({ k: "rod" }, false)}
            onFocus={() => put({ rodFocus: true })} onBlur={() => put({ rodFocus: false })} style={{ cursor: "pointer" } as any}>
            <rect x={RD.z - 10} y={RD.top - 30} width={rw + 20} height={RD.h + 60} fill="transparent" />
            {S.rodFocus ? (
              <g pointerEvents="none">
                <polygon points={`${RD.z + (S.kmark || 0) * RD.sc - 12},${RD.top - 28} ${RD.z + (S.kmark || 0) * RD.sc + 12},${RD.top - 28} ${RD.z + (S.kmark || 0) * RD.sc},${RD.top - 8}`} fill={ringCol} />
              </g>
            ) : null}
          </g>
        ) : null}
        {/* the parts the child colours, once every cut is in (a transparent box over each part, so a gap never falls through) */}
        {cutDone && (demo || asking) ? Array.from({ length: d }, (_, i) => (
          <Hit key={"p" + i} id={"piece-" + (i + 1)} x={RD.z + i * seg * RD.sc} y={RD.top - 30} w={seg * RD.sc} h={RD.h + 110}
            onPress={() => { realTouch(); tapPiece(i); }} label={tx("part") + " " + (i + 1)} keep />
        )) : null}
        {/* the correction: the asked equal parts as dashed cuts, no number, no bracket; the win: the green Answer tag */}
        {D && D.div ? (
          <g pointerEvents="none">
            {!D.win ? (D.cuts || []).map((c: number) => {
              const x = RD.z + c * RD.sc;
              return <line key={"dd" + c} x1={x} y1={RD.top - 16} x2={x} y2={RD.top + RD.h + 3} stroke={MI_BLUE} strokeWidth={5} strokeDasharray="10 8" strokeLinecap="round" />;
            }) : null}
            {/* the correction counts the tens from 0 and stops one ten short of the answer (no number) */}
            {!D.win && D.lit ? [10, 20, 30, 40, 50, 60, 70, 80, 90].filter((c) => c <= D.lit).map((c) => (
              <line key={"dl" + c} x1={RD.z + c * RD.sc} y1={RD.top} x2={RD.z + c * RD.sc} y2={RD.top + 34} stroke={MI_BLUE} strokeWidth={6} strokeLinecap="round" />
            )) : null}
            {D.win ? miTag(RD.z, RD.z + D.take * (100 / D.div) * RD.sc, RD.top - 8, tx("Answer") + ": " + `${D.take * 100 / D.div} ${tx("cm")}`, true) : null}
          </g>
        ) : null}
        {/* the Hint key's pointer: a big pulsing ring and an arrow at the spot to tap (never a number); faint after 4 s */}
        {ptr && (ptr.cm !== undefined || ptr.key) ? (() => {
          const px = ptr.key ? keyX(ptr.key) + kw / 2 : RD.z + ptr.cm * RD.sc, py = ptr.key ? ky + 40 : RD.top + RD.h / 2;
          const r = ptr.key ? 70 : 44, faint = S.pointer.faint;
          return (
            <g pointerEvents="none" opacity={faint ? 0.4 : 1}>
              <circle className={faint ? undefined : "c4-pulse"} cx={px} cy={py} r={r} fill="none" stroke={ringCol} strokeWidth={7} />
              <polygon points={`${px - 22},${py - r - 52} ${px + 22},${py - r - 52} ${px + 22},${py - r - 30} ${px + 36},${py - r - 30} ${px},${py - r - 4} ${px - 36},${py - r - 30} ${px - 22},${py - r - 30}`}
                fill={ringCol} stroke="#FFFFFF" strokeWidth={3} strokeLinejoin="round" />
            </g>
          );
        })() : null}
        {keysNow.map((id, j) => (
          <Key key={"act" + j} id={id} label={tx(KEYLAB[id])} x={kx0 + j * (kw + kgap)} y={ky} w={kw} h={80} C={C} tone="key" onClick={() => pressKey(id)}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{tx(KEYLAB[id])}</text>
          </Key>
        ))}
        {/* the cut the child has chosen: a quiet ring round its key */}
        {asking && d && keysNow.includes(d === 2 ? "halves" : "quarters") ? (
          <rect x={keyX(d === 2 ? "halves" : "quarters") - 8} y={ky - 8} width={kw + 16} height={96 + 8} rx={22} fill="none" stroke={MI_INK} strokeWidth={4} pointerEvents="none" />
        ) : null}
        {demo && (stepOn === "mark" || stepOn === "halves") ? <Invite x={kx0 + kw / 2} y={ky + 40} w={kw} h={80} C={C} /> : null}
        {demo && stepOn === "rod" && d ? <Invite x={RD.z + 50 * RD.sc} y={RD.top + RD.h / 2} r={44} C={C} /> : null}
        {/* (round 2c) no cut chosen and the child asked (Hint, the rod, the dimmed Answer key): both choice keys pulse, none singled out */}
        {asking && !d && Date.now() - (S.modePulse || 0) < 2500 ? keysNow.map((id) => (
          <rect key={"mp" + id} x={keyX(id) - 10} y={ky - 10} width={kw + 20} height={100} rx={24} fill="none" stroke={ringCol} strokeWidth={6} pointerEvents="none">
            {reducedMotion() ? null : <animate attributeName="stroke-opacity" values="1;0.3;1" dur="0.9s" repeatCount="indefinite" />}
          </rect>
        )) : null}
        {/* (round 2c) a cut is chosen and no cut made yet: one gentle invite round the WHOLE rod (no spot, no number) */}
        {/* its own ring that fades in and out in place (the runtime's Invite grows as it pulses and would leave the bench on a
            shape this long) */}
        {asking && d && !S.cutOnce && !cutCm.length && !S.cutting && !S.tracing && !ptr && !(D && D.div) ? (
          <rect x={rx0 - 14} y={RD.top - 12} width={rw + 28} height={RD.h + 20} rx={16} fill="none" stroke={ringCol} strokeWidth={5} pointerEvents="none" data-role="rod-invite">
            {reducedMotion() ? null : <animate attributeName="stroke-opacity" values="0.95;0.25;0.95" dur="1.6s" repeatCount="indefinite" />}
          </rect>
        ) : null}
      </g>
    );
  }

  /* ── draw: phases 2 and 4 (and free play): a thing on the bench and the ruler ── */
  let rx = S.rx, ry = S.ry, kx = S.kx;
  const dk = dd && dd.payload && dd.moved && grab.current ? dd.payload.k : null;
  if (dk === "ruler") { rx = Math.max(0, Math.min(R.sw, dd.x + grab.current.dx - ox)); ry = Math.max(0, Math.min(520 - R.h, dd.y + grab.current.dy)); }
  if (dk === "thing") kx = Math.max(0, Math.min(R.sw - g!.L, dd.x + grab.current.dx - ox));
  const slide = g!.mode === "slide";
  /* the ghost move: a drawn offset only (the ruler's or the key's real place never changes) */
  if (ghost && !dk) { if (slide) kx += ghost.dx; else { rx += ghost.dx; ry += ghost.dy; } }
  const thX = slide ? kx : g!.thingX, thY = R.lane - g!.oh;
  const al = miAligned(g!, S);
  const glow = guided && !slide;
  const showTag = S.tag && (al || (slide && S.kx === R.x0));
  /* the move cue (the owner, round 2): chevrons round the piece the child moves, in the "your turn" colour, on empty board,
     while it is not yet at 0; it pulses (the one invite) until the child first moves it */
  const ringCol = (typeof THEME !== "undefined" && THEME && THEME.enter) ? THEME.enter[1] : C.accent;
  /* the four-way cue with its ring is 93 tall (half-height ce = 46.5; round 2e: its own ring, which does not grow, not the runtime's
     Invite): at least 16 clear of the thing's ink and of the ruler, in the gap between them when the ruler is down at home (the thing's
     ink ends about 6 above the bench line), else 20 under the ruler, else over the thing */
  const ce = 46.5, rulerTop = S.ry, rulerBot = S.ry + R.h;
  const fourY = rulerTop - R.lane >= 2 * ce + 32 ? (R.lane - 6 + rulerTop) / 2
    : rulerBot + 20 + 2 * ce <= 508 ? rulerBot + 20 + ce : thY - 20 - ce;
  const cueAt = slide ? { x: S.kx + g!.L / 2, y: thY - 44, four: false } : { x: S.rx + (R.cm * R.sc) / 2, y: fourY, four: true };
  const chev = (dd2: string, k: string) => (
    <g key={k}>
      <path d={dd2} fill="none" stroke="#FFFFFF" strokeWidth={15} strokeLinecap="round" strokeLinejoin="round" />
      <path d={dd2} fill="none" stroke={ringCol} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
  const cx2 = cueAt.x, cy2 = cueAt.y;
  /* the chevrons: tip a, base b, half-width c (smaller for the four-way cue, which sits between the thing and the ruler) */
  const [ca, cb, cc] = cueAt.four ? [30, 18, 12] : [52, 32, 20];
  const cue = cueOn && !dk ? (
    <g pointerEvents="none" data-role="move-cue">
      {cueAt.four ? chev(`M ${cx2 - cc} ${cy2 - cb} L ${cx2} ${cy2 - ca} L ${cx2 + cc} ${cy2 - cb}`, "u") : null}
      {cueAt.four ? chev(`M ${cx2 - cc} ${cy2 + cb} L ${cx2} ${cy2 + ca} L ${cx2 + cc} ${cy2 + cb}`, "d") : null}
      {chev(`M ${cx2 - cb} ${cy2 - cc} L ${cx2 - ca} ${cy2} L ${cx2 - cb} ${cy2 + cc}`, "l")}
      {chev(`M ${cx2 + cb} ${cy2 - cc} L ${cx2 + ca} ${cy2} L ${cx2 + cb} ${cy2 + cc}`, "r")}
      <circle cx={cx2} cy={cy2} r={cueAt.four ? 9 : 11} fill={ringCol} stroke="#FFFFFF" strokeWidth={3} />
      {S.keycaps ? (
        /* the Hint's picture: the arrow keys work too (key caps, no words) */
        <g>
          {[[0, -40, "u"], [-40, 0, "l"], [0, 0, "d"], [40, 0, "r"]].map(([dx2, dy2, k]: any) => {
            const bx = cx2 + 120 + dx2, by = cy2 + dy2 + 4, a = 9;
            const tri = k === "u" ? `${bx - a},${by + 5} ${bx + a},${by + 5} ${bx},${by - 7}` : k === "d" ? `${bx - a},${by - 5} ${bx + a},${by - 5} ${bx},${by + 7}`
              : k === "l" ? `${bx + 5},${by - a} ${bx + 5},${by + a} ${bx - 7},${by}` : `${bx - 5},${by - a} ${bx - 5},${by + a} ${bx + 7},${by}`;
            return <g key={"kc" + k}><rect x={bx - 17} y={by - 17} width={34} height={34} rx={7} fill="#FFFFFF" stroke={MI_INK} strokeWidth={2.5} /><polygon points={tri} fill={MI_INK} /></g>;
          })}
        </g>
      ) : null}
    </g>
  ) : null;
  return (
    <g transform={`translate(${ox},0)`}>
      <MiDefs />
      {bench(-6, 6, 892, 506)}
      {/* the ruler (fixed under a thing that slides) */}
      {slide ? miRulerArt(R.x0, R.lane, S.lit, false, tx("cm"), won && !free) : (
        <g {...control("ruler", tx("ruler"))} {...drag.bind({ k: "ruler" })} {...passKeys({ k: "ruler" }, al && !demo)} style={{ cursor: "grab" } as any}>
          {S.carry === "ruler" ? null : miRulerArt(rx, ry, S.lit, glow, tx("cm"), won && !free)}
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
      {cue}
      {/* phase 4 (item H): while the child drags or nudges the piece, a dashed line where the thing's left end and the ruler's 0 must
          meet (WHERE to stop, never the length); green with a filled ring at its foot once the piece is there; never after a miss */}
      {(() => {
        const moving = dk === "ruler" || dk === "thing" || Date.now() - (S.alignKey || 0) < 1500 || S.hintTarget;
        if (n !== 4 || free || !asking || wrong || S.tracing || !moving) return null;
        const ax = slide ? R.x0 : g!.thingX, at = slide ? kx : rx;
        const on = Math.abs(at - ax) <= 0.3 * R.sc && (slide || Math.abs(ry - R.lane) < 72);
        const col = on ? MI_GREEN : MI_INK;
        return (
          <g pointerEvents="none" data-role="align-line">
            <line x1={ax} y1={thY - 34} x2={ax} y2={R.lane + 30} stroke="#FFFFFF" strokeWidth={8} strokeLinecap="round" />
            <line x1={ax} y1={thY - 34} x2={ax} y2={R.lane + 30} stroke={col} strokeWidth={4} strokeDasharray="10 8" strokeLinecap="round" />
            <circle cx={ax} cy={thY - 46} r={12} fill={on ? MI_GREEN : "#FFFFFF"} stroke={col} strokeWidth={4} />
          </g>
        );
      })()}
      {/* phase 2's guide step names the ruler: its own invite on the ruler's 0 (no move cue in phase 2) */}
      {demo && warmOn && stepOn === "ruler" ? <Invite x={rx} y={ry + 70} w={44} h={44} rx={12} C={C} /> : null}
      {cue && !S.moved ? (cueAt.four ? (
        <circle cx={cx2} cy={cy2} r={44} fill="none" stroke={ringCol} strokeWidth={5} pointerEvents="none" data-role="cue-invite">
          {reducedMotion() ? null : <animate attributeName="stroke-opacity" values="0.95;0.25;0.95" dur="1.6s" repeatCount="indefinite" />}
        </circle>
      ) : <Invite x={cx2} y={cy2} w={124} h={56} rx={28} C={C} />) : null}
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
        <text x={Wd - 14} y={Hd / 2 + 10} textAnchor="end" fontSize={T.label} fontWeight={700} fill={shade(MI_GREEN, 0.45)}>{v + (lang === "en" || tx("cm") !== "cm" ? " " + tx("cm") : "")}</text>
      </g>
    );
  }
  return (
    <g>
      {frame}
      {miPlain(item.obj, 12, Hd / 2 - 20, 76, 18)}
      <rect x={10} y={Hd / 2} width={84} height={18} rx={3} fill="#E9CF9C" stroke="#2B2B2B" strokeWidth={1.5} />
      {Array.from({ length: 6 }, (_, k) => <line key={k} x1={14 + k * 14} y1={Hd / 2} x2={14 + k * 14} y2={Hd / 2 + 8} stroke={MI_INK} strokeWidth={1.5} />)}
      {/* the confirmed length: Answer green, as the unit chip of phase 1 */}
      <text x={Wd - 14} y={Hd / 2 + 10} textAnchor="end" fontSize={T.label} fontWeight={700} fill={shade(MI_GREEN, 0.45)}>{v + (lang === "en" || tx("cm") !== "cm" ? " " + tx("cm") : "")}</text>
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
      {miThingArt("road", 36, 316 - roadH, roadW, roadH, undefined, { raw: true })}
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
