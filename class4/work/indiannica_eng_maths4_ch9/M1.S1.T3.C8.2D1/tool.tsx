/* ═══ M1.S1.T3.C8.2D1 · trace_and_close · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md. */

const TOOL_ID = "trace_and_close";
const MEDIA_ID = "M1.S1.T3.C8.2D1";
const TOOL_NAME = "Trace and Close";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A figure on the sheet and a flag beside it. Where will the tracer finish?"];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every figure traced home or stopped at its gap, and every polygon counted.";
/* said when the child opens Free play from the summary page */
const FREE_LINE = "Free play. Pick a figure, plant the flag and trace it. The glass is open too.";

/* Hindi and Gujarati, keyed by the English line exactly (PATTERNS section 11); the English above and
   below stays what the checks read. NCERT class 4 terms: tracer ट्रेसर / ટ્રેસર, flag झंडा / ઝંડો,
   closed बंद / બંધ, open खुली / ખુલ્લી, polygon बहुभुज / બહુકોણ, side भुजा / બાજુ, corner कोना / ખૂણો,
   vertex शीर्ष / શિરોબિંદુ, gap खाली जगह / ખાલી જગ્યા, break दरार / તિરાડ, glass लेंस / લેન્સ.
   Digits stay digits. A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Trace and Close": "ट्रेस करो और बंद करो",
    "A figure on the sheet and a flag beside it. Where will the tracer finish?": "कागज़ पर एक आकृति है और उसके पास एक झंडा। ट्रेसर कहाँ रुकेगा?",
    "Every figure traced home or stopped at its gap, and every polygon counted.": "हर आकृति पर ट्रेसर झंडे तक लौटा या खाली जगह पर रुका। हर बहुभुज भी गिना गया।",
    "Free play. Pick a figure, plant the flag and trace it. The glass is open too.": "मुक्त खेल। लेंस भी खुला है। एक आकृति चुनो, झंडा लगाओ और उसे ट्रेस करो।",
    "Ending where you began": "जहाँ से शुरू, वहीं खत्म",
    "Plant the flag anywhere on the outline.": "झंडे को बाहरी रेखा पर कहीं भी लगाओ।",
    "The tracer will start there and never lift.": "ट्रेसर वहीं से चलेगा और बीच में कभी नहीं उठेगा।",
    "Trace it again, slowly. Does the tracer reach the flag?": "ट्रेसर को फिर से धीरे चलाओ। क्या वह झंडे तक पहुँचता है?",
    "A closed outline has no free end anywhere on it.": "बंद रेखा में कहीं भी खुला सिरा नहीं होता।",
    "A figure that starts and ends at the same place is closed. One that ends somewhere else is open.": "जो आकृति जहाँ से शुरू होती है वहीं खत्म होती है, वह बंद है। जो कहीं और खत्म होती है, वह खुली है।",
    "You learned: a closed figure brings the tracer back to the flag.": "तुमने सीखा: बंद आकृति में ट्रेसर झंडे पर लौट आता है।",
    "Here is a leaf, drawn on the sheet as one outline. Choose your word before the tracer sets off.": "यह एक पत्ती है, कागज़ पर एक ही रेखा में बनी। ट्रेसर के चलने से पहले अपना शब्द चुनो।",
    "Open or closed?": "खुली या बंद?",
    "open": "खुली",
    "closed": "बंद",
    "Did the tracer come back to the very point it left?": "क्या ट्रेसर ठीक उसी बिंदु पर लौटा, जहाँ से चला था?",
    "Now an egg shape is on the sheet. Choose again, and the tracer will settle it.": "अब कागज़ पर अंडे जैसी आकृति है। फिर से चुनो, ट्रेसर उसे तय कर देगा।",
    "Where does the egg's line finish, next to where it began?": "अंडे की रेखा कहाँ खत्म होती है, ठीक शुरुआत के पास?",
    "The capital letter S is on the sheet now. Pick a word for it.": "अब कागज़ पर अंग्रेज़ी का बड़ा अक्षर S है। इसके लिए एक शब्द चुनो।",
    "Follow the S with your eye. Does it ever meet its start?": "S को आँखों से देखते चलो। क्या वह कभी अपनी शुरुआत से मिलता है?",
    "One gap makes it open": "एक खाली जगह से आकृति खुली",
    "A figure can look shut and still have a break hiding in it.": "आकृति बंद दिख सकती है, फिर भी उसमें कहीं दरार छिपी हो सकती है।",
    "Tap the flag to send the tracer, then bring the glass over.": "झंडे को छूकर ट्रेसर भेजो, फिर लेंस को पास लाओ।",
    "Look hard where the trail stops. What is sitting there?": "ध्यान से देखो, रास्ता कहाँ रुकता है। वहाँ क्या है?",
    "A break only a hair wide still holds the tracer back.": "बाल जितनी पतली दरार भी ट्रेसर को रोक देती है।",
    "Any gap, however small, makes a figure open.": "कोई भी खाली जगह, चाहे कितनी छोटी हो, आकृति को खुली बना देती है।",
    "You learned: any gap, however small, makes a figure open.": "तुमने सीखा: छोटी-सी खाली जगह भी आकृति को खुली बना देती है।",
    "A figure with five straight sides sits on the sheet, and the flag is already planted.": "कागज़ पर पाँच सीधी भुजाओं वाली आकृति है। झंडा पहले से लगा है।",
    "Look again at the corner the tracer never reached.": "उस कोने को फिर से देखो, जहाँ ट्रेसर कभी नहीं पहुँचा।",
    "Somewhere in this circle there is a break too thin to see. Put the glass on it.": "इस वृत्त में कहीं एक दरार है, जो इतनी पतली है कि दिखती नहीं। उस पर लेंस रखो।",
    "Find the break": "दरार ढूँढो",
    "Send the tracer first. The glass belongs where the trail stops.": "पहले ट्रेसर भेजो। लेंस वहाँ रखो, जहाँ रास्ता रुकता है।",
    "This rectangle is drawn, but its last side stops short of the first corner.": "यह आयत बना है, पर उसकी आखिरी भुजा पहले कोने तक नहीं पहुँचती।",
    "Close the gap": "खाली जगह को जोड़ो",
    "Take the loose end to the corner where the drawing began.": "खुले सिरे को उस कोने तक ले जाओ, जहाँ से चित्र शुरू हुआ था।",
    "Closed and straight-sided": "बंद और सीधी भुजाओं वाली",
    "The gate asks two questions, in order.": "फाटक दो सवाल पूछता है, एक के बाद एक।",
    "First, did the trace come home? Then, is every part straight?": "पहले, क्या ट्रेसर लौट आया? फिर, क्या हर हिस्सा सीधा है?",
    "Did the tracer come home on the one you chose?": "जो आकृति तुमने चुनी, उस पर क्या ट्रेसर लौट आया?",
    "Does the straightedge lie flat along every single part?": "क्या सीधी पट्टी हर एक हिस्से पर सटकर बैठती है?",
    "A polygon is a closed figure made of straight line segments only. A gap or a curve rules it out.": "बहुभुज एक बंद आकृति है, जो सिर्फ़ सीधे रेखाखंडों से बनती है। खाली जगह या घुमाव हो, तो वह बहुभुज नहीं होती।",
    "You learned: a polygon is closed, with straight sides only.": "तुमने सीखा: बहुभुज बंद होता है और उसकी भुजाएँ सीधी होती हैं।",
    "Three closed figures wait on the sheet. Send the one the gate will let through.": "कागज़ पर तीन बंद आकृतियाँ हैं। जिसे फाटक अंदर जाने देगा, उसे भेजो।",
    "Send one in": "एक को अंदर भेजो",
    "Lay the straightedge along each part. Which one has no curve at all?": "सीधी पट्टी को हर हिस्से पर रखो। किसमें कोई घुमाव नहीं है?",
    "Now three different figures. Send the polygon in.": "अब तीन अलग आकृतियाँ हैं। बहुभुज को अंदर भेजो।",
    "One of these never brings the tracer home, so the gate turns it away.": "इनमें से एक पर ट्रेसर कभी नहीं लौटता। इसलिए फाटक उसे वापस भेज देता है।",
    "One closed figure is on the sheet. Look hard at every part of its edge.": "कागज़ पर एक बंद आकृति है। उसके किनारे के हर हिस्से को ध्यान से देखो।",
    "Polygon or not?": "बहुभुज है या नहीं?",
    "polygon": "बहुभुज",
    "not a polygon": "बहुभुज नहीं",
    "A curved part is not a straight line segment.": "घुमावदार हिस्सा सीधा रेखाखंड नहीं होता।",
    "Counting sides and corners": "भुजाएँ और कोने गिनना",
    "Tap along each side of this polygon, then tap each corner.": "इस बहुभुज की हर भुजा को छुओ, फिर हर कोने को छुओ।",
    "The two boards under the gate keep your tally.": "फाटक के नीचे की दो तख्तियाँ तुम्हारी गिनती रखती हैं।",
    "Where does one side end and the next one begin?": "एक भुजा कहाँ खत्म होती है और अगली कहाँ शुरू?",
    "Go round once, and stop where you set off.": "एक चक्कर लगाओ, और जहाँ से चले थे वहीं रुको।",
    "A polygon has as many vertices as sides. A vertex is a corner, where two sides meet, and a four-sided polygon is a quadrilateral.": "बहुभुज में जितनी भुजाएँ होती हैं, उतने ही शीर्ष होते हैं। शीर्ष एक कोना है, जहाँ दो भुजाएँ मिलती हैं। चार भुजाओं वाला बहुभुज चतुर्भुज कहलाता है।",
    "You learned: a polygon has as many vertices as sides.": "तुमने सीखा: बहुभुज में जितनी भुजाएँ, उतने ही शीर्ष होते हैं।",
    "A polygon lies on the sheet, its corners lettered. Tap round it, then give it its name.": "कागज़ पर एक बहुभुज है, उसके कोनों पर अक्षर लिखे हैं। उस पर छूते चलो, फिर उसका नाम बताओ।",
    "Its name?": "इसका नाम?",
    "Go round the figure once, and tap every side you pass.": "आकृति का एक चक्कर लगाओ, और हर भुजा को छूते जाओ।",
    "The corners of this polygon carry letters too. How many vertices has it?": "इस बहुभुज के कोनों पर भी अक्षर हैं। इसमें कितने शीर्ष हैं?",
    "Vertices?": "शीर्ष?",
    "A vertex is a corner. Tap each place where two sides meet.": "शीर्ष एक कोना है। जहाँ दो भुजाएँ मिलती हैं, उस हर जगह को छुओ।",
    "Every vertex of this polygon is dotted already. Tap along its sides and count them.": "इस बहुभुज के हर शीर्ष पर बिंदु पहले से बना है। इसकी भुजाओं को छुओ और गिनो।",
    "Sides?": "भुजाएँ?",
    "One side runs from each dot to the dot next door.": "हर बिंदु से अगले बिंदु तक एक भुजा जाती है।",
    "1 closed?": "1 बंद है?",
    "2 straight only?": "2 सिर्फ़ सीधी?",
    "sides": "भुजाएँ",
    "corners": "कोने",
    "triangle": "त्रिभुज",
    "quadrilateral": "चतुर्भुज",
    "trace": "ट्रेस करो",
    "Free play": "मुक्त खेल",
    "Traced": "ट्रेस",
    "Counted": "गिने",
    "gap": "खाली जगह",
    "join": "जुड़ गया",
    "quad": "चतुर्भुज",
    "pent5": "पंचभुज",
    "circle": "वृत्त",
    "halfC": "अर्धवृत्त",
    "oval": "अंडाकार",
    "triGap": "खुला त्रिभुज",
    "outline": "बाहरी रेखा",
    "short": "अधूरा",
  },
  gu: {
    "Trace and Close": "ટ્રેસ કરો અને બંધ કરો",
    "A figure on the sheet and a flag beside it. Where will the tracer finish?": "કાગળ પર એક આકૃતિ છે અને તેની બાજુમાં એક ઝંડો. ટ્રેસર ક્યાં અટકશે?",
    "Every figure traced home or stopped at its gap, and every polygon counted.": "દરેક આકૃતિ પર ટ્રેસર ઝંડા સુધી આવ્યો કે ખાલી જગ્યાએ અટક્યો. દરેક બહુકોણ પણ ગણાયો.",
    "Free play. Pick a figure, plant the flag and trace it. The glass is open too.": "મુક્ત રમત. લેન્સ પણ ખુલ્લો છે. એક આકૃતિ પસંદ કરો, ઝંડો લગાવો અને તેને ટ્રેસ કરો.",
    "Ending where you began": "જ્યાંથી શરૂ, ત્યાં જ પૂરું",
    "Plant the flag anywhere on the outline.": "ઝંડાને બહારની રેખા પર ગમે ત્યાં લગાવો.",
    "The tracer will start there and never lift.": "ટ્રેસર ત્યાંથી ચાલશે અને વચ્ચે ક્યારેય ઊંચકાશે નહીં.",
    "Trace it again, slowly. Does the tracer reach the flag?": "ટ્રેસરને ફરી ધીમે ચલાવો. શું તે ઝંડા સુધી પહોંચે છે?",
    "A closed outline has no free end anywhere on it.": "બંધ રેખામાં ક્યાંય કોઈ ખુલ્લો છેડો હોતો નથી.",
    "A figure that starts and ends at the same place is closed. One that ends somewhere else is open.": "જે આકૃતિ જ્યાંથી શરૂ થાય ત્યાં જ પૂરી થાય, તે બંધ છે. જે બીજે ક્યાંક પૂરી થાય, તે ખુલ્લી છે.",
    "You learned: a closed figure brings the tracer back to the flag.": "તમે શીખ્યા: બંધ આકૃતિમાં ટ્રેસર ઝંડા પર પાછો આવે છે.",
    "Here is a leaf, drawn on the sheet as one outline. Choose your word before the tracer sets off.": "આ એક પાંદડું છે, કાગળ પર એક જ રેખામાં દોરેલું. ટ્રેસર ચાલે તે પહેલાં તમારો શબ્દ પસંદ કરો.",
    "Open or closed?": "ખુલ્લી કે બંધ?",
    "open": "ખુલ્લી",
    "closed": "બંધ",
    "Did the tracer come back to the very point it left?": "શું ટ્રેસર એ જ બિંદુ પર પાછો આવ્યો, જ્યાંથી નીકળ્યો હતો?",
    "Now an egg shape is on the sheet. Choose again, and the tracer will settle it.": "હવે કાગળ પર ઈંડા જેવી આકૃતિ છે. ફરી પસંદ કરો, ટ્રેસર તેનો નિર્ણય કરશે.",
    "Where does the egg's line finish, next to where it began?": "ઈંડાની રેખા ક્યાં પૂરી થાય છે, બરાબર શરૂઆતની બાજુમાં?",
    "The capital letter S is on the sheet now. Pick a word for it.": "હવે કાગળ પર અંગ્રેજીનો મોટો અક્ષર S છે. તેના માટે એક શબ્દ પસંદ કરો.",
    "Follow the S with your eye. Does it ever meet its start?": "S ને આંખોથી અનુસરો. શું તે ક્યારેય પોતાની શરૂઆતને મળે છે?",
    "One gap makes it open": "એક ખાલી જગ્યાથી ખુલ્લી",
    "A figure can look shut and still have a break hiding in it.": "આકૃતિ બંધ દેખાય તો પણ તેમાં ક્યાંક તિરાડ છુપાયેલી હોઈ શકે.",
    "Tap the flag to send the tracer, then bring the glass over.": "ઝંડાને અડીને ટ્રેસર મોકલો, પછી લેન્સને પાસે લાવો.",
    "Look hard where the trail stops. What is sitting there?": "ધ્યાનથી જુઓ, રસ્તો ક્યાં અટકે છે. ત્યાં શું છે?",
    "A break only a hair wide still holds the tracer back.": "વાળ જેટલી પાતળી તિરાડ પણ ટ્રેસરને રોકી દે છે.",
    "Any gap, however small, makes a figure open.": "કોઈ પણ ખાલી જગ્યા આકૃતિને ખુલ્લી બનાવે છે, ભલે નાની હોય.",
    "You learned: any gap, however small, makes a figure open.": "તમે શીખ્યા: નાની ખાલી જગ્યા પણ આકૃતિને ખુલ્લી બનાવે છે.",
    "A figure with five straight sides sits on the sheet, and the flag is already planted.": "કાગળ પર પાંચ સીધી બાજુવાળી આકૃતિ છે. ઝંડો પહેલેથી લાગેલો છે.",
    "Look again at the corner the tracer never reached.": "તે ખૂણાને ફરી જુઓ, જ્યાં ટ્રેસર ક્યારેય પહોંચ્યો નહીં.",
    "Somewhere in this circle there is a break too thin to see. Put the glass on it.": "આ વર્તુળમાં ક્યાંક એક તિરાડ છે, જે દેખાય નહીં એટલી પાતળી છે. તેના પર લેન્સ મૂકો.",
    "Find the break": "તિરાડ શોધો",
    "Send the tracer first. The glass belongs where the trail stops.": "પહેલાં ટ્રેસર મોકલો. લેન્સ ત્યાં મૂકો, જ્યાં રસ્તો અટકે છે.",
    "This rectangle is drawn, but its last side stops short of the first corner.": "આ લંબચોરસ દોર્યો છે. પણ તેની છેલ્લી બાજુ પહેલા ખૂણા સુધી પહોંચતી નથી.",
    "Close the gap": "ખાલી જગ્યા જોડો",
    "Take the loose end to the corner where the drawing began.": "છૂટા છેડાને તે ખૂણા સુધી લઈ જાઓ, જ્યાંથી ચિત્ર શરૂ થયું હતું.",
    "Closed and straight-sided": "બંધ અને સીધી બાજુઓવાળી",
    "The gate asks two questions, in order.": "દરવાજો બે સવાલ પૂછે છે, એક પછી એક.",
    "First, did the trace come home? Then, is every part straight?": "પહેલાં, શું ટ્રેસર પાછો આવ્યો? પછી, શું દરેક ભાગ સીધો છે?",
    "Did the tracer come home on the one you chose?": "તમે જે આકૃતિ પસંદ કરી, તેના પર શું ટ્રેસર પાછો આવ્યો?",
    "Does the straightedge lie flat along every single part?": "શું સીધી પટ્ટી દરેક ભાગ પર બરાબર બેસે છે?",
    "A polygon is a closed figure made of straight line segments only. A gap or a curve rules it out.": "બહુકોણ એક બંધ આકૃતિ છે, જે ફક્ત સીધા રેખાખંડોથી બને છે. ખાલી જગ્યા કે વળાંક હોય, તો તે બહુકોણ નથી.",
    "You learned: a polygon is closed, with straight sides only.": "તમે શીખ્યા: બહુકોણ બંધ હોય છે અને તેની બાજુઓ સીધી હોય છે.",
    "Three closed figures wait on the sheet. Send the one the gate will let through.": "કાગળ પર ત્રણ બંધ આકૃતિઓ છે. જેને દરવાજો અંદર જવા દેશે, તેને મોકલો.",
    "Send one in": "એકને અંદર મોકલો",
    "Lay the straightedge along each part. Which one has no curve at all?": "સીધી પટ્ટી દરેક ભાગ પર મૂકો. કઈ આકૃતિમાં કોઈ વળાંક નથી?",
    "Now three different figures. Send the polygon in.": "હવે ત્રણ જુદી આકૃતિઓ છે. બહુકોણને અંદર મોકલો.",
    "One of these never brings the tracer home, so the gate turns it away.": "આમાંની એક પર ટ્રેસર ક્યારેય પાછો આવતો નથી. એટલે દરવાજો તેને પાછી મોકલે છે.",
    "One closed figure is on the sheet. Look hard at every part of its edge.": "કાગળ પર એક બંધ આકૃતિ છે. તેની ધારના દરેક ભાગને ધ્યાનથી જુઓ.",
    "Polygon or not?": "બહુકોણ છે કે નહીં?",
    "polygon": "બહુકોણ",
    "not a polygon": "બહુકોણ નથી",
    "A curved part is not a straight line segment.": "વળાંકવાળો ભાગ સીધો રેખાખંડ નથી હોતો.",
    "Counting sides and corners": "બાજુઓ અને ખૂણા ગણવા",
    "Tap along each side of this polygon, then tap each corner.": "આ બહુકોણની દરેક બાજુને અડો, પછી દરેક ખૂણાને અડો.",
    "The two boards under the gate keep your tally.": "દરવાજા નીચેના બે પાટિયાં તમારી ગણતરી રાખે છે.",
    "Where does one side end and the next one begin?": "એક બાજુ ક્યાં પૂરી થાય છે અને બીજી ક્યાં શરૂ થાય છે?",
    "Go round once, and stop where you set off.": "એક ચક્કર લગાવો, અને જ્યાંથી નીકળ્યા ત્યાં જ અટકો.",
    "A polygon has as many vertices as sides. A vertex is a corner, where two sides meet, and a four-sided polygon is a quadrilateral.": "બહુકોણમાં જેટલી બાજુઓ હોય, તેટલા જ શિરોબિંદુ હોય છે. શિરોબિંદુ એટલે ખૂણો, જ્યાં બે બાજુ મળે છે. ચાર બાજુવાળો બહુકોણ ચતુષ્કોણ કહેવાય છે.",
    "You learned: a polygon has as many vertices as sides.": "તમે શીખ્યા: બહુકોણમાં જેટલી બાજુઓ, તેટલા જ શિરોબિંદુ.",
    "A polygon lies on the sheet, its corners lettered. Tap round it, then give it its name.": "કાગળ પર એક બહુકોણ છે, તેના ખૂણા પર અક્ષરો લખ્યા છે. તેના પર અડતા જાઓ, પછી તેનું નામ આપો.",
    "Its name?": "તેનું નામ?",
    "Go round the figure once, and tap every side you pass.": "આકૃતિનું એક ચક્કર લગાવો, અને દરેક બાજુને અડતા જાઓ.",
    "The corners of this polygon carry letters too. How many vertices has it?": "આ બહુકોણના ખૂણા પર પણ અક્ષરો છે. તેમાં કેટલા શિરોબિંદુ છે?",
    "Vertices?": "શિરોબિંદુ?",
    "A vertex is a corner. Tap each place where two sides meet.": "શિરોબિંદુ એટલે ખૂણો. જ્યાં બે બાજુ મળે છે, તે દરેક જગ્યાને અડો.",
    "Every vertex of this polygon is dotted already. Tap along its sides and count them.": "આ બહુકોણના દરેક શિરોબિંદુ પર બિંદુ પહેલેથી બનેલું છે. તેની બાજુઓને અડો અને ગણો.",
    "Sides?": "બાજુઓ?",
    "One side runs from each dot to the dot next door.": "દરેક બિંદુથી બાજુના બિંદુ સુધી એક બાજુ જાય છે.",
    "1 closed?": "1 બંધ છે?",
    "2 straight only?": "2 ફક્ત સીધી?",
    "sides": "બાજુઓ",
    "corners": "ખૂણા",
    "triangle": "ત્રિકોણ",
    "quadrilateral": "ચતુષ્કોણ",
    "trace": "ટ્રેસ કરો",
    "Free play": "મુક્ત રમત",
    "Traced": "ટ્રેસ",
    "Counted": "ગણ્યા",
    "gap": "ખાલી જગ્યા",
    "join": "જોડાઈ ગયું",
    "quad": "ચતુષ્કોણ",
    "pent5": "પંચકોણ",
    "circle": "વર્તુળ",
    "halfC": "અર્ધવર્તુળ",
    "oval": "અંડાકાર",
    "triGap": "ખુલ્લો ત્રિકોણ",
    "outline": "બહારની રેખા",
    "short": "અધૂરું",
  },
};

const PHASES = [
  {
    n: 1,
    concept: "Ending where you began",
    conceptId: "M1.S1.T3.C8", objectiveIds: ["O3"],
    says: ["Plant the flag anywhere on the outline.", "The tracer will start there and never lift."],
    ladder: ["Trace it again, slowly. Does the tracer reach the flag?", "A closed outline has no free end anywhere on it."],
    closing: "A figure that starts and ends at the same place is closed. One that ends somewhere else is open.",
    learned: "You learned: a closed figure brings the tracer back to the flag.",
    traceback: "The tracer runs from the flag, and the figure either floods or stops at a free end.",
    items: [
      /* learn ML1: answer in the plan = Closed, because the tracing finger ends where it began */
      { qid: "M1.S1.T3.C8:ML1", kind: "shut", fig: "leaf", winMs: 5200,
        say: "Here is a leaf, drawn on the sheet as one outline. Choose your word before the tracer sets off.",
        ask: "Open or closed?", answer: "closed", near: "open",
        choices: [{ id: "open", label: "open" }, { id: "closed", label: "closed" }],
        miss: "Did the tracer come back to the very point it left?" },
      /* practice 1: answer in the plan = Closed, because it starts and ends at the same place */
      { qid: "M1.S1.T3.C8:1", kind: "shut", fig: "egg", winMs: 5200,
        say: "Now an egg shape is on the sheet. Choose again, and the tracer will settle it.",
        ask: "Open or closed?", answer: "closed", near: "open",
        choices: [{ id: "open", label: "open" }, { id: "closed", label: "closed" }],
        miss: "Where does the egg's line finish, next to where it began?" },
      /* practice 2: answer in the plan = At its bottom end, a different place, so S is an open figure */
      { qid: "M1.S1.T3.C8:2", kind: "shut", fig: "ess", winMs: 5200,
        say: "The capital letter S is on the sheet now. Pick a word for it.",
        ask: "Open or closed?", answer: "open", near: "closed",
        choices: [{ id: "open", label: "open" }, { id: "closed", label: "closed" }],
        miss: "Follow the S with your eye. Does it ever meet its start?" },
    ],
  },
  {
    n: 2,
    concept: "One gap makes it open",
    conceptId: "M1.S1.T3.C9", objectiveIds: ["O3"],
    says: ["A figure can look shut and still have a break hiding in it.", "Tap the flag to send the tracer, then bring the glass over."],
    ladder: ["Look hard where the trail stops. What is sitting there?", "A break only a hair wide still holds the tracer back."],
    closing: "Any gap, however small, makes a figure open.",
    learned: "You learned: any gap, however small, makes a figure open.",
    traceback: "The tracer stops at the break and the glass swells the hairline into a plain gap.",
    items: [
      /* learn ML2: answer in the plan = No. It is open, because the tracing finger reaches the gap and cannot get back */
      { qid: "M1.S1.T3.C9:ML2", kind: "shut", fig: "pent", flagAt: 0.16, winMs: 5600,
        say: "A figure with five straight sides sits on the sheet, and the flag is already planted.",
        ask: "Open or closed?", answer: "open", near: "closed",
        choices: [{ id: "open", label: "open" }, { id: "closed", label: "closed" }],
        miss: "Look again at the corner the tracer never reached." },
      /* practice 3: answer in the plan = Open, because the break stops the tracing finger getting back to the start */
      { qid: "M1.S1.T3.C9:3", kind: "find", fig: "ring", flagAt: 0.3, pad: "enter", winMs: 5200,
        say: "Somewhere in this circle there is a break too thin to see. Put the glass on it.",
        ask: "Find the break", answer: "gap", near: "outline",
        miss: "Send the tracer first. The glass belongs where the trail stops." },
      /* practice 4: answer in the plan = Join the gap, so the last side meets the corner where the drawing began */
      { qid: "M1.S1.T3.C9:4", kind: "join", fig: "rectOp", pad: "enter", winMs: 5600,
        say: "This rectangle is drawn, but its last side stops short of the first corner.",
        ask: "Close the gap", answer: "join", near: "short",
        miss: "Take the loose end to the corner where the drawing began." },
    ],
  },
  {
    n: 3,
    concept: "Closed and straight-sided",
    conceptId: "M1.S1.T3.C10", objectiveIds: ["O4"],
    says: ["The gate asks two questions, in order.", "First, did the trace come home? Then, is every part straight?"],
    ladder: ["Did the tracer come home on the one you chose?", "Does the straightedge lie flat along every single part?"],
    closing: "A polygon is a closed figure made of straight line segments only. A gap or a curve rules it out.",
    learned: "You learned: a polygon is closed, with straight sides only.",
    traceback: "The straightedge is laid along each part in turn and the figure that passes stays in the gate.",
    items: [
      /* learn ML3: answer in the plan = Only the figure with four straight sides */
      { qid: "M1.S1.T3.C10:ML3", kind: "gate", figs: ["circle", "quad", "halfC"], pad: "enter", winMs: 6000,
        say: "Three closed figures wait on the sheet. Send the one the gate will let through.",
        ask: "Send one in", answer: "quad", near: "circle",
        miss: "Lay the straightedge along each part. Which one has no curve at all?" },
      /* practice 5: answer in the plan = Only the closed figure with five straight sides */
      { qid: "M1.S1.T3.C10:5", kind: "gate", figs: ["pent5", "oval", "triGap"], pad: "enter", winMs: 6000,
        say: "Now three different figures. Send the polygon in.",
        ask: "Send one in", answer: "pent5", near: "triGap",
        miss: "One of these never brings the tracer home, so the gate turns it away." },
      /* practice 6: answer in the plan = No, it has a curved side */
      { qid: "M1.S1.T3.C10:6", kind: "rule", fig: "fan", winMs: 5200,
        say: "One closed figure is on the sheet. Look hard at every part of its edge.",
        ask: "Polygon or not?", answer: "not a polygon", near: "polygon",
        choices: [{ id: "polygon", label: "polygon" }, { id: "not a polygon", label: "not a polygon" }],
        miss: "A curved part is not a straight line segment." },
    ],
  },
  {
    n: 4,
    concept: "Counting sides and corners",
    conceptId: "M1.S1.T3.C11", objectiveIds: ["O4"],
    says: ["Tap along each side of this polygon, then tap each corner.", "The two boards under the gate keep your tally."],
    ladder: ["Where does one side end and the next one begin?", "Go round once, and stop where you set off."],
    closing: "A polygon has as many vertices as sides. A vertex is a corner, where two sides meet, and a four-sided polygon is a quadrilateral.",
    learned: "You learned: a polygon has as many vertices as sides.",
    traceback: "Each side lights in turn and a vertex dot drops where two sides meet, until both tallies match.",
    items: [
      /* learn ML4: answer in the plan = A quadrilateral, with four sides and four vertices, D, E, F and G */
      { qid: "M1.S1.T3.C11:ML4", kind: "count", fig: "quadG", mode: "both", names: "DEFG", pad: "enter", winMs: 5600,
        say: "A polygon lies on the sheet, its corners lettered. Tap round it, then give it its name.",
        ask: "Its name?", answer: "quadrilateral", near: "triangle",
        miss: "Go round the figure once, and tap every side you pass." },
      /* practice 7: answer in the plan = Five: L, M, N, O and P, one where each pair of neighbouring sides meets */
      { qid: "M1.S1.T3.C11:7", kind: "count", fig: "pentP", mode: "corners", names: "LMNOP", winMs: 5200,
        say: "The corners of this polygon carry letters too. How many vertices has it?",
        ask: "Vertices?", answer: 5,
        miss: "A vertex is a corner. Tap each place where two sides meet." },
      /* practice 8: answer in the plan = Seven, because a polygon has as many sides as vertices */
      { qid: "M1.S1.T3.C11:8", kind: "count", fig: "hept", mode: "sides", names: null, winMs: 5200,
        say: "Every vertex of this polygon is dotted already. Tap along its sides and count them.",
        ask: "Sides?", answer: 7,
        miss: "One side runs from each dot to the dot next door." },
    ],
  },
];

/* ── the figure library: every outline in a unit frame, about radius 1 at the origin ───────
   A figure is a list of parts in tracing order; a part is straight (two points) or curved (a
   sampled run of points). A figure is closed when its very last point is its very first. */
const TCD = Math.PI / 180;
const tcPt = (x: number, y: number) => ({ x, y });
const tcArcPts = (cx: number, cy: number, r: number, a0: number, a1: number, k: number) => {
  const out: any[] = [];
  for (let i = 0; i <= k; i++) { const a = (a0 + (a1 - a0) * (i / k)) * TCD; out.push(tcPt(cx + r * Math.cos(a), cy + r * Math.sin(a))); }
  return out;
};
const tcMove = (pts: any[], dx: number, dy: number) => pts.map((p: any) => tcPt(p.x + dx, p.y + dy));
const tcRegular = (k: number, rot: number) => {
  const v: any[] = [];
  for (let i = 0; i < k; i++) { const a = (rot + (360 * i) / k) * TCD; v.push(tcPt(Math.cos(a), Math.sin(a))); }
  return v;
};
/* the sides of a ring of corners; shortBy > 0 leaves the last side stopping short of the first corner */
const tcSides = (vs: any[], shortBy: number) => {
  const k = vs.length, parts: any[] = [];
  for (let i = 0; i < k; i++) {
    const a = vs[i], b = vs[(i + 1) % k];
    const stop = i === k - 1 && shortBy > 0;
    parts.push({ straight: true, pts: [a, stop ? tcPt(a.x + (b.x - a.x) * (1 - shortBy), a.y + (b.y - a.y) * (1 - shortBy)) : b] });
  }
  return parts;
};
/* a closed outline must meet itself exactly: pull the last point onto the first */
const tcSeal = (parts: any[]) => {
  const first = parts[0].pts[0], lastPts = parts[parts.length - 1].pts;
  lastPts[lastPts.length - 1] = tcPt(first.x, first.y);
  return parts;
};
const tcLeafParts = () => {
  const r: any[] = [], l: any[] = [];
  for (let i = 0; i <= 26; i++) { const t = i / 26; r.push(tcPt(0.54 * Math.sin(Math.PI * t), -1 + 2 * t)); }
  for (let i = 0; i <= 26; i++) { const t = i / 26; l.push(tcPt(-0.54 * Math.sin(Math.PI * t), 1 - 2 * t)); }
  return tcSeal([{ straight: false, pts: r }, { straight: false, pts: l }]);
};
const tcEggParts = () => {
  const p: any[] = [];
  for (let i = 0; i <= 52; i++) { const a = (90 - (360 * i) / 52) * TCD; p.push(tcPt(0.76 * Math.cos(a) * (1 - 0.15 * Math.sin(a)), -Math.sin(a))); }
  return tcSeal([{ straight: false, pts: p }]);
};
const tcEssParts = () => {
  const u = tcArcPts(0, -0.45, 0.45, 20, -250, 26);
  const raw = tcArcPts(0, 0.45, 0.45, -110, 160, 26);
  const e = u[u.length - 1];
  return [{ straight: false, pts: u }, { straight: false, pts: tcMove(raw, e.x - raw[0].x, e.y - raw[0].y) }];
};
const tcOvalParts = () => {
  const p: any[] = [];
  for (let i = 0; i <= 48; i++) { const a = (i * 360 / 48) * TCD; p.push(tcPt(0.98 * Math.cos(a), 0.64 * Math.sin(a))); }
  return tcSeal([{ straight: false, pts: p }]);
};
const TCF: any = {
  leaf: { parts: tcLeafParts() },
  egg: { parts: tcEggParts() },
  ess: { parts: tcEssParts() },
  pent: { parts: tcSides(tcRegular(5, -18), 0.025) },
  ring: { parts: [{ straight: false, pts: tcArcPts(0, 0, 1, 201, 559, 76) }] },
  rectOp: { parts: tcSides([tcPt(-0.82, -0.6), tcPt(0.82, -0.6), tcPt(0.82, 0.6), tcPt(-0.82, 0.6)], 0.17) },
  circle: { parts: [{ straight: false, pts: tcArcPts(0, 0, 1, 0, 360, 56) }] },
  quad: { parts: tcSides([tcPt(-0.88, -0.46), tcPt(0.5, -0.86), tcPt(0.9, 0.42), tcPt(-0.6, 0.86)], 0) },
  halfC: { parts: tcSeal([{ straight: false, pts: tcArcPts(0, 0.35, 1, 180, 360, 36) }, { straight: true, pts: [tcPt(1, 0.35), tcPt(-1, 0.35)] }]) },
  pent5: { parts: tcSides(tcRegular(5, -90), 0) },
  oval: { parts: tcOvalParts() },
  triGap: { parts: tcSides([tcPt(0, -0.95), tcPt(0.92, 0.62), tcPt(-0.92, 0.62)], 0.14) },
  fan: {
    parts: [{ straight: true, pts: [tcPt(-0.78, -0.62), tcPt(0.78, -0.62)] },
      { straight: true, pts: [tcPt(0.78, -0.62), tcPt(0.78, 0.12)] },
      { straight: false, pts: tcArcPts(0, 0.12, 0.78, 0, 180, 30) },
      { straight: true, pts: [tcPt(-0.78, 0.12), tcPt(-0.78, -0.62)] }],
  },
  quadG: { parts: tcSides([tcPt(-0.86, -0.36), tcPt(0.44, -0.9), tcPt(0.9, 0.4), tcPt(-0.56, 0.86)], 0) },
  pentP: { parts: tcSides([tcPt(-0.92, -0.24), tcPt(-0.22, -0.92), tcPt(0.74, -0.5), tcPt(0.9, 0.52), tcPt(-0.62, 0.88)], 0) },
  hept: { parts: tcSides(tcRegular(7, -90), 0) },
};

/* ── outline geometry in working-area units ──────────────────────────────────────────── */
const tcOut = (id: string, pl: any) => {
  const pts: any[] = [];
  TCF[id].parts.forEach((part: any, i: number) => part.pts.forEach((p: any, j: number) => {
    if (i > 0 && j === 0) return;
    pts.push(tcPt(pl.cx + pl.s * p.x, pl.cy + pl.s * p.y));
  }));
  return pts;
};
const tcCum = (pts: any[]) => {
  const c = [0];
  for (let i = 1; i < pts.length; i++) c.push(c[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
  return c;
};
const tcIsShut = (id: string) => {
  const ps = TCF[id].parts, a = ps[0].pts[0], lp = ps[ps.length - 1].pts, b = lp[lp.length - 1];
  return Math.hypot(a.x - b.x, a.y - b.y) < 0.004;
};
const tcAt = (pts: any[], c: any[], s: number) => {
  const total = c[c.length - 1];
  let t = s % total; if (t < 0) t += total;
  let i = 1; while (i < c.length - 1 && c[i] < t) i++;
  const f = (t - c[i - 1]) / Math.max(1e-6, c[i] - c[i - 1]);
  return tcPt(pts[i - 1].x + (pts[i].x - pts[i - 1].x) * f, pts[i - 1].y + (pts[i].y - pts[i - 1].y) * f);
};
const tcTrail = (pts: any[], c: any[], from: number, len: number, loop: boolean) => {
  const total = c[c.length - 1], out: any[] = [];
  for (let k = 0; k <= 80; k++) {
    const s = from + len * (k / 80);
    out.push(loop ? tcAt(pts, c, s) : tcAt(pts, c, Math.min(s, total - 0.001)));
  }
  return out;
};
const tcD = (pts: any[]) => pts.map((p: any, i: number) => (i ? "L " : "M ") + Math.round(p.x * 100) / 100 + " " + Math.round(p.y * 100) / 100).join(" ");
/* the two free ends of an unclosed outline, and the middle of the break between them */
const tcEnds = (id: string, pl: any) => { const o = tcOut(id, pl); return { a: o[0], b: o[o.length - 1] }; };
const tcBreak = (id: string, pl: any) => { const e = tcEnds(id, pl); return tcPt((e.a.x + e.b.x) / 2, (e.a.y + e.b.y) / 2); };
const tcVerts = (id: string, pl: any) => TCF[id].parts.map((p: any) => tcPt(pl.cx + pl.s * p.pts[0].x, pl.cy + pl.s * p.pts[0].y));
const tcMids = (id: string, pl: any) => TCF[id].parts.map((p: any) => {
  const a = p.pts[0], b = p.pts[p.pts.length - 1];
  return tcPt(pl.cx + pl.s * (a.x + b.x) / 2, pl.cy + pl.s * (a.y + b.y) / 2);
});

/* where everything stands, per item (the picture never moves inside a phase) */
const TC_WIDE = { x: 0, y: 6, w: 770, h: 404 };
const TC_SHEET = { x: 0, y: 6, w: 640, h: 404 };
const TC_GATE = { x: 666, y: 6, w: 420, h: 404 };
const tcScene = (n: number, item: any) => {
  if (item.figs) return {
    kind: "gate", figs: item.figs, sheet: TC_SHEET, gate: TC_GATE,
    pls: item.figs.map((f: string, i: number) => ({ cx: 110 + 212 * i, cy: 196, s: 92 })),
    gatePl: { cx: 876, cy: 258, s: 106 },
  };
  if (item.kind === "count") return { kind: "count", figs: [item.fig], sheet: TC_SHEET, gate: null, pls: [{ cx: 320, cy: 200, s: 170 }], gatePl: null };
  return { kind: "one", figs: [item.fig], sheet: TC_WIDE, gate: null, pls: [{ cx: 385, cy: 202, s: 180 }], gatePl: null };
};

const TC_NAMES = ["triangle", "quadrilateral"];
const TC_CARD = { x: 666, y: 380, w: 420, h: 130 };
const tcKeyBox = (i: number) => ({ x: TC_CARD.x + 10 + i * ((TC_CARD.w - 30) / 2 + 10), y: TC_CARD.y + 12, w: (TC_CARD.w - 30) / 2, h: TC_CARD.h - 24 });
const TC_BLUE = CONTENT.hundred;
const TC_END = CONTENT.pointer;
const TC_AMBER = CONTENT.ten;
const TC_FLOOD = CONTENT.one;
const TC_GLASS_R = 46;
const TC_MAG = 6;
/* the slice of outline the glass swells, cut to the glass in geometry (never only by a clip path,
   which would leave the drawn path's own box spilling over the whole stage). A figure that does not
   close is sampled as two runs, so the glass never draws a line across the very break it opens. */
const tcMagRuns = (id: string, pl: any, gx: number, gy: number) => {
  const pts = tcOut(id, pl), c = tcCum(pts), total = c[c.length - 1], shut = tcIsShut(id), r = TC_GLASS_R - 7;
  let bs = 0, bd = 1e9;
  for (let i = 0; i < pts.length; i++) { const d = Math.hypot(pts[i].x - gx, pts[i].y - gy); if (d < bd) { bd = d; bs = c[i]; } }
  if (bd > r / TC_MAG + 34) return [];
  const span = r / TC_MAG + 7, runs: any[] = [];
  let cur: any[] = [], lap = 9;
  for (let s = bs - span; s <= bs + span; s += 0.7) {
    let t = s, side = 0;
    if (t < 0) { t += total; side = -1; }
    if (t > total) { t -= total; side = 1; }
    const p = tcAt(pts, c, t);
    const m = tcPt(gx + (p.x - gx) * TC_MAG, gy + (p.y - gy) * TC_MAG);
    const inside = Math.hypot(m.x - gx, m.y - gy) <= r;
    if (!inside || (!shut && side !== lap && lap !== 9)) { if (cur.length > 1) runs.push(cur); cur = []; }
    lap = side;
    if (inside) cur.push(m);
  }
  if (cur.length > 1) runs.push(cur);
  return runs;
};
const tcHoldGlass = (p: any) => tcPt(Math.max(TC_GLASS_R + 6, Math.min(W.w - 62, p.x)), Math.max(TC_GLASS_R + 6, Math.min(W.h - 62, p.y)));

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = { sheet: TC_SHEET, wide: TC_WIDE, gate: TC_GATE, glassR: TC_GLASS_R, magnify: TC_MAG, figures: TCF };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived from the outlines themselves, by a route that shares no code
   with judge or with the picture. A figure is closed when its last point is its first; a polygon
   is a closed figure whose every part is straight; its corners are its sides. */
const oracle = () => {
  const shut = (id: string) => {
    const ps = TCF[id].parts, a = ps[0].pts[0], z = ps[ps.length - 1].pts;
    const b = z[z.length - 1];
    return Math.abs(a.x - b.x) < 0.004 && Math.abs(a.y - b.y) < 0.004;
  };
  const straightOnly = (id: string) => TCF[id].parts.every((p: any) => p.straight === true);
  const corners = (id: string) => TCF[id].parts.length;
  return PHASES.every((p: any) => p.items.every((it: any) => {
    if (it.kind === "shut") return it.answer === (shut(it.fig) ? "closed" : "open");
    if (it.kind === "find") return !shut(it.fig) && it.answer === "gap";
    if (it.kind === "join") return !shut(it.fig) && it.answer === "join";
    if (it.kind === "gate") {
      const pass = it.figs.filter((f: string) => shut(f) && straightOnly(f));
      return pass.length === 1 && pass[0] === it.answer;
    }
    if (it.kind === "rule") return it.answer === (shut(it.fig) && straightOnly(it.fig) ? "polygon" : "not a polygon");
    const k = corners(it.fig);
    if (typeof it.answer === "string") return it.answer === (k === 3 ? "triangle" : k === 4 ? "quadrilateral" : "");
    if (it.parts) return it.answer[0] === k && it.answer[1] === k;
    return it.answer === k;
  }));
};
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => (item.near !== undefined ? item.near
  : item.parts ? item.answer.map((x: any, k: number, a: any[]) => (x !== null && a.slice(k + 1).every((y: any) => y === null) ? x + 1 : x ?? "")).join("|")
  : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print. A word answer is one of
   the keys standing on the pad all through the question, so its words are not a giveaway. */
const answerForms = (item: any) => (item.parts ? item.answer.filter((x: any) => typeof x === "number" && x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
  : []);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => T.submit(item.answer);
/* the agent's answer() for an item made on the working area: set it as a child would */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(item, v) : undefined);
/* the agent's check() before Enter: undefined = press Enter */
const check = () => undefined;

/* ── small drawn pieces of the working area ───────────────────────────────────────────── */
function TcFlag({ x, y, C, lit }: any) {
  /* planted on the very top of a figure, the flag hangs the other way, so it never leaves the sheet */
  const d = y < 76 ? 1 : -1, tip = y + d * 58, mid = y + d * 45, foot = y + d * 32;
  return (
    <g>
      <path d={`M ${x} ${y} L ${x} ${tip}`} stroke={CONTENT.line} strokeWidth={6} strokeLinecap="round" />
      <path d={`M ${x} ${tip} L ${x + 44} ${mid} L ${x} ${foot} Z`} fill={lit ? TC_AMBER : tint(TC_AMBER, 0.3)} stroke={shade(TC_AMBER, 0.35)} strokeWidth={3} strokeLinejoin="round" />
      <circle cx={x} cy={y} r={9} fill={CONTENT.line} />
    </g>
  );
}
function TcGlass({ x, y, C, runs }: any) {
  return (
    <g>
      <circle cx={x} cy={y} r={TC_GLASS_R - 5} fill={C.paper} />
      {(runs || []).map((rn: any[], i: number) => (
        <path key={i} d={tcD(rn)} fill="none" stroke={TC_BLUE} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
      ))}
      <circle cx={x} cy={y} r={TC_GLASS_R - 5} fill="none" stroke={CONTENT.line} strokeWidth={7} />
      <path d={`M ${x + 28} ${y + 28} L ${x + 48} ${y + 48}`} stroke={CONTENT.line} strokeWidth={10} strokeLinecap="round" />
    </g>
  );
}
function TcRuler({ a, b, ring }: any) {
  const ang = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
  const len = Math.hypot(b.x - a.x, b.y - a.y);
  return (
    <g transform={`translate(${a.x} ${a.y}) rotate(${ang})`}>
      {ring && <rect x={-6} y={-24} width={len + 12} height={30} rx={8} fill={tint(TC_AMBER, 0.45)} />}
      <rect x={0} y={-16} width={len} height={15} rx={4} fill={CONTENT.line} />
    </g>
  );
}

/* ── the working area: 1086 x 528, origin at its top-left ────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const sc = tcScene(n, item);
  const busy = tl.busy;

  const blank = (it: any) => ({
    flag: null, trail: 0, arrived: null, flood: 0, glass: null, glassOn: false,
    gated: null, joined: false, endAt: null, endStep: 0, name: "", sides: [], corners: [], ruler: null, note: "", lit: 0, demo: null, acted: false,
    mode: it && it.mode === "corners" ? "corners" : "sides", figIdx: 0,
  });
  const [st, setSt] = useState<any>(() => blank(item));
  const stRef = useRef<any>(st);
  const put = (o: any) => { stRef.current = { ...stRef.current, ...o }; setSt(stRef.current); };
  const putDemo = (o: any) => put({ demo: { ...(stRef.current.demo || {}), ...o } });

  useEffect(() => { tl.stop(); stRef.current = blank(item); setSt(stRef.current); }, [n, index, stage === "free"]);

  /* ── geometry for the item on screen ── */
  const main = sc.figs[0];
  const mainPl = sc.pls[0];
  const shutMain = tcIsShut(main);
  const gm = (id: string, pl: any) => { const pts = tcOut(id, pl); return { pts, c: tcCum(pts) }; };

  const flagS = (idx: number) => {
    const s = stRef.current;
    if (s.flag !== null && s.flag !== undefined) return s.flag;
    if (stage === "free") return 0;
    if (item.flagAt !== undefined && item.flagAt !== null) { const g = gm(main, mainPl); return g.c[g.c.length - 1] * item.flagAt; }
    return 0;
  };

  /* ── the trace, the flood, the ruler: one timeline builder for every phase ── */
  const traceSteps = (id: string, pl: any, from: number, tail: any) => {
    const g = gm(id, pl), total = g.c[g.c.length - 1], shut = tcIsShut(id);
    const len = shut ? total : Math.max(1, total - from);
    const steps: any[] = [[260, () => put({ flag: from, trail: 0, arrived: null, flood: 0 })]];
    for (let i = 1; i <= 20; i++) steps.push([54, () => put({ trail: (len * i) / 20 })]);
    steps.push([300, () => { put({ arrived: shut ? "home" : "end" }); api.sfx.tick(); }]);
    if (shut) for (let i = 1; i <= 5; i++) steps.push([90, () => put({ flood: i / 5 })]);
    return steps.concat(tail || []);
  };
  const rulerSteps = (id: string, pl: any, tail: any) => {
    const steps: any[] = [];
    TCF[id].parts.forEach((p: any, i: number) => {
      steps.push([620, () => { put({ ruler: { fig: id, part: i, ring: p.straight === true } }); if (p.straight) api.sfx.tick(); }]);
    });
    steps.push([420, () => put({ ruler: null })]);
    return steps.concat(tail || []);
  };
  const countSteps = (id: string, pl: any, mode: string, tail: any) => {
    const k = TCF[id].parts.length, steps: any[] = [];
    if (mode !== "corners") { for (let i = 0; i < k; i++) steps.push([330, () => { const a = stRef.current.sides.slice(); a[i] = true; put({ sides: a, mode: "sides" }); api.sfx.tick(); }]); }
    if (mode !== "sides") { for (let i = 0; i < k; i++) steps.push([330, () => { const a = stRef.current.corners.slice(); a[i] = true; put({ corners: a, mode: "corners" }); api.sfx.tick(); }]); }
    return steps.concat(tail || []);
  };
  const say = (word: string) => [[200, () => put({ note: word })]];

  const showIt = (why: string) => {
    if (item.kind === "shut") {
      const word = item.answer;
      return traceSteps(main, mainPl, flagS(0), item.fig === "pent" ? [[420, () => putDemo({ glass: tcHoldGlass(tcBreak(main, mainPl)) })]].concat(say(word)) : say(word));
    }
    if (item.kind === "find") {
      return traceSteps(main, mainPl, flagS(0), [[380, () => putDemo({ glass: tcHoldGlass(tcBreak(main, mainPl)) })]].concat(say("open")));
    }
    if (item.kind === "join") {
      return ([[300, () => putDemo({ joined: true, endAt: null })]] as any[]).concat(traceSteps(main, mainPl, 0, say("closed")));
    }
    if (item.kind === "gate") {
      const wrongPick = why === "miss" && stRef.current.gated && stRef.current.gated !== item.answer ? stRef.current.gated : null;
      let steps: any[] = [];
      if (wrongPick) {
        if (!tcIsShut(wrongPick)) steps = steps.concat([[700, () => { putDemo({ gated: wrongPick }); put({ lit: 1 }); }], [900, () => { putDemo({ gated: null }); put({ lit: 0 }); }]]);
        else steps = steps.concat([[500, () => { putDemo({ gated: wrongPick }); put({ lit: 2 }); }]], rulerSteps(wrongPick, sc.gatePl, [[400, () => { putDemo({ gated: null }); put({ lit: 0 }); }]]));
      }
      return steps.concat([[500, () => { putDemo({ gated: item.answer }); put({ lit: 2 }); }]], rulerSteps(item.answer, sc.gatePl, say("polygon")));
    }
    if (item.kind === "rule") return rulerSteps(main, mainPl, say(item.answer));
    return countSteps(main, mainPl, item.mode, item.mode === "both"
      ? ([[200, () => put({ note: "done" })], [340, () => putDemo({ name: item.answer })]] as any[]) : say("done"));
  };

  /* the traceback: the maths redrawn, ending on the whole right answer, nothing marked */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    tl.run(showIt("miss"), () => api.lock(false));
  }, [wrong]);

  /* the win: the same maths, run because the child called it right */
  useEffect(() => {
    if (stage !== "win") return;
    tl.run(showIt("win"));
  }, [stage]);

  /* ── the child's own acts ── */
  const freeFigs = ["quad", "ring", "leaf", "pent5", "triGap", "hept"];
  const shown = () => (stage === "free" ? freeFigs[stRef.current.figIdx % freeFigs.length] : main);
  const shownPl = () => (stage === "free" ? { cx: 385, cy: 198, s: 166 } : mainPl);
  const live = (stage === "ask" || stage === "teach" || stage === "free") && !busy;
  /* PATTERNS section 7: a correction draws on `demo`, which the child's next act wipes. Nothing the
     traceback writes there is ever read back by worked(), so a bare Enter after a miss answers nothing. */
  const touched = () => { if (stRef.current.note || stRef.current.demo) put({ note: "", demo: null }); };
  const release = () => { try { const a: any = window.document.activeElement; if (a && a.blur) a.blur(); } catch (e) {} };

  const plantNear = (p: any) => {
    const g = gm(shown(), shownPl());
    let best = 0, bd = 1e9;
    for (let i = 0; i < g.pts.length; i++) { const d = Math.hypot(g.pts[i].x - p.x, g.pts[i].y - p.y); if (d < bd) { bd = d; best = i; } }
    if (bd > 150) return;
    put({ flag: g.c[best], trail: 0, arrived: null, flood: 0 });
    api.sfx.tick();
  };
  /* A keyboard press (Enter or Space on the piece) and a tap both arrive with no place of their own:
     the keys route carries no coordinates at all, so `put` it where the piece belongs, which is what a
     tap on a piece means anyway (LAYOUT section 3). Focus then goes back to the page, so the next Enter
     answers instead of pressing the piece again (PATTERNS section 5, no keyboard trap). */
  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (!live) return;
    touched();
    const ok = !!moved && !!p && typeof p.x === "number" && typeof p.y === "number" && isFinite(p.x) && isFinite(p.y);
    if (pay.kind === "flag") { if (!ok) { put({ flag: 0 }); api.sfx.tick(); release(); } else plantNear(p); return; }
    if (pay.kind === "glass") {
      const g = gm(shown(), shownPl()), tot = g.c[g.c.length - 1], s0 = stRef.current;
      const home = ok ? tcHoldGlass(p)
        : tcHoldGlass(s0.arrived === "end" ? tcAt(g.pts, g.c, (s0.flag || 0) + s0.trail) : tcAt(g.pts, g.c, tot * 0.4));
      put({ glass: home, glassOn: true, acted: true });
      api.sfx.tick();
      if (!ok) release();
      return;
    }
    if (pay.kind === "end") {
      const tgt = tcEnds(main, mainPl).a;
      if (ok) {
        const near = Math.hypot(p.x - tgt.x, p.y - tgt.y) < 90;
        put(near ? { joined: true, endAt: null, acted: true }
          : { joined: false, endAt: tcPt(Math.max(58, Math.min(W.w - 58, p.x)), Math.max(58, Math.min(W.h - 58, p.y))), acted: true });
      } else {
        /* a keyboard press walks the end from corner to corner, starting away from the one it belongs
           to, so it takes a deliberate act to land it, as a drag does */
        const vs = tcVerts(main, mainPl), k = ((stRef.current.endStep || 0) + 1) % vs.length;
        put({ endStep: k, joined: k === 0, endAt: k === 0 ? null : tcPt(vs[k].x, vs[k].y), acted: true });
        if (k === 0) release();
      }
      api.sfx.tick();
      return;
    }
    if (pay.kind === "fig") {
      const inGate = !ok || !!(sc.gate && p.x > sc.gate.x - 10);
      put({ gated: inGate ? pay.id : null, acted: inGate });
      if (inGate) api.sfx.tick();
      if (!ok) release();
      return;
    }
    if (pay.kind === "pick") { put(blank(item)); put({ figIdx: pay.i, flag: null }); api.sfx.tick(); if (!ok) release(); }
  });

  const tapSide = (i: number) => { if (!live) return; touched(); const a = stRef.current.sides.slice(); a[i] = true; put({ sides: a }); api.sfx.tick(); };
  const tapCorner = (i: number) => { if (!live) return; touched(); const a = stRef.current.corners.slice(); a[i] = true; put({ corners: a }); api.sfx.tick(); };
  const pickName = (nm: string) => { if (!live) return; touched(); put({ name: nm, acted: true }); api.sfx.tick(); release(); };
  const runTrace = () => { if (!live) return; touched(); api.lock(true); tl.run(traceSteps(shown(), shownPl(), flagS(0), null), () => api.lock(false)); };

  /* what Enter sends when the answer is made on the working area */
  const worked = () => {
    const s = stRef.current;
    if (item.kind === "find") {
      if (!s.glass) return null;
      const br = tcBreak(main, mainPl);
      if (Math.hypot(s.glass.x - br.x, s.glass.y - br.y) < 54) return "gap";
      const g = gm(main, mainPl);
      for (let i = 0; i < g.pts.length; i++) if (Math.hypot(g.pts[i].x - s.glass.x, g.pts[i].y - s.glass.y) < 60) return "outline";
      return null;
    }
    if (item.kind === "join") return s.joined ? "join" : s.endAt ? "short" : null;
    if (item.kind === "gate") return s.gated || null;
    if (item.kind === "count") return s.name || null;
    return null;
  };
  api.onEnter(item.pad === "enter" && stage === "ask" ? () => {
    const v = worked();
    if (v === null || !stRef.current.acted) return;
    put({ acted: false });
    api.submit(v);
  } : null);

  HOOK.set = (it: any, v: any) => {
    if (it.kind === "find") {
      const g = gm(main, mainPl);
      put({ glass: tcHoldGlass(String(v) === "gap" ? tcBreak(main, mainPl) : tcAt(g.pts, g.c, g.c[g.c.length - 1] * 0.45)), glassOn: true });
    }
    else if (it.kind === "join") put({ joined: String(v) === "join", endAt: String(v) === "join" ? null : tcPt(200, 380) });
    else if (it.kind === "gate") put({ gated: String(v) });
    else if (it.kind === "count") put({ name: String(v) });
    put({ acted: true });
    return true;
  };

  /* what the host and the agent read back (toolApi.getState). Nothing here says how a figure
     turns out until the tracer has been round it. */
  api.share({
    figure: sc.figs[stage === "free" ? st.figIdx : 0],
    flag: st.flag === null ? null : Math.round(st.flag),
    traceDone: !!st.arrived,
    closed: st.arrived ? st.arrived === "home" : null,
    gapFound: !!(st.glassOn && st.glass),
    straightParts: st.ruler ? st.ruler.part + 1 : 0,
    sides: st.sides.filter(Boolean).length, corners: st.corners.filter(Boolean).length,
  });

  /* ── drawing ─────────────────────────────────────────────────────────────────────── */
  const drawId = stage === "free" ? freeFigs[st.figIdx % freeFigs.length] : main;
  const drawPl = stage === "free" ? { cx: 385, cy: 198, s: 166 } : mainPl;
  const sheet = stage === "free" ? TC_WIDE : sc.sheet;

  const g0 = gm(drawId, drawPl);
  const shut0 = tcIsShut(drawId);
  const dm = st.demo || {};
  const vGated = dm.gated !== undefined ? dm.gated : st.gated;
  const vJoined = dm.joined !== undefined ? dm.joined : st.joined;
  const vEndAt = dm.endAt !== undefined ? dm.endAt : st.endAt;
  const vName = dm.name !== undefined ? dm.name : st.name;
  const vGlass = dm.glass !== undefined ? dm.glass : st.glass;
  const vGlassOn = dm.glass !== undefined ? !!dm.glass : st.glassOn;
  const joinSeg = item.kind === "join" && vJoined ? tcEnds(drawId, drawPl) : null;
  const trailPts = st.trail > 0 ? tcTrail(g0.pts, g0.c, st.flag || 0, st.trail, shut0) : null;

  const outline = (id: string, pl: any, key: string, faded: boolean) => (
    <path key={key} d={tcD(tcOut(id, pl))} fill="none" stroke={faded ? tint(TC_BLUE, 0.45) : TC_BLUE} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
  );

  const ends = !shut0 ? tcEnds(drawId, drawPl) : null;
  /* when the trace stops a long way from the flag, a near-black bracket spans the space between */
  const bracket = (() => {
    if (!ends || st.arrived !== "end" || sc.kind === "gate") return null;
    const a = ends.a, b = ends.b;
    if (Math.hypot(a.x - b.x, a.y - b.y) < 110) return null;
    let low = 0; for (let i = 0; i < g0.pts.length; i++) if (g0.pts[i].y > low) low = g0.pts[i].y;
    const yb = Math.min(sheet.y + sheet.h - 18, low + 34), arm = 22;
    return `M ${a.x} ${yb - arm} L ${a.x} ${yb} L ${b.x} ${yb} L ${b.x} ${yb - arm}`;
  })();
  const ruler = st.ruler ? (() => {
    const p = TCF[st.ruler.fig].parts[st.ruler.part];
    const pl = sc.gatePl && vGated === st.ruler.fig ? sc.gatePl : drawPl;
    const a = tcPt(pl.cx + pl.s * p.pts[0].x, pl.cy + pl.s * p.pts[0].y);
    const b = tcPt(pl.cx + pl.s * p.pts[p.pts.length - 1].x, pl.cy + pl.s * p.pts[p.pts.length - 1].y);
    const sky = p.straight !== true ? p.pts.map((q: any) => tcPt(pl.cx + pl.s * q.x, pl.cy + pl.s * q.y)) : null;
    return { a, b, ring: p.straight === true, sky };
  })() : null;

  const verts = item.kind === "count" ? tcVerts(drawId, drawPl) : [];
  const mids = item.kind === "count" ? tcMids(drawId, drawPl) : [];
  const sideMode = item.mode === "both" ? (st.sides.filter(Boolean).length >= verts.length ? "corners" : "sides") : item.mode;
  const preDots = item.mode === "sides";
  const tallied = item.kind === "count" && item.mode === "both"
    && st.sides.filter(Boolean).length >= TCF[drawId].parts.length && st.corners.filter(Boolean).length >= TCF[drawId].parts.length;
  const cardUp = item.kind === "count" && item.mode === "both" && (tallied || !!vName);
  const preSides = item.mode === "corners";

  /* the one thing that invites a finger */
  let invite: any = null;
  if (live && stage !== "idle" && !st.demo) {
    if (item.kind === "shut" && item.flagAt === undefined && st.flag === null) invite = tcPt(62, 468);
    else if (item.kind === "shut" && item.flagAt !== undefined && !st.arrived) invite = tcAt(g0.pts, g0.c, flagS(0));
    else if (item.kind === "find") invite = st.arrived ? tcPt(vGlass ? vGlass.x : 210, vGlass ? vGlass.y : 462) : tcAt(g0.pts, g0.c, flagS(0));
    else if (item.kind === "join" && !st.joined && ends) invite = vEndAt || ends.b;
    else if (item.kind === "gate" && !st.gated) invite = tcPt(sc.pls[0].cx, sc.pls[0].cy);
    else if (item.kind === "count") {
      if (cardUp && !vName) invite = tcPt(TC_CARD.x + TC_CARD.w / 2, TC_CARD.y + TC_CARD.h / 2);
      else if (sideMode === "sides") { const i = mids.findIndex((m: any, k: number) => !st.sides[k]); if (i >= 0) invite = mids[i]; }
      else { const i = verts.findIndex((m: any, k: number) => !st.corners[k]); if (i >= 0) invite = verts[i]; }
    }
  }
  if (invite) invite = tcPt(Math.max(60, Math.min(W.w - 60, invite.x)), Math.max(60, Math.min(W.h - 60, invite.y)));

  return (
    <g>
      {/* the sheet the figure is drawn on */}
      <rect x={sheet.x} y={sheet.y} width={sheet.w} height={sheet.h} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />

      {/* the polygon gate */}
      {sc.gate && (
        <g>
          <rect x={sc.gate.x} y={sc.gate.y} width={sc.gate.w} height={sc.gate.h} rx={RAD.panel} fill={C.paper} stroke={CONTENT.line} strokeWidth={3} />
          <text x={sc.gate.x + 24} y={sc.gate.y + 52} fontSize={T.label} fontWeight={st.lit === 1 ? 700 : 500} fill={st.lit === 1 ? shade(TC_AMBER, 0.3) : C.ink}>{tx("1 closed?")}</text>
          <text x={sc.gate.x + 24} y={sc.gate.y + 100} fontSize={T.label} fontWeight={st.lit === 2 ? 700 : 500} fill={st.lit === 2 ? shade(TC_AMBER, 0.3) : C.ink}>{tx("2 straight only?")}</text>
          <path d={`M ${sc.gate.x + 20} ${sc.gate.y + 124} H ${sc.gate.x + sc.gate.w - 20}`} stroke={C.rule} strokeWidth={2} />
          {!vGated && <rect x={sc.gate.x + 48} y={sc.gate.y + 152} width={sc.gate.w - 96} height={212} rx={RAD.panel} fill="none" stroke={C.rule} strokeWidth={3} strokeDasharray="12 14" />}
        </g>
      )}

      {/* the figures waiting on the sheet */}
      {sc.kind === "gate" && sc.figs.map((f: string, i: number) => (
        st.gated === f ? null : (
          <g key={f} {...control("fig-" + f, "figure " + (i + 1))} {...drag.bind({ kind: "fig", id: f })} {...drag.keys({ kind: "fig", id: f })}>
            <rect x={sc.pls[i].cx - 58} y={sc.pls[i].cy - 58} width={116} height={116} fill="transparent" />
            {outline(f, sc.pls[i], f, dm.gated === f)}
            {tcIsShut(f) && <path d={tcD(tcOut(f, sc.pls[i]))} fill={TC_FLOOD} fillOpacity={0.3} stroke="none" />}
            {!tcIsShut(f) && <circle cx={tcEnds(f, sc.pls[i]).b.x} cy={tcEnds(f, sc.pls[i]).b.y} r={9} fill={TC_END} />}
          </g>
        )
      ))}
      {sc.kind === "gate" && vGated && (
        <g pointerEvents="none">
          {outline(vGated, sc.gatePl, "gated", false)}
          {tcIsShut(vGated) && <path d={tcD(tcOut(vGated, sc.gatePl))} fill={TC_FLOOD} fillOpacity={0.3} stroke="none" />}
          {!tcIsShut(vGated) && <circle cx={tcEnds(vGated, sc.gatePl).b.x} cy={tcEnds(vGated, sc.gatePl).b.y} r={9} fill={TC_END} />}
        </g>
      )}

      {/* the one figure being studied */}
      {sc.kind !== "gate" && (
        <g>
          {st.flood > 0 && (
            <g pointerEvents="none">
              <defs><clipPath id="tcflood"><circle cx={drawPl.cx} cy={drawPl.cy} r={Math.max(1, st.flood * drawPl.s * 1.6)} /></clipPath></defs>
              <path d={tcD(g0.pts)} fill={TC_FLOOD} fillOpacity={0.34} stroke="none" clipPath="url(#tcflood)" />
            </g>
          )}
          {trailPts && <path pointerEvents="none" d={tcD(trailPts)} fill="none" stroke={TC_AMBER} strokeWidth={26} strokeLinecap="round" strokeLinejoin="round" opacity={0.85} />}
          {outline(drawId, drawPl, "main", false)}
          {joinSeg && <path pointerEvents="none" d={`M ${joinSeg.b.x} ${joinSeg.b.y} L ${joinSeg.a.x} ${joinSeg.a.y}`} stroke={TC_BLUE} strokeWidth={10} strokeLinecap="round" />}
          {st.arrived === "end" && ends && <circle cx={ends.b.x} cy={ends.b.y} r={14} fill={TC_END} />}
          {st.arrived === "end" && ends && <circle cx={ends.a.x} cy={ends.a.y} r={11} fill={TC_END} />}
          {st.arrived && st.trail > 0 && <circle cx={tcAt(g0.pts, g0.c, (st.flag || 0) + st.trail).x} cy={tcAt(g0.pts, g0.c, (st.flag || 0) + st.trail).y} r={17} fill={TC_AMBER} stroke={shade(TC_AMBER, 0.35)} strokeWidth={3} />}
          {(stage === "free" || ((st.flag !== null || item.flagAt !== undefined) && item.kind !== "join" && item.kind !== "count")) && (
            <TcFlag x={tcAt(g0.pts, g0.c, flagS(0)).x} y={tcAt(g0.pts, g0.c, flagS(0)).y} C={C} lit={true} />
          )}
        </g>
      )}

      {/* phase 1: the flag waits in its tray until a finger puts it on the outline */}
      {item.kind === "shut" && item.flagAt === undefined && stage !== "free" && st.flag === null && (
        <g>
          <rect x={8} y={422} width={120} height={96} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          <g {...control("flag", "start flag")} {...drag.bind({ kind: "flag" })} {...drag.keys({ kind: "flag" })}>
            <rect x={20} y={424} width={96} height={92} fill="transparent" />
            <TcFlag x={48} y={508} C={C} lit={true} />
          </g>
        </g>
      )}
      {/* phase 2: the flag is already planted; a tap on it sends the tracer */}
      {item.flagAt !== undefined && stage !== "free" && !st.arrived && (
        <Hit id="send" x={tcAt(g0.pts, g0.c, flagS(0)).x - 48} y={tcAt(g0.pts, g0.c, flagS(0)).y - 60} w={96} h={96} onPress={runTrace} label="send the tracer" />
      )}
      {bracket && <path pointerEvents="none" d={bracket} fill="none" stroke={CONTENT.line} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />}
      {/* the loose end of the rectangle, waiting to meet the first corner */}
      {item.kind === "join" && ends && (
        <g>
          <circle cx={ends.a.x} cy={ends.a.y} r={10} fill={TC_END} />
          {vEndAt && !vJoined && <path d={`M ${ends.b.x} ${ends.b.y} L ${vEndAt.x} ${vEndAt.y}`} stroke={TC_BLUE} strokeWidth={10} strokeLinecap="round" />}
          {!st.joined && (
            <g {...control("end", "loose end")} {...drag.bind({ kind: "end" })} {...drag.keys({ kind: "end" })}>
              <rect x={(vEndAt || ends.b).x - 48} y={(vEndAt || ends.b).y - 48} width={96} height={96} fill="transparent" />
              <circle cx={(vEndAt || ends.b).x} cy={(vEndAt || ends.b).y} r={15} fill={TC_END} />
            </g>
          )}
        </g>
      )}

      {/* the gap finder */}
      {(item.kind === "find" || item.kind === "shut" && item.flagAt !== undefined || stage === "free") && (
        <g>
          {vGlassOn && vGlass
            ? <g {...control("glass", "gap finder")} {...drag.bind({ kind: "glass" })} {...drag.keys({ kind: "glass" })}>
                <rect x={vGlass.x - 52} y={vGlass.y - 52} width={104} height={104} fill="transparent" />
                <TcGlass x={vGlass.x} y={vGlass.y} C={C} runs={tcMagRuns(drawId, drawPl, vGlass.x, vGlass.y)} />
              </g>
            : <g {...control("glass", "gap finder")} {...drag.bind({ kind: "glass" })} {...drag.keys({ kind: "glass" })}>
                <rect x={158} y={414} width={104} height={104} fill="transparent" />
                <TcGlass x={210} y={462} C={C} runs={null} />
              </g>}
        </g>
      )}

      {/* the straightedge, laid along one part at a time */}
      {ruler && (
        <g pointerEvents="none">
          {ruler.sky && <path d={tcD(ruler.sky.concat([ruler.a]))} fill={tint(TC_BLUE, 0.62)} stroke="none" />}
          <TcRuler a={ruler.a} b={ruler.b} ring={ruler.ring} />
        </g>
      )}

      {/* phase 4: the sides and the corners, and the two tally boards */}
      {item.kind === "count" && stage !== "free" && (
        <g>
          {TCF[drawId].parts.map((p: any, i: number) => (st.sides[i] || preSides) && (
            <path key={"s" + i} d={`M ${drawPl.cx + drawPl.s * p.pts[0].x} ${drawPl.cy + drawPl.s * p.pts[0].y} L ${drawPl.cx + drawPl.s * p.pts[p.pts.length - 1].x} ${drawPl.cy + drawPl.s * p.pts[p.pts.length - 1].y}`}
              stroke={TC_AMBER} strokeWidth={30} strokeLinecap="round" opacity={0.9} />
          ))}
          {outline(drawId, drawPl, "over", false)}
          {verts.map((v: any, i: number) => (st.corners[i] || preDots) && <circle key={"c" + i} cx={v.x} cy={v.y} r={13} fill={TC_END} />)}
          {item.names && verts.map((v: any, i: number) => (
            <text key={"n" + i} x={v.x + (v.x > drawPl.cx ? 30 : -30)} y={v.y + (v.y > drawPl.cy ? 34 : -20)} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{item.names[i]}</text>
          ))}
          {live && sideMode === "sides" && mids.map((m: any, i: number) => !st.sides[i] && (
            <Hit key={"hs" + i} id={"side-" + i} x={m.x - 40} y={m.y - 40} w={80} h={80} onPress={() => tapSide(i)} label={"side " + (i + 1)} />
          ))}
          {live && sideMode === "corners" && verts.map((v: any, i: number) => !st.corners[i] && (
            <Hit key={"hc" + i} id={"corner-" + i} x={v.x - 40} y={v.y - 40} w={80} h={80} onPress={() => tapCorner(i)} label={"corner " + (i + 1)} />
          ))}
          <g>
            <rect x={666} y={40} width={420} height={150} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
            <text x={690} y={86} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("sides")}</text>
            {st.sides.map((on: boolean, i: number) => on && <rect key={"ts" + i} x={694 + i * 52} y={112} width={30} height={46} rx={6} fill={TC_AMBER} />)}
            {st.note === "done" && <text x={1060} y={90} textAnchor="end" fontSize={T.xl} fontWeight={700} fill={shade(TC_AMBER, 0.3)}>{String(TCF[drawId].parts.length)}</text>}
          </g>
          <g>
            <rect x={666} y={214} width={420} height={150} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
            <text x={690} y={260} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("corners")}</text>
            {st.corners.map((on: boolean, i: number) => on && <circle key={"tc" + i} cx={709 + i * 52} cy={308} r={16} fill={TC_END} />)}
            {st.note === "done" && <text x={1060} y={264} textAnchor="end" fontSize={T.xl} fontWeight={700} fill={shade(TC_END, 0.25)}>{String(TCF[drawId].parts.length)}</text>}
          </g>
          <g>
            <rect x={TC_CARD.x} y={TC_CARD.y} width={TC_CARD.w} height={TC_CARD.h} rx={RAD.panel} fill={cardUp ? C.paper : "url(#gPanel)"} stroke={C.rule} strokeWidth={2} />
            {!cardUp && <path d={`M ${TC_CARD.x + 94} ${TC_CARD.y + 66} H ${TC_CARD.x + TC_CARD.w - 94}`} stroke={C.rule} strokeWidth={3} strokeDasharray="12 14" />}
            {cardUp && TC_NAMES.map((nm: string, i: number) => {
              const k = tcKeyBox(i);
              return (
                <g key={nm}>
                  <rect x={k.x} y={k.y} width={k.w} height={k.h} rx={14} fill={vName === nm ? tint(C.accent, 0.66) : "url(#gKey)"} stroke={C.rule} strokeWidth={2} />
                  <text x={k.x + k.w / 2} y={k.y + k.h / 2 + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(nm)}</text>
                  {live && <Hit id={"name-" + nm} x={k.x} y={k.y} w={k.w} h={k.h} onPress={() => pickName(nm)} label={nm} />}
                </g>
              );
            })}
          </g>
        </g>
      )}

      {/* free play: a row of figures to pick from */}
      {stage === "free" && (
        <g>
          {freeFigs.map((f: string, i: number) => (
            <g key={"p" + f} {...control("pick-" + f, "figure " + (i + 1))} {...drag.bind({ kind: "pick", i })} {...drag.keys({ kind: "pick", i })}>
              <rect x={20 + i * 112} y={424} width={96} height={92} rx={12} fill={i === st.figIdx ? tint(C.accent, 0.72) : "url(#gPanel)"} stroke={C.rule} strokeWidth={2} />
              {outline(f, { cx: 68 + i * 112, cy: 470, s: 30 }, "p" + f, false)}
            </g>
          ))}
          <Hit id="freetrace" x={700} y={424} w={180} h={92} onPress={runTrace} label="send the tracer" />
          <rect x={700} y={424} width={180} height={92} rx={12} fill="url(#gKey)" stroke={C.rule} strokeWidth={2} pointerEvents="none" />
          <text x={790} y={480} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink} pointerEvents="none">{tx("trace")}</text>
        </g>
      )}

      {/* the figure's own word, once the maths has been redrawn */}
      {st.note && st.note !== "done" && (
        <text pointerEvents="none" x={sc.kind === "gate" ? 876 : 928} y={sc.kind === "gate" ? 388 : 216} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{tx(st.note)}</text>
      )}

      {invite && <Invite x={invite.x} y={invite.y} r={54} C={C} />}
    </g>
  );
}

/* the running count: how many of this phase's figures have been settled */
function Runs({ phase, index, stage, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const total = phase.items.length;
  const done = Math.min(total, index + (stage === "win" || stage === "idle" || stage === "summary" ? 1 : 0));
  return (
    <g>
      <text x={22} y={50} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(stage === "free" ? "Free play" : phase.n === 4 ? "Counted" : "Traced")}</text>
      {stage !== "free" && <text x={308} y={50} textAnchor="end" fontSize={T.label} fontWeight={700} fill={shade(C.accent, 0.2)}>{lang === "hi" ? total + " में से " + done : lang === "gu" ? total + " માંથી " + done : done + " of " + total}</text>}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last ? result.last : null;
  if (!last) return null;
  const sh = last.shared || {};
  const id = sh.figure && TCF[sh.figure] ? sh.figure : "quad";
  const pl = { cx: w / 2, cy: h / 2 - 6, s: Math.min(w, h) * 0.3 };
  const shut = tcIsShut(id);
  const v = tx(Array.isArray(last.value) ? last.value.join(" and ") : String(last.value ?? ""));
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {shut && <path d={tcD(tcOut(id, pl))} fill={TC_FLOOD} fillOpacity={0.3} stroke="none" />}
      <path d={tcD(tcOut(id, pl))} fill="none" stroke={TC_BLUE} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      {!shut && <circle cx={tcEnds(id, pl).b.x} cy={tcEnds(id, pl).b.y} r={5} fill={TC_END} />}
      <text x={w - 12} y={h - 12} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>{v.length > 14 ? v.slice(0, 14) : v}</text>
    </g>
  );
}

function TraceAndClose(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work, Runs,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default TraceAndClose;
