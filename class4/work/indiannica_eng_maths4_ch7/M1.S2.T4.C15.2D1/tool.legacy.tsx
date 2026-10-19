/* ═══ M1.S2.T4.C12.2D1 · lowest_terms_ladder · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them).

   The ladder lies across the top of the working area, as the book writes 32/48 = 16/24 = 8/12 = 2/3:
   each rung a stacked fraction on a card with its value bar beside it, and an arrow from each old
   number to its new one carrying the factor. Under it, the factors of the current rung's two numbers
   stand in two rows; a factor in both rows is drawn rose in both, and those tiles are the pieces.
   A tile dropped on the rung opens the next rung empty; the child types its two numbers (the slot
   mirrors into the rung). A right rung is written; a right rung in lowest terms is the answer. */

const TOOL_ID = "lowest_terms_ladder";
const MEDIA_ID = "M1.S2.T4.C12.2D1";
const TOOL_NAME = "Lowest Terms Ladder";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line; the ladder lies across) */
const OPENING = ["A fraction stands on the first rung of the ladder. Find something that goes into both of its numbers."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every ladder walked down to its last rung, and the strip beside it never moved at all.";
/* said when the child opens Free play from the summary page */
const FREE_LINE = "Free play. Pick any fraction and step it down with whichever tiles you like.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r21: `lineFor(line, lang, TR)`); the English
   everywhere else stays what the checks read. NCERT class 4 fractions: भिन्न / અપૂર્ણાંક, अंश / અંશ,
   हर / છેદ, सरलतम रूप / સાદું રૂપ. A fraction is never written with a slash in hi/gu (the voice does not
   read "/"): "21 में से 14 भाग" / "21 માંથી 14 ભાગ". Factor: गुणनखंड / અવયવ; common: साझा / સામાન્ય.
   The ladder is सीढ़ी / નિસરણી, a rung पायदान / પગથિયું, a step कदम / પગલું. Digits stay digits: the
   runtime speaks them in the language in use. A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Lowest Terms Ladder": "सरलतम रूप की सीढ़ी",
    "A fraction stands on the first rung of the ladder. Find something that goes into both of its numbers.": "सीढ़ी के पहले पायदान पर एक भिन्न खड़ा है। ऐसी संख्या ढूँढो जिससे उसकी दोनों संख्याएँ बँट जाएँ।",
    "Every ladder walked down to its last rung, and the strip beside it never moved at all.": "हर सीढ़ी आखिरी पायदान तक उतरी। उसके पास की पट्टी ज़रा भी नहीं हिली।",
    "Free play. Pick any fraction and step it down with whichever tiles you like.": "मुक्त खेल। कोई भी भिन्न चुनो और अपनी पसंद की टाइलों से उसे नीचे उतारो।",

    "Dividing both numbers by the same thing": "दोनों संख्याओं को एक ही संख्या से भाग देना",
    "Each number has its factors in a row below.": "हर संख्या के गुणनखंड नीचे एक पंक्ति में हैं।",
    "A tile coloured in both rows goes into both numbers.": "दोनों पंक्तियों में रंगी टाइल से दोनों संख्याएँ बँटती हैं।",
    "Drag it onto the fraction, then type the new top and bottom.": "उसे भिन्न पर खींचो, फिर ऊपर और नीचे की नई संख्या लिखो।",
    "What happens to the other number when you use that one?": "उसे लगाने पर दूसरी संख्या का क्या होता है?",
    "Divide the top by the coloured factor, then divide the bottom by the very same one.": "ऊपर की संख्या को रंगीन गुणनखंड से भाग दो। फिर नीचे की संख्या को भी उसी से भाग दो।",
    "Divide the upper number and the lower number by the same common factor. Dividing one alone changes the amount.": "ऊपर और नीचे की संख्या को एक ही साझा गुणनखंड से भाग दो। एक को अकेले भाग देने से मात्रा बदल जाती है।",
    "You learned: divide both numbers by the same common factor.": "तुमने सीखा: दोनों संख्याओं को एक ही साझा गुणनखंड से भाग दो।",
    "Reduce 14/21 by dividing both of its numbers by the same factor.": "21 में से 14 भाग को सरल करो। दोनों संख्याओं को एक ही गुणनखंड से भाग दो।",
    "Step it down to lowest terms": "सरलतम रूप तक उतारो",
    "Which numbers are drawn in the same colour in your two lists?": "तुम्हारी दोनों सूचियों में कौन सी संख्याएँ एक ही रंग की हैं?",
    "Reduce 6/15 to its lowest terms.": "15 में से 6 भाग को सरलतम रूप में लिखो।",
    "Lowest terms?": "सरलतम रूप?",
    "Did the top and the bottom both get divided by one and the same number?": "क्या ऊपर और नीचे, दोनों को एक ही संख्या से भाग दिया?",
    "Now try 10/25 the same way.": "अब 25 में से 10 भाग को भी इसी तरह करो।",
    "All the way down": "आखिर तक उतारो",
    "Which tile stands in the row of ten and in the row of twenty-five?": "कौन सी टाइल 10 वाली और 25 वाली, दोनों पंक्तियों में है?",

    "Knowing when to stop": "कब रुकना है, यह जानना",
    "Look at both lists. Is there anything left that goes into both?": "दोनों सूचियाँ देखो। क्या अब भी कोई संख्या बची है जिससे दोनों बँट जाएँ?",
    "Is there anything above one standing in both lists?": "क्या एक से बड़ी कोई संख्या दोनों सूचियों में है?",
    "Read the two rows side by side, one number at a time, and look for a match.": "दोनों पंक्तियाँ साथ-साथ पढ़ो। एक-एक संख्या देखो और मिलती हुई ढूँढो।",
    "A fraction is finished only when its two numbers share no factor above one. The two lists show you that.": "भिन्न कब पूरा होता है? जब दोनों संख्याओं का एक से बड़ा कोई साझा गुणनखंड न हो। दोनों सूचियाँ यही दिखाती हैं।",
    "You learned: stop when the two numbers share no factor above one.": "तुमने सीखा: एक से बड़ा साझा गुणनखंड न बचे, तब रुको।",
    "finished": "पूरा हुआ",
    "not yet": "अभी नहीं",
    "A child reduces 24/36 to 6/9 and stops there. Is the work finished?": "बच्चे ने 36 में से 24 भाग को 9 में से 6 भाग किया। वह वहीं रुक गया। क्या काम पूरा हुआ?",
    "Is it finished?": "क्या यह पूरा हुआ?",
    "What are the factors of the two numbers on your last rung?": "तुम्हारे आखिरी पायदान की दोनों संख्याओं के गुणनखंड क्या हैं?",
    "yes": "हाँ",
    "no": "नहीं",
    "Another child takes 18/24 down to 9/12. Is 9/12 in lowest terms?": "दूसरा बच्चा 24 में से 18 भाग को 12 में से 9 भाग तक लाया। क्या यह सरलतम रूप है?",
    "In lowest terms?": "सरलतम रूप में?",
    "Say the factors of nine, then the factors of twelve. Did any number above one come twice?": "9 के गुणनखंड बोलो, फिर 12 के गुणनखंड। क्या एक से बड़ी कोई संख्या दो बार आई?",
    "Reduce 42/56, and stop only when there is nothing left to share.": "56 में से 42 भाग को सरल करो। तब रुको, जब कुछ भी साझा न बचे।",
    "Down to the last rung": "आखिरी पायदान तक",
    "Look at the rows of your last rung. Is a coloured tile above one still there?": "आखिरी पायदान की पंक्तियाँ देखो। क्या एक से बड़ी कोई रंगीन टाइल अब भी है?",

    "The long way and the short way": "लंबा रास्ता और छोटा रास्ता",
    "Two ladders start from one fraction, and one of them takes small steps.": "दो सीढ़ियाँ एक ही भिन्न से शुरू होती हैं। एक सीढ़ी छोटे-छोटे कदम लेती है।",
    "Where do you think the two ladders will meet?": "तुम्हें क्या लगता है, दोनों सीढ़ियाँ कहाँ मिलेंगी?",
    "What do the two ladders have written on their bottom rungs?": "दोनों सीढ़ियों के आखिरी पायदान पर क्या लिखा है?",
    "A bigger shared factor takes you down in fewer steps.": "बड़ा साझा गुणनखंड कम कदमों में नीचे ले जाता है।",
    "The largest common factor finishes in one step. A smaller one takes more steps and lands in the same place.": "सबसे बड़ा साझा गुणनखंड एक ही कदम में पूरा कर देता है। छोटा गुणनखंड ज़्यादा कदम लेता है, और पहुँचता उसी जगह है।",
    "You learned: the largest common factor gets there in one step.": "तुमने सीखा: सबसे बड़ा साझा गुणनखंड एक कदम में पहुँचा देता है।",
    "Reduce 32/48 by halving twice, then dividing by four. Then reduce it again by sixteen in one step. Do the two agree?": "48 में से 32 भाग को दो बार आधा करो, फिर चार से भाग दो। फिर उसे सोलह से एक ही कदम में सरल करो। क्या दोनों एक जैसे निकले?",
    "Do the two agree?": "क्या दोनों एक जैसे निकले?",
    "Check each step of the long ladder. Did any step change the amount?": "लंबी सीढ़ी का हर कदम जाँचो। क्या किसी कदम ने मात्रा बदली?",
    "Reduce 27/45 by dividing by three twice, then check it by dividing by nine in one step.": "45 में से 27 भाग को तीन से दो बार भाग दो। फिर नौ से एक ही कदम में जाँचो।",
    "Where do both land?": "दोनों कहाँ पहुँचते हैं?",
    "Does three still go into both numbers on the top ladder?": "क्या ऊपर वाली सीढ़ी की दोनों संख्याएँ अब भी तीन से बँटती हैं?",
    "Which single factor reduces 60/84 in one step, and what does it give?": "कौन सा गुणनखंड 84 में से 60 भाग को एक कदम में सरल करता है? और उससे क्या मिलता है?",
    "One step down": "एक कदम में नीचे",
    "What is the last number standing in both of your lists?": "तुम्हारी दोनों सूचियों में आखिरी साझा संख्या कौन सी है?",

    "The amount does not move": "मात्रा नहीं बदलती",
    "The numbers keep getting smaller. Watch the strip beside them.": "संख्याएँ छोटी होती जा रही हैं। उनके पास की पट्टी देखो।",
    "Where does it stop on the last one?": "आखिरी वाली पर यह कहाँ रुकता है?",
    "Lay the first rung beside the last one and compare the two strips.": "पहले पायदान को आखिरी के पास रखो और दोनों पट्टियों की तुलना करो।",
    "Reducing changes how a fraction is written, never how much it is worth. So the reduced one may take its place.": "सरल करने से भिन्न का रूप बदलता है, उसकी मात्रा कभी नहीं। इसलिए सरल किया भिन्न उसकी जगह ले सकता है।",
    "You learned: reducing changes the writing, never the amount.": "तुमने सीखा: सरल करने से लिखावट बदलती है, मात्रा नहीं।",
    "less": "कम",
    "more": "ज़्यादा",
    "the same": "बराबर",
    "Is 5/8 less than 20/32, more than it, or the same amount?": "8 में से 5 भाग, 32 में से 20 भाग से कम है या ज़्यादा? या दोनों बराबर हैं?",
    "Less, more or the same?": "कम, ज़्यादा या बराबर?",
    "Where does the colour stop on the first strip?": "पहली पट्टी में रंग कहाँ रुकता है?",
    "bigger": "बड़ा",
    "smaller": "छोटा",
    "Is 22/33 bigger than 2/3, smaller than it, or the same?": "33 में से 22 भाग, 3 में से 2 भाग से बड़ा है या छोटा? या दोनों बराबर हैं?",
    "Bigger, smaller or same?": "बड़ा, छोटा या बराबर?",
    "Put a finger where each bar stops filling. Are the two level?": "जहाँ हर पट्टी का रंग रुकता है, वहाँ उँगली रखो। क्या दोनों बराबर हैं?",
    "Reduce 84/108, and watch whether the strip moves on the way down.": "108 में से 84 भाग को सरल करो। देखो, नीचे आते समय पट्टी हिलती है या नहीं।",
    "Down to lowest terms": "सरलतम रूप तक नीचे",
    "Which coloured tile would take you furthest down in one go?": "कौन सी रंगीन टाइल तुम्हें एक बार में सबसे नीचे ले जाएगी?",

    /* what the working area draws, the slot's own labels and the keys */
    "how much": "कितना", "lowest terms": "सरलतम रूप", "you wrote": "तुमने लिखा", "step": "कदम", "steps": "कदम",
    "undo a rung": "पायदान वापस", "new fraction": "नया भिन्न",
    "numerator": "अंश", "denominator": "हर",
  },
  gu: {
    "Lowest Terms Ladder": "સાદા રૂપની નિસરણી",
    "A fraction stands on the first rung of the ladder. Find something that goes into both of its numbers.": "નિસરણીના પહેલા પગથિયા પર એક અપૂર્ણાંક ઊભો છે. એવી સંખ્યા શોધો જેનાથી તેની બંને સંખ્યાઓ ભાગી શકાય.",
    "Every ladder walked down to its last rung, and the strip beside it never moved at all.": "દરેક નિસરણી છેલ્લા પગથિયા સુધી ઊતરી. તેની બાજુની પટ્ટી જરાય હલી નહીં.",
    "Free play. Pick any fraction and step it down with whichever tiles you like.": "મુક્ત રમત. કોઈ અપૂર્ણાંક પસંદ કરો અને મનગમતી ટાઇલોથી તેને નીચે ઉતારો.",

    "Dividing both numbers by the same thing": "બંને સંખ્યાઓને એક જ સંખ્યાથી ભાગવી",
    "Each number has its factors in a row below.": "દરેક સંખ્યાના અવયવ નીચે એક હરોળમાં છે.",
    "A tile coloured in both rows goes into both numbers.": "જે ટાઇલ બંને હરોળમાં રંગીન છે, તેનાથી બંને સંખ્યાઓ ભાગી શકાય છે.",
    "Drag it onto the fraction, then type the new top and bottom.": "તેને અપૂર્ણાંક પર ખેંચો, પછી ઉપરની અને નીચેની નવી સંખ્યા લખો.",
    "What happens to the other number when you use that one?": "તેનો ઉપયોગ કરતાં બીજી સંખ્યાનું શું થાય છે?",
    "Divide the top by the coloured factor, then divide the bottom by the very same one.": "ઉપરની સંખ્યાને રંગીન અવયવથી ભાગો. પછી નીચેની સંખ્યાને પણ એ જ અવયવથી ભાગો.",
    "Divide the upper number and the lower number by the same common factor. Dividing one alone changes the amount.": "ઉપરની અને નીચેની સંખ્યાને એક જ સામાન્ય અવયવથી ભાગો. કોઈ એક સંખ્યાને એકલી ભાગવાથી જથ્થો બદલાઈ જાય છે.",
    "You learned: divide both numbers by the same common factor.": "તમે શીખ્યા: બંને સંખ્યાઓને એક જ સામાન્ય અવયવથી ભાગો.",
    "Reduce 14/21 by dividing both of its numbers by the same factor.": "21 માંથી 14 ભાગને સાદું કરો. બંને સંખ્યાઓને એક જ અવયવથી ભાગો.",
    "Step it down to lowest terms": "સાદા રૂપ સુધી ઉતારો",
    "Which numbers are drawn in the same colour in your two lists?": "તમારી બંને યાદીમાં કઈ સંખ્યાઓ એક જ રંગની છે?",
    "Reduce 6/15 to its lowest terms.": "15 માંથી 6 ભાગને સાદા રૂપમાં લખો.",
    "Lowest terms?": "સાદું રૂપ?",
    "Did the top and the bottom both get divided by one and the same number?": "શું ઉપર અને નીચે, બંનેને એક જ સંખ્યાથી ભાગ્યા?",
    "Now try 10/25 the same way.": "હવે 25 માંથી 10 ભાગને પણ આ જ રીતે કરો.",
    "All the way down": "છેલ્લે સુધી ઉતારો",
    "Which tile stands in the row of ten and in the row of twenty-five?": "કઈ ટાઇલ 10 વાળી અને 25 વાળી, બંને હરોળમાં છે?",

    "Knowing when to stop": "ક્યારે અટકવું તે જાણવું",
    "Look at both lists. Is there anything left that goes into both?": "બંને યાદી જુઓ. શું હજી કોઈ સંખ્યા બાકી છે જેનાથી બંને ભાગી શકાય?",
    "Is there anything above one standing in both lists?": "શું એકથી મોટી કોઈ સંખ્યા બંને યાદીમાં છે?",
    "Read the two rows side by side, one number at a time, and look for a match.": "બંને હરોળ સાથે સાથે વાંચો. એક એક સંખ્યા જુઓ અને મળતી સંખ્યા શોધો.",
    "A fraction is finished only when its two numbers share no factor above one. The two lists show you that.": "અપૂર્ણાંક ક્યારે પૂરો થાય? જ્યારે બંને સંખ્યાઓનો એકથી મોટો કોઈ સામાન્ય અવયવ ન રહે. બંને યાદી એ જ બતાવે છે.",
    "You learned: stop when the two numbers share no factor above one.": "તમે શીખ્યા: એકથી મોટો સામાન્ય અવયવ ન રહે, ત્યારે અટકો.",
    "finished": "પૂરું થયું",
    "not yet": "હજી નહીં",
    "A child reduces 24/36 to 6/9 and stops there. Is the work finished?": "બાળકે 36 માંથી 24 ભાગને 9 માંથી 6 ભાગ કર્યો. તે અટકી ગયું. શું કામ પૂરું થયું?",
    "Is it finished?": "શું આ પૂરું થયું?",
    "What are the factors of the two numbers on your last rung?": "તમારા છેલ્લા પગથિયાની બંને સંખ્યાઓના અવયવ કયા છે?",
    "yes": "હા",
    "no": "ના",
    "Another child takes 18/24 down to 9/12. Is 9/12 in lowest terms?": "બીજું બાળક 24 માંથી 18 ભાગને 12 માંથી 9 ભાગ સુધી લાવ્યું. શું આ સાદું રૂપ છે?",
    "In lowest terms?": "સાદા રૂપમાં?",
    "Say the factors of nine, then the factors of twelve. Did any number above one come twice?": "9 ના અવયવ બોલો, પછી 12 ના અવયવ. શું એકથી મોટી કોઈ સંખ્યા બે વાર આવી?",
    "Reduce 42/56, and stop only when there is nothing left to share.": "56 માંથી 42 ભાગને સાદું કરો. ત્યારે જ અટકો, જ્યારે કશું સામાન્ય ન બચે.",
    "Down to the last rung": "છેલ્લા પગથિયા સુધી",
    "Look at the rows of your last rung. Is a coloured tile above one still there?": "છેલ્લા પગથિયાની હરોળ જુઓ. શું એકથી મોટી કોઈ રંગીન ટાઇલ હજી છે?",

    "The long way and the short way": "લાંબો રસ્તો અને ટૂંકો રસ્તો",
    "Two ladders start from one fraction, and one of them takes small steps.": "બે નિસરણી એક જ અપૂર્ણાંકથી શરૂ થાય છે. એક નિસરણી નાનાં નાનાં પગલાં ભરે છે.",
    "Where do you think the two ladders will meet?": "તમને શું લાગે છે, બંને નિસરણી ક્યાં મળશે?",
    "What do the two ladders have written on their bottom rungs?": "બંને નિસરણીના છેલ્લા પગથિયા પર શું લખ્યું છે?",
    "A bigger shared factor takes you down in fewer steps.": "મોટો સામાન્ય અવયવ ઓછાં પગલાંમાં નીચે પહોંચાડે છે.",
    "The largest common factor finishes in one step. A smaller one takes more steps and lands in the same place.": "સૌથી મોટો સામાન્ય અવયવ એક જ પગલામાં પૂરું કરે છે. નાનો અવયવ વધુ પગલાં લે છે, અને પહોંચે છે એ જ જગ્યાએ.",
    "You learned: the largest common factor gets there in one step.": "તમે શીખ્યા: સૌથી મોટો સામાન્ય અવયવ એક પગલામાં પહોંચાડે છે.",
    "Reduce 32/48 by halving twice, then dividing by four. Then reduce it again by sixteen in one step. Do the two agree?": "48 માંથી 32 ભાગને બે વાર અડધો કરો, પછી ચારથી ભાગો. પછી તેને સોળથી એક જ પગલામાં સાદો કરો. શું બંને એકસરખા આવ્યા?",
    "Do the two agree?": "શું બંને એકસરખા આવ્યા?",
    "Check each step of the long ladder. Did any step change the amount?": "લાંબી નિસરણીનું દરેક પગલું તપાસો. શું કોઈ પગલાએ જથ્થો બદલ્યો?",
    "Reduce 27/45 by dividing by three twice, then check it by dividing by nine in one step.": "45 માંથી 27 ભાગને ત્રણથી બે વાર ભાગો. પછી નવથી એક જ પગલામાં તપાસો.",
    "Where do both land?": "બંને ક્યાં પહોંચે છે?",
    "Does three still go into both numbers on the top ladder?": "શું ઉપરની નિસરણીની બંને સંખ્યાઓ હજી ત્રણથી ભાગી શકાય છે?",
    "Which single factor reduces 60/84 in one step, and what does it give?": "કયો એક અવયવ 84 માંથી 60 ભાગને એક પગલામાં સાદો કરે છે? અને તેનાથી શું મળે છે?",
    "One step down": "એક પગલામાં નીચે",
    "What is the last number standing in both of your lists?": "તમારી બંને યાદીમાં છેલ્લી સામાન્ય સંખ્યા કઈ છે?",

    "The amount does not move": "જથ્થો બદલાતો નથી",
    "The numbers keep getting smaller. Watch the strip beside them.": "સંખ્યાઓ નાની થતી જાય છે. તેમની બાજુની પટ્ટી જુઓ.",
    "Where does it stop on the last one?": "છેલ્લી પર તે ક્યાં અટકે છે?",
    "Lay the first rung beside the last one and compare the two strips.": "પહેલા પગથિયાને છેલ્લાની બાજુમાં મૂકો અને બંને પટ્ટીઓ સરખાવો.",
    "Reducing changes how a fraction is written, never how much it is worth. So the reduced one may take its place.": "સાદું કરવાથી લખવાની રીત બદલાય છે, જથ્થો ક્યારેય નહીં. એટલે સાદો કરેલો અપૂર્ણાંક તેની જગ્યા લઈ શકે.",
    "You learned: reducing changes the writing, never the amount.": "તમે શીખ્યા: સાદું કરવાથી લખાણ બદલાય છે, જથ્થો નહીં.",
    "less": "ઓછો",
    "more": "વધુ",
    "the same": "સરખો",
    "Is 5/8 less than 20/32, more than it, or the same amount?": "8 માંથી 5 ભાગ, 32 માંથી 20 ભાગ કરતાં ઓછો કે વધુ? કે બંને સરખા છે?",
    "Less, more or the same?": "ઓછો, વધુ કે સરખો?",
    "Where does the colour stop on the first strip?": "પહેલી પટ્ટીમાં રંગ ક્યાં અટકે છે?",
    "bigger": "મોટો",
    "smaller": "નાનો",
    "Is 22/33 bigger than 2/3, smaller than it, or the same?": "33 માંથી 22 ભાગ, 3 માંથી 2 ભાગ કરતાં મોટો કે નાનો? કે બંને સરખા છે?",
    "Bigger, smaller or same?": "મોટો, નાનો કે સરખો?",
    "Put a finger where each bar stops filling. Are the two level?": "દરેક પટ્ટીમાં જ્યાં રંગ અટકે ત્યાં આંગળી મૂકો. શું બંને એક ઊંચાઈએ છે?",
    "Reduce 84/108, and watch whether the strip moves on the way down.": "108 માંથી 84 ભાગને સાદું કરો. જુઓ, નીચે આવતાં પટ્ટી હલે છે કે નહીં?",
    "Down to lowest terms": "સાદા રૂપ સુધી નીચે",
    "Which coloured tile would take you furthest down in one go?": "કઈ રંગીન ટાઇલ તમને એક જ વારમાં સૌથી નીચે લઈ જશે?",

    /* what the working area draws, the slot's own labels and the keys */
    "how much": "કેટલું", "lowest terms": "સાદું રૂપ", "you wrote": "તમે લખ્યું", "step": "પગલું", "steps": "પગલાં",
    "undo a rung": "પગથિયું પાછું", "new fraction": "નવો અપૂર્ણાંક",
    "numerator": "અંશ", "denominator": "છેદ",
  },
};

/* One entry per phase = one mount. Item kinds (Work, judge and oracle switch on them):
   reduce  from [n, d]: the child drops shared factors and types each rung; answer = lowest terms (stacked)
   stop    rungs: a story child's ladder, stopped; choices: finished or not
   routes  from + routes (the question's two routes, top ladder and bottom ladder); choices or the last rung
   same    rungs: a written ladder with empty bars; choices: less, more or the same (predict, then fill)
   near    the item's misconception (nearMiss) */
const PHASES = [
  {
    n: 1,
    concept: "Dividing both numbers by the same thing",
    conceptId: "M1.S2.T4.C12", objectiveIds: ["O5"],
    says: ["Each number has its factors in a row below.", "A tile coloured in both rows goes into both numbers.", "Drag it onto the fraction, then type the new top and bottom."],
    ladder: ["What happens to the other number when you use that one?", "Divide the top by the coloured factor, then divide the bottom by the very same one."],
    closing: "Divide the upper number and the lower number by the same common factor. Dividing one alone changes the amount.",
    learned: "You learned: divide both numbers by the same common factor.",
    traceback: "Your fraction and its bar stand beside the rung's bar on the guide line; then the shared factor divides both numbers and the lowest rung is written, ringed, with the done light.",
    items: [
      /* learn ML1: answer in the plan = 2/3 */
      { qid: "M1.S2.T4.C12:ML1", kind: "reduce", from: [14, 21], parts: SLOT_FRACTION, answer: [2, 3], near: "2|21", winMs: 2000,
        say: "Reduce 14/21 by dividing both of its numbers by the same factor.", ask: "Step it down to lowest terms",
        miss: "Which numbers are drawn in the same colour in your two lists?" },
      /* practice 1: answer in the plan = 2/5 */
      { qid: "M1.S2.T4.C12:1", kind: "reduce", from: [6, 15], parts: SLOT_FRACTION, answer: [2, 5], near: "3|5", winMs: 2000,
        say: "Reduce 6/15 to its lowest terms.", ask: "Lowest terms?",
        miss: "Did the top and the bottom both get divided by one and the same number?" },
      /* practice 2: answer in the plan = 2/5 */
      { qid: "M1.S2.T4.C12:2", kind: "reduce", from: [10, 25], parts: SLOT_FRACTION, answer: [2, 5], near: "2|25", winMs: 2000,
        say: "Now try 10/25 the same way.", ask: "All the way down",
        miss: "Which tile stands in the row of ten and in the row of twenty-five?" },
    ],
  },
  {
    n: 2,
    concept: "Knowing when to stop",
    conceptId: "M1.S2.T4.C13", objectiveIds: ["O5"],
    says: ["Look at both lists. Is there anything left that goes into both?"],
    ladder: ["Is there anything above one standing in both lists?", "Read the two rows side by side, one number at a time, and look for a match."],
    closing: "A fraction is finished only when its two numbers share no factor above one. The two lists show you that.",
    learned: "You learned: stop when the two numbers share no factor above one.",
    traceback: "The factor the last rung still shares lights in both rows, divides both numbers, and the next rung is written until the done light comes on.",
    items: [
      /* learn ML2: answer in the plan = No. Six and nine still share three, so it goes on to 2/3 */
      { qid: "M1.S2.T4.C13:ML2", kind: "stop", rungs: [[24, 36], [6, 9]], answer: "not yet", near: "finished", winMs: 2200,
        choices: [{ id: "finished", label: "finished" }, { id: "not yet", label: "not yet" }],
        say: "A child reduces 24/36 to 6/9 and stops there. Is the work finished?", ask: "Is it finished?",
        miss: "What are the factors of the two numbers on your last rung?" },
      /* practice 3: answer in the plan = No, because nine and twelve still share three, so it goes on to 3/4 */
      { qid: "M1.S2.T4.C13:3", kind: "stop", rungs: [[18, 24], [9, 12]], answer: "no", near: "yes", winMs: 2200,
        choices: [{ id: "yes", label: "yes" }, { id: "no", label: "no" }],
        say: "Another child takes 18/24 down to 9/12. Is 9/12 in lowest terms?", ask: "In lowest terms?",
        miss: "Say the factors of nine, then the factors of twelve. Did any number above one come twice?" },
      /* practice 4: answer in the plan = 3/4, and you stop because three and four share no factor except one */
      { qid: "M1.S2.T4.C13:4", kind: "reduce", from: [42, 56], parts: SLOT_FRACTION, answer: [3, 4], near: "6|8", winMs: 2000,
        say: "Reduce 42/56, and stop only when there is nothing left to share.", ask: "Down to the last rung",
        miss: "Look at the rows of your last rung. Is a coloured tile above one still there?" },
    ],
  },
  {
    n: 3,
    concept: "The long way and the short way",
    conceptId: "M1.S2.T4.C14", objectiveIds: ["O6"],
    says: ["Two ladders start from one fraction, and one of them takes small steps.", "Where do you think the two ladders will meet?"],
    ladder: ["What do the two ladders have written on their bottom rungs?", "A bigger shared factor takes you down in fewer steps."],
    closing: "The largest common factor finishes in one step. A smaller one takes more steps and lands in the same place.",
    learned: "You learned: the largest common factor gets there in one step.",
    traceback: "Both ladders are walked to the end along their own routes and their last rungs are joined by a line, with the step count under each and the bars level.",
    items: [
      /* learn ML3: answer in the plan = Yes. Both routes end at 2/3 */
      { qid: "M1.S2.T4.C14:ML3", kind: "routes", from: [32, 48], routes: [[2, 2, 4], [16]], answer: "yes", near: "no", winMs: 3800,
        choices: [{ id: "yes", label: "yes" }, { id: "no", label: "no" }],
        say: "Reduce 32/48 by halving twice, then dividing by four. Then reduce it again by sixteen in one step. Do the two agree?",
        ask: "Do the two agree?",
        miss: "Check each step of the long ladder. Did any step change the amount?" },
      /* practice 5: answer in the plan = 3/5 both ways, since dividing by three twice gives 9/15 and then 3/5 */
      { qid: "M1.S2.T4.C14:5", kind: "routes", from: [27, 45], routes: [[3, 3], [9]], parts: SLOT_FRACTION, answer: [3, 5], near: "9|15", winMs: 2800,
        say: "Reduce 27/45 by dividing by three twice, then check it by dividing by nine in one step.", ask: "Where do both land?",
        miss: "Does three still go into both numbers on the top ladder?" },
      /* practice 6: answer in the plan = Twelve, and it gives 5/7 */
      { qid: "M1.S2.T4.C14:6", kind: "reduce", from: [60, 84], parts: SLOT_FRACTION, answer: [5, 7], near: "10|14", winMs: 2000,
        say: "Which single factor reduces 60/84 in one step, and what does it give?", ask: "One step down",
        miss: "What is the last number standing in both of your lists?" },
    ],
  },
  {
    n: 4,
    concept: "The amount does not move",
    conceptId: "M1.S2.T4.C15", objectiveIds: ["O6"],
    says: ["The numbers keep getting smaller. Watch the strip beside them."],
    ladder: ["Where does it stop on the last one?", "Lay the first rung beside the last one and compare the two strips."],
    closing: "Reducing changes how a fraction is written, never how much it is worth. So the reduced one may take its place.",
    learned: "You learned: reducing changes the writing, never the amount.",
    traceback: "Every strip is filled rung by rung and lands on the guide line; then the first and last rungs are laid side by side with their bars level.",
    items: [
      /* learn ML4: answer in the plan = The same amount */
      { qid: "M1.S2.T4.C15:ML4", kind: "same", rungs: [[20, 32], [10, 16], [5, 8]], answer: "same", near: "less", winMs: 3000,
        choices: [{ id: "less", label: "less" }, { id: "more", label: "more" }, { id: "same", label: "the same" }],
        say: "Is 5/8 less than 20/32, more than it, or the same amount?", ask: "Less, more or the same?",
        miss: "Where does the colour stop on the first strip?" },
      /* practice 7: answer in the plan = The same, because dividing both numbers of 22/33 by eleven gives 2/3 */
      { qid: "M1.S2.T4.C15:7", kind: "same", rungs: [[22, 33], [2, 3]], answer: "same", near: "bigger", winMs: 2600,
        choices: [{ id: "bigger", label: "bigger" }, { id: "smaller", label: "smaller" }, { id: "same", label: "the same" }],
        say: "Is 22/33 bigger than 2/3, smaller than it, or the same?", ask: "Bigger, smaller or same?",
        miss: "Put a finger where each bar stops filling. Are the two level?" },
      /* practice 8: answer in the plan = 7/9, and the amount did not change at all, only the way it is written */
      { qid: "M1.S2.T4.C15:8", kind: "reduce", from: [84, 108], parts: SLOT_FRACTION, answer: [7, 9], near: "80|104", winMs: 2000,
        say: "Reduce 84/108, and watch whether the strip moves on the way down.", ask: "Down to lowest terms",
        miss: "Which coloured tile would take you furthest down in one go?" },
    ],
  },
];

/* ── the ladder's own helpers (lt… names: tools and the runtime share one scope) ─────────── */
const ltGcd = (a: number, b: number): number => (b ? ltGcd(b, a % b) : a);
const ltFactors = (x: number): number[] => { const out: number[] = []; for (let k = 1; k <= x; k++) if (x % k === 0) out.push(k); return out; };
const ltLowest = (r: any) => ltGcd(r.n, r.d) === 1;
const ltLast = (lk: any) => lk.rungs[lk.rungs.length - 1];
/* free play's fractions: every one reaches lowest terms in at most three steps (four rungs) */
const LT_FREE = [[12, 18], [24, 36], [20, 32], [42, 56], [16, 40], [60, 84], [18, 24], [45, 60]];

/* working-area geometry: a rung is a card 140 x 186 with its value bar 42 wide beside it. The ladder
   stays centred as it grows: the rungs it holds now (the one being typed included) decide where it
   starts, and it slides over when a rung is added. */
const LG = { cardW: 140, cardH: 186, barW: 42, barGap: 10, unit: 192, tops: [12, 264],
  rows: [262, 358], tileP: 78, doneY: 206, cmpTop: 262 };
/* prime factors with multiplicity: the most rungs a fraction can take (one step a prime) */
const ltOmega = (x: number) => { let m = x, c = 0; for (let p = 2; p <= m; p++) while (m % p === 0) { m /= p; c++; } return c; };
const ltPitch = (maxRungs: number) => (maxRungs >= 4 ? 276 : 300);
const ltX0 = (count: number, pitch: number) => Math.max(8, (W.w - ((count - 1) * pitch + LG.unit)) / 2);
/* a factor row is centred too, with its number at the left of it */
const ltRowX0 = (count: number) => Math.max(76, (W.w - (count * LG.tileP - 6)) / 2);

/* a ladder's rungs from an item: [{ rungs: [{ n, d, f, col }], route, used }] */
const ltSetup = (it: any) => {
  if (it && (it.kind === "stop" || it.kind === "same"))
    return [{ rungs: it.rungs.map((r: number[], k: number) => ({ n: r[0], d: r[1], f: k ? it.rungs[k - 1][0] / r[0] : null, col: k })), route: null, used: 0 }];
  const from = it && it.from ? it.from : LT_FREE[0];
  if (it && it.kind === "routes") return it.routes.map((rt: number[]) => ({ rungs: [{ n: from[0], d: from[1], f: null, col: 0 }], route: rt, used: 0 }));
  return [{ rungs: [{ n: from[0], d: from[1], f: null, col: 0 }], route: null, used: 0 }];
};
const ltPanelOf = (it: any) => (it && (it.kind === "routes" || it.kind === "same") ? "none" : "lists");
/* the phase this mount opened on: the one pulse belongs to its first question and nowhere else */
const LT_MOUNT = { first: 0 };

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = { rung: { w: LG.cardW, h: LG.cardH }, bar: { w: LG.barW, h: LG.cardH }, maxRungs: 4,
  /* rungs stand one pitch apart: the wider one until a ladder can reach four rungs */
  pitch: { upToThreeRungs: ltPitch(3), fourRungs: ltPitch(4) },
  tile: { box: 72, pitch: LG.tileP }, freeFractions: LT_FREE };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a lowest-terms question wants exactly its lowest terms; a word answer its choice */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: a second route, sharing nothing with judge or Work: the common measure found by repeated
   subtraction, routes multiplied out, a stopped rung tried against every number, amounts compared by
   cross-multiplying */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const measure = (a: number, b: number) => { while (a !== b) { if (a > b) a -= b; else b -= a; } return a; };
  if (it.kind === "reduce") {
    const m = measure(it.from[0], it.from[1]);
    return it.answer[0] === it.from[0] / m && it.answer[1] === it.from[1] / m;
  }
  if (it.kind === "routes") {
    const m = measure(it.from[0], it.from[1]), low = [it.from[0] / m, it.from[1] / m];
    const ends = it.routes.map((rt: number[]) => { const prod = rt.reduce((s: number, f: number) => s * f, 1); return [it.from[0] / prod, it.from[1] / prod]; });
    const agree = ends.every((e: number[]) => e[0] === low[0] && e[1] === low[1]);
    return it.parts ? agree && it.answer[0] === low[0] && it.answer[1] === low[1] : it.answer === (agree ? "yes" : "no");
  }
  if (it.kind === "stop") {
    const [a, b] = it.rungs[it.rungs.length - 1];
    let more = false;
    for (let t = 2; t <= Math.min(a, b); t++) if (a % t === 0 && b % t === 0) more = true;
    return it.answer === it.choices[more ? 1 : 0].id;
  }
  if (it.kind === "same") {
    const [a, b] = it.rungs[0], [c, e] = it.rungs[it.rungs.length - 1];
    const chain = it.rungs.every((r: number[], k: number) => k === 0 || (it.rungs[k - 1][0] * r[1] === it.rungs[k - 1][1] * r[0]));
    return chain && a * e === b * c && it.answer === "same";
  }
  return false;
}));
/* the item's misconception: the top divided alone, different factors, a stop too soon, a route doubted,
   four taken off rather than divided, smaller numbers read as a smaller amount */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print (a word choice is the
   question's own list of options, so it has none) */
const answerForms = (item: any) => (item.parts ? [item.answer.join("/"), fractionWords(item.answer[0], item.answer[1])] : []);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port): every answer is typed in the slot or chosen on the pad */
const solve = (item: any, T: any) => T.submit(item.answer);
/* the agent types the fraction ([2, 3] or "2|3") or picks the choice; Enter answers */
const answer = (item: any, v: any) => undefined;
const check = () => undefined;

const LT_CSS = `
.lt-move{transition:transform 520ms cubic-bezier(.3,.7,.25,1)}
.lt-slide{transition:transform 420ms cubic-bezier(.3,.7,.25,1)}
.lt-grab{cursor:grab}
@media (prefers-reduced-motion:reduce){.lt-move,.lt-slide{transition:none}}
`;

/* ── drawing pieces ──────────────────────────────────────────────────────────────────────── */

/* a fraction, stacked: the upper number over a level rule over the lower number */
function LtFrac({ cx, top, n, d, C }: any) {
  const len = Math.max(String(n).length, String(d).length);
  const bw = len * 36 + 22;
  return (
    <g>
      <text x={cx} y={top + 76} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{n}</text>
      <rect x={cx - bw / 2} y={top + 92} width={bw} height={7} rx={3} fill={C.ink} />
      <text x={cx} y={top + 162} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{d}</text>
    </g>
  );
}

/* the value bar: a strip of fixed length cut into d parts (up to 40 cuts), n of them filled deep blue
   from the bottom, the rest amber; empty (white) until it is drawn */
function LtBar({ x, y, n, d, filled }: any) {
  const h = LG.cardH, w = LG.barW;
  const fh = Math.min(h, (h * n) / Math.max(d, 1));
  const cuts = d > 1 && d <= 40 ? Array.from({ length: d - 1 }, (_, k) => y + h - (h * (k + 1)) / d) : [];
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={filled ? tint(CONTENT.ten, 0.55) : "#FFFFFF"} />
      {filled && <rect x={x} y={y + h - fh} width={w} height={fh} fill="url(#gHundred)" />}
      {cuts.map((cy, k) => <line key={k} x1={x} x2={x + w} y1={cy} y2={cy} stroke={CONTENT.line} strokeWidth={1.2} strokeOpacity={0.55} />)}
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={CONTENT.line} strokeWidth={2.5} />
    </g>
  );
}

/* one rung: its card, its fraction and its bar */
function LtUnit({ x, top, n, d, filled = true, dashed, ring, C }: any) {
  return (
    <g>
      <rect x={x} y={top} width={LG.cardW} height={LG.cardH} rx={22} fill="#FFFFFF" stroke={dashed ? C.ink : C.rule}
        strokeWidth={dashed ? 3 : 2} strokeDasharray={dashed ? "10 8" : undefined} filter={dashed ? undefined : "url(#fShadowSoft)"} />
      <LtFrac cx={x + LG.cardW / 2} top={top} n={n} d={d} C={C} />
      <LtBar x={x + LG.cardW + LG.barGap} y={top} n={n} d={d} filled={filled} />
      {ring && <rect x={x - 8} y={top - 8} width={LG.cardW + 16} height={LG.cardH + 16} rx={28} fill="none" stroke={C.accent} strokeWidth={5} />}
    </g>
  );
}

/* the rung the two ladders are walking towards: an empty card where they will meet */
function LtLanding({ x, top, C }: any) {
  return <rect x={x} y={top} width={LG.cardW} height={LG.cardH} rx={22} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={2.5} strokeDasharray="12 10" />;
}

/* the rung waiting to be written: two empty cells the typing fills, the caret's cell edged */
function LtPending({ x, top, typed, part, C }: any) {
  const ps = slotPartsOf(typed, 2), cx = x + LG.cardW / 2;
  const cell = (k: number, y: number) => (
    <g key={k}>
      <rect x={cx - 54} y={y} width={108} height={62} rx={12} fill="#FFFFFF" stroke={part === k ? C.accent : C.rule} strokeWidth={part === k ? 4 : 2} />
      <text x={cx} y={y + 48} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{ps[k]}</text>
    </g>
  );
  return (
    <g>
      <rect x={x} y={top} width={LG.cardW} height={LG.cardH} rx={22} fill={tint(C.panel, 0.5)} stroke={C.accent} strokeWidth={3} strokeDasharray="10 8" />
      {cell(0, top + 22)}
      <rect x={cx - 48} y={top + 92} width={96} height={7} rx={3} fill={C.ink} />
      {cell(1, top + 106)}
    </g>
  );
}

/* the step between two rungs: an arrow from each old number to its new one, the factor above the
   upper arrow and below the lower one */
function LtStep({ x1, x2, top, f }: any) {
  const ink = shade(CONTENT.bead, 0.25), mid = (x1 + x2) / 2;
  return (
    <g>
      {[top + 56, top + 142].map((y, k) => (
        <g key={k}>
          <line x1={x1 + 8} y1={y} x2={x2 - 16} y2={y} stroke={ink} strokeWidth={3} />
          <path d={`M ${x2 - 6} ${y} l -13 -8 v 16 z`} fill={ink} />
          <text x={mid} y={k === 0 ? y - 22 : y + 36} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ink}>{"÷" + f}</text>
        </g>
      ))}
    </g>
  );
}

/* the guide line: level with the first rung's fill, across every bar and gap (behind no card) */
function LtGuide({ xs, top, n, d, right }: any) {
  const y = top + LG.cardH - (LG.cardH * n) / d;
  return (
    <g pointerEvents="none">
      {xs.map((x: number, i: number) => {
        const a = x + LG.cardW + 2, b = i + 1 < xs.length ? xs[i + 1] - 2 : x + LG.unit + (right || 12);
        return <line key={i} x1={a} x2={b} y1={y} y2={y} stroke={CONTENT.line} strokeWidth={3} strokeDasharray="9 7" />;
      })}
    </g>
  );
}

/* a factor tile: rose when it stands in both rows */
function LtTile({ x, y, f, shared, lit, lift, C }: any) {
  const s = String(f).length > 2 ? T.micro : T.label;
  return (
    <g filter={lift ? "url(#fLift)" : undefined}>
      <rect x={x + 4} y={y + 4} width={64} height={64} rx={16} fill={shared ? tint(CONTENT.bead, 0.5) : "#FFFFFF"}
        stroke={shared ? shade(CONTENT.bead, 0.15) : C.rule} strokeWidth={shared ? 3 : 2} />
      <text x={x + 36} y={y + 36 + s * 0.36} textAnchor="middle" fontSize={s} fontWeight={700} fill={C.ink}>{f}</text>
      {lit && <rect x={x + 1} y={y + 1} width={70} height={70} rx={18} fill="none" stroke={C.accent} strokeWidth={5} />}
    </g>
  );
}

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, part, api, lang = "en", tx: tr = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const [lad, setLad] = useState<any[]>(() => ltSetup(item));
  const ladRef = useRef<any[]>(lad); ladRef.current = lad;
  const [pend, setPend] = useState<any>(null);          /* a tile dropped: { k, f } waits for its rung */
  const pendRef = useRef<any>(pend); pendRef.current = pend;
  const [panel, setPanel] = useState<string>(() => ltPanelOf(item)); /* lists | compare | pair | none */
  const [scratch, setScratch] = useState<any>(null);    /* the child's own fraction, set off to one side */
  const [lit, setLit] = useState<number | null>(null);
  const [fly, setFly] = useState<any>(null);
  const [done, setDone] = useState(false);
  const [fills, setFills] = useState<number>(() => (item && item.kind === "same" ? 0 : 99));
  const [joined, setJoined] = useState(false);
  const [touched, setTouched] = useState(false);
  const [ringed, setRinged] = useState<number[]>([]);   /* the numbers the child has ringed in the rows */
  const [freeK, setFreeK] = useState(0);
  const setupFor = useRef<any>(index);
  if (!LT_MOUNT.first) LT_MOUNT.first = n;   /* the phase the host mounted, before anything is drawn */
  const busy = tl.busy;
  const kind = free ? "free" : item.kind;
  const lastCol = !free && item.routes ? Math.max(...item.routes.map((r: number[]) => r.length)) : 3;
  const colFor = (lk: any) => (lk.route ? (lk.used + 1 >= lk.route.length ? lastCol : lk.used + 1) : lk.rungs.length);
  /* how wide the ladder can grow, so the rungs keep one pitch and the ladder stays centred */
  const maxRungs = free ? 4
    : kind === "routes" ? lastCol + 1
      : kind === "same" ? item.rungs.length
        : kind === "stop" ? item.rungs.length + 1
          : 1 + ltOmega(ltGcd(item.from[0], item.from[1]));
  const pitch = ltPitch(maxRungs);
  /* the ladder's left edge now: the rungs it holds, plus the one being typed (routes keep the whole span) */
  const shown = (L: any[], pd: any) => (kind === "routes" ? maxRungs : L[0].rungs.length + (pd ? 1 : 0));
  const x0Of = (L: any[], pd: any) => ltX0(shown(L, pd), pitch);
  const x0 = x0Of(lad, pend);
  const cardX = (col: number, base?: number) => (base === undefined ? x0 : base) + col * pitch;

  const reset = (it: any) => {
    tl.stop();
    const L = ltSetup(it);
    ladRef.current = L; setLad(L);
    pendRef.current = null; setPend(null);
    setPanel(ltPanelOf(it)); setScratch(null); setLit(null); setFly(null); setDone(false);
    setFills(it && it.kind === "same" ? 0 : 99); setJoined(false); setTouched(false); setRinged([]);
    api.lock(false);
  };

  useEffect(() => {
    if (free) return;
    if ((stage === "ask" || stage === "teach") && setupFor.current !== index) { setupFor.current = index; reset(item); }
  }, [stage, index]);

  /* free play: a fraction from the list, every shared tile live, rungs written at once, undo */
  useEffect(() => {
    if (!free) return;
    setupFor.current = -2;
    reset({ kind: "free", from: LT_FREE[0] });
    setFreeK(0);
  }, [free]);

  /* write the next rung of ladder k, divided by f */
  const writeRung = (k: number, f: number) => {
    const L = ladRef.current.map((x: any) => ({ ...x, rungs: x.rungs.slice() }));
    const lk = L[k], cur = ltLast(lk);
    lk.rungs.push({ n: cur.n / f, d: cur.d / f, f, col: colFor(lk) });
    if (lk.route) lk.used += 1;
    ladRef.current = L; setLad(L);
    return L;
  };

  const canPlay = !busy && ((stage === "ask" && (kind === "reduce" || kind === "routes")) || free);
  const dropTile = (pay: any, p: any, moved: boolean) => {
    if (!canPlay) return;
    const L = ladRef.current;
    let k = pay.src === "route" ? pay.k : 0;
    if (moved) {
      const hit = L.findIndex((lk: any, j: number) => {
        const x = cardX(ltLast(lk).col), top = LG.tops[j];
        return p.x > x - 30 && p.x < x + LG.unit + 30 && p.y > top - 30 && p.y < top + LG.cardH + 30;
      });
      if (hit < 0 || hit !== k) return;   /* let go anywhere else: the tile simply goes back */
    }
    const lk = L[k], cur = ltLast(lk);
    if (ltLowest(cur) || cur.n % pay.f || cur.d % pay.f) return;
    if (lk.route && lk.route[lk.used] !== pay.f) return;
    setTouched(true);
    api.sfx.tick();
    if (!free && item.parts) { pendRef.current = { k, f: pay.f }; setPend({ k, f: pay.f }); api.setTyped(""); return; }
    writeRung(k, pay.f);   /* a word question or free play: the rung is written at once */
  };
  const drag = useDrag((payload: any, p: any, moved: boolean) => dropTile(payload, p, moved));

  /* Enter: with a rung waiting, a right rung is written (and in lowest terms it answers); anything
     else is the child's answer */
  const enterFn: any = stage === "ask" && !busy && !free && item.parts ? (v: any) => {
    const pd = pendRef.current;
    if (pd) {
      const ps = slotPartsOf(v, 2).map(Number), cur = ltLast(ladRef.current[pd.k]);
      if (ps[0] * pd.f === cur.n && ps[1] * pd.f === cur.d) {
        const L = writeRung(pd.k, pd.f);
        pendRef.current = null; setPend(null);
        api.sfx.tick();
        if (L.every((lk: any) => ltLowest(ltLast(lk)))) { api.submit(v); return; }
        api.setTyped("");
        return;
      }
    }
    api.submit(v);
  } : null;
  api.onEnter(enterFn);

  /* ── motion: a shared factor lights, flies to the rung, and the next rung is written ── */
  const stepSteps = (sim: any[], k: number, f: number, S: any[], from: any, quick = 1) => {
    const lk = sim[k], cur = ltLast(lk);
    const col = colFor(lk), top = LG.tops[k];
    const nl = sim.map((x: any) => ({ ...x, rungs: x.rungs.slice() }));
    nl[k].rungs.push({ n: cur.n / f, d: cur.d / f, f, col });
    if (nl[k].route) nl[k].used += 1;
    const to = { x: cardX(col, x0Of(nl, null)) + LG.cardW / 2, y: top + LG.cardH / 2 };
    S.push([420 * quick, () => setLit(f)]);
    S.push([40, () => setFly({ f, x: from.x, y: from.y })]);
    S.push([560 * quick, () => setFly({ f, x: to.x, y: to.y })]);
    S.push([260 * quick, () => { setFly(null); setLit(null); setRinged([]); ladRef.current = nl; setLad(nl); api.sfx.tick(); }]);
    return nl;
  };
  /* one step by the largest shared factor, taken from the upper row's tile */
  const downSteps = (sim: any[], S: any[]) => {
    const cur = ltLast(sim[0]), g = ltGcd(cur.n, cur.d);
    if (g === 1) return sim;
    const fs = ltFactors(cur.n), j = fs.indexOf(g);
    return stepSteps(sim, 0, g, S, { x: ltRowX0(fs.length) + j * LG.tileP + 36, y: LG.rows[0] + 36 });
  };
  /* both ladders walked to the end of their own routes */
  const routeSteps = (sim: any[], S: any[]) => {
    let s = sim;
    s.forEach((_: any, k: number) => {
      while (s[k].used < s[k].route.length) {
        const cur = ltLast(s[k]);
        const from = { x: cardX(cur.col) + LG.unit + 44, y: LG.tops[k] + 80 };
        s = stepSteps(s, k, s[k].route[s[k].used], S, from, 0.55);
      }
    });
    S.push([300, () => setJoined(true)]);
    return s;
  };
  const fillSteps = (S: any[], count: number) => {
    for (let i = 1; i <= count; i++) { const j = i; S.push([650, () => setFills(j)]); }
    S.push([500, () => setPanel("pair")]);
  };

  /* the win: the ladder is finished, the done light comes up, the last rung is ringed */
  useEffect(() => {
    if (stage !== "win") return;
    pendRef.current = null; setPend(null);
    const S: any[] = [];
    let sim = ladRef.current;
    if (kind === "reduce" || kind === "stop") {
      S.push([60, () => { setPanel("lists"); setScratch(null); }]);
      sim = downSteps(sim, S);
      S.push([300, () => setDone(true)]);
    } else if (kind === "routes") routeSteps(sim, S);
    else if (kind === "same") fillSteps(S, sim[0].rungs.length);
    tl.run(S);
  }, [stage]);

  /* ── the traceback: the mathematics redrawn in steps; nothing marked, nothing cleared ── */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    setTouched(true);
    pendRef.current = null; setPend(null);
    const S: any[] = [];
    let sim = ladRef.current;
    if (kind === "reduce") {
      const cur = ltLast(sim[0]);
      const ps = slotPartsOf(wrong.value, 2).map(Number);
      /* what the child's own fraction is worth, beside the rung it came from, on one guide line */
      if (ps[1] > 0 && !(ps[0] === cur.n && ps[1] === cur.d)) {
        S.push([2400, () => { setScratch({ n: ps[0], d: ps[1], from: { n: cur.n, d: cur.d } }); setPanel("compare"); }]);
      }
      S.push([80, () => setPanel("lists")]);
      sim = downSteps(sim, S);
      S.push([400, () => setDone(true)]);
    } else if (kind === "stop") {
      sim = downSteps(sim, S);
      S.push([400, () => setDone(true)]);
    } else if (kind === "routes") {
      routeSteps(sim, S);
      S.push([300, () => {}]);
    } else if (kind === "same") {
      fillSteps(S, sim[0].rungs.length);
      S.push([300, () => {}]);
    }
    tl.run(S, () => api.lock(false));
  }, [wrong]);

  /* free play's two keys */
  const undo = () => {
    const L = ladRef.current;
    if (busy || L[0].rungs.length < 2) return;
    const nl = [{ ...L[0], rungs: L[0].rungs.slice(0, -1) }];
    ladRef.current = nl; setLad(nl); api.sfx.tick();
  };
  const nextFraction = () => {
    if (busy) return;
    const k = (freeK + 1) % LT_FREE.length;
    reset({ kind: "free", from: LT_FREE[k] });
    setFreeK(k);
  };

  /* ── what the host and the agent read back (a word question's lists stay private until it is answered) ── */
  const cur0 = ltLast(lad[0]);
  const privateNow = !free && !!item.choices && stage === "ask" && !wrong;
  api.share({
    numerator: cur0.n, denominator: cur0.d, rungs: lad.reduce((s: number, lk: any) => s + lk.rungs.length, 0),
    factorsShown: panel === "lists", sharedFactors: privateNow ? null : ltFactors(cur0.n).filter((f) => f > 1 && cur0.d % f === 0),
    reduced: privateNow ? null : lad.every((lk: any) => ltLowest(ltLast(lk))), secondLadder: lad.length > 1, complete: stage === "idle",
  });

  /* ── drawing ── */
  const rowNums = [cur0.n, cur0.d];
  const listsOn = panel === "lists" && (kind === "reduce" || kind === "stop" || kind === "free");
  const listsLive = canPlay && (kind === "reduce" || kind === "free");
  /* a word question has nothing to drag, so its rows are ringed instead, as the book rings them */
  const ringLive = stage === "ask" && !busy && kind === "stop";
  const ringTap = (f: number) => {
    setTouched(true); api.sfx.tick();
    setRinged((was: number[]) => (was.indexOf(f) >= 0 ? was.filter((x) => x !== f) : was.concat([f])));
  };
  const both = (f: number) => f > 1 && cur0.n % f === 0 && cur0.d % f === 0;
  const dragging = drag.drag && drag.drag.moved ? drag.drag.payload : null;
  const facN = ltFactors(cur0.n), firstShared = facN.findIndex((f) => both(f));
  /* one pulse, once: the first question of the phase this mount opened on. It never marks a later
     question's tile, which on a reduce item would be pointing at a factor of the answer */
  const inviteHere = !free && index === 0 && n === LT_MOUNT.first;
  const invite = inviteHere && stage === "ask" && !touched && !busy && !wrong
    ? (kind === "reduce" && !pend && firstShared >= 0 ? { x: ltRowX0(facN.length) + firstShared * LG.tileP + 36, y: LG.rows[0] + 36, r: 46 }
      : kind === "routes" ? { x: cardX(ltLast(lad[0]).col) + LG.unit + 44, y: LG.tops[0] + 80, r: 46 }
        : kind === "stop" && facN.length > 1 ? { x: ltRowX0(facN.length) + LG.tileP + 36, y: LG.rows[0] + 36, r: 46 } : null)
    : null;

  return (
    <g>
      <style>{LT_CSS}</style>

      {/* the ladders: steps, rungs with their bars, the guide line, the rung waiting to be typed */}
      {lad.map((lk: any, k: number) => {
        const top = LG.tops[k], rs = lk.rungs, lastR = ltLast(lk);
        const barsOn = kind !== "same" || fills > 0;
        const pendHere = pend && pend.k === k;
        const waiting = lk.route && lk.used < lk.route.length && !pendHere ? lk.route[lk.used] : null;
        const lx = (col: number) => col * pitch;
        const tx = lx(lastR.col) + LG.unit + 8, ty = top + 56;
        const pay = { src: "route", k, f: waiting };
        const routeLive = waiting !== null && canPlay;
        return (
          <g key={"lad" + k} className="lt-slide" style={{ transform: `translateX(${x0}px)` } as any}>
            {kind === "routes" && lastR.col < lastCol && <LtLanding x={lx(lastCol)} top={top} C={C} />}
            {rs.map((r: any, i: number) => (i > 0 ? <LtStep key={"s" + i} x1={lx(rs[i - 1].col) + LG.unit} x2={lx(r.col)} top={top} f={r.f} /> : null))}
            {pendHere && <LtStep x1={lx(lastR.col) + LG.unit} x2={lx(colFor(lk))} top={top} f={pend.f} />}
            {rs.map((r: any, i: number) => (
              <LtUnit key={"u" + i} x={lx(r.col)} top={top} n={r.n} d={r.d} filled={kind !== "same" || fills > i} C={C}
                ring={i === rs.length - 1 && ((done && k === 0) || joined)} />
            ))}
            {barsOn && <LtGuide xs={rs.map((r: any) => lx(r.col))} top={top} n={rs[0].n} d={rs[0].d} />}
            {kind !== "routes" && (
              <text x={lx(rs[0].col) + LG.cardW + LG.barGap + LG.barW / 2} y={top + LG.cardH + (lang === "en" ? 26 : 34)} textAnchor="middle"
                fontSize={T.micro} fontWeight={600} fill={C.ink}>{tr("how much")}</text>
            )}
            {pendHere && <LtPending x={lx(colFor(lk))} top={top} typed={typed} part={part} C={C} />}
            {waiting !== null && !(dragging && dragging.src === "route" && dragging.k === k) && (
              <g className={routeLive ? "c4-piece lt-grab" : undefined}
                {...(routeLive ? { ...control("route-" + k, "Divide both numbers by " + waiting), ...drag.bind(pay), ...drag.keys(pay) } : {})}>
                {routeLive && <rect x={tx} y={ty} width={72} height={72} fill="transparent" />}
                <LtTile x={tx} y={ty} f={waiting} shared C={C} />
              </g>
            )}
            {kind === "routes" && lk.used >= lk.route.length && (
              <text x={lx(0)} y={k === 0 ? 234 : 486} fontSize={T.micro} fontWeight={600} fill={C.ink}>{lk.used + " " + tr(lk.used === 1 ? "step" : "steps")}</text>
            )}
            {dragging && (dragging.src === "route" ? dragging.k === k : k === 0) && (
              <rect x={lx(lastR.col) - 10} y={top - 10} width={LG.cardW + 20} height={LG.cardH + 20} rx={30} fill="none"
                stroke={C.accent} strokeWidth={4} strokeDasharray="12 9" pointerEvents="none" />
            )}
          </g>
        );
      })}

      {/* the two last rungs of the two ladders, joined straight down */}
      {joined && lad.length > 1 && (
        <line x1={cardX(lastCol) + LG.cardW / 2} x2={cardX(lastCol) + LG.cardW / 2} y1={LG.tops[0] + LG.cardH + 14} y2={LG.tops[1] - 14}
          stroke={shade(CONTENT.bead, 0.25)} strokeWidth={6} strokeLinecap="round" />
      )}

      {/* the done light, under the last rung */}
      {done && kind !== "routes" && (() => {
        const cx = cardX(ltLast(lad[0]).col) + LG.cardW / 2, x = Math.max(0, Math.min(W.w - 210, cx - 105));
        return (
          <g>
            <rect x={x} y={LG.doneY} width={210} height={46} rx={23} fill={C.accent} />
            <text x={x + 105} y={LG.doneY + 33} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF">{tr("lowest terms")}</text>
          </g>
        );
      })()}

      {/* the factor rows of the current rung: its upper number's, then its lower number's */}
      {listsOn && rowNums.map((num: number, r: number) => {
        const y = LG.rows[r], fs = ltFactors(num), rx0 = ltRowX0(fs.length);
        return (
          <g key={"row" + r}>
            <text x={rx0 - 18} y={y + 48} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{num}</text>
            {fs.map((f: number, j: number) => {
              const x = rx0 + j * LG.tileP, sh = both(f);
              const live = listsLive && sh;
              const pay = { src: "list", f };
              return (
                <g key={f} className={live ? "c4-piece lt-grab" : undefined}
                  {...(live ? { ...control("tile-" + r + "-" + f, "Divide both numbers by " + f), ...drag.bind(pay), ...drag.keys(pay) } : {})}>
                  {live && <rect x={x} y={y} width={72} height={72} fill="transparent" />}
                  <LtTile x={x} y={y} f={f} shared={kind === "stop" ? lit === f : sh} lit={lit === f || ringed.indexOf(f) >= 0} C={C} />
                  {/* the book's own move: ring a number and see where else it stands */}
                  {ringLive && <Hit id={"ring-" + r + "-" + f} label={"Ring " + f + " in both rows"} x={x} y={y} w={72} h={72} onPress={() => ringTap(f)} />}
                </g>
              );
            })}
          </g>
        );
      })}

      {/* the child's own fraction beside the rung it came from, both bars on one guide line */}
      {panel === "compare" && scratch && (
        <g>
          <LtUnit x={287} top={LG.cmpTop} n={scratch.from.n} d={scratch.from.d} C={C} />
          <LtUnit x={607} top={LG.cmpTop} n={scratch.n} d={scratch.d} dashed C={C} />
          <LtGuide xs={[287, 607]} top={LG.cmpTop} n={scratch.from.n} d={scratch.from.d} />
          <text x={607 + LG.cardW / 2} y={LG.cmpTop + LG.cardH + 40} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tr("you wrote")}</text>
        </g>
      )}

      {/* the first rung and the last, laid side by side */}
      {panel === "pair" && (() => {
        const a = lad[0].rungs[0], b = ltLast(lad[0]);
        return (
          <g>
            <LtUnit x={287} top={LG.cmpTop} n={a.n} d={a.d} C={C} />
            <text x={547} y={LG.cmpTop + 112} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>=</text>
            <LtUnit x={607} top={LG.cmpTop} n={b.n} d={b.d} C={C} />
            <LtGuide xs={[287, 607]} top={LG.cmpTop} n={a.n} d={a.d} />
          </g>
        );
      })()}

      {/* free play: undo a rung, or a new fraction */}
      {free && (
        <g>
          <Key id="free-undo" label="Undo a rung" x={560} y={452} w={220} h={67} C={C} disabled={lad[0].rungs.length < 2} onClick={undo}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tr("undo a rung")}</text>
          </Key>
          <Key id="free-next" label="New fraction" x={800} y={452} w={270} h={67} C={C} primary onClick={nextFraction}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill="#FFFFFF">{tr("new fraction")}</text>
          </Key>
        </g>
      )}

      {/* a tile on its way to the rung */}
      {fly && (
        <g className="lt-move" style={{ transform: `translate(${fly.x - 36}px, ${fly.y - 36}px)` } as any} pointerEvents="none">
          <LtTile x={0} y={0} f={fly.f} shared lift C={C} />
        </g>
      )}

      {/* the tile under the finger */}
      {dragging && (
        <g pointerEvents="none">
          <LtTile x={Math.max(0, Math.min(W.w - 72, drag.drag.x - 36))} y={Math.max(0, Math.min(W.h - 72, drag.drag.y - 36))} f={dragging.f} shared lift C={C} />
        </g>
      )}

      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: the fraction the
   phase started from and the one it ends on, one amount with two names */
function Thumb({ n, result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  const ph: any = PHASES[(n || 1) - 1];
  const it = last && ph ? ph.items[last.item] : null;
  if (!it) return null;
  const low = (a: number, b: number) => { const g = ltGcd(a, b); return [a / g, b / g]; };
  const pair = it.kind === "same" ? [it.rungs[0], it.rungs[it.rungs.length - 1]]
    : it.kind === "stop" ? [it.rungs[it.rungs.length - 1], low(it.rungs[it.rungs.length - 1][0], it.rungs[it.rungs.length - 1][1])]
      : [it.from, low(it.from[0], it.from[1])];
  const frac = (cx: number, a: number, b: number) => (
    <g>
      <text x={cx} y={h / 2 - 8} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{a}</text>
      <rect x={cx - 26} y={h / 2 - 2} width={52} height={4} rx={2} fill={C.ink} />
      <text x={cx} y={h / 2 + 30} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{b}</text>
    </g>
  );
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {frac(w * 0.28, pair[0][0], pair[0][1])}
      <text x={w / 2} y={h / 2 + 10} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>=</text>
      {frac(w * 0.72, pair[1][0], pair[1][1])}
    </g>
  );
}

function LowestTermsLadder(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default LowestTermsLadder;
