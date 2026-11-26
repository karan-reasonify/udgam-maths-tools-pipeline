/* ═══ M2.S3.T5.C16.2D1 · timeline_board · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "timeline_board";
const MEDIA_ID = "M2.S3.T5.C16.2D1";
const TOOL_NAME = "Timeline Board";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["One day on one line, read two ways. How many hours have passed since midnight?"];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Times written in four digits, noon and the hour after midnight read off the line, and each one changed back.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. The whole line with both readouts, the gate, the board and the clock bay open.";

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, and the runtime looks each spoken or drawn line up in it.
   Fill it AFTER the English is final and reviewed (`node cli.mjs voice` lists every line still missing),
   then bake the voice. Empty = the tool runs in English only. */
/* Chapter 12 glossary: hour घंटा/કલાક, minute मिनट/મિનિટ, day दिन/દિવસ, noon दोपहर/બપોર, midnight आधी रात/
   મધ્યરાત્રિ, clock घड़ी/ઘડિયાળ, a.m. पूर्वाह्न/પૂર્વાહ્ન, p.m. अपराह्न/અપરાહ્ન. On screen "a.m." and "p.m."
   stay in Latin letters (keys, labels, tags, the slot's boxes: they have no entry here); the voice says
   the words. A clock time is said the way the language says it ("7 बजकर 5 मिनट", "7 વાગીને 5 મિનિટ"): the
   runtime spells the digits but has no clock rule. A 24-hour time is written in words, hours then minutes
   ("सोलह पचास घंटे"), never as one large number; on screen it stays four digits. */
const TR: any = {
  hi: {
    "Timeline Board": "समय-रेखा बोर्ड",
    "One day on one line, read two ways. How many hours have passed since midnight?": "एक रेखा पर एक दिन, दो तरह से पढ़ो। आधी रात से अब तक कितने घंटे बीते?",
    "Times written in four digits, noon and the hour after midnight read off the line, and each one changed back.": "समय चार अंकों में लिखे, दोपहर और आधी रात के बाद का घंटा रेखा से पढ़ा, और हर समय वापस बदला।",
    "Free play. The whole line with both readouts, the gate, the board and the clock bay open.": "मुक्त खेल। पूरी रेखा, दोनों समय पट्टियाँ, फाटक, बोर्ड और घड़ियाँ खुली हैं।",
    "Four digits, no a.m. or p.m.": "चार अंक, a.m. या p.m. नहीं",
    "Read the four digits. Which two are the hours, and which two are the minutes?": "चारों अंक पढ़ो। कौन-से दो घंटे हैं, और कौन-से दो मिनट?",
    "The first two digits count the hours since midnight. What do the last two count?": "पहले दो अंक आधी रात से बीते घंटे गिनते हैं। आखिरी दो क्या गिनते हैं?",
    "A one-digit hour needs a zero in front, and the minutes always take two digits.": "एक अंक वाले घंटे के आगे शून्य लगता है, और मिनट हमेशा दो अंकों के होते हैं।",
    "The 24-hour clock writes four digits, two for the hours and two for the minutes. It needs no a.m., and no p.m.": "24 घंटे की घड़ी चार अंक लिखती है, दो घंटों के और दो मिनटों के। इसमें पूर्वाह्न या अपराह्न नहीं लगता।",
    "You learned: four digits, two for the hours and two for the minutes.": "तुमने सीखा: चार अंक, दो घंटों के और दो मिनटों के।",
    "On the 24-hour clock, write 7:05 a.m.": "24 घंटे की घड़ी पर, पूर्वाह्न 7 बजकर 5 मिनट लिखो।",
    "7:05 a.m. in four digits": "7:05 a.m. चार अंकों में",
    "How many digits does a 24-hour time have?": "24 घंटे वाले समय में कितने अंक होते हैं?",
    "Next is 6:20 a.m. What are its four digits?": "अब पूर्वाह्न 6 बजकर 20 मिनट। इसके चार अंक क्या हैं?",
    "6:20 a.m. in four digits": "6:20 a.m. चार अंकों में",
    "Does the hour have two digits yet?": "क्या घंटे के दो अंक हो गए?",
    "Last, 10:08 a.m., in four digits.": "आखिर में, पूर्वाह्न 10 बजकर 8 मिनट, चार अंकों में।",
    "10:08 a.m. in four digits": "10:08 a.m. चार अंकों में",
    "How many digits do the minutes need?": "मिनटों को कितने अंक चाहिए?",
    "Afternoon hours gain twelve": "दोपहर बाद के घंटों में 12 जुड़ते हैं",
    "Past one in the afternoon, add twelve to the hour. What do you get?": "दोपहर एक बजे के बाद, घंटे में बारह जोड़ो। क्या मिलता है?",
    "Is it one o'clock in the afternoon or later, and what is twelve more than its hour?": "क्या दोपहर का एक बज चुका है? इसके घंटे से बारह ज़्यादा कितना है?",
    "At one o'clock in the afternoon, the hours since midnight are already thirteen.": "दोपहर एक बजे, आधी रात से बीते घंटे पहले ही तेरह हो जाते हैं।",
    "From one o'clock in the afternoon to just before midnight, twelve is added to the hour.": "दोपहर एक बजे से आधी रात से ठीक पहले तक, घंटे में बारह जोड़ा जाता है।",
    "You learned: from one in the afternoon on, add twelve to the hour.": "तुमने सीखा: दोपहर एक बजे से, घंटे में बारह जोड़ो।",
    "On the 24-hour clock, write 9:25 p.m.": "24 घंटे की घड़ी पर, अपराह्न 9 बजकर 25 मिनट लिखो।",
    "9:25 p.m. in four digits": "9:25 p.m. चार अंकों में",
    "Is the time before noon or after it?": "यह समय दोपहर से पहले है या बाद में?",
    "A film starts at 10:40 p.m. What time is that in four digits?": "एक फ़िल्म अपराह्न 10 बजकर 40 मिनट पर शुरू होती है। चार अंकों में यह कौन-सा समय है?",
    "10:40 p.m. in four digits": "10:40 p.m. चार अंकों में",
    "Which colour is the film's time in, the sky blue or the orange?": "फ़िल्म का समय किस रंग में है, आसमानी या नारंगी?",
    "A clock gains 3 minutes every hour. It is set right at 9:20 a.m. What does it show 4 hours later, in 24-hour time?": "एक घड़ी हर घंटे 3 मिनट आगे हो जाती है। उसे पूर्वाह्न 9 बजकर 20 मिनट पर ठीक किया गया। 4 घंटे बाद वह 24 घंटे वाले समय में क्या दिखाएगी?",
    "4 hours later, in four digits": "4 घंटे बाद, चार अंकों में",
    "How many minutes has it gained after four hours?": "चार घंटे में वह कितने मिनट आगे हुई?",
    "The twelve o'clock hours": "बारह बजे वाले घंटे",
    "Is twelve noon twelve hours after midnight, or twenty-four? How many whole hours have passed just after midnight?": "क्या दोपहर 12 बजे आधी रात के 12 घंटे बाद है, या 24? आधी रात के ठीक बाद कितने पूरे घंटे बीते हैं?",
    "Count the hours from the left-hand midnight post to the marker.": "बाईं ओर के आधी रात वाले खंभे से मार्कर तक घंटे गिनो।",
    "Just after midnight, no whole hour has passed yet. What fills the two hour places?": "आधी रात के ठीक बाद, अभी कोई पूरा घंटा नहीं बीता। घंटे की दोनों जगहों पर क्या आएगा?",
    "Twelve noon is twelve hundred hours, and a time just after midnight begins with zero zero.": "दोपहर 12 बजे बारह सौ घंटे है, और आधी रात के ठीक बाद का समय शून्य शून्य से शुरू होता है।",
    "You learned: noon is twelve hundred; after midnight comes zero zero.": "तुमने सीखा: दोपहर बारह सौ है; आधी रात के बाद शून्य शून्य आता है।",
    "Write both on the 24-hour clock: 12:35 p.m., then 12:35 a.m.": "दोनों को 24 घंटे की घड़ी पर लिखो: अपराह्न 12 बजकर 35 मिनट, फिर पूर्वाह्न 12 बजकर 35 मिनट।",
    "12:35 p.m. and 12:35 a.m.": "12:35 p.m. और 12:35 a.m.",
    "Is the time just after noon, or just after midnight?": "यह समय दोपहर के ठीक बाद है, या आधी रात के ठीक बाद?",
    "Now 12:48 a.m. Give it four digits.": "अब पूर्वाह्न 12 बजकर 48 मिनट। इसे चार अंक दो।",
    "12:48 a.m. in four digits": "12:48 a.m. चार अंकों में",
    "Which post is nearer to 12:48 a.m., the midnight post or the noon post?": "पूर्वाह्न 12 बजकर 48 मिनट किस खंभे के पास है, आधी रात वाले या दोपहर वाले?",
    "A child adds twelve to 12 noon and writes twenty-four hundred hours. What should noon be?": "एक बच्चा दोपहर 12 में बारह जोड़कर चौबीस सौ घंटे लिखता है। दोपहर क्या होनी चाहिए?",
    "Noon in four digits": "दोपहर चार अंकों में",
    "Does noon come at the end of the day, or halfway through it?": "दोपहर दिन के अंत में आती है, या आधे दिन पर?",
    "Back to the 12-hour clock": "वापस 12 घंटे की घड़ी पर",
    "Is the hour more than twelve? Then take twelve away and write p.m.": "क्या घंटा बारह से ज़्यादा है? तो बारह घटाओ और अपराह्न लिखो।",
    "Take twelve away. Is what is left an hour on the 12-hour clock face?": "बारह घटाओ। जो बचा, क्या वह 12 घंटे की घड़ी पर कोई घंटा है?",
    "Read the 12-hour row under the marker.": "मार्कर के नीचे 12 घंटे वाली पंक्ति पढ़ो।",
    "Take twelve from an hour of thirteen or more and write p.m. An hour of twelve stays twelve and is p.m., and zero zero is twelve a.m.": "तेरह या उससे ज़्यादा घंटे में से बारह घटाओ और अपराह्न लिखो। बारह का घंटा बारह ही रहता है और अपराह्न होता है, और शून्य शून्य पूर्वाह्न बारह है।",
    "You learned: an hour over twelve loses twelve; zero zero is twelve a.m.": "तुमने सीखा: बारह से ऊपर, बारह घटाओ; शून्य शून्य पूर्वाह्न बारह।",
    "Change sixteen fifty hours into a 12-hour time. Is it a.m., or p.m.?": "सोलह पचास घंटे को 12 घंटे वाले समय में बदलो। यह पूर्वाह्न है, या अपराह्न?",
    "1650 hours in 12-hour time": "1650 घंटे, 12 घंटे के समय में",
    "Did you use all of sixteen, or only the six?": "क्या तुमने पूरा सोलह लिया, या सिर्फ़ छह?",
    "Now twelve nineteen hours. What is it on the 12-hour clock?": "अब बारह उन्नीस घंटे। 12 घंटे की घड़ी पर यह क्या है?",
    "1219 hours in 12-hour time": "1219 घंटे, 12 घंटे के समय में",
    "Is there an hour called zero on a 12-hour clock face?": "क्या 12 घंटे की घड़ी पर शून्य नाम का कोई घंटा है?",
    "Last, zero zero twenty-six hours. Which 12-hour time is that?": "आखिर में, शून्य शून्य छब्बीस घंटे। यह 12 घंटे वाला कौन-सा समय है?",
    "0026 hours in 12-hour time": "0026 घंटे, 12 घंटे के समय में",
    "What is the hour just after midnight called on the 12-hour clock?": "12 घंटे की घड़ी पर आधी रात के ठीक बाद वाले घंटे को क्या कहते हैं?",
    "On the board, tap a.m., or p.m.": "बोर्ड के पास, a.m. या p.m. वाला बटन दबाओ।",
    /* drawn on the working area, the slot's box labels and the summary drawing */
    "hours": "घंटे", "minutes": "मिनट", "midnight": "आधी रात", "noon": "दोपहर", "add twelve": "12 जोड़ो",
    "right time": "सही समय", "gains 3 min": "3 मिनट आगे", "gained": "आगे हुई", "min": "मिनट", "+1 hour": "+1 घंटा",
    "take twelve": "12 घटाओ", "starts a day": "दिन शुरू", "ends a day": "दिन खत्म",
  },
  gu: {
    "Timeline Board": "સમયરેખા બોર્ડ",
    "One day on one line, read two ways. How many hours have passed since midnight?": "એક રેખા પર એક દિવસ, બે રીતે વાંચો. મધ્યરાત્રિથી અત્યાર સુધી કેટલા કલાક વીત્યા?",
    "Times written in four digits, noon and the hour after midnight read off the line, and each one changed back.": "સમય ચાર અંકોમાં લખ્યા, બપોર અને મધ્યરાત્રિ પછીનો કલાક રેખા પરથી વાંચ્યો, અને દરેક સમય પાછો બદલ્યો.",
    "Free play. The whole line with both readouts, the gate, the board and the clock bay open.": "મુક્ત રમત. આખી રેખા, બંને સમય પટ્ટીઓ, દરવાજો, બોર્ડ અને ઘડિયાળો ખુલ્લાં છે.",
    "Four digits, no a.m. or p.m.": "ચાર અંક, a.m. કે p.m. નહીં",
    "Read the four digits. Which two are the hours, and which two are the minutes?": "ચારેય અંક વાંચો. કયા બે કલાક છે, અને કયા બે મિનિટ?",
    "The first two digits count the hours since midnight. What do the last two count?": "પહેલા બે અંક મધ્યરાત્રિથી વીતેલા કલાક ગણે છે. છેલ્લા બે શું ગણે છે?",
    "A one-digit hour needs a zero in front, and the minutes always take two digits.": "એક અંકના કલાક આગળ શૂન્ય મૂકાય છે, અને મિનિટ હંમેશાં બે અંકની હોય છે.",
    "The 24-hour clock writes four digits, two for the hours and two for the minutes. It needs no a.m., and no p.m.": "24 કલાકની ઘડિયાળ ચાર અંક લખે છે, બે કલાકના અને બે મિનિટના. તેમાં પૂર્વાહ્ન કે અપરાહ્ન લાગતું નથી.",
    "You learned: four digits, two for the hours and two for the minutes.": "તમે શીખ્યા: ચાર અંક, બે કલાકના અને બે મિનિટના.",
    "On the 24-hour clock, write 7:05 a.m.": "24 કલાકની ઘડિયાળ પર, પૂર્વાહ્ન 7 વાગીને 5 મિનિટ લખો.",
    "7:05 a.m. in four digits": "7:05 a.m. ચાર અંકોમાં",
    "How many digits does a 24-hour time have?": "24 કલાકના સમયમાં કેટલા અંક હોય છે?",
    "Next is 6:20 a.m. What are its four digits?": "હવે પૂર્વાહ્ન 6 વાગીને 20 મિનિટ. તેના ચાર અંક કયા છે?",
    "6:20 a.m. in four digits": "6:20 a.m. ચાર અંકોમાં",
    "Does the hour have two digits yet?": "શું કલાકના બે અંક થયા?",
    "Last, 10:08 a.m., in four digits.": "છેલ્લે, પૂર્વાહ્ન 10 વાગીને 8 મિનિટ, ચાર અંકોમાં.",
    "10:08 a.m. in four digits": "10:08 a.m. ચાર અંકોમાં",
    "How many digits do the minutes need?": "મિનિટને કેટલા અંક જોઈએ?",
    "Afternoon hours gain twelve": "બપોર પછીના કલાકમાં 12 ઉમેરાય",
    "Past one in the afternoon, add twelve to the hour. What do you get?": "બપોરે એક વાગ્યા પછી, કલાકમાં બાર ઉમેરો. શું મળે છે?",
    "Is it one o'clock in the afternoon or later, and what is twelve more than its hour?": "શું બપોરનો એક વાગી ગયો છે? તેના કલાકથી બાર વધુ કેટલા?",
    "At one o'clock in the afternoon, the hours since midnight are already thirteen.": "બપોરે એક વાગ્યે, મધ્યરાત્રિથી વીતેલા કલાક તેર થઈ જાય છે.",
    "From one o'clock in the afternoon to just before midnight, twelve is added to the hour.": "બપોરે એક વાગ્યાથી મધ્યરાત્રિ પહેલાં સુધી, કલાકમાં બાર ઉમેરાય છે.",
    "You learned: from one in the afternoon on, add twelve to the hour.": "તમે શીખ્યા: બપોરે એક વાગ્યાથી, કલાકમાં બાર ઉમેરો.",
    "On the 24-hour clock, write 9:25 p.m.": "24 કલાકની ઘડિયાળ પર, અપરાહ્ન 9 વાગીને 25 મિનિટ લખો.",
    "9:25 p.m. in four digits": "9:25 p.m. ચાર અંકોમાં",
    "Is the time before noon or after it?": "આ સમય બપોર પહેલાં છે કે પછી?",
    "A film starts at 10:40 p.m. What time is that in four digits?": "એક ફિલ્મ અપરાહ્ન 10 વાગીને 40 મિનિટે શરૂ થાય છે. ચાર અંકોમાં એ કયો સમય છે?",
    "10:40 p.m. in four digits": "10:40 p.m. ચાર અંકોમાં",
    "Which colour is the film's time in, the sky blue or the orange?": "ફિલ્મનો સમય કયા રંગમાં છે, આસમાની કે નારંગી?",
    "A clock gains 3 minutes every hour. It is set right at 9:20 a.m. What does it show 4 hours later, in 24-hour time?": "એક ઘડિયાળ દર કલાકે 3 મિનિટ આગળ થઈ જાય છે. તેને પૂર્વાહ્ન 9 વાગીને 20 મિનિટે સાચી કરી. 4 કલાક પછી તે 24 કલાકના સમયમાં શું બતાવશે?",
    "4 hours later, in four digits": "4 કલાક પછી, ચાર અંકોમાં",
    "How many minutes has it gained after four hours?": "ચાર કલાકમાં તે કેટલી મિનિટ આગળ થઈ?",
    "The twelve o'clock hours": "બાર વાગ્યાના કલાક",
    "Is twelve noon twelve hours after midnight, or twenty-four? How many whole hours have passed just after midnight?": "શું બપોરના 12 મધ્યરાત્રિ પછી 12 કલાકે આવે, કે 24? મધ્યરાત્રિ પછી તરત કેટલા પૂરા કલાક વીત્યા?",
    "Count the hours from the left-hand midnight post to the marker.": "ડાબી બાજુના મધ્યરાત્રિના થાંભલાથી માર્કર સુધી કલાક ગણો.",
    "Just after midnight, no whole hour has passed yet. What fills the two hour places?": "મધ્યરાત્રિ પછી તરત, હજુ કોઈ પૂરો કલાક વીત્યો નથી. કલાકની બંને જગ્યાએ શું આવે?",
    "Twelve noon is twelve hundred hours, and a time just after midnight begins with zero zero.": "બપોરના 12 એટલે બારસો કલાક, અને મધ્યરાત્રિ પછી તરતનો સમય શૂન્ય શૂન્યથી શરૂ થાય છે.",
    "You learned: noon is twelve hundred; after midnight comes zero zero.": "તમે શીખ્યા: બપોર બારસો છે; મધ્યરાત્રિ પછી શૂન્ય શૂન્ય આવે છે.",
    "Write both on the 24-hour clock: 12:35 p.m., then 12:35 a.m.": "બંનેને 24 કલાકની ઘડિયાળ પર લખો: અપરાહ્ન 12 વાગીને 35 મિનિટ, પછી પૂર્વાહ્ન 12 વાગીને 35 મિનિટ.",
    "12:35 p.m. and 12:35 a.m.": "12:35 p.m. અને 12:35 a.m.",
    "Is the time just after noon, or just after midnight?": "આ સમય બપોર પછી તરત છે, કે મધ્યરાત્રિ પછી તરત?",
    "Now 12:48 a.m. Give it four digits.": "હવે પૂર્વાહ્ન 12 વાગીને 48 મિનિટ. તેને ચાર અંક આપો.",
    "12:48 a.m. in four digits": "12:48 a.m. ચાર અંકોમાં",
    "Which post is nearer to 12:48 a.m., the midnight post or the noon post?": "પૂર્વાહ્ન 12 વાગીને 48 મિનિટ કયા થાંભલાની નજીક છે, મધ્યરાત્રિના કે બપોરના?",
    "A child adds twelve to 12 noon and writes twenty-four hundred hours. What should noon be?": "એક બાળક બપોરના 12માં બાર ઉમેરીને ચોવીસસો કલાક લખે છે. બપોર શું હોવી જોઈએ?",
    "Noon in four digits": "બપોર ચાર અંકોમાં",
    "Does noon come at the end of the day, or halfway through it?": "બપોર દિવસના અંતે આવે છે, કે અડધા દિવસે?",
    "Back to the 12-hour clock": "પાછા 12 કલાકની ઘડિયાળ પર",
    "Is the hour more than twelve? Then take twelve away and write p.m.": "શું કલાક બારથી વધુ છે? તો બાર બાદ કરો અને અપરાહ્ન લખો.",
    "Take twelve away. Is what is left an hour on the 12-hour clock face?": "બાર બાદ કરો. જે બચ્યું, તે 12 કલાકની ઘડિયાળ પર કોઈ કલાક છે?",
    "Read the 12-hour row under the marker.": "માર્કર નીચે 12 કલાકવાળી હાર વાંચો.",
    "Take twelve from an hour of thirteen or more and write p.m. An hour of twelve stays twelve and is p.m., and zero zero is twelve a.m.": "તેર કે વધુ કલાકમાંથી બાર બાદ કરો અને અપરાહ્ન લખો. બારનો કલાક બાર જ રહે છે અને અપરાહ્ન હોય છે, અને શૂન્ય શૂન્ય એટલે પૂર્વાહ્ન બાર.",
    "You learned: an hour over twelve loses twelve; zero zero is twelve a.m.": "તમે શીખ્યા: બારથી ઉપર, બાર બાદ કરો; શૂન્ય શૂન્ય એટલે પૂર્વાહ્ન બાર.",
    "Change sixteen fifty hours into a 12-hour time. Is it a.m., or p.m.?": "સોળ પચાસ કલાકને 12 કલાકના સમયમાં બદલો. એ પૂર્વાહ્ન છે, કે અપરાહ્ન?",
    "1650 hours in 12-hour time": "1650 કલાક, 12 કલાકના સમયમાં",
    "Did you use all of sixteen, or only the six?": "તમે આખા સોળ લીધા, કે ફક્ત છ?",
    "Now twelve nineteen hours. What is it on the 12-hour clock?": "હવે બાર ઓગણીસ કલાક. 12 કલાકની ઘડિયાળ પર એ શું છે?",
    "1219 hours in 12-hour time": "1219 કલાક, 12 કલાકના સમયમાં",
    "Is there an hour called zero on a 12-hour clock face?": "શું 12 કલાકની ઘડિયાળ પર શૂન્ય નામનો કોઈ કલાક છે?",
    "Last, zero zero twenty-six hours. Which 12-hour time is that?": "છેલ્લે, શૂન્ય શૂન્ય છવ્વીસ કલાક. એ 12 કલાકનો કયો સમય છે?",
    "0026 hours in 12-hour time": "0026 કલાક, 12 કલાકના સમયમાં",
    "What is the hour just after midnight called on the 12-hour clock?": "12 કલાકની ઘડિયાળ પર મધ્યરાત્રિ પછી તરતના કલાકને શું કહેવાય?",
    "On the board, tap a.m., or p.m.": "બોર્ડ પાસે, a.m. કે p.m. વાળું બટન દબાવો.",
    "hours": "કલાક", "minutes": "મિનિટ", "midnight": "મધ્યરાત્રિ", "noon": "બપોર", "add twelve": "12 ઉમેરો",
    "right time": "સાચો સમય", "gains 3 min": "3 મિનિટ આગળ", "gained": "આગળ થઈ", "min": "મિનિટ", "+1 hour": "+1 કલાક",
    "take twelve": "12 બાદ કરો", "starts a day": "દિવસ શરૂ", "ends a day": "દિવસ પૂરો",
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
const PHASES = [
  {
    n: 1,
    concept: "Four digits, no a.m. or p.m.",
    conceptId: "M2.S3.T5.C16", objectiveIds: ["O7"],
    says: ["Read the four digits. Which two are the hours, and which two are the minutes?"],
    /* tries, as the plan writes it: A miss is answered three ways at once and none of them is the answer. First rung, from the item's own miss line: how many digits does a 24-hour time have? Second rung, the phase's: which two are the hours, and which two the minutes? Third rung: the marker is set on an o'clock time in the morning, and the child writes its four digits before the minutes come back. The pad stays open behind all three rungs. */
    /* rung 3 is the plan's "an o'clock time in the morning" scaffold said as a rule, never as a time's digits */
    ladder: ["The first two digits count the hours since midnight. What do the last two count?", "A one-digit hour needs a zero in front, and the minutes always take two digits."],
    /* "a.m." never stands mid-sentence in a spoken line: the bubble pages at its full stop */
    closing: "The 24-hour clock writes four digits, two for the hours and two for the minutes. It needs no a.m., and no p.m.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: four digits, two for the hours and two for the minutes.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The marker slides to the time and the four-digit readout fills place by place, its nought lit as part of the hours; the child's digits are laid under it from the left.",
    items: [
      /* A 24-hour time is a STRING in its written form ("0705"), judged exactly, so 705 and 075 are not 0705.
         given = the 12-hour time the question names; at = minutes since midnight (the marker's place) */
      /* learn ML1: answer in the plan = 0705 hours */
      { qid: "M2.S3.T5.C16:ML1", kind: "four", given: "7:05 a.m.", at: 425, answer: "0705", near: "705", winMs: 2200,
        say: "On the 24-hour clock, write 7:05 a.m.", ask: "7:05 a.m. in four digits", miss: "How many digits does a 24-hour time have?" },
      /* practice 1: answer in the plan = 0620 hours */
      { qid: "M2.S3.T5.C16:1", kind: "four", given: "6:20 a.m.", at: 380, answer: "0620", near: "620", winMs: 2200,
        say: "Next is 6:20 a.m. What are its four digits?", ask: "6:20 a.m. in four digits", miss: "Does the hour have two digits yet?" },
      /* authored: the plan has only two questions for this phase; this one checks the phase landed with a
         two-digit hour and a nought in the minutes (the plan's other misconception, 075 for 0705) */
      { qid: null, kind: "four", given: "10:08 a.m.", at: 608, answer: "1008", near: "108", winMs: 2200,
        say: "Last, 10:08 a.m., in four digits.", ask: "10:08 a.m. in four digits", miss: "How many digits do the minutes need?" },
    ],
  },
  {
    n: 2,
    concept: "Afternoon hours gain twelve",
    conceptId: "M2.S3.T5.C17", objectiveIds: ["O7"],
    says: ["Past one in the afternoon, add twelve to the hour. What do you get?"],
    /* tries, as the plan writes it: First rung, from the item: is the time before noon or after it? Second rung, the phase's: is it one o'clock in the afternoon or later, and what is twelve more than its hour? Third rung: the marker is set on one o'clock in the afternoon exactly, and the child writes its four digits before the later time comes back. The pad stays open. */
    /* rung 3 is the plan's "one o'clock in the afternoon exactly" scaffold, said as a line */
    ladder: ["Is it one o'clock in the afternoon or later, and what is twelve more than its hour?", "At one o'clock in the afternoon, the hours since midnight are already thirteen."],
    closing: "From one o'clock in the afternoon to just before midnight, twelve is added to the hour.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: from one in the afternoon on, add twelve to the hour.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The marker slides through the add twelve gate to the time and the readout reads the hour plus twelve; a pale pin shows where the child's four digits stand; for the gaining clock the bay runs four hours, three minutes gained each.",
    items: [
      /* learn ML2: answer in the plan = 2125 hours */
      { qid: "M2.S3.T5.C17:ML2", kind: "four", given: "9:25 p.m.", at: 1285, answer: "2125", near: "0925", winMs: 2200,
        say: "On the 24-hour clock, write 9:25 p.m.", ask: "9:25 p.m. in four digits", miss: "Is the time before noon or after it?" },
      /* practice 2 (3:40 p.m. = 1540 hours) is left out: three questions a phase, and practice 4 asks the
         same with a two-digit afternoon hour; it is listed as unused */
      /* practice 4: answer in the plan = 2240 hours */
      { qid: "M2.S3.T5.C17:4", kind: "four", given: "10:40 p.m.", at: 1360, answer: "2240", near: "1040", winMs: 2200,
        say: "A film starts at 10:40 p.m. What time is that in four digits?", ask: "10:40 p.m. in four digits", miss: "Which colour is the film's time in, the sky blue or the orange?" },
      /* practice 8: answer in the plan = 1:32 p.m., which is 1332 hours. The true time is 1:20 p.m., and the clock has gained 4 times 3, which is 12 minutes.
         The slot takes the 24-hour form (this phase's topic). Predict first: while the question is open the
         clocks stand at 9:20 a.m. (gained 0 min); the four hours run only in the win, the correction and Free play */
      { qid: "M2.S3.T5.C17:8", kind: "clock", given: "9:20 a.m.", set: 560, hours: 4, gain: 3, at: 812, answer: "1332", near: "1320", winMs: 2600,
        say: "A clock gains 3 minutes every hour. It is set right at 9:20 a.m. What does it show 4 hours later, in 24-hour time?",
        ask: "4 hours later, in four digits", miss: "How many minutes has it gained after four hours?" },
    ],
  },
  {
    n: 3,
    concept: "The twelve o'clock hours",
    conceptId: "M2.S3.T5.C18", objectiveIds: ["O8"],
    says: ["Is twelve noon twelve hours after midnight, or twenty-four? How many whole hours have passed just after midnight?"],
    /* tries, as the plan writes it: First rung, from the item: is the time just after noon, or just after midnight? Second rung, the phase's: how many whole hours have passed since midnight? Third rung: the marker is set on the noon post itself, and the child writes 1200 hours before the minutes after it come back. The pad stays open. */
    /* the plan's rung 2 ("how many whole hours have passed since midnight?") is almost the teach's second
       question word for word, so it is said as an act; rung 3 is the plan's noon-post scaffold, said without 1200 */
    ladder: ["Count the hours from the left-hand midnight post to the marker.", "Just after midnight, no whole hour has passed yet. What fills the two hour places?"],
    closing: "Twelve noon is twelve hundred hours, and a time just after midnight begins with zero zero.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: noon is twelve hundred; after midnight comes zero zero.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The marker stands on the noon post with the gate shut, or just after the left-hand midnight post, and the readout shows 1200 or a time starting 00; pale pins show where the child's numbers stand (a 24 past the bar's end), and when the child counted on to 24 the card by the right-hand post lights: 0000 hours starts a day, 2400 hours ends it.",
    items: [
      /* learn ML3: answer in the plan = 12:35 p.m. is 1235 hours, and 12:35 a.m. is 0035 hours.
         Two boxes, one a time; each box is a four-digit string judged exactly (0035, never 35) */
      { qid: "M2.S3.T5.C18:ML3", kind: "pair", given: ["12:35 p.m.", "12:35 a.m."], ats: [755, 35], parts: [{ label: "p.m." }, { label: "a.m." }],
        answer: ["1235", "0035"], near: "2435|1235", winMs: 2600,
        say: "Write both on the 24-hour clock: 12:35 p.m., then 12:35 a.m.", ask: "12:35 p.m. and 12:35 a.m.", miss: "Is the time just after noon, or just after midnight?" },
      /* practice 5: answer in the plan = 0048 hours, because it is forty-eight minutes after midnight */
      { qid: "M2.S3.T5.C18:5", kind: "four", given: "12:48 a.m.", at: 48, answer: "0048", near: "1248", winMs: 2200,
        say: "Now 12:48 a.m. Give it four digits.", ask: "12:48 a.m. in four digits", miss: "Which post is nearer to 12:48 a.m., the midnight post or the noon post?" },
      /* practice 6: answer in the plan = The child writes 2400 hours, which names midnight at the end of a day. Noon is 1200 hours, twelve hours after midnight, so nothing is added.
         The item says what the child writes and asks what noon should be: 1200 */
      { qid: "M2.S3.T5.C18:6", kind: "four", given: "12:00 p.m.", at: 720, answer: "1200", near: "2400", winMs: 2200,
        say: "A child adds twelve to 12 noon and writes twenty-four hundred hours. What should noon be?", ask: "Noon in four digits", miss: "Does noon come at the end of the day, or halfway through it?" },
    ],
  },
  {
    n: 4,
    concept: "Back to the 12-hour clock",
    conceptId: "M2.S3.T5.C19", objectiveIds: ["O8"],
    says: ["Is the hour more than twelve? Then take twelve away and write p.m."],
    /* tries, as the plan writes it: First rung, from the item: is the hour more than twelve, twelve itself, or less? Second rung, the phase's: what does taking twelve away leave? Third rung: the board is cut to one time with an hour of thirteen to twenty-three, and the child takes twelve from it before the other rows come back. The pad and the label keys stay open. */
    /* rung 3 is the plan's "one board time" scaffold, said as a line */
    /* rung 3 is said while the correction runs, when the 12-hour row is uncovered */
    ladder: ["Take twelve away. Is what is left an hour on the 12-hour clock face?", "Read the 12-hour row under the marker."],
    closing: "Take twelve from an hour of thirteen or more and write p.m. An hour of twelve stays twelve and is p.m., and zero zero is twelve a.m.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: an hour over twelve loses twelve; zero zero is twelve a.m.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The take twelve control lights for an hour of 13 to 23 and the subtraction is written (it stays unlit for 12, and the twelve on the 12-hour row lights for 12 and 00), the marker lands on the board time, its 12-hour twin with a.m. or p.m. is written on the board, and a pale pin shows where the child's time stands.",
    items: [
      /* A 12-hour time: hours and minutes in the slot's two boxes, a.m. or p.m. tapped on the board row
         (the tool appends it to the answer: "4|50|pm"). given = the board's 24-hour time; at = its minutes. */
      /* learn ML4: answer in the plan = 4:50 p.m. and 3:40 a.m. (the board takes 1650 hours, the phase's
         misconception; 0340 hours stays with the plan) */
      { qid: "M2.S3.T5.C19:ML4", kind: "twelve", given: "1650", at: 1010, parts: [{ label: "hours" }, { label: "minutes" }], answer: [4, 50], half: "pm", near: "6|50|pm", winMs: 2400,
        say: "Change sixteen fifty hours into a 12-hour time. Is it a.m., or p.m.?", ask: "1650 hours in 12-hour time", miss: "Did you use all of sixteen, or only the six?" },
      /* practice 3 (0850 hours = 8:50 a.m.) is left out and listed as unused: the phase needs an hour of 12
         (its Goal, its Observe line and the plan's wrong answer 0:19 p.m.). This item is practice 7's second
         time, 1219 hours; its question id stays with 0026 below (an id is used once), and its answer is the plan's */
      { qid: null, kind: "twelve", given: "1219", at: 739, parts: [{ label: "hours" }, { label: "minutes" }], answer: [12, 19], half: "pm", near: "0|19|pm", winMs: 2400,
        say: "Now twelve nineteen hours. What is it on the 12-hour clock?", ask: "1219 hours in 12-hour time", miss: "Is there an hour called zero on a 12-hour clock face?" },
      /* practice 7: answer in the plan = 12:26 a.m. and 12:19 p.m. (0026 here, 1219 above) */
      { qid: "M2.S3.T5.C19:7", kind: "twelve", given: "0026", at: 26, parts: [{ label: "hours" }, { label: "minutes" }], answer: [12, 26], half: "am", near: "0|26|am", winMs: 2400,
        say: "Last, zero zero twenty-six hours. Which 12-hour time is that?", ask: "0026 hours in 12-hour time", miss: "What is the hour just after midnight called on the 12-hour clock?" },
    ],
  },
];

/* ── the day line: geometry, colours and time helpers (working-area units) ──────────────────
   One hour is 43 across, from the left-hand midnight post at 27 to the right-hand one at 1059 (noon at 543).
   A time is minutes since the left-hand post. Never passed through indian() or words(): 1905 hours has no
   comma and is not "one thousand nine hundred five". */
/* guide: the marker's dotted line stops above the label row; the readouts hang under that row */
const TL = { x0: 27, hw: 43, bar: 64, barH: 60, knob: 94, guide: 164, tag12: 210, tag4: 272 };
const tlX = (min: number) => TL.x0 + (TL.hw * min) / 60;
/* the chapter's colours: hours vermilion, minutes deep blue, a.m. sky blue, p.m. amber, time counted green */
const TLC = { hr: "#D55E00", mn: "#0072B2", am: "#56B4E9", pm: "#E69F00", gain: "#009E73" };
const tlPad = (v: number) => (v < 10 ? "0" : "") + v;
const tlFour = (min: number) => { const m = ((min % 1440) + 1440) % 1440; return tlPad(Math.floor(m / 60)) + tlPad(m % 60); };
const tlTwelve = (min: number) => {
  const m = ((min % 1440) + 1440) % 1440, h = Math.floor(m / 60) % 12;
  if (m === 0) return "12 midnight";
  if (m === 720) return "12 noon";
  return (h === 0 ? 12 : h) + ":" + tlPad(m % 60) + (m < 720 ? " a.m." : " p.m.");
};
/* where the marker stands while each phase's teach is said (never a time a question of that phase asks) */
const TB_TEACH: any = { 1: { at: 570 }, 2: { at: 790 }, 3: { at: 720, cover: true }, 4: { at: 795 } };
/* Free play's clock bay: the phase 2 clock, set right at 9:20 a.m., 3 minutes gained an hour */
const FREE_BAY = { set: 560, gain: 3 };
/* a typed 24-hour time as its digits ("0705 hours" -> "0705"); a label a.m./p.m. from any answer form */
const tbDigits = (v: any) => String(v ?? "").replace(/hours?/gi, "").replace(/[\s:|]/g, "");
const tbHalfOf = (v: any): any => {
  const s = (Array.isArray(v) ? String(v[2] ?? "") : String(v ?? "")).toLowerCase();
  const m = /(?:^|[^a-z])([ap])\.?\s?m\.?(?![a-z])/.exec(s);
  return m ? m[1] + "m" : null;
};
/* where a child's wrong answer stands on the day line (the traceback's pale pin), or null. A 12-hour
   answer with no label is placed in the half the child chose, else the question's (fallback). A time
   past 2400 (2435) has no place on the bar: it is marked "off", written past the right-hand end. */
const tbPinOf = (v: any, item: any, at0: number, fallback?: any) => {
  if (item.kind === "twelve") {
    const p = slotPartsOf(v, 2), hf = tbHalfOf(v) || fallback, h = Number(p[0]), m = Number(p[1]);
    if (!hf || p[0] === "" || p[1] === "" || h < 1 || h > 12 || m > 59) return null;
    const at = (h % 12) * 60 + m + (hf === "pm" ? 720 : 0);
    return at === at0 ? null : { at, label: h + ":" + tlPad(m) + (hf === "pm" ? " p.m." : " a.m.") };
  }
  const s = tbDigits(v);
  if (!/^\d{4}$/.test(s)) return null;
  const h = Number(s.slice(0, 2)), m = Number(s.slice(2));
  if (m > 59 || h > 24) return null;
  if (h === 24 && m > 0) return { at: 1440, off: true, label: s };
  const at = h * 60 + m;
  return at === at0 ? null : { at, label: s };
};
/* a four-digit time the way it is read aloud (only for answerForms: the echo check) */
const tbHeard = (s: string) => {
  const h = s.slice(0, 2), m = s.slice(2);
  const hw = h === "00" ? "zero zero" : h[0] === "0" ? "zero " + words(Number(h)) : words(Number(h));
  const mw = m === "00" ? "hundred" : m[0] === "0" ? "zero " + words(Number(m)) : words(Number(m));
  return hw + " " + mw;
};

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  dayLine: { minutes: 1440, x0: TL.x0, hourWidth: TL.hw, noonPost: tlX(720), gateAt: "1:00 p.m. (780 minutes)", marker: "slides 5 minutes a step, snaps onto the question's time" },
  teachTimes: TB_TEACH,
  clockBay: { setRightAt: "9:20 a.m.", gainPerHour: 3, runs: "at 9:20 a.m. while the question is open; four hours in the win, the correction and Free play (+1 hour, back to 9:20 after four)" },
  board: ["1650", "1219", "0026"],
  caps: { fourDigit: 4, twelveHourBox: 2 },
  colours: TLC,
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a 24-hour time is a string compared exactly ("0705" is right, "705" and "075" are not); two boxes
   hold two such strings; a 12-hour time is hours (by value: 8 or 08, the board prints 0850), minutes (two
   digits) and a.m. or p.m. ("4|50|pm"). 0 or 00 for the hour is never twelve. */
const judge = (item: any, v: any) => {
  if (item.kind === "pair") { const p = slotPartsOf(v, 2); return p[0] === item.answer[0] && p[1] === item.answer[1]; }
  if (item.kind === "twelve") {
    const p = slotPartsOf(v, 2);
    return /^\d{1,2}$/.test(p[0]) && Number(p[0]) === item.answer[0] && p[1] === tlPad(item.answer[1]) && tbHalfOf(v) === item.half;
  }
  return tbDigits(v) === String(item.answer);
};
/* oracle: every answer re-derived from the question's own words, by a route that shares no code with
   judge or Work (its own parse, padStart, its own twelve arithmetic) */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const to24 = (s: string) => {
    const m = /^(\d{1,2}):(\d{2}) ([ap])\.m\.$/.exec(s);
    if (!m) return null;
    const h = (Number(m[1]) % 12) + (m[3] === "p" ? 12 : 0);
    return { four: String(h).padStart(2, "0") + m[2], min: h * 60 + Number(m[2]) };
  };
  if (it.kind === "four") { const r = to24(it.given); return !!r && r.four === it.answer && r.min === it.at; }
  if (it.kind === "pair") {
    const a = to24(it.given[0]), b = to24(it.given[1]);
    return !!a && !!b && a.four === it.answer[0] && b.four === it.answer[1] && a.min === it.ats[0] && b.min === it.ats[1];
  }
  if (it.kind === "clock") {
    const r = to24(it.given);
    if (!r) return false;
    const t = r.min + it.hours * 60 + it.hours * it.gain;
    return String(Math.floor(t / 60)).padStart(2, "0") + String(t % 60).padStart(2, "0") === it.answer && t === it.at;
  }
  if (it.kind === "twelve") {
    const hh = Number(it.given.slice(0, 2)), mm = Number(it.given.slice(2));
    const h12 = hh === 0 ? 12 : hh > 12 ? hh - 12 : hh;
    return h12 === it.answer[0] && mm === it.answer[1] && (hh < 12 ? "am" : "pm") === it.half && hh * 60 + mm === it.at;
  }
  return false;
}));
/* the most likely wrong answer (the item's misconception: 705, 0925, 2400, 6:50 p.m., 0:26 a.m.) */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print: the digits and how they are read */
const answerForms = (item: any) => {
  if (item.kind === "twelve") { const t = item.answer[0] + ":" + tlPad(item.answer[1]); return [t + (item.half === "pm" ? " p.m." : " a.m."), t]; }
  const all = Array.isArray(item.answer) ? item.answer : [item.answer];
  return all.flatMap((s: string) => [s, tbHeard(s)]);
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it: "0705" keeps its
   nought (a string), two boxes "1235|0035", a 12-hour time "4|50|pm" */
const agentKey = (item: any) => (item.kind === "pair" ? item.answer.join("|")
  : item.kind === "twelve" ? item.answer[0] + "|" + tlPad(item.answer[1]) + "|" + item.half : item.answer);

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => T.submit(agentKey(item));
/* the agent's answer(): a 12-hour time's a.m. or p.m. is set on the board as a child's tap would; the
   runtime then types the hours and minutes into the boxes (and a 24-hour string keeps its nought) */
const answer = (item: any, v: any) => {
  if (item.kind === "twelve") { const h = tbHalfOf(v); if (h && HOOK.half) HOOK.half(h); }
  return undefined;
};
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
function Work({ phase, n, item, index, stage, wrong, typed, part, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  /* every English word the picture draws goes through tx("...") (its key is added to TR) */
  const C = api.C;
  const tl = useTimeline();   /* the correction */
  const gl = useTimeline();   /* the marker gliding to a time */
  const kind = item.kind;
  const free = stage === "free", asking = stage === "ask", done = stage === "win" || stage === "idle";
  const teachAt = (TB_TEACH[n] || TB_TEACH[1]).at;
  const busy = tl.busy;

  /* the child's own pieces: the marker, a.m. or p.m. on the board, the clock bay's hours run */
  const [mk, setMk] = useState(teachAt);
  const mkRef = useRef(teachAt);
  const put = (m: number) => { mkRef.current = m; setMk(m); };
  const [touched, setTouched] = useState(false);
  const [half, setHalfState] = useState<any>(null);
  const halfRef = useRef<any>(null);
  const setHalf = (h: any) => { halfRef.current = h; setHalfState(h); };
  const [runs, setRuns] = useState(0);
  /* the correction's own layer: it never writes the child's pieces, and the child's next act clears it */
  const [demo, setDemoState] = useState<any>(null);
  const demoRef = useRef<any>(null);
  const setDemo = (d: any) => { demoRef.current = d; setDemoState(d); };
  HOOK.half = (h: any) => setHalf(h);

  /* home: where a tap or Enter on the marker brings it (the question's time; the gaining clock's start).
     qAt: the time the typed digits belong to (for the gaining clock, its answer time, which the marker
     cannot be snapped onto, so typing there never shows as a reading). answerAt: where the win puts it. */
  const home = kind === "pair" ? item.ats[Math.min(part || 0, 1)] : kind === "clock" ? item.set : item.at;
  const qAt = kind === "clock" ? item.at : home;
  const answerAt = kind === "pair" ? item.ats[0] : item.at;
  const target = stage === "teach" ? teachAt : asking ? home : done ? answerAt : null;

  const glideTo = (to: number) => {
    const from = mkRef.current, k = 10;
    if (from === to) { gl.stop(); return; }
    gl.run(Array.from({ length: k }, (_, j) => [36, () => put(Math.round(from + ((to - from) * (j + 1)) / k))]));
  };
  /* inside the correction the glide is a run of steps whose start is read when it starts */
  const glideSteps = (to: number) => {
    let from = 0;
    return Array.from({ length: 8 }, (_, j) => [40, () => { if (j === 0) from = mkRef.current; put(Math.round(from + ((to - from) * (j + 1)) / 8)); }]);
  };
  const act = () => { setTouched(true); if (demoRef.current) setDemo(null); };

  /* a new question: the child's own pieces start afresh */
  useEffect(() => { setTouched(false); setHalf(null); setRuns(0); setDemo(null); }, [n, index]);
  /* the child's next act clears the correction's layer: moving to the other box, or typing */
  useEffect(() => { if (demoRef.current && !tl.busy) setDemo(null); }, [part]);
  useEffect(() => {
    /* a four-digit answer takes 4 digits, a box of a 12-hour time 2 (the runtime would take up to 9) */
    if (asking && typed) {
      const cap = kind === "twelve" ? 2 : 4;
      if (item.parts) {
        const segs = String(typed).split("|"), ps = slotPartsOf(typed, 2);
        if (ps.some((p: string) => p.length > cap)) { api.setTyped([ps[0].slice(0, cap), ps[1].slice(0, cap), ...segs.slice(2)].join("|")); return; }
      } else if (String(typed).length > cap) { api.setTyped(String(typed).slice(0, cap)); return; }
    }
    if (demoRef.current && !tl.busy && typed !== demoRef.current.typed) setDemo(null);
    /* typing brings the marker home (for the gaining clock, back to 9:20 a.m. with its clocks, so the
       correction's 1:32 p.m. never stays as a reading under new digits) */
    if (asking && !tl.busy && typed && mkRef.current !== home) glideTo(home);
  }, [typed]);
  /* Free play opens in the afternoon, on the gaining clock's four hours (1:32 p.m.), the bay live */
  useEffect(() => { if (free) { setRuns(4); gl.stop(); put(FREE_BAY.set + (60 + FREE_BAY.gain) * 4); } }, [free]);
  /* the marker goes where the stage wants it: the teach's time, the question's, the answer's */
  useEffect(() => { if (target !== null && !tl.busy && !demoRef.current) glideTo(target); }, [target, stage]);

  /* the traceback: it redraws the maths on its own layer and ends on the whole right answer */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    gl.stop();
    api.lock(true);
    const d: any = { typed };
    const S = (o: any) => () => { Object.assign(d, o); setDemo({ ...d }); };
    const st: any[] = [[250, S({})]];
    const v = wrong.value;
    const pinsOf = (vals: any[], ats: number[]) => vals.map((x, k) => tbPinOf(x, item, ats[k], halfRef.current || item.half)).filter(Boolean);
    if (kind === "four" && n === 1) {
      /* 0705: the readout fills place by place, the nought lit as part of the hours; the child's digits under it */
      const ans = String(item.answer);
      st.push(...glideSteps(item.at));
      [1, 2, 3, 4].forEach((k) => st.push([420, S({ four: ans, shown: k, litHours: ans[0] === "0" })]));
      st.push([500, S({ lay: tbDigits(v).slice(0, 4) })]);
    } else if (kind === "four") {
      const ans = String(item.answer), early = item.at < 60, noon = item.at === 720;
      if (early) st.push([350, S({ leftPost: true, litNum: 0 })]);
      if (noon) st.push([350, S({ litNum: 12 })]);
      st.push(...glideSteps(item.at));
      st.push([500, S({ four: ans, shown: 4, litHours: early })]);
      /* the card by the right-hand post appears only here, lit, when the child counted on to 24 */
      if (n === 3 && /^24/.test(tbDigits(v))) st.push([400, S({ card: true })]);
      const pins = pinsOf([v], [item.at]);
      if (pins.length) st.push([400, S({ pins })]);
    } else if (kind === "clock") {
      /* the bay runs both clocks from 9:20 a.m., an hour at a time; the marker follows the gaining clock */
      st.push([300, S({ runs: 0 })], ...glideSteps(item.set));
      for (let h = 1; h <= item.hours; h++) st.push([450, S({ runs: h })], ...glideSteps(item.set + (60 + item.gain) * h));
      st.push([500, S({ four: String(item.answer), shown: 4 })]);
      const pins = pinsOf([v], [item.at]);
      if (pins.length) st.push([400, S({ pins })]);
    } else if (kind === "pair") {
      /* both right times, then the child's own two numbers where they stand (1235 at 12:35 p.m., 2435 past the end) */
      const kid = slotPartsOf(v, 2);
      st.push(...glideSteps(item.ats[0]));
      st.push([500, S({ four: item.answer[0], shown: 4 })]);
      st.push([600, S({ pale: { at: item.ats[1], four: item.answer[1] }, leftPost: true })]);
      const pins = pinsOf(kid, item.ats);
      if (pins.length) st.push([400, S({ pins, card: kid.some((x: string) => /^24/.test(x)) })]);
    } else if (kind === "twelve") {
      const hh = Number(item.given.slice(0, 2));
      if (hh > 12) st.push([500, S({ take: { from: hh, to: hh - 12 } })]);
      st.push(...glideSteps(item.at));
      if (hh === 0 || hh === 12) st.push([350, S({ lit12: hh })]);
      st.push([500, S({ twin: { h: item.answer[0], m: item.answer[1], half: item.half }, twelve: true })]);
      const pins = pinsOf([v], [item.at]);
      if (pins.length) st.push([400, S({ pins })]);
    }
    tl.run(st, () => api.lock(false));
  }, [wrong]);

  /* the marker: a drag along the bar (5 minutes a step, onto the question's time when near it), a tap or
     Enter brings it to the question's time, the arrow keys step it */
  const snapOf = (x: number) => {
    const m = Math.min(Math.max(((x - TL.x0) / TL.hw) * 60, 0), 1435);
    if (asking && Math.abs(m - home) <= 8) return home;
    return Math.min(Math.round(m / 5) * 5, 1435);
  };
  const canMove = (asking || free) && !busy;
  /* the marker, and the bar either side of it: a tap on the bar or the 12-hour row puts the marker there,
     a drag on either slides it (one drag, so the two never fight) */
  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (!pay || (pay.kind !== "marker" && pay.kind !== "bar") || !canMove) return;
    if (!isFinite(p.x)) { if (pay.kind === "marker" && asking) { act(); glideTo(home); } return; }
    act();
    if (!moved && pay.kind === "marker") { if (asking) glideTo(home); return; }
    gl.stop();
    if (moved) put(snapOf(p.x)); else glideTo(snapOf(p.x));
    api.sfx.tick();
  });
  const dragging = !!(drag.drag && drag.drag.payload && (drag.drag.payload.kind === "marker" || drag.drag.payload.kind === "bar") && drag.drag.moved);
  const mkLive = dragging ? snapOf(drag.drag.x) : mk;
  const markerKeys = (pay: any) => (e: any) => {
    if (!canMove) return;
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault(); e.stopPropagation();
      gl.stop(); act();
      put(Math.min(Math.max(mkRef.current + (e.key === "ArrowLeft" ? -5 : 5), 0), 1435));
      return;
    }
    /* Enter goes on to answer when there is nothing left to do here (PATTERNS §5b): on the question's time,
       or on the bar, whose tap needs a place a key cannot give */
    if (e.key === "Enter" && ((asking && mkRef.current === home) || pay.kind === "bar")) return;
    if (pay.kind === "bar") return;
    drag.keys(pay).onKeyDown(e);
  };

  /* a.m. or p.m. for a 12-hour answer: the child's tap on the board; Enter sends hours|minutes|label */
  const pickHalf = (h: string) => {
    if (!asking || busy) return;
    setHalf(h); act(); api.sfx.tick();
    if (wrong) api.setTyped(typed);   /* a changed label is a fresh answer after a miss */
  };
  api.onEnter(asking && kind === "twelve" ? (v: any) => {
    if (!halfRef.current) { api.say("On the board, tap a.m., or p.m."); return false; }
    return api.submit(slotPartsOf(v === undefined ? typed : v, 2).join("|") + "|" + halfRef.current);
  } : null);
  /* Free play's "+1 hour": four hours, then back to 9:20 a.m.; the marker follows the gaining clock */
  const runHour = () => {
    if (!free) return;
    const next = runs >= 4 ? 0 : runs + 1;
    act(); setRuns(next); glideTo(FREE_BAY.set + (60 + FREE_BAY.gain) * next); api.sfx.tick();
  };

  /* what each readout shows. Before the answer the readout the question asks for holds only what the child
     typed, and only at the question's own time; the other readout is the question's given */
  const liveFour = tlFour(mkLive).split("");
  const blank = ["", "", "", ""];
  const four: string[] = (() => {
    if (free || done || !asking) return stage === "teach" && (TB_TEACH[n] || {}).cover ? blank : liveFour;
    if (demo && demo.four) return [0, 1, 2, 3].map((k) => (k < (demo.shown ?? 4) ? demo.four[k] : ""));
    if (kind === "twelve") return liveFour;
    /* a glide during a question only ever goes home, which is the question's time except for the clock */
    if (mkLive !== qAt && !(gl.busy && kind !== "clock")) return blank;
    const t = kind === "pair" ? slotPartsOf(typed, 2)[Math.min(part || 0, 1)] : tbDigits(typed);
    return [0, 1, 2, 3].map((k) => t[k] || "");
  })();
  const twelveText: any = asking && kind === "twelve" ? (demo && demo.twelve ? tlTwelve(item.at) : null) : tlTwelve(mkLive);
  const gateOpen = mkLive >= 780;
  const bayOn = free || kind === "clock";
  const bay = free ? FREE_BAY : item;
  const bayH = free ? runs : demo && demo.runs !== undefined ? demo.runs : done ? item.hours : 0;
  const trueMin = bayOn ? bay.set + 60 * bayH : 0;
  const gained = bayOn ? bay.gain * bayH : 0;
  /* one invite: the marker, on a phase's first question, until it is touched or typed at */
  const invite = !asking || busy || demo || index !== 0 || typed ? null
    : kind === "twelve" ? (!half ? "twin" : null)   /* phase 4 opens with a pulse on the top row's empty twin */
    : kind !== "clock" && !touched ? "marker" : null;

  /* what the host and the agent read back (toolApi.getState): only what is drawn */
  api.share({ markerMinutes: mkLive, twelveHour: twelveText, fourDigit: four.join(""), gateOpen, half,
    boardRow: n === 4 && !free ? index + 1 : null, clockBay: bayOn ? { trueClock: tlTwelve(trueMin), gainedMinutes: gained } : null });

  /* ── drawing (helpers are called, never mounted) ── */
  const hrInk = shade(TLC.hr, 0.25), mnInk = shade(TLC.mn, 0.25);
  const quiet = mix(C.ink, "#FFFFFF", 0.3);
  const estW = (s: string, size: number) => String(s).length * size * 0.6;
  const clampL = (cx: number, w: number) => Math.min(Math.max(cx - w / 2, 4), 1082 - w);
  const litNum = demo && demo.litNum !== undefined ? demo.litNum : null;
  const lit12 = demo && demo.lit12 !== undefined ? demo.lit12 : null;
  const leftLit = (n === 3 && !free) || !!(demo && demo.leftPost);
  const markerX = tlX(mkLive);
  /* while a question is open, the scale in the answer's form is covered (the 0 to 24 row for a 24-hour
     answer, the 12-hour row for a 12-hour one): the child counts or adds or takes twelve, and the
     correction and the win uncover it as the proof */
  const coverTop = asking && !demo && kind !== "twelve";
  const coverLow = asking && !demo && kind === "twelve";
  /* a lid over a covered number: darker than the paper, with a top light, so it reads as shut, not as a box to fill */
  const cap = (x: number, y: number, key: string) => (
    <g key={key}>
      <rect x={x - 15} y={y - 22} width={30} height={24} rx={7} fill={mix(C.panel, C.ink, 0.2)} stroke={mix(C.panel, C.ink, 0.36)} strokeWidth={1.5} />
      <line x1={x - 9} y1={y - 18} x2={x + 9} y2={y - 18} stroke="#FFFFFF" strokeOpacity={0.6} strokeWidth={2.5} strokeLinecap="round" />
    </g>
  );

  const sky = () => (
    <g>
      {[0, 1440].map((m) => (
        <path key={m} d={`M ${tlX(m) + 4} 5 A 12 12 0 1 0 ${tlX(m) + 4} 29 A 16 16 0 0 1 ${tlX(m) + 4} 5 Z`}
          fill={tint(TLC.mn, 0.6)} stroke={C.ink} strokeWidth={2} />
      ))}
      {Array.from({ length: 8 }).map((_, k) => {
        const a = (k * Math.PI) / 4, cx = tlX(720);
        return <line key={k} x1={cx + Math.cos(a) * 11} y1={17 + Math.sin(a) * 11} x2={cx + Math.cos(a) * 14} y2={17 + Math.sin(a) * 14} stroke={C.ink} strokeWidth={2.5} strokeLinecap="round" />;
      })}
      <circle cx={tlX(720)} cy={17} r={7} fill={TLC.pm} stroke={C.ink} strokeWidth={2} />
    </g>
  );
  const bar = () => (
    <g>
      <rect x={tlX(0)} y={TL.bar} width={tlX(720) - tlX(0)} height={TL.barH} fill={TLC.am} />
      <rect x={tlX(720)} y={TL.bar} width={tlX(1440) - tlX(720)} height={TL.barH} fill={TLC.pm} />
      <rect x={tlX(0)} y={TL.bar} width={tlX(1440) - tlX(0)} height={TL.barH} fill="none" stroke={C.ink} strokeWidth={2.5} />
      {Array.from({ length: 23 }).map((_, k) => {
        const x = tlX((k + 1) * 60);
        return (
          <g key={k}>
            <line x1={x} y1={TL.bar} x2={x} y2={TL.bar + 12} stroke={C.ink} strokeWidth={2} />
            <line x1={x} y1={TL.bar + TL.barH - 12} x2={x} y2={TL.bar + TL.barH} stroke={C.ink} strokeWidth={2} />
          </g>
        );
      })}
      {[0, 720, 1440].map((m) => {
        const lit = m === 0 && leftLit;
        return (
          <g key={m}>
            <line x1={tlX(m)} y1={TL.bar - 6} x2={tlX(m)} y2={TL.bar + TL.barH + 6} stroke={C.ink} strokeWidth={lit ? 6 : 4} strokeLinecap="round" />
            {lit && <rect x={tlX(m) - 11} y={TL.bar - 12} width={22} height={TL.barH + 24} rx={11} fill="none" stroke={C.ink} strokeWidth={3} />}
          </g>
        );
      })}
      {/* the gate's own line on the bar, at one o'clock in the afternoon */}
      {(n === 2 || n === 3 || free) && <line x1={tlX(780)} y1={TL.bar} x2={tlX(780)} y2={TL.bar + TL.barH} stroke={C.ink} strokeWidth={4} />}
    </g>
  );
  const scales = () => (
    <g>
      {Array.from({ length: 25 }).map((_, h) => (coverTop ? cap(tlX(h * 60), 57, "n" + h) : (
        <g key={"n" + h}>
          {litNum === h && <circle cx={tlX(h * 60)} cy={47} r={19} fill={tint(TLC.hr, 0.75)} />}
          <text x={tlX(h * 60)} y={57} textAnchor="middle" fontSize={T.micro} fontWeight={litNum === h ? 800 : 600} fill={litNum === h ? hrInk : C.ink}>{h}</text>
        </g>
      )))}
      {Array.from({ length: 25 }).map((_, h) => (coverLow ? cap(tlX(h * 60), 157, "t" + h) : (
        <g key={"t" + h}>
          {lit12 === h && <circle cx={tlX(h * 60)} cy={147} r={19} fill={tint(TLC.hr, 0.75)} />}
          <text x={tlX(h * 60)} y={157} textAnchor="middle" fontSize={T.micro} fontWeight={lit12 === h ? 800 : 500} fill={lit12 === h ? hrInk : C.ink}>{h % 12 === 0 ? 12 : h % 12}</text>
        </g>
      )))}
      <text x={tlX(0) - 16} y={192} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("midnight")}</text>
      <text x={tlX(360)} y={192} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("a.m.")}</text>
      <text x={tlX(720)} y={192} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("noon")}</text>
      <text x={tlX(1080)} y={192} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("p.m.")}</text>
      <text x={tlX(1440) + 16} y={192} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("midnight")}</text>
    </g>
  );
  /* the add twelve gate at one o'clock in the afternoon, drawn over its line in the band above the numbers
     (clear of the marker and its ring): an arch with a door, shut in the hour after noon, swung open from
     one on, and its "+12" beside it */
  const gate = () => {
    /* hinged on the one o'clock line and opening onto the afternoon: 94 wide, 30 tall (the band above the
       numbers is 34, the sun's rays end 27 to its left), "+12" inside the arch */
    const gx = tlX(780), R = gx + 94, top = 2, bot = 32, w = 94;
    return (
      <g pointerEvents="none">
        <path d={`M ${gx} ${bot} V ${top + 10} Q ${gx} ${top} ${gx + 10} ${top} H ${R - 10} Q ${R} ${top} ${R} ${top + 10} V ${bot} Z`}
          fill="#FFFFFF" stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
        {gateOpen
          ? <path d={`M ${gx + 3} ${top + 4} L ${gx + 16} ${top + 8} L ${gx + 16} ${bot + 1} L ${gx + 3} ${bot - 2} Z`} fill={TLC.hr} stroke={C.ink} strokeWidth={2} strokeLinejoin="round" />
          : <rect x={gx + 4} y={top + 4} width={w - 8} height={bot - top - 6} rx={6} fill={tint(TLC.hr, 0.78)} stroke={TLC.hr} strokeWidth={3} />}
        <text x={gateOpen ? gx + 55 : gx + w / 2} y={bot - 5} textAnchor="middle" fontSize={T.micro} fontWeight={800} fill={hrInk}>+12</text>
      </g>
    );
  };
  /* the bar and the 12-hour row either side of the marker: tap to put the marker there, or slide it */
  const barSides = () => {
    if (!canMove) return null;
    const fx = Math.min(Math.max(markerX - 36, 0), 1086 - 72), y = 58, h = 104;
    const sides = [["bar-left", 0, fx], ["bar-right", fx + 72, 1086 - fx - 72]].filter((s: any) => s[2] >= 72);
    return sides.map(([id, x, w]: any) => (
      <rect key={id} x={x} y={y} width={w} height={h} fill="transparent"
        {...control(id, "the day line: tap to put the marker there")} {...drag.bind({ kind: "bar" })} onKeyDown={markerKeys({ kind: "bar" })} />
    ));
  };
  /* a small pointer on a readout's top edge, under the marker (the guide itself stops above the label row) */
  const pointer = (x: number, y: number, col: string) => <path d={`M ${x - 9} ${y} L ${x} ${y - 10} L ${x + 9} ${y} Z`} fill={col} />;
  const markerG = () => {
    const x = markerX, fx = Math.min(Math.max(x - 36, 0), 1086 - 72);
    const live: any = canMove ? { ...control("marker", "marker: slide it along the day"), ...drag.bind({ kind: "marker" }), onKeyDown: markerKeys({ kind: "marker" }) } : {};
    return (
      <g {...live}>
        <rect x={fx} y={58} width={72} height={72} fill="transparent" />
        <line x1={x} y1={TL.bar + TL.barH} x2={x} y2={TL.guide} stroke={C.ink} strokeWidth={2.5} strokeDasharray="6 6" />
        <line x1={x} y1={TL.bar - 3} x2={x} y2={TL.bar + TL.barH + 8} stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
        <circle cx={x} cy={TL.knob} r={17} fill={C.ink} stroke="#FFFFFF" strokeWidth={4} filter="url(#fShadowSoft)" />
      </g>
    );
  };
  const PW = 58, PH = 64, fourW = 12 + PW * 4 + 12 + 16 + 12 + estW(tx("hours"), T.label) + 12;
  const placesX = (L: number) => [L + 12, L + 18 + PW, L + 34 + 2 * PW, L + 40 + 3 * PW];
  const fourTag = (cx: number, digits: string[], o: any = {}) => {
    const L = Math.max(clampL(cx, fourW), o.minL || 0), y = TL.tag4, px = placesX(L);
    return (
      <g pointerEvents="none">
        <rect x={L} y={y} width={fourW} height={PH + 16} rx={14} fill="#FFFFFF" stroke={o.quiet ? quiet : C.ink} strokeWidth={2}
          strokeDasharray={o.quiet ? "8 6" : undefined} filter={o.quiet ? undefined : "url(#fShadowSoft)"} />
        {px.map((x, k) => (
          <g key={k}>
            <rect x={x} y={y + 8} width={PW} height={PH} rx={10} fill={k < 2 && o.litHours ? tint(TLC.hr, 0.78) : "#FFFFFF"} stroke={k < 2 ? TLC.hr : TLC.mn} strokeWidth={3} />
            {digits[k] ? <text x={x + PW / 2} y={y + 8 + PH / 2 + 20} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={k < 2 ? hrInk : mnInk}>{digits[k]}</text> : null}
          </g>
        ))}
        <text x={px[3] + PW + 12} y={y + 8 + PH / 2 + 11} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("hours")}</text>
        {o.point ? pointer(Math.min(Math.max(cx, L + 16), L + fourW - 16), y, o.quiet ? quiet : C.ink) : null}
      </g>
    );
  };
  const twelveTag = (cx: number, s: string, o: any = {}) => {
    const m: any = /^(\d{1,2})(?::(\d{2}))? (.+)$/.exec(s) || ["", s, "", ""];
    const tail = tx(m[3]), text = m[1] + (m[2] ? ":" + m[2] : "") + " " + tail;
    const w = estW(text, T.prompt) + 24, L = clampL(cx, w), y = TL.tag12;
    return { w, L, el: (
      <g pointerEvents="none">
        <rect x={L} y={y} width={w} height={56} rx={16} fill="#FFFFFF" stroke={o.quiet ? quiet : C.ink} strokeWidth={2} strokeDasharray={o.quiet ? "8 6" : undefined} />
        <text x={L + 14} y={y + 42} fontSize={T.prompt} fontWeight={700} fill={C.ink}>
          <tspan fill={hrInk}>{m[1]}</tspan>{m[2] ? <tspan fill={C.ink}>:</tspan> : null}{m[2] ? <tspan fill={mnInk}>{m[2]}</tspan> : null}<tspan fill={C.ink}>{" " + tail}</tspan>
        </text>
        {pointer(Math.min(Math.max(cx, L + 16), L + w - 16), y, o.quiet ? quiet : C.ink)}
      </g>
    ) };
  };
  /* the add twelve tag rides with the marker for the afternoon and evening */
  const chip = (tag: any) => {
    const t = tx("add twelve"), w = estW(t, T.micro) + 26;
    let x = tag.L + tag.w + 10;
    if (x + w > 1082) x = tag.L - 10 - w;
    return (
      <g pointerEvents="none">
        <rect x={x} y={TL.tag12 + 6} width={w} height={44} rx={22} fill={tint(TLC.hr, 0.82)} stroke={TLC.hr} strokeWidth={2.5} />
        <text x={x + w / 2} y={TL.tag12 + 37} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={hrInk}>{t}</text>
      </g>
    );
  };
  /* a second, pale marker: the other time of a two-part question (12:35 a.m. beside 12:35 p.m.) */
  const paleG = (at: number, f: string) => {
    const x = tlX(at);
    const t12 = twelveTag(x, tlTwelve(at), { quiet: true });
    return (
      <g pointerEvents="none">
        <line x1={x} y1={TL.bar + TL.barH} x2={x} y2={TL.guide} stroke={quiet} strokeWidth={2.5} strokeDasharray="6 6" />
        <line x1={x} y1={TL.bar - 8} x2={x} y2={TL.bar + TL.barH + 8} stroke={quiet} strokeWidth={4} strokeLinecap="round" />
        <circle cx={x} cy={TL.knob} r={14} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} />
        {t12.el}
        {fourTag(x, f.split(""), { quiet: true, litHours: true })}
      </g>
    );
  };
  /* pale pins where the child's own answers stand on the day line. The needle is a dashed stub in the bar's
     lower half; its label sits above and to the right of it, in the bar's upper half (on the side of the
     day it belongs to), moved on past the marker's knob, the posts and the gate line. A time past 2400
     (2435) is written against the right-hand end with an arrow past it. */
  const pinsG = (pins: any[]) => {
    const used: number[][] = [];
    return (
      <g pointerEvents="none">
        {pins.map((p: any, k: number) => {
          const x = tlX(p.at), w = estW(p.label, T.micro) + 18;
          const block = [[markerX - 24, markerX + 24], ...[0, 720, 780, 1440].map((m) => [tlX(m) - 4, tlX(m) + 4]), ...used];
          const hit = (L: number) => block.find(([a, b]) => L < b && L + w > a);
          let L = p.off ? tlX(1440) - 12 - w : x + 6;
          for (let g = 0; g < 8 && !p.off; g++) { const b = hit(L); if (!b) break; L = b[1] + 4; }
          if (L + w > 1082) { L = x - 6 - w; for (let g = 0; g < 8; g++) { const b = hit(L); if (!b) break; L = b[0] - 4 - w; } }
          L = Math.min(Math.max(L, 4), 1082 - w);
          used.push([L - 6, L + w + 6]);
          const ly = TL.bar + 4, mid = ly + 15;
          return (
            <g key={k}>
              <line x1={x} y1={TL.bar + 30} x2={x} y2={TL.bar + TL.barH + 6} stroke={quiet} strokeWidth={4} strokeDasharray="6 4" />
              {p.off && <path d={`M ${tlX(1440) - 2} ${mid} H ${1080} M ${1072} ${mid - 7} L ${1082} ${mid} L ${1072} ${mid + 7}`} fill="none" stroke={quiet} strokeWidth={3} />}
              {!p.off && <line x1={x} y1={TL.bar + 30} x2={L > x ? L : L + w} y2={ly + 26} stroke={quiet} strokeWidth={2.5} />}
              <rect x={L} y={ly} width={w} height={30} rx={9} fill="#FFFFFF" stroke={quiet} strokeWidth={2} />
              <text x={L + w / 2} y={ly + 23} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{p.label}</text>
            </g>
          );
        })}
      </g>
    );
  };
  /* the child's digits laid under the readout place by place from the left (705 under 0705) */
  const layG = (kid: string) => {
    const px = placesX(clampL(markerX, fourW)), y = TL.tag4 + PH + 22;
    return (
      <g pointerEvents="none">
        {px.map((x, k) => (
          <g key={k}>
            <rect x={x} y={y} width={PW} height={50} rx={8} fill="#FFFFFF" stroke={quiet} strokeWidth={2} strokeDasharray="6 5" />
            {kid[k] ? <text x={x + PW / 2} y={y + 38} textAnchor="middle" fontSize={T.prompt} fontWeight={600} fill={quiet}>{kid[k]}</text> : null}
          </g>
        ))}
      </g>
    );
  };
  const face = (cx: number, cy: number, r: number, min: number) => {
    const ha = ((((min / 60) % 12) * 30) * Math.PI) / 180, ma = (((min % 60) * 6) * Math.PI) / 180;
    return (
      <g>
        <circle cx={cx} cy={cy} r={r} fill="#FFFFFF" stroke={C.ink} strokeWidth={3.5} filter="url(#fShadowSoft)" />
        {Array.from({ length: 60 }).map((_, k) => {
          const a = (k * 6 * Math.PI) / 180, big = k % 5 === 0, r0 = r - (big ? 11 : 6);
          return <line key={k} x1={cx + Math.sin(a) * r0} y1={cy - Math.cos(a) * r0} x2={cx + Math.sin(a) * (r - 2)} y2={cy - Math.cos(a) * (r - 2)} stroke={C.ink} strokeWidth={big ? 2.5 : 1.2} />;
        })}
        {/* numerals near the rim, the hands short of them, so no hand runs through a numeral */}
        {[12, 3, 6, 9].map((v) => {
          const a = (v * 30 * Math.PI) / 180, rr = r - 24;
          return <text key={v} x={cx + Math.sin(a) * rr} y={cy - Math.cos(a) * rr + 10} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{v}</text>;
        })}
        <line x1={cx} y1={cy} x2={cx + Math.sin(ha) * r * 0.38} y2={cy - Math.cos(ha) * r * 0.38} stroke={TLC.hr} strokeWidth={8} strokeLinecap="round" />
        <line x1={cx} y1={cy} x2={cx + Math.sin(ma) * r * 0.56} y2={cy - Math.cos(ma) * r * 0.56} stroke={TLC.mn} strokeWidth={5} strokeLinecap="round" />
        <circle cx={cx} cy={cy} r={6} fill={C.ink} />
      </g>
    );
  };
  /* the clock bay: a clock that keeps the right time and one that gains 3 minutes an hour, the minutes
     gained between them. In the question it is large and still (9:20 a.m., gained 0 min); in Free play it is
     compact, beside the board keys, with "+1 hour" (four hours, then back to 9:20 a.m.) */
  const bayG = () => {
    if (!free) {
      return (
        <g>
          {face(100, 446, 80, trueMin)}
          {face(620, 446, 80, trueMin + gained)}
          <text x={194} y={398} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("right time")}</text>
          <text x={714} y={398} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("gains 3 min")}</text>
          <text x={360} y={452} textAnchor="middle" fontSize={T.micro} fontWeight={500} fill={quiet}>{tx("gained")}</text>
          <text x={360} y={496} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{gained + " " + tx("min")}</text>
        </g>
      );
    }
    /* Free play: the same 160-across clocks and spacing as the question, "+1 hour" under the gaining clock's
       label, the board keys at the right */
    return (
      <g>
        {face(100, 446, 80, trueMin)}
        {face(540, 446, 80, trueMin + gained)}
        <text x={194} y={398} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("right time")}</text>
        <text x={634} y={398} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("gains 3 min")}</text>
        <text x={320} y={452} textAnchor="middle" fontSize={T.micro} fontWeight={500} fill={quiet}>{tx("gained")}</text>
        <text x={320} y={496} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{gained + " " + tx("min")}</text>
        <Key id="run-hour" label="run both clocks one hour" x={634} y={432} w={160} h={66} C={C} onClick={runHour}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("+1 hour")}</text>
        </Key>
      </g>
    );
  };
  /* the departure board (phase 4): each row a 24-hour time and a twin to fill in the 12-hour clock */
  const BX = 340;   /* the board's left edge: take twelve on its left, the a.m./p.m. pair on its right */
  const boardG = () => {
    const rows = PHASES[3].items;
    const ring = demo && demo.twin ? demo.twin.half : null;
    return (
      <g>
        <rect x={BX} y={374} width={404} height={152} rx={16} fill={tint(C.panel, 0.55)} stroke={C.ink} strokeWidth={2} />
        {rows.map((r: any, k: number) => {
          const top = 378 + 48 * k, mid = top + 22, cur = k === index;
          const shown = k < index || (cur && done);
          const ps = cur && asking ? (demo && demo.twin ? [String(demo.twin.h), tlPad(demo.twin.m)] : slotPartsOf(typed, 2))
            : shown ? [String(r.answer[0]), tlPad(r.answer[1])] : ["", ""];
          const hf = shown ? r.half : cur && asking ? (demo && demo.twin ? demo.twin.half : half) : null;
          const onBox = (j: number) => cur && asking && !(demo && demo.twin) && (part || 0) === j;
          const X = (v: number) => BX + v;   /* row positions from the board's left edge */
          return (
            <g key={k}>
              {cur && <rect x={X(6)} y={top} width={392} height={44} rx={12} fill="#FFFFFF" stroke={C.accent} strokeWidth={3} />}
              <text x={X(18)} y={mid + 11} fontSize={T.label} fontWeight={700}><tspan fill={hrInk}>{r.given.slice(0, 2)}</tspan><tspan fill={mnInk}>{r.given.slice(2)}</tspan></text>
              <text x={X(103)} y={mid + 10} fontSize={T.micro} fontWeight={500} fill={quiet}>{tx("hours")}</text>
              <rect x={X(196)} y={top + 3} width={50} height={38} rx={8} fill="#FFFFFF" stroke={onBox(0) ? C.accent : TLC.hr} strokeWidth={onBox(0) ? 4 : 2.5} />
              {ps[0] ? <text x={X(221)} y={mid + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={hrInk}>{ps[0]}</text> : null}
              <text x={X(253)} y={mid + 10} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>:</text>
              <rect x={X(260)} y={top + 3} width={54} height={38} rx={8} fill="#FFFFFF" stroke={onBox(1) ? C.accent : TLC.mn} strokeWidth={onBox(1) ? 4 : 2.5} />
              {ps[1] ? <text x={X(287)} y={mid + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={mnInk}>{ps[1]}</text> : null}
              {hf && <text x={X(322)} y={mid + 10} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(hf === "pm" ? "p.m." : "a.m.")}</text>}
            </g>
          );
        })}
        {/* a.m. or p.m. for the lit row: one pair of keys beside the board, off its row lines, clear of the pad */}
        {asking && [["am", "a.m.", 772], ["pm", "p.m.", 918]].map(([h, label, x]: any) => (
          <g key={h}>
            <Key id={"half-" + h} label={label} x={x} y={416} w={134} h={66} C={C} primary={half === h} disabled={busy} onClick={() => pickHalf(h)}>
              <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={busy ? quiet : half === h ? "#FFFFFF" : C.ink}>{tx(label)}</text>
            </Key>
            {ring === h && <rect x={x - 6} y={410} width={146} height={83} rx={20} fill="none" stroke={TLC.hr} strokeWidth={4} pointerEvents="none" />}
          </g>
        ))}
      </g>
    );
  };
  /* take twelve: lit for an hour of thirteen to twenty-three, with the subtraction written out */
  const takeG = () => {
    const hh = Number(item.given ? String(item.given).slice(0, 2) : 0);
    const tk = demo && demo.take ? demo.take : stage === "teach" ? { from: 13, to: 1 } : done && kind === "twelve" && hh > 12 ? { from: hh, to: hh - 12 } : null;
    const a = tk ? tk.from + " − 12" : "";
    return (
      <g pointerEvents="none">
        {/* beside the board's left edge: the pill, and under it the subtraction */}
        <path d={`M 316 ${414} H ${BX}`} stroke={tk ? TLC.hr : tint(C.rule, 0.2)} strokeWidth={3} />
        <rect x={100} y={382} width={216} height={64} rx={16} fill={tk ? tint(TLC.hr, 0.82) : tint(C.panel, 0.55)} stroke={tk ? TLC.hr : tint(C.rule, 0.2)} strokeWidth={tk ? 3 : 2} />
        <text x={208} y={425} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={tk ? hrInk : quiet}>{tx("take twelve")}</text>
        {tk && <text x={40} y={506} fontSize={T.speech} fontWeight={700} fill={C.ink}>{a}</text>}
        {tk && <text x={54 + a.length * 23} y={506} fontSize={T.speech} fontWeight={700} fill={hrInk}>{"= " + tk.to}</text>}
      </g>
    );
  };
  /* the card by the right-hand post: the post reads 0000 hours, a day starting, and 2400 hours names the
     day's end. Drawn only in a correction, lit, when the child counted on to 24 (never before an answer) */
  const cardG = () => {
    return (
      <g pointerEvents="none">
        <line x1={tlX(1440)} y1={TL.bar + TL.barH + 8} x2={tlX(1440)} y2={TL.guide} stroke={C.ink} strokeWidth={2.5} strokeDasharray="6 6" />
        <line x1={tlX(1440)} y1={204} x2={tlX(1440)} y2={372} stroke={C.ink} strokeWidth={2.5} strokeDasharray="6 6" />
        <rect x={612} y={372} width={464} height={146} rx={16} fill="#FFFFFF" stroke={C.accent} strokeWidth={5} />
        <text x={636} y={420} fontSize={T.label} fontWeight={700}><tspan fill={hrInk}>00</tspan><tspan fill={mnInk}>00</tspan><tspan fill={C.ink}>{" " + tx("hours")}</tspan></text>
        <text x={1052} y={420} textAnchor="end" fontSize={T.micro} fontWeight={500} fill={quiet}>{tx("starts a day")}</text>
        <text x={636} y={478} fontSize={T.label} fontWeight={700}><tspan fill={hrInk}>24</tspan><tspan fill={mnInk}>00</tspan><tspan fill={C.ink}>{" " + tx("hours")}</tspan></text>
        <text x={1052} y={478} textAnchor="end" fontSize={T.micro} fontWeight={500} fill={quiet}>{tx("ends a day")}</text>
      </g>
    );
  };
  /* free play: the board's times as keys that send the marker there */
  const freeBoard = () => (
    <g>
      {PHASES[3].items.map((r: any, k: number) => (
        <Key key={k} id={"board-" + (k + 1)} label={"board time " + r.given} x={842 + (k % 2) * 122} y={372 + Math.floor(k / 2) * 80} w={112} h={68} C={C}
          onClick={() => { act(); glideTo(r.at); api.sfx.tick(); }}>
          <text y={14} textAnchor="middle" fontSize={T.prompt} fontWeight={700}><tspan fill={hrInk}>{r.given.slice(0, 2)}</tspan><tspan fill={mnInk}>{r.given.slice(2)}</tspan></text>
        </Key>
      ))}
    </g>
  );

  const t12 = twelveText ? twelveTag(markerX, twelveText) : null;
  const showGate = n === 2 || n === 3 || free;
  const pale = demo && demo.pale ? demo.pale : done && kind === "pair" ? { at: item.ats[1], four: item.answer[1] } : null;
  return (
    <g>
      {sky()}
      {bar()}
      {scales()}
      {showGate && gate()}
      {barSides()}
      {demo && demo.pins && pinsG(demo.pins)}
      {pale && paleG(pale.at, pale.four)}
      {markerG()}
      {t12 && t12.el}
      {showGate && gateOpen && t12 && chip(t12)}
      {fourTag(markerX, four, { litHours: !!(demo && demo.litHours), point: !t12, minL: pale ? clampL(tlX(pale.at), fourW) + fourW + 44 : 0 })}
      {demo && demo.lay !== undefined && layG(demo.lay)}
      {bayOn && bayG()}
      {/* the card: in a correction after a 24, and at noon's win (question 3), so every child meets 2400 after answering */}
      {n === 3 && !free && ((demo && demo.card) || (done && index === 2)) && cardG()}
      {n === 4 && !free && boardG()}
      {n === 4 && !free && takeG()}
      {free && freeBoard()}
      {invite === "marker" && <Invite x={markerX} y={TL.knob} r={44} C={C} />}
      {invite === "twin" && <Invite x={BX + 255} y={400} r={44} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const hrInk = shade(TLC.hr, 0.25), mnInk = shade(TLC.mn, 0.25), y = h / 2 + 13;
  let body: any;
  if (last.kind === "twelve") {
    const p = slotPartsOf(last.value, 2), hf = tbHalfOf(last.value);
    body = (<text x={w / 2} y={y} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>
      <tspan fill={hrInk}>{Number(p[0])}</tspan>:<tspan fill={mnInk}>{p[1]}</tspan>{" " + tx(hf === "pm" ? "p.m." : "a.m.")}</text>);
  } else if (last.kind === "pair") {
    const p = slotPartsOf(last.value, 2);
    body = (<text x={w / 2} y={y} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>
      <tspan fill={hrInk}>{p[0].slice(0, 2)}</tspan><tspan fill={mnInk}>{p[0].slice(2)}</tspan>{"  ·  "}<tspan fill={hrInk}>{p[1].slice(0, 2)}</tspan><tspan fill={mnInk}>{p[1].slice(2)}</tspan></text>);
  } else {
    const s = tbDigits(last.value);
    body = (<text x={w / 2} y={y} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>
      <tspan fill={hrInk}>{s.slice(0, 2)}</tspan><tspan fill={mnInk}>{s.slice(2)}</tspan><tspan fontSize={T.micro} fontWeight={600}>{" " + tx("hours")}</tspan></text>);
  }
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {body}
    </g>
  );
}

function TimelineBoard(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default TimelineBoard;
