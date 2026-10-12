/* ═══ M2.S3.T4.C12.2D1 · bill_maker · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "bill_maker";
const MEDIA_ID = "M2.S3.T4.C12.2D1";
const TOOL_NAME = "Bill Maker";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["An empty bill and a shelf of prices. Where does each dot belong?"];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every dot in one line, every hundred paise carried, and every bill totalled at its foot.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Any prices on any lines, with the carry circle and the total open.";

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, and the runtime looks each spoken or drawn line up in it.
   Fill it AFTER the English is final and reviewed (`node cli.mjs voice` lists every line still missing),
   then bake the voice. Empty = the tool runs in English only. */
/* Chapter conventions: spoken money in words ("314 रुपये 25 पैसे"; the runtime spells the digits); drawn money
   keeps its digits and point with the rupee sign ₹ (asks, cards, the bill, the slot). Terms: रुपया / રૂપિયો,
   पैसे / પૈસા, कीमत / કિંમત, कुल / કુલ, बिल / બિલ, हासिल / વદી, स्तंभ / સ્તંભ (column), बिंदु / બિંદુ (the dot). */
const TR: any = {
  hi: {
    "Bill Maker": "बिल बनाओ",
    "An empty bill and a shelf of prices. Where does each dot belong?": "एक खाली बिल, और दुकान में कीमतें। हर बिंदु कहाँ आएगा?",
    "Every dot in one line, every hundred paise carried, and every bill totalled at its foot.": "सारे बिंदु एक सीध में, हर सौ पैसे का हासिल। और हर बिल का कुल सबसे नीचे।",
    "Free play. Any prices on any lines, with the carry circle and the total open.": "मुक्त खेल। कोई भी कीमत किसी भी पंक्ति पर रखो, हासिल और कुल देखो।",
    /* phase 1 */
    "Rupees under rupees, paise under paise": "रुपयों के नीचे रुपये, पैसों के नीचे पैसे",
    "Paise always take two places after the dot.": "पैसे हमेशा बिंदु के बाद दो स्थान लेते हैं।",
    "Put each price on the bill. Where must the dots sit?": "हर कीमत बिल पर रखो। बिंदु कहाँ होने चाहिए?",
    "Which digits stand under the rupees of the first price?": "पहली कीमत के रुपयों के नीचे कौन-से अंक हैं?",
    "Add the paise first, then the rupees.": "पहले पैसे जोड़ो, फिर रुपये।",
    "Line up the dots. Then rupees fall under rupees and paise under paise.": "बिंदु एक सीध में रखो। तब रुपयों के नीचे रुपये और पैसों के नीचे पैसे आते हैं।",
    "You learned: line up the dots, so rupees stand under rupees.": "तुमने सीखा: बिंदु एक सीध में, तो रुपयों के नीचे रुपये।",
    "Add Rs 314.25, and Rs 52.60.": "314 रुपये 25 पैसे लो। उसमें 52 रुपये 60 पैसे जोड़ो।",
    "Add Rs 314.25 and Rs 52.60": "₹314.25 और ₹52.60 जोड़ो",
    "Where does the dot go in the total?": "कुल में बिंदु कहाँ आएगा?",
    "Now Rs 42.30, and Rs 25.40.": "अब 42 रुपये 30 पैसे। और 25 रुपये 40 पैसे।",
    "Rs 42.30 and Rs 25.40": "₹42.30 और ₹25.40",
    "How many places come after the dot?": "बिंदु के बाद कितने अंक आते हैं?",
    "Next, Rs 506.15, with Rs 71.20.": "अगला, 506 रुपये 15 पैसे। साथ में 71 रुपये 20 पैसे।",
    "Rs 506.15 with Rs 71.20": "₹506.15 और ₹71.20",
    "Set the dot of Rs 71.20 on the dotted line.": "71 रुपये 20 पैसे का बिंदु बिंदीदार रेखा पर रखो।",
    /* phase 2 */
    "A hundred paise carry one rupee": "सौ पैसे का हासिल एक रुपया",
    "Write the paise sum in the paise box.": "पैसों का जोड़ पैसों के डिब्बे में लिखो।",
    "The paise come to more than a hundred. What happens to the hundred?": "पैसे सौ से ज़्यादा हो जाते हैं। उस सौ का क्या होगा?",
    "Are the paise a hundred or more?": "क्या पैसे सौ या उससे ज़्यादा हैं?",
    "A full strip of a hundred paise is one rupee. Carry it.": "सौ पैसों की भरी पट्टी एक रुपया है। उसे हासिल ले जाओ।",
    "Each hundred paise is carried as one rupee. Only the paise left are written, as two digits.": "हर सौ पैसे एक रुपये का हासिल बनते हैं। बचे पैसे ही लिखे जाते हैं, दो अंकों में।",
    "You learned: each hundred paise is carried as one rupee.": "तुमने सीखा: हर सौ पैसे एक रुपये का हासिल बनते हैं।",
    "Add Rs 128.65 and Rs 47.75.": "128 रुपये 65 पैसे लो। उसमें 47 रुपये 75 पैसे जोड़ो।",
    "Add Rs 128.65 and Rs 47.75": "₹128.65 और ₹47.75 जोड़ो",
    "What do the paise add up to?": "पैसों का जोड़ कितना होता है?",
    "Now Rs 38.85, and Rs 16.45.": "अब 38 रुपये 85 पैसे। और 16 रुपये 45 पैसे।",
    "Rs 38.85 and Rs 16.45": "₹38.85 और ₹16.45",
    "Did a rupee go into the carry circle?": "क्या हासिल वाले गोले में एक रुपया गया?",
    "Last, Rs 249.95, and Rs 150.05.": "आख़िर में, 249 रुपये 95 पैसे। और 150 रुपये 5 पैसे।",
    "Rs 249.95 and Rs 150.05": "₹249.95 और ₹150.05",
    "After the carry, what is left in the paise column?": "हासिल के बाद पैसों वाले स्तंभ में क्या बचता है?",
    /* phase 3 */
    "Two zeros when there are no paise": "पैसे न हों तो दो शून्य",
    "This price has no paise. What goes in its paise column?": "इस कीमत में पैसे नहीं हैं। इसके पैसों वाले स्तंभ में क्या आएगा?",
    "What fills the paise places of a whole-rupee price?": "पूरे रुपयों वाली कीमत में पैसों की जगह क्या भरेगा?",
    "Put the whole rupees under the rupees, then add.": "पूरे रुपये, रुपयों के नीचे रखो, फिर जोड़ो।",
    "In column working, an amount with no paise gets two zeros. In a sentence it is written with no dot, as Rs 29.": "स्तंभ में जोड़ते समय, बिना पैसों वाली रकम में दो शून्य लगते हैं। वाक्य में उसे बिना बिंदु के लिखते हैं, जैसे 29 रुपये।",
    "You learned: no paise? Write two zeros in the paise column.": "तुमने सीखा: पैसे नहीं? पैसों वाले स्तंभ में दो शून्य लिखो।",
    "Work in columns. Add Rs 63.45 and Rs 29.": "स्तंभों में काम करो। 63 रुपये 45 पैसे और 29 रुपये जोड़ो।",
    "Add Rs 63.45 and Rs 29": "₹63.45 और ₹29 जोड़ो",
    "Which price has no paise?": "किस कीमत में पैसे नहीं हैं?",
    "Now Rs 74 and Rs 18.35.": "अब 74 रुपये और 18 रुपये 35 पैसे।",
    "Rs 74 and Rs 18.35": "₹74 और ₹18.35",
    "Where do the 74 rupees stand?": "74 रुपये कहाँ आते हैं?",
    "A child adds Rs 56.20 and Rs 13, and gets Rs 56.33. What went wrong, and what is the sum?": "एक बच्चा 56 रुपये 20 पैसे और 13 रुपये जोड़ता है। उसे 56 रुपये 33 पैसे मिलते हैं। क्या चूक हुई, और सही जोड़ क्या है?",
    "Add Rs 56.20 and Rs 13": "₹56.20 और ₹13 जोड़ो",
    "Did the 13 go under the paise?": "क्या 13 पैसों के नीचे लिखा गया?",
    /* phase 4 */
    "Making a bill": "बिल बनाना",
    "Write each thing and its price. What goes at the foot of the bill?": "हर चीज़ और उसकी कीमत लिखो। बिल में सबसे नीचे क्या आता है?",
    "What did the paise column carry?": "पैसों वाले स्तंभ से कितना हासिल गया?",
    "Add two prices first, then add the next one to that.": "पहले दो कीमतें जोड़ो, फिर उसमें अगली जोड़ो।",
    "A bill lists each thing bought and its price, one to a line, and the total goes at the foot.": "बिल में हर खरीदी चीज़ और उसकी कीमत एक पंक्ति में होती है। कुल सबसे नीचे लिखा जाता है।",
    "You learned: a bill lists each thing and its price, total at the foot.": "तुमने सीखा: बिल में हर चीज़ और कीमत, कुल सबसे नीचे।",
    "Make a bill. A lunch box is Rs 145.50, and a water bottle Rs 89.75. A pencil pouch is Rs 36.40. What is the total?": "एक बिल बनाओ। टिफ़िन 145 रुपये 50 पैसे का है। पानी की बोतल 89 रुपये 75 पैसे की है। पेंसिल पाउच 36 रुपये 40 पैसे का है। कुल कितना है?",
    "Total of the bill?": "बिल का कुल?",
    "Has every price been written on the bill?": "क्या हर कीमत बिल पर लिखी गई?",
    "A kite is Rs 65.50, and a reel of thread Rs 42.75. A cap is Rs 110. Total the bill at its foot.": "पतंग 65 रुपये 50 पैसे की है। धागे की रील 42 रुपये 75 पैसे की है। टोपी 110 रुपये की है। बिल का कुल सबसे नीचे निकालो।",
    "Total at the foot?": "सबसे नीचे कुल?",
    "The cap has no paise. What fills its paise column?": "टोपी में पैसे नहीं हैं। उसके पैसों वाले स्तंभ में क्या भरेगा?",
    "Notebooks are Rs 84.60, and a geometry box Rs 132.85. A pen is Rs 24.90, and crayons Rs 57.45. What does the bill come to?": "कॉपियाँ 84 रुपये 60 पैसे की हैं। कंपास बॉक्स 132 रुपये 85 पैसे का है। पेन 24 रुपये 90 पैसे का है। क्रेयॉन 57 रुपये 45 पैसे के हैं। बिल कितने का बना?",
    "What does the bill come to?": "बिल कितने का बना?",
    "How many full hundreds do the paise make?": "पैसों से कितने पूरे सौ बनते हैं?",
    /* said by the working area */
    "Two places only. A third paise digit does not fit.": "सिर्फ़ दो स्थान। पैसों का तीसरा अंक नहीं आता।",
    "The paise box takes whole paise, with no dot.": "पैसों के डिब्बे में पूरे पैसे आते हैं, बिंदु नहीं।",
    /* drawn on the working area */
    "Shop": "दुकान", "Bill": "बिल", "Rs": "₹", "p": "पैसे", "carry": "हासिल", "Total": "कुल", "paise": "पैसे",
    "of": "में से", "lines": "पंक्ति", "Add": "जोड़ो", "Clear": "मिटाओ",
    "school bag": "स्कूल बैग", "torch": "टॉर्च", "storybook": "किताब", "paints": "रंग", "shoes": "जूते", "socks": "मोज़े",
    "football": "फ़ुटबॉल", "pump": "पंप", "jam": "जैम", "bread": "ब्रेड", "lamp": "लैंप", "bulbs": "बल्ब",
    "cup": "कप", "plate": "थाली", "ball": "गेंद", "juice": "जूस", "towel": "तौलिया", "comb": "कंघी",
    "lunch box": "टिफ़िन", "water bottle": "पानी की बोतल", "pencil pouch": "पेंसिल पाउच",
    "kite": "पतंग", "thread": "धागा", "cap": "टोपी", "notebooks": "कॉपियाँ", "geometry box": "कंपास बॉक्स", "pen": "पेन", "crayons": "क्रेयॉन",
  },
  gu: {
    "Bill Maker": "બિલ બનાવો",
    "An empty bill and a shelf of prices. Where does each dot belong?": "એક ખાલી બિલ, અને દુકાનમાં કિંમતો. દરેક બિંદુ ક્યાં આવશે?",
    "Every dot in one line, every hundred paise carried, and every bill totalled at its foot.": "બધાં બિંદુ એક લીટીમાં, દર સો પૈસાની વદી. અને દરેક બિલનો કુલ સૌથી નીચે.",
    "Free play. Any prices on any lines, with the carry circle and the total open.": "મુક્ત રમત. કોઈ પણ કિંમત કોઈ પણ લીટી પર મૂકો, વદી અને કુલ જુઓ.",
    /* phase 1 */
    "Rupees under rupees, paise under paise": "રૂપિયા નીચે રૂપિયા, પૈસા નીચે પૈસા",
    "Paise always take two places after the dot.": "પૈસા હંમેશાં બિંદુ પછી બે સ્થાન લે છે.",
    "Put each price on the bill. Where must the dots sit?": "દરેક કિંમત બિલ પર મૂકો. બિંદુ ક્યાં હોવાં જોઈએ?",
    "Which digits stand under the rupees of the first price?": "પહેલી કિંમતના રૂપિયા નીચે કયા અંક છે?",
    "Add the paise first, then the rupees.": "પહેલાં પૈસા ઉમેરો, પછી રૂપિયા.",
    "Line up the dots. Then rupees fall under rupees and paise under paise.": "બિંદુ એક લીટીમાં રાખો. પછી રૂપિયા નીચે રૂપિયા અને પૈસા નીચે પૈસા આવે.",
    "You learned: line up the dots, so rupees stand under rupees.": "તમે શીખ્યા: બિંદુ એક લીટીમાં, તો રૂપિયા નીચે રૂપિયા.",
    "Add Rs 314.25, and Rs 52.60.": "314 રૂપિયા 25 પૈસા લો. તેમાં 52 રૂપિયા 60 પૈસા ઉમેરો.",
    "Add Rs 314.25 and Rs 52.60": "₹314.25 અને ₹52.60 ઉમેરો",
    "Where does the dot go in the total?": "કુલમાં બિંદુ ક્યાં આવશે?",
    "Now Rs 42.30, and Rs 25.40.": "હવે 42 રૂપિયા 30 પૈસા. અને 25 રૂપિયા 40 પૈસા.",
    "Rs 42.30 and Rs 25.40": "₹42.30 અને ₹25.40",
    "How many places come after the dot?": "બિંદુ પછી કેટલા અંક આવે છે?",
    "Next, Rs 506.15, with Rs 71.20.": "હવે પછી, 506 રૂપિયા 15 પૈસા. સાથે 71 રૂપિયા 20 પૈસા.",
    "Rs 506.15 with Rs 71.20": "₹506.15 અને ₹71.20",
    "Set the dot of Rs 71.20 on the dotted line.": "71 રૂપિયા 20 પૈસાનું બિંદુ ટપકાંવાળી લીટી પર મૂકો.",
    /* phase 2 */
    "A hundred paise carry one rupee": "સો પૈસાની વદી એક રૂપિયો",
    "Write the paise sum in the paise box.": "પૈસાનો સરવાળો પૈસાના ચોકઠામાં લખો.",
    "The paise come to more than a hundred. What happens to the hundred?": "પૈસા સોથી વધારે થાય છે. એ સોનું શું થશે?",
    "Are the paise a hundred or more?": "શું પૈસા સો કે તેથી વધારે છે?",
    "A full strip of a hundred paise is one rupee. Carry it.": "સો પૈસાની ભરેલી પટ્ટી એક રૂપિયો છે. તેની વદી લઈ જાઓ.",
    "Each hundred paise is carried as one rupee. Only the paise left are written, as two digits.": "દર સો પૈસા એક રૂપિયાની વદી બને છે. બાકી પૈસા જ લખાય છે, બે અંકમાં.",
    "You learned: each hundred paise is carried as one rupee.": "તમે શીખ્યા: દર સો પૈસા એક રૂપિયાની વદી બને છે.",
    "Add Rs 128.65 and Rs 47.75.": "128 રૂપિયા 65 પૈસા લો. તેમાં 47 રૂપિયા 75 પૈસા ઉમેરો.",
    "Add Rs 128.65 and Rs 47.75": "₹128.65 અને ₹47.75 ઉમેરો",
    "What do the paise add up to?": "પૈસાનો સરવાળો કેટલો થાય છે?",
    "Now Rs 38.85, and Rs 16.45.": "હવે 38 રૂપિયા 85 પૈસા. અને 16 રૂપિયા 45 પૈસા.",
    "Rs 38.85 and Rs 16.45": "₹38.85 અને ₹16.45",
    "Did a rupee go into the carry circle?": "શું વદીના વર્તુળમાં એક રૂપિયો ગયો?",
    "Last, Rs 249.95, and Rs 150.05.": "છેલ્લે, 249 રૂપિયા 95 પૈસા. અને 150 રૂપિયા 5 પૈસા.",
    "Rs 249.95 and Rs 150.05": "₹249.95 અને ₹150.05",
    "After the carry, what is left in the paise column?": "વદી પછી પૈસાના સ્તંભમાં શું બાકી રહે છે?",
    /* phase 3 */
    "Two zeros when there are no paise": "પૈસા ન હોય તો બે શૂન્ય",
    "This price has no paise. What goes in its paise column?": "આ કિંમતમાં પૈસા નથી. તેના પૈસાના સ્તંભમાં શું આવશે?",
    "What fills the paise places of a whole-rupee price?": "પૂરા રૂપિયાવાળી કિંમતમાં પૈસાની જગ્યા શાનાથી ભરાય?",
    "Put the whole rupees under the rupees, then add.": "પૂરા રૂપિયા, રૂપિયા નીચે મૂકો, પછી ઉમેરો.",
    "In column working, an amount with no paise gets two zeros. In a sentence it is written with no dot, as Rs 29.": "સ્તંભમાં સરવાળો કરતી વખતે, પૈસા વગરની રકમમાં બે શૂન્ય લખાય. વાક્યમાં તે બિંદુ વગર લખાય, જેમ કે 29 રૂપિયા.",
    "You learned: no paise? Write two zeros in the paise column.": "તમે શીખ્યા: પૈસા નથી? પૈસાના સ્તંભમાં બે શૂન્ય લખો.",
    "Work in columns. Add Rs 63.45 and Rs 29.": "સ્તંભમાં ગણો. 63 રૂપિયા 45 પૈસા અને 29 રૂપિયા ઉમેરો.",
    "Add Rs 63.45 and Rs 29": "₹63.45 અને ₹29 ઉમેરો",
    "Which price has no paise?": "કઈ કિંમતમાં પૈસા નથી?",
    "Now Rs 74 and Rs 18.35.": "હવે 74 રૂપિયા અને 18 રૂપિયા 35 પૈસા.",
    "Rs 74 and Rs 18.35": "₹74 અને ₹18.35",
    "Where do the 74 rupees stand?": "74 રૂપિયા ક્યાં આવે છે?",
    "A child adds Rs 56.20 and Rs 13, and gets Rs 56.33. What went wrong, and what is the sum?": "એક બાળક 56 રૂપિયા 20 પૈસા અને 13 રૂપિયા ઉમેરે છે. તેને 56 રૂપિયા 33 પૈસા મળે છે. શું ભૂલ થઈ, અને સાચો સરવાળો શું છે?",
    "Add Rs 56.20 and Rs 13": "₹56.20 અને ₹13 ઉમેરો",
    "Did the 13 go under the paise?": "શું 13 પૈસા નીચે લખાયું?",
    /* phase 4 */
    "Making a bill": "બિલ બનાવવું",
    "Write each thing and its price. What goes at the foot of the bill?": "દરેક વસ્તુ અને તેની કિંમત લખો. બિલમાં સૌથી નીચે શું આવે?",
    "What did the paise column carry?": "પૈસાના સ્તંભમાંથી કેટલી વદી ગઈ?",
    "Add two prices first, then add the next one to that.": "પહેલાં બે કિંમતો ઉમેરો, પછી તેમાં આગળની ઉમેરો.",
    "A bill lists each thing bought and its price, one to a line, and the total goes at the foot.": "બિલમાં દરેક ખરીદેલી વસ્તુ અને તેની કિંમત એક લીટીમાં હોય છે. કુલ સૌથી નીચે લખાય છે.",
    "You learned: a bill lists each thing and its price, total at the foot.": "તમે શીખ્યા: બિલમાં દરેક વસ્તુ અને કિંમત, કુલ સૌથી નીચે.",
    "Make a bill. A lunch box is Rs 145.50, and a water bottle Rs 89.75. A pencil pouch is Rs 36.40. What is the total?": "એક બિલ બનાવો. ટિફિન 145 રૂપિયા 50 પૈસાનું છે. પાણીની બોટલ 89 રૂપિયા 75 પૈસાની છે. પેન્સિલ પાઉચ 36 રૂપિયા 40 પૈસાનું છે. કુલ કેટલું છે?",
    "Total of the bill?": "બિલનો કુલ?",
    "Has every price been written on the bill?": "શું દરેક કિંમત બિલ પર લખાઈ?",
    "A kite is Rs 65.50, and a reel of thread Rs 42.75. A cap is Rs 110. Total the bill at its foot.": "પતંગ 65 રૂપિયા 50 પૈસાની છે. દોરાની રીલ 42 રૂપિયા 75 પૈસાની છે. ટોપી 110 રૂપિયાની છે. બિલનો કુલ સૌથી નીચે કાઢો.",
    "Total at the foot?": "સૌથી નીચે કુલ?",
    "The cap has no paise. What fills its paise column?": "ટોપીમાં પૈસા નથી. તેના પૈસાના સ્તંભમાં શું ભરાશે?",
    "Notebooks are Rs 84.60, and a geometry box Rs 132.85. A pen is Rs 24.90, and crayons Rs 57.45. What does the bill come to?": "નોટબુક 84 રૂપિયા 60 પૈસાની છે. કંપાસ બોક્સ 132 રૂપિયા 85 પૈસાનું છે. પેન 24 રૂપિયા 90 પૈસાની છે. ક્રેયોન 57 રૂપિયા 45 પૈસાના છે. બિલ કેટલાનું થયું?",
    "What does the bill come to?": "બિલ કેટલાનું થયું?",
    "How many full hundreds do the paise make?": "પૈસાથી કેટલા પૂરા સો બને છે?",
    /* said by the working area */
    "Two places only. A third paise digit does not fit.": "ફક્ત બે સ્થાન. પૈસાનો ત્રીજો અંક ન આવે.",
    "The paise box takes whole paise, with no dot.": "પૈસાના ચોકઠામાં પૂરા પૈસા આવે, બિંદુ નહીં.",
    /* drawn on the working area */
    "Shop": "દુકાન", "Bill": "બિલ", "Rs": "₹", "p": "પૈસા", "carry": "વદી", "Total": "કુલ", "paise": "પૈસા",
    "of": "માંથી", "lines": "લીટી", "Add": "ઉમેરો", "Clear": "ભૂંસો",
    "school bag": "સ્કૂલ બેગ", "torch": "ટોર્ચ", "storybook": "ચોપડી", "paints": "રંગ", "shoes": "બૂટ", "socks": "મોજાં",
    "football": "ફૂટબોલ", "pump": "પંપ", "jam": "જામ", "bread": "બ્રેડ", "lamp": "લેમ્પ", "bulbs": "બલ્બ",
    "cup": "કપ", "plate": "થાળી", "ball": "દડો", "juice": "જ્યૂસ", "towel": "ટુવાલ", "comb": "કાંસકો",
    "lunch box": "ટિફિન", "water bottle": "પાણીની બોટલ", "pencil pouch": "પેન્સિલ પાઉચ",
    "kite": "પતંગ", "thread": "દોરો", "cap": "ટોપી", "notebooks": "નોટબુક", "geometry box": "કંપાસ બોક્સ", "pen": "પેન", "crayons": "ક્રેયોન",
  },
};

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   items   three a phase. Every answer is an amount typed on the pad's point key, a string in its written
           form with both paise places ("176.40", "400.00"), judged exactly.
           bill   the prices on this bill, in their written form ("29" is a whole-rupee price)
           names  the thing bought on each line; pre = the lines already on the slip when it opens
           mis    the misconception's answer (nearMiss) */
const PHASES = [
  {
    n: 1,
    concept: "Rupees under rupees, paise under paise",
    conceptId: "M2.S3.T4.C12", objectiveIds: ["O5"],
    says: ["Paise always take two places after the dot.", "Put each price on the bill. Where must the dots sit?"],
    /* tries, as the plan writes it: A miss is answered three ways at once and none of them is the answer. First rung, from the item's own miss line: where is each price's dot? Second rung, the phase's: which digits stand under the rupees of the first price? Third rung: the slip is cut to two prices with the same number of rupee digits, and the child adds them before the longer price comes back. The number pad stays open behind all three rungs. */
    ladder: ["Which digits stand under the rupees of the first price?", "Add the paise first, then the rupees."],
    closing: "Line up the dots. Then rupees fall under rupees and paise under paise.",
    learned: "You learned: line up the dots, so rupees stand under rupees.",
    traceback: "The dotted line lights; a shorter price set with its dot off the line springs back and snaps in with its dot on the line; the paise and then the rupees go down, and the dot drops into the total.",
    items: [
      /* learn ML1: answer in the plan = Rs 366.85 */
      { qid: "M2.S3.T4.C12:ML1", kind: "bill", bill: ["314.25", "52.60"], names: ["school bag", "torch"], pre: [], mis: "36685", winMs: 3800,
        say: "Add Rs 314.25, and Rs 52.60.", ask: "Add Rs 314.25 and Rs 52.60", answer: "366.85", miss: "Where does the dot go in the total?" },
      /* practice 1: answer in the plan = Rs 67.70 */
      { qid: "M2.S3.T4.C12:1", kind: "bill", bill: ["42.30", "25.40"], names: ["storybook", "paints"], pre: [], mis: "67.7", winMs: 3800,
        say: "Now Rs 42.30, and Rs 25.40.", ask: "Rs 42.30 and Rs 25.40", answer: "67.70", miss: "How many places come after the dot?" },
      /* practice 2: answer in the plan = Rs 577.35. The 71 stands under the 06 of 506, with the dots in one line */
      { qid: "M2.S3.T4.C12:2", kind: "bill", bill: ["506.15", "71.20"], names: ["shoes", "socks"], pre: [], mis: "57735", winMs: 3800,
        say: "Next, Rs 506.15, with Rs 71.20.", ask: "Rs 506.15 with Rs 71.20", answer: "577.35", miss: "Set the dot of Rs 71.20 on the dotted line." },
    ],
  },
  {
    n: 2,
    concept: "A hundred paise carry one rupee",
    conceptId: "M2.S3.T4.C13", objectiveIds: ["O5"],
    says: ["Write the paise sum in the paise box.", "The paise come to more than a hundred. What happens to the hundred?"],
    /* tries, as the plan writes it: First rung, from the item: what do the paise add up to? Second rung, the phase's: is that more than a hundred? Third rung: the slip is cut to two prices whose paise make just over a hundred, and the child carries before the larger sum comes back. The number pad stays open. */
    ladder: ["Are the paise a hundred or more?", "A full strip of a hundred paise is one rupee. Carry it."],
    closing: "Each hundred paise is carried as one rupee. Only the paise left are written, as two digits.",
    learned: "You learned: each hundred paise is carried as one rupee.",
    traceback: "The paise box shows the paise sum; each full strip of a hundred rolls up into the carry circle as one rupee; the paise left go down, and the rupees are added with the carried rupee.",
    items: [
      /* learn ML2: answer in the plan = Rs 176.40 */
      { qid: "M2.S3.T4.C13:ML2", kind: "bill", bill: ["128.65", "47.75"], names: ["football", "pump"], pre: [0, 1], mis: "175.40", winMs: 5200,
        say: "Add Rs 128.65 and Rs 47.75.", ask: "Add Rs 128.65 and Rs 47.75", answer: "176.40", miss: "What do the paise add up to?" },
      /* practice 3: answer in the plan = Rs 55.30. The paise make 130, so 30 is written and 1 rupee is carried */
      { qid: "M2.S3.T4.C13:3", kind: "bill", bill: ["38.85", "16.45"], names: ["jam", "bread"], pre: [0, 1], mis: "54.30", winMs: 5200,
        say: "Now Rs 38.85, and Rs 16.45.", ask: "Rs 38.85 and Rs 16.45", answer: "55.30", miss: "Did a rupee go into the carry circle?" },
      /* practice 4: answer in the plan = Rs 400.00, which is Rs 400. The paise make exactly 100, so 00 goes in the paise column and 1 rupee is carried */
      { qid: "M2.S3.T4.C13:4", kind: "bill", bill: ["249.95", "150.05"], names: ["lamp", "bulbs"], pre: [0, 1], mis: "399.00", winMs: 5200,
        say: "Last, Rs 249.95, and Rs 150.05.", ask: "Rs 249.95 and Rs 150.05", answer: "400.00", miss: "After the carry, what is left in the paise column?" },
    ],
  },
  {
    n: 3,
    concept: "Two zeros when there are no paise",
    conceptId: "M2.S3.T4.C14", objectiveIds: ["O6"],
    says: ["This price has no paise. What goes in its paise column?"],
    /* tries, as the plan writes it: First rung, from the item: which price has no paise? Second rung, the phase's: what goes in its paise column? Third rung: the slip is cut to one short whole-rupee price under one short price with paise, and the child fills the empty paise places before adding. The number pad stays open. */
    ladder: ["What fills the paise places of a whole-rupee price?", "Put the whole rupees under the rupees, then add."],
    closing: "In column working, an amount with no paise gets two zeros. In a sentence it is written with no dot, as Rs 29.",
    learned: "You learned: no paise? Write two zeros in the paise column.",
    traceback: "The whole-rupee card snaps in with two grey zeros in its paise column; the zeros light, the paise and the rupees are added, and the total lands under the rule.",
    items: [
      /* learn ML3: answer in the plan = Rs 92.45 */
      { qid: "M2.S3.T4.C14:ML3", kind: "bill", bill: ["63.45", "29"], names: ["cup", "plate"], pre: [0], mis: "63.74", winMs: 3800,
        say: "Work in columns. Add Rs 63.45 and Rs 29.", ask: "Add Rs 63.45 and Rs 29", answer: "92.45", miss: "Which price has no paise?" },
      /* practice 5: answer in the plan = Rs 92.35. In column working, Rs 74 is written 74.00, with two zeros in the paise column */
      { qid: "M2.S3.T4.C14:5", kind: "bill", bill: ["74", "18.35"], names: ["ball", "juice"], pre: [1], mis: "19.09", winMs: 3800,
        say: "Now Rs 74 and Rs 18.35.", ask: "Rs 74 and Rs 18.35", answer: "92.35", miss: "Where do the 74 rupees stand?" },
      /* practice 6: answer in the plan = The 13 was written under the paise. In column working Rs 13 is 13.00, with two zeros in the paise column, and the sum is Rs 69.20 */
      { qid: "M2.S3.T4.C14:6", kind: "bill", bill: ["56.20", "13"], names: ["towel", "comb"], pre: [0], mis: "56.33", winMs: 3800,
        say: "A child adds Rs 56.20 and Rs 13, and gets Rs 56.33. What went wrong, and what is the sum?", ask: "Add Rs 56.20 and Rs 13", answer: "69.20", miss: "Did the 13 go under the paise?" },
    ],
  },
  {
    n: 4,
    concept: "Making a bill",
    conceptId: "M2.S3.T4.C15", objectiveIds: ["O6"],
    says: ["Write each thing and its price. What goes at the foot of the bill?"],
    /* tries, as the plan writes it: First rung, from the item: has every price been written on the bill? Second rung, the phase's: what did the paise column carry? Third rung: the bill is cut to two lines, and the child totals them before the other lines come back. The number pad stays open. */
    ladder: ["What did the paise column carry?", "Add two prices first, then add the next one to that."],
    closing: "A bill lists each thing bought and its price, one to a line, and the total goes at the foot.",
    learned: "You learned: a bill lists each thing and its price, total at the foot.",
    traceback: "Every price goes on its line; the paise box fills its strips, each full strip rolls into the carry circle, and the rupees are added with every carry to the total at the foot.",
    items: [
      /* learn ML4: answer in the plan = Rs 271.65 */
      { qid: "M2.S3.T4.C15:ML4", kind: "bill", bill: ["145.50", "89.75", "36.40"], names: ["lunch box", "water bottle", "pencil pouch"], pre: [], mis: "270.65", winMs: 5600,
        say: "Make a bill. A lunch box is Rs 145.50, and a water bottle Rs 89.75. A pencil pouch is Rs 36.40. What is the total?",
        ask: "Total of the bill?", answer: "271.65", miss: "Has every price been written on the bill?" },
      /* practice 7: answer in the plan = Rs 218.25. The paise make 125, so 25 is written and 1 rupee is carried; the cap is written 110.00 in the column */
      { qid: "M2.S3.T4.C15:7", kind: "bill", bill: ["65.50", "42.75", "110"], names: ["kite", "thread", "cap"], pre: [], mis: "109.35", winMs: 5600,
        say: "A kite is Rs 65.50, and a reel of thread Rs 42.75. A cap is Rs 110. Total the bill at its foot.",
        ask: "Total at the foot?", answer: "218.25", miss: "The cap has no paise. What fills its paise column?" },
      /* practice 8: answer in the plan = Rs 299.80. The paise make 280, so 80 is written and 2 rupees are carried */
      { qid: "M2.S3.T4.C15:8", kind: "bill", bill: ["84.60", "132.85", "24.90", "57.45"], names: ["notebooks", "geometry box", "pen", "crayons"], pre: [], mis: "298.80", winMs: 6400,
        say: "Notebooks are Rs 84.60, and a geometry box Rs 132.85. A pen is Rs 24.90, and crayons Rs 57.45. What does the bill come to?",
        ask: "What does the bill come to?", answer: "299.80", miss: "How many full hundreds do the paise make?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too).
   Working-area units, origin at its top-left. The dotted line is the one place every dot stands. */
const MODEL = {
  shelf: { x: 0, y: 12, w: 300, h: 500, cardX: 20, cardY: 66, pitch: 88 },
  card: { w: 260, h: 76, dot: 196, digit: 22 },
  slip: { x: 316, y: 12, w: 464, h: 500, lineX: 678, pitch: 42, near: 30, row0: 120, rowH: 72, snap: 32 },
  carryCircle: { x: 648, y: 94, r: 24 },
  paiseBox: { x: 806, y: 12, w: 280, h: 224, strip: { w: 240, h: 30, cells: 100, blocks: 10 } },
  add: { x: 806, y: 260, w: 280, h: 80 },
  free: { bill: ["145.50", "89.75", "110", "36.40", "57.45"], names: ["lunch box", "water bottle", "cap", "pencil pouch", "crayons"], lines: 4 },
};

/* a price in its written form: "314.25", or "29" for a whole-rupee price (two zeros in column working) */
const bmPrice = (s: any) => {
  const m = /^(\d+)(?:\.(\d\d))?$/.exec(String(s));
  return m ? { r: m[1], p: m[2] === undefined ? "00" : m[2], whole: m[2] === undefined } : { r: "0", p: "00", whole: true };
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a total with paise in its written form, both paise places ("176.40", never "176.4"); a total with no
   paise in either form ("400.00" or "400", as the book writes a whole amount in running text). A leading Rs or
   ₹ from the agent is fine. */
const judge = (item: any, v: any) => {
  const s = String(v ?? "").replace(/^\s*(rs\.?|₹)\s*/i, "").trim(), a = String(item.answer);
  return s === a || (/\.00$/.test(a) && s === a.slice(0, -3));
};
/* oracle: every total re-derived by column addition on the written prices, digit by digit (a whole-rupee price
   padded with two zeros), and every price of the bill is one the question itself names */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const rows = it.bill.map((s: string) => (s.indexOf(".") >= 0 ? s : s + ".00").split(".").join(""));
  const width = Math.max(...rows.map((r: string) => r.length)) + 1;
  let carry = 0, out = "";
  for (let k = 0; k < width; k++) {
    let d = carry;
    rows.forEach((r: string) => { const ch = r[r.length - 1 - k]; if (ch) d += ch.charCodeAt(0) - 48; });
    out = String(d % 10) + out; carry = Math.floor(d / 10);
  }
  out = (carry ? String(carry) : "") + out;
  out = out.replace(/^0+(?=\d{3})/, "");
  const total = out.slice(0, -2) + "." + out.slice(-2);
  const named = it.bill.every((s: string) => it.say.indexOf("Rs " + s) >= 0);
  return named && total === it.answer;
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => item.mis;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => {
  const a = String(item.answer), forms = [a, "Rs " + a, speakable("Rs " + a), speakable(a)];
  return /\.00$/.test(a) ? forms.concat(["Rs " + a.slice(0, -3), speakable("Rs " + a.slice(0, -3))]) : forms;
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;
/* the slot prints Rs before the amount (Hindi and Gujarati: the rupee sign, digits and point unchanged) */
const formatSlot = (v: any, j?: any, ctx?: any) => {
  const s = String(v ?? ""), sign = ctx && (ctx.lang === "hi" || ctx.lang === "gu") ? "₹" : "Rs ";
  return s === "" ? sign.trim() : sign + s;
};

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer(): a decimal must keep its point (toolApi.answer strips it), so the tool sets it itself,
   after putting every price on its line as a child would */
const answer = (item: any, v: any) => (HOOK.type ? HOOK.type(v) : undefined);
/* the agent's check() before Enter: undefined = press Enter */
const check = () => undefined;

/* what the traceback, the win and free play's Add draw over the child's own working (a demo layer) */
const BM_SHOW0 = { paise: null, roll: 0, fly: -1, pDown: false, rupees: null, dot: false, glow: false, travel: 0, lit: false, zeros: false };

/* ── the working area: 1086 x 528, origin at its top-left ────────────────────────────────────
   The shop shelf (price cards) at the left, the bill slip in the middle with its dotted line between
   rupees and paise, the paise box at the right. A card dropped with its dot on the dotted line snaps onto
   a line; off the line it springs back, the dotted line lights and a pale outline stays where it was set.
   The child writes the paise sum in the paise box (the pad is lent to it): each full strip of a hundred
   paise rolls up into the carry circle as one rupee and the paise left go down into the total. The rupees
   and the whole total are the child's, typed in the slot. After a miss the traceback redraws the whole
   column addition on a demo layer and ends on the whole total at the foot; the win runs the same. */
function Work({ phase, n, item, index, stage, wrong, typed, captured, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();   /* the traceback, the win, free play's Add */
  const tw = useTimeline();   /* the child's own paise working */
  const free = stage === "free";
  const src: any = free ? MODEL.free : item || { bill: [], names: [], pre: [] };
  const id = free ? "free" : n + ":" + index;
  const nLines = free ? MODEL.free.lines : src.bill.length;
  const S0 = () => {
    const slots = Array.from({ length: nLines }, () => -1);
    (src.pre || []).forEach((c: number) => { slots[c] = c; });
    return { id, slots, outline: null as any, lit: false, buf: "", pSum: null as any, pRoll: 0, pFly: -1, pDown: false, show: null as any };
  };
  const [S, setS] = useState<any>(S0);
  const s = S.id === id ? S : S0();
  const sRef = useRef(s); sRef.current = s;
  const idRef = useRef(id); idRef.current = id;
  const put = (f: any) => {
    const mine = id;
    setS((p: any) => {
      if (idRef.current !== mine) return p;
      const base = p.id === mine ? p : S0();
      return { ...base, ...(typeof f === "function" ? f(base) : f) };
    });
  };

  /* a new question (or free play) starts clean */
  useEffect(() => {
    tl.stop(); tw.stop();
    setS(S0());
    api.lock(false);
  }, [id]);

  /* the dotted line lights for a moment after a card is set down off it */
  useEffect(() => {
    if (!s.lit) return;
    const t = setTimeout(() => put({ lit: false }), 1500);
    return () => clearTimeout(t);
  }, [s.lit]);

  const L = MODEL.slip, K = MODEL.card, PB = MODEL.paiseBox, CC = MODEL.carryCircle;
  const RS = shade(CONTENT.hundred, 0.25), PS = shade(CONTENT.one, 0.3), DOT = shade(CONTENT.pointer, 0.2), ZERO = "#767676";
  const rowTop = (k: number) => L.row0 + k * L.rowH;
  const base = (k: number) => rowTop(k) + 54;
  const ruleY = rowTop(nLines) + 4;
  const TB = ruleY + 62;   /* the total line's baseline */
  const busy = tl.busy;
  const live = (stage === "ask" || stage === "teach" || free) && !busy;
  const placed = s.slots.filter((c: number) => c >= 0).length;
  const onShelf = src.bill.map((_: any, c: number) => c).filter((c: number) => !s.slots.includes(c));
  const rank = (c: number) => src.bill.map((_: any, k: number) => k).filter((k: number) => !(src.pre || []).includes(k)).indexOf(c);
  const home = (c: number) => ({ x: MODEL.shelf.cardX, y: MODEL.shelf.cardY + rank(c) * MODEL.shelf.pitch });

  /* put card c on a line (the one under the finger if it is free, else the first free one) */
  const placeCard = (c: number, row: number, keepShow?: boolean) => {
    put((b: any) => {
      if (b.slots.includes(c)) return {};
      const slots = b.slots.slice();
      const k = row >= 0 && row < slots.length && slots[row] === -1 ? row : slots.indexOf(-1);
      if (k < 0) return {};
      slots[k] = c;
      return keepShow ? { slots } : { slots, show: null, pSum: null, pRoll: 0, pDown: false };
    });
    api.sfx.tick();
  };

  /* drag a price card: its dot must land on the dotted line */
  const grab = useRef<any>(null);
  const drag = useDrag((c: any, at: any, moved: boolean) => {
    const g = grab.current; grab.current = null;
    if (!live || sRef.current.slots.includes(c)) return;
    if (!moved || !g || !(at && isFinite(at.x) && isFinite(at.y))) { placeCard(c, -1); return; }
    const cx = at.x - g.dx, cy = at.y - g.dy, dotX = cx + K.dot, midY = cy + K.h / 2;
    const over = dotX >= L.x && dotX <= L.x + L.w && midY >= L.y && midY <= L.y + L.h;
    if (!over) return;                                             /* back to the shelf */
    if (Math.abs(dotX - L.lineX) <= L.snap) {
      const row = Math.max(0, Math.min(nLines - 1, Math.floor((midY - L.row0) / L.rowH)));
      placeCard(c, row);
      return;
    }
    /* set down with its dot off the line: it springs back, the line lights, and a pale outline of the card
       stays where it was set (nudged inside the slip if it hung over an edge), with a ring where its dot stood
       (a whole-rupee price has no dot, so no ring) */
    const q = bmPrice(src.bill[c]);
    const ox = Math.max(L.x + 4, Math.min(L.x + L.w - 4 - K.w, cx)), oy = Math.max(L.y + 4, Math.min(L.y + L.h - 4 - K.h, cy));
    const ring = q.whole ? null : Math.max(ox + 14, Math.min(ox + K.w - 14, dotX));
    put({ outline: { x: ox, y: oy, w: K.w, h: K.h, dx: ring, dy: oy + 62 }, lit: true, show: null });
  });
  const dd = drag.drag;
  if (dd && (!grab.current || grab.current.c !== dd.payload)) {
    const h = home(dd.payload);
    grab.current = { c: dd.payload, dx: dd.x - h.x, dy: dd.y - h.y };
  }

  /* the paise box: the child writes the paise column's sum in it (the pad is lent to the box). It is live from
     the teach on, as soon as every price is on the bill (playable before answerable) */
  const canBox = (stage === "ask" || stage === "teach") && !free && placed === nLines && !busy;
  const commitPaise = (v: number) => {
    const hundreds = Math.floor(v / 100);
    put({ pSum: v, pRoll: 0, pFly: -1, pDown: false, buf: "" });
    const steps: any[] = [[450, null]];
    for (let k = 0; k < hundreds; k++) {
      steps.push([760, () => put({ pFly: k })]);
      steps.push([160, () => { put({ pRoll: k + 1, pFly: -1 }); api.sfx.tick(); }]);
    }
    steps.push([300, () => put({ pDown: true })]);
    tw.run(steps);
  };
  const onKey = (key: string) => {
    if (/^\d$/.test(key)) put((b: any) => ({ buf: (b.buf + key).slice(0, 3) }));
    else if (key === "back") put((b: any) => ({ buf: b.buf.slice(0, -1) }));
    else if (key === "clear") put({ buf: "" });
    else if (key === "enter") giveBack();
    else if (key === "point" && toldDot.current !== String(n)) { toldDot.current = String(n); api.say("The paise box takes whole paise, with no dot."); }
  };
  /* the box gives the pad back to the slot (what was written in it is kept and worked) */
  const giveBack = () => {
    const v = sRef.current.buf;
    api.capture(null);
    if (v !== "") commitPaise(Number(v));
  };
  const toldDot = useRef("");
  const openBox = () => {
    if (!canBox || captured) return;
    tw.stop();
    put({ buf: "", pSum: null, pRoll: 0, pFly: -1, pDown: false, show: null });
    api.capture(onKey);
  };
  /* while the box holds the pad, a press anywhere but the box and the pad keys (the answer slot, the bill, the
     blank canvas) gives the pad back to the slot, so the next digit goes to the answer */
  const giveRef = useRef(giveBack); giveRef.current = giveBack;
  useEffect(() => {
    if (!captured || free) return;
    const onDown = (e: any) => {
      const el = e.target && e.target.closest ? e.target : null;
      if (el && (el.closest('[data-control="paise-box"]') || el.closest('[data-control^="key-"]'))) return;
      giveRef.current();
    };
    window.addEventListener("pointerdown", onDown, true);
    return () => window.removeEventListener("pointerdown", onDown, true);
  }, [captured, free]);

  /* the whole column addition, drawn on the demo layer: the traceback (slower, with the misconception's
     picture first), the win and free play's Add. It ends on the whole total at the foot of the bill. */
  const set = (patch: any) => put((b: any) => ({ show: { ...(b.show || BM_SHOW0), ...patch } }));
  const runShow = (kind: string, done?: () => void) => {
    tw.stop();
    const cur = sRef.current, slow = kind === "wrong";
    const ms = (a: number, b: number) => (slow ? b : a);
    const lines = kind === "free" ? cur.slots.filter((c: number) => c >= 0) : src.bill.map((_: any, c: number) => c);
    const prices = lines.map((c: number) => src.bill[c]);
    const sumP = prices.reduce((a: number, p: string) => a + Number(bmPrice(p).p), 0);
    const sumR = prices.reduce((a: number, p: string) => a + Number(bmPrice(p).r), 0);
    const hund = Math.floor(sumP / 100);
    const steps: any[] = [[ms(250, 500), () => put({ show: { ...BM_SHOW0, lit: slow }, buf: "" })]];
    if (kind !== "free") {
      const longest = Math.max(...src.bill.map((p: string) => bmPrice(p).r.length));
      src.bill.map((_: any, c: number) => c).filter((c: number) => !cur.slots.includes(c)).forEach((c: number) => {
        const q = bmPrice(src.bill[c]);
        const beat = slow && ((n === 1 && q.r.length < longest) || ((n === 3 || n === 4) && q.whole));
        if (beat) steps.push([1000, () => {
          const row = sRef.current.slots.indexOf(-1);
          if (row < 0) return;
          const y = rowTop(row) + 1;   /* clear of the row's rule below */
          if (q.whole) {
            /* its rupees set down under the paise, where the misconception puts them (the box kept inside the slip) */
            put({ outline: { x: L.lineX + 6, y, w: L.x + L.w - 8 - (L.lineX + 6), h: 62, dx: null, dy: 0 } });
          } else {
            /* started at the left edge: the box shifted one place left of where the price belongs (no ring, so
               nothing touches the price's own digits) */
            const d = L.lineX - L.pitch * (longest - q.r.length);
            put({ outline: { x: d - L.near - L.pitch * (q.r.length - 1) - 26, y, w: 2 * L.near + L.pitch * q.r.length + 52, h: 62, dx: null, dy: 0 } });
          }
        }]);
        steps.push([ms(320, 650), () => placeCard(c, -1, true)]);
      });
    }
    if (prices.some((p: string) => bmPrice(p).whole)) steps.push([ms(350, 750), () => set({ zeros: true })]);
    steps.push([ms(600, 900), () => set({ paise: sumP })]);
    for (let k = 0; k < hund; k++) {
      steps.push([ms(700, 820), () => set({ fly: k })]);
      steps.push([150, () => { set({ roll: k + 1, fly: -1 }); api.sfx.tick(); }]);
    }
    steps.push([ms(450, 700), () => set({ pDown: true })]);
    if (hund > 0) {
      steps.push([ms(500, 800), () => set({ rupees: sumR, glow: true })]);
      steps.push([60, () => set({ travel: 1 })]);
      steps.push([ms(650, 800), () => set({ travel: 2 })]);
      steps.push([ms(250, 450), () => set({ travel: 0, rupees: sumR + hund })]);
    } else steps.push([ms(500, 750), () => set({ rupees: sumR })]);
    steps.push([ms(300, 500), () => set({ dot: true, glow: false })]);
    steps.push([ms(100, 200), () => set({ lit: false })]);
    tl.run(steps, done);
  };

  /* the traceback */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    runShow("wrong", () => api.lock(false));
  }, [wrong]);

  /* the win: the maths moving, the whole column added and the total landing at the foot */
  useEffect(() => {
    if (stage === "win") runShow("win");
  }, [stage]);

  /* the slot holds exactly two places after the dot: a third paise digit is refused as it is typed
     (only a key typed after two places; an answer already given is never touched), and the voice says why,
     once a phase */
  const lastTyped = useRef("");
  const toldTwo = useRef("");
  useEffect(() => {
    const prev = lastTyped.current, now = typeof typed === "string" ? typed : String(typed ?? "");
    lastTyped.current = now;
    if (stage !== "ask" || !/^\d*\.\d\d$/.test(prev) || !/^\d$/.test(now.slice(prev.length)) || now.slice(0, prev.length) !== prev) return;
    lastTyped.current = prev;
    api.setTyped(prev);
    if (toldTwo.current !== String(n)) { toldTwo.current = String(n); api.say("Two places only. A third paise digit does not fit."); }
  }, [typed]);

  /* the teacher agent: every price onto its line, then the amount typed with its point */
  HOOK.type = (v: any) => {
    tw.stop();
    put((b: any) => {
      const slots = b.slots.slice();
      src.bill.forEach((_: any, c: number) => { if (!slots.includes(c)) { const k = slots.indexOf(-1); if (k >= 0) slots[k] = c; } });
      return { slots };
    });
    api.setTyped(String(v ?? "").replace(/^\s*(rs\.?|₹)\s*/i, "").trim());
    return true;
  };

  /* what is drawn: the demo layer when it stands, else the child's own working */
  const D0 = s.show;
  const boxVal = captured ? null : D0 ? D0.paise : s.pSum;
  const rolled = D0 ? D0.roll : s.pRoll;
  const flying = D0 ? D0.fly : s.pFly;
  const pDown = D0 ? D0.pDown : s.pDown;
  const rupees = D0 ? D0.rupees : null;
  const dotDown = D0 ? D0.dot : s.pDown;
  const answerNow = D0 && D0.dot && rupees !== null ? rupees + "." + String((D0.paise || 0) % 100).padStart(2, "0") : null;

  /* what the host and the agent read back (toolApi.getState) */
  api.share({
    lines: placed,
    prices: s.slots.filter((c: number) => c >= 0).map((c: number) => src.bill[c]),
    paiseSum: boxVal,
    carry: rolled,
    total: answerNow,
  });

  /* ── drawing helpers (called, not mounted) ── */
  /* one row of an amount in the price column: rupees left of the dotted line, paise right of it */
  const amountRow = (key: string, rs: string, ps: string, withDot: boolean, y: number, grey: boolean) => (
    <text key={key} y={y} textAnchor="middle" fontSize={T.xl} fontWeight={700}>
      {rs.split("").map((d, i) => <tspan key={"r" + i} x={L.lineX - L.near - (rs.length - 1 - i) * L.pitch} fill={RS}>{d}</tspan>)}
      {withDot && <tspan x={L.lineX} fill={DOT}>.</tspan>}
      {ps.split("").map((d, i) => <tspan key={"p" + i} x={L.lineX + L.near + i * L.pitch} fill={grey ? ZERO : PS}>{d}</tspan>)}
    </text>
  );

  /* a strip of a hundred paise cells, ten blocks of ten */
  const strip = (key: string, x: number, y: number, cells: number, style?: any) => {
    const sw = PB.strip.w, sh = PB.strip.h, bw = sw / 10, full = Math.floor(cells / 10), rest = cells % 10;
    return (
      <g key={key} style={style} pointerEvents="none">
        <rect x={x} y={y} width={sw} height={sh} fill="#FFFFFF" stroke={C.ink} strokeWidth={1.5} />
        {full > 0 && <rect x={x} y={y} width={full * bw} height={sh} fill={CONTENT.one} />}
        {Array.from({ length: rest }).map((_, i) => (
          <rect key={i} x={x + full * bw + (i % 5) * (bw / 5)} y={y + Math.floor(i / 5) * (sh / 2)} width={bw / 5} height={sh / 2} fill={CONTENT.one} />
        ))}
        <g stroke={tint(C.ink, 0.72)} strokeWidth={0.8}>
          {Array.from({ length: 10 }).map((_, b) => [1, 2, 3, 4].map((j) => <line key={b + "-" + j} x1={x + b * bw + j * (bw / 5)} y1={y} x2={x + b * bw + j * (bw / 5)} y2={y + sh} />))}
          <line x1={x} y1={y + sh / 2} x2={x + sw} y2={y + sh / 2} />
        </g>
        <g stroke={C.ink} strokeWidth={1.5}>
          {Array.from({ length: 9 }).map((_, b) => <line key={b} x1={x + (b + 1) * bw} y1={y} x2={x + (b + 1) * bw} y2={y + sh} />)}
        </g>
      </g>
    );
  };

  /* a price card: the thing's name, and its price written with a dot (the dot is what goes on the line) */
  const card = (c: number, x: number, y: number, lifted: boolean, on: boolean) => {
    const price = src.bill[c], q = bmPrice(price), name = src.names[c];
    const P = K.digit, dx = K.dot;
    const left = dx - 16 - P * (q.r.length - 1) - 14;
    const body = (
      <g>
        <rect x={0} y={0} width={K.w} height={K.h} rx={14} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} filter={lifted ? "url(#fLift)" : "url(#fShadowSoft)"} />
        <text x={16} y={32} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(name)}</text>
        <text x={left - 6} y={68} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("Rs")}</text>
        <text y={68} textAnchor="middle" fontSize={T.label} fontWeight={700}>
          {q.r.split("").map((d, i) => <tspan key={"r" + i} x={dx - 16 - (q.r.length - 1 - i) * P} fill={RS}>{d}</tspan>)}
          {!q.whole && <tspan x={dx} fill={DOT}>.</tspan>}
          {!q.whole && q.p.split("").map((d, i) => <tspan key={"p" + i} x={dx + 16 + i * P} fill={PS}>{d}</tspan>)}
        </text>
      </g>
    );
    if (!on) return <g key={"card-" + c} transform={`translate(${x},${y})`} pointerEvents="none">{body}</g>;
    return (
      <g key={"card-" + c} transform={`translate(${x},${y})`} {...control("card-" + c, name + ", Rs " + price)} {...drag.bind(c)} {...drag.keys(c)}>
        {body}
      </g>
    );
  };

  /* ── the picture ── */
  const cardsLive = live && (free || stage === "ask" || stage === "teach");
  const firstWaiting = onShelf.length ? onShelf[0] : -1;
  const boxInvite = !free && !busy && placed === nLines && boxVal === null && !captured && (stage === "ask" || stage === "teach") && !D0;
  const nStrips = boxVal === null ? 1 : Math.min(3, Math.max(1, Math.ceil(boxVal / 100) + (boxVal % 100 === 0 && boxVal > 0 ? 1 : 0)));
  const flyTo = (x: number, y: number) => {
    const k = 0.16, cx = x + PB.strip.w / 2, cy = y + PB.strip.h / 2;
    return `translate(${CC.x - k * cx}px, ${CC.y - k * cy}px) scale(${k})`;
  };
  const trans = reducedMotion() ? "none" : "transform 700ms ease-in";
  const addLabel = D0 ? "Clear" : "Add";

  return (
    <g>
      {/* the running count: lines priced against the lines this bill needs */}
      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={16} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
        <text x={22} y={-42} fontSize={T.label} fontWeight={500} fill={C.ink}>
          <tspan fontSize={T.speech} fontWeight={700}>{lang === "hi" || lang === "gu" ? nLines + " " + tx("of") + " " + placed : placed + " " + tx("of") + " " + nLines}</tspan>
          <tspan dx={12}>{tx("lines")}</tspan>
        </text>
      </g>

      {/* the bill slip */}
      <rect x={L.x} y={L.y} width={L.w} height={L.h} rx={RAD.panel} fill={tint(C.panel, 0.5)} stroke={C.ink} strokeWidth={2} filter="url(#fShadowSoft)" />
      <text x={L.x + 20} y={58} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("Bill")}</text>
      <text x={L.lineX - L.near - L.pitch} y={58} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={RS}>{tx("Rs")}</text>
      <text x={L.lineX + L.near + L.pitch / 2} y={58} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={PS}>{tx("p")}</text>

      {/* the dotted line lights (after a card is set off it, during a drag, and in the correction) */}
      {(s.lit || (D0 && D0.lit) || (dd && dd.moved)) && (
        <rect x={L.lineX - 10} y={L.row0 - 4} width={20} height={TB + 24 - L.row0} rx={10} fill={tint(CONTENT.pointer, 0.7)} fillOpacity={0.55} pointerEvents="none" />
      )}
      <line x1={L.lineX} y1={L.row0} x2={L.lineX} y2={TB + 18} stroke={C.ink} strokeWidth={4} strokeDasharray="0.5 11" strokeLinecap="round" />

      {/* the carry circle over the rupees */}
      {D0 && D0.glow && <circle cx={CC.x} cy={CC.y} r={CC.r + 12} fill={CONTENT.ten} fillOpacity={0.3} pointerEvents="none" />}
      <text x={CC.x - CC.r - 12} y={CC.y + 10} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={shade(CONTENT.ten, 0.5)}>{tx("carry")}</text>
      <circle cx={CC.x} cy={CC.y} r={CC.r} fill={rolled > 0 ? tint(CONTENT.ten, 0.55) : "#FFFFFF"} stroke={C.ink} strokeWidth={2.5} />
      {rolled > 0 && <text x={CC.x} y={CC.y + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(CONTENT.ten, 0.5)}>{String(rolled)}</text>}

      {/* the lines of the bill */}
      {s.slots.map((c: number, k: number) => {
        const y = base(k);
        if (c < 0) return (
          <line key={"e" + k} x1={L.x + 20} y1={rowTop(k) + 60} x2={L.x + L.w - 20} y2={rowTop(k) + 60} stroke={C.rule} strokeWidth={2} strokeDasharray="8 8" />
        );
        const q = bmPrice(src.bill[c]);
        return (
          <g key={"l" + k}>
            {q.whole && D0 && D0.zeros && <rect x={L.lineX + 7} y={rowTop(k) + 8} width={L.near + L.pitch + 20} height={56} rx={10} fill={ZERO} fillOpacity={0.16} pointerEvents="none" />}
            <text x={L.x + (free ? 50 : 20)} y={y - 6} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(src.names[c])}</text>
            {amountRow("a" + k, q.r, q.p, true, y, q.whole)}
            <line x1={L.x + 20} y1={rowTop(k) + 66} x2={L.x + L.w - 20} y2={rowTop(k) + 66} stroke={C.rule} strokeWidth={1.5} />
          </g>
        );
      })}

      {/* the rule, and the total line at the foot */}
      <line x1={L.x + 20} y1={ruleY} x2={L.x + L.w - 20} y2={ruleY} stroke={C.ink} strokeWidth={3} />
      <text x={L.x + 20} y={TB} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("Total")}</text>
      {(pDown || rupees !== null || dotDown) && amountRow("total",
        rupees !== null ? String(rupees) : "",
        pDown && boxVal !== null ? String(boxVal % 100).padStart(2, "0") : "",
        !!dotDown, TB, false)}

      {/* the paise box: the paise column's sum before anything is carried, and its cells in strips of a hundred */}
      <rect x={PB.x} y={PB.y} width={PB.w} height={PB.h} rx={RAD.panel} fill="#FFFFFF" stroke={captured ? C.accent : C.ink} strokeWidth={captured ? 4 : 2} filter="url(#fShadowSoft)" />
      <text x={PB.x + 20} y={PB.y + 58} fontSize={T.label} fontWeight={700} fill={PS}>{tx("paise")}</text>
      <rect x={PB.x + 124} y={PB.y + 18} width={136} height={58} rx={12} fill={captured ? "#FFFFFF" : tint(C.panel, 0.55)} stroke={captured ? C.accent : C.rule} strokeWidth={captured ? 3 : 2} />
      {captured ? (
        <g>
          <text x={PB.x + 244} y={PB.y + 63} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={PS}>{s.buf}</text>
          <rect className="c4-caret" x={PB.x + 247} y={PB.y + 28} width={4} height={40} rx={2} fill={C.accent} />
        </g>
      ) : boxVal !== null ? (
        <text x={PB.x + 246} y={PB.y + 63} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={PS}>{String(boxVal)}</text>
      ) : null}
      {Array.from({ length: nStrips }).map((_, j) => {
        if (j < rolled && j !== flying) return null;
        const x = PB.x + 20, y = PB.y + 96 + (j - rolled) * 40;   /* the strips left move up as one rolls away */
        const cells = boxVal === null ? 0 : Math.max(0, Math.min(100, boxVal - 100 * j));
        return strip("s" + j, x, y, cells, { transform: j === flying ? flyTo(x, y) : "none", transition: trans });
      })}

      {/* the carried rupee travels down into the rupees of the total */}
      {D0 && D0.travel > 0 && (
        <g pointerEvents="none" style={{ transform: D0.travel === 2 ? `translate(0px, ${TB - 14 - CC.y}px)` : "none", transition: trans }}>
          <circle cx={CC.x} cy={CC.y} r={20} fill={tint(CONTENT.ten, 0.35)} stroke={shade(CONTENT.ten, 0.3)} strokeWidth={2.5} />
        </g>
      )}

      {/* the pale outline of where a card was set down with its dot off the line */}
      {s.outline && (
        <g pointerEvents="none">
          <rect x={s.outline.x} y={s.outline.y} width={s.outline.w} height={s.outline.h} rx={14} fill="none" stroke={C.dim} strokeWidth={2.5} strokeDasharray="10 8" />
          {s.outline.dx !== null && <circle cx={s.outline.dx} cy={s.outline.dy} r={10} fill="none" stroke={tint(CONTENT.pointer, 0.2)} strokeWidth={3} />}
        </g>
      )}

      {/* free play: a small back arrow on each price line says a tap sends it back to the shop */}
      {free && s.slots.map((c: number, k: number) => (c >= 0 ? (
        <g key={"cue" + k} pointerEvents="none" stroke={mix(C.ink, "#FFFFFF", 0.3)} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <rect x={L.x + 14} y={rowTop(k) + 20} width={28} height={28} rx={7} strokeWidth={2} />
          <path d={`M ${L.x + 35} ${rowTop(k) + 34} H ${L.x + 21} M ${L.x + 27} ${rowTop(k) + 28} L ${L.x + 21} ${rowTop(k) + 34} L ${L.x + 27} ${rowTop(k) + 40}`} />
        </g>
      ) : null))}

      {/* the shop shelf, drawn after the bill so a card carried over the bill stays on top */}
      <rect x={MODEL.shelf.x} y={MODEL.shelf.y} width={MODEL.shelf.w} height={MODEL.shelf.h} rx={RAD.panel} fill={tint(C.panel, 0.3)} stroke={C.ink} strokeWidth={2} />
      <text x={MODEL.shelf.x + 20} y={46} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("Shop")}</text>
      {onShelf.map((c: number) => {
        const h = home(c);
        const held = dd && dd.payload === c && grab.current;
        const x = held ? Math.max(-20, Math.min(W.w - K.w + 20, dd.x - grab.current.dx)) : h.x;
        const y = held ? Math.max(-20, Math.min(W.h - K.h + 20, dd.y - grab.current.dy)) : h.y;
        return card(c, x, y, !!held, cardsLive);
      })}

      {/* the controls after the cards, so Tab goes card, card, then the paise box (or free play's lines and Add) */}
      {canBox && <Hit id="paise-box" x={PB.x} y={PB.y} w={PB.w} h={PB.h} onPress={openBox} label="paise box: write the paise sum" enabled={!captured} />}
      {free && s.slots.map((c: number, k: number) => (c >= 0 && !busy ? (
        <Hit key={"back" + k} id={"line-" + (k + 1)} x={L.x} y={rowTop(k)} w={L.w} h={L.rowH} label={"take " + src.names[c] + " off the bill"}
          onPress={() => put((b: any) => { const slots = b.slots.slice(); slots[k] = -1; return { slots, show: null, outline: null }; })} />
      ) : null))}
      {free && (
        <Key id="add" x={MODEL.add.x} y={MODEL.add.y} w={MODEL.add.w} h={MODEL.add.h} C={C} primary disabled={placed === 0 || busy} label={addLabel.toLowerCase()}
          onClick={() => (D0 ? put({ show: null }) : runShow("free"))}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={placed === 0 || busy ? C.ink : "#FFFFFF"}>{tx(addLabel)}</text>
        </Key>
      )}

      {/* the one invite (the runtime's pulse, drawn round the whole piece so it never crosses a price, and thick
          enough to read as "touch this" in a still frame too): the first waiting card, then the paise box */}
      {live && firstWaiting >= 0 && !dd && !free && (
        <rect className="c4-pulse" x={home(firstWaiting).x - 4} y={home(firstWaiting).y - 4} width={K.w + 8} height={K.h + 8} rx={17}
          fill="none" stroke={C.accent} strokeWidth={6} pointerEvents="none" />
      )}
      {boxInvite && firstWaiting < 0 && (
        <rect className="c4-pulse" x={PB.x + 6} y={PB.y + 6} width={PB.w - 12} height={PB.h - 12} rx={RAD.panel - 4}
          fill="none" stroke={C.accent} strokeWidth={6} pointerEvents="none" />
      )}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: the foot of the bill in
   miniature, the rule, then the total in its columns (rupees | the dot on the dotted line | paise) */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const v = result && result.last ? result.last.value : null;
  if (v === null || v === undefined) return null;
  const s = String(v).replace(/^\s*(rs\.?|₹)\s*/i, "").trim();
  const m = /^(\d+)(?:\.(\d\d))?$/.exec(s);
  const rs = m ? m[1] : s, ps = m ? m[2] || "00" : "";
  const P = 24, lx = w - 18 - P - 14, base = Math.round(h / 2) + 20, top = base - 34;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <line x1={lx} y1={6} x2={lx} y2={h - 6} stroke={C.ink} strokeWidth={3} strokeDasharray="0.5 8" strokeLinecap="round" />
      <line x1={lx - 14 - P * 3 - 4} y1={top} x2={w - 10} y2={top} stroke={C.ink} strokeWidth={2.5} />
      <text x={12} y={base} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("Total")}</text>
      <text y={base} textAnchor="middle" fontSize={T.label} fontWeight={700}>
        {rs.split("").map((d, i) => <tspan key={"r" + i} x={lx - 14 - (rs.length - 1 - i) * P} fill={shade(CONTENT.hundred, 0.25)}>{d}</tspan>)}
        {m && <tspan x={lx} fill={shade(CONTENT.pointer, 0.2)}>.</tspan>}
        {ps.split("").map((d, i) => <tspan key={"p" + i} x={lx + 14 + i * P} fill={m && !m[2] ? "#767676" : shade(CONTENT.one, 0.3)}>{d}</tspan>)}
      </text>
    </g>
  );
}

function BillMaker(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format: formatSlot, pointKey: true, fitHost: () => null }} />
  );
}

export default BillMaker;
