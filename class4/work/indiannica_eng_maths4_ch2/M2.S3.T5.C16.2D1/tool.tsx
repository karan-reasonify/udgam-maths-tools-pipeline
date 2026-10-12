/* ═══ M2.S3.T5.C16.2D1 · addition_rules · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "addition_rules";
const MEDIA_ID = "M2.S3.T5.C16.2D1";
const TOOL_NAME = "Rules Bench";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["Two mats, one set of cards. Put the same numbers on both."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "You moved the addends about and the sum never budged, and then you lifted one digit on purpose.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Any numbers, either mat, brackets anywhere, and the ring of circles open.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r13+: `lineFor(line, lang, TR)`); the
   English stays what the checks read. NCERT class 4 terms: इकाई दहाई सैकड़ा हज़ार / એકમ દશક શતક હજાર,
   short headings इ द सै ह द.ह. / એ દ શ હ દ.હ., योज्य / ઉમેરણ (addend), योगफल / સરવાળો (sum), हासिल / વદી
   (carry), परवर्ती / અનુગામી (successor), कोष्ठक / કૌંસ (bracket). Digits stay digits: the runtime speaks
   them in the language in use. A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Rules Bench": "नियमों की मेज़",
    "Two mats, one set of cards. Put the same numbers on both.": "दो चार्ट, कार्ड का एक सेट। दोनों पर वही संख्याएँ रखो।",
    "You moved the addends about and the sum never budged, and then you lifted one digit on purpose.": "तुमने योज्यों को इधर-उधर किया और योगफल ज़रा नहीं हिला, फिर तुमने जान-बूझकर एक अंक बढ़ाया।",
    "Free play. Any numbers, either mat, brackets anywhere, and the ring of circles open.": "मुक्त खेल। कोई भी संख्याएँ, कोई भी चार्ट, कहीं भी कोष्ठक, और गोलों का घेरा खुला है।",
    "The order of the addends does not matter": "योज्यों का क्रम मायने नहीं रखता",
    "Swap them over and add again. Did anything change?": "इन्हें आपस में बदलो और फिर जोड़ो। क्या कुछ बदला?",
    "Which column is each digit standing in?": "हर अंक किस खाने में खड़ा है?",
    "Try it small first. Is 3 + 5 the same as 5 + 3?": "पहले छोटी संख्याओं से देखो। क्या 3 + 5 और 5 + 3 बराबर हैं?",
    "The sum is the same whichever order the addends are written in, so the easier one may go on top.": "योज्य किसी भी क्रम में लिखो, योगफल वही रहता है, इसलिए आसान वाला ऊपर रख सकते हो।",
    "You learned: swapping the addends never changes the sum.": "तुमने सीखा: योज्यों को आपस में बदलने से योगफल नहीं बदलता।",
    "What is the sum?": "योगफल क्या है?",
    "Add 26,418, and 51,270. Then swap the addends and add again. Type the sum you get.": "26,418 और 51,270 जोड़ो। फिर योज्यों को आपस में बदलकर दोबारा जोड़ो। जो योगफल मिले वह लिखो।",
    "Are the same two cards on both mats?": "क्या दोनों चार्ट पर वही दो कार्ड हैं?",
    "Take 34,205, and add 18,640. Then take 18,640, and add 34,205. Is the answer the same? Type the sum.": "34,205 में 18,640 जोड़ो। फिर 18,640 में 34,205 जोड़ो। क्या उत्तर वही है? योगफल लिखो।",
    "Does swapping the cards change what they add up to?": "क्या कार्ड आपस में बदलने से उनका जोड़ बदलता है?",
    "Which card fits the gap?": "खाली जगह में कौन सा कार्ड आएगा?",
    "Fill the blank. 41,738 + 6,205, equals 6,205 + one more card. Which card is it? Drag it in, then press Enter.": "खाली जगह भरो। 41,738 + 6,205 बराबर है 6,205 + एक और कार्ड। वह कौन सा कार्ड है? उसे खींचकर लाओ, फिर एंटर दबाओ।",
    "Which card is on the left mat but not yet on the right?": "कौन सा कार्ड बाएँ चार्ट पर है, पर दाएँ पर अभी नहीं?",
    "The grouping of the addends does not matter either": "योज्यों का समूह बनाना भी मायने नहीं रखता",
    "Pick the easiest pair to add first. You are allowed to.": "सबसे आसान जोड़ी पहले जोड़ो। ऐसा कर सकते हो।",
    "What is left to add once that bracket is closed?": "वह कोष्ठक बंद होने के बाद जोड़ने को क्या बचता है?",
    "Add the round pair first, then bring in the card left over.": "पहले गोल संख्या वाली जोड़ी जोड़ो, फिर बचा हुआ कार्ड लाओ।",
    "Three or more addends may be grouped any way at all, so the pair that makes a round number is the pair to add first.": "तीन या ज़्यादा योज्यों का समूह कैसे भी बना सकते हैं, इसलिए गोल संख्या बनाने वाली जोड़ी पहले जोड़ो।",
    "You learned: group the addends any way; add the round pair first.": "तुमने सीखा: योज्यों का समूह कैसे भी बनाओ; गोल जोड़ी पहले जोड़ो।",
    "What is the total?": "कुल कितना है?",
    "Add 2,600 and 7,400, and then 18,530. Choose the easiest grouping. Tap a bracket, or tap two cards.": "2,600 और 7,400 जोड़ो, और फिर 18,530। सबसे आसान समूह चुनो। कोष्ठक पर टैप करो, या दो कार्ड पर।",
    "Which two of your three cards make a round number together?": "तुम्हारे तीन कार्ड में से कौन से दो मिलकर गोल संख्या बनाते हैं?",
    "Fill the blank. The left mat holds 5,120, 3,408 and 2,675. The right mat holds 5,120, a gap and 2,675. Which card fills the gap? Drag it in, then press Enter.": "खाली जगह भरो। बाएँ चार्ट पर 5,120, 3,408 और 2,675 हैं। दाएँ पर 5,120, एक खाली जगह और 2,675 हैं। कौन सा कार्ड खाली जगह भरेगा? उसे खींचकर लाओ, फिर एंटर दबाओ।",
    "Both mats hold the same three cards. Which one is missing?": "दोनों चार्ट पर वही तीन कार्ड हैं। कौन सा गायब है?",
    "Add 4,300 and 15,842, and then 5,700. Choose the easiest pair first.": "4,300 और 15,842 जोड़ो, और फिर 5,700। पहले सबसे आसान जोड़ी चुनो।",
    "Which pair would be easiest to add in your head?": "कौन सी जोड़ी मन में जोड़ना सबसे आसान होगा?",
    "Adding zero changes nothing and adding one steps forward": "शून्य जोड़ने से कुछ नहीं बदलता, एक जोड़ने से एक कदम आगे",
    "Adding nothing leaves it alone. Adding one steps it forward. Which is which?": "कुछ न जोड़ो तो संख्या वैसी ही रहती है। एक जोड़ो तो एक कदम आगे बढ़ती है। कौन सा क्या है?",
    "How many digits may one column hold?": "एक खाने में कितने अंक आ सकते हैं?",
    "Start at the ones column. Add the amount there, and carry if it makes ten.": "इकाई के खाने से शुरू करो। वहाँ संख्या जोड़ो, और दस बने तो हासिल ले जाओ।",
    "Zero leaves a number exactly as it was, and one gives the number that comes straight after it, which is its successor.": "शून्य संख्या को वैसा ही छोड़ता है, और एक जोड़ने से ठीक अगली संख्या मिलती है, जो उसकी परवर्ती है।",
    "You learned: adding 0 changes nothing; adding 1 gives the successor.": "तुमने सीखा: 0 जोड़ने से कुछ नहीं बदलता; 1 जोड़ने से परवर्ती मिलती है।",
    "What will it read?": "यह क्या दिखाएगा?",
    "What is 84,376 + 0? Type what the window will read, then press + 0.": "84,376 + 0 कितना है? खिड़की में जो दिखेगा वह लिखो, फिर + 0 दबाओ।",
    "Which column did the amount go into?": "जोड़ी गई संख्या किस खाने में गई?",
    "What is 59,999 + 1? Type the reading you expect, then press + 1.": "59,999 + 1 कितना है? जो तुम सोचते हो वह लिखो, फिर + 1 दबाओ।",
    "What happens to a column of nines when one more comes?": "एक और आने पर नौ वाले खानों का क्या होता है?",
    "What comes next?": "आगे क्या आता है?",
    "What is the successor of 76,409? Type it, then let + 1 check it.": "76,409 की परवर्ती संख्या क्या है? उसे लिखो, फिर + 1 से जाँचो।",
    "Which number comes just after it when you count?": "गिनती में इसके ठीक बाद कौन सी संख्या आती है?",
    "Adding ten, a hundred or a thousand lifts one digit": "दस, सौ या हज़ार जोड़ने से एक अंक बढ़ता है",
    "Which digit is going to move this time? Say it before you press.": "इस बार कौन सा अंक बदलेगा? दबाने से पहले बताओ।",
    "Which column on the chart carries that name?": "चार्ट पर किस खाने का वह नाम है?",
    "Only the digit in that column moves. Every other digit stays pinned.": "सिर्फ़ उस खाने का अंक बदलता है। बाकी हर अंक अपनी जगह टिका रहता है।",
    "Adding ten raises the tens digit, a hundred the hundreds digit and a thousand the thousands digit, whatever the rest of the number looks like.": "दस जोड़ने से दहाई का अंक बढ़ता है, सौ से सैकड़े का और हज़ार से हज़ार का, बाकी संख्या कैसी भी हो।",
    "You learned: 10, 100 or 1,000 raises the digit in its own place.": "तुमने सीखा: 10, 100 या 1,000 अपने ही स्थान का अंक बढ़ाते हैं।",
    "How many litres now?": "अब कितने लीटर?",
    "A tank held 26,318 L of water, and 1,000 L more was poured in. A child wrote 26,418 L. What should it be? Type it, then press + 1,000.": "एक टंकी में 26,318 लीटर पानी था, और 1,000 लीटर और डाला गया। एक बच्चे ने 26,418 लीटर लिखा। सही क्या है? लिखो, फिर + 1,000 दबाओ।",
    "Which place does the amount you are adding belong to?": "जो संख्या तुम जोड़ रहे हो, वह किस स्थान की है?",
    "Add 10 to 48,362, then add 100 to your answer. Type what you get, then press + 10.": "48,362 में 10 जोड़ो, फिर उत्तर में 100 जोड़ो। जो मिले वह लिखो, फिर + 10 दबाओ।",
    "Which two places do ten and a hundred go into?": "दस और सौ किन दो स्थानों में जाते हैं?",
    "How many packets now?": "अब कितने पैकेट?",
    "A shop had 34,652 packets, and a thousand more arrived. A child wrote 34,752. Fix the child's answer, then check it with + 1,000.": "एक दुकान में 34,652 पैकेट थे, और हज़ार और आए। एक बच्चे ने 34,752 लिखा। बच्चे का उत्तर ठीक करो, फिर + 1,000 से जाँचो।",
    "Did the child change the thousands digit or the hundreds digit?": "बच्चे ने हज़ार का अंक बदला या सैकड़े का?",
    /* the working area's own words */
    "O": "इ", "T": "द", "H": "सै", "Th": "ह", "TTh": "द.ह.",
    "ones": "इकाई", "tens": "दहाई", "hundreds": "सैकड़ा", "thousands": "हज़ार", "ten thousands": "दस हज़ार", "lakhs": "लाख",
    "Same": "बराबर", "cards": "कार्ड", "Swap": "बदलो", "Swap the left mat": "बायाँ चार्ट बदलो", "Swap the right mat": "दायाँ चार्ट बदलो",
    "nothing": "कुछ नहीं", "one": "एक", "ten": "दस", "a hundred": "सौ", "a thousand": "हज़ार",
    "Add nothing": "शून्य जोड़ो", "Add one": "एक जोड़ो", "Add ten": "दस जोड़ो", "Add a hundred": "सौ जोड़ो", "Add a thousand": "हज़ार जोड़ो",
    "Mats": "चार्ट", "Ring": "गोले", "Show the mats": "चार्ट दिखाओ", "Show the ring": "गोले दिखाओ",
  },
  gu: {
    "Rules Bench": "નિયમોનું ટેબલ",
    "Two mats, one set of cards. Put the same numbers on both.": "બે ચાર્ટ, કાર્ડનો એક સેટ. બંને પર એ જ સંખ્યાઓ મૂકો.",
    "You moved the addends about and the sum never budged, and then you lifted one digit on purpose.": "તમે ઉમેરણોને આમતેમ ફેરવ્યા અને સરવાળો જરાય ન બદલાયો, પછી તમે જાણીજોઈને એક અંક વધાર્યો.",
    "Free play. Any numbers, either mat, brackets anywhere, and the ring of circles open.": "મુક્ત રમત. કોઈ પણ સંખ્યા, કોઈ પણ ચાર્ટ, ગમે ત્યાં કૌંસ, અને વર્તુળોનું ચક્ર ખુલ્લું છે.",
    "The order of the addends does not matter": "ઉમેરણોનો ક્રમ મહત્ત્વનો નથી",
    "Swap them over and add again. Did anything change?": "તેમની અદલબદલ કરો અને ફરી ઉમેરો. શું કંઈ બદલાયું?",
    "Which column is each digit standing in?": "દરેક અંક કયા ખાનામાં ઊભો છે?",
    "Try it small first. Is 3 + 5 the same as 5 + 3?": "પહેલાં નાની સંખ્યાથી જુઓ. શું 3 + 5 અને 5 + 3 સરખા છે?",
    "The sum is the same whichever order the addends are written in, so the easier one may go on top.": "ઉમેરણ ગમે તે ક્રમમાં લખો, સરવાળો એ જ રહે છે, તેથી સહેલું ઉપર મૂકી શકાય.",
    "You learned: swapping the addends never changes the sum.": "તમે શીખ્યા: ઉમેરણોની અદલબદલથી સરવાળો બદલાતો નથી.",
    "What is the sum?": "સરવાળો કેટલો છે?",
    "Add 26,418, and 51,270. Then swap the addends and add again. Type the sum you get.": "26,418 અને 51,270 ઉમેરો. પછી ઉમેરણોની અદલબદલ કરી ફરી ઉમેરો. જે સરવાળો મળે તે લખો.",
    "Are the same two cards on both mats?": "શું બંને ચાર્ટ પર એ જ બે કાર્ડ છે?",
    "Take 34,205, and add 18,640. Then take 18,640, and add 34,205. Is the answer the same? Type the sum.": "34,205 માં 18,640 ઉમેરો. પછી 18,640 માં 34,205 ઉમેરો. શું જવાબ એ જ છે? સરવાળો લખો.",
    "Does swapping the cards change what they add up to?": "શું કાર્ડની અદલબદલથી તેમનો સરવાળો બદલાય છે?",
    "Which card fits the gap?": "ખાલી જગ્યામાં કયું કાર્ડ આવશે?",
    "Fill the blank. 41,738 + 6,205, equals 6,205 + one more card. Which card is it? Drag it in, then press Enter.": "ખાલી જગ્યા ભરો. 41,738 + 6,205 બરાબર 6,205 + એક બીજું કાર્ડ. તે કયું કાર્ડ છે? તેને ખેંચી લાવો, પછી એન્ટર દબાવો.",
    "Which card is on the left mat but not yet on the right?": "કયું કાર્ડ ડાબા ચાર્ટ પર છે, પણ જમણા પર હજી નથી?",
    "The grouping of the addends does not matter either": "ઉમેરણોનું જૂથ બનાવવું પણ મહત્ત્વનું નથી",
    "Pick the easiest pair to add first. You are allowed to.": "સૌથી સહેલી જોડી પહેલાં ઉમેરો. એવું કરી શકાય છે.",
    "What is left to add once that bracket is closed?": "તે કૌંસ બંધ થયા પછી ઉમેરવા શું બાકી રહે છે?",
    "Add the round pair first, then bring in the card left over.": "પહેલાં ગોળ સંખ્યાવાળી જોડી ઉમેરો, પછી વધેલું કાર્ડ લાવો.",
    "Three or more addends may be grouped any way at all, so the pair that makes a round number is the pair to add first.": "ત્રણ કે વધુ ઉમેરણોનું જૂથ ગમે તે રીતે બનાવી શકાય, તેથી ગોળ સંખ્યા બનાવતી જોડી પહેલાં ઉમેરો.",
    "You learned: group the addends any way; add the round pair first.": "તમે શીખ્યા: ઉમેરણોનું જૂથ ગમે તેમ બનાવો; ગોળ જોડી પહેલાં ઉમેરો.",
    "What is the total?": "કુલ કેટલા છે?",
    "Add 2,600 and 7,400, and then 18,530. Choose the easiest grouping. Tap a bracket, or tap two cards.": "2,600 અને 7,400 ઉમેરો, અને પછી 18,530. સૌથી સહેલું જૂથ પસંદ કરો. કૌંસ પર ટેપ કરો, અથવા બે કાર્ડ પર.",
    "Which two of your three cards make a round number together?": "તમારાં ત્રણ કાર્ડમાંથી કયાં બે મળીને ગોળ સંખ્યા બનાવે છે?",
    "Fill the blank. The left mat holds 5,120, 3,408 and 2,675. The right mat holds 5,120, a gap and 2,675. Which card fills the gap? Drag it in, then press Enter.": "ખાલી જગ્યા ભરો. ડાબા ચાર્ટ પર 5,120, 3,408 અને 2,675 છે. જમણા પર 5,120, એક ખાલી જગ્યા અને 2,675 છે. કયું કાર્ડ ખાલી જગ્યા ભરશે? તેને ખેંચી લાવો, પછી એન્ટર દબાવો.",
    "Both mats hold the same three cards. Which one is missing?": "બંને ચાર્ટ પર એ જ ત્રણ કાર્ડ છે. કયું ખૂટે છે?",
    "Add 4,300 and 15,842, and then 5,700. Choose the easiest pair first.": "4,300 અને 15,842 ઉમેરો, અને પછી 5,700. પહેલાં સૌથી સહેલી જોડી પસંદ કરો.",
    "Which pair would be easiest to add in your head?": "કઈ જોડી મનમાં ઉમેરવી સૌથી સહેલી થશે?",
    "Adding zero changes nothing and adding one steps forward": "શૂન્ય ઉમેરવાથી કંઈ બદલાતું નથી, એક ઉમેરવાથી એક પગલું આગળ",
    "Adding nothing leaves it alone. Adding one steps it forward. Which is which?": "કંઈ ન ઉમેરો તો સંખ્યા એવી જ રહે છે. એક ઉમેરો તો એક પગલું આગળ વધે છે. કયું શું છે?",
    "How many digits may one column hold?": "એક ખાનામાં કેટલા અંક આવી શકે?",
    "Start at the ones column. Add the amount there, and carry if it makes ten.": "એકમના ખાનાથી શરૂ કરો. ત્યાં રકમ ઉમેરો, અને દસ થાય તો વદી લઈ જાઓ.",
    "Zero leaves a number exactly as it was, and one gives the number that comes straight after it, which is its successor.": "શૂન્ય સંખ્યાને એવી જ રાખે છે, અને એક ઉમેરવાથી તરત પછીની સંખ્યા મળે છે, જે તેની અનુગામી છે.",
    "You learned: adding 0 changes nothing; adding 1 gives the successor.": "તમે શીખ્યા: 0 ઉમેરવાથી કંઈ બદલાતું નથી; 1 ઉમેરવાથી અનુગામી મળે છે.",
    "What will it read?": "તે શું બતાવશે?",
    "What is 84,376 + 0? Type what the window will read, then press + 0.": "84,376 + 0 કેટલા છે? બારીમાં જે દેખાશે તે લખો, પછી + 0 દબાવો.",
    "Which column did the amount go into?": "ઉમેરેલી રકમ કયા ખાનામાં ગઈ?",
    "What is 59,999 + 1? Type the reading you expect, then press + 1.": "59,999 + 1 કેટલા છે? તમે ધારો તે લખો, પછી + 1 દબાવો.",
    "What happens to a column of nines when one more comes?": "એક વધુ આવે ત્યારે નવવાળાં ખાનાંનું શું થાય છે?",
    "What comes next?": "પછી શું આવે છે?",
    "What is the successor of 76,409? Type it, then let + 1 check it.": "76,409 ની અનુગામી સંખ્યા કઈ છે? તે લખો, પછી + 1 થી ચકાસો.",
    "Which number comes just after it when you count?": "ગણતરીમાં તેના પછી તરત કઈ સંખ્યા આવે છે?",
    "Adding ten, a hundred or a thousand lifts one digit": "દસ, સો કે હજાર ઉમેરવાથી એક અંક વધે છે",
    "Which digit is going to move this time? Say it before you press.": "આ વખતે કયો અંક બદલાશે? દબાવતાં પહેલાં કહો.",
    "Which column on the chart carries that name?": "ચાર્ટ પર કયા ખાનાનું એ નામ છે?",
    "Only the digit in that column moves. Every other digit stays pinned.": "ફક્ત એ ખાનાનો અંક બદલાય છે. બાકીનો દરેક અંક પોતાની જગ્યાએ રહે છે.",
    "Adding ten raises the tens digit, a hundred the hundreds digit and a thousand the thousands digit, whatever the rest of the number looks like.": "દસ ઉમેરવાથી દશકનો અંક વધે છે, સોથી શતકનો અને હજારથી હજારનો, બાકીની સંખ્યા ગમે તેવી હોય.",
    "You learned: 10, 100 or 1,000 raises the digit in its own place.": "તમે શીખ્યા: 10, 100 કે 1,000 પોતાના જ સ્થાનનો અંક વધારે છે.",
    "How many litres now?": "હવે કેટલા લિટર?",
    "A tank held 26,318 L of water, and 1,000 L more was poured in. A child wrote 26,418 L. What should it be? Type it, then press + 1,000.": "એક ટાંકીમાં 26,318 લિટર પાણી હતું, અને 1,000 લિટર વધુ રેડ્યું. એક બાળકે 26,418 લિટર લખ્યું. સાચું શું છે? લખો, પછી + 1,000 દબાવો.",
    "Which place does the amount you are adding belong to?": "તમે જે રકમ ઉમેરો છો, તે કયા સ્થાનની છે?",
    "Add 10 to 48,362, then add 100 to your answer. Type what you get, then press + 10.": "48,362 માં 10 ઉમેરો, પછી જવાબમાં 100 ઉમેરો. જે મળે તે લખો, પછી + 10 દબાવો.",
    "Which two places do ten and a hundred go into?": "દસ અને સો કયાં બે સ્થાનમાં જાય છે?",
    "How many packets now?": "હવે કેટલાં પેકેટ?",
    "A shop had 34,652 packets, and a thousand more arrived. A child wrote 34,752. Fix the child's answer, then check it with + 1,000.": "એક દુકાનમાં 34,652 પેકેટ હતાં, અને હજાર વધુ આવ્યાં. એક બાળકે 34,752 લખ્યું. બાળકનો જવાબ સુધારો, પછી + 1,000 થી ચકાસો.",
    "Did the child change the thousands digit or the hundreds digit?": "બાળકે હજારનો અંક બદલ્યો કે શતકનો?",
    /* the working area's own words */
    "O": "એ", "T": "દ", "H": "શ", "Th": "હ", "TTh": "દ.હ.",
    "ones": "એકમ", "tens": "દશક", "hundreds": "શતક", "thousands": "હજાર", "ten thousands": "દસ હજાર", "lakhs": "લાખ",
    "Same": "સરખું", "cards": "કાર્ડ", "Swap": "બદલો", "Swap the left mat": "ડાબો ચાર્ટ અદલબદલ કરો", "Swap the right mat": "જમણો ચાર્ટ અદલબદલ કરો",
    "nothing": "કંઈ નહીં", "one": "એક", "ten": "દસ", "a hundred": "સો", "a thousand": "હજાર",
    "Add nothing": "શૂન્ય ઉમેરો", "Add one": "એક ઉમેરો", "Add ten": "દસ ઉમેરો", "Add a hundred": "સો ઉમેરો", "Add a thousand": "હજાર ઉમેરો",
    "Mats": "ચાર્ટ", "Ring": "વર્તુળ", "Show the mats": "ચાર્ટ બતાવો", "Show the ring": "વર્તુળ બતાવો",
  },
};

/* ── the chapter's content colours (writeup.stage) ────────────────────────────────────────────
   a number being added is deep blue, the sum under the rule green, a carried digit vermilion and
   small above its column, the digit under discussion amber, a zero holding a place grey. Numerals
   take a deeper ink of their colour so they read at 4.5:1; amber is never used for text. */
const RB_BLUE = CONTENT.hundred, RB_GREEN = CONTENT.one, RB_VERM = CONTENT.pointer, RB_AMBER = CONTENT.ten;
const RB_ZERO = "#767676";
const rbInkBlue = shade(RB_BLUE, 0.25), rbInkGreen = shade(RB_GREEN, 0.25), rbInkVerm = shade(RB_VERM, 0.25);
const RB_HEADS = ["O", "T", "H", "Th", "TTh"];
const RB_PLACES = ["ones", "tens", "hundreds", "thousands", "ten thousands", "lakhs"];
const RB_AMOUNT: Record<number, string> = { 0: "nothing", 1: "one", 10: "ten", 100: "a hundred", 1000: "a thousand" };

/* digits of a whole number, ones first */
const rbDig = (v: number) => String(Math.max(0, Math.trunc(v))).split("").reverse().map(Number);
const rbPut = (a: any[], j: number, v: any) => { const b = a.slice(); b[j] = v; return b; };
const rbCard = (it: any, id: string) => (it.cards || [])["abc".indexOf(id)];

/* One entry per phase = one mount.
   kinds: sum   two mats, the same two cards in opposite orders; the child types the sum
          blank the right mat has a gap; the child drags the card that fits (Enter commits)
          group two mats of three cards with bracket jaws; the child brackets a pair, types the total
          step  the step bay: type what the window will read, then press the amount key */
const PHASES = [
  {
    n: 1,
    concept: "The order of the addends does not matter",
    conceptId: "M2.S3.T5.C16", objectiveIds: ["O7"],
    says: ["Swap them over and add again. Did anything change?"],
    /* tries, as the plan writes it: the item's miss, the column each digit stands in, then the pair cut down small */
    ladder: ["Which column is each digit standing in?", "Try it small first. Is 3 + 5 the same as 5 + 3?"],
    closing: "The sum is the same whichever order the addends are written in, so the easier one may go on top.",
    learned: "You learned: swapping the addends never changes the sum.",
    traceback: "The right mat clears and refills in the order the cards were dealt, each ringed as it lands; both sums are worked from the ones with their carries and stand together: Same.",
    items: [
      /* learn ML1: answer in the plan = Both give 77,688, so the order of the addends does not change the sum */
      { qid: "M2.S3.T5.C16:ML1", kind: "sum", cards: [26418, 51270], left: ["a", "b"], right: ["b", "a"], answer: 77688, winMs: 3800, ask: "What is the sum?",
        say: "Add 26,418, and 51,270. Then swap the addends and add again. Type the sum you get.", miss: "Are the same two cards on both mats?" },
      /* practice 1: answer in the plan = Yes, both come to 52,845 */
      { qid: "M2.S3.T5.C16:1", kind: "sum", cards: [34205, 18640], left: ["a", "b"], right: ["b", "a"], answer: 52845, winMs: 3800, ask: "What is the sum?",
        say: "Take 34,205, and add 18,640. Then take 18,640, and add 34,205. Is the answer the same? Type the sum.", miss: "Does swapping the cards change what they add up to?" },
      /* practice 2: answer in the plan = 41,738 (the gap takes a card from the tray) */
      { qid: "M2.S3.T5.C16:2", kind: "blank", cards: [41738, 6205], left: ["a", "b"], right: ["b", "blank"], near: 6205, answer: 41738, pad: "enter", winMs: 3800, ask: "Which card fits the gap?",
        say: "Fill the blank. 41,738 + 6,205, equals 6,205 + one more card. Which card is it? Drag it in, then press Enter.", miss: "Which card is on the left mat but not yet on the right?" },
    ],
  },
  {
    n: 2,
    concept: "The grouping of the addends does not matter either",
    conceptId: "M2.S3.T5.C17", objectiveIds: ["O7"],
    says: ["Pick the easiest pair to add first. You are allowed to."],
    /* tries, as the plan writes it: which pair makes a round number, what is left once it is closed, then the round pair first */
    ladder: ["What is left to add once that bracket is closed?", "Add the round pair first, then bring in the card left over."],
    closing: "Three or more addends may be grouped any way at all, so the pair that makes a round number is the pair to add first.",
    learned: "You learned: group the addends any way; add the round pair first.",
    traceback: "Each pair is totalled in turn and the round one stays open; that bracket closes, its two cards turn face down under their total, and both mats are added to the same sum.",
    items: [
      /* learn ML2: answer in the plan = 28,530, by adding 2,600 and 7,400 first to make 10,000 */
      { qid: "M2.S3.T5.C17:ML2", kind: "group", cards: [2600, 7400, 18530], left: ["a", "b", "c"], right: ["a", "b", "c"], jawL: 0, jawR: 1, answer: 28530, winMs: 4800, ask: "What is the total?",
        say: "Add 2,600 and 7,400, and then 18,530. Choose the easiest grouping. Tap a bracket, or tap two cards.", miss: "Which two of your three cards make a round number together?" },
      /* practice 3: answer in the plan = 3,408 (the gap takes a card from the tray) */
      { qid: "M2.S3.T5.C17:3", kind: "blank", cards: [5120, 3408, 2675], left: ["a", "b", "c"], right: ["a", "blank", "c"], jawL: 0, jawR: 1, near: 8528, answer: 3408, pad: "enter", winMs: 4800, ask: "Which card fits the gap?",
        say: "Fill the blank. The left mat holds 5,120, 3,408 and 2,675. The right mat holds 5,120, a gap and 2,675. Which card fills the gap? Drag it in, then press Enter.", miss: "Both mats hold the same three cards. Which one is missing?" },
      /* practice 4: answer in the plan = 25,842, by adding 4,300 and 5,700 first to make 10,000 */
      { qid: "M2.S3.T5.C17:4", kind: "group", cards: [4300, 15842, 5700], left: ["a", "b", "c"], right: ["a", "b", "c"], jawL: 0, jawR: 1, answer: 25842, winMs: 4800, ask: "What is the total?",
        say: "Add 4,300 and 15,842, and then 5,700. Choose the easiest pair first.", miss: "Which pair would be easiest to add in your head?" },
    ],
  },
  {
    n: 3,
    concept: "Adding zero changes nothing and adding one steps forward",
    conceptId: "M2.S3.T5.C18", objectiveIds: ["O8"],
    says: ["Adding nothing leaves it alone. Adding one steps it forward. Which is which?"],
    /* tries, as the plan writes it: which column the amount went into, how many digits a column holds, then the ones first */
    ladder: ["How many digits may one column hold?", "Start at the ones column. Add the amount there, and carry if it makes ten."],
    closing: "Zero leaves a number exactly as it was, and one gives the number that comes straight after it, which is its successor.",
    learned: "You learned: adding 0 changes nothing; adding 1 gives the successor.",
    traceback: "The amount drops into its own column (a zero in grey); the columns are read from the ones, ten ones bundle into a carried one, and the result is printed under the start.",
    items: [
      /* learn ML3: answer in the plan = 84,376 and 84,377 (the pad takes one number: this item asks the + 0 half) */
      { qid: "M2.S3.T5.C18:ML3", kind: "step", start: 84376, adds: [0], answer: 84376, winMs: 1800, ask: "What will it read?",
        say: "What is 84,376 + 0? Type what the window will read, then press + 0.", miss: "Which column did the amount go into?" },
      /* practice 5: answer in the plan = 3,67,204 and 60,000 (this item asks the 59,999 + 1 half: the roll of nines) */
      { qid: "M2.S3.T5.C18:5", kind: "step", start: 59999, adds: [1], answer: 60000, winMs: 1800, ask: "What will it read?",
        say: "What is 59,999 + 1? Type the reading you expect, then press + 1.", miss: "What happens to a column of nines when one more comes?" },
      /* practice 6: answer in the plan = 76,410 */
      { qid: "M2.S3.T5.C18:6", kind: "step", start: 76409, adds: [1], answer: 76410, winMs: 1800, ask: "What comes next?",
        say: "What is the successor of 76,409? Type it, then let + 1 check it.", miss: "Which number comes just after it when you count?" },
    ],
  },
  {
    n: 4,
    concept: "Adding ten, a hundred or a thousand lifts one digit",
    conceptId: "M2.S3.T5.C19", objectiveIds: ["O8"],
    says: ["Which digit is going to move this time? Say it before you press."],
    /* tries, as the plan writes it: which place the amount belongs to, which column carries that name, then only that digit free */
    ladder: ["Which column on the chart carries that name?", "Only the digit in that column moves. Every other digit stays pinned."],
    closing: "Adding ten raises the tens digit, a hundred the hundreds digit and a thousand the thousands digit, whatever the rest of the number looks like.",
    learned: "You learned: 10, 100 or 1,000 raises the digit in its own place.",
    traceback: "The place chart lights the amount's column amber; every other digit stays pinned, that digit alone lifts and rolls on by one, and the new number is printed under the old.",
    items: [
      /* learn ML4: answer in the plan = No. The tank holds 27,318 L, because adding a thousand raises the thousands digit */
      { qid: "M2.S3.T5.C19:ML4", kind: "step", start: 26318, adds: [1000], answer: 27318, winMs: 1800, ask: "How many litres now?",
        say: "A tank held 26,318 L of water, and 1,000 L more was poured in. A child wrote 26,418 L. What should it be? Type it, then press + 1,000.", miss: "Which place does the amount you are adding belong to?" },
      /* practice 7: answer in the plan = 48,372 after the ten and 48,472 after the hundred (one press adds both, in turn) */
      { qid: "M2.S3.T5.C19:7", kind: "step", start: 48362, adds: [10, 100], answer: 48472, winMs: 1800, ask: "What will it read?",
        say: "Add 10 to 48,362, then add 100 to your answer. Type what you get, then press + 10.", miss: "Which two places do ten and a hundred go into?" },
      /* practice 8: answer in the plan = It should be 35,652. The child raised the hundreds digit, but adding a thousand raises the thousands digit */
      { qid: "M2.S3.T5.C19:8", kind: "step", start: 34652, adds: [1000], answer: 35652, winMs: 1800, ask: "How many packets now?",
        say: "A shop had 34,652 packets, and a thousand more arrived. A child wrote 34,752. Fix the child's answer, then check it with + 1,000.", miss: "Did the child change the thousands digit or the hundreds digit?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  mats: { columns: RB_HEADS.slice().reverse(), rowsByPhase: { 1: 2, 2: 3 }, compareWord: "Same" },
  stepBay: { places: RB_PLACES.slice(0, 5), amountsByPhase: { 3: [0, 1], 4: [10, 100, 1000] }, predictFirst: true },
  ring: { circles: 6, cards: [1, 2, 3, 4, 5, 6], sides: [[0, 3, 1], [1, 4, 2], [2, 5, 0]] },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: numbers compare as numbers */
const judge = (item: any, v: any) => {
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by plain arithmetic on the item's own numbers, and every number
   found in the spoken question (shares no code with judge or the column working on the mats) */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const said = String(it.say);
  const add = (xs: number[]) => xs.reduce((a, x) => a + x, 0);
  if (it.kind === "sum") return it.cards.every((c: number) => said.includes(indian(c))) && it.answer === add(it.cards);
  if (it.kind === "group") {
    const [x, y, z] = it.cards, round = [x + y, y + z, x + z].filter((t) => t % 1000 === 0);
    return it.cards.every((c: number) => said.includes(indian(c))) && it.answer === add(it.cards) && round.length === 1;
  }
  if (it.kind === "blank") {
    const val = (id: string) => (id === "blank" ? it.answer : it.cards["abc".indexOf(id)]);
    return it.cards.includes(it.answer) && add(it.left.map(val)) === add(it.right.map(val)) && it.right.filter((x: string) => x !== "blank").every((x: string) => it.left.includes(x));
  }
  if (it.kind === "step") return said.includes(indian(it.start)) && it.answer === add([it.start, ...it.adds]);
  return false;
}));
/* the misconception each item is built to catch; judge must reject it */
const nearMiss = (item: any) => {
  if (item.kind === "blank") return item.near;                                  /* the card already there, or the bracket's total */
  if (item.kind === "group") {                                                   /* the pair total added in as well as its two cards */
    const [x, y, z] = item.cards, round = [x + y, y + z, x + z].find((t) => t % 1000 === 0) || 0;
    return item.answer + round;
  }
  if (item.kind === "step") {
    const s = String(item.start);
    if (item.adds.length === 1 && item.adds[0] === 0) return Number(s + "0");                           /* 84,3760: the zero on the end */
    if (item.adds.length === 1 && item.adds[0] === 1) return Number(s.slice(0, -1) + String(Number(s.slice(-1)) + 1)); /* ten written in the ones */
    return item.start + item.adds.reduce((a: number, x: number) => a + x / 10, 0);                        /* the place below raised: 26,418, 34,752 */
  }
  /* the sum with no carries (a column added alone), else a slip in the hundreds */
  const d = item.cards.map(rbDig), len = Math.max(...d.map((x: number[]) => x.length));
  let nc = 0;
  for (let j = 0; j < len; j++) nc += (d.reduce((a: number, x: number[]) => a + (x[j] || 0), 0) % 10) * Math.pow(10, j);
  return nc !== item.answer ? nc : item.answer + 100;
};
/* the forms of an answer that no question, hint or ladder line may print. The number IS the
   question when a gap is filled from the cards shown, or when nothing is added. */
const answerForms = (item: any) =>
  item.kind === "blank" || (item.kind === "step" && item.adds.every((a: number) => a === 0)) ? []
    : [String(item.answer), indian(item.answer), words(item.answer)];
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (item.kind === "blank") { HOOK.fill && HOOK.fill(item.answer); setTimeout(() => HOOK.enter && HOOK.enter(), 60); return; }
  if (item.kind === "step") { HOOK.enter && HOOK.enter(String(item.answer)); return; }
  return T.submit(item.answer);
};
/* the agent's answer() for a gap: it drags that card in, as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.kind === "blank" ? (HOOK.fill ? HOOK.fill(leadNumber(v)) : false) : undefined);
/* the agent's check(): Enter commits (for the step bay, Enter presses the amount and then answers) */
const check = () => (HOOK.check ? HOOK.check() : undefined);
/* the slot writes what was typed with Indian commas, as everywhere else */
const format = (s: any) => { const t = String(s ?? ""); return /^[1-9]\d{3,8}$/.test(t) ? indian(Number(t)) : t; };

const RB_CSS = `
.rb-slide{transition:transform 380ms cubic-bezier(.3,.7,.25,1)}
.rb-in{animation:rbIn 420ms ease-out both}
@keyframes rbIn{from{opacity:0;transform:translateY(-12px)}to{opacity:1;transform:none}}
.rb-tie{stroke-dasharray:720;stroke-dashoffset:720;animation:rbTie 460ms ease-out forwards}
@keyframes rbTie{to{stroke-dashoffset:0}}
.rb-grab{cursor:grab}
@media (prefers-reduced-motion:reduce){.rb-slide{transition:none}.rb-in,.rb-tie{animation:none}.rb-tie{stroke-dashoffset:0}}
`;

/* ── the column mats (phases 1, 2 and free play) ─────────────────────────────────────────────
   a mat is 510 wide: a gutter of 104 for the plus sign and the bracket, five columns of 76
   (TTh Th H T O), a heading row, a carry strip, the addend rows, the rule and the sum row */
const MG = { w: 510, gut: 104, cw: 76, head: 32, carry: 30, top: 6, cardX: 96, cardW: 396 };
const mgRowTop = (s: number, rowH: number) => MG.top + MG.head + MG.carry + s * rowH;
const mgSumTop = (rows: number, rowH: number) => mgRowTop(rows, rowH) + 12;
const mgHeight = (rows: number, rowH: number) => mgSumTop(rows, rowH) + 70;
const mgColC = (k: number) => MG.gut + (4 - k) * MG.cw + MG.cw / 2;

const rbMatsFor = (it: any) => [
  { order: it.left.slice(), jaw: it.jawL ?? null, closed: false, picked: null, ring: [], hide: [], fly: {}, sum: [], carry: [] },
  { order: it.right.slice(), jaw: it.jawR ?? null, closed: false, picked: null, ring: [], hide: [], fly: {}, sum: [], carry: [] },
];
/* each card's row on the mat; a closed pair shares one row (the pair card stands on top of it) */
const rbSlots = (m: any) => {
  const pos: Record<string, number> = {};
  let s = 0;
  m.order.forEach((id: string, i: number) => {
    if (m.closed && m.jaw !== null && i === m.jaw) pos[id] = s;
    else { pos[id] = s; s++; }
  });
  return pos;
};
/* the numbers standing on a mat (a closed pair counts once, as its total) */
const rbAddends = (m: any, valOf: (id: string) => any) => {
  const out: number[] = [];
  m.order.forEach((id: string, i: number) => {
    if (m.hide.includes(id)) return;
    if (m.closed && m.jaw !== null && i === m.jaw) { out.push((valOf(id) || 0) + (valOf(m.order[i + 1]) || 0)); return; }
    if (m.closed && m.jaw !== null && i === m.jaw + 1) return;
    const v = valOf(id);
    if (v !== null && v !== undefined) out.push(v);
  });
  return out;
};
/* column addition from the ones: each column's digit and the carry it hands on */
const rbColumns = (adds: number[]) => {
  const total = adds.reduce((a, b) => a + b, 0), len = String(total).length;
  const res: number[] = [], car: number[] = [];
  let c = 0;
  for (let j = 0; j < len; j++) {
    const s = adds.reduce((a, v) => a + (Math.floor(v / Math.pow(10, j)) % 10), 0) + c;
    res[j] = s % 10; c = Math.floor(s / 10); car[j + 1] = c;
  }
  return { len, res, car, total };
};
/* bring a pair together (the third card steps below them) and close the bracket round it */
const rbPairUp = (m: any, a: string, b: string) => {
  const ia = m.order.indexOf(a), ib = m.order.indexOf(b), lo = Math.min(ia, ib), hi = Math.max(ia, ib);
  if (hi - lo === 1) return { ...m, jaw: lo, closed: true, picked: null };
  const first = m.order[lo], second = m.order[hi];
  return { ...m, order: [first, second, ...m.order.filter((x: string) => x !== first && x !== second)], jaw: 0, closed: true, picked: null };
};
const rbPairs = (it: any) => {
  const ids = ["a", "b", "c"];
  return [[0, 1], [1, 2], [0, 2]].map(([i, j]) => ({ ids: [ids[i], ids[j]], x: it.cards[i], y: it.cards[j], total: it.cards[i] + it.cards[j] }));
};

/* a number written into the columns of a mat, one digit to a column, zeros that hold a place in grey */
function RbDigits({ v, y, size, fill, colC }: any) {
  const s = String(v);
  return (
    <text textAnchor="middle" fontSize={size} fontWeight={700}>
      {s.split("").map((ch, i) => <tspan key={i} x={colC(s.length - 1 - i)} y={y} fill={ch === "0" ? RB_ZERO : fill}>{ch}</tspan>)}
    </text>
  );
}

function RbMat({ C, side, mx, my, rows, rowH, m, valOf, lit, live, grouping, onPick, onJaw, flyTo, tx = (v: any) => v }: any) {
  const pos = rbSlots(m);
  const top = (s: number) => mgRowTop(s, rowH);
  const sumTop = mgSumTop(rows, rowH), H = mgHeight(rows, rowH);
  const shown = m.order.filter((id: string) => !m.hide.includes(id));
  const lastSlot = Math.max(0, ...shown.map((id: string) => pos[id]));
  const pairId = m.closed && m.jaw !== null ? m.order[m.jaw] : null;
  const pairIds = pairId ? [m.order[m.jaw], m.order[m.jaw + 1]] : [];
  const pairV = pairId ? (valOf(pairIds[0]) || 0) + (valOf(pairIds[1]) || 0) : 0;
  const sumLen = m.sum.length;
  const sumChars: any[] = [];
  for (let k = sumLen - 1; k >= 0; k--) if (m.sum[k] !== undefined && m.sum[k] !== null) sumChars.push({ k, d: m.sum[k] });
  const jawTop = m.jaw !== null ? top(pairId ? pos[pairIds[0]] : m.jaw) : 0;
  const jawBot = m.jaw !== null ? top((pairId ? pos[pairIds[0]] : m.jaw) + (pairId ? 1 : 2)) - 6 : 0;
  const paren = (x: number, dir: number) => `M ${x + 9 * dir} ${jawTop + 4} Q ${x - 9 * dir} ${(jawTop + jawBot) / 2} ${x + 9 * dir} ${jawBot}`;
  const cardAt = (id: string) => {
    const s = pos[id], v = valOf(id), blank = id === "blank" && (v === null || v === undefined);
    const down = pairIds.includes(id);
    const off = down ? (id === pairIds[0] ? 5 : 10) : 0;
    const fly = m.fly[id] && flyTo ? flyTo(id, s) : null;
    const ringed = m.ring.includes(id), picked = m.picked === id;
    return (
      <g key={id} className="rb-slide" style={{ transform: fly ? `translate(${fly.x}px, ${fly.y}px)` : `translate(0px, ${top(s) + off}px)` } as any}>
        {down ? (
          <rect x={MG.cardX} y={4} width={MG.cardW} height={rowH - 8} rx={12} fill={tint(C.rule, 0.35)} stroke={C.rule} strokeWidth={2} />
        ) : blank ? (
          <rect x={MG.cardX} y={4} width={MG.cardW} height={rowH - 8} rx={12} fill="#FFFFFF" stroke={C.accent} strokeWidth={3} strokeDasharray="12 9" />
        ) : (
          <g>
            <rect x={MG.cardX} y={4} width={MG.cardW} height={rowH - 8} rx={12} fill="#FFFFFF"
              stroke={picked ? RB_AMBER : ringed ? C.ink : C.rule} strokeWidth={picked || ringed ? 4 : 2} />
            <RbDigits v={v} y={rowH / 2 + 20} size={T.xl} fill={rbInkBlue} colC={mgColC} />
          </g>
        )}
      </g>
    );
  };
  return (
    <g transform={`translate(${mx},${my})`} data-mat={side}>
      <rect x={0} y={0} width={MG.w} height={H} rx={RAD.panel} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={2} />
      {/* the column under work, lit from the heading to the sum row */}
      {lit !== null && lit !== undefined && lit < 5 && (
        <rect x={mgColC(lit) - MG.cw / 2 + 3} y={MG.top} width={MG.cw - 6} height={H - MG.top * 2} rx={12} fill={RB_AMBER} fillOpacity={0.16} stroke={RB_AMBER} strokeWidth={3} />
      )}
      {RB_HEADS.map((h, k) => (
        <g key={h}>
          <rect x={mgColC(k) - MG.cw / 2 + 4} y={MG.top} width={MG.cw - 8} height={MG.head - 2} rx={9} fill={lit === k ? tint(RB_AMBER, 0.6) : tint(C.panel, 0.2)} stroke={C.rule} strokeWidth={1.5} />
          <text x={mgColC(k)} y={MG.top + 25} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(h)}</text>
        </g>
      ))}
      {/* carries: small, vermilion, over the column they are added into */}
      {m.carry.map((c: number, k: number) => (c ? (
        <text key={"c" + k} className="rb-in" x={mgColC(k)} y={MG.top + MG.head + MG.carry - 4} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={rbInkVerm}>{c}</text>
      ) : null))}
      {/* the face-down pair under its total, then the standing cards, then the pair card on top */}
      {m.order.filter((id: string) => pairIds.includes(id) && !m.hide.includes(id)).map(cardAt)}
      {m.order.filter((id: string) => !pairIds.includes(id) && !m.hide.includes(id)).slice().sort().map(cardAt)}
      {pairId && (
        <g transform={`translate(0,${top(pos[pairIds[0]])})`}>
          <g className="rb-in">
            <rect x={MG.cardX} y={4} width={MG.cardW} height={rowH - 8} rx={12} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
            <RbDigits v={pairV} y={rowH / 2 + 20} size={T.xl} fill={rbInkBlue} colC={mgColC} />
          </g>
        </g>
      )}
      {shown.length > 1 && <text x={40} y={top(lastSlot) + rowH / 2 + 15} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>+</text>}
      {m.jaw !== null && (
        <g pointerEvents="none">
          <path d={paren(MG.cardX - 14, 1)} fill="none" stroke={pairId ? C.ink : C.accent} strokeWidth={pairId ? 5 : 4} strokeLinecap="round" strokeDasharray={pairId ? undefined : "9 8"} />
          <path d={paren(MG.cardX + MG.cardW + 10, -1)} fill="none" stroke={pairId ? C.ink : C.accent} strokeWidth={pairId ? 5 : 4} strokeLinecap="round" strokeDasharray={pairId ? undefined : "9 8"} />
        </g>
      )}
      {/* the rule and the sum row */}
      <rect x={MG.cardX} y={mgRowTop(rows, rowH) + 3} width={MG.cardW} height={4} rx={2} fill={C.ink} />
      <rect x={MG.cardX} y={sumTop} width={MG.cardW} height={64} rx={12} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      {sumChars.length > 0 && (
        <text textAnchor="middle" fontSize={T.xl} fontWeight={700}>
          {sumChars.map((c) => <tspan key={c.k} x={mgColC(c.k)} y={sumTop + 52} fill={c.d === 0 ? RB_ZERO : rbInkGreen}>{c.d}</tspan>)}
        </text>
      )}
      {/* the child's handles: a bracket jaw to close, a card to pick, the pair card to open again */}
      {live && grouping && m.jaw !== null && !pairId && (
        <Hit id={`jaw-${side}`} label={`Close the bracket on the ${side} mat`} x={0} y={top(m.jaw)} w={MG.cardX - 4} h={rowH * 2 - 2} onPress={() => onJaw()} />
      )}
      {live && grouping && shown.filter((id: string) => !pairIds.includes(id) && id !== "blank").map((id: string) => (
        <Hit key={id} id={`card-${side}-${id}`} label={`Pick ${indian(valOf(id))} on the ${side} mat`} x={MG.cardX} y={top(pos[id]) + 1} w={MG.cardW} h={72} onPress={() => onPick(id)} />
      ))}
      {live && grouping && pairId && (
        <Hit id={`pair-${side}`} label={`Open the bracket on the ${side} mat`} x={MG.cardX} y={top(pos[pairIds[0]]) + 1} w={MG.cardW} h={72} onPress={() => onPick("p")} />
      )}
    </g>
  );
}

/* the compare rail: when the two sum rows read alike it closes as one bar across the gap */
function RbRail({ my, rows, rowH, tx = (v: any) => v }: any) {
  const y = my + mgSumTop(rows, rowH);
  return (
    <g className="rb-in" data-role="compare">
      <rect x={MG.w - 14} y={y + 10} width={176} height={44} rx={22} fill={tint(RB_GREEN, 0.86)} stroke={RB_GREEN} strokeWidth={3} />
      <text x={MG.w + 74} y={y + 43} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={rbInkGreen}>{tx("Same")}</text>
    </g>
  );
}

/* the running count: how many cards stand on each mat */
function RbCardCount({ C, counts, tx = (v: any) => v }: any) {
  return (
    <g data-zone="runs">
      <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
      <text x={20} y={-46} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("cards")}</text>
      {counts.map((c: number, i: number) => (
        <g key={i}>
          <rect x={126 + i * 100} y={-86} width={88} height={60} rx={14} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
          <text x={170 + i * 100} y={-44} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={rbInkBlue}>{c}</text>
        </g>
      ))}
    </g>
  );
}

/* ── phases 1 and 2: two mats, one set of cards ───────────────────────────────────────────── */
function RbMats({ phase, n, item, index, stage, wrong, typed, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const two = n === 2;
  const rows = two ? 3 : 2, rowH = 74;
  const MY = 84, LX = 0, RX = 576;
  const [cfg, setCfg] = useState<any>(item);
  const [mats, setMats] = useState<any[]>(() => rbMatsFor(item));
  const [blankV, setBlankV] = useState<number | null>(null);
  const [lit, setLit] = useState<number | null>(null);
  const [rail, setRail] = useState(false);
  const [chips, setChips] = useState(0);
  const [chipsDone, setChipsDone] = useState(false);
  const [touched, setTouched] = useState(false);
  const setupFor = useRef(index);
  const matsRef = useRef(mats); matsRef.current = mats;
  const blankRef = useRef(blankV); blankRef.current = blankV;
  const busy = tl.busy;
  const kind = cfg.kind;
  const valOf = (id: string) => (id === "blank" ? blankRef.current : rbCard(cfg, id));

  const reset = (it: any) => {
    tl.stop();
    setCfg(it); setMats(rbMatsFor(it)); matsRef.current = rbMatsFor(it);
    setBlankV(null); blankRef.current = null;
    setLit(null); setRail(false); setChips(0); setChipsDone(false); setTouched(false);
    api.lock(false);
  };
  useEffect(() => {
    if (stage === "ask" && setupFor.current !== index) { setupFor.current = index; reset(item); }
  }, [stage, index]);

  const setMat = (mi: number, fn: (m: any) => any) => setMats((ms) => ms.map((m, i) => (i === mi ? fn(m) : m)));
  const canPlay = stage === "ask" && !busy;
  const grouping = two && kind === "group";

  /* Swap reverses one mat and leaves the other alone */
  const swap = (mi: number) => {
    if (!canPlay) return;
    setTouched(true);
    setMat(mi, (m) => ({ ...m, order: m.order.slice().reverse(), picked: null, ring: [] }));
    api.sfx.tick();
  };
  /* a bracket: tap its jaw to close it, or tap two cards to bracket that pair; tap the pair card to open it */
  const closeJaw = (mi: number) => {
    if (!canPlay || !grouping) return;
    setTouched(true);
    setMat(mi, (m) => (m.jaw !== null && !m.closed ? { ...m, closed: true, picked: null } : m));
    api.sfx.tick();
  };
  const pick = (mi: number, id: string) => {
    if (!canPlay || !grouping) return;
    setTouched(true);
    const m = matsRef.current[mi];
    if (m.closed) { if (id === "p") { setMat(mi, (x) => ({ ...x, closed: false, picked: null })); api.sfx.tick(); } return; }
    if (m.picked === null) setMat(mi, (x) => ({ ...x, picked: id }));
    else if (m.picked === id) setMat(mi, (x) => ({ ...x, picked: null }));
    else { const a = m.picked; setMat(mi, (x) => rbPairUp(x, a, id)); }
    api.sfx.tick();
  };
  /* a gap is filled from the tray: drag a card onto the right mat, or tap it */
  const canFill = canPlay && kind === "blank";
  const fill = (v: any) => {
    const x = leadNumber(v);
    if (x === null || !cfg.cards.includes(x)) return false;
    setTouched(true);
    setBlankV(x); blankRef.current = x;
    api.setTyped(String(x));
    api.sfx.tick();
    return true;
  };
  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (!canFill) return;
    if (moved && !(p.x > RX - 30 && p.y > MY - 10)) return;   /* let go away from the right mat: it goes back */
    fill(rbCard(cfg, pay.id));
  });

  /* Enter: typed answers go straight to the runtime; a gap commits the card standing in it */
  const enterFn: any = stage === "ask" && !busy && kind === "blank" ? () => { if (blankRef.current !== null) api.submit(blankRef.current); } : null;
  api.onEnter(enterFn);
  HOOK.enter = () => enterFn && enterFn();
  HOOK.fill = (v: any) => (stage === "ask" && kind === "blank" ? fill(v) : false);
  HOOK.check = () => undefined;

  /* ── the sums worked down the columns from the ones, both mats together ── */
  const workSteps = (slow: number) => {
    const left = rbAddends(matsRef.current[0], valOf);
    const len = String(cfg.left.map((id: string) => rbCard(cfg, id)).reduce((a: number, b: number) => a + b, 0)).length || String(left.reduce((a, b) => a + b, 0)).length;
    const S: any[] = [[200 * slow, () => { setRail(false); setMats((ms) => ms.map((m) => ({ ...m, sum: [], carry: [], picked: null }))); }]];
    for (let j = 0; j < len; j++) {
      S.push([230 * slow, () => setLit(j)]);
      S.push([300 * slow, () => {
        setMats((ms) => ms.map((m) => {
          const c = rbColumns(rbAddends(m, valOf));
          if (j >= c.len) return m;
          return { ...m, sum: rbPut(m.sum, j, c.res[j]), carry: c.car[j + 1] ? rbPut(m.carry, j + 1, c.car[j + 1]) : m.carry };
        }));
        api.sfx.tick();
      }]);
    }
    S.push([220 * slow, () => setLit(null)]);
    S.push([400 * slow, () => setRail(true)]);
    return S;
  };
  const closeOpen = (mi: number) => [[420, () => { setMat(mi, (m) => (m.jaw !== null && !m.closed ? { ...m, closed: true, picked: null } : { ...m, picked: null })); api.sfx.tick(); }]];

  /* ── the win: both mats are added and their answers land together ── */
  useEffect(() => {
    if (stage !== "win") return;
    const S: any[] = [];
    if (two && kind !== "blank") S.push(...closeOpen(0), ...closeOpen(1));   /* a gap's card stays face up, where it was put */
    S.push(...workSteps(1));
    tl.run(S);
  }, [stage]);

  /* ── the traceback: the mathematics redrawn in steps, ending on the whole right answer;
        nothing marked, nothing cleared from the slot ── */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    setTouched(true);
    const done = () => api.lock(false);
    const S: any[] = [];
    const clear = [250, () => {
      setRail(false); setLit(null); setChips(0); setChipsDone(false);
      setMats((ms) => ms.map((m, i) => ({ ...m, sum: [], carry: [], picked: null, ring: [], closed: false, jaw: (i ? cfg.jawR : cfg.jawL) ?? null, order: i ? m.order : m.order })));
    }];
    if (!two) {
      /* the right mat clears and refills in the order the cards were dealt, each ringed as it lands */
      S.push(clear);
      S.push([420, () => { setMats((ms) => [ms[0], { ...ms[1], order: cfg.right.slice(), hide: cfg.right.slice(), fly: {} }]); if (kind === "blank") { setBlankV(null); blankRef.current = null; } }]);
      cfg.right.forEach((id: string) => {
        S.push([40, () => {
          if (id === "blank") { setBlankV(cfg.answer); blankRef.current = cfg.answer; }
          setMats((ms) => [ms[0], { ...ms[1], hide: ms[1].hide.filter((x: string) => x !== id), fly: { ...ms[1].fly, [id]: true } }]);
        }]);
        S.push([480, () => setMats((ms) => [ms[0], { ...ms[1], fly: { ...ms[1].fly, [id]: false } }])]);
        S.push([260, () => { setMats((ms) => [ms[0], { ...ms[1], ring: [...ms[1].ring, id] }]); api.sfx.tick(); }]);
      });
      S.push([300, () => {}]);
    } else if (kind === "blank") {
      S.push(clear);
      S.push([500, () => { setBlankV(cfg.answer); blankRef.current = cfg.answer; setMat(1, (m) => ({ ...m, ring: ["blank"] })); api.sfx.tick(); }]);
    } else {
      const pairs = rbPairs(cfg), round = pairs.find((p) => p.total % 1000 === 0) || pairs[0];
      const other = pairs.find((p) => p !== round) || pairs[1];
      const wv = leadNumber(wrong.value);
      S.push(clear);
      if (wv !== cfg.answer + round.total) {
        /* every pair totalled in turn: only one makes a round number, and its jaw stays open */
        pairs.forEach((_, k) => S.push([650, () => setChips(k + 1)]));
        S.push([500, () => setChipsDone(true)]);
      }
      /* the round pair is bracketed: its two cards turn face down under their total, three cards are two */
      S.push([700, () => { setMats((ms) => [rbPairUp({ ...ms[0], closed: false }, round.ids[0], round.ids[1]), ms[1]]); api.sfx.tick(); }]);
      S.push([600, () => { setMats((ms) => [ms[0], rbPairUp({ ...ms[1], closed: false }, other.ids[0], other.ids[1])]); api.sfx.tick(); }]);
    }
    S.push(...workSteps(1.5));
    tl.run(S, done);
  }, [wrong]);

  /* ── what the host and the agent read back ── */
  const shownVals = (m: any) => m.order.filter((id: string) => !m.hide.includes(id)).map((id: string) => valOf(id) ?? null);
  const counts = mats.map((m) => m.order.filter((id: string) => !m.hide.includes(id) && !(id === "blank" && blankV === null)).length - (m.closed && m.jaw !== null ? 1 : 0));
  api.share({
    cards: cfg.cards.slice(), leftMat: shownVals(mats[0]), rightMat: shownVals(mats[1]),
    brackets: two ? mats.map((m) => (m.jaw === null ? null : { pair: [valOf(m.order[m.jaw]), valOf(m.order[m.jaw + 1])], closed: m.closed })) : null,
    stepAmount: null, liftedPlace: null, ring: null,
  });

  /* ── drawing ── */
  const trayN = cfg.cards.length, trayW = trayN * 150 + (trayN - 1) * 16, trayX0 = (W.w - trayW) / 2;
  const trayX = (id: string) => trayX0 + "abc".indexOf(id) * 166;
  /* where a card flies from: its place in the tray, seen from its row on the right mat */
  const flyTo = (id: string, s: number) => {
    const src = id === "blank" ? ["a", "b", "c"].find((x) => rbCard(cfg, x) === cfg.answer) || "a" : id;
    return { x: trayX(src) + 75 - (RX + MG.cardX + MG.cardW / 2), y: 38 - (MY + mgRowTop(s, rowH) + rowH / 2) + mgRowTop(s, rowH) };
  };
  const dragging = drag.drag && drag.drag.moved ? drag.drag.payload.id : null;
  const liveTray = canFill;
  const sameSums = mats[0].sum.join() === mats[1].sum.join() && mats[0].sum.length > 0;
  const invite = !touched && index === 0 && stage === "ask" && !busy
    ? (two ? (mats[0].jaw !== null && !mats[0].closed ? { x: LX + 50, y: MY + mgRowTop(mats[0].jaw, rowH) + rowH, r: 46 } : null)
      : { x: LX + MG.w / 2, y: MY + mgHeight(rows, rowH) + 50, r: 62 })
    : null;
  const pairs = two && kind === "group" ? rbPairs(cfg) : [];

  return (
    <g>
      <style>{RB_CSS}</style>
      <RbCardCount C={C} counts={counts} tx={tx} />

      {/* the card tray: the phase's number cards; a card drawn out leaves its outline and refills */}
      <rect x={trayX0 - 14} y={0} width={trayW + 28} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
      {cfg.cards.map((v: number, i: number) => {
        const id = "abc"[i], x = trayX(id), pay = { src: "tray", id };
        const out = dragging === id;
        return (
          <g key={id} className={liveTray ? "rb-grab c4-piece" : ""}
            {...(liveTray ? { ...control("card-" + id, "Card " + indian(v)), ...drag.bind(pay), ...drag.keys(pay) } : {})}>
            <rect x={x} y={2} width={150} height={72} rx={14} fill="#FFFFFF" stroke={out ? C.accent : C.rule} strokeWidth={out ? 3 : 2}
              strokeDasharray={out ? "10 8" : undefined} filter={liveTray && !out ? "url(#fShadowSoft)" : undefined} />
            <text x={x + 75} y={50} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={rbInkBlue}>{indian(v)}</text>
          </g>
        );
      })}

      <RbMat C={C} side="left" mx={LX} my={MY} rows={rows} rowH={rowH} m={mats[0]} valOf={valOf} lit={lit} live={canPlay} grouping={grouping}
        onPick={(id: string) => pick(0, id)} onJaw={() => closeJaw(0)} flyTo={null} tx={tx} />
      <RbMat C={C} side="right" mx={RX} my={MY} rows={rows} rowH={rowH} m={mats[1]} valOf={valOf} lit={lit} live={canPlay} grouping={grouping}
        onPick={(id: string) => pick(1, id)} onJaw={() => closeJaw(1)} flyTo={flyTo} tx={tx} />
      {rail && sameSums && <RbRail my={MY} rows={rows} rowH={rowH} tx={tx} />}

      {/* Swap under each mat (phase 1) */}
      {!two && [0, 1].map((mi) => (
        <Key key={mi} id={mi ? "swap-right" : "swap-left"} label={tx(mi ? "Swap the right mat" : "Swap the left mat")} x={(mi ? RX : LX) + MG.w / 2 - 100} y={MY + mgHeight(rows, rowH) + 14} w={200} h={72} C={C}
          disabled={!canPlay} onClick={() => swap(mi)}>
          <path d="M -62 -9 h 22 l -7 -7 M -62 9 h 22 M -62 9 l 7 7" fill="none" stroke={canPlay ? C.ink : mix(C.ink, C.panel, 0.5)} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
          <text x={14} y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={canPlay ? C.ink : mix(C.ink, C.panel, 0.5)}>{tx("Swap")}</text>
        </Key>
      ))}

      {/* the three first steps, side by side: only one pair makes a round number */}
      {pairs.slice(0, chips).map((p: any, k: number) => {
        const round = p.total % 1000 === 0, cx = W.w / 2 + (k - 1) * 272;
        return (
          <g key={k} className="rb-in">
            <rect x={cx - 128} y={462} width={256} height={64} rx={16} fill={round ? tint(RB_AMBER, 0.8) : "#FFFFFF"}
              stroke={round ? RB_AMBER : C.rule} strokeWidth={round ? 4 : 2} strokeDasharray={chipsDone && !round ? "8 7" : undefined} />
            <text x={cx} y={489} textAnchor="middle" fontSize={T.micro} fontWeight={500} fill={C.ink}>{`${indian(p.x)} + ${indian(p.y)}`}</text>
            <text x={cx} y={519} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{indian(p.total)}</text>
          </g>
        );
      })}

      {/* the card under the finger */}
      {dragging && (
        <g pointerEvents="none" filter="url(#fLift)">
          <rect x={drag.drag.x - 75} y={drag.drag.y - 36} width={150} height={72} rx={14} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} />
          <text x={drag.drag.x} y={drag.drag.y + 12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={rbInkBlue}>{indian(rbCard(cfg, dragging))}</text>
        </g>
      )}
      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* ── phases 3 and 4: the step bay, a place chart with the number, the amount and the result ──── */
const SB = { cw: 150, right: 950, headH: 60, carryY: 96, r1: 100, r1H: 92, r2: 196, r2H: 70, rule: 272, r3: 284, r3H: 92, keysY: 412, keyH: 76 };
const sbColL = (k: number) => SB.right - (k + 1) * SB.cw;
const sbColC = (k: number) => sbColL(k) + SB.cw / 2;
/* the plan's six-digit number (phase 3, practice 5): in the correction of a thousand it is stood under the
   five-digit one, so the thousands digit is seen to be the fourth from the right in both */
const RB_SIX = 367204;
const rbStepState = (start: number) => ({ start, slip: false, amt: null as any, res: [] as any[], carry: [] as any[], target: null as any, lit: null as any, lift: null as any, counters: null as any });

function RbStep({ phase, n, item, index, stage, wrong, typed, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const four = n === 4;
  const [cfg, setCfg] = useState<any>(item);
  const [sb, setSb] = useState<any>(() => rbStepState(item.start));
  const [revealed, setRevealed] = useState(false);
  const [going, setGoing] = useState<number | null>(null);
  const [cmp, setCmp] = useState<any>(null);   /* the six-digit number stood under, in the correction of a thousand */
  const setupFor = useRef(index);
  const busy = tl.busy;

  const reset = (it: any) => {
    tl.stop();
    setCfg(it); setSb(rbStepState(it.start)); setRevealed(false); setGoing(null); setCmp(null);
    api.lock(false);
  };
  useEffect(() => {
    if (stage === "ask" && setupFor.current !== index) { setupFor.current = index; reset(item); }
  }, [stage, index]);

  /* one amount at a time: it lands in its own column, that column lights amber, and the columns are
     read from the ones; a column that is handed a ten keeps a grey zero and carries a small one */
  const stepSteps = (slow: number, teach: boolean) => {
    const S: any[] = [];
    let cur = cfg.start;
    cfg.adds.forEach((add: number, si: number) => {
      const from = cur, to = cur + add, k = add === 0 ? 0 : String(add).length - 1;
      if (si > 0) S.push([500 * slow, () => setSb(rbStepState(from))]);   /* the answer so far moves up into the window */
      S.push([420 * slow, () => { setGoing(add); setSb((s: any) => ({ ...s, amt: add, target: k })); api.sfx.tick(); }]);
      S.push([380 * slow, () => {}]);
      const fd = rbDig(from), ad = rbDig(add), len = String(to).length;
      let c = 0;
      for (let j = 0; j < len; j++) {
        const a = fd[j] || 0, b = ad[j] || 0, sum = a + b + c, jj = j;
        if (b === 0 && c === 0) S.push([170 * slow, () => setSb((s: any) => ({ ...s, lit: jj, res: rbPut(s.res, jj, a) }))]);
        else {
          S.push([320 * slow, () => setSb((s: any) => ({ ...s, lit: jj, lift: { k: jj, d: a } }))]);
          if (teach && sum >= 10 && jj === 0) {
            /* the ones column opens: ten ones stand in it, and they tie into one bundle */
            S.push([900, () => setSb((s: any) => ({ ...s, lift: null, counters: { k: jj, tied: false } }))]);
            S.push([900, () => setSb((s: any) => ({ ...s, lift: null, counters: { k: jj, tied: true } }))]);
          }
          S.push([340 * slow, () => setSb((s: any) => ({ ...s, counters: null, lift: { k: jj, d: sum % 10 }, carry: sum >= 10 ? rbPut(s.carry, jj + 1, 1) : s.carry }))]);
          S.push([260 * slow, () => { setSb((s: any) => ({ ...s, lift: null, res: rbPut(s.res, jj, sum % 10) })); api.sfx.tick(); }]);
        }
        c = sum >= 10 ? 1 : 0;
      }
      S.push([260 * slow, () => { setSb((s: any) => ({ ...s, lit: null })); setGoing(null); }]);
      cur = to;
    });
    return S;
  };

  /* Enter (or the amount key): the child's number is written first, then the amount goes in and
     the window shows what it makes; after that the number is checked */
  const go = (v: any) => {
    const val = leadNumber(v);
    if (val === null || v === "") return;
    if (revealed) { api.submit(val); return; }
    api.lock(true);
    tl.run(stepSteps(1, false), () => { setRevealed(true); api.submit(val); });
  };
  const enterFn: any = stage === "ask" && !busy ? go : null;
  api.onEnter(enterFn);
  HOOK.enter = (v?: any) => enterFn && enterFn(v);
  HOOK.fill = () => false;
  HOOK.check = () => (busy ? true : undefined);

  /* the win: the new number was already written; the column that moved stays named on the chart */
  useEffect(() => {
    if (stage !== "win") return;
    tl.run([[300, () => setSb((s: any) => ({ ...s, lit: null }))]]);
  }, [stage]);

  /* the traceback: the same addition, slowly, from a clean window, ending on the right number. For a
     thousand (the last phase) it goes: the child's number as handed in; then the plan's six-digit
     3,67,204 stood under, its thousands digit lifting too, though it is third from the left there and
     second from the left in the five-digit number; then the item's own number put right, the last frame */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    const finish = () => { setRevealed(true); api.lock(false); };
    const S: any[] = [[300, () => { setSb(rbStepState(cfg.start)); setGoing(null); setCmp(null); }], [300, () => {}]];
    if (!(four && cfg.adds.length === 1 && cfg.adds[0] === 1000)) { tl.run([...S, ...stepSteps(1.8, true)], finish); return; }
    const wv = leadNumber(wrong.value), right = rbDig(cfg.answer), from = rbDig(cfg.start);
    const slip = wv !== null && String(wv).length === String(cfg.answer).length ? rbDig(wv) : null;
    /* 1. the child's number, written under the rule as it was handed in; the column it moved is lit */
    if (slip) {
      const moved = slip.findIndex((d: number, j: number) => d !== from[j]);
      S.push([700, () => setSb((s: any) => ({ ...s, amt: 1000, res: slip.slice(), slip: true, lit: moved >= 0 ? moved : null }))]);
      S.push([1000, () => {}]);
    }
    /* 2. a lakhs column opens and 3,67,204 stands under; the thousands column lights in both */
    S.push([700, () => { setCmp({ v: RB_SIX, lift: false }); setSb((s: any) => ({ ...s, lit: null })); }]);
    S.push([700, () => setSb((s: any) => ({ ...s, lit: 3, target: 3 }))]);
    S.push([480, () => setCmp((c: any) => ({ ...c, lift: true }))]);
    S.push([480, () => setCmp((c: any) => ({ ...c, v: c.v + 1000 }))]);
    S.push([1200, () => { setCmp((c: any) => ({ ...c, lift: false })); api.sfx.tick(); }]);
    S.push([500, () => { setCmp(null); setSb((s: any) => ({ ...s, lit: null })); }]);
    /* 3. the item's own number put right: a digit moved in the wrong place goes back, the thousands
          digit alone lifts and rolls on by one; the answer stands with its column lit */
    if (slip) {
      for (let j = 0; j < right.length; j++) if (slip[j] !== right[j]) {
        const jj = j;
        S.push([440, () => setSb((s: any) => ({ ...s, lit: jj, lift: { k: jj, d: slip[jj] } }))]);
        S.push([440, () => setSb((s: any) => ({ ...s, lift: { k: jj, d: right[jj] } }))]);
        S.push([340, () => { setSb((s: any) => ({ ...s, lift: null, res: rbPut(s.res, jj, right[jj]) })); api.sfx.tick(); }]);
      }
      S.push([300, () => setSb((s: any) => ({ ...s, slip: false, lit: 3, target: 3 }))]);
    } else {
      S.push([300, () => setSb(rbStepState(cfg.start))], ...stepSteps(1.8, true));
      S.push([300, () => setSb((s: any) => ({ ...s, lit: 3, target: 3 }))]);
    }
    tl.run(S, finish);
  }, [wrong]);

  api.share({
    cards: [cfg.start], leftMat: null, rightMat: null, brackets: null, start: cfg.start,
    stepAmount: cfg.adds.slice(), liftedPlace: sb.target !== null ? RB_PLACES[sb.target] : null, ring: null,
  });

  /* ── drawing ── */
  const cols = cmp ? 6 : Math.max(5, String(cfg.start + cfg.adds.reduce((a: number, x: number) => a + x, 0)).length, String(sb.start).length);
  const left = sbColL(cols - 1);
  const bodyH = (cmp ? 526 : SB.r3 + SB.r3H + 4) - (SB.headH + 6);
  const cmpS = cmp ? String(cmp.v) : "";
  const startS = String(sb.start), startLen = startS.length;
  const amounts = four ? [10, 100, 1000] : [0, 1];
  const keyW = 200, keyGap = 24, keysW = amounts.length * keyW + (amounts.length - 1) * keyGap;
  const keysX0 = (left + SB.right) / 2 - keysW / 2;
  const liveKey = (a: number) => stage === "ask" && !busy && !revealed && typed !== "" && a === cfg.adds[0];
  const liveAt = amounts.findIndex(liveKey);
  const resChars: any[] = [];
  for (let k = sb.res.length - 1; k >= 0; k--) if (sb.res[k] !== undefined && sb.res[k] !== null) resChars.push({ k, d: sb.res[k] });
  const resLen = String(sb.start + (sb.amt || 0)).length;
  const amtS = sb.amt === null ? "" : String(sb.amt);
  const runsLine = cfg.adds.map((a: number) => tx(RB_AMOUNT[a] || indian(a))).join(lang === "hi" ? ", फिर " : lang === "gu" ? ", પછી " : ", then ");

  return (
    <g>
      <style>{RB_CSS}</style>
      {/* the running count: the number the bay began with and, under it, the amount in words */}
      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        <text x={18} y={-60} fontSize={T.label} fontWeight={700} fill={rbInkBlue}>{indian(cfg.start)}</text>
        <text x={18} y={-28} fontSize={T.micro} fontWeight={500} fill={C.ink}>{"+ " + runsLine}</text>
      </g>

      {/* the place chart behind the number */}
      {Array.from({ length: cols }).map((_, k) => {
        const x = sbColL(k), head = RB_PLACES[k], lit = sb.lit === k, target = sb.target === k;
        const two = lang === "en" && head === "ten thousands";   /* one line fits in hi/gu */
        return (
          <g key={k}>
            <rect x={x + 4} y={0} width={SB.cw - 8} height={SB.headH} rx={12} fill={target ? tint(RB_AMBER, 0.55) : tint(C.panel, 0.25)} stroke={target ? RB_AMBER : C.rule} strokeWidth={target ? 3 : 1.5} />
            {two ? (
              <g>
                <text x={x + SB.cw / 2} y={25} textAnchor="middle" fontSize={T.micro} fontWeight={target ? 700 : 600} fill={C.ink}>ten</text>
                <text x={x + SB.cw / 2} y={52} textAnchor="middle" fontSize={T.micro} fontWeight={target ? 700 : 600} fill={C.ink}>thousands</text>
              </g>
            ) : (
              <text x={x + SB.cw / 2} y={40} textAnchor="middle" fontSize={T.micro} fontWeight={target ? 700 : 600} fill={C.ink}>{tx(head)}</text>
            )}
            <rect x={x + 4} y={SB.headH + 6} width={SB.cw - 8} height={bodyH} rx={14} fill="#FFFFFF" stroke={C.rule} strokeWidth={1.5} />
            {lit && <rect x={x + 4} y={SB.headH + 6} width={SB.cw - 8} height={bodyH} rx={14} fill={RB_AMBER} fillOpacity={0.14} stroke={RB_AMBER} strokeWidth={3} />}
            {/* the result row waits empty until the amount goes in */}
            {(sb.res[k] === undefined || sb.res[k] === null) && !(sb.lift && sb.lift.k === k) && !(sb.counters && sb.counters.k === k) && k < Math.max(startLen, resLen) && (
              <rect x={x + 18} y={SB.r3 + 8} width={SB.cw - 36} height={SB.r3H - 16} rx={12} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="9 8" />
            )}
            {sb.carry[k] ? <text className="rb-in" x={x + SB.cw / 2} y={SB.carryY} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={rbInkVerm}>{sb.carry[k]}</text> : null}
            {/* every digit that is to stay still carries a small ink pin (the last phase) */}
            {four && k < startLen && sb.target !== k && (
              <g pointerEvents="none" transform={`translate(${x + SB.cw / 2},${SB.headH + 16})`}>
                <rect x={-11} y={-6} width={22} height={7} rx={3} fill={C.ink} />
                <path d="M -6 1 L 6 1 L 3 10 L -3 10 Z" fill={C.ink} />
                <line x1={0} y1={10} x2={0} y2={24} stroke={C.ink} strokeWidth={2.5} strokeLinecap="round" />
              </g>
            )}
          </g>
        );
      })}

      {/* the number, the amount in its own column, the rule and the result */}
      <text textAnchor="middle" fontSize={T.display} fontWeight={700}>
        {startS.split("").map((ch, i) => <tspan key={i} x={sbColC(startLen - 1 - i)} y={SB.r1 + 72} fill={ch === "0" ? RB_ZERO : rbInkBlue}>{ch}</tspan>)}
      </text>
      <text x={Math.max(left - 44, 24)} y={SB.r2 + 52} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>+</text>
      {amtS && (
        <text className="rb-in" textAnchor="middle" fontSize={T.xl} fontWeight={700}>
          {amtS.split("").map((ch, i) => <tspan key={i} x={sbColC(amtS.length - 1 - i)} y={SB.r2 + 54} fill={ch === "0" ? RB_ZERO : rbInkBlue}>{ch}</tspan>)}
        </text>
      )}
      <rect x={Math.max(left - 70, 4)} y={SB.rule} width={SB.right - Math.max(left - 70, 4)} height={4} rx={2} fill={C.ink} />
      {resChars.length > 0 && (
        <text textAnchor="middle" fontSize={T.display} fontWeight={700}>
          {resChars.map((c) => <tspan key={c.k} x={sbColC(c.k)} y={SB.r3 + 72} fill={c.d === 0 ? RB_ZERO : sb.slip ? C.ink : rbInkGreen}>{c.d}</tspan>)}
        </text>
      )}
      {/* the digit that moves: it lifts, rolls on by one and drops back into its place */}
      {sb.lift && (
        <g pointerEvents="none">
          <rect x={sbColC(sb.lift.k) - 40} y={SB.r3 - 14} width={80} height={86} rx={16} fill="#FFFFFF" stroke={RB_AMBER} strokeWidth={4} filter="url(#fLift)" />
          <text x={sbColC(sb.lift.k)} y={SB.r3 + 50} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={sb.lift.d === 0 ? RB_ZERO : rbInkGreen}>{sb.lift.d}</text>
        </g>
      )}
      {/* ten ones handed to a column that holds one digit tie into a bundle, and the bundle is carried */}
      {sb.counters && (
        <g pointerEvents="none">
          <g filter="url(#fShadowSoft)">
            {Array.from({ length: 10 }).map((_, i) => (
              <Disc key={i} x={sbColC(sb.counters.k) - 50 + (i % 5) * 25} y={SB.r3 + 28 + Math.floor(i / 5) * 32} r={11} paint="gOne" flat />
            ))}
          </g>
          {sb.counters.tied && <rect className="rb-tie" x={sbColC(sb.counters.k) - 68} y={SB.r3 + 8} width={136} height={72} rx={22} fill={RB_VERM} fillOpacity={0.08} stroke={RB_VERM} strokeWidth={4} />}
        </g>
      )}

      {/* the six-digit number under the five-digit one: its thousands digit lifts and rolls on by one;
          its comma form stands at the right, so the lakh comma is seen too */}
      {cmp && (
        <g className="rb-in">
          <rect x={left + 4} y={386} width={SB.right - left - 8} height={3} rx={1.5} fill={C.rule} />
          <text textAnchor="middle" fontSize={T.display} fontWeight={700}>
            {cmpS.split("").map((ch, i) => (cmp.lift && cmpS.length - 1 - i === 3 ? null
              : <tspan key={i} x={sbColC(cmpS.length - 1 - i)} y={484} fill={ch === "0" ? RB_ZERO : cmp.v === RB_SIX ? rbInkBlue : rbInkGreen}>{ch}</tspan>))}
          </text>
          {cmp.lift && (
            <g pointerEvents="none">
              <rect x={sbColC(3) - 40} y={396} width={80} height={86} rx={16} fill="#FFFFFF" stroke={RB_AMBER} strokeWidth={4} filter="url(#fLift)" />
              <text x={sbColC(3)} y={460} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={cmp.v === RB_SIX ? rbInkBlue : rbInkGreen}>{cmpS[cmpS.length - 4]}</text>
            </g>
          )}
          <text x={1018} y={426} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={rbInkBlue}>{indian(RB_SIX)}</text>
          <text x={1018} y={462} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{"+ " + indian(1000)}</text>
          {cmp.v !== RB_SIX && <text x={1018} y={506} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={rbInkGreen}>{indian(cmp.v)}</text>}
        </g>
      )}

      {/* the amount keys: nothing and one (phase 3); ten, a hundred and a thousand (phase 4) */}
      {!cmp && amounts.map((a, i) => {
        const on = liveKey(a), x = keysX0 + i * (keyW + keyGap);
        return (
          <Key key={a} id={"add-" + a} label={tx("Add " + (RB_AMOUNT[a] || a))} x={x} y={SB.keysY} w={keyW} h={SB.keyH} C={C} primary={going === a || on} disabled={!on && going !== a}
            onClick={() => on && go(typed)}>
            <text y={13} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={on || going === a ? "#FFFFFF" : mix(C.ink, C.panel, 0.5)}>{"+ " + indian(a)}</text>
          </Key>
        );
      })}
      {liveAt >= 0 && <Invite x={keysX0 + liveAt * (keyW + keyGap) + keyW / 2} y={SB.keysY + SB.keyH / 2} r={70} C={C} />}
    </g>
  );
}

/* ── free play: the ring of circles, or the two mats with brackets anywhere ─────────────────── */
const RB_RING = [{ x: 400, y: 62 }, { x: 170, y: 400 }, { x: 630, y: 400 }, { x: 285, y: 231 }, { x: 400, y: 400 }, { x: 515, y: 231 }];
const RB_SIDES = [[0, 3, 1], [1, 4, 2], [2, 5, 0]];
const RB_SIDE_AT = [{ x: 180, y: 196 }, { x: 400, y: 494 }, { x: 620, y: 196 }];
const RB_TRAY_AT = (v: number) => ({ x: 830 + ((v - 1) % 2) * 120, y: 90 + Math.floor((v - 1) / 2) * 110 });
const RB_FREE = { kind: "group", cards: [2600, 7400, 18530], left: ["a", "b", "c"], right: ["c", "b", "a"], jawL: 0, jawR: 1 };

function RbFree({ api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const [mode, setMode] = useState("ring");
  const [ring, setRing] = useState<(number | null)[]>([null, null, null, null, null, null]);
  const [mats, setMats] = useState<any[]>(() => rbMatsFor(RB_FREE));
  const ringRef = useRef(ring); ringRef.current = ring;
  const matsRef = useRef(mats); matsRef.current = mats;
  const valOf = (id: string) => rbCard(RB_FREE, id);

  const place = (v: number, from: number, p: any) => {
    const cur = ringRef.current.slice();
    if (p) {
      let best = -1, bd = 84;
      RB_RING.forEach((c, i) => { const d = Math.hypot(p.x - c.x, p.y - c.y); if (d < bd) { bd = d; best = i; } });
      if (best < 0) { if (from >= 0) cur[from] = null; }
      else { const had = cur[best]; if (from >= 0) cur[from] = had === v ? v : had; cur[best] = v; }
    } else if (from >= 0) cur[from] = null;            /* a tap on a placed card sends it home */
    else { const e = cur.indexOf(null); if (e < 0) return; cur[e] = v; }
    ringRef.current = cur; setRing(cur); api.sfx.tick();
  };
  const drag = useDrag((pay: any, p: any, moved: boolean) => { if (pay.src === "ring") place(pay.v, pay.from, moved ? p : null); });

  const sides = RB_SIDES.map((sd) => sd.reduce((a, i) => a + (ring[i] || 0), 0));
  const full = ring.every((x) => x !== null), balanced = full && sides[0] === sides[1] && sides[1] === sides[2];
  const was = useRef(false);
  useEffect(() => { if (balanced && !was.current) api.sfx.win(); was.current = balanced; }, [balanced]);

  const setMat = (mi: number, fn: (m: any) => any) => setMats((ms) => ms.map((m, i) => (i === mi ? fn(m) : m)));
  const pick = (mi: number, id: string) => {
    const m = matsRef.current[mi];
    if (m.closed) { if (id === "p") setMat(mi, (x) => ({ ...x, closed: false, picked: null })); }
    else if (m.picked === null) setMat(mi, (x) => ({ ...x, picked: id }));
    else if (m.picked === id) setMat(mi, (x) => ({ ...x, picked: null }));
    else { const a = m.picked; setMat(mi, (x) => rbPairUp(x, a, id)); }
    api.sfx.tick();
  };
  /* in free play the sums are written straight away: whatever is swapped or bracketed, they agree */
  const worked = mats.map((m) => { const c = rbColumns(rbAddends(m, valOf)); return { ...m, sum: c.res.slice(), carry: c.car.map((x) => x || 0) }; });

  api.onEnter(null);
  api.share({ mode, ring: ring.slice(), sides, leftMat: rbAddends(mats[0], valOf), rightMat: rbAddends(mats[1], valOf), cards: RB_FREE.cards.slice() });

  const off = (v: number) => !ring.includes(v);
  const dragging = drag.drag && drag.drag.moved ? drag.drag.payload : null;
  const tile = (v: number, x: number, y: number, from: number) => {
    const pay = { src: "ring", v, from }, lifted = dragging && dragging.v === v;
    return (
      <g key={"t" + v} className="rb-grab c4-piece" {...control(`ring-${v}`, from >= 0 ? `Card ${v} in a circle` : `Card ${v}`)} {...drag.bind(pay)} {...drag.keys(pay)}>
        <rect x={x - 42} y={y - 42} width={84} height={84} rx={18} fill={lifted ? "transparent" : "#FFFFFF"} stroke={lifted ? C.rule : RB_BLUE} strokeWidth={3}
          strokeDasharray={lifted ? "8 7" : undefined} filter={lifted ? undefined : "url(#fShadowSoft)"} />
        {!lifted && <text x={x} y={y + 16} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={rbInkBlue}>{v}</text>}
      </g>
    );
  };

  return (
    <g>
      <style>{RB_CSS}</style>
      {mode === "ring" ? (
        <g>
          <path d={`M ${RB_RING[0].x} ${RB_RING[0].y} L ${RB_RING[1].x} ${RB_RING[1].y} L ${RB_RING[2].x} ${RB_RING[2].y} Z`} fill="none" stroke={C.rule} strokeWidth={6} strokeLinejoin="round" />
          {RB_RING.map((c, i) => <circle key={i} cx={c.x} cy={c.y} r={46} fill={tint(C.panel, 0.6)} stroke={C.rule} strokeWidth={3} strokeDasharray={ring[i] === null ? "9 8" : undefined} />)}
          {RB_SIDES.map((sd, k) => (
            <g key={k}>
              <rect x={RB_SIDE_AT[k].x - 46} y={RB_SIDE_AT[k].y - 26} width={92} height={52} rx={16} fill={balanced ? tint(RB_GREEN, 0.86) : "#FFFFFF"} stroke={balanced ? RB_GREEN : C.rule} strokeWidth={2} />
              <text x={RB_SIDE_AT[k].x} y={RB_SIDE_AT[k].y + 12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={balanced ? rbInkGreen : C.ink}>{sides[k]}</text>
            </g>
          ))}
          <rect x={770} y={36} width={240} height={350} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          {[1, 2, 3, 4, 5, 6].map((v) => (off(v) ? tile(v, RB_TRAY_AT(v).x, RB_TRAY_AT(v).y, -1) : null))}
          {ring.map((v, i) => (v !== null ? tile(v, RB_RING[i].x, RB_RING[i].y, i) : null))}
          {dragging && (
            <g pointerEvents="none" filter="url(#fLift)">
              <rect x={drag.drag.x - 42} y={drag.drag.y - 42} width={84} height={84} rx={18} fill="#FFFFFF" stroke={RB_BLUE} strokeWidth={3} />
              <text x={drag.drag.x} y={drag.drag.y + 16} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={rbInkBlue}>{dragging.v}</text>
            </g>
          )}
        </g>
      ) : (
        <g>
          <RbMat C={C} side="left" mx={0} my={0} rows={3} rowH={74} m={worked[0]} valOf={valOf} lit={null} live grouping onPick={(id: string) => pick(0, id)}
            onJaw={() => setMat(0, (m) => (m.jaw !== null ? { ...m, closed: true, picked: null } : m))} flyTo={null} tx={tx} />
          <RbMat C={C} side="right" mx={576} my={0} rows={3} rowH={74} m={worked[1]} valOf={valOf} lit={null} live grouping onPick={(id: string) => pick(1, id)}
            onJaw={() => setMat(1, (m) => (m.jaw !== null ? { ...m, closed: true, picked: null } : m))} flyTo={null} tx={tx} />
          <RbRail my={0} rows={3} rowH={74} tx={tx} />
          {[0, 1].map((mi) => (
            <Key key={mi} id={mi ? "swap-right" : "swap-left"} label={tx(mi ? "Swap the right mat" : "Swap the left mat")} x={(mi ? 576 : 0) + MG.w / 2 - 100} y={382} w={200} h={72} C={C}
              onClick={() => { setMat(mi, (m) => ({ ...m, order: m.order.slice().reverse(), closed: false, picked: null })); api.sfx.tick(); }}>
              <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("Swap")}</text>
            </Key>
          ))}
        </g>
      )}
      <Key id="free-mode" label={tx(mode === "ring" ? "Show the mats" : "Show the ring")} x={886} y={456} w={200} h={72} C={C}
        onClick={() => setMode((x) => (x === "ring" ? "mats" : "ring"))}>
        <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(mode === "ring" ? "Mats" : "Ring")}</text>
      </Key>
    </g>
  );
}

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────────── */
function Work(props: any) {
  if (props.stage === "free") return <RbFree api={props.api} lang={props.lang} tx={props.tx} />;
  return props.n <= 2 ? <RbMats {...props} /> : <RbStep {...props} />;
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ result, C, w, h, tx = (v: any) => v }: any) {
  const L = (result && result.last) || {};
  const v = leadNumber(L.value);
  if (v === null || v === undefined) return null;
  const sh = L.shared || {};
  const bg = <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />;
  if (L.kind === "step" && typeof sh.start === "number") {
    return (
      <g>
        {bg}
        <text x={w - 16} y={h / 2 - 8} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{indian(sh.start)}</text>
        <text x={w - 16} y={h / 2 + 30} textAnchor="end" fontSize={T.label} fontWeight={700}>
          {indian(v).split("").map((ch, i) => <tspan key={i} fill={ch === "," ? C.ink : ch === "0" ? RB_ZERO : rbInkGreen}>{ch}</tspan>)}
        </text>
      </g>
    );
  }
  if (L.kind === "blank") {
    return (
      <g>
        {bg}
        <rect x={w - 176} y={h / 2 - 30} width={160} height={60} rx={12} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} />
        <text x={w - 96} y={h / 2 + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={rbInkBlue}>{indian(v)}</text>
      </g>
    );
  }
  return (
    <g>
      {bg}
      <rect x={12} y={h / 2 - 22} width={92} height={44} rx={22} fill={tint(RB_GREEN, 0.86)} stroke={RB_GREEN} strokeWidth={2} />
      <text x={58} y={h / 2 + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={rbInkGreen}>{tx("Same")}</text>
      <text x={w - 16} y={h / 2 + 12} textAnchor="end" fontSize={T.label} fontWeight={700} fill={rbInkGreen}>{indian(v)}</text>
    </g>
  );
}

function AdditionRules(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null }} />
  );
}

export default AdditionRules;
