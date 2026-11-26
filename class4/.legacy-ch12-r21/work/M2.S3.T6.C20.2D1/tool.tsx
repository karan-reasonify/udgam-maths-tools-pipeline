/* ═══ M2.S3.T6.C20.2D1 · time_columns · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "time_columns";
const MEDIA_ID = "M2.S3.T6.C20.2D1";
const TOOL_NAME = "Time Columns";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A frame with three columns, hours, minutes and seconds. Where does each part go?"];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Each part under its heading, each sixty carried, and each broken hour opened into sixty minutes.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Add or take away times in the frame, with the gates, the break and the check open.";

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, and the runtime looks each spoken or drawn line up in it.
   Fill it AFTER the English is final and reviewed (`node cli.mjs voice` lists every line still missing),
   then bake the voice. Empty = the tool runs in English only. */
const TR: any = {
  hi: {
    "Time Columns": "समय के स्तंभ",
    "A frame with three columns, hours, minutes and seconds. Where does each part go?": "तीन स्तंभों वाला एक ढाँचा: घंटे, मिनट और सेकंड। हर भाग कहाँ जाएगा?",
    "Each part under its heading, each sixty carried, and each broken hour opened into sixty minutes.": "हर भाग अपने शीर्षक के नीचे, हर साठ हासिल बनकर आगे गया, और हर तोड़ा घंटा साठ मिनट में खुला।",
    "Free play. Add or take away times in the frame, with the gates, the break and the check open.": "मुक्त खेल। ढाँचे में समय जोड़ो या घटाओ, साठ के द्वार, तोड़ो और जाँचो सब खुले हैं।",
    /* phase 1 */
    "A column for each unit": "हर मात्रक का अपना स्तंभ",
    "Put each part under its own heading. Which column do you add first?": "हर भाग को उसके अपने शीर्षक के नीचे रखो। तुम पहले कौन-सा स्तंभ जोड़ोगे?",
    "Read the unit word after each number and find that heading.": "हर संख्या के बाद मात्रक का शब्द पढ़ो और वही शीर्षक ढूँढो।",
    "Each column holds one unit, and the smallest unit is on the right.": "हर स्तंभ में एक मात्रक है, और सबसे छोटा मात्रक दाईं ओर है।",
    "Write each unit in its own column and add the smallest unit first.": "हर मात्रक उसके अपने स्तंभ में लिखो और सबसे छोटा मात्रक पहले जोड़ो।",
    "You learned: each unit has its own column; add the smallest unit first.": "तुमने सीखा: हर मात्रक का अपना स्तंभ है; सबसे छोटा मात्रक पहले जोड़ो।",
    "Add 2 hours 25 minutes 10 seconds and 5 hours 14 minutes 38 seconds.": "2 घंटे 25 मिनट 10 सेकंड और 5 घंटे 14 मिनट 38 सेकंड जोड़ो।",
    "Add the two times.": "दोनों समय जोड़ो।",
    "Where do the seconds of both times stand?": "दोनों समयों के सेकंड किस स्तंभ में हैं?",
    "Add 3 hours 20 minutes and 5 hours 16 minutes.": "3 घंटे 20 मिनट और 5 घंटे 16 मिनट जोड़ो।",
    "Add these.": "इन्हें जोड़ो।",
    "Which heading do the 20 and the 16 stand under?": "20 और 16 किस शीर्षक के नीचे आते हैं?",
    "Write the time 5 hours 7 minutes 42 seconds in the frame. What goes under each heading?": "समय 5 घंटे 7 मिनट 42 सेकंड ढाँचे में लिखो। हर शीर्षक के नीचे क्या आएगा?",
    "Write it in columns.": "स्तंभों में लिखो।",
    "Minutes take two places. Which place does the 7 belong in?": "मिनट दो स्थान लेते हैं। 7 किस स्थान में जाएगा?",
    /* phase 2 */
    "Sixty or more carries": "साठ या ज़्यादा हो तो हासिल",
    "The minutes make sixty or more. What goes over to the hours, and what is left?": "मिनट साठ या उससे ज़्यादा बनते हैं। घंटों में क्या जाएगा, और क्या बचेगा?",
    "Is the minutes total sixty or more?": "क्या मिनटों का जोड़ साठ या उससे ज़्यादा है?",
    "Take sixty out as one hour, then write the minutes that stay.": "साठ को एक घंटा बनाकर निकालो, फिर बचे मिनट लिखो।",
    "Every sixty minutes went over as one hour, even exactly sixty.": "हर साठ मिनट एक घंटा बनकर आगे गए, ठीक साठ भी।",
    "You learned: sixty or more minutes carry one hour.": "तुमने सीखा: साठ या ज़्यादा मिनट से एक घंटा हासिल आता है।",
    "Add 6 hours 48 minutes and 2 hours 37 minutes.": "6 घंटे 48 मिनट और 2 घंटे 37 मिनट जोड़ो।",
    "Add the times.": "समय जोड़ो।",
    "What do the minutes add up to?": "मिनटों का जोड़ कितना है?",
    "Add 1 hour 30 minutes and 2 hours 30 minutes.": "1 घंटा 30 मिनट और 2 घंटे 30 मिनट जोड़ो।",
    "Is exactly sixty minutes an hour as well?": "क्या ठीक साठ मिनट भी एक घंटा है?",
    "A child reads for 1 hour 40 minutes, then 2 hours 25 minutes, then 55 minutes. How long is that in all?": "एक बच्चा 1 घंटा 40 मिनट, फिर 2 घंटे 25 मिनट, फिर 55 मिनट पढ़ता है। कुल कितना समय हुआ?",
    "Add all three.": "तीनों जोड़ो।",
    "After one hour goes over, are the minutes still sixty or more?": "एक घंटा आगे जाने के बाद भी क्या मिनट साठ या ज़्यादा हैं?",
    /* phase 3 */
    "Borrowing an hour": "एक घंटा उधार लेना",
    "There are not enough minutes on top. What can one hour give you?": "ऊपर मिनट कम हैं। एक घंटा तुम्हें क्या दे सकता है?",
    "Break one from the column on the left of the short one.": "कम वाले स्तंभ के बाईं ओर के स्तंभ से एक तोड़ो।",
    "The short column gets sixty more. Now take away each column.": "कम वाले स्तंभ को साठ और मिलते हैं। अब हर स्तंभ घटाओ।",
    "When the minutes on top are too few, break one hour into sixty minutes and take one off the hours.": "जब ऊपर मिनट कम हों, एक घंटे को साठ मिनट में तोड़ो और घंटों में से एक घटाओ।",
    "You learned: when the top is short, break an hour into sixty minutes.": "तुमने सीखा: ऊपर कम हो, तो एक घंटे को साठ मिनट में तोड़ो।",
    "Take 3 hours 50 minutes away from 8 hours 25 minutes.": "8 घंटे 25 मिनट में से 3 घंटे 50 मिनट घटाओ।",
    "Take away.": "घटाओ।",
    "Can 25 minutes on top give 50?": "क्या ऊपर के 25 मिनट में से 50 घट सकते हैं?",
    "Take 1 hour 47 minutes away from 5 hours 20 minutes.": "5 घंटे 20 मिनट में से 1 घंटा 47 मिनट घटाओ।",
    "Take this away.": "इसे घटाओ।",
    "Which minutes are on top, and which are below?": "कौन-से मिनट ऊपर हैं, और कौन-से नीचे?",
    "A runner's best time was 1 hour 12 minutes 5 seconds. A new run takes 1 hour 11 minutes 38 seconds. By how much is the best time beaten?": "एक धावक का सबसे अच्छा समय 1 घंटा 12 मिनट 5 सेकंड था। नई दौड़ में 1 घंटा 11 मिनट 38 सेकंड लगे। सबसे अच्छा समय कितने से टूटा?",
    "By how much?": "कितने से?",
    "Here the seconds are short, not the minutes. Which column can give?": "यहाँ मिनट नहीं, सेकंड कम हैं। कौन-सा स्तंभ दे सकता है?",
    /* phase 4 */
    "Borrowing across an empty column": "खाली स्तंभ के पार उधार",
    "The minutes and seconds on top are empty. How can one hour fill both?": "ऊपर मिनट और सेकंड खाली हैं। एक घंटा दोनों को कैसे भर सकता है?",
    "First break the hour into sixty minutes.": "पहले घंटे को साठ मिनट में तोड़ो।",
    "Then open one of those minutes into sixty seconds.": "फिर उन मिनटों में से एक को साठ सेकंड में खोलो।",
    "Across two empty columns, one hour breaks into fifty-nine minutes and sixty seconds.": "दो खाली स्तंभों के पार, एक घंटा उनसठ मिनट और साठ सेकंड में टूटता है।",
    "You learned: an hour can fill two empty columns at once.": "तुमने सीखा: एक घंटा दो खाली स्तंभ एक साथ भर सकता है।",
    "Take 2 hours 36 minutes 45 seconds away from 6 hours.": "6 घंटे में से 2 घंटे 36 मिनट 45 सेकंड घटाओ।",
    "Take it away.": "घटा दो।",
    "Can the empty seconds on top give 45 seconds?": "क्या ऊपर के खाली सेकंड 45 सेकंड दे सकते हैं?",
    "Take 4 hours 18 minutes 50 seconds away from 9 hours.": "9 घंटे में से 4 घंटे 18 मिनट 50 सेकंड घटाओ।",
    "After the double break, how many minutes stay on top?": "दो बार तोड़ने के बाद ऊपर कितने मिनट रहते हैं?",
    "A film runs for 3 hours. The film has played for 1 hour 25 minutes 40 seconds. How long is left?": "एक फ़िल्म 3 घंटे चलती है। फ़िल्म 1 घंटा 25 मिनट 40 सेकंड चल चुकी है। कितना समय बचा है?",
    "How long is left?": "कितना समय बचा?",
    "Can one hour give sixty minutes and sixty more seconds?": "क्या एक घंटा साठ मिनट और ऊपर से साठ सेकंड दे सकता है?",
    /* what the working area, the slot's boxes and the summary drawing show */
    "hours": "घंटे", "hour": "घंटा", "minutes": "मिनट", "minute": "मिनट", "seconds": "सेकंड", "second": "सेकंड",
    "min": "मिनट", "sec": "सेकंड", "sixty": "साठ", "columns": "स्तंभ", "steps": "चरण",
    "break": "तोड़ो", "double break": "दो बार तोड़ो", "check": "जाँचो", "add": "जोड़ो", "take away": "घटाओ", "new times": "नए समय",
    "added back": "वापस जोड़ा", "top line": "ऊपर का समय", "one minute too many": "एक मिनट ज़्यादा",
  },
  gu: {
    "Time Columns": "સમયના સ્તંભ",
    "A frame with three columns, hours, minutes and seconds. Where does each part go?": "ત્રણ સ્તંભવાળું એક ચોકઠું: કલાક, મિનિટ અને સેકન્ડ. દરેક ભાગ ક્યાં જશે?",
    "Each part under its heading, each sixty carried, and each broken hour opened into sixty minutes.": "દરેક ભાગ પોતાના મથાળા નીચે, દરેક સાઠ વદી બનીને આગળ ગયા, અને દરેક તોડેલો કલાક સાઠ મિનિટમાં ખૂલ્યો.",
    "Free play. Add or take away times in the frame, with the gates, the break and the check open.": "મુક્ત રમત. ચોકઠામાં સમય ઉમેરો કે બાદ કરો, સાઠના દરવાજા, તોડો અને ચકાસો બધું ખુલ્લું છે.",
    /* phase 1 */
    "A column for each unit": "દરેક એકમનો પોતાનો સ્તંભ",
    "Put each part under its own heading. Which column do you add first?": "દરેક ભાગને તેના પોતાના મથાળા નીચે મૂકો. તમે પહેલાં કયો સ્તંભ ઉમેરશો?",
    "Read the unit word after each number and find that heading.": "દરેક સંખ્યા પછીનો એકમનો શબ્દ વાંચો અને એ જ મથાળું શોધો.",
    "Each column holds one unit, and the smallest unit is on the right.": "દરેક સ્તંભમાં એક એકમ છે, અને સૌથી નાનો એકમ જમણી બાજુ છે.",
    "Write each unit in its own column and add the smallest unit first.": "દરેક એકમ તેના પોતાના સ્તંભમાં લખો અને સૌથી નાનો એકમ પહેલાં ઉમેરો.",
    "You learned: each unit has its own column; add the smallest unit first.": "તમે શીખ્યા: દરેક એકમનો પોતાનો સ્તંભ; સૌથી નાનો એકમ પહેલાં ઉમેરો.",
    "Add 2 hours 25 minutes 10 seconds and 5 hours 14 minutes 38 seconds.": "2 કલાક 25 મિનિટ 10 સેકન્ડ અને 5 કલાક 14 મિનિટ 38 સેકન્ડ ઉમેરો.",
    "Add the two times.": "બંને સમય ઉમેરો.",
    "Where do the seconds of both times stand?": "બંને સમયની સેકન્ડ કયા સ્તંભમાં છે?",
    "Add 3 hours 20 minutes and 5 hours 16 minutes.": "3 કલાક 20 મિનિટ અને 5 કલાક 16 મિનિટ ઉમેરો.",
    "Add these.": "આને ઉમેરો.",
    "Which heading do the 20 and the 16 stand under?": "20 અને 16 કયા મથાળા નીચે આવે?",
    "Write the time 5 hours 7 minutes 42 seconds in the frame. What goes under each heading?": "સમય 5 કલાક 7 મિનિટ 42 સેકન્ડ ચોકઠામાં લખો. દરેક મથાળા નીચે શું આવશે?",
    "Write it in columns.": "સ્તંભોમાં લખો.",
    "Minutes take two places. Which place does the 7 belong in?": "મિનિટ બે સ્થાન લે છે. 7 કયા સ્થાનમાં જશે?",
    /* phase 2 */
    "Sixty or more carries": "સાઠ કે વધુ થાય તો વદી",
    "The minutes make sixty or more. What goes over to the hours, and what is left?": "મિનિટ સાઠ કે વધુ થાય છે. કલાકમાં શું જશે, અને શું બાકી રહેશે?",
    "Is the minutes total sixty or more?": "શું મિનિટનો સરવાળો સાઠ કે વધુ છે?",
    "Take sixty out as one hour, then write the minutes that stay.": "સાઠને એક કલાક તરીકે કાઢો, પછી બાકી રહેલી મિનિટ લખો.",
    "Every sixty minutes went over as one hour, even exactly sixty.": "દરેક સાઠ મિનિટ એક કલાક બનીને આગળ ગઈ, બરાબર સાઠ પણ.",
    "You learned: sixty or more minutes carry one hour.": "તમે શીખ્યા: સાઠ કે વધુ મિનિટમાંથી એક કલાક વદી આવે.",
    "Add 6 hours 48 minutes and 2 hours 37 minutes.": "6 કલાક 48 મિનિટ અને 2 કલાક 37 મિનિટ ઉમેરો.",
    "Add the times.": "સમય ઉમેરો.",
    "What do the minutes add up to?": "મિનિટનો સરવાળો કેટલો થાય?",
    "Add 1 hour 30 minutes and 2 hours 30 minutes.": "1 કલાક 30 મિનિટ અને 2 કલાક 30 મિનિટ ઉમેરો.",
    "Is exactly sixty minutes an hour as well?": "શું બરાબર સાઠ મિનિટ પણ એક કલાક છે?",
    "A child reads for 1 hour 40 minutes, then 2 hours 25 minutes, then 55 minutes. How long is that in all?": "એક બાળક 1 કલાક 40 મિનિટ, પછી 2 કલાક 25 મિનિટ, પછી 55 મિનિટ વાંચે છે. કુલ કેટલો સમય થયો?",
    "Add all three.": "ત્રણેય ઉમેરો.",
    "After one hour goes over, are the minutes still sixty or more?": "એક કલાક આગળ ગયા પછી પણ મિનિટ સાઠ કે વધુ છે?",
    /* phase 3 */
    "Borrowing an hour": "એક કલાક ઉછીનો લેવો",
    "There are not enough minutes on top. What can one hour give you?": "ઉપર મિનિટ ઓછી છે. એક કલાક તમને શું આપી શકે?",
    "Break one from the column on the left of the short one.": "ઓછા સ્તંભની ડાબી બાજુના સ્તંભમાંથી એક તોડો.",
    "The short column gets sixty more. Now take away each column.": "ઓછા સ્તંભને સાઠ વધુ મળે છે. હવે દરેક સ્તંભ બાદ કરો.",
    "When the minutes on top are too few, break one hour into sixty minutes and take one off the hours.": "જ્યારે ઉપર મિનિટ ઓછી હોય, એક કલાકને સાઠ મિનિટમાં તોડો અને કલાકમાંથી એક ઓછો કરો.",
    "You learned: when the top is short, break an hour into sixty minutes.": "તમે શીખ્યા: ઉપર ઓછું હોય તો એક કલાકને સાઠ મિનિટમાં તોડો.",
    "Take 3 hours 50 minutes away from 8 hours 25 minutes.": "8 કલાક 25 મિનિટમાંથી 3 કલાક 50 મિનિટ બાદ કરો.",
    "Take away.": "બાદ કરો.",
    "Can 25 minutes on top give 50?": "શું ઉપરની 25 મિનિટમાંથી 50 બાદ થાય?",
    "Take 1 hour 47 minutes away from 5 hours 20 minutes.": "5 કલાક 20 મિનિટમાંથી 1 કલાક 47 મિનિટ બાદ કરો.",
    "Take this away.": "આ બાદ કરો.",
    "Which minutes are on top, and which are below?": "કઈ મિનિટ ઉપર છે, અને કઈ નીચે?",
    "A runner's best time was 1 hour 12 minutes 5 seconds. A new run takes 1 hour 11 minutes 38 seconds. By how much is the best time beaten?": "એક દોડવીરનો સૌથી સારો સમય 1 કલાક 12 મિનિટ 5 સેકન્ડ હતો. નવી દોડમાં 1 કલાક 11 મિનિટ 38 સેકન્ડ લાગી. સૌથી સારો સમય કેટલાથી તૂટ્યો?",
    "By how much?": "કેટલાથી?",
    "Here the seconds are short, not the minutes. Which column can give?": "અહીં મિનિટ નહીં, સેકન્ડ ઓછી છે. કયો સ્તંભ આપી શકે?",
    /* phase 4 */
    "Borrowing across an empty column": "ખાલી સ્તંભની પેલે પારથી ઉછીનું",
    "The minutes and seconds on top are empty. How can one hour fill both?": "ઉપર મિનિટ અને સેકન્ડ ખાલી છે. એક કલાક બંનેને કેવી રીતે ભરી શકે?",
    "First break the hour into sixty minutes.": "પહેલાં કલાકને સાઠ મિનિટમાં તોડો.",
    "Then open one of those minutes into sixty seconds.": "પછી એ મિનિટમાંથી એકને સાઠ સેકન્ડમાં ખોલો.",
    "Across two empty columns, one hour breaks into fifty-nine minutes and sixty seconds.": "બે ખાલી સ્તંભો પાર, એક કલાક ઓગણસાઠ મિનિટ અને સાઠ સેકન્ડમાં તૂટે છે.",
    "You learned: an hour can fill two empty columns at once.": "તમે શીખ્યા: એક કલાક બે ખાલી સ્તંભ એકસાથે ભરી શકે.",
    "Take 2 hours 36 minutes 45 seconds away from 6 hours.": "6 કલાકમાંથી 2 કલાક 36 મિનિટ 45 સેકન્ડ બાદ કરો.",
    "Take it away.": "બાદ કરી દો.",
    "Can the empty seconds on top give 45 seconds?": "શું ઉપરની ખાલી સેકન્ડ 45 સેકન્ડ આપી શકે?",
    "Take 4 hours 18 minutes 50 seconds away from 9 hours.": "9 કલાકમાંથી 4 કલાક 18 મિનિટ 50 સેકન્ડ બાદ કરો.",
    "After the double break, how many minutes stay on top?": "બે વાર તોડ્યા પછી ઉપર કેટલી મિનિટ રહે?",
    "A film runs for 3 hours. The film has played for 1 hour 25 minutes 40 seconds. How long is left?": "એક ફિલ્મ 3 કલાક ચાલે છે. ફિલ્મ 1 કલાક 25 મિનિટ 40 સેકન્ડ ચાલી ગઈ છે. કેટલો સમય બાકી છે?",
    "How long is left?": "કેટલો સમય બાકી?",
    "Can one hour give sixty minutes and sixty more seconds?": "શું એક કલાક સાઠ મિનિટ અને ઉપરથી સાઠ સેકન્ડ આપી શકે?",
    /* what the working area, the slot's boxes and the summary drawing show */
    "hours": "કલાક", "hour": "કલાક", "minutes": "મિનિટ", "minute": "મિનિટ", "seconds": "સેકન્ડ", "second": "સેકન્ડ",
    "min": "મિનિટ", "sec": "સેકન્ડ", "sixty": "સાઠ", "columns": "સ્તંભ", "steps": "પગલાં",
    "break": "તોડો", "double break": "બે વાર તોડો", "check": "ચકાસો", "add": "ઉમેરો", "take away": "બાદ કરો", "new times": "નવા સમય",
    "added back": "પાછું ઉમેર્યું", "top line": "ઉપરનો સમય", "one minute too many": "એક મિનિટ વધારે",
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
/* the slot: one box a unit, one spelling in every item. "minutes" and "seconds" in full do not fit a box of
   three (108 wide: the label runs into the next box and past the slot's edge), so min and sec, as the book
   writes them short. `free` marks a box whose answer is 0: it may be left blank (read as 0) there and only
   there; the slot looks the same either way */
const TC_PARTS3 = [{ label: "hours" }, { label: "min" }, { label: "sec" }];
const TC_PARTS2 = [{ label: "hours" }, { label: "min" }];
const TC_PARTS2_M0 = [{ label: "hours" }, { label: "min", free: true }];
const TC_PARTS3_HM0 = [{ label: "hours", free: true }, { label: "min", free: true }, { label: "sec" }];

/* An item's own fields: kind "add" | "sub" | "write" (one time written in the frame), units "hms" or "hm"
   (the columns the sum uses), rows = the times in the frame, top first, as [hours, minutes, seconds]
   (null = that part is not in the time; 0 = an empty column written 00), near = the misconception */
const PHASES = [
  {
    n: 1,
    concept: "A column for each unit",
    conceptId: "M2.S3.T6.C20", objectiveIds: ["O9"],
    says: ["Put each part under its own heading. Which column do you add first?"],
    /* tries: rung 1 the item's miss; rungs 2 and 3 a new step each (the plan's rung 3 is a cut-down frame,
       spoken here as the method, since a spoken line is for the child) */
    ladder: ["Read the unit word after each number and find that heading.", "Each column holds one unit, and the smallest unit is on the right."],
    closing: "Write each unit in its own column and add the smallest unit first.",
    learned: "You learned: each unit has its own column; add the smallest unit first.",
    traceback: "The parts settle under their own headings, the columns are added from the seconds, and the answer line reads the whole time.",
    items: [
      /* learn ML1: answer in the plan = 7 hours 39 minutes 48 seconds */
      { qid: "M2.S3.T6.C20:ML1", kind: "add", units: "hms", rows: [[2, 25, 10], [5, 14, 38]], parts: TC_PARTS3, answer: [7, 39, 48], near: "7|48|39", winMs: 2400,
        say: "Add 2 hours 25 minutes 10 seconds and 5 hours 14 minutes 38 seconds.", ask: "Add the two times.", miss: "Where do the seconds of both times stand?" },
      /* practice 1: answer in the plan = 8 hours 36 minutes */
      { qid: "M2.S3.T6.C20:1", kind: "add", units: "hm", rows: [[3, 20, null], [5, 16, null]], parts: TC_PARTS2, answer: [8, 36], near: "36|8", winMs: 2400,
        say: "Add 3 hours 20 minutes and 5 hours 16 minutes.", ask: "Add these.", miss: "Which heading do the 20 and the 16 stand under?" },
      /* practice 2: answer in the plan = 5 under hours, 07 under minutes and 42 under seconds */
      { qid: "M2.S3.T6.C20:2", kind: "write", units: "hms", rows: [[5, 7, 42]], parts: TC_PARTS3, answer: [5, 7, 42], near: "5|70|42", winMs: 2400,
        say: "Write the time 5 hours 7 minutes 42 seconds in the frame. What goes under each heading?", ask: "Write it in columns.", miss: "Minutes take two places. Which place does the 7 belong in?" },
    ],
  },
  {
    n: 2,
    concept: "Sixty or more carries",
    conceptId: "M2.S3.T6.C21", objectiveIds: ["O9"],
    says: ["The minutes make sixty or more. What goes over to the hours, and what is left?"],
    ladder: ["Is the minutes total sixty or more?", "Take sixty out as one hour, then write the minutes that stay."],
    closing: "Every sixty minutes went over as one hour, even exactly sixty.",
    learned: "You learned: sixty or more minutes carry one hour.",
    traceback: "The minutes add up, the sixty gate lights, sixty cells roll into the carry circle as one hour, and what is left goes down in two places.",
    items: [
      /* learn ML2: answer in the plan = 9 hours 25 minutes */
      { qid: "M2.S3.T6.C21:ML2", kind: "add", units: "hm", rows: [[6, 48, null], [2, 37, null]], parts: TC_PARTS2, answer: [9, 25], near: "8|85", winMs: 2400,
        say: "Add 6 hours 48 minutes and 2 hours 37 minutes.", ask: "Add the times.", miss: "What do the minutes add up to?" },
      /* practice 3: answer in the plan = 4 hours. The minutes make exactly 60, which carries one hour and leaves 00 minutes */
      { qid: "M2.S3.T6.C21:3", kind: "add", units: "hm", rows: [[1, 30, null], [2, 30, null]], parts: TC_PARTS2_M0, answer: [4, 0], near: "3|60", winMs: 2400,
        say: "Add 1 hour 30 minutes and 2 hours 30 minutes.", ask: "Add these.", miss: "Is exactly sixty minutes an hour as well?" },
      /* practice 4 (1 minute 23 seconds) is left out: three questions a phase, and the plan's own wrong
         answers are written for ML2, practice 3 and practice 5 */
      /* practice 5: answer in the plan = 5 hours. The minutes make 120, which carries 2 hours and leaves 00, and 1 and 2 and 2 make 5 hours */
      { qid: "M2.S3.T6.C21:5", kind: "add", units: "hm", rows: [[1, 40, null], [2, 25, null], [null, 55, null]], parts: TC_PARTS2_M0, answer: [5, 0], near: "4|60", winMs: 2400,
        say: "A child reads for 1 hour 40 minutes, then 2 hours 25 minutes, then 55 minutes. How long is that in all?", ask: "Add all three.", miss: "After one hour goes over, are the minutes still sixty or more?" },
    ],
  },
  {
    n: 3,
    concept: "Borrowing an hour",
    conceptId: "M2.S3.T6.C22", objectiveIds: ["O10"],
    says: ["There are not enough minutes on top. What can one hour give you?"],
    ladder: ["Break one from the column on the left of the short one.", "The short column gets sixty more. Now take away each column."],
    closing: "When the minutes on top are too few, break one hour into sixty minutes and take one off the hours.",
    learned: "You learned: when the top is short, break an hour into sixty minutes.",
    traceback: "The break strikes the figure on the left of the short column and writes one less in wine, sixty cells pour into the short column, and each column takes away.",
    items: [
      /* learn ML3: answer in the plan = 4 hours 35 minutes */
      { qid: "M2.S3.T6.C22:ML3", kind: "sub", units: "hm", rows: [[8, 25, null], [3, 50, null]], parts: TC_PARTS2, answer: [4, 35], near: "5|25", winMs: 2400,
        say: "Take 3 hours 50 minutes away from 8 hours 25 minutes.", ask: "Take away.", miss: "Can 25 minutes on top give 50?" },
      /* practice 6: answer in the plan = 3 hours 33 minutes */
      { qid: "M2.S3.T6.C22:6", kind: "sub", units: "hm", rows: [[5, 20, null], [1, 47, null]], parts: TC_PARTS2, answer: [3, 33], near: "4|27", winMs: 2400,
        say: "Take 1 hour 47 minutes away from 5 hours 20 minutes.", ask: "Take this away.", miss: "Which minutes are on top, and which are below?" },
      /* practice 7: answer in the plan = 27 seconds. Break one minute into 60 seconds: 65 less 38 is 27 seconds, and the minutes and hours then match */
      { qid: "M2.S3.T6.C22:7", kind: "sub", units: "hms", rows: [[1, 12, 5], [1, 11, 38]], parts: TC_PARTS3_HM0, answer: [0, 0, 27], near: "0|1|33", winMs: 2400,
        say: "A runner's best time was 1 hour 12 minutes 5 seconds. A new run takes 1 hour 11 minutes 38 seconds. By how much is the best time beaten?", ask: "By how much?", miss: "Here the seconds are short, not the minutes. Which column can give?" },
    ],
  },
  {
    n: 4,
    concept: "Borrowing across an empty column",
    conceptId: "M2.S3.T6.C23", objectiveIds: ["O10"],
    says: ["The minutes and seconds on top are empty. How can one hour fill both?"],
    ladder: ["First break the hour into sixty minutes.", "Then open one of those minutes into sixty seconds."],
    closing: "Across two empty columns, one hour breaks into fifty-nine minutes and sixty seconds.",
    learned: "You learned: an hour can fill two empty columns at once.",
    traceback: "The double break opens one hour into fifty-nine minutes and sixty seconds, each column takes away, and the answer line reads the whole time.",
    items: [
      /* learn ML4: answer in the plan = 3 hours 23 minutes 15 seconds */
      { qid: "M2.S3.T6.C23:ML4", kind: "sub", units: "hms", rows: [[6, 0, 0], [2, 36, 45]], parts: TC_PARTS3, answer: [3, 23, 15], near: "3|24|15", winMs: 2400,
        say: "Take 2 hours 36 minutes 45 seconds away from 6 hours.", ask: "Take it away.", miss: "Can the empty seconds on top give 45 seconds?" },
      /* practice 8: answer in the plan = 4 hours 41 minutes 10 seconds, because 9 hours is 8 hours 59 minutes 60 seconds */
      { qid: "M2.S3.T6.C23:8", kind: "sub", units: "hms", rows: [[9, 0, 0], [4, 18, 50]], parts: TC_PARTS3, answer: [4, 41, 10], near: "4|42|10", winMs: 2400,
        say: "Take 4 hours 18 minutes 50 seconds away from 9 hours.", ask: "Take this away.", miss: "After the double break, how many minutes stay on top?" },
      /* authored: the plan has two questions here and none of its others borrows across empty columns;
         3 hours is 2 hours 59 minutes 60 seconds, so 3 h less 1 h 25 min 40 s is 1 h 34 min 20 s */
      { qid: null, kind: "sub", units: "hms", rows: [[3, 0, 0], [1, 25, 40]], parts: TC_PARTS3, answer: [1, 34, 20], near: "1|35|20", winMs: 2400,
        say: "A film runs for 3 hours. The film has played for 1 hour 25 minutes 40 seconds. How long is left?", ask: "How long is left?", miss: "Can one hour give sixty minutes and sixty more seconds?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  columns: ["hours", "minutes", "seconds"], gate: 60, cellPanel: { rows: 6, cols: 10 },
  frame: { x: 12, y: 98, w: 600, h: 428, columnWidth: 180 }, cellBox: { x: 636, y: 98, w: 440, h: 228 },
  controls: { break: { x: 636, y: 342, w: 290, h: 72 }, check: { x: 942, y: 342, w: 134, h: 72 } }, checkStrip: { x: 636, y: 430, w: 440, h: 96 },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? Each box is read by its value: the frame draws the two places,
   so 7 and 07 are the same seven minutes, and 70 (the seven in the first place) is not. A blank box is 0
   only where the part is `free` (its answer is 0); a blank box anywhere else is never right */
const judge = (item: any, v: any) => {
  if (item.parts) {
    const ps = slotPartsOf(v, item.parts.length);
    return ps.some((p: string) => p !== "") && item.parts.every((p: any, k: number) =>
      (ps[k] === "" ? !!p.free && item.answer[k] === 0 : Number(ps[k]) === item.answer[k]));
  }
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work: each time is
   turned into seconds, added or taken away as one number, and turned back into hours, minutes and seconds */
const oracle = () => PHASES.every((p: any) => p.items.length === 3 && p.items.every((it: any) => {
  const inSeconds = (r: any[]) => ((r[0] || 0) * 60 + (r[1] || 0)) * 60 + (r[2] || 0);
  const all = it.kind === "sub" ? inSeconds(it.rows[0]) - inSeconds(it.rows[1]) : it.rows.reduce((a: number, r: any[]) => a + inSeconds(r), 0);
  const hms = [Math.floor(all / 3600), Math.floor((all % 3600) / 60), all % 60];
  const want = it.units === "hm" ? hms.slice(0, 2) : hms;
  return all >= 0 && (it.units !== "hm" || hms[2] === 0) && want.length === it.answer.length && want.every((x: number, k: number) => x === it.answer[k]);
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => (item.near !== undefined ? item.near : item.parts ? item.answer.map((x: any, k: number, a: any[]) => (x !== null && a.slice(k + 1).every((y: any) => y === null) ? x + 1 : x ?? "")).join("|")
  : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print (a "write" item is a build target:
   the time it names IS the question, and what is asked is where each part goes) */
const answerForms = (item: any) => (item.kind === "write" ? []
  : item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
  : /^\d*\.\d+$/.test(String(item.answer)) ? [String(item.answer), speakable(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
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
/* ── the frame's own arithmetic and colours (every name starts tc / TC_, so none meets the runtime's) ── */
const TC_U = ["h", "m", "s"];
const TC_COL: any = { h: CONTENT.pointer, m: CONTENT.hundred, s: CONTENT.bead };   /* vermilion, deep blue, reddish purple */
const TC_PAINT: any = { h: "gPointer", m: "gHundred", s: "gBead" };
/* coloured numerals and words: a deeper ink of the column's colour (the light purple needs a little more) */
const TC_INK: any = { h: shade(CONTENT.pointer, 0.25), m: shade(CONTENT.hundred, 0.25), s: shade(CONTENT.bead, 0.38) };
const TC_WINE = "#882255";   /* a carried or broken unit, and every figure it rewrites */
const TC_ZERO = "#767676";   /* a nought that holds a place */
const TC_HEAD: any = { h: "hours", m: "minutes", s: "seconds" };
const TC_ONE: any = { h: "hour", m: "minute", s: "second" };
const TC_LEFT: any = { m: "h", s: "m" };
const TC_X: any = { h: 72, m: 252, s: 432 };    /* a column's left edge; each column is 180 wide */
const TC_CX: any = { h: 162, m: 342, s: 522 };  /* a column's centre */
const TC_ROW0 = 190, TC_ROWH = 56;               /* the first time's line in the frame, and the line height */
const TC_TOP = 98, TC_BOT = 526;                 /* the frame's top and bottom edges */
/* free play: times to add, and times to take away (the larger time on top) */
const TC_FREE: any = {
  add: [[[1, 45, 30], [2, 25, 50]], [[3, 35, 0], [2, 25, 0]], [[2, 48, 15], [1, 37, 45]], [[4, 20, 35], [3, 39, 25]]],
  sub: [[[5, 0, 0], [2, 35, 20]], [[4, 15, 10], [1, 40, 35]], [[3, 20, 45], [1, 50, 30]], [[6, 5, 0], [2, 40, 15]]],
};
const tcVal = (row: any[], c: string) => (row ? row[TC_U.indexOf(c)] : null);
const tcNum = (v: any) => (v === null || v === undefined || v === "" ? 0 : Number(v));
const tcPad = (v: number) => (v < 10 ? "0" + v : String(v));
/* a value in the two places of a column, filled from the right ("7" -> ["", "7"]); null when it needs three */
const tcPlaces = (s: string) => (s.length > 2 ? null : [s.length === 2 ? s[0] : "", s.length ? s[s.length - 1] : ""]);
/* the tops once the breaks are made: a break takes one from the column on the left and gives it sixty */
const tcTops = (rows: any[], breaks: any[]) => {
  const t: any = {};
  TC_U.forEach((c) => (t[c] = tcNum(tcVal(rows[0], c))));
  breaks.forEach((b: any) => { t[b.from] -= 1; t[b.to] += 60; });
  return t;
};
/* the next break a taking-away needs, the column on the right first: one break, the double break across an
   empty column (one hour into minutes, then one of those minutes into seconds), or null */
const tcBreakPlan = (rows: any[], U: string[], breaks: any[]) => {
  const t = tcTops(rows, breaks);
  for (let k = U.length - 1; k > 0; k--) {
    const c = U[k];
    if (t[c] >= tcNum(tcVal(rows[1], c))) continue;
    const l = U[k - 1], ll = U[k - 2];
    if (t[l] > 0) return [{ from: l, to: c }];
    if (ll && t[ll] > 0) return [{ from: ll, to: l }, { from: l, to: c }];
    return null;
  }
  return null;
};
/* the answer as a time is said ("9 hours 25 minutes"); a unit that is nought is left out */
const tcReading = (a: any, U: string[], tx: any) => {
  const bits = U.filter((c) => tcNum(a[c]) > 0).map((c) => tcNum(a[c]) + " " + tx(tcNum(a[c]) === 1 ? TC_ONE[c] : TC_HEAD[c]));
  return bits.length ? bits.join(" ") : "0 " + tx(TC_HEAD[U[U.length - 1]]);
};
/* the traceback, frame by frame: the child's own line as answered, then the columns worked from the right
   (a sum carries through its gates, a taking-away breaks first), ending on the whole right answer */
const tcTrace = (M: any, U: string[], child: any, own: any) => {
  const frames: any[] = [];
  /* a gate lights on the child's line only where carrying belongs: a sum, or a time written in columns;
     a taking-away never carries, so its gates stay dark */
  const litOf = (a: any) => (M.kind === "sub" ? null : ["s", "m"].find((c) => U.includes(c) && a[c] !== "" && tcNum(a[c]) >= 60 && tcNum(a[c]) < 200) || null);
  const line0 = { all: false, raw: true, ans: { ...child }, carries: { ...own.carries }, breaks: own.breaks.slice(), lit: litOf(child), panel: null, hl: null };
  frames.push(line0);
  let v: any = { all: true, raw: false, ans: {}, carries: { h: 0, m: 0 }, breaks: [], lit: null, panel: null, hl: null };
  if (M.kind === "sub") {
    /* every break this taking-away needs, in order */
    let all: any[] = [];
    for (let guard = 0; guard < 4; guard++) { const p = tcBreakPlan(M.rows, U, all); if (!p) break; all = [...all, ...p]; }
    const top0: any = {}, low: any = {}, got: any = {};
    U.forEach((c) => { top0[c] = tcNum(tcVal(M.rows[0], c)); low[c] = tcNum(tcVal(M.rows[1], c)); got[c] = child[c] === "" ? 0 : tcNum(child[c]); });
    const gave = (want: any) => U.some((c) => child[c] !== "") && U.every((c) => got[c] === want[c]);
    const minus = (t: any) => { const w: any = {}; U.forEach((c) => (w[c] = t[c] - low[c])); return w; };
    const shortCols = U.filter((c) => top0[c] < low[c]);
    const first = all.length ? all[all.length - 1].to : null;
    const noDrop = tcTops(M.rows, all);            /* the breaks made, but the column on the left never goes down */
    all.forEach((b: any) => (noDrop[b.from] += 1));
    const twice = tcTops(M.rows, all.slice(0, 1)); /* across an empty column: sixty minutes AND sixty seconds */
    if (all.length === 2) twice[all[1].to] += 60;
    if (shortCols.length && gave((() => { const w: any = {}; U.forEach((c) => (w[c] = Math.abs(top0[c] - low[c]))); return w; })())) {
      /* the smaller taken from the larger, or the bottom brought straight down: the short cells stay shut */
      frames.push({ ...line0, all: true, shut: shortCols, hl: shortCols[shortCols.length - 1] });
    } else if (all.length && gave(minus(noDrop))) {
      /* sixty poured in, but the figure on the left never went down: it is lit, and nothing is struck through it */
      frames.push({ ...line0, all: true, tops: noDrop, struck: all.map((b: any) => b.to), ring: all.map((b: any) => b.from).filter((c: string) => !all.some((b: any) => b.to === c)), hl: all[0].from });
    } else if (all.length === 2 && gave(minus(twice))) {
      /* an hour opened as sixty minutes and sixty seconds: one minute more than the hour holds */
      frames.push({ ...line0, all: true, tops: twice, struck: U.slice(), ring: [all[0].to], note: "one minute too many", hl: all[0].to });
    } else if (first && child[first] !== "" && got[first] === top0[first] + 100 - low[first]) {
      /* a hundred taken for an hour: the sixty an hour really gives, beside the child's hundred */
      frames.push({ ...v, all: true, panel: { compare: true, col: first }, hl: first });
    }
    let br: any[] = [];
    for (let guard = 0; guard < 4; guard++) {
      const plan = tcBreakPlan(M.rows, U, br);
      if (!plan) break;
      plan.forEach((b: any) => {
        frames.push(v = { ...v, panel: { col: b.to, wine: true }, hl: b.to });
        br = [...br, b];
        frames.push(v = { ...v, breaks: br, panel: null });
      });
    }
    const t = tcTops(M.rows, br);
    [...U].reverse().forEach((c) => {
      const d = t[c] - tcNum(tcVal(M.rows[1], c));
      frames.push(v = { ...v, hl: c, ans: { ...v.ans, [c]: c === "h" ? String(d) : tcPad(d) } });
    });
  } else {
    frames.push(v = { ...v });
    let carry = 0;
    [...U].reverse().forEach((c) => {
      let total = M.rows.reduce((a: number, r: any[]) => a + tcNum(tcVal(r, c)), 0) + carry;
      carry = 0;
      if (c === "h") { frames.push(v = { ...v, hl: c, ans: { ...v.ans, h: String(total) } }); return; }
      frames.push(v = { ...v, hl: c, ans: { ...v.ans, [c]: total >= 60 ? String(total) : tcPad(total) }, lit: total >= 60 ? c : null });
      while (total >= 60) {
        frames.push(v = { ...v, panel: { col: c } });
        total -= 60; carry += 1;
        frames.push(v = { ...v, panel: null, carries: { ...v.carries, [TC_LEFT[c]]: carry }, ans: { ...v.ans, [c]: total >= 60 ? String(total) : tcPad(total) }, lit: total >= 60 ? c : null });
      }
    });
  }
  frames.push({ ...v, hl: null, lit: null, panel: null, reading: true });
  return frames;
};

function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  /* every English word the picture draws goes through tx("...") (its key is added to TR) */
  const C = api.C;
  const tl = useTimeline();   /* the traceback */
  const mo = useTimeline();   /* a gate, a break or the check at work */
  const free = stage === "free";
  const live = free || stage === "ask";
  const key = free ? "free" : n + ":" + index;

  /* the child's own work on this question: cards placed, carries, breaks, the check (free play: the op,
     which times, and the frame's own answer line) */
  const blank = (k: string, op = "add", pick = 0) => ({ key: k, op, pick, placed: {}, carries: { h: 0, m: 0 }, carryAfter: {}, breaks: [], ans: { h: "", m: "", s: "" }, checked: null, everChecked: false });
  const [own, setOwn] = useState<any>(() => blank(key));
  const S = own.key === key ? own : blank(key);
  const put = (fn: (o: any) => any) => setOwn((o: any) => { const b = o.key === key ? o : blank(key); return { ...b, ...fn(b) }; });
  const [demo, setDemo] = useState<any>(null);   /* the traceback's layer */
  const [fx, setFx] = useState<any>(null);       /* the cell panel while sixty moves */
  const [lit, setLit] = useState<any>(null);     /* a card sent back (its unit lit), or a short column in free play */
  const [breaking, setBreaking] = useState<any>(null);   /* the break's own word, held until its motion ends */
  const moving = useRef(false);                  /* one gate, break or check at a time, even for two quick presses */

  const pool = TC_FREE[S.op] || TC_FREE.add;
  const M = free ? { kind: S.op, units: "hms", rows: pool[S.pick % pool.length] }
    : { kind: item.kind || "add", units: item.units || "hms", rows: item.rows || [[0, 0, 0]] };
  const U = M.units === "hm" ? ["h", "m"] : ["h", "m", "s"];
  const nr = M.rows.length;
  const sub = M.kind === "sub";
  const furnished = free || n > 1;   /* phases 2 to 4 open with the times already in the frame */
  const ruleY = TC_ROW0 + TC_ROWH * nr + 20, ansTop = ruleY + 34;

  /* the child's answer line: the slot's boxes, column by column (free play: the frame's own line) */
  const typedParts = slotPartsOf(free ? "" : typed, U.length);
  const ownAns: any = { h: "", m: "", s: "" };
  U.forEach((c, k) => (ownAns[c] = free ? S.ans[c] : typedParts[k]));
  /* a gate lights only where carrying belongs (a sum), and only on a total a column can really make */
  const canGate = (c: string) => M.kind === "add" && U.includes(c) && ownAns[c] !== "" && tcNum(ownAns[c]) >= 60 && tcNum(ownAns[c]) < 200;
  const ownLit = ["s", "m"].filter(canGate);
  /* a carry belongs to the value its column was left with: once that column is re-worked or its digits
     are edited, the carry it sent is gone too */
  const carryInto = (L: string) => { const c = L === "h" ? "m" : "s"; return S.carryAfter[c] !== undefined && S.carryAfter[c] === ownAns[c] ? S.carries[L] : 0; };
  const carries = { h: carryInto("h"), m: carryInto("m") };
  const plan = sub ? tcBreakPlan(M.rows, U, S.breaks) : null;
  /* a box whose answer is 0 may be left blank (item.parts[k].free): it is read as 0 by the check, and drawn
     as 00 (or 0) once the answer is right */
  const freeBox = (c: string) => !free && !!(item.parts && item.parts[U.indexOf(c)] && item.parts[U.indexOf(c)].free);
  const complete = U.some((c) => ownAns[c] !== "") && U.every((c) => ownAns[c] !== "" || freeBox(c));
  const busy = tl.busy || mo.busy;

  /* Enter and choice taps go here first while the working area owns the answer */
  api.onEnter(null);

  useEffect(() => { tl.stop(); mo.stop(); moving.current = false; setDemo(null); setFx(null); setLit(null); setBreaking(null); }, [key]);
  useEffect(() => { if (demo && typed !== demo.typedAt) setDemo(null); }, [typed]);
  useEffect(() => { if (!lit) return; const t = setTimeout(() => setLit(null), 1400); return () => clearTimeout(t); }, [lit]);

  /* the traceback: the child's own line, then the maths redrawn column by column to the whole right answer,
     on a layer of its own (nothing the child did is changed) that the child's next act clears */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    api.lock(true);
    mo.stop(); moving.current = false; setFx(null); setBreaking(null);
    const ps = slotPartsOf(wrong.value, U.length), child: any = { h: "", m: "", s: "" };
    U.forEach((c, k) => (child[c] = ps[k]));
    const frames = tcTrace(M, U, child, { carries, breaks: S.breaks });
    /* an answer has been given: any card still waiting settles under its heading, so the frame is complete */
    if (n === 1) put((o) => { const all: any = { ...o.placed }; M.rows.forEach((row: any[], r: number) => TC_U.forEach((c) => { if (tcVal(row, c) !== null && tcVal(row, c) !== undefined) all[r + c] = true; })); return { placed: all }; });
    const at = typed;
    tl.run(frames.map((f: any, k: number) => [k === frames.length - 1 ? 40 : 760, () => setDemo({ ...f, key, typedAt: at })]), () => api.lock(false));
  }, [wrong]);

  const act = () => setDemo(null);
  const place = (id: string) => { act(); put((o) => ({ placed: { ...o.placed, [id]: true } })); api.sfx.tick(); };
  /* a card settles only under its own heading; under another it goes back to the line with its unit lit */
  const drag = useDrag((p: any, at: any, moved: boolean) => {
    if (!p || !p.id || busy || (stage !== "ask" && stage !== "teach") || S.placed[p.id]) return;
    if (!moved) { place(p.id); return; }
    if (!(at.x >= 72 && at.x < 612 && at.y >= TC_TOP && at.y <= TC_BOT)) return;
    const col = at.x < 252 ? "h" : at.x < 432 ? "m" : "s";
    if (col === p.unit) place(p.id); else { act(); setLit(p.id); }
  });
  /* a lit gate sends sixty through: sixty cells lift out of the column and one of the next unit drops into
     the carry circle on the left; what is left goes down in two places */
  const gate = (c: string) => {
    if (!live || busy || moving.current || !canGate(c)) return;
    act();
    moving.current = true;
    const l = TC_LEFT[c], k = U.indexOf(c);
    const lessOf = (s: string) => { const v = tcNum(s) - 60; return v >= 60 ? String(v) : tcPad(v); };
    const was = ownAns[c], count = carryInto(l) + 1;
    mo.run([[560, () => setFx({ col: c })], [60, () => {
      if (free) { const after = lessOf(was); put((o) => ({ ans: { ...o.ans, [c]: after }, carries: { ...o.carries, [l]: count }, carryAfter: { ...o.carryAfter, [c]: after } })); }
      else {
        /* read the box as it is NOW (the pad stays open during the motion): the carry goes only if the box
           still holds the same sixty or more the gate lit on; a digit typed meanwhile is kept, not overwritten */
        let after: any = null;
        api.setTyped((s: string) => { const ps = slotPartsOf(s, U.length); if (ps[k] !== was) return s; after = lessOf(ps[k]); ps[k] = after; return ps.join("|"); });
        if (after !== null) put((o) => ({ carries: { ...o.carries, [l]: count }, carryAfter: { ...o.carryAfter, [c]: after } }));
      }
      setFx(null); api.sfx.tick();
    }]], () => { moving.current = false; });
  };
  /* the break (or the double break): the figure on the left is struck and written one less in wine, and sixty
     cells pour into the short column, which is written sixty more */
  const doBreak = () => {
    if (!live || busy || moving.current || !plan) return;
    act();
    moving.current = true;
    setBreaking(plan.length === 2 ? "double break" : "break");
    const steps: any[] = [];
    plan.forEach((b: any) => {
      steps.push([600, () => setFx({ col: b.to, wine: true })]);
      steps.push([160, () => { put((o) => ({ breaks: [...o.breaks, b] })); setFx(null); api.sfx.tick(); }]);
    });
    mo.run(steps, () => { moving.current = false; setBreaking(null); });
  };
  /* the check: the answer added back to the smaller time, column by column with its own carries */
  const doCheck = () => {
    if (!live || busy || moving.current || !sub || !complete) return;
    act();
    moving.current = true;
    const sum: any = {};
    let carry = 0;
    [...U].reverse().forEach((c) => {
      let t = tcNum(ownAns[c]) + tcNum(tcVal(M.rows[1], c)) + carry;
      carry = 0;
      if (c !== "h") while (t >= 60) { t -= 60; carry += 1; }
      sum[c] = t;
    });
    const of = free ? JSON.stringify(S.ans) : typed;
    mo.run([...U].reverse().map((c, k) => [440, () => put((o) => ({ everChecked: true,
      checked: { of, sum: { ...(k && o.checked ? o.checked.sum : {}), [c]: sum[c] } } }))]), () => { moving.current = false; api.sfx.tick(); });
  };
  /* free play: work one column of the frame (a short column on top waits for the break); working a column
     again starts it afresh, so the carry it sent before is gone */
  const workCol = (c: string) => {
    if (!free || busy || moving.current) return;
    if (!sub) {
      const t = M.rows.reduce((a: number, r: any[]) => a + tcNum(tcVal(r, c)), 0) + (c === "s" ? 0 : carries[c]);
      put((o) => ({ ans: { ...o.ans, [c]: c === "h" || t >= 60 ? String(t) : tcPad(t) } }));
      api.sfx.tick();
      return;
    }
    const d = tcTops(M.rows, S.breaks)[c] - tcNum(tcVal(M.rows[1], c));
    if (d < 0) { setLit("short-" + c); return; }
    put((o) => ({ ans: { ...o.ans, [c]: c === "h" ? String(d) : tcPad(d) } }));
    api.sfx.tick();
  };
  const setOp = (op: string) => { if (!busy && !moving.current) setOwn(blank("free", op, 0)); };
  const newTimes = () => { if (!busy && !moving.current) setOwn(blank("free", S.op, S.pick + 1)); };

  /* what is drawn: the traceback's layer, the worked columns once it is right, or the child's own work */
  const demoOn = !!demo && !free && demo.key === key && demo.typedAt === typed;
  const done = !free && (stage === "win" || stage === "idle");
  const fin = done ? tcTrace(M, U, { h: "", m: "", s: "" }, { carries, breaks: S.breaks }).pop() : null;
  const doneAns: any = { ...ownAns };
  U.forEach((c) => { if (doneAns[c] === "" && freeBox(c)) doneAns[c] = c === "h" ? "0" : "00"; });
  const V: any = demoOn ? demo : fin ? { ...fin, ans: doneAns, raw: true, reading: false }
    : { all: false, raw: true, ans: ownAns, carries, breaks: S.breaks, lit: null, panel: fx, hl: null };
  const litCols = demoOn ? (demo.lit ? [demo.lit] : []) : fin ? [] : ownLit;

  /* the running count: columns worked against the columns this sum uses (phase 4 counts the check too) */
  const worked = U.filter((c) => ownAns[c] !== "" || (done && freeBox(c))).length + (n === 4 && !free && S.everChecked ? 1 : 0);
  const total = U.length + (n === 4 && !free ? 1 : 0);

  /* what the host and the agent read back (toolApi.getState): the child's own work, never the answer */
  api.share({ operation: M.kind, rows: M.rows, columnTotals: { ...ownAns }, carries: { ...carries }, breaks: S.breaks.length,
    checked: !!S.everChecked, columnsWorked: worked, columnsUsed: total, complete: stage === "idle" });

  /* the line of times: each part of each time on a card of its own */
  const cards: any[] = [], signs: any[] = [];
  if (!free) {
    let x = 12;
    M.rows.forEach((row: any[], r: number) => {
      if (r > 0 && M.kind !== "write") { signs.push({ x: x + 18, t: sub ? "−" : "+" }); x += 40; }
      TC_U.forEach((c) => {
        const v = tcVal(row, c);
        if (v === null || v === undefined || (v === 0 && c !== "h")) return;
        const word = v === 1 ? TC_ONE[c] : TC_HEAD[c];
        const w = Math.max(100, 28 + Math.max(String(v).length * 26, tx(word).length * 17));
        cards.push({ id: r + c, r, unit: c, v, word, x, w });
        x += w + 10;
      });
    });
  }
  const canDrag = n === 1 && !free && (stage === "ask" || stage === "teach");

  /* two places of a column: the digits sit in the tens place and the ones place; a nought holding a place is grey */
  const place2 = (cx: number, y: number, s: string, ink: string, quiet: boolean) => {
    const pl = tcPlaces(s);
    if (!pl) return <text x={cx} y={y} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={ink}>{s}</text>;
    const nought = quiet && s === "00";
    return (
      <g>
        {pl.map((d, k) => d !== "" && (
          <text key={k} x={cx + (k ? 32 : -32)} y={y} textAnchor="middle" fontSize={T.prompt} fontWeight={700}
            fill={quiet && d === "0" && (k === 0 || nought) ? TC_ZERO : ink}>{d}</text>
        ))}
      </g>
    );
  };

  /* a card: tinted while it waits to be placed; once its part is in the frame it stays in the line as the
     question was written, quiet (white, dashed edge), so the line never breaks up */
  const cardG = (cd: any) => {
    const col = TC_COL[cd.unit], ink = TC_INK[cd.unit];
    const d = drag.drag && drag.drag.payload && drag.drag.payload.id === cd.id && drag.drag.moved ? drag.drag : null;
    const on = lit === cd.id;
    const quiet = n === 1 && (S.placed[cd.id] || done);
    const body = (
      <g>
        <rect x={cd.x} y={14} width={cd.w} height={72} rx={14} fill={quiet ? "#FFFFFF" : tint(col, 0.86)} stroke={shade(col, 0.1)} strokeWidth={2}
          strokeDasharray={quiet ? "8 6" : undefined} />
        <text x={cd.x + cd.w / 2} y={52} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={ink}>{cd.v}</text>
        {on && <rect x={cd.x + 8} y={57} width={cd.w - 16} height={27} rx={8} fill={ink} />}
        <text x={cd.x + cd.w / 2} y={80} textAnchor="middle" fontSize={T.micro} fontWeight={on ? 700 : 500} fill={on ? "#FFFFFF" : ink}>{tx(cd.word)}</text>
      </g>
    );
    /* a new key once it is no longer a control: the node is replaced, so a keyboard focus on it goes back to
       the page and the next Enter answers */
    if (!canDrag || quiet) return <g key={cd.id + "q"}>{body}</g>;
    return (
      <g key={cd.id} {...control("card-" + cd.id, cd.v + " " + cd.word)} {...drag.bind({ id: cd.id, unit: cd.unit })} {...drag.keys({ id: cd.id, unit: cd.unit })}
        transform={d ? `translate(${d.x - (cd.x + cd.w / 2)},${d.y - 50})` : undefined} filter={d ? "url(#fLift)" : undefined}>{body}</g>
    );
  };

  const frameG = () => {
    const tops = V.tops || tcTops(M.rows, V.breaks || []);
    const struckAt = (c: string) => (V.struck ? V.struck.includes(c) : (V.breaks || []).some((b: any) => b.from === c || b.to === c));
    const H = TC_BOT - TC_TOP;
    const reading = V.note ? tx(V.note) : V.reading ? tcReading(V.ans, U, tx) : "";
    const rw = Math.min(580, reading.length * 18 + 48);
    return (
      <g pointerEvents="none">
        {TC_U.map((c) => (
          <rect key={"col" + c} x={TC_X[c]} y={TC_TOP} width={180} height={H} fill={tint(TC_COL[c], U.includes(c) ? 0.86 : 0.94)} />
        ))}
        {/* phase 2 opens on the minutes: that column is drawn a shade deeper (a tint, not a control) */}
        {minutesCue && <rect x={TC_X.m + 4} y={TC_TOP + 4} width={172} height={H - 8} rx={12} fill={tint(TC_COL.m, 0.74)} />}
        {V.hl && <rect x={TC_X[V.hl] + 3} y={TC_TOP + 3} width={174} height={H - 6} fill="none" stroke={C.accent} strokeWidth={5} />}
        <rect x={12} y={TC_TOP} width={600} height={H} rx={RAD.panel} fill="none" stroke={CONTENT.line} strokeWidth={2} />
        <line x1={252} y1={TC_TOP} x2={252} y2={TC_BOT} stroke={CONTENT.line} strokeWidth={1.5} />
        <line x1={432} y1={TC_TOP} x2={432} y2={TC_BOT} stroke={CONTENT.line} strokeWidth={1.5} />
        {TC_U.map((c) => <text key={"hd" + c} x={TC_CX[c]} y={130} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(TC_HEAD[c])}</text>)}
        {/* the carry circles, over the hours and over the minutes (a sum only) */}
        {M.kind === "add" && ["h", "m"].filter((c) => U.includes(TC_U[TC_U.indexOf(c) + 1])).map((c) => {
          const k = (V.carries || {})[c] || 0;
          return (
            <g key={"cc" + c}>
              <circle cx={TC_CX[c]} cy={162} r={24} fill={k > 0 ? tint(TC_WINE, 0.86) : "#FFFFFF"} stroke={k > 0 ? TC_WINE : CONTENT.line} strokeWidth={k > 0 ? 3 : 2} />
              {k > 0 && <text x={TC_CX[c]} y={176} textAnchor="middle" fontSize={T.prompt} fontWeight={800} fill={TC_WINE}>{k}</text>}
            </g>
          );
        })}
        {/* the times, one line each; a figure a break changes is struck through once, the new one above it in
            wine on a soft wine pill; a short cell a correction holds shut has a dark bar under it */}
        {M.rows.map((row: any[], r: number) => U.map((c) => {
          const v = tcVal(row, c);
          if (v === null || v === undefined) return null;
          if (!(furnished || V.all || S.placed[r + c])) return null;
          const y = TC_ROW0 + TC_ROWH * r + 44, ink = TC_INK[c];
          const s = c === "h" ? String(v) : furnished ? tcPad(v) : String(v);
          const onTop = sub && r === 0;
          const struck = onTop && struckAt(c);
          const ring = (onTop && (V.ring || []).includes(c)) || (lit === "short-" + c && r === 0);
          const shut = onTop && (V.shut || []).includes(c);
          const nv = String(tops[c]), pw = nv.length * 26 + 24;
          return (
            <g key={"r" + r + c}>
              {ring && <rect x={TC_X[c] + 12} y={y - 38} width={156} height={48} rx={10} fill="none" stroke={C.accent} strokeWidth={4} />}
              {c === "h" ? <text x={TC_CX.h} y={y} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={ink}>{s}</text> : place2(TC_CX[c], y, s, ink, furnished)}
              {struck && <line x1={TC_CX[c] - 56} y1={y - 14} x2={TC_CX[c] + 56} y2={y - 14} stroke={CONTENT.line} strokeWidth={3} />}
              {shut && <rect x={TC_X[c] + 20} y={y + 9} width={140} height={9} rx={4} fill={CONTENT.line} />}
              {struck && (
                <g>
                  <rect x={TC_CX[c] - pw / 2} y={144} width={pw} height={42} rx={12} fill={tint(TC_WINE, 0.86)} stroke={TC_WINE} strokeWidth={2} />
                  <text x={TC_CX[c]} y={180} textAnchor="middle" fontSize={T.prompt} fontWeight={800} fill={TC_WINE}>{nv}</text>
                </g>
              )}
            </g>
          );
        }))}
        {M.kind !== "write" && nr > 1 && (
          <text x={42} y={TC_ROW0 + TC_ROWH * (nr - 1) + 44} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{sub ? "−" : "+"}</text>
        )}
        <line x1={24} y1={ruleY} x2={600} y2={ruleY} stroke={CONTENT.line} strokeWidth={3} />
        {/* the answer line: hours in one box, minutes and seconds in two places each; a number longer than its
            cell is cut to the cell (the slot keeps every digit) */}
        {U.map((c) => {
          const s0 = String(V.ans[c] ?? "");
          const s = s0.length > 3 ? s0.slice(0, 3) + "…" : s0;
          if (c === "h") return (
            <g key={"a" + c}>
              <rect x={TC_CX.h - 56} y={ansTop} width={112} height={56} rx={12} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
              {s !== "" && <text x={TC_CX.h} y={ansTop + 43} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{s}</text>}
            </g>
          );
          return (
            <g key={"a" + c}>
              <rect x={TC_CX[c] - 58} y={ansTop} width={52} height={56} rx={12} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
              <rect x={TC_CX[c] + 6} y={ansTop} width={52} height={56} rx={12} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
              {s !== "" && place2(TC_CX[c], ansTop + 43, s, C.ink, !V.raw)}
            </g>
          );
        })}
        {/* the sixty gates, across the rule between each pair of columns */}
        {["m", "s"].filter((c) => U.includes(c)).map((c) => (
          <g key={"g" + c}>
            <rect x={TC_X[c] - 50} y={ruleY - 16} width={100} height={32} rx={10} fill={litCols.includes(c) ? TC_WINE : CONTENT.line} />
            <text x={TC_X[c]} y={ruleY + 9} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF">{tx("sixty")}</text>
          </g>
        ))}
        {reading !== "" && (
          <g data-role="reading">
            <rect x={312 - rw / 2} y={ansTop + 64} width={rw} height={38} rx={12} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
            <text x={312} y={ansTop + 93} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{reading}</text>
          </g>
        )}
      </g>
    );
  };

  /* the cell panel: sixty cells in six rows of ten, only while a sixty is carried, broken or compared (an
     empty grid standing there before anything moves would read as a hint) */
  const panelG = () => {
    const pv = V.panel;
    if (!pv) return null;
    const cells = (x0: number, y0: number, size: number, gap: number, rows: number, fillOf: (k: number) => string) =>
      Array.from({ length: rows * 10 }).map((_, k) => (
        <rect key={k} x={x0 + (k % 10) * (size + gap)} y={y0 + Math.floor(k / 10) * (size + gap)} width={size} height={size}
          rx={size > 20 ? 6 : 3} fill={fillOf(k)} stroke={shade(C.rule, 0.2)} strokeWidth={1.5} />
      ));
    return (
      <g pointerEvents="none">
        <rect x={636} y={TC_TOP} width={440} height={228} rx={RAD.panel} fill={tint(C.panel, 0.5)} stroke={CONTENT.line} strokeWidth={2} />
        {pv.compare ? (
          <g>
            {cells(641, TC_TOP + 10, 18, 3, 6, () => `url(#${TC_PAINT[pv.col]})`)}
            {cells(864, TC_TOP + 10, 18, 3, 10, (k) => (k < 60 ? `url(#${TC_PAINT[pv.col]})` : "#FFFFFF"))}
          </g>
        ) : cells(683, TC_TOP + 12, 30, 5, 6, () => (pv.wine ? TC_WINE : `url(#${TC_PAINT[pv.col]})`))}
      </g>
    );
  };

  /* the check strip: the answer added back to the smaller time, beside the larger time on top */
  const stripG = () => {
    const ck = S.checked;
    if (!sub || !ck || ck.of !== (free ? JSON.stringify(S.ans) : typed)) return null;
    const sx: any = { h: 846, m: 946, s: 1036 };
    const cell = (c: string, v: any, y: number) => (v === undefined ? null
      : <text key={c + y} x={sx[c]} y={y} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={TC_INK[c]}>{c === "h" ? String(v) : tcPad(v)}</text>);
    return (
      <g pointerEvents="none">
        <rect x={636} y={430} width={440} height={96} rx={RAD.panel} fill="#FFFFFF" stroke={CONTENT.line} strokeWidth={2} />
        <text x={652} y={468} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("added back")}</text>
        <text x={652} y={512} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("top line")}</text>
        {U.map((c) => cell(c, ck.sum[c], 468))}
        {U.map((c) => cell(c, tcNum(tcVal(M.rows[0], c)), 512))}
      </g>
    );
  };

  const keyText = (s: string, on: boolean, dx = 0) => (
    <text x={dx} y={s.length > 9 ? 10 : 11} textAnchor="middle" fontSize={s.length > 9 ? T.micro : T.label} fontWeight={700} fill={on ? "#FFFFFF" : C.ink}>{tx(s)}</text>
  );
  /* the break keeps its word (and a quiet look) until both halves of a double break are done */
  const breakWord = breaking || (plan && plan.length === 2 ? "double break" : "break");
  const breakOn = !!plan && live && !busy && !breaking;
  /* the break key's left cap: six small cells, the sixty it pours (the invite rings this, never the word) */
  const breakCap = (on: boolean) => (
    <g>
      {Array.from({ length: 6 }).map((_, k) => (
        <rect key={k} x={-130 + (k % 3) * 11} y={-10 + Math.floor(k / 3) * 11} width={8} height={8} rx={2} fill={on ? "#FFFFFF" : C.dim} />
      ))}
    </g>
  );

  /* the one invite, ringing a numeral or a key's cap, never a word: the first card to place, a lit gate, the
     minutes column a sum is about (phase 2), or the break waiting */
  let inv: any = null;
  if (!free && !demoOn && !busy) {
    const first = cards.find((cd) => !S.placed[cd.id]);
    if (canDrag && first) inv = { x: first.x + first.w / 2, y: 36, rx: String(first.v).length > 1 ? 40 : 26, ry: 21 };
    else if (stage === "ask" && ownLit.length) inv = { x: TC_X[ownLit[0]], y: ruleY, r: 46 };
    else if (stage === "ask" && sub && plan && !S.breaks.length && breakOn) inv = { x: 666, y: 378, r: 22, onKey: true };
  }
  /* phase 2's first look: the minutes column a shade deeper until the child writes its total or carries */
  const minutesCue = !free && !demoOn && !busy && stage === "ask" && n === 2 && ownAns.m === "" && !carries.h && !inv;
  /* free play: the next column to work from the right, or the break when that column is short on top */
  if (free && !busy) {
    const next = [...U].reverse().find((c) => S.ans[c] === "");
    if (next && sub && plan && breakOn && plan[plan.length - 1].to === next) inv = { x: 666, y: 378, r: 22, onKey: true };
    else if (next) inv = { x: TC_CX[next], y: ansTop + 28, r: 40 };
  }

  return (
    <g>
      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        <text x={24} y={-45} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(n === 4 && !free ? "steps" : "columns")}</text>
        <text x={306} y={-38} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={C.ink}>{worked + " / " + total}</text>
      </g>
      {frameG()}
      {panelG()}
      {stripG()}
      {signs.map((s: any, k: number) => (
        <text key={"sg" + k} x={s.x} y={62} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{s.t}</text>
      ))}
      {cards.map((cd) => cardG(cd))}
      {sub && (
        <g>
          <Key id="break" label={breakWord} x={636} y={342} w={290} h={72} C={C} primary={breakOn} disabled={!breakOn} onClick={doBreak}>
            {breakCap(breakOn)}
            {keyText(breakWord, breakOn, 28)}
          </Key>
          <Key id="check" label="check" x={942} y={342} w={134} h={72} C={C} disabled={!complete || !live || busy} onClick={doCheck}>
            {keyText("check", false)}
          </Key>
        </g>
      )}
      {live && !demoOn && ownLit.map((c) => (
        <Hit key={"gh" + c} id={"gate-" + c} x={TC_X[c] - 36} y={ruleY - 36} w={72} h={72} onPress={() => gate(c)} label="sixty gate" />
      ))}
      {free && (
        <g>
          {U.map((c) => {
            const hx: any = { h: [76, 136], m: [292, 100], s: [472, 136] };
            return <Hit key={"w" + c} id={"work-" + c} x={hx[c][0]} y={ansTop - 8} w={hx[c][1]} h={72} onPress={() => workCol(c)} label={"work the " + TC_HEAD[c] + " column"} />;
          })}
          <Key id="op-add" label="add" x={12} y={14} w={150} h={72} C={C} primary={S.op === "add"} onClick={() => setOp("add")}>{keyText("add", S.op === "add")}</Key>
          <Key id="op-sub" label="take away" x={174} y={14} w={200} h={72} C={C} primary={S.op === "sub"} onClick={() => setOp("sub")}>{keyText("take away", S.op === "sub")}</Key>
          <Key id="new-times" label="new times" x={386} y={14} w={200} h={72} C={C} onClick={newTimes}>{keyText("new times", false)}</Key>
        </g>
      )}
      {inv && inv.rx ? <ellipse className="c4-pulse" cx={inv.x} cy={inv.y} rx={inv.rx} ry={inv.ry} fill="none" stroke={C.accent} strokeWidth={4} pointerEvents="none" />
        : inv ? <Invite x={inv.x} y={inv.y} r={inv.r} C={inv.onKey ? { accent: "#FFFFFF" } : C} /> : null}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const np = Array.isArray(last.answer) ? last.answer.length : 3;
  const ps = slotPartsOf(last.value, np);
  const U = np === 2 ? ["h", "m"] : ["h", "m", "s"];
  /* the slot's own labels (one spelling in the tool): each number in its column's ink over its unit */
  const LABEL: any = { h: "hours", m: "min", s: "sec" };
  const cw = 78, x0 = w - cw * U.length;
  return (
    <g>
      {U.map((c, k) => (
        <g key={c}>
          <text x={x0 + cw * k + cw / 2} y={h / 2 - 4} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={TC_INK[c]}>
            {c === "h" ? String(tcNum(ps[k])) : tcPad(tcNum(ps[k]))}</text>
          <text x={x0 + cw * k + cw / 2} y={h / 2 + 28} textAnchor="middle" fontSize={T.micro} fontWeight={500} fill={C.ink}>{tx(LABEL[c])}</text>
        </g>
      ))}
    </g>
  );
}

function TimeColumns(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default TimeColumns;
