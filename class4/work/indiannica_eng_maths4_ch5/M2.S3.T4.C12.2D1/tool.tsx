/* ═══ M2.S3.T4.C12.2D1 · long_division_frame · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "long_division_frame";
const MEDIA_ID = "M2.S3.T4.C12.2D1";
const TOOL_NAME = "Long Division Frame";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A number under its place headings, and a divisor at the door. Which place goes first?"];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every step said, every zero where the number was smaller, and every check matched.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Any dividend, any divisor from two to nine, with the gate and the check bar open.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r13+: `lineFor(line, lang, TR)`); the
   English stays what the checks read. NCERT class 4 terms: भाज्य भाजक भागफल शेषफल / ભાજ્ય ભાજક ભાગફળ શેષ,
   इकाई दहाई सैकड़ा हज़ार / એકમ દશક શતક હજાર (the headings as their first letters, as the English does).
   Digits stay digits: the runtime speaks them in the language in use. A first draft; wants a native
   speaker's read. (The two-box labels are drawn by the runtime as written: r17 does not translate them.) */
const TR: any = {
  hi: {
    "Long Division Frame": "लंबे भाग का ढाँचा",
    "A number under its place headings, and a divisor at the door. Which place goes first?": "स्थान के शीर्षकों के नीचे एक संख्या, और दरवाज़े पर एक भाजक। पहले कौन सा स्थान?",
    "Every step said, every zero where the number was smaller, and every check matched.": "हर चरण बोला गया, जहाँ संख्या छोटी थी वहाँ शून्य लगा, और हर जाँच मिल गई।",
    "Free play. Any dividend, any divisor from two to nine, with the gate and the check bar open.": "मुक्त खेल। कोई भी भाज्य, दो से नौ तक कोई भी भाजक, ढक्कन और जाँच कार्ड खुले।",
    "Start with the biggest place": "सबसे बड़े स्थान से शुरू करो",
    "Which place is the biggest? Share that one first.": "सबसे बड़ा स्थान कौन सा है? पहले उसे बाँटो।",
    "Drag the biggest multiple that fits. Tap the box under it and type what is left.": "जो सबसे बड़ा गुणज समाए, उसे खींचो। उसके नीचे के खाने पर टैप करो और जो बचा वह लिखो।",
    "Bring the next digit down. At the end, type the quotient and the remainder.": "अगला अंक नीचे लाओ। आखिर में भागफल और शेषफल लिखो।",
    "How many of that place does each share get?": "हर हिस्से को उस स्थान के कितने मिलते हैं?",
    "Share the biggest place, then carry what is left into the next place.": "सबसे बड़े स्थान को बाँटो, फिर जो बचे उसे अगले स्थान में ले जाओ।",
    "Long division starts with the digit in the biggest place, and what is left is carried on.": "लंबा भाग सबसे बड़े स्थान के अंक से शुरू होता है, और जो बचता है वह आगे जाता है।",
    "You learned: start with the biggest place, and carry what is left.": "तुमने सीखा: सबसे बड़े स्थान से शुरू करो, और बचा हुआ आगे ले जाओ।",
    "Divide 846 by 3. Where do you start, and what is carried on?": "846 को 3 से भाग दो। कहाँ से शुरू करोगे, और क्या आगे जाता है?",
    "Look at the headings. Share the biggest place before the others.": "शीर्षक देखो। बाकी से पहले सबसे बड़े स्थान को बाँटो।",
    "Divide 684 by 2.": "684 को 2 से भाग दो।",
    "Start with the hundreds, not the ones.": "इकाई से नहीं, सैकड़े से शुरू करो।",
    "Divide 2,736 by 4.": "2,736 को 4 से भाग दो।",
    "Can 2 thousands be shared by 4? What do they join?": "क्या 2 हज़ार को 4 में बाँट सकते हैं? वे किससे जुड़ते हैं?",
    "Bring down and divide again": "नीचे लाओ और फिर से भाग दो",
    "Type what is left under the line first. Then bring the next digit down, and read the new number with its place.": "पहले रेखा के नीचे जो बचा वह लिखो। फिर अगला अंक नीचे लाओ, और नई संख्या को उसके स्थान के साथ पढ़ो।",
    "Which digit comes down next, and what does it join?": "अब कौन सा अंक नीचे आता है, और वह किससे जुड़ता है?",
    "Change what is left into the next place, then add the digit that comes down.": "जो बचा उसे अगले स्थान में बदलो, फिर नीचे आने वाला अंक जोड़ो।",
    "Each step brings down the next digit and divides everything that has built up.": "हर चरण में अगला अंक नीचे आता है, और जो जमा हुआ उस सबको भाग दिया जाता है।",
    "You learned: bring the next digit down and divide all that built up.": "तुमने सीखा: अगला अंक नीचे लाओ और जो जमा हुआ सबको भाग दो।",
    "Divide 953 by 4, saying what is left at each step.": "953 को 4 से भाग दो, और हर चरण पर बताओ कि क्या बचा।",
    "What is left after the hundreds? It joins the 5 tens.": "सैकड़ों के बाद क्या बचा? वह 5 दहाई से जुड़ता है।",
    "Divide 915 by 5, saying what is left after each step.": "915 को 5 से भाग दो, और हर चरण के बाद बताओ कि क्या बचा।",
    "How many hundreds are left after the first step? They join the tens.": "पहले चरण के बाद कितने सैकड़े बचे? वे दहाई से जुड़ते हैं।",
    "One block of a stand has three rows. Row A seats 738 ÷ 6 people. Row B seats 856 ÷ 8. Row C seats 935 ÷ 5. How many people sit in the block?": "एक स्टैंड के एक ब्लॉक में तीन पंक्तियाँ हैं। पंक्ति A में 738 ÷ 6 लोग बैठते हैं। पंक्ति B में 856 ÷ 8। पंक्ति C में 935 ÷ 5। ब्लॉक में कितने लोग बैठते हैं?",
    "People in the block?": "ब्लॉक में कितने लोग?",
    "Divide each row, then add the three answers.": "हर पंक्ति को भाग दो, फिर तीनों उत्तर जोड़ो।",
    "Smaller than the divisor means a zero": "भाजक से छोटी, तो शून्य",
    "Is this number smaller than the divisor? Then how many fit?": "क्या यह संख्या भाजक से छोटी है? तो कितने समाएँगे?",
    "When not even one fits, tap the cell on top and type how many fit.": "जब एक भी न समाए, तो ऊपर के खाने पर टैप करो और लिखो कितने समाए।",
    "Is it smaller than the divisor?": "क्या यह भाजक से छोटी है?",
    "Lay times one beside the number. Does even one fit?": "संख्या के पास एक गुना रखो। क्या एक भी समाता है?",
    "A zero goes in the quotient only when the number being divided is smaller than the divisor. Whether the step divides exactly is not the test.": "भागफल में शून्य तभी आता है जब भाग दी जा रही संख्या भाजक से छोटी हो। चरण पूरा बँटता है या नहीं, यह जाँच नहीं है।",
    "You learned: smaller than the divisor means a zero on top.": "तुमने सीखा: भाजक से छोटी हो, तो ऊपर शून्य आता है।",
    "Divide 9,836 by 7. Look for the step where the number is smaller than 7.": "9,836 को 7 से भाग दो। वह चरण ढूँढो जहाँ संख्या 7 से छोटी है।",
    "What is the working number at the tens, with its place name?": "दहाई पर अभी कौन सी संख्या है, उसके स्थान के नाम के साथ?",
    "In 612 divided by 6, what goes in the tens place of the quotient?": "612 को 6 से भाग देने में, भागफल के दहाई के स्थान पर क्या आता है?",
    "Tens digit of the quotient?": "भागफल का दहाई अंक?",
    "After the 6 hundreds, what number stands at the tens? Can 6 fit in it?": "6 सैकड़ों के बाद दहाई पर कौन सी संख्या है? क्या उसमें 6 समा सकता है?",
    "Divide 8,045 by 8.": "8,045 को 8 से भाग दो।",
    "Look at the hundreds, then the tens. Is each smaller than 8?": "पहले सैकड़े देखो, फिर दहाई। क्या हर एक 8 से छोटा है?",
    "Multiply back to check": "जाँचने के लिए वापस गुणा करो",
    "Multiply the divisor by your answer. Add what was left. Is it the number you started with?": "भाजक को अपने उत्तर से गुणा करो। जो बचा था उसे जोड़ो। क्या यह वही संख्या है जिससे शुरू किया था?",
    "Type the divisor times the quotient. The check card adds the remainder.": "भाजक गुणा भागफल लिखो। जाँच कार्ड शेषफल जोड़ देगा।",
    "What was left at the end, and has it been added?": "आखिर में क्या बचा था, और क्या वह जोड़ा गया?",
    "Divisor times quotient, then add the remainder. Does it give the number you started with?": "भाजक गुणा भागफल, फिर शेषफल जोड़ो। क्या शुरू वाली संख्या मिलती है?",
    "Divisor times quotient, add the remainder, gives back the dividend.": "भाजक गुणा भागफल, फिर शेषफल जोड़ो, तो भाज्य वापस मिलता है।",
    "You learned: divisor × quotient + remainder gives back the dividend.": "तुमने सीखा: भाजक × भागफल + शेषफल से भाज्य वापस मिलता है।",
    "5,178 divided by 8 is 647 remainder 2. Check it by multiplying back: what is 8 times 647?": "5,178 को 8 से भाग देने पर 647 आता है, शेषफल 2। वापस गुणा करके जाँचो: 8 गुणा 647 कितना है?",
    "Break 647 into 600, 40 and 7. Multiply each by 8.": "647 को 600, 40 और 7 में तोड़ो। हर एक को 8 से गुणा करो।",
    "Is 3,097 divided by 6 equal to 516 remainder 1? Check it. First, what is 6 times 516?": "क्या 3,097 ÷ 6 बराबर 516 है, शेषफल 1? जाँचो। पहले, 6 गुणा 516 कितना है?",
    "Multiply 6 by 500, by 10 and by 6. Then add them.": "6 को 500 से, 10 से और 6 से गुणा करो। फिर उन्हें जोड़ो।",
    "A child says 7,562 divided by 9 is 84 remainder 2. Multiply back to test it, then find the right answer.": "एक बच्चा कहता है कि 7,562 ÷ 9 बराबर 84 है, शेषफल 2। वापस गुणा करके परखो, फिर सही उत्तर निकालो।",
    "9 times 84, add 2. Is that 7,562?": "9 गुणा 84, फिर 2 जोड़ो। क्या यह 7,562 है?",
    /* the frame's own words */
    "O": "इ", "T": "द", "H": "सै", "Th": "ह",
    "ones": "इकाई", "tens": "दहाई", "hundreds": "सैकड़े", "thousands": "हज़ार",
    "one": "इकाई", "ten": "दहाई", "hundred": "सैकड़ा", "thousand": "हज़ार",
    "places": "स्थान", "quotient": "भागफल", "remainder": "शेषफल", "dividing": "भाग दे रहे", "left over": "बचे",
    "rebuilt": "फिर बना", "dividend": "भाज्य", "total": "कुल", "Multiply back": "वापस गुणा करो",
    "A new number": "नई संख्या", "New": "नई", "The next divisor": "अगला भाजक", "Write what is left": "जो बचा वह लिखो",
    /* the summary page's little drawings (Thumb) */
    "R": "शे", "rows A, B and C": "पंक्ति A, B और C",
  },
  gu: {
    "Long Division Frame": "લાંબા ભાગાકારનું માળખું",
    "A number under its place headings, and a divisor at the door. Which place goes first?": "સ્થાનનાં મથાળાં નીચે એક સંખ્યા, અને દરવાજે એક ભાજક. પહેલાં કયું સ્થાન?",
    "Every step said, every zero where the number was smaller, and every check matched.": "દરેક પગલું બોલાયું, સંખ્યા નાની હતી ત્યાં શૂન્ય મૂકાયું, અને દરેક ચકાસણી મળી ગઈ.",
    "Free play. Any dividend, any divisor from two to nine, with the gate and the check bar open.": "મુક્ત રમત. કોઈ પણ ભાજ્ય, બેથી નવ સુધી કોઈ પણ ભાજક, ઢાંકણ અને ચકાસણી કાર્ડ ખુલ્લાં.",
    "Start with the biggest place": "સૌથી મોટા સ્થાનથી શરૂ કરો",
    "Which place is the biggest? Share that one first.": "સૌથી મોટું સ્થાન કયું છે? પહેલાં તેને વહેંચો.",
    "Drag the biggest multiple that fits. Tap the box under it and type what is left.": "જે સૌથી મોટો ગુણિત સમાય, તેને ખેંચો. તેની નીચેના ખાના પર ટૅપ કરો અને જે વધ્યું તે લખો.",
    "Bring the next digit down. At the end, type the quotient and the remainder.": "આગળનો અંક નીચે લાવો. છેલ્લે ભાગફળ અને શેષ લખો.",
    "How many of that place does each share get?": "દરેક ભાગને તે સ્થાનના કેટલા મળે છે?",
    "Share the biggest place, then carry what is left into the next place.": "સૌથી મોટું સ્થાન વહેંચો, પછી જે વધે તે આગળના સ્થાનમાં લઈ જાઓ.",
    "Long division starts with the digit in the biggest place, and what is left is carried on.": "લાંબો ભાગાકાર સૌથી મોટા સ્થાનના અંકથી શરૂ થાય છે, અને જે વધે તે આગળ જાય છે.",
    "You learned: start with the biggest place, and carry what is left.": "તમે શીખ્યા: સૌથી મોટા સ્થાનથી શરૂ કરો, અને વધેલું આગળ લઈ જાઓ.",
    "Divide 846 by 3. Where do you start, and what is carried on?": "846 ને 3 વડે ભાગો. ક્યાંથી શરૂ કરશો, અને શું આગળ જાય છે?",
    "Look at the headings. Share the biggest place before the others.": "મથાળાં જુઓ. બીજાં પહેલાં સૌથી મોટું સ્થાન વહેંચો.",
    "Divide 684 by 2.": "684 ને 2 વડે ભાગો.",
    "Start with the hundreds, not the ones.": "એકમથી નહીં, શતકથી શરૂ કરો.",
    "Divide 2,736 by 4.": "2,736 ને 4 વડે ભાગો.",
    "Can 2 thousands be shared by 4? What do they join?": "શું 2 હજારને 4 માં વહેંચી શકાય? તે કોની સાથે જોડાય છે?",
    "Bring down and divide again": "નીચે લાવો અને ફરી ભાગો",
    "Type what is left under the line first. Then bring the next digit down, and read the new number with its place.": "પહેલાં લીટી નીચે જે વધ્યું તે લખો. પછી આગળનો અંક નીચે લાવો, અને નવી સંખ્યા તેના સ્થાન સાથે વાંચો.",
    "Which digit comes down next, and what does it join?": "હવે કયો અંક નીચે આવે છે, અને તે કોની સાથે જોડાય છે?",
    "Change what is left into the next place, then add the digit that comes down.": "જે વધ્યું તેને આગળના સ્થાનમાં બદલો, પછી નીચે આવતો અંક ઉમેરો.",
    "Each step brings down the next digit and divides everything that has built up.": "દરેક પગલે આગળનો અંક નીચે આવે છે, અને જે ભેગું થયું તે બધાને ભાગવામાં આવે છે.",
    "You learned: bring the next digit down and divide all that built up.": "તમે શીખ્યા: આગળનો અંક નીચે લાવો અને ભેગું થયેલું બધું ભાગો.",
    "Divide 953 by 4, saying what is left at each step.": "953 ને 4 વડે ભાગો, અને દરેક પગલે કહો કે શું વધ્યું.",
    "What is left after the hundreds? It joins the 5 tens.": "શતક પછી શું વધ્યું? તે 5 દશક સાથે જોડાય છે.",
    "Divide 915 by 5, saying what is left after each step.": "915 ને 5 વડે ભાગો, અને દરેક પગલા પછી કહો કે શું વધ્યું.",
    "How many hundreds are left after the first step? They join the tens.": "પહેલા પગલા પછી કેટલા શતક વધ્યા? તે દશક સાથે જોડાય છે.",
    "One block of a stand has three rows. Row A seats 738 ÷ 6 people. Row B seats 856 ÷ 8. Row C seats 935 ÷ 5. How many people sit in the block?": "એક સ્ટેન્ડના એક બ્લોકમાં ત્રણ હાર છે. હાર A માં 738 ÷ 6 લોકો બેસે છે. હાર B માં 856 ÷ 8. હાર C માં 935 ÷ 5. બ્લોકમાં કેટલા લોકો બેસે છે?",
    "People in the block?": "બ્લોકમાં કેટલા લોકો?",
    "Divide each row, then add the three answers.": "દરેક હારને ભાગો, પછી ત્રણેય જવાબ ઉમેરો.",
    "Smaller than the divisor means a zero": "ભાજક કરતાં નાની, તો શૂન્ય",
    "Is this number smaller than the divisor? Then how many fit?": "શું આ સંખ્યા ભાજક કરતાં નાની છે? તો કેટલા સમાશે?",
    "When not even one fits, tap the cell on top and type how many fit.": "જ્યારે એક પણ ન સમાય, ત્યારે ઉપરના ખાના પર ટૅપ કરો અને લખો કેટલા સમાયા.",
    "Is it smaller than the divisor?": "શું તે ભાજક કરતાં નાની છે?",
    "Lay times one beside the number. Does even one fit?": "સંખ્યાની બાજુમાં એક ગણું મૂકો. શું એક પણ સમાય છે?",
    "A zero goes in the quotient only when the number being divided is smaller than the divisor. Whether the step divides exactly is not the test.": "ભાગફળમાં શૂન્ય ત્યારે જ આવે જ્યારે ભાગાતી સંખ્યા ભાજક કરતાં નાની હોય. પગલું પૂરેપૂરું ભાગાય છે કે નહીં, તે કસોટી નથી.",
    "You learned: smaller than the divisor means a zero on top.": "તમે શીખ્યા: ભાજક કરતાં નાની હોય, તો ઉપર શૂન્ય આવે.",
    "Divide 9,836 by 7. Look for the step where the number is smaller than 7.": "9,836 ને 7 વડે ભાગો. એ પગલું શોધો જ્યાં સંખ્યા 7 કરતાં નાની છે.",
    "What is the working number at the tens, with its place name?": "દશક પર અત્યારે કઈ સંખ્યા છે, તેના સ્થાનના નામ સાથે?",
    "In 612 divided by 6, what goes in the tens place of the quotient?": "612 ને 6 વડે ભાગતાં, ભાગફળના દશકના સ્થાને શું આવે?",
    "Tens digit of the quotient?": "ભાગફળનો દશકનો અંક?",
    "After the 6 hundreds, what number stands at the tens? Can 6 fit in it?": "6 શતક પછી દશક પર કઈ સંખ્યા છે? શું તેમાં 6 સમાઈ શકે?",
    "Divide 8,045 by 8.": "8,045 ને 8 વડે ભાગો.",
    "Look at the hundreds, then the tens. Is each smaller than 8?": "પહેલાં શતક જુઓ, પછી દશક. શું દરેક 8 કરતાં નાનું છે?",
    "Multiply back to check": "ચકાસવા પાછો ગુણાકાર કરો",
    "Multiply the divisor by your answer. Add what was left. Is it the number you started with?": "ભાજકને તમારા જવાબ વડે ગુણો. જે વધ્યું હતું તે ઉમેરો. શું આ એ જ સંખ્યા છે જેનાથી શરૂ કર્યું હતું?",
    "Type the divisor times the quotient. The check card adds the remainder.": "ભાજક ગુણ્યા ભાગફળ લખો. ચકાસણી કાર્ડ શેષ ઉમેરશે.",
    "What was left at the end, and has it been added?": "છેલ્લે શું વધ્યું હતું, અને શું તે ઉમેરાયું?",
    "Divisor times quotient, then add the remainder. Does it give the number you started with?": "ભાજક ગુણ્યા ભાગફળ, પછી શેષ ઉમેરો. શું શરૂઆતની સંખ્યા મળે છે?",
    "Divisor times quotient, add the remainder, gives back the dividend.": "ભાજક ગુણ્યા ભાગફળ, વત્તા શેષ, ફરી ભાજ્ય આપે છે.",
    "You learned: divisor × quotient + remainder gives back the dividend.": "તમે શીખ્યા: ભાજક × ભાગફળ + શેષ ફરી ભાજ્ય આપે છે.",
    "5,178 divided by 8 is 647 remainder 2. Check it by multiplying back: what is 8 times 647?": "5,178 ને 8 વડે ભાગતાં 647 આવે, શેષ 2. પાછો ગુણાકાર કરીને ચકાસો: 8 ગુણ્યા 647 કેટલા?",
    "Break 647 into 600, 40 and 7. Multiply each by 8.": "647 ને 600, 40 અને 7 માં તોડો. દરેકને 8 વડે ગુણો.",
    "Is 3,097 divided by 6 equal to 516 remainder 1? Check it. First, what is 6 times 516?": "શું 3,097 ÷ 6 બરાબર 516, શેષ 1 છે? ચકાસો. પહેલાં, 6 ગુણ્યા 516 કેટલા?",
    "Multiply 6 by 500, by 10 and by 6. Then add them.": "6 ને 500 વડે, 10 વડે અને 6 વડે ગુણો. પછી તેમનો સરવાળો કરો.",
    "A child says 7,562 divided by 9 is 84 remainder 2. Multiply back to test it, then find the right answer.": "એક બાળક કહે છે કે 7,562 ÷ 9 બરાબર 84, શેષ 2. પાછો ગુણાકાર કરીને ચકાસો, પછી સાચો જવાબ શોધો.",
    "9 times 84, add 2. Is that 7,562?": "9 ગુણ્યા 84, વત્તા 2. શું તે 7,562 છે?",
    /* the frame's own words */
    "O": "એ", "T": "દ", "H": "શ", "Th": "હ",
    "ones": "એકમ", "tens": "દશક", "hundreds": "શતક", "thousands": "હજાર",
    "one": "એકમ", "ten": "દશક", "hundred": "શતક", "thousand": "હજાર",
    "places": "સ્થાન", "quotient": "ભાગફળ", "remainder": "શેષ", "dividing": "ભાગી રહ્યા", "left over": "વધ્યા",
    "rebuilt": "ફરી બન્યું", "dividend": "ભાજ્ય", "total": "કુલ", "Multiply back": "પાછો ગુણાકાર કરો",
    "A new number": "નવી સંખ્યા", "New": "નવી", "The next divisor": "આગળનો ભાજક", "Write what is left": "જે વધ્યું તે લખો",
    /* the summary page's little drawings (Thumb) */
    "R": "શે", "rows A, B and C": "હાર A, B અને C",
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
                   label at most 10 characters, e.g. { label: "each bowl", unit: "mL" }); typed reads "16|1" */
/* Item fields of this tool (besides the runtime's): N the dividend, d the divisor; near = the item's
   misconception as the slot would read it; open = how the frame stands when the question opens
   ("step": at the step `col`; "claim": a child's claimed working that stops before the last place;
   "done": the claimed division finished); check = what the check card does ("after": live once the
   frame is done; "claim": live on the claim; "product": the child types divisor × quotient);
   bay = the three divisions of one block of seats. Every answer is checked against its plan comment. */
const QR = [{ label: "quotient" }, { label: "remainder" }];
const PHASES = [
  {
    n: 1,
    concept: "Start with the biggest place",
    conceptId: "M2.S3.T4.C12", objectiveIds: ["O5"],
    says: ["Which place is the biggest? Share that one first.",
      "Drag the biggest multiple that fits. Tap the box under it and type what is left.",
      "Bring the next digit down. At the end, type the quotient and the remainder."],
    /* tries, as the plan writes it: A miss is answered three ways at once and none of them is the answer. First rung, from the item's own miss line: which place is the biggest? Second rung, the phase's: how many of that place does each share get? Third rung: the frame is cut to a two-digit dividend, and the child shares the tens before the ones. The number pad stays open behind all three rungs. */
    ladder: ["How many of that place does each share get?", "Share the biggest place, then carry what is left into the next place."],
    closing: "Long division starts with the digit in the biggest place, and what is left is carried on.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: start with the biggest place, and carry what is left.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The frame is cleared and replayed from the biggest place heading: each step's multiple is taken away, what is left is changed into the next place as the next digit comes down, and it ends on the whole quotient and the remainder.",
    items: [
      /* learn ML1: answer in the plan = Start with the 8 hundreds: 2 hundreds each, with 2 hundreds carried into the tens. The quotient is 282, remainder 0 */
      { qid: "M2.S3.T4.C12:ML1", kind: "divide", N: 846, d: 3, parts: QR, answer: [282, 0], near: "212|0", winMs: 4200,
        say: "Divide 846 by 3. Where do you start, and what is carried on?", ask: "846 ÷ 3", miss: "Look at the headings. Share the biggest place before the others." },
      /* practice 1: answer in the plan = 342 (remainder 0) */
      { qid: "M2.S3.T4.C12:1", kind: "divide", N: 684, d: 2, parts: QR, answer: [342, 0], near: "243|0", winMs: 4200,
        say: "Divide 684 by 2.", ask: "684 ÷ 2", miss: "Start with the hundreds, not the ones." },
      /* practice 4: answer in the plan = 684, remainder 0. The 2 thousands are smaller than 4, so the division starts with 27 hundreds */
      { qid: "M2.S3.T4.C12:4", kind: "divide", N: 2736, d: 4, parts: QR, answer: [684, 0], near: "184|0", winMs: 4200,
        say: "Divide 2,736 by 4.", ask: "2,736 ÷ 4", miss: "Can 2 thousands be shared by 4? What do they join?" },
    ],
  },
  {
    n: 2,
    concept: "Bring down and divide again",
    conceptId: "M2.S3.T4.C13", objectiveIds: ["O5"],
    says: ["Type what is left under the line first. Then bring the next digit down, and read the new number with its place."],
    /* tries, as the plan writes it: First rung, from the item: what is in the left slot? Second rung, the phase's: which digit comes down next, and what does it join? Third rung: the frame is cut to a two-digit dividend with one leftover, and the child fills the slot and brings down once. The number pad stays open. */
    ladder: ["Which digit comes down next, and what does it join?", "Change what is left into the next place, then add the digit that comes down."],
    closing: "Each step brings down the next digit and divides everything that has built up.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: bring the next digit down and divide all that built up.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The frame is replayed step by step: what is left stays in the left over box, is changed into the next place, and joins the digit brought down, so the window reads the new number with its place; it ends on the quotient and the remainder (for the block of seats, each row's division fills its card and the total is added).",
    items: [
      /* learn ML2: answer in the plan = 238 remainder 1 */
      { qid: "M2.S3.T4.C13:ML2", kind: "divide", N: 953, d: 4, parts: QR, answer: [238, 1], near: "213|1", winMs: 4200,
        say: "Divide 953 by 4, saying what is left at each step.", ask: "953 ÷ 4", miss: "What is left after the hundreds? It joins the 5 tens." },
      /* practice 2: answer in the plan = 183, with 4 hundreds left after the first step, 1 ten after the second and nothing at the end (remainder 0) */
      { qid: "M2.S3.T4.C13:2", kind: "divide", N: 915, d: 5, parts: QR, answer: [183, 0], near: "103|0", winMs: 4200,
        say: "Divide 915 by 5, saying what is left after each step.", ask: "915 ÷ 5", miss: "How many hundreds are left after the first step? They join the tens." },
      /* practice 8: answer in the plan = 417, because the rows seat 123, 107 and 187, and those add up to 417 */
      { qid: "M2.S3.T4.C13:8", kind: "blocks", bay: [[738, 6], [856, 8], [935, 5]], answer: 417, near: 327, winMs: 4200,
        say: "One block of a stand has three rows. Row A seats 738 ÷ 6 people. Row B seats 856 ÷ 8. Row C seats 935 ÷ 5. How many people sit in the block?",
        ask: "People in the block?", miss: "Divide each row, then add the three answers." },
    ],
  },
  {
    n: 3,
    concept: "Smaller than the divisor means a zero",
    conceptId: "M2.S3.T4.C14", objectiveIds: ["O6"],
    says: ["Is this number smaller than the divisor? Then how many fit?", "When not even one fits, tap the cell on top and type how many fit."],
    /* tries, as the plan writes it: First rung, from the item: what is the working number at this step, with its place name? Second rung, the phase's: is it smaller than the divisor? Third rung: the strip is laid against the working number rung by rung from times one, and the child says whether even the first rung fits. The zero key stays open, and the gate still reads it. */
    ladder: ["Is it smaller than the divisor?", "Lay times one beside the number. Does even one fit?"],
    closing: "A zero goes in the quotient only when the number being divided is smaller than the divisor. Whether the step divides exactly is not the test.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: smaller than the divisor means a zero on top.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The frame is replayed; at a step whose number is smaller than the divisor the whole strip of multiples lights, goes dark rung by rung from the top, the lid lifts and a grey zero drops in at full size, and the number joins the next digit whole; it ends on the whole quotient and the remainder.",
    items: [
      /* learn ML3: answer in the plan = At the tens: 3 tens is smaller than 7, so a zero goes in the tens place. The answer is 1405 remainder 1 */
      { qid: "M2.S3.T4.C14:ML3", kind: "divide", N: 9836, d: 7, parts: QR, answer: [1405, 1], near: "145|1", winMs: 4600,
        say: "Divide 9,836 by 7. Look for the step where the number is smaller than 7.", ask: "9,836 ÷ 7", miss: "What is the working number at the tens, with its place name?" },
      /* practice 3: answer in the plan = A zero, because 1 ten is smaller than 6; the quotient is 102 */
      { qid: "M2.S3.T4.C14:3", kind: "digit", N: 612, d: 6, open: "step", col: 1, answer: 0, near: 2, winMs: 3600,
        say: "In 612 divided by 6, what goes in the tens place of the quotient?", ask: "Tens digit of the quotient?", miss: "After the 6 hundreds, what number stands at the tens? Can 6 fit in it?" },
      /* practice 5: answer in the plan = The quotient is 1005, remainder 5: a zero goes in the hundreds and a zero in the tens, because 0 hundreds and then 4 tens are each smaller than 8 */
      { qid: "M2.S3.T4.C14:5", kind: "divide", N: 8045, d: 8, parts: QR, answer: [1005, 5], near: "15|5", winMs: 4600,
        say: "Divide 8,045 by 8.", ask: "8,045 ÷ 8", miss: "Look at the hundreds, then the tens. Is each smaller than 8?" },
    ],
  },
  {
    n: 4,
    concept: "Multiply back to check",
    conceptId: "M2.S3.T4.C15", objectiveIds: ["O6"],
    says: ["Multiply the divisor by your answer. Add what was left. Is it the number you started with?",
      "Type the divisor times the quotient. The check card adds the remainder."],
    /* tries, as the plan writes it: First rung, from the item: what is the divisor times the quotient? Second rung, the phase's: what was left at the end, and has it been added? Third rung: the check is cut to twenty-nine divided by four, and the child rebuilds twenty-nine from the answer. The number pad stays open. */
    ladder: ["What was left at the end, and has it been added?", "Divisor times quotient, then add the remainder. Does it give the number you started with?"],
    closing: "Divisor times quotient, add the remainder, gives back the dividend.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: divisor × quotient + remainder gives back the dividend.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The check card builds divisor times quotient place by place (8 × 600, 8 × 640, 8 × 647), adds the remainder and lays the rebuilt number over the dividend, where it matches digit for digit; for the claimed 84 remainder 2 it first shows 758, a whole place short, then the missing zero is written in the ones and the check matches.",
    items: [
      /* learn ML4: answer in the plan = 647 remainder 2, and 8 times 647 is 5176, add 2 makes 5178
         (the phase opens on the finished division, as the brief says, so 647 r 2 is on the frame; the child
         types 8 × 647 and the card adds the 2 and matches the dividend) */
      { qid: "M2.S3.T4.C15:ML4", kind: "product", N: 5178, d: 8, open: "done", check: "product", claim: [647, 2], answer: 5176, near: 5178, winMs: 4200,
        say: "5,178 divided by 8 is 647 remainder 2. Check it by multiplying back: what is 8 times 647?", ask: "8 × 647 = ?", miss: "Break 647 into 600, 40 and 7. Multiply each by 8." },
      /* practice 6: answer in the plan = Yes: 6 times 516 is 3096, and adding 1 gives 3097 (the child types 6 × 516; the card adds the 1 and matches) */
      { qid: "M2.S3.T4.C15:6", kind: "product", N: 3097, d: 6, open: "done", check: "product", claim: [516, 1], answer: 3096, near: 3097, winMs: 4200,
        say: "Is 3,097 divided by 6 equal to 516 remainder 1? Check it. First, what is 6 times 516?", ask: "6 × 516 = ?", miss: "Multiply 6 by 500, by 10 and by 6. Then add them." },
      /* practice 7: answer in the plan = 9 times 84 is 756, add 2 makes 758, not 7562, so it is wrong. The quotient is 840 remainder 2: the last 2 ones are smaller than 9, so a zero goes in the ones place */
      { qid: "M2.S3.T4.C15:7", kind: "divide", N: 7562, d: 9, open: "claim", check: "claim", claim: [84, 2], parts: QR, answer: [840, 2], near: "84|2", winMs: 5000,
        say: "A child says 7,562 divided by 9 is 84 remainder 2. Multiply back to test it, then find the right answer.", ask: "7,562 ÷ 9", miss: "9 times 84, add 2. Is that 7,562?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  frame: "long division: place headings Th H T O, the quotient row above its places, the divisor at the left of the bracket, the dividend under it; each step's multiple is taken away and the next digit brought down",
  columnWidth: 66,
  strip: "the divisor times 1 to times 9, dragged (or tapped) onto the step in hand; a multiple bigger than the number does not fit",
  zeroGate: "a lid over the quotient cell of the step in hand: the child taps it and types the digit on the pad; it takes a zero only when the number being divided is smaller than the divisor, and a digit only when that many fit",
  leftOver: "under each multiple a cell waits: the child taps it and types what is left; it is taken only when the multiple plus it makes the number and it is smaller than the divisor, and the next digit cannot come down before it",
  checkCard: "divisor times quotient, add the remainder, laid right-aligned over the dividend",
  colours: { dividend: "blue", divisor: "amber", quotient: "green", leftOver: "vermilion", multiple: "rose", zeroInQuotient: "grey #767676" },
  divisions: [[846, 3], [684, 2], [2736, 4], [953, 4], [915, 5], [738, 6], [856, 8], [935, 5], [9836, 7], [612, 6], [8045, 8], [5178, 8], [3097, 6], [7562, 9]],
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work:
   multiplying back (divisor × quotient + remainder = dividend, remainder smaller than the divisor),
   counting how many times the divisor can be taken away, and adding the rows of the block */
const ldCount = (N: number, d: number) => { let k = 0, x = N; while (x >= d) { x -= d; k++; } return { k, rest: x }; };
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "divide") {
    const [q, r] = it.answer, c = ldCount(it.N, it.d);
    const claimWrong = !it.claim || it.claim[0] * it.d + it.claim[1] !== it.N;
    return q * it.d + r === it.N && r >= 0 && r < it.d && c.k === q && c.rest === r && claimWrong;
  }
  if (it.kind === "digit") {
    const c = ldCount(it.N, it.d), s = String(c.k).padStart(String(it.N).length, "0");
    return Number(s[it.col]) === it.answer && c.k * it.d + c.rest === it.N;
  }
  if (it.kind === "product") return it.answer === it.claim[0] * it.d && it.answer + it.claim[1] === it.N;
  if (it.kind === "blocks") return it.bay.every((b: number[]) => ldCount(b[0], b[1]).rest === 0)
    && it.bay.reduce((s: number, b: number[]) => s + ldCount(b[0], b[1]).k, 0) === it.answer;
  return false;
}));
/* the most likely wrong answer (the misconception); judge must reject it:
   846 ÷ 3 read from the ones with the leftovers dropped (212); 684 ÷ 2 built backwards (243);
   2,736 ÷ 4 with the 2 thousands dropped (184); the hundred left forgotten (213 r 1, 103); a zero
   left out (107 as 17: 327; 145 r 1; 15 r 5); a tens digit taken from 12 ones (2); the dividend
   taken for divisor × quotient (5,178; 3,097); the claim itself (84 r 2) */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : item.answer === 0 ? ["0", "zero"]
    : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)] : [String(item.answer)]);
/* the slot shows a typed number from 1,000 up with its Indian commas (display only; the typed value stays digits) */
const format = (v: any) => { const s = String(v ?? ""); return /^[1-9]\d{3,8}$/.test(s) ? indian(Number(s)) : s; };
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: e.g. drop a token that waits; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the long-division frame, as pure steps (the child's moves, the win and the traceback all go
   through these; nothing here is the oracle) ──────────────────────────────────────────────── */
const LD_PLACES = ["ones", "tens", "hundreds", "thousands"];
const LD_PLACE1 = ["one", "ten", "hundred", "thousand"];
const LD_HEAD = ["O", "T", "H", "Th"];
const LD_ZERO = "#767676";
const LD_INK = { dividend: shade(CONTENT.hundred, 0.25), divisor: shade(CONTENT.ten, 0.25), quot: shade(CONTENT.one, 0.25),
  left: shade(CONTENT.pointer, 0.25), mult: shade(CONTENT.bead, 0.25) };
/* a number with its place name: "15 tens", "1 hundred" */
const ldNamed = (v: number, D: number, col: number) => `${indian(v)} ${(v === 1 ? LD_PLACE1 : LD_PLACES)[Math.max(0, D - 1 - col)]}`;
/* a frame: g the dividend's digits, q the quotient row (null = empty), rows the lines under the
   dividend ({ v, end, mult, br }: its value, the column of its last digit, a multiple or not, how
   many of its digits were brought down), pos the column of the step in hand, w the number being
   divided there, ph divide | left | down | done, left what is left after the step, att the multiple
   placed under the number (ph left: it waits for the child to write what is left) */
const ldStart = (N: number, d: number): any => {
  const g = String(N).split("").map(Number);
  return { N, d, g, D: g.length, q: g.map(() => null), rows: [], pos: 0, w: g[0], ph: "divide", left: null, att: null };
};
const ldLead = (f: any) => f.rows.length === 0 && f.q.every((x: any) => !x);
/* the win and the traceback write the whole step at once (the right multiple, what is left) */
const ldTry = (f: any, k: number) => {
  if (f.ph !== "divide" && f.ph !== "left") return null;
  const m = k * f.d;
  if (m > f.w) return null;
  const r = f.w - m;
  if (r >= f.d) return null;
  const q = f.q.slice(); q[f.pos] = k;
  const rows = [...f.rows, { v: m, end: f.pos, mult: true, br: 0 }, { v: r, end: f.pos, mult: false, br: 0 }];
  return { ...f, q, rows, att: null, left: r, ph: f.pos === f.D - 1 ? "done" : "down" };
};
/* the child's step: a multiple goes under the number, and what is left waits for the child */
const ldPlace = (f: any, k: number) => ((f.ph === "divide" || f.ph === "left") && k >= 1 && k * f.d <= f.w
  ? { ...f, ph: "left", att: { k, m: k * f.d, show: 1 } } : null);
/* what the child wrote as left: taken only when it is the number minus the multiple and smaller than
   the divisor; otherwise why: "add" (multiple + it does not make the number) or "fits" (a bigger
   multiple fits) */
const ldGive = (f: any, v: number) => {
  if (f.ph !== "left" || !f.att) return { why: "none" };
  const r = f.w - f.att.m;
  if (v !== r) return { why: "add" };
  if (r >= f.d) return { why: "fits" };
  return { f: ldTry(f, f.att.k) };
};
const ldZero = (f: any) => {
  if (f.ph !== "divide" || f.w >= f.d) return null;
  const q = f.q.slice(); q[f.pos] = 0;
  return { ...f, q, left: f.w, ph: f.pos === f.D - 1 ? "done" : "down" };
};
const ldCanDown = (f: any) => f.pos < f.D - 1 && (f.ph === "down" || (f.ph === "divide" && ldLead(f) && f.w < f.d));
const ldDown = (f: any) => {
  if (!ldCanDown(f)) return null;
  const base = f.ph === "down" ? f.left : f.w;
  const w = base * 10 + f.g[f.pos + 1];
  const rows = f.rows.slice();
  if (rows.length) { const L = rows[rows.length - 1]; rows[rows.length - 1] = { ...L, v: w, end: f.pos + 1, br: L.br + 1 }; }
  return { ...f, rows, pos: f.pos + 1, w, ph: "divide", left: null, att: null };
};
const ldQuot = (f: any) => Number(f.q.map((x: any) => (x === null ? "" : String(x))).join("") || "0");
/* the next right move: a leading number smaller than the divisor is joined to the next digit (the
   zero before the first digit may be left off); later, smaller means a zero */
const ldNext = (f: any) => (f.ph === "done" ? null : f.ph === "down" ? ["down"]
  : f.w >= f.d ? ["rung", Math.floor(f.w / f.d)] : ldLead(f) ? ["down"] : ["zero"]);
const ldApply = (f: any, mv: any) => (mv[0] === "rung" ? ldTry(f, mv[1]) : mv[0] === "down" ? ldDown(f) : ldZero(f));
const ldRun = (f0: any, stop?: (f: any) => boolean) => {
  let f = f0;
  for (let g = 0; g < 30 && f.ph !== "done" && !(stop && stop(f)); g++) f = ldApply(f, ldNext(f));
  return f;
};
/* how the frame stands when an item opens */
const ldOpen = (it: any) => {
  const f0 = ldStart(it.N, it.d);
  if (it.open === "step") return ldRun(f0, (f) => f.pos === it.col && f.ph === "divide");
  if (it.open === "claim") return ldRun(f0, (f) => f.pos === f.D - 1 && f.ph === "divide");
  if (it.open === "done") return ldRun(f0);
  return f0;
};
const ldFsFor = (it: any) => (it.bay ? it.bay.map((b: number[]) => ldStart(b[0], b[1])) : [ldOpen(it)]);
/* the places a frame has finished (a leading place passed counts) */
const ldSteps = (f: any) => f.pos + (f.ph === "down" || f.ph === "done" ? 1 : 0);

/* the geometry of the working area (its own units, origin top-left) */
const LD = { FW: 480, CW: 66, QY: 92, BR: 106, DY: 156, RT: 172, RH: 50, MX: 496, MW: 340, SX: 852, RW: 113, RUH: 94, SY: 12 };
const ldLeft = (D: number) => (LD.FW - (110 + D * LD.CW)) / 2;
const ldColC = (D: number, j: number) => ldLeft(D) + 110 + LD.CW * j + LD.CW / 2;
const ldRowTop = (k: number) => LD.RT + LD.RH * k;
const ldRungXY = (k: number) => ({ x: LD.SX + (k <= 5 ? 0 : LD.RW + 8), y: LD.SY + ((k - 1) % 5) * (LD.RUH + 8) });
const LD_FREE = { kind: "free", N: 4735, d: 6, check: "after" };

const LD_CSS = `
.ld-move{transition:transform 420ms cubic-bezier(.3,.7,.25,1)}
.ld-lid{transition:transform 300ms ease;transform-box:fill-box;transform-origin:50% 0}
.ld-grab{cursor:grab}
@media (prefers-reduced-motion:reduce){.ld-move,.ld-lid{transition:none}}
`;

/* ── the working area: 1086 x 528, origin at its top-left ────────────────────────────────────
   Countable things use CONTENT colours (url(#gHundred|gTen|gOne|gBead|gPointer)); coloured numerals
   and words use a deeper ink, shade(colour, 0.25), so they read at 4.5:1. Type uses T.* only.
   Pieces: drag = useDrag(onDrop) then {...control(id, label), ...drag.bind(pay), ...drag.keys(pay)};
   taps = <Hit id x y w h onPress label />. One <Invite/> marks the one thing to touch.
   Nothing is written here that the voice already says. `wrong` = { value, tries } after a miss:
   lock, redraw the mathematics in steps (the traceback), unlock; never mark it, never reset it.
   stage === "free" is Free play (the plan's writeup.freePlay): no target, every control unlocked. */
/* a comma 24 tall, head at (x, y), in the gap between two columns (the reference tool's comma, smaller) */
const LdComma = ({ x, y, color }: any) => (
  <path d={`M ${x + 5} ${y} A 5 5 0 1 0 ${x - 1.4} ${y + 4.8} C ${x} ${y + 8.6} ${x - 2} ${y + 14} ${x - 6.4} ${y + 18.6} C ${x + 2} ${y + 15.7} ${x + 5.7} ${y + 8.6} ${x + 5} ${y} Z`} fill={color} />
);

/* a tap target for a frame cell, like the runtime's Hit; but while this cell holds the pad (`held`),
   Enter passes to the window, so it answers the cell instead of opening it again (no keyboard trap,
   BUILD_CARD §4) */
function LdCell({ id, x, y, w, h, onPress, label, held }: any) {
  const p = usePress(onPress);
  const keys = (e: any) => { if (held && e.key === "Enter") return; p.keys(e); };
  return (
    <rect className="c4-hit" data-control={id} role="button" tabIndex={0} aria-label={label || id}
      x={x} y={y} width={w} height={h} fill="transparent" {...p.bind()} onKeyDown={keys} />
  );
}

/* a labelled box of the middle column: what is being divided, what is left, and at the end the
   quotient and the remainder (the same two the slot asks for) */
function LdBox({ C, x, y, w, h, label, parts, aside }: any) {
  const len = parts ? parts.reduce((a: number, p: any) => a + p.t.length, 0) : 0;
  const size = len * T.prompt * 0.56 <= w - 36 ? T.prompt : T.label;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={16} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} strokeDasharray={len ? undefined : "8 8"} />
      <text x={x + 16} y={y + 30} fontSize={T.micro} fontWeight={500} fill={shade(C.dim, 0.45)}>{label}</text>
      {aside && <text x={x + w - 16} y={y + 32} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{aside}</text>}
      {len > 0 && (
        <text x={x + 16} y={y + h - 18} fontSize={size} fontWeight={700}>
          {parts.map((p: any, i: number) => <tspan key={i} fill={p.fill}>{p.t}</tspan>)}
        </text>
      )}
    </g>
  );
}

function Work({ phase, n, item, index, stage, wrong, api, captured, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  /* ldNamed in the language in use: "15 tens" / "15 दहाई" / "15 દશક" */
  const named = (v: number, DD: number, col: number) => `${indian(v)} ${tx((v === 1 ? LD_PLACE1 : LD_PLACES)[Math.max(0, DD - 1 - col)])}`;
  const sfx = api.sfx;
  const held = !!captured; /* the pad is lent to a cell of the frame right now (the runtime's word, not ours) */
  const tl = useTimeline();   /* the frame's own motion: a move, the win, the traceback (pieces wait for it) */
  /* a short sign that never holds a finger up (too big, a zero handed back): a plain timer, so it keeps
     its time under reduced motion too (it is a sign, not a motion) */
  const signT = useRef<any>(null);
  const sign = (on: () => void, off: () => void, ms: number) => { clearTimeout(signT.current); on(); signT.current = setTimeout(off, ms); };
  useEffect(() => () => clearTimeout(signT.current), []);
  const free = stage === "free";
  const [cur, setCur] = useState<any>(() => item);
  const [fs, setFs] = useState<any[]>(() => ldFsFor(item));
  const fsRef = useRef<any[]>(fs);
  const [act, setAct] = useState(0);            /* the block's row on the frame */
  const actRef = useRef(0);
  const [chk, setChk] = useState<any>(null);    /* the check card, as far as it has run */
  const [lit, setLit] = useState<number[]>([]); /* rungs of the strip lit */
  const [conv, setConv] = useState<number | null>(null); /* what is left, changed into the next place */
  const [fly, setFly] = useState<any>(null);    /* a digit on its way down */
  const [lid, setLid] = useState(false);        /* the lid lifting over the quotient cell */
  const [why, setWhy] = useState<any>(null);    /* why a move was handed back: { box, text, zero? } */
  const [cell, setCell] = useState<any>(null);  /* the cell the child writes in: { kind: quot | left, text, stale } */
  const cellRef = useRef<any>(null);
  const keyRef = useRef<any>(null);
  const [head, setHead] = useState<number | null>(null);
  const [total, setTotal] = useState(false);
  const [touched, setTouched] = useState(false);
  const [downs, setDowns] = useState(0);
  const [ran, setRan] = useState(false);
  const setupFor = useRef(index);
  const busy = tl.busy;

  const put = (nf: any, k = actRef.current) => { const a = fsRef.current.slice(); a[k] = nf; fsRef.current = a; setFs(a); };
  const clearFx = () => { clearTimeout(signT.current); setWhy(null); setLit([]); setConv(null); setFly(null); setLid(false); setHead(null); };
  /* the pad goes back to the answer boxes (the runtime also takes it back on its own) */
  const giveBack = () => { if (cellRef.current) api.capture(null); cellRef.current = null; setCell(null); };
  /* the runtime took the pad back (a tap on an answer box): what was typed in the cell was not taken, so it goes */
  useEffect(() => { if (!captured && cellRef.current) { cellRef.current = null; setCell(null); } }, [captured]);
  const resetTo = (it: any) => {
    tl.stop(); clearFx(); giveBack();
    const a = ldFsFor(it);
    fsRef.current = a; setFs(a); setCur(it); actRef.current = 0; setAct(0);
    setChk(null); setTotal(false); setTouched(false); setDowns(0); setRan(false);
  };

  useEffect(() => {
    if (free || setupFor.current === index) return;
    setupFor.current = index;
    resetTo(item);
  }, [index, stage]);

  /* free play (the plan's freePlay): any dividend up to 9,999, any divisor from 2 to 9, the lid and
     the check card open, nothing to get right */
  const freeDivision = (d: number) => {
    for (let t = 0; t < 60; t++) {
      const N = 100 + Math.floor(Math.random() * 9900);
      if (ldRun(ldStart(N, d)).rows.length <= 6) return { ...LD_FREE, N, d };
    }
    return { ...LD_FREE, d };
  };
  useEffect(() => { if (free) { setupFor.current = -2; resetTo(LD_FREE); } }, [free]);

  const f = fs[act] || fs[0];
  const D = f.D;
  const cx = (j: number) => ldColC(D, j);
  const kind = cur.kind;
  const open = (stage === "ask" || free) && !busy;
  const canRung = open && (f.ph === "divide" || f.ph === "left") && kind !== "product";
  /* the quotient cell of the step in hand takes a typed digit (a zero when nothing fits); the step
     question of phase 3 is answered in the slot, so there the cell stays shut */
  const canQuot = open && (f.ph === "divide" || f.ph === "left") && kind !== "digit" && kind !== "product";
  const canLeft = open && f.ph === "left" && !!f.att && f.att.show === 1;
  const canDown = open && ldCanDown(f) && kind !== "digit";
  const ckMode = cur.check;
  const ckQ = ckMode === "product" ? cur.claim[0] : f.ph === "done" || ckMode === "claim" ? ldQuot(f) : null;
  const ckR = ckMode === "product" ? cur.claim[1] : f.ph === "done" ? f.left : ckMode === "claim" && f.ph === "divide" ? f.w : null;
  const canCheck = open && !!ckMode && ckMode !== "product" && ckQ !== null && ckR !== null && !(chk && chk.q === ckQ && chk.r === ckR);

  /* ── the moves, as timed steps [wait after, fn] ── */
  const rowYFor = (g: any) => (g.rows.length ? ldRowTop(g.rows.length - 1) + 40 : LD.DY);
  const rungSteps = (S: any[], g: any, k: number, pace: number, at: number) => {
    const m = k * g.d, fA = { ...g, ph: "left", att: { k, m, r: g.w - m, show: 1 } }, end = ldTry(g, k);
    S.push([380 * pace, () => { put(fA, at); sfx.tick(); }]);
    S.push([420 * pace, () => put({ ...fA, att: { ...fA.att, show: 2 } }, at)]);
    S.push([220 * pace, () => put(end, at)]);
    return end;
  };
  const downSteps = (S: any[], g: any, pace: number, at: number) => {
    const base = g.ph === "down" ? g.left : g.w, end = ldDown(g), x = ldColC(g.D, g.pos + 1), v = g.g[g.pos + 1];
    if (base > 0) S.push([500 * pace, () => setConv(base * 10)]);
    if (g.rows.length) {
      S.push([70, () => setFly({ x, y: LD.DY, v })]);
      S.push([450 * pace, () => setFly({ x, y: rowYFor(g), v })]);
    }
    S.push([200 * pace, () => { put(end, at); setFly(null); setConv(null); sfx.tick(); }]);
    return end;
  };
  const zeroSteps = (S: any[], g: any, pace: number, sweep: boolean, at: number) => {
    const end = ldZero(g);
    if (sweep) {
      S.push([520 * pace, () => setLit([1, 2, 3, 4, 5, 6, 7, 8, 9])]);
      for (let k = 9; k >= 1; k--) { const j = k; S.push([110 * pace, () => setLit((l) => l.filter((x) => x < j))]); }
      S.push([240 * pace, () => {}]);
    }
    S.push([340 * pace, () => setLid(true)]);
    S.push([380 * pace, () => { put(end, at); sfx.tick(); }]);
    S.push([60, () => setLid(false)]);
    return end;
  };
  const autoSteps = (S: any[], g0: any, pace: number, sweep: boolean, at: number) => {
    let g = g0;
    for (let t = 0; t < 30 && g && g.ph !== "done"; t++) {
      const mv: any = ldNext(g);
      g = mv[0] === "rung" ? rungSteps(S, g, mv[1], pace, at) : mv[0] === "down" ? downSteps(S, g, pace, at) : zeroSteps(S, g, pace, sweep, at);
    }
    return g;
  };
  /* the check card: divisor × quotient, then + the remainder, then laid over the dividend */
  const checkSteps = (S: any[], N: number, d: number, q: number, r: number, pace: number) => {
    S.push([520 * pace, () => setChk({ N, d, q, r, n: 1 })]);
    S.push([480 * pace, () => setChk({ N, d, q, r, n: 2 })]);
    S.push([420 * pace, () => { setChk({ N, d, q, r, n: 3 }); if (d * q + r === N) sfx.tick(); }]);
  };
  /* divisor × quotient built place by place: 6 × 500, 6 × 510, 6 × 516 */
  const buildSteps = (S: any[], N: number, d: number, q: number, r: number, pace: number) => {
    const qs = [Math.floor(q / 100) * 100, Math.floor(q / 10) * 10, q].filter((x, i, a) => x > 0 && a.indexOf(x) === i);
    qs.forEach((x) => S.push([760 * pace, () => setChk({ N, d, q, r, qs: x, n: 1 })]));
    S.push([500 * pace, () => setChk({ N, d, q, r, n: 2 })]);
    S.push([420 * pace, () => { setChk({ N, d, q, r, n: 3 }); sfx.tick(); }]);
  };

  /* ── the child's moves ── */
  const settle = () => { clearTimeout(signT.current); setWhy(null); setLit([]); setChk(null); };
  /* why a move is handed back, shown on the frame's boxes for a while; nothing is marked */
  const showWhy = (box: string, text: string, lits: number[] = [], zero = false) =>
    sign(() => { setWhy({ box, text, zero }); setLit(lits); }, () => { setWhy(null); setLit([]); }, 2600);
  const cmp = (a: number, b: number) => `${indian(a)} ${a > b ? ">" : a < b ? "<" : "="} ${indian(b)}`;
  /* a multiple goes under the number; what is left waits for the child */
  const place = (k: number) => {
    const nf = ldPlace(f, k);
    if (!nf) return;
    settle(); giveBack();
    put(nf); sfx.tick();
  };
  const onRung = (k: number) => {
    if (!canRung) return;
    setTouched(true);
    if (k * f.d > f.w) { showWhy("win", cmp(k * f.d, f.w)); return; }
    place(k);
  };
  /* a tap on a cell lends the pad to it (never when a question opens) */
  const lend = (kindC: string) => {
    const c = cellRef.current && cellRef.current.kind === kindC ? { ...cellRef.current, stale: true } : { kind: kindC, text: "", stale: false };
    cellRef.current = c; setCell(c);
    api.capture((k: string) => keyRef.current && keyRef.current(k));
  };
  const onQuotCell = () => { if (!canQuot) return; setTouched(true); settle(); lend("quot"); };
  const onLeftCell = () => { if (!canLeft) return; setTouched(true); settle(); lend("left"); };
  /* Enter on a cell: the digit on top, or what is left, is taken only when it is right for the step */
  const judgeCell = (c: any) => {
    if (c.text === "") return;
    const v = Number(c.text), stale = () => { const nc = { ...c, stale: true }; cellRef.current = nc; setCell(nc); };
    if (c.kind === "quot") {
      if (v === 0) {
        if (f.w < f.d) { giveBack(); settle(); const S: any[] = []; zeroSteps(S, f, 1, false, actRef.current); tl.run(S); return; }
        showWhy("win", cmp(f.w, f.d), [1], true); stale(); return;        /* one fits at least: a zero cannot go here */
      }
      if (f.w < f.d) { showWhy("win", cmp(f.w, f.d)); stale(); return; } /* smaller than the divisor: not even one fits */
      if (v * f.d > f.w) { showWhy("win", cmp(v * f.d, f.w)); stale(); return; }
      place(v);
      return;
    }
    const res: any = ldGive(f, v);
    if (res.f) {
      giveBack(); settle();
      const at = actRef.current, fB = { ...f, att: { ...f.att, r: v, show: 2 } };
      tl.run([[320, () => { put(fB, at); sfx.tick(); }], [120, () => put(res.f, at)]]);
      return;
    }
    if (res.why === "add") showWhy("left", `${indian(f.att.m)} + ${indian(v)} = ${indian(f.att.m + v)}`);
    else if (res.why === "fits") showWhy("left", cmp(v, f.d));
    stale();
  };
  keyRef.current = (k: string) => {
    const c = cellRef.current;
    if (!c || busy) return;
    if (k === "enter") { judgeCell(c); return; }
    const max = c.kind === "quot" ? 1 : String(f.w).length;
    const text = k === "back" ? (c.stale ? "" : c.text.slice(0, -1)) : k === "clear" ? ""
      : /^\d$/.test(k) ? (c.stale || c.kind === "quot" ? k : c.text.length >= max ? c.text : c.text + k) : c.text;
    const nc = { ...c, text, stale: false };
    cellRef.current = nc; setCell(nc);
    if (why) { clearTimeout(signT.current); setWhy(null); setLit([]); }
  };
  /* the agent's check(): Enter goes to the answer boxes, so a lent pad is given back first */
  HOOK.check = () => { giveBack(); return undefined; };
  const onDown = () => {
    if (!canDown) return;
    setTouched(true); setDowns((c) => c + 1);
    settle();
    const S: any[] = [];
    downSteps(S, f, 1, actRef.current);
    tl.run(S);
  };
  const onCheck = () => {
    if (!canCheck) return;
    setTouched(true); setRan(true);
    const S: any[] = [[80, () => setChk({ N: f.N, d: f.d, q: ckQ, r: ckR, n: 0 })]];
    checkSteps(S, f.N, f.d, ckQ, ckR, 1);
    tl.run(S);
  };
  const onRow = (k: number) => {
    if (!open || k === actRef.current) return;
    setTouched(true); settle();
    actRef.current = k; setAct(k);
  };
  const onNew = () => { if (free && !busy) resetTo(freeDivision(cur.d || 6)); };
  const onDivisor = () => {
    if (!free || busy) return;
    const d = cur.d >= 9 ? 2 : cur.d + 1;
    resetTo(ldRun(ldStart(cur.N, d)).rows.length <= 6 ? { ...LD_FREE, N: cur.N, d } : freeDivision(d));
  };

  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (pay.src === "rung") { if (!moved || p.x < LD.FW + 8) onRung(pay.k); }
    else if (pay.src === "down") { if (!moved || p.y > LD.DY + 10) onDown(); }
  });

  /* Enter and choice taps go to the runtime: the answer is typed in the two boxes */
  api.onEnter(null);

  /* ── the win: the frame finishes itself from where it stands (the maths moving), then the check ── */
  useEffect(() => {
    if (stage !== "win") return;
    clearFx(); giveBack();
    const S: any[] = [];
    if (cur.kind === "blocks") {
      cur.bay.forEach((b: number[], k: number) => S.push([420, () => { actRef.current = k; setAct(k); put(ldRun(fsRef.current[k]), k); sfx.tick(); }]));
      S.push([400, () => setTotal(true)]);
    } else {
      const end = autoSteps(S, fsRef.current[actRef.current], 0.45, false, actRef.current);
      if (cur.check) checkSteps(S, end.N, end.d, ldQuot(end), end.left, 0.6);
    }
    tl.run(S);
  }, [stage]);

  /* ── the traceback: the division redrawn in steps, ending on the whole right answer; the child's
     answer stays in the slot, nothing is marked ── */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    tl.stop(); clearFx(); giveBack(); setTouched(true); setChk(null);
    const it = cur, S: any[] = [];
    if (it.kind === "blocks") {
      S.push([300, () => setTotal(false)]);
      it.bay.forEach((b: number[], k: number) => S.push([900, () => { actRef.current = k; setAct(k); put(ldRun(ldStart(b[0], b[1])), k); sfx.tick(); }]));
      S.push([700, () => setTotal(true)]);
    } else if (it.kind === "product") {
      S.push([300, () => put(ldOpen(it), 0)]);
      buildSteps(S, it.N, it.d, it.claim[0], it.claim[1], 1);
    } else {
      const f0 = ldOpen(it);
      if (it.check === "claim") {
        /* the claim multiplied back first: a whole place short of the dividend */
        S.push([300, () => put(f0, 0)]);
        checkSteps(S, it.N, it.d, it.claim[0], it.claim[1], 1);
        S.push([900, () => setChk(null)]);
      } else {
        if (it.check === "after") {
          /* the child's own answer multiplied back first, laid beside the dividend */
          const ps = slotPartsOf(wrong.value, 2).map((x: string) => (x === "" ? NaN : Number(x)));
          if (ps.every((x: number) => x >= 0 && x <= 9999)) { checkSteps(S, it.N, it.d, ps[0], ps[1], 1); S.push([900, () => setChk(null)]); }
        }
        S.push([420, () => put(f0, 0)]);
        if (n === 1) { S.push([900, () => setHead(0)]); S.push([150, () => setHead(null)]); }
      }
      const end = autoSteps(S, f0, 1.1, n === 3 || it.kind === "digit" || it.check === "claim", 0);
      if (it.check) checkSteps(S, it.N, it.d, ldQuot(end), end.left, 1);
    }
    tl.run(S, () => api.lock(false));
  }, [wrong]);

  /* what the host and the agent read back (toolApi.getState) */
  api.share({ dividend: f.N, divisor: f.d, frameStep: ldSteps(f), working: f.ph === "done" ? null : f.w,
    quotientDigits: f.q.map((x: any) => (x === null ? "" : String(x))).join(""), leftAtStep: f.left, zeroOffered: !!(why && why.zero), padToCell: cell && held ? cell.kind : null,
    checked: !!(chk && chk.n >= 3 && chk.d * chk.q + chk.r === chk.N) });

  /* ── drawing ── */
  const done = f.ph === "done";
  const L0 = ldLeft(D), bx = L0 + 104, right = L0 + 110 + D * LD.CW;
  const rowsShown = [...f.rows, ...(f.att ? [{ v: f.att.m, end: f.pos, mult: true, br: 0 }, ...(f.att.show >= 2 ? [{ v: f.att.r, end: f.pos, mult: false, br: 0 }] : [])] : [])];
  const working = f.ph === "divide" || f.ph === "left";
  const spanTop = f.rows.length ? ldRowTop(f.rows.length - 1) + 4 : 112;
  const spanFirst = f.pos - String(f.w).length + 1;
  const qShown = (j: number) => (f.att && j === f.pos ? f.att.k : f.q[j]);
  const quotComma = D === 4 && !!qShown(0);
  const placeName = LD_PLACES[D - 1 - f.pos];
  const qCell = cell && cell.kind === "quot" ? cell : null, lCell = cell && cell.kind === "left" ? cell : null;
  const lenW = String(f.w).length, lFirst = Math.max(0, f.pos - lenW + 1), lRow = f.rows.length + 1;
  /* the check card's numbers: before a run, what the frame (or the claim) holds */
  const cq = chk ? (chk.qs !== undefined ? chk.qs : chk.q) : ckQ, cr = chk ? chk.r : ckR;
  const prod = chk && chk.n >= 1 ? f.d * cq : null;
  const rebuilt = chk && chk.n >= 2 ? f.d * chk.q + chk.r : null;
  const match = !!(chk && chk.n >= 3 && rebuilt === f.N);
  const showCard = !!ckMode;
  const r1 = ldRungXY(1);
  const inv = stage !== "ask" || busy ? null
    : !touched && index === 0 && canRung && f.ph === "divide" && f.w >= f.d ? { x: r1.x + LD.RW / 2, y: r1.y + LD.RUH / 2, r: 50 }
      : canLeft && !(lCell && held) ? { x: (cx(lFirst) + cx(f.pos)) / 2, y: ldRowTop(lRow) + 25, r: Math.max(40, (cx(f.pos) - cx(lFirst)) / 2 + 40) }
      : canDown && downs === 0 ? { x: cx(f.pos + 1), y: 146, r: 34 }
        : canCheck && !ran ? { x: LD.MX + 170, y: 324, r: 84 }
          : null;
  const dragging = drag.drag && drag.drag.moved ? drag.drag : null;

  return (
    <g>
      <style>{LD_CSS}</style>

      {/* the running count: the places this division has finished, against its places */}
      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        <text x={20} y={-45} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("places")}</text>
        <text x={312} y={-40} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={C.ink}>{lang === "hi" ? `${D} में से ${ldSteps(f)}` : lang === "gu" ? `${D} માંથી ${ldSteps(f)}` : `${ldSteps(f)} of ${D}`}</text>
      </g>

      {/* ── the frame ── */}
      {f.g.map((_: number, j: number) => (
        <g key={"h" + j}>
          <rect x={cx(j) - 29} y={2} width={58} height={36} rx={10} fill={tint(C.panel, 0.3)} stroke={head === j ? C.ink : C.rule} strokeWidth={head === j ? 4 : 1.5} />
          <text x={cx(j)} y={31} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(LD_HEAD[D - 1 - j])}</text>
        </g>
      ))}
      {f.g.map((_: number, j: number) => {
        const typing = qCell && j === f.pos, v = typing ? (qCell.text === "" ? null : Number(qCell.text)) : qShown(j);
        return (
          <g key={"q" + j}>
            <rect x={cx(j) - 28} y={46} width={56} height={54} rx={10} fill="#FFFFFF" stroke={typing && held ? C.accent : tint(C.rule, 0.15)} strokeWidth={typing && held ? 3 : 1.5} strokeDasharray={v === null && !typing ? "6 6" : undefined} />
            {v !== null && <text x={cx(j)} y={LD.QY} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={typing ? C.ink : v === 0 ? LD_ZERO : LD_INK.quot}>{v}</text>}
            {typing && held && <rect className="c4-caret" x={cx(j) + (v === null ? -2 : 19)} y={54} width={4} height={38} rx={2} fill={C.accent} />}
          </g>
        );
      })}
      {quotComma && <LdComma x={cx(0) + LD.CW / 2} y={LD.QY - 8} color={C.ink} />}
      {/* the lid over the quotient cell of the step in hand */}
      {f.ph === "divide" && !f.att && (
        <g className="ld-lid" style={{ transform: lid || qCell ? "scaleY(0.12)" : "none" } as any} pointerEvents="none">
          <rect x={cx(f.pos) - 30} y={44} width={60} height={58} rx={12} fill="url(#gPanel)" stroke={shade(C.rule, 0.3)} strokeWidth={2} />
          <circle cx={cx(f.pos) - 18} cy={51} r={4} fill={shade(C.rule, 0.45)} />
          <circle cx={cx(f.pos) + 18} cy={51} r={4} fill={shade(C.rule, 0.45)} />
          <circle cx={cx(f.pos)} cy={88} r={5} fill={shade(C.rule, 0.35)} />
        </g>
      )}
      {canQuot && <LdCell id="lid" x={cx(f.pos) - 36} y={34} w={72} h={72} label={"Write the quotient digit for the " + placeName} onPress={onQuotCell} held={held && !!qCell} />}

      {/* the bracket, the divisor at its left, the dividend under it */}
      <path d={`M ${bx} ${LD.BR} H ${right}`} stroke={C.ink} strokeWidth={4} strokeLinecap="round" fill="none" />
      <path d={`M ${bx} ${LD.BR} C ${bx + 16} ${LD.BR + 20} ${bx + 16} ${LD.BR + 46} ${bx} ${LD.BR + 64}`} stroke={C.ink} strokeWidth={4} strokeLinecap="round" fill="none" />
      <text x={L0 + 54} y={LD.DY} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={LD_INK.divisor}>{f.d}</text>
      {working && !f.rows.length && (
        <rect x={cx(spanFirst) - 30} y={spanTop} width={cx(f.pos) - cx(spanFirst) + 60} height={56} rx={12} fill={tint(CONTENT.hundred, 0.86)} />
      )}
      {f.g.map((v: number, j: number) => (
        <text key={"g" + j} x={cx(j)} y={LD.DY} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={LD_INK.dividend}>{v}</text>
      ))}
      {D === 4 && <LdComma x={cx(0) + LD.CW / 2} y={LD.DY - 6} color={C.ink} />}

      {/* the steps under the dividend: each multiple taken away, what is left, the digits brought down */}
      {working && f.rows.length > 0 && (
        <rect x={cx(spanFirst) - 30} y={spanTop} width={cx(f.pos) - cx(spanFirst) + 60} height={44} rx={10} fill={tint(CONTENT.hundred, 0.86)} />
      )}
      {rowsShown.map((r: any, k: number) => {
        const s = String(r.v), top = ldRowTop(k), first = r.end - s.length + 1;
        return (
          <g key={"r" + k}>
            {s.split("").map((ch, i) => (
              <text key={i} x={cx(first + i)} y={top + 40} textAnchor="middle" fontSize={T.speech} fontWeight={700}
                fill={r.mult ? LD_INK.mult : i >= s.length - r.br ? LD_INK.dividend : LD_INK.left}>{ch}</text>
            ))}
            {r.mult && <text x={cx(first) - 40} y={top + 38} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>−</text>}
            {r.mult && <path d={`M ${cx(first) - 56} ${top + 48} H ${cx(r.end) + 28}`} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />}
          </g>
        );
      })}

      {/* what is left: the child taps the cell under the line and types it; the next digit waits for it */}
      {f.ph === "left" && f.att && f.att.show === 1 && (
        <g>
          <rect x={cx(lFirst) - 30} y={ldRowTop(lRow) + 3} width={cx(f.pos) - cx(lFirst) + 66} height={44} rx={10} fill="#FFFFFF"
            stroke={lCell && held ? C.accent : shade(C.rule, 0.2)} strokeWidth={lCell && held ? 3 : 2} strokeDasharray={lCell && held ? undefined : "7 6"} />
          {lCell && lCell.text.split("").map((ch: string, i: number) => (
            <text key={i} x={cx(f.pos - (lCell.text.length - 1 - i))} y={ldRowTop(lRow) + 40} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{ch}</text>
          ))}
          {lCell && held && <rect className="c4-caret" x={cx(f.pos) + 24} y={ldRowTop(lRow) + 8} width={4} height={34} rx={2} fill={C.accent} />}
          {canLeft && <LdCell id="left-cell" x={cx(lFirst) - 36} y={ldRowTop(lRow) - 11} w={cx(f.pos) - cx(lFirst) + 72} h={72} label={tx("Write what is left")} onPress={onLeftCell} held={held && !!lCell} />}
        </g>
      )}

      {/* bring down: the next digit, unlit until the step before it is settled */}
      {f.pos < D - 1 && !done && (() => {
        const x = cx(f.pos + 1), yb = f.rows.length ? ldRowTop(f.rows.length - 1) + 8 : LD.DY + 40;
        return (
          <g>
            <path d={`M ${x} ${LD.DY + 14} V ${yb - 6}`} stroke={canDown ? C.ink : tint(C.rule, 0.1)} strokeWidth={canDown ? 4 : 2.5}
              strokeDasharray={canDown ? undefined : "6 7"} strokeLinecap="round" fill="none" />
            <path d={`M ${x - 9} ${yb - 14} L ${x} ${yb - 2} L ${x + 9} ${yb - 14}`} stroke={canDown ? C.ink : tint(C.rule, 0.1)} strokeWidth={canDown ? 4 : 2.5}
              strokeLinecap="round" strokeLinejoin="round" fill="none" />
            {canDown && (
              <g className="ld-grab c4-piece" {...control("bring-down", "Bring the " + f.g[f.pos + 1] + " down")} {...drag.bind({ src: "down" })} {...drag.keys({ src: "down" })}>
                <rect x={x - 36} y={110} width={72} height={76} fill="transparent" />
              </g>
            )}
          </g>
        );
      })()}
      {fly && (
        <g className="ld-move" style={{ transform: `translate(${fly.x}px, ${fly.y}px)` } as any} pointerEvents="none">
          <text x={0} y={0} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={LD_INK.dividend}>{fly.v}</text>
        </g>
      )}

      {/* ── the middle column: what is being divided, what is left ── */}
      <LdBox C={C} x={LD.MX} y={0} w={LD.MW} h={96} label={tx(done ? "quotient" : "dividing")}
        parts={done ? [{ t: indian(ldQuot(f)), fill: LD_INK.quot }] : [{ t: named(f.w, D, f.pos) + " ", fill: LD_INK.dividend }, { t: "÷ " + f.d, fill: LD_INK.divisor }]}
        aside={why && why.box === "win" ? why.text : null} />
      <LdBox C={C} x={LD.MX} y={108} w={LD.MW} h={96} label={tx(done ? "remainder" : "left over")}
        parts={conv !== null ? [{ t: named(conv, D, f.pos + 1), fill: LD_INK.left }]
          : f.att && f.att.show >= 2 ? [{ t: named(f.att.r, D, f.pos), fill: LD_INK.left }]
            : f.ph === "down" ? [{ t: named(f.left, D, f.pos), fill: LD_INK.left }]
              : done ? [{ t: indian(f.left), fill: LD_INK.left }] : null}
        aside={why && why.box === "left" ? why.text : null} />

      {/* the check card: divisor × quotient, add the remainder, laid over the dividend */}
      {showCard && (
        <g style={{ fontVariantNumeric: "tabular-nums" } as any}>
          <rect x={LD.MX} y={218} width={LD.MW} height={212} rx={18} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
          <text x={LD.MX + 16} y={262} fontSize={T.label} fontWeight={700} fill={C.ink}>{`${f.d} × ${cq === null ? "?" : indian(cq)}`}</text>
          {prod !== null
            ? <text x={LD.MX + 324} y={262} textAnchor="end" fontSize={T.label} fontWeight={700} fill={LD_INK.mult}>{indian(prod)}</text>
            : ckMode === "product" && <text x={LD.MX + 324} y={262} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>?</text>}
          <text x={LD.MX + 324} y={306} textAnchor="end" fontSize={T.label} fontWeight={700}>
            <tspan fill={C.ink}>+ </tspan><tspan fill={LD_INK.left}>{cr === null ? "?" : String(cr)}</tspan>
          </text>
          <path d={`M ${LD.MX + 176} 322 H ${LD.MX + 326}`} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
          <text x={LD.MX + 16} y={360} fontSize={T.micro} fontWeight={500} fill={shade(C.dim, 0.45)}>{tx("rebuilt")}</text>
          {rebuilt !== null && <text x={LD.MX + 324} y={362} textAnchor="end" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{indian(rebuilt)}</text>}
          <text x={LD.MX + 16} y={408} fontSize={T.micro} fontWeight={500} fill={shade(C.dim, 0.45)}>{tx("dividend")}</text>
          <text x={LD.MX + 324} y={410} textAnchor="end" fontSize={T.prompt} fontWeight={700} fill={LD_INK.dividend}>{indian(f.N)}</text>
          {match && <rect x={LD.MX + 168} y={326} width={164} height={96} rx={14} fill="none" stroke={C.ink} strokeWidth={4} />}
          {canCheck && <Hit id="check" x={LD.MX} y={218} w={LD.MW} h={212} label={tx("Multiply back")} onPress={onCheck} />}
        </g>
      )}

      {/* the block of seats: three rows, each a division; the total adds their quotients */}
      {kind === "blocks" && cur.bay.map((b: number[], k: number) => {
        const y = 218 + k * 84, fk = fs[k], dq = fk && fk.ph === "done" ? ldQuot(fk) : null;
        return (
          <g key={"b" + k}>
            <rect x={LD.MX} y={y} width={LD.MW} height={76} rx={16} fill="#FFFFFF" stroke={k === act ? C.ink : C.rule} strokeWidth={k === act ? 4 : 2} />
            <text x={LD.MX + 18} y={y + 49} fontSize={T.label} fontWeight={700} fill={C.ink}>{"ABC"[k]}</text>
            <text x={LD.MX + 58} y={y + 49} fontSize={T.label} fontWeight={700}>
              <tspan fill={LD_INK.dividend}>{String(b[0])}</tspan><tspan fill={LD_INK.divisor}>{" ÷ " + b[1]}</tspan>
            </text>
            <rect x={LD.MX + 232} y={y + 12} width={94} height={52} rx={10} fill={tint(C.panel, 0.45)} stroke={C.rule} strokeWidth={1.5} strokeDasharray={dq === null ? "6 6" : undefined} />
            {dq !== null && <text x={LD.MX + 279} y={y + 49} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={LD_INK.quot}>{dq}</text>}
            {open && k !== act && <Hit id={"row-" + "abc"[k]} x={LD.MX} y={y} w={LD.MW} h={76} label={`Row ${"ABC"[k]}: ${b[0]} divided by ${b[1]}`} onPress={() => onRow(k)} />}
          </g>
        );
      })}
      {kind === "blocks" && (
        <g>
          <path d={`M ${LD.MX} 474 H ${LD.MX + LD.MW}`} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
          <text x={LD.MX + 18} y={512} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("total")}</text>
          <text x={LD.MX + 326} y={514} textAnchor="end" fontSize={T.prompt} fontWeight={700} fill={C.ink}>
            {total ? indian(fs.reduce((a: number, g: any) => a + ldQuot(g), 0)) : "?"}
          </text>
        </g>
      )}

      {/* free play: a new dividend, or the next divisor */}
      {free && (
        <g>
          <Key id="free-new" label={tx("A new number")} x={LD.MX} y={446} w={196} h={72} C={C} disabled={busy} onClick={onNew}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("New")}</text>
          </Key>
          <Key id="free-divisor" label={tx("The next divisor")} x={LD.MX + 212} y={446} w={128} h={72} C={C} disabled={busy} onClick={onDivisor}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{"÷ " + f.d}</text>
          </Key>
        </g>
      )}

      {/* ── the strip: the divisor times 1 to 9; the biggest one that fits goes onto the frame ── */}
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((k) => {
        const p = ldRungXY(k), on = lit.includes(k), pay = { src: "rung", k };
        return (
          <g key={"k" + k} className={canRung ? "ld-grab c4-piece" : undefined}
            {...(canRung ? { ...control("rung-" + k, `${f.d} times ${k}`), ...drag.bind(pay), ...drag.keys(pay) } : {})}>
            <rect x={p.x} y={p.y} width={LD.RW} height={LD.RUH} rx={14} fill={on ? tint(CONTENT.bead, 0.72) : "#FFFFFF"}
              stroke={on ? C.ink : tint(CONTENT.bead, 0.35)} strokeWidth={on ? 4 : 2} />
            <text x={p.x + LD.RW / 2} y={p.y + 34} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{`${f.d} × ${k}`}</text>
            <text x={p.x + LD.RW / 2} y={p.y + 79} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={LD_INK.mult}>{f.d * k}</text>
          </g>
        );
      })}

      {/* what the finger holds */}
      {dragging && dragging.payload.src === "rung" && (
        <g pointerEvents="none" filter="url(#fLift)">
          <rect x={dragging.x - LD.RW / 2} y={dragging.y - LD.RUH / 2} width={LD.RW} height={LD.RUH} rx={14} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} />
          <text x={dragging.x} y={dragging.y - 13} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{`${f.d} × ${dragging.payload.k}`}</text>
          <text x={dragging.x} y={dragging.y + 32} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={LD_INK.mult}>{f.d * dragging.payload.k}</text>
        </g>
      )}
      {dragging && dragging.payload.src === "down" && f.pos < D - 1 && (
        <text x={dragging.x} y={dragging.y + 16} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={LD_INK.dividend} pointerEvents="none">{f.g[f.pos + 1]}</text>
      )}

      {inv && <Invite x={inv.x} y={inv.y} r={inv.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   the division and its quotient and remainder (a zero holding a place in grey) */
function Thumb({ result, C, w, h, tx = (v: any) => v }: any) {
  const L = (result && result.last) || {};
  const sh = L.shared || {};
  if (L.value === null || L.value === undefined) return null;
  let top = "", bottom: any[] = [];
  if (L.kind === "divide") {
    const ps = slotPartsOf(L.value, 2);
    top = `${indian(sh.dividend)} ÷ ${sh.divisor}`;
    bottom = [{ t: indian(Number(ps[0])), fill: LD_INK.quot }, { t: "  " + tx("R") + " " + ps[1], fill: LD_INK.left }];
  } else if (L.kind === "digit") {
    top = `${indian(sh.dividend)} ÷ ${sh.divisor}`;
    bottom = String(Math.floor(sh.dividend / sh.divisor)).split("").map((ch) => ({ t: ch, fill: ch === "0" ? LD_ZERO : LD_INK.quot }));
  } else if (L.kind === "product") {
    top = `${sh.divisor} × ${sh.quotientDigits}`;
    bottom = [{ t: indian(leadNumber(L.value) || 0), fill: LD_INK.mult }];
  } else {
    top = tx("rows A, B and C");
    bottom = [{ t: indian(leadNumber(L.value) || 0), fill: C.ink }];
  }
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <text x={16} y={Math.round(h * 0.42)} fontSize={T.micro} fontWeight={600} fill={C.ink}>{top}</text>
      <text x={w - 16} y={h - 12} textAnchor="end" fontSize={T.label} fontWeight={700}>
        {bottom.map((p: any, i: number) => <tspan key={i} fill={p.fill}>{p.t}</tspan>)}
      </text>
    </g>
  );
}

function LongDivisionFrame(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null }} />
  );
}

export default LongDivisionFrame;
