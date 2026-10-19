/* ═══ M2.S4.T7.C24.2D1 · which_is_more_rail · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "which_is_more_rail";
const MEDIA_ID = "M2.S4.T7.C24.2D1";
const TOOL_NAME = "Which Is More Rail";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A pair at the head of the rail. Before you push, say what these two fractions share."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every pair sent where it belongs, and the ones neither gate reaches still parked and still labelled.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Any pair or any set on the rail, both gates live and the bay open.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r21: `lineFor(line, lang, TR)`); the English
   above and below stays what the checks read. NCERT class 4 terms (fractions): भिन्न / અપૂર્ણાંક, तुलना /
   સરખામણી, बड़ा छोटा / મોટું નાનું, बढ़ता घटता क्रम / ચડતો ઉતરતો ક્રમ. The English's "top number" and "bottom
   number" stay ऊपर की संख्या / નીચેની સંખ્યા; a fraction is spelled as words (11 में से 7 भाग, 11માંથી 7 ભાગ),
   never "7/11". Digits stay digits: the runtime speaks them in the language in use. A first draft; wants a
   native speaker's read. */
const TR: any = {
  hi: {
    "Which Is More Rail": "कौन ज़्यादा रेल",
    "A pair at the head of the rail. Before you push, say what these two fractions share.": "पटरी के शुरू में एक जोड़ी है। भेजने से पहले बताओ कि इन दो भिन्नों में क्या समान है।",
    "Every pair sent where it belongs, and the ones neither gate reaches still parked and still labelled.": "हर जोड़ी अपनी सही जगह पहुँची। जिन तक कोई फाटक नहीं पहुँचा, वे कारण के साथ रुकी रहीं।",
    "Free play. Any pair or any set on the rail, both gates live and the bay open.": "मुक्त खेल। दोनों फाटक चालू हैं और अभी नहीं वाली जगह खुली है। पटरी पर कोई भी जोड़ी या सेट भेजो।",

    "Same pieces, so count them": "एक जैसे टुकड़े, तो गिनो",
    "Each gate says what it tests. Drag the pair to the gate that takes it.": "हर फाटक बताता है कि वह क्या जाँचता है। जोड़ी को उस फाटक तक खींचो जो उसे लेता है।",
    "When a gate opens, tap the fraction you think is more, then press enter.": "फाटक खुले तो जो भिन्न तुम्हें बड़ी लगे उसे छुओ। फिर दर्ज करें दबाओ।",
    "These two are cut the same way. So what is left to compare?": "ये दोनों एक ही तरह कटे हैं। तो तुलना करने के लिए क्या बचा?",
    "So what is left that can be different?": "तो ऐसा क्या बचा जो अलग हो सकता है?",
    "Count the parts each top number takes. More parts of one size is more.": "गिनो कि ऊपर की संख्या कितने भाग लेती है। एक माप के ज़्यादा भाग मतलब बड़ी भिन्न।",
    "Same bottom number, same size pieces. Then the bigger top number is the bigger fraction.": "नीचे की संख्या समान, यानी टुकड़े एक माप के। तब ऊपर की बड़ी संख्या वाली भिन्न बड़ी होती है।",
    "You learned: same bottom number? The bigger top number wins.": "तुमने सीखा: नीचे की संख्या समान? ऊपर की बड़ी संख्या जीतती है।",
    "Compare 7/11 and 4/11, and say which gate settles it.": "11 में से 7 भाग और 11 में से 4 भाग की तुलना करो। बताओ कि कौन सा फाटक इसे तय करता है।",
    "Which is greater?": "कौन सी भिन्न बड़ी है?",
    "Are the two numbers below the lines the same?": "क्या रेखा के नीचे की दोनों संख्याएँ एक जैसी हैं?",
    "Which is greater, 9/14 or 5/14?": "14 में से 9 भाग या 14 में से 5 भाग, कौन सा बड़ा है?",
    "Fourteenths both times, so the pieces match. Which one takes more of them?": "दोनों में 14 बराबर भाग हैं, तो टुकड़े एक जैसे हैं। कौन ज़्यादा टुकड़े लेता है?",
    "Put the right sign between 3/10 and 8/10.": "10 में से 3 भाग और 10 में से 8 भाग के बीच सही चिह्न लगाओ।",
    "Which sign?": "कौन सा चिह्न?",
    "Read it from the left card across to the right card.": "बाएँ कार्ड से दाएँ कार्ड तक पढ़ो।",

    "Same count, so size the pieces": "उतने ही टुकड़े, तो माप देखो",
    "You are taking the same number of pieces each time. Which pieces are bigger?": "तुम हर बार उतने ही टुकड़े ले रहे हो। कौन से टुकड़े बड़े हैं?",
    "Which of the two wholes was cut into fewer pieces?": "दोनों में से किस पूर्ण के कम टुकड़े किए गए?",
    "Fewer pieces in a whole means every piece of it is bigger.": "पूर्ण में कम टुकड़े हों तो हर टुकड़ा बड़ा होता है।",
    "Same top number, same count of pieces. Then the smaller bottom number gives the bigger fraction.": "ऊपर की संख्या समान, यानी टुकड़ों की गिनती समान। तब नीचे की छोटी संख्या बड़ी भिन्न देती है।",
    "You learned: same top number? The smaller bottom number wins.": "तुमने सीखा: ऊपर की संख्या समान? नीचे की छोटी संख्या जीतती है।",
    "Compare 5/6 and 5/12.": "6 में से 5 भाग और 12 में से 5 भाग की तुलना करो।",
    "Are the two numbers above the lines the same?": "क्या रेखा के ऊपर की दोनों संख्याएँ एक जैसी हैं?",
    "Which is greater, 2/3 or 2/9?": "3 में से 2 भाग या 9 में से 2 भाग, कौन सा बड़ा है?",
    "A bigger bottom number cuts the whole into more pieces, so each one is smaller.": "नीचे की बड़ी संख्या पूर्ण को ज़्यादा टुकड़ों में काटती है, इसलिए हर टुकड़ा छोटा होता है।",
    "Now take 7/8 and 7/20. Which one is more?": "अब 8 में से 7 भाग और 20 में से 7 भाग लो। इनमें कौन सा ज़्यादा है?",
    "Seven pieces both times. Whose seven cover more of the whole?": "दोनों बार सात टुकड़े। किसके सात टुकड़े पूर्ण का ज़्यादा भाग ढकते हैं?",

    "Putting a list in order": "सूची को क्रम में लगाना",
    "Now a whole set rides the rail. Send it to the gate that takes all four cards.": "अब पटरी पर कार्डों का पूरा सेट है। उसे उस फाटक पर भेजो जो चारों कार्ड लेता है।",
    "Then drag the cards on the board until they run the way the switch says.": "फिर बोर्ड पर कार्ड खींचो। उन्हें स्विच के बताए क्रम में लाओ।",
    "What do all of these have in common? Order them by whatever is left.": "इन सबमें क्या एक जैसा है? जो बचे, उसी से इन्हें क्रम में लगाओ।",
    "Which rule compares that kind of pair?": "ऐसी जोड़ी की तुलना कौन सा नियम करता है?",
    "Put just two cards in order first, then fit the other two around them.": "पहले बस दो कार्ड क्रम में रखो। फिर बाकी दो को उनके आसपास लगाओ।",
    "Find what the whole set shares first. That says which rule puts it in order.": "पहले देखो कि पूरे सेट में क्या समान है। उसी से पता चलता है कि कौन सा नियम इसे क्रम में लगाता है।",
    "You learned: find what a set shares, then order it by that rule.": "तुमने सीखा: पहले देखो सेट में क्या समान है, फिर क्रम लगाओ।",
    "Ascending order": "बढ़ता क्रम",
    "Arrange 6/13, 2/13, 11/13 and 9/13 in ascending order.": "13 में से 6, 2, 11 और 9 भाग लो। इन्हें बढ़ते क्रम में लगाओ।",
    "Read the four bottom numbers, then the four top ones.": "चारों नीचे की संख्याएँ पढ़ो, फिर चारों ऊपर की।",
    "Descending order": "घटता क्रम",
    "Now put 4/9, 8/9, 1/9 and 5/9 the other way round, greatest first.": "9 में से 4, 8, 1 और 5 भाग लो। इस बार घटते क्रम में लगाओ, सबसे बड़ी पहले।",
    "Descending starts at the greatest and steps down.": "घटता क्रम सबसे बड़ी से शुरू होकर नीचे उतरता है।",
    "Line up 6/5, 6/11, 6/7 and 6/2, smallest first.": "5 में से 6 भाग, 11 में से 6 भाग, 7 में से 6 भाग और 2 में से 6 भाग लो। सबसे छोटी पहले लगाओ।",
    "Here the bottom numbers change. Does a bigger bottom number make a bigger piece?": "यहाँ नीचे की संख्याएँ बदलती हैं। क्या नीचे की बड़ी संख्या से बड़ा टुकड़ा बनता है?",

    "Pairs these two rules cannot settle": "जो जोड़ियाँ नियम से तय न हों",
    "The bay at the end of the rail is for a pair that no gate will take.": "पटरी के आख़िर में अभी नहीं वाली जगह है। वह उस जोड़ी के लिए है जिसे कोई फाटक नहीं लेता।",
    "Parking a pair there is an honest answer, not a guess.": "वहाँ जोड़ी को रोकना एक सच्चा जवाब है, अंदाज़ा नहीं।",
    "Do the two numbers above the lines match?": "क्या रेखा के ऊपर की दोनों संख्याएँ मिलती हैं?",
    "Say what each gate tests, then check it on these two cards.": "बताओ कि हर फाटक क्या जाँचता है, फिर इन दो कार्डों पर जाँचो।",
    "A pair that shares neither number cannot be settled by these two rules. Saying so is a right answer.": "कोई संख्या समान न हो, तो ये दो नियम तय नहीं कर सकते। यह कहना भी सही जवाब है।",
    "You learned: a pair that shares no number cannot be settled yet.": "तुमने सीखा: कोई संख्या समान न हो तो जोड़ी अभी तय नहीं होती।",
    "Compare 3/7 and 5/8 using the rules of this chapter.": "7 में से 3 भाग और 8 में से 5 भाग की तुलना करो। इस अध्याय के नियम काम में लाओ।",
    "Do the two numbers below the lines match?": "क्या रेखा के नीचे की दोनों संख्याएँ मिलती हैं?",
    "Which is greater, 4/5 or 7/9, and which rule settles it?": "5 में से 4 भाग या 9 में से 7 भाग। कौन सा बड़ा है, और कौन सा नियम इसे तय करता है?",
    "Try each gate in turn. Does either one open for this pair?": "हर फाटक को बारी-बारी आज़माओ। क्या इस जोड़ी के लिए कोई फाटक खुलता है?",
    "A list reads 8/6, 8/1, 8/12 and 8/3. Put it in descending order.": "सूची है: 6 में से 8 भाग, 1 में से 8 भाग, 12 में से 8 भाग और 3 में से 8 भाग। इसे घटते क्रम में लगाओ।",
    "All four take eight pieces. Whose pieces are the biggest?": "चारों आठ टुकड़े लेती हैं। किसके टुकड़े सबसे बड़े हैं?",

    "same bottom": "नीचे समान", "same top": "ऊपर समान", "not yet": "अभी नहीं",
    "shares no number": "समान संख्या नहीं", "no rule reaches it": "कोई नियम लागू नहीं",
    "this pair has": "इस जोड़ी में", "these cards have": "इन कार्डों में",
    "the same bottom": "नीचे समान संख्या", "the same top": "ऊपर समान संख्या",
    "wholes": "पूर्ण", "one": "एक", "whole": "पूर्ण", "ascending": "बढ़ता क्रम", "descending": "घटता क्रम",
    "next": "अगला", "settled": "तय", "parked": "रुकी", "lined up": "क्रम में",
    "three sevenths": "7 में से 3 भाग", "five eighths": "8 में से 5 भाग", "four fifths": "5 में से 4 भाग", "seven ninths": "9 में से 7 भाग",
    "numerator": "अंश", "denominator": "हर",
  },
  gu: {
    "Which Is More Rail": "કયું વધારે રેલ",
    "A pair at the head of the rail. Before you push, say what these two fractions share.": "પાટાની શરૂઆતમાં એક જોડી છે. મોકલતાં પહેલાં કહો કે આ બે અપૂર્ણાંકમાં શું સરખું છે.",
    "Every pair sent where it belongs, and the ones neither gate reaches still parked and still labelled.": "દરેક જોડી પોતાની સાચી જગ્યાએ પહોંચી. જેમના સુધી કોઈ ફાટક ન પહોંચ્યું, તે કારણ સાથે રોકાયેલી રહી.",
    "Free play. Any pair or any set on the rail, both gates live and the bay open.": "મુક્ત રમત. બંને ફાટક ચાલુ છે અને હજી નહીં વાળી જગ્યા ખુલ્લી છે. પાટા પર કોઈ પણ જોડી કે સેટ મોકલો.",

    "Same pieces, so count them": "સરખા ટુકડા, તો ગણો",
    "Each gate says what it tests. Drag the pair to the gate that takes it.": "દરેક ફાટક કહે છે કે તે શું તપાસે છે. જોડીને એ ફાટક સુધી ખેંચો જે તેને લે છે.",
    "When a gate opens, tap the fraction you think is more, then press enter.": "ફાટક ખુલે ત્યારે જે અપૂર્ણાંક તમને મોટો લાગે તેને અડો. પછી દાખલ કરો દબાવો.",
    "These two are cut the same way. So what is left to compare?": "આ બંને એક જ રીતે કપાયેલા છે. તો સરખાવવા માટે શું બાકી રહ્યું?",
    "So what is left that can be different?": "તો એવું શું બાકી છે જે અલગ હોઈ શકે?",
    "Count the parts each top number takes. More parts of one size is more.": "ગણો કે ઉપરની સંખ્યા કેટલા ભાગ લે છે. એક જ માપના વધુ ભાગ એટલે મોટો અપૂર્ણાંક.",
    "Same bottom number, same size pieces. Then the bigger top number is the bigger fraction.": "નીચેની સંખ્યા સરખી એટલે ટુકડા એક જ માપના. તો ઉપરની મોટી સંખ્યાવાળો અપૂર્ણાંક મોટો હોય છે.",
    "You learned: same bottom number? The bigger top number wins.": "તમે શીખ્યા: નીચેની સંખ્યા સરખી? ઉપરની મોટી સંખ્યા જીતે.",
    "Compare 7/11 and 4/11, and say which gate settles it.": "11માંથી 7 ભાગ અને 11માંથી 4 ભાગને સરખાવો. કહો કે કયું ફાટક તેને નક્કી કરે છે.",
    "Which is greater?": "કયો અપૂર્ણાંક મોટો છે?",
    "Are the two numbers below the lines the same?": "શું રેખાની નીચેની બંને સંખ્યા સરખી છે?",
    "Which is greater, 9/14 or 5/14?": "14માંથી 9 ભાગ કે 14માંથી 5 ભાગ, કયો મોટો છે?",
    "Fourteenths both times, so the pieces match. Which one takes more of them?": "બંનેમાં 14 સરખા ભાગ છે, એટલે ટુકડા એક જેવા છે. કોણ વધુ ટુકડા લે છે?",
    "Put the right sign between 3/10 and 8/10.": "10માંથી 3 ભાગ અને 10માંથી 8 ભાગ વચ્ચે સાચું ચિહ્ન મૂકો.",
    "Which sign?": "કયું ચિહ્ન?",
    "Read it from the left card across to the right card.": "ડાબા કાર્ડથી જમણા કાર્ડ સુધી વાંચો.",

    "Same count, so size the pieces": "એટલા જ ટુકડા, તો માપ જુઓ",
    "You are taking the same number of pieces each time. Which pieces are bigger?": "તમે દરેક વખતે એટલા જ ટુકડા લો છો. કયા ટુકડા મોટા છે?",
    "Which of the two wholes was cut into fewer pieces?": "બેમાંથી કયા આખાના ઓછા ટુકડા કર્યા છે?",
    "Fewer pieces in a whole means every piece of it is bigger.": "આખામાં ઓછા ટુકડા હોય તો દરેક ટુકડો મોટો હોય છે.",
    "Same top number, same count of pieces. Then the smaller bottom number gives the bigger fraction.": "ઉપરની સંખ્યા સરખી એટલે ટુકડાની ગણતરી સરખી. તો નીચેની નાની સંખ્યા મોટો અપૂર્ણાંક આપે છે.",
    "You learned: same top number? The smaller bottom number wins.": "તમે શીખ્યા: ઉપરની સંખ્યા સરખી? નીચેની નાની સંખ્યા જીતે.",
    "Compare 5/6 and 5/12.": "6માંથી 5 ભાગ અને 12માંથી 5 ભાગને સરખાવો.",
    "Are the two numbers above the lines the same?": "શું રેખાની ઉપરની બંને સંખ્યા સરખી છે?",
    "Which is greater, 2/3 or 2/9?": "3માંથી 2 ભાગ કે 9માંથી 2 ભાગ, કયો મોટો છે?",
    "A bigger bottom number cuts the whole into more pieces, so each one is smaller.": "નીચેની મોટી સંખ્યા આખાને વધુ ટુકડામાં કાપે છે. એટલે દરેક ટુકડો નાનો થાય છે.",
    "Now take 7/8 and 7/20. Which one is more?": "હવે 8માંથી 7 ભાગ અને 20માંથી 7 ભાગ લો. તેમાંથી કયો વધુ છે?",
    "Seven pieces both times. Whose seven cover more of the whole?": "બંને વખત સાત ટુકડા. કોના સાત ટુકડા આખાનો વધુ ભાગ ઢાંકે છે?",

    "Putting a list in order": "યાદીને ક્રમમાં ગોઠવવી",
    "Now a whole set rides the rail. Send it to the gate that takes all four cards.": "હવે પાટા પર કાર્ડનો આખો સેટ છે. તેને એ ફાટક પર મોકલો જે ચારેય કાર્ડ લે છે.",
    "Then drag the cards on the board until they run the way the switch says.": "પછી બોર્ડ પર કાર્ડ ખેંચો. તેમને સ્વિચ કહે તે ક્રમમાં લાવો.",
    "What do all of these have in common? Order them by whatever is left.": "આ બધામાં શું સરખું છે? જે બાકી રહે તેનાથી તેમને ક્રમમાં ગોઠવો.",
    "Which rule compares that kind of pair?": "આવી જોડીની સરખામણી કયો નિયમ કરે છે?",
    "Put just two cards in order first, then fit the other two around them.": "પહેલાં ફક્ત બે કાર્ડ ક્રમમાં મૂકો. પછી બાકીના બેને તેમની આસપાસ ગોઠવો.",
    "Find what the whole set shares first. That says which rule puts it in order.": "પહેલાં જુઓ કે આખા સેટમાં શું સરખું છે. તેનાથી ખબર પડે કે કયો નિયમ તેને ક્રમમાં ગોઠવે છે.",
    "You learned: find what a set shares, then order it by that rule.": "તમે શીખ્યા: સેટમાં જે સરખું છે તે શોધો, પછી ક્રમ ગોઠવો.",
    "Ascending order": "ચડતો ક્રમ",
    "Arrange 6/13, 2/13, 11/13 and 9/13 in ascending order.": "13માંથી 6, 2, 11 અને 9 ભાગ લો. તેમને ચડતા ક્રમમાં ગોઠવો.",
    "Read the four bottom numbers, then the four top ones.": "ચારેય નીચેની સંખ્યા વાંચો, પછી ચારેય ઉપરની.",
    "Descending order": "ઉતરતો ક્રમ",
    "Now put 4/9, 8/9, 1/9 and 5/9 the other way round, greatest first.": "9માંથી 4, 8, 1 અને 5 ભાગ લો. આ વખતે ઉતરતા ક્રમમાં ગોઠવો, સૌથી મોટો પહેલાં.",
    "Descending starts at the greatest and steps down.": "ઉતરતો ક્રમ સૌથી મોટાથી શરૂ થઈને નીચે ઊતરે છે.",
    "Line up 6/5, 6/11, 6/7 and 6/2, smallest first.": "હવે આ ચાર લો: 5માંથી 6 ભાગ, 11માંથી 6 ભાગ, 7માંથી 6 ભાગ અને 2માંથી 6 ભાગ. સૌથી નાનો પહેલાં ગોઠવો.",
    "Here the bottom numbers change. Does a bigger bottom number make a bigger piece?": "અહીં નીચેની સંખ્યાઓ બદલાય છે. શું નીચેની મોટી સંખ્યાથી મોટો ટુકડો બને છે?",

    "Pairs these two rules cannot settle": "નિયમથી નક્કી ન થાય એવી જોડીઓ",
    "The bay at the end of the rail is for a pair that no gate will take.": "પાટાના છેડે હજી નહીં વાળી જગ્યા છે. તે એવી જોડી માટે છે જેને કોઈ ફાટક લેતું નથી.",
    "Parking a pair there is an honest answer, not a guess.": "ત્યાં જોડીને રોકવી એ સાચો જવાબ છે, અંદાજ નથી.",
    "Do the two numbers above the lines match?": "શું રેખાની ઉપરની બંને સંખ્યા મળે છે?",
    "Say what each gate tests, then check it on these two cards.": "કહો કે દરેક ફાટક શું તપાસે છે, પછી આ બે કાર્ડ પર તપાસો.",
    "A pair that shares neither number cannot be settled by these two rules. Saying so is a right answer.": "કોઈ સંખ્યા સરખી ન હોય, તો આ બે નિયમો નક્કી કરી શકતા નથી. એમ કહેવું પણ સાચો જવાબ છે.",
    "You learned: a pair that shares no number cannot be settled yet.": "તમે શીખ્યા: કોઈ સંખ્યા સરખી ન હોય તો જોડી હજી નક્કી ન થાય.",
    "Compare 3/7 and 5/8 using the rules of this chapter.": "7માંથી 3 ભાગ અને 8માંથી 5 ભાગને સરખાવો. આ પ્રકરણના નિયમોનો ઉપયોગ કરો.",
    "Do the two numbers below the lines match?": "શું રેખાની નીચેની બંને સંખ્યા મળે છે?",
    "Which is greater, 4/5 or 7/9, and which rule settles it?": "5માંથી 4 ભાગ કે 9માંથી 7 ભાગ. કયો મોટો છે, અને કયો નિયમ તેને નક્કી કરે છે?",
    "Try each gate in turn. Does either one open for this pair?": "દરેક ફાટકને વારાફરતી અજમાવો. શું આ જોડી માટે કોઈ ફાટક ખુલે છે?",
    "A list reads 8/6, 8/1, 8/12 and 8/3. Put it in descending order.": "યાદી આ પ્રમાણે છે: 6માંથી 8 ભાગ, 1માંથી 8 ભાગ, 12માંથી 8 ભાગ અને 3માંથી 8 ભાગ. તેને ઉતરતા ક્રમમાં ગોઠવો.",
    "All four take eight pieces. Whose pieces are the biggest?": "ચારેય આઠ ટુકડા લે છે. કોના ટુકડા સૌથી મોટા છે?",

    "same bottom": "નીચે સમાન", "same top": "ઉપર સમાન", "not yet": "હજી નહીં",
    "shares no number": "સમાન સંખ્યા નથી", "no rule reaches it": "કોઈ નિયમ લાગુ નથી",
    "this pair has": "આ જોડીમાં", "these cards have": "આ કાર્ડમાં",
    "the same bottom": "નીચે સમાન સંખ્યા", "the same top": "ઉપર સમાન સંખ્યા",
    "wholes": "આખા", "one": "એક", "whole": "આખું", "ascending": "ચડતો ક્રમ", "descending": "ઉતરતો ક્રમ",
    "next": "આગળ", "settled": "નક્કી", "parked": "રોકેલી", "lined up": "ક્રમમાં",
    "three sevenths": "7માંથી 3 ભાગ", "five eighths": "8માંથી 5 ભાગ", "four fifths": "5માંથી 4 ભાગ", "seven ninths": "9માંથી 7 ભાગ",
    "numerator": "અંશ", "denominator": "છેદ",
  },
};

/* the three signs the pad offers on a sign question */
const SIGNS = [{ id: "<", label: "<" }, { id: ">", label: ">" }, { id: "=", label: "=" }];

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   items   the authored fallback: three a phase, the third tests whether the phase landed.
           qid   the plan's question id (<conceptId>:ML<n> or <conceptId>:<q_no>); null for an item you author
           kind  pick (tap the greater card in the gate that opened) · sign (a sign key) ·
                 order (drag the cards on the line-up board) · bay (park a pair no gate takes)
           say   the spoken question; ask = the short prompt above the slot (<= 3 lines of ~15 chars)
           answer what the slot or the working area must produce; miss = rung 1, never the answer
           parts  SLOT_FRACTION: the picked fraction is drawn stacked in the slot (typed "7|11") */
const PHASES = [
  {
    n: 1,
    concept: "Same pieces, so count them",
    conceptId: "M2.S4.T7.C24", objectiveIds: ["O11"],
    says: [
      "Each gate says what it tests. Drag the pair to the gate that takes it.",
      "When a gate opens, tap the fraction you think is more, then press enter.",
      "These two are cut the same way. So what is left to compare?",
    ],
    ladder: ["So what is left that can be different?", "Count the parts each top number takes. More parts of one size is more."],
    closing: "Same bottom number, same size pieces. Then the bigger top number is the bigger fraction.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: same bottom number? The bigger top number wins.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The pair rolls into the same bottom gate, both strips are cut the same way, the parts fill in step, and the fuller strip lifts out.",
    items: [
      /* learn ML1: answer in the plan = 7/11 is the greater, and the gate for a shared lower number settles it */
      { qid: "M2.S4.T7.C24:ML1", kind: "pick", pair: [[7, 11], [4, 11]], answer: [7, 11], parts: SLOT_FRACTION, pad: "enter", winMs: 3800,
        ask: "Which is greater?", say: "Compare 7/11 and 4/11, and say which gate settles it.",
        miss: "Are the two numbers below the lines the same?" },
      /* practice 1: answer in the plan = 9/14 */
      { qid: "M2.S4.T7.C24:1", kind: "pick", pair: [[9, 14], [5, 14]], answer: [9, 14], parts: SLOT_FRACTION, pad: "enter", winMs: 4000,
        ask: "Which is greater?", say: "Which is greater, 9/14 or 5/14?",
        miss: "Fourteenths both times, so the pieces match. Which one takes more of them?" },
      /* practice 2: answer in the plan = 3/10 is less than 8/10 */
      { qid: "M2.S4.T7.C24:2", kind: "sign", pair: [[3, 10], [8, 10]], answer: "<", choices: SIGNS, winMs: 5200,
        ask: "Which sign?", say: "Put the right sign between 3/10 and 8/10.",
        miss: "Read it from the left card across to the right card." },
    ],
  },
  {
    n: 2,
    concept: "Same count, so size the pieces",
    conceptId: "M2.S4.T7.C25", objectiveIds: ["O11"],
    says: ["You are taking the same number of pieces each time. Which pieces are bigger?"],
    ladder: ["Which of the two wholes was cut into fewer pieces?", "Fewer pieces in a whole means every piece of it is bigger."],
    closing: "Same top number, same count of pieces. Then the smaller bottom number gives the bigger fraction.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: same top number? The smaller bottom number wins.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The pair rolls into the same top gate, both strips are cut from one edge, the same count of parts fills in step, and a line measures how much further the fuller one reaches.",
    items: [
      /* learn ML2: answer in the plan = 5/6 is the greater */
      { qid: "M2.S4.T7.C25:ML2", kind: "pick", pair: [[5, 6], [5, 12]], answer: [5, 6], parts: SLOT_FRACTION, pad: "enter", winMs: 4000,
        ask: "Which is greater?", say: "Compare 5/6 and 5/12.",
        miss: "Are the two numbers above the lines the same?" },
      /* practice 3: answer in the plan = 2/3, because thirds are bigger parts than ninths and the same number of them is taken */
      { qid: "M2.S4.T7.C25:3", kind: "pick", pair: [[2, 3], [2, 9]], answer: [2, 3], parts: SLOT_FRACTION, pad: "enter", winMs: 3600,
        ask: "Which is greater?", say: "Which is greater, 2/3 or 2/9?",
        miss: "A bigger bottom number cuts the whole into more pieces, so each one is smaller." },
      /* practice 4: answer in the plan = 7/8 */
      { qid: "M2.S4.T7.C25:4", kind: "pick", pair: [[7, 8], [7, 20]], answer: [7, 8], parts: SLOT_FRACTION, pad: "enter", winMs: 4200,
        ask: "Which is greater?", say: "Now take 7/8 and 7/20. Which one is more?",
        miss: "Seven pieces both times. Whose seven cover more of the whole?" },
    ],
  },
  {
    n: 3,
    concept: "Putting a list in order",
    conceptId: "M2.S4.T7.C26", objectiveIds: ["O12"],
    says: [
      "Now a whole set rides the rail. Send it to the gate that takes all four cards.",
      "Then drag the cards on the board until they run the way the switch says.",
      "What do all of these have in common? Order them by whatever is left.",
    ],
    ladder: ["Which rule compares that kind of pair?", "Put just two cards in order first, then fit the other two around them."],
    closing: "Find what the whole set shares first. That says which rule puts it in order.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: find what a set shares, then order it by that rule.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The shared numbers light on all four cards, a strip grows under each one, and the cards slide into the order that was asked for.",
    items: [
      /* learn ML3: answer in the plan = 2/13, 6/13, 9/13, 11/13 */
      { qid: "M2.S4.T7.C26:ML3", kind: "order", set: [[6, 13], [2, 13], [11, 13], [9, 13]], dir: "up", answer: "2/13, 6/13, 9/13, 11/13",
        pad: "enter", winMs: 3800, ask: "Ascending order", say: "Arrange 6/13, 2/13, 11/13 and 9/13 in ascending order.",
        miss: "Read the four bottom numbers, then the four top ones." },
      /* practice 5: answer in the plan = 8/9, 5/9, 4/9, 1/9 */
      { qid: "M2.S4.T7.C26:5", kind: "order", set: [[4, 9], [8, 9], [1, 9], [5, 9]], dir: "down", answer: "8/9, 5/9, 4/9, 1/9",
        pad: "enter", winMs: 3400, ask: "Descending order", say: "Now put 4/9, 8/9, 1/9 and 5/9 the other way round, greatest first.",
        miss: "Descending starts at the greatest and steps down." },
      /* practice 6: answer in the plan = 6/11, 6/7, 6/5, 6/2 */
      { qid: "M2.S4.T7.C26:6", kind: "order", set: [[6, 5], [6, 11], [6, 7], [6, 2]], dir: "up", answer: "6/11, 6/7, 6/5, 6/2",
        pad: "enter", winMs: 3400, ask: "Ascending order", say: "Line up 6/5, 6/11, 6/7 and 6/2, smallest first.",
        miss: "Here the bottom numbers change. Does a bigger bottom number make a bigger piece?" },
    ],
  },
  {
    n: 4,
    concept: "Pairs these two rules cannot settle",
    conceptId: "M2.S4.T7.C27", objectiveIds: ["O12"],
    says: [
      "The bay at the end of the rail is for a pair that no gate will take.",
      "Parking a pair there is an honest answer, not a guess.",
    ],
    ladder: ["Do the two numbers above the lines match?", "Say what each gate tests, then check it on these two cards."],
    closing: "A pair that shares neither number cannot be settled by these two rules. Saying so is a right answer.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: a pair that shares no number cannot be settled yet.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The pair tries each gate in turn, both light the numbers they compare and stay shut, and it rolls on into the bay with its reason printed.",
    items: [
      /* learn ML4: answer in the plan = Neither rule reaches this pair, so it cannot be settled yet */
      { qid: "M2.S4.T7.C27:ML4", kind: "bay", pair: [[3, 7], [5, 8]], answer: "not yet", pad: "enter", winMs: 2200,
        ask: "Which is greater?", say: "Compare 3/7 and 5/8 using the rules of this chapter.",
        miss: "Do the two numbers below the lines match?" },
      /* practice 7: answer in the plan = Neither rule settles it, because the pair shares no number, so it cannot be decided with what this chapter teaches */
      { qid: "M2.S4.T7.C27:7", kind: "bay", pair: [[4, 5], [7, 9]], answer: "not yet", pad: "enter", winMs: 2200,
        ask: "Which is greater?", say: "Which is greater, 4/5 or 7/9, and which rule settles it?",
        miss: "Try each gate in turn. Does either one open for this pair?" },
      /* practice 8: answer in the plan = 8/1, 8/3, 8/6, 8/12, and 8/1 is worth eight whole ones */
      { qid: "M2.S4.T7.C27:8", kind: "order", set: [[8, 6], [8, 1], [8, 12], [8, 3]], dir: "down", answer: "8/1, 8/3, 8/6, 8/12",
        pad: "enter", winMs: 4000, ask: "Descending order", say: "A list reads 8/6, 8/1, 8/12 and 8/3. Put it in descending order.",
        miss: "All four take eight pieces. Whose pieces are the biggest?" },
    ],
  },
];

/* ── the rail: stations, cart, gates, bay, strips, board (working-area units) ─────────────── */
const STOP: any = { head: 10, g1: 286, g2: 562, bay: 838 };           /* the cart's left edge */
const ZONE: any = { head: [0, 258], g1: [276, 534], g2: [552, 810], bay: [828, 1086] };
const CART = { w: 238, cardW: 96, cardH: 170, top: 88, bar: 173, tray: 258, wheel: 288, track: 292 };
const GATE = { lintel: 50, foot: 300, arm: 150, lift: 96 };
const GATES = [
  { id: "g1", label: "same bottom", row: "bottom" },
  { id: "g2", label: "same top", row: "top" },
];
const STRIP = { x: 130, w: 930, h: 60, aY: 356, bY: 452, labelX: 60 };
const BOARD = { x: 20, pitch: 222, w: 200, y: 352, h: 130, bar: 417, stripY: 488, stripH: 30, dirX: 996, panel: 342 };

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  stations: ["head", "g1", "g2", "bay"],
  gates: [{ id: "g1", tests: "the two bottom numbers", opens: "when they are the same" },
    { id: "g2", tests: "the two top numbers", opens: "when they are the same" }],
  bay: { label: "not yet", takes: "a pair that shares neither number", reason: ["shares no number", "no rule reaches it"] },
  strip: { whole: STRIP.w, cutBy: "the bottom number", fills: "the top number" },
  board: { slots: 4, directions: ["ascending", "descending"] },
  reader: "a fraction over one is drawn as that many whole circles",
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* every fraction in a value: [[7, 11], …]. Reads "7/11", the slot's "7|11", [7, 11] and [[7, 11], …] */
const railList = (v: any): number[][] => {
  if (Array.isArray(v) && Array.isArray(v[0])) return v.map((f: any) => [Number(f[0]), Number(f[1])]);
  if (Array.isArray(v) && v.length === 2 && typeof v[0] !== "object") return [[Number(v[0]), Number(v[1])]];
  const out: number[][] = [];
  const re = /(\d+)\s*[/|]\s*(\d+)/g;
  let m: any;
  while ((m = re.exec(String(v == null ? "" : v)))) out.push([Number(m[1]), Number(m[2])]);
  return out;
};
const railSame = (a: any, b: any) => !!a && !!b && a[0] === b[0] && a[1] === b[1];
const railText = (f: any) => f[0] + "/" + f[1];
const railOrderText = (list: any[]) => list.map(railText).join(", ");
const railNotYet = (v: any) => /\b(not yet|bay|neither|cannot|can't)\b/i.test(String(v == null ? "" : v));
/* a piece that has done its part of the answer lets Enter pass to the window, so the next Enter
   answers instead of pressing the piece again (no keyboard trap; the runtime's boxes do the same) */
const passEnter = (fn: any, done: boolean) => (e: any) => { if (e.key === "Enter" && done) return; if (fn) fn(e); };

/* judge: the picked fraction, the sign, the parked verdict, or the whole line-up in order */
const judge = (item: any, v: any) => {
  if (item.kind === "sign") return String(v).trim() === String(item.answer);
  if (item.kind === "bay") return railNotYet(v);
  const got = railList(v), want = railList(item.answer);
  return want.length > 0 && got.length === want.length && want.every((f: any, k: number) => railSame(f, got[k]));
};

/* oracle: every answer re-derived by cross multiplication, which the picture and judge never use */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const parse = (s: any) => String(s).split(",").map((x: string) => x.trim().split("/").map(Number)).filter((f: any) => f.length === 2 && f.every((x: number) => x > 0));
  const more = (a: any, b: any) => a[0] * b[1] - b[0] * a[1];   /* > 0 when a is the greater */
  if (it.kind === "pick" || it.kind === "sign" || it.kind === "bay") {
    const a = it.pair[0], b = it.pair[1], top = a[0] === b[0], bottom = a[1] === b[1];
    if (it.kind === "bay") return !top && !bottom && railNotYet(it.answer);
    if (top === bottom) return false;                            /* exactly one gate may take it */
    const d = more(a, b);
    if (it.kind === "sign") return it.answer === (d > 0 ? ">" : d < 0 ? "<" : "=");
    const big = d > 0 ? a : b;
    return big[0] === Number(it.answer[0]) && big[1] === Number(it.answer[1]);
  }
  if (it.kind === "order") {
    const want = parse(it.answer);
    if (want.length !== it.set.length) return false;
    const sorted = it.set.slice().sort((x: any, y: any) => (it.dir === "down" ? more(y, x) : more(x, y)));
    return sorted.every((f: any, k: number) => f[0] === want[k][0] && f[1] === want[k][1])
      && it.set.every((f: any) => want.some((w: any) => w[0] === f[0] && w[1] === f[1]));
  }
  return false;
}));

/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => {
  if (item.kind === "sign") return item.answer === "<" ? ">" : "<";
  if (item.kind === "pick") {
    const want = railList(item.answer)[0];
    const other = railSame(item.pair[0], want) ? item.pair[1] : item.pair[0];
    return other[0] + "|" + other[1];
  }
  /* the bay pair settled anyway, on the smaller bottom number; a list ordered the other way round */
  if (item.kind === "bay") {
    const f = item.pair[0][1] < item.pair[1][1] ? item.pair[0] : item.pair[1];
    return f[0] + "|" + f[1];
  }
  return railOrderText(railList(item.answer).slice().reverse());
};

/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => {
  if (item.kind === "bay") return ["not yet"];
  if (item.kind === "order") return [String(item.answer), String(item.answer).replace(/, ([^,]+)$/, " and $1")];
  const a = item.pair[0], b = item.pair[1];
  if (item.kind === "sign") {
    const word = item.answer === "<" ? "is less than" : "is greater than";
    return [railText(a) + " " + item.answer + " " + railText(b), railText(a) + " " + word + " " + railText(b),
      fractionWords(a[0], a[1]) + " " + word + " " + fractionWords(b[0], b[1])];
  }
  const want = railList(item.answer)[0], other = railSame(a, want) ? b : a;
  return [railText(want) + " is greater", railText(want) + " is the greater", fractionWords(want[0], want[1]) + " is greater",
    railText(want) + " > " + railText(other), railText(other) + " < " + railText(want)];
};

/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => (item.kind === "pick" ? railText(railList(item.answer)[0]) : String(item.answer));

/* what the slot prints: a whole line-up is one word, a fraction from the working area is read out */
const showTyped = (v: any, part?: number) => {
  if (part !== undefined) return v;
  const s = String(v == null ? "" : v);
  if (s.indexOf(",") >= 0) return "lined up";
  const m = /^(\d+)\|(\d+)$/.exec(s);
  return m ? fractionWords(Number(m[1]), Number(m[2])) : s;
};

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (item.kind === "sign") return T.submit(item.answer);
  if (HOOK.set) HOOK.set(agentKey(item));
  setTimeout(() => HOOK.enter && HOOK.enter(), 60);
};
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.kind === "sign" ? undefined : HOOK.set ? HOOK.set(v) : false);
/* the agent's check() before Enter: the working area holds the answer, so Enter commits it */
const check = () => undefined;

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────────── */
const SKY = "#56B4E9";           /* the undecided colour: the not yet bay */
const VERM = CONTENT.pointer;    /* the greater of a pair one of the rules settles */
const AMBER = CONTENT.ten;       /* the parts of the whole a fraction leaves */

const WM_CSS = `
.wm-roll{transition:transform 520ms cubic-bezier(.3,.7,.25,1)}
.wm-now{transition:none}
.wm-slide{transition:transform 420ms cubic-bezier(.3,.7,.25,1)}
.wm-lift{transition:transform 240ms ease}
.wm-arm{transition:transform 320ms ease-out}
.wm-grab{cursor:grab}
@media (prefers-reduced-motion:reduce){.wm-roll,.wm-slide,.wm-lift,.wm-arm{transition:none}}
`;

/* a tap target on the working area that is no keyboard trap: once it has done its part of the answer
   (this card is already the claimed one), Enter passes to the window and answers instead of pressing
   the card again. The runtime's own answer boxes do exactly this. */
function RailTap({ id, label, x, y, w, h, onPress, done }: any) {
  const p = usePress(onPress);
  const keys = (e: any) => { if (e.key === "Enter" && done) return; p.keys(e); };
  return (
    <rect className="c4-hit" data-control={id} role="button" tabIndex={0} aria-label={label}
      x={x} y={y} width={w} height={h} fill="transparent" {...p.bind()} onKeyDown={keys} />
  );
}

/* a fraction, always stacked: the top number over a rule over the bottom number (never 3/4) */
function RailFrac({ x, y, f, size, fill }: any) {
  const w = Math.max(String(f[0]).length, String(f[1]).length) * size * 0.62 + 10;
  return (
    <g>
      <text x={x} y={y - size * 0.25} textAnchor="middle" fontSize={size} fontWeight={700} fill={fill}>{f[0]}</text>
      <rect x={x - w / 2} y={y - size * 0.05} width={w} height={Math.max(3, size * 0.07)} rx={2} fill={fill} />
      <text x={x} y={y + size * 0.25 + size * 0.72} textAnchor="middle" fontSize={size} fontWeight={700} fill={fill}>{f[1]}</text>
    </g>
  );
}

/* one fraction as a strip: wholes of one length, each cut into its bottom number, filled up to
   the top number (filled so far = fill). Nothing here is drawn before the child has answered. */
function RailStrip({ x, y, w, h, f, wholes, fill, lift, C }: any) {
  const u = w / wholes, pw = u / f[1], cells: any[] = [], cuts: any[] = [];
  for (let i = 0; i < wholes; i++) {
    for (let q = 0; q < f[1]; q++) {
      const j = i * f[1] + q;
      if (j >= wholes * f[1]) break;
      const on = j < Math.min(f[0], fill), rest = j >= f[0];
      cells.push(<rect key={j} x={x + i * u + q * pw} y={y} width={pw} height={h}
        fill={on ? "url(#gHundred)" : rest ? tint(AMBER, 0.72) : "#FFFFFF"} />);
      if (q > 0 && pw >= 6) cuts.push(<line key={"c" + j} x1={x + i * u + q * pw} y1={y} x2={x + i * u + q * pw} y2={y + h} stroke={CONTENT.line} strokeWidth={1.5} />);
    }
    if (i > 0) cuts.push(<line key={"u" + i} x1={x + i * u} y1={y} x2={x + i * u} y2={y + h} stroke={CONTENT.line} strokeWidth={3} />);
  }
  return (
    <g className="wm-lift" style={{ transform: `translateY(${lift ? -10 : 0}px)` } as any}>
      {cells}
      {cuts}
      <rect x={x} y={y} width={w} height={h} rx={4} fill="none" stroke={lift ? shade(VERM, 0.1) : CONTENT.line} strokeWidth={lift ? 5 : 2.5} />
    </g>
  );
}

function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const [freeIdx, setFreeIdx] = useState(0);
  const cur = free ? FREE_RUN[freeIdx % FREE_RUN.length] : item;
  const isSet = cur.kind === "order";
  const cards: any[] = isSet ? cur.set : cur.pair;

  const [pos, setPos] = useState("head");
  const [open, setOpen] = useState<string | null>(null);
  const [lit, setLit] = useState<any>({});
  const [picked, setPicked] = useState<number | null>(null);
  const [parked, setParked] = useState(false);
  const [note, setNote] = useState<string[] | null>(null);
  const [board, setBoard] = useState(false);
  const [order, setOrder] = useState<number[]>([0, 1, 2, 3]);
  const [sel, setSel] = useState<number | null>(null);
  const [proof, setProof] = useState<any>(null);
  const [reader, setReader] = useState<any>(null);
  const [sign, setSign] = useState<string | null>(null);
  const [next, setNext] = useState(0);
  const [touched, setTouched] = useState(false);
  /* a correction that parked a pair or ordered the cards holds those pieces still while it stands,
     so the child's next act (enter) confirms it and can never undo it */
  const [held, setHeld] = useState(false);
  const busy = tl.busy;

  const posRef = useRef(pos); posRef.current = pos;
  const openRef = useRef(open); openRef.current = open;
  const orderRef = useRef(order); orderRef.current = order;
  const boardRef = useRef(board); boardRef.current = board;
  const parkedRef = useRef(parked); parkedRef.current = parked;
  const pickedRef = useRef(picked); pickedRef.current = picked;
  const heldRef = useRef(held); heldRef.current = held;
  const setupFor = useRef(0);

  /* the answer the working area is holding right now (Enter commits it) */
  const valueOf = () => {
    if (isSet) return board ? railOrderText(order.map((k: number) => cards[k])) : null;
    /* a parked pair says "not yet"; a card picked off the cart says "this one is more", which on a
       pair no gate takes is the guess this phase is about, and the judge turns it down */
    if (cur.kind === "bay") return parked ? "not yet" : picked === null ? null : cards[picked][0] + "|" + cards[picked][1];
    if (cur.kind === "pick") return picked === null ? null : cards[picked][0] + "|" + cards[picked][1];
    return null;
  };
  const ansRef = useRef<any>(null);
  ansRef.current = valueOf();

  /* which gate takes this pair or set, if either does */
  const gateFor = (it: any) => {
    const list = it.kind === "order" ? it.set : it.pair;
    if (list.every((f: any) => f[1] === list[0][1])) return "g1";
    if (list.every((f: any) => f[0] === list[0][0])) return "g2";
    return null;
  };
  const takes = (to: string) => (to === "bay" ? gateFor(cur) === null : gateFor(cur) === to);
  const shareNote = () => [isSet ? "these cards have" : "this pair has", gateFor(cur) === "g1" ? "the same bottom" : "the same top"];

  const reset = () => {
    tl.stop();
    setPos("head"); setOpen(null); setLit({}); setPicked(null); setParked(false); setNote(null);
    setBoard(false); setOrder([0, 1, 2, 3]); setSel(null); setProof(null); setReader(null); setSign(null);
    setNext(0); setTouched(false); setHeld(false); heldRef.current = false;
    api.lock(false);
  };
  useEffect(() => { if (stage === "ask" && setupFor.current !== index) { setupFor.current = index; reset(); } }, [stage, index]);
  useEffect(() => { if (free) { setupFor.current = -2; setFreeIdx(0); reset(); } }, [free]);

  /* the slot cleared (Escape) takes the pick back too */
  useEffect(() => { if (typed === "" && picked !== null && stage === "ask") setPicked(null); }, [typed]);

  /* ── sending the pair (or the set) down the rail ── */
  const sendTo = (to: string) => {
    if (busy || heldRef.current || openRef.current || (!free && stage !== "ask")) return;
    if (to === posRef.current && to !== "head") return;
    setTouched(true);
    setNext((["g1", "g2", "bay"].indexOf(to) + 1) % 3);
    const wasParked = parkedRef.current;
    const hadPick = pickedRef.current !== null;
    const S: any[] = [[520, () => {
      setPos(to); setNote(null); setLit({}); setProof(null); setReader(null);
      /* the pair is on the move again, so any claim made off the cart is withdrawn */
      if (cur.kind === "bay" && hadPick) setPicked(null);
      if ((wasParked || (cur.kind === "bay" && hadPick)) && !free && stage === "ask") api.setTyped("");
      if (wasParked) setParked(false);
    }]];
    if (to === "head") { tl.run(S); return; }
    if (to === "bay") {
      if (takes("bay")) S.push([420, () => {
        setParked(true); setNote(["shares no number", "no rule reaches it"]); api.sfx.tick();
        if (!free && stage === "ask") api.setTyped("not yet");   /* the verdict stands in the slot */
      }]);
      else {
        S.push([460, () => setNote(shareNote())]);
        S.push([760, () => setPos("head")]);
      }
    } else {
      const row = to === "g1" ? "bottom" : "top";
      S.push([440, () => setLit((l: any) => ({ ...l, [row]: true }))]);
      if (takes(to)) {
        S.push([360, () => { setOpen(to); api.sfx.tick(); }]);
        if (isSet) S.push([520, () => {
          setBoard(true); setOrder([0, 1, 2, 3]);
          if (free) setProof({ show: true, fill: 99, measure: false, lift: -1 });   /* free play: the strips live */
          else if (stage === "ask") api.setTyped(railOrderText(cards));
        }]);
        /* in free play there is nothing to get right, so the gate proves the pair straight away */
        if (free && !isSet) for (const s of proofSteps(true, true)) S.push(s);
      } else S.push([620, () => setPos("head")]);
    }
    tl.run(S);
  };

  /* ── the board: two cards change places ── */
  const swap = (a: number, b: number) => {
    if (busy || heldRef.current || !boardRef.current || a === b) return;
    const o = orderRef.current.slice(), ia = o.indexOf(a), ib = o.indexOf(b);
    o[ia] = b; o[ib] = a;
    setOrder(o); orderRef.current = o; setSel(null); api.sfx.tick();
    if (!free && stage === "ask") api.setTyped(railOrderText(o.map((k: number) => cards[k])));
  };
  const tapCard = (k: number) => {
    if (busy || heldRef.current || !boardRef.current) return;
    if (sel === null) { setSel(k); api.sfx.tick(); return; }
    if (sel === k) { setSel(null); return; }
    swap(sel, k);
  };
  /* a card can be claimed inside the gate that opened, and on a pair no gate takes it can be claimed
     off the cart: that claim is the guess phase 4 is about, and the bay is the honest answer to it */
  const pickable = !busy && !held && (free || stage === "ask") && (cur.kind === "bay" ? !parked : cur.kind === "pick" && !!open);
  const pick = (k: number) => {
    if (!pickable) return;
    setPicked(k); pickedRef.current = k; api.sfx.tick();
    if (!free && stage === "ask") api.setTyped(cards[k][0] + "|" + cards[k][1]);
  };

  /* ── drag: the cart rolls along the rail; a board card changes places ── */
  const stationAt = (p: any) => {
    if (!(p.y < 330)) return null;
    const ids = ["head", "g1", "g2", "bay"];
    for (const id of ids) if (p.x >= ZONE[id][0] - 10 && p.x <= ZONE[id][1] + 10) return id;
    return null;
  };
  const slotAt = (p: any) => {
    if (!(p.y > 300)) return -1;
    const k = Math.round((p.x - BOARD.x - BOARD.w / 2) / BOARD.pitch);
    return Math.max(0, Math.min(3, k));
  };
  const drag = useDrag((payload: any, p: any, moved: boolean) => {
    if (payload.src === "cart") {
      if (!moved) { sendTo(["g1", "g2", "bay"][next]); return; }
      const to = stationAt(p);
      if (to) sendTo(to);
      return;
    }
    if (payload.src === "card") {
      if (!moved) { tapCard(payload.k); return; }
      const s = slotAt(p);
      if (s >= 0) swap(payload.k, orderRef.current[s]);
      return;
    }
    /* a card on the cart of a pair no gate takes: a tap claims it, a drag still rolls the cart */
    if (payload.src === "claim") {
      if (!moved) { pick(payload.k); return; }
      const to = stationAt(p);
      if (to) sendTo(to);
    }
  });

  /* ── Enter commits what the working area is holding ── */
  const enterFn: any = stage !== "ask" || busy || cur.kind === "sign" ? null : () => {
    const v = ansRef.current;
    if (!v) return;
    setHeld(false); heldRef.current = false;    /* the hold ends on the act that confirms it */
    api.submit(v);
  };
  api.onEnter(enterFn);
  HOOK.enter = () => enterFn && enterFn();
  /* the agent sets the answer on the working area exactly as a child would */
  HOOK.set = (v: any) => {
    if (stage !== "ask" && !free) return false;
    setHeld(false); heldRef.current = false;
    const g = gateFor(cur);
    if (cur.kind === "bay") {
      if (g !== null) return false;
      if (railNotYet(v)) {
        setPos("bay"); posRef.current = "bay"; setParked(true); parkedRef.current = true;
        setPicked(null); pickedRef.current = null;
        setNote(["shares no number", "no rule reaches it"]); setLit({ top: true, bottom: true });
        ansRef.current = "not yet"; api.setTyped("not yet");
        return true;
      }
      /* the agent may also claim one of the two cards, as a child who settles it anyway would */
      const want = railList(v)[0], k = cards.findIndex((f: any) => railSame(f, want));
      if (k < 0) return false;
      setParked(false); parkedRef.current = false; setPos("head"); posRef.current = "head";
      setPicked(k); pickedRef.current = k;
      ansRef.current = cards[k][0] + "|" + cards[k][1];
      api.setTyped(ansRef.current);
      return true;
    }
    if (cur.kind === "pick") {
      const want = railList(v)[0], k = cards.findIndex((f: any) => railSame(f, want));
      if (k < 0 || !g) return false;
      setPos(g); posRef.current = g; setOpen(g); openRef.current = g;
      setLit({ [g === "g1" ? "bottom" : "top"]: true });
      setPicked(k); ansRef.current = cards[k][0] + "|" + cards[k][1];
      api.setTyped(ansRef.current);
      return true;
    }
    if (isSet) {
      const list = railList(v);
      if (!g || list.length !== cards.length) return false;
      const o: number[] = [];
      for (const f of list) { const k = cards.findIndex((c: any, i: number) => railSame(c, f) && o.indexOf(i) < 0); if (k < 0) return false; o.push(k); }
      setPos(g); posRef.current = g; setOpen(g); openRef.current = g;
      setLit({ [g === "g1" ? "bottom" : "top"]: true });
      setBoard(true); boardRef.current = true; setOrder(o); orderRef.current = o;
      ansRef.current = railOrderText(o.map((k: number) => cards[k]));
      api.setTyped(ansRef.current);
      return true;
    }
    return false;
  };

  /* ── the proof: both fractions drawn as strips, filled part by part ── */
  const bigIdx = () => {
    if (isSet) return -1;
    const a = cards[0], b = cards[1];
    return a[0] * b[1] > b[0] * a[1] ? 0 : 1;
  };
  const wholesOf = (list: any[]) => Math.max(1, ...list.map((f: any) => Math.ceil(f[0] / f[1])));
  const proofSteps = (measure: boolean, lift: boolean) => {
    const S: any[] = [[420, () => setProof({ show: true, fill: 0, measure: false, lift: -1 })]];
    const steps = Math.max(...cards.map((f: any) => f[0]));
    for (let k = 1; k <= steps; k++) S.push([150, () => setProof((p: any) => ({ ...(p || {}), show: true, fill: k }))]);
    if (measure) S.push([520, () => setProof((p: any) => ({ ...(p || {}), measure: true }))]);
    if (lift) S.push([520, () => { setProof((p: any) => ({ ...(p || {}), lift: bigIdx() })); api.sfx.tick(); }]);
    S.push([600, () => {}]);
    return S;
  };
  const routeSteps = () => {
    const g = gateFor(cur);
    if (!g || openRef.current === g) return [];
    return [[420, () => { setPos("head"); setParked(false); setNote(null); }],
      [520, () => setPos(g)],
      [420, () => setLit({ [g === "g1" ? "bottom" : "top"]: true })],
      [360, () => { setOpen(g); api.sfx.tick(); }],
      ...(isSet ? [[480, () => { setBoard(true); setOrder([0, 1, 2, 3]); }]] : [])];
  };

  /* ── the win: the gate proves it, and the greater lifts clear ── */
  useEffect(() => {
    if (stage !== "win") return;
    if (cur.kind === "bay") { tl.run([[400, () => setNote(["shares no number", "no rule reaches it"])]]); return; }
    if (cur.kind === "sign") {
      tl.run([...routeSteps(), [400, () => setSign(cur.answer)], ...proofSteps(false, true)]);
      return;
    }
    if (cur.kind === "pick") { tl.run([...routeSteps(), ...proofSteps(n === 2, true)]); return; }
    const over = cards.find((f: any) => f[1] === 1);
    tl.run([...proofSteps(false, false), ...(over ? [[700, () => setReader(over)]] : [])]);
  }, [stage]);

  /* ── the traceback: the maths redrawn, ending on the whole right answer; nothing marked ── */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    setTouched(true);
    const done = () => api.lock(false);
    if (cur.kind === "bay") {
      tl.run([
        [420, () => { setPicked(null); setProof(null); setPos("head"); setParked(false); setNote(null); setLit({}); }],
        [520, () => setPos("g1")], [460, () => setLit({ bottom: true })],
        [560, () => setPos("g2")], [460, () => setLit({ bottom: true, top: true })],
        [560, () => setPos("bay")], [420, () => { setParked(true); setNote(["shares no number", "no rule reaches it"]); api.sfx.tick(); }],
        [500, () => { setHeld(true); heldRef.current = true; }],
      ], done);
      return;
    }
    if (isSet) {
      const mine = railList(wrong.value), g = gateFor(cur) || "g1";
      const o: number[] = [];
      for (const f of mine) { const k = cards.findIndex((c: any, i: number) => railSame(c, f) && o.indexOf(i) < 0); if (k >= 0) o.push(k); }
      const shown = o.length === cards.length ? o : orderRef.current.slice();
      const right: number[] = railList(cur.answer).map((f: any) => cards.findIndex((c: any) => railSame(c, f)));
      tl.run([
        ...routeSteps(),
        [420, () => { setProof(null); setOrder(shown); setBoard(true); }],
        [700, () => setLit({ [g === "g1" ? "bottom" : "top"]: true })],
        [700, () => setLit({ top: true, bottom: true })],
        ...proofSteps(false, false),
        [700, () => { setOrder(right); setSel(null); api.sfx.tick(); }],
        [700, () => { setReader(cards.find((f: any) => f[1] === 1) || null); setHeld(true); heldRef.current = true; }],
      ], done);
      return;
    }
    tl.run([[360, () => { setPicked(null); setProof(null); }], ...routeSteps(),
      ...proofSteps(n === 2, true), ...(cur.kind === "sign" ? [[420, () => setSign(cur.answer)]] : [])], done);
  }, [wrong]);

  /* ── what the host and the teacher agent read back (toolApi.getState) ── */
  api.share({
    left: railText(cards[0]), right: railText(cards[1]),
    gateOpened: open ? (open === "g1" ? "same bottom" : "same top") : null,
    verdict: ansRef.current, parked, direction: isSet ? (cur.dir === "down" ? "descending" : "ascending") : null,
    lineUp: isSet && board ? order.map((k: number) => railText(cards[k])) : null,
  });

  /* ── drawing ── */
  const dragging = drag.drag && drag.drag.moved ? drag.drag : null;
  const cartDrag = dragging && (dragging.payload.src === "cart" || dragging.payload.src === "claim");
  const cartX = cartDrag ? Math.max(0, Math.min(1086 - CART.w, dragging.x - CART.w / 2)) : STOP[pos];
  const canRoll = !busy && !held && !open && (free || stage === "ask") && !(isSet && board);
  /* a pair no gate takes carries its claim on the cards, so the cart is pushed by its base instead */
  const claimCards = pickable && cur.kind === "bay";
  const canPick = pickable && cur.kind === "pick";
  const hideCart = isSet && board;
  const wholes = wholesOf(cards);
  const dirDown = isSet && cur.dir === "down";
  const ink = C.ink;

  const litRow = (row: string, k: number) => {
    if (!lit[row]) return null;
    const x = k === 0 ? 8 : CART.w - 8 - CART.cardW;
    return <rect x={x + 8} y={row === "top" ? CART.bar - 58 : CART.bar + 10} width={CART.cardW - 16} height={50} rx={10} fill={tint(C.accent, 0.62)} />;
  };

  const invite = !free && stage === "ask" && !busy
    ? canPick && picked === null ? { x: STOP[open || "g1"] + CART.w / 2, y: CART.bar, r: 116 }
      : canRoll && !touched && cur.kind !== "sign" ? { x: STOP.head + CART.w / 2, y: CART.bar, r: 116 } : null
    : null;

  return (
    <g>
      <style>{WM_CSS}</style>

      {/* the rail and its sleepers */}
      <rect x={0} y={CART.track} width={1086} height={10} rx={5} fill={shade(C.dim, 0.12)} />
      {Array.from({ length: 27 }).map((_, k) => <rect key={k} x={6 + k * 40} y={CART.track + 10} width={22} height={10} rx={3} fill={C.rule} />)}

      {/* the two gates: an archway that says what it tests, and opens only when its own test passes */}
      {GATES.map((g) => {
        const z = ZONE[g.id], isOpen = open === g.id, litHere = lit[g.row] && pos === g.id;
        return (
          <g key={g.id}>
            {isOpen && <rect x={z[0] + 14} y={GATE.lintel} width={z[1] - z[0] - 28} height={GATE.foot - GATE.lintel} rx={10} fill={tint(C.panel, 0.55)} />}
            <rect x={z[0] + 2} y={GATE.lintel} width={14} height={GATE.foot - GATE.lintel} rx={5} fill={C.dim} />
            <rect x={z[1] - 16} y={GATE.lintel} width={14} height={GATE.foot - GATE.lintel} rx={5} fill={C.dim} />
            <rect x={z[0]} y={0} width={z[1] - z[0]} height={GATE.lintel} rx={12} fill="#FFFFFF" stroke={isOpen || litHere ? C.accent : C.rule} strokeWidth={isOpen ? 4 : 2} filter="url(#fShadowSoft)" />
            <text x={(z[0] + z[1]) / 2} y={35} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ink}>{tx(g.label)}</text>
            <g className="wm-arm" style={{ transform: `translateY(${isOpen ? -GATE.lift : 0}px)` } as any}>
              <rect x={z[0] + 12} y={GATE.arm} width={z[1] - z[0] - 24} height={20} rx={7} fill={shade(C.dim, 0.18)} />
              {Array.from({ length: 6 }).map((_, k) => (
                <rect key={k} x={z[0] + 26 + k * 38} y={GATE.arm + 3} width={14} height={14} rx={3} fill={tint(C.dim, 0.75)} />
              ))}
            </g>
            {canRoll && (
              <Hit id={"send-" + g.id} label={"Send the " + (isSet ? "set" : "pair") + " to the " + g.label + " gate"}
                x={z[0]} y={0} w={z[1] - z[0]} h={GATE.foot} onPress={() => sendTo(g.id)} />
            )}
          </g>
        );
      })}

      {/* the not yet bay: a labelled place, never a bin */}
      <g>
        <rect x={ZONE.bay[0]} y={GATE.lintel} width={ZONE.bay[1] - ZONE.bay[0]} height={GATE.foot - GATE.lintel} rx={16}
          fill={tint(SKY, 0.86)} stroke={tint(SKY, 0.3)} strokeWidth={2} />
        <rect x={ZONE.bay[0]} y={0} width={ZONE.bay[1] - ZONE.bay[0]} height={GATE.lintel} rx={12} fill={tint(SKY, 0.6)}
          stroke={parked ? shade(SKY, 0.45) : tint(SKY, 0.28)} strokeWidth={parked ? 4 : 2} filter="url(#fShadowSoft)" />
        <text x={(ZONE.bay[0] + ZONE.bay[1]) / 2} y={35} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(SKY, 0.5)}>{tx("not yet")}</text>
        {canRoll && !parked && (
          <Hit id="send-bay" label={"Park the " + (isSet ? "set" : "pair") + " in the not yet bay"}
            x={ZONE.bay[0]} y={0} w={ZONE.bay[1] - ZONE.bay[0]} h={GATE.foot} onPress={() => sendTo("bay")} />
        )}
      </g>

      {/* the bay's printed reason: on a plaque under a parked pair, or inside the bay when it hands one back */}
      {note && (
        <g>
          {parked && <rect x={ZONE.bay[0] + 6} y={326} width={ZONE.bay[1] - ZONE.bay[0] - 12} height={94} rx={14} fill={tint(SKY, 0.78)} stroke={tint(SKY, 0.3)} strokeWidth={2} />}
          {note.map((ln: string, k: number) => (
            <text key={k} x={(ZONE.bay[0] + ZONE.bay[1]) / 2} y={(parked ? 362 : 168) + k * 38} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={shade(SKY, 0.5)}>{tx(ln)}</text>
          ))}
        </g>
      )}

      {/* a fraction written over one, drawn as that many whole ones */}
      {reader && (
        <g>
          <RailFrac x={40} y={CART.bar} f={reader} size={T.label} fill={ink} />
          {Array.from({ length: Math.min(reader[0], 8) }).map((_, k) => (
            <Disc key={k} x={92 + (k % 4) * 42} y={CART.bar - 30 + Math.floor(k / 4) * 60} r={18} paint="gOne" flat />
          ))}
          <text x={129} y={CART.tray - 4} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={shade(CONTENT.one, 0.3)}>{reader[0] + " " + tx("wholes")}</text>
        </g>
      )}

      {/* the cart: the pair (or the set) riding the rail */}
      {!hideCart && (
        <g className={"wm-roll" + (cartDrag ? " wm-now" : "")} style={{ transform: `translateX(${cartX}px)` } as any}>
          <rect x={0} y={CART.tray} width={CART.w} height={14} rx={6} fill={C.accent} />
          <circle cx={46} cy={CART.wheel} r={12} fill={shade(C.dim, 0.25)} />
          <circle cx={CART.w - 46} cy={CART.wheel} r={12} fill={shade(C.dim, 0.25)} />
          {isSet
            ? cards.map((f: any, k: number) => {
              const x = 8 + (k % 2) * 122, y = 92 + Math.floor(k / 2) * 84;
              return (
                <g key={k}>
                  <rect x={x} y={y} width={104} height={74} rx={10} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
                  {lit.top && <rect x={x + 28} y={y + 4} width={48} height={28} rx={6} fill={tint(C.accent, 0.62)} />}
                  {lit.bottom && <rect x={x + 28} y={y + 42} width={48} height={30} rx={6} fill={tint(C.accent, 0.62)} />}
                  <RailFrac x={x + 52} y={y + 37} f={f} size={T.label} fill={ink} />
                </g>
              );
            })
            : cards.map((f: any, k: number) => {
              const x = k === 0 ? 8 : CART.w - 8 - CART.cardW, on = picked === k;
              return (
                <g key={k} className="wm-lift" style={{ transform: `translateY(${on ? -14 : 0}px)` } as any}>
                  <rect x={x} y={CART.top} width={CART.cardW} height={CART.cardH} rx={12} fill="#FFFFFF"
                    stroke={proof && proof.lift === k ? shade(VERM, 0.1) : on ? C.accent : C.rule} strokeWidth={proof && proof.lift === k ? 5 : on ? 4 : 2} filter="url(#fShadowSoft)" />
                  {litRow("top", k)}
                  {litRow("bottom", k)}
                  <RailFrac x={x + CART.cardW / 2} y={CART.bar} f={f} size={T.xl} fill={proof && proof.lift === k ? shade(VERM, 0.25) : ink} />
                  {canPick && <RailTap id={"card-" + k} label={"Say " + fractionWords(f[0], f[1]) + " is more"}
                    x={x} y={CART.top} w={CART.cardW} h={CART.cardH} onPress={() => pick(k)} done={picked === k} />}
                  {claimCards && (
                    <g className="wm-grab c4-piece" {...control("card-" + k, "Say " + fractionWords(f[0], f[1]) + " is more, or drag the pair on")}
                      {...drag.bind({ src: "claim", k })} {...drag.keys({ src: "claim", k })} onKeyDown={passEnter(drag.keys({ src: "claim", k }).onKeyDown, picked === k)}>
                      <rect x={x} y={CART.top} width={CART.cardW} height={CART.cardH} fill="transparent" />
                    </g>
                  )}
                </g>
              );
            })}
          {/* the gate's test, written between the cards only when the two numbers match */}
          {!isSet && lit[GATES[0].row] && cards[0][1] === cards[1][1] && (
            <text x={CART.w / 2} y={CART.bar + 54} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(C.accent, 0.25)}>=</text>
          )}
          {!isSet && lit[GATES[1].row] && cards[0][0] === cards[1][0] && (
            <text x={CART.w / 2} y={CART.bar - 14} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(C.accent, 0.25)}>=</text>
          )}
          {/* the sign the child chooses, between the two cards */}
          {cur.kind === "sign" && (
            <g>
              <rect x={CART.w / 2 - 16} y={CART.bar - 30} width={32} height={60} rx={8} fill={sign ? tint(C.panel, 0.4) : "#FFFFFF"} stroke={C.rule} strokeWidth={2} strokeDasharray={sign ? "" : "6 6"} />
              {sign && <text x={CART.w / 2} y={CART.bar + 16} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={ink}>{sign}</text>}
            </g>
          )}
          {canRoll && (
            <g className="wm-grab c4-piece" {...control("cart", isSet ? "Send this set down the rail" : "Send this pair down the rail")}
              {...drag.bind({ src: "cart" })} {...drag.keys({ src: "cart" })}
              onKeyDown={passEnter(drag.keys({ src: "cart" }).onKeyDown, parked)}>
              {/* the cards carry the claim on a pair no gate takes, so the cart is pushed by its base */}
              {claimCards
                ? <rect x={0} y={CART.tray} width={CART.w} height={74} fill="transparent" />
                : <rect x={0} y={CART.top - 6} width={CART.w} height={CART.cardH + 30} fill="transparent" />}
            </g>
          )}
        </g>
      )}

      {/* the line-up board: four slots, the direction switch, and a strip under each card */}
      {isSet && (
        <g>
          <rect x={0} y={BOARD.panel} width={896} height={182} rx={18} fill={tint(C.panel, 0.45)} stroke={held ? C.accent : C.rule} strokeWidth={held ? 4 : 2} />
          {!board && Array.from({ length: 4 }).map((_, k) => (
            <rect key={k} x={BOARD.x + k * BOARD.pitch} y={BOARD.y} width={BOARD.w} height={BOARD.h} rx={14}
              fill="none" stroke={C.rule} strokeWidth={2.5} strokeDasharray="10 10" />
          ))}
          {board && cards.map((f: any, k: number) => {
            const slot = order.indexOf(k), x = BOARD.x + slot * BOARD.pitch;
            const grabbed = dragging && dragging.payload.src === "card" && dragging.payload.k === k;
            const dx = grabbed ? dragging.x - BOARD.w / 2 : x;
            const dy = grabbed ? dragging.y - BOARD.h / 2 - BOARD.y : 0;
            return (
              <g key={k} className={grabbed ? "" : "wm-slide"} style={{ transform: `translate(${dx}px, ${dy}px)` } as any}>
                <rect x={0} y={BOARD.y} width={BOARD.w} height={BOARD.h} rx={14} fill="#FFFFFF"
                  stroke={sel === k ? C.accent : C.rule} strokeWidth={sel === k ? 5 : 2} filter="url(#fShadowSoft)" />
                {lit.top && <rect x={BOARD.w / 2 - 36} y={BOARD.bar - 58} width={72} height={50} rx={8} fill={tint(C.accent, 0.62)} />}
                {lit.bottom && <rect x={BOARD.w / 2 - 36} y={BOARD.bar + 10} width={72} height={50} rx={8} fill={tint(C.accent, 0.62)} />}
                <RailFrac x={BOARD.w / 2} y={BOARD.bar} f={f} size={T.xl} fill={ink} />
                {proof && proof.show && (
                  <RailStrip x={6} y={BOARD.stripY} w={(BOARD.w - 12) * Math.ceil(f[0] / f[1]) / wholes} h={BOARD.stripH}
                    f={f} wholes={Math.ceil(f[0] / f[1])} fill={proof.fill} C={C} />
                )}
                {!busy && !held && (free || stage === "ask") && (
                  <g className="wm-grab c4-piece" {...control("card-" + k, "Move " + fractionWords(f[0], f[1]) + " along the board")}
                    {...drag.bind({ src: "card", k })} {...drag.keys({ src: "card", k })}
                    onKeyDown={passEnter(drag.keys({ src: "card", k }).onKeyDown, sel === k)}>
                    <rect x={0} y={BOARD.y} width={BOARD.w} height={BOARD.h} fill="transparent" />
                  </g>
                )}
              </g>
            );
          })}
          <g>
            {Array.from({ length: 3 }).map((_, k) => {
              const h = 26 + (dirDown ? 2 - k : k) * 24;
              return <rect key={k} x={BOARD.dirX - 57 + k * 38} y={460 - h} width={30} height={h} rx={5}
                fill={proof && proof.show ? shade(C.accent, 0.1) : tint(C.accent, 0.55)} />;
            })}
            <text x={BOARD.dirX} y={504} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={ink}>{tx(dirDown ? "descending" : "ascending")}</text>
          </g>
        </g>
      )}

      {/* the two wholes the pair is cut from: empty until a gate opens them, then cut and filled.
          A pair no gate takes keeps its wholes whole: there is no rule here to cut them by. */}
      {!isSet && (
        <g>
          {cards.map((f: any, k: number) => {
            const y = k === 0 ? STRIP.aY : STRIP.bY, up = !!proof && proof.lift === k;
            const room = cur.kind === "bay" ? 670 : STRIP.w;
            const w = room * Math.ceil(f[0] / f[1]) / wholes, cut = !!proof && proof.show;
            return (
              <g key={k}>
                {cut
                  ? <RailFrac x={STRIP.labelX} y={y + STRIP.h / 2 - (up ? 10 : 0)} f={f} size={T.speech} fill={up ? shade(VERM, 0.25) : ink} />
                  : (
                    <g>
                      <text x={STRIP.labelX} y={y + (lang === "en" ? 22 : 19)} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={mix(C.ink, C.panel, 0.22)}>{tx("one")}</text>
                      <text x={STRIP.labelX} y={y + (lang === "en" ? 52 : 54)} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={mix(C.ink, C.panel, 0.22)}>{tx("whole")}</text>
                    </g>
                  )}
                {cut
                  ? <RailStrip x={STRIP.x} y={y} w={w} h={STRIP.h} f={f} wholes={Math.ceil(f[0] / f[1])} fill={proof.fill} lift={up} C={C} />
                  : <rect x={STRIP.x} y={y} width={w} height={STRIP.h} rx={5} fill={tint(C.panel, 0.4)} stroke={CONTENT.line} strokeWidth={2.5} />}
              </g>
            );
          })}
          {proof && proof.measure && (() => {
            const len = (f: any) => STRIP.x + (STRIP.w * Math.ceil(f[0] / f[1]) / wholes) * (f[0] / (f[1] * Math.ceil(f[0] / f[1])));
            const a = len(cards[0]), b = len(cards[1]), lo = Math.min(a, b), hi = Math.max(a, b);
            const mid = (STRIP.aY + STRIP.h + STRIP.bY) / 2;
            return (
              <g>
                <line x1={hi} y1={STRIP.aY} x2={hi} y2={STRIP.bY + STRIP.h} stroke={CONTENT.line} strokeWidth={2} strokeDasharray="7 7" />
                <line x1={lo} y1={mid} x2={hi} y2={mid} stroke={shade(VERM, 0.1)} strokeWidth={5} />
                <line x1={lo} y1={mid - 11} x2={lo} y2={mid + 11} stroke={shade(VERM, 0.1)} strokeWidth={5} />
                <line x1={hi} y1={mid - 11} x2={hi} y2={mid + 11} stroke={shade(VERM, 0.1)} strokeWidth={5} />
              </g>
            );
          })()}
        </g>
      )}

      {/* free play: any pair or any set on the rail, both gates live and the bay open */}
      {free && (
        <Key id="free-next" label="Load the next pair or set onto the rail" x={4} y={0} w={180} h={72} C={C} primary
          onClick={() => { setFreeIdx((k: number) => (k + 1) % FREE_RUN.length); reset(); }}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill="#FFFFFF">{tx("next")}</text>
        </Key>
      )}

      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* free play runs through pairs the chapter never sets, plus one set for the board */
const FREE_RUN: any[] = [
  { kind: "pick", pair: [[3, 4], [3, 8]] },
  { kind: "pick", pair: [[9, 1], [9, 4]] },
  { kind: "bay", pair: [[2, 5], [3, 4]] },
  { kind: "pick", pair: [[7, 10], [3, 10]] },
  { kind: "order", set: [[5, 12], [11, 12], [2, 12], [8, 12]], dir: "up" },
  { kind: "bay", pair: [[4, 7], [5, 6]] },
];

/* the running count: the pairs settled against the pairs this phase loads, and beside them, never
   underneath, the pairs standing in the bay. Neither number ever goes down. */
function Runs({ phase, index, stage, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const items = phase.items || [];
  const over = stage === "win" || stage === "idle" || stage === "summary";
  let settled = 0, parked = 0;
  items.forEach((it: any, k: number) => {
    if (!(k < index || (over && k === index))) return;
    if (it.kind === "bay") parked += 1; else settled += 1;
  });
  /* Devanagari and Gujarati stand taller than the Latin label: a little more air between the two rows */
  const ly = lang === "en" ? 30 : 24, cy = lang === "en" ? 64 : 67;
  return (
    <g>
      <rect x={0} y={0} width={330} height={76} rx={18} fill={tint(C.panel, 0.5)} stroke={C.rule} strokeWidth={2} />
      <text x={18} y={ly} fontSize={T.micro} fontWeight={600} fill={mix(C.ink, C.panel, 0.22)}>{tx("settled")}</text>
      <text x={18} y={cy} fontSize={T.label} fontWeight={700} fill={C.ink}>{lang === "hi" ? items.length + " में से " + settled : lang === "gu" ? items.length + "માંથી " + settled : settled + " of " + items.length}</text>
      <text x={206} y={ly} fontSize={T.micro} fontWeight={600} fill={mix(C.ink, C.panel, 0.22)}>{tx("parked")}</text>
      <text x={206} y={cy} fontSize={T.label} fontWeight={700} fill={shade(SKY, 0.5)}>{String(parked)}</text>
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const L = (result && result.last) || {};
  const sh = L.shared || {};
  const y = h / 2;
  const box = <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />;
  if (sh.lineUp && sh.lineUp.length) {
    const list = sh.lineUp.map((s: string) => railList(s)[0]).filter(Boolean);
    const step = (w - 16) / list.length;
    return (
      <g>
        {box}
        {list.map((f: any, k: number) => (
          <g key={k}>
            <RailFrac x={8 + step * (k + 0.5)} y={y} f={f} size={T.micro} fill={C.ink} />
            {k > 0 && <text x={8 + step * k} y={y + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={mix(C.ink, C.panel, 0.3)}>{sh.direction === "descending" ? ">" : "<"}</text>}
          </g>
        ))}
      </g>
    );
  }
  const a = railList(sh.left)[0], b = railList(sh.right)[0];
  if (!a || !b) return null;
  if (L.kind === "bay" || railNotYet(L.value)) {
    return (
      <g>
        {box}
        <RailFrac x={40} y={y} f={a} size={T.micro} fill={C.ink} />
        <rect x={72} y={y - 17} width={96} height={34} rx={10} fill={tint(SKY, 0.65)} />
        <text x={120} y={y + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={shade(SKY, 0.5)}>{tx("not yet")}</text>
        <RailFrac x={200} y={y} f={b} size={T.micro} fill={C.ink} />
      </g>
    );
  }
  const big = L.kind === "sign" ? String(L.value) : railSame(railList(L.value)[0], a) ? ">" : "<";
  return (
    <g>
      {box}
      <RailFrac x={56} y={y} f={a} size={T.micro} fill={big === ">" ? shade(VERM, 0.25) : C.ink} />
      <text x={w / 2} y={y + 10} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{big}</text>
      <RailFrac x={w - 56} y={y} f={b} size={T.micro} fill={big === "<" ? shade(VERM, 0.25) : C.ink} />
    </g>
  );
}

function WhichIsMoreRail(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work, Runs,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format: showTyped, fitHost: () => null }} />
  );
}

export default WhichIsMoreRail;
