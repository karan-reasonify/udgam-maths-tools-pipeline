/* ═══ M2.S4.T6.C20.2D1 · story_to_difference · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "story_to_difference";
const MEDIA_ID = "M2.S4.T6.C20.2D1";
const TOOL_NAME = "Story to Difference";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["Read it right through. What is the question actually asking for?"];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every sentence turned into a taking away, and the numbers with no job are still standing.";
/* said when the child opens Free play from the summary page (free play here: a board of numbers,
   a mat that takes any two and works itself, and the grey bay) */
const FREE_LINE = "Free play. Lift any two numbers onto the mat and watch it take one from the other.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r13+: `lineFor(line, lang, TR)`); the
   English above and below stays what the checks read. The problem board's word pieces are keyed one by
   one (a piece may carry the next number's words, so each line reads in the language's own order), and
   the answer sentences by their "{n}" template. ₹ is read as रुपये / રૂપિયા, L and km as words. Digits
   stay digits: the runtime speaks them in the language in use. A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Story to Difference": "कहानी से अंतर",
    "Read it right through. What is the question actually asking for?": "पूरा पढ़ो। सवाल असल में क्या पूछ रहा है?",
    "Every sentence turned into a taking away, and the numbers with no job are still standing.": "हर वाक्य घटाने में बदला, और बिना काम की संख्याएँ वहीं खड़ी हैं।",
    "Free play. Lift any two numbers onto the mat and watch it take one from the other.": "मुक्त खेल। कोई भी दो संख्याएँ चटाई पर रखो और देखो वह एक में से दूसरी घटाती है।",
    "Find the two numbers the question is about": "सवाल की दो संख्याएँ ढूँढो",
    "Say what you are being asked for before you touch a number.": "किसी संख्या को छूने से पहले बताओ कि क्या पूछा गया है।",
    "Pick the card that says what is asked. Then bring its two numbers down to the mat.": "वह कार्ड चुनो जो बताता है कि क्या पूछा गया है। फिर उसकी दो संख्याएँ चटाई पर लाओ।",
    "Which two amounts does it compare?": "यह किन दो मात्राओं की तुलना करता है?",
    "Read only the last sentence. Which number goes on top?": "बस आखिरी वाक्य पढ़ो। कौन सी संख्या ऊपर जाएगी?",
    "Say what is being asked, and find the two amounts it is about. Put the greater one on top and take the other off it.": "बताओ क्या पूछा गया है, और उसकी दो मात्राएँ ढूँढो। बड़ी को ऊपर रखो और उसमें से दूसरी घटाओ।",
    "You learned: say what is asked, then put the greater number on top.": "तुमने सीखा: पहले बताओ क्या पूछा है, फिर बड़ी संख्या ऊपर रखो।",
    "A tank held 48,250 L of water, and 26,190 L was used. How much is left?": "एक टंकी में 48,250 लीटर पानी था, और 26,190 लीटर खर्च हुआ। कितना बचा?",
    "Water left?": "कितना पानी बचा?",
    "Was water put into the tank, or taken out of it?": "टंकी में पानी डाला गया, या उसमें से निकाला गया?",
    "A library had 18,420 books, and 7,315 were lent out. How many are left on the shelves?": "एक पुस्तकालय में 18,420 किताबें थीं, और 7,315 पढ़ने को दी गईं। अलमारियों में कितनी बचीं?",
    "Books left?": "कितनी किताबें बचीं?",
    "What does your question card say?": "तुम्हारा सवाल कार्ड क्या कहता है?",
    "One town has 36,940 people, and another has 21,508. How many more people has the first town?": "एक शहर में 36,940 लोग हैं, और दूसरे में 21,508। पहले शहर में कितने लोग ज़्यादा हैं?",
    "How many more?": "कितने ज़्यादा?",
    "Does how many more ask you to join the towns, or to compare them?": "कितने ज़्यादा का मतलब शहरों को जोड़ना है, या उनकी तुलना करना?",
    "Some numbers are printed to be left out": "कुछ संख्याएँ छोड़ने के लिए ही छपी होती हैं",
    "One of these numbers has no job here. Which one?": "इनमें से एक संख्या का यहाँ कोई काम नहीं। कौन सी?",
    "Drag the number with no job into the grey bay. Bring the other two down to the mat.": "बिना काम की संख्या को स्लेटी डिब्बे में खींचो। बाकी दो को चटाई पर लाओ।",
    "Does this number help to answer it?": "क्या यह संख्या उत्तर देने में मदद करती है?",
    "Read one sentence at a time. Does its number answer your question card?": "एक-एक वाक्य पढ़ो। क्या उसकी संख्या तुम्हारे सवाल कार्ड का जवाब देती है?",
    "Work out what is being asked first. Bring down only the numbers that answer it, and leave the spare one standing.": "पहले समझो क्या पूछा गया है। बस वही संख्याएँ लाओ जो उसका उत्तर दें, और फालतू को वहीं छोड़ दो।",
    "You learned: bring down only the numbers the question needs.": "तुमने सीखा: बस वही संख्याएँ लाओ जो सवाल को चाहिए।",
    "A train with 24 coaches carried 3,845 passengers, and 1,672 of them were children. How many were not children?": "24 डिब्बों वाली एक ट्रेन में 3,845 यात्री थे, और उनमें से 1,672 बच्चे थे। कितने बच्चे नहीं थे?",
    "Not children?": "बच्चे नहीं?",
    "Do the coaches tell you anything about who was riding?": "क्या डिब्बे बताते हैं कि कौन सफ़र कर रहा था?",
    "A depot 15 km from the town ran 2,640 trips in March, and 1,925 trips in April. How many more trips ran in March?": "शहर से 15 किलोमीटर दूर एक डिपो ने मार्च में 2,640 फेरे, और अप्रैल में 1,925 फेरे चलाए। मार्च में कितने फेरे ज़्यादा चले?",
    "More trips?": "ज़्यादा फेरे?",
    "Does the distance to the town change how many trips ran?": "क्या शहर की दूरी से फेरों की गिनती बदलती है?",
    "A hall with 500 chairs sold 24,318 tickets in a week. 11,207 of them were used on the first day. How many were used later?": "500 कुर्सियों वाले एक हॉल ने एक हफ़्ते में 24,318 टिकट बेचे। उनमें से 11,207 पहले दिन इस्तेमाल हुए। बाद में कितने इस्तेमाल हुए?",
    "Used later?": "बाद में इस्तेमाल?",
    "What does your question card ask for?": "तुम्हारा सवाल कार्ड क्या पूछता है?",
    "Shrink the question until you can see it": "सवाल को छोटा करो, जब तक वह साफ़ न दिखे",
    "Try the same question with tiny numbers. What did you do to those?": "यही सवाल छोटी संख्याओं से करके देखो। उनके साथ तुमने क्या किया?",
    "Pick the card that says what is asked. Then open the tiny version.": "वह कार्ड चुनो जो बताता है कि क्या पूछा गया है। फिर छोटा रूप खोलो।",
    "Which move did the tiny numbers need?": "छोटी संख्याओं को कौन सी चाल चाहिए थी?",
    "Open the tiny version. Copy its move onto the big numbers.": "छोटा रूप खोलो। उसकी चाल बड़ी संख्याओं पर करो।",
    "An amount needed to reach a target is the target take away what is already there. Shrinking the numbers shows you why.": "लक्ष्य तक पहुँचने के लिए, लक्ष्य में से जो पहले से है वह घटाओ। संख्याएँ छोटी करने से पता चलता है क्यों।",
    "You learned: to reach a target, take what is there from the target.": "तुमने सीखा: लक्ष्य तक पहुँचने के लिए, लक्ष्य में से जो है वह घटाओ।",
    "Here is 52,640. What should be added to it to make 90,000?": "यह 52,640 है। 90,000 बनाने के लिए इसमें क्या जोड़ें?",
    "What to add?": "क्या जोड़ें?",
    "Added to 52,640, your number should make 90,000. Would it?": "52,640 में जोड़ने पर तुम्हारी संख्या से 90,000 बनना चाहिए। क्या बनेगा?",
    "Here is 14,672. What should be added to it to make 30,000?": "यह 14,672 है। 30,000 बनाने के लिए इसमें क्या जोड़ें?",
    "What would this question look like with single digit numbers?": "एक अंक वाली संख्याओं के साथ यह सवाल कैसा दिखेगा?",
    "A builder needs 40,000 bricks, and already has 27,516. How many more must be bought?": "एक मिस्त्री को 40,000 ईंटें चाहिए, और उसके पास पहले से 27,516 हैं। और कितनी खरीदनी होंगी?",
    "Bricks to buy?": "कितनी ईंटें खरीदें?",
    "Can the bricks to buy be more than the builder needs?": "क्या खरीदी जाने वाली ईंटें ज़रूरत से ज़्यादा हो सकती हैं?",
    "Two steps need an order": "दो चरणों का एक क्रम होता है",
    "Two steps here. Which one has to happen first, and why?": "यहाँ दो चरण हैं। पहले कौन सा होना चाहिए, और क्यों?",
    "Tap the step that comes first. Then tap it again to work it.": "जो चरण पहले आता है, उस पर टैप करो। फिर हल करने के लिए दोबारा टैप करो।",
    "Which of the two could you do right now with the numbers that are printed?": "छपी संख्याओं से तुम अभी दोनों में से कौन सा कर सकते हो?",
    "Work the first step alone. Then use its answer in the second.": "पहला चरण अकेले हल करो। फिर उसका उत्तर दूसरे में लगाओ।",
    "Decide the order of two steps before working either one. Bought together for less? Add first. Priced above another? Take away first.": "कोई भी चरण हल करने से पहले दोनों का क्रम तय करो। साथ में कम दाम पर खरीदा? पहले जोड़ो। किसी और से ज़्यादा दाम? पहले घटाओ।",
    "You learned: decide the order of two steps before working either.": "तुमने सीखा: हल करने से पहले दो चरणों का क्रम तय करो।",
    "A table costs ₹7,480, and a chair costs ₹3,260. The two together are sold for ₹9,950. How much is saved?": "एक मेज़ 7,480 रुपये की है, और एक कुर्सी 3,260 रुपये की। दोनों साथ में 9,950 रुपये में बिकते हैं। कितने बचे?",
    "Money saved?": "कितने पैसे बचे?",
    "Taking one price off the other shows which is dearer. Is that the saving?": "एक दाम में से दूसरा घटाने से पता चलता है कौन महँगा है। क्या वही बचत है?",
    "A fridge costs ₹24,350, which is ₹6,480 more than a washing machine. What do the two cost together?": "एक फ्रिज 24,350 रुपये का है, जो वॉशिंग मशीन से 6,480 रुपये ज़्यादा है। दोनों का कुल दाम क्या है?",
    "Cost together?": "कुल दाम?",
    "Is ₹24,350 the fridge's price, or the washing machine's?": "24,350 रुपये फ्रिज का दाम है, या वॉशिंग मशीन का?",
    "An account held ₹21,308. After a payment came in, the balance was ₹68,908. Then ₹34,500 was spent. Find the payment, and the balance at the end.": "एक खाते में 21,308 रुपये थे। एक रकम जमा होने पर बाकी 68,908 रुपये हो गए। फिर 34,500 रुपये खर्च हुए। जमा रकम, और आखिर में बाकी रकम निकालो।",
    "Payment and balance?": "जमा रकम और बाकी?",
    "What are your two steps, said in words?": "शब्दों में बताओ, तुम्हारे दो चरण क्या हैं?",
    /* the working area's own lines */
    "First pick the card that says what is asked.": "पहले वह कार्ड चुनो जो बताता है कि क्या पूछा गया है।",
    "Read the last line again. Does it ask that?": "आखिरी पंक्ति फिर से पढ़ो। क्या वह यही पूछती है?",
    "The smaller number cannot go on top. Swap them.": "छोटी संख्या ऊपर नहीं जा सकती। दोनों की जगह बदलो।",
    "What did you do to the tiny numbers?": "तुमने छोटी संख्याओं के साथ क्या किया?",
    "Do the same to the big ones.": "बड़ी संख्याओं के साथ भी वही करो।",
    "Work the first step before the second. Tap it.": "दूसरे से पहले पहला चरण हल करो। उस पर टैप करो।",
    "First tap the step that comes first.": "पहले उस चरण पर टैप करो जो पहले आता है।",
    "Drag the number with no job into the grey bay.": "बिना काम की संख्या को स्लेटी डिब्बे में खींचो।",
    "Bring the other two down to the mat.": "बाकी दो को चटाई पर लाओ।",
    "Open the tiny version. Then bring the two numbers down.": "छोटा रूप खोलो। फिर दोनों संख्याएँ नीचे लाओ।",
    "Now bring its two numbers down to the mat.": "अब उसकी दो संख्याएँ चटाई पर लाओ।",
    "Add the columns from the ones.": "इकाई से खाने जोड़ो।",
    "Take the lower number off the top one, from the ones.": "इकाई से, ऊपर वाली में से नीचे वाली संख्या घटाओ।",
    "Then type both answers, one in each box.": "फिर दोनों उत्तर लिखो, हर डिब्बे में एक।",
    "Then type the answer.": "फिर उत्तर लिखो।",
    "The mat holds two numbers. Which one has no job?": "चटाई पर दो संख्याएँ आती हैं। किसका कोई काम नहीं?",
    "The mat holds two numbers. Put one back first.": "चटाई पर दो संख्याएँ आती हैं। पहले एक वापस रखो।",
    "Neither step needs the other's answer, so either can go first.": "किसी चरण को दूसरे का उत्तर नहीं चाहिए, इसलिए कोई भी पहले आ सकता है।",
    "Tap the first step to set it out.": "उसे लगाने के लिए पहले चरण पर टैप करो।",
    "Tap the first step to work it. Tap the second to swap them.": "हल करने के लिए पहले चरण पर टैप करो। बदलने के लिए दूसरे पर।",
    "Take it off what? That amount is not made yet.": "किसमें से घटाओगे? वह रकम अभी बनी ही नहीं।",
    "Add it to what? That price is not found yet.": "किसमें जोड़ोगे? वह दाम अभी मिला ही नहीं।",
    "Work this one out, and type it in its box.": "इसे हल करो, और इसके डिब्बे में लिखो।",
    "The second step is open. Bring its two numbers down to the mat.": "दूसरा चरण खुल गया। उसकी दो संख्याएँ चटाई पर लाओ।",
    "The second step is open.": "दूसरा चरण खुल गया।",
    "Bring its two numbers down to the mat.": "उसकी दो संख्याएँ चटाई पर लाओ।",
    /* the answer sentences ({n} the answer, {p} the payment) */
    "{n} L of water is left.": "{n} लीटर पानी बचा है।",
    "{n} books are left on the shelves.": "अलमारियों में {n} किताबें बची हैं।",
    "The first town has {n} more people.": "पहले शहर में {n} लोग ज़्यादा हैं।",
    "{n} passengers were not children.": "{n} यात्री बच्चे नहीं थे।",
    "{n} more trips ran in March.": "मार्च में {n} फेरे ज़्यादा चले।",
    "{n} tickets were used later.": "{n} टिकट बाद में इस्तेमाल हुए।",
    "{n} should be added to make 90,000.": "90,000 बनाने के लिए {n} जोड़ना होगा।",
    "{n} should be added to make 30,000.": "30,000 बनाने के लिए {n} जोड़ना होगा।",
    "{n} more bricks must be bought.": "{n} ईंटें और खरीदनी होंगी।",
    "₹{n} is saved.": "{n} रुपये बचे।",
    "The two cost ₹{n} together.": "दोनों का कुल दाम {n} रुपये है।",
    "The payment was ₹{p}. ₹{n} is left at the end.": "जमा रकम {p} रुपये थी। आखिर में {n} रुपये बचे।",
    /* the problem board, piece by piece */
    "A tank held": "एक टंकी में", "L of water and": "लीटर पानी था, और", "L was used.": "लीटर खर्च हुआ।",
    "A library had": "एक पुस्तकालय में", "books and": "किताबें थीं, और", "were lent out.": "पढ़ने को दी गईं।",
    "One town has": "एक शहर में", "people and another has": "लोग हैं, और दूसरे में", ".": "।",
    "A train with": "एक ट्रेन के", "coaches carried": "डिब्बों में थे", "passengers.": "यात्री।", "of them were children.": "यात्री बच्चे थे।",
    "A depot": "शहर से", "km from the town ran": "किलोमीटर दूर एक डिपो ने", "trips in March and": "फेरे मार्च में, और", "in April.": "अप्रैल में चलाए।",
    "A hall with": "एक हॉल में", "chairs sold": "कुर्सियाँ, एक हफ़्ते में बिके", "tickets in a week.": "टिकट।", "of them were used on the first day.": "पहले दिन इस्तेमाल हुए।",
    "What should be added to": "संख्या", "to make it": "में क्या जोड़ें कि बने",
    "A builder needs": "एक मिस्त्री को", "bricks and already has": "ईंटें चाहिए, पास में हैं",
    "A table costs": "एक मेज़ का दाम", "and a chair costs": "है, और एक कुर्सी का", "The two together are sold for": "दोनों साथ में लो तो दाम",
    "A fridge costs": "एक फ्रिज का दाम", ", which is": "है, जो वॉशिंग मशीन से", "more than a washing machine.": "ज़्यादा है।",
    "An account held": "एक खाते में", ". A payment came in,": "थे। फिर एक रकम जमा हुई,", "and the balance was": "और बाकी रकम हुई", ". Then": "। फिर", "was spent.": "खर्च हुए।",
    "A shop had": "एक दुकान में थे", "pens and": "पेन और", "pencils.": "पेंसिलें।", "It sold": "उसने बेचे",
    /* the question lines and the question cards */
    "How much is left?": "कितना बचा?", "How many are left on the shelves?": "अलमारियों में कितनी बचीं?",
    "How many more people has the first town?": "पहले शहर में कितने लोग ज़्यादा हैं?", "How many were not children?": "कितने बच्चे नहीं थे?",
    "How many more trips ran in March?": "मार्च में कितने फेरे ज़्यादा चले?", "How many were used later?": "बाद में कितने इस्तेमाल हुए?",
    "How many more must be bought?": "और कितनी खरीदनी होंगी?", "How much is saved?": "कितने बचे?",
    "What do the two cost together?": "दोनों का कुल दाम क्या है?", "Find the payment, then the balance at the end.": "जमा रकम निकालो, फिर आखिर में बाकी रकम।",
    "How many are left?": "कितने बचे?", "How many to reach?": "पहुँचने को कितने?", "How much altogether?": "कुल कितना?",
    /* the numbers' names on the mat, the routes, the steps */
    "held": "पहले", "used": "खर्च", "had": "पहले", "lent": "दी गईं", "first": "पहला", "second": "दूसरा",
    "coaches": "डिब्बे", "riders": "यात्री", "children": "बच्चे", "km": "किलोमीटर", "March": "मार्च", "April": "अप्रैल",
    "chairs": "कुर्सियाँ", "sold": "बिके", "1st day": "पहला दिन", "have": "पास में", "target": "लक्ष्य", "needs": "चाहिए", "has": "पास में",
    "table": "मेज़", "chair": "कुर्सी", "paid": "दिए", "both": "दोनों", "fridge": "फ्रिज", "more by": "ज़्यादा", "washer": "मशीन",
    "balance": "बाकी", "spent": "खर्च", "payment": "जमा रकम", "left": "बचा", "pens": "पेन", "pencils": "पेंसिलें",
    "altogether": "कुल", "more": "ज़्यादा", "dearer by": "इतना महँगा", "saved": "बचत", "added at once": "सीधे जोड़ा", "together": "कुल दाम", "added": "जोड़ा",
    "Add the two prices": "दोनों दाम जोड़ो", "Subtract the price paid": "दिया गया दाम घटाओ", "Find the cheaper price": "सस्ता दाम निकालो",
    "Find the payment": "जमा रकम निकालो", "Take off the spending": "खर्च घटाओ",
    /* the working area's own words */
    "O": "इ", "T": "द", "H": "सै", "Th": "ह", "TTh": "द.ह.", "L": "ला",
    "no job": "कोई काम नहीं", "Tiny numbers": "छोटी संख्याएँ", "Try it with tiny numbers": "छोटी संख्याओं से करके देखो",
    "1st": "पहला", "2nd": "दूसरा", "not enough": "काफ़ी नहीं", "either order": "कोई भी क्रम",
    "On the mat:": "चटाई पर:", "Step": "चरण", "Which step first?": "पहले कौन सा चरण?", "Mat": "चटाई", "grey": "स्लेटी", "What is asked?": "क्या पूछा है?",
  },
  gu: {
    "Story to Difference": "વાર્તાથી તફાવત",
    "Read it right through. What is the question actually asking for?": "આખું વાંચો. સવાલ ખરેખર શું પૂછે છે?",
    "Every sentence turned into a taking away, and the numbers with no job are still standing.": "દરેક વાક્ય બાદબાકીમાં બદલાયું, અને કામ વગરની સંખ્યાઓ ત્યાં જ ઊભી છે.",
    "Free play. Lift any two numbers onto the mat and watch it take one from the other.": "મુક્ત રમત. કોઈ પણ બે સંખ્યાઓ ચટાઈ પર મૂકો અને જુઓ તે એકમાંથી બીજી બાદ કરે છે.",
    "Find the two numbers the question is about": "સવાલની બે સંખ્યાઓ શોધો",
    "Say what you are being asked for before you touch a number.": "કોઈ સંખ્યાને અડતાં પહેલાં કહો કે શું પૂછ્યું છે.",
    "Pick the card that says what is asked. Then bring its two numbers down to the mat.": "જે કાર્ડ કહે છે કે શું પૂછ્યું છે તે પસંદ કરો. પછી તેની બે સંખ્યાઓ ચટાઈ પર લાવો.",
    "Which two amounts does it compare?": "તે કયા બે જથ્થાની સરખામણી કરે છે?",
    "Read only the last sentence. Which number goes on top?": "ફક્ત છેલ્લું વાક્ય વાંચો. કઈ સંખ્યા ઉપર જશે?",
    "Say what is being asked, and find the two amounts it is about. Put the greater one on top and take the other off it.": "કહો શું પૂછ્યું છે, અને તેના બે જથ્થા શોધો. મોટાને ઉપર મૂકો અને તેમાંથી બીજો બાદ કરો.",
    "You learned: say what is asked, then put the greater number on top.": "તમે શીખ્યા: પહેલાં કહો શું પૂછ્યું છે, પછી મોટી સંખ્યા ઉપર મૂકો.",
    "A tank held 48,250 L of water, and 26,190 L was used. How much is left?": "એક ટાંકીમાં 48,250 લિટર પાણી હતું, અને 26,190 લિટર વપરાયું. કેટલું બાકી રહ્યું?",
    "Water left?": "કેટલું પાણી બાકી?",
    "Was water put into the tank, or taken out of it?": "ટાંકીમાં પાણી નાખ્યું, કે તેમાંથી કાઢ્યું?",
    "A library had 18,420 books, and 7,315 were lent out. How many are left on the shelves?": "એક પુસ્તકાલયમાં 18,420 પુસ્તકો હતાં, અને 7,315 વાંચવા આપ્યાં. છાજલીઓ પર કેટલાં બાકી છે?",
    "Books left?": "કેટલાં પુસ્તકો બાકી?",
    "What does your question card say?": "તમારું સવાલ કાર્ડ શું કહે છે?",
    "One town has 36,940 people, and another has 21,508. How many more people has the first town?": "એક શહેરમાં 36,940 લોકો છે, અને બીજામાં 21,508. પહેલા શહેરમાં કેટલા લોકો વધારે છે?",
    "How many more?": "કેટલા વધારે?",
    "Does how many more ask you to join the towns, or to compare them?": "કેટલા વધારેનો અર્થ શહેરોને જોડવાં છે, કે તેમની સરખામણી કરવી?",
    "Some numbers are printed to be left out": "કેટલીક સંખ્યાઓ છોડી દેવા માટે જ છાપેલી હોય છે",
    "One of these numbers has no job here. Which one?": "આમાંથી એક સંખ્યાનું અહીં કોઈ કામ નથી. કઈ?",
    "Drag the number with no job into the grey bay. Bring the other two down to the mat.": "કામ વગરની સંખ્યાને રાખોડી ખાનામાં ખેંચો. બાકીની બેને ચટાઈ પર લાવો.",
    "Does this number help to answer it?": "શું આ સંખ્યા જવાબ આપવામાં મદદ કરે છે?",
    "Read one sentence at a time. Does its number answer your question card?": "એક પછી એક વાક્ય વાંચો. શું તેની સંખ્યા તમારા સવાલ કાર્ડનો જવાબ આપે છે?",
    "Work out what is being asked first. Bring down only the numbers that answer it, and leave the spare one standing.": "પહેલાં સમજો શું પૂછ્યું છે. ફક્ત એ જ સંખ્યાઓ લાવો જે તેનો જવાબ આપે, અને વધારાની ત્યાં જ રહેવા દો.",
    "You learned: bring down only the numbers the question needs.": "તમે શીખ્યા: ફક્ત એ જ સંખ્યાઓ લાવો જે સવાલને જોઈએ.",
    "A train with 24 coaches carried 3,845 passengers, and 1,672 of them were children. How many were not children?": "24 ડબ્બાવાળી એક ટ્રેનમાં 3,845 મુસાફરો હતા, અને તેમાંથી 1,672 બાળકો હતાં. કેટલા બાળકો નહોતા?",
    "Not children?": "બાળકો નહીં?",
    "Do the coaches tell you anything about who was riding?": "શું ડબ્બા કહે છે કે કોણ મુસાફરી કરતું હતું?",
    "A depot 15 km from the town ran 2,640 trips in March, and 1,925 trips in April. How many more trips ran in March?": "શહેરથી 15 કિલોમીટર દૂર એક ડેપોએ માર્ચમાં 2,640 ફેરા, અને એપ્રિલમાં 1,925 ફેરા ચલાવ્યા. માર્ચમાં કેટલા ફેરા વધારે ચાલ્યા?",
    "More trips?": "વધારે ફેરા?",
    "Does the distance to the town change how many trips ran?": "શું શહેરના અંતરથી ફેરાની ગણતરી બદલાય છે?",
    "A hall with 500 chairs sold 24,318 tickets in a week. 11,207 of them were used on the first day. How many were used later?": "500 ખુરશીવાળા એક હૉલે એક અઠવાડિયામાં 24,318 ટિકિટ વેચી. તેમાંથી 11,207 પહેલા દિવસે વપરાઈ. પછી કેટલી વપરાઈ?",
    "Used later?": "પછી વપરાઈ?",
    "What does your question card ask for?": "તમારું સવાલ કાર્ડ શું પૂછે છે?",
    "Shrink the question until you can see it": "સવાલને નાનો કરો, જ્યાં સુધી તે સાફ ન દેખાય",
    "Try the same question with tiny numbers. What did you do to those?": "આ જ સવાલ નાની સંખ્યાઓથી કરી જુઓ. તેમની સાથે તમે શું કર્યું?",
    "Pick the card that says what is asked. Then open the tiny version.": "જે કાર્ડ કહે છે કે શું પૂછ્યું છે તે પસંદ કરો. પછી નાનું રૂપ ખોલો.",
    "Which move did the tiny numbers need?": "નાની સંખ્યાઓને કઈ ચાલ જોઈતી હતી?",
    "Open the tiny version. Copy its move onto the big numbers.": "નાનું રૂપ ખોલો. તેની ચાલ મોટી સંખ્યાઓ પર કરો.",
    "An amount needed to reach a target is the target take away what is already there. Shrinking the numbers shows you why.": "લક્ષ્ય સુધી પહોંચવા, લક્ષ્યમાંથી પહેલેથી હોય તે બાદ કરો. સંખ્યાઓ નાની કરવાથી ખબર પડે છે કેમ.",
    "You learned: to reach a target, take what is there from the target.": "તમે શીખ્યા: લક્ષ્ય સુધી પહોંચવા, લક્ષ્યમાંથી જે છે તે બાદ કરો.",
    "Here is 52,640. What should be added to it to make 90,000?": "આ 52,640 છે. 90,000 બનાવવા તેમાં શું ઉમેરીએ?",
    "What to add?": "શું ઉમેરીએ?",
    "Added to 52,640, your number should make 90,000. Would it?": "52,640 માં ઉમેરતાં તમારી સંખ્યાથી 90,000 બનવા જોઈએ. શું બનશે?",
    "Here is 14,672. What should be added to it to make 30,000?": "આ 14,672 છે. 30,000 બનાવવા તેમાં શું ઉમેરીએ?",
    "What would this question look like with single digit numbers?": "એક અંકની સંખ્યાઓ સાથે આ સવાલ કેવો દેખાશે?",
    "A builder needs 40,000 bricks, and already has 27,516. How many more must be bought?": "એક કડિયાને 40,000 ઈંટો જોઈએ છે, અને તેની પાસે પહેલેથી 27,516 છે. હજી કેટલી ખરીદવી પડશે?",
    "Bricks to buy?": "કેટલી ઈંટો ખરીદવી?",
    "Can the bricks to buy be more than the builder needs?": "શું ખરીદવાની ઈંટો જરૂર કરતાં વધારે હોઈ શકે?",
    "Two steps need an order": "બે પગલાંનો એક ક્રમ હોય છે",
    "Two steps here. Which one has to happen first, and why?": "અહીં બે પગલાં છે. પહેલાં કયું થવું જોઈએ, અને કેમ?",
    "Tap the step that comes first. Then tap it again to work it.": "જે પગલું પહેલાં આવે તેના પર ટૅપ કરો. પછી તેને ઉકેલવા ફરી ટૅપ કરો.",
    "Which of the two could you do right now with the numbers that are printed?": "છાપેલી સંખ્યાઓથી તમે હમણાં બેમાંથી કયું કરી શકો?",
    "Work the first step alone. Then use its answer in the second.": "પહેલું પગલું એકલું ઉકેલો. પછી તેનો જવાબ બીજામાં વાપરો.",
    "Decide the order of two steps before working either one. Bought together for less? Add first. Priced above another? Take away first.": "કોઈ પણ પગલું ઉકેલતાં પહેલાં બંનેનો ક્રમ નક્કી કરો. સાથે ઓછી કિંમતે ખરીદ્યું? પહેલાં ઉમેરો. બીજા કરતાં વધારે કિંમત? પહેલાં બાદ કરો.",
    "You learned: decide the order of two steps before working either.": "તમે શીખ્યા: ઉકેલતાં પહેલાં બે પગલાંનો ક્રમ નક્કી કરો.",
    "A table costs ₹7,480, and a chair costs ₹3,260. The two together are sold for ₹9,950. How much is saved?": "એક ટેબલ 7,480 રૂપિયાનું છે, અને એક ખુરશી 3,260 રૂપિયાની. બંને સાથે 9,950 રૂપિયામાં વેચાય છે. કેટલા બચ્યા?",
    "Money saved?": "કેટલા પૈસા બચ્યા?",
    "Taking one price off the other shows which is dearer. Is that the saving?": "એક કિંમતમાંથી બીજી બાદ કરવાથી ખબર પડે કઈ મોંઘી છે. શું એ જ બચત છે?",
    "A fridge costs ₹24,350, which is ₹6,480 more than a washing machine. What do the two cost together?": "એક ફ્રિજ 24,350 રૂપિયાનું છે, જે વૉશિંગ મશીનથી 6,480 રૂપિયા વધારે છે. બંનેની કુલ કિંમત શું છે?",
    "Cost together?": "કુલ કિંમત?",
    "Is ₹24,350 the fridge's price, or the washing machine's?": "24,350 રૂપિયા ફ્રિજની કિંમત છે, કે વૉશિંગ મશીનની?",
    "An account held ₹21,308. After a payment came in, the balance was ₹68,908. Then ₹34,500 was spent. Find the payment, and the balance at the end.": "એક ખાતામાં 21,308 રૂપિયા હતા. એક રકમ જમા થતાં બાકી 68,908 રૂપિયા થયા. પછી 34,500 રૂપિયા ખર્ચાયા. જમા રકમ, અને છેલ્લે બાકી રકમ શોધો.",
    "Payment and balance?": "જમા રકમ અને બાકી?",
    "What are your two steps, said in words?": "શબ્દોમાં કહો, તમારાં બે પગલાં શું છે?",
    /* the working area's own lines */
    "First pick the card that says what is asked.": "પહેલાં તે કાર્ડ પસંદ કરો જે કહે છે કે શું પૂછ્યું છે.",
    "Read the last line again. Does it ask that?": "છેલ્લી લીટી ફરી વાંચો. શું તે આ જ પૂછે છે?",
    "The smaller number cannot go on top. Swap them.": "નાની સંખ્યા ઉપર ન જઈ શકે. બંનેની જગ્યા બદલો.",
    "What did you do to the tiny numbers?": "તમે નાની સંખ્યાઓ સાથે શું કર્યું?",
    "Do the same to the big ones.": "મોટી સંખ્યાઓ સાથે પણ એમ જ કરો.",
    "Work the first step before the second. Tap it.": "બીજા પહેલાં પહેલું પગલું ઉકેલો. તેના પર ટૅપ કરો.",
    "First tap the step that comes first.": "પહેલાં તે પગલા પર ટૅપ કરો જે પહેલાં આવે છે.",
    "Drag the number with no job into the grey bay.": "કામ વગરની સંખ્યાને રાખોડી ખાનામાં ખેંચો.",
    "Bring the other two down to the mat.": "બાકીની બેને ચટાઈ પર લાવો.",
    "Open the tiny version. Then bring the two numbers down.": "નાનું રૂપ ખોલો. પછી બંને સંખ્યાઓ નીચે લાવો.",
    "Now bring its two numbers down to the mat.": "હવે તેની બે સંખ્યાઓ ચટાઈ પર લાવો.",
    "Add the columns from the ones.": "એકમથી ખાનાં ઉમેરો.",
    "Take the lower number off the top one, from the ones.": "એકમથી, ઉપરની સંખ્યામાંથી નીચેની બાદ કરો.",
    "Then type both answers, one in each box.": "પછી બંને જવાબ લખો, દરેક બૉક્સમાં એક.",
    "Then type the answer.": "પછી જવાબ લખો.",
    "The mat holds two numbers. Which one has no job?": "ચટાઈ પર બે સંખ્યાઓ આવે છે. કોનું કોઈ કામ નથી?",
    "The mat holds two numbers. Put one back first.": "ચટાઈ પર બે સંખ્યાઓ આવે છે. પહેલાં એક પાછી મૂકો.",
    "Neither step needs the other's answer, so either can go first.": "કોઈ પગલાને બીજાના જવાબની જરૂર નથી, તેથી કોઈ પણ પહેલાં આવી શકે.",
    "Tap the first step to set it out.": "તેને ગોઠવવા પહેલા પગલા પર ટૅપ કરો.",
    "Tap the first step to work it. Tap the second to swap them.": "ઉકેલવા પહેલા પગલા પર ટૅપ કરો. અદલબદલ કરવા બીજા પર.",
    "Take it off what? That amount is not made yet.": "શેમાંથી બાદ કરશો? તે રકમ હજી બની જ નથી.",
    "Add it to what? That price is not found yet.": "શેમાં ઉમેરશો? તે કિંમત હજી મળી જ નથી.",
    "Work this one out, and type it in its box.": "આને ઉકેલો, અને તેના બૉક્સમાં લખો.",
    "The second step is open. Bring its two numbers down to the mat.": "બીજું પગલું ખૂલી ગયું. તેની બે સંખ્યાઓ ચટાઈ પર લાવો.",
    "The second step is open.": "બીજું પગલું ખૂલી ગયું.",
    "Bring its two numbers down to the mat.": "તેની બે સંખ્યાઓ ચટાઈ પર લાવો.",
    /* the answer sentences ({n} the answer, {p} the payment) */
    "{n} L of water is left.": "{n} લિટર પાણી બાકી છે.",
    "{n} books are left on the shelves.": "છાજલીઓ પર {n} પુસ્તકો બાકી છે.",
    "The first town has {n} more people.": "પહેલા શહેરમાં {n} લોકો વધારે છે.",
    "{n} passengers were not children.": "{n} મુસાફરો બાળકો નહોતા.",
    "{n} more trips ran in March.": "માર્ચમાં {n} ફેરા વધારે ચાલ્યા.",
    "{n} tickets were used later.": "{n} ટિકિટ પછી વપરાઈ.",
    "{n} should be added to make 90,000.": "90,000 બનાવવા {n} ઉમેરવા પડે.",
    "{n} should be added to make 30,000.": "30,000 બનાવવા {n} ઉમેરવા પડે.",
    "{n} more bricks must be bought.": "હજી {n} ઈંટો ખરીદવી પડશે.",
    "₹{n} is saved.": "{n} રૂપિયા બચ્યા.",
    "The two cost ₹{n} together.": "બંનેની કુલ કિંમત {n} રૂપિયા છે.",
    "The payment was ₹{p}. ₹{n} is left at the end.": "જમા રકમ {p} રૂપિયા હતી. છેલ્લે {n} રૂપિયા બાકી રહ્યા.",
    /* the problem board, piece by piece */
    "A tank held": "એક ટાંકીમાં", "L of water and": "લિટર પાણી હતું, અને", "L was used.": "લિટર વપરાયું.",
    "A library had": "એક પુસ્તકાલયમાં", "books and": "પુસ્તકો હતાં, અને", "were lent out.": "વાંચવા આપ્યાં.",
    "One town has": "એક શહેરમાં", "people and another has": "લોકો છે, અને બીજામાં", ".": ".",
    "A train with": "એક ટ્રેનના", "coaches carried": "ડબ્બામાં હતા", "passengers.": "મુસાફરો.", "of them were children.": "મુસાફરો બાળકો હતાં.",
    "A depot": "શહેરથી", "km from the town ran": "કિલોમીટર દૂર એક ડેપોએ", "trips in March and": "ફેરા માર્ચમાં, અને", "in April.": "એપ્રિલમાં ચલાવ્યા.",
    "A hall with": "એક હૉલમાં", "chairs sold": "ખુરશીઓ, એક અઠવાડિયામાં વેચાઈ", "tickets in a week.": "ટિકિટ.", "of them were used on the first day.": "પહેલા દિવસે વપરાઈ.",
    "What should be added to": "સંખ્યા", "to make it": "માં શું ઉમેરીએ કે બને",
    "A builder needs": "એક કડિયાને", "bricks and already has": "ઈંટો જોઈએ છે, પાસે છે",
    "A table costs": "એક ટેબલની કિંમત", "and a chair costs": "છે, અને એક ખુરશીની", "The two together are sold for": "બંને સાથે લો તો કિંમત",
    "A fridge costs": "એક ફ્રિજની કિંમત", ", which is": "છે, જે વૉશિંગ મશીનથી", "more than a washing machine.": "વધારે છે.",
    "An account held": "એક ખાતામાં", ". A payment came in,": "હતા. પછી એક રકમ જમા થઈ,", "and the balance was": "અને બાકી રકમ થઈ", ". Then": ". પછી", "was spent.": "ખર્ચાયા.",
    "A shop had": "એક દુકાનમાં હતી", "pens and": "પેન અને", "pencils.": "પેન્સિલો.", "It sold": "તેણે વેચી",
    /* the question lines and the question cards */
    "How much is left?": "કેટલું બાકી રહ્યું?", "How many are left on the shelves?": "છાજલીઓ પર કેટલાં બાકી છે?",
    "How many more people has the first town?": "પહેલા શહેરમાં કેટલા લોકો વધારે છે?", "How many were not children?": "કેટલા બાળકો નહોતા?",
    "How many more trips ran in March?": "માર્ચમાં કેટલા ફેરા વધારે ચાલ્યા?", "How many were used later?": "પછી કેટલી વપરાઈ?",
    "How many more must be bought?": "હજી કેટલી ખરીદવી પડશે?", "How much is saved?": "કેટલા બચ્યા?",
    "What do the two cost together?": "બંનેની કુલ કિંમત શું છે?", "Find the payment, then the balance at the end.": "જમા રકમ શોધો, પછી છેલ્લે બાકી રકમ.",
    "How many are left?": "કેટલા બાકી?", "How many to reach?": "પહોંચવા કેટલા?", "How much altogether?": "કુલ કેટલું?",
    /* the numbers' names on the mat, the routes, the steps */
    "held": "પહેલાં", "used": "વપરાયું", "had": "પહેલાં", "lent": "આપ્યાં", "first": "પહેલું", "second": "બીજું",
    "coaches": "ડબ્બા", "riders": "મુસાફરો", "children": "બાળકો", "km": "કિલોમીટર", "March": "માર્ચ", "April": "એપ્રિલ",
    "chairs": "ખુરશીઓ", "sold": "વેચાઈ", "1st day": "પહેલો દિવસ", "have": "પાસે", "target": "લક્ષ્ય", "needs": "જોઈએ", "has": "પાસે",
    "table": "ટેબલ", "chair": "ખુરશી", "paid": "ચૂકવ્યા", "both": "બંને", "fridge": "ફ્રિજ", "more by": "વધારે", "washer": "મશીન",
    "balance": "બાકી", "spent": "ખર્ચ", "payment": "જમા રકમ", "left": "બાકી", "pens": "પેન", "pencils": "પેન્સિલો",
    "altogether": "કુલ", "more": "વધારે", "dearer by": "આટલું મોંઘું", "saved": "બચત", "added at once": "સીધું ઉમેર્યું", "together": "કુલ કિંમત", "added": "ઉમેર્યું",
    "Add the two prices": "બંને કિંમત ઉમેરો", "Subtract the price paid": "ચૂકવેલી કિંમત બાદ કરો", "Find the cheaper price": "સસ્તી કિંમત શોધો",
    "Find the payment": "જમા રકમ શોધો", "Take off the spending": "ખર્ચ બાદ કરો",
    /* the working area's own words */
    "O": "એ", "T": "દ", "H": "શ", "Th": "હ", "TTh": "દ.હ.", "L": "લા",
    "no job": "કોઈ કામ નથી", "Tiny numbers": "નાની સંખ્યાઓ", "Try it with tiny numbers": "નાની સંખ્યાઓથી કરી જુઓ",
    "1st": "પહેલું", "2nd": "બીજું", "not enough": "પૂરતું નથી", "either order": "કોઈ પણ ક્રમ",
    "On the mat:": "ચટાઈ પર:", "Step": "પગલું", "Which step first?": "પહેલાં કયું પગલું?", "Mat": "ચટાઈ", "grey": "રાખોડી", "What is asked?": "શું પૂછ્યું છે?",
  },
};
/* "2 of 3" in the language in use */
const sdOf = (a: any, b: any, lang: string) => (lang === "hi" ? `${b} में से ${a}` : lang === "gu" ? `${b} માંથી ${a}` : `${a} of ${b}`);

/* ── the problems ──────────────────────────────────────────────────────────────────────────
   Each item's board: sentence lines (words and number cards), the question line, the question
   cards that say what it asks (`right`), the two numbers the mat needs (top first, the greater),
   the spare number with no job (phase 2), the tiny version (phase 3: have, target), the two steps
   in their right order (phase 4; the first is built in the bay), and the answer sentence. */
const sdNum = (id: string, v: number, tag: string, rs = false) => ({ t: "num", id, v, tag, rs });
const SD_CARDS = [["more", "How many more?"], ["left", "How many are left?"], ["reach", "How many to reach?"], ["all", "How much altogether?"]];

const SD_PROBS: Record<string, any> = {
  "M2.S4.T6.C20:ML1": {
    lines: [["A tank held", sdNum("held", 48250, "held"), "L of water and", sdNum("used", 26190, "used"), "L was used."]],
    q: "How much is left?", right: ["left"], need: ["held", "used"], tell: "{n} L of water is left.",
    rivals: [{ label: "altogether", a: "held", b: "used", op: "+", right: { label: "left", a: "held", b: "used", op: "-" } }],
  },
  "M2.S4.T6.C20:1": {
    lines: [["A library had", sdNum("had", 18420, "had"), "books and", sdNum("lent", 7315, "lent"), "were lent out."]],
    q: "How many are left on the shelves?", right: ["left"], need: ["had", "lent"], tell: "{n} books are left on the shelves.",
    rivals: [{ label: "altogether", a: "had", b: "lent", op: "+", right: { label: "left", a: "had", b: "lent", op: "-" } }],
  },
  "M2.S4.T6.C20:2": {
    lines: [["One town has", sdNum("t1", 36940, "first"), "people and another has", sdNum("t2", 21508, "second"), "."]],
    q: "How many more people has the first town?", right: ["more"], need: ["t1", "t2"], tell: "The first town has {n} more people.",
    rivals: [{ label: "altogether", a: "t1", b: "t2", op: "+", right: { label: "more", a: "t1", b: "t2", op: "-" } }],
  },
  "M2.S4.T6.C21:ML2": {
    lines: [["A train with", sdNum("coach", 24, "coaches"), "coaches carried", sdNum("pass", 3845, "riders"), "passengers."],
      [sdNum("kids", 1672, "children"), "of them were children."]],
    q: "How many were not children?", right: ["left"], spare: "coach", need: ["pass", "kids"], tell: "{n} passengers were not children.",
  },
  "M2.S4.T6.C21:3": {
    lines: [["A depot", sdNum("km", 15, "km"), "km from the town ran"], [sdNum("mar", 2640, "March"), "trips in March and", sdNum("apr", 1925, "April"), "in April."]],
    q: "How many more trips ran in March?", right: ["more"], spare: "km", need: ["mar", "apr"], tell: "{n} more trips ran in March.",
  },
  "M2.S4.T6.C21:4": {
    lines: [["A hall with", sdNum("chairs", 500, "chairs"), "chairs sold", sdNum("sold", 24318, "sold"), "tickets in a week."],
      [sdNum("day1", 11207, "1st day"), "of them were used on the first day."]],
    q: "How many were used later?", right: ["left"], spare: "chairs", need: ["sold", "day1"], tell: "{n} tickets were used later.",
  },
  "M2.S4.T6.C22:ML3": {
    lines: [["What should be added to", sdNum("have", 52640, "have"), "to make it", sdNum("goal", 90000, "target"), "?"]],
    q: null, right: ["reach"], need: ["goal", "have"], tiny: [4, 7], tell: "{n} should be added to make 90,000.",
  },
  "M2.S4.T6.C22:5": {
    lines: [["What should be added to", sdNum("have", 14672, "have"), "to make it", sdNum("goal", 30000, "target"), "?"]],
    q: null, right: ["reach"], need: ["goal", "have"], tiny: [2, 6], tell: "{n} should be added to make 30,000.",
  },
  "M2.S4.T6.C22:6": {
    lines: [["A builder needs", sdNum("need", 40000, "needs"), "bricks and already has", sdNum("has", 27516, "has"), "."]],
    q: "How many more must be bought?", right: ["reach", "more"], need: ["need", "has"], tiny: [5, 8], tell: "{n} more bricks must be bought.",
  },
  "M2.S4.T6.C23:ML4": {
    lines: [["A table costs", sdNum("tab", 7480, "table", true), "and a chair costs", sdNum("cha", 3260, "chair", true), "."],
      ["The two together are sold for", sdNum("paid", 9950, "paid", true), "."]],
    q: "How much is saved?",
    steps: [{ id: "add", label: "Add the two prices", op: "+", a: "tab", b: "cha", out: "both", tag: "both" },
      { id: "take", label: "Subtract the price paid", op: "-", a: "both", b: "paid" }],
    loose: ["take", "add"], early: { a: null, b: "paid", op: "-", say: "Take it off what? That amount is not made yet." },
    need: ["both", "paid"], tell: "₹{n} is saved.",
    rivals: [{ label: "dearer by", a: "tab", b: "cha", op: "-", right: { label: "saved", a: "both", b: "paid", op: "-" } }],
  },
  "M2.S4.T6.C23:7": {
    lines: [["A fridge costs", sdNum("fri", 24350, "fridge", true), ", which is", sdNum("more", 6480, "more by", true)], ["more than a washing machine."]],
    q: "What do the two cost together?",
    steps: [{ id: "find", label: "Find the cheaper price", op: "-", a: "fri", b: "more", out: "wm", tag: "washer" },
      { id: "add", label: "Add the two prices", op: "+", a: "fri", b: "wm" }],
    loose: ["find", "add"], early: { a: "fri", b: null, op: "+", say: "Add it to what? That price is not found yet." },
    need: ["fri", "wm"], tell: "The two cost ₹{n} together.",
    rivals: [{ label: "added at once", a: "fri", b: "more", op: "+", right: { label: "together", a: "fri", b: "wm", op: "+" } }],
  },
  "M2.S4.T6.C23:8": {
    lines: [["An account held", sdNum("held", 21308, "held", true), ". A payment came in,"],
      ["and the balance was", sdNum("bal", 68908, "balance", true), ". Then", sdNum("spent", 34500, "spent", true), "was spent."]],
    q: "Find the payment, then the balance at the end.",
    steps: [{ id: "pay", label: "Find the payment", op: "-", a: "bal", b: "held", part: 0, tag: "payment" },
      { id: "spend", label: "Take off the spending", op: "-", a: "bal", b: "spent", part: 1, tag: "left" }],
    loose: ["spend", "pay"], anyOrder: true,   /* neither step needs the other's answer: either order stands */
    need: ["bal", "spent"], tell: "The payment was ₹{p}. ₹{n} is left at the end.",
    rivals: [{ label: "added", a: "held", b: "bal", op: "+", part: 0, right: { label: "payment", a: "bal", b: "held", op: "-" } }],
  },
};
/* free play: a board of its own with no question, the mat that works whatever two numbers land on it, and the grey bay */
const SD_FREE = { free: true, need: [], lines: [
  ["A shop had", sdNum("f1", 36500, "pens"), "pens and", sdNum("f2", 12875, "pencils"), "pencils."],
  ["It sold", sdNum("f3", 9480, "sold"), "pens and", sdNum("f4", 4350, "sold"), "pencils."]] };
const sdProb = (key: string) => (key === "free" ? SD_FREE : SD_PROBS[key] || SD_PROBS["M2.S4.T6.C20:ML1"]);
const sdToks = (pr: any) => (pr.lines || []).flat().filter((t: any) => t && typeof t !== "string");
/* every value a problem holds, a built step included (the steps worked in their right order) */
const sdRecipe = (pr: any) => {
  const v: Record<string, number> = {};
  sdToks(pr).forEach((t: any) => { v[t.id] = t.v; });
  (pr.steps || []).forEach((st: any) => { if (st.out) v[st.out] = st.op === "+" ? v[st.a] + v[st.b] : v[st.a] - v[st.b]; });
  return v;
};
const sdMatOp = (pr: any) => (pr.steps ? pr.steps[1].op : "-");

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   items   three a phase, the plan's questions with their ids.
           kind  diff | spare | reach | two (the Work, judge and oracle switch on it)
           near  the item's misconception (judge rejects it) */
const PHASES = [
  {
    n: 1,
    concept: "Find the two numbers the question is about",
    conceptId: "M2.S4.T6.C20", objectiveIds: ["O9"],
    says: ["Say what you are being asked for before you touch a number.", "Pick the card that says what is asked. Then bring its two numbers down to the mat."],
    /* tries, as the plan writes it: first rung the item's miss line; second the phase's; third: the last sentence alone, which number goes on top */
    ladder: ["Which two amounts does it compare?", "Read only the last sentence. Which number goes on top?"],
    closing: "Say what is being asked, and find the two amounts it is about. Put the greater one on top and take the other off it.",
    learned: "You learned: say what is asked, then put the greater number on top.",
    traceback: "The question line lights and the right question card goes up; if the answer given was the sum, that route is written under the mat in ink (altogether: the two numbers added), beside the right one it is then set against; both numbers come down, the greater on top (a smaller one on top is swapped down); the columns are taken from the ones, a lending digit struck once in ink with its new value above it in rose and the ten travelling into the next column; the answer row fills and the answer is written back into a sentence.",
    items: [
      /* learn ML1: answer in the plan = 22,060 L. near: the two amounts added */
      { qid: "M2.S4.T6.C20:ML1", kind: "diff", near: 74440, winMs: 6400, ask: "Water left?", answer: 22060, miss: "Was water put into the tank, or taken out of it?",
        say: "A tank held 48,250 L of water, and 26,190 L was used. How much is left?" },
      /* practice 1: answer in the plan = 11,105 books. near: the two amounts added */
      { qid: "M2.S4.T6.C20:1", kind: "diff", near: 25735, winMs: 6400, ask: "Books left?", answer: 11105, miss: "What does your question card say?",
        say: "A library had 18,420 books, and 7,315 were lent out. How many are left on the shelves?" },
      /* practice 2: answer in the plan = 15,432 people. near: the two amounts added */
      { qid: "M2.S4.T6.C20:2", kind: "diff", near: 58448, winMs: 6400, ask: "How many more?", answer: 15432, miss: "Does how many more ask you to join the towns, or to compare them?",
        say: "One town has 36,940 people, and another has 21,508. How many more people has the first town?" },
    ],
  },
  {
    n: 2,
    concept: "Some numbers are printed to be left out",
    conceptId: "M2.S4.T6.C21", objectiveIds: ["O10"],
    says: ["One of these numbers has no job here. Which one?", "Drag the number with no job into the grey bay. Bring the other two down to the mat."],
    /* tries, as the plan writes it: first rung the item's; second the phase's; third: one sentence at a time, each number judged on its own */
    ladder: ["Does this number help to answer it?", "Read one sentence at a time. Does its number answer your question card?"],
    closing: "Work out what is being asked first. Bring down only the numbers that answer it, and leave the spare one standing.",
    learned: "You learned: bring down only the numbers the question needs.",
    traceback: "The right question card goes up; the number with no job flies back into its sentence and turns grey with its outline kept; the two needed numbers stand on the mat, the greater on top, and are taken from the ones with each trade drawn; the answer sentence is written back.",
    items: [
      /* learn ML2: answer in the plan = 2,173 passengers, and the number of coaches is not needed. near: the 24 coaches taken off too */
      { qid: "M2.S4.T6.C21:ML2", kind: "spare", near: 2149, winMs: 6800, ask: "Not children?", answer: 2173, miss: "Do the coaches tell you anything about who was riding?",
        say: "A train with 24 coaches carried 3,845 passengers, and 1,672 of them were children. How many were not children?" },
      /* practice 3: answer in the plan = 715 trips, and the distance is not needed. near: the 15 km taken off too */
      { qid: "M2.S4.T6.C21:3", kind: "spare", near: 700, winMs: 6800, ask: "More trips?", answer: 715, miss: "Does the distance to the town change how many trips ran?",
        say: "A depot 15 km from the town ran 2,640 trips in March, and 1,925 trips in April. How many more trips ran in March?" },
      /* practice 4: answer in the plan = 13,111 tickets, and the number of chairs is not needed. near: the 500 chairs taken off too */
      { qid: "M2.S4.T6.C21:4", kind: "spare", near: 12611, winMs: 6800, ask: "Used later?", answer: 13111, miss: "What does your question card ask for?",
        say: "A hall with 500 chairs sold 24,318 tickets in a week. 11,207 of them were used on the first day. How many were used later?" },
    ],
  },
  {
    n: 3,
    concept: "Shrink the question until you can see it",
    conceptId: "M2.S4.T6.C22", objectiveIds: ["O9"],
    says: ["Try the same question with tiny numbers. What did you do to those?", "Pick the card that says what is asked. Then open the tiny version."],
    /* tries, as the plan writes it: first rung the item's; second the phase's; third: the tiny version already answered, only the copying across left */
    ladder: ["Which move did the tiny numbers need?", "Open the tiny version. Copy its move onto the big numbers."],
    closing: "An amount needed to reach a target is the target take away what is already there. Shrinking the numbers shows you why.",
    learned: "You learned: to reach a target, take what is there from the target.",
    traceback: "The right question card goes up; the tiny version opens and answers itself (4 and 3 more make 7, so 7 − 4 = 3); the same move goes onto the real numbers with the target on top; the columns are worked across the zeros, each zero opening a ten; the answer is added back to show the target, and written as a sentence.",
    items: [
      /* learn ML3: answer in the plan = 37,360. near: the two added because the question says added */
      { qid: "M2.S4.T6.C22:ML3", kind: "reach", near: 142640, winMs: 9000, ask: "What to add?", answer: 37360, miss: "Added to 52,640, your number should make 90,000. Would it?",
        say: "Here is 52,640. What should be added to it to make 90,000?" },
      /* practice 5: answer in the plan = 15,328. near: the two added */
      { qid: "M2.S4.T6.C22:5", kind: "reach", near: 44672, winMs: 9000, ask: "What to add?", answer: 15328, miss: "What would this question look like with single digit numbers?",
        say: "Here is 14,672. What should be added to it to make 30,000?" },
      /* practice 6: answer in the plan = 12,484 bricks. near: the two added */
      { qid: "M2.S4.T6.C22:6", kind: "reach", near: 67516, winMs: 9000, ask: "Bricks to buy?", answer: 12484, miss: "Can the bricks to buy be more than the builder needs?",
        say: "A builder needs 40,000 bricks, and already has 27,516. How many more must be bought?" },
    ],
  },
  {
    n: 4,
    concept: "Two steps need an order",
    conceptId: "M2.S4.T6.C23", objectiveIds: ["O10"],
    says: ["Two steps here. Which one has to happen first, and why?", "Tap the step that comes first. Then tap it again to work it."],
    /* tries, as the plan writes it: first rung the item's; second the phase's; third: the first step alone, the second locked */
    ladder: ["Which of the two could you do right now with the numbers that are printed?", "Work the first step alone. Then use its answer in the second."],
    closing: "Decide the order of two steps before working either one. Bought together for less? Add first. Priced above another? Take away first.",
    learned: "You learned: decide the order of two steps before working either.",
    traceback: "The two steps are laid in their right order; if the answer given matches another route (the two prices compared, the printed numbers added at once, the payment added), that route is written under the mat in ink, beside the right one; the bay works the first step in its own columns and builds its card with a drawn edge (for the payment and the balance, whose steps need nothing from each other, the first is set out and its result filled in last); the second step's two numbers come down onto the mat and are worked from the ones; the answer sentence is written back.",
    items: [
      /* learn ML4: answer in the plan = Rs 790. near: the chair's price taken off the table's (the two prices compared) */
      { qid: "M2.S4.T6.C23:ML4", kind: "two", near: 4220, winMs: 9000, ask: "Money saved?", answer: 790, miss: "Taking one price off the other shows which is dearer. Is that the saving?",
        say: "A table costs ₹7,480, and a chair costs ₹3,260. The two together are sold for ₹9,950. How much is saved?" },
      /* practice 7: answer in the plan = Rs 42,220, because the washing machine costs Rs 17,870. near: the two printed numbers added */
      { qid: "M2.S4.T6.C23:7", kind: "two", near: 30830, winMs: 9000, ask: "Cost together?", answer: 42220, miss: "Is ₹24,350 the fridge's price, or the washing machine's?",
        say: "A fridge costs ₹24,350, which is ₹6,480 more than a washing machine. What do the two cost together?" },
      /* practice 8: answer in the plan = the payment was Rs 47,600 and the balance at the end is Rs 34,408: two answers,
         one box each. Neither step needs the other's answer, so either order stands; the bay sets the first out with its
         result open. near: the payment found by adding, because it "came in" */
      { qid: "M2.S4.T6.C23:8", kind: "two", near: [90216, 34408], winMs: 9600, ask: "Payment and balance?", answer: [47600, 34408],
        parts: [{ label: "Payment" }, { label: "Balance" }], miss: "What are your two steps, said in words?",
        say: "An account held ₹21,308. After a payment came in, the balance was ₹68,908. Then ₹34,500 was spent. Find the payment, and the balance at the end." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  mat: { columns: ["L", "TTh", "Th", "H", "T", "O"], alignsBy: "the right hand end (ones under ones)", rows: ["the greater number", "the number taken away"],
    greaterOnTop: "a smaller number over a greater one does not settle; the two swap under a finger",
    trade: "a lending digit is struck once in ink, its new value written above in rose, and the ten it lends travels (vermilion) into the next column" },
  questionCards: SD_CARDS.map((c) => c[1]),
  questionCardFirst: "in phases 1 to 3 no number card lifts until a card that says what is asked is picked; in phase 4 none lifts until the first step is worked",
  problems: Object.keys(SD_PROBS).map((k) => {
    const p = SD_PROBS[k], v = sdRecipe(p);
    return { qid: k, asks: (p.right || []).map((r: string) => (SD_CARDS.find((c) => c[0] === r) || [])[1]), top: v[p.need[0]], takeAway: v[p.need[1]],
      operation: sdMatOp(p), spare: p.spare ? v[p.spare] : null, tiny: p.tiny ? { have: p.tiny[0], target: p.tiny[1], move: p.tiny[1] + " − " + p.tiny[0] } : null,
      steps: p.steps ? p.steps.map((s: any) => ({ step: s.label, working: v[s.a] + (s.op === "+" ? " + " : " − ") + v[s.b], builds: s.out ? v[s.out] : null })) : null,
      answerSentence: p.tell };
  }),
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: the answer typed on the pad (numbers compare as numbers) */
const judge = (item: any, v: any) => (item.parts ? judgeSlotParts(item, v) : leadNumber(v) === item.answer);

/* oracle: every answer re-derived from the spoken question itself by schoolbook column working on digit
   strings (no code shared with judge or the working area); each difference is checked by adding it back,
   and the board's own numbers must give the same answer */
const sdAddStr = (a: string, b: string) => {
  let out = "", c = 0;
  for (let i = a.length - 1, j = b.length - 1; i >= 0 || j >= 0 || c; i--, j--) {
    const s = (i >= 0 ? a.charCodeAt(i) - 48 : 0) + (j >= 0 ? b.charCodeAt(j) - 48 : 0) + c;
    out = String(s % 10) + out;
    c = s > 9 ? 1 : 0;
  }
  return out.replace(/^0+(?=\d)/, "");
};
const sdSubStr = (a: string, b: string) => {
  let out = "", owe = 0;
  for (let i = a.length - 1, j = b.length - 1; i >= 0; i--, j--) {
    let d = a.charCodeAt(i) - 48 - owe - (j >= 0 ? b.charCodeAt(j) - 48 : 0);
    owe = d < 0 ? 1 : 0;
    if (d < 0) d += 10;
    out = String(d) + out;
  }
  const r = out.replace(/^0+(?=\d)/, "");
  return owe || sdAddStr(r, b) !== a.replace(/^0+(?=\d)/, "") ? "NaN" : r;
};
const sdSayNums = (s: string) => (String(s).match(/\d{1,3}(?:,\d{2,3})+|\d+/g) || []).map((x) => x.replace(/,/g, ""));
const SD_ROUTE: Record<string, (p: string[]) => string> = {
  "M2.S4.T6.C20:ML1": (p) => sdSubStr(p[0], p[1]),
  "M2.S4.T6.C20:1": (p) => sdSubStr(p[0], p[1]),
  "M2.S4.T6.C20:2": (p) => sdSubStr(p[0], p[1]),
  "M2.S4.T6.C21:ML2": (p) => sdSubStr(p[1], p[2]),                 /* the 24 coaches have no job */
  "M2.S4.T6.C21:3": (p) => sdSubStr(p[1], p[2]),                   /* the 15 km have no job */
  "M2.S4.T6.C21:4": (p) => sdSubStr(p[1], p[2]),                   /* the 500 chairs have no job */
  "M2.S4.T6.C22:ML3": (p) => sdSubStr(p[1], p[0]),                 /* the target less what is there */
  "M2.S4.T6.C22:5": (p) => sdSubStr(p[1], p[0]),
  "M2.S4.T6.C22:6": (p) => sdSubStr(p[0], p[1]),
  "M2.S4.T6.C23:ML4": (p) => sdSubStr(sdAddStr(p[0], p[1]), p[2]), /* add the prices first, then take off the price paid */
  "M2.S4.T6.C23:7": (p) => sdAddStr(p[0], sdSubStr(p[0], p[1])),  /* take away first to find the cheaper one, then add */
  "M2.S4.T6.C23:8": (p) => sdSubStr(p[1], p[0]) + "|" + sdSubStr(p[1], p[2]),              /* the payment, and the balance */
};
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const route = SD_ROUTE[it.qid];
  if (!route) return false;
  const pr = SD_PROBS[it.qid], toks = sdToks(pr);
  const str: Record<string, string> = {};
  toks.forEach((t: any) => { str[t.id] = String(t.v); });
  (pr.steps || []).forEach((st: any) => { if (st.out) str[st.out] = st.op === "+" ? sdAddStr(str[st.a], str[st.b]) : sdSubStr(str[st.a], str[st.b]); });
  const work = (a: string, b: string, op: string) => (op === "+" ? sdAddStr(str[a], str[b]) : sdSubStr(str[a], str[b]));
  const byBoard = pr.anyOrder ? pr.steps.slice().sort((x: any, y: any) => x.part - y.part).map((st: any) => work(st.a, st.b, st.op)).join("|")
    : work(pr.need[0], pr.need[1], sdMatOp(pr));
  const want = Array.isArray(it.answer) ? it.answer.join("|") : String(it.answer);
  return route(sdSayNums(it.say)) === want && byBoard === want && sdSayNums(it.say).length === toks.length;
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => (item.parts ? item.near.join("|") : item.near);
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.parts ? item.answer : [item.answer]).flatMap((x: number) => [String(x), indian(x), words(x)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver and the agent type the answer like a child; the working area is played by the win motion */
const solve = (item: any, T: any) => T.submit(item.answer);
const answer = () => undefined;
const check = () => undefined;
/* the slot writes the typed answer with Indian commas as it grows (2,206 then 22,060) */
const sdFormat = (typed: any) => (/^\d{4,9}$/.test(String(typed ?? "")) ? indian(Number(typed)) : String(typed ?? ""));

/* ── layout of the working area (1086 x 528) ─────────────────────────────────────────────── */
const SDB = { pad: 4, line: 74, q: 48, gap: 12, cardMin: 132, left: 16 };          /* the problem board */
const SDM = { margin: 160, col: 74, head: 34, strip: 32, row: 46, w: 616 };        /* the column mat */
const SDR = { x: 640, w: 446 };                                                     /* the right column */
const SD_COLS = ["L", "TTh", "Th", "H", "T", "O"];
const SD_BLUE = shade(CONTENT.hundred, 0.25);    /* the greater number, on top */
const SD_AMBER = CONTENT.ten;                    /* the number taken away (its digits in a deeper ink) */
const SD_AMBER_INK = shade(CONTENT.ten, 0.4);
const SD_GREEN = shade(CONTENT.one, 0.25);       /* the answer under the rule */
const SD_VERM = shade(CONTENT.pointer, 0.25);    /* the ten travelling to the next column; a carry */
const SD_ROSE = shade(CONTENT.bead, 0.25);       /* a digit rewritten after a trade */
const SD_GREY = "#767676";                       /* a zero holding a place; a number with no job */
const sdColX = (k: number) => SDM.margin + (5 - k) * SDM.col;   /* column k from the right (0 = ones) */
const sdColC = (k: number) => sdColX(k) + SDM.col / 2;
const sdBayC = (k: number) => SDR.x + SDR.w - 50 - k * 44;     /* the bay's own columns */
const sdDigits = (v: number, len: number) => Array.from({ length: len }, (_, k) => Math.floor(v / Math.pow(10, k)) % 10);

/* text is measured by the page's own font (the stage has no layout engine) */
let sdCtx: any = null;
const sdMeasure = (s: string, size: number, weight = 500) => {
  try {
    if (!sdCtx) sdCtx = window.document.createElement("canvas").getContext("2d");
    sdCtx.font = `${weight} ${size}px ${FONT}`;
    return Math.ceil(sdCtx.measureText(String(s)).width * 1.03);
  } catch (e) { return Math.ceil(String(s).length * size * 0.58); }
};
const sdCardText = (v: number, rs: boolean) => (rs ? "₹" : "") + indian(v);
const sdCardW = (v: number, rs: boolean) => Math.max(SDB.cardMin, sdMeasure(sdCardText(v, rs), T.label, 700) + 30);

/* the problem board laid out: every sentence line holds its cards, the question line comes last */
const sdBoard = (pr: any, tx: any = (v: any) => v) => {
  let y = SDB.pad;
  const lines = pr.lines.map((ln: any[]) => {
    let x = SDB.left;
    const items: any[] = [];
    ln.forEach((tok: any) => {
      if (typeof tok === "string") {
        const text = tx(tok);   /* each piece in the language in use, measured as it is drawn */
        if (items.length) x += /^[.,?।]/.test(text) ? 2 : SDB.gap;
        const w = sdMeasure(text, T.label, 500);
        items.push({ kind: "w", text, x, w });
        x += w;
      } else {
        if (items.length) x += SDB.gap;
        const w = sdCardW(tok.v, tok.rs);
        items.push({ kind: "card", tok, x, w });
        x += w;
      }
    });
    const out = { y, items, width: x };
    y += SDB.line;
    return out;
  });
  const qy = pr.free ? null : y;
  if (!pr.free) y += SDB.q;
  return { lines, qy, h: y + 4 };
};

const sdFresh = (item: any, free: boolean) => ({
  key: free || !item || !item.qid ? "free" : item.qid, picked: null, mat: [null, null], grey: [], strip: 0, tinyAdd: 0,
  order: [], early: false, bay: null, built: {}, wk: null, hl: null, ten: null, told: null, addBack: false,
  lit: false, litLine: null, tip: null, fly: null, prompted: false, hoverSaid: false, opened: false, rival: null, eitherNote: false,
});

const SD_CSS = `
.sd-in{animation:sdIn 320ms ease-out both}
@keyframes sdIn{from{transform:translateY(-26px);opacity:.25}to{transform:none;opacity:1}}
.sd-pop{transform-box:fill-box;transform-origin:center;animation:sdPop 300ms ease-out both}
@keyframes sdPop{from{transform:scale(.4);opacity:.2}to{transform:none;opacity:1}}
.sd-ten{animation:sdTen 380ms cubic-bezier(.3,.7,.25,1) both}
@keyframes sdTen{from{transform:translateX(-74px)}to{transform:none}}
.sd-fly{transition:transform 460ms cubic-bezier(.3,.7,.25,1)}
.sd-tip{animation:sdTip 520ms ease-in-out both}
@keyframes sdTip{0%,100%{transform:none}25%{transform:translateX(-9px)}75%{transform:translateX(9px)}}
.sd-grab{cursor:grab}
.sd-hello{animation:sdHello 1300ms ease-in-out 250ms both}
@keyframes sdHello{0%,100%{transform:none}45%{transform:translateY(-12px)}}
@media (prefers-reduced-motion:reduce){.sd-in,.sd-pop,.sd-ten,.sd-tip,.sd-hello{animation:none}.sd-fly{transition:none}}
`;

/* ── the working area ─────────────────────────────────────────────────────────────────────── */
function Work({ n, item, index, stage, wrong, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();   /* the win motion, the traceback, free play's working */
  const tb = useTimeline();   /* the child's own taps: the tiny version, the bay */
  const free = stage === "free";
  const [S, setS] = useState<any>(() => sdFresh(item, free));
  const SR = useRef<any>(S);
  const set = (s: any) => { SR.current = s; setS(s); };
  const put = (patch: any) => set({ ...SR.current, ...patch });
  const setupFor = useRef<any>(index);
  const timers = useRef<any[]>([]);
  const later = (fn: () => void, ms: number) => { timers.current.push(setTimeout(fn, ms)); };
  const clearLater = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => clearLater, []);
  const reset = (it: any, fr: boolean) => { tl.stop(); tb.stop(); clearLater(); set(sdFresh(it, fr)); };

  useEffect(() => {
    if (free) return;
    if ((stage === "ask" || stage === "teach") && setupFor.current !== index) { setupFor.current = index; reset(item, false); }
  }, [stage, index]);
  useEffect(() => { if (free) { setupFor.current = -2; reset(null, true); } }, [free]);

  /* Enter goes straight to the answer: it is typed on the pad */
  api.onEnter(null);

  const pr = sdProb(S.key);
  const kind = pr.free ? "free" : pr.steps ? "two" : pr.tiny ? "reach" : pr.spare ? "spare" : "diff";
  const board = sdBoard(pr, tx);
  const matTop = board.h + 8;
  /* a one-line board leaves room: the mat takes bigger rows and digits */
  const MR = board.lines.length === 1 && !pr.free ? { strip: 38, row: 62, size: T.xl, base: 48, ans: 56, cut: 36 }
    : { strip: SDM.strip, row: SDM.row, size: T.prompt, base: 36, ans: 42, cut: 27 };
  const rowTop = (r: number) => matTop + SDM.head + MR.strip + r * MR.row;
  const ruleY = rowTop(2) + 4;
  const ansBase = ruleY + MR.ans;
  const matH = ansBase + 14 - matTop;
  const bayTop = matTop + 164;
  const busy = tl.busy || tb.busy;
  const canAct = free || (stage === "ask" && !busy);
  const tick = () => api.sfx.tick();
  const val = (s: any, id: string | null): number | null => {
    if (!id) return null;
    const t = sdToks(pr).find((x: any) => x.id === id);
    if (t) return t.v;
    return s.built && s.built[id] !== undefined ? s.built[id] : null;
  };
  const stepOf = (sid: string) => (pr.steps || []).find((x: any) => x.id === sid);
  const outStep = (id: string) => (pr.steps || []).find((x: any) => x.out === id);
  const isRs = (id: string) => { const t = sdToks(pr).find((x: any) => x.id === id); return t ? !!t.rs : !!outStep(id) && sdToks(pr).some((x: any) => x.rs); };
  const tagOf = (id: string | null) => { if (!id) return ""; const t = sdToks(pr).find((x: any) => x.id === id); return t ? t.tag : outStep(id) ? outStep(id).tag : ""; };
  const builtNow = (s: any) => kind === "two" && Object.keys(s.built).length > 0;
  /* the first step is done: built (the second needs its result), or set out with its result open when
     neither step needs the other's answer (the payment and the balance) */
  const stepDone = (s: any) => kind === "two" && (builtNow(s) || !!s.opened);
  const opOf = (s: any) => (stepDone(s) ? stepOf(s.order[1]).op : "-");
  const needOf = (s: any) => (pr.anyOrder && s.order.length ? [stepOf(s.order[1]).a, stepOf(s.order[1]).b] : pr.need);
  const stepVal = (s: any, st: any) => { const a = val(s, st.a) || 0, b = val(s, st.b) || 0; return st.op === "+" ? a + b : a - b; };
  const byPart = () => (pr.steps || []).slice().sort((x: any, y: any) => x.part - y.part);
  const needsPick = kind === "diff" || kind === "spare" || kind === "reach";
  const cardLabel = (cid: string | null) => { const c = SD_CARDS.find((x) => x[0] === cid); return c ? c[1] : ""; };
  const told2 = (total: any) => (Array.isArray(total) ? total : [total]);
  /* the answer sentence; `l` picks the language's own template from TR (English when left out) */
  const tellOf = (total: any, l = "en") => {
    const t = told2(total), p = pr.anyOrder ? t[0] : pr.steps && pr.steps[0].out ? sdRecipe(pr)[pr.steps[0].out] : null;
    const tpl = String(pr.tell || "{n}"), own = l === "en" ? tpl : (TR[l] && TR[l][tpl]) || tpl;
    return own.replace("{n}", indian(t[t.length - 1])).replace("{p}", p === null ? "" : indian(p));
  };
  /* spoken: the same sentence in each language (a Spoken value: the runtime reads the one in use) */
  const tellSay = (total: any) => ({ en: tellOf(total), hi: tellOf(total, "hi"), gu: tellOf(total, "gu") });
  /* another route to a number: the answer given may be what it gives (the sum, the prices compared) */
  const routeVal = (r: any) => { const v = sdRecipe(pr); return r.op === "+" ? v[r.a] + v[r.b] : v[r.a] - v[r.b]; };
  const routeRow = (r: any, right: boolean) => { const v = sdRecipe(pr); return { label: r.label, a: v[r.a], b: v[r.b], op: r.op, v: routeVal(r), right }; };
  const rivalOf = (wv: any) => {
    if (wv === null || wv === undefined || !pr.rivals || !item) return null;
    const got = item.parts ? slotPartsOf(wv, item.parts.length).map((x: string) => (x === "" ? null : Number(x))) : [leadNumber(wv)];
    return pr.rivals.find((r: any) => got[item.parts ? r.part || 0 : 0] === routeVal(r)) || null;
  };

  /* where a piece sits: on the board, in the bay's foot (a built card), or on the mat */
  const posOf = (id: string) => {
    if (outStep(id)) return { x: 946, y: bayTop + 118 };
    for (const ln of board.lines) for (const it of ln.items) if (it.tok && it.tok.id === id) return { x: it.x + it.w / 2, y: ln.y + 37 };
    return { x: 300, y: 60 };
  };
  const matPos = (r: number) => ({ x: sdColC(2), y: rowTop(r) + MR.row / 2 });
  const lineOf = (id: string) => board.lines.findIndex((ln: any) => ln.items.some((t: any) => t.tok && t.tok.id === id));

  /* a timed plan: each step merges its patch into the state, then waits */
  const planner = (start: any, slow: number) => {
    const P: any = { sim: start, steps: [] as any[] };
    P.at = (ms: number, patch: any, fx?: () => void) => {
      P.sim = { ...P.sim, ...patch };
      P.steps.push([Math.round(ms * slow), () => { put(patch); if (fx) fx(); }]);
    };
    return P;
  };
  /* the columns taken from the ones, as the book works them: where the top digit is too small, the next
     column with something in it lends one; each zero on the way opens a ten and lends one on; the
     lending digit is struck once and its new value written above it; the ten travels into the column */
  const subSteps = (P: any, a: number, b: number) => {
    const len = String(a).length, ansLen = String(a - b).length;
    const cur = sdDigits(a, len), bot = sdDigits(b, len);
    const tr: any = {}, diff: any = {};
    const snap = (ten: any = null) => ({ wk: { op: "-", tr: { ...tr }, diff: { ...diff }, carry: {} }, ten });
    for (let k = 0; k < len; k++) {
      P.at(260, { hl: k });
      if (cur[k] < bot[k]) {
        let j = k + 1;
        while (j < len && cur[j] === 0) j++;
        for (let m = j; m > k; m--) {
          cur[m] -= 1; tr[m] = cur[m];
          P.at(420, snap({ to: m - 1, n: P.steps.length }), tick);
          cur[m - 1] += 10; tr[m - 1] = cur[m - 1];
          P.at(300, snap());
        }
      }
      if (k < ansLen) diff[k] = cur[k] - bot[k];
      P.at(460, snap(), tick);
    }
    P.at(240, { hl: null });
  };
  /* the columns added from the ones, each carry written small over the next column */
  const addSteps = (P: any, a: number, b: number) => {
    const tlen = String(a + b).length;
    const A = sdDigits(a, tlen), B = sdDigits(b, tlen);
    const carry: any = {}, diff: any = {};
    let c = 0;
    for (let k = 0; k < tlen; k++) {
      P.at(260, { hl: k });
      const t = A[k] + B[k] + c;
      diff[k] = t % 10;
      c = t > 9 ? 1 : 0;
      if (c) carry[k + 1] = 1;
      P.at(460, { wk: { op: "+", tr: {}, diff: { ...diff }, carry: { ...carry } } }, tick);
    }
    P.at(240, { hl: null });
  };
  /* the tiny version: the have counters, the ones added to reach the target, then the move written */
  const stripSteps = (P: any) => {
    const [have, goal] = pr.tiny;
    P.at(460, { strip: 1, tinyAdd: 0 }, tick);
    for (let i = 1; i <= goal - have; i++) P.at(380, { strip: 1, tinyAdd: i }, tick);
    P.at(520, { strip: 2, tinyAdd: goal - have });
  };
  /* the bay works the first step in its own columns and builds its card with a drawn edge */
  const buildSteps = (P: any) => {
    const st = pr.steps[0], a = val(P.sim, st.a) || 0, b = val(P.sim, st.b) || 0;
    const c = st.op === "+" ? a + b : a - b;
    const bay = { a, b: null as any, op: st.op, c, shown: 0 };
    P.at(320, { bay, early: false });
    P.at(440, { bay: { ...bay, b } });
    const len = String(c).length;
    for (let k = 1; k <= len; k++) P.at(170, { bay: { ...bay, b, shown: k } }, k === len ? tick : undefined);
    P.at(420, { built: { [st.out]: c } }, tick);
  };

  /* the payment and the balance: the first step is set out in the bay with its result open */
  const layFirst = (P: any) => {
    const st = stepOf(P.sim.order[0]), bay = { a: val(P.sim, st.a), b: null as any, op: st.op, c: null as any, shown: 0, tag: st.tag };
    P.at(320, { bay, early: false });
    P.at(440, { bay: { ...bay, b: val(P.sim, st.b) }, opened: true }, tick);
  };
  const fillFirst = (P: any) => {
    const st = stepOf(P.sim.order[0]), c = stepVal(P.sim, st), bay = { ...P.sim.bay, c, shown: 0 }, len = String(c).length;
    P.at(260, { bay });
    for (let k = 1; k <= len; k++) P.at(170, { bay: { ...bay, shown: k } }, k === len ? tick : undefined);
  };

  /* the whole working, from where the child left it: the question card, the spare turned down, the tiny
     version, the steps laid in order and the first one built, the two numbers down the right way up,
     the columns worked, and the answer written back into a sentence. The win and the traceback both run it. */
  const plan = (slow: number, wrongVal: any) => {
    const start = { ...SR.current, fly: null, tip: null, lit: false, litLine: null, hl: null, ten: null };
    put({ fly: null, tip: null, lit: false, litLine: null, hl: null, ten: null });
    const P = planner(start, slow);
    const v = (id: string) => val(P.sim, id) || 0;
    if (needsPick && !P.sim.picked) { P.at(520, { lit: true }); P.at(620, { picked: pr.right[0] }, tick); P.at(220, { lit: false }); }
    if (kind === "two" && !stepDone(P.sim)) {
      const want = pr.steps.map((x: any) => x.id);
      if (pr.anyOrder ? !P.sim.order.length : P.sim.order.join() !== want.join()) P.at(560, { order: want, early: false, bay: null, eitherNote: !!pr.anyOrder }, tick);
      if (pr.anyOrder) layFirst(P); else buildSteps(P);
    }
    /* the answer given was another route's: that route is written under the mat, in ink, before the right working */
    const rv = rivalOf(wrongVal);
    if (rv) P.at(900, { rival: [routeRow(rv, false)] }, tick);
    if (kind === "reach" && P.sim.strip < 2) stripSteps(P);
    const flyBack = (id: string, r: number) => {
      const a = matPos(r), b = posOf(id), mat = P.sim.mat.slice();
      mat[r] = null;
      P.at(40, { fly: { ...a, v: v(id), rs: isRs(id) }, wk: null, told: null });
      P.at(480, { fly: { ...b, v: v(id), rs: isRs(id) } });
      P.at(80, { fly: null, mat }, tick);
    };
    if (pr.spare) {
      const id = pr.spare, li = lineOf(id), r = P.sim.mat.indexOf(id);
      P.at(360, { litLine: li });
      if (r >= 0) flyBack(id, r);
      if (!P.sim.grey.includes(id)) P.at(480, { grey: [...P.sim.grey, id] }, tick);
      P.at(300, { litLine: null });
    }
    /* anything on the mat the working does not need goes back where it came from */
    const need = needOf(P.sim);
    [0, 1].forEach((r) => { const id = P.sim.mat[r]; if (id && !need.includes(id)) flyBack(id, r); });
    /* a needed number in the wrong row: the two rows trade places */
    if (P.sim.mat[0] === need[1] || P.sim.mat[1] === need[0]) P.at(560, { mat: [P.sim.mat[1], P.sim.mat[0]], wk: null, told: null }, tick);
    [0, 1].forEach((r) => {
      const id = need[r];
      if (P.sim.mat[r] === id) return;
      const a = posOf(id), b = matPos(r), mat = P.sim.mat.slice();
      mat[r] = id;
      P.at(40, { fly: { ...a, v: v(id), rs: isRs(id), built: !!outStep(id) }, grey: P.sim.grey.filter((g: string) => g !== id) });
      P.at(460, { fly: { ...b, v: v(id), rs: isRs(id), built: !!outStep(id) } });
      P.at(60, { fly: null, mat, wk: null, told: null }, tick);
    });
    if (P.sim.wk) P.at(260, { wk: null, told: null, addBack: false });
    const a = v(need[0]), b = v(need[1]), op = opOf(P.sim);
    if (op === "+") addSteps(P, a, b); else subSteps(P, a, b);
    let total: any = op === "+" ? a + b : a - b;
    if (pr.anyOrder) { fillFirst(P); total = byPart().map((st: any) => stepVal(P.sim, st)); }
    P.at(420, { told: total, addBack: kind === "reach", ...(rv ? { rival: [routeRow(rv, false), routeRow(rv.right, true)] } : {}) });
    return { steps: P.steps, total };
  };

  /* ── the child's own moves ── */
  const nudge = () => {
    api.say("First pick the card that says what is asked.");
    put({ lit: true });
    later(() => put({ lit: false }), 1500);
  };
  const nudgeSteps = () => {
    const s = SR.current;
    /* one literal line per case (the same lines as before), so `cli voice` can bake each one */
    if (s.order.length) api.say("Work the first step before the second. Tap it.");
    else api.say("First tap the step that comes first.");
  };
  const afterPick = () => {
    if (kind === "spare") return api.say(["Drag the number with no job into the grey bay.", "Bring the other two down to the mat."]);
    if (kind === "reach") return api.say("Open the tiny version. Then bring the two numbers down.");
    return api.say("Now bring its two numbers down to the mat.");
  };
  const pick = (cid: string) => {
    const s = SR.current;
    if (!canAct || s.picked) return;
    if (pr.right.includes(cid)) { put({ picked: cid, lit: false, tip: null }); tick(); afterPick(); return; }
    put({ tip: cid, lit: true });
    api.say("Read the last line again. Does it ask that?");
    later(() => put({ tip: null, lit: false }), 1400);
  };
  /* both numbers down: a smaller one over a greater one does not settle */
  const settled = (s: any, mat: any[]) => {
    const [a, b] = mat.map((id: string) => val(s, id));
    if (a === null || b === null || free) return;
    if (opOf(s) === "-" && a < b) { if (!s.hoverSaid) { put({ hoverSaid: true }); api.say("The smaller number cannot go on top. Swap them."); } return; }
    if (!s.prompted) {
      put({ prompted: true });
      const then = item && item.parts ? "Then type both answers, one in each box." : "Then type the answer.";
      api.say([opOf(s) === "+" ? "Add the columns from the ones." : "Take the lower number off the top one, from the ones.", then]);
    }
  };
  const lift = (id: string, row?: number) => {
    const s = SR.current;
    if (!canAct) return;
    if (needsPick && !s.picked) return nudge();
    if (kind === "two" && !stepDone(s)) return nudgeSteps();
    if (val(s, id) === null) return;
    const mat = s.mat.slice(), at = mat.indexOf(id);
    if (row === undefined || row === at) {
      if (at >= 0) return;
      const r = mat[0] === null ? 0 : mat[1] === null ? 1 : -1;
      if (r < 0) {
        if (kind === "spare") api.say("The mat holds two numbers. Which one has no job?");
        else api.say("The mat holds two numbers. Put one back first.");
        return;
      }
      mat[r] = id;
    } else {
      if (at >= 0) mat[at] = null;
      const other = 1 - row;
      if (mat[row] !== null && mat[other] === null) mat[other] = mat[row];
      mat[row] = id;
    }
    put({ mat, grey: s.grey.filter((g: string) => g !== id), wk: null, told: null, hl: null, addBack: false });
    tick();
    settled(SR.current, mat);
  };
  const back = (id: string) => {
    const s = SR.current;
    if (!canAct || !s.mat.includes(id)) return;
    put({ mat: s.mat.map((m: string) => (m === id ? null : m)), wk: null, told: null, hl: null, addBack: false });
    tick();
  };
  const swapRows = () => {
    const s = SR.current;
    if (!canAct) return;
    const mat = [s.mat[1], s.mat[0]];
    put({ mat, wk: null, told: null, hl: null });
    tick();
    settled(SR.current, mat);
  };
  const greyOut = (id: string) => {
    const s = SR.current;
    if (!canAct) return;
    if (needsPick && !s.picked) return nudge();
    const off = s.mat.includes(id) ? { mat: s.mat.map((m: string) => (m === id ? null : m)), wk: null, told: null, hl: null } : {};
    put({ grey: [...s.grey.filter((g: string) => g !== id), id], ...off });
    tick();
  };
  const unGrey = (id: string) => { const s = SR.current; if (canAct) { put({ grey: s.grey.filter((g: string) => g !== id) }); tick(); } };
  const openStrip = () => {
    const s = SR.current;
    if (!canAct || s.strip > 0 || !pr.tiny) return;
    const P = planner({ ...s }, 1);
    stripSteps(P);
    tb.run(P.steps, () => api.say(["What did you do to the tiny numbers?", "Do the same to the big ones."]));
  };
  const chooseFirst = (sid: string) => {
    const s = SR.current;
    if (!canAct || s.order.length) return;
    const other = pr.steps.find((x: any) => x.id !== sid).id;
    put({ order: [sid, other], early: false, eitherNote: !!pr.anyOrder });
    tick();
    if (pr.anyOrder) api.say(["Neither step needs the other's answer, so either can go first.", "Tap the first step to set it out."]);
    else api.say("Tap the first step to work it. Tap the second to swap them.");
  };
  const swapSteps = () => {
    const s = SR.current;
    if (!canAct || stepDone(s) || s.order.length < 2) return;
    put({ order: [s.order[1], s.order[0]], early: false });
    tick();
  };
  const workFirst = () => {
    const s = SR.current;
    if (!canAct || stepDone(s) || !s.order.length) return;
    if (!pr.anyOrder && s.order[0] !== pr.steps[0].id) { put({ early: true }); api.say(pr.early.say); return; }
    const P = planner({ ...s }, 1);
    if (pr.anyOrder) layFirst(P); else buildSteps(P);
    tb.run(P.steps, () => {
      if (pr.anyOrder) api.say(["Work this one out, and type it in its box.", "The second step is open. Bring its two numbers down to the mat."]);
      else api.say(["The second step is open.", "Bring its two numbers down to the mat."]);
    });
  };

  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    const s = SR.current;
    if (!canAct) return;
    if (!moved) {
      if (s.grey.includes(pay.id)) return unGrey(pay.id);
      return lift(pay.id);
    }
    const overMat = p.x < SDR.x - 8 && p.y > matTop - 12;   /* anywhere left of the right column, under the board */
    const overRight = p.x > SDR.x - 16 && p.y > matTop - 12;
    if (overMat) return lift(pay.id, p.y < rowTop(1) ? 0 : 1);
    if (overRight && (kind === "spare" || kind === "free") && pay.src === "num") return greyOut(pay.id);
  });
  /* keyboard: Enter or Space is a tap; where there is a grey bay, Delete turns a number down */
  const keysFor = (pay: any) => {
    const k = drag.keys(pay);
    return { onKeyDown: (e: any) => {
      if ((kind === "spare" || kind === "free") && e.key === "Delete") { e.preventDefault(); e.stopPropagation(); greyOut(pay.id); return; }
      k.onKeyDown(e);
    } };
  };

  /* ── the win: whatever the child left undone is done in front of them, then the sentence is read ── */
  useEffect(() => {
    if (stage !== "win" || free) return;
    tb.stop(); clearLater();
    const s = SR.current;
    if (s.told !== null && s.told !== undefined) { api.say(tellSay(s.told)); return; }
    const r = plan(0.5, null);
    tl.run(r.steps, () => api.say(tellSay(r.total)));
  }, [stage]);

  /* ── the traceback: the working redrawn in steps, ending on the whole answer and its sentence;
        nothing marked, nothing cleared, the child's answer stays in the slot ── */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    tb.stop(); clearLater();
    api.lock(true);
    const r = plan(1, wrong.value);
    tl.run([[350, () => {}], ...r.steps, [300, () => {}]], () => api.lock(false));
  }, [wrong]);

  /* free play: the mat works itself whenever two numbers stand on it the right way up */
  const matKey = S.mat.join(",");
  useEffect(() => {
    if (!free) return;
    const s = SR.current;
    const [a, b] = s.mat.map((id: string) => val(s, id));
    if (a === null || b === null || a < b) { tl.stop(); put({ wk: null, hl: null, ten: null }); return; }
    const P = planner({ ...s, wk: null }, 0.7);
    P.at(200, { wk: null, hl: null, ten: null });
    subSteps(P, a, b);
    tl.run(P.steps);
  }, [matKey, free]);

  /* ── what the host and the agent read back (toolApi.getState) ── */
  const told = S.told !== null && S.told !== undefined;
  api.share({
    phase: n, problem: pr.free ? "free" : (item && item.qid) || null,
    questionCard: kind === "two" ? (S.order.length ? stepOf(S.order[0]).label + ", then " + stepOf(S.order[1]).label.toLowerCase() : null) : S.picked ? cardLabel(S.picked) : null,
    liftedNumbers: S.mat.filter(Boolean).map((id: string) => val(S, id)), dimmed: S.grey.map((id: string) => val(S, id)),
    shrunk: kind === "reach" ? (S.strip >= 2 ? pr.tiny[1] + " − " + pr.tiny[0] : S.strip ? "open" : "shut") : null,
    builtAmount: kind === "two" && builtNow(S) ? S.built[pr.steps[0].out] : null,
    stepOrder: kind === "two" ? S.order.map((sid: string) => stepOf(sid).label) : null,
    answerSentence: told ? tellOf(S.told) : null, complete: stage === "idle",
  });

  /* ── drawing ── */
  const cardArt = (cx: number, cy: number, v: number, o: any = {}) => {
    const w = sdCardW(v, !!o.rs);
    return (
      <g filter={o.grey ? undefined : o.lift ? "url(#fLift)" : "url(#fShadowSoft)"}>
        <rect x={cx - w / 2} y={cy - 28} width={w} height={56} rx={14} fill={o.grey ? "#ECECEC" : "#FFFFFF"}
          stroke={o.grey ? SD_GREY : o.built ? C.accent : C.rule} strokeWidth={o.built ? 3 : 2} strokeDasharray={o.grey ? "7 5" : undefined} />
        {o.built && <rect x={cx - w / 2 + 6} y={cy - 22} width={w - 12} height={44} rx={10} fill="none" stroke={C.accent} strokeWidth={1.5} strokeDasharray="6 5" />}
        <text x={cx} y={cy + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={o.grey ? SD_GREY : C.ink}>{sdCardText(v, !!o.rs)}</text>
      </g>
    );
  };

  const piece = (it: any, ln: any) => {
    const t = it.tok, id = t.id, y = ln.y, v = t.v;
    if (S.mat.includes(id)) {
      /* lifted: a ruled dash keeps its place so the sentence still reads; a tap pushes it back */
      return (
        <g key={"piece-" + id}>
          <line x1={it.x + 22} y1={y + 56} x2={it.x + it.w - 22} y2={y + 56} stroke={C.rule} strokeWidth={4} strokeLinecap="round" />
          {canAct && <Hit id={"back-" + id} label={"Put " + sdCardText(v, t.rs) + " back"} x={it.x} y={y + 1} w={it.w} h={72} onPress={() => back(id)} />}
        </g>
      );
    }
    const grey = S.grey.includes(id), pay = { src: "num", id };
    return (
      <g key={"piece-" + id} className={canAct ? "c4-piece sd-grab" : ""}
        {...(canAct ? { ...control("num-" + id, (grey ? "Turned down: " : "Number ") + sdCardText(v, t.rs)), ...drag.bind(pay), ...keysFor(pay) } : {})}>
        {cardArt(it.x + it.w / 2, y + 37, v, { grey, rs: t.rs })}
        <rect x={it.x} y={y + 1} width={it.w} height={72} fill="transparent" />
      </g>
    );
  };

  /* the answer written back into a sentence, its number in the answer's green */
  const sentenceText = (x: number, y: number, total: any) => {
    const segs: any[] = [];
    let rest = tellOf(total, lang);
    told2(total).forEach((t: number) => {
      const num = indian(t), at = rest.indexOf(num);
      if (at < 0) return;
      if (at > 0) segs.push([rest.slice(0, at), false]);
      segs.push([num, true]);
      rest = rest.slice(at + num.length);
    });
    if (rest) segs.push([rest, false]);
    return (
      <text key={"told-" + told2(total).join("-")} className="sd-in" x={x} y={y} fontSize={T.label} fontWeight={500} fill={C.ink}>
        {segs.map((g: any, k: number) => <tspan key={k} fontWeight={g[1] ? 700 : 500} fill={g[1] ? SD_GREEN : C.ink}>{g[0]}</tspan>)}
      </text>
    );
  };

  const drawBoard = () => {
    const q = pr.q ? tx(pr.q) : null;
    const qW = q ? sdMeasure(q, T.label, 600) : 0;
    return (
      <g data-role="reading">
        <rect x={0} y={0} width={W.w} height={board.h} rx={RAD.panel} fill={C.paper} stroke={C.rule} strokeWidth={2} />
        {board.lines.map((ln: any, li: number) => (
          <g key={li}>
            {(S.litLine === li || (S.lit && !pr.q && li === 0)) && <rect x={SDB.left - 6} y={ln.y + 67} width={ln.width - SDB.left + 12} height={6} rx={3} fill={SD_AMBER} />}
            {ln.items.map((it: any, k: number) => it.kind === "w"
              ? <text key={"word-" + k} x={it.x} y={ln.y + 48} fontSize={T.label} fontWeight={500} fill={C.ink}>{it.text}</text>
              : piece(it, ln))}
          </g>
        ))}
        {board.qy !== null && !told && S.lit && pr.q && <rect x={SDB.left - 8} y={board.qy + 4} width={qW + 16} height={42} rx={12} fill={tint(SD_AMBER, 0.65)} />}
        {board.qy !== null && (told
          ? sentenceText(SDB.left, board.qy + 34, S.told)
          : q ? <text x={SDB.left} y={board.qy + 34} fontSize={T.label} fontWeight={600} fill={C.ink}>{q}</text> : null)}
      </g>
    );
  };

  /* the column mat: headings, the trade strip, the greater number, the one taken away, a rule, the answer */
  const mv = [0, 1].map((r) => val(S, S.mat[r]));
  const op = opOf(S);
  const hover = !told && op === "-" && mv[0] !== null && mv[1] !== null && (mv[0] as number) < (mv[1] as number);
  const wk = S.wk;
  const drawRow = (r: number) => {
    const id = S.mat[r];
    if (!id) {
      return <rect key={"e" + r} x={sdColX(4) - 4} y={rowTop(r) + 5} width={SDM.col * 5 + 4} height={MR.row - 10} rx={8} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="8 7" />;
    }
    const v = val(S, id) || 0, ds = String(v).split("").reverse(), y = rowTop(r), lift = hover && r === 0 ? -7 : 0;
    const base = y + MR.base + lift, fill = r === 0 ? SD_BLUE : SD_AMBER_INK, built = !!outStep(id);
    return (
      <g key={"row-" + id + "-" + r} className="sd-in">
        {built && <rect x={sdColX(ds.length - 1) + 3} y={y + 5 + lift} width={ds.length * SDM.col - 6} height={MR.row - 10} rx={10} fill="none" stroke={C.accent} strokeWidth={2} strokeDasharray="6 5" />}
        {!hover && <text x={12} y={y + MR.base - 4} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(tagOf(id))}</text>}
        {ds.map((d: string, k: number) => {
          const struck = r === 0 && wk && wk.tr && wk.tr[k] !== undefined;
          return (
            <g key={k}>
              <text x={sdColC(k)} y={base} textAnchor="middle" fontSize={MR.size} fontWeight={700} fill={d === "0" ? SD_GREY : fill}>{d}</text>
              {struck && <line x1={sdColC(k) - 17} y1={base - 3} x2={sdColC(k) + 17} y2={base - MR.cut} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />}
            </g>
          );
        })}
      </g>
    );
  };
  const drawMat = () => (
    <g>
      <rect x={0} y={matTop} width={SDM.w} height={matH} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      {S.hl !== null && <rect x={sdColX(S.hl) + 2} y={matTop + 2} width={SDM.col - 4} height={matH - 4} rx={10} fill={SD_AMBER} fillOpacity={0.13} />}
      {[0, 1, 2, 3, 4, 5, 6].map((k) => {
        const x = k === 6 ? sdColX(5) : sdColX(k) + SDM.col;
        return <line key={"v" + k} x1={x} y1={matTop + SDM.head} x2={x} y2={ansBase + 8} stroke={tint(C.rule, 0.35)} strokeWidth={1.5} />;
      })}
      {SD_COLS.map((h, j) => {
        const k = 5 - j, lit = S.hl === k;
        return (
          <g key={h}>
            <rect x={sdColX(k) + 3} y={matTop + 4} width={SDM.col - 6} height={28} rx={8} fill={lit ? tint(SD_AMBER, 0.55) : tint(C.panel, 0.35)}
              stroke={lit ? SD_AMBER : "none"} strokeWidth={lit ? 3 : 0} />
            <text x={sdColC(k)} y={matTop + 27} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(h)}</text>
          </g>
        );
      })}
      {/* the trade strip: a traded digit's new value in rose; the ten travelling in, vermilion; a carry, vermilion */}
      {wk && Object.keys(wk.tr || {}).map((ks) => {
        const k = Number(ks);
        if (S.ten && S.ten.to === k) return null;
        return <text key={"t" + k + "-" + wk.tr[k]} className="sd-pop" x={sdColC(k)} y={matTop + SDM.head + MR.strip - 5} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={SD_ROSE}>{wk.tr[k]}</text>;
      })}
      {S.ten && (
        <text key={"ten-" + S.ten.n} className="sd-ten" x={sdColC(S.ten.to)} y={matTop + SDM.head + MR.strip - 5} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={SD_VERM}>10</text>
      )}
      {wk && Object.keys(wk.carry || {}).map((ks) => (
        <text key={"c" + ks} className="sd-pop" x={sdColC(Number(ks))} y={matTop + SDM.head + MR.strip - 5} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={SD_VERM}>1</text>
      ))}
      {hover && <rect x={sdColX(4) - 8} y={rowTop(0) - 4} width={SDM.col * 5 + 12} height={MR.row * 2 + 4} rx={12} fill="none" stroke={C.accent} strokeWidth={2} strokeDasharray="8 6" />}
      {drawRow(0)}
      {drawRow(1)}
      <text x={sdColC(5)} y={rowTop(1) + MR.base} textAnchor="middle" fontSize={MR.size} fontWeight={700} fill={C.ink}>{op === "+" ? "+" : "−"}</text>
      <rect x={sdColX(5)} y={ruleY} width={SDM.col * 6} height={4} rx={2} fill={C.ink} />
      {wk && Object.keys(wk.diff || {}).map((ks) => {
        const k = Number(ks), d = wk.diff[k], last = Object.keys(wk.diff).length - 1;
        return (
          <text key={"d" + k + "-" + d} className="sd-pop" x={sdColC(k)} y={ansBase} textAnchor="middle" fontSize={MR.size} fontWeight={700}
            fill={d === 0 && k < last ? SD_GREY : SD_GREEN}>{d}</text>
        );
      })}
      {hover && canAct && (
        <g>
          <circle cx={48} cy={rowTop(1)} r={30} fill="url(#gKey)" stroke={C.rule} strokeWidth={2} />
          <path d={`M ${38} ${rowTop(1) + 14} V ${rowTop(1) - 12} M ${30} ${rowTop(1) - 4} L ${38} ${rowTop(1) - 14} L ${46} ${rowTop(1) - 4}`}
            fill="none" stroke={C.ink} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
          <path d={`M ${58} ${rowTop(1) - 14} V ${rowTop(1) + 12} M ${50} ${rowTop(1) + 4} L ${58} ${rowTop(1) + 14} L ${66} ${rowTop(1) + 4}`}
            fill="none" stroke={C.ink} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
          <Hit id="swap-rows" label="Swap the two numbers" x={12} y={rowTop(1) - 36} w={72} h={72} onPress={swapRows} />
          <Invite x={48} y={rowTop(1)} r={40} C={C} />
        </g>
      )}
    </g>
  );

  /* the right column: the question cards until one is picked, then the card that was picked and the
     phase's own bay: the grey bay (phase 2), the tiny version (phase 3), the step order bay (phase 4) */
  const qCard = (label: string, y: number, key: string, badge = "?") => {
    const size = sdMeasure(label, T.label, 500) <= SDR.w - 100 ? T.label : T.micro;
    return (
      <g key={key}>
        <rect x={SDR.x} y={y} width={SDR.w} height={72} rx={RAD.key} fill="#FFFFFF" stroke={C.accent} strokeWidth={3} />
        <circle cx={SDR.x + 38} cy={y + 36} r={21} fill={C.accent} />
        <text x={SDR.x + 38} y={y + 46} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF">{badge}</text>
        <text x={SDR.x + 74} y={y + 36 + size * 0.36} fontSize={size} fontWeight={600} fill={C.ink}>{label}</text>
      </g>
    );
  };
  const greyBay = (y: number) => (
    <g key="grey-bay">
      <rect x={SDR.x} y={y} width={SDR.w} height={140} rx={RAD.panel} fill="#FFFFFF" stroke={SD_GREY} strokeWidth={2.5} strokeDasharray="10 8" />
      <text x={SDR.x + SDR.w / 2} y={y + 80} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={SD_GREY}>{tx("no job")}</text>
    </g>
  );
  const drawStrip = (y: number) => {
    const [have, goal] = pr.tiny;
    if (S.strip === 0) {
      return (
        <g key="strip-shut">
          <Key id="tiny" label={tx("Try it with tiny numbers")} x={SDR.x} y={y} w={SDR.w} h={80} C={C} disabled={!canAct} onClick={openStrip}>
            {[0, 1, 2].map((i) => <circle key={i} cx={-SDR.w / 2 + 34 + i * 20} cy={0} r={10 - i * 3} fill={C.accent} />)}
            <text x={-SDR.w / 2 + 96} y={11} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("Tiny numbers")}</text>
          </Key>
          {canAct && !hover && <Invite x={SDR.x + 54} y={y + 40} r={40} C={C} />}
        </g>
      );
    }
    const pitch = Math.min(52, Math.floor((SDR.w - 40) / goal)), x0 = SDR.x + (SDR.w - pitch * goal) / 2 + pitch / 2;
    const eq = (parts: any[], yy: number, size: number) => {
      const gap = 14, ws = parts.map((p) => sdMeasure(String(p[0]), size, 700));
      let x = SDR.x + (SDR.w - (ws.reduce((a, b) => a + b, 0) + gap * (parts.length - 1))) / 2;
      return parts.map((p, i) => { const el = <text key={i} x={x + ws[i] / 2} y={yy} textAnchor="middle" fontSize={size} fontWeight={700} fill={p[1]}>{p[0]}</text>; x += ws[i] + gap; return el; });
    };
    return (
      <g key="strip" data-role="reading">
        <rect x={SDR.x} y={y} width={SDR.w} height={528 - y} rx={RAD.panel} fill="#FFFFFF" stroke={C.accent} strokeWidth={2.5} />
        {eq([[have, SD_AMBER_INK], ["+", C.ink], ["?", C.ink], ["=", C.ink], [goal, SD_BLUE]], y + 44, T.label)}
        {Array.from({ length: goal }).map((_, i) => {
          const cx = x0 + i * pitch, cy = y + 100;
          if (i < have) return <Disc key={i} x={cx} y={cy} r={19} paint="gTen" />;
          if (i < have + S.tinyAdd) return <g key={i} className="sd-pop"><Disc x={cx} y={cy} r={19} paint="gOne" /></g>;
          return <circle key={i} cx={cx} cy={cy} r={19} fill="none" stroke={CONTENT.hundred} strokeWidth={2.5} strokeDasharray="5 4" />;
        })}
        {S.strip >= 2 && <g className="sd-in">{eq([[goal, SD_BLUE], ["−", C.ink], [have, SD_AMBER_INK], ["=", C.ink], [goal - have, SD_GREEN]], y + 176, T.label)}</g>}
        {S.addBack && told && (() => {
          const v = sdRecipe(pr);
          return <g className="sd-in">{eq([[indian(S.told), SD_GREEN], ["+", C.ink], [indian(v[pr.need[1]]), SD_AMBER_INK], ["=", C.ink], [indian(v[pr.need[0]]), SD_BLUE]], y + 246, T.micro)}</g>;
        })()}
      </g>
    );
  };
  const lock = (x: number, y: number) => (
    <g>
      <path d={`M ${x - 9} ${y - 2} V ${y - 10} A 9 9 0 0 1 ${x + 9} ${y - 10} V ${y - 2}`} fill="none" stroke={C.ink} strokeWidth={3.5} />
      <rect x={x - 14} y={y - 3} width={28} height={22} rx={5} fill={C.ink} />
    </g>
  );
  const drawSteps = () => {
    const built = stepDone(S), hasCard = builtNow(S), ord = S.order;
    const slot = (k: number) => {
      const y = matTop + k * 80, sid = ord[k], st = sid ? stepOf(sid) : null, name = tx(k === 0 ? "1st" : "2nd");
      if (!st) {
        return (
          <g key={"slot" + k}>
            <rect x={SDR.x} y={y} width={SDR.w} height={72} rx={RAD.key} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="9 7" />
            <text x={SDR.x + 20} y={y + 46} fontSize={T.micro} fontWeight={700} fill={C.ink}>{name}</text>
            {k === 1 && lock(SDR.x + SDR.w - 36, y + 38)}
          </g>
        );
      }
      const lab = tx(st.label), size = sdMeasure(lab, T.label, 600) <= SDR.w - 150 ? T.label : T.micro;
      const face = (
        <g>
          <text x={-SDR.w / 2 + 20} y={10} fontSize={T.micro} fontWeight={700} fill={C.ink}>{name}</text>
          <text x={-SDR.w / 2 + 84} y={size * 0.36} fontSize={size} fontWeight={600} fill={C.ink}>{lab}</text>
          {k === 1 && !built && <g transform={`translate(${SDR.w / 2 - 36},-2)`}>{lock(0, 0)}</g>}
        </g>
      );
      if (k === 1 && built) {
        return (
          <g key={"slot" + k}>
            <rect x={SDR.x} y={y} width={SDR.w} height={72} rx={RAD.key} fill="#FFFFFF" stroke={C.accent} strokeWidth={3} />
            <g transform={`translate(${SDR.x + SDR.w / 2},${y + 36})`}>{face}</g>
          </g>
        );
      }
      return (
        <Key key={"slot" + k} id={k === 0 ? "step-first" : "step-second"} label={k === 0 ? "Work the first step: " + st.label : "Make this step first: " + st.label}
          x={SDR.x} y={y} w={SDR.w} h={72} C={C} disabled={!canAct || built} primary={k === 0 && !built && !S.early} onClick={k === 0 ? workFirst : swapSteps}>
          {k === 0 && !built && !S.early
            ? <g><text x={-SDR.w / 2 + 20} y={10} fontSize={T.micro} fontWeight={700} fill="#FFFFFF">{name}</text>
              <text x={-SDR.w / 2 + 84} y={size * 0.36} fontSize={size} fontWeight={600} fill="#FFFFFF">{lab}</text></g>
            : face}
        </Key>
      );
    };
    /* the bay: the first step worked in its own columns (or, laid in the wrong order, the gap it cannot fill) */
    const rowNum = (v: number | null, yy: number, fill: string, shown = 99) => v === null
      ? <g><rect x={sdBayC(4) - 24} y={yy - 32} width={44 * 5 + 4} height={40} rx={8} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="7 6" />
        <text x={sdBayC(2)} y={yy} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>?</text></g>
      : <g>{String(v).split("").reverse().map((d, k) => k < shown ? (
        <text key={k} x={sdBayC(k)} y={yy} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={d === "0" && k < String(v).length - 1 ? SD_GREY : fill}>{d}</text>
      ) : null)}</g>;
    const bay = () => {
      if (!ord.length) return null;
      const st0 = stepOf(ord[0]), e = pr.early;
      if (S.early && !built && !S.bay) {
        const a = e.a ? val(S, e.a) : null, b = e.b ? val(S, e.b) : null;
        return (
          <g key="early" className="sd-in">
            <text x={SDR.x + 12} y={bayTop + 34} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(tagOf(e.a))}</text>
            {rowNum(a, bayTop + 34, SD_BLUE)}
            <text x={SDR.x + 12} y={bayTop + 74} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(tagOf(e.b))}</text>
            <text x={sdBayC(5) - 6} y={bayTop + 74} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{e.op === "+" ? "+" : "−"}</text>
            {rowNum(b, bayTop + 74, SD_AMBER_INK)}
            <rect x={sdBayC(4) - 24} y={bayTop + 84} width={44 * 5 + 4} height={3} rx={1.5} fill={C.ink} />
            {a !== null && b !== null && a < b && <text x={sdBayC(4) - 24} y={bayTop + 126} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("not enough")}</text>}
          </g>
        );
      }
      const bv = S.bay || (hasCard ? { a: val(S, st0.a), b: val(S, st0.b), op: st0.op, c: S.built[st0.out], shown: 9 } : null);
      if (!bv) return null;
      const out = st0.out, onMat = S.mat.includes(out), pay = { src: "built", id: out };
      return (
        <g key="bay">
          <text x={SDR.x + 12} y={bayTop + 34} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(tagOf(st0.a))}</text>
          {rowNum(bv.a, bayTop + 34, SD_BLUE)}
          {bv.b !== null && <text x={SDR.x + 12} y={bayTop + 74} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(tagOf(st0.b))}</text>}
          {bv.b !== null && <text x={sdBayC(5) - 6} y={bayTop + 74} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{bv.op === "+" ? "+" : "−"}</text>}
          {bv.b !== null && rowNum(bv.b, bayTop + 74, bv.op === "+" ? SD_BLUE : SD_AMBER_INK)}
          <rect x={sdBayC(4) - 24} y={bayTop + 84} width={44 * 5 + 4} height={3} rx={1.5} fill={C.ink} />
          {!hasCard && rowNum(bv.c, bayTop + 128, SD_GREEN, bv.shown)}
          {!hasCard && bv.tag && <text x={SDR.x + 12} y={bayTop + 128} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(bv.tag)}</text>}
          {hasCard && <text x={SDR.x + 12} y={bayTop + 128} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(tagOf(out))}</text>}
          {hasCard && onMat && <line x1={846} y1={bayTop + 136} x2={1046} y2={bayTop + 136} stroke={C.rule} strokeWidth={4} strokeLinecap="round" />}
          {hasCard && onMat && canAct && <Hit id="back-built" label={"Put " + sdCardText(bv.c, isRs(out)) + " back"} x={826} y={bayTop + 82} w={240} h={72} onPress={() => back(out)} />}
          {hasCard && !onMat && (
            <g className={canAct ? "c4-piece sd-grab sd-in" : "sd-in"}
              {...(canAct ? { ...control("built-" + out, "Built " + sdCardText(bv.c, isRs(out))), ...drag.bind(pay), ...drag.keys(pay) } : {})}>
              <g filter="url(#fShadowSoft)">
                <rect x={826} y={bayTop + 90} width={240} height={56} rx={14} fill="#FFFFFF" stroke={C.accent} strokeWidth={3} />
                <rect x={832} y={bayTop + 96} width={228} height={44} rx={10} fill="none" stroke={C.accent} strokeWidth={1.5} strokeDasharray="6 5" />
                <text x={946} y={bayTop + 129} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{sdCardText(bv.c, isRs(out))}</text>
              </g>
              <rect x={826} y={bayTop + 82} width={240} height={72} fill="transparent" />
            </g>
          )}
        </g>
      );
    };
    const loose = !ord.length ? (
      <g className={stage === "ask" && canAct ? "sd-hello" : ""}>
        {pr.loose.map((sid: string, i: number) => {
          const st = stepOf(sid), lab = tx(st.label), size = sdMeasure(lab, T.label, 600) <= SDR.w - 60 ? T.label : T.micro;
          return (
            <Key key={sid} id={"step-" + sid} label={"This step comes first: " + st.label} x={SDR.x} y={matTop + 160 + i * 78} w={SDR.w} h={72} C={C} disabled={!canAct}
              onClick={() => chooseFirst(sid)}>
              <text x={0} y={size * 0.36} textAnchor="middle" fontSize={size} fontWeight={600} fill={C.ink}>{lab}</text>
            </Key>
          );
        })}
      </g>
    ) : null;
    const inv = canAct && !built && ord.length && S.early ? { x: SDR.x + 40, y: matTop + 116 } : null;
    return (
      <g>
        {slot(0)}
        {slot(1)}
        {loose}
        {bay()}
        {pr.anyOrder && S.eitherNote && ord.length === 2 && (
          <g className="sd-in" pointerEvents="none">
            <rect x={SDR.x + SDR.w - 262} y={matTop + 59} width={250} height={34} rx={17} fill="#FFFFFF" stroke={C.accent} strokeWidth={2} />
            <path d={`M ${SDR.x + SDR.w - 240} ${matTop + 86} V ${matTop + 66} M ${SDR.x + SDR.w - 246} ${matTop + 72} L ${SDR.x + SDR.w - 240} ${matTop + 65} L ${SDR.x + SDR.w - 234} ${matTop + 72}
              M ${SDR.x + SDR.w - 226} ${matTop + 66} V ${matTop + 86} M ${SDR.x + SDR.w - 232} ${matTop + 80} L ${SDR.x + SDR.w - 226} ${matTop + 87} L ${SDR.x + SDR.w - 220} ${matTop + 80}`}
              fill="none" stroke={C.ink} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
            <text x={SDR.x + SDR.w - 208} y={matTop + 86} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("either order")}</text>
          </g>
        )}
        {inv && <Invite x={inv.x} y={inv.y} r={34} C={C} />}
      </g>
    );
  };
  const drawRight = () => {
    if (kind === "free") return greyBay(matTop);
    if (kind === "two") return drawSteps();
    if (!S.picked) {
      /* the invitation: the whole stack gives one slow lift as the question opens */
      return <g className={stage === "ask" && canAct ? "sd-hello" : ""}>{SD_CARDS.map((c: any, i: number) => {
        const y = matTop + i * 80, label = tx(c[1]);
        const size = sdMeasure(label, T.label, 500) <= SDR.w - 92 ? T.label : T.micro;
        return (
          <g key={c[0]} className={S.tip === c[0] ? "sd-tip" : ""}>
            <Key id={"ask-" + c[0]} label={"Question card: " + c[1]} x={SDR.x} y={y} w={SDR.w} h={72} C={C} disabled={!canAct} onClick={() => pick(c[0])}>
              <circle cx={-SDR.w / 2 + 38} cy={0} r={21} fill={canAct ? C.accent : tint(C.accent, 0.35)} />
              <text x={-SDR.w / 2 + 38} y={10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF">?</text>
              <text x={-SDR.w / 2 + 74} y={size === T.label ? 11 : 10} fontSize={size} fontWeight={500} fill={C.ink}>{label}</text>
            </Key>
          </g>
        );
      })}</g>;
    }
    return (
      <g>
        {qCard(tx(cardLabel(S.picked)), matTop, "picked")}
        {kind === "spare" && greyBay(matTop + 88)}
        {kind === "reach" && drawStrip(matTop + 88)}
      </g>
    );
  };

  /* the running count: numbers on the mat against the two the working needs, and what is asked */
  const onMat = S.mat.filter(Boolean).length;
  /* in the language in use; in English exactly "On the mat: 1 of 2", "Step 2 of 2", "Mat 1 of 2 · grey 0" */
  const runs1 = kind === "free" ? tx("On the mat:") + " " + onMat
    : kind === "two" ? (stepDone(S) ? tx("Step") + " " + sdOf(2, 2, lang) : S.order.length ? tx("Step") + " " + sdOf(1, 2, lang) : tx("Which step first?"))
    : kind === "spare" ? tx("Mat") + " " + sdOf(onMat, 2, lang) + " · " + tx("grey") + " " + S.grey.length
    : tx("On the mat:") + " " + sdOf(onMat, 2, lang);
  const runs2 = kind === "free" ? "" : kind === "two" ? (stepDone(S) ? tx("On the mat:") + " " + sdOf(onMat, 2, lang) : "")
    : S.picked ? tx(cardLabel(S.picked)) : tx("What is asked?");

  const ghost = drag.drag && drag.drag.moved && canAct ? drag.drag : null;

  return (
    <g>
      <style>{SD_CSS}</style>

      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        <text x={18} y={runs2 ? -61 : -46} fontSize={T.micro} fontWeight={700} fill={C.ink}>{runs1}</text>
        {runs2 && <text key={runs2} className="sd-in" x={18} y={-27} fontSize={T.micro} fontWeight={500} fill={C.ink}>{runs2}</text>}
      </g>

      {drawBoard()}
      {drawMat()}
      {S.rival && (() => {
        const x0 = 12 + Math.max(...S.rival.map((r: any) => sdMeasure(tx(r.label), T.micro, 600))) + 22;
        return S.rival.map((r: any, i: number) => {
          const y = matTop + matH + 34 + i * 36;
          const toks = [[indian(r.a), C.ink], [r.op === "+" ? "+" : "−", C.ink], [indian(r.b), C.ink], ["=", C.ink], [indian(r.v), r.right ? SD_GREEN : C.ink]];
          let x = x0;
          return (
            <g key={"rival-" + i + "-" + r.label} className="sd-in">
              <text x={12} y={y} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(r.label)}</text>
              {toks.map((t: any, k: number) => { const el = <text key={k} x={x} y={y} fontSize={T.micro} fontWeight={700} fill={t[1]}>{t[0]}</text>; x += sdMeasure(t[0], T.micro, 700) + 12; return el; })}
            </g>
          );
        });
      })()}
      {drawRight()}

      {S.fly && (
        <g className="sd-fly" style={{ transform: `translate(${S.fly.x}px, ${S.fly.y}px)` } as any} pointerEvents="none">
          {cardArt(0, 0, S.fly.v, { lift: true, rs: S.fly.rs, built: S.fly.built })}
        </g>
      )}
      {ghost && (() => {
        const v = val(S, ghost.payload.id);
        return v === null ? null : <g pointerEvents="none">{cardArt(ghost.x, ghost.y, v, { lift: true, rs: isRs(ghost.payload.id), built: ghost.payload.src === "built" })}</g>;
      })()}
    </g>
  );
}

/* the summary page's small drawing: a tiny mat of the child's last problem. The greater number and the
   one taken away are rows of digit cells, right-aligned as on the mat; under the rule, the answer row;
   the child's answer written beside it. (Digits would fall below the 28-unit type floor at this size.) */
function Thumb({ n, result, C, w, h }: any) {
  const L = (result && result.last) || {};
  const ph = PHASES[(n || 1) - 1];
  const it: any = ph && ph.items ? ph.items[L.item] : null;
  const partsGot = it && it.parts ? slotPartsOf(L.value, it.parts.length).map((x: string) => (x === "" ? null : Number(x))) : null;
  const v = partsGot ? partsGot[partsGot.length - 1] : leadNumber(L.value);
  if (v === null || v === undefined || !it || !it.qid || !SD_PROBS[it.qid]) {
    return (
      <g>
        <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
        <circle cx={34} cy={h / 2} r={18} fill={C.accent} />
        <text x={34} y={h / 2 + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF">?</text>
        <text x={62} y={h / 2 + 10} fontSize={T.micro} fontWeight={600} fill={C.ink}>what is asked</text>
      </g>
    );
  }
  const pr = SD_PROBS[it.qid], vals = sdRecipe(pr);
  const rows = [String(vals[pr.need[0]]).length, String(vals[pr.need[1]]).length];
  const cell = 15, right = 100, top = 7, ruleY = h - 26, pitch = (ruleY - 4 - top) / 2, bh = Math.min(15, pitch - 4);
  const fills = [tint(CONTENT.hundred, 0.45), tint(CONTENT.ten, 0.35)], edges = [shade(CONTENT.hundred, 0.1), shade(CONTENT.ten, 0.2)];
  const dAns = String(v).length;
  const cells = (y: number, d: number, hh: number) => Array.from({ length: d - 1 }).map((_, k) => (
    <line key={k} x1={right - (k + 1) * cell} y1={y + 2} x2={right - (k + 1) * cell} y2={y + hh - 2} stroke="#FFFFFF" strokeWidth={1.4} />
  ));
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {rows.map((d: number, i: number) => {
        const y = top + i * pitch + (pitch - bh) / 2;
        return (
          <g key={i}>
            <rect x={right - d * cell} y={y} width={d * cell} height={bh} rx={3} fill={fills[i]} stroke={edges[i]} strokeWidth={1.2} />
            {cells(y, d, bh)}
          </g>
        );
      })}
      <rect x={right - 6 * cell} y={ruleY} width={6 * cell} height={3} rx={1.5} fill={C.ink} />
      <rect x={right - dAns * cell} y={ruleY + 7} width={dAns * cell} height={14} rx={3} fill={tint(CONTENT.one, 0.35)} stroke={shade(CONTENT.one, 0.1)} strokeWidth={1.2} />
      {cells(ruleY + 7, dAns, 14)}
      {partsGot
        ? partsGot.map((x: any, k: number) => <text key={k} x={w - 12} y={h / 2 - 6 + k * 32} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={shade(CONTENT.one, 0.25)}>{x === null ? "" : indian(x)}</text>)
        : <text x={w - 12} y={h / 2 + 12} textAnchor="end" fontSize={T.label} fontWeight={700} fill={shade(CONTENT.one, 0.25)}>{indian(v)}</text>}
    </g>
  );
}

function StoryToDifference(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format: sdFormat, fitHost: () => null }} />
  );
}

export default StoryToDifference;
