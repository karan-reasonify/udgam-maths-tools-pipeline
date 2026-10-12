/* ═══ M1.S2.T3.C8.2D1 · place_splitter · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "place_splitter";
const MEDIA_ID = "M1.S2.T3.C8.2D1";
const TOOL_NAME = "Place Splitter";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only. The plan's line ("A number in cards and a bar hanging over
   it") describes phases 2 to 4; phase 1 opens on the ladder, so the line names both. */
const OPENING = ["First a ladder of division facts, then a number in cards and a bar to cut it."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every cut made where the zeros said, and every remainder written as a number.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Change any digit, pick a divisor and cut, or grow the ladder.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r13+: `lineFor(line, lang, TR)`); the
   English stays what the checks read. NCERT class 4 terms: भाज्य भाजक भागफल शेषफल / ભાજ્ય ભાજક ભાગફળ શેષ,
   इकाई दहाई सैकड़ा हज़ार / એકમ દશક શતક હજાર. Digits stay digits: the runtime speaks them in the language
   in use. A first draft; wants a native speaker's read. (The two-box labels are drawn by the runtime as
   written: r17 does not translate them.) */
const TR: any = {
  hi: {
    "Place Splitter": "स्थान विभाजक",
    "First a ladder of division facts, then a number in cards and a bar to cut it.": "पहले भाग के तथ्यों की सीढ़ी, फिर कार्डों पर एक संख्या और उसे काटने वाली पट्टी।",
    "Every cut made where the zeros said, and every remainder written as a number.": "हर कट वहीं लगा जहाँ शून्यों ने बताया, और हर शेषफल संख्या की तरह लिखा गया।",
    "Free play. Change any digit, pick a divisor and cut, or grow the ladder.": "मुक्त खेल। कोई भी अंक बदलो, भाजक चुनकर काटो, या सीढ़ी बढ़ाओ।",
    "A zero on the dividend, a zero on the quotient": "भाज्य पर एक शून्य, भागफल पर एक शून्य",
    "Put a zero on the dividend. Keep the divisor. What happens to the answer?": "भाज्य पर एक शून्य लगाओ। भाजक वही रखो। उत्तर का क्या होता है?",
    "Drag the zero onto the next rung, then type its quotient.": "शून्य को अगले पायदान पर खींचो, फिर उसका भागफल लिखो।",
    "Did the divisor change?": "क्या भाजक बदला?",
    "Count the zeros the dividend gained. The quotient gains the same number of zeros.": "गिनो कि भाज्य में कितने शून्य जुड़े। भागफल में भी उतने ही शून्य जुड़ते हैं।",
    "Ten times the dividend gives ten times the quotient. That holds while the divisor stays the same and nothing is left over.": "भाज्य दस गुना हो, तो भागफल भी दस गुना होता है। यह तब तक सही है जब तक भाजक वही रहे और कुछ न बचे।",
    "You learned: a zero on the dividend puts a zero on the quotient.": "तुमने सीखा: भाज्य पर एक शून्य से भागफल पर भी एक शून्य आता है।",
    "840 ÷ 7, then 8,400 ÷ 7": "840 ÷ 7, फिर 8,400 ÷ 7",
    "84 divided by 7 is 12. Use the pattern to find 840 divided by 7, and then 8,400 divided by 7.": "84 को 7 से भाग देने पर 12 आता है। इस पैटर्न से 840 ÷ 7 और फिर 8,400 ÷ 7 निकालो।",
    "Which number gained a zero?": "किस संख्या में एक शून्य जुड़ा?",
    "63 divided by 9 is 7. What is 630 divided by 9?": "63 को 9 से भाग देने पर 7 आता है। 630 ÷ 9 कितना है?",
    "The divisor is still 9. Where does the new zero on the dividend go?": "भाजक अब भी 9 है। भाज्य का नया शून्य कहाँ जाता है?",
    "330, 3,300 and 33,000 ÷ 3": "330, 3,300 और 33,000 ÷ 3",
    "33 divided by 3 is 11. Find 330, 3,300 and 33,000 divided by 3.": "33 को 3 से भाग देने पर 11 आता है। 330, 3,300 और 33,000 को 3 से भाग दो।",
    "Each rung adds one zero. How many zeros has each quotient gained?": "हर पायदान पर एक शून्य जुड़ता है। हर भागफल में कितने शून्य जुड़े?",
    "Ten splits off the ones digit": "दस से इकाई का अंक अलग होता है",
    "Ten goes into every ten. What is left that cannot make another ten?": "हर दस में दस पूरा जाता है। क्या बचता है जो एक और दस नहीं बना सकता?",
    "Slide the bar along the rail, or tap a gap, to cut the number.": "संख्या काटने के लिए पट्टी को रेल पर खिसकाओ, या किसी खाली जगह पर टैप करो।",
    "Which sticks cannot make another ten?": "कौन सी तीलियाँ एक और दस नहीं बना सकतीं?",
    "Lay the bundles out under the cards again, and count the whole bundles first.": "कार्डों के नीचे गड्डियाँ फिर से रखो, और पहले पूरी गड्डियाँ गिनो।",
    "Divided by ten, the ones digit is the remainder. The digits in front of it are the quotient.": "दस से भाग देने पर इकाई का अंक शेषफल होता है। उसके आगे के अंक भागफल होते हैं।",
    "You learned: divided by ten, the ones digit is the remainder.": "तुमने सीखा: दस से भाग देने पर इकाई का अंक शेषफल है।",
    "Find the quotient and the remainder of 738 divided by 10.": "738 को 10 से भाग देकर भागफल और शेषफल निकालो।",
    "How many zeros does ten have?": "दस में कितने शून्य हैं?",
    "Find the quotient and remainder of 94 divided by 10.": "94 को 10 से भाग देकर भागफल और शेषफल निकालो।",
    "Which digit counts the loose sticks, and which counts the tens?": "कौन सा अंक खुली तीलियाँ गिनता है, और कौन सा दहाइयाँ?",
    "In 5,316 divided by 10, which digit is the remainder, and what is the quotient?": "5,316 को 10 से भाग देने में कौन सा अंक शेषफल है, और भागफल क्या है?",
    "Ten cuts off one digit. Which digit stands right of the bar?": "दस एक अंक काटता है। पट्टी के दाईं ओर कौन सा अंक है?",
    "A hundred takes two digits, a thousand takes three": "सौ दो अंक लेता है, हज़ार तीन",
    "How many zeros does the divisor have? Cut off that many digits.": "भाजक में कितने शून्य हैं? उतने ही अंक काटो।",
    "How many digits does that cut off from the right?": "इससे दाईं ओर से कितने अंक कटते हैं?",
    "One zero cuts one digit. Two zeros cut two, and three zeros cut three.": "एक शून्य एक अंक काटता है। दो शून्य दो, और तीन शून्य तीन।",
    "By a hundred, the last two digits are the remainder. By a thousand, the last three are.": "सौ से भाग देने पर आखिरी दो अंक शेषफल होते हैं। हज़ार से, आखिरी तीन।",
    "You learned: one digit is cut off for each zero in the divisor.": "तुमने सीखा: भाजक के हर शून्य के लिए एक अंक कटता है।",
    "8,254 ÷ 100, then ÷ 1,000": "8,254 ÷ 100, फिर ÷ 1,000",
    "Find the quotient and remainder of 8,254 divided by 100. Then do the same for 8,254 divided by 1,000.": "8,254 को 100 से भाग देकर भागफल और शेषफल निकालो। फिर 8,254 को 1,000 से भाग देकर भी यही करो।",
    "How many zeros does this divisor have?": "इस भाजक में कितने शून्य हैं?",
    "Find the quotient and remainder of 6,781 divided by 100.": "6,781 को 100 से भाग देकर भागफल और शेषफल निकालो।",
    "A hundred has two zeros. Is the bar two cards in from the right?": "सौ में दो शून्य हैं। क्या पट्टी दाईं ओर से दो कार्ड अंदर है?",
    "Divide 38,265 by 1, by 10, by 100 and by 1,000. Give each quotient and remainder.": "38,265 को 1 से, 10 से, 100 से और 1,000 से भाग दो। हर बार भागफल और शेषफल बताओ।",
    "Which divisor are you on, and how many zeros does it have?": "तुम किस भाजक पर हो, और उसमें कितने शून्य हैं?",
    "A remainder is a number": "शेषफल एक संख्या है",
    "Read what is in the tray as a number. Does the front zero change it?": "ट्रे में जो है उसे संख्या की तरह पढ़ो। क्या आगे का शून्य उसे बदलता है?",
    "Cut the number, then lift a front zero into the saucer.": "संख्या काटो, फिर आगे का एक शून्य उठाकर तश्तरी में रखो।",
    "Which zero is standing in front of the other digits?": "कौन सा शून्य बाकी अंकों के आगे खड़ा है?",
    "A zero in front holds no place. Read the tray the way you would read a price.": "आगे का शून्य कोई स्थान नहीं रखता। ट्रे को वैसे पढ़ो जैसे कीमत पढ़ते हो।",
    "A zero in front of a remainder changes nothing, so it is not written.": "शेषफल के आगे का शून्य कुछ नहीं बदलता, इसलिए उसे नहीं लिखते।",
    "You learned: a zero in front of a remainder is not written.": "तुमने सीखा: शेषफल के आगे का शून्य नहीं लिखते।",
    "Find the quotient and remainder of 41,007 divided by 1,000.": "41,007 को 1,000 से भाग देकर भागफल और शेषफल निकालो।",
    "What does the remainder tray read as a number?": "शेषफल की ट्रे में कौन सी संख्या है?",
    "Find the quotient and remainder of 70,009 divided by 1,000. Write the remainder the way a number is written.": "70,009 को 1,000 से भाग देकर भागफल और शेषफल निकालो। शेषफल वैसे लिखो जैसे संख्या लिखी जाती है।",
    "Lift the front zeros. Does the remainder change?": "आगे के शून्य उठाओ। क्या शेषफल बदलता है?",
    "4,506 ÷ 100, then ÷ 1,000": "4,506 ÷ 100, फिर ÷ 1,000",
    "Find the quotient and remainder of 4,506 divided by 100. Then do the same for 4,506 divided by 1,000.": "4,506 को 100 से भाग देकर भागफल और शेषफल निकालो। फिर 4,506 को 1,000 से भाग देकर भी यही करो।",
    "Which zero stands in front, and which zero holds a place?": "कौन सा शून्य आगे है, और कौन सा शून्य स्थान रखता है?",
    /* the splitter's own words */
    "quotient": "भागफल", "remainder": "शेषफल", "Q": "भा", "R": "शे",
    "O": "इकाई", "T": "दहाई", "H": "सैकड़ा", "Th": "हज़ार", "TTh": "दस हज़ार",
    "rungs": "पायदान", "cuts": "कट", "New": "नई", "Ladder": "सीढ़ी", "Cards": "कार्ड",
    "Start a new ladder": "नई सीढ़ी शुरू करो", "Show the ladder": "सीढ़ी दिखाओ", "Show the number cards": "संख्या कार्ड दिखाओ",
    "Add a zero to the dividend": "भाज्य पर एक शून्य लगाओ", "Add a zero to the divisor as well": "भाजक पर भी एक शून्य लगाओ",
    "Lift this zero into the saucer": "यह शून्य उठाकर तश्तरी में रखो", "Put the zero back in the tray": "शून्य को वापस ट्रे में रखो",
    "The splitter bar: drop it to cut the number": "काटने वाली पट्टी: संख्या काटने के लिए इसे गिराओ",
  },
  gu: {
    "Place Splitter": "સ્થાન વિભાજક",
    "First a ladder of division facts, then a number in cards and a bar to cut it.": "પહેલાં ભાગાકારનાં તથ્યોની સીડી, પછી કાર્ડ પર એક સંખ્યા અને તેને કાપવાની પટ્ટી.",
    "Every cut made where the zeros said, and every remainder written as a number.": "દરેક કાપ ત્યાં જ મૂક્યો જ્યાં શૂન્યોએ કહ્યું, અને દરેક શેષ સંખ્યાની જેમ લખી.",
    "Free play. Change any digit, pick a divisor and cut, or grow the ladder.": "મુક્ત રમત. કોઈ પણ અંક બદલો, ભાજક પસંદ કરીને કાપો, અથવા સીડી વધારો.",
    "A zero on the dividend, a zero on the quotient": "ભાજ્ય પર એક શૂન્ય, ભાગફળ પર એક શૂન્ય",
    "Put a zero on the dividend. Keep the divisor. What happens to the answer?": "ભાજ્ય પર એક શૂન્ય મૂકો. ભાજક એ જ રાખો. જવાબનું શું થાય છે?",
    "Drag the zero onto the next rung, then type its quotient.": "શૂન્યને આગલા પગથિયે ખેંચો, પછી તેનું ભાગફળ લખો.",
    "Did the divisor change?": "શું ભાજક બદલાયો?",
    "Count the zeros the dividend gained. The quotient gains the same number of zeros.": "ગણો કે ભાજ્યમાં કેટલાં શૂન્ય ઉમેરાયાં. ભાગફળમાં પણ એટલાં જ શૂન્ય ઉમેરાય છે.",
    "Ten times the dividend gives ten times the quotient. That holds while the divisor stays the same and nothing is left over.": "ભાજ્ય દસ ગણો થાય, તો ભાગફળ પણ દસ ગણું થાય. ભાજક એ જ રહે અને કંઈ ન વધે ત્યાં સુધી આ સાચું છે.",
    "You learned: a zero on the dividend puts a zero on the quotient.": "તમે શીખ્યા: ભાજ્ય પર એક શૂન્યથી ભાગફળ પર પણ એક શૂન્ય આવે છે.",
    "840 ÷ 7, then 8,400 ÷ 7": "840 ÷ 7, પછી 8,400 ÷ 7",
    "84 divided by 7 is 12. Use the pattern to find 840 divided by 7, and then 8,400 divided by 7.": "84 ને 7 વડે ભાગતાં 12 આવે. આ પેટર્નથી 840 ÷ 7 અને પછી 8,400 ÷ 7 શોધો.",
    "Which number gained a zero?": "કઈ સંખ્યામાં એક શૂન્ય ઉમેરાયું?",
    "63 divided by 9 is 7. What is 630 divided by 9?": "63 ને 9 વડે ભાગતાં 7 આવે. 630 ÷ 9 કેટલા થાય?",
    "The divisor is still 9. Where does the new zero on the dividend go?": "ભાજક હજી 9 છે. ભાજ્યનું નવું શૂન્ય ક્યાં જાય છે?",
    "330, 3,300 and 33,000 ÷ 3": "330, 3,300 અને 33,000 ÷ 3",
    "33 divided by 3 is 11. Find 330, 3,300 and 33,000 divided by 3.": "33 ને 3 વડે ભાગતાં 11 આવે. 330, 3,300 અને 33,000 ને 3 વડે ભાગો.",
    "Each rung adds one zero. How many zeros has each quotient gained?": "દરેક પગથિયે એક શૂન્ય ઉમેરાય છે. દરેક ભાગફળમાં કેટલાં શૂન્ય ઉમેરાયાં?",
    "Ten splits off the ones digit": "દસથી એકમનો અંક છૂટો પડે છે",
    "Ten goes into every ten. What is left that cannot make another ten?": "દરેક દસમાં દસ પૂરું જાય છે. શું વધે છે જે બીજો દસ ન બનાવી શકે?",
    "Slide the bar along the rail, or tap a gap, to cut the number.": "સંખ્યા કાપવા પટ્ટીને રેલ પર સરકાવો, અથવા કોઈ ખાલી જગ્યા પર ટૅપ કરો.",
    "Which sticks cannot make another ten?": "કઈ સળીઓ બીજો દસ ન બનાવી શકે?",
    "Lay the bundles out under the cards again, and count the whole bundles first.": "કાર્ડની નીચે ફરી ભારીઓ ગોઠવો, અને પહેલાં આખી ભારીઓ ગણો.",
    "Divided by ten, the ones digit is the remainder. The digits in front of it are the quotient.": "દસ વડે ભાગતાં એકમનો અંક શેષ હોય છે. તેની આગળના અંકો ભાગફળ હોય છે.",
    "You learned: divided by ten, the ones digit is the remainder.": "તમે શીખ્યા: દસ વડે ભાગતાં એકમનો અંક શેષ છે.",
    "Find the quotient and the remainder of 738 divided by 10.": "738 ને 10 વડે ભાગીને ભાગફળ અને શેષ શોધો.",
    "How many zeros does ten have?": "દસમાં કેટલાં શૂન્ય છે?",
    "Find the quotient and remainder of 94 divided by 10.": "94 ને 10 વડે ભાગીને ભાગફળ અને શેષ શોધો.",
    "Which digit counts the loose sticks, and which counts the tens?": "કયો અંક છૂટી સળીઓ ગણે છે, અને કયો દશક?",
    "In 5,316 divided by 10, which digit is the remainder, and what is the quotient?": "5,316 ને 10 વડે ભાગતાં કયો અંક શેષ છે, અને ભાગફળ શું છે?",
    "Ten cuts off one digit. Which digit stands right of the bar?": "દસ એક અંક કાપે છે. પટ્ટીની જમણી બાજુ કયો અંક છે?",
    "A hundred takes two digits, a thousand takes three": "સો બે અંક લે છે, હજાર ત્રણ",
    "How many zeros does the divisor have? Cut off that many digits.": "ભાજકમાં કેટલાં શૂન્ય છે? એટલા જ અંક કાપો.",
    "How many digits does that cut off from the right?": "તેનાથી જમણી બાજુથી કેટલા અંક કપાય છે?",
    "One zero cuts one digit. Two zeros cut two, and three zeros cut three.": "એક શૂન્ય એક અંક કાપે છે. બે શૂન્ય બે, અને ત્રણ શૂન્ય ત્રણ.",
    "By a hundred, the last two digits are the remainder. By a thousand, the last three are.": "સો વડે ભાગતાં છેલ્લા બે અંક શેષ હોય છે. હજાર વડે, છેલ્લા ત્રણ.",
    "You learned: one digit is cut off for each zero in the divisor.": "તમે શીખ્યા: ભાજકના દરેક શૂન્ય માટે એક અંક કપાય છે.",
    "8,254 ÷ 100, then ÷ 1,000": "8,254 ÷ 100, પછી ÷ 1,000",
    "Find the quotient and remainder of 8,254 divided by 100. Then do the same for 8,254 divided by 1,000.": "8,254 ને 100 વડે ભાગીને ભાગફળ અને શેષ શોધો. પછી 8,254 ને 1,000 વડે ભાગીને પણ એમ જ કરો.",
    "How many zeros does this divisor have?": "આ ભાજકમાં કેટલાં શૂન્ય છે?",
    "Find the quotient and remainder of 6,781 divided by 100.": "6,781 ને 100 વડે ભાગીને ભાગફળ અને શેષ શોધો.",
    "A hundred has two zeros. Is the bar two cards in from the right?": "સોમાં બે શૂન્ય છે. શું પટ્ટી જમણી બાજુથી બે કાર્ડ અંદર છે?",
    "Divide 38,265 by 1, by 10, by 100 and by 1,000. Give each quotient and remainder.": "38,265 ને 1 વડે, 10 વડે, 100 વડે અને 1,000 વડે ભાગો. દરેક વખતે ભાગફળ અને શેષ કહો.",
    "Which divisor are you on, and how many zeros does it have?": "તમે કયા ભાજક પર છો, અને તેમાં કેટલાં શૂન્ય છે?",
    "A remainder is a number": "શેષ એક સંખ્યા છે",
    "Read what is in the tray as a number. Does the front zero change it?": "ટ્રેમાં જે છે તેને સંખ્યાની જેમ વાંચો. શું આગળનું શૂન્ય તેને બદલે છે?",
    "Cut the number, then lift a front zero into the saucer.": "સંખ્યા કાપો, પછી આગળનું એક શૂન્ય ઉપાડીને રકાબીમાં મૂકો.",
    "Which zero is standing in front of the other digits?": "કયું શૂન્ય બીજા અંકોની આગળ ઊભું છે?",
    "A zero in front holds no place. Read the tray the way you would read a price.": "આગળનું શૂન્ય કોઈ સ્થાન સાચવતું નથી. ટ્રેને એમ વાંચો જેમ કિંમત વાંચો છો.",
    "A zero in front of a remainder changes nothing, so it is not written.": "શેષની આગળનું શૂન્ય કંઈ બદલતું નથી, તેથી તે લખાતું નથી.",
    "You learned: a zero in front of a remainder is not written.": "તમે શીખ્યા: શેષની આગળનું શૂન્ય લખાતું નથી.",
    "Find the quotient and remainder of 41,007 divided by 1,000.": "41,007 ને 1,000 વડે ભાગીને ભાગફળ અને શેષ શોધો.",
    "What does the remainder tray read as a number?": "શેષની ટ્રેમાં કઈ સંખ્યા છે?",
    "Find the quotient and remainder of 70,009 divided by 1,000. Write the remainder the way a number is written.": "70,009 ને 1,000 વડે ભાગીને ભાગફળ અને શેષ શોધો. શેષ એમ લખો જેમ સંખ્યા લખાય છે.",
    "Lift the front zeros. Does the remainder change?": "આગળનાં શૂન્ય ઉપાડો. શું શેષ બદલાય છે?",
    "4,506 ÷ 100, then ÷ 1,000": "4,506 ÷ 100, પછી ÷ 1,000",
    "Find the quotient and remainder of 4,506 divided by 100. Then do the same for 4,506 divided by 1,000.": "4,506 ને 100 વડે ભાગીને ભાગફળ અને શેષ શોધો. પછી 4,506 ને 1,000 વડે ભાગીને પણ એમ જ કરો.",
    "Which zero stands in front, and which zero holds a place?": "કયું શૂન્ય આગળ છે, અને કયું શૂન્ય સ્થાન સાચવે છે?",
    /* the splitter's own words */
    "quotient": "ભાગફળ", "remainder": "શેષ", "Q": "ભા", "R": "શે",
    "O": "એકમ", "T": "દશક", "H": "શતક", "Th": "હજાર", "TTh": "દસ હજાર",
    "rungs": "પગથિયાં", "cuts": "કાપ", "New": "નવી", "Ladder": "સીડી", "Cards": "કાર્ડ",
    "Start a new ladder": "નવી સીડી શરૂ કરો", "Show the ladder": "સીડી બતાવો", "Show the number cards": "સંખ્યા કાર્ડ બતાવો",
    "Add a zero to the dividend": "ભાજ્યમાં એક શૂન્ય ઉમેરો", "Add a zero to the divisor as well": "ભાજકમાં પણ એક શૂન્ય ઉમેરો",
    "Lift this zero into the saucer": "આ શૂન્ય ઉપાડીને રકાબીમાં મૂકો", "Put the zero back in the tray": "શૂન્યને પાછું ટ્રેમાં મૂકો",
    "The splitter bar: drop it to cut the number": "કાપવાની પટ્ટી: સંખ્યા કાપવા તેને નીચે મૂકો",
  },
};

/* ── the tool's own pieces ─────────────────────────────────────────────────────────────── */
/* the chapter's content colours: the dividend deep blue, the divisor amber, the quotient green,
   what is left over vermilion, a zero holding a place grey (full size, never faint) */
const PS_BLUE = CONTENT.hundred;
const PS_AMBER = CONTENT.ten;
const PS_GREEN = CONTENT.one;
const PS_VERM = CONTENT.pointer;
const PS_LINE = CONTENT.line;
const PS_ZERO = "#767676";
/* coloured numerals take a deeper ink (amber deeper still, so small amber text reads at 4.5:1) */
const psInk = (c: string) => shade(c, c === PS_AMBER ? 0.42 : 0.25);
const QR = [{ label: "quotient" }, { label: "remainder" }];
const PS_HEAD = ["O", "T", "H", "Th", "TTh"];
const PS_PLACES = ["ones", "tens", "hundreds", "thousands", "ten thousands"];
const psZeros = (d: number) => String(d).length - 1;
/* the number's digits by column, ones first; "" where the number has no digit */
const psColumns = (n: number, cols: number) => {
  const s = String(n);
  return Array.from({ length: cols }, (_, j) => (j < s.length ? s[s.length - 1 - j] : ""));
};
/* the steps a question lays out: rungs to write (ladder) or cuts to make (cut) */
const psStepsOf = (it: any) => (it && it.kind === "ladder" ? it.rungs.length : it && it.kind === "cut" ? it.divs.length : 0);
/* the right answer to one step: a rung's quotient, or a cut's quotient and remainder */
const psStepAnswer = (it: any, k: number): any => (it.kind === "ladder" ? it.rungs[k] / it.by
  : [Math.floor(it.n / it.divs[k]), it.n % it.divs[k]]);
/* a box written with zeros in front of its other digits ("007"): not the way a number is written */
const psFrontZero = (v: any, np: number) => slotPartsOf(v, np).some((s) => s.length > 1 && s[0] === "0");

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   items   three a phase, the plan's questions with their ids.
           kind "ladder": base ÷ by is the given fact; rungs = the dividends the child grows a zero at a
                time; answer = the top rung's quotient (the rungs below it are steps checked on Enter)
           kind "cut": n cut for each divisor in divs in turn; answer = [quotient, remainder] of the
                last cut (the cuts before it are steps checked on Enter)
           slip  the item's misconception (nearMiss): judge must reject it */
const PHASES = [
  {
    n: 1,
    concept: "A zero on the dividend, a zero on the quotient",
    conceptId: "M1.S2.T3.C8", objectiveIds: ["O3"],
    says: ["Put a zero on the dividend. Keep the divisor. What happens to the answer?",
      "Drag the zero onto the next rung, then type its quotient."],
    ladder: ["Did the divisor change?", "Count the zeros the dividend gained. The quotient gains the same number of zeros."],
    closing: "Ten times the dividend gives ten times the quotient. That holds while the divisor stays the same and nothing is left over.",
    learned: "You learned: a zero on the dividend puts a zero on the quotient.",
    traceback: "The child's own rung is written beside the ladder (a zero on the divisor too, or divisor times the child's quotient); then the ladder is walked up from the given fact, each rung one zero longer on the dividend and on the quotient, ending on the top rung's quotient.",
    items: [
      /* learn ML1: answer in the plan = 840 divided by 7 is 120, and 8400 divided by 7 is 1200 (two rungs:
         120 is checked as a step on Enter, 1200 is the answer) */
      { qid: "M1.S2.T3.C8:ML1", kind: "ladder", base: 84, by: 7, rungs: [840, 8400], answer: 1200, slip: 12, winMs: 2600,
        ask: "840 ÷ 7, then 8,400 ÷ 7",
        say: "84 divided by 7 is 12. Use the pattern to find 840 divided by 7, and then 8,400 divided by 7.", miss: "Which number gained a zero?" },
      /* practice 1: answer in the plan = 70, because 63 divided by 9 leaves nothing over, so ten times the dividend gives ten times the quotient */
      { qid: "M1.S2.T3.C8:1", kind: "ladder", base: 63, by: 9, rungs: [630], answer: 70, slip: 7, winMs: 2200,
        ask: "630 ÷ 9 = ?",
        say: "63 divided by 9 is 7. What is 630 divided by 9?", miss: "The divisor is still 9. Where does the new zero on the dividend go?" },
      /* practice 4: answer in the plan = 110, 1100 and 11,000, one more zero each time (three rungs: 110 and
         1,100 are steps, 11,000 is the answer) */
      { qid: "M1.S2.T3.C8:4", kind: "ladder", base: 33, by: 3, rungs: [330, 3300, 33000], answer: 11000, slip: 11, winMs: 2600,
        ask: "330, 3,300 and 33,000 ÷ 3",
        say: "33 divided by 3 is 11. Find 330, 3,300 and 33,000 divided by 3.", miss: "Each rung adds one zero. How many zeros has each quotient gained?" },
    ],
  },
  {
    n: 2,
    concept: "Ten splits off the ones digit",
    conceptId: "M1.S2.T3.C9", objectiveIds: ["O3"],
    says: ["Ten goes into every ten. What is left that cannot make another ten?",
      "Slide the bar along the rail, or tap a gap, to cut the number."],
    ladder: ["Which sticks cannot make another ten?", "Lay the bundles out under the cards again, and count the whole bundles first."],
    closing: "Divided by ten, the ones digit is the remainder. The digits in front of it are the quotient.",
    learned: "You learned: divided by ten, the ones digit is the remainder.",
    traceback: "The zero of ten is counted and one card lights from the right; the bar drops there, the digits fall into the trays and the bundles sort into whole tens and loose sticks; the check ten times the child's quotient plus the remainder stands beside ten times the right one, and both trays are read as numbers.",
    items: [
      /* learn ML2: answer in the plan = 73 remainder 8 */
      { qid: "M1.S2.T3.C9:ML2", kind: "cut", n: 738, divs: [10], parts: QR, answer: [73, 8], slip: "38|7", winMs: 3000,
        ask: "738 ÷ 10",
        say: "Find the quotient and the remainder of 738 divided by 10.", miss: "How many zeros does ten have?" },
      /* practice 2: answer in the plan = 9 remainder 4 */
      { qid: "M1.S2.T3.C9:2", kind: "cut", n: 94, divs: [10], parts: QR, answer: [9, 4], slip: "4|9", winMs: 3000,
        ask: "94 ÷ 10",
        say: "Find the quotient and remainder of 94 divided by 10.", miss: "Which digit counts the loose sticks, and which counts the tens?" },
      /* practice 3: answer in the plan = The ones digit, 6, is the remainder, and the quotient is 531 */
      { qid: "M1.S2.T3.C9:3", kind: "cut", n: 5316, divs: [10], parts: QR, answer: [531, 6], slip: "316|5", winMs: 3000,
        ask: "5,316 ÷ 10",
        say: "In 5,316 divided by 10, which digit is the remainder, and what is the quotient?", miss: "Ten cuts off one digit. Which digit stands right of the bar?" },
    ],
  },
  {
    n: 3,
    concept: "A hundred takes two digits, a thousand takes three",
    conceptId: "M1.S2.T3.C10", objectiveIds: ["O4"],
    says: ["How many zeros does the divisor have? Cut off that many digits."],
    ladder: ["How many digits does that cut off from the right?", "One zero cuts one digit. Two zeros cut two, and three zeros cut three."],
    closing: "By a hundred, the last two digits are the remainder. By a thousand, the last three are.",
    learned: "You learned: one digit is cut off for each zero in the divisor.",
    traceback: "The divisor's zeros are counted one at a time, each lighting one card from the right; the bar drops after the last one, the trays fill and are read as numbers, and the check divisor times quotient plus remainder rebuilds the number beside the child's own check.",
    items: [
      /* learn ML3: answer in the plan = 82 remainder 54, and then 8 remainder 254 (the cut by 100 is a step,
         the cut by 1,000 is the answer) */
      { qid: "M1.S2.T3.C10:ML3", kind: "cut", n: 8254, divs: [100, 1000], parts: QR, answer: [8, 254], slip: "825|4", winMs: 3200,
        ask: "8,254 ÷ 100, then ÷ 1,000",
        say: "Find the quotient and remainder of 8,254 divided by 100. Then do the same for 8,254 divided by 1,000.", miss: "How many zeros does this divisor have?" },
      /* practice 5: answer in the plan = 67 remainder 81 */
      { qid: "M1.S2.T3.C10:5", kind: "cut", n: 6781, divs: [100], parts: QR, answer: [67, 81], slip: "678|1", winMs: 3000,
        ask: "6,781 ÷ 100",
        say: "Find the quotient and remainder of 6,781 divided by 100.", miss: "A hundred has two zeros. Is the bar two cards in from the right?" },
      /* practice 6: answer in the plan = 38,265 remainder 0; 3826 remainder 5; 382 remainder 65; and 38 remainder 265
         (the cuts by 1, 10 and 100 are steps, the cut by 1,000 is the answer) */
      { qid: "M1.S2.T3.C10:6", kind: "cut", n: 38265, divs: [1, 10, 100, 1000], parts: QR, answer: [38, 265], slip: "3826|5", winMs: 3200,
        ask: "38,265 ÷ 1, 10, 100, 1,000",
        say: "Divide 38,265 by 1, by 10, by 100 and by 1,000. Give each quotient and remainder.", miss: "Which divisor are you on, and how many zeros does it have?" },
    ],
  },
  {
    n: 4,
    concept: "A remainder is a number",
    conceptId: "M1.S2.T3.C11", objectiveIds: ["O4"],
    says: ["Read what is in the tray as a number. Does the front zero change it?",
      "Cut the number, then lift a front zero into the saucer."],
    ladder: ["Which zero is standing in front of the other digits?", "A zero in front holds no place. Read the tray the way you would read a price."],
    closing: "A zero in front of a remainder changes nothing, so it is not written.",
    learned: "You learned: a zero in front of a remainder is not written.",
    traceback: "The bar drops at the divisor's setting, the front zeros lift off the remainder tray into the saucer one at a time while the tray still reads the same number, a zero with a digit on its left stays lit in the tray, and both trays are read as numbers.",
    items: [
      /* learn ML4: answer in the plan = 41 remainder 7 */
      { qid: "M1.S2.T3.C11:ML4", kind: "cut", n: 41007, divs: [1000], parts: QR, answer: [41, 7], slip: "41|007", lift: true, winMs: 3200,
        ask: "41,007 ÷ 1,000",
        say: "Find the quotient and remainder of 41,007 divided by 1,000.", miss: "What does the remainder tray read as a number?" },
      /* practice 7: answer in the plan = 70 remainder 9. The last three digits read 009, and the zeros in front change nothing */
      { qid: "M1.S2.T3.C11:7", kind: "cut", n: 70009, divs: [1000], parts: QR, answer: [70, 9], slip: "70|009", lift: true, winMs: 3200,
        ask: "70,009 ÷ 1,000",
        say: "Find the quotient and remainder of 70,009 divided by 1,000. Write the remainder the way a number is written.", miss: "Lift the front zeros. Does the remainder change?" },
      /* practice 8: answer in the plan = 45 remainder 6, and then 4 remainder 506. The last two digits read 06, which is
         the number 6 (the cut by 100 is a step, the cut by 1,000 is the answer) */
      { qid: "M1.S2.T3.C11:8", kind: "cut", n: 4506, divs: [100, 1000], parts: QR, answer: [4, 506], slip: "4|56", lift: true, winMs: 3200,
        ask: "4,506 ÷ 100, then ÷ 1,000",
        say: "Find the quotient and remainder of 4,506 divided by 100. Then do the same for 4,506 divided by 1,000.", miss: "Which zero stands in front, and which zero holds a place?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  columnWidth: 132, places: PS_PLACES, headings: PS_HEAD, ladderRungs: 4,
  colours: { dividend: PS_BLUE, divisor: PS_AMBER, quotient: PS_GREEN, remainder: PS_VERM, zero: PS_ZERO },
  rule: "one digit is cut off from the right for each zero in the divisor; a remainder is written without front zeros",
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: numbers compare as numbers; a two-part answer needs both boxes right, and a box written with
   zeros in front ("007") is not yet a number written as a number (phase 4's point) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v) && !psFrontZero(v, item.parts.length);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: a second route that shares no code with judge or the picture. The ladder is rebuilt by
   multiplying the given fact by ten a rung at a time; a cut is re-done as long division by taking
   away chunks of the divisor (thousands, hundreds, tens, ones of it), never by reading digits */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "ladder") {
    if (it.base % it.by !== 0) return false;
    let D = it.base, q = it.base / it.by;
    for (const R of it.rungs) { D *= 10; q *= 10; if (R !== D) return false; }
    return q === it.answer && q * it.by === D;
  }
  if (it.kind === "cut") {
    const d = it.divs[it.divs.length - 1];
    let rem = it.n, q = 0;
    for (let chunk = 100000; chunk >= 1; chunk /= 10) while (rem >= d * chunk) { rem -= d * chunk; q += chunk; }
    return Array.isArray(it.answer) && it.answer[0] === q && it.answer[1] === rem && rem < d && q * d + rem === it.n;
  }
  return false;
}));
/* the item's misconception: a zero on the divisor too (12, 7, 11), the first digit read as the
   remainder, one digit cut whatever the divisor, the remainder copied with its front zeros, or the
   middle zero lifted as well */
const nearMiss = (item: any) => item.slip;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;
/* the slot shows a typed number from 1,000 up with its Indian commas; a box with front zeros ("007")
   stays exactly as the child typed it */
const format = (v: any) => { const s = String(v ?? ""); return /^[1-9]\d{3,}$/.test(s) ? indian(Number(s)) : s; };

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => T.submit(item.answer);
/* every answer is typed (quotient and remainder boxes, or one number): the agent types it too */
const answer = (item: any, v: any) => undefined;
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────── */

/* the splitter: five place columns right-aligned at x 660; the rail and bar above the headings, the
   digit cards, the two trays, the readings, the bundle view, the checks. Right panel from x 740. */
const SP = { cw: 132, right: 660, railY: 40, headY: 104, cardY: 114, cardH: 72, trayY: 198, trayH: 80,
  readY: 318, bunY: 330, bunH: 104, chk1: 466, chk2: 516, px: 740, pw: 346, rowY: 300, rowH: 56 };
const spGap = (k: number) => SP.right - k * SP.cw;          /* the gap k digits in from the right */
const spColX = (j: number) => SP.right - (j + 1) * SP.cw;   /* column j (0 = ones) */
const spColC = (j: number) => spColX(j) + SP.cw / 2;
/* the saucer the front zeros are lifted into, level with the trays */
const spSaucer = (i: number) => ({ x: SP.px + 32 + i * 50, y: SP.trayY + 40 });

/* the ladder: rungs one above the other, the given fact at the bottom; the zero waits in its dish at the
   left of the rung being grown; the checks stand in the right panel from x 870 */
const LD = { dvL: 98, dvR: 318, divL: 366, divR: 516, qL: 564, qR: 846, px: 876, h: 104 };
const ldTop = (r: number) => 384 - r * 120;

const PS_CSS = `
.ps-slide{transition:transform 420ms cubic-bezier(.3,.7,.25,1)}
.ps-drop{animation:psDrop 420ms ease-out both}
@keyframes psDrop{from{transform:translateY(-84px);opacity:.15}to{transform:none;opacity:1}}
.ps-new{animation:psIn 480ms ease-out both}
@keyframes psIn{from{opacity:0}to{opacity:1}}
.ps-grab{cursor:grab}
@media (prefers-reduced-motion:reduce){.ps-slide{transition:none}.ps-drop,.ps-new{animation:none}}
`;

/* a number's characters with grey zeros (a zero holding a place) */
const psDigits = (s: string, color: string, gained = 0) => {
  const out: any[] = [];
  const cut = s.length - gained;
  s.split("").forEach((ch, i) => {
    const under = i >= cut ? { textDecoration: "underline", textDecorationThickness: "4px", textUnderlineOffset: "7px" } : undefined;
    out.push(<tspan key={i} fill={ch === "0" ? PS_ZERO : color} style={under as any}>{ch}</tspan>);
  });
  return out;
};

/* one bundle of the bundle view, centred at (x, y): a loose stick, a bundle of ten, of a hundred,
   a crate of a thousand, a crate of ten thousand */
function PsBundle({ kind, x, y, c }: any) {
  const f = c, e = shade(c, 0.35);
  if (kind === 0) return <rect x={x - 3.5} y={y - 12} width={7} height={24} rx={3.5} fill={f} stroke={e} strokeWidth={1} />;
  if (kind === 1) return (
    <g>
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={x - 11 + i * 4.6} y={y - 12} width={4} height={24} rx={2} fill={f} stroke={e} strokeWidth={0.8} />)}
      <rect x={x - 13} y={y - 2} width={26} height={5} rx={2} fill={e} />
    </g>
  );
  if (kind === 2) return (
    <g>
      <rect x={x - 14} y={y - 12} width={28} height={24} rx={4} fill={f} stroke={e} strokeWidth={1.5} />
      {[1, 2, 3, 4, 5].map((i) => <line key={i} x1={x - 14 + i * 4.7} y1={y - 12} x2={x - 14 + i * 4.7} y2={y + 12} stroke={e} strokeWidth={0.8} />)}
      <rect x={x - 16} y={y - 7} width={32} height={4} rx={2} fill={e} />
      <rect x={x - 16} y={y + 3} width={32} height={4} rx={2} fill={e} />
    </g>
  );
  const big = kind === 4 ? 2 : 0;
  return (
    <g>
      <path d={`M ${x - 14 - big} ${y - 6} L ${x - 8} ${y - 12 - big} L ${x + 15 + big} ${y - 12 - big} L ${x + 9} ${y - 6} Z`} fill={tint(c, 0.35)} stroke={e} strokeWidth={1.2} />
      <path d={`M ${x + 9} ${y - 6} L ${x + 15 + big} ${y - 12 - big} L ${x + 15 + big} ${y + 7} L ${x + 9} ${y + 12 + big} Z`} fill={shade(c, 0.15)} stroke={e} strokeWidth={1.2} />
      <rect x={x - 14 - big} y={y - 6} width={23 + big} height={18 + big} fill={f} stroke={e} strokeWidth={1.2} />
      {kind === 4 && <rect x={x - 11 - big} y={y - 3} width={17 + big} height={12 + big} fill="none" stroke={e} strokeWidth={1.2} />}
    </g>
  );
}

/* divisor × quotient + remainder = the number it rebuilds (the chapter's check); the rebuilt number is
   deep blue only when it is the dividend */
function PsCheck({ x, y, c, C }: any) {
  const made = c.d * c.q + c.r;
  return (
    <text x={x} y={y} fontSize={T.label} fontWeight={700} fill={C.ink}>
      <tspan fill={psInk(PS_AMBER)}>{indian(c.d)}</tspan>
      <tspan>{" × "}</tspan>
      <tspan fill={psInk(PS_GREEN)}>{indian(c.q)}</tspan>
      <tspan>{" + "}</tspan>
      <tspan fill={psInk(PS_VERM)}>{indian(c.r)}</tspan>
      <tspan>{" = "}</tspan>
      <tspan fill={made === c.n ? psInk(PS_BLUE) : C.ink}>{indian(made)}</tspan>
    </text>
  );
}

const psFresh = (it: any) => ({
  kind: it.kind, n: it.n || 0, base: it.base || 0, by: it.by || 1, rungs: it.rungs || [], divs: it.divs || [1], lift: !!it.lift,
  step: 0, grown: 0, shown: 0, walk: -1,
  bar: 0, cut: null as any, lifted: [] as number[], held: null as any, kept: [] as any[], reads: it.kind === "free", zc: -1, tag: false,
  mine: null as any, right: null as any, touched: false,
  view: "cut", flad: [{ D: 84, d: 7 }],
});

function Work({ phase, item, index, stage, wrong, typed, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const [st, setSt] = useState<any>(() => psFresh(item));
  const S = useRef<any>(st);
  const put = (p: any) => { S.current = { ...S.current, ...p }; setSt(S.current); };
  const setupFor = useRef(index);
  const typedRef = useRef(typed); typedRef.current = typed;
  const busy = tl.busy;

  const reset = (it: any) => { tl.stop(); S.current = psFresh(it); setSt(S.current); api.lock(false); };
  useEffect(() => {
    if (stage === "ask" && setupFor.current !== index) { setupFor.current = index; reset(item); }
  }, [stage, index]);
  /* free play (the plan's freePlay): any five-digit number, any of the four divisors, the front-zero
     lift and the bundles, and the ladder with a zero on the dividend or on the divisor as well */
  useEffect(() => {
    if (!free) return;
    setupFor.current = -2;
    reset({ kind: "free", n: 41007 });
  }, [free]);

  const kind = st.kind;
  const cutView = kind === "cut" || (kind === "free" && st.view === "cut");
  const cols = kind === "free" ? 5 : Math.max(3, String(st.n).length);
  const dig = psColumns(st.n, cols);
  const lastStep = kind === "free" ? 0 : psStepsOf(item) - 1;
  const stepNow = Math.min(st.step, Math.max(lastStep, 0));
  const divisor = kind === "free" ? Math.pow(10, st.cut === null ? st.bar : st.cut) : kind === "cut" ? st.divs[stepNow] : st.by;

  /* ── the cut ── */
  const trayOf = (k: number) => {
    const qs = dig.slice(k).reverse().join(""), rs = dig.slice(0, k).reverse().join("");
    return { qs, rs, q: qs === "" ? 0 : Number(qs), r: rs === "" ? 0 : Number(rs) };
  };
  /* a zero in the remainder tray lifts only while it stands in front of the tray's other digits */
  const liftableIn = (s: any, j: number) => s.cut !== null && j < s.cut && j >= 1 && dig[j] === "0" && !s.lifted.includes(j)
    && Array.from({ length: s.cut - 1 - j }, (_, i) => j + 1 + i).every((c) => s.lifted.includes(c));
  const canCut = !busy && ((stage === "ask" && kind === "cut") || (free && st.view === "cut"));
  const cutAt = (k: number) => {
    if (!canCut) return;
    const kk = Math.max(0, Math.min(cols - 1, k));
    put({ touched: true, held: null });
    tl.run([
      [420, () => put({ bar: kk, cut: null, lifted: [], reads: free, zc: -1, tag: free })],
      [0, () => {
        const t = trayOf(kk);
        put({ cut: kk, right: free ? { d: Math.pow(10, kk), q: t.q, r: t.r, n: S.current.n } : S.current.right });
        api.sfx.tick();
      }],
    ]);
  };
  const canLift = canCut && st.cut !== null;
  const lift = (j: number) => {
    if (!canLift) return;
    const s = S.current;
    if (liftableIn(s, j)) { put({ lifted: [...s.lifted, j], held: null, touched: true }); api.sfx.tick(); }
    else if (dig[j] === "0" && j < s.cut && !s.lifted.includes(j)) { put({ held: j, touched: true }); } /* it will not go: it stays lit */
  };
  const putBack = () => {
    if (!canLift) return;
    const L = S.current.lifted;
    if (!L.length) return;
    put({ lifted: L.slice(0, -1) }); api.sfx.tick();
  };
  /* free play: a tap on a card counts its digit on by one (9 goes round to 0) */
  const bump = (j: number) => {
    if (!(free && st.view === "cut") || busy) return;
    const d = dig[j] === "" ? 0 : Number(dig[j]), p = Math.pow(10, j);
    const n2 = S.current.n - d * p + ((d + 1) % 10) * p;
    put({ n: n2 === 0 ? 1 : n2, cut: null, lifted: [], held: null, right: null });
    api.sfx.tick();
  };

  /* ── the ladder ── */
  const canGrow = !busy && stage === "ask" && kind === "ladder" && st.grown <= st.step && st.step < st.rungs.length;
  const grow = () => { if (!canGrow) return; put({ grown: S.current.step + 1, touched: true }); api.sfx.tick(); };
  const canLad = free && st.view === "ladder" && !busy;
  const ladDividend = () => {
    const R = S.current.flad; if (!canLad || R.length >= 4) return;
    const top = R[R.length - 1];
    put({ flad: [...R, { D: top.D * 10, d: top.d }] }); api.sfx.tick();
  };
  const ladDivisorOk = st.flad.length >= 2 && st.flad[st.flad.length - 1].D === st.flad[st.flad.length - 2].D * 10;
  const ladDivisor = () => {
    const R = S.current.flad; if (!canLad || R.length < 2) return;
    const top = R[R.length - 1], below = R[R.length - 2];
    if (top.D !== below.D * 10) return;
    put({ flad: [...R.slice(0, -1), { D: top.D, d: top.d === below.d ? below.d * 10 : below.d }] }); api.sfx.tick();
  };

  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (pay.src === "zero") {
      if (!moved) { grow(); return; }
      const top = ldTop(S.current.step + 1);
      if (p.x >= 30 && p.x <= LD.dvR + 60 && p.y >= top - 40 && p.y <= top + LD.h + 40) grow();
      return;
    }
    if (pay.src === "bar") { cutAt(moved ? Math.round((SP.right - p.x) / SP.cw) : S.current.bar); return; }
    if (pay.src === "fz") {
      const onSaucer = p.x >= SP.px - 60 && p.x <= SP.px + 260 && p.y >= SP.trayY - 70 && p.y <= SP.trayY + SP.trayH + 70;
      if (moved && !onSaucer) return; /* let go elsewhere: it goes back */
      lift(pay.col); return;
    }
    if (pay.src === "sz") {
      if (moved && p.x > SP.right + 40) return;
      putBack();
    }
  });

  /* ── steps: a question with more than one rung or cut checks the earlier ones on Enter ── */
  const stepOk = (k: number, v: any) => {
    const a = psStepAnswer(item, k);
    return Array.isArray(a) ? judgeSlotParts({ answer: a }, v) && !psFrontZero(v, 2) : leadNumber(v) === a;
  };
  /* the cut a step makes, as the maths moves: the divisor's zeros counted (each lights one card from the
     right), the bar slid in and dropped, the front zeros lifted, a middle zero lit, the trays read */
  const cutSteps = (k: number, slow: number, count: boolean) => {
    const d = item.divs[k], z = psZeros(d), out: any[] = [];
    const ready = () => S.current.cut === z;
    if (count) {
      out.push([60, () => put({ zc: -1, tag: false })]);
      for (let i = 0; i < z; i++) { const ii = i; out.push([440 * slow, () => { put({ zc: ii }); api.sfx.tick(); }]); }
      out.push([320 * slow, () => put({ tag: true })]);
    }
    out.push([0, () => { if (!ready()) put({ cut: null, lifted: [], held: null, reads: false }); }]);
    out.push([440 * slow, () => { if (!ready()) put({ bar: z }); }]);
    out.push([440 * slow, () => { if (!ready()) { put({ cut: z }); api.sfx.tick(); } }]);
    for (let j = z - 1; j >= 1 && dig[j] === "0"; j--) {
      const jj = j;
      out.push([620 * slow, () => { if (!S.current.lifted.includes(jj)) { put({ lifted: [...S.current.lifted, jj] }); api.sfx.tick(); } }]);
    }
    let front = z - 1;
    while (front >= 1 && dig[front] === "0") front--;
    for (let j = front - 1; j >= 0; j--) if (dig[j] === "0") { const jj = j; out.push([560 * slow, () => put({ held: jj })]); }
    out.push([420 * slow, () => put({ reads: true })]);
    return out;
  };
  const keepOf = (k: number) => { const a = psStepAnswer(item, k); return { d: item.divs[k], q: a[0], r: a[1] }; };
  const acceptStep = () => {
    const k = S.current.step;
    api.lock(true);
    if (kind === "ladder") {
      tl.run([
        [380, () => put({ grown: Math.max(S.current.grown, k + 1) })],
        [620, () => { put({ shown: k + 1, step: k + 1 }); api.sfx.tick(); }],
      ], () => { api.setTyped(""); api.lock(false); api.say([{ en: `Now ${indian(item.rungs[k + 1])} divided by ${item.by}.`,
        hi: `अब ${indian(item.rungs[k + 1])} को ${item.by} से भाग दो।`, gu: `હવે ${indian(item.rungs[k + 1])} ને ${item.by} વડે ભાગો.` }]); });
    } else {
      tl.run([
        ...cutSteps(k, 0.6, false),
        [700, () => put({ kept: [...S.current.kept, keepOf(k)] })],
        [300, () => put({ step: k + 1, cut: null, lifted: [], held: null, reads: false, zc: -1, tag: false })],
      ], () => { api.setTyped(""); api.lock(false); api.say([{ en: `Now divide ${indian(item.n)} by ${indian(item.divs[k + 1])}.`,
        hi: `अब ${indian(item.n)} को ${indian(item.divs[k + 1])} से भाग दो।`, gu: `હવે ${indian(item.n)} ને ${indian(item.divs[k + 1])} વડે ભાગો.` }]); });
    }
  };
  const enterFn = stage === "ask" && !free && lastStep > 0 && st.step < lastStep ? (v: any) => {
    const val = v === undefined ? typedRef.current : v;
    if (val === "" || val === null || val === undefined) return;
    if (judge(item, val)) { api.submit(val); return; }
    if (stepOk(S.current.step, val)) { acceptStep(); return; }
    api.submit(val);
  } : null;
  api.onEnter(enterFn);
  HOOK.check = () => undefined;

  /* ── the win: the maths moves to the answer ── */
  useEffect(() => {
    if (stage !== "win") return;
    if (kind === "ladder") {
      const W1: any[] = [];
      for (let r = S.current.shown; r < item.rungs.length; r++) {
        const rr = r;
        W1.push([300, () => put({ grown: Math.max(S.current.grown, rr + 1) })]);
        W1.push([360, () => { put({ shown: rr + 1 }); api.sfx.tick(); }]);
      }
      W1.push([400, () => put({ step: lastStep, right: { d: item.by, q: item.answer, D: item.rungs[lastStep] } })]);
      tl.run(W1);
    } else if (kind === "cut") {
      const skipped: any[] = [];
      for (let j = S.current.step; j < lastStep; j++) skipped.push(keepOf(j));
      tl.run([
        [0, () => { if (skipped.length) put({ kept: [...S.current.kept, ...skipped], step: lastStep, cut: null, lifted: [], reads: false }); }],
        ...cutSteps(lastStep, 0.7, false),
        [420, () => put({ right: { d: item.divs[lastStep], q: item.answer[0], r: item.answer[1], n: item.n } })],
        [480, () => put({ kept: [...S.current.kept, keepOf(lastStep)] })],
      ]);
    }
  }, [stage]);

  /* ── the traceback: the mathematics redrawn in steps, ending on the whole right answer;
     nothing marked, nothing cleared ── */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    put({ touched: true });
    const k0 = S.current.step, R: any[] = [];
    if (kind === "ladder") {
      const g = leadNumber(wrong.value), q0 = item.base / item.by;
      /* the child's own rung beside the ladder: a zero on the divisor too keeps the quotient, or seven
         times the child's quotient falls short of the dividend */
      if (g !== null && g >= 0 && g <= 999999) R.push([700, () => put({ mine: g === q0
        ? { kind: "div", D: item.rungs[k0], d: item.by * 10, q: g } : { kind: "mul", d: item.by, q: g } })]);
      R.push([360, () => put({ walk: 0 })]);
      for (let r = 0; r < item.rungs.length; r++) {
        const rr = r;
        R.push([520, () => put({ walk: rr + 1, grown: Math.max(S.current.grown, rr + 1) })]);
        R.push([560, () => { put({ shown: Math.max(S.current.shown, rr + 1) }); api.sfx.tick(); }]);
      }
      R.push([420, () => put({ walk: -1, step: lastStep, right: { d: item.by, q: item.answer, D: item.rungs[lastStep] } })]);
    } else if (kind === "cut") {
      const got = slotPartsOf(wrong.value, 2), a = psStepAnswer(item, k0), d0 = item.divs[k0];
      const gq = got[0] === "" ? null : Number(got[0]), gr = got[1] === "" ? null : Number(got[1]);
      /* the child's numbers put back together: divisor × quotient + remainder, beside the number */
      if (gq !== null && gr !== null && !(gq === a[0] && gr === a[1]) && d0 * gq + gr <= 9999999)
        R.push([760, () => put({ mine: { d: d0, q: gq, r: gr, n: item.n } })]);
      R.push(...cutSteps(k0, 1.25, true));
      R.push([520, () => put({ right: { d: d0, q: a[0], r: a[1], n: item.n } })]);
      for (let k = k0 + 1; k <= lastStep; k++) {
        const kk = k, ak = psStepAnswer(item, kk);
        R.push([900, () => put({ kept: [...S.current.kept, keepOf(kk - 1)], step: kk, cut: null, lifted: [], held: null, reads: false, zc: -1, tag: false })]);
        R.push(...cutSteps(kk, 0.8, true));
        R.push([420, () => put({ right: { d: item.divs[kk], q: ak[0], r: ak[1], n: item.n } })]);
      }
    }
    R.push([300, () => {}]);
    tl.run(R, () => api.lock(false));
  }, [wrong]);

  /* ── what the host and the agent read back (toolApi.getState): the plan's state fields ── */
  const shownCut = st.cut;
  const tray = cutView && shownCut !== null ? trayOf(shownCut) : null;
  const total = kind === "free" ? 0 : phase.items.reduce((a: number, it: any) => a + psStepsOf(it), 0);
  const before = kind === "free" ? 0 : phase.items.slice(0, index).reduce((a: number, it: any) => a + psStepsOf(it), 0);
  const made = stage === "idle" ? total : Math.min(total, before + (kind === "ladder" ? st.shown : st.kept.length));
  const ladRows = kind === "free"
    ? st.flad.map((r: any, i: number) => ({ D: r.D, d: r.d, q: r.D / r.d, grown: true, shown: true, gained: 0, i }))
    : [{ D: st.base, d: st.by, q: st.base / st.by, grown: true, shown: true, gained: 0 },
      ...st.rungs.map((D: number, i: number) => ({ D, d: st.by, q: D / st.by, grown: i < st.grown, shown: i < st.shown, gained: i + 1 }))];
  api.share({
    number: cutView ? st.n : null, divisor, cutAt: cutView ? shownCut : null,
    quotientTray: tray ? tray.qs : "", remainderTray: tray ? tray.rs.slice(st.lifted.length) : "",
    liftedZeros: st.lifted.length, cutsMade: made, bundlesShown: cutView,
    rungs: cutView ? [] : ladRows.filter((r: any) => r.grown).map((r: any) => ({ dividend: r.D, divisor: r.d, quotient: r.shown ? r.q : null })),
  });

  /* ── drawing ── */
  const barDrag = drag.drag && drag.drag.payload && drag.drag.payload.src === "bar" && drag.drag.moved ? drag.drag : null;
  const zeroDrag = drag.drag && drag.drag.payload && drag.drag.payload.src === "zero" && drag.drag.moved ? drag.drag : null;
  const barX = barDrag ? Math.max(spGap(cols - 1), Math.min(spGap(0), barDrag.x)) : spGap(st.bar);
  const cutNow = barDrag ? null : shownCut;
  const liftCol = cutNow === null ? null : (() => { for (let j = cutNow - 1; j >= 1; j--) if (liftableIn(st, j)) return j; return null; })();
  const saucerOn = cutView && (kind === "free" || st.lift);
  const pending = kind === "ladder" && st.grown <= st.step && st.step < st.rungs.length && (stage === "ask" || stage === "teach");

  const invite = stage !== "ask" || busy ? null
    : kind === "ladder" ? (canGrow && !zeroDrag ? { x: 44, y: ldTop(st.step + 1) + 52, r: 42 } : null)
      : kind === "cut" ? (cutNow === null && !barDrag ? { x: spGap(st.bar), y: SP.railY, r: 42 }
        : liftCol !== null ? { x: spColC(liftCol), y: SP.trayY + 40, r: 42 } : null)
        : null;

  /* the divisor card: "÷ 1,000" laid out a character at a time, so each zero can be counted */
  const divChars = (() => {
    const s = "÷ " + indian(divisor), out: any[] = [];
    const wOf = (ch: string) => (ch === "," ? 20 : ch === " " ? 18 : 44);
    const width = s.split("").reduce((a, ch) => a + wOf(ch), 0);
    let x = SP.px + (SP.pw - width) / 2, zi = psZeros(divisor);
    s.split("").forEach((ch) => { const w = wOf(ch); out.push({ ch, x: x + w / 2, zero: ch === "0" ? --zi : -1 }); x += w; });
    return out;
  })();
  const zTag = (z: number) => (lang === "hi" ? (z === 0 ? "कोई शून्य नहीं" : `${z} शून्य`)
    : lang === "gu" ? (z === 0 ? "એક પણ શૂન્ય નહીં" : `${z} શૂન્ય`)
    : z === 0 ? "no zeros" : z === 1 ? "1 zero" : `${z} zeros`);
  /* the running count, "3 of 6", in the language in use */
  const ofLine = (a: number, b: number) => (lang === "hi" ? `${b} में से ${a}` : lang === "gu" ? `${b} માંથી ${a}` : `${a} of ${b}`);
  /* the trays' readings: Q and R in English; the whole word where there is room for it */
  const qLab = lang === "en" ? "Q" : tx("quotient"), rLab = lang === "en" ? "R" : tx("remainder");

  return (
    <g>
      <style>{PS_CSS}</style>

      {/* the running count: cuts made (or rungs written) against what this phase lays out */}
      {!free && (
        <g data-zone="runs">
          <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          <text x={20} y={-40} fontSize={T.speech} fontWeight={700} fill={C.ink}>{ofLine(made, total)}</text>
          <text x={312} y={-46} textAnchor="end" fontSize={T.micro} fontWeight={500} fill={C.ink}>{tx(kind === "ladder" ? "rungs" : "cuts")}</text>
        </g>
      )}

      {/* ════ the pattern ladder ════ */}
      {!cutView && (
        <g>
          {ladRows.map((row: any, r: number) => {
            const top = ldTop(r), current = kind === "ladder" && stage === "ask" && r === st.step + 1 && !row.shown;
            const lit = current || r === st.walk;
            const isTop = kind === "free" && r === ladRows.length - 1;
            return (
              <g key={r}>
                <rect x={90} y={top} width={766} height={LD.h} rx={20} fill={lit ? "#FFFFFF" : tint(C.panel, 0.5)} stroke={lit ? C.accent : C.rule} strokeWidth={lit ? 4 : 2} />
                <rect x={LD.dvL} y={top + 12} width={LD.dvR - LD.dvL} height={80} rx={14} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} strokeDasharray={row.grown ? undefined : "8 8"} />
                {row.grown && <text key={"d" + row.D} className="ps-new" x={LD.dvR - 14} y={top + 72} textAnchor="end" fontSize={T.xl} fontWeight={700}>{psDigits(indian(row.D), psInk(PS_BLUE), row.gained)}</text>}
                <text x={342} y={top + 70} textAnchor="middle" fontSize={T.xl} fontWeight={600} fill={C.ink}>÷</text>
                <rect x={LD.divL} y={top + 12} width={LD.divR - LD.divL} height={80} rx={14} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
                <text x={(LD.divL + LD.divR) / 2} y={top + 72} textAnchor="middle" fontSize={T.xl} fontWeight={700}>{psDigits(indian(row.d), psInk(PS_AMBER))}</text>
                <text x={540} y={top + 70} textAnchor="middle" fontSize={T.xl} fontWeight={600} fill={C.ink}>=</text>
                <rect x={LD.qL} y={top + 12} width={LD.qR - LD.qL} height={80} rx={14} fill="#FFFFFF" stroke={current ? C.accent : C.rule} strokeWidth={current ? 4 : 2} />
                {row.shown
                  ? <text key={"q" + row.q} className="ps-new" x={LD.qR - 16} y={top + 72} textAnchor="end" fontSize={T.xl} fontWeight={700}>{psDigits(indian(row.q), psInk(PS_GREEN), row.gained)}</text>
                  : <text x={LD.qR - 16} y={top + 72} textAnchor="end" fontSize={T.xl} fontWeight={700} fill={C.ink}>?</text>}
                {/* free play: "+0" marks the number a tap gives one more zero */}
                {isTop && canLad && ladRows.length < 4 && (
                  <g pointerEvents="none">
                    <rect x={LD.dvL + 8} y={top - 6} width={54} height={32} rx={16} fill="#FFFFFF" stroke={C.accent} strokeWidth={2.5} />
                    <text x={LD.dvL + 35} y={top + 19} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={shade(C.accent, 0.2)}>+0</text>
                  </g>
                )}
                {isTop && canLad && ladDivisorOk && ladRows[r - 1] && row.d === ladRows[r - 1].d && (
                  <g pointerEvents="none">
                    <rect x={LD.divL + 8} y={top - 6} width={54} height={32} rx={16} fill="#FFFFFF" stroke={C.accent} strokeWidth={2.5} />
                    <text x={LD.divL + 35} y={top + 19} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={shade(C.accent, 0.2)}>+0</text>
                  </g>
                )}
                {isTop && canLad && ladRows.length < 4 && (
                  <Hit id="ladder-dividend" label={tx("Add a zero to the dividend")} x={LD.dvL} y={top + 12} w={LD.dvR - LD.dvL} h={80} onPress={ladDividend} />
                )}
                {isTop && canLad && ladDivisorOk && (
                  <Hit id="ladder-divisor" label={tx("Add a zero to the divisor as well")} x={LD.divL} y={top + 12} w={LD.divR - LD.divL} h={80} onPress={ladDivisor} />
                )}
              </g>
            );
          })}

          {/* the zero, in its dish beside the rung it grows */}
          {pending && (() => {
            const top = ldTop(st.step + 1), pay = { src: "zero" };
            return (
              <g>
                <rect x={4} y={top + 8} width={78} height={88} rx={18} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
                {!zeroDrag && (
                  <g className={canGrow ? "ps-grab c4-piece" : ""}
                    {...(canGrow ? { ...control("zero", tx("Add a zero to the dividend")), ...drag.bind(pay), ...drag.keys(pay) } : {})}>
                    <rect x={14} y={top + 16} width={56} height={72} rx={12} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />
                    <text x={42} y={top + 72} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={PS_ZERO}>0</text>
                    <rect x={6} y={top + 10} width={72} height={84} fill="transparent" />
                  </g>
                )}
              </g>
            );
          })()}
          {zeroDrag && (
            <g pointerEvents="none" filter="url(#fLift)">
              <rect x={zeroDrag.x - 28} y={zeroDrag.y - 36} width={56} height={72} rx={12} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
              <text x={zeroDrag.x} y={zeroDrag.y + 20} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={PS_ZERO}>0</text>
            </g>
          )}

          {/* the checks: the child's own rung, then the ladder's */}
          <g data-role="reading">
            {st.mine && st.mine.kind === "div" && (
              <g className="ps-new">
                <text x={LD.px} y={170} fontSize={T.label} fontWeight={700} fill={C.ink}><tspan fill={psInk(PS_BLUE)}>{indian(st.mine.D)}</tspan><tspan>{" ÷ "}</tspan><tspan fill={psInk(PS_AMBER)}>{indian(st.mine.d)}</tspan></text>
                <text x={LD.px} y={214} fontSize={T.label} fontWeight={700} fill={C.ink}><tspan>{"= "}</tspan><tspan fill={psInk(PS_GREEN)}>{indian(st.mine.q)}</tspan></text>
              </g>
            )}
            {st.mine && st.mine.kind === "mul" && (
              <g className="ps-new">
                <text x={LD.px} y={170} fontSize={T.label} fontWeight={700} fill={C.ink}><tspan fill={psInk(PS_AMBER)}>{indian(st.mine.d)}</tspan><tspan>{" × "}</tspan><tspan fill={psInk(PS_GREEN)}>{indian(st.mine.q)}</tspan></text>
                <text x={LD.px} y={214} fontSize={T.label} fontWeight={700} fill={C.ink}>{"= " + indian(st.mine.d * st.mine.q)}</text>
              </g>
            )}
            {st.right && kind === "ladder" && (
              <g className="ps-new">
                <text x={LD.px} y={316} fontSize={T.label} fontWeight={700} fill={C.ink}><tspan fill={psInk(PS_AMBER)}>{indian(st.right.d)}</tspan><tspan>{" × "}</tspan><tspan fill={psInk(PS_GREEN)}>{indian(st.right.q)}</tspan></text>
                <text x={LD.px} y={360} fontSize={T.label} fontWeight={700} fill={C.ink}><tspan>{"= "}</tspan><tspan fill={psInk(PS_BLUE)}>{indian(st.right.D)}</tspan></text>
              </g>
            )}
          </g>

          {free && (
            <Key id="ladder-new" label={tx("Start a new ladder")} x={LD.px} y={372} w={200} h={67} C={C} onClick={() => { if (!busy) { put({ flad: [{ D: 84, d: 7 }] }); api.sfx.tick(); } }}>
              <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("New")}</text>
            </Key>
          )}
        </g>
      )}

      {/* ════ the splitter ════ */}
      {cutView && (
        <g>
          {/* the rail, with a notch at every gap the bar can drop into */}
          <rect x={spColX(cols - 1) + 10} y={SP.railY - 6} width={SP.right + 24 - spColX(cols - 1) - 10} height={12} rx={6} fill={tint(C.rule, 0.3)} stroke={shade(C.rule, 0.35)} strokeWidth={1.5} />
          {Array.from({ length: cols }).map((_, k) => <circle key={"n" + k} cx={spGap(k)} cy={SP.railY} r={5} fill={shade(C.rule, 0.45)} />)}

          {/* place headings and the digit cards (deep blue: the dividend) */}
          {dig.map((ch, j) => (
            <g key={"c" + j}>
              <text x={spColC(j)} y={SP.headY} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(PS_HEAD[j])}</text>
              <rect x={spColX(j) + 8} y={SP.cardY} width={SP.cw - 16} height={SP.cardH} rx={14} fill="#FFFFFF"
                stroke={j <= st.zc ? PS_AMBER : C.rule} strokeWidth={j <= st.zc ? 5 : 2} />
              {ch !== "" && <text x={spColC(j)} y={SP.cardY + 60} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={ch === "0" ? PS_ZERO : psInk(PS_BLUE)}>{ch}</text>}
              {free && st.view === "cut" && !busy && (
                <Hit id={"card-" + j} label={"Change the " + PS_PLACES[j] + " digit"} x={spColX(j) + 8} y={SP.cardY} w={SP.cw - 16} h={SP.cardH} onPress={() => bump(j)} />
              )}
            </g>
          ))}

          {/* the trays: the digits left of the bar drop into the quotient tray, the digits right of it into
              the remainder tray, each straight down its own column */}
          {cutNow !== null && tray && (() => {
            const k = cutNow;
            const qx0 = spColX(cols - 1) + 4, qx1 = spGap(k) - 8;
            const rx0 = k > 0 ? spGap(k) + 8 : SP.right + 8, rx1 = k > 0 ? SP.right - 4 : SP.right + 66;
            return (
              <g>
                <rect x={qx0} y={SP.trayY} width={qx1 - qx0} height={SP.trayH} rx={18} fill={tint(PS_GREEN, 0.86)} stroke={shade(PS_GREEN, 0.3)} strokeWidth={2.5} />
                <rect x={rx0} y={SP.trayY} width={rx1 - rx0} height={SP.trayH} rx={18} fill={tint(PS_VERM, 0.86)} stroke={shade(PS_VERM, 0.3)} strokeWidth={2.5} />
                {dig.map((ch, j) => (j >= k && ch !== ""
                  ? <text key={"q" + j + "-" + k} className="ps-drop" x={spColC(j)} y={SP.trayY + 60} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={ch === "0" ? PS_ZERO : psInk(PS_GREEN)}>{ch}</text>
                  : null))}
                {dig.map((ch, j) => (j < k && ch !== "" && ch !== "0"
                  ? <text key={"r" + j + "-" + k} className="ps-drop" x={spColC(j)} y={SP.trayY + 60} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={psInk(PS_VERM)}>{ch}</text>
                  : null))}
                <g data-role="reading">
                  <text x={(qx0 + qx1) / 2} y={SP.readY} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={psInk(PS_GREEN)}>{st.reads ? qLab + " = " + indian(tray.q) : qLab}</text>
                  <text x={(rx0 + rx1) / 2} y={SP.readY} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={psInk(PS_VERM)}>{st.reads ? rLab + " = " + indian(tray.r) : rLab}</text>
                </g>
              </g>
            );
          })()}

          {/* the saucer the front zeros are lifted into */}
          {saucerOn && (
            <g>
              <ellipse cx={SP.px + 82} cy={SP.trayY + 66} rx={82} ry={14} fill={tint(C.rule, 0.25)} stroke={shade(C.rule, 0.35)} strokeWidth={2} />
              <ellipse cx={SP.px + 82} cy={SP.trayY + 64} rx={56} ry={7} fill="none" stroke={shade(C.rule, 0.2)} strokeWidth={1.5} />
            </g>
          )}

          {/* the zeros of the remainder tray: one standing in front of the other digits lifts off to the
              saucer at full size; one with a digit on its left will not go, and stays lit */}
          {cutNow !== null && dig.map((ch, j) => {
            if (!(j < cutNow && ch === "0")) return null;
            const at = st.lifted.indexOf(j);
            const pos = at >= 0 ? spSaucer(at) : { x: spColC(j), y: SP.trayY + 40 };
            const lastLifted = at >= 0 && at === st.lifted.length - 1;
            const live = canLift && saucerOn && (at < 0 || lastLifted);
            const pay = at >= 0 ? { src: "sz", col: j } : { src: "fz", col: j };
            return (
              <g key={"z" + j} className={"ps-slide" + (live ? " ps-grab c4-piece" : "")} style={{ transform: `translate(${pos.x}px, ${pos.y}px)` } as any}
                {...(live ? { ...control(at >= 0 ? "zero-back" : "zero-" + j, tx(at >= 0 ? "Put the zero back in the tray" : "Lift this zero into the saucer")), ...drag.bind(pay), ...drag.keys(pay) } : {})}>
                <rect x={-36} y={-36} width={72} height={72} fill="transparent" />
                {st.held === j && <circle cx={0} cy={0} r={34} fill={tint(PS_VERM, 0.6)} stroke={PS_LINE} strokeWidth={4} />}
                <g key={"zd" + cutNow} className="ps-drop"><text x={0} y={20} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={PS_ZERO}>0</text></g>
              </g>
            );
          })}

          {/* the bundle view: the same number as crates, bundles and loose sticks; with the cut, the whole
              bundles of the divisor light with the quotient tray and the loose ones with the remainder tray */}
          <g>
            {dig.map((ch, j) => {
              const c = ch === "" ? 0 : Number(ch);
              const role = cutNow === null ? PS_BLUE : j >= cutNow ? PS_GREEN : PS_VERM;
              return Array.from({ length: c }).map((_, i) => (
                <g key={j + "-" + i} transform={`translate(${spColC(j) + ((i % 3) - 1) * 40},${SP.bunY + 17 + Math.floor(i / 3) * 34}) scale(1.3)`}><PsBundle kind={j} c={role} x={0} y={0} /></g>
              ));
            })}
          </g>

          {/* the bar: it hangs on the rail, and dropped it runs down through the cards, trays and bundles */}
          {cutNow !== null && <rect x={spGap(cutNow) - 5} y={SP.railY} width={10} height={SP.bunY + SP.bunH - SP.railY} rx={5} fill={PS_LINE} pointerEvents="none" />}
          <g className={(barDrag ? "" : "ps-slide") + (canCut ? " ps-grab c4-piece" : "")} style={{ transform: `translateX(${barX}px)` } as any}
            {...(canCut ? { ...control("bar", tx("The splitter bar: drop it to cut the number")), ...drag.bind({ src: "bar" }), ...drag.keys({ src: "bar" }) } : {})}>
            <rect x={-36} y={SP.railY - 36} width={72} height={72} fill="transparent" />
            {cutNow === null && <rect x={-5} y={SP.railY} width={10} height={36} rx={5} fill={PS_LINE} />}
            <circle cx={0} cy={SP.railY} r={17} fill={PS_LINE} stroke="#FFFFFF" strokeWidth={3} filter={barDrag ? "url(#fLift)" : undefined} />
          </g>
          {canCut && Array.from({ length: cols }).map((_, k) => (k === st.bar && !barDrag ? null : (
            <Hit key={"gap" + k} id={"gap-" + k} label={k === 0 ? "Cut off no digits" : `Cut off ${k} digit${k > 1 ? "s" : ""} from the right`}
              x={spGap(k) - 36} y={SP.railY - 36} w={72} h={72} onPress={() => cutAt(k)} />
          )))}

          {/* the divisor card (the divisor keys in free play) */}
          {kind === "cut" && (
            <g>
              <rect x={SP.px} y={0} width={SP.pw} height={130} rx={20} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
              {divChars.map((c: any, i: number) => (
                <g key={"dv" + i}>
                  {c.zero >= 0 && c.zero <= st.zc && <rect x={c.x - 17} y={90} width={34} height={7} rx={3.5} fill={PS_AMBER} />}
                  <text x={c.x} y={82} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={c.ch === "÷" ? C.ink : psInk(PS_AMBER)}>{c.ch === " " ? "" : c.ch}</text>
                </g>
              ))}
              {st.tag && <text x={SP.px + SP.pw / 2} y={118} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{zTag(psZeros(divisor))}</text>}
            </g>
          )}
          {free && [1, 10, 100, 1000].map((d, i) => {
            const on = st.cut === psZeros(d);
            return (
              <Key key={"k" + d} id={"divide-" + d} label={"Divide by " + indian(d)} x={SP.px + (i % 2) * 181} y={Math.floor(i / 2) * 84} w={165} h={67} C={C} primary={on}
                onClick={() => cutAt(psZeros(d))}>
                <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={on ? "#FFFFFF" : psInk(PS_AMBER)}>{"÷ " + indian(d)}</text>
              </Key>
            );
          })}

          {/* finished cuts, one above the other, so the answers of one number read side by side */}
          {kind === "cut" && st.kept.length > 0 && (
            <g data-role="reading">
              {st.kept.map((c: any, i: number) => (
                <g key={"kept" + i} className="ps-new">
                  <rect x={SP.px} y={SP.rowY + i * SP.rowH} width={SP.pw} height={SP.rowH - 8} rx={12} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
                  <text x={SP.px + 16} y={SP.rowY + i * SP.rowH + 36} fontSize={T.label} fontWeight={700}>
                    <tspan fill={psInk(PS_AMBER)}>{"÷ " + indian(c.d)}</tspan>
                    <tspan fill={psInk(PS_GREEN)}>{"   " + tx("Q") + " " + indian(c.q)}</tspan>
                    <tspan fill={psInk(PS_VERM)}>{"   " + tx("R") + " " + indian(c.r)}</tspan>
                  </text>
                </g>
              ))}
            </g>
          )}

          {/* the check: divisor × quotient + remainder; the child's numbers first, then the right ones */}
          <g data-role="reading">
            {st.mine && kind === "cut" && <g className="ps-new"><PsCheck x={0} y={SP.chk1} c={st.mine} C={C} /></g>}
            {st.right && <g className="ps-new"><PsCheck x={0} y={SP.chk2} c={st.right} C={C} /></g>}
          </g>
        </g>
      )}

      {/* free play: the ladder or the number cards */}
      {free && (
        <Key id="view" label={tx(st.view === "cut" ? "Show the ladder" : "Show the number cards")} x={LD.px} y={456} w={200} h={67} C={C}
          onClick={() => { if (!busy) put({ view: S.current.view === "cut" ? "ladder" : "cut" }); }}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(st.view === "cut" ? "Ladder" : "Cards")}</text>
        </Key>
      )}

      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing: the child's last right answer of the phase, the division above it */
function Thumb({ n, result, C, w, h, tx = (v: any) => v }: any) {
  const L = (result && result.last) || null;
  const P = PHASES[(n || 1) - 1];
  const it = L && P ? P.items[L.item] : null;
  if (!it) return null;
  const box = <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />;
  if (it.kind === "ladder") {
    const D = it.rungs[it.rungs.length - 1];
    return (
      <g>
        {box}
        <text x={w / 2} y={32} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{`${indian(D)} ÷ ${it.by}`}</text>
        <text x={w / 2} y={h - 12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={psInk(PS_GREEN)}>{indian(it.answer)}</text>
      </g>
    );
  }
  const d = it.divs[it.divs.length - 1];
  return (
    <g>
      {box}
      <text x={w / 2} y={32} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{`${indian(it.n)} ÷ ${indian(d)}`}</text>
      <text x={w / 2 - 12} y={h - 12} textAnchor="end" fontSize={T.label} fontWeight={700} fill={psInk(PS_GREEN)}>{tx("Q") + " " + indian(it.answer[0])}</text>
      <text x={w / 2 + 12} y={h - 12} fontSize={T.label} fontWeight={700} fill={psInk(PS_VERM)}>{tx("R") + " " + indian(it.answer[1])}</text>
    </g>
  );
}

function PlaceSplitter(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null }} />
  );
}

export default PlaceSplitter;
