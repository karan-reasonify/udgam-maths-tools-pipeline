/* ═══ M2.S4.T6.C20.2D1 · word_problem_workshop · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "word_problem_workshop";
const MEDIA_ID = "M2.S4.T6.C20.2D1";
const TOOL_NAME = "Word Problem Workshop";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["Read it through first. What is the question actually asking for?"];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every problem turned into a sum, and the numbers you turned down are still there to see.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Sentences, tables, described amounts, and a bay for writing your own.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r13+: `lineFor(line, lang, TR)`); the
   English stays what the checks read. NCERT class 4 terms: इकाई दहाई सैकड़ा हज़ार / એકમ દશક શતક હજાર,
   योज्य / ઉમેરણ (addend), हासिल / વદી (carry), इबारती सवाल / શાબ્દિક દાખલો (word problem). The board's
   sentences are translated fragment by fragment around the number cards (each fragment is a key), so
   the cards keep their places. Digits stay digits: the runtime speaks them in the language in use.
   A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Word Problem Workshop": "इबारती सवाल कार्यशाला",
    "Read it through first. What is the question actually asking for?": "पहले पूरा पढ़ो। सवाल असल में क्या पूछ रहा है?",
    "Every problem turned into a sum, and the numbers you turned down are still there to see.": "हर सवाल एक जोड़ बन गया, और जो संख्याएँ तुमने छोड़ीं वे अब भी दिख रही हैं।",
    "Free play. Sentences, tables, described amounts, and a bay for writing your own.": "मुक्त खेल। वाक्य, तालिकाएँ, बताई गई मात्राएँ, और अपनी संख्या बनाने की जगह।",
    "A word problem hides a column sum": "इबारती सवाल में खानों वाला जोड़ छिपा है",
    "Say what you are being asked for before you touch a number.": "किसी संख्या को छूने से पहले बताओ कि क्या पूछा गया है।",
    "Pick the card that says what is asked. Then bring its numbers down to the mat.": "वह कार्ड चुनो जो बताता है कि क्या पूछा है। फिर उसकी संख्याएँ नीचे चार्ट पर लाओ।",
    "Which two amounts does it put together?": "यह किन दो मात्राओं को मिलाता है?",
    "Read only the last sentence. Which numbers does it need?": "सिर्फ़ आखिरी वाक्य पढ़ो। उसे कौन सी संख्याएँ चाहिए?",
    "Say what is being asked, find the amounts being put together, line them up by their right ends and add the columns from the ones.": "बताओ क्या पूछा है, मिलने वाली मात्राएँ ढूँढो, उन्हें दाएँ सिरों से सीध में रखो और इकाई से खाने जोड़ो।",
    "You learned: say what is asked, then line numbers up by their ones.": "तुमने सीखा: बताओ क्या पूछा है, फिर संख्याओं को इकाई से सीध में रखो।",
    "Tickets in all?": "कुल टिकट?",
    "What does your question card say?": "तुम्हारा प्रश्न कार्ड क्या कहता है?",
    "A fair sold 12,480 tickets on Saturday. It sold 9,365 tickets on Sunday. How many tickets were sold over the two days?": "एक मेले में शनिवार को 12,480 टिकट बिके। रविवार को 9,365 टिकट बिके। दो दिनों में कितने टिकट बिके?",
    "Crates in all?": "कुल पेटियाँ?",
    "Check the ones column. Did a ten carry over to the tens?": "इकाई का खाना जाँचो। क्या एक दहाई हासिल बनकर दहाई में गई?",
    "A depot loaded 7,205 crates in the morning. It loaded 6,318 crates in the afternoon. How many crates in all?": "एक डिपो में सुबह 7,205 पेटियाँ लादी गईं। दोपहर में 6,318 पेटियाँ लादी गईं। कुल कितनी पेटियाँ?",
    "Population?": "जनसंख्या?",
    "Add the ones again. What happens when they pass nine?": "इकाई फिर से जोड़ो। नौ से आगे जाने पर क्या होता है?",
    "A village has 4,806 men, and 5,127 women. What is its population?": "एक गाँव में 4,806 पुरुष और 5,127 महिलाएँ हैं। उसकी जनसंख्या कितनी है?",
    "A table is a list of addends": "तालिका योज्यों की एक सूची है",
    "Read the table across. Each row is one addend.": "तालिका को आड़ा पढ़ो। हर पंक्ति एक योज्य है।",
    "Pick what is asked, then tap each row it needs.": "जो पूछा है वह चुनो, फिर हर ज़रूरी पंक्ति पर टैप करो।",
    "How many cards are standing on your mat?": "तुम्हारे चार्ट पर कितने कार्ड हैं?",
    "Count the rows in the table. Then count the rows on your mat.": "तालिका की पंक्तियाँ गिनो। फिर अपने चार्ट की पंक्तियाँ गिनो।",
    "Each row of a table gives one addend, and every row has to come down before the sum is worked.": "तालिका की हर पंक्ति एक योज्य देती है, और जोड़ने से पहले हर पंक्ति नीचे आनी चाहिए।",
    "You learned: each row of a table is one addend. Bring every row down.": "तुमने सीखा: तालिका की हर पंक्ति एक योज्य है। हर पंक्ति नीचे लाओ।",
    "Total saplings?": "कुल पौधे?",
    "How many rows does the table have?": "तालिका में कितनी पंक्तियाँ हैं?",
    "In its first year, a nursery raised 18,240 saplings. It raised 26,175 in the second year, and 30,408 in the third. What is the total?": "पहले वर्ष में एक नर्सरी ने 18,240 पौधे उगाए। दूसरे वर्ष में 26,175, और तीसरे में 30,408। कुल कितने हैं?",
    "Total books?": "कुल किताबें?",
    "Is every row of the table on your mat?": "क्या तालिका की हर पंक्ति तुम्हारे चार्ट पर है?",
    "A table shows books borrowed. April had 2,140, May had 3,265, and June had 1,308. How many books were borrowed in all?": "एक तालिका में ली गई किताबें हैं। अप्रैल में 2,140, मई में 3,265, और जून में 1,308। कुल कितनी किताबें ली गईं?",
    "Total bricks?": "कुल ईंटें?",
    "Did one row stay behind in the table?": "क्या तालिका में कोई पंक्ति पीछे रह गई?",
    "In the first month, a factory made 31,470 bricks. It made 28,065 in the next, and 19,382 in the third. How many bricks over the three months?": "पहले महीने में एक कारखाने ने 31,470 ईंटें बनाईं। अगले में 28,065, और तीसरे में 19,382। तीन महीनों में कितनी ईंटें?",
    "Not every number printed is needed": "छपी हर संख्या की ज़रूरत नहीं होती",
    "One of these numbers has no job here. Which one?": "इनमें से एक संख्या का यहाँ कोई काम नहीं। कौन सी?",
    "Bring down only the numbers it needs. Drag a number with no job into the no job tray.": "सिर्फ़ ज़रूरी संख्याएँ नीचे लाओ। जिस संख्या का कोई काम नहीं, उसे ज़रूरत नहीं वाली ट्रे में खींचो।",
    "Does this number help to answer it?": "क्या यह संख्या उत्तर देने में मदद करती है?",
    "Read one sentence at a time. Does its number answer your question card?": "एक-एक वाक्य पढ़ो। क्या उसकी संख्या तुम्हारे प्रश्न कार्ड का उत्तर देती है?",
    "Work out what is being asked first, take down only the numbers that answer it, and leave the spare one where it is.": "पहले समझो कि क्या पूछा है, सिर्फ़ उत्तर देने वाली संख्याएँ नीचे लाओ, और फालतू संख्या को वहीं छोड़ दो।",
    "You learned: take down only the numbers the question needs.": "तुमने सीखा: सिर्फ़ वही संख्याएँ लो जो सवाल को चाहिए।",
    "How many came in?": "कितने अंदर आए?",
    "What does your question card ask for?": "तुम्हारा प्रश्न कार्ड क्या पूछता है?",
    "A hall seats 5,000 people. One evening, 1,640 adults came in, with 2,185 children. How many people came in?": "एक हॉल में 5,000 लोग बैठ सकते हैं। एक शाम 1,640 बड़े और 2,185 बच्चे अंदर आए। कितने लोग अंदर आए?",
    "How many rode?": "कितनों ने सवारी की?",
    "Which number in the story does not answer the question?": "कहानी की कौन सी संख्या सवाल का उत्तर नहीं देती?",
    "A bus can carry 60 passengers. One day, 3,418 passengers rode in the morning, and 2,796 in the evening. How many travelled that day?": "एक बस में 60 यात्री आ सकते हैं। एक दिन सुबह 3,418 यात्री सवार हुए, और शाम को 2,796। उस दिन कितनों ने सफ़र किया?",
    "What should come first?": "पहले क्या करना चाहिए?",
    "What did that child add that the question never asked for?": "उस बच्चे ने क्या जोड़ा जो सवाल ने पूछा ही नहीं?",
    "Find what is asked": "प्रश्न समझो", "Add more carefully": "ध्यान से जोड़ो", "Start at the left": "बाएँ से शुरू करो", "Round them off": "गोल संख्या बनाओ",
    "A child solved a problem using all three of its printed numbers. The total came out far larger than the answer. What should the child have done first?": "एक बच्चे ने सवाल की तीनों छपी संख्याएँ जोड़कर हल किया। कुल उत्तर से बहुत बड़ा आया। बच्चे को पहले क्या करना चाहिए था?",
    "Sometimes an addend has to be built first": "कभी-कभी योज्य पहले बनाना पड़ता है",
    "That day is described, not printed. Build it first.": "वह दिन छपा नहीं, बताया गया है। पहले उसे बनाओ।",
    "Tap the described amount, and the build bay works it out.": "बताई गई मात्रा पर टैप करो, बनाने की जगह उसे निकाल देगी।",
    "What would you add to the printed one to get the other?": "छपी हुई संख्या में क्या जोड़ोगे ताकि दूसरी मिले?",
    "Start from the printed amount. Add the amount it is more by.": "छपी हुई मात्रा से शुरू करो। जितना ज़्यादा है, उतना जोड़ो।",
    "An amount described as so many more than another has to be built first, and only then can it go into the sum that was asked for.": "जो मात्रा किसी दूसरी से इतनी ज़्यादा बताई गई हो, उसे पहले बनाओ, तभी वह पूछे गए जोड़ में जा सकती है।",
    "You learned: build a described amount first, then add it in.": "तुमने सीखा: बताई गई मात्रा पहले बनाओ, फिर उसे जोड़ो।",
    "People in 2 days?": "2 दिनों में लोग?",
    "Which day is printed and which day is only described?": "कौन सा दिन छपा है और कौन सा सिर्फ़ बताया गया है?",
    "At a health camp on the first day, 9,340 men came, with 1,620 women. On the second day, a thousand more men came, and a hundred more women. How many people came over the two days?": "एक स्वास्थ्य शिविर में पहले दिन 9,340 पुरुष और 1,620 महिलाएँ आईं। दूसरे दिन हज़ार ज़्यादा पुरुष और सौ ज़्यादा महिलाएँ आईं। दो दिनों में कितने लोग आए?",
    "Came in 2 days?": "2 दिनों में आए?",
    "Did you work out the described amount before adding?": "क्या तुमने जोड़ने से पहले बताई गई मात्रा निकाली?",
    "On Friday, a stadium counted 21,345 spectators. On Saturday, a thousand more came than on Friday. How many spectators came in all?": "शुक्रवार को एक स्टेडियम में 21,345 दर्शक गिने गए। शनिवार को शुक्रवार से हज़ार ज़्यादा आए। कुल कितने दर्शक आए?",
    "Books in 3 months?": "3 महीनों में किताबें?",
    "Which month is the March amount built from?": "मार्च की मात्रा किस महीने से बनती है?",
    "A library lent 12,608 books in January. In February it lent a hundred more than that. In March it lent a thousand more than February. How many books were lent over the three months?": "एक पुस्तकालय ने जनवरी में 12,608 किताबें दीं। फ़रवरी में उससे सौ ज़्यादा दीं। मार्च में फ़रवरी से हज़ार ज़्यादा दीं। तीन महीनों में कितनी किताबें दी गईं?",
    /* the working area's spoken nudges */
    "First pick the card that says what is asked.": "पहले वह कार्ड चुनो जो बताता है कि क्या पूछा है।",
    "Now tap each row it needs.": "अब हर ज़रूरी पंक्ति पर टैप करो।",
    "Bring down only the numbers it needs.": "सिर्फ़ ज़रूरी संख्याएँ नीचे लाओ।",
    "Drag a number with no job into the no job tray.": "जिस संख्या का कोई काम नहीं, उसे ज़रूरत नहीं वाली ट्रे में खींचो।",
    "Tap the described amount to build it in the bay.": "बताई गई मात्रा पर टैप करो, वह बनाने की जगह में बनेगी।",
    "Now bring its numbers down to the mat.": "अब उसकी संख्याएँ नीचे चार्ट पर लाओ।",
    "Read the last line again. Does it ask that?": "आखिरी वाक्य फिर से पढ़ो। क्या वह यही पूछता है?",
    "Add the columns from the ones. Then type the total.": "इकाई से खाने जोड़ो। फिर कुल लिखो।",
    "Drag a number into the bay first.": "पहले एक संख्या बनाने की जगह में खींचो।",
    "The bay line is full. Play again for a fresh one.": "बनी संख्याओं की पंक्ति भर गई। नई के लिए फिर से खेलो।",
    /* the answer sentences ({n} is the total, with its commas) */
    "{n} tickets were sold over the two days.": "दो दिनों में {n} टिकट बिके।",
    "{n} crates were loaded in all.": "कुल {n} पेटियाँ लादी गईं।",
    "The village has {n} people.": "गाँव में {n} लोग हैं।",
    "{n} saplings were raised in the three years.": "तीन वर्षों में {n} पौधे उगाए गए।",
    "{n} books were borrowed in the three months.": "तीन महीनों में {n} किताबें ली गईं।",
    "{n} bricks were made in the three months.": "तीन महीनों में {n} ईंटें बनीं।",
    "{n} people came in that evening.": "उस शाम {n} लोग अंदर आए।",
    "{n} passengers travelled that day.": "उस दिन {n} यात्रियों ने सफ़र किया।",
    "Leaving the seats out, {n} people came in.": "सीटें छोड़कर, {n} लोग अंदर आए।",
    "{n} people came over the two days.": "दो दिनों में {n} लोग आए।",
    "{n} spectators came in all.": "कुल {n} दर्शक आए।",
    "{n} books were lent over the three months.": "तीन महीनों में {n} किताबें दी गईं।",
    /* the board: sentence fragments, described amounts, questions, tables */
    "A fair sold": "एक मेले में", "tickets on Saturday": "टिकट शनिवार को बिके", "and": "और", "tickets on Sunday.": "टिकट रविवार को बिके।",
    "A depot loaded": "एक डिपो में", "crates in the morning": "पेटियाँ सुबह लादी गईं", "crates in the afternoon.": "पेटियाँ दोपहर में लादी गईं।",
    "A village has": "एक गाँव में", "men and": "पुरुष और", "women.": "महिलाएँ।",
    "A hall seats": "एक हॉल में", "people.": "लोग बैठ सकते हैं।", "One evening,": "एक शाम,", "adults and": "बड़े और", "children came in.": "बच्चे अंदर आए।",
    "A bus can carry": "एक बस में", "passengers.": "यात्री आ सकते हैं।", "rode in the morning and": "सुबह सवार हुए और", "in the evening.": "शाम को।",
    "Day 1:": "पहला दिन:", "women came.": "महिलाएँ आईं।", "Day 2:": "दूसरा दिन:",
    "A stadium counted": "एक स्टेडियम में", "spectators on Friday.": "दर्शक शुक्रवार को गिने गए।", "On Saturday,": "शनिवार को,", "came.": "आए।",
    "A library lent": "एक पुस्तकालय ने", "books in January.": "किताबें जनवरी में दीं।", "In February it lent": "फ़रवरी में उसने", "In March it lent": "मार्च में उसने", ".": "दीं।",
    "a thousand more": "हज़ार ज़्यादा", "a hundred more": "सौ ज़्यादा", "a thousand more than Friday": "शुक्रवार से हज़ार ज़्यादा",
    "a hundred more than that": "उससे सौ ज़्यादा", "a thousand more than February": "फ़रवरी से हज़ार ज़्यादा",
    "A zoo had": "एक चिड़ियाघर में", "visitors in May and": "लोग मई में आए और", "in June.": "जून में।", "It had": "उसमें", "in July and": "जुलाई में और",
    "in August.": "अगस्त में आए।", "Built in the bay:": "बनाई गई:",
    "How many tickets were sold over the two days?": "दो दिनों में कितने टिकट बिके?", "How many crates in all?": "कुल कितनी पेटियाँ?",
    "What is its population?": "उसकी जनसंख्या कितनी है?", "What is the total?": "कुल कितना है?",
    "How many books were borrowed in all?": "कुल कितनी किताबें ली गईं?", "How many bricks over the three months?": "तीन महीनों में कितनी ईंटें?",
    "How many people came in?": "कितने लोग अंदर आए?", "How many travelled that day?": "उस दिन कितनों ने सफ़र किया?",
    "How many people came over the two days?": "दो दिनों में कितने लोग आए?", "How many spectators came in all?": "कुल कितने दर्शक आए?",
    "How many books were lent over the three months?": "तीन महीनों में कितनी किताबें दी गईं?",
    "A nursery raised saplings.": "एक नर्सरी ने पौधे उगाए।", "Books borrowed each month.": "हर महीने ली गई किताबें।", "Bricks made by a factory.": "एक कारखाने में बनी ईंटें।",
    "Year": "वर्ष", "Saplings": "पौधे", "Month": "महीना", "Books": "किताबें", "Bricks": "ईंटें",
    "Both days together": "दोनों दिन मिलाकर", "How many more?": "कितने ज़्यादा?", "Sunday only": "सिर्फ़ रविवार", "Morning only": "सिर्फ़ सुबह",
    "All the crates": "सारी पेटियाँ", "The men only": "सिर्फ़ पुरुष", "All the people": "सारे लोग", "First two years": "पहले दो वर्ष",
    "The third year": "तीसरा वर्ष", "All three years": "तीनों वर्ष", "All three months": "तीनों महीने", "April and May": "अप्रैल और मई",
    "June only": "सिर्फ़ जून", "The biggest month": "सबसे बड़ा महीना", "First two months": "पहले दो महीने", "Seats in the hall": "हॉल की सीटें",
    "Empty seats": "खाली सीटें", "People who came in": "अंदर आए लोग", "Travelled that day": "उस दिन के यात्री", "Seats on the bus": "बस की सीटें",
    "Second day only": "सिर्फ़ दूसरा दिन", "Saturday only": "सिर्फ़ शनिवार", "March only": "सिर्फ़ मार्च",
    "Saturday": "शनिवार", "Sunday": "रविवार", "morning": "सुबह", "afternoon": "दोपहर", "men": "पुरुष", "women": "महिलाएँ",
    "Year 1": "वर्ष 1", "Year 2": "वर्ष 2", "Year 3": "वर्ष 3", "April": "अप्रैल", "May": "मई", "June": "जून",
    "Month 1": "महीना 1", "Month 2": "महीना 2", "Month 3": "महीना 3", "seats": "सीटें", "adults": "बड़े", "children": "बच्चे", "evening": "शाम",
    "Friday": "शुक्रवार", "January": "जनवरी", "February": "फ़रवरी", "March": "मार्च", "July": "जुलाई", "August": "अगस्त", "built": "बनी",
    /* the working area's own words */
    "L": "ला", "TTh": "द.ह.", "Th": "ह", "H": "सै", "T": "द", "O": "इ",
    "no job": "ज़रूरत नहीं", "build bay": "बनाने की जगह", "more": "ज़्यादा", "What is asked?": "क्या पूछा है?",
    "what is asked": "क्या पूछा है",
    /* a chosen answer shows in the slot by its id (r20 runs it through TR) */
    "find": "प्रश्न समझो", "carefully": "ध्यान से जोड़ो", "left": "बाएँ से शुरू", "round": "गोल संख्या",
  },
  gu: {
    "Word Problem Workshop": "શાબ્દિક દાખલાની કાર્યશાળા",
    "Read it through first. What is the question actually asking for?": "પહેલાં આખું વાંચો. પ્રશ્ન ખરેખર શું પૂછે છે?",
    "Every problem turned into a sum, and the numbers you turned down are still there to see.": "દરેક દાખલો એક સરવાળો બન્યો, અને તમે છોડેલી સંખ્યાઓ હજી દેખાય છે.",
    "Free play. Sentences, tables, described amounts, and a bay for writing your own.": "મુક્ત રમત. વાક્યો, કોષ્ટકો, વર્ણવેલી રકમો, અને પોતાની સંખ્યા બનાવવાની જગ્યા.",
    "A word problem hides a column sum": "શાબ્દિક દાખલામાં ખાનાંવાળો સરવાળો છુપાયો છે",
    "Say what you are being asked for before you touch a number.": "કોઈ સંખ્યાને અડતાં પહેલાં કહો કે શું પૂછ્યું છે.",
    "Pick the card that says what is asked. Then bring its numbers down to the mat.": "જે કાર્ડ કહે કે શું પૂછ્યું છે તે પસંદ કરો. પછી તેની સંખ્યાઓ નીચે ચાર્ટ પર લાવો.",
    "Which two amounts does it put together?": "તે કઈ બે રકમોને ભેગી કરે છે?",
    "Read only the last sentence. Which numbers does it need?": "ફક્ત છેલ્લું વાક્ય વાંચો. તેને કઈ સંખ્યાઓ જોઈએ?",
    "Say what is being asked, find the amounts being put together, line them up by their right ends and add the columns from the ones.": "કહો શું પૂછ્યું છે, ભેગી થતી રકમો શોધો, તેમને જમણા છેડેથી ગોઠવો અને એકમથી ખાનાં ઉમેરો.",
    "You learned: say what is asked, then line numbers up by their ones.": "તમે શીખ્યા: કહો શું પૂછ્યું છે, પછી સંખ્યાઓ એકમથી ગોઠવો.",
    "Tickets in all?": "કુલ ટિકિટ?",
    "What does your question card say?": "તમારું પ્રશ્ન કાર્ડ શું કહે છે?",
    "A fair sold 12,480 tickets on Saturday. It sold 9,365 tickets on Sunday. How many tickets were sold over the two days?": "એક મેળામાં શનિવારે 12,480 ટિકિટ વેચાઈ. રવિવારે 9,365 ટિકિટ વેચાઈ. બે દિવસમાં કેટલી ટિકિટ વેચાઈ?",
    "Crates in all?": "કુલ પેટીઓ?",
    "Check the ones column. Did a ten carry over to the tens?": "એકમનું ખાનું તપાસો. શું એક દશક વદી બનીને દશકમાં ગયો?",
    "A depot loaded 7,205 crates in the morning. It loaded 6,318 crates in the afternoon. How many crates in all?": "એક ડેપોમાં સવારે 7,205 પેટીઓ ભરાઈ. બપોરે 6,318 પેટીઓ ભરાઈ. કુલ કેટલી પેટીઓ?",
    "Population?": "વસ્તી?",
    "Add the ones again. What happens when they pass nine?": "એકમ ફરી ઉમેરો. નવથી આગળ જાય ત્યારે શું થાય છે?",
    "A village has 4,806 men, and 5,127 women. What is its population?": "એક ગામમાં 4,806 પુરુષો અને 5,127 સ્ત્રીઓ છે. તેની વસ્તી કેટલી છે?",
    "A table is a list of addends": "કોષ્ટક ઉમેરણોની એક યાદી છે",
    "Read the table across. Each row is one addend.": "કોષ્ટક આડું વાંચો. દરેક હરોળ એક ઉમેરણ છે.",
    "Pick what is asked, then tap each row it needs.": "જે પૂછ્યું છે તે પસંદ કરો, પછી દરેક જરૂરી હરોળ પર ટેપ કરો.",
    "How many cards are standing on your mat?": "તમારા ચાર્ટ પર કેટલાં કાર્ડ છે?",
    "Count the rows in the table. Then count the rows on your mat.": "કોષ્ટકની હરોળ ગણો. પછી તમારા ચાર્ટની હરોળ ગણો.",
    "Each row of a table gives one addend, and every row has to come down before the sum is worked.": "કોષ્ટકની દરેક હરોળ એક ઉમેરણ આપે છે, અને સરવાળા પહેલાં દરેક હરોળ નીચે આવવી જોઈએ.",
    "You learned: each row of a table is one addend. Bring every row down.": "તમે શીખ્યા: કોષ્ટકની દરેક હરોળ એક ઉમેરણ છે. દરેક હરોળ નીચે લાવો.",
    "Total saplings?": "કુલ રોપા?",
    "How many rows does the table have?": "કોષ્ટકમાં કેટલી હરોળ છે?",
    "In its first year, a nursery raised 18,240 saplings. It raised 26,175 in the second year, and 30,408 in the third. What is the total?": "પહેલા વર્ષે એક નર્સરીએ 18,240 રોપા ઉછેર્યા. બીજા વર્ષે 26,175, અને ત્રીજામાં 30,408. કુલ કેટલા છે?",
    "Total books?": "કુલ પુસ્તકો?",
    "Is every row of the table on your mat?": "શું કોષ્ટકની દરેક હરોળ તમારા ચાર્ટ પર છે?",
    "A table shows books borrowed. April had 2,140, May had 3,265, and June had 1,308. How many books were borrowed in all?": "એક કોષ્ટકમાં લીધેલાં પુસ્તકો છે. એપ્રિલમાં 2,140, મેમાં 3,265, અને જૂનમાં 1,308. કુલ કેટલાં પુસ્તકો લેવાયાં?",
    "Total bricks?": "કુલ ઈંટો?",
    "Did one row stay behind in the table?": "શું કોષ્ટકમાં કોઈ હરોળ પાછળ રહી ગઈ?",
    "In the first month, a factory made 31,470 bricks. It made 28,065 in the next, and 19,382 in the third. How many bricks over the three months?": "પહેલા મહિને એક કારખાનાએ 31,470 ઈંટો બનાવી. પછીના મહિને 28,065, અને ત્રીજામાં 19,382. ત્રણ મહિનામાં કેટલી ઈંટો?",
    "Not every number printed is needed": "છાપેલી દરેક સંખ્યાની જરૂર નથી હોતી",
    "One of these numbers has no job here. Which one?": "આમાંથી એક સંખ્યાનું અહીં કોઈ કામ નથી. કઈ?",
    "Bring down only the numbers it needs. Drag a number with no job into the no job tray.": "ફક્ત જરૂરી સંખ્યાઓ નીચે લાવો. જે સંખ્યાનું કોઈ કામ નથી, તેને જરૂર નથી વાળી ટ્રેમાં ખેંચો.",
    "Does this number help to answer it?": "શું આ સંખ્યા જવાબ આપવામાં મદદ કરે છે?",
    "Read one sentence at a time. Does its number answer your question card?": "એક પછી એક વાક્ય વાંચો. શું તેની સંખ્યા તમારા પ્રશ્ન કાર્ડનો જવાબ આપે છે?",
    "Work out what is being asked first, take down only the numbers that answer it, and leave the spare one where it is.": "પહેલાં સમજો કે શું પૂછ્યું છે, ફક્ત જવાબ આપતી સંખ્યાઓ નીચે લાવો, અને વધારાની સંખ્યા ત્યાં જ રહેવા દો.",
    "You learned: take down only the numbers the question needs.": "તમે શીખ્યા: ફક્ત એ જ સંખ્યાઓ લો જે પ્રશ્નને જોઈએ.",
    "How many came in?": "કેટલા અંદર આવ્યા?",
    "What does your question card ask for?": "તમારું પ્રશ્ન કાર્ડ શું પૂછે છે?",
    "A hall seats 5,000 people. One evening, 1,640 adults came in, with 2,185 children. How many people came in?": "એક હોલમાં 5,000 લોકો બેસી શકે છે. એક સાંજે 1,640 મોટા અને 2,185 બાળકો અંદર આવ્યાં. કેટલા લોકો અંદર આવ્યા?",
    "How many rode?": "કેટલાએ સવારી કરી?",
    "Which number in the story does not answer the question?": "વાર્તાની કઈ સંખ્યા પ્રશ્નનો જવાબ નથી આપતી?",
    "A bus can carry 60 passengers. One day, 3,418 passengers rode in the morning, and 2,796 in the evening. How many travelled that day?": "એક બસમાં 60 મુસાફરો બેસી શકે છે. એક દિવસે સવારે 3,418 મુસાફરો બેઠા, અને સાંજે 2,796. તે દિવસે કેટલાએ મુસાફરી કરી?",
    "What should come first?": "પહેલાં શું કરવું જોઈએ?",
    "What did that child add that the question never asked for?": "તે બાળકે શું ઉમેર્યું જે પ્રશ્ને પૂછ્યું જ નહોતું?",
    "Find what is asked": "પ્રશ્ન સમજો", "Add more carefully": "ધ્યાનથી ઉમેરો", "Start at the left": "ડાબેથી શરૂ કરો", "Round them off": "ગોળ સંખ્યા કરો",
    "A child solved a problem using all three of its printed numbers. The total came out far larger than the answer. What should the child have done first?": "એક બાળકે દાખલાની ત્રણેય છાપેલી સંખ્યાઓ વાપરીને ઉકેલ્યો. સરવાળો જવાબ કરતાં ઘણો મોટો આવ્યો. બાળકે પહેલાં શું કરવું જોઈતું હતું?",
    "Sometimes an addend has to be built first": "ક્યારેક ઉમેરણ પહેલાં બનાવવું પડે છે",
    "That day is described, not printed. Build it first.": "એ દિવસ છાપેલો નથી, વર્ણવેલો છે. પહેલાં તેને બનાવો.",
    "Tap the described amount, and the build bay works it out.": "વર્ણવેલી રકમ પર ટેપ કરો, બનાવવાની જગ્યા તેને શોધી આપશે.",
    "What would you add to the printed one to get the other?": "છાપેલી સંખ્યામાં શું ઉમેરશો જેથી બીજી મળે?",
    "Start from the printed amount. Add the amount it is more by.": "છાપેલી રકમથી શરૂ કરો. જેટલી વધુ છે, તેટલી ઉમેરો.",
    "An amount described as so many more than another has to be built first, and only then can it go into the sum that was asked for.": "જે રકમ બીજી કરતાં આટલી વધુ કહેવાઈ હોય, તેને પહેલાં બનાવો, પછી જ તે પૂછેલા સરવાળામાં જઈ શકે.",
    "You learned: build a described amount first, then add it in.": "તમે શીખ્યા: વર્ણવેલી રકમ પહેલાં બનાવો, પછી તેને ઉમેરો.",
    "People in 2 days?": "2 દિવસમાં લોકો?",
    "Which day is printed and which day is only described?": "કયો દિવસ છાપેલો છે અને કયો ફક્ત વર્ણવેલો છે?",
    "At a health camp on the first day, 9,340 men came, with 1,620 women. On the second day, a thousand more men came, and a hundred more women. How many people came over the two days?": "એક આરોગ્ય શિબિરમાં પહેલા દિવસે 9,340 પુરુષો અને 1,620 સ્ત્રીઓ આવી. બીજા દિવસે હજાર વધુ પુરુષો અને સો વધુ સ્ત્રીઓ આવી. બે દિવસમાં કેટલા લોકો આવ્યા?",
    "Came in 2 days?": "2 દિવસમાં આવ્યા?",
    "Did you work out the described amount before adding?": "શું તમે ઉમેરતાં પહેલાં વર્ણવેલી રકમ શોધી?",
    "On Friday, a stadium counted 21,345 spectators. On Saturday, a thousand more came than on Friday. How many spectators came in all?": "શુક્રવારે એક સ્ટેડિયમમાં 21,345 પ્રેક્ષકો ગણાયા. શનિવારે શુક્રવાર કરતાં હજાર વધુ આવ્યા. કુલ કેટલા પ્રેક્ષકો આવ્યા?",
    "Books in 3 months?": "3 મહિનામાં પુસ્તકો?",
    "Which month is the March amount built from?": "માર્ચની રકમ કયા મહિનાથી બને છે?",
    "A library lent 12,608 books in January. In February it lent a hundred more than that. In March it lent a thousand more than February. How many books were lent over the three months?": "એક પુસ્તકાલયે જાન્યુઆરીમાં 12,608 પુસ્તકો આપ્યાં. ફેબ્રુઆરીમાં તેના કરતાં સો વધુ આપ્યાં. માર્ચમાં ફેબ્રુઆરી કરતાં હજાર વધુ આપ્યાં. ત્રણ મહિનામાં કેટલાં પુસ્તકો અપાયાં?",
    /* the working area's spoken nudges */
    "First pick the card that says what is asked.": "પહેલાં એ કાર્ડ પસંદ કરો જે કહે કે શું પૂછ્યું છે.",
    "Now tap each row it needs.": "હવે દરેક જરૂરી હરોળ પર ટેપ કરો.",
    "Bring down only the numbers it needs.": "ફક્ત જરૂરી સંખ્યાઓ નીચે લાવો.",
    "Drag a number with no job into the no job tray.": "જે સંખ્યાનું કોઈ કામ નથી, તેને જરૂર નથી વાળી ટ્રેમાં ખેંચો.",
    "Tap the described amount to build it in the bay.": "વર્ણવેલી રકમ પર ટેપ કરો, તે બનાવવાની જગ્યામાં બનશે.",
    "Now bring its numbers down to the mat.": "હવે તેની સંખ્યાઓ નીચે ચાર્ટ પર લાવો.",
    "Read the last line again. Does it ask that?": "છેલ્લું વાક્ય ફરી વાંચો. શું તે આ જ પૂછે છે?",
    "Add the columns from the ones. Then type the total.": "એકમથી ખાનાં ઉમેરો. પછી કુલ લખો.",
    "Drag a number into the bay first.": "પહેલાં એક સંખ્યા બનાવવાની જગ્યામાં ખેંચો.",
    "The bay line is full. Play again for a fresh one.": "બનાવેલી સંખ્યાઓની લીટી ભરાઈ ગઈ. નવી માટે ફરી રમો.",
    /* the answer sentences ({n} is the total, with its commas) */
    "{n} tickets were sold over the two days.": "બે દિવસમાં {n} ટિકિટ વેચાઈ.",
    "{n} crates were loaded in all.": "કુલ {n} પેટીઓ ભરાઈ.",
    "The village has {n} people.": "ગામમાં {n} લોકો છે.",
    "{n} saplings were raised in the three years.": "ત્રણ વર્ષમાં {n} રોપા ઉછેર્યા.",
    "{n} books were borrowed in the three months.": "ત્રણ મહિનામાં {n} પુસ્તકો લેવાયાં.",
    "{n} bricks were made in the three months.": "ત્રણ મહિનામાં {n} ઈંટો બની.",
    "{n} people came in that evening.": "તે સાંજે {n} લોકો અંદર આવ્યા.",
    "{n} passengers travelled that day.": "તે દિવસે {n} મુસાફરોએ મુસાફરી કરી.",
    "Leaving the seats out, {n} people came in.": "બેઠકો છોડીને, {n} લોકો અંદર આવ્યા.",
    "{n} people came over the two days.": "બે દિવસમાં {n} લોકો આવ્યા.",
    "{n} spectators came in all.": "કુલ {n} પ્રેક્ષકો આવ્યા.",
    "{n} books were lent over the three months.": "ત્રણ મહિનામાં {n} પુસ્તકો અપાયાં.",
    /* the board: sentence fragments, described amounts, questions, tables */
    "A fair sold": "એક મેળામાં", "tickets on Saturday": "ટિકિટ શનિવારે વેચાઈ", "and": "અને", "tickets on Sunday.": "ટિકિટ રવિવારે વેચાઈ.",
    "A depot loaded": "એક ડેપોમાં", "crates in the morning": "પેટીઓ સવારે ભરાઈ", "crates in the afternoon.": "પેટીઓ બપોરે ભરાઈ.",
    "A village has": "એક ગામમાં", "men and": "પુરુષો અને", "women.": "સ્ત્રીઓ.",
    "A hall seats": "એક હોલમાં", "people.": "લોકો બેસી શકે છે.", "One evening,": "એક સાંજે,", "adults and": "મોટા અને", "children came in.": "બાળકો અંદર આવ્યાં.",
    "A bus can carry": "એક બસમાં", "passengers.": "મુસાફરો બેસી શકે છે.", "rode in the morning and": "સવારે બેઠા અને", "in the evening.": "સાંજે.",
    "Day 1:": "પહેલો દિવસ:", "women came.": "સ્ત્રીઓ આવી.", "Day 2:": "બીજો દિવસ:",
    "A stadium counted": "એક સ્ટેડિયમમાં", "spectators on Friday.": "પ્રેક્ષકો શુક્રવારે ગણાયા.", "On Saturday,": "શનિવારે,", "came.": "આવ્યા.",
    "A library lent": "એક પુસ્તકાલયે", "books in January.": "પુસ્તકો જાન્યુઆરીમાં આપ્યાં.", "In February it lent": "ફેબ્રુઆરીમાં તેણે", "In March it lent": "માર્ચમાં તેણે", ".": "આપ્યાં.",
    "a thousand more": "હજાર વધુ", "a hundred more": "સો વધુ", "a thousand more than Friday": "શુક્રવાર કરતાં હજાર વધુ",
    "a hundred more than that": "તેના કરતાં સો વધુ", "a thousand more than February": "ફેબ્રુઆરી કરતાં હજાર વધુ",
    "A zoo had": "એક પ્રાણીસંગ્રહાલયમાં", "visitors in May and": "લોકો મેમાં આવ્યા અને", "in June.": "જૂનમાં.", "It had": "તેમાં", "in July and": "જુલાઈમાં અને",
    "in August.": "ઑગસ્ટમાં આવ્યા.", "Built in the bay:": "બનાવેલી:",
    "How many tickets were sold over the two days?": "બે દિવસમાં કેટલી ટિકિટ વેચાઈ?", "How many crates in all?": "કુલ કેટલી પેટીઓ?",
    "What is its population?": "તેની વસ્તી કેટલી છે?", "What is the total?": "કુલ કેટલા છે?",
    "How many books were borrowed in all?": "કુલ કેટલાં પુસ્તકો લેવાયાં?", "How many bricks over the three months?": "ત્રણ મહિનામાં કેટલી ઈંટો?",
    "How many people came in?": "કેટલા લોકો અંદર આવ્યા?", "How many travelled that day?": "તે દિવસે કેટલાએ મુસાફરી કરી?",
    "How many people came over the two days?": "બે દિવસમાં કેટલા લોકો આવ્યા?", "How many spectators came in all?": "કુલ કેટલા પ્રેક્ષકો આવ્યા?",
    "How many books were lent over the three months?": "ત્રણ મહિનામાં કેટલાં પુસ્તકો અપાયાં?",
    "A nursery raised saplings.": "એક નર્સરીએ રોપા ઉછેર્યા.", "Books borrowed each month.": "દર મહિને લીધેલાં પુસ્તકો.", "Bricks made by a factory.": "એક કારખાનામાં બનેલી ઈંટો.",
    "Year": "વર્ષ", "Saplings": "રોપા", "Month": "મહિનો", "Books": "પુસ્તકો", "Bricks": "ઈંટો",
    "Both days together": "બંને દિવસ મળીને", "How many more?": "કેટલા વધુ?", "Sunday only": "ફક્ત રવિવાર", "Morning only": "ફક્ત સવાર",
    "All the crates": "બધી પેટીઓ", "The men only": "ફક્ત પુરુષો", "All the people": "બધા લોકો", "First two years": "પહેલાં બે વર્ષ",
    "The third year": "ત્રીજું વર્ષ", "All three years": "ત્રણેય વર્ષ", "All three months": "ત્રણેય મહિના", "April and May": "એપ્રિલ અને મે",
    "June only": "ફક્ત જૂન", "The biggest month": "સૌથી મોટો મહિનો", "First two months": "પહેલા બે મહિના", "Seats in the hall": "હોલની બેઠકો",
    "Empty seats": "ખાલી બેઠકો", "People who came in": "અંદર આવેલા લોકો", "Travelled that day": "તે દિવસના મુસાફરો", "Seats on the bus": "બસની બેઠકો",
    "Second day only": "ફક્ત બીજો દિવસ", "Saturday only": "ફક્ત શનિવાર", "March only": "ફક્ત માર્ચ",
    "Saturday": "શનિવાર", "Sunday": "રવિવાર", "morning": "સવાર", "afternoon": "બપોર", "men": "પુરુષો", "women": "સ્ત્રીઓ",
    "Year 1": "વર્ષ 1", "Year 2": "વર્ષ 2", "Year 3": "વર્ષ 3", "April": "એપ્રિલ", "May": "મે", "June": "જૂન",
    "Month 1": "મહિનો 1", "Month 2": "મહિનો 2", "Month 3": "મહિનો 3", "seats": "બેઠકો", "adults": "મોટા", "children": "બાળકો", "evening": "સાંજ",
    "Friday": "શુક્રવાર", "January": "જાન્યુઆરી", "February": "ફેબ્રુઆરી", "March": "માર્ચ", "July": "જુલાઈ", "August": "ઑગસ્ટ", "built": "બનાવેલી",
    /* the working area's own words */
    "L": "લા", "TTh": "દ.હ.", "Th": "હ", "H": "શ", "T": "દ", "O": "એ",
    "no job": "જરૂર નથી", "build bay": "બનાવવાની જગ્યા", "more": "વધુ", "What is asked?": "શું પૂછ્યું છે?",
    "what is asked": "શું પૂછ્યું છે",
    /* a chosen answer shows in the slot by its id (r20 runs it through TR) */
    "find": "પ્રશ્ન સમજો", "carefully": "ધ્યાનથી ઉમેરો", "left": "ડાબેથી શરૂ", "round": "ગોળ સંખ્યા",
  },
};

/* ── the problems ──────────────────────────────────────────────────────────────────────────
   Each item's board: sentence lines (words and number cards) or a table, the question line, three
   question cards (one says what is asked), the numbers the sum needs (in order), the spare number
   with no job (phase 3), described amounts built in the bay (phase 4), and the answer sentence.
   A described amount is built from the card it names: `from` + `more`. */
const wpNum = (id: string, v: number, tag: string) => ({ t: "num", id, v, tag });
const wpDesc = (id: string, text: string, from: string, more: number, tag: string) => ({ t: "desc", id, text, from, more, tag });

const WP_PROBS: Record<string, any> = {
  "M2.S4.T6.C20:ML1": {
    lines: [["A fair sold", wpNum("sat", 12480, "Saturday"), "tickets on Saturday"], ["and", wpNum("sun", 9365, "Sunday"), "tickets on Sunday."]],
    q: "How many tickets were sold over the two days?",
    cards: [["both", "Both days together"], ["more", "How many more?"], ["sun", "Sunday only"]], right: "both",
    need: ["sat", "sun"], tell: "{n} tickets were sold over the two days.",
  },
  "M2.S4.T6.C20:1": {
    lines: [["A depot loaded", wpNum("mor", 7205, "morning"), "crates in the morning"], ["and", wpNum("aft", 6318, "afternoon"), "crates in the afternoon."]],
    q: "How many crates in all?",
    cards: [["mor", "Morning only"], ["all", "All the crates"], ["more", "How many more?"]], right: "all",
    need: ["mor", "aft"], tell: "{n} crates were loaded in all.",
  },
  "M2.S4.T6.C20:2": {
    lines: [["A village has", wpNum("men", 4806, "men"), "men and", wpNum("wom", 5127, "women"), "women."]],
    q: "What is its population?",
    cards: [["men", "The men only"], ["more", "How many more?"], ["all", "All the people"]], right: "all",
    need: ["men", "wom"], tell: "The village has {n} people.",
  },
  "M2.S4.T6.C21:ML2": {
    table: { head: ["Year", "Saplings"], rows: [wpNum("y1", 18240, "Year 1"), wpNum("y2", 26175, "Year 2"), wpNum("y3", 30408, "Year 3")] },
    context: "A nursery raised saplings.", q: "What is the total?",
    cards: [["two", "First two years"], ["y3", "The third year"], ["all", "All three years"]], right: "all",
    need: ["y1", "y2", "y3"], tell: "{n} saplings were raised in the three years.",
  },
  "M2.S4.T6.C21:3": {
    table: { head: ["Month", "Books"], rows: [wpNum("apr", 2140, "April"), wpNum("may", 3265, "May"), wpNum("jun", 1308, "June")] },
    context: "Books borrowed each month.", q: "How many books were borrowed in all?",
    cards: [["all", "All three months"], ["two", "April and May"], ["jun", "June only"]], right: "all",
    need: ["apr", "may", "jun"], tell: "{n} books were borrowed in the three months.",
  },
  "M2.S4.T6.C21:4": {
    table: { head: ["Month", "Bricks"], rows: [wpNum("m1", 31470, "Month 1"), wpNum("m2", 28065, "Month 2"), wpNum("m3", 19382, "Month 3")] },
    context: "Bricks made by a factory.", q: "How many bricks over the three months?",
    cards: [["big", "The biggest month"], ["all", "All three months"], ["two", "First two months"]], right: "all",
    need: ["m1", "m2", "m3"], tell: "{n} bricks were made in the three months.",
  },
  "M2.S4.T6.C22:ML3": {
    lines: [["A hall seats", wpNum("cap", 5000, "seats"), "people."], ["One evening,", wpNum("adu", 1640, "adults"), "adults and", wpNum("chi", 2185, "children"), "children came in."]],
    q: "How many people came in?",
    cards: [["cap", "Seats in the hall"], ["empty", "Empty seats"], ["came", "People who came in"]], right: "came",
    spare: "cap", need: ["adu", "chi"], tell: "{n} people came in that evening.",
  },
  "M2.S4.T6.C22:5": {
    lines: [["A bus can carry", wpNum("cap", 60, "seats"), "passengers."], [wpNum("mor", 3418, "morning"), "rode in the morning and", wpNum("eve", 2796, "evening"), "in the evening."]],
    q: "How many travelled that day?",
    cards: [["day", "Travelled that day"], ["cap", "Seats on the bus"], ["more", "How many more?"]], right: "day",
    spare: "cap", need: ["mor", "eve"], tell: "{n} passengers travelled that day.",
  },
  /* the hall again, worked by a child who used all three printed numbers */
  "M2.S4.T6.C22:6": { same: "M2.S4.T6.C22:ML3", tell: "Leaving the seats out, {n} people came in." },
  "M2.S4.T6.C23:ML4": {
    lines: [["Day 1:", wpNum("m1", 9340, "men"), "men and", wpNum("w1", 1620, "women"), "women came."],
      ["Day 2:", wpDesc("m2", "a thousand more", "m1", 1000, "men"), "men and", wpDesc("w2", "a hundred more", "w1", 100, "women"), "women."]],
    q: "How many people came over the two days?",
    cards: [["day2", "Second day only"], ["more", "How many more?"], ["both", "Both days together"]], right: "both",
    need: ["m1", "w1", "m2", "w2"], tell: "{n} people came over the two days.",
  },
  "M2.S4.T6.C23:7": {
    lines: [["A stadium counted", wpNum("fri", 21345, "Friday"), "spectators on Friday."], ["On Saturday,", wpDesc("sat", "a thousand more than Friday", "fri", 1000, "Saturday"), "came."]],
    q: "How many spectators came in all?",
    cards: [["both", "Both days together"], ["sat", "Saturday only"], ["more", "How many more?"]], right: "both",
    need: ["fri", "sat"], tell: "{n} spectators came in all.",
  },
  "M2.S4.T6.C23:8": {
    lines: [["A library lent", wpNum("jan", 12608, "January"), "books in January."], ["In February it lent", wpDesc("feb", "a hundred more than that", "jan", 100, "February"), "."],
      ["In March it lent", wpDesc("mar", "a thousand more than February", "feb", 1000, "March"), "."]],
    q: "How many books were lent over the three months?",
    cards: [["mar", "March only"], ["all", "All three months"], ["more", "How many more?"]], right: "all",
    need: ["jan", "feb", "mar"], tell: "{n} books were lent over the three months.",
  },
};
/* free play: a short problem of its own with no question, a mat that adds whatever lands on it, and the
   bay; the cards built there join a third line of the board */
const WP_FREE = { free: true, need: [], lines: [
  ["A zoo had", wpNum("f1", 12480, "May"), "visitors in May and", wpNum("f2", 9365, "June"), "in June."],
  ["It had", wpNum("f3", 26175, "July"), "in July and", wpNum("f4", 3418, "August"), "in August."]] };
const WP_FREE_MAX = 4;   /* cards the bay can add to the board's last line */
const wpProb = (key: string) => {
  if (key === "free") return WP_FREE;
  const p = WP_PROBS[key] || WP_PROBS["M2.S4.T6.C20:ML1"];
  /* a problem worked again by a child keeps its story but gets its own answer sentence (the voice never repeats itself) */
  return p.same ? { ...WP_PROBS[p.same], mistaken: true, ...(p.tell ? { tell: p.tell } : {}) } : p;
};
const wpDescs = (pr: any) => (pr.lines || []).flat().filter((t: any) => t && t.t === "desc");
const wpTell = (pr: any, total: number) => String(pr.tell || "{n}").replace("{n}", indian(total));
/* the answer sentence in the language in use (TR keeps each sentence's template, "{n}" and all) */
const wpTellIn = (pr: any, total: number, lang: string) =>
  String((lang !== "en" && TR[lang] && TR[lang][pr.tell]) || pr.tell || "{n}").replace("{n}", indian(total));

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   items   three a phase, the plan's questions with their ids.
           kind  sum | table | spare | why | build (the Work, judge and oracle switch on it)
           near  the item's misconception (judge rejects it) */
const PHASES = [
  {
    n: 1,
    concept: "A word problem hides a column sum",
    conceptId: "M2.S4.T6.C20", objectiveIds: ["O9"],
    says: ["Say what you are being asked for before you touch a number.", "Pick the card that says what is asked. Then bring its numbers down to the mat."],
    /* tries, as the plan writes it: first rung the item's miss line; second the phase's; third: the question sentence alone with both number cards showing */
    ladder: ["Which two amounts does it put together?", "Read only the last sentence. Which numbers does it need?"],
    closing: "Say what is being asked, find the amounts being put together, line them up by their right ends and add the columns from the ones.",
    learned: "You learned: say what is asked, then line numbers up by their ones.",
    traceback: "The question line lights and the right question card goes up; both numbers come down onto the mat by their right ends (a shorter one slides right, heading by heading, until its last digit stands under O); the columns add from the ones, each carry travelling up over the next column; the answer sentence is written back into the problem.",
    items: [
      /* learn ML1: answer in the plan = 21,845 tickets. near: 9,365 lined up by its left end (12,480 + 93,650) */
      { qid: "M2.S4.T6.C20:ML1", kind: "sum", near: 106130, winMs: 5200, ask: "Tickets in all?", answer: 21845, miss: "What does your question card say?",
        say: "A fair sold 12,480 tickets on Saturday. It sold 9,365 tickets on Sunday. How many tickets were sold over the two days?" },
      /* practice 1: answer in the plan = 13,523 crates. near: the carries left out */
      { qid: "M2.S4.T6.C20:1", kind: "sum", near: 13513, winMs: 5200, ask: "Crates in all?", answer: 13523, miss: "Check the ones column. Did a ten carry over to the tens?",
        say: "A depot loaded 7,205 crates in the morning. It loaded 6,318 crates in the afternoon. How many crates in all?" },
      /* practice 2: answer in the plan = 9,933 people. near: the carry left out */
      { qid: "M2.S4.T6.C20:2", kind: "sum", near: 9923, winMs: 5200, ask: "Population?", answer: 9933, miss: "Add the ones again. What happens when they pass nine?",
        say: "A village has 4,806 men, and 5,127 women. What is its population?" },
    ],
  },
  {
    n: 2,
    concept: "A table is a list of addends",
    conceptId: "M2.S4.T6.C21", objectiveIds: ["O9"],
    says: ["Read the table across. Each row is one addend.", "Pick what is asked, then tap each row it needs."],
    ladder: ["How many cards are standing on your mat?", "Count the rows in the table. Then count the rows on your mat."],
    closing: "Each row of a table gives one addend, and every row has to come down before the sum is worked.",
    learned: "You learned: each row of a table is one addend. Bring every row down.",
    traceback: "The right question card goes up; the rows already down are ruled through on the table while each row still up lights and comes down, label to the margin and amount into the columns; the three addends add from the ones with the carries travelling; the answer sentence is written beside the table.",
    items: [
      /* learn ML2: answer in the plan = 74,823 saplings. near: the third row left behind */
      { qid: "M2.S4.T6.C21:ML2", kind: "table", near: 44415, winMs: 5600, ask: "Total saplings?", answer: 74823, miss: "How many rows does the table have?",
        say: "In its first year, a nursery raised 18,240 saplings. It raised 26,175 in the second year, and 30,408 in the third. What is the total?" },
      /* practice 3: answer in the plan = 6,713 books. near: June left behind */
      { qid: "M2.S4.T6.C21:3", kind: "table", near: 5405, winMs: 5600, ask: "Total books?", answer: 6713, miss: "Is every row of the table on your mat?",
        say: "A table shows books borrowed. April had 2,140, May had 3,265, and June had 1,308. How many books were borrowed in all?" },
      /* practice 4: answer in the plan = 78,917 bricks. near: the third month left behind */
      { qid: "M2.S4.T6.C21:4", kind: "table", near: 59535, winMs: 5600, ask: "Total bricks?", answer: 78917, miss: "Did one row stay behind in the table?",
        say: "In the first month, a factory made 31,470 bricks. It made 28,065 in the next, and 19,382 in the third. How many bricks over the three months?" },
    ],
  },
  {
    n: 3,
    concept: "Not every number printed is needed",
    conceptId: "M2.S4.T6.C22", objectiveIds: ["O10"],
    says: ["One of these numbers has no job here. Which one?", "Bring down only the numbers it needs. Drag a number with no job into the no job tray."],
    ladder: ["Does this number help to answer it?", "Read one sentence at a time. Does its number answer your question card?"],
    closing: "Work out what is being asked first, take down only the numbers that answer it, and leave the spare one where it is.",
    learned: "You learned: take down only the numbers the question needs.",
    traceback: "The right question card goes up; the spare number goes back up into its sentence (its line lit) and turns grey with its outline kept; only the two needed numbers stand on the mat and add from the ones; the answer sentence is written back into the problem.",
    items: [
      /* learn ML3: answer in the plan = 3,825 people, and the seating capacity is not needed. near: the 5,000 seats added in */
      { qid: "M2.S4.T6.C22:ML3", kind: "spare", near: 8825, winMs: 5600, ask: "How many came in?", answer: 3825, miss: "What does your question card ask for?",
        say: "A hall seats 5,000 people. One evening, 1,640 adults came in, with 2,185 children. How many people came in?" },
      /* practice 5: answer in the plan = 6,214 passengers. The 60 seats are not needed. near: the 60 added in */
      { qid: "M2.S4.T6.C22:5", kind: "spare", near: 6274, winMs: 5600, ask: "How many rode?", answer: 6214, miss: "Which number in the story does not answer the question?",
        say: "A bus can carry 60 passengers. One day, 3,418 passengers rode in the morning, and 2,796 in the evening. How many travelled that day?" },
      /* practice 6: the plan's answer is a sentence ("worked out what the question was asking, then taken down only the
         numbers that answer it"), so it is a choice. The working area shows that child's mat, all three numbers added. */
      { qid: "M2.S4.T6.C22:6", kind: "why", near: "carefully", winMs: 6400, ask: "What should come first?", answer: "find", miss: "What did that child add that the question never asked for?",
        choices: [{ id: "find", label: "Find what is asked" }, { id: "carefully", label: "Add more carefully" }, { id: "left", label: "Start at the left" }, { id: "round", label: "Round them off" }],
        say: "A child solved a problem using all three of its printed numbers. The total came out far larger than the answer. What should the child have done first?" },
    ],
  },
  {
    n: 4,
    concept: "Sometimes an addend has to be built first",
    conceptId: "M2.S4.T6.C23", objectiveIds: ["O10"],
    says: ["That day is described, not printed. Build it first.", "Tap the described amount, and the build bay works it out."],
    ladder: ["What would you add to the printed one to get the other?", "Start from the printed amount. Add the amount it is more by."],
    closing: "An amount described as so many more than another has to be built first, and only then can it go into the sum that was asked for.",
    learned: "You learned: build a described amount first, then add it in.",
    traceback: "The right question card goes up; the build bay takes the printed amount and the amount it is more by, works the described amount in its own columns and drops it into the sentence as a built card with a drawn edge; every addend comes down, the columns add from the ones, and the answer sentence is written back.",
    items: [
      /* learn ML4: answer in the plan = 23,020 people. near: the second day alone (the increases added, the first day never brought back in) */
      { qid: "M2.S4.T6.C23:ML4", kind: "build", near: 12060, winMs: 8200, ask: "People in 2 days?", answer: 23020, miss: "Which day is printed and which day is only described?",
        say: "At a health camp on the first day, 9,340 men came, with 1,620 women. On the second day, a thousand more men came, and a hundred more women. How many people came over the two days?" },
      /* practice 7: answer in the plan = 43,690 spectators, because Saturday was 22,345. near: Saturday alone */
      { qid: "M2.S4.T6.C23:7", kind: "build", near: 22345, winMs: 6600, ask: "Came in 2 days?", answer: 43690, miss: "Did you work out the described amount before adding?",
        say: "On Friday, a stadium counted 21,345 spectators. On Saturday, a thousand more came than on Friday. How many spectators came in all?" },
      /* practice 8: answer in the plan = 39,024 books, because February was 12,708 and March was 13,708. near: March built from January */
      { qid: "M2.S4.T6.C23:8", kind: "build", near: 38924, winMs: 7400, ask: "Books in 3 months?", answer: 39024, miss: "Which month is the March amount built from?",
        say: "A library lent 12,608 books in January. In February it lent a hundred more than that. In March it lent a thousand more than February. How many books were lent over the three months?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  mat: { columns: ["L", "TTh", "Th", "H", "T", "O"], alignsBy: "the right hand end (ones under ones)", maxAddends: 4 },
  questionCardFirst: "no number card lifts until the card that says what is asked is picked",
  problems: Object.keys(WP_PROBS).map((k) => {
    const p = wpProb(k);
    const card = (p.cards || []).find((c: any) => c[0] === p.right);
    return { qid: k, questionCards: (p.cards || []).map((c: any) => c[1]), asked: card ? card[1] : null, needs: p.need, spare: p.spare || null,
      described: wpDescs(p).map((d: any) => ({ id: d.id, text: d.text, builtFrom: d.from, more: d.more })), answerSentence: p.tell, workedByAChild: !!p.mistaken };
  }),
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: the total typed on the pad (numbers compare as numbers); the choice by its id */
const judge = (item: any, v: any) => {
  if (item.choices) return String(v ?? "").trim().toLowerCase() === String(item.answer);
  return leadNumber(v) === item.answer;
};

/* oracle: every answer re-derived from the spoken question itself by schoolbook addition on digit
   strings (no code shared with judge or the working area), and the board's numbers checked against it */
const wpAddStr = (a: string, b: string) => {
  let out = "", c = 0;
  for (let i = a.length - 1, j = b.length - 1; i >= 0 || j >= 0 || c; i--, j--) {
    const s = (i >= 0 ? a.charCodeAt(i) - 48 : 0) + (j >= 0 ? b.charCodeAt(j) - 48 : 0) + c;
    out = String(s % 10) + out;
    c = s > 9 ? 1 : 0;
  }
  return out.replace(/^0+(?=\d)/, "");
};
const wpSayNums = (s: string) => (String(s).match(/\d{1,3}(?:,\d{2,3})+|\d+/g) || []).map((x) => x.replace(/,/g, ""));
const WP_BUILT_BY: Record<string, (p: string[]) => string[]> = {
  "M2.S4.T6.C23:ML4": (p) => [p[0], p[1], wpAddStr(p[0], "1000"), wpAddStr(p[1], "100")],
  "M2.S4.T6.C23:7": (p) => [p[0], wpAddStr(p[0], "1000")],
  "M2.S4.T6.C23:8": (p) => { const feb = wpAddStr(p[0], "100"); return [p[0], feb, wpAddStr(feb, "1000")]; },
};
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "why") return it.answer === "find" && it.choices.filter((c: any) => c.id === it.answer).length === 1;
  const printed = wpSayNums(it.say);
  const addends = it.kind === "build" ? WP_BUILT_BY[it.qid](printed) : it.kind === "spare" ? printed.slice(1) : printed;
  const bySay = addends.reduce((a: string, b: string) => wpAddStr(a, b), "0");
  /* the board: its needed numbers, a described one as the card it names plus its more */
  const pr = wpProb(it.qid);
  const toks = [...(pr.lines || []).flat(), ...(pr.table ? pr.table.rows : [])].filter((t: any) => t && t.id);
  const valueOf = (id: string): string => { const t = toks.find((x: any) => x.id === id); return t.t === "num" ? String(t.v) : wpAddStr(valueOf(t.from), String(t.more)); };
  const byBoard = pr.need.map(valueOf).reduce((a: string, b: string) => wpAddStr(a, b), "0");
  return bySay === String(it.answer) && byBoard === String(it.answer);
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.choices ? item.choices.filter((c: any) => c.id === item.answer).map((c: any) => c.label)
  : [String(item.answer), indian(item.answer), words(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver and the agent type the total (or pick the choice) like a child; the working area
   is played by the win motion, so nothing here reaches into it */
const solve = (item: any, T: any) => T.submit(item.answer);
const answer = () => undefined;
/* the slot writes the typed total with Indian commas as it grows (2,184 then 21,845) */
const wpFormat = (typed: any) => (/^\d{4,9}$/.test(String(typed ?? "")) ? indian(Number(typed)) : String(typed ?? ""));
const check = () => undefined;

/* ── layout of the working area (1086 x 528) ─────────────────────────────────────────────── */
const WPB = { pad: 6, line: 74, q: 50, gap: 12, cardW: 132, left: 16 };                 /* the problem board */
const WPM = { margin: 160, col: 74, head: 32, carry: 28, row: 40, w: 616 };              /* the column mat */
const WPR = { x: 640, w: 446 };                                                          /* the right column */
const WPT = { w: 520, top: 4, head: 36, row: 72 };                                       /* a table */
const WPY = { h: 196, col: 50 };                                                          /* the build bay */
const WP_COLS = ["L", "TTh", "Th", "H", "T", "O"];
const WP_BLUE = shade(CONTENT.hundred, 0.25);    /* a number being added */
const WP_GREEN = shade(CONTENT.one, 0.25);       /* the sum under the rule */
const WP_VERM = shade(CONTENT.pointer, 0.25);    /* a carried digit, small, above its column */
const WP_AMBER = CONTENT.ten;                    /* the column or line under discussion */
const WP_GREY = "#767676";                       /* a zero holding a place; a number with no job */
const wpColX = (k: number) => WPM.margin + (5 - k) * WPM.col;   /* column k from the right (0 = ones) */
const wpColC = (k: number) => wpColX(k) + WPM.col / 2;
const wpBayC = (k: number) => WPR.x + WPR.w - 16 - (k + 0.5) * WPY.col;

/* text is measured by the page's own font (the stage has no layout engine) */
let wpCtx: any = null;
const wpMeasure = (s: string, size: number, weight = 500) => {
  try {
    if (!wpCtx) wpCtx = window.document.createElement("canvas").getContext("2d");
    wpCtx.font = `${weight} ${size}px ${FONT}`;
    return Math.ceil(wpCtx.measureText(String(s)).width * 1.03);
  } catch (e) { return Math.ceil(String(s).length * size * 0.58); }
};
const wpWrap = (s: string, size: number, weight: number, max: number) => {
  const out: string[] = [];
  let line = "";
  for (const w of String(s).split(/\s+/).filter(Boolean)) {
    const t = line ? line + " " + w : w;
    if (line && wpMeasure(t, size, weight) > max) { out.push(line); line = w; } else line = t;
  }
  if (line) out.push(line);
  return out;
};

/* the column sum as the book works it: from the ones, each column's total, its digit and its carry */
const wpColumns = (vals: number[]) => {
  const out: any[] = [];
  const width = Math.max(1, ...vals.map((v) => String(v).length));
  let carry = 0;
  for (let k = 0; k < width || carry; k++) {
    const t = vals.reduce((a, v) => a + (Math.floor(v / Math.pow(10, k)) % 10), 0) + carry;
    out.push({ k, digit: t % 10, carryOut: Math.floor(t / 10) });
    carry = Math.floor(t / 10);
  }
  return out;
};

/* every piece of a problem (cards, described amounts, table rows, cards built in free play) */
const wpToks = (pr: any, s: any) => [...(pr.lines || []).flat().filter((t: any) => t && typeof t !== "string"), ...(pr.table ? pr.table.rows : []), ...((s && s.extra) || [])];
const wpTok = (pr: any, s: any, id: string) => wpToks(pr, s).find((t: any) => t.id === id);
const wpValue = (pr: any, s: any, id: string): number | null => {
  const t = wpTok(pr, s, id);
  if (!t) return null;
  if (t.t === "num") return t.v;
  return s.built && s.built[id] !== undefined ? s.built[id] : null;
};
const wpLineOf = (pr: any, id: string) => (pr.lines || []).findIndex((ln: any[]) => ln.some((t: any) => t && t.id === id));

const wpFresh = (item: any) => {
  const key = item && item.qid ? item.qid : "free";
  const pr = wpProb(key);
  const s: any = { key, picked: !!pr.free, mat: [], grey: [], built: {}, extra: [], bay: null, sum: null, carry: [], hl: null, shift: {},
    told: null, lit: false, litLine: null, litRow: null, litDesc: null, tip: null, fly: null, mistaken: false, prompted: false };
  if (pr.mistaken) {
    /* that child's mat: all three printed numbers, added */
    s.mat = [pr.spare, ...pr.need];
    const cols = wpColumns(s.mat.map((id: string) => wpValue(pr, s, id) || 0));
    s.sum = cols.map((c: any) => c.digit);
    s.carry = [];
    cols.forEach((c: any) => { if (c.carryOut) s.carry[c.k + 1] = c.carryOut; });
    s.mistaken = true;
  }
  return s;
};

/* the problem board laid out: every sentence line holds a card, the question line comes last */
const wpBoard = (pr: any, s: any, tx: any = (v: any) => v) => {
  if (pr.table) {
    const rowTop = (i: number) => WPT.top + WPT.head + 4 + i * WPT.row;
    return { table: true, rowTop, lines: [] as any[], qy: null, h: rowTop(3) + 6 };
  }
  const src = pr.free ? [...pr.lines, ["Built in the bay:", ...(s.extra || [])]] : pr.lines;
  let y = WPB.pad;
  const lines = src.map((ln: any[]) => {
    let x = WPB.left;
    const items: any[] = [];
    ln.forEach((tok: any) => {
      if (typeof tok === "string") {
        const text = tx(tok);   /* a fragment in the language in use */
        if (items.length && !/^[.,]/.test(text)) x += WPB.gap;
        const w = wpMeasure(text, T.label, 500);
        items.push({ kind: "w", text, x, w });
        x += w;
      } else {
        if (items.length) x += WPB.gap;
        const open = tok.t === "desc" && (s.built || {})[tok.id] === undefined;
        const w = open ? wpMeasure(tx(tok.text), T.label, 600) + 36 : WPB.cardW;
        items.push({ kind: open ? "desc" : "card", tok, x, w });
        x += w;
      }
    });
    const out = { y, items, width: x };
    y += WPB.line;
    return out;
  });
  const qy = pr.free ? null : y;
  if (!pr.free) y += WPB.q;
  return { table: false, rowTop: null as any, lines, qy, h: y + 4 };
};

const WP_CSS = `
.wp-in{animation:wpIn 320ms ease-out both}
@keyframes wpIn{from{transform:translateY(-26px);opacity:.25}to{transform:none;opacity:1}}
.wp-pop{transform-box:fill-box;transform-origin:center;animation:wpPop 300ms ease-out both}
@keyframes wpPop{from{transform:scale(.4);opacity:.2}to{transform:none;opacity:1}}
.wp-carry{animation:wpCarry 560ms cubic-bezier(.3,.7,.25,1) both}
@keyframes wpCarry{from{transform:translate(var(--dx),var(--dy))}to{transform:none}}
.wp-fly{transition:transform 460ms cubic-bezier(.3,.7,.25,1)}
.wp-tip{animation:wpTip 520ms ease-in-out both}
@keyframes wpTip{0%,100%{transform:none}25%{transform:translateX(-9px)}75%{transform:translateX(9px)}}
.wp-grab{cursor:grab}
.wp-hello{animation:wpHello 1300ms ease-in-out 250ms both}
@keyframes wpHello{0%,100%{transform:none}45%{transform:translateY(-12px)}}
@media (prefers-reduced-motion:reduce){.wp-in,.wp-pop,.wp-carry,.wp-tip,.wp-hello{animation:none}.wp-fly{transition:none}}
`;

/* ── the working area ─────────────────────────────────────────────────────────────────────── */
function Work({ n, item, index, stage, wrong, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();   /* the win motion, the traceback, the free-play sum */
  const tb = useTimeline();   /* the build bay */
  const free = stage === "free";
  const [S, setS] = useState<any>(() => wpFresh(item));
  const SR = useRef<any>(S);
  const set = (s: any) => { SR.current = s; setS(s); };
  const put = (patch: any) => set({ ...SR.current, ...patch });
  const setupFor = useRef<any>(index);
  const timers = useRef<any[]>([]);
  const later = (fn: () => void, ms: number) => { timers.current.push(setTimeout(fn, ms)); };
  const clearLater = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => clearLater, []);
  const reset = (it: any) => { tl.stop(); tb.stop(); clearLater(); set(wpFresh(it)); };

  useEffect(() => {
    if (free) return;
    if ((stage === "ask" || stage === "teach") && setupFor.current !== index) { setupFor.current = index; reset(item); }
  }, [stage, index]);
  /* free play (the plan's freePlay): loose cards, a mat that adds whatever lands on it, and the bay */
  useEffect(() => { if (free) { setupFor.current = -2; reset(null); } }, [free]);

  /* Enter and choice taps go straight to the answer: the total is typed on the pad */
  api.onEnter(null);

  const pr = wpProb(S.key);
  const kind = pr.free ? "free" : pr.table ? "table" : pr.spare ? "spare" : wpDescs(pr).length ? "build" : "sum";
  const why = !!pr.mistaken;
  const board = wpBoard(pr, S, tx);
  const matTop = board.h + 8;
  const rcTop = matTop;
  const rowY = (i: number) => matTop + WPM.head + WPM.carry + i * WPM.row;
  const busy = tl.busy || tb.busy;
  const canAct = free || (stage === "ask" && !busy && !why);
  const tick = () => api.sfx.tick();
  const val = (s: any, id: string) => wpValue(pr, s, id);
  const tagOf = (id: string) => { const t = wpTok(pr, SR.current, id); return t ? t.tag : ""; };
  const cardOf = (cid: string) => (pr.cards || []).find((c: any) => c[0] === cid);
  const asked = cardOf(pr.right);

  /* where a piece sits: on the board (a card, a described amount, a table row) or on the mat */
  const posOf = (s: any, id: string) => {
    const b = wpBoard(pr, s, tx);
    if (b.table) { const i = pr.table.rows.findIndex((r: any) => r.id === id); return { x: WPT.w - 90, y: b.rowTop(Math.max(0, i)) + 36 }; }
    for (const ln of b.lines) for (const it of ln.items) if (it.tok && it.tok.id === id) return { x: it.x + WPB.cardW / 2, y: ln.y + 37 };
    return { x: 300, y: 60 };
  };
  const matPos = (i: number) => ({ x: wpColC(2), y: rowY(i) + 20 });
  const bayOut = { x: wpBayC(2), y: rcTop + 156 };

  /* a timed plan: each step merges its patch into the state, then waits */
  const planner = (start: any, slow: number) => {
    const P: any = { sim: start, steps: [] as any[] };
    P.at = (ms: number, patch: any, fx?: () => void) => {
      P.sim = { ...P.sim, ...patch };
      P.steps.push([Math.round(ms * slow), () => { put(patch); if (fx) fx(); }]);
    };
    return P;
  };
  /* the columns added from the ones: the digit drops under the rule, the carry travels up over the next column */
  const addSteps = (P: any, vals: number[]) => {
    const sum: any[] = [], carry: any[] = [];
    wpColumns(vals).forEach((c: any) => {
      P.at(240, { hl: c.k });
      sum[c.k] = c.digit;
      if (c.carryOut) carry[c.k + 1] = c.carryOut;
      P.at(460, { sum: sum.slice(), carry: carry.slice() }, tick);
    });
    P.at(240, { hl: null });
  };
  /* the build bay: the printed amount above, the amount it is more by below, the small sum in its own
     columns, then the built card drops out of the bay's foot and settles into the sentence */
  const buildSteps = (P: any, d: any, a: number) => {
    const c = a + d.more;
    const bay = { id: d.id, a, b: null as any, c, shown: 0, fromTag: tagOf(d.from), tag: d.tag };
    P.at(380, { litDesc: d.id, bay });
    P.at(440, { bay: { ...bay, b: d.more } });
    const len = String(c).length;
    for (let k = 1; k <= len; k++) P.at(150, { bay: { ...bay, b: d.more, shown: k } }, k === len ? tick : undefined);
    P.at(420, {});
    const built = { ...P.sim.built, [d.id]: c };
    const to = posOf({ ...P.sim, built }, d.id);
    P.at(40, { fly: { ...bayOut, v: c, built: true }, bay: null });
    P.at(520, { fly: { ...to, v: c, built: true } });
    P.at(60, { fly: null, built, litDesc: null }, tick);
  };

  /* the whole working, from where the child left it: the question card, the spare turned down,
     the described amounts built, every needed number down by its right end, the columns added,
     and the answer written back into a sentence. The win motion and the traceback both run it. */
  const plan = (slow: number, wrongVal: any) => {
    const start = { ...SR.current, bay: null, fly: null, tip: null, lit: false, litLine: null, litRow: null, litDesc: null, hl: null };
    put({ bay: null, fly: null, tip: null, litDesc: null, hl: null });
    const P = planner(start, slow);
    const v = (id: string) => val(P.sim, id) || 0;
    if (!P.sim.picked) { P.at(520, { lit: true }); P.at(620, { picked: true }, tick); P.at(220, { lit: false }); }
    if (pr.spare) {
      const id = pr.spare, li = wpLineOf(pr, id);
      if (P.sim.mat.includes(id)) {
        const a = matPos(P.sim.mat.indexOf(id)), x = v(id);
        P.at(420, { litLine: li, sum: null, carry: [], told: null, mistaken: false });
        const b = posOf(P.sim, id);
        P.at(40, { fly: { ...a, v: x } });
        P.at(500, { fly: { ...b, v: x } });
        P.at(80, { fly: null, mat: P.sim.mat.filter((m: string) => m !== id) }, tick);
      } else P.at(420, { litLine: li });
      if (!P.sim.grey.includes(id)) P.at(480, { grey: [...P.sim.grey, id] }, tick);
      P.at(300, { litLine: null });
    }
    wpDescs(pr).forEach((d: any) => {
      if (P.sim.built[d.id] !== undefined) return;
      const a = val(P.sim, d.from);
      if (a !== null) buildSteps(P, d, a);
    });
    pr.need.forEach((id: string) => {
      if (P.sim.mat.includes(id)) return;
      const a = posOf(P.sim, id), b = matPos(P.sim.mat.length), x = v(id);
      if (pr.table) P.at(320, { litRow: id });
      P.at(40, { fly: { ...a, v: x } });
      P.at(460, { fly: { ...b, v: x } });
      P.at(60, { fly: null, litRow: null, mat: [...P.sim.mat, id], sum: null, carry: [], told: null }, tick);
    });
    /* lined up by the left ends (the phase 1 misconception): the shorter card slides right, a heading
       at a time, until its last digit stands in the ones column */
    if (wrongVal !== null && wrongVal !== undefined && kind === "sum" && leadNumber(wrongVal) === item.near) {
      const lens = pr.need.map((id: string) => String(v(id)).length);
      const d = Math.max(...lens) - Math.min(...lens);
      if (d > 0) {
        const id = pr.need[lens.indexOf(Math.min(...lens))];
        P.at(560, { shift: { [id]: d }, hl: d, sum: null, carry: [], told: null });
        for (let j = d - 1; j >= 0; j--) P.at(600, { shift: { [id]: j }, hl: j });
        P.at(300, { shift: {}, hl: null });
      }
    }
    if (P.sim.sum) P.at(260, { sum: null, carry: [], told: null, mistaken: false });
    const vals = P.sim.mat.map((id: string) => v(id));
    addSteps(P, vals);
    const total = vals.reduce((a: number, b: number) => a + b, 0);
    P.at(420, { told: total });
    return { steps: P.steps, total };
  };

  /* ── the child's own moves ── */
  const nudge = () => {
    api.say("First pick the card that says what is asked.");
    put({ lit: true });
    later(() => put({ lit: false }), 1500);
  };
  /* each line written out at its own api.say, so `node cli.mjs voice` finds and bakes it */
  const sayAfterPick = () => {
    if (kind === "table") return api.say("Now tap each row it needs.");
    if (kind === "spare") return api.say(["Bring down only the numbers it needs.", "Drag a number with no job into the no job tray."]);
    if (kind === "build") return api.say("Tap the described amount to build it in the bay.");
    return api.say("Now bring its numbers down to the mat.");
  };
  const pick = (cid: string) => {
    const s = SR.current;
    if (!canAct || s.picked) return;
    if (cid === pr.right) { put({ picked: true, lit: false, tip: null }); tick(); sayAfterPick(); return; }
    put({ tip: cid, lit: true });
    api.say("Read the last line again. Does it ask that?");
    later(() => put({ tip: null, lit: false }), 1400);
  };
  const lift = (id: string) => {
    const s = SR.current;
    if (!canAct) return;
    if (!s.picked) return nudge();
    const t = wpTok(pr, s, id);
    if (!t || s.mat.includes(id) || s.mat.length >= 4 || val(s, id) === null) return;
    const mat = [...s.mat, id];
    put({ mat, grey: s.grey.filter((g: string) => g !== id), sum: null, carry: [], told: null, hl: null });
    tick();
    if (!free && mat.length === pr.need.length && !s.prompted) {
      put({ prompted: true });
      api.say("Add the columns from the ones. Then type the total.");
    }
  };
  const back = (id: string) => {
    const s = SR.current;
    if (!canAct || !s.mat.includes(id)) return;
    put({ mat: s.mat.filter((m: string) => m !== id), sum: null, carry: [], told: null, hl: null });
    tick();
  };
  const greyOut = (id: string) => {
    const s = SR.current;
    if (!canAct) return;
    if (!s.picked) return nudge();
    put({ grey: [...s.grey.filter((g: string) => g !== id), id], mat: s.mat.filter((m: string) => m !== id), sum: null, carry: [], told: null });
    tick();
  };
  const unGrey = (id: string) => { const s = SR.current; if (canAct) { put({ grey: s.grey.filter((g: string) => g !== id) }); tick(); } };
  const build = (id: string) => {
    const s = SR.current;
    if (!canAct) return;
    if (!s.picked) return nudge();
    const d = wpDescs(pr).find((x: any) => x.id === id);
    if (!d || s.built[id] !== undefined) return;
    const a = val(s, d.from);
    if (a === null) {
      const tg = tagOf(d.from);
      api.say({ en: "Build " + tagOf(d.from) + " first.", hi: `पहले ${TR.hi[tg] || tg} बनाओ।`, gu: `પહેલાં ${TR.gu[tg] || tg} બનાવો.` });
      put({ litDesc: d.from });
      later(() => put({ litDesc: null }), 1500);
      return;
    }
    const P = planner({ ...s }, 1);
    buildSteps(P, d, a);
    tb.run(P.steps);
  };
  /* free play: a card dropped in the bay, then + 100 or + 1,000 builds a new card onto the board */
  const toBay = (id: string) => {
    const a = val(SR.current, id);
    if (a === null || tb.busy) return;
    put({ bay: { id: null, a, b: null, c: null, shown: 0, fromTag: "", tag: "" } });
    tick();
  };
  const freeBuild = (more: number) => {
    const s = SR.current;
    if (!free || tb.busy) return;
    if (!s.bay || s.bay.a === null || s.bay.c !== null) { api.say("Drag a number into the bay first."); return; }
    if (s.extra.length >= WP_FREE_MAX) { api.say("The bay line is full. Play again for a fresh one."); return; }
    const c = s.bay.a + more, id = "x" + (s.extra.length + 1);
    const tok = { t: "num", id, v: c, tag: "built", built: true };
    const P = planner({ ...s }, 1);
    const bay = { ...s.bay, b: more, c, shown: 0 };
    P.at(420, { bay });
    const len = String(c).length;
    for (let k = 1; k <= len; k++) P.at(140, { bay: { ...bay, shown: k } }, k === len ? tick : undefined);
    P.at(380, {});
    const extra = [...s.extra, tok];
    const to = posOf({ ...P.sim, extra }, id);
    P.at(40, { fly: { ...bayOut, v: c, built: true }, bay: null });
    P.at(520, { fly: { ...to, v: c, built: true } });
    P.at(60, { fly: null, extra }, tick);
    tb.run(P.steps);
  };

  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    const s = SR.current;
    if (!canAct) return;
    if (!moved) {
      if (pay.src === "desc") return build(pay.id);
      if (s.grey.includes(pay.id)) return unGrey(pay.id);
      return lift(pay.id);
    }
    const overMat = p.x < WPM.w + 24 && p.y > matTop - 12;
    const overRight = p.x > WPR.x - 12 && p.y > rcTop - 12;
    if (pay.src === "desc") { if (overMat || overRight) build(pay.id); return; }
    if (overMat) return lift(pay.id);
    if (overRight && kind === "spare") return greyOut(pay.id);
    if (overRight && free) return toBay(pay.id);
  });
  /* keyboard: Enter or Space is a tap; on phase 3, Delete turns a number down */
  const keysFor = (pay: any) => {
    const k = drag.keys(pay);
    return { onKeyDown: (e: any) => {
      if (kind === "spare" && e.key === "Delete") { e.preventDefault(); e.stopPropagation(); greyOut(pay.id); return; }
      k.onKeyDown(e);
    } };
  };

  /* ── the win: whatever the child left undone is done in front of them, then the sentence is read ── */
  useEffect(() => {
    if (stage !== "win" || free) return;
    tb.stop(); clearLater();
    const s = SR.current;
    if (s.told !== null && s.told !== undefined) { api.say({ en: wpTell(pr, s.told), hi: wpTellIn(pr, s.told, "hi"), gu: wpTellIn(pr, s.told, "gu") }); return; }
    const r = plan(0.55, null);
    tl.run(r.steps, () => api.say({ en: wpTell(pr, r.total), hi: wpTellIn(pr, r.total, "hi"), gu: wpTellIn(pr, r.total, "gu") }));
  }, [stage]);

  /* ── the traceback: the working redrawn in steps, ending on the whole total and its sentence;
        nothing marked, nothing cleared, the child's answer stays in the slot ── */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    tb.stop(); clearLater();
    api.lock(true);
    const r = plan(1.1, wrong.value);
    tl.run([[350, () => {}], ...r.steps, [300, () => {}]], () => api.lock(false));
  }, [wrong]);

  /* free play: the mat adds itself whenever two or more numbers stand on it */
  const matKey = S.mat.join(",");
  useEffect(() => {
    if (!free) return;
    const s = SR.current;
    if (s.mat.length < 2) { tl.stop(); put({ sum: null, carry: [], hl: null }); return; }
    const P = planner({ ...s, sum: null, carry: [] }, 0.7);
    P.at(160, { sum: null, carry: [], hl: null });
    addSteps(P, s.mat.map((id: string) => val(s, id) || 0));
    tl.run(P.steps);
  }, [matKey, free]);

  /* ── what the host and the agent read back (toolApi.getState) ── */
  const revealed = S.told !== null && S.told !== undefined;
  api.share({
    phase: n, problem: pr.free ? "free" : item.qid || null, question: S.picked && asked ? asked[1] : null,
    liftedNumbers: S.mat.map((id: string) => val(S, id)), greyed: S.grey.map((id: string) => val(S, id)),
    builtAddends: Object.keys(S.built).map((k) => S.built[k]), sum: revealed ? S.told : null,
    answerSentence: revealed ? wpTell(pr, S.told) : null, complete: stage === "idle",
  });

  /* ── drawing ── */
  const cardArt = (cx: number, cy: number, v: number, o: any = {}) => (
    <g filter={o.grey ? undefined : o.lift ? "url(#fLift)" : "url(#fShadowSoft)"}>
      <rect x={cx - 66} y={cy - 28} width={132} height={56} rx={14} fill="#FFFFFF"
        stroke={o.grey ? C.dim : o.built ? C.accent : C.rule} strokeWidth={o.built ? 3 : 2} />
      {o.built && <rect x={cx - 60} y={cy - 22} width={120} height={44} rx={10} fill="none" stroke={C.accent} strokeWidth={1.5} strokeDasharray="6 5" />}
      <text x={cx} y={cy + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={o.grey ? WP_GREY : C.ink}>{indian(v)}</text>
    </g>
  );

  const piece = (it: any, ln: any) => {
    const t = it.tok, id = t.id, y = ln.y;
    if (it.kind === "desc") {
      const lit = S.litDesc === id, pay = { src: "desc", id };
      return (
        <g key={"piece-" + id} className={canAct ? "c4-piece wp-grab" : ""}
          {...(canAct ? { ...control("desc-" + id, "Build it: " + t.text), ...drag.bind(pay), ...keysFor(pay) } : {})}>
          <rect x={it.x} y={y + 9} width={it.w} height={56} rx={14} fill={tint(WP_AMBER, lit ? 0.6 : 0.82)}
            stroke={shade(WP_AMBER, 0.35)} strokeWidth={lit ? 4 : 2.5} strokeDasharray="9 6" />
          <text x={it.x + it.w / 2} y={y + 48} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(t.text)}</text>
          <rect x={it.x} y={y + 1} width={it.w} height={72} fill="transparent" />
        </g>
      );
    }
    const v = val(S, id);
    const cx = it.x + WPB.cardW / 2, cy = y + 37;
    if (S.mat.includes(id)) {
      /* lifted: a ruled dash keeps its place so the sentence still reads; a tap pushes it back */
      return (
        <g key={"piece-" + id}>
          <line x1={it.x + 22} y1={y + 56} x2={it.x + WPB.cardW - 22} y2={y + 56} stroke={C.rule} strokeWidth={4} strokeLinecap="round" />
          {canAct && <Hit id={"back-" + id} label={"Put " + indian(v || 0) + " back"} x={it.x} y={y + 1} w={WPB.cardW} h={72} onPress={() => back(id)} />}
        </g>
      );
    }
    const grey = S.grey.includes(id), built = t.t === "desc" || !!t.built, pay = { src: "num", id };
    return (
      <g key={"piece-" + id} className={canAct ? "c4-piece wp-grab" : ""}
        {...(canAct ? { ...control("num-" + id, (grey ? "Turned down: " : "Number ") + indian(v || 0)), ...drag.bind(pay), ...keysFor(pay) } : {})}>
        {cardArt(cx, cy, v || 0, { grey, built })}
        <rect x={it.x} y={y + 1} width={WPB.cardW} height={72} fill="transparent" />
      </g>
    );
  };

  /* the question line lit, or the answer written back into a sentence */
  const toldParts = (total: number) => {
    const s = wpTellIn(pr, total, lang), num = indian(total), at = s.indexOf(num);
    return { pre: s.slice(0, at), num, post: s.slice(at + num.length) };
  };
  const sentenceText = (x: number, y: number, total: number, key: string) => {
    const p = toldParts(total);
    return (
      <text key={key} className="wp-in" x={x} y={y} fontSize={T.label} fontWeight={500} fill={C.ink}>
        {p.pre && <tspan fill={C.ink}>{p.pre}</tspan>}
        <tspan fontWeight={700} fill={WP_GREEN}>{p.num}</tspan>
        <tspan fill={C.ink}>{p.post}</tspan>
      </text>
    );
  };

  const drawBoard = () => {
    if (board.table) {
      const rows = pr.table.rows;
      const rx = 560, maxW = WPR.x + WPR.w - rx - 12;
      const qLines = wpWrap(tx(pr.q), T.label, 600, maxW);
      const tLines = revealed ? wpWrap(wpTellIn(pr, S.told, lang), T.label, 500, maxW) : [];
      return (
        <g data-role="reading">
          <rect x={0} y={0} width={W.w} height={board.h} rx={RAD.panel} fill={C.paper} stroke={C.rule} strokeWidth={2} />
          <rect x={4} y={WPT.top} width={WPT.w} height={WPT.head} rx={10} fill={tint(C.panel, 0.2)} />
          <text x={24} y={WPT.top + 28} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(pr.table.head[0])}</text>
          <text x={WPT.w - 16} y={WPT.top + 28} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(pr.table.head[1])}</text>
          {rows.map((r: any, i: number) => {
            const y = board.rowTop(i), down = S.mat.includes(r.id), lit = S.litRow === r.id, pay = { src: "row", id: r.id };
            const ink = down ? WP_GREY : C.ink;
            const face = (
              <g>
                <rect x={4} y={y + 4} width={WPT.w} height={WPT.row - 8} rx={14} fill="#FFFFFF" stroke={lit ? WP_AMBER : C.rule} strokeWidth={lit ? 4 : 2} />
                <text x={24} y={y + 47} fontSize={T.label} fontWeight={500} fill={ink}>{tx(r.tag)}</text>
                <text x={WPT.w - 16} y={y + 47} textAnchor="end" fontSize={T.label} fontWeight={700} fill={ink}>{indian(r.v)}</text>
                {down && <line x1={16} y1={y + 36} x2={WPT.w - 8} y2={y + 36} stroke={WP_GREY} strokeWidth={3} strokeLinecap="round" />}
              </g>
            );
            if (down) return (
              <g key={r.id}>
                {face}
                {canAct && <Hit id={"back-" + r.id} label={"Put the " + r.tag + " row back"} x={4} y={y} w={WPT.w} h={WPT.row} onPress={() => back(r.id)} />}
              </g>
            );
            return (
              <g key={r.id} className={canAct ? "c4-piece wp-grab" : ""}
                {...(canAct ? { ...control("row-" + r.id, "Row " + r.tag + ", " + indian(r.v)), ...drag.bind(pay), ...keysFor(pay) } : {})}>
                {face}
                <rect x={4} y={y} width={WPT.w} height={WPT.row} fill="transparent" />
              </g>
            );
          })}
          <text x={rx} y={52} fontSize={T.label} fontWeight={500} fill={C.ink}>{tx(pr.context)}</text>
          {!revealed && S.lit && <rect x={rx - 10} y={82} width={maxW + 16} height={qLines.length * 44 + 12} rx={12} fill={tint(WP_AMBER, 0.65)} />}
          {revealed
            ? tLines.map((ln: string, k: number) => {
              const num = indian(S.told);
              if (!ln.includes(num)) return <text key={k} className="wp-in" x={rx} y={116 + k * 44} fontSize={T.label} fontWeight={500} fill={C.ink}>{ln}</text>;
              const at = ln.indexOf(num);
              return (
                <text key={k} className="wp-in" x={rx} y={116 + k * 44} fontSize={T.label} fontWeight={500} fill={C.ink}>
                  {at > 0 && <tspan fill={C.ink}>{ln.slice(0, at)}</tspan>}
                  <tspan fontWeight={700} fill={WP_GREEN}>{num}</tspan>
                  <tspan fill={C.ink}>{ln.slice(at + num.length)}</tspan>
                </text>
              );
            })
            : qLines.map((ln: string, k: number) => <text key={k} x={rx} y={116 + k * 44} fontSize={T.label} fontWeight={600} fill={C.ink}>{ln}</text>)}
          <text x={rx} y={238} fontSize={T.micro} fontWeight={600} fill={C.ink}>
            {lang === "hi" ? `${rows.length} में से ${S.mat.length} पंक्तियाँ` : lang === "gu" ? `${rows.length} માંથી ${S.mat.length} હરોળ` : S.mat.length + " of " + rows.length + " rows"}</text>
        </g>
      );
    }
    const qW = board.qy !== null ? wpMeasure(tx(pr.q), T.label, 600) : 0;
    return (
      <g data-role="reading">
        <rect x={0} y={0} width={W.w} height={board.h} rx={RAD.panel} fill={C.paper} stroke={C.rule} strokeWidth={2} />
        {board.lines.map((ln: any, li: number) => (
          <g key={li}>
            {S.litLine === li && <rect x={WPB.left - 6} y={ln.y + 66} width={ln.width - WPB.left + 12} height={6} rx={3} fill={WP_AMBER} />}
            {pr.free && li === board.lines.length - 1 && (S.extra || []).length < WP_FREE_MAX && (
              <rect x={ln.width + WPB.gap} y={ln.y + 9} width={WPB.cardW} height={56} rx={14} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="9 7" />
            )}
            {ln.items.map((it: any, k: number) => it.kind === "w"
              ? <text key={"word-" + k} x={it.x} y={ln.y + 48} fontSize={T.label} fontWeight={500} fill={C.ink}>{it.text}</text>
              : piece(it, ln))}
          </g>
        ))}
        {board.qy !== null && !revealed && S.lit && <rect x={WPB.left - 8} y={board.qy + 4} width={qW + 16} height={44} rx={12} fill={tint(WP_AMBER, 0.65)} />}
        {board.qy !== null && (revealed
          ? sentenceText(WPB.left, board.qy + 36, S.told, "told")
          : <text x={WPB.left} y={board.qy + 36} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(pr.q)}</text>)}
      </g>
    );
  };

  /* the column mat: headings, a carry strip, addends that land by their right hand ends, a rule, the sum */
  const nRows = Math.max(2, S.mat.length);
  const ruleY = rowY(nRows) + 3;
  const sumBase = ruleY + 42;
  const matH = sumBase + 10 - matTop;
  const drawMat = () => (
    <g>
      <rect x={0} y={matTop} width={WPM.w} height={matH} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      {S.hl !== null && <rect x={wpColX(S.hl) + 2} y={matTop + 2} width={WPM.col - 4} height={matH - 4} rx={10} fill={WP_AMBER} fillOpacity={0.13} />}
      {[0, 1, 2, 3, 4, 5, 6].map((k) => (
        <line key={"v" + k} x1={k === 6 ? wpColX(5) : wpColX(k) + WPM.col} y1={matTop + 34} x2={k === 6 ? wpColX(5) : wpColX(k) + WPM.col} y2={sumBase + 6}
          stroke={tint(C.rule, 0.35)} strokeWidth={1.5} />
      ))}
      {WP_COLS.map((h, j) => {
        const k = 5 - j, lit = S.hl === k;
        return (
          <g key={h}>
            <rect x={wpColX(k) + 3} y={matTop + 4} width={WPM.col - 6} height={28} rx={8} fill={lit ? tint(WP_AMBER, 0.55) : tint(C.panel, 0.35)}
              stroke={lit ? WP_AMBER : "none"} strokeWidth={lit ? 3 : 0} />
            <text x={wpColC(k)} y={matTop + 27} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(h)}</text>
          </g>
        );
      })}
      {/* carries: small, vermilion, above the column they are added into; each travels up from the column it left */}
      {S.carry.map((c: any, k: number) => c ? (
        <text key={"c" + k + "-" + c} className="wp-carry" x={wpColC(k)} y={matTop + 55} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={WP_VERM}
          style={{ ["--dx" as any]: WPM.col + "px", ["--dy" as any]: (sumBase - matTop - 55) + "px" } as any}>{c}</text>
      ) : null)}
      {Array.from({ length: nRows }).map((_, i) => i >= S.mat.length ? (
        <rect key={"e" + i} x={wpColX(4) - 4} y={rowY(i) + 4} width={WPM.col * 5 + 4} height={WPM.row - 8} rx={8} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="8 7" />
      ) : null)}
      {S.mat.map((id: string, i: number) => {
        const t = wpTok(pr, S, id), v = val(S, id) || 0, ds = String(v).split("").reverse(), sh = S.shift[id] || 0, y = rowY(i);
        const built = t && (t.t === "desc" || t.built);
        return (
          <g key={id} className="wp-in">
            {built && <rect x={wpColX(ds.length - 1 + sh) + 2} y={y + 4} width={ds.length * WPM.col - 4} height={WPM.row - 8} rx={10} fill="none" stroke={C.accent} strokeWidth={2} strokeDasharray="6 5" />}
            {t && t.tag && <text x={12} y={y + 30} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(t.tag)}</text>}
            {ds.map((d: string, k: number) => (
              <text key={k} x={wpColC(k + sh)} y={y + 33} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={d === "0" ? WP_GREY : WP_BLUE}>{d}</text>
            ))}
            {i === S.mat.length - 1 && S.mat.length > 1 && ds.length + sh < 6 && (
              <text x={wpColC(5)} y={y + 33} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>+</text>
            )}
          </g>
        );
      })}
      <rect x={wpColX(5)} y={ruleY} width={WPM.col * 6} height={4} rx={2} fill={C.ink} />
      {(S.sum || []).map((d: any, k: number) => d === null || d === undefined ? null : (
        <text key={"s" + k + "-" + d} className="wp-pop" x={wpColC(k)} y={sumBase} textAnchor="middle" fontSize={T.prompt} fontWeight={700}
          fill={S.mistaken ? C.ink : d === 0 && k < (S.sum || []).length - 1 ? WP_GREY : WP_GREEN}>{d}</text>
      ))}
    </g>
  );

  /* the right column: the question cards until one is picked; then the no job tray (phase 3) or the build bay (phase 4, free play) */
  const drawRight = () => {
    if (!pr.free && !S.picked && !why) {
      /* the invitation: the whole stack gives one slow lift as the question opens (a ring on one card would point at it) */
      return <g className={stage === "ask" && canAct ? "wp-hello" : ""}>{(pr.cards || []).map((c: any, i: number) => {
        const y = rcTop + i * 82, label = tx(c[1]);
        const size = wpMeasure(label, T.label, 500) <= WPR.w - 92 ? T.label : T.micro;
        return (
          <g key={c[0]} className={S.tip === c[0] ? "wp-tip" : ""}>
            <Key id={"ask-" + c[0]} label={(lang === "hi" ? "प्रश्न कार्ड: " : lang === "gu" ? "પ્રશ્ન કાર્ડ: " : "Question card: ") + label} x={WPR.x} y={y} w={WPR.w} h={72} C={C} disabled={!canAct} onClick={() => pick(c[0])}>
              <circle cx={-WPR.w / 2 + 38} cy={0} r={21} fill={canAct ? C.accent : tint(C.accent, 0.35)} />
              <text x={-WPR.w / 2 + 38} y={10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF">?</text>
              <text x={-WPR.w / 2 + 74} y={size === T.label ? 11 : 10} fontSize={size} fontWeight={500} fill={C.ink}>{label}</text>
            </Key>
          </g>
        );
      })}</g>;
    }
    if (kind === "spare" && !why) {
      return (
        <g>
          <rect x={WPR.x} y={rcTop} width={WPR.w} height={120} rx={RAD.panel} fill="#FFFFFF" stroke={WP_GREY} strokeWidth={2.5} strokeDasharray="10 8" />
          <text x={WPR.x + WPR.w / 2} y={rcTop + 72} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={WP_GREY}>{tx("no job")}</text>
        </g>
      );
    }
    if (kind === "build" || pr.free) {
      const b = S.bay, top = rcTop;
      const digits = (v: number, row: number, fill: string, shown = 99) => String(v).split("").reverse().map((d, k) => k < shown ? (
        <text key={row + "-" + k} className={row === 2 ? "wp-pop" : ""} x={wpBayC(k)} y={top + 72 + row * 42 + (row === 2 ? 8 : 0)} textAnchor="middle"
          fontSize={T.label} fontWeight={700} fill={d === "0" && k < String(v).length - 1 ? WP_GREY : fill}>{d}</text>
      ) : null);
      return (
        <g>
          <rect x={WPR.x} y={top} width={WPR.w} height={WPY.h} rx={RAD.panel} fill="#FFFFFF" stroke={C.accent} strokeWidth={2.5} strokeDasharray={b ? undefined : "10 8"} />
          <text x={WPR.x + 16} y={top + 32} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("build bay")}</text>
          {[0, 1].map((r) => <rect key={r} x={wpBayC(4) - 24} y={top + 46 + r * 42} width={WPY.col * 5 - 2} height={36} rx={8} fill="none" stroke={tint(C.rule, 0.2)} strokeWidth={1.5} strokeDasharray="6 6" />)}
          {b && b.fromTag && <text x={WPR.x + 16} y={top + 72} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(b.fromTag)}</text>}
          <text x={WPR.x + 16} y={top + 114} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("more")}</text>
          {b && b.a !== null && digits(b.a, 0, WP_BLUE)}
          {b && b.b !== null && <text x={wpBayC(4)} y={top + 114} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>+</text>}
          {b && b.b !== null && digits(b.b, 1, WP_BLUE)}
          <rect x={wpBayC(4) - 24} y={top + 132} width={WPY.col * 5} height={3} rx={1.5} fill={C.ink} />
          {b && b.c !== null && digits(b.c, 2, WP_GREEN, b.shown)}
          {b && b.tag && b.shown > 0 && <text x={WPR.x + 16} y={top + 164} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(b.tag)}</text>}
          {pr.free && [100, 1000].map((m, i) => (
            <Key key={m} id={"add-" + m} label={lang === "hi" ? indian(m) + " जोड़ो" : lang === "gu" ? indian(m) + " ઉમેરો" : "Add " + indian(m)} x={WPR.x + i * 229} y={top + WPY.h + 12} w={217} h={72} C={C}
              primary={!!(b && b.a !== null && b.c === null)} onClick={() => freeBuild(m)}>
              <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={b && b.a !== null && b.c === null ? "#FFFFFF" : C.ink}>{"+ " + indian(m)}</text>
            </Key>
          ))}
        </g>
      );
    }
    return null;
  };

  /* the running count: what is being asked, once a question card has said it */
  /* on the choice item that child never picked a card: an empty card slot, no words (the words would echo the choice) */
  const runsLabel = pr.free ? (lang === "hi" ? `चार्ट पर ${S.mat.length}` : lang === "gu" ? `ચાર્ટ પર ${S.mat.length}` : S.mat.length + " on the mat")
    : S.picked && asked ? tx(asked[1]) : why ? "" : tx("What is asked?");
  const runsBadge = !pr.free && S.picked && !!asked;
  const runsSize = wpMeasure(runsLabel, T.label, 600) <= 330 - (runsBadge ? 76 : 36) ? T.label : T.micro;

  const ghost = drag.drag && drag.drag.moved && canAct && (S.picked || free) ? drag.drag : null;

  return (
    <g>
      <style>{WP_CSS}</style>

      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        {runsBadge && <circle cx={36} cy={-56} r={20} fill={C.accent} />}
        {runsBadge && <text x={36} y={-46} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF">?</text>}
        {why && !S.picked && <rect x={16} y={-84} width={298} height={56} rx={14} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} strokeDasharray="9 7" />}
        {runsLabel && <text key={runsLabel} className={runsBadge ? "wp-in" : ""} x={runsBadge ? 66 : 18} y={-56 + runsSize * 0.36} fontSize={runsSize} fontWeight={600} fill={C.ink}>{runsLabel}</text>}
      </g>

      {drawBoard()}
      {drawMat()}
      {drawRight()}

      {S.fly && (
        <g className="wp-fly" style={{ transform: `translate(${S.fly.x}px, ${S.fly.y}px)` } as any} pointerEvents="none">
          {cardArt(0, 0, S.fly.v, { lift: true, built: S.fly.built })}
        </g>
      )}
      {ghost && (() => {
        const pay = ghost.payload;
        if (pay.src === "desc") {
          const d = wpDescs(pr).find((x: any) => x.id === pay.id);
          const w = wpMeasure(d ? tx(d.text) : "", T.label, 600) + 36;
          return (
            <g pointerEvents="none" filter="url(#fLift)">
              <rect x={ghost.x - w / 2} y={ghost.y - 28} width={w} height={56} rx={14} fill={tint(WP_AMBER, 0.7)} stroke={shade(WP_AMBER, 0.35)} strokeWidth={3} strokeDasharray="9 6" />
              <text x={ghost.x} y={ghost.y + 11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{d ? tx(d.text) : ""}</text>
            </g>
          );
        }
        const v = val(S, pay.id);
        return v === null ? null : <g pointerEvents="none">{cardArt(ghost.x, ghost.y, v, { lift: true })}</g>;
      })()}

    </g>
  );
}

/* the summary page's small drawing: a tiny mat of the child's last problem. Each addend is a row of digit
   cells, right-aligned as on the mat; a built one keeps its dashed edge. Under the rule, the child's total.
   (Digits of the addends would fall below the 28-unit type floor at this size, so the rows are drawn.) */
function Thumb({ n, result, C, w, h, tx = (v: any) => v }: any) {
  const L = (result && result.last) || {};
  const ph = PHASES[(n || 1) - 1];
  const it = ph && ph.items ? ph.items[L.item] : null;
  const v = leadNumber(L.value);
  if (v === null || v === undefined || !it || !it.qid || it.kind === "why") {
    return (
      <g>
        <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
        <circle cx={34} cy={h / 2} r={18} fill={C.accent} />
        <text x={34} y={h / 2 + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF">?</text>
        <text x={62} y={h / 2 + 10} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("what is asked")}</text>
      </g>
    );
  }
  const pr = wpProb(it.qid);
  const toks = wpToks(pr, null);
  const valueOf = (id: string): number => { const t = toks.find((x: any) => x.id === id); return !t ? 0 : t.t === "num" ? t.v : valueOf(t.from) + t.more; };
  const rows = pr.need.map((id: string) => ({ d: String(valueOf(id)).length, built: (toks.find((x: any) => x.id === id) || {}).t === "desc" }));
  /* the mat on the left: addend rows right-aligned, the rule, the sum row; the total written beside it */
  const cell = 15, right = 100, top = 7, ruleY = h - 26, pitch = (ruleY - 4 - top) / Math.max(rows.length, 1), bh = Math.min(15, pitch - 4);
  const blue = CONTENT.hundred, green = CONTENT.one, dSum = String(v).length;
  const cells = (x0: number, y: number, d: number, hh: number) => Array.from({ length: d - 1 }).map((_, k) => (
    <line key={k} x1={x0 - (k + 1) * cell} y1={y + 2} x2={x0 - (k + 1) * cell} y2={y + hh - 2} stroke="#FFFFFF" strokeWidth={1.4} />
  ));
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {rows.map((r: any, i: number) => {
        const y = top + i * pitch + (pitch - bh) / 2;
        return (
          <g key={i}>
            <rect x={right - r.d * cell} y={y} width={r.d * cell} height={bh} rx={3} fill={r.built ? "#FFFFFF" : tint(blue, 0.45)}
              stroke={r.built ? C.accent : shade(blue, 0.1)} strokeWidth={r.built ? 2 : 1.2} strokeDasharray={r.built ? "4 3" : undefined} />
            {!r.built && cells(right, y, r.d, bh)}
          </g>
        );
      })}
      <rect x={right - 6 * cell} y={ruleY} width={6 * cell} height={3} rx={1.5} fill={C.ink} />
      <rect x={right - dSum * cell} y={ruleY + 7} width={dSum * cell} height={14} rx={3} fill={tint(green, 0.35)} stroke={shade(green, 0.1)} strokeWidth={1.2} />
      {cells(right, ruleY + 7, dSum, 14)}
      <text x={w - 12} y={h / 2 + 12} textAnchor="end" fontSize={T.label} fontWeight={700} fill={shade(green, 0.25)}>{indian(v)}</text>
    </g>
  );
}

function WordProblemWorkshop(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format: wpFormat, fitHost: () => null }} />
  );
}

export default WordProblemWorkshop;
