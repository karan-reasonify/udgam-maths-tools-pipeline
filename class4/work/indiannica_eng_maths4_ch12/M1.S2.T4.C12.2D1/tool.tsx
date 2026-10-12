/* ═══ M1.S2.T4.C12.2D1 · time_unit_ladder · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "time_unit_ladder";
const MEDIA_ID = "M1.S2.T4.C12.2D1";
const TOOL_NAME = "Time Unit Ladder";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["Days, hours, minutes and seconds. How many of each make the next? First, the clock."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Each tile opened into the right number, the part already there added on, and each answer given its unit.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Put tiles on any rung and step them down, or send the second hand round.";

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, and the runtime looks each spoken or drawn line up in it.
   Fill it AFTER the English is final and reviewed (`node cli.mjs voice` lists every line still missing),
   then bake the voice. Empty = the tool runs in English only. */
const TR: any = {
  hi: {
    "Time Unit Ladder": "समय इकाई सीढ़ी",
    "Days, hours, minutes and seconds. How many of each make the next? First, the clock.": "दिन, घंटे, मिनट और सेकंड। हर एक के कितने मिलकर अगला बनाते हैं? पहले घड़ी।",
    "Each tile opened into the right number, the part already there added on, and each answer given its unit.": "हर टाइल सही संख्या में खुली, पहले से मौजूद भाग जोड़ा गया, और हर उत्तर को उसकी इकाई मिली।",
    "Free play. Put tiles on any rung and step them down, or send the second hand round.": "मुक्त खेल। किसी भी पायदान पर टाइलें रखो और उन्हें नीचे उतारो, या सेकंड की सुई घुमाओ।",
    /* phase 1 */
    "The second hand": "सेकंड की सुई",
    "The thin hand is the second hand. Tap the clock to send it once round the face.": "पतली सुई सेकंड की सुई है। घड़ी पर टैप करो, वह डायल का एक पूरा चक्कर लगाएगी।",
    "Here it runs much faster than real seconds.": "यहाँ वह असली सेकंड से बहुत तेज़ चलती है।",
    "How long does the second hand take to pass each small mark?": "सेकंड की सुई को हर छोटा निशान पार करने में कितना समय लगता है?",
    "Count the small marks from 12 to 1. Each number on the face is that many marks further on.": "12 से 1 तक के छोटे निशान गिनो। डायल की हर संख्या उतने ही निशान आगे है।",
    "The second hand goes round once every minute, so one minute is sixty seconds.": "सेकंड की सुई हर मिनट में एक चक्कर लगाती है, इसलिए एक मिनट साठ सेकंड का होता है।",
    "You learned: one lap of the second hand is one minute, sixty seconds.": "तुमने सीखा: सेकंड की सुई का एक चक्कर एक मिनट, यानी साठ सेकंड है।",
    "How many seconds are there in one minute? Count the marks the thin hand passes.": "एक मिनट में कितने सेकंड होते हैं? पतली सुई जितने निशान पार करती है, उन्हें गिनो।",
    "Seconds in one minute?": "एक मिनट में कितने सेकंड?",
    "The twelve numbers are not the seconds. There are small marks between them too.": "बारह संख्याएँ सेकंड नहीं हैं। उनके बीच छोटे निशान भी हैं।",
    "This time watch the blue minute hand. After one lap of the thin hand, how many marks has it moved?": "इस बार नीली मिनट की सुई देखो। पतली सुई के एक चक्कर के बाद वह कितने निशान आगे बढ़ी?",
    "Minute hand: how many marks?": "मिनट की सुई: कितने निशान?",
    "Look closely at the end of the lap. Did the minute hand jump to the next number?": "चक्कर के अंत को ध्यान से देखो। क्या मिनट की सुई अगली संख्या पर कूद गई?",
    "The second hand goes round the clock three times. How many seconds pass, and how far does the minute hand move?": "सेकंड की सुई घड़ी के तीन चक्कर लगाती है। कितने सेकंड बीतते हैं, और मिनट की सुई कितनी आगे बढ़ती है?",
    "After 3 laps?": "3 चक्कर के बाद?",
    "Take it one lap at a time. What does each lap add?": "एक बार में एक चक्कर लो। हर चक्कर कितना जोड़ता है?",
    "laps": "चक्कर", "second": "सेकंड", "seconds": "सेकंड", "minutes": "मिनट",
    "minute mark": "मिनट का निशान", "minute marks": "मिनट के निशान",
    "1 lap": "1 चक्कर", "60 seconds": "60 सेकंड", "1 mark": "1 निशान", "180 seconds": "180 सेकंड", "3 marks": "3 निशान",
    /* phase 2 */
    "Sixty, sixty and twenty-four": "साठ, साठ और चौबीस",
    "How many of the smaller unit make one of the bigger one?": "छोटी इकाई के कितने मिलकर बड़ी इकाई का एक बनाते हैं?",
    "Think of one big unit opened up. How many smaller ones fill it?": "एक बड़ी इकाई को खोलकर सोचो। कितनी छोटी इकाइयाँ उसे भरती हैं?",
    "Think of the clock. The slower a hand moves, the bigger the unit it counts.": "घड़ी के बारे में सोचो। सुई जितनी धीमी चलती है, वह उतनी बड़ी इकाई गिनती है।",
    "Sixty seconds make a minute, sixty minutes make an hour, and twenty-four hours make a day.": "साठ सेकंड से एक मिनट, साठ मिनट से एक घंटा, और चौबीस घंटे से एक दिन बनता है।",
    "You learned: 60 seconds a minute, 60 minutes an hour, 24 hours a day.": "तुमने सीखा: 60 सेकंड का मिनट, 60 मिनट का घंटा, 24 घंटे का दिन।",
    "Which is the largest of these units: a minute, an hour or a second?": "सबसे बड़ी इकाई कौन सी है? एक मिनट, एक घंटा या एक सेकंड।",
    "The largest unit?": "सबसे बड़ी इकाई?",
    "Which unit takes longest to go by?": "कौन सी इकाई सबसे देर में बीतती है?",
    "a minute": "एक मिनट", "an hour": "एक घंटा", "a second": "एक सेकंड",
    "Put these units in order from the smallest to the largest: an hour, a second, a day, a minute.": "इन इकाइयों को सबसे छोटी से सबसे बड़ी के क्रम में लगाओ: एक घंटा, एक सेकंड, एक दिन, एक मिनट।",
    "Order the rungs, smallest at the foot.": "पायदान क्रम में लगाओ, सबसे छोटा नीचे।",
    "Sixty seconds sounds like a lot. Is it longer than one minute, or just the same?": "साठ सेकंड बहुत लगते हैं। क्या वे एक मिनट से लंबे हैं, या बिल्कुल बराबर?",
    "Put all four rungs on the ladder first.": "पहले चारों पायदान सीढ़ी पर लगाओ।",
    "Two tags now read 60. The top tag is still empty. How many hours make one day?": "अब दो टैग पर 60 लिखा है। सबसे ऊपर का टैग अभी खाली है। एक दिन में कितने घंटे होते हैं?",
    "Hours in one day?": "एक दिन में कितने घंटे?",
    "Not every tag is the same. Count the hours from one midnight to the next.": "हर टैग एक जैसा नहीं है। एक आधी रात से अगली आधी रात तक के घंटे गिनो।",
    "day": "दिन", "hour": "घंटा", "minute": "मिनट", "tags": "टैग", "top": "ऊपर",
    "1 hour": "1 घंटा", "60 minutes": "60 मिनट", "largest": "सबसे बड़ी", "1 minute": "1 मिनट", "1 day": "1 दिन", "24 hours": "24 घंटे",
    "top: day": "ऊपर: दिन", "foot: second": "नीचे: सेकंड",
    /* phase 3 */
    "Larger to smaller: multiply": "बड़ी से छोटी: गुणा करो",
    "Each of these breaks into how many of the next? So how many are there in all?": "इनमें से हर एक अगली इकाई के कितनों में टूटता है? तो कुल कितने हुए?",
    "How many cells does one tile open into?": "एक टाइल खुलकर कितने खाने बनती है?",
    "Open the row and count one bar of cells. Every tile gives a bar just the same.": "पंक्ति खोलो और खानों की एक पट्टी गिनो। हर टाइल बिल्कुल ऐसी ही एक पट्टी देती है।",
    "To change a larger unit into a smaller one, multiply by the number of small units in one large one.": "बड़ी इकाई को छोटी में बदलना हो तो गुणा करो। गुणा उस संख्या से करो जितनी छोटी इकाइयाँ एक बड़ी में हैं।",
    "You learned: to change a larger unit to a smaller one, multiply.": "तुमने सीखा: बड़ी इकाई को छोटी में बदलने के लिए गुणा करो।",
    "How many minutes are there in 3 hours?": "3 घंटे में कितने मिनट होते हैं?",
    "3 hours in minutes?": "3 घंटे में कितने मिनट?",
    "Look at the tag under the hour rung. Is an hour really a hundred minutes?": "घंटे वाले पायदान के नीचे का टैग देखो। क्या एक घंटा सच में सौ मिनट का होता है?",
    "Now the top rung. How many hours do 9 days make?": "अब सबसे ऊपर का पायदान। 9 दिन में कितने घंटे होते हैं?",
    "9 days in hours?": "9 दिन में कितने घंटे?",
    "A day is not sixty hours. Which number sits between the day and the hour?": "एक दिन साठ घंटे का नहीं होता। दिन और घंटे के बीच कौन सी संख्या है?",
    "And 14 minutes: how many seconds is that?": "और 14 मिनट: वह कितने सेकंड हुए?",
    "14 minutes in seconds?": "14 मिनट में कितने सेकंड?",
    "A minute tile opens into one bar. How many seconds fill a bar?": "मिनट की एक टाइल खुलकर एक पट्टी बनती है। एक पट्टी में कितने सेकंड होते हैं?",
    "opened": "खुलीं", "more": "और", "hours": "घंटे", "days": "दिन",
    "180 minutes": "180 मिनट", "216 hours": "216 घंटे", "840 seconds": "840 सेकंड",
    /* phase 4 */
    "Two units into one": "दो इकाइयों से एक",
    "Break the hours into minutes first. Now, what about the minutes that were already there?": "पहले घंटों को मिनटों में तोड़ो। अब, जो मिनट पहले से थे, उनका क्या?",
    "What happens to the part already in the smaller unit?": "जो भाग पहले से छोटी इकाई में है, उसका क्या होता है?",
    "Step the larger tiles down first. Then slide the other part in beside them and add the two.": "पहले बड़ी टाइलें नीचे उतारो। फिर दूसरा भाग उनके पास सरकाओ और दोनों को जोड़ो।",
    "For a time in two units, change the larger unit, then add the part already in the smaller unit.": "दो इकाइयों वाले समय में, बड़ी इकाई को बदलो, फिर छोटी इकाई में पहले से मौजूद भाग जोड़ो।",
    "You learned: change the larger unit, then add the part already there.": "तुमने सीखा: बड़ी इकाई बदलो, फिर पहले से मौजूद भाग जोड़ो।",
    "Change 5 hours 18 minutes into minutes.": "5 घंटे 18 मिनट को मिनटों में बदलो।",
    "5 hours 18 minutes in minutes?": "5 घंटे 18 मिनट में कितने मिनट?",
    "Where did the 18 minutes in the box at the side go?": "बगल के डिब्बे वाले 18 मिनट कहाँ गए?",
    "This time it is 9 minutes 25 seconds. How many seconds is that in all?": "इस बार 9 मिनट 25 सेकंड हैं। कुल मिलाकर कितने सेकंड हुए?",
    "9 minutes 25 seconds in seconds?": "9 मिनट 25 सेकंड में कितने सेकंड?",
    "The 25 seconds are seconds already.": "25 सेकंड तो पहले से सेकंड में हैं।",
    "A song lasts 4 minutes 5 seconds. Which of these shows it in seconds?": "एक गाना 4 मिनट 5 सेकंड का है। इनमें से कौन सा उसे सेकंड में दिखाता है?",
    "Which is right?": "कौन सा सही है?",
    "Every minute opens into a bar of sixty seconds. Count the bars, then the rest.": "हर मिनट खुलकर साठ सेकंड की एक पट्टी बनता है। पहले पट्टियाँ गिनो, फिर बाकी।",
    "245 minutes": "245 मिनट", "240 seconds": "240 सेकंड", "245 seconds": "245 सेकंड", "540 seconds": "540 सेकंड",
    "318 minutes": "318 मिनट", "565 seconds": "565 सेकंड",
    /* free play */
    "clear": "साफ़ करो",
  },
  gu: {
    "Time Unit Ladder": "સમય એકમ સીડી",
    "Days, hours, minutes and seconds. How many of each make the next? First, the clock.": "દિવસ, કલાક, મિનિટ અને સેકન્ડ. દરેકના કેટલા મળીને પછીનો એકમ બને? પહેલાં ઘડિયાળ.",
    "Each tile opened into the right number, the part already there added on, and each answer given its unit.": "દરેક ટાઇલ સાચી સંખ્યામાં ખૂલી, પહેલેથી હતો તે ભાગ ઉમેરાયો, અને દરેક જવાબને તેનો એકમ મળ્યો.",
    "Free play. Put tiles on any rung and step them down, or send the second hand round.": "મુક્ત રમત. કોઈ પણ પગથિયા પર ટાઇલ મૂકો અને તેમને નીચે ઉતારો, અથવા સેકન્ડનો કાંટો ફેરવો.",
    /* phase 1 */
    "The second hand": "સેકન્ડનો કાંટો",
    "The thin hand is the second hand. Tap the clock to send it once round the face.": "પાતળો કાંટો સેકન્ડનો કાંટો છે. ઘડિયાળ પર ટૅપ કરો, તે ડાયલનું એક પૂરું ચક્કર લગાવશે.",
    "Here it runs much faster than real seconds.": "અહીં તે સાચી સેકન્ડ કરતાં ઘણો ઝડપથી ચાલે છે.",
    "How long does the second hand take to pass each small mark?": "સેકન્ડના કાંટાને દરેક નાનો કાપો પસાર કરવામાં કેટલો સમય લાગે છે?",
    "Count the small marks from 12 to 1. Each number on the face is that many marks further on.": "12 થી 1 સુધીના નાના કાપા ગણો. ડાયલ પરની દરેક સંખ્યા એટલા જ કાપા આગળ છે.",
    "The second hand goes round once every minute, so one minute is sixty seconds.": "સેકન્ડનો કાંટો દર મિનિટે એક ચક્કર લગાવે છે, એટલે એક મિનિટ સાઠ સેકન્ડની હોય છે.",
    "You learned: one lap of the second hand is one minute, sixty seconds.": "તમે શીખ્યા: સેકન્ડના કાંટાનું એક ચક્કર એક મિનિટ, એટલે સાઠ સેકન્ડ.",
    "How many seconds are there in one minute? Count the marks the thin hand passes.": "એક મિનિટમાં કેટલી સેકન્ડ હોય? પાતળો કાંટો જેટલા કાપા પસાર કરે, તે ગણો.",
    "Seconds in one minute?": "એક મિનિટમાં કેટલી સેકન્ડ?",
    "The twelve numbers are not the seconds. There are small marks between them too.": "બાર સંખ્યાઓ સેકન્ડ નથી. તેમની વચ્ચે નાના કાપા પણ છે.",
    "This time watch the blue minute hand. After one lap of the thin hand, how many marks has it moved?": "આ વખતે વાદળી મિનિટનો કાંટો જુઓ. પાતળા કાંટાના એક ચક્કર પછી તે કેટલા કાપા આગળ વધ્યો?",
    "Minute hand: how many marks?": "મિનિટનો કાંટો: કેટલા કાપા?",
    "Look closely at the end of the lap. Did the minute hand jump to the next number?": "ચક્કરના અંતે ધ્યાનથી જુઓ. શું મિનિટનો કાંટો આગળની સંખ્યા પર કૂદી ગયો?",
    "The second hand goes round the clock three times. How many seconds pass, and how far does the minute hand move?": "સેકન્ડનો કાંટો ઘડિયાળના ત્રણ ચક્કર લગાવે છે. કેટલી સેકન્ડ વીતે, અને મિનિટનો કાંટો કેટલો આગળ વધે?",
    "After 3 laps?": "3 ચક્કર પછી?",
    "Take it one lap at a time. What does each lap add?": "એક વખતે એક ચક્કર લો. દરેક ચક્કર કેટલું ઉમેરે છે?",
    "laps": "ચક્કર", "second": "સેકન્ડ", "seconds": "સેકન્ડ", "minutes": "મિનિટ",
    "minute mark": "મિનિટનો કાપો", "minute marks": "મિનિટના કાપા",
    "1 lap": "1 ચક્કર", "60 seconds": "60 સેકન્ડ", "1 mark": "1 કાપો", "180 seconds": "180 સેકન્ડ", "3 marks": "3 કાપા",
    /* phase 2 */
    "Sixty, sixty and twenty-four": "સાઠ, સાઠ અને ચોવીસ",
    "How many of the smaller unit make one of the bigger one?": "નાના એકમના કેટલા મળીને મોટા એકમનો એક બને?",
    "Think of one big unit opened up. How many smaller ones fill it?": "એક મોટા એકમને ખોલીને વિચારો. કેટલા નાના એકમ તેને ભરે છે?",
    "Think of the clock. The slower a hand moves, the bigger the unit it counts.": "ઘડિયાળ વિશે વિચારો. કાંટો જેટલો ધીમો ચાલે, તેટલો મોટો એકમ તે ગણે છે.",
    "Sixty seconds make a minute, sixty minutes make an hour, and twenty-four hours make a day.": "સાઠ સેકન્ડની એક મિનિટ, સાઠ મિનિટનો એક કલાક, અને ચોવીસ કલાકનો એક દિવસ બને છે.",
    "You learned: 60 seconds a minute, 60 minutes an hour, 24 hours a day.": "તમે શીખ્યા: 60 સેકન્ડની મિનિટ, 60 મિનિટનો કલાક, 24 કલાકનો દિવસ.",
    "Which is the largest of these units: a minute, an hour or a second?": "સૌથી મોટો એકમ કયો છે? એક મિનિટ, એક કલાક કે એક સેકન્ડ.",
    "The largest unit?": "સૌથી મોટો એકમ?",
    "Which unit takes longest to go by?": "કયો એકમ પસાર થવામાં સૌથી વધુ સમય લે છે?",
    "a minute": "એક મિનિટ", "an hour": "એક કલાક", "a second": "એક સેકન્ડ",
    "Put these units in order from the smallest to the largest: an hour, a second, a day, a minute.": "આ એકમોને સૌથી નાનાથી સૌથી મોટા ક્રમમાં ગોઠવો: એક કલાક, એક સેકન્ડ, એક દિવસ, એક મિનિટ.",
    "Order the rungs, smallest at the foot.": "પગથિયાં ક્રમમાં ગોઠવો, સૌથી નાનું નીચે.",
    "Sixty seconds sounds like a lot. Is it longer than one minute, or just the same?": "સાઠ સેકન્ડ ઘણી લાગે છે. શું તે એક મિનિટ કરતાં લાંબી છે, કે બરાબર સરખી?",
    "Put all four rungs on the ladder first.": "પહેલાં ચારેય પગથિયાં સીડી પર ગોઠવો.",
    "Two tags now read 60. The top tag is still empty. How many hours make one day?": "હવે બે ટૅગ પર 60 લખેલું છે. સૌથી ઉપરનું ટૅગ હજી ખાલી છે. એક દિવસમાં કેટલા કલાક હોય?",
    "Hours in one day?": "એક દિવસમાં કેટલા કલાક?",
    "Not every tag is the same. Count the hours from one midnight to the next.": "દરેક ટૅગ સરખું નથી. એક મધ્યરાત્રિથી બીજી મધ્યરાત્રિ સુધીના કલાક ગણો.",
    "day": "દિવસ", "hour": "કલાક", "minute": "મિનિટ", "tags": "ટૅગ", "top": "ઉપર",
    "1 hour": "1 કલાક", "60 minutes": "60 મિનિટ", "largest": "સૌથી મોટો", "1 minute": "1 મિનિટ", "1 day": "1 દિવસ", "24 hours": "24 કલાક",
    "top: day": "ઉપર: દિવસ", "foot: second": "નીચે: સેકન્ડ",
    /* phase 3 */
    "Larger to smaller: multiply": "મોટાથી નાનું: ગુણાકાર કરો",
    "Each of these breaks into how many of the next? So how many are there in all?": "આમાંનો દરેક પછીના એકમના કેટલામાં તૂટે છે? તો કુલ કેટલા થયા?",
    "How many cells does one tile open into?": "એક ટાઇલ ખૂલીને કેટલાં ખાનાં બને છે?",
    "Open the row and count one bar of cells. Every tile gives a bar just the same.": "હાર ખોલો અને ખાનાંની એક પટ્ટી ગણો. દરેક ટાઇલ બરાબર આવી જ એક પટ્ટી આપે છે.",
    "To change a larger unit into a smaller one, multiply by the number of small units in one large one.": "મોટા એકમને નાનામાં બદલવા ગુણાકાર કરો. એક મોટા એકમમાં જેટલા નાના એકમ હોય, તે સંખ્યાથી ગુણો.",
    "You learned: to change a larger unit to a smaller one, multiply.": "તમે શીખ્યા: મોટા એકમને નાનામાં બદલવા ગુણાકાર કરો.",
    "How many minutes are there in 3 hours?": "3 કલાકમાં કેટલી મિનિટ હોય?",
    "3 hours in minutes?": "3 કલાકમાં કેટલી મિનિટ?",
    "Look at the tag under the hour rung. Is an hour really a hundred minutes?": "કલાકના પગથિયા નીચેનું ટૅગ જુઓ. શું એક કલાક ખરેખર સો મિનિટનો હોય છે?",
    "Now the top rung. How many hours do 9 days make?": "હવે સૌથી ઉપરનું પગથિયું. 9 દિવસમાં કેટલા કલાક થાય?",
    "9 days in hours?": "9 દિવસમાં કેટલા કલાક?",
    "A day is not sixty hours. Which number sits between the day and the hour?": "એક દિવસ સાઠ કલાકનો નથી હોતો. દિવસ અને કલાક વચ્ચે કઈ સંખ્યા છે?",
    "And 14 minutes: how many seconds is that?": "અને 14 મિનિટ: તે કેટલી સેકન્ડ થાય?",
    "14 minutes in seconds?": "14 મિનિટમાં કેટલી સેકન્ડ?",
    "A minute tile opens into one bar. How many seconds fill a bar?": "મિનિટની એક ટાઇલ ખૂલીને એક પટ્ટી બને છે. એક પટ્ટીમાં કેટલી સેકન્ડ હોય?",
    "opened": "ખૂલી", "more": "વધુ", "hours": "કલાક", "days": "દિવસ",
    "180 minutes": "180 મિનિટ", "216 hours": "216 કલાક", "840 seconds": "840 સેકન્ડ",
    /* phase 4 */
    "Two units into one": "બે એકમમાંથી એક",
    "Break the hours into minutes first. Now, what about the minutes that were already there?": "પહેલાં કલાકને મિનિટમાં તોડો. હવે, જે મિનિટ પહેલેથી હતી, તેનું શું?",
    "What happens to the part already in the smaller unit?": "જે ભાગ પહેલેથી નાના એકમમાં છે, તેનું શું થાય?",
    "Step the larger tiles down first. Then slide the other part in beside them and add the two.": "પહેલાં મોટી ટાઇલ નીચે ઉતારો. પછી બીજો ભાગ તેમની બાજુમાં સરકાવો અને બંનેનો સરવાળો કરો.",
    "For a time in two units, change the larger unit, then add the part already in the smaller unit.": "બે એકમવાળા સમયમાં, મોટો એકમ બદલો, પછી નાના એકમમાં પહેલેથી હોય તે ભાગ ઉમેરો.",
    "You learned: change the larger unit, then add the part already there.": "તમે શીખ્યા: મોટો એકમ બદલો, પછી પહેલેથી હોય તે ભાગ ઉમેરો.",
    "Change 5 hours 18 minutes into minutes.": "5 કલાક 18 મિનિટને મિનિટમાં બદલો.",
    "5 hours 18 minutes in minutes?": "5 કલાક 18 મિનિટમાં કેટલી મિનિટ?",
    "Where did the 18 minutes in the box at the side go?": "બાજુના ડબ્બામાંની 18 મિનિટ ક્યાં ગઈ?",
    "This time it is 9 minutes 25 seconds. How many seconds is that in all?": "આ વખતે 9 મિનિટ 25 સેકન્ડ છે. કુલ કેટલી સેકન્ડ થઈ?",
    "9 minutes 25 seconds in seconds?": "9 મિનિટ 25 સેકન્ડમાં કેટલી સેકન્ડ?",
    "The 25 seconds are seconds already.": "25 સેકન્ડ તો પહેલેથી સેકન્ડમાં જ છે.",
    "A song lasts 4 minutes 5 seconds. Which of these shows it in seconds?": "એક ગીત 4 મિનિટ 5 સેકન્ડનું છે. આમાંથી કયું તેને સેકન્ડમાં બતાવે છે?",
    "Which is right?": "કયું સાચું છે?",
    "Every minute opens into a bar of sixty seconds. Count the bars, then the rest.": "દરેક મિનિટ ખૂલીને સાઠ સેકન્ડની એક પટ્ટી બને છે. પહેલાં પટ્ટીઓ ગણો, પછી બાકીની.",
    "245 minutes": "245 મિનિટ", "240 seconds": "240 સેકન્ડ", "245 seconds": "245 સેકન્ડ", "540 seconds": "540 સેકન્ડ",
    "318 minutes": "318 મિનિટ", "565 seconds": "565 સેકન્ડ",
    /* free play */
    "clear": "સાફ કરો",
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
    concept: "The second hand",
    conceptId: "M1.S2.T4.C12", objectiveIds: ["O5"],
    says: ["The thin hand is the second hand. Tap the clock to send it once round the face.",
      "Here it runs much faster than real seconds."],
    /* tries, as the plan writes it: first rung the item's own miss; second, how long the second hand takes to
       pass one mark; third, one stretch from one number to the next (five marks) before the whole lap. */
    ladder: ["How long does the second hand take to pass each small mark?","Count the small marks from 12 to 1. Each number on the face is that many marks further on."],
    closing: "The second hand goes round once every minute, so one minute is sixty seconds.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: one lap of the second hand is one minute, sixty seconds.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The second hand runs its laps again with a tick count that climbs mark by mark (5 at the one, 60 back at the twelve), and the minute hand's one-mark step is lit.",
    items: [
      /* practice 1: answer in the plan = Sixty seconds, counted by the thin second hand (the teach names the
         thin hand as the second hand; the slot takes the sixty) */
      { qid: "M1.S2.T4.C12:1", kind: "lap", laps: 1, answer: 60, near: 12, winMs: 2600,
        say: "How many seconds are there in one minute? Count the marks the thin hand passes.",
        ask: "Seconds in one minute?", miss: "The twelve numbers are not the seconds. There are small marks between them too.",
        thumb: ["1 lap", "60 seconds"] },
      /* authored: the plan's phase has two questions; this one takes the brief's second misconception (the
         minute hand jumps to the next number, five minutes) on its own before the two are asked together */
      { qid: null, kind: "step", laps: 1, answer: 1, near: 5, forms: ["1 mark", "one mark"], winMs: 2600,
        say: "This time watch the blue minute hand. After one lap of the thin hand, how many marks has it moved?",
        ask: "Minute hand: how many marks?", miss: "Look closely at the end of the lap. Did the minute hand jump to the next number?",
        thumb: ["1 lap", "1 mark"] },
      /* learn ML1: answer in the plan = One hundred and eighty seconds pass, and the minute hand moves three marks, which is three minutes */
      { qid: "M1.S2.T4.C12:ML1", kind: "laps", laps: 3, parts: [{ label: "seconds" }, { label: "minutes" }], answer: [180, 3], near: "36|15", winMs: 3000,
        say: "The second hand goes round the clock three times. How many seconds pass, and how far does the minute hand move?",
        ask: "After 3 laps?", miss: "Take it one lap at a time. What does each lap add?",
        thumb: ["180 seconds", "3 marks"] },
    ],
  },
  {
    n: 2,
    concept: "Sixty, sixty and twenty-four",
    conceptId: "M1.S2.T4.C13", objectiveIds: ["O5"],
    says: ["How many of the smaller unit make one of the bigger one?"],
    /* tries, as the plan writes it: first rung the item's own miss; second, how many of the smaller unit make one
       of the next; third, the two rungs minute and second on their own before the others come back. */
    ladder: ["Think of one big unit opened up. How many smaller ones fill it?", "Think of the clock. The slower a hand moves, the bigger the unit it counts."],
    closing: "Sixty seconds make a minute, sixty minutes make an hour, and twenty-four hours make a day.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: 60 seconds a minute, 60 minutes an hour, 24 hours a day.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "A tile of the bigger unit opens into cells of the smaller one (60 seconds fill a minute, 24 hours fill a day), and the right answer is drawn beside the child's own ladder.",
    items: [
      /* practice 2: answer in the plan = An hour */
      { qid: "M1.S2.T4.C13:2", kind: "largest", answer: "hour", near: "second", forms: ["hour is the largest", "hour is largest"], winMs: 2400,
        choices: [{ id: "minute", label: "a minute" }, { id: "hour", label: "an hour" }, { id: "second", label: "a second" }],
        say: "Which is the largest of these units: a minute, an hour or a second?",
        ask: "The largest unit?", miss: "Which unit takes longest to go by?",
        thumb: ["largest", "an hour"] },
      /* learn ML2: answer in the plan = A second, a minute, an hour, a day. Sixty seconds make a minute, sixty
         minutes make an hour, and twenty-four hours make a day. The order is built on the ladder here; its win
         fills the two sixty tags, and the day's tag is the next question. */
      /* the order is read from the top of the ladder down (the slot shows only the child's top rung) */
      { qid: "M1.S2.T4.C13:ML2", kind: "order", pad: "enter", answer: "day,hour,minute,second", near: "day,hour,second,minute", winMs: 3000,
        forms: ["second, minute, hour, day", "day, hour, minute, second", "day,hour,minute,second"],
        say: "Put these units in order from the smallest to the largest: an hour, a second, a day, a minute.",
        ask: "Order the rungs, smallest at the foot.",
        miss: "Sixty seconds sounds like a lot. Is it longer than one minute, or just the same?",
        thumb: ["top: day", "foot: second"] },
      /* authored: the rest of ML2 (how many of each make the next); the two sixties are filled by the order's win */
      { qid: null, kind: "day", answer: 24, near: 60, winMs: 2600,
        say: "Two tags now read 60. The top tag is still empty. How many hours make one day?",
        ask: "Hours in one day?", miss: "Not every tag is the same. Count the hours from one midnight to the next.",
        thumb: ["1 day", "24 hours"] },
    ],
  },
  {
    n: 3,
    concept: "Larger to smaller: multiply",
    conceptId: "M1.S2.T4.C14", objectiveIds: ["O6"],
    says: ["Each of these breaks into how many of the next? So how many are there in all?"],
    /* tries, as the plan writes it: first rung the item's own miss; second, how many cells one tile opens into;
       third, one tile opened and its cells counted before the whole row. */
    ladder: ["How many cells does one tile open into?", "Open the row and count one bar of cells. Every tile gives a bar just the same."],
    closing: "To change a larger unit into a smaller one, multiply by the number of small units in one large one.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: to change a larger unit to a smaller one, multiply.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The tiles step down one at a time, each opening into one bar of the rung below, the cells are counted bar by bar, and the multiplication is written with its total.",
    items: [
      /* practice 3: answer in the plan = 180 minutes */
      { qid: "M1.S2.T4.C14:3", kind: "multiply", from: 1, n: 3, answer: 180, near: 300, winMs: 2800,
        say: "How many minutes are there in 3 hours?", ask: "3 hours in minutes?",
        miss: "Look at the tag under the hour rung. Is an hour really a hundred minutes?", childBars: true,
        thumb: ["3 × 60", "180 minutes"] },
      /* learn ML3: answer in the plan = 216 hours */
      { qid: "M1.S2.T4.C14:ML3", kind: "multiply", from: 0, n: 9, answer: 216, near: 540, winMs: 2800,
        say: "Now the top rung. How many hours do 9 days make?", ask: "9 days in hours?",
        miss: "A day is not sixty hours. Which number sits between the day and the hour?",
        thumb: ["9 × 24", "216 hours"] },
      /* practice 4: answer in the plan = 840 seconds */
      { qid: "M1.S2.T4.C14:4", kind: "multiply", from: 2, n: 14, answer: 840, near: 1400, winMs: 2800,
        say: "And 14 minutes: how many seconds is that?", ask: "14 minutes in seconds?",
        miss: "A minute tile opens into one bar. How many seconds fill a bar?",
        thumb: ["14 × 60", "840 seconds"] },
      /* unused: practice 5 (a holiday class, 3 hours on each of 4 days, 720 minutes). Three a phase; the three
         kept step down each of the three rungs once (day to hour, hour to minute, minute to second). */
    ],
  },
  {
    n: 4,
    concept: "Two units into one",
    conceptId: "M1.S2.T4.C15", objectiveIds: ["O6"],
    says: ["Break the hours into minutes first. Now, what about the minutes that were already there?"],
    /* tries, as the plan writes it: first rung the item's own miss; second, what happens to the part already in
       the smaller unit; third, one hour and a few minutes before the larger time. */
    ladder: ["What happens to the part already in the smaller unit?", "Step the larger tiles down first. Then slide the other part in beside them and add the two."],
    closing: "For a time in two units, change the larger unit, then add the part already in the smaller unit.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: change the larger unit, then add the part already there.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The larger unit's tiles open into bars on the rung below, the part already in the smaller unit slides in beside them from the box at the side, and the add bar writes the total in the smaller unit.",
    items: [
      /* learn ML4: answer in the plan = 318 minutes */
      { qid: "M1.S2.T4.C15:ML4", kind: "two", from: 1, n: 5, extra: 18, answer: 318, near: 300, winMs: 2800,
        say: "Change 5 hours 18 minutes into minutes.", ask: "5 hours 18 minutes in minutes?",
        miss: "Where did the 18 minutes in the box at the side go?",
        thumb: ["5 × 60 + 18", "318 minutes"] },
      /* practice 6: answer in the plan = 565 seconds */
      { qid: "M1.S2.T4.C15:6", kind: "two", from: 2, n: 9, extra: 25, answer: 565, near: 925, winMs: 2800,
        say: "This time it is 9 minutes 25 seconds. How many seconds is that in all?", ask: "9 minutes 25 seconds in seconds?",
        miss: "The 25 seconds are seconds already.",
        thumb: ["9 × 60 + 25", "565 seconds"] },
      /* practice 8: answer in the plan = 245 seconds. The minutes were changed into seconds, so the answer is in
         seconds, not minutes. The plan's stem prints 245 ("writes 245 minutes"), and 245 seconds would then be
         the one choice sharing its digits, so the stem leaves the number out: four choices, each wrong one a
         misconception (the plan's 245 minutes, the 5 left out, the 5 multiplied too) */
      { qid: "M1.S2.T4.C15:8", kind: "unit", from: 2, n: 4, extra: 5, answer: "245 seconds", near: "245 minutes", forms: ["245 seconds", "245"], winMs: 2800,
        choices: [{ id: "245 minutes", label: "245 minutes" }, { id: "240 seconds", label: "240 seconds" }, { id: "245 seconds", label: "245 seconds" }, { id: "540 seconds", label: "540 seconds" }],
        say: "A song lasts 4 minutes 5 seconds. Which of these shows it in seconds?",
        ask: "Which is right?", miss: "Every minute opens into a bar of sixty seconds. Count the bars, then the rest.",
        thumb: ["4 × 60 + 5", "245 seconds"] },
      /* unused: practice 7 (a film, 2 hours 52 minutes, 172 minutes). Three a phase; it is the same kind as ML4
         (hours and minutes into minutes), and the unit question tests the phase's last step. */
    ],
  },
];

/* The ladder: rung k is 0 day, 1 hour, 2 minute, 3 second (largest at the top). TL_EX[k] is how many of
   rung k+1 make one of rung k: 24 hours a day, 60 minutes an hour, 60 seconds a minute. */
const TL_UNIT = ["day", "hour", "minute", "second"];
const TL_EX = [24, 60, 60];
const TL_OLIVE = "#7C8420";
const TL_BASE = [TL_OLIVE, CONTENT.pointer, CONTENT.hundred, CONTENT.bead];
const TL_PAINT = ["url(#tlDay)", "url(#gPointer)", "url(#gHundred)", "url(#gBead)"];
/* working-area geometry: label column, rung bodies, the tags at the right end between rungs */
const TL = { lx: 12, lw: 118, x: 140, w: 596, h: 92, top: 10, gap: 26, tagX: 744, tagW: 96, tagH: 44 };
const tlRowY = (k: number) => TL.top + k * (TL.h + TL.gap);
const tlTagY = (k: number) => tlRowY(k) + TL.h + TL.gap / 2; /* the centre of the tag between rung k and k+1 */
const tlInk = (k: number) => shade(TL_BASE[k], 0.25);
const tlId = (v: any) => v;   /* English: the words as they are (Work passes its `tx` for Hindi and Gujarati) */

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  units: TL_UNIT, exchange: TL_EX,
  ladder: { x: TL.x, w: TL.w, rungH: TL.h, rows: TL_UNIT.map((u, k) => ({ unit: u, y: tlRowY(k) })) },
  bar: { cellsPerRow: 10, minuteBarRows: 6, dayBarRows: [10, 10, 4], foldAfter: 3 },
};

/* one rung: its name at the left end, its body (a rail the tiles and cells sit on) */
function tlRung(C: any, k: number, o: any = {}) {
  const y = tlRowY(k), quiet = !!o.quiet;
  return (
    <g key={"rung" + k}>
      <text x={TL.lx + TL.lw - 8} y={y + (o.low ? 74 : TL.h / 2 + 11)} textAnchor="end" fontSize={T.label} fontWeight={700}
        fill={quiet ? "#767676" : tlInk(k)}>{(o.tx || tlId)(o.label ?? TL_UNIT[k])}</text>
      <rect x={TL.x} y={y} width={TL.w} height={TL.h} rx={14} fill={quiet ? "#FFFFFF" : tint(TL_BASE[k], o.lit ? 0.8 : 0.9)}
        stroke={C.ink} strokeWidth={o.lit ? 3 : 1.5} strokeDasharray={o.empty ? "10 10" : undefined} />
    </g>
  );
}
/* the exchange tag between rung k and k+1: blank until it is filled. o.times writes it as the multiplier
   going down ("× 24"); a long typed value shrinks, and past four digits only its first three show */
function tlTag(C: any, k: number, v: any, o: any = {}) {
  const cy = tlTagY(k), x = TL.tagX;
  let s = v === null || v === undefined ? "" : String(v);
  if (s.length > 4) s = s.slice(0, 3) + "…";
  const shown = s && o.times ? "× " + s : s;
  return (
    <g key={"tag" + k}>
      <line x1={TL.x + TL.w} y1={cy} x2={x} y2={cy} stroke={C.ink} strokeWidth={2} />
      <rect x={x} y={cy - TL.tagH / 2} width={TL.tagW} height={TL.tagH} rx={10} fill={o.lit ? tint(TL_BASE[k], 0.72) : "#FFFFFF"}
        stroke={C.ink} strokeWidth={o.lit ? 3 : 2} />
      {shown !== "" && (
        <text x={x + TL.tagW / 2} y={cy + (s.length > 2 ? 10 : 11)} textAnchor="middle" fontSize={s.length > 2 ? T.micro : T.label} fontWeight={700} fill={C.ink}>{shown}</text>
      )}
    </g>
  );
}
/* a count of cells in rows of ten: 60 is six rows of ten, 24 is ten, ten and four (never a hundred square) */
const tlRows = (count: number) => { const r: number[] = []; for (let left = count; left > 0; left -= 10) r.push(Math.min(10, left)); return r; };
/* cells of rung k (their colour) from (x, y), `pitch` apart */
function tlCells(k: number, x: number, y: number, count: number, pitch: number, key: any) {
  const out: any[] = [];
  tlRows(count).forEach((cnt, r) => {
    for (let c = 0; c < cnt; c++) out.push(<rect key={r * 10 + c} x={x + c * pitch} y={y + r * pitch} width={pitch - 2} height={pitch - 2} rx={1.5} fill={TL_BASE[k]} />);
  });
  return <g key={key}>{out}</g>;
}
/* one tile of rung k: solid, or an empty dashed outline once it has been opened */
function tlTile(k: number, x: number, y: number, w: number, h: number, open: boolean, key: any) {
  if (open) return <rect key={key} x={x} y={y} width={w} height={h} rx={8} fill="#FFFFFF" stroke={tlInk(k)} strokeWidth={2} strokeDasharray="6 5" />;
  return (
    <g key={key}>
      <rect x={x} y={y} width={w} height={h} rx={8} fill={TL_PAINT[k]} stroke={shade(TL_BASE[k], 0.25)} strokeWidth={2} />
      <path d={`M ${x + 6} ${y + 5} H ${x + w - 6}`} stroke="#FFFFFF" strokeOpacity={0.7} strokeWidth={3} strokeLinecap="round" />
    </g>
  );
}
/* what sits on rung k: `tiles` tiles (the first `opened` of them empty; past nine, two rows), then `bars` bars
   of `size` cells that came down from the rung above (as many as fit, at most o.maxBars, the rest folded into a
   stack with their number beside it), then `extra` cells slid in from the side bay in their own block at the
   right end with a "+18" caption. o.button keeps 96 clear at the right for the step-down button; o.reserve keeps
   the side bay's block free before it arrives. hi = the bar being counted (past the shown ones: the stack),
   -2 = the side bay's cells. Everything stops at the rung's edge. */
const TL_CELL = 12;                                   /* a cell's pitch: a bar of sixty is 118 x 70 */
const TL_BTN = 52;                                    /* the step-down button's centre, this far in from the rung's right end,
                                                         so its invite ring (40) stays 12 inside the rung */
const TL_BAR_W = 10 * TL_CELL - 2;
function tlRow(C: any, k: number, o: any) {
  const y = tlRowY(k), out: any[] = [];
  const R = TL.x + TL.w - (o.button ? TL_BTN + 52 : 12);   /* 26 clear of the button's face */
  let x = TL.x + 12;
  const n = o.tiles || 0;
  if (n > 0) {
    const two = n > 9, per = two ? Math.ceil(n / 2) : n;
    const tw = Math.min(52, Math.floor((R - x - (per - 1) * 8) / per)), th = two ? 34 : 64;
    for (let i = 0; i < n; i++) {
      const r = two ? Math.floor(i / per) : 0, c = two ? i % per : i;
      out.push(tlTile(k, x + c * (tw + 8), y + (two ? 10 + r * 40 : 14), tw, th, i < (o.opened || 0), "t" + i));
    }
    x += per * (tw + 8) + 6;
  }
  const bars = o.bars || 0;
  const RB = o.extra || o.reserve ? TL.x + TL.w - 12 - TL_BAR_W - 24 : R;
  const more = (m: number) => indian(m) + " " + (o.tx || tlId)("more");   /* "1,437 more" (the word through TR) */
  const moreW = (m: number) => more(m).length * 16.5;
  if (bars > 0) {
    const bh = tlRows(o.size).length * TL_CELL - 2, by = y + (TL.h - bh) / 2;
    let shown = 0;
    while (shown < bars && shown < (o.maxBars ?? 3)) {
      const rest = bars - shown - 1;
      if (x + TL_BAR_W + (rest > 0 ? 12 + 44 + 10 + moreW(rest) : 0) > RB) break;
      if (o.hi === shown) out.push(<rect key={"hb" + shown} x={x - 5} y={by - 5} width={TL_BAR_W + 10} height={bh + 10} rx={6} fill="none" stroke={C.accent} strokeWidth={4} />);
      out.push(tlCells(k, x, by, o.size, TL_CELL, "b" + shown));
      x += TL_BAR_W + 12; shown++;
    }
    const rest = bars - shown;
    if (rest > 0) {
      const py = y + 18;
      out.push(
        <g key="pile">
          {[8, 4, 0].map((d) => <rect key={d} x={x + d} y={py + 8 - d} width={36} height={40} rx={5} fill={tint(TL_BASE[k], 0.45)} stroke={shade(TL_BASE[k], 0.25)} strokeWidth={2} />)}
          {o.hi >= shown && <rect x={x - 5} y={py - 5} width={54} height={62} rx={6} fill="none" stroke={C.accent} strokeWidth={4} />}
          <text x={x + 54} y={y + TL.h / 2 + 10} fontSize={T.micro} fontWeight={700} fill={tlInk(k)}>{more(rest)}</text>
        </g>
      );
    }
  }
  if (o.extra) {
    const ex = TL.x + TL.w - 12 - TL_BAR_W, eh = tlRows(o.extra).length * TL_CELL - 2, ey = y + 36;
    if (o.hi === -2) out.push(<rect key="he" x={ex - 5} y={y + 4} width={TL_BAR_W + 10} height={TL.h - 8} rx={6} fill="none" stroke={C.accent} strokeWidth={4} />);
    out.push(<text key="ecap" x={ex} y={y + 29} fontSize={T.micro} fontWeight={700} fill={tlInk(k)}>{"+" + o.extra}</text>);
    out.push(tlCells(k, ex, ey + Math.max(0, (TL.h - 40 - eh) / 2 - 4), o.extra, TL_CELL, "extra"));
  }
  return out;
}
/* the down arrow at a rung's right end: step this rung's tiles down */
function tlChevron(C: any, k: number) {
  const cx = TL.x + TL.w - TL_BTN, cy = tlRowY(k) + TL.h / 2;
  return (
    <g key="chev">
      <circle cx={cx} cy={cy} r={26} fill="url(#gKey)" stroke={C.ink} strokeWidth={2} />
      <path d={`M ${cx} ${cy - 13} V ${cy + 12} M ${cx - 10} ${cy + 3} L ${cx} ${cy + 13} L ${cx + 10} ${cy + 3}`} fill="none" stroke={C.ink} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}
/* a rung as a loose piece (phase 2): its colour, a tile swatch and its name */
function tlPiece(C: any, u: string, x: number, y: number, w: number, h: number, o: any = {}) {
  const k = TL_UNIT.indexOf(u);
  return (
    <g filter={o.flat ? undefined : o.lift ? "url(#fLift)" : "url(#fShadowSoft)"}>
      <rect x={x} y={y} width={w} height={h} rx={14} fill={tint(TL_BASE[k], 0.88)} stroke={o.ring ? C.accent : shade(TL_BASE[k], 0.25)} strokeWidth={o.ring ? 5 : o.flat ? 1.5 : 2.5} />
      <rect x={x + 16} y={y + h / 2 - 22} width={26} height={44} rx={6} fill={TL_PAINT[k]} />
      <text x={x + 56} y={y + h / 2 + 11} fontSize={T.label} fontWeight={700} fill={tlInk(k)}>{(o.tx || tlId)(u)}</text>
    </g>
  );
}
/* the running count, in the runs zone above the working area */
function tlRuns(C: any, label: string, a: number, b: number) {
  return (
    <g data-zone="runs">
      <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
      <text x={24} y={-44} fontSize={T.label} fontWeight={600} fill={C.ink}>{label}</text>
      <text x={306} y={-44} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{a + " / " + b}</text>
    </g>
  );
}
/* a clock face at 8:20 with its three hands: o.sec the second hand (marks), o.lit the marks it has passed this
   lap, o.minStep the marks the minute hand has stepped on (lit as an arc when o.arc), o.small a small face */
function tlClock(C: any, cx: number, cy: number, r: number, o: any) {
  const at = (m: number, rr: number) => [cx + rr * Math.sin((m * Math.PI) / 30), cy - rr * Math.cos((m * Math.PI) / 30)];
  const lit = o.lit || 0, sm = !!o.small;
  const minAt = 20 + (o.minStep || 0), hourAt = (8 + minAt / 60) * 5;
  const hand = (m: number, len: number, wd: number, col: string, tail: number) => {
    const [x2, y2] = at(m, len), [x1, y1] = tail ? at(m + 30, tail) : [cx, cy];
    return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={col} strokeWidth={wd} strokeLinecap="round" />;
  };
  const [ax1, ay1] = at(20, r - 9), [ax2, ay2] = at(minAt, r - 9);
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#FFFFFF" stroke={C.ink} strokeWidth={sm ? 3 : 4} filter="url(#fShadowSoft)" />
      {Array.from({ length: 60 }).map((_, m) => {
        const long = m % 5 === 0, on = lit > 0 && ((m >= 1 && m <= lit) || (m === 0 && lit >= 60));
        const [x1, y1] = at(m, r - (long ? r * 0.1 : r * 0.055) - (on ? r * 0.03 : 0)), [x2, y2] = at(m, r - 5);
        return <line key={m} x1={x1} y1={y1} x2={x2} y2={y2} stroke={on ? shade(CONTENT.bead, 0.1) : C.ink} strokeWidth={on ? (sm ? 3 : 6) : long ? (sm ? 3 : 4) : 2} strokeLinecap="round" />;
      })}
      {o.arc && minAt > 20 && (
        <path d={`M ${ax1} ${ay1} A ${r - 9} ${r - 9} 0 0 1 ${ax2} ${ay2}`} fill="none" stroke={CONTENT.hundred} strokeWidth={10} strokeLinecap="round" />
      )}
      {/* the hour hand shortest and thickest, the minute hand inside the numerals, the thin second hand longest */}
      {hand(hourAt, r * 0.45, sm ? 7 : 14, CONTENT.pointer, 0)}
      {hand(minAt, r * 0.62, sm ? 5 : 9, CONTENT.hundred, 0)}
      {hand(o.sec || 0, r * 0.9, sm ? 3 : 6, shade(CONTENT.bead, 0.25), r * 0.16)}
      <circle cx={cx} cy={cy} r={sm ? 6 : 11} fill={C.ink} />
      {/* the numerals over the hands, each on its own white disc, so a passing hand goes under it, never through it */}
      {(sm ? [12, 3, 6, 9] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).map((h) => {
        const [x, y] = at(h * 5, r * (sm ? 0.7 : 0.76));
        return (
          <g key={"h" + h}>
            <circle cx={x} cy={y} r={sm ? 15 : h > 9 ? 23 : 18} fill="#FFFFFF" />
            <text x={x} y={y + (sm ? 10 : 11)} textAnchor="middle" fontSize={sm ? T.micro : T.label} fontWeight={600} fill={C.ink}>{h}</text>
          </g>
        );
      })}
    </g>
  );
}
function tlDefs() {
  return (
    <defs>
      <linearGradient id="tlDay" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={tint(TL_OLIVE, 0.3)} />
        <stop offset="1" stopColor={TL_OLIVE} />
      </linearGradient>
    </defs>
  );
}

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
/* an order of units, from the foot of the ladder up, as "second,minute,hour,day" (an array, commas or spaces;
   "seconds" and "second" alike) */
const tlOrderOf = (v: any) => (Array.isArray(v) ? v : String(v ?? "").split(/[\s,|]+/)).filter((x: any) => x !== "" && x !== null)
  .map((x: any) => String(x).trim().toLowerCase().replace(/s$/, "")).join(",");
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (item.kind === "order") return tlOrderOf(v) === item.answer;
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work: each unit in
   seconds, counted up by repeated adding, and every answer worked from those counts */
const tlOracleOf = (it: any): any => {
  const SEC: any = { second: 1, minute: 0, hour: 0, day: 0 };
  for (let s = 0; s < 60; s++) SEC.minute += SEC.second;          /* sixty marks, one second each */
  for (let m = 0; m < 60; m++) SEC.hour += SEC.minute;
  for (let h = 0; h < 24; h++) SEC.day += SEC.hour;
  const names = ["day", "hour", "minute", "second"];
  const inNext = (k: number) => SEC[names[k]] / SEC[names[k + 1]];
  const times = (a: number, b: number) => { let t = 0; for (let i = 0; i < a; i++) t += b; return t; };
  if (it.kind === "lap") return times(it.laps, SEC.minute);
  if (it.kind === "step") return it.laps;                           /* one minute a lap, one mark a minute */
  if (it.kind === "laps") return [times(it.laps, SEC.minute), it.laps];
  if (it.kind === "largest") return it.choices.map((c: any) => c.id).sort((a: string, b: string) => SEC[b] - SEC[a])[0];
  if (it.kind === "order") return names.slice().sort((a, b) => SEC[b] - SEC[a]).join(",");   /* from the top down */
  if (it.kind === "day") return SEC.day / SEC.hour;
  if (it.kind === "multiply") return times(it.n, inNext(it.from));
  if (it.kind === "two") return times(it.n, inNext(it.from)) + it.extra;
  if (it.kind === "unit") return (times(it.n, inNext(it.from)) + it.extra) + " " + names[it.from + 1] + "s";
  return undefined;
};
const oracle = () => PHASES.every((p: any) => p.items.length === 3
  && p.items.every((it: any) => JSON.stringify(tlOracleOf(it)) === JSON.stringify(it.answer)));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => (item.near !== undefined ? item.near
  : item.parts ? item.answer.map((x: any, k: number, a: any[]) => (x !== null && a.slice(k + 1).every((y: any) => y === null) ? x + 1 : x ?? "")).join("|")
  : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print (an item's own `forms` when the
   answer is a word, an order or a unit: a choice question names its options, which is not a giveaway) */
const answerForms = (item: any) => (item.forms ? item.forms
  : item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
  : /^\d*\.\d+$/.test(String(item.answer)) ? [String(item.answer), speakable(item.answer)] : [String(item.answer)]);
/* what the slot shows: an order of the four rungs would not fit, so the slot names only the child's top rung
   (the whole order stands on the ladder); every other value as it is */
const tlFormat = (v: any, j?: any, how?: any) => {
  const o = tlOrderOf(v).split(",");
  const tx = (how && how.tx) || tlId;   /* the runtime passes { lang, tx }: "top" and the unit in the language in use */
  return o.length === 4 && o.every((u: string) => TL_UNIT.includes(u)) ? tx("top") + ": " + tx(o[0]) : String(v ?? "");
};
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
/* per-question state of the working area (Work is remounted per phase, not per question) */
function tlFresh(n: number, item: any, free: boolean): any {
  if (free) return { tiles: [1, 0, 0, 0], bars: [0, 0, 0, 0], eq: null, sec: 0, lit: 0, laps: 0, minStep: 0, running: false };
  if (n === 1) return { sec: 0, lit: 0, laps: 0, ran: 0, minStep: 0, running: false, count: null, show: false, tb: false };
  if (n === 2) return { place: item && item.kind === "day" ? TL_UNIT.slice() : [null, null, null, null], demo: 0, sent: null, tb: false };
  return { opened: 0, slid: false, count: null, total: false, hi: -1, tb: false };
}
/* phase 2: the loose rungs, jumbled at the right (the order the question names them in) */
const TL_JUMBLE: any = { largest: ["minute", "hour", "second"], order: ["hour", "second", "day", "minute"] };
const TL_JX = [874, 880, 870, 878];   /* 30 or more clear of the tags (they end at 840), 10 or more inside the edge */
const TL_JW = 196;
const tlJumbleY = (j: number) => 18 + j * 122;
/* phase 4: the side bay (the part already in the smaller unit) and the add bar under the ladder */
const TL_BAY = { x: 858, y: 64, w: 212, h: 150 };
const TL_ADD = { y: 470, h: 48 };

function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  /* every English word the picture draws goes through tx("...") (its key is added to TR); a number in words
     is wordsIn(n, lang) */
  const C = api.C;
  const act = useTimeline();   /* the child's own motion: a lap of the second hand, a row stepping down */
  const fix = useTimeline();   /* the traceback */
  const wob = useTimeline();   /* free play: a full rung shakes its head */
  const free = stage === "free";
  const key = free ? "free" : n + ":" + index;
  const [st, setSt] = useState<any>(null);
  const S = st && st.k === key ? st : { k: key, ...tlFresh(n, item, free) };
  const live = useRef<any>(S);
  live.current = S;
  const put = (patch: any) => setSt((prev: any) => {
    const base = prev && prev.k === key ? prev : { k: key, ...tlFresh(n, item, free) };
    const next = { ...base, ...(typeof patch === "function" ? patch(base) : patch) };
    live.current = next;
    return next;
  });
  useEffect(() => () => { act.stop(); fix.stop(); }, [key]);
  /* the child may act: a question is open, or its teach is being said (the teach says "Tap the clock", so a tap
     then must answer at once), or free play; and no correction is being drawn */
  const acting = stage === "ask" || stage === "teach";
  const open = (acting || free) && !S.tb;

  /* ── phase 1: the second hand ── */
  const lapSteps = (laps: number, ms: number, counting: boolean) => {
    const steps: any[] = [];
    for (let L = 0; L < laps; L++) {
      for (let m = 1; m <= 60; m++) steps.push([ms, () => {
        put((b: any) => ({ sec: m, lit: m, count: counting ? b.laps * 60 + m : b.count }));
        if (m % 5 === 0) api.sfx.tick();
      }]);
      const lastLap = L === laps - 1;
      steps.push([counting ? 350 : 250, () => put((b: any) => ({ sec: 0, laps: b.laps + 1, ran: Math.max(b.ran || 0, b.laps + 1), minStep: b.minStep + 1, running: !lastLap && !counting }))]);
    }
    return steps;
  };
  const runLap = () => {
    const b = live.current;
    if (!open || b.running) return;
    const asked = item.laps || 1;
    if (!free && b.laps >= asked) {
      /* again: the hands go back to where they started and the laps asked for run once more (no count shown) */
      put({ running: true, sec: 0, lit: 0, laps: 0, minStep: 0 });
      act.run([[250, null], ...lapSteps(asked, asked > 1 ? 45 : 70, false)]);
      return;
    }
    put({ running: true, sec: 0, lit: 0 });
    act.run([[120, null], ...lapSteps(1, 70, false)]);
  };
  const fix1 = (done: any) => {
    put({ tb: true, running: false, sec: 0, lit: 0, laps: 0, minStep: 0, count: 0, show: false });
    fix.run([[500, null], ...lapSteps(item.laps || 1, (item.laps || 1) > 1 ? 28 : 55, true), [200, () => put({ tb: false, show: true })]], done);
  };

  /* ── phase 2: the rungs in order, and the tags ── */
  const dropPiece = (u: string, p: any, moved: boolean) => {
    const place = live.current.place.slice(), cur = place.indexOf(u);
    if (!moved) {
      /* a tap: a loose rung goes on the lowest empty place (the question goes smallest first); a placed one comes off */
      if (cur >= 0) place[cur] = null;
      else { const k = [3, 2, 1, 0].find((j) => !place[j]); if (k === undefined) return; place[k] = u; }
    } else {
      const k = Math.floor((p.y - TL.top + TL.gap / 2) / (TL.h + TL.gap));
      const onLadder = p.x >= TL.x - 40 && p.x <= TL.x + TL.w + 40 && p.y > -20 && p.y < tlRowY(3) + TL.h + 30 && k >= 0 && k <= 3;
      if (!onLadder) { if (cur >= 0) place[cur] = null; }
      else { const other = place[k]; if (cur >= 0) place[cur] = other || null; place[k] = u; }
    }
    api.sfx.tick();
    put({ place, demo: 0 });
  };
  const enterOrder = () => {
    const b = live.current;
    if (b.tb || stage !== "ask") return;
    if (!b.place.every((u: any) => !!u)) { api.say("Put all four rungs on the ladder first."); return; }
    const v = b.place.join(", ");        /* from the top of the ladder down */
    if (wrong && b.sent === v) return;   /* this very order was judged already: Enter waits for a change */
    put({ sent: v });
    api.submit(v);
  };
  const setOrder = (v: any) => {
    const us = tlOrderOf(v).split(",");
    if (us.length !== 4 || !us.every((u: string) => TL_UNIT.includes(u))) return false;
    const place = us.slice();            /* given from the top down, as the answer is */
    live.current = { ...live.current, place, demo: 0 };
    put({ place, demo: 0 });
    return true;
  };
  const fix2 = (done: any) => {
    const kind = item.kind, steps: any[] = [[350, null]];
    put({ tb: true, demo: 0 });
    if (kind === "largest") [1, 2, 3, 4].forEach((d) => steps.push([750, () => put({ demo: d })]));
    else if (kind === "order") [1, 2, 3, 4, 5].forEach((d) => steps.push([600, () => put({ demo: d })]));
    else {
      steps.push([500, () => put({ demo: 1 })]);
      for (let c = 1; c <= 24; c++) steps.push([c % 10 === 0 ? 260 : 70, () => put({ demo: 1 + c })]);
      steps.push([300, () => put({ demo: 26 })]);
    }
    steps.push([200, () => put({ tb: false })]);
    fix.run(steps, done);
  };

  /* ── phases 3 and 4: step down, slide in ── */
  const stepDown = () => {
    const b = live.current, nT = item.n;
    if (!open || b.opened >= nT) return;
    const ms = nT > 6 ? 140 : 260, steps: any[] = [];
    for (let i = b.opened; i < nT; i++) steps.push([ms, () => { put({ opened: i + 1 }); api.sfx.tick(); }]);
    act.run(steps);
  };
  const slideIn = () => {
    if (!open || live.current.slid) return;
    put({ slid: true });
    api.sfx.tick();
  };
  const fix34 = (done: any) => {
    const nT = item.n, ex = TL_EX[item.from], two = n === 4;
    put({ tb: true, opened: 0, slid: false, count: 0, total: false, hi: -1 });
    const steps: any[] = [[450, null]];
    for (let i = 0; i < nT; i++) steps.push([nT > 9 ? 170 : 320, () => put({ opened: i + 1, count: (i + 1) * ex, hi: i })]);
    if (two) steps.push([700, () => put({ slid: true, count: nT * ex + item.extra, hi: -2 })]);
    steps.push([500, () => put({ tb: false, total: true, count: null, hi: -1 })]);
    fix.run(steps, done);
  };

  /* ── free play: any tiles on any rung, stepped down as far as a finger likes ── */
  const addTile = (k: number) => {
    const b = live.current;
    if (!free) return;
    if (b.tiles[k] >= 5) {
      /* five tiles is a full rung: it shakes instead of taking one more */
      wob.run([[70, () => put({ wobK: k, wobX: 8 })], [70, () => put({ wobX: -8 })], [70, () => put({ wobX: 5 })], [70, () => put({ wobX: 0 })]]);
      return;
    }
    const tiles = b.tiles.slice(); tiles[k] += 1;
    put({ tiles, eq: null }); api.sfx.tick();   /* the add bar's last sum no longer holds once a tile is added */
  };
  const stepFree = (k: number) => {
    const b = live.current;
    if (k >= 3) return;
    const units = b.tiles[k] + (k > 0 ? b.bars[k] * TL_EX[k - 1] : 0);
    if (!units) return;
    const tiles = b.tiles.slice(), bars = b.bars.slice();
    tiles[k] = 0; bars[k] = 0; bars[k + 1] += units;
    put({ tiles, bars, eq: { k, a: units } }); api.sfx.tick();
  };
  const clearFree = () => { act.stop(); put({ tiles: [1, 0, 0, 0], bars: [0, 0, 0, 0], eq: null, sec: 0, lit: 0, running: false }); };

  /* every drop and every tap on a piece (a move under 8 units, Enter or Space is a tap) */
  const dg = useDrag((pay: any, p: any, moved: boolean) => {
    if (!open || !pay) return;
    const mv = moved && !isNaN(p.x) && !isNaN(p.y);
    if (pay.kind === "piece") dropPiece(pay.u, p, mv);
    else if (pay.kind === "row") {
      if (mv && p.y < tlRowY(pay.k) + TL.h * 0.75) return;   /* not taken down towards the rung below */
      if (free) stepFree(pay.k); else stepDown();
    } else if (pay.kind === "bay") {
      const k = item.from + 1;
      if (mv && !(p.x > TL.x - 20 && p.x < TL.x + TL.w + 60 && p.y > tlRowY(k) - 40 && p.y < tlRowY(k) + TL.h + 40)) return;
      slideIn();
    }
  });

  /* Enter goes to the working area only while the rungs are being ordered */
  api.onEnter(!free && n === 2 && item.kind === "order" && stage === "ask" ? enterOrder : null);
  HOOK.set = !free && n === 2 && item.kind === "order" ? setOrder : null;

  /* the traceback: redraw the maths, end on the whole right answer, never mark anything */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    act.stop();
    const done = () => api.lock(false);
    if (n === 1) fix1(done); else if (n === 2) fix2(done); else fix34(done);
  }, [wrong]);
  /* a right answer: the picture settles on it */
  useEffect(() => {
    if (stage !== "win") return;
    act.stop();
    if (n === 1) put({ running: false, sec: 0, lit: 60, laps: item.laps, ran: item.laps, minStep: item.laps, count: item.laps * 60, show: true, tb: false });
    else if (n === 2) put(item.kind === "order" ? { place: TL_UNIT.slice(), demo: 0, tb: false } : { tb: false });
    else put({ opened: item.n, slid: true, total: true, count: null, hi: -1, tb: false });
  }, [stage, index]);

  /* what the host and the agent read back (toolApi.getState); never the answer before it is given */
  /* phase 2's tags as they stand: the two sixties after the order is won, the day's 24 once it is given */
  const p2tags = n === 2 && !free ? (item.kind === "day" ? [stage === "win" ? 24 : null, 60, 60]
    : item.kind === "order" && stage === "win" ? [null, 60, 60] : [null, null, null]) : null;
  api.share(free ? { tiles: S.tiles, bars: S.bars, exchanges: TL_EX }
    : n === 1 ? { lapsRun: S.ran || 0, secondsTicked: (S.laps || 0) * 60 + (S.running && S.sec > 0 ? S.lit : 0) }
    : n === 2 ? { rungs: S.place, exchanges: p2tags }
    : { tiles: item.n, opened: S.opened, sideBay: n === 4 ? (S.slid ? 0 : item.extra) : null, exchanges: TL_EX,
      /* the total in the smaller unit: only once the answer is given */
      total: stage === "win" ? item.n * TL_EX[item.from] + (item.extra || 0) : null,
      /* the unit the total lands in is the answer of the unit question: shared only once it is given */
      unit: item.kind === "unit" && stage !== "win" ? null : TL_UNIT[item.from + 1] });

  const d = dg.drag;
  /* the ladder's two rails, seen in the gaps between the rungs (from the hour down when the day is not in play) */
  const railsFrom = (k0: number) => (
    <g key="rails">
      {[TL.x + 26, TL.x + TL.w - 26].map((x) => <line key={x} x1={x} y1={tlRowY(k0) - 4} x2={x} y2={tlRowY(3) + TL.h + 4} stroke={C.ink} strokeWidth={5} strokeLinecap="round" />)}
    </g>
  );
  const rails = railsFrom(0);

  const draw1 = () => {
    const asked = item.laps || 1, cx = 318, cy = 262, r = 214;
    /* the clock can be run again before answering: the hands go back and the laps asked for run once more */
    const win = stage === "win", canRun = acting && !S.running && !S.tb;
    const count = win ? asked * 60 : S.count;
    const marks = win || S.show ? S.minStep : null;
    const showMarks = item.kind !== "lap" && marks !== null;
    return (
      <g>
        {tlRuns(C, tx("laps"), Math.min(S.ran || 0, asked), asked)}
        {tlClock(C, cx, cy, r, { sec: S.sec, lit: S.lit, minStep: S.minStep, arc: item.kind !== "lap" })}
        <Hit id="clock" x={cx - r} y={cy - r} w={2 * r} h={2 * r} onPress={runLap} label="send the second hand round" enabled={canRun} />
        {/* the invite rings the hub, where the hands meet, clear of every numeral */}
        {canRun && S.laps < asked && <Invite x={cx} y={cy} r={44} C={C} />}
        {count !== null && count !== undefined && (
          <g pointerEvents="none">
            <text x={640} y={190} fontSize={T.display} fontWeight={700} fill={shade(CONTENT.bead, 0.3)}>{indian(count)}</text>
            <text x={640} y={236} fontSize={T.label} fontWeight={600} fill={C.ink}>{count === 1 ? tx("second") : tx("seconds")}</text>
          </g>
        )}
        {showMarks && (
          <g pointerEvents="none">
            <text x={640} y={360} fontSize={T.display} fontWeight={700} fill={shade(CONTENT.hundred, 0.25)}>{marks}</text>
            <text x={640} y={406} fontSize={T.label} fontWeight={600} fill={C.ink}>{marks === 1 ? tx("minute mark") : tx("minute marks")}</text>
          </g>
        )}
      </g>
    );
  };

  const draw2 = () => {
    const kind = item.kind, win = stage === "win";
    const set: string[] = kind === "largest" ? TL_JUMBLE.largest : TL_JUMBLE.order;
    const tagsN = kind === "day" ? (win ? 3 : 2) : kind === "order" && win ? 2 : 0;
    const tags = kind === "day" ? [win ? 24 : typed || null, 60, 60] : tagsN ? [null, 60, 60] : [null, null, null];
    const rowOf = (u: string) => (kind === "order" ? S.place.indexOf(u)
      : kind === "day" || S.demo >= 1 || win ? TL_UNIT.indexOf(u) : -1);
    const used = [0, 1, 2, 3].map((k) => set.some((u) => rowOf(u) === k));
    const moving = kind === "order" && open;
    const allIn = kind === "order" && S.place.every((u: any) => !!u);
    /* the one invite: the place a tapped rung goes to (the lowest empty one), never a rung, so it names no unit */
    const nextPlace = kind === "order" && acting && !S.tb ? [3, 2, 1, 0].find((j) => !S.place[j]) : undefined;
    const dragU = d && d.payload && d.payload.kind === "piece" && d.moved ? d.payload.u : null;
    const order = dragU ? [...set.filter((u) => u !== dragU), dragU] : set;
    const rowMid = (k: number) => tlRowY(k) + TL.h / 2;
    return (
      <g>
        {tlRuns(C, tx("tags"), tagsN, 3)}
        {railsFrom(kind === "largest" ? 1 : 0)}
        {/* the choice question is about three units: three places, no day */}
        {[0, 1, 2, 3].map((k) => (used[k] || (kind === "largest" && k === 0) ? null : (
          <rect key={"empty" + k} x={TL.x} y={tlRowY(k)} width={TL.w} height={TL.h} rx={14} fill="#FFFFFF" stroke={C.ink} strokeWidth={1.5} strokeDasharray="10 10" />
        )))}
        {TL_EX.map((e, k) => (kind === "largest" && k === 0 ? null : tlTag(C, k, tags[k], { lit: kind === "day" && k === 0 })))}
        {order.map((u) => {
          const j = set.indexOf(u), k = rowOf(u);
          let x = TL_JX[j], y = tlJumbleY(j), w = TL_JW, h = 84;
          if (k >= 0) { x = TL.x; y = tlRowY(k); w = TL.w; h = TL.h; }
          if (u === dragU) { w = TL_JW; h = 84; x = d.x - w / 2; y = d.y - h / 2; }
          const ring = kind === "largest" && u === "hour" && (S.demo >= 4 || win);
          const props: any = moving ? {
            ...control("rung-" + u, u + " rung"), ...dg.bind({ kind: "piece", u }),
            onKeyDown: (e: any) => { if (e.key === "Enter" && allIn) return; dg.keys({ kind: "piece", u }).onKeyDown(e); },
          } : {};
          /* a rung that cannot move is drawn flat, with no lift or shadow of a piece */
          return <g key={u} {...props}>{tlPiece(C, u, x, y, w, h, { lift: u === dragU, ring, flat: !moving, tx })}</g>;
        })}
        {nextPlace !== undefined && <Invite x={TL.x + 60} y={tlRowY(nextPlace) + TL.h / 2} r={40} C={C} />}
        {/* the corrections, drawn over nothing the child can touch */}
        <g pointerEvents="none">
          {kind === "largest" && S.demo >= 2 && (
            <g>
              {tlTile(1, 330, tlRowY(1) + 14, 52, 64, false, "h1")}
              <text x={400} y={rowMid(1) + 10} fontSize={T.micro} fontWeight={700} fill={tlInk(1)}>{tx("1 hour")}</text>
              {tlCells(2, 330, rowMid(2) - 29, 60, 10, "m60")}
              <text x={446} y={rowMid(2) + 10} fontSize={T.micro} fontWeight={700} fill={tlInk(2)}>{tx("60 minutes")}</text>
            </g>
          )}
          {kind === "largest" && S.demo >= 3 && (
            <g>
              {tlCells(3, 330, rowMid(3) - 29, 60, 10, "s60")}
              <text x={446} y={rowMid(3) + 10} fontSize={T.micro} fontWeight={700} fill={tlInk(3)}>{tx("60 seconds")}</text>
            </g>
          )}
          {kind === "largest" && (S.demo >= 4 || win) && (
            <text x={TL.x + TL.w - 18} y={rowMid(1) + 10} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("largest")}</text>
          )}
          {kind === "order" && S.demo >= 1 && TL_UNIT.map((u, k) => (S.demo >= k + 2 ? (
            <text key={"lab" + k} x={TL.lx + TL.lw - 8} y={rowMid(k) + 11} textAnchor="end" fontSize={T.label} fontWeight={700} fill={tlInk(k)}>{tx(u)}</text>
          ) : null))}
          {kind === "order" && S.demo >= 1 && allIn && (
            <g>
              <text x={874} y={40} fontSize={T.micro} fontWeight={700} fill={tlInk(2)}>{tx("1 minute")}</text>
              <rect x={874} y={54} width={108} height={64} rx={6} fill={TL_PAINT[2]} stroke={shade(TL_BASE[2], 0.25)} strokeWidth={2} />
              {Array.from({ length: 60 }).map((_, c) => (
                <rect key={c} x={875 + (c % 10) * 10.6} y={55 + Math.floor(c / 10) * 10.4} width={8.6} height={8.4} rx={1.5} fill="#FFFFFF" stroke={TL_BASE[3]} strokeWidth={1.2} />
              ))}
              <text x={874} y={152} fontSize={T.micro} fontWeight={700} fill={tlInk(3)}>{tx("60 seconds")}</text>
            </g>
          )}
          {kind === "day" && S.demo >= 1 && (
            <g>
              {tlTile(0, 330, tlRowY(0) + 14, 52, 64, false, "d1")}
              <text x={400} y={rowMid(0) + 10} fontSize={T.micro} fontWeight={700} fill={tlInk(0)}>{tx("1 day")}</text>
              {tlCells(1, 330, rowMid(1) - 20, Math.min(24, Math.max(0, S.demo - 1)), 13, "h24")}
              {S.demo >= 26 && <text x={480} y={rowMid(1) + 11} fontSize={T.label} fontWeight={700} fill={tlInk(1)}>{tx("24 hours")}</text>}
            </g>
          )}
        </g>
      </g>
    );
  };

  const draw34 = () => {
    const from = item.from, to = from + 1, nT = item.n, ex = TL_EX[from], two = n === 4, win = stage === "win";
    const total = nT * ex + (two ? item.extra : 0), showTotal = S.total || win;
    const opened = win ? nT : S.opened, slid = win || S.slid;
    const rowLive = acting && !S.tb && opened < nT;
    const bayLive = two && acting && !S.tb && !slid;
    const unitWord = TL_UNIT[to] + "s", unitShown = tx(unitWord);
    const rowDy = d && d.payload && d.payload.kind === "row" && d.moved ? Math.max(0, Math.min(TL.h + TL.gap, d.y - (tlRowY(from) + TL.h / 2))) : 0;
    const bd = d && d.payload && d.payload.kind === "bay" && d.moved ? { x: d.x - (TL_BAY.x + TL_BAY.w / 2), y: d.y - (TL_BAY.y + TL_BAY.h / 2) } : { x: 0, y: 0 };
    const source = [...tlRow(C, from, { tiles: nT, opened, button: true, tx }), opened < nT ? tlChevron(C, from) : null];
    const counting = S.count !== null && S.count !== undefined;
    /* the add bar: the opened tiles' multiplication, then the side bay's part added on (two short labels) */
    const exprA = opened > 0 ? nT + " × " + ex : "";
    const exprB = two && slid ? (opened > 0 ? "+ " : "") + item.extra : "";
    const exprBx = TL.x + 20 + (exprA ? exprA.length * 17.5 + 14 : 0);
    /* after the hundred-minute slip (the child's 300 for 3 hours), the child's own number laid in bars of sixty */
    const childV = item.childBars && wrong ? leadNumber(wrong.value) : null;
    const childBars = childV !== null && childV === item.near && S.total && !win && childV % ex === 0 ? childV / ex : 0;
    const bayRows = two ? tlRows(item.extra).length : 0;
    return (
      <g>
        {tlRuns(C, tx("opened"), opened, nT)}
        {rails}
        {TL_UNIT.map((u, k) => tlRung(C, k, { quiet: k !== from && k !== to, lit: k === from || k === to, tx }))}
        {TL_EX.map((e, k) => tlTag(C, k, e, { lit: k === from, times: true }))}
        {showTotal && item.kind === "unit" && (
          <rect x={TL.lx - 4} y={tlRowY(to) + 16} width={TL.lw + 2} height={60} rx={12} fill="none" stroke={C.accent} strokeWidth={4} pointerEvents="none" />
        )}
        {rowLive ? (
          <g {...control("step-down", "step the " + TL_UNIT[from] + " tiles down")} {...dg.bind({ kind: "row", k: from })} {...dg.keys({ kind: "row", k: from })}>
            <rect x={TL.x} y={tlRowY(from)} width={TL.w} height={TL.h} rx={14} fill="transparent" />
            <g transform={`translate(0,${rowDy})`}>{source}</g>
          </g>
        ) : <g>{source}</g>}
        <g pointerEvents="none">{tlRow(C, to, { bars: opened, size: ex, extra: two && slid ? item.extra : 0, reserve: two, hi: S.hi, tx })}</g>
        {!two && opened > 0 && (
          <g pointerEvents="none">
            <text x={900} y={tlRowY(to) + 42} fontSize={T.speech} fontWeight={700} fill={C.ink}>{nT + " × " + ex}</text>
            {counting && <text x={900} y={tlRowY(to) + 92} fontSize={T.speech} fontWeight={700} fill={tlInk(to)}>{indian(S.count)}</text>}
            {showTotal && <text x={900} y={tlRowY(to) + 92} fontSize={T.speech} fontWeight={700} fill={tlInk(to)}>{"= " + indian(total)}</text>}
            {showTotal && <text x={900} y={tlRowY(to) + 128} fontSize={T.label} fontWeight={600} fill={tlInk(to)}>{unitShown}</text>}
          </g>
        )}
        {childBars > 0 && (
          <g pointerEvents="none">
            <text x={880} y={40} fontSize={T.label} fontWeight={700} fill={tlInk(to)}>{indian(childV) + " " + unitShown}</text>
            {/* the child's number in bars of sixty, three to a row, 6 apart */}
            {Array.from({ length: childBars }).map((_, i) => {
              const bx = 890 + (i % 3) * 48, by = 54 + Math.floor(i / 3) * 48;
              return (
                <g key={"cb" + i}>
                  <rect x={bx} y={by} width={42} height={42} rx={6} fill={tint(TL_BASE[to], 0.8)} stroke={shade(TL_BASE[to], 0.25)} strokeWidth={2} />
                  <text x={bx + 21} y={by + 31} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={tlInk(to)}>{ex}</text>
                </g>
              );
            })}
            <text x={890} y={60 + Math.ceil(childBars / 3) * 48 + 30} fontSize={T.label} fontWeight={700} fill={tlInk(from)}>{"= " + childBars + " " + tx(TL_UNIT[from] + "s")}</text>
          </g>
        )}
        {two && (
          <g pointerEvents="none">
            <rect x={TL.x} y={TL_ADD.y} width={TL.w} height={TL_ADD.h} rx={12} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
            {exprA && <text x={TL.x + 20} y={TL_ADD.y + 35} fontSize={T.label} fontWeight={700} fill={C.ink}>{exprA}</text>}
            {exprB && <text x={exprBx} y={TL_ADD.y + 35} fontSize={T.label} fontWeight={700} fill={tlInk(to)}>{exprB}</text>}
            {counting && <text x={TL.x + TL.w - 20} y={TL_ADD.y + 35} textAnchor="end" fontSize={T.label} fontWeight={700} fill={tlInk(to)}>{indian(S.count)}</text>}
            {showTotal && <text x={TL.x + TL.w - 20} y={TL_ADD.y + 35} textAnchor="end" fontSize={T.label} fontWeight={700} fill={tlInk(to)}>{"= " + indian(total) + " " + unitShown}</text>}
          </g>
        )}
        {two && !slid && (
          <g>
            <text x={TL_BAY.x} y={TL_BAY.y - 16} fontSize={T.micro} fontWeight={700} fill={tlInk(to)}>{item.extra + " " + unitShown}</text>
            <g {...(bayLive ? { ...control("side-bay", "slide the " + unitWord + " in"), ...dg.bind({ kind: "bay" }), ...dg.keys({ kind: "bay" }) } : {})}>
              <g transform={`translate(${bd.x},${bd.y})`} filter={bd.x || bd.y ? "url(#fLift)" : undefined}>
                <rect x={TL_BAY.x} y={TL_BAY.y} width={TL_BAY.w} height={TL_BAY.h} rx={16} fill={tint(TL_BASE[to], 0.9)} stroke={C.ink} strokeWidth={2} />
                {tlCells(to, TL_BAY.x + 12, TL_BAY.y + (TL_BAY.h - bayRows * 19) / 2, item.extra, 19, "bay")}
              </g>
            </g>
          </g>
        )}
        {two && slid && (
          <rect x={TL_BAY.x} y={TL_BAY.y} width={TL_BAY.w} height={TL_BAY.h} rx={16} fill="none" stroke={C.ink} strokeWidth={1.5} strokeDasharray="10 10" />
        )}
        {rowLive && <Invite x={TL.x + TL.w - TL_BTN} y={tlRowY(from) + TL.h / 2} r={40} C={C} />}
        {!rowLive && bayLive && <Invite x={TL_BAY.x + TL_BAY.w / 2} y={TL_BAY.y + TL_BAY.h / 2} r={70} C={C} />}
      </g>
    );
  };

  const drawFree = () => {
    const eq = S.eq;
    return (
      <g>
        {rails}
        {TL_UNIT.map((u, k) => tlRung(C, k, { low: true, tx }))}
        {TL_EX.map((e, k) => tlTag(C, k, e, { times: true }))}
        {TL_UNIT.map((u, k) => {
          /* the "+" sits at the label's top right, clear of the name under it */
          const bx = TL.lx + TL.lw - 20, by = tlRowY(k) + 22;
          const addKeys = (e: any) => {
            /* Enter or Space adds a tile and keeps the focus here, so the next press adds another */
            if (e.key !== "Enter" && e.key !== " ") return;
            e.preventDefault(); e.stopPropagation();
            addTile(k);
          };
          return (
            <g key={"add" + k} onKeyDownCapture={addKeys}>
              <circle cx={bx} cy={by} r={13} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
              <path d={`M ${bx - 7} ${by} H ${bx + 7} M ${bx} ${by - 7} V ${by + 7}`} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
              <Hit id={"add-" + u} x={TL.lx - 8} y={tlRowY(k)} w={TL.lw + 4} h={TL.h} onPress={() => addTile(k)} label={"one more " + u + " tile"} />
            </g>
          );
        })}
        {TL_UNIT.map((u, k) => {
          const units = S.tiles[k] + (k > 0 ? S.bars[k] * TL_EX[k - 1] : 0);
          const live1 = k < 3 && units > 0;
          const content = [...tlRow(C, k, { tiles: S.tiles[k], bars: S.bars[k], size: k > 0 ? TL_EX[k - 1] : 0, button: live1, tx }), live1 ? tlChevron(C, k) : null];
          const dy = d && d.payload && d.payload.kind === "row" && d.payload.k === k && d.moved ? Math.max(0, Math.min(TL.h + TL.gap, d.y - (tlRowY(k) + TL.h / 2))) : 0;
          const dx = S.wobK === k ? S.wobX || 0 : 0;
          return live1 ? (
            <g key={"frow" + k} {...control("step-" + u, "step the " + u + " rung down")} {...dg.bind({ kind: "row", k })} {...dg.keys({ kind: "row", k })}>
              <rect x={TL.x} y={tlRowY(k)} width={TL.w} height={TL.h} rx={14} fill="transparent" />
              <g transform={`translate(${dx},${dy})`}>{content}</g>
            </g>
          ) : <g key={"frow" + k} transform={`translate(${dx},0)`}>{content}</g>;
        })}
        <g pointerEvents="none">
          <rect x={TL.x} y={TL_ADD.y} width={TL.w} height={TL_ADD.h} rx={12} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
          {eq && <text x={TL.x + 20} y={TL_ADD.y + 35} fontSize={T.label} fontWeight={700} fill={C.ink}>{indian(eq.a) + " × " + TL_EX[eq.k]}</text>}
          {eq && <text x={TL.x + TL.w - 20} y={TL_ADD.y + 35} textAnchor="end" fontSize={T.label} fontWeight={700} fill={tlInk(eq.k + 1)}>
            {"= " + indian(eq.a * TL_EX[eq.k]) + " " + tx(TL_UNIT[eq.k + 1] + "s")}</text>}
        </g>
        {tlClock(C, 968, 176, 100, { sec: S.sec, lit: S.lit, minStep: S.minStep, small: true, arc: true })}
        <Hit id="free-clock" x={868} y={76} w={200} h={200} onPress={runLap} label="send the second hand round" enabled={!S.running} />
        <Key id="free-clear" x={878} y={420} w={190} h={72} C={C} onClick={clearFree} label="clear the ladder">
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("clear")}</text>
        </Key>
      </g>
    );
  };

  return (
    <g>
      {tlDefs()}
      {free ? drawFree() : n === 1 ? draw1() : n === 2 ? draw2() : draw34()}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ n, result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const ph: any = PHASES[(n || 1) - 1];
  const it = ph && ph.items[last.item];
  const lines: string[] = it && it.thumb ? it.thumb : [String(last.value)];
  /* a stripe in the colour of the unit the answer is in */
  const k = !it ? 2 : typeof it.from === "number" ? it.from + 1 : (n || 1) === 1 ? 3 : it.kind === "day" ? 1 : 0;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <rect x={10} y={12} width={10} height={h - 24} rx={4} fill={TL_BASE[k]} />
      {lines.slice(0, 2).map((ln: string) => tx(ln)).map((ln: string, j: number) => (
        <text key={j} x={32} y={lines.length > 1 ? 35 + j * 32 : h / 2 + 10} fontSize={T.micro} fontWeight={700} fill={C.ink}>{ln}</text>
      ))}
    </g>
  );
}

function TimeUnitLadder(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format: tlFormat, fitHost: () => null }} />
  );
}

export default TimeUnitLadder;
