/* ═══ M1.S2.T3.C8.2D1 · day_dial · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "day_dial";
const MEDIA_ID = "M1.S2.T3.C8.2D1";
const TOOL_NAME = "Day Dial";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A whole day on one strip, and a clock above it. Which half of the day are you in?"];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Each card in its half, and each label changed on the hop that crossed a post.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. The whole strip and the next day, with the hopper and the cards open.";

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, and the runtime looks each spoken or drawn line up in it.
   Fill it AFTER the English is final and reviewed (`node cli.mjs voice` lists every line still missing),
   then bake the voice. Empty = the tool runs in English only. */
/* chapter 12 glossary (one for all seven tools): hi घंटा/घंटे, मिनट, दिन, दोपहर, आधी रात, घड़ी, सुई, पूर्वाह्न,
   अपराह्न · gu કલાક, મિનિટ, દિવસ, બપોરના 12, મધ્યરાત્રિ, ઘડિયાળ, કાંટો, પૂર્વાહ્ન, અપરાહ્ન. On screen a.m. and p.m.
   stay Latin (keys, cards, tags, asks); spoken sentences use the words. Times keep their digits. */
const TR: any = {
  hi: {
    "Day Dial": "दिन का डायल",
    "A whole day on one strip, and a clock above it. Which half of the day are you in?": "एक पट्टी पर पूरा दिन, और उसके ऊपर एक घड़ी। तुम दिन के किस आधे भाग में हो?",
    "Each card in its half, and each label changed on the hop that crossed a post.": "हर कार्ड अपने आधे भाग में, और हर लेबल उसी छलांग पर बदला जो खंभे के पार गई।",
    "Free play. The whole strip and the next day, with the hopper and the cards open.": "मुक्त खेल। पूरी पट्टी और अगला दिन, छलांग और कार्ड के साथ खुले हैं।",
    /* phase 1 */
    "Twice round in a day": "दिन में दो चक्कर",
    "The posts with a moon are midnight, and the post with the sun is noon.": "चाँद वाले खंभे आधी रात हैं, और सूरज वाला खंभा दोपहर है।",
    "Slide the marker from one midnight to the next, and watch the hour hand.": "मार्कर को एक आधी रात से अगली आधी रात तक खिसकाओ, और घंटे की सुई देखो।",
    "The hour hand comes back to the same place every twelve hours.": "घंटे की सुई हर 12 घंटे में उसी जगह लौट आती है।",
    "Slide to the noon post. Does the clock look the same as at midnight?": "दोपहर वाले खंभे तक खिसकाओ। क्या घड़ी आधी रात जैसी ही दिखती है?",
    "The hour hand goes round twice a day. So a clock showing seven can mean morning or evening.": "घंटे की सुई दिन में दो चक्कर लगाती है। इसलिए घड़ी में 7 बजे का मतलब सुबह या शाम हो सकता है।",
    "You learned: the hour hand goes round twice in a day.": "तुमने सीखा: घंटे की सुई दिन में दो चक्कर लगाती है।",
    "How many hours are there in one day? And how many times does the hour hand go round in that time?": "एक दिन में कितने घंटे होते हैं? और उतने समय में घंटे की सुई कितने चक्कर लगाती है?",
    "One whole day": "पूरा एक दिन",
    "Count the blocks on the strip. Each block is one hour.": "पट्टी के खाने गिनो। हर खाना एक घंटा है।",
    "A wall clock shows seven o'clock. Can you tell from the clock alone whether it is morning or evening?": "दीवार घड़ी में 7 बजे हैं। क्या सिर्फ़ घड़ी देखकर बता सकते हो कि सुबह है या शाम?",
    "Can you tell from the clock?": "क्या घड़ी से पता चलेगा?",
    "Slide the marker on by twelve hours. What does the clock show then?": "मार्कर को 12 घंटे आगे खिसकाओ। तब घड़ी क्या दिखाती है?",
    "Where in the day does the clock show seven? Put a pin on each place.": "दिन में कहाँ कहाँ घड़ी में 7 बजते हैं? हर जगह एक पिन लगाओ।",
    "Pin every 7 o'clock": "हर 7 बजे पर पिन लगाओ",
    "Drag a pin and watch the hour hand. Stop where it points at seven.": "पिन खींचो और घंटे की सुई देखो। जहाँ वह 7 पर हो, वहाँ रुको।",
    "Yes": "हाँ", "No": "नहीं", "yes": "हाँ", "no": "नहीं",
    "hours": "घंटे", "laps": "चक्कर", "lap": "चक्कर", "minutes": "मिनट",
    /* phase 2 */
    "Before noon and after noon": "दोपहर से पहले और दोपहर के बाद",
    "The post with the sun is noon. The sky blue half comes before it, and the amber half after it.": "सूरज वाला खंभा दोपहर है। आसमानी आधा भाग उससे पहले आता है, और नारंगी आधा भाग उसके बाद।",
    "Which half of the strip is that?": "वह पट्टी का कौन सा आधा भाग है?",
    "Think of waking up and of going to bed. Which half holds each one?": "जागने और सोने के बारे में सोचो। हर एक किस आधे भाग में आता है?",
    "From midnight to noon the label is a.m. From noon to midnight it is p.m.": "आधी रात से दोपहर तक लेबल पूर्वाह्न है। दोपहर से आधी रात तक अपराह्न है।",
    "You learned: midnight to noon is a.m., and noon to midnight is p.m.": "तुमने सीखा: आधी रात से दोपहर तक पूर्वाह्न, दोपहर से आधी रात तक अपराह्न।",
    "A child wakes up at 6:10 and eats lunch at 1:15. Drop each card in its half of the day, and read its label.": "एक बच्चा 6 बजकर 10 मिनट पर जागता है। वह 1 बजकर 15 मिनट पर दोपहर का खाना खाता है। हर कार्ड को दिन के उसके आधे भाग में रखो, और उसका लेबल पढ़ो।",
    "Each card: a.m. or p.m.?": "हर कार्ड: a.m. या p.m.?",
    "Does each one happen before noon or after noon?": "हर काम दोपहर से पहले होता है या दोपहर के बाद?",
    "A shop opens at half past ten in the morning. Give its card a label the same way.": "एक दुकान सुबह साढ़े दस बजे खुलती है। उसके कार्ड को भी इसी तरह लेबल दो।",
    "Shop opens: a.m. or p.m.?": "दुकान खुलना: a.m. या p.m.?",
    "Where does the morning sit on the strip, in the sky blue or the amber?": "सुबह पट्टी पर कहाँ है, आसमानी में या नारंगी में?",
    "A family eats dinner at 8:35 in the evening. Where does this card go?": "एक परिवार शाम 8 बजकर 35 मिनट पर रात का खाना खाता है। यह कार्ड कहाँ जाएगा?",
    "Dinner: a.m. or p.m.?": "रात का खाना: a.m. या p.m.?",
    "The evening comes late in the day. Is that before the noon post or after it?": "शाम दिन में देर से आती है। वह दोपहर वाले खंभे से पहले है या बाद में?",
    "cards": "कार्ड",
    /* phase 3 */
    "Counting past noon": "दोपहर के पार गिनती",
    "The post with the sun is the noon post.": "सूरज वाला खंभा दोपहर का खंभा है।",
    "Hop one hour at a time. What happens to the label when you pass it?": "एक बार में एक घंटे की छलांग लगाओ। उसे पार करने पर लेबल का क्या होता है?",
    "It went from 11:40 a.m., over the noon post, to 12:40 p.m.": "पहले यह पूर्वाह्न 11 बजकर 40 मिनट पर था। दोपहर वाले खंभे के पार यह अपराह्न 12 बजकर 40 मिनट पर उतरा।",
    "Which hop crosses the noon post?": "कौन सी छलांग दोपहर वाले खंभे के पार जाती है?",
    "Picture one hop from an hour before noon. Which label does it land on?": "दोपहर से एक घंटा पहले से एक छलांग सोचो। वह किस लेबल पर उतरती है?",
    "Count on past 12 noon, and the label turns to p.m. Count back past noon, and it turns to a.m.": "दोपहर 12 बजे के आगे गिनो, तो लेबल अपराह्न हो जाता है। दोपहर के पीछे गिनो, तो पूर्वाह्न हो जाता है।",
    "You learned: a count that crosses 12 noon changes the label.": "तुमने सीखा: दोपहर 12 बजे को पार करने वाली गिनती लेबल बदल देती है।",
    "What time is six hours after 8:25 a.m.?": "पूर्वाह्न 8 बजकर 25 मिनट के 6 घंटे बाद क्या समय होगा?",
    "6 hours after 8:25 a.m.?": "8:25 a.m. के 6 घंटे बाद?",
    "Where does the count start, and which way does it go?": "गिनती कहाँ से शुरू होती है, और किस ओर जाती है?",
    "What time is four hours before 2:35 p.m.?": "अपराह्न 2 बजकर 35 मिनट से 4 घंटे पहले क्या समय था?",
    "4 hours before 2:35 p.m.?": "2:35 p.m. से 4 घंटे पहले?",
    "This count goes back. Where does it land after two hops?": "यह गिनती पीछे जाती है। दो छलांगों के बाद वह कहाँ पहुँचती है?",
    "Three hours after 11:30 a.m., a child writes 2:30 a.m. What is the right time?": "पूर्वाह्न 11 बजकर 30 मिनट के 3 घंटे बाद का समय, एक बच्चा पूर्वाह्न 2 बजकर 30 मिनट लिखता है। सही समय क्या है?",
    "3 hours after 11:30 a.m.?": "11:30 a.m. के 3 घंटे बाद?",
    "Count the three hops one at a time. Where does each one land?": "तीनों छलांगें एक एक करके गिनो। हर एक कहाँ उतरती है?",
    /* phase 4 */
    "Just after midnight": "आधी रात के ठीक बाद",
    "The posts with a moon are the midnight posts.": "चाँद वाले खंभे आधी रात के खंभे हैं।",
    "Hop past midnight, and read the label where you land.": "आधी रात के पार छलांग लगाओ, और जहाँ उतरो वहाँ का लेबल पढ़ो।",
    "It went from 11:50 p.m., over the midnight post, to 12:50 a.m.": "पहले यह अपराह्न 11 बजकर 50 मिनट पर था। आधी रात वाले खंभे के पार यह पूर्वाह्न 12 बजकर 50 मिनट पर उतरा।",
    "What label do the times just after midnight carry?": "आधी रात के ठीक बाद के समय पर कौन सा लेबल होता है?",
    "Picture one hop from an hour before midnight. What does the tag say?": "आधी रात से एक घंटा पहले से एक छलांग सोचो। टैग क्या कहता है?",
    "Count on past 12 midnight, and the label turns to a.m. The time moves into the next day.": "आधी रात 12 बजे के आगे गिनो, तो लेबल पूर्वाह्न हो जाता है। समय अगले दिन में चला जाता है।",
    "You learned: just after midnight is a.m., at the start of a new day.": "तुमने सीखा: आधी रात के ठीक बाद पूर्वाह्न, नए दिन की शुरुआत में।",
    "What time is two hours after 11:35 p.m.?": "अपराह्न 11 बजकर 35 मिनट के 2 घंटे बाद क्या समय होगा?",
    "2 hours after 11:35 p.m.?": "11:35 p.m. के 2 घंटे बाद?",
    "Which post does the count cross?": "गिनती कौन सा खंभा पार करती है?",
    "Just after noon, or just after midnight: when is 12:25 a.m.?": "पूर्वाह्न 12 बजकर 25 मिनट कब होता है? दोपहर के ठीक बाद, या आधी रात के ठीक बाद?",
    "When is 12:25 a.m.?": "12:25 a.m. कब है?",
    "Where on the strip does the sky blue half start?": "पट्टी पर आसमानी आधा भाग कहाँ से शुरू होता है?",
    "just after noon": "दोपहर के ठीक बाद", "just after midnight": "आधी रात के ठीक बाद",
    "noon": "दोपहर", "midnight": "आधी रात",
    "What time is one hour before 12:40 a.m.?": "पूर्वाह्न 12 बजकर 40 मिनट से 1 घंटा पहले क्या समय था?",
    "1 hour before 12:40 a.m.?": "12:40 a.m. से 1 घंटा पहले?",
    "One hop back goes over a midnight post. Which label is on the other side?": "पीछे की एक छलांग आधी रात वाले खंभे के पार जाती है। दूसरी ओर कौन सा लेबल है?",
    /* the tool's own spoken lines (Work) */
    "Tap a label key as well.": "एक लेबल बटन भी दबाओ।",
    "Drag a pin onto the strip first.": "पहले एक पिन पट्टी पर खींचो।",
    "Put every card in its half of the day first.": "पहले हर कार्ड को दिन के उसके आधे भाग में रखो।",
    "Move a pin first.": "पहले एक पिन हिलाओ।",
    "Move a card first.": "पहले एक कार्ड हिलाओ।",
    "Change the time or its label first.": "पहले समय या उसका लेबल बदलो।",
    "Two laps of twelve hours.": "12 घंटे के दो चक्कर।",
    "It is 2:30 p.m.": "यह अपराह्न 2 बजकर 30 मिनट है।",
    /* what the working area and the summary draw */
    "day": "दिन", "today": "आज", "next day": "अगला दिन", "day before": "पिछला दिन",
    "hour hand": "घंटे की सुई", "1 hour": "1 घंटा",
    "12 noon": "दोपहर 12", "12 midnight": "आधी रात 12",
  },
  gu: {
    "Day Dial": "દિવસનું ડાયલ",
    "A whole day on one strip, and a clock above it. Which half of the day are you in?": "એક પટ્ટી પર આખો દિવસ, અને તેની ઉપર એક ઘડિયાળ. તમે દિવસના કયા અડધા ભાગમાં છો?",
    "Each card in its half, and each label changed on the hop that crossed a post.": "દરેક કાર્ડ પોતાના અડધા ભાગમાં, અને દરેક લેબલ થાંભલો પાર કરતા કૂદકે બદલાયું.",
    "Free play. The whole strip and the next day, with the hopper and the cards open.": "મુક્ત રમત. આખી પટ્ટી અને બીજો દિવસ, કૂદકા અને કાર્ડ સાથે ખુલ્લાં છે.",
    /* phase 1 */
    "Twice round in a day": "દિવસમાં બે ચક્કર",
    "The posts with a moon are midnight, and the post with the sun is noon.": "ચંદ્રવાળા થાંભલા મધ્યરાત્રિ છે, અને સૂરજવાળો થાંભલો બપોરના 12 છે.",
    "Slide the marker from one midnight to the next, and watch the hour hand.": "માર્કરને એક મધ્યરાત્રિથી બીજી મધ્યરાત્રિ સુધી ખસેડો, અને કલાકનો કાંટો જુઓ.",
    "The hour hand comes back to the same place every twelve hours.": "કલાકનો કાંટો દર 12 કલાકે એ જ જગ્યાએ પાછો આવે છે.",
    "Slide to the noon post. Does the clock look the same as at midnight?": "બપોરના 12 ના થાંભલા સુધી ખસેડો. શું ઘડિયાળ મધ્યરાત્રિ જેવી જ દેખાય છે?",
    "The hour hand goes round twice a day. So a clock showing seven can mean morning or evening.": "કલાકનો કાંટો દિવસમાં બે ચક્કર ફરે છે. તેથી ઘડિયાળમાં 7 વાગ્યા એટલે સવાર કે સાંજ હોઈ શકે.",
    "You learned: the hour hand goes round twice in a day.": "તમે શીખ્યા: કલાકનો કાંટો દિવસમાં બે ચક્કર ફરે છે.",
    "How many hours are there in one day? And how many times does the hour hand go round in that time?": "એક દિવસમાં કેટલા કલાક હોય છે? અને એટલા સમયમાં કલાકનો કાંટો કેટલા ચક્કર ફરે છે?",
    "One whole day": "એક આખો દિવસ",
    "Count the blocks on the strip. Each block is one hour.": "પટ્ટીનાં ખાનાં ગણો. દરેક ખાનું એક કલાક છે.",
    "A wall clock shows seven o'clock. Can you tell from the clock alone whether it is morning or evening?": "દીવાલ ઘડિયાળમાં 7 વાગ્યા છે. શું ફક્ત ઘડિયાળ જોઈને કહી શકો કે સવાર છે કે સાંજ?",
    "Can you tell from the clock?": "ઘડિયાળથી કહી શકાય?",
    "Slide the marker on by twelve hours. What does the clock show then?": "માર્કરને 12 કલાક આગળ ખસેડો. ત્યારે ઘડિયાળ શું બતાવે છે?",
    "Where in the day does the clock show seven? Put a pin on each place.": "દિવસમાં ક્યાં ક્યાં ઘડિયાળમાં 7 વાગે છે? દરેક જગ્યાએ એક પિન મૂકો.",
    "Pin every 7 o'clock": "દરેક 7 વાગ્યે પિન મૂકો",
    "Drag a pin and watch the hour hand. Stop where it points at seven.": "પિન ખેંચો અને કલાકનો કાંટો જુઓ. જ્યાં તે 7 પર આવે ત્યાં અટકો.",
    "Yes": "હા", "No": "ના", "yes": "હા", "no": "ના",
    "hours": "કલાક", "laps": "ચક્કર", "lap": "ચક્કર", "minutes": "મિનિટ",
    /* phase 2 */
    "Before noon and after noon": "બપોરના 12 પહેલાં અને પછી",
    "The post with the sun is noon. The sky blue half comes before it, and the amber half after it.": "સૂરજવાળો થાંભલો બપોરના 12 છે. આસમાની અડધો ભાગ તેની પહેલાં આવે છે, અને નારંગી અડધો ભાગ તેની પછી.",
    "Which half of the strip is that?": "તે પટ્ટીનો કયો અડધો ભાગ છે?",
    "Think of waking up and of going to bed. Which half holds each one?": "જાગવા અને સૂવા વિશે વિચારો. દરેક કયા અડધા ભાગમાં આવે છે?",
    "From midnight to noon the label is a.m. From noon to midnight it is p.m.": "મધ્યરાત્રિથી બપોરના 12 સુધી લેબલ પૂર્વાહ્ન છે. બપોરના 12 થી મધ્યરાત્રિ સુધી અપરાહ્ન છે.",
    "You learned: midnight to noon is a.m., and noon to midnight is p.m.": "તમે શીખ્યા: મધ્યરાત્રિથી બપોરના 12 સુધી પૂર્વાહ્ન, પછી અપરાહ્ન.",
    "A child wakes up at 6:10 and eats lunch at 1:15. Drop each card in its half of the day, and read its label.": "એક બાળક 6 વાગીને 10 મિનિટે જાગે છે. તે 1 વાગીને 15 મિનિટે બપોરનું જમણ જમે છે. દરેક કાર્ડને દિવસના તેના અડધા ભાગમાં મૂકો, અને તેનું લેબલ વાંચો.",
    "Each card: a.m. or p.m.?": "દરેક કાર્ડ: a.m. કે p.m.?",
    "Does each one happen before noon or after noon?": "દરેક કામ બપોરના 12 પહેલાં થાય છે કે પછી?",
    "A shop opens at half past ten in the morning. Give its card a label the same way.": "એક દુકાન સવારે સાડા દસ વાગ્યે ખૂલે છે. તેના કાર્ડને પણ એ જ રીતે લેબલ આપો.",
    "Shop opens: a.m. or p.m.?": "દુકાન ખૂલે: a.m. કે p.m.?",
    "Where does the morning sit on the strip, in the sky blue or the amber?": "સવાર પટ્ટી પર ક્યાં છે, આસમાનીમાં કે નારંગીમાં?",
    "A family eats dinner at 8:35 in the evening. Where does this card go?": "એક પરિવાર સાંજે 8 વાગીને 35 મિનિટે રાતનું જમણ જમે છે. આ કાર્ડ ક્યાં જશે?",
    "Dinner: a.m. or p.m.?": "રાતનું જમણ: a.m. કે p.m.?",
    "The evening comes late in the day. Is that before the noon post or after it?": "સાંજ દિવસમાં મોડી આવે છે. તે બપોરના 12 ના થાંભલાની પહેલાં છે કે પછી?",
    "cards": "કાર્ડ",
    /* phase 3 */
    "Counting past noon": "બપોરના 12 પછી ગણતરી",
    "The post with the sun is the noon post.": "સૂરજવાળો થાંભલો બપોરના 12 નો થાંભલો છે.",
    "Hop one hour at a time. What happens to the label when you pass it?": "એક વખતમાં એક કલાકનો કૂદકો મારો. તેને પાર કરો ત્યારે લેબલનું શું થાય છે?",
    "It went from 11:40 a.m., over the noon post, to 12:40 p.m.": "પહેલાં તે પૂર્વાહ્ન 11 વાગીને 40 મિનિટ પર હતું. બપોરના 12 નો થાંભલો પાર કરીને તે અપરાહ્ન 12 વાગીને 40 મિનિટ પર ઊતર્યું.",
    "Which hop crosses the noon post?": "કયો કૂદકો બપોરના 12 નો થાંભલો પાર કરે છે?",
    "Picture one hop from an hour before noon. Which label does it land on?": "બપોરના 12 થી એક કલાક પહેલાંથી એક કૂદકો કલ્પો. તે કયા લેબલ પર ઊતરે છે?",
    "Count on past 12 noon, and the label turns to p.m. Count back past noon, and it turns to a.m.": "બપોરના 12 પછી આગળ ગણો, તો લેબલ અપરાહ્ન થઈ જાય છે. બપોરના 12 થી પાછળ ગણો, તો પૂર્વાહ્ન થઈ જાય છે.",
    "You learned: a count that crosses 12 noon changes the label.": "તમે શીખ્યા: બપોરના 12 ને પાર કરતી ગણતરી લેબલ બદલી દે છે.",
    "What time is six hours after 8:25 a.m.?": "પૂર્વાહ્ન 8 વાગીને 25 મિનિટ પછી 6 કલાકે કેટલા વાગ્યા હશે?",
    "6 hours after 8:25 a.m.?": "8:25 a.m. પછી 6 કલાકે?",
    "Where does the count start, and which way does it go?": "ગણતરી ક્યાંથી શરૂ થાય છે, અને કઈ બાજુ જાય છે?",
    "What time is four hours before 2:35 p.m.?": "અપરાહ્ન 2 વાગીને 35 મિનિટથી 4 કલાક પહેલાં કેટલા વાગ્યા હતા?",
    "4 hours before 2:35 p.m.?": "2:35 p.m. થી 4 કલાક પહેલાં?",
    "This count goes back. Where does it land after two hops?": "આ ગણતરી પાછળ જાય છે. બે કૂદકા પછી તે ક્યાં પહોંચે છે?",
    "Three hours after 11:30 a.m., a child writes 2:30 a.m. What is the right time?": "પૂર્વાહ્ન 11 વાગીને 30 મિનિટ પછી 3 કલાકનો સમય, એક બાળક પૂર્વાહ્ન 2 વાગીને 30 મિનિટ લખે છે. સાચો સમય કયો છે?",
    "3 hours after 11:30 a.m.?": "11:30 a.m. પછી 3 કલાકે?",
    "Count the three hops one at a time. Where does each one land?": "ત્રણે કૂદકા એક પછી એક ગણો. દરેક ક્યાં ઊતરે છે?",
    /* phase 4 */
    "Just after midnight": "મધ્યરાત્રિ પછી તરત",
    "The posts with a moon are the midnight posts.": "ચંદ્રવાળા થાંભલા મધ્યરાત્રિના થાંભલા છે.",
    "Hop past midnight, and read the label where you land.": "મધ્યરાત્રિ પાર કૂદકો મારો, અને જ્યાં ઊતરો ત્યાંનું લેબલ વાંચો.",
    "It went from 11:50 p.m., over the midnight post, to 12:50 a.m.": "પહેલાં તે અપરાહ્ન 11 વાગીને 50 મિનિટ પર હતું. મધ્યરાત્રિનો થાંભલો પાર કરીને તે પૂર્વાહ્ન 12 વાગીને 50 મિનિટ પર ઊતર્યું.",
    "What label do the times just after midnight carry?": "મધ્યરાત્રિ પછી તરતના સમય પર કયું લેબલ હોય છે?",
    "Picture one hop from an hour before midnight. What does the tag say?": "મધ્યરાત્રિથી એક કલાક પહેલાંથી એક કૂદકો કલ્પો. ટેગ શું કહે છે?",
    "Count on past 12 midnight, and the label turns to a.m. The time moves into the next day.": "મધ્યરાત્રિના 12 પછી આગળ ગણો, તો લેબલ પૂર્વાહ્ન થઈ જાય છે. સમય બીજા દિવસમાં જાય છે.",
    "You learned: just after midnight is a.m., at the start of a new day.": "તમે શીખ્યા: મધ્યરાત્રિ પછી તરત પૂર્વાહ્ન, નવા દિવસની શરૂઆતમાં.",
    "What time is two hours after 11:35 p.m.?": "અપરાહ્ન 11 વાગીને 35 મિનિટ પછી 2 કલાકે કેટલા વાગ્યા હશે?",
    "2 hours after 11:35 p.m.?": "11:35 p.m. પછી 2 કલાકે?",
    "Which post does the count cross?": "ગણતરી કયો થાંભલો પાર કરે છે?",
    "Just after noon, or just after midnight: when is 12:25 a.m.?": "પૂર્વાહ્ન 12 વાગીને 25 મિનિટ ક્યારે હોય છે? બપોરના 12 પછી તરત, કે મધ્યરાત્રિ પછી તરત?",
    "When is 12:25 a.m.?": "12:25 a.m. ક્યારે છે?",
    "Where on the strip does the sky blue half start?": "પટ્ટી પર આસમાની અડધો ભાગ ક્યાંથી શરૂ થાય છે?",
    "just after noon": "બપોરના 12 પછી તરત", "just after midnight": "મધ્યરાત્રિ પછી તરત",
    "noon": "બપોર", "midnight": "મધ્યરાત્રિ",
    "What time is one hour before 12:40 a.m.?": "પૂર્વાહ્ન 12 વાગીને 40 મિનિટથી 1 કલાક પહેલાં કેટલા વાગ્યા હતા?",
    "1 hour before 12:40 a.m.?": "12:40 a.m. થી 1 કલાક પહેલાં?",
    "One hop back goes over a midnight post. Which label is on the other side?": "પાછળનો એક કૂદકો મધ્યરાત્રિનો થાંભલો પાર કરે છે. બીજી બાજુ કયું લેબલ છે?",
    /* the tool's own spoken lines (Work) */
    "Tap a label key as well.": "એક લેબલ બટન પણ દબાવો.",
    "Drag a pin onto the strip first.": "પહેલાં એક પિન પટ્ટી પર ખેંચો.",
    "Put every card in its half of the day first.": "પહેલાં દરેક કાર્ડને દિવસના તેના અડધા ભાગમાં મૂકો.",
    "Move a pin first.": "પહેલાં એક પિન ખસેડો.",
    "Move a card first.": "પહેલાં એક કાર્ડ ખસેડો.",
    "Change the time or its label first.": "પહેલાં સમય કે તેનું લેબલ બદલો.",
    "Two laps of twelve hours.": "12 કલાકના બે ચક્કર.",
    "It is 2:30 p.m.": "આ અપરાહ્ન 2 વાગીને 30 મિનિટ છે.",
    /* what the working area and the summary draw */
    "day": "દિવસ", "today": "આજે", "next day": "બીજો દિવસ", "day before": "આગલો દિવસ",
    "hour hand": "કલાકનો કાંટો", "1 hour": "1 કલાક",
    "12 noon": "બપોરના 12", "12 midnight": "મધ્યરાત્રિ 12",
  },
};

/* ── Day Dial: geometry, colours and times (working-area units; a time is minutes from today's midnight) ── */
/* 24 hours of 43 from x 27 to 1059: a pin head (38 across) on either midnight post stays on the working area */
const DD = { hour: 43, sx: 27, sw: 1032, sy: 340, sh: 76, cx: 126, cy: 124, cr: 116, tagY: 250, headY: 322 };
const DD_SKY = "#56B4E9", DD_AMBER = "#E69F00", DD_VERM = "#D55E00", DD_DEEP = "#0072B2", DD_GREEN = "#009E73";
/* yellow is the sun's alone (this chapter keeps yellow for leftover days): a lit post or place is a near-black ring */
const DD_NEAR = "#2B2B2B", DD_SUN = "#F0E442", DD_MOON = "#8E9AA6", DD_PALE = "#A9B1B7", DD_PALE_INK = "#7A848D";
const DD_SKY_INK = shade(DD_SKY, 0.45), DD_AMBER_INK = shade(DD_AMBER, 0.45);
/* a time answer: hours and minutes in the slot's two boxes; its label (a.m. or p.m.) on the working area */
const DD_HM = [{ label: "hours" }, { label: "minutes" }];
/* the day cards: the true time of each, and the face the card shows (no label) */
const DD_CARDS: any = { wake: { at: 370, face: "6:10" }, lunch: { at: 795, face: "1:15" }, shop: { at: 630, face: "10:30" }, dinner: { at: 1235, face: "8:35" } };
const DD_CARD_IDS = ["wake", "lunch", "shop", "dinner"];
const DD_CARD_NAME: any = { wake: "wake up card", lunch: "lunch card", shop: "shop card", dinner: "dinner card" };

const ddHalfOf = (t: number) => ((((Math.round(t) % 1440) + 1440) % 1440) < 720 ? "am" : "pm");
/* a time as the book writes it, in two pieces: ["8:25", "a.m."] · ["7", "p.m."] · ["12", "noon"] · ["12", "midnight"] */
function ddSplit(t: number): string[] {
  const d = ((Math.round(t) % 1440) + 1440) % 1440, h = Math.floor(d / 60), m = d % 60;
  if (m === 0 && h === 12) return ["12", "noon"];
  if (m === 0 && h === 0) return ["12", "midnight"];
  return [(h % 12 || 12) + (m ? ":" + (m < 10 ? "0" : "") + m : ""), h < 12 ? "a.m." : "p.m."];
}
const ddFmt = (t: number) => ddSplit(t).join(" ");
/* every written time in a value, in order, as minutes of the day ("6:10 a.m., 1:15 p.m." -> [370, 795]);
   a time no clock can show reads NaN, so it never matches */
function ddTimes(v: any): number[] {
  const s = Array.isArray(v) ? (v.length >= 3 ? v[0] + ":" + v[1] + " " + v[2] : v.join(" ")) : String(v ?? "");
  const out: number[] = [];
  const re = /(\d{1,2})(?::(\d{1,2}))?\s*(a\.?\s?m\b\.?|p\.?\s?m\b\.?|noon|midnight)/gi;
  let k: any;
  while ((k = re.exec(s))) {
    const h = Number(k[1]), m = k[2] === undefined ? 0 : Number(k[2]), w = k[3].toLowerCase();
    if (!(h >= 1 && h <= 12 && m < 60)) { out.push(NaN); continue; }
    if (w === "noon") out.push(h === 12 && m === 0 ? 720 : NaN);
    else if (w === "midnight") out.push(h === 12 && m === 0 ? 0 : NaN);
    else out.push((h % 12) * 60 + m + (w[0] === "p" ? 720 : 0));
  }
  return out;
}
const ddLabelOf = (v: any) => { const s = Array.isArray(v) ? v.join(" ") : String(v ?? ""); return /p\.?\s?m\b/i.test(s) ? "pm" : /a\.?\s?m\b/i.test(s) ? "am" : null; };
/* a rough ink width for Poppins, to size a tag */
function ddTextW(s: string, size: number): number {
  let w = 0;
  for (const ch of String(s)) w += /[0-9]/.test(ch) ? 0.62 : ch === ":" || ch === "." ? 0.3 : ch === " " ? 0.28 : /[mw]/.test(ch) ? 0.9 : /[ilj]/.test(ch) ? 0.27 : /[ft]/.test(ch) ? 0.4 : 0.6;
  return w * size;
}
const ddCardT = (id: string, half: string, day: number) => day * 1440 + (DD_CARDS[id].at % 720) + (half === "pm" ? 720 : 0);

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
    concept: "Twice round in a day",
    conceptId: "M1.S2.T3.C8", objectiveIds: ["O3"],
    /* the plan's teach line asked the lap question that question 1 then asks: the teach now only sets the slide */
    says: ["The posts with a moon are midnight, and the post with the sun is noon.", "Slide the marker from one midnight to the next, and watch the hour hand."],
    /* tries, as the plan writes it: A miss is answered three ways at once and none of them is the answer. First rung, from the item's own miss line: how many hours are there in one day? Second rung, the phase's: how many hours does one lap of the hour hand take? Third rung: the strip is cut to its morning half, from midnight to noon, and the child counts the laps on it before the whole day comes back. The pad stays open behind all three rungs.
       The runtime keeps one ladder a phase (no rung of an item's own), so both rungs serve all three questions:
       the laps, "can you tell", and the two sevens all turn on the hand coming back every twelve hours. */
    ladder: ["The hour hand comes back to the same place every twelve hours.", "Slide to the noon post. Does the clock look the same as at midnight?"],
    closing: "The hour hand goes round twice a day. So a clock showing seven can mean morning or evening.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: the hour hand goes round twice in a day.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The marker runs the whole strip: the lap counter reads 1 lap at the noon post and 2 laps at the next midnight, and a bracket under the strip reads 24 hours. For the seven o'clock questions the hand is set at seven and both places light, one in each half.",
    items: [
      /* practice 1: answer in the plan = Twenty-four hours, and the hour hand goes round twice. Two boxes: hours, laps */
      { qid: "M1.S2.T3.C8:1", kind: "laps", parts: [{ label: "hours" }, { label: "laps" }], answer: [24, 2], winMs: 4400,
        say: "How many hours are there in one day? And how many times does the hour hand go round in that time?",
        ask: "One whole day", miss: "Count the blocks on the strip. Each block is one hour." },
      /* learn ML1: answer in the plan = No. The hour hand goes round twice a day, so the clock shows seven o'clock once in the morning and once in the evening */
      { qid: "M1.S2.T3.C8:ML1", kind: "same", choices: [{ id: "yes", label: "Yes" }, { id: "no", label: "No" }], answer: "no", winMs: 2800,
        say: "A wall clock shows seven o'clock. Can you tell from the clock alone whether it is morning or evening?",
        ask: "Can you tell from the clock?", miss: "Slide the marker on by twelve hours. What does the clock show then?" },
      /* authored (the plan has two questions here): the brief's "finds the two places on the strip where the
         clock shows the same time", as an act. Two pins, dragged to where the hour hand points at seven */
      { qid: null, kind: "pins", pad: "enter", hour: 7, answer: "7 a.m. and 7 p.m.", winMs: 3000,
        say: "Where in the day does the clock show seven? Put a pin on each place.",
        ask: "Pin every 7 o'clock", miss: "Drag a pin and watch the hour hand. Stop where it points at seven." },
    ],
  },
  {
    n: 2,
    concept: "Before noon and after noon",
    conceptId: "M1.S2.T3.C9", objectiveIds: ["O3"],
    /* the plan's teach line was question 1's miss word for word: the teach now names the two halves */
    says: ["The post with the sun is noon. The sky blue half comes before it, and the amber half after it."],
    /* tries, as the plan writes it: First rung, from the item: does this happen before noon or after noon? Second rung, the phase's: which half of the strip is that? Third rung: the tray is cut to two cards, one plainly in the morning and one plainly at night, before the rest come back. The a.m. and p.m. keys stay open. */
    ladder: ["Which half of the strip is that?", "Think of waking up and of going to bed. Which half holds each one?"],
    closing: "From midnight to noon the label is a.m. From noon to midnight it is p.m.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: midnight to noon is a.m., and noon to midnight is p.m.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The child's card stays where it was put; a pale card lights at the same time in the right half, carrying its label, so the same clock time shows in both halves.",
    items: [
      /* learn ML2: answer in the plan = 6:10 a.m. and 1:15 p.m. Each card dropped in its half writes its label */
      { qid: "M1.S2.T3.C9:ML2", kind: "cards", pad: "enter", cards: ["wake", "lunch"], answer: "6:10 a.m., 1:15 p.m.", near: "6:10 a.m., 1:15 a.m.", winMs: 2200,
        say: "A child wakes up at 6:10 and eats lunch at 1:15. Drop each card in its half of the day, and read its label.",
        ask: "Each card: a.m. or p.m.?", miss: "Does each one happen before noon or after noon?" },
      /* practice 2: answer in the plan = 10:30 a.m. */
      { qid: "M1.S2.T3.C9:2", kind: "cards", pad: "enter", cards: ["shop"], answer: "10:30 a.m.", near: "10:30 p.m.", winMs: 2000,
        say: "A shop opens at half past ten in the morning. Give its card a label the same way.",
        ask: "Shop opens: a.m. or p.m.?", miss: "Where does the morning sit on the strip, in the sky blue or the amber?" },
      /* practice 3: answer in the plan = 8:35 p.m. */
      { qid: "M1.S2.T3.C9:3", kind: "cards", pad: "enter", cards: ["dinner"], answer: "8:35 p.m.", near: "8:35 a.m.", winMs: 2000,
        say: "A family eats dinner at 8:35 in the evening. Where does this card go?",
        ask: "Dinner: a.m. or p.m.?", miss: "The evening comes late in the day. Is that before the noon post or after it?" },
    ],
  },
  {
    n: 3,
    concept: "Counting past noon",
    conceptId: "M1.S2.T3.C10", objectiveIds: ["O4"],
    says: ["The post with the sun is the noon post.", "Hop one hour at a time. What happens to the label when you pass it?"],
    /* the child's one act before the questions: tap the hopper and watch the label turn over at the noon post */
    demo: { start: 640, hops: 3, step: 1 },
    /* the runtime cuts a spoken line at the full stop of "a.m. " (pieces), so a.m. and p.m. only ever end a sentence
       or stand before a comma in this tool's spoken lines */
    /* the demo line says what the child just saw (the two landings around the post); the closing keeps the rule */
    demoLines: ["It went from 11:40 a.m., over the noon post, to 12:40 p.m."],
    /* tries, as the plan writes it: First rung, from the item: where does the count start, and which way does it go? Second rung, the phase's: which hop crosses the noon post? Third rung: the count is cut to one hop that crosses noon, from an hour before it, before the longer count comes back. The pad and the label keys stay open.
       (a question has no hopper of its own, predict first: so the third rung asks the child to picture the hop) */
    ladder: ["Which hop crosses the noon post?", "Picture one hop from an hour before noon. Which label does it land on?"],
    closing: "Count on past 12 noon, and the label turns to p.m. Count back past noon, and it turns to a.m.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: a count that crosses 12 noon changes the label.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The hopper runs the count again one hour at a time from the start; the noon post lights on the hop that crosses it, a pale pin marks the child's time, and the tag ends on the right time.",
    items: [
      /* learn ML3: answer in the plan = 2:25 p.m. Hours and minutes in the slot, the label on the working area */
      { qid: "M1.S2.T3.C10:ML3", kind: "count", parts: DD_HM, start: 505, step: 1, hops: 6, answer: "2:25 p.m.", near: "2:25 a.m.", winMs: 4600,
        say: "What time is six hours after 8:25 a.m.?", ask: "6 hours after 8:25 a.m.?", miss: "Where does the count start, and which way does it go?" },
      /* practice 4 (1:50 p.m.) is left out: exactly three a phase, and practice 7 asks the same forward count as a mistake to mend */
      /* practice 5: answer in the plan = 10:35 a.m., because counting back past 12 noon changes p.m. to a.m. */
      { qid: "M1.S2.T3.C10:5", kind: "count", parts: DD_HM, start: 875, step: -1, hops: 4, answer: "10:35 a.m.", near: "10:35 p.m.", winMs: 3600,
        say: "What time is four hours before 2:35 p.m.?", ask: "4 hours before 2:35 p.m.?", miss: "This count goes back. Where does it land after two hops?" },
      /* practice 7: answer in the plan = 2:30 p.m. The count passed 12 noon, so the label should have changed from a.m. to p.m.
         (the time is typed; "what went wrong" is said in the win line) */
      { qid: "M1.S2.T3.C10:7", kind: "count", parts: DD_HM, start: 690, step: 1, hops: 3, answer: "2:30 p.m.", near: "2:30 a.m.", winMs: 5600,
        say: "Three hours after 11:30 a.m., a child writes 2:30 a.m. What is the right time?", ask: "3 hours after 11:30 a.m.?", miss: "Count the three hops one at a time. Where does each one land?" },
    ],
  },
  {
    n: 4,
    concept: "Just after midnight",
    conceptId: "M1.S2.T3.C11", objectiveIds: ["O4"],
    /* the plan's teach line asked practice 6's question: the teach now sets the hop over midnight */
    says: ["The posts with a moon are the midnight posts.", "Hop past midnight, and read the label where you land."],
    demo: { start: 1370, hops: 2, step: 1 },
    demoLines: ["It went from 11:50 p.m., over the midnight post, to 12:50 a.m."],
    /* tries, as the plan writes it: First rung, from the item: which post does the count cross? Second rung, the phase's: what label do the times just after midnight carry? Third rung: the count is cut to one hop from an hour before midnight, before the longer count comes back. The pad and the label keys stay open. */
    ladder: ["What label do the times just after midnight carry?", "Picture one hop from an hour before midnight. What does the tag say?"],
    closing: "Count on past 12 midnight, and the label turns to a.m. The time moves into the next day.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: just after midnight is a.m., at the start of a new day.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The hopper runs the count again; the midnight post lights, the next day's strip (or the day before's) slides in, the day counter changes, a pale pin marks the child's time, and the tag ends on the right time.",
    items: [
      /* learn ML4: answer in the plan = 1:35 a.m. on the next day */
      { qid: "M1.S2.T3.C11:ML4", kind: "count", parts: DD_HM, start: 1415, step: 1, hops: 2, answer: "1:35 a.m.", near: "1:35 p.m.", winMs: 3400,
        say: "What time is two hours after 11:35 p.m.?", ask: "2 hours after 11:35 p.m.?", miss: "Which post does the count cross?" },
      /* practice 6: answer in the plan = Just after midnight. It is twenty-five minutes into a new day */
      { qid: "M1.S2.T3.C11:6", kind: "after", at: 25, choices: [{ id: "noon", label: "just after noon" }, { id: "midnight", label: "just after midnight" }], answer: "midnight", winMs: 2600,
        say: "Just after noon, or just after midnight: when is 12:25 a.m.?", ask: "When is 12:25 a.m.?", miss: "Where on the strip does the sky blue half start?" },
      /* practice 8: answer in the plan = 11:40 p.m. on the day before, because counting back past midnight changes a.m. to p.m. */
      { qid: "M1.S2.T3.C11:8", kind: "count", parts: DD_HM, start: 40, step: -1, hops: 1, answer: "11:40 p.m.", near: "11:40 a.m.", winMs: 3000,
        say: "What time is one hour before 12:40 a.m.?", ask: "1 hour before 12:40 a.m.?", miss: "One hop back goes over a midnight post. Which label is on the other side?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  strip: { hours: 24, hourWidth: DD.hour, posts: ["12 midnight", "12 noon", "12 midnight"], halves: { "a.m.": "midnight to noon, sky blue", "p.m.": "noon to midnight, amber" } },
  clock: { hourHandLapsPerDay: 2, hoursPerLap: 12 },
  cards: DD_CARDS,
  demos: { 3: "10:40 a.m., hop 3 hours on (over 12 noon)", 4: "10:50 p.m., hop 2 hours on (over 12 midnight)" },
  input: "a time: hours and minutes in the slot's two boxes, a.m. or p.m. on the two label keys beside the slot",
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? A time is read as the book writes it ("2:25 p.m."): the clock
   time AND its label, so 2:25 a.m. is not 2:25 p.m.; minutes by value ("2:5" is 2:05) */
const judge = (item: any, v: any) => {
  if (item.kind === "laps") return judgeSlotParts(item, v);
  if (item.choices) return String(v ?? "").trim().toLowerCase() === item.answer;
  const got = ddTimes(v), want = ddTimes(item.answer);
  if (got.length !== want.length || !want.length) return false;
  if (item.kind === "pins") { const a = got.slice().sort((x, y) => x - y), b = want.slice().sort((x, y) => x - y); return a.every((x, k) => x === b[k]); }
  return got.every((x, k) => x === want[k]);
};
/* oracle: every answer re-derived on a 24-hour count of minutes, written out by its own table
   (shares no code with judge's reader or the picture's writer) */
const oracle = () => {
  const H12 = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const written = (mins: number) => {
    const d = ((mins % 1440) + 1440) % 1440, h = Math.floor(d / 60), m = d % 60;
    return H12[h % 12] + (m ? ":" + String(m).padStart(2, "0") : "") + (h < 12 ? " a.m." : " p.m.");
  };
  return PHASES.every((p: any) => p.items.every((it: any) => {
    if (it.kind === "laps") return it.answer[0] === 24 && it.answer[1] === 24 / 12;
    if (it.kind === "same") return it.answer === (24 / 12 > 1 ? "no" : "yes");
    if (it.kind === "pins") { const at: string[] = []; for (let h = 0; h < 24; h++) if (h % 12 === it.hour % 12) at.push(written(h * 60)); return it.answer === at.join(" and "); }
    if (it.kind === "cards") return it.answer === it.cards.map((id: string) => written(DD_CARDS[id].at)).join(", ");
    if (it.kind === "count") return it.answer === written(it.start + it.step * it.hops * 60);
    if (it.kind === "after") return it.answer === (((it.at % 1440) + 1440) % 1440 < 720 ? "midnight" : "noon");
    return false;
  }));
};
/* the most likely wrong answer (the misconception); judge must reject it: once round a day, "yes, you can
   tell", one seven only, and a time that keeps the old label */
const nearMiss = (item: any) => (item.kind === "laps" ? [24, 1] : item.kind === "same" ? "yes" : item.kind === "after" ? "noon"
  : item.kind === "pins" ? "7 a.m." : item.near);
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.kind === "laps" ? ["24", "twenty-four", "twice", "2 laps", "two laps"]
  : item.kind === "same" ? ["cannot tell"]
  : item.kind === "pins" ? ["7 a.m.", "7 p.m."]
  : item.kind === "after" ? ["25 minutes after midnight", "twenty-five minutes after midnight"]
  : [String(item.answer), ...String(item.answer).split(", ")]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it: the written time */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (T.state().stage === "demo") return HOOK.demo && HOOK.demo();
  if (item.kind === "count" && HOOK.label) HOOK.label(item.answer);
  if (item.pad === "enter" && HOOK.set) HOOK.set(item.answer);
  return T.submit(item.answer);
};
/* the agent's answer(): a time's label goes on the label keys and the runtime types its hours and minutes;
   pins and cards are set as a child would set them */
const answer = (item: any, v: any) => {
  if (item.kind === "count") { if (HOOK.label) HOOK.label(v); return undefined; }
  return item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined;
};
/* the agent's check() before Enter: in a demo it plays the hops; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);
/* what the slot shows: a working-area answer ("6:10 a.m., 1:15 p.m.", "7 a.m. and 7 p.m.") lives on the strip,
   in the cards' labels and the pins, so its one-box slot stays clear (it would spill out of the slot); the
   two boxes of a time and a chosen word show as typed */
const format = (v: any, j: any) => (j === undefined && /\d\s*(a\.m\.|p\.m\.|noon|midnight)/i.test(String(v ?? "")) ? "" : v);

/* ── the working area: 1086 x 528, origin at its top-left ────────────────────────────────────
   Countable things use CONTENT colours (url(#gHundred|gTen|gOne|gBead|gPointer)); coloured numerals
   and words use a deeper ink, shade(colour, 0.25), so they read at 4.5:1. Type uses T.* only.
   Pieces: drag = useDrag(onDrop) then {...control(id, label), ...drag.bind(pay), ...drag.keys(pay)};
   taps = <Hit id x y w h onPress label />. One <Invite/> marks the one thing to touch.
   Nothing is written here that the voice already says. `wrong` = { value, tries } after a miss:
   lock, redraw the mathematics in steps (the traceback), unlock; never mark it, never reset it.
   stage === "free" is Free play (the plan's writeup.freePlay): no target, every control unlocked. */
/* a fresh working area for one question (or a phase's demo, or Free play). Cards of the questions already
   played in phase 2 stand settled in their halves; the posts light only when a hop crosses them */
function ddScene(key: string, n: number, index: number, phase: any, item: any) {
  const s: any = { key, t: 0, view: 0, show: true, arcs: [], lit: {}, pins: [null, null], cards: {}, label: null,
    ghost: null, pale: null, lapsOn: false, bracket: false, clockT: null, moved: false, hops: 0, judged: null, askLabel: false };
  if (key === "free") return s;
  if (n === 1) return { ...s, show: item.kind !== "pins", lapsOn: item.kind === "same" };
  if (n === 2) {
    const cards: any = {};
    phase.items.forEach((it: any, k: number) => { if (k < index) it.cards.forEach((id: string) => { cards[id] = { half: ddHalfOf(DD_CARDS[id].at), day: 0 }; }); });
    return { ...s, show: false, cards };
  }
  if (key.endsWith(":demo")) return { ...s, t: phase.demo.start };
  if (item.kind === "after") return { ...s, show: false, clockT: item.at };
  return { ...s, t: item.start };
}

/* n one-hour hops from t: each lands as an arc; a hop that crosses noon or midnight lights that post; a hop
   that would leave the strip rides to the post, the strip slides a whole day, and then it lands */
function ddHopFrames(from: number, view: number, dir: number, count: number, arcs0: any[], lit0: any, gap: number) {
  const out: any[] = [];
  let t = from, v = view, arcs = arcs0.slice(), lit = { ...lit0 };
  for (let k = 0; k < count; k++) {
    const t1 = t + dir * 60, lo = v * 60, hi = lo + 1440;
    if (t1 > hi || t1 < lo) {
      const edge = t1 > hi ? hi : lo, v1 = v + (t1 > hi ? 24 : -24);
      arcs = [...arcs, [Math.min(t, edge), Math.max(t, edge)]];
      lit = { ...lit, [edge]: true };
      out.push({ ms: Math.round(gap * 0.6), t: edge, v, arcs, lit });
      for (let j = 1; j <= 4; j++) out.push({ ms: 90, t: edge, v: v + ((v1 - v) * j) / 4, arcs, lit });
      v = v1;
      arcs = [...arcs, [Math.min(edge, t1), Math.max(edge, t1)]];
      out.push({ ms: gap, t: t1, v, arcs, lit, land: true });
    } else {
      const a = Math.min(t, t1), b = Math.max(t, t1), post = Math.ceil(a / 720) * 720;
      if (post > a && post < b) lit = { ...lit, [post]: true };
      arcs = [...arcs, [a, b]];
      out.push({ ms: gap, t: t1, v, arcs, lit, land: true });
    }
    t = t1;
  }
  return out;
}

/* settled cards stand above the strip at their time, on two rows so that no two cover each other */
const DD_CARD_W = 142, DD_CARD_H = 96;
/* `block` (Free play): the marker's tag and pin, x from l to r; a card never stands in the low row over it, so the
   tag never covers a card's time and the two finger boxes never overlap */
function ddRows(list: any[], xOf: (t: number) => number, block?: any) {
  const out: any = {}, r1: number[] = [], r2: number[] = [];
  list.slice().sort((a, b) => a.t - b.t).forEach((c: any) => {
    const cx = Math.min(Math.max(xOf(c.t), DD_CARD_W / 2 + 4), 1086 - DD_CARD_W / 2 - 4);
    const onMarker = !!block && cx + DD_CARD_W / 2 + 6 > block.l && cx - DD_CARD_W / 2 - 6 < block.r;
    const row = onMarker || r1.some((x) => Math.abs(x - cx) < DD_CARD_W + 10) ? 2 : 1;
    /* in Free play the clock stands top left: a card in the high row keeps clear of the dial (its stem still
       slants to its time) */
    const at = row === 2 && block ? Math.max(cx, DD.cx + DD.cr + DD_CARD_W / 2 + 6) : cx;
    (row === 1 ? r1 : r2).push(at);
    out[c.key] = { cx: at, x: at - DD_CARD_W / 2, y: row === 1 ? 236 : 132, tx: xOf(c.t) };
  });
  return out;
}
/* a card waiting in the tray: slot k of four along the top (room all round for the invite's ring) */
const ddTrayX = (k: number) => 476 + k * 148;
const DD_TRAY_Y = 20;

const ddSun = (x: number, y: number) => (
  <g>
    {Array.from({ length: 8 }).map((_, k) => { const a = (k * Math.PI) / 4; return <line key={k} x1={x + 13 * Math.cos(a)} y1={y + 13 * Math.sin(a)} x2={x + 18 * Math.cos(a)} y2={y + 18 * Math.sin(a)} stroke={shade(DD_SUN, 0.5)} strokeWidth={2.5} strokeLinecap="round" />; })}
    <circle cx={x} cy={y} r={10} fill={DD_SUN} stroke={shade(DD_SUN, 0.5)} strokeWidth={2} />
  </g>
);
/* a filled crescent, 34 tall, set a little right of its post so the left one stays on the working area */
const ddMoon = (x: number, y: number) => {
  const c = x + 3;
  return <path d={`M ${c + 6} ${y - 16} A 17 17 0 1 0 ${c + 6} ${y + 16} A 22 22 0 0 1 ${c + 6} ${y - 16} Z`} fill={DD_MOON} stroke={DD_NEAR} strokeWidth={2} strokeLinejoin="round" />;
};

/* the day strip: 24 hour blocks from one midnight post to the next (the a.m. half sky blue, the p.m. half
   amber), a moon on each midnight post and a sun on the noon post, hour numbers every three hours */
function ddStrip(view: number, lit: any, C: any, tx: any, peek?: boolean) {
  const x0 = DD.sx, x1 = DD.sx + DD.sw, y = DD.sy;
  const xOf = (t: number) => x0 + (t / 60 - view) * DD.hour;
  const blocks: any[] = [], posts: any[] = [], nums: any[] = [], halves: any[] = [];
  for (let h = Math.floor(view); h < view + 24; h++) {
    const a = Math.max(x0, xOf(h * 60)), b = Math.min(x1, xOf((h + 1) * 60));
    if (b - a < 0.5) continue;
    const hd = ((h % 24) + 24) % 24, base = hd < 12 ? DD_SKY : DD_AMBER;
    blocks.push(<rect key={"b" + h} x={a} y={y} width={b - a} height={DD.sh} fill={hd % 2 ? tint(base, 0.32) : base} />);
    const xm = xOf(h * 60);
    if (hd % 3 === 0 && hd % 12 !== 0 && xm > x0 + 14 && xm < x1 - 14)
      nums.push(<text key={"n" + h} x={xm} y={464} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{hd % 12}</text>);
  }
  for (let p = Math.ceil(view / 12 - 1e-6) * 12; p <= view + 24 + 1e-6; p += 12) {
    const x = xOf(p * 60);
    if (x < x0 - 0.5 || x > x1 + 0.5) continue;
    const noon = ((p % 24) + 24) % 24 === 12;
    posts.push(
      <g key={"p" + p}>
        {lit[p * 60] && <rect x={x - 11} y={y - 32} width={22} height={DD.sh + 46} rx={11} fill="#FFFFFF" stroke={DD_NEAR} strokeWidth={3} />}
        <rect x={x - 4} y={y - 22} width={8} height={DD.sh + 34} rx={3} fill={DD_NEAR} />
        {noon ? ddSun(x, 452) : ddMoon(x, 452)}
      </g>
    );
  }
  for (let s = Math.floor(view / 12) * 12; s < view + 24; s += 12) {
    const a = Math.max(x0, xOf(s * 60)), b = Math.min(x1, xOf((s + 12) * 60));
    if (b - a < 150) continue;
    const am = ((s % 24) + 24) % 24 < 12;
    halves.push(<text key={"h" + s} x={(a + b) / 2} y={514} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={am ? DD_SKY_INK : DD_AMBER_INK}>{tx(am ? "a.m." : "p.m.")}</text>);
  }
  return (
    <g>
      {/* the edge of the day before and of the next day, just showing past the midnight posts (phase 4, Free play) */}
      {peek && Math.abs(view - Math.round(view)) < 1e-6 && (
        <g>
          <rect x={x0 - 22} y={y} width={16} height={DD.sh} fill={tint(DD_AMBER, 0.35)} stroke={DD_NEAR} strokeWidth={2} strokeDasharray="6 4" />
          <rect x={x1 + 6} y={y} width={16} height={DD.sh} fill={tint(DD_SKY, 0.35)} stroke={DD_NEAR} strokeWidth={2} strokeDasharray="6 4" />
        </g>
      )}
      {blocks}
      <rect x={x0} y={y} width={DD.sw} height={DD.sh} fill="none" stroke={DD_NEAR} strokeWidth={2.5} />
      {posts}{nums}{halves}
    </g>
  );
}

/* the clock, 240 across: sixty marks, a long deep blue minute hand and a short vermilion hour hand that both stop
   short of the numerals, and the twelve numerals drawn over the hands on a paper halo */
function ddClock(t: number, C: any) {
  const { cx, cy, cr } = DD;
  const d = ((Math.round(t) % 1440) + 1440) % 1440;
  const ha = ((d % 720) / 720) * 2 * Math.PI, ma = ((d % 60) / 60) * 2 * Math.PI;
  return (
    <g>
      <circle cx={cx} cy={cy} r={cr} fill="#FFFFFF" stroke={DD_NEAR} strokeWidth={4} filter="url(#fShadowSoft)" />
      {Array.from({ length: 60 }).map((_, k) => {
        const a = (k * Math.PI) / 30, big = k % 5 === 0, r0 = cr - (big ? 17 : 10), r1 = cr - 5;
        return <line key={k} x1={cx + r0 * Math.sin(a)} y1={cy - r0 * Math.cos(a)} x2={cx + r1 * Math.sin(a)} y2={cy - r1 * Math.cos(a)} stroke={DD_NEAR} strokeWidth={big ? 3.5 : 1.6} strokeLinecap="round" />;
      })}
      <line x1={cx} y1={cy} x2={cx + 64 * Math.sin(ma)} y2={cy - 64 * Math.cos(ma)} stroke={DD_DEEP} strokeWidth={6} strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={cx + 44 * Math.sin(ha)} y2={cy - 44 * Math.cos(ha)} stroke={DD_VERM} strokeWidth={11} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={8} fill={DD_NEAR} />
      {Array.from({ length: 12 }).map((_, k) => {
        const a = ((k + 1) * Math.PI) / 6, r = cr - 34;
        return <text key={"c" + k} x={cx + r * Math.sin(a)} y={cy - r * Math.cos(a) + 11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}
          stroke="#FFFFFF" strokeWidth={6} strokeLinejoin="round" paintOrder="stroke">{k + 1}</text>;
      })}
    </g>
  );
}

/* what a tag or a thumbnail writes for a time: "8:25 a.m." (a.m. and p.m. stay Latin on screen in every
   language, as on a clock or a phone), and "12 noon" / "12 midnight" looked up whole, since Gujarati puts the
   word first ("બપોરના 12") */
function ddTimeText(t: number, tx: any) {
  const [num, word] = ddSplit(t);
  const whole = word === "noon" || word === "midnight";
  return { num, word, whole, text: whole ? tx("12 " + word) : num + " " + tx(word) };
}
/* where a tag stands: its left edge and width, kept on the working area */
function ddTagBox(x: number, t: number, tx: any) {
  const w = Math.max(96, ddTextW(ddTimeText(t, tx).text, T.label) + 32);
  return { left: Math.min(Math.max(x - w / 2, 3), 1083 - w), w };
}
/* a tag carrying a time with its label; a stem from the tag down to the pin head at stemTo. `left` moves a
   tag aside when another stands in its place (the stem then slants to its own pin) */
function ddTag(x: number, t: number, y: number, stemTo: number, C: any, tx: any, pale?: boolean, left?: number) {
  const tt = ddTimeText(t, tx);
  const box = ddTagBox(x, t, tx), l = left === undefined ? box.left : left, w = box.w;
  const foot = Math.min(Math.max(x, l + 14), l + w - 14);
  const wordInk = tt.word === "a.m." ? DD_SKY_INK : DD_AMBER_INK;
  return (
    <g>
      <line x1={foot} y1={y + 50} x2={x} y2={stemTo} stroke={pale ? DD_PALE_INK : DD_NEAR} strokeWidth={3} strokeDasharray={pale ? "6 4" : undefined} />
      <rect x={l} y={y} width={w} height={50} rx={12} fill={pale ? "#F6F7F8" : "#FFFFFF"} stroke={pale ? DD_PALE_INK : DD_NEAR} strokeWidth={2.5} strokeDasharray={pale ? "8 6" : undefined} />
      {tt.whole
        ? <text x={l + w / 2} y={y + 36} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tt.text}</text>
        : <text x={l + w / 2} y={y + 36} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tt.num + " "}<tspan fill={wordInk}>{tx(tt.word)}</tspan></text>}
    </g>
  );
}

/* a pin: the marker and the child's pins are toy pieces (a rounded head, top-lit, with the one shadow, lifted
   while held); a pale pin shows where an answer would stand */
function ddPin(x: number, headY: number, len: number, look: string, lifted?: boolean) {
  if (look === "pale") return (
    <g>
      <rect x={x - 3} y={headY} width={6} height={len} rx={3} fill={DD_PALE_INK} stroke="#FFFFFF" strokeWidth={1.5} />
      <circle cx={x} cy={headY} r={13} fill={DD_PALE_INK} stroke="#FFFFFF" strokeWidth={3} />
    </g>
  );
  return (
    <g>
      <rect x={x - 3} y={headY} width={6} height={len} rx={3} fill={DD_NEAR} stroke="#FFFFFF" strokeWidth={1.5} />
      <g filter={lifted ? "url(#fLift)" : "url(#fShadowSoft)"}>
        <circle cx={x} cy={headY} r={19} fill="url(#ddHead)" stroke="#FFFFFF" strokeWidth={3} />
        <ellipse cx={x - 6} cy={headY - 8} rx={8} ry={4} fill="#FFFFFF" fillOpacity={0.45} />
      </g>
    </g>
  );
}

/* the pictures on the day cards, 48 across (ink lines, no colour, and no sun or moon: the half is the child's to choose) */
function ddIcon(id: string, x: number, y: number, ink: string) {
  const p: any = { fill: "none", stroke: ink, strokeWidth: 3.2, strokeLinecap: "round", strokeLinejoin: "round" };
  /* waking up: a bed with its pillow and a turned-back blanket */
  if (id === "wake") return (<g {...p}><path d={`M ${x - 23} ${y + 18} V ${y - 14} M ${x + 23} ${y + 18} V ${y + 2} M ${x - 23} ${y + 8} H ${x + 23} M ${x - 23} ${y + 2} H ${x + 23}`} /><rect x={x - 19} y={y - 8} width={14} height={9} rx={4} /><path d={`M ${x - 2} ${y + 2} Q ${x + 6} ${y - 8} ${x + 23} ${y - 2}`} /></g>);
  /* lunch: a plate between a fork and a spoon */
  if (id === "lunch") return (<g {...p}><circle cx={x - 2} cy={y} r={13} /><circle cx={x - 2} cy={y} r={6} /><path d={`M ${x - 23} ${y - 18} V ${y + 20} M ${x - 27} ${y - 18} V ${y - 8} M ${x - 19} ${y - 18} V ${y - 8} M ${x - 27} ${y - 8} H ${x - 19}`} /><ellipse cx={x + 17} cy={y - 12} rx={4} ry={6} /><path d={`M ${x + 17} ${y - 6} V ${y + 20}`} /></g>);
  /* a shop: a striped awning over a counter and a door */
  if (id === "shop") return (<g {...p}><path d={`M ${x - 24} ${y - 8} L ${x - 19} ${y - 22} H ${x + 19} L ${x + 24} ${y - 8} Z M ${x - 8} ${y - 22} L ${x - 10} ${y - 8} M ${x + 8} ${y - 22} L ${x + 10} ${y - 8}`} /><path d={`M ${x - 20} ${y - 8} V ${y + 20} H ${x + 20} V ${y - 8}`} /><rect x={x - 6} y={y + 3} width={12} height={17} /><rect x={x - 16} y={y - 2} width={8} height={8} /></g>);
  /* dinner: a bowl with a spoon in it and steam rising */
  return (<g {...p}><path d={`M ${x - 24} ${y} H ${x + 24} A 24 18 0 0 1 ${x - 24} ${y} Z`} /><path d={`M ${x + 6} ${y} L ${x + 20} ${y - 20}`} /><path d={`M ${x - 12} ${y - 6} q 6 -7 0 -14 M ${x - 2} ${y - 6} q 6 -7 0 -14`} /></g>);
}

/* a day card, 142 x 96: its picture, its time, and its label once it stands in a half */
function ddCard(id: string, x: number, y: number, half: any, C: any, tx: any, look: string) {
  const quiet = look === "quiet", ghost = look === "ghost";
  return (
    <g>
      {look === "glow" && <rect x={x - 7} y={y - 7} width={DD_CARD_W + 14} height={DD_CARD_H + 14} rx={20} fill="none" stroke={DD_NEAR} strokeWidth={3.5} />}
      <rect x={x} y={y} width={DD_CARD_W} height={DD_CARD_H} rx={14} fill={ghost ? "#F7F8F9" : quiet ? tint(C.panel, 0.45) : "#FFFFFF"}
        stroke={quiet ? C.rule : ghost ? DD_PALE_INK : DD_NEAR} strokeWidth={2.5} strokeDasharray={ghost ? "9 6" : undefined}
        filter={look === "live" ? "url(#fShadowSoft)" : undefined} />
      {ddIcon(id, x + 31, y + 50, DD_NEAR)}
      <text x={x + 60} y={y + 42} fontSize={T.micro} fontWeight={700} fill={C.ink}>{DD_CARDS[id].face}</text>
      {half ? <text x={x + 60} y={y + 82} fontSize={T.micro} fontWeight={700} fill={half === "am" ? DD_SKY_INK : DD_AMBER_INK}>{tx(half === "am" ? "a.m." : "p.m.")}</text>
        : <rect x={x + 60} y={y + 58} width={68} height={26} rx={6} fill="none" stroke={quiet ? C.rule : C.dim} strokeWidth={2} strokeDasharray="6 5" />}
    </g>
  );
}

/* the hopper's arrow: one hour on (dir 1) or back (dir -1) */
const ddHopIcon = (dir: number, y: number, col: string) => (
  <path d={dir > 0 ? `M -20 ${y + 8} Q 0 ${y - 22} 20 ${y + 8} M 20 ${y + 8} L 9 ${y + 4} M 20 ${y + 8} L 21 ${y - 3}` : `M 20 ${y + 8} Q 0 ${y - 22} -20 ${y + 8} M -20 ${y + 8} L -9 ${y + 4} M -20 ${y + 8} L -21 ${y - 3}`}
    fill="none" stroke={col} strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" />
);

function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  /* every English word the picture draws goes through tx("...") (its key is added to TR); a number in words
     is wordsIn(n, lang) */
  const C = api.C;
  const tl = useTimeline();
  const [, bump] = useState(0);
  const sref = useRef<any>(null);
  const gref = useRef<any>(null);
  const running = useRef(false);
  const wantAll = useRef(false);
  const drag = useDrag((p: any, at: any, moved: boolean) => onDrop(p, at, moved));

  const free = stage === "free";
  const demoScene = !free && !!phase.demo && (stage === "teach" || stage === "demo");
  const key = free ? "free" : demoScene ? n + ":demo" : n + ":" + index;
  if (!sref.current || sref.current.key !== key) sref.current = ddScene(key, n, index, phase, item);
  const S = sref.current;
  const put = (p: any) => { const s = sref.current; sref.current = { ...s, ...(typeof p === "function" ? p(s) : p) }; bump((x: number) => x + 1); };
  useEffect(() => () => { tl.stop(); running.current = false; wantAll.current = false; }, [key]);
  const play = (steps: any[], then?: () => void) => { running.current = true; tl.run(steps, () => { running.current = false; if (then) then(); }); };

  const kind = free ? "free" : demoScene ? "demo" : item.kind;
  const asking = stage === "ask";
  const busy = tl.busy || running.current;
  const V = S.view;
  const xOf = (t: number) => DD.sx + (t / 60 - V) * DD.hour;
  const tAt = (x: number, step: number) => V * 60 + Math.min(1440, Math.max(0, Math.round((((x - DD.sx) / DD.hour) * 60) / step) * step));
  const filled = slotPartsOf(typed, 2).every((p: string) => p !== "");

  /* ── the hopper ── */
  const hopRun = (dir: number, count: number, gap: number, then?: () => void) => {
    const s = sref.current;
    const frames = ddHopFrames(s.t, s.view, dir, count, s.arcs.slice(free ? -12 : -30), s.lit, gap);
    play(frames.map((f: any) => [f.ms, () => { put({ t: f.t, view: f.v, arcs: f.arcs, lit: f.lit, hops: sref.current.hops + (f.land ? 1 : 0) }); if (f.land) api.sfx.tick(); }]), then);
  };
  const demoLeft = () => (phase.demo ? phase.demo.hops - sref.current.hops : 0);
  const finishDemo = () => play([[800, () => {}]], () => {
    if (n === 3) api.demoDone(["It went from 11:40 a.m., over the noon post, to 12:40 p.m."]);
    else api.demoDone(["It went from 11:50 p.m., over the midnight post, to 12:50 a.m."]);
  });
  /* a tap on the hopper is one hop; Enter (or the agent's check) plays the rest, and one that comes while a hop is
     landing is kept for when it lands */
  const afterHop = () => {
    if (demoLeft() <= 0) { wantAll.current = false; finishDemo(); }
    else if (wantAll.current) { wantAll.current = false; hopRun(phase.demo.step, demoLeft(), 420, finishDemo); }
  };
  const demoHop = () => {
    if (stage !== "demo" || running.current || demoLeft() <= 0) return;
    hopRun(phase.demo.step, 1, 520, afterHop);
  };
  const demoAll = () => {
    if (stage !== "demo") return;
    if (running.current) { wantAll.current = true; return; }
    if (demoLeft() <= 0) { finishDemo(); return; }
    hopRun(phase.demo.step, demoLeft(), 420, finishDemo);
  };

  /* ── the marker: slides along the strip; a tap (or Enter) moves it on one hour ── */
  const markerLive = () => free || (n === 1 && sref.current.show && (stage === "ask" || stage === "teach") && !running.current);
  const markerMove = (dir: number) => {
    const s = sref.current;
    if (free) {
      if (running.current || (dir > 0 && s.t >= 2880) || (dir < 0 && s.t <= -1440)) return;
      hopRun(dir, 1, 340);
      return;
    }
    let t = s.t + dir * 60;
    if (t > 1440) t = 0; else if (t < 0) t = 1440;
    put({ t, moved: true, clockT: null, ghost: null });
    api.sfx.tick();
  };

  /* ── drops: the marker, a pin (phase 1), a day card (phase 2 and Free play) ── */
  const onDrop = (p: any, at: any, moved: boolean) => {
    const s = sref.current;
    const tap = !moved || !isFinite(at.x) || !isFinite(at.y);
    if (p.kind === "marker") {
      if (!markerLive()) return;
      if (tap) { markerMove(1); return; }
      /* the marker moves by the drag, wherever it was grabbed (its tag or its pin) */
      const g = gref.current, x = g && g.p === p ? xOf(s.t) + (at.x - g.x0) : at.x;
      put({ t: tAt(x, 5), moved: true, clockT: null, ghost: null });
      api.sfx.tick();
      return;
    }
    if (!(free || (stage === "ask" && !running.current))) return;
    const onStrip = at.x >= DD.sx - 22 && at.x <= DD.sx + DD.sw + 22;
    if (p.kind === "pin") {
      const pins = s.pins.slice();
      if (tap) pins[p.i] = pins[p.i] === null ? 720 : pins[p.i] + 60 > 1440 ? 0 : pins[p.i] + 60;
      else if (at.y < 236 && at.x > 860) pins[p.i] = null; /* back on its tray */
      else if (onStrip && at.y >= 236) pins[p.i] = tAt(at.x, 60);
      else return; /* dropped off the strip (over the answer column, say): it stays where it was */
      put({ pins, clockT: pins[p.i] === null ? s.clockT : pins[p.i], ghost: null });
      api.sfx.tick();
      return;
    }
    if (p.kind === "card") {
      const cards = { ...s.cards }, c = cards[p.id], day = Math.round(V / 24);
      if (tap) cards[p.id] = { half: c && c.half === "am" ? "pm" : "am", day: c ? c.day : day };
      else if (at.y > 130 && onStrip) cards[p.id] = { half: at.x < xOf(day * 1440 + 720) ? "am" : "pm", day };
      else return; /* dropped over the tray or off the strip: it stays as it was */
      put({ cards, ghost: null });
      api.sfx.tick();
    }
  };
  /* keys on a piece: arrows move it, Enter or Space is a tap; once the answer is made, Enter passes to the
     window and answers (PATTERNS §5b) */
  const nudge = (p: any, dir: number) => {
    const s = sref.current;
    if (p.kind === "marker") { if (markerLive()) markerMove(dir); return; }
    if (!(free || (stage === "ask" && !running.current))) return;
    if (p.kind === "pin") {
      const pins = s.pins.slice();
      pins[p.i] = pins[p.i] === null ? 720 : Math.min(1440, Math.max(0, pins[p.i] + dir * 60));
      put({ pins, clockT: pins[p.i], ghost: null });
    } else if (p.kind === "card") {
      const cards = { ...s.cards }, c = cards[p.id];
      cards[p.id] = { half: dir < 0 ? "am" : "pm", day: c ? c.day : Math.round(V / 24) };
      put({ cards, ghost: null });
    }
    api.sfx.tick();
  };
  const passEnter = (p: any) => {
    if (!asking) return false;
    if (p.kind === "pin") return sref.current.pins.every((x: any) => x !== null);
    if (p.kind === "card") return (item.cards || []).every((id: string) => sref.current.cards[id]);
    return false;
  };
  const pieceKeys = (p: any) => ({
    onKeyDown: (e: any) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); e.stopPropagation(); nudge(p, e.key === "ArrowRight" ? 1 : -1); return; }
      if (e.key === "Enter" && passEnter(p)) return;
      drag.keys(p).onKeyDown(e);
    },
  });

  /* ── the label keys beside the slot: a.m. or p.m. after the typed time ── */
  const pickLabel = (l: string) => {
    if (stage !== "ask" || running.current) return;
    put({ label: l, askLabel: false, ghost: null, pale: null });
    /* a new label is a new answer. After a miss the runtime waits for a fresh write and walks the caret from the
       first box, so the boxes are written again as they stand with the caret on the last one (toolApi.answer does
       exactly that; api has no caret call): the child's next Enter sends */
    if (wrong) {
      const ps = slotPartsOf(typed, 2), A: any = (window as any).toolApi;
      const again = ps.every((x: string) => x !== "") && A && typeof A.answer === "function" && A.answer(ps.join("|"));
      if (!again) api.setTyped(typed);
    }
    api.sfx.tick();
  };

  /* ── Enter: the working area's answer ── */
  const onEnter = (v: any) => {
    const s = sref.current;
    if (stage !== "ask" || running.current) return;
    let value = "";
    if (item.kind === "count") {
      const ps = slotPartsOf(v === undefined ? typed : v, 2);
      if (ps.some((x: string) => x === "")) return;
      if (!s.label) { put({ askLabel: true }); api.say("Tap a label key as well."); return; }
      const m = Number(ps[1]);
      value = Number(ps[0]) + ":" + (m < 10 ? "0" : "") + m + (s.label === "am" ? " a.m." : " p.m.");
    } else if (item.kind === "pins") {
      const placed = s.pins.filter((x: any) => x !== null);
      if (!placed.length) { api.say("Drag a pin onto the strip first."); return; }
      value = placed.slice().sort((a: number, b: number) => a - b).map(ddFmt).join(" and ");
    } else if (item.kind === "cards") {
      if (item.cards.some((id: string) => !s.cards[id])) { api.say("Put every card in its half of the day first."); return; }
      value = item.cards.map((id: string) => DD_CARDS[id].face + (s.cards[id].half === "am" ? " a.m." : " p.m.")).join(", ");
    } else { api.submit(v); return; }
    /* the same work after a miss is never judged twice; a short nudge says what to do instead */
    if (wrong && value === s.judged) {
      if (item.kind === "pins") api.say("Move a pin first.");
      else if (item.kind === "cards") api.say("Move a card first.");
      else api.say("Change the time or its label first.");
      return;
    }
    put({ judged: value, askLabel: false });
    api.submit(value);
  };
  api.onEnter(free ? null : stage === "demo" ? () => demoAll() : item.kind === "count" || item.pad === "enter" ? onEnter : null);

  /* ── the agent and the dev driver ── */
  HOOK.set = (v: any) => {
    if (item.kind === "pins") { const ts = ddTimes(v).filter((x) => isFinite(x)); put({ pins: [ts[0] ?? null, ts[1] ?? null], clockT: ts[0] ?? null }); return true; }
    if (item.kind === "cards") {
      const ts = ddTimes(v), cards = { ...sref.current.cards };
      item.cards.forEach((id: string, k: number) => { if (isFinite(ts[k])) cards[id] = { half: ddHalfOf(ts[k]), day: 0 }; });
      put({ cards });
      return true;
    }
    return false;
  };
  HOOK.label = (v: any) => { const l = ddLabelOf(v); if (l) put({ label: l }); };
  HOOK.check = stage === "demo" ? () => { demoAll(); return true; } : undefined;
  HOOK.demo = demoAll;

  /* ── the maths moving: the win, and after a miss the correction, which ends on the whole right answer ── */
  const shows = (miss: boolean): any[] => {
    const s = sref.current;
    if (item.kind === "laps") {
      const st: any[] = [[260, () => put({ t: 0, lapsOn: true, bracket: false, clockT: null, show: true, ghost: null })]];
      for (let h = 1; h <= 24; h++) st.push([h % 12 === 0 ? 480 : 110, () => { put({ t: h * 60 }); if (h % 12 === 0) api.sfx.tick(); }]);
      st.push([300, () => put({ bracket: true, moved: true })]);
      return st;
    }
    if (item.kind === "same") return [[300, () => put({ t: 420, clockT: null, lapsOn: true })], [400, () => put({ ghost: { sevens: true } })]];
    if (item.kind === "pins") return [[300, () => put({ clockT: 420, ghost: { pins: [420, 1140] } })]];
    if (item.kind === "cards") {
      const off = item.cards.filter((id: string) => !s.cards[id] || s.cards[id].half !== ddHalfOf(DD_CARDS[id].at));
      return [[300, () => put({ ghost: miss ? { cards: off } : { glow: item.cards } })]];
    }
    if (item.kind === "after") return [[300, () => put({ show: true, t: item.at, clockT: null, lit: { 0: true }, ghost: { paleAt: item.at + 720 } })]];
    if (item.kind === "count") {
      const frames = ddHopFrames(item.start, 0, item.step, item.hops, [], {}, 520);
      const endV = frames.length ? frames[frames.length - 1].v : 0;
      let pale: any = null;
      if (miss && wrong) { const ts = ddTimes(wrong.value); if (ts.length === 1 && isFinite(ts[0])) pale = endV * 60 + ts[0]; }
      return [[360, () => put({ t: item.start, view: 0, arcs: [], lit: {}, pale, hops: 0 })],
        ...frames.map((f: any) => [f.ms, () => { put({ t: f.t, view: f.v, arcs: f.arcs, lit: f.lit }); if (f.land) api.sfx.tick(); }])];
    }
    return [];
  };
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    api.lock(true);
    play([...shows(true), [600, () => {}]], () => api.lock(false));
  }, [wrong]);
  useEffect(() => {
    if (stage !== "win" || free) return;
    play(shows(false));
    /* win lines only say what the picture shows; the rule is the closing's */
    if (item.kind === "laps") api.say("Two laps of twelve hours.");
    else if (item.qid === "M1.S2.T3.C10:7") api.say("It is 2:30 p.m.");
  }, [stage]);

  /* ── the live drag ── */
  const dg = drag.drag;
  if (dg && (!gref.current || gref.current.p !== dg.payload)) gref.current = { p: dg.payload, x0: dg.x, y0: dg.y };
  if (!dg) gref.current = null;
  const dragging = (k: string, id?: any) => !!dg && dg.payload.kind === k && (id === undefined || dg.payload.id === id || dg.payload.i === id);
  const off = dg && gref.current ? { dx: dg.x - gref.current.x0, dy: dg.y - gref.current.y0 } : { dx: 0, dy: 0 };
  const mT = dragging("marker") ? tAt(xOf(S.t) + off.dx, 5) : S.t;
  const pinT = dragging("pin") && dg.y > 236 ? tAt(dg.x, 60) : null;
  const clockT = pinT !== null ? pinT : dragging("marker") ? mT : S.clockT !== null ? S.clockT : S.t;
  const mx = xOf(mT);

  /* what the host and the agent read back (toolApi.getState); never the answer before it is given.
     lap: the hour hand's lap of the day, 1 or 2 (midnight at the end of a day closes lap 2); dayCount: the day the
     strip shows, as the picture says it (0 today, 1 the next day, -1 the day before) */
  const placed = DD_CARD_IDS.filter((id) => S.cards[id]).length;
  const day = Math.round(V / 24);
  const inDay = ((mT % 1440) + 1440) % 1440;
  api.share({ markerTime: S.show || free ? ddFmt(mT) : null, half: S.show || free ? ddHalfOf(mT) : null,
    lap: inDay === 0 && mT > 0 ? 2 : inDay < 720 ? 1 : 2, hops: S.hops, dayCount: day, cardsPlaced: placed });

  /* ── the running count: the hour hand's laps (phase 1), cards placed (phase 2), the day (phase 4, Free play) ── */
  const laps = Math.floor(Math.max(0, mT) / 720);
  const runs = free || n === 4 ? { word: tx("day"), val: tx(day === 0 ? "today" : day > 0 ? "next day" : "day before") }
    : n === 1 && S.lapsOn ? { word: tx("hour hand"), val: laps + " " + tx(laps === 1 ? "lap" : "laps") }
    : n === 2 ? { word: tx("cards"), val: placed + " / 4" } : null;

  /* ── pieces ── */
  /* the marker's finger box covers the whole piece, tag and pin, so a press anywhere on it holds it (it then moves
     by the drag, not to the finger) */
  const mBox = ddTagBox(mx, mT, tx), mLeft = Math.max(0, Math.min(mBox.left, mx - 40)), mRight = Math.min(W.w, Math.max(mBox.left + mBox.w, mx + 40));
  const markerEl = (free || (S.show && n !== 2)) && (
    <g {...(markerLive() ? { ...control("marker", tx("marker")), ...drag.bind({ kind: "marker" }), ...pieceKeys({ kind: "marker" }), className: "c4-piece" } : {})}>
      <rect x={mLeft} y={246} width={mRight - mLeft} height={186} fill="transparent" />
      {ddPin(mx, DD.headY, 106, "marker", dragging("marker"))}
      {ddTag(mx, mT, DD.tagY, DD.headY - 19, C, tx)}
    </g>
  );
  const pinEl = (i: number) => {
    const at = S.pins[i], inTray = at === null, live = asking && !busy;
    const hx = inTray ? 928 + i * 96 : xOf(at), hy = inTray ? 54 : DD.headY;
    const isDrag = dragging("pin", i);
    return (
      <g key={"pin" + i} {...(live ? { ...control("pin-" + (i + 1), tx("pin")), ...drag.bind({ kind: "pin", i }), ...pieceKeys({ kind: "pin", i }), className: "c4-piece" } : {})}
        transform={isDrag ? `translate(${off.dx},${off.dy})` : undefined}>
        <rect x={Math.min(Math.max(hx - 36, 0), W.w - 72)} y={inTray ? 22 : 280} width={72} height={inTray ? 128 : 150} fill="transparent" />
        {ddPin(hx, hy, inTray ? 86 : 106, "pin", isDrag)}
      </g>
    );
  };
  const cardLive = (id: string) => free || (n === 2 && asking && !busy && (item.cards || []).includes(id));
  const ghostCards = (S.ghost && S.ghost.cards) || [];
  const settledList = DD_CARD_IDS.filter((id) => S.cards[id] && !dragging("card", id)).map((id) => ({ key: id, t: ddCardT(id, S.cards[id].half, S.cards[id].day) }))
    .concat(ghostCards.map((id: string) => ({ key: "g-" + id, t: DD_CARDS[id].at })))
    .filter((c: any) => xOf(c.t) >= DD.sx - 0.5 && xOf(c.t) <= DD.sx + DD.sw + 0.5);
  const laid = ddRows(settledList, xOf, free ? { l: mLeft, r: mRight } : undefined);
  const cardEl = (id: string) => {
    const c = S.cards[id], k = DD_CARD_IDS.indexOf(id), isDrag = dragging("card", id);
    const pos = c ? laid[id] : null;
    if (c && !pos && !isDrag) return null; /* on a day the strip is not showing */
    const x = pos ? pos.x : ddTrayX(k), y = pos ? pos.y : DD_TRAY_Y;
    const live = cardLive(id), mine = free || (n === 2 && (item.cards || []).includes(id));
    const glow = S.ghost && S.ghost.glow && S.ghost.glow.includes(id);
    return (
      <g key={id} {...(live ? { ...control("card-" + id, tx(DD_CARD_NAME[id])), ...drag.bind({ kind: "card", id }), ...pieceKeys({ kind: "card", id }), className: "c4-piece" } : {})}
        transform={isDrag ? `translate(${off.dx},${off.dy})` : undefined} filter={isDrag ? "url(#fLift)" : undefined}>
        {ddCard(id, x, y, c ? c.half : null, C, tx, glow ? "glow" : mine || c ? (live && !c ? "live" : "set") : "quiet")}
      </g>
    );
  };
  const stems = settledList.map((c: any) => {
    const pos = laid[c.key];
    return <line key={"s" + c.key} x1={pos.cx} y1={pos.y + DD_CARD_H} x2={pos.tx} y2={DD.sy} stroke={c.key.startsWith("g-") ? DD_PALE_INK : DD_NEAR} strokeWidth={2.5} strokeDasharray={c.key.startsWith("g-") ? "6 5" : undefined} />;
  });

  /* ── the correction's own layer, never taking a press. A lit place or a correction's pin is ringed in near-black ── */
  const G = S.ghost || {};
  /* the child's pale pin carries the child's time on a dashed tag; beside the marker's tag if the two would meet */
  let paleLeft: any = undefined;
  if (S.pale !== null) {
    const mb = ddTagBox(mx, mT, tx), pb = ddTagBox(xOf(S.pale), S.pale, tx);
    if (pb.left < mb.left + mb.w + 10 && mb.left < pb.left + pb.w + 10) {
      const right = mb.left + mb.w + 12, before = mb.left - 12 - pb.w;
      paleLeft = right + pb.w <= 1083 ? right : before >= 3 ? before : undefined;
    }
  }
  const ghostLayer = (
    <g pointerEvents="none">
      {S.pale !== null && ddPin(xOf(S.pale), DD.headY, 106, "pale")}
      {S.pale !== null && ddTag(xOf(S.pale), S.pale, DD.tagY, DD.headY - 13, C, tx, true, paleLeft)}
      {G.sevens && [420, 1140].map((t) => <circle key={"lit" + t} cx={xOf(t)} cy={DD.sy + DD.sh / 2} r={22} fill="none" stroke={DD_NEAR} strokeWidth={4} />)}
      {G.sevens && ddPin(xOf(1140), DD.headY, 106, "pale")}
      {G.sevens && ddTag(xOf(1140), 1140, DD.tagY, DD.headY - 13, C, tx, true)}
      {G.pins && G.pins.map((t: number) => (
        <g key={"gp" + t}>
          <circle cx={xOf(t)} cy={DD.headY} r={27} fill="#FFFFFF" stroke={DD_NEAR} strokeWidth={3} />
          {ddPin(xOf(t), DD.headY, 106, "pale")}
          {ddTag(xOf(t), t, DD.tagY - 8, DD.headY - 27, C, tx, true)}
        </g>
      ))}
      {G.paleAt !== undefined && ddPin(xOf(G.paleAt), DD.headY, 106, "pale")}
      {G.paleAt !== undefined && ddTag(xOf(G.paleAt), G.paleAt, DD.tagY, DD.headY - 13, C, tx, true)}
      {ghostCards.map((id: string) => { const pos = laid["g-" + id]; return pos ? <g key={"gc" + id}>{ddCard(id, pos.x, pos.y, ddHalfOf(DD_CARDS[id].at), C, tx, "ghost")}</g> : null; })}
    </g>
  );

  /* ── the one invite, drawn under the piece it rings so it never strikes through a word ── */
  let invite: any = null;
  const pulse = (x: number, y: number, w: number, h: number) => <rect className="c4-pulse" x={x} y={y} width={w} height={h} rx={20} fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" />;
  if (!free && !busy) {
    /* on the marker's head (held 6 in from the left edge so the ring stays on the working area) */
    if (n === 1 && item.kind === "laps" && (asking || stage === "teach") && !S.moved) invite = <Invite x={Math.min(Math.max(mx, 33), W.w - 33)} y={DD.headY} r={30} C={C} />;
    /* 14 clear of the first pin on its tray, and of the card to drop */
    else if (n === 1 && item.kind === "pins" && asking && S.pins.every((x: any) => x === null)) invite = pulse(895, 21, 66, 133);
    else if (n === 2 && asking) { const id = (item.cards || []).find((c: string) => !S.cards[c]); if (id) invite = pulse(ddTrayX(DD_CARD_IDS.indexOf(id)) - 14, DD_TRAY_Y - 14, DD_CARD_W + 28, DD_CARD_H + 28); }
    else if (stage === "demo" && S.hops === 0) invite = pulse(356, 4, 108, 104);
    else if (item.kind === "count" && asking && !S.label && (S.askLabel || filled)) invite = pulse(860, 10, 216, 112);
  }

  const showClock = n !== 2 || free;
  const labelKeys = !free && !demoScene && item.kind === "count";
  const labelOn = asking && !busy;
  const hopper = demoScene;

  return (
    <g>
      <defs>
        <linearGradient id="ddHead" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6A6E72" />
          <stop offset="1" stopColor="#1E1F21" />
        </linearGradient>
      </defs>
      {runs && (
        <g data-zone="runs">
          <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          <text x={22} y={-46} fontSize={T.micro} fontWeight={600} fill={shade(C.accent, 0.3)}>{runs.word}</text>
          <text x={308} y={-44} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{runs.val}</text>
        </g>
      )}
      {showClock && ddClock(clockT, C)}
      {ddStrip(V, S.lit, C, tx, free || n === 4)}
      {S.bracket && (
        <g>
          <path d={`M ${DD.sx} 472 V 482 H ${DD.sx + DD.sw} V 472`} fill="none" stroke={DD_NEAR} strokeWidth={3} />
          <text x={DD.sx + DD.sw / 2} y={514} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{"24 " + tx("hours")}</text>
        </g>
      )}
      <g pointerEvents="none">
        {S.arcs.map((a: any, k: number) => {
          const lo = V * 60, hi = lo + 1440, p = Math.max(a[0], lo), q = Math.min(a[1], hi);
          if (q - p < 1) return null;
          const xa = xOf(p), xb = xOf(q);
          return <path key={"a" + k} d={`M ${xa} ${DD.sy - 2} Q ${(xa + xb) / 2} ${DD.sy - 50} ${xb} ${DD.sy - 2}`} fill="none" stroke={DD_GREEN} strokeWidth={4.5} strokeLinecap="round" />;
        })}
      </g>
      {stems}
      {ghostLayer}
      {n === 1 && item.kind === "pins" && !free && <rect x={872} y={10} width={206} height={158} rx={18} fill={tint(C.panel, 0.5)} stroke={C.rule} strokeWidth={2} />}
      {(n === 2 || free) && <rect x={470} y={14} width={598} height={110} rx={18} fill={tint(C.panel, 0.5)} stroke={C.rule} strokeWidth={2} />}
      {/* the invite: over the tray panels, under the piece it rings */}
      {invite}
      {n === 1 && item.kind === "pins" && !free && [0, 1].map(pinEl)}
      {(n === 2 || free) && DD_CARD_IDS.map(cardEl)}
      {hopper && (
        <Key id="hop-on" x={362} y={10} w={96} h={84} C={C} disabled={stage !== "demo" || busy || demoLeft() <= 0} onClick={demoHop} label={tx("hop one hour on")}>
          {ddHopIcon(1, -14, stage === "demo" && !busy ? DD_GREEN : mix(C.ink, C.panel, 0.5))}
          <text y={28} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("1 hour")}</text>
        </Key>
      )}
      {free && (
        <g>
          <Key id="hop-back" x={252} y={10} w={96} h={84} C={C} disabled={busy} onClick={() => markerMove(-1)} label={tx("hop one hour back")}>
            {ddHopIcon(-1, -14, DD_GREEN)}
            <text y={28} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("1 hour")}</text>
          </Key>
          <Key id="hop-on" x={362} y={10} w={96} h={84} C={C} disabled={busy} onClick={() => markerMove(1)} label={tx("hop one hour on")}>
            {ddHopIcon(1, -14, DD_GREEN)}
            <text y={28} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("1 hour")}</text>
          </Key>
        </g>
      )}
      {/* the label keys: the chosen one is the dark key with white words while it can be pressed; while the keys are
          locked (a correction, a win) it keeps ink words on the quiet face and a near-black ring */}
      {labelKeys && ["am", "pm"].map((l: string, k: number) => {
        const chosen = S.label === l, dark = chosen && labelOn;
        return (
          <g key={l}>
            <Key id={"label-" + l} x={868 + k * 108} y={18} w={92} h={92} C={C} primary={dark} disabled={!labelOn} onClick={() => pickLabel(l)} label={tx(l === "am" ? "a.m." : "p.m.")}>
              <text y={4} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={dark ? "#FFFFFF" : C.ink}>{tx(l === "am" ? "a.m." : "p.m.")}</text>
              <rect x={-24} y={18} width={48} height={8} rx={4} fill={l === "am" ? DD_SKY : DD_AMBER} />
            </Key>
            {chosen && !labelOn && <rect x={868 + k * 108 - 6} y={12} width={104} height={104} rx={20} fill="none" stroke={DD_NEAR} strokeWidth={4} pointerEvents="none" />}
          </g>
        );
      })}
      {/* the marker last, so no card or arc ever covers its tag */}
      {markerEl}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: a small day strip with a
   pin at each time, and the time written under it */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const v = last.value;
  const ts = last.kind === "after" ? [25] : last.kind === "same" ? [420, 1140] : ddTimes(v).filter((x) => isFinite(x));
  const sx = 14, sw = w - 28, sy = 12, sh = 18;
  const said = last.kind === "laps" ? "2 " + tx("laps") : last.kind === "same" ? tx("No") : last.kind === "after" ? tx("just after midnight")
    : ts.map((t) => ddTimeText(t, tx).text).join(" · ");
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <rect x={sx} y={sy} width={sw / 2} height={sh} fill={DD_SKY} />
      <rect x={sx + sw / 2} y={sy} width={sw / 2} height={sh} fill={DD_AMBER} />
      <rect x={sx} y={sy} width={sw} height={sh} fill="none" stroke={DD_NEAR} strokeWidth={1.5} />
      {ts.map((t: number, k: number) => {
        const x = sx + (((t % 1440) + 1440) % 1440 / 1440) * sw;
        return <g key={k}><line x1={x} y1={sy - 4} x2={x} y2={sy + sh + 4} stroke={DD_NEAR} strokeWidth={3} /><circle cx={x} cy={sy - 4} r={4} fill={DD_NEAR} /></g>;
      })}
      <text x={w / 2} y={h - 14} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{said}</text>
    </g>
  );
}

function DayDial(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null }} />
  );
}

export default DayDial;
