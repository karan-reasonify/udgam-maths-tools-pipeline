/* ═══ M2.S4.T7.C24.2D1 · story_to_product · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "story_to_product";
const MEDIA_ID = "M2.S4.T7.C24.2D1";
const TOOL_NAME = "Story to Product";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["Read it through once. What is the question actually asking for?"];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every problem was written down before it was worked, and every answer went back into a sentence.";
/* said when the child opens Free play from the summary page (the pad is off in free play, so no digits bay) */
const FREE_LINE = "Free play. Drag any two numbers into the bay. Tap the sign to swap them.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r13+: `lineFor(line, lang, TR)`); the
   English above and below stays what the checks read. NCERT class 4 terms: गुणनफल / ગુણાકાર, पंक्ति /
   હાર, हासिल / વદી; the bay is a ट्रे / ટ્રે. The story board's word pieces are keyed one by one and
   carry the Hindi/Gujarati word order around the fixed number cards. The answer sentences (`tell`) and
   the bay readings (`read`) are keyed by their templates ({n}, {a}, {b} kept). Digits stay digits: the
   runtime speaks them in the language in use. A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Story to Product": "कहानी से गुणनफल",
    "Read it through once. What is the question actually asking for?": "इसे एक बार पूरा पढ़ो। सवाल असल में क्या पूछ रहा है?",
    "Every problem was written down before it was worked, and every answer went back into a sentence.": "हर सवाल हल करने से पहले लिखा गया, और हर उत्तर वापस एक वाक्य में गया।",
    "Free play. Drag any two numbers into the bay. Tap the sign to swap them.": "मुक्त खेल। कोई भी दो संख्याएँ ट्रे में खींचो। उन्हें बदलने के लिए चिह्न पर टैप करो।",
    "One amount each, and many of them": "एक का माप, और ऐसे कितने",
    "Find the amount for one of them. Now find how many there are. Those two are the whole question.": "एक के लिए कितना है, वह ढूँढो। अब ढूँढो कि वे कितने हैं। यही दोनों पूरा सवाल हैं।",
    "Drag each number into its half of the bay. Then work out the product, and type it.": "हर संख्या को ट्रे के उसके हिस्से में खींचो। फिर गुणनफल निकालो, और लिखो।",
    "How many of them are there?": "वे कितने हैं?",
    "Which number goes with one thing? Which one counts the things?": "कौन सी संख्या एक चीज़ के साथ जाती है? कौन सी चीज़ें गिनती है?",
    "Find the amount for one thing, then how many things there are. Read the answer back as a sentence to check the pair.": "पहले एक चीज़ का माप ढूँढो, फिर कितनी चीज़ें हैं। जोड़ी जाँचने के लिए उत्तर को वाक्य में पढ़ो।",
    "You learned: find the amount for one, then how many there are.": "तुमने सीखा: पहले एक का माप, फिर कितने हैं।",
    "Metres in 12 days?": "12 दिनों में कितने मीटर?",
    "How much cloth goes with one day?": "एक दिन में कितना कपड़ा?",
    "A loom weaves 145 m of cloth in a day. How much does it weave in 12 days?": "एक करघा एक दिन में 145 मीटर कपड़ा बुनता है। 12 दिनों में वह कितना बुनेगा?",
    "Marbles in 7 bags?": "7 थैलियों में कितने कंचे?",
    "How many marbles go with one bag?": "एक थैली में कितने कंचे?",
    "A bag holds 36 marbles. How many marbles are in 7 such bags?": "एक थैली में 36 कंचे हैं। ऐसी 7 थैलियों में कितने कंचे हैं?",
    "Days for 9 shawls?": "9 शॉल में कितने दिन?",
    "How many days go with one shawl?": "एक शॉल में कितने दिन?",
    "A weaver takes 150 days to make one shawl. How many days would 9 shawls take?": "एक बुनकर को एक शॉल बनाने में 150 दिन लगते हैं। 9 शॉल में कितने दिन लगेंगे?",
    "Write the multiplication before working it": "हल करने से पहले गुणा लिखो",
    "Write the whole thing down before you work any of it out. Deciding and doing are two jobs.": "कुछ भी हल करने से पहले पूरा लिख लो। तय करना और करना, दो अलग काम हैं।",
    "Drag the two bay cards up into the question row. Then work it out, and type the product.": "ट्रे के दोनों कार्ड ऊपर प्रश्न-पंक्ति में खींचो। फिर हल करो, और गुणनफल लिखो।",
    "What goes between them? The row must be whole before you work it.": "उनके बीच क्या आता है? हल करने से पहले पंक्ति पूरी होनी चाहिए।",
    "Read the two bay cards up into the row, one at a time. Then work it.": "ट्रे के दोनों कार्ड एक-एक करके पंक्ति में लाओ। फिर हल करो।",
    "Deciding what to work out and working it out are two jobs. Write the whole multiplication before you multiply.": "क्या निकालना है यह तय करना और उसे निकालना, दो अलग काम हैं। गुणा करने से पहले पूरा गुणा लिखो।",
    "You learned: write the whole multiplication before working it.": "तुमने सीखा: हल करने से पहले पूरा गुणा लिखो।",
    "Bottles in all?": "कुल कितनी बोतलें?",
    "What are your two numbers? The bottles in one carton, and how many cartons.": "तुम्हारी दो संख्याएँ कौन सी हैं? एक डिब्बे की बोतलें, और कितने डिब्बे।",
    "A carton holds 184 bottles, and a shop takes 26 cartons. Write the multiplication first, then find the answer.": "एक डिब्बे में 184 बोतलें हैं, और एक दुकान 26 डिब्बे लेती है। पहले गुणा लिखो, फिर उत्तर निकालो।",
    "Passengers in all?": "कुल कितने यात्री?",
    "Which two numbers does the story give? The passengers on one trip, and how many trips.": "कहानी कौन सी दो संख्याएँ देती है? एक फेरे के यात्री, और कितने फेरे।",
    "A bus carries 48 passengers on each trip. Write the multiplication for 15 trips, and find the total.": "एक बस हर फेरे में 48 यात्री ले जाती है। 15 फेरों का गुणा लिखो, और कुल निकालो।",
    "Pages in all?": "कुल कितने पन्ने?",
    "Find the two numbers first. The pages in one minute, and how many minutes.": "पहले दो संख्याएँ ढूँढो। एक मिनट के पन्ने, और कितने मिनट।",
    "A press prints 126 pages a minute. Write the multiplication for 1,450 minutes, and find the total.": "एक छापाखाना एक मिनट में 126 पन्ने छापता है। 1,450 मिनट का गुणा लिखो, और कुल निकालो।",
    "Some numbers are described rather than printed": "कुछ संख्याएँ छपी नहीं, बताई जाती हैं",
    "That number is described, not printed. Turn the words into digits before you touch it.": "वह संख्या छपी नहीं, बताई गई है। उसे छूने से पहले शब्दों को अंकों में बदलो।",
    "Tap the digits bay and type the number, biggest place first. Press Enter, then find the product.": "अंकों की ट्रे पर टैप करो और संख्या लिखो, सबसे बड़ा स्थान पहले। एंटर दबाओ, फिर गुणनफल निकालो।",
    "What is the least or most each place may hold?": "हर स्थान में कम से कम या ज़्यादा से ज़्यादा क्या आ सकता है?",
    "Fill the places from the left. Say what each place may take.": "स्थान बाईं ओर से भरो। बताओ हर स्थान में क्या आ सकता है।",
    "A description is a question of its own. Turn it into digits before the multiplying starts.": "वर्णन अपने आप में एक सवाल है। गुणा शुरू होने से पहले उसे अंकों में बदलो।",
    "You learned: turn a described number into digits first.": "तुमने सीखा: बताई गई संख्या को पहले अंकों में बदलो।",
    "The product?": "गुणनफल?",
    "How many places has the number you are building?": "तुम जो संख्या बना रहे हो, उसमें कितने स्थान हैं?",
    "What is the product of the largest three digit number and the smallest two digit number?": "तीन अंकों की सबसे बड़ी और दो अंकों की सबसे छोटी संख्या का गुणनफल क्या है?",
    "Which digit can stand first in the smallest three digit number?": "तीन अंकों की सबसे छोटी संख्या में पहले कौन सा अंक आ सकता है?",
    "What is the product of the smallest three digit number and the largest two digit number?": "तीन अंकों की सबसे छोटी और दो अंकों की सबसे बड़ी संख्या का गुणनफल क्या है?",
    "Eggs in 45 trays?": "45 ट्रे में कितने अंडे?",
    "How many eggs make one dozen?": "एक दर्जन में कितने अंडे होते हैं?",
    "A tray holds one dozen eggs. How many eggs are in 45 such trays?": "एक ट्रे में एक दर्जन अंडे आते हैं। ऐसी 45 ट्रे में कितने अंडे हैं?",
    "The other order is a free check": "उल्टा क्रम एक मुफ़्त जाँच है",
    "Now swap the two numbers and work it again. The answer has to come out the same.": "अब दोनों संख्याएँ बदलो और फिर से हल करो। उत्तर वही आना चाहिए।",
    "Tap the swap strip to turn the two numbers round. Then type the product.": "दोनों संख्याएँ पलटने के लिए बदलने वाली पट्टी पर टैप करो। फिर गुणनफल लिखो।",
    "Which one was the multiplier? What happens to the rows when you swap?": "गुणक कौन सा था? बदलने पर पंक्तियों का क्या होता है?",
    "Work the swapped one row by row. Name the digit that made each row.": "बदले हुए को पंक्ति-दर-पंक्ति हल करो। हर पंक्ति बनाने वाले अंक का नाम बोलो।",
    "Swapping the two numbers gives a check made of different steps. It catches a slip that reading your working again would miss.": "दोनों संख्याएँ बदलने से अलग कदमों वाली जाँच मिलती है। यह वह गलती पकड़ लेती है जो दोबारा पढ़ने से छूट जाती।",
    "You learned: swap the numbers and work it again to check.": "तुमने सीखा: जाँचने के लिए संख्याएँ बदलकर फिर से हल करो।",
    "Total sale in ₹?": "कुल बिक्री कितने रुपये?",
    "Which two numbers are you multiplying?": "तुम कौन सी दो संख्याओं का गुणा कर रहे हो?",
    "A shop sold 124 lamps at ₹215 each. Find the total, then check it by working the two numbers the other way round.": "एक दुकान ने 124 लैंप 215 रुपये के भाव से बेचे। कुल निकालो, फिर दोनों संख्याएँ उल्टी करके जाँचो।",
    "Scooters in 64 hours?": "64 घंटों में कितने स्कूटर?",
    "Check the first row of each working. Did every carry go into the next column?": "हर हल की पहली पंक्ति जाँचो। क्या हर हासिल अगले स्तंभ में गया?",
    "A company assembles 185 scooters an hour. How many in 64 hours? Check your answer the other way round.": "एक कंपनी एक घंटे में 185 स्कूटर बनाती है। 64 घंटों में कितने? अपना उत्तर उल्टे क्रम से जाँचो।",
    "Check the carries in the row made by the tens digit.": "दहाई के अंक से बनी पंक्ति के हासिल जाँचो।",
    "A shopkeeper sold 240 carved boxes at ₹135 each. Find the total sale, and check it by swapping the two numbers.": "एक दुकानदार ने 240 नक्काशीदार डिब्बे 135 रुपये के भाव से बेचे। कुल बिक्री निकालो, और संख्याएँ बदलकर जाँचो।",
    /* api.say lines from the working area */
    "Now work it out, and type the product.": "अब हल करो, और गुणनफल लिखो।",
    "Is that what the story says?": "क्या कहानी यही कहती है?",
    "The bay is full. Tap a card in the bay to send it back.": "ट्रे भरी है। वापस भेजने के लिए ट्रे के किसी कार्ड पर टैप करो।",
    "The row is full. Tap a card in the row to take it out.": "पंक्ति भरी है। निकालने के लिए पंक्ति के किसी कार्ड पर टैप करो।",
    "The working area is open. Work it out, and type the product.": "हल करने की जगह खुल गई है। हल करो, और गुणनफल लिखो।",
    "Type its digits on the keys, biggest place first.": "इसके अंक बटनों पर लिखो, सबसे बड़ा स्थान पहले।",
    "Now tap the digits bay for the next one.": "अब अगली के लिए अंकों की ट्रे पर टैप करो।",
    "Both are digits now. Find the product.": "अब दोनों अंकों में हैं। गुणनफल निकालो।",
    "Now it is digits. Find the product.": "अब यह अंकों में है। गुणनफल निकालो।",
    "Now it is the other way round. Work it both ways, and type the product.": "अब यह उल्टे क्रम में है। दोनों तरह से हल करो, और गुणनफल लिखो।",
    "First write the multiplication in the question row. Drag the two bay cards up.": "पहले प्रश्न-पंक्ति में गुणा लिखो। ट्रे के दोनों कार्ड ऊपर खींचो।",
    "First build the number. Tap the digits bay, then type its digits.": "पहले संख्या बनाओ। अंकों की ट्रे पर टैप करो, फिर उसके अंक लिखो।",
    "Swap the two numbers first. Then work it the other way too.": "पहले दोनों संख्याएँ बदलो। फिर उल्टे क्रम से भी हल करो।",
    /* the answer sentences and the bay readings (templates) */
    "It weaves {n} m in 12 days.": "12 दिनों में यह {n} मीटर बुनता है।",
    "7 bags hold {n} marbles.": "7 थैलियों में {n} कंचे आते हैं।",
    "9 shawls take {n} days.": "9 शॉल में {n} दिन लगते हैं।",
    "26 cartons hold {n} bottles.": "26 डिब्बों में {n} बोतलें आती हैं।",
    "15 trips carry {n} passengers.": "15 फेरों में {n} यात्री जाते हैं।",
    "In 1,450 minutes it prints {n} pages.": "1,450 मिनट में यह {n} पन्ने छापता है।",
    "The product is {n}.": "गुणनफल {n} है।",
    "45 trays hold {n} eggs.": "45 ट्रे में {n} अंडे आते हैं।",
    "124 lamps sell for ₹{n}.": "124 लैंप {n} रुपये में बिकते हैं।",
    "In 64 hours it makes {n} scooters.": "64 घंटों में यह {n} स्कूटर बनाती है।",
    "240 boxes sell for ₹{n}.": "240 डिब्बे {n} रुपये में बिकते हैं।",
    "{a} m a day, for {b} days": "एक दिन में {a} मीटर, {b} दिनों तक",
    "{a} marbles a bag, {b} bags": "एक थैली में {a} कंचे, {b} थैलियाँ",
    "{a} days a shawl, {b} shawls": "एक शॉल में {a} दिन, {b} शॉल",
    /* the story board, piece by piece (the Hindi word order runs around the number cards) */
    "A loom weaves": "एक करघा एक दिन में", "m of cloth in a day.": "मीटर कपड़ा बुनता है।",
    "How much does it weave in": "वह", "days?": "दिनों में कितना बुनेगा?",
    "A bag holds": "एक थैली में", "marbles.": "कंचे हैं।", "How many marbles are in": "ऐसी", "such bags?": "थैलियों में कितने कंचे हैं?",
    "A weaver takes": "एक बुनकर को एक शॉल बनाने में", "days to make one shawl.": "दिन लगते हैं।",
    "How many days would": "तो", "shawls take?": "शॉल में कितने दिन लगेंगे?",
    "A carton holds": "एक डिब्बे में", "bottles.": "बोतलें हैं।", "A shop takes": "एक दुकान", "cartons. How many bottles?": "डिब्बे लेती है। कितनी बोतलें?",
    "A bus carries": "एक बस हर फेरे में", "passengers on each trip.": "यात्री ले जाती है।",
    "How many does it carry in": "वह", "trips?": "फेरों में कितने ले जाएगी?",
    "A press prints": "एक छापाखाना एक मिनट में", "pages a minute.": "पन्ने छापता है।",
    "How many pages does it print in": "वह", "minutes?": "मिनट में कितने पन्ने छापेगा?",
    "The product of the largest three digit number": "तीन अंकों की सबसे बड़ी संख्या",
    "and the smallest two digit number": "और दो अंकों की सबसे छोटी संख्या",
    "The product of the smallest three digit number": "तीन अंकों की सबसे छोटी संख्या",
    "and the largest two digit number": "और दो अंकों की सबसे बड़ी संख्या", "?": "का गुणनफल?",
    "A tray holds one dozen": "एक ट्रे में एक दर्जन", "eggs.": "अंडे आते हैं।", "How many eggs are in": "ऐसी", "such trays?": "ट्रे में कितने अंडे हैं?",
    "A shop sold": "एक दुकान ने", "lamps at": "लैंप", "each.": "के भाव से बेचे।", "What is the total sale?": "कुल बिक्री कितनी है?",
    "A company assembles": "एक कंपनी एक घंटे में", "scooters an hour.": "स्कूटर बनाती है।",
    "How many does it make in": "वह", "hours?": "घंटों में कितने बनाएगी?",
    "A shopkeeper sold": "एक दुकानदार ने", "carved boxes at": "नक्काशीदार डिब्बे",
    "A box holds": "एक डिब्बे में", "pens, and a crate holds": "पेन हैं, और एक क्रेट में", "boxes.": "डिब्बे हैं।",
    "A van carries": "एक वैन", "crates on each of": "क्रेट ले जाती है, कुल", "trips.": "फेरे।",
    /* the working area's own words */
    "for each one": "हर एक के लिए", "how many": "कितने", "digits bay": "अंकों की ट्रे", "H": "सै", "T": "द", "O": "इ",
    "question": "प्रश्न", "row": "पंक्ति", "working area": "हल करने की जगह", "skipped": "छोड़ी", "swap and check": "बदलो और जाँचो",
    "Same": "एक जैसे", "in story": "कहानी में", "in bay": "ट्रे में", "in row": "पंक्ति में", "blank": "खाली", "built": "बने",
    "rows:": "पंक्तियाँ:", "and": "और",
  },
  gu: {
    "Story to Product": "વાર્તાથી ગુણાકાર",
    "Read it through once. What is the question actually asking for?": "તેને એક વાર પૂરું વાંચો. પ્રશ્ન ખરેખર શું પૂછે છે?",
    "Every problem was written down before it was worked, and every answer went back into a sentence.": "દરેક દાખલો ઉકેલતાં પહેલાં લખાયો, અને દરેક જવાબ પાછો એક વાક્યમાં ગયો.",
    "Free play. Drag any two numbers into the bay. Tap the sign to swap them.": "મુક્ત રમત. કોઈ પણ બે સંખ્યા ટ્રેમાં ખેંચો. તેમને બદલવા ચિહ્ન પર ટૅપ કરો.",
    "One amount each, and many of them": "એકનું માપ, અને એવા કેટલા",
    "Find the amount for one of them. Now find how many there are. Those two are the whole question.": "એક માટે કેટલું છે તે શોધો. હવે શોધો કે તે કેટલા છે. આ બે જ આખો પ્રશ્ન છે.",
    "Drag each number into its half of the bay. Then work out the product, and type it.": "દરેક સંખ્યાને ટ્રેના તેના ભાગમાં ખેંચો. પછી ગુણાકાર શોધો, અને લખો.",
    "How many of them are there?": "તે કેટલા છે?",
    "Which number goes with one thing? Which one counts the things?": "કઈ સંખ્યા એક વસ્તુ સાથે જાય છે? કઈ વસ્તુઓ ગણે છે?",
    "Find the amount for one thing, then how many things there are. Read the answer back as a sentence to check the pair.": "પહેલાં એક વસ્તુનું માપ શોધો, પછી કેટલી વસ્તુઓ છે. જોડી તપાસવા જવાબને વાક્યમાં વાંચો.",
    "You learned: find the amount for one, then how many there are.": "તમે શીખ્યા: પહેલાં એકનું માપ, પછી કેટલા છે.",
    "Metres in 12 days?": "12 દિવસમાં કેટલા મીટર?",
    "How much cloth goes with one day?": "એક દિવસમાં કેટલું કાપડ?",
    "A loom weaves 145 m of cloth in a day. How much does it weave in 12 days?": "એક સાળ એક દિવસમાં 145 મીટર કાપડ વણે છે. 12 દિવસમાં તે કેટલું વણશે?",
    "Marbles in 7 bags?": "7 થેલીમાં કેટલી લખોટી?",
    "How many marbles go with one bag?": "એક થેલીમાં કેટલી લખોટી?",
    "A bag holds 36 marbles. How many marbles are in 7 such bags?": "એક થેલીમાં 36 લખોટી છે. આવી 7 થેલીમાં કેટલી લખોટી છે?",
    "Days for 9 shawls?": "9 શાલમાં કેટલા દિવસ?",
    "How many days go with one shawl?": "એક શાલમાં કેટલા દિવસ?",
    "A weaver takes 150 days to make one shawl. How many days would 9 shawls take?": "એક વણકરને એક શાલ બનાવતાં 150 દિવસ લાગે છે. 9 શાલમાં કેટલા દિવસ લાગશે?",
    "Write the multiplication before working it": "ઉકેલતાં પહેલાં ગુણાકાર લખો",
    "Write the whole thing down before you work any of it out. Deciding and doing are two jobs.": "કંઈ પણ ઉકેલતાં પહેલાં આખું લખી લો. નક્કી કરવું અને કરવું, બે જુદાં કામ છે.",
    "Drag the two bay cards up into the question row. Then work it out, and type the product.": "ટ્રેનાં બંને કાર્ડ ઉપર પ્રશ્ન-હારમાં ખેંચો. પછી ઉકેલો, અને ગુણાકાર લખો.",
    "What goes between them? The row must be whole before you work it.": "તેમની વચ્ચે શું આવે? ઉકેલતાં પહેલાં હાર પૂરી હોવી જોઈએ.",
    "Read the two bay cards up into the row, one at a time. Then work it.": "ટ્રેનાં બંને કાર્ડ એક પછી એક હારમાં લાવો. પછી ઉકેલો.",
    "Deciding what to work out and working it out are two jobs. Write the whole multiplication before you multiply.": "શું શોધવું તે નક્કી કરવું અને તેને શોધવું, બે જુદાં કામ છે. ગુણતાં પહેલાં આખો ગુણાકાર લખો.",
    "You learned: write the whole multiplication before working it.": "તમે શીખ્યા: ઉકેલતાં પહેલાં આખો ગુણાકાર લખો.",
    "Bottles in all?": "કુલ કેટલી બોટલ?",
    "What are your two numbers? The bottles in one carton, and how many cartons.": "તમારી બે સંખ્યા કઈ છે? એક ખોખાની બોટલ, અને કેટલાં ખોખાં.",
    "A carton holds 184 bottles, and a shop takes 26 cartons. Write the multiplication first, then find the answer.": "એક ખોખામાં 184 બોટલ છે, અને એક દુકાન 26 ખોખાં લે છે. પહેલાં ગુણાકાર લખો, પછી જવાબ શોધો.",
    "Passengers in all?": "કુલ કેટલા મુસાફરો?",
    "Which two numbers does the story give? The passengers on one trip, and how many trips.": "વાર્તા કઈ બે સંખ્યા આપે છે? એક ફેરાના મુસાફરો, અને કેટલા ફેરા.",
    "A bus carries 48 passengers on each trip. Write the multiplication for 15 trips, and find the total.": "એક બસ દરેક ફેરામાં 48 મુસાફરો લઈ જાય છે. 15 ફેરાનો ગુણાકાર લખો, અને કુલ શોધો.",
    "Pages in all?": "કુલ કેટલાં પાનાં?",
    "Find the two numbers first. The pages in one minute, and how many minutes.": "પહેલાં બે સંખ્યા શોધો. એક મિનિટનાં પાનાં, અને કેટલી મિનિટ.",
    "A press prints 126 pages a minute. Write the multiplication for 1,450 minutes, and find the total.": "એક છાપખાનું એક મિનિટમાં 126 પાનાં છાપે છે. 1,450 મિનિટનો ગુણાકાર લખો, અને કુલ શોધો.",
    "Some numbers are described rather than printed": "કેટલીક સંખ્યાઓ છાપેલી નહીં, વર્ણવેલી હોય છે",
    "That number is described, not printed. Turn the words into digits before you touch it.": "તે સંખ્યા છાપેલી નથી, વર્ણવેલી છે. તેને અડતાં પહેલાં શબ્દોને અંકોમાં ફેરવો.",
    "Tap the digits bay and type the number, biggest place first. Press Enter, then find the product.": "અંકોની ટ્રે પર ટૅપ કરો અને સંખ્યા લખો, સૌથી મોટું સ્થાન પહેલાં. એન્ટર દબાવો, પછી ગુણાકાર શોધો.",
    "What is the least or most each place may hold?": "દરેક સ્થાનમાં ઓછામાં ઓછું કે વધુમાં વધુ શું આવી શકે?",
    "Fill the places from the left. Say what each place may take.": "સ્થાન ડાબી બાજુથી ભરો. કહો દરેક સ્થાનમાં શું આવી શકે.",
    "A description is a question of its own. Turn it into digits before the multiplying starts.": "વર્ણન પોતે એક પ્રશ્ન છે. ગુણાકાર શરૂ થાય તે પહેલાં તેને અંકોમાં ફેરવો.",
    "You learned: turn a described number into digits first.": "તમે શીખ્યા: વર્ણવેલી સંખ્યાને પહેલાં અંકોમાં ફેરવો.",
    "The product?": "ગુણાકાર?",
    "How many places has the number you are building?": "તમે જે સંખ્યા બનાવો છો, તેમાં કેટલાં સ્થાન છે?",
    "What is the product of the largest three digit number and the smallest two digit number?": "ત્રણ અંકની સૌથી મોટી અને બે અંકની સૌથી નાની સંખ્યાનો ગુણાકાર કેટલો?",
    "Which digit can stand first in the smallest three digit number?": "ત્રણ અંકની સૌથી નાની સંખ્યામાં પહેલો કયો અંક આવી શકે?",
    "What is the product of the smallest three digit number and the largest two digit number?": "ત્રણ અંકની સૌથી નાની અને બે અંકની સૌથી મોટી સંખ્યાનો ગુણાકાર કેટલો?",
    "Eggs in 45 trays?": "45 ટ્રેમાં કેટલાં ઈંડાં?",
    "How many eggs make one dozen?": "એક ડઝનમાં કેટલાં ઈંડાં હોય?",
    "A tray holds one dozen eggs. How many eggs are in 45 such trays?": "એક ટ્રેમાં એક ડઝન ઈંડાં આવે છે. આવી 45 ટ્રેમાં કેટલાં ઈંડાં છે?",
    "The other order is a free check": "ઊલટો ક્રમ એક મફત તપાસ છે",
    "Now swap the two numbers and work it again. The answer has to come out the same.": "હવે બંને સંખ્યા બદલો અને ફરી ઉકેલો. જવાબ એ જ આવવો જોઈએ.",
    "Tap the swap strip to turn the two numbers round. Then type the product.": "બંને સંખ્યા ફેરવવા બદલવાની પટ્ટી પર ટૅપ કરો. પછી ગુણાકાર લખો.",
    "Which one was the multiplier? What happens to the rows when you swap?": "ગુણક કયો હતો? બદલતાં હારનું શું થાય છે?",
    "Work the swapped one row by row. Name the digit that made each row.": "બદલેલાને હાર દર હાર ઉકેલો. દરેક હાર બનાવનાર અંકનું નામ બોલો.",
    "Swapping the two numbers gives a check made of different steps. It catches a slip that reading your working again would miss.": "બંને સંખ્યા બદલવાથી જુદાં પગલાંવાળી તપાસ મળે છે. તે એવી ભૂલ પકડે છે જે ફરી વાંચવાથી રહી જાત.",
    "You learned: swap the numbers and work it again to check.": "તમે શીખ્યા: તપાસવા સંખ્યા બદલીને ફરી ઉકેલો.",
    "Total sale in ₹?": "કુલ વેચાણ કેટલા રૂપિયા?",
    "Which two numbers are you multiplying?": "તમે કઈ બે સંખ્યાનો ગુણાકાર કરો છો?",
    "A shop sold 124 lamps at ₹215 each. Find the total, then check it by working the two numbers the other way round.": "એક દુકાને 124 દીવા 215 રૂપિયાના ભાવે વેચ્યા. કુલ શોધો, પછી બંને સંખ્યા ઊલટી કરીને તપાસો.",
    "Scooters in 64 hours?": "64 કલાકમાં કેટલાં સ્કૂટર?",
    "Check the first row of each working. Did every carry go into the next column?": "દરેક ગણતરીની પહેલી હાર તપાસો. શું દરેક વદી પછીના સ્તંભમાં ગઈ?",
    "A company assembles 185 scooters an hour. How many in 64 hours? Check your answer the other way round.": "એક કંપની એક કલાકમાં 185 સ્કૂટર બનાવે છે. 64 કલાકમાં કેટલાં? તમારો જવાબ ઊલટા ક્રમથી તપાસો.",
    "Check the carries in the row made by the tens digit.": "દશકના અંકથી બનેલી હારની વદી તપાસો.",
    "A shopkeeper sold 240 carved boxes at ₹135 each. Find the total sale, and check it by swapping the two numbers.": "એક દુકાનદારે 240 કોતરેલા ડબ્બા 135 રૂપિયાના ભાવે વેચ્યા. કુલ વેચાણ શોધો, અને સંખ્યા બદલીને તપાસો.",
    /* api.say lines from the working area */
    "Now work it out, and type the product.": "હવે ઉકેલો, અને ગુણાકાર લખો.",
    "Is that what the story says?": "શું વાર્તા આ જ કહે છે?",
    "The bay is full. Tap a card in the bay to send it back.": "ટ્રે ભરેલી છે. પાછું મોકલવા ટ્રેના કોઈ કાર્ડ પર ટૅપ કરો.",
    "The row is full. Tap a card in the row to take it out.": "હાર ભરેલી છે. કાઢવા હારના કોઈ કાર્ડ પર ટૅપ કરો.",
    "The working area is open. Work it out, and type the product.": "ગણતરીની જગ્યા ખુલી ગઈ છે. ઉકેલો, અને ગુણાકાર લખો.",
    "Type its digits on the keys, biggest place first.": "તેના અંક બટન પર લખો, સૌથી મોટું સ્થાન પહેલાં.",
    "Now tap the digits bay for the next one.": "હવે પછીની માટે અંકોની ટ્રે પર ટૅપ કરો.",
    "Both are digits now. Find the product.": "હવે બંને અંકોમાં છે. ગુણાકાર શોધો.",
    "Now it is digits. Find the product.": "હવે તે અંકોમાં છે. ગુણાકાર શોધો.",
    "Now it is the other way round. Work it both ways, and type the product.": "હવે તે ઊલટા ક્રમમાં છે. બંને રીતે ઉકેલો, અને ગુણાકાર લખો.",
    "First write the multiplication in the question row. Drag the two bay cards up.": "પહેલાં પ્રશ્ન-હારમાં ગુણાકાર લખો. ટ્રેનાં બંને કાર્ડ ઉપર ખેંચો.",
    "First build the number. Tap the digits bay, then type its digits.": "પહેલાં સંખ્યા બનાવો. અંકોની ટ્રે પર ટૅપ કરો, પછી તેના અંક લખો.",
    "Swap the two numbers first. Then work it the other way too.": "પહેલાં બંને સંખ્યા બદલો. પછી ઊલટા ક્રમથી પણ ઉકેલો.",
    /* the answer sentences and the bay readings (templates) */
    "It weaves {n} m in 12 days.": "12 દિવસમાં તે {n} મીટર વણે છે.",
    "7 bags hold {n} marbles.": "7 થેલીમાં {n} લખોટી આવે છે.",
    "9 shawls take {n} days.": "9 શાલમાં {n} દિવસ લાગે છે.",
    "26 cartons hold {n} bottles.": "26 ખોખામાં {n} બોટલ આવે છે.",
    "15 trips carry {n} passengers.": "15 ફેરામાં {n} મુસાફરો જાય છે.",
    "In 1,450 minutes it prints {n} pages.": "1,450 મિનિટમાં તે {n} પાનાં છાપે છે.",
    "The product is {n}.": "ગુણાકાર {n} છે.",
    "45 trays hold {n} eggs.": "45 ટ્રેમાં {n} ઈંડાં આવે છે.",
    "124 lamps sell for ₹{n}.": "124 દીવા {n} રૂપિયામાં વેચાય છે.",
    "In 64 hours it makes {n} scooters.": "64 કલાકમાં તે {n} સ્કૂટર બનાવે છે.",
    "240 boxes sell for ₹{n}.": "240 ડબ્બા {n} રૂપિયામાં વેચાય છે.",
    "{a} m a day, for {b} days": "એક દિવસમાં {a} મીટર, {b} દિવસ સુધી",
    "{a} marbles a bag, {b} bags": "એક થેલીમાં {a} લખોટી, {b} થેલી",
    "{a} days a shawl, {b} shawls": "એક શાલમાં {a} દિવસ, {b} શાલ",
    /* the story board, piece by piece (the Gujarati word order runs around the number cards) */
    "A loom weaves": "એક સાળ એક દિવસમાં", "m of cloth in a day.": "મીટર કાપડ વણે છે.",
    "How much does it weave in": "તે", "days?": "દિવસમાં કેટલું વણશે?",
    "A bag holds": "એક થેલીમાં", "marbles.": "લખોટી છે.", "How many marbles are in": "આવી", "such bags?": "થેલીમાં કેટલી લખોટી છે?",
    "A weaver takes": "એક વણકરને એક શાલ બનાવતાં", "days to make one shawl.": "દિવસ લાગે છે.",
    "How many days would": "તો", "shawls take?": "શાલમાં કેટલા દિવસ લાગશે?",
    "A carton holds": "એક ખોખામાં", "bottles.": "બોટલ છે.", "A shop takes": "એક દુકાન", "cartons. How many bottles?": "ખોખાં લે છે. કેટલી બોટલ?",
    "A bus carries": "એક બસ દરેક ફેરામાં", "passengers on each trip.": "મુસાફરો લઈ જાય છે.",
    "How many does it carry in": "તે", "trips?": "ફેરામાં કેટલા લઈ જશે?",
    "A press prints": "એક છાપખાનું એક મિનિટમાં", "pages a minute.": "પાનાં છાપે છે.",
    "How many pages does it print in": "તે", "minutes?": "મિનિટમાં કેટલાં પાનાં છાપશે?",
    "The product of the largest three digit number": "ત્રણ અંકની સૌથી મોટી સંખ્યા",
    "and the smallest two digit number": "અને બે અંકની સૌથી નાની સંખ્યા",
    "The product of the smallest three digit number": "ત્રણ અંકની સૌથી નાની સંખ્યા",
    "and the largest two digit number": "અને બે અંકની સૌથી મોટી સંખ્યા", "?": "નો ગુણાકાર?",
    "A tray holds one dozen": "એક ટ્રેમાં એક ડઝન", "eggs.": "ઈંડાં આવે છે.", "How many eggs are in": "આવી", "such trays?": "ટ્રેમાં કેટલાં ઈંડાં છે?",
    "A shop sold": "એક દુકાને", "lamps at": "દીવા", "each.": "ના ભાવે વેચ્યા.", "What is the total sale?": "કુલ વેચાણ કેટલું છે?",
    "A company assembles": "એક કંપની એક કલાકમાં", "scooters an hour.": "સ્કૂટર બનાવે છે.",
    "How many does it make in": "તે", "hours?": "કલાકમાં કેટલાં બનાવશે?",
    "A shopkeeper sold": "એક દુકાનદારે", "carved boxes at": "કોતરેલા ડબ્બા",
    "A box holds": "એક ડબ્બામાં", "pens, and a crate holds": "પેન છે, અને એક ક્રેટમાં", "boxes.": "ડબ્બા છે.",
    "A van carries": "એક વાન", "crates on each of": "ક્રેટ લઈ જાય છે, કુલ", "trips.": "ફેરા.",
    /* the working area's own words */
    "for each one": "દરેક એક માટે", "how many": "કેટલા", "digits bay": "અંકોની ટ્રે", "H": "શ", "T": "દ", "O": "એ",
    "question": "પ્રશ્ન", "row": "હાર", "working area": "ગણતરીની જગ્યા", "skipped": "છોડી", "swap and check": "બદલો અને તપાસો",
    "Same": "સરખા", "in story": "વાર્તામાં", "in bay": "ટ્રેમાં", "in row": "હારમાં", "blank": "ખાલી", "built": "બન્યા",
    "rows:": "હાર:", "and": "અને",
  },
};

/* ── the problems ──────────────────────────────────────────────────────────────────────────
   Each item's board: two sentence lines of words and number cards. `each` is the card for one
   thing, `many` the count of things. A described number (phase 3) is a blank card with its number
   of places; it is built in the digits bay and its value is never drawn before that. `read` reads
   a filled bay back as a sentence (phase 1); `tell` is the answer sentence ({n} = the product). */
const stpN = (id: string, v: number, rs = false) => ({ t: "num", id, v, rs });
const stpD = (id: string, places: number, v: number) => ({ t: "desc", id, places, v });

const STP_PROBS: Record<string, any> = {
  "M2.S4.T7.C24:ML1": { kind: "bay", each: "a", many: "b",
    lines: [["A loom weaves", stpN("a", 145), "m of cloth in a day."], ["How much does it weave in", stpN("b", 12), "days?"]],
    read: "{a} m a day, for {b} days", tell: "It weaves {n} m in 12 days." },
  "M2.S4.T7.C24:1": { kind: "bay", each: "a", many: "b",
    lines: [["A bag holds", stpN("a", 36), "marbles."], ["How many marbles are in", stpN("b", 7), "such bags?"]],
    read: "{a} marbles a bag, {b} bags", tell: "7 bags hold {n} marbles." },
  "M2.S4.T7.C24:2": { kind: "bay", each: "a", many: "b",
    lines: [["A weaver takes", stpN("a", 150), "days to make one shawl."], ["How many days would", stpN("b", 9), "shawls take?"]],
    read: "{a} days a shawl, {b} shawls", tell: "9 shawls take {n} days." },
  "M2.S4.T7.C25:ML2": { kind: "row", each: "a", many: "b",
    lines: [["A carton holds", stpN("a", 184), "bottles."], ["A shop takes", stpN("b", 26), "cartons. How many bottles?"]],
    tell: "26 cartons hold {n} bottles." },
  "M2.S4.T7.C25:3": { kind: "row", each: "a", many: "b",
    lines: [["A bus carries", stpN("a", 48), "passengers on each trip."], ["How many does it carry in", stpN("b", 15), "trips?"]],
    tell: "15 trips carry {n} passengers." },
  "M2.S4.T7.C25:4": { kind: "row", each: "a", many: "b",
    lines: [["A press prints", stpN("a", 126), "pages a minute."], ["How many pages does it print in", stpN("b", 1450), "minutes?"]],
    tell: "In 1,450 minutes it prints {n} pages." },
  "M2.S4.T7.C26:ML3": { kind: "build", order: ["x", "y"],
    lines: [["The product of the largest three digit number", stpD("x", 3, 999)], ["and the smallest two digit number", stpD("y", 2, 10), "?"]],
    tell: "The product is {n}." },
  "M2.S4.T7.C26:5": { kind: "build", order: ["x", "y"],
    lines: [["The product of the smallest three digit number", stpD("x", 3, 100)], ["and the largest two digit number", stpD("y", 2, 99), "?"]],
    tell: "The product is {n}." },
  "M2.S4.T7.C26:6": { kind: "build", order: ["x", "y"], dozen: "x",
    lines: [["A tray holds one dozen", stpD("x", 2, 12), "eggs."], ["How many eggs are in", stpN("y", 45), "such trays?"]],
    tell: "45 trays hold {n} eggs." },
  "M2.S4.T7.C27:ML4": { kind: "swap", each: "a", many: "b",
    lines: [["A shop sold", stpN("b", 124), "lamps at", stpN("a", 215, true), "each."], ["What is the total sale?"]],
    tell: "124 lamps sell for ₹{n}." },
  "M2.S4.T7.C27:7": { kind: "swap", each: "a", many: "b",
    lines: [["A company assembles", stpN("a", 185), "scooters an hour."], ["How many does it make in", stpN("b", 64), "hours?"]],
    tell: "In 64 hours it makes {n} scooters." },
  "M2.S4.T7.C27:8": { kind: "swap", each: "a", many: "b",
    lines: [["A shopkeeper sold", stpN("b", 240), "carved boxes at", stpN("a", 135, true), "each."], ["What is the total sale?"]],
    tell: "240 boxes sell for ₹{n}." },
};
/* free play: four numbers and no question; any two go into the bay, the row writes itself, the
   working runs to the product, and a tap on the sign swaps the two and works it the other way */
const STP_FREE = { kind: "free", free: true,
  lines: [["A box holds", stpN("f1", 125), "pens, and a crate holds", stpN("f2", 36), "boxes."], ["A van carries", stpN("f3", 24), "crates on each of", stpN("f4", 15), "trips."]] };

const stpProb = (key: string) => (key === "free" ? STP_FREE : STP_PROBS[key] || STP_PROBS["M2.S4.T7.C24:ML1"]);
const stpToks = (pr: any) => pr.lines.flat().filter((t: any) => t && typeof t !== "string");
const stpTok = (pr: any, id: string) => stpToks(pr).find((t: any) => t.id === id);
const stpDescs = (pr: any) => stpToks(pr).filter((t: any) => t.t === "desc");
const stpFill = (tpl: string, m: Record<string, string>) => String(tpl).replace(/\{(\w)\}/g, (_x: string, k: string) => (m[k] !== undefined ? m[k] : ""));
/* the two numbers of a problem, in the order its question row writes them */
const stpPairIds = (pr: any) => (pr.kind === "build" ? pr.order : [pr.each, pr.many]);
const stpRightVal = (pr: any, id: string) => { const t = stpTok(pr, id); return t ? t.v : 0; };
/* the number with more digits goes on top, as the book's printer example (3698 on top of 114) */
const stpTopMul = (a: number, b: number) => (String(b).length > String(a).length ? { top: b, mul: a, topIdx: 1 } : { top: a, mul: b, topIdx: 0 });

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   items   three a phase, the plan's questions with their ids. Every answer is the product, typed on
           the pad; the working area holds the step the phase is about (the bay, the question row,
           the digits bay, the swap strip).
           kind  bay | row | build | swap (the Work, judge and oracle switch on it)
           near  the item's misconception (judge rejects it) */
const PHASES = [
  {
    n: 1,
    concept: "One amount each, and many of them",
    conceptId: "M2.S4.T7.C24", objectiveIds: ["O11"],
    says: ["Find the amount for one of them. Now find how many there are. Those two are the whole question.",
      "Drag each number into its half of the bay. Then work out the product, and type it."],
    /* tries, as the plan writes it: first rung, the item's own (what does one of them cost, hold or take); second, how many
       are there; third, one sentence at a time, every number named for what it counts */
    ladder: ["How many of them are there?", "Which number goes with one thing? Which one counts the things?"],
    closing: "Find the amount for one thing, then how many things there are. Read the answer back as a sentence to check the pair.",
    learned: "You learned: find the amount for one, then how many there are.",
    traceback: "The two cards come down into their halves while each heading lights; if the two were added, the amount for one is laid out once for every thing as equal tiles; the question row writes itself, the column working runs row by row to the product, and the answer sentence is written under the bay.",
    items: [
      /* learn ML1: answer in the plan = 1740 m. near: the two numbers added (145 + 12) */
      { qid: "M2.S4.T7.C24:ML1", kind: "bay", near: 157, winMs: 7000, ask: "Metres in 12 days?", answer: 1740, miss: "How much cloth goes with one day?",
        say: "A loom weaves 145 m of cloth in a day. How much does it weave in 12 days?" },
      /* practice 1: answer in the plan = 252 marbles. near: 36 + 7 */
      { qid: "M2.S4.T7.C24:1", kind: "bay", near: 43, winMs: 6000, ask: "Marbles in 7 bags?", answer: 252, miss: "How many marbles go with one bag?",
        say: "A bag holds 36 marbles. How many marbles are in 7 such bags?" },
      /* practice 2: answer in the plan = 1350 days. near: 150 + 9 */
      { qid: "M2.S4.T7.C24:2", kind: "bay", near: 159, winMs: 6600, ask: "Days for 9 shawls?", answer: 1350, miss: "How many days go with one shawl?",
        say: "A weaver takes 150 days to make one shawl. How many days would 9 shawls take?" },
    ],
  },
  {
    n: 2,
    concept: "Write the multiplication before working it",
    conceptId: "M2.S4.T7.C25", objectiveIds: ["O11"],
    says: ["Write the whole thing down before you work any of it out. Deciding and doing are two jobs.",
      "Drag the two bay cards up into the question row. Then work it out, and type the product."],
    /* tries, as the plan writes it: first rung, the item's (what are your two numbers); second, what goes between them and
       what has to be there before the working area opens; third, the two cards read up into the row one at a time */
    ladder: ["What goes between them? The row must be whole before you work it.", "Read the two bay cards up into the row, one at a time. Then work it."],
    closing: "Deciding what to work out and working it out are two jobs. Write the whole multiplication before you multiply.",
    learned: "You learned: write the whole multiplication before working it.",
    traceback: "The question row is written from the two bay cards, one at a time, with the sign between them, and only then does the working area open; the column working runs row by row, each place zero shown in grey, to the product, and the answer sentence is written under the row.",
    items: [
      /* learn ML2: answer in the plan = 184 x 26, which comes to 4784 bottles. near: the tens row written without its zero (1104 + 368) */
      { qid: "M2.S4.T7.C25:ML2", kind: "row", near: 1472, winMs: 7600, ask: "Bottles in all?", answer: 4784, miss: "What are your two numbers? The bottles in one carton, and how many cartons.",
        say: "A carton holds 184 bottles, and a shop takes 26 cartons. Write the multiplication first, then find the answer." },
      /* practice 3: answer in the plan = 48 x 15, which comes to 720 passengers. near: 240 + 48, the tens row without its zero */
      { qid: "M2.S4.T7.C25:3", kind: "row", near: 288, winMs: 7200, ask: "Passengers in all?", answer: 720, miss: "Which two numbers does the story give? The passengers on one trip, and how many trips.",
        say: "A bus carries 48 passengers on each trip. Write the multiplication for 15 trips, and find the total." },
      /* practice 4: answer in the plan = 126 x 1450, which comes to 1,82,700 pages. near: 8700 + 2900 + 1450, the place zeros left off */
      { qid: "M2.S4.T7.C25:4", kind: "row", near: 13050, winMs: 9000, ask: "Pages in all?", answer: 182700, miss: "Find the two numbers first. The pages in one minute, and how many minutes.",
        say: "A press prints 126 pages a minute. Write the multiplication for 1,450 minutes, and find the total." },
    ],
  },
  {
    n: 3,
    concept: "Some numbers are described rather than printed",
    conceptId: "M2.S4.T7.C26", objectiveIds: ["O12"],
    says: ["That number is described, not printed. Turn the words into digits before you touch it.",
      "Tap the digits bay and type the number, biggest place first. Press Enter, then find the product."],
    /* tries, as the plan writes it: first rung, the item's (how many places has the number you are building); second, the
       smallest or largest each place may hold; third, the frame filled one place at a time, largest place first */
    ladder: ["What is the least or most each place may hold?", "Fill the places from the left. Say what each place may take."],
    closing: "A description is a question of its own. Turn it into digits before the multiplying starts.",
    learned: "You learned: turn a described number into digits first.",
    traceback: "The digits bay fills the described number place by place from the left, each place taking the smallest or largest digit it may hold, and the card rises into its blank; for a dozen, one tray of twelve cups is counted and copied until 45 trays stand; the row writes itself and the working runs to the product.",
    items: [
      /* learn ML3: answer in the plan = 9990, because the two numbers are 999 and 10. near: the smallest two digit number taken as 11 */
      { qid: "M2.S4.T7.C26:ML3", kind: "build", near: 10989, winMs: 8600, ask: "The product?", answer: 9990, miss: "How many places has the number you are building?",
        say: "What is the product of the largest three digit number and the smallest two digit number?" },
      /* practice 5: answer in the plan = 9900, because the two numbers are 100 and 99. near: the smallest three digit number taken as 111 */
      { qid: "M2.S4.T7.C26:5", kind: "build", near: 10989, winMs: 8600, ask: "The product?", answer: 9900, miss: "Which digit can stand first in the smallest three digit number?",
        say: "What is the product of the smallest three digit number and the largest two digit number?" },
      /* practice 6: answer in the plan = 540 eggs, because a dozen is 12. near: a dozen read as ten */
      { qid: "M2.S4.T7.C26:6", kind: "build", near: 450, winMs: 7600, ask: "Eggs in 45 trays?", answer: 540, miss: "How many eggs make one dozen?",
        say: "A tray holds one dozen eggs. How many eggs are in 45 such trays?" },
    ],
  },
  {
    n: 4,
    concept: "The other order is a free check",
    conceptId: "M2.S4.T7.C27", objectiveIds: ["O12"],
    says: ["Now swap the two numbers and work it again. The answer has to come out the same.",
      "Tap the swap strip to turn the two numbers round. Then type the product."],
    /* tries, as the plan writes it: first rung, the item's (which two numbers are you multiplying); second, which was the
       multiplier and what happens to the rows; third, the swapped working opened row by row with each row's digit named */
    ladder: ["Which one was the multiplier? What happens to the rows when you swap?", "Work the swapped one row by row. Name the digit that made each row."],
    closing: "Swapping the two numbers gives a check made of different steps. It catches a slip that reading your working again would miss.",
    learned: "You learned: swap the numbers and work it again to check.",
    traceback: "Both workings run all the way to their totals, the digit of the multiplier that made each row named in the margin, and the two totals land level on one line under a bar that says Same.",
    items: [
      /* learn ML4: answer in the plan = Rs 26,660, and the other order gives Rs 26,660 as well. near: the carry dropped in the first row (840) */
      { qid: "M2.S4.T7.C27:ML4", kind: "swap", near: 26640, winMs: 10000, ask: "Total sale in ₹?", answer: 26660, miss: "Which two numbers are you multiplying?",
        say: "A shop sold 124 lamps at ₹215 each. Find the total, then check it by working the two numbers the other way round." },
      /* practice 7: answer in the plan = 11,840 scooters, and 64 x 185 comes to 11,840 as well. near: the carries dropped in the first row (420) */
      { qid: "M2.S4.T7.C27:7", kind: "swap", near: 11520, winMs: 9600, ask: "Scooters in 64 hours?", answer: 11840, miss: "Check the first row of each working. Did every carry go into the next column?",
        say: "A company assembles 185 scooters an hour. How many in 64 hours? Check your answer the other way round." },
      /* practice 8: answer in the plan = Rs 32,400, and 135 x 240 comes to Rs 32,400 as well. near: the carries dropped in the tens row (4200) */
      { qid: "M2.S4.T7.C27:8", kind: "swap", near: 31200, winMs: 10000, ask: "Total sale in ₹?", answer: 32400, miss: "Check the carries in the row made by the tens digit.",
        say: "A shopkeeper sold 240 carved boxes at ₹135 each. Find the total sale, and check it by swapping the two numbers." },
    ],
  },
];

/* The lines the working area says are written out as literal api.say calls (sayTold, sayFree and the
   bay, row and digits-bay lines in Work), because `cli voice` bakes only a literal. Their Hindi and
   Gujarati are made here from the templates in TR and the answers above, so a line and its
   translation cannot drift apart. */
const stpExpandTR = () => {
  const put = (en: string, hi: string, gu: string) => { TR.hi[en] = hi; TR.gu[en] = gu; };
  const answers: Record<string, number> = {};
  PHASES.forEach((p: any) => p.items.forEach((it: any) => { answers[it.qid] = it.answer; }));
  Object.keys(STP_PROBS).forEach((k: string) => {
    const pr = STP_PROBS[k], n = indian(answers[k]);
    put(stpFill(pr.tell, { n }), stpFill(TR.hi[pr.tell], { n }), stpFill(TR.gu[pr.tell], { n }));
    const A = indian(stpRightVal(pr, pr.each || pr.order[0])), B = indian(stpRightVal(pr, pr.many || pr.order[1]));
    if (pr.kind === "bay") {   /* a bay filled right, and filled the other way round */
      put("That reads right: " + A + " × " + B + ".", "ठीक पढ़ा: " + A + " × " + B + "।", "બરાબર વંચાયું: " + A + " × " + B + ".");
      put("Read your bay: " + stpFill(pr.read, { a: B, b: A }) + ".", "तुम्हारी ट्रे पढ़ो: " + stpFill(TR.hi[pr.read], { a: B, b: A }) + "।",
        "તમારી ટ્રે વાંચો: " + stpFill(TR.gu[pr.read], { a: B, b: A }) + ".");
    }
    if (pr.kind === "row") {   /* the two cards written into the question row, in either order */
      [[A, B], [B, A]].forEach(([x, y]) => put("You wrote " + x + " × " + y + ".", "तुमने लिखा: " + x + " × " + y + "।", "તમે લખ્યું: " + x + " × " + y + "."));
    }
  });
  put("This number has two places.", "इस संख्या में दो स्थान हैं।", "આ સંખ્યામાં બે સ્થાન છે.");
  put("This number has three places.", "इस संख्या में तीन स्थान हैं।", "આ સંખ્યામાં ત્રણ સ્થાન છે.");
  put("A number with two places cannot begin with 0.", "दो स्थानों वाली संख्या 0 से शुरू नहीं हो सकती।", "બે સ્થાનવાળી સંખ્યા 0 થી શરૂ ન થઈ શકે.");
  put("A number with three places cannot begin with 0.", "तीन स्थानों वाली संख्या 0 से शुरू नहीं हो सकती।", "ત્રણ સ્થાનવાળી સંખ્યા 0 થી શરૂ ન થઈ શકે.");
  /* free play: any two of the four numbers, in either order */
  const F = [125, 36, 24, 15];
  F.forEach((a: number) => F.forEach((b: number) => {
    if (a === b) return;
    const s = indian(a) + " × " + indian(b) + " = " + indian(a * b);
    put(s + ".", s + " होता है।", s + " થાય.");   /* "comes to": also keeps the translation from equalling the English */
  }));
};
stpExpandTR();

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  bay: { halves: ["for each one", "how many"], rule: "phase 1: the question row writes itself only when the bay reads right; a swapped bay is read back as a sentence, and both readings are written under the row, neither marked" },
  questionRow: "two cards with the sign between them; phase 2: Enter waits until the row holds the whole multiplication",
  working: {
    method: "the book's column method: the number with more digits on top, one partial product per digit of the multiplier (each keeping its place zeros, the digit that made it named in the margin), then the rows added; a zero digit of the multiplier is a step skipped (a thin grey line marked skipped, never a row of zeros); a one-digit multiplier writes the product straight under the rule",
    colours: { top: "deep blue", multiplier: "amber", rows: "rose", carries: "vermilion, small, above the column they join", product: "green", zeros: "grey" },
  },
  digitsBay: "phase 3: a tap on the digits bay lends it the pad (api.capture); the described number is typed place by place, biggest place first, stopping at its places, and Enter raises it into its blank card and gives the pad back",
  swapStrip: "phase 4: the first working (the amount for one on top) and the swapped working run side by side and land level under a bar that says Same; Enter waits until the strip is open",
  problems: Object.keys(STP_PROBS).map((k) => {
    const pr = STP_PROBS[k];
    const ids = stpPairIds(pr);
    return { qid: k, step: pr.kind, numbers: ids.map((id: string) => stpRightVal(pr, id)),
      described: stpDescs(pr).map((d: any) => ({ places: d.places, value: d.v })), answerSentence: pr.tell };
  }),
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: the product typed on the pad (numbers compare as numbers) */
const judge = (item: any, v: any) => leadNumber(v) === item.answer;

/* oracle: every answer re-derived from the spoken question itself (described numbers turned into
   digit strings from their words) by lattice multiplication on digit strings, which shares no code
   with judge or the partial-product working; the board's numbers must give the same product, and
   in phase 4 the swapped order too */
const stpLattice = (a: string, b: string) => {
  const cells: number[] = [];
  for (let k = 0; k < a.length + b.length; k++) cells.push(0);
  for (let i = 0; i < a.length; i++) for (let j = 0; j < b.length; j++) cells[i + j + 1] += (a.charCodeAt(i) - 48) * (b.charCodeAt(j) - 48);
  for (let k = cells.length - 1; k > 0; k--) { cells[k - 1] += Math.floor(cells[k] / 10); cells[k] %= 10; }
  return cells.join("").replace(/^0+(?=\d)/, "");
};
const STP_PLACES: Record<string, number> = { two: 2, three: 3, four: 4 };
const stpSaid = (s: string) => {
  const out: string[] = [];
  const re = /(largest|smallest) (two|three|four) digit number|\bdozen\b|(\d{1,3}(?:,\d{2,3})+|\d+)/g;
  let m: any;
  while ((m = re.exec(String(s)))) {
    if (m[1]) { const p = STP_PLACES[m[2]]; let t = m[1] === "largest" ? "" : "1"; while (t.length < p) t += m[1] === "largest" ? "9" : "0"; out.push(t); }
    else if (m[0] === "dozen") out.push("12");
    else out.push(m[3].replace(/,/g, ""));
  }
  return out;
};
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const said = stpSaid(it.say);
  if (said.length !== 2 || stpLattice(said[0], said[1]) !== String(it.answer)) return false;
  const pr = stpProb(it.qid);
  const board = stpPairIds(pr).map((id: string) => String(stpRightVal(pr, id)));
  if (stpLattice(board[0], board[1]) !== String(it.answer)) return false;
  return it.kind !== "swap" || stpLattice(board[1], board[0]) === String(it.answer);
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => [String(item.answer), indian(item.answer), words(item.answer)];
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver types the product; the agent first does the phase's step on the working area as a
   child would (HOOK.prep: the bay filled, the row written, the numbers built, the strip opened), then
   the runtime types the product and check() presses Enter */
const HOOK: any = {};
const solve = (item: any, T: any) => T.submit(item.answer);
const answer = (item: any, v: any) => { if (HOOK.prep) HOOK.prep(); return undefined; };
const check = () => undefined;
/* the slot writes the typed product with Indian commas as it grows (4,784; 1,82,700) */
const stpFormat = (typed: any) => (/^\d{4,9}$/.test(String(typed ?? "")) ? indian(Number(typed)) : String(typed ?? ""));

/* ── layout of the working area (1086 x 528) ─────────────────────────────────────────────── */
const STB = { pad: 6, line: 72, gap: 12, cardW: 130, left: 16 };   /* the problem board: two lines, 156 high */
const STP_TOP = 166;                                                /* everything under the board starts here */
const STP_BAY = { y: 166, h: 130, w: 252, gap: 16, cy: 208 };       /* the bay's two halves (left column) */
const STP_ROW = { y: 306, h: 80, cy: 346, x0: 215, x1: 435, sx: 325 };  /* the question row (left column) */
const STP_STRIP = { y: 396, h: 132 };                               /* tiles, trays, the answer sentence */
const STP_BLUE = shade(CONTENT.hundred, 0.25);    /* the number being multiplied (on top) */
const STP_AMBER = shade(CONTENT.ten, 0.4);        /* the number it is multiplied by (amber ink deep enough to read) */
const STP_GREEN = shade(CONTENT.one, 0.25);       /* the product under the rule */
const STP_VERM = shade(CONTENT.pointer, 0.25);    /* a carried digit, small, above the column it joins */
const STP_ROSE = shade(CONTENT.bead, 0.3);        /* a partial product row, one per digit of the multiplier */
const STP_GREY = "#767676";                       /* a zero holding a place; a skipped row; a lifted card's outline */
const STP_WA0 = { r: 0, d: 0, p: 0, c: {}, hl: null };

/* the big working (phases 1 to 3, free play) and the two small ones of the swap strip (phase 4) */
const STP_G1: any = { x: 548, y: 166, w: 538, h: 362, colW: 50, onesC: 861, labX: 906, yC: 206, yTop: 252, yMul: 298, rule1: 314,
  band0: 324, full: 44, base: 34, skipH: 30, rule2: null, prod: null, prod0: 360, size: T.prompt, head: false };
/* phase 4: the rule and the total sit at one height in both workings, so the two totals land level */
const stpG2 = (bx: number): any => ({ x: bx, y: 166, w: 500, h: 318, colW: 40, onesC: bx + 340, labX: bx + 380, yC: 242, yTop: 276, yMul: 312, rule1: 324,
  band0: 330, full: 34, base: 28, skipH: 22, rule2: 440, prod: 474, prod0: 474, size: T.label, head: true });
/* the rows' bands under the first rule: a written row is full height, a skipped row closes to a thin band */
const stpBands = (G: any, rows: any[]) => {
  let top = G.band0;
  return rows.map((r: any) => { const h = r.skip ? G.skipH : G.full, b = { y: top + (r.skip ? h / 2 : G.base), top, h }; top += h; return b; });
};
const STP_GA = stpG2(0), STP_GB = stpG2(586);

/* the book's column method: the top number times each digit of the multiplier from the ones, each
   row keeping its place zeros. steps = the digits of a row as they are written, from the right, each
   with the carry it sends to the next top digit. A zero digit is a step you skip (as Partial Product
   Workshop teaches): no row of zeros, only a thin grey line marked "skipped"; the next row still starts
   in its own column with its holding zeros */
const stpRows = (top: number, mul: number) => String(mul).split("").reverse().map((ch: string, k: number) => {
  const d = Number(ch), place = Math.pow(10, k);
  if (d === 0) return { k, d, place, v: 0, text: "", skip: true, steps: [] };
  const steps: any[] = [];
  for (let z = 0; z < k; z++) steps.push({ digit: 0, place: true, carry: null });
  let c = 0;
  String(top).split("").reverse().map(Number).forEach((t: number, j: number) => {
    const x = t * d + c;
    c = Math.floor(x / 10);
    steps.push({ digit: x % 10, place: false, carry: c ? { col: j + 1, v: c } : null });
  });
  if (c) steps.push({ digit: c, place: false, carry: null });
  return { k, d, place, v: top * d * place, text: String(top * d * place), steps };
});

/* text is measured by the page's own font (the stage has no layout engine) */
let stpCtx: any = null;
const stpMeasure = (s: string, size: number, weight = 500) => {
  try {
    if (!stpCtx) stpCtx = window.document.createElement("canvas").getContext("2d");
    stpCtx.font = `${weight} ${size}px ${FONT}`;
    return Math.ceil(stpCtx.measureText(String(s)).width * 1.03);
  } catch (e) { return Math.ceil(String(s).length * size * 0.58); }
};
const stpWrap = (s: string, size: number, weight: number, max: number) => {
  const out: string[] = [];
  let line = "";
  for (const w of String(s).split(/\s+/).filter(Boolean)) {
    const t = line ? line + " " + w : w;
    if (line && stpMeasure(t, size, weight) > max) { out.push(line); line = w; } else line = t;
  }
  if (line) out.push(line);
  return out;
};

/* the problem board laid out: words and 130-wide cards, two lines of 72 (a card's finger box is its line) */
const stpBoard = (pr: any, tr: (v: any) => any = (v: any) => v) => {
  let y = STB.pad;
  const lines = pr.lines.map((ln: any[]) => {
    let x = STB.left;
    const items: any[] = [];
    ln.forEach((tok0: any) => {
      if (typeof tok0 === "string") {
        const tok = tr(tok0);   /* a word piece in the language in use (TR); English is unchanged */
        if (items.length && !/^[.,?]/.test(tok)) x += STB.gap;
        const w = stpMeasure(tok, T.label, 500);
        items.push({ kind: "w", text: tok, x, w });
        x += w;
      } else {
        if (items.length) x += STB.gap;
        items.push({ kind: "card", tok: tok0, x, w: STB.cardW });
        x += STB.cardW;
      }
    });
    const out = { y, items, width: x };
    y += STB.line;
    return out;
  });
  return { lines, h: y + STB.pad };
};

const stpFresh = (item: any, free: boolean) => {
  const key = free ? "free" : item && item.qid ? item.qid : "free";
  const pr = stpProb(key);
  const s: any = { key, bay: { each: null, many: null }, row: [null, null], built: {}, open: null, frame: null, swap: false,
    wa: STP_WA0, wb: STP_WA0, strip: null, told: null, same: false, fly: null, hl: null, tip: null, litLine: null, reads: null, cap: false, dig: "" };
  if (pr.kind === "row") s.bay = { each: pr.each, many: pr.many };
  if (pr.kind === "build") s.open = stpDescs(pr)[0].id;
  return s;
};

const STP_CSS = `
.stp-fly{transition:transform 440ms cubic-bezier(.3,.7,.25,1)}
.stp-pop{transform-box:fill-box;transform-origin:center;animation:stpPop 280ms ease-out both}
@keyframes stpPop{from{transform:scale(.5);opacity:.3}to{transform:none;opacity:1}}
.stp-in{animation:stpIn 320ms ease-out both}
@keyframes stpIn{from{transform:translateY(-16px);opacity:.3}to{transform:none;opacity:1}}
.stp-tip{animation:stpTip 520ms ease-in-out both}
@keyframes stpTip{0%,100%{transform:none}25%{transform:translateX(-9px)}75%{transform:translateX(9px)}}
.stp-grab{cursor:grab}
@media (prefers-reduced-motion:reduce){.stp-pop,.stp-in,.stp-tip{animation:none}.stp-fly{transition:none}}
`;

/* ── the working area ─────────────────────────────────────────────────────────────────────── */
function Work({ n, item, index, stage, wrong, typed, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const [S, setS] = useState<any>(() => stpFresh(item, free));
  const SR = useRef<any>(S);
  const set = (s: any) => { SR.current = s; setS(s); };
  const put = (patch: any) => set({ ...SR.current, ...patch });
  const setupFor = useRef<any>(index);
  const timers = useRef<any[]>([]);
  const later = (fn: () => void, ms: number) => { timers.current.push(setTimeout(fn, ms)); };
  const clearLater = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => clearLater, []);
  const reset = (it: any, fr: boolean) => { tl.stop(); clearLater(); set(stpFresh(it, fr)); };

  useEffect(() => {
    if (free) return;
    if ((stage === "ask" || stage === "teach") && setupFor.current !== index) { setupFor.current = index; reset(item, false); }
  }, [stage, index]);
  useEffect(() => { if (free) { setupFor.current = -2; reset(null, true); } }, [free]);

  const pr = stpProb(S.key);
  const kind = pr.kind;
  const board = stpBoard(pr, tx);
  const busy = tl.busy;
  const busyRef = useRef(false);
  busyRef.current = busy;
  const canAct = free || (stage === "ask" && !busy);
  const tick = () => api.sfx.tick();
  const tok = (id: string) => stpTok(pr, id);
  const valIn = (s: any, id: string | null): number | null => {
    if (!id) return null;
    const t = tok(id);
    if (!t) return null;
    return t.t === "num" ? t.v : s.built[id] !== undefined ? s.built[id] : null;
  };
  const lab = (id: string, v: number | null) => { const t = tok(id); return v === null ? "" : (t && t.rs ? "₹" : "") + indian(v); };
  const rowIdsIn = (s: any) => (kind === "build" ? (pr.order.every((id: string) => valIn(s, id) !== null) ? pr.order : [null, null]) : s.row);
  const pairIn = (s: any) => {
    const ids = rowIdsIn(s);
    if (!ids[0] || !ids[1]) return null;
    const a = valIn(s, ids[0]) as number, b = valIn(s, ids[1]) as number;
    return kind === "free" ? { top: a, mul: b, topIdx: 0 } : stpTopMul(a, b);
  };
  const descs = stpDescs(pr);
  const allBuilt = (s: any) => descs.every((d: any) => s.built[d.id] !== undefined);
  const tellOf = (p: number) => stpFill(pr.tell || "{n}", { n: indian(p) });
  /* the answer sentence and a bay's reading in a given language: TR holds their templates */
  const tplIn = (tpl: string, lg: string) => (lg !== "en" && TR[lg] && TR[lg][tpl]) || tpl;
  const tellIn = (p: number, lg: string) => stpFill(tplIn(pr.tell || "{n}", lg), { n: indian(p) });
  const stop = lang === "hi" ? "।" : ".";
  /* Devanagari and Gujarati stand taller than the Latin letters: their small labels sit a few units lower */
  const hiLow = lang === "en" ? 0 : 6;
  /* the answer sentence of the item in hand, and a free play sum: every one is a literal api.say (12
     problems, 12 ordered pairs of the four free numbers), so `cli voice` bakes each of them; a line
     that matches none is said from its Spoken value. stpExpandTR makes the matching TR entries. */
  const sayTold = (p: number) => {
    switch (SR.current.key + "|" + p) {
      case "M2.S4.T7.C24:ML1|1740": api.say("It weaves 1,740 m in 12 days."); break;
      case "M2.S4.T7.C24:1|252": api.say("7 bags hold 252 marbles."); break;
      case "M2.S4.T7.C24:2|1350": api.say("9 shawls take 1,350 days."); break;
      case "M2.S4.T7.C25:ML2|4784": api.say("26 cartons hold 4,784 bottles."); break;
      case "M2.S4.T7.C25:3|720": api.say("15 trips carry 720 passengers."); break;
      case "M2.S4.T7.C25:4|182700": api.say("In 1,450 minutes it prints 1,82,700 pages."); break;
      case "M2.S4.T7.C26:ML3|9990": api.say("The product is 9,990."); break;
      case "M2.S4.T7.C26:5|9900": api.say("The product is 9,900."); break;
      case "M2.S4.T7.C26:6|540": api.say("45 trays hold 540 eggs."); break;
      case "M2.S4.T7.C27:ML4|26660": api.say("124 lamps sell for ₹26,660."); break;
      case "M2.S4.T7.C27:7|11840": api.say("In 64 hours it makes 11,840 scooters."); break;
      case "M2.S4.T7.C27:8|32400": api.say("240 boxes sell for ₹32,400."); break;
      default: api.say({ en: tellOf(p), hi: tellIn(p, "hi"), gu: tellIn(p, "gu") });
    }
  };
  const sayFree = (top: number, mul: number) => {
    switch (top + "," + mul) {
      case "125,36": api.say("125 × 36 = 4,500."); break;
      case "125,24": api.say("125 × 24 = 3,000."); break;
      case "125,15": api.say("125 × 15 = 1,875."); break;
      case "36,125": api.say("36 × 125 = 4,500."); break;
      case "36,24": api.say("36 × 24 = 864."); break;
      case "36,15": api.say("36 × 15 = 540."); break;
      case "24,125": api.say("24 × 125 = 3,000."); break;
      case "24,36": api.say("24 × 36 = 864."); break;
      case "24,15": api.say("24 × 15 = 360."); break;
      case "15,125": api.say("15 × 125 = 1,875."); break;
      case "15,36": api.say("15 × 36 = 540."); break;
      case "15,24": api.say("15 × 24 = 360."); break;
      default: api.say({ en: indian(top) + " × " + indian(mul) + " = " + indian(top * mul) + ".",
        hi: indian(top) + " × " + indian(mul) + " = " + indian(top * mul) + "।", gu: indian(top) + " × " + indian(mul) + " = " + indian(top * mul) + "." });
    }
  };

  /* where a piece sits (centres, working-area units) */
  const posCard = (id: string) => {
    for (const ln of board.lines) for (const it of ln.items) if (it.tok && it.tok.id === id) return { x: it.x + 65, y: ln.y + 36 };
    return { x: 300, y: 40 };
  };
  const posHalf = (role: string) => ({ x: role === "each" ? 126 : 126 + STP_BAY.w + STP_BAY.gap, y: STP_BAY.cy });
  const posPlace = (i: number) => ({ x: i ? STP_ROW.x1 : STP_ROW.x0, y: STP_ROW.cy });
  const posFrame = { x: 374, y: 242 };

  /* a timed plan: each step merges its patch into the state, then waits */
  const planner = (start: any, slow: number) => {
    const P: any = { sim: start, steps: [] as any[] };
    P.at = (ms: number, patch: any, fx?: () => void) => {
      P.sim = { ...P.sim, ...patch };
      P.steps.push([Math.round(ms * slow), () => { put(patch); if (fx) fx(); }]);
    };
    return P;
  };
  /* one working, written as the book writes it: each row digit by digit from the right (its carries
     small above the top number), then the rows added column by column into the product */
  const workSteps = (P: any, key: string, top: number, mul: number) => {
    const rows = stpRows(top, mul), prod = String(top * mul);
    P.at(160, { [key]: STP_WA0 });
    if (rows.length === 1) {
      const c: any = {};
      rows[0].steps.forEach((st: any, j: number) => {
        if (st.carry) c[st.carry.col] = st.carry.v;
        P.at(260, { [key]: { r: 0, d: 0, p: j + 1, c: { ...c }, hl: j } }, j === rows[0].steps.length - 1 ? tick : undefined);
      });
      P.at(200, { [key]: { r: 0, d: 0, p: prod.length, c: {}, hl: null } });
      return;
    }
    rows.forEach((row: any, i: number) => {
      if (row.skip) { P.at(200, { [key]: { r: i + 1, d: 0, p: 0, c: {}, hl: null } }); return; }
      const c: any = {};
      row.steps.forEach((st: any, j: number) => {
        if (st.carry) c[st.carry.col] = st.carry.v;
        P.at(st.place ? 130 : 230, { [key]: { r: i, d: j + 1, p: 0, c: { ...c }, hl: null } }, j === row.steps.length - 1 ? tick : undefined);
      });
      P.at(220, { [key]: { r: i + 1, d: 0, p: 0, c: {}, hl: null } });
    });
    for (let q = 1; q <= prod.length; q++) P.at(210, { [key]: { r: rows.length, d: 0, p: q, c: {}, hl: q - 1 } }, q === prod.length ? tick : undefined);
    P.at(180, { [key]: { r: rows.length, d: 0, p: prod.length, c: {}, hl: null } });
  };

  /* the whole working, from where the child left it: the bay filled, the row written, the described
     numbers built, the strip opened, the working(s) run and the answer sentence written. The win
     motion and the traceback both run it; the traceback shows the misconception's own picture first. */
  const plan = (slow: number, wrongVal: any) => {
    if (SR.current.cap) api.capture(null);
    const start = { ...SR.current, fly: null, hl: null, tip: null, litLine: null, reads: null, cap: false, dig: "" };
    put({ fly: null, hl: null, tip: null, litLine: null, reads: null, cap: false, dig: "" });
    const P = planner(start, slow);
    const wv = wrongVal === null || wrongVal === undefined ? null : leadNumber(wrongVal);
    if (kind === "bay" || kind === "row") {
      if (wv !== null) { P.at(650, { litLine: 0 }); P.at(650, { litLine: 1 }); P.at(200, { litLine: null }); }
      const b = P.sim.bay;
      if (b.each !== pr.each || b.many !== pr.many) {
        if (b.each || b.many) P.at(320, { bay: { each: null, many: null }, row: [null, null], wa: STP_WA0, told: null }, tick);
        ["each", "many"].forEach((role: string) => {
          const id = pr[role], a = posCard(id), z = posHalf(role);
          P.at(280, { hl: role });
          P.at(40, { fly: { ...a, id } });
          P.at(470, { fly: { ...z, id } });
          P.at(200, { fly: null, bay: { ...P.sim.bay, [role]: id } }, tick);
        });
        P.at(260, { hl: null });
      }
      /* the two numbers were added: the amount for one, laid out once for every thing */
      if (kind === "bay" && wv !== null && wv === stpRightVal(pr, pr.each) + stpRightVal(pr, pr.many)) {
        const nn = stpRightVal(pr, pr.many), vv = stpRightVal(pr, pr.each);
        P.at(300, { strip: { kind: "groups", n: nn, v: vv, shown: 0 }, told: null });
        for (let q = 1; q <= nn; q++) P.at(150, { strip: { kind: "groups", n: nn, v: vv, shown: q } }, q === nn ? tick : undefined);
        P.at(900, {});
      }
      const ids = P.sim.row;
      if (!(ids[0] && ids[1])) {
        if (ids[0] || ids[1]) P.at(260, { row: [null, null] });
        [pr.each, pr.many].forEach((id: string, i: number) => {
          const a = posHalf(i ? "many" : "each"), z = posPlace(i);
          P.at(40, { fly: { ...a, id } });
          P.at(450, { fly: { ...z, id } });
          P.at(180, { fly: null, row: i ? [P.sim.row[0], id] : [id, null] }, tick);
        });
      }
    }
    if (kind === "build") {
      /* a dozen read as ten: one tray, its cups counted out, then the tray copied 45 times */
      if (pr.dozen && wv !== null) {
        const b = P.sim.built[pr.dozen];
        if (b !== undefined ? b !== stpRightVal(pr, pr.dozen) : wv === item.near) {
          P.at(300, { strip: { kind: "trays", cups: 0, trays: 0 }, told: null });
          for (let q = 1; q <= 12; q++) P.at(120, { strip: { kind: "trays", cups: q, trays: 0 } }, q === 12 ? tick : undefined);
          P.at(500, {});
          for (let q = 5; q <= 45; q += 5) P.at(150, { strip: { kind: "trays", cups: 12, trays: q } });
          P.at(600, {}, tick);
        }
      }
      descs.forEach((d: any) => {
        if (P.sim.built[d.id] === d.v) return;
        const ds = String(d.v).split("");
        P.at(360, { open: d.id, frame: [], wa: STP_WA0, told: null });
        ds.forEach((_x: string, q: number) => P.at(420, { frame: ds.slice(0, q + 1) }, tick));
        P.at(320, {});
        const z = posCard(d.id);
        P.at(40, { fly: { ...posFrame, id: d.id, v: d.v }, frame: null });
        P.at(480, { fly: { ...z, id: d.id, v: d.v } });
        P.at(200, { fly: null, built: { ...P.sim.built, [d.id]: d.v }, open: null }, tick);
      });
      if (P.sim.open) P.at(100, { open: null, frame: null });
    }
    if (kind === "swap") {
      if (!P.sim.swap) P.at(500, { swap: true }, tick);
      const A = { top: stpRightVal(pr, pr.each), mul: stpRightVal(pr, pr.many) };
      P.at(200, { same: false, told: null, wa: STP_WA0, wb: STP_WA0 });
      workSteps(P, "wa", A.top, A.mul);
      P.at(360, {});
      workSteps(P, "wb", A.mul, A.top);
      P.at(420, { same: true }, tick);
      P.at(300, { told: A.top * A.mul });
      return { steps: P.steps, total: A.top * A.mul };
    }
    const pv = pairIn(P.sim) || stpTopMul(stpRightVal(pr, stpPairIds(pr)[0]), stpRightVal(pr, stpPairIds(pr)[1]));
    P.at(200, { told: null, wa: STP_WA0 });
    workSteps(P, "wa", pv.top, pv.mul);
    P.at(360, { told: pv.top * pv.mul });
    return { steps: P.steps, total: pv.top * pv.mul };
  };

  /* ── the child's own moves ── */
  const settle = () => { clearLater(); put({ hl: null, tip: null, reads: null }); };
  /* phase 1 and free play: a card into a half of the bay (whatever was there goes back to its sentence) */
  const afterBay = (bay: any) => {
    if (!bay.each || !bay.many) return;
    if (kind === "free") { const s = { ...SR.current, row: [bay.each, bay.many] }; set(s); runFree(s); return; }
    if (bay.each === pr.each && bay.many === pr.many) {
      put({ row: [bay.each, bay.many] });
      /* one literal api.say a line, so `cli voice` bakes it (see stpExpandTR); a line matching none of
         them is said from its Spoken value */
      const la = lab(bay.each, valIn(SR.current, bay.each)), lb = lab(bay.many, valIn(SR.current, bay.many));
      switch (la + "|" + lb) {
        case "145|12": api.say(["That reads right: 145 × 12.", "Now work it out, and type the product."]); break;
        case "36|7": api.say(["That reads right: 36 × 7.", "Now work it out, and type the product."]); break;
        case "150|9": api.say(["That reads right: 150 × 9.", "Now work it out, and type the product."]); break;
        default: api.say([{ en: "That reads right: " + la + " × " + lb + ".", hi: "ठीक पढ़ा: " + la + " × " + lb + "।", gu: "બરાબર વંચાયું: " + la + " × " + lb + "." },
          "Now work it out, and type the product."]);
      }
      return;
    }
    /* the two halves the other way round: the bay is read back as a sentence, headings lit in turn */
    const va = lab(bay.each, valIn(SR.current, bay.each)), vb = lab(bay.many, valIn(SR.current, bay.many));
    switch (va + "|" + vb) {
      case "12|145": api.say(["Read your bay: 12 m a day, for 145 days.", "Is that what the story says?"]); break;
      case "7|36": api.say(["Read your bay: 7 marbles a bag, 36 bags.", "Is that what the story says?"]); break;
      case "9|150": api.say(["Read your bay: 9 days a shawl, 150 shawls.", "Is that what the story says?"]); break;
      default: api.say([{ en: "Read your bay: " + stpFill(pr.read, { a: va, b: vb }) + ".",
        hi: "तुम्हारी ट्रे पढ़ो: " + stpFill(tplIn(pr.read, "hi"), { a: va, b: vb }) + "।",
        gu: "તમારી ટ્રે વાંચો: " + stpFill(tplIn(pr.read, "gu"), { a: va, b: vb }) + "." }, "Is that what the story says?"]);
    }
    put({ hl: "each", reads: [stpFill(tplIn(pr.read, lang), { a: va, b: vb }) + stop, stpFill(tplIn(pr.read, lang), { a: vb, b: va }) + stop] });
    later(() => put({ hl: "many" }), 1800);
    later(() => put({ hl: null }), 3600);
  };
  const toHalf = (id: string, role: string) => {
    const s = SR.current;
    const bay = { ...s.bay };
    if (bay.each === id) bay.each = null;
    if (bay.many === id) bay.many = null;
    bay[role] = id;
    settle();
    tl.stop();
    put({ bay, row: [null, null], wa: STP_WA0, told: null, strip: null });
    tick();
    afterBay(bay);
  };
  const tapCard = (id: string) => {
    const s = SR.current;
    const role = !s.bay.each ? "each" : !s.bay.many ? "many" : null;
    if (role) toHalf(id, role);
    else api.say("The bay is full. Tap a card in the bay to send it back.");
  };
  const back = (id: string) => {
    const s = SR.current;
    const bay = { each: s.bay.each === id ? null : s.bay.each, many: s.bay.many === id ? null : s.bay.many };
    settle();
    tl.stop();
    put({ bay, row: [null, null], wa: STP_WA0, told: null, strip: null });
    tick();
  };
  /* phase 2: a bay card up into the question row */
  const toPlace = (id: string, place?: number) => {
    const s = SR.current;
    const row = [...s.row];
    const was = row.indexOf(id);
    if (was >= 0) row[was] = null;
    const p = place !== undefined ? place : row[0] === null ? 0 : row[1] === null ? 1 : -1;
    if (p < 0) { api.say("The row is full. Tap a card in the row to take it out."); return; }
    row[p] = id;
    settle();
    put({ row, wa: STP_WA0, told: null });
    tick();
    if (row[0] && row[1]) {
      const la = lab(row[0], valIn(s, row[0])), lb = lab(row[1], valIn(s, row[1]));
      switch (la + "|" + lb) {
        case "184|26": api.say(["You wrote 184 × 26.", "The working area is open. Work it out, and type the product."]); break;
        case "26|184": api.say(["You wrote 26 × 184.", "The working area is open. Work it out, and type the product."]); break;
        case "48|15": api.say(["You wrote 48 × 15.", "The working area is open. Work it out, and type the product."]); break;
        case "15|48": api.say(["You wrote 15 × 48.", "The working area is open. Work it out, and type the product."]); break;
        case "126|1,450": api.say(["You wrote 126 × 1,450.", "The working area is open. Work it out, and type the product."]); break;
        case "1,450|126": api.say(["You wrote 1,450 × 126.", "The working area is open. Work it out, and type the product."]); break;
        default: api.say([{ en: "You wrote " + la + " × " + lb + ".", hi: "तुमने लिखा: " + la + " × " + lb + "।", gu: "તમે લખ્યું: " + la + " × " + lb + "." },
          "The working area is open. Work it out, and type the product."]);
      }
    }
  };
  const outOfRow = (i: number) => {
    const row = [...SR.current.row];
    row[i] = null;
    settle();
    put({ row, wa: STP_WA0, told: null });
    tick();
  };
  /* phase 3: a tap on the digits bay (or on a blank card) lends the pad to the frame (api.capture):
     digits fill the places from the left and stop at the frame's width, Enter raises the card into its
     blank, and the pad goes back to the slot for the product */
  const buildDig = () => {
    const s = SR.current, d = tok(s.open), str = s.dig;
    if (!str) { api.say("Type its digits on the keys, biggest place first."); return; }
    if (str.length !== d.places) {
      if (d.places === 2) api.say("This number has two places.");
      else if (d.places === 3) api.say("This number has three places.");
      else api.say({ en: "This number has " + words(d.places) + " places.", hi: "इस संख्या में " + wordsIn(d.places, "hi") + " स्थान हैं।", gu: "આ સંખ્યામાં " + wordsIn(d.places, "gu") + " સ્થાન છે." });
      return;
    }
    if (str[0] === "0") {
      if (d.places === 2) api.say("A number with two places cannot begin with 0.");
      else if (d.places === 3) api.say("A number with three places cannot begin with 0.");
      else api.say({ en: "A number with " + words(d.places) + " places cannot begin with 0.", hi: wordsIn(d.places, "hi") + " स्थानों वाली संख्या 0 से शुरू नहीं हो सकती।", gu: wordsIn(d.places, "gu") + " સ્થાનવાળી સંખ્યા 0 થી શરૂ ન થઈ શકે." });
      return;
    }
    const value = Number(str), built = { ...s.built, [s.open]: value };
    const next = descs.find((x: any) => built[x.id] === undefined);
    api.capture(null);
    const P = planner({ ...s }, 1);
    P.at(40, { cap: false, dig: "", fly: { ...posFrame, id: s.open, v: value }, frame: str.split("") });
    P.at(460, { fly: { ...posCard(s.open), id: s.open, v: value }, frame: null });
    P.at(80, { fly: null, built, open: next ? next.id : null, wa: STP_WA0, told: null }, tick);
    /* one literal a call, so `cli voice` bakes each of the three lines (same choice as a ternary of lines) */
    tl.run(P.steps, () => (next ? api.say("Now tap the digits bay for the next one.") : descs.length > 1 ? api.say("Both are digits now. Find the product.") : api.say("Now it is digits. Find the product.")));
  };
  const capKey = (k: string) => {
    const s = SR.current;
    if (!s.cap || !s.open || busyRef.current) return;
    const d = tok(s.open);
    if (k === "enter") { buildDig(); return; }
    if (k === "back") { put({ dig: s.dig.slice(0, -1) }); return; }
    if (k === "clear") { put({ dig: "" }); return; }
    if (/^[0-9]$/.test(k) && s.dig.length < d.places) put({ dig: s.dig + k });
  };
  const openDesc = (id: string) => {
    settle();
    put({ open: id, cap: true, dig: "", frame: null, wa: STP_WA0, told: null });
    api.capture(capKey);
    tick();
  };
  /* phase 4: the strip opens on the same two numbers the other way round */
  const doSwap = () => {
    if (SR.current.swap) return;
    settle();
    put({ swap: true });
    tick();
    api.say("Now it is the other way round. Work it both ways, and type the product.");
  };
  /* free play: the working runs by itself; a tap on the sign swaps the two numbers */
  const runFree = (s: any) => {
    const ids = s.row;
    if (!ids[0] || !ids[1]) return;
    const top = valIn(s, ids[0]) as number, mul = valIn(s, ids[1]) as number;
    const P = planner({ ...s }, 0.6);
    workSteps(P, "wa", top, mul);
    tl.run(P.steps, () => sayFree(top, mul));
  };
  const freeSwap = () => {
    const s = SR.current;
    if (!s.row[0] || !s.row[1]) return;
    const ns = { ...s, row: [s.row[1], s.row[0]], wa: STP_WA0 };
    set(ns);
    tick();
    runFree(ns);
  };

  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (!canAct) return;
    const s = SR.current;
    const halfAt = (q: any) => (q.y >= STP_BAY.y - 20 && q.y <= STP_BAY.y + STP_BAY.h + 20 ? (q.x < 260 ? "each" : q.x <= 540 ? "many" : null) : null);
    if (pay.src === "story") {
      if (!moved) return tapCard(pay.id);
      const h = halfAt(p);
      if (h) toHalf(pay.id, h);
      return;
    }
    if (pay.src === "bay") {
      if (kind === "row") {
        if (!moved) return toPlace(pay.id);
        if (p.y >= STP_ROW.y - 24 && p.y <= STP_ROW.y + STP_ROW.h + 24 && p.x < 540) toPlace(pay.id, p.x < STP_ROW.sx ? 0 : 1);
        return;
      }
      if (!moved) return back(pay.id);
      const h = halfAt(p);
      if (h && s.bay[h] !== pay.id) toHalf(pay.id, h);
      else if (!h) back(pay.id);
    }
  });

  /* Enter first comes here on phases 2 to 4: the step the phase is about has to be done before the
     product is taken (phase 3: while the digits bay holds the pad, its Enter goes to capKey instead) */
  const enterFn = (v: any) => {
    const s = SR.current;
    if (kind === "row" && !(s.row[0] && s.row[1])) {
      api.say("First write the multiplication in the question row. Drag the two bay cards up.");
      put({ tip: "row" });
      later(() => put({ tip: null }), 700);
      return;
    }
    if (kind === "build" && !allBuilt(s)) {
      const d = descs.find((x: any) => s.built[x.id] === undefined);
      put({ open: s.open || d.id, tip: "digits" });
      later(() => put({ tip: null }), 700);
      api.say("First build the number. Tap the digits bay, then type its digits.");
      return;
    }
    if (kind === "swap" && !s.swap) {
      api.say("Swap the two numbers first. Then work it the other way too.");
      put({ tip: "swap" });
      later(() => put({ tip: null }), 700);
      return;
    }
    api.submit(v);
  };
  api.onEnter(!free && (kind === "row" || kind === "build" || kind === "swap") ? enterFn : null);

  /* the agent, as a child would: the phase's step on the working area, then the product is typed */
  HOOK.prep = () => {
    const s = SR.current;
    if (kind === "bay" || kind === "row") put({ bay: { each: pr.each, many: pr.many }, row: [pr.each, pr.many], hl: null });
    if (kind === "build") { const built: any = { ...s.built }; descs.forEach((d: any) => { built[d.id] = d.v; }); api.capture(null); put({ built, open: null, frame: null, cap: false, dig: "" }); }
    if (kind === "swap") put({ swap: true });
  };

  /* ── the win: whatever the child left undone is done in front of them, then the sentence is read ── */
  useEffect(() => {
    if (stage !== "win" || free) return;
    clearLater();
    const s = SR.current;
    if (s.told !== null && s.told !== undefined) { sayTold(s.told); return; }
    const r = plan(0.45, null);
    tl.run(r.steps, () => sayTold(r.total));
  }, [stage]);

  /* ── the traceback: the maths redrawn in steps, ending on the whole product and its sentence;
        nothing marked, nothing cleared, the child's answer stays in the slot ── */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    clearLater();
    api.lock(true);
    const r = plan(0.8, wrong.value);
    tl.run([[350, () => {}], ...r.steps, [300, () => {}]], () => api.lock(false));
  }, [wrong]);

  /* ── what the host and the agent read back (toolApi.getState) ── */
  const rowIds = rowIdsIn(S);
  const whole = !!(rowIds[0] && rowIds[1]);
  const pair = pairIn(S);
  api.share({
    phase: n, problem: free ? "free" : item.qid || null,
    lifted: [S.bay.each, S.bay.many].filter(Boolean).map((id: string) => valIn(S, id)),
    oneEach: valIn(S, S.bay.each), howMany: valIn(S, S.bay.many),
    written: kind === "swap" ? (S.swap ? [stpRightVal(pr, pr.each), stpRightVal(pr, pr.many)].map(indian).join(" × ") : null)
      : whole ? rowIds.map((id: string) => indian(valIn(S, id) as number)).join(" × ") : null,
    builtNumbers: descs.filter((d: any) => S.built[d.id] !== undefined).map((d: any) => S.built[d.id]),
    product: S.told !== null && S.told !== undefined ? S.told : null,
    checked: kind === "swap" ? !!S.same : null,
    complete: stage === "idle",
  });

  /* ── drawing ── */
  const cardArt = (cx: number, cy: number, label: string, o: any = {}) => (
    <g filter={o.lift ? "url(#fLift)" : "url(#fShadowSoft)"}>
      <rect x={cx - 65} y={cy - 28} width={130} height={56} rx={14} fill="#FFFFFF" stroke={o.built ? C.accent : C.rule} strokeWidth={o.built ? 3 : 2} />
      {o.built && <rect x={cx - 59} y={cy - 22} width={118} height={44} rx={10} fill="none" stroke={C.accent} strokeWidth={1.5} strokeDasharray="6 5" />}
      <text x={cx} y={cy + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={o.fill || C.ink}>{label}</text>
    </g>
  );
  const pulseBox = (x: number, y: number, w: number, h: number) => (
    <rect className="c4-pulse" x={x} y={y} width={w} height={h} rx={18} fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" />
  );

  const piece = (it: any, ln: any) => {
    const t = it.tok, id = t.id, x = it.x, y = ln.y, cx = x + 65, cy = y + 36;
    if (t.t === "desc") {
      const v = S.built[id], open = S.open === id;
      if (v !== undefined) {
        return (
          <g key={"p-" + id}>
            {cardArt(cx, cy, indian(v), { built: true })}
            {open && <rect x={x - 5} y={y + 3} width={140} height={66} rx={17} fill="none" stroke={shade(CONTENT.ten, 0.3)} strokeWidth={4} />}
            {canAct && !free && !(open && S.cap) && <Hit id={"build-" + id} label={"Build " + indian(v) + " again"} x={x} y={y} w={130} h={72} onPress={() => openDesc(id)} />}
          </g>
        );
      }
      return (
        <g key={"p-" + id}>
          <rect x={x} y={y + 8} width={130} height={56} rx={14} fill={open ? tint(CONTENT.ten, 0.72) : "#FFFFFF"} stroke={shade(CONTENT.ten, 0.3)}
            strokeWidth={open ? 4 : 2.5} strokeDasharray="9 6" />
          {canAct && !free && !(open && S.cap) && <Hit id={"build-" + id} label="Build this number" x={x} y={y} w={130} h={72} onPress={() => openDesc(id)} />}
        </g>
      );
    }
    const v = t.v, label = lab(id, v);
    const inBay = S.bay.each === id || S.bay.many === id;
    /* lifted: its outline stays in the sentence, so the sentence still reads; a tap pushes it back */
    if (((kind === "bay" || kind === "free") && inBay) || kind === "row") {
      return (
        <g key={"p-" + id}>
          <rect x={x + 2} y={y + 10} width={126} height={52} rx={13} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="8 6" />
          <text x={cx} y={y + 47} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={STP_GREY}>{label}</text>
          {canAct && kind !== "row" && <Hit id={"back-" + id} label={"Put " + label + " back"} x={x} y={y} w={130} h={72} onPress={() => back(id)} />}
        </g>
      );
    }
    if (kind === "bay" || kind === "free") {
      const pay = { src: "story", id };
      return (
        <g key={"p-" + id} className={canAct ? "c4-piece stp-grab" : ""}
          {...(canAct ? { ...control("num-" + id, "Number " + label), ...drag.bind(pay), ...drag.keys(pay) } : {})}>
          {cardArt(cx, cy, label)}
          <rect x={x} y={y} width={130} height={72} fill="transparent" />
        </g>
      );
    }
    return <g key={"p-" + id}>{cardArt(cx, cy, label)}</g>;
  };

  const drawBoard = () => (
    <g data-role="reading">
      <rect x={0} y={0} width={W.w} height={board.h} rx={RAD.panel} fill={C.paper} stroke={C.rule} strokeWidth={2} />
      {board.lines.map((ln: any, li: number) => (
        <g key={li}>
          {S.litLine === li && <rect x={STB.left - 4} y={ln.y + 67} width={ln.width - STB.left + 8} height={5} rx={2.5} fill={CONTENT.ten} />}
          {ln.items.map((it: any, k: number) => it.kind === "w"
            ? <text key={"w" + k} x={it.x} y={ln.y + 47} fontSize={T.label} fontWeight={500} fill={C.ink}>{it.text}</text>
            : piece(it, ln))}
        </g>
      ))}
    </g>
  );

  /* the bay: one half for the amount that goes with one thing, one for how many things; the heading
     sits under its landing square so a card never covers it */
  const drawBay = () => (
    <g>
      {["each", "many"].map((role: string, i: number) => {
        const x0 = i ? STP_BAY.w + STP_BAY.gap : 0, cx = x0 + STP_BAY.w / 2, id = S.bay[role], lit = S.hl === role;
        const label = id ? lab(id, valIn(S, id)) : "";
        const pay = { src: "bay", id };
        const inRow = kind === "row" && id && S.row.includes(id);
        const title = kind === "row" ? "Write " + label + " in the question row" : "Send " + label + " back";
        return (
          <g key={role}>
            <rect x={x0} y={STP_BAY.y} width={STP_BAY.w} height={STP_BAY.h} rx={RAD.panel} fill={tint(C.panel, 0.5)}
              stroke={lit ? CONTENT.ten : C.rule} strokeWidth={lit ? 5 : 2} />
            {!id && <rect x={cx - 71} y={STP_BAY.cy - 32} width={142} height={64} rx={14} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} strokeDasharray="9 7" />}
            {id && (
              <g className={canAct ? "c4-piece stp-grab" : ""}
                {...(canAct ? { ...control("bay-" + role, title), ...drag.bind(pay), ...drag.keys(pay) } : {})}>
                {cardArt(cx, STP_BAY.cy, label, { fill: inRow ? STP_GREY : C.ink })}
                <rect x={cx - 65} y={STP_BAY.cy - 36} width={130} height={72} fill="transparent" />
              </g>
            )}
            {lit && <rect x={cx - 100} y={STP_BAY.y + 112 + hiLow} width={200} height={6} rx={3} fill={CONTENT.ten} />}
            <text x={cx} y={STP_BAY.y + 104 + hiLow} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(role === "each" ? "for each one" : "how many")}</text>
          </g>
        );
      })}
    </g>
  );

  /* the digits bay (phase 3): a frame of the number's places. A tap lends it the pad; the digits fill
     the places from the left and stop at the frame's width */
  const stpFrameBox = (places: number) => { const bw = 76, gap = 12, fw = places * bw + (places - 1) * gap; return { bw, gap, fw, fx: 500 - fw }; };
  const drawDigitsBay = () => {
    const d = S.open ? tok(S.open) : null;
    const places = d ? d.places : 0;
    const digits: string[] = S.frame ? S.frame : d && S.cap ? String(S.dig).split("") : [];
    const names = ["H", "T", "O"].slice(3 - places);
    const { bw, gap, fx } = stpFrameBox(places);
    return (
      <g className={S.tip === "digits" ? "stp-tip" : ""}>
        <rect x={0} y={STP_BAY.y} width={520} height={STP_BAY.h} rx={RAD.panel} fill={d ? tint(C.panel, 0.5) : tint(C.panel, 0.55)}
          stroke={d && S.cap ? shade(CONTENT.ten, 0.3) : C.rule} strokeWidth={d && S.cap ? 4 : 2} strokeDasharray={d ? undefined : "10 8"} />
        {d ? <text x={22} y={STP_BAY.y + 74} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("digits bay")}</text>
          : <text x={260} y={STP_BAY.y + 76} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={STP_GREY}>{tx("digits bay")}</text>}
        {names.map((nm: string, k: number) => {
          const x = fx + k * (bw + gap), next = stage === "ask" && S.cap && !busy && k === digits.length;
          return (
            <g key={nm}>
              <text x={x + bw / 2} y={STP_BAY.y + 30 + hiLow} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(nm)}</text>
              <rect x={x} y={STP_BAY.y + 40} width={bw} height={bw} rx={12} fill="#FFFFFF" stroke={next ? C.accent : C.rule} strokeWidth={next ? 4 : 2} />
              {digits[k] !== undefined && <text key={"d" + k + digits[k]} className="stp-pop" x={x + bw / 2} y={STP_BAY.y + 98} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{digits[k]}</text>}
            </g>
          );
        })}
        {d && !S.cap && canAct && !free && <Hit id="digits-bay" label="Type the digits here" x={0} y={STP_BAY.y} w={520} h={STP_BAY.h} onPress={() => openDesc(S.open)} />}
      </g>
    );
  };

  /* the question row: two places and the sign between them, one text so the sign always stands by a number */
  const drawRow = () => {
    const live = kind === "row" || whole;
    const fillOf = (i: number) => (whole && pair ? (i === pair.topIdx ? STP_BLUE : STP_AMBER) : C.ink);
    return (
      <g className={S.tip === "row" ? "stp-tip" : ""}>
        <rect x={0} y={STP_ROW.y} width={520} height={STP_ROW.h} rx={RAD.panel} fill={live ? "#FFFFFF" : tint(C.panel, 0.55)} stroke={C.rule}
          strokeWidth={2} strokeDasharray={live ? undefined : "10 8"} />
        <text x={18} y={STP_ROW.y + 34 + hiLow} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("question")}</text>
        <text x={18} y={STP_ROW.y + 64 + hiLow} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("row")}</text>
        {[0, 1].map((i: number) => {
          const cx = i ? STP_ROW.x1 : STP_ROW.x0, id = rowIds[i];
          return id
            ? <rect key={i} className="stp-pop" x={cx - 65} y={STP_ROW.cy - 28} width={130} height={56} rx={14} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />
            : <rect key={i} x={cx - 65} y={STP_ROW.cy - 28} width={130} height={56} rx={14} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="8 7" />;
        })}
        {(rowIds[0] || rowIds[1]) && (
          <text y={STP_ROW.cy + 11} fontSize={T.label} fontWeight={700} textAnchor="middle" fill={C.ink}>
            {rowIds[0] && <tspan x={STP_ROW.x0} fill={fillOf(0)}>{lab(rowIds[0], valIn(S, rowIds[0]))}</tspan>}
            <tspan x={STP_ROW.sx}>×</tspan>
            {rowIds[1] && <tspan x={STP_ROW.x1} fill={fillOf(1)}>{lab(rowIds[1], valIn(S, rowIds[1]))}</tspan>}
          </text>
        )}
        {canAct && kind === "row" && [0, 1].map((i: number) => rowIds[i]
          ? <Hit key={"h" + i} id={"row-" + i} label={"Take " + lab(rowIds[i], valIn(S, rowIds[i])) + " out of the row"} x={(i ? STP_ROW.x1 : STP_ROW.x0) - 65} y={STP_ROW.y + 4} w={130} h={72} onPress={() => outOfRow(i)} />
          : null)}
        {canAct && free && whole && <Hit id="swap-sign" label="Swap the two numbers" x={STP_ROW.sx - 38} y={STP_ROW.y + 4} w={76} h={72} onPress={freeSwap} />}
      </g>
    );
  };

  /* one column working: the top number (blue), the multiplier (amber) with its sign, one rose row per
     digit of the multiplier (its place zeros grey, the digit that made it named in the margin), then
     the product (green). st = { r, d, p, c, hl }: rows done, digits of the next row, product digits,
     carries shown above the top number, the column being added */
  const drawWorking = (G: any, top: number | null, mul: number | null, st: any, key: string, header: boolean) => {
    if (top === null || mul === null) {
      return (
        <g key={key}>
          <rect x={G.x} y={G.y} width={G.w} height={G.h} rx={RAD.panel} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={2} strokeDasharray="10 8" />
          <text x={G.x + G.w / 2} y={G.y + G.h / 2 + 12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={STP_GREY}>{tx("working area")}</text>
        </g>
      );
    }
    const colC = (k: number) => G.onesC - k * G.colW;
    const rows = stpRows(top, mul), R = rows.length === 1 ? 0 : rows.length;
    const prod = String(top * mul), ts = String(top), ms = String(mul);
    const width = Math.max(prod.length, ts.length, ms.length + 1);
    const left = colC(width - 1) - G.colW / 2 - 6, right = G.onesC + G.colW / 2 + 6;
    const digits = (s: string, y: number, fill: string, shown: number, k0 = 0, cls?: string) => (
      <text key={"t" + y + s + shown} className={cls} y={y} fontSize={G.size} fontWeight={700} textAnchor="middle">
        {s.split("").map((ch: string, i: number) => {
          const k = s.length - 1 - i + k0;
          if (s.length - 1 - i >= shown) return null;
          return <tspan key={i} x={colC(k)} fill={ch === "0" ? STP_GREY : fill}>{ch}</tspan>;
        })}
      </text>
    );
    const slotBox = (y: number, k: string) => (
      <rect key={k} x={left + 4} y={y - (G.size === T.prompt ? 34 : 28)} width={right - left - 8} height={G.size === T.prompt ? 42 : 34} rx={8}
        fill="none" stroke={C.rule} strokeWidth={1.5} strokeDasharray="7 7" />
    );
    const bands = stpBands(G, rows);
    const last = bands[bands.length - 1];
    const rule2Y = G.rule2 !== null ? G.rule2 : last.top + last.h + 4;
    const prodY = R ? (G.prod !== null ? G.prod : rule2Y + 46) : G.prod0;
    return (
      <g key={key}>
        <rect x={G.x} y={G.y} width={G.w} height={G.h} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
        {header && (
          <g>
            <rect x={G.x + 10} y={G.y + 10} width={G.w - 20} height={46} rx={12} fill={tint(C.panel, 0.55)} />
            <text x={G.x + G.w / 2} y={G.y + 44} fontSize={T.label} fontWeight={700} textAnchor="middle" fill={C.ink}>
              <tspan fill={STP_BLUE}>{indian(top)}</tspan><tspan>{" × "}</tspan><tspan fill={STP_AMBER}>{indian(mul)}</tspan>
            </text>
          </g>
        )}
        {st.hl !== null && st.hl !== undefined && (
          <rect x={colC(st.hl) - G.colW / 2 + 3} y={G.rule1 + 4} width={G.colW - 6} height={prodY - G.rule1 + 6} rx={8} fill={CONTENT.ten} fillOpacity={0.14} />
        )}
        {Object.keys(st.c || {}).map((col: string) => (
          <text key={"c" + col + st.c[col]} className="stp-pop" x={colC(Number(col))} y={G.yC} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={STP_VERM}>{st.c[col]}</text>
        ))}
        {digits(ts, G.yTop, STP_BLUE, 99)}
        <text y={G.yMul} fontSize={G.size} fontWeight={700} textAnchor="middle" fill={C.ink}>
          <tspan x={colC(width - 1)}>×</tspan>
          {ms.split("").map((ch: string, i: number) => <tspan key={i} x={colC(ms.length - 1 - i)} fill={ch === "0" ? STP_GREY : STP_AMBER}>{ch}</tspan>)}
        </text>
        <rect x={left} y={G.rule1 - 2} width={right - left} height={4} rx={2} fill={C.ink} />
        {R > 0 && rows.map((row: any, i: number) => {
          const y = bands[i].y;
          if (row.skip) {
            return (
              <g key={"r" + i}>
                <line x1={left + 22} y1={y} x2={right - 22} y2={y} stroke={STP_GREY} strokeWidth={3} strokeLinecap="round" strokeDasharray="10 8" />
                <text x={G.labX} y={y + 10} fontSize={T.micro} fontWeight={700} fill={STP_GREY}>{tx("skipped")}</text>
              </g>
            );
          }
          const full = i < st.r, part = i === st.r && st.d > 0;
          return (
            <g key={"r" + i}>
              <text x={G.labX} y={y - (G.size === T.prompt ? 6 : 2)} fontSize={T.micro} fontWeight={700} fill={STP_AMBER}>{"× " + indian(row.d * row.place)}</text>
              {full ? digits(row.text, y, STP_ROSE, 99) : part ? digits(row.text, y, STP_ROSE, st.d) : slotBox(y, "e" + i)}
            </g>
          );
        })}
        {R > 0 && <rect x={left} y={rule2Y - 2} width={right - left} height={4} rx={2} fill={C.ink} />}
        {st.p > 0 ? digits(prod, prodY, STP_GREEN, st.p) : slotBox(prodY, "prod")}
      </g>
    );
  };

  /* the strip under the row: the misconception's picture from a traceback (tiles or trays), and under it
     the answer sentence once the product is known */
  const drawStrip = () => {
    const y0 = STP_STRIP.y, st = S.strip;
    let pic: any = null;
    if (st && st.kind === "groups") {
      const rows = st.n <= 7 ? 1 : 2, cols = Math.ceil(st.n / rows), gap = 8;
      const tw = Math.min(96, (520 - (cols - 1) * gap) / cols), th = rows > 1 ? 38 : 50;
      pic = (
        <g>
          {Array.from({ length: st.shown }).map((_x: any, q: number) => {
            const r = Math.floor(q / cols), c = q % cols, x = c * (tw + gap), y = y0 + 4 + r * (th + 8);
            return (
              <g key={q} className="stp-pop">
                <rect x={x} y={y} width={tw} height={th} rx={10} fill={tint(CONTENT.hundred, 0.82)} stroke={CONTENT.hundred} strokeWidth={2} />
                <text x={x + tw / 2} y={y + th / 2 + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={STP_BLUE}>{indian(st.v)}</text>
              </g>
            );
          })}
        </g>
      );
    } else if (st && st.kind === "trays") {
      /* one tray of a dozen cups, counted out, then the tray copied until 45 stand */
      pic = (
        <g>
          <rect x={0} y={y0 + 4} width={196} height={76} rx={14} fill={tint(CONTENT.hundred, 0.82)} stroke={CONTENT.hundred} strokeWidth={2} />
          {Array.from({ length: st.cups }).map((_x: any, q: number) => (
            <circle key={q} className="stp-pop" cx={23 + (q % 6) * 30} cy={y0 + 25 + Math.floor(q / 6) * 34} r={11} fill="#FFFFFF" stroke={STP_BLUE} strokeWidth={2} />
          ))}
          {st.cups > 0 && <text x={228} y={y0 + 54} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={STP_BLUE}>{String(st.cups)}</text>}
          {Array.from({ length: st.trays }).map((_x: any, q: number) => (
            <rect key={"t" + q} className="stp-pop" x={264 + (q % 15) * 17} y={y0 + 8 + Math.floor(q / 15) * 24} width={13} height={18} rx={3}
              fill={tint(CONTENT.hundred, 0.7)} stroke={CONTENT.hundred} strokeWidth={1.5} />
          ))}
        </g>
      );
    }
    let told: any = null;
    if (S.told !== null && S.told !== undefined) {
      const s = tellIn(S.told, lang), num = indian(S.told);
      let size = T.label, lines = stpWrap(s, T.label, 500, 500);
      if (pic && lines.length > 1) { size = T.micro; lines = stpWrap(s, T.micro, 500, 500).slice(0, 1); }
      const top = pic ? y0 + 122 : lines.length > 1 ? y0 + 50 : y0 + 72;
      told = (
        <g data-role="reading">
          {lines.map((ln: string, k: number) => {
            const at = ln.indexOf(num);
            return (
              <text key={"s" + k} className="stp-in" x={8} y={top + k * 44} fontSize={size} fontWeight={500} fill={C.ink}>
                {at < 0 ? ln : [<tspan key="a" fill={C.ink}>{ln.slice(0, at)}</tspan>, <tspan key="b" fontWeight={700} fill={STP_GREEN}>{num}</tspan>, <tspan key="c" fill={C.ink}>{ln.slice(at + num.length)}</tspan>]}
              </text>
            );
          })}
        </g>
      );
    }
    /* a bay filled the other way round: the two ways of reading it, one under the other, neither marked */
    const reads = !pic && !told && S.reads ? (
      <g data-role="reading">
        {S.reads.map((ln: string, k: number) => (
          <text key={"rd" + k} className="stp-in" x={8} y={y0 + 52 + k * 46} fontSize={T.micro} fontWeight={600} fill={C.ink}>{ln}</text>
        ))}
      </g>
    ) : null;
    return <g>{pic}{told}{reads}</g>;
  };

  /* phase 4: the first working on the left; the swap strip on the right, closed until it is tapped */
  const drawSwap = () => {
    const A = { top: stpRightVal(pr, pr.each), mul: stpRightVal(pr, pr.many) };
    const G = STP_GB;
    return (
      <g>
        {drawWorking(STP_GA, A.top, A.mul, S.wa, "A", true)}
        {S.swap ? drawWorking(G, A.mul, A.top, S.wb, "B", true) : (
          <g className={S.tip === "swap" ? "stp-tip" : ""}>
            <rect x={G.x} y={G.y} width={G.w} height={G.h} rx={RAD.panel} fill={tint(C.panel, 0.55)} stroke={C.accent} strokeWidth={3} strokeDasharray="12 9" />
            <g transform={`translate(${G.x + G.w / 2},${G.y + 120})`} fill="none" stroke={C.accent} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round">
              <path d="M -46 -14 H 40 M 22 -30 L 40 -14 L 22 2" />
              <path d="M 46 22 H -40 M -22 6 L -40 22 L -22 38" />
            </g>
            <text x={G.x + G.w / 2} y={G.y + 222} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("swap and check")}</text>
            {stage === "ask" && canAct && <Invite x={G.x + G.w / 2} y={G.y + 124} r={70} C={C} />}
            {canAct && <Hit id="swap" label="Swap and check" x={G.x} y={G.y} w={G.w} h={G.h} onPress={doSwap} />}
          </g>
        )}
        {S.same && (
          <g data-role="reading">
            <rect className="stp-pop" x={0} y={490} width={W.w} height={38} rx={12} fill={C.accent} />
            <text className="stp-in" x={W.w / 2} y={519} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill="#FFFFFF">
              <tspan fontWeight={700}>{tx("Same")}</tspan>{S.told !== null && S.told !== undefined ? <tspan>{"  ·  " + tellIn(S.told, lang)}</tspan> : null}
            </text>
          </g>
        )}
      </g>
    );
  };

  /* the running count: numbers still up in the sentences and come down (phases 1, 2, free), blanks and
     built numbers (phase 3), rows each working opened, in words (phase 4); never a score */
  const drawRuns = () => {
    let chips: any[] | null = null, line: string | null = null;
    if (kind === "bay" || kind === "free") {
      const down = [S.bay.each, S.bay.many].filter(Boolean).length, all = stpToks(pr).length;
      chips = [[String(all - down), "in story"], [String(down), "in bay"]];
    } else if (kind === "row") chips = [["2", "in bay"], [String(rowIds.filter(Boolean).length), "in row"]];
    else if (kind === "build") { const nb = descs.filter((d: any) => S.built[d.id] !== undefined).length; chips = [[String(descs.length - nb), "blank"], [String(nb), "built"]]; }
    else {
      const ra = String(stpRightVal(pr, pr.many)).length, rb = String(stpRightVal(pr, pr.each)).length;
      line = tx("rows:") + " " + wordsIn(ra, lang) + (S.swap ? " " + tx("and") + " " + wordsIn(rb, lang) : "");
    }
    return (
      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        {line && <text x={18} y={-46} fontSize={T.micro} fontWeight={600} fill={C.ink}>{line}</text>}
        {chips && chips.map((ch: any, k: number) => (
          <g key={k}>
            <rect x={10 + k * 158} y={-86} width={150} height={60} rx={14} fill="#FFFFFF" stroke={C.rule} strokeWidth={1.5} />
            <text x={26 + k * 158} y={-45} fontSize={T.label} fontWeight={700} fill={C.ink}>{ch[0]}</text>
            <text x={54 + k * 158} y={-46} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(ch[1])}</text>
          </g>
        ))}
      </g>
    );
  };

  /* the one invite: the next thing to touch */
  const invite = () => {
    if (stage !== "ask" || !canAct || free || S.fly) return null;
    if (kind === "bay" && !(S.bay.each && S.bay.many)) {
      for (const ln of board.lines) for (const it of ln.items) if (it.tok && S.bay.each !== it.tok.id && S.bay.many !== it.tok.id) return pulseBox(it.x - 8, ln.y + 1, 146, 70);
    }
    if (kind === "row" && !whole) {
      const role = !S.row.includes(pr.each) ? "each" : "many", c = posHalf(role);
      return pulseBox(c.x - 73, c.y - 35, 146, 70);
    }
    /* phase 3: the frame invites the tap that lends it the pad */
    if (kind === "build" && S.open && !S.cap) {
      const f = stpFrameBox(tok(S.open).places);
      return pulseBox(f.fx - 8, STP_BAY.y + 32, f.fw + 16, 92);
    }
    return null;
  };

  const ghost = drag.drag && drag.drag.moved && canAct ? drag.drag : null;
  const ghostLabel = ghost ? lab(ghost.payload.id, valIn(S, ghost.payload.id)) : "";

  return (
    <g>
      <style>{STP_CSS}</style>
      {drawRuns()}
      {drawBoard()}
      {kind === "swap" ? drawSwap() : (
        <g>
          {kind === "build" ? drawDigitsBay() : drawBay()}
          {drawRow()}
          {drawStrip()}
          {drawWorking(STP_G1, pair ? pair.top : null, pair ? pair.mul : null, S.wa, "W", false)}
        </g>
      )}
      {invite()}
      {S.fly && (
        <g className="stp-fly" style={{ transform: `translate(${S.fly.x}px, ${S.fly.y}px)` } as any} pointerEvents="none">
          {cardArt(0, 0, S.fly.v !== undefined ? indian(S.fly.v) : lab(S.fly.id, valIn(S, S.fly.id)), { lift: true, built: S.fly.v !== undefined })}
        </g>
      )}
      {ghost && <g pointerEvents="none">{cardArt(ghost.x, ghost.y, ghostLabel, { lift: true })}</g>}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: the multiplication it
   was, and the product under it */
function Thumb({ n, result, C, w, h }: any) {
  const L = (result && result.last) || {};
  const ph = PHASES[(n || 1) - 1];
  const it: any = ph && ph.items ? ph.items[L.item] : null;
  const v = leadNumber(L.value);
  if (v === null || v === undefined || !it) return null;
  const pr = stpProb(it.qid);
  const ids = stpPairIds(pr);
  const a = stpRightVal(pr, ids[0]), b = stpRightVal(pr, ids[1]);
  const rs = stpToks(pr).some((t: any) => t.rs);
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <text x={w / 2} y={h / 2 - 8} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>
        <tspan fill={STP_BLUE}>{indian(a)}</tspan><tspan>{" × "}</tspan><tspan fill={STP_AMBER}>{indian(b)}</tspan>
      </text>
      <text x={w / 2} y={h / 2 + 30} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={STP_GREEN}>{(rs ? "₹" : "") + indian(v)}</text>
    </g>
  );
}

function StoryToProduct(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format: stpFormat, fitHost: () => null }} />
  );
}

export default StoryToProduct;
