/* ═══ M2.S3.T6.C20.2D1 · short_division_strip · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "short_division_strip";
const MEDIA_ID = "M2.S3.T6.C20.2D1";
const TOOL_NAME = "Short Division Strip";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["One strip, a divisor behind its bar, and the working kept in your head. Which digit first?"];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every leftover carried small, every zero written where the number was smaller, and both lanes agreeing.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Any dividend, any divisor from two to nine, with the long lane and the table card open. Tap a digit or the divisor to change it, then tap Divide.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r13+: `lineFor(line, lang, TR)`); the
   English stays what the checks read. NCERT class 4 terms: भाज्य भाजक भागफल शेषफल / ભાજ્ય ભાજક ભાગફળ શેષ,
   इकाई दहाई सैकड़ा हज़ार / એકમ દશક શતક હજાર, हासिल / વદી (carried). Digits stay digits: the runtime speaks
   them in the language in use. A first draft; wants a native speaker's read. (The two-box labels are
   drawn by the runtime as written: r17 does not translate them.) */
const TR: any = {
  hi: {
    "Short Division Strip": "छोटे भाग की पट्टी",
    "One strip, a divisor behind its bar, and the working kept in your head. Which digit first?": "एक पट्टी, रेखा के पीछे भाजक, और हल मन में। पहले कौन सा अंक?",
    "Every leftover carried small, every zero written where the number was smaller, and both lanes agreeing.": "हर बचा हुआ छोटा लिखकर आगे गया, जहाँ संख्या छोटी थी वहाँ शून्य लिखा, और दोनों तरीके मिल गए।",
    "Free play. Any dividend, any divisor from two to nine, with the long lane and the table card open. Tap a digit or the divisor to change it, then tap Divide.": "मुक्त खेल। कोई भी भाज्य, दो से नौ तक कोई भी भाजक, लंबी विधि और पहाड़े का कार्ड खुले हैं। बदलने के लिए किसी अंक या भाजक पर टैप करो, फिर भाग दो दबाओ।",
    "The same steps, kept in your head": "वही चरण, मन में",
    "Divide the tens, then the ones. Write only the answer.": "पहले दहाई को भाग दो, फिर इकाई को। सिर्फ़ उत्तर लिखो।",
    "What place is it in? Say it with its place name.": "यह किस स्थान में है? इसे स्थान के नाम के साथ बोलो।",
    "Look at the long lane. Each digit it writes goes up into the strip.": "लंबी विधि देखो। वह जो भी अंक लिखती है, वह ऊपर पट्टी में जाता है।",
    "Short division does the steps of long division in the head and writes only the quotient.": "छोटा भाग लंबे भाग के चरण मन में करता है और सिर्फ़ भागफल लिखता है।",
    "You learned: short division does the long steps in your head.": "तुमने सीखा: छोटे भाग में लंबे चरण मन में होते हैं।",
    "Find 84 divided by 4 by short division.": "छोटे भाग से 84 ÷ 4 निकालो।",
    "Which digit did you divide first? Short division starts with the biggest place.": "तुमने पहले किस अंक को भाग दिया? छोटा भाग सबसे बड़े स्थान से शुरू होता है।",
    "Find 69 divided by 3 by short division.": "छोटे भाग से 69 ÷ 3 निकालो।",
    "Which quotient digit belongs under the tens, and which under the ones?": "भागफल का कौन सा अंक दहाई के नीचे आता है, और कौन सा इकाई के नीचे?",
    "Find 848 divided by 4 by short division.": "छोटे भाग से 848 ÷ 4 निकालो।",
    "Did the tens get a quotient digit of their own?": "क्या दहाई को भागफल का अपना अंक मिला?",
    "Carry the leftover to the next digit": "बचा हुआ अगले अंक पर ले जाओ",
    "A step can leave something over. Where does it go, and what number does it make?": "किसी चरण में कुछ बच सकता है। वह कहाँ जाता है, और कौन सी संख्या बनाता है?",
    "Where is it written, and what number does it make with the next digit?": "वह कहाँ लिखा जाता है, और अगले अंक के साथ कौन सी संख्या बनाता है?",
    "The long lane changes the leftover into the next place. Read the number it makes there.": "लंबी विधि बचे हुए को अगले स्थान में बदलती है। वहाँ जो संख्या बनती है, उसे पढ़ो।",
    "Each leftover is written small beside the next digit and joins it.": "हर बचा हुआ अगले अंक के पास छोटा लिखा जाता है और उससे जुड़ जाता है।",
    "You learned: each leftover joins the next digit as one number.": "तुमने सीखा: हर बचा हुआ अगले अंक से जुड़कर एक संख्या बनता है।",
    "Find 596 divided by 7 by short division.": "छोटे भाग से 596 ÷ 7 निकालो।",
    "What was left after the tens step, and where did it go?": "दहाई वाले चरण के बाद क्या बचा, और वह कहाँ गया?",
    "Find 75 divided by 5 by short division, and say what is carried.": "छोटे भाग से 75 ÷ 5 निकालो, और बताओ कि हासिल क्या है।",
    "What was left after dividing the tens, and which digit does it sit beside?": "दहाई को भाग देने के बाद क्या बचा, और वह किस अंक के पास बैठता है?",
    "Find 853 divided by 6 by short division.": "छोटे भाग से 853 ÷ 6 निकालो।",
    "Each step leaves something. Did you join it to the next digit every time?": "हर चरण में कुछ बचता है। क्या तुमने हर बार उसे अगले अंक से जोड़ा?",
    "A zero still has to be written": "शून्य भी लिखना पड़ता है",
    "Is this number smaller than the divisor? Then what goes underneath?": "क्या यह संख्या भाजक से छोटी है? तो नीचे क्या आएगा?",
    "Is it smaller than the divisor?": "क्या यह भाजक से छोटी है?",
    "Try the divisor times one. If even that does not fit, a zero goes underneath.": "भाजक गुणा एक आज़माओ। अगर वह भी न समाए, तो नीचे शून्य आता है।",
    "A zero goes in the quotient whenever the number is smaller than the divisor, and only then.": "जब भी संख्या भाजक से छोटी हो, भागफल में शून्य आता है, और सिर्फ़ तभी।",
    "You learned: write a zero when the number is smaller than the divisor.": "तुमने सीखा: संख्या भाजक से छोटी हो, तो शून्य लिखो।",
    "Ravi works 6,275 divided by 6. He writes a zero at every step that leaves something over. Which zero is right? Find the real quotient and remainder.": "रवि 6,275 ÷ 6 करता है। जिस चरण में कुछ बचता है, वहाँ वह शून्य लिखता है। कौन सा शून्य सही है? असली भागफल और शेषफल निकालो।",
    "6,275 ÷ 6 = ? Check Ravi's": "6,275 ÷ 6 = ? रवि का जाँचो",
    "A step with something left over can still fit the divisor. Which numbers were really smaller than it?": "जिस चरण में कुछ बचे, उसमें भी भाजक समा सकता है। कौन सी संख्याएँ सच में उससे छोटी थीं?",
    "Find 4,824 divided by 8 by short division.": "छोटे भाग से 4,824 ÷ 8 निकालो।",
    "After the hundreds step, what number stands in the tens, and does eight fit into it?": "सैकड़े वाले चरण के बाद दहाई में कौन सी संख्या है, और क्या उसमें आठ समाता है?",
    "Find 7,215 divided by 7 by short division.": "छोटे भाग से 7,215 ÷ 7 निकालो।",
    "Every place gets a digit. What goes under a number smaller than the divisor?": "हर स्थान को एक अंक मिलता है। भाजक से छोटी संख्या के नीचे क्या आता है?",
    "Long or short, the same answer": "लंबा हो या छोटा, उत्तर वही",
    "Do it both ways. Do the answers match?": "दोनों तरीकों से करो। क्या उत्तर मिलते हैं?",
    "At which step do the two lanes first part?": "किस चरण पर दोनों तरीके पहली बार अलग होते हैं?",
    "Work that one step again in both lanes, and say it with its place name.": "वह एक चरण दोनों तरीकों में फिर से करो, और उसे स्थान के नाम के साथ बोलो।",
    "Long and short division give the same quotient and remainder.": "लंबे भाग और छोटे भाग, दोनों से वही भागफल और शेषफल मिलता है।",
    "You learned: long and short ways give the same quotient and remainder.": "तुमने सीखा: लंबी और छोटी विधि से वही भागफल और शेषफल मिलता है।",
    "Find 947 divided by 6 by long division and by short division. Do the two answers match?": "947 ÷ 6 लंबे भाग से और छोटे भाग से निकालो। क्या दोनों उत्तर मिलते हैं?",
    "947 ÷ 6 = ? Both ways": "947 ÷ 6 = ? दोनों तरीकों से",
    "Do the first digits of both lanes match? Then look at the next step.": "क्या दोनों तरीकों के पहले अंक मिलते हैं? फिर अगला चरण देखो।",
    "Meena divides 5,478 by 9 the short way. She gets 68 remainder 6. Check it the long way and correct it.": "मीना 5,478 को 9 से छोटी विधि से भाग देती है। उसे 68 मिलता है, शेषफल 6। लंबी विधि से जाँचो और उसे ठीक करो।",
    "5,478 ÷ 9 = ? Check Meena's": "5,478 ÷ 9 = ? मीना का जाँचो",
    "Which step of the long way did Meena's short way skip?": "मीना की छोटी विधि ने लंबी विधि का कौन सा चरण छोड़ दिया?",
    "Find 3,164 divided by 4 both ways. Then look at the small numbers the short way carries.": "3,164 ÷ 4 दोनों तरीकों से निकालो। फिर छोटी विधि जो छोटी संख्याएँ आगे ले जाती है, उन्हें देखो।",
    "3,164 ÷ 4 = ? Both ways": "3,164 ÷ 4 = ? दोनों तरीकों से",
    "Did the short way carry what was left after the hundreds into the tens?": "क्या छोटी विधि सैकड़ों के बाद बचे हुए को दहाई में ले गई?",
    /* the strip's own words */
    "ones": "इकाई", "tens": "दहाई", "hundreds": "सैकड़े", "thousands": "हज़ार",
    "one": "इकाई", "ten": "दहाई", "hundred": "सैकड़ा", "thousand": "हज़ार",
    "quotient": "भागफल", "remainder": "शेषफल", "carried": "हासिल", "carry": "हासिल", "long way": "लंबी विधि", "answer": "उत्तर",
    "yours": "तुम्हारा", "Ravi's": "रवि का", "Meena's": "मीना का",
    "Divide": "भाग दो", "A new division": "नया भाग", "New": "नया", "Change the divisor": "भाजक बदलो",
    /* the summary page's little drawings (Thumb) */
    "r": "शे",
  },
  gu: {
    "Short Division Strip": "ટૂંકા ભાગાકારની પટ્ટી",
    "One strip, a divisor behind its bar, and the working kept in your head. Which digit first?": "એક પટ્ટી, લીટી પાછળ ભાજક, અને ગણતરી મનમાં. પહેલાં કયો અંક?",
    "Every leftover carried small, every zero written where the number was smaller, and both lanes agreeing.": "દરેક વધેલું નાનું લખીને આગળ ગયું, સંખ્યા નાની હતી ત્યાં શૂન્ય લખાયું, અને બંને રીત મળી ગઈ.",
    "Free play. Any dividend, any divisor from two to nine, with the long lane and the table card open. Tap a digit or the divisor to change it, then tap Divide.": "મુક્ત રમત. કોઈ પણ ભાજ્ય, બેથી નવ સુધી કોઈ પણ ભાજક, લાંબી રીત અને ઘડિયાનું કાર્ડ ખુલ્લાં છે. બદલવા માટે કોઈ અંક કે ભાજક પર ટૅપ કરો, પછી ભાગો દબાવો.",
    "The same steps, kept in your head": "એ જ પગલાં, મનમાં",
    "Divide the tens, then the ones. Write only the answer.": "પહેલાં દશકને ભાગો, પછી એકમને. ફક્ત જવાબ લખો.",
    "What place is it in? Say it with its place name.": "તે કયા સ્થાનમાં છે? તેને સ્થાનના નામ સાથે બોલો.",
    "Look at the long lane. Each digit it writes goes up into the strip.": "લાંબી રીત જુઓ. તે જે અંક લખે છે, તે ઉપર પટ્ટીમાં જાય છે.",
    "Short division does the steps of long division in the head and writes only the quotient.": "ટૂંકો ભાગાકાર લાંબા ભાગાકારનાં પગલાં મનમાં કરે છે અને ફક્ત ભાગફળ લખે છે.",
    "You learned: short division does the long steps in your head.": "તમે શીખ્યા: ટૂંકા ભાગાકારમાં લાંબાં પગલાં મનમાં થાય છે.",
    "Find 84 divided by 4 by short division.": "ટૂંકા ભાગાકારથી 84 ÷ 4 શોધો.",
    "Which digit did you divide first? Short division starts with the biggest place.": "તમે પહેલાં કયા અંકને ભાગ્યો? ટૂંકો ભાગાકાર સૌથી મોટા સ્થાનથી શરૂ થાય છે.",
    "Find 69 divided by 3 by short division.": "ટૂંકા ભાગાકારથી 69 ÷ 3 શોધો.",
    "Which quotient digit belongs under the tens, and which under the ones?": "ભાગફળનો કયો અંક દશક નીચે આવે, અને કયો એકમ નીચે?",
    "Find 848 divided by 4 by short division.": "ટૂંકા ભાગાકારથી 848 ÷ 4 શોધો.",
    "Did the tens get a quotient digit of their own?": "શું દશકને ભાગફળનો પોતાનો અંક મળ્યો?",
    "Carry the leftover to the next digit": "વધેલું આગળના અંક પર લઈ જાઓ",
    "A step can leave something over. Where does it go, and what number does it make?": "કોઈ પગલામાં કંઈક વધી શકે. તે ક્યાં જાય છે, અને કઈ સંખ્યા બનાવે છે?",
    "Where is it written, and what number does it make with the next digit?": "તે ક્યાં લખાય છે, અને આગળના અંક સાથે કઈ સંખ્યા બનાવે છે?",
    "The long lane changes the leftover into the next place. Read the number it makes there.": "લાંબી રીત વધેલાને આગળના સ્થાનમાં બદલે છે. ત્યાં જે સંખ્યા બને, તે વાંચો.",
    "Each leftover is written small beside the next digit and joins it.": "દરેક વધેલું આગળના અંકની બાજુમાં નાનું લખાય છે અને તેની સાથે જોડાય છે.",
    "You learned: each leftover joins the next digit as one number.": "તમે શીખ્યા: દરેક વધેલું આગળના અંક સાથે જોડાઈને એક સંખ્યા બને છે.",
    "Find 596 divided by 7 by short division.": "ટૂંકા ભાગાકારથી 596 ÷ 7 શોધો.",
    "What was left after the tens step, and where did it go?": "દશકના પગલા પછી શું વધ્યું, અને તે ક્યાં ગયું?",
    "Find 75 divided by 5 by short division, and say what is carried.": "ટૂંકા ભાગાકારથી 75 ÷ 5 શોધો, અને કહો કે વદી શું છે.",
    "What was left after dividing the tens, and which digit does it sit beside?": "દશકને ભાગ્યા પછી શું વધ્યું, અને તે કયા અંકની બાજુમાં બેસે છે?",
    "Find 853 divided by 6 by short division.": "ટૂંકા ભાગાકારથી 853 ÷ 6 શોધો.",
    "Each step leaves something. Did you join it to the next digit every time?": "દરેક પગલે કંઈક વધે છે. શું તમે દર વખતે તેને આગળના અંક સાથે જોડ્યું?",
    "A zero still has to be written": "શૂન્ય પણ લખવું પડે",
    "Is this number smaller than the divisor? Then what goes underneath?": "શું આ સંખ્યા ભાજક કરતાં નાની છે? તો નીચે શું આવશે?",
    "Is it smaller than the divisor?": "શું તે ભાજક કરતાં નાની છે?",
    "Try the divisor times one. If even that does not fit, a zero goes underneath.": "ભાજક ગુણ્યા એક અજમાવો. જો તે પણ ન સમાય, તો નીચે શૂન્ય આવે.",
    "A zero goes in the quotient whenever the number is smaller than the divisor, and only then.": "જ્યારે પણ સંખ્યા ભાજક કરતાં નાની હોય, ભાગફળમાં શૂન્ય આવે, અને ફક્ત ત્યારે જ.",
    "You learned: write a zero when the number is smaller than the divisor.": "તમે શીખ્યા: સંખ્યા ભાજક કરતાં નાની હોય, તો શૂન્ય લખો.",
    "Ravi works 6,275 divided by 6. He writes a zero at every step that leaves something over. Which zero is right? Find the real quotient and remainder.": "રવિ 6,275 ÷ 6 કરે છે. જે પગલે કંઈક વધે, ત્યાં તે શૂન્ય લખે છે. કયું શૂન્ય સાચું છે? સાચું ભાગફળ અને શેષ શોધો.",
    "6,275 ÷ 6 = ? Check Ravi's": "6,275 ÷ 6 = ? રવિનું ચકાસો",
    "A step with something left over can still fit the divisor. Which numbers were really smaller than it?": "જે પગલે કંઈક વધે, તેમાં પણ ભાજક સમાઈ શકે. કઈ સંખ્યાઓ ખરેખર તેનાથી નાની હતી?",
    "Find 4,824 divided by 8 by short division.": "ટૂંકા ભાગાકારથી 4,824 ÷ 8 શોધો.",
    "After the hundreds step, what number stands in the tens, and does eight fit into it?": "શતકના પગલા પછી દશકમાં કઈ સંખ્યા છે, અને શું તેમાં આઠ સમાય છે?",
    "Find 7,215 divided by 7 by short division.": "ટૂંકા ભાગાકારથી 7,215 ÷ 7 શોધો.",
    "Every place gets a digit. What goes under a number smaller than the divisor?": "દરેક સ્થાનને એક અંક મળે છે. ભાજક કરતાં નાની સંખ્યા નીચે શું આવે?",
    "Long or short, the same answer": "લાંબું કે ટૂંકું, જવાબ એ જ",
    "Do it both ways. Do the answers match?": "બંને રીતે કરો. શું જવાબ મળે છે?",
    "At which step do the two lanes first part?": "કયા પગલે બંને રીત પહેલી વાર જુદી પડે છે?",
    "Work that one step again in both lanes, and say it with its place name.": "એ એક પગલું બંને રીતે ફરી કરો, અને તેને સ્થાનના નામ સાથે બોલો.",
    "Long and short division give the same quotient and remainder.": "લાંબો અને ટૂંકો ભાગાકાર એ જ ભાગફળ અને શેષ આપે છે.",
    "You learned: long and short ways give the same quotient and remainder.": "તમે શીખ્યા: લાંબી અને ટૂંકી રીત એ જ ભાગફળ અને શેષ આપે છે.",
    "Find 947 divided by 6 by long division and by short division. Do the two answers match?": "947 ÷ 6 લાંબા ભાગાકારથી અને ટૂંકા ભાગાકારથી શોધો. શું બંને જવાબ મળે છે?",
    "947 ÷ 6 = ? Both ways": "947 ÷ 6 = ? બંને રીતે",
    "Do the first digits of both lanes match? Then look at the next step.": "શું બંને રીતના પહેલા અંક મળે છે? પછી આગળનું પગલું જુઓ.",
    "Meena divides 5,478 by 9 the short way. She gets 68 remainder 6. Check it the long way and correct it.": "મીના 5,478 ને 9 વડે ટૂંકી રીતે ભાગે છે. તેને 68 મળે છે, શેષ 6. લાંબી રીતે ચકાસો અને તેને સુધારો.",
    "5,478 ÷ 9 = ? Check Meena's": "5,478 ÷ 9 = ? મીનાનું ચકાસો",
    "Which step of the long way did Meena's short way skip?": "મીનાની ટૂંકી રીતે લાંબી રીતનું કયું પગલું છોડી દીધું?",
    "Find 3,164 divided by 4 both ways. Then look at the small numbers the short way carries.": "3,164 ÷ 4 બંને રીતે શોધો. પછી ટૂંકી રીત જે નાની સંખ્યાઓ આગળ લઈ જાય છે, તે જુઓ.",
    "3,164 ÷ 4 = ? Both ways": "3,164 ÷ 4 = ? બંને રીતે",
    "Did the short way carry what was left after the hundreds into the tens?": "શું ટૂંકી રીત શતક પછી વધેલાને દશકમાં લઈ ગઈ?",
    /* the strip's own words */
    "ones": "એકમ", "tens": "દશક", "hundreds": "શતક", "thousands": "હજાર",
    "one": "એકમ", "ten": "દશક", "hundred": "શતક", "thousand": "હજાર",
    "quotient": "ભાગફળ", "remainder": "શેષ", "carried": "વદી", "carry": "વદી", "long way": "લાંબી રીત", "answer": "જવાબ",
    "yours": "તમારું", "Ravi's": "રવિનું", "Meena's": "મીનાનું",
    "Divide": "ભાગો", "A new division": "નવો ભાગાકાર", "New": "નવો", "Change the divisor": "ભાજક બદલો",
    /* the summary page's little drawings (Thumb) */
    "r": "શે",
  },
};

/* ── the chapter's colours and the short-division working (the picture's own route) ── */
const SD_BLUE = CONTENT.hundred;   /* the dividend */
const SD_AMBER = CONTENT.ten;      /* the divisor */
const SD_GREEN = CONTENT.one;      /* the quotient */
const SD_ROSE = CONTENT.bead;      /* a multiple taken away */
const SD_VERM = CONTENT.pointer;   /* what is left */
const SD_ZERO = "#767676";         /* a zero written because the number was smaller */
const sdInk = (c: string) => shade(c, 0.25);
const SD_PLACE = ["ones", "tens", "hundreds", "thousands"];
const SD_PLACE1 = ["one", "ten", "hundred", "thousand"];
const sdPlaceName = (num: number, place: number) => (num === 1 ? SD_PLACE1[place] : SD_PLACE[place]);
const SD_QR = [{ label: "quotient" }, { label: "remainder" }];

/* one entry per digit of the dividend, left to right: the number in hand (the small leftover joined
   to the digit), its quotient digit, the multiple taken away and what is left. A first digit smaller
   than the divisor is a "lead": nothing is written under it, and it joins the next digit. */
const sdSteps = (dividend: number, divisor: number) => {
  const ds = String(dividend).split("").map(Number), L = ds.length, out: any[] = [];
  let carry = 0, started = false;
  ds.forEach((digit, k) => {
    const num = carry * 10 + digit, q = Math.floor(num / divisor), left = num - q * divisor;
    const lead = !started && q === 0 && k < L - 1;
    if (q > 0) started = true;
    out.push({ k, digit, carryIn: carry, fromLead: k > 0 && out[k - 1].lead, num, q, take: q * divisor, left, lead, place: L - 1 - k });
    carry = left;
  });
  return out;
};
/* how long the win's working takes (the next question follows it) */
const SD_MS = { lead: 420, hand: 300, settle: 420, end: 480, chk: 380 };
const sdWin = (dividend: number, divisor: number) => {
  const st = sdSteps(dividend, divisor), leads = st.filter((s: any) => s.lead).length;
  return 300 + leads * SD_MS.lead + (st.length - leads) * (SD_MS.hand + SD_MS.settle) + SD_MS.end + SD_MS.chk + 900;
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
                   label at most 10 characters, e.g. { label: "each bowl", unit: "mL" }); typed reads "16|1"
   (this tool) dividend, divisor: the division on the strip; near: the item's misconception;
           theirs: another child's quotient row, cell by cell, when the question gives one (who: their name);
           second: "carried" when the second box is the small number carried, not the remainder */
const PHASES = [
  {
    n: 1,
    concept: "The same steps, kept in your head",
    conceptId: "M2.S3.T6.C20", objectiveIds: ["O9"],
    says: ["Divide the tens, then the ones. Write only the answer."],
    /* tries, as the plan writes it: A miss is answered three ways at once and none of them is the answer. First rung, from the item's own miss line: which digit did you divide first? Second rung, the phase's: what place is it in? Third rung: the long lane opens with its first step already written, and the child copies only the quotient digit up into the strip. The number pad stays open behind all three rungs. */
    ladder: ["What place is it in? Say it with its place name.", "Look at the long lane. Each digit it writes goes up into the strip."],
    closing: "Short division does the steps of long division in the head and writes only the quotient.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: short division does the long steps in your head.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The check rebuilds the child's answer, then the long lane works each step with its place name and each quotient digit it writes lights the same cell in the strip, ending on the whole quotient.",
    items: [
      /* learn ML1: answer in the plan = 21 */
      { qid: "M2.S3.T6.C20:ML1", kind: "div", dividend: 84, divisor: 4, near: 12, winMs: sdWin(84, 4),
        say: "Find 84 divided by 4 by short division.", ask: "84 ÷ 4 = ?", answer: 21, miss: "Which digit did you divide first? Short division starts with the biggest place." },
      /* practice 1: answer in the plan = 23 */
      { qid: "M2.S3.T6.C20:1", kind: "div", dividend: 69, divisor: 3, near: 32, winMs: sdWin(69, 3),
        say: "Find 69 divided by 3 by short division.", ask: "69 ÷ 3 = ?", answer: 23, miss: "Which quotient digit belongs under the tens, and which under the ones?" },
      /* practice 2: answer in the plan = 212 */
      { qid: "M2.S3.T6.C20:2", kind: "div", dividend: 848, divisor: 4, near: 202, winMs: sdWin(848, 4),
        say: "Find 848 divided by 4 by short division.", ask: "848 ÷ 4 = ?", answer: 212, miss: "Did the tens get a quotient digit of their own?" },
    ],
  },
  {
    n: 2,
    concept: "Carry the leftover to the next digit",
    conceptId: "M2.S3.T6.C21", objectiveIds: ["O9"],
    says: ["A step can leave something over. Where does it go, and what number does it make?"],
    /* tries, as the plan writes it: First rung, from the item: what was left after the step before? Second rung, the phase's: where is it written, and what number does it make with the next digit? Third rung: the strip is cut to two digits with one carry, and the long lane writes the carry out in full above it. The number pad and the small key stay open. */
    ladder: ["Where is it written, and what number does it make with the next digit?", "The long lane changes the leftover into the next place. Read the number it makes there."],
    closing: "Each leftover is written small beside the next digit and joins it.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: each leftover joins the next digit as one number.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The check rebuilds the child's answer beside the dividend; then each leftover is written small beside the next digit, the two light together as one number while the tag names it, and the long lane writes the step in full, ending on the quotient and remainder.",
    items: [
      /* learn ML2: answer in the plan = 85 remainder 1 */
      { qid: "M2.S3.T6.C21:ML2", kind: "div", dividend: 596, divisor: 7, parts: SD_QR, near: "80|6", winMs: sdWin(596, 7),
        say: "Find 596 divided by 7 by short division.", ask: "596 ÷ 7 = ?", answer: [85, 1], miss: "What was left after the tens step, and where did it go?" },
      /* practice 3: answer in the plan = 15, and 2 tens are carried from the 7 to join the 5 ones, making 25 */
      { qid: "M2.S3.T6.C21:3", kind: "div", dividend: 75, divisor: 5, parts: [{ label: "quotient" }, { label: "carried" }], second: "carried", near: "11|2", winMs: sdWin(75, 5),
        say: "Find 75 divided by 5 by short division, and say what is carried.", ask: "75 ÷ 5 = ?", answer: [15, 2], miss: "What was left after dividing the tens, and which digit does it sit beside?" },
      /* practice 4: answer in the plan = 142 remainder 1, with 2 carried to the tens and 1 carried to the ones */
      { qid: "M2.S3.T6.C21:4", kind: "div", dividend: 853, divisor: 6, parts: SD_QR, near: "100|3", winMs: sdWin(853, 6),
        say: "Find 853 divided by 6 by short division.", ask: "853 ÷ 6 = ?", answer: [142, 1], miss: "Each step leaves something. Did you join it to the next digit every time?" },
    ],
  },
  {
    n: 3,
    concept: "A zero still has to be written",
    conceptId: "M2.S3.T6.C22", objectiveIds: ["O10"],
    says: ["Is this number smaller than the divisor? Then what goes underneath?"],
    /* tries, as the plan writes it: First rung, from the item: what number is being divided under this cell, with the small leftover joined on? Second rung, the phase's: is it smaller than the divisor? Third rung: the times table card lights its first fact only, and the child says whether even that one fits. The zero key stays open, and the guard still reads it. */
    ladder: ["Is it smaller than the divisor?", "Try the divisor times one. If even that does not fit, a zero goes underneath."],
    closing: "A zero goes in the quotient whenever the number is smaller than the divisor, and only then.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: write a zero when the number is smaller than the divisor.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The check rebuilds the child's answer; then each step is weighed against the divisor with its fitting fact lit on the table card, a grey zero goes in only where the number is smaller (the long lane says no sixes), and the strip ends on the whole quotient and remainder.",
    items: [
      /* learn ML3: answer in the plan = Only the zero in the hundreds is right, because 2 hundreds is smaller than 6. The quotient is 1045, remainder 5 */
      { qid: "M2.S3.T6.C22:ML3", kind: "div", dividend: 6275, divisor: 6, parts: SD_QR, near: "1000|5", theirs: { who: "Ravi", cells: ["1", "0", "0", "0"] }, winMs: sdWin(6275, 6) + 600,
        say: "Ravi works 6,275 divided by 6. He writes a zero at every step that leaves something over. Which zero is right? Find the real quotient and remainder.",
        ask: "6,275 ÷ 6 = ? Check Ravi's", answer: [1045, 5], miss: "A step with something left over can still fit the divisor. Which numbers were really smaller than it?" },
      /* practice 5: answer in the plan = 603. The 2 tens are smaller than 8, so a zero goes in the tens place of the quotient */
      { qid: "M2.S3.T6.C22:5", kind: "div", dividend: 4824, divisor: 8, near: 63, winMs: sdWin(4824, 8),
        say: "Find 4,824 divided by 8 by short division.", ask: "4,824 ÷ 8 = ?", answer: 603, miss: "After the hundreds step, what number stands in the tens, and does eight fit into it?" },
      /* practice 6: answer in the plan = The quotient is 1030, remainder 5: zeros go under the 2 and under the 5, because each is smaller than 7 when its turn comes */
      { qid: "M2.S3.T6.C22:6", kind: "div", dividend: 7215, divisor: 7, parts: SD_QR, near: "13|5", winMs: sdWin(7215, 7),
        say: "Find 7,215 divided by 7 by short division.", ask: "7,215 ÷ 7 = ?", answer: [1030, 5], miss: "Every place gets a digit. What goes under a number smaller than the divisor?" },
    ],
  },
  {
    n: 4,
    concept: "Long or short, the same answer",
    conceptId: "M2.S3.T6.C23", objectiveIds: ["O10"],
    says: ["Do it both ways. Do the answers match?"],
    /* tries, as the plan writes it: First rung, from the item: do the first digits of both lanes match? Second rung, the phase's: at which step do the lanes first part? Third rung: both lanes are cut to a two-digit dividend with one carry, and the child works them side by side. The number pad stays open. */
    ladder: ["At which step do the two lanes first part?", "Work that one step again in both lanes, and say it with its place name."],
    closing: "Long and short division give the same quotient and remainder.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: long and short ways give the same quotient and remainder.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The check rebuilds the child's answer beside the dividend; then both lanes are worked step by step, each quotient digit lighting in the strip and the long lane together, and the two remainders end level.",
    items: [
      /* learn ML4: answer in the plan = Yes. Both give 157 remainder 5 */
      { qid: "M2.S3.T6.C23:ML4", kind: "div", dividend: 947, divisor: 6, parts: SD_QR, near: "151|1", winMs: sdWin(947, 6),
        say: "Find 947 divided by 6 by long division and by short division. Do the two answers match?", ask: "947 ÷ 6 = ? Both ways", answer: [157, 5], miss: "Do the first digits of both lanes match? Then look at the next step." },
      /* practice 7: answer in the plan = It should be 608 remainder 6. The long way shows that 7 tens is smaller than 9, so a zero goes in the tens of the quotient; 9 times 608 is 5472, add 6 makes 5478 */
      { qid: "M2.S3.T6.C23:7", kind: "div", dividend: 5478, divisor: 9, parts: SD_QR, near: "68|6", theirs: { who: "Meena", cells: ["", "6", "", "8"], r: 6 }, winMs: sdWin(5478, 9) + 600,
        say: "Meena divides 5,478 by 9 the short way. She gets 68 remainder 6. Check it the long way and correct it.", ask: "5,478 ÷ 9 = ? Check Meena's", answer: [608, 6], miss: "Which step of the long way did Meena's short way skip?" },
      /* practice 8: answer in the plan = 791 both ways. The short way carries 3 into the hundreds, making 31, and 3 into the tens, making 36 */
      { qid: "M2.S3.T6.C23:8", kind: "div", dividend: 3164, divisor: 4, near: 716, winMs: sdWin(3164, 4),
        say: "Find 3,164 divided by 4 both ways. Then look at the small numbers the short way carries.", ask: "3,164 ÷ 4 = ? Both ways", answer: 791, miss: "Did the short way carry what was left after the hundreds into the tens?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  strip: { divisorCell: 110, digitCell: 150, places: SD_PLACE },
  lanes: ["the short strip: divisor behind its bar, dividend under place headings, quotient row, remainder",
    "the long lane: one row per step (number in hand with its place name, quotient digit, multiple taken away, what is left)",
    "the check: quotient × divisor + remainder = dividend"],
  colours: { dividend: SD_BLUE, divisor: SD_AMBER, quotient: SD_GREEN, leftover: SD_VERM, multiple: SD_ROSE, zero: SD_ZERO },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work:
   take away chunks of the divisor (thousands, hundreds, tens, ones of it) from the dividend */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const d = it.divisor, want = Array.isArray(it.answer) ? it.answer : [it.answer];
  let q = 0, r = it.dividend;
  for (let k = 4; k >= 0; k--) { const chunk = d * Math.pow(10, k); while (r >= chunk) { r -= chunk; q += Math.pow(10, k); } }
  if (it.second === "carried") { let t = Math.floor(it.dividend / 10); while (t >= d) t -= d; return want[0] === q && r === 0 && want[1] === t; }
  if (it.parts) return want[0] === q && want[1] === r && q * d + r === it.dividend;
  return want[0] === q && r === 0;
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => (item.near !== undefined ? item.near
  : item.parts ? item.answer.map((x: number, k: number) => (k === item.answer.length - 1 ? x + 1 : x)).join("|")
  : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: e.g. drop a token that waits; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* a check column: quotient × divisor (+ remainder) = the number it rebuilds */
const sdCheckOf = (q: number, d: number, r: number | null, carry: number | null = null) => ({ q, d, r, carry, total: q * d + (r || 0) });
/* the child's answer, rebuilt (null when it cannot be read) */
const sdMine = (item: any, v: any) => {
  if (item.parts) {
    const p = slotPartsOf(v, item.parts.length), q = p[0] === "" ? NaN : Number(p[0]);
    if (!isFinite(q)) return null;
    if (item.second === "carried") return sdCheckOf(q, item.divisor, null, p[1] === "" ? null : Number(p[1]));
    return sdCheckOf(q, item.divisor, p[1] === "" ? 0 : Number(p[1]));
  }
  const q = leadNumber(v);
  return q === null || !isFinite(q) ? null : sdCheckOf(q, item.divisor, null);
};

/* ── geometry of the working area (1086 x 528) ── */
const SD_G = { cardW: 160, divX: 186, divW: 110, barX: 310, x0: 322, cw: 150, cellY: 46, cellH: 100, lineY: 152, qY: 158, qH: 68,
  theirsY: 266, laneX: 176, laneW: 624, laneTop: 238, laneTopP: 284, rowH: 48, chkX: 812, chkW: 274, chkA: 936, chkB: 1072 };
const sdCellX = (k: number) => SD_G.x0 + k * SD_G.cw;
const sdTextW = (s: string, size: number) => s.length * size * 0.56;

/* ── the working area: 1086 x 528, origin at its top-left ────────────────────────────────────
   Countable things use CONTENT colours (url(#gHundred|gTen|gOne|gBead|gPointer)); coloured numerals
   and words use a deeper ink, shade(colour, 0.25), so they read at 4.5:1. Type uses T.* only.
   Pieces: drag = useDrag(onDrop) then {...control(id, label), ...drag.bind(pay), ...drag.keys(pay)};
   taps = <Hit id x y w h onPress label />. One <Invite/> marks the one thing to touch.
   Nothing is written here that the voice already says. `wrong` = { value, tries } after a miss:
   lock, redraw the mathematics in steps (the traceback), unlock; never mark it, never reset it.
   stage === "free" is Free play (the plan's writeup.freePlay): no target, every control unlocked. */
function Work({ phase, n, item, index, stage, wrong, typed, part, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const it = item || {};
  const [hand, setHand] = useState(-1);        /* the step in hand: its cells light, the tag names it */
  const [shown, setShown] = useState(0);       /* steps worked so far */
  const [card, setCard] = useState(0);         /* the table card's lit fact (0 = none) */
  const [seen, setSeen] = useState<number[]>([]); /* facts lit so far: only these show their product */
  const [end, setEnd] = useState(false);       /* the remainders stand level */
  const [chkA, setChkA] = useState<any>(null); /* the child's (or the other child's) answer, rebuilt */
  const [chkB, setChkB] = useState(false);     /* the right answer, rebuilt */
  const [named, setNamed] = useState(-1);      /* a digit tapped: the tag names it with its place */
  const [touched, setTouched] = useState(false);
  const [fd, setFd] = useState<number[]>([5, 9, 6]);  /* free play: the dividend's digits */
  const [fdv, setFdv] = useState(7);                  /* free play: the divisor */
  const setupFor = useRef("");
  const busy = tl.busy;

  const N = free ? Number(fd.join("")) : it.dividend || 596;
  const D = free ? fdv : it.divisor || 7;
  const steps = sdSteps(N, D);
  const L = steps.length;
  const theirs = !free && it.theirs ? it.theirs : null;
  const laneTop = theirs ? SD_G.laneTopP : SD_G.laneTop;
  const second = it.parts ? it.second || "remainder" : null;

  const clearRun = () => { setHand(-1); setShown(0); setCard(0); setSeen([]); setEnd(false); setChkA(null); setChkB(false); };

  /* Enter and choice taps go straight to the slot: every answer here is typed */
  api.onEnter(null);

  /* a new question (or a restart) starts clean */
  const itemKey = free ? "free" : `${n}:${index}`;
  useEffect(() => {
    if (free) return;
    if (stage === "teach" || (stage === "ask" && setupFor.current !== itemKey)) {
      setupFor.current = stage === "ask" ? itemKey : "";
      tl.stop(); clearRun(); setNamed(-1); setTouched(false); api.lock(false);
    }
  }, [stage, itemKey]);

  /* free play: a division on the strip to change and work, nothing to get right */
  useEffect(() => {
    if (!free) return;
    setupFor.current = "free";
    tl.stop(); clearRun(); setNamed(-1); setFd([5, 9, 6]); setFdv(7); api.lock(false);
  }, [free]);

  /* the working, step by step: the tag names the number in hand (the small leftover and the digit
     light together), then the quotient digit settles in the strip and in the long lane at once, the
     fact used lights on the card, and what is left is written small beside the next digit */
  const workSteps = (st: any[], slow: number) => {
    const S: any[] = [];
    const add = (ms: number, fn: () => void) => S.push([Math.round(ms * slow), fn]);
    st.forEach((s: any, i: number) => {
      if (s.lead) { add(SD_MS.lead, () => { setHand(i); setShown(i + 1); setCard(0); }); return; }
      add(SD_MS.hand, () => { setHand(i); setCard(0); });
      add(SD_MS.settle, () => { setShown(i + 1); setCard(s.q); if (s.q > 0) setSeen((a) => (a.includes(s.q) ? a : a.concat(s.q))); api.sfx.tick(); });
    });
    add(SD_MS.end, () => { setHand(-1); setCard(0); setEnd(true); });
    add(SD_MS.chk, () => setChkB(true));
    return S;
  };
  const theirsCheck = () => {
    if (!theirs) return null;
    const q = Number(theirs.cells.join("")) || 0;
    return { who: theirs.who + "'s", ...sdCheckOf(q, D, theirs.r === undefined ? null : theirs.r) };
  };

  /* a right answer: the strip works itself and the long lane writes the same steps */
  useEffect(() => {
    if (stage !== "win" || free) return;
    clearRun(); setNamed(-1);
    const t = theirsCheck();
    tl.run([[t ? 700 : 200, () => { if (t) setChkA(t); }], ...workSteps(steps, 1)]);
  }, [stage]);

  /* ── the traceback: the child's answer rebuilt, then every step redrawn, ending on the whole
     right answer; nothing marked, nothing cleared from the slot ── */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    api.lock(true);
    setTouched(true); setNamed(-1); clearRun();
    const mine = sdMine(it, wrong.value);
    const fits = mine && Math.max(indian(mine.q).length, indian(mine.total).length + 2) <= 8;
    tl.run([[200, () => { if (fits) setChkA({ who: "yours", ...mine }); }], [fits ? 1000 : 200, () => {}], ...workSteps(steps, 1.2)],
      () => api.lock(false));
  }, [wrong]);

  /* free play controls */
  const bump = (k: number) => {
    if (busy) return;
    clearRun(); setNamed(k);
    setFd((a) => { const b = a.slice(); b[k] = k === 0 ? (b[k] % 9) + 1 : (b[k] + 1) % 10; return b; });
  };
  const nextDivisor = () => { if (busy) return; clearRun(); setNamed(-1); setFdv((v) => (v >= 9 ? 2 : v + 1)); };
  const newSum = () => {
    if (busy) return;
    clearRun(); setNamed(-1);
    const len = 2 + Math.floor(Math.random() * 3);
    setFd(Array.from({ length: len }, (_, k) => (k === 0 ? 1 + Math.floor(Math.random() * 9) : Math.floor(Math.random() * 10))));
    setFdv(2 + Math.floor(Math.random() * 8));
  };
  const divideNow = () => { if (busy) return; clearRun(); setNamed(-1); tl.run(workSteps(steps, 1)); };
  const nameDigit = (k: number) => { if (busy) return; setTouched(true); setNamed(k); };

  /* ── what the host and the agent read back (toolApi.getState): only what the strip shows ── */
  const done = (j: number) => j < shown && !steps[j].lead;
  api.share({
    dividend: N, divisor: D, cell: hand,
    carried: steps.filter((s: any, j: number) => done(j) && j < L - 1 && s.left > 0).map((s: any) => s.left),
    quotientDigits: steps.filter((s: any, j: number) => done(j)).map((s: any) => s.q),
    longLane: steps.filter((s: any, j: number) => done(j)).map((s: any) => ({ number: s.num, place: SD_PLACE[s.place], q: s.q, take: s.take, left: s.left })),
    remainderShown: end, second,
  });

  /* ── drawing ── */
  const blueInk = sdInk(SD_BLUE), amberInk = sdInk(SD_AMBER), greenInk = sdInk(SD_GREEN), roseInk = sdInk(SD_ROSE), vermInk = sdInk(SD_VERM);
  const stripEnd = sdCellX(L);
  const remX = stripEnd + 16;
  const live = (stage === "ask" || free) && !busy;
  const typedEmpty = String(typed || "").replace(/\|/g, "") === "";
  /* the empty cells that the box with the caret will fill take the accent edge */
  const typingQ = stage === "ask" && !free && !busy && shown === 0 && (!it.parts || !part);
  const typingR = stage === "ask" && !free && !busy && !end && !!it.parts && part === 1 && second === "remainder";
  const invite = stage === "ask" && !free && index === 0 && !touched && !wrong && !busy && typedEmpty
    ? { x: sdCellX(0) + SD_G.cw / 2, y: SD_G.cellY + SD_G.cellH / 2, r: 50 } : null;

  /* the tag: the number in hand, with its place name (the small leftover in vermilion) */
  const tagOf = () => {
    if (hand >= 0 && steps[hand]) {
      const s = steps[hand];
      const from = s.fromLead ? hand - 1 : hand;
      const carried = s.carryIn > 0 && !s.fromLead;
      const parts = carried ? [{ t: String(s.carryIn), f: vermInk }, { t: String(s.digit), f: blueInk }] : [{ t: String(s.num), f: blueInk }];
      return { from, to: hand, parts, place: tx(sdPlaceName(s.num, s.place)) };
    }
    if (named >= 0 && steps[named]) {
      const s = steps[named];
      return { from: named, to: named, parts: [{ t: String(s.digit), f: blueInk }], place: tx(sdPlaceName(s.digit, s.place)) };
    }
    return null;
  };
  const tag = tagOf();
  const tagBox = tag ? (() => {
    const label = tag.parts.map((p: any) => p.t).join("") + " " + tag.place;
    const w = sdTextW(label, T.label) + 32;
    const cx = (sdCellX(tag.from) + sdCellX(tag.to + 1)) / 2;
    return { x: Math.max(SD_G.divX, Math.min(1084 - w, cx - w / 2)), w };
  })() : null;

  const laneRows = steps.map((s: any, j: number) => ({ s, j })).filter((r: any) => !r.s.lead);
  const rowY = (r: number) => laneTop + 64 + r * SD_G.rowH;
  const laneQx = SD_G.laneX + 254;
  const litRow = hand >= 0 && done(hand) ? laneRows.findIndex((r: any) => r.j === hand) : -1;
  const lastRow = laneRows.length - 1;

  const checkCol = (c: any, right: number, label: string, key: string) => {
    if (!c) return null;
    const lines: any[] = [{ t: indian(c.q), f: greenInk }, { t: "× " + c.d, f: amberInk }];
    if (c.r !== null && c.r !== undefined) lines.push({ t: "+ " + c.r, f: vermInk });
    lines.push({ t: "= " + indian(c.total), f: blueInk });
    if (c.carry !== null && c.carry !== undefined) lines.push({ t: tx("carry") + " " + c.carry, f: vermInk, small: true });
    const top = laneTop;
    return (
      <g key={key}>
        <text x={right - 62} y={top + 32} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(label)}</text>
        {lines.map((l: any, i: number) => (
          <text key={i} x={right} y={top + 76 + i * 38} textAnchor="end" fontSize={l.small ? T.micro : T.label} fontWeight={700} fill={l.f}>{l.t}</text>
        ))}
      </g>
    );
  };

  return (
    <g>
      {/* the times table card: read, never tapped; a product shows only once its fact has lit in a step
          (before the answer it would print a quotient: 5 × 3 = 15 for 75 ÷ 5); free play shows them all */}
      <g>
        <rect x={0} y={0} width={SD_G.cardW} height={528} rx={RAD.panel} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={2} />
        <text x={SD_G.cardW / 2} y={38} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{lang === "hi" ? `${D} का पहाड़ा` : lang === "gu" ? `${D} નો ઘડિયો` : `${D} times`}</text>
        {Array.from({ length: 9 }, (_, i) => {
          const m = i + 1, y = 56 + i * 52, on = card === m, known = free || on || seen.includes(m);
          return (
            <g key={m}>
              {on && <rect x={8} y={y + 3} width={SD_G.cardW - 16} height={46} rx={12} fill={tint(SD_ROSE, 0.72)} stroke={roseInk} strokeWidth={3} />}
              <text x={20} y={y + 36} fontSize={T.micro} fontWeight={500} fill={C.ink}>{`× ${m}`}</text>
              {known ? <text x={SD_G.cardW - 18} y={y + 37} textAnchor="end" fontSize={T.label} fontWeight={700} fill={on ? roseInk : C.ink}>{String(m * D)}</text>
                : <path d={`M ${SD_G.cardW - 58} ${y + 36} H ${SD_G.cardW - 18}`} stroke={C.rule} strokeWidth={3} strokeDasharray="6 6" strokeLinecap="round" />}
            </g>
          );
        })}
      </g>

      {/* the tag row: the number in hand with its place name */}
      {tag && tagBox && (() => {
        const { x, w } = tagBox;
        return (
          <g>
            <rect x={x} y={2} width={w} height={40} rx={20} fill="#FFFFFF" stroke={C.accent} strokeWidth={3} />
            <text x={x + w / 2} y={33} textAnchor="middle" fontSize={T.label} fontWeight={700}>
              {tag.parts.map((p: any, i: number) => <tspan key={i} fill={p.f}>{p.t}</tspan>)}
              <tspan fill={C.ink}>{" " + tag.place}</tspan>
            </text>
          </g>
        );
      })()}

      {/* the strip: the divisor behind its bar, the dividend's digits under their place headings */}
      <rect x={SD_G.divX} y={SD_G.cellY} width={SD_G.divW} height={SD_G.cellH} rx={14} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      <text x={SD_G.divX + SD_G.divW / 2} y={SD_G.cellY + 76} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={amberInk}>{String(D)}</text>
      {steps.map((s: any, k: number) => {
        const x = sdCellX(k), cx = x + SD_G.cw / 2;
        const lit = (hand >= 0 && tag && k >= tag.from && k <= tag.to) || (hand < 0 && named === k);
        const small = k > 0 && done(k - 1) && steps[k - 1].left > 0 ? steps[k - 1].left : null;
        const head = lang === "en" ? SD_PLACE[s.place] : tx(SD_PLACE1[s.place]), hw = sdTextW(head, T.micro) / 2;   /* a heading names the place: सैकड़ा, not सैकड़े */
        const underTag = tagBox && cx + hw > tagBox.x && cx - hw < tagBox.x + tagBox.w;
        return (
          <g key={"d" + k}>
            <rect x={x + 5} y={SD_G.cellY} width={SD_G.cw - 10} height={SD_G.cellH} rx={14} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
            {lit && <rect x={x + 1} y={SD_G.cellY - 4} width={SD_G.cw - 2} height={SD_G.cellH + 8} rx={17} fill="none" stroke={C.accent} strokeWidth={4} pointerEvents="none" />}
            {!underTag && <text x={cx} y={34} textAnchor="middle" fontSize={T.micro} fontWeight={500} fill={C.ink}>{head}</text>}
            <text x={cx} y={SD_G.cellY + 76} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={blueInk}>{String(s.digit)}</text>
            {small !== null && <text x={x + 28} y={SD_G.cellY + 40} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={vermInk}>{String(small)}</text>}
          </g>
        );
      })}
      <path d={`M ${SD_G.barX} ${SD_G.cellY} V ${SD_G.lineY} H ${stripEnd}`} fill="none" stroke={CONTENT.line} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />

      {/* the quotient row: one cell under each digit; each quotient digit settles under its digit */}
      {steps.map((s: any, k: number) => {
        const x = sdCellX(k) + 20, w = SD_G.cw - 40, has = done(k);
        const pair = litRow >= 0 && hand === k;
        return (
          <g key={"q" + k}>
            <rect x={x} y={SD_G.qY} width={w} height={SD_G.qH} rx={12} fill={has ? "#FFFFFF" : "none"} stroke={has ? tint(SD_GREEN, 0.35) : typingQ ? C.accent : C.rule} strokeWidth={!has && typingQ ? 3 : 2} strokeDasharray={has ? undefined : "8 8"} />
            {pair && <rect x={x - 4} y={SD_G.qY - 4} width={w + 8} height={SD_G.qH + 8} rx={15} fill="none" stroke={C.accent} strokeWidth={4} pointerEvents="none" />}
            {has && <text x={x + w / 2} y={SD_G.qY + 54} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={s.q === 0 ? SD_ZERO : greenInk}>{String(s.q)}</text>}
          </g>
        );
      })}
      {/* the remainder, at the right-hand end of the quotient row */}
      <text x={remX + 58} y={SD_G.lineY - 8} textAnchor="middle" fontSize={T.micro} fontWeight={500} fill={C.ink}>{tx("remainder")}</text>
      <rect x={remX} y={SD_G.qY} width={116} height={SD_G.qH} rx={12} fill={end ? "#FFFFFF" : "none"} stroke={end ? tint(SD_VERM, 0.35) : typingR ? C.accent : C.rule} strokeWidth={!end && typingR ? 3 : 2} strokeDasharray={end ? undefined : "8 8"} />
      {end && <rect x={remX - 4} y={SD_G.qY - 4} width={124} height={SD_G.qH + 8} rx={15} fill="none" stroke={C.accent} strokeWidth={4} pointerEvents="none" />}
      {end && <text x={remX + 58} y={SD_G.qY + 54} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={vermInk}>{String(steps[L - 1].left)}</text>}

      {/* another child's quotient row, when the question gives one */}
      {theirs && (
        <g>
          <text x={SD_G.barX - 14} y={SD_G.theirsY - 2} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(theirs.who + "'s")}</text>
          {theirs.cells.map((c: string, k: number) => c === "" ? null : (
            <text key={k} x={sdCellX(k) + SD_G.cw / 2} y={SD_G.theirsY} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{c}</text>
          ))}
          {theirs.r !== undefined && <text x={remX + 58} y={SD_G.theirsY} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{String(theirs.r)}</text>}
        </g>
      )}

      {/* the long lane: the same division in full, one row per step */}
      <rect x={SD_G.laneX} y={laneTop} width={SD_G.laneW} height={528 - laneTop} rx={RAD.panel} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={2} />
      <text x={SD_G.laneX + 20} y={laneTop + 32} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("long way")}</text>
      {laneRows.map((r: any, i: number) => {
        if (!done(r.j)) return null;
        const s = r.s, yc = rowY(i), carried = s.carryIn > 0 && !s.fromLead;
        return (
          <g key={"l" + r.j}>
            <text x={SD_G.laneX + 20} y={yc + 11} fontSize={T.label} fontWeight={700}>
              {carried ? <tspan fill={vermInk}>{String(s.carryIn)}</tspan> : null}
              <tspan fill={blueInk}>{carried ? String(s.digit) : String(s.num)}</tspan>
              <tspan fill={C.ink} fontWeight={500}>{" " + tx(sdPlaceName(s.num, s.place))}</tspan>
            </text>
            <rect x={laneQx - 28} y={yc - 21} width={56} height={42} rx={10} fill="#FFFFFF" stroke={tint(SD_GREEN, 0.35)} strokeWidth={2} />
            {litRow === i && <rect x={laneQx - 33} y={yc - 26} width={66} height={52} rx={13} fill="none" stroke={C.accent} strokeWidth={4} pointerEvents="none" />}
            <text x={laneQx} y={yc + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={s.q === 0 ? SD_ZERO : greenInk}>{String(s.q)}</text>
            <text x={SD_G.laneX + 304} y={yc + 11} fontSize={T.label} fontWeight={700} fill={roseInk}>{s.q === 0 ? (lang === "hi" ? `${D} नहीं` : lang === "gu" ? `${D} નહીં` : `no ${D}s`) : `− ${s.take}`}</text>
            <text x={SD_G.laneX + 430} y={yc + 11} fontSize={T.label} fontWeight={700} fill={vermInk}>{lang === "hi" ? `${s.left} बचे` : lang === "gu" ? `${s.left} વધ્યા` : `${s.left} left`}</text>
            {end && i === lastRow && <rect x={SD_G.laneX + 420} y={yc - 26} width={150} height={52} rx={13} fill="none" stroke={C.accent} strokeWidth={4} pointerEvents="none" />}
          </g>
        );
      })}

      {/* the check: quotient × divisor + remainder rebuilds the dividend */}
      {(chkA || chkB) && (
        <g>
          <rect x={free ? SD_G.chkX + 136 : SD_G.chkX} y={laneTop} width={free ? SD_G.chkW - 136 : SD_G.chkW} height={528 - laneTop} rx={RAD.panel} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={2} />
          {checkCol(chkA, SD_G.chkA, chkA ? chkA.who : "", "a")}
          {chkB && checkCol(sdCheckOf(steps.filter((s: any) => !s.lead).reduce((a: number, s: any) => a * 10 + s.q, 0), D,
            free || !it.parts || second === "carried" ? (free && steps[L - 1].left > 0 ? steps[L - 1].left : null) : steps[L - 1].left,
            second === "carried" ? (steps.find((s: any) => !s.lead) || { left: 0 }).left : null), SD_G.chkB, "answer", "b")}
        </g>
      )}

      {/* taps: a digit names itself with its place (free play: it changes) */}
      {live && steps.map((s: any, k: number) => (
        <Hit key={"h" + k} id={"digit-" + k} label={free ? `Change the ${SD_PLACE[s.place]} digit` : `Name the ${SD_PLACE[s.place]} digit`}
          x={sdCellX(k)} y={SD_G.cellY - 4} w={SD_G.cw} h={SD_G.cellH + 8} onPress={() => (free ? bump(k) : nameDigit(k))} />
      ))}
      {free && !busy && <Hit id="divisor" label={tx("Change the divisor")} x={SD_G.divX} y={SD_G.cellY - 4} w={SD_G.divW} h={SD_G.cellH + 8} onPress={nextDivisor} />}
      {free && (
        <g>
          <Key id="free-divide" label={tx("Divide")} x={SD_G.chkX} y={laneTop + 8} w={128} h={96} C={C} primary disabled={busy} onClick={divideNow}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={busy ? C.ink : "#FFFFFF"}>{tx("Divide")}</text>
          </Key>
          <Key id="free-new" label={tx("A new division")} x={SD_G.chkX} y={laneTop + 124} w={128} h={96} C={C} disabled={busy} onClick={newSum}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("New")}</text>
          </Key>
        </g>
      )}

      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ result, C, w, h, tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last) return null;
  const sh = last.shared || {};
  const a = Array.isArray(last.answer) ? last.answer : [last.answer];
  if (a[0] === undefined || a[0] === null) return null;
  const sum = sh.dividend ? `${indian(sh.dividend)} ÷ ${sh.divisor}` : "";
  const res = a.length > 1 ? (sh.second === "carried" ? `${indian(a[0])}, ${tx("carry")} ${a[1]}` : `${indian(a[0])} ${tx("r")} ${a[1]}`) : indian(a[0]);
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <text x={w - 16} y={32} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{sum}</text>
      <text x={w - 16} y={h - 12} textAnchor="end" fontSize={res.length > 10 ? T.micro : T.label} fontWeight={700} fill={sdInk(SD_GREEN)}>{res}</text>
    </g>
  );
}

function ShortDivisionStrip(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default ShortDivisionStrip;
