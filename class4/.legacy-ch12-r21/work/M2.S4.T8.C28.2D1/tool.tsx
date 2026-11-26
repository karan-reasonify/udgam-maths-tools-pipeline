/* ═══ M2.S4.T8.C28.2D1 · calendar_counter · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "calendar_counter";
const MEDIA_ID = "M2.S4.T8.C28.2D1";
const TOOL_NAME = "Calendar Counter";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A wall of twelve months and a year dial. How many days are in this year?"];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Months sorted, years run through the whole rule, both ends decided, and short forms written.";
/* said when the child opens Free play from the summary page. The plan's line also named the rack, the
   ruler and the date writer; free play opens exactly what this line says (PATTERNS §8). */
const FREE_LINE = "Free play. Turn the year dial and run the year through the gate. Or tap count, drag two holidays onto the wall, and set each end in or out.";

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, and the runtime looks each spoken or drawn line up in it.
   Fill it AFTER the English is final and reviewed (`node cli.mjs voice` lists every line still missing),
   then bake the voice. Empty = the tool runs in English only. */
const TR: any = {
  hi: {
    /* the tool, the phases, the whole-tool lines */
    "Calendar Counter": "कैलेंडर गिनती",
    "Days in the months and the year": "महीनों और वर्ष के दिन",
    "Leap years": "लीप वर्ष",
    "Counting days between dates": "तारीखों के बीच दिन गिनना",
    "Writing a date in short form": "तारीख को छोटे रूप में लिखना",
    "A wall of twelve months and a year dial. How many days are in this year?": "बारह महीनों की दीवार और एक वर्ष डायल। इस वर्ष में कितने दिन हैं?",
    "Months sorted, years run through the whole rule, both ends decided, and short forms written.": "महीने छाँटे, वर्ष पूरे नियम से परखे, दोनों छोर तय किए, और छोटे रूप लिखे।",
    "Free play. Turn the year dial and run the year through the gate. Or tap count, drag two holidays onto the wall, and set each end in or out.": "मुक्त खेल। वर्ष डायल घुमाओ और वर्ष को द्वार से गुज़ारो। या गिनती दबाओ, दो छुट्टियाँ दीवार पर खींचो, और हर छोर शामिल या बाहर करो।",
    /* phase 1 */
    "Each month has its own number of days. Sort the months onto their bars, then lay the year out in weeks.": "हर महीने के दिनों की संख्या अलग होती है। महीनों को उनकी पट्टियों पर छाँटो, फिर वर्ष को सप्ताहों में बिछाओ।",
    "A week is seven days.": "एक सप्ताह में सात दिन होते हैं।",
    "Count the weeks first, then the days that are left.": "पहले सप्ताह गिनो, फिर बचे हुए दिन।",
    "A year of 365 days is 52 weeks and 1 day. A leap year is 52 weeks and 2 days.": "365 दिन का वर्ष 52 सप्ताह और 1 दिन होता है। लीप वर्ष 52 सप्ताह और 2 दिन होता है।",
    "You learned: a year of 365 days is 52 weeks and 1 day.": "तुमने सीखा: 365 दिन का वर्ष 52 सप्ताह और 1 दिन है।",
    "How many days does June have, and how many does August have?": "जून में कितने दिन होते हैं, और अगस्त में कितने?",
    "Days in June and in August?": "जून और अगस्त में कितने दिन?",
    "Count each month's days on its card, a row of seven at a time.": "हर महीने के दिन उसके कार्ड पर गिनो, एक बार में सात की एक पंक्ति।",
    "June": "जून",
    "August": "अगस्त",
    "A year that is not a leap year has 365 days. How many whole weeks is that, and how many days are left over?": "जो वर्ष लीप वर्ष नहीं है, उसमें 365 दिन होते हैं। यह कितने पूरे सप्ताह हैं, और कितने दिन बचते हैं?",
    "365 days: weeks and days over?": "365 दिन: सप्ताह और बचे दिन?",
    "weeks": "सप्ताह",
    "days over": "बचे दिन",
    "Lay the weeks ruler out, and count the rows of seven.": "सप्ताह पट्टी बिछाओ, और सात की पंक्तियाँ गिनो।",
    "The first of March, two thousand twenty-six, is a Sunday. On which date is the third Saturday of March?": "एक मार्च, दो हज़ार छब्बीस, रविवार है। मार्च का तीसरा शनिवार किस तारीख को है?",
    "3rd Saturday of March 2026?": "मार्च 2026 का तीसरा शनिवार?",
    "Find the first Saturday, then go down one week at a time.": "पहला शनिवार ढूँढो, फिर हर बार एक सप्ताह नीचे जाओ।",
    /* phase 2 */
    "The leap year gate asks three questions in order. A century year ends in two noughts. A year divisible by four is a leap year, except a century year not divisible by four hundred.": "लीप वर्ष द्वार क्रम से तीन प्रश्न पूछता है। शताब्दी वर्ष के अंत में दो शून्य होते हैं। चार से विभाज्य वर्ष लीप वर्ष है, पर वह शताब्दी वर्ष नहीं जो चार सौ से विभाज्य न हो।",
    "Start with the first question: is the year divisible by four?": "पहले प्रश्न से शुरू करो: क्या वर्ष चार से विभाज्य है?",
    "Is it a century year, and if it is, is it divisible by four hundred?": "क्या यह शताब्दी वर्ष है, और यदि है, तो क्या यह चार सौ से विभाज्य है?",
    "So two thousand was a leap year, and nineteen hundred was not. A leap year has 366 days, with 29 in February.": "इसलिए दो हज़ार लीप वर्ष था, और उन्नीस सौ नहीं था। लीप वर्ष में 366 दिन होते हैं, फ़रवरी में 29।",
    "You learned: divisible by 4 is a leap year; a century year needs 400.": "तुमने सीखा: 4 से विभाज्य लीप वर्ष है; शताब्दी वर्ष 400 से विभाज्य हो।",
    "Which of these were leap years? Nineteen ninety-six, seventeen hundred, or sixteen hundred?": "इनमें से कौन से लीप वर्ष थे? उन्नीस सौ छियानवे, सत्रह सौ, या सोलह सौ?",
    "Which of them were leap years?": "इनमें से लीप वर्ष कौन से थे?",
    "Run each year down the gate, one box after another.": "हर वर्ष को द्वार में नीचे चलाओ, एक के बाद एक खाना।",
    "1996 only": "केवल 1996",
    "1996 and 1600": "1996 और 1600",
    "all three": "तीनों",
    "1996 and 1700": "1996 और 1700",
    "How many days does February have in two thousand twenty-eight? Use the gate to think it through.": "दो हज़ार अट्ठाईस में फ़रवरी में कितने दिन हैं? द्वार से सोचकर देखो।",
    "Days in February 2028?": "फ़रवरी 2028 में कितने दिन?",
    "Run the year through the gate first, then look at February.": "पहले वर्ष को द्वार से गुज़ारो, फिर फ़रवरी देखो।",
    "Was eighteen hundred a leap year?": "क्या अठारह सौ लीप वर्ष था?",
    "Was 1800 a leap year?": "क्या 1800 लीप वर्ष था?",
    "Eighteen hundred is a century year. Which question comes after that?": "अठारह सौ शताब्दी वर्ष है। उसके बाद कौन सा प्रश्न आता है?",
    "yes": "हाँ",
    "no": "नहीं",
    /* phase 3 */
    "Before you count, does the first day count? Does the last day count?": "गिनने से पहले: क्या पहला दिन गिना जाएगा? क्या आखिरी दिन गिना जाएगा?",
    "How many days are counted in the first month?": "पहले महीने में कितने दिन गिने गए?",
    "Try two dates in one month first, then come back to this count.": "पहले एक ही महीने की दो तारीखें आज़माओ, फिर इस गिनती पर लौटो।",
    "Decide whether each end counts before counting, then count month by month.": "गिनने से पहले तय करो कि हर छोर गिना जाएगा या नहीं, फिर हर महीना अलग से गिनो।",
    "You learned: decide whether each end counts, then count month by month.": "तुमने सीखा: हर छोर गिना जाए या नहीं, तय करो; फिर हर महीना गिनो।",
    "How many days are there between the eighteenth of September and the seventh of October? Do not count either date.": "अठारह सितंबर और सात अक्टूबर के बीच कितने दिन हैं? दोनों में से कोई तारीख मत गिनो।",
    "18 Sep to 7 Oct days between?": "दोनों तारीखों के बीच कितने दिन?",
    "The seventh of October is left out too. Where does your count stop?": "सात अक्टूबर भी छोड़ा जाता है। तुम्हारी गिनती कहाँ रुकती है?",
    "Now count the days from the twelfth of November to the third of December. Both dates count.": "अब बारह नवंबर से तीन दिसंबर तक के दिन गिनो। दोनों तारीखें गिनी जाएँगी।",
    "12 Nov to 3 Dec both counted?": "दोनों तारीखें गिनकर, कितने दिन?",
    "The twelfth of November counts. Start the count on it.": "बारह नवंबर गिना जाता है। गिनती उसी से शुरू करो।",
    "A tournament starts on the twenty-second of March and runs for 16 days. The first day is day one. On which date is its last day?": "एक प्रतियोगिता बाईस मार्च को शुरू होती है और 16 दिन चलती है। पहला दिन, दिन एक है। उसका आखिरी दिन किस तारीख को है?",
    "Last day: which date?": "आखिरी दिन: कौन सी तारीख?",
    "If the 22nd is day one, what is day two? Keep counting on.": "अगर 22 तारीख दिन एक है, तो दिन दो कौन सा है? आगे गिनते रहो।",
    "Set the first day and the last day first.": "पहले, पहला दिन और आखिरी दिन तय करो।",
    "Decide whether the first day counts.": "तय करो कि पहला दिन गिना जाएगा या नहीं।",
    /* phase 4 */
    "A short form writes a date in figures only. The day goes first, then the month, then the year.": "छोटा रूप तारीख को केवल अंकों में लिखता है। पहले दिन, फिर महीना, फिर वर्ष।",
    "How many digits do the day and the month each take?": "दिन और महीना, हर एक कितने अंक लेता है?",
    "Try the twelfth of November first, where both already have two digits.": "पहले बारह नवंबर आज़माओ, जहाँ दोनों में पहले से दो अंक हैं।",
    "A short form is the day, the month and the year in figures, day first. The day and the month take two digits each.": "छोटा रूप अंकों में दिन, महीना और वर्ष है, पहले दिन। दिन और महीना दो दो अंक लेते हैं।",
    "You learned: day, month, year in figures, two digits for day and month.": "तुमने सीखा: दिन, महीना, वर्ष अंकों में; दिन और महीने के दो अंक।",
    "Write the third of January, two thousand twenty-seven, in short form.": "तीन जनवरी, दो हज़ार सत्ताईस, को छोटे रूप में लिखो।",
    "3 January 2027 in short form?": "3 जनवरी 2027 छोटे रूप में?",
    "Which comes first in the short form, the day or the month?": "छोटे रूप में पहले क्या आता है, दिन या महीना?",
    "day": "दिन",
    "month": "महीना",
    "year": "वर्ष",
    "Now the thirtieth of April, two thousand twenty-six, the same way.": "अब तीस अप्रैल, दो हज़ार छब्बीस, इसी तरह।",
    "30 April 2026 in short form?": "30 अप्रैल 2026 छोटे रूप में?",
    "Look at the month's two places. Is each one filled?": "महीने के दोनों स्थान देखो। क्या हर एक भरा है?",
    "And the ninth of October, two thousand twenty-five?": "और नौ अक्टूबर, दो हज़ार पच्चीस?",
    "9 October 2025 in short form?": "9 अक्टूबर 2025 छोटे रूप में?",
    "Which place of the day is still empty?": "दिन का कौन सा स्थान अभी खाली है?",
    /* the words the picture draws */
    "January": "जनवरी", "February": "फ़रवरी", "March": "मार्च", "April": "अप्रैल", "May": "मई",
    "July": "जुलाई", "September": "सितंबर", "October": "अक्टूबर", "November": "नवंबर", "December": "दिसंबर",
    "Jan": "जन", "Feb": "फ़र", "Mar": "मार्च", "Apr": "अप्रै", "Jun": "जून", "Jul": "जुला",
    "Aug": "अग", "Sep": "सित", "Oct": "अक्टू", "Nov": "नव", "Dec": "दिस",
    "divisible by 4?": "4 से विभाज्य?", "century year?": "शताब्दी वर्ष?", "divisible by 400?": "400 से विभाज्य?",
    "counts": "गिनो", "left out": "छोड़ो", "first day": "पहला दिन", "last day": "आखिरी दिन",
    "sorted": "छाँटे", "years run": "परखे वर्ष", "ends set": "तय छोर", "places filled": "भरे स्थान",
    "31 days": "31 दिन", "30 days": "30 दिन", "28 or 29 days": "28 या 29 दिन",
    "Republic": "गणतंत्र", "Independence": "स्वतंत्रता", "Teacher's": "शिक्षक", "Children's": "बाल", "Christmas": "क्रिसमस", "Day": "दिवस",
    "1st": "पहला", "2nd": "दूसरा", "3rd": "तीसरा", "4th": "चौथा", "5th": "पाँचवाँ",
    "gate": "द्वार", "count": "गिनती",
    "days": "दिन", "in all": "कुल", "last day:": "आखिरी दिन:",
    "leap": "लीप", "not leap": "लीप नहीं", "leap year": "लीप वर्ष", "not a leap year": "लीप वर्ष नहीं",
    "3rd Saturday": "तीसरा शनिवार", "days counted": "गिने दिन", "and": "और", "in": "शामिल", "out": "बाहर",
    "dots": "बिंदु", "slashes": "तिरछी रेखा", "dashes": "आड़ी रेखा",
  },
  gu: {
    "Calendar Counter": "કેલેન્ડર ગણતરી",
    "Days in the months and the year": "મહિનાઓ અને વર્ષના દિવસ",
    "Leap years": "લીપ વર્ષ",
    "Counting days between dates": "તારીખો વચ્ચેના દિવસ ગણવા",
    "Writing a date in short form": "તારીખ ટૂંકા રૂપમાં લખવી",
    "A wall of twelve months and a year dial. How many days are in this year?": "બાર મહિનાઓની દીવાલ અને એક વર્ષ ડાયલ. આ વર્ષમાં કેટલા દિવસ છે?",
    "Months sorted, years run through the whole rule, both ends decided, and short forms written.": "મહિના ગોઠવ્યા, વર્ષો આખા નિયમથી તપાસ્યાં, બંને છેડા નક્કી કર્યા, અને ટૂંકાં રૂપ લખ્યાં.",
    "Free play. Turn the year dial and run the year through the gate. Or tap count, drag two holidays onto the wall, and set each end in or out.": "મુક્ત રમત. વર્ષ ડાયલ ફેરવો અને વર્ષને દ્વારમાંથી પસાર કરો. અથવા ગણતરી દબાવો, બે રજાઓ દીવાલ પર ખેંચો, અને દરેક છેડો સામેલ કે બહાર કરો.",
    "Each month has its own number of days. Sort the months onto their bars, then lay the year out in weeks.": "દરેક મહિનાના દિવસોની સંખ્યા જુદી હોય છે. મહિનાઓને તેમની પટ્ટીઓ પર ગોઠવો, પછી વર્ષને અઠવાડિયામાં પાથરો.",
    "A week is seven days.": "એક અઠવાડિયામાં સાત દિવસ હોય છે.",
    "Count the weeks first, then the days that are left.": "પહેલાં અઠવાડિયા ગણો, પછી બાકી રહેલા દિવસ.",
    "A year of 365 days is 52 weeks and 1 day. A leap year is 52 weeks and 2 days.": "365 દિવસનું વર્ષ 52 અઠવાડિયા અને 1 દિવસ હોય છે. લીપ વર્ષ 52 અઠવાડિયા અને 2 દિવસ હોય છે.",
    "You learned: a year of 365 days is 52 weeks and 1 day.": "તમે શીખ્યા: 365 દિવસનું વર્ષ 52 અઠવાડિયા અને 1 દિવસ છે.",
    "How many days does June have, and how many does August have?": "જૂનમાં કેટલા દિવસ હોય છે, અને ઑગસ્ટમાં કેટલા?",
    "Days in June and in August?": "જૂન અને ઑગસ્ટમાં કેટલા દિવસ?",
    "Count each month's days on its card, a row of seven at a time.": "દરેક મહિનાના દિવસ તેના કાર્ડ પર ગણો, એક વારમાં સાતની એક હાર.",
    "June": "જૂન",
    "August": "ઑગસ્ટ",
    "A year that is not a leap year has 365 days. How many whole weeks is that, and how many days are left over?": "જે વર્ષ લીપ વર્ષ નથી, તેમાં 365 દિવસ હોય છે. તે કેટલા આખા અઠવાડિયા છે, અને કેટલા દિવસ વધે છે?",
    "365 days: weeks and days over?": "365 દિવસ: અઠવાડિયા અને વધેલા દિવસ?",
    "weeks": "અઠવાડિયા",
    "days over": "વધેલા દિવસ",
    "Lay the weeks ruler out, and count the rows of seven.": "અઠવાડિયાની પટ્ટી પાથરો, અને સાતની હાર ગણો.",
    "The first of March, two thousand twenty-six, is a Sunday. On which date is the third Saturday of March?": "એક માર્ચ, બે હજાર છવ્વીસ, રવિવાર છે. માર્ચનો ત્રીજો શનિવાર કઈ તારીખે છે?",
    "3rd Saturday of March 2026?": "માર્ચ 2026નો ત્રીજો શનિવાર?",
    "Find the first Saturday, then go down one week at a time.": "પહેલો શનિવાર શોધો, પછી દર વખતે એક અઠવાડિયું નીચે જાઓ.",
    "The leap year gate asks three questions in order. A century year ends in two noughts. A year divisible by four is a leap year, except a century year not divisible by four hundred.": "લીપ વર્ષ દ્વાર ક્રમમાં ત્રણ પ્રશ્નો પૂછે છે. સદીના વર્ષના અંતે બે શૂન્ય હોય છે. ચારથી વિભાજ્ય વર્ષ લીપ વર્ષ છે, પણ ચારસોથી વિભાજ્ય ન હોય તેવું સદીનું વર્ષ નહીં.",
    "Start with the first question: is the year divisible by four?": "પહેલા પ્રશ્નથી શરૂ કરો: શું વર્ષ ચારથી વિભાજ્ય છે?",
    "Is it a century year, and if it is, is it divisible by four hundred?": "શું તે સદીનું વર્ષ છે, અને જો હોય, તો શું તે ચારસોથી વિભાજ્ય છે?",
    "So two thousand was a leap year, and nineteen hundred was not. A leap year has 366 days, with 29 in February.": "તેથી બે હજાર લીપ વર્ષ હતું, અને ઓગણીસસો નહોતું. લીપ વર્ષમાં 366 દિવસ હોય છે, ફેબ્રુઆરીમાં 29.",
    "You learned: divisible by 4 is a leap year; a century year needs 400.": "તમે શીખ્યા: 4થી વિભાજ્ય લીપ વર્ષ છે; સદીનું વર્ષ 400થી વિભાજ્ય હોય.",
    "Which of these were leap years? Nineteen ninety-six, seventeen hundred, or sixteen hundred?": "આમાંથી કયાં લીપ વર્ષ હતાં? ઓગણીસસો છન્નુ, સત્તરસો, કે સોળસો?",
    "Which of them were leap years?": "આમાંથી લીપ વર્ષ કયાં હતાં?",
    "Run each year down the gate, one box after another.": "દરેક વર્ષને દ્વારમાં નીચે ચલાવો, એક પછી એક ખાનું.",
    "1996 only": "ફક્ત 1996",
    "1996 and 1600": "1996 અને 1600",
    "all three": "ત્રણેય",
    "1996 and 1700": "1996 અને 1700",
    "How many days does February have in two thousand twenty-eight? Use the gate to think it through.": "બે હજાર અઠ્ઠાવીસમાં ફેબ્રુઆરીમાં કેટલા દિવસ છે? દ્વારથી વિચારીને જુઓ.",
    "Days in February 2028?": "ફેબ્રુઆરી 2028માં કેટલા દિવસ?",
    "Run the year through the gate first, then look at February.": "પહેલાં વર્ષને દ્વારમાંથી પસાર કરો, પછી ફેબ્રુઆરી જુઓ.",
    "Was eighteen hundred a leap year?": "શું અઢારસો લીપ વર્ષ હતું?",
    "Was 1800 a leap year?": "શું 1800 લીપ વર્ષ હતું?",
    "Eighteen hundred is a century year. Which question comes after that?": "અઢારસો સદીનું વર્ષ છે. તે પછી કયો પ્રશ્ન આવે છે?",
    "yes": "હા",
    "no": "ના",
    "Before you count, does the first day count? Does the last day count?": "ગણતાં પહેલાં: શું પહેલો દિવસ ગણાશે? શું છેલ્લો દિવસ ગણાશે?",
    "How many days are counted in the first month?": "પહેલા મહિનામાં કેટલા દિવસ ગણાયા?",
    "Try two dates in one month first, then come back to this count.": "પહેલાં એક જ મહિનાની બે તારીખો અજમાવો, પછી આ ગણતરી પર પાછા આવો.",
    "Decide whether each end counts before counting, then count month by month.": "ગણતાં પહેલાં નક્કી કરો કે દરેક છેડો ગણાશે કે નહીં, પછી મહિને મહિને ગણો.",
    "You learned: decide whether each end counts, then count month by month.": "તમે શીખ્યા: દરેક છેડો ગણાય કે નહીં નક્કી કરો; પછી મહિને મહિને ગણો.",
    "How many days are there between the eighteenth of September and the seventh of October? Do not count either date.": "અઢાર સપ્ટેમ્બર અને સાત ઑક્ટોબર વચ્ચે કેટલા દિવસ છે? બેમાંથી એકેય તારીખ ન ગણો.",
    "18 Sep to 7 Oct days between?": "બંને તારીખ વચ્ચે કેટલા દિવસ?",
    "The seventh of October is left out too. Where does your count stop?": "સાત ઑક્ટોબર પણ છોડાય છે. તમારી ગણતરી ક્યાં અટકે છે?",
    "Now count the days from the twelfth of November to the third of December. Both dates count.": "હવે બાર નવેમ્બરથી ત્રણ ડિસેમ્બર સુધીના દિવસ ગણો. બંને તારીખો ગણાશે.",
    "12 Nov to 3 Dec both counted?": "બંને તારીખ ગણીને, કેટલા દિવસ?",
    "The twelfth of November counts. Start the count on it.": "બાર નવેમ્બર ગણાય છે. ગણતરી તેનાથી જ શરૂ કરો.",
    "A tournament starts on the twenty-second of March and runs for 16 days. The first day is day one. On which date is its last day?": "એક સ્પર્ધા બાવીસ માર્ચે શરૂ થાય છે અને 16 દિવસ ચાલે છે. પહેલો દિવસ, દિવસ એક છે. તેનો છેલ્લો દિવસ કઈ તારીખે છે?",
    "Last day: which date?": "છેલ્લો દિવસ: કઈ તારીખ?",
    "If the 22nd is day one, what is day two? Keep counting on.": "જો 22 તારીખ દિવસ એક છે, તો દિવસ બે કયો છે? આગળ ગણતા રહો.",
    "Set the first day and the last day first.": "પહેલાં, પહેલો દિવસ અને છેલ્લો દિવસ નક્કી કરો.",
    "Decide whether the first day counts.": "નક્કી કરો કે પહેલો દિવસ ગણાશે કે નહીં.",
    "A short form writes a date in figures only. The day goes first, then the month, then the year.": "ટૂંકું રૂપ તારીખને ફક્ત આંકડામાં લખે છે. પહેલાં દિવસ, પછી મહિનો, પછી વર્ષ.",
    "How many digits do the day and the month each take?": "દિવસ અને મહિનો, દરેક કેટલા અંક લે છે?",
    "Try the twelfth of November first, where both already have two digits.": "પહેલાં બાર નવેમ્બર અજમાવો, જ્યાં બંનેમાં પહેલેથી બે અંક છે.",
    "A short form is the day, the month and the year in figures, day first. The day and the month take two digits each.": "ટૂંકું રૂપ આંકડામાં દિવસ, મહિનો અને વર્ષ છે, પહેલાં દિવસ. દિવસ અને મહિનો બબ્બે અંક લે છે.",
    "You learned: day, month, year in figures, two digits for day and month.": "તમે શીખ્યા: દિવસ, મહિનો, વર્ષ આંકડામાં; દિવસ અને મહિનાના બે અંક.",
    "Write the third of January, two thousand twenty-seven, in short form.": "ત્રણ જાન્યુઆરી, બે હજાર સત્તાવીસ, ટૂંકા રૂપમાં લખો.",
    "3 January 2027 in short form?": "આ તારીખ ટૂંકા રૂપમાં?",
    "Which comes first in the short form, the day or the month?": "ટૂંકા રૂપમાં પહેલાં શું આવે છે, દિવસ કે મહિનો?",
    "day": "દિવસ",
    "month": "મહિનો",
    "year": "વર્ષ",
    "Now the thirtieth of April, two thousand twenty-six, the same way.": "હવે ત્રીસ એપ્રિલ, બે હજાર છવ્વીસ, એ જ રીતે.",
    "30 April 2026 in short form?": "30 એપ્રિલ 2026 ટૂંકા રૂપમાં?",
    "Look at the month's two places. Is each one filled?": "મહિનાનાં બંને સ્થાન જુઓ. શું દરેક ભરેલું છે?",
    "And the ninth of October, two thousand twenty-five?": "અને નવ ઑક્ટોબર, બે હજાર પચ્ચીસ?",
    "9 October 2025 in short form?": "9 ઑક્ટોબર 2025 ટૂંકા રૂપમાં?",
    "Which place of the day is still empty?": "દિવસનું કયું સ્થાન હજી ખાલી છે?",
    "January": "જાન્યુઆરી", "February": "ફેબ્રુઆરી", "March": "માર્ચ", "April": "એપ્રિલ", "May": "મે",
    "July": "જુલાઈ", "September": "સપ્ટેમ્બર", "October": "ઑક્ટોબર", "November": "નવેમ્બર", "December": "ડિસેમ્બર",
    "Jan": "જાન્યુ", "Feb": "ફેબ્રુ", "Mar": "માર્ચ", "Apr": "એપ્રિ", "Jun": "જૂન", "Jul": "જુલા",
    "Aug": "ઑગ", "Sep": "સપ્ટે", "Oct": "ઑક્ટો", "Nov": "નવે", "Dec": "ડિસે",
    "divisible by 4?": "4થી વિભાજ્ય?", "century year?": "સદીનું વર્ષ?", "divisible by 400?": "400થી વિભાજ્ય?",
    "counts": "ગણો", "left out": "છોડો", "first day": "પહેલો દિવસ", "last day": "છેલ્લો દિવસ",
    "sorted": "ગોઠવ્યા", "years run": "તપાસેલાં વર્ષ", "ends set": "નક્કી છેડા", "places filled": "ભરેલાં સ્થાન",
    "31 days": "31 દિવસ", "30 days": "30 દિવસ", "28 or 29 days": "28 કે 29 દિવસ",
    "Republic": "પ્રજાસત્તાક", "Independence": "સ્વતંત્રતા", "Teacher's": "શિક્ષક", "Children's": "બાળ", "Christmas": "નાતાલ", "Day": "દિન",
    "1st": "પહેલો", "2nd": "બીજો", "3rd": "ત્રીજો", "4th": "ચોથો", "5th": "પાંચમો",
    "gate": "દ્વાર", "count": "ગણતરી",
    "days": "દિવસ", "in all": "કુલ", "last day:": "છેલ્લો દિવસ:",
    "leap": "લીપ", "not leap": "લીપ નહીં", "leap year": "લીપ વર્ષ", "not a leap year": "લીપ વર્ષ નથી",
    "3rd Saturday": "ત્રીજો શનિવાર", "days counted": "ગણેલા દિવસ", "and": "અને", "in": "સામેલ", "out": "બહાર",
    "dots": "ટપકાં", "slashes": "ત્રાંસી રેખા", "dashes": "આડી રેખા",
  },
};

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   demo?   { ... } when the phase opens on the child's one physical act (see api.demoDone)
   items   the authored fallback: three a phase, the third tests whether the phase landed.
           qid   the plan's question id (<conceptId>:ML<n> or <conceptId>:<q_no>); null for an item you author
           kind  your name for the item type (the Work, judge and oracle switch on it)
           say   the spoken question; ask = the short prompt above the slot (<= 3 lines of ~15 chars)
           answer what the slot or the working area must produce; miss = rung 1, never the answer
           choices? [{ id, label }] for a word answer; pad?: "enter" when it is made on the working area
           parts?  [{ label, unit? }, …] with answer [a, b]: two boxes in the slot (quotient · remainder;
                   label at most 10 characters, e.g. { label: "each bowl", unit: "mL" }); typed reads "16|1".
                   A fraction: parts: SLOT_FRACTION, answer [3, 4] (drawn stacked). A mixed number or a
                   tidied answer: parts: SLOT_MIXED, answer [1, 2, 3] · [5, null, null] · [null, 7, 10]
                   (null = that box stays empty; the slot never says which kind the answer is)
                   A decimal: answer "0.09", a string in its written form (so "0.30" is not "0.3" and ".3"
                   is not "0.3"), with pointKey: true in the tool object below (the pad's point key) */
/* a date in short form: three boxes, day first (the separators are the date writer's, never typed) */
const CC_DATE_PARTS = [{ label: "day" }, { label: "month" }, { label: "year" }];

const PHASES = [
  {
    n: 1,
    concept: "Days in the months and the year",
    conceptId: "M2.S4.T8.C28", objectiveIds: ["O13"],
    /* the plan's teach line named "thirty days" (question 1's answer) and restated ML1; kept to its idea */
    says: ["Each month has its own number of days. Sort the months onto their bars, then lay the year out in weeks."],
    /* tries, as the plan writes it: first rung, the item's miss; second, the days left after the full weeks;
       third, a quarter of the year first. Rewritten as lines the voice can say to the child. */
    ladder: ["A week is seven days.", "Count the weeks first, then the days that are left."],
    closing: "A year of 365 days is 52 weeks and 1 day. A leap year is 52 weeks and 2 days.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: a year of 365 days is 52 weeks and 1 day.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "June and August slide onto their bars beside July with their day counts written; the weeks ruler lays 365 days in four blocks of 13 weeks with 1 yellow day over; March's Saturdays are ticked 1st, 2nd, 3rd down to 21 March.",
    items: [
      /* practice 1: answer in the plan = June has 30 days and August has 31 (asked first: the sort comes before the year) */
      { qid: "M2.S4.T8.C28:1", kind: "sort", months: [5, 7], parts: [{ label: "June" }, { label: "August" }],
        answer: [30, 31], near: "30|30", winMs: 3000,
        say: "How many days does June have, and how many does August have?", ask: "Days in June and in August?",
        miss: "Count each month's days on its card, a row of seven at a time." },
      /* learn ML1: answer in the plan = Fifty-two weeks and one day */
      { qid: "M2.S4.T8.C28:ML1", kind: "weeks", days: 365, parts: [{ label: "weeks" }, { label: "days over" }],
        answer: [52, 1], near: "52|0", winMs: 3200,
        say: "A year that is not a leap year has 365 days. How many whole weeks is that, and how many days are left over?", ask: "365 days: weeks and days over?",
        miss: "Lay the weeks ruler out, and count the rows of seven." },
      /* practice 4: answer in the plan = 21 March 2026. The first Saturday is 7 March, and two more weeks bring it to 14 March and then 21 March */
      { qid: "M2.S4.T8.C28:4", kind: "weekday", month: 2, weekday: 6, nth: 3, answer: 21, near: 14, winMs: 3000,
        say: "The first of March, two thousand twenty-six, is a Sunday. On which date is the third Saturday of March?", ask: "3rd Saturday of March 2026?",
        miss: "Find the first Saturday, then go down one week at a time." },
    ],
  },
  {
    n: 2,
    concept: "Leap years",
    conceptId: "M2.S4.T8.C29", objectiveIds: ["O13"],
    /* the plan's teach asked the gate's questions word for word, which the second rung then repeats; this one
       names the gate and says what a century year is before any question uses the word */
    says: ["The leap year gate asks three questions in order. A century year ends in two noughts. A year divisible by four is a leap year, except a century year not divisible by four hundred."],
    /* tries, as the plan writes it: first rung, the item's miss; then the first question; then the century
       question and four hundred. Rewritten as lines the voice can say to the child. */
    ladder: ["Start with the first question: is the year divisible by four?", "Is it a century year, and if it is, is it divisible by four hundred?"],
    closing: "So two thousand was a leap year, and nineteen hundred was not. A leap year has 366 days, with 29 in February.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: divisible by 4 is a leap year; a century year needs 400.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The gate takes the year through its questions in order and the path it takes lights: 1700 stops at four hundred and February stays at 28, 2028 passes and February grows a yellow 29th with the year bar at 366, 1800 stops at four hundred.",
    items: [
      /* learn ML2: answer in the plan = 1996 and 1600 were leap years, and 1700 was not */
      { qid: "M2.S4.T8.C29:ML2", kind: "leapset", years: [1996, 1700, 1600],
        choices: [{ id: "1996 only", label: "1996 only" }, { id: "1996 and 1600", label: "1996 and 1600" }, { id: "all three", label: "all three" }, { id: "1996 and 1700", label: "1996 and 1700" }],
        answer: "1996 and 1600", near: "all three", winMs: 3200,
        say: "Which of these were leap years? Nineteen ninety-six, seventeen hundred, or sixteen hundred?", ask: "Which of them were leap years?",
        miss: "Run each year down the gate, one box after another." },
      /* practice 2: answer in the plan = 29 days, because 2028 is divisible by four and is not a century year, so it is a leap year */
      { qid: "M2.S4.T8.C29:2", kind: "febdays", years: [2028], answer: 29, near: 28, winMs: 3000,
        say: "How many days does February have in two thousand twenty-eight? Use the gate to think it through.", ask: "Days in February 2028?",
        miss: "Run the year through the gate first, then look at February." },
      /* practice 5: answer in the plan = No. 1800 is divisible by four, but it is a century year not divisible by four hundred */
      { qid: "M2.S4.T8.C29:5", kind: "leapq", years: [1800], choices: [{ id: "yes", label: "yes" }, { id: "no", label: "no" }],
        answer: "no", near: "yes", winMs: 3000,
        say: "Was eighteen hundred a leap year?", ask: "Was 1800 a leap year?",
        miss: "Eighteen hundred is a century year. Which question comes after that?" },
    ],
  },
  {
    n: 3,
    concept: "Counting days between dates",
    conceptId: "M2.S4.T8.C30", objectiveIds: ["O14"],
    says: ["Before you count, does the first day count? Does the last day count?"],
    /* tries, as the plan writes it: first rung, the item's miss; second, the days counted in the first month;
       third, two dates in one month first. Rewritten as lines the voice can say to the child. */
    ladder: ["How many days are counted in the first month?", "Try two dates in one month first, then come back to this count."],
    closing: "Decide whether each end counts before counting, then count month by month.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: decide whether each end counts, then count month by month.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The end switches are set as the question says, then the counted days fill in green month by month and a day left out stays outlined; the counter writes each month's part and the total (12 and 6, 18; 19 and 3, 22; 10 and 6 to 6 April).",
    items: [
      /* learn ML3: answer in the plan = 18 days */
      { qid: "M2.S4.T8.C30:ML3", kind: "between", from: [8, 18], to: [9, 7], firstIn: false, lastIn: false, answer: 18, near: 19, winMs: 3400,
        say: "How many days are there between the eighteenth of September and the seventh of October? Do not count either date.", ask: "18 Sep to 7 Oct days between?",
        miss: "The seventh of October is left out too. Where does your count stop?" },
      /* practice 6: answer in the plan = 22 days: 19 days from 12 to 30 November, and 3 days from 1 to 3 December */
      { qid: "M2.S4.T8.C30:6", kind: "between", from: [10, 12], to: [11, 3], firstIn: true, lastIn: true, answer: 22, near: 21, winMs: 3400,
        say: "Now count the days from the twelfth of November to the third of December. Both dates count.", ask: "12 Nov to 3 Dec both counted?",
        miss: "The twelfth of November counts. Start the count on it." },
      /* practice 7 (unused: a fourth question; it asks what ML3 asks, neither end counted, so the phase keeps
         the three different end decisions): answer in the plan = 17 days */
      /* practice 8: answer in the plan = Its last day is 6 April: 10 days from 22 to 31 March and 6 days in April. The plan's
         second part (play from 9:55 a.m. to 1:35 p.m.) is elapsed time, not the calendar, and is left out. */
      { qid: "M2.S4.T8.C30:8", kind: "lastday", from: [2, 22], length: 16, firstIn: true, lastIn: true, answer: 6, near: 7, winMs: 3400,
        say: "A tournament starts on the twenty-second of March and runs for 16 days. The first day is day one. On which date is its last day?", ask: "Last day: which date?",
        miss: "If the 22nd is day one, what is day two? Keep counting on." },
    ],
  },
  {
    n: 4,
    concept: "Writing a date in short form",
    conceptId: "M2.S4.T8.C31", objectiveIds: ["O14"],
    /* the plan's teach asked "how many digits", which its own second rung asks again */
    says: ["A short form writes a date in figures only. The day goes first, then the month, then the year."],
    /* tries, as the plan writes it: first rung, the item's miss; second, the digits of the day and the month;
       third, a date whose day and month already have two digits. Rewritten as lines the voice can say. */
    ladder: ["How many digits do the day and the month each take?", "Try the twelfth of November first, where both already have two digits."],
    closing: "A short form is the day, the month and the year in figures, day first. The day and the month take two digits each.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: day, month, year in figures, two digits for day and month.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The date writer reads the child's digits back through its day, month and year places (month first lights 1 March on the month strip; a dropped nought leaves an empty place lit), then sets the date day first with every place filled and shows it with dots, slashes and dashes.",
    items: [
      /* learn ML4: answer in the plan = 03.01.2027, which can also be written 03/01/2027 or 03-01-2027 */
      { qid: "M2.S4.T8.C31:ML4", kind: "short", date: [3, 1, 2027], parts: CC_DATE_PARTS, answer: ["03", "01", "2027"], near: "01|03|2027", winMs: 3600,
        say: "Write the third of January, two thousand twenty-seven, in short form.", ask: "3 January 2027 in short form?",
        miss: "Which comes first in the short form, the day or the month?" },
      /* practice 3: answer in the plan = 30.04.2026, or 30/04/2026 or 30-04-2026 */
      { qid: "M2.S4.T8.C31:3", kind: "short", date: [30, 4, 2026], parts: CC_DATE_PARTS, answer: ["30", "04", "2026"], near: "30|4|2026", winMs: 3600,
        say: "Now the thirtieth of April, two thousand twenty-six, the same way.", ask: "30 April 2026 in short form?",
        miss: "Look at the month's two places. Is each one filled?" },
      /* authored: the plan has only two questions for this concept, so the third is the textbook's own example
         (p. 150: 09.10.2025), which tests the nought in the day as ML4 and practice 3 test it in the month */
      { qid: null, kind: "short", date: [9, 10, 2025], parts: CC_DATE_PARTS, answer: ["09", "10", "2025"], near: "9|10|2025", winMs: 3600,
        say: "And the ninth of October, two thousand twenty-five?", ask: "9 October 2025 in short form?",
        miss: "Which place of the day is still empty?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
/* the chapter's calendar colours (the plan's palette): olive for a day tile, a month on its bar and a
   picked day; yellow outlined in near-black for the days over the whole weeks and 29 February; green for
   the days counted between two dates. Near-black for every rim, flag pole and outline. */
const CC_OLIVE = "#999933";
const CC_YELLOW = "#F0E442";
const CC_GREEN = CONTENT.one;
const CC_INK = CONTENT.line;
const CC_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const CC_MON3 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const CC_WD = ["S", "M", "T", "W", "T", "F", "S"];
/* the weekday row in Hindi and Gujarati: S and T stand for two days each, so the row is looked up by
   column, not through TR (रवि सोम मंगल बुध गुरु शुक्र शनि / રવિ સોમ મંગળ બુધ ગુરુ શુક્ર શનિ, shortened) */
const CC_WD_LANG: any = { hi: ["र", "सो", "मं", "बु", "गु", "शु", "श"], gu: ["ર", "સો", "મં", "બુ", "ગુ", "શુ", "શ"] };
const CC_GATE = ["divisible by 4?", "century year?", "divisible by 400?"];
/* three bars, each with two rows of chips (up to six a row), so any sort a child makes stays readable */
const CC_BINS = [{ id: "31", label: "31 days", y: 0, h: 128 }, { id: "30", label: "30 days", y: 144, h: 128 },
  { id: "feb", label: "28 or 29 days", y: 288, h: 128 }];
const CC_HOLIDAYS = [
  { id: "republic", name: ["Republic", "Day"], m: 0, d: 26 },
  { id: "independence", name: ["Independence", "Day"], m: 7, d: 15 },
  { id: "teachers", name: ["Teacher's", "Day"], m: 8, d: 5 },
  { id: "children", name: ["Children's", "Day"], m: 10, d: 14 },
  { id: "christmas", name: ["Christmas", "Day"], m: 11, d: 25 },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  startYear: 2026, weekBlocks: 4, weeksPerBlock: 13, yearDays: 365, gate: CC_GATE,
  bars: { "31 days": CC_MON3.filter((_, m) => [0, 2, 4, 6, 7, 9, 11].includes(m)), "30 days": ["Apr", "Jun", "Sep", "Nov"], "28 or 29 days": ["Feb"] },
  holidays: CC_HOLIDAYS.map((h) => h.name.join(" ") + ": " + h.d + " " + CC_MONTHS[h.m]),
};

/* the picture's calendar (the Date of the calendar in use today; month 0-based) */
const ccDays = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
const ccFirst = (y: number, m: number) => new Date(y, m, 1).getDay();
const ccBinOf = (y: number, m: number) => (m === 1 ? "feb" : ccDays(y, m) === 31 ? "31" : "30");
const ccSorted = () => { const b: any = {}; for (let m = 0; m < 12; m++) b[m] = ccBinOf(2026, m); return b; };
const ccBinDays = (bin: string, y: number) => (bin === "31" ? 31 : bin === "30" ? 30 : ccDays(y, 1));
/* the gate: a path of "yes"/"no" answers, where it ends, and which box is open next */
const ccGateEnd = (p: string[]) => (p[0] === "no" ? "not" : p[0] === "yes" && p[1] === "no" ? "leap"
  : p.length >= 3 ? (p[2] === "yes" ? "leap" : "not") : null);
const ccGateLive = (p: string[], k: number) => (k === 0 ? true : k === 1 ? p[0] === "yes" : p[0] === "yes" && p[1] === "yes");
const ccLeapPath = (y: number) => (y % 4 !== 0 ? ["no"] : y % 100 !== 0 ? ["yes", "no"] : ["yes", "yes", y % 400 === 0 ? "yes" : "no"]);
/* a count between two dates, month by month: [days in the first month, days in the last month, in all] */
const ccCounts = (it: any, e: any) => {
  const p1 = ccDays(2026, it.from[0]) - it.from[1] + (e.first ? 1 : 0);
  if (it.kind === "lastday") return [p1, it.length - p1, it.length];
  let mid = 0;
  for (let m = it.from[0] + 1; m < it.to[0]; m++) mid += ccDays(2026, m);
  const p2 = it.to[1] - 1 + (e.last ? 1 : 0);
  return [p1, p2, p1 + mid + p2];
};
/* the child's own state on a question, fresh each question (a correction never writes into it) */
const ccStart = (key: string, it: any, free: boolean) => ({
  key, year: 2026, held: null, laid: 0, ticks: [], paths: {}, sep: ".", flags: [], fIn: true, lIn: true, acted: false,
  nudge: null, tab: "gate",
  bins: !free && (it.kind === "weeks" || it.kind === "weekday") ? ccSorted() : {},
  gy: !free && it.years ? it.years[0] : 2026,
  first: null, last: !free && it.kind === "lastday" ? true : null,
});

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers). A short date is compared on its
   digit strings, box by box, so 3.1.2027 (the noughts dropped) and 01.03.2027 (the month first) are not
   03.01.2027: the day and the month take two places each and the year four, in that order. */
const judge = (item: any, v: any) => {
  if (item.kind === "short") { const got = slotPartsOf(v, 3); return got.every((g: string, k: number) => g === item.answer[k]); }
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work: a Julian day
   number (no Date, no month table) gives month lengths, weekdays, leap years and day counts */
const ccJdn = (y: number, m: number, d: number) => {
  const a = Math.floor((14 - m) / 12), yy = y + 4800 - a, mm = m + 12 * a - 3;
  return d + Math.floor((153 * mm + 2) / 5) + 365 * yy + Math.floor(yy / 4) - Math.floor(yy / 100) + Math.floor(yy / 400) - 32045;
};
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const same = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);
  const len = (y: number, m1: number) => (m1 === 12 ? ccJdn(y + 1, 1, 1) : ccJdn(y, m1 + 1, 1)) - ccJdn(y, m1, 1);
  const feb = (y: number) => len(y, 2);
  if (it.kind === "sort") return same(it.months.map((m: number) => len(2026, m + 1)), it.answer);
  if (it.kind === "weeks") { let d = it.days, w = 0; while (d >= 7) { d -= 7; w += 1; } return same([w, d], it.answer); }
  if (it.kind === "weekday") {
    const w1 = (ccJdn(2026, it.month + 1, 1) + 1) % 7;
    return 1 + ((it.weekday - w1 + 7) % 7) + 7 * (it.nth - 1) === it.answer;
  }
  if (it.kind === "leapset") {
    const L = it.years.filter((y: number) => feb(y) === 29);
    return (L.length === it.years.length ? "all three" : L.join(" and ") + (L.length === 1 ? " only" : "")) === it.answer;
  }
  if (it.kind === "febdays") return feb(it.years[0]) === it.answer;
  if (it.kind === "leapq") return (feb(it.years[0]) === 29 ? "yes" : "no") === it.answer;
  if (it.kind === "between") {
    const a = ccJdn(2026, it.from[0] + 1, it.from[1]), b = ccJdn(2026, it.to[0] + 1, it.to[1]);
    return b - a - 1 + (it.firstIn ? 1 : 0) + (it.lastIn ? 1 : 0) === it.answer;
  }
  if (it.kind === "lastday") return ccJdn(2026, it.from[0] + 2, it.answer) === ccJdn(2026, it.from[0] + 1, it.from[1]) + it.length - 1;
  if (it.kind === "short") { const [d, m, y] = it.date; return same([("0" + d).slice(-2), ("0" + m).slice(-2), String(y)], it.answer); }
  return false;
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print. A year is a label, never written
   with a comma; a count of days is "18 days" (the date 18 September in its own question is not the answer) */
const answerForms = (item: any) => {
  const a = item.answer;
  if (item.kind === "short") return [a.join("."), a.join("/"), a.join("-")];
  if (item.kind === "between") return [a + " days", words(a) + " days"];
  if (item.kind === "lastday") return [a + " April", words(a) + " April", "sixth of April"];
  if (item.kind === "leapq") return ["not a leap year"];
  if (item.kind === "leapset") return [String(a)];
  if (item.parts) return a.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), words(x)]);
  return [String(a), words(a)];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it: a short date keeps
   its noughts ("03", "01", "2027"), which slotPartsOf passes through as digit strings */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => { if (HOOK.ends) HOOK.ends(item); return T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer); };
/* the agent's answer(): on a day count it sets the two end switches as the question says, as a child
   would (the slot takes Enter only once both are set); then the value is typed (undefined = type it) */
const answer = (item: any, v: any) => { if ((item.kind === "between" || item.kind === "lastday") && HOOK.ends) HOOK.ends(item); return undefined; };
/* the agent's check() before Enter: e.g. drop a token that waits; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area: 1086 x 528, origin at its top-left ────────────────────────────────────
   Countable things use CONTENT colours (url(#gHundred|gTen|gOne|gBead|gPointer)); coloured numerals
   and words use a deeper ink, shade(colour, 0.25), so they read at 4.5:1. Type uses T.* only.
   Pieces: drag = useDrag(onDrop) then {...control(id, label), ...drag.bind(pay), ...drag.keys(pay)};
   taps = <Hit id x y w h onPress label />. One <Invite/> marks the one thing to touch.
   Nothing is written here that the voice already says. `wrong` = { value, tries } after a miss:
   lock, redraw the mathematics in steps (the traceback), unlock; never mark it, never reset it.
   stage === "free" is Free play (the plan's writeup.freePlay): no target, every control unlocked. */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  /* every English word the picture draws goes through tx("...") (its key is added to TR); a number in words
     is wordsIn(n, lang) */
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const it: any = item || {};
  const kind = free ? "free" : it.kind || "";
  const key = free ? "free" : n + ":" + index;
  const asking = stage === "ask";
  const done = !free && (stage === "win" || stage === "idle");
  const RX = 668, RW = 418, SX = 716;
  const wd = (c: number) => (CC_WD_LANG[lang] || CC_WD)[c];

  /* the child's own state for this question */
  const [S, setS] = useState<any>(() => ccStart(key, it, free));
  const cur = S.key === key ? S : ccStart(key, it, free);
  const SR = useRef<any>(cur);
  SR.current = cur;
  const put = (p: any) => { const nx = { ...SR.current, ...p }; SR.current = nx; setS(nx); };
  /* the correction's own layer: drawn over the child's pieces, wiped by the child's next act */
  const [demo, setDemo] = useState<any>(null);
  const dm = demo && demo.key === key ? demo : null;
  /* while a correction plays, the working area holds still (a tap never cuts it short); once it has
     ended on the whole answer, the child's next act wipes its layer */
  const still = tl.busy;
  const act = () => { if (dm) setDemo(null); };
  useEffect(() => { tl.stop(); setDemo(null); }, [key]);
  /* free play: a gate tap that disagrees with the year springs back: the box lights and the knob wobbles
     toward the tap, back past the middle and home (three steps), nothing is marked */
  useEffect(() => {
    const ng = cur.nudge;
    if (!ng) return;
    const w = ng.w || 0;
    const t = setTimeout(() => put({ nudge: w >= 2 ? null : { ...ng, w: w + 1 } }), w >= 2 ? 320 : 160);
    return () => clearTimeout(t);
  }, [cur.nudge]);
  /* each box takes only the places it has: 2 for a day or a month, 4 for a year, 3 for a count of days
     (the runtime lets a box run to 7 digits, which spills out of it) */
  const caps: number[] | null = kind === "short" ? [2, 2, 4] : kind === "sort" || kind === "weeks" ? [3, 3] : null;
  useEffect(() => {
    if (!caps || !asking) return;
    const ps = String(typed || "").split("|");
    if (ps.some((x: string, k: number) => x.length > (caps[k] || 9))) api.setTyped(ps.map((x: string, k: number) => x.slice(0, caps[k] || 9)).join("|"));
  }, [typed]);

  /* ── the child's acts ── */
  const gYear = (s: any) => (free ? s.year : s.gy);
  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (!pay || still) return;
    const s = SR.current;
    if (pay.t === "card") {
      act();
      /* a tap (or Enter) picks the card up; a bar tapped next takes it. A drag drops it on a bar, and a
         sorted card dragged off the bars comes out of the rack again */
      if (!moved) { put({ held: s.held === pay.m ? null : pay.m, acted: true }); return; }
      const b = CC_BINS.find((q: any) => p.x >= RX && p.x <= RX + RW && p.y >= q.y && p.y <= q.y + q.h);
      if (b) { put({ bins: { ...s.bins, [pay.m]: b.id }, held: null, acted: true }); api.sfx.tick(); return; }
      const nb = { ...s.bins };
      delete nb[pay.m];
      put({ bins: nb, held: null });
      return;
    }
    if (pay.t === "hol") {
      const has = s.flags.includes(pay.id);
      if (!moved) { put({ flags: has ? s.flags.filter((x: string) => x !== pay.id) : s.flags.concat(pay.id).slice(-2) }); api.sfx.tick(); return; }
      if (!has && p.x >= 0 && p.x <= 568 && p.y >= 88 && p.y <= 528) { put({ flags: s.flags.concat(pay.id).slice(-2) }); api.sfx.tick(); }
    }
  });
  const place = (b: string) => {
    const s = SR.current;
    if (still || s.held === null) return;
    act(); put({ bins: { ...s.bins, [s.held]: b }, held: null, acted: true }); api.sfx.tick();
  };
  const turn = (d: number) => { if (still) return; act(); put({ year: Math.min(2400, Math.max(1600, SR.current.year + d)), acted: true }); };
  const lay = () => { const s = SR.current; if (still || s.laid >= 4) return; act(); put({ laid: s.laid + 1, acted: true }); api.sfx.tick(); };
  const tick = (d: number) => {
    if (still) return;
    act(); const s = SR.current;
    put({ ticks: s.ticks.includes(d) ? s.ticks.filter((x: number) => x !== d) : s.ticks.concat(d), acted: true });
  };
  const pickYear = (y: number) => { if (still) return; act(); put({ gy: y, acted: true }); };
  /* the gate in a question takes the child's own yes or no: each tap lights that box with the child's choice
     and the child's path opens the next box. Nothing that depends on the true answer (a verdict, February's
     days, the year bar) shows until Enter. In free play nothing is graded, so the gate lights only the true
     path, live: a tap that disagrees springs back. */
  const gate = (k: number, a: string) => {
    /* the year on the dial: a correction that traced another year leaves that year on the dial */
    const s = SR.current, y = !free && dm && dm.year ? dm.year : gYear(s), p = s.paths[y] || [], truth = ccLeapPath(y);
    if (still || !ccGateLive(p, k)) return;
    act();
    if (!free) { put({ gy: y, paths: { ...s.paths, [y]: p.slice(0, k).concat(a) }, acted: true }); api.sfx.tick(); return; }
    if (truth[k] !== a) { put({ nudge: { y, k, a, w: 0 }, acted: true }); api.sfx.tick(); return; }
    put({ paths: { ...s.paths, [y]: truth.slice(0, k + 1) }, nudge: null, acted: true }); api.sfx.tick();
  };
  const setEnd = (w: string, v: boolean) => { if (still) return; act(); put({ [w]: v, acted: true }); api.sfx.tick(); };
  const setSep = (v: string) => { if (still) return; act(); put({ sep: v }); };
  HOOK.ends = (x: any) => { if (x && (x.kind === "between" || x.kind === "lastday")) put({ first: x.firstIn, last: x.lastIn, acted: true }); };

  /* a day count takes its answer only once both ends are decided (the plan: the slot opens then) */
  const counting = !free && (kind === "between" || kind === "lastday");
  api.onEnter(counting ? (v: any) => {
    const s = SR.current;
    if (s.first === null || s.last === null) {
      if (kind === "lastday") api.say("Decide whether the first day counts.");
      else api.say("Set the first day and the last day first.");
      return false;
    }
    return api.submit(v);
  } : null);

  /* ── the traceback: the maths redrawn in steps, ending on the whole right answer ── */
  const steps = (v: any): any[] => {
    const s = SR.current;
    if (kind === "sort") {
      const b1 = { ...s.bins, 7: "31" }, b2 = { ...b1, 6: "31" };
      return [{ bins: b1, tags: { 7: "31" }, rings: [7] }, { bins: b2, tags: { 6: "31", 7: "31" }, rings: [6, 7] },
        { bins: ccSorted(), tags: { 5: "30", 7: "31" }, rings: [5, 7], final: true }];
    }
    if (kind === "weeks") return [{ laid: 1 }, { laid: 2 }, { laid: 3 }, { laid: 4 }, { laid: 4, final: true }];
    if (kind === "weekday") return [{ ticks: [7] }, { ticks: [7, 14] }, { ticks: [7, 14, 21], final: true }];
    if (kind === "leapset" || kind === "febdays" || kind === "leapq") {
      const Y = kind !== "leapset" ? it.years[0] : String(v) === "1996 only" ? 1600 : 1700;
      const full = ccLeapPath(Y), runs: any = {};
      it.years.forEach((y: number) => { runs[y] = ccGateEnd(ccLeapPath(y)); });
      return full.map((_: any, k: number) => ({ year: Y, path: full.slice(0, k + 1) })).concat([{ year: Y, path: full, runs, final: true }]);
    }
    if (kind === "between" || kind === "lastday") {
      const ends = { first: it.firstIn, last: it.lastIn }, c = ccCounts(it, ends);
      return [{ ends }, { ends, fill: "first", counts: [c[0]] }, { ends, fill: "all", counts: [c[0], c[1]] }, { ends, fill: "all", counts: c, final: true }];
    }
    if (kind === "short") return [{ digits: slotPartsOf(v, 3), light: true, read: true }, { digits: it.answer, grew: true },
      { digits: it.answer, grew: true, forms: true, final: true }];
    return [];
  };
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    const run = steps(wrong.value);
    if (!run.length) return;
    api.lock(true);
    tl.run(run.map((d: any, k: number) => [k === run.length - 1 ? 200 : 900, () => setDemo({ ...d, key })]), () => api.lock(false));
  }, [wrong]);

  /* ── what the host and the agent read back (toolApi.getState): the child's own work, never the answer ── */
  const own3 = slotPartsOf(typed || "", 3);
  api.share({
    year: free || kind === "sort" ? cur.year : it.years ? cur.gy : 2026,
    monthsSorted: Object.keys(cur.bins).length,
    yearTotal: kind === "weeks" ? it.days : null,
    weeksLeft: done && kind === "weeks" ? it.answer[1] : null,
    leapSteps: (cur.paths[cur.gy] || []).slice(),
    firstDate: it.from && !free ? it.from[1] + " " + CC_MONTHS[it.from[0]] : null,
    lastDate: it.to && !free ? it.to[1] + " " + CC_MONTHS[it.to[0]] : null,
    firstCounts: cur.first, lastCounts: cur.last,
    dayCount: done && counting ? it.answer : null,
    shortDate: kind === "short" && own3.some((x: string) => x) ? own3.join(cur.sep) : null,
    complete: stage === "idle",
  });

  /* ── drawing helpers (called, never mounted) ── */
  const glyph = (s: string, fill?: string) => <text textAnchor="middle" dy="0.35em" fontSize={T.label} fontWeight={700} fill={fill || C.ink}>{s}</text>;
  /* the running count is the child's own work, so it stands aside while a correction is on screen */
  const runsBox = (label: string, a: number, b: number) => (dm ? null :
    <g data-zone="runs">
      <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={2} />
      <text x={20} y={-46} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(label)}</text>
      <text x={310} y={-44} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{a + " / " + b}</text>
    </g>
  );
  const yearBox = (x: number, w: number, y0: number) => (
    <g>
      <rect x={x} y={0} width={w} height={72} rx={16} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      <text x={x + w / 2} y={56} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{String(y0)}</text>
    </g>
  );
  /* the wall: twelve cards, 16 apart (a smaller wall in free play leaves room for the gate and the shelf) */
  const cardAt = (m: number, fw?: boolean) => (fw ? { x: (m % 4) * 146, y: 94 + Math.floor(m / 4) * 144, w: 130, h: 128 }
    : { x: (m % 4) * 164, y: 94 + Math.floor(m / 4) * 148, w: 148, h: 132 });
  /* a pin with a round head, standing on a day (a flagged date): top = the head's top, h = its height (28) */
  const pin = (x: number, top: number, r = 6, h = 28) => (
    <g pointerEvents="none">
      <line x1={x} y1={top + 2 * r} x2={x} y2={top + h} stroke={CC_INK} strokeWidth={2.5} strokeLinecap="round" />
      <circle cx={x} cy={top + r} r={r} fill={shade(CC_OLIVE, 0.1)} stroke={CC_INK} strokeWidth={1.5} />
    </g>
  );
  /* a small month card: its days as tiles in week rows, the first under its weekday; no dates written */
  const small = (m: number, year: number, o: any) => {
    const at = cardAt(m, o.fw), dim = ccDays(year, m), f = ccFirst(year, m), px = (at.w - 16) / 7;
    const cells: any[] = [], pins: any[] = [];
    for (let d = 1; d <= dim; d++) {
      const i = f + d - 1, cx = at.x + 8 + (i % 7) * px, cy = at.y + 36 + Math.floor(i / 7) * 15;
      const st = o.day ? o.day(m, d) : null, leap = m === 1 && d === 29;
      /* 29 February, the leap day: a bigger yellow tile than the other days, outlined in near-black */
      const big = leap && !st ? 4 : 0;
      cells.push(<rect key={d} x={cx - big} y={cy - big} width={px - 3.5 + 2 * big} height={12 + 2 * big} rx={3}
        fill={st === "in" ? tint(CC_GREEN, 0.2) : st ? "#FFFFFF" : leap ? CC_YELLOW : tint(CC_OLIVE, 0.5)}
        stroke={st || leap ? CC_INK : "none"} strokeWidth={st && st !== "in" ? 2.5 : leap ? 2 : 1.2} />);
      if (o.pins && o.pins.includes(d)) pins.push(<g key={"p" + d}>{pin(cx + (px - 3.5) / 2, cy - 16)}</g>);
    }
    return (
      <g>
        <rect x={at.x} y={at.y} width={at.w} height={at.h} rx={14} fill="#FFFFFF" filter={o.lift ? "url(#fLift)" : undefined}
          stroke={o.ring ? C.accent : o.sorted ? shade(CC_OLIVE, 0.15) : C.rule} strokeWidth={o.ring ? 4 : o.sorted ? 3 : 2} />
        <text x={at.x + 12} y={at.y + 27} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(CC_MON3[m])}</text>
        {o.tag ? <text x={at.x + at.w - 12} y={at.y + 27} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>{o.tag}</text> : null}
        {cells}
        {pins}
      </g>
    );
  };
  /* a switch: a pill with a word at each end and a knob that sits in the middle until it is set; each half
     is a finger box. It looks nothing like the pad's keys, so it is never mistaken for an answer. */
  const pill = (o: any) => {
    const h = 72, mid = o.x + o.w / 2, fs = o.big ? T.label : T.micro, set = o.val === true || o.val === false;
    const wob = [24, -10, 6][o.nudgeW || 0];
    const knob = o.nudge ? mid + (o.nudge === "L" ? -wob : wob) : o.val === true ? mid - 26 : o.val === false ? mid + 26 : mid;
    const half = (left: boolean, fill: string) => <rect x={left ? o.x + 5 : mid} y={o.y + 5} width={o.w / 2 - 5} height={h - 10} rx={31} fill={fill} />;
    /* the true answer shown beside the child's own (a correction or a win): its half outlined and a ghost
       knob on its side, both under the child's knob, which stays where the child left it */
    const ghost = (o.demo === true || o.demo === false) && o.demo !== o.val;
    return (
      <g key={o.idL}>
        <rect x={o.x} y={o.y} width={o.w} height={h} rx={36} fill={o.live ? "#FFFFFF" : tint(C.panel, 0.55)} stroke={o.live ? CC_INK : C.rule} strokeWidth={2} />
        {set ? half(o.val === true, tint(CC_OLIVE, 0.5)) : null}
        {o.nudge ? half(o.nudge === "L", tint(C.accent, 0.8)) : null}
        {ghost ? <rect x={o.demo ? o.x + 2 : mid - 2} y={o.y + 2} width={o.w / 2} height={h - 4} rx={34}
          fill={tint(CC_OLIVE, 0.75)} stroke={shade(CC_OLIVE, 0.1)} strokeWidth={4} strokeDasharray="12 8" pointerEvents="none" /> : null}
        <text x={o.x + o.w * 0.2} y={o.y + h / 2} dy="0.35em" textAnchor="middle" fontSize={fs} fontWeight={700} fill={C.ink}>{tx(o.left)}</text>
        <text x={o.x + o.w * 0.8} y={o.y + h / 2} dy="0.35em" textAnchor="middle" fontSize={fs} fontWeight={700} fill={C.ink}>{tx(o.right)}</text>
        {ghost ? <circle cx={o.demo ? mid - 28 : mid + 28} cy={o.y + h / 2} r={17} fill={tint(CC_OLIVE, 0.4)} stroke={shade(CC_OLIVE, 0.1)} strokeWidth={3} strokeDasharray="6 4" pointerEvents="none" /> : null}
        <circle cx={knob} cy={o.y + h / 2} r={17} fill={set ? shade(CC_OLIVE, 0.2) : "#FFFFFF"} stroke={CC_INK} strokeWidth={2} />
        {o.live ? <Hit id={o.idL} x={o.x} y={o.y} w={o.w / 2} h={h} onPress={o.onL} label={o.label + " " + o.left} /> : null}
        {o.live ? <Hit id={o.idR} x={mid} y={o.y} w={o.w / 2} h={h} onPress={o.onR} label={o.label + " " + o.right} /> : null}
      </g>
    );
  };
  const rackBin = (b: any, bins: any, rings: number[], hot: boolean) => {
    const ms = Object.keys(bins).map(Number).filter((m: number) => bins[m] === b.id).sort((a: number, c: number) => a - c);
    const cols = Math.max(5, Math.ceil(ms.length / 2)), pitch = cols <= 5 ? 72 : (RW - 32 - 64) / (cols - 1);
    return (
      <g key={"bin" + b.id}>
        <rect x={RX} y={b.y} width={RW} height={b.h} rx={16} fill={tint(C.panel, 0.45)} stroke={hot ? C.accent : C.rule} strokeWidth={hot ? 3 : 2} />
        <text x={RX + 16} y={b.y + 32} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(b.label)}</text>
        {ms.map((m: number, k: number) => {
          const x = RX + 16 + (k % cols) * pitch, y = b.y + 44 + Math.floor(k / cols) * 42, r = rings.includes(m);
          return (
            <g key={m}>
              <rect x={x} y={y} width={64} height={36} rx={10} fill={tint(CC_OLIVE, 0.45)} stroke={r ? C.accent : shade(CC_OLIVE, 0.2)} strokeWidth={r ? 4 : 2} />
              <text x={x + 32} y={y + 27} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(CC_MON3[m])}</text>
            </g>
          );
        })}
      </g>
    );
  };

  /* ── phase 1: the wall, the year dial and the month rack ── */
  const sortScreen = () => {
    const bins = done ? ccSorted() : dm ? dm.bins : cur.bins;
    const tags: any = done ? { 5: "30", 7: "31" } : dm ? dm.tags : {};
    const rings: number[] = done ? [5, 7] : dm ? dm.rings : [];
    const yr = cur.year, ms = Object.keys(bins);
    const dd = drag.drag && drag.drag.moved && drag.drag.payload && drag.drag.payload.t === "card" ? drag.drag : null;
    const total = ms.length === 12 ? ms.reduce((t: number, m: string) => t + ccBinDays(bins[m], yr), 0) : 0;
    return (
      <g>
        {runsBox("sorted", done ? 12 : Object.keys(cur.bins).length, 12)}
        <Key id="year-down" x={0} y={0} w={72} h={72} C={C} onClick={() => turn(-1)} disabled={done} label="year before">{glyph("−")}</Key>
        {yearBox(82, 156, yr)}
        <Key id="year-up" x={246} y={0} w={72} h={72} C={C} onClick={() => turn(1)} disabled={done} label="year after">{glyph("+")}</Key>
        {CC_MON3.map((_: string, m: number) => {
          const at = cardAt(m), up = cur.held === m, away = dd && dd.payload.m === m;
          return (
            <g key={"card" + m} {...control("card-" + m, CC_MONTHS[m] + " card")} {...drag.bind({ t: "card", m })} {...drag.keys({ t: "card", m })}>
              {away ? <rect x={at.x} y={at.y} width={at.w} height={at.h} rx={14} fill={tint(C.panel, 0.5)} stroke={C.rule} strokeWidth={2} strokeDasharray="8 8" />
                : <g transform={up ? "translate(0,-6)" : undefined}>{small(m, yr, { sorted: cur.bins[m] !== undefined, ring: up || rings.includes(m), tag: tags[m] })}</g>}
            </g>
          );
        })}
        {CC_BINS.map((b: any) => rackBin(b, bins, rings, cur.held !== null))}
        <rect x={RX} y={432} width={RW} height={64} rx={16} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
        <text x={RX + 16} y={474} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("year")}</text>
        {total ? <text x={RX + RW - 16} y={476} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{total + " " + tx("days")}</text> : null}
        {CC_BINS.map((b: any) => <Hit key={"hit" + b.id} id={"bar-" + b.id} x={RX} y={b.y} w={RW} h={b.h} onPress={() => place(b.id)} label={b.label + " bar"} />)}
        {asking && !cur.acted && !dm ? <Invite x={cardAt(5).x + 74} y={cardAt(5).y + 81} r={40} C={C} /> : null}
        {dd ? <g pointerEvents="none" transform={"translate(" + (dd.x - cardAt(dd.payload.m).x - 74) + "," + (dd.y - cardAt(dd.payload.m).y - 66) + ")"}>
          {small(dd.payload.m, yr, { ring: true, lift: true })}</g> : null}
      </g>
    );
  };

  /* ── phase 1: the weeks ruler, four blocks of 13 weeks and the day over, across the whole area ── */
  const weeksScreen = () => {
    const laid = done ? 4 : Math.max(cur.laid, dm ? dm.laid : 0);
    const fin = done || (dm && dm.final);
    const whole = Math.floor(it.days / 7), over = it.days - whole * 7, X = 100;
    return (
      <g>
        {runsBox("sorted", 12, 12)}
        {yearBox(0, 240, 2026)}
        <rect x={256} y={0} width={400} height={72} rx={16} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
        <text x={276} y={46} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("year")}</text>
        <text x={636} y={48} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{it.days + " " + tx("days")}</text>
        {[0, 1, 2, 3].map((b: number) => {
          const bx = X + b * 200, on = b < laid;
          return (
            <g key={"blk" + b}>
              {on ? Array.from({ length: 13 }, (_, r) => <rect key={r} x={bx} y={104 + r * 24} width={168} height={20} rx={5} fill={tint(CC_OLIVE, 0.45)} stroke={shade(CC_OLIVE, 0.2)} strokeWidth={1.2} />)
                : <rect x={bx} y={104} width={168} height={308} rx={10} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="10 10" />}
              {on ? [1, 2, 3, 4, 5, 6].map((c: number) => <line key={"v" + c} x1={bx + c * 24} y1={104} x2={bx + c * 24} y2={412} stroke="#FFFFFF" strokeWidth={3} />) : null}
              {on ? <text x={bx + 84} y={454} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{"13 " + tx("weeks")}</text> : null}
            </g>
          );
        })}
        {/* the day over the whole weeks: a day of its own after the last column, in yellow */}
        {laid >= 4 ? Array.from({ length: over }, (_, k) => <rect key={"o" + k} x={X + 792 + k * 60} y={364} width={48} height={48} rx={8} fill={CC_YELLOW} stroke={CC_INK} strokeWidth={3} />) : null}
        {fin ? <g pointerEvents="none">
          <text x={X + 816} y={454} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{over + " " + tx(over === 1 ? "day" : "days")}</text>
          <text x={X + 384} y={506} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{whole + " " + tx("weeks")}</text>
        </g> : null}
        <Hit id="ruler" x={X - 16} y={88} w={920} h={400} onPress={lay} label="lay 13 weeks" />
        {asking && laid === 0 && !dm ? <Invite x={X + 84} y={258} r={60} C={C} /> : null}
      </g>
    );
  };

  /* ── phase 1: one month open, its dates under their weekdays; a tap ticks a date (a ring), the
     correction's Saturdays are filled and numbered 1st, 2nd, 3rd ── */
  const weekdayScreen = () => {
    const m = it.month, yr = 2026, f = ccFirst(yr, m), dim = ccDays(yr, m), X0 = 24;
    const dt: number[] = done ? [7, 14, 21] : dm ? dm.ticks : [];
    const fin = done || (dm && dm.final);
    const ORD = ["1st", "2nd", "3rd", "4th", "5th"];
    const cells: any[] = [], hits: any[] = [];
    for (let d = 1; d <= dim; d++) {
      const i = f + d - 1, cx = X0 + (i % 7) * 76, cy = 84 + Math.floor(i / 7) * 88;
      const k = dt.indexOf(d), mine = cur.ticks.includes(d);
      cells.push(
        <g key={"d" + d}>
          <rect x={cx + 3} y={cy + 3} width={70} height={82} rx={10} fill={k >= 0 ? tint(CC_OLIVE, 0.45) : "#FFFFFF"} stroke={k >= 0 ? shade(CC_OLIVE, 0.2) : C.rule} strokeWidth={k >= 0 ? 3 : 1.5} />
          {mine && k < 0 ? <circle cx={cx + 38} cy={cy + 44} r={30} fill="none" stroke={shade(CC_OLIVE, 0.2)} strokeWidth={4} /> : null}
          <text x={cx + 38} y={cy + (k >= 0 ? 38 : 55)} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{d}</text>
          {k >= 0 ? <text x={cx + 38} y={cy + 76} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(ORD[k])}</text> : null}
        </g>
      );
      hits.push(<Hit key={"h" + d} id={"date-" + d} x={cx} y={cy} w={76} h={88} onPress={() => tick(d)} label={d + " " + CC_MONTHS[m]} />);
    }
    return (
      <g>
        {runsBox("sorted", 12, 12)}
        <rect x={X0 - 8} y={0} width={548} height={528} rx={18} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
        <text x={X0 + 266} y={36} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(CC_MONTHS[m]) + " " + yr}</text>
        {CC_WD.map((w: string, c: number) => <text key={"w" + c} x={X0 + c * 76 + 38} y={72} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{wd(c)}</text>)}
        {cells}
        {fin ? <g pointerEvents="none">
          <text x={X0 + 580} y={200} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("3rd Saturday")}</text>
          <text x={X0 + 580} y={270} fontSize={T.xl} fontWeight={700} fill={C.ink}>{it.answer + " " + tx(CC_MONTHS[m])}</text>
        </g> : null}
        {hits}
        {asking && !cur.ticks.length && !dm ? <Invite x={X0 + f * 76 + 38} y={128} r={40} C={C} /> : null}
      </g>
    );
  };

  /* ── phase 2: the year dial, February, the year bar and the leap year gate ── */
  /* the leap year gate for one year: three boxes, each a yes/no switch holding the child's own choice.
     truth = the path the year really takes, passed only once it may show (free play: live; a question:
     after Enter). Then its boxes light, its answer is outlined beside the child's where they differ, and
     the verdict appears. Without it, a box lights only because the child answered it. */
  const gatePanel = (gx: number, y0: number, boxH: number, pitch: number, year: number, own: string[], truth: string[] | null, canTap: boolean, invite: boolean, tagY: number) => {
    const end = truth ? ccGateEnd(truth) : null;
    const ng = cur.nudge && cur.nudge.y === year ? cur.nudge : null;
    let inv: any = null;
    return (
      <g>
        {CC_GATE.map((q: string, k: number) => {
          const y = y0 + k * pitch, reach = canTap && ccGateLive(own, k), lit = (truth || own).length > k, poke = ng && ng.k === k;
          const next = reach && own.length === k && !ccGateEnd(own);
          if (invite && next) inv = <Invite x={gx + 166} y={y + boxH - 40} r={36} C={C} />;
          return (
            <g key={"g" + k}>
              <rect x={gx} y={y} width={RW} height={boxH} rx={16} fill={poke ? tint(C.accent, 0.85) : lit ? tint(CC_OLIVE, 0.8) : "#FFFFFF"}
                stroke={poke || (next && invite) ? C.accent : lit ? shade(CC_OLIVE, 0.1) : C.rule} strokeWidth={poke ? 4 : next && invite ? 3 : 2} />
              <text x={gx + 16} y={y + 32} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(q)}</text>
              {pill({ idL: "gate-" + k + "-yes", idR: "gate-" + k + "-no", x: gx + 16, y: y + boxH - 76, w: 300, left: "yes", right: "no", big: true, label: q,
                val: own[k] ? own[k] === "yes" : null,
                demo: truth && truth[k] ? truth[k] === "yes" : null, nudge: poke ? (ng.a === "yes" ? "L" : "R") : null, nudgeW: poke ? ng.w || 0 : 0,
                live: reach, onL: () => gate(k, "yes"), onR: () => gate(k, "no") })}
            </g>
          );
        })}
        {end ? <g pointerEvents="none">
          <rect x={gx} y={tagY} width={RW} height={528 - tagY} rx={16} fill={end === "leap" ? tint(CC_OLIVE, 0.6) : "#FFFFFF"} stroke={CC_INK} strokeWidth={2} />
          <text x={gx + RW / 2} y={tagY + (528 - tagY) / 2 + 12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(end === "leap" ? "leap year" : "not a leap year")}</text>
        </g> : null}
        {inv}
      </g>
    );
  };
  const gateScreen = () => {
    const yrs: number[] = it.years || [];
    const fin = done || (dm && dm.final);
    const gy = dm ? dm.year : cur.gy;
    const own: string[] = cur.paths[gy] || [];
    /* the true path, verdict, February and the year bar appear only after Enter: on the win, or step by step
       in the correction. Before that the gate holds only the child's own choices. */
    const truth: string[] | null = done ? ccLeapPath(gy) : dm ? dm.path : null;
    const end = truth ? ccGateEnd(truth) : null;
    const verdict = (y: number) => (done ? ccGateEnd(ccLeapPath(y)) : dm && dm.runs ? dm.runs[y] : null);
    const f = ccFirst(gy, 1), feb = end === "leap" ? 29 : 28;
    const ran = done ? yrs.length : yrs.filter((y: number) => ccGateEnd(cur.paths[y] || [])).length;
    return (
      <g>
        {runsBox("years run", ran, yrs.length)}
        {yearBox(0, 200, gy)}
        {yrs.length > 1 ? yrs.map((y: number, k: number) => {
          const v = verdict(y), on = y === gy, ink = on && !done ? "#FFFFFF" : C.ink;
          return (
            <Key key={"yr" + y} id={"year-" + y} x={216 + k * 140} y={0} w={124} h={88} C={C} primary={on} onClick={() => pickYear(y)} disabled={done} label={"year " + y}>
              <text textAnchor="middle" y={v ? -6 : 11} fontSize={T.label} fontWeight={700} fill={ink}>{String(y)}</text>
              {v ? <text textAnchor="middle" y={28} fontSize={T.micro} fontWeight={600} fill={ink}>{tx(v === "leap" ? "leap" : "not leap")}</text> : null}
            </Key>
          );
        }) : null}
        <rect x={0} y={108} width={637} height={344} rx={18} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
        <text x={318} y={146} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("February") + " " + gy}</text>
        {fin && kind === "febdays" ? <text x={620} y={146} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{"29 " + tx("days")}</text> : null}
        {CC_WD.map((w: string, c: number) => <text key={"w" + c} x={c * 91 + 45} y={182} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{wd(c)}</text>)}
        {/* February shows its days only once the gate has decided the year: before that, an empty month */}
        {end ? Array.from({ length: feb }, (_, j) => {
          const d = j + 1, i = f + j, cx = (i % 7) * 91, cy = 192 + Math.floor(i / 7) * 52, leap = d === 29;
          return (
            <g key={"f" + d}>
              <rect x={cx + 3} y={cy + 2} width={85} height={48} rx={8} fill={leap ? CC_YELLOW : tint(CC_OLIVE, 0.6)} stroke={leap ? CC_INK : shade(CC_OLIVE, 0.1)} strokeWidth={leap ? 2.5 : 1.2} />
              <text x={cx + 45} y={cy + 38} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{d}</text>
            </g>
          );
        }) : Array.from({ length: 35 }, (_, i) => <rect key={"e" + i} x={(i % 7) * 91 + 3} y={194 + Math.floor(i / 7) * 52} width={85} height={48} rx={8} fill={tint(C.panel, 0.6)} />)}
        <rect x={0} y={464} width={637} height={64} rx={16} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
        <text x={16} y={506} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("year")}</text>
        {end ? <text x={621} y={508} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{(end === "leap" ? 366 : 365) + " " + tx("days")}</text> : null}
        {gatePanel(RX, 0, 136, 148, gy, own, truth, !done, asking && !dm && !cur.acted, 452)}
      </g>
    );
  };

  /* ── phase 3: two months with the dates flagged, the end switches and the day counter ── */
  const countScreen = () => {
    const last = kind === "lastday";
    const fin = done || (dm && dm.final);
    const ends = done ? { first: it.firstIn, last: it.lastIn } : dm ? dm.ends : { first: cur.first, last: cur.last };
    const set = ends.first !== null && ends.last !== null;
    const fill = done ? "all" : dm ? dm.fill : set ? "own" : null;
    const months = last ? [it.from[0], it.from[0] + 1] : [it.from[0], it.to[0]];
    const fo = it.from[0] * 40 + it.from[1], to = last ? -1 : it.to[0] * 40 + it.to[1];
    const cn: number[] = done ? ccCounts(it, ends) : dm && dm.counts ? dm.counts : [];
    const day = (m: number, d: number) => {
      const o = m * 40 + d;
      if (o === fo) return set ? (ends.first ? "in" : "out") : "flag";
      if (o === to) return set ? (ends.last ? "in" : "out") : "flag";
      if (!fill) return null;
      if (last) {
        if (m === it.from[0]) return o > fo ? "in" : null;
        if (fill !== "all") return null;
        const p2 = ccCounts(it, ends)[1];
        return d <= p2 ? "in" : d === p2 + 1 ? "out" : null;
      }
      if (o > fo && o < to) return fill === "first" && m !== it.from[0] ? null : "in";
      return null;
    };
    const big = (m: number, x0: number) => {
      const f = ccFirst(2026, m), dim = ccDays(2026, m);
      return (
        <g key={"big" + m}>
          <rect x={x0} y={0} width={336} height={400} rx={16} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
          <text x={x0 + 168} y={34} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(CC_MONTHS[m])}</text>
          {CC_WD.map((w: string, c: number) => <text key={"w" + c} x={x0 + c * 48 + 24} y={70} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{wd(c)}</text>)}
          {Array.from({ length: dim }, (_, j) => {
            const d = j + 1, i = f + j, cx = x0 + (i % 7) * 48, cy = 84 + Math.floor(i / 7) * 62, s = day(m, d);
            const flag = m * 40 + d === fo || m * 40 + d === to;
            return (
              <g key={"c" + d}>
                <rect x={cx + 3} y={cy + 3} width={42} height={56} rx={8} fill={s === "in" ? tint(CC_GREEN, 0.45) : "#FFFFFF"} stroke={s ? CC_INK : C.rule} strokeWidth={s === "in" ? 1.5 : s ? 3 : 1.2} />
                <text x={cx + 24} y={cy + 46} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{d}</text>
                {flag ? pin(cx + 10, cy - 8) : null}
              </g>
            );
          })}
        </g>
      );
    };
    /* an end switch: "counts" or "left out", the knob in the middle until the child sets it */
    const sw = (label: string, w: string, y: number, mine: any, shownV: any, fixed: boolean) => (
      <g key={w}>
        <text x={SX} y={y + 28} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(label)}</text>
        {pill({ idL: w + "-counts", idR: w + "-out", x: SX, y: y + 40, w: 356, left: "counts", right: "left out", label,
          val: mine, demo: dm ? shownV : null, live: !fixed && !done, onL: () => setEnd(w, true), onR: () => setEnd(w, false) })}
      </g>
    );
    const lit = set || !!dm || done;
    const nSet = (cur.first !== null ? 1 : 0) + (!last && cur.last !== null ? 1 : 0);
    const rows = [tx(CC_MON3[months[0]]), tx(CC_MON3[months[1]]), tx("in all")];
    return (
      <g>
        {runsBox("ends set", done ? (last ? 1 : 2) : nSet, last ? 1 : 2)}
        {big(months[0], 0)}
        {big(months[1], 352)}
        {sw("first day", "first", 0, done ? it.firstIn : cur.first, ends.first, false)}
        {sw("last day", "last", 128, done ? it.lastIn : cur.last, ends.last, last)}
        <rect x={SX} y={262} width={370} height={266} rx={16} fill={lit ? "#FFFFFF" : tint(C.panel, 0.35)} stroke={lit ? C.accent : C.rule} strokeWidth={lit ? 3 : 2} strokeDasharray={lit ? undefined : "10 10"} />
        {rows.map((r: string, k: number) => {
          const y = 282 + k * 76, v = k === 2 && last ? it.length : cn[k];
          return (
            <g key={"row" + k}>
              <text x={SX + 20} y={y + 42} fontSize={T.label} fontWeight={700} fill={C.ink}>{r}</text>
              <rect x={SX + 200} y={y} width={150} height={60} rx={10} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
              {v !== undefined && v !== null ? <text x={SX + 275} y={y + 42} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{String(v)}</text> : null}
            </g>
          );
        })}
        {fin && last ? <text x={344} y={466} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("last day:") + " " + it.answer + " " + tx(CC_MONTHS[it.from[0] + 1])}</text> : null}
        {asking && cur.first === null && !dm ? <Invite x={SX + 178} y={76} r={36} C={C} /> : null}
      </g>
    );
  };

  /* ── phase 4: the date in words, the date writer (two, two and four places) and the month strip ── */
  const shortScreen = () => {
    const [d0, m0, y0] = it.date;
    const own = own3;
    const dg: string[] = done ? it.answer : dm && dm.digits ? dm.digits : own;
    const fin = done || (dm && dm.forms);
    const SL = [{ n: 2, x: 79, lab: "day" }, { n: 2, x: 339, lab: "month" }, { n: 4, x: 599, lab: "year" }];
    /* the places fill left to right as the child types; the correction's read-back sets a short number to
       the right, so the empty first place (the missing nought) is the one that lights */
    const right = !!(dm && dm.light);
    const cellsOf = (s: string, nn: number, r = right) => {
      const t = String(s || "").slice(0, nn);
      return Array.from({ length: nn }, (_, k) => (r ? (k < nn - t.length ? "" : t[k - (nn - t.length)]) : t[k] || ""));
    };
    /* the month strip reads a date back only in the correction (the child's digits read as a date, then the
       right one) and on the win; while the child types, it lights nothing */
    const rd: string[] | null = done ? it.answer : dm && dm.digits ? dm.digits : null;
    const mm = rd ? Number(rd[1] || 0) : 0, dd = rd ? Number(rd[0] || 0) : 0, readM = mm >= 1 && mm <= 12 ? mm - 1 : -1;
    const filled = done ? 8 : SL.reduce((t: number, sl: any, j: number) => t + Math.min(String(own[j] || "").length, sl.n), 0);
    return (
      <g>
        {runsBox("places filled", filled, 8)}
        <rect x={243} y={0} width={600} height={84} rx={16} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
        <text x={543} y={62} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{d0 + " " + tx(CC_MONTHS[m0 - 1]) + " " + y0}</text>
        {SL.map((sl: any, j: number) => {
          /* in the correction a digit it sets is inked olive where it differs from the child's number, place by place */
          const cs = cellsOf(dg[j], sl.n), mine = cellsOf(own[j], sl.n, true);
          return (
            <g key={"sl" + j}>
              {cs.map((ch: string, k: number) => {
                const x = sl.x + k * 104, lit = dm && dm.light && ch === "", grew = dm && dm.grew && ch !== mine[k];
                return (
                  <g key={k}>
                    <rect x={x} y={108} width={96} height={120} rx={12} fill={lit ? CC_YELLOW : "#FFFFFF"} stroke={CC_INK} strokeWidth={2.5} />
                    <text x={x + 48} y={196} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={grew ? shade(CC_OLIVE, 0.45) : C.ink}>{ch}</text>
                  </g>
                );
              })}
              <text x={sl.x + (sl.n * 104 - 8) / 2} y={262} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(sl.lab)}</text>
            </g>
          );
        })}
        <text x={309} y={196} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>{cur.sep}</text>
        <text x={569} y={196} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>{cur.sep}</text>
        {[[".", "dots"], ["/", "slashes"], ["-", "dashes"]].map((sp: string[], k: number) => (
          <Key key={"sep" + k} id={"sep-" + sp[1]} x={227 + k * 216} y={286} w={200} h={72} C={C} primary={cur.sep === sp[0]} onClick={() => setSep(sp[0])} label={sp[1]}>
            {glyph(tx(sp[1]), cur.sep === sp[0] ? "#FFFFFF" : C.ink)}
          </Key>
        ))}
        {fin ? <g pointerEvents="none">{[".", "/", "-"].map((s: string, k: number) => <text key={"fm" + k} x={327 + k * 216} y={406} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{it.answer.join(s)}</text>)}</g> : null}
        {asking && !own.some((x: string) => x) && !dm ? <Invite x={179} y={168} r={62} C={C} /> : null}
        {CC_MON3.map((mn: string, k: number) => {
          const x = 3 + k * 90, on = k === readM, target = dm && dm.read && k === m0 - 1 && !on;
          return (
            <g key={"ms" + k}>
              <rect x={x} y={432} width={84} height={92} rx={12} fill={on ? tint(CC_OLIVE, 0.45) : "#FFFFFF"} stroke={target ? C.accent : on ? shade(CC_OLIVE, 0.2) : C.rule} strokeWidth={target ? 4 : on ? 3 : 1.5} />
              <text x={x + 42} y={464} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(mn)}</text>
              {on && dd >= 1 && dd <= 31 ? <text x={x + 42} y={510} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{String(dd)}</text> : null}
              {target ? <text x={x + 42} y={510} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{String(d0)}</text> : null}
            </g>
          );
        })}
      </g>
    );
  };

  /* ── free play: the dial, the wall, the holiday shelf and the two end switches ── */
  const freeScreen = () => {
    const yr = cur.year;
    const fl: any[] = cur.flags.map((id: string) => CC_HOLIDAYS.find((h: any) => h.id === id)).filter(Boolean)
      .sort((a: any, b: any) => a.m * 40 + a.d - (b.m * 40 + b.d));
    const A = fl[0], B = fl[1], ao = A ? A.m * 40 + A.d : -1, bo = B ? B.m * 40 + B.d : -1;
    const day = (m: number, d: number) => {
      const o = m * 40 + d;
      if (o === ao) return B ? (cur.fIn ? "in" : "out") : "flag";
      if (o === bo) return cur.lIn ? "in" : "out";
      return A && B && o > ao && o < bo ? "in" : null;
    };
    const count = A && B ? Math.round((Date.UTC(yr, B.m, B.d) - Date.UTC(yr, A.m, A.d)) / 86400000) - 1 + (cur.fIn ? 1 : 0) + (cur.lIn ? 1 : 0) : null;
    const dd = drag.drag && drag.drag.moved && drag.drag.payload && drag.drag.payload.t === "hol" ? drag.drag : null;
    const FX = 592, own: string[] = cur.paths[yr] || [], gateTab = cur.tab !== "count";
    const step = (lab: string, id: string, x: number, w: number, d: number) => (
      <Key id={id} x={x} y={0} w={w} h={72} C={C} onClick={() => turn(d)} label={lab}>{glyph(lab)}</Key>
    );
    const holAt = (k: number) => ({ x: FX + (k % 2) * 255, y: 94 + Math.floor(k / 2) * 92 });
    const holCard = (h: any, k: number, on: boolean) => {
      const at = holAt(k);
      return (
        <g>
          <rect x={at.x} y={at.y} width={239} height={76} rx={14} fill={on ? tint(CC_OLIVE, 0.6) : "#FFFFFF"} stroke={on ? shade(CC_OLIVE, 0.2) : C.rule} strokeWidth={on ? 3 : 2} />
          <text x={at.x + 119} y={at.y + 32} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(h.name[0])}</text>
          <text x={at.x + 14} y={at.y + 64} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(h.name[1])}</text>
          <text x={at.x + 225} y={at.y + 64} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>{h.d + " " + tx(CC_MON3[h.m])}</text>
        </g>
      );
    };
    const two = (a: string, b: string) => (
      <g>
        <text textAnchor="middle" y={-7} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(a)}</text>
        <text textAnchor="middle" y={26} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(b)}</text>
      </g>
    );
    const tab = (id: string, lab: string, x: number, on: boolean) => (
      <Key id={id} x={x} y={0} w={239} h={72} C={C} primary={on} onClick={() => put({ tab: id === "tab-gate" ? "gate" : "count" })} label={lab}>{glyph(tx(lab), on ? "#FFFFFF" : C.ink)}</Key>
    );
    return (
      <g>
        {step("−100", "year-back-100", 0, 96, -100)}
        {step("−1", "year-back-1", 112, 72, -1)}
        {yearBox(200, 150, yr)}
        {step("+1", "year-on-1", 366, 72, 1)}
        {step("+100", "year-on-100", 454, 96, 100)}
        {CC_MON3.map((_: string, m: number) => <g key={"card" + m}>{small(m, yr, { day, fw: true, pins: fl.filter((h: any) => h.m === m).map((h: any) => h.d) })}</g>)}
        {tab("tab-gate", "gate", FX, gateTab)}
        {tab("tab-count", "count", FX + 255, !gateTab)}
        {gateTab ? gatePanel(630, 92, 116, 124, yr, own, own, true, false, 464) : null}
        {!gateTab ? CC_HOLIDAYS.map((h: any, k: number) => {
          const on = cur.flags.includes(h.id), away = dd && dd.payload.id === h.id, at = holAt(k);
          return (
            <g key={h.id} {...control("holiday-" + h.id, h.name.join(" ") + ", " + h.d + " " + CC_MONTHS[h.m])} {...drag.bind({ t: "hol", id: h.id })} {...drag.keys({ t: "hol", id: h.id })}>
              {away ? <rect x={at.x} y={at.y} width={239} height={76} rx={14} fill={tint(C.panel, 0.5)} stroke={C.rule} strokeWidth={2} strokeDasharray="8 8" /> : holCard(h, k, on)}
            </g>
          );
        }) : null}
        {!gateTab ? <Key id="first-end" x={FX} y={370} w={239} h={72} C={C} onClick={() => put({ fIn: !cur.fIn })} label="first day in or out">{two("first day", cur.fIn ? "in" : "out")}</Key> : null}
        {!gateTab ? <Key id="last-end" x={FX + 255} y={370} w={239} h={72} C={C} onClick={() => put({ lIn: !cur.lIn })} label="last day in or out">{two("last day", cur.lIn ? "in" : "out")}</Key> : null}
        {!gateTab ? <rect x={FX} y={463} width={494} height={65} rx={14} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} /> : null}
        {!gateTab ? <text x={FX + 24} y={505} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("days counted")}</text> : null}
        {!gateTab && count !== null ? <text x={FX + 470} y={507} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{String(count)}</text> : null}
        {dd ? <g pointerEvents="none" transform={"translate(" + (dd.x - holAt(CC_HOLIDAYS.findIndex((h: any) => h.id === dd.payload.id)).x - 119) + "," + (dd.y - holAt(CC_HOLIDAYS.findIndex((h: any) => h.id === dd.payload.id)).y - 38) + ")"}>
          {holCard(CC_HOLIDAYS.find((h: any) => h.id === dd.payload.id), CC_HOLIDAYS.findIndex((h: any) => h.id === dd.payload.id), true)}</g> : null}
      </g>
    );
  };

  return (
    <g>
      {kind === "sort" ? sortScreen() : kind === "weeks" ? weeksScreen() : kind === "weekday" ? weekdayScreen()
        : kind === "leapset" || kind === "febdays" || kind === "leapq" ? gateScreen()
        : kind === "between" || kind === "lastday" ? countScreen() : kind === "short" ? shortScreen() : kind === "free" ? freeScreen() : null}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last) return null;
  const a = last.answer, k = last.kind, cy = h / 2;
  const ink = C.ink, olive = tint(CC_OLIVE, 0.45), edge = shade(CC_OLIVE, 0.2);
  const label = (s: string, x: number, y = cy + 10) => <text x={x} y={y} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={ink}>{s}</text>;
  /* a month of tiles, one date ringed (the third Saturday) */
  const month = () => (
    <g>
      {Array.from({ length: 31 }, (_, d) => <rect key={d} x={10 + (d % 7) * 13} y={cy - 32 + Math.floor(d / 7) * 13} width={11} height={11} rx={2} fill={d === 20 ? edge : olive} />)}
      <circle cx={10 + 6 * 13 + 5.5} cy={cy - 32 + 2 * 13 + 5.5} r={10} fill="none" stroke={ink} strokeWidth={2.5} />
    </g>
  );
  /* the gate: three small yes/no switches down, each knob on the side the year takes; a box the year never
     reached is empty */
  const gatePath = (path: string[]) => (
    <g>
      {[0, 1, 2].map((j) => {
        const y = 4 + j * 26, on = path[j];
        return (
          <g key={j}>
            <rect x={8} y={y} width={64} height={22} rx={11} fill={on ? "#FFFFFF" : tint(C.panel, 0.3)} stroke={on ? ink : edge} strokeWidth={1.5} />
            {on ? <rect x={on === "yes" ? 10 : 40} y={y + 2} width={30} height={18} rx={9} fill={olive} /> : null}
            {on ? <circle cx={on === "yes" ? 30 : 50} cy={y + 11} r={7} fill={edge} stroke={ink} strokeWidth={1.2} /> : null}
          </g>
        );
      })}
    </g>
  );
  /* a strip of counted days (green), the last one ringed */
  const strip = () => (
    <g>
      {Array.from({ length: 8 }, (_, j) => <rect key={j} x={8 + j * 14} y={cy - 11} width={12} height={22} rx={3} fill={tint(CC_GREEN, 0.45)} stroke={j === 7 ? ink : "none"} strokeWidth={2.5} />)}
    </g>
  );
  let pic: any = null;
  if (k === "weekday") pic = <g>{month()}{label(a + " " + tx("March"), 168)}</g>;
  else if (k === "leapq" || k === "leapset" || k === "febdays") {
    const path = k === "leapq" ? ["yes", "yes", "no"] : k === "febdays" ? ["yes", "no"] : ["yes", "yes", "yes"];
    pic = k === "leapset" ? <g>{gatePath(path)}{label("1996 " + tx("and"), 154, cy - 6)}{label("1600", 154, cy + 28)}</g>
      : <g>{gatePath(path)}{label(k === "leapq" ? "1800: " + tx(String(a)) : a + " " + tx("days"), 154)}</g>;
  } else if (k === "between" || k === "lastday") pic = <g>{strip()}{label(k === "lastday" ? a + " " + tx("April") : a + " " + tx("days"), 178)}</g>;
  else if (k === "short" && Array.isArray(a)) {
    const bx = [[8, 48], [72, 48], [136, 92]];
    pic = (
      <g>
        {a.map((p: string, j: number) => (
          <g key={j}>
            <rect x={bx[j][0]} y={cy - 22} width={bx[j][1]} height={44} rx={8} fill="#FFFFFF" stroke={ink} strokeWidth={2} />
            <text x={bx[j][0] + bx[j][1] / 2} y={cy + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={ink}>{p}</text>
          </g>
        ))}
        <circle cx={64} cy={cy + 14} r={3} fill={ink} />
        <circle cx={128} cy={cy + 14} r={3} fill={ink} />
      </g>
    );
  } else if (k === "sort") {
    pic = (
      <g>
        {[["Jun", "30"], ["Aug", "31"]].map((r: string[], j: number) => (
          <g key={j}>
            <rect x={14} y={6 + j * 38} width={64} height={32} rx={8} fill={olive} stroke={edge} strokeWidth={1.5} />
            <text x={46} y={30 + j * 38} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={ink}>{tx(r[0])}</text>
            <text x={120} y={32 + j * 38} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={ink}>{r[1]}</text>
          </g>
        ))}
      </g>
    );
  } else if (k === "weeks") {
    pic = (
      <g>
        {[0, 1, 2, 3].map((j) => <rect key={j} x={12 + j * 16} y={cy - 26} width={12} height={52} rx={3} fill={olive} stroke={edge} strokeWidth={1.2} />)}
        <rect x={80} y={cy + 10} width={14} height={16} rx={3} fill={CC_YELLOW} stroke={ink} strokeWidth={2} />
        {label("52 " + tx("weeks"), 166, cy - 6)}
        {label("1 " + tx("day"), 166, cy + 28)}
      </g>
    );
  } else pic = label(String(last.value), w / 2);
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {pic}
    </g>
  );
}

function CalendarCounter(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default CalendarCounter;
