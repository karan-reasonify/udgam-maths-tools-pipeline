/* ═══ M1.S1.T2.C4.2D1 · product_mat · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "product_mat";
const MEDIA_ID = "M1.S1.T2.C4.2D1";
const TOOL_NAME = "Product Mat";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A long number, and one digit beneath its ones column. Work the columns from the right."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every column took the multiplier in turn, and every ring emptied into the column it was waiting over.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Any long number, any single digit, with the rings and the doubling mat as you like.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r13+: `lineFor(line, lang, TR)`); the
   English above and below stays what the checks read. NCERT class 4 terms: गुण्य गुणक गुणनफल /
   ગુણ્ય ગુણક ગુણાકાર, हासिल / વદી for a carry. Digits stay digits: the runtime speaks them in the
   language in use. A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Product Mat": "गुणनफल चटाई",
    "A long number, and one digit beneath its ones column. Work the columns from the right.": "एक लंबी संख्या, और उसके इकाई स्तंभ के नीचे एक अंक। स्तंभों को दाईं ओर से हल करो।",
    "Every column took the multiplier in turn, and every ring emptied into the column it was waiting over.": "हर स्तंभ ने बारी-बारी से गुणक लिया, और हर गोले का अंक अपने नीचे के स्तंभ में मिल गया।",
    "Free play. Any long number, any single digit, with the rings and the doubling mat as you like.": "मुक्त खेल। कोई भी लंबी संख्या, कोई भी एक अंक, गोले और दुगुना करने की चटाई, जैसे चाहो।",
    "Every multiplication has three names": "हर गुणा के तीन नाम होते हैं",
    "Point at the number being multiplied. Now the one it is multiplied by. Now say what the answer is called.": "जिस संख्या का गुणा हो रहा है, उस पर उँगली रखो। अब जिससे गुणा हो रहा है। अब बताओ उत्तर को क्या कहते हैं।",
    "What is the row under the rule called?": "रेखा के नीचे वाली पंक्ति को क्या कहते हैं?",
    "Read the rows from the top: the number, what it is multiplied by, and the answer.": "पंक्तियाँ ऊपर से पढ़ो: संख्या, जिससे गुणा हो रहा है, और उत्तर।",
    "The multiplicand lies across the mat, the multiplier sits under its ones column, and the product stands under the rule.": "गुण्य चटाई पर फैला है, गुणक उसके इकाई स्तंभ के नीचे है, और गुणनफल रेखा के नीचे है।",
    "You learned: the multiplicand, the multiplier and the product.": "तुमने सीखा: गुण्य, गुणक और गुणनफल।",
    "Name the three rows": "तीनों पंक्तियों के नाम बताओ",
    "The mat shows 4,127 with 6 under its ones column. Lay a name plate on each row, then press Enter.": "चटाई पर 4,127 है, और इकाई स्तंभ के नीचे 6 है। हर पंक्ति पर नाम-पट्टी रखो, फिर एंटर दबाओ।",
    "Which of the two numbers is the one being multiplied?": "दोनों संख्याओं में से किसका गुणा हो रहा है?",
    "What is 5,213 called?": "5,213 को क्या कहते हैं?",
    "Now the mat shows 5,213 with 4 under its ones column. Which plate belongs on 5,213?": "अब चटाई पर 5,213 है, और इकाई स्तंभ के नीचे 4 है। 5,213 पर कौन सी पट्टी आएगी?",
    "Is 5,213 being multiplied, or is it doing the multiplying?": "क्या 5,213 का गुणा हो रहा है, या यह गुणा कर रहा है?",
    "What is 14,608 called?": "14,608 को क्या कहते हैं?",
    "Here 7,304 × 2 = 14,608 is worked on the mat. Which plate belongs on 14,608?": "यहाँ चटाई पर 7,304 × 2 = 14,608 हल किया गया है। 14,608 पर कौन सी पट्टी आएगी?",
    "Which number was multiplied to make 14,608?": "14,608 बनाने के लिए किस संख्या का गुणा हुआ?",
    "One digit multiplies every column in turn": "एक अंक बारी-बारी से हर स्तंभ से गुणा करता है",
    "Start at the ones. How many times will you use the multiplier before the mat is full?": "इकाई से शुरू करो। चटाई भरने तक तुम गुणक को कितनी बार लगाओगे?",
    "Which column is worked before any other?": "सबसे पहले कौन सा स्तंभ हल होता है?",
    "Take one column at a time. Multiply its digit by the multiplier and write what it makes.": "एक बार में एक स्तंभ लो। उसके अंक को गुणक से गुणा करो और जो बने वह लिखो।",
    "A one digit multiplier is used once on every column of the multiplicand, beginning at the ones.": "एक अंक का गुणक गुण्य के हर स्तंभ पर एक बार लगता है, इकाई से शुरू करके।",
    "You learned: one digit multiplies every column, starting at the ones.": "तुमने सीखा: एक अंक हर स्तंभ से गुणा करता है, इकाई से शुरू करके।",
    "Multiply 3,122 by 3": "3,122 को 3 से गुणा करो",
    "Multiply 3,122 by 3, one column at a time. Count how many times the multiplier is used.": "3,122 को 3 से गुणा करो, एक बार में एक स्तंभ। गिनो कि गुणक कितनी बार लगा।",
    "How many columns does the multiplicand fill?": "गुण्य कितने स्तंभ भरता है?",
    "Multiply 4,321 by 2": "4,321 को 2 से गुणा करो",
    "Multiply 4,321 by 2, working from the right.": "4,321 को 2 से गुणा करो, दाईं ओर से।",
    "Did the 2 multiply the tens, the hundreds and the thousands too?": "क्या 2 ने दहाई, सैकड़े और हज़ार से भी गुणा किया?",
    "Multiply 12,032 by 3": "12,032 को 3 से गुणा करो",
    "Multiply 12,032 by 3. How many columns does the multiplier visit this time?": "12,032 को 3 से गुणा करो। इस बार गुणक कितने स्तंभों पर जाएगा?",
    "Did the 3 visit every column, the zeros too?": "क्या 3 हर स्तंभ पर गया, शून्य वाले पर भी?",
    "The carried digit is added, not multiplied": "हासिल का अंक जोड़ा जाता है, गुणा नहीं किया जाता",
    "Multiply this column first. Only then add the digit waiting in the ring above it.": "पहले इस स्तंभ का गुणा करो। उसके बाद ही ऊपर गोले में रुका अंक जोड़ो।",
    "What is added to that product, and at what point?": "उस गुणनफल में क्या जोड़ा जाता है, और कब?",
    "Multiply the column's own digit first. Then add the digit in its ring.": "पहले स्तंभ के अपने अंक का गुणा करो। फिर उसके गोले का अंक जोड़ो।",
    "Multiply the column first and add the carried digit afterwards, never the other way round.": "पहले स्तंभ का गुणा करो और बाद में हासिल जोड़ो, कभी उल्टा नहीं।",
    "You learned: multiply the column first, then add the carried digit.": "तुमने सीखा: पहले स्तंभ का गुणा करो, फिर हासिल जोड़ो।",
    "Multiply 2,764 by 5": "2,764 को 5 से गुणा करो",
    "Multiply 2,764 by 5. The ones are done, and 2 waits in the ring above the tens. What happens in the tens?": "2,764 को 5 से गुणा करो। इकाई हो गई, और दहाई के ऊपर गोले में 2 रुका है। दहाई में क्या होगा?",
    "What does the column's own digit come to when the multiplier takes it?": "गुणक से गुणा करने पर स्तंभ का अपना अंक कितना बनता है?",
    "Multiply 3,856 by 7": "3,856 को 7 से गुणा करो",
    "Multiply 3,856 by 7. Every column carries this time.": "3,856 को 7 से गुणा करो। इस बार हर स्तंभ में हासिल आएगा।",
    "In the tens, what is 5 × 7 before the waiting digit joins it?": "दहाई में, रुका अंक मिलने से पहले 5 × 7 कितना है?",
    "What stays in the tens?": "दहाई में क्या रहता है?",
    "A tens column holds 8, the multiplier is 6 and 3 is waiting in the ring above it. What stays in the column?": "दहाई के स्तंभ में 8 है, गुणक 6 है और ऊपर गोले में 3 रुका है। स्तंभ में क्या रहेगा?",
    "Only a single digit can stay in the tens. Which digit stays, and which goes up to the ring?": "दहाई में सिर्फ़ एक अंक रह सकता है। कौन सा अंक रहेगा, और कौन सा गोले में जाएगा?",
    "Doubling is multiplying by two": "दुगुना करना दो से गुणा करना है",
    "Add it to itself on one side. Multiply it by two on the other. Are the two answers different?": "एक तरफ़ इसे खुद में जोड़ो। दूसरी तरफ़ इसे दो से गुणा करो। क्या दोनों उत्तर अलग हैं?",
    "What must the last digit of a doubled number be?": "दुगुनी संख्या का आखिरी अंक कैसा होना चाहिए?",
    "Add the ones digit to itself first, then move one column left.": "पहले इकाई के अंक को खुद में जोड़ो, फिर एक स्तंभ बाईं ओर जाओ।",
    "Doubling is multiplying by two, and every doubled number ends in an even digit.": "दुगुना करना दो से गुणा करना है, और हर दुगुनी संख्या का आखिरी अंक सम होता है।",
    "You learned: doubling is multiplying by two; the last digit is even.": "तुमने सीखा: दुगुना करना दो से गुणा करना है; आखिरी अंक सम होता है।",
    "Double 3,416": "3,416 का दुगुना",
    "What is double 3,416, and what does its last digit tell you?": "3,416 का दुगुना क्या है, और उसका आखिरी अंक तुम्हें क्या बताता है?",
    "How big should double 3,416 be?": "3,416 का दुगुना कितना बड़ा होना चाहिए?",
    "Double 214 × 3": "214 × 3 का दुगुना",
    "What is double the product of 214 and 3? Multiply first, then double.": "214 और 3 के गुणनफल का दुगुना क्या है? पहले गुणा करो, फिर दुगुना करो।",
    "What does 214 × 3 make before it is doubled?": "दुगुना करने से पहले 214 × 3 कितना बनता है?",
    "Double 1,275 m": "1,275 मीटर का दुगुना",
    "A weaver made 1,275 m of cloth in one month. The next month she made double that length. How much was that?": "एक बुनकर ने एक महीने में 1,275 मीटर कपड़ा बनाया। अगले महीने उसने उसका दुगुना बनाया। वह कितना था?",
    "What do 5 and 5 in the ones make together?": "इकाई में 5 और 5 मिलकर कितने बनते हैं?",
    "Every row needs a plate first.": "पहले हर पंक्ति पर एक पट्टी चाहिए।",
    "Lay a plate on the glowing row first.": "पहले चमकती पंक्ति पर एक पट्टी रखो।",
    /* the working area's own words */
    "multiplicand": "गुण्य", "multiplier": "गुणक", "product": "गुणनफल",
    "O": "इ", "T": "द", "H": "सै", "Th": "ह", "TTh": "द.ह", "L": "ला",
    "even": "सम", "odd": "विषम", "m": "मी",
    "Double": "दुगुना", "Clear": "मिटाओ",
    "Open the doubling mat": "दुगुना करने की चटाई खोलो", "Close the doubling mat": "दुगुना करने की चटाई बंद करो",
    "Clear the product row": "गुणनफल की पंक्ति मिटाओ",
  },
  gu: {
    "Product Mat": "ગુણાકાર સાદડી",
    "A long number, and one digit beneath its ones column. Work the columns from the right.": "એક લાંબી સંખ્યા, અને તેના એકમ સ્તંભ નીચે એક અંક. સ્તંભોને જમણી બાજુથી ઉકેલો.",
    "Every column took the multiplier in turn, and every ring emptied into the column it was waiting over.": "દરેક સ્તંભે વારાફરતી ગુણક લીધો, અને દરેક વર્તુળનો અંક તેની નીચેના સ્તંભમાં ભળી ગયો.",
    "Free play. Any long number, any single digit, with the rings and the doubling mat as you like.": "મુક્ત રમત. કોઈ પણ લાંબી સંખ્યા, કોઈ પણ એક અંક, વર્તુળો અને બમણું કરવાની સાદડી, જેમ ગમે તેમ.",
    "Every multiplication has three names": "દરેક ગુણાકારનાં ત્રણ નામ હોય છે",
    "Point at the number being multiplied. Now the one it is multiplied by. Now say what the answer is called.": "જે સંખ્યાનો ગુણાકાર થાય છે તેના પર આંગળી મૂકો. હવે જેનાથી ગુણાય છે તેના પર. હવે કહો જવાબને શું કહેવાય.",
    "What is the row under the rule called?": "રેખા નીચેની હારને શું કહેવાય?",
    "Read the rows from the top: the number, what it is multiplied by, and the answer.": "હારો ઉપરથી વાંચો: સંખ્યા, જેનાથી ગુણાય છે તે, અને જવાબ.",
    "The multiplicand lies across the mat, the multiplier sits under its ones column, and the product stands under the rule.": "ગુણ્ય સાદડી પર ફેલાયેલો છે, ગુણક તેના એકમ સ્તંભ નીચે છે, અને ગુણાકાર રેખા નીચે છે.",
    "You learned: the multiplicand, the multiplier and the product.": "તમે શીખ્યા: ગુણ્ય, ગુણક અને ગુણાકાર.",
    "Name the three rows": "ત્રણેય હારનાં નામ આપો",
    "The mat shows 4,127 with 6 under its ones column. Lay a name plate on each row, then press Enter.": "સાદડી પર 4,127 છે, અને એકમ સ્તંભ નીચે 6 છે. દરેક હાર પર નામની પટ્ટી મૂકો, પછી એન્ટર દબાવો.",
    "Which of the two numbers is the one being multiplied?": "બે સંખ્યામાંથી કોનો ગુણાકાર થાય છે?",
    "What is 5,213 called?": "5,213 ને શું કહેવાય?",
    "Now the mat shows 5,213 with 4 under its ones column. Which plate belongs on 5,213?": "હવે સાદડી પર 5,213 છે, અને એકમ સ્તંભ નીચે 4 છે. 5,213 પર કઈ પટ્ટી આવશે?",
    "Is 5,213 being multiplied, or is it doing the multiplying?": "5,213 નો ગુણાકાર થાય છે, કે તે ગુણાકાર કરે છે?",
    "What is 14,608 called?": "14,608 ને શું કહેવાય?",
    "Here 7,304 × 2 = 14,608 is worked on the mat. Which plate belongs on 14,608?": "અહીં સાદડી પર 7,304 × 2 = 14,608 ગણેલું છે. 14,608 પર કઈ પટ્ટી આવશે?",
    "Which number was multiplied to make 14,608?": "14,608 બનાવવા કઈ સંખ્યાનો ગુણાકાર થયો?",
    "One digit multiplies every column in turn": "એક અંક વારાફરતી દરેક સ્તંભનો ગુણાકાર કરે છે",
    "Start at the ones. How many times will you use the multiplier before the mat is full?": "એકમથી શરૂ કરો. સાદડી ભરાય ત્યાં સુધી તમે ગુણક કેટલી વાર વાપરશો?",
    "Which column is worked before any other?": "સૌથી પહેલાં કયો સ્તંભ ઉકેલાય છે?",
    "Take one column at a time. Multiply its digit by the multiplier and write what it makes.": "એક વખતે એક સ્તંભ લો. તેના અંકને ગુણકથી ગુણો અને જે બને તે લખો.",
    "A one digit multiplier is used once on every column of the multiplicand, beginning at the ones.": "એક અંકનો ગુણક ગુણ્યના દરેક સ્તંભ પર એક વાર વપરાય છે, એકમથી શરૂ કરીને.",
    "You learned: one digit multiplies every column, starting at the ones.": "તમે શીખ્યા: એક અંક દરેક સ્તંભનો ગુણાકાર કરે છે, એકમથી શરૂ કરીને.",
    "Multiply 3,122 by 3": "3,122 નો 3 સાથે ગુણાકાર કરો",
    "Multiply 3,122 by 3, one column at a time. Count how many times the multiplier is used.": "3,122 નો 3 સાથે ગુણાકાર કરો, એક વખતે એક સ્તંભ. ગણો કે ગુણક કેટલી વાર વપરાયો.",
    "How many columns does the multiplicand fill?": "ગુણ્ય કેટલા સ્તંભ ભરે છે?",
    "Multiply 4,321 by 2": "4,321 નો 2 સાથે ગુણાકાર કરો",
    "Multiply 4,321 by 2, working from the right.": "4,321 નો 2 સાથે ગુણાકાર કરો, જમણી બાજુથી.",
    "Did the 2 multiply the tens, the hundreds and the thousands too?": "શું 2 એ દશક, શતક અને હજારનો પણ ગુણાકાર કર્યો?",
    "Multiply 12,032 by 3": "12,032 નો 3 સાથે ગુણાકાર કરો",
    "Multiply 12,032 by 3. How many columns does the multiplier visit this time?": "12,032 નો 3 સાથે ગુણાકાર કરો. આ વખતે ગુણક કેટલા સ્તંભ પર જશે?",
    "Did the 3 visit every column, the zeros too?": "શું 3 દરેક સ્તંભ પર ગયો, શૂન્ય પર પણ?",
    "The carried digit is added, not multiplied": "વદીનો અંક ઉમેરાય છે, ગુણાતો નથી",
    "Multiply this column first. Only then add the digit waiting in the ring above it.": "પહેલાં આ સ્તંભનો ગુણાકાર કરો. પછી જ ઉપરના વર્તુળમાં રાહ જોતો અંક ઉમેરો.",
    "What is added to that product, and at what point?": "તે ગુણાકારમાં શું ઉમેરાય છે, અને ક્યારે?",
    "Multiply the column's own digit first. Then add the digit in its ring.": "પહેલાં સ્તંભના પોતાના અંકનો ગુણાકાર કરો. પછી તેના વર્તુળનો અંક ઉમેરો.",
    "Multiply the column first and add the carried digit afterwards, never the other way round.": "પહેલાં સ્તંભનો ગુણાકાર કરો અને પછી વદી ઉમેરો, ક્યારેય ઊલટું નહીં.",
    "You learned: multiply the column first, then add the carried digit.": "તમે શીખ્યા: પહેલાં સ્તંભનો ગુણાકાર કરો, પછી વદી ઉમેરો.",
    "Multiply 2,764 by 5": "2,764 નો 5 સાથે ગુણાકાર કરો",
    "Multiply 2,764 by 5. The ones are done, and 2 waits in the ring above the tens. What happens in the tens?": "2,764 નો 5 સાથે ગુણાકાર કરો. એકમ થઈ ગયા, અને દશક ઉપર વર્તુળમાં 2 રાહ જુએ છે. દશકમાં શું થશે?",
    "What does the column's own digit come to when the multiplier takes it?": "ગુણકથી ગુણતાં સ્તંભનો પોતાનો અંક કેટલો થાય?",
    "Multiply 3,856 by 7": "3,856 નો 7 સાથે ગુણાકાર કરો",
    "Multiply 3,856 by 7. Every column carries this time.": "3,856 નો 7 સાથે ગુણાકાર કરો. આ વખતે દરેક સ્તંભમાં વદી આવશે.",
    "In the tens, what is 5 × 7 before the waiting digit joins it?": "દશકમાં, રાહ જોતો અંક મળે તે પહેલાં 5 × 7 કેટલા?",
    "What stays in the tens?": "દશકમાં શું રહે છે?",
    "A tens column holds 8, the multiplier is 6 and 3 is waiting in the ring above it. What stays in the column?": "દશકના સ્તંભમાં 8 છે, ગુણક 6 છે અને ઉપર વર્તુળમાં 3 રાહ જુએ છે. સ્તંભમાં શું રહેશે?",
    "Only a single digit can stay in the tens. Which digit stays, and which goes up to the ring?": "દશકમાં ફક્ત એક જ અંક રહી શકે. કયો અંક રહેશે, અને કયો વર્તુળમાં જશે?",
    "Doubling is multiplying by two": "બમણું કરવું એટલે બે વડે ગુણાકાર કરવો",
    "Add it to itself on one side. Multiply it by two on the other. Are the two answers different?": "એક બાજુ તેને પોતાનામાં ઉમેરો. બીજી બાજુ તેને બે વડે ગુણો. શું બંને જવાબ જુદા છે?",
    "What must the last digit of a doubled number be?": "બમણી કરેલી સંખ્યાનો છેલ્લો અંક કેવો હોવો જોઈએ?",
    "Add the ones digit to itself first, then move one column left.": "પહેલાં એકમના અંકને પોતાનામાં ઉમેરો, પછી એક સ્તંભ ડાબી બાજુ જાઓ.",
    "Doubling is multiplying by two, and every doubled number ends in an even digit.": "બમણું કરવું એટલે બે વડે ગુણવું, અને દરેક બમણી સંખ્યાનો છેલ્લો અંક બેકી હોય છે.",
    "You learned: doubling is multiplying by two; the last digit is even.": "તમે શીખ્યા: બમણું એટલે બે વડે ગુણવું; છેલ્લો અંક બેકી હોય છે.",
    "Double 3,416": "3,416 નું બમણું",
    "What is double 3,416, and what does its last digit tell you?": "3,416 નું બમણું કેટલું, અને છેલ્લો અંક શું કહે છે?",
    "How big should double 3,416 be?": "3,416 નું બમણું કેટલું મોટું હોવું જોઈએ?",
    "Double 214 × 3": "214 × 3 નું બમણું",
    "What is double the product of 214 and 3? Multiply first, then double.": "214 અને 3 ના ગુણાકારનું બમણું કેટલું? પહેલાં ગુણાકાર કરો, પછી બમણું કરો.",
    "What does 214 × 3 make before it is doubled?": "બમણું કરતાં પહેલાં 214 × 3 કેટલા થાય?",
    "Double 1,275 m": "1,275 મીટરનું બમણું",
    "A weaver made 1,275 m of cloth in one month. The next month she made double that length. How much was that?": "એક વણકરે એક મહિનામાં 1,275 મીટર કાપડ બનાવ્યું. પછીના મહિને તેણે તેનું બમણું બનાવ્યું. તે કેટલું હતું?",
    "What do 5 and 5 in the ones make together?": "એકમમાં 5 અને 5 મળીને કેટલા થાય?",
    "Every row needs a plate first.": "પહેલાં દરેક હાર પર એક પટ્ટી જોઈએ.",
    "Lay a plate on the glowing row first.": "પહેલાં ચમકતી હાર પર એક પટ્ટી મૂકો.",
    /* the working area's own words */
    "multiplicand": "ગુણ્ય", "multiplier": "ગુણક", "product": "ગુણાકાર",
    "O": "એ", "T": "દ", "H": "શ", "Th": "હ", "TTh": "દ.હ", "L": "લા",
    "even": "બેકી", "odd": "એકી", "m": "મી",
    "Double": "બમણું", "Clear": "ભૂંસો",
    "Open the doubling mat": "બમણું કરવાની સાદડી ખોલો", "Close the doubling mat": "બમણું કરવાની સાદડી બંધ કરો",
    "Clear the product row": "ગુણાકારની હાર ભૂંસો",
  },
};

/* ── the mat: columns from the right (ones is always the rightmost), a ring band above the headings,
   the multiplicand row, the multiplier row, the rule, the product row; the chapter's colours ── */
const PM_HEADS = ["O", "T", "H", "Th", "TTh", "L"];
const PM_PLACE = ["ones", "tens", "hundreds", "thousands", "ten thousands", "lakhs"];
const PM_NAMES = ["multiplicand", "multiplier", "product"];
const PM_ROWS = ["A", "B", "C"];
const PM_RIGHT: Record<string, string> = { A: "multiplicand", B: "multiplier", C: "product" };
const PM_BLUE = CONTENT.hundred;   /* the number being multiplied */
const PM_AMBER = CONTENT.ten;      /* the number it is multiplied by */
const PM_GREEN = CONTENT.one;      /* the product under the rule */
const PM_VERM = CONTENT.pointer;   /* a carried digit, small, in a ring above the column it joins */
const PM_ZERO = "#767676";         /* a zero holding a place */
const PM_ORDER = "#5F5F5F";        /* the replay's order-of-work numerals: plain grey, never a ring */
const PM_INK: Record<string, string> = { a: shade(PM_BLUE, 0.25), m: shade(PM_AMBER, 0.42), p: shade(PM_GREEN, 0.25), c: shade(PM_VERM, 0.25) };
/* rows (working-area units): ring band 6-46, headings 56-100, multiplicand 106-186, multiplier 192-272,
   rule 280, product 294-374, the correction row 382-462, the working card 470-526 */
const PM_G = { ring: 26, headY: 56, rowA: 106, rowB: 192, ruleY: 280, rowC: 294, rowD: 382, cardY: 470, ledgeY: 398 };
const PM_ROW_MID = [146, 232, 334];
const PM_FREE = { kind: "free", a: 2613, m: 8 };   /* free play opens on the chapter's own chart */

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   items   three a phase, every one the plan's question (qid).
           kind  name (lay the three plates) · which (the plate for the glowing row) · cols (multiply
                 column by column) · stay (what stays in one column) · double (add it to itself and
                 multiply it by two, side by side)
           a, m  the multiplicand and the multiplier; pre = columns already worked when it opens */
const PHASES = [
  {
    n: 1,
    concept: "Every multiplication has three names",
    conceptId: "M1.S1.T2.C4", objectiveIds: ["O2"],
    says: ["Point at the number being multiplied. Now the one it is multiplied by. Now say what the answer is called."],
    ladder: ["What is the row under the rule called?", "Read the rows from the top: the number, what it is multiplied by, and the answer."],
    closing: "The multiplicand lies across the mat, the multiplier sits under its ones column, and the product stands under the rule.",
    learned: "You learned: the multiplicand, the multiplier and the product.",
    traceback: "The plates stay where they were laid; the rows light from the top and each row's own name is laid beside it, ending with all three named.",
    items: [
      /* learn ML1: answer in the plan = The multiplicand is 4127, the multiplier is 6 and the product is 24,762.
         The child lays all three plates; the judged answer is the whole naming (the slot shows the name given
         to the 6, the misconception's row), and the win works the product out to 24,762. */
      { qid: "M1.S1.T2.C4:ML1", kind: "name", a: 4127, m: 6, ledge: ["product", "multiplicand", "multiplier"], answer: "multiplier", near: "multiplicand", pad: "enter", winMs: 4200,
        ask: "Name the three rows", say: "The mat shows 4,127 with 6 under its ones column. Lay a name plate on each row, then press Enter.",
        miss: "Which of the two numbers is the one being multiplied?" },
      /* practice 1: answer in the plan = 4 is the multiplier and 5213 is the multiplicand (the row of 5,213 glows;
         the win lays the multiplier plate on the 4 as well) */
      { qid: "M1.S1.T2.C4:1", kind: "which", a: 5213, m: 4, row: 0, ledge: ["multiplier", "product", "multiplicand"], answer: "multiplicand", near: "multiplier", pad: "enter", winMs: 2800,
        ask: "What is 5,213 called?", say: "Now the mat shows 5,213 with 4 under its ones column. Which plate belongs on 5,213?",
        miss: "Is 5,213 being multiplied, or is it doing the multiplying?" },
      /* practice 2: answer in the plan = 7304 is the multiplicand, 2 is the multiplier and 14,608 is the product
         (the row of 14,608 glows; the win lays the other two plates) */
      { qid: "M1.S1.T2.C4:2", kind: "which", a: 7304, m: 2, row: 2, shown: true, ledge: ["multiplicand", "product", "multiplier"], answer: "product", near: "multiplicand", pad: "enter", winMs: 2800,
        ask: "What is 14,608 called?", say: "Here 7,304 × 2 = 14,608 is worked on the mat. Which plate belongs on 14,608?",
        miss: "Which number was multiplied to make 14,608?" },
    ],
  },
  {
    n: 2,
    concept: "One digit multiplies every column in turn",
    conceptId: "M1.S1.T2.C5", objectiveIds: ["O1"],
    says: ["Start at the ones. How many times will you use the multiplier before the mat is full?"],
    ladder: ["Which column is worked before any other?", "Take one column at a time. Multiply its digit by the multiplier and write what it makes."],
    closing: "A one digit multiplier is used once on every column of the multiplicand, beginning at the ones.",
    learned: "You learned: one digit multiplies every column, starting at the ones.",
    traceback: "The multiplier card travels along the foot of the mat from the ones, lighting each pair and writing its digit in a second row under the child's, ending on the whole product.",
    items: [
      /* learn ML2: answer in the plan = 9366, and the multiplier is used four times, once for each column (the count shows it) */
      { qid: "M1.S1.T2.C5:ML2", kind: "cols", a: 3122, m: 3, answer: 9366, near: 3126, winMs: 2400, ask: "Multiply 3,122 by 3",
        say: "Multiply 3,122 by 3, one column at a time. Count how many times the multiplier is used.", miss: "How many columns does the multiplicand fill?" },
      /* practice 3: answer in the plan = 8642 */
      { qid: "M1.S1.T2.C5:3", kind: "cols", a: 4321, m: 2, answer: 8642, near: 4322, winMs: 2400, ask: "Multiply 4,321 by 2",
        say: "Multiply 4,321 by 2, working from the right.", miss: "Did the 2 multiply the tens, the hundreds and the thousands too?" },
      /* practice 4: answer in the plan = 36,096, and the multiplier is used on five columns (the count shows it) */
      { qid: "M1.S1.T2.C5:4", kind: "cols", a: 12032, m: 3, answer: 36096, near: 12036, winMs: 2400, ask: "Multiply 12,032 by 3",
        say: "Multiply 12,032 by 3. How many columns does the multiplier visit this time?", miss: "Did the 3 visit every column, the zeros too?" },
    ],
  },
  {
    n: 3,
    concept: "The carried digit is added, not multiplied",
    conceptId: "M1.S1.T2.C6", objectiveIds: ["O1"],
    says: ["Multiply this column first. Only then add the digit waiting in the ring above it."],
    ladder: ["What is added to that product, and at what point?", "Multiply the column's own digit first. Then add the digit in its ring."],
    closing: "Multiply the column first and add the carried digit afterwards, never the other way round.",
    learned: "You learned: multiply the column first, then add the carried digit.",
    traceback: "Each ring lifts clear while its column is multiplied on its own, then comes down and adds itself in; the right run ends on the whole product under the child's row.",
    items: [
      /* learn ML3: answer in the plan = 13,820, and the tens column is multiplied first and the carried 2 is added afterwards
         (it opens with the ones worked: 0 stays and 2 waits in the ring over the tens) */
      { qid: "M1.S1.T2.C6:ML3", kind: "cols", a: 2764, m: 5, pre: 1, answer: 13820, winMs: 2600, ask: "Multiply 2,764 by 5",
        say: "Multiply 2,764 by 5. The ones are done, and 2 waits in the ring above the tens. What happens in the tens?",
        miss: "What does the column's own digit come to when the multiplier takes it?" },
      /* practice 5: answer in the plan = 26,992 */
      { qid: "M1.S1.T2.C6:5", kind: "cols", a: 3856, m: 7, answer: 26992, winMs: 2600, ask: "Multiply 3,856 by 7",
        say: "Multiply 3,856 by 7. Every column carries this time.", miss: "In the tens, what is 5 × 7 before the waiting digit joins it?" },
      /* practice 6: answer in the plan = 1 stays and 5 is carried, because the column is multiplied first to make 48 and
         the waiting 3 is added afterwards to make 51. Shown on 286 x 6 with its ones worked (6 stays, 3 waits over the tens);
         only the digit that stays is right: 51 typed is both digits in the one square, the phase's misconception, and a miss */
      { qid: "M1.S1.T2.C6:6", kind: "stay", a: 286, m: 6, pre: 1, col: 1, answer: 1, total: 51, near: 6, winMs: 2600, ask: "What stays in the tens?",
        say: "A tens column holds 8, the multiplier is 6 and 3 is waiting in the ring above it. What stays in the column?",
        miss: "Only a single digit can stay in the tens. Which digit stays, and which goes up to the ring?" },
    ],
  },
  {
    n: 4,
    concept: "Doubling is multiplying by two",
    conceptId: "M1.S1.T2.C7", objectiveIds: ["O2"],
    says: ["Add it to itself on one side. Multiply it by two on the other. Are the two answers different?"],
    ladder: ["What must the last digit of a doubled number be?", "Add the ones digit to itself first, then move one column left."],
    closing: "Doubling is multiplying by two, and every doubled number ends in an even digit.",
    learned: "You learned: doubling is multiplying by two; the last digit is even.",
    traceback: "The child's answer is read as one number, then both mats are worked from the ones at once and land on the same double, ending on the whole answer.",
    items: [
      /* learn ML4: answer in the plan = 6832, and its last digit is even because the ones digit was added to itself (the win lights it) */
      { qid: "M1.S1.T2.C7:ML4", kind: "double", a: 3416, answer: 6832, winMs: 3000, ask: "Double 3,416",
        say: "What is double 3,416, and what does its last digit tell you?", miss: "How big should double 3,416 be?" },
      /* practice 7: answer in the plan = 1284, because 214 x 3 = 642 and double 642 is 1284 (two stages: multiply, then double) */
      { qid: "M1.S1.T2.C7:7", kind: "double", a: 214, first: 3, answer: 1284, winMs: 3000, ask: "Double 214 × 3",
        say: "What is double the product of 214 and 3? Multiply first, then double.", miss: "What does 214 × 3 make before it is doubled?" },
      /* practice 8: answer in the plan = 2550 m, and it ends in an even digit because the ones digit was added to itself */
      { qid: "M1.S1.T2.C7:8", kind: "double", a: 1275, unit: "m", answer: 2550, winMs: 3000, ask: "Double 1,275 m",
        say: "A weaver made 1,275 m of cloth in one month. The next month she made double that length. How much was that?",
        miss: "What do 5 and 5 in the ones make together?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  headings: PM_HEADS, rows: PM_NAMES, columnWidth: 110, doublingColumnWidth: 88, maxColumns: 6,
  colours: { multiplicand: PM_BLUE, multiplier: PM_AMBER, product: PM_GREEN, carried: PM_VERM, placeZero: PM_ZERO },
  entry: "a column's total (1 or 2 digits) is written under that column: its right digit stays and the rest rises into the ring over the next column (the last column is written whole); 3 or more digits are the whole answer",
  freePlay: { multiplicand: PM_FREE.a, multiplier: PM_FREE.m, controls: ["tap a digit", "tap the multiplier", "tap the next product square", "Double", "Clear"] },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

const pmDigits = (v: number) => String(Math.max(0, Math.trunc(v || 0))).split("").reverse().map(Number);
const pmBlank = () => [null, null, null, null, null, null, null, null] as any[];
const pmRowNum = (row: any[]) => {
  let v = 0, any = false;
  row.forEach((d, k) => { if (d !== null && d !== undefined) { v += d * Math.pow(10, k); any = true; } });
  return any ? v : null;
};
/* the picture's run: each column multiplied, then its waiting digit added; the last column written whole */
const pmRun = (top: number, m: number) => {
  const ds = pmDigits(top), out: any[] = [];
  let c = 0;
  ds.forEach((d, k) => {
    const prod = d * m, total = prod + c;
    out.push({ k, d, cin: c, prod, total, stay: total % 10, up: Math.floor(total / 10), last: k === ds.length - 1 });
    c = Math.floor(total / 10);
  });
  return out;
};
/* phase 3's misconception: the waiting digit added first and the total multiplied */
const pmAddFirst = (top: number, m: number) => {
  const ds = pmDigits(top);
  let c = 0, v = 0;
  ds.forEach((d, k) => {
    const t = (d + c) * m;
    if (k === ds.length - 1) v += t * Math.pow(10, k);
    else { v += (t % 10) * Math.pow(10, k); c = Math.floor(t / 10); }
  });
  return v;
};

/* judge: the naming must be whole; the digit that stays (or its whole column total); numbers as numbers */
const judge = (item: any, v: any) => {
  if (item.kind === "name") {
    if (v && typeof v === "object") return v.A === "multiplicand" && v.B === "multiplier" && v.C === "product";
    return String(v ?? "").trim().toLowerCase() === item.answer;
  }
  if (item.kind === "which") return String(v ?? "").trim().toLowerCase() === item.answer;
  if (item.kind === "stay") { const x = leadNumber(v); return x === item.answer; }   /* 51 is both digits in the one square: a miss */
  return leadNumber(v) === item.answer;
};
/* oracle: every answer again by plain arithmetic and the definitions (no mat, no judge) */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const named: Record<number, string> = { 0: "multiplicand", 1: "multiplier", 2: "product" };
  if (it.kind === "name") return it.answer === named[1] && it.a > 999 && it.m < 10;
  if (it.kind === "which") return it.answer === named[it.row];
  if (it.kind === "cols") return it.a * it.m === it.answer;
  if (it.kind === "stay") {
    const own = Math.floor(it.a / Math.pow(10, it.col)) % 10, waiting = Math.floor(((it.a % 10) * it.m) / 10);
    return own * it.m + waiting === it.total && it.total % 10 === it.answer;
  }
  if (it.kind === "double") {
    const x = it.first ? it.a * it.first : it.a;
    return x + x === it.answer && x * 2 === it.answer && it.answer % 2 === 0;
  }
  return false;
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => {
  if (item.kind === "double") { const x = item.first ? item.a * item.first : item.a; return Number(String(x) + String(x)); } /* written twice side by side */
  if (item.near !== undefined) return item.near;          /* the copied digits, a swapped plate, the ring added first */
  return pmAddFirst(item.a, item.m);                        /* the waiting digit added before multiplying */
};
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) =>
  item.kind === "name" ? [] /* the three plate words are the question's own words; the answer is where each one lies */
    : item.kind === "which" ? [item.answer]
      : item.kind === "stay" ? [String(item.answer), String(item.total), words(item.answer), words(item.total)] /* the total would give the digit away */
        : [String(item.answer), indian(item.answer), words(item.answer)];
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;
/* the slot writes a typed number with Indian commas */
const format = (s: any) => (/^\d{4,}$/.test(String(s ?? "")) ? indian(Number(s)) : HOOK.tx ? HOOK.tx(String(s ?? "")) : String(s ?? ""));

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (item.kind === "name" || item.kind === "which") { HOOK.set(item.answer); setTimeout(() => HOOK.enter(), 80); return; }
  if (HOOK.enter) { HOOK.enter(String(item.answer)); return; }
  return T.submit(item.answer);
};
/* the agent's answer(): plates are laid as a child lays them; a number is typed (undefined) */
const answer = (item: any, v: any) => ((item.kind === "name" || item.kind === "which") ? (HOOK.set ? HOOK.set(v) : false) : undefined);
/* the agent's check(): nothing waits on this mat; Enter checks */
const check = () => undefined;

/* ── the working area helpers ─────────────────────────────────────────────────────────────── */

const pmStagesOf = (it: any) =>
  it.kind === "double" ? (it.first ? [{ m: it.first, dbl: false }, { m: 2, dbl: true }] : [{ m: 2, dbl: true }])
    : [{ m: it.m || 1, dbl: !!it.dbl }];
/* one stage of the mat: the number across it, the multiplier, the rows and rings (pre-worked columns filled) */
const pmFresh = (it: any, si: number, top: number) => {
  const st = pmStagesOf(it)[si] || pmStagesOf(it)[0];
  const len = String(top).length, cols = Math.min(6, len + 1);
  const row = pmBlank(), rings = pmBlank();
  const pre = si === 0 ? it.pre || 0 : 0;
  pmRun(top, st.m).slice(0, pre).forEach((r: any) => {
    row[r.k] = r.stay;
    if (rings[r.k]) rings[r.k] = { ...rings[r.k], used: true };
    if (r.up) { if (r.last) row[r.k + 1] = r.up; else rings[r.k + 1] = { d: r.up, used: false }; }
  });
  return { si, top, m: st.m, dbl: st.dbl, len, cols, row, rings, next: pre, lit: it.kind === "stay" ? it.col : null,
    card: null, lift: null, travel: null, even: false, traced: false, kept: null };
};
const pmSetup = (it: any) => {
  const s: any = { ...pmFresh(it, 0, it.a || 0), kind: it.kind || "free", fix: null, plates: { A: null, B: null, C: null },
    tags: 0, lifted: [], readRow: null, heavy: false, touched: false };
  if (it.kind === "name" || it.kind === "which") s.next = -1;       /* no column work on the naming mat */
  if (it.kind === "which" && it.shown) { const row = pmBlank(); pmDigits(it.a * it.m).forEach((d, k) => { row[k] = d; }); s.row = row; }
  return s;
};
/* the working card: what the lit column makes, in the order it is made */
const pmCard = (s: any, d: number, cin: number, t?: number) => {
  const add = cin ? [[" + ", "ink"], [String(cin), "c"]] : [];
  const eq = t !== undefined && t !== null ? [[" = ", "ink"], [String(t), "p"]] : [];
  const R = [[String(d), "a"], [" × " + s.m, "m"], ...add, ...eq];
  return s.dbl ? { L: [[String(d), "a"], [" + ", "ink"], [String(d), "a"], ...add, ...eq], R } : { R };
};
const pmCardMul = (s: any, d: number, prod: number) => {
  const eq = [[" = ", "ink"], [String(prod), "ink"]];
  const R = [[String(d), "a"], [" × " + s.m, "m"], ...eq];
  return s.dbl ? { L: [[String(d), "a"], [" + ", "ink"], [String(d), "a"], ...eq], R } : { R };
};
const pmCardAdd = (s: any, prod: number, cin: number, total: number) => {
  const R = [[String(prod), "ink"], [" + ", "ink"], [String(cin), "c"], [" = ", "ink"], [String(total), "p"]];
  return s.dbl ? { L: R, R } : { R };
};
const pmFinal = (s: any, top: number, P: number) => {
  const R = [[indian(top), "a"], [" × " + s.m, "m"], [" = ", "ink"], [indian(P), "p"]];
  return s.dbl ? { L: [[indian(top), "a"], [" + ", "ink"], [indian(top), "a"], [" = ", "ink"], [indian(P), "p"]], R } : { R };
};

const PM_CSS = `
.pm-move{transition:transform 460ms cubic-bezier(.3,.7,.25,1)}
.pm-drop{animation:pmDrop 420ms ease-out both}
@keyframes pmDrop{from{opacity:0;transform:translateY(-36px)}to{opacity:1;transform:none}}
.pm-rise{animation:pmRise 480ms ease-out both}
@keyframes pmRise{from{opacity:0;transform:translateY(64px)}to{opacity:1;transform:none}}
.pm-grab{cursor:grab}
@media (prefers-reduced-motion:reduce){.pm-move{transition:none}.pm-drop,.pm-rise{animation:none}}
`;

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  HOOK.tx = tx;   /* the slot (format) and the summary's Thumb draw a plate's name in the language in use */
  const tl = useTimeline();
  const busy = tl.busy;
  const free = stage === "free";
  const [S, setS] = useState<any>(() => pmSetup(item || {}));
  const SR = useRef<any>(S);
  const put = (p: any) => { SR.current = { ...SR.current, ...p }; setS(SR.current); };
  const setupFor = useRef(0);
  const freeM = useRef(8);
  const kind = S.kind;
  const nameKind = kind === "name" || kind === "which";
  const colKind = !nameKind;
  const asking = stage === "ask" && !busy;
  const ringKey = kind === "which" ? PM_ROWS[item.row || 0] : "";

  const reset = (it: any) => { tl.stop(); const s = pmSetup(it); SR.current = s; setS(s); api.lock(false); };
  useEffect(() => { if (stage === "ask" && setupFor.current !== index) { setupFor.current = index; reset(item); } }, [stage, index]);
  /* free play (the plan's freePlay): any four digit number, any single digit, the doubling mat as you like */
  useEffect(() => { if (!free) return; setupFor.current = -2; freeM.current = PM_FREE.m; reset(PM_FREE); }, [free]);

  /* after a traceback, the child's own mat comes back at their next move (the correction row stays) */
  const resume = () => {
    const c = SR.current;
    if (c.traced && c.kept) put({ ...c.kept, traced: false, kept: null, card: null, lift: null, travel: null });
  };
  const keep = () => {
    const c = SR.current;
    if (!c.traced) put({ kept: { si: c.si, top: c.top, m: c.m, dbl: c.dbl, len: c.len, cols: c.cols, row: c.row, rings: c.rings, next: c.next, lit: c.lit } });
  };

  /* ── column work ── */
  const lightCol = () => {
    if (busy) return;
    resume();
    const c = SR.current;
    if (c.next < 0 || c.lit !== null) return;
    put({ lit: c.next, touched: true });
    api.sfx.tick();
  };
  /* one column written: its right digit stays, the rest rises into the ring over the next column
     (the last column is written whole, as the book writes it) */
  const writeSteps = (k: number, t: number) => {
    const c0 = SR.current, d = pmDigits(c0.top)[k] || 0, r0 = c0.rings[k], cin = r0 && !r0.used ? r0.d : 0, last = k === c0.len - 1;
    return [
      /* [ms, fn]: fn runs, then the step waits ms */
      [520, () => put({ lit: k, card: pmCard(SR.current, d, cin, t) })],
      [t >= 10 ? 460 : 240, () => { const c = SR.current, row = c.row.slice(), rings = c.rings.slice(); row[k] = t % 10; if (rings[k]) rings[k] = { ...rings[k], used: true }; put({ row, rings }); api.sfx.tick(); }],
      [t >= 10 ? 460 : 10, () => {
        if (t < 10) return;
        const c = SR.current, row = c.row.slice(), rings = c.rings.slice();
        if (last) row[k + 1] = Math.floor(t / 10); else rings[k + 1] = { d: Math.floor(t / 10), used: false };
        put({ row, rings });
      }],
      [240, () => put({ next: last ? -1 : k + 1, lit: last ? null : k + 1, card: null })],
    ];
  };
  const afterWrite = (auto: boolean) => {
    const c = SR.current;
    if (c.next >= 0) { api.lock(false); return; }
    const num = pmRowNum(c.row) || 0;
    if (auto) { put({ card: pmFinal(c, c.top, num), even: c.dbl }); api.lock(false); return; }
    const st = pmStagesOf(item);
    if (c.si + 1 < st.length) {   /* the product slides up and the doubling mat opens */
      tl.run([[700, () => {}], [20, () => put({ ...pmFresh(item, c.si + 1, num), lit: 0 })]], () => api.lock(false));
      return;
    }
    api.lock(false);
    api.submit(num);
  };
  const runWrite = (k: number, t: number, auto: boolean) => {
    api.lock(true);
    put({ touched: true });
    tl.run(writeSteps(k, t), () => afterWrite(auto));
  };
  const colEnter = (v: any) => {
    const s = String(v ?? "").trim();
    if (!/^\d+$/.test(s)) return;
    if (s.length >= 3) { api.submit(Number(s)); return; }   /* a whole answer typed at once */
    resume();
    if (SR.current.next < 0) put(pmFresh(item, 0, item.a));  /* a finished run starts again from the ones */
    api.setTyped("");
    runWrite(SR.current.next, Number(s), false);
  };
  const stayEnter = (v: any) => { const s = String(v ?? "").trim(); if (/^\d+$/.test(s)) api.submit(Number(s)); };

  /* the ring reached for before its column is multiplied: it lifts and hangs clear while the column is
     multiplied on its own, and only then comes down (as often as the child likes, the same every time) */
  const holdRing = (k: number) => {
    if (busy || stage !== "ask") return;
    resume();
    const c = SR.current, r = c.rings[k];
    if (!r || r.used || c.next !== k) return;
    const d = pmDigits(c.top)[k] || 0;
    api.lock(true);
    tl.run([
      /* [ms, fn]: fn runs, then the step waits ms */
      [1500, () => put({ lit: k, lift: k, touched: true, card: pmCard(SR.current, d, 0) })],
      [420, () => put({ lift: null, card: null })],
    ], () => api.lock(false));
  };

  /* ── the naming plates (phase 1) ── */
  const rowOf = (name: string) => PM_ROWS.find((r) => SR.current.plates[r] === name) || null;
  const placePlate = (name: string, row: string | null) => {
    const pl = { ...SR.current.plates };
    PM_ROWS.forEach((r) => { if (pl[r] === name) pl[r] = null; });
    if (row) pl[row] = name;            /* a plate already there goes back to the ledge */
    put({ plates: pl, touched: true, lifted: SR.current.lifted.filter((r: string) => r !== row && pl[r]) });
    api.sfx.tick();
  };
  const rowAt = (p: any) => (p.x > 876 ? null : p.y >= 96 && p.y < 189 ? "A" : p.y >= 189 && p.y < 280 ? "B" : p.y >= 280 && p.y < 384 ? "C" : null);
  const dropPlate = (name: string, p: any, moved: boolean) => {
    if (!asking || !nameKind) return;
    const on = rowOf(name);
    if (!moved) {   /* a tap: from the ledge onto the glowing row (or the first empty one); from a row back to the ledge */
      if (on) placePlate(name, null);
      else if (kind === "which") placePlate(name, ringKey);
      else { const r = PM_ROWS.find((x) => !SR.current.plates[x]); if (r) placePlate(name, r); }
      return;
    }
    const r = rowAt(p);
    if (kind === "which") { if (r === ringKey) placePlate(name, r); else if (on) placePlate(name, null); return; }
    if (r) placePlate(name, r); else if (on) placePlate(name, null);
  };
  const nameEnter = () => {
    const pl = SR.current.plates;
    if (kind === "name") {
      if (!pl.A || !pl.B || !pl.C) { api.say("Every row needs a plate first."); return; }
      api.setTyped(pl.B);
      api.submit({ A: pl.A, B: pl.B, C: pl.C });
      return;
    }
    const w = pl[ringKey];
    if (!w) { api.say("Lay a plate on the glowing row first."); return; }
    api.submit(w);
  };

  const drag = useDrag((payload: any, p: any, moved: boolean) => {
    if (payload && payload.plate) dropPlate(payload.plate, p, moved);
    else if (payload && payload.ring !== undefined) holdRing(payload.ring);
  });

  /* ── free play ── */
  const freeSet = (top: number, m: number, dbl: boolean) => { tl.stop(); put({ ...pmFresh({ kind: "free", m, dbl }, 0, top), touched: true }); };
  const freeDigit = (k: number) => {
    if (busy) return;
    const c = SR.current, ds = pmDigits(c.top);
    ds[k] = k === ds.length - 1 ? (ds[k] % 9) + 1 : (ds[k] + 1) % 10;
    freeSet(ds.reduce((a, d, i) => a + d * Math.pow(10, i), 0), c.m, c.dbl);
    api.sfx.tick();
  };
  const freeMult = () => { if (busy) return; const c = SR.current; freeM.current = (c.m % 9) + 1; freeSet(c.top, freeM.current, false); api.sfx.tick(); };
  const freeDouble = () => { const c = SR.current; freeSet(c.top, c.dbl ? freeM.current : 2, !c.dbl); };
  const freeClear = () => { const c = SR.current; freeSet(c.top, c.m, c.dbl); };
  const freeWork = () => {
    if (busy) return;
    const c = SR.current, k = c.next;
    if (k < 0) return;
    const r = c.rings[k], t = (pmDigits(c.top)[k] || 0) * c.m + (r && !r.used ? r.d : 0);
    runWrite(k, t, true);
  };

  /* ── Enter (and the agent's check) ── */
  const enterFn: any = stage !== "ask" ? null : busy ? () => {} : nameKind ? () => nameEnter() : kind === "stay" ? stayEnter : colEnter;
  api.onEnter(enterFn);
  HOOK.enter = (v?: any) => enterFn && enterFn(v);
  HOOK.set = (v: any) => {
    const w = String(v ?? "").trim().toLowerCase();
    if (!nameKind || !PM_NAMES.includes(w)) return false;
    if (kind === "which") { placePlate(w, ringKey); return true; }
    const rest = PM_NAMES.filter((x) => x !== w);
    put({ plates: w === "multiplier" ? { ...PM_RIGHT } : { A: rest[0], B: w, C: rest[1] }, touched: true });
    return true;
  };

  /* typing lights the next column, so the child sees the pair being worked */
  useEffect(() => {
    if (stage !== "ask" || !typed || busy) return;
    const c = SR.current;
    if ((c.kind === "cols" || c.kind === "double") && !c.traced && c.lit === null && c.next >= 0) put({ lit: c.next, touched: true });
  }, [typed]);

  /* ── win motions ── */
  const fillSteps = () => {
    const st = pmStagesOf(item);
    let top = item.a;
    for (let i = 0; i < st.length - 1; i++) top = top * st[i].m;
    const si = st.length - 1, run = pmRun(top, st[si].m), P = item.answer;
    const S0: any[] = [[30, () => put({ ...pmFresh(item, si, top), row: pmBlank(), rings: pmBlank(), fix: null, next: -1 })]];
    run.forEach((r: any) => S0.push([230, () => {
      const c = SR.current, row = c.row.slice(), rings = c.rings.slice();
      row[r.k] = r.stay; if (rings[r.k]) rings[r.k] = { ...rings[r.k], used: true };
      if (r.up) { if (r.last) row[r.k + 1] = r.up; else rings[r.k + 1] = { d: r.up, used: false }; }
      put({ row, rings, lit: r.k }); api.sfx.tick();
    }]));
    S0.push([200, () => put({ lit: null, card: pmFinal(SR.current, top, P), even: SR.current.dbl })]);
    return S0;
  };
  const readSteps = () => {
    const S0: any[] = [[30, () => put({ plates: { ...PM_RIGHT }, lifted: [], tags: 0 })]];
    [0, 1, 2].forEach((r) => S0.push([480, () => put({ readRow: r })]));
    S0.push([380, () => put({ readRow: null })]);
    return S0;
  };
  useEffect(() => {
    if (stage !== "win") return;
    const c = SR.current;
    if (nameKind) {
      const S0 = readSteps();
      if (kind === "name") pmRun(item.a, item.m).forEach((r: any) => S0.push([300, () => {
        const x = SR.current, row = x.row.slice(), rings = x.rings.slice();
        row[r.k] = r.stay; if (rings[r.k]) rings[r.k] = { ...rings[r.k], used: true };
        if (r.up) { if (r.last) row[r.k + 1] = r.up; else rings[r.k + 1] = { d: r.up, used: false }; }
        put({ row, rings }); api.sfx.tick();
      }]));
      tl.run(S0);
    } else if (kind === "stay") {
      const k = item.col, d = pmDigits(item.a)[k], r = c.rings[k], cin = r ? r.d : 0, t = d * item.m + cin;
      tl.run([
        [30, () => put({ lit: k, fix: null, card: { R: [[String(d), "a"], [" × " + item.m, "m"], [" + ", "ink"], [String(cin), "c"], [" = ", "ink"], [String(t), "p"]] } })],
        [480, () => { const x = SR.current, row = x.row.slice(), rings = x.rings.slice(); row[k] = t % 10; if (rings[k]) rings[k] = { ...rings[k], used: true }; put({ row, rings }); api.sfx.tick(); }],
        [480, () => { const x = SR.current, rings = x.rings.slice(); rings[k + 1] = { d: Math.floor(t / 10), used: false }; put({ rings }); }],
      ]);
    } else {
      const last = pmStagesOf(item).length - 1;
      const built = !c.traced && c.si === last && c.next < 0 && pmRowNum(c.row) === item.answer;
      tl.run(built ? [[30, () => put({ lit: null, fix: null, card: pmFinal(SR.current, c.top, item.answer), even: c.dbl })]] : fillSteps());
    }
  }, [stage]);

  /* ── the traceback: the mathematics redrawn in steps, ending on the whole right answer;
     nothing marked, nothing cleared: the child's row and plates stay ── */
  const traceNames = (done: () => void) => {
    const pl = SR.current.plates;
    const off = PM_ROWS.filter((r) => pl[r] && pl[r] !== PM_RIGHT[r]);
    const S0: any[] = [[240, () => put({ lifted: off, tags: 0, touched: true })]];
    PM_ROWS.forEach((r, i) => {
      S0.push([90, () => put({ readRow: i, heavy: i === 2 })]);
      S0.push([760, () => put({ tags: i + 1 })]);
    });
    S0.push([520, () => put({ readRow: null, heavy: false })]);
    tl.run(S0, done);
  };
  const traceCols = (done: () => void, lead: any[]) => {
    keep();
    const kept = SR.current.kept;
    const st = pmStagesOf(item);
    const S0: any[] = [...lead];
    let top = item.a;
    st.forEach((stg: any, si: number) => {
      const T0 = top, f = pmFresh(item, si, T0), run = pmRun(T0, stg.m), P = T0 * stg.m;
      S0.push([380, () => put({ si, top: T0, m: f.m, dbl: f.dbl, len: f.len, cols: f.cols, rings: pmBlank(),
        row: kept && kept.si === si ? kept.row : pmBlank(), fix: { si, row: pmBlank() }, lit: null, card: null, travel: null, lift: null, traced: true, touched: true })]);
      run.forEach((r: any) => {
        if (r.cin) {
          S0.push([820, () => put({ lit: r.k, travel: r.k, lift: r.k, card: pmCardMul(SR.current, r.d, r.prod) })]);
          S0.push([760, () => { const c = SR.current, rings = c.rings.slice(); rings[r.k] = { ...rings[r.k], used: true }; put({ lift: null, rings, card: pmCardAdd(c, r.prod, r.cin, r.total) }); }]);
        } else S0.push([760, () => put({ lit: r.k, travel: r.k, card: pmCardMul(SR.current, r.d, r.total) })]);
        S0.push([480, () => {
          const c = SR.current, fr = c.fix.row.slice(), rings = c.rings.slice();
          fr[r.k] = r.stay;
          if (r.up) { if (r.last) fr[r.k + 1] = r.up; else rings[r.k + 1] = { d: r.up, used: false }; }
          put({ fix: { si, row: fr }, rings }); api.sfx.tick();
        }]);
      });
      S0.push([560, () => put({ lit: null, travel: null, card: pmFinal(SR.current, T0, P) })]);
      top = P;
    });
    tl.run(S0, done);
  };
  const traceStay = (done: () => void) => {
    const k = item.col, c0 = SR.current, d = pmDigits(item.a)[k], r0 = c0.rings[k], cin = r0 ? r0.d : 0, prod = d * item.m, total = prod + cin;
    tl.run([
      [320, () => put({ lit: k, lift: k, touched: true, card: pmCardMul(SR.current, d, prod) })],
      [900, () => { const c = SR.current, rings = c.rings.slice(); if (rings[k]) rings[k] = { ...rings[k], used: true }; put({ lift: null, rings, card: pmCardAdd(c, prod, cin, total) }); }],
      [800, () => { const c = SR.current, row = c.row.slice(); row[k] = total % 10; put({ row }); api.sfx.tick(); }],
      [520, () => { const c = SR.current, rings = c.rings.slice(); rings[k + 1] = { d: Math.floor(total / 10), used: false }; put({ rings }); }],
      [600, () => put({ card: { R: [[String(d), "a"], [" × " + item.m, "m"], [" + ", "ink"], [String(cin), "c"], [" = ", "ink"], [String(total), "p"]] } })],
    ], done);
  };
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    const done = () => api.lock(false);
    if (nameKind) traceNames(done);
    else if (kind === "stay") traceStay(done);
    else if (colKind) {
      const v = leadNumber(wrong.value);
      /* a double written as the number twice side by side is first read as the one long number it is */
      const lead = kind === "double" && v !== null && String(v).length > String(item.answer).length
        ? [[60, () => put({ card: SR.current.dbl ? { L: [[indian(v), "ink"]] } : { R: [[indian(v), "ink"]] } })], [1500, () => {}]] : [];
      traceCols(done, lead);
    } else done();
  }, [wrong]);

  /* ── what the host and the agent read back (toolApi.getState) ── */
  const doneCols = S.next < 0 ? S.len : S.next;
  api.share({
    phase: n, columns: S.cols, multiplicand: S.top, multiplier: S.m,
    rings: S.rings.slice(0, S.cols).map((r: any) => (r ? r.d : null)), columnDone: nameKind ? 0 : doneCols,
    product: nameKind && !item.shown ? null : pmRowNum(S.row), doublingOpen: !!S.dbl,
    plates: nameKind ? { ...S.plates } : null, complete: stage === "idle",
  });

  /* ── drawing ── */
  const mats = S.dbl ? [{ id: "add", right: 500, cw: 88 }, { id: "times", right: 1040, cw: 88 }] : [{ id: "times", right: 860, cw: 110 }];
  const timesMat = mats[mats.length - 1];
  const colL = (g: any, k: number) => g.right - (k + 1) * g.cw;
  const colM = (g: any, k: number) => g.right - (k + 0.5) * g.cw;
  const inkOf = (key: string) => (key === "ink" ? C.ink : PM_INK[key]);
  const digitFill = (d: number, key: string) => (d === 0 ? PM_ZERO : PM_INK[key]);
  const showFix = !!S.fix && S.fix.si === S.si && stage !== "win" && stage !== "idle";
  /* the working card sits under the product row, or under the correction row while that is shown */
  const cardY = showFix ? PM_G.cardY : PM_G.rowD + 6;
  /* on the single mat the replay's card stands beside the mat, and the order numerals take the band under the columns */
  const sideCard = showFix && !S.dbl;
  const cinOf = (k: number) => { const r = S.rings[k]; return r && !r.used ? r.d : 0; };
  const draggingRing = drag.drag && drag.drag.moved && drag.drag.payload && drag.drag.payload.ring !== undefined ? drag.drag.payload.ring : null;
  const card = S.card || (colKind && S.lit !== null && S.lit < S.len && (stage === "ask" || free)
    ? pmCard(S, pmDigits(S.top)[S.lit], S.lift === S.lit ? 0 : cinOf(S.lit)) : null);
  const unit = item && item.unit && !free ? item.unit : "";
  const ledgeXY = (name: string) => { const i = Math.max(0, (item.ledge || PM_NAMES).indexOf(name)); return { x: 30 + i * 290, y: PM_G.ledgeY + 24 }; };
  const plateXY = (name: string) => { const r = PM_ROWS.indexOf(rowOf(name) || ""); return r >= 0 ? { x: 10, y: PM_ROW_MID[r] - 30 } : ledgeXY(name); };

  const strip = (g: any, v: number, y: number, key: string, cardW: number, cardH: number) => {
    const d = pmDigits(v), x0 = colM(g, d.length - 1) - cardW / 2, x1 = colM(g, 0) + cardW / 2;
    return (
      <g key={key}>
        <rect x={x0} y={y + 4} width={x1 - x0} height={cardH} rx={12} fill={tint(PM_BLUE, 0.86)} stroke={PM_BLUE} strokeWidth={2.5} />
        {d.slice(1).map((_, i) => <line key={i} x1={colL(g, i)} y1={y + 14} x2={colL(g, i)} y2={y + cardH - 6} stroke={tint(PM_BLUE, 0.5)} strokeWidth={2} />)}
        {d.map((dg, k) => (
          <text key={"d" + k} x={colM(g, k)} y={y + 4 + cardH / 2 + 20} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={digitFill(dg, "a")}>{dg}</text>
        ))}
      </g>
    );
  };
  const ringAt = (g: any, k: number, r: any, lifted: boolean) => {
    const x = colM(g, k), filled = r && !r.used;
    return (
      <g key={"ring" + g.id + k} className="pm-move" style={{ transform: lifted ? "translate(40px, 6px)" : "none" } as any}>
        <circle cx={x} cy={PM_G.ring} r={20} fill={filled ? tint(PM_VERM, 0.85) : "#FFFFFF"}
          stroke={filled ? PM_VERM : r ? tint(PM_VERM, 0.4) : C.rule} strokeWidth={filled ? 3.5 : 2.5} />
        {r && <text key={"rd" + r.d} className="pm-rise" x={x} y={PM_G.ring + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={PM_INK.c}>{r.d}</text>}
      </g>
    );
  };

  const matView = (g: any) => {
    const cols = S.cols, cw = g.cw, cardW = cw - 14, cardH = cw >= 100 ? 72 : 66;
    const x0 = colL(g, cols - 1), ruleX0 = x0 - 46, ruleX1 = g.right + 6;
    const isAdd = g.id === "add";
    const litTo = showFix ? PM_G.rowD + 82 : PM_G.rowC + 84;
    const travelK = S.travel !== null && S.travel !== undefined && !isAdd ? S.travel : 0;
    const signX = x0 - 24, signY = PM_G.rowB + 42;
    return (
      <g key={g.id}>
        {S.lit !== null && S.lit < cols && (
          <rect x={colL(g, S.lit) + 3} y={50} width={cw - 6} height={litTo - 50} rx={16} fill={tint(PM_AMBER, 0.82)} stroke={PM_AMBER} strokeWidth={3} />
        )}
        {Array.from({ length: cols }).map((_, k) => ringAt(g, k, draggingRing === k && !isAdd ? null : S.rings[k], S.lift === k && !isAdd))}
        {Array.from({ length: cols }).map((_, k) => (
          <g key={"h" + k}>
            <rect x={colL(g, k) + 5} y={PM_G.headY} width={cw - 10} height={44} rx={12} fill={tint(C.panel, 0.25)} stroke={C.rule} strokeWidth={1.5} />
            <text x={colM(g, k)} y={PM_G.headY + 33} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(PM_HEADS[k])}</text>
          </g>
        ))}
        {strip(g, S.top, PM_G.rowA, "stripA", cardW, cardH)}
        {isAdd ? strip(g, S.top, PM_G.rowB, "stripB", cardW, cardH) : (
          <g className="pm-move" style={{ transform: `translateX(${-travelK * cw}px)` } as any}>
            <rect x={colM(g, 0) - cardW / 2} y={PM_G.rowB + 4} width={cardW} height={cardH} rx={12} fill={tint(PM_AMBER, 0.78)} stroke={PM_AMBER} strokeWidth={2.5} />
            <text x={colM(g, 0)} y={PM_G.rowB + 4 + cardH / 2 + 20} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={PM_INK.m}>{S.m}</text>
          </g>
        )}
        {isAdd
          ? <path d={`M ${signX - 15} ${signY} H ${signX + 15} M ${signX} ${signY - 15} V ${signY + 15}`} stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
          : <path d={`M ${signX - 12} ${signY - 12} L ${signX + 12} ${signY + 12} M ${signX + 12} ${signY - 12} L ${signX - 12} ${signY + 12}`} stroke={C.ink} strokeWidth={5} strokeLinecap="round" />}
        <rect x={ruleX0} y={PM_G.ruleY - (S.heavy ? 3 : nameKind ? 1 : 0)} width={ruleX1 - ruleX0} height={S.heavy ? 12 : nameKind ? 8 : 6} rx={3} fill={CONTENT.line} />
        {Array.from({ length: cols }).map((_, k) => {
          const d = S.row[k];
          return (
            <g key={"c" + k}>
              <rect x={colM(g, k) - cardW / 2} y={PM_G.rowC + 4} width={cardW} height={cardH} rx={12} fill="#FFFFFF"
                stroke={S.heavy ? C.ink : C.rule} strokeWidth={S.heavy ? 3 : 2} />
              {d !== null && d !== undefined && (
                <text key={"cd" + k + "-" + d} className="pm-drop" x={colM(g, k)} y={PM_G.rowC + 4 + cardH / 2 + 20} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={digitFill(d, "p")}>{d}</text>
              )}
            </g>
          );
        })}
        {S.even && S.row[0] !== null && (
          <rect x={colM(g, 0) - cardW / 2 - 5} y={PM_G.rowC - 1} width={cardW + 10} height={cardH + 10} rx={15} fill="none" stroke={PM_GREEN} strokeWidth={5} />
        )}
        {S.even && S.row[0] !== null && (
          <g>
            <rect x={colM(g, 0) - 50} y={PM_G.cardY - 10} width={100} height={50} rx={25} fill="#FFFFFF" stroke={PM_GREEN} strokeWidth={3} />
            <text x={colM(g, 0)} y={PM_G.cardY + 25} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={PM_INK.p}>{tx(S.row[0] % 2 === 0 ? "even" : "odd")}</text>
          </g>
        )}
        {showFix && Array.from({ length: cols }).map((_, k) => {
          const d = S.fix.row[k];
          return (
            <g key={"f" + k}>
              <rect x={colM(g, k) - cardW / 2} y={PM_G.rowD + 4} width={cardW} height={cardH} rx={12} fill={tint(PM_GREEN, 0.9)}
                stroke={tint(PM_GREEN, 0.4)} strokeWidth={2} strokeDasharray="8 6" />
              {d !== null && d !== undefined && (
                <text key={"fd" + k + "-" + d} className="pm-drop" x={colM(g, k)} y={PM_G.rowD + 4 + cardH / 2 + 20} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={digitFill(d, "p")}>{d}</text>
              )}
            </g>
          );
        })}
        {unit && [PM_G.rowA, PM_G.rowC].map((y) => (
          <text key={"u" + y} x={g.right + 12} y={y + 4 + cardH / 2 + 12} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(unit)}</text>
        ))}
        {/* the replay's order of work: a plain grey numeral at the foot of each column as it is worked
            (never a ring: a ring above a column is the carried digit's look) */}
        {sideCard && Array.from({ length: S.len }).map((_, k) => S.fix.row[k] !== null && S.fix.row[k] !== undefined && (
          <text key={"ord" + k} x={colM(g, k)} y={PM_G.cardY + 40} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={PM_ORDER}>{k + 1}</text>
        ))}
        {sideCard && card && card.R && (() => {
          const eq = card.R.findIndex((sg: any) => sg[0] === " = ");
          const lines = eq > 0 ? [card.R.slice(0, eq), [["= ", "ink"], ...card.R.slice(eq + 1)]] : [card.R];
          return (
            <g data-role="reading">{/* the replay's worked line, beside the mat so the order numerals fit under it */}
              <rect x={g.right + 18} y={PM_G.rowB} width={1082 - g.right - 18} height={184} rx={16} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
              {lines.map((ln: any, j: number) => (
                <text key={j} x={(g.right + 1100) / 2} y={PM_G.rowB + (lines.length === 1 ? 104 : 72 + j * 64)} textAnchor="middle" fontSize={T.label} fontWeight={700}>
                  {ln.map((sg: any, i: number) => <tspan key={i} fill={inkOf(sg[1])}>{sg[0]}</tspan>)}
                </text>
              ))}
            </g>
          );
        })()}
        {!sideCard && card && (isAdd ? card.L : card.R) && (
          <g data-role="reading">{/* the worked line: a reading of the column, not an instruction */}
            <rect x={ruleX0} y={cardY} width={ruleX1 - ruleX0} height={56} rx={16} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
            <text x={(ruleX0 + ruleX1) / 2} y={cardY + 43} textAnchor="middle" fontSize={S.dbl ? T.label : T.speech} fontWeight={700}>
              {(isAdd ? card.L : card.R).map((sg: any, i: number) => <tspan key={i} fill={inkOf(sg[1])}>{sg[0]}</tspan>)}
            </text>
          </g>
        )}
      </g>
    );
  };

  /* the one invite */
  let invite: any = null;
  if (stage === "ask" && !busy) {
    if (kind === "name" && !S.touched) { const p = ledgeXY((item.ledge || PM_NAMES)[0]); invite = { x: p.x + 118, y: p.y + 30, r: 64 }; }
    else if (kind === "which" && !S.plates[ringKey]) invite = { x: 128, y: PM_ROW_MID[item.row || 0], r: 60 };
    else if ((kind === "cols" || kind === "double") && !S.touched && !S.traced && S.lit === null && S.next >= 0) {
      const r = S.rings[S.next];
      invite = r && !r.used ? { x: colM(timesMat, S.next), y: PM_G.ring, r: 26 } : { x: colM(mats[0], S.next), y: 190, r: 56 };
    } else if (kind === "stay" && !S.touched && !S.traced) invite = { x: colM(timesMat, item.col), y: PM_G.ring, r: 26 };
  }
  if (free && S.next === 0 && !S.touched && !busy) invite = { x: colM(timesMat, 0), y: PM_G.rowC + 40, r: 50 };

  const ringLive = asking && colKind && S.next >= 0 && !S.traced && S.rings[S.next] && !S.rings[S.next].used;
  const plateLive = asking && nameKind;

  return (
    <g>
      <style>{PM_CSS}</style>

      {/* the running count: columns worked against the columns the multiplier must visit */}
      {colKind && (
        <g data-zone="runs">
          <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          <text x={24} y={-40} fontSize={T.speech} fontWeight={700} fill={C.ink}>{doneCols}</text>
          <text x={62} y={-45} fontSize={T.label} fontWeight={500} fill={C.ink}>{lang === "hi" ? `/ ${S.len} स्तंभ` : lang === "gu" ? `/ ${S.len} સ્તંભ` : `of ${S.len} columns`}</text>
        </g>
      )}

      {/* phase 1: the glowing row (the one asked about), or the row being read back */}
      {nameKind && [0, 1, 2].map((r) => (S.readRow === r || (S.readRow === null && kind === "which" && item.row === r && stage === "ask")) && (
        <rect key={"band" + r} x={252} y={PM_ROW_MID[r] - 44} width={622} height={88} rx={18} fill={tint(C.accent, 0.86)} stroke={C.accent} strokeWidth={3} />
      ))}

      {mats.map((g) => matView(g))}

      {/* phase 1: the naming slots at the left of each row, the ledge, the plates, the names read back */}
      {nameKind && (
        <g>
          {PM_ROWS.map((r, i) => (
            <rect key={"slot" + r} x={10} y={PM_ROW_MID[i] - 30} width={236} height={60} rx={14} fill="#FFFFFF"
              stroke={kind === "which" && r === ringKey ? C.accent : C.rule} strokeWidth={kind === "which" && r === ringKey ? 4 : 2.5} strokeDasharray="10 8" />
          ))}
          <rect x={10} y={PM_G.ledgeY} width={860} height={108} rx={22} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          {PM_NAMES.map((name) => {
            if (drag.drag && drag.drag.moved && drag.drag.payload && drag.drag.payload.plate === name) return null;
            const p = plateXY(name), on = rowOf(name), up = on && S.lifted.includes(on) ? -12 : 0, pay = { plate: name };
            return (
              <g key={name} className={plateLive ? "pm-grab" : ""} transform={`translate(${p.x},${p.y + up})`}
                {...(plateLive ? { ...control("plate-" + name, "The " + name + " plate"), ...drag.bind(pay), ...drag.keys(pay) } : {})}>
                <rect x={-2} y={-8} width={240} height={76} fill="transparent" />
                <rect x={0} y={0} width={236} height={60} rx={14} fill="url(#gKey)" stroke={shade(C.rule, 0.3)} strokeWidth={2.5} filter="url(#fShadowSoft)" />
                <text x={118} y={41} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(name)}</text>
              </g>
            );
          })}
          {PM_ROWS.slice(0, S.tags).map((r, i) => (
            <g key={"tag" + r}>
              <rect x={880} y={PM_ROW_MID[i] - 27} width={202} height={54} rx={14} fill="#FFFFFF" stroke={C.ink} strokeWidth={2.5} />
              <text x={981} y={PM_ROW_MID[i] + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(PM_RIGHT[r])}</text>
            </g>
          ))}
        </g>
      )}

      {/* the next column to tap (ones first: only the rightmost unworked column lights) */}
      {asking && colKind && kind !== "stay" && S.lit === null && S.next >= 0 && !S.traced && mats.map((g) => (
        <Hit key={"hit" + g.id} id={"col-" + g.id} label={"Work the " + PM_PLACE[S.next] + " column"} x={colL(g, S.next)} y={76} w={g.cw} h={302} onPress={lightCol} />
      ))}

      {/* the filled ring over the next column: reach for it and it hangs clear until the column is multiplied */}
      {ringLive && (() => {
        const k = S.next, x = colM(timesMat, k), pay = { ring: k };
        return (
          <g className="pm-grab" {...control("ring-" + k, "The carried digit over the " + PM_PLACE[k])} {...drag.bind(pay)} {...drag.keys(pay)}>
            <rect x={x - 36} y={0} width={72} height={72} fill="transparent" />
          </g>
        );
      })()}

      {/* free play: tap a digit, tap the multiplier, tap the next product square; Double and Clear */}
      {free && (
        <g>
          {pmDigits(S.top).map((_, k) => (
            <Hit key={"dg" + k} id={"digit-" + k} label={"Change the " + PM_PLACE[k] + " digit"} x={colM(timesMat, k) - (timesMat.cw >= 100 ? 48 : 42)} y={PM_G.rowA + 2}
              w={timesMat.cw >= 100 ? 96 : 84} h={76} onPress={() => freeDigit(k)} />
          ))}
          {!S.dbl && <Hit id="free-multiplier" label="Change the multiplier" x={colM(timesMat, 0) - 48} y={PM_G.rowB + 2} w={96} h={76} onPress={freeMult} />}
          {S.next >= 0 && !busy && mats.map((g) => (
            <Hit key={"fw" + g.id} id={"work-" + g.id} label={"Work the " + PM_PLACE[S.next] + " column"} x={colM(g, S.next) - (g.cw >= 100 ? 48 : 42)} y={PM_G.rowC + 2}
              w={g.cw >= 100 ? 96 : 84} h={76} onPress={freeWork} />
          ))}
          <Key id="free-double" label={tx(S.dbl ? "Close the doubling mat" : "Open the doubling mat")} x={16} y={450} w={180} h={72} C={C} primary={S.dbl} onClick={freeDouble}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={S.dbl ? "#FFFFFF" : C.ink}>{tx("Double")}</text>
          </Key>
          <Key id="free-clear" label={tx("Clear the product row")} x={212} y={450} w={180} h={72} C={C} onClick={freeClear}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("Clear")}</text>
          </Key>
        </g>
      )}

      {/* a plate or a ring under the finger */}
      {drag.drag && drag.drag.moved && drag.drag.payload && drag.drag.payload.plate && (
        <g pointerEvents="none" transform={`translate(${drag.drag.x - 118},${drag.drag.y - 30})`} filter="url(#fLift)">
          <rect x={0} y={0} width={236} height={60} rx={14} fill="url(#gKey)" stroke={shade(C.rule, 0.3)} strokeWidth={2.5} />
          <text x={118} y={41} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(drag.drag.payload.plate)}</text>
        </g>
      )}
      {draggingRing !== null && S.rings[draggingRing] && (
        <g pointerEvents="none">
          <circle cx={drag.drag.x} cy={drag.drag.y} r={22} fill={tint(PM_VERM, 0.85)} stroke={PM_VERM} strokeWidth={3.5} filter="url(#fLift)" />
          <text x={drag.drag.x} y={drag.drag.y + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={PM_INK.c}>{S.rings[draggingRing].d}</text>
        </g>
      )}

      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ result, C, w, h, n }: any) {
  const L = (result && result.last) || {};
  if (L.value === null || L.value === undefined) return null;
  const mid = h / 2, it: any = ((PHASES[(n || 1) - 1] || {}).items || [])[L.item] || {};
  if (L.kind === "name" || L.kind === "which") {
    const word = String(L.answer || "");
    return (
      <g>
        <rect x={10} y={mid - 30} width={w - 20} height={60} rx={14} fill="url(#gKey)" stroke={shade(C.rule, 0.3)} strokeWidth={2.5} />
        <text x={w / 2} y={mid + 11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{HOOK.tx ? HOOK.tx(word) : word}</text>
      </g>
    );
  }
  if (L.kind === "stay") {
    const up = it.total ? Math.floor(it.total / 10) : null;
    return (
      <g>
        <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
        {up !== null && up !== undefined && (
          <g>
            <circle cx={w / 2 - 40} cy={mid - 12} r={20} fill={tint(PM_VERM, 0.85)} stroke={PM_VERM} strokeWidth={3} />
            <text x={w / 2 - 40} y={mid - 2} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={PM_INK.c}>{up}</text>
          </g>
        )}
        <text x={w / 2 + 30} y={mid + 18} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={PM_INK.p}>{L.answer}</text>
      </g>
    );
  }
  const v = typeof L.answer === "number" ? L.answer : leadNumber(L.value);
  if (v === null || v === undefined) return null;
  const m = it.kind === "double" ? 2 : it.m || null;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {m !== null && <text x={18} y={mid + 11} fontSize={T.label} fontWeight={700} fill={PM_INK.m}>{"× " + m}</text>}
      <text x={w - 16} y={mid + 11} textAnchor="end" fontSize={T.label} fontWeight={700} fill={PM_INK.p}>{indian(v)}</text>
    </g>
  );
}

function ProductMat(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null }} />
  );
}

export default ProductMat;
