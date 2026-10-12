/* ═══ M2.S3.T6.C20.2D1 · point_slider · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "point_slider";
const MEDIA_ID = "M2.S3.T6.C20.2D1";
const TOOL_NAME = "Point Slider";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A fraction, a zero counter, and a point card waiting at the right hand end."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every point walked in from the right, and every filling zero standing in front of the digits.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Try a new top number, any of the three denominators, the other lane and the distance bar.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r13+: `lineFor(line, lang, TR)`); the English
   above and below stays what the checks read. NCERT class 4 terms: दशमलव / દશાંશ, दशमलव बिंदु / દશાંશ ચિહ્ન,
   दसवाँ / सौवाँ / हज़ारवाँ भाग and દશમો / સોમો / હજારમો ભાગ (a fraction is read "356 सौवें भाग", "356 સોમા ભાગ",
   as the English reads it "hundredths"), स्थान / સ્થાન for a decimal place, भिन्न अंश हर / અપૂર્ણાંક અંશ છેદ.
   Digits stay digits: the runtime speaks them in the language in use. The "lane" is the other way of
   building the row (दूसरा रास्ता / બીજો રસ્તો); the "bar" is the fraction line (रेखा / રેખા).
   A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Point Slider": "बिंदु सरकाओ",
    "A fraction, a zero counter, and a point card waiting at the right hand end.": "एक भिन्न, शून्यों की गिनती, और दाएँ सिरे पर खड़ा बिंदु कार्ड।",
    "Every point walked in from the right, and every filling zero standing in front of the digits.": "हर बिंदु दाएँ से चलकर आया। जगह भरने वाला हर शून्य अंकों के आगे बैठा।",
    "Free play. Try a new top number, any of the three denominators, the other lane and the distance bar.": "मुक्त खेल। नया अंश, कोई भी हर, दूसरा रास्ता और दूरी की पट्टी आज़माओ।",
    /* phase 1 */
    "Counting the zeros underneath": "नीचे के शून्य गिनना",
    "Count the zeros underneath. That is how many places you need.": "नीचे के शून्य गिनो। उतने ही दशमलव स्थान चाहिए।",
    "How many zeros has it got?": "उसमें कितने शून्य हैं?",
    "Cover the first digit of the bottom number, then count the zeros still showing.": "नीचे की संख्या का पहला अंक ढक दो, फिर बचे हुए शून्य गिनो।",
    "The zeros in the denominator count the decimal places, one place for each zero.": "हर के शून्य दशमलव स्थान गिनते हैं, हर शून्य के लिए एक स्थान।",
    "You learned: the zeros underneath count the decimal places.": "तुमने सीखा: नीचे के शून्य दशमलव स्थान गिनते हैं।",
    "How many decimal places does 356/100 need, and how do you know?": "356 सौवें भाग को कितने दशमलव स्थान चाहिए? तुम्हें कैसे पता?",
    "how many places?": "कितने स्थान?",
    "Look under the bar, not above it.": "रेखा के नीचे देखो, ऊपर नहीं।",
    "How many decimal places does a denominator of a thousand call for?": "जिसका हर हज़ार है, उसे कितने दशमलव स्थान चाहिए?",
    "Zeros do the counting here, not digits.": "यहाँ शून्य गिने जाते हैं, अंक नहीं।",
    "How many zeros are in the denominator of 29/10, and how many digits go after the point?": "29 दसवें भाग के हर में कितने शून्य हैं, और दशमलव बिंदु के बाद कितने अंक आते हैं?",
    "digits after the point?": "दशमलव के बाद कितने अंक?",
    "The ten underneath is short of zeros.": "नीचे के दस में शून्य कम हैं।",
    /* phase 2 */
    "Placing the point from the right": "दशमलव बिंदु दाएँ से लगाना",
    "Start at the right hand end and walk the point in. Count as you go.": "दाएँ सिरे से शुरू करो और बिंदु को अंदर सरकाओ। सरकाते हुए गिनते जाओ।",
    "Which end does the point card start from?": "बिंदु कार्ड किस सिरे से शुरू होता है?",
    "Try it with a single card over ten first, and walk the point in.": "पहले दस के ऊपर एक अंक लेकर देखो, और बिंदु को अंदर सरकाओ।",
    "The point goes in from the right hand end of the numerator, one digit for each zero underneath.": "बिंदु अंश के दाएँ सिरे से अंदर जाता है। नीचे के हर शून्य के लिए एक अंक।",
    "You learned: the point walks in from the right hand end.": "तुमने सीखा: बिंदु दाएँ सिरे से अंदर आता है।",
    "Write 617/1000 as a decimal.": "617 हज़ारवें भाग को दशमलव में लिखो।",
    "write the decimal": "दशमलव लिखो",
    "The counter is holding the number of places.": "गिनती बताती है कि कितने स्थान चाहिए।",
    "Now turn 47/10 into a decimal the same way.": "अब 47 दसवें भाग को इसी तरह दशमलव में बदलो।",
    "It walked past the count and kept going.": "बिंदु गिनती से आगे निकल गया और चलता रहा।",
    "This numerator has four digits. Turn 2358/1000 into a decimal.": "इस अंश में चार अंक हैं। 2358 हज़ारवें भाग को दशमलव में बदलो।",
    "That count started at the left hand end of the row.": "वह गिनती पंक्ति के बाएँ सिरे से शुरू हुई थी।",
    /* phase 3 */
    "When the numerator is too short": "जब अंश में अंक कम पड़ें",
    "The digits have run out. Where do the empty places sit?": "अंक खत्म हो गए। खाली स्थान कहाँ बैठते हैं?",
    "Which side of the digits are they on?": "वे अंकों की किस तरफ़ हैं?",
    "Try it with a single digit over a thousand, and fill the places it leaves.": "हज़ार के ऊपर एक अंक लेकर देखो, और जो स्थान बचें उन्हें भरो।",
    "A filling zero goes on the left of the digits, between them and the point.": "जगह भरने वाला शून्य अंकों के बाईं ओर जाता है, बिंदु के ठीक पास।",
    "You learned: a filling zero goes on the left, next to the point.": "तुमने सीखा: भरने वाला शून्य बाईं ओर, बिंदु के पास जाता है।",
    "Write 3/100 as a decimal, and say where the filling zero goes.": "3 सौवें भाग को दशमलव में लिखो। बताओ, भरने वाला शून्य कहाँ जाता है?",
    "Those zeros are hanging off the right end.": "वे शून्य दाएँ सिरे से लटक रहे हैं।",
    "Take 5/100 now. Where does its filling zero belong?": "अब 5 सौवें भाग को लो। उसका भरने वाला शून्य कहाँ लगेगा?",
    "A place next to the point is still empty.": "बिंदु के पास का एक स्थान अभी भी खाली है।",
    "Two digits, three places. Turn 72/1000 into a decimal.": "दो अंक, तीन स्थान। 72 हज़ारवें भाग को दशमलव में बदलो।",
    "A zero hung on the right makes it bigger.": "दाएँ लटका हुआ शून्य उसे बड़ा बना देता है।",
    /* phase 4 */
    "Why the side matters so much": "तरफ़ इतनी ज़रूरी क्यों है",
    "Try it the other way and see where it lands. How far apart are they?": "दूसरे तरीके से करके देखो कि वह कहाँ पहुँचता है। दोनों में कितना अंतर है?",
    "Is that bigger or smaller than the fraction asked for?": "क्या वह पूछी गई भिन्न से बड़ा है या छोटा?",
    "Run both lanes on two digits over a thousand, and watch where each one lands.": "हज़ार के ऊपर दो अंक लो और दोनों रास्ते चलाओ। देखो, हर एक कहाँ पहुँचता है।",
    "Zeros on the left make a number smaller. Zeros on the right make it bigger.": "बाईं ओर के शून्य संख्या को छोटा बनाते हैं। दाईं ओर के शून्य उसे बड़ा बनाते हैं।",
    "You learned: zeros on the right make a number bigger, not smaller.": "तुमने सीखा: दाईं ओर के शून्य संख्या को बड़ा बनाते हैं, छोटा नहीं।",
    "Run the other lane for 6/1000 and watch where its point lands. What should the answer really be?": "6 हज़ारवें भाग के लिए दूसरा रास्ता चलाओ। देखो, उसका बिंदु कहाँ पहुँचता है। सही उत्तर क्या होना चाहिए?",
    "the right answer": "सही उत्तर",
    "Count the places in what that lane finished with.": "उस रास्ते ने जो बनाया, उसके स्थान गिनो।",
    "Someone wrote 4/100 as 4.00. Run that lane and see. What is the right answer?": "किसी ने 4 सौवें भाग को 4.00 लिख दिया। वह रास्ता चलाकर देखो। सही उत्तर क्या है?",
    "Which side did that lane hang its zeros on?": "उस रास्ते ने शून्य किस तरफ़ लटकाए?",
    "Turmeric powder is sold as 5/10 of a kilogram. Write that weight as a decimal. Why does no zero go in front of the five?": "हल्दी पाउडर एक किलोग्राम के 5 दसवें भाग के रूप में बिकता है। उस वज़न को दशमलव में लिखो। पाँच के आगे शून्य क्यों नहीं लगता?",
    "The counter here is holding a single place.": "यहाँ गिनती सिर्फ़ एक स्थान की है।",
    /* the working area's own words */
    "turned": "बदले गए",
    "place": "स्थान", "places": "स्थान",
    "in from the right": "दाएँ से अंदर",
    "zeros go here": "शून्य यहाँ आते हैं",
    "zeros on the right": "दाईं ओर शून्य",
    "zeros on": "शून्य", "the right": "दाईं ओर",
    "times bigger": "गुना बड़ा", "times": "गुना", "bigger": "बड़ा",
    "new": "नया", "top": "अंश", "other": "दूसरा", "lane": "रास्ता",
    "a place per zero": "हर शून्य के लिए एक स्थान",
    "read it back": "इसे फिर से पढ़ो",
    "that lane is bigger": "वह रास्ता बड़ा है",
    "the bottom number decides": "नीचे की संख्या तय करती है",
    "only the zeros count": "सिर्फ़ शून्य गिने जाते हैं",
    "skip the first digit": "पहला अंक छोड़ दो",
    "from the left end": "बाएँ सिरे से",
    "counted from the left": "बाएँ से गिना",
    "it stopped short": "वह पहले ही रुक गया",
    "walked too far": "बहुत आगे चला गया",
    "from the right end": "दाएँ सिरे से",
    "counting": "गिनती",
    "hung on the right": "दाएँ लटके हैं",
    "empty on the left": "बाईं ओर खाली है",
    "the places run short": "स्थान कम पड़ गए",
    "a place still empty": "एक स्थान अब भी खाली",
    "an extra zero": "एक फ़ालतू शून्य",
    "just one place": "बस एक स्थान",
    "that lane finished bigger": "वह रास्ता बड़ा निकला",
    "count from the right": "दाएँ से गिनो",
  },
  gu: {
    "Point Slider": "દશાંશ ચિહ્ન સરકાવો",
    "A fraction, a zero counter, and a point card waiting at the right hand end.": "એક અપૂર્ણાંક, શૂન્યની ગણતરી, અને જમણા છેડે રાહ જોતું ચિહ્ન કાર્ડ.",
    "Every point walked in from the right, and every filling zero standing in front of the digits.": "દરેક દશાંશ ચિહ્ન જમણેથી ચાલીને આવ્યું. જગ્યા ભરનાર દરેક શૂન્ય અંકોની આગળ ઊભું રહ્યું.",
    "Free play. Try a new top number, any of the three denominators, the other lane and the distance bar.": "મુક્ત રમત. નવો અંશ, કોઈ પણ છેદ, બીજો રસ્તો અને અંતરની પટ્ટી અજમાવો.",
    /* phase 1 */
    "Counting the zeros underneath": "નીચેના શૂન્ય ગણવા",
    "Count the zeros underneath. That is how many places you need.": "નીચેના શૂન્ય ગણો. એટલાં જ દશાંશ સ્થાન જોઈએ.",
    "How many zeros has it got?": "તેમાં કેટલા શૂન્ય છે?",
    "Cover the first digit of the bottom number, then count the zeros still showing.": "નીચેની સંખ્યાનો પહેલો અંક ઢાંકી દો, પછી દેખાતા શૂન્ય ગણો.",
    "The zeros in the denominator count the decimal places, one place for each zero.": "છેદના શૂન્ય દશાંશ સ્થાન ગણે છે, દરેક શૂન્ય માટે એક સ્થાન.",
    "You learned: the zeros underneath count the decimal places.": "તમે શીખ્યા: નીચેના શૂન્ય દશાંશ સ્થાન ગણે છે.",
    "How many decimal places does 356/100 need, and how do you know?": "356 સોમા ભાગને કેટલા દશાંશ સ્થાન જોઈએ? તમે કેવી રીતે જાણો છો?",
    "how many places?": "કેટલા સ્થાન?",
    "Look under the bar, not above it.": "રેખાની નીચે જુઓ, ઉપર નહીં.",
    "How many decimal places does a denominator of a thousand call for?": "જેનો છેદ હજાર છે, તેને કેટલા દશાંશ સ્થાન જોઈએ?",
    "Zeros do the counting here, not digits.": "અહીં શૂન્ય ગણાય છે, અંક નહીં.",
    "How many zeros are in the denominator of 29/10, and how many digits go after the point?": "29 દશમા ભાગના છેદમાં કેટલા શૂન્ય છે? દશાંશ ચિહ્ન પછી કેટલા અંક આવે?",
    "digits after the point?": "દશાંશ પછી કેટલા અંક?",
    "The ten underneath is short of zeros.": "નીચેના દસમાં શૂન્ય ઓછા છે.",
    /* phase 2 */
    "Placing the point from the right": "દશાંશ ચિહ્ન જમણેથી મૂકવું",
    "Start at the right hand end and walk the point in. Count as you go.": "જમણા છેડેથી શરૂ કરો અને ચિહ્નને અંદર સરકાવો. સરકાવતાં ગણતા જાઓ.",
    "Which end does the point card start from?": "ચિહ્ન કાર્ડ કયા છેડેથી શરૂ થાય છે?",
    "Try it with a single card over ten first, and walk the point in.": "પહેલાં દસ ઉપર એક જ અંક લઈને જુઓ, અને ચિહ્નને અંદર સરકાવો.",
    "The point goes in from the right hand end of the numerator, one digit for each zero underneath.": "ચિહ્ન અંશના જમણા છેડેથી અંદર જાય છે. નીચેના દરેક શૂન્ય માટે એક અંક.",
    "You learned: the point walks in from the right hand end.": "તમે શીખ્યા: ચિહ્ન જમણા છેડેથી અંદર આવે છે.",
    "Write 617/1000 as a decimal.": "617 હજારમા ભાગને દશાંશમાં લખો.",
    "write the decimal": "દશાંશ લખો",
    "The counter is holding the number of places.": "ગણતરી બતાવે છે કે કેટલા સ્થાન જોઈએ.",
    "Now turn 47/10 into a decimal the same way.": "હવે 47 દશમા ભાગને એ જ રીતે દશાંશમાં બદલો.",
    "It walked past the count and kept going.": "ચિહ્ન ગણતરીથી આગળ નીકળી ગયું અને ચાલતું રહ્યું.",
    "This numerator has four digits. Turn 2358/1000 into a decimal.": "આ અંશમાં ચાર અંક છે. 2358 હજારમા ભાગને દશાંશમાં બદલો.",
    "That count started at the left hand end of the row.": "એ ગણતરી હરોળના ડાબા છેડેથી શરૂ થઈ હતી.",
    /* phase 3 */
    "When the numerator is too short": "જ્યારે અંશમાં અંક ઓછા પડે",
    "The digits have run out. Where do the empty places sit?": "અંક ખૂટી ગયા. ખાલી સ્થાન ક્યાં આવે છે?",
    "Which side of the digits are they on?": "તે અંકોની કઈ બાજુ છે?",
    "Try it with a single digit over a thousand, and fill the places it leaves.": "હજાર ઉપર એક અંક લઈને જુઓ, અને જે સ્થાન બચે તે ભરો.",
    "A filling zero goes on the left of the digits, between them and the point.": "જગ્યા ભરનાર શૂન્ય અંકોની ડાબી બાજુ જાય છે, ચિહ્નની ઠીક પાસે.",
    "You learned: a filling zero goes on the left, next to the point.": "તમે શીખ્યા: ભરનાર શૂન્ય ડાબી બાજુ, ચિહ્નની પાસે જાય છે.",
    "Write 3/100 as a decimal, and say where the filling zero goes.": "3 સોમા ભાગને દશાંશમાં લખો. કહો, ભરનાર શૂન્ય ક્યાં જાય છે?",
    "Those zeros are hanging off the right end.": "એ શૂન્ય જમણા છેડેથી લટકે છે.",
    "Take 5/100 now. Where does its filling zero belong?": "હવે 5 સોમા ભાગ લો. તેનું ભરનાર શૂન્ય ક્યાં આવશે?",
    "A place next to the point is still empty.": "ચિહ્નની પાસેનું એક સ્થાન હજી ખાલી છે.",
    "Two digits, three places. Turn 72/1000 into a decimal.": "બે અંક, ત્રણ સ્થાન. 72 હજારમા ભાગને દશાંશમાં બદલો.",
    "A zero hung on the right makes it bigger.": "જમણે લટકતું શૂન્ય તેને મોટું બનાવે છે.",
    /* phase 4 */
    "Why the side matters so much": "બાજુ આટલી જરૂરી કેમ છે",
    "Try it the other way and see where it lands. How far apart are they?": "બીજી રીતે કરીને જુઓ કે તે ક્યાં પહોંચે છે. બંનેમાં કેટલું અંતર છે?",
    "Is that bigger or smaller than the fraction asked for?": "શું તે પૂછેલા અપૂર્ણાંકથી મોટું છે કે નાનું?",
    "Run both lanes on two digits over a thousand, and watch where each one lands.": "હજાર ઉપર બે અંક લો અને બંને રસ્તા ચલાવો. જુઓ, દરેક ક્યાં પહોંચે છે.",
    "Zeros on the left make a number smaller. Zeros on the right make it bigger.": "ડાબી બાજુના શૂન્ય સંખ્યાને નાની બનાવે છે. જમણી બાજુના શૂન્ય તેને મોટી બનાવે છે.",
    "You learned: zeros on the right make a number bigger, not smaller.": "તમે શીખ્યા: જમણી બાજુના શૂન્ય સંખ્યાને મોટી બનાવે છે, નાની નહીં.",
    "Run the other lane for 6/1000 and watch where its point lands. What should the answer really be?": "6 હજારમા ભાગ માટે બીજો રસ્તો ચલાવો. જુઓ, તેનું ચિહ્ન ક્યાં પહોંચે છે. સાચો જવાબ શું હોવો જોઈએ?",
    "the right answer": "સાચો જવાબ",
    "Count the places in what that lane finished with.": "એ રસ્તાએ જે બનાવ્યું, તેના સ્થાન ગણો.",
    "Someone wrote 4/100 as 4.00. Run that lane and see. What is the right answer?": "કોઈએ 4 સોમા ભાગને 4.00 લખી દીધો. તે રસ્તો ચલાવીને જુઓ. સાચો જવાબ શું છે?",
    "Which side did that lane hang its zeros on?": "એ રસ્તાએ શૂન્ય કઈ બાજુ લટકાવ્યા?",
    "Turmeric powder is sold as 5/10 of a kilogram. Write that weight as a decimal. Why does no zero go in front of the five?": "હળદરનો પાઉડર એક કિલોગ્રામના 5 દશમા ભાગ તરીકે વેચાય છે. તે વજન દશાંશમાં લખો. પાંચની આગળ શૂન્ય કેમ નથી આવતું?",
    "The counter here is holding a single place.": "અહીં ગણતરી ફક્ત એક સ્થાનની છે.",
    /* the working area's own words */
    "turned": "બદલાયા",
    "place": "સ્થાન", "places": "સ્થાન",
    "in from the right": "જમણેથી અંદર",
    "zeros go here": "શૂન્ય અહીં આવે છે",
    "zeros on the right": "જમણી બાજુ શૂન્ય",
    "zeros on": "શૂન્ય", "the right": "જમણી બાજુ",
    "times bigger": "ગણું મોટું", "times": "ગણું", "bigger": "મોટું",
    "new": "નવો", "top": "અંશ", "other": "બીજો", "lane": "રસ્તો",
    "a place per zero": "દરેક શૂન્ય માટે એક સ્થાન",
    "read it back": "તેને ફરી વાંચો",
    "that lane is bigger": "તે રસ્તો મોટો છે",
    "the bottom number decides": "નીચેની સંખ્યા નક્કી કરે છે",
    "only the zeros count": "ફક્ત શૂન્ય ગણાય છે",
    "skip the first digit": "પહેલો અંક છોડી દો",
    "from the left end": "ડાબા છેડેથી",
    "counted from the left": "ડાબેથી ગણ્યું",
    "it stopped short": "તે વહેલું અટકી ગયું",
    "walked too far": "બહુ આગળ ચાલ્યું ગયું",
    "from the right end": "જમણા છેડેથી",
    "counting": "ગણતરી",
    "hung on the right": "જમણે લટકે છે",
    "empty on the left": "ડાબી બાજુ ખાલી છે",
    "the places run short": "સ્થાન ઓછા પડ્યા",
    "a place still empty": "એક સ્થાન હજી ખાલી",
    "an extra zero": "એક વધારાનું શૂન્ય",
    "just one place": "બસ એક સ્થાન",
    "that lane finished bigger": "તે રસ્તો મોટો નીકળ્યો",
    "count from the right": "જમણેથી ગણો",
  },
};

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   items   three a phase; qid = the plan's question id. This tool's own item fields:
           kind  count | point | fill | lane   (Work, the win motion, the traceback and oracle switch on it)
           num   the numerator as a string of digits ("" = the numerator is not given)
           den   the denominator (10, 100 or 1000) — written with NO comma, as the book writes it,
                 because the child counts its zeros
           rival the wrong answer this question's misconception really produces (nearMiss)
           rivalPath which correction runs, so the picture answers THIS child's error and not a
                 general re-teach: top | digits | walk | left | right-side | no-fill | over-fill | lane */
const PHASES = [
  {
    n: 1,
    concept: "Counting the zeros underneath",
    conceptId: "M2.S3.T6.C20", objectiveIds: ["O9"],
    says: ["Count the zeros underneath. That is how many places you need."],
    ladder: ["How many zeros has it got?", "Cover the first digit of the bottom number, then count the zeros still showing."],
    closing: "The zeros in the denominator count the decimal places, one place for each zero.",
    learned: "You learned: the zeros underneath count the decimal places.",
    traceback: "Counted the top number (ML1): the numerator drops to its outline, the bar thickens and the counter walks down to the denominator before it counts. Counted the digits underneath (1, 2): each zero lights in turn with the leading digit left plain. Both end on that many empty places drawn to the right of a point.",
    items: [
      /* learn ML1: answer in the plan = Two decimal places, because the hundred underneath has two zeros, and the decimal is 3.56.
         356/100 makes 3 reachable two ways; its miss line names the top/bottom mix-up, so rival 3 here is
         "counted the numerator's digits" and the traceback walks the counter down from the top number. */
      { qid: "M2.S3.T6.C20:ML1", kind: "count", rivalPath: "top", num: "356", den: 100, say: "How many decimal places does 356/100 need, and how do you know?", ask: "how many places?", answer: 2, rival: 3, miss: "Look under the bar, not above it." },
      /* practice 1: answer in the plan = Three, one for each zero in the thousand (rival 4 = the digits of a thousand) */
      { qid: "M2.S3.T6.C20:1", kind: "count", rivalPath: "digits", num: "", den: 1000, say: "How many decimal places does a denominator of a thousand call for?", ask: "how many places?", answer: 3, rival: 4, miss: "Zeros do the counting here, not digits." },
      /* practice 2: answer in the plan = One zero, so one digit goes after the point (rival 2 = the digits of ten) */
      { qid: "M2.S3.T6.C20:2", kind: "count", rivalPath: "digits", num: "29", den: 10, say: "How many zeros are in the denominator of 29/10, and how many digits go after the point?", ask: "digits after the point?", answer: 1, rival: 2, miss: "The ten underneath is short of zeros." },
    ],
  },
  {
    n: 2,
    concept: "Placing the point from the right",
    conceptId: "M2.S3.T6.C21", objectiveIds: ["O9"],
    says: ["Start at the right hand end and walk the point in. Count as you go."],
    ladder: ["Which end does the point card start from?", "Try it with a single card over ten first, and walk the point in."],
    closing: "The point goes in from the right hand end of the numerator, one digit for each zero underneath.",
    learned: "You learned: the point walks in from the right hand end.",
    traceback: "Stopped short or walked past (ML2, 3): the point card goes back to the right hand end and walks in one card at a time until the counter is met. Counted from the left (4): that walk is drawn first and the same row is then walked from the right. Both end on the finished decimal.",
    items: [
      /* learn ML2: answer in the plan = 0.617 (rival 6.17 = the point dropped after the first digit) */
      { qid: "M2.S3.T6.C21:ML2", kind: "point", rivalPath: "walk", num: "617", den: 1000, say: "Write 617/1000 as a decimal.", ask: "write the decimal", answer: "0.617", rival: "6.17", miss: "The counter is holding the number of places." },
      /* practice 3: answer in the plan = 4.7 (rival 0.47 = the card walked past the count) */
      { qid: "M2.S3.T6.C21:3", kind: "point", rivalPath: "walk", num: "47", den: 10, say: "Now turn 47/10 into a decimal the same way.", ask: "write the decimal", answer: "4.7", rival: "0.47", miss: "It walked past the count and kept going." },
      /* practice 4: answer in the plan = 2.358 (rival 235.8 = counted in from the left hand end) */
      { qid: "M2.S3.T6.C21:4", kind: "point", rivalPath: "left", num: "2358", den: 1000, say: "This numerator has four digits. Turn 2358/1000 into a decimal.", ask: "write the decimal", answer: "2.358", rival: "235.8", miss: "That count started at the left hand end of the row." },
    ],
  },
  {
    n: 3,
    concept: "When the numerator is too short",
    conceptId: "M2.S3.T6.C22", objectiveIds: ["O10"],
    says: ["The digits have run out. Where do the empty places sit?"],
    ladder: ["Which side of the digits are they on?", "Try it with a single digit over a thousand, and fill the places it leaves."],
    closing: "A filling zero goes on the left of the digits, between them and the point.",
    learned: "You learned: a filling zero goes on the left, next to the point.",
    traceback: "Zeros hung on the right (ML3, 6): the row is read as the number it has become, then the empty places light between the point and the digits and grey zeros walk into them. Nothing filled at all (5): the place nearest the point is lit and counted against the counter. Both end on the finished decimal.",
    items: [
      /* learn ML3: answer in the plan = 0.03, with the zero placed in front of the three (rival 0.30 = hung on the right) */
      { qid: "M2.S3.T6.C22:ML3", kind: "fill", rivalPath: "right-side", num: "3", den: 100, say: "Write 3/100 as a decimal, and say where the filling zero goes.", ask: "write the decimal", answer: "0.03", rival: "0.30", miss: "Those zeros are hanging off the right end." },
      /* practice 5: answer in the plan = 0.05, and the zero goes on the left, in front of the five
         (rival 0.5 = the point dropped with nothing filled at all) */
      { qid: "M2.S3.T6.C22:5", kind: "fill", rivalPath: "no-fill", num: "5", den: 100, say: "Take 5/100 now. Where does its filling zero belong?", ask: "write the decimal", answer: "0.05", rival: "0.5", miss: "A place next to the point is still empty." },
      /* practice 6: answer in the plan = 0.072 (rival 0.720 = the zero hung on the right) */
      { qid: "M2.S3.T6.C22:6", kind: "fill", rivalPath: "right-side", num: "72", den: 1000, say: "Two digits, three places. Turn 72/1000 into a decimal.", ask: "write the decimal", answer: "0.072", rival: "0.720", miss: "A zero hung on the right makes it bigger." },
    ],
  },
  {
    n: 4,
    concept: "Why the side matters so much",
    conceptId: "M2.S3.T6.C23", objectiveIds: ["O10"],
    says: ["Try it the other way and see where it lands. How far apart are they?"],
    ladder: ["Is that bigger or smaller than the fraction asked for?", "Run both lanes on two digits over a thousand, and watch where each one lands."],
    closing: "Zeros on the left make a number smaller. Zeros on the right make it bigger.",
    learned: "You learned: zeros on the right make a number bigger, not smaller.",
    traceback: "Took the other lane's answer (ML4, 7): that lane is run to its finish, the distance bar writes how many times apart the two are, and the counted lane is built beside it. Padded when nothing needed padding (8): the counter is read against the row and the zero nobody asked for comes out. Both end on the finished decimal.",
    items: [
      /* learn ML4: answer in the plan = They get 6, which is a thousand times too big. The answer is 0.006 */
      { qid: "M2.S3.T6.C23:ML4", kind: "lane", rivalPath: "lane", num: "6", den: 1000, say: "Run the other lane for 6/1000 and watch where its point lands. What should the answer really be?", ask: "the right answer", answer: "0.006", rival: "6", miss: "Count the places in what that lane finished with." },
      /* practice 7: answer in the plan = It is a hundred times too big. The right answer is 0.04, with one zero placed in front of the four */
      { qid: "M2.S3.T6.C23:7", kind: "lane", rivalPath: "lane", num: "4", den: 100, say: "Someone wrote 4/100 as 4.00. Run that lane and see. What is the right answer?", ask: "the right answer", answer: "0.04", rival: "4.00", miss: "Which side did that lane hang its zeros on?" },
      /* practice 8: answer in the plan = 0.5 kg, because only one decimal place is wanted and the five fills it on its own */
      /* the rival here is the OPPOSITE error (a padding zero nobody asked for), so it gets its own
         correction: the lane picture would say "bigger", which is false for this one */
      { qid: "M2.S3.T6.C23:8", kind: "lane", rivalPath: "over-fill", num: "5", den: 10, say: "Turmeric powder is sold as 5/10 of a kilogram. Write that weight as a decimal. Why does no zero go in front of the five?", ask: "the right answer", answer: "0.5", rival: "0.05", miss: "The counter here is holding a single place." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  denominators: [10, 100, 1000],
  fillingZerosGo: "left of the digits, between them and the point",
  card: { digit: 96, point: 60, height: 116, gap: 8 },
  freeNumerators: ["4", "36", "7", "250", "9"],
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a decimal answer is a string in its written form, compared exactly ("0.30" is not "0.03");
   a count is compared as a number */
const judge = (item: any, v: any) => {
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim() === String(item.answer);
};
/* oracle: plain arithmetic, a second route that touches neither judge's strings nor the picture:
   numerator ÷ denominator, and the written form must carry exactly as many places as the denominator
   has zeros, with a digit in front of the point */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const places = Math.round(Math.log(it.den) / Math.log(10));
  if (Math.pow(10, places) !== it.den) return false;
  if (it.kind === "count") return it.answer === places;
  const exact = Number(it.num) / it.den;
  const s = String(it.answer), dot = s.indexOf(".");
  if (dot < 1 || s.length - dot - 1 !== places) return false;
  return Math.abs(Number(s) - exact) < 1e-12;
}));
/* the most likely wrong answer (this question's own misconception); judge must reject it */
const nearMiss = (item: any) => item.rival;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (typeof item.answer === "number"
  ? [String(item.answer), indian(item.answer), words(item.answer)]
  : [String(item.answer), speakable(String(item.answer))]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => T.submit(item.answer);
/* the agent types a decimal: the runtime's own path would strip the point, so the tool sets it */
const answer = (item: any, v: any) => {
  if (!HOOK.type) return undefined;
  HOOK.type(String(v ?? ""));
  return true;
};
/* the agent's check() before Enter: nothing waits on the working area, so Enter answers */
const check = () => undefined;

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────── */

const PS_CSS = `
.ps-grab{cursor:grab}
.ps-tap{cursor:pointer}
`;

/* the chapter's content colours: a digit left of the point is deep blue, right of it deep green,
   the point itself vermilion, a zero only holding a place open grey, a lit thing amber */
const PS_BLUE = shade(CONTENT.hundred, 0.25);
const PS_GREEN = shade(CONTENT.one, 0.25);
const PS_RED = CONTENT.pointer;
const PS_AMBER = CONTENT.ten;
const PS_AMBER_INK = shade(CONTENT.ten, 0.55);  /* amber ink has to go this deep to read on lit amber */
const PS_GREY = "#6E6E6E";

const PS_GEO = {
  /* phase 1 has one idea and nothing else, so the fraction is drawn big and the whole group is
     composed across the area (fraction left, counter and the places it finds right) rather than
     pinned into the top-left corner */
  fracL: { x: 40, y: 140, w: 480, h: 244 },
  frac: { x: 0, y: 4, w: 300, h: 164 },
  fracS: { x: 0, y: 0, w: 262, h: 128 },   /* phase 4: two lanes need the room */
  cntL: { x: 600, y: 150, w: 320, h: 104 },
  cnt: { x: 336, y: 26, w: 224, h: 76 },
  cntS: { x: 296, y: 18, w: 210, h: 72 },
  row: { y: 196, cw: 104, pw: 60, h: 128, gap: 8 },
  tray: { x: 373, y: 340, w: 340, h: 84 },
  laneA: { y: 146, h: 98 },
  laneB: { y: 256, h: 98 },
  bar: { y: 364, h: 50 },
  bench: { y: 436, h: 88 },
  /* free play's keys: three denominators, then two word keys wide enough for two lines ("new top",
     "other lane"); the last one ends at 1068, clear of the 1086 edge */
  keys: { x: 572, y: 20, w: 84, h: 72, pitch: 92, ww: 104, wx: 852, wpitch: 112 },
  /* free play with the other lane on: the row and the tray lift this much so the lane strip
     (bench height) sits inside the area with room under it */
  lift: 25,
};

const psZeros = (d: number) => String(d).length - 1;

/* the cards of a row, left to right: the whole part (or a single place-holding zero), the point,
   then the places after it — the empty ones first, because they are the ones nearest the point */
const psCells = (digits: string, pointAt: number, filled: string[]) => {
  const nd = digits.length, out: any[] = [];
  /* the zero in front is written every time there are digits; with no numerator yet (phase 1) the row
     is only the point and the empty places it has counted out */
  if (pointAt >= nd && nd > 0) out.push({ k: "lead", ch: "0" });
  else for (let i = 0; i < nd - pointAt; i++) out.push({ k: "whole", ch: digits[i] });
  out.push({ k: "point" });
  if (pointAt > nd) {
    for (let i = 0; i < pointAt - nd; i++) out.push({ k: "slot", s: i, ch: filled[i] || "" });
    for (let i = 0; i < nd; i++) out.push({ k: "frac", ch: digits[i] });
  } else for (let i = nd - pointAt; i < nd; i++) out.push({ k: "frac", ch: digits[i] });
  return out;
};
const psLay = (cells: any[], cw: number, pw: number, gap: number, cx: number) => {
  const total = cells.reduce((s: number, c: any) => s + (c.k === "point" ? pw : cw), 0) + gap * Math.max(0, cells.length - 1);
  let x = cx - total / 2;
  return cells.map((c: any) => { const w = c.k === "point" ? pw : cw; const o = { ...c, x, w }; x += w + gap; return o; });
};
const psPointX = (digits: string, pointAt: number, filled: string[], cw: number, pw: number, gap: number, cx: number) => {
  const laid = psLay(psCells(digits, pointAt, filled), cw, pw, gap, cx);
  const p = laid.find((c: any) => c.k === "point");
  return p ? p.x + p.w / 2 : cx;
};
/* where a written decimal put the point on this numerator: the places after it, or null when the
   answer is not these digits with a point in them ("6.17" on 617 -> 2, "0.47" on 47 -> 2) */
const psStopAt = (digits: string, v: any) => {
  const s = String(v ?? "").trim(), dot = s.indexOf(".");
  const whole = dot < 0 ? s : s.slice(0, dot), frac = dot < 0 ? "" : s.slice(dot + 1);
  if (!/^\d*$/.test(whole) || !/^\d*$/.test(frac) || !digits) return null;
  if ((whole + frac).replace(/^0+/, "") !== digits.replace(/^0+/, "")) return null;
  return frac.length;
};
const psFillAt = (filled: string[], i: number) => { const f = filled.slice(); f[i] = "0"; return f; };
const psZerosArr = (n: number) => Array.from({ length: Math.max(0, n) }, () => "0");

function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";

  const [den, setDen] = useState<number>(item.den || 100);
  const [num, setNum] = useState<string>(item.num || "");
  const [counted, setCounted] = useState(0);
  const [tapped, setTapped] = useState<number[]>([]);   /* phase 1: which zeros of the denominator are counted */
  const [pointAt, setPointAt] = useState(0);
  const [filled, setFilled] = useState<string[]>([]);
  const [laneStep, setLaneStep] = useState(0);
  const [refuse, setRefuse] = useState(false);
  const [touched, setTouched] = useState(false);
  const [tb, setTb] = useState<any>(null);          /* the correction's own layer: never the child's pieces */
  const [laneOn, setLaneOn] = useState(false);      /* free play: the other lane */
  const [freeAt, setFreeAt] = useState(0);
  const [laneHint, setLaneHint] = useState(false);   /* free play: a few seconds of pulse on the lane's bar */
  const setupFor = useRef(-9);
  const busy = tl.busy;

  const numRef = useRef(num); numRef.current = num;
  const denRef = useRef(den); denRef.current = den;
  const pointRef = useRef(pointAt); pointRef.current = pointAt;
  const fillRef = useRef(filled); fillRef.current = filled;
  const countRef = useRef(counted); countRef.current = counted;
  const tapRef = useRef(tapped); tapRef.current = tapped;
  const laneRef = useRef(laneStep); laneRef.current = laneStep;

  const zeros = psZeros(den);
  const kind = free ? "free" : item.kind;
  const four = kind === "lane";
  /* phase 1 gives the fraction the top of the screen, so its places row sits lower; free play with
     the other lane on lifts the row and the tray to make room for the lane strip */
  const lift = free && laneOn ? PS_GEO.lift : 0;
  const R = four ? { cw: 72, pw: 48, h: 88, gap: 8, y: PS_GEO.laneA.y + 5 }
    : { cw: PS_GEO.row.cw, pw: PS_GEO.row.pw, h: PS_GEO.row.h, gap: PS_GEO.row.gap, y: kind === "count" ? 290 : PS_GEO.row.y - lift };
  const trayY = PS_GEO.tray.y - lift;
  /* the other lane's strip: phase 4 keeps its own lane band; free play puts it under the tray at the
     bench's height, with small cards left of centre so the distance bar has the right end */
  const laneY = free ? PS_GEO.bench.y - lift : PS_GEO.laneB.y;
  const laneH = free ? PS_GEO.bench.h : PS_GEO.laneB.h;
  const LR = free ? { cw: 72, pw: 48, gap: 8, cx: 520, h: 76 } : { cw: R.cw, pw: R.pw, gap: R.gap, cx: W.w / 2, h: 88 };
  /* phase 1's places sit under the counter that found them, not in the middle of the area */
  const ROWX = kind === "count" ? 760 : W.w / 2;
  const CX = W.w / 2;
  const maxAt = Math.max(zeros, num.length);

  const reset = (it: any) => {
    tl.stop();
    const d = it.den || 100, z = psZeros(d);
    setDen(d); denRef.current = d;
    setNum(it.num || ""); numRef.current = it.num || "";
    const c = it.kind === "count" ? 0 : z; setCounted(c); countRef.current = c;
    setTapped([]); tapRef.current = [];
    const p = it.kind === "fill" ? z : 0; setPointAt(p); pointRef.current = p;
    setFilled([]); fillRef.current = [];
    setLaneStep(0); laneRef.current = 0;
    setRefuse(false); setTouched(false); setTb(null);
    api.lock(false);
  };

  useEffect(() => {
    if (stage === "ask" && setupFor.current !== index) { setupFor.current = index; reset(item); }
  }, [stage, index]);

  /* free play (the plan's freePlay): any numerator, any of the three denominators, the other lane
     and the distance bar; nothing to get right */
  useEffect(() => {
    if (!free) return;
    setupFor.current = -2;
    reset({ kind: "fill", num: MODEL.freeNumerators[0], den: 100 });
    setFreeAt(0); setLaneOn(false);
  }, [free]);

  /* free play: switching the other lane on pulses its empty bar for a few seconds (a plain timer, never
     the timeline, which would lock the working area while it ran) */
  useEffect(() => {
    if (!free || !laneOn) { setLaneHint(false); return; }
    setLaneHint(true);
    const id = setTimeout(() => setLaneHint(false), 4000);
    return () => clearTimeout(id);
  }, [free, laneOn]);

  /* the child's next act takes the correction's layer away, so nothing it drew can be undone by mistake */
  const act = () => { setTb(null); setTouched(true); };

  const canPlay = (free || stage === "ask") && !busy;
  /* each zero counts once: a tap on an uncounted zero lights it and adds one place; a tap on a lit
     zero takes it back out (so a slip can be undone), and a zero can never be counted twice */
  const tapZero = (i: number) => {
    if (!canPlay || (kind !== "count" && !free)) return;
    if (i < 1 || i > psZeros(denRef.current)) return;
    act();
    const was = tapRef.current, on = was.includes(i);
    const next = on ? was.filter((k) => k !== i) : was.concat(i);
    setTapped(next); tapRef.current = next;
    setCounted(next.length); countRef.current = next.length;
    if (!on) api.sfx.tick();
  };

  const pointLive = () => canPlay && (kind === "point" || kind === "fill" || free);
  const movePoint = (p: any, moved: boolean) => {
    if (!pointLive()) return;
    act();
    const d = numRef.current, mx = Math.max(psZeros(denRef.current), d.length);
    let next: number;
    if (!moved || !isFinite(p.x)) next = (pointRef.current + 1) % (mx + 1);
    else {
      next = 0;
      let best = 1e9;
      for (let k = 0; k <= mx; k++) {
        const x = psPointX(d, k, fillRef.current, R.cw, R.pw, R.gap, CX), gap = Math.abs(x - p.x);
        if (gap < best) { best = gap; next = k; }
      }
    }
    setPointAt(next); pointRef.current = next;
    const keep = fillRef.current.slice(0, Math.max(0, next - d.length));
    setFilled(keep); fillRef.current = keep;
    api.sfx.tick();
  };

  const fillLive = () => canPlay && (kind === "fill" || free);
  const dropZero = (p: any, moved: boolean) => {
    if (!fillLive()) return;
    act();
    const laid = psLay(psCells(numRef.current, pointRef.current, fillRef.current), R.cw, R.pw, R.gap, CX);
    const last = laid[laid.length - 1];
    const slots = laid.filter((c: any) => c.k === "slot");
    const open = slots.findIndex((c: any) => !c.ch);
    /* a zero let go past the right hand end of the digits is refused and springs back: nothing is
       marked, the empty places on the left light again and the arrow is redrawn running inward */
    if (moved && isFinite(p.x) && p.x > last.x + last.w - 10) {
      setRefuse(true);
      tl.run([[900, () => setRefuse(false)]]);
      return;
    }
    if (open < 0) return;
    const f = psFillAt(fillRef.current, open);
    setFilled(f); fillRef.current = f;
    api.sfx.tick();
  };

  const laneLive = () => canPlay && (kind === "lane" || (free && laneOn)) && laneRef.current === 0;
  const runLane = () => {
    if (!laneLive()) return;
    act();
    api.lock(true);
    tl.run([[520, () => { setLaneStep(1); laneRef.current = 1; api.sfx.tick(); }],
      [760, () => { setLaneStep(2); laneRef.current = 2; api.sfx.tick(); }], [320, () => {}]], () => api.lock(false));
  };

  const drag = useDrag((payload: any, p: any, moved: boolean) => {
    if (payload.src === "point") movePoint(p, moved);
    else dropZero(p, moved);
  });

  /* Enter answers what is typed; nothing waits on the working area */
  api.onEnter(null);
  HOOK.type = (v: any) => api.setTyped(String(v ?? ""));

  /* ── the win: the maths finishes itself and the decimal is read back ── */
  useEffect(() => {
    if (stage !== "win") return;
    const d = numRef.current, z = psZeros(denRef.current), S: any[] = [];
    const ns = Math.max(0, z - d.length);
    if (kind === "count") {
      /* the zeros the child has not counted yet light one by one, left to right */
      for (let i = 1; i <= z; i++) if (!tapRef.current.includes(i)) { const v = i; S.push([380, () => { const t = tapRef.current.concat(v); setTapped(t); tapRef.current = t; setCounted(t.length); countRef.current = t.length; api.sfx.tick(); }]); }
      S.push([420, () => setTb({ row: { digits: "", pointAt: z, filled: [] }, note: "a place per zero", ans: z + " " + tx(z === 1 ? "place" : "places") })]);
    } else if (kind === "point" || kind === "fill") {
      let k = pointRef.current;
      while (k !== z) { k += z > k ? 1 : -1; const v = k; S.push([340, () => { setPointAt(v); pointRef.current = v; api.sfx.tick(); }]); }
      for (let i = 0; i < ns; i++) { const v = i; S.push([340, () => { const f = psFillAt(fillRef.current, v); setFilled(f); fillRef.current = f; api.sfx.tick(); }]); }
      S.push([420, () => setTb({ note: "read it back", ans: String(item.answer) })]);
    } else {
      if (laneRef.current === 0) { S.push([300, () => { setLaneStep(1); laneRef.current = 1; }]); S.push([460, () => { setLaneStep(2); laneRef.current = 2; api.sfx.tick(); }]); }
      let k = pointRef.current;
      while (k !== z) { k += z > k ? 1 : -1; const v = k; S.push([320, () => { setPointAt(v); pointRef.current = v; api.sfx.tick(); }]); }
      for (let i = 0; i < ns; i++) { const v = i; S.push([320, () => { const f = psFillAt(fillRef.current, v); setFilled(f); fillRef.current = f; api.sfx.tick(); }]); }
      S.push([420, () => setTb({ note: "that lane is bigger", gap: indian(denRef.current) + " " + tx("times bigger"), ans: String(item.answer) })]);
    }
    tl.run(S);
  }, [stage]);

  /* ── the traceback: the maths redrawn on its own layer, ending on the whole right answer.
        It branches on the item's OWN misconception (rivalPath), because a correction has to show
        why THIS child's error goes wrong, not just re-teach the right method. Phases 1, 3 and 4 draw on
        the demo layer (tb), which clears on the child's next act, never in the zeros the child counts or
        places. Phase 2 walks the child's point card itself: the answer is judged from the typed slot
        only, so the card standing at the count takes nothing from the child. The layer takes no taps. ── */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    setTouched(true);   /* the opening pulse is the only invitation: it does not come back after a miss */
    const d = item.num || "", z = psZeros(item.den), ns = Math.max(0, z - d.length);
    const done = String(item.answer);
    const fillSteps = (S: any[]) => { for (let i = 0; i < ns; i++) { const v = i; S.push([560, () => setTb((t: any) => ({ ...t, row: { digits: d, pointAt: z, filled: psFillAt(t.row.filled, v) } }))]); } };
    const S: any[] = [];
    /* phase 1: the correction counts on the demo layer (tb.lit lights the zeros and fills the counter
       chip), never in the child's own toggles: it clears on the child's next act, and the child's own
       taps are then exactly as they left them. The child's own count stays written in the slot. */
    /* phase 2: the correction walks the big point card itself. That is safe because the answer is
       judged from the typed slot only, never from where the card stands; the card is left at the count. */
    const put = (v: number) => { setPointAt(v); pointRef.current = v; const f = psZerosArr(v - d.length); setFilled(f); fillRef.current = f; };
    if (item.rivalPath === "top") {
      /* counted the top number: the numerator goes back to its outline, the bar thickens and the
         counter walks down to the denominator before it counts anything */
      S.push([360, () => setTb({ dim: true, lit: 0, note: "the bottom number decides" })]);
      for (let i = 0; i < z; i++) { const v = i + 1; S.push([520, () => setTb((t: any) => ({ ...t, lit: v }))]); }
      S.push([520, () => setTb((t: any) => ({ ...t, dim: false, row: { digits: "", pointAt: z, filled: [] }, note: "only the zeros count" }))]);
      S.push([480, () => setTb((t: any) => ({ ...t, ans: z + " " + tx(z === 1 ? "place" : "places") }))]);
    } else if (item.rivalPath === "digits") {
      /* counted the digits underneath: each zero lights in turn and the first digit stays plain */
      S.push([380, () => setTb({ lit: 0, note: "skip the first digit" })]);
      for (let i = 0; i < z; i++) { const v = i + 1; S.push([520, () => setTb((t: any) => ({ ...t, lit: v }))]); }
      S.push([520, () => setTb((t: any) => ({ ...t, row: { digits: "", pointAt: z, filled: [] }, note: "only the zeros count" }))]);
      S.push([480, () => setTb((t: any) => ({ ...t, ans: z + " " + tx(z === 1 ? "place" : "places") }))]);
    } else if (item.rivalPath === "walk" || item.rivalPath === "left") {
      /* the point stopped short, went past, or was counted in from the left. The big point card goes
         first to where the child's point stopped (the child's own answer when it is these digits with a
         point in them, else this item's rival): counted in from the left it starts at the left hand end
         and hops there with each card it passes numbered. The strip keeps that answer while the card goes
         back to the right hand end and walks in, each card it passes numbered 1, 2, 3; the strip ends on
         the read back. A child whose point was in the right place but written wrongly (".617") gets no
         wrong walk at all: straight to the walk from the right, ending on the zero in front. */
      const own = psStopAt(d, typed), riv = psStopAt(d, item.rival);
      const rightPlace = own === z;
      const stop = own !== null && own !== z && own <= Math.max(z, d.length) + 2 ? own : riv !== null ? riv : 0;
      const childRow = { digits: d, pointAt: stop, filled: psZerosArr(stop - d.length) };
      if (rightPlace) {
        /* nothing to show of a wrong walk: the walk from the right below is the whole correction */
      } else if (item.rivalPath === "left" && stop < d.length) {
        S.push([900, () => { put(d.length); setTb({ marks: { side: "left", k: 0 }, note: "from the left end" }); }]);
        for (let k = 1; k <= d.length - stop; k++) { const v = k; S.push([620, () => { put(d.length - v); setTb({ marks: { side: "left", k: v }, note: "counted from the left" }); }]); }
        S.push([900, () => setTb((t: any) => ({ ...t, row: childRow }))]);
      } else {
        S.push([1100, () => { put(stop); setTb({ row: childRow, note: stop < z ? "it stopped short" : "walked too far" }); }]);
      }
      S.push([600, () => { put(0); setTb((t: any) => ({ ...t, marks: { side: "right", k: 0 }, note: "from the right end" })); }]);
      for (let k = 1; k <= z; k++) { const v = k; S.push([620, () => { put(v); setTb((t: any) => ({ ...t, marks: { side: "right", k: v }, note: tx("counting") + " " + v })); }]); }
      S.push([480, () => setTb((t: any) => ({ ...t, row: { digits: d, pointAt: z, filled: psZerosArr(ns) }, note: "read it back", ans: done }))]);
    } else if (item.rivalPath === "right-side") {
      /* the zeros were hung past the right hand end: the row is read as the number it has become,
         then the empty places light on the left and grey zeros walk into them instead */
      S.push([360, () => setTb({ row: { digits: d + psZerosArr(ns).join(""), pointAt: z, filled: [] }, note: "hung on the right" })]);
      S.push([760, () => setTb({ row: { digits: d, pointAt: z, filled: [] }, arrow: true, note: "empty on the left" })]);
      fillSteps(S);
      S.push([480, () => setTb((t: any) => ({ ...t, arrow: false, ans: done }))]);
    } else if (item.rivalPath === "no-fill") {
      /* the point went in with nothing filled: the place nearest it is lit and counted against the counter */
      S.push([360, () => setTb({ row: { digits: d, pointAt: d.length, filled: [] }, note: "the places run short" })]);
      S.push([760, () => setTb({ row: { digits: d, pointAt: z, filled: [] }, arrow: true, note: "a place still empty" })]);
      fillSteps(S);
      S.push([480, () => setTb((t: any) => ({ ...t, arrow: false, ans: done }))]);
    } else if (item.rivalPath === "over-fill") {
      /* a padding zero nobody asked for: the counter is read against the row and the zero comes out */
      S.push([360, () => setTb({ row: { digits: d, pointAt: z + 1, filled: psZerosArr(1) }, note: "an extra zero" })]);
      S.push([820, () => setTb({ row: { digits: d, pointAt: z, filled: [] }, note: "just one place" })]);
      S.push([480, () => setTb((t: any) => ({ ...t, ans: done }))]);
    } else {
      /* the other lane's answer was taken as the right one: that lane is run to its finish, the gap
         is measured, and the counted lane is then built beside it */
      S.push([300, () => setTb({ laneRow: { digits: d + psZerosArr(z).join(""), pointAt: z }, note: "that lane finished bigger" })]);
      S.push([620, () => setTb((t: any) => ({ ...t, gap: indian(item.den) + " " + tx("times bigger") }))]);
      S.push([620, () => setTb((t: any) => ({ ...t, row: { digits: d, pointAt: z, filled: psZerosArr(ns) }, note: "count from the right" }))]);
      S.push([480, () => setTb((t: any) => ({ ...t, ans: done }))]);
    }
    tl.run(S, () => api.lock(false));
  }, [wrong]);

  /* ── what the host and the agent read back (toolApi.getState) ── */
  const emptyPlaces = Math.max(0, pointAt - num.length);
  api.share({ numerator: num, denominator: den, zeroCount: counted, pointAt,
    emptyPlaces, filled: filled.filter(Boolean).length, wrongLane: laneStep >= 2, gap: laneStep >= 2 ? den : 0,
    complete: stage === "idle" });

  /* ── drawing ── */
  const cells = psLay(psCells(num, pointAt, filled), R.cw, R.pw, R.gap, ROWX);
  const showRow = kind !== "count" || counted > 0 || !!(tb && tb.lit > 0);
  const openSlot = cells.filter((c: any) => c.k === "slot").findIndex((c: any) => !c.ch);
  /* free play's distance bar writes a figure only when it is true of what is drawn: the lane has run
     and the top row is finished at the count (the point in as many places as the zeros underneath,
     no place left empty). Then the lane reads the numerator and the top row the fraction, exactly
     the denominator apart; anywhere else the two rows are 10 to the power of the point's place apart. */
  const topDone = pointAt === zeros && openSlot < 0;
  const barOn = laneStep >= 2 && topDone;
  const lane = psLay(psCells(num + psZerosArr(laneStep >= 1 ? zeros : 0).join(""), laneStep >= 2 ? zeros : 0, []), LR.cw, LR.pw, LR.gap, LR.cx);
  /* the correction runs the other lane on its own layer: the lane the child runs is never written to */
  const laneShown = tb && tb.laneRow && laneStep < 1
    ? psLay(psCells(tb.laneRow.digits, tb.laneRow.pointAt, []), LR.cw, LR.pw, LR.gap, LR.cx) : lane;
  const showLane = four || (free && laneOn);
  const barText = tb && tb.gap ? tb.gap : null;
  const turned = index + (stage === "win" || stage === "idle" ? 1 : 0);

  const trayLive = fillLive();
  const zeroPay = { src: "zero" };
  const pointPay = { src: "point" };

  /* one card of a row */
  const psCard = (c: any, y: number, h: number, key: any, small?: boolean) => {
    const size = small ? T.label : T.xl;
    const mid = c.x + c.w / 2, base = y + h / 2 + size * 0.34;
    if (c.k === "point") return (
      <g key={key}>
        <rect x={c.x} y={y} width={c.w} height={h} rx={RAD.piece} fill={tint(PS_RED, 0.82)} stroke={PS_RED} strokeWidth={2.5} />
        <circle cx={mid} cy={y + h - (small ? 20 : 28)} r={small ? 8 : 11} fill={PS_RED} />
      </g>
    );
    const lit = c.k === "slot" && !c.ch;
    const ink = c.k === "whole" ? PS_BLUE : c.k === "lead" || c.k === "slot" ? PS_GREY : PS_GREEN;
    return (
      <g key={key}>
        <rect x={c.x} y={y} width={c.w} height={h} rx={RAD.piece}
          fill={lit ? tint(PS_AMBER, 0.86) : "#FFFFFF"} stroke={lit ? PS_AMBER : C.rule} strokeWidth={lit ? 3 : 2}
          strokeDasharray={lit ? "9 7" : undefined} />
        {c.ch ? <text x={mid} y={base} textAnchor="middle" fontSize={size} fontWeight={700} fill={ink}>{c.ch}</text> : null}
      </g>
    );
  };

  /* the arrow that marks a filling zero: always inward, from the point towards the digits */
  const psArrow = (x0: number, x1: number, y: number, key?: any) => (
    <g key={key}>
      <path d={`M ${x0} ${y} H ${x1 - 12}`} stroke={PS_AMBER_INK} strokeWidth={5} strokeLinecap="round" fill="none" />
      <path d={`M ${x1 - 16} ${y - 9} L ${x1} ${y} L ${x1 - 16} ${y + 9} Z`} fill={PS_AMBER_INK} />
    </g>
  );

  const big = kind === "count";
  const fg = four ? PS_GEO.fracS : big ? PS_GEO.fracL : PS_GEO.frac;
  const cg = four ? PS_GEO.cntS : big ? PS_GEO.cntL : PS_GEO.cnt;
  const fSize = four ? T.label : big ? T.display : T.speech;
  const dPitch = four ? 56 : big ? 120 : 72;
  const dDigits = String(den).split("");
  const dY = fg.y + (four ? 108 : big ? 224 : 150);
  const barY = fg.y + (four ? 60 : big ? 128 : 88);
  const dX = (i: number) => fg.x + fg.w / 2 + (i - (dDigits.length - 1) / 2) * dPitch;
  /* while a correction stands it draws the count on its own layer (tb.lit): the zeros it has reached
     and its own number in the counter chip. Otherwise a zero is lit (phase 1) when the child counted
     that very zero, else when the preset counter covers it. */
  const demoLit = tb && typeof tb.lit === "number" ? tb.lit : null;
  const zeroLit = (i: number) => (demoLit !== null ? i <= demoLit : kind === "count" ? tapped.includes(i) : i <= counted);
  const chipN = demoLit !== null ? demoLit : counted;
  const dimTop = !!(tb && tb.dim);   /* the correction's layer only: the child's fraction is untouched */
  const cSize = four ? T.speech : big ? T.display : T.xl;

  const invite = !touched && !busy && stage === "ask"
    ? big ? { x: dX(1), y: dY - 26, r: 52 }
      : kind === "point" ? { x: psPointX(num, pointAt, filled, R.cw, R.pw, R.gap, CX), y: R.y + R.h / 2, r: 56 }
        : kind === "fill" ? { x: PS_GEO.tray.x + 60, y: trayY + 42, r: 54 }
          : { x: CX, y: PS_GEO.laneB.y + PS_GEO.laneB.h / 2, r: 58 }
    /* free play: the lane strip is the tap that runs it, so its empty bar pulses for a few seconds */
    : free && laneOn && laneHint && laneStep === 0 && !busy ? { x: W.w - 16 - 98, y: laneY + laneH / 2, r: 52 }
    : null;

  return (
    <g>
      <style>{PS_CSS}</style>

      {/* the running count: the fractions turned against the fractions this phase lays out.
          Free play has nothing to get right, so it carries no target at all */}
      {!free && (
        <g data-zone="runs">
          <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          <text x={18} y={-56 + T.speech * 0.36} fontSize={T.speech} fontWeight={700} fill={C.ink}>{turned} / {phase.items.length}</text>
          <text x={312} y={-56 + T.micro * 0.36} textAnchor="end" fontSize={T.micro} fontWeight={500} fill={C.ink}>{tx("turned")}</text>
        </g>
      )}

      {/* the fraction: its bar near-black, the denominator lit while its zeros are counted */}
      <g>
        {num && !dimTop ? (
          <text x={fg.x + fg.w / 2} y={barY - (four ? 16 : big ? 30 : 22)} textAnchor="middle" fontSize={fSize} fontWeight={700} fill={C.ink}>{num}</text>
        ) : (
          <rect x={fg.x + fg.w / 2 - (big ? 76 : 52)} y={barY - (four ? 58 : big ? 92 : 66)} width={big ? 152 : 104} height={four ? 44 : big ? 72 : 50}
            rx={10} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} strokeDasharray="8 7" />
        )}
        <path d={`M ${fg.x + 14} ${barY} H ${fg.x + fg.w - 14}`} stroke={C.ink} strokeWidth={dimTop ? 12 : big ? 8 : 6} strokeLinecap="round" />
        {/* the counter walks down from the top number to the bottom one before it counts anything */}
        {dimTop && (
          <g>
            <path d={`M ${fg.x + fg.w - 30} ${barY - 56} V ${dY - 46}`} stroke={PS_AMBER_INK} strokeWidth={5} strokeLinecap="round" fill="none" />
            <path d={`M ${fg.x + fg.w - 46} ${dY - 50} L ${fg.x + fg.w - 30} ${dY - 32} L ${fg.x + fg.w - 14} ${dY - 50} Z`} fill={PS_AMBER_INK} />
          </g>
        )}
        {dDigits.map((ch, i) => {
          const isZero = i > 0, on = isZero && zeroLit(i);
          return (
            <g key={i}>
              {on && <rect x={dX(i) - fSize * 0.58} y={dY - fSize * 0.78} width={fSize * 1.16} height={fSize * 1.2} rx={10} fill={tint(PS_AMBER, 0.72)} stroke={PS_AMBER} strokeWidth={2.5} />}
              <text x={dX(i)} y={dY} textAnchor="middle" fontSize={fSize} fontWeight={700} fill={on ? PS_AMBER_INK : C.ink}>{ch}</text>
              {big && canPlay && isZero && (
                <Hit id={"zero-" + i} label={"Count this zero"} x={dX(i) - dPitch / 2} y={dY - 74} w={dPitch} h={74} onPress={() => tapZero(i)} />
              )}
            </g>
          );
        })}
      </g>

      {/* the zero counter: the only number it ever shows is how many places it has found */}
      <g>
        <rect x={cg.x} y={cg.y} width={cg.w} height={cg.h} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        {chipN > 0 ? (
          <text x={cg.x + 26} y={cg.y + cg.h / 2 + cSize * 0.34} fontSize={cSize} fontWeight={700} fill={PS_AMBER_INK}>{chipN}</text>
        ) : (
          /* nothing counted yet: a waiting box, never a number */
          <rect x={cg.x + 22} y={cg.y + cg.h / 2 - cSize * 0.42} width={cSize * 0.72} height={cSize * 0.84} rx={8}
            fill="#FFFFFF" stroke={C.rule} strokeWidth={2} strokeDasharray="8 7" />
        )}
        <text x={cg.x + cg.w - 18} y={cg.y + cg.h / 2 + T.micro * 0.34} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(chipN === 1 ? "place" : "places")}</text>
      </g>

      {/* the row of cards, with the point card sliding in from the right hand end */}
      {showRow && (
        <g>
          {four && <rect x={0} y={PS_GEO.laneA.y} width={W.w} height={PS_GEO.laneA.h} rx={RAD.panel} fill={tint(C.panel, 0.45)} stroke={C.rule} strokeWidth={2} />}
          {four && <text x={16} y={PS_GEO.laneA.y + 36} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("in from the right")}</text>}
          {cells.map((c: any, i: number) => (
            c.k === "point" ? (
              <g key={i} className={pointLive() ? "ps-grab c4-piece" : ""}
                {...(pointLive() && !four ? { ...control("point-card", "Slide the point card in"), ...drag.bind(pointPay), ...drag.keys(pointPay) } : {})}>
                {psCard(c, R.y, R.h, "p", four)}
                <rect x={c.x + c.w / 2 - 36} y={R.y} width={72} height={R.h} fill="transparent" />
              </g>
            ) : psCard(c, R.y, R.h, i, four)
          ))}
          {/* the correction's step numbers: over each card the point card has passed, counted from
              the end it started at (1 nearest that end) */}
          {tb && tb.marks && tb.marks.k > 0 && (() => {
            const pi = cells.findIndex((c: any) => c.k === "point");
            const left = tb.marks.side === "left";
            const passed = left ? cells.slice(0, pi) : cells.slice(pi + 1);
            return (
              <g pointerEvents="none">
                {passed.map((c: any, j: number) => (
                  <text key={"m" + j} x={c.x + c.w / 2} y={R.y - 14} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={PS_AMBER_INK}>
                    {left ? j + 1 : passed.length - j}
                  </text>
                ))}
              </g>
            );
          })()}
          {/* the places still empty are the ones nearest the point: the arrow always runs inward */}
          {openSlot >= 0 && !four && (() => {
            const pt: any = cells.find((c: any) => c.k === "point");
            const sl: any = cells.filter((c: any) => c.k === "slot")[openSlot];
            return psArrow(pt.x + pt.w / 2, sl.x + sl.w / 2 - 4, R.y - 20, "arrow");
          })()}
          {refuse && <text x={CX} y={R.y - 34} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={PS_AMBER_INK}>{tx("zeros go here")}</text>}
        </g>
      )}

      {/* the zero tray: grey zeros for the empty places on the left */}
      {(kind === "fill" || free) && (
        <g>
          <rect x={PS_GEO.tray.x} y={trayY} width={PS_GEO.tray.w} height={PS_GEO.tray.h} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          {[0, 1, 2].map((i) => (
            <g key={i} className={trayLive ? "ps-grab c4-piece" : ""}
              {...(trayLive ? { ...control("tray-" + i, "Take a zero for an empty place"), ...drag.bind(zeroPay), ...drag.keys(zeroPay) } : {})}>
              <rect x={PS_GEO.tray.x + 20 + i * 104} y={trayY + 2} width={80} height={80} rx={RAD.piece} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
              <text x={PS_GEO.tray.x + 60 + i * 104} y={trayY + 42 + T.speech * 0.34} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={PS_GREY}>0</text>
            </g>
          ))}
        </g>
      )}

      {/* the other lane: the same fraction with its zeros hung past the right hand end */}
      {showLane && (
        <g>
          <rect x={0} y={laneY} width={W.w} height={laneH} rx={RAD.panel}
            fill={tint(C.panel, 0.45)} stroke={C.rule} strokeWidth={2} />
          {free ? (
            <g>
              <text x={16} y={laneY + 38} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("zeros on")}</text>
              <text x={16} y={laneY + 70} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("the right")}</text>
            </g>
          ) : (
            <text x={16} y={laneY + 36} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("zeros on the right")}</text>
          )}
          {laneShown.map((c: any, i: number) => psCard(c, laneY + (laneH - LR.h) / 2, LR.h, "l" + i, true))}
          {/* free play's distance bar, in the lane strip's right end: once the lane has run it writes how
              many times apart the two answers are (the denominator, as phase 4's bar does); it measures,
              it never judges */}
          {free && (
            <g>
              <rect x={W.w - 16 - 196} y={laneY + 8} width={196} height={laneH - 16} rx={14} fill="#FFFFFF" stroke={C.rule} strokeWidth={2}
                strokeDasharray={barOn ? undefined : "10 10"} />
              {barOn && (
                <g>
                  <text x={W.w - 16 - 98} y={laneY + 40} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{indian(den) + " " + tx("times")}</text>
                  <text x={W.w - 16 - 98} y={laneY + 70} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("bigger")}</text>
                </g>
              )}
            </g>
          )}
          {laneLive() && (
            <Hit id="run-lane" label="Run the other lane" x={0} y={laneY} w={W.w} h={laneH} onPress={runLane} />
          )}
        </g>
      )}

      {/* the distance bar: it measures, it never judges */}
      {four && (
        <g>
          <rect x={0} y={PS_GEO.bar.y} width={W.w} height={PS_GEO.bar.h} rx={14} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} strokeDasharray={barText ? undefined : "10 10"} />
          {barText && <text x={CX} y={PS_GEO.bar.y + PS_GEO.bar.h / 2 + T.micro * 0.34} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{barText}</text>}
        </g>
      )}

      {/* the correction's own layer / the read back: it ends on the whole right answer */}
      {tb && (tb.row || tb.ans || tb.note) && (
        <g data-role="reading" pointerEvents="none">
          <rect x={0} y={PS_GEO.bench.y} width={W.w} height={PS_GEO.bench.h} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
          {tb.note && <text x={20} y={PS_GEO.bench.y + 32} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(tb.note)}</text>}
          {tb.row && (() => {
            const b = psLay(psCells(tb.row.digits, tb.row.pointAt, tb.row.filled || []), 56, 40, 8, 660);
            const pt: any = b.find((c: any) => c.k === "point");
            const sl: any = b.filter((c: any) => c.k === "slot").find((c: any) => !c.ch);
            return (
              <g>
                {b.map((c: any, i: number) => psCard(c, PS_GEO.bench.y + 18, 58, "b" + i, true))}
                {tb.arrow && sl && psArrow(pt.x + pt.w / 2, sl.x + sl.w / 2 - 4, PS_GEO.bench.y + 10, "ba")}
              </g>
            );
          })()}
          {tb.ans &&<text x={W.w - 24} y={PS_GEO.bench.y + 58} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={C.ink}>{tb.ans}</text>}
        </g>
      )}

      {/* free play: any numerator, any of the three denominators, the other lane */}
      {free && (
        <g>
          {[10, 100, 1000].map((d, i) => (
            <Key key={d} id={"den-" + d} label={"Denominator " + words(d)} x={PS_GEO.keys.x + i * PS_GEO.keys.pitch} y={PS_GEO.keys.y}
              w={PS_GEO.keys.w} h={PS_GEO.keys.h} C={C} primary={den === d}
              onClick={() => { act(); const z = psZeros(d); setDen(d); denRef.current = d; setCounted(z); countRef.current = z; const p = Math.min(pointRef.current, Math.max(z, numRef.current.length)); setPointAt(p); pointRef.current = p; setFilled([]); fillRef.current = []; setLaneStep(0); laneRef.current = 0; }}>
              <text y={10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={den === d ? "#FFFFFF" : C.ink}>{d}</text>
            </Key>
          ))}
          <Key id="new-top" label="A new top number" x={PS_GEO.keys.wx} y={PS_GEO.keys.y} w={PS_GEO.keys.ww} h={PS_GEO.keys.h} C={C}
            onClick={() => { act(); const k = (freeAt + 1) % MODEL.freeNumerators.length; setFreeAt(k); const t = MODEL.freeNumerators[k]; setNum(t); numRef.current = t; setPointAt(0); pointRef.current = 0; setFilled([]); fillRef.current = []; setLaneStep(0); laneRef.current = 0; }}>
            <text y={-3} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("new")}</text>
            <text y={27} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("top")}</text>
          </Key>
          <Key id="other-lane" label="The other lane" x={PS_GEO.keys.wx + PS_GEO.keys.wpitch} y={PS_GEO.keys.y} w={PS_GEO.keys.ww} h={PS_GEO.keys.h} C={C} primary={laneOn}
            onClick={() => { act(); setLaneOn((b) => !b); setLaneStep(0); laneRef.current = 0; }}>
            <text y={-3} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={laneOn ? "#FFFFFF" : C.ink}>{tx("other")}</text>
            <text y={27} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={laneOn ? "#FFFFFF" : C.ink}>{tx("lane")}</text>
          </Key>
        </g>
      )}

      {/* the piece under the finger */}
      {drag.drag && drag.drag.moved && (
        <g pointerEvents="none">
          {drag.drag.payload.src === "point" ? (
            <g>
              <rect x={drag.drag.x - R.pw / 2} y={drag.drag.y - R.h / 2} width={R.pw} height={R.h} rx={RAD.piece} fill={tint(PS_RED, 0.82)} stroke={PS_RED} strokeWidth={2.5} filter="url(#fLift)" />
              <circle cx={drag.drag.x} cy={drag.drag.y + R.h / 2 - 28} r={11} fill={PS_RED} />
            </g>
          ) : (
            <g>
              <rect x={drag.drag.x - 36} y={drag.drag.y - 36} width={72} height={72} rx={RAD.piece} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} filter="url(#fLift)" />
              <text x={drag.drag.x} y={drag.drag.y + T.speech * 0.34} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={PS_GREY}>0</text>
            </g>
          )}
        </g>
      )}

      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing: the fraction the child turned, and what it came to */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const L = (result && result.last) || {};
  const sh = L.shared || {};
  if (L.value === null || L.value === undefined || L.value === "") return null;
  const v = String(L.value);
  const mid = h / 2;
  const places = /^\d+$/.test(v) ? Number(v) : 0;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <text x={50} y={mid - 8} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{sh.numerator || ""}</text>
      <path d={`M 18 ${mid + 2} H 82`} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
      <text x={50} y={mid + 32} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{sh.denominator || ""}</text>
      {/* every row reads fraction, arrow, what it came to: a count (phase 1) as the places it found in
          words, a decimal as written */}
      <path d={`M 96 ${mid + 2} H 118 M 112 ${mid - 5} L 120 ${mid + 2} L 112 ${mid + 9} Z`} stroke={C.rule} strokeWidth={3} fill={C.rule} />
      <text x={w - 12} y={mid + 11} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>{places > 0 ? places + " " + tx(places === 1 ? "place" : "places") : v}</text>
    </g>
  );
}

function PointSlider(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, pointKey: true, winMs: 2600, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default PointSlider;
