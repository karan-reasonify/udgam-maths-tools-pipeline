/* ═══ M1.S2.T4.C12.2D1 · length_columns · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "length_columns";
const MEDIA_ID = "M1.S2.T4.C12.2D1";
const TOOL_NAME = "Length Columns";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["Two columns and a joining sign. How many boxes does the smaller unit take?"];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every smaller unit in its own places, and every carry or break made by the number that joins the pair.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Change the units or the plus or minus, tap New, then break or solve.";

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, and the runtime looks each spoken or drawn line up in it.
   Fill it AFTER the English is final and reviewed (`node cli.mjs voice` lists every line still missing),
   then bake the voice. Empty = the tool runs in English only. */
const TR: any = {
  hi: {
    "Length Columns": "लंबाई के स्तंभ",
    "Two columns and a joining sign. How many boxes does the smaller unit take?": "दो स्तंभ और एक संबंध चिह्न। छोटा मात्रक कितने खाने लेता है?",
    "Every smaller unit in its own places, and every carry or break made by the number that joins the pair.": "हर छोटा मात्रक अपने खानों में। हर हासिल और हर तोड़ मिलाने वाली संख्या से।",
    "Free play. Change the units or the plus or minus, tap New, then break or solve.": "मुक्त खेल। मात्रक या जोड़-घटाव बदलो, नया दबाओ, फिर तोड़ो या हल करो।",
    /* phase 1 */
    "Lining up the units": "मात्रकों को सीध में रखना",
    "The metres column has three boxes.": "मीटर वाले स्तंभ में तीन खाने हैं।",
    "Which places does this number fill? Count them from the ones box.": "यह संख्या कौन से स्थान भरती है? इकाई वाले खाने से गिनो।",
    "Start at the ones box on the right. Then put a zero in every empty box in front.": "दाईं ओर के इकाई वाले खाने से शुरू करो। फिर आगे के हर खाली खाने में शून्य रखो।",
    "Write each unit in its own column. Beside kilometres the metres take three places, and zeros fill the places in front of a short number.": "हर मात्रक को उसके अपने स्तंभ में लिखो। किलोमीटर के साथ मीटर तीन स्थान लेते हैं। छोटी संख्या के आगे के स्थान शून्य से भरते हैं।",
    "You learned: beside kilometres the metres always take three places.": "तुमने सीखा: किलोमीटर के साथ मीटर हमेशा तीन स्थान लेते हैं।",
    "31 kilometres 58 metres is written in columns. What goes in the metres boxes?": "31 किलोमीटर 58 मीटर को स्तंभों में लिखा है। मीटर के खानों में क्या जाएगा?",
    "Metres boxes for 31 km 58 m": "मीटर के खाने: 31 किमी 58 मी",
    "Is your row as long as the card's bar?": "क्या तुम्हारी पंक्ति कार्ड की पट्टी जितनी लंबी है?",
    "Tap the metres box for the 9 in 52 kilometres 9 metres. Then add 17 kilometres 640 metres.": "52 किलोमीटर 9 मीटर के 9 के लिए मीटर का खाना दबाओ। फिर 17 किलोमीटर 640 मीटर जोड़ो।",
    "Add 52 km 9 m and 17 km 640 m": "52 किमी 9 मी, 17 किमी 640 मी जोड़ो",
    "Nine metres is less than ten. Which box holds it?": "नौ मीटर दस से कम है। यह किस खाने में आएगा?",
    "In columns of metres and centimetres, how is 7 centimetres written?": "मीटर और सेंटीमीटर के स्तंभों में 7 सेंटीमीटर कैसे लिखा जाता है?",
    "Centimetres boxes for 7 cm": "सेमी के खाने: 7 सेमी",
    "Is 7 centimetres a number of tens or of ones?": "7 सेंटीमीटर दहाई की संख्या है या इकाई की?",
    "Add the metres column first, then the kilometres.": "पहले मीटर का स्तंभ जोड़ो, फिर किलोमीटर।",
    "Read down each metres box: the hundreds, the tens, then the ones.": "मीटर के हर खाने को नीचे तक पढ़ो: सैकड़ा, दहाई, फिर इकाई।",
    "Copy the sum from the columns, box by box.": "स्तंभों से योग खाने-दर-खाने उतारो।",
    /* phase 2 */
    "Carrying a whole unit": "एक पूरे मात्रक का हासिल",
    "The metres make more than a thousand. What is written, and what is carried?": "मीटर एक हज़ार से ज़्यादा हो गए। क्या लिखा जाएगा, और क्या हासिल जाएगा?",
    "How many full joining numbers are in the smaller column?": "छोटे स्तंभ में मिलाने वाली संख्या कितनी बार पूरी आती है?",
    "Carry one larger unit for each of them. Write only what is left in the boxes.": "हर एक के लिए एक बड़ा मात्रक हासिल ले जाओ। खानों में केवल बचा हुआ लिखो।",
    "Add the smaller unit first. Each full thousand metres is carried as one kilometre, and what is left is written in the metres boxes.": "पहले छोटा मात्रक जोड़ो। हर पूरे हज़ार मीटर एक किलोमीटर बनकर हासिल जाते हैं। बचा हुआ मीटर के खानों में लिखा जाता है।",
    "You learned: carry one kilometre for each full thousand metres.": "तुमने सीखा: हर पूरे हज़ार मीटर पर एक किलोमीटर हासिल जाता है।",
    "Add 45 kilometres 738 metres and 28 kilometres 564 metres.": "45 किलोमीटर 738 मीटर और 28 किलोमीटर 564 मीटर जोड़ो।",
    "Add 45 km 738 m and 28 km 564 m": "45 किमी 738 मी, 28 किमी 564 मी जोड़ो",
    "Do all of those metres fit in three boxes?": "क्या वे सारे मीटर तीन खानों में आते हैं?",
    "Now put 64 metres 58 centimetres together with 29 metres 73 centimetres.": "अब 64 मीटर 58 सेंटीमीटर को 29 मीटर 73 सेंटीमीटर के साथ मिलाओ।",
    "Add 64 m 58 cm and 29 m 73 cm": "64 मी 58 सेमी, 29 मी 73 सेमी जोड़ो",
    "Do the centimetres make a hundred or more?": "क्या सेंटीमीटर सौ या उससे ज़्यादा हो जाते हैं?",
    "Three children ran 3 kilometres 480 metres, 2 kilometres 365 metres and 4 kilometres 290 metres. What distance did they run together?": "तीन बच्चे 3 किलोमीटर 480 मीटर, 2 किलोमीटर 365 मीटर और 4 किलोमीटर 290 मीटर दौड़े। वे मिलकर कितनी दूरी दौड़े?",
    "The three runs together": "तीनों दौड़ मिलाकर",
    "Did the carried kilometre go into the kilometres column?": "क्या हासिल वाला किलोमीटर, किलोमीटर के स्तंभ में जुड़ा?",
    /* phase 3 */
    "Borrowing a whole unit": "एक पूरा मात्रक उधार लेना",
    "Too few centimetres on top. Break one metre. How many centimetres does it give?": "ऊपर सेंटीमीटर बहुत कम हैं। एक मीटर तोड़ो। उससे कितने सेंटीमीटर मिलते हैं?",
    "Break one larger unit. Its pieces join the smaller number on top.": "एक बड़ा मात्रक तोड़ो। उसके टुकड़े ऊपर की छोटी संख्या में मिल जाते हैं।",
    "After the break the larger number on top is one less. Then take away each column.": "तोड़ने के बाद ऊपर की बड़ी संख्या एक कम हो जाती है। फिर हर स्तंभ घटाओ।",
    "When the centimetres on top are too few, break one metre into a hundred centimetres. The metres on top go down by one.": "जब ऊपर सेंटीमीटर बहुत कम हों, तो एक मीटर को सौ सेंटीमीटर में तोड़ो। ऊपर के मीटर एक कम हो जाते हैं।",
    "You learned: break one metre into a hundred centimetres to take away.": "तुमने सीखा: घटाने के लिए एक मीटर को सौ सेंटीमीटर में तोड़ो।",
    "Take 18 metres 64 centimetres from 52 metres 27 centimetres.": "52 मीटर 27 सेंटीमीटर में से 18 मीटर 64 सेंटीमीटर घटाओ।",
    "From 52 m 27 cm take 18 m 64 cm": "ऊपर से नीचे वाली लंबाई घटाओ",
    "Which number is on top in the centimetres column?": "सेंटीमीटर वाले स्तंभ में ऊपर कौन सी संख्या है?",
    "Two long jumps measure 5 metres 8 centimetres and 4 metres 76 centimetres. How much longer is the first jump?": "दो लंबी कूद 5 मीटर 8 सेंटीमीटर और 4 मीटर 76 सेंटीमीटर की हैं। पहली कूद कितनी ज़्यादा लंबी है?",
    "How much longer in metres and centimetres?": "मीटर और सेंटीमीटर में कितना अंतर?",
    "Can 76 centimetres come away from 8 centimetres?": "क्या 8 सेंटीमीटर में से 76 सेंटीमीटर घट सकते हैं?",
    "Now kilometres and metres. What is left when 16 kilometres 875 metres comes away from 40 kilometres 230 metres?": "अब किलोमीटर और मीटर। 40 किलोमीटर 230 मीटर में से 16 किलोमीटर 875 मीटर घटाओ। कितना बचता है?",
    "What is left?": "कितना बचा?",
    "Was the kilometre struck off the top length?": "क्या ऊपर की लंबाई से एक किलोमीटर काटा गया?",
    /* phase 4 */
    "The number depends on the units": "संख्या मात्रकों पर निर्भर है",
    "One centimetre breaks into how many millimetres? Check the joining sign.": "एक सेंटीमीटर टूटकर कितने मिलीमीटर बनता है? संबंध चिह्न देखो।",
    "What does the joining sign say?": "संबंध चिह्न क्या कहता है?",
    "Break or carry by that number, then work the millimetres before the centimetres.": "उसी संख्या से तोड़ो या हासिल लो। पहले मिलीमीटर, फिर सेंटीमीटर हल करो।",
    "Ten millimetres make a centimetre, a hundred centimetres a metre, and a thousand metres a kilometre.": "दस मिलीमीटर से एक सेंटीमीटर, सौ सेंटीमीटर से एक मीटर, और हज़ार मीटर से एक किलोमीटर बनता है।",
    "You learned: carry or break by the number that joins the two units.": "तुमने सीखा: मिलाने वाली संख्या से हासिल लो या तोड़ो।",
    "Take 23 centimetres 8 millimetres from 41 centimetres 3 millimetres.": "41 सेंटीमीटर 3 मिलीमीटर में से 23 सेंटीमीटर 8 मिलीमीटर घटाओ।",
    "From 41 cm 3 mm take 23 cm 8 mm": "ऊपर से नीचे वाली लंबाई घटाओ",
    "Which two units are in the frame?": "ढाँचे में कौन से दो मात्रक हैं?",
    "Add 36 centimetres 7 millimetres and 18 centimetres 6 millimetres.": "36 सेंटीमीटर 7 मिलीमीटर और 18 सेंटीमीटर 6 मिलीमीटर जोड़ो।",
    "Add 36 cm 7 mm and 18 cm 6 mm": "36 सेमी 7 मिमी, 18 सेमी 6 मिमी जोड़ो",
    "Do the millimetres make ten or more?": "क्या मिलीमीटर दस या उससे ज़्यादा हो जाते हैं?",
    "A child takes 8 centimetres 9 millimetres from 15 centimetres 2 millimetres. The child breaks a centimetre into 100 millimetres. Find the right answer.": "एक बच्चा 15 सेंटीमीटर 2 मिलीमीटर में से 8 सेंटीमीटर 9 मिलीमीटर घटाता है। बच्चा एक सेंटीमीटर को 100 मिलीमीटर में तोड़ता है। सही उत्तर निकालो।",
    "From 15 cm 2 mm take 8 cm 9 mm": "ऊपर से नीचे वाली लंबाई घटाओ",
    "Does one centimetre really give a hundred millimetres?": "क्या एक सेंटीमीटर से सच में सौ मिलीमीटर मिलते हैं?",
    /* the words the picture draws, the slot's box labels and the free play keys */
    "km and m": "किमी, मी", "m and cm": "मी, सेमी", "cm and mm": "सेमी, मिमी",
    "km": "किमी", "m": "मी", "cm": "सेमी", "mm": "मिमी",
    "each": "प्रत्येक", "Break": "तोड़ो", "New": "नया", "Solve": "हल करो",
  },
  gu: {
    "Length Columns": "લંબાઈના સ્તંભ",
    "Two columns and a joining sign. How many boxes does the smaller unit take?": "બે સ્તંભ અને એક જોડાણ ચિહ્ન. નાનો એકમ કેટલાં ખાનાં લે છે?",
    "Every smaller unit in its own places, and every carry or break made by the number that joins the pair.": "દરેક નાનો એકમ પોતાનાં ખાનાંમાં. દરેક વદી અને દરેક તોડ જોડતી સંખ્યાથી.",
    "Free play. Change the units or the plus or minus, tap New, then break or solve.": "મુક્ત રમત. એકમ કે સરવાળો-બાદબાકી બદલો, નવું દબાવો, પછી તોડો કે ઉકેલો.",
    /* phase 1 */
    "Lining up the units": "એકમોને હારમાં ગોઠવવા",
    "The metres column has three boxes.": "મીટરના સ્તંભમાં ત્રણ ખાનાં છે.",
    "Which places does this number fill? Count them from the ones box.": "આ સંખ્યા કયાં સ્થાન ભરે છે? એકમના ખાનાથી ગણો.",
    "Start at the ones box on the right. Then put a zero in every empty box in front.": "જમણી બાજુના એકમના ખાનાથી શરૂ કરો. પછી આગળના દરેક ખાલી ખાનામાં શૂન્ય મૂકો.",
    "Write each unit in its own column. Beside kilometres the metres take three places, and zeros fill the places in front of a short number.": "દરેક એકમને તેના પોતાના સ્તંભમાં લખો. કિલોમીટરની સાથે મીટર ત્રણ સ્થાન લે છે. નાની સંખ્યાની આગળનાં સ્થાન શૂન્યથી ભરાય છે.",
    "You learned: beside kilometres the metres always take three places.": "તમે શીખ્યા: કિલોમીટરની સાથે મીટર હંમેશાં ત્રણ સ્થાન લે છે.",
    "31 kilometres 58 metres is written in columns. What goes in the metres boxes?": "31 કિલોમીટર 58 મીટરને સ્તંભોમાં લખ્યું છે. મીટરનાં ખાનાંમાં શું આવશે?",
    "Metres boxes for 31 km 58 m": "મીટરનાં ખાનાં: 31 કિમી 58 મી",
    "Is your row as long as the card's bar?": "શું તમારી હાર કાર્ડની પટ્ટી જેટલી લાંબી છે?",
    "Tap the metres box for the 9 in 52 kilometres 9 metres. Then add 17 kilometres 640 metres.": "52 કિલોમીટર 9 મીટરના 9 માટે મીટરનું ખાનું દબાવો. પછી 17 કિલોમીટર 640 મીટર ઉમેરો.",
    "Add 52 km 9 m and 17 km 640 m": "52 કિમી 9 મી, 17 કિમી 640 મી ઉમેરો",
    "Nine metres is less than ten. Which box holds it?": "નવ મીટર દસ કરતાં ઓછા છે. તે કયા ખાનામાં આવે?",
    "In columns of metres and centimetres, how is 7 centimetres written?": "મીટર અને સેન્ટિમીટરના સ્તંભોમાં 7 સેન્ટિમીટર કેવી રીતે લખાય?",
    "Centimetres boxes for 7 cm": "સેમીનાં ખાનાં: 7 સેમી",
    "Is 7 centimetres a number of tens or of ones?": "7 સેન્ટિમીટર દશકની સંખ્યા છે કે એકમની?",
    "Add the metres column first, then the kilometres.": "પહેલાં મીટરનો સ્તંભ ઉમેરો, પછી કિલોમીટર.",
    "Read down each metres box: the hundreds, the tens, then the ones.": "મીટરના દરેક ખાનાને નીચે સુધી વાંચો: શતક, દશક, પછી એકમ.",
    "Copy the sum from the columns, box by box.": "સ્તંભોમાંથી સરવાળો ખાને ખાને ઉતારો.",
    /* phase 2 */
    "Carrying a whole unit": "આખા એકમની વદી",
    "The metres make more than a thousand. What is written, and what is carried?": "મીટર એક હજારથી વધુ થયા. શું લખાશે, અને શું વદીમાં જશે?",
    "How many full joining numbers are in the smaller column?": "નાના સ્તંભમાં જોડતી સંખ્યા કેટલી વાર પૂરી આવે છે?",
    "Carry one larger unit for each of them. Write only what is left in the boxes.": "દરેક માટે એક મોટો એકમ વદીમાં લઈ જાઓ. ખાનાંમાં ફક્ત બાકી રહેલું લખો.",
    "Add the smaller unit first. Each full thousand metres is carried as one kilometre, and what is left is written in the metres boxes.": "પહેલાં નાનો એકમ ઉમેરો. દરેક પૂરા હજાર મીટર એક કિલોમીટર બનીને વદીમાં જાય છે. બાકી રહેલું મીટરનાં ખાનાંમાં લખાય છે.",
    "You learned: carry one kilometre for each full thousand metres.": "તમે શીખ્યા: દરેક પૂરા હજાર મીટર પર એક કિલોમીટર વદી જાય છે.",
    "Add 45 kilometres 738 metres and 28 kilometres 564 metres.": "45 કિલોમીટર 738 મીટર અને 28 કિલોમીટર 564 મીટર ઉમેરો.",
    "Add 45 km 738 m and 28 km 564 m": "45 કિમી 738 મી, 28 કિમી 564 મી ઉમેરો",
    "Do all of those metres fit in three boxes?": "શું એ બધા મીટર ત્રણ ખાનાંમાં સમાય છે?",
    "Now put 64 metres 58 centimetres together with 29 metres 73 centimetres.": "હવે 64 મીટર 58 સેન્ટિમીટરને 29 મીટર 73 સેન્ટિમીટર સાથે ભેગા કરો.",
    "Add 64 m 58 cm and 29 m 73 cm": "64 મી 58 સેમી, 29 મી 73 સેમી ઉમેરો",
    "Do the centimetres make a hundred or more?": "શું સેન્ટિમીટર સો કે તેથી વધુ થાય છે?",
    "Three children ran 3 kilometres 480 metres, 2 kilometres 365 metres and 4 kilometres 290 metres. What distance did they run together?": "ત્રણ બાળકો 3 કિલોમીટર 480 મીટર, 2 કિલોમીટર 365 મીટર અને 4 કિલોમીટર 290 મીટર દોડ્યાં. તેઓ મળીને કેટલું અંતર દોડ્યાં?",
    "The three runs together": "ત્રણેય દોડ મળીને",
    "Did the carried kilometre go into the kilometres column?": "શું વદીનો કિલોમીટર કિલોમીટરના સ્તંભમાં ઉમેરાયો?",
    /* phase 3 */
    "Borrowing a whole unit": "આખો એકમ ઉછીનો લેવો",
    "Too few centimetres on top. Break one metre. How many centimetres does it give?": "ઉપર સેન્ટિમીટર બહુ ઓછા છે. એક મીટર તોડો. તેમાંથી કેટલા સેન્ટિમીટર મળે?",
    "Break one larger unit. Its pieces join the smaller number on top.": "એક મોટો એકમ તોડો. તેના ટુકડા ઉપરની નાની સંખ્યામાં ભળે છે.",
    "After the break the larger number on top is one less. Then take away each column.": "તોડ્યા પછી ઉપરની મોટી સંખ્યા એક ઓછી થાય છે. પછી દરેક સ્તંભ બાદ કરો.",
    "When the centimetres on top are too few, break one metre into a hundred centimetres. The metres on top go down by one.": "જ્યારે ઉપર સેન્ટિમીટર બહુ ઓછા હોય, ત્યારે એક મીટરને સો સેન્ટિમીટરમાં તોડો. ઉપરના મીટર એક ઓછા થાય છે.",
    "You learned: break one metre into a hundred centimetres to take away.": "તમે શીખ્યા: બાદ કરવા એક મીટરને સો સેન્ટિમીટરમાં તોડો.",
    "Take 18 metres 64 centimetres from 52 metres 27 centimetres.": "52 મીટર 27 સેન્ટિમીટરમાંથી 18 મીટર 64 સેન્ટિમીટર બાદ કરો.",
    "From 52 m 27 cm take 18 m 64 cm": "ઉપરમાંથી નીચેની લંબાઈ બાદ કરો",
    "Which number is on top in the centimetres column?": "સેન્ટિમીટરના સ્તંભમાં ઉપર કઈ સંખ્યા છે?",
    "Two long jumps measure 5 metres 8 centimetres and 4 metres 76 centimetres. How much longer is the first jump?": "બે લાંબી કૂદ 5 મીટર 8 સેન્ટિમીટર અને 4 મીટર 76 સેન્ટિમીટરની છે. પહેલી કૂદ કેટલી વધુ લાંબી છે?",
    "How much longer in metres and centimetres?": "મીટર અને સેન્ટિમીટરમાં કેટલો તફાવત?",
    "Can 76 centimetres come away from 8 centimetres?": "શું 8 સેન્ટિમીટરમાંથી 76 સેન્ટિમીટર બાદ થઈ શકે?",
    "Now kilometres and metres. What is left when 16 kilometres 875 metres comes away from 40 kilometres 230 metres?": "હવે કિલોમીટર અને મીટર. 40 કિલોમીટર 230 મીટરમાંથી 16 કિલોમીટર 875 મીટર બાદ કરો. કેટલું બાકી રહે?",
    "What is left?": "કેટલું બાકી?",
    "Was the kilometre struck off the top length?": "શું ઉપરની લંબાઈમાંથી એક કિલોમીટર કાપ્યો?",
    /* phase 4 */
    "The number depends on the units": "સંખ્યા એકમો પર આધાર રાખે છે",
    "One centimetre breaks into how many millimetres? Check the joining sign.": "એક સેન્ટિમીટર તૂટીને કેટલા મિલિમીટર બને? જોડાણ ચિહ્ન જુઓ.",
    "What does the joining sign say?": "જોડાણ ચિહ્ન શું કહે છે?",
    "Break or carry by that number, then work the millimetres before the centimetres.": "એ જ સંખ્યાથી તોડો કે વદી લો. પહેલાં મિલિમીટર, પછી સેન્ટિમીટર ઉકેલો.",
    "Ten millimetres make a centimetre, a hundred centimetres a metre, and a thousand metres a kilometre.": "દસ મિલિમીટરનો એક સેન્ટિમીટર, સો સેન્ટિમીટરનો એક મીટર, અને હજાર મીટરનો એક કિલોમીટર બને છે.",
    "You learned: carry or break by the number that joins the two units.": "તમે શીખ્યા: બંને એકમોને જોડતી સંખ્યાથી વદી લો કે તોડો.",
    "Take 23 centimetres 8 millimetres from 41 centimetres 3 millimetres.": "41 સેન્ટિમીટર 3 મિલિમીટરમાંથી 23 સેન્ટિમીટર 8 મિલિમીટર બાદ કરો.",
    "From 41 cm 3 mm take 23 cm 8 mm": "ઉપરમાંથી નીચેની લંબાઈ બાદ કરો",
    "Which two units are in the frame?": "ચોકઠામાં કયા બે એકમ છે?",
    "Add 36 centimetres 7 millimetres and 18 centimetres 6 millimetres.": "36 સેન્ટિમીટર 7 મિલિમીટર અને 18 સેન્ટિમીટર 6 મિલિમીટર ઉમેરો.",
    "Add 36 cm 7 mm and 18 cm 6 mm": "36 સેમી 7 મિમી, 18 સેમી 6 મિમી ઉમેરો",
    "Do the millimetres make ten or more?": "શું મિલિમીટર દસ કે તેથી વધુ થાય છે?",
    "A child takes 8 centimetres 9 millimetres from 15 centimetres 2 millimetres. The child breaks a centimetre into 100 millimetres. Find the right answer.": "એક બાળક 15 સેન્ટિમીટર 2 મિલિમીટરમાંથી 8 સેન્ટિમીટર 9 મિલિમીટર બાદ કરે છે. બાળક એક સેન્ટિમીટરને 100 મિલિમીટરમાં તોડે છે. સાચો જવાબ શોધો.",
    "From 15 cm 2 mm take 8 cm 9 mm": "ઉપરમાંથી નીચેની લંબાઈ બાદ કરો",
    "Does one centimetre really give a hundred millimetres?": "શું એક સેન્ટિમીટરમાંથી ખરેખર સો મિલિમીટર મળે?",
    /* the words the picture draws, the slot's box labels and the free play keys */
    "km and m": "કિમી, મી", "m and cm": "મી, સેમી", "cm and mm": "સેમી, મિમી",
    "km": "કિમી", "m": "મી", "cm": "સેમી", "mm": "મિમી",
    "each": "દરેક", "Break": "તોડો", "New": "નવું", "Solve": "ઉકેલો",
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
/* the three unit pairs the frame can be set to: the larger unit, the smaller one, the number that joins
   them (J) and how many fixed boxes the smaller unit takes (the digits of J - 1) */
const LC_PAIRS: any = {
  km: { key: "km", big: "km", small: "m", J: 1000, boxes: 3, bigWord: "kilometres", smallWord: "metres", label: "km and m" },
  m: { key: "m", big: "m", small: "cm", J: 100, boxes: 2, bigWord: "metres", smallWord: "centimetres", label: "m and cm" },
  cm: { key: "cm", big: "cm", small: "mm", J: 10, boxes: 1, bigWord: "centimetres", smallWord: "millimetres", label: "cm and mm" },
};
const LC_PAIR_KEYS = ["km", "m", "cm"];
/* the slot's two boxes for a two-unit answer: the larger unit, then the smaller one */
const LC_SLOT: any = {
  km: [{ label: "km" }, { label: "m" }],
  m: [{ label: "m" }, { label: "cm" }],
  cm: [{ label: "cm" }, { label: "mm" }],
};

/* kinds:  place  the child types what the smaller unit's boxes hold (a string with its zeros, "058")
           add    lengths in columns added; a two-unit answer [larger, smaller]
           sub    the second length taken from the first; a two-unit answer
   rows    [larger, smaller] per length, top to bottom (larger null: the length has none)
   place   (add) the row whose smaller part the child sets in its boxes by tapping one
   near    the item's own misconception (judge must reject it) */
const PHASES = [
  {
    n: 1,
    concept: "Lining up the units",
    conceptId: "M1.S2.T4.C12", objectiveIds: ["O5"],
    says: ["The metres column has three boxes."],
    /* tries, as the plan writes it: first rung, the item's miss; second, which places this number fills;
       third, fill every box of the smaller unit (the pad stays open behind all three) */
    ladder: ["Which places does this number fill? Count them from the ones box.", "Start at the ones box on the right. Then put a zero in every empty box in front."],
    closing: "Write each unit in its own column. Beside kilometres the metres take three places, and zeros fill the places in front of a short number.",
    learned: "You learned: beside kilometres the metres always take three places.",
    traceback: "The row is read as it stands, then its digits slide right into the ones and tens, and a grey zero fills each empty place in front.",
    items: [
      /* practice 1: answer in the plan = 058, three places, because a thousand metres make a kilometre */
      { qid: "M1.S2.T4.C12:1", kind: "place", pair: "km", op: "", rows: [[31, 58]], answer: "058", near: "58",
        say: "31 kilometres 58 metres is written in columns. What goes in the metres boxes?",
        ask: "Metres boxes for 31 km 58 m", miss: "Is your row as long as the card's bar?" },
      /* learn ML1: answer in the plan = 69 km 649 m */
      { qid: "M1.S2.T4.C12:ML1", kind: "add", pair: "km", op: "+", rows: [[52, 9], [17, 640]], place: 0, parts: LC_SLOT.km, answer: [69, 649], near: "70|540",
        say: "Tap the metres box for the 9 in 52 kilometres 9 metres. Then add 17 kilometres 640 metres.",
        ask: "Add 52 km 9 m and 17 km 640 m", miss: "Nine metres is less than ten. Which box holds it?" },
      /* practice 2: answer in the plan = 07, two places, because a hundred centimetres make a metre */
      { qid: "M1.S2.T4.C12:2", kind: "place", pair: "m", op: "", rows: [[null, 7]], answer: "07", near: "7",
        say: "In columns of metres and centimetres, how is 7 centimetres written?",
        ask: "Centimetres boxes for 7 cm", miss: "Is 7 centimetres a number of tens or of ones?" },
    ],
  },
  {
    n: 2,
    concept: "Carrying a whole unit",
    conceptId: "M1.S2.T4.C13", objectiveIds: ["O5"],
    says: ["The metres make more than a thousand. What is written, and what is carried?"],
    ladder: ["How many full joining numbers are in the smaller column?", "Carry one larger unit for each of them. Write only what is left in the boxes."],
    closing: "Add the smaller unit first. Each full thousand metres is carried as one kilometre, and what is left is written in the metres boxes.",
    learned: "You learned: carry one kilometre for each full thousand metres.",
    traceback: "The smaller column's sum shows in the carry box, each full joining number rises as an amber chip, what is left goes down, and the larger column is added with the chip.",
    items: [
      /* learn ML2: answer in the plan = 74 km 302 m */
      { qid: "M1.S2.T4.C13:ML2", kind: "add", pair: "km", op: "+", rows: [[45, 738], [28, 564]], parts: LC_SLOT.km, answer: [74, 302], near: "73|1302",
        say: "Add 45 kilometres 738 metres and 28 kilometres 564 metres.",
        ask: "Add 45 km 738 m and 28 km 564 m", miss: "Do all of those metres fit in three boxes?" },
      /* practice 3: answer in the plan = 94 m 31 cm. The centimetres make 131, so write 31 and carry 1 m */
      { qid: "M1.S2.T4.C13:3", kind: "add", pair: "m", op: "+", rows: [[64, 58], [29, 73]], parts: LC_SLOT.m, answer: [94, 31], near: "93|131",
        say: "Now put 64 metres 58 centimetres together with 29 metres 73 centimetres.",
        ask: "Add 64 m 58 cm and 29 m 73 cm", miss: "Do the centimetres make a hundred or more?" },
      /* practice 4: answer in the plan = 10 km 135 m. The metres make 1135, so write 135 and carry 1 km */
      { qid: "M1.S2.T4.C13:4", kind: "add", pair: "km", op: "+", rows: [[3, 480], [2, 365], [4, 290]], parts: LC_SLOT.km, answer: [10, 135], near: "9|135",
        say: "Three children ran 3 kilometres 480 metres, 2 kilometres 365 metres and 4 kilometres 290 metres. What distance did they run together?",
        ask: "The three runs together", miss: "Did the carried kilometre go into the kilometres column?" },
    ],
  },
  {
    n: 3,
    concept: "Borrowing a whole unit",
    conceptId: "M1.S2.T4.C14", objectiveIds: ["O6"],
    says: ["Too few centimetres on top. Break one metre. How many centimetres does it give?"],
    ladder: ["Break one larger unit. Its pieces join the smaller number on top.", "After the break the larger number on top is one less. Then take away each column."],
    closing: "When the centimetres on top are too few, break one metre into a hundred centimetres. The metres on top go down by one.",
    learned: "You learned: break one metre into a hundred centimetres to take away.",
    traceback: "The top larger number is struck through with one less above it, one larger unit splits into the joining number of pieces that join the top, and both columns are taken away.",
    items: [
      /* learn ML3: answer in the plan = 33 m 63 cm */
      { qid: "M1.S2.T4.C14:ML3", kind: "sub", pair: "m", op: "-", rows: [[52, 27], [18, 64]], parts: LC_SLOT.m, answer: [33, 63], near: "34|37",
        say: "Take 18 metres 64 centimetres from 52 metres 27 centimetres.",
        ask: "From 52 m 27 cm take 18 m 64 cm", miss: "Which number is on top in the centimetres column?" },
      /* practice 5: answer in the plan = The first jump is 32 cm longer. 5 m 08 cm becomes 4 m 108 cm, and 108 less 76 is 32, with no metres left */
      { qid: "M1.S2.T4.C14:5", kind: "sub", pair: "m", op: "-", rows: [[5, 8], [4, 76]], parts: LC_SLOT.m, answer: [0, 32], near: "1|68",
        say: "Two long jumps measure 5 metres 8 centimetres and 4 metres 76 centimetres. How much longer is the first jump?",
        ask: "How much longer in metres and centimetres?", miss: "Can 76 centimetres come away from 8 centimetres?" },
      /* practice 6: answer in the plan = 23 km 355 m. Break one kilometre: 39 km 1230 m, and 1230 less 875 is 355 */
      { qid: "M1.S2.T4.C14:6", kind: "sub", pair: "km", op: "-", rows: [[40, 230], [16, 875]], parts: LC_SLOT.km, answer: [23, 355], near: "24|645",
        say: "Now kilometres and metres. What is left when 16 kilometres 875 metres comes away from 40 kilometres 230 metres?",
        ask: "What is left?", miss: "Was the kilometre struck off the top length?" },
    ],
  },
  {
    n: 4,
    concept: "The number depends on the units",
    conceptId: "M1.S2.T4.C15", objectiveIds: ["O6"],
    says: ["One centimetre breaks into how many millimetres? Check the joining sign."],
    ladder: ["What does the joining sign say?", "Break or carry by that number, then work the millimetres before the centimetres."],
    closing: "Ten millimetres make a centimetre, a hundred centimetres a metre, and a thousand metres a kilometre.",
    learned: "You learned: carry or break by the number that joins the two units.",
    traceback: "The joining sign lights, one centimetre splits into exactly ten slivers or ten millimetres gather into one chip, and each column is worked again.",
    items: [
      /* learn ML4: answer in the plan = 17 cm 5 mm */
      { qid: "M1.S2.T4.C15:ML4", kind: "sub", pair: "cm", op: "-", rows: [[41, 3], [23, 8]], parts: LC_SLOT.cm, answer: [17, 5], near: "17|95",
        say: "Take 23 centimetres 8 millimetres from 41 centimetres 3 millimetres.",
        ask: "From 41 cm 3 mm take 23 cm 8 mm", miss: "Which two units are in the frame?" },
      /* practice 7: answer in the plan = 55 cm 3 mm. The millimetres make 13, so write 3 and carry 1 cm, because ten millimetres make a centimetre */
      { qid: "M1.S2.T4.C15:7", kind: "add", pair: "cm", op: "+", rows: [[36, 7], [18, 6]], parts: LC_SLOT.cm, answer: [55, 3], near: "54|13",
        say: "Add 36 centimetres 7 millimetres and 18 centimetres 6 millimetres.",
        ask: "Add 36 cm 7 mm and 18 cm 6 mm", miss: "Do the millimetres make ten or more?" },
      /* practice 8: answer in the plan = 10 mm, because ten millimetres make a centimetre. 15 cm 2 mm becomes 14 cm 12 mm, so the answer is 6 cm 3 mm
         (the slot takes the take-away itself; the child's 100 mm break is the near miss, 6 cm 93 mm) */
      { qid: "M1.S2.T4.C15:8", kind: "sub", pair: "cm", op: "-", rows: [[15, 2], [8, 9]], parts: LC_SLOT.cm, answer: [6, 3], near: "6|93",
        say: "A child takes 8 centimetres 9 millimetres from 15 centimetres 2 millimetres. The child breaks a centimetre into 100 millimetres. Find the right answer.",
        ask: "From 15 cm 2 mm take 8 cm 9 mm", miss: "Does one centimetre really give a hundred millimetres?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  pairs: LC_PAIRS,
  frame: { unitSwitch: [4, 8, 586, 64], joiningSign: [600, 8, 340, 64], columns: [0, 88, 700, 330], carryBox: [726, 88, 360, 120], breakControl: [726, 96, 300, 76], pieces: [726, 184, 360, 218], bars: [0, 420, 1086, 104] },
  rule: "the smaller unit takes as many boxes as J - 1 has digits; carry one larger unit for each full J of the smaller column; break one larger unit into J smaller units",
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item?
   two units: each box as a number (judgeSlotParts), and the smaller part fits its fixed boxes ("0302" has a
   digit with no box, so it is not 302 m); the smaller unit's boxes ("place"): the digits exactly, zeros in
   front included, so "58" is not "058". ML1 is also judged on the frame: a 9 the child set in the hundreds
   or the tens box is a miss (HOOK.misplaced reads the child's own tap; unset outside the page) */
const judge = (item: any, v: any) => {
  if (item.parts) {
    if (!judgeSlotParts(item, v)) return false;
    if (slotPartsOf(v, 2)[1].length > LC_PAIRS[item.pair].boxes) return false;
    return !(item.place !== undefined && HOOK.misplaced && HOOK.misplaced(item));
  }
  if (item.kind === "place") return String(v ?? "").replace(/[^0-9]/g, "") === String(item.answer);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: a second route that shares no code with judge or Work. It turns every length into the smaller
   unit alone (52 km 9 m = 52,009 m), adds or takes away those, and splits the total back by division; a
   "place" answer is the smaller part printed at the width of the largest smaller part (J - 1). */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const J = { km: 1000, m: 100, cm: 10 }[it.pair as "km" | "m" | "cm"];
  if (it.kind === "place") {
    const width = String(J - 1).length;
    const s = String(it.rows[0][1]);
    return s.length <= width && "0".repeat(width - s.length) + s === it.answer;
  }
  const flat = it.rows.map((r: any) => (r[0] || 0) * J + r[1]);
  const total = it.kind === "sub" ? flat[0] - flat[1] : flat.reduce((a: number, b: number) => a + b, 0);
  return total >= 0 && Math.floor(total / J) === it.answer[0] && total - Math.floor(total / J) * J === it.answer[1];
}));
/* the most likely wrong answer: the item's own misconception (9 m under the hundreds, 1,302 in the metres
   boxes, the smaller taken from the larger, a centimetre broken into a hundred millimetres); judge rejects it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => T.submit(item.answer);
/* the agent's answer(): a "place" answer keeps its zeros in front ("058"), which the runtime's number path
   would drop, so it is typed into the slot as written; a two-unit answer is typed by the runtime */
const answer = (item: any, v: any) => (item.kind === "place" && HOOK.type ? HOOK.type(v) : undefined);
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
/* the chapter's colours: the larger unit deep blue, the smaller unit green, a carried or broken unit amber,
   a difference reddish purple, a zero set in an empty place grey (at full size and weight) */
const LC_BLUE = CONTENT.hundred, LC_GREEN = CONTENT.one, LC_AMBER = CONTENT.ten, LC_PURPLE = CONTENT.bead, LC_ZERO = "#767676";
const LC_INK_BIG = shade(LC_BLUE, 0.25), LC_INK_SMALL = shade(LC_GREEN, 0.25), LC_INK_AMBER = shade(LC_AMBER, 0.4);
/* the column frame: the larger unit's numbers end at bigRight; the smaller unit's fixed boxes end at boxRight */
const LC_F = { bigRight: 300, div: 340, boxRight: 684, boxW: 84, gap: 10, boxH: 64, rowTop: 174, pitch: 72, base: 52 };
const lcBoxX = (B: number, k: number) => LC_F.boxRight - (B - k) * LC_F.boxW - (B - 1 - k) * LC_F.gap;
const lcRowY = (r: number) => LC_F.rowTop + r * LC_F.pitch;
/* a smaller part written into its boxes, zeros in front */
const lcPad = (v: number, B: number) => { const s = String(v); return s.length >= B ? s : "0".repeat(B - s.length) + s; };
/* the column method, as the book works it: the smaller column first, carry or break by J (the picture's own
   route; the oracle takes another) */
function lcColumns(pair: string, op: string, rows: any[]) {
  const J = LC_PAIRS[pair].J;
  if (op === "-") {
    const t = rows[0], b = rows[1];
    const need = t[1] < b[1];
    const topBig = need ? t[0] - 1 : t[0], topSmall = need ? t[1] + J : t[1];
    return { need, topBig, topSmall, small: topSmall - b[1], big: topBig - (b[0] || 0), sSum: 0, carry: 0 };
  }
  const sSum = rows.reduce((a: number, r: any) => a + r[1], 0);
  const carry = Math.floor(sSum / J);
  const big = rows.reduce((a: number, r: any) => a + (r[0] || 0), 0) + carry;
  return { need: false, topBig: 0, topSmall: 0, sSum, carry, small: sSum - carry * J, big };
}
/* free play's lengths: a take-away always needs a break, a sum always carries */
function lcDeal(pair: string, op: string) {
  const J = LC_PAIRS[pair].J;
  const r = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
  if (op === "-") {
    const bs = r(1, J - 1), ts = r(0, bs - 1), bb = r(1, 40);
    return [[bb + r(1, 40), ts], [bb, bs]];
  }
  const s1 = r(Math.ceil(J / 2), J - 1);
  return [[r(1, 50), s1], [r(1, 49), r(J - s1, J - 1)]];
}
/* the traceback's steps. place: 0 the row as typed, 1 the digits slide right. add: 1 the smaller column's sum in
   the carry box, 2 its joining number of pieces, 3 they gather into one chip that rides over the larger column,
   4 what is left goes down, 5 the larger column with the chip. sub: 1 the smaller column, 2 the break, 3 the
   pieces join the top, 4 the smaller column taken away, 5 the larger */
const lcFinal = (kind: string) => (kind === "place" ? 1 : 5);
/* the summary row's drawing: the item whose answer shows what the row's "You learned" line says
   (phase 1: 31 km 058 m, phase 3: 33 m 63 cm); the other phases draw their last answer */
const LC_THUMB: any = { 1: 0, 3: 0 };

function Work({ n, item, index, stage, wrong, typed, part, api, lang = "en", tx = (v: any) => v }: any) {
  /* every English word the picture draws goes through tx("...") (its key is added to TR) */
  const C = api.C;
  const tl = useTimeline();   /* the traceback and free play's Solve */
  const tl2 = useTimeline();  /* the child's own break: the chip, then its pieces */
  const free = stage === "free";
  const id = free ? "free" : n + ":" + index;

  /* the child's own marks on this frame: where the short number was put, chips carried (with the smaller part
     they were lifted from, and their pieces: 1 loose, 2 gathered), the break (1 chip, 2 split) */
  const blank = { id, at: null, chips: 0, carriedSmall: null, gather: 0, broken: 0 };
  const [own, setOwn] = useState<any>(blank);
  const o = own.id === id ? own : blank;
  const put = (f: any) => setOwn((p: any) => ({ ...(p.id === id ? p : blank), ...f }));
  /* the traceback's layer: { id, step, typed }; it is drawn over the child's work and clears on the next act */
  const [demo, setDemo] = useState<any>(null);
  const [fp, setFp] = useState<any>(null);
  const F = fp || { pair: "km", op: "+", rows: [[45, 738], [28, 564]] };
  useEffect(() => { if (free && !fp) setFp({ pair: "km", op: "+", rows: lcDeal("km", "+") }); }, [free]);

  const it: any = free ? { kind: F.op === "-" ? "sub" : "add", pair: F.pair, op: F.op, rows: F.rows } : item || { kind: "place", pair: "km", op: "", rows: [[null, 0]] };
  const kind = it.kind;
  const P = LC_PAIRS[it.pair] || LC_PAIRS.km;
  const B = P.boxes, J = P.J;
  const rows: any[] = it.rows || [];
  const sol: any = kind === "place" ? null : lcColumns(it.pair, it.op, rows);
  const FIN = lcFinal(kind);
  const ty = String(typed ?? "");

  /* the worked columns stay up as a model after a correction, until the child's next act on the frame; the
     answer row (and phase 1's typed row) mirrors the child's typing again as soon as a fresh digit comes */
  const dm = demo && demo.id === id ? demo : null;
  const fresh = !!dm && !dm.hold && ty !== dm.typed;
  let d = dm ? dm.step : -1;
  if (!dm && !free && (stage === "win" || stage === "idle")) d = FIN;
  const asking = stage === "ask" && !tl.busy;
  const placeRow = kind === "add" ? it.place : undefined;

  /* Enter answers from the slot; the agent's "place" answer is typed into it as written */
  api.onEnter(null);
  HOOK.type = (v: any) => { api.setTyped(String(v).replace(/[^0-9]/g, "")); return true; };
  /* ML1: the judge reads the child's own tap (a 9 set in the hundreds or the tens box is a miss) */
  HOOK.misplaced = (itm: any) => itm === item && placeRow !== undefined && o.at !== null && o.at !== undefined && o.at !== B - 1;

  /* the traceback: the maths redrawn in steps, ending on the whole right answer, over the child's own work */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free || !item) return;
    api.lock(true);
    const t0 = ty;
    const steps: any[] = [];
    for (let s = 0; s <= FIN; s++) {
      if (kind === "add" && sol.carry === 0 && (s === 2 || s === 3)) continue; /* nothing to carry: no pieces */
      steps.push([s === 0 ? 800 : 950, () => setDemo({ id, step: s, typed: t0 })]);
    }
    tl.run(steps, () => api.lock(false));
    /* ML1: its miss line is about where the 9 stands. When the 9 stood right (or was never moved) and the
       sum is off another way, the line is about adding instead; it replaces the rung being said */
    if (placeRow !== undefined) {
      const placedWrong = (o.at !== null && o.at !== undefined && o.at !== B - 1) || slotPartsOf(t0, 2).join("|") === item.near;
      if (!placedWrong) {
        if (wrong.tries === 1) api.say("Add the metres column first, then the kilometres.");
        else if (wrong.tries === 2) api.say("Read down each metres box: the hundreds, the tens, then the ones.");
        else api.say("Copy the sum from the columns, box by box.");
      }
    }
  }, [wrong]);

  /* the child's acts */
  const answerParts = kind === "place" ? ["", ""] : [ty.split("|")[0] || "", ty.split("|")[1] || ""];
  const over = answerParts[1].length > B ? answerParts[1].slice(0, answerParts[1].length - B) : "";
  /* a smaller part takes one digit more than its boxes at most (the digit with no box); rubbing out or
     changing the digits a chip was lifted from puts the chip back */
  useEffect(() => {
    if (stage !== "ask" || free) return;
    if (kind === "place") { const s = ty.replace(/[^0-9]/g, ""); if (s.length > B + 1) api.setTyped(s.slice(0, B + 1)); return; }
    if (answerParts[1].length > B + 1) { api.setTyped(answerParts[0] + "|" + answerParts[1].slice(0, B + 1)); return; }
    if (o.chips && answerParts[1] !== o.carriedSmall) put({ chips: 0, carriedSmall: null, gather: 0 });
  }, [ty]);
  /* after a carry or a break the keyboard goes on from the smaller unit's box of the slot */
  const focusSmall = () => setTimeout(() => {
    try { const el: any = document.querySelector('[data-control="part-2"]'); if (el && el.focus) el.focus(); } catch (e) {}
  }, 40);
  /* the child fixed where the 9 stands: the answer in the slot may be sent again */
  const placeAt = (k: number) => { setDemo(null); put({ at: k }); if (wrong) api.setTyped(ty); };
  const carryUp = () => {
    if (!over || Number(over) === 0) return;
    const rest = answerParts[1].slice(over.length);
    setDemo(null);
    put({ chips: Number(over), carriedSmall: rest, gather: 1 });
    api.setTyped(answerParts[0] + "|" + rest);
    tl2.run([[700, () => {}], [700, () => put({ gather: 2 })]]);
    focusSmall();
  };
  const breakIt = () => {
    if (o.broken) return;
    setDemo(null);
    put({ broken: 1 });
    tl2.run([[520, () => {}], [700, () => put({ broken: 2 })]]);
    focusSmall();
  };
  /* the digit with no box is lifted by a tap, a drag up into the chip row, or Enter */
  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (pay !== "carry") return;
    if (!moved || !(p.y > ansTop + 16)) carryUp();
  });
  /* the carry appears while the child types in the slot, and the runtime's digit handler takes the focus off
     the box being typed in; the browser's next Tab would then start from that box and reach the carry only
     after the pad, the header and the phase dots (22 Tabs). So when the carry appears and nothing holds the
     focus, the Tab starting point is set on an anchor just before it: focus the anchor, let it go, and the
     next Tab lands on the carry. Nothing is focused or pressed for the child */
  const carryOn = asking && kind === "add" && !!over && Number(over) > 0 && !free && (!dm || fresh);
  useEffect(() => {
    if (!carryOn) return;
    const t = setTimeout(() => {
      try {
        const a: any = document.activeElement;
        if (a && a !== document.body && a.tagName !== "svg") return;
        const s: any = document.querySelector("[data-lc-anchor]");
        if (s && s.focus) { s.focus({ preventScroll: true }); s.blur(); }
      } catch (e) {}
    }, 30);
    return () => clearTimeout(t);
  }, [carryOn]);
  /* free play's acts */
  const reset = (f: any) => { tl.stop(); tl2.stop(); setDemo(null); setFp({ ...F, ...f }); };
  const setPair = (k: string) => { reset({ pair: k, rows: lcDeal(k, F.op) }); put({ chips: 0 }); };
  const flipOp = () => { const op = F.op === "+" ? "-" : "+"; reset({ op, rows: lcDeal(F.pair, op) }); put({ chips: 0, broken: 0 }); };
  const deal = () => { reset({ rows: lcDeal(F.pair, F.op) }); put({ chips: 0, broken: 0 }); };
  const solveFree = () => {
    setDemo(null);
    const steps: any[] = [];
    for (let s = 1; s <= FIN; s++) steps.push([650, () => setDemo({ id: "free", step: s, hold: true })]);
    tl.run(steps);
  };

  /* what each part of the frame shows now */
  const at = placeRow !== undefined && d >= 1 ? B - 1 : o.at;
  const broken = kind === "sub" && sol.need ? Math.max(o.broken, d >= 3 ? 2 : d >= 2 ? 1 : 0) : 0;
  const chips = kind === "add" ? (d >= 3 ? sol.carry : o.chips) : 0;
  /* the carried unit's pieces: 1 loose (the joining number of them), 2 gathered into the chip */
  const gather = kind !== "add" ? 0 : sol.carry > 0 && d >= 3 ? 2 : sol.carry > 0 && d === 2 ? 1 : o.chips ? o.gather : 0;
  const ansSmall = kind === "place" ? "" : !fresh && d >= 4 ? lcPad(sol.small, B) : free ? "" : answerParts[1];
  const ansBig = kind === "place" ? "" : !fresh && d >= 5 ? String(sol.big) : free ? "" : answerParts[0];
  const busy = tl.busy && d >= 0;
  const signLit = (busy && (d === 2 || d === 3)) || (tl2.busy && kind !== "place");
  const litSmall = busy && ((kind === "add" && d >= 1 && d <= 4) || (kind === "sub" && (d === 1 || d === 4)));
  const litBig = busy && d === 5;
  const dragging = drag.drag && drag.drag.payload === "carry" && drag.drag.moved ? drag.drag : null;
  const nRows = rows.length;
  const ansTop = lcRowY(nRows) + 4;
  const bottom = kind === "place" ? lcRowY(1) + 8 : ansTop + LC_F.boxH + 10;

  /* the place row's smaller part: the child's digits as typed (phase 1), the short number where it was put, or the book's */
  const rowSmall = (r: number): { s: string; grey: boolean[] | null } => {
    const v = rows[r][1];
    if (kind === "place") {
      if (fresh) return { s: ty.replace(/[^0-9]/g, ""), grey: null };
      if (d >= 1) return { s: it.answer, grey: null };
      if (d === 0) { const s = dm.typed.replace(/[^0-9]/g, ""); const pad = s.length < B ? "0".repeat(B - s.length) : ""; return { s: s + pad, grey: s.split("").map(() => false).concat(pad.split("").map(() => true)) }; }
      return { s: ty.replace(/[^0-9]/g, ""), grey: null };
    }
    if (r === placeRow) {
      if (at === null || at === undefined) return { s: "", grey: null };
      const s = "0".repeat(at) + String(v) + "0".repeat(B - 1 - at);
      return { s, grey: s.split("").map((c, j) => j !== at) };
    }
    return { s: lcPad(v, B), grey: null };
  };
  const readOf = (s: string) => (s.length >= B ? Number(s) : null);

  /* ── drawing helpers (called, never mounted) ── */
  const digitsIn = (s: string, top: number, key: string, grey: boolean[] | null, ink: string) => {
    const extra = Math.max(0, s.length - B);
    const firstNZ = s.search(/[1-9]/);
    const lead = firstNZ < 0 ? s.length : firstNZ;
    const out: any[] = [];
    for (let j = 0; j < s.length; j++) {
      const k = j - extra;
      const zero = s[j] === "0" && (grey ? grey[j] : j < lead);
      if (k < 0) {
        /* a digit with no box: a narrow dashed ghost between the column line and the first box */
        if (dragging && key === "anssm") continue;
        const gx = lcGhostX(-k);
        out.push(<rect key={key + "o" + j} x={gx} y={top} width={60} height={LC_F.boxH} rx={10} fill="none" stroke={C.ink} strokeWidth={2} strokeDasharray="7 7" />);
        out.push(<text key={key + "d" + j} x={gx + 30} y={top + LC_F.base} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={zero ? LC_ZERO : ink}>{s[j]}</text>);
        continue;
      }
      const x = lcBoxX(B, 0) + k * (LC_F.boxW + LC_F.gap);
      out.push(<text key={key + "d" + j} x={x + LC_F.boxW / 2} y={top + LC_F.base} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={zero ? LC_ZERO : ink}>{s[j]}</text>);
    }
    return out;
  };
  /* the r-th digit with no box, counting leftward from the first box */
  const lcGhostX = (r: number) => lcBoxX(B, 0) - 6 - r * 60 - (r - 1) * 6;
  const boxes = (top: number, key: string, ring: boolean) => (
    <g key={key}>
      {Array.from({ length: B }).map((_, k) => (
        <rect key={k} x={lcBoxX(B, k)} y={top} width={LC_F.boxW} height={LC_F.boxH} rx={10} fill="#FFFFFF" stroke={ring ? C.accent : tint(C.ink, 0.55)} strokeWidth={ring ? 4 : 2} />
      ))}
    </g>
  );
  const bigNum = (v: any, top: number, key: string, ink = LC_INK_BIG) =>
    v === null || v === undefined || v === "" ? null : <text key={key} x={LC_F.bigRight} y={top + LC_F.base} textAnchor="end" fontSize={T.xl} fontWeight={700} fill={ink}>{String(v)}</text>;

  /* the unit switch: in the questions a strip of flat labels, the frame's pair on a dark tag; in Free play three
     keys, the pair set ringed */
  const unitSwitch = () => (
    <g>
      {LC_PAIR_KEYS.map((k, i) => {
        const x = 4 + i * 198, on = it.pair === k, label = tx(LC_PAIRS[k].label);
        if (free) return (
          <g key={k}>
            <Key id={"pair-" + k} x={x} y={4} w={190} h={72} C={C} onClick={() => setPair(k)} label={"set the frame to " + LC_PAIRS[k].bigWord + " and " + LC_PAIRS[k].smallWord}>
              <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={on ? 700 : 600} fill={C.ink}>{label}</text>
            </Key>
            {on && <rect x={x - 4} y={0} width={198} height={85} rx={22} fill="none" stroke={C.accent} strokeWidth={4} pointerEvents="none" />}
          </g>
        );
        return (
          <g key={k}>
            {/* a thin rule between two flat labels, so they never read as one line */}
            {i > 0 && <line x1={x - 4} y1={22} x2={x - 4} y2={58} stroke={C.rule} strokeWidth={2} />}
            {on && <rect x={x} y={8} width={190} height={64} rx={14} fill={shade(C.accent, 0.22)} />}
            <text x={x + 95} y={51} textAnchor="middle" fontSize={T.label} fontWeight={on ? 700 : 600} fill={on ? "#FFFFFF" : C.ink}>{label}</text>
          </g>
        );
      })}
    </g>
  );
  /* the joining sign: "=" at the box's centre, the larger unit to its left and what it equals to its right, so
     both sides sit clear of the box in every language (Devanagari and Gujarati units run wider than "km") */
  const joiningSign = () => (
    <g>
      <rect x={600} y={8} width={340} height={64} rx={16} fill={signLit ? tint(LC_AMBER, 0.75) : "#FFFFFF"} stroke={signLit ? shade(LC_AMBER, 0.3) : C.ink} strokeWidth={signLit ? 5 : 2} />
      <text x={750} y={51} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{"1 " + tx(P.big)}</text>
      <text x={770} y={51} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>=</text>
      <text x={790} y={51} fontSize={T.label} fontWeight={700} fill={C.ink}>{indian(J) + " " + tx(P.small)}</text>
    </g>
  );

  const frame = () => (
    <g>
      <rect x={0} y={88} width={700} height={bottom - 88} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      {litSmall && <rect x={LC_F.div + 8} y={96} width={700 - LC_F.div - 16} height={bottom - 104} rx={14} fill={tint(C.accent, 0.86)} />}
      {litBig && <rect x={60} y={96} width={LC_F.div - 68} height={bottom - 104} rx={14} fill={tint(C.accent, 0.86)} />}
      <text x={LC_F.bigRight} y={121} textAnchor="end" fontSize={T.label} fontWeight={700} fill={LC_INK_BIG}>{tx(P.big)}</text>
      <text x={(lcBoxX(B, 0) + LC_F.boxRight) / 2} y={121} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={LC_INK_SMALL}>{tx(P.small)}</text>
      <line x1={LC_F.div} y1={96} x2={LC_F.div} y2={bottom - 8} stroke={C.ink} strokeWidth={3} />
      {chipRow()}
      {rows.map((r: any, i: number) => {
        const top = lcRowY(i);
        const sm = rowSmall(i);
        const ring = kind === "place" && asking;
        return (
          <g key={"row" + i}>
            {boxes(top, "bx" + i, ring)}
            {bigNum(r[0], top, "big" + i)}
            {digitsIn(sm.s, top, "sm" + i, sm.grey, LC_INK_SMALL)}
          </g>
        );
      })}
      {broken >= 1 && strike()}
      {it.op && !free && <text x={32} y={lcRowY(nRows - 1) + LC_F.base} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{it.op === "-" ? "−" : "+"}</text>}
      {free && (
        <Key id="sign" x={4} y={lcRowY(nRows - 1) - 8} w={72} h={72} rx={36} C={C} onClick={flipOp} label="swap plus and minus">
          <text y={20} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{F.op === "-" ? "−" : "+"}</text>
        </Key>
      )}
      {kind !== "place" && (
        <g>
          <line x1={16} y1={ansTop - 5} x2={688} y2={ansTop - 5} stroke={C.ink} strokeWidth={3} />
          <rect x={160} y={ansTop} width={152} height={LC_F.boxH} rx={10} fill="#FFFFFF" stroke={asking && part === 0 ? C.accent : tint(C.ink, 0.55)} strokeWidth={asking && part === 0 ? 4 : 2} />
          {boxes(ansTop, "ansbx", asking && part === 1)}
          {bigNum(ansBig, ansTop, "ansbig")}
          {digitsIn(ansSmall, ansTop, "anssm", null, LC_INK_SMALL)}
          {carryOn && (
            <g>
              {/* not a control: the place the next Tab starts from once the carry appears (see the effect below) */}
              <g data-lc-anchor="" tabIndex={-1} aria-hidden="true"><rect x={lcGhostX(1)} y={ansTop} width={1} height={1} fill="transparent" /></g>
              <g {...control("carry", "carry the extra " + over + " up as " + over + " " + (over === "1" ? P.bigWord.replace(/s$/, "") : P.bigWord))}
                {...drag.bind("carry")} {...drag.keys("carry")}>
                <rect x={lcGhostX(over.length) - 6} y={ansTop - 4} width={Math.max(72, over.length * 66 + 6)} height={72} rx={12} fill="transparent" />
              </g>
            </g>
          )}
          {dragging && (
            <g pointerEvents="none">
              <rect x={dragging.x - 38} y={dragging.y - 30} width={76} height={60} rx={12} fill={tint(LC_AMBER, 0.45)} stroke={shade(LC_AMBER, 0.3)} strokeWidth={2} />
              <text x={dragging.x} y={dragging.y + 20} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={LC_INK_AMBER}>{over}</text>
            </g>
          )}
        </g>
      )}
      {placeRow !== undefined && asking && (
        Array.from({ length: B }).map((_, k) => (
          <Hit key={"put" + k} id={"box-" + (k + 1)} x={lcBoxX(B, k) - 4} y={lcRowY(placeRow) - 4} w={LC_F.boxW + 8} h={72} onPress={() => placeAt(k)}
            label={"put the " + rows[placeRow][1] + " in the " + ["hundreds", "tens", "ones"][3 - B + k] + " box"} />
        ))
      )}
    </g>
  );

  /* carried chips ride over the larger column; a break writes one less above the larger number on top and the
     grown smaller number above its boxes, in amber */
  function chipRow() {
    const out: any[] = [];
    /* one chip a carried unit; more than three ride as one chip with their count */
    const many = chips > 3;
    for (let i = 0; i < (many ? 1 : chips); i++) {
      const w = many ? 110 : 76;
      const x = 312 - (i + 1) * (w + 8) + 8;
      out.push(
        <g key={"chip" + i}>
          <rect x={x} y={137} width={w} height={34} rx={10} fill={tint(LC_AMBER, 0.45)} stroke={shade(LC_AMBER, 0.3)} strokeWidth={2} />
          <text x={x + w / 2} y={163} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={LC_INK_AMBER}>{(many ? chips : 1) + " " + tx(P.big)}</text>
        </g>
      );
    }
    if (broken >= 1) out.push(<text key="nb" x={LC_F.bigRight} y={164} textAnchor="end" fontSize={T.label} fontWeight={700} fill={LC_INK_AMBER}>{String(sol.topBig)}</text>);
    if (broken >= 2) out.push(<text key="ns" x={LC_F.boxRight} y={164} textAnchor="end" fontSize={T.label} fontWeight={700} fill={LC_INK_AMBER}>{indian(sol.topSmall)}</text>);
    return <g>{out}</g>;
  }
  function strike() {
    const w = String(rows[0][0]).length * 34;
    return <line x1={LC_F.bigRight - w - 6} y1={lcRowY(0) + 33} x2={LC_F.bigRight + 6} y2={lcRowY(0) + 33} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />;
  }

  /* the right of the frame: the given length's card (phase 1), the carry box, the break control and its pieces */
  const card = () => {
    const r = kind === "place" ? rows[0] : rows[placeRow];
    return (
      <g>
        <rect x={726} y={88} width={360} height={104} rx={RAD.panel} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={2} />
        <text x={906} y={156} textAnchor="middle" fontSize={T.speech} fontWeight={700}>
          {r[0] !== null && <tspan fill={LC_INK_BIG}>{r[0] + " " + tx(P.big) + " "}</tspan>}
          <tspan fill={LC_INK_SMALL}>{r[1] + " " + tx(P.small)}</tspan>
        </text>
      </g>
    );
  };
  /* one larger unit as the joining number of smaller pieces: ten slivers of a centimetre, a hundred strips of a
     metre, ten bars of 100 m for a kilometre. Loose (a break's pieces, or a carry's before they gather) they are
     labelled one piece each; gathered, they sit inside the amber chip they make */
  const piecesPic = (dy: number, gathered: boolean) => {
    const bits: any[] = [];
    let bx = [744, 188, 324, 126];
    if (J === 10) for (let i = 0; i < 10; i++) bits.push(<rect key={i} x={752 + i * 32} y={196 + dy} width={20} height={110} rx={4} />);
    else if (J === 100) {
      bx = [748, 182, 314, 162];
      for (let i = 0; i < 100; i++) bits.push(<rect key={i} x={758 + (i % 10) * 30} y={190 + dy + Math.floor(i / 10) * 15} width={26} height={11} rx={3} />);
    } else {
      bx = [742, 184, 328, 146];
      for (let i = 0; i < 10; i++) {
        bits.push(<rect key={i} x={750 + i * 32} y={192 + dy} width={24} height={130} rx={4} />);
        for (let t = 1; t < 10; t++) bits.push(<line key={i + "t" + t} x1={750 + i * 32} y1={192 + dy + t * 13} x2={774 + i * 32} y2={192 + dy + t * 13} stroke={shade(LC_AMBER, 0.3)} strokeWidth={1.2} />);
      }
    }
    return (
      <g pointerEvents="none">
        {gathered && <rect x={bx[0]} y={bx[1] + dy} width={bx[2]} height={bx[3]} rx={16} fill={tint(LC_AMBER, 0.7)} stroke={shade(LC_AMBER, 0.3)} strokeWidth={5} />}
        <g fill={tint(LC_AMBER, 0.2)} stroke={shade(LC_AMBER, 0.3)} strokeWidth={1.5}>{bits}</g>
        {gathered
          ? <text x={906} y={bx[1] + dy + bx[3] + 34} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={LC_INK_AMBER}>{"1 " + tx(P.big)}</text>
          : <text x={906} y={bx[1] + dy + bx[3] + 34} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("each") + " " + (J === 1000 ? "100 " + tx("m") : "1 " + tx(P.small))}</text>}
      </g>
    );
  };
  const carryBox = () => {
    if (kind !== "add") return null;
    const pcs = gather ? piecesPic(30, gather === 2) : null;
    if (d < 1) return pcs;
    const y0 = placeRow !== undefined ? 214 : 88;
    const split = d >= 3 && sol.carry > 0;
    return (
      <g>
        <rect x={726} y={y0} width={360} height={120} rx={RAD.panel} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
        <text x={906} y={y0 + (split ? 50 : 80)} textAnchor="middle" fontSize={split ? T.label : T.xl} fontWeight={700} fill={LC_INK_SMALL}>{indian(sol.sSum) + " " + tx(P.small)}</text>
        {split && (
          <text x={906} y={y0 + 100} textAnchor="middle" fontSize={T.label} fontWeight={700}>
            <tspan fill={LC_INK_AMBER}>{sol.carry + " " + tx(P.big) + " "}</tspan>
            <tspan fill={LC_INK_SMALL}>{sol.small + " " + tx(P.small)}</tspan>
          </text>
        )}
        {pcs}
      </g>
    );
  };
  /* the break is on every take-away (its being there never answers whether the top is too small); it works only
     when the smaller number on top is less than the one below */
  const breakSide = () => {
    if (kind !== "sub") return null;
    const live = (asking || free) && sol.need && !o.broken && !(free && dm);
    const cx = 906;
    let pcs: any = null;
    if (broken === 1) {
      pcs = (
        <g>
          <rect x={cx - 70} y={236} width={140} height={56} rx={12} fill={tint(LC_AMBER, 0.45)} stroke={shade(LC_AMBER, 0.3)} strokeWidth={2} />
          <text x={cx} y={274} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={LC_INK_AMBER}>{"1 " + tx(P.big)}</text>
        </g>
      );
    } else if (broken === 2) pcs = piecesPic(0, false);
    return (
      <g>
        <Key id="break" x={726} y={96} w={300} h={76} C={C} onClick={breakIt} disabled={!live} label={"break one " + P.bigWord.replace(/s$/, "") + " into " + P.smallWord}>
          <rect x={-136} y={-20} width={92} height={40} rx={10} fill={tint(LC_AMBER, 0.45)} stroke={shade(LC_AMBER, 0.3)} strokeWidth={2} />
          <text x={-90} y={10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={LC_INK_AMBER}>{"1 " + tx(P.big)}</text>
          <text x={46} y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("Break")}</text>
        </Key>
        {pcs}
      </g>
    );
  };

  /* the length bars, one scale: phase 1 reads the smaller part on a ruler of one larger unit; a sum lays the
     lengths end to end; a take-away lays one along the other, the difference in reddish purple */
  const bars = () => {
    if (kind === "place" || placeRow !== undefined) {
      const x0 = 150, full = 850;
      const pr = kind === "place" ? 0 : placeRow;
      const cardV = rows[pr][1];
      const sm = rowSmall(pr);
      /* phase 1's typed row gets its bar only in the correction and the win (a live bar would let the eye match
         it before Enter); ML1's tapped row keeps it live, since the tap is the learning */
      const shown = stage === "win" || stage === "idle" || (d >= 0 && !fresh);
      const rowV = kind === "place" ? (shown ? readOf(sm.s) : null) : at === null || at === undefined ? null : readOf(sm.s);
      const wOf = (v: number) => Math.max(3, Math.min(full, (v / J) * full));
      return (
        <g>
          <rect x={x0} y={430} width={wOf(cardV)} height={26} rx={4} fill={LC_GREEN} />
          <text x={x0 - 12} y={453} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={LC_INK_SMALL}>{indian(cardV) + " " + tx(P.small)}</text>
          {rowV !== null && (
            <g>
              <rect x={x0} y={466} width={wOf(rowV)} height={26} rx={4} fill={tint(LC_GREEN, 0.35)} stroke={LC_INK_SMALL} strokeWidth={2} />
              <text x={x0 - 12} y={489} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={LC_INK_SMALL}>{indian(rowV) + " " + tx(P.small)}</text>
            </g>
          )}
          <line x1={x0} y1={506} x2={x0 + full} y2={506} stroke={C.ink} strokeWidth={2} />
          {Array.from({ length: 11 }).map((_, i) => <line key={i} x1={x0 + (i * full) / 10} y1={i ? (i % 5 ? 500 : 496) : 490} x2={x0 + (i * full) / 10} y2={512}
            stroke={i ? C.ink : CONTENT.pointer} strokeWidth={i ? 2 : 4} />)}
          <text x={x0 - 12} y={518} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>0</text>
          <text x={x0 + full + 12} y={518} fontSize={T.micro} fontWeight={600} fill={C.ink}>{"1 " + tx(P.big)}</text>
        </g>
      );
    }
    const flat = rows.map((r: any) => (r[0] || 0) * J + r[1]);
    const total = kind === "add" ? flat.reduce((a: number, b: number) => a + b, 0) : flat[0];
    /* free play keeps the right of the bars for its New and Solve keys */
    const k = (free ? 640 : 1000) / total, x0 = 40, lx = free ? 680 : 1046;
    const lenBar = (r: any, x: number, y: number, h: number, key: string) => {
      const wb = (r[0] || 0) * J * k, ws = r[1] * k;
      return (
        <g key={key}>
          <rect x={x} y={y} width={Math.max(0, wb)} height={h} fill={LC_BLUE} />
          <rect x={x + wb} y={y} width={Math.max(2, ws)} height={h} fill={LC_GREEN} />
        </g>
      );
    };
    const fin = d >= 5;
    const label = fin ? sol.big + " " + tx(P.big) + " " + sol.small + " " + tx(P.small) : "";
    if (kind === "add") {
      const y = Math.max(462, bottom + 12);
      let x = x0;
      const segs = rows.map((r: any, i: number) => { const g = lenBar(r, x, y, 34, "seg" + i); x += flat[i] * k; return g; });
      return (
        <g>
          {segs}
          {rows.slice(1).map((_: any, i: number) => {
            const xs = x0 + flat.slice(0, i + 1).reduce((a: number, b: number) => a + b, 0) * k;
            return <line key={"cut" + i} x1={xs} y1={y - 6} x2={xs} y2={y + 40} stroke={C.ink} strokeWidth={3} />;
          })}
          {fin && <text x={lx} y={y - 14} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{label}</text>}
        </g>
      );
    }
    const xe = x0 + flat[1] * k, xt = x0 + flat[0] * k;
    return (
      <g>
        {lenBar(rows[0], x0, 420, 28, "top")}
        {lenBar(rows[1], x0, 456, 28, "bot")}
        {fin && <rect x={xe} y={456} width={Math.max(3, xt - xe)} height={28} fill={LC_PURPLE} />}
        {fin && <line x1={xt} y1={414} x2={xt} y2={490} stroke={C.ink} strokeWidth={2} strokeDasharray="5 5" />}
        {fin && <text x={lx} y={522} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{label}</text>}
      </g>
    );
  };

  /* the one invite (the runtime's pulse): the whole row that waits for the short number, the digit with no box,
     or, only after a miss, the break the child has not yet made */
  const pulse = (x: number, y: number, w: number, h: number) =>
    <rect className="c4-pulse" x={x} y={y} width={w} height={h} rx={18} fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" />;
  const invite = () => {
    if (!asking) return null;
    if (kind === "sub" && sol.need && !o.broken && wrong && !free) return pulse(718, 88, 316, 94);
    if (dm && !fresh) return null;
    if (kind === "add" && over && Number(over) > 0 && !free) return <Invite x={lcGhostX(1) + 30} y={ansTop + 32} r={40} C={C} />;
    if (!dm && placeRow !== undefined && (o.at === null || o.at === undefined)) return pulse(lcBoxX(B, 0) - 10, lcRowY(placeRow) - 8, LC_F.boxRight - lcBoxX(B, 0) + 20, LC_F.boxH + 16);
    return null;
  };

  /* what the host and the agent read back (toolApi.getState); never the answer before it is given */
  api.share({
    unitPair: P.label, operation: it.op === "-" ? "take away" : it.op === "+" ? "add" : "write",
    rows: rows.map((r: any) => (r[0] === null ? "" : r[0] + " " + P.big + " ") + r[1] + " " + P.small),
    carries: o.chips, breaks: o.broken ? 1 : 0,
  });

  return (
    <g>
      {unitSwitch()}
      {joiningSign()}
      {free && (
        <g>
          <Key id="new" x={726} y={436} w={164} h={76} C={C} onClick={deal} label="new lengths">
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("New")}</text>
          </Key>
          <Key id="solve" x={914} y={436} w={164} h={76} C={C} primary onClick={solveFree} disabled={tl.busy} label="work the columns">
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={tl.busy ? C.ink : "#FFFFFF"}>{tx("Solve")}</text>
          </Key>
        </g>
      )}
      {frame()}
      {(kind === "place" || placeRow !== undefined) && card()}
      {carryBox()}
      {breakSide()}
      {bars()}
      {invite()}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: the length as the frame
   writes it, the larger unit blue, the smaller unit green with its zeros in front grey */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  /* result.last.item is the item's index; the phase is found by the answer (every answer in the tool is its
     own). The row draws the item its "You learned" line is about (LC_THUMB) once the child has answered it
     (items are answered in order), else the last right answer */
  const key = JSON.stringify(last.answer);
  const ph: any = PHASES.find((p: any) => p.items.some((x: any) => JSON.stringify(x.answer) === key)) || PHASES[0];
  const want = LC_THUMB[ph.n];
  const pick = want !== undefined && (result.answered || 0) > want;
  const it: any = pick ? ph.items[want] : ph.items.find((x: any) => JSON.stringify(x.answer) === key) || {};
  const value = pick ? it.answer : last.value;
  const P = LC_PAIRS[it.pair] || LC_PAIRS.km;
  let big = "", small = "";
  if (it.kind === "place") { big = it.rows && it.rows[0][0] !== null ? String(it.rows[0][0]) : ""; small = String(value).replace(/[^0-9]/g, ""); }
  else { const p = slotPartsOf(value, 2); big = p[0]; small = p[1].length < P.boxes ? "0".repeat(P.boxes - p[1].length) + p[1] : p[1]; }
  const nz = small.search(/[1-9]/);
  const lead = nz < 0 ? small.length : nz;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <text x={w / 2} y={h / 2 + 11} textAnchor="middle" fontSize={T.label} fontWeight={700}>
        {big !== "" && <tspan fill={LC_INK_BIG}>{big + " " + tx(P.big) + " "}</tspan>}
        {lead > 0 && <tspan fill={LC_ZERO}>{small.slice(0, lead)}</tspan>}
        <tspan fill={LC_INK_SMALL}>{small.slice(lead) + " " + tx(P.small)}</tspan>
      </text>
    </g>
  );
}

function LengthColumns(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default LengthColumns;
