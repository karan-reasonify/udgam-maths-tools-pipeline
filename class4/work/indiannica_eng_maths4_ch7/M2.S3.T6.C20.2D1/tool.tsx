/* ═══ M2.S3.T6.C20.2D1 · whole_ones_tray · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "whole_ones_tray";
const MEDIA_ID = "M2.S3.T6.C20.2D1";
const TOOL_NAME = "Whole Ones Tray";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A tray of whole ones, and fractions to pour into it."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every heap counted both ways, and the number below the line never moved once.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Change the part size or the heap, then pour and break as you like.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r21: `lineFor(line, lang, TR)`); the English
   everywhere else stays what the checks read. NCERT class 4 fractions: भिन्न / અપૂર્ણાંક, पूर्ण / આખું (a whole),
   पूर्ण संख्या / પૂર્ણ સંખ્યા (a whole number), मिश्रित संख्या / મિશ્ર સંખ્યા, उचित and अनुचित भिन्न / શુદ્ધ and
   અશુદ્ધ અપૂર્ણાંક, भागफल / ભાગફળ, शेषफल / શેષ. A fraction is never written with a slash in hi/gu: "b में से a भाग"
   / "bમાંથી a ભાગ" (digits stay digits: the runtime speaks them), and the sorter's three cards are not read out
   (they are on the screen). A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Whole Ones Tray": "पूर्ण की ट्रे",
    "A tray of whole ones, and fractions to pour into it.": "पूर्ण की एक ट्रे, और उसमें डालने के लिए भिन्न।",
    "Every heap counted both ways, and the number below the line never moved once.": "हर ढेर को दोनों तरह से गिना। रेखा के नीचे की संख्या एक बार भी नहीं बदली।",
    "Free play. Change the part size or the heap, then pour and break as you like.": "मुक्त खेल। भाग का आकार या ढेर बदलो, फिर जैसे चाहो डालो और तोड़ो।",

    "When the top is not the smaller one": "जब ऊपर की संख्या छोटी न हो",
    "A fraction is improper when its top number is not smaller than its bottom number.": "अनुचित भिन्न में ऊपर की संख्या नीचे की संख्या से छोटी नहीं होती।",
    "Look at the two numbers. Is the one on top smaller, or is it not?": "दोनों संख्याओं को देखो। क्या ऊपर वाली छोटी है, या नहीं?",
    "Is that one smaller than the one below it, or is it not?": "क्या वह अपने नीचे वाली से छोटी है, या नहीं?",
    "Take one card at a time. Point to the top number, then to the bottom one.": "एक बार में एक कार्ड लो। पहले ऊपर की संख्या पर उँगली रखो, फिर नीचे वाली पर।",
    "Greater or equal, both pass that test. Equal numbers make an improper fraction worth exactly one whole.": "ऊपर की संख्या बड़ी हो या बराबर, दोनों इस जाँच में पास हैं। बराबर होने पर अनुचित भिन्न ठीक एक पूर्ण के बराबर होता है।",
    "You learned: a fraction is improper when its top is not the smaller.": "तुमने सीखा: ऊपर की संख्या छोटी न हो, तो भिन्न अनुचित है।",
    "Which are improper?": "कौन से अनुचित हैं?",
    "Of 5/12, 12/5 and 7/7, drag the improper fractions down to the tray. Then press enter.": "इन तीन कार्डों में से अनुचित भिन्नों को नीचे ट्रे में खींचो। फिर एंटर दबाओ।",
    "On each card, which number is written above the line?": "हर कार्ड पर रेखा के ऊपर कौन सी संख्या लिखी है?",
    "Seven sevenths fills one circle exactly, with nothing over.": "सात सातवें भाग एक वृत्त को ठीक भर देते हैं, कुछ नहीं बचता।",
    "Sort these three": "इन तीनों को छाँटो",
    "Now 11/6, 4/13 and 5/5. Which of these are improper?": "अब ये तीन कार्ड देखो। इनमें से कौन से भिन्न अनुचित हैं?",
    "Check every card, one at a time, top number first.": "हर कार्ड को एक-एक करके जाँचो, पहले ऊपर की संख्या।",
    "Improper? Worth how much?": "अनुचित? कितने के बराबर?",
    "Is 10/10 an improper fraction, and how much is it worth?": "क्या 10 में से 10 भाग अनुचित भिन्न है? और वह कितने के बराबर है?",
    "Ten on top and ten below. Is the top one smaller?": "ऊपर दस और नीचे दस। क्या ऊपर वाली छोटी है?",
    "yes, one whole": "हाँ, एक पूर्ण",
    "yes, more than one": "हाँ, एक से ज़्यादा",
    "no, one whole": "नहीं, एक पूर्ण",
    "no, less than one": "नहीं, एक से कम",
    "yes, more": "हाँ, ज़्यादा",
    "no, less": "नहीं, कम",

    "A whole number with a part beside it": "पूर्ण संख्या और उसके साथ एक भाग",
    "A mixed number is a whole number with a proper fraction beside it.": "मिश्रित संख्या में एक पूर्ण संख्या के साथ एक उचित भिन्न होता है।",
    "Count the full ones first. Now say what is left over beside them.": "पहले पूरे वृत्त गिनो। फिर बताओ कि उनके साथ कितना बचा है।",
    "How many loose parts are lying beside them?": "उनके पास कितने खुले भाग पड़े हैं?",
    "Point to the full circles, then to the loose parts. Each one has its own place in the number.": "पूरे वृत्तों पर उँगली रखो, फिर खुले भागों पर। संख्या में हर एक की अपनी जगह है।",
    "A mixed number keeps its whole ones and its loose parts apart. A single fraction counts them all together.": "मिश्रित संख्या पूरे वृत्तों और खुले भागों को अलग रखती है। एक अकेला भिन्न सबको साथ गिनता है।",
    "You learned: a mixed number is a whole number beside a proper fraction.": "तुमने सीखा: पूर्ण संख्या के साथ उचित भिन्न मिश्रित संख्या है।",
    "Write the mixed number": "मिश्रित संख्या लिखो",
    "Read the tray and write the mixed number it holds.": "ट्रे को पढ़ो और उसमें रखी मिश्रित संख्या लिखो।",
    "Which number counts the full circles, and which counts the loose parts?": "कौन सी संख्या पूरे वृत्त गिनती है, और कौन सी खुले भाग?",
    "Which kind is it?": "यह किस प्रकार की है?",
    "Is 3 2/5 an improper fraction or a mixed number? Look at what it is made of.": "3 पूर्ण और 5 में से 2 भाग। क्या यह अनुचित भिन्न है, या मिश्रित संख्या? देखो कि यह किससे बनी है।",
    "How many whole ones are full on the tray?": "ट्रे पर कितने पूरे वृत्त भरे हैं?",
    "And this one?": "और यह?",
    "And 2 3/8? Is it a mixed number or an improper fraction?": "अब 2 पूर्ण और 8 में से 3 भाग। क्या यह मिश्रित संख्या है, या अनुचित भिन्न?",
    "Is a whole number standing beside the fraction here?": "क्या यहाँ भिन्न के साथ एक पूर्ण संख्या खड़ी है?",
    "improper fraction": "अनुचित भिन्न",
    "mixed number": "मिश्रित संख्या",
    "improper": "अनुचित",

    "Dividing to find the whole part": "भाग देकर पूर्ण संख्या ढूँढना",
    "Drag the heap onto the tray. Each pour fills one whole.": "ढेर को ट्रे पर खींचो। हर बार डालने से एक पूर्ण भरता है।",
    "How many whole ones did you fill, and how many parts were left over?": "तुमने कितने पूर्ण भरे, और कितने भाग बच गए?",
    "How many parts were still loose when it stopped?": "रुकने पर कितने भाग अब भी खुले थे?",
    "Count the pours: each one is a whole. Parts too few to fill a whole stay loose.": "डालने की गिनती करो: हर बार एक पूर्ण। एक पूर्ण भरने से कम भाग खुले रह जाते हैं।",
    "Divide the top number by the bottom one. The quotient is the whole part, the remainder is the new top, and the bottom stays.": "ऊपर की संख्या को नीचे की संख्या से भाग दो। भागफल पूर्ण संख्या है। शेषफल नई ऊपर की संख्या है, और नीचे की संख्या वही रहती है।",
    "You learned: divide top by bottom; the remainder becomes the new top.": "तुमने सीखा: ऊपर को नीचे से भाग दो; शेषफल नया ऊपर बनता है।",
    "Write it as a mixed number": "मिश्रित संख्या में लिखो",
    "Write 23/6 as a mixed number.": "6 में से 23 भाग को मिश्रित संख्या में लिखो।",
    "Count the circles that filled right round.": "जो वृत्त पूरे भर गए, उन्हें गिनो।",
    "What does it make?": "यह क्या बनता है?",
    "Now pour 45/9 and write what it makes.": "अब 9 में से 45 भाग डालो और लिखो कि क्या बनता है।",
    "After the last full pour, is anything left in the heap?": "आखिरी बार पूरा डालने के बाद, क्या ढेर में कुछ बचा है?",
    "Nothing is left over, so 45/9 is a whole number.": "कुछ नहीं बचा, इसलिए 9 में से 45 भाग एक पूर्ण संख्या है।",
    "Pour, then write it": "डालो, फिर लिखो",
    "Last one: 29/8. Pour it the same way and write it.": "आखिरी: 8 में से 29 भाग। इसे उसी तरह डालो और लिखो।",
    "How many eighths are left when no more wholes will fill?": "जब और पूर्ण नहीं भरते, तब कितने आठवें भाग बचते हैं?",

    "Going back the other way": "उलटी तरफ़ वापस जाना",
    "Tap or drag a whole one to break it along its lines.": "पूर्ण वृत्त को टैप करो या खींचो, वह अपनी रेखाओं पर टूटेगा।",
    "Break every whole one. Now count every part you are holding.": "हर पूर्ण वृत्त को तोड़ो। अब तुम्हारे पास जितने भाग हैं, सब गिनो।",
    "How many pieces do all your whole ones give between them?": "तुम्हारे सब पूर्ण वृत्त मिलकर कितने टुकड़े देते हैं?",
    "Count on by the part size for each whole, then add the loose parts.": "हर पूर्ण पर उसके भागों की गिनती जोड़ते जाओ, फिर खुले भाग जोड़ो।",
    "Multiply the whole number by the bottom number and add the top one. Write the total over that same bottom number.": "पूर्ण संख्या को नीचे वाली संख्या से गुणा करो और ऊपर वाली जोड़ो। कुल को उसी नीचे की संख्या के ऊपर लिखो।",
    "You learned: multiply, add the top, and keep the same bottom number.": "तुमने सीखा: गुणा करो, ऊपर वाली जोड़ो, नीचे की संख्या वही रखो।",
    "Write one fraction": "एक भिन्न लिखो",
    "Write 4 3/7 as a single fraction.": "4 पूर्ण और 7 में से 3 भाग को एक ही भिन्न में लिखो।",
    "How many pieces does one whole one break into?": "एक पूर्ण वृत्त कितने टुकड़ों में टूटता है?",
    "One fraction again": "फिर से एक भिन्न",
    "Now 6 2/9. Break it back and write it as one fraction.": "अब 6 पूर्ण और 9 में से 2 भाग। इसे वापस तोड़ो और एक भिन्न में लिखो।",
    "Six wholes make how many ninths altogether?": "छह पूर्ण मिलकर कुल कितने नौवें भाग बनाते हैं?",
    "Last, 5 4/6. What single fraction is it?": "आखिरी: 5 पूर्ण और 6 में से 4 भाग। यह एक भिन्न में क्या है?",
    "Count the sixths from the broken wholes first, then add the loose ones.": "पहले टूटे हुए पूर्ण से छठे भाग गिनो, फिर खुले भाग जोड़ो।",
    "Four sixths cover two thirds, so it is also 5 2/3, or 17/3.": "चार छठे भाग दो तिहाई के बराबर हैं। इसलिए यह 5 पूर्ण और दो तिहाई, या 3 में से 17 भाग है।",

    /* the working area's own words, and the answer slot's boxes */
    "improper fractions": "अनुचित भिन्न", "one whole": "एक पूर्ण", "proper": "उचित", "exactly full": "ठीक भरा",
    "quotient": "भागफल", "remainder": "शेषफल", "whole number": "पूर्ण संख्या", "proper fraction": "उचित भिन्न",
    "numerator": "अंश", "denominator": "हर", "whole": "पूर्ण",
  },
  gu: {
    "Whole Ones Tray": "આખાંની ટ્રે",
    "A tray of whole ones, and fractions to pour into it.": "આખાંની એક ટ્રે, અને તેમાં નાખવા માટે અપૂર્ણાંક.",
    "Every heap counted both ways, and the number below the line never moved once.": "દરેક ઢગલો બંને રીતે ગણ્યો. રેખા નીચેની સંખ્યા એક વાર પણ બદલાઈ નહીં.",
    "Free play. Change the part size or the heap, then pour and break as you like.": "મુક્ત રમત. ભાગનું માપ કે ઢગલો બદલો, પછી ગમે તેમ નાખો અને તોડો.",

    "When the top is not the smaller one": "જ્યારે ઉપરની સંખ્યા નાની ન હોય",
    "A fraction is improper when its top number is not smaller than its bottom number.": "અશુદ્ધ અપૂર્ણાંકમાં ઉપરની સંખ્યા નીચેની કરતાં નાની હોતી નથી.",
    "Look at the two numbers. Is the one on top smaller, or is it not?": "બંને સંખ્યાઓ જુઓ. શું ઉપરની નાની છે, કે નથી?",
    "Is that one smaller than the one below it, or is it not?": "શું તે તેની નીચેની કરતાં નાની છે, કે નથી?",
    "Take one card at a time. Point to the top number, then to the bottom one.": "એક વખતે એક કાર્ડ લો. પહેલાં ઉપરની સંખ્યા પર આંગળી મૂકો, પછી નીચેની પર.",
    "Greater or equal, both pass that test. Equal numbers make an improper fraction worth exactly one whole.": "ઉપરની સંખ્યા મોટી હોય કે સરખી, બંને આ કસોટીમાં પાસ છે. સરખી સંખ્યા હોય તો અશુદ્ધ અપૂર્ણાંક બરાબર એક આખા જેટલો હોય છે.",
    "You learned: a fraction is improper when its top is not the smaller.": "તમે શીખ્યા: ઉપરની સંખ્યા નાની ન હોય, તો અપૂર્ણાંક અશુદ્ધ છે.",
    "Which are improper?": "કયા અશુદ્ધ છે?",
    "Of 5/12, 12/5 and 7/7, drag the improper fractions down to the tray. Then press enter.": "આ ત્રણ કાર્ડમાંથી અશુદ્ધ અપૂર્ણાંકોને નીચે ટ્રેમાં ખેંચો. પછી એન્ટર દબાવો.",
    "On each card, which number is written above the line?": "દરેક કાર્ડ પર રેખાની ઉપર કઈ સંખ્યા લખેલી છે?",
    "Seven sevenths fills one circle exactly, with nothing over.": "સાત સાતમા ભાગ એક વર્તુળને બરાબર ભરી દે છે, કંઈ બચતું નથી.",
    "Sort these three": "આ ત્રણને અલગ પાડો",
    "Now 11/6, 4/13 and 5/5. Which of these are improper?": "હવે આ ત્રણ કાર્ડ જુઓ. તેમાંથી કયા અપૂર્ણાંક અશુદ્ધ છે?",
    "Check every card, one at a time, top number first.": "દરેક કાર્ડને એક પછી એક તપાસો, પહેલાં ઉપરની સંખ્યા.",
    "Improper? Worth how much?": "અશુદ્ધ? કેટલાની બરાબર?",
    "Is 10/10 an improper fraction, and how much is it worth?": "શું 10માંથી 10 ભાગ અશુદ્ધ અપૂર્ણાંક છે? અને તે કેટલાની બરાબર છે?",
    "Ten on top and ten below. Is the top one smaller?": "ઉપર દસ અને નીચે દસ. શું ઉપરની નાની છે?",
    "yes, one whole": "હા, એક આખું",
    "yes, more than one": "હા, એક કરતાં વધુ",
    "no, one whole": "ના, એક આખું",
    "no, less than one": "ના, એક કરતાં ઓછું",
    "yes, more": "હા, વધુ",
    "no, less": "ના, ઓછું",

    "A whole number with a part beside it": "પૂર્ણ સંખ્યા અને તેની બાજુમાં એક ભાગ",
    "A mixed number is a whole number with a proper fraction beside it.": "મિશ્ર સંખ્યામાં પૂર્ણ સંખ્યા સાથે એક શુદ્ધ અપૂર્ણાંક હોય છે.",
    "Count the full ones first. Now say what is left over beside them.": "પહેલાં પૂરાં વર્તુળ ગણો. પછી કહો કે તેમની બાજુમાં શું બચ્યું છે.",
    "How many loose parts are lying beside them?": "તેમની બાજુમાં કેટલા છૂટા ભાગ પડ્યા છે?",
    "Point to the full circles, then to the loose parts. Each one has its own place in the number.": "પૂરાં વર્તુળ પર આંગળી મૂકો, પછી છૂટા ભાગ પર. સંખ્યામાં દરેકની પોતાની જગ્યા છે.",
    "A mixed number keeps its whole ones and its loose parts apart. A single fraction counts them all together.": "મિશ્ર સંખ્યા પૂરાં વર્તુળ અને છૂટા ભાગને અલગ રાખે છે. એક અપૂર્ણાંક બધાંને સાથે ગણે છે.",
    "You learned: a mixed number is a whole number beside a proper fraction.": "તમે શીખ્યા: પૂર્ણ સંખ્યા સાથે શુદ્ધ અપૂર્ણાંક એટલે મિશ્ર સંખ્યા.",
    "Write the mixed number": "મિશ્ર સંખ્યા લખો",
    "Read the tray and write the mixed number it holds.": "ટ્રે વાંચો અને તેમાં રહેલી મિશ્ર સંખ્યા લખો.",
    "Which number counts the full circles, and which counts the loose parts?": "કઈ સંખ્યા પૂરાં વર્તુળ ગણે છે, અને કઈ છૂટા ભાગ?",
    "Which kind is it?": "આ કયા પ્રકારની છે?",
    "Is 3 2/5 an improper fraction or a mixed number? Look at what it is made of.": "3 આખાં અને 5માંથી 2 ભાગ. શું આ અશુદ્ધ અપૂર્ણાંક છે, કે મિશ્ર સંખ્યા? જુઓ કે તે શેની બનેલી છે.",
    "How many whole ones are full on the tray?": "ટ્રે પર કેટલાં પૂરાં વર્તુળ ભરેલાં છે?",
    "And this one?": "અને આ?",
    "And 2 3/8? Is it a mixed number or an improper fraction?": "હવે 2 આખાં અને 8માંથી 3 ભાગ. શું આ મિશ્ર સંખ્યા છે, કે અશુદ્ધ અપૂર્ણાંક?",
    "Is a whole number standing beside the fraction here?": "શું અહીં અપૂર્ણાંકની બાજુમાં પૂર્ણ સંખ્યા છે?",
    "improper fraction": "અશુદ્ધ અપૂર્ણાંક",
    "mixed number": "મિશ્ર સંખ્યા",
    "improper": "અશુદ્ધ",

    "Dividing to find the whole part": "ભાગાકાર કરીને પૂર્ણ સંખ્યા શોધવી",
    "Drag the heap onto the tray. Each pour fills one whole.": "ઢગલાને ટ્રે પર ખેંચો. દરેક વખત નાખવાથી એક આખું ભરાય છે.",
    "How many whole ones did you fill, and how many parts were left over?": "તમે કેટલાં આખાં ભર્યાં, અને કેટલા ભાગ બચ્યા?",
    "How many parts were still loose when it stopped?": "અટકી ગયું ત્યારે કેટલા ભાગ હજી છૂટા હતા?",
    "Count the pours: each one is a whole. Parts too few to fill a whole stay loose.": "નાખવાની ગણતરી કરો: દરેક વખત એક આખું. આખું ભરવા માટે ઓછા ભાગ છૂટા રહે છે.",
    "Divide the top number by the bottom one. The quotient is the whole part, the remainder is the new top, and the bottom stays.": "ઉપરની સંખ્યાને નીચેની સંખ્યાથી ભાગો. ભાગફળ પૂર્ણ સંખ્યા છે. શેષ નવી ઉપરની સંખ્યા છે, અને નીચેની સંખ્યા એ જ રહે છે.",
    "You learned: divide top by bottom; the remainder becomes the new top.": "તમે શીખ્યા: ઉપરને નીચેથી ભાગો; શેષ નવી ઉપરની સંખ્યા બને છે.",
    "Write it as a mixed number": "મિશ્ર સંખ્યામાં લખો",
    "Write 23/6 as a mixed number.": "6માંથી 23 ભાગને મિશ્ર સંખ્યામાં લખો.",
    "Count the circles that filled right round.": "જે વર્તુળ પૂરેપૂરાં ભરાયાં, તેમને ગણો.",
    "What does it make?": "આનાથી શું બને છે?",
    "Now pour 45/9 and write what it makes.": "હવે 9માંથી 45 ભાગ નાખો અને લખો કે શું બને છે.",
    "After the last full pour, is anything left in the heap?": "છેલ્લી વાર પૂરું નાખ્યા પછી, ઢગલામાં કંઈ બચ્યું છે?",
    "Nothing is left over, so 45/9 is a whole number.": "કંઈ બચ્યું નથી, તેથી 9માંથી 45 ભાગ એક પૂર્ણ સંખ્યા છે.",
    "Pour, then write it": "નાખો, પછી લખો",
    "Last one: 29/8. Pour it the same way and write it.": "છેલ્લું: 8માંથી 29 ભાગ. તેને એ જ રીતે નાખો અને લખો.",
    "How many eighths are left when no more wholes will fill?": "જ્યારે વધુ આખાં ભરાતાં નથી, ત્યારે કેટલા આઠમા ભાગ બચે છે?",

    "Going back the other way": "ઊલટી બાજુ પાછા જવું",
    "Tap or drag a whole one to break it along its lines.": "આખા વર્તુળને ટૅપ કરો કે ખેંચો, તે તેની રેખાઓ પર તૂટી જશે.",
    "Break every whole one. Now count every part you are holding.": "દરેક આખા વર્તુળને તોડો. હવે તમારી પાસેના બધા ભાગ ગણો.",
    "How many pieces do all your whole ones give between them?": "તમારાં બધાં આખાં વર્તુળ મળીને કેટલા ટુકડા આપે છે?",
    "Count on by the part size for each whole, then add the loose parts.": "દરેક આખા માટે તેના ભાગની ગણતરી ઉમેરતા જાઓ, પછી છૂટા ભાગ ઉમેરો.",
    "Multiply the whole number by the bottom number and add the top one. Write the total over that same bottom number.": "પૂર્ણ સંખ્યાને નીચેની સંખ્યાથી ગુણો અને ઉપરની સંખ્યા ઉમેરો. કુલને એ જ નીચેની સંખ્યા પર લખો.",
    "You learned: multiply, add the top, and keep the same bottom number.": "તમે શીખ્યા: ગુણો, ઉપરની સંખ્યા ઉમેરો, નીચેની સંખ્યા એ જ રાખો.",
    "Write one fraction": "એક અપૂર્ણાંક લખો",
    "Write 4 3/7 as a single fraction.": "4 આખાં અને 7માંથી 3 ભાગને એક જ અપૂર્ણાંકમાં લખો.",
    "How many pieces does one whole one break into?": "એક આખું વર્તુળ કેટલા ટુકડામાં તૂટે છે?",
    "One fraction again": "ફરી એક અપૂર્ણાંક",
    "Now 6 2/9. Break it back and write it as one fraction.": "હવે 6 આખાં અને 9માંથી 2 ભાગ. તેને પાછું તોડો અને એક અપૂર્ણાંકમાં લખો.",
    "Six wholes make how many ninths altogether?": "છ આખાં મળીને કુલ કેટલા નવમા ભાગ બને છે?",
    "Last, 5 4/6. What single fraction is it?": "છેલ્લું: 5 આખાં અને 6માંથી 4 ભાગ. તે એક અપૂર્ણાંકમાં શું છે?",
    "Count the sixths from the broken wholes first, then add the loose ones.": "પહેલાં તૂટેલાં આખાંમાંથી છઠ્ઠા ભાગ ગણો, પછી છૂટા ભાગ ઉમેરો.",
    "Four sixths cover two thirds, so it is also 5 2/3, or 17/3.": "ચાર છઠ્ઠા ભાગ બે ત્રીજા ભાગ બરાબર છે. તેથી તે 5 આખાં અને બે ત્રીજા ભાગ, કે 3માંથી 17 ભાગ છે.",

    /* the working area's own words, and the answer slot's boxes */
    "improper fractions": "અશુદ્ધ અપૂર્ણાંક", "one whole": "એક આખું", "proper": "શુદ્ધ", "exactly full": "બરાબર ભરેલું",
    "quotient": "ભાગફળ", "remainder": "શેષ", "whole number": "પૂર્ણ સંખ્યા", "proper fraction": "શુદ્ધ અપૂર્ણાંક",
    "numerator": "અંશ", "denominator": "છેદ", "whole": "આખું",
  },
};

/* the word answers: is it improper, and what is it worth · which kind of number is written */
const WO_WORTH = [
  { id: "yes1", label: "yes, one whole" },
  { id: "yesmore", label: "yes, more than one" },
  { id: "no1", label: "no, one whole" },
  { id: "noless", label: "no, less than one" },
];
const WO_KINDS = [{ id: "improper", label: "improper fraction" }, { id: "mixed", label: "mixed number" }];
/* what the slot shows for a word answer (the key's full label would spill) */
const WO_SHOWN: Record<string, string> = { yes1: "yes, one whole", yesmore: "yes, more", no1: "no, one whole",
  noless: "no, less", improper: "improper", mixed: "mixed number" };

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   items   three a phase: qid = the plan's question id, kind = what the working area does,
           ask = the short prompt above the slot (never a slash fraction: the fraction is drawn
           stacked on the working area), winSay = the tool's own line over the win motion */
const PHASES = [
  {
    n: 1,
    concept: "When the top is not the smaller one",
    conceptId: "M2.S3.T6.C20", objectiveIds: ["O9"],
    says: ["A fraction is improper when its top number is not smaller than its bottom number.",
      "Look at the two numbers. Is the one on top smaller, or is it not?"],
    ladder: ["Is that one smaller than the one below it, or is it not?",
      "Take one card at a time. Point to the top number, then to the bottom one."],
    closing: "Greater or equal, both pass that test. Equal numbers make an improper fraction worth exactly one whole.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: a fraction is improper when its top is not the smaller.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "Each card rings its larger number (both when they are equal), pours into circles cut to its own bottom number, and is tagged improper or proper; the child's sorting stays where it was put.",
    items: [
      /* learn ML1: answer in the plan = 12/5 and 7/7 are improper, and 7/7 is exactly one whole */
      { qid: "M2.S3.T6.C20:ML1", kind: "sort", cards: [[5, 12], [12, 5], [7, 7]], answer: "12/5 7/7", pad: "enter", winMs: 4800,
        ask: "Which are improper?", say: "Of 5/12, 12/5 and 7/7, drag the improper fractions down to the tray. Then press enter.",
        miss: "On each card, which number is written above the line?",
        winSay: "Seven sevenths fills one circle exactly, with nothing over." },
      /* practice 1: answer in the plan = 11/6 and 5/5 */
      { qid: "M2.S3.T6.C20:1", kind: "sort", cards: [[11, 6], [4, 13], [5, 5]], answer: "11/6 5/5", pad: "enter", winMs: 3400,
        ask: "Sort these three", say: "Now 11/6, 4/13 and 5/5. Which of these are improper?",
        miss: "Check every card, one at a time, top number first." },
      /* practice 2: answer in the plan = Yes, it is improper, and it is worth exactly one whole */
      { qid: "M2.S3.T6.C20:2", kind: "worth", cards: [[10, 10]], answer: "yes1", choices: WO_WORTH, winMs: 3200,
        ask: "Improper? Worth how much?", say: "Is 10/10 an improper fraction, and how much is it worth?",
        miss: "Ten on top and ten below. Is the top one smaller?" },
    ],
  },
  {
    n: 2,
    concept: "A whole number with a part beside it",
    conceptId: "M2.S3.T6.C21", objectiveIds: ["O9"],
    says: ["A mixed number is a whole number with a proper fraction beside it.",
      "Count the full ones first. Now say what is left over beside them."],
    ladder: ["How many loose parts are lying beside them?",
      "Point to the full circles, then to the loose parts. Each one has its own place in the number."],
    closing: "A mixed number keeps its whole ones and its loose parts apart. A single fraction counts them all together.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: a mixed number is a whole number beside a proper fraction.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "A leader runs from the whole number to the full circles and another from the fraction to the loose parts, each place labelled, and the two together are bracketed as a mixed number.",
    items: [
      /* practice 4: answer in the plan = 3 2/5, and 2/5 is the proper fraction */
      { qid: "M2.S3.T6.C21:4", kind: "write", show: [3, 2, 5], parts: SLOT_MIXED, answer: [3, 2, 5], winMs: 3200,
        ask: "Write the mixed number", say: "Read the tray and write the mixed number it holds.",
        miss: "Which number counts the full circles, and which counts the loose parts?" },
      /* learn ML2: answer in the plan = A mixed number, made of the whole number 3 beside the proper fraction 2/5 */
      { qid: "M2.S3.T6.C21:ML2", kind: "kind", show: [3, 2, 5], answer: "mixed", choices: WO_KINDS, named: true, winMs: 3200,
        ask: "Which kind is it?", say: "Is 3 2/5 an improper fraction or a mixed number? Look at what it is made of.",
        miss: "How many whole ones are full on the tray?" },
      /* practice 3: answer in the plan = A mixed number, because it is a whole number beside a proper fraction */
      { qid: "M2.S3.T6.C21:3", kind: "kind", show: [2, 3, 8], answer: "mixed", choices: WO_KINDS, named: true, winMs: 3200,
        ask: "And this one?", say: "And 2 3/8? Is it a mixed number or an improper fraction?",
        miss: "Is a whole number standing beside the fraction here?" },
    ],
  },
  {
    n: 3,
    concept: "Dividing to find the whole part",
    conceptId: "M2.S3.T6.C22", objectiveIds: ["O10"],
    says: ["Drag the heap onto the tray. Each pour fills one whole.",
      "How many whole ones did you fill, and how many parts were left over?"],
    ladder: ["How many parts were still loose when it stopped?",
      "Count the pours: each one is a whole. Parts too few to fill a whole stay loose."],
    closing: "Divide the top number by the bottom one. The quotient is the whole part, the remainder is the new top, and the bottom stays.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: divide top by bottom; the remainder becomes the new top.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The heap pours one whole at a time with the quotient counting up, the parts left loose are ringed as the remainder, and the mixed number writes itself beside the single fraction.",
    items: [
      /* learn ML3: answer in the plan = 3 5/6 */
      { qid: "M2.S3.T6.C22:ML3", kind: "divide", from: [23, 6], parts: SLOT_MIXED, answer: [3, 5, 6], winMs: 3400,
        ask: "Write it as a mixed number", say: "Write 23/6 as a mixed number.",
        miss: "Count the circles that filled right round." },
      /* practice 5: answer in the plan = 5, because nine goes into forty-five five times with nothing left over */
      { qid: "M2.S3.T6.C22:5", kind: "divide", from: [45, 9], parts: SLOT_MIXED, answer: [5, null, null], winMs: 4200,
        ask: "What does it make?", say: "Now pour 45/9 and write what it makes.",
        miss: "After the last full pour, is anything left in the heap?",
        winSay: "Nothing is left over, so 45/9 is a whole number." },
      /* practice 6: answer in the plan = 3 5/8 */
      { qid: "M2.S3.T6.C22:6", kind: "divide", from: [29, 8], parts: SLOT_MIXED, answer: [3, 5, 8], winMs: 3400,
        ask: "Pour, then write it", say: "Last one: 29/8. Pour it the same way and write it.",
        miss: "How many eighths are left when no more wholes will fill?" },
    ],
  },
  {
    n: 4,
    concept: "Going back the other way",
    conceptId: "M2.S3.T6.C23", objectiveIds: ["O10"],
    says: ["Tap or drag a whole one to break it along its lines.",
      "Break every whole one. Now count every part you are holding."],
    ladder: ["How many pieces do all your whole ones give between them?",
      "Count on by the part size for each whole, then add the loose parts."],
    closing: "Multiply the whole number by the bottom number and add the top one. Write the total over that same bottom number.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: multiply, add the top, and keep the same bottom number.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "Every whole one breaks at walking pace and is counted on by the part size, the loose parts are counted in after them, and the single fraction writes itself over the same bottom number.",
    items: [
      /* learn ML4: answer in the plan = 31/7 */
      { qid: "M2.S3.T6.C23:ML4", kind: "build", mixed: [4, 3, 7], parts: SLOT_FRACTION, answer: [31, 7], winMs: 3400,
        ask: "Write one fraction", say: "Write 4 3/7 as a single fraction.",
        miss: "How many pieces does one whole one break into?" },
      /* practice 7: answer in the plan = 56/9 */
      { qid: "M2.S3.T6.C23:7", kind: "build", mixed: [6, 2, 9], parts: SLOT_FRACTION, answer: [56, 9], winMs: 3400,
        ask: "One fraction again", say: "Now 6 2/9. Break it back and write it as one fraction.",
        miss: "Six wholes make how many ninths altogether?" },
      /* practice 8: answer in the plan = 34/6, and once reduced it is 5 2/3, which is 17/3 */
      { qid: "M2.S3.T6.C23:8", kind: "build", mixed: [5, 4, 6], parts: SLOT_FRACTION, answer: [34, 6], alsoOk: [[17, 3]], winMs: 5400,
        ask: "And this one?", say: "Last, 5 4/6. What single fraction is it?",
        miss: "Count the sixths from the broken wholes first, then add the loose ones.",
        winSay: "Four sixths cover two thirds, so it is also 5 2/3, or 17/3." },
    ],
  },
];

/* ── the tray, the heap and the two writings ───────────────────────────────────────────────
   The chapter's own content colours: the parts a fraction counts are deep blue, the rest of that
   same whole amber, a whole one or a bracket over one green, a second writing of an amount already
   on the stage rose, and the larger of two numbers vermilion. Every cut, rule and bar is near-black,
   so a part is told from the rest by its drawn cut before it is ever told by a fill. */
const WO_BLUE = CONTENT.hundred, WO_GREEN = CONTENT.one, WO_ROSE = CONTENT.bead, WO_VERM = CONTENT.pointer;
const WO_CUT = CONTENT.line;
const woInk = (c: string) => shade(c, 0.25);
/* the part size in words, the book's names (a quarter, not a fourth) */
const WO_PART = ["", "wholes", "halves", "thirds", "quarters", "fifths", "sixths", "sevenths", "eighths",
  "ninths", "tenths", "elevenths", "twelfths"];

/* the tray: six whole circles, two rows of three (phase 2 shows the first row only) */
const WO_R = 70;
const WO_AT = [0, 1, 2, 3, 4, 5].map((k) => ({ x: 96 + (k % 3) * 184, y: 84 + Math.floor(k / 3) * 166 }));
/* the heap: loose parts eight to a row, all one size and one shape, never overlapping */
const WO_HX = 612, WO_HW = 58, WO_HH = 52;
const woHeapTop = (kind: string) => (kind === "free" ? 196 : kind === "kind" || kind === "write" ? 84 : 148);
/* a loose part is as big as it can be without touching its neighbour */
const woRh = (d: number) => Math.min(40, 25 / Math.sin(Math.PI / d));
/* one part, apex at the origin, pointing up */
const woWedge = (r: number, d: number) => {
  const h = Math.PI / d, a1 = -Math.PI / 2 - h, a2 = -Math.PI / 2 + h;
  return `M 0 0 L ${(r * Math.cos(a1)).toFixed(2)} ${(r * Math.sin(a1)).toFixed(2)} A ${r} ${r} 0 0 1 `
    + `${(r * Math.cos(a2)).toFixed(2)} ${(r * Math.sin(a2)).toFixed(2)} Z`;
};
/* where a loose part waits: phase 2 shows its two or three at full size, centred beside the tray */
const woHeapPos = (kind: string, i: number, d: number, loose = 1) => (kind === "kind" || kind === "write"
  ? { x: 845 - ((loose - 1) * 104) / 2 + i * 104, y: woHeapTop(kind) + WO_R, s: WO_R / woRh(d) }
  : { x: WO_HX + (i % 8) * WO_HW + WO_HW / 2, y: woHeapTop(kind) + Math.floor(i / 8) * WO_HH + WO_HH - 8, s: 1 });

/* the tray as the child holds it: which loose parts are in the heap, and which part sits in which
   sector of which whole one (-1 = that sector is still empty) */
const woFresh = (c: any) => ({
  heap: Array.from({ length: c.total - c.whole * c.d }, (_, i) => c.whole * c.d + i),
  circ: WO_AT.map((_, k) => Array.from({ length: c.d }, (_, j) => (k < c.whole ? k * c.d + j : -1))),
});
const woFull = (xs: number[]) => xs.length > 0 && xs.every((x) => x >= 0);
const woBare = (xs: number[]) => xs.every((x) => x < 0);
const woPut = (t: any, id: number, c: number, j: number) => ({
  heap: t.heap.filter((x: number) => x !== id),
  circ: t.circ.map((xs: number[], k: number) => (k === c ? xs.map((x, jj) => (jj === j ? id : x)) : xs)),
});
const woOut = (t: any, id: number) => ({
  heap: [...t.heap, id],
  circ: t.circ.map((xs: number[]) => xs.map((x) => (x === id ? -1 : x))),
});
const woWholes = (t: any) => t.circ.filter(woFull).length;
/* pouring: one whole at a time, each circle filled right round before the next */
const woPourPlan = (t0: any, d: number, ms: number, wholes: number, step: (t: any) => void, tick: () => void) => {
  let t = t0;
  const S: any[] = [];
  for (let k = 0; k < wholes; k++) {
    const c = t.circ.findIndex(woBare);
    if (c < 0 || t.heap.length < d) break;
    const take = t.heap.slice(-d);
    take.forEach((id: number, j: number) => { t = woPut(t, id, c, j); const snap = t; S.push([ms, () => step(snap)]); });
    S.push([Math.max(ms, 300), tick]);
  }
  return { S, t };
};
/* breaking: a whole one cracks along its own lines and the pieces slide into the loose ones */
const woBreakPlan = (t0: any, cs: number[], ms: number, step: (t: any) => void, done: (k: number) => void) => {
  let t = t0;
  const S: any[] = [];
  cs.forEach((c, k) => {
    t.circ[c].slice().forEach((id: number) => {
      if (id < 0) return;
      t = woOut(t, id); const snap = t;
      S.push([ms, () => step(snap)]);
    });
    S.push([Math.max(ms, 300), () => done(k + 1)]);
  });
  return { S, t };
};

/* the numbers, rows and sizes the working area needs (they go into the sidecar too) */
const MODEL = {
  tray: { wholes: WO_AT.length, radius: WO_R, rows: 2 },
  heap: { perRow: 8, cell: [WO_HW, WO_HH], most: 56 },
  sorter: { cards: 3, cardSize: [104, 164] },
  partNames: WO_PART.slice(2),
  readings: ["single fraction", "mixed number"],
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* every fraction written in an answer, in one order, so a sort can be compared as a set */
const woSet = (v: any) => (String(v ?? "").match(/\d+\s*\/\s*\d+/g) || []).map((s) => s.replace(/\s/g, "")).sort().join(" ");

/* judge: is this value right for this item? (a tidied answer may come two ways: 34/6 or 17/3) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v)
    || (item.alsoOk || []).some((alt: any) => judgeSlotParts({ answer: alt, parts: item.parts }, v));
  if (item.kind === "sort") return woSet(v) !== "" && woSet(v) === woSet(item.answer);
  return String(v ?? "").trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};

/* oracle: every answer re-derived by a second route that shares no code with judge or the picture
   (improper by subtraction, the whole part by taking the bottom away again and again, the single
   fraction by adding the bottom on once per whole) */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "sort") return it.cards.filter((c: number[]) => c[0] - c[1] >= 0).map((c: number[]) => c[0] + "/" + c[1]).join(" ") === it.answer;
  if (it.kind === "worth") {
    const a = it.cards[0][0], b = it.cards[0][1];
    return it.answer === (a - b >= 0 ? "yes" : "no") + (a === b ? "1" : a - b > 0 ? "more" : "less");
  }
  if (it.kind === "kind") return it.answer === (it.show[0] > 0 && it.show[1] > 0 && it.show[1] < it.show[2] ? "mixed" : "improper");
  if (it.kind === "write") return it.show[1] < it.show[2] && it.show.join() === it.answer.join();
  if (it.kind === "divide") {
    let left = it.from[0], q = 0;
    while (left >= it.from[1]) { left -= it.from[1]; q += 1; }
    return JSON.stringify(left === 0 ? [q, null, null] : [q, left, it.from[1]]) === JSON.stringify(it.answer);
  }
  if (it.kind === "build") {
    let all = it.mixed[1];
    for (let k = 0; k < it.mixed[0]; k++) all += it.mixed[2];
    return it.answer[0] === all && it.answer[1] === it.mixed[2]
      && (it.alsoOk || []).every((alt: number[]) => alt[0] * it.answer[1] === all * alt[1]);
  }
  return false;
}));

/* the most likely wrong answer (the misconception of that question); judge must reject it */
const nearMiss = (item: any) => {
  if (item.kind === "sort") return item.cards.filter((c: number[]) => c[0] > c[1]).map((c: number[]) => c[0] + "/" + c[1]).join(" ");
  if (item.kind === "worth") return "no1";                       /* equal numbers taken for proper */
  if (item.kind === "kind") return "improper";                   /* more than one whole, so called improper */
  if (item.kind === "write") return [item.answer[1], item.answer[0], item.answer[2]].join("|"); /* places swapped */
  if (item.kind === "divide") {
    const q = Math.floor(item.from[0] / item.from[1]), r = item.from[0] % item.from[1];
    return (r ? [r, q, item.from[1]] : [q, 0, item.from[1]]).join("|"); /* remainder written as the whole part */
  }
  if (item.kind === "build") return [item.mixed[0] + item.mixed[1], item.mixed[2]].join("|"); /* whole added to the top */
  return "~";
};

/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => {
  if (item.kind === "sort") return [];                           /* the cards are the question */
  if (item.choices) return item.named ? [] : [WO_SHOWN[item.answer]]; /* named: both kinds are in the question */
  const a = item.answer;
  if (a.length === 2) return [a[0] + "/" + a[1], fractionWords(a[0], a[1]), String(a[0]), words(a[0])];
  if (a[1] === null) return a[0] >= 10 ? [String(a[0]), words(a[0])] : [];
  return [a[0] + " " + a[1] + "/" + a[2], words(a[0]) + " and " + fractionWords(a[1], a[2])];
};

/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (item.kind === "sort" && HOOK.set) { HOOK.set(item.answer); setTimeout(() => HOOK.enter && HOOK.enter(), 40); return; }
  return T.submit(item.answer);
};
/* the agent's answer() for an item made on the working area: set it as a child would */
const answer = (item: any, v: any) => (item.kind === "sort" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);
/* what the slot shows: a word answer by its short label, a sort by how many cards are on the tray
   (as a number, the size every other phase answers in) */
const format = (v: any, j?: number) => {
  if (typeof j === "number") return v;
  const s = String(v ?? "");
  if (WO_SHOWN[s]) return WO_SHOWN[s];
  if (s === "none") return "0";
  const k = (s.match(/\d+\s*\/\s*\d+/g) || []).length;
  return k ? String(k) : s;
};

/* ── the pieces this tool draws ─────────────────────────────────────────────────────────── */

const WO_CSS = `
.wo-fly{transition:transform 360ms cubic-bezier(.3,.7,.25,1)}
.wo-card{transition:transform 320ms cubic-bezier(.3,.7,.25,1)}
.wo-in{animation:woIn 420ms ease-out both}
@keyframes woIn{from{opacity:0}to{opacity:1}}
.wo-grab{cursor:grab}
.wo-tap{cursor:pointer}
@media (prefers-reduced-motion:reduce){.wo-fly,.wo-card{transition:none}.wo-in{animation:none}}
`;

/* a whole one, cut into d equal parts, with some of them filled (blue) and the rest of that same
   whole left (amber). Every cut is near-black, so it reads with the colour taken away. */
function WoPie({ x, y, r, d, blue = 0, amber = 0, ring }: any) {
  const ang = (j: number) => -Math.PI / 2 + (j * 2 * Math.PI) / d;
  const sec = (j: number) => {
    const a0 = ang(j), a1 = ang(j + 1);
    return `M ${x} ${y} L ${(x + r * Math.cos(a0)).toFixed(2)} ${(y + r * Math.sin(a0)).toFixed(2)} `
      + `A ${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${(x + r * Math.cos(a1)).toFixed(2)} ${(y + r * Math.sin(a1)).toFixed(2)} Z`;
  };
  const w = r > 40 ? 2.5 : 1.5;
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#FFFFFF" />
      {Array.from({ length: d }).map((_, j) => (j < blue + amber
        ? <path key={"s" + j} d={sec(j)} fill={j < blue ? "url(#gHundred)" : "url(#gTen)"} /> : null))}
      {Array.from({ length: d }).map((_, j) => (
        <line key={"l" + j} x1={x} y1={y} x2={x + r * Math.cos(ang(j))} y2={y + r * Math.sin(ang(j))} stroke={WO_CUT} strokeWidth={w} />
      ))}
      <circle cx={x} cy={y} r={r} fill="none" stroke={ring || WO_CUT} strokeWidth={ring ? 6 : w + 0.5} />
    </g>
  );
}

/* a fraction is drawn everywhere with its top number above a level line and its bottom number
   below, both upright and centred: never "3/4" written along a line */
function WoFrac({ x, y, a, b, size, C, topInk, barInk }: any) {
  const w = Math.max(String(a).length, String(b).length) * size * 0.62 + size * 0.28;
  return (
    <g>
      <text x={x} y={y - size * 0.22} textAnchor="middle" fontSize={size} fontWeight={700} fill={topInk || C.ink}>{a}</text>
      <rect x={x - w / 2} y={y - size * 0.05} width={w} height={Math.max(4, size * 0.09)} rx={2} fill={barInk || C.ink} />
      <text x={x} y={y + size * 0.94} textAnchor="middle" fontSize={size} fontWeight={700} fill={C.ink}>{b}</text>
    </g>
  );
}
/* a mixed number: an upright whole number standing beside a stacked fraction */
function WoMixed({ x, y, w, a, b, size, big, C, wholeInk, topInk }: any) {
  const half = Math.max(String(a).length, String(b).length) * size * 0.31 + size * 0.14;
  return (
    <g>
      {w !== null && w !== undefined && w !== "" && (
        <text x={a === null || a === undefined || a === "" ? x : x - half - big * 0.14} y={y + big * 0.36}
          textAnchor={a === null || a === undefined || a === "" ? "middle" : "end"} fontSize={big} fontWeight={700} fill={wholeInk || C.ink}>{w}</text>
      )}
      {a !== null && a !== undefined && a !== "" && <WoFrac x={x} y={y} a={a} b={b} size={size} C={C} topInk={topInk} />}
    </g>
  );
}

/* a written fraction card for the sorter, with a ring on the larger number when the test is read out */
function WoCard({ a, b, C, ring }: any) {
  return (
    <g>
      <rect x={0} y={0} width={104} height={164} rx={16} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />
      {(ring === "top" || ring === "both") && <rect x={8} y={22} width={88} height={56} rx={12} fill="none" stroke={WO_VERM} strokeWidth={4} />}
      {(ring === "bottom" || ring === "both") && <rect x={8} y={88} width={88} height={56} rx={12} fill="none" stroke={WO_VERM} strokeWidth={4} />}
      <text x={52} y={70} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{a}</text>
      <rect x={14} y={80} width={76} height={5} rx={2.5} fill={C.ink} />
      <text x={52} y={136} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{b}</text>
    </g>
  );
}

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────── */

const woSetup = (item: any, free: boolean) => {
  if (free) return { kind: "free", d: 4, total: 9, whole: 0 };
  const k = item.kind;
  if (k === "sort" || k === "worth") return { kind: k, d: 0, total: 0, whole: 0 };
  if (k === "kind" || k === "write") return { kind: k, d: item.show[2], total: item.show[0] * item.show[2] + item.show[1], whole: item.show[0] };
  if (k === "divide") return { kind: k, d: item.from[1], total: item.from[0], whole: 0 };
  return { kind: k, d: item.mixed[2], total: item.mixed[0] * item.mixed[2] + item.mixed[1], whole: item.mixed[0] };
};
const woCardsOf = (item: any, free: boolean) => (!free && (item.kind === "sort" || item.kind === "worth")
  ? item.cards.map((c: number[], i: number) => ({ a: c[0], b: c[1], col: item.kind === "worth" ? 1 : i, down: false }))
  : []);
const woValue = (cs: any[]) => cs.filter((c) => c.down).map((c) => c.a + "/" + c.b).join(" ");

function Work({ n, item, index, stage, wrong, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  /* the words this picture draws by itself, in the language in use (the rest goes through tx and TR) */
  const woLang = (en: string, hi: string, gu: string) => (lang === "hi" ? hi : lang === "gu" ? gu : en);
  const tl = useTimeline();
  const free = stage === "free";
  const [cfg, setCfg] = useState<any>(() => woSetup(item, free));
  const [cards, setCards] = useState<any[]>(() => woCardsOf(item, free));
  const [tray, setTray] = useState<any>(() => woFresh(woSetup(item, free)));
  const [deco, setDeco] = useState<any>({});
  const [gen, setGen] = useState(0);
  const [touched, setTouched] = useState(false);
  const cardsRef = useRef(cards); cardsRef.current = cards;
  const trayRef = useRef(tray); trayRef.current = tray;
  const cfgRef = useRef(cfg); cfgRef.current = cfg;
  const touchedRef = useRef(false);
  const setupFor = useRef(free ? "free" : n + ":" + index);
  const busy = tl.busy;
  const kind = cfg.kind;
  const d = cfg.d;
  const isCards = kind === "sort" || kind === "worth";
  const isFlat = kind === "kind" || kind === "write";   /* phase 2: one row of whole ones, nothing to move */

  const setT = (t: any) => { trayRef.current = t; setTray(t); };
  const reset = (it: any, isFree: boolean) => {
    tl.stop();
    const c = woSetup(it, isFree);
    const cs = woCardsOf(it, isFree);
    const t = woFresh(c);
    cfgRef.current = c; setCfg(c);
    cardsRef.current = cs; setCards(cs);
    setT(t);
    setDeco({}); setTouched(false); touchedRef.current = false;
    setGen((g) => g + 1);
    api.lock(false);
  };
  useEffect(() => {
    const key = free ? "free" : stage === "teach" || stage === "ask" ? n + ":" + index : null;
    if (key && key !== setupFor.current) { setupFor.current = key; reset(item, free); }
  }, [stage, index, n]);

  /* ── what the child can do ── */
  const live = (stage === "ask" || free) && !busy;
  const canPour = live && !isCards && !isFlat && tray.heap.length >= d && tray.circ.some(woBare);
  const pourOne = () => {
    const t = trayRef.current, c0 = cfgRef.current;
    if (!live || isCards || isFlat || t.heap.length < c0.d || !t.circ.some(woBare)) return;
    setTouched(true); touchedRef.current = true;
    tl.run(woPourPlan(t, c0.d, 70, 1, setT, () => api.sfx.tick()).S);
  };
  const breakOne = (c: number) => {
    const t = trayRef.current;
    if (!live || isCards || isFlat || !woFull(t.circ[c])) return;
    setTouched(true); touchedRef.current = true;
    tl.run(woBreakPlan(t, [c], 70, setT, () => api.sfx.tick()).S);
  };
  const moveCard = (i: number, down: any) => {
    if (!(stage === "ask" && kind === "sort") || busy) return;
    const cs = cardsRef.current.map((c: any, k: number) => (k === i ? { ...c, down: down === null ? !c.down : down } : c));
    cardsRef.current = cs; setCards(cs);
    setTouched(true); touchedRef.current = true;
    api.sfx.tick();
    api.setTyped(woValue(cs));
  };
  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (pay.src === "card") { moveCard(pay.i, moved ? p.y > 212 : null); return; }
    if (pay.src === "heap") { if (!moved || p.x < 590) pourOne(); return; }
    if (pay.src === "whole") { if (!moved || p.x > 570) breakOne(pay.c); return; }
  });

  /* Enter: the sorter's answer is made on the working area, everything else is typed in the slot */
  const enterFn = stage === "ask" && kind === "sort" && !busy
    ? () => { const v = woValue(cardsRef.current); if (!v && !touchedRef.current) return; api.submit(v || "none"); }
    : null;
  api.onEnter(enterFn);
  HOOK.enter = () => enterFn && enterFn();
  HOOK.set = (v: any) => {
    const want = (String(v ?? "").match(/\d+\s*\/\s*\d+/g) || []).map((s) => s.replace(/\s/g, ""));
    const cs = cardsRef.current.map((c: any) => ({ ...c, down: want.indexOf(c.a + "/" + c.b) >= 0 }));
    cardsRef.current = cs; setCards(cs); touchedRef.current = true; setTouched(true);
    api.setTyped(woValue(cs));
    return true;
  };

  /* ── the mathematics redrawn: the same motion runs the win (quick) and the traceback (slow) ── */
  const cardSteps = (slow: number, onlyDown: boolean) => {
    const cs = cardsRef.current;
    const dc = cs.map(() => ({ ring: null as any, pour: false, poured: 0, done: false, tag: null as any, one: false }));
    const S: any[] = [];
    const paint = () => setDeco({ cards: dc.map((x: any) => ({ ...x })) });
    cs.forEach((c: any, i: number) => {
      if (onlyDown && !c.down) {
        S.push([260 * slow, () => { dc[i].tag = c.a >= c.b ? "improper" : "proper"; paint(); }]);
        return;
      }
      S.push([420 * slow, () => { dc[i].ring = c.a > c.b ? "top" : c.a < c.b ? "bottom" : "both"; paint(); }]);
      S.push([260 * slow, () => { dc[i].pour = true; paint(); }]);
      for (let p = 1; p <= c.a; p++) S.push([64 * slow, () => { dc[i].poured = p; paint(); }]);
      S.push([300 * slow, () => { dc[i].done = true; api.sfx.tick(); paint(); }]);
      S.push([420 * slow, () => { dc[i].tag = c.a >= c.b ? "improper" : "proper"; dc[i].one = c.a === c.b; paint(); }]);
    });
    return S;
  };
  const divideSteps = (slow: number) => {
    const c0 = cfgRef.current;
    const plan = woPourPlan(trayRef.current, c0.d, 60 * slow, 9, setT, () => api.sfx.tick());
    /* the quotient counts up with the pouring, then both numbers and the mixed number are held
       still: a later tap on a whole one can never take the corrected answer away again */
    const q = woWholes(plan.t), r = plan.t.heap.length;
    return [
      [240 * slow, () => setDeco((x: any) => ({ ...x, showQ: true }))],
      ...plan.S,
      [420 * slow, () => setDeco((x: any) => ({ ...x, showR: true, rings: true, qr: [q, r] }))],
      [560 * slow, () => setDeco((x: any) => ({ ...x, other: true, mix: [q, r, c0.d] }))],
      [320, () => {}],
    ];
  };
  const buildSteps = (slow: number, fresh: boolean) => {
    const c0 = cfgRef.current;
    const S: any[] = [];
    if (fresh) S.push([320, () => { setT(woFresh(c0)); setGen((g) => g + 1); setDeco({}); }]);
    const t0 = fresh ? woFresh(c0) : trayRef.current;
    const cs: number[] = [];
    t0.circ.forEach((xs: number[], k: number) => { if (woFull(xs)) cs.push(k); });
    const counted: number[] = [];
    const plan = woBreakPlan(t0, cs, 64 * slow, setT, (k) => {
      api.sfx.tick();
      counted.push(k * c0.d);
      const snap = counted.slice();
      setDeco((x: any) => ({ ...x, count: snap }));
    });
    return [...S, ...plan.S,
      [460 * slow, () => setDeco((x: any) => ({ ...x, method: true }))],
      [560 * slow, () => setDeco((x: any) => ({ ...x, other: true }))],
      [320, () => {}]];
  };
  const flatSteps = (slow: number) => [
    [280 * slow, () => setDeco((x: any) => ({ ...x, written: true }))],
    [520 * slow, () => setDeco((x: any) => ({ ...x, lw: true }))],
    [520 * slow, () => setDeco((x: any) => ({ ...x, lf: true }))],
    [520 * slow, () => setDeco((x: any) => ({ ...x, lm: true }))],
    [320, () => {}],
  ];

  /* ── the win: the maths moves, and only then the next question ── */
  useEffect(() => {
    if (stage !== "win") return;
    /* one literal call per win line, so the voice command can bake each in Hindi and Gujarati */
    if (item.qid === "M2.S3.T6.C20:ML1") api.say("Seven sevenths fills one circle exactly, with nothing over.");
    else if (item.qid === "M2.S3.T6.C22:5") api.say("Nothing is left over, so 45/9 is a whole number.");
    else if (item.qid === "M2.S3.T6.C23:8") api.say("Four sixths cover two thirds, so it is also 5 2/3, or 17/3.");
    else if (item.winSay) api.say(item.winSay);
    if (kind === "sort") tl.run(cardSteps(0.5, true));
    else if (kind === "worth") {
      const cs = cardsRef.current.map((c: any) => ({ ...c, down: true }));
      cardsRef.current = cs; setCards(cs);
      tl.run(cardSteps(0.6, true));
    } else if (kind === "divide") tl.run(divideSteps(0.5));
    else if (kind === "build") tl.run([...buildSteps(0.5, false), ...(item.alsoOk ? [[700, () => setDeco((x: any) => ({ ...x, reduce: true }))], [400, () => {}]] : [])]);
    else tl.run(flatSteps(0.6));
  }, [stage]);

  /* ── the traceback: the mathematics redrawn in steps, ending on the whole right answer;
        nothing is marked, nothing is cleared, and the child's cards stay where they were put ── */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    const done = () => api.lock(false);
    if (isCards) tl.run(cardSteps(1, false), done);
    else if (kind === "divide") tl.run(divideSteps(1), done);
    else if (kind === "build") tl.run(buildSteps(1, true), done);
    else tl.run(flatSteps(1), done);
  }, [wrong]);

  /* ── free play: any heap, any part size, both readings on, pour and break as you like ── */
  const grow = (dn: number) => {
    const c0 = cfgRef.current, t = trayRef.current;
    const total = c0.total + dn;
    if (total < 1 || total > 48 || (dn < 0 && t.heap.length < 1)) return;
    const c = { ...c0, total };
    cfgRef.current = c; setCfg(c);
    setT(dn > 0 ? { heap: [...t.heap, c0.total], circ: t.circ } : { heap: t.heap.slice(0, -1), circ: t.circ });
    api.sfx.tick();
  };
  const recut = (dn: number) => {
    const c0 = cfgRef.current;
    const nd = c0.d + dn;
    if (nd < 2 || nd > 12 || trayRef.current.circ.some(woFull)) return;
    const c = { ...c0, d: nd, whole: 0 };
    cfgRef.current = c; setCfg(c);
    setT(woFresh(c)); setGen((g) => g + 1);
    api.sfx.tick();
  };

  /* ── what the host and the teacher agent can read back ── */
  const wholes = woWholes(tray);
  const loose = tray.heap.length;
  api.share({
    partSize: d || null, looseParts: isCards ? null : loose, wholesFilled: isCards ? null : wholes,
    improperFraction: isCards ? null : cfg.total + "/" + d,
    mixedNumber: isCards || kind === "divide" ? null : (kind === "build" ? item.mixed : kind === "free" ? [wholes, loose, d] : item.show).join(" "),
    direction: kind === "build" ? "to one fraction" : kind === "divide" ? "to a mixed number" : null,
    onTray: isCards ? cards.filter((c: any) => c.down).map((c: any) => c.a + "/" + c.b) : null,
  });

  /* ── drawing ── */
  const where: any = {};
  tray.heap.forEach((id: number, i: number) => { where[id] = { h: i }; });
  tray.circ.forEach((xs: number[], c: number) => xs.forEach((id: number, j: number) => { if (id >= 0) where[id] = { c, j }; }));
  const rh = d ? woRh(d) : 40;
  const wedge = d ? woWedge(rh, d) : "";
  const tf = (loc: any) => {
    if (!loc) return "translate(0px, 0px) rotate(0deg) scale(1)";
    if (loc.c !== undefined) {
      const p = WO_AT[loc.c];
      let a = ((loc.j + 0.5) * 360) / d;
      if (a > 180) a -= 360;
      return `translate(${p.x}px, ${p.y}px) rotate(${a.toFixed(1)}deg) scale(${(WO_R / rh).toFixed(3)})`;
    }
    const p = woHeapPos(kind, loc.h, d, tray.heap.length);
    return `translate(${p.x}px, ${p.y}px) rotate(0deg) scale(${p.s.toFixed(3)})`;
  };
  const ids: number[] = [];
  tray.heap.forEach((id: number) => ids.push(id));
  tray.circ.forEach((xs: number[]) => xs.forEach((id: number) => { if (id >= 0) ids.push(id); }));
  ids.sort((a, b) => a - b);

  const heapTop = woHeapTop(kind);
  const heapRows = Math.max(1, Math.ceil(Math.max(loose, 1) / 8));
  const shownCards = isCards ? cards : [];
  const dragging = drag.drag && drag.drag.moved ? drag.drag : null;

  /* the running count: the part size pinned in words, and what has been poured or broken */
  const runLine = kind === "divide" ? woLang("poured " + (cfg.total - loose) + " of " + cfg.total,
    cfg.total + " में से " + (cfg.total - loose) + " डाले", cfg.total + "માંથી " + (cfg.total - loose) + " નાખ્યા")
    : kind === "build" ? woLang("broken " + (cfg.whole - wholes) + " of " + cfg.whole,
      cfg.whole + " में से " + (cfg.whole - wholes) + " टूटे", cfg.whole + "માંથી " + (cfg.whole - wholes) + " તૂટ્યા")
      : kind === "free" ? woLang(cfg.total + " parts in all", "कुल " + cfg.total + " भाग", "કુલ " + cfg.total + " ભાગ")
        : "";  /* phase 2 pours nothing: the pinned part size stands alone */
  /* "cut in thirds": English names the part, Hindi and Gujarati count the equal parts */
  const cutIn = woLang("cut in " + WO_PART[d], wordsIn(d, "hi") + " बराबर भाग", wordsIn(d, "gu") + " સરખા ભાગ");

  /* phase 3 and 4 write the two readings under the tray: the single fraction on the left, the
     mixed number on the right, each in its own place, with a rose tie when both are up */
  const other = !!deco.other;
  const qNow = deco.qr ? deco.qr[0] : woWholes(tray), rNow = deco.qr ? deco.qr[1] : loose;
  const mixR = kind === "divide" ? deco.mix || null
    : kind === "build" ? item.mixed
      : kind === "free" ? (wholes > 0 ? [wholes, loose, d] : null) : null;
  const singleR = kind === "divide" ? [cfg.total, d]
    : kind === "build" ? (other ? [item.answer[0], item.answer[1]] : null)
      : kind === "free" ? [cfg.total, d] : null;

  /* the one invitation: the top card, the scoop the next pour takes, or the first whole one */
  const last = loose ? woHeapPos(kind, loose - 1, d, loose) : null;
  const invite = !busy && !touched && !wrong && index === 0 && stage === "ask"
    ? kind === "sort" ? { x: 88, y: 98, r: 86 }
      : kind === "divide" && last ? { x: last.x, y: last.y - 22, r: 62 }
        : kind === "build" ? { x: WO_AT[0].x, y: WO_AT[0].y, r: 84 }
          : null
    : null;

  return (
    <g>
      <style>{WO_CSS}</style>

      {/* the running count, in the runs zone (64,108): the part size never changes */}
      {!isCards && (
        <g data-zone="runs">
          <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          <text x={18} y={runLine ? -60 : -46} fontSize={T.label} fontWeight={700} fill={C.ink}>{cutIn}</text>
          {runLine && <text x={18} y={-28} fontSize={T.micro} fontWeight={500} fill={C.ink}>{runLine}</text>}
        </g>
      )}

      {/* ── phase 1: the sorter above the tray ── */}
      {isCards && (
        <g>
          <rect x={0} y={0} width={W.w} height={196} rx={RAD.panel} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={2} />
          <rect x={0} y={228} width={W.w} height={300} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          <text x={24} y={268} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("improper fractions")}</text>
          {/* where a card lands, so the tray says what it is for before anything is dragged */}
          {kind === "sort" && (stage === "ask" || stage === "teach") && shownCards.map((c: any, i: number) => (!c.down
            ? <rect key={"p" + i} x={c.col * 362 + 36} y={318} width={104} height={164} rx={16} fill="none"
              stroke={C.rule} strokeWidth={3} strokeDasharray="12 12" /> : null))}
          {shownCards.map((c: any, i: number) => {
            const dc = (deco.cards || [])[i] || {};
            const held = dragging && dragging.payload.src === "card" && dragging.payload.i === i;
            const pay = { src: "card", i };
            const cardLive = stage === "ask" && kind === "sort" && !busy;
            const pies = Math.max(1, Math.ceil(c.a / c.b));
            return (
              <g key={i} className="wo-card" style={{ transform: `translate(${c.col * 362 + 36}px, ${c.down ? 318 : 16}px)` } as any}>
                {dc.pour && Array.from({ length: pies }).map((_, m) => {
                  const blue = Math.max(0, Math.min(c.b, dc.poured - m * c.b));
                  const amber = dc.done && m === pies - 1 ? c.b - blue : 0;
                  return <WoPie key={m} x={154 + m * 76} y={82} r={36} d={c.b} blue={blue} amber={amber} />;
                })}
                {dc.one && <text x={Math.max(190, 154 + (pies - 1) * 38)} y={38} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={woInk(WO_GREEN)}>{tx("one whole")}</text>}
                {dc.tag && <text x={Math.max(190, 154 + (pies - 1) * 38)} y={148} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(dc.tag)}</text>}
                <g className={cardLive ? "wo-grab c4-piece" : ""}
                  {...(cardLive ? { ...control("card-" + (i + 1), "Card " + c.a + " over " + c.b), ...drag.bind(pay), ...drag.keys(pay) } : {})}>
                  {held
                    ? <rect x={0} y={0} width={104} height={164} rx={16} fill="none" stroke={C.rule} strokeWidth={3} strokeDasharray="10 10" />
                    : <WoCard a={c.a} b={c.b} C={C} ring={dc.ring} />}
                </g>
              </g>
            );
          })}
        </g>
      )}

      {/* ── phases 2 to 4 and free play: the tray of whole ones and the heap of loose parts ── */}
      {!isCards && (
        <g>
          <rect x={0} y={0} width={560} height={isFlat ? 170 : 334} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          <rect x={604} y={heapTop - (isFlat ? 10 : 8)} width={482} height={isFlat ? 116 : 528 - heapTop + 8}
            rx={RAD.panel} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={2} />
          {WO_AT.slice(0, isFlat ? 3 : 6).map((p, c) => <circle key={"b" + c} cx={p.x} cy={p.y} r={WO_R} fill="#FFFFFF" />)}
          <g>
            {ids.map((id) => (
              <g key={gen + ":" + id} className="wo-fly" style={{ transform: tf(where[id]) } as any}>
                <path d={wedge} fill="url(#gHundred)" stroke={WO_CUT} strokeWidth={2} vectorEffect="non-scaling-stroke" />
              </g>
            ))}
          </g>
          {WO_AT.slice(0, isFlat ? 3 : 6).map((p, c) => {
            const ringed = deco.rings && woFull(tray.circ[c]);
            return (
              <g key={"r" + c}>
                {Array.from({ length: d }).map((_, j) => {
                  const a = -Math.PI / 2 + (j * 2 * Math.PI) / d;
                  return <line key={j} x1={p.x} y1={p.y} x2={p.x + WO_R * Math.cos(a)} y2={p.y + WO_R * Math.sin(a)} stroke={WO_CUT} strokeWidth={2.5} />;
                })}
                <circle cx={p.x} cy={p.y} r={WO_R} fill="none" stroke={ringed ? woInk(WO_GREEN) : WO_CUT} strokeWidth={ringed ? 6 : 3} />
              </g>
            );
          })}
          {/* the loose parts ringed as the remainder */}
          {deco.rings && loose > 0 && (
            <rect className="wo-in" x={606} y={heapTop - 10} width={Math.min(8, loose) * WO_HW + 12} height={heapRows * WO_HH + 14}
              rx={16} fill="none" stroke={woInk(WO_BLUE)} strokeWidth={5} />
          )}
          {/* the wholes and the heap are the controls: a tap or a drag pours one whole, or breaks one */}
          {!isFlat && WO_AT.map((p, c) => (woFull(tray.circ[c]) && live
            ? <circle key={"c" + c} className="wo-grab c4-piece" cx={p.x} cy={p.y} r={WO_R} fill="transparent"
              {...control("whole-" + (c + 1), "Break whole one " + (c + 1))} {...drag.bind({ src: "whole", c })} {...drag.keys({ src: "whole", c })} />
            : null))}
          {canPour && (
            <rect className="wo-grab c4-piece" x={604} y={heapTop - 8} width={482} height={528 - heapTop + 8} fill="transparent"
              {...control("heap", "Pour one whole one")} {...drag.bind({ src: "heap" })} {...drag.keys({ src: "heap" })} />
          )}
        </g>
      )}

      {/* ── the two readings, under the tray ── */}
      {!isCards && !isFlat && (
        <g>
          {singleR && <g className="wo-in"><WoFrac x={110} y={430} a={singleR[0]} b={singleR[1]} size={T.xl} C={C} topInk={woInk(WO_BLUE)} /></g>}
          {singleR && mixR && <text x={222} y={448} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={woInk(WO_ROSE)}>=</text>}
          {mixR && (
            <g className="wo-in">
              <WoMixed x={390} y={430} w={mixR[0] > 0 || mixR[1] === 0 ? mixR[0] : ""} a={mixR[1] > 0 ? mixR[1] : ""} b={mixR[2]}
                size={T.xl} big={T.display} C={C} wholeInk={woInk(WO_GREEN)} topInk={woInk(WO_BLUE)} />
            </g>
          )}
          {kind === "free" && loose === 0 && wholes > 0 && (
            <text x={470} y={510} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={woInk(WO_GREEN)}>{tx("exactly full")}</text>
          )}
        </g>
      )}

      {/* ── phase 3: the division written beside the tray ── */}
      {kind === "divide" && (
        <g>
          <text x={845} y={54} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{cfg.total + " ÷ " + d}</text>
          {deco.showQ && (
            <g className="wo-in">
              <text x={620} y={112} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("quotient")}</text>
              <text x={790} y={120} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={woInk(WO_GREEN)}>{qNow}</text>
            </g>
          )}
          {deco.showR && (
            <g className="wo-in">
              <text x={860} y={112} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("remainder")}</text>
              <text x={1040} y={120} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={woInk(WO_BLUE)}>{rNow}</text>
              <path d={`M 612 104 L 548 92`} stroke={woInk(WO_GREEN)} strokeWidth={4} strokeLinecap="round" />
              {loose > 0 && <path d={`M 1040 132 L 1040 ${heapTop - 14}`} stroke={woInk(WO_BLUE)} strokeWidth={4} strokeLinecap="round" />}
            </g>
          )}
        </g>
      )}

      {/* ── phase 4: the multiplying written beside the tray ── */}
      {kind === "build" && (
        <g>
          {/* the counting on, and the multiplying, each number in its own label (never a sentence) */}
          {(deco.count || []).map((c: number, k: number) => (
            <text key={k} x={648 + k * 74} y={54} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={woInk(WO_BLUE)}>{c}</text>
          ))}
          {deco.method && (
            <g className="wo-in">
              <text x={700} y={122} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{item.mixed[0] + " × " + item.mixed[2]}</text>
              <text x={820} y={122} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{"+ " + item.mixed[1]}</text>
              <text x={950} y={122} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{"= " + item.answer[0]}</text>
            </g>
          )}
          {deco.reduce && item.alsoOk && (
            <g className="wo-in">
              <WoPie x={664} y={44} r={34} d={item.mixed[2]} blue={item.mixed[1]} />
              <text x={724} y={56} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={woInk(WO_ROSE)}>=</text>
              <WoPie x={784} y={44} r={34} d={item.alsoOk[0][1]} blue={item.alsoOk[0][0] - item.mixed[0] * item.alsoOk[0][1]} />
              <WoMixed x={900} y={44} w={item.mixed[0]} a={item.alsoOk[0][0] - item.mixed[0] * item.alsoOk[0][1]} b={item.alsoOk[0][1]}
                size={T.label} big={T.prompt} C={C} />
              <text x={966} y={56} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={woInk(WO_ROSE)}>=</text>
              <WoFrac x={1026} y={44} a={item.alsoOk[0][0]} b={item.alsoOk[0][1]} size={T.label} C={C} />
            </g>
          )}
        </g>
      )}

      {/* ── phase 2: the mixed number written under the tray, each place tied to what it counts ── */}
      {isFlat && (
        <g>
          {/* the two places of a mixed number, ruled and empty, until the tray reads itself back */}
          {kind === "write" && !deco.written && (
            <g>
              <rect x={514} y={252} width={58} height={76} rx={10} fill="none" stroke={mix(C.rule, C.ink, 0.4)} strokeWidth={3.5} strokeDasharray="12 10" />
              <rect x={568} y={228} width={66} height={56} rx={10} fill="none" stroke={mix(C.rule, C.ink, 0.4)} strokeWidth={3.5} strokeDasharray="12 10" />
              <rect x={570} y={287} width={62} height={5} rx={2} fill={mix(C.rule, C.ink, 0.4)} />
              <rect x={568} y={296} width={66} height={56} rx={10} fill="none" stroke={mix(C.rule, C.ink, 0.4)} strokeWidth={3.5} strokeDasharray="12 10" />
            </g>
          )}
          {(kind === "kind" || deco.written) && (
            <g className="wo-in">
              <WoMixed x={600} y={290} w={item.show[0]} a={item.show[1]} b={item.show[2]} size={T.xl} big={T.display} C={C}
                wholeInk={deco.lw ? woInk(WO_GREEN) : C.ink} topInk={deco.lf ? woInk(WO_BLUE) : C.ink} />
            </g>
          )}
          {deco.lw && (
            <g className="wo-in">
              {WO_AT.slice(0, item.show[0]).map((p, k) => (
                <circle key={k} cx={p.x} cy={p.y} r={WO_R} fill="none" stroke={woInk(WO_GREEN)} strokeWidth={6} />
              ))}
              <path d={`M 543 256 L 470 162`} stroke={woInk(WO_GREEN)} strokeWidth={4} strokeLinecap="round" />
              <text x={470} y={392} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={woInk(WO_GREEN)}>{tx("whole number")}</text>
            </g>
          )}
          {deco.lf && (
            <g className="wo-in">
              <rect x={845 - ((item.show[1] - 1) * 104) / 2 - 58} y={heapTop - 4} width={(item.show[1] - 1) * 104 + 116} height={WO_R + 14}
                rx={16} fill="none" stroke={woInk(WO_BLUE)} strokeWidth={5} />
              <path d={`M 648 250 L ${845 - ((item.show[1] - 1) * 104) / 2 - 62} 176`} stroke={woInk(WO_BLUE)} strokeWidth={4} strokeLinecap="round" />
              <text x={700} y={392} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={woInk(WO_BLUE)}>{tx("proper fraction")}</text>
            </g>
          )}
          {deco.lm && (
            <g className="wo-in">
              <path d={`M 380 424 L 380 440 L 800 440 L 800 424`} fill="none" stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
              <text x={590} y={492} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("mixed number")}</text>
            </g>
          )}
        </g>
      )}

      {/* ── free play: recut the parts, or change the heap ── */}
      {kind === "free" && (
        <g>
          <Key id="cut-less" label="Fewer parts in a whole" x={612} y={8} w={76} h={72} C={C} disabled={d <= 2 || tray.circ.some(woFull)} onClick={() => recut(-1)}>
            <text y={14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>−</text>
          </Key>
          <text x={845} y={56} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{cutIn}</text>
          <Key id="cut-more" label="More parts in a whole" x={1002} y={8} w={76} h={72} C={C} disabled={d >= 12 || tray.circ.some(woFull)} onClick={() => recut(1)}>
            <text y={14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>+</text>
          </Key>
          <Key id="heap-less" label="One loose part fewer" x={612} y={96} w={76} h={72} C={C} disabled={cfg.total <= 1 || loose < 1} onClick={() => grow(-1)}>
            <text y={14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>−</text>
          </Key>
          <text x={845} y={144} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{woLang(cfg.total + " parts", cfg.total + " भाग", cfg.total + " ભાગ")}</text>
          <Key id="heap-more" label="One loose part more" x={1002} y={96} w={76} h={72} C={C} disabled={cfg.total >= 48} onClick={() => grow(1)}>
            <text y={14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>+</text>
          </Key>
        </g>
      )}

      {/* the piece under the finger */}
      {dragging && dragging.payload.src === "card" && (() => {
        const c = cards[dragging.payload.i];
        return <g pointerEvents="none" style={{ transform: `translate(${dragging.x - 52}px, ${dragging.y - 82}px)` } as any}><WoCard a={c.a} b={c.b} C={C} /></g>;
      })()}
      {dragging && dragging.payload.src === "heap" && (
        <g pointerEvents="none"><WoPie x={dragging.x} y={dragging.y} r={46} d={d} blue={d} /></g>
      )}
      {dragging && dragging.payload.src === "whole" && (
        <g pointerEvents="none"><WoPie x={dragging.x} y={dragging.y} r={WO_R} d={d} blue={d} /></g>
      )}

      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   a fraction or a mixed number is drawn stacked here too, beside the whole ones it fills */
function Thumb({ n, result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const L = (result && result.last) || {};
  const P = PHASES[(n || 1) - 1];
  const it = P && P.items[L.item];
  if (!it) return null;
  const mid = h / 2;
  const box = <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />;
  const pies = (count: number, d: number, blue: number) => Array.from({ length: Math.min(count, 3) }).map((_, k) => (
    <WoPie key={k} x={32 + k * 50} y={mid} r={22} d={d} blue={blue} />
  ));
  if (it.kind === "sort" || it.kind === "worth") {
    /* a word answer holds no fraction: the card the child judged is drawn instead, with the
       whole one it fills */
    const fr = it.kind === "worth" ? it.cards.map((c: number[]) => [String(c[0]), String(c[1])])
      : (String(L.value ?? "").match(/\d+\s*\/\s*\d+/g) || []).map((s: string) => s.replace(/\s/g, "").split("/"));
    if (!fr.length) return null;
    return (
      <g>{box}
        {fr.slice(0, 2).map((f: string[], k: number) => (
          <WoFrac key={k} x={w - 60 - k * 80} y={mid} a={f[0]} b={f[1]} size={T.micro} C={C} topInk={woInk(WO_BLUE)} />
        ))}
        {it.kind === "worth" && <WoPie x={40} y={mid} r={22} d={Number(fr[0][1])} blue={Number(fr[0][1])} />}
      </g>
    );
  }
  if (it.kind === "kind" || it.kind === "write") {
    return (
      <g>{box}{pies(it.show[0], it.show[2], it.show[2])}
        <WoMixed x={w - 50} y={mid} w={it.show[0]} a={it.show[1]} b={it.show[2]} size={T.micro} big={T.label} C={C} />
      </g>
    );
  }
  /* a converted answer draws the pair the child turned one way or the other, tied with the rose
     "=": whole ones are not drawn here, since five of them would not fit and three standing for
     five is a picture a teacher can miscount */
  const ps = slotPartsOf(L.value, it.parts ? it.parts.length : 2);
  const tie = (x: number) => <text x={x} y={mid + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={woInk(WO_ROSE)}>=</text>;
  if (it.kind === "divide") {
    return (
      <g>{box}
        <WoFrac x={46} y={mid} a={it.from[0]} b={it.from[1]} size={T.micro} C={C} topInk={woInk(WO_BLUE)} />
        {tie(100)}
        <WoMixed x={176} y={mid} w={ps[0]} a={ps[1]} b={ps[2]} size={T.micro} big={T.label} C={C} wholeInk={woInk(WO_GREEN)} topInk={woInk(WO_BLUE)} />
      </g>
    );
  }
  return (
    <g>{box}
      <WoMixed x={66} y={mid} w={it.mixed[0]} a={it.mixed[1]} b={it.mixed[2]} size={T.micro} big={T.label} C={C} wholeInk={woInk(WO_GREEN)} />
      {tie(116)}
      <WoFrac x={176} y={mid} a={ps[0]} b={ps[1]} size={T.micro} C={C} topInk={woInk(WO_BLUE)} />
    </g>
  );
}

function WholeOnesTray(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null }} />
  );
}

export default WholeOnesTray;
