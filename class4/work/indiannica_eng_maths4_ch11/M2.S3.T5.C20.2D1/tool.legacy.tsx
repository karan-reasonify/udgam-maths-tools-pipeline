/* ═══ M2.S3.T5.C16.2D1 · weighing_bench · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "weighing_bench";
const MEDIA_ID = "M2.S3.T5.C16.2D1";
const TOOL_NAME = "Weighing Bench";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A balance and a shelf of things. Is each one heavy or light?"];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every thing weighed in a unit that suits it. Every weight changed by a thousand, the remainder kept as grams.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Anything on the balance, and any weight through the converter either way.";

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, and the runtime looks each spoken or drawn line up in it.
   Fill it AFTER the English is final and reviewed (`node cli.mjs voice` lists every line still missing),
   then bake the voice. Empty = the tool runs in English only. */
const TR: any = {
  hi: {
    "Weighing Bench": "तौलने की मेज़",
    "A balance and a shelf of things. Is each one heavy or light?": "एक तराजू और ताक पर कुछ चीज़ें। हर चीज़ भारी है या हल्की?",
    "Every thing weighed in a unit that suits it. Every weight changed by a thousand, the remainder kept as grams.": "हर चीज़ अपनी सही इकाई में तौली गई। हर वज़न एक हज़ार से बदला गया, और शेष ग्राम में रहा।",
    "Free play. Anything on the balance, and any weight through the converter either way.": "मुक्त खेल। तराजू पर कुछ भी रखो और कोई भी वज़न मशीन से ऊपर या नीचे भेजो।",
    /* phase 1 */
    "Grams or kilograms": "ग्राम या किलोग्राम",
    "A kilogram weight sits on one pan. Lift a thing onto the other pan, then send it to a tray.": "एक पलड़े पर किलोग्राम का बाट रखा है। कोई चीज़ दूसरे पलड़े पर रखो, फिर उसे ट्रे में भेजो।",
    "Which pan went down?": "कौन-सा पलड़ा नीचे गया?",
    "Weigh one heavy thing and one light thing. Which pan goes down each time?": "एक भारी और एक हल्की चीज़ तौलो। हर बार कौन-सा पलड़ा नीचे जाता है?",
    "Heavy things are usually weighed in kilograms and light things in grams. On a pan balance, the pan that goes down holds the heavier load.": "भारी चीज़ें आमतौर पर किलोग्राम में और हल्की चीज़ें ग्राम में तौली जाती हैं। तराजू का जो पलड़ा नीचे जाता है, उसमें भारी चीज़ होती है।",
    "You learned: heavy things in kilograms, light things in grams.": "तुमने सीखा: भारी चीज़ें किलोग्राम में, हल्की चीज़ें ग्राम में।",
    "Which unit suits each weight: a bag of cement, and a steel spoon?": "हर वज़न के लिए कौन-सी इकाई ठीक है: सीमेंट की बोरी, और स्टील का चम्मच?",
    "Cement, spoon: which tray?": "सीमेंट, चम्मच: कौन-सी ट्रे?",
    "Is each thing heavy or light in the hand?": "हाथ में हर चीज़ भारी लगती है या हल्की?",
    "Grams or kilograms: a letter in an envelope, and a sack of onions?": "ग्राम या किलोग्राम: लिफ़ाफ़े में एक चिट्ठी, और प्याज़ की एक बोरी?",
    "Letter, onions: which tray?": "चिट्ठी, प्याज़: कौन-सी ट्रे?",
    "Which of the two could you lift with one finger?": "इन दोनों में से किसे तुम एक उँगली से उठा सकते हो?",
    "A child weighs an eraser and writes 20 kilograms. Which unit should it be?": "एक बच्चा रबड़ तौलकर 20 किलोग्राम लिखता है। इकाई क्या होनी चाहिए?",
    "Eraser: 20 kg? Which unit?": "रबड़: 20 किग्रा? कौन-सी इकाई?",
    "Could an eraser weigh as much as 20 bags of sugar?": "क्या एक रबड़ चीनी की 20 थैलियों जितना भारी हो सकता है?",
    "grams": "ग्राम",
    "kilograms": "किलोग्राम",
    "Both in trays, so press Enter.": "दोनों ट्रे में हैं, अब एंटर दबाओ।",
    "Send each thing to a tray first.": "पहले हर चीज़ को ट्रे में भेजो।",
    /* phase 2 */
    "A thousand grams make a kilogram": "एक हज़ार ग्राम से एक किलोग्राम बनता है",
    "How many grams level the kilogram? Put hundred gram weights on the empty pan until the beam is level.": "कितने ग्राम किलोग्राम के बराबर होते हैं? खाली पलड़े पर सौ ग्राम के बाट रखो, जब तक डंडी सीधी न हो जाए।",
    "How many grams levelled one kilogram?": "कितने ग्राम से एक किलोग्राम बराबर हुआ?",
    "Multiply the kilograms by the one number on the converter. Then add any grams.": "किलोग्राम को मशीन की एक संख्या से गुणा करो। फिर बचे ग्राम जोड़ दो।",
    "A thousand grams make a kilogram. Kilograms become grams by multiplying by a thousand, and only by a thousand, with any grams added on.": "एक हज़ार ग्राम से एक किलोग्राम बनता है। किलोग्राम से ग्राम बनाने के लिए केवल एक हज़ार से गुणा करो, फिर बचे ग्राम जोड़ो।",
    "You learned: 1 kilogram is 1,000 grams, so multiply by 1,000 only.": "तुमने सीखा: 1 किलोग्राम में 1,000 ग्राम, सो केवल 1,000 से गुणा करो।",
    "How many grams are there in 9 kilograms?": "9 किलोग्राम में कितने ग्राम होते हैं?",
    "9 kg in grams?": "9 किग्रा में कितने ग्राम?",
    "What number is printed on the converter?": "मशीन पर कौन-सी संख्या छपी है?",
    "Now 5 kilograms. How many grams is that?": "अब 5 किलोग्राम। यह कितने ग्राम हुआ?",
    "5 kg is how many grams?": "5 किग्रा कितने ग्राम हैं?",
    "Five kilogram weights. Each one levels how many grams?": "किलोग्राम के पाँच बाट। हर एक कितने ग्राम के बराबर है?",
    "A bag holds 13 kilograms 640 grams. Change it all into grams.": "एक थैले में 13 किलोग्राम 640 ग्राम है। पूरा वज़न ग्राम में बदलो।",
    "13 kg 640 g in grams?": "13 किग्रा 640 ग्रा कितने ग्राम?",
    "Change the 13 kilograms first. The 640 grams are grams already.": "पहले 13 किलोग्राम बदलो। 640 ग्राम तो पहले से ग्राम में हैं।",
    "The pan holds 1,000 grams, and it balances 1 kilogram.": "पलड़े पर 1,000 ग्राम हैं, और वे 1 किलोग्राम के बराबर हैं।",
    "Now try it on other weights.": "अब दूसरे वज़नों पर आज़माओ।",
    /* phase 3 */
    "Grams into kilograms and grams": "ग्राम से किलोग्राम और ग्राम",
    "How many whole kilograms are in it? What is left stays in grams.": "इसमें कितने पूरे किलोग्राम हैं? जो बचता है, वह ग्राम में रहता है।",
    "How many whole kilograms fit, and what is left?": "कितने पूरे किलोग्राम आते हैं, और क्या बचता है?",
    "Put kilogram weights on the pan until one more would tip it. Then find the grams over.": "पलड़े पर किलोग्राम के बाट रखो, जब तक एक और से पलड़ा न झुके। फिर बचे ग्राम निकालो।",
    "Grams become kilograms and grams by dividing by a thousand. The quotient is the kilograms and the remainder stays as grams.": "एक हज़ार से भाग देने पर ग्राम, किलोग्राम और ग्राम बनते हैं। भागफल किलोग्राम है और शेषफल ग्राम में रहता है।",
    "You learned: divide by 1,000. Whole kilograms, then grams left over.": "तुमने सीखा: 1,000 से भाग दो। पूरे किलोग्राम, फिर बचे ग्राम।",
    "Write 6,385 grams in kilograms and grams.": "6,385 ग्राम को किलोग्राम और ग्राम में लिखो।",
    "6,385 g in kilograms and grams": "6,385 ग्रा को किलोग्राम और ग्राम में",
    "How many grams make one kilogram?": "कितने ग्राम से एक किलोग्राम बनता है?",
    "Now 2,750 grams. Split it the same way.": "अब 2,750 ग्राम। इसे भी ऐसे ही बाँटो।",
    "2,750 g in kilograms and grams": "2,750 ग्रा को किलोग्राम और ग्राम में",
    "How many whole thousands are there in 2,750?": "2,750 में कितने पूरे हज़ार हैं?",
    "A sack of rice weighs 25,400 grams. How many kilograms and grams is that?": "चावल की एक बोरी का वज़न 25,400 ग्राम है। यह कितने किलोग्राम और ग्राम हुआ?",
    "25,400 g in kilograms and grams": "25,400 ग्रा को किलोग्राम और ग्राम में",
    "Take away the whole thousands. What is left?": "पूरे हज़ार हटा दो। क्या बचा?",
    /* phase 4 */
    "A zero that holds a place in grams": "ग्राम में स्थान रखने वाला शून्य",
    "The grams leave some places empty. What goes in each one?": "ग्राम कुछ स्थान खाली छोड़ते हैं। हर खाली स्थान में क्या आता है?",
    "Which boxes are still empty?": "कौन-से खाने अब भी खाली हैं?",
    "Each empty place between the digits needs a zero.": "अंकों के बीच हर खाली स्थान में शून्य चाहिए।",
    "Beside kilograms the grams take three places, and a zero holds each place they leave empty.": "किलोग्राम के साथ ग्राम तीन स्थान लेते हैं, और हर खाली स्थान में शून्य आता है।",
    "You learned: a zero holds each place the grams leave empty.": "तुमने सीखा: ग्राम जो स्थान खाली छोड़ें, वहाँ शून्य आता है।",
    "Write 7 kilograms 9 grams in grams.": "7 किलोग्राम 9 ग्राम को ग्राम में लिखो।",
    "7 kg 9 g in grams?": "7 किग्रा 9 ग्रा कितने ग्राम?",
    "Which boxes do the grams fill?": "ग्राम कौन-से खाने भरते हैं?",
    "Now 30 kilograms 8 grams. How many grams in all?": "अब 30 किलोग्राम 8 ग्राम। कुल कितने ग्राम?",
    "30 kg 8 g in grams?": "30 किग्रा 8 ग्रा कितने ग्राम?",
    "Where do the 8 grams go: hundreds, tens or ones?": "8 ग्राम कहाँ जाएँगे: सैकड़ा, दहाई या इकाई?",
    "A child writes 4,070 grams as 4 kilograms 700 grams. What is right?": "एक बच्चा 4,070 ग्राम को 4 किलोग्राम 700 ग्राम लिखता है। सही क्या है?",
    "4,070 g in kilograms and grams": "4,070 ग्रा को किलोग्राम और ग्राम में",
    "The grams are the last three digits. Read them again.": "ग्राम आख़िरी तीन अंक हैं। उन्हें फिर से पढ़ो।",
    /* drawn on the working area, the slot and the summary */
    "kg": "किग्रा", "g": "ग्रा", "1 kg": "1 किग्रा", "100 g": "100 ग्रा", "10 g": "10 ग्रा", "1 g": "1 ग्रा",
    "cement": "सीमेंट", "spoon": "चम्मच", "letter": "चिट्ठी", "onions": "प्याज़", "eraser": "रबड़", "keys": "चाबियाँ",
    "things sorted": "छाँटी गई चीज़ें", "100 g weights": "100 ग्रा के बाट", "cards passed": "गुज़रे कार्ड", "yours": "तुम्हारा",
    "TTh": "द.ह.", "Th": "ह.", "H": "सै.", "T": "द.", "O": "इ.",
  },
  gu: {
    "Weighing Bench": "તોલવાનું ટેબલ",
    "A balance and a shelf of things. Is each one heavy or light?": "એક ત્રાજવું અને છાજલી પર થોડી વસ્તુઓ. દરેક વસ્તુ ભારે છે કે હલકી?",
    "Every thing weighed in a unit that suits it. Every weight changed by a thousand, the remainder kept as grams.": "દરેક વસ્તુ તેના યોગ્ય એકમમાં તોલાઈ. દરેક વજન એક હજારથી બદલાયું, અને શેષ ગ્રામમાં રહી.",
    "Free play. Anything on the balance, and any weight through the converter either way.": "મુક્ત રમત. ત્રાજવા પર કંઈ પણ મૂકો અને કોઈ પણ વજન મશીનમાંથી ઉપર કે નીચે મોકલો.",
    /* phase 1 */
    "Grams or kilograms": "ગ્રામ કે કિલોગ્રામ",
    "A kilogram weight sits on one pan. Lift a thing onto the other pan, then send it to a tray.": "એક પલ્લામાં કિલોગ્રામનું વજનિયું છે. કોઈ વસ્તુ બીજા પલ્લામાં મૂકો, પછી તેને ટ્રેમાં મોકલો.",
    "Which pan went down?": "કયું પલ્લું નીચે ગયું?",
    "Weigh one heavy thing and one light thing. Which pan goes down each time?": "એક ભારે અને એક હલકી વસ્તુ તોલો. દરેક વખતે કયું પલ્લું નીચે જાય છે?",
    "Heavy things are usually weighed in kilograms and light things in grams. On a pan balance, the pan that goes down holds the heavier load.": "ભારે વસ્તુઓ સામાન્ય રીતે કિલોગ્રામમાં અને હલકી વસ્તુઓ ગ્રામમાં તોલાય છે. ત્રાજવાનું જે પલ્લું નીચે જાય, તેમાં ભારે વસ્તુ હોય છે.",
    "You learned: heavy things in kilograms, light things in grams.": "તમે શીખ્યા: ભારે વસ્તુ કિલોગ્રામમાં, હલકી વસ્તુ ગ્રામમાં.",
    "Which unit suits each weight: a bag of cement, and a steel spoon?": "દરેક વજન માટે કયો એકમ યોગ્ય છે: સિમેન્ટની થેલી, અને સ્ટીલની ચમચી?",
    "Cement, spoon: which tray?": "સિમેન્ટ, ચમચી: કઈ ટ્રે?",
    "Is each thing heavy or light in the hand?": "હાથમાં દરેક વસ્તુ ભારે લાગે કે હલકી?",
    "Grams or kilograms: a letter in an envelope, and a sack of onions?": "ગ્રામ કે કિલોગ્રામ: પરબીડિયામાં એક પત્ર, અને ડુંગળીની એક ગૂણ?",
    "Letter, onions: which tray?": "પત્ર, ડુંગળી: કઈ ટ્રે?",
    "Which of the two could you lift with one finger?": "આ બેમાંથી કઈ વસ્તુ તમે એક આંગળીથી ઉપાડી શકો?",
    "A child weighs an eraser and writes 20 kilograms. Which unit should it be?": "એક બાળક રબર તોલીને 20 કિલોગ્રામ લખે છે. એકમ કયો હોવો જોઈએ?",
    "Eraser: 20 kg? Which unit?": "રબર: 20 કિગ્રા? કયો એકમ?",
    "Could an eraser weigh as much as 20 bags of sugar?": "શું એક રબર ખાંડની 20 થેલી જેટલું ભારે હોઈ શકે?",
    "grams": "ગ્રામ",
    "kilograms": "કિલોગ્રામ",
    "Both in trays, so press Enter.": "બંને ટ્રેમાં છે, હવે એન્ટર દબાવો.",
    "Send each thing to a tray first.": "પહેલાં દરેક વસ્તુ ટ્રેમાં મોકલો.",
    /* phase 2 */
    "A thousand grams make a kilogram": "એક હજાર ગ્રામથી એક કિલોગ્રામ બને",
    "How many grams level the kilogram? Put hundred gram weights on the empty pan until the beam is level.": "કેટલા ગ્રામ કિલોગ્રામની બરાબર થાય? દાંડી સીધી થાય ત્યાં સુધી ખાલી પલ્લામાં સો ગ્રામનાં વજનિયાં મૂકો.",
    "How many grams levelled one kilogram?": "કેટલા ગ્રામથી એક કિલોગ્રામ બરાબર થયું?",
    "Multiply the kilograms by the one number on the converter. Then add any grams.": "કિલોગ્રામને મશીન પરની એક સંખ્યાથી ગુણો. પછી બાકીના ગ્રામ ઉમેરો.",
    "A thousand grams make a kilogram. Kilograms become grams by multiplying by a thousand, and only by a thousand, with any grams added on.": "એક હજાર ગ્રામથી એક કિલોગ્રામ બને છે. કિલોગ્રામના ગ્રામ બનાવવા ફક્ત એક હજારથી ગુણો, પછી બાકીના ગ્રામ ઉમેરો.",
    "You learned: 1 kilogram is 1,000 grams, so multiply by 1,000 only.": "તમે શીખ્યા: 1 કિલોગ્રામમાં 1,000 ગ્રામ, તેથી ફક્ત એક હજારથી ગુણો.",
    "How many grams are there in 9 kilograms?": "9 કિલોગ્રામમાં કેટલા ગ્રામ હોય?",
    "9 kg in grams?": "9 કિગ્રા એટલે કેટલા ગ્રામ?",
    "What number is printed on the converter?": "મશીન પર કઈ સંખ્યા છાપેલી છે?",
    "Now 5 kilograms. How many grams is that?": "હવે 5 કિલોગ્રામ. તે કેટલા ગ્રામ થાય?",
    "5 kg is how many grams?": "5 કિગ્રા કેટલા ગ્રામ?",
    "Five kilogram weights. Each one levels how many grams?": "કિલોગ્રામનાં પાંચ વજનિયાં. દરેક કેટલા ગ્રામની બરાબર છે?",
    "A bag holds 13 kilograms 640 grams. Change it all into grams.": "એક થેલીમાં 13 કિલોગ્રામ 640 ગ્રામ છે. આખું વજન ગ્રામમાં બદલો.",
    "13 kg 640 g in grams?": "13 કિગ્રા 640 ગ્રા કેટલા ગ્રામ?",
    "Change the 13 kilograms first. The 640 grams are grams already.": "પહેલાં 13 કિલોગ્રામ બદલો. 640 ગ્રામ તો પહેલેથી ગ્રામમાં છે.",
    "The pan holds 1,000 grams, and it balances 1 kilogram.": "પલ્લામાં 1,000 ગ્રામ છે, અને તે 1 કિલોગ્રામની બરાબર છે.",
    "Now try it on other weights.": "હવે બીજાં વજન પર અજમાવો.",
    /* phase 3 */
    "Grams into kilograms and grams": "ગ્રામમાંથી કિલોગ્રામ અને ગ્રામ",
    "How many whole kilograms are in it? What is left stays in grams.": "તેમાં કેટલા આખા કિલોગ્રામ છે? જે બાકી રહે, તે ગ્રામમાં રહે છે.",
    "How many whole kilograms fit, and what is left?": "કેટલા આખા કિલોગ્રામ સમાય છે, અને શું બાકી રહે છે?",
    "Put kilogram weights on the pan until one more would tip it. Then find the grams over.": "એક વધુ મૂકતાં પલ્લું નમી જાય ત્યાં સુધી કિલોગ્રામનાં વજનિયાં મૂકો. પછી બાકીના ગ્રામ શોધો.",
    "Grams become kilograms and grams by dividing by a thousand. The quotient is the kilograms and the remainder stays as grams.": "એક હજારથી ભાગતાં ગ્રામના કિલોગ્રામ અને ગ્રામ બને છે. ભાગફળ કિલોગ્રામ છે અને શેષ ગ્રામમાં રહે છે.",
    "You learned: divide by 1,000. Whole kilograms, then grams left over.": "તમે શીખ્યા: એક હજારથી ભાગો. આખા કિલોગ્રામ, પછી બાકીના ગ્રામ.",
    "Write 6,385 grams in kilograms and grams.": "6,385 ગ્રામને કિલોગ્રામ અને ગ્રામમાં લખો.",
    "6,385 g in kilograms and grams": "6,385 ગ્રા ને કિલોગ્રામ અને ગ્રામમાં",
    "How many grams make one kilogram?": "કેટલા ગ્રામથી એક કિલોગ્રામ બને?",
    "Now 2,750 grams. Split it the same way.": "હવે 2,750 ગ્રામ. તેને પણ એ જ રીતે વહેંચો.",
    "2,750 g in kilograms and grams": "2,750 ગ્રા ને કિલોગ્રામ અને ગ્રામમાં",
    "How many whole thousands are there in 2,750?": "2,750 માં કેટલા આખા હજાર છે?",
    "A sack of rice weighs 25,400 grams. How many kilograms and grams is that?": "ચોખાની એક ગૂણનું વજન 25,400 ગ્રામ છે. તે કેટલા કિલોગ્રામ અને ગ્રામ થાય?",
    "25,400 g in kilograms and grams": "25,400 ગ્રા ને કિલોગ્રામ અને ગ્રામમાં",
    "Take away the whole thousands. What is left?": "આખા હજાર કાઢી લો. શું બાકી રહ્યું?",
    /* phase 4 */
    "A zero that holds a place in grams": "ગ્રામમાં સ્થાન સાચવતો શૂન્ય",
    "The grams leave some places empty. What goes in each one?": "ગ્રામ કેટલાંક સ્થાન ખાલી છોડે છે. દરેક ખાલી સ્થાનમાં શું આવે?",
    "Which boxes are still empty?": "કયાં ખાનાં હજી ખાલી છે?",
    "Each empty place between the digits needs a zero.": "અંકોની વચ્ચેના દરેક ખાલી સ્થાનમાં શૂન્ય જોઈએ.",
    "Beside kilograms the grams take three places, and a zero holds each place they leave empty.": "કિલોગ્રામની સાથે ગ્રામ ત્રણ સ્થાન લે છે, અને દરેક ખાલી સ્થાનમાં શૂન્ય આવે છે.",
    "You learned: a zero holds each place the grams leave empty.": "તમે શીખ્યા: ગ્રામ જે સ્થાન ખાલી છોડે, ત્યાં શૂન્ય આવે.",
    "Write 7 kilograms 9 grams in grams.": "7 કિલોગ્રામ 9 ગ્રામને ગ્રામમાં લખો.",
    "7 kg 9 g in grams?": "7 કિગ્રા 9 ગ્રા કેટલા ગ્રામ?",
    "Which boxes do the grams fill?": "ગ્રામ કયાં ખાનાં ભરે છે?",
    "Now 30 kilograms 8 grams. How many grams in all?": "હવે 30 કિલોગ્રામ 8 ગ્રામ. કુલ કેટલા ગ્રામ?",
    "30 kg 8 g in grams?": "30 કિગ્રા 8 ગ્રા કેટલા ગ્રામ?",
    "Where do the 8 grams go: hundreds, tens or ones?": "8 ગ્રામ ક્યાં જશે: શતક, દશક કે એકમ?",
    "A child writes 4,070 grams as 4 kilograms 700 grams. What is right?": "એક બાળક 4,070 ગ્રામને 4 કિલોગ્રામ 700 ગ્રામ લખે છે. સાચું શું છે?",
    "4,070 g in kilograms and grams": "4,070 ગ્રા ને કિલોગ્રામ અને ગ્રામમાં",
    "The grams are the last three digits. Read them again.": "ગ્રામ એ છેલ્લા ત્રણ અંક છે. તેમને ફરી વાંચો.",
    /* drawn on the working area, the slot and the summary */
    "kg": "કિગ્રા", "g": "ગ્રા", "1 kg": "1 કિગ્રા", "100 g": "100 ગ્રા", "10 g": "10 ગ્રા", "1 g": "1 ગ્રા",
    "cement": "સિમેન્ટ", "spoon": "ચમચી", "letter": "પત્ર", "onions": "ડુંગળી", "eraser": "રબર", "keys": "ચાવીઓ",
    "things sorted": "ગોઠવેલી વસ્તુઓ", "100 g weights": "100 ગ્રા વજનિયાં", "cards passed": "પસાર કાર્ડ", "yours": "તમારું",
    "TTh": "દ.હ.", "Th": "હ.", "H": "શ.", "T": "દ.", "O": "એ.",
  },
};

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   demo?   { ... } when the phase opens on the child's one physical act (see api.demoDone)
   items   the authored fallback: three a phase, the third tests whether the phase landed.
           qid   the plan's question id (<conceptId>:ML<n> or <conceptId>:<q_no>); null for an item you author
           kind  your name for the item type (the Work, judge and oracle switch on it)
           say   the spoken question; ask = the short prompt above the slot (<= 3 lines of ~15 chars)
           answer what the slot or the working area must produce; miss = rung 1, never the answer
           choices? [{ id, label }] for a word answer; pad?: "enter" when it is made on the working area
           parts?  [{ label, unit? }, …] with answer [a, b]: two boxes in the slot (quotient · remainder;
                   label at most 10 characters, e.g. { label: "each bowl", unit: "mL" }); typed reads "16|1".
                   A fraction: parts: SLOT_FRACTION, answer [3, 4] (drawn stacked). A mixed number or a
                   tidied answer: parts: SLOT_MIXED, answer [1, 2, 3] · [5, null, null] · [null, 7, 10]
                   (null = that box stays empty; the slot never says which kind the answer is)
                   A decimal: answer "0.09", a string in its written form (so "0.30" is not "0.3" and ".3"
                   is not "0.3"), with pointKey: true in the tool object below (the pad's point key) */
/* a weight in two units, typed in the slot's two boxes (docs/PATTERNS.md §2), labelled with the unit symbol alone
   (BUILD_CARD §7, 2026-09-24: the word stays in the ask and the spoken lines) */
const PARTS_KG = [{ label: "kg" }, { label: "g" }];
const PHASES = [
  {
    n: 1,
    concept: "Grams or kilograms",
    conceptId: "M2.S3.T5.C16", objectiveIds: ["O7"],
    says: ["A kilogram weight sits on one pan. Lift a thing onto the other pan, then send it to a tray."],
    /* tries, as the plan writes it: rung 1 the item's own miss (heavy or light in the hand?); rung 2 which pan went
       down; rung 3 weigh one heavy thing and one light one against each other. The word pad stays open. */
    ladder: ["Which pan went down?","Weigh one heavy thing and one light thing. Which pan goes down each time?"],
    closing: "Heavy things are usually weighed in kilograms and light things in grams. On a pan balance, the pan that goes down holds the heavier load.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: heavy things in kilograms, light things in grams.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "Each thing not in its right tray is weighed again against the kilogram with the arrow lit on the pan that went down, then drawn in its right tray (the eraser's 20 kg is set against it first, then 20 g, which balances).",
    items: [
      /* learn ML1: answer in the plan = The bag of cement in kilograms, and the spoon in grams.
         Made on the working area: each thing goes into a tray; the answer lists the trays in `things` order. */
      { qid: "M2.S3.T5.C16:ML1", kind: "sort", things: ["cement", "spoon"], pad: "enter", answer: "kg,g", winMs: 1800,
        say: "Which unit suits each weight: a bag of cement, and a steel spoon?", ask: "Cement, spoon: which tray?",
        miss: "Is each thing heavy or light in the hand?" },
      /* practice 1: answer in the plan = The letter in grams, and the sack of onions in kilograms */
      { qid: "M2.S3.T5.C16:1", kind: "sort", things: ["letter", "onions"], pad: "enter", answer: "g,kg", winMs: 1800,
        say: "Grams or kilograms: a letter in an envelope, and a sack of onions?", ask: "Letter, onions: which tray?",
        miss: "Which of the two could you lift with one finger?" },
      /* practice 2: answer in the plan = 20 g. An eraser is light, so it is weighed in grams (the unit is the answer) */
      { qid: "M2.S3.T5.C16:2", kind: "unit", things: ["eraser"], choices: [{ id: "g", label: "grams" }, { id: "kg", label: "kilograms" }],
        answer: "g", winMs: 2000,
        say: "A child weighs an eraser and writes 20 kilograms. Which unit should it be?", ask: "Eraser: 20 kg? Which unit?",
        miss: "Could an eraser weigh as much as 20 bags of sugar?" },
    ],
  },
  {
    n: 2,
    concept: "A thousand grams make a kilogram",
    conceptId: "M2.S3.T5.C17", objectiveIds: ["O7"],
    says: ["How many grams level the kilogram? Put hundred gram weights on the empty pan until the beam is level."],
    /* the phase opens on the child's one act: hundred gram weights go on until the beam levels (the Delight) */
    demo: { act: "level" },
    /* tries, as the plan writes it: rung 1 the item's own miss; rung 2 how many grams levelled one kilogram; rung 3
       multiply the kilograms by the converter's one number, then add the grams. The number pad stays open. */
    ladder: ["How many grams levelled one kilogram?","Multiply the kilograms by the one number on the converter. Then add any grams."],
    closing: "A thousand grams make a kilogram. Kilograms become grams by multiplying by a thousand, and only by a thousand, with any grams added on.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: 1 kilogram is 1,000 grams, so multiply by 1,000 only.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The converter's 1,000 lights; the card's kilograms go on one pan and the child's grams on the other, and the beam tips; the card passes down (grams added on after the kilograms) and comes out in grams, and the grams pan levels at the right number.",
    items: [
      /* learn ML2: answer in the plan = 9000 g */
      { qid: "M2.S3.T5.C17:ML2", kind: "toG", kg: 9, g: 0, answer: 9000, winMs: 3000,
        say: "How many grams are there in 9 kilograms?", ask: "9 kg in grams?",
        miss: "What number is printed on the converter?" },
      /* practice 3: answer in the plan = 5000 g */
      { qid: "M2.S3.T5.C17:3", kind: "toG", kg: 5, g: 0, answer: 5000, winMs: 3000,
        say: "Now 5 kilograms. How many grams is that?", ask: "5 kg is how many grams?",
        miss: "Five kilogram weights. Each one levels how many grams?" },
      /* practice 4: answer in the plan = 13,640 g. 13 kg is 13,000 g, and 640 g more makes 13,640 g */
      { qid: "M2.S3.T5.C17:4", kind: "toG", kg: 13, g: 640, answer: 13640, winMs: 3800,
        say: "A bag holds 13 kilograms 640 grams. Change it all into grams.", ask: "13 kg 640 g in grams?",
        miss: "Change the 13 kilograms first. The 640 grams are grams already." },
    ],
  },
  {
    n: 3,
    concept: "Grams into kilograms and grams",
    conceptId: "M2.S3.T5.C18", objectiveIds: ["O8"],
    says: ["How many whole kilograms are in it? What is left stays in grams."],
    /* tries, as the plan writes it: rung 1 the item's own miss; rung 2 how many whole kilograms fit, and what is
       left; rung 3 load kilogram weights until one more would tip the beam. The number pad stays open. */
    ladder: ["How many whole kilograms fit, and what is left?","Put kilogram weights on the pan until one more would tip it. Then find the grams over."],
    closing: "Grams become kilograms and grams by dividing by a thousand. The quotient is the kilograms and the remainder stays as grams.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: divide by 1,000. Whole kilograms, then grams left over.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The converter's 1,000 lights; the card's grams go on one pan against the child's kilograms and grams on the other, and the beam tips; the card passes up, the quotient lands in the kilograms slot and the remainder in the grams slot, and the pans level.",
    items: [
      /* learn ML3: answer in the plan = 6 kg 385 g */
      { qid: "M2.S3.T5.C18:ML3", kind: "toKg", grams: 6385, parts: PARTS_KG, answer: [6, 385], winMs: 3000,
        say: "Write 6,385 grams in kilograms and grams.", ask: "6,385 g in kilograms and grams",
        miss: "How many grams make one kilogram?" },
      /* practice 5: answer in the plan = 2 kg 750 g */
      { qid: "M2.S3.T5.C18:5", kind: "toKg", grams: 2750, parts: PARTS_KG, answer: [2, 750], winMs: 3000,
        say: "Now 2,750 grams. Split it the same way.", ask: "2,750 g in kilograms and grams",
        miss: "How many whole thousands are there in 2,750?" },
      /* practice 6: answer in the plan = 25 kg 400 g, because 25,400 divided by 1000 is 25 remainder 400 */
      { qid: "M2.S3.T5.C18:6", kind: "toKg", grams: 25400, parts: PARTS_KG, answer: [25, 400], winMs: 3000,
        say: "A sack of rice weighs 25,400 grams. How many kilograms and grams is that?", ask: "25,400 g in kilograms and grams",
        miss: "Take away the whole thousands. What is left?" },
    ],
  },
  {
    n: 4,
    concept: "A zero that holds a place in grams",
    conceptId: "M2.S3.T5.C19", objectiveIds: ["O8"],
    says: ["The grams leave some places empty. What goes in each one?"],
    /* tries, as the plan writes it: rung 1 the item's own miss; rung 2 which boxes are still empty; rung 3 a zero in
       every empty place between the digits. The number pad stays open. */
    ladder: ["Which boxes are still empty?","Each empty place between the digits needs a zero."],
    closing: "Beside kilograms the grams take three places, and a zero holds each place they leave empty.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: a zero holds each place the grams leave empty.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The child's number is laid on a second board; the card passes through the converter and the place board fills: kilograms in blue, grams in green in their own places, grey zeros dropping into every empty place.",
    items: [
      /* learn ML4: answer in the plan = 7009 g */
      { qid: "M2.S3.T5.C19:ML4", kind: "place", kg: 7, g: 9, answer: 7009, winMs: 3600,
        say: "Write 7 kilograms 9 grams in grams.", ask: "7 kg 9 g in grams?",
        miss: "Which boxes do the grams fill?" },
      /* practice 7: answer in the plan = 30,008 g. Zeros hold the hundreds and the tens of the grams */
      { qid: "M2.S3.T5.C19:7", kind: "place", kg: 30, g: 8, answer: 30008, winMs: 3600,
        say: "Now 30 kilograms 8 grams. How many grams in all?", ask: "30 kg 8 g in grams?",
        miss: "Where do the 8 grams go: hundreds, tens or ones?" },
      /* practice 8: answer in the plan = Dividing by 1000 leaves a remainder of 70, read from the last three digits
         070, whose zero holds the hundreds. The weight is 4 kg 70 g (what is right: two boxes, as phase 3) */
      { qid: "M2.S3.T5.C19:8", kind: "fix", grams: 4070, wrote: [4, 700], parts: PARTS_KG, answer: [4, 70], winMs: 3400,
        say: "A child writes 4,070 grams as 4 kilograms 700 grams. What is right?", ask: "4,070 g in kilograms and grams",
        miss: "The grams are the last three digits. Read them again." },
    ],
  },
];

/* The bench: what each thing weighs (the beam reads these grams), where the balance, trays, converter and
   place board stand in the working area (1086 x 528). */
const WB_THINGS: any = {
  spoon: { grams: 40 }, letter: { grams: 20 }, keys: { grams: 100 }, eraser: { grams: 20 },
  onions: { grams: 10000 }, cement: { grams: 50000 },
};
const WB_BAL = { cx: 290, cy: 132, L: 180, hang: 138 };
const WB_TRAY: any = { g: { x: 584, y: 300, w: 240, h: 200 }, kg: { x: 842, y: 300, w: 240, h: 200 } };
const WB_CV: any = { 2: { x: 650, y: 116, w: 360, h: 180 }, 3: { x: 650, y: 116, w: 360, h: 180 }, 4: { x: 40, y: 116, w: 380, h: 180 },
  free: { x: 660, y: 262, w: 340, h: 140 } };
const WB_BOARD = { x: 490, y: 84, box: 106, gap: 12, heads: ["TTh", "Th", "H", "T", "O"] };
const MODEL = {
  converter: 1000, thingsGrams: { spoon: 40, letter: 20, keys: 100, eraser: 20, onions: 10000, cement: 50000 },
  reference: "one 1 kg weight", gramWeight: 100, trays: ["grams", "kilograms"], placeBoard: WB_BOARD.heads,
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work: the unit from which
   things a child cannot lift in one hand, a weight in grams by writing the grams in three places after the
   kilograms, kilograms and grams by cutting the last three digits off */
const WB_HEAVY: any = { cement: true, onions: true };
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "sort") return it.answer === it.things.map((t: string) => (WB_HEAVY[t] ? "kg" : "g")).join(",");
  if (it.kind === "unit") return it.answer === (WB_HEAVY[it.things[0]] ? "kg" : "g");
  if (it.kind === "toG" || it.kind === "place") return it.answer === Number(String(it.kg) + ("00" + it.g).slice(-3));
  if (it.kind === "toKg" || it.kind === "fix") {
    const s = String(it.grams);
    return it.answer[0] === Number(s.slice(0, -3) || "0") && it.answer[1] === Number(s.slice(-3));
  }
  return false;
}));
/* the most likely wrong answer (the misconception); judge must reject it: the raised pan read as the heavier, so
   the light thing goes to kilograms too, the
   eraser's 20 kept as kilograms, a hundred in place of a thousand (or the grams left behind), the digits set side
   by side with no zeros, the child's 4 kg 700 g */
const nearMiss = (item: any) => {
  if (item.kind === "sort") return item.things.map(() => "kg").join(",");
  if (item.kind === "unit") return "kg";
  if (item.kind === "toG") return item.g ? item.kg * 1000 : item.kg * 100;
  if (item.kind === "toKg") return [Math.floor(item.grams / 100), item.grams % 100];
  if (item.kind === "place") return Number(String(item.kg) + String(item.g));
  if (item.kind === "fix") return item.wrote;
  return typeof item.answer === "number" ? item.answer + 1 : "~";
};
/* the forms of an answer that no question, hint or ladder line may print. A two-unit answer is given away only
   as the pair (the question's own 6,385 holds the digits of 385); a sort, by naming each thing with its unit */
const answerForms = (item: any) => {
  if (item.kind === "sort") return item.things.map((t: string, k: number) => `${t} in ${item.answer.split(",")[k] === "kg" ? "kilograms" : "grams"}`);
  if (item.kind === "unit") return ["20 g", "20 grams"];
  if (item.parts) {
    const [a, b] = item.answer;
    return [`${a} kg ${b} g`, `${a} kilograms ${b} grams`, `${a} kilograms and ${b} grams`, `${words(a)} kilograms ${words(b)} grams`];
  }
  return [String(item.answer), indian(item.answer), words(item.answer)];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;
/* what the answer slot shows: a sort as its two units, a chosen unit in full, grams with their commas */
const format = (v: any, _j?: any, o?: any) => {
  const s = String(v ?? "");
  const tr = (o && o.tx) || ((x: any) => x);
  /* Hindi and Gujarati: the two symbols with a comma (the runtime places the slot's caret by character count,
     and the longer "किग्रा और किग्रा" pushed it past the box) */
  if (/^(kg|g),(kg|g)$/.test(s)) return s.split(",").map((u: string) => tr(u)).join(o && o.lang && o.lang !== "en" ? ", " : " and ");
  if (s === "g") return "grams";
  if (s === "kg") return "kilograms";
  return /^[1-9]\d{3,8}$/.test(s) ? indian(Number(s)) : s;
};

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (T.state().stage === "demo") return HOOK.demo && HOOK.demo();
  if (item.pad === "enter" && HOOK.set) HOOK.set(item.answer);
  return T.submit(item.answer);
};
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: e.g. drop a token that waits; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area: 1086 x 528, origin at its top-left ────────────────────────────────────
   Countable things use CONTENT colours (url(#gHundred|gTen|gOne|gBead|gPointer)); coloured numerals
   and words use a deeper ink, shade(colour, 0.25), so they read at 4.5:1. Type uses T.* only.
   Pieces: drag = useDrag(onDrop) then {...control(id, label), ...drag.bind(pay), ...drag.keys(pay)};
   taps = <Hit id x y w h onPress label />. One <Invite/> marks the one thing to touch.
   Nothing is written here that the voice already says. `wrong` = { value, tries } after a miss:
   lock, redraw the mathematics in steps (the traceback), unlock; never mark it, never reset it.
   stage === "free" is Free play (the plan's writeup.freePlay): no target, every control unlocked. */
/* ── drawing helpers (called, never mounted) ───────────────────────────────────────────────── */
const WB_EDGE = "#3A3A3A";
const wbGrams = (load: any) => (!load ? 0 : (load.thing ? WB_THINGS[load.thing].grams : 0) + (load.ref ? 1000 : 0)
  + (load.parcel || 0) + (load.kg || 0) * 1000 + (load.g || 0) + (load.chip || 0)
  + (load.counts ? (load.counts.kg || 0) * 1000 + (load.counts.g100 || 0) * 100 + (load.counts.g10 || 0) * 10 + (load.counts.g1 || 0) : 0));
/* the beam tips toward the heavier pan (6 to 12 degrees) and is level only for equal loads */
const wbTilt = (l: number, r: number) => (l === r ? 0 : Math.sign(l - r) * (6 + 6 * Math.min(1, Math.abs(l - r) / Math.max(l, r, 1))));

/* a thing from the shelf, drawn plainly, standing on (0, 0), the middle of its base */
function wbThing(id: string) {
  const E = WB_EDGE;
  if (id === "spoon") return (
    <g>
      <rect x={-70} y={-24} width={86} height={13} rx={6.5} fill="#C4CBD2" stroke={E} strokeWidth={2.5} />
      <ellipse cx={34} cy={-20} rx={32} ry={18} fill="#C4CBD2" stroke={E} strokeWidth={2.5} />
      <ellipse cx={27} cy={-26} rx={13} ry={5} fill="#FFFFFF" fillOpacity={0.75} />
    </g>
  );
  if (id === "letter") return (
    <g>
      <rect x={-56} y={-76} width={112} height={76} rx={6} fill="#FFFFFF" stroke={E} strokeWidth={2.5} />
      <path d="M -56 -76 L 0 -34 L 56 -76" fill="none" stroke={E} strokeWidth={2.5} strokeLinejoin="round" />
      <rect x={28} y={-68} width={20} height={22} rx={2} fill="#AEB6BE" stroke={E} strokeWidth={1.5} />
    </g>
  );
  if (id === "cement") return (
    <g>
      <path d="M -56 0 Q -64 -60 -50 -120 L 50 -120 Q 64 -60 56 0 Z" fill="#BDB6AA" stroke="#5F584E" strokeWidth={3} strokeLinejoin="round" />
      <path d="M -48 -106 H 48" stroke="#5F584E" strokeWidth={2} strokeDasharray="6 5" />
      <rect x={-34} y={-82} width={68} height={42} rx={6} fill="#ECE7DD" stroke="#5F584E" strokeWidth={2} />
      <path d="M -22 -61 H 22" stroke="#5F584E" strokeWidth={3} strokeLinecap="round" />
    </g>
  );
  if (id === "onions") return (
    <g>
      <path d="M -52 0 Q -62 -58 -40 -100 L -14 -112 L 14 -112 L 40 -100 Q 62 -58 52 0 Z" fill="#CFB38C" stroke="#6B5236" strokeWidth={3} strokeLinejoin="round" />
      <circle cx={-22} cy={-30} r={17} fill="#A9744C" stroke="#6B5236" strokeWidth={2} />
      <circle cx={17} cy={-26} r={18} fill="#B8845A" stroke="#6B5236" strokeWidth={2} />
      <circle cx={-3} cy={-62} r={17} fill="#A9744C" stroke="#6B5236" strokeWidth={2} />
      <path d="M -14 -112 L 0 -128 L 14 -112" fill="none" stroke="#6B5236" strokeWidth={3} strokeLinejoin="round" />
    </g>
  );
  if (id === "eraser") return (
    <g>
      <rect x={-42} y={-38} width={84} height={38} rx={7} fill="#F4EFE5" stroke={E} strokeWidth={2.5} />
      <path d="M 12 -38 H 35 A 7 7 0 0 1 42 -31 V -7 A 7 7 0 0 1 35 0 H 12 Z" fill="#8E9AA6" stroke={E} strokeWidth={2.5} />
    </g>
  );
  return (
    <g>
      <circle cx={-34} cy={-30} r={20} fill="none" stroke="#8D7C4E" strokeWidth={7} />
      <path d="M -14 -30 H 48 M 34 -30 V -16 M 46 -30 V -18" fill="none" stroke="#9C8A55" strokeWidth={9} strokeLinecap="round" />
    </g>
  );
}
/* a deep blue iron kilogram weight with its handle, standing on (cx, base); w is its foot (wider for a longer
   label: "1 किग्रा" needs more room than "1 kg") */
function wbKgWeight(cx: number, base: number, label: string, w = 84) {
  const edge = shade(CONTENT.hundred, 0.25), hb = w / 2, ht = w / 2 - 12;
  return (
    <g>
      <path d={`M ${cx - 15} ${base - 50} A 15 12 0 0 1 ${cx + 15} ${base - 50}`} fill="none" stroke={edge} strokeWidth={6} />
      <path d={`M ${cx - ht} ${base - 50} L ${cx + ht} ${base - 50} L ${cx + hb} ${base} L ${cx - hb} ${base} Z`} fill="url(#gHundred)" stroke={edge} strokeWidth={2.5} strokeLinejoin="round" />
      <text x={cx} y={base - 15} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF" stroke={edge} strokeWidth={3} paintOrder="stroke">{label}</text>
    </g>
  );
}
/* a small green gram weight, standing on (cx, base) */
function wbGWeight(cx: number, base: number, label: string, w: number) {
  const edge = shade(CONTENT.one, 0.25);
  return (
    <g>
      <rect x={cx - w / 2} y={base - 40} width={w} height={40} rx={8} fill="url(#gOne)" stroke={edge} strokeWidth={2.5} />
      <text x={cx} y={base - 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF" stroke={edge} strokeWidth={3} paintOrder="stroke">{label}</text>
    </g>
  );
}
/* a brown paper parcel: the card's weight on the pan */
function wbParcel(cx: number, base: number) {
  return (
    <g>
      <rect x={cx - 58} y={base - 78} width={116} height={78} rx={8} fill="#D2B48C" stroke="#6B5236" strokeWidth={3} />
      <path d={`M ${cx} ${base - 78} V ${base} M ${cx - 58} ${base - 40} H ${cx + 58}`} stroke="#6B5236" strokeWidth={3} />
    </g>
  );
}
/* counted weights on a pan: kilogram blocks (blue), then grams (green): a thousand grams as one green bar the size
   of a kilogram block (so 9 kg faces nine bars, 1,000 to 1 at a glance), then hundreds, tens and ones, packed in
   rows from the pan up; a heap past 25 of a kind draws 25 (the counter under the pan says the number).
   `counts` is the child's own pieces as they were put on (never regrouped) */
function wbStack(load: any, px: number, base: number) {
  const bl: any[] = [];
  const add = (k: number, w: number, h: number, p: string, c: string) => { for (let j = 0; j < Math.min(k, 25); j++) bl.push({ w, h, p, c }); };
  const g = load.g || 0, n = load.counts || {};
  add((load.kg || 0) + (n.kg || 0), 26, 18, "gHundred", CONTENT.hundred);
  add(Math.floor(g / 1000), 26, 18, "gOne", CONTENT.one);
  add(Math.floor((g % 1000) / 100) + (n.g100 || 0), 26, 14, "gOne", CONTENT.one);
  add(Math.floor((g % 100) / 10) + (n.g10 || 0), 16, 11, "gOne", CONTENT.one);
  add(g % 10 + (n.g1 || 0), 10, 9, "gOne", CONTENT.one);
  const out: any[] = [];
  let y = base, row: any[] = [], rowH = 0;
  const flush = () => {
    const rw = row.reduce((a: number, b: any) => a + b.w + 3, -3);
    let x = px - rw / 2;
    row.forEach((b: any) => {
      out.push(<rect key={out.length} x={x} y={y - b.h} width={b.w} height={b.h} rx={3} fill={`url(#${b.p})`} stroke={shade(b.c, 0.25)} strokeWidth={1.5} />);
      x += b.w + 3;
    });
    y -= rowH + 3; row = []; rowH = 0;
  };
  bl.forEach((b: any) => {
    if (row.length && row.reduce((a: number, q: any) => a + q.w + 3, 0) + b.w > 150) flush();
    row.push(b); rowH = Math.max(rowH, b.h);
  });
  if (row.length) flush();
  return out;
}
/* the converter: one number on its front, a thousand, and no dial; down it multiplies, up it divides */
function wbConverter(cv: any, lit: boolean, C: any) {
  const cx = cv.x + cv.w / 2, cy = cv.y + cv.h / 2;
  const arrow = (x: number, down: boolean) => {
    const tip = down ? cy + 40 : cy - 40, back = down ? -15 : 15;
    return <path d={`M ${x} ${cy - 40} V ${cy + 40} M ${x - 13} ${tip + back} L ${x} ${tip} L ${x + 13} ${tip + back}`} fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />;
  };
  return (
    <g>
      <rect x={cv.x} y={cv.y} width={cv.w} height={cv.h} rx={26} fill="url(#gPanel)" stroke={C.ink} strokeWidth={3} filter="url(#fShadowSoft)" />
      <rect x={cv.x + 50} y={cv.y - 7} width={cv.w - 100} height={14} rx={7} fill={C.ink} />
      <rect x={cv.x + 50} y={cv.y + cv.h - 7} width={cv.w - 100} height={14} rx={7} fill={C.ink} />
      {lit && <rect x={cx - 114} y={cy - 52} width={228} height={96} rx={20} fill="#FFFFFF" stroke={C.accent} strokeWidth={6} />}
      <text x={cx} y={cy + 25} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>1,000</text>
      {arrow(cv.x + 40, true)}
      {arrow(cv.x + cv.w - 40, false)}
    </g>
  );
}

function Work({ phase, n, item, index, stage, wrong, typed, api, lang = "en", tx = (v: any) => v }: any) {
  /* every English word the picture draws goes through tx("...") (its key is added to TR) */
  const C = api.C;
  const tl = useTimeline();
  const fast = reducedMotion();
  const tr = fast ? undefined : "transform 520ms cubic-bezier(.3,1.35,.5,1)";
  const free = stage === "free";
  const done = stage === "win" || stage === "idle";
  const open = stage === "ask" || stage === "teach";
  const kgInk = shade(CONTENT.hundred, 0.25), gInk = shade(CONTENT.one, 0.25), zeroInk = "#767676";
  const B = WB_BAL, rim = B.cy + B.hang;
  /* Hindi and Gujarati unit symbols run longer than "kg" / "g": the weights that carry them are drawn wider */
  const wide = lang !== "en";
  const kgW = wide ? 112 : 84;
  const gW = (p: string) => (p === "g100" ? 96 : p === "g10" ? 80 : p === "g1" ? 64 : 84) + (wide ? 26 : 0);

  /* phase 1: where each thing of this question is ("shelf" | "pan" | "g" | "kg") */
  const [where, setWhere] = useState<any>({});
  const whereRef = useRef<any>({});
  /* phase 2: hundred gram weights on the pan; phase 3: kilogram weights on the pan */
  const [w100, setW100] = useState(0);
  const w100Ref = useRef(0);
  const [kgs, setKgs] = useState(0);
  /* the converter's pass (a win or a correction) and the correction's own layer (never the child's pieces) */
  const [rev, setRev] = useState<any>(null);
  const [demo, setDemo] = useState<any>(null);
  /* free play: a thing on the left pan, weights on the right pan, the card at the top or the foot */
  const [fp, setFp] = useState<any>({ thing: null, stack: [], card: "top", passed: false });
  const acted = useRef(true);
  /* the Enter cue of a sort, said once the first time both things are in trays */
  const cueSaid = useRef(false);
  /* phase 2: the beam has levelled once; from then on the pile and the pan stay live (demo, teach and question) */
  const [lev, setLev] = useState(false);
  const levRef = useRef(false);
  const levelTimer = useRef<any>(null);
  useEffect(() => () => clearTimeout(levelTimer.current), []);
  const busy = useRef(false);
  busy.current = tl.busy;
  const typedAtMiss = useRef<any>(null);
  const put = (w: any) => { whereRef.current = w; setWhere(w); };
  const setW = (k: number) => { w100Ref.current = k; setW100(k); };

  /* a new question: its things on the shelf, the converter and the correction cleared */
  useEffect(() => {
    tl.stop();
    put({}); setKgs(0); setRev(null); setDemo(null); acted.current = true;
  }, [n, index]);
  /* phase 2 entered straight at a question: the kilogram is already levelled */
  useEffect(() => {
    if (n === 2 && !free && (stage === "ask" || done) && !levRef.current) { levRef.current = true; setLev(true); setW(10); }
  }, [stage, n]);

  const up = (o: any) => () => setRev((r: any) => ({ ...(r || {}), ...o }));
  /* the card through the converter, ending on the whole right answer */
  const passSteps = (it: any) => {
    const S: any[] = [[600, () => setRev({ lit: true })]];
    if (it.kind === "toG") {
      if (it.g) S.push([60, up({ kgGone: true, foot: it.kg * 1000, fo: false })], [800, up({ fo: true })], [900, up({ top: "in", foot: it.answer })], [700, up({ top: "gone" })]);
      else S.push([60, up({ top: "in", foot: it.answer, fo: false })], [800, up({ fo: true })], [300, up({ top: "gone" })]);
      S.push([200, up({ eq: true })]);
    } else if (it.kind === "toKg") {
      S.push([60, up({ foot: "in" })], [800, up({ foot: "gone", kgOut: it.answer[0] })], [700, up({ gOut: it.answer[1] })], [200, up({ eq: true })]);
    } else if (it.kind === "place") {
      S.push([60, up({ top: "in", board: 0 })], [700, up({ top: "gone", board: 1 })], [700, up({ board: 2 })], [60, up({ board: 3, zd: false })],
        [700, up({ zd: true })], [200, up({ foot: it.answer, fo: true, eq: true })]);
    } else if (it.kind === "fix") {
      S.push([60, up({ foot: "in" })], [800, up({ foot: "gone", bracket: true })], [700, up({ kgOut: it.answer[0] })], [700, up({ gOut: it.answer[1] })], [200, up({ eq: true })]);
    }
    return S;
  };
  /* the correction: the balance and the boards show the child's answer beside the right one, then the pass */
  const traceSteps = (it: any, v: any) => {
    const S: any[] = [];
    if (it.kind === "sort") {
      const right = it.answer.split(",");
      const ghosts: any[] = [];
      it.things.forEach((t: string, k: number) => {
        if (whereRef.current[t] === right[k]) return;
        S.push([1500, () => setDemo({ left: { thing: t }, lit: true, ghosts: ghosts.slice() })]);
        S.push([700, () => { ghosts.push({ id: t, tray: right[k] }); setDemo({ ghosts: ghosts.slice() }); }]);
      });
    } else if (it.kind === "unit") {
      S.push([1500, () => setDemo({ left: { thing: "eraser" }, right: { kg: 20 }, rc: [20, null], lit: true })]);
      S.push([1500, () => setDemo({ left: { thing: "eraser" }, right: { chip: 20 }, rc: [null, 20] })]);
      S.push([700, () => setDemo({ ghosts: [{ id: "eraser", tray: "g", tag: 20 }] })]);
    } else if (it.kind === "toG") {
      const child = leadNumber(v) || 0;
      S.push([700, () => setRev({ lit: true })]);
      S.push([1700, () => setDemo({ left: { kg: it.kg, g: it.g }, right: { g: child }, lc: [it.kg, it.g || null], rc: [null, child] })]);
      passSteps(it).slice(1).forEach((s: any) => S.push(s));
      S.push([900, () => setDemo((d: any) => ({ ...(d || {}), right: { g: it.answer }, rc: [null, it.answer] }))]);
    } else if (it.kind === "toKg") {
      const ps = slotPartsOf(v, 2).map((x: string) => Number(x) || 0);
      S.push([700, () => setRev({ lit: true })]);
      S.push([1700, () => setDemo({ left: { parcel: it.grams }, right: { kg: ps[0], g: ps[1] }, lc: [null, it.grams], rc: ps })]);
      passSteps(it).slice(1).forEach((s: any) => S.push(s));
      S.push([900, () => setDemo((d: any) => ({ ...(d || {}), right: { kg: it.answer[0], g: it.answer[1] }, rc: it.answer }))]);
    } else if (it.kind === "place" || it.kind === "fix") {
      const ps = slotPartsOf(v, 2).map((x: string) => Number(x) || 0);
      const mine = it.kind === "fix" ? String(ps[0] * 1000 + ps[1]) : String(v ?? "").replace(/\D/g, "");
      S.push([300, () => setDemo({ board2: mine.length && mine.length <= 5 ? mine : null })]);
      passSteps(it).forEach((s: any) => S.push(s));
    }
    return S;
  };

  /* a right answer: the maths moves (the card passes; the eraser settles in its tray) */
  useEffect(() => {
    if (stage !== "win" || free) return;
    setDemo(null);
    if (item.kind === "unit") { setRev({ eraserIn: true }); return; }
    if (item.kind === "sort") return;
    setRev(null);
    tl.run(passSteps(item));
  }, [stage]);
  /* a miss: the traceback, the pad locked while it runs; nothing marked, nothing reset */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    api.lock(true);
    acted.current = false;
    typedAtMiss.current = typed;
    setRev(null); setDemo(null);
    tl.run(traceSteps(item, wrong.value), () => api.lock(false));
  }, [wrong]);
  /* phase 4: the board is the child's typing, so a new digit after a correction clears it */
  useEffect(() => {
    if (n !== 4 || free || stage !== "ask" || busy.current) return;
    if ((rev || demo) && typed !== typedAtMiss.current) { setRev(null); setDemo(null); }
  }, [typed]);

  /* ── acts ── */
  const touched = () => { acted.current = true; if (!busy.current) setDemo(null); };
  /* a thing dropped anywhere on the balance goes on the thing's pan (the left one; the right holds the weights) */
  const panZone = (at: any) => at.x <= B.cx + B.L + 100 && at.y >= 40 && at.y <= 400;
  const zoneAt = (at: any) => {
    if (!at) return null;
    if (panZone(at)) return "pan";
    if (!free) for (const k of ["g", "kg"]) {
      const r = WB_TRAY[k];
      if (at.x >= r.x && at.x <= r.x + r.w && at.y >= r.y - 20 && at.y <= r.y + r.h + 20) return k;
    }
    if (at.x >= 560 && at.y <= (free ? 200 : 270)) return "shelf";
    return "none";
  };
  const moveThing = (t: string, at: any) => {
    if (busy.current || !open) return;
    const w = { ...whereRef.current };
    const now = w[t] || "shelf";
    const z = zoneAt(at);
    const to = z === null ? (now === "pan" ? "shelf" : "pan") : z;
    if (to === "none" || to === now) return;
    if (item.kind === "unit" && (to === "g" || to === "kg")) { if (stage === "ask") api.submit(to); return; }
    if (to === "pan") Object.keys(w).forEach((k) => { if (w[k] === "pan") w[k] = "shelf"; });
    w[t] = to;
    put(w); touched(); api.sfx.tick(); cueIfSorted(w);
  };
  /* both things in trays for the first time: one cue that Enter sends them (a literal, so it can be baked) */
  const cueIfSorted = (w: any) => {
    if (cueSaid.current || stage !== "ask" || item.kind !== "sort") return;
    if (!item.things.every((t: string) => w[t] === "g" || w[t] === "kg")) return;
    cueSaid.current = true;
    /* one sentence, so the bubble has no second piece to show after a quick Enter has answered */
    api.say("Both in trays, so press Enter.");
  };
  /* a tray (all of it) takes the thing on the pan; with the pan empty it gives this question's thing back to the pan */
  const trayPress = (k: string) => {
    if (busy.current || !open || free) return;
    /* the eraser answers from a tray only once it is on the pan (a stray tap on a tray is never an answer) */
    if (item.kind === "unit") { if (stage === "ask" && whereRef.current.eraser === "pan") api.submit(k); return; }
    const w = { ...whereRef.current };
    const t = (item.things || []).find((x: string) => w[x] === "pan");
    const back = [...(item.things || [])].reverse().find((x: string) => w[x] === k);
    if (t) w[t] = k;
    else if (back) w[back] = "pan";
    else return;
    put(w); touched(); api.sfx.tick(); if (t) cueIfSorted(w);
  };
  const levelDone = () => api.demoDone(["The pan holds 1,000 grams, and it balances 1 kilogram.", "Now try it on other weights."]);
  /* the beam has levelled: the silent pause (the Delight), then the question; the balance stays live throughout */
  const markLevel = () => {
    levRef.current = true; setLev(true);
    clearTimeout(levelTimer.current);
    levelTimer.current = setTimeout(levelDone, fast ? 60 : 1500);
  };
  /* phase 2's balance takes weights in the levelling, and after it until the phase ends */
  const p2live = n === 2 && !free && (stage === "demo" || (lev && (stage === "teach" || stage === "ask")));
  /* Enter (or the agent) in the levelling: the rest of the hundred gram weights go on, one by one */
  const levelAll = () => {
    if (n !== 2 || stage !== "demo" || levRef.current || w100Ref.current >= 10 || busy.current) return;
    const S: any[] = [];
    for (let k = w100Ref.current + 1; k <= 10; k++) S.push([110, () => { setW(k); api.sfx.tick(); }]);
    tl.run(S, markLevel);
  };
  const addWeight = (pile: string, at: any) => {
    if (busy.current) return;
    if (at && !(at.x >= 340 && at.x <= 600 && at.y >= 40 && at.y <= 400)) return;
    if (free) { setFp((f: any) => (f.stack.length >= 60 ? f : { ...f, stack: [...f.stack, pile], card: "top" })); api.sfx.tick(); return; }
    if (n === 2) {
      /* ten at most: the pan levels the kilogram, and one taken off can go back on */
      if (!p2live || w100Ref.current >= 10) return;
      const k = w100Ref.current + 1;
      setW(k); touched(); api.sfx.tick();
      if (k === 10 && stage === "demo" && !levRef.current) markLevel();
      return;
    }
    if (n === 3 && open) { setKgs((k: number) => Math.min(k + 1, 40)); touched(); api.sfx.tick(); }
  };
  /* a tap on the right pan takes its last weight off, and the beam tips back */
  const panPress = () => {
    if (busy.current) return;
    if (free) { if (fp.stack.length) { setFp((f: any) => ({ ...f, stack: f.stack.slice(0, -1), card: "top" })); api.sfx.tick(); } return; }
    if (p2live && w100Ref.current > 0) { setW(w100Ref.current - 1); touched(); api.sfx.tick(); return; }
    if (n === 3 && open && kgs > 0) { setKgs(kgs - 1); touched(); api.sfx.tick(); }
  };
  const freeThing = (t: string, at: any) => {
    const on = fp.thing === t, z = zoneAt(at);
    const to = z === null ? (on ? "shelf" : "pan") : z;
    if (to === "pan" && !on) setFp((f: any) => ({ ...f, thing: t }));
    else if (to === "shelf" && on) setFp((f: any) => ({ ...f, thing: null }));
    else return;
    api.sfx.tick();
  };
  const drag = useDrag((p: any, at: any, moved: boolean) => {
    const pt = moved && at && isFinite(at.x) ? at : null;
    if (p.t) return free ? freeThing(p.t, pt) : moveThing(p.t, pt);
    if (p.pile) return addWeight(p.pile, pt);
  });
  /* Enter or Space on a piece is a tap. Space keeps the focus there (so a child can press it again, or Tab on
     from it); Enter gives the focus back to the page, so the next Enter answers */
  const keysOf = (p: any) => ({ onKeyDown: (e: any) => { drag.keys(p).onKeyDown(e); if (e.key === "Enter") pointerBlur(); } });
  /* the trays and the right pan: whole-area controls. Space presses and keeps the focus; Enter presses too, except
     on a tray when the pan holds nothing to send (then it passes to the window and answers, PATTERNS §5b) */
  const pressG = usePress(() => trayPress("g"));
  const pressKg = usePress(() => trayPress("kg"));
  const pressPan = usePress(() => panPress());
  const keyKeep = (act: () => void, passEnter: () => boolean) => (e: any) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    if (e.key === "Enter" && passEnter()) return;
    e.preventDefault(); e.stopPropagation();
    act();
    if (e.key === "Enter") pointerBlur();
  };
  const panHolds = () => (item.things || []).some((x: string) => whereRef.current[x] === "pan");

  /* Enter while the working area owns the answer: a sort is sent once both things are in trays, and only after
     a fresh act since a miss; in the levelling it finishes the levelling */
  const sortEnter = () => {
    if (stage !== "ask" || busy.current) return;
    const w = whereRef.current;
    if (!item.things.every((t: string) => w[t] === "g" || w[t] === "kg")) { api.say("Send each thing to a tray first."); return; }
    if (!acted.current) return;
    api.submit(item.things.map((t: string) => w[t]).join(","));
  };
  api.onEnter(free ? null : stage === "demo" ? levelAll : item.kind === "sort" ? sortEnter : null);
  HOOK.set = (v: any) => {
    if (free || item.kind !== "sort") return undefined;
    const us = String(v ?? "").split(",");
    const w: any = {};
    item.things.forEach((t: string, k: number) => { w[t] = us[k] === "kg" ? "kg" : "g"; });
    put(w); acted.current = true; setDemo(null);
    return true;
  };
  HOOK.demo = levelAll;
  HOOK.check = () => undefined;

  /* ── the balance: own loads, or the correction's ── */
  const things: string[] = free ? ["spoon", "keys", "letter", "onions", "cement"] : n === 1 ? item.things : [];
  const panThing = free ? fp.thing : things.find((t: string) => where[t] === "pan") || null;
  let L: any = null, R: any = null, lc: any = null, rc: any = null;
  const fkg = fp.stack.filter((s: string) => s === "kg").length;
  const fg = fp.stack.reduce((a: number, s: string) => a + (s === "g100" ? 100 : s === "g10" ? 10 : s === "g1" ? 1 : 0), 0);
  /* free play: the pan shows the pieces as they were put on; the counter and the card show the tidy weight */
  const fG = fkg * 1000 + fg;
  const fTidy = fG ? [Math.floor(fG / 1000) || null, fG % 1000 || null] : null;
  const count = (s: string) => fp.stack.filter((x: string) => x === s).length;
  if (free) { R = { counts: { kg: fkg, g100: count("g100"), g10: count("g10"), g1: count("g1") } }; rc = fTidy; }
  else if (n === 1) R = { ref: true };
  else if (n === 2) { L = { ref: true }; R = { counts: { g100: w100 } }; rc = w100 ? [null, w100 * 100] : null; }
  else if (n === 3) { L = { parcel: item.grams }; R = { kg: kgs }; rc = kgs ? [kgs, null] : null; }
  const dm = !free && demo && (demo.left || demo.right) ? demo : null;
  const LL = dm && dm.left ? dm.left : L, RR = dm && dm.right ? dm.right : R;
  const lcc = dm && dm.lc !== undefined ? dm.lc : lc, rcc = dm && dm.rc !== undefined ? dm.rc : rc;
  const leftThing = LL && LL.thing ? LL.thing : panThing;
  const ghostThing = LL && LL.thing && LL.thing !== panThing ? LL.thing : null;
  const lW = wbGrams(LL) + (leftThing && !(LL && LL.thing) ? WB_THINGS[leftThing].grams : 0);
  const a = wbTilt(lW, wbGrams(RR));
  const dyL = B.L * Math.sin((a * Math.PI) / 180);

  const amount = (v: any, unitSize: number) => {
    const [kg, g] = v || [];
    const out: any[] = [];
    if (kg !== null && kg !== undefined) {
      out.push(<tspan key="a" fill={kgInk}>{indian(kg)}</tspan>, <tspan key="b" dx={6} fontSize={unitSize} fill={C.ink}>{tx("kg")}</tspan>);
    }
    if (g !== null && g !== undefined) {
      out.push(<tspan key="c" dx={out.length ? 14 : 0} fill={gInk}>{indian(g)}</tspan>, <tspan key="d" dx={6} fontSize={unitSize} fill={C.ink}>{tx("g")}</tspan>);
    }
    return out;
  };
  const panAt = (px: number, dy: number, load: any, key: string) => (
    <g key={key} style={{ transform: `translateY(${dy}px)`, transition: tr } as any}>
      <path d={`M ${px - 80} ${rim} L ${px} ${B.cy} L ${px + 80} ${rim}`} fill="none" stroke={C.ink} strokeWidth={2.5} strokeLinejoin="round" />
      {load && load.ref && wbKgWeight(px, rim, tx("1 kg"), kgW)}
      {load && load.parcel && wbParcel(px, rim)}
      {load && load.chip && wbGWeight(px, rim, `${load.chip} ${tx("g")}`, gW("chip"))}
      {load && wbStack(load, px, rim - (load.parcel ? 80 : load.ref ? 52 : 0))}
      <path d={`M ${px - 88} ${rim} Q ${px} ${rim + 48} ${px + 88} ${rim} Z`} fill="#E6E0D5" stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
    </g>
  );
  const arrowLit = !!(dm && dm.lit);
  const balanceArt = () => (
    <g>
      <rect x={B.cx - 9} y={B.cy} width={18} height={244} rx={4} fill={C.ink} />
      <rect x={B.cx - 72} y={372} width={144} height={22} rx={10} fill={C.ink} />
      {panAt(B.cx - B.L, dyL, LL, "pl")}
      {panAt(B.cx + B.L, -dyL, RR, "pr")}
      <g transform={`translate(${B.cx},${B.cy})`}>
        <g style={{ transform: `rotate(${-a}deg)`, transition: tr } as any}>
          <rect x={-B.L - 12} y={-8} width={2 * B.L + 24} height={16} rx={8} fill={C.ink} />
        </g>
        <circle r={15} fill={C.ink} />
        <circle r={6} fill="#FFFFFF" />
      </g>
      {/* the small arrow under the beam points to the pan that went down; level, it points up */}
      <rect x={B.cx - 50} y={B.cy + 44} width={100} height={42} rx={12} fill="#FFFFFF" stroke={arrowLit ? C.accent : C.ink} strokeWidth={arrowLit ? 5 : 2} />
      {a === 0
        ? <path d={`M ${B.cx - 14} ${B.cy + 76} L ${B.cx} ${B.cy + 54} L ${B.cx + 14} ${B.cy + 76} Z`} fill={C.ink} />
        : <path d={a > 0 ? `M ${B.cx + 32} ${B.cy + 65} H ${B.cx - 30} M ${B.cx - 14} ${B.cy + 53} L ${B.cx - 32} ${B.cy + 65} L ${B.cx - 14} ${B.cy + 77}`
            : `M ${B.cx - 32} ${B.cy + 65} H ${B.cx + 30} M ${B.cx + 14} ${B.cy + 53} L ${B.cx + 32} ${B.cy + 65} L ${B.cx + 14} ${B.cy + 77}`}
            fill="none" stroke={arrowLit ? C.accent : C.ink} strokeWidth={arrowLit ? 8 : 6} strokeLinecap="round" strokeLinejoin="round" />}
      {lcc && <text x={B.cx - B.L} y={362} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{amount(lcc, T.micro)}</text>}
      {rcc && <text x={B.cx + B.L} y={362} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{amount(rcc, T.micro)}</text>}
    </g>
  );

  /* ── phase 1: the shelf, the trays and the things ── */
  const SHELF_Y = 188;
  const shelfX = (t: string) => (free ? 648 + things.indexOf(t) * 96 : things.length === 1 ? 840 : things.indexOf(t) === 0 ? 720 : 960);
  const trayList: any = { g: [], kg: [] };
  if (n === 1 && !free) {
    phase.items.slice(0, index).forEach((it: any) => it.things.forEach((t: string, k: number) => {
      trayList[it.kind === "unit" ? it.answer : it.answer.split(",")[k]].push({ id: t, kind: "settled" });
    }));
    things.forEach((t: string) => {
      const p = t === "eraser" && rev && rev.eraserIn ? "g" : where[t];
      if (p === "g" || p === "kg") trayList[p].push({ id: t, kind: "own" });
    });
    ((demo && demo.ghosts) || []).forEach((gh: any) => trayList[gh.tray].push({ id: gh.id, kind: "ghost", tag: gh.tag }));
  }
  const slotAt = (tray: string, k: number) => ({ x: WB_TRAY[tray].x + 44 + k * 76, y: WB_TRAY[tray].y + 188 });
  const placeOf = (t: string) => {
    if (free) return fp.thing === t ? { x: B.cx - B.L, y: rim + dyL - 2, s: 0.8, p: "pan" } : { x: shelfX(t), y: 132, s: 0.55, p: "shelf" };
    const p = t === "eraser" && rev && rev.eraserIn ? "g" : where[t] || "shelf";
    if (p === "pan") return { x: B.cx - B.L, y: rim + dyL - 2, s: 0.8, p };
    if (p === "g" || p === "kg") {
      const k = trayList[p].findIndex((e: any) => e.id === t && e.kind === "own");
      return { ...slotAt(p, k), s: 0.5, p };
    }
    return { x: shelfX(t), y: SHELF_Y, s: 1, p: "shelf" };
  };
  const trayArt = (k: string) => {
    const r = WB_TRAY[k];
    return (
      <g key={k}>
        <rect x={r.x} y={r.y} width={r.w} height={r.h} rx={18} fill="url(#gPanel)" stroke={C.ink} strokeWidth={2.5} />
        <path d={`M ${r.x} ${r.y + 72} H ${r.x + r.w}`} stroke={C.ink} strokeWidth={2} />
        <text x={r.x + r.w / 2} y={r.y + 48} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(k === "g" ? "grams" : "kilograms")}</text>
        {/* the pointer target: the whole tray, under the things in it (they are still dragged or tapped out) */}
        <rect className="c4-hit" x={r.x} y={r.y} width={r.w} height={r.h} fill="transparent" {...(k === "g" ? pressG : pressKg).bind()} />
      </g>
    );
  };
  /* the tray's control for the keyboard and the agent: drawn after the things, so Tab reaches the things first and
     the trays next; it takes no pointer (the tray underneath does) */
  const trayKey = (k: string) => {
    const r = WB_TRAY[k];
    return (
      <rect key={"key" + k} className="c4-hit" {...control("tray-" + k, k === "g" ? "grams tray" : "kilograms tray")} x={r.x} y={r.y} width={r.w} height={r.h}
        fill="transparent" pointerEvents="none" onKeyDown={keyKeep(() => trayPress(k), () => !panHolds())} />
    );
  };
  /* the right pan as a control: a tap takes its last weight off */
  const panControl = (label: string) => (
    <rect className="c4-hit" {...control("pan-right", label)} x={B.cx + B.L - 90} y={100} width={180} height={240}
      fill="transparent" {...pressPan.bind()} onKeyDown={keyKeep(panPress, () => false)} />
  );
  const piece = (t: string) => {
    const q = placeOf(t);
    const dr = drag.drag && drag.drag.payload && drag.drag.payload.t === t ? drag.drag : null;
    const x = dr ? dr.x : q.x, y = dr ? dr.y + 50 * q.s : q.y;
    const inTray = q.p === "g" || q.p === "kg";
    const box = q.p === "shelf" ? (free ? { x: -46, y: -110, w: 92, h: 120 } : { x: -76, y: -150, w: 152, h: 210 })
      : q.p === "pan" ? { x: -85, y: -120, w: 170, h: 140 } : { x: -38, y: -94, w: 76, h: 100 };
    /* in a tray the thing is still dragged or tapped out, but the tray itself is the control (one Tab stop) */
    return (
      <g key={t} className="c4-piece" {...(inTray ? {} : control("thing-" + t, t))} {...drag.bind({ t })} {...(inTray ? {} : keysOf({ t }))}
        style={{ transform: `translate(${x}px, ${y}px)`, transition: dr ? "none" : tr } as any}>
        <rect x={box.x} y={box.y} width={box.w} height={box.h} fill="transparent" />
        <g transform={`scale(${q.s})`}>{wbThing(t)}</g>
        {q.p === "shelf" && !free && <text y={50} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(t)}</text>}
      </g>
    );
  };

  /* ── the piles of weights beside the right pan (phase 2's levelling, phase 3, free play) ── */
  /* a pile: its top weight is the piece to drag; the bars under it never change (nothing counts down) */
  const pileArt = (pile: string, cx: number, left: number, label: string, live: boolean, bars = true) => {
    const isKg = pile === "kg";
    const rest = bars ? 4 : 0;
    const dr = drag.drag && drag.drag.payload && drag.drag.payload.pile === pile ? drag.drag : null;
    const x = dr ? dr.x : cx, y = dr ? dr.y + 30 : 466;
    const bw = isKg ? 26 : pile === "g100" ? 26 : pile === "g10" ? 16 : 10, bh = isKg ? 18 : pile === "g100" ? 14 : pile === "g10" ? 11 : 9;
    return (
      <g key={pile}>
        {Array.from({ length: rest }).map((_, j) => (
          <rect key={j} x={cx - (rest * (bw + 3)) / 2 + j * (bw + 3)} y={518 - bh} width={bw} height={bh} rx={3}
            fill={isKg ? "url(#gHundred)" : "url(#gOne)"} stroke={shade(isKg ? CONTENT.hundred : CONTENT.one, 0.25)} strokeWidth={1.5} />
        ))}
        {left > 0 && live && (
          <g className="c4-piece" {...control("pile-" + pile, label + " weight")} {...drag.bind({ pile })} {...keysOf({ pile })}
            style={{ transform: `translate(${x}px, ${y}px)`, transition: dr ? "none" : tr } as any}>
            <rect x={-56} y={-70} width={112} height={90} fill="transparent" />
            {isKg ? wbKgWeight(0, 0, tx("1 kg"), kgW) : wbGWeight(0, 0, tx(label), gW(pile))}
          </g>
        )}
        {left > 0 && !live && (
          <g transform={`translate(${cx},466)`}>{isKg ? wbKgWeight(0, 0, tx("1 kg"), kgW) : wbGWeight(0, 0, tx(label), gW(pile))}</g>
        )}
      </g>
    );
  };

  /* ── the converter, its cards, the slots and the place board ── */
  const card = (cx: number, y: number, v: any, lit: boolean, dy: number, key: string) => (
    <g key={key} style={{ transform: `translateY(${dy}px)`, transition: tr } as any}>
      <rect x={cx - 150} y={y} width={300} height={76} rx={14} fill="#FFFFFF" stroke={lit ? C.accent : C.ink} strokeWidth={lit ? 5 : 2.5} filter="url(#fShadowSoft)" />
      <text x={cx} y={y + 52} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{amount(v, T.label)}</text>
    </g>
  );
  const slotBox = (x: number, w: number, v: any, unit: string, ink: string) => (
    <g key={unit}>
      <rect x={x} y={16} width={w} height={76} rx={14} fill="#FFFFFF" stroke={C.ink} strokeWidth={2.5} />
      {v !== null && v !== undefined && <text x={x + w - (unit === "kg" ? (wide ? 100 : 64) : (wide ? 72 : 46))} y={68} textAnchor="end" fontSize={T.prompt} fontWeight={700} fill={ink}>{indian(v)}</text>}
      <text x={x + w - 18} y={68} textAnchor="end" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(unit)}</text>
    </g>
  );
  /* an equation under the converter, laid out as short chunks ("9 × 1,000", "= 9,000"): labels, not sentences */
  const eqText = (chunks: string[], cx: number) => {
    const wd = (s: string) => s.split("").reduce((w: number, ch: string) => w + (ch === " " || ch === "," ? 0.3 : 0.62), 0) * T.label;
    const total = chunks.reduce((s: number, c: string) => s + wd(c), 0) + 14 * (chunks.length - 1);
    let x = cx - total / 2;
    return (
      <g>
        {chunks.map((c: string, k: number) => {
          const el = <text key={k} x={x} y={462} fontSize={T.label} fontWeight={700} fill={C.ink}>{c}</text>;
          x += wd(c) + 14;
          return el;
        })}
      </g>
    );
  };
  const bx = (i: number) => WB_BOARD.x + i * (WB_BOARD.box + WB_BOARD.gap);
  const board = (y: number, cells: any[], heads: boolean, key: string) => (
    <g key={key}>
      {WB_BOARD.heads.map((h: string, i: number) => (
        <g key={i}>
          {heads && <text x={bx(i) + WB_BOARD.box / 2} y={y - 16} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(h)}</text>}
          <rect x={bx(i)} y={y} width={WB_BOARD.box} height={WB_BOARD.box} rx={14} fill="#FFFFFF" stroke={C.ink} strokeWidth={2.5} />
          {cells[i] && (
            <text x={bx(i) + WB_BOARD.box / 2} y={y + 78} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={cells[i].c}
              style={cells[i].drop ? ({ transform: `translateY(${rev && rev.zd ? 0 : -46}px)`, transition: tr } as any) : undefined}>{cells[i].d}</text>
          )}
        </g>
      ))}
    </g>
  );
  /* a number's digits in the five boxes, from the ones box leftwards; colourOf(position, digit, length) */
  const cellsOf = (s: string, colourOf: (j: number, ch: string, len: number) => any) => {
    const d = s.slice(-5).split(""), pad = 5 - d.length;
    return [0, 1, 2, 3, 4].map((i) => (i < pad ? null : colourOf(i - pad, d[i - pad], d.length)));
  };
  const plain = (s: string) => cellsOf(s, (_j: number, ch: string) => ({ d: ch, c: ch === "0" ? zeroInk : C.ink }));
  const bracket = (len: number) => {
    const k0 = 5 - len, y = WB_BOARD.y + WB_BOARD.box + 12;
    return (
      <g>
        <path d={`M ${bx(k0) + 6} ${y} V ${y + 12} H ${bx(1) + WB_BOARD.box - 6} V ${y}`} fill="none" stroke={kgInk} strokeWidth={4} strokeLinejoin="round" />
        <path d={`M ${bx(2) + 6} ${y} V ${y + 12} H ${bx(4) + WB_BOARD.box - 6} V ${y}`} fill="none" stroke={gInk} strokeWidth={4} strokeLinejoin="round" />
        <text x={(bx(k0) + bx(1) + WB_BOARD.box) / 2} y={y + 46} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={kgInk}>{tx("kg")}</text>
        <text x={bx(3) + WB_BOARD.box / 2} y={y + 46} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={gInk}>{tx("g")}</text>
      </g>
    );
  };

  const converterArt = () => {
    if (free) {
      /* the card carries the pan's weight, tidied: kilograms and grams at the top, all grams at the foot */
      const cv = WB_CV.free, cx = cv.x + cv.w / 2, has = fG > 0;
      return (
        <g>
          {has && fp.card === "top" && card(cx, 172, fTidy, false, 0, "ft")}
          {has && fp.card === "foot" && card(cx, 420, [null, fG], false, 0, "ff")}
          {wbConverter(cv, false, C)}
          {has && <Hit id="card" x={cx - 150} y={fp.card === "top" ? 172 : 420} w={300} h={76}
            label={fp.card === "top" ? "pass the card down" : "pass the card back up"}
            onPress={() => { setFp((f: any) => ({ ...f, card: f.card === "top" ? "foot" : "top", passed: true })); api.sfx.tick(); }} />}
        </g>
      );
    }
    if (n === 1) return null;
    const cv = WB_CV[n], cx = cv.x + cv.w / 2, r = rev || {};
    if (item.kind === "toG") {
      return (
        <g>
          {r.top !== "gone" && card(cx, 16, r.kgGone ? [null, item.g] : [item.kg, item.g || null], !!r.kgGone, r.top === "in" ? 150 : 0, "top")}
          {r.foot !== undefined && r.foot !== null && card(cx, 318, [null, r.foot], false, r.fo ? 0 : -150, "foot")}
          {wbConverter(cv, !!r.lit, C)}
          {r.eq && eqText([`${item.kg} × 1,000`, ...(item.g ? [`+ ${item.g}`] : []), `= ${indian(item.answer)}`], cx)}
        </g>
      );
    }
    if (item.kind === "toKg" || item.kind === "fix") {
      const sx = item.kind === "fix" ? cv.x : cv.x, sw = item.kind === "fix" ? 180 : 170, sg = item.kind === "fix" ? 20 : 20;
      return (
        <g>
          {slotBox(sx, sw, r.kgOut, "kg", kgInk)}
          {slotBox(sx + sw + sg, sw, r.gOut, "g", gInk)}
          {r.foot !== "gone" && card(cx, 318, [null, item.grams], false, r.foot === "in" ? -150 : 0, "foot")}
          {wbConverter(cv, !!r.lit, C)}
          {r.eq && eqText([`${indian(item.grams)} =`, `${item.answer[0]} × 1,000`, `+ ${item.answer[1]}`], cx)}
        </g>
      );
    }
    /* place */
    return (
      <g>
        {r.top !== "gone" && card(cx, 16, [item.kg, item.g], false, r.top === "in" ? 150 : 0, "top")}
        {r.foot && card(cx, 318, [null, r.foot], false, 0, "foot")}
        {wbConverter(cv, !!r.lit, C)}
        {r.eq && eqText([`${item.kg} × 1,000`, `+ ${item.g}`, `= ${indian(item.answer)}`], cx)}
      </g>
    );
  };
  const boardArt = () => {
    if (free || n !== 4) return null;
    const r = rev || {};
    let cells: any[];
    let len = 0, showBracket = false;
    if (item.kind === "fix") {
      const s = String(item.grams);
      len = s.length; showBracket = !!r.bracket;
      cells = cellsOf(s, (j: number, ch: string, l: number) => ({ d: ch, c: ch === "0" ? zeroInk : !r.bracket ? C.ink : j < l - 3 ? kgInk : gInk }));
    } else if (r.board !== undefined) {
      const s = String(item.answer);
      len = s.length; showBracket = r.board >= 2;
      cells = cellsOf(s, (j: number, ch: string, l: number) => (j < l - 3 ? (r.board >= 1 ? { d: ch, c: kgInk } : null)
        : ch === "0" ? (r.board >= 3 ? { d: ch, c: zeroInk, drop: true } : null) : r.board >= 2 ? { d: ch, c: gInk } : null));
    } else cells = plain(String(typed || "").replace(/\D/g, ""));
    return (
      <g>
        {board(WB_BOARD.y, cells, true, "main")}
        {showBracket && bracket(len)}
        {demo && demo.board2 && (
          <g pointerEvents="none">
            <text x={WB_BOARD.x} y={318} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("yours")}</text>
            {board(330, plain(demo.board2), false, "mine")}
          </g>
        )}
      </g>
    );
  };

  /* ── the running count (runs zone): things sorted, weights added, cards passed; never counts down ── */
  const runs = () => {
    if (free) return null;
    let label = "", val = "";
    if (n === 1) {
      const total = phase.items.reduce((s: number, it: any) => s + it.things.length, 0);
      const k = phase.items.slice(0, index).reduce((s: number, it: any) => s + it.things.length, 0) + (done ? item.things.length : 0);
      label = "things sorted"; val = `${k} / ${total}`;
    } else if (n === 2) { label = "100 g weights"; val = String(w100); }
    else { label = "cards passed"; val = `${index + (done ? 1 : 0)} / ${phase.items.length}`; }
    return (
      <g data-zone="runs" transform="translate(0,-94)">
        <rect x={0} y={0} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        <text x={20} y={48} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(label)}</text>
        <text x={310} y={50} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{val}</text>
      </g>
    );
  };

  /* ── the correction's own layer: never takes a press ── */
  const demoLayer = () => {
    if (free || !demo) return null;
    const ghosts: any[] = [];
    ["g", "kg"].forEach((k: string) => trayList[k].forEach((e: any, j: number) => { if (e.kind === "ghost") ghosts.push({ ...e, ...slotAt(k, j) }); }));
    const quiet = trayList.g.concat(trayList.kg).filter((e: any) => e.kind === "own" && ghosts.some((gh: any) => gh.id === e.id));
    return (
      <g pointerEvents="none">
        {ghostThing && (
          <g style={{ transform: `translate(${B.cx - B.L}px, ${rim + dyL - 2}px) scale(0.8)`, transition: tr } as any}>{wbThing(ghostThing)}</g>
        )}
        {quiet.map((e: any) => {
          const p = placeOf(e.id);
          return <rect key={"q" + e.id} x={p.x - 38} y={p.y - 70} width={76} height={76} rx={10} fill="#FFFFFF" fillOpacity={0.6} />;
        })}
        {ghosts.map((gh: any) => (
          <g key={"g" + gh.id}>
            <g transform={`translate(${gh.x},${gh.y}) scale(0.5)`}>{wbThing(gh.id)}</g>
            {gh.tag && <text x={gh.x} y={gh.y - 44} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={gInk}>{`${gh.tag} ${tx("g")}`}</text>}
          </g>
        ))}
      </g>
    );
  };

  /* the one invite: the first thing on the shelf until a thing moves (a ring sized to it); the pile in the
     levelling; the hundreds box of an empty place board; in free play the kilogram pile, then the first card */
  const pulseBox = (x: number, y: number, w: number, h: number) => (
    <rect className="c4-pulse" x={x} y={y} width={w} height={h} rx={18} fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" />
  );
  const RING: any = { cement: [-60, 70], onions: [-62, 70], letter: [-38, 64], eraser: [-20, 46], spoon: [-24, 60] };
  const invite = (() => {
    if (free) {
      if (!fp.stack.length && !fp.passed) return <Invite x={72} y={440} r={56} C={C} />;
      if (fG > 0 && !fp.passed) return pulseBox(WB_CV.free.x + WB_CV.free.w / 2 - 158, fp.card === "top" ? 164 : 412, 316, 92);
      return null;
    }
    if (n === 1 && open && things.every((t: string) => !where[t] || where[t] === "shelf") && !(demo && demo.ghosts)) {
      const rg = RING[things[0]];
      return <Invite x={shelfX(things[0])} y={SHELF_Y + rg[0]} r={rg[1]} C={C} />;
    }
    if (n === 2 && stage === "demo" && !lev && w100 < 10) return <Invite x={B.cx + B.L} y={444} r={56} C={C} />;
    if (n === 4 && item.kind === "place" && open && !rev && !String(typed || "").length)
      return pulseBox(bx(2) - 6, WB_BOARD.y - 6, WB_BOARD.box + 12, WB_BOARD.box + 12);
    return null;
  })();

  /* what the host and the agent read back (toolApi.getState) */
  api.share(free ? { thing: fp.thing, panWeights: fG, card: fp.card } : {
    thing: panThing, tray: { ...where }, panWeights: n === 2 ? w100 * 100 : n === 3 ? kgs * 1000 : 0,
    card: n === 2 || item.kind === "place" ? `${item.kg} kg ${item.g} g` : n >= 3 ? `${item.grams} g` : null,
    kilograms: rev && rev.kgOut !== undefined ? rev.kgOut : null, grams: rev && rev.gOut !== undefined ? rev.gOut : null,
    places: n === 4 && item.kind === "place" && !rev ? String(typed || "").replace(/\D/g, "") : null, complete: stage === "idle",
  });

  const showBalance = free || n <= 3;
  return (
    <g>
      {runs()}
      {n === 1 && !free && trayArt("g")}
      {n === 1 && !free && trayArt("kg")}
      {(free || n === 1) && <rect x={600} y={free ? 132 : SHELF_Y} width={470} height={14} rx={7} fill={C.rule} stroke={C.ink} strokeWidth={2} />}
      {showBalance && balanceArt()}
      {n === 1 && !free && ["g", "kg"].map((k: string) => trayList[k].map((e: any, j: number) => (e.kind === "settled" ? (
        <g key={k + e.id} pointerEvents="none" transform={`translate(${slotAt(k, j).x},${slotAt(k, j).y}) scale(0.5)`}>{wbThing(e.id)}</g>
      ) : null)))}
      {converterArt()}
      {boardArt()}
      {/* phase 2: one hundred gram weight to take (no spare bars: nothing on screen counts down), gone once ten are
          on the pan; a tap on the pan takes one off, from the levelling to the end of the phase */}
      {!free && n === 2 && w100 < 10 && pileArt("g100", B.cx + B.L, 1, "100 g", p2live, false)}
      {!free && n === 2 && p2live && panControl("take a hundred gram weight off")}
      {!free && n === 3 && pileArt("kg", B.cx + B.L, 1, "1 kg", open)}
      {!free && n === 3 && panControl("take a kilogram weight off")}
      {free && pileArt("kg", 72, 1, "1 kg", true)}
      {free && pileArt("g100", 196, 1, "100 g", true)}
      {free && pileArt("g10", 320, 1, "10 g", true)}
      {free && pileArt("g1", 444, 1, "1 g", true)}
      {free && panControl("take the last weight off")}
      {things.map((t: string) => piece(t))}
      {n === 1 && !free && trayKey("g")}
      {n === 1 && !free && trayKey("kg")}
      {demoLayer()}
      {invite}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last) return null;
  const it = PHASES.flatMap((p: any) => p.items).find((x: any) => x.kind === last.kind && JSON.stringify(x.answer) === JSON.stringify(last.answer));
  if (!it) return null;
  const kgInk = shade(CONTENT.hundred, 0.25), gInk = shade(CONTENT.one, 0.25);
  let body: any;
  if (it.kind === "sort" || it.kind === "unit") {
    /* the unit and a mini tray with the thing in it (one thing: the unit's word beside a big tray; two things:
       two trays, each with its unit symbol) */
    const us = it.kind === "unit" ? [it.answer] : it.answer.split(",");
    if (it.things.length === 1) {
      body = (
        <g>
          <text x={18} y={h / 2 + 11} fontSize={T.label} fontWeight={700} fill={us[0] === "kg" ? kgInk : gInk}>{tx(us[0] === "kg" ? "kilograms" : "grams")}</text>
          <rect x={w - 104} y={8} width={96} height={h - 16} rx={10} fill={tint(C.panel, 0.2)} stroke={C.ink} strokeWidth={2} />
          <g transform={`translate(${w - 56},${h - 18}) scale(0.62)`}>{wbThing(it.things[0])}</g>
        </g>
      );
    } else body = it.things.map((t: string, k: number) => {
      const x0 = 8 + k * 114;
      return (
        <g key={k}>
          <rect x={x0} y={6} width={106} height={h - 12} rx={10} fill={tint(C.panel, 0.2)} stroke={C.ink} strokeWidth={2} />
          <text x={x0 + 53} y={34} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={us[k] === "kg" ? kgInk : gInk}>{tx(us[k])}</text>
          <g transform={`translate(${x0 + 53},${h - 10}) scale(0.3)`}>{wbThing(t)}</g>
        </g>
      );
    });
  } else if (it.kind === "place" || it.kind === "fix") {
    /* a mini place board: kilograms in blue, grams in green, the zeros that hold places in grey */
    const s = String(it.kind === "fix" ? it.grams : it.answer), bw = 40, gap = 4, x0 = (w - (s.length * bw + (s.length - 1) * gap)) / 2;
    body = s.split("").map((ch: string, j: number) => (
      <g key={j}>
        <rect x={x0 + j * (bw + gap)} y={13} width={bw} height={56} rx={8} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
        <text x={x0 + j * (bw + gap) + bw / 2} y={53} textAnchor="middle" fontSize={T.label} fontWeight={700}
          fill={ch === "0" ? "#767676" : j < s.length - 3 ? kgInk : gInk}>{ch}</text>
      </g>
    ));
  } else {
    /* the converter's card */
    const pair = it.parts ? it.answer : [null, it.answer];
    body = (
      <g>
        <rect x={8} y={8} width={w - 16} height={h - 16} rx={12} fill="#FFFFFF" stroke={C.ink} strokeWidth={2.5} />
        <text x={w / 2} y={h / 2 + 12} textAnchor="middle" fontSize={lang !== "en" && it.parts ? T.micro : T.label} fontWeight={700} fill={C.ink}>
          {pair[0] !== null && <tspan fill={kgInk}>{indian(pair[0])}</tspan>}
          {pair[0] !== null && <tspan dx={6} fontSize={T.micro} fill={C.ink}>{tx("kg")}</tspan>}
          <tspan dx={pair[0] !== null ? 14 : 0} fill={gInk}>{indian(pair[1])}</tspan>
          <tspan dx={6} fontSize={T.micro} fill={C.ink}>{tx("g")}</tspan>
        </text>
      </g>
    );
  }
  /* every phase's drawing sits in the same 236-wide frame, so the four rows share one right edge */
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {body}
    </g>
  );
}

function WeighingBench(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null }} />
  );
}

export default WeighingBench;
