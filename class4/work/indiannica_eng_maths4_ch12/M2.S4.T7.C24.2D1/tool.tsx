/* ═══ M2.S4.T7.C24.2D1 · duration_track · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "duration_track";
const MEDIA_ID = "M2.S4.T7.C24.2D1";
const TOOL_NAME = "Duration Track";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A track of the whole day, a start flag and an end flag. Where is the next hour?"];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Durations counted on to the next hour, noon crossed with a stop, and end and start times found.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. The whole track, both flags, the hopper both ways and the duration cards open.";

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, and the runtime looks each spoken or drawn line up in it.
   Fill it AFTER the English is final and reviewed (`node cli.mjs voice` lists every line still missing),
   then bake the voice. Empty = the tool runs in English only. */
/* Chapter 12 glossary (one for all seven tools): hour घंटा / કલાક, minute मिनट / મિનિટ, noon दोपहर / બપોર
   ("12 noon": दोपहर 12 / બપોરના 12), midnight आधी रात / મધ્યરાત્રિ, a.m. पूर्वाह्न / પૂર્વાહ્ન, p.m. अपराह्न /
   અપરાહ્ન in sentences; on screen "a.m." and "p.m." stay in Latin letters (so they have no entry here), as do
   the screen-reader names. A time is said the language's own way ("पूर्वाह्न 6 बजकर 48 मिनट",
   "પૂર્વાહ્ન 6 વાગીને 48 મિનિટે"), never with a colon, so the voice reads it as words.
   Tool terms (for a native speaker's read): hop छलाँग / કૂદકો, hopper फुदकू / કૂદકુ, flag झंडा / ઝંડો,
   track पट्टी / પટ્ટી, duration अवधि / સમયગાળો, hour post घंटे का खंभा / કલાકનો થાંભલો. */
const TR: any = {
  hi: {
    "Duration Track": "अवधि पट्टी",
    "A track of the whole day, a start flag and an end flag. Where is the next hour?": "पूरे दिन की एक पट्टी, एक शुरू का झंडा और एक अंत का झंडा। अगला घंटा कहाँ है?",
    "Durations counted on to the next hour, noon crossed with a stop, and end and start times found.": "अगले घंटे तक गिनकर अवधि निकाली, दोपहर 12 पर रुककर पार किया, और शुरू और अंत के समय निकाले।",
    "Free play. The whole track, both flags, the hopper both ways and the duration cards open.": "मुक्त खेल। पूरी पट्टी, दोनों झंडे, दोनों ओर फुदकू और अवधि कार्ड खुले हैं।",
    "Which half of the day is it? Tap its label.": "दिन का कौन-सा आधा है? उसका लेबल दबाओ।",
    /* phase 1 */
    "Counting on to the next hour": "अगले घंटे तक आगे गिनना",
    "Hop to the next hour first. How far is that? Now hop on to the end.": "पहले अगले घंटे तक छलाँग लगाओ। वह कितनी दूर है? अब अंत तक छलाँग लगाओ।",
    "How many whole hours come after that?": "उसके बाद कितने पूरे घंटे आते हैं?",
    "Add the minutes of the short hops, then the whole hours.": "छोटी छलाँगों के मिनट जोड़ो, फिर पूरे घंटे।",
    "Count on to the next hour, then whole hours, then the minutes to the end, and add the parts.": "अगले घंटे तक गिनो, फिर पूरे घंटे, फिर अंत तक के मिनट, और सब भाग जोड़ो।",
    "You learned: count on to the next hour, then on to the end, and add.": "तुमने सीखा: अगले घंटे तक, फिर अंत तक आगे गिनो और जोड़ो।",
    "A train leaves at 6:48 a.m., and arrives at 9:05 a.m. How long is the journey?": "एक रेलगाड़ी पूर्वाह्न 6 बजकर 48 मिनट पर चलती है। वह पूर्वाह्न 9 बजकर 5 मिनट पर पहुँचती है। यात्रा कितनी लंबी है?",
    "How long is the journey?": "यात्रा कितनी लंबी है?",
    "How far is it from the start to the next hour?": "शुरू से अगले घंटे तक कितनी दूर है?",
    "It starts at 7:25 p.m., and it ends at 8:15 p.m. How much time goes by?": "यह अपराह्न 7 बजकर 25 मिनट पर शुरू होता है, और अपराह्न 8 बजकर 15 मिनट पर खत्म होता है। कितना समय बीतता है?",
    "How much time goes by?": "कितना समय बीतता है?",
    "An hour has 60 minutes, not 100. Count on to eight o'clock first.": "एक घंटे में 60 मिनट होते हैं, 100 नहीं। पहले 8 बजे तक गिनो।",
    "A class visit to a museum starts at 2:40 p.m., and ends at 4:05 p.m. How long does the visit last?": "संग्रहालय की सैर अपराह्न 2 बजकर 40 मिनट पर शुरू होती है, और अपराह्न 4 बजकर 5 मिनट पर खत्म होती है। सैर कितनी देर चलती है?",
    "How long is the visit?": "सैर कितनी लंबी है?",
    "Start at 2:40. How many minutes until the three o'clock post?": "2 बजकर 40 मिनट से शुरू करो। 3 बजे के खंभे तक कितने मिनट हैं?",
    /* phase 2 */
    "Across twelve noon": "दोपहर 12 के पार",
    "Stop at twelve noon first. How long is it before noon, and how long after it?": "पहले दोपहर 12 बजे पर रुको। दोपहर से पहले कितना समय है, और उसके बाद कितना?",
    "How long is it from the start to 12 noon?": "शुरू से दोपहर 12 बजे तक कितना समय है?",
    "Add the part before noon to the part after noon.": "दोपहर से पहले का भाग और बाद का भाग जोड़ो।",
    "Across noon, count on to 12 noon, then on through the afternoon, and add the two parts.": "दोपहर के पार, दोपहर 12 बजे तक गिनो, फिर दोपहर बाद आगे गिनो, और दोनों भाग जोड़ो।",
    "You learned: across noon, count on to 12 noon, then on, and add.": "तुमने सीखा: दोपहर के पार, 12 बजे तक, फिर आगे गिनो और जोड़ो।",
    "A market stall opens at 9:50 a.m., and closes at 3:25 p.m. How long is it open?": "बाज़ार का एक ठेला पूर्वाह्न 9 बजकर 50 मिनट पर खुलता है, और अपराह्न 3 बजकर 25 मिनट पर बंद होता है। वह कितनी देर खुला रहता है?",
    "How long is the stall open?": "ठेला कितनी देर खुला है?",
    "Are the flags on the same side of noon?": "क्या दोनों झंडे दोपहर के एक ही ओर हैं?",
    "A shop opens at 8:45 a.m., and closes at 6:30 p.m. For how many hours and minutes is the shop open?": "एक दुकान पूर्वाह्न 8 बजकर 45 मिनट पर खुलती है, और अपराह्न 6 बजकर 30 मिनट पर बंद होती है। दुकान कितने घंटे और मिनट खुली रहती है?",
    "How long is the shop open?": "दुकान कितनी देर खुली है?",
    "The shop opens in the morning. Did you count the hours before noon?": "दुकान सुबह खुलती है। क्या तुमने दोपहर से पहले के घंटे गिने?",
    "A picnic starts at 11:20 a.m., and ends at 2:05 p.m. How much time does the picnic take?": "एक पिकनिक पूर्वाह्न 11 बजकर 20 मिनट पर शुरू होती है, और अपराह्न 2 बजकर 5 मिनट पर खत्म होती है। पिकनिक में कितना समय लगता है?",
    "How long is the picnic?": "पिकनिक कितनी लंबी है?",
    "The picnic begins before noon. Did your count start there?": "पिकनिक दोपहर से पहले शुरू होती है। क्या तुम्हारी गिनती वहीं से शुरू हुई?",
    /* phase 3 */
    "From a start and a duration": "शुरुआत और अवधि से",
    "Work out the hours first, then the minutes. Where will the hopper land?": "पहले घंटे निकालो, फिर मिनट। फुदकू कहाँ पहुँचेगा?",
    "Where do the hours of the duration land, before the minutes?": "मिनटों से पहले, अवधि के घंटे कहाँ पहुँचते हैं?",
    "Now work out the minutes, and stop at the hour post on the way.": "अब मिनट निकालो, और रास्ते में घंटे के खंभे पर रुको।",
    "A start time and a duration give the end time. Count on the hours, then the minutes, and see which half of the day it lands in.": "शुरू का समय और अवधि मिलकर अंत का समय देते हैं। घंटे आगे गिनो, फिर मिनट, और देखो कि वह दिन के किस आधे में पहुँचता है।",
    "You learned: count on hours, then minutes, to find when it ends.": "तुमने सीखा: पहले घंटे, फिर मिनट आगे गिनकर अंत का समय निकालो।",
    "A bus trip starts at 10:50 a.m., and takes 3 hours 35 minutes. When does it end?": "एक बस यात्रा पूर्वाह्न 10 बजकर 50 मिनट पर शुरू होती है, और 3 घंटे 35 मिनट लेती है। वह कब खत्म होती है?",
    "When does the trip end?": "यात्रा कब खत्म होगी?",
    "Where does the start flag stand?": "शुरू का झंडा कहाँ खड़ा है?",
    "A game starts at 3:35 p.m., and lasts 1 hour 40 minutes. At what time is the game over?": "एक खेल अपराह्न 3 बजकर 35 मिनट पर शुरू होता है, और 1 घंटा 40 मिनट चलता है। खेल किस समय खत्म होता है?",
    "When does the game end?": "खेल कब खत्म होगा?",
    "Sixty minutes make an hour. Did your minutes pass an hour post?": "60 मिनट का एक घंटा होता है। क्या तुम्हारे मिनट घंटे का खंभा पार करते हैं?",
    "A school trip leaves at 9:25 a.m., and lasts 4 hours 50 minutes. When does it get back?": "एक स्कूल यात्रा पूर्वाह्न 9 बजकर 25 मिनट पर निकलती है, और 4 घंटे 50 मिनट चलती है। वह कब लौटती है?",
    "When is it back?": "वह कब लौटेगी?",
    "It leaves in the morning. Does it come back before or after noon?": "यात्रा सुबह निकलती है। क्या वह दोपहर से पहले लौटती है या बाद में?",
    /* phase 4 */
    "Counting back": "पीछे गिनना",
    "Take the hours back first. Now the minutes. Where will the hopper land?": "पहले घंटे पीछे ले जाओ। अब मिनट। फुदकू कहाँ पहुँचेगा?",
    "Where do the hours land, going back?": "पीछे जाते हुए घंटे कहाँ पहुँचते हैं?",
    "Did your count back cross 12 noon? Then the half of the day changes.": "क्या तुम्हारी उलटी गिनती दोपहर 12 बजे के पार गई? तब दिन का आधा बदल जाता है।",
    "Count back the hours, then the minutes. When the count passes 12 noon going back, the time turns to a.m.": "घंटे पीछे गिनो, फिर मिनट। जब पीछे की गिनती दोपहर 12 बजे के पार जाती है, तो समय पूर्वाह्न हो जाता है।",
    "You learned: count back hours, then minutes; back past noon is a.m.": "तुमने सीखा: घंटे, फिर मिनट पीछे गिनो; दोपहर से पहले पूर्वाह्न है।",
    "What time was it 2 hours 50 minutes before 1:05 p.m.?": "अपराह्न 1 बजकर 5 मिनट से 2 घंटे 50 मिनट पहले क्या समय था?",
    "What time was it?": "क्या समय था?",
    "Which way does the hopper face?": "फुदकू किस ओर मुँह किए है?",
    "Which time is 45 minutes before 7:20 a.m.?": "पूर्वाह्न 7 बजकर 20 मिनट से 45 मिनट पहले कौन-सा समय था?",
    "What time was that?": "वह कौन-सा समय था?",
    "Going back past seven o'clock, how many minutes are left to go back?": "7 बजे से पीछे जाकर, पीछे जाने के लिए कितने मिनट बचे हैं?",
    "170 minutes before noon: what was the time then?": "दोपहर 12 बजे से 170 मिनट पहले: तब क्या समय था?",
    "What was the time?": "तब क्या समय था?",
    "Going back from noon, is the time earlier or later?": "दोपहर से पीछे जाने पर समय पहले का होता है या बाद का?",
    /* drawn on the picture and in the slot */
    "hops": "छलाँगें", "total": "कुल", "back": "पीछे", "h": "घंटे", "min": "मिनट",
    "12 noon": "दोपहर 12", "12 midnight": "आधी रात 12", "hours": "घंटे", "hour": "घंटा", "minutes": "मिनट",
  },
  gu: {
    "Duration Track": "સમયગાળાની પટ્ટી",
    "A track of the whole day, a start flag and an end flag. Where is the next hour?": "આખા દિવસની એક પટ્ટી, એક શરૂઆતનો ઝંડો અને એક અંતનો ઝંડો. આગલો કલાક ક્યાં છે?",
    "Durations counted on to the next hour, noon crossed with a stop, and end and start times found.": "આગલા કલાક સુધી ગણીને સમયગાળા શોધ્યા, બપોરના 12 પર થોભીને પાર કર્યા, અને શરૂઆત અને અંતના સમય શોધ્યા.",
    "Free play. The whole track, both flags, the hopper both ways and the duration cards open.": "મુક્ત રમત. આખી પટ્ટી, બંને ઝંડા, બંને દિશામાં કૂદકુ અને સમયગાળાનાં કાર્ડ ખુલ્લાં છે.",
    "Which half of the day is it? Tap its label.": "દિવસનો કયો અડધો ભાગ છે? તેનું લેબલ દબાવો.",
    /* phase 1 */
    "Counting on to the next hour": "આગલા કલાક સુધી આગળ ગણવું",
    "Hop to the next hour first. How far is that? Now hop on to the end.": "પહેલાં આગલા કલાક સુધી કૂદકો મારો. તે કેટલું દૂર છે? હવે અંત સુધી કૂદકો મારો.",
    "How many whole hours come after that?": "તે પછી કેટલા આખા કલાક આવે છે?",
    "Add the minutes of the short hops, then the whole hours.": "નાના કૂદકાની મિનિટો ઉમેરો, પછી આખા કલાક.",
    "Count on to the next hour, then whole hours, then the minutes to the end, and add the parts.": "આગલા કલાક સુધી ગણો, પછી આખા કલાક, પછી અંત સુધીની મિનિટો, અને બધા ભાગ ઉમેરો.",
    "You learned: count on to the next hour, then on to the end, and add.": "તમે શીખ્યા: આગલા કલાક સુધી, પછી અંત સુધી આગળ ગણો અને ઉમેરો.",
    "A train leaves at 6:48 a.m., and arrives at 9:05 a.m. How long is the journey?": "એક ટ્રેન પૂર્વાહ્ન 6 વાગીને 48 મિનિટે ઊપડે છે. તે પૂર્વાહ્ન 9 વાગીને 5 મિનિટે પહોંચે છે. મુસાફરી કેટલી લાંબી છે?",
    "How long is the journey?": "મુસાફરી કેટલી લાંબી છે?",
    "How far is it from the start to the next hour?": "શરૂઆતથી આગલા કલાક સુધી કેટલું દૂર છે?",
    "It starts at 7:25 p.m., and it ends at 8:15 p.m. How much time goes by?": "તે અપરાહ્ન 7 વાગીને 25 મિનિટે શરૂ થાય છે, અને અપરાહ્ન 8 વાગીને 15 મિનિટે પૂરું થાય છે. કેટલો સમય વીતે છે?",
    "How much time goes by?": "કેટલો સમય વીતે છે?",
    "An hour has 60 minutes, not 100. Count on to eight o'clock first.": "એક કલાકમાં 60 મિનિટ હોય છે, 100 નહીં. પહેલાં 8 વાગ્યા સુધી ગણો.",
    "A class visit to a museum starts at 2:40 p.m., and ends at 4:05 p.m. How long does the visit last?": "સંગ્રહાલયની મુલાકાત અપરાહ્ન 2 વાગીને 40 મિનિટે શરૂ થાય છે, અને અપરાહ્ન 4 વાગીને 5 મિનિટે પૂરી થાય છે. મુલાકાત કેટલો સમય ચાલે છે?",
    "How long is the visit?": "મુલાકાત કેટલી લાંબી છે?",
    "Start at 2:40. How many minutes until the three o'clock post?": "2 વાગીને 40 મિનિટથી શરૂ કરો. 3 વાગ્યાના થાંભલા સુધી કેટલી મિનિટ છે?",
    /* phase 2 */
    "Across twelve noon": "બપોરના 12 ની પાર",
    "Stop at twelve noon first. How long is it before noon, and how long after it?": "પહેલાં બપોરના 12 વાગ્યે થોભો. બપોર પહેલાં કેટલો સમય છે, અને તે પછી કેટલો?",
    "How long is it from the start to 12 noon?": "શરૂઆતથી બપોરના 12 સુધી કેટલો સમય છે?",
    "Add the part before noon to the part after noon.": "બપોર પહેલાંનો ભાગ અને બપોર પછીનો ભાગ ઉમેરો.",
    "Across noon, count on to 12 noon, then on through the afternoon, and add the two parts.": "બપોરની પાર, બપોરના 12 સુધી ગણો, પછી બપોર પછી આગળ ગણો, અને બંને ભાગ ઉમેરો.",
    "You learned: across noon, count on to 12 noon, then on, and add.": "તમે શીખ્યા: બપોરની પાર, 12 સુધી, પછી આગળ ગણો અને ઉમેરો.",
    "A market stall opens at 9:50 a.m., and closes at 3:25 p.m. How long is it open?": "બજારની એક લારી પૂર્વાહ્ન 9 વાગીને 50 મિનિટે ખૂલે છે, અને અપરાહ્ન 3 વાગીને 25 મિનિટે બંધ થાય છે. તે કેટલો સમય ખુલ્લી રહે છે?",
    "How long is the stall open?": "લારી કેટલો સમય ખુલ્લી છે?",
    "Are the flags on the same side of noon?": "શું બંને ઝંડા બપોરની એક જ બાજુ છે?",
    "A shop opens at 8:45 a.m., and closes at 6:30 p.m. For how many hours and minutes is the shop open?": "એક દુકાન પૂર્વાહ્ન 8 વાગીને 45 મિનિટે ખૂલે છે, અને અપરાહ્ન 6 વાગીને 30 મિનિટે બંધ થાય છે. દુકાન કેટલા કલાક અને મિનિટ ખુલ્લી રહે છે?",
    "How long is the shop open?": "દુકાન કેટલો સમય ખુલ્લી છે?",
    "The shop opens in the morning. Did you count the hours before noon?": "દુકાન સવારે ખૂલે છે. શું તમે બપોર પહેલાંના કલાક ગણ્યા?",
    "A picnic starts at 11:20 a.m., and ends at 2:05 p.m. How much time does the picnic take?": "એક પિકનિક પૂર્વાહ્ન 11 વાગીને 20 મિનિટે શરૂ થાય છે, અને અપરાહ્ન 2 વાગીને 5 મિનિટે પૂરી થાય છે. પિકનિકમાં કેટલો સમય લાગે છે?",
    "How long is the picnic?": "પિકનિક કેટલી લાંબી છે?",
    "The picnic begins before noon. Did your count start there?": "પિકનિક બપોર પહેલાં શરૂ થાય છે. શું તમારી ગણતરી ત્યાંથી શરૂ થઈ?",
    /* phase 3 */
    "From a start and a duration": "શરૂઆત અને સમયગાળા પરથી",
    "Work out the hours first, then the minutes. Where will the hopper land?": "પહેલાં કલાક શોધો, પછી મિનિટ. કૂદકુ ક્યાં પહોંચશે?",
    "Where do the hours of the duration land, before the minutes?": "મિનિટ પહેલાં, સમયગાળાના કલાક ક્યાં પહોંચે છે?",
    "Now work out the minutes, and stop at the hour post on the way.": "હવે મિનિટ શોધો, અને રસ્તામાં કલાકના થાંભલા પર થોભો.",
    "A start time and a duration give the end time. Count on the hours, then the minutes, and see which half of the day it lands in.": "શરૂઆતનો સમય અને સમયગાળો મળીને અંતનો સમય આપે છે. કલાક આગળ ગણો, પછી મિનિટ, અને જુઓ કે તે દિવસના કયા અડધા ભાગમાં પહોંચે છે.",
    "You learned: count on hours, then minutes, to find when it ends.": "તમે શીખ્યા: પહેલાં કલાક, પછી મિનિટ આગળ ગણીને અંતનો સમય શોધો.",
    "A bus trip starts at 10:50 a.m., and takes 3 hours 35 minutes. When does it end?": "એક બસની મુસાફરી પૂર્વાહ્ન 10 વાગીને 50 મિનિટે શરૂ થાય છે, અને 3 કલાક 35 મિનિટ લે છે. તે ક્યારે પૂરી થાય છે?",
    "When does the trip end?": "મુસાફરી ક્યારે પૂરી થશે?",
    "Where does the start flag stand?": "શરૂઆતનો ઝંડો ક્યાં ઊભો છે?",
    "A game starts at 3:35 p.m., and lasts 1 hour 40 minutes. At what time is the game over?": "એક રમત અપરાહ્ન 3 વાગીને 35 મિનિટે શરૂ થાય છે, અને 1 કલાક 40 મિનિટ ચાલે છે. રમત કયા સમયે પૂરી થાય છે?",
    "When does the game end?": "રમત ક્યારે પૂરી થશે?",
    "Sixty minutes make an hour. Did your minutes pass an hour post?": "60 મિનિટનો એક કલાક થાય. શું તમારી મિનિટો કલાકનો થાંભલો પાર કરે છે?",
    "A school trip leaves at 9:25 a.m., and lasts 4 hours 50 minutes. When does it get back?": "એક શાળા પ્રવાસ પૂર્વાહ્ન 9 વાગીને 25 મિનિટે નીકળે છે, અને 4 કલાક 50 મિનિટ ચાલે છે. તે ક્યારે પાછો આવે છે?",
    "When is it back?": "તે ક્યારે પાછો આવશે?",
    "It leaves in the morning. Does it come back before or after noon?": "પ્રવાસ સવારે નીકળે છે. તે બપોર પહેલાં પાછો આવે છે કે પછી?",
    /* phase 4 */
    "Counting back": "પાછળ ગણવું",
    "Take the hours back first. Now the minutes. Where will the hopper land?": "પહેલાં કલાક પાછળ લઈ જાઓ. હવે મિનિટ. કૂદકુ ક્યાં પહોંચશે?",
    "Where do the hours land, going back?": "પાછળ જતાં કલાક ક્યાં પહોંચે છે?",
    "Did your count back cross 12 noon? Then the half of the day changes.": "શું તમારી પાછળની ગણતરીએ બપોરના 12 પાર કર્યા? તો દિવસનો અડધો ભાગ બદલાય છે.",
    "Count back the hours, then the minutes. When the count passes 12 noon going back, the time turns to a.m.": "કલાક પાછળ ગણો, પછી મિનિટ. જ્યારે પાછળની ગણતરી બપોરના 12 પાર કરે છે, ત્યારે સમય પૂર્વાહ્ન બને છે.",
    "You learned: count back hours, then minutes; back past noon is a.m.": "તમે શીખ્યા: કલાક, પછી મિનિટ પાછળ ગણો; બપોર પહેલાં પૂર્વાહ્ન છે.",
    "What time was it 2 hours 50 minutes before 1:05 p.m.?": "અપરાહ્ન 1 વાગીને 5 મિનિટના 2 કલાક 50 મિનિટ પહેલાં શો સમય હતો?",
    "What time was it?": "શો સમય હતો?",
    "Which way does the hopper face?": "કૂદકુ કઈ બાજુ મોં રાખીને ઊભું છે?",
    "Which time is 45 minutes before 7:20 a.m.?": "પૂર્વાહ્ન 7 વાગીને 20 મિનિટના 45 મિનિટ પહેલાં કયો સમય હતો?",
    "What time was that?": "તે કયો સમય હતો?",
    "Going back past seven o'clock, how many minutes are left to go back?": "7 વાગ્યાની પાછળ ગયા પછી, પાછળ જવા માટે કેટલી મિનિટ બાકી છે?",
    "170 minutes before noon: what was the time then?": "બપોરના 12 ના 170 મિનિટ પહેલાં: ત્યારે શો સમય હતો?",
    "What was the time?": "ત્યારે શો સમય હતો?",
    "Going back from noon, is the time earlier or later?": "બપોરથી પાછળ જતાં, સમય વહેલો થાય કે મોડો?",
    /* drawn on the picture and in the slot */
    "hops": "કૂદકા", "total": "કુલ", "back": "પાછળ", "h": "કલાક", "min": "મિનિટ",
    "12 noon": "બપોરના 12", "12 midnight": "મધ્યરાત્રિ 12", "hours": "કલાક", "hour": "કલાક", "minutes": "મિનિટ",
  },
};

/* ── Duration Track's own helpers (dt… / DT…: the runtime and the tool share one scope) ───────────────
   A time is minutes from midnight (6:48 a.m. = 408, 12 noon = 720). The chapter's colours: the a.m. half
   sky blue, the p.m. half amber (on the day strip and the track alike), hours vermilion, minutes deep blue,
   a carried hour wine. Counted time (every hop, every total's box) is near-black, not the plan's green, so a
   correction or a win holds four content colours. Chrome (rims, posts, ticks, flags) is near-black too. */
const DT_DAY = 1440, DT_NOON = 720;
const DT_SKY = "#56B4E9", DT_AMBER = CONTENT.ten, DT_HOP = CONTENT.line, DT_HRS = CONTENT.pointer, DT_MIN = CONTENT.hundred;
const DT_WINE = "#882255";
/* a duration answers in two boxes; a time of day in two boxes plus its a.m. / p.m. label on the board */
const DT_DUR = [{ label: "hours" }, { label: "minutes" }];
const DT_AT = [{ label: "hour" }, { label: "minutes" }];
const DT_FREE = { kind: "free" };
const DT_FREE0 = [510, 855];
const DT_CARDS = [45, 90, 170];
/* the working area's rows (origin at its top-left, 1086 x 528): the clock, the day strip and the controls on
   top (to 165); the noon sun (190-242, 25 clear of the card row) and, beside it, the hop lengths on one row of
   pills (206-240); flag pennants (248-274), above the hopper (284-334); the lens track (334-374); hour numbers;
   the flags' time tags (414-456); the total bar */
const DT = { tx0: 16, tw: 1054, top: 334, bot: 374, poleTop: 248, postTop: 324, row0: 232, sunY: 216, hourY: 404, tagY: 414, tagH: 42,
  totY: 466, totH: 58, dx0: 216, dw: 860, dy: 18, dh: 36, cx: 100, cy: 102, cr: 90 };
/* the half of the day a time stands in, as a pennant's colour */
const dtHalfColour = (t: number) => (((t % DT_DAY) + DT_DAY) % DT_DAY < DT_NOON ? DT_SKY : DT_AMBER);

const dtClock = (t: number) => {
  const u = ((Math.round(t) % DT_DAY) + DT_DAY) % DT_DAY, h = Math.floor(u / 60);
  return { h12: h % 12 || 12, m: u % 60, half: h < 12 ? "a.m." : "p.m." };
};
/* a time as the book writes it: 6:48 a.m., 2:25 p.m., and 12 noon and 12 midnight for the two twelves */
const dtTime = (t: number, tx: any = (v: any) => v) => {
  const u = ((Math.round(t) % DT_DAY) + DT_DAY) % DT_DAY;
  /* the twelves as whole phrases, so each language orders them its own way (Gujarati: બપોરના 12) */
  if (u === DT_NOON) return tx("12 noon");
  if (u === 0) return tx("12 midnight");
  const c = dtClock(u);
  return c.h12 + ":" + String(c.m).padStart(2, "0") + " " + tx(c.half);
};
/* the half of the day a typed answer carries ("2|25|p.m.", "2:25 pm", [2, 25, "p.m."]); null when it has none */
const dtHalfOf = (v: any) => {
  const m = /([ap])\.?\s*m\b\.?/i.exec(Array.isArray(v) ? v.join(" ") : String(v ?? ""));
  return m ? (m[1].toLowerCase() === "a" ? "a.m." : "p.m.") : null;
};
/* a duration as coloured pieces: the hours in vermilion, the minutes in deep blue. A total always shows
   its hours (0 h 50 min, as the answer boxes read); a hop shows only what it has */
const dtParts = (d: number, total: boolean, tx: any = (v: any) => v) => {
  const h = Math.floor(d / 60), m = d % 60, out: any[] = [];
  if (h || total) out.push({ t: h + " " + tx("h"), c: DT_HRS });
  if (m || !h) out.push({ t: m + " " + tx("min"), c: DT_MIN });
  return out;
};
const dtLen = (d: number, tx: any = (v: any) => v) => dtParts(d, false, tx).map((p: any) => p.t).join(" ");
/* a card's own words ("3 h 35 min", "170 min") as coloured pieces, kept as the book gives them */
const dtCardParts = (s: string, tx: any = (v: any) => v) => {
  const h = /(\d+)\s*h\b/.exec(String(s)), m = /(\d+)\s*min/.exec(String(s)), out: any[] = [];
  if (h) out.push({ t: h[1] + " " + tx("h"), c: DT_HRS });
  if (m) out.push({ t: m[1] + " " + tx("min"), c: DT_MIN });
  return out;
};
/* an estimate of a label's width (Poppins, bold), for laying labels side by side without a collision */
const DT_GW: any = { " ": 0.28, ".": 0.28, ":": 0.3, i: 0.28, l: 0.28, m: 0.95, "+": 0.64, "=": 0.64 };
/* Devanagari and Gujarati: a letter runs a little wider than a Latin one, and a vowel sign takes about a third */
const DT_MARK = /[ऀ-ःऺ-ॏ॑-ॗॢॣઁ-ઃ઼ા-્ૢૣ]/;
const DT_INDIC = /[ऀ-ॿ઀-૿]/;
const dtW = (s: string, size: number) => String(s).split("").reduce((w: number, ch: string) =>
  w + (DT_MARK.test(ch) ? 0.28 : DT_INDIC.test(ch) ? 0.72 : DT_GW[ch] ?? 0.64) * size, 0);

/* the next landing on the way from t to goal, the page's way: on to the next hour post first, then the whole
   hours in one hop (landing on 12 noon first when the two times stand either side of it), then the minutes */
function dtSpanNext(t: number, goal: number, dir: number, noonStop: boolean) {
  if (t === goal) return null;
  if (dir > 0) {
    if (t % 60) return Math.min(t - (t % 60) + 60, goal);
    let h = Math.floor(goal / 60) * 60;
    if (noonStop && t < DT_NOON && h > DT_NOON) h = DT_NOON;
    return h > t ? h : goal;
  }
  if (t % 60) return Math.max(t - (t % 60), goal);
  let h = Math.ceil(goal / 60) * 60;
  if (noonStop && t > DT_NOON && h < DT_NOON) h = DT_NOON;
  return h < t ? h : goal;
}
/* a duration card hopped from the flag it is laid at: its whole hours in one hop, then its minutes, which
   stop on the hour post they cross (1:50 and 35 minutes: 10 to two o'clock, then 25) */
function dtCardNext(t: number, a: number, d: number, dir: number) {
  const r = d - Math.abs(t - a);
  if (r <= 0) return null;
  if (r >= 60) return t + dir * 60 * Math.floor(r / 60);
  const off = dir > 0 ? (t % 60 ? 60 - (t % 60) : 0) : t % 60;
  return t + dir * (off > 0 && off < r ? off : r);
}
/* the flag the hopper starts at, and every landing after it, in order */
const dtAnchor = (it: any, dir: number, fs: number, fe: number) => (it.kind === "span" ? it.s : it.kind === "free" ? (dir > 0 ? fs : fe) : it.a);
function dtRoute(it: any, dir: number, fs: number, fe: number) {
  const out: number[] = [];
  let t = dtAnchor(it, dir, fs, fe);
  for (let k = 0; k < 12; k++) {
    const nx = it.kind === "span" ? dtSpanNext(t, it.e, 1, it.s < DT_NOON && it.e > DT_NOON)
      : it.kind === "free" ? dtSpanNext(t, dir > 0 ? fe : fs, dir, fs < DT_NOON && fe > DT_NOON)
      : dtCardNext(t, it.a, it.d, dir);
    if (nx === null) break;
    out.push(nx);
    t = nx;
  }
  return out;
}

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
    concept: "Counting on to the next hour",
    conceptId: "M2.S4.T7.C24", objectiveIds: ["O11"],
    says: ["Hop to the next hour first. How far is that? Now hop on to the end."],
    /* tries, as the plan writes it: A miss is answered three ways at once and none of them is the answer. First rung, from the item's own miss line: how far is it from the start to the next hour? Second rung, the phase's: how many whole hours come after that? Third rung: the flags are cut to two times inside one hour, and the child finds the minutes between them before the longer stretch comes back. The pad stays open behind all three rungs. */
    /* rung 3 as the plan writes it is a stage direction ("the flags are cut ... the child finds"), 25 words:
       said here as the move it asks for */
    ladder: ["How many whole hours come after that?","Add the minutes of the short hops, then the whole hours."],
    closing: "Count on to the next hour, then whole hours, then the minutes to the end, and add the parts.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: count on to the next hour, then on to the end, and add.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The hopper runs from the start flag to the next hour post, then the whole hours, then the minutes to the end flag; the total bar adds the hops, and a pale flag stands where the child's answer would end.",
    items: [
      /* learn ML1: answer in the plan = 2 hours 17 minutes. Times are minutes from midnight: s start, e end */
      { qid: "M2.S4.T7.C24:ML1", kind: "span", s: 408, e: 545, parts: DT_DUR, winMs: 2600,
        say: "A train leaves at 6:48 a.m., and arrives at 9:05 a.m. How long is the journey?", ask: "How long is the journey?",
        answer: [2, 17], near: [2, 57], miss: "How far is it from the start to the next hour?" },
      /* practice 1: answer in the plan = 50 minutes: 35 minutes to 8:00 p.m. and 15 more (two boxes like the
         rest of the phase, so the slot never says the answer is under an hour: 0 hours 50 minutes). The plan's
         "How long is it from 7:25 p.m. to 8:15 p.m.?" is cut by the bubble after "p.m.", and "How long" is ML1's
         instruction: said as a start and an end, asked in its own words */
      { qid: "M2.S4.T7.C24:1", kind: "span", s: 1165, e: 1215, parts: DT_DUR, winMs: 2600,
        say: "It starts at 7:25 p.m., and it ends at 8:15 p.m. How much time goes by?", ask: "How much time goes by?",
        answer: [0, 50], near: [0, 90], miss: "An hour has 60 minutes, not 100. Count on to eight o'clock first." },
      /* practice 2: answer in the plan = 1 hour 25 minutes: 20 minutes to 3:00 p.m., 1 hour to 4:00 p.m., and 5 minutes more */
      { qid: "M2.S4.T7.C24:2", kind: "span", s: 880, e: 965, parts: DT_DUR, winMs: 2600,
        say: "A class visit to a museum starts at 2:40 p.m., and ends at 4:05 p.m. How long does the visit last?", ask: "How long is the visit?",
        answer: [1, 25], near: [1, 65], miss: "Start at 2:40. How many minutes until the three o'clock post?" },
    ],
  },
  {
    n: 2,
    concept: "Across twelve noon",
    conceptId: "M2.S4.T7.C25", objectiveIds: ["O11"],
    says: ["Stop at twelve noon first. How long is it before noon, and how long after it?"],
    /* tries, as the plan writes it: First rung, from the item: are the flags on the same side of noon? Second rung, the phase's: how long is it from the start to 12 noon? Third rung: the flags are cut to one time just before noon and one just after it, and the child finds the two parts before the longer stretch comes back. The pad stays open. */
    /* rung 3 as the plan writes it is a stage direction (27 words): said here as the move it asks for */
    ladder: ["How long is it from the start to 12 noon?","Add the part before noon to the part after noon."],
    closing: "Across noon, count on to 12 noon, then on through the afternoon, and add the two parts.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: across noon, count on to 12 noon, then on, and add.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The hopper stops on the 12 noon post; the part before noon and the part after it fill two boxes in the total bar and add, and a pale flag stands where the child's answer would end.",
    items: [
      /* learn ML2: answer in the plan = 5 hours 35 minutes */
      { qid: "M2.S4.T7.C25:ML2", kind: "span", s: 590, e: 925, parts: DT_DUR, winMs: 2800,
        say: "A market stall opens at 9:50 a.m., and closes at 3:25 p.m. How long is it open?", ask: "How long is the stall open?",
        answer: [5, 35], near: [6, 25], miss: "Are the flags on the same side of noon?" },
      /* practice 3: answer in the plan = 9 hours 45 minutes. Count on to 12 noon, 3 hours 15 minutes, then on to 6:30 p.m., 6 hours 30 minutes.
         The plan's "How long is it open?" is ML2's own last sentence word for word, and the voice never repeats
         itself (voice-no-repeat), so this one asks in its own words */
      { qid: "M2.S4.T7.C25:3", kind: "span", s: 525, e: 1110, parts: DT_DUR, winMs: 2800,
        say: "A shop opens at 8:45 a.m., and closes at 6:30 p.m. For how many hours and minutes is the shop open?", ask: "How long is the shop open?",
        answer: [9, 45], near: [2, 15], miss: "The shop opens in the morning. Did you count the hours before noon?" },
      /* practice 4: answer in the plan = 2 hours 45 minutes: 40 minutes to 12 noon, then 2 hours 5 minutes */
      { qid: "M2.S4.T7.C25:4", kind: "span", s: 680, e: 845, parts: DT_DUR, winMs: 2800,
        say: "A picnic starts at 11:20 a.m., and ends at 2:05 p.m. How much time does the picnic take?", ask: "How long is the picnic?",
        answer: [2, 45], near: [2, 5], miss: "The picnic begins before noon. Did your count start there?" },
    ],
  },
  {
    n: 3,
    concept: "From a start and a duration",
    conceptId: "M2.S4.T7.C26", objectiveIds: ["O12"],
    /* predict first: the child works the count out, the hopper shows it after (the plan's "Hop the hours first") */
    says: ["Work out the hours first, then the minutes. Where will the hopper land?"],
    /* tries, as the plan writes it: First rung, from the item: where does the start flag stand? Second rung, the phase's: where do the hours of the duration land, before the minutes? Third rung: the card is cut to whole hours only, and the child hops them before the minutes come back. The pad and the label keys stay open. */
    /* rung 3 as the plan writes it is a stage direction: said here as the move it asks for */
    ladder: ["Where do the hours of the duration land, before the minutes?","Now work out the minutes, and stop at the hour post on the way."],
    /* the plan's line is 128 characters in one sentence, and the bubble cuts a sentence after "a.m.": two
       sentences, the half of the day named in words */
    closing: "A start time and a duration give the end time. Count on the hours, then the minutes, and see which half of the day it lands in.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: count on hours, then minutes, to find when it ends.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "From the start flag the hopper hops the card's whole hours, then its minutes, stopping on the hour post they cross; the end flag is planted with its time and its half of the day, and a pale flag stands at the child's time.",
    items: [
      /* learn ML3: answer in the plan = 2:25 p.m. The answer is a time: hour and minutes in the two boxes and its
         half of the day on the working area's a.m. / p.m. label (a time with no label does not settle).
         a = the flag the card is laid at, d = the card, in minutes */
      { qid: "M2.S4.T7.C26:ML3", kind: "after", a: 650, d: 215, card: "3 h 35 min", parts: DT_AT, winMs: 2800,
        say: "A bus trip starts at 10:50 a.m., and takes 3 hours 35 minutes. When does it end?", ask: "When does the trip end?",
        answer: "2:25 p.m.", near: "1:85 p.m.", miss: "Where does the start flag stand?" },
      /* practice 5: answer in the plan = 5:15 p.m. (the plan's "When does it end?" is ML3's own sentence, and
         the voice never repeats itself: asked in its own words) */
      { qid: "M2.S4.T7.C26:5", kind: "after", a: 935, d: 100, card: "1 h 40 min", parts: DT_AT, winMs: 2800,
        say: "A game starts at 3:35 p.m., and lasts 1 hour 40 minutes. At what time is the game over?", ask: "When does the game end?",
        answer: "5:15 p.m.", near: "4:75 p.m.", miss: "Sixty minutes make an hour. Did your minutes pass an hour post?" },
      /* practice 7: answer in the plan = 2:15 p.m. Four hours after 9:25 a.m. is 1:25 p.m., and 50 minutes more cross two o'clock to 2:15 p.m. */
      { qid: "M2.S4.T7.C26:7", kind: "after", a: 565, d: 290, card: "4 h 50 min", parts: DT_AT, winMs: 2800,
        say: "A school trip leaves at 9:25 a.m., and lasts 4 hours 50 minutes. When does it get back?", ask: "When is it back?",
        answer: "2:15 p.m.", near: "2:15 a.m.", miss: "It leaves in the morning. Does it come back before or after noon?" },
    ],
  },
  {
    n: 4,
    concept: "Counting back",
    conceptId: "M2.S4.T7.C27", objectiveIds: ["O12"],
    /* the plan's "What time is it?" ran straight into question 1's "What time was it ...": it ends here on where
       the count lands instead */
    says: ["Take the hours back first. Now the minutes. Where will the hopper land?"],
    /* tries, as the plan writes it: First rung, from the item: which way does the hopper face? Second rung, the phase's: where do the hours land, going back? Third rung: the card is cut to whole hours only, and the child hops them back before the minutes come back. The pad and the label keys stay open. */
    /* rung 3 as the plan writes it is a stage direction: said here as the move it asks for */
    ladder: ["Where do the hours land, going back?","Did your count back cross 12 noon? Then the half of the day changes."],
    /* the plan's line, with its a.m. and p.m. mid-sentence, is cut by the bubble after each of them: the rule
       said in two sentences, the label last */
    closing: "Count back the hours, then the minutes. When the count passes 12 noon going back, the time turns to a.m.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: count back hours, then minutes; back past noon is a.m.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The hopper faces back and hops the card's whole hours, then its minutes, stopping on the hour post; crossing noon turns p.m. to a.m.; the start flag is planted with its time, and a pale flag stands at the child's time.",
    items: [
      /* learn ML4: answer in the plan = 10:15 a.m. */
      { qid: "M2.S4.T7.C27:ML4", kind: "before", a: 785, d: 170, card: "2 h 50 min", parts: DT_AT, winMs: 2800,
        say: "What time was it 2 hours 50 minutes before 1:05 p.m.?", ask: "What time was it?",
        answer: "10:15 a.m.", near: "10:15 p.m.", miss: "Which way does the hopper face?" },
      /* practice 6: answer in the plan = 6:35 a.m. (the plan's sentence is question 1's with new numbers: asked in
         its own words) */
      { qid: "M2.S4.T7.C27:6", kind: "before", a: 440, d: 45, card: "45 min", parts: DT_AT, winMs: 2800,
        say: "Which time is 45 minutes before 7:20 a.m.?", ask: "What time was that?",
        answer: "6:35 a.m.", near: "6:75 a.m.", miss: "Going back past seven o'clock, how many minutes are left to go back?" },
      /* practice 8: answer in the plan = 9:10 a.m. 170 minutes is 2 hours 50 minutes, and counting back that far from 12 noon gives 9:10 a.m.
         The card keeps the book's 170 minutes: the hops write it as hours and minutes */
      { qid: "M2.S4.T7.C27:8", kind: "before", a: 720, d: 170, card: "170 min", parts: DT_AT, winMs: 2800,
        say: "170 minutes before noon: what was the time then?", ask: "What was the time?",
        answer: "9:10 a.m.", near: "2:50 p.m.", miss: "Going back from noon, is the time earlier or later?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  minutesInHour: 60, noon: DT_NOON, day: DT_DAY,
  method: "count on to the next hour post, then the whole hours in one hop (landing on 12 noon when the two times stand either side of it), then the minutes; a duration card hops its whole hours, then its minutes, which stop on the hour post they cross",
  dayStrip: { x: DT.dx0, y: DT.dy, w: DT.dw, h: DT.dh, am: "midnight to noon, sky blue", pm: "noon to midnight, amber" },
  lensTrack: { x: DT.tx0, y: DT.top, w: DT.tw, h: DT.bot - DT.top, window: "the hours around the flags, one hour of margin each side (around the card's reach both ways for a card)" },
  totalBar: { x: DT.tx0, y: DT.totY, w: DT.tw, h: DT.totH, adds: "the hops; across noon the part before and the part after it" },
  clock: { cx: DT.cx, cy: DT.cy, r: DT.cr, follows: "the hopper" },
  free: { start: DT_FREE0[0], end: DT_FREE0[1], cards: DT_CARDS },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a duration by the value of each box (05 is 5); a time of day by its hour, its minutes and its half
   of the day, all three (2:25 with no label, or with a.m., is not 2:25 p.m.) */
const judge = (item: any, v: any) => {
  if (typeof item.answer === "string") {
    const want = /^(\d{1,2}):(\d{2}) ([ap]\.m\.)$/.exec(item.answer), [h, m] = slotPartsOf(v, 2);
    return !!want && h !== "" && m !== "" && Number(h) === Number(want[1]) && Number(m) === Number(want[2]) && dtHalfOf(v) === want[3];
  }
  return judgeSlotParts(item, v);
};
/* oracle: every answer re-derived from the spoken question itself, with its own clock arithmetic (no judge,
   no route, no picture): the times it names, the duration it names, before or after, and the 12-hour label.
   It also holds the picture's numbers (s, e, a, d) to the words the child hears */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const said = String(it.say), times: number[] = [];
  const re = /(\d{1,2}):(\d{2}) ([ap])\.m\./g;
  for (let m = re.exec(said); m; m = re.exec(said)) times.push(((Number(m[1]) % 12) + (m[3] === "p" ? 12 : 0)) * 60 + Number(m[2]));
  if (!times.length && /\bnoon\b/.test(said)) times.push(12 * 60);
  const hm = /(\d+) hours? (\d+) minutes/.exec(said), mm = /(\d+) minutes/.exec(said);
  const dur = hm ? Number(hm[1]) * 60 + Number(hm[2]) : mm ? Number(mm[1]) : null;
  if (times.length === 2) {
    const d = times[1] - times[0];
    return it.s === times[0] && it.e === times[1] && Array.isArray(it.answer) && it.answer[0] === Math.floor(d / 60) && it.answer[1] === d % 60;
  }
  if (times.length !== 1 || dur === null) return false;
  const back = /\bbefore\b/.test(said), t = times[0] + (back ? -dur : dur), hh = Math.floor(t / 60);
  const label = (hh % 12 || 12) + ":" + (t % 60 < 10 ? "0" : "") + (t % 60) + (hh < 12 ? " a.m." : " p.m.");
  return it.a === times[0] && it.d === dur && it.kind === (back ? "before" : "after") && it.answer === label;
}));
/* the item's own misconception (the plan's): 648 taken from 905 as whole numbers, 3:25 taken from 9:50,
   the part after noon alone, the minutes added to 85, the a.m. or p.m. kept across noon */
const nearMiss = (item: any) => {
  const v = Array.isArray(item.near) ? item.near.join("|") : item.near;
  /* on the page (the dev driver types the digits), the misconception's label goes onto the board's a.m. / p.m.
     keys as a child taps it, so the correction shows the child's own half; in the maths check HOOK is empty */
  if (typeof item.answer === "string" && HOOK.half) { const h = dtHalfOf(v); if (h) HOOK.half(h); }
  return v;
};
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => {
  if (typeof item.answer === "string") return [item.answer, item.answer.replace(/ [ap]\.m\.$/, "")];
  const [h, m] = item.answer;
  return h ? [`${h} hour${h === 1 ? "" : "s"} ${m} minutes`, `${h} h ${m} min`, `${words(h)} hour${h === 1 ? "" : "s"} ${words(m)} minutes`]
    : [`${m} minutes`, `${m} min`, `${words(m)} minutes`];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it: [hours, minutes], or
   a time with its label ("2:25 p.m.") */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, D: any) => D.submit(item.answer);
/* the agent's answer(): a time's half of the day goes onto the board's label (as a child taps it), then the
   runtime types the hour and the minutes into the two boxes as usual */
const answer = (item: any, v: any) => {
  if (typeof item.answer === "string" && HOOK.half) { const h = dtHalfOf(v); if (h) HOOK.half(h); }
  return undefined;
};
/* the agent's check() before Enter: nothing waits on the board; undefined = press Enter */
const check = () => undefined;

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
  const it: any = free || !item ? DT_FREE : item;
  const timed = it.kind === "after" || it.kind === "before";
  const winning = !free && (stage === "win" || stage === "idle");
  const live = free || stage === "ask" || stage === "teach";

  /* a fresh board for every question, and again when the phase starts over (its teach comes round again) */
  const epoch = useRef(0), was = useRef("");
  if (stage === "teach" && was.current !== "teach") epoch.current += 1;
  was.current = stage;
  const key = free ? "free" : n + ":" + index + ":" + epoch.current;
  const blank = (): any => ({ key, made: 0, laid: !timed, dir: it.kind === "before" ? -1 : 1, half: null, ask: false, sent: "",
    demo: null, fs: DT_FREE0[0], fe: DT_FREE0[1] });
  const [raw, setRaw] = useState<any>(blank);
  const s = raw.key === key ? raw : blank();
  const cur = useRef<any>(s);
  cur.current = s;
  const put = (o: any) => { const b = cur.current.key === key ? cur.current : blank(); const nx = { ...b, ...o }; cur.current = nx; setRaw(nx); };

  /* where the hopper stands: the child's own hops, each one the page's next landing (made = how many).
     Phases 3 and 4 are predict first: the child works out the time, and the hopper counts only in the win and
     the correction (its direction is the question's, so the back switch lives in Free play alone) */
  const dir = it.kind === "span" ? 1 : timed ? (it.kind === "before" ? -1 : 1) : s.dir;
  const noonStop = it.kind === "span" ? it.s < DT_NOON && it.e > DT_NOON : it.kind === "free" ? s.fs < DT_NOON && s.fe > DT_NOON : false;
  const anchor = dtAnchor(it, dir, s.fs, s.fe);
  const route = dtRoute(it, dir, s.fs, s.fe);
  const made = Math.min(s.made, route.length);
  const pos = made ? route[made - 1] : anchor;
  const arrived = s.laid && route.length > 0 && made >= route.length;
  /* the page's own count, which the correction and the win draw (the child's hops stay the child's) */
  const cDir = it.kind === "before" ? -1 : 1;
  const canon = free ? route : dtRoute(it, cDir, s.fs, s.fe);
  const cFrom = free ? anchor : dtAnchor(it, cDir, s.fs, s.fe);
  const land = canon.length ? canon[canon.length - 1] : cFrom;

  /* the lens: the stretch of the day around the flags, widened so its five-minute ticks can be counted. A
     card's stretch is its reach both ways from its flag, so the window never points at the answer */
  const [w0, w1] = it.kind === "span" ? [it.s, it.e] : timed ? [it.a - it.d, it.a + it.d] : [s.fs, s.fe];
  const pad = free ? 120 : 60;   /* in Free play a flag can be dragged two hours past the other before the lens moves on */
  let lo = Math.max(0, Math.floor(w0 / 60) * 60 - pad), hi = Math.min(DT_DAY, Math.ceil(w1 / 60) * 60 + pad);
  /* the 12 noon post and its sun never stand on the track's edge or under the clock: the window widens an hour */
  const xNoon = () => DT.tx0 + ((DT_NOON - lo) * DT.tw) / (hi - lo);
  while (lo > 0 && lo <= DT_NOON && DT_NOON <= hi && xNoon() < 250) lo -= 60;
  while (hi < DT_DAY && lo <= DT_NOON && DT_NOON <= hi && xNoon() > 1030) hi += 60;
  const ppm = DT.tw / Math.max(60, hi - lo);
  const X = (t: number) => DT.tx0 + (t - lo) * ppm;
  const tAt = (x: number) => lo + (x - DT.tx0) / ppm;
  const DX = (t: number) => DT.dx0 + (t / DT_DAY) * DT.dw;
  const dAt = (x: number) => ((x - DT.dx0) / DT.dw) * DT_DAY;

  /* the correction: the page's hops drawn step by step on a layer of its own, which the child's next act clears */
  const demo = !free && !winning && s.demo ? s.demo : null;
  const dShown = demo ? Math.min(demo.step, canon.length) : 0;
  const dFinal = !!demo && demo.step > canon.length;
  /* the pale flag: where the child's answer would stand (a duration counted on from the start, or the time) */
  const paleOf = (v: any) => {
    const [h, m] = slotPartsOf(v, 2);
    if (h === "" || m === "") return null;
    if (it.kind === "span") { const t = it.s + Number(h) * 60 + Number(m); return t !== it.e && t <= DT_DAY ? t : null; }
    /* the child's answer is the two boxes and the label on the board */
    const half = dtHalfOf(v) || s.half;
    if (!half || Number(m) >= 60 || Number(h) < 1 || Number(h) > 12) return null;
    const t = ((Number(h) % 12) + (half === "p.m." ? 12 : 0)) * 60 + Number(m);
    return t !== land ? t : null;
  };
  const pale = demo ? paleOf(demo.v) : null;
  const clockT = winning ? land : demo ? (dShown ? canon[dShown - 1] : cFrom) : pos;

  /* ── the child's acts ── */
  const acting = () => live && !tl.busy;
  const stopsAtNoon = (L: any) => (it.kind === "span" ? noonStop : it.kind === "free" ? L.fs < DT_NOON && L.fe > DT_NOON : false);
  /* a tap hops once; a drag along the track hops on as far as the finger went, but never past the noon post
     when the two times stand either side of it */
  const hop = (target: number | null) => {
    const L = cur.current, d = it.kind === "span" ? 1 : L.dir;
    const r = dtRoute(it, d, L.fs, L.fe), done = Math.min(L.made, r.length);
    if (timed || !L.laid || done >= r.length) return;
    const from = done ? r[done - 1] : dtAnchor(it, d, L.fs, L.fe);
    if (target !== null && (target - from) * d <= 0) return;   /* dragged the other way: it stays */
    let m = done + 1;
    if (target !== null) while (m < r.length && (r[m] - target) * d <= 5 && !(stopsAtNoon(L) && r[m - 1] === DT_NOON)) m++;
    put({ made: m, demo: null });
    api.sfx.tick();
  };
  const lay = () => { if (!timed || cur.current.laid) return; put({ laid: true }); api.sfx.tick(); };
  const flip = () => { if (!acting()) return; put({ dir: -cur.current.dir, made: 0, demo: null }); api.sfx.tick(); };
  const pickHalf = (h: string) => {
    if (!acting()) return;
    const L = cur.current, ps = slotPartsOf(typed, 2), full = ps.every((p: string) => p !== "");
    /* the label is part of the answer, like the digits: picking it keeps the correction standing */
    put({ half: h, ask: false });
    /* Enter came with no label: the label completes the answer */
    if (L.ask && full) { onEnterTime(ps.join("|")); return; }
    /* after a miss, a new label makes a new answer: the boxes are handed back fresh with the caret on the last
       box, so the next Enter sends it. toolApi.answer is the runtime's one way to set the caret (api has no
       setPart); it types the same digits the child typed */
    if (wrong && L.half !== h && ps.some((p: string) => p !== "")) {
      const A = (window as any).toolApi;
      if (!(full && A && A.answer(ps.join("|")))) api.setTyped(ps.join("|"));
    }
  };
  HOOK.half = (h: string) => put({ half: h, ask: false });
  const moveFlag = (which: string, t: number) => {
    const L = cur.current, snap = Math.round(t / 5) * 5;
    if (which === "s") put({ fs: Math.max(30, Math.min(L.fe - 5, snap)), made: 0, demo: null });
    else put({ fe: Math.min(DT_DAY - 30, Math.max(L.fs + 5, snap)), made: 0, demo: null });
  };
  /* Free play: a tap (or Enter) on a flag sets the hopper there, facing the other flag */
  const countFrom = (which: string) => { put({ dir: which === "s" ? 1 : -1, made: 0 }); api.sfx.tick(); };
  const layFree = (d: number) => {
    const L = cur.current;
    if (L.dir > 0) put({ fe: Math.min(DT_DAY - 30, L.fs + d), made: 0 });
    else put({ fs: Math.max(30, L.fe - d), made: 0 });
    api.sfx.tick();
  };
  const drag = useDrag((p: any, at: any, moved: boolean) => {
    if (!acting()) return;
    const tap = !moved || !isFinite(at.x) || !isFinite(at.y);
    if (p === "hopper") hop(tap ? null : tAt(at.x));
    else if (p === "card") { if (tap || at.y > 190) lay(); }
    else if (p && p.flag) {
      const L = cur.current, g0 = grab.current, t0 = p.flag === "s" ? L.fs : L.fe;
      if (tap) countFrom(p.flag); else moveFlag(p.flag, g0 ? t0 + (at.x - g0.x) / ppm : tAt(at.x));
      grab.current = null;
    }
    else if (p && p.card) { if (tap || at.y > 190) layFree(p.card); }
  });
  const dragging = drag.drag;
  const hopDrag = !!dragging && dragging.payload === "hopper";
  /* the hopper: the child's own; in a correction it stays quiet where it stood while the page's hopper walks the
     page's hops, and at the win it stands on the landing */
  const demoAt = dShown ? canon[dShown - 1] : cFrom;
  const hx = hopDrag ? Math.max(DT.tx0, Math.min(DT.tx0 + DT.tw, dragging.x)) : winning ? X(land) : X(pos);
  /* a new question puts the hopper on its flag at once (a slide from the last question's landing took a tap) */
  const lastKey = useRef(key), keyMoved = lastKey.current !== key;
  lastKey.current = key;

  /* a time answers with its label: Enter on the boxes comes here first. With no label it does not settle; the
     answer that just missed is never sent again unchanged */
  const onEnterTime = (v: any) => {
    const L = cur.current, ps = slotPartsOf(v === undefined ? typed : v, 2);
    if (ps.some((p: string) => p === "")) return;
    if (!L.half) { put({ ask: true }); api.say("Which half of the day is it? Tap its label."); return; }
    const val = ps.join("|") + "|" + L.half;
    if (val === L.sent) return;
    put({ sent: val });
    api.submit(val);
  };
  api.onEnter(timed && !free ? onEnterTime : null);

  /* the traceback: the hopper's count drawn again from the flag, hop by hop, ending on the whole answer */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    api.lock(true);
    const v = wrong.value, steps: any[] = [[450, () => put({ demo: { step: 0, v } })]];
    canon.forEach((_t: number, k: number) => steps.push([650, () => { put({ demo: { step: k + 1, v } }); api.sfx.tick(); }]));
    steps.push([900, () => put({ demo: { step: canon.length + 1, v } })]);
    tl.run(steps, () => api.lock(false));
  }, [wrong && wrong.tries]);

  /* what the host and the agent read back (toolApi.getState): nothing the child has not made */
  const planted = winning ? dtTime(land) : arrived && timed ? dtTime(pos) : null;
  api.share({
    startFlag: it.kind === "span" ? dtTime(it.s) : free ? dtTime(s.fs) : it.kind === "after" ? dtTime(it.a) : planted,
    endFlag: it.kind === "span" ? dtTime(it.e) : free ? dtTime(s.fe) : it.kind === "before" ? dtTime(it.a) : planted,
    hops: route.slice(0, made).map((t: number, k: number) => dtLen(Math.abs(t - (k ? route[k - 1] : anchor)))),
    noonStop, durationCard: timed ? it.card : null, direction: dir > 0 ? "forward" : "back", label: s.half,
    total: winning ? (timed ? it.card : dtLen(it.e - it.s)) : null,
  });

  /* ── drawing (helpers are called, never mounted) ── */
  const crosses = (lands: number[], from: number) => {
    let p = from;
    return lands.some((t: number) => { const hit = (p - DT_NOON) * (t - DT_NOON) <= 0 && p !== t; p = t; return hit; });
  };
  const noonLit = (it.kind === "span" && noonStop) || crosses(route.slice(0, made), anchor)
    || ((winning || dShown > 0) && crosses(canon.slice(0, winning ? canon.length : dShown), cFrom));
  const coloured = (ps: any[]) => ps.map((p: any, j: number) => <tspan key={j} fill={shade(p.c, 0.25)}>{(j ? " " : "") + p.t}</tspan>);

  const runs = () => {
    /* during a correction the count follows the page's hops as they are drawn */
    const need = winning || demo ? canon.length : route.length, got = winning || dFinal ? canon.length : demo ? dShown : made;
    /* a time question shows no "/ n" while it is open: how many hops the count needs would say whether its
       minutes cross an hour post, the very step the near misses get wrong */
    const shown = !timed || winning || demo ? got + " / " + need : String(got);
    return (
      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={2} />
        <text x={24} y={-44} fontSize={T.label} fontWeight={600} fill={shade(C.accent, 0.12)}>{tx("hops")}</text>
        <text x={306} y={-38} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={C.ink}>{shown}</text>
      </g>
    );
  };

  const clock = (t: number) => {
    const c = dtClock(t), cx = DT.cx, cy = DT.cy, r = DT.cr;
    const at = (deg: number, rr: number) => [cx + rr * Math.sin((deg * Math.PI) / 180), cy - rr * Math.cos((deg * Math.PI) / 180)];
    let minor = "", major = "";
    for (let k = 0; k < 60; k++) {
      const [x1, y1] = at(k * 6, r - 7), [x2, y2] = at(k * 6, k % 5 ? r - 13 : r - 19);
      const seg = "M " + x1.toFixed(1) + " " + y1.toFixed(1) + " L " + x2.toFixed(1) + " " + y2.toFixed(1) + " ";
      if (k % 5) minor += seg; else major += seg;
    }
    /* the hour hand stops short of the numerals; the minute hand reaches the minute marks and passes under the
       numerals, which keep a white halo so a hand never cuts one */
    const [hx2, hy2] = at(((c.h12 % 12) + c.m / 60) * 30, 34), [mx2, my2] = at(c.m * 6, 70);
    return (
      <g pointerEvents="none">
        <circle cx={cx} cy={cy} r={r} fill="#FFFFFF" stroke={C.ink} strokeWidth={5} filter="url(#fShadowSoft)" />
        <path d={minor} stroke={C.ink} strokeWidth={2} />
        <path d={major} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
        <line x1={cx} y1={cy} x2={hx2} y2={hy2} stroke={DT_HRS} strokeWidth={10} strokeLinecap="round" />
        <line x1={cx} y1={cy} x2={mx2} y2={my2} stroke={DT_MIN} strokeWidth={6} strokeLinecap="round" />
        {/* each numeral on a white disc above the hands: at a quarter hour the minute hand passes under it */}
        {[[12, 0], [3, 90], [6, 180], [9, 270]].map(([num, deg]: any) => {
          const [x, y] = at(deg, 57);
          return (
            <g key={num}>
              <circle cx={x} cy={y} r={num > 9 ? 17 : 13} fill="#FFFFFF" />
              <text x={x} y={y + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{num}</text>
            </g>
          );
        })}
        <circle cx={cx} cy={cy} r={8} fill={C.ink} />
      </g>
    );
  };

  /* the whole day, midnight to midnight: the a.m. half sky blue, the p.m. half amber, both named, the noon tick
     tall, the lens's stretch framed, the flags marked */
  const dayStrip = () => {
    const y = DT.dy, h = DT.dh, xn = DX(DT_NOON);
    const marks: number[] = free ? [s.fs, s.fe] : it.kind === "span" ? [it.s, it.e] : [it.a].concat(winning || dFinal ? [land] : []);
    const avoid = marks.concat(pale !== null ? [pale] : []).map(DX).concat([DX(lo), DX(hi)]);
    const spot = (opts: number[]) => opts.map(DX).sort((a: number, b: number) =>
      Math.min(...avoid.map((v: number) => Math.abs(v - b))) - Math.min(...avoid.map((v: number) => Math.abs(v - a))))[0];
    let hrs = "";
    for (let t = 60; t < DT_DAY; t += 60) if (t !== DT_NOON) hrs += "M " + DX(t).toFixed(1) + " " + (y + h - (t % 360 ? 7 : 13)) + " V " + (y + h) + " ";
    return (
      <g pointerEvents="none">
        <rect x={DT.dx0} y={y} width={DT.dw / 2} height={h} fill={tint(DT_SKY, 0.3)} />
        <rect x={xn} y={y} width={DT.dw / 2} height={h} fill={tint(DT_AMBER, 0.3)} />
        <path d={hrs} stroke={C.ink} strokeWidth={2} />
        <rect x={DT.dx0} y={y} width={DT.dw} height={h} rx={6} fill="none" stroke={C.ink} strokeWidth={2} />
        <line x1={xn} y1={y - 10} x2={xn} y2={y + h + 10} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
        <text x={spot([150, 270, 390, 540])} y={y + 28} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("a.m.")}</text>
        <text x={spot([900, 1020, 1140, 1290])} y={y + 28} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("p.m.")}</text>
        <rect x={DX(lo)} y={y - 7} width={DX(hi) - DX(lo)} height={h + 14} rx={8} fill="none" stroke={C.accent} strokeWidth={3} />
        {marks.map((t: number, k: number) => <line key={"m" + k} x1={DX(t)} y1={y - 4} x2={DX(t)} y2={y + h + 4} stroke={C.ink} strokeWidth={5} strokeLinecap="round" />)}
        {pale !== null && <line x1={DX(pale)} y1={y - 6} x2={DX(pale)} y2={y + h + 6} stroke={shade(C.dim, 0.3)} strokeWidth={5} strokeDasharray="6 5" />}
      </g>
    );
  };

  /* the lens track: hour posts, five-minute ticks, the tall 12 noon post under its sun, hour numbers below */
  /* Free play: a flag is dragged by its time tag on this track; while it moves it follows the finger by the
     distance dragged, in five-minute steps */
  const grab = useRef<any>(null);
  if (dragging && dragging.payload && dragging.payload.flag) { if (!grab.current) grab.current = { flag: dragging.payload.flag, x: dragging.x }; }
  else if (!dragging) grab.current = null;
  const flagNow = (which: string) => {
    const t0 = which === "s" ? s.fs : s.fe;
    if (!(dragging && dragging.payload && dragging.payload.flag === which && grab.current)) return t0;
    return Math.max(30, Math.min(DT_DAY - 30, Math.round((t0 + (dragging.x - grab.current.x) / ppm) / 5) * 5));
  };
  const flags: any[] = [];
  if (free) flags.push({ t: flagNow("s"), text: dtTime(flagNow("s"), tx), id: "s" }, { t: flagNow("e"), text: dtTime(flagNow("e"), tx), id: "e" });
  else if (it.kind === "span") flags.push({ t: it.s, text: dtTime(it.s, tx) }, { t: it.e, text: dtTime(it.e, tx) });
  else {
    flags.push({ t: it.a, text: dtTime(it.a, tx) });
    if (winning || dFinal) flags.push({ t: land, text: dtTime(land, tx) });
  }
  /* time tags side by side under their poles, never touching (24 apart where they are handles) */
  const gap = free ? 24 : 12;
  const tags = flags.map((f: any) => ({ ...f, w: Math.max(84, dtW(f.text, T.micro) + 30) })).sort((a: any, b: any) => a.t - b.t);
  tags.forEach((f: any, k: number) => {
    f.x = X(f.t) - f.w / 2;
    if (k && f.x < tags[k - 1].x + tags[k - 1].w + gap) f.x = tags[k - 1].x + tags[k - 1].w + gap;
  });
  for (let k = tags.length - 1; k >= 0; k--) {
    const most = k === tags.length - 1 ? 1084 - tags[k].w : tags[k + 1].x - gap - tags[k].w;
    if (tags[k].x > most) tags[k].x = most;
  }
  tags.forEach((f: any) => { if (f.x < 2) f.x = 2; });
  /* a pennant points away from the count: the earlier flag's to the left, the later one's to the right. A card's
     one flag points the way the card counts, so the flag the hopper carries on its back stays clear of it */
  tags.forEach((f: any, k: number) => { f.side = tags.length > 1 ? (k === 0 ? -1 : 1) : it.kind === "before" ? -1 : 1; });
  const paleIn = pale !== null && pale >= lo && pale <= hi;
  const paleEdgeX = pale !== null && pale < lo ? 76 : 1010;   /* the pale flag's pole when it stands off the lens */
  const poleXs = tags.map((f: any) => X(f.t)).concat(paleIn ? [X(pale)] : []).concat(pale !== null && !paleIn ? [paleEdgeX] : []);

  const lens = () => {
    const y0 = DT.top, y1 = DT.bot, hasNoon = lo <= DT_NOON && DT_NOON <= hi, xn = X(DT_NOON);
    const step = ppm * 5 >= 6 ? 5 : 15;
    let ticks = "", posts = "", low = "";
    for (let t = Math.ceil(lo / step) * step; t <= hi; t += step) {
      if (t % 60 === 0) continue;
      ticks += "M " + X(t).toFixed(1) + " " + y0 + " V " + (y0 + (t % 15 ? 7 : 12)) + " ";
    }
    for (let t = Math.ceil(lo / 60) * 60; t <= hi; t += 60) {
      if (t === DT_NOON) continue;
      posts += "M " + X(t).toFixed(1) + " " + DT.postTop + " V " + (y0 + 14) + " ";
      low += "M " + X(t).toFixed(1) + " " + (y1 - 11) + " V " + y1 + " ";
    }
    const amEnd = Math.min(hi, DT_NOON), pmStart = Math.max(lo, DT_NOON);
    /* a half's name sits in the middle of an hour, as far as it can be from every pole, the hopper and its ring;
       with nothing clear by 44 it is left out (the day strip above names both halves) */
    const clear = poleXs.concat([hx, X(demoAt)]);
    const halfAt = (a: number, b: number) => {
      const cands: number[] = [];
      for (let t = Math.ceil(a / 60) * 60; t + 60 <= b; t += 60) cands.push(t + 30);
      if (!cands.length) cands.push((a + b) / 2);
      let best: number | null = null, bd = -1;
      cands.forEach((t: number) => {
        const x = X(t), d = Math.min(1e9, ...clear.map((o: number) => Math.abs(o - x)));
        if (x > 54 && x < 1032 && d > bd) { bd = d; best = x; }
      });
      return best !== null && bd >= 44 ? best : null;
    };
    const halfName = (x: number | null, colour: string, text: string) => (x === null ? null : (
      <g key={text}>
        <rect x={x - 38} y={y0 + 8} width={76} height={26} rx={8} fill={tint(colour, 0.72)} />
        <text x={x} y={y0 + 30} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{text}</text>
      </g>
    ));
    const sunR = 15, rays = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
    return (
      <g pointerEvents="none">
        {lo < DT_NOON && <rect x={X(lo)} y={y0} width={X(amEnd) - X(lo)} height={y1 - y0} fill={tint(DT_SKY, 0.3)} />}
        {hi > DT_NOON && <rect x={X(pmStart)} y={y0} width={X(hi) - X(pmStart)} height={y1 - y0} fill={tint(DT_AMBER, 0.3)} />}
        <path d={ticks} stroke={C.ink} strokeWidth={1.5} />
        <path d={posts + low} stroke={C.ink} strokeWidth={3} />
        {lo < DT_NOON && halfName(halfAt(lo, amEnd), DT_SKY, tx("a.m."))}
        {hi > DT_NOON && halfName(halfAt(pmStart, hi), DT_AMBER, tx("p.m."))}
        <rect x={DT.tx0} y={y0} width={DT.tw} height={y1 - y0} rx={4} fill="none" stroke={C.ink} strokeWidth={2} />
        {hasNoon && <line x1={xn} y1={DT.sunY + sunR + 12} x2={xn} y2={y1} stroke={C.ink} strokeWidth={noonLit ? 8 : 6} strokeLinecap="round" />}
        {/* the 12 noon sun: hollow until the count reaches or crosses noon, then lit */}
        {hasNoon && <g>
          {rays.map((a: number) => (
            <line key={"r" + a} x1={xn + (sunR + 5) * Math.sin((a * Math.PI) / 180)} y1={DT.sunY - (sunR + 5) * Math.cos((a * Math.PI) / 180)}
              x2={xn + (sunR + 11) * Math.sin((a * Math.PI) / 180)} y2={DT.sunY - (sunR + 11) * Math.cos((a * Math.PI) / 180)}
              stroke={C.ink} strokeWidth={noonLit ? 5 : 3} strokeLinecap="round" />))}
          <circle cx={xn} cy={DT.sunY} r={sunR} fill={noonLit ? DT_AMBER : "#FFFFFF"} stroke={C.ink} strokeWidth={noonLit ? 3.5 : 3} />
        </g>}
      </g>
    );
  };
  /* the hour numbers under the posts, over the flag poles on a paper halo, so none is ever left out */
  const hourNums = () => {
    const lstep = [1, 2, 3, 4, 6].find((k: number) => ppm * 60 * k >= 64) || 6;
    const out: any[] = [];
    for (let t = Math.ceil(lo / 60) * 60; t <= hi; t += 60) {
      const x0 = X(t), text = String(dtClock(t).h12), w = dtW(text, T.micro) + 12;
      if ((t / 60) % lstep || x0 < 30 || x0 > 1056) continue;
      /* a numeral beside a flag pole steps aside so 12 stay clear between them */
      const pole = poleXs.find((px: number) => Math.abs(px - x0) < w / 2 + 12);
      const x = pole === undefined ? x0 : pole + (x0 >= pole ? 1 : -1) * (w / 2 + 12);
      out.push(<g key={"h" + t}>
        <rect x={x - w / 2} y={DT.hourY - 24} width={w} height={30} rx={8} fill={C.paper} />
        <text x={x} y={DT.hourY} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{text}</text>
      </g>);
    }
    return <g pointerEvents="none">{out}</g>;
  };

  /* each flag: a near-black pole standing tall through the track, a pennant at its top in the colour of the half of
     the day it stands in, and its time on a tag below the track */
  const pennant = (x: number, side: number, fill: string, stroke: string, dash?: string) => (
    <path d={"M " + x + " " + DT.poleTop + " L " + (x + side * 44) + " " + (DT.poleTop + 13) + " L " + x + " " + (DT.poleTop + 26) + " Z"}
      fill={fill} stroke={stroke} strokeWidth={3} strokeLinejoin="round" strokeDasharray={dash} />
  );
  const paleInk = shade(C.dim, 0.35);
  const paleHalf = pale === null ? null : dtHalfColour(pale);
  const flagPoles = () => (
    <g pointerEvents="none">
      {tags.map((f: any, k: number) => {
        const x = X(f.t), cx = Math.max(f.x + 12, Math.min(f.x + f.w - 12, x));
        return (
          <g key={"f" + k}>
            <line x1={x} y1={DT.poleTop} x2={x} y2={DT.bot + 8} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            {pennant(x, f.side, dtHalfColour(f.t), C.ink)}
            <path d={"M " + x + " " + (DT.bot + 8) + " L " + cx + " " + DT.tagY} stroke={C.ink} strokeWidth={3} fill="none" />
            <rect x={f.x} y={DT.tagY} width={f.w} height={DT.tagH} rx={10} fill="#FFFFFF" stroke={C.ink} strokeWidth={2.5} />
            <text x={f.x + f.w / 2} y={DT.tagY + 30} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{f.text}</text>
          </g>
        );
      })}
      {/* the pale flag: where the child's answer would stand, dashed, its pennant in the child's half of the day */}
      {paleIn && <g>
        <line x1={X(pale)} y1={DT.poleTop} x2={X(pale)} y2={DT.bot + 8} stroke={paleInk} strokeWidth={5} strokeDasharray="10 7" />
        {pennant(X(pale), 1, tint(paleHalf || DT_SKY, 0.55), paleInk, "7 4")}
      </g>}
      {/* off the lens: a pale flag at the track's edge with an arrow pointing the way to it */}
      {pale !== null && !paleIn && (() => {
        /* the arrow is a 44-wide ink wedge at the track's own end, the dashed flag just inside it */
        const left = pale < lo, x = paleEdgeX, side = left ? 1 : -1, ay = DT.poleTop + 44, tip = left ? 18 : 1068, back = left ? 62 : 1024;
        return (
          <g>
            <line x1={x} y1={DT.poleTop} x2={x} y2={DT.top - 4} stroke={paleInk} strokeWidth={5} strokeDasharray="10 7" />
            {pennant(x, side, tint(paleHalf || DT_SKY, 0.55), paleInk, "7 4")}
            <path d={"M " + back + " " + (ay - 16) + " L " + tip + " " + ay + " L " + back + " " + (ay + 16) + " Z"} fill={C.ink} />
          </g>
        );
      })()}
    </g>
  );

  /* hops: arcs from landing to landing; their lengths on one row of pills above, in the order of the track, pushed
     apart where short hops crowd. A short hop bulges to at least 30 wide so it never draws as a knot */
  const arcH = (x1: number, x2: number) => Math.max(26, Math.min(62, Math.abs(x2 - x1) * 0.4));
  const arcs = (lands: number[], from: number, quiet: boolean, tag: string) => {
    const out: any[] = [];
    let p = from;
    lands.forEach((t: number, k: number) => {
      const x1 = X(p), x2 = X(t), hg = arcH(x1, x2), mx = (x1 + x2) / 2, w = Math.abs(x2 - x1), sg = x2 >= x1 ? 1 : -1;
      const sp = w < 30 ? (30 - w) / 2 : 0, cy = DT.top - (4 / 3) * hg;
      const d = sp ? "M " + x1.toFixed(1) + " " + DT.top + " C " + (x1 - sg * sp).toFixed(1) + " " + cy.toFixed(1) + " " + (x2 + sg * sp).toFixed(1) + " " + cy.toFixed(1) + " " + x2.toFixed(1) + " " + DT.top
        : "M " + x1.toFixed(1) + " " + DT.top + " Q " + mx.toFixed(1) + " " + (DT.top - 2 * hg) + " " + x2.toFixed(1) + " " + DT.top;
      out.push(<path key={tag + "a" + k} d={d} fill="none" stroke={quiet ? tint(DT_HOP, 0.5) : DT_HOP} strokeWidth={quiet ? 3 : 5} strokeLinecap="round" />);
      out.push(<circle key={tag + "d" + k} cx={x2} cy={DT.top} r={quiet ? 4 : 6} fill={quiet ? tint(DT_HOP, 0.5) : DT_HOP} />);
      p = t;
    });
    return out;
  };
  const arcLabels = (lands: number[], from: number) => {
    const L: any[] = [];
    let p = from;
    lands.forEach((t: number) => {
      const text = dtLen(Math.abs(t - p), tx), w = dtW(text, T.micro) + 24, x1 = X(p), x2 = X(t);
      L.push({ ax: (x1 + x2) / 2, ay: DT.top - arcH(x1, x2), text, w, x1, x2, hg: arcH(x1, x2) });
      p = t;
    });
    L.sort((a: any, b: any) => a.ax - b.ax);
    /* the noon sun and its post share the row: the pills of the arcs before noon pack to its left, the rest to its
       right, each group in track order and never touching */
    const pack = (G: any[], a: number, b: number) => {
      G.forEach((l: any, k: number) => {
        l.x = Math.max(a + l.w / 2, l.ax);
        if (k && l.x - l.w / 2 < G[k - 1].x + G[k - 1].w / 2 + 10) l.x = G[k - 1].x + G[k - 1].w / 2 + 10 + l.w / 2;
      });
      for (let k = G.length - 1; k >= 0; k--) {
        const most = k === G.length - 1 ? b - G[k].w / 2 : G[k + 1].x - G[k + 1].w / 2 - 10 - G[k].w / 2;
        if (G[k].x > most) G[k].x = most;
      }
    };
    if (lo <= DT_NOON && DT_NOON <= hi) {
      const xs = X(DT_NOON);
      pack(L.filter((l: any) => l.ax < xs), 2, xs - 50);
      pack(L.filter((l: any) => l.ax >= xs), xs + 50, 1084);
    } else pack(L, 2, 1084);
    /* a pill over its own arc needs no leader. A pill pushed aside is tied to its arc by a leader that runs along
       the clear gap under the pills (above every pennant), then drops straight to the arc on the side away from
       any pole, so it never crosses a pennant or doubles a pole */
    const base = DT.row0, gapY = base + 12;
    /* a pole or the noon post beside an arc's top: the leader lands on the arc's far shoulder instead, so it never
       reads as a tick on the post */
    const posts = poleXs.concat(lo <= DT_NOON && DT_NOON <= hi ? [X(DT_NOON)] : []);
    const onArc = (l: any, u: number) => {
      const mx = (l.x1 + l.x2) / 2, cy = DT.top - 2 * l.hg;
      return [(1 - u) * (1 - u) * l.x1 + 2 * u * (1 - u) * mx + u * u * l.x2, (1 - u) * (1 - u) * DT.top + 2 * u * (1 - u) * cy + u * u * DT.top];
    };
    return L.map((l: any, k: number) => {
      const near = posts.find((px: number) => Math.abs(px - l.ax) < 24);
      let dropX = l.ax, dropY = l.ay;
      if (near !== undefined && Math.abs(l.x2 - l.x1) >= 60) {
        const a = onArc(l, 0.25), b = onArc(l, 0.75), far = Math.abs(a[0] - near) > Math.abs(b[0] - near) ? a : b;
        dropX = far[0]; dropY = far[1];
      } else if (near !== undefined) dropX = l.ax + (l.ax >= near ? 1 : -1) * Math.max(0, 14 - Math.abs(l.ax - near));
      const over = Math.abs(l.x - l.ax) <= l.w / 2 - 12;
      const edge = l.x + Math.sign(dropX - l.x) * (l.w / 2 - 16);
      const lead = over ? null : "M " + edge.toFixed(1) + " " + (base + 8) + " L " + edge.toFixed(1) + " " + gapY + " L " + dropX.toFixed(1) + " " + gapY
        + " L " + dropX.toFixed(1) + " " + (dropY + 3).toFixed(1);
      return (
        <g key={"l" + k}>
          {lead && <path d={lead} fill="none" stroke={shade(DT_HOP, 0.1)} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />}
          <rect x={l.x - l.w / 2} y={base - 26} width={l.w} height={34} rx={17} fill={C.paper} stroke={DT_HOP} strokeWidth={2.5} />
          <text x={l.x} y={base} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={shade(DT_HOP, 0.25)}>{l.text}</text>
        </g>
      );
    });
  };

  /* the total bar: the hops added (across noon, the part before it and the part after it, each in a green box);
     the sum is written once the count is done: at the win, at the end of a correction, or for a card (whose
     sum is the card itself) */
  const totalBar = () => {
    const shownCanon = winning || !!demo;
    const lands = shownCanon ? canon.slice(0, winning || dFinal ? canon.length : dShown) : route.slice(0, made);
    const from = shownCanon ? cFrom : anchor;
    const full = lands.length === (shownCanon ? canon.length : route.length) && lands.length > 0;
    const result = shownCanon ? (winning || dFinal ? Math.abs(land - cFrom) : null) : arrived && (timed || free) ? Math.abs(pos - anchor) : null;
    const lens: number[] = [];
    let p = from;
    lands.forEach((t: number) => { lens.push(Math.abs(t - p)); p = t; });
    let terms: any[];
    if (it.kind === "span" && noonStop) {
      const cut = lands.indexOf(DT_NOON), sum = (a: number[]) => a.reduce((x: number, y: number) => x + y, 0);
      terms = [];
      if (cut >= 0) terms.push({ d: sum(lens.slice(0, cut + 1)), box: true });
      if (cut >= 0 && full) terms.push({ d: sum(lens.slice(cut + 1)), box: true });
    } else terms = lens.map((d: number) => ({ d }));
    const carry = result !== null && lens.reduce((x: number, d: number) => x + (d % 60), 0) >= 60;
    /* longer words (Hindi, Gujarati) or many hops: a size down, then only the sum (the hops stay on their pills) */
    const wordsW = (d: number, total: boolean, sz: number) => dtW(dtParts(d, total, tx).map((q: any) => q.t).join(" "), sz);
    const need = (sz: number) => terms.reduce((a: number, tm: any, k: number) => a + (k ? 38 : 0) + wordsW(tm.d, false, sz) + (tm.box ? 24 : 14), 0)
      + (result !== null ? 40 + wordsW(result, true, sz) + (carry ? 108 : 0) : 0);
    const room = DT.tx0 + DT.tw - 16 - 150;
    const size = need(T.label) * 1.1 <= room ? T.label : T.micro, base = DT.totY + 40, out: any[] = [];
    if (result !== null && need(size) * 1.1 > room) terms = [];
    let x = 150;
    terms.forEach((tm: any, k: number) => {
      if (k) { out.push(<text key={"p" + k} x={x + 2} y={base} fontSize={size} fontWeight={700} fill={C.ink}>+</text>); x += 38; }
      const ps = dtParts(tm.d, false, tx), w = dtW(ps.map((q: any) => q.t).join(" "), size);
      if (tm.box) out.push(<rect key={"b" + k} x={x - 10} y={DT.totY + 7} width={w + 20} height={DT.totH - 14} rx={10} fill="#FFFFFF" stroke={DT_HOP} strokeWidth={3} />);
      out.push(<text key={"t" + k} x={x} y={base} fontSize={size} fontWeight={700}>{coloured(ps)}</text>);
      x += w + (tm.box ? 24 : 14);
    });
    if (result !== null) {
      if (terms.length) { out.push(<text key="eq" x={x + 4} y={base} fontSize={size} fontWeight={700} fill={C.ink}>=</text>); x += 40; }
      const ps = dtParts(result, true, tx), w = dtW(ps.map((q: any) => q.t).join(" "), size);
      out.push(<text key="res" x={x} y={base} fontSize={size} fontWeight={700}>{coloured(ps)}</text>);
      x += w + 16;
      const cw = Math.max(92, dtW("+1 " + tx("h"), T.micro) + 28);
      if (carry) out.push(<g key="carry"><rect x={x} y={DT.totY + 9} width={cw} height={DT.totH - 18} rx={20} fill={tint(DT_WINE, 0.85)} stroke={DT_WINE} strokeWidth={2.5} />
        <text x={x + cw / 2} y={base - 2} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={DT_WINE}>+1 {tx("h")}</text></g>);
    }
    return (
      <g pointerEvents="none">
        <rect x={DT.tx0} y={DT.totY} width={DT.tw} height={DT.totH} rx={16} fill={tint(C.panel, 0.45)} stroke={C.rule} strokeWidth={2} />
        <text x={DT.tx0 + 20} y={base - 2} fontSize={T.micro} fontWeight={600} fill={shade(C.accent, 0.12)}>{tx("total")}</text>
        {out}
      </g>
    );
  };

  /* the duration card: a drag piece until it is laid at its flag, then it stands in the tray, edged green */
  /* a card too narrow for its words on one line (Hindi, Gujarati) puts the hours above the minutes */
  const cardFace = (x: number, y: number, w: number, h: number, text: string, laid: boolean, size: number) => {
    const ps = dtCardParts(text, tx), one = ps.length < 2 || dtW(ps.map((p: any) => p.t).join(" "), size) <= w - 24, s2 = Math.min(size, T.label);
    return (
      <g>
        <rect x={x} y={y} width={w} height={h} rx={14} fill="#FFFFFF" stroke={laid ? DT_HOP : C.ink} strokeWidth={laid ? 5 : 3} filter="url(#fShadowSoft)" />
        {one ? <text x={x + w / 2} y={y + h / 2 + size * 0.36} textAnchor="middle" fontSize={size} fontWeight={700}>{coloured(ps)}</text>
          : ps.map((p: any, j: number) => (
            <text key={j} x={x + w / 2} y={y + h / 2 + (j ? s2 * 0.98 : -s2 * 0.1)} textAnchor="middle" fontSize={s2} fontWeight={700} fill={shade(p.c, 0.25)}>{p.t}</text>))}
      </g>
    );
  };
  /* the card is as wide as its words need (Hindi and Gujarati run longer), never into the a.m. / p.m. keys */
  const cardText = (text: string) => dtCardParts(text, tx).map((p: any) => p.t).join(" ");
  const CARD = { x: 216, y: 72, w: timed ? Math.max(240, Math.min(360, dtW(cardText(it.card), T.prompt) + 40)) : 240, h: 80 };
  const FW = Math.max(180, Math.min(206, ...DT_CARDS.map((d: number) => dtW(cardText(dtLen(d)), T.label) + 30)));
  const card = () => {
    if (!timed || free) return null;
    const on = dragging && dragging.payload === "card";
    const x = on ? Math.max(0, Math.min(1086 - CARD.w, dragging.x - CARD.w / 2)) : CARD.x;
    const y = on ? Math.max(0, Math.min(528 - CARD.h, dragging.y - CARD.h / 2)) : CARD.y;
    if (s.laid || winning || !live) return <g pointerEvents="none">{cardFace(CARD.x, CARD.y, CARD.w, CARD.h, it.card, s.laid || winning, T.prompt)}</g>;
    return (
      <g {...control("card", tx("duration card"))} {...drag.bind("card")} {...drag.keys("card")}>
        {cardFace(x, y, CARD.w, CARD.h, it.card, false, T.prompt)}
      </g>
    );
  };
  const freeCards = () => DT_CARDS.map((d: number, k: number) => {
    const on = dragging && dragging.payload && dragging.payload.card === d;
    const x0 = 216 + k * (FW + 24), x = on ? Math.max(0, Math.min(1086 - FW, dragging.x - FW / 2)) : x0;
    const y = on ? Math.max(0, Math.min(528 - 86, dragging.y - 43)) : 78;
    const text = dtLen(d);
    return (
      <g key={"c" + d} {...control("card-" + (k + 1), tx("duration card") + " " + text)} {...drag.bind({ card: d })} {...drag.keys({ card: d })}>
        {cardFace(x, y, FW, 86, text, false, T.label)}
      </g>
    );
  });
  const backKey = (x: number) => (
    <Key id="back-switch" x={x} y={84} w={170} h={76} C={C} primary={dir < 0} onClick={flip} label={tx("back switch")}>
      <path d="M -58 0 L -38 -14 M -58 0 L -38 14 M -58 0 H -26" stroke={dir < 0 ? "#FFFFFF" : C.ink} strokeWidth={5} strokeLinecap="round" fill="none" />
      <text x={16} y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={dir < 0 ? "#FFFFFF" : C.ink}>{tx("back")}</text>
    </Key>
  );
  /* the a.m. / p.m. label of a time, on the board beside the answer: the child's pick stays dark */
  const HALF = { x: 852, y: 84, w: 96, h: 76, gap: 24 };
  const halfKeys = () => (["a.m.", "p.m."] as string[]).map((h: string, k: number) => (
    <Key key={h} id={k ? "half-pm" : "half-am"} x={HALF.x + k * (HALF.w + HALF.gap)} y={HALF.y} w={HALF.w} h={HALF.h} C={C} primary={s.half === h}
      onClick={() => pickHalf(h)} label={tx(h)}>
      <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={s.half === h ? "#FFFFFF" : C.ink}>{tx(h)}</text>
    </Key>
  ));
  /* Free play: each flag is dragged by its time tag on the big track (a box at least 76 wide); a tap or Enter
     counts from that flag; the arrow keys move it a quarter of an hour */
  const flagHandles = () => tags.map((f: any) => {
    const w = Math.max(76, f.w), x = Math.max(0, Math.min(1086 - w, f.x + f.w / 2 - w / 2)), p = { flag: f.id };
    const keys = drag.keys(p);
    const onKey = (e: any) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        if (acting()) moveFlag(f.id, (f.id === "s" ? s.fs : s.fe) + (e.key === "ArrowLeft" ? -15 : 15));
        return;
      }
      keys.onKeyDown(e);
    };
    return (
      <g key={"h" + f.id} {...control(f.id === "s" ? "flag-start" : "flag-end", tx(f.id === "s" ? "start flag" : "end flag"))} {...drag.bind(p)} onKeyDown={onKey}>
        <rect x={x} y={DT.tagY - 16} width={w} height={DT.tagH + 32} fill="transparent" />
      </g>
    );
  });

  /* the hopper: a round toy on the track that looks the way it counts; in phases 3 and 4 it carries the flag it
     will plant, on a pole above its back */
  const hopperAt = (x: number, face: number, o: any) => {
    const bx = Math.max(0, Math.min(1086 - 76, x - 38)) - x, fx = -face * 34;
    return (
      <g key={o.key} {...o.props} style={{ transform: "translate(" + x + "px, " + DT.top + "px)",
        /* under reduced motion the hop is instant, so the hopper never trails the arcs and the sum */
        transition: o.still || reducedMotion() ? "none" : "transform 300ms ease-out" } as any}>
        <rect x={bx} y={-78} width={76} height={76} fill="transparent" />
        {/* the flag it will plant: a dashed ghost on its back, well clear of the flag it stands on */}
        {o.holding && <g>
          <line x1={fx} y1={-96} x2={fx} y2={-10} stroke={o.quiet ? C.dim : C.ink} strokeWidth={5} strokeDasharray="9 6" strokeLinecap="round" />
          <path d={"M " + fx + " -96 L " + (fx - face * 34) + " -85 L " + fx + " -74 Z"} fill="#FFFFFF" stroke={o.quiet ? C.dim : C.ink} strokeWidth={4}
            strokeDasharray="7 4" strokeLinejoin="round" />
        </g>}
        <ellipse cx={-10} cy={-5} rx={10} ry={5} fill={C.ink} />
        <ellipse cx={10} cy={-5} rx={10} ry={5} fill={C.ink} />
        <ellipse cx={0} cy={-28} rx={25} ry={22} fill={o.quiet ? tint(C.accent, 0.55) : "url(#gAccent)"} stroke={shade(C.accent, 0.35)} strokeWidth={2} />
        <path d={"M " + face * 22 + " -33 L " + face * 33 + " -27 L " + face * 22 + " -21 Z"} fill={shade(C.accent, 0.35)} />
        <circle cx={face * 7 - 7} cy={-35} r={7} fill="#FFFFFF" />
        <circle cx={face * 7 + 9} cy={-35} r={7} fill="#FFFFFF" />
        <circle cx={face * 11 - 7} cy={-35} r={3.5} fill={C.ink} />
        <circle cx={face * 11 + 9} cy={-35} r={3.5} fill={C.ink} />
      </g>
    );
  };
  const hopper = () => {
    const ctl = live && s.laid && !winning && !timed;
    const keys = drag.keys("hopper");
    const props: any = ctl ? { ...control("hopper", tx("hopper")), ...drag.bind("hopper"),
      /* once the count is done, Enter passes on to the answer (no keyboard trap) */
      onKeyDown: (e: any) => { if (e.key === "Enter" && arrived) return; keys.onKeyDown(e); } } : { pointerEvents: "none" };
    const holding = timed && !winning;
    /* during a correction the child's hopper stays quiet where the child left it (on the given flag in phases 3
       and 4) and the page's hopper walks the page's hops, planting the flag at the end (it never takes a press) */
    const ghost = !!demo && !free;
    return (
      <g>
        {hopperAt(hx, dir, { key: "own", props, holding, still: hopDrag || keyMoved, quiet: ghost })}
        {ghost && hopperAt(X(demoAt), cDir, { key: "page", props: { pointerEvents: "none" }, still: false, holding: timed && !dFinal })}
      </g>
    );
  };

  /* one invite: in phases 3 and 4 the card (the given duration, the maths) until it is laid, then the a.m. / p.m.
     keys until one is picked (Enter with no label calls the keys at once); in phases 1 and 2 and Free play the
     hopper until its first hop; never during a correction */
  const invite = free ? (made === 0 && !tl.busy ? "hopper" : null)
    : !live || tl.busy || demo ? null
    : timed ? (s.ask ? "half" : !s.laid ? "card" : !s.half ? "half" : null)
    : made === 0 ? "hopper" : null;
  const mainLands = winning ? canon : demo ? canon.slice(0, dShown) : route.slice(0, made);
  const mainFrom = winning || demo ? cFrom : anchor;

  /* the page's hops, drawn over the page's hopper when it stands on a landing (the win, a correction), so the last
     short hop and its leader are never hidden under it; the child's own hops stay under the child's hopper */
  const pageOnTop = winning || !!demo;
  const mainArcs = (
    <g pointerEvents="none">
      {arcs(mainLands, mainFrom, false, pageOnTop ? "page" : "own")}
      {arcLabels(mainLands, mainFrom)}
    </g>
  );
  /* a faint funnel from the day strip's framed stretch down to the ends of the track: the track is that stretch,
     widened (drawn first, so the clock, the card and the keys stand in front of it) */
  const lensY = DT.dy + DT.dh + 7;
  return (
    <g>
      <g pointerEvents="none">
        <path d={"M " + DX(lo).toFixed(1) + " " + lensY + " L " + DT.tx0 + " " + DT.top + " M " + DX(hi).toFixed(1) + " " + lensY + " L " + (DT.tx0 + DT.tw) + " " + DT.top}
          stroke={tint(C.accent, 0.35)} strokeWidth={2.5} strokeDasharray="7 7" fill="none" />
      </g>
      {runs()}
      {clock(clockT)}
      {dayStrip()}
      {lens()}
      {flagPoles()}
      {hourNums()}
      {demo && <g pointerEvents="none">{arcs(route.slice(0, made), anchor, true, "own")}</g>}
      {!pageOnTop && mainArcs}
      {totalBar()}
      {card()}
      {timed && !free && halfKeys()}
      {free && freeCards()}
      {free && backKey(216 + 3 * (FW + 24))}
      {hopper()}
      {pageOnTop && mainArcs}
      {free && flagHandles()}
      {/* the hopper's invite hugs its body, below the pennants, so it never crosses a flag */}
      {invite === "hopper" && <rect className="c4-pulse" x={Math.max(2, Math.min(1000, hx - 42))} y={DT.top - 58} width={84} height={64} rx={30}
        fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" />}
      {invite === "card" && <rect className="c4-pulse" x={CARD.x - 9} y={CARD.y - 9} width={CARD.w + 18} height={CARD.h + 18} rx={22}
        fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" />}
      {invite === "half" && <rect className="c4-pulse" x={HALF.x - 10} y={HALF.y - 10} width={2 * HALF.w + HALF.gap + 20} height={HALF.h + 22} rx={24}
        fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const L = result && result.last;
  if (!L || L.answer === null || L.answer === undefined) return null;
  const a = L.answer, y = h / 2 + 11;
  /* a time: a flag with its pennant in the colour of its half of the day, and the time with its label */
  if (typeof a === "string") {
    const pm = /p\.m\.$/.test(a), text = a.replace(/ ([ap]\.m\.)$/, (_m: string, x: string) => " " + tx(x));
    return (
      <g>
        <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
        <line x1={22} y1={10} x2={22} y2={h - 10} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
        <path d="M 24 11 L 50 19 L 24 27 Z" fill={pm ? DT_AMBER : DT_SKY} stroke={C.ink} strokeWidth={1.5} />
        <text x={w - 14} y={y} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{text}</text>
      </g>
    );
  }
  /* a duration: one green hop and the total, the hours in vermilion and the minutes in deep blue */
  const ps = dtParts(Number(a[0]) * 60 + Number(a[1]), true, tx);
  /* longer words (Hindi, Gujarati): the hours above the minutes, so nothing runs over the hop */
  const one = dtW(ps.map((p: any) => p.t).join(" "), T.label) <= w - 76;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <path d={"M 14 " + (h - 14) + " Q 34 " + (h - 54) + " 54 " + (h - 14)} fill="none" stroke={DT_HOP} strokeWidth={4} strokeLinecap="round" />
      {one ? <text x={w - 14} y={y} textAnchor="end" fontSize={T.label} fontWeight={700}>
        {ps.map((p: any, j: number) => <tspan key={j} fill={shade(p.c, 0.25)}>{(j ? " " : "") + p.t}</tspan>)}
      </text>
        : ps.map((p: any, j: number) => (
          <text key={j} x={w - 14} y={h / 2 + (j ? 27 : -4)} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={shade(p.c, 0.25)}>{p.t}</text>))}
    </g>
  );
}

function DurationTrack(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default DurationTrack;
