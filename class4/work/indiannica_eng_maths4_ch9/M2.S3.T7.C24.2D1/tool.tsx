/* ═══ M2.S3.T7.C24.2D1 · fold_and_mirror · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md. */

const TOOL_ID = "fold_and_mirror";
const MEDIA_ID = "M2.S3.T7.C24.2D1";
const TOOL_NAME = "Fold and Mirror";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A paper shape and a fold line across it. Will the two halves fit?"];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every fold tested, every image placed at its distance, and the mirror named for every letter.";
/* said when the child opens Free play from the summary page */
const FREE_LINE = "Free play. Any shape, any fold, as often as you like.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r21: `lineFor(line, lang, TR)`); the English
   everywhere else stays what the checks read. NCERT class 4 geometry: सममिति / સમમિતિ, सममिति रेखा /
   સમમિતિ રેખા, दर्पण / અરીસો, प्रतिबिंब / પ્રતિબિંબ (the mirror image), मोड़ना / વાળવું (fold, the verb;
   a fold as a noun is मोड़ / ગડી), आयत / લંબચોરસ, वर्ग / ચોરસ (also the squares of the grid), कोना / ખૂણો
   (a corner), डोरी / દોરી (the string run across to the mirror line). Digits stay digits and the Latin
   capitals stay Latin ("अक्षर E"). A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Fold and Mirror": "मोड़ना और दर्पण",
    "A paper shape and a fold line across it. Will the two halves fit?": "काग़ज़ की एक आकृति है और उस पर मोड़ की एक रेखा है। क्या दोनों आधे भाग ठीक बैठेंगे?",
    "Every fold tested, every image placed at its distance, and the mirror named for every letter.": "हर मोड़ परखा। हर प्रतिबिंब सही दूरी पर रखा। और हर अक्षर के लिए दर्पण पहचाना।",
    "Free play. Any shape, any fold, as often as you like.": "मुक्त खेल। कोई भी आकृति चुनो और उसे जितनी बार चाहो, मोड़ो।",

    "Folding so the halves match": "ऐसे मोड़ना कि दोनों भाग मिलें",
    "Fold it along your line. Does every part fit, or does something stick out?": "अपनी रेखा पर मोड़ो। क्या हर हिस्सा ठीक बैठता है, या कुछ बाहर निकलता है?",
    "Where would the fold have to be for the halves to meet?": "दोनों भाग मिलें, इसके लिए मोड़ कहाँ होना चाहिए?",
    "Turn the line a little and fold again. Watch the edges as they land.": "रेखा को थोड़ा घुमाओ और फिर मोड़ो। देखो, किनारे कहाँ गिरते हैं।",
    "A fold is a line of symmetry only when one half fits exactly over the other.": "मोड़ तभी सममिति रेखा है, जब एक भाग दूसरे पर ठीक बैठे।",
    "You learned: a fold works only if one half fits exactly on the other.": "तुमने सीखा: एक भाग दूसरे पर ठीक बैठे, तभी मोड़ सही है।",
    "A paper letter T is folded down the middle of its stem. Do the halves match?": "काग़ज़ के अक्षर T को उसकी डंडी के बीच से मोड़ा गया है। क्या दोनों भाग मिलते हैं?",
    "Do the halves match?": "क्या दोनों भाग मिलते हैं?",
    "Fold it first, then look along every edge of the paper.": "पहले मोड़ो, फिर काग़ज़ का हर किनारा देखो।",
    "yes": "हाँ",
    "no": "नहीं",
    "A temple front stands on the table. Lay the fold on its line of symmetry.": "मेज़ पर मंदिर का अगला हिस्सा खड़ा है। मोड़ की रेखा को उसकी सममिति रेखा पर रखो।",
    "Where does it fold?": "यह कहाँ मुड़ेगा?",
    "Which fold would put the left half exactly on the right half?": "कौन सा मोड़ बाएँ भाग को ठीक दाएँ भाग पर बिठाएगा?",
    "down the middle": "बीच में खड़ी",
    "across the middle": "बीच में आड़ी",
    "corner to corner": "कोने से कोने",
    "no line at all": "कोई रेखा नहीं",
    "Fold this shape along the line that lies across it. Is that fold a line of symmetry?": "इस आकृति को उस रेखा पर मोड़ो जो उसके आर-पार पड़ी है। क्या वह मोड़ सममिति रेखा है?",
    "A line of symmetry?": "सममिति रेखा?",
    "A part that sticks out means the halves did not fit.": "जो हिस्सा बाहर निकले, उसका मतलब है कि भाग ठीक नहीं बैठे।",

    "More than one line, or none": "एक से ज़्यादा रेखाएँ, या कोई नहीं",
    "Try every fold you can. How many lines does each one keep?": "हर मोड़ आज़माओ। हर आकृति कितनी रेखाओं पर ठीक बैठती है?",
    "Have you tried the folds from corner to corner?": "क्या तुमने कोने से कोने वाले मोड़ आज़माए?",
    "Tap a shape to move the line onto it, then turn the line right round.": "किसी आकृति को छुओ, रेखा उस पर आ जाएगी। फिर रेखा को चारों ओर घुमाओ।",
    "A figure can have one line of symmetry, several or none; a rectangle that is not a square has two, and a square has four.": "आकृति में एक, कई या कोई सममिति रेखा नहीं हो सकती। जो आयत वर्ग नहीं है, उसमें दो होती हैं, और वर्ग में चार।",
    "You learned: a figure can have several lines of symmetry, one, or none.": "तुमने सीखा: आकृति में कई, एक या कोई सममिति रेखा नहीं हो सकती।",
    "Here is a plus sign. Count the folds it keeps.": "यह जोड़ का चिह्न है। गिनो, कितने मोड़ों में दोनों भाग मिलते हैं।",
    "Folds it keeps?": "कितने मोड़ मिलते हैं?",
    "Which way have you not laid the line yet?": "रेखा को किस ओर अभी नहीं रखा?",
    "Move the line onto the capital F. Fold it every way, and count what stays.": "रेखा को बड़े अक्षर F पर ले जाओ। हर तरह से मोड़ो, और गिनो कितने मोड़ सही रहते हैं।",
    "How many folds?": "कितने मोड़?",
    "Fold the F down its middle and watch the arms.": "F को बीच से मोड़ो और उसकी बाहें देखो।",
    "Fold the long rectangle from corner to corner. Then count every fold it keeps.": "लंबे आयत को कोने से कोने तक मोड़ो। फिर गिनो, कितने मोड़ों में दोनों भाग मिलते हैं।",
    "Lines of symmetry?": "सममिति रेखाएँ?",
    "The corner fold left corners sticking outside. Try the straight folds.": "कोने वाले मोड़ में कोने बाहर निकल गए। सीधे मोड़ आज़माओ।",

    "Behind the mirror line": "दर्पण रेखा के पीछे",
    "How far is this corner from the mirror? Go the same distance behind it.": "यह कोना दर्पण से कितनी दूर है? उसके पीछे उतनी ही दूरी पर जाओ।",
    "How many squares behind the line must its image be?": "उसका प्रतिबिंब रेखा के पीछे कितने वर्ग दूर होगा?",
    "Count the squares in front, then count the same number behind.": "आगे के वर्ग गिनो, फिर पीछे उतने ही वर्ग गिनो।",
    "A mirror image sits as far behind the mirror line as the shape sits in front. It is turned the other way round.": "आकृति रेखा से जितनी आगे है, प्रतिबिंब उतना ही पीछे है। वह दूसरी ओर मुड़ा होता है।",
    "You learned: an image sits as far behind the line as the shape.": "तुमने सीखा: प्रतिबिंब उतना ही पीछे होता है, जितनी आकृति आगे।",
    "A dot stands four squares in front of the mirror line. Put its image where it belongs.": "दर्पण रेखा से चार वर्ग आगे एक बिंदु है। उसका प्रतिबिंब सही जगह पर रखो।",
    "Place the image": "प्रतिबिंब रखो",
    "Count the squares from the dot across to the line.": "बिंदु से रेखा तक वर्ग गिनो।",
    "This triangle stands in front of the mirror line. How far behind it will each corner land?": "यह त्रिभुज दर्पण रेखा के आगे है। हर कोने का प्रतिबिंब रेखा के पीछे कितनी दूर बनेगा?",
    "nearest": "सबसे पास",
    "farthest": "सबसे दूर",
    "Squares behind?": "पीछे कितने वर्ग?",
    "Walk the string from each corner across to the line.": "हर कोने से रेखा तक डोरी खींचो।",
    "Two letter R shapes stand either side of the mirror line. Is one the mirror image of the other?": "दर्पण रेखा के दोनों ओर अंग्रेज़ी के दो अक्षर R खड़े हैं। क्या एक दूसरे का प्रतिबिंब है?",
    "Is it the image?": "क्या यह प्रतिबिंब है?",
    "Look at the letter on the right. Which way does its arm point?": "दाईं ओर का अक्षर देखो। उसकी बाँह किस ओर है?",

    "Letters that look the same in a mirror": "दर्पण में एक जैसे दिखने वाले अक्षर",
    "Does it look the same in the mirror? Now try the other mirror.": "क्या वह दर्पण में एक जैसा दिखता है? अब दूसरा दर्पण आज़माओ।",
    "Does the letter have a line of symmetry running the same way as that mirror?": "क्या अक्षर की सममिति रेखा और दर्पण की दिशा एक ही है?",
    "Tap a letter to stand it by the mirror and watch its image.": "अक्षर को छुओ, वह दर्पण के पास आ जाएगा। उसका प्रतिबिंब देखो।",
    "A letter looks the same in an upright mirror only if it has an upright line. Lay the mirror across, and letters with a line across the middle match instead.": "खड़े दर्पण में खड़ी रेखा वाला अक्षर ही एक जैसा दिखता है। दर्पण को आड़ा रखो, तो आड़ी रेखा वाले अक्षर एक जैसे दिखते हैं।",
    "You learned: which mirror you use decides which letters look the same.": "तुमने सीखा: दर्पण के हिसाब से एक जैसे अक्षर बदलते हैं।",
    "Stand each of these letters by the upright mirror. Pick the ones that look the same.": "इन सब अक्षरों को खड़े दर्पण के पास रखो। जो एक जैसे दिखें, उन्हें चुनो।",
    "Which look the same?": "कौन एक जैसे दिखते हैं?",
    "Watch the image of each letter as it stands by the mirror.": "दर्पण के पास खड़े हर अक्षर का प्रतिबिंब देखो।",
    "Here are five more letters. Which of them look the same by the upright mirror?": "ये पाँच और अक्षर हैं। खड़े दर्पण के पास इनमें से कौन से एक जैसे दिखते हैं?",
    "Which ones match?": "कौन से मिलते हैं?",
    "Fold each letter down its middle and see if the halves meet.": "हर अक्षर को बीच से मोड़ो और देखो कि दोनों भाग मिलते हैं या नहीं।",
    "Lay the second mirror under the letter E. In which mirror does E look the same?": "दूसरे दर्पण को अक्षर E के नीचे रखो। E किस दर्पण में एक जैसा दिखता है?",
    "Which mirror?": "कौन सा दर्पण?",
    "Look at both images of the letter and see which one matches.": "अक्षर के दोनों प्रतिबिंब देखो और ढूँढो कि कौन सा मिलता है।",
    "upright": "खड़ा",
    "lying across": "आड़ा",

    /* what the working area draws, the summary page's little drawing and the keys */
    "Strings run": "खींची डोरियाँ", "Letters tried": "आज़माए अक्षर", "Mirrors set": "रखे दर्पण", "Folds kept": "सही मोड़",
    "Down the middle": "बीच में खड़ी", "Halves match": "दोनों भाग मिलते हैं", "Part sticks out": "हिस्सा बाहर निकला",
    "Turned the other way": "दूसरी ओर मुड़ा", "Same in lying mirror": "आड़े दर्पण में एक जैसा",
    "Fold the paper": "काग़ज़ मोड़ो", "Fold": "मोड़ो", "same": "एक जैसे", "turned": "उलटे",
    "and": "और", "behind": "पीछे", "off": "ऊपर-नीचे", "middle": "बीच में", "across": "आड़ी", "corner": "कोने से कोने",
    "none": "कोई नहीं", "lying": "आड़ा",
  },
  gu: {
    "Fold and Mirror": "વાળવું અને અરીસો",
    "A paper shape and a fold line across it. Will the two halves fit?": "કાગળની એક આકૃતિ છે અને તેના પર વાળવાની એક રેખા છે. શું બંને અડધા ભાગ બરાબર બેસશે?",
    "Every fold tested, every image placed at its distance, and the mirror named for every letter.": "દરેક ગડી ચકાસી. દરેક પ્રતિબિંબ સાચા અંતરે મૂક્યું. અને દરેક અક્ષર માટે અરીસો ઓળખ્યો.",
    "Free play. Any shape, any fold, as often as you like.": "મુક્ત રમત. કોઈ પણ આકૃતિ પસંદ કરો અને તેને જેટલી વાર ગમે તેટલી વાર વાળો.",

    "Folding so the halves match": "એવી રીતે વાળવું કે બંને ભાગ મળે",
    "Fold it along your line. Does every part fit, or does something stick out?": "તમારી રેખા પર વાળો. શું દરેક ભાગ બરાબર બેસે છે, કે કંઈક બહાર નીકળે છે?",
    "Where would the fold have to be for the halves to meet?": "બંને ભાગ મળે તે માટે વાળવાની રેખા ક્યાં હોવી જોઈએ?",
    "Turn the line a little and fold again. Watch the edges as they land.": "રેખાને થોડી ફેરવો અને ફરી વાળો. જુઓ, ધાર ક્યાં પડે છે.",
    "A fold is a line of symmetry only when one half fits exactly over the other.": "એક ભાગ બીજા પર બરાબર બેસે, તો જ ગડી સમમિતિ રેખા છે.",
    "You learned: a fold works only if one half fits exactly on the other.": "તમે શીખ્યા: એક ભાગ બીજા પર બરાબર બેસે, તો જ ગડી સાચી.",
    "A paper letter T is folded down the middle of its stem. Do the halves match?": "કાગળના અક્ષર T ને તેની દાંડીની વચ્ચેથી વાળ્યો છે. શું બંને ભાગ મળે છે?",
    "Do the halves match?": "શું બંને ભાગ મળે છે?",
    "Fold it first, then look along every edge of the paper.": "પહેલાં વાળો, પછી કાગળની દરેક ધાર જુઓ.",
    "yes": "હા",
    "no": "ના",
    "A temple front stands on the table. Lay the fold on its line of symmetry.": "ટેબલ પર મંદિરનો આગળનો ભાગ ઊભો છે. વાળવાની રેખાને તેની સમમિતિ રેખા પર મૂકો.",
    "Where does it fold?": "તે ક્યાં વળશે?",
    "Which fold would put the left half exactly on the right half?": "કયું વાળવાથી ડાબો ભાગ બરાબર જમણા ભાગ પર બેસશે?",
    "down the middle": "વચ્ચે ઊભી",
    "across the middle": "વચ્ચે આડી",
    "corner to corner": "ખૂણાથી ખૂણા",
    "no line at all": "કોઈ રેખા નહીં",
    "Fold this shape along the line that lies across it. Is that fold a line of symmetry?": "આ આકૃતિને તેની આરપાર પડેલી રેખા પર વાળો. શું તે સમમિતિ રેખા છે?",
    "A line of symmetry?": "સમમિતિ રેખા?",
    "A part that sticks out means the halves did not fit.": "જે ભાગ બહાર નીકળે, તેનો અર્થ છે કે ભાગ બરાબર બેઠા નથી.",

    "More than one line, or none": "એક કરતાં વધુ રેખાઓ, કે એકેય નહીં",
    "Try every fold you can. How many lines does each one keep?": "દરેક રીતે વાળી જુઓ. દરેક આકૃતિ કેટલી રેખાઓ પર બરાબર બેસે છે?",
    "Have you tried the folds from corner to corner?": "શું તમે ખૂણાથી ખૂણા સુધી વાળી જોયું?",
    "Tap a shape to move the line onto it, then turn the line right round.": "કોઈ આકૃતિને અડો, રેખા તેના પર આવી જશે. પછી રેખાને ચારે બાજુ ફેરવો.",
    "A figure can have one line of symmetry, several or none; a rectangle that is not a square has two, and a square has four.": "આકૃતિમાં એક સમમિતિ રેખા હોય, ઘણી હોય, અથવા એકેય ન હોય. જે લંબચોરસ ચોરસ નથી, તેમાં બે હોય છે, અને ચોરસમાં ચાર.",
    "You learned: a figure can have several lines of symmetry, one, or none.": "તમે શીખ્યા: આકૃતિમાં સમમિતિ રેખા એક, ઘણી કે એકેય ન હોય.",
    "Here is a plus sign. Count the folds it keeps.": "આ સરવાળાનું ચિહ્ન છે. ગણો, કેટલી ગડીમાં બંને ભાગ મળે છે.",
    "Folds it keeps?": "કેટલી ગડી મળે છે?",
    "Which way have you not laid the line yet?": "રેખાને કઈ દિશામાં હજી નથી મૂકી?",
    "Move the line onto the capital F. Fold it every way, and count what stays.": "રેખાને મોટા અક્ષર F પર લઈ જાઓ. દરેક રીતે વાળો, અને ગણો કેટલી ગડી સાચી રહે છે.",
    "How many folds?": "કેટલી ગડી?",
    "Fold the F down its middle and watch the arms.": "F ને વચ્ચેથી વાળો અને તેના હાથ જુઓ.",
    "Fold the long rectangle from corner to corner. Then count every fold it keeps.": "લાંબા લંબચોરસને ખૂણાથી ખૂણા સુધી વાળો. પછી ગણો, કેટલી ગડીમાં બંને ભાગ મળે છે.",
    "Lines of symmetry?": "સમમિતિ રેખાઓ?",
    "The corner fold left corners sticking outside. Try the straight folds.": "ખૂણાવાળી ગડીમાં ખૂણા બહાર નીકળી ગયા. સીધી ગડી અજમાવો.",

    "Behind the mirror line": "અરીસાની રેખાની પાછળ",
    "How far is this corner from the mirror? Go the same distance behind it.": "આ ખૂણો અરીસાથી કેટલો દૂર છે? તેની પાછળ એટલા જ અંતરે જાઓ.",
    "How many squares behind the line must its image be?": "તેનું પ્રતિબિંબ રેખાની પાછળ કેટલા ચોરસ દૂર હશે?",
    "Count the squares in front, then count the same number behind.": "આગળના ચોરસ ગણો, પછી પાછળ એટલા જ ચોરસ ગણો.",
    "A mirror image sits as far behind the mirror line as the shape sits in front. It is turned the other way round.": "આકૃતિ રેખાથી જેટલી આગળ, પ્રતિબિંબ એટલું જ પાછળ હોય છે. તે બીજી તરફ ફરેલું હોય છે.",
    "You learned: an image sits as far behind the line as the shape.": "તમે શીખ્યા: પ્રતિબિંબ એટલું જ પાછળ હોય, જેટલી આકૃતિ આગળ.",
    "A dot stands four squares in front of the mirror line. Put its image where it belongs.": "અરીસાની રેખાથી ચાર ચોરસ આગળ એક બિંદુ છે. તેનું પ્રતિબિંબ યોગ્ય જગ્યાએ મૂકો.",
    "Place the image": "પ્રતિબિંબ મૂકો",
    "Count the squares from the dot across to the line.": "બિંદુથી રેખા સુધીના ચોરસ ગણો.",
    "This triangle stands in front of the mirror line. How far behind it will each corner land?": "આ ત્રિકોણ અરીસાની રેખાની આગળ છે. દરેક ખૂણાનું પ્રતિબિંબ રેખાની પાછળ કેટલું દૂર બનશે?",
    "nearest": "સૌથી નજીક",
    "farthest": "સૌથી દૂર",
    "Squares behind?": "પાછળ કેટલા ચોરસ?",
    "Walk the string from each corner across to the line.": "દરેક ખૂણાથી રેખા સુધી દોરી ખેંચો.",
    "Two letter R shapes stand either side of the mirror line. Is one the mirror image of the other?": "અરીસાની રેખાની બંને બાજુ અંગ્રેજી અક્ષર R ના બે આકાર ઊભા છે. શું એક બીજાનું પ્રતિબિંબ છે?",
    "Is it the image?": "શું આ પ્રતિબિંબ છે?",
    "Look at the letter on the right. Which way does its arm point?": "જમણી બાજુનો અક્ષર જુઓ. તેનો હાથ કઈ તરફ છે?",

    "Letters that look the same in a mirror": "અરીસામાં એકસરખા દેખાતા અક્ષરો",
    "Does it look the same in the mirror? Now try the other mirror.": "શું તે અરીસામાં એકસરખો દેખાય છે? હવે બીજો અરીસો અજમાવો.",
    "Does the letter have a line of symmetry running the same way as that mirror?": "શું અક્ષરની સમમિતિ રેખા એ જ દિશામાં છે, જે દિશામાં અરીસો છે?",
    "Tap a letter to stand it by the mirror and watch its image.": "અક્ષરને અડો, તે અરીસા પાસે આવી જશે. તેનું પ્રતિબિંબ જુઓ.",
    "A letter looks the same in an upright mirror only if it has an upright line. Lay the mirror across, and letters with a line across the middle match instead.": "ઊભા અરીસામાં ઊભી રેખાવાળો અક્ષર જ એકસરખો દેખાય છે. અરીસાને આડો મૂકો, તો વચ્ચે આડી રેખાવાળા અક્ષરો એકસરખા દેખાય છે.",
    "You learned: which mirror you use decides which letters look the same.": "તમે શીખ્યા: કયો અરીસો લો, તેનાથી એકસરખા દેખાતા અક્ષરો બદલાય છે.",
    "Stand each of these letters by the upright mirror. Pick the ones that look the same.": "આ બધા અક્ષરોને ઊભા અરીસા પાસે મૂકો. જે એકસરખા દેખાય, તે પસંદ કરો.",
    "Which look the same?": "કયા એકસરખા દેખાય છે?",
    "Watch the image of each letter as it stands by the mirror.": "અરીસા પાસે ઊભેલા દરેક અક્ષરનું પ્રતિબિંબ જુઓ.",
    "Here are five more letters. Which of them look the same by the upright mirror?": "આ બીજા પાંચ અક્ષરો છે. ઊભા અરીસા પાસે તેમાંથી કયા એકસરખા દેખાય છે?",
    "Which ones match?": "કયા મળે છે?",
    "Fold each letter down its middle and see if the halves meet.": "દરેક અક્ષરને વચ્ચેથી વાળો અને જુઓ કે બંને ભાગ મળે છે કે નહીં.",
    "Lay the second mirror under the letter E. In which mirror does E look the same?": "બીજા અરીસાને અક્ષર E ની નીચે આડો મૂકો. E કયા અરીસામાં એકસરખો દેખાય છે?",
    "Which mirror?": "કયો અરીસો?",
    "Look at both images of the letter and see which one matches.": "અક્ષરના બંને પ્રતિબિંબ જુઓ અને શોધો કે કયું મળે છે.",
    "upright": "ઊભો",
    "lying across": "આડો",

    /* what the working area draws, the summary page's little drawing and the keys */
    "Strings run": "ખેંચેલી દોરીઓ", "Letters tried": "અજમાવેલા અક્ષર", "Mirrors set": "મૂકેલા અરીસા", "Folds kept": "સાચી ગડી",
    "Down the middle": "વચ્ચે ઊભી", "Halves match": "બંને ભાગ મળે છે", "Part sticks out": "ભાગ બહાર નીકળ્યો",
    "Turned the other way": "બીજી તરફ ફરેલું", "Same in lying mirror": "આડા અરીસામાં એકસરખો",
    "Fold the paper": "કાગળ વાળો", "Fold": "વાળો", "same": "એકસરખા", "turned": "ઊલટા",
    "and": "અને", "behind": "પાછળ", "off": "ઉપર-નીચે", "middle": "વચ્ચે", "across": "આડી", "corner": "ખૂણાથી ખૂણા",
    "none": "એકેય નહીં", "lying": "આડો",
  },
};

const PHASES = [
  {
    n: 1,
    concept: "Folding so the halves match",
    conceptId: "M2.S3.T7.C24", objectiveIds: ["O11"],
    says: ["Fold it along your line. Does every part fit, or does something stick out?"],
    ladder: ["Where would the fold have to be for the halves to meet?",
      "Turn the line a little and fold again. Watch the edges as they land."],
    closing: "A fold is a line of symmetry only when one half fits exactly over the other.",
    learned: "You learned: a fold works only if one half fits exactly on the other.",
    traceback: "the fold is made along the line, any part that sticks out glows, and the fold that keeps is left standing",
    items: [
      /* learn ML1: answer in the plan = Yes. The left half fits exactly over the right half */
      { qid: "M2.S3.T7.C24:ML1", kind: "fold", fig: "tee", start: "vmid", answer: "yes", near: "no", winMs: 2600,
        choices: [{ id: "yes", label: "yes" }, { id: "no", label: "no" }],
        say: "A paper letter T is folded down the middle of its stem. Do the halves match?",
        ask: "Do the halves match?", miss: "Fold it first, then look along every edge of the paper." },
      /* practice 1: answer in the plan = One upright line straight down the middle of the front */
      { qid: "M2.S3.T7.C24:1", kind: "fold", fig: "front", start: "hmid", answer: "mid", near: "corner", winMs: 3000,
        choices: [{ id: "mid", label: "down the middle" }, { id: "across", label: "across the middle" },
          { id: "corner", label: "corner to corner" }, { id: "none", label: "no line at all" }],
        say: "A temple front stands on the table. Lay the fold on its line of symmetry.",
        ask: "Where does it fold?", miss: "Which fold would put the left half exactly on the right half?" },
      /* practice 2: answer in the plan = No, because the halves do not fit exactly over each other */
      { qid: "M2.S3.T7.C24:2", kind: "fold", fig: "ell", start: "vmid", answer: "no", near: "yes", winMs: 2600,
        choices: [{ id: "yes", label: "yes" }, { id: "no", label: "no" }],
        say: "Fold this shape along the line that lies across it. Is that fold a line of symmetry?",
        ask: "A line of symmetry?", miss: "A part that sticks out means the halves did not fit." },
    ],
  },
  {
    n: 2,
    concept: "More than one line, or none",
    conceptId: "M2.S3.T7.C25", objectiveIds: ["O11"],
    says: ["Try every fold you can. How many lines does each one keep?"],
    ladder: ["Have you tried the folds from corner to corner?",
      "Tap a shape to move the line onto it, then turn the line right round."],
    closing: "A figure can have one line of symmetry, several or none; a rectangle that is not a square has two, and a square has four.",
    learned: "You learned: a figure can have several lines of symmetry, one, or none.",
    traceback: "the line is turned round the figure, every fold that matches is kept dotted, and the tally is left at the count",
    items: [
      /* learn ML2: answer in the plan = Four: one upright, one across, and two slanting ones */
      { qid: "M2.S3.T7.C25:ML2", kind: "count", at: 0, answer: 4, near: 2, winMs: 3400,
        say: "Here is a plus sign. Count the folds it keeps.",
        ask: "Folds it keeps?", miss: "Which way have you not laid the line yet?" },
      /* practice 3: answer in the plan = None. No fold makes one half fit exactly over the other */
      { qid: "M2.S3.T7.C25:3", kind: "count", at: 2, answer: 0, near: 1, winMs: 3000,
        say: "Move the line onto the capital F. Fold it every way, and count what stays.",
        ask: "How many folds?", miss: "Fold the F down its middle and watch the arms." },
      /* practice 4: answer in the plan = No, the corners stick out. It has two lines of symmetry */
      { qid: "M2.S3.T7.C25:4", kind: "count", at: 1, answer: 2, near: 4, winMs: 3400,
        say: "Fold the long rectangle from corner to corner. Then count every fold it keeps.",
        ask: "Lines of symmetry?", miss: "The corner fold left corners sticking outside. Try the straight folds." },
    ],
  },
  {
    n: 3,
    concept: "Behind the mirror line",
    conceptId: "M2.S3.T7.C26", objectiveIds: ["O12"],
    says: ["How far is this corner from the mirror? Go the same distance behind it."],
    ladder: ["How many squares behind the line must its image be?",
      "Count the squares in front, then count the same number behind."],
    closing: "A mirror image sits as far behind the mirror line as the shape sits in front. It is turned the other way round.",
    learned: "You learned: an image sits as far behind the line as the shape.",
    traceback: "each string runs across to the mirror line and the same number of squares beyond it, and the image is drawn at their ends",
    items: [
      /* learn ML3: answer in the plan = Four squares to the right of the mirror line, level with the dot */
      { qid: "M2.S3.T7.C26:ML3", kind: "place", pad: "enter", answer: "4:0", near: "1:0", winMs: 3200,
        say: "A dot stands four squares in front of the mirror line. Put its image where it belongs.",
        ask: "Place the image", miss: "Count the squares from the dot across to the line." },
      /* practice 5: answer in the plan = Three squares and five squares, on the right of the line */
      { qid: "M2.S3.T7.C26:5", kind: "tri", parts: [{ label: "nearest" }, { label: "farthest" }],
        answer: [3, 5], near: "4|5", winMs: 3400,
        say: "This triangle stands in front of the mirror line. How far behind it will each corner land?",
        ask: "Squares behind?", miss: "Walk the string from each corner across to the line." },
      /* practice 6: answer in the plan = No. In an upright mirror the image of R faces the other way */
      { qid: "M2.S3.T7.C26:6", kind: "rr", answer: "no", near: "yes", winMs: 3000,
        choices: [{ id: "yes", label: "yes" }, { id: "no", label: "no" }],
        say: "Two letter R shapes stand either side of the mirror line. Is one the mirror image of the other?",
        ask: "Is it the image?", miss: "Look at the letter on the right. Which way does its arm point?" },
    ],
  },
  {
    n: 4,
    concept: "Letters that look the same in a mirror",
    conceptId: "M2.S3.T7.C27", objectiveIds: ["O12"],
    says: ["Does it look the same in the mirror? Now try the other mirror."],
    ladder: ["Does the letter have a line of symmetry running the same way as that mirror?",
      "Tap a letter to stand it by the mirror and watch its image."],
    closing: "A letter looks the same in an upright mirror only if it has an upright line. Lay the mirror across, and letters with a line across the middle match instead.",
    learned: "You learned: which mirror you use decides which letters look the same.",
    traceback: "every letter is stood by the mirror with its image beside it, and they settle into a row that matches and a row that turns",
    items: [
      /* learn ML4: answer in the plan = A and V. Each has an upright line of symmetry */
      { qid: "M2.S3.T7.C27:ML4", kind: "pick", pad: "enter", tray: ["A", "B", "D", "V"], answer: "AV", near: "AB", winMs: 3400,
        say: "Stand each of these letters by the upright mirror. Pick the ones that look the same.",
        ask: "Which look the same?", miss: "Watch the image of each letter as it stands by the mirror." },
      /* practice 7: answer in the plan = H, O and U, which each have an upright line of symmetry */
      { qid: "M2.S3.T7.C27:7", kind: "pick", pad: "enter", tray: ["C", "H", "K", "O", "U"], answer: "HOU", near: "HO", winMs: 3400,
        say: "Here are five more letters. Which of them look the same by the upright mirror?",
        ask: "Which ones match?", miss: "Fold each letter down its middle and see if the halves meet." },
      /* practice 8: answer in the plan = In the mirror lying flat under it, because E has a line across */
      { qid: "M2.S3.T7.C27:8", kind: "which", letter: "E", answer: "lying", near: "upright", winMs: 3200,
        choices: [{ id: "upright", label: "upright" }, { id: "lying", label: "lying across" }],
        say: "Lay the second mirror under the letter E. In which mirror does E look the same?",
        ask: "Which mirror?", miss: "Look at both images of the letter and see which one matches." },
    ],
  },
];

/* ── the shapes, the folds, the squared paper and the capitals ───────────────────────────── */

/* every paper figure as a polygon in a 200 x 200 box (the fold maths runs on these points) */
const FIGS: any = {
  tee:    { pts: [[30, 20], [170, 20], [170, 60], [120, 60], [120, 180], [80, 180], [80, 60], [30, 60]] },
  front:  { pts: [[26, 180], [26, 86], [100, 26], [174, 86], [174, 180]] },
  ell:    { pts: [[38, 30], [104, 30], [104, 118], [172, 118], [172, 176], [38, 176]] },
  plus:   { pts: [[74, 22], [126, 22], [126, 74], [178, 74], [178, 126], [126, 126], [126, 178], [74, 178], [74, 126], [22, 126], [22, 74], [74, 74]] },
  eff:    { pts: [[52, 22], [160, 22], [160, 56], [86, 56], [86, 86], [146, 86], [146, 120], [86, 120], [86, 178], [52, 178]] },
  slab:   { pts: [[16, 62], [184, 62], [184, 138], [16, 138]] },
  square: { pts: [[34, 34], [166, 34], [166, 166], [34, 166]] },
};
/* the six places a child can lay the fold line: down, across, both corner slants, and two off centre */
const FOLD_IDS = ["vmid", "hmid", "dia1", "dia2", "voff", "hoff"];

const boxOf = (pts: number[][]) => {
  let x0 = pts[0][0], x1 = x0, y0 = pts[0][1], y1 = y0;
  for (const p of pts) { x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); y0 = Math.min(y0, p[1]); y1 = Math.max(y1, p[1]); }
  return { x0, x1, y0, y1, cx: (x0 + x1) / 2, cy: (y0 + y1) / 2, w: x1 - x0, h: y1 - y0 };
};
const unitOf = (dx: number, dy: number) => { const L = Math.hypot(dx, dy) || 1; return [dx / L, dy / L]; };
/* a fold line, in the figure's own 200 x 200 coordinates */
const lineOf = (pts: number[][], id: string) => {
  const b = boxOf(pts);
  if (id === "hmid") return { p: [b.cx, b.cy], d: [1, 0] };
  if (id === "dia1") return { p: [b.cx, b.cy], d: unitOf(b.w, b.h) };
  if (id === "dia2") return { p: [b.cx, b.cy], d: unitOf(b.w, -b.h) };
  if (id === "voff") return { p: [b.cx - b.w * 0.24, b.cy], d: [0, 1] };
  if (id === "hoff") return { p: [b.cx, b.cy - b.h * 0.27], d: [1, 0] };
  return { p: [b.cx, b.cy], d: [0, 1] };
};
/* turning the paper over: the part across the line is scaled by c, so c = 1 is flat and c = -1 is folded */
const turnPt = (q: number[], L: any, c: number) => {
  const vx = q[0] - L.p[0], vy = q[1] - L.p[1];
  const t = vx * L.d[0] + vy * L.d[1];
  const nx = vx - t * L.d[0], ny = vy - t * L.d[1];
  return [L.p[0] + t * L.d[0] + nx * c, L.p[1] + t * L.d[1] + ny * c];
};
/* the half of the paper on one side of the line (used to draw the part that turns over) */
const halfOf = (pts: number[][], L: any, sign: number) => {
  const nx = -L.d[1] * sign, ny = L.d[0] * sign;
  const side = (q: number[]) => nx * (q[0] - L.p[0]) + ny * (q[1] - L.p[1]);
  const out: number[][] = [];
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i], b = pts[(i + 1) % pts.length], sa = side(a), sb = side(b);
    if (sa >= -0.001) out.push(a);
    if ((sa > 0 && sb < 0) || (sa < 0 && sb > 0)) {
      const t = sa / (sa - sb);
      out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
    }
  }
  return out;
};
/* does the turned half land exactly on the other half? (nothing sticks out) */
const foldFits = (pts: number[][], L: any, tol: number) =>
  pts.every((p) => { const q = turnPt(p, L, -1); return pts.some((r) => Math.hypot(r[0] - q[0], r[1] - q[1]) < tol); });
const foldsThatFit = (id: string) => FOLD_IDS.filter((f) => foldFits(FIGS[id].pts, lineOf(FIGS[id].pts, f), 2.5));

/* the squared paper of the mirror bay: 20 squares across, 11 down, the mirror line down the middle */
const BAY = { x: 143, y: 28, w: 800, h: 440, sq: 40, cols: 20, rows: 11 };
const MIRX = BAY.x + 10 * BAY.sq;
const cell = (col: number, row: number) => [BAY.x + col * BAY.sq, BAY.y + row * BAY.sq];
const DOT3 = cell(6, 5);                                   /* four squares in front of the line */
const TRI3 = [cell(7, 3), cell(5, 5), cell(6, 7)];         /* nearest 3, farthest 5, the third 4 */
const RRL = cell(6, 4);                                    /* the two R shapes of question 3 */
const RRR = cell(14, 4);

/* the capitals, as plain strokes in a 60 x 84 box: l = a line, a = an arc of an ellipse */
const L6 = (a: number, b: number, c: number, d: number) => ["l", a, b, c, d];
const A6 = (cx: number, cy: number, rx: number, ry: number, a0: number, a1: number) => ["a", cx, cy, rx, ry, a0, a1];
const GLYPHS: any = {
  A: [L6(4, 84, 30, 0), L6(30, 0, 56, 84), L6(13, 56, 47, 56)],
  B: [L6(10, 0, 10, 84), L6(10, 0, 32, 0), A6(32, 21, 21, 21, -90, 90), L6(10, 42, 32, 42), A6(32, 63, 21, 21, -90, 90), L6(10, 84, 32, 84)],
  C: [A6(30, 42, 24, 34, 40, 320)],
  D: [L6(10, 0, 10, 84), L6(10, 0, 26, 0), A6(26, 42, 30, 42, -90, 90), L6(10, 84, 26, 84)],
  E: [L6(10, 0, 10, 84), L6(10, 0, 50, 0), L6(10, 42, 44, 42), L6(10, 84, 50, 84)],
  H: [L6(10, 0, 10, 84), L6(50, 0, 50, 84), L6(10, 42, 50, 42)],
  K: [L6(10, 0, 10, 84), L6(50, 0, 10, 42), L6(10, 42, 50, 84)],
  O: [A6(30, 42, 24, 38, 0, 360)],
  R: [L6(10, 0, 10, 84), L6(10, 0, 32, 0), A6(32, 21, 21, 21, -90, 90), L6(10, 42, 32, 42), L6(28, 42, 50, 84)],
  U: [L6(10, 0, 10, 58), L6(50, 0, 50, 58), A6(30, 58, 20, 26, 0, 180)],
  V: [L6(6, 0, 30, 84), L6(30, 84, 54, 0)],
};
const TRAY_ALL = ["A", "B", "C", "D", "E", "H", "K", "O", "R", "U", "V"];
const GLYPH_W = 60, GLYPH_H = 84;

/* one stroke turned into a path; an arc is walked round in small steps */
const strokeD = (pr: any[]) => {
  if (pr[0] === "l") return "M " + pr[1] + " " + pr[2] + " L " + pr[3] + " " + pr[4];
  const cx = pr[1], cy = pr[2], rx = pr[3], ry = pr[4], a0 = pr[5], a1 = pr[6];
  const steps = Math.max(6, Math.round(Math.abs(a1 - a0) / 12));
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const a = ((a0 + (a1 - a0) * (i / steps)) * Math.PI) / 180;
    d += (i ? " L " : "M ") + (cx + rx * Math.cos(a)).toFixed(1) + " " + (cy + ry * Math.sin(a)).toFixed(1);
  }
  return d;
};
const glyphD = (g: any[]) => g.map(strokeD).join(" ");

/* the same strokes, mirrored and matched up: which way can this letter be folded? (the oracle's route) */
const strokeKey = (pr: any[]) => {
  const r = (x: number) => Math.round(x * 10) / 10;
  if (pr[0] === "l") {
    const swap = pr[1] !== pr[3] ? pr[1] > pr[3] : pr[2] > pr[4];
    const a = swap ? [pr[3], pr[4]] : [pr[1], pr[2]], b = swap ? [pr[1], pr[2]] : [pr[3], pr[4]];
    return "l " + r(a[0]) + " " + r(a[1]) + " " + r(b[0]) + " " + r(b[1]);
  }
  let a0 = pr[5], a1 = pr[6];
  if (Math.abs(a1 - a0) >= 359.5) return "a " + r(pr[1]) + " " + r(pr[2]) + " " + r(pr[3]) + " " + r(pr[4]) + " full";
  while (a0 < 0) { a0 += 360; a1 += 360; }
  while (a0 >= 360) { a0 -= 360; a1 -= 360; }
  return "a " + r(pr[1]) + " " + r(pr[2]) + " " + r(pr[3]) + " " + r(pr[4]) + " " + r(a0) + " " + r(a1);
};
const mirrorStroke = (pr: any[], up: boolean) => {
  if (pr[0] === "l") return up ? ["l", GLYPH_W - pr[1], pr[2], GLYPH_W - pr[3], pr[4]] : ["l", pr[1], GLYPH_H - pr[2], pr[3], GLYPH_H - pr[4]];
  return up ? ["a", GLYPH_W - pr[1], pr[2], pr[3], pr[4], 180 - pr[6], 180 - pr[5]]
    : ["a", pr[1], GLYPH_H - pr[2], pr[3], pr[4], -pr[6], -pr[5]];
};
const glyphSame = (letter: string, up: boolean) => {
  const g = GLYPHS[letter];
  const a = g.map(strokeKey).sort().join("|");
  const b = g.map((pr: any[]) => strokeKey(mirrorStroke(pr, up))).sort().join("|");
  return a === b;
};

/* how many ways a polygon folds onto itself, read off its ring of sides and corners
   (the oracle's route: no point is ever reflected here) */
const symAxes = (pts: number[][]) => {
  const n = pts.length;
  let area = 0;
  for (let i = 0; i < n; i++) { const a = pts[i], b = pts[(i + 1) % n]; area += a[0] * b[1] - b[0] * a[1]; }
  const P = area < 0 ? pts.slice().reverse() : pts.slice();
  const S: number[] = [];
  for (let i = 0; i < n; i++) {
    const a = P[i], b = P[(i + 1) % n], c = P[(i + 2) % n];
    S.push(Math.round(Math.hypot(b[0] - a[0], b[1] - a[1]) * 4));
    const ux = a[0] - b[0], uy = a[1] - b[1], vx = c[0] - b[0], vy = c[1] - b[1];
    let ang = (Math.atan2(ux * vy - uy * vx, ux * vx + uy * vy) * 180) / Math.PI;
    if (ang < 0) ang += 360;
    S.push(10000 + Math.round(ang));
  }
  const m = S.length, R = S.slice().reverse();
  let count = 0;
  for (let r = 0; r < m; r++) {
    let all = true;
    for (let j = 0; j < m; j++) if (S[j] !== R[(j + r) % m]) { all = false; break; }
    if (all) count++;
  }
  return count;
};
/* is a figure's one fold the upright one? read from the spread of its corners across the middle */
const uprightOnly = (pts: number[][]) => {
  const b = boxOf(pts);
  const xs = pts.map((p) => p[0] - b.cx).sort((u, v) => u - v);
  const back = xs.map((x) => -x).sort((u, v) => u - v);
  return xs.every((x, i) => Math.abs(x - back[i]) < 0.001);
};

/* the numbers and rows the working area is built from (they go into the sidecar too) */
const MODEL = {
  figures: Object.keys(FIGS).reduce((o: any, k) => { o[k] = { corners: FIGS[k].pts.length, lines: symAxes(FIGS[k].pts) }; return o; }, {}),
  folds: FOLD_IDS,
  table1: { x: 60, y: 24, w: 680, h: 480, centre: [400, 250], scale: 1.7 },
  table2: { x: 16, y: 20, w: 1054, h: 388, centres: [190, 543, 896], row: 165, scale: 0.85, figures: ["plus", "slab", "eff"] },
  bay: { x: BAY.x, y: BAY.y, squares: BAY.sq, cols: BAY.cols, rows: BAY.rows, mirror: MIRX },
  dot: { at: DOT3, squaresInFront: 4 },
  triangle: { at: TRI3, squaresInFront: [3, 5, 4] },
  letters: TRAY_ALL.reduce((o: any, k) => { o[k] = { upright: glyphSame(k, true), lying: glyphSame(k, false) }; return o; }, {}),
  freePlay: { figures: ["square", "slab", "plus"] },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

const showVal = (v: any, k?: any, o?: any) => {
  const tr = o && o.tx ? o.tx : (x: any) => x;   /* the slot and the summary hand in their language's lookup */
  const t = String(v === null || v === undefined ? "" : v);
  if (k !== undefined) return t;
  if (t.includes("|")) return t.split("|").join(" " + tr("and") + " ");
  const m = /^(\d+):(-?\d+)$/.exec(t);
  if (m) return m[1] + " " + tr("behind") + (Number(m[2]) ? " " + Math.abs(Number(m[2])) + " " + tr("off") : "");
  if (/^[A-Z]{2,}$/.test(t)) return t.split("").join(" ");
  if (t === "mid") return tr("middle");
  return t;
};

/* judge: is this value right for this item? */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived from the shapes and the letters themselves, by a route that
   never reflects a point (the picture's way) and never reads item.answer */
const oracle = () => {
  const P = PHASES, got: any[] = [];
  got.push(symAxes(FIGS.tee.pts) > 0 ? "yes" : "no");
  got.push(symAxes(FIGS.front.pts) === 1 && uprightOnly(FIGS.front.pts) ? "mid" : "across");
  got.push(symAxes(FIGS.ell.pts) > 0 ? "yes" : "no");
  got.push(symAxes(FIGS.plus.pts));
  got.push(symAxes(FIGS.eff.pts));
  got.push(symAxes(FIGS.slab.pts));
  got.push((MIRX - DOT3[0]) / BAY.sq + ":" + (DOT3[1] - DOT3[1]) / BAY.sq);
  const away = TRI3.map((c) => (MIRX - c[0]) / BAY.sq);
  got.push([Math.min.apply(null, away), Math.max.apply(null, away)]);
  got.push(glyphSame("R", true) ? "yes" : "no");
  got.push(P[3].items[0].tray.filter((x: string) => glyphSame(x, true)).join(""));
  got.push(P[3].items[1].tray.filter((x: string) => glyphSame(x, true)).join(""));
  got.push(glyphSame("E", false) && !glyphSame("E", true) ? "lying" : "upright");
  const want = P.flatMap((p: any) => p.items.map((it: any) => it.answer));
  return want.every((w: any, i: number) => (Array.isArray(w) ? w.join("|") === (got[i] as any[]).join("|") : String(w) === String(got[i])));
};
/* the most likely wrong answer (the item's own misconception); judge must reject it */
const nearMiss = (item: any) => (item.near !== undefined ? item.near
  : item.parts ? item.answer.map((x: any) => x + 1).join("|")
  : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
  : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => T.submit(item.answer);
/* the agent's answer() for an item made on the working area: set it as a child would */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter; undefined = press Enter */
const check = () => undefined;

/* ── the working area: 1086 x 528, origin at its top-left ───────────────────────────────── */

const FIG = CONTENT.hundred;   /* deep blue: the figure being studied */
const PIN = CONTENT.pointer;   /* vermilion: every corner and point */
const RUN = CONTENT.ten;       /* amber: a length being measured */
const AXIS = CONTENT.bead;     /* reddish purple: a line of symmetry or a mirror line, always dotted */
const SKY = "#7FC3E8";         /* sky blue: the half turned over, and a mirror image */
const GRID = "#2B2B2B";        /* near-black: every grid line and guide */

const T1 = { x: 60, y: 24, w: 680, h: 480 };
const T2 = { x: 16, y: 20, w: 1054, h: 388 };
const P2_AT = [190, 543, 896], P2_ROW = 165, P2_SC = 0.85, P2_FIGS = ["plus", "slab", "eff"];
const FREE_FIGS = ["square", "slab", "plus"];
/* where the square stands while phase 2's closing names it */
const SQ_PL = { cx: 543, cy: 200, sc: 1.3 };

/* where a figure sits on the working area, and how its own coordinates get there */
const placeOf = (n: number, k: number, free: boolean) => (n === 1 && !free
  ? { cx: 400, cy: 250, sc: 1.7 }
  : { cx: P2_AT[k], cy: P2_ROW, sc: P2_SC });
const toW = (p: number[], pl: any) => [pl.cx + (p[0] - 100) * pl.sc, pl.cy + (p[1] - 100) * pl.sc];
const wLine = (id: string, fig: string, pl: any) => {
  const L = lineOf(FIGS[fig].pts, id), p = toW(L.p, pl);
  return { p, d: L.d };
};
const halfLen = (fig: string, pl: any) => { const b = boxOf(FIGS[fig].pts); return (Math.hypot(b.w, b.h) / 2) * pl.sc + 20; };
const endsOf = (fig: string, id: string, pl: any) => {
  const L = wLine(id, fig, pl), h = halfLen(fig, pl);
  return [[L.p[0] - L.d[0] * h, L.p[1] - L.d[1] * h], [L.p[0] + L.d[0] * h, L.p[1] + L.d[1] * h]];
};
const poly = (pts: number[][]) => pts.map((p) => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");

function Paper({ fig, pl, kept, fold, anim, C, ghost }: any) {
  const pts = FIGS[fig].pts.map((p: number[]) => toW(p, pl));
  const L = wLine(fold, fig, pl);
  const turning = anim && anim.fig === fig;
  const c = turning ? anim.c : 1;
  const half = turning ? halfOf(pts, L, 1).map((q: number[]) => turnPt(q, L, c)) : null;
  const ends = endsOf(fig, fold, pl);
  return (
    <g pointerEvents="none">
      <polygon points={poly(pts)} fill={ghost ? tint(FIG, 0.45) : FIG} stroke={shade(FIG, 0.25)} strokeWidth={2.5} strokeLinejoin="round" />
      {half && half.length > 2 && (
        <polygon points={poly(half)} fill={SKY} fillOpacity={0.88} stroke={shade(SKY, 0.35)} strokeWidth={turning && anim.fits === false && c <= -0.95 ? 6 : 3} strokeLinejoin="round" />
      )}
      {kept.map((id: string) => {
        const e = endsOf(fig, id, pl);
        return <line key={id} x1={e[0][0]} y1={e[0][1]} x2={e[1][0]} y2={e[1][1]} stroke={AXIS} strokeWidth={5} strokeDasharray="12 10" strokeLinecap="round" />;
      })}
      {!kept.includes(fold) && (
        <line x1={ends[0][0]} y1={ends[0][1]} x2={ends[1][0]} y2={ends[1][1]} stroke={shade(SKY, 0.2)} strokeWidth={5} strokeLinecap="round" />
      )}
    </g>
  );
}

function Tally({ x, y, kept, count, C }: any) {
  return (
    <g pointerEvents="none">
      <rect x={x} y={y} width={150} height={80} rx={14} fill={tint(C.panel, 0.45)} stroke={C.rule} strokeWidth={2} />
      {kept.map((id: string, i: number) => (
        <line key={id} x1={x + 20 + i * 30} y1={y + 56} x2={x + 20 + i * 30} y2={y + 22} stroke={AXIS} strokeWidth={5} strokeDasharray="7 6" strokeLinecap="round" />
      ))}
      {count !== null && count !== undefined && (
        <text x={x + 130} y={y + 58} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={C.ink}>{count}</text>
      )}
    </g>
  );
}

/* the mirror bay: squared paper with the upright mirror line down its middle */
function Squares({ C, lying }: any) {
  const lines = [];
  for (let i = 0; i <= BAY.cols; i++) lines.push(<line key={"v" + i} x1={BAY.x + i * BAY.sq} y1={BAY.y} x2={BAY.x + i * BAY.sq} y2={BAY.y + BAY.h} stroke={GRID} strokeOpacity={0.3} strokeWidth={1.5} />);
  for (let j = 0; j <= BAY.rows; j++) lines.push(<line key={"h" + j} x1={BAY.x} y1={BAY.y + j * BAY.sq} x2={BAY.x + BAY.w} y2={BAY.y + j * BAY.sq} stroke={GRID} strokeOpacity={0.3} strokeWidth={1.5} />);
  return (
    <g pointerEvents="none">
      <rect x={BAY.x} y={BAY.y} width={BAY.w} height={BAY.h} rx={10} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      {lines}
      <line x1={MIRX} y1={BAY.y + 6} x2={MIRX} y2={BAY.y + BAY.h - 6} stroke={AXIS} strokeWidth={6} strokeDasharray="14 11" strokeLinecap="round" />
      {lying && <line x1={BAY.x + 6} y1={lying} x2={BAY.x + BAY.w - 6} y2={lying} stroke={AXIS} strokeWidth={6} strokeDasharray="14 11" strokeLinecap="round" />}
    </g>
  );
}

/* a string from a point straight across to the mirror line, ticked square by square */
function Strand({ at, beyond, C, label }: any) {
  const ticks = [];
  const nF = Math.round((MIRX - at[0]) / BAY.sq);
  for (let i = 1; i < nF; i++) ticks.push(<line key={"f" + i} x1={at[0] + i * BAY.sq} y1={at[1] - 9} x2={at[0] + i * BAY.sq} y2={at[1] + 9} stroke={shade(RUN, 0.2)} strokeWidth={3} />);
  if (beyond) for (let i = 1; i < nF; i++) ticks.push(<line key={"b" + i} x1={MIRX + i * BAY.sq} y1={at[1] - 9} x2={MIRX + i * BAY.sq} y2={at[1] + 9} stroke={shade(RUN, 0.2)} strokeWidth={3} />);
  return (
    <g pointerEvents="none">
      <line x1={at[0]} y1={at[1]} x2={beyond ? MIRX + nF * BAY.sq : MIRX} y2={at[1]} stroke={RUN} strokeWidth={4} strokeLinecap="round" />
      {ticks}
      {label && <text x={(at[0] + MIRX) / 2} y={at[1] - 16} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{nF}</text>}
      {label && beyond && <text x={MIRX + (nF * BAY.sq) / 2} y={at[1] - 16} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{nF}</text>}
    </g>
  );
}

function Glyph({ letter, x, y, s, colour, flipX, flipY }: any) {
  let t = "translate(" + x + "," + y + ") scale(" + s + ")";
  if (flipX) t += " translate(" + GLYPH_W + ",0) scale(-1,1)";
  if (flipY) t += " translate(0," + GLYPH_H + ") scale(1,-1)";
  return <g transform={t} pointerEvents="none"><path d={glyphD(GLYPHS[letter])} fill="none" stroke={colour} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" /></g>;
}

/* the running count: what has been kept, run or tried so far (never a score, never a countdown).
   Drawn from inside Work, in the runs zone 94 above the working area, so it moves the moment the
   child acts (as the runtime's own Runs slot it only caught up on the next voice line) */
function RunsBox({ r, C, lang = "en", tx = (v: any) => v }: any) {
  return (
    <g data-zone="runs" transform={"translate(" + (Z.runs.x - W.x) + "," + (Z.runs.y - W.y) + ")"} pointerEvents="none">
      <rect x={0} y={0} width={Z.runs.w} height={Z.runs.h} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
      <text x={16} y={32} fontSize={T.micro} fontWeight={500} fill={C.ink}>{tx(r.label)}</text>
      <text x={314} y={62} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{lang === "hi" ? r.all + " में से " + r.now : lang === "gu" ? r.all + " માંથી " + r.now : r.now + " of " + r.all}</text>
    </g>
  );
}

const freshOf = (n: number, index: number, free: boolean) => {
  if (free) return { ph: 0, figs: FREE_FIGS, at: 0, fold: "vmid", kept: {}, tried: {}, strands: [], img: null, chosen: [], shown: null, lying: false };
  const P = PHASES[n - 1], it = P.items[Math.min(index, P.items.length - 1)];
  if (n === 1) return { ph: 1, figs: [it.fig], at: 0, fold: it.start, kept: {}, tried: {}, strands: [], img: null, chosen: [], shown: null, lying: false };
  if (n === 2) return { ph: 2, figs: P2_FIGS, at: it.at, fold: "vmid", kept: {}, tried: {}, strands: [], img: null, chosen: [], shown: null, lying: false };
  if (n === 3) return { ph: 3, figs: [], at: 0, fold: "vmid", kept: {}, tried: {}, strands: [], img: null, chosen: [], shown: null, lying: false };
  return { ph: 4, figs: [], at: 0, fold: "vmid", kept: {}, tried: {}, strands: [], img: null, chosen: [], shown: it.tray ? it.tray[0] : it.letter, lying: false };
};

function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const kind = free ? "free" : item.kind;
  const [s, setS] = useState<any>(() => freshOf(n, 0, false));
  const [demo, setDemo] = useState<any>(null);
  const [anim, setAnim] = useState<any>(null);
  const sRef = useRef<any>(s);
  const demoRef = useRef<any>(demo);
  const valRef = useRef<any>("");
  /* true once the child has made an act on the working area that has not yet been judged */
  const freshRef = useRef(false);
  sRef.current = s;
  demoRef.current = demo;

  useEffect(() => {
    tl.stop();
    freshRef.current = false;
    setAnim(null);
    setDemo(null);
    setS((old: any) => {
      const nx = freshOf(n, index, free);
      return nx.ph === 2 && old && old.ph === 2 ? { ...nx, kept: old.kept, tried: old.tried } : nx;
    });
  }, [index, free]);

  const put = (o: any) => setS((old: any) => ({ ...old, ...o }));
  const touched = () => { if (demoRef.current) { demoRef.current = null; setDemo(null); } };

  /* ── what the child has made, as the answer this question wants ── */
  const valueNow = (st: any) => {
    if (kind === "place") return st.img ? st.img[0] + ":" + st.img[1] : "";
    if (kind === "pick") return st.chosen.slice().sort().join("");
    return "";
  };
  valRef.current = valueNow(s);
  /* Enter answers only a fresh act. The runtime's stale guard leaves pad "enter" items to the tool, so
     after a miss a bare Enter sends nothing until the child moves the dot or taps a letter again */
  api.onEnter(!free && item.pad === "enter" && stage === "ask" ? () => {
    if (!freshRef.current || !valRef.current) return;
    freshRef.current = false;
    api.submit(valRef.current);
  } : null);

  /* ── folding (Free play opens one render before the effect swaps the state in) ── */
  const figs = s.figs && s.figs.length ? s.figs : kind === "free" ? FREE_FIGS : [];
  const keptOf = (f: string) => s.kept[f] || [];
  const triedOf = (f: string) => s.tried[f] || 0;

  const doFold = () => {
    if (tl.busy || !figs.length) return;
    touched();
    const fig = figs[s.at], pl = placeOf(n, s.at, free);
    const pts = FIGS[fig].pts.map((p: number[]) => toW(p, pl));
    const L = wLine(s.fold, fig, pl);
    const fits = foldFits(pts, L, 3);
    const already = keptOf(fig).includes(s.fold);
    const cs = [0.55, 0.1, -0.4, -0.78, -1];
    const steps: any[] = cs.map((c) => [95, () => setAnim({ fig, c, fits })]);
    if (fits) {
      steps.push([420, () => { api.sfx.tick(); }]);
      steps.push([0, () => {
        setAnim(null);
        setS((old: any) => ({ ...old,
          kept: { ...old.kept, [fig]: already ? old.kept[fig] : [...(old.kept[fig] || []), s.fold] },
          tried: { ...old.tried, [fig]: (old.tried[fig] || 0) + 1 } }));
      }]);
    } else {
      steps.push([620, () => {}]);
      steps.push([95, () => setAnim({ fig, c: -0.4, fits })]);
      steps.push([95, () => setAnim({ fig, c: 0.4, fits })]);
      steps.push([0, () => {
        setAnim(null);
        setS((old: any) => ({ ...old, tried: { ...old.tried, [fig]: (old.tried[fig] || 0) + 1 } }));
      }]);
    }
    tl.run(steps);
  };

  const drag = useDrag((pay: any, at: any) => {
    if (tl.busy) return;
    touched();
    if (pay && pay.grip !== undefined) {
      const fig = figs[s.at], pl = placeOf(n, s.at, free);
      if (!isFinite(at.x)) { put({ fold: FOLD_IDS[(FOLD_IDS.indexOf(s.fold) + 1) % FOLD_IDS.length] }); api.sfx.tick(); return; }
      let best = s.fold, far = 1e9;
      for (const id of FOLD_IDS) for (const e of endsOf(fig, id, pl)) {
        const d = Math.hypot(e[0] - at.x, e[1] - at.y);
        if (d < far) { far = d; best = id; }
      }
      if (best !== s.fold) api.sfx.tick();
      put({ fold: best });
      return;
    }
    if (pay && pay.img) {
      const row0 = Math.round((DOT3[1] - BAY.y) / BAY.sq);
      let col, row;
      if (isFinite(at.x)) {
        col = Math.round((at.x - BAY.x) / BAY.sq);
        row = Math.round((at.y - BAY.y) / BAY.sq);
      } else {
        /* the keyboard (Enter or Space on the dot) steps it one square further behind the line each
           press, level with the dot: first against the line, then 2, 3, 4 … and round again */
        const cur = sRef.current.img;
        const dx = cur && cur[1] === 0 && cur[0] < BAY.cols - 10 ? cur[0] + 1 : 1;
        col = 10 + dx;
        row = row0;
      }
      col = Math.min(BAY.cols, Math.max(11, col));
      row = Math.min(BAY.rows, Math.max(0, row));
      api.sfx.tick();
      freshRef.current = true;
      put({ img: [col - 10, row - row0] });
      return;
    }
    if (pay && pay.bar) { api.sfx.tick(); put({ lying: true }); }
  });

  /* ── the agent and the dev driver reach the working area here ── */
  HOOK.set = (v: any) => {
    const t = String(v === null || v === undefined ? "" : v);
    if (kind === "place") {
      const m = /^(-?\d+):(-?\d+)$/.exec(t);
      if (!m) return false;
      const nx = [Number(m[1]), Number(m[2])];
      valRef.current = nx[0] + ":" + nx[1];
      freshRef.current = true;
      put({ img: nx });
      return true;
    }
    if (kind === "pick") {
      const picks = t.toUpperCase().split("").filter((x) => (item.tray || []).includes(x));
      if (!picks.length) return false;
      valRef.current = picks.slice().sort().join("");
      freshRef.current = true;
      put({ chosen: picks, shown: picks[picks.length - 1] });
      return true;
    }
    return false;
  };
  const runsNow = (st: any) => {
    if (st.ph === 3) return { label: "Strings run", now: st.strands.length, all: index === 0 ? 1 : index === 1 ? 3 : 2 };
    if (st.ph === 4) return item.tray ? { label: "Letters tried", now: st.tried.seen ? st.tried.seen.length : 0, all: item.tray.length }
      : { label: "Mirrors set", now: 1 + (st.lying ? 1 : 0), all: 2 };
    const f = (st.figs || [])[st.at];
    return { label: "Folds kept", now: f ? (st.kept[f] || []).length : 0, all: f ? st.tried[f] || 0 : 0 };
  };

  /* ── the traceback: the maths redrawn, ending on the whole right answer ── */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    const steps: any[] = [];
    if (kind === "fold") {
      const fig = item.fig, fits = foldsThatFit(fig);
      const show = fits.length ? fits[0] : item.start;
      steps.push([260, () => { put({ fold: show }); setAnim(null); }]);
      [0.5, 0, -0.5, -1].forEach((c) => steps.push([130, () => setAnim({ fig, c, fits: fits.length > 0 })]));
      steps.push([700, () => {
        setAnim(fits.length ? null : { fig, c: -1, fits: false });
        setDemo({ folds: fits, note: fits.length ? (index === 1 ? "Down the middle" : "Halves match") : "Part sticks out" });
      }]);
    } else if (kind === "count") {
      const fig = P2_FIGS[item.at], fits = foldsThatFit(fig);
      steps.push([200, () => { put({ at: item.at }); setDemo(null); }]);
      FOLD_IDS.forEach((id) => {
        const good = fits.includes(id);
        steps.push([170, () => { put({ fold: id }); setAnim({ fig, c: -1, fits: good }); }]);
        steps.push([good ? 300 : 210, () => setAnim(null)]);
      });
      /* the line is left on a fold that keeps (never on the last place tried, which does not fit), so
         the Fold the miss line invites turns one of the shown lines into the child's own kept line */
      steps.push([600, () => { put({ fold: fits.length ? fits[0] : "vmid" }); setDemo({ folds: fits, count: fits.length, note: "" }); }]);
    } else if (kind === "place") {
      steps.push([420, () => setDemo({ strand: true })]);
      steps.push([760, () => setDemo({ strand: true, beyond: true })]);
      steps.push([700, () => setDemo({ strand: true, beyond: true, image: true })]);
    } else if (kind === "tri") {
      steps.push([420, () => setDemo({ strand: true })]);
      steps.push([820, () => setDemo({ strand: true, beyond: true })]);
      steps.push([700, () => setDemo({ strand: true, beyond: true, image: true })]);
    } else if (kind === "rr") {
      steps.push([420, () => setDemo({ strand: true, beyond: true })]);
      steps.push([860, () => setDemo({ strand: true, beyond: true, image: true, note: "Turned the other way" })]);
    } else if (kind === "pick") {
      steps.push([320, () => setDemo({ rows: true, only: 1 })]);
      steps.push([620, () => setDemo({ rows: true, only: 2 })]);
      steps.push([620, () => setDemo({ rows: true, only: 9 })]);
    } else if (kind === "which") {
      /* the lying mirror is laid on the demo layer only: the child's own mirror stays theirs */
      steps.push([360, () => setDemo({ both: true })]);
      steps.push([820, () => setDemo({ both: true, note: "Same in lying mirror" })]);
    }
    steps.push([160, () => {}]);
    tl.run(steps, () => api.lock(false));
  }, [wrong]);

  /* the closing of phase 2 names the square, so the square folds its four lines while it is said:
     a demo-only layer, cleared by the child's next act, and gone when the tool walks on */
  useEffect(() => {
    if (stage !== "idle" || n !== 2 || free) return;
    const fits = foldsThatFit("square");
    /* the table clears for a beat, then the square grows in: never a swap between two frames */
    const steps: any[] = [[260, () => {}],
      [80, () => setDemo({ sq: [], grow: 0.45 })],
      [80, () => setDemo({ sq: [], grow: 0.75 })],
      [260, () => setDemo({ sq: [], grow: 1 })]];
    fits.forEach((id, i) => {
      steps.push([300, () => setDemo({ sq: fits.slice(0, i), sqFold: id, sqTurn: true, grow: 1 })]);
      steps.push([340, () => setDemo({ sq: fits.slice(0, i + 1), sqFold: id, grow: 1 })]);
    });
    tl.run(steps);
  }, [stage]);

  /* what the host and the agent read back (toolApi.getState) */
  const activeFig = figs[s.at] || null;
  api.share({
    figure: activeFig, foldLine: s.fold,
    foldsKept: activeFig ? keptOf(activeFig).length : 0,
    mirrorShape: s.ph === 3 ? (index === 0 ? "dot" : index === 1 ? "triangle" : "letter") : null,
    imageCorners: s.img ? 1 : 0,
    letter: s.shown, mirrorKind: s.lying ? "lying" : "upright",
  });

  const invite = (x: number, y: number) => <Invite x={x} y={y} r={44} C={C} />;
  const ready = stage === "ask" && !wrong && !tl.busy;

  /* ── the table of paper figures (phases 1 and 2, and Free play) ── */
  if (kind === "fold" || kind === "count" || kind === "free") {
    const table = n === 1 && !free ? T1 : T2;
    const fig = figs[s.at], pl = placeOf(n, s.at, free);
    const ends = endsOf(fig, s.fold, pl);
    const foldKey = n === 1 && !free ? { x: 800, y: 200, w: 220, h: 110 } : { x: 443, y: 420, w: 200, h: 96 };
    const demoFolds = demo && demo.folds ? demo.folds : [];
    const sq = demo && demo.sq ? demo : null;
    return (
      <g>
        <RunsBox r={runsNow(s)} C={C} lang={lang} tx={tx} />
        <rect x={table.x} y={table.y} width={table.w} height={table.h} rx={RAD.panel} fill={C.panel} stroke={C.rule} strokeWidth={2} />
        {sq && <Paper fig="square" pl={{ cx: SQ_PL.cx, cy: SQ_PL.cy, sc: SQ_PL.sc * (sq.grow || 1) }} kept={sq.sq}
          fold={sq.sqFold || "vmid"} anim={sq.sqTurn ? { fig: "square", c: -1, fits: true } : null} C={C} />}
        {!sq && figs.map((f: string, k: number) => {
          const p = placeOf(n, k, free), on = k === s.at;
          const showKept = on && demoFolds.length ? demoFolds : keptOf(f);
          return (
            <g key={f}>
              <Paper fig={f} pl={p} kept={showKept} fold={on ? s.fold : showKept[0] || "vmid"} anim={on ? anim : null} C={C} ghost={!on} />
              {(n === 2 || free) && <Tally x={P2_AT[k] - 75} y={326} kept={showKept} count={on && demo && demo.count !== undefined ? demo.count : null} C={C} />}
              {!on && <Hit id={"shape-" + f} x={p.cx - 75} y={p.cy - 75} w={150} h={150} label={"move the fold line onto this shape"}
                onPress={() => { if (tl.busy) return; touched(); put({ at: k, fold: "vmid" }); api.sfx.tick(); }} />}
            </g>
          );
        })}
        {/* the note clears the fold line's lowest handle, wherever the line happens to lie */}
        {n === 1 && !free && demo && demo.note && (
          <text pointerEvents="none" x={pl.cx} y={Math.min(514, Math.max(pl.cy + 140, ends[0][1], ends[1][1]) + 51)} textAnchor="middle"
            fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(demo.note)}</text>
        )}
        {!sq && ends.map((e: number[], k: number) => (
          <g key={k} {...control("fold-" + (k ? "b" : "a"), "fold line end")} {...drag.bind({ grip: k })} {...drag.keys({ grip: k })} className="c4-piece">
            <rect x={e[0] - 36} y={e[1] - 36} width={72} height={72} fill="transparent" />
            <circle cx={e[0]} cy={e[1]} r={17} fill={SKY} stroke={shade(SKY, 0.35)} strokeWidth={3} />
          </g>
        ))}
        <Key id="fold-go" label={tx("Fold the paper")} x={foldKey.x} y={foldKey.y} w={foldKey.w} h={foldKey.h} C={C} primary
          onClick={() => doFold()}>
          <text y={14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill="#FFFFFF">{tx("Fold")}</text>
        </Key>
        {ready && !tl.busy && triedOf(fig) === 0 && invite(ends[1][0], ends[1][1])}
      </g>
    );
  }

  /* ── the mirror bay (phase 3) ── */
  if (kind === "place" || kind === "tri" || kind === "rr") {
    const rowY = DOT3[1];
    const corners = kind === "place" ? [DOT3] : kind === "tri" ? TRI3 : [[RRL[0] + 16, RRL[1]], [RRR[0] + 16, RRR[1]]];
    const imgAt = s.img ? [MIRX + s.img[0] * BAY.sq, rowY + s.img[1] * BAY.sq] : [1010, 250];
    const rightAns = kind === "place" ? [MIRX + 4 * BAY.sq, rowY] : null;
    const shownStrands = demo && demo.strand ? corners.map((_: any, i: number) => i) : s.strands;
    return (
      <g>
        <RunsBox r={runsNow(s)} C={C} lang={lang} tx={tx} />
        <Squares C={C} lying={null} />
        {kind === "tri" && <polygon points={poly(TRI3)} fill={FIG} fillOpacity={0.9} stroke={shade(FIG, 0.25)} strokeWidth={3} strokeLinejoin="round" />}
        {kind === "tri" && demo && demo.image && (
          <polygon pointerEvents="none" points={poly(TRI3.map((c: number[]) => [2 * MIRX - c[0], c[1]]))} fill={SKY} fillOpacity={0.85} stroke={shade(SKY, 0.35)} strokeWidth={3} strokeLinejoin="round" />
        )}
        {kind === "rr" && <Glyph letter="R" x={RRL[0] - 16} y={RRL[1]} s={1.5} colour={FIG} />}
        {kind === "rr" && <Glyph letter="R" x={RRR[0] - 16} y={RRR[1]} s={1.5} colour={FIG} />}
        {kind === "rr" && demo && demo.image && <Glyph letter="R" x={RRR[0] - 16} y={RRR[1] + 150} s={1.5} colour={SKY} flipX />}
        {kind === "rr" && demo && demo.image && <Glyph letter="R" x={RRL[0] - 16} y={RRL[1] + 150} s={1.5} colour={FIG} />}
        {shownStrands.map((i: number) => (
          <Strand key={i} at={corners[i]} beyond={!!(demo && demo.beyond)} label={!!(demo && demo.beyond)} C={C} />
        ))}
        {corners.map((c: number[], i: number) => (
          <g key={i}>
            <circle cx={c[0]} cy={c[1]} r={12} fill={PIN} />
            <Hit id={"corner-" + i} x={c[0] - 36} y={c[1] - 36} w={72} h={72} label="run the string from this corner"
              onPress={() => { if (tl.busy) return; touched(); if (!s.strands.includes(i)) { api.sfx.tick(); put({ strands: [...s.strands, i] }); } }} />
          </g>
        ))}
        {kind === "place" && demo && demo.image && rightAns && <circle pointerEvents="none" cx={rightAns[0]} cy={rightAns[1]} r={11} fill={SKY} stroke={shade(SKY, 0.35)} strokeWidth={3} />}
        {kind === "place" && !s.img && <rect x={964} y={204} width={92} height={92} rx={16} fill={tint(C.panel, 0.45)} stroke={C.rule} strokeWidth={2} />}
        {kind === "place" && (
          <g {...control("image-dot", "the mirror image")} {...drag.bind({ img: true })} {...drag.keys({ img: true })} className="c4-piece">
            <rect x={imgAt[0] - 36} y={imgAt[1] - 36} width={72} height={72} fill="transparent" />
            <circle cx={imgAt[0]} cy={imgAt[1]} r={17} fill={SKY} stroke={shade(SKY, 0.35)} strokeWidth={3} />
          </g>
        )}
        {demo && demo.note && <text pointerEvents="none" x={543} y={504} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(demo.note)}</text>}
        {ready && kind === "place" && !s.img && invite(imgAt[0], imgAt[1])}
        {ready && kind !== "place" && !s.strands.length && invite(corners[0][0], corners[0][1])}
      </g>
    );
  }

  /* ── letters by the mirrors (phase 4) ── */
  const tray = item.tray || [];
  const seen = (s.tried.seen || []) as string[];
  const lyingY = 262;
  const stood = s.shown || tray[0] || item.letter;
  const rows = demo && demo.rows;
  /* the child's own lying mirror, or the one the correction lays on its demo layer */
  const laid = s.lying || !!(demo && demo.both);
  const same = String(item.answer || "").split("");
  const turned = tray.filter((x: string) => !same.includes(x));
  const pairAt = (list: string[], y: number) => list.map((x, i) => {
    const px = 543 - (list.length * 150) / 2 + i * 150 + 26;
    return (
      <g key={x + y}>
        <Glyph letter={x} x={px} y={y} s={0.78} colour={FIG} />
        <line x1={px + 52} y1={y - 4} x2={px + 52} y2={y + 70} stroke={AXIS} strokeWidth={4} strokeDasharray="9 8" strokeLinecap="round" />
        <Glyph letter={x} x={px + 56} y={y} s={0.78} colour={SKY} flipX />
      </g>
    );
  });
  return (
    <g>
      <RunsBox r={runsNow(s)} C={C} lang={lang} tx={tx} />
      <rect x={150} y={16} width={786} height={408} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      {!rows && <line x1={MIRX} y1={40} x2={MIRX} y2={330} stroke={AXIS} strokeWidth={6} strokeDasharray="14 11" strokeLinecap="round" />}
      {!rows && laid && <line pointerEvents="none" x1={380} y1={lyingY} x2={700} y2={lyingY} stroke={AXIS} strokeWidth={6} strokeDasharray="14 11" strokeLinecap="round" />}
      {!rows && stood && <Glyph letter={stood} x={417} y={105} s={1.6} colour={FIG} />}
      {!rows && stood && <Glyph letter={stood} x={573} y={105} s={1.6} colour={SKY} flipX />}
      {!rows && stood && laid && <Glyph letter={stood} x={417} y={285} s={1.6} colour={SKY} flipY />}
      {!rows && demo && demo.both && <rect pointerEvents="none" x={409} y={277} width={112} height={150} rx={14} fill="none" stroke={C.accent} strokeWidth={5} />}
      {!rows && demo && demo.note && <text pointerEvents="none" x={465} y={452} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(demo.note)}</text>}
      {rows && (
        <g pointerEvents="none">
          <text x={186} y={104} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("same")}</text>
          {demo.only >= 1 && pairAt(same, 60)}
          <text x={186} y={264} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("turned")}</text>
          {demo.only >= 2 && pairAt(turned, 220)}
        </g>
      )}
      {kind === "which" && !s.lying && (
        <g {...control("mirror-bar", "the mirror that lies across")} {...drag.bind({ bar: true })} {...drag.keys({ bar: true })} className="c4-piece">
          <rect x={814} y={164} width={72} height={72} fill="transparent" />
          <rect x={790} y={186} width={120} height={26} rx={8} fill={SKY} stroke={shade(SKY, 0.35)} strokeWidth={3} />
        </g>
      )}
      {tray.map((x: string, i: number) => {
        const cx = 543 - ((tray.length - 1) * 120) / 2 + i * 120;
        const on = s.chosen.includes(x);
        return (
          <g key={x}>
            <rect x={cx - 45} y={440} width={90} height={88} rx={14} fill="#FFFFFF" stroke={on ? AXIS : C.rule} strokeWidth={on ? 5 : 2} />
            <Glyph letter={x} x={cx - 22} y={452} s={0.86} colour={FIG} />
            <Hit id={"letter-" + x} x={cx - 45} y={440} w={90} h={88} label={"letter " + x}
              onPress={() => {
                if (tl.busy) return;
                touched();
                api.sfx.tick();
                freshRef.current = true;
                setS((old: any) => ({ ...old, shown: x,
                  chosen: old.chosen.includes(x) ? old.chosen.filter((y: string) => y !== x) : [...old.chosen, x],
                  tried: { ...old.tried, seen: (old.tried.seen || []).includes(x) ? old.tried.seen : [...(old.tried.seen || []), x] } }));
              }} />
          </g>
        );
      })}
      {ready && kind === "which" && !s.lying && invite(850, 199)}
      {ready && kind === "pick" && !seen.length && invite(543 - ((tray.length - 1) * 120) / 2, 484)}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last) return null;
  const txt = tx(showVal(last.value, undefined, { lang, tx }));
  if (!txt) return null;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <text x={w / 2} y={h / 2 + 2} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{txt}</text>
      <line x1={20} y1={h - 18} x2={w - 20} y2={h - 18} stroke={AXIS} strokeWidth={4} strokeDasharray="10 8" strokeLinecap="round" />
    </g>
  );
}

function FoldAndMirror(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format: showVal, fitHost: () => null }} />
  );
}

export default FoldAndMirror;
