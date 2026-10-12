/* ═══ M2.S4.T8.C28.2D1 · like_pieces_bench · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "like_pieces_bench";
const MEDIA_ID = "M2.S4.T8.C28.2D1";
const TOOL_NAME = "Like Pieces Bench";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["Two little heaps, and every piece in both of them is the same size."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every answer counted and then looked at again, which is where most of the work was.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Any two like fractions at any piece size, with the tidy rail live.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r21: `lineFor(line, lang, TR)`); the English
   everywhere else stays what the checks read. NCERT class 4 fractions: भिन्न / અપૂર્ણાંક, अंश / અંશ, हर / છેદ,
   पूर्ण / આખું, सजातीय भिन्न / સમાન છેદવાળા અપૂર્ણાંક, मिश्रित संख्या / મિશ્ર સંખ્યા, सरलतम रूप / સાદું રૂપ.
   A fraction in a spoken line is "<d> में से <n> भाग" / "<d>માંથી <n> ભાગ": the runtime says the digits as
   words and does not speak a slash. "tidy" is सँवारो / સુઘડ કરો and "reduce" is सरल करो / સાદું કરો. Digits stay
   digits. A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Like Pieces Bench": "एक जैसे टुकड़ों की बेंच",
    "Two little heaps, and every piece in both of them is the same size.": "दो छोटे ढेर, और दोनों में हर टुकड़ा एक ही आकार का है।",
    "Every answer counted and then looked at again, which is where most of the work was.": "हर उत्तर गिना गया। फिर उसे दोबारा देखा गया, यही सबसे बड़ा काम था।",
    "Free play. Any two like fractions at any piece size, with the tidy rail live.": "मुक्त खेल। किसी भी आकार के दो सजातीय भिन्न, सँवारने के चरणों के साथ।",

    "Adding the tops and nothing else": "सिर्फ़ ऊपर की संख्याएँ जोड़ना",
    "Push them together and count. Did the pieces change size when you did?": "उन्हें एक साथ धकेलो और गिनो। क्या टुकड़ों का आकार बदला?",
    "Only the number of pieces changed when they went in. What stayed the same?": "अंदर जाने पर सिर्फ़ टुकड़ों की गिनती बदली। क्या नहीं बदला?",
    "Point at each blue piece in the bar and count them. Then look up at the pinned size.": "पट्टी में हर नीले टुकड़े को छूकर गिनो। फिर ऊपर लगा आकार देखो।",
    "To add like fractions, add the upper numbers and keep the lower one. The lower number says how big each piece is.": "सजातीय भिन्न जोड़ने में ऊपर की संख्याएँ जोड़ो। नीचे वाली वही रखो। नीचे की संख्या बताती है कि हर टुकड़ा कितना बड़ा है।",
    "You learned: add the upper numbers and keep the lower one.": "तुमने सीखा: ऊपर की संख्याएँ जोड़ो, नीचे वाली वही रखो।",
    "Add 3/10 and 4/10.": "10 में से 3 भाग और 10 में से 4 भाग जोड़ो।",
    "Push, then write the sum": "धकेलो, योग लिखो",
    "What size is every piece on this bench?": "इस बेंच पर हर टुकड़ा किस आकार का है?",
    "Now 2/11 and 5/11. What do they make together?": "अब 11 में से 2 भाग और 11 में से 5 भाग। दोनों मिलकर कितने बनते हैं?",
    "Add these two": "इन दोनों को जोड़ो",
    "Count only the pieces. Their size is pinned above the bench.": "सिर्फ़ टुकड़े गिनो। उनका आकार बेंच के ऊपर लगा है।",
    "When you add two fractions that are both written in elevenths, why does the eleven stay as it is?": "दो भिन्नों का हर 11 है, और तुम उन्हें जोड़ते हो। 11 वैसा ही क्यों रहता है?",
    "Why does the bottom stay?": "नीचे की संख्या क्यों वही रहती है?",
    "Lay one piece beside another. Is either one bigger?": "एक टुकड़े को दूसरे के पास रखो। क्या कोई बड़ा है?",
    "Pieces keep size": "आकार वही रहता है",
    "Forgot to add it": "उसे जोड़ना भूल गए",
    "Eleven is odd": "ग्यारह विषम है",
    "It is too big": "वह बहुत बड़ा है",
    "same size": "वही आकार", "forgot it": "भूल गए", "odd number": "विषम संख्या", "too big": "बहुत बड़ा",

    "Taking away works the same way": "घटाना भी इसी तरह होता है",
    "Take those pieces off. What is left, and what size are they?": "उन टुकड़ों को हटाओ। कितने बचे, और वे किस आकार के हैं?",
    "The pieces you lifted are lying on the ledge. How many stayed behind?": "उठाए गए टुकड़े ताक पर रखे हैं। पीछे कितने रह गए?",
    "Count what stays in the bar, and keep the size that is pinned above it.": "पट्टी में जो बचा है उसे गिनो। उसके ऊपर लगा आकार वही रखो।",
    "To take away like fractions, take away the upper numbers and keep the lower one. It is the adding rule, backwards.": "सजातीय भिन्न घटाने में ऊपर की संख्याएँ घटाओ। नीचे वाली वही रखो। यह जोड़ने का नियम उल्टा है।",
    "You learned: take away the upper numbers, keep the lower one.": "तुमने सीखा: ऊपर की संख्याएँ घटाओ, नीचे वाली वही रखो।",
    "Find 9/14 less 4/14.": "14 में से 9 भाग हैं, इनमें से 4 भाग घटाओ।",
    "Lift away, then write it": "उठाओ, फिर लिखो",
    "How many pieces did you lift away?": "तुमने कितने टुकड़े उठाए?",
    "This time, from 7/13 take away 2/13.": "इस बार 13 में से 7 भाग हैं, इनमें से 2 भाग घटाओ।",
    "What is left?": "क्या बचा?",
    "Did lifting pieces off make the ones left any bigger?": "टुकड़े उठाने से बचे हुए टुकड़े क्या बड़े हो गए?",
    "Find 11/20 less 6/20 and reduce the answer. Tap the tidy strip to try bigger pieces.": "20 में से 11 भाग हैं, इनमें से 6 भाग घटाओ। फिर उत्तर सरल करो। बड़े टुकड़े आज़माने के लिए सँवार पट्टी को छुओ।",
    "Take away, then reduce": "घटाओ, फिर सरल करो",
    "Which bigger pieces cover the blue exactly, with none of them cut?": "कौन से बड़े टुकड़े नीले भाग को बिना कटे ठीक-ठीक ढकते हैं?",

    "When the answer is more than one whole": "जब उत्तर एक पूर्ण से बड़ा हो",
    "When the pieces fill a whole bar, tap that bar to gather it.": "जब पट्टी भर जाए, तो उसे छुओ और इकट्ठा करो।",
    "The tidy strip below can cut what is left into bigger pieces.": "नीचे की सँवार पट्टी बचे हुए को बड़े टुकड़ों में काट सकती है।",
    "How many whole ones did your heap fill, and how many pieces were over?": "तुम्हारे ढेर ने कितने पूर्ण भरे, और कितने टुकड़े बच गए?",
    "Gather each full bar, then try bigger pieces on the tidy strip for what is left.": "हर भरी पट्टी इकट्ठा करो। फिर बचे हुए के लिए सँवार पट्टी पर बड़े टुकड़े आज़माओ।",
    "If the upper number is not smaller, gather the wholes. Then write it as a mixed number.": "ऊपर की संख्या छोटी न हो, तो पूर्ण इकट्ठे करो। फिर उसे मिश्रित संख्या में लिखो।",
    "You learned: gather full wholes and write a mixed number.": "तुमने सीखा: पूर्ण इकट्ठे करो और मिश्रित संख्या लिखो।",
    "Add 8/9 and 7/9 and tidy the answer.": "9 में से 8 भाग और 9 में से 7 भाग जोड़ो। फिर उत्तर सँवारो।",
    "Add, then tidy": "जोड़ो, सँवारो",
    "How many pieces does one whole one take?": "एक पूर्ण बनाने में कितने टुकड़े लगते हैं?",
    "Add 7/10 and 9/10, then tidy what you get and write it as a mixed number.": "10 में से 7 भाग और 10 में से 9 भाग जोड़ो। फिर जो मिले उसे सँवारकर मिश्रित संख्या में लिखो।",
    "Mixed number, tidied": "सँवारी हुई मिश्रित संख्या",
    "You gathered the whole one. Now what do the two numbers left over share?": "तुमने पूर्ण इकट्ठा कर लिया। अब बची दोनों संख्याओं में क्या साझा है?",
    "Add 5/7 and 2/7 and say what the answer is worth.": "7 में से 5 भाग और 7 में से 2 भाग जोड़ो। बताओ, उत्तर कितने के बराबर है?",
    "What is it worth?": "यह कितने के बराबर है?",
    "Look at the second bar. Did any piece spill into it?": "दूसरी पट्टी देखो। क्या कोई टुकड़ा उसमें गया?",

    "Tidying what is left": "जो बचे उसे सँवारना",
    "Work each sum on the bench first.": "पहले हर सवाल बेंच पर हल करो।",
    "Then look at the answer once more. Is there anything left to do to it?": "फिर उत्तर को एक बार और देखो। क्या उसमें कुछ करना बाकी है?",
    "Do those two numbers share anything above one?": "क्या इन दोनों संख्याओं में एक से बड़ा कुछ साझा है?",
    "Take one step at a time. Gather any full bar, then try bigger pieces on the strip.": "एक बार में एक कदम चलो। भरी पट्टी इकट्ठा करो, फिर सँवार पट्टी पर बड़े टुकड़े आज़माओ।",
    "Look at every answer again before you write it down. Some need gathering, some need reducing, and some are done.": "लिखने से पहले हर उत्तर को फिर देखो। किसी को इकट्ठा करना है। किसी को सरल करना है। कोई तैयार है।",
    "You learned: look again, then gather or reduce if it needs it.": "तुमने सीखा: फिर देखो, ज़रूरत हो तो इकट्ठा या सरल करो।",
    "Find 10/12 less 4/12 and reduce the answer.": "12 में से 10 भाग हैं, इनमें से 4 भाग घटाओ। फिर उत्तर सरल करो।",
    "Take away and reduce": "घटाओ और सरल करो",
    "Is the upper number of your answer smaller than the lower one?": "क्या तुम्हारे उत्तर की ऊपर की संख्या नीचे वाली से छोटी है?",
    "Add 13/18 and 11/18, then tidy the answer as far as it will go.": "18 में से 13 भाग और 18 में से 11 भाग जोड़ो। फिर उत्तर को जितना हो सके सँवारो।",
    "Tidy it all the way": "आखिर तक सँवारो",
    "Did the pieces fill more than one whole bar?": "क्या टुकड़ों ने एक पूरी पट्टी से ज़्यादा भर दिया?",
    "A tank is 7/12 full of water and 3/12 of the tank leaks away. What fraction of the tank still holds water, in lowest terms?": "टंकी 12 में से 7 भाग पानी से भरी है। उसका 12 में से 3 भाग बह जाता है। अब टंकी का कितना भाग भरा है? सरलतम रूप में लिखो।",
    "Water left, in lowest terms": "बचा पानी, सरलतम रूप में",
    "What is the biggest number that divides both of them?": "वह सबसे बड़ी संख्या कौन-सी है जो दोनों को बाँटती है?",

    /* what the working area draws */
    "pieces": "टुकड़े", "in a whole": "एक पूर्ण में", "each piece": "हर टुकड़ा", "ledge": "ताक", "tidy strip": "सँवार पट्टी",
    "pieces keep their size": "टुकड़ों का आकार वही रहता है", "put them back": "वापस रखो",
    "gather wholes": "पूर्ण इकट्ठे करो", "reduce": "सरल करो", "all done": "सब हो गया",
    "top is smaller": "ऊपर की संख्या छोटी है", "no shared factor": "कोई साझा गुणनखंड नहीं", "no fraction left": "कोई भिन्न नहीं बचा",
    "numerator": "अंश", "denominator": "हर", "whole": "पूर्ण",
  },
  gu: {
    "Like Pieces Bench": "સરખા ટુકડાઓની બેન્ચ",
    "Two little heaps, and every piece in both of them is the same size.": "બે નાના ઢગલા, અને બંનેમાં દરેક ટુકડો એક જ માપનો છે.",
    "Every answer counted and then looked at again, which is where most of the work was.": "દરેક જવાબ ગણ્યો. પછી તેને ફરી જોયો, એ જ સૌથી મોટું કામ હતું.",
    "Free play. Any two like fractions at any piece size, with the tidy rail live.": "મુક્ત રમત. સમાન છેદવાળા બે અપૂર્ણાંક, કોઈ પણ માપે, સુઘડ પગલાં સાથે.",

    "Adding the tops and nothing else": "ફક્ત ઉપરની સંખ્યાઓ ઉમેરવી",
    "Push them together and count. Did the pieces change size when you did?": "તેમને ભેગા ધકેલો અને ગણો. શું ટુકડાઓનું માપ બદલાયું?",
    "Only the number of pieces changed when they went in. What stayed the same?": "અંદર જતાં ફક્ત ટુકડાઓની ગણતરી બદલાઈ. શું ન બદલાયું?",
    "Point at each blue piece in the bar and count them. Then look up at the pinned size.": "પટ્ટીમાં દરેક વાદળી ટુકડા પર આંગળી મૂકીને ગણો. પછી ઉપર લગાવેલું માપ જુઓ.",
    "To add like fractions, add the upper numbers and keep the lower one. The lower number says how big each piece is.": "સમાન છેદવાળા અપૂર્ણાંક ઉમેરવા ઉપરની સંખ્યાઓ ઉમેરો. નીચેની એ જ રાખો. નીચેની સંખ્યા કહે છે કે દરેક ટુકડો કેટલો મોટો છે.",
    "You learned: add the upper numbers and keep the lower one.": "તમે શીખ્યા: ઉપરની સંખ્યાઓ ઉમેરો, નીચેની એ જ રાખો.",
    "Add 3/10 and 4/10.": "10માંથી 3 ભાગ અને 10માંથી 4 ભાગ ઉમેરો.",
    "Push, then write the sum": "ધકેલો, સરવાળો લખો",
    "What size is every piece on this bench?": "આ બેન્ચ પર દરેક ટુકડો કેટલા માપનો છે?",
    "Now 2/11 and 5/11. What do they make together?": "હવે 11માંથી 2 ભાગ અને 11માંથી 5 ભાગ. બંને મળીને કેટલા થાય?",
    "Add these two": "આ બંનેને ઉમેરો",
    "Count only the pieces. Their size is pinned above the bench.": "ફક્ત ટુકડા ગણો. તેમનું માપ બેન્ચની ઉપર લગાવેલું છે.",
    "When you add two fractions that are both written in elevenths, why does the eleven stay as it is?": "બે અપૂર્ણાંકોનો છેદ 11 છે, અને તમે તેમને ઉમેરો છો. 11 એ જ કેમ રહે છે?",
    "Why does the bottom stay?": "નીચેની સંખ્યા કેમ એ જ રહે છે?",
    "Lay one piece beside another. Is either one bigger?": "એક ટુકડાને બીજાની પાસે મૂકો. શું કોઈ મોટો છે?",
    "Pieces keep size": "માપ એ જ રહે છે",
    "Forgot to add it": "ઉમેરવાનું ભૂલી ગયા",
    "Eleven is odd": "અગિયાર એકી છે",
    "It is too big": "તે બહુ મોટું છે",
    "same size": "એ જ માપ", "forgot it": "ભૂલી ગયા", "odd number": "એકી સંખ્યા", "too big": "બહુ મોટું",

    "Taking away works the same way": "બાદ કરવાનું પણ આ જ રીતે થાય છે",
    "Take those pieces off. What is left, and what size are they?": "તે ટુકડા કાઢી લો. કેટલા બચ્યા, અને તે કયા માપના છે?",
    "The pieces you lifted are lying on the ledge. How many stayed behind?": "ઉપાડેલા ટુકડા છાજલી પર પડ્યા છે. પાછળ કેટલા રહ્યા?",
    "Count what stays in the bar, and keep the size that is pinned above it.": "પટ્ટીમાં જે રહ્યા તે ગણો. તેની ઉપર લગાવેલું માપ એ જ રાખો.",
    "To take away like fractions, take away the upper numbers and keep the lower one. It is the adding rule, backwards.": "સમાન છેદવાળા અપૂર્ણાંક બાદ કરવા ઉપરની સંખ્યાઓ બાદ કરો. નીચેની એ જ રાખો. આ ઉમેરવાનો નિયમ ઊંધો છે.",
    "You learned: take away the upper numbers, keep the lower one.": "તમે શીખ્યા: ઉપરની સંખ્યાઓ બાદ કરો, નીચેની એ જ રાખો.",
    "Find 9/14 less 4/14.": "14માંથી 9 ભાગ છે, તેમાંથી 4 ભાગ બાદ કરો.",
    "Lift away, then write it": "ઉપાડો, પછી લખો",
    "How many pieces did you lift away?": "તમે કેટલા ટુકડા ઉપાડ્યા?",
    "This time, from 7/13 take away 2/13.": "આ વખતે 13માંથી 7 ભાગ છે, તેમાંથી 2 ભાગ બાદ કરો.",
    "What is left?": "શું બચ્યું?",
    "Did lifting pieces off make the ones left any bigger?": "ટુકડા ઉપાડવાથી બાકીના ટુકડા શું મોટા થઈ ગયા?",
    "Find 11/20 less 6/20 and reduce the answer. Tap the tidy strip to try bigger pieces.": "20માંથી 11 ભાગ છે, તેમાંથી 6 ભાગ બાદ કરો. પછી જવાબ સાદો કરો. મોટા ટુકડા અજમાવવા સુઘડ પટ્ટીને અડો.",
    "Take away, then reduce": "બાદ કરો, પછી સાદું કરો",
    "Which bigger pieces cover the blue exactly, with none of them cut?": "કયા મોટા ટુકડા વાદળી ભાગને કાપ્યા વગર બરાબર ઢાંકે છે?",

    "When the answer is more than one whole": "જ્યારે જવાબ એક આખા કરતાં મોટો હોય",
    "When the pieces fill a whole bar, tap that bar to gather it.": "જ્યારે પટ્ટી ભરાઈ જાય, ત્યારે તેને અડીને ભેગી કરો.",
    "The tidy strip below can cut what is left into bigger pieces.": "નીચેની સુઘડ પટ્ટી બાકી રહેલાને મોટા ટુકડામાં કાપી શકે છે.",
    "How many whole ones did your heap fill, and how many pieces were over?": "તમારા ઢગલાએ કેટલા આખા ભર્યા, અને કેટલા ટુકડા વધ્યા?",
    "Gather each full bar, then try bigger pieces on the tidy strip for what is left.": "દરેક ભરેલી પટ્ટી ભેગી કરો. પછી બાકી રહેલા માટે સુઘડ પટ્ટી પર મોટા ટુકડા અજમાવો.",
    "If the upper number is not smaller, gather the wholes. Then write it as a mixed number.": "ઉપરની સંખ્યા નાની ન હોય, તો આખા ભેગા કરો. પછી તેને મિશ્ર સંખ્યામાં લખો.",
    "You learned: gather full wholes and write a mixed number.": "તમે શીખ્યા: આખા ભેગા કરો અને મિશ્ર સંખ્યા લખો.",
    "Add 8/9 and 7/9 and tidy the answer.": "9માંથી 8 ભાગ અને 9માંથી 7 ભાગ ઉમેરો. પછી જવાબ સુઘડ કરો.",
    "Add, then tidy": "ઉમેરો, સુઘડ કરો",
    "How many pieces does one whole one take?": "એક આખું બનાવવા કેટલા ટુકડા લાગે?",
    "Add 7/10 and 9/10, then tidy what you get and write it as a mixed number.": "10માંથી 7 ભાગ અને 10માંથી 9 ભાગ ઉમેરો. પછી જે મળે તેને સુઘડ કરીને મિશ્ર સંખ્યામાં લખો.",
    "Mixed number, tidied": "સુઘડ કરેલી મિશ્ર સંખ્યા",
    "You gathered the whole one. Now what do the two numbers left over share?": "તમે આખું ભેગું કરી લીધું. હવે બાકી રહેલી બંને સંખ્યાઓમાં સહિયારું શું છે?",
    "Add 5/7 and 2/7 and say what the answer is worth.": "7માંથી 5 ભાગ અને 7માંથી 2 ભાગ ઉમેરો. કહો, જવાબ કેટલા બરાબર છે?",
    "What is it worth?": "તે કેટલા બરાબર છે?",
    "Look at the second bar. Did any piece spill into it?": "બીજી પટ્ટી જુઓ. શું કોઈ ટુકડો તેમાં ગયો?",

    "Tidying what is left": "જે બાકી રહે તેને સુઘડ કરવું",
    "Work each sum on the bench first.": "પહેલાં દરેક દાખલો બેન્ચ પર ગણો.",
    "Then look at the answer once more. Is there anything left to do to it?": "પછી જવાબને ફરી એક વાર જુઓ. શું તેમાં કંઈ કરવાનું બાકી છે?",
    "Do those two numbers share anything above one?": "શું આ બંને સંખ્યાઓમાં એકથી મોટું કંઈ સહિયારું છે?",
    "Take one step at a time. Gather any full bar, then try bigger pieces on the strip.": "એક વારમાં એક પગલું લો. કોઈ ભરેલી પટ્ટી ભેગી કરો. પછી સુઘડ પટ્ટી પર મોટા ટુકડા અજમાવો.",
    "Look at every answer again before you write it down. Some need gathering, some need reducing, and some are done.": "લખતાં પહેલાં દરેક જવાબ ફરી જુઓ. કોઈને ભેગા કરવા પડે. કોઈને સાદા કરવા પડે. કોઈ તૈયાર હોય.",
    "You learned: look again, then gather or reduce if it needs it.": "તમે શીખ્યા: ફરી જુઓ, જરૂર હોય તો ભેગા કે સાદા કરો.",
    "Find 10/12 less 4/12 and reduce the answer.": "12માંથી 10 ભાગ છે, તેમાંથી 4 ભાગ બાદ કરો. પછી જવાબ સાદો કરો.",
    "Take away and reduce": "બાદ કરો, સાદું કરો",
    "Is the upper number of your answer smaller than the lower one?": "શું તમારા જવાબની ઉપરની સંખ્યા નીચેની કરતાં નાની છે?",
    "Add 13/18 and 11/18, then tidy the answer as far as it will go.": "18માંથી 13 ભાગ અને 18માંથી 11 ભાગ ઉમેરો. પછી જવાબ બને તેટલો સુઘડ કરો.",
    "Tidy it all the way": "છેલ્લે સુધી સુઘડ કરો",
    "Did the pieces fill more than one whole bar?": "શું ટુકડાઓએ એક આખી પટ્ટીથી વધુ ભરી દીધું?",
    "A tank is 7/12 full of water and 3/12 of the tank leaks away. What fraction of the tank still holds water, in lowest terms?": "ટાંકી 12માંથી 7 ભાગ પાણીથી ભરેલી છે. ટાંકીનો 12માંથી 3 ભાગ વહી જાય છે. હવે ટાંકીનો કેટલો ભાગ ભરેલો છે? સાદા રૂપમાં લખો.",
    "Water left, in lowest terms": "બચેલું પાણી, સાદા રૂપમાં",
    "What is the biggest number that divides both of them?": "બંનેને ભાગી શકે એવી સૌથી મોટી સંખ્યા કઈ છે?",

    /* what the working area draws */
    "pieces": "ટુકડા", "in a whole": "એક આખામાં", "each piece": "દરેક ટુકડો", "ledge": "છાજલી", "tidy strip": "સુઘડ પટ્ટી",
    "pieces keep their size": "ટુકડાનું માપ એ જ રહે છે", "put them back": "પાછા મૂકો",
    "gather wholes": "આખા ભેગા કરો", "reduce": "સાદું કરો", "all done": "બધું પૂરું",
    "top is smaller": "ઉપરની સંખ્યા નાની છે", "no shared factor": "કોઈ સહિયારો અવયવ નથી", "no fraction left": "કોઈ અપૂર્ણાંક બાકી નથી",
    "numerator": "અંશ", "denominator": "છેદ", "whole": "આખું",
  },
};

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   items   three a phase: qid = the plan's question id; kind = add | take | why;
           d = the pinned piece size, a and b = the two upper numbers; tidy = the tidy strip is out;
           answer = the slot's parts (SLOT_FRACTION [n, d] or SLOT_MIXED [whole, n, d], null = empty) */
const PHASES = [
  {
    n: 1,
    concept: "Adding the tops and nothing else",
    conceptId: "M2.S4.T8.C28", objectiveIds: ["O13"],
    says: ["Push them together and count. Did the pieces change size when you did?"],
    /* rung 2 is the tool's own words: the plan's rung ("Did pushing them together change that size?")
       is a near copy of the teach line, and the voice never repeats itself */
    ladder: ["Only the number of pieces changed when they went in. What stayed the same?",
      "Point at each blue piece in the bar and count them. Then look up at the pinned size."],
    closing: "To add like fractions, add the upper numbers and keep the lower one. The lower number says how big each piece is.",
    learned: "You learned: add the upper numbers and keep the lower one.",
    traceback: "The heaps are pushed together again slowly with the pinned size lit, the count climbs while the size holds, the child's fraction is laid on a second bar, and the right fraction is written beside the bench.",
    items: [
      /* learn ML1: answer in the plan = 7/10 */
      { qid: "M2.S4.T8.C28:ML1", kind: "add", d: 10, a: 3, b: 4, parts: SLOT_FRACTION, answer: [7, 10], winMs: 2600,
        say: "Add 3/10 and 4/10.", ask: "Push, then write the sum", miss: "What size is every piece on this bench?" },
      /* practice 1: answer in the plan = 7/11 */
      { qid: "M2.S4.T8.C28:1", kind: "add", d: 11, a: 2, b: 5, parts: SLOT_FRACTION, answer: [7, 11], winMs: 2600,
        say: "Now 2/11 and 5/11. What do they make together?", ask: "Add these two", miss: "Count only the pieces. Their size is pinned above the bench." },
      /* practice 2: answer in the plan = Because the eleven says how big each piece is, and putting
         pieces together does not change their size  (a word answer, so the pad offers choices) */
      { qid: "M2.S4.T8.C28:2", kind: "why", d: 11, a: 2, b: 5, answer: "same size", winMs: 2600,
        /* the id is what the slot shows the child, so each one reads as a short answer */
        choices: [{ id: "same size", label: "Pieces keep size" }, { id: "forgot it", label: "Forgot to add it" },
          { id: "odd number", label: "Eleven is odd" }, { id: "too big", label: "It is too big" }],
        say: "When you add two fractions that are both written in elevenths, why does the eleven stay as it is?",
        ask: "Why does the bottom stay?", miss: "Lay one piece beside another. Is either one bigger?" },
    ],
  },
  {
    n: 2,
    concept: "Taking away works the same way",
    conceptId: "M2.S4.T8.C29", objectiveIds: ["O13"],
    says: ["Take those pieces off. What is left, and what size are they?"],
    /* rung 2 is the tool's own words: the plan's rung ends on the teach line's own words */
    ladder: ["The pieces you lifted are lying on the ledge. How many stayed behind?",
      "Count what stays in the bar, and keep the size that is pinned above it."],
    closing: "To take away like fractions, take away the upper numbers and keep the lower one. It is the adding rule, backwards.",
    learned: "You learned: take away the upper numbers, keep the lower one.",
    traceback: "The marked pieces are lifted onto the ledge one at a time with the pinned size lit and the pieces left are counted; then the child's own fraction is laid out on a bench of its own and the right fraction is written beside the bench, or, where the answer still has to be reduced, the tidy strip re-cuts what is left into bigger pieces and the rail writes the difference, the station it did not need with its reason, and the reduced answer beside them.",
    items: [
      /* learn ML2: answer in the plan = 5/14 */
      { qid: "M2.S4.T8.C29:ML2", kind: "take", d: 14, a: 9, b: 4, parts: SLOT_FRACTION, answer: [5, 14], winMs: 2600,
        say: "Find 9/14 less 4/14.", ask: "Lift away, then write it", miss: "How many pieces did you lift away?" },
      /* practice 3: answer in the plan = 5/13 */
      { qid: "M2.S4.T8.C29:3", kind: "take", d: 13, a: 7, b: 2, parts: SLOT_FRACTION, answer: [5, 13], winMs: 2600,
        say: "This time, from 7/13 take away 2/13.", ask: "What is left?", miss: "Did lifting pieces off make the ones left any bigger?" },
      /* practice 4: answer in the plan = 5/20, which reduces to 1/4 */
      { qid: "M2.S4.T8.C29:4", kind: "take", d: 20, a: 11, b: 6, tidy: true, parts: SLOT_FRACTION, answer: [1, 4], winMs: 4600,
        say: "Find 11/20 less 6/20 and reduce the answer. Tap the tidy strip to try bigger pieces.",
        ask: "Take away, then reduce", miss: "Which bigger pieces cover the blue exactly, with none of them cut?" },
    ],
  },
  {
    n: 3,
    concept: "When the answer is more than one whole",
    conceptId: "M2.S4.T8.C30", objectiveIds: ["O14"],
    says: ["When the pieces fill a whole bar, tap that bar to gather it.",
      "The tidy strip below can cut what is left into bigger pieces."],
    ladder: ["How many whole ones did your heap fill, and how many pieces were over?",
      "Gather each full bar, then try bigger pieces on the tidy strip for what is left."],
    closing: "If the upper number is not smaller, gather the wholes. Then write it as a mixed number.",
    learned: "You learned: gather full wholes and write a mixed number.",
    traceback: "The sum is worked again slowly, a full bar is gathered into one green whole, and the rail writes the sum, the gathered reading and the reduced reading beside it with rose ties, ending on the tidied answer.",
    items: [
      /* learn ML3: answer in the plan = 15/9, which is 5/3, and that is 1 2/3 */
      { qid: "M2.S4.T8.C30:ML3", kind: "add", d: 9, a: 8, b: 7, tidy: true, parts: SLOT_MIXED, answer: [1, 2, 3], winMs: 4600,
        say: "Add 8/9 and 7/9 and tidy the answer.", ask: "Add, then tidy", miss: "How many pieces does one whole one take?" },
      /* practice 5: answer in the plan = 16/10, which reduces to 8/5, and that is 1 3/5 */
      { qid: "M2.S4.T8.C30:5", kind: "add", d: 10, a: 7, b: 9, tidy: true, parts: SLOT_MIXED, answer: [1, 3, 5], winMs: 4600,
        /* the plan's question asks for a mixed number and its answer is the reduced one, so the words
           ask for the tidying too, and the miss points at the step that is actually missing */
        say: "Add 7/10 and 9/10, then tidy what you get and write it as a mixed number.", ask: "Mixed number, tidied",
        miss: "You gathered the whole one. Now what do the two numbers left over share?" },
      /* practice 6: answer in the plan = 7/7, which is exactly one whole */
      { qid: "M2.S4.T8.C30:6", kind: "add", d: 7, a: 5, b: 2, tidy: true, parts: SLOT_MIXED, answer: [1, null, null], winMs: 4200,
        say: "Add 5/7 and 2/7 and say what the answer is worth.", ask: "What is it worth?",
        miss: "Look at the second bar. Did any piece spill into it?" },
    ],
  },
  {
    n: 4,
    concept: "Tidying what is left",
    conceptId: "M2.S4.T8.C31", objectiveIds: ["O14"],
    says: ["Work each sum on the bench first.", "Then look at the answer once more. Is there anything left to do to it?"],
    ladder: ["Do those two numbers share anything above one?",
      "Take one step at a time. Gather any full bar, then try bigger pieces on the strip."],
    closing: "Look at every answer again before you write it down. Some need gathering, some need reducing, and some are done.",
    learned: "You learned: look again, then gather or reduce if it needs it.",
    traceback: "The sum is worked again, the rail reads it at every station, runs the ones it needs and greys the rest with the reason printed, and ends on the tidied answer beside the untidied one.",
    items: [
      /* learn ML4: answer in the plan = 6/12, which reduces to 1/2 */
      { qid: "M2.S4.T8.C31:ML4", kind: "take", d: 12, a: 10, b: 4, tidy: true, parts: SLOT_MIXED, answer: [null, 1, 2], winMs: 4600,
        say: "Find 10/12 less 4/12 and reduce the answer.", ask: "Take away and reduce",
        miss: "Is the upper number of your answer smaller than the lower one?" },
      /* practice 7: answer in the plan = 24/18, which reduces to 4/3, and that is 1 1/3 */
      { qid: "M2.S4.T8.C31:7", kind: "add", d: 18, a: 13, b: 11, tidy: true, parts: SLOT_MIXED, answer: [1, 1, 3], winMs: 5200,
        say: "Add 13/18 and 11/18, then tidy the answer as far as it will go.", ask: "Tidy it all the way",
        miss: "Did the pieces fill more than one whole bar?" },
      /* practice 8: answer in the plan = 4/12, which is 1/3 */
      { qid: "M2.S4.T8.C31:8", kind: "take", d: 12, a: 7, b: 3, tidy: true, parts: SLOT_MIXED, answer: [null, 1, 3], winMs: 4600,
        say: "A tank is 7/12 full of water and 3/12 of the tank leaks away. What fraction of the tank still holds water, in lowest terms?",
        ask: "Water left, in lowest terms", miss: "What is the biggest number that divides both of them?" },
    ],
  },
];

/* ── the bench: one whole is BAR_W long, so a piece's length IS its size ──────────────────── */
const BAR_W = 840;               /* one whole one, every bar and the tidy strip */
const BAR_H = 56;
const PIECE_H = 44;              /* every piece is this tall: only its length says how big it is */
const HEAP_W = 535;              /* each loose heap's half of the bench */
const ANS_X = 960;               /* the right column: a written answer stands here */
const ROW = { heaps: 86, bar1: 198, bar2: 272, strip: 350, rail: 432 };
const LP_BLUE = CONTENT.hundred; /* the parts a fraction counts */
const LP_AMBER = CONTENT.ten;    /* the parts of that same whole it leaves */
const LP_GREEN = CONTENT.one;    /* a whole one, gathered */
const LP_ROSE = CONTENT.bead;    /* a second writing of an amount already on the bench */
const LP_EMPTY = tint(CONTENT.ten, 0.78);

const lpbPw = (d: number) => BAR_W / d;
const lpbPerRow = (d: number) => Math.max(1, Math.floor(463 / (lpbPw(d) + 4)));
const lpbCap = (d: number) => Math.min(d, 2 * lpbPerRow(d));
/* the rulings the tidy strip tries: every way this whole cuts evenly, biggest pieces last */
const lpbCuts = (d: number) => { const out: number[] = []; for (let r = d; r >= 1; r--) if (d % r === 0) out.push(r); return out; };
const lpbHcf = (x: number, y: number): number => (y === 0 ? x : lpbHcf(y, x % y));
const lpbSetup = (it: any) => ({ kind: it.kind || "add", d: it.d || 8, a: it.a || 0, b: it.b || 0,
  op: it.kind === "take" ? "take" : "add", tidy: !!it.tidy, free: !!it.free });
const lpbRaw = (c: any) => (c.op === "take" ? c.a - c.b : c.a + c.b);

/* The numbers the working area needs, kept for the sidecar. */
const MODEL = { wholeLength: BAR_W, pieceHeight: PIECE_H, rows: ROW,
  colours: { pieces: LP_BLUE, leftOver: LP_AMBER, whole: LP_GREEN, secondWriting: LP_ROSE } };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: the slot's parts must match (a null part must stay empty); the why item is a word choice */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};

/* oracle: every answer re-derived from the words of the question itself (not from the bench, the
   slot or judge): the two fractions are read out of `say`, the upper numbers put together or taken
   away, whole ones counted off one at a time, and the rest reduced by Euclid's taking-away method. */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "why") return it.choices.filter((c: any) => c.id === it.answer).length === 1 && /why does the eleven/i.test(it.say);
  const re = /(\d+)\s*\/\s*(\d+)/g, fr: number[][] = [];
  let m: any = re.exec(it.say);
  while (m) { fr.push([Number(m[1]), Number(m[2])]); m = re.exec(it.say); }
  if (fr.length !== 2 || fr[0][1] !== fr[1][1]) return false;
  const den = fr[0][1], takes = /less|away|leaks/i.test(it.say);
  if (it.d !== den || it.a !== fr[0][0] || it.b !== fr[1][0] || (it.kind === "take") !== takes) return false;
  const top = takes ? fr[0][0] - fr[1][0] : fr[0][0] + fr[1][0];
  let whole = 0, left = top;
  while (left >= den) { left -= den; whole += 1; }
  let x = left, y = den;
  while (x > 0 && y > 0 && x !== y) { if (x > y) x -= y; else y -= x; }
  const f = left ? x : 1;
  const want = it.parts.length === 2
    ? (/reduce|lowest/i.test(it.say) ? [left / f, den / f] : [top, den])
    : [whole || null, left ? left / f : null, left ? den / f : null];
  return want.length === it.answer.length && want.every((z: any, k: number) => z === it.answer[k]);
}));

/* the most likely wrong answer (this item's misconception); judge must reject it */
const nearMiss = (item: any) => {
  if (item.kind === "why") return "forgot";                       /* the eleven was simply forgotten */
  if (!item.parts) return "~";
  const raw = item.kind === "take" ? item.a - item.b : item.a + item.b;
  if (item.parts.length === 3) return `|${raw}|${item.d}`;        /* left as it came out of the sum */
  if (item.tidy) return `${raw}|${item.d}`;                       /* never looked at again */
  return item.kind === "take" ? `${raw}|0` : `${raw}|${2 * item.d}`; /* the lower numbers worked on too */
};

/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => {
  if (!item.parts) return ["Pieces keep size"];
  const a = item.answer, w = a.length === 3 ? a[0] : null, n = a[a.length - 2], d = a[a.length - 1];
  const out: string[] = [];
  if (n && d) {
    out.push(`${n}/${d}`, fractionWords(n, d));
    if (w) out.push(`${w} ${n}/${d}`, `${words(w)} and ${fractionWords(n, d)}`);
  } else if (w) out.push(`${w} whole`, `${words(w)} whole`);
  return out;
};

/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => T.submit(item.answer);
/* every answer is written in the slot, so the agent types it and Enter sends it */
const answer = () => undefined;
const check = () => (HOOK.check ? HOOK.check() : undefined);

const LPB_CSS = `
.lpb-move{transition:transform 300ms cubic-bezier(.3,.7,.25,1)}
.lpb-grab{cursor:grab}
.lpb-tap{cursor:pointer}
.lpb-fade{animation:lpbIn 420ms ease-out both}
@keyframes lpbIn{from{opacity:0}to{opacity:1}}
@media (prefers-reduced-motion:reduce){.lpb-move{transition:none}.lpb-fade{animation:none}}
`;

/* a fraction the way the book writes it: the upper number over a level line over the lower number,
   centred on cx with the line at y; a whole number stands upright beside it (a mixed number) */
function LpbNum({ cx, y, whole, n, d, size, wsize, fill }: any) {
  const ws = wsize || size;
  const hasF = n !== null && n !== undefined && n !== "";
  const hasW = whole !== null && whole !== undefined && whole !== "";
  const fw = hasF ? Math.max(String(n).length, String(d).length) * size * 0.6 + 12 : 0;
  const ww = hasW ? String(whole).length * ws * 0.62 : 0;
  const gap = hasW && hasF ? size * 0.34 : 0;
  const x0 = cx - (ww + gap + fw) / 2;
  const fx = x0 + ww + gap + fw / 2;
  return (
    <g>
      {hasW && <text x={x0 + ww / 2} y={y + ws * 0.36} textAnchor="middle" fontSize={ws} fontWeight={700} fill={fill}>{whole}</text>}
      {hasF && (
        <g>
          <text x={fx} y={y - size * 0.3} textAnchor="middle" fontSize={size} fontWeight={700} fill={fill}>{n}</text>
          <rect x={fx - fw / 2} y={y - 2} width={fw} height={4} rx={2} fill={fill} />
          <text x={fx} y={y + size} textAnchor="middle" fontSize={size} fontWeight={700} fill={fill}>{d}</text>
        </g>
      )}
    </g>
  );
}

/* one loose piece: the same rounded blue tile everywhere on this bench */
function LpbPiece({ x, y, w, paint, base }: any) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={PIECE_H} rx={7} fill={`url(#${paint || "gHundred"})`} stroke={shade(base || LP_BLUE, 0.35)} strokeWidth={2} />
      <path d={`M ${x + 8} ${y + 6} H ${x + Math.max(10, w - 8)}`} stroke="#FFFFFF" strokeOpacity={0.5} strokeWidth={3} strokeLinecap="round" />
    </g>
  );
}

/* ── the working area: 1086 x 528, origin at its top-left ────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const busy = tl.busy;
  const free = stage === "free";
  const [cfg, setCfg] = useState<any>(() => lpbSetup(item || {}));
  const [gen, setGen] = useState(0);                  /* a fresh set of pieces (no flight from the old item) */
  const [moved, setMoved] = useState(0);              /* add: pieces pushed into the bars */
  const [lifted, setLifted] = useState(0);            /* take: marked pieces lifted onto the ledge */
  const [gathered, setGathered] = useState(0);        /* whole bars gathered into one green whole */
  const [ruling, setRuling] = useState<number>(() => lpbSetup(item || {}).d);
  const [touchedStrip, setTouchedStrip] = useState(false);
  const [rail, setRail] = useState(0);                /* how far the answer has walked the tidy rail */
  const [cnt, setCnt] = useState<number | null>(null); /* the running count, once it may be shown */
  const [hi, setHi] = useState<number | null>(null);
  const [lit, setLit] = useState(false);              /* the pinned size, lit */
  const [shown, setShown] = useState(false);          /* the right fraction, written beside the bench */
  const [cmp, setCmp] = useState<any>(null);          /* the child's own fraction, laid on a second bar */
  const [same, setSame] = useState(false);            /* two pieces laid side by side: the same size */
  const setupFor = useRef<number>(index);
  const dragFrom = useRef<any>(null);

  api.onEnter(null);

  const d = cfg.d, pw = lpbPw(d), raw = lpbRaw(cfg);
  const wholes = Math.floor(raw / d), rem = raw - wholes * d;
  const acted = cfg.op === "add" ? moved >= cfg.a + cfg.b : lifted >= cfg.b;
  const fullBars = cfg.op === "add" ? Math.floor(moved / d) : 0;
  const nBars = cfg.op === "add" && (cfg.tidy || free || raw > d) ? 2 : 1;
  const stripOn = cfg.tidy || free;
  const markX = (cfg.a - cfg.b) * pw;

  const reset = (it: any) => {
    tl.stop();
    const c = lpbSetup(it);
    setCfg(c); setGen((g) => g + 1);
    setMoved(0); setLifted(0); setGathered(0); setRuling(c.d); setTouchedStrip(false);
    setRail(0); setCnt(null); setHi(null); setLit(false); setShown(false); setCmp(null); setSame(false);
    api.lock(false);
  };
  useEffect(() => {
    if (stage === "ask" && setupFor.current !== index) { setupFor.current = index; reset(item); }
  }, [stage, index]);
  /* free play (the plan's freePlay): any two like fractions at any piece size, the tidy rail live */
  useEffect(() => {
    if (!free) return;
    setupFor.current = -2;
    reset({ kind: "add", d: 8, a: 3, b: 4, free: true, tidy: true });
  }, [free]);

  /* ── the bench moving ── */
  const actSteps = (c: any, from: number, ms: number, counting: boolean) => {
    const S: any[] = [];
    if (c.op === "add") {
      for (let j = from; j < c.a + c.b; j++) {
        const k = j + 1;
        S.push([ms, () => { setMoved(k); if (counting) setCnt(k); api.sfx.tick(); }]);
      }
    } else {
      for (let j = from; j < c.b; j++) {
        const k = j + 1;
        S.push([ms, () => { setLifted(k); api.sfx.tick(); }]);
      }
      if (counting) {
        for (let k = 0; k < c.a - c.b; k++) { const kk = k; S.push([ms, () => { setHi(kk); setCnt(kk + 1); }]); }
        S.push([ms, () => setHi(null)]);
      }
    }
    return S;
  };
  /* the answer walks the tidy rail: a station it needs runs, one it does not is greyed with its reason */
  const tidySteps = (c: any, ms: number) => {
    const r0 = lpbRaw(c), w0 = Math.floor(r0 / c.d), m0 = r0 - w0 * c.d;
    const best = m0 ? c.d / lpbHcf(m0, c.d) : c.d;
    const S: any[] = [];
    if (w0 > 0) S.push([ms, () => { setGathered(w0); api.sfx.tick(); }]);
    S.push([ms, () => setRail(1)], [ms, () => setRail(2)]);
    if (m0 > 0) lpbCuts(c.d).filter((r) => r >= best).forEach((r) => S.push([ms, () => setRuling(r)]));
    S.push([ms, () => setRail(3)], [ms, () => { setRail(4); setCnt(r0); }]);
    return S;
  };
  /* what the child wrote, laid out as a fraction of its own */
  const childFrac = (v: any) => {
    const np = (item.parts || []).length || 2;
    const p = slotPartsOf(v, np).map((s: string) => (s === "" ? 0 : Number(s)));
    const w = np === 3 ? p[0] : 0, a = p[np - 2], b = p[np - 1];
    return { n: w * b + a, d: b, whole: np === 3 ? w || null : null, a, b };
  };

  /* ── the traceback: the mathematics redrawn, ending on the whole right answer ── */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    const c = cfg, many = c.a + c.b > 12;
    const S: any[] = [
      [60, () => { setMoved(0); setLifted(0); setGathered(0); setRuling(c.d); setRail(0); setCnt(null);
        setHi(null); setShown(false); setCmp(null); setSame(false); setLit(true); }],
      [700, () => {}],
      ...actSteps(c, 0, many ? 230 : 420, true),
    ];
    if (c.kind === "why") S.push([500, () => setSame(true)], [700, () => {}]);
    else if (c.tidy) S.push(...tidySteps(c, 750), [400, () => {}]);
    else S.push([700, () => setCmp(childFrac(wrong.value))], [900, () => setShown(true)], [400, () => {}]);
    tl.run(S, () => api.lock(false));
  }, [wrong]);

  /* ── the win: the bench finishes the working, then writes what it reads ── */
  useEffect(() => {
    if (stage !== "win") return;
    const c = cfg;
    const S: any[] = [...actSteps(c, c.op === "add" ? moved : lifted, 70, false)];
    if (c.kind === "why") S.push([300, () => { setSame(true); setCnt(lpbRaw(c)); }]);
    else if (c.tidy && rail < 4) S.push(...tidySteps(c, 330));
    else S.push([250, () => { setCnt(lpbRaw(c)); setShown(!c.tidy); }]);
    tl.run(S);
  }, [stage]);

  /* ── what the child does ── */
  const liveNow = (stage === "ask" || free) && !busy;
  const canAct = liveNow && !acted;
  const act = () => { if (!canAct) return; tl.run(actSteps(cfg, cfg.op === "add" ? moved : lifted, cfg.op === "add" ? 150 : 220, false)); };
  const canGather = liveNow && acted && fullBars > gathered;
  const gather = () => { if (!canGather) return; setGathered(fullBars); api.sfx.tick(); };
  const canStrip = liveNow && acted && stripOn && rem > 0;
  const nextCut = () => {
    if (!canStrip) return;
    const cs = lpbCuts(d), r = cs[(cs.indexOf(ruling) + 1) % cs.length];
    setRuling(r); setTouchedStrip(true);
    if ((rem * r) % d === 0) api.sfx.tick();
  };
  /* free play only: the piece size, and how many pieces each heap starts with */
  const canSize = free && !busy && moved === 0;
  const resize = (dd: number) => {
    if (!canSize) return;
    const nd = Math.min(20, Math.max(2, d + dd)), cap = lpbCap(nd);
    setCfg({ ...cfg, d: nd, a: Math.min(cfg.a, cap), b: Math.min(cfg.b, cap) });
    setRuling(nd); setGen((g) => g + 1); api.sfx.tick();
  };
  const more = (h: number) => {
    if (!canSize) return;
    const cap = lpbCap(d);
    setCfg(h === 0 ? { ...cfg, a: (cfg.a % cap) + 1 } : { ...cfg, b: (cfg.b % cap) + 1 });
    setGen((g) => g + 1); api.sfx.tick();
  };
  const clear = () => { if (!free) return; tl.stop(); setMoved(0); setGathered(0); setRuling(d); setRail(0); setCnt(null); setTouchedStrip(false); };

  const heapBox = (h: number) => {
    const per = lpbPerRow(d), count = h === 0 ? cfg.a : cfg.b;
    return { x: h * (HEAP_W + 16) + 72, y: ROW.heaps - 4, w: Math.max(96, Math.min(count, per) * (pw + 4) + 12), h: 104 };
  };
  const heapSpot = (h: number, k: number) => {
    const per = lpbPerRow(d), count = h === 0 ? cfg.a : cfg.b, rows = Math.ceil(count / per);
    return { x: h * (HEAP_W + 16) + 80 + (k % per) * (pw + 4), y: (rows > 1 ? ROW.heaps : ROW.heaps + 26) + Math.floor(k / per) * (PIECE_H + 8) };
  };
  const barSpot = (j: number) => ({ x: (j % d) * pw + 2, y: (Math.floor(j / d) ? ROW.bar2 : ROW.bar1) + 6 });

  const drag = useDrag((pay: any, p: any, mv: boolean) => {
    if (!mv) { act(); return; }
    if (pay.src === "heap") {
      const onBar = p.x >= 0 && p.x <= BAR_W && p.y >= ROW.bar1 - 20 && p.y <= ROW.bar2 + BAR_H + 20;
      const onOther = p.y >= ROW.heaps - 20 && p.y <= ROW.heaps + 120 && (pay.h === 0 ? p.x > HEAP_W : p.x < HEAP_W);
      if (onBar || onOther) act();
    } else if (pay.src === "mark" && p.y > ROW.bar1 + BAR_H - 10 && p.y < ROW.strip + BAR_H) act();
  });
  const dg = drag.drag;
  if (dg && !dragFrom.current) dragFrom.current = { x: dg.x, y: dg.y };
  if (!dg) dragFrom.current = null;
  const off = dg && dg.moved && dragFrom.current ? { x: dg.x - dragFrom.current.x, y: dg.y - dragFrom.current.y, src: dg.payload.src, h: dg.payload.h } : null;

  HOOK.check = () => undefined;

  /* ── what the host and the teacher agent can read back ── */
  api.share({
    pieceSize: d, first: [cfg.a, d], second: [cfg.b, d], operation: cfg.op,
    pushed: acted, wholesGathered: gathered, tidyPieces: ruling, tidied: free ? acted && !busy : rail >= 4,
    heapCount: stage === "win" || stage === "idle" || free ? raw : null,
    complete: stage === "idle",
  });

  /* ── drawing ── */
  const pieces: any[] = [];
  if (cfg.op === "add") {
    for (let j = 0; j < cfg.a + cfg.b; j++) {
      const inBar = j < moved;
      if (inBar && Math.floor(j / d) < gathered) continue;
      const h = j < cfg.a ? 0 : 1, s = inBar ? barSpot(j) : heapSpot(h, j < cfg.a ? j : j - cfg.a);
      pieces.push({ id: j, x: s.x, y: s.y, heap: inBar ? -1 : h, held: !inBar && off && off.src === "heap" && off.h === h });
    }
  } else {
    for (let j = 0; j < cfg.a; j++) {
      const up = j >= cfg.a - lifted, s = barSpot(j), marked = j >= cfg.a - cfg.b;
      pieces.push({ id: j, x: s.x, y: up ? ROW.bar2 + 6 : s.y, heap: -1, held: !up && marked && off && off.src === "mark" });
    }
  }

  const railStep = free ? (acted && !busy ? 4 : 0) : rail;
  const hcf = rem ? lpbHcf(rem, d) : 1;
  const fin = [wholes || null, rem ? rem / hcf : null, rem ? d / hcf : null];
  const stations = [
    { x: 142, w: 300, title: "gather wholes", run: wholes > 0, val: [wholes, rem || null, rem ? d : null], why: "top is smaller" },
    { x: 454, w: 300, title: "reduce", run: rem > 0 && hcf > 1, val: fin, why: rem ? "no shared factor" : "no fraction left" },
    { x: 766, w: 320, title: "all done", run: true, val: fin, why: "" },
  ];

  const cutWidth = BAR_W / ruling;
  const stripFits = acted && rem > 0 && (rem * ruling) % d === 0;
  const stripPieces = stripFits ? (rem * ruling) / d : 0;

  const hb = heapBox(1);
  /* after a miss the correction stands on the bench and the rail: the only thing left to do is to
     write the answer, so nothing is invited (a tap here would undo a piece the traceback just set) */
  const invite = stage !== "ask" || busy || wrong ? null
    : !acted ? (cfg.op === "add" ? { x: hb.x + hb.w / 2, y: ROW.heaps + 48, r: 56 } : { x: markX + (cfg.b * pw) / 2, y: ROW.bar1 + 28, r: 50 })
      : n === 3 && fullBars > gathered ? { x: BAR_W / 2, y: ROW.bar1 + 28, r: 60 }
        : (n === 3 || (n === 2 && cfg.tidy)) && canStrip && !touchedStrip ? { x: BAR_W / 2, y: ROW.strip + 28, r: 56 }
          : null;

  /* free play has nothing to get right, so the count runs there as the pieces go in */
  const top = cnt !== null ? String(cnt) : free && acted ? String(raw) : null;
  const runW = Math.max(String(top || "").length, String(d).length, 2) * T.label * 0.6 + 12;
  const quiet = mix(C.ink, "#FFFFFF", 0.25);

  return (
    <g>
      <style>{LPB_CSS}</style>

      {/* the running count, in the runs zone (64,108): the pieces on the bench over the pieces one
          whole takes. The top stays an empty cell until the child has answered: the bench never
          counts the answer out for them. */}
      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        {lit && <rect x={84 - runW / 2 - 6} y={-52} width={runW + 12} height={32} rx={8} fill={tint(LP_AMBER, 0.55)} />}
        {top === null
          ? <rect x={84 - 22} y={-88} width={44} height={26} rx={7} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="7 6" />
          : <text x={84} y={-56 - T.label * 0.3} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{top}</text>}
        <rect x={84 - runW / 2} y={-58} width={runW} height={4} rx={2} fill={C.ink} />
        <text x={84} y={-56 + T.label} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{d}</text>
        <text x={320} y={-64} textAnchor="end" fontSize={T.micro} fontWeight={500} fill={quiet}>{tx("pieces")}</text>
        <text x={320} y={-26} textAnchor="end" fontSize={T.micro} fontWeight={500} fill={quiet}>{tx("in a whole")}</text>
      </g>

      {/* the piece size, pinned above the bench: nothing on this bench can change it */}
      <g>
        <rect x={0} y={0} width={440} height={72} rx={16} fill={lit ? tint(LP_AMBER, 0.72) : "url(#gPanel)"}
          stroke={lit ? shade(LP_AMBER, 0.12) : C.rule} strokeWidth={lit ? 4 : 2} />
        <circle cx={20} cy={17} r={7} fill={C.ink} />
        <path d={`M 20 17 V 31`} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
        <text x={38} y={46} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("each piece")}</text>
        <LpbPiece x={200} y={14} w={Math.min(pw - 4, 158)} />
        <LpbNum cx={404} y={36} n={1} d={d} size={T.label} fill={C.ink} />
      </g>

      {/* what the question laid out: the two heaps, or the heap with a second fraction marked in it */}
      {cfg.op === "add" ? (
        <g>
          <LpbNum cx={36} y={ROW.heaps + 48} n={cfg.a} d={d} size={T.label} fill={C.ink} />
          <text x={HEAP_W + 8} y={ROW.heaps + 60} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>+</text>
          <LpbNum cx={HEAP_W + 52} y={ROW.heaps + 48} n={cfg.b} d={d} size={T.label} fill={C.ink} />
        </g>
      ) : (
        <g>
          <LpbNum cx={36} y={ROW.heaps + 48} n={cfg.a} d={d} size={T.label} fill={C.ink} />
          <text x={markX + (cfg.b * pw) / 2 - 52} y={ROW.heaps + 60} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>−</text>
          <LpbNum cx={markX + (cfg.b * pw) / 2} y={ROW.heaps + 48} n={cfg.b} d={d} size={T.label} fill={C.ink} />
        </g>
      )}

      {/* the empty whole ones standing behind the bench, each cut into the pinned number of parts */}
      {Array.from({ length: nBars }).map((_, k) => {
        const y = k ? ROW.bar2 : ROW.bar1, whole = k < gathered;
        const isFull = cfg.op === "add" && moved >= (k + 1) * d;
        return (
          <g key={"bar" + k}>
            <rect x={0} y={y} width={BAR_W} height={BAR_H} rx={10} fill="#FFFFFF" stroke={C.ink} strokeWidth={2.5} />
            {!whole && Array.from({ length: d }).map((_, i) => (
              <rect key={i} x={i * pw + 2} y={y + 6} width={pw - 4} height={PIECE_H} rx={7} fill={LP_EMPTY} />
            ))}
            {!whole && Array.from({ length: d - 1 }).map((_, i) => (
              <line key={"c" + i} x1={(i + 1) * pw} y1={y} x2={(i + 1) * pw} y2={y + BAR_H} stroke={C.ink} strokeWidth={2} />
            ))}
            {whole && <rect className="lpb-fade" x={2} y={y + 6} width={BAR_W - 4} height={PIECE_H} rx={8} fill="url(#gOne)" stroke={shade(LP_GREEN, 0.3)} strokeWidth={2} />}
            {(isFull || whole) && (
              <path d={`M 2 ${y - 4} V ${y - 14} H ${BAR_W - 2} V ${y - 4}`} fill="none" stroke={LP_GREEN} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
            )}
          </g>
        );
      })}

      {/* taking away: the second fraction outlined inside the heap, and the ledge it goes to */}
      {cfg.op === "take" && (
        <g>
          <rect x={markX - 6} y={ROW.bar2} width={cfg.b * pw + 12} height={BAR_H} rx={10} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          <text x={markX + cfg.b * pw + 26} y={ROW.bar2 + 38} fontSize={T.micro} fontWeight={500} fill={quiet}>{tx("ledge")}</text>
          <rect x={markX - 1} y={ROW.bar1 - 5} width={cfg.b * pw + 2} height={BAR_H + 10} rx={12} fill="none"
            stroke={C.ink} strokeWidth={3} strokeDasharray="10 7" />
        </g>
      )}

      {/* the tidy strip: the same amount, cut a different way, until the pieces come out even */}
      {stripOn && (
        <g>
          {/* the strip is exactly one whole long, like the bars, but framed in the chrome accent and
              cut paler: it is where a reading is tried again, not another whole one on the bench */}
          <rect x={0} y={ROW.strip} width={BAR_W} height={BAR_H} rx={10} fill="#FFFFFF" stroke={C.accent} strokeWidth={3.5} />
          {Array.from({ length: ruling }).map((_, i) => (
            <rect key={i} x={i * cutWidth + 2} y={ROW.strip + 6} width={cutWidth - 4} height={PIECE_H} rx={7} fill={tint(LP_AMBER, 0.88)} />
          ))}
          {stripFits && Array.from({ length: stripPieces }).map((_, i) => (
            <LpbPiece key={"s" + i} x={i * cutWidth + 2} y={ROW.strip + 6} w={cutWidth - 4} />
          ))}
          {acted && rem > 0 && !stripFits && (
            <rect x={2} y={ROW.strip + 6} width={(rem / d) * BAR_W - 4} height={PIECE_H} rx={7}
              fill="url(#gHundred)" stroke={shade(LP_BLUE, 0.35)} strokeWidth={2} />
          )}
          {Array.from({ length: ruling - 1 }).map((_, i) => (
            <line key={"k" + i} x1={(i + 1) * cutWidth} y1={ROW.strip} x2={(i + 1) * cutWidth} y2={ROW.strip + BAR_H} stroke={C.ink} strokeWidth={2} />
          ))}
          <text x={ANS_X} y={ROW.strip + 38} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("tidy strip")}</text>
        </g>
      )}

      {/* the child's own fraction, laid out on a bench of its own; neither bench is marked */}
      {cmp && (
        <g className="lpb-fade">
          <rect x={0} y={ROW.strip} width={BAR_W} height={BAR_H} rx={10} fill="#FFFFFF" stroke={C.ink} strokeWidth={2.5}
            strokeDasharray={cmp.d > 0 && cmp.d <= 40 ? undefined : "11 8"} />
          {cmp.d > 0 && cmp.d <= 40 && Array.from({ length: cmp.d }).map((_, i) => (
            <rect key={i} x={i * (BAR_W / cmp.d) + 2} y={ROW.strip + 6} width={Math.max(3, BAR_W / cmp.d - 4)} height={PIECE_H}
              rx={Math.min(7, BAR_W / cmp.d / 3)} fill={i < cmp.n ? `url(#gHundred)` : LP_EMPTY} />
          ))}
          <LpbNum cx={ANS_X} y={ROW.strip + 28} whole={cmp.whole} n={cmp.a} d={cmp.b} size={T.label} fill={C.ink} />
        </g>
      )}

      {/* the pieces themselves */}
      <g filter="url(#fShadowSoft)">
        {pieces.map((p) => (
          <g key={"g" + gen + "-" + p.id} className={p.held ? "" : "lpb-move"} pointerEvents="none"
            style={{ transform: `translate(${p.x + (p.held && off ? off.x : 0)}px, ${p.y + (p.held && off ? off.y : 0)}px)` } as any}>
            <LpbPiece x={0} y={0} w={pw - 4} />
            {hi === p.id && <rect x={-4} y={-4} width={pw + 4} height={PIECE_H + 8} rx={10} fill="none" stroke={C.accent} strokeWidth={4} />}
          </g>
        ))}
      </g>

      {/* two pieces laid side by side: putting them together changed nothing about their size */}
      {same && (
        <g className="lpb-fade">
          {[0, cfg.a].map((j) => (
            <g key={"sm" + j}>
              <path d={`M ${barSpot(j).x} ${ROW.bar1 + BAR_H} V ${ROW.strip + 6}`} stroke={C.rule} strokeWidth={2} strokeDasharray="6 6" />
              <LpbPiece x={barSpot(j).x} y={ROW.strip + 6} w={pw - 4} />
            </g>
          ))}
          <text x={(cfg.a + 1) * pw + 26} y={ROW.strip + 38} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("pieces keep their size")}</text>
        </g>
      )}

      {/* the reading, written beside the bench and never over what the child wrote */}
      {shown && <LpbNum cx={ANS_X} y={ROW.bar1 + 28} n={raw} d={d} size={T.speech} fill={C.ink} />}

      {/* the tidy rail: the sum, then every station it went through, each writing beside the last */}
      {railStep > 0 && (
        <g className="lpb-fade">
          <rect x={0} y={ROW.rail} width={130} height={96} rx={14} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
          <LpbNum cx={65} y={ROW.rail + 50} n={raw} d={d} size={T.label} fill={C.ink} />
          {stations.map((s, k) => (railStep > k + 1 ? (
            <g key={s.title}>
              <rect x={s.x} y={ROW.rail} width={s.w} height={96} rx={14} fill={s.run ? "#FFFFFF" : mix(C.dim, "#FFFFFF", 0.72)}
                stroke={s.run ? C.ink : C.rule} strokeWidth={2} />
              <text x={s.x + 16} y={ROW.rail + 34} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(s.title)}</text>
              {s.run
                ? <LpbNum cx={s.x + s.w - (k === 2 ? 70 : 46)} y={ROW.rail + (k === 2 ? 52 : 54)} whole={s.val[0]} n={s.val[1]} d={s.val[2]}
                    size={k === 2 ? T.label : T.micro} wsize={k === 2 ? T.speech : T.label} fill={C.ink} />
                : <text x={s.x + 16} y={ROW.rail + 76} fontSize={T.micro} fontWeight={500} fill={C.ink}>{tx(s.why)}</text>}
            </g>
          ) : null))}
          {[0, 1, 2].map((k) => (railStep > k + 1 ? (
            <line key={"tie" + k} x1={(k === 0 ? 130 : stations[k - 1].x + stations[k - 1].w) - 12} y1={ROW.rail + 50}
              x2={stations[k].x + 12} y2={ROW.rail + 50} stroke={LP_ROSE} strokeWidth={8} strokeLinecap="round" />
          ) : null))}
        </g>
      )}

      {/* ── the controls: the child pushes, lifts, gathers and re-cuts the pieces themselves ── */}
      {canAct && cfg.op === "add" && [0, 1].map((h) => {
        const b = heapBox(h), pay = { src: "heap", h };
        return (
          <rect key={"hc" + h} className="lpb-grab c4-piece" x={b.x} y={b.y} width={b.w} height={b.h} fill="transparent"
            {...control("heap-" + (h + 1), h ? "Push the second heap in" : "Push the first heap in")} {...drag.bind(pay)} {...drag.keys(pay)} />
        );
      })}
      {canAct && cfg.op === "take" && (
        <rect className="lpb-grab c4-piece" x={markX - 4} y={ROW.bar1 - 8} width={cfg.b * pw + 8} height={72} fill="transparent"
          {...control("marked", "Lift the marked pieces away")} {...drag.bind({ src: "mark" })} {...drag.keys({ src: "mark" })} />
      )}
      {canGather && <Hit id="gather" label="Gather the full whole one" x={0} y={ROW.bar1 - 8} w={BAR_W} h={72} onPress={gather} />}
      {canStrip && <Hit id="strip" label="Try bigger pieces" x={0} y={ROW.strip - 8} w={BAR_W} h={72} onPress={nextCut} />}

      {free && (
        <g>
          <Key id="size-down" label="Fewer, bigger pieces in a whole" x={456} y={0} w={72} h={72} C={C} disabled={!canSize || d <= 2} onClick={() => resize(-1)}>
            <text y={14} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={canSize && d > 2 ? C.ink : quiet}>−</text>
          </Key>
          <Key id="size-up" label="More, smaller pieces in a whole" x={540} y={0} w={72} h={72} C={C} disabled={!canSize || d >= 20} onClick={() => resize(1)}>
            <text y={14} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={canSize && d < 20 ? C.ink : quiet}>+</text>
          </Key>
          <Key id="new-sum" label="Put the pieces back and start again" x={900} y={0} w={186} h={72} C={C} onClick={clear}>
            <text y={10} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("put them back")}</text>
          </Key>
          {canSize && [0, 1].map((h) => (
            <Hit key={"mh" + h} id={"more-" + (h + 1)} label={h ? "One more piece in the second heap" : "One more piece in the first heap"}
              x={h * (HEAP_W + 16)} y={ROW.heaps - 4} w={72} h={104} onPress={() => more(h)} />
          ))}
        </g>
      )}

      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer: the fraction as it was written,
   with the pieces it stands for beside it */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const L = (result && result.last) || {};
  const a = L.answer;
  if (a === null || a === undefined) return null;
  const mid = h / 2;
  const frame = <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />;
  if (!Array.isArray(a)) {
    return (
      <g>
        {frame}
        <rect x={16} y={mid - 24} width={52} height={20} rx={5} fill="url(#gHundred)" />
        <rect x={16} y={mid + 4} width={52} height={20} rx={5} fill="url(#gHundred)" />
        <text x={w - 16} y={mid + 10} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("same size")}</text>
      </g>
    );
  }
  const whole = a.length === 3 ? a[0] : null, nu = a[a.length - 2], de = a[a.length - 1];
  const bx = whole ? 54 : 16, bw = whole ? 76 : 114;
  return (
    <g>
      {frame}
      {whole && <rect x={14} y={mid - 12} width={32} height={24} rx={5} fill="url(#gOne)" />}
      {nu && de
        ? Array.from({ length: de }).map((_, i) => (
            <rect key={i} x={bx + (i * bw) / de + 1} y={mid - 12} width={bw / de - 2} height={24} rx={3} fill={i < nu ? "url(#gHundred)" : LP_EMPTY} />
          ))
        : null}
      <LpbNum cx={w - 54} y={mid} whole={whole} n={nu} d={de} size={T.micro} wsize={T.label} fill={C.ink} />
    </g>
  );
}

function LikePiecesBench(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default LikePiecesBench;
