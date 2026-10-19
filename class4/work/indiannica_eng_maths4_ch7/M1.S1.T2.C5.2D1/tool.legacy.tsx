/* ═══ M1.S1.T2.C4.2D1 · cut_and_name · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "cut_and_name";
const MEDIA_ID = "M1.S1.T2.C4.2D1";
const TOOL_NAME = "Cut and Name";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["One whole thing on the mat. Cut it into equal parts before you colour anything."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every whole cut, every part named, and the pieces nobody took still lying on the mat.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Any whole, any number of cuts, and a free cut line to slide.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime `lineFor(line, lang, TR)`); the English
   everywhere else stays what the checks read. NCERT class 4 terms: भिन्न / અપૂર્ણાંક, अंश हर / અંશ છેદ,
   बराबर भाग / સરખા ભાગ, आधा चौथाई / અડધું ચોથો ભાગ, सजातीय / સમાન છેદ. Fractions in a spoken line are
   written as words ("बारह में से सात भाग"), digits stay digits. A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Cut and Name": "काटो और नाम दो",
    "One whole thing on the mat. Cut it into equal parts before you colour anything.": "चटाई पर एक पूर्ण चीज़ है। कुछ भी रंगने से पहले उसे बराबर भागों में काटो।",
    "Every whole cut, every part named, and the pieces nobody took still lying on the mat.": "हर पूर्ण कटा और हर भाग का नाम बताया गया। जो टुकड़े किसी ने नहीं लिए, वे चटाई पर पड़े हैं।",
    "Free play. Any whole, any number of cuts, and a free cut line to slide.": "मुक्त खेल। कोई भी पूर्ण लो, जितने चाहो कट करो, और कट की रेखा सरकाओ।",
    "What the two numbers count": "दोनों संख्याएँ क्या गिनती हैं",
    "Slide the cutter to cut the bar first, then tap the parts you take.": "पहले कटर सरकाकर पट्टी को काटो। फिर जो भाग लेने हैं, उन पर टैप करो।",
    "Which number says how it was cut?": "कौन-सी संख्या बताती है कि इसे कैसे काटा गया?",
    "How many of its pieces did you colour in?": "इसके कितने टुकड़े तुमने रंगे?",
    "Read a fraction from the bottom up: first how many equal parts, then how many are taken.": "भिन्न को नीचे से ऊपर पढ़ो। पहले कितने बराबर भाग हैं, फिर कितने लिए गए।",
    "The lower number says how many equal parts the whole was cut into. The upper number says how many of them are counted.": "नीचे की संख्या बताती है कि पूर्ण के कितने बराबर भाग हैं। ऊपर की संख्या बताती है कि उनमें से कितने लिए गए।",
    "You learned: the bottom counts equal parts, the top counts those taken.": "तुमने सीखा: नीचे बराबर भाग, ऊपर लिए गए भाग।",
    "A ribbon is cut into seven equal pieces and four of them are tied together. Write that as a fraction and say what each number counts.": "एक फीता सात बराबर टुकड़ों में कटा है। उनमें से चार टुकड़े साथ में बाँधे गए हैं। इसे भिन्न में लिखो और बताओ कि हर संख्या क्या गिनती है।",
    "What fraction is tied?": "कौन-सा भिन्न बाँधा गया?",
    "Count the equal pieces of the ribbon. Does that count go above the line or below it?": "फीते के बराबर टुकड़े गिनो। यह गिनती रेखा के ऊपर आएगी या नीचे?",
    "A wall is painted in nine equal bands and five of them are blue. What fraction of the wall is blue, and what does the nine count?": "एक दीवार नौ बराबर पट्टियों में रंगी है। उनमें से पाँच पट्टियाँ नीली हैं। दीवार का कौन-सा भिन्न नीला है, और नौ क्या गिनता है?",
    "What fraction is blue?": "कौन-सा भिन्न नीला है?",
    "Did the number under the line count every band, or only the ones left over?": "रेखा के नीचे की संख्या ने सभी पट्टियाँ गिनीं, या सिर्फ़ बची हुई?",
    "In 7/12, which number counts the parts that were taken, and where is it written?": "बारह में से सात भाग में, कौन-सी संख्या लिए गए भाग गिनती है? और वह कहाँ लिखी है?",
    "Which number counts taken?": "कौन-सी संख्या लिए भाग गिनती है?",
    "Which of the two numbers counts all the counters in the row?": "दोनों संख्याओं में से कौन-सी पंक्ति की सभी गोटियाँ गिनती है?",
    "7, on top": "7, ऊपर",
    "12, below": "12, नीचे",
    "Equal parts, or no fraction at all": "बराबर भाग, वरना कोई भिन्न नहीं",
    "Drag one piece and lay it on another. Do they match, or does one stick out?": "एक टुकड़े को खींचकर दूसरे पर रखो। क्या वे मिलते हैं, या एक बाहर निकला रहता है?",
    "What does a fraction name promise about the size of the pieces?": "भिन्न का नाम टुकड़ों के आकार के बारे में क्या वादा करता है?",
    "A quarter or a sixth names one of several pieces that are all the same size.": "चौथाई या छठा भाग, कई टुकड़ों में से एक का नाम है। वे सब एक ही आकार के होते हैं।",
    "Pieces that are not equal have no fraction name at all. Equal parts are part of the meaning, not a rule about neatness.": "जो टुकड़े बराबर नहीं होते, उनका कोई भिन्न नाम नहीं होता। बराबर भाग होना भिन्न के अर्थ का हिस्सा है, सफ़ाई का नियम नहीं।",
    "You learned: pieces that are not equal have no fraction name.": "तुमने सीखा: बराबर न हों तो भिन्न नाम नहीं।",
    "A paper strip is cut into four pieces, but one piece is twice as long as each of the others. Can one of the small pieces be called a quarter?": "एक कागज़ की पट्टी चार टुकड़ों में कटी है। एक टुकड़ा बाकी हर टुकड़े से दुगुना लंबा है। क्या छोटे टुकड़ों में से एक को चौथाई कह सकते हैं?",
    "Small piece a quarter?": "छोटा टुकड़ा चौथाई है?",
    "Lay the long piece over the small ones. How many small ones does it cover?": "लंबे टुकड़े को छोटे टुकड़ों पर रखो। यह कितने छोटे टुकड़ों को ढकता है?",
    "A cake is cut into six pieces of different sizes. Is one of them a sixth?": "एक केक अलग-अलग आकार के छह टुकड़ों में कटा है। क्या उनमें से एक छठा भाग है?",
    "Is one piece a sixth?": "क्या एक टुकड़ा छठा भाग है?",
    "Lay the biggest slice on the smallest. Are the six slices the same size?": "सबसे बड़े टुकड़े को सबसे छोटे पर रखो। क्या छहों टुकड़े एक ही आकार के हैं?",
    "Two children each cut an identical sheet into four pieces. One makes four equal pieces and the other makes four unequal ones. Whose picture can be labelled one quarter?": "दो बच्चों ने एक जैसी शीट को चार-चार टुकड़ों में काटा। एक के चारों टुकड़े बराबर हैं, दूसरे के नहीं। किसकी तस्वीर को एक चौथाई नाम दिया जा सकता है?",
    "Which sheet has quarters?": "किस शीट में चौथाई हैं?",
    "Lay the pieces of each sheet on one another. On which sheet do all four match?": "हर शीट के टुकड़ों को एक-दूसरे पर रखो। किस शीट में चारों मिलते हैं?",
    "Yes": "हाँ",
    "No": "नहीं",
    "both": "दोनों",
    "neither": "कोई नहीं",
    "The five kinds, sorted by their two numbers": "पाँच प्रकार, दो संख्याओं से छाँटे गए",
    "Look at the number on top and the one below.": "ऊपर की संख्या और नीचे की संख्या को देखो।",
    "Drag each card into every tray it belongs in, then press Enter.": "हर कार्ड को उन सभी ट्रे में खींचो जिनमें वह आता है। फिर एंटर दबाओ।",
    "Is the upper one smaller than the lower one, or is it not?": "क्या ऊपर की संख्या नीचे की संख्या से छोटी है, या नहीं?",
    "Test one card at a time, and run every tray on it before the next card.": "एक बार में एक कार्ड जाँचो। अगला कार्ड लेने से पहले उस पर हर ट्रे की जाँच करो।",
    "Each kind is a separate test on the two numbers. One fraction can belong to several kinds at the same time.": "हर प्रकार, दो संख्याओं पर एक अलग जाँच है। एक भिन्न एक साथ कई प्रकारों में आ सकता है।",
    "You learned: one fraction can pass several of the five tests at once.": "तुमने सीखा: एक भिन्न एक साथ कई जाँचों में पास हो सकता है।",
    "Look at 5/9, 11/8, 1/9 and 8/8. Say which are proper, which are improper, which are like fractions, and which is a unit fraction.": "इन भिन्नों को देखो। नौ में से पाँच, आठ में से ग्यारह, नौ में से एक और आठ में से आठ। बताओ कौन-से उचित और कौन-से अनुचित हैं। कौन-से सजातीय भिन्न हैं, और कौन-सा इकाई भिन्न है?",
    "Sort the cards": "कार्ड छाँटो",
    "Look again at the card whose top and bottom are the same. Which trays does it earn?": "उस कार्ड को फिर देखो जिसके ऊपर और नीचे की संख्या एक-सी है। वह किन ट्रे में जाएगा?",
    "Which of 4/11, 13/6, 1/11 and 6/6 are improper fractions?": "ग्यारह में से चार, छह में से तेरह। ग्यारह में से एक और छह में से छह। इनमें से कौन-से अनुचित भिन्न हैं?",
    "Which are improper?": "कौन-से अनुचित हैं?",
    "Improper means the top is not smaller than the bottom. Test every card that way.": "अनुचित का मतलब है कि ऊपर की संख्या नीचे वाली से छोटी नहीं है। हर कार्ड ऐसे जाँचो।",
    "From 2/15, 1/8 and 9/15, name the two like fractions, the one unlike them, and the unit fraction.": "पंद्रह में से दो, आठ में से एक और पंद्रह में से नौ। दो सजातीय भिन्न, उनसे असमान भिन्न और इकाई भिन्न बताओ।",
    "Like, unlike, unit": "सजातीय, असमान, इकाई भिन्न",
    "Which two share a bottom number, and which card is left standing alone?": "किन दो की नीचे की संख्या एक-सी है? और कौन-सा कार्ड अकेला रह गया?",
    "Halves and quarters in one field": "एक ही खेत में आधे और चौथाई",
    "Tap one half to cut it in two. What is each of the new pieces called?": "एक आधे भाग पर टैप करके उसे दो भागों में काटो। नए टुकड़ों में से हर एक का क्या नाम है?",
    "How many small pieces does it take to cover one half?": "एक आधे भाग को ढकने में कितने छोटे टुकड़े लगते हैं?",
    "Lay the small pieces into a whole circle and count how many it takes.": "छोटे टुकड़ों को पूर्ण वृत्त में रखो और गिनो कि कितने लगते हैं।",
    "Two quarters make a half, two halves make a whole, and four quarters make a whole.": "दो चौथाई मिलकर एक आधा बनाते हैं। दो आधे मिलकर एक पूर्ण बनाते हैं। चार चौथाई मिलकर भी एक पूर्ण बनाते हैं।",
    "You learned: two quarters make a half and four quarters make a whole.": "तुमने सीखा: दो चौथाई से आधा, चार चौथाई से पूर्ण बनता है।",
    "A flatbread is cut in half and one half is cut in half again. Name the three pieces and say what they come to together.": "एक रोटी को आधा काटा गया। फिर एक आधे को दोबारा आधा काटा गया। तीनों टुकड़ों के नाम बताओ और बताओ कि वे मिलकर क्या बनते हैं।",
    "What is each small piece?": "हर छोटा टुकड़ा क्या है?",
    "How many pieces of this size would it take to fill the whole circle?": "इस आकार के कितने टुकड़े पूरे वृत्त को भरेंगे?",
    "A field is split into two equal halves and one half is split equally again. Write the three pieces as fractions and show that they make one whole field.": "एक खेत को दो बराबर आधे भागों में बाँटा गया। फिर एक आधे को बराबर बाँटा गया। तीनों टुकड़े भिन्न में लिखो और दिखाओ कि वे मिलकर पूरा खेत हैं।",
    "Two quarters together make?": "दो चौथाई मिलकर क्या बनते हैं?",
    "Slide both small pieces onto the big half. What do they cover?": "दोनों छोटे टुकड़े बड़े आधे भाग पर सरकाओ। वे कितना ढकते हैं?",
    "How many quarters are there in three halves?": "तीन आधे में कितने चौथाई होते हैं?",
    "Quarters in three halves?": "तीन आधे में चौथाई?",
    "Cut every half in two, then count the small pieces one at a time.": "हर आधे को दो भागों में काटो, फिर छोटे टुकड़े एक-एक करके गिनो।",
    "quarters": "चौथाई",
    "6 quarters": "6 चौथाई",
    "sorted": "छाँटे गए",
    "numerator": "अंश", "denominator": "हर",
    "whole": "पूर्ण", "parts": "भाग", "taken": "लिए गए", "in all": "कुल",
    "proper": "उचित", "improper": "अनुचित", "like": "सजातीय", "unlike": "असमान", "unit": "इकाई भिन्न",
    "top < bottom": "ऊपर < नीचे", "top ≥ bottom": "ऊपर ≥ नीचे", "same bottom": "नीचे समान", "bottom alone": "नीचे अकेली", "top is 1": "ऊपर 1 है",
    "bar": "पट्टी", "circle": "वृत्त", "things": "चीज़ें", "free cut": "खुला कट", "no name": "नाम नहीं", "cm": "सेमी",
  },
  gu: {
    "Cut and Name": "કાપો અને નામ આપો",
    "One whole thing on the mat. Cut it into equal parts before you colour anything.": "સાદડી પર એક આખી વસ્તુ છે. કંઈ પણ રંગતાં પહેલાં તેને સરખા ભાગમાં કાપો.",
    "Every whole cut, every part named, and the pieces nobody took still lying on the mat.": "દરેક આખું કપાયું અને દરેક ભાગનું નામ પડ્યું. જે ટુકડા કોઈએ ન લીધા, તે સાદડી પર પડ્યા છે.",
    "Free play. Any whole, any number of cuts, and a free cut line to slide.": "મુક્ત રમત. કોઈ પણ આખું લો, ગમે તેટલા કાપ મૂકો, અને કાપવાની રેખા સરકાવો.",
    "What the two numbers count": "બંને સંખ્યાઓ શું ગણે છે",
    "Slide the cutter to cut the bar first, then tap the parts you take.": "પહેલાં કટર સરકાવીને પટ્ટીને કાપો. પછી જે ભાગ લેવા હોય તેના પર ટેપ કરો.",
    "Which number says how it was cut?": "કઈ સંખ્યા કહે છે કે તેને કેવી રીતે કાપ્યું?",
    "How many of its pieces did you colour in?": "તેના કેટલા ટુકડા તમે રંગ્યા?",
    "Read a fraction from the bottom up: first how many equal parts, then how many are taken.": "અપૂર્ણાંક નીચેથી ઉપર વાંચો. પહેલાં કેટલા સરખા ભાગ છે, પછી કેટલા લીધા.",
    "The lower number says how many equal parts the whole was cut into. The upper number says how many of them are counted.": "નીચેની સંખ્યા કહે છે કે આખાના કેટલા સરખા ભાગ છે. ઉપરની સંખ્યા કહે છે કે તેમાંથી કેટલા લીધા.",
    "You learned: the bottom counts equal parts, the top counts those taken.": "તમે શીખ્યા: નીચે સરખા ભાગ, ઉપર લીધેલા ભાગ.",
    "A ribbon is cut into seven equal pieces and four of them are tied together. Write that as a fraction and say what each number counts.": "એક રિબન સાત સરખા ટુકડામાં કપાયેલી છે. તેમાંથી ચાર ટુકડા સાથે બાંધ્યા છે. તેને અપૂર્ણાંક તરીકે લખો અને કહો કે દરેક સંખ્યા શું ગણે છે.",
    "What fraction is tied?": "કયો અપૂર્ણાંક બાંધ્યો?",
    "Count the equal pieces of the ribbon. Does that count go above the line or below it?": "રિબનના સરખા ટુકડા ગણો. આ ગણતરી રેખાની ઉપર આવશે કે નીચે?",
    "A wall is painted in nine equal bands and five of them are blue. What fraction of the wall is blue, and what does the nine count?": "એક દીવાલ નવ સરખી પટ્ટીઓમાં રંગેલી છે. તેમાંથી પાંચ પટ્ટીઓ વાદળી છે. દીવાલનો કયો અપૂર્ણાંક વાદળી છે, અને નવ શું ગણે છે?",
    "What fraction is blue?": "કયો અપૂર્ણાંક વાદળી છે?",
    "Did the number under the line count every band, or only the ones left over?": "રેખા નીચેની સંખ્યાએ બધી પટ્ટીઓ ગણી કે ફક્ત બાકીની?",
    "In 7/12, which number counts the parts that were taken, and where is it written?": "બારમાંથી સાત ભાગ વાળા અપૂર્ણાંકમાં કઈ સંખ્યા લીધેલા ભાગ ગણે છે? અને તે ક્યાં લખાય છે?",
    "Which number counts taken?": "કઈ સંખ્યા લીધેલા ભાગ ગણે છે?",
    "Which of the two numbers counts all the counters in the row?": "બે સંખ્યામાંથી કઈ હરોળની બધી ચકતીઓ ગણે છે?",
    "7, on top": "7, ઉપર",
    "12, below": "12, નીચે",
    "Equal parts, or no fraction at all": "સરખા ભાગ, નહીં તો અપૂર્ણાંક નહીં",
    "Drag one piece and lay it on another. Do they match, or does one stick out?": "એક ટુકડો ખેંચીને બીજા પર મૂકો. શું તે મળે છે, કે એક બહાર નીકળે છે?",
    "What does a fraction name promise about the size of the pieces?": "અપૂર્ણાંકનું નામ ટુકડાના માપ વિશે શું વચન આપે છે?",
    "A quarter or a sixth names one of several pieces that are all the same size.": "ચોથો કે છઠ્ઠો ભાગ, ઘણા ટુકડામાંથી એકનું નામ છે. તે બધા એક જ માપના હોય છે.",
    "Pieces that are not equal have no fraction name at all. Equal parts are part of the meaning, not a rule about neatness.": "જે ટુકડા સરખા નથી હોતા, તેમનું કોઈ અપૂર્ણાંક નામ નથી હોતું. સરખા ભાગ હોવા એ અર્થનો ભાગ છે, સુઘડતાનો નિયમ નથી.",
    "You learned: pieces that are not equal have no fraction name.": "તમે શીખ્યા: સરખા ન હોય તો અપૂર્ણાંક નામ નથી.",
    "A paper strip is cut into four pieces, but one piece is twice as long as each of the others. Can one of the small pieces be called a quarter?": "કાગળની એક પટ્ટી ચાર ટુકડામાં કપાયેલી છે. એક ટુકડો બાકીના દરેક કરતાં બમણો લાંબો છે. શું નાના ટુકડામાંથી એકને ચોથો ભાગ કહેવાય?",
    "Small piece a quarter?": "નાનો ટુકડો ચોથો ભાગ છે?",
    "Lay the long piece over the small ones. How many small ones does it cover?": "લાંબા ટુકડાને નાના ટુકડા પર મૂકો. તે કેટલા નાના ટુકડાને ઢાંકે છે?",
    "A cake is cut into six pieces of different sizes. Is one of them a sixth?": "એક કેક જુદા જુદા માપના છ ટુકડામાં કપાયેલી છે. શું તેમાંથી એક છઠ્ઠો ભાગ છે?",
    "Is one piece a sixth?": "શું એક ટુકડો છઠ્ઠો ભાગ છે?",
    "Lay the biggest slice on the smallest. Are the six slices the same size?": "સૌથી મોટા ટુકડાને સૌથી નાના પર મૂકો. શું છએ ટુકડા એક જ માપના છે?",
    "Two children each cut an identical sheet into four pieces. One makes four equal pieces and the other makes four unequal ones. Whose picture can be labelled one quarter?": "બે બાળકોએ એકસરખી શીટને ચાર-ચાર ટુકડામાં કાપી. એકના ચારે ટુકડા સરખા છે, બીજાના નથી. કોના ચિત્રને એક ચોથો ભાગ નામ આપી શકાય?",
    "Which sheet has quarters?": "કઈ શીટમાં ચોથા ભાગ છે?",
    "Lay the pieces of each sheet on one another. On which sheet do all four match?": "દરેક શીટના ટુકડા એક બીજા પર મૂકો. કઈ શીટમાં ચારે મળે છે?",
    "Yes": "હા",
    "No": "ના",
    "both": "બંને",
    "neither": "એકેય નહીં",
    "The five kinds, sorted by their two numbers": "બે સંખ્યાથી અલગ પાડેલા પાંચ પ્રકાર",
    "Look at the number on top and the one below.": "ઉપરની સંખ્યા અને નીચેની સંખ્યા જુઓ.",
    "Drag each card into every tray it belongs in, then press Enter.": "દરેક કાર્ડને તે જે ટ્રેમાં આવે તે દરેકમાં ખેંચો. પછી એન્ટર દબાવો.",
    "Is the upper one smaller than the lower one, or is it not?": "શું ઉપરની સંખ્યા નીચેની સંખ્યાથી નાની છે, કે નહીં?",
    "Test one card at a time, and run every tray on it before the next card.": "એક સમયે એક કાર્ડ તપાસો. બીજું કાર્ડ લેતાં પહેલાં તેના પર દરેક ટ્રે તપાસો.",
    "Each kind is a separate test on the two numbers. One fraction can belong to several kinds at the same time.": "દરેક પ્રકાર બે સંખ્યા પરની અલગ ચકાસણી છે. એક અપૂર્ણાંક એક સાથે ઘણા પ્રકારમાં આવી શકે.",
    "You learned: one fraction can pass several of the five tests at once.": "તમે શીખ્યા: એક અપૂર્ણાંક એક સાથે ઘણી ચકાસણી પાસ કરી શકે.",
    "Look at 5/9, 11/8, 1/9 and 8/8. Say which are proper, which are improper, which are like fractions, and which is a unit fraction.": "આ અપૂર્ણાંકો જુઓ. નવમાંથી પાંચ, આઠમાંથી અગિયાર, નવમાંથી એક અને આઠમાંથી આઠ. કયા શુદ્ધ અને કયા અશુદ્ધ છે તે કહો. કયા સમાન છેદવાળા છે, અને કયો એકમ અપૂર્ણાંક છે?",
    "Sort the cards": "કાર્ડ અલગ પાડો",
    "Look again at the card whose top and bottom are the same. Which trays does it earn?": "જેની ઉપર અને નીચેની સંખ્યા સરખી છે તે કાર્ડ ફરી જુઓ. તે કઈ ટ્રેમાં જશે?",
    "Which of 4/11, 13/6, 1/11 and 6/6 are improper fractions?": "અગિયારમાંથી ચાર, છમાંથી તેર, અગિયારમાંથી એક અને છમાંથી છ. આમાંથી કયા અશુદ્ધ અપૂર્ણાંક છે?",
    "Which are improper?": "કયા અશુદ્ધ છે?",
    "Improper means the top is not smaller than the bottom. Test every card that way.": "અશુદ્ધનો અર્થ છે કે ઉપરની સંખ્યા નીચેની કરતાં નાની નથી. દરેક કાર્ડ આમ તપાસો.",
    "From 2/15, 1/8 and 9/15, name the two like fractions, the one unlike them, and the unit fraction.": "પંદરમાંથી બે, આઠમાંથી એક અને પંદરમાંથી નવ. બે સમાન છેદવાળા, તેમનાથી અસમાન એક, અને એકમ અપૂર્ણાંક કહો.",
    "Like, unlike, unit": "સમાન છેદ, અસમાન, એકમ",
    "Which two share a bottom number, and which card is left standing alone?": "કયા બેની નીચેની સંખ્યા સરખી છે? અને કયું કાર્ડ એકલું રહી ગયું?",
    "Halves and quarters in one field": "એક ખેતરમાં અડધા અને ચોથા ભાગ",
    "Tap one half to cut it in two. What is each of the new pieces called?": "એક અડધા ભાગ પર ટેપ કરી તેને બે ભાગમાં કાપો. નવા દરેક ટુકડાનું નામ શું છે?",
    "How many small pieces does it take to cover one half?": "એક અડધા ભાગને ઢાંકવા કેટલા નાના ટુકડા જોઈએ?",
    "Lay the small pieces into a whole circle and count how many it takes.": "નાના ટુકડાને એક આખા વર્તુળમાં મૂકો અને ગણો કે કેટલા લાગે છે.",
    "Two quarters make a half, two halves make a whole, and four quarters make a whole.": "બે ચોથા ભાગ મળીને એક અડધું બને છે. બે અડધા મળીને એક આખું બને છે. ચાર ચોથા ભાગ મળીને પણ એક આખું બને છે.",
    "You learned: two quarters make a half and four quarters make a whole.": "તમે શીખ્યા: બે ચોથા ભાગથી અડધું, ચારથી આખું બને.",
    "A flatbread is cut in half and one half is cut in half again. Name the three pieces and say what they come to together.": "એક રોટલીને અડધી કાપી. પછી એક અડધાને ફરી અડધું કાપ્યું. ત્રણે ટુકડાના નામ કહો અને કહો કે તે મળીને શું બને છે.",
    "What is each small piece?": "દરેક નાનો ટુકડો શું છે?",
    "How many pieces of this size would it take to fill the whole circle?": "આ માપના કેટલા ટુકડા આખા વર્તુળને ભરશે?",
    "A field is split into two equal halves and one half is split equally again. Write the three pieces as fractions and show that they make one whole field.": "એક ખેતરને બે સરખા અડધા ભાગમાં વહેંચ્યું. પછી એક અડધાને ફરી સરખું વહેંચ્યું. ત્રણે ટુકડા અપૂર્ણાંકમાં લખો અને બતાવો કે તે મળીને આખું ખેતર છે.",
    "Two quarters together make?": "બે ચોથા ભાગ મળીને શું બને?",
    "Slide both small pieces onto the big half. What do they cover?": "બંને નાના ટુકડા મોટા અડધા ભાગ પર સરકાવો. તે કેટલું ઢાંકે છે?",
    "How many quarters are there in three halves?": "ત્રણ અડધામાં કેટલા ચોથા ભાગ હોય?",
    "Quarters in three halves?": "ત્રણ અડધામાં ચોથા ભાગ?",
    "Cut every half in two, then count the small pieces one at a time.": "દરેક અડધાને બે ભાગમાં કાપો, પછી નાના ટુકડા એક એક કરીને ગણો.",
    "quarters": "ચોથા ભાગ",
    "6 quarters": "6 ચોથા ભાગ",
    "sorted": "અલગ પાડ્યા",
    "numerator": "અંશ", "denominator": "છેદ",
    "whole": "આખું", "parts": "ભાગ", "taken": "લીધેલા", "in all": "કુલ",
    "proper": "શુદ્ધ", "improper": "અશુદ્ધ", "like": "સમાન છેદ", "unlike": "અસમાન", "unit": "એકમ",
    "top < bottom": "ઉપર < નીચે", "top ≥ bottom": "ઉપર ≥ નીચે", "same bottom": "નીચે સમાન", "bottom alone": "નીચે એકલી", "top is 1": "ઉપર 1 છે",
    "bar": "પટ્ટી", "circle": "વર્તુળ", "things": "વસ્તુઓ", "free cut": "ખુલ્લો કાપ", "no name": "નામ નથી", "cm": "સેમી",
  },
};

/* the word keys a question offers (two across on the pad) */
const CN_YESNO = [{ id: "yes", label: "Yes" }, { id: "no", label: "No" }];
const CN_WHICH = [{ id: "top7", label: "7, on top" }, { id: "bottom12", label: "12, below" }];
const CN_SHEET = [{ id: "A", label: "A" }, { id: "B", label: "B" }, { id: "both", label: "both" }, { id: "neither", label: "neither" }];
/* what the slot shows once a word key or a sorted shelf has been given */
const CN_SAID: Record<string, string> = { top7: "7, on top", bottom12: "12, below", yes: "Yes", no: "No", both: "both", neither: "neither" };

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   items   the authored fallback: three a phase, the third tests whether the phase landed.
           qid   the plan's question id (<conceptId>:ML<n> or <conceptId>:<q_no>)
           kind  your name for the item type (the Work, judge and oracle switch on it)
           say   the spoken question; ask = the short prompt above the slot (never a slash fraction)
           answer what the slot or the working area must produce; miss = rung 1, never the answer
           parts SLOT_FRACTION with answer [a, b]: the slot draws the fraction stacked, typed "4|7" */
const PHASES = [
  {
    n: 1,
    concept: "What the two numbers count",
    conceptId: "M1.S1.T2.C4", objectiveIds: ["O1"],
    says: ["Slide the cutter to cut the bar first, then tap the parts you take.", "Which number says how it was cut?"],
    ladder: ["How many of its pieces did you colour in?", "Read a fraction from the bottom up: first how many equal parts, then how many are taken."],
    closing: "The lower number says how many equal parts the whole was cut into. The upper number says how many of them are counted.",
    learned: "You learned: the bottom counts equal parts, the top counts those taken.",
    traceback: "A second bar is cut the same way beneath, every part is counted for the bottom number, then the taken parts for the top, ending on the whole fraction.",
    items: [
      /* learn ML1: answer in the plan = 4/7, where the seven counts the equal pieces and the four counts the pieces tied together */
      { qid: "M1.S1.T2.C4:ML1", kind: "cut", thing: "ribbon", cutN: 7, take: 4, parts: SLOT_FRACTION, answer: [4, 7], near: "7|4", winMs: 3000,
        say: "A ribbon is cut into seven equal pieces and four of them are tied together. Write that as a fraction and say what each number counts.",
        ask: "What fraction is tied?", miss: "Count the equal pieces of the ribbon. Does that count go above the line or below it?" },
      /* practice 1: answer in the plan = 5/9, and the nine counts the equal bands the wall was divided into */
      { qid: "M1.S1.T2.C4:1", kind: "cut", thing: "wall", cutN: 9, take: 5, parts: SLOT_FRACTION, answer: [5, 9], near: "5|4", winMs: 3000,
        say: "A wall is painted in nine equal bands and five of them are blue. What fraction of the wall is blue, and what does the nine count?",
        ask: "What fraction is blue?", miss: "Did the number under the line count every band, or only the ones left over?" },
      /* practice 2: answer in the plan = The seven, and it is written above the line */
      { qid: "M1.S1.T2.C4:2", kind: "which", frac: [7, 12], choices: CN_WHICH, answer: "top7", near: "bottom12", winMs: 2600,
        say: "In 7/12, which number counts the parts that were taken, and where is it written?",
        ask: "Which number counts taken?", miss: "Which of the two numbers counts all the counters in the row?" },
    ],
  },
  {
    n: 2,
    concept: "Equal parts, or no fraction at all",
    conceptId: "M1.S1.T2.C5", objectiveIds: ["O1"],
    says: ["Drag one piece and lay it on another. Do they match, or does one stick out?"],
    ladder: ["What does a fraction name promise about the size of the pieces?", "A quarter or a sixth names one of several pieces that are all the same size."],
    closing: "Pieces that are not equal have no fraction name at all. Equal parts are part of the meaning, not a rule about neatness.",
    learned: "You learned: pieces that are not equal have no fraction name.",
    traceback: "An evenly cut copy of the same whole is drawn beneath, the pieces are laid over it, and the answer is written under them.",
    items: [
      /* learn ML2: answer in the plan = No, because a quarter has to be one of four pieces that are all the same size */
      { qid: "M1.S1.T2.C5:ML2", kind: "equal", way: "strip", choices: CN_YESNO, answer: "no", near: "yes", winMs: 2600,
        sheets: [{ id: "strip", x: 63, y: 60, w: 960, h: 120, units: [1, 2, 1, 1] }],
        say: "A paper strip is cut into four pieces, but one piece is twice as long as each of the others. Can one of the small pieces be called a quarter?",
        ask: "Small piece a quarter?", miss: "Lay the long piece over the small ones. How many small ones does it cover?" },
      /* practice 3: answer in the plan = No, because sixths have to be six pieces that are all the same size */
      { qid: "M1.S1.T2.C5:3", kind: "equal", way: "cake", choices: CN_YESNO, answer: "no", near: "yes", winMs: 2600,
        sheets: [{ id: "cake", x: 143, y: 50, w: 800, h: 180, units: [5, 9, 6, 11, 7, 10] }],
        say: "A cake is cut into six pieces of different sizes. Is one of them a sixth?",
        ask: "Is one piece a sixth?", miss: "Lay the biggest slice on the smallest. Are the six slices the same size?" },
      /* practice 4: answer in the plan = Only the one with four equal pieces, because the other sheet has no piece that is one of four equal parts */
      { qid: "M1.S1.T2.C5:4", kind: "equal", way: "sheets", choices: CN_SHEET, answer: "B", near: "both", winMs: 2600,
        sheets: [{ id: "A", x: 30, y: 70, w: 480, h: 190, units: [9, 4, 7, 5] }, { id: "B", x: 576, y: 70, w: 480, h: 190, units: [1, 1, 1, 1] }],
        say: "Two children each cut an identical sheet into four pieces. One makes four equal pieces and the other makes four unequal ones. Whose picture can be labelled one quarter?",
        ask: "Which sheet has quarters?", miss: "Lay the pieces of each sheet on one another. On which sheet do all four match?" },
    ],
  },
  {
    n: 3,
    concept: "The five kinds, sorted by their two numbers",
    conceptId: "M1.S1.T2.C6", objectiveIds: ["O2"],
    says: ["Look at the number on top and the one below.", "Drag each card into every tray it belongs in, then press Enter."],
    ladder: ["Is the upper one smaller than the lower one, or is it not?", "Test one card at a time, and run every tray on it before the next card."],
    closing: "Each kind is a separate test on the two numbers. One fraction can belong to several kinds at the same time.",
    learned: "You learned: one fraction can pass several of the five tests at once.",
    traceback: "Each card is lifted in turn, every tray's test is run on it, and the trays it earns are written under it.",
    items: [
      /* learn ML3: answer in the plan = 5/9 and 1/9 are proper, 11/8 and 8/8 are improper, 5/9 and 1/9 are like fractions, and 1/9 is a unit fraction
         (11/8 and 8/8 share a bottom number too, so they are like fractions as well: the shelf takes all four) */
      { qid: "M1.S1.T2.C6:ML3", kind: "sort", pad: "enter", winMs: 2600,
        cards: [[5, 9], [11, 8], [1, 9], [8, 8]], trays: ["proper", "improper", "like", "unlike", "unit"],
        answer: "proper:5/9,1/9;improper:11/8,8/8;like:5/9,11/8,1/9,8/8;unlike:;unit:1/9",
        near: "proper:5/9,1/9;improper:11/8;like:5/9,11/8,1/9,8/8;unlike:;unit:1/9",
        say: "Look at 5/9, 11/8, 1/9 and 8/8. Say which are proper, which are improper, which are like fractions, and which is a unit fraction.",
        ask: "Sort the cards", miss: "Look again at the card whose top and bottom are the same. Which trays does it earn?" },
      /* practice 5: answer in the plan = 13/6 and 6/6, because in each the upper number is greater than or equal to the lower one */
      { qid: "M1.S1.T2.C6:5", kind: "sort", pad: "enter", winMs: 2600,
        cards: [[4, 11], [13, 6], [1, 11], [6, 6]], trays: ["improper"],
        answer: "improper:13/6,6/6", near: "improper:13/6",
        say: "Which of 4/11, 13/6, 1/11 and 6/6 are improper fractions?",
        ask: "Which are improper?", miss: "Improper means the top is not smaller than the bottom. Test every card that way." },
      /* practice 6: answer in the plan = 2/15 and 9/15 are the like fractions, because both are written in fifteenths, and 1/8 is the unit fraction
         (the say also asks for the odd one out, so the shelf's fifth kind, unlike, is the one tray 1/8 earns here) */
      { qid: "M1.S1.T2.C6:6", kind: "sort", pad: "enter", winMs: 2600,
        cards: [[2, 15], [1, 8], [9, 15]], trays: ["like", "unlike", "unit"],
        answer: "like:2/15,9/15;unlike:1/8;unit:1/8", near: "like:2/15,1/8,9/15;unlike:;unit:1/8",
        say: "From 2/15, 1/8 and 9/15, name the two like fractions, the one unlike them, and the unit fraction.",
        ask: "Like, unlike, unit", miss: "Which two share a bottom number, and which card is left standing alone?" },
    ],
  },
  {
    n: 4,
    concept: "Halves and quarters in one field",
    conceptId: "M1.S1.T2.C7", objectiveIds: ["O2"],
    says: ["Tap one half to cut it in two. What is each of the new pieces called?"],
    ladder: ["How many small pieces does it take to cover one half?", "Lay the small pieces into a whole circle and count how many it takes."],
    closing: "Two quarters make a half, two halves make a whole, and four quarters make a whole.",
    learned: "You learned: two quarters make a half and four quarters make a whole.",
    traceback: "The small pieces are laid on the untouched half and then into a whole circle, counted one by one, and named under the pieces.",
    items: [
      /* learn ML4: answer in the plan = One half, one quarter and one quarter, and together they make one whole flatbread
         (the slot takes the name of each new piece; the win writes all three under the closed whole) */
      { qid: "M1.S1.T2.C7:ML4", kind: "halves", parts: SLOT_FRACTION, answer: [1, 4], near: "1|2", winMs: 3400,
        say: "A flatbread is cut in half and one half is cut in half again. Name the three pieces and say what they come to together.",
        ask: "What is each small piece?", miss: "How many pieces of this size would it take to fill the whole circle?" },
      /* practice 7: answer in the plan = One half, one quarter and one quarter, and 1/4 + 1/4 = 1/2, so the three pieces are two halves, which is one whole */
      { qid: "M1.S1.T2.C7:7", kind: "field", parts: SLOT_FRACTION, answer: [1, 2], near: "2|8", winMs: 3000,
        say: "A field is split into two equal halves and one half is split equally again. Write the three pieces as fractions and show that they make one whole field.",
        ask: "Two quarters together make?", miss: "Slide both small pieces onto the big half. What do they cover?" },
      /* practice 8: answer in the plan = Six quarters, because each half is two quarters and three halves is six of them */
      { qid: "M1.S1.T2.C7:8", kind: "three", halves: 3, answer: 6, near: 3, unit: "quarters", winMs: 3000,
        say: "How many quarters are there in three halves?",
        ask: "Quarters in three halves?", miss: "Cut every half in two, then count the small pieces one at a time." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const CN_BAR = { x: 63, y: 165, w: 960, h: 160 };                       /* the whole, cut by the dial */
const CN_DIAL = { cy: 52, x0: 190, x1: 890, minus: 63, plus: 951, max: 12 };
const CN_MODEL = { x: 63, y: 390, w: 840, h: 80, fx: 950, fy: 430, lx: 990 };  /* the bar redrawn under it after a miss */
const CN_COLL = { x: 63, y: 40, step: 80, r: 32, cy: 90, fx: 543, fy: 300, lx: 610 };
const CN_LANE = { y: 330, h: 80 };                                      /* two pieces laid one on the other */
/* the shelf: five trays of 204 and four 16-unit gaps come to 1084, just inside the working area */
const CN_SORT = { cw: 96, ch: 120, gap: 54, cy: 8, tagY: 174, ty: 250, tw: 204, tgap: 16, th: 278, band: 72, sw: 72, sh: 90 };
const CN_ML4 = { cx: 300, cy: 250, r: 170, gap: 8, rx: 820, row: 470 };
const CN_FIELD = { x: 90, y: 100, s: 150, hx: 252, rx: 780, ry: 250 };
const CN_THREE = { r: 120, base: 300, cxs: [243, 543, 843], ty: 450 };
const CN_FREE = { dial: { cy: 128, x0: 190, x1: 890, minus: 63, plus: 951, max: 12 }, bar: { x: 0, y: 250, w: 864, h: 140 },
  circle: { cx: 432, cy: 368, r: 150 }, things: { x: 0, step: 72, cy: 320, r: 30 }, out: { x: 993, y: 330 }, cut: 24 };
const MODEL = { bar: CN_BAR, dial: CN_DIAL, model: CN_MODEL, collection: CN_COLL, lane: CN_LANE, shelf: CN_SORT,
  flatbread: CN_ML4, field: CN_FIELD, three: CN_THREE, free: CN_FREE,
  colours: { taken: CONTENT.hundred, left: CONTENT.ten, whole: CONTENT.one, copy: CONTENT.bead, cut: CONTENT.line } };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* the shelf: a card is written "5/9"; a sort is written "proper:5/9,1/9;improper:11/8,8/8" */
const cnCard = (c: any) => c[0] + "/" + c[1];
const cnEnc = (item: any, trays: any) => (item.trays || []).map((t: string) =>
  t + ":" + (item.cards || []).filter((c: any, i: number) => ((trays || {})[t] || []).indexOf(i) >= 0).map(cnCard).join(",")).join(";");
const cnRead = (v: any) => {
  const out: any = {};
  String(v === null || v === undefined ? "" : v).split(";").forEach((part: string) => {
    const b = part.split(":");
    if (b.length === 2) out[b[0].trim()] = b[1].split(",").map((x: string) => x.trim()).filter(Boolean).sort().join(" ");
  });
  return out;
};
/* one tray's test, run on one card (the picture and the traceback use it; the oracle has its own).
   like / unlike are read across the cards on the shelf: a card is like another when they share a bottom
   number, and unlike when no card here shares its bottom number. */
const cnPass = (c: any, tray: string, all: any[]) =>
  tray === "proper" ? c[0] < c[1] : tray === "improper" ? c[0] >= c[1] : tray === "unit" ? c[0] === 1
    : tray === "like" ? all.filter((o: any) => o[1] === c[1]).length > 1
      : tray === "unlike" ? all.filter((o: any) => o[1] === c[1]).length === 1 : false;

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (item.kind === "sort") { const got = cnRead(v), want = cnRead(item.answer); return (item.trays || []).every((t: string) => (got[t] || "") === (want[t] || "")); }
  if (item.kind === "field") { /* two quarters: any name of the same amount is right (1/2, and 2/4 as it stands) */
    const p = slotPartsOf(v, 2); if (p[0] === "" || p[1] === "") return false;
    return Number(p[1]) > 0 && Number(p[0]) * item.answer[1] === Number(p[1]) * item.answer[0];
  }
  if (item.parts) return judgeSlotParts(item, v);
  if (item.choices) return String(v).trim() === String(item.answer);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work */
const oracle = () => {
  const hcf = (a: number, b: number): number => (b ? hcf(b, a % b) : a);
  const same = (x: any, y: any) => Array.isArray(x) && Array.isArray(y) && x.length === y.length && x.every((v: any, i: number) => v === y[i]);
  const tidy = (s: any) => String(s).split(";").map((part: string) => {
    const at = part.indexOf(":");
    return part.slice(0, at) + ":" + part.slice(at + 1).split(",").filter(Boolean).sort().join(",");
  }).sort().join("|");
  const allEqual = (sh: any) => sh.units.every((u: number) => u === sh.units[0]);
  return PHASES.every((p: any) => p.items.every((q: any) => {
    if (q.kind === "cut") return same(q.answer, [q.take, q.cutN]);
    if (q.kind === "which") return q.answer === "top" + q.frac[0];
    if (q.kind === "equal") {
      const good = q.sheets.filter(allEqual);
      if (q.sheets.length === 1) return q.answer === (good.length ? "yes" : "no");
      return q.answer === (good.length === q.sheets.length ? "both" : good.length === 0 ? "neither" : good[0].id);
    }
    if (q.kind === "sort") {
      const test = (c: any, t: string) => t === "proper" ? c[1] > c[0] : t === "improper" ? !(c[0] < c[1]) : t === "unit" ? c[0] === 1
        : t === "like" ? q.cards.some((o: any) => o !== c && o[1] === c[1])
          : t === "unlike" ? !q.cards.some((o: any) => o !== c && o[1] === c[1]) : false;
      return tidy(q.trays.map((t: string) => t + ":" + q.cards.filter((c: any) => test(c, t)).map((c: any) => c[0] + "/" + c[1]).join(",")).join(";")) === tidy(q.answer);
    }
    if (q.kind === "halves") return same(q.answer, [1, 2 * 2]);                       /* half of a half */
    if (q.kind === "field") { const g = hcf(2, 4); return same(q.answer, [2 / g, 4 / g]); }   /* two of the four quarters */
    if (q.kind === "three") return q.answer === q.halves * 2;                          /* two quarters in every half */
    return false;
  }));
};
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.kind === "sort" ? []
  : item.choices ? [String(item.answer)]
    : item.parts ? [item.answer[0] + "/" + item.answer[1]]
      : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;
/* what the slot prints once a word key or a sorted shelf has been given */
const format = (v: any) => (typeof v === "string" && v.indexOf(":") >= 0 ? "sorted" : CN_SAID[String(v)] || v);

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: e.g. drop a token that waits; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── drawing helpers (this tool's own; a fraction is always stacked, never "3/4") ─────────── */

/* a fraction written the way the book writes it: the top number over a rule over the bottom one */
function CnFrac({ x, y, a, b, size, ink }: any) {
  const sz = size || T.label;
  const w = Math.max(String(a === undefined || a === null ? "" : a).length, String(b === undefined || b === null ? "" : b).length, 1) * sz * 0.62 + 16;
  return (
    <g>
      {a !== "" && a !== null && a !== undefined && (
        <text x={x} y={y - sz * 0.24} textAnchor="middle" fontSize={sz} fontWeight={700} fill={ink}>{a}</text>)}
      <rect x={x - w / 2} y={y - 2} width={w} height={4} rx={2} fill={ink} />
      {b !== "" && b !== null && b !== undefined && (
        <text x={x} y={y + sz * 0.92} textAnchor="middle" fontSize={sz} fontWeight={700} fill={ink}>{b}</text>)}
    </g>
  );
}

const cnPt = (cx: number, cy: number, r: number, a: number) => [cx + r * Math.cos((a * Math.PI) / 180), cy + r * Math.sin((a * Math.PI) / 180)];
/* a slice of a round whole, from angle a0 to a1 (degrees, 0 = right, growing downwards) */
const cnSlice = (cx: number, cy: number, r: number, a0: number, a1: number) => {
  const p0 = cnPt(cx, cy, r, a0), p1 = cnPt(cx, cy, r, a1);
  return "M " + cx + " " + cy + " L " + p0[0] + " " + p0[1] + " A " + r + " " + r + " 0 " + (a1 - a0 > 180 ? 1 : 0) + " 1 " + p1[0] + " " + p1[1] + " Z";
};
/* the pieces of a sheet, left to right, in the sheet's own units */
const cnPieces = (sh: any) => {
  const tot = sh.units.reduce((a: number, b: number) => a + b, 0);
  let x = sh.x;
  return sh.units.map((u: number, i: number) => { const w = (sh.w * u) / tot; const r = { i, x, w, y: sh.y, h: sh.h }; x += w; return r; });
};
const cnFresh = () => ({ n: 1, taken: [], tb: null, touched: false, lane: null, trays: {}, lifted: null, cut: [], on: [], whole: "bar", fcut: false, fp: 9 });

/* ── the working area: 1086 x 528, origin at its top-left ────────────────────────────────────
   Countable things use CONTENT colours (url(#gHundred|gTen|gOne|gBead|gPointer)); coloured numerals
   and words use a deeper ink, shade(colour, 0.25), so they read at 4.5:1. Type uses T.* only.
   Pieces: drag = useDrag(onDrop) then {...control(id, label), ...drag.bind(pay), ...drag.keys(pay)};
   taps = <Hit id x y w h onPress label />. One <Invite/> marks the one thing to touch.
   Nothing is written here that the voice already says. `wrong` = { value, tries } after a miss:
   lock, redraw the mathematics in steps (the traceback), unlock; never mark it, never reset it.
   stage === "free" is Free play (the plan's writeup.freePlay): no target, every control unlocked. */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const busy = tl.busy;
  const free = stage === "free";
  const it: any = item || {};
  const kind = free ? "free" : it.kind || "";
  const key = free ? "free" : n + ":" + index;
  const SRef = useRef<any>({});
  const [, bump] = useState(0);
  const s: any = SRef.current[key] || cnFresh();
  const put = (p: any) => {
    const cur = SRef.current[key] || cnFresh();
    const add = typeof p === "function" ? p(cur) : p;
    const next: any = { ...SRef.current }; next[key] = { ...cur, ...add };
    SRef.current = next;
    bump((x: number) => x + 1);
  };
  const tbPut = (p: any) => put((cur: any) => ({ tb: { ...(cur.tb || {}), ...p } }));
  const live = stage === "ask" || stage === "teach" || free;

  const INK = C.ink, TAKEN = shade(CONTENT.hundred, 0.25), COPY = shade(CONTENT.bead, 0.3), CUT = CONTENT.line;

  /* a fresh mount of the phase (restart, Play again, a jump) starts the mat empty */
  useEffect(() => { if (stage === "teach") { SRef.current = {}; tl.stop(); bump((x: number) => x + 1); } }, [stage, n]);
  useEffect(() => { tl.stop(); api.lock(false); }, [key]);

  /* ── what the traceback (and, faster, the win) redraws ── */
  const steps = (sp: number, win?: boolean) => {
    const S: any[] = [];
    const wait = (ms: number, fn: any) => S.push([Math.max(20, Math.round(ms * sp)), fn]);
    if (kind === "cut") {
      const nn = it.cutN, kk = it.take;
      wait(260, () => tbPut({ all: 0, take: 0, den: false, num: false, lab: false }));
      for (let i = 1; i <= nn; i++) { const j = i; wait(170, () => tbPut({ all: j })); }
      wait(320, () => tbPut({ den: true }));
      for (let i = 1; i <= kk; i++) { const j = i; wait(200, () => tbPut({ take: j })); }
      wait(320, () => tbPut({ num: true }));
      wait(260, () => tbPut({ lab: true }));
    } else if (kind === "which") {
      const kk = it.frac[0];
      wait(260, () => tbPut({ take: 0, ring: false, lab: false }));
      for (let i = 1; i <= kk; i++) { const j = i; wait(200, () => tbPut({ take: j })); }
      wait(320, () => tbPut({ ring: true }));
      wait(400, () => tbPut({ lab: true }));
      wait(260, () => tbPut({ chip: true }));
    } else if (kind === "equal") {
      wait(300, () => tbPut({ k: 1 }));
      wait(700, () => tbPut({ k: 2 }));
      wait(700, () => tbPut({ k: 3 }));
      wait(700, () => tbPut({ k: 4 }));
    } else if (kind === "sort") {
      wait(300, () => tbPut({ tests: true, card: -1, lit: null, tags: {} }));
      (it.cards || []).forEach((c: any, i: number) => {
        wait(360, () => tbPut({ card: i, lit: null }));
        (it.trays || []).filter((t: string) => cnPass(c, t, it.cards)).forEach((t: string) => {
          wait(320, () => put((cur: any) => {
            const tb = cur.tb || {}, tags = { ...(tb.tags || {}) };
            tags[i] = (tags[i] || []).concat([t]);
            return { tb: { ...tb, card: i, lit: t, tags } };
          }));
        });
        wait(160, () => tbPut({ lit: null }));
      });
      wait(200, () => tbPut({ card: -1, lit: null }));
    } else if (kind === "halves") {
      const h = s.cut.length ? s.cut[0] : 1;
      wait(300, () => put((cur: any) => ({ cut: [h], tb: { ...(cur.tb || {}), cutHalf: h, lay: 0, whole: -1, names: false } })));
      if (!win) {
        /* the two small pieces cover the half exactly, then four of them fill the whole circle */
        wait(560, () => tbPut({ lay: 1 }));
        wait(560, () => tbPut({ lay: 2 }));
        wait(500, () => tbPut({ whole: 0 }));
        for (let i = 1; i <= 4; i++) { const j = i; wait(420, () => tbPut({ whole: j })); }
      }
      wait(win ? 700 : 360, () => tbPut({ names: true }));
    } else if (kind === "field") {
      wait(320, () => tbPut({ on: [], row: 0 }));
      wait(520, () => tbPut({ on: [0] }));
      wait(520, () => put((cur: any) => ({ on: [0, 1], tb: { ...(cur.tb || {}), on: [0, 1] } })));
      wait(520, () => tbPut({ row: 1 }));
      wait(420, () => tbPut({ row: 2 }));
    } else if (kind === "three") {
      wait(300, () => tbPut({ cut: [], count: 0, total: false }));
      for (let i = 0; i < it.halves; i++) { const j = i; wait(420, () => put((cur: any) => ({ cut: [0, 1, 2].slice(0, j + 1), tb: { ...(cur.tb || {}), cut: [0, 1, 2].slice(0, j + 1) } }))); }
      for (let i = 1; i <= it.halves * 2; i++) { const j = i; wait(260, () => tbPut({ count: j })); }
      wait(320, () => tbPut({ total: true }));
    }
    return S;
  };

  /* the traceback: lock, redraw the maths, end on the whole right answer, unlock */
  useEffect(() => {
    if (!wrong || stage !== "ask" || !item) return;
    api.lock(true);
    put({ lane: null, lifted: null, tb: {} });
    tl.run(steps(1), () => api.lock(false));
  }, [wrong]);
  /* the win: the same maths, quicker, so the picture and the writing are read together */
  useEffect(() => {
    if (stage !== "win" || !item) return;
    put({ lane: null, lifted: null, tb: {}, trays: kind === "sort" ? cnAnswerTrays() : s.trays });
    tl.run(steps(0.45, true));
  }, [stage]);

  function cnAnswerTrays() {
    const r = cnRead(it.answer), out: any = {};
    (it.trays || []).forEach((t: string) => {
      out[t] = (r[t] ? r[t].split(" ") : []).map((cs: string) => (it.cards || []).map(cnCard).indexOf(cs)).filter((i: number) => i >= 0);
    });
    return out;
  }

  /* ── the child's hands ──
     A correction is drawn on a layer of its own (tb). Where that layer covers pieces the child's own
     taps toggle, the child's next act clears it, so no tap of theirs is ever undone by the correction;
     where the correction cuts a piece (one way only), it is written into the child's own state. */
  const clears = kind === "which" || kind === "equal" || kind === "field";
  const touch = () => put((cur: any) => ({ touched: true, tb: clears ? null : cur.tb }));
  const setCut = (v: number, max: number) => { if (busy) return; touch(); put({ n: Math.max(1, Math.min(max, v)), taken: [] }); api.sfx.tick(); };
  const takePart = (i: number) => {
    if (busy || !live) return;
    touch();
    put((cur: any) => ({ taken: cur.taken.indexOf(i) >= 0 ? cur.taken.filter((k: number) => k !== i) : cur.taken.concat([i]) }));
    api.sfx.tick();
  };
  const dial = free ? CN_FREE.dial : CN_DIAL;
  const nFromX = (x: number, o: any) => Math.max(1, Math.min(o.max, Math.round(((x - o.x0) / (o.x1 - o.x0)) * (o.max - 1)) + 1));
  const kxOf = (v: number, o: any) => o.x0 + ((v - 1) / (o.max - 1)) * (o.x1 - o.x0);

  const drag = useDrag((p: any, pt: any, moved: boolean) => {
    if (busy || !live) return;
    if (p.t === "knob") { setCut(moved ? nFromX(pt.x, dial) : (s.n % dial.max) + 1, dial.max); return; }
    if (p.t === "fcut") { touch(); put({ fp: moved ? Math.max(1, Math.min(CN_FREE.cut - 1, Math.round((pt.x - CN_FREE.bar.x) / (CN_FREE.bar.w / CN_FREE.cut)))) : (s.fp % (CN_FREE.cut - 1)) + 1 }); api.sfx.tick(); return; }
    if (p.t === "piece") {
      touch();
      const all: any[] = [];
      (it.sheets || []).forEach((sh: any, si: number) => cnPieces(sh).forEach((pc: any) => all.push({ si, pc })));
      let to: any = null;
      if (moved) to = all.filter((q: any) => !(q.si === p.s && q.pc.i === p.i))
        .filter((q: any) => pt.x >= q.pc.x && pt.x <= q.pc.x + q.pc.w && pt.y >= q.pc.y - 20 && pt.y <= q.pc.y + q.pc.h + 20)[0];
      else {
        const mine = all.filter((q: any) => q.si === p.s);
        to = mine[(p.i + 1) % mine.length];
      }
      if (to) { put({ lane: { s: p.s, i: p.i, ts: to.si, ti: to.pc.i } }); api.sfx.tick(); }
      return;
    }
    if (p.t === "card") {
      touch();
      if (!moved) { put((cur: any) => ({ lifted: cur.lifted === p.i ? null : p.i })); return; }
      const t = trayAt(pt);
      if (t) { addTo(t, p.i); api.sfx.tick(); }
      return;
    }
    if (p.t === "q") {
      touch();
      const inHalf = pt.x >= CN_FIELD.x - 30 && pt.x <= CN_FIELD.x + CN_FIELD.s + 30 && pt.y >= CN_FIELD.y - 30 && pt.y <= CN_FIELD.y + CN_FIELD.s * 2 + 30;
      const home = s.on.indexOf(p.i) >= 0;
      if (!moved || (inHalf && !home) || (!inHalf && home)) {
        put((cur: any) => ({ on: cur.on.indexOf(p.i) >= 0 ? cur.on.filter((k: number) => k !== p.i) : cur.on.concat([p.i]) }));
        api.sfx.tick();
      }
      return;
    }
  });
  const dragging = drag.drag;

  /* the shelf */
  const trayRects = () => {
    const m = (it.trays || []).length, tot = m * CN_SORT.tw + (m - 1) * CN_SORT.tgap, x0 = (W.w - tot) / 2;
    return (it.trays || []).map((t: string, j: number) => ({ t, x: x0 + j * (CN_SORT.tw + CN_SORT.tgap), y: CN_SORT.ty, w: CN_SORT.tw, h: CN_SORT.th }));
  };
  const trayAt = (pt: any) => { const r = trayRects().filter((q: any) => pt.x >= q.x && pt.x <= q.x + q.w && pt.y >= q.y - 24 && pt.y <= q.y + q.h)[0]; return r ? r.t : null; };
  const addTo = (t: string, i: number) => put((cur: any) => {
    const trays = { ...(cur.trays || {}) };
    trays[t] = (trays[t] || []).indexOf(i) >= 0 ? trays[t] : (trays[t] || []).concat([i]);
    return { trays };
  });
  const dropFrom = (t: string, i: number) => put((cur: any) => {
    const trays = { ...(cur.trays || {}) };
    trays[t] = (trays[t] || []).filter((k: number) => k !== i);
    return { trays };
  });
  const cardsIn = (t: string) => ((s.trays || {})[t] || []).slice().sort((a: number, b: number) => {
    const A = it.cards[a], B = it.cards[b];
    return A[1] - B[1] || A[0] - B[0];    /* cards sharing a lower number stand shoulder to shoulder */
  });

  /* Enter, while the shelf owns the answer */
  const enterFn = kind === "sort" ? () => {
    const cur = SRef.current[key] || cnFresh();
    const any = Object.keys(cur.trays || {}).some((t: string) => (cur.trays[t] || []).length > 0);
    if (!any || tl.busy) return;
    api.submit(cnEnc(it, cur.trays));
  } : null;
  api.onEnter(enterFn);
  HOOK.set = (v: any) => {
    const r = cnRead(v), trays: any = {};
    (it.trays || []).forEach((t: string) => {
      trays[t] = (r[t] ? r[t].split(" ") : []).map((cs: string) => (it.cards || []).map(cnCard).indexOf(cs)).filter((i: number) => i >= 0);
    });
    put({ trays, touched: true });
    return true;
  };
  HOOK.check = () => undefined;

  /* what the host and the agent read back (toolApi.getState) */
  const tp = it.parts ? slotPartsOf(typed, 2) : ["", ""];
  api.share({ whole: kind === "cut" ? "bar" : kind === "which" ? "things" : kind === "sort" ? "cards" : free ? s.whole : "circle",
    cuts: kind === "cut" || free ? s.n : 0, evenCuts: !(free && s.fcut), taken: (s.taken || []).length,
    numerator: tp[0], denominator: tp[1],
    sorted: Object.keys(s.trays || {}).reduce((a: number, t: string) => a + (s.trays[t] || []).length, 0),
    complete: stage === "idle" });

  /* ── pictures ── */
  const tb = s.tb;

  const barOf = (o: any) => (
    <g>
      <defs><clipPath id={"cn-clip-" + o.id}><rect x={o.x} y={o.y} width={o.w} height={o.h} rx={RAD.piece} /></clipPath></defs>
      <g clipPath={"url(#cn-clip-" + o.id + ")"}>
        {Array.from({ length: o.n }).map((_: any, i: number) => (
          <rect key={i} x={o.x + (i * o.w) / o.n} y={o.y} width={o.w / o.n} height={o.h} fill={o.taken(i) ? "url(#gHundred)" : "url(#gTen)"} />
        ))}
      </g>
      {Array.from({ length: Math.max(0, o.n - 1) }).map((_: any, i: number) => (
        <line key={i} x1={o.x + ((i + 1) * o.w) / o.n} y1={o.y} x2={o.x + ((i + 1) * o.w) / o.n} y2={o.y + o.h} stroke={CUT} strokeWidth={4} />
      ))}
      <rect x={o.x} y={o.y} width={o.w} height={o.h} rx={RAD.piece} fill="none" stroke={CUT} strokeWidth={3} />
    </g>
  );

  const cutter = (o: any, nn: number) => {
    const kx = dragging && dragging.payload && dragging.payload.t === "knob" && dragging.moved
      ? Math.max(o.x0, Math.min(o.x1, dragging.x)) : kxOf(nn, o);
    return (
      <g>
        <line x1={o.x0} y1={o.cy} x2={o.x1} y2={o.cy} stroke={C.rule} strokeWidth={6} strokeLinecap="round" />
        {Array.from({ length: o.max }).map((_: any, i: number) => (
          <line key={i} x1={kxOf(i + 1, o)} y1={o.cy - 12} x2={kxOf(i + 1, o)} y2={o.cy + 12} stroke={C.rule} strokeWidth={3} />
        ))}
        <Key id="cut-fewer" label="Fewer parts" x={o.minus} y={o.cy - 36} w={72} h={72} C={C} disabled={!live || busy} onClick={() => setCut(nn - 1, o.max)}>
          <text y={13} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={INK}>&#8722;</text>
        </Key>
        <Key id="cut-more" label="More parts" x={o.plus} y={o.cy - 36} w={72} h={72} C={C} disabled={!live || busy} onClick={() => setCut(nn + 1, o.max)}>
          <text y={13} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={INK}>+</text>
        </Key>
        <g {...control("cutter", "Cutter: " + nn + (nn === 1 ? " whole" : " parts"))} {...drag.bind({ t: "knob" })} {...drag.keys({ t: "knob" })}>
          <circle cx={kx} cy={o.cy} r={36} fill="url(#gKey)" stroke={C.accent} strokeWidth={4} filter="url(#fShadowSoft)" />
          <text x={kx} y={o.cy + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={INK}>{nn}</text>
        </g>
        <text x={kx} y={o.cy + 66 + (lang === "en" ? 0 : 8)} textAnchor="middle" fontSize={T.micro} fontWeight={500} fill={INK}>{tx(nn === 1 ? "whole" : "parts")}</text>
      </g>
    );
  };

  /* phase 1 · the bar the child cuts and takes from */
  const renderCut = () => {
    const nn = dragging && dragging.payload && dragging.payload.t === "knob" && dragging.moved ? nFromX(dragging.x, dial) : s.n;
    const preview = nn !== s.n;
    const taken = (i: number) => !preview && s.taken.indexOf(i) >= 0;
    const mw = CN_MODEL.w / it.cutN;
    return (
      <g>
        {cutter(dial, nn)}
        {barOf({ id: "bar", x: CN_BAR.x, y: CN_BAR.y, w: CN_BAR.w, h: CN_BAR.h, n: nn, taken })}
        {nn > 1 && live && !busy && Array.from({ length: nn }).map((_: any, i: number) => (
          /* "take-", never "part-": the slot's own answer boxes are part-1 and part-2 */
          <Hit key={i} id={"take-" + i} x={CN_BAR.x + (i * CN_BAR.w) / nn} y={CN_BAR.y} w={CN_BAR.w / nn} h={CN_BAR.h}
            onPress={() => takePart(i)} label={"Part " + (i + 1) + " of " + nn} />
        ))}
        {tb && (
          <g>
            {barOf({ id: "model", x: CN_MODEL.x, y: CN_MODEL.y, w: CN_MODEL.w, h: CN_MODEL.h, n: it.cutN, taken: (i: number) => i < (tb.take || 0) })}
            {Array.from({ length: tb.all || 0 }).map((_: any, i: number) => (
              <text key={i} x={CN_MODEL.x + (i + 0.5) * mw} y={CN_MODEL.y - 14} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={INK}>{i + 1}</text>
            ))}
            {Array.from({ length: tb.take || 0 }).map((_: any, i: number) => (
              <text key={i} x={CN_MODEL.x + (i + 0.5) * mw} y={CN_MODEL.y + CN_MODEL.h + 36} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={TAKEN}>{i + 1}</text>
            ))}
            <CnFrac x={CN_MODEL.fx} y={CN_MODEL.fy} a={tb.num ? it.take : ""} b={tb.den ? it.cutN : ""} size={T.xl} ink={INK} />
            {tb.lab && <text x={CN_MODEL.lx} y={CN_MODEL.fy - 12} fontSize={T.micro} fontWeight={600} fill={TAKEN}>{tx("taken")}</text>}
            {tb.lab && <text x={CN_MODEL.lx} y={CN_MODEL.fy + 52} fontSize={T.micro} fontWeight={600} fill={INK}>{tx("parts")}</text>}
          </g>
        )}
      </g>
    );
  };

  /* phase 1 · the same fraction over a group of separate things */
  const renderWhich = () => {
    const total = it.frac[1];
    const takenAt = (i: number) => (tb ? i < (tb.take || 0) : s.taken.indexOf(i) >= 0);
    return (
      <g>
        {Array.from({ length: total }).map((_: any, i: number) => (
          <Disc key={i} x={CN_COLL.x + 40 + i * CN_COLL.step} y={CN_COLL.cy} r={CN_COLL.r} paint={takenAt(i) ? "gHundred" : "gTen"} />
        ))}
        {live && !busy && Array.from({ length: total }).map((_: any, i: number) => (
          <Hit key={i} id={"thing-" + i} x={CN_COLL.x + i * CN_COLL.step} y={CN_COLL.y} w={CN_COLL.step} h={100}
            onPress={() => takePart(i)} label={"Counter " + (i + 1) + " of " + total} />
        ))}
        {tb && Array.from({ length: tb.take || 0 }).map((_: any, i: number) => (
          <text key={i} x={CN_COLL.x + 40 + i * CN_COLL.step} y={CN_COLL.cy + 74} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={TAKEN}>{i + 1}</text>
        ))}
        <CnFrac x={CN_COLL.fx} y={CN_COLL.fy} a={it.frac[0]} b={it.frac[1]} size={T.display} ink={INK} />
        {tb && tb.ring && <circle cx={CN_COLL.fx} cy={CN_COLL.fy - 42} r={48} fill="none" stroke={C.accent} strokeWidth={4} />}
        {tb && tb.lab && <text x={CN_COLL.lx} y={CN_COLL.fy - 28} fontSize={T.micro} fontWeight={600} fill={TAKEN}>{tx("taken")}</text>}
        {tb && tb.lab && <text x={CN_COLL.lx} y={CN_COLL.fy + 66} fontSize={T.micro} fontWeight={600} fill={INK}>{tx("in all")}</text>}
        {tb && tb.chip && (
          <g>
            <rect x={CN_COLL.fx - 110} y={CN_COLL.fy + 120} width={220} height={60} rx={16} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={2} />
            <text x={CN_COLL.fx} y={CN_COLL.fy + 160} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={INK}>{tx("7, on top")}</text>
          </g>
        )}
      </g>
    );
  };

  /* phase 2 · pieces that are laid on one another to see whether they match */
  const laidCopy = (x: number, y: number, w: number, h: number, k: string) => (
    <g key={k}>
      <rect x={x} y={y} width={w} height={h} rx={RAD.piece} fill={CONTENT.bead} fillOpacity={0.62} stroke={CUT} strokeWidth={3} strokeDasharray="10 8" />
    </g>
  );
  const renderEqual = () => {
    const sheets = it.sheets, lane = s.lane;
    const pieceOf = (si: number, i: number) => cnPieces(sheets[si])[i];
    const rows: any[] = [];
    if (tb) {
      if (it.way === "strip") {
        const sh = sheets[0], small = pieceOf(0, 0).w, long = pieceOf(0, 1).w;
        if ((tb.k || 0) >= 1) rows.push(
          <g key="q">
            {barOf({ id: "q", x: sh.x, y: 250, w: sh.w, h: 70, n: 4, taken: () => false })}
            <CnFrac x={sh.x + (sh.w * 3) / 8} y={285} a={1} b={4} size={T.micro} ink={INK} />
          </g>);
        if ((tb.k || 0) >= 2) rows.push(laidCopy(sh.x, 258, small, 54, "q2"));
        if ((tb.k || 0) >= 3) rows.push(
          <g key="f">
            {barOf({ id: "f", x: sh.x, y: 350, w: sh.w, h: 70, n: 5, taken: () => false })}
            {laidCopy(sh.x + small, 358, long, 54, "f2")}
          </g>);
        if ((tb.k || 0) >= 4) rows.push(
          <g key="f3">
            <CnFrac x={sh.x + sh.w / 10} y={385} a={1} b={5} size={T.micro} ink={INK} />
            <rect x={W.w / 2 - 90} y={440} width={180} height={60} rx={16} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={2} />
            <text x={W.w / 2} y={480} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={INK}>{tx("No")}</text>
          </g>);
      } else if (it.way === "cake") {
        const sh = sheets[0], six = sh.w / 6, ps = cnPieces(sh);
        const small = ps.slice().sort((a: any, b: any) => a.w - b.w)[0].w, big = ps.slice().sort((a: any, b: any) => b.w - a.w)[0].w;
        if ((tb.k || 0) >= 1) rows.push(
          <g key="s">
            {barOf({ id: "six", x: sh.x, y: 280, w: sh.w, h: 70, n: 6, taken: () => false })}
            <CnFrac x={sh.x + six / 2} y={315} a={1} b={6} size={T.micro} ink={INK} />
          </g>);
        if ((tb.k || 0) >= 2) rows.push(laidCopy(sh.x + six, 288, small, 54, "s2"));
        if ((tb.k || 0) >= 3) rows.push(laidCopy(sh.x + six * 3, 288, big, 54, "s3"));
        if ((tb.k || 0) >= 4) rows.push(
          <g key="s4">
            <rect x={W.w / 2 - 90} y={400} width={180} height={60} rx={16} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={2} />
            <text x={W.w / 2} y={440} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={INK}>{tx("No")}</text>
          </g>);
      } else {
        const A = sheets[0], B = sheets[1], a0 = pieceOf(0, 0), a1 = pieceOf(0, 1), b0 = pieceOf(1, 0), b1 = pieceOf(1, 1);
        if ((tb.k || 0) >= 1) rows.push(<rect key="a0" x={A.x} y={320} width={a0.w} height={70} rx={RAD.piece} fill="url(#gTen)" stroke={CUT} strokeWidth={3} />);
        if ((tb.k || 0) >= 2) rows.push(laidCopy(A.x, 328, a1.w, 54, "a1"));
        if ((tb.k || 0) >= 3) rows.push(
          <g key="b">
            <rect x={B.x} y={320} width={b0.w} height={70} rx={RAD.piece} fill="url(#gTen)" stroke={CUT} strokeWidth={3} />
            {laidCopy(B.x, 328, b1.w, 54, "b1")}
          </g>);
        if ((tb.k || 0) >= 4) rows.push(
          <g key="b4">
            {cnPieces(B).map((p: any) => <CnFrac key={p.i} x={p.x + p.w / 2} y={B.y + B.h / 2} a={1} b={4} size={T.micro} ink={INK} />)}
            <rect x={B.x + B.w / 2 - 90} y={420} width={180} height={60} rx={16} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={2} />
            <text x={B.x + B.w / 2} y={460} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={INK}>B</text>
          </g>);
      }
    }
    return (
      <g>
        {sheets.map((sh: any, si: number) => (
          <g key={si}>
            {sheets.length > 1 && <text x={sh.x + sh.w / 2} y={sh.y - 20} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={INK}>{sh.id}</text>}
            {cnPieces(sh).map((p: any) => {
              const ringed = lane && ((lane.s === si && lane.i === p.i) || (lane.ts === si && lane.ti === p.i));
              return (
                <g key={p.i} {...control("piece-" + si + "-" + p.i, "Piece " + (p.i + 1) + " of " + sh.units.length + (sheets.length > 1 ? ", sheet " + sh.id : ""))}
                  {...drag.bind({ t: "piece", s: si, i: p.i })} {...drag.keys({ t: "piece", s: si, i: p.i })}>
                  <rect x={p.x} y={p.y} width={p.w} height={p.h} fill="url(#gTen)" stroke={ringed ? C.accent : CUT} strokeWidth={ringed ? 5 : 3} />
                </g>
              );
            })}
          </g>
        ))}
        {!tb && lane && (
          <g>
            <rect x={sheets[lane.ts].x} y={CN_LANE.y} width={pieceOf(lane.ts, lane.ti).w} height={CN_LANE.h} rx={RAD.piece} fill="url(#gTen)" stroke={CUT} strokeWidth={3} />
            {laidCopy(sheets[lane.ts].x, CN_LANE.y + 10, pieceOf(lane.s, lane.i).w, CN_LANE.h - 20, "lane")}
          </g>
        )}
        {rows}
      </g>
    );
  };

  /* phase 3 · the shelf of trays and the stack of written fractions */
  const renderSort = () => {
    const cards = it.cards, m = cards.length;
    const tot = m * CN_SORT.cw + (m - 1) * CN_SORT.gap, sx = (W.w - tot) / 2;
    const cardX = (i: number) => sx + i * (CN_SORT.cw + CN_SORT.gap);
    const TEST: Record<string, string> = { proper: "top < bottom", improper: "top ≥ bottom", like: "same bottom", unlike: "bottom alone", unit: "top is 1" };
    return (
      <g>
        {cards.map((c: any, i: number) => {
          const lifted = s.lifted === i, ring = tb && tb.card === i;
          const x = cardX(i), y = CN_SORT.cy - (lifted ? 6 : 0);
          return (
            <g key={i}>
              <g {...control("card-" + i, "Card " + c[0] + " over " + c[1])} {...drag.bind({ t: "card", i })} {...drag.keys({ t: "card", i })}>
                <rect x={x} y={y} width={CN_SORT.cw} height={CN_SORT.ch} rx={14} fill="#FFFFFF"
                  stroke={lifted || ring ? C.accent : C.rule} strokeWidth={lifted || ring ? 4 : 2} filter="url(#fShadowSoft)" />
                <CnFrac x={x + CN_SORT.cw / 2} y={y + CN_SORT.ch / 2} a={c[0]} b={c[1]} size={T.prompt} ink={INK} />
              </g>
              {tb && (tb.tags || {})[i] && (tb.tags || {})[i].map((t: string, j: number) => (
                <text key={j} x={x + CN_SORT.cw / 2} y={CN_SORT.tagY + j * 32} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={INK}>{tx(t)}</text>
              ))}
            </g>
          );
        })}
        {trayRects().map((q: any) => {
          const lit = tb && tb.lit === q.t;
          const inside = cardsIn(q.t);
          return (
            <g key={q.t}>
              <rect x={q.x} y={q.y} width={q.w} height={q.h} rx={18} fill={tint(C.panel, 0.45)} stroke={lit ? C.accent : C.rule} strokeWidth={lit ? 5 : 2} />
              <text x={q.x + q.w / 2} y={q.y + 34} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={INK} pointerEvents="none">{tx(q.t)}</text>
              {tb && tb.tests && <text x={q.x + q.w / 2} y={q.y + 64} textAnchor="middle" fontSize={T.micro} fontWeight={500} fill={INK} pointerEvents="none">{tx(TEST[q.t])}</text>}
              {/* the tray's own tap target goes on top of its name, or the name swallows the tap */}
              <Hit id={"tray-" + q.t} x={q.x} y={q.y} w={q.w} h={CN_SORT.band} label={"Tray " + q.t}
                onPress={() => { if (busy || !live) return; touch(); if (s.lifted !== null && s.lifted !== undefined) { addTo(q.t, s.lifted); api.sfx.tick(); } }} />
              {inside.map((ci: number, j: number) => {
                const cx = q.x + (q.w - (2 * CN_SORT.sw + 12)) / 2 + (j % 2) * (CN_SORT.sw + 12), cy = q.y + 82 + Math.floor(j / 2) * (CN_SORT.sh + 10);
                return (
                  <g key={ci}>
                    <rect x={cx} y={cy} width={CN_SORT.sw} height={CN_SORT.sh} rx={10} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
                    <CnFrac x={cx + CN_SORT.sw / 2} y={cy + CN_SORT.sh / 2} a={it.cards[ci][0]} b={it.cards[ci][1]} size={T.label} ink={INK} />
                    {live && !busy && <Hit id={"out-" + q.t + "-" + ci} x={cx} y={cy} w={CN_SORT.sw} h={CN_SORT.sh}
                      onPress={() => { if (busy) return; touch(); dropFrom(q.t, ci); api.sfx.tick(); }} label={"Take " + it.cards[ci][0] + " over " + it.cards[ci][1] + " out of " + q.t} />}
                  </g>
                );
              })}
            </g>
          );
        })}
      </g>
    );
  };

  /* phase 4 · one flatbread, cut in half and cut again */
  const renderHalves = () => {
    const cutH = tb && tb.cutHalf !== undefined ? tb.cutHalf : (s.cut.length ? s.cut[0] : -1);
    const closed = tb && tb.names;
    const o = CN_ML4;
    const off = (mid: number, d: number) => cnPt(0, 0, d, mid);
    const halves = [{ h: 0, a0: 90, a1: 270, mid: 180 }, { h: 1, a0: -90, a1: 90, mid: 0 }];
    const parts: any[] = [];
    halves.forEach((H: any) => {
      const gap = closed ? 0 : o.gap;
      if (H.h === cutH) {
        const q = H.h === 0 ? [{ a0: 90, a1: 180, mid: 135 }, { a0: 180, a1: 270, mid: 225 }] : [{ a0: -90, a1: 0, mid: -45 }, { a0: 0, a1: 90, mid: 45 }];
        q.forEach((Q: any, j: number) => {
          const d = off(H.mid, gap), e = off(Q.mid, closed ? 0 : 6);
          parts.push({ key: "q" + H.h + j, a0: Q.a0, a1: Q.a1, dx: d[0] + e[0], dy: d[1] + e[1], mid: Q.mid, name: [1, 4], small: true });
        });
      } else {
        const d = off(H.mid, gap);
        parts.push({ key: "h" + H.h, a0: H.a0, a1: H.a1, dx: d[0], dy: d[1], mid: H.mid, name: [1, 2], small: false });
      }
    });
    const ref = tb && (tb.lay || tb.whole >= 0);
    const other = cutH === 0 ? { a0: -90, a1: 90, q: [{ a0: -90, a1: 0, mid: -45 }, { a0: 0, a1: 90, mid: 45 }] } : { a0: 90, a1: 270, q: [{ a0: 90, a1: 180, mid: 135 }, { a0: 180, a1: 270, mid: 225 }] };
    const allQ = [{ a0: -90, a1: 0, mid: -45 }, { a0: 0, a1: 90, mid: 45 }, { a0: 90, a1: 180, mid: 135 }, { a0: 180, a1: 270, mid: 225 }];
    return (
      <g>
        {parts.map((p: any) => (
          <g key={p.key}>
            <path d={cnSlice(o.cx + p.dx, o.cy + p.dy, o.r, p.a0, p.a1)} fill="url(#gTen)" stroke={CUT} strokeWidth={3} />
            {(!p.small || closed) && (() => { const c = cnPt(o.cx + p.dx, o.cy + p.dy, o.r * (p.small ? 0.58 : 0.5), p.mid);
              return <CnFrac x={c[0]} y={c[1]} a={p.name[0]} b={p.name[1]} size={T.label} ink={INK} />; })()}
          </g>
        ))}
        {live && !busy && cutH < 0 && halves.map((H: any) => (
          <Hit key={H.h} id={"half-" + H.h} x={H.h === 0 ? o.cx - o.gap - o.r : o.cx + o.gap} y={o.cy - o.r} w={o.r} h={o.r * 2}
            onPress={() => { if (busy) return; touch(); put({ cut: [H.h] }); api.sfx.tick(); }} label={"Cut this half in two"} />
        ))}
        {ref && (tb.whole === undefined || tb.whole < 0) && (
          <g>
            <path d={cnSlice(o.rx, o.cy, o.r, other.a0, other.a1)} fill="url(#gTen)" stroke={CUT} strokeWidth={3} />
            {other.q.slice(0, tb.lay || 0).map((Q: any, j: number) => (
              <path key={j} d={cnSlice(o.rx, o.cy, o.r, Q.a0, Q.a1)} fill={CONTENT.bead} fillOpacity={0.62} stroke={CUT} strokeWidth={3} strokeDasharray="10 8" />
            ))}
          </g>
        )}
        {ref && tb.whole >= 0 && (
          <g>
            {allQ.slice(0, tb.whole).map((Q: any, j: number) => (
              <g key={j}>
                <path d={cnSlice(o.rx, o.cy, o.r, Q.a0, Q.a1)} fill={CONTENT.bead} fillOpacity={0.5} stroke={CUT} strokeWidth={3} />
                {(() => { const c = cnPt(o.rx, o.cy, o.r * 0.58, Q.mid); return <text x={c[0]} y={c[1] + 10} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={INK}>{j + 1}</text>; })()}
              </g>
            ))}
            {/* the green ring says this is one whole: it stays on top of the pieces laid into it */}
            <circle cx={o.rx} cy={o.cy} r={o.r} fill="none" stroke={CONTENT.one} strokeWidth={5} strokeDasharray="14 10" />
          </g>
        )}
        {closed && (
          <g>
            {[[1, 2], [1, 4], [1, 4]].map((f: any, j: number) => (
              <g key={j}>
                <CnFrac x={o.cx - 118 + j * 100} y={o.row} a={f[0]} b={f[1]} size={T.label} ink={INK} />
                {j < 2 && <text x={o.cx - 68 + j * 100} y={o.row + 12} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={INK}>+</text>}
              </g>
            ))}
            <text x={o.cx + 132} y={o.row + 12} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={INK}>=</text>
            <text x={o.cx + 182} y={o.row + 12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(CONTENT.one, 0.25)}>1</text>
          </g>
        )}
      </g>
    );
  };

  /* phase 4 · the field: two quarters slide onto the half they came from */
  const renderField = () => {
    const o = CN_FIELD, on = tb && tb.on ? tb.on : s.on;
    const slotOf = (i: number) => on.indexOf(i);
    const homes = [{ x: o.hx, y: o.y - 6 }, { x: o.hx, y: o.y + o.s + 6 }];
    return (
      <g>
        <rect x={o.x} y={o.y} width={o.s} height={o.s * 2} rx={RAD.piece} fill="url(#gTen)" stroke={CUT} strokeWidth={3} />
        {[0, 1].map((i: number) => {
          /* laid on the half, a piece is inset a little, so the half it covers still shows around it */
          const j = slotOf(i), pad = j >= 0 ? 9 : 0;
          const at = j >= 0 ? { x: o.x, y: o.y + j * o.s } : homes[i];
          return (
            <g key={i} {...control("quarter-" + i, "Small piece " + (i + 1))} {...drag.bind({ t: "q", i })} {...drag.keys({ t: "q", i })}>
              <rect x={at.x + pad} y={at.y + pad} width={o.s - pad * 2} height={o.s - pad * 2} rx={RAD.piece}
                fill={j >= 0 ? tint(CONTENT.ten, 0.42) : "url(#gTen)"} stroke={CUT} strokeWidth={3} filter={j >= 0 ? "url(#fLift)" : "url(#fShadowSoft)"} />
              <CnFrac x={at.x + o.s / 2} y={at.y + o.s / 2} a={1} b={4} size={T.label} ink={INK} />
            </g>
          );
        })}
        {tb && (tb.row || 0) >= 1 && (
          <g>
            <CnFrac x={o.rx - 150} y={o.ry} a={1} b={4} size={T.xl} ink={INK} />
            <text x={o.rx - 90} y={o.ry + 18} textAnchor="middle" fontSize={T.xl} fontWeight={600} fill={INK}>+</text>
            <CnFrac x={o.rx - 30} y={o.ry} a={1} b={4} size={T.xl} ink={INK} />
          </g>
        )}
        {tb && (tb.row || 0) >= 2 && (
          <g>
            <text x={o.rx + 30} y={o.ry + 18} textAnchor="middle" fontSize={T.xl} fontWeight={600} fill={INK}>=</text>
            <CnFrac x={o.rx + 96} y={o.ry} a={1} b={2} size={T.xl} ink={INK} />
          </g>
        )}
      </g>
    );
  };

  /* phase 4 · three halves, each cut again */
  const renderThree = () => {
    const o = CN_THREE, cut = tb && tb.cut ? tb.cut : s.cut;
    const count = tb ? (tb.count || 0) : 0;
    return (
      <g>
        {o.cxs.slice(0, it.halves).map((cx: number, i: number) => {
          const isCut = cut.indexOf(i) >= 0;
          return (
            <g key={i}>
              {!isCut && (
                <g>
                  <path d={cnSlice(cx, o.base, o.r, 180, 360)} fill="url(#gTen)" stroke={CUT} strokeWidth={3} />
                  <CnFrac x={cx} y={o.base - 56} a={1} b={2} size={T.label} ink={INK} />
                </g>
              )}
              {isCut && [0, 1].map((k: number) => {
                const dx = k === 0 ? -6 : 6;
                return (
                  <g key={k}>
                    <path d={cnSlice(cx + dx, o.base, o.r, k === 0 ? 180 : 270, k === 0 ? 270 : 360)} fill="url(#gTen)" stroke={CUT} strokeWidth={3} />
                    <CnFrac x={cx + dx + (k === 0 ? -52 : 52)} y={o.base - 52} a={1} b={4} size={T.micro} ink={INK} />
                    {count > i * 2 + k && <text x={cx + dx + (k === 0 ? -52 : 52)} y={o.base + 46} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={TAKEN}>{i * 2 + k + 1}</text>}
                  </g>
                );
              })}
              {live && !busy && !isCut && (
                <Hit id={"cut-half-" + i} x={cx - o.r} y={o.base - o.r} w={o.r * 2} h={o.r} onPress={() => { if (busy) return; touch(); put((cur: any) => ({ cut: cur.cut.concat([i]) })); api.sfx.tick(); }} label={"Cut half " + (i + 1) + " in two"} />
              )}
            </g>
          );
        })}
        {tb && tb.total && <text x={W.w / 2} y={o.ty} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={INK}>{tx("6 quarters")}</text>}
      </g>
    );
  };

  /* Free play: any whole, any number of cuts, and a free cut line to slide */
  const renderFree = () => {
    const nn = dragging && dragging.payload && dragging.payload.t === "knob" && dragging.moved ? nFromX(dragging.x, dial) : s.n;
    const o = CN_FREE, bar = o.bar;
    const unit = bar.w / o.cut;
    const fp = dragging && dragging.payload && dragging.payload.t === "fcut" && dragging.moved
      ? Math.max(1, Math.min(o.cut - 1, Math.round((dragging.x - bar.x) / unit))) : s.fp;
    const equal = fp === o.cut / 2;
    const takenAt = (i: number) => s.taken.indexOf(i) >= 0;
    const kinds = [["proper", s.taken.length < nn && s.taken.length > 0], ["improper", s.taken.length >= nn && nn > 1], ["unit", s.taken.length === 1]];
    return (
      <g>
        {[["bar", "bar"], ["circle", "circle"], ["things", "things"]].map((k: any, j: number) => (
          <Key key={k[0]} id={"whole-" + k[0]} label={"Whole: " + k[1]} x={j * 162} y={0} w={150} h={72} C={C} primary={s.whole === k[0]}
            onClick={() => put({ whole: k[0], taken: [], fcut: false })}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={s.whole === k[0] ? "#FFFFFF" : INK}>{tx(k[1])}</text>
          </Key>
        ))}
        <Key id="free-cut" label="Free cut line" x={520} y={0} w={190} h={72} C={C} primary={s.fcut} disabled={s.whole !== "bar"}
          onClick={() => put({ fcut: !s.fcut, taken: [] })}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={s.fcut ? "#FFFFFF" : INK}>{tx("free cut")}</text>
        </Key>
        {!s.fcut && cutter(dial, nn)}
        {s.whole === "bar" && !s.fcut && barOf({ id: "fbar", x: bar.x, y: bar.y, w: bar.w, h: bar.h, n: nn, taken: takenAt })}
        {s.whole === "bar" && !s.fcut && nn > 1 && Array.from({ length: nn }).map((_: any, i: number) => (
          <Hit key={i} id={"fpart-" + i} x={bar.x + (i * bar.w) / nn} y={bar.y} w={bar.w / nn} h={bar.h} onPress={() => takePart(i)} label={"Part " + (i + 1) + " of " + nn} />
        ))}
        {s.whole === "bar" && s.fcut && (
          <g>
            <rect x={bar.x} y={bar.y} width={fp * unit} height={bar.h} rx={RAD.piece} fill="url(#gTen)" stroke={CUT} strokeWidth={3} />
            <rect x={bar.x + fp * unit} y={bar.y} width={bar.w - fp * unit} height={bar.h} rx={RAD.piece} fill="url(#gTen)" stroke={CUT} strokeWidth={3} />
            <text x={bar.x + (fp * unit) / 2} y={bar.y + bar.h + 46} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={INK}>{fp + " " + tx("cm")}</text>
            <text x={bar.x + fp * unit + (bar.w - fp * unit) / 2} y={bar.y + bar.h + 46} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={INK}>{(o.cut - fp) + " " + tx("cm")}</text>
            {equal && <CnFrac x={bar.x + (fp * unit) / 2} y={bar.y + bar.h / 2} a={1} b={2} size={T.label} ink={INK} />}
            {equal && <CnFrac x={bar.x + fp * unit + (bar.w - fp * unit) / 2} y={bar.y + bar.h / 2} a={1} b={2} size={T.label} ink={INK} />}
            {!equal && <text x={o.out.x} y={o.out.y} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={INK}>{tx("no name")}</text>}
            <g {...control("free-line", "Free cut line")} {...drag.bind({ t: "fcut" })} {...drag.keys({ t: "fcut" })}>
              <rect x={bar.x + fp * unit - 36} y={bar.y - 10} width={72} height={bar.h + 80} fill="transparent" />
              <line x1={bar.x + fp * unit} y1={bar.y} x2={bar.x + fp * unit} y2={bar.y + bar.h} stroke={CUT} strokeWidth={6} />
              <circle cx={bar.x + fp * unit} cy={bar.y + bar.h + 24} r={22} fill="url(#gKey)" stroke={C.accent} strokeWidth={4} />
            </g>
          </g>
        )}
        {s.whole === "things" && Array.from({ length: nn }).map((_: any, i: number) => (
          <Disc key={i} x={o.things.x + 36 + i * o.things.step} y={o.things.cy} r={o.things.r} paint={takenAt(i) ? "gHundred" : "gTen"} />
        ))}
        {s.whole === "things" && Array.from({ length: nn }).map((_: any, i: number) => (
          <Hit key={i} id={"fthing-" + i} x={o.things.x + i * o.things.step} y={o.things.cy - 50} w={o.things.step} h={100} onPress={() => takePart(i)} label={"Thing " + (i + 1)} />
        ))}
        {s.whole === "circle" && (
          <g>
            <circle cx={o.circle.cx} cy={o.circle.cy} r={o.circle.r} fill="url(#gTen)" stroke={CUT} strokeWidth={3} />
            {Array.from({ length: nn }).map((_: any, i: number) => (
              takenAt(i) ? <path key={i} d={cnSlice(o.circle.cx, o.circle.cy, o.circle.r, -90 + (i * 360) / nn, -90 + ((i + 1) * 360) / nn)} fill="url(#gHundred)" stroke={CUT} strokeWidth={3} /> : null
            ))}
            {Array.from({ length: Math.max(0, nn - 1) }).map((_: any, i: number) => {
              const p = cnPt(o.circle.cx, o.circle.cy, o.circle.r, -90 + ((i + 1) * 360) / nn);
              return <line key={i} x1={o.circle.cx} y1={o.circle.cy} x2={p[0]} y2={p[1]} stroke={CUT} strokeWidth={4} />;
            })}
            <Hit id="take-slice" x={o.circle.cx - o.circle.r} y={o.circle.cy - o.circle.r} w={o.circle.r * 2} h={o.circle.r * 2}
              onPress={() => { if (nn < 2) return; touch(); put((cur: any) => ({ taken: cur.taken.length >= nn ? [] : cur.taken.concat([cur.taken.length]) })); api.sfx.tick(); }}
              label="Take one more part" />
          </g>
        )}
        {!s.fcut && nn > 1 && (
          <g>
            <CnFrac x={o.out.x} y={o.out.y} a={s.taken.length} b={nn} size={T.display} ink={INK} />
            {kinds.map((k: any, j: number) => (
              <g key={k[0]}>
                {k[1] && <rect x={o.out.x - 85} y={414 + j * 38} width={170} height={36} rx={12} fill={tint(C.panel, 0.4)} stroke={C.accent} strokeWidth={3} />}
                <text x={o.out.x} y={440 + j * 38 + (lang === "en" ? 0 : 2)} textAnchor="middle" fontSize={T.micro} fontWeight={k[1] ? 700 : 500} fill={k[1] ? INK : mix(INK, "#FFFFFF", 0.3)}>{tx(k[0])}</text>
              </g>
            ))}
          </g>
        )}
      </g>
    );
  };

  /* the one thing that invites a finger */
  const invitePt = () => {
    if (kind === "cut") return { x: kxOf(s.n, dial), y: dial.cy, r: 46 };
    if (kind === "which") return { x: CN_COLL.x + 40, y: CN_COLL.cy, r: 46 };
    if (kind === "equal") { const p = cnPieces(it.sheets[0])[0]; return { x: p.x + p.w / 2, y: p.y + p.h / 2, r: 46 }; }
    if (kind === "sort") { const tot = it.cards.length * CN_SORT.cw + (it.cards.length - 1) * CN_SORT.gap;
      return { x: (W.w - tot) / 2 + CN_SORT.cw / 2, y: CN_SORT.cy + CN_SORT.ch / 2, r: 68 }; }
    if (kind === "halves") return s.cut.length ? null : { x: CN_ML4.cx + CN_ML4.gap + CN_ML4.r * 0.42, y: CN_ML4.cy - CN_ML4.r * 0.42, r: 50 };
    if (kind === "field") return s.on.length ? null : { x: CN_FIELD.hx + CN_FIELD.s / 2, y: CN_FIELD.y + CN_FIELD.s / 2 - 6, r: 56 };
    if (kind === "three") return s.cut.length ? null : { x: CN_THREE.cxs[0], y: CN_THREE.base - 50, r: 50 };
    return null;
  };
  /* one invite, and none once the correction has drawn the answer */
  const inv = !s.touched && !busy && !s.tb && (stage === "ask" || stage === "teach") ? invitePt() : null;

  /* the dragged piece follows the finger */
  const flying = () => {
    const d = dragging;
    if (!d || !d.moved || !d.payload) return null;
    if (d.payload.t === "piece" && it.sheets) {
      const p = cnPieces(it.sheets[d.payload.s])[d.payload.i];
      return <rect x={d.x - p.w / 2} y={d.y - p.h / 2} width={p.w} height={p.h} rx={RAD.piece} fill={CONTENT.bead} fillOpacity={0.62} stroke={CUT} strokeWidth={3} />;
    }
    if (d.payload.t === "card" && it.cards) {
      const c = it.cards[d.payload.i];
      return (
        <g>
          <rect x={d.x - CN_SORT.cw / 2} y={d.y - CN_SORT.ch / 2} width={CN_SORT.cw} height={CN_SORT.ch} rx={14} fill="#FFFFFF" stroke={C.accent} strokeWidth={4} filter="url(#fLift)" />
          <CnFrac x={d.x} y={d.y} a={c[0]} b={c[1]} size={T.prompt} ink={INK} />
        </g>
      );
    }
    if (d.payload.t === "q") {
      return (
        <g>
          <rect x={d.x - CN_FIELD.s / 2} y={d.y - CN_FIELD.s / 2} width={CN_FIELD.s} height={CN_FIELD.s} rx={RAD.piece} fill="url(#gTen)" stroke={CUT} strokeWidth={3} filter="url(#fLift)" />
          <CnFrac x={d.x} y={d.y} a={1} b={4} size={T.label} ink={INK} />
        </g>
      );
    }
    return null;
  };

  return (
    <g>
      {free ? renderFree()
        : kind === "cut" ? renderCut()
          : kind === "which" ? renderWhich()
            : kind === "equal" ? renderEqual()
              : kind === "sort" ? renderSort()
                : kind === "halves" ? renderHalves()
                  : kind === "field" ? renderField()
                    : kind === "three" ? renderThree() : null}
      {flying()}
      {inv && <Invite x={inv.x} y={inv.y} r={inv.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ n, result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last ? result.last : null;
  if (!last || last.value === null || last.value === undefined) return null;
  const ph = PHASES[(n || 1) - 1];
  const it: any = ph && ph.items[last.item] ? ph.items[last.item] : {};
  const ink = C.ink;
  const frame = <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />;
  if (it.kind === "sort") {
    const got = cnRead(last.value), t = (it.trays || []).filter((x: string) => got[x])[0];
    const cards = t && got[t] ? got[t].split(" ").slice(0, 3) : [];
    return (
      <g>
        {frame}
        <text x={14} y={h / 2 + 9} fontSize={T.micro} fontWeight={700} fill={ink}>{tx(t || "sorted")}</text>
        {cards.map((cs: string, j: number) => (
          <CnFrac key={j} x={120 + j * 40} y={h / 2} a={cs.split("/")[0]} b={cs.split("/")[1]} size={T.micro} ink={ink} />
        ))}
      </g>
    );
  }
  if (it.choices) {
    return (
      <g>
        {frame}
        <text x={w / 2} y={h / 2 + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={ink}>{tx(CN_SAID[String(last.value)] || String(last.value))}</text>
      </g>
    );
  }
  if (it.parts) {
    const p = slotPartsOf(last.value, 2), a = Number(p[0]), b = Number(p[1]);
    const bw = 130, bx = 16, by = h / 2 - 15;
    return (
      <g>
        {frame}
        {b > 0 && b <= 20 && (
          <g>
            {Array.from({ length: b }).map((_: any, i: number) => (
              <rect key={i} x={bx + (i * bw) / b} y={by} width={bw / b} height={30} fill={i < a ? CONTENT.hundred : CONTENT.ten} stroke={CONTENT.line} strokeWidth={1.5} />
            ))}
          </g>
        )}
        <CnFrac x={w - 46} y={h / 2} a={p[0]} b={p[1]} size={T.micro} ink={ink} />
      </g>
    );
  }
  if (it.kind === "three") {
    /* the child's own answer, drawn: three halves, each cut into two quarters */
    const r = 26, base = h / 2 + 15;
    return (
      <g>
        {frame}
        {Array.from({ length: it.halves }).map((_: any, j: number) => {
          const cx = 42 + j * 62;
          return (
            <g key={j}>
              <path d={cnSlice(cx - 2, base, r, 180, 270)} fill={CONTENT.ten} stroke={CONTENT.line} strokeWidth={1.5} />
              <path d={cnSlice(cx + 2, base, r, 270, 360)} fill={CONTENT.ten} stroke={CONTENT.line} strokeWidth={1.5} />
            </g>
          );
        })}
        <text x={w - 30} y={h / 2 + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={ink}>{String(last.value)}</text>
      </g>
    );
  }
  return (
    <g>
      {frame}
      <text x={w / 2} y={h / 2 + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={ink}>{String(last.value) + (it.unit ? " " + tx(it.unit) : "")}</text>
    </g>
  );
}

function CutAndName(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, TR, fitHost: () => null }} />
  );
}

export default CutAndName;
