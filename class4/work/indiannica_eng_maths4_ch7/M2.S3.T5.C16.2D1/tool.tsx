/* ═══ M2.S3.T5.C16.2D1 · same_amount_bench · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "same_amount_bench";
const MEDIA_ID = "M2.S3.T5.C16.2D1";
const TOOL_NAME = "Same Amount Bench";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["Two strips of one length, both starting at the same edge. Fill each from its own fraction."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "One amount wearing a great many names, and a test that still works with the pictures put away.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Set any fraction, multiply or divide it, and run the multiples.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r21: `lineFor(line, lang, TR)`); the English
   everywhere else stays what the checks read. NCERT class 4 fractions: भिन्न / અપૂર્ણાંક, अंश / અંશ, हर / છેદ,
   समतुल्य / સમકક્ષ. "Same amount" is बराबर मात्रा / સરખી માત્રા; the number both numerator and denominator are
   multiplied or divided by is the गुणक / ગુણક; its "partner" is the साथी संख्या / સાથી સંખ્યા; "cross multiply"
   is तिरछा गुणा / ત્રાંસો ગુણાકાર and a "product" is गुणनफल / ગુણનફળ. A fraction the English writes with digits
   (2/6) is said as "6 में से 2 भाग" / "6 માંથી 2 ભાગ" (the slash is never spoken); one it writes in words
   (five twelfths) is translated word for word. A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Same Amount Bench": "बराबर मात्रा बेंच",
    "Two strips of one length, both starting at the same edge. Fill each from its own fraction.": "एक ही लंबाई की दो पट्टियाँ, दोनों एक किनारे से शुरू। हर पट्टी को उसके अपने भिन्न से भरो।",
    "One amount wearing a great many names, and a test that still works with the pictures put away.": "एक ही मात्रा, ढेर सारे नाम। और एक जाँच जो चित्रों के बिना भी काम करती है।",
    "Free play. Set any fraction, multiply or divide it, and run the multiples.": "मुक्त खेल। कोई भी भिन्न चुनो, उसे गुणा या भाग करो, और गुणज दिखाओ।",

    "Same amount, different writing": "बराबर मात्रा, अलग लिखावट",
    "Tap a strip to cut it into parts. Then look where its colour stops.": "पट्टी पर टैप करके उसे भागों में काटो। फिर देखो कि उसका रंग कहाँ रुकता है।",
    "Follow the guide line down. Which colours reach it?": "गाइड रेखा को नीचे तक देखो। कौन-से रंग उस तक पहुँचते हैं?",
    "Count the cuts, then look at the colour. Only its length counts.": "कट गिनो, फिर रंग देखो। सिर्फ़ उसकी लंबाई मायने रखती है।",
    "Fractions that look nothing alike can stand for the same amount. Such fractions are called equivalent.": "अलग दिखने वाले भिन्न भी बराबर मात्रा हो सकते हैं। ऐसे भिन्न समतुल्य कहलाते हैं।",
    "You learned: fractions that look different can be the same amount.": "तुमने सीखा: अलग दिखने वाले भिन्न भी बराबर मात्रा हो सकते हैं।",
    "Three glasses of the same size are filled. One is 1/3 full, one is 2/6 full and one is 3/9 full. Which of the three holds the most?": "एक ही आकार के तीन गिलास भरे हैं। पहला गिलास एक तिहाई भरा है। दूसरा 6 में से 2 भाग और तीसरा 9 में से 3 भाग भरा है। तीनों में से किसमें सबसे ज़्यादा है?",
    "Which holds the most?": "किसमें सबसे ज़्यादा है?",
    "More parts does not mean more. Lay every strip and compare the colour.": "ज़्यादा भाग का मतलब ज़्यादा मात्रा नहीं। हर पट्टी भरो और रंग की तुलना करो।",
    "one third": "एक तिहाई", "two sixths": "6 में से 2", "three ninths": "9 में से 3", "none of them": "कोई नहीं",
    "Two children eat 1/4 and 2/8 of identical bars. Who has eaten more?": "दो बच्चे एक जैसी चॉकलेट-बार खाते हैं। एक ने एक चौथाई खाया, दूसरे ने 8 में से 2 भाग। किसने ज़्यादा खाया?",
    "Who ate more?": "किसने ज़्यादा खाया?",
    "An eighth is smaller than a quarter. How far does each colour reach?": "आठवाँ भाग चौथाई से छोटा होता है। हर रंग कहाँ तक पहुँचता है?",
    "one quarter": "एक चौथाई", "two eighths": "8 में से 2", "neither": "कोई नहीं", "neither ate more": "किसी ने ज़्यादा नहीं खाया",
    "Are 1/5 and 3/15 the same amount?": "क्या 5 में से 1 भाग और 15 में से 3 भाग बराबर हैं?",
    "The same amount?": "बराबर मात्रा?",
    "Lay both strips. Do the two colours stop together?": "दोनों पट्टियाँ भरो। क्या दोनों रंग एक साथ रुकते हैं?",
    "yes": "हाँ", "no": "नहीं", "yes, the same amount": "हाँ, बराबर मात्रा",

    "Building one by multiplying": "गुणा करके नया भिन्न बनाना",
    "Multiply the top and the bottom by one number. Type the fraction you get, and the builder cuts it.": "ऊपर और नीचे की संख्या को एक ही संख्या से गुणा करो। जो भिन्न मिले उसे लिखो, और बेंच उसे काट देगी।",
    "What did you multiply the bottom by?": "तुमने नीचे की संख्या को किससे गुणा किया?",
    "A right fraction stops on the guide line. Watch where the colour ends.": "सही भिन्न का रंग गाइड रेखा पर रुकता है। देखो रंग कहाँ खत्म होता है।",
    "Multiply or divide the top and the bottom by the same number. The amount stays exactly where it was.": "ऊपर और नीचे की संख्या को एक ही संख्या से गुणा या भाग करो। मात्रा वहीं की वहीं रहती है।",
    "You learned: multiply top and bottom by one number; the amount stays.": "तुमने सीखा: ऊपर-नीचे एक ही संख्या से गुणा करो; मात्रा वही रहती है।",
    "Build three fractions equal to 2/7 by multiplying.": "गुणा करके 7 में से 2 भाग के बराबर तीन भिन्न बनाओ।",
    "Build three, one at a time": "तीन बनाओ, एक-एक करके",
    "What did you multiply the top by? The bottom needs that same number.": "तुमने ऊपर की संख्या को किससे गुणा किया? नीचे की संख्या को भी उसी से गुणा करना है।",
    "Multiply both numbers of 5/9 by three and write what you get.": "9 में से 5 भाग की दोनों संख्याओं को तीन से गुणा करो। जो मिले, उसे लिखो।",
    "Both numbers times three": "दोनों संख्याओं को तीन से गुणा करो",
    "Three times the top, and three times the bottom as well.": "ऊपर की संख्या का तीन गुना, और नीचे की संख्या का भी तीन गुना।",
    "Now three more, all equal to 5/12.": "अब तीन और, सब 12 में से 5 भाग के बराबर।",
    "Three more, one at a time": "तीन और, एक-एक करके",
    "Choose a multiplier for five twelfths and give it to both numbers.": "बारह में से पाँच भाग के लिए एक गुणक चुनो। उसे दोनों संख्याओं पर लगाओ।",
    "You have that one in the row. Build a different one.": "यह पंक्ति में पहले से है। कोई दूसरा बनाओ।",

    "Hitting a numerator or a denominator you are given": "दिया हुआ अंश या हर पाना",
    "One number of the new fraction is given. Tap its arrow and name the factor first.": "नए भिन्न की एक संख्या दी गई है। उसके तीर पर टैप करो और पहले गुणक बताओ।",
    "What was the given number's partner multiplied or divided by?": "दी गई संख्या की साथी संख्या को किससे गुणा या भाग किया गया?",
    "Whatever you do to one number, do exactly the same to the other.": "एक संख्या के साथ जो भी करो, दूसरी के साथ ठीक वही करो।",
    "Find what the given number was multiplied or divided by. Then do exactly that to its partner.": "पता करो कि दी गई संख्या किससे गुणा या भाग होकर बनी। फिर उसकी साथी संख्या के साथ ठीक वही करो।",
    "You learned: find the factor from the given number, then use it again.": "तुमने सीखा: दी गई संख्या से गुणक ढूँढो, फिर उसे दोबारा लगाओ।",
    "Write 5/6 as an equivalent fraction with a numerator of 20.": "6 में से 5 भाग का समतुल्य भिन्न लिखो, जिसका अंश 20 हो।",
    "Its top is 20": "ऊपर 20 है",
    "Five times what makes twenty? Do the same to the six.": "पाँच को किससे गुणा करें कि बीस बने? छह के साथ भी वही करो।",
    "Now 4/7 needs a new top number, 24. What fraction do you get?": "अब 7 में से 4 भाग को नई ऊपर की संख्या 24 चाहिए। तुम्हें कौन-सा भिन्न मिलता है?",
    "Its top is 24": "ऊपर 24 है",
    "Four became twenty-four by multiplying, not by adding. Multiplying by what?": "चार से चौबीस गुणा करने से बना, जोड़ने से नहीं। किससे गुणा किया?",
    "This time the bottom is given. Write 45/72 as a fraction over 8.": "इस बार नीचे की संख्या दी गई है। 72 में से 45 भाग का ऐसा भिन्न लिखो, जिसके नीचे 8 हो।",
    "Its bottom is 8": "नीचे 8 है",
    "Seventy-two divided by what makes eight? Divide the top by it too.": "बहत्तर को किससे भाग दें कि आठ बने? ऊपर की संख्या को भी उसी से भाग दो।",
    "Name the factor on the arrow first, then write the fraction.": "पहले तीर पर गुणक बताओ, फिर भिन्न लिखो।",

    "Testing a pair without building anything": "बिना कुछ बनाए जोड़ी की जाँच",
    "No pictures this time. Drag a line from a top number to the bottom number of the other fraction.": "इस बार कोई चित्र नहीं। ऊपर की एक संख्या से दूसरे भिन्न की नीचे की संख्या तक रेखा खींचो।",
    "Which two numbers are left for the second line?": "दूसरी रेखा के लिए कौन-सी दो संख्याएँ बची हैं?",
    "Top of one times bottom of the other, and then the other way.": "एक का ऊपर गुणा दूसरे का नीचे, और फिर उल्टी तरफ़ से।",
    "Cross multiply both ways. Equal products mean equivalent fractions, and unequal products mean they are not.": "दोनों तरफ़ से तिरछा गुणा करो। गुणनफल बराबर हों तो भिन्न समतुल्य हैं, और बराबर न हों तो नहीं।",
    "You learned: equal crossing products mean equivalent fractions.": "तुमने सीखा: तिरछे गुणनफल बराबर हों तो भिन्न समतुल्य होते हैं।",
    "Are 6/9 and 14/21 equivalent? Cross multiply and give both products.": "क्या 9 में से 6 भाग और 21 में से 14 भाग समतुल्य हैं? तिरछा गुणा करो और दोनों गुणनफल बताओ।",
    "Both crossing products": "दोनों तिरछे गुणनफल",
    "Which two numbers did your first line join?": "तुम्हारी पहली रेखा ने किन दो संख्याओं को मिलाया?",
    "Are 3/5 and 12/20 equivalent? Give both crossing products.": "क्या 5 में से 3 भाग और 20 में से 12 भाग समतुल्य हैं? दोनों तिरछे गुणनफल बताओ।",
    "Cross both ways": "दोनों तरफ़ से तिरछा गुणा करो",
    "Did both your lines cross over the middle?": "क्या तुम्हारी दोनों रेखाएँ बीच में एक-दूसरे को काटती हैं?",
    "Now 7/9 and 21/28. Test them the same way.": "अब 9 में से 7 भाग और 28 में से 21 भाग। इनकी जाँच भी इसी तरह करो।",
    "Both products": "दोनों गुणनफल",
    "Did you go straight along the tops? Go across instead.": "क्या तुम ऊपर-ऊपर सीधे गए? इसके बजाय तिरछे जाओ।",

    /* what the working area draws and the slot's own labels */
    "line one": "रेखा एक", "line two": "रेखा दो",
    "numerator": "अंश", "denominator": "हर",
    "more than one whole": "एक पूर्ण से बड़ा", "from": "मूल", "both numbers": "दोनों संख्याएँ",
    "the verdict": "फ़ैसला", "equal": "बराबर", "not equal": "बराबर नहीं", "equivalent": "समतुल्य", "not equivalent": "समतुल्य नहीं",
    "top": "ऊपर", "cuts": "कट", "multiples": "गुणज",
  },
  gu: {
    "Same Amount Bench": "સરખી માત્રા બેન્ચ",
    "Two strips of one length, both starting at the same edge. Fill each from its own fraction.": "એક જ લંબાઈની બે પટ્ટીઓ, બંને એક જ કિનારેથી શરૂ. દરેક પટ્ટીને તેના અપૂર્ણાંકથી ભરો.",
    "One amount wearing a great many names, and a test that still works with the pictures put away.": "એક જ માત્રા, અનેક નામ. અને એવી કસોટી જે ચિત્રો વિના પણ કામ કરે છે.",
    "Free play. Set any fraction, multiply or divide it, and run the multiples.": "મુક્ત રમત. કોઈ પણ અપૂર્ણાંક પસંદ કરો, ગુણો કે ભાગો, અને ગુણિત બતાવો.",

    "Same amount, different writing": "સરખી માત્રા, અલગ લખાવટ",
    "Tap a strip to cut it into parts. Then look where its colour stops.": "પટ્ટી પર ટૅપ કરીને તેને ભાગોમાં કાપો. પછી જુઓ કે તેનો રંગ ક્યાં અટકે છે.",
    "Follow the guide line down. Which colours reach it?": "ગાઈડ રેખાને નીચે સુધી જુઓ. કયા રંગ ત્યાં સુધી પહોંચે છે?",
    "Count the cuts, then look at the colour. Only its length counts.": "કાપા ગણો, પછી રંગ જુઓ. ફક્ત તેની લંબાઈ ગણાય છે.",
    "Fractions that look nothing alike can stand for the same amount. Such fractions are called equivalent.": "અલગ દેખાતા અપૂર્ણાંકો પણ સરખી માત્રા દર્શાવી શકે છે. આવા અપૂર્ણાંકો સમકક્ષ કહેવાય છે.",
    "You learned: fractions that look different can be the same amount.": "તમે શીખ્યા: અલગ દેખાતા અપૂર્ણાંકો પણ સરખી માત્રા હોઈ શકે.",
    "Three glasses of the same size are filled. One is 1/3 full, one is 2/6 full and one is 3/9 full. Which of the three holds the most?": "સરખા કદના ત્રણ ગ્લાસ ભરેલા છે. પહેલો ગ્લાસ ત્રીજા ભાગ જેટલો ભરેલો છે. બીજો 6 માંથી 2 ભાગ અને ત્રીજો 9 માંથી 3 ભાગ ભરેલો છે. ત્રણમાંથી કયામાં સૌથી વધુ છે?",
    "Which holds the most?": "કયામાં સૌથી વધુ છે?",
    "More parts does not mean more. Lay every strip and compare the colour.": "વધુ ભાગ એટલે વધુ માત્રા નહીં. દરેક પટ્ટી ભરીને રંગ સરખાવો.",
    "one third": "ત્રીજો ભાગ", "two sixths": "6 માંથી 2", "three ninths": "9 માંથી 3", "none of them": "એકેય નહીં",
    "Two children eat 1/4 and 2/8 of identical bars. Who has eaten more?": "બે બાળકો એક સરખી ચોકલેટ-બાર ખાય છે. એકે ચોથો ભાગ ખાધો, બીજાએ 8 માંથી 2 ભાગ. કોણે વધુ ખાધું?",
    "Who ate more?": "કોણે વધુ ખાધું?",
    "An eighth is smaller than a quarter. How far does each colour reach?": "આઠમો ભાગ ચોથા ભાગથી નાનો હોય છે. દરેક રંગ ક્યાં સુધી પહોંચે છે?",
    "one quarter": "ચોથો ભાગ", "two eighths": "8 માંથી 2", "neither": "કોઈ નહીં", "neither ate more": "કોઈએ વધુ ન ખાધું",
    "Are 1/5 and 3/15 the same amount?": "શું 5 માંથી 1 ભાગ અને 15 માંથી 3 ભાગ સરખી માત્રા છે?",
    "The same amount?": "સરખી માત્રા?",
    "Lay both strips. Do the two colours stop together?": "બંને પટ્ટીઓ ભરો. શું બંને રંગ સાથે અટકે છે?",
    "yes": "હા", "no": "ના", "yes, the same amount": "હા, સરખી માત્રા",

    "Building one by multiplying": "ગુણાકારથી નવો અપૂર્ણાંક બનાવવો",
    "Multiply the top and the bottom by one number. Type the fraction you get, and the builder cuts it.": "ઉપર અને નીચેની સંખ્યાને એક જ સંખ્યાથી ગુણો. જે અપૂર્ણાંક મળે તે લખો, અને બેન્ચ તેને કાપી આપશે.",
    "What did you multiply the bottom by?": "તમે નીચેની સંખ્યાને શેનાથી ગુણી?",
    "A right fraction stops on the guide line. Watch where the colour ends.": "સાચા અપૂર્ણાંકનો રંગ ગાઈડ રેખા પર અટકે છે. જુઓ રંગ ક્યાં પૂરો થાય છે.",
    "Multiply or divide the top and the bottom by the same number. The amount stays exactly where it was.": "ઉપર અને નીચેની સંખ્યાને એક જ સંખ્યાથી ગુણો કે ભાગો. માત્રા બરાબર એની એ જ રહે છે.",
    "You learned: multiply top and bottom by one number; the amount stays.": "તમે શીખ્યા: ઉપર-નીચે એક જ સંખ્યાથી ગુણો; માત્રા એ જ રહે છે.",
    "Build three fractions equal to 2/7 by multiplying.": "ગુણાકાર કરીને 7 માંથી 2 ભાગ જેટલા ત્રણ અપૂર્ણાંક બનાવો.",
    "Build three, one at a time": "ત્રણ બનાવો, એક પછી એક",
    "What did you multiply the top by? The bottom needs that same number.": "તમે ઉપરની સંખ્યાને શેનાથી ગુણી? નીચેની સંખ્યાને પણ એ જ સંખ્યાથી ગુણવી પડશે.",
    "Multiply both numbers of 5/9 by three and write what you get.": "9 માંથી 5 ભાગની બંને સંખ્યાને ત્રણથી ગુણો. જે મળે તે લખો.",
    "Both numbers times three": "બંને સંખ્યાને ત્રણથી ગુણો",
    "Three times the top, and three times the bottom as well.": "ઉપરની સંખ્યા ત્રણ ગણી, અને નીચેની સંખ્યા પણ ત્રણ ગણી.",
    "Now three more, all equal to 5/12.": "હવે વધુ ત્રણ, બધા 12 માંથી 5 ભાગ જેટલા.",
    "Three more, one at a time": "વધુ ત્રણ, એક પછી એક",
    "Choose a multiplier for five twelfths and give it to both numbers.": "બારમાંથી પાંચ ભાગ માટે એક ગુણક પસંદ કરો. તેને બંને સંખ્યાઓ પર લગાવો.",
    "You have that one in the row. Build a different one.": "આ તો હરોળમાં પહેલેથી છે. બીજો બનાવો.",

    "Hitting a numerator or a denominator you are given": "આપેલો અંશ કે છેદ મેળવવો",
    "One number of the new fraction is given. Tap its arrow and name the factor first.": "નવા અપૂર્ણાંકની એક સંખ્યા આપેલી છે. તેના તીર પર ટૅપ કરો અને પહેલા ગુણક જણાવો.",
    "What was the given number's partner multiplied or divided by?": "આપેલી સંખ્યાની સાથી સંખ્યાને શેનાથી ગુણી કે ભાગી?",
    "Whatever you do to one number, do exactly the same to the other.": "એક સંખ્યા સાથે જે કરો, બીજી સાથે બરાબર એ જ કરો.",
    "Find what the given number was multiplied or divided by. Then do exactly that to its partner.": "શોધો કે આપેલી સંખ્યા શેનાથી ગુણવાથી કે ભાગવાથી બની. પછી તેની સાથી સંખ્યા સાથે બરાબર એ જ કરો.",
    "You learned: find the factor from the given number, then use it again.": "તમે શીખ્યા: આપેલી સંખ્યા પરથી ગુણક શોધો, પછી એ જ ફરી વાપરો.",
    "Write 5/6 as an equivalent fraction with a numerator of 20.": "6 માંથી 5 ભાગનો સમકક્ષ અપૂર્ણાંક લખો, જેનો અંશ 20 હોય.",
    "Its top is 20": "ઉપરની સંખ્યા 20",
    "Five times what makes twenty? Do the same to the six.": "પાંચને શેનાથી ગુણવાથી વીસ થાય? છ સાથે પણ એ જ કરો.",
    "Now 4/7 needs a new top number, 24. What fraction do you get?": "હવે 7 માંથી 4 ભાગને નવી ઉપરની સંખ્યા 24 જોઈએ છે. તમને કયો અપૂર્ણાંક મળે?",
    "Its top is 24": "ઉપરની સંખ્યા 24",
    "Four became twenty-four by multiplying, not by adding. Multiplying by what?": "ચારમાંથી ચોવીસ ગુણાકારથી બન્યા, સરવાળાથી નહીં. શેનાથી ગુણ્યા?",
    "This time the bottom is given. Write 45/72 as a fraction over 8.": "આ વખતે નીચેની સંખ્યા આપેલી છે. 72 માંથી 45 ભાગનો એવો અપૂર્ણાંક લખો, જેની નીચે 8 હોય.",
    "Its bottom is 8": "નીચેની સંખ્યા 8",
    "Seventy-two divided by what makes eight? Divide the top by it too.": "બોતેરને શેનાથી ભાગવાથી આઠ થાય? ઉપરની સંખ્યાને પણ તેનાથી ભાગો.",
    "Name the factor on the arrow first, then write the fraction.": "પહેલા તીર પર ગુણક જણાવો, પછી અપૂર્ણાંક લખો.",

    "Testing a pair without building anything": "કંઈ બનાવ્યા વિના જોડીની ચકાસણી",
    "No pictures this time. Drag a line from a top number to the bottom number of the other fraction.": "આ વખતે કોઈ ચિત્ર નથી. ઉપરની સંખ્યાથી બીજા અપૂર્ણાંકની નીચેની સંખ્યા સુધી રેખા ખેંચો.",
    "Which two numbers are left for the second line?": "બીજી રેખા માટે કઈ બે સંખ્યાઓ બાકી છે?",
    "Top of one times bottom of the other, and then the other way.": "એકની ઉપર ગુણ્યા બીજાની નીચે, અને પછી બીજી બાજુથી.",
    "Cross multiply both ways. Equal products mean equivalent fractions, and unequal products mean they are not.": "બંને બાજુથી ત્રાંસો ગુણાકાર કરો. ગુણનફળ સરખા હોય તો અપૂર્ણાંક સમકક્ષ છે, અને સરખા ન હોય તો નથી.",
    "You learned: equal crossing products mean equivalent fractions.": "તમે શીખ્યા: ત્રાંસા ગુણનફળ સરખા હોય તો અપૂર્ણાંક સમકક્ષ હોય.",
    "Are 6/9 and 14/21 equivalent? Cross multiply and give both products.": "શું 9 માંથી 6 ભાગ અને 21 માંથી 14 ભાગ સમકક્ષ છે? ત્રાંસો ગુણાકાર કરો અને બંને ગુણનફળ જણાવો.",
    "Both crossing products": "બંને ત્રાંસા ગુણનફળ",
    "Which two numbers did your first line join?": "તમારી પહેલી રેખાએ કઈ બે સંખ્યાઓને જોડી?",
    "Are 3/5 and 12/20 equivalent? Give both crossing products.": "શું 5 માંથી 3 ભાગ અને 20 માંથી 12 ભાગ સમકક્ષ છે? બંને ત્રાંસા ગુણનફળ જણાવો.",
    "Cross both ways": "બંને બાજુથી ત્રાંસો ગુણાકાર",
    "Did both your lines cross over the middle?": "શું તમારી બંને રેખાઓ વચ્ચે એકબીજીને કાપે છે?",
    "Now 7/9 and 21/28. Test them the same way.": "હવે 9 માંથી 7 ભાગ અને 28 માંથી 21 ભાગ. તેમને પણ આ જ રીતે તપાસો.",
    "Both products": "બંને ગુણનફળ",
    "Did you go straight along the tops? Go across instead.": "શું તમે ઉપર-ઉપર સીધા ગયા? તેના બદલે ત્રાંસા જાઓ.",

    /* what the working area draws and the slot's own labels */
    "line one": "રેખા એક", "line two": "રેખા બે",
    "numerator": "અંશ", "denominator": "છેદ",
    "more than one whole": "એક આખા કરતાં મોટું", "from": "મૂળ", "both numbers": "બંને સંખ્યાઓ",
    "the verdict": "નિર્ણય", "equal": "સરખા", "not equal": "સરખા નથી", "equivalent": "સમકક્ષ", "not equivalent": "સમકક્ષ નથી",
    "top": "ઉપર", "cuts": "કાપા", "multiples": "ગુણિત",
  },
};

/* ── the bench: one left edge, strips of one length ─────────────────────────────────────
   deep blue = the parts a fraction counts · amber = the parts of that whole it leaves
   rose = a second writing of an amount already on the bench · near-black = every cut and edge */
const SAB_BLUE = CONTENT.hundred;
const SAB_AMBER = CONTENT.ten;
const SAB_WHOLE = CONTENT.one;      /* a strip still whole, not cut yet */
const SAB_LINE = CONTENT.line;
const SAB_ROSE_INK = shade(CONTENT.bead, 0.25);
const SX = 40, SW = 640, LX = 770;          /* the common left edge, a strip's length, the labels' centre */
const SAB_CROSS_PARTS = [{ label: "line one" }, { label: "line two" }];

const sabEnd = (a: number, b: number) => SX + SW * Math.min(Math.max(a / b, 0), 1);
/* a fraction typed into the slot ("15|27"), given as [15, 27], or written out */
const sabPair = (v: any): number[] | null => {
  const ps = slotPartsOf(v, 2);
  if (ps[0] === "" || ps[1] === "") return null;
  return [Number(ps[0]), Number(ps[1])];
};
/* every fraction in a value, whatever shape it comes in: "4|14", [4, 14], [[4, 14], [6, 21]] or
   a flat row of numbers (the agent's key for "build three") */
const sabPairs = (v: any): number[][] => {
  const flat: number[] = [];
  const walk = (x: any) => {
    if (Array.isArray(x)) { x.forEach(walk); return; }
    (String(x === null || x === undefined ? "" : x).match(/\d+/g) || []).forEach((d: string) => flat.push(Number(d)));
  };
  walk(v);
  const out: number[][] = [];
  for (let i = 0; i + 1 < flat.length; i += 2) out.push([flat[i], flat[i + 1]]);
  return out;
};
/* a/b is base built by multiplying both numbers by a whole number bigger than one */
const sabMade = (base: number[], a: number, b: number) =>
  b > base[1] && b % base[1] === 0 && a === base[0] * (b / base[1]);
const sabSame = (p: number[], q: number[]) => p[0] === q[0] && p[1] === q[1];
const sabForms = (x: number) => (x >= 10 ? [String(x), indian(x), words(x)] : []);

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   items   three a phase; kinds: choice (a word answer) · three (build three equal writings, one at a
           time) · times (multiply both by a given number) · target (one number is given) · cross */
const PHASES = [
  {
    n: 1,
    concept: "Same amount, different writing",
    conceptId: "M2.S3.T5.C16", objectiveIds: ["O7"],
    says: ["Tap a strip to cut it into parts. Then look where its colour stops."],
    ladder: ["Follow the guide line down. Which colours reach it?", "Count the cuts, then look at the colour. Only its length counts."],
    closing: "Fractions that look nothing alike can stand for the same amount. Such fractions are called equivalent.",
    learned: "You learned: fractions that look different can be the same amount.",
    traceback: "Every strip is laid from the one edge, the guide line drops through the fills, and the parts taken are counted out.",
    items: [
      /* learn ML1: answer in the plan = None of them. All three hold the same amount */
      { qid: "M2.S3.T5.C16:ML1", kind: "choice", strips: [[1, 3], [2, 6], [3, 9]], names: ["one third", "two sixths", "three ninths"],
        near: "three ninths", tag: "none of them", winMs: 2000,
        say: "Three glasses of the same size are filled. One is 1/3 full, one is 2/6 full and one is 3/9 full. Which of the three holds the most?",
        ask: "Which holds the most?", answer: "none of them",
        choices: [{ id: "one third", label: "one third" }, { id: "two sixths", label: "two sixths" },
          { id: "three ninths", label: "three ninths" }, { id: "none of them", label: "none of them" }],
        miss: "More parts does not mean more. Lay every strip and compare the colour." },
      /* practice 1: answer in the plan = Neither, because 2/8 is the same amount as 1/4 */
      { qid: "M2.S3.T5.C16:1", kind: "choice", strips: [[1, 4], [2, 8]], names: ["one quarter", "two eighths"],
        near: "two eighths", tag: "neither ate more", winMs: 2000,
        say: "Two children eat 1/4 and 2/8 of identical bars. Who has eaten more?",
        ask: "Who ate more?", answer: "neither",
        choices: [{ id: "one quarter", label: "one quarter" }, { id: "two eighths", label: "two eighths" }, { id: "neither", label: "neither" }],
        miss: "An eighth is smaller than a quarter. How far does each colour reach?" },
      /* practice 2: answer in the plan = Yes, because multiplying both numbers of 1/5 by three gives 3/15 */
      { qid: "M2.S3.T5.C16:2", kind: "choice", strips: [[1, 5], [3, 15]], names: ["one fifth", "three fifteenths"],
        near: "no", tag: "yes, the same amount", winMs: 2000,
        say: "Are 1/5 and 3/15 the same amount?",
        ask: "The same amount?", answer: "yes",
        choices: [{ id: "yes", label: "yes" }, { id: "no", label: "no" }],
        miss: "Lay both strips. Do the two colours stop together?" },
    ],
  },
  {
    n: 2,
    concept: "Building one by multiplying",
    conceptId: "M2.S3.T5.C17", objectiveIds: ["O7"],
    says: ["Multiply the top and the bottom by one number. Type the fraction you get, and the builder cuts it."],
    ladder: ["What did you multiply the bottom by?", "A right fraction stops on the guide line. Watch where the colour ends."],
    closing: "Multiply or divide the top and the bottom by the same number. The amount stays exactly where it was.",
    learned: "You learned: multiply top and bottom by one number; the amount stays.",
    traceback: "The child's fraction is cut on the lower strip against the guide line, then the same multiplier on both numbers is built below and lands on it.",
    items: [
      /* learn ML2: answer in the plan = 4/14, 6/21 and 8/28 */
      { qid: "M2.S3.T5.C17:ML2", kind: "three", base: [2, 7], need: 3, answer: [4, 14], parts: SLOT_FRACTION, winMs: 2600,
        say: "Build three fractions equal to 2/7 by multiplying.",
        ask: "Build three, one at a time",
        miss: "What did you multiply the top by? The bottom needs that same number." },
      /* practice 3: answer in the plan = 15/27 */
      { qid: "M2.S3.T5.C17:3", kind: "times", base: [5, 9], k: 3, need: 1, answer: [15, 27], parts: SLOT_FRACTION, winMs: 2600,
        say: "Multiply both numbers of 5/9 by three and write what you get.",
        ask: "Both numbers times three",
        miss: "Three times the top, and three times the bottom as well." },
      /* practice 4: answer in the plan = 10/24, 15/36 and 20/48 */
      { qid: "M2.S3.T5.C17:4", kind: "three", base: [5, 12], need: 3, answer: [10, 24], parts: SLOT_FRACTION, winMs: 2800,
        say: "Now three more, all equal to 5/12.",
        ask: "Three more, one at a time",
        miss: "Choose a multiplier for five twelfths and give it to both numbers." },
    ],
  },
  {
    n: 3,
    concept: "Hitting a numerator or a denominator you are given",
    conceptId: "M2.S3.T5.C18", objectiveIds: ["O8"],
    says: ["One number of the new fraction is given. Tap its arrow and name the factor first."],
    ladder: ["What was the given number's partner multiplied or divided by?", "Whatever you do to one number, do exactly the same to the other."],
    closing: "Find what the given number was multiplied or divided by. Then do exactly that to its partner.",
    learned: "You learned: find the factor from the given number, then use it again.",
    traceback: "The factor goes on both arrows, the child's fraction and the right one are cut from the common edge, and the blank is filled in.",
    items: [
      /* learn ML3: answer in the plan = 20/24 and 3/5 (the bench takes its first half; see the report) */
      { qid: "M2.S3.T5.C18:ML3", kind: "target", base: [5, 6], at: "top", given: 20, op: "×", f: 4, answer: [20, 24], parts: SLOT_FRACTION, winMs: 2800,
        say: "Write 5/6 as an equivalent fraction with a numerator of 20.",
        ask: "Its top is 20",
        miss: "Five times what makes twenty? Do the same to the six." },
      /* practice 5: answer in the plan = 24/42, because four was multiplied by six */
      { qid: "M2.S3.T5.C18:5", kind: "target", base: [4, 7], at: "top", given: 24, op: "×", f: 6, answer: [24, 42], parts: SLOT_FRACTION, winMs: 2800,
        say: "Now 4/7 needs a new top number, 24. What fraction do you get?",
        ask: "Its top is 24",
        miss: "Four became twenty-four by multiplying, not by adding. Multiplying by what?" },
      /* practice 6: answer in the plan = 5/8, because seventy-two was divided by nine */
      { qid: "M2.S3.T5.C18:6", kind: "target", base: [45, 72], at: "bottom", given: 8, op: "÷", f: 9, answer: [5, 8], parts: SLOT_FRACTION, winMs: 2800,
        say: "This time the bottom is given. Write 45/72 as a fraction over 8.",
        ask: "Its bottom is 8",
        miss: "Seventy-two divided by what makes eight? Divide the top by it too." },
    ],
  },
  {
    n: 4,
    concept: "Testing a pair without building anything",
    conceptId: "M2.S3.T5.C19", objectiveIds: ["O8"],
    says: ["No pictures this time. Drag a line from a top number to the bottom number of the other fraction."],
    ladder: ["Which two numbers are left for the second line?", "Top of one times bottom of the other, and then the other way."],
    closing: "Cross multiply both ways. Equal products mean equivalent fractions, and unequal products mean they are not.",
    learned: "You learned: equal crossing products mean equivalent fractions.",
    traceback: "The two crossing lines are drawn over the child's lines with their products, and the verdict panel fills from them.",
    items: [
      /* learn ML4: answer in the plan = Yes. Both products are 126, so the two fractions are equivalent */
      { qid: "M2.S3.T5.C19:ML4", kind: "cross", p: [6, 9], q: [14, 21], verdict: "yes", answer: [126, 126], parts: SAB_CROSS_PARTS, winMs: 2800,
        say: "Are 6/9 and 14/21 equivalent? Cross multiply and give both products.",
        ask: "Both crossing products",
        miss: "Which two numbers did your first line join?" },
      /* practice 7: answer in the plan = Yes. Both products are 60 */
      { qid: "M2.S3.T5.C19:7", kind: "cross", p: [3, 5], q: [12, 20], verdict: "yes", answer: [60, 60], parts: SAB_CROSS_PARTS, winMs: 2800,
        say: "Are 3/5 and 12/20 equivalent? Give both crossing products.",
        ask: "Cross both ways",
        miss: "Did both your lines cross over the middle?" },
      /* practice 8: answer in the plan = No. The products are 189 and 196, and they are not equal */
      { qid: "M2.S3.T5.C19:8", kind: "cross", p: [7, 9], q: [21, 28], verdict: "no", answer: [196, 189], parts: SAB_CROSS_PARTS, winMs: 2800,
        say: "Now 7/9 and 21/28. Test them the same way.",
        ask: "Both products",
        miss: "Did you go straight along the tops? Go across instead." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  strip: { leftEdge: SX, length: SW, labelAt: LX },
  colours: { counted: "hundred", left: "ten", secondWriting: "bead", cuts: "line" },
  crossBoxes: SAB_CROSS_PARTS.map((p) => p.label),
  freePlay: { fraction: "any", cuts: "2 to 12", multiplier: "2 to 5", row: "times two, three and four" },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a word answer matches its choice; a built fraction must come from multiplying BOTH numbers;
   the two crossing products may be given in either order; every other fraction is exact */
const judge = (item: any, v: any) => {
  if (item.kind === "choice") return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
  if (item.kind === "three") {
    const ps = sabPairs(v);
    const keys = ps.map((p: number[]) => p[0] + "/" + p[1]);
    return ps.length > 0 && new Set(keys).size === keys.length && ps.every((p: number[]) => sabMade(item.base, p[0], p[1]));
  }
  if (item.kind === "cross") {
    const ps = slotPartsOf(v, 2);
    if (ps.some((x: string) => x === "")) return false;
    const got = ps.map(Number).sort((x: number, y: number) => x - y), want = item.answer.slice().sort((x: number, y: number) => x - y);
    return got[0] === want[0] && got[1] === want[1];
  }
  return judgeSlotParts(item, v);
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work
   (decimal values for equivalence, repeated addition for the crossing products) */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "choice") {
    const v0 = it.strips[0][0] / it.strips[0][1];
    const same = it.strips.every((s: number[]) => Math.abs(s[0] / s[1] - v0) < 1e-9);
    const word: any = { "none of them": true, neither: true, yes: true };
    return same === (word[it.answer] === true) && it.names.length >= 2 && it.tag.length > 0;
  }
  if (it.kind === "three" || it.kind === "times") {
    const k = it.kind === "times" ? it.k : it.answer[1] / it.base[1];
    return k >= 2 && Number.isInteger(k) && it.answer[0] === it.base[0] * k && it.answer[1] === it.base[1] * k
      && Math.abs(it.answer[0] / it.answer[1] - it.base[0] / it.base[1]) < 1e-9;
  }
  if (it.kind === "target") {
    const [a, b] = it.answer;
    const hit = it.at === "top" ? a === it.given : b === it.given;
    const step = it.op === "×" ? it.base[1] * it.f === b && it.base[0] * it.f === a : it.base[1] / it.f === b && it.base[0] / it.f === a;
    return hit && step && Math.abs(a / b - it.base[0] / it.base[1]) < 1e-9;
  }
  if (it.kind === "cross") {
    let s1 = 0, s2 = 0;
    for (let i = 0; i < it.q[1]; i++) s1 += it.p[0];
    for (let i = 0; i < it.p[1]; i++) s2 += it.q[0];
    const equal = Math.abs(it.p[0] / it.p[1] - it.q[0] / it.q[1]) < 1e-9;
    return s1 === it.answer[0] && s2 === it.answer[1] && (s1 === s2) === equal && equal === (it.verdict === "yes");
  }
  return false;
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => {
  if (item.kind === "choice") return item.near;                                   /* the biggest numbers */
  if (item.kind === "three" || item.kind === "times") {
    const k = item.kind === "times" ? item.k : 2;
    return [item.base[0] * k, item.base[1]].join("|");                            /* only the top multiplied */
  }
  if (item.kind === "target") {
    if (item.op === "×") {
      const gap = item.given - item.base[item.at === "top" ? 0 : 1];               /* the difference added on */
      return item.at === "top" ? [item.given, item.base[1] + gap].join("|") : [item.base[0] + gap, item.given].join("|");
    }
    return item.at === "top" ? [item.given, item.base[1]].join("|") : [item.base[0], item.given].join("|"); /* only the asked number */
  }
  return [item.p[0] * item.q[0], item.p[1] * item.q[1]].join("|");                 /* top by top, bottom by bottom */
};
/* the forms of an answer that no question, hint or ladder line may print (a number the question itself
   gives is the question, not the answer) */
const answerForms = (item: any) => {
  if (item.kind === "choice") return [String(item.answer)];
  if (item.kind === "three") return [2, 3, 4].flatMap((k: number) => {
    const a = item.base[0] * k, b = item.base[1] * k;
    return [a + "/" + b, ...sabForms(a), ...sabForms(b)];
  });
  if (item.kind === "target") {
    const hidden = item.at === "top" ? item.answer[1] : item.answer[0];
    return [item.answer.join("/"), ...sabForms(hidden)];
  }
  if (item.kind === "cross") return item.answer.flatMap(sabForms);
  return [item.answer.join("/"), ...item.answer.flatMap(sabForms)];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it: for "build
   three" that is the three writings in a row, top and bottom of each */
const agentKey = (item: any) => (item.kind === "three"
  ? [2, 3, 4].flatMap((k: number) => [item.base[0] * k, item.base[1] * k])
  : item.answer);

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (item.kind === "target" && HOOK.nameFactor) HOOK.nameFactor();   /* the bay is named before it is written */
  if (item.kind === "three" && HOOK.fill) {
    const ps = sabPairs(agentKey(item));
    HOOK.fill(ps.slice(0, item.need - 1));
    return T.submit(ps[item.need - 1]);
  }
  return T.submit(item.answer);
};
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.kind === "three" && HOOK.agentBuild ? HOOK.agentBuild(v) : undefined);
/* the agent's check() before Enter: e.g. a writing that joins the row; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the pieces the bench is drawn from ──────────────────────────────────────────────────── */

/* one strip: n equal parts with a filled, cut with near-black score lines. split (k, lo..hi) draws the
   coarse parts lo..hi-1 divided k ways, so a multiply spreads the cuts from the left and a divide
   pairs them off again, while the filled length never moves. */
function SabStrip({ y, h, n, a, k = 1, lo = 0, hi = 0, blank, count = 0, x = SX, w = SW }: any) {
  if (blank || !n || n < 1) return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={SAB_WHOLE} />
      <rect x={x} y={y + 2} width={w} height={Math.max(4, h * 0.16)} fill="#FFFFFF" fillOpacity={0.24} />
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={SAB_LINE} strokeWidth={2.4} />
    </g>
  );
  const pw = w / n, fw = w * Math.min(Math.max(a / n, 0), 1);
  const cuts: number[] = [], fine: number[] = [];
  if (pw >= 4) for (let i = 1; i < n; i++) cuts.push(x + pw * i);
  if (k > 1 && pw / k >= 4) for (let i = Math.max(0, lo); i < Math.min(n, hi); i++) for (let j = 1; j < k; j++) fine.push(x + pw * (i + j / k));
  const sw = pw < 10 ? 1 : pw < 22 ? 1.6 : 2.4;
  const numbered = count > 0 && pw >= 40 && h >= 40;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={SAB_AMBER} />
      {fw > 0 && <rect x={x} y={y} width={fw} height={h} fill={SAB_BLUE} />}
      <rect x={x} y={y + 2} width={w} height={Math.max(4, h * 0.16)} fill="#FFFFFF" fillOpacity={0.24} />
      {fine.map((fx, i) => <line key={"f" + i} x1={fx} y1={y} x2={fx} y2={y + h} stroke={SAB_LINE} strokeWidth={Math.max(1, sw - 1)} />)}
      {cuts.map((cx, i) => <line key={"c" + i} x1={cx} y1={y} x2={cx} y2={y + h} stroke={SAB_LINE} strokeWidth={sw} />)}
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={SAB_LINE} strokeWidth={2.4} />
      {numbered && Array.from({ length: Math.min(count, Math.min(a, n)) }).map((_, j) => (
        <text key={"n" + j} x={x + pw * (j + 0.5)} y={y + h / 2 + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF">{j + 1}</text>
      ))}
    </g>
  );
}

/* a fraction is always written stacked: the upper number over a level bar over the lower number */
function SabFrac({ cx, y, a, b, size = T.label, fill = SAB_LINE, C }: any) {
  const gap = Math.max(6, Math.round(size * 0.13));
  const wide = (v: any) => String(v).length * size * 0.62;
  const none = (v: any) => v === null || v === undefined;
  const bw = Math.max(none(a) ? size * 1.25 : wide(a), none(b) ? size * 1.25 : wide(b)) + size * 0.4;
  const topBase = y - gap, botBase = y + gap + size * 0.74;
  const blank = (base: number) => (
    <rect x={cx - size * 0.63} y={base - size * 0.74} width={size * 1.26} height={size * 0.78} rx={7}
      fill="#FFFFFF" stroke={(C && C.dim) || "#9AA4AC"} strokeWidth={2.5} strokeDasharray="8 6" />
  );
  const digits = (v: any, base: number) => (
    <text x={cx} y={base} textAnchor="middle" fontSize={size} fontWeight={700} fill={fill}>{v}</text>
  );
  return (
    <g>
      {none(a) ? blank(topBase) : digits(a, topBase)}
      <rect x={cx - bw / 2} y={y - 2} width={bw} height={4} rx={2} fill={fill} />
      {none(b) ? blank(botBase) : digits(b, botBase)}
    </g>
  );
}

/* the drawn left edge every strip starts from, and the guide line that drops from a filled end */
const SabEdge = ({ y1, y2 }: any) => <rect x={SX - 8} y={y1} width={6} height={Math.max(0, y2 - y1)} rx={3} fill={SAB_LINE} />;
const SabGuide = ({ x, y1, y2 }: any) => <line x1={x} y1={y1} x2={x} y2={y2} stroke={SAB_LINE} strokeWidth={3} strokeDasharray="9 8" />;

/* one writing in the multiples row: the fraction stacked, with a small strip of its own cut differently */
function SabWriting({ cx, top, p, ghost, C }: any) {
  return (
    <g>
      {(ghost || !p) && <rect x={cx - 105} y={top} width={210} height={186} rx={18} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="10 8" />}
      {p && <SabFrac cx={cx} y={top + 62} a={p[0]} b={p[1]} size={T.prompt} fill={SAB_ROSE_INK} C={C} />}
      {p && <SabStrip x={cx - 80} w={160} y={top + 128} h={30} n={p[1]} a={p[0]} />}
    </g>
  );
}

/* a tap target on the working area that can hand back the keyboard: while the tool holds the pad the
   press handler is off, so Enter goes to the window instead of re-opening the cell (no keyboard trap) */
function SabCell({ id, x, y, w, h, onPress, label, enabled }: any) {
  const p = usePress(onPress, enabled);
  return (
    <rect className="c4-hit" data-control={id} role="button" tabIndex={0} aria-label={label}
      x={x} y={y} width={w} height={h} fill="transparent" {...p.bind()} onKeyDown={p.keys} />
  );
}

/* ── phase 1: the same amount, written differently ───────────────────────────────────────── */

const P1_ROW = [20, 150, 280], P1_H = 80;

function SabSame({ item, index, stage, wrong, api, tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const [cfg, setCfg] = useState<any>(item);
  const [cut, setCut] = useState<boolean[]>(() => item.strips.map(() => false));
  const [fill, setFill] = useState<number[]>(() => item.strips.map(() => 0));
  const [counted, setCounted] = useState<number[]>(() => item.strips.map(() => 0));
  const [tag, setTag] = useState<string | null>(null);
  const [lit, setLit] = useState<number | null>(null);
  const [touched, setTouched] = useState(false);
  const cutRef = useRef(cut); cutRef.current = cut;
  const fillRef = useRef(fill); fillRef.current = fill;
  const setupFor = useRef(index);
  const busy = tl.busy;

  useEffect(() => {
    if (stage !== "ask" || setupFor.current === index) return;
    setupFor.current = index;
    tl.stop();
    setCfg(item);
    setCut(item.strips.map(() => false)); cutRef.current = item.strips.map(() => false);
    setFill(item.strips.map(() => 0)); fillRef.current = item.strips.map(() => 0);
    setCounted(item.strips.map(() => 0));
    setTag(null); setLit(null); setTouched(false);
    api.lock(false);
  }, [stage, index]);

  /* laying a strip: it is cut into its parts, then filled one part at a time, from where it stands
     (a strip half filled when the answer came is carried on, never rewound) */
  const laySteps = (i: number, slow = 1) => {
    const a = cfg.strips[i][0], from = fillRef.current[i] || 0;
    const S: any[] = [];
    if (!cutRef.current[i]) S.push([110 * slow, () => { setCut((c: boolean[]) => c.map((x, j) => (j === i ? true : x))); api.sfx.tick(); }]);
    for (let j = from + 1; j <= a; j++) { const jj = j; S.push([170 * slow, () => setFill((f: number[]) => f.map((x, q) => (q === i ? jj : x)))]); }
    S.push([180 * slow, () => {}]);
    return S;
  };
  const done = (i: number) => cutRef.current[i] && (fillRef.current[i] || 0) >= cfg.strips[i][0];
  const layRest = (slow = 1) => cfg.strips.flatMap((_: any, i: number) => (done(i) ? [] : laySteps(i, slow)));
  const lay = (i: number) => {
    if (busy || cutRef.current[i]) return;
    setTouched(true);
    tl.run(laySteps(i));
  };

  /* the traceback: every strip laid from the one edge, the guide line dropped through the fills,
     the parts taken counted out, and the whole right answer written under the line */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    setTouched(true);
    const pick = cfg.names.indexOf(String(wrong.value));
    const S: any[] = [[400, () => {}], ...layRest(0.8)];
    if (pick >= 0) S.push([500, () => setLit(pick)]);
    cfg.strips.forEach((s: number[], i: number) => {
      for (let j = 1; j <= s[0]; j++) { const jj = j, ii = i; S.push([300, () => { setCounted((c: number[]) => c.map((x, q) => (q === ii ? jj : x))); api.sfx.tick(); }]); }
    });
    S.push([500, () => setTag(cfg.tag)]);
    S.push([400, () => {}]);
    tl.run(S, () => api.lock(false));
  }, [wrong]);

  useEffect(() => {
    if (stage !== "win") return;
    const S = [...layRest(0.7)];
    S.push([300, () => setTag(cfg.tag)]);
    tl.run(S);
  }, [stage]);

  const rows = cfg.strips.map((s: number[], i: number) => ({ y: P1_ROW[i], a: s[0], b: s[1] }));
  const bottom = P1_ROW[rows.length - 1] + P1_H;
  const shown = rows.map((r: any, i: number) => cut[i] && fill[i] >= r.a);
  const gx = sabEnd(rows[0].a, rows[0].b);
  const canLay = (stage === "ask" || stage === "teach") && !busy;
  const invite = canLay && !touched && cut.every((c) => !c) ? { x: SX + 64, y: rows[0].y + P1_H / 2 } : null;
  const tagT = tag ? tx(tag) : "";
  const tagW = tag ? tagT.length * 18 + 44 : 0;
  const tagX = tag ? Math.min(Math.max(gx - tagW / 2, SX), SX + SW - tagW) : 0;

  api.share({ phase: 1, strips: cfg.strips, laid: cut.filter(Boolean).length, verdict: tag ? cfg.answer : null });

  return (
    <g>
      <SabEdge y1={8} y2={bottom + 14} />
      {rows.map((r: any, i: number) => (
        <g key={i}>
          {cut[i]
            ? <SabStrip y={r.y} h={P1_H} n={r.b} a={fill[i]} count={counted[i]} />
            : <SabStrip y={r.y} h={P1_H} blank />}
          <SabFrac cx={LX} y={r.y + P1_H / 2} a={r.a} b={r.b} C={C} />
          {lit === i && <rect x={LX - 62} y={r.y - 4} width={124} height={P1_H + 8} rx={16} fill="none" stroke={C.accent} strokeWidth={4} />}
          {canLay && !cut[i] && (
            <Hit id={"lay-" + (i + 1)} label={"Cut and fill the strip for " + fractionWords(r.a, r.b)} x={SX} y={r.y} w={SW} h={P1_H} onPress={() => lay(i)} />
          )}
        </g>
      ))}
      {shown[0] && <SabGuide x={gx} y1={6} y2={bottom + 16} />}
      {tag && (
        <g>
          <rect x={tagX} y={bottom + 44} width={tagW} height={60} rx={18} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
          <text x={tagX + tagW / 2} y={bottom + 84} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={SAB_LINE}>{tagT}</text>
        </g>
      )}
      {invite && <Invite x={invite.x} y={invite.y} r={50} C={C} />}
    </g>
  );
}

/* ── phase 2: building another writing by multiplying both numbers ───────────────────────── */

const P2 = { top: 20, low: 124, third: 228, h: 76, rowTop: 336 };

function SabBuild({ item, index, stage, wrong, typed, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const [cfg, setCfg] = useState<any>(item);
  const [lower, setLower] = useState<any>(null);
  const [lowLab, setLowLab] = useState<any>(null);
  const [third, setThird] = useState<any>(null);
  const [thirdLab, setThirdLab] = useState<any>(null);
  const [built, setBuilt] = useState<number[][]>([]);
  const [ghosts, setGhosts] = useState<number[][]>([]);
  const [mult, setMult] = useState<number | null>(item.kind === "times" ? item.k : null);
  const builtRef = useRef<number[][]>([]);
  const typedRef = useRef(typed); typedRef.current = typed;
  const setupFor = useRef(index);
  const busy = tl.busy;
  const base = cfg.base, a0 = base[0], b0 = base[1];

  useEffect(() => {
    if (stage !== "ask" || setupFor.current === index) return;
    setupFor.current = index;
    tl.stop();
    setCfg(item); setLower(null); setLowLab(null); setThird(null); setThirdLab(null);
    builtRef.current = []; setBuilt([]); setGhosts([]);
    setMult(item.kind === "times" ? item.k : null);
    api.lock(false);
  }, [stage, index]);

  /* the delight: the strip below does not redraw at once. Every score line divides, one after another
     from the left, while the filled end never moves off the guide line. */
  const splitSteps = (set: any, setLab: any, p: number[]) => {
    const k = p[1] / b0;
    const gap = Math.max(70, Math.round(1100 / b0));
    const S: any[] = [[60, () => { set({ n: b0, k, a: a0, lo: 0, hi: 0 }); setLab(null); setMult(k); }], [280, () => {}]];
    for (let i = 1; i <= b0; i++) { const ii = i; S.push([gap, () => { set({ n: b0, k, a: a0, lo: 0, hi: ii }); api.sfx.tick(); }]); }
    S.push([220, () => setLab({ p, own: false })]);
    return S;
  };
  const addBuilt = (p: number[]) => { builtRef.current = [...builtRef.current, p]; setBuilt(builtRef.current); };
  /* a right writing joins the row and the builder runs it on the strip below. The pad is never locked
     here: the child may type the next one while the cuts are still dividing. */
  const build = (p: number[]) => {
    addBuilt(p);
    setThird(null); setThirdLab(null);
    tl.run(splitSteps(setLower, setLowLab, p));
  };
  const freeKs = (many: number) => {
    const out: number[] = [];
    for (let k = 2; out.length < many && k < 12; k++) if (!builtRef.current.some((q) => sabSame(q, [a0 * k, b0 * k]))) out.push(k);
    return out;
  };

  /* Enter, while the row is still filling: a new right writing joins the row and the slot starts again;
     the writing that completes the row is the answer, and anything else is answered as it stands */
  const enterFn = cfg.kind !== "three" || stage !== "ask" ? null : (v: any) => {
    const p = sabPair(v);
    if (!p) return;
    const right = sabMade(base, p[0], p[1]);
    const have = builtRef.current.some((q) => sabSame(q, p));
    if (right && have) { api.say("You have that one in the row. Build a different one."); return; }
    if (right && builtRef.current.length < cfg.need - 1) { api.setTyped(""); build(p); return; }
    api.submit(v);
  };
  api.onEnter(enterFn);
  HOOK.check = cfg.kind === "three" ? () => {
    const p = sabPair(typedRef.current);
    if (!p || !enterFn) return undefined;
    enterFn(p.join("|"));
    return true;
  } : undefined;
  HOOK.agentBuild = cfg.kind === "three" ? (v: any) => {
    const ps = sabPairs(v);
    if (!ps.length) return false;
    const row = builtRef.current.slice();
    ps.slice(0, -1).forEach((p) => {
      if (row.length < cfg.need - 1 && sabMade(base, p[0], p[1]) && !row.some((q) => sabSame(q, p))) row.push(p);
    });
    builtRef.current = row; setBuilt(row);
    const last = ps[ps.length - 1];
    setLower({ n: b0, k: last[1] / b0, a: a0, lo: 0, hi: b0 });
    setLowLab({ p: last, own: false });
    setMult(last[1] / b0);
    api.setTyped(last.join("|"));
    return true;
  } : undefined;
  HOOK.fill = cfg.kind === "three" ? (list: any[]) => {
    const row = sabPairs(list).slice(0, cfg.need - 1);
    builtRef.current = row; setBuilt(row);
  } : undefined;

  /* the traceback: the child's fraction cut on the bench beside the guide line, then the same
     multiplier run on BOTH numbers below, landing on the line, and the row filled out */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    const p = sabPair(wrong.value);
    const ks = freeKs(Math.max(1, cfg.need - builtRef.current.length));
    const k = cfg.kind === "times" ? cfg.k : ks[0];
    const S: any[] = [[80, () => { setThird(null); setThirdLab(null); }]];
    if (p && p[1] > 0) S.push([700, () => { setLower({ n: p[1], k: 1, a: p[0], lo: 0, hi: 0 }); setLowLab({ p, own: true }); }]);
    S.push([900, () => {}]);
    S.push(...splitSteps(setThird, setThirdLab, [a0 * k, b0 * k]));
    if (cfg.kind === "three") S.push([500, () => setGhosts(ks.map((kk) => [a0 * kk, b0 * kk]))]);
    S.push([400, () => {}]);
    tl.run(S, () => api.lock(false));
  }, [wrong]);

  useEffect(() => {
    if (stage !== "win") return;
    const p = sabPair(typedRef.current) || cfg.answer;
    if (cfg.kind === "three" && !builtRef.current.some((q) => sabSame(q, p))) addBuilt(p);
    setGhosts([]);
    tl.run([[40, () => { setThird(null); setThirdLab(null); }], ...splitSteps(setLower, setLowLab, p)]);
  }, [stage]);

  const gx = sabEnd(a0, b0);
  const deep = third ? P2.third + P2.h : P2.low + P2.h;
  const runW = lang === "en" ? 330 : 410;   /* "3 में से 0" runs wider than "0 of 3" */
  const over = lowLab && lowLab.own && lowLab.p[0] > lowLab.p[1];
  const places: any[] = [];
  if (cfg.kind === "three") {
    const rest = ghosts.filter((g) => !built.some((q) => sabSame(q, g)));
    for (let i = 0; i < cfg.need; i++) places.push(built[i] ? { p: built[i], ghost: false } : { p: rest[i - built.length] || null, ghost: true });
  }

  api.share({ phase: 2, topFraction: base, bottomFraction: lowLab ? lowLab.p : null, multiplier: mult, multiplesRow: built });

  return (
    <g>
      {/* the running count: writings built against writings asked, and the fraction they come from */}
      <g data-zone="runs">
        <rect x={0} y={-94} width={runW} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        <text x={20} y={-40} fontSize={T.speech} fontWeight={700} fill={C.ink}>{lang === "hi" ? cfg.need + " में से " + built.length : lang === "gu" ? cfg.need + " માંથી " + built.length : built.length + " of " + cfg.need}</text>
        <text x={runW - 102} y={-46} textAnchor="end" fontSize={T.micro} fontWeight={500} fill={C.ink}>{tx("from")}</text>
        <SabFrac cx={runW - 48} y={-56} a={a0} b={b0} size={T.micro} C={C} />
      </g>

      <SabEdge y1={8} y2={deep + 14} />
      <SabStrip y={P2.top} h={P2.h} n={b0} a={a0} />
      <SabFrac cx={LX} y={P2.top + P2.h / 2} a={a0} b={b0} C={C} />

      {lower
        ? <SabStrip y={P2.low} h={P2.h} n={lower.n} a={lower.a} k={lower.k} lo={lower.lo} hi={lower.hi} />
        : <SabStrip y={P2.low} h={P2.h} blank />}
      <SabFrac cx={LX} y={P2.low + P2.h / 2} a={lowLab ? lowLab.p[0] : null} b={lowLab ? lowLab.p[1] : null}
        fill={lowLab && lowLab.own ? SAB_LINE : SAB_ROSE_INK} C={C} />
      {over && <text x={SX + SW / 2} y={P2.low + P2.h / 2 + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF">{tx("more than one whole")}</text>}

      {third && <SabStrip y={P2.third} h={P2.h} n={third.n} a={third.a} k={third.k} lo={third.lo} hi={third.hi} />}
      {third && <SabFrac cx={LX} y={P2.third + P2.h / 2} a={thirdLab ? thirdLab.p[0] : null} b={thirdLab ? thirdLab.p[1] : null} fill={SAB_ROSE_INK} C={C} />}

      <SabGuide x={gx} y1={6} y2={deep + 16} />

      {/* the builder: it works on both numbers at once */}
      <rect x={860} y={20} width={206} height={180} rx={20} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
      <text x={963} y={64} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("both numbers")}</text>
      <text x={963} y={158} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={SAB_LINE}>{mult ? "× " + mult : "× ?"}</text>

      {places.map((pl, i) => <SabWriting key={i} cx={170 + i * 280} top={P2.rowTop} p={pl.p} ghost={pl.ghost} C={C} />)}
    </g>
  );
}

/* ── phase 3: the number you are given tells you the factor ──────────────────────────────── */

const P3 = { lx: 220, rx: 650, bar: 116, chipX: 355, chipW: 160, rows: [250, 340, 430], h: 64, numY: 80, denY: 152 };

function SabTarget({ item, index, stage, wrong, captured, api, tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const [cfg, setCfg] = useState<any>(item);
  const [factor, setFactor] = useState<number | null>(null);
  const [fTyped, setFTyped] = useState("");
  const [litPair, setLitPair] = useState(false);
  const [partner, setPartner] = useState<any>(null);
  const [shownNow, setShownNow] = useState(false);
  const [child, setChild] = useState<number[] | null>(null);
  const [touched, setTouched] = useState(false);
  const [ringChip, setRingChip] = useState(false);   /* the bay asking for the factor again */
  const fRef = useRef("");
  const cfgRef = useRef(cfg); cfgRef.current = cfg;
  const factorRef = useRef<number | null>(null);
  const saidGate = useRef(false);
  const nudgeTimer = useRef<any>(null);
  const setupFor = useRef(index);
  const busy = tl.busy;
  const base = cfg.base, a0 = base[0], b0 = base[1], want = cfg.answer;

  useEffect(() => {
    if (stage !== "ask" || setupFor.current === index) return;
    setupFor.current = index;
    tl.stop();
    setCfg(item); setFactor(null); factorRef.current = null; fRef.current = ""; setFTyped("");
    setLitPair(false); setPartner(null); setShownNow(false); setChild(null); setTouched(false);
    saidGate.current = false; setRingChip(false);
    api.capture(null); api.lock(false);
  }, [stage, index]);
  useEffect(() => () => clearTimeout(nudgeTimer.current), []);

  /* the partner strip: a multiply spreads the cuts, a divide pairs them off, and the colour holds */
  const partnerSteps = () => {
    const S: any[] = [];
    if (cfg.op === "×") {
      const k = cfg.f;
      S.push([60, () => setPartner({ n: b0, k, a: a0, lo: 0, hi: 0 })]);
      for (let i = 1; i <= b0; i++) { const ii = i; S.push([Math.max(60, Math.round(900 / b0)), () => { setPartner({ n: b0, k, a: a0, lo: 0, hi: ii }); api.sfx.tick(); }]); }
    } else {
      const n = want[1], k = cfg.f;
      S.push([60, () => setPartner({ n, k, a: want[0], lo: 0, hi: n })]);
      for (let i = 1; i <= n; i++) { const ii = i; S.push([Math.max(60, Math.round(900 / n)), () => { setPartner({ n, k, a: want[0], lo: ii, hi: n }); api.sfx.tick(); }]); }
    }
    S.push([240, () => setShownNow(true)]);
    return S;
  };

  const nameFactor = () => {
    const cf = cfgRef.current, given = cf.at === "top" ? cf.base[0] : cf.base[1];
    const f = Number(fRef.current);
    if (!fRef.current || !f) return;
    const right = cf.op === "×" ? given * f === cf.given : given % f === 0 && given / f === cf.given;
    if (right) { factorRef.current = f; setFactor(f); setLitPair(false); api.capture(null); api.sfx.tick(); }
    else { setLitPair(true); fRef.current = ""; setFTyped(""); }
  };
  const padKey = (k: string) => {
    if (k === "enter") { nameFactor(); return; }
    if (k === "back") { fRef.current = fRef.current.slice(0, -1); setFTyped(fRef.current); return; }
    if (k === "clear") { fRef.current = ""; setFTyped(""); return; }
    if (/^[0-9]$/.test(k) && fRef.current.length < 2) { fRef.current = (fRef.current + k).replace(/^0+(?=\d)/, ""); setFTyped(fRef.current); }
  };
  const openCell = () => {
    if (factorRef.current || busy) return;
    setTouched(true);
    api.capture(padKey);
  };
  /* the factor is named before the blank is written: until it is, the slot does not answer. The bay
     rings the arrow that is waiting and says so once, and nothing is marked or counted as a try. */
  const gateShut = () => {
    setRingChip(true);
    clearTimeout(nudgeTimer.current);
    nudgeTimer.current = setTimeout(() => setRingChip(false), 1400);
    if (!saidGate.current) { saidGate.current = true; api.say("Name the factor on the arrow first, then write the fraction."); }
  };
  api.onEnter(stage === "ask" ? (v: any) => {
    if (factorRef.current === null) { gateShut(); return; }
    api.submit(v);
  } : null);
  /* the teacher agent names the factor on the bay, as a child does, and then Enter answers */
  HOOK.check = () => {
    if (factorRef.current === null && stage === "ask") {
      factorRef.current = cfgRef.current.f; setFactor(cfgRef.current.f); setLitPair(false); api.capture(null);
    }
    return undefined;
  };
  HOOK.nameFactor = () => { factorRef.current = cfgRef.current.f; setFactor(cfgRef.current.f); api.capture(null); };

  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    setTouched(true);
    const p = sabPair(wrong.value);
    const S: any[] = [[80, () => { setLitPair(false); factorRef.current = cfg.f; setFactor(cfg.f); }], [600, () => {}]];
    if (p && p[1] > 0) S.push([700, () => setChild(p)]);
    S.push([800, () => {}]);
    S.push(...partnerSteps());
    S.push([400, () => {}]);
    tl.run(S, () => api.lock(false));
  }, [wrong]);

  useEffect(() => {
    if (stage !== "win") return;
    tl.run([[60, () => { factorRef.current = cfg.f; setFactor(cfg.f); setChild(null); }], ...partnerSteps()]);
  }, [stage]);

  const gx = sabEnd(a0, b0);
  const deep = child ? P3.rows[2] + P3.h : P3.rows[1] + P3.h;
  const live = stage === "ask" && !factor && !busy;
  const givenY = cfg.at === "top" ? P3.numY : P3.denY;
  const chipText = (mine: boolean) => {
    if (mine && captured) return cfg.op + " " + fTyped;
    return cfg.op + " " + (factor === null ? "?" : factor);
  };
  const chip = (y: number, mine: boolean) => (
    <g>
      <rect x={P3.chipX} y={y - 32} width={P3.chipW} height={64} rx={16}
        fill="#FFFFFF" stroke={mine && captured ? C.accent : C.rule} strokeWidth={mine && captured ? 4 : 2} />
      <text x={P3.chipX + P3.chipW / 2} y={y + 14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={SAB_LINE}>{chipText(mine)}</text>
      {mine && captured && (
        <rect className="c4-caret" x={P3.chipX + P3.chipW / 2 + fTyped.length * 13 + 26} y={y - 18} width={4} height={36} rx={2} fill={C.accent} />
      )}
    </g>
  );
  const arrow = (y: number) => (
    <g stroke={SAB_LINE} strokeWidth={3} fill="none">
      <line x1={P3.lx + 62} y1={y} x2={P3.chipX - 8} y2={y} />
      <line x1={P3.chipX + P3.chipW + 8} y1={y} x2={P3.rx - 70} y2={y} />
      <path d={"M " + (P3.rx - 84) + " " + (y - 11) + " L " + (P3.rx - 70) + " " + y + " L " + (P3.rx - 84) + " " + (y + 11)} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
  const ring = (cx: number, y: number) => <rect x={cx - 62} y={y - 42} width={124} height={84} rx={16} fill="none" stroke={C.accent} strokeWidth={4} />;

  api.share({ phase: 3, topFraction: base, targetGiven: { at: cfg.at, value: cfg.given },
    multiplier: cfg.op === "×" ? factor : null, divisor: cfg.op === "÷" ? factor : null,
    bottomFraction: shownNow ? want : null });

  return (
    <g>
      <SabFrac cx={P3.lx} y={P3.bar} a={a0} b={b0} size={T.display} C={C} />
      <SabFrac cx={P3.rx} y={P3.bar} size={T.display} fill={SAB_ROSE_INK} C={C}
        a={cfg.at === "top" ? cfg.given : shownNow ? want[0] : null}
        b={cfg.at === "bottom" ? cfg.given : shownNow ? want[1] : null} />
      {arrow(P3.numY)}
      {arrow(P3.denY)}
      {chip(P3.numY, cfg.at === "top")}
      {chip(P3.denY, cfg.at === "bottom")}
      {litPair && ring(P3.lx, givenY)}
      {litPair && ring(P3.rx, givenY)}
      {ringChip && factor === null && (
        <rect x={P3.chipX - 6} y={givenY - 42} width={P3.chipW + 12} height={84} rx={20} fill="none" stroke={C.accent} strokeWidth={5} />
      )}
      {live && (
        <SabCell id="factor" enabled={live && !captured} onPress={openCell}
          label={"Name what " + (cfg.at === "top" ? a0 : b0) + " was " + (cfg.op === "×" ? "multiplied" : "divided") + " by"}
          x={P3.chipX} y={givenY - 36} w={P3.chipW} h={72} />
      )}

      <SabEdge y1={P3.rows[0] - 10} y2={deep + 12} />
      <SabStrip y={P3.rows[0]} h={P3.h} n={b0} a={a0} />
      <SabFrac cx={LX} y={P3.rows[0] + P3.h / 2} a={a0} b={b0} C={C} />
      {partner
        ? <SabStrip y={P3.rows[1]} h={P3.h} n={partner.n} a={partner.a} k={partner.k} lo={partner.lo} hi={partner.hi} />
        : <SabStrip y={P3.rows[1]} h={P3.h} blank />}
      <SabFrac cx={LX} y={P3.rows[1] + P3.h / 2} a={shownNow ? want[0] : null} b={shownNow ? want[1] : null} fill={SAB_ROSE_INK} C={C} />
      {child && <SabStrip y={P3.rows[2]} h={P3.h} n={child[1]} a={child[0]} />}
      {child && <SabFrac cx={LX} y={P3.rows[2] + P3.h / 2} a={child[0]} b={child[1]} C={C} />}
      {child && child[0] > child[1] && (
        <text x={SX + SW / 2} y={P3.rows[2] + P3.h / 2 + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF">{tx("more than one whole")}</text>
      )}
      <SabGuide x={gx} y1={P3.rows[0] - 8} y2={deep + 10} />
      {live && !touched && !captured && <Invite x={P3.chipX + P3.chipW / 2} y={givenY} r={52} C={C} />}
    </g>
  );
}

/* ── phase 4: the cross bench, with every picture put away ───────────────────────────────── */

const P4 = { xf: [230, 640], bar: 118, numY: 82, denY: 154, rows: [262, 352], h: 64 };

function SabCross({ item, index, stage, wrong, typed, api, tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const [cfg, setCfg] = useState<any>(item);
  const [lines, setLines] = useState<string[]>([]);
  const [right, setRight] = useState(false);
  const [verdict, setVerdict] = useState<string | null>(null);
  const [strips, setStrips] = useState(false);
  const [touched, setTouched] = useState(false);
  const linesRef = useRef<string[]>([]);
  const setupFor = useRef(index);
  const busy = tl.busy;
  const nums: any = { a: cfg.p[0], b: cfg.p[1], c: cfg.q[0], d: cfg.q[1] };

  useEffect(() => {
    if (stage !== "ask" || setupFor.current === index) return;
    setupFor.current = index;
    tl.stop();
    setCfg(item); linesRef.current = []; setLines([]); setRight(false); setVerdict(null); setStrips(false); setTouched(false);
    api.lock(false);
  }, [stage, index]);

  const centre = (h: string) => ({ x: h === "a" || h === "b" ? P4.xf[0] : P4.xf[1], y: h === "a" || h === "c" ? P4.numY : P4.denY });
  const anchor = (h: string) => {
    const c = centre(h), half = String(nums[h]).length * T.display * 0.31 + 16;
    return { x: c.x + (h === "a" || h === "b" ? half : -half), y: c.y };
  };
  const keyOf = (u: string, v: string) => {
    const s = [u, v].sort().join("");
    return s === "ad" || s === "bc" || s === "ac" || s === "bd" ? s : null;
  };
  const crossOf: any = { a: "ad", d: "ad", b: "bc", c: "bc" };
  const addLine = (k: string | null) => {
    if (!k || linesRef.current.indexOf(k) >= 0) return;
    const next = [...linesRef.current, k].slice(-2);
    linesRef.current = next; setLines(next); api.sfx.tick();
  };
  const live = (stage === "ask" || stage === "teach") && !busy && !right;
  const drag = useDrag((payload: any, p: any, moved: boolean) => {
    if (!live) return;
    setTouched(true);
    if (!moved) { addLine(crossOf[payload.h]); return; }
    let best: string | null = null, far = 1e9;
    ["a", "b", "c", "d"].forEach((h) => {
      const c = centre(h), d = Math.hypot(c.x - p.x, c.y - p.y);
      if (d < far) { far = d; best = h; }
    });
    if (best && far < 120 && best !== payload.h) addLine(keyOf(payload.h, best));
  });

  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    tl.run([[500, () => { setRight(true); api.sfx.tick(); }], [800, () => setVerdict(cfg.verdict)], [500, () => {}]], () => api.lock(false));
  }, [wrong]);

  useEffect(() => {
    if (stage !== "win") return;
    tl.run([[80, () => setRight(true)], [600, () => setVerdict(cfg.verdict)], [500, () => setStrips(true)]]);
  }, [stage]);

  const vals = slotPartsOf(typed, 2);
  const productOf = (k: string) => (k === "ad" ? cfg.p[0] * cfg.q[1] : k === "bc" ? cfg.q[0] * cfg.p[1] : null);
  const boxAt = (k: string) => {
    const A = anchor(k[0]), B = anchor(k[1]);
    /* a crossing product sits out near the end of its own line, so the X in the middle stays in sight */
    if (k === "ad") return { x: A.x + (B.x - A.x) * 0.78, y: A.y + (B.y - A.y) * 0.78 };
    if (k === "bc") return { x: A.x + (B.x - A.x) * 0.22, y: A.y + (B.y - A.y) * 0.22 };
    return { x: (A.x + B.x) / 2, y: A.y + (k === "ac" ? -46 : 46) };
  };
  const productBox = (k: string, text: string, strong: boolean, i: number) => {
    const at = boxAt(k);
    return (
      <g key={"p" + k + i}>
        <rect x={at.x - 50} y={at.y - 26} width={100} height={52} rx={12} fill="#FFFFFF"
          stroke={strong ? SAB_LINE : C.rule} strokeWidth={strong ? 3 : 2} strokeDasharray={text ? undefined : "8 6"} />
        {text ? <text x={at.x} y={at.y + 13} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={SAB_LINE}>{text}</text> : null}
      </g>
    );
  };
  const lineOf = (k: string, strong: boolean) => {
    const A = anchor(k[0]), B = anchor(k[1]);
    return <line key={(strong ? "s" : "l") + k} x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke={SAB_LINE}
      strokeWidth={strong ? 8 : 4} strokeLinecap="round" strokeDasharray={strong ? "16 12" : undefined} />;
  };
  const deep = strips ? P4.rows[1] + P4.h : 0;

  api.share({ phase: 4, topFraction: cfg.p, bottomFraction: cfg.q, lines,
    crossProducts: verdict ? [productOf("ad"), productOf("bc")] : null, verdict });

  return (
    <g>
      {/* the bench: the pair written on it, and no picture at all */}
      <rect x={SX} y={4} width={730} height={246} rx={22} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
      <SabFrac cx={P4.xf[0]} y={P4.bar} a={cfg.p[0]} b={cfg.p[1]} size={T.display} C={C} />
      <SabFrac cx={P4.xf[1]} y={P4.bar} a={cfg.q[0]} b={cfg.q[1]} size={T.display} C={C} />

      {lines.map((k) => lineOf(k, false))}
      {right && ["ad", "bc"].map((k) => lineOf(k, true))}
      {drag.drag && drag.drag.moved && (() => {
        const A = anchor(drag.drag.payload.h);
        return <line x1={A.x} y1={A.y} x2={drag.drag.x} y2={drag.drag.y} stroke={C.dim} strokeWidth={4} strokeLinecap="round" />;
      })()}
      {lines.map((k, i) => (right && (k === "ad" || k === "bc") ? null : productBox(k, vals[i] || "", false, i)))}
      {right && ["ad", "bc"].map((k, i) => productBox(k, String(productOf(k)), true, 9 + i))}

      {["a", "b", "c", "d"].map((h) => {
        const c = centre(h), pay = { h };
        return (
          <g key={h} className={live ? "c4-piece" : ""}
            {...(live ? { ...control("num-" + h, "Draw a line from the " + (h === "a" || h === "c" ? "top" : "bottom") + " number " + nums[h]), ...drag.bind(pay), ...drag.keys(pay) } : {})}>
            <rect x={c.x - 64} y={h === "a" || h === "c" ? 44 : 118} width={128} height={74} fill="transparent" />
          </g>
        );
      })}

      {/* the verdict, read off the products and never off the fractions */}
      <rect x={800} y={40} width={266} height={180} rx={20} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} strokeDasharray={verdict ? undefined : "11 9"} />
      <text x={933} y={84} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={mix(C.ink, "#FFFFFF", 0.3)}>{tx("the verdict")}</text>
      {verdict && <text x={933} y={148} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={SAB_LINE}>{tx(verdict === "yes" ? "equal" : "not equal")}</text>}
      {verdict && <text x={933} y={196} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={SAB_ROSE_INK}>{tx(verdict === "yes" ? "equivalent" : "not equivalent")}</text>}

      {strips && <SabEdge y1={P4.rows[0] - 10} y2={deep + 12} />}
      {strips && <SabStrip y={P4.rows[0]} h={P4.h} n={cfg.p[1]} a={cfg.p[0]} />}
      {strips && <SabFrac cx={LX} y={P4.rows[0] + P4.h / 2} a={cfg.p[0]} b={cfg.p[1]} C={C} />}
      {strips && <SabStrip y={P4.rows[1]} h={P4.h} n={cfg.q[1]} a={cfg.q[0]} />}
      {strips && <SabFrac cx={LX} y={P4.rows[1] + P4.h / 2} a={cfg.q[0]} b={cfg.q[1]} fill={SAB_ROSE_INK} C={C} />}
      {strips && <SabGuide x={sabEnd(cfg.p[0], cfg.p[1])} y1={P4.rows[0] - 8} y2={deep + 10} />}

      {live && !touched && !lines.length && <Invite x={P4.xf[0]} y={P4.numY} r={54} C={C} />}
    </g>
  );
}

/* ── Free play: any fraction, any multiplier, and the multiples row ──────────────────────── */

function SabFree({ api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const [fa, setFa] = useState(2);
  const [fb, setFb] = useState(7);
  const [fk, setFk] = useState(2);
  const [lower, setLower] = useState<any>(null);
  const [lab, setLab] = useState<number[] | null>(null);
  const [row, setRow] = useState<number[][]>([]);
  const clear = () => { tl.stop(); setLower(null); setLab(null); setRow([]); };
  const setTop = (a: number, b: number) => { clear(); setFa(Math.max(0, Math.min(a, b))); setFb(b); };
  const grow = () => {
    const S: any[] = [[60, () => { setLower({ n: fb, k: fk, a: fa, lo: 0, hi: 0 }); setLab(null); }]];
    for (let i = 1; i <= fb; i++) { const ii = i; S.push([Math.max(70, Math.round(1000 / fb)), () => { setLower({ n: fb, k: fk, a: fa, lo: 0, hi: ii }); api.sfx.tick(); }]); }
    S.push([200, () => setLab([fa * fk, fb * fk])]);
    tl.run(S);
  };
  const shrink = () => {
    const n = fb / fk;
    const S: any[] = [[60, () => { setLower({ n, k: fk, a: fa / fk, lo: 0, hi: n }); setLab(null); }]];
    for (let i = 1; i <= n; i++) { const ii = i; S.push([Math.max(70, Math.round(1000 / n)), () => { setLower({ n, k: fk, a: fa / fk, lo: ii, hi: n }); api.sfx.tick(); }]); }
    S.push([200, () => setLab([fa / fk, fb / fk])]);
    tl.run(S);
  };
  const runRow = () => {
    const S: any[] = [[60, () => setRow([])]];
    for (let k = 2; k <= 4; k++) { const kk = k; S.push([420, () => { setRow((r: number[][]) => [...r, [fa * kk, fb * kk]]); api.sfx.tick(); }]); }
    tl.run(S);
  };
  const canShrink = fk > 1 && fa % fk === 0 && fb % fk === 0 && fb / fk >= 2;
  const glyph = (s: string) => <text y={14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{s}</text>;

  api.share({ phase: "free", topFraction: [fa, fb], bottomFraction: lab, multiplier: fk, multiplesRow: row });

  return (
    <g>
      <SabEdge y1={8} y2={212} />
      <SabStrip y={20} h={76} n={fb} a={fa} />
      <SabFrac cx={LX} y={58} a={fa} b={fb} C={C} />
      {lower ? <SabStrip y={124} h={76} n={lower.n} a={lower.a} k={lower.k} lo={lower.lo} hi={lower.hi} /> : <SabStrip y={124} h={76} blank />}
      <SabFrac cx={LX} y={162} a={lab ? lab[0] : null} b={lab ? lab[1] : null} fill={SAB_ROSE_INK} C={C} />
      <SabGuide x={sabEnd(fa, fb)} y1={6} y2={214} />

      <text x={922} y={62} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("top")}</text>
      <Key id="top-less" label="One filled part fewer" x={936} y={12} w={72} h={72} C={C} onClick={() => setTop(fa - 1, fb)}>{glyph("−")}</Key>
      <Key id="top-more" label="One filled part more" x={1014} y={12} w={72} h={72} C={C} onClick={() => setTop(fa + 1, fb)}>{glyph("+")}</Key>
      <text x={922} y={146} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("cuts")}</text>
      <Key id="cuts-less" label="One cut fewer" x={936} y={96} w={72} h={72} C={C} onClick={() => setTop(fa, Math.max(2, fb - 1))}>{glyph("−")}</Key>
      <Key id="cuts-more" label="One cut more" x={1014} y={96} w={72} h={72} C={C} onClick={() => setTop(fa, Math.min(12, fb + 1))}>{glyph("+")}</Key>
      <text x={922} y={230} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{lang === "hi" ? fk + " से" : lang === "gu" ? fk + " થી" : "by " + fk}</text>
      <Key id="by-less" label="A smaller number" x={936} y={180} w={72} h={72} C={C} onClick={() => { clear(); setFk(Math.max(2, fk - 1)); }}>{glyph("−")}</Key>
      <Key id="by-more" label="A bigger number" x={1014} y={180} w={72} h={72} C={C} onClick={() => { clear(); setFk(Math.min(5, fk + 1)); }}>{glyph("+")}</Key>
      <Key id="grow" label={"Multiply both numbers by " + fk} x={830} y={258} w={124} h={72} C={C} primary onClick={grow}>
        <text y={14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill="#FFFFFF">{"× " + fk}</text>
      </Key>
      <Key id="shrink" label={"Divide both numbers by " + fk} x={962} y={258} w={124} h={72} C={C} disabled={!canShrink} onClick={shrink}>
        <text y={14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={canShrink ? C.ink : mix(C.ink, C.panel, 0.5)}>{"÷ " + fk}</text>
      </Key>

      <Key id="run-row" label="Run the multiples" x={40} y={396} w={200} h={72} C={C} onClick={runRow}>
        <text y={12} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("multiples")}</text>
      </Key>
      {[0, 1, 2].map((i) => <SabWriting key={i} cx={380 + i * 220} top={336} p={row[i] || null} ghost C={C} />)}
    </g>
  );
}

/* ── the working area: 1086 x 528, origin at its top-left ────────────────────────────────── */
function Work(props: any) {
  const { phase, stage, api } = props;
  api.onEnter(null);
  HOOK.check = undefined; HOOK.agentBuild = undefined; HOOK.fill = undefined; HOOK.nameFactor = undefined;
  if (stage === "free") return <SabFree {...props} />;
  if (phase.n === 1) return <SabSame {...props} />;
  if (phase.n === 2) return <SabBuild {...props} />;
  if (phase.n === 3) return <SabTarget {...props} />;
  return <SabCross {...props} />;
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const L = (result && result.last) || {};
  const sh = L.shared || {};
  const frame = <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />;
  if (L.kind === "choice") {
    const list = sh.strips || [];
    const step = (h - 14) / Math.max(list.length, 1);
    return (
      <g>
        {frame}
        {list.map((s: number[], i: number) => <SabStrip key={i} x={14} w={w - 28} y={9 + i * step} h={Math.max(12, step - 7)} n={s[1]} a={s[0]} />)}
      </g>
    );
  }
  if (L.kind === "cross") {
    const ps = slotPartsOf(L.value, 2);
    if (!ps[0] || !ps[1]) return null;
    return (
      <g>
        {frame}
        <text x={w / 2} y={h / 2 + 11} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={SAB_LINE}>{ps[0] + (ps[0] === ps[1] ? " = " : " ≠ ") + ps[1]}</text>
      </g>
    );
  }
  const p = sabPair(L.value) || (Array.isArray(L.answer) ? L.answer : null);
  if (!p) return null;
  return (
    <g>
      {frame}
      <SabStrip x={14} w={140} y={h / 2 - 15} h={30} n={p[1]} a={p[0]} />
      <SabFrac cx={w - 48} y={h / 2} a={p[0]} b={p[1]} size={T.micro} fill={SAB_ROSE_INK} C={C} />
    </g>
  );
}

function SameAmountBench(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default SameAmountBench;
