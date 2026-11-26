/* ═══ M1.S1.T2.C4.2D1 · minute_clock · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "minute_clock";
const MEDIA_ID = "M1.S1.T2.C4.2D1";
const TOOL_NAME = "Minute Clock";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A clock with two hands, and a clock with figures. Where is each hand pointing?"];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Minutes counted in fives and then marks, and the hour read from the number the hand has passed.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. The magnifier and the hour finder follow the hands. Set any time, and turn on the fives ring or the count arc.";

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, and the runtime looks each spoken or drawn line up in it.
   Fill it AFTER the English is final and reviewed (`node cli.mjs voice` lists every line still missing),
   then bake the voice. Empty = the tool runs in English only. */
/* Chapter 12 glossary (one for all seven tools): hi घंटा/घंटे, मिनट, घड़ी, सुई (मिनट की सुई, घंटे की सुई);
   gu કલાક, મિનિટ, ઘડિયાળ, કાંટો (મિનિટનો કાંટો, કલાકનો કાંટો). A spoken clock time is written the way it is
   said, digits kept ("9 बजकर 5 मिनट", "9 વાગીને 5 મિનિટ"): the runtime reads the digits as words but would
   read "9:05" digit by digit round the colon. On screen (the asks) a time stays in figures, "9:05". */
const TR: any = {
  hi: {
    "Minute Clock": "मिनट घड़ी",
    "A clock with two hands, and a clock with figures. Where is each hand pointing?": "एक घड़ी में दो सुइयाँ हैं, और एक घड़ी में अंक। हर सुई कहाँ इशारा कर रही है?",
    "Minutes counted in fives and then marks, and the hour read from the number the hand has passed.": "मिनट पहले पाँच-पाँच करके, फिर निशानों से गिने। घंटा उस संख्या से पढ़ा जिसे सुई पार कर चुकी है।",
    "Free play. The magnifier and the hour finder follow the hands. Set any time, and turn on the fives ring or the count arc.": "मुक्त खेल। आवर्धक लेंस और घंटा खोजक सुइयों के साथ चलते हैं। कोई भी समय लगाओ, और पाँच का घेरा या गिनती चाप चालू करो।",
    /* phase 1 */
    "Digital and analog": "डिजिटल और सुइयों वाली घड़ी",
    "This clock shows the time in figures. Can you make the clock with hands show it too?": "यह घड़ी समय अंकों में दिखाती है। क्या तुम सुइयों वाली घड़ी पर भी यही समय दिखा सकते हो?",
    "Which number does the minute hand point at for these minutes?": "इतने मिनट के लिए मिनट की सुई किस संख्या पर होगी?",
    "Think of the o'clock first, with the minute hand on the twelve. Then count on the minutes.": "पहले पूरे घंटे को सोचो, जब मिनट की सुई 12 पर हो। फिर मिनट आगे गिनो।",
    "A digital clock shows the time in figures, and an analog clock shows it with hands. Both can show the same time to the exact minute.": "डिजिटल घड़ी समय अंकों में दिखाती है, और सुइयों वाली घड़ी सुइयों से। दोनों ठीक मिनट तक एक ही समय दिखा सकती हैं।",
    "You learned: both clocks can show the same time, to the exact minute.": "तुमने सीखा: दोनों घड़ियाँ ठीक मिनट तक एक ही समय दिखा सकती हैं।",
    "This is a digital clock, and it reads 9:05. Drag the minute hand and the hour hand to show it.": "यह डिजिटल घड़ी है, इसमें 9 बजकर 5 मिनट हैं। मिनट और घंटे की सुई खींचकर यही समय दिखाओ।",
    "Set the hands to 9:05": "सुइयाँ 9:05 पर लगाओ",
    "Which figures are the hour, and which are the minutes?": "कौन-से अंक घंटा हैं, और कौन-से मिनट?",
    "An analog clock and a digital clock both show twenty past eleven. What does the digital clock show?": "सुइयों वाली और डिजिटल, दोनों घड़ियाँ 11 बजकर 20 मिनट दिखाती हैं। डिजिटल घड़ी में क्या दिखता है?",
    "The time now?": "अभी समय क्या है?",
    "The hour comes first in figures, then the minutes after it.": "अंकों में पहले घंटा आता है, फिर उसके बाद मिनट।",
    "Now read the clock with hands. Write its time as the digital clock would show it.": "अब सुइयों वाली घड़ी पढ़ो। उसका समय वैसे लिखो जैसे डिजिटल घड़ी दिखाती।",
    "Write this time in figures": "यह समय अंकों में लिखो",
    "The minute hand is on the five. How many minutes does the five stand for?": "मिनट की सुई 5 पर है। 5 कितने मिनट दिखाता है?",
    /* phase 2 */
    "Each small mark is a minute": "हर छोटा निशान एक मिनट",
    "Count the spaces from one number to the next. Tap the magnifier to count them one by one.": "एक संख्या से अगली संख्या तक के भाग गिनो। उन्हें एक-एक करके गिनने के लिए आवर्धक लेंस दबाओ।",
    "How long does the hand take to cross one space?": "एक भाग पार करने में सुई को कितना समय लगता है?",
    "Count the spaces between two numbers first. Then count on five for every number the hand passes.": "पहले दो संख्याओं के बीच के भाग गिनो। फिर सुई जो भी संख्या पार करे, हर एक के लिए 5 आगे गिनो।",
    "Each small mark is one minute, and there are five of them from one number to the next.": "हर छोटा निशान एक मिनट है, और एक संख्या से अगली तक ऐसे 5 निशान हैं।",
    "You learned: each small mark is one minute, five from number to number.": "तुमने सीखा: हर छोटा निशान एक मिनट है, दो संख्याओं के बीच 5।",
    "How many minutes does the minute hand take to move from the four to the seven?": "मिनट की सुई को 4 से 7 तक जाने में कितने मिनट लगते हैं?",
    "Minutes from the 4 to the 7?": "4 से 7 तक कितने मिनट?",
    "How many spaces are there between two numbers?": "दो संख्याओं के बीच कितने भाग हैं?",
    "The minute hand goes once round the face. How many small marks does it pass, and how many minutes?": "मिनट की सुई घड़ी का एक पूरा चक्कर लगाती है। वह कितने छोटे निशान पार करती है, और कितने मिनट?",
    "Marks and minutes?": "निशान और मिनट?",
    "Twelve numbers stand round the face. How many minutes lie between one number and the next?": "घड़ी पर 12 संख्याएँ हैं। एक संख्या से अगली तक कितने मिनट होते हैं?",
    "The minute hand moves from the two to the nine. How many minutes pass?": "मिनट की सुई 2 से 9 तक जाती है। कितने मिनट बीतते हैं?",
    "Minutes from the 2 to the 9?": "2 से 9 तक कितने मिनट?",
    "Seven numbers go by, but that is not seven minutes. Count the spaces, not the numbers.": "7 संख्याएँ निकलती हैं, पर यह 7 मिनट नहीं है। संख्याएँ नहीं, भाग गिनो।",
    /* phase 3 */
    "Counting on from the last number": "आखिरी संख्या से आगे गिनना",
    "Count in fives to the last number the hand has passed. Now count the marks after it.": "सुई ने जो आखिरी संख्या पार की है, वहाँ तक पाँच-पाँच करके गिनो। फिर उसके बाद के निशान गिनो।",
    "Tap count on to light the fives.": "पाँच-पाँच चमकाने के लिए आगे गिनो दबाओ।",
    "How many minutes does that number stand for?": "वह संख्या कितने मिनट दिखाती है?",
    "Count the fives only, up to that number. Then add the small marks one at a time.": "उस संख्या तक सिर्फ़ पाँच-पाँच गिनो। फिर छोटे निशान एक-एक करके जोड़ो।",
    "Count in fives to the last number the minute hand has passed, then count the marks after it.": "मिनट की सुई ने जो आखिरी संख्या पार की है, वहाँ तक पाँच-पाँच गिनो, फिर उसके बाद के निशान।",
    "You learned: count fives to the last number passed, then the marks.": "तुमने सीखा: पार की गई आखिरी संख्या तक पाँच-पाँच, फिर निशान गिनो।",
    "The minute hand points at the fourth small mark after the six. How many minutes past the hour is it?": "मिनट की सुई 6 के बाद चौथे छोटे निशान पर है। घंटे के बाद कितने मिनट हुए?",
    "Minutes past the hour?": "घंटे के बाद कितने मिनट?",
    "Which number has the minute hand just passed?": "मिनट की सुई ने अभी कौन-सी संख्या पार की है?",
    "Now the minute hand is two marks past the ten. Read the minutes the same way.": "अब मिनट की सुई 10 से 2 निशान आगे है। मिनट उसी तरह पढ़ो।",
    "Minutes past the hour now?": "अब घंटे के बाद कितने मिनट?",
    "What does the ten stand for, counting in fives?": "पाँच-पाँच गिनने पर 10 कितने मिनट दिखाता है?",
    "Where does the minute hand point at 6:18? Drag it there.": "6 बजकर 18 मिनट पर मिनट की सुई कहाँ होती है? उसे वहाँ खींचो।",
    "Show 6:18": "6:18 दिखाओ",
    "Count in fives from the twelve. Where do you stop?": "12 से पाँच-पाँच करके गिनो। तुम कहाँ रुकते हो?",
    /* phase 4 */
    "The hour the hand has passed": "सुई जिस घंटे को पार कर चुकी",
    "The hour hand is nearly at the next number. Which number has it passed?": "घंटे की सुई लगभग अगली संख्या पर है। उसने कौन-सी संख्या पार की है?",
    "Tap the magnifier to see the hour hand up close.": "घंटे की सुई को पास से देखने के लिए आवर्धक लेंस दबाओ।",
    "Has the minute hand reached the twelve yet?": "क्या मिनट की सुई 12 तक पहुँच गई है?",
    "Think of the same hour just after the o'clock, with the hour hand just past a number.": "उसी घंटे को पूरे घंटे के ठीक बाद सोचो, जब घंटे की सुई किसी संख्या से ज़रा आगे होती है।",
    "The hour is the number the hour hand has passed, not the one it is nearly at.": "घंटा वह संख्या है जिसे घंटे की सुई पार कर चुकी है, वह नहीं जिसके पास वह है।",
    "You learned: the hour is the number the hour hand has passed.": "तुमने सीखा: घंटा वह संख्या है जिसे घंटे की सुई पार कर चुकी है।",
    "The minute hand points at the third small mark after the eleven. The hour hand is just before the four. What time is it?": "मिनट की सुई 11 के बाद तीसरे छोटे निशान पर है। घंटे की सुई 4 से ठीक पहले है। कितने बजे हैं?",
    "Read the time": "समय पढ़ो",
    "Your time is the pale pair of hands. Has four o'clock come yet?": "तुम्हारा समय हल्की सुइयों में है। क्या 4 बज गए हैं?",
    "A clock shows a quarter to six. A child writes the time as 6:45. What should it be?": "एक घड़ी पौने छह बजा रही है। एक बच्चा समय 6 बजकर 45 मिनट लिखता है। सही समय क्या होगा?",
    "The right time?": "सही समय?",
    "The pale hands show what you wrote. A quarter to six comes before six o'clock. Which hour is it still?": "हल्की सुइयाँ वह दिखाती हैं जो तुमने लिखा। पौने छह, छह बजने से पहले आता है। अभी कौन-सा घंटा चल रहा है?",
    "Set the clock to 12:56. Drag both hands to where they point.": "घड़ी में 12 बजकर 56 मिनट लगाओ। दोनों सुइयों को सही जगह खींचो।",
    "Set the hands to 12:56": "सुइयाँ 12:56 पर लगाओ",
    "Where is the hour hand a few minutes before one o'clock?": "एक बजने से कुछ मिनट पहले घंटे की सुई कहाँ होती है?",
    "Yes, 5:45. A quarter to six is fifteen minutes before six.": "हाँ, 5 बजकर 45 मिनट। पौने छह, छह बजने से 15 मिनट पहले होता है।",
    /* the slot's boxes and what the working area draws */
    "hours": "घंटे", "minutes": "मिनट", "minute": "मिनट", "marks": "निशान", "mark": "निशान", "one hour": "एक घंटा",
    "fives ring": "पाँच का घेरा", "count on": "आगे गिनो", "magnifier": "आवर्धक लेंस", "count arc": "गिनती चाप",
    "clocks": "घड़ियाँ", "any time": "कोई भी समय",
  },
  gu: {
    "Minute Clock": "મિનિટ ઘડિયાળ",
    "A clock with two hands, and a clock with figures. Where is each hand pointing?": "એક ઘડિયાળમાં બે કાંટા છે, અને એક ઘડિયાળમાં અંક. દરેક કાંટો ક્યાં બતાવે છે?",
    "Minutes counted in fives and then marks, and the hour read from the number the hand has passed.": "મિનિટ પહેલાં પાંચ-પાંચ કરીને, પછી નિશાનથી ગણી. કલાક તે સંખ્યાથી વાંચ્યો જે કાંટો પાર કરી ગયો છે.",
    "Free play. The magnifier and the hour finder follow the hands. Set any time, and turn on the fives ring or the count arc.": "મુક્ત રમત. બિલોરી કાચ અને કલાક શોધક કાંટા સાથે ચાલે છે. કોઈ પણ સમય ગોઠવો, અને પાંચનું વર્તુળ કે ગણતરી ચાપ ચાલુ કરો.",
    /* phase 1 */
    "Digital and analog": "ડિજિટલ અને કાંટાવાળી ઘડિયાળ",
    "This clock shows the time in figures. Can you make the clock with hands show it too?": "આ ઘડિયાળ સમય અંકમાં બતાવે છે. શું તમે કાંટાવાળી ઘડિયાળમાં પણ એ જ સમય બતાવી શકો?",
    "Which number does the minute hand point at for these minutes?": "આટલી મિનિટ માટે મિનિટનો કાંટો કઈ સંખ્યા પર હશે?",
    "Think of the o'clock first, with the minute hand on the twelve. Then count on the minutes.": "પહેલાં પૂરા કલાકનો વિચાર કરો, જ્યારે મિનિટનો કાંટો 12 પર હોય. પછી મિનિટ આગળ ગણો.",
    "A digital clock shows the time in figures, and an analog clock shows it with hands. Both can show the same time to the exact minute.": "ડિજિટલ ઘડિયાળ સમય અંકમાં બતાવે છે, અને કાંટાવાળી ઘડિયાળ કાંટાથી. બંને એ જ સમય ચોક્કસ મિનિટ સુધી બતાવી શકે છે.",
    "You learned: both clocks can show the same time, to the exact minute.": "તમે શીખ્યા: બંને ઘડિયાળ ચોક્કસ મિનિટ સુધી એ જ સમય બતાવી શકે.",
    "This is a digital clock, and it reads 9:05. Drag the minute hand and the hour hand to show it.": "આ ડિજિટલ ઘડિયાળ છે, તેમાં 9 વાગીને 5 મિનિટ છે. મિનિટ અને કલાકનો કાંટો ખેંચીને આ જ સમય બતાવો.",
    "Set the hands to 9:05": "કાંટા 9:05 પર ગોઠવો",
    "Which figures are the hour, and which are the minutes?": "કયા અંક કલાક છે, અને કયા મિનિટ?",
    "An analog clock and a digital clock both show twenty past eleven. What does the digital clock show?": "કાંટાવાળી અને ડિજિટલ, બંને ઘડિયાળ 11 વાગીને 20 મિનિટ બતાવે છે. ડિજિટલ ઘડિયાળમાં શું દેખાય છે?",
    "The time now?": "અત્યારે સમય શું છે?",
    "The hour comes first in figures, then the minutes after it.": "અંકમાં પહેલાં કલાક આવે છે, પછી મિનિટ.",
    "Now read the clock with hands. Write its time as the digital clock would show it.": "હવે કાંટાવાળી ઘડિયાળ વાંચો. તેનો સમય ડિજિટલ ઘડિયાળ બતાવે તેમ લખો.",
    "Write this time in figures": "આ સમય અંકમાં લખો",
    "The minute hand is on the five. How many minutes does the five stand for?": "મિનિટનો કાંટો 5 પર છે. 5 કેટલી મિનિટ બતાવે છે?",
    /* phase 2 */
    "Each small mark is a minute": "દરેક નાનું નિશાન એક મિનિટ",
    "Count the spaces from one number to the next. Tap the magnifier to count them one by one.": "એક સંખ્યાથી બીજી સંખ્યા સુધીના ભાગ ગણો. એક પછી એક ગણવા બિલોરી કાચ દબાવો.",
    "How long does the hand take to cross one space?": "એક ભાગ પાર કરતાં કાંટાને કેટલો સમય લાગે છે?",
    "Count the spaces between two numbers first. Then count on five for every number the hand passes.": "પહેલાં બે સંખ્યા વચ્ચેના ભાગ ગણો. પછી કાંટો જે સંખ્યા પાર કરે, દરેક માટે 5 આગળ ગણો.",
    "Each small mark is one minute, and there are five of them from one number to the next.": "દરેક નાનું નિશાન એક મિનિટ છે, અને એક સંખ્યાથી બીજી સુધી એવા 5 નિશાન છે.",
    "You learned: each small mark is one minute, five from number to number.": "તમે શીખ્યા: દરેક નાનું નિશાન એક મિનિટ, બે સંખ્યા વચ્ચે 5.",
    "How many minutes does the minute hand take to move from the four to the seven?": "મિનિટના કાંટાને 4 થી 7 સુધી જતાં કેટલી મિનિટ લાગે છે?",
    "Minutes from the 4 to the 7?": "4 થી 7 સુધી કેટલી મિનિટ?",
    "How many spaces are there between two numbers?": "બે સંખ્યા વચ્ચે કેટલા ભાગ છે?",
    "The minute hand goes once round the face. How many small marks does it pass, and how many minutes?": "મિનિટનો કાંટો ઘડિયાળનું એક પૂરું ચક્કર લગાવે છે. તે કેટલા નાના નિશાન પાર કરે છે, અને કેટલી મિનિટ?",
    "Marks and minutes?": "નિશાન અને મિનિટ?",
    "Twelve numbers stand round the face. How many minutes lie between one number and the next?": "ઘડિયાળ પર 12 સંખ્યા છે. એક સંખ્યાથી બીજી સુધી કેટલી મિનિટ થાય?",
    "The minute hand moves from the two to the nine. How many minutes pass?": "મિનિટનો કાંટો 2 થી 9 સુધી જાય છે. કેટલી મિનિટ થાય?",
    "Minutes from the 2 to the 9?": "2 થી 9 સુધી કેટલી મિનિટ?",
    "Seven numbers go by, but that is not seven minutes. Count the spaces, not the numbers.": "7 સંખ્યા પસાર થાય છે, પણ એ 7 મિનિટ નથી. સંખ્યા નહીં, ભાગ ગણો.",
    /* phase 3 */
    "Counting on from the last number": "છેલ્લી સંખ્યાથી આગળ ગણવું",
    "Count in fives to the last number the hand has passed. Now count the marks after it.": "કાંટાએ જે છેલ્લી સંખ્યા પાર કરી છે, ત્યાં સુધી પાંચ-પાંચ કરીને ગણો. પછી તેના પછીના નિશાન ગણો.",
    "Tap count on to light the fives.": "પાંચ-પાંચ ચમકાવવા માટે આગળ ગણો દબાવો.",
    "How many minutes does that number stand for?": "એ સંખ્યા કેટલી મિનિટ બતાવે છે?",
    "Count the fives only, up to that number. Then add the small marks one at a time.": "એ સંખ્યા સુધી ફક્ત પાંચ-પાંચ ગણો. પછી નાના નિશાન એક-એક કરીને ઉમેરો.",
    "Count in fives to the last number the minute hand has passed, then count the marks after it.": "મિનિટના કાંટાએ પાર કરેલી છેલ્લી સંખ્યા સુધી પાંચ-પાંચ ગણો, પછી તેના પછીના નિશાન.",
    "You learned: count fives to the last number passed, then the marks.": "તમે શીખ્યા: પાર કરેલી છેલ્લી સંખ્યા સુધી પાંચ-પાંચ, પછી નિશાન ગણો.",
    "The minute hand points at the fourth small mark after the six. How many minutes past the hour is it?": "મિનિટનો કાંટો 6 પછીના ચોથા નાના નિશાન પર છે. કલાક પછી કેટલી મિનિટ થઈ?",
    "Minutes past the hour?": "કલાક પછી કેટલી મિનિટ?",
    "Which number has the minute hand just passed?": "મિનિટના કાંટાએ હમણાં કઈ સંખ્યા પાર કરી છે?",
    "Now the minute hand is two marks past the ten. Read the minutes the same way.": "હવે મિનિટનો કાંટો 10 થી 2 નિશાન આગળ છે. મિનિટ એ જ રીતે વાંચો.",
    "Minutes past the hour now?": "હવે કલાક પછી કેટલી મિનિટ?",
    "What does the ten stand for, counting in fives?": "પાંચ-પાંચ ગણતાં 10 કેટલી મિનિટ બતાવે છે?",
    "Where does the minute hand point at 6:18? Drag it there.": "6 વાગીને 18 મિનિટે મિનિટનો કાંટો ક્યાં હોય? તેને ત્યાં ખેંચો.",
    "Show 6:18": "6:18 બતાવો",
    "Count in fives from the twelve. Where do you stop?": "12 થી પાંચ-પાંચ કરીને ગણો. તમે ક્યાં અટકો છો?",
    /* phase 4 */
    "The hour the hand has passed": "કાંટો જે કલાક પાર કરી ગયો",
    "The hour hand is nearly at the next number. Which number has it passed?": "કલાકનો કાંટો લગભગ આગળની સંખ્યા પર છે. તેણે કઈ સંખ્યા પાર કરી છે?",
    "Tap the magnifier to see the hour hand up close.": "કલાકના કાંટાને નજીકથી જોવા બિલોરી કાચ દબાવો.",
    "Has the minute hand reached the twelve yet?": "શું મિનિટનો કાંટો 12 સુધી પહોંચ્યો છે?",
    "Think of the same hour just after the o'clock, with the hour hand just past a number.": "એ જ કલાકને પૂરા કલાક પછી તરત વિચારો, જ્યારે કલાકનો કાંટો કોઈ સંખ્યાથી સહેજ આગળ હોય.",
    "The hour is the number the hour hand has passed, not the one it is nearly at.": "કલાક એ સંખ્યા છે જે કલાકનો કાંટો પાર કરી ગયો છે, તે નહીં જેની નજીક તે છે.",
    "You learned: the hour is the number the hour hand has passed.": "તમે શીખ્યા: કલાક એ સંખ્યા છે જે કલાકનો કાંટો પાર કરી ગયો.",
    "The minute hand points at the third small mark after the eleven. The hour hand is just before the four. What time is it?": "મિનિટનો કાંટો 11 પછીના ત્રીજા નાના નિશાન પર છે. કલાકનો કાંટો 4 થી જરા પહેલાં છે. કેટલા વાગ્યા છે?",
    "Read the time": "સમય વાંચો",
    "Your time is the pale pair of hands. Has four o'clock come yet?": "તમારો સમય આછા કાંટામાં છે. શું 4 વાગી ગયા છે?",
    "A clock shows a quarter to six. A child writes the time as 6:45. What should it be?": "એક ઘડિયાળ પોણા છ બતાવે છે. એક બાળક સમય 6 વાગીને 45 મિનિટ લખે છે. સાચો સમય શું હોવો જોઈએ?",
    "The right time?": "સાચો સમય?",
    "The pale hands show what you wrote. A quarter to six comes before six o'clock. Which hour is it still?": "આછા કાંટા તમે લખ્યું તે બતાવે છે. પોણા છ, છ વાગ્યા પહેલાં આવે છે. હજુ કયો કલાક ચાલે છે?",
    "Set the clock to 12:56. Drag both hands to where they point.": "ઘડિયાળમાં 12 વાગીને 56 મિનિટ ગોઠવો. બંને કાંટા સાચી જગ્યાએ ખેંચો.",
    "Set the hands to 12:56": "કાંટા 12:56 પર ગોઠવો",
    "Where is the hour hand a few minutes before one o'clock?": "એક વાગ્યા પહેલાં થોડી મિનિટે કલાકનો કાંટો ક્યાં હોય?",
    "Yes, 5:45. A quarter to six is fifteen minutes before six.": "હા, 5 વાગીને 45 મિનિટ. પોણા છ એટલે છ વાગ્યાથી 15 મિનિટ પહેલાં.",
    /* the slot's boxes and what the working area draws */
    "hours": "કલાક", "minutes": "મિનિટ", "minute": "મિનિટ", "marks": "નિશાન", "mark": "નિશાન", "one hour": "એક કલાક",
    "fives ring": "પાંચનું વર્તુળ", "count on": "આગળ ગણો", "magnifier": "બિલોરી કાચ", "count arc": "ગણતરી ચાપ",
    "clocks": "ઘડિયાળો", "any time": "કોઈ પણ સમય",
  },
};

/* ── the clock's geometry, in working-area units (plain helpers; every name starts mc/MC) ─────────────── */
const MC = { cx: 270, cy: 264, R: 214, num: 146, arc: 177, ring: 242, mLen: 196, hLen: 110, mGrip: 185, hGrip: 98 };
const MC_BLUE = "#0072B2";   /* the minute hand, minute counts and the counting arc (deep blue) */
const MC_VERM = "#D55E00";   /* the hour hand and the hour finder (vermilion) */
const MC_HM = [{ label: "hours" }, { label: "minutes" }];
const MC_MIN = [{ label: "minutes" }];                      /* a number of minutes: one box, named as the time's minutes box */
const MC_RO = { x: 576, y: 8, w: 300, h: 104 };             /* the digital readout */
const MC_WC = { x: 576, y: 136, w: 480, h: 88 };            /* the words card (the minute count on phase 2) */
const MC_MAG = { x: 576, y: 248, w: 480, h: 170, x0: 616, base: 362 };  /* the magnifier: five spaces of 80 */
const MC_BT = { y: 442, h: 72, x1: 576, x2: 836, w: 236 };  /* the toggles' row (wide enough for the Gujarati labels) */
/* a number answer, whether typed in one box ([15]) or given plain */
const mcNum = (item: any) => (Array.isArray(item.answer) ? item.answer[0] : item.answer);
const mcPt = (deg: number, r: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return { x: MC.cx + r * Math.cos(a), y: MC.cy + r * Math.sin(a) };
};
const mcDeg = (x: number, y: number) => ((Math.atan2(y - MC.cy, x - MC.cx) * 180) / Math.PI + 450) % 360;
/* a time is minutes after twelve o'clock, 0 to 719 */
const mcNorm = (tm: number) => ((Math.round(tm) % 720) + 720) % 720;
const mcHour = (tm: number) => { const h = Math.floor(mcNorm(tm) / 60); return h === 0 ? 12 : h; };
const mcMin = (tm: number) => mcNorm(tm) % 60;
const mcAt = (h: number, m: number) => mcNorm((h % 12) * 60 + m);
const mcText = (tm: number) => mcHour(tm) + ":" + (mcMin(tm) < 10 ? "0" : "") + mcMin(tm);
/* "9:05", "9|5", "9 5" or [9, 5] -> a time; anything else -> null */
const mcParse = (v: any): number | null => {
  let h: number, m: number;
  if (Array.isArray(v)) { h = Number(v[0]); m = Number(v[1]); }
  else {
    const g = String(v ?? "").trim().match(/^(\d{1,2})\s*[:|.\s]\s*(\d{1,2})$/);
    if (!g) return null;
    h = Number(g[1]); m = Number(g[2]);
  }
  if (!(h >= 1 && h <= 12 && m >= 0 && m <= 59) || Math.round(h) !== h || Math.round(m) !== m) return null;
  return mcAt(h, m);
};
/* the words card's two lines: minutes past the hour, or minutes to the next hour (past = always "past").
   Hindi and Gujarati read a clock their own way, so they have their own forms, not a translation of the
   English words: सवा / साढ़े (डेढ़, ढाई) / पौने, "नौ बजकर पाँच मिनट", "चार बजने में दो मिनट";
   સવા / સાડા (દોઢ, અઢી) / પોણા, "નવ વાગીને પાંચ મિનિટ", "ચાર વાગવામાં બે મિનિટ" */
const mcSay = (tm: number, past?: boolean, lang: string = "en"): string[] => {
  const h = mcHour(tm), m = mcMin(tm), nx = (h % 12) + 1;
  if (lang === "hi" || lang === "gu") {
    const w = (k: number) => wordsIn(k, lang), hi = lang === "hi";
    const oc = hi ? " बजे" : " વાગ્યા";
    if (m === 0) return [w(h), oc.trim()];
    if (!past && m === 15) return [hi ? "सवा" : "સવા", w(h) + oc];
    if (!past && m === 30) return h === 1 ? [hi ? "डेढ़" : "દોઢ", oc.trim()] : h === 2 ? [hi ? "ढाई" : "અઢી", oc.trim()] : [hi ? "साढ़े" : "સાડા", w(h) + oc];
    if (!past && m === 45) return [hi ? "पौने" : "પોણા", w(nx) + oc];
    if (past || m < 30) return [w(h) + (hi ? " बजकर" : " વાગીને"), w(m) + (hi ? " मिनट" : " મિનિટ")];
    return [w(nx) + (hi ? " बजने में" : " વાગવામાં"), w(60 - m) + (hi ? " मिनट" : " મિનિટ")];
  }
  const mins = (k: number) => words(k) + (k === 1 ? " minute" : " minutes");
  if (m === 0) return [words(h), "o'clock"];
  if (!past && m === 15) return ["a quarter", "past " + words(h)];
  if (!past && m === 30) return ["half", "past " + words(h)];
  if (!past && m === 45) return ["a quarter", "to " + words(nx)];
  if (past || m < 30) return [m % 5 === 0 && !past ? words(m) : mins(m), "past " + words(h)];
  const r = 60 - m;
  return [r % 5 === 0 ? words(r) : mins(r), "to " + words(nx)];
};
/* the count-on steps for m minutes: fives to the last number passed, then each mark after it */
const mcCountList = (m: number) => {
  const out: number[] = [], B = Math.floor(m / 5);
  for (let b = 1; b <= B; b++) out.push(b * 5);
  for (let j = B * 5 + 1; j <= m; j++) out.push(j);
  return out;
};
const mcArc = (d0: number, d1: number, r: number): string => {
  if (d1 - d0 >= 359.9) return mcArc(d0, d0 + 180, r) + " " + mcArc(d0 + 180, d0 + 360, r);
  const a = mcPt(d0, r), b = mcPt(d1, r);
  return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} A ${r} ${r} 0 ${d1 - d0 > 180 ? 1 : 0} 1 ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
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
const PHASES = [
  {
    n: 1,
    concept: "Digital and analog",
    conceptId: "M1.S1.T2.C4", objectiveIds: ["O1"],
    says: ["This clock shows the time in figures. Can you make the clock with hands show it too?"],
    /* tries, as the plan writes it: A miss is answered three ways at once and none of them is the answer. First rung, from the item's own miss line: which figures are the hour, and which are the minutes? Second rung, the phase's: which number does the minute hand point at for these minutes? Third rung: the time is cut to an o'clock, the minute hand on the twelve and the hour hand on a number, before the full time comes back. The pad stays open behind all three rungs. */
    ladder: ["Which number does the minute hand point at for these minutes?","Think of the o'clock first, with the minute hand on the twelve. Then count on the minutes."],
    closing: "A digital clock shows the time in figures, and an analog clock shows it with hands. Both can show the same time to the exact minute.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: both clocks can show the same time, to the exact minute.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The words card reads the child's hands back, the fives ring shows, pale hands sweep from the o'clock to the time, the hour finder rings the hour passed, and the readout and words card end on the time.",
    items: [
      /* learn ML1: answer in the plan = It is a digital clock. On an analog clock the minute hand points at the one, and the hour hand is just past the nine.
         The child draws it: the hands are the answer (the "digital clock" half is named in the question) */
      { qid: "M1.S1.T2.C4:ML1", kind: "set", t: [9, 5], start: [12, 0], pad: "enter", answer: "9:05", near: "9:25", winMs: 2800,
        say: "This is a digital clock, and it reads 9:05. Drag the minute hand and the hour hand to show it.",
        ask: "Set the hands to 9:05",
        miss: "Which figures are the hour, and which are the minutes?" },
      /* practice 1: answer in the plan = 11:20 */
      { qid: "M1.S1.T2.C4:1", kind: "read", t: [11, 20], parts: MC_HM, answer: [11, 20], near: "11|4", winMs: 2600,
        say: "An analog clock and a digital clock both show twenty past eleven. What does the digital clock show?",
        ask: "The time now?",
        miss: "The hour comes first in figures, then the minutes after it." },
      /* authored: the plan has two questions for this phase; the third turns ML1 round (hands to figures),
         with the minute hand on the five, the phase's misconception read the other way */
      { qid: null, kind: "read", t: [7, 25], parts: MC_HM, answer: [7, 25], near: "7|5", winMs: 2600,
        say: "Now read the clock with hands. Write its time as the digital clock would show it.",
        ask: "Write this time in figures",
        miss: "The minute hand is on the five. How many minutes does the five stand for?" },
    ],
  },
  {
    n: 2,
    concept: "Each small mark is a minute",
    conceptId: "M1.S1.T2.C5", objectiveIds: ["O1"],
    says: ["Count the spaces from one number to the next. Tap the magnifier to count them one by one."],
    /* tries, as the plan writes it: First rung, from the item: how many spaces are there between two numbers? Second rung, the phase's: how long does the hand take to cross one space? Third rung: the magnifier is cut to one stretch, from one number to the next, and the child counts its spaces before the longer stretch comes back. The pad stays open. */
    ladder: ["How long does the hand take to cross one space?","Count the spaces between two numbers first. Then count on five for every number the hand passes."],
    closing: "Each small mark is one minute, and there are five of them from one number to the next.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: each small mark is one minute, five from number to number.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The magnifier numbers the five spaces between two numbers, then the minute hand steps on one mark at a time, the arc lighting in fives, while a count of minutes climbs to the answer.",
    items: [
      /* learn ML2: answer in the plan = Fifteen minutes */
      { qid: "M1.S1.T2.C5:ML2", kind: "span", from: 4, to: 7, t: [11, 20], parts: MC_MIN, answer: [15], near: 12, winMs: 3400,
        say: "How many minutes does the minute hand take to move from the four to the seven?",
        ask: "Minutes from the 4 to the 7?",
        miss: "How many spaces are there between two numbers?" },
      /* practice 2: answer in the plan = Sixty marks, which take sixty minutes, or one hour */
      { qid: "M1.S1.T2.C5:2", kind: "round", from: 12, t: [1, 0], parts: [{ label: "marks" }, { label: "minutes" }], answer: [60, 60], near: "48|48", winMs: 5600,
        say: "The minute hand goes once round the face. How many small marks does it pass, and how many minutes?",
        ask: "Marks and minutes?",
        miss: "Twelve numbers stand round the face. How many minutes lie between one number and the next?" },
      /* practice 3: answer in the plan = Thirty-five minutes, because seven stretches of five marks are thirty-five marks */
      { qid: "M1.S1.T2.C5:3", kind: "span", from: 2, to: 9, t: [11, 10], parts: MC_MIN, answer: [35], near: 7, winMs: 4600,
        say: "The minute hand moves from the two to the nine. How many minutes pass?",
        ask: "Minutes from the 2 to the 9?",
        miss: "Seven numbers go by, but that is not seven minutes. Count the spaces, not the numbers." },
    ],
  },
  {
    n: 3,
    concept: "Counting on from the last number",
    conceptId: "M1.S1.T2.C6", objectiveIds: ["O2"],
    says: ["Count in fives to the last number the hand has passed. Now count the marks after it.", "Tap count on to light the fives."],
    /* tries, as the plan writes it: First rung, from the item: which number has the minute hand just passed? Second rung, the phase's: how many minutes does that number stand for? Third rung: the hand is set exactly on a number, and the child counts the fives to it before the marks after it come back. The pad stays open. */
    ladder: ["How many minutes does that number stand for?","Count the fives only, up to that number. Then add the small marks one at a time."],
    closing: "Count in fives to the last number the minute hand has passed, then count the marks after it.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: count fives to the last number passed, then the marks.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The fives ring shows, the counting arc lights a block of five at a time to the last number passed and then each mark after it, and the readout uncovers the time.",
    items: [
      /* learn ML3: answer in the plan = Thirty-four minutes past the hour */
      { qid: "M1.S1.T2.C6:ML3", kind: "count", t: [2, 34], parts: MC_MIN, answer: [34], near: 10, winMs: 3000,
        say: "The minute hand points at the fourth small mark after the six. How many minutes past the hour is it?",
        ask: "Minutes past the hour?",
        miss: "Which number has the minute hand just passed?" },
      /* practice 4: answer in the plan = Fifty-two minutes: the ten stands for fifty, and two marks more make fifty-two */
      { qid: "M1.S1.T2.C6:4", kind: "count", t: [8, 52], parts: MC_MIN, answer: [52], near: 12, winMs: 3200,
        say: "Now the minute hand is two marks past the ten. Read the minutes the same way.",
        ask: "Minutes past the hour now?",
        miss: "What does the ten stand for, counting in fives?" },
      /* practice 5: answer in the plan = At the third small mark after the three, because the three stands for fifteen minutes
         and three marks more make eighteen. The child drags the minute hand there: the answer is the mark it points at */
      { qid: "M1.S1.T2.C6:5", kind: "point", t: [6, 18], start: [6, 0], pad: "enter", answer: 18, near: 15, winMs: 2600,
        say: "Where does the minute hand point at 6:18? Drag it there.",
        ask: "Show 6:18",
        miss: "Count in fives from the twelve. Where do you stop?" },
    ],
  },
  {
    n: 4,
    concept: "The hour the hand has passed",
    conceptId: "M1.S1.T2.C7", objectiveIds: ["O2"],
    says: ["The hour hand is nearly at the next number. Which number has it passed?", "Tap the magnifier to see the hour hand up close."],
    /* tries, as the plan writes it: First rung, from the item: which number has the hour hand passed? Second rung, the phase's: has the minute hand reached the twelve yet? Third rung: the clock is cut to a time early in the hour, with the hour hand just past a number, before the late time comes back. The pad and the hands stay open. */
    ladder: ["Has the minute hand reached the twelve yet?","Think of the same hour just after the o'clock, with the hour hand just past a number."],
    closing: "The hour is the number the hour hand has passed, not the one it is nearly at.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: the hour is the number the hour hand has passed.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The hour finder rings the number passed and outlines the next, the magnifier spreads the hour hand's tip, the minute hand runs on to the twelve before the hour hand touches the next number, and the clock ends on the right time with its readout and words.",
    /* four plan questions, three a phase: practice 6 (10:41) is left out as unused. It is ML4's reading again
       (a time late in the hour, read and typed), and the phase keeps practice 8's quarter-to and practice 7's drawing */
    items: [
      /* learn ML4: answer in the plan = 3:58, which is two minutes to four */
      { qid: "M1.S1.T2.C7:ML4", kind: "read", t: [3, 58], hourTap: true, parts: MC_HM, answer: [3, 58], near: "4|58", winMs: 2800,
        say: "The minute hand points at the third small mark after the eleven. The hour hand is just before the four. What time is it?",
        ask: "Read the time",
        miss: "Your time is the pale pair of hands. Has four o'clock come yet?" },
      /* practice 8: answer in the plan = 5:45. A quarter to six is fifteen minutes before six o'clock, so the hour hand has passed the five and not yet reached the six */
      { qid: "M1.S1.T2.C7:8", kind: "read", t: [5, 45], hourTap: true, wordsUp: true, parts: MC_HM, answer: [5, 45], near: "6|45", winMs: 5000,
        say: "A clock shows a quarter to six. A child writes the time as 6:45. What should it be?",
        ask: "The right time?",
        miss: "The pale hands show what you wrote. A quarter to six comes before six o'clock. Which hour is it still?" },
      /* practice 7: answer in the plan = The minute hand points at the first small mark after the eleven. The hour hand is between
         the twelve and the one, almost at the one, because one o'clock has not yet come. The child draws both hands */
      { qid: "M1.S1.T2.C7:7", kind: "set", t: [12, 56], start: [6, 0], pad: "enter", answer: "12:56", near: "11:56", winMs: 2800,
        say: "Set the clock to 12:56. Drag both hands to where they point.",
        ask: "Set the hands to 12:56",
        miss: "Where is the hour hand a few minutes before one o'clock?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  clock: { centre: [334, 466], radius: 214, marks: 60, numbers: 12, fivesRing: "5, 10, 15 ... 60 beside the long marks" },
  minuteHand: "drags round the face and snaps to the nearest of the 60 marks; the hour hand turns with it, half a degree a minute, and passes to the next hour at the twelve",
  hourHand: "drags freely; a pale ghost shows where it settles: h + m/60 for the hour nearest the drop, so it stands on a number only at an o'clock",
  answers: "a time is typed as hours and minutes in two boxes; a drawn time is read off the hands exactly (h:mm); a pointed minute is the mark the minute hand is on",
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  /* a drawn time: the hands read h:mm exactly (this tool's clocks are drawn exactly) */
  if (item.kind === "set") { const a = mcParse(v); return a !== null && a === mcParse(item.answer); }
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(String(v)) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work:
   from the hands' angles (6 degrees a minute mark, 30 degrees an hour, half a degree a minute for the hour hand),
   and for a span by walking the marks one at a time */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const hourOf = (h: number, m: number) => { const deg = (h % 12) * 30 + m / 2; return Math.floor(deg / 30) || 12; };
  const minOf = (m: number) => { const deg = m * 6; return Math.floor(deg / 30) * 5 + Math.round((deg % 30) / 6); };
  const walk = (a: number, b: number) => { let k = 0, at = (a % 12) * 5; do { at = (at + 1) % 60; k++; } while (at !== (b % 12) * 5); return k; };
  if (it.kind === "set") { const h = hourOf(it.t[0], it.t[1]), m = minOf(it.t[1]); return it.answer === `${h}:${m < 10 ? "0" + m : m}`; }
  if (it.kind === "read") return it.answer[0] === hourOf(it.t[0], it.t[1]) && it.answer[1] === minOf(it.t[1]);
  const one = Array.isArray(it.answer) ? it.answer[0] : it.answer;
  if (it.kind === "count" || it.kind === "point") return one === minOf(it.t[1]);
  if (it.kind === "span") return one === walk(it.from, it.to);
  if (it.kind === "round") { const marks = walk(it.from, it.from); return it.answer[0] === marks && it.answer[1] === marks; }
  return false;
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print. A drawn time or a pointed minute is the
   question's own target (the child builds it), so it has none; a read time is its written form (the question may
   give it in words, "twenty past eleven", which the child turns into figures) */
const answerForms = (item: any) => (item.kind === "set" || item.kind === "point" ? []
  : item.kind === "read" ? [mcText(mcAt(item.answer[0], item.answer[1]))]
  : item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : [String(item.answer), indian(item.answer), words(item.answer)]);
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
/* the face: disc, the magnifier's stretch, the path to count, the counting arc, sixty marks, the hour finder,
   the twelve numbers and the fives ring. Drawing only (pointer-events none); the controls lie on top. */
function mcFace(C: any, o: any) {
  const { cx, cy, R } = MC;
  const out: any[] = [<circle key="disc" cx={cx} cy={cy} r={R} fill={C.panel} stroke={C.ink} strokeWidth={6} />];
  if (o.bracket) {
    /* the stretch the magnifier spreads: a bracket outside the rim with the magnifier's own tall end ticks */
    const d0 = (o.bracket % 12) * 30, a0 = mcPt(d0, 219), a1 = mcPt(d0, 240), b0 = mcPt(d0 + 30, 219), b1 = mcPt(d0 + 30, 240);
    out.push(<path key="br" d={mcArc(d0, d0 + 30, 232)} fill="none" stroke={C.ink} strokeWidth={4} />);
    out.push(<line key="br0" x1={a0.x} y1={a0.y} x2={a1.x} y2={a1.y} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />);
    out.push(<line key="br1" x1={b0.x} y1={b0.y} x2={b1.x} y2={b1.y} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />);
  }
  if (o.path) out.push(<path key="path" d={mcArc(o.path.start * 6, (o.path.start + o.path.n) * 6, MC.arc)} fill="none" stroke={C.ink} strokeWidth={2.5} strokeDasharray="6 8" />);
  if (o.arc && o.arc.n > 0) {
    const k0 = o.arc.start, n = o.arc.n, f = Math.min(o.arc.fives || 0, n);
    for (let b = 0; b * 5 < f; b++) {
      const s = (k0 + 5 * b) * 6;
      out.push(<path key={"ab" + b} d={mcArc(s + 1.2, s + 28.8, MC.arc)} fill="none" stroke={MC_BLUE} strokeWidth={11} />);
    }
    for (let j = f; j < n; j++) {
      const s = (k0 + j) * 6;
      out.push(<path key={"as" + j} d={mcArc(s + 1, s + 5, MC.arc)} fill="none" stroke={MC_BLUE} strokeWidth={11} />);
    }
  }
  for (let j = 0; j < 60; j++) {
    const long = j % 5 === 0, a = mcPt(j * 6, R - 4), b = mcPt(j * 6, R - (long ? 30 : 20));
    out.push(<line key={"mk" + j} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={C.ink} strokeWidth={long ? 6 : 3.5} strokeLinecap="round" />);
  }
  for (let k = 1; k <= 12; k++) {
    const p = mcPt(k * 30, MC.num);
    if (o.finder && o.finder.p === k) out.push(<circle key={"fp" + k} cx={p.x} cy={p.y} r={30} fill={tint(MC_VERM, 0.6)} stroke={MC_VERM} strokeWidth={4} />);
    if ((o.finder && o.finder.q === k) || o.target === k) out.push(<circle key={"fq" + k} cx={p.x} cy={p.y} r={30} fill="none" stroke={C.ink} strokeWidth={3.5} />);
  }
  if (o.ring) {
    for (let k = 1; k <= 12; k++) {
      const p = mcPt(k * 30, MC.ring), lit = o.ringLit === k * 5;
      if (lit) out.push(<rect key={"rl" + k} x={p.x - 31} y={p.y - 20} width={62} height={40} rx={12} fill={tint(MC_BLUE, 0.75)} stroke={MC_BLUE} strokeWidth={2} />);
      out.push(<text key={"r" + k} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="central" fontSize={T.micro} fontWeight={700} fill={shade(MC_BLUE, 0.25)}>{String(k * 5)}</text>);
    }
  }
  return <g pointerEvents="none">{out}</g>;
}

/* the twelve numerals, drawn over the hands with a halo of the face's colour, so a hand passes under a numeral
   and never strikes it through */
function mcNumbers(C: any, finder: any) {
  const out: any[] = [];
  for (let k = 1; k <= 12; k++) {
    const p = mcPt(k * 30, MC.num), halo = finder && finder.p === k ? tint(MC_VERM, 0.6) : C.panel;
    out.push(<text key={"n" + k} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="central" fontSize={T.prompt} fontWeight={700}
      fill={C.ink} stroke={halo} strokeWidth={7} strokeLinejoin="round" paintOrder="stroke">{String(k)}</text>);
  }
  return <g pointerEvents="none">{out}</g>;
}

/* the two hands from one near-black hub: the minute hand long and deep blue with a paper edge (so the vermilion
   hour hand shows beside it when they meet), the hour hand short, thick and vermilion. A ghost is the same pair
   in a lighter tint with a dashed paper stripe down its middle (never opacity). grips = which hands show a knob;
   lift = the hand being dragged, lifted on the shared lift shadow */
function mcHandsAt(C: any, mDeg: number, hDeg: number, ghost: boolean, key: string, grips?: any, lift?: string) {
  const mt = mcPt(mDeg, MC.mLen), mb = mcPt(mDeg + 180, 26), ht = mcPt(hDeg, MC.hLen), hb = mcPt(hDeg + 180, 20);
  const mg = mcPt(mDeg, MC.mGrip), hg = mcPt(hDeg, MC.hGrip);
  const hc = ghost ? tint(MC_VERM, 0.35) : MC_VERM, mc = ghost ? tint(MC_BLUE, 0.35) : MC_BLUE, hub = { x: MC.cx, y: MC.cy };
  const stripe = (a: any, b: any) => <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#FFFFFF" strokeWidth={3} strokeDasharray="7 7" />;
  const hour = (
    <g filter={lift === "h" ? "url(#fLift)" : undefined}>
      <line x1={hb.x} y1={hb.y} x2={ht.x} y2={ht.y} stroke={hc} strokeWidth={22} strokeLinecap="round" />
      {ghost && stripe(hub, ht)}
      {lift === "h" && <circle cx={MC.cx} cy={MC.cy} r={16} fill="none" />}
    </g>
  );
  /* the hour hand's knob sits above the minute hand, so it stays in sight when the hands meet (12:00) */
  const hourKnob = grips && grips.h
    ? <g filter={lift === "h" ? "url(#fLift)" : undefined}><circle cx={hg.x} cy={hg.y} r={17} fill={MC_VERM} stroke="#FFFFFF" strokeWidth={3} /></g>
    : null;
  const minute = (
    <g filter={lift === "m" ? "url(#fLift)" : undefined}>
      {!ghost && <line x1={mb.x} y1={mb.y} x2={mt.x} y2={mt.y} stroke={C.paper} strokeWidth={16} strokeLinecap="round" />}
      <line x1={mb.x} y1={mb.y} x2={mt.x} y2={mt.y} stroke={mc} strokeWidth={10} strokeLinecap="round" />
      {ghost && stripe(hub, mt)}
      {grips && grips.m && <circle cx={mg.x} cy={mg.y} r={14} fill={MC_BLUE} stroke="#FFFFFF" strokeWidth={3} />}
      {lift === "m" && <circle cx={MC.cx} cy={MC.cy} r={16} fill="none" />}
    </g>
  );
  return (
    <g key={key} pointerEvents="none">
      {hour}
      {minute}
      {hourKnob}
      <circle cx={MC.cx} cy={MC.cy} r={ghost ? 9 : 15} fill={ghost ? tint(C.ink, 0.35) : C.ink} />
    </g>
  );
}
const mcHands = (C: any, tm: number, ghost: boolean, key: string, grips?: any, lift?: string) => mcHandsAt(C, mcMin(tm) * 6, mcNorm(tm) * 0.5, ghost, key, grips, lift);

/* a closed lid: flat, hatched, never raised like a key (it is not a control: opening it would give the answer) */
function mcLid(C: any, x: number, y: number, w: number, h: number, id: string) {
  /* diagonal hatch, each line cut to the lid by arithmetic (a clip would leave its full length for the zone check) */
  const lines: any[] = [], pad = 6;
  for (let k = -h; k < w; k += 22) {
    const t0 = Math.max(pad, -k + pad), t1 = Math.min(h - pad, w - k - pad);
    if (t1 > t0) lines.push(<line key={id + k} x1={x + k + t0} y1={y + h - t0} x2={x + k + t1} y2={y + h - t1} stroke={C.rule} strokeWidth={3} />);
  }
  return (
    <g pointerEvents="none">
      <rect x={x} y={y} width={w} height={h} rx={12} fill={C.panel} />
      {lines}
    </g>
  );
}

/* the digital readout: the hours in vermilion ink, the minutes in deep blue ink, always two places */
function mcReadout(C: any, tm: number, covered: boolean) {
  const cx = MC_RO.x + MC_RO.w / 2, bl = MC_RO.y + 80, m = mcMin(tm);
  return (
    <g pointerEvents="none">
      <rect x={MC_RO.x} y={MC_RO.y} width={MC_RO.w} height={MC_RO.h} rx={18} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} />
      {covered ? mcLid(C, MC_RO.x + 10, MC_RO.y + 10, MC_RO.w - 20, MC_RO.h - 20, "mc-lid-ro") : (
        <g>
          <text x={cx - 16} y={bl} textAnchor="end" fontSize={T.display} fontWeight={700} fill={shade(MC_VERM, 0.25)}>{String(mcHour(tm))}</text>
          <text x={cx} y={bl - 6} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>:</text>
          <text x={cx + 16} y={bl} textAnchor="start" fontSize={T.display} fontWeight={700} fill={shade(MC_BLUE, 0.25)}>{(m < 10 ? "0" : "") + m}</text>
        </g>
      )}
    </g>
  );
}

/* the words card: face down (a card back) or its two lines */
function mcCard(C: any, lines: string[] | null, tx: any, one?: boolean) {
  const x = MC_WC.x, y = MC_WC.y, w = MC_WC.w, h = MC_WC.h;
  /* Hindi and Gujarati read the time as one phrase ("नौ बजकर पाँच मिनट"), and their script needs the height of
     two lines: one line, a size smaller when long */
  const joined = lines && one ? lines.join(" ") : "";
  return (
    <g pointerEvents="none">
      <rect x={x} y={y} width={w} height={h} rx={16} fill="#FFFFFF" stroke={lines ? C.ink : C.rule} strokeWidth={lines ? 2.5 : 2} />
      {lines && one
        ? <text x={x + w / 2} y={y + 56} textAnchor="middle" fontSize={joined.length <= 22 ? T.label : T.micro} fontWeight={600} fill={C.ink}>{joined}</text>
        : lines
        ? lines.map((l: string, i: number) => (
            <text key={"w" + i} x={x + w / 2} y={y + 38 + 38 * i} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(l)}</text>
          ))
        : mcLid(C, x + 8, y + 8, w - 16, h - 16, "mc-lid-wc")}
    </g>
  );
}

/* the count of minutes (phase 2), where the words card stands; once round, the marks are counted too */
function mcCount(C: any, k: number, round: boolean, hour: boolean, tx: any) {
  const x = MC_WC.x, y = MC_WC.y;
  return (
    <g pointerEvents="none">
      <rect x={x} y={y} width={MC_WC.w} height={MC_WC.h} rx={16} fill="#FFFFFF" stroke={C.ink} strokeWidth={2.5} />
      {round ? (
        <g>
          <text x={x + 110} y={y + 38} textAnchor="end" fontSize={T.label} fontWeight={700} fill={shade(MC_BLUE, 0.25)}>{String(k)}</text>
          <text x={x + 124} y={y + 38} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(k === 1 ? "mark" : "marks")}</text>
          <text x={x + 110} y={y + 76} textAnchor="end" fontSize={T.label} fontWeight={700} fill={shade(MC_BLUE, 0.25)}>{String(k)}</text>
          <text x={x + 124} y={y + 76} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(k === 1 ? "minute" : "minutes")}</text>
          {hour && <text x={x + MC_WC.w - 30} y={y + 76} textAnchor="end" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("one hour")}</text>}
        </g>
      ) : (
        <g>
          <text x={x + 110} y={y + 64} textAnchor="end" fontSize={T.xl} fontWeight={700} fill={shade(MC_BLUE, 0.25)}>{String(k)}</text>
          <text x={x + 124} y={y + 60} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(k === 1 ? "minute" : "minutes")}</text>
        </g>
      )}
    </g>
  );
}

/* the magnifier: the space between two numbers spread wide, its four small lines drawn tall, and its five
   spaces numbered as they are counted; tip = a hand's tip spread with it */
function mcMag(C: any, a: number, lit: number[], tip: any) {
  const b = MC_MAG.base, x0 = MC_MAG.x0;
  return (
    <g pointerEvents="none">
      <rect x={MC_MAG.x} y={MC_MAG.y} width={MC_MAG.w} height={MC_MAG.h} rx={20} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} />
      {lit.map((k: number, i: number) => (
        <g key={"ml" + k}>
          <rect x={x0 + 80 * k + 4} y={b - 32} width={72} height={28} rx={6} fill={tint(MC_BLUE, 0.55)} />
          <text x={x0 + 80 * k + 40} y={b + 40} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(MC_BLUE, 0.25)}>{String(i + 1)}</text>
        </g>
      ))}
      <line x1={x0} y1={b} x2={x0 + 400} y2={b} stroke={C.ink} strokeWidth={3} />
      {[0, 1, 2, 3, 4, 5].map((k) => {
        const long = k === 0 || k === 5;
        return <line key={"mt" + k} x1={x0 + 80 * k} y1={b} x2={x0 + 80 * k} y2={b - (long ? 62 : 38)} stroke={C.ink} strokeWidth={long ? 6 : 3.5} strokeLinecap="round" />;
      })}
      <text x={x0} y={MC_MAG.y + 44} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{String(a)}</text>
      <text x={x0 + 400} y={MC_MAG.y + 44} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{String((a % 12) + 1)}</text>
      {tip && <polygon points={`${x0 + 400 * tip.frac},${b + 4} ${x0 + 400 * tip.frac - 15},${b + 34} ${x0 + 400 * tip.frac + 15},${b + 34}`} fill={tip.c} />}
    </g>
  );
}

/* a toggle's face (the Hit on top of it is the control): a small picture at the left, where the invite sits,
   and its label. quiet = flat and quiet while a correction runs (the control is off then), as the pad's keys are */
function mcBtn(C: any, x: number, label: string, on: boolean, quiet: boolean, icon: string) {
  const y = MC_BT.y, ix = x + 30, iy = y + MC_BT.h / 2, ink = quiet ? mix(C.ink, "#FFFFFF", 0.3) : C.ink;
  const blue = quiet ? tint(MC_BLUE, 0.4) : MC_BLUE;
  const pic = icon === "ring" ? [0, 1, 2, 3, 4, 5].map((k) => { const a = (k * 60 * Math.PI) / 180; return <circle key={"i" + k} cx={ix + 13 * Math.sin(a)} cy={iy - 13 * Math.cos(a)} r={4} fill={blue} />; })
    : icon === "arc" ? [<path key="ia" d={`M ${ix} ${iy - 15} A 15 15 0 0 1 ${ix + 15} ${iy}`} fill="none" stroke={blue} strokeWidth={6} />,
        <circle key="ib" cx={ix} cy={iy} r={15} fill="none" stroke={ink} strokeWidth={2} />]
    : [<circle key="il" cx={ix - 3} cy={iy - 3} r={11} fill="none" stroke={ink} strokeWidth={4} />,
        <line key="ih" x1={ix + 5} y1={iy + 5} x2={ix + 14} y2={iy + 14} stroke={ink} strokeWidth={5} strokeLinecap="round" />];
  return (
    <g pointerEvents="none">
      <rect x={x} y={y} width={MC_BT.w} height={MC_BT.h} rx={18} fill={quiet ? C.paper : on ? tint(C.accent, 0.72) : "#FFFFFF"}
        stroke={quiet ? C.rule : C.ink} strokeWidth={quiet ? 1.5 : 2.5} />
      {pic}
      <text x={x + 62} y={y + 46} fontSize={T.micro} fontWeight={600} fill={ink}>{label}</text>
    </g>
  );
}

function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  /* every English word the picture draws goes through tx("...") (its key is added to TR); a number in words
     is wordsIn(n, lang) */
  const C = api.C;
  const tl = useTimeline();
  const wordsOf = (tm: number, past?: boolean) => mcSay(tm, past, lang);   /* the words card, in the language in use */
  const free = stage === "free";
  const kind = free ? "free" : item.kind;
  const tgt = !free && item.t ? mcAt(item.t[0], item.t[1]) : 0;
  const startOf = () => (free ? mcAt(10, 10) : item.start ? mcAt(item.start[0], item.start[1]) : tgt);

  const [clk, setClk] = useState(startOf);        /* the child's own clock (a drawn time, a pointed minute, free play) */
  const clkRef = useRef(clk);
  const [ring, setRing] = useState(false);         /* the fives ring, shown by the child */
  const [arcOn, setArcOn] = useState(false);       /* the counting arc in free play */
  const [steps, setSteps] = useState(0);           /* count-on presses (phase 3) */
  const [lit, setLit] = useState<number[]>([]);    /* magnifier spaces the child has counted (phase 2) */
  const [zoom, setZoom] = useState(false);         /* the magnifier on the hour hand's tip (phase 4) */
  const [show, setShow] = useState<any>(null);     /* the demo layer: a traceback or a win; the child's next act clears it */
  const [touched, setTouched] = useState(false);   /* the child has acted on this question (the invite goes) */
  const [focusKnob, setFocusKnob] = useState<string | null>(null);  /* a hand holding the keyboard focus (ring drawn round its knob) */
  const [nudge, setNudge] = useState(false);       /* a reading question's hands were touched: the toggle answers with one pulse */
  const nudgeTimer = useRef<any>(null);
  useEffect(() => () => clearTimeout(nudgeTimer.current), []);
  const acted = useRef(false);                     /* a drawn answer has changed since the question opened or the last miss */
  const lastDir = useRef(1);                       /* the way the minute hand last turned (breaks a half-turn tie) */
  const busy = tl.busy;
  const live = (stage === "ask" || stage === "teach" || free) && !busy;
  const winLike = stage === "win" || stage === "idle";

  /* a new question (or free play) starts clean */
  const itemKey = free ? "free" : n + ":" + index;
  useEffect(() => {
    tl.stop();
    const s0 = startOf();
    clkRef.current = s0; setClk(s0);
    setRing(false); setArcOn(false); setSteps(0); setLit([]); setZoom(false); setShow(null); setTouched(false);
    acted.current = false;
  }, [itemKey]);

  const put = (o: any) => setShow((s: any) => ({ ...(s || {}), ...o }));
  const clear = () => { if (show) setShow(null); if (!touched) setTouched(true); };
  const setTo = (v: number) => {
    const nv = mcNorm(v);
    if (nv === clkRef.current) return;
    clkRef.current = nv; setClk(nv); api.sfx.tick();
  };
  const pointOnly = kind === "point";
  /* the minute hand snaps to the nearest mark; the hour hand turns with it and passes to the next hour at the twelve */
  const minuteTo = (deg: number) => {
    const cur = clkRef.current, m0 = mcMin(cur), m1 = Math.round(deg / 6) % 60;
    if (m1 === m0) return;
    if (pointOnly) { setTo(Math.floor(cur / 60) * 60 + m1); return; }
    /* the short way round; exactly half a turn (a straight drag through the hub) keeps the way it was going */
    let d = ((m1 - m0 + 90) % 60) - 30;
    if (d === -30 && lastDir.current > 0) d = 30;
    lastDir.current = d > 0 ? 1 : -1;
    setTo(cur + d);
  };
  /* the hour hand settles at h + m/60 for the hour nearest where it was dropped */
  const snapHour = (deg: number) => {
    const m = mcMin(clkRef.current), p = deg / 30;
    let best = 0, bd = 99;
    for (let k = 0; k < 12; k++) { let d = Math.abs(p - (k + m / 60)); d = Math.min(d, 12 - d); if (d < bd) { bd = d; best = k; } }
    return best * 60 + m;
  };
  const stepBy = (which: string, dir: number) => {
    acted.current = true; clear();
    const cur = clkRef.current;
    if (which === "hour") setTo(cur + 60 * Math.sign(dir));
    else if (pointOnly) setTo(Math.floor(cur / 60) * 60 + ((mcMin(cur) + dir + 60) % 60));
    else { lastDir.current = dir > 0 ? 1 : -1; setTo(cur + dir); }
  };
  const drag = useDrag((which: any, p: any, moved: boolean) => {
    if (!live) return;
    /* a touch or a click that does not move leaves the hand where it is (the child is only taking hold of it);
       the keyboard's Space arrives here with no point, and steps the hand on */
    if (!moved) { if (!isFinite(p.x)) stepBy(which, 1); return; }
    if (Math.hypot(p.x - MC.cx, p.y - MC.cy) < 24) return;
    acted.current = true; clear();
    if (which === "hour") setTo(snapHour(mcDeg(p.x, p.y))); else minuteTo(mcDeg(p.x, p.y));
  });
  const dd = drag.drag;
  /* the minute hand follows the finger mark by mark while it is dragged */
  const dragOn = useRef(false);
  useEffect(() => {
    if (!dd) { dragOn.current = false; return; }
    if (!dragOn.current) { dragOn.current = true; lastDir.current = 1; }   /* a new drag starts going forwards */
    if (dd.payload !== "min" || !dd.moved || !live) return;
    if (Math.hypot(dd.x - MC.cx, dd.y - MC.cy) < 24) return;
    acted.current = true; clear();
    minuteTo(mcDeg(dd.x, dd.y));
  }, [dd ? Math.round(dd.x) : null, dd ? Math.round(dd.y) : null]);
  /* arrows turn a hand a mark (the minute hand) or an hour (the hour hand); Shift + arrow or Page Up / Page Down
     turn the minute hand five marks; Space steps it on; Enter passes to the window, so it always answers */
  const keysFor = (which: string) => (e: any) => {
    if (!live) return;
    const k = e.key, big = e.shiftKey || k === "PageUp" || k === "PageDown";
    const d = k === "ArrowRight" || k === "ArrowUp" || k === "PageUp" ? 1 : k === "ArrowLeft" || k === "ArrowDown" || k === "PageDown" ? -1 : 0;
    if (d) { e.preventDefault(); e.stopPropagation(); stepBy(which, which === "min" && big ? 5 * d : d); return; }
    if (k === " ") drag.keys(which).onKeyDown(e);
  };
  const focusFor = (which: string) => ({
    onFocus: (e: any) => { let kb = true; try { kb = e.target.matches(":focus-visible"); } catch (x) {} if (kb) setFocusKnob(which); },
    onBlur: () => setFocusKnob((f) => (f === which ? null : f)),
  });

  /* a drawn answer goes with Enter, only once the child has acted since the question opened or since a miss */
  const answerNow = () => (pointOnly ? mcMin(clkRef.current) : mcText(clkRef.current));
  api.onEnter(!free && item.pad === "enter" && stage === "ask" ? () => { if (!acted.current || busy) return; api.submit(answerNow()); } : null);
  HOOK.set = (v: any) => {
    let tv: number | null;
    if (pointOnly) {
      /* the minutes the hand points at: 18, "18", or the minutes of a written time ("6:18", "06:18", "6.18",
         "6 18"), whose hour must be this question's own hour */
      const s = typeof v === "number" ? String(v) : String(v ?? "").trim();
      const g = s.match(/^(?:(\d{1,2})\s*[:.|\s]\s*)?(\d{1,2})$/);
      const hr = g && g[1] !== undefined ? Number(g[1]) : null, m = g ? Number(g[2]) : NaN;
      const hourOk = hr === null || (hr >= 1 && hr <= 12 && hr % 12 === item.t[0] % 12);
      tv = hourOk && m >= 0 && m < 60 ? mcAt(item.t[0], m) : null;
    }
    else tv = mcParse(v);
    if (tv === null) return false;
    clkRef.current = tv; setClk(tv); acted.current = true; setShow(null); setTouched(true);
    return true;
  };

  /* ── the demo runs (traceback and win) ── */
  const countRun = (mm: number, ms: number) => {
    const out: any[] = [], B = Math.floor(mm / 5);
    for (let b = 1; b <= B; b++) out.push([ms, () => put({ arc: { start: 0, n: b * 5, fives: b * 5 }, ringLit: b * 5 })]);
    for (let j = B * 5 + 1; j <= mm; j++) out.push([ms, () => put({ arc: { start: 0, n: j, fives: B * 5 } })]);
    return out;
  };
  const walkRun = (t0: number, span: number, ms: number) => {
    const out: any[] = [], s0 = mcMin(t0);
    for (let k = 1; k <= span; k++) out.push([ms, () => put({ hand: t0 + k, arc: { start: s0, n: k, fives: Math.floor(k / 5) * 5 }, count: k })]);
    return out;
  };
  const magRun = (ms: number) => [0, 1, 2, 3, 4].map((k) => [ms, () => put({ lit: [0, 1, 2, 3, 4].slice(0, k + 1) })]);
  const sweepRun = (t1: number, ms: number) => {
    const end = mcNorm(t1), h0 = Math.floor(end / 60) * 60, out: any[] = [[ms, () => put({ ghost: h0 })]];
    for (let t = h0 + 1; t <= end; t++) out.push([ms, () => put({ ghost: t })]);
    return out;
  };
  const traceRun = (v: any): any[] => {
    const mm = mcMin(tgt), cv = mcParse(v);
    if (kind === "set") {
      /* the child's hands read back in words, the fives ring, pale hands sweep from the o'clock to the time
         (the hour hand creeping on as the minutes pass), the hour passed, then the time in words */
      const ms = Math.max(35, Math.min(160, Math.round(1500 / (mm + 1))));
      return [
        [cv !== null ? 1400 : 0, () => put(cv !== null ? { words: wordsOf(cv) } : {})],
        [700, () => put({ ring: true, ringLit: mm >= 5 ? Math.floor(mm / 5) * 5 : null })],
        ...sweepRun(tgt, ms),
        [900, () => put({ finderAt: tgt })],
        [300, () => put({ words: wordsOf(tgt) })],
      ];
    }
    if (kind === "read" && item.hourTap) {
      /* the hour passed and the next, the hour hand's tip spread in the magnifier, the child's time as a pale pair,
         then the minute hand runs on to the twelve: only then does the hour hand reach the next number */
      const end = (Math.floor(tgt / 60) + 1) * 60, run: any[] = [];
      const ms = Math.max(60, Math.round(900 / Math.max(1, end - tgt)));
      for (let t = tgt + 1; t <= end; t++) run.push([ms, () => put({ hand: t, finderAt: t })]);
      const other = cv !== null && cv !== tgt;
      return [
        [1000, () => put({ finderAt: tgt, zoom: true })],
        [other ? 1000 : 0, () => put(other ? { ghost: cv } : {})],
        ...run,
        [1000, null],
        [400, () => put({ hand: null, finderAt: tgt })],
        [300, () => put({ readout: true, words: wordsOf(tgt) })],
      ];
    }
    if (kind === "read") return [[600, () => put({ ring: true })], ...countRun(mm, 170), [700, () => put({ finderAt: tgt })], [300, () => put({ readout: true, words: wordsOf(tgt) })]];
    if (kind === "count") return [[600, () => put({ ring: true })], ...countRun(mm, 300), [300, () => put({ readout: true, words: wordsOf(tgt, true) })]];
    if (kind === "point") return [[600, () => put({ ring: true })], ...countRun(mm, 260), [300, () => put({ ghost: tgt })]];
    /* span and round: the magnifier numbers the five spaces between two numbers, then the hand steps on mark by mark */
    const span = kind === "round" ? 60 : mcNum(item);
    return [...magRun(260), [500, null], ...walkRun(tgt, span, kind === "round" ? 55 : 110), [300, () => put(kind === "round" ? { oneHour: true } : {})]];
  };
  const winRun = (): any[] => {
    const mm = mcMin(tgt);
    if (kind === "set") return [[150, () => put({ finderAt: tgt, words: wordsOf(tgt) })]];
    if (kind === "read") return [[150, () => put({ readout: true, words: wordsOf(tgt), ...(item.hourTap ? { finderAt: tgt } : {}) })]];
    if (kind === "count") return [[250, () => put({ ring: true })], ...countRun(mm, 110), [150, () => put({ readout: true, words: wordsOf(tgt, true) })]];
    if (kind === "point") return [[250, () => put({ ring: true })], ...countRun(mm, 110)];
    const span = kind === "round" ? 60 : mcNum(item);
    return [[200, () => put({ lit: [0, 1, 2, 3, 4] })], ...walkRun(tgt, span, kind === "round" ? 45 : 70), [150, () => put(kind === "round" ? { oneHour: true } : {})]];
  };

  /* the traceback: the pad locks, the demo layer redraws the maths and ends on the whole right answer; the
     child's own hands, taps and typed answer stay as they are */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    acted.current = false;
    api.lock(true);
    setShow(null);
    tl.run(traceRun(wrong.value), () => api.lock(false));
  }, [wrong]);
  /* the win: the maths moving to the answer */
  useEffect(() => {
    if (stage !== "win" || free) return;
    setShow(null);
    tl.run(winRun());
    if (item.qid === "M1.S1.T2.C7:8") api.say("Yes, 5:45. A quarter to six is fifteen minutes before six.");
  }, [stage]);

  /* ── what is drawn ── */
  const sh = show || {};
  const own = kind === "set" || kind === "point" || free;
  const spanLike = kind === "span" || kind === "round";
  const base = own ? (winLike && !free ? tgt : clk) : tgt;
  const disp = sh.hand !== undefined && sh.hand !== null ? sh.hand : base;
  const m = mcMin(disp);
  const hourDrag = dd && dd.payload === "hour" && dd.moved && live && Math.hypot(dd.x - MC.cx, dd.y - MC.cy) >= 24 ? mcDeg(dd.x, dd.y) : null;
  const mDeg = m * 6, hDeg = hourDrag !== null ? hourDrag : mcNorm(disp) * 0.5;

  let arc = sh.arc || null, ringLit = sh.ringLit !== undefined ? sh.ringLit : null;
  const list = kind === "count" ? mcCountList(m) : [];
  if (!arc && kind === "count" && steps > 0) {
    const k = list[Math.min(steps, list.length) - 1], f = Math.min(k, Math.floor(m / 5) * 5);
    arc = { start: 0, n: k, fives: f }; ringLit = f >= 5 ? f : null;
  }
  if (!arc && free && arcOn) { const f = Math.floor(m / 5) * 5; arc = { start: 0, n: m, fives: f }; ringLit = f >= 5 ? f : null; }
  const ringShown = ring || !!sh.ring;
  const fAt = sh.finderAt !== undefined && sh.finderAt !== null ? sh.finderAt : free ? disp : null;
  const finder = fAt === null ? null : { p: mcHour(fAt), q: (mcHour(fAt) % 12) + 1 };

  let mag: any = null;
  if (spanLike) mag = { a: item.from, lit: sh.lit || lit, tip: null };
  else if (free) mag = { a: Math.floor(m / 5) || 12, lit: [0, 1, 2, 3, 4].slice(0, m % 5), tip: { frac: (m % 5) / 5, c: MC_BLUE } };
  else if (item.hourTap && (zoom || sh.zoom)) {
    const a0 = Math.floor(tgt / 60);
    mag = { a: a0 || 12, lit: [], tip: { frac: Math.min(1, (mcNorm(disp) - a0 * 60) / 60), c: MC_VERM } };
  }
  const readout = spanLike ? null : { tm: own ? (free ? clk : tgt) : tgt, covered: own ? false : !sh.readout };
  const card = spanLike ? null : free ? wordsOf(clk) : sh.words ? sh.words : item.wordsUp ? wordsOf(tgt) : null;

  const knobs = own && live && !winLike;
  const fivesBtn = free || n >= 3;
  /* the second toggle: count on (phase 3 readings), the magnifier on the hour hand (phase 4 readings), the
     count arc (free play) */
  const second = free ? "arc" : kind === "count" ? "count" : item.hourTap ? "zoom" : null;
  const secondOn = second === "arc" ? arcOn : second === "zoom" ? zoom || !!sh.zoom : second === "count" ? steps > 0 || !!sh.arc : false;
  const quiet = busy || winLike;
  /* one invite on the one thing to touch, until the child touches something; never over a correction. On a
     reading question it is a strong ring round the whole toggle (the runtime's breathing ring, still under
     reduced motion); elsewhere the small pulse on the knob or the next space */
  const inviting = live && !touched && !free && !winLike && !show && !wrong;
  const toggleInvite = inviting && (kind === "count" || !!item.hourTap);
  const inviteAt = !inviting || toggleInvite ? null
    : kind === "set" || kind === "point" ? mcPt(mDeg, MC.mGrip)
    : spanLike && lit.length < 5 ? { x: MC_MAG.x0 + 80 * lit.length + 40, y: MC_MAG.base - 18 } : null;
  /* a touch or a drag on the hands of a reading question (they do not move there) pulses the toggle once */
  const poke = () => {
    if (!live) return;
    setNudge(true);
    clearTimeout(nudgeTimer.current);
    nudgeTimer.current = setTimeout(() => setNudge(false), 1200);
  };
  const mg = mcPt(mDeg, MC.mGrip), hg = mcPt(hDeg, MC.hGrip);
  const lift = dd && dd.moved && live ? (dd.payload === "hour" ? "h" : "m") : undefined;

  /* what the host and the agent read back (toolApi.getState): never the answer before it is given */
  api.share({
    phase: n, kind,
    hour: own ? mcHour(disp) : winLike && !spanLike ? mcHour(tgt) : null,
    minute: own ? mcMin(disp) : winLike && !spanLike ? mcMin(tgt) : null,
    readoutCovered: !!(readout && readout.covered), fivesRing: ringShown, arcCount: arc ? arc.n : 0,
    hourPassed: finder ? finder.p : null, drawnHands: own ? mcText(disp) : null,
    thumb: { h: kind === "count" || kind === "point" ? item.t[0] : null, from: spanLike ? item.from : null },
  });

  return (
    <g>
      {mcFace(C, { ring: ringShown, ringLit, arc, finder, bracket: mag && spanLike ? item.from : null,
        path: spanLike ? { start: (item.from % 12) * 5, n: kind === "round" ? 60 : mcNum(item) } : null,
        target: kind === "span" ? item.to : null })}
      {sh.ghost !== undefined && sh.ghost !== null && mcHands(C, sh.ghost, true, "ghost")}
      {hourDrag !== null && mcHands(C, snapHour(hourDrag), true, "snap")}
      {mcHandsAt(C, mDeg, hDeg, false, "hands", { m: knobs, h: knobs && !pointOnly }, lift)}
      {mcNumbers(C, finder)}
      {/* the keyboard's ring hugs the knob of the hand that holds the focus */}
      {knobs && focusKnob && <circle cx={focusKnob === "hour" ? hg.x : mg.x} cy={focusKnob === "hour" ? hg.y : mg.y} r={26}
        fill="none" stroke={shade(C.accent, 0.4)} strokeWidth={5} pointerEvents="none" />}
      {readout && mcReadout(C, readout.tm, readout.covered)}
      {!spanLike && mcCard(C, card, tx, lang === "hi" || lang === "gu")}
      {spanLike && typeof sh.count === "number" && mcCount(C, sh.count, kind === "round", !!sh.oneHour, tx)}
      {mag && mcMag(C, mag.a, mag.lit, mag.tip)}
      {fivesBtn && mcBtn(C, MC_BT.x1, tx("fives ring"), ringShown, quiet && !free, "ring")}
      {second && mcBtn(C, MC_BT.x2, tx(second === "arc" ? "count arc" : second === "count" ? "count on" : "magnifier"), secondOn || (nudge && live), quiet && !free, second === "zoom" ? "lens" : "arc")}
      {second && second !== "arc" && (toggleInvite || (nudge && live)) && (
        <rect className="c4-ring" x={MC_BT.x2 - 8} y={MC_BT.y - 8} width={MC_BT.w + 16} height={MC_BT.h + 16} rx={24}
          fill="none" stroke={shade(C.accent, 0.4)} strokeWidth={nudge ? 8 : 5} pointerEvents="none" />
      )}

      {/* the controls, on top of the drawing */}
      {second && second !== "arc" && live && <circle cx={MC.cx} cy={MC.cy} r={MC.R} fill="transparent" onPointerDown={poke} />}
      {fivesBtn && live && <Hit id="fives" x={MC_BT.x1} y={MC_BT.y} w={MC_BT.w} h={MC_BT.h} label="fives ring" onPress={() => { clear(); setRing(!ringShown); }} />}
      {second === "arc" && <Hit id="count-arc" x={MC_BT.x2} y={MC_BT.y} w={MC_BT.w} h={MC_BT.h} label="count arc" onPress={() => setArcOn((a) => !a)} />}
      {second === "count" && live && <Hit id="count-on" x={MC_BT.x2} y={MC_BT.y} w={MC_BT.w} h={MC_BT.h} label="count on round the face"
        onPress={() => { clear(); setSteps((s) => (s >= list.length ? 1 : s + 1)); api.sfx.tick(); }} />}
      {second === "zoom" && live && <Hit id="magnifier" x={MC_BT.x2} y={MC_BT.y} w={MC_BT.w} h={MC_BT.h} label="magnifier on the hour hand"
        onPress={() => { clear(); setZoom(!secondOn); }} />}
      {/* the magnifier counts in order: each press lights the next space from the left and numbers it */}
      {spanLike && live && <Hit id="count-space" x={MC_MAG.x0} y={MC_MAG.y + 52} w={400} h={112} label="count the next space"
        onPress={() => { clear(); setLit((L) => (L.length >= 5 ? [0] : [...L, L.length])); api.sfx.tick(); }} />}
      {knobs && !pointOnly && (
        <g key="khour" {...control("hour-hand", "hour hand")} {...drag.bind("hour")} onKeyDown={keysFor("hour")} {...focusFor("hour")} style={{ outline: "none" }}>
          <circle cx={hg.x} cy={hg.y} r={38} fill="transparent" />
        </g>
      )}
      {knobs && (
        <g key="kmin" {...control("minute-hand", "minute hand")} {...drag.bind("min")} onKeyDown={keysFor("min")} {...focusFor("min")} style={{ outline: "none" }}>
          <circle cx={mg.x} cy={mg.y} r={38} fill="transparent" />
        </g>
      )}
      {inviteAt && <Invite x={inviteAt.x} y={inviteAt.y} r={28} C={C} />}
    </g>
  );
}

/* the running count (runs zone): the clocks read or set against the clocks this phase holds */
function MinuteRuns({ phase, index, stage, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  if (stage === "summary") return null;
  const total = (phase.items || []).length;
  const done = stage === "win" || stage === "idle" ? index + 1 : stage === "ask" ? index : 0;
  const hand = (deg: number, r: number) => { const a = ((deg - 90) * Math.PI) / 180; return { x: 44 + r * Math.cos(a), y: 38 + r * Math.sin(a) }; };
  const mt = hand(60, 18), ht = hand(300, 11);
  return (
    <g>
      <circle cx={44} cy={38} r={24} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} />
      <line x1={44} y1={38} x2={ht.x} y2={ht.y} stroke={MC_VERM} strokeWidth={5} strokeLinecap="round" />
      <line x1={44} y1={38} x2={mt.x} y2={mt.y} stroke={MC_BLUE} strokeWidth={3.5} strokeLinecap="round" />
      {stage === "free"
        ? <text x={84} y={49} fontSize={T.micro} fontWeight={500} fill={C.ink}>{tx("any time")}</text>
        : lang === "hi" || lang === "gu"
          ? <text x={84} y={50} fontSize={T.label} fontWeight={700} fill={C.ink}>{lang === "hi" ? `${total} में से ${done}` : `${total} માંથી ${done}`}
              <tspan dx={12} fontSize={T.micro} fontWeight={500}>{tx("clocks")}</tspan></text>
          : <text x={84} y={50} fontSize={T.label} fontWeight={700} fill={C.ink}>{`${done} of ${total}`}</text>}
      {stage !== "free" && lang !== "hi" && lang !== "gu" && <text x={200} y={49} fontSize={T.micro} fontWeight={500} fill={C.ink}>{tx("clocks")}</text>}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const L = result && result.last;
  if (!L || L.value === null || L.value === undefined) return null;
  const th = (L.shared && L.shared.thumb) || {};
  let tm: number | null = null, text = "", arc: any = null;
  if (L.kind === "set" || L.kind === "read") tm = mcParse(L.value);
  else if ((L.kind === "point" || L.kind === "count") && th.h) tm = mcAt(th.h, leadNumber(String(L.value)));
  else if (L.kind === "span" || L.kind === "round") {
    const span = L.kind === "round" ? 60 : leadNumber(String(L.value)), s0 = ((th.from || 12) % 12) * 5;
    arc = { s0, span };
    tm = mcAt(1, (s0 + span) % 60);
    text = `${span} ${tx("minutes")}`;
  }
  if (tm === null) return null;
  if (!text) text = mcText(tm);
  const r = Math.max(20, Math.min(h / 2 - 4, arc ? 26 : 34)), cx = r + 6, cy = h / 2;
  const at = (deg: number, rr: number) => { const a = ((deg - 90) * Math.PI) / 180; return { x: cx + rr * Math.cos(a), y: cy + rr * Math.sin(a) }; };
  const mt = at(mcMin(tm) * 6, r * 0.82), ht = at(mcNorm(tm) * 0.5, r * 0.52);
  let arcPath = "";
  if (arc) {
    const d0 = arc.s0 * 6, d1 = d0 + Math.min(arc.span * 6, 359.5), a = at(d0, r * 0.9), b = at(d1, r * 0.9);
    arcPath = `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} A ${r * 0.9} ${r * 0.9} 0 ${d1 - d0 > 180 ? 1 : 0} 1 ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
  }
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={C.panel} stroke={C.ink} strokeWidth={3} />
      {arcPath && <path d={arcPath} fill="none" stroke={MC_BLUE} strokeWidth={5} />}
      {!arc && <line x1={cx} y1={cy} x2={ht.x} y2={ht.y} stroke={MC_VERM} strokeWidth={5} strokeLinecap="round" />}
      <line x1={cx} y1={cy} x2={mt.x} y2={mt.y} stroke={MC_BLUE} strokeWidth={3.5} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={3.5} fill={C.ink} />
      <text x={w - 8} y={cy + 10} textAnchor="end" fontSize={arc ? T.micro : T.label} fontWeight={700} fill={C.ink}>{text}</text>
    </g>
  );
}

function MinuteClock(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      Runs: MinuteRuns, judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default MinuteClock;
