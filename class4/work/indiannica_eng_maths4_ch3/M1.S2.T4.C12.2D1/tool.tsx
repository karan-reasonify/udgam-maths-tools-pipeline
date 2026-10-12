/* ═══ M1.S2.T4.C12.2D1 · rules_rail · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "rules_rail";
const MEDIA_ID = "M1.S2.T4.C12.2D1";
const TOOL_NAME = "Rules Rail";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A number rides the rail. Say what a rule card will do to it before you drop the card."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every rule run without a column being worked, and one thing subtraction would not let you do.";
/* said when the child opens Free play from the summary page. The plan's line also names the fact bay;
   free play here is the rail and the order gate (the bay needs a fact to build), so the line says so */
const FREE_LINE = "Free play. Any number, any rule card, and the order gate open.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r13+: `lineFor(line, lang, TR)`); the
   English above and below stays what the checks read. NCERT class 4 terms: इकाई दहाई सैकड़ा हज़ार /
   એકમ દશક શતક હજાર, घटाना / બાદબાકી, जोड़ / સરવાળો. Digits stay digits: the runtime speaks them in the
   language in use. A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Rules Rail": "नियमों की पटरी",
    "A number rides the rail. Say what a rule card will do to it before you drop the card.": "एक संख्या पटरी पर चलती है। नियम कार्ड डालने से पहले बताओ कि वह उसका क्या करेगा।",
    "Every rule run without a column being worked, and one thing subtraction would not let you do.": "हर नियम बिना खाने हल किए चला, और एक बात जो घटाना तुम्हें नहीं करने देता।",
    "Free play. Any number, any rule card, and the order gate open.": "मुक्त खेल। कोई भी संख्या, कोई भी नियम कार्ड, और क्रम का फाटक खुला।",
    "The order cannot be swapped": "क्रम बदला नहीं जा सकता",
    "Swap them over. Does subtraction let you? Did adding let you?": "दोनों की जगह बदलो। क्या घटाना ऐसा करने देता है? क्या जोड़ने ने करने दिया?",
    "Can more be taken out of a number than the number holds?": "क्या किसी संख्या में से उससे ज़्यादा निकाला जा सकता है?",
    "Look at the lane that stopped. Is there enough in its first number to take the second away?": "जो रास्ता रुक गया, उसे देखो। क्या उसकी पहली संख्या में दूसरी को घटाने लायक है?",
    "The greater number goes first in a subtraction, and the two cannot be swapped. In an addition they can.": "घटाने में बड़ी संख्या पहले आती है, और दोनों की जगह नहीं बदल सकती। जोड़ में बदल सकती है।",
    "You learned: the greater number goes first; the two cannot swap.": "तुमने सीखा: बड़ी संख्या पहले आती है; दोनों की जगह नहीं बदलती।",
    "Take 24 from 61. Now try taking 61 from 24. Is it the same answer?": "61 में से 24 घटाओ। अब 24 में से 61 घटाकर देखो। क्या उत्तर वही है?",
    "Same answer both ways?": "दोनों तरह से एक ही उत्तर?",
    "Which of the two numbers is leading in the lane that stopped?": "जो रास्ता रुका, उसमें दोनों में से कौन सी संख्या आगे है?",
    "yes": "हाँ", "no": "नहीं",
    "Look at 92,415 − 30,207. Does 30,207 − 92,415 give the same?": "92,415 − 30,207 देखो। क्या 30,207 − 92,415 से वही मिलता है?",
    "In which lane is the greater number on top?": "किस रास्ते में बड़ी संख्या ऊपर है?",
    "In addition you may swap the two numbers over. What is the rule in subtraction?": "जोड़ में तुम दोनों संख्याओं की जगह बदल सकते हो। घटाने में नियम क्या है?",
    "Rule for take away?": "घटाने का नियम?",
    "Which lane came out with an answer, and which number led it?": "किस रास्ते से उत्तर निकला, और उसमें कौन सी संख्या आगे थी?",
    "greater first": "बड़ी पहले", "any order": "किसी भी क्रम में", "smaller first": "छोटी पहले",
    "One, nothing, and the number itself": "एक, शून्य, और वही संख्या",
    "Take nothing. Take one. Take the whole thing. Say each answer before you drop it.": "कुछ मत घटाओ। एक घटाओ। पूरी संख्या घटाओ। कार्ड डालने से पहले हर उत्तर बोलो।",
    "If nothing left the card, what can be standing on it?": "अगर कार्ड से कुछ नहीं निकला, तो उस पर क्या होगा?",
    "Say the number on the card, then say how much the card on the rail takes from it.": "कार्ड की संख्या बोलो, फिर बताओ पटरी वाला कार्ड उसमें से कितना घटाता है।",
    "Taking nothing leaves a number alone. Taking one steps it back to the number just before it. Taking a number from itself empties it.": "शून्य घटाने से संख्या वैसी ही रहती है। एक घटाने से वह ठीक पहले वाली संख्या बनती है। संख्या में से वही संख्या घटाने पर शून्य बचता है।",
    "You learned: nothing leaves it, one steps it back, itself empties it.": "तुमने सीखा: शून्य से वैसी ही, एक से पिछली, खुद से शून्य।",
    "Write the answers. 45,208 − 0. Then 45,208 − 1. Then take 45,208 from itself.": "उत्तर लिखो। 45,208 − 0। फिर 45,208 − 1। फिर 45,208 में से उसी को घटाओ।",
    "What is left?": "क्या बचा?",
    "How much was actually taken off the card?": "कार्ड से असल में कितना घटाया गया?",
    "Fill the blanks. 67,341 − 0. Then take 67,341 from itself.": "खाली जगह भरो। 67,341 − 0। फिर 67,341 में से उसी को घटाओ।",
    "Did the card on the rail take nothing at all, or all of it?": "क्या पटरी वाले कार्ड ने कुछ भी नहीं घटाया, या सब कुछ?",
    "Fill the blank. Which number, take away 1, leaves 38,469?": "खाली जगह भरो। किस संख्या में से 1 घटाने पर 38,469 बचता है?",
    "Fill the blank": "खाली जगह भरो",
    "Taking one left 38,469. Was the blank bigger or smaller than that?": "एक घटाने पर 38,469 बचा। खाली जगह वाली संख्या उससे बड़ी थी या छोटी?",
    "Ten, a hundred and a thousand each touch one digit": "दस, सौ और हज़ार, हर एक बस एक अंक बदलता है",
    "Which digit is going to move this time? Say it before you drop the card.": "इस बार कौन सा अंक बदलेगा? कार्ड डालने से पहले बोलो।",
    "Which end of the number do you count the places from?": "संख्या के किस सिरे से स्थान गिनते हो?",
    "Count the places from the ones end. Ones, tens, hundreds, thousands.": "इकाई वाले सिरे से स्थान गिनो। इकाई, दहाई, सैकड़ा, हज़ार।",
    "Taking ten drops the tens digit. Taking a hundred drops the hundreds digit, and a thousand the thousands digit. Nothing else moves.": "दस घटाने से दहाई का अंक एक घटता है। सौ घटाने से सैकड़े का अंक, और हज़ार से हज़ार का अंक। बाकी कुछ नहीं बदलता।",
    "You learned: 10, 100 or 1,000 drops only the digit of its own place.": "तुमने सीखा: 10, 100 या 1,000 बस अपने स्थान का अंक घटाते हैं।",
    "Take 100 from 74,536. Then take 1,000 from 74,536. Which digit moved each time?": "74,536 में से 100 घटाओ। फिर 74,536 में से 1,000 घटाओ। हर बार कौन सा अंक बदला?",
    "Which place does this card name?": "यह कार्ड किस स्थान का नाम बताता है?",
    "Take 10 from 52,836. Then take 1,000 from 52,836.": "52,836 में से 10 घटाओ। फिर 52,836 में से 1,000 घटाओ।",
    "Which digit of 52,836 is the tens digit, and which is the thousands?": "52,836 में दहाई का अंक कौन सा है, और हज़ार का कौन सा?",
    "A child takes 1,000 from 83,472. The child writes 83,372. Is that right? Type what it should be.": "एक बच्चा 83,472 में से 1,000 घटाता है। वह 83,372 लिखता है। क्या यह सही है? जो होना चाहिए, वह लिखो।",
    "What should it be?": "क्या होना चाहिए?",
    "Which place did the other child take the thousand from?": "उस बच्चे ने हज़ार किस स्थान से घटाया?",
    "Every addition fact holds two subtraction facts": "हर जोड़ के तथ्य में घटाने के दो तथ्य होते हैं",
    "Three cards, and you have written one fact. How many more are hiding in them?": "तीन कार्ड, और तुमने एक तथ्य लिखा है। इनमें और कितने छिपे हैं?",
    "If one part is taken off the total, which card is left?": "अगर कुल में से एक भाग घटाओ, तो कौन सा कार्ड बचता है?",
    "Start each line from the total, the greatest of the three cards.": "हर पंक्ति कुल से शुरू करो, जो तीनों कार्डों में सबसे बड़ा है।",
    "Two numbers and their total hold one addition fact and two subtraction facts.": "दो संख्याओं और उनके कुल में जोड़ का एक तथ्य और घटाने के दो तथ्य होते हैं।",
    "You learned: one addition fact gives two subtraction facts.": "तुमने सीखा: जोड़ के एक तथ्य से घटाने के दो तथ्य मिलते हैं।",
    "Here is an addition fact on three cards. Write the two subtraction facts it holds.": "यह तीन कार्डों पर जोड़ का एक तथ्य है। इसमें छिपे घटाने के दो तथ्य लिखो।",
    "Build both facts": "दोनों तथ्य बनाओ",
    "Which of the three cards is the total?": "तीनों कार्डों में से कुल कौन सा है?",
    "Here is another addition fact. Which two subtraction facts are inside it?": "यह जोड़ का एक और तथ्य है। इसके अंदर घटाने के कौन से दो तथ्य हैं?",
    "Which card did each of your lines start from?": "तुम्हारी हर पंक्ति किस कार्ड से शुरू हुई?",
    "Find the sum of 24,180 and 31,725. Then subtract it from 99,999.": "24,180 और 31,725 का जोड़ निकालो। फिर उसे 99,999 में से घटाओ।",
    "Add, then take away": "जोड़ो, फिर घटाओ",
    "Which number is the sum, and what is it taken from?": "जोड़ कौन सी संख्या है, और उसे किसमें से घटाया जाता है?",
    /* the working area's own lines */
    "Now open the gate.": "अब फाटक खोलो।",
    "Nothing left to take.": "घटाने को कुछ नहीं बचा।",
    "Say what is left, then press enter.": "जो बचा वह बोलो, फिर एंटर दबाओ।",
    "Both lines are full. Tap a card in a line to lift it off.": "दोनों पंक्तियाँ भरी हैं। हटाने के लिए पंक्ति के किसी कार्ड पर टैप करो।",
    "Finish that line first.": "पहले वह पंक्ति पूरी करो।",
    "Tap a card to start a line.": "कोई कार्ड टैप करके पंक्ति शुरू करो।",
    /* the working area's own words */
    "O": "इ", "T": "द", "H": "सै", "Th": "ह", "TTh": "द.ह.", "L": "ला",
    "nothing": "शून्य", "one": "एक", "itself": "वही संख्या", "ten": "दस", "a hundred": "सौ", "a thousand": "हज़ार",
    "nothing left to take": "घटाने को कुछ नहीं बचा", "nothing left": "कुछ नहीं बचा",
    "Try adding": "जोड़कर देखो", "Load the same pair as an addition": "यही जोड़ी जोड़ के रूप में लाओ",
    "cards run": "चले कार्ड", "steps": "चरण", "facts": "तथ्य", "a child wrote": "बच्चे ने लिखा",
    "before": "पहले", "after": "बाद में", "total": "कुल", "part": "भाग",
    "A new number on the rail": "पटरी पर नई संख्या", "A new pair at the gate": "फाटक पर नई जोड़ी",
    "New number": "नई संख्या", "New pair": "नई जोड़ी",
    "Open the order gate": "क्रम का फाटक खोलो", "Back to the rules rail": "नियमों की पटरी पर वापस",
    "Order gate": "क्रम फाटक", "Rules rail": "नियम पटरी",
  },
  gu: {
    "Rules Rail": "નિયમોની પટરી",
    "A number rides the rail. Say what a rule card will do to it before you drop the card.": "એક સંખ્યા પટરી પર ચાલે છે. નિયમ કાર્ડ મૂકતાં પહેલાં કહો કે તે તેનું શું કરશે.",
    "Every rule run without a column being worked, and one thing subtraction would not let you do.": "દરેક નિયમ ખાનાં ઉકેલ્યા વગર ચાલ્યો, અને એક વાત જે બાદબાકી તમને કરવા દેતી નથી.",
    "Free play. Any number, any rule card, and the order gate open.": "મુક્ત રમત. કોઈ પણ સંખ્યા, કોઈ પણ નિયમ કાર્ડ, અને ક્રમનો દરવાજો ખુલ્લો.",
    "The order cannot be swapped": "ક્રમ બદલી શકાતો નથી",
    "Swap them over. Does subtraction let you? Did adding let you?": "બંનેની જગ્યા બદલો. શું બાદબાકી એમ કરવા દે છે? શું સરવાળાએ કરવા દીધું?",
    "Can more be taken out of a number than the number holds?": "શું કોઈ સંખ્યામાંથી તેના કરતાં વધારે કાઢી શકાય?",
    "Look at the lane that stopped. Is there enough in its first number to take the second away?": "જે રસ્તો અટકી ગયો તે જુઓ. શું તેની પહેલી સંખ્યામાં બીજીને બાદ કરવા જેટલું છે?",
    "The greater number goes first in a subtraction, and the two cannot be swapped. In an addition they can.": "બાદબાકીમાં મોટી સંખ્યા પહેલાં આવે, અને બંનેની જગ્યા બદલાય નહીં. સરવાળામાં બદલાય.",
    "You learned: the greater number goes first; the two cannot swap.": "તમે શીખ્યા: મોટી સંખ્યા પહેલાં આવે; બંનેની જગ્યા બદલાય નહીં.",
    "Take 24 from 61. Now try taking 61 from 24. Is it the same answer?": "61 માંથી 24 બાદ કરો. હવે 24 માંથી 61 બાદ કરી જુઓ. શું જવાબ એ જ છે?",
    "Same answer both ways?": "બંને રીતે એક જ જવાબ?",
    "Which of the two numbers is leading in the lane that stopped?": "જે રસ્તો અટક્યો, તેમાં બેમાંથી કઈ સંખ્યા આગળ છે?",
    "yes": "હા", "no": "ના",
    "Look at 92,415 − 30,207. Does 30,207 − 92,415 give the same?": "92,415 − 30,207 જુઓ. શું 30,207 − 92,415 થી એ જ મળે છે?",
    "In which lane is the greater number on top?": "કયા રસ્તામાં મોટી સંખ્યા ઉપર છે?",
    "In addition you may swap the two numbers over. What is the rule in subtraction?": "સરવાળામાં તમે બંને સંખ્યાની જગ્યા બદલી શકો. બાદબાકીમાં નિયમ શું છે?",
    "Rule for take away?": "બાદબાકીનો નિયમ?",
    "Which lane came out with an answer, and which number led it?": "કયા રસ્તામાંથી જવાબ નીકળ્યો, અને તેમાં કઈ સંખ્યા આગળ હતી?",
    "greater first": "મોટી પહેલાં", "any order": "કોઈ પણ ક્રમમાં", "smaller first": "નાની પહેલાં",
    "One, nothing, and the number itself": "એક, શૂન્ય, અને એ જ સંખ્યા",
    "Take nothing. Take one. Take the whole thing. Say each answer before you drop it.": "કશું બાદ ન કરો. એક બાદ કરો. આખી સંખ્યા બાદ કરો. કાર્ડ મૂકતાં પહેલાં દરેક જવાબ બોલો.",
    "If nothing left the card, what can be standing on it?": "જો કાર્ડમાંથી કશું ન નીકળ્યું, તો તેના પર શું હશે?",
    "Say the number on the card, then say how much the card on the rail takes from it.": "કાર્ડ પરની સંખ્યા બોલો, પછી કહો પટરી પરનું કાર્ડ તેમાંથી કેટલું બાદ કરે છે.",
    "Taking nothing leaves a number alone. Taking one steps it back to the number just before it. Taking a number from itself empties it.": "શૂન્ય બાદ કરવાથી સંખ્યા એવી જ રહે છે. એક બાદ કરવાથી તે તરત પહેલાંની સંખ્યા બને છે. સંખ્યામાંથી એ જ સંખ્યા બાદ કરતાં શૂન્ય બચે છે.",
    "You learned: nothing leaves it, one steps it back, itself empties it.": "તમે શીખ્યા: શૂન્યથી એવી જ, એકથી પહેલાંની, પોતાનાથી શૂન્ય.",
    "Write the answers. 45,208 − 0. Then 45,208 − 1. Then take 45,208 from itself.": "જવાબ લખો. 45,208 − 0. પછી 45,208 − 1. પછી 45,208 માંથી એ જ સંખ્યા બાદ કરો.",
    "What is left?": "શું બાકી રહ્યું?",
    "How much was actually taken off the card?": "કાર્ડમાંથી ખરેખર કેટલું બાદ થયું?",
    "Fill the blanks. 67,341 − 0. Then take 67,341 from itself.": "ખાલી જગ્યા ભરો. 67,341 − 0. પછી 67,341 માંથી એ જ સંખ્યા બાદ કરો.",
    "Did the card on the rail take nothing at all, or all of it?": "શું પટરી પરના કાર્ડે કશું બાદ ન કર્યું, કે બધું જ?",
    "Fill the blank. Which number, take away 1, leaves 38,469?": "ખાલી જગ્યા ભરો. કઈ સંખ્યામાંથી 1 બાદ કરતાં 38,469 બાકી રહે?",
    "Fill the blank": "ખાલી જગ્યા ભરો",
    "Taking one left 38,469. Was the blank bigger or smaller than that?": "એક બાદ કરતાં 38,469 બચ્યા. ખાલી જગ્યાની સંખ્યા તેનાથી મોટી હતી કે નાની?",
    "Ten, a hundred and a thousand each touch one digit": "દસ, સો અને હજાર, દરેક ફક્ત એક અંક બદલે છે",
    "Which digit is going to move this time? Say it before you drop the card.": "આ વખતે કયો અંક બદલાશે? કાર્ડ મૂકતાં પહેલાં બોલો.",
    "Which end of the number do you count the places from?": "સંખ્યાના કયા છેડાથી સ્થાન ગણો છો?",
    "Count the places from the ones end. Ones, tens, hundreds, thousands.": "એકમવાળા છેડાથી સ્થાન ગણો. એકમ, દશક, શતક, હજાર.",
    "Taking ten drops the tens digit. Taking a hundred drops the hundreds digit, and a thousand the thousands digit. Nothing else moves.": "દસ બાદ કરવાથી દશકનો અંક એક ઘટે છે. સો બાદ કરવાથી શતકનો અંક, અને હજારથી હજારનો અંક. બીજું કશું બદલાતું નથી.",
    "You learned: 10, 100 or 1,000 drops only the digit of its own place.": "તમે શીખ્યા: 10, 100 કે 1,000 ફક્ત પોતાના સ્થાનનો અંક ઘટાડે છે.",
    "Take 100 from 74,536. Then take 1,000 from 74,536. Which digit moved each time?": "74,536 માંથી 100 બાદ કરો. પછી 74,536 માંથી 1,000 બાદ કરો. દરેક વખતે કયો અંક બદલાયો?",
    "Which place does this card name?": "આ કાર્ડ કયા સ્થાનનું નામ આપે છે?",
    "Take 10 from 52,836. Then take 1,000 from 52,836.": "52,836 માંથી 10 બાદ કરો. પછી 52,836 માંથી 1,000 બાદ કરો.",
    "Which digit of 52,836 is the tens digit, and which is the thousands?": "52,836 માં દશકનો અંક કયો છે, અને હજારનો કયો?",
    "A child takes 1,000 from 83,472. The child writes 83,372. Is that right? Type what it should be.": "એક બાળક 83,472 માંથી 1,000 બાદ કરે છે. તે 83,372 લખે છે. શું તે સાચું છે? જે હોવું જોઈએ તે લખો.",
    "What should it be?": "શું હોવું જોઈએ?",
    "Which place did the other child take the thousand from?": "તે બાળકે હજાર કયા સ્થાનમાંથી બાદ કર્યા?",
    "Every addition fact holds two subtraction facts": "દરેક સરવાળાના તથ્યમાં બાદબાકીનાં બે તથ્ય હોય છે",
    "Three cards, and you have written one fact. How many more are hiding in them?": "ત્રણ કાર્ડ, અને તમે એક તથ્ય લખ્યું છે. તેમાં બીજાં કેટલાં છુપાયાં છે?",
    "If one part is taken off the total, which card is left?": "જો કુલમાંથી એક ભાગ બાદ કરો, તો કયું કાર્ડ બાકી રહે?",
    "Start each line from the total, the greatest of the three cards.": "દરેક હરોળ કુલથી શરૂ કરો, જે ત્રણેય કાર્ડમાં સૌથી મોટું છે.",
    "Two numbers and their total hold one addition fact and two subtraction facts.": "બે સંખ્યા અને તેમના કુલમાં સરવાળાનું એક તથ્ય અને બાદબાકીનાં બે તથ્ય હોય છે.",
    "You learned: one addition fact gives two subtraction facts.": "તમે શીખ્યા: સરવાળાના એક તથ્યથી બાદબાકીનાં બે તથ્ય મળે.",
    "Here is an addition fact on three cards. Write the two subtraction facts it holds.": "આ ત્રણ કાર્ડ પર સરવાળાનું એક તથ્ય છે. તેમાં રહેલાં બાદબાકીનાં બે તથ્ય લખો.",
    "Build both facts": "બંને તથ્ય બનાવો",
    "Which of the three cards is the total?": "ત્રણ કાર્ડમાંથી કુલ કયું છે?",
    "Here is another addition fact. Which two subtraction facts are inside it?": "આ સરવાળાનું બીજું એક તથ્ય છે. તેની અંદર બાદબાકીનાં કયાં બે તથ્ય છે?",
    "Which card did each of your lines start from?": "તમારી દરેક હરોળ કયા કાર્ડથી શરૂ થઈ?",
    "Find the sum of 24,180 and 31,725. Then subtract it from 99,999.": "24,180 અને 31,725 નો સરવાળો શોધો. પછી તેને 99,999 માંથી બાદ કરો.",
    "Add, then take away": "ઉમેરો, પછી બાદ કરો",
    "Which number is the sum, and what is it taken from?": "સરવાળો કઈ સંખ્યા છે, અને તેને શેમાંથી બાદ કરાય છે?",
    /* the working area's own lines */
    "Now open the gate.": "હવે દરવાજો ખોલો.",
    "Nothing left to take.": "બાદ કરવા કશું બાકી નથી.",
    "Say what is left, then press enter.": "જે બાકી રહે તે બોલો, પછી એન્ટર દબાવો.",
    "Both lines are full. Tap a card in a line to lift it off.": "બંને હરોળ ભરેલી છે. કાઢવા માટે હરોળના કોઈ કાર્ડ પર ટૅપ કરો.",
    "Finish that line first.": "પહેલાં તે હરોળ પૂરી કરો.",
    "Tap a card to start a line.": "હરોળ શરૂ કરવા કોઈ કાર્ડ પર ટૅપ કરો.",
    /* the working area's own words */
    "O": "એ", "T": "દ", "H": "શ", "Th": "હ", "TTh": "દ.હ.", "L": "લા",
    "nothing": "શૂન્ય", "one": "એક", "itself": "એ જ સંખ્યા", "ten": "દસ", "a hundred": "સો", "a thousand": "હજાર",
    "nothing left to take": "બાદ કરવા કશું બાકી નથી", "nothing left": "કશું બાકી નથી",
    "Try adding": "ઉમેરી જુઓ", "Load the same pair as an addition": "આ જ જોડ સરવાળા તરીકે લાવો",
    "cards run": "ચાલેલાં કાર્ડ", "steps": "પગલાં", "facts": "તથ્ય", "a child wrote": "બાળકે લખ્યું",
    "before": "પહેલાં", "after": "પછી", "total": "કુલ", "part": "ભાગ",
    "A new number on the rail": "પટરી પર નવી સંખ્યા", "A new pair at the gate": "દરવાજે નવી જોડ",
    "New number": "નવી સંખ્યા", "New pair": "નવી જોડ",
    "Open the order gate": "ક્રમનો દરવાજો ખોલો", "Back to the rules rail": "નિયમોની પટરી પર પાછા",
    "Order gate": "ક્રમ દરવાજો", "Rules rail": "નિયમ પટરી",
  },
};
/* "2 of 3" on the running count, in the language in use */
const rrOf = (a: any, b: any, lang: string) => (lang === "hi" ? `${b} में से ${a}` : lang === "gu" ? `${b} માંથી ${a}` : `${a} of ${b}`);

/* One entry per phase = one mount.
   items   three a phase, the plan's questions (qid).
           kind  gate    = the order gate: a pair run both ways round; a word answer, predicted, then the gate opens
                 rail    = a number on the rail and rule cards; seq = the cards dropped in turn, each answer
                           said before its card acts (a question with three blanks has three steps)
                 back    = the number that rode in is the blank: ___ − 1 = result
                 facts   = the fact bay: two subtraction lines built from the addition fact's three cards
                 sumtake = add first, then take the sum away (two steps)
           near  the item's misconception (nearMiss); a seq step carries its own */
const PHASES = [
  {
    n: 1,
    concept: "The order cannot be swapped",
    conceptId: "M1.S2.T4.C12", objectiveIds: ["O5"],
    says: ["Swap them over. Does subtraction let you? Did adding let you?"],
    /* tries: the item's miss line, then the phase's two rungs; the gate stays loaded behind all three */
    ladder: ["Can more be taken out of a number than the number holds?",
      "Look at the lane that stopped. Is there enough in its first number to take the second away?"],
    closing: "The greater number goes first in a subtraction, and the two cannot be swapped. In an addition they can.",
    learned: "You learned: the greater number goes first; the two cannot swap.",
    traceback: "Both lanes run again at walking pace: the lane led by the smaller number stops with nothing left to take, then the same pair runs as an addition and both totals land together.",
    items: [
      /* learn ML1: answer in the plan = No. 61 - 24 = 37, but 61 cannot be taken from 24 at all */
      { qid: "M1.S2.T4.C12:ML1", kind: "gate", A: 61, B: 24, answer: "no", near: "yes", winMs: 4200,
        choices: [{ id: "yes", label: "yes" }, { id: "no", label: "no" }], ask: "Same answer both ways?",
        say: "Take 24 from 61. Now try taking 61 from 24. Is it the same answer?", miss: "Which of the two numbers is leading in the lane that stopped?" },
      /* practice 1: answer in the plan = No. The first gives 62,208, and the second cannot be worked, because the greater number has to go first */
      { qid: "M1.S2.T4.C12:1", kind: "gate", A: 92415, B: 30207, answer: "no", near: "yes", winMs: 4600,
        choices: [{ id: "yes", label: "yes" }, { id: "no", label: "no" }], ask: "Same answer both ways?",
        say: "Look at 92,415 − 30,207. Does 30,207 − 92,415 give the same?", miss: "In which lane is the greater number on top?" },
      /* practice 2: answer in the plan = The two numbers cannot be swapped, and the greater one goes first.
         The gate is loaded with the book's own pair, 18 and 10 (eighteen take ten is eight, ten take eighteen is not) */
      { qid: "M1.S2.T4.C12:2", kind: "gate", A: 18, B: 10, answer: "greater first", near: "any order", winMs: 4200,
        choices: [{ id: "greater first", label: "greater first" }, { id: "any order", label: "any order" }, { id: "smaller first", label: "smaller first" }],
        ask: "Rule for take away?",
        say: "In addition you may swap the two numbers over. What is the rule in subtraction?", miss: "Which lane came out with an answer, and which number led it?" },
    ],
  },
  {
    n: 2,
    concept: "One, nothing, and the number itself",
    conceptId: "M1.S2.T4.C13", objectiveIds: ["O5"],
    says: ["Take nothing. Take one. Take the whole thing. Say each answer before you drop it."],
    ladder: ["If nothing left the card, what can be standing on it?",
      "Say the number on the card, then say how much the card on the rail takes from it."],
    closing: "Taking nothing leaves a number alone. Taking one steps it back to the number just before it. Taking a number from itself empties it.",
    learned: "You learned: nothing leaves it, one steps it back, itself empties it.",
    traceback: "The card runs again at walking pace with the place chart behind it and every digit pinned; the step back or the emptying is drawn beside its partner card, and the card ends on the right number.",
    items: [
      /* learn ML2: answer in the plan = 45,208, then 45,207, and 0 (three cards, dropped in turn) */
      { qid: "M1.S2.T4.C13:ML2", kind: "rail", start: 45208, winMs: 2800, ask: "What is left?",
        seq: [{ rule: "nothing", ans: 45208, near: 0 }, { rule: "one", ans: 45207, near: 45209 }, { rule: "itself", ans: 0, near: 45208 }],
        answer: "45,208 then 45,207 then 0",
        say: "Write the answers. 45,208 − 0. Then 45,208 − 1. Then take 45,208 from itself.", miss: "How much was actually taken off the card?" },
      /* practice 3: answer in the plan = 67,341 and 0 */
      { qid: "M1.S2.T4.C13:3", kind: "rail", start: 67341, winMs: 2800, ask: "What is left?",
        seq: [{ rule: "nothing", ans: 67341, near: 0 }, { rule: "itself", ans: 0, near: 67341 }],
        answer: "67,341 then 0",
        say: "Fill the blanks. 67,341 − 0. Then take 67,341 from itself.", miss: "Did the card on the rail take nothing at all, or all of it?" },
      /* practice 4: answer in the plan = 38,470 (the blank rode in; taking one stepped it back to 38,469) */
      { qid: "M1.S2.T4.C13:4", kind: "back", rule: "one", result: 38469, answer: 38470, near: 38468, winMs: 2800, ask: "Fill the blank",
        say: "Fill the blank. Which number, take away 1, leaves 38,469?", miss: "Taking one left 38,469. Was the blank bigger or smaller than that?" },
    ],
  },
  {
    n: 3,
    concept: "Ten, a hundred and a thousand each touch one digit",
    conceptId: "M1.S2.T4.C14", objectiveIds: ["O6"],
    says: ["Which digit is going to move this time? Say it before you drop the card."],
    ladder: ["Which end of the number do you count the places from?",
      "Count the places from the ones end. Ones, tens, hundreds, thousands."],
    closing: "Taking ten drops the tens digit. Taking a hundred drops the hundreds digit, and a thousand the thousands digit. Nothing else moves.",
    learned: "You learned: 10, 100 or 1,000 drops only the digit of its own place.",
    traceback: "The places are counted from the ones end with the named place lit; every other digit is pinned while that one drops, and the number before and after is read one under the other.",
    items: [
      /* learn ML3: answer in the plan = 74,436 and 73,536. The hundreds digit dropped first, then the thousands digit */
      { qid: "M1.S2.T4.C14:ML3", kind: "rail", start: 74536, winMs: 2800, ask: "What is left?",
        seq: [{ rule: "hundred", ans: 74436, near: 74535 }, { rule: "thousand", ans: 73536, near: 74526 }],
        answer: "74,436 then 73,536",
        say: "Take 100 from 74,536. Then take 1,000 from 74,536. Which digit moved each time?", miss: "Which place does this card name?" },
      /* practice 5: answer in the plan = 52,826 and 51,836 (each is the other's count-from-the-left slip) */
      { qid: "M1.S2.T4.C14:5", kind: "rail", start: 52836, winMs: 2800, ask: "What is left?",
        seq: [{ rule: "ten", ans: 52826, near: 51836 }, { rule: "thousand", ans: 51836, near: 52826 }],
        answer: "52,826 then 51,836",
        say: "Take 10 from 52,836. Then take 1,000 from 52,836.", miss: "Which digit of 52,836 is the tens digit, and which is the thousands?" },
      /* practice 6: answer in the plan = No. It should be 82,472, because taking a thousand drops the thousands digit
         and not the hundreds digit. The other child's 83,372 lies in the tray; the child types what it should be */
      { qid: "M1.S2.T4.C14:6", kind: "rail", start: 83472, other: 83372, winMs: 2800, ask: "What should it be?",
        seq: [{ rule: "thousand", ans: 82472, near: 83372 }], answer: 82472,
        say: "A child takes 1,000 from 83,472. The child writes 83,372. Is that right? Type what it should be.", miss: "Which place did the other child take the thousand from?" },
    ],
  },
  {
    n: 4,
    concept: "Every addition fact holds two subtraction facts",
    conceptId: "M1.S2.T4.C15", objectiveIds: ["O6"],
    says: ["Three cards, and you have written one fact. How many more are hiding in them?"],
    ladder: ["If one part is taken off the total, which card is left?",
      "Start each line from the total, the greatest of the three cards."],
    closing: "Two numbers and their total hold one addition fact and two subtraction facts.",
    learned: "You learned: one addition fact gives two subtraction facts.",
    traceback: "The three cards are read as two parts and a total with the total lit; the child's line is worked anyway, and both facts that begin from the total are written in full.",
    items: [
      /* learn ML4: answer in the plan = 67,353 - 41,203 = 26,150 and 67,353 - 26,150 = 41,203 (built from the cards, either order) */
      { qid: "M1.S2.T4.C15:ML4", kind: "facts", A: 41203, B: 26150, S: 67353, pad: "enter", winMs: 2600, ask: "Build both facts",
        answer: "67,353 − 41,203 = 26,150; 67,353 − 26,150 = 41,203",
        near: "67,353 − 41,203 = 26,150; 41,203 − 26,150 = 67,353",
        say: "Here is an addition fact on three cards. Write the two subtraction facts it holds.", miss: "Which of the three cards is the total?" },
      /* practice 7: answer in the plan = 77,737 - 35,124 = 42,613 and 77,737 - 42,613 = 35,124 */
      { qid: "M1.S2.T4.C15:7", kind: "facts", A: 35124, B: 42613, S: 77737, pad: "enter", winMs: 2600, ask: "Build both facts",
        answer: "77,737 − 35,124 = 42,613; 77,737 − 42,613 = 35,124",
        near: "77,737 − 35,124 = 42,613; 42,613 − 35,124 = 77,737",
        say: "Here is another addition fact. Which two subtraction facts are inside it?", miss: "Which card did each of your lines start from?" },
      /* practice 8: answer in the plan = 44,094, because the sum is 55,905 (add first, then take the sum away) */
      { qid: "M1.S2.T4.C15:8", kind: "sumtake", a: 24180, b: 31725, from: 99999, winMs: 2800, ask: "Add, then take away",
        seq: [{ ans: 55905, near: 55805 }, { ans: 44094, near: 44194 }], answer: "55,905 then 44,094",
        say: "Find the sum of 24,180 and 31,725. Then subtract it from 99,999.", miss: "Which number is the sum, and what is it taken from?" },
    ],
  },
];

/* ── the pieces ────────────────────────────────────────────────────────────────────────────── */
const RR_HEAD = ["O", "T", "H", "Th", "TTh", "L"];
const RR_PLACE = ["ones", "tens", "hundreds", "thousands", "ten thousands", "lakhs"];
/* the chapter's content colours: the number on top deep blue, the number taken away amber, the answer green,
   the ten lifted out of the next column vermilion, a digit rewritten after the trade rose, a zero holding a place grey */
const RR_INK = { blue: shade(CONTENT.hundred, 0.25), amber: shade(CONTENT.ten, 0.45), green: shade(CONTENT.one, 0.25),
  verm: shade(CONTENT.pointer, 0.25), rose: shade(CONTENT.bead, 0.25), grey: "#767676" };
const rrD = (v: number, k: number) => Math.floor(v / Math.pow(10, k)) % 10;
const rrN = (v: number) => String(Math.max(0, Math.floor(v))).length;
/* the rule cards: what each one takes away from the number it lands on */
const RR_RULES: any = {
  nothing: { cap: "nothing", amt: () => 0 },
  one: { cap: "one", amt: () => 1 },
  itself: { cap: "itself", amt: (v: number) => v },
  ten: { cap: "ten", amt: () => 10, place: 1 },
  hundred: { cap: "a hundred", amt: () => 100, place: 2 },
  thousand: { cap: "a thousand", amt: () => 1000, place: 3 },
};
const RR_DECK_ALL = ["nothing", "one", "itself", "ten", "hundred", "thousand"];
const rrAfter = (rule: string, v: number) => v - RR_RULES[rule].amt(v);
const rrOpText = (rule: string, v: any) => (v === null || v === undefined ? (rule === "itself" ? "− ?" : "− " + indian(RR_RULES[rule].amt(0))) : "− " + indian(RR_RULES[rule].amt(v)));
/* the places whose digit changes (a digit that vanishes counts) */
const rrChanged = (a: number, b: number) => {
  const out: number[] = [];
  for (let p = 0; p < Math.max(rrN(a), rrN(b)); p++) if (rrD(a, p) !== rrD(b, p) || (p < rrN(a) && p >= rrN(b))) out.push(p);
  return out;
};
/* free play: numbers for the rail, pairs for the gate */
const RR_FREE = [45208, 74536, 30500, 67341, 437912, 10000];
const RR_PAIRS = [[61, 24], [18, 10], [92415, 30207], [5000, 2367], [4302, 1875]];

/* the fact bay's lines, as the slot holds them: "67,353 − 41,203 = 26,150; _ − _ = _" */
const rrEncodeLines = (L: any[]) => L.map((l: any[]) => l.map((x: any) => (x === null ? "_" : indian(x))).join(" ").replace(/^(\S+) (\S+) (\S+)$/, "$1 − $2 = $3")).join("; ");
const rrParseLines = (v: any) => {
  const out: any[] = [[null, null, null], [null, null, null]];
  String(v ?? "").split(";").slice(0, 2).forEach((s, j) => {
    const m = /^\s*([\d,_]+)\s*[−-]\s*([\d,_]+)\s*=\s*([\d,_]+)\s*$/.exec(s);
    if (m) out[j] = [m[1], m[2], m[3]].map((x) => (x === "_" ? null : Number(x.replace(/,/g, ""))));
  });
  return out;
};
/* a subtraction fact begins from the total and takes one part away, leaving the other */
const rrFactOk = (it: any, l: any[]) => l[0] === it.S && ((l[1] === it.A && l[2] === it.B) || (l[1] === it.B && l[2] === it.A));
const rrFull = (L: any[]) => L.filter((l: any[]) => l.every((x: any) => x !== null));

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  colours: { top: "deep blue", takenAway: "amber", answer: "green", liftedTen: "vermilion", rewritten: "rose", placeZero: "grey" },
  gate: { lanes: "two lanes side by side, the greater number leading on the left; a lane runs its columns from the ones and stops when there is nothing left to take", pairs: [[61, 24], [92415, 30207], [18, 10]] },
  rail: { rules: RR_DECK_ALL.map((r) => ({ rule: r, takes: r === "itself" ? "the number itself" : RR_RULES[r].amt(0) })), places: RR_PLACE.slice(0, 5) },
  bay: { rows: "the addition fact on three cards, two subtraction lines built from them", free: { numbers: RR_FREE, pairs: RR_PAIRS } },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* the step of a multi-card item the child is on (set by the working area as it draws) */
const RR_NOW: any = { item: null, step: 0, pick: null };

/* judge: a word by its id; a multi-card answer card by card ("45,208 then 45,207 then 0"), or one number
   against the card the child is on; the fact bay's two lines as facts, in either order */
const judge = (item: any, v: any) => {
  if (item.kind === "facts") {
    const L = rrFull(rrParseLines(v));
    return L.length === 2 && L.every((l) => rrFactOk(item, l)) && L[0][1] !== L[1][1];
  }
  if (item.seq && item.seq.length > 1) {
    const s = String(v ?? "");
    if (/then/i.test(s)) {
      const xs = s.split(/then/i).map((x) => leadNumber(x));
      return xs.length === item.seq.length && xs.every((x, k) => x === item.seq[k].ans);
    }
    const k = RR_NOW.item === item ? RR_NOW.step : 0;
    return s !== "" && leadNumber(v) === item.seq[k].ans;
  }
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v ?? "").trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};

/* oracle: every answer re-derived by a second route. Its own subtraction counts up from what is taken to the
   number, place value by place value (no minus sign, no column code shared with the lanes or the rail) */
const rrCountUp = (from: number, to: number) => {
  if (from > to) return null;
  let x = 0;
  for (let p = 1000000; p >= 1; p = p / 10) while (from + x + p <= to) x += p;
  return x;
};
const RR_TAKE: any = { nothing: () => 0, one: () => 1, itself: (v: number) => v, ten: () => 10, hundred: () => 100, thousand: () => 1000 };
const RR_OWN: any = { ten: 1, hundred: 2, thousand: 3 };
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "gate") {
    const a = String(it.A), b = String(it.B);
    const greaterLeads = a.length !== b.length ? a.length > b.length : a > b;
    const lowerStops = rrCountUp(it.A, it.B) === null;              /* more is asked of the smaller number than it holds */
    return greaterLeads && lowerStops && it.answer === (it.choices.length === 2 ? "no" : "greater first");
  }
  if (it.kind === "rail") {
    const ok = it.seq.every((st: any) => rrCountUp(RR_TAKE[st.rule](it.start), it.start) === st.ans);
    /* a round amount changes exactly one digit, the digit of its own place */
    const one = it.seq.every((st: any) => {
      const pl = RR_OWN[st.rule];
      if (pl === undefined) return true;
      const x = String(it.start), y = String(st.ans).padStart(x.length, "0");
      return x.split("").filter((d, i) => d !== y[i]).length === 1 && x[x.length - 1 - pl] !== y[y.length - 1 - pl];
    });
    const key = it.seq.length > 1 ? it.seq.map((st: any) => indian(st.ans)).join(" then ") : it.seq[0].ans;
    return ok && one && it.answer === key;
  }
  if (it.kind === "back") return rrCountUp(1, it.answer) === it.result;
  if (it.kind === "facts") {
    if (it.A + it.B !== it.S) return false;
    const L = String(it.answer).split(";").map((s) => s.split(/[−=-]/).map((x) => Number(x.replace(/[^0-9]/g, ""))));
    return L.length === 2 && L.every((l) => l[0] === it.S && rrCountUp(l[1], l[0]) === l[2]) && L[0][1] !== L[1][1];
  }
  if (it.kind === "sumtake") {
    const s = it.a + it.b, left = rrCountUp(s, it.from);
    return s === it.seq[0].ans && left === it.seq[1].ans && it.answer === `${indian(s)} then ${indian(left as number)}`;
  }
  return false;
}));
/* the most likely wrong answer (the misconception); a multi-card item's is its first card's */
const nearMiss = (item: any) => (item.seq ? item.seq[0].near : item.near !== undefined ? item.near : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print. Two are exempt by the maths itself:
   taking nothing leaves the number the question has to print, and the 0 of "− 0" is that card's own number
   (the itself card's answer is still guarded as the word). The fact bay's answer is two whole lines. */
const answerForms = (item: any) => {
  const f = (v: number) => [String(v), indian(v), words(v)];
  if (item.kind === "gate") return [String(item.answer)];
  if (item.kind === "facts") return String(item.answer).split(";").map((s) => s.trim());
  if (item.seq) return item.seq.flatMap((st: any) => (st.rule === "nothing" ? [] : st.rule === "itself" ? [words(0)] : f(st.ans)));
  return typeof item.answer === "number" ? f(item.answer) : [String(item.answer)];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => T.submit(item.answer);
/* the agent's answer(): a gate pick is remembered for check(); a multi-card answer or the bay's lines are
   set on the working area as a child would make them; anything else is typed */
const answer = (item: any, v: any) => {
  if (item.kind === "gate") {
    const c = (item.choices || []).find((x: any) => x.id === String(v) || String(x.label).toLowerCase() === String(v).toLowerCase());
    RR_NOW.pick = c ? c.id : null;
    return undefined;
  }
  if ((item.kind === "facts" || (item.seq && item.seq.length > 1)) && HOOK.set) return HOOK.set(v);
  return undefined;
};
/* the agent's check() before Enter: open the gate, run the cards in turn; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* the slot: numbers with Indian commas; the bay's lines as a count of facts; a card-by-card answer as its last card */
const format = (t: any) => {
  const s = String(t ?? "");
  if (s.includes("=")) { const c = rrFull(rrParseLines(s)).length; return c === 0 ? "" : c === 1 ? "1 fact" : "2 facts"; }
  if (/then/i.test(s)) { const xs = s.split(/then/i), v = leadNumber(xs[xs.length - 1]); return v === null ? s : indian(v); }
  return /^[1-9]\d{3,8}$/.test(s) ? indian(Number(s)) : s;
};

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────────── */

const RR_CSS = `
.rr-roll{animation:rrRoll 420ms cubic-bezier(.3,.7,.25,1) both}
@keyframes rrRoll{from{transform:translateY(-30px);opacity:0}to{transform:none;opacity:1}}
.rr-in{animation:rrIn 360ms ease-out both}
@keyframes rrIn{from{opacity:0}to{opacity:1}}
.rr-door{transition:transform 420ms ease-in-out;transform-box:fill-box}
@media (prefers-reduced-motion:reduce){.rr-roll,.rr-in{animation:none}.rr-door{transition:none}}
`;

/* a column sum worked from the ones, the book's way: a column short of enough opens the next column on its
   left (across zeros too); frames[s] is the state after s columns. jam: the column where nothing is left to open */
function rrColumns(top: number, bot: number, op: string) {
  const n = Math.max(rrN(top), rrN(bot), op === "+" ? rrN(top + bot) : 1);
  const t = Array.from({ length: n }, (_, k) => rrD(top, k)), b = Array.from({ length: n }, (_, k) => rrD(bot, k));
  const cur = t.slice(), over: any = {}, res: any = {}, carry: any = {};
  const frames: any[] = [{ over: {}, res: {}, carry: {} }];
  let jam: number | null = null, c = 0;
  for (let k = 0; k < n; k++) {
    if (op === "+") {
      const s = t[k] + b[k] + c;
      res[k] = s % 10; c = Math.floor(s / 10);
      if (c) carry[k + 1] = c;
    } else {
      if (cur[k] < b[k]) {
        let j = k + 1;
        while (j < n && cur[j] === 0) j++;
        if (j >= n) { jam = k; break; }
        cur[j] -= 1; over[j] = cur[j];
        for (let m = j - 1; m > k; m--) { cur[m] = 9; over[m] = 9; }
        cur[k] += 10; over[k] = cur[k];
      }
      res[k] = cur[k] - b[k];
    }
    frames.push({ over: { ...over }, res: { ...res }, carry: { ...carry } });
  }
  const value = op === "+" ? top + bot : top - bot;
  return { n, t, b, top, bot, frames, jam, resLen: jam === null ? rrN(value) : n };
}
const rrColX = (k: number, n: number, x0: number, w: number, cw: number) => x0 + (w - (72 + n * cw)) / 2 + 72 + (n - 1 - k) * cw + cw / 2;

/* the columns drawn: headings, what each column was rewritten to, the two numbers, the rule and the answer row */
function RrCols({ plan, s, op, x0, w, cw, R, font, C, heads, shut, tx = (v: any) => v }: any) {
  const f = plan.frames[Math.min(s, plan.frames.length - 1)];
  const n = plan.n, left = x0 + (w - (72 + n * cw)) / 2, tn = rrN(plan.top), bn = rrN(plan.bot);
  const cx = (k: number) => rrColX(k, n, x0, w, cw);
  const lean = font * 0.62;
  return (
    <g>
      {heads && Array.from({ length: n }).map((_, k) => (
        <text key={"h" + k} x={cx(k)} y={R.head} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(RR_HEAD[k])}</text>
      ))}
      {Array.from({ length: n }).map((_, k) => {
        const x = cx(k), ov = f.over[k], ca = f.carry[k], r = f.res[k];
        return (
          <g key={"c" + k}>
            {ov !== undefined && (ov >= 10
              ? <text x={x} y={R.over} textAnchor="middle" fontSize={T.micro} fontWeight={700}><tspan fill={RR_INK.verm}>1</tspan><tspan fill={RR_INK.rose}>{ov - 10}</tspan></text>
              : <text x={x} y={R.over} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={RR_INK.rose}>{ov}</text>)}
            {ca ? <text x={x} y={R.over} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={RR_INK.verm}>{ca}</text> : null}
            {k < tn && <text x={x} y={R.top} textAnchor="middle" fontSize={font} fontWeight={700} fill={plan.t[k] === 0 ? RR_INK.grey : RR_INK.blue}>{plan.t[k]}</text>}
            {k < tn && ov !== undefined && <path d={`M ${x - lean * 0.45} ${R.top - 4} L ${x + lean * 0.45} ${R.top - font * 0.66}`} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />}
            {k < bn && <text x={x} y={R.bot} textAnchor="middle" fontSize={font} fontWeight={700} fill={plan.b[k] === 0 ? RR_INK.grey : RR_INK.amber}>{plan.b[k]}</text>}
            {r !== undefined && k < plan.resLen && !shut && <text className="rr-in" x={x} y={R.ans} textAnchor="middle" fontSize={font} fontWeight={700} fill={r === 0 ? RR_INK.grey : RR_INK.green}>{r}</text>}
          </g>
        );
      })}
      <text x={left + 36} y={R.bot} textAnchor="middle" fontSize={font} fontWeight={600} fill={C.ink}>{op}</text>
      <rect x={left + 8} y={R.rule} width={72 + n * cw - 8} height={4} rx={2} fill={C.ink} />
    </g>
  );
}

/* the one invite, shaped to the card it sits on (the runtime's pulse, drawn as a rounded rectangle) */
function RrInvite({ x, y, w, h, C }: any) {
  return <rect className="c4-pulse" x={x} y={y} width={w} height={h} rx={22} fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" />;
}

/* the height of the pad's word keys (two across, as the runtime lays them), with the key edge */
const rrChoiceH = (count: number) => { const rows = Math.max(1, Math.ceil(count / 2)); const ch = Math.min(110, (Z.pad.h - EDGE - 12 * (rows - 1)) / rows); return rows * ch + (rows - 1) * 12 + EDGE; };
/* the pad's Enter key (bottom right of the twelve), with its edge, in working-area units */
/* a ring just outside a group of pad keys, in working-area units (the keys cover its inner half) */
const rrPadRing = (b: any) => { const x = b.x - 5, right = Math.min(b.x + b.w + 4, Z.pad.x + Z.pad.w + 3); return { x: x - W.x, y: b.y - 4 - W.y, w: right - x, h: b.h + 8 }; };
const rrEnterBox = () => { const kw = (Z.pad.w - 24) / 3, kh = (Z.pad.h - 36 - EDGE) / 4; return rrPadRing({ x: Z.pad.x + 2 * (kw + 12), y: Z.pad.y + 3 * (kh + 12), w: kw, h: kh + EDGE }); };

/* the running count, in the runs zone above the working area */
function RrRuns({ C, label, value }: any) {
  return (
    <g data-zone="runs">
      <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
      <text x={18} y={-46} fontSize={T.micro} fontWeight={600} fill={C.ink}>{label}</text>
      <text x={312} y={-41} textAnchor="end" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{value}</text>
    </g>
  );
}

/* ── phase 1: the order gate. Two lanes side by side, the same pair in each: the greater number leads on the
   left, the smaller on the right. Both run on one press, column for column from the ones. ── */
const RR_GX = [0, 566], RR_GW = 520;
const RR_GR = { head: 108, over: 148, top: 208, bot: 268, rule: 282, ans: 340 };

function RrGate({ item, stage, wrong, typed, api, n, pair, free, tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const busy = tl.busy;
  const A = free ? pair[0] : item.A, B = free ? pair[1] : item.B;
  const pa = useMemo(() => rrColumns(A, B, "−"), [A, B]);
  const pb = useMemo(() => rrColumns(B, A, "−"), [A, B]);
  const nA = pa.frames.length - 1, nB = pb.frames.length - 1;
  /* the smaller-first pair read the turned-round way: in each column the smaller digit taken from the greater */
  const turned = useMemo(() => {
    const d = pb.t.map((x: number, k: number) => Math.abs(x - pb.b[k]));
    const cols = pb.t.map((x: number, k: number) => k).filter((k: number) => pb.t[k] < pb.b[k]);
    const value = d.reduce((s: number, x: number, k: number) => s + x * Math.pow(10, k), 0);
    return { d, cols, value, show: value !== A - B };  /* a turned-round reading equal to the true answer would only mislead */
  }, [A, B]);
  const [open, setOpen] = useState(false);
  const [sA, setSA] = useState(0);
  const [sB, setSB] = useState(0);
  const [jam, setJam] = useState(false);
  const [add, setAdd] = useState(0);
  const [addOpen, setAddOpen] = useState(false);
  const [armed, setArmed] = useState<string | null>(null);
  const [turn, setTurn] = useState<any>(null);   /* the turned-round reading: { upto } while it is read, { rings } after */
  const [end, setEnd] = useState(false);
  const ranRef = useRef(false), addRef = useRef(0), armedRef = useRef<string | null>(null);
  useEffect(() => { RR_NOW.pick = null; }, []);
  const asking = stage === "ask" && !free;

  /* both lanes run in step; the right lane stops at the column it cannot take from */
  const runSteps = (ms: number) => {
    const S: any[] = [[60, () => { setOpen(true); setSA(0); setSB(0); setJam(false); setEnd(false); setTurn(null); setAddOpen(false); }], [ms, () => {}]];
    for (let c = 1; c <= Math.max(nA, nB + 1); c++) {
      const cc = c;
      S.push([ms, () => { if (cc <= nA) setSA(cc); if (cc <= nB) setSB(cc); if (cc === nB + 1) setJam(true); api.sfx.tick(); }]);
    }
    return S;
  };
  /* the same pair as an addition: both totals land on the same tick */
  const addSteps = (ms: number) => [[60, () => { setAddOpen(false); setAdd(1); addRef.current = 1; }], [ms, () => { setAdd(2); addRef.current = 2; api.sfx.tick(); }], [300, () => {}]];

  const openGate = (pick: string | null) => {
    if (free) { addRef.current = 0; setAdd(0); tl.run(runSteps(520), () => { ranRef.current = true; setAddOpen(true); }); return; }
    if (!pick) return;
    api.lock(true);
    tl.run([...runSteps(560), [700, () => {}]], () => {
      ranRef.current = true; armedRef.current = null; setArmed(null); api.lock(false);
      api.submit(pick);
    });
  };
  /* Try adding opens only once the lanes have run, so the equal totals always land beside the jam */
  const tryAdding = () => { if (!addOpen || addRef.current) return; tl.run(addSteps(700)); };

  /* a pick on the pad is the prediction: the gate then waits for a finger, and another pick simply changes it
     (the pad stays open until the lanes run). After a correction, a pick answers */
  const enterFn: any = !asking ? null : busy ? () => {} : (v: any) => {
    const id = String(v ?? "");
    if (!(item.choices || []).some((c: any) => c.id === id)) return;
    if (ranRef.current) { api.submit(id); return; }
    const was = armedRef.current;
    armedRef.current = id; setArmed(id); api.setTyped(id);
    if (was !== id) api.say("Now open the gate.");
  };
  api.onEnter(enterFn);
  /* the pick the gate holds is always the one in the slot: a different pick re-arms it, a cleared slot disarms it */
  useEffect(() => {
    if (!asking || busy || !armedRef.current || String(typed ?? "") === armedRef.current) return;
    const id = String(typed ?? "");
    const next = (item.choices || []).some((c: any) => c.id === id) ? id : null;
    armedRef.current = next; setArmed(next);
  }, [typed]);
  /* the mouth sends only the pick the child can see */
  const openFromMouth = () => {
    if (free) { openGate(null); return; }
    const id = armedRef.current;
    if (!id || String(typed ?? "") !== id) { armedRef.current = null; setArmed(null); return; }
    openGate(id);
  };
  HOOK.set = null;
  HOOK.check = () => {
    if (!asking) return undefined;
    if (busy) return true;
    const known = (x: any) => (item.choices || []).some((c: any) => c.id === x);
    const pick = armedRef.current || (known(RR_NOW.pick) ? RR_NOW.pick : known(typed) ? typed : null);
    if (!pick) return undefined;
    if (ranRef.current) { api.submit(pick); return true; }
    armedRef.current = pick; setArmed(pick); api.setTyped(pick);
    openGate(pick);   /* the pad locks only while the lanes run */
    return true;
  };

  /* the win: the lanes run if they have not; then Try adding opens beside the jam, and presses itself if no one does */
  useEffect(() => {
    if (free || stage !== "win") return;
    const S: any[] = [];
    if (!ranRef.current) S.push(...runSteps(360));
    if (addRef.current < 2) S.push([60, () => setAddOpen(true)], [2200, () => {}], ...addSteps(600));
    S.push([400, () => {}]);
    tl.run(S);
  }, [stage]);

  /* the traceback: both lanes again at walking pace and the jam; the smaller-first pair read the turned-round way,
     each turned column ringed amber, beside the true answer; the jam again; the addition landing together; the answer */
  useEffect(() => {
    if (free || !wrong || stage !== "ask") return;
    api.lock(true);
    armedRef.current = null; setArmed(null);
    const S: any[] = [
      [60, () => { setOpen(false); setSA(0); setSB(0); setJam(false); setAdd(0); addRef.current = 0; setAddOpen(false); setEnd(false); setTurn(null); }],
      [700, () => {}],
      ...runSteps(820),
      [1000, () => {}],
    ];
    if (turned.show) {
      S.push([60, () => { setJam(false); setSB(0); setTurn({ upto: 0 }); }], [600, () => {}]);
      for (let k = 0; k < pb.n; k++) { const kk = k; S.push([60, () => { setTurn({ upto: kk + 1 }); api.sfx.tick(); }], [760, () => {}]); }
      S.push([1500, () => {}], [60, () => { setTurn({ rings: true }); setSB(nB); setJam(true); }], [700, () => {}]);
    }
    S.push(...addSteps(700), [400, () => setEnd(true)], [700, () => {}]);
    tl.run(S, () => { ranRef.current = true; api.lock(false); });
  }, [wrong]);

  api.share({ phase: n, gateLanes: [`${indian(A)} − ${indian(B)}`, `${indian(B)} − ${indian(A)}`], gateOpen: open, jammed: jam, addition: add === 2 });

  const mouthLive = !busy && (free || (asking && armed !== null));
  const lanes = [{ plan: pa, s: sA, top: A, bot: B, stop: false }, { plan: pb, s: sB, top: B, bot: A, stop: jam }];
  const tLen = rrN(turned.value);
  const addLive = addOpen && add === 0 && (free || stage === "ask" || stage === "win");
  const padInvite = asking && armed === null && !busy;
  return (
    <g>
      {lanes.map((L, k) => {
        const x = RR_GX[k];
        return (
          <g key={k}>
            <rect x={x} y={0} width={RR_GW} height={356} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
            {/* the mouth: two doors that part when the gate opens */}
            <rect x={x + 8} y={8} width={RR_GW - 16} height={62} rx={14} fill={tint(C.panel, 0.6)} />
            <rect className="rr-door" x={x + 10} y={10} width={246} height={58} rx={12} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2}
              style={{ transform: open ? "scaleX(0.12)" : "none", transformOrigin: "left" } as any} />
            <rect className="rr-door" x={x + 264} y={10} width={246} height={58} rx={12} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2}
              style={{ transform: open ? "scaleX(0.12)" : "none", transformOrigin: "right" } as any} />
            {!open && <path d={`M ${x + 244} 30 L ${x + 260} 46 L ${x + 276} 30`} fill="none" stroke={C.ink} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />}
            {open && <path d={`M ${x + 260} 22 L ${x + 260} 56 M ${x + 248} 44 L ${x + 260} 56 L ${x + 272} 44`} fill="none" stroke={shade(C.rule, 0.35)} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />}
            {/* a column read the turned-round way keeps its amber ring */}
            {k === 1 && turn && turned.cols.filter((c: number) => turn.rings || c < turn.upto).map((c: number) => (
              <rect key={"ring" + c} x={rrColX(c, pb.n, x, RR_GW, 84) - 36} y={160} width={72} height={122} rx={16} fill="none" stroke={CONTENT.ten} strokeWidth={4} />
            ))}
            <RrCols plan={L.plan} s={L.s} op="−" x0={x} w={RR_GW} cw={84} R={RR_GR} font={T.xl} C={C} heads shut={L.stop || (k === 1 && !!turn)} tx={tx} />
            {/* the turned-round reading, in ink (it is not an answer the lane gave) */}
            {k === 1 && turn && !turn.rings && turned.d.map((dg: number, c: number) => (c < turn.upto && c < tLen
              ? <text key={"t" + c} className="rr-in" x={rrColX(c, pb.n, x, RR_GW, 84)} y={RR_GR.ans} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{dg}</text>
              : null))}
            {/* a lane that stops has simply run out of things to take: its answer row closes, nothing marked */}
            {L.stop && (
              <g className="rr-in">
                <rect x={x + 20} y={294} width={RR_GW - 40} height={56} rx={14} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
                <text x={x + RR_GW / 2} y={332} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("nothing left to take")}</text>
              </g>
            )}
            {/* the opening below the lane: the same pair as an addition */}
            {add > 0 && (
              <g className="rr-in" data-role="reading">
                <rect x={x} y={366} width={RR_GW} height={72} rx={16} fill={tint(C.panel, 0.5)} stroke={C.rule} strokeWidth={2} />
                <text x={x + 350} y={414} textAnchor="end" fontSize={T.label} fontWeight={700}>
                  <tspan fill={RR_INK.blue}>{indian(L.top)}</tspan><tspan fill={C.ink}>{" + "}</tspan><tspan fill={RR_INK.amber}>{indian(L.bot)}</tspan><tspan fill={C.ink}>{" ="}</tspan>
                </text>
                {add === 2
                  ? <text className="rr-in" x={x + 366} y={414} fontSize={T.label} fontWeight={700} fill={RR_INK.green}>{indian(L.top + L.bot)}</text>
                  : <rect x={x + 366} y={382} width={130} height={42} rx={10} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="7 6" />}
              </g>
            )}
            {mouthLive && <Hit id={"mouth-" + (k + 1)} x={x} y={0} w={RR_GW} h={76} onPress={openFromMouth} label="Open the gate: both lanes run" />}
          </g>
        );
      })}
      {/* after a correction: the two lanes do not agree (a yes or no question), or the rule is named on the lane that ran */}
      {end && !free && (item.choices || []).length === 2 && <text x={543} y={RR_GR.ans} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>≠</text>}
      {end && !free && (item.choices || []).length > 2 && (
        <g className="rr-in">
          <rect x={150} y={14} width={220} height={50} rx={25} fill="#FFFFFF" stroke={CONTENT.hundred} strokeWidth={3} />
          <text x={260} y={49} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={RR_INK.blue}>{tx(String(item.answer))}</text>
        </g>
      )}
      <Key id="try-adding" label={tx("Load the same pair as an addition")} x={383} y={446} w={320} h={72} C={C}
        disabled={!addLive} onClick={tryAdding}>
        <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("Try adding")}</text>
      </Key>
      {/* the one invite: the pad's word keys before the pick (the prediction is the first act), the mouth after it,
          Try adding once the lanes have run */}
      {padInvite && <g data-zone="pad"><RrInvite {...rrPadRing({ x: Z.pad.x, y: Z.pad.y, w: Z.pad.w, h: rrChoiceH((item.choices || []).length) })} C={C} /></g>}
      {asking && armed !== null && !busy && <RrInvite x={RR_GX[1] + 4} y={4} w={RR_GW - 8} h={70} C={C} />}
      {addLive && !padInvite && <RrInvite x={377} y={440} w={332} h={86} C={C} />}
    </g>
  );
}

/* ── phases 2 and 3: the rail. A number card rides the rail; rule cards wait below it. A card acts only after
   its answer has been said: the place it names lights, every other digit is pinned, one movement. ── */
const RR_R = 700, RR_PW = 92, RR_CG = 24;
const rrPX = (k: number) => RR_R - RR_PW / 2 - k * RR_PW - (k >= 3 ? RR_CG : 0) - (k >= 5 ? RR_CG : 0);
const RR_DOCK = { x: 760, y: 104, w: 200, h: 100 };
const RR_DECK_Y = 246;

/* a rule card: what it is called, and what it takes away (amber, the number being taken) */
function RrCard({ x, y, w, h, rule, v, C, ghost, tx = (s: any) => s }: any) {
  const op = rrOpText(rule, v), big = op.length <= 7 && w >= 196;
  if (ghost) return <rect x={x} y={y} width={w} height={h} rx={16} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="8 8" />;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={16} fill="url(#gKey)" stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />
      <text x={x + w / 2} y={y + 32} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(RR_RULES[rule].cap)}</text>
      <text x={x + w / 2} y={y + h - 14} textAnchor="middle" fontSize={big ? T.speech : T.label} fontWeight={700} fill={RR_INK.amber}>{op}</text>
    </g>
  );
}

function RrRail({ item, stage, wrong, typed, api, n, free, start0, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const busy = tl.busy;
  const kind = free ? "free" : item.kind;
  const seq: any[] = free ? [] : kind === "back" ? [{ rule: item.rule, ans: item.answer, near: item.near }] : item.seq;
  const start = free ? start0 : kind === "back" ? item.answer : item.start;
  const np = Math.max(5, rrN(start));
  const deck = free ? RR_DECK_ALL : n === 3 ? ["ten", "hundred", "thousand"] : ["nothing", "one", "itself"];
  const [num, setNum] = useState<number | null>(kind === "back" ? null : start);
  const [dock, setDock] = useState<string | null>(kind === "back" ? item.rule : null);
  const [chartIn, setChartIn] = useState(n === 3 || !!free);
  const [lit, setLit] = useState<number[]>([]);
  const [pins, setPins] = useState<number[] | null>(null);
  const [chips, setChips] = useState<any[]>(() => (kind === "back" ? [{ op: rrOpText(item.rule, item.answer), v: item.result, target: true }]
    : !free && item.other !== undefined ? [{ tag: "a child wrote", v: item.other }] : []));
  const [extra, setExtra] = useState<any[]>([]);
  const [strip, setStrip] = useState<any>(null);
  const [rows, setRows] = useState<any>(null);
  const [mark, setMark] = useState<number[]>([]);
  const [step, setStep] = useState(0);
  const [touched, setTouched] = useState(false);
  const [runs, setRuns] = useState(0);
  const stepRef = useRef(0), planRef = useRef<any>(null), numRef = useRef<number>(start);
  if (!free) { RR_NOW.item = item; RR_NOW.step = stepRef.current; }
  const asking = stage === "ask" && !free;
  const cur = seq[step] || seq[seq.length - 1] || {};
  const done = chips.filter((c: any) => !c.tag && !c.target).length;
  /* what the itself card reads: the number on the card (a blank card reads ?) */
  const cardV = kind === "back" ? num : free ? (num ?? 0) : start;

  const goStep = (k: number) => { stepRef.current = k; RR_NOW.step = k; setStep(k); };
  /* the next card, said so that no number is split across the bubble */
  const stepLine = (k: number) => {
    const r = seq[k].rule;
    const what = r === "itself" ? `Now take ${indian(start)} from itself.` : r === "nothing" || r === "one" ? `Now ${indian(start)} ${rrOpText(r, start)}.`
      : `Now take ${indian(RR_RULES[r].amt(start))} from ${indian(start)}.`;
    /* the same line in each language (a Spoken value: the runtime reads the one in use) */
    const s = indian(start), amt = indian(RR_RULES[r].amt(start));
    return r === "itself" ? { en: what, hi: `अब ${s} में से उसी को घटाओ।`, gu: `હવે ${s} માંથી એ જ સંખ્યા બાદ કરો.` }
      : r === "nothing" || r === "one" ? { en: what, hi: `अब ${s} ${rrOpText(r, start)}।`, gu: `હવે ${s} ${rrOpText(r, start)}.` }
        : { en: what, hi: `अब ${s} में से ${amt} घटाओ।`, gu: `હવે ${s} માંથી ${amt} બાદ કરો.` };
  };

  /* one card acting: it docks, its place lights and the rest are pinned, then the one movement */
  const actSteps = (k: number, pace: number, rule0?: string) => {
    const rule = free ? (rule0 as string) : seq[k].rule;
    const from = free ? numRef.current : start;
    const to = rrAfter(rule, from), ch = rrChanged(from, to);
    const keep = Array.from({ length: rrN(from) }, (_, p) => p).filter((p) => !ch.includes(p));
    const place = RR_RULES[rule].place;
    const S: any[] = [
      [60, () => { setStrip(null); setRows(null); setMark([]); setExtra([]); setNum(from); setDock(rule); }],
      [pace, () => api.sfx.tick()],
      [60, () => { setLit(place !== undefined ? [place] : ch); setPins(keep); }],
      [pace, () => {}],
      [60, () => { setNum(to); numRef.current = to; if (ch.length) api.sfx.tick(); }],
      [Math.round(pace * 1.5), () => {}],
      [60, () => {
        setPins(null); setLit([]);
        if (free) setRuns((r) => r + 1);
        else if (kind === "back") setChips((cs) => cs.map((c: any) => (c.target ? { ...c, lit: true } : c)));
        else setChips((cs) => [...cs, { op: rrOpText(rule, from), v: to }]);
      }],
      [pace, () => {}],
    ];
    if (!free && k < seq.length - 1) S.push([60, () => { setNum(start); numRef.current = start; setDock(null); }], [240, () => {}]);
    if (free) S.push([60, () => setDock(null)]);
    return S;
  };
  const playStep = (k: number) => {
    api.lock(true);
    tl.run(actSteps(k, 420), () => { goStep(k + 1); api.setTyped(""); api.lock(false); api.say(stepLine(k + 1)); });
  };

  /* Enter: the answer for the card on the rail. A right answer before the last card lets that card act and
     the next one wait; the last card's answer (or any miss) goes to the runtime */
  const enterFn: any = !asking ? null : busy ? () => {} : (v: any) => {
    const val = leadNumber(v);
    if (val === null || String(v ?? "") === "") return;
    setTouched(true);
    const k = stepRef.current;
    if (k < seq.length - 1 && val === seq[k].ans) { playStep(k); return; }
    api.submit(v);
  };
  api.onEnter(enterFn);

  /* a card dropped on the rail (or tapped): in free play it acts at once; in a question it waits on the rail,
     and acts as soon as its answer has been said */
  const place = (rule: string) => {
    if (free) {
      if (busy) return;
      if (rrAfter(rule, numRef.current) < 0) { api.say("Nothing left to take."); return; }
      tl.run(actSteps(0, 360, rule));
      return;
    }
    if (!asking || busy || rule !== cur.rule) return;
    setTouched(true);
    if (!wrong && String(typed ?? "") !== "" && leadNumber(typed) !== null) { enterFn(typed); return; }
    setDock(rule); api.sfx.tick();
    api.say("Say what is left, then press enter.");
  };
  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (moved && !(p.y < RR_DECK_Y - 10)) return; /* let go below the rail: it goes back */
    place(pay.rule);
  });

  HOOK.set = (v: any) => {
    if (!asking || busy) return false;
    const xs = String(v ?? "").split(/then/i).map((s) => leadNumber(s));
    if (!xs.length || xs.some((x) => x === null)) return false;
    const k = stepRef.current;
    planRef.current = xs.length === seq.length ? xs.slice(k) : xs;
    api.setTyped(String(planRef.current[0]));
    return true;
  };
  HOOK.check = () => {
    if (!asking) return undefined;
    if (busy) return true;
    const plan = planRef.current;
    if (!plan) return undefined;
    planRef.current = null;
    const k0 = stepRef.current, S: any[] = [];
    for (let k = k0; k < seq.length; k++) {
      const v = plan[k - k0], kk = k;
      if (v === undefined) break;
      if (k < seq.length - 1 && v === seq[k].ans) {
        S.push([60, () => api.setTyped(String(v))], ...actSteps(k, 300), [60, () => goStep(kk + 1)]);
      } else { S.push([60, () => { api.setTyped(String(v)); api.lock(false); api.submit(String(v)); }]); break; }
    }
    api.lock(true);
    tl.run(S, () => api.lock(false));
    return true;
  };

  /* the win: the card (and any card still waiting) acts */
  useEffect(() => {
    if (free || stage !== "win") return;
    const k0 = Math.min(stepRef.current, seq.length - 1), S: any[] = [];
    const pace = seq.length - k0 > 1 ? 220 : 380;
    for (let k = k0; k < seq.length; k++) S.push(...actSteps(k, pace));
    tl.run(S);
  }, [stage]);

  /* the traceback: the card that was asked about runs again at walking pace, ending on the right number */
  useEffect(() => {
    if (free || !wrong || stage !== "ask") return;
    api.lock(true);
    const k = stepRef.current, st = seq[k], rule = st.rule;
    const from = start, to = rrAfter(rule, from), wv = leadNumber(wrong.value);
    const S: any[] = [[60, () => {
      setStrip(null); setRows(null); setMark([]); setPins(null); setLit([]); setExtra([]);
      setNum(kind === "back" ? null : from); numRef.current = from; setDock(kind === "back" ? rule : null);
    }], [500, () => {}]];
    const all = Array.from({ length: rrN(from) }, (_, p) => p);
    if (rule === "nothing") {
      /* the chart slides in, every digit pinned, and not one moves; the card is read place by place; then the
         itself card runs on a second card beside it, and that one empties */
      S.push([60, () => setChartIn(true)], [700, () => {}], [60, () => setDock("nothing")], [600, () => api.sfx.tick()],
        [60, () => setPins(all)], [1300, () => {}]);
      all.slice().reverse().forEach((p) => S.push([60, () => setLit([p])], [420, () => {}]));
      S.push([60, () => { setLit([]); setExtra([{ op: rrOpText("nothing", from), v: from }]); api.sfx.tick(); }], [900, () => {}],
        [60, () => setExtra((e) => [...e, { op: rrOpText("itself", from), v: 0 }])], [1000, () => {}]);
    } else if (rule === "itself") {
      S.push([60, () => setChartIn(true)], [700, () => {}], [60, () => setDock("itself")], [600, () => api.sfx.tick()],
        [60, () => setLit(all)], [800, () => {}], [60, () => { setNum(0); numRef.current = 0; api.sfx.tick(); }], [900, () => {}],
        [60, () => { setLit([]); setExtra([{ op: rrOpText("itself", from), v: 0 }]); }], [900, () => {}],
        [60, () => setExtra((e) => [...e, { op: rrOpText("nothing", from), v: from }])], [1000, () => {}]);
    } else if (rule === "one") {
      /* a strip of the numbers either side: the card on its own place, the step back to the number just before */
      S.push([60, () => { setStrip({ c: from, mine: wv, hop: false }); if (kind === "back") setNum(from); setDock("one"); }], [1100, () => {}],
        [60, () => setStrip((s: any) => ({ ...s, hop: true }))], [900, () => api.sfx.tick()]);
      if (kind !== "back") S.push([60, () => { setNum(to); numRef.current = to; }], [900, () => {}]);
      else S.push([900, () => {}]);
    } else {
      /* the places counted from the ones end with the named place lit the whole way; the child's digit keeps its
         mark; the rest pinned while the one digit drops; before and after read one under the other */
      const pl = RR_RULES[rule].place;
      const mine = wv !== null && rrN(wv) === rrN(from) ? rrChanged(from, wv) : [];
      S.push([60, () => { setChartIn(true); setMark(mine); }], [700, () => {}]);
      for (let p = 0; p <= pl; p++) { const pp = p; S.push([60, () => setLit([pp])], [520, () => {}]); }
      S.push([60, () => setDock(rule)], [600, () => api.sfx.tick()],
        [60, () => setPins(all.filter((p) => !rrChanged(from, to).includes(p)))], [800, () => {}],
        [60, () => { setNum(to); numRef.current = to; api.sfx.tick(); }], [900, () => {}],
        [60, () => { setPins(null); setRows({ before: from, after: to, place: pl }); }], [1000, () => {}]);
    }
    tl.run(S, () => api.lock(false));
  }, [wrong]);

  const live = (rule: string) => !busy && (free || (asking && rule === cur.rule && dock !== rule && kind !== "back"));
  api.share(free ? { phase: n, number: num, ruleCard: dock, cardsRun: runs }
    : { phase: n, number: num, ruleCard: dock, liftedPlace: lit.length === 1 && pins ? RR_PLACE[lit[0]] : null, cardsRun: done });

  /* ── drawing ── */
  const dragging = drag.drag && drag.drag.moved ? drag.drag.payload.rule : null;
  const cardX0 = rrPX(np - 1) - 66, cardX1 = RR_R + 24, cardY = chartIn ? 30 : 96;
  const nd = num === null ? 0 : num === 0 ? 1 : rrN(num);
  const deckW = deck.length > 3 ? 168 : 200, deckH = deck.length > 3 ? 92 : 100;
  const deckX = (i: number) => (deck.length > 3 ? 9 + i * 180 : 143 + i * 300);
  const shownChips = strip || rows ? [] : [...chips, ...extra];
  const cw = shownChips.length <= 3 ? 300 : 250, cg = shownChips.length <= 3 ? 50 : 24;
  const cx0 = (1086 - (shownChips.length * cw + (shownChips.length - 1) * cg)) / 2;
  const invite = asking && !touched && !busy && !wrong && String(typed ?? "") === "" && kind !== "back" && dock !== cur.rule;
  const inviteAt = invite ? deck.indexOf(cur.rule) : -1;
  const digitRow = (v: number, y: number, size: number, colour: string, key: string) => (
    <g key={key}>
      {Array.from({ length: rrN(v) }).map((_, p) => (
        <text key={p} x={rrPX(p)} y={y} textAnchor="middle" fontSize={size} fontWeight={700} fill={rrD(v, p) === 0 ? RR_INK.grey : colour}>{rrD(v, p)}</text>
      ))}
      {rrN(v) > 3 && <text x={RR_R - 3 * RR_PW - RR_CG / 2} y={y} textAnchor="middle" fontSize={size} fontWeight={700} fill={C.ink}>,</text>}
      {rrN(v) > 5 && <text x={RR_R - 5 * RR_PW - RR_CG * 1.5} y={y} textAnchor="middle" fontSize={size} fontWeight={700} fill={C.ink}>,</text>}
    </g>
  );

  return (
    <g>
      <RrRuns C={C} label={tx("cards run")} value={free ? String(runs) : rrOf(done, seq.length, lang)} />

      {/* the rail */}
      <rect x={20} y={212} width={1046} height={8} rx={4} fill={shade(C.rule, 0.2)} />

      {/* the number card, with the place chart behind it when it has slid in */}
      <rect x={cardX0} y={cardY} width={cardX1 - cardX0} height={204 - cardY} rx={22} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />
      {chartIn && Array.from({ length: np }).map((_, p) => (
        <g key={"col" + p} className="rr-in">
          <rect x={rrPX(p) - 42} y={42} width={84} height={156} rx={12} fill={lit.includes(p) ? tint(CONTENT.ten, 0.7) : tint(C.panel, 0.55)} stroke={lit.includes(p) ? CONTENT.ten : "none"} strokeWidth={3} />
          <text x={rrPX(p)} y={74} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(RR_HEAD[p])}</text>
        </g>
      ))}
      {!chartIn && lit.map((p) => <rect key={"l" + p} x={rrPX(p) - 42} y={104} width={84} height={94} rx={12} fill={tint(CONTENT.ten, 0.7)} />)}
      {mark.map((p) => <rect key={"m" + p} x={rrPX(p) - 46} y={38} width={92} height={164} rx={14} fill="none" stroke={C.ink} strokeWidth={3} strokeDasharray="9 7" />)}
      {num === null
        ? <text x={(cardX0 + cardX1) / 2} y={184} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>?</text>
        : num === 0
          ? <text key="z" className="rr-roll" x={rrPX(0)} y={184} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={RR_INK.grey}>0</text>
          : Array.from({ length: nd }).map((_, p) => (
            <text key={"d" + p + "-" + rrD(num, p)} className="rr-roll" x={rrPX(p)} y={184} textAnchor="middle" fontSize={T.display} fontWeight={700}
              fill={rrD(num, p) === 0 ? RR_INK.grey : RR_INK.blue}>{rrD(num, p)}</text>
          ))}
      {num !== null && nd > 3 && <text x={RR_R - 3 * RR_PW - RR_CG / 2} y={184} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>,</text>}
      {num !== null && nd > 5 && <text x={RR_R - 5 * RR_PW - RR_CG * 1.5} y={184} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>,</text>}
      {/* hold the rest: a pin on every digit that must not move */}
      {pins && pins.filter((p) => p < nd).map((p) => (
        <g key={"pin" + p}>
          <path d={`M ${rrPX(p)} 100 L ${rrPX(p)} 116`} stroke={CONTENT.line} strokeWidth={3} strokeLinecap="round" />
          <circle cx={rrPX(p)} cy={98} r={8} fill={CONTENT.line} />
        </g>
      ))}

      {/* the dock on the rail, where a rule card waits and acts */}
      {dock ? <g className="rr-in"><RrCard x={RR_DOCK.x} y={RR_DOCK.y} w={RR_DOCK.w} h={RR_DOCK.h} rule={dock} v={cardV} C={C} tx={tx} /></g>
        : <rect x={RR_DOCK.x} y={RR_DOCK.y} width={RR_DOCK.w} height={RR_DOCK.h} rx={16} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="8 8" />}

      {/* the rule cards waiting under the rail */}
      {deck.map((rule: string, i: number) => {
        const x = deckX(i), gone = (!free && dock === rule) || dragging === rule;
        if (gone) return <RrCard key={rule} x={x} y={RR_DECK_Y} w={deckW} h={deckH} rule={rule} v={cardV} C={C} ghost />;
        const pay = { rule };
        return (
          <g key={rule} className={live(rule) ? "c4-piece" : ""}
            {...(live(rule) ? { ...control("card-" + rule, "Drop the " + RR_RULES[rule].cap + " card on the rail"), ...drag.bind(pay), ...drag.keys(pay) } : {})}>
            <RrCard x={x} y={RR_DECK_Y} w={deckW} h={deckH} rule={rule} v={cardV} C={C} tx={tx} />
            <rect x={x} y={RR_DECK_Y} width={deckW} height={deckH} fill="transparent" />
          </g>
        );
      })}

      {/* the tray under the rail: each card that left the rail, and what it reads */}
      {shownChips.map((c: any, i: number) => {
        const x = cx0 + i * (cw + cg);
        return (
          <g key={"chip" + i} className="rr-in" data-role="reading">
            <rect x={x} y={378} width={cw} height={140} rx={18} fill="#FFFFFF" stroke={c.lit ? CONTENT.one : C.rule} strokeWidth={c.lit ? 5 : 2} />
            <text x={x + cw / 2} y={424} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={c.tag ? C.ink : RR_INK.amber}>{c.tag ? tx(c.tag) : c.op}</text>
            <text x={x + cw / 2} y={494} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={c.tag ? C.ink : c.v === 0 ? RR_INK.grey : RR_INK.green}>{indian(c.v)}</text>
          </g>
        );
      })}

      {/* the numbers either side of the card, and the one step back */}
      {strip && (
        <g className="rr-in" data-role="reading">
          <rect x={40} y={410} width={1006} height={4} rx={2} fill={shade(C.rule, 0.2)} />
          {[-2, -1, 0, 1, 2].map((d) => {
            const v = strip.c + d, x = 143 + (d + 2) * 200;
            return (
              <g key={"s" + d}>
                <rect x={x - 3} y={400} width={6} height={24} rx={3} fill={shade(C.rule, 0.3)} />
                {d === -1 && strip.hop && <rect x={x - 84} y={440} width={168} height={60} rx={14} fill={tint(CONTENT.one, 0.75)} />}
                {d === 0 && <rect x={x - 84} y={440} width={168} height={60} rx={14} fill="none" stroke={CONTENT.hundred} strokeWidth={4} />}
                {strip.mine === v && d !== 0 && d !== -1 && <rect x={x - 84} y={440} width={168} height={60} rx={14} fill="none" stroke={C.ink} strokeWidth={3} strokeDasharray="9 7" />}
                <text x={x} y={482} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={d === -1 && strip.hop ? RR_INK.green : d === 0 ? RR_INK.blue : C.ink}>{indian(v)}</text>
              </g>
            );
          })}
          {strip.hop && <path d="M 535 398 Q 443 350 351 398 M 351 398 L 356 380 M 351 398 L 369 392" fill="none" stroke={RR_INK.green} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />}
        </g>
      )}

      {/* before and after, one under the other: only the named place differs */}
      {rows && (
        <g className="rr-in" data-role="reading">
          <rect x={rrPX(rows.place) - 34} y={384} width={68} height={134} rx={12} fill={tint(CONTENT.ten, 0.7)} />
          <text x={rrPX(np - 1) - 52} y={436} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("before")}</text>
          <text x={rrPX(np - 1) - 52} y={504} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("after")}</text>
          {digitRow(rows.before, 436, T.speech, RR_INK.blue, "b")}
          {digitRow(rows.after, 504, T.speech, RR_INK.green, "a")}
        </g>
      )}

      {/* the card under the finger */}
      {dragging && (
        <g pointerEvents="none" filter="url(#fLift)">
          <RrCard x={drag.drag.x - deckW / 2} y={drag.drag.y - deckH / 2} w={deckW} h={deckH} rule={dragging} v={cardV} C={C} tx={tx} />
        </g>
      )}
      {inviteAt >= 0 && <RrInvite x={deckX(inviteAt) - 8} y={RR_DECK_Y - 8} w={deckW + 16} h={deckH + 16} C={C} />}
    </g>
  );
}

/* ── phase 4: the fact bay. The addition fact on three cards; two subtraction lines built from them. ── */
const RR_BX = [100, 428, 756], RR_BW = 230, RR_BH = 88;
const RR_BY = [8, 116, 224];
const RR_SR = { head: 278, over: 310, top: 362, bot: 414, rule: 426, ans: 478 };

function RrBay({ item, stage, wrong, typed, api, n, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const busy = tl.busy;
  const facts = item.kind === "facts";
  const seq: any[] = facts ? [] : item.seq;
  const [tags, setTags] = useState(false);
  const [unused, setUnused] = useState<number | null>(null);
  const [worked, setWorked] = useState<any>(null);
  const [model, setModel] = useState(0);
  const [won, setWon] = useState(false);
  const [sum, setSum] = useState(false);
  const [diff, setDiff] = useState(false);
  const [cols, setCols] = useState<any>(null);
  const [step, setStep] = useState(0);
  const [touched, setTouched] = useState(false);
  const stepRef = useRef(0), planRef = useRef<any>(null);
  RR_NOW.item = item; RR_NOW.step = stepRef.current;
  const asking = stage === "ask";
  const lines = facts ? rrParseLines(typed) : [];
  const full = facts ? rrFull(lines) : [];
  const cards = facts ? [item.A, item.B, item.S] : [item.a, item.b];
  const goStep = (k: number) => { stepRef.current = k; RR_NOW.step = k; setStep(k); };

  /* the fact bay: a card tapped goes to the next empty place; dragged, to the place it is let go on */
  const setLines = (L: any[]) => api.setTyped(rrEncodeLines(L));
  const tapCard = (i: number) => {
    if (!asking || busy) return;
    setTouched(true);
    const L = lines.map((l: any[]) => l.slice());
    for (let j = 0; j < 2; j++) for (let s = 0; s < 3; s++) if (L[j][s] === null) { L[j][s] = cards[i]; setLines(L); api.sfx.tick(); return; }
    api.say("Both lines are full. Tap a card in a line to lift it off.");
  };
  const slotAt = (p: any) => {
    for (let j = 0; j < 2; j++) for (let s = 0; s < 3; s++) {
      const x = RR_BX[s], y = RR_BY[j + 1];
      if (p.x >= x - 20 && p.x <= x + RR_BW + 20 && p.y >= y - 10 && p.y <= y + RR_BH + 10) return [j, s];
    }
    return null;
  };
  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (!moved) { tapCard(pay.i); return; }
    const at = slotAt(p);
    if (!at || !asking || busy) return;
    setTouched(true);
    const L = lines.map((l: any[]) => l.slice());
    L[at[0]][at[1]] = cards[pay.i];
    setLines(L); api.sfx.tick();
  });
  const tapSlot = (j: number, s: number) => {
    if (!asking || busy) return;
    const L = lines.map((l: any[]) => l.slice());
    L[j][s] = null;
    setLines(L); api.sfx.tick();
  };

  const playSum = (k: number) => {
    api.lock(true);
    tl.run([[60, () => { setCols(null); setSum(true); api.sfx.tick(); }], [900, () => {}]], () => {
      goStep(k + 1); api.setTyped(""); api.lock(false);
      api.say({ en: `Now take ${indian(seq[0].ans)} from ${indian(item.from)}. What is left?`,
        hi: `अब ${indian(item.from)} में से ${indian(seq[0].ans)} घटाओ। क्या बचा?`,
        gu: `હવે ${indian(item.from)} માંથી ${indian(seq[0].ans)} બાદ કરો. શું બાકી રહ્યું?` });
    });
  };
  const enterFn: any = !asking ? null : busy ? () => {} : facts ? () => {
    const partial = lines.some((l: any[]) => l.some((x) => x !== null) && l.some((x) => x === null));
    if (partial) { api.say("Finish that line first."); return; }
    if (!full.length) { api.say("Tap a card to start a line."); return; }
    api.submit(rrEncodeLines(lines));
  } : (v: any) => {
    const val = leadNumber(v);
    if (val === null || String(v ?? "") === "") return;
    setTouched(true);
    const k = stepRef.current;
    if (k < seq.length - 1 && val === seq[k].ans) { playSum(k); return; }
    api.submit(v);
  };
  api.onEnter(enterFn);

  HOOK.set = (v: any) => {
    if (!asking || busy) return false;
    if (facts) { planRef.current = String(v ?? ""); api.setTyped(planRef.current); return true; }
    const xs = String(v ?? "").split(/then/i).map((s) => leadNumber(s));
    if (!xs.length || xs.some((x) => x === null)) return false;
    planRef.current = xs.length === seq.length ? xs.slice(stepRef.current) : xs;
    api.setTyped(String(planRef.current[0]));
    return true;
  };
  HOOK.check = () => {
    if (!asking) return undefined;
    if (busy) return true;
    const plan = planRef.current;
    if (plan === null || plan === undefined) return undefined;
    planRef.current = null;
    if (facts) { api.submit(plan); return true; }
    const k0 = stepRef.current, S: any[] = [];
    for (let k = k0; k < seq.length; k++) {
      const v = plan[k - k0], kk = k;
      if (v === undefined) break;
      if (k < seq.length - 1 && v === seq[k].ans) S.push([60, () => { api.setTyped(String(v)); setSum(true); }], [500, () => goStep(kk + 1)]);
      else { S.push([60, () => { api.setTyped(String(v)); api.lock(false); api.submit(String(v)); }]); break; }
    }
    api.lock(true);
    tl.run(S, () => api.lock(false));
    return true;
  };

  /* the win: the facts light; or the sum lands and then what is left */
  useEffect(() => {
    if (stage !== "win") return;
    if (facts) { tl.run([[60, () => { setWon(true); setModel(0); setWorked(null); api.sfx.tick(); }], [600, () => {}]]); return; }
    tl.run([[60, () => { setCols(null); setSum(true); }], [600, () => { api.sfx.tick(); }], [60, () => setDiff(true)], [600, () => api.sfx.tick()]]);
  }, [stage]);

  /* the traceback */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    const S: any[] = [];
    if (facts) {
      /* the three cards read as two parts and a total, the total lit; the child's odd line worked anyway;
         a lone fact lifts the part it took, leaving the other unused; then both facts that begin from the total */
      const L = rrFull(rrParseLines(wrong.value));
      const bad = L.find((l: any[]) => !rrFactOk(item, l));
      const taken = Array.from(new Set(L.filter((l: any[]) => rrFactOk(item, l)).map((l: any[]) => l[1])));
      S.push([60, () => { setTags(true); setModel(0); setWorked(null); setUnused(null); }], [1200, () => {}]);
      if (bad) {
        S.push([60, () => setWorked({ a: bad[0], b: bad[1], res: bad[0] >= bad[1] ? bad[0] - bad[1] : null, shown: false })], [900, () => {}],
          [60, () => { setWorked((w: any) => ({ ...w, shown: true })); api.sfx.tick(); }], [1200, () => {}]);
      } else if (taken.length === 1) {
        S.push([60, () => setUnused(taken[0] === item.A ? item.B : item.A)], [1300, () => {}]);
      }
      S.push([60, () => { setModel(1); api.sfx.tick(); }], [900, () => {}], [60, () => { setModel(2); api.sfx.tick(); }], [800, () => {}]);
    } else {
      /* the sum, or the taking away, worked in columns at walking pace (the carry and the trades drawn) */
      const k = stepRef.current;
      const plan = k === 0 ? rrColumns(item.a, item.b, "+") : rrColumns(item.from, seq[0].ans, "−");
      S.push([60, () => setCols({ plan, s: 0, op: k === 0 ? "+" : "−" })], [700, () => {}]);
      for (let c = 1; c < plan.frames.length; c++) { const cc = c; S.push([60, () => { setCols((x: any) => ({ ...x, s: cc })); api.sfx.tick(); }], [760, () => {}]); }
      S.push([60, () => (k === 0 ? setSum(true) : setDiff(true))], [900, () => {}]);
    }
    tl.run(S, () => api.lock(false));
  }, [wrong]);

  api.share({ phase: n, factCards: facts ? [item.A, item.B, item.S] : [item.a, item.b, item.from], linesBuilt: full.length, step });

  /* ── drawing ── */
  const roleInk = [RR_INK.blue, RR_INK.amber, RR_INK.green];
  const numCard = (x: number, y: number, v: any, ink: string, key: string, opts: any = {}) => (
    <g key={key}>
      <rect x={x} y={y} width={RR_BW} height={RR_BH} rx={16} fill={opts.empty ? "none" : opts.fill || "#FFFFFF"}
        stroke={opts.ring || C.rule} strokeWidth={opts.ring ? 5 : 2} strokeDasharray={opts.empty ? "8 8" : opts.dash ? "10 7" : undefined}
        filter={opts.empty ? undefined : "url(#fShadowSoft)"} />
      {opts.tag && <text x={x + RR_BW / 2} y={y + 26} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(opts.tag)}</text>}
      {v !== null && v !== undefined && <text className={opts.pop ? "rr-in" : ""} x={x + RR_BW / 2} y={y + (opts.tag ? 76 : 61)} textAnchor="middle"
        fontSize={T.speech} fontWeight={700} fill={ink}>{typeof v === "number" ? indian(v) : v}</text>}
    </g>
  );
  const ops = (y: number, a: string, key: string) => (
    <g key={key}>
      <text x={379} y={y + 60} textAnchor="middle" fontSize={T.xl} fontWeight={600} fill={C.ink}>{a}</text>
      <text x={707} y={y + 60} textAnchor="middle" fontSize={T.xl} fontWeight={600} fill={C.ink}>=</text>
    </g>
  );
  const factText = (l: any[], x: number, y: number, key: string, lit: boolean) => (
    <text key={key} x={x} y={y} fontSize={T.label} fontWeight={700}>
      <tspan fill={lit ? RR_INK.blue : C.ink}>{indian(l[0])}</tspan><tspan fill={C.ink}>{" − "}</tspan>
      <tspan fill={lit ? RR_INK.amber : C.ink}>{indian(l[1])}</tspan><tspan fill={C.ink}>{" = "}</tspan>
      <tspan fill={lit ? RR_INK.green : C.ink}>{l[2] === null ? "" : typeof l[2] === "number" ? indian(l[2]) : l[2]}</tspan>
    </text>
  );
  const dragI = drag.drag && drag.drag.moved ? drag.drag.payload.i : null;
  const anyFilled = lines.some((l: any[]) => l.some((x) => x !== null));
  const invite = facts && asking && !touched && !busy && !wrong && !anyFilled;

  if (!facts) {
    const sv = seq[0].ans, left = seq[1].ans;
    return (
      <g>
        <RrRuns C={C} label={tx("steps")} value={rrOf(step + (stage === "win" || stage === "idle" ? 1 : 0), 2, lang)} />
        {numCard(RR_BX[0], RR_BY[0], item.a, C.ink, "a")}
        {numCard(RR_BX[1], RR_BY[0], item.b, C.ink, "b")}
        {numCard(RR_BX[2], RR_BY[0], sum ? sv : "?", sum ? RR_INK.green : C.ink, "s", { empty: !sum, pop: sum })}
        {ops(RR_BY[0], "+", "o1")}
        {numCard(RR_BX[0], RR_BY[1], item.from, RR_INK.blue, "f")}
        {numCard(RR_BX[1], RR_BY[1], sum ? sv : "?", sum ? RR_INK.amber : C.ink, "t", { empty: !sum, pop: sum })}
        {numCard(RR_BX[2], RR_BY[1], diff ? left : "?", diff ? RR_INK.green : C.ink, "d", { empty: !diff, pop: diff })}
        {ops(RR_BY[1], "−", "o2")}
        {cols && <RrCols plan={cols.plan} s={cols.s} op={cols.op} x0={0} w={1086} cw={70} R={RR_SR} font={T.speech} C={C} heads tx={tx} />}
      </g>
    );
  }

  return (
    <g>
      <RrRuns C={C} label={tx("facts")} value={rrOf(1 + full.length, 3, lang)} />
      {/* the addition fact: two parts and their total */}
      {[0, 1, 2].map((i) => {
        const v = cards[i], canDrag = asking && !busy;
        const ring = tags && i === 2 ? CONTENT.one : unused === v && i < 2 ? CONTENT.ten : undefined;
        const pay = { i };
        return (
          <g key={"card" + i} className={canDrag ? "c4-piece" : ""}
            {...(canDrag ? { ...control("card-" + (i === 2 ? "total" : "part-" + (i + 1)), "Take the " + indian(v) + " card"), ...drag.bind(pay), ...drag.keys(pay) } : {})}>
            {numCard(RR_BX[i], RR_BY[0], v, C.ink, "c" + i, { tag: tags ? (i === 2 ? "total" : "part") : undefined, ring, dash: unused === v && i < 2, fill: i === 2 ? tint(C.panel, 0.6) : undefined })}
          </g>
        );
      })}
      {ops(RR_BY[0], "+", "oA")}
      {/* the two subtraction lines */}
      {[0, 1].map((j) => (
        <g key={"line" + j}>
          {[0, 1, 2].map((s) => {
            const v = lines[j][s], x = RR_BX[s], y = RR_BY[j + 1];
            return (
              <g key={"s" + s}>
                {numCard(x, y, v, roleInk[s], "v" + s, { empty: v === null, ring: won && v !== null ? CONTENT.one : undefined })}
                {v !== null && asking && !busy && <Hit id={`slot-${j + 1}-${s + 1}`} x={x} y={y} w={RR_BW} h={RR_BH} onPress={() => tapSlot(j, s)} label="Lift this card off the line" />}
              </g>
            );
          })}
          {ops(RR_BY[j + 1], "−", "o" + j)}
        </g>
      ))}
      {/* the work lane: the child's odd line worked anyway, then both facts that begin from the total */}
      {worked && (
        <g className="rr-in" data-role="reading">
          {factText([worked.a, worked.b, worked.shown ? (worked.res === null ? tx("nothing left") : worked.res) : null], 100, 356, "w", false)}
        </g>
      )}
      {model > 0 && (
        <g className="rr-in" data-role="reading">
          <rect x={80} y={376} width={926} height={108} rx={16} fill={tint(CONTENT.one, 0.88)} />
          {factText([item.S, item.A, item.B], 100, 418, "m1", true)}
          {model > 1 && factText([item.S, item.B, item.A], 100, 468, "m2", true)}
        </g>
      )}
      {dragI !== null && (
        <g pointerEvents="none" filter="url(#fLift)">
          {numCard(drag.drag.x - RR_BW / 2, drag.drag.y - RR_BH / 2, cards[dragI], C.ink, "drag")}
        </g>
      )}
      {invite && <RrInvite x={RR_BX[2] - 7} y={RR_BY[0] - 7} w={RR_BW + 14} h={RR_BH + 14} C={C} />}
      {asking && !busy && full.length === 2 && !(wrong && String(typed) === String(wrong.value)) && <g data-zone="pad"><RrInvite {...rrEnterBox()} C={C} /></g>}
    </g>
  );
}

/* ── free play: the rail with all six rule cards and any number, or the order gate with any pair ── */
function RrFree(props: any) {
  const { api, tx = (v: any) => v } = props;
  const C = api.C;
  const [mode, setMode] = useState("rail");
  const [ni, setNi] = useState(0);
  const [pi, setPi] = useState(0);
  const rail = mode === "rail";
  return (
    <g>
      {rail ? <RrRail key={"r" + ni} {...props} free start0={RR_FREE[ni]} /> : <RrGate key={"g" + pi} {...props} free pair={RR_PAIRS[pi]} />}
      <Key id="free-new" label={tx(rail ? "A new number on the rail" : "A new pair at the gate")} x={0} y={446} w={250} h={72} C={C}
        onClick={() => (rail ? setNi((i) => (i + 1) % RR_FREE.length) : setPi((i) => (i + 1) % RR_PAIRS.length))}>
        <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(rail ? "New number" : "New pair")}</text>
      </Key>
      <Key id="free-mode" label={tx(rail ? "Open the order gate" : "Back to the rules rail")} x={836} y={446} w={250} h={72} C={C}
        onClick={() => setMode((m) => (m === "rail" ? "gate" : "rail"))}>
        <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(rail ? "Order gate" : "Rules rail")}</text>
      </Key>
    </g>
  );
}

/* the working area: one view per kind of item, fresh for every question */
function Work(props: any) {
  const { item, index, stage } = props;
  const k = (item && item.kind) || "rail";
  return (
    <g>
      <style>{RR_CSS}</style>
      {stage === "free" ? <RrFree key="free" {...props} />
        : k === "gate" ? <RrGate key={"g" + index} {...props} />
          : k === "facts" || k === "sumtake" ? <RrBay key={"b" + index} {...props} />
            : <RrRail key={"r" + index} {...props} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ n, result, C, w, h }: any) {
  const last = result && result.last;
  if (!last) return null;
  const it: any = ((PHASES[(n || 1) - 1] || { items: [] }).items as any[])[last.item] || {};
  let l1 = "", l2 = "";
  if (it.kind === "gate") { l1 = `${indian(it.A)} − ${indian(it.B)} = ${indian(it.A - it.B)}`; l2 = it.answer === "no" ? "not the same" : String(it.answer); }
  else if (it.kind === "rail") { const st = it.seq[it.seq.length - 1]; l1 = `${indian(it.start)} ${rrOpText(st.rule, it.start)}`; l2 = indian(st.ans); }
  else if (it.kind === "back") { l1 = `? − 1 = ${indian(it.result)}`; l2 = indian(it.answer); }
  else if (it.kind === "facts") { l1 = `${indian(it.S)} − ${indian(it.A)}`; l2 = indian(it.B); }
  else if (it.kind === "sumtake") { l1 = `${indian(it.from)} − ${indian(it.seq[0].ans)}`; l2 = indian(it.seq[1].ans); }
  else return null;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <text x={w / 2} y={h / 2 - 6} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{l1}</text>
      <text x={w / 2} y={h / 2 + 30} textAnchor="middle" fontSize={l2.length > 8 ? T.micro : T.label} fontWeight={700} fill={RR_INK.green}>{l2}</text>
    </g>
  );
}

function RulesRail(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null }} />
  );
}

export default RulesRail;
