/* ═══ M2.S4.T7.C24.2D1 · rounding_line · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "rounding_line";
const MEDIA_ID = "M2.S4.T7.C24.2D1";
const TOOL_NAME = "Rounding Number Line";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["Your number is on the line. Which end is it nearer?"];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "You took the nearer one every time, and then asked whether to take it at all.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Any number, any place, and then round it or keep it.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r13+: `lineFor(line, lang, TR)`); the
   English stays what the checks read. Rounding off: निकटतम … तक सन्निकटन / નજીકના … સુધી ફેરવવું;
   digits stay digits (the runtime speaks them in the language in use). A first draft; wants a native
   speaker's read. */
const TR: any = {
  hi: {
    "Rounding Number Line": "सन्निकटन संख्या रेखा",
    "Your number is on the line. Which end is it nearer?": "तुम्हारी संख्या रेखा पर है। वह किस सिरे के ज़्यादा पास है?",
    "You took the nearer one every time, and then asked whether to take it at all.": "तुमने हर बार पास वाला चुना, और फिर पूछा कि उसे लेना भी है या नहीं।",
    "Free play. Any number, any place, and then round it or keep it.": "मुक्त खेल। कोई भी संख्या, कोई भी स्थान, फिर सन्निकटन करो या वैसा ही रखो।",
    "Rounding to the nearest ten": "निकटतम दहाई तक सन्निकटन",
    "Which end is your number closer to? Look before you count.": "तुम्हारी संख्या किस सिरे के ज़्यादा पास है? गिनने से पहले देखो।",
    "Slide the pin to the nearer end, or type it, then press enter.": "पिन को पास वाले सिरे पर खिसकाओ, या लिखो, फिर एंटर दबाओ।",
    "Which bar is shorter?": "कौन सी पट्टी छोटी है?",
    "Put your finger on the nearer end before you write anything.": "कुछ भी लिखने से पहले पास वाले सिरे पर उँगली रखो।",
    "Rounding to the nearest ten is taking the nearer of the two tens either side, and the ones digit is how you tell which.": "निकटतम दहाई तक सन्निकटन यानी दोनों ओर की दहाइयों में से पास वाली लेना, और इकाई का अंक बताता है कि कौन सी।",
    "You learned: the ones digit tells you which ten is nearer.": "तुमने सीखा: इकाई का अंक बताता है कि कौन सी दहाई पास है।",
    "Round 32,768 to the nearest ten.": "32,768 का निकटतम दहाई तक सन्निकटन करो।",
    "Nearest 10 to 32,768?": "32,768 की निकटतम दहाई?",
    "Which two tens sit either side of it?": "इसके दोनों ओर कौन सी दो दहाइयाँ हैं?",
    "Round 7,552 to the nearest ten.": "7,552 का निकटतम दहाई तक सन्निकटन करो।",
    "Nearest 10 to 7,552?": "7,552 की निकटतम दहाई?",
    "Is a ones digit of two nearer to zero or to ten?": "इकाई का अंक दो, शून्य के पास है या दस के?",
    "Round 32,529 to the nearest ten.": "32,529 का निकटतम दहाई तक सन्निकटन करो।",
    "Nearest 10 to 32,529?": "32,529 की निकटतम दहाई?",
    "Is nine nearer to the ten below or the ten above?": "नौ, नीचे वाली दहाई के पास है या ऊपर वाली के?",
    "Rounding to the nearest hundred": "निकटतम सैकड़े तक सन्निकटन",
    "Cover the hundreds digit. Read the digits after it as one number, not two.": "सैकड़े के अंक को ढको। उसके बाद के अंकों को दो नहीं, एक संख्या की तरह पढ़ो।",
    "Is that number halfway or more?": "क्या वह संख्या आधी या उससे ज़्यादा है?",
    "Read the last two digits as one number. Is it fifty or more?": "आखिरी दो अंकों को एक संख्या की तरह पढ़ो। क्या वह पचास या उससे ज़्यादा है?",
    "For hundreds I read everything to the right of the hundreds place as one number and measure it against halfway.": "सैकड़े के लिए, सैकड़े के स्थान के दाईं ओर का सब कुछ एक संख्या की तरह पढ़ा जाता है और आधे से मिलाया जाता है।",
    "You learned: for hundreds, read the last two digits as one number.": "तुमने सीखा: सैकड़े के लिए आखिरी दो अंक एक संख्या की तरह पढ़ो।",
    "Round 32,768 to the nearest hundred.": "32,768 का निकटतम सैकड़े तक सन्निकटन करो।",
    "Nearest 100 to 32,768?": "32,768 का निकटतम सैकड़ा?",
    "What does the box to the right of the shaded place hold?": "रंगे हुए स्थान के दाईं ओर के डिब्बे में क्या है?",
    "Round 7,552 to the nearest hundred.": "7,552 का निकटतम सैकड़े तक सन्निकटन करो।",
    "Nearest 100 to 7,552?": "7,552 का निकटतम सैकड़ा?",
    "Which hundred is seven thousand five hundred fifty-two nearer to?": "सात हज़ार पाँच सौ बावन किस सैकड़े के ज़्यादा पास है?",
    "Round 32,529 to the nearest hundred.": "32,529 का निकटतम सैकड़े तक सन्निकटन करो।",
    "Nearest 100 to 32,529?": "32,529 का निकटतम सैकड़ा?",
    "Is twenty-nine less than fifty?": "क्या उनतीस, पचास से कम है?",
    "Rounding to the nearest thousand": "निकटतम हज़ार तक सन्निकटन",
    "One number, three lines. Round it to the nearest thousand on the bottom line.": "एक संख्या, तीन रेखाएँ। नीचे वाली रेखा पर इसका निकटतम हज़ार तक सन्निकटन करो।",
    "What number do they make together? Is it halfway or more?": "वे मिलकर कौन सी संख्या बनाते हैं? क्या वह आधी या उससे ज़्यादा है?",
    "Look only at the bottom line. Which end is nearer to the pin?": "सिर्फ़ नीचे वाली रेखा देखो। कौन सा सिरा पिन के ज़्यादा पास है?",
    "One number rounds three different ways, and an answer only means something once you say what it was rounded to.": "एक संख्या का सन्निकटन तीन तरह से होता है, और उत्तर का अर्थ तभी है जब बताओ कि किस तक सन्निकटन किया।",
    "You learned: one number can round three ways, and all are right.": "तुमने सीखा: एक संख्या का तीन तरह से सन्निकटन हो सकता है, और तीनों सही।",
    "Round 43,211 to the nearest thousand.": "43,211 का निकटतम हज़ार तक सन्निकटन करो।",
    "Nearest 1,000 to 43,211?": "43,211 का निकटतम हज़ार?",
    "How many digits stand to the right of the thousands place?": "हज़ार के स्थान के दाईं ओर कितने अंक हैं?",
    "Round 4,78,965 to the nearest thousand.": "4,78,965 का निकटतम हज़ार तक सन्निकटन करो।",
    "Nearest 1,000 to 4,78,965?": "4,78,965 का निकटतम हज़ार?",
    "Is nine hundred sixty-five past halfway to the next thousand?": "क्या नौ सौ पैंसठ, अगले हज़ार के आधे से आगे है?",
    "Round 7,552 to the nearest thousand.": "7,552 का निकटतम हज़ार तक सन्निकटन करो।",
    "Nearest 1,000 to 7,552?": "7,552 का निकटतम हज़ार?",
    "Is five hundred fifty-two more or less than half a thousand?": "पाँच सौ बावन, आधे हज़ार से ज़्यादा है या कम?",
    "When rounding a number would be wrong": "जब सन्निकटन करना गलत होगा",
    "Ask what this number is for before you round it.": "सन्निकटन से पहले पूछो कि यह संख्या किस काम की है।",
    "Tap the card to see it rounded, then choose.": "सन्निकटन देखने के लिए कार्ड पर टैप करो, फिर चुनो।",
    "What do they do with it?": "वे इसका क्या करते हैं?",
    "Picture it on a poster, then on a ticket. Does it still work?": "इसे पहले पोस्टर पर, फिर टिकट पर सोचो। क्या यह तब भी ठीक है?",
    "Whether to round depends on what the number is for, and a number somebody has to act on is left alone.": "सन्निकटन करें या नहीं, यह संख्या के काम पर निर्भर है, और जिस संख्या पर किसी को काम करना हो, उसे वैसा ही छोड़ते हैं।",
    "You learned: ask what a number is for before you round it.": "तुमने सीखा: सन्निकटन से पहले पूछो कि संख्या किस काम की है।",
    "A school begins at twenty-five past eight. Should that be rounded to the nearest ten minutes?": "स्कूल आठ बजकर पच्चीस मिनट पर शुरू होता है। क्या उसका निकटतम दस मिनट तक सन्निकटन करना चाहिए?",
    "Round it, or keep it?": "सन्निकटन करो, या वैसा ही रखो?",
    "Who uses this number?": "इस संख्या का उपयोग कौन करता है?",
    "The human body has 206 bones. Should that be rounded to the nearest hundred?": "मनुष्य के शरीर में 206 हड्डियाँ होती हैं। क्या उसका निकटतम सैकड़े तक सन्निकटन करना चाहिए?",
    "Would a doctor want the exact count?": "क्या डॉक्टर को सटीक गिनती चाहिए होगी?",
    "There were 1,875 people in a hall. Can that be rounded to the nearest thousand?": "एक हॉल में 1,875 लोग थे। क्या उसका निकटतम हज़ार तक सन्निकटन हो सकता है?",
    "Does anyone need the exact number of people?": "क्या किसी को लोगों की सटीक संख्या चाहिए?",
    /* the working area's own words, and the choices */
    "O": "इ", "T": "द", "H": "सै", "Th": "ह", "TTh": "द.ह.", "L": "ल", "TL": "द.ल.",
    "5 or more: up": "5 या ज़्यादा: ऊपर", "50 or more: up": "50 या ज़्यादा: ऊपर", "500 or more: up": "500 या ज़्यादा: ऊपर",
    "ten": "दस", "hundred": "सौ", "thousand": "हज़ार", "nearest": "निकटतम", "halfway": "बीच में",
    "school starts": "स्कूल शुरू", "bones in a body": "शरीर में हड्डियाँ", "people in a hall": "हॉल में लोग",
    "Round it": "सन्निकटन", "Keep it": "वैसा ही",
    "bell": "घंटी", "you": "तुम", "gate shuts": "गेट बंद", "gate open": "गेट खुला", "5 minutes late": "5 मिनट देर", "on time": "समय पर",
    "tall bone = 10": "लंबी हड्डी = 10", "6 bones missing": "6 हड्डियाँ गायब", "an exact count": "सटीक गिनती",
    "about": "लगभग", "just how many": "मोटा अंदाज़ा", "exact, not needed": "सटीक की ज़रूरत नहीं",
    "Number line": "संख्या रेखा", "Back to the number line": "संख्या रेखा पर वापस", "Next one": "अगला", "Another quantity": "दूसरी मात्रा",
    "Round to the nearest ten": "निकटतम दहाई तक सन्निकटन", "Round to the nearest hundred": "निकटतम सैकड़े तक सन्निकटन",
    "Round to the nearest thousand": "निकटतम हज़ार तक सन्निकटन",
    "New number": "नई संख्या", "A new number": "एक नई संख्या", "Round or keep": "सन्निकटन या रखो", "Round it or keep it": "सन्निकटन करो या वैसा ही रखो",
  },
  gu: {
    "Rounding Number Line": "નજીકની સંખ્યા શોધો",
    "Your number is on the line. Which end is it nearer?": "તમારી સંખ્યા રેખા પર છે. તે કયા છેડાની વધુ નજીક છે?",
    "You took the nearer one every time, and then asked whether to take it at all.": "તમે દર વખતે નજીકનું લીધું, અને પછી પૂછ્યું કે તે લેવું કે નહીં.",
    "Free play. Any number, any place, and then round it or keep it.": "મુક્ત રમત. કોઈ પણ સંખ્યા, કોઈ પણ સ્થાન, પછી ફેરવો કે એમ જ રાખો.",
    "Rounding to the nearest ten": "નજીકના દશક સુધી ફેરવવું",
    "Which end is your number closer to? Look before you count.": "તમારી સંખ્યા કયા છેડાની વધુ નજીક છે? ગણતાં પહેલાં જુઓ.",
    "Slide the pin to the nearer end, or type it, then press enter.": "પિનને નજીકના છેડે ખસેડો, અથવા લખો, પછી એન્ટર દબાવો.",
    "Which bar is shorter?": "કઈ પટ્ટી ટૂંકી છે?",
    "Put your finger on the nearer end before you write anything.": "કંઈ પણ લખતાં પહેલાં નજીકના છેડે આંગળી મૂકો.",
    "Rounding to the nearest ten is taking the nearer of the two tens either side, and the ones digit is how you tell which.": "નજીકના દશક સુધી ફેરવવું એટલે બંને બાજુના દશકમાંથી નજીકનો લેવો, અને એકમનો અંક બતાવે કે કયો.",
    "You learned: the ones digit tells you which ten is nearer.": "તમે શીખ્યા: એકમનો અંક બતાવે છે કે કયો દશક નજીક છે.",
    "Round 32,768 to the nearest ten.": "32,768 ને નજીકના દશક સુધી ફેરવો.",
    "Nearest 10 to 32,768?": "32,768 નો નજીકનો દશક?",
    "Which two tens sit either side of it?": "તેની બંને બાજુ કયા બે દશક છે?",
    "Round 7,552 to the nearest ten.": "7,552 ને નજીકના દશક સુધી ફેરવો.",
    "Nearest 10 to 7,552?": "7,552 નો નજીકનો દશક?",
    "Is a ones digit of two nearer to zero or to ten?": "એકમનો અંક બે, શૂન્યની નજીક છે કે દસની?",
    "Round 32,529 to the nearest ten.": "32,529 ને નજીકના દશક સુધી ફેરવો.",
    "Nearest 10 to 32,529?": "32,529 નો નજીકનો દશક?",
    "Is nine nearer to the ten below or the ten above?": "નવ, નીચેના દશકની નજીક છે કે ઉપરના?",
    "Rounding to the nearest hundred": "નજીકના શતક સુધી ફેરવવું",
    "Cover the hundreds digit. Read the digits after it as one number, not two.": "શતકના અંકને ઢાંકો. તેના પછીના અંકોને બે નહીં, એક સંખ્યા તરીકે વાંચો.",
    "Is that number halfway or more?": "શું તે સંખ્યા અડધી કે તેથી વધુ છે?",
    "Read the last two digits as one number. Is it fifty or more?": "છેલ્લા બે અંકોને એક સંખ્યા તરીકે વાંચો. શું તે પચાસ કે તેથી વધુ છે?",
    "For hundreds I read everything to the right of the hundreds place as one number and measure it against halfway.": "શતક માટે, શતકના સ્થાનની જમણી બાજુનું બધું એક સંખ્યા તરીકે વંચાય છે અને અડધા સાથે સરખાવાય છે.",
    "You learned: for hundreds, read the last two digits as one number.": "તમે શીખ્યા: શતક માટે છેલ્લા બે અંક એક સંખ્યા તરીકે વાંચો.",
    "Round 32,768 to the nearest hundred.": "32,768 ને નજીકના શતક સુધી ફેરવો.",
    "Nearest 100 to 32,768?": "32,768 નો નજીકનો શતક?",
    "What does the box to the right of the shaded place hold?": "રંગેલા સ્થાનની જમણી બાજુના ખાનામાં શું છે?",
    "Round 7,552 to the nearest hundred.": "7,552 ને નજીકના શતક સુધી ફેરવો.",
    "Nearest 100 to 7,552?": "7,552 નો નજીકનો શતક?",
    "Which hundred is seven thousand five hundred fifty-two nearer to?": "સાત હજાર પાંચસો બાવન કયા શતકની વધુ નજીક છે?",
    "Round 32,529 to the nearest hundred.": "32,529 ને નજીકના શતક સુધી ફેરવો.",
    "Nearest 100 to 32,529?": "32,529 નો નજીકનો શતક?",
    "Is twenty-nine less than fifty?": "શું ઓગણત્રીસ, પચાસથી ઓછા છે?",
    "Rounding to the nearest thousand": "નજીકના હજાર સુધી ફેરવવું",
    "One number, three lines. Round it to the nearest thousand on the bottom line.": "એક સંખ્યા, ત્રણ રેખા. નીચેની રેખા પર તેને નજીકના હજાર સુધી ફેરવો.",
    "What number do they make together? Is it halfway or more?": "તે મળીને કઈ સંખ્યા બનાવે છે? શું તે અડધી કે તેથી વધુ છે?",
    "Look only at the bottom line. Which end is nearer to the pin?": "ફક્ત નીચેની રેખા જુઓ. કયો છેડો પિનની વધુ નજીક છે?",
    "One number rounds three different ways, and an answer only means something once you say what it was rounded to.": "એક સંખ્યા ત્રણ રીતે ફેરવાય છે, અને જવાબનો અર્થ ત્યારે જ છે જ્યારે કહો કે શેના સુધી ફેરવી.",
    "You learned: one number can round three ways, and all are right.": "તમે શીખ્યા: એક સંખ્યા ત્રણ રીતે ફેરવાય, અને ત્રણેય સાચી.",
    "Round 43,211 to the nearest thousand.": "43,211 ને નજીકના હજાર સુધી ફેરવો.",
    "Nearest 1,000 to 43,211?": "43,211 નો નજીકનો હજાર?",
    "How many digits stand to the right of the thousands place?": "હજારના સ્થાનની જમણી બાજુ કેટલા અંક છે?",
    "Round 4,78,965 to the nearest thousand.": "4,78,965 ને નજીકના હજાર સુધી ફેરવો.",
    "Nearest 1,000 to 4,78,965?": "4,78,965 નો નજીકનો હજાર?",
    "Is nine hundred sixty-five past halfway to the next thousand?": "શું નવસો પાંસઠ, આગલા હજારના અડધાથી આગળ છે?",
    "Round 7,552 to the nearest thousand.": "7,552 ને નજીકના હજાર સુધી ફેરવો.",
    "Nearest 1,000 to 7,552?": "7,552 નો નજીકનો હજાર?",
    "Is five hundred fifty-two more or less than half a thousand?": "પાંચસો બાવન, અડધા હજારથી વધુ છે કે ઓછા?",
    "When rounding a number would be wrong": "જ્યારે ફેરવવું ખોટું હોય",
    "Ask what this number is for before you round it.": "ફેરવતાં પહેલાં પૂછો કે આ સંખ્યા શેના માટે છે.",
    "Tap the card to see it rounded, then choose.": "ફેરવેલી જોવા કાર્ડ પર ટૅપ કરો, પછી પસંદ કરો.",
    "What do they do with it?": "તેઓ તેનું શું કરે છે?",
    "Picture it on a poster, then on a ticket. Does it still work?": "તેને પહેલાં પોસ્ટર પર, પછી ટિકિટ પર વિચારો. શું તે હજી ચાલે છે?",
    "Whether to round depends on what the number is for, and a number somebody has to act on is left alone.": "ફેરવવું કે નહીં એ સંખ્યાના કામ પર આધાર રાખે છે, અને જે સંખ્યા પર કોઈએ કામ કરવાનું હોય તેને એમ જ રહેવા દેવાય.",
    "You learned: ask what a number is for before you round it.": "તમે શીખ્યા: ફેરવતાં પહેલાં પૂછો કે સંખ્યા શેના માટે છે.",
    "A school begins at twenty-five past eight. Should that be rounded to the nearest ten minutes?": "શાળા આઠ ને પચ્ચીસે શરૂ થાય છે. શું તેને નજીકની દસ મિનિટ સુધી ફેરવવું જોઈએ?",
    "Round it, or keep it?": "ફેરવો, કે એમ જ રાખો?",
    "Who uses this number?": "આ સંખ્યા કોણ વાપરે છે?",
    "The human body has 206 bones. Should that be rounded to the nearest hundred?": "માણસના શરીરમાં 206 હાડકાં હોય છે. શું તેને નજીકના શતક સુધી ફેરવવું જોઈએ?",
    "Would a doctor want the exact count?": "શું ડૉક્ટરને ચોક્કસ ગણતરી જોઈએ?",
    "There were 1,875 people in a hall. Can that be rounded to the nearest thousand?": "એક હૉલમાં 1,875 લોકો હતા. શું તેને નજીકના હજાર સુધી ફેરવી શકાય?",
    "Does anyone need the exact number of people?": "શું કોઈને લોકોની ચોક્કસ સંખ્યા જોઈએ?",
    /* the working area's own words, and the choices */
    "O": "એ", "T": "દ", "H": "શ", "Th": "હ", "TTh": "દ.હ.", "L": "લ", "TL": "દ.લ.",
    "5 or more: up": "5 કે વધુ: ઉપર", "50 or more: up": "50 કે વધુ: ઉપર", "500 or more: up": "500 કે વધુ: ઉપર",
    "ten": "દસ", "hundred": "સો", "thousand": "હજાર", "nearest": "નજીકના", "halfway": "વચ્ચે",
    "school starts": "શાળા શરૂ", "bones in a body": "શરીરમાં હાડકાં", "people in a hall": "હૉલમાં લોકો",
    "Round it": "ફેરવો", "Keep it": "રાખો",
    "bell": "ઘંટ", "you": "તમે", "gate shuts": "દરવાજો બંધ", "gate open": "દરવાજો ખુલ્લો", "5 minutes late": "5 મિનિટ મોડું", "on time": "સમયસર",
    "tall bone = 10": "લાંબું હાડકું = 10", "6 bones missing": "6 હાડકાં ગાયબ", "an exact count": "ચોક્કસ ગણતરી",
    "about": "લગભગ", "just how many": "આશરે અંદાજ", "exact, not needed": "ચોક્કસની જરૂર નથી",
    "Number line": "સંખ્યા રેખા", "Back to the number line": "સંખ્યા રેખા પર પાછા", "Next one": "આગળનું", "Another quantity": "બીજી રકમ",
    "Round to the nearest ten": "નજીકના દશક સુધી ફેરવો", "Round to the nearest hundred": "નજીકના શતક સુધી ફેરવો",
    "Round to the nearest thousand": "નજીકના હજાર સુધી ફેરવો",
    "New number": "નવી સંખ્યા", "A new number": "એક નવી સંખ્યા", "Round or keep": "ફેરવો કે રાખો", "Round it or keep it": "ફેરવો કે એમ જ રાખો",
  },
};

/* ── the rounding line: colours, numbers, geometry ─────────────────────────────────────
   The chapter's own content colours: a digit takes its PERIOD's colour (ones period deep blue,
   thousands green, lakhs vermilion). Amber is whatever settles the answer (the rounding place,
   the box read, the shorter bar); grey is a zero that only holds a place. The child's number is
   a rose pin: rose is the millions period, which no number in this tool reaches. */
const AMBER = CONTENT.ten;
const AMBER_INK = shade(CONTENT.ten, 0.4);
const ZERO = "#767676";
const PIN = CONTENT.bead;
const PIN_EDGE = shade(CONTENT.bead, 0.3);
const BAR = tint(CONTENT.line, 0.72);
const PERIOD_OF = [0, 0, 0, 1, 1, 2, 2];
const PERIOD_COLOR = [CONTENT.hundred, CONTENT.one, CONTENT.pointer];
const inkOf = (k: number) => shade(PERIOD_COLOR[PERIOD_OF[Math.min(k, 6)]], 0.25);
const HEADS = ["O", "T", "H", "Th", "TTh", "L", "TL"];
const PLACE_WORD: Record<number, string> = { 10: "ten", 100: "hundred", 1000: "thousand" };
const RULE_OF: Record<number, string> = { 10: "5 or more: up", 100: "50 or more: up", 1000: "500 or more: up" };

/* the number line's own route to an answer: the two nearest multiples, and the nearer one
   (the halfway number goes up) */
const lowOf = (v: number, p: number) => Math.floor(v / p) * p;
const nearOf = (v: number, p: number) => (v - lowOf(v, p) >= p / 2 ? lowOf(v, p) + p : lowOf(v, p));
const digitsOf = (v: number) => String(Math.max(0, Math.trunc(v))).split("").reverse().map(Number);
const placeK = (p: number) => String(p).length - 1;
const estW = (s: string, size: number) =>
  String(s).split("").reduce((a, ch) => a + (/[,:.]/.test(ch) ? 0.3 : ch === " " ? 0.28 : /\d/.test(ch) ? 0.62 : 0.56), 0) * size;
const clampX = (x: number, a: number, b: number) => Math.max(a, Math.min(b, x));
const diamond = (x: number, y: number, r: number) => `M ${x} ${y - r} L ${x + r} ${y} L ${x} ${y + r} L ${x - r} ${y} Z`;

/* geometry in working-area units (1086 x 528). One line (phases 1-2 and free play): 880 long,
   the pin standing on it, distance bars under it, end plates under the ends, the rule strip
   below. Three lines (phase 3): 650 long, one per place, the answers in a column at the right. */
const ONE = (free: boolean) => {
  const y = free ? 240 : 196;
  return { x0: 118, x1: 968, y, head: y - 150, bar: y + 16, lab: y + 74, plate: y + 90, strip: y + 180 };
};
const STACK = { x0: 180, x1: 830, ys: [64, 184, 304], strip: 412, places: [10, 100, 1000], ans: 900 };
const STRIP = { cw: 84, h: 104, right: 622, note: 658 };
const JUDGE_CHOICES = [{ id: "yes", label: "Round it" }, { id: "no", label: "Keep it" }];
const FREE_NUMBERS = [7552, 32768, 43211, 478965, 32529, 64250, 5045, 90999, 12500];
const PIN_PAY = { src: "pin" };
const FREE_PAY = { src: "free" };

/* One entry per phase = one mount.
   kinds: round (one line, rounded to one place) · stack (three lines, the bottom one asked) ·
          judge (the judgement bay: round it or keep it) */
const PHASES = [
  {
    n: 1,
    concept: "Rounding to the nearest ten",
    conceptId: "M2.S4.T7.C24", objectiveIds: ["O11"],
    says: ["Which end is your number closer to? Look before you count.", "Slide the pin to the nearer end, or type it, then press enter."],
    ladder: ["Which bar is shorter?", "Put your finger on the nearer end before you write anything."],
    closing: "Rounding to the nearest ten is taking the nearer of the two tens either side, and the ones digit is how you tell which.",
    learned: "You learned: the ones digit tells you which ten is nearer.",
    traceback: "The tens place shades amber, a box closes round the ones digit, and the distance bars fill from the pin; the shorter one turns amber.",
    items: [
      /* learn ML1: answer in the plan = 32,770 */
      { qid: "M2.S4.T7.C24:ML1", kind: "round", n: 32768, place: 10, winMs: 2800, say: "Round 32,768 to the nearest ten.", ask: "Nearest 10 to 32,768?", answer: 32770, miss: "Which two tens sit either side of it?" },
      /* practice 1: answer in the plan = 7550 */
      { qid: "M2.S4.T7.C24:1", kind: "round", n: 7552, place: 10, winMs: 2800, say: "Round 7,552 to the nearest ten.", ask: "Nearest 10 to 7,552?", answer: 7550, miss: "Is a ones digit of two nearer to zero or to ten?" },
      /* practice 2: answer in the plan = 32,530 (the tens digit is low, the ones digit is high) */
      { qid: "M2.S4.T7.C24:2", kind: "round", n: 32529, place: 10, hide: true, winMs: 2800, say: "Round 32,529 to the nearest ten.", ask: "Nearest 10 to 32,529?", answer: 32530, miss: "Is nine nearer to the ten below or the ten above?" },
    ],
  },
  {
    n: 2,
    concept: "Rounding to the nearest hundred",
    conceptId: "M2.S4.T7.C25", objectiveIds: ["O11"],
    says: ["Cover the hundreds digit. Read the digits after it as one number, not two."],
    ladder: ["Is that number halfway or more?", "Read the last two digits as one number. Is it fifty or more?"],
    closing: "For hundreds I read everything to the right of the hundreds place as one number and measure it against halfway.",
    learned: "You learned: for hundreds, read the last two digits as one number.",
    traceback: "The hundreds place shades amber, the box widens to hold both digits after it as one number, halfway is labelled and the bars fill.",
    items: [
      /* learn ML2: answer in the plan = 32,800 */
      { qid: "M2.S4.T7.C25:ML2", kind: "round", n: 32768, place: 100, winMs: 2800, say: "Round 32,768 to the nearest hundred.", ask: "Nearest 100 to 32,768?", answer: 32800, miss: "What does the box to the right of the shaded place hold?" },
      /* practice 3: answer in the plan = 7600 */
      { qid: "M2.S4.T7.C25:3", kind: "round", n: 7552, place: 100, winMs: 2800, say: "Round 7,552 to the nearest hundred.", ask: "Nearest 100 to 7,552?", answer: 7600, miss: "Which hundred is seven thousand five hundred fifty-two nearer to?" },
      /* practice 4: answer in the plan = 32,500. The two digits to the right are twenty-nine, which is under fifty */
      { qid: "M2.S4.T7.C25:4", kind: "round", n: 32529, place: 100, hide: true, winMs: 2800, say: "Round 32,529 to the nearest hundred.", ask: "Nearest 100 to 32,529?", answer: 32500, miss: "Is twenty-nine less than fifty?" },
    ],
  },
  {
    n: 3,
    concept: "Rounding to the nearest thousand",
    conceptId: "M2.S4.T7.C26", objectiveIds: ["O12"],
    says: ["One number, three lines. Round it to the nearest thousand on the bottom line."],
    ladder: ["What number do they make together? Is it halfway or more?", "Look only at the bottom line. Which end is nearer to the pin?"],
    closing: "One number rounds three different ways, and an answer only means something once you say what it was rounded to.",
    learned: "You learned: one number can round three ways, and all are right.",
    traceback: "The bottom line gets its halfway label, the box closes round all three digits after the thousands place, the bars fill, and a line drops from each pin.",
    items: [
      /* learn ML3: answer in the plan = 43,000 */
      { qid: "M2.S4.T7.C26:ML3", kind: "stack", n: 43211, place: 1000, winMs: 3000, say: "Round 43,211 to the nearest thousand.", ask: "Nearest 1,000 to 43,211?", answer: 43000, miss: "How many digits stand to the right of the thousands place?" },
      /* practice 5: answer in the plan = 4,79,000 */
      { qid: "M2.S4.T7.C26:5", kind: "stack", n: 478965, place: 1000, winMs: 3000, say: "Round 4,78,965 to the nearest thousand.", ask: "Nearest 1,000 to 4,78,965?", answer: 479000, miss: "Is nine hundred sixty-five past halfway to the next thousand?" },
      /* practice 6: answer in the plan = 8000. The three digits to the right are five hundred fifty-two, which is over five hundred.
         7552 was rounded to ten and to hundred in phases 1 and 2, so those answers stand on the top two lines */
      { qid: "M2.S4.T7.C26:6", kind: "stack", n: 7552, place: 1000, earlier: true, hide: true, winMs: 5200, say: "Round 7,552 to the nearest thousand.", ask: "Nearest 1,000 to 7,552?", answer: 8000, miss: "Is five hundred fifty-two more or less than half a thousand?" },
    ],
  },
  {
    n: 4,
    concept: "When rounding a number would be wrong",
    conceptId: "M2.S4.T7.C27", objectiveIds: ["O12"],
    says: ["Ask what this number is for before you round it.", "Tap the card to see it rounded, then choose."],
    ladder: ["What do they do with it?", "Picture it on a poster, then on a ticket. Does it still work?"],
    closing: "Whether to round depends on what the number is for, and a number somebody has to act on is left alone.",
    learned: "You learned: ask what a number is for before you round it.",
    traceback: "The rounded value shows on the quantity card and the Round it card draws what that would mean; nothing is crossed out.",
    items: [
      /* learn ML4: answer in the plan = No, because somebody has to act on it and a rounded start makes you late.
         The plan's time is half past eight, which the nearest ten minutes leaves unchanged; it is twenty-five past
         here so that rounding really moves it (reported as a departure) */
      { qid: "M2.S4.T7.C27:ML4", kind: "judge", icon: "clock", show: "8:25", rounded: "8:30", to: 10, what: "school starts", use: "act", late: "5 minutes late", winMs: 2600,
        say: "A school begins at twenty-five past eight. Should that be rounded to the nearest ten minutes?", ask: "Round it, or keep it?", answer: "no", choices: JUDGE_CHOICES, miss: "Who uses this number?" },
      /* practice 7: answer in the plan = No. It is an exact count, and saying two hundred would state something untrue */
      { qid: "M2.S4.T7.C27:7", kind: "judge", icon: "bone", show: "206", rounded: "200", to: 100, what: "bones in a body", use: "exact", lost: "6 bones missing", winMs: 2600,
        say: "The human body has 206 bones. Should that be rounded to the nearest hundred?", ask: "Round it, or keep it?", answer: "no", choices: JUDGE_CHOICES, miss: "Would a doctor want the exact count?" },
      /* practice 8: answer in the plan = Yes, to 2000. A crowd size is used to get a sense of how many, not to count heads */
      { qid: "M2.S4.T7.C27:8", kind: "judge", icon: "crowd", show: "1,875", rounded: "2,000", to: 1000, what: "people in a hall", use: "sense", winMs: 2600,
        say: "There were 1,875 people in a hall. Can that be rounded to the nearest thousand?", ask: "Round it, or keep it?", answer: "yes", choices: JUDGE_CHOICES, miss: "Does anyone need the exact number of people?" },
    ],
  },
];

/* The numbers the working area needs, kept for the sidecar. */
const MODEL = {
  singleLine: ONE(false), stack: STACK, strip: STRIP,
  halfwayRule: "the halfway number rounds up", colours: { pin: "bead", settles: "ten (amber)", periods: ["hundred", "one", "pointer"] },
  freeNumbers: FREE_NUMBERS,
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a rounded answer compares as a number; the bay compares the choice */
const judge = (item: any, v: any) =>
  item.kind === "judge" ? String(v ?? "").trim().toLowerCase() === item.answer : leadNumber(v) === item.answer;

/* oracle: every answer re-derived from the spoken question by the rule strip's own route (the digits
   to the right of the place, read as one number against 5, 50 or 500), sharing no code with judge,
   the line or the picture; the bay by what the number is used for */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "judge") {
    const want = it.use === "sense" ? "yes" : "no"; /* acted on, or an exact count: keep it */
    const clock = /^(\d+):(\d\d)$/.exec(it.show);
    let ok = true;
    if (clock) {
      const m = Number(clock[2]), up = m % 10 >= 5, mm = m - (m % 10) + (up ? 10 : 0);
      ok = it.rounded === `${Number(clock[1]) + Math.floor(mm / 60)}:${String(mm % 60).padStart(2, "0")}`;
    } else {
      const s = it.show.replace(/,/g, ""), z = String(it.to).length - 1;
      const head = s.slice(0, s.length - z), tail = s.slice(s.length - z);
      const r = String(Number(head || "0") + (Number(tail) >= 5 * Math.pow(10, z - 1) ? 1 : 0)) + "0".repeat(z);
      ok = Number(it.rounded.replace(/,/g, "")) === Number(r);
    }
    return ok && it.answer === want && it.choices.filter((c: any) => c.id === it.answer).length === 1;
  }
  const m = /Round ([\d,]+) to the nearest (ten|hundred|thousand)/.exec(it.say);
  if (!m) return false;
  const digits = m[1].replace(/,/g, ""), zeros = ({ ten: 1, hundred: 2, thousand: 3 } as any)[m[2]];
  if (Number(digits) !== it.n || Math.pow(10, zeros) !== it.place) return false;
  const head = digits.slice(0, digits.length - zeros), tail = digits.slice(digits.length - zeros);
  const up = Number(tail) >= 5 * Math.pow(10, zeros - 1);
  return Number(String(Number(head || "0") + (up ? 1 : 0)) + "0".repeat(zeros)) === it.answer;
}));

/* the most likely wrong answer (the misconception): the far end of the line, or the other choice */
const nearMiss = (item: any) => {
  if (item.kind === "judge") return item.answer === "yes" ? "no" : "yes";
  const lo = lowOf(item.n, item.place);
  return item.answer === lo ? lo + item.place : lo;
};
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.kind === "judge" ? [item.answer] : [String(item.answer), indian(item.answer), words(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;
/* the slot prints a rounded number with its Indian commas, and a choice by its label */
const format = (v: any) => {
  const t = String(v ?? "");
  if (t === "yes") return "Round it";
  if (t === "no") return "Keep it";
  return /^[1-9]\d{3,8}$/.test(t) ? indian(Number(t)) : t;
};

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
/* the driver completes an item as a child would: the pin to the right end, then the answer and Enter
   (on an item whose ends are hidden the pin writes nothing, so the answer is typed) */
const solve = (item: any, T: any) => {
  if (item.kind === "judge") return T.submit(item.answer);
  if (HOOK.pick) HOOK.pick(item.answer);
  setTimeout(() => T.submit(item.answer), 60);
};
/* the agent's answer(): an end of the line moves the pin there and writes it; on hidden ends, and for
   anything else, the answer is typed */
const answer = (item: any, v: any) => (item.kind === "judge" ? undefined : HOOK.pick && HOOK.pick(v) ? true : undefined);
/* nothing waits to be dropped: check() presses Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

const RL_CSS = `
.rl-slide{transition:transform 520ms cubic-bezier(.3,.7,.25,1)}
.rl-grow{transform-box:fill-box;transition:transform 460ms ease-out}
.rl-in{animation:rlIn 520ms ease-out both}
@keyframes rlIn{from{opacity:0;transform:translateY(-18px)}to{opacity:1;transform:none}}
.rl-out{animation:rlOut 460ms ease-in forwards}
@keyframes rlOut{to{opacity:0;transform:translateY(14px)}}
.rl-grab{cursor:grab}
@media (prefers-reduced-motion:reduce){.rl-slide,.rl-grow{transition:none}.rl-in,.rl-out{animation:none}}
`;

/* ── drawing pieces ───────────────────────────────────────────────────────────────────── */

/* a number line from x0 to x1: nine small ticks, the two ends, and the halfway tick with a diamond */
function RLine({ x0, x1, y, small }: any) {
  const L = x1 - x0, t = small ? 0.75 : 1, mid = (x0 + x1) / 2, ext = small ? 18 : 30;
  return (
    <g>
      <line x1={x0 - ext} y1={y} x2={x1 + ext} y2={y} stroke={CONTENT.line} strokeWidth={small ? 4 : 6} strokeLinecap="round" />
      {Array.from({ length: 9 }).map((_, i) => (i === 4 ? null : (
        <line key={i} x1={x0 + (L * (i + 1)) / 10} y1={y - 12 * t} x2={x0 + (L * (i + 1)) / 10} y2={y + 12 * t} stroke={CONTENT.line} strokeWidth={small ? 2.5 : 3} />
      )))}
      <line x1={x0} y1={y - 28 * t} x2={x0} y2={y + 28 * t} stroke={CONTENT.line} strokeWidth={5} strokeLinecap="round" />
      <line x1={x1} y1={y - 28 * t} x2={x1} y2={y + 28 * t} stroke={CONTENT.line} strokeWidth={5} strokeLinecap="round" />
      <line x1={mid} y1={y - 40 * t} x2={mid} y2={y + 12 * t} stroke={CONTENT.line} strokeWidth={4} />
      <path d={diamond(mid, y - 40 * t, 11 * t)} fill={CONTENT.line} />
    </g>
  );
}

/* the child's number as a pin standing on the line, the number on its head (drawn at x = 0) */
const pinW = (v: number) => Math.max(150, estW(indian(v), T.speech) + 40);
function BigPin({ y, head, v, lift, C }: any) {
  const s = indian(v), w = pinW(v);
  return (
    <g>
      <rect x={-w / 2} y={head} width={w} height={64} rx={18} fill={tint(PIN, 0.82)} stroke={PIN} strokeWidth={4} filter={lift ? "url(#fLift)" : "url(#fShadowSoft)"} />
      <text x={0} y={head + 48} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{s}</text>
      <path d={`M -14 ${head + 64} L 14 ${head + 64} L 0 ${head + 84} Z`} fill={PIN} />
      <rect x={-3.5} y={head + 74} width={7} height={y - head - 80} fill={PIN} />
      <circle cx={0} cy={y} r={11} fill="url(#gBead)" stroke={PIN_EDGE} strokeWidth={2} />
    </g>
  );
}

/* a small pin for the three stacked lines (drawn at x = 0) */
function SmallPin({ y }: any) {
  return (
    <g>
      <rect x={-3} y={y - 34} width={6} height={28} fill={PIN} />
      <circle cx={0} cy={y - 42} r={12} fill="url(#gBead)" stroke={PIN_EDGE} strokeWidth={2} />
      <circle cx={0} cy={y} r={8} fill="url(#gBead)" stroke={PIN_EDGE} strokeWidth={2} />
    </g>
  );
}

/* an end plate: plain, lit (the only two places an answer can sit), picked (the pin is there),
   right (the answer, after the win) */
function Plate({ x, y, w, h, v, look, size, hidden, C }: any) {
  const up = look === "picked" || look === "right";
  const stroke = look === "right" || look === "lit" ? AMBER : look === "picked" ? PIN : C.rule;
  return (
    <g transform={up ? "translate(0,-5)" : undefined}>
      <rect x={x - w / 2} y={y} width={w} height={h} rx={14} fill={look === "right" ? tint(AMBER, 0.55) : "#FFFFFF"}
        stroke={stroke} strokeWidth={look === "plain" ? 2 : 4} strokeDasharray={hidden && look === "plain" ? "8 6" : undefined}
        filter={up ? "url(#fShadow)" : "url(#fShadowSoft)"} />
      <text x={x} y={y + h / 2 + size * 0.36} textAnchor="middle" fontSize={size} fontWeight={700} fill={C.ink}>{hidden ? "?" : indian(v)}</text>
    </g>
  );
}

/* the two distance bars from the number's own place out to each end; they fill outward from the
   foot of the pin and the shorter one turns amber (a tie goes up, like the halfway number) */
function Bars({ x0, x1, hx, y, h, step, dl, dr, labY, C }: any) {
  const rightShort = dr <= dl;
  const col = (isRight: boolean) => (step >= 3 && isRight === rightShort ? AMBER : BAR);
  const lw = Math.max(0, hx - x0), rw = Math.max(0, x1 - hx);
  return (
    <g>
      <rect x={x0} y={y} width={lw} height={h} rx={h / 2} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="8 6" />
      <rect x={hx} y={y} width={rw} height={h} rx={h / 2} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="8 6" />
      <rect className="rl-grow" x={x0} y={y} width={lw} height={h} rx={h / 2} fill={col(false)}
        style={{ transformOrigin: "right center", transform: `scaleX(${step >= 1 ? 1 : 0})` } as any} />
      <rect className="rl-grow" x={hx} y={y} width={rw} height={h} rx={h / 2} fill={col(true)}
        style={{ transformOrigin: "left center", transform: `scaleX(${step >= 2 ? 1 : 0})` } as any} />
      {labY !== null && step >= 3 && (
        <g>
          <text x={(x0 + hx) / 2} y={labY} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{indian(dl)}</text>
          <text x={(hx + x1) / 2} y={labY} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{indian(dr)}</text>
        </g>
      )}
    </g>
  );
}

/* the rule strip: the number in ruled place columns; mode 1 shades the rounding place amber, mode 2
   boxes the one digit next to it, mode 3 boxes everything to its right and reads it as one number */
function Strip({ v, place, y, mode, C, lang = "en", tx = (s: any) => s }: any) {
  const ds = digitsOf(v), d = ds.length, cw = STRIP.cw, R = STRIP.right, kp = placeK(place);
  const colX = (k: number) => R - (k + 1) * cw;
  const colC = (k: number) => colX(k) + cw / 2;
  const from = mode >= 3 ? 0 : kp - 1;
  return (
    <g>
      <rect x={colX(d - 1) - 12} y={y} width={d * cw + 24} height={STRIP.h} rx={18} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      {mode >= 1 && kp < d && <rect x={colX(kp) + 4} y={y + 6} width={cw - 8} height={STRIP.h - 12} rx={12} fill={tint(AMBER, 0.55)} />}
      <line x1={colX(d - 1)} y1={y + 42} x2={R} y2={y + 42} stroke={C.rule} strokeWidth={2} />
      {ds.map((dg, k) => (
        <g key={k}>
          <text x={colC(k)} y={y + 32} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(HEADS[k])}</text>
          <text x={colC(k)} y={y + 94} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={dg === 0 ? ZERO : inkOf(k)}>{dg}</text>
        </g>
      ))}
      {mode >= 2 && kp >= 1 && (
        <rect x={colX(kp - 1) + 4} y={y + 48} width={(kp - from) * cw - 8} height={STRIP.h - 54} rx={14} fill="none" stroke={AMBER} strokeWidth={5} />
      )}
      {mode >= 3 && (
        <g>
          <text x={STRIP.note} y={y + 44} fontSize={T.label} fontWeight={700} fill={AMBER_INK}>{wordsIn(v % place, lang)}</text>
          <text x={STRIP.note} y={y + 90} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(RULE_OF[place])}</text>
        </g>
      )}
    </g>
  );
}

/* the running count: the number being rounded, in its period inks, and the place it goes to */
function RunsBox({ v, place, C, tx = (s: any) => s }: any) {
  const s = indian(v), word = tx(PLACE_WORD[place] || ""), nearest = tx("nearest");
  const lab = Math.max(estW(nearest, T.micro), estW(word, T.micro));
  const room = 330 - 18 - 16 - lab - 14;
  const size = [T.xl, T.speech, T.prompt, T.label].find((z) => estW(s, z) <= room) || T.label;
  let k = s.replace(/,/g, "").length;
  const parts = s.split("").map((ch) => (ch === "," ? { ch, fill: C.ink } : { ch, fill: ch === "0" ? ZERO : inkOf(--k) }));
  return (
    <g data-zone="runs">
      <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
      <text x={18} y={-56 + size * 0.36} fontSize={size} fontWeight={700}>
        {parts.map((p, i) => <tspan key={i} fill={p.fill}>{p.ch}</tspan>)}
      </text>
      <text x={314} y={-62} textAnchor="end" fontSize={T.micro} fontWeight={500} fill={C.ink}>{nearest}</text>
      <text x={314} y={-30} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{word}</text>
    </g>
  );
}

/* ── the judgement bay's small pictures (content colours and ink; nothing is ever crossed out) ── */

function Clock({ x, y, r, hh, mm }: any) {
  const pt = (turn: number, len: number) => [x + Math.sin(turn * 2 * Math.PI) * len, y - Math.cos(turn * 2 * Math.PI) * len];
  const [mx, my] = pt(mm / 60, r * 0.76), [hx, hy] = pt(((hh % 12) + mm / 60) / 12, r * 0.5);
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#FFFFFF" stroke={CONTENT.line} strokeWidth={4} />
      {Array.from({ length: 12 }).map((_, i) => {
        const [a, b] = pt(i / 12, r * 0.78), [c, d] = pt(i / 12, r * 0.92);
        return <line key={i} x1={a} y1={b} x2={c} y2={d} stroke={CONTENT.line} strokeWidth={i % 3 ? 2 : 4} />;
      })}
      <line x1={x} y1={y} x2={hx} y2={hy} stroke={CONTENT.line} strokeWidth={6} strokeLinecap="round" />
      <line x1={x} y1={y} x2={mx} y2={my} stroke={CONTENT.line} strokeWidth={4} strokeLinecap="round" />
      <circle cx={x} cy={y} r={5} fill={CONTENT.line} />
    </g>
  );
}
function Bell({ x, y }: any) {
  return (
    <g>
      <path d={`M ${x - 30} ${y + 24} C ${x - 28} ${y - 4} ${x - 24} ${y - 30} ${x} ${y - 32} C ${x + 24} ${y - 30} ${x + 28} ${y - 4} ${x + 30} ${y + 24} L ${x + 36} ${y + 32} L ${x - 36} ${y + 32} Z`}
        fill="#FFFFFF" stroke={CONTENT.line} strokeWidth={4} strokeLinejoin="round" />
      <circle cx={x} cy={y + 40} r={7} fill={CONTENT.line} />
      <path d={`M ${x - 46} ${y - 18} q -8 13 0 26 M ${x + 46} ${y - 18} q 8 13 0 26`} fill="none" stroke={CONTENT.line} strokeWidth={3} strokeLinecap="round" />
    </g>
  );
}
function Gate({ x, y, shut }: any) {
  return (
    <g stroke={CONTENT.line} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round">
      <rect x={x - 48} y={y - 38} width={12} height={78} rx={3} fill="#FFFFFF" />
      <rect x={x + 36} y={y - 38} width={12} height={78} rx={3} fill="#FFFFFF" />
      {shut ? (
        <g fill="none">
          <line x1={x - 36} y1={y - 26} x2={x + 36} y2={y - 26} />
          <line x1={x - 36} y1={y + 30} x2={x + 36} y2={y + 30} />
          {[-24, -8, 8, 24].map((dx) => <line key={dx} x1={x + dx} y1={y - 26} x2={x + dx} y2={y + 30} />)}
        </g>
      ) : (
        <path d={`M ${x - 36} ${y - 26} L ${x - 8} ${y - 10} L ${x - 8} ${y + 40} L ${x - 36} ${y + 30} Z`} fill="none" />
      )}
    </g>
  );
}
function Kid({ x, y, s = 1 }: any) {
  return (
    <g>
      <circle cx={x} cy={y - 30 * s} r={11 * s} fill="url(#gHundred)" />
      <path d={`M ${x - 14 * s} ${y + 6 * s} Q ${x - 14 * s} ${y - 16 * s} ${x} ${y - 16 * s} Q ${x + 14 * s} ${y - 16 * s} ${x + 14 * s} ${y + 6 * s} Z`} fill="url(#gHundred)" />
      <path d={`M ${x - 7 * s} ${y + 6 * s} L ${x - 9 * s} ${y + 30 * s} M ${x + 7 * s} ${y + 6 * s} L ${x + 9 * s} ${y + 30 * s}`} stroke={shade(CONTENT.hundred, 0.2)} strokeWidth={5 * s} strokeLinecap="round" />
    </g>
  );
}
/* a bone standing upright, h tall */
function VBone({ x, y, h, fill }: any) {
  const st = { stroke: CONTENT.line, strokeWidth: 1.5 };
  return (
    <g>
      <circle cx={x - 2.2} cy={y + 3} r={2.8} fill={fill} {...st} />
      <circle cx={x + 2.2} cy={y + 3} r={2.8} fill={fill} {...st} />
      <circle cx={x - 2.2} cy={y + h - 3} r={2.8} fill={fill} {...st} />
      <circle cx={x + 2.2} cy={y + h - 3} r={2.8} fill={fill} {...st} />
      <rect x={x - 2} y={y + 3} width={4} height={h - 6} fill={fill} {...st} />
    </g>
  );
}
/* the tens of a count stand in groups of five, so the row can be counted along in tens */
const tenX = (t: number) => 110 + t * 12 + Math.floor(t / 5) * 10;
/* a big bone lying flat: four knobs outlined, then filled again so only the outer outline shows */
function BigBone({ x, y }: any) {
  const L = 42, r = 14, knobs = [[-L, -10], [-L, 10], [L, -10], [L, 10]];
  return (
    <g>
      {knobs.map(([dx, dy], i) => <circle key={"o" + i} cx={x + dx} cy={y + dy} r={r} fill="#FFFFFF" stroke={CONTENT.line} strokeWidth={4} />)}
      {knobs.map(([dx, dy], i) => <circle key={"f" + i} cx={x + dx} cy={y + dy} r={r - 2} fill="#FFFFFF" />)}
      <rect x={x - L} y={y - 10} width={2 * L} height={20} fill="#FFFFFF" />
      <line x1={x - L + 10} y1={y - 10} x2={x + L - 10} y2={y - 10} stroke={CONTENT.line} strokeWidth={4} />
      <line x1={x - L + 10} y1={y + 10} x2={x + L - 10} y2={y + 10} stroke={CONTENT.line} strokeWidth={4} />
    </g>
  );
}
function Icon({ q, x, y, hh, mm }: any) {
  if (q.icon === "clock") return <Clock x={x} y={y} r={50} hh={hh} mm={mm} />;
  if (q.icon === "bone") return <BigBone x={x} y={y} />;
  return <g><Kid x={x - 34} y={y + 6} /><Kid x={x} y={y - 2} /><Kid x={x + 34} y={y + 6} /></g>;
}

/* what a choice would mean, drawn inside an argument card: k pieces of it so far (1 to 3) */
function Scene({ q, side, k, x, y, C, tx = (s: any) => s }: any) {
  const yes = side === "yes";
  if (q.icon === "clock") {
    const F: any[] = yes
      ? [["bell", tx("bell") + " " + q.show], ["gate", tx("gate shuts")], ["kid", tx("you") + " " + q.rounded]]
      : [["kid", tx("you") + " " + q.show], ["bell", tx("bell") + " " + q.show], ["open", tx("gate open")]];
    return (
      <g transform={`translate(${x},${y})`}>
        {F.slice(0, k).map(([d, lab]: any, i: number) => {
          const fx = 91 + i * 170;
          return (
            <g key={i}>
              <g className="rl-in">
                {d === "bell" ? <Bell x={fx} y={46} /> : d === "kid" ? <Kid x={fx} y={56} s={1.3} /> : <Gate x={fx} y={50} shut={d === "gate"} />}
              </g>
              <text x={fx} y={130} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={yes && i === 2 ? AMBER_INK : C.ink}>{lab}</text>
            </g>
          );
        })}
        {k >= 3 && <text x={261} y={178} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={yes ? AMBER_INK : C.ink}>{tx(yes ? q.late : "on time")}</text>}
      </g>
    );
  }
  if (q.icon === "bone") {
    const count = Number(q.show), low = Number(q.rounded), extra = count % 10;
    const rows = yes ? [count, low] : [count];
    return (
      <g transform={`translate(${x},${y})`}>
        {rows.slice(0, k).map((c, r) => {
          const ry = 32 + r * 68, tens = Math.floor(c / 10), bx = tenX(Math.max(0, tens - 1)) + 26;
          return (
            <g key={r} className="rl-in">
              <text x={26} y={ry + 34} fontSize={T.label} fontWeight={700} fill={C.ink}>{c}</text>
              {Array.from({ length: tens }).map((_, t) => <VBone key={t} x={tenX(t)} y={ry} h={42} fill="#FFFFFF" />)}
              {Array.from({ length: extra }).map((_, t) => (c % 10
                ? <VBone key={"e" + t} x={bx + t * 14} y={ry + 14} h={28} fill={AMBER} />
                : <rect key={"e" + t} x={bx + t * 14 - 5} y={ry + 14} width={10} height={28} rx={4} fill="none" stroke={AMBER} strokeWidth={2} strokeDasharray="4 3" />))}
            </g>
          );
        })}
        {/* the key, so a row reads as tens and ones (206, not 26) */}
        <text className="rl-in" x={110} y={20} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("tall bone = 10")}</text>
        {k >= 3 && <text x={26} y={180} fontSize={T.label} fontWeight={700} fill={yes ? AMBER_INK : C.ink}>{tx(yes ? q.lost : "an exact count")}</text>}
      </g>
    );
  }
  return (
    <g transform={`translate(${x},${y})`}>
      {yes ? (
        <g className="rl-in">
          <rect x={26} y={0} width={330} height={118} rx={12} fill="#FFFFFF" stroke={CONTENT.line} strokeWidth={3} />
          <circle cx={191} cy={4} r={7} fill={CONTENT.line} />
          <text x={191} y={50} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("about") + " " + q.rounded}</text>
          {k >= 2 && Array.from({ length: 8 }).map((_, i) => <Kid key={i} x={78 + i * 32} y={90} s={0.55} />)}
        </g>
      ) : (
        <g className="rl-in">
          <text x={26} y={52} fontSize={T.xl} fontWeight={700} fill={C.ink}>{q.show}</text>
          {k >= 2 && Array.from({ length: 8 }).map((_, i) => <Kid key={i} x={48 + i * 32} y={98} s={0.55} />)}
        </g>
      )}
      {k >= 3 && <text x={26} y={178} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(yes ? "just how many" : "exact, not needed")}</text>}
    </g>
  );
}

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────── */

/* fix: the correction after a miss has ended on the right answer · reveal: hidden ends shown */
const FRESH = { pin: null, strip: 0, bars: 0, half: false, lit: false, ghost: null, won: false, top: false, plumb: false, fold: 0, touched: false, flip: false, missK: 0, fix: false, reveal: false };
const FREE0 = { view: "line", n: FREE_NUMBERS[0], place: 100, lo: lowOf(FREE_NUMBERS[0], 100), pick: 0, bay: 0, side: null, flip: false };

function Work({ phase, item, index, stage, wrong, typed, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const busy = tl.busy;
  const free = stage === "free";
  /* one state object per item: a render that meets a new item draws it fresh, never the old pin */
  const [raw, setRaw] = useState<any>({ ...FRESH, at: index });
  const idxRef = useRef(index);
  idxRef.current = index;
  const s = raw.at === index ? raw : { ...FRESH, at: index };
  const putFor = (at: number) => (patch: any) => setRaw((r: any) => (at !== idxRef.current ? r : { ...(r.at === at ? r : FRESH), ...patch, at }));
  const put = putFor(index);
  const [F, setF] = useState<any>(FREE0);
  const setupFor = useRef(0);

  useEffect(() => {
    if (stage === "ask" && setupFor.current !== index) { setupFor.current = index; tl.stop(); api.lock(false); }
  }, [stage, index]);

  /* free play (the plan's freePlay): any number, any place, the judgement bay open; nothing to get right */
  useEffect(() => {
    if (!free) return;
    setupFor.current = -2;
    tl.stop();
    setF(FREE0);
  }, [free]);

  const kind = free ? (F.view === "bay" ? "freebay" : "freeline") : item.kind;
  const lined = kind === "round" || kind === "stack";
  const pinLive = !free && lined && stage === "ask" && !busy;

  /* the line the child acts on (the only line in phases 1-2, the bottom line in phase 3) */
  let A: any = null;
  if (!free && lined) {
    const G = kind === "stack" ? { x0: STACK.x0, x1: STACK.x1 } : ONE(false);
    const lo = lowOf(item.n, item.place), hi = lo + item.place;
    const xOf = (v: number) => G.x0 + ((v - lo) / item.place) * (G.x1 - G.x0);
    A = { x0: G.x0, x1: G.x1, lo, hi, xOf, homeX: xOf(item.n), pinX: s.pin === null ? xOf(item.n) : xOf(s.pin) };
  }

  /* the third item of phases 1-3 hides the two ends ("?") until the win or the correction after a miss:
     the child works out the two nearest multiples and types the answer */
  const hiddenNow = !free && !!item.hide && !s.won && !s.fix && !s.reveal;
  /* the pin slides to an end; a shown end is written into the slot, a hidden one never is */
  const choose = (v: number) => { put({ pin: v, touched: true }); if (!hiddenNow) api.setTyped(String(v)); api.sfx.tick(); };
  /* a tap on the pin puts it where it belongs: back on the number's own place */
  const goHome = () => {
    if (s.pin === null) return;
    if (String(typed) === String(s.pin)) api.setTyped("");
    put({ pin: null, touched: true });
    api.sfx.tick();
  };
  const freeAt = (x: number, f: any) => {
    const G = ONE(true);
    return f.lo + Math.round(clampX((x - G.x0) / (G.x1 - G.x0), 0, 1) * f.place);
  };

  const drag = useDrag((payload: any, p: any, moved: boolean) => {
    if (payload.src === "free") { if (moved && isFinite(p.x)) { setF((f: any) => ({ ...f, n: freeAt(p.x, f) })); api.sfx.tick(); } return; }
    if (!pinLive || !A) return;
    if (!moved || !isFinite(p.x)) { goHome(); return; }
    if (Math.abs(p.x - A.homeX) < 24) { goHome(); return; }
    choose(p.x < A.pinX ? A.lo : A.hi); /* it slides all the way to the end it was pushed towards */
  });
  const dd = drag.drag && drag.drag.moved ? drag.drag : null;
  const dragPin = !!(dd && dd.payload.src === "pin");
  const dragFree = !!(dd && dd.payload.src === "free");
  const nFree = dragFree ? freeAt(dd.x, F) : F.n;

  api.onEnter(null);
  HOOK.pick = (v: any) => {
    const x = leadNumber(v);
    if (!A || stage !== "ask" || busy || (x !== A.lo && x !== A.hi)) return false;
    choose(x as number);
    return !hiddenNow; /* nothing was written on hidden ends: the agent types the answer */
  };

  /* ── win motions: the pin lands on the nearer end and the rule strip agrees ── */
  useEffect(() => {
    if (stage !== "win" || free) return;
    const P = put;
    if (item.kind === "round") {
      tl.run([[60, () => P({ pin: item.answer, lit: false, ghost: null })], [520, () => P({ strip: 1 })], [520, () => P({ strip: 3, half: true })],
        [420, () => P({ bars: 2 })], [420, () => P({ bars: 3, won: true })]]);
    } else if (item.kind === "stack" && item.earlier) {
      /* the delight: the three lines fold into the widest one and the answers come down as ticks */
      tl.run([[60, () => P({ pin: item.answer, plumb: false })], [600, () => P({ won: true })], [800, () => P({ fold: 1, pin: null })],
        [900, () => P({ fold: 2 })], [900, () => P({ fold: 3 })]]);
    } else if (item.kind === "stack") {
      tl.run([[60, () => P({ pin: item.answer, plumb: false })], [500, () => P({ strip: 1 })], [500, () => P({ strip: 3, half: true })],
        [400, () => P({ bars: 2 })], [400, () => P({ bars: 3 })], [400, () => P({ won: true, top: true })]]);
    } else if (item.kind === "judge") {
      tl.run([[60, () => P({ won: true })]]);
    }
  }, [stage]);

  /* ── the traceback: the mathematics redrawn in steps; nothing marked, the child's answer stays ── */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    api.lock(true);
    const P = put, done = () => api.lock(false);
    if (item.kind === "round") {
      const v = leadNumber(wrong.value), p = item.place, lo = lowOf(item.n, p), hi = lo + p;
      const S: any[] = [[80, () => P({ strip: 0, bars: 0, half: false, lit: false, ghost: null, fix: false, reveal: true })]];
      /* an answer that is not a multiple of the place gets its own marker: it lands between the ends and
         the two ends light as the only places an answer can sit. Only when its lower digits rolling to
         zero lands it on the right end (the digit left as it was) does it roll and slide there; otherwise
         it fades, so no wrong value ever settles on a plate */
      if (v !== null && v % p !== 0 && v > lo && v < hi + p) {
        S.push([60, () => P({ ghost: { v, rolled: false, at: v } })], [900, () => P({ lit: true })]);
        if (lowOf(v, p) === item.answer) {
          S.push([900, () => P({ ghost: { v, rolled: true, at: v } })], [800, () => P({ ghost: { v, rolled: true, at: lowOf(v, p) } })], [900, () => P({ ghost: null })]);
        } else {
          S.push([700, () => P({ ghost: { v, rolled: false, at: v, fade: true } })], [500, () => P({ ghost: null })]);
        }
      }
      S.push([500, () => P({ strip: 1 })]);
      if (p >= 100) S.push([800, () => P({ strip: 2 })]); /* one digit first, then the box opens to hold both */
      S.push([900, () => P({ strip: 3 })], [700, () => P({ half: true })], [500, () => P({ bars: 1 })], [600, () => P({ bars: 2 })], [700, () => P({ bars: 3, lit: false })]);
      /* the correction ends on the whole right answer: the pin slides onto the nearer end, which lights */
      S.push([800, () => P({ pin: item.answer, fix: true })], [500, () => {}]);
      tl.run(S, done);
    } else if (item.kind === "stack") {
      tl.run([[80, () => P({ strip: 0, bars: 0, half: false, plumb: false, fix: false, reveal: true })], [500, () => P({ strip: 1 })], [800, () => P({ strip: 2 })], [900, () => P({ strip: 3 })],
        [600, () => P({ half: true })], [500, () => P({ bars: 1 })], [600, () => P({ bars: 2 })], [700, () => P({ bars: 3 })], [800, () => P({ plumb: true })],
        [800, () => P({ pin: item.answer, fix: true, top: true })], [500, () => {}]], done);
    } else if (item.kind === "judge") {
      /* what rounding would mean, then the right card rises with its reason */
      tl.run([[80, () => P({ flip: true, missK: 0, fix: false })], [800, () => P({ missK: 1 })], [900, () => P({ missK: 2 })], [900, () => P({ missK: 3 })],
        [900, () => P({ fix: true })], [500, () => {}]], done);
    } else done();
  }, [wrong]);

  /* ── what the host and the agent read back (toolApi.getState) ── */
  if (free) {
    const lo = F.lo, hi = lo + F.place;
    api.share(F.view === "bay"
      ? { kind: "free", view: "bay", value: null, quantity: PHASES[3].items[F.bay].show, judgement: null, complete: false }
      : { kind: "free", view: "line", value: nFree, place: F.place, candidates: [lo, hi], halfway: lo + F.place / 2, rounded: nFree - lo >= F.place / 2 ? hi : lo, judgement: null, complete: false });
  } else if (item.kind === "judge") {
    api.share({ kind: "judge", value: null, quantity: item.show, whenRounded: item.rounded, rounded: s.flip ? item.rounded : null, judgement: s.won ? item.answer : null, complete: stage === "idle" });
  } else if (A) {
    /* hidden ends stay hidden from getState too */
    api.share({ kind: item.kind, value: item.n, place: item.place, candidates: hiddenNow ? null : [A.lo, A.hi], halfway: hiddenNow ? null : A.lo + item.place / 2,
      rounded: hiddenNow ? null : s.pin, judgement: null, complete: stage === "idle" });
  }

  /* ── one line (phases 1-2, free play) ── */
  const renderOne = () => {
    const G = ONE(free);
    const place = free ? F.place : item.place;
    const v0 = free ? nFree : item.n;
    const lo = free ? F.lo : lowOf(v0, place), hi = lo + place;
    const xOf = (v: number) => G.x0 + ((v - lo) / place) * (G.x1 - G.x0);
    const homeX = xOf(v0);
    const px = free ? homeX : dragPin ? clampX(dd.x, G.x0, G.x1) : s.pin === null ? homeX : xOf(s.pin);
    const near = v0 - lo >= place / 2 ? hi : lo;
    const live = free || pinLive;
    const pay = free ? FREE_PAY : PIN_PAY;
    const hw = Math.max(62, pinW(v0) / 2);
    const lookOf = (v: number) => (free ? (v === near ? "right" : "plain")
      : (s.won || s.fix) && v === item.answer ? "right" : s.pin === v ? "picked" : s.lit ? "lit" : "plain");
    const g = s.ghost;
    let ghost: any = null;
    if (!free && g) {
      const str = indian(g.rolled ? lowOf(g.v, place) : g.v), kz = placeK(place);
      let dcount = str.replace(/,/g, "").length;
      /* once rolled, the places below the rounding place read as grey zeros */
      const parts = str.split("").map((ch) => {
        if (ch === ",") return { ch, fill: C.ink };
        dcount--;
        return { ch, fill: g.rolled && dcount < kz ? ZERO : C.ink };
      });
      const gw = estW(str, T.label) + 32;
      const gx = clampX(xOf(g.at), G.x0 - 20, 1086 - gw / 2 - 6);
      ghost = (
        <g className="rl-slide" style={{ transform: `translate(${gx}px,0px)` } as any}>
          <g className={g.fade ? "rl-out" : "rl-in"}>
            <path d={`M -10 ${G.y + 30} L 10 ${G.y + 30} L 0 ${G.y + 14} Z`} fill={AMBER} />
            <rect x={-gw / 2} y={G.y + 30} width={gw} height={44} rx={12} fill="#FFFFFF" stroke={AMBER} strokeWidth={4} />
            <text x={0} y={G.y + 63} textAnchor="middle" fontSize={T.label} fontWeight={700}>
              {parts.map((q: any, i: number) => <tspan key={i} fill={q.fill}>{q.ch}</tspan>)}
            </text>
          </g>
        </g>
      );
    }
    return (
      <g>
        <RLine x0={G.x0} x1={G.x1} y={G.y} />
        <Bars x0={G.x0} x1={G.x1} hx={homeX} y={G.bar} h={20} step={free ? 3 : s.bars} dl={v0 - lo} dr={hi - v0} labY={G.lab} C={C} />
        {(free || s.half) && (
          <text x={(G.x0 + G.x1) / 2} y={G.plate + 42} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("halfway") + " " + indian(lo + place / 2)}</text>
        )}
        {[lo, hi].map((v, i) => {
          const x = i ? G.x1 : G.x0;
          return (
            <g key={i}>
              <Plate x={x} y={G.plate} w={210} h={64} v={v} look={lookOf(v)} size={T.speech} hidden={hiddenNow} C={C} />
              {pinLive && <Hit id={i ? "end-high" : "end-low"} label={hiddenNow ? "Slide the pin to the " + (i ? "right" : "left") + " end" : "Put the pin on " + indian(v)}
                x={x - 110} y={G.plate - 10} w={220} h={84} onPress={() => choose(v)} />}
            </g>
          );
        })}
        {!free && s.pin !== null && <circle cx={homeX} cy={G.y} r={11} fill="#FFFFFF" stroke={PIN} strokeWidth={3} />}
        {ghost}
        <g className={(dragPin || dragFree ? "" : "rl-slide") + (live ? " rl-grab c4-piece" : "")} style={{ transform: `translate(${px}px,0px)` } as any}
          {...(live ? { ...control(free ? "number-pin" : "pin", free ? "Slide the number along the line" : "Slide the pin to an end"), ...drag.bind(pay), ...drag.keys(pay) } : {})}>
          <BigPin y={G.y} head={G.head} v={v0} lift={dragPin || dragFree} C={C} />
          <rect x={-hw} y={G.head - 8} width={2 * hw} height={G.y + 14 - (G.head - 8)} fill="transparent" />
        </g>
        <Strip v={v0} place={place} y={G.strip} mode={free ? 3 : s.strip} C={C} lang={lang} tx={tx} />
      </g>
    );
  };

  /* ── three lines, one number (phase 3) ── */
  const renderStack = () => {
    const G = STACK, v0 = item.n;
    const bands = G.places.map((p: number, b: number) => {
      const lo = lowOf(v0, p);
      return { p, b, lo, hi: lo + p, y: G.ys[b], xOf: (v: number) => G.x0 + ((v - lo) / p) * (G.x1 - G.x0) };
    });
    const B = bands[2];
    const px = dragPin ? clampX(dd.x, G.x0, G.x1) : A.pinX;
    const topShown = item.earlier || s.top;
    const lookOf = (v: number) => ((s.won || s.fix) && v === item.answer ? "right" : s.pin === v ? "picked" : "plain");
    const ticks = s.fold >= 3 ? [nearOf(v0, 10), nearOf(v0, 100)].sort((a, b) => a - b) : [];
    return (
      <g>
        {bands.map((bd: any) => {
          const last = bd.b === 2;
          const pinX = s.fold >= 1 ? B.xOf(v0) : bd.xOf(v0);
          const dy = s.fold >= 2 ? B.y - bd.y : 0;
          const ans = last ? (s.won || s.fix ? item.answer : null) : topShown ? nearOf(v0, bd.p) : null;
          return (
            <g key={bd.b}>
              <text x={0} y={bd.y + 11} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(PLACE_WORD[bd.p])}</text>
              {!last && s.fold < 3 && (
                <g className="rl-slide" style={{ transform: `translate(0px,${dy}px)` } as any}>
                  <RLine x0={G.x0} x1={G.x1} y={bd.y} small />
                  {[bd.lo, bd.hi].map((v: number, i: number) => (
                    <text key={i} x={i ? G.x1 : G.x0} y={bd.y + 44} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{indian(v)}</text>
                  ))}
                  <g className="rl-slide" style={{ transform: `translate(${pinX}px,0px)` } as any}><SmallPin y={bd.y} /></g>
                </g>
              )}
              {last && (
                <g>
                  <RLine x0={G.x0} x1={G.x1} y={bd.y} small />
                  {s.bars > 0 && <Bars x0={G.x0} x1={G.x1} hx={bd.xOf(v0)} y={bd.y + 8} h={12} step={s.bars} dl={v0 - bd.lo} dr={bd.hi - v0} labY={null} C={C} />}
                  {s.half && <text x={(G.x0 + G.x1) / 2} y={bd.y + 58} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("halfway") + " " + indian(bd.lo + bd.p / 2)}</text>}
                  {[bd.lo, bd.hi].map((v: number, i: number) => {
                    const x = i ? G.x1 : G.x0;
                    return (
                      <g key={i}>
                        <Plate x={x} y={bd.y + 26} w={150} h={44} v={v} look={lookOf(v)} size={T.micro} hidden={hiddenNow} C={C} />
                        {pinLive && <Hit id={i ? "end-high" : "end-low"} label={hiddenNow ? "Slide the pin to the " + (i ? "right" : "left") + " end" : "Put the pin on " + indian(v)}
                          x={x - 85} y={bd.y + 18} w={170} h={78} onPress={() => choose(v)} />}
                      </g>
                    );
                  })}
                  {s.pin !== null && <circle cx={bd.xOf(v0)} cy={bd.y} r={8} fill="#FFFFFF" stroke={PIN} strokeWidth={3} />}
                  <g className={(dragPin ? "" : "rl-slide") + (pinLive ? " rl-grab c4-piece" : "")} style={{ transform: `translate(${px}px,0px)` } as any}
                    {...(pinLive ? { ...control("pin", "Slide the pin to an end"), ...drag.bind(PIN_PAY), ...drag.keys(PIN_PAY) } : {})}>
                    <SmallPin y={bd.y} />
                    <rect x={-40} y={bd.y - 60} width={80} height={72} fill="transparent" />
                  </g>
                </g>
              )}
              {/* the answer this line gives, in a column at the right; none of them is ever crossed out */}
              <rect x={G.ans} y={bd.y - 30} width={182} height={52} rx={14} fill={last && ans !== null ? tint(AMBER, 0.55) : "#FFFFFF"}
                stroke={last && ans !== null ? AMBER : C.rule} strokeWidth={last && ans !== null ? 4 : 2} strokeDasharray={ans === null ? "8 6" : undefined} />
              {ans !== null && <text x={G.ans + 91} y={bd.y + 8} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{indian(ans)}</text>}
            </g>
          );
        })}
        {s.plumb && [0, 1].map((b) => (
          <line key={b} x1={bands[b].xOf(v0)} y1={bands[b].y + 8} x2={bands[b + 1].xOf(v0)} y2={bands[b + 1].y - 56}
            stroke={PIN} strokeWidth={3} strokeDasharray="6 6" strokeLinecap="round" />
        ))}
        {ticks.length > 0 && (
          <g className="rl-in">
            {ticks.map((t, i) => <line key={i} x1={B.xOf(t)} y1={B.y - 20} x2={B.xOf(t)} y2={B.y + 20} stroke={AMBER} strokeWidth={5} strokeLinecap="round" />)}
            {ticks[0] === ticks[1]
              ? <text x={B.xOf(ticks[0])} y={B.y - 58} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{indian(ticks[0])}</text>
              : ticks.map((t, i) => (
                <text key={"l" + i} x={B.xOf(t) + (i ? 10 : -10)} y={B.y - 58} textAnchor={i ? "start" : "end"} fontSize={T.micro} fontWeight={700} fill={C.ink}>{indian(t)}</text>
              ))}
          </g>
        )}
        <Strip v={v0} place={1000} y={G.strip} mode={s.strip} C={C} lang={lang} tx={tx} />
      </g>
    );
  };

  /* ── the judgement bay (phase 4, and free play) ── */
  const renderBay = (q: any) => {
    const top = free ? 88 : 0, qh = free ? 120 : 150;
    const cy = top + qh + 16, ch = 524 - cy;
    /* a tap on the quantity card deals it into the two cards: rounded on one, exact on the other */
    const dealt = free ? F.flip : s.flip;
    const dealLive = free || (stage === "ask" && !busy && !s.flip);
    const hm = q.icon === "clock" ? q.show.split(":").map(Number) : [0, 0];
    const sceneK = (side: string) => (free ? (F.side === side ? 3 : 0)
      : (s.won || s.fix) && item.answer === side ? 3 : side === "yes" ? s.missK : 0);
    /* the right card rises with its reason at the win, and at the end of the correction after a miss */
    const raised = (side: string) => !free && (s.won || s.fix) && item.answer === side;
    const deal = () => {
      if (free) setF((f: any) => ({ ...f, flip: !f.flip }));
      else put({ flip: true, touched: true });
      api.sfx.tick();
    };
    return (
      <g>
        <g>
          <rect x={0} y={top} width={1086} height={qh} rx={22} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />
          <Icon q={q} x={84} y={top + qh / 2} hh={hm[0]} mm={hm[1]} />
          <text x={168} y={top + qh / 2 + 26} fontSize={T.display} fontWeight={700} fill={C.ink}>{q.show}</text>
          <text x={430} y={top + qh / 2 + 12} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(q.what)}</text>
          {dealLive && <Hit id="deal" label={free && dealt ? "Take the two versions back" : "Show it rounded and exact"} x={0} y={top} w={1086} h={qh} onPress={deal} />}
        </g>
        {[{ side: "yes", x: 0, title: "Round it" }, { side: "no", x: 564, title: "Keep it" }].map((c) => {
          const up = raised(c.side), k = sceneK(c.side);
          return (
            <g key={c.side} transform={up ? "translate(0,-6)" : undefined}>
              <rect x={c.x} y={cy} width={522} height={ch} rx={22} fill="#FFFFFF" stroke={up ? AMBER : C.rule} strokeWidth={up ? 5 : 2} filter={up ? "url(#fShadow)" : "url(#fShadowSoft)"} />
              <line x1={c.x + 20} y1={cy + 68} x2={c.x + 502} y2={cy + 68} stroke={C.rule} strokeWidth={2} />
              <text x={c.x + 26} y={cy + 46} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(c.title)}</text>
              {dealt && (
                <text key={"v" + c.side} className="rl-in" x={c.x + 496} y={cy + 51} textAnchor="end" fontSize={T.speech} fontWeight={700}
                  fill={c.side === "yes" ? AMBER_INK : C.ink}>{c.side === "yes" ? q.rounded : q.show}</text>
              )}
              {k > 0 && <Scene q={q} side={c.side} k={k} x={c.x} y={cy + 76 + Math.max(0, (ch - 76 - 184) / 2)} C={C} tx={tx} />}
              {free && <Hit id={"card-" + c.side} label={"What if we " + c.title.toLowerCase()} x={c.x} y={cy} w={522} h={ch}
                onPress={() => { setF((f: any) => ({ ...f, side: c.side })); api.sfx.tick(); }} />}
            </g>
          );
        })}
      </g>
    );
  };

  /* ── free play's own keys ── */
  const freeKeys = () => (F.view === "bay" ? (
    <g>
      <Key id="free-line" label={tx("Back to the number line")} x={0} y={0} w={250} h={72} C={C} onClick={() => setF((f: any) => ({ ...f, view: "line", side: null, flip: false }))}>
        <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("Number line")}</text>
      </Key>
      <Key id="free-next" label={tx("Another quantity")} x={266} y={0} w={200} h={72} C={C} onClick={() => setF((f: any) => ({ ...f, bay: (f.bay + 1) % 3, side: null, flip: false }))}>
        <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("Next one")}</text>
      </Key>
    </g>
  ) : (
    <g>
      {[{ p: 10, x: 0, w: 150 }, { p: 100, x: 164, w: 180 }, { p: 1000, x: 358, w: 196 }].map((k) => (
        <Key key={k.p} id={"place-" + k.p} label={tx("Round to the nearest " + PLACE_WORD[k.p])} x={k.x} y={0} w={k.w} h={72} C={C} primary={F.place === k.p}
          onClick={() => setF((f: any) => ({ ...f, place: k.p, lo: lowOf(f.n, k.p) }))}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={F.place === k.p ? "#FFFFFF" : C.ink}>{tx(PLACE_WORD[k.p])}</text>
        </Key>
      ))}
      <Key id="free-new" label={tx("A new number")} x={574} y={0} w={236} h={72} C={C}
        onClick={() => setF((f: any) => { const pick = (f.pick + 1) % FREE_NUMBERS.length, v = FREE_NUMBERS[pick]; return { ...f, pick, n: v, lo: lowOf(v, f.place) }; })}>
        <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("New number")}</text>
      </Key>
      <Key id="free-bay" label={tx("Round it or keep it")} x={826} y={0} w={260} h={72} C={C} onClick={() => setF((f: any) => ({ ...f, view: "bay", side: null, flip: false }))}>
        <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("Round or keep")}</text>
      </Key>
    </g>
  ));

  const body = kind === "judge" ? renderBay(item) : kind === "freebay" ? renderBay(PHASES[3].items[F.bay]) : kind === "stack" ? renderStack() : renderOne();
  const runs = kind === "freeline" ? <RunsBox v={nFree} place={F.place} C={C} tx={tx} /> : lined ? <RunsBox v={item.n} place={item.place} C={C} tx={tx} /> : null;

  /* the one invite: the pin (or the quantity card in the bay) on the first question, until it is touched */
  const first = stage === "ask" && index === 0 && !s.touched && !busy && !wrong && !dd;
  const invite = !first ? null
    : kind === "round" ? { x: A.pinX, y: ONE(false).y - 36, r: 46 }
      : kind === "stack" ? { x: A.pinX, y: STACK.ys[2] - 42, r: 44 }
        : kind === "judge" ? { x: 84, y: 75, r: 62 } : null;

  return (
    <g>
      <style>{RL_CSS}</style>
      {runs}
      {body}
      {free && freeKeys()}
      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ result, C, w, h, tx = (v: any) => v }: any) {
  const L = (result && result.last) || {}, sh = L.shared || {};
  if (sh.kind === "judge") {
    /* the quantity (and what it became, if the child rounded it), and the choice under it */
    const keep = String(L.value) === "no";
    return (
      <g>
        <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
        {keep ? (
          <text x={w / 2} y={36} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{sh.quantity}</text>
        ) : (
          <g>
            <text x={16} y={36} fontSize={T.micro} fontWeight={700} fill={C.ink}>{sh.quantity}</text>
            <path d={`M ${w / 2 - 14} 26 H ${w / 2 + 12} M ${w / 2 + 4} 19 L ${w / 2 + 13} 26 L ${w / 2 + 4} 33`} fill="none" stroke={CONTENT.line} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
            <text x={w - 16} y={36} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={AMBER_INK}>{sh.whenRounded}</text>
          </g>
        )}
        <text x={w / 2} y={70} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={keep ? C.ink : AMBER_INK}>{tx(keep ? "Keep it" : "Round it")}</text>
      </g>
    );
  }
  const v = leadNumber(L.value);
  if (v === null || typeof sh.value !== "number" || !sh.place) return null;
  const c = sh.candidates || [lowOf(sh.value, sh.place), lowOf(sh.value, sh.place) + sh.place];
  const x0 = 22, x1 = w - 22, y = h - 20;
  const xOf = (t: number) => x0 + ((t - c[0]) / (c[1] - c[0])) * (x1 - x0);
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <text x={w / 2} y={34} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{indian(v)}</text>
      <line x1={x0} y1={y} x2={x1} y2={y} stroke={CONTENT.line} strokeWidth={3} strokeLinecap="round" />
      <line x1={x0} y1={y - 9} x2={x0} y2={y + 9} stroke={CONTENT.line} strokeWidth={3} />
      <line x1={x1} y1={y - 9} x2={x1} y2={y + 9} stroke={CONTENT.line} strokeWidth={3} />
      <circle cx={xOf(v)} cy={y} r={9} fill={AMBER} stroke={shade(AMBER, 0.3)} strokeWidth={2} />
      <circle cx={xOf(sh.value)} cy={y} r={6} fill={PIN} stroke={PIN_EDGE} strokeWidth={1.5} />
    </g>
  );
}

function RoundingLine(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null }} />
  );
}

export default RoundingLine;
