/* ═══ M1.S2.T3.C8.2D1 · shortcut_bench · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "shortcut_bench";
const MEDIA_ID = "M1.S2.T3.C8.2D1";
const TOOL_NAME = "Shortcut Bench";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["The same cards in both trays, arranged two different ways. Work them both."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "You changed the arrangement every single time, and the product never moved.";
/* said when the child opens Free play (the plan's line names every object; free play here is the zeros rail) */
const FREE_LINE = "Free play. Pick a number and send it along the zeros rail.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r13+: `lineFor(line, lang, TR)`); the
   English above and below stays what the checks read. NCERT class 4 terms: गुण्य गुणक गुणनफल /
   ગુણ્ય ગુણક ગુણાકાર. Digits stay digits: the runtime speaks them in the language in use. A line of
   only numbers and signs ("5,307 × 1?") needs no entry. A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Shortcut Bench": "छोटे तरीकों की मेज़",
    "The same cards in both trays, arranged two different ways. Work them both.": "दोनों ट्रे में वही कार्ड हैं, दो अलग तरह से रखे। दोनों को हल करो।",
    "You changed the arrangement every single time, and the product never moved.": "तुमने हर बार क्रम बदला, और गुणनफल कभी नहीं बदला।",
    "Free play. Pick a number and send it along the zeros rail.": "मुक्त खेल। एक संख्या चुनो और उसे शून्यों की पटरी पर भेजो।",
    "One leaves it alone and zero flattens it": "एक संख्या नहीं बदलता, शून्य उसे मिटा देता है",
    "Take the number once. Now take it no times at all. What came back each time?": "संख्या को एक बार लो। अब उसे एक बार भी मत लो। हर बार क्या वापस आया?",
    "What is left when a number is taken no times at all?": "जब संख्या एक बार भी नहीं ली जाती, तो क्या बचता है?",
    "Think of 12 × 1 and 12 × 0 first. Then do the same with this number.": "पहले 12 × 1 और 12 × 0 सोचो। फिर इस संख्या के साथ भी वैसा ही करो।",
    "Multiplying by one gives the number back unchanged, and multiplying by zero gives zero.": "एक से गुणा करने पर वही संख्या मिलती है, और शून्य से गुणा करने पर शून्य।",
    "You learned: times one gives the number back; times zero gives zero.": "तुमने सीखा: एक से गुणा पर वही संख्या, शून्य से गुणा पर शून्य।",
    "4,826 × 1, then × 0?": "4,826 × 1, फिर × 0?",
    "What is 4,826 × 1? And what is 4,826 × 0? Pick your answer, then drop each card into a tray.": "4,826 × 1 कितना है? और 4,826 × 0 कितना है? अपना उत्तर चुनो, फिर हर कार्ड एक ट्रे में डालो।",
    "How many times does the zero card take the number?": "शून्य वाला कार्ड संख्या को कितनी बार लेता है?",
    "What is 5,307 × 1? Type it, then drop the card into the tray.": "5,307 × 1 कितना है? लिखो, फिर कार्ड को ट्रे में डालो।",
    "The one card takes the number just once. What comes back?": "एक वाला कार्ड संख्या को सिर्फ़ एक बार लेता है। क्या वापस आता है?",
    "What is 6,941 × 0? Type it first, then let the zero card fall in.": "6,941 × 0 कितना है? पहले लिखो, फिर शून्य वाला कार्ड गिरने दो।",
    "The zero card asks for zero groups of the number. What does the ledge hold then?": "शून्य वाला कार्ड संख्या के शून्य समूह माँगता है। तब नीचे की पट्टी पर क्या रहता है?",
    "The order is yours to choose": "क्रम तुम खुद चुन सकते हो",
    "Swap them over, then work both trays. Did the product move?": "इनकी अदला-बदली करो, फिर दोनों ट्रे हल करो। क्या गुणनफल बदला?",
    "What does changing their order do to the product?": "उनका क्रम बदलने से गुणनफल पर क्या असर होता है?",
    "Pick the arrangement that is easiest to work. Then multiply it one step at a time.": "वह क्रम चुनो जो हल करने में सबसे आसान हो। फिर एक-एक कदम गुणा करो।",
    "Swapping the numbers, or bracketing a different pair, leaves the product alone. So pick the arrangement you would rather work.": "संख्याओं की अदला-बदली से, या दूसरी जोड़ी पर कोष्ठक लगाने से, गुणनफल नहीं बदलता। तो जो क्रम आसान लगे, वही चुनो।",
    "You learned: order and grouping never change the product.": "तुमने सीखा: क्रम और समूह बदलने से गुणनफल कभी नहीं बदलता।",
    "Find 6 × 427": "6 × 427 निकालो",
    "Find 6 × 427 by changing the order of the two numbers. Tap a card to swap them.": "दोनों संख्याओं का क्रम बदलकर 6 × 427 निकालो। अदला-बदली के लिए एक कार्ड पर टैप करो।",
    "Put 427 on top. When 7 × 6 makes 42, where do the 4 tens go?": "427 को ऊपर रखो। जब 7 × 6 से 42 बनता है, तो 4 दहाई कहाँ जाती हैं?",
    "Find 8 × 312": "8 × 312 निकालो",
    "Find 8 × 312 by putting the longer number on the mat first.": "लंबी संख्या को पहले ऊपर रखकर 8 × 312 निकालो।",
    "With 312 on top, 2 × 8 makes 16. Which column does its 1 ten go to?": "312 ऊपर हो, तो 2 × 8 से 16 बनता है। उसकी 1 दहाई किस स्तंभ में जाती है?",
    "Find 372 × 5 × 20 by pairing two of the numbers first. Tap a sign to bracket a pair, then type what it makes.": "पहले दो संख्याओं की जोड़ी बनाकर 372 × 5 × 20 निकालो। कोष्ठक के लिए चिह्न पर टैप करो, फिर जो बने वह लिखो।",
    "Which two cards make a round number? Count the zeros it brings.": "कौन से दो कार्ड मिलकर शून्य वाली संख्या बनाते हैं? उसके शून्य गिनो।",
    "A number can be broken up before it is multiplied": "गुणा से पहले संख्या को तोड़ा जा सकता है",
    "Break it into its places. Multiply each piece. Now put the pieces back together.": "इसे स्थानों में तोड़ो। हर टुकड़े का गुणा करो। अब टुकड़ों को फिर से जोड़ो।",
    "What has to happen to every one of those parts?": "उन सभी हिस्सों के साथ क्या होना चाहिए?",
    "Take every part with the whole multiplier. Then add all the rows together.": "हर हिस्से को पूरे गुणक से गुणा करो। फिर सारी पंक्तियाँ जोड़ो।",
    "Break the multiplicand into its places, multiply every one of those places, and add the parts.": "गुण्य को स्थानों में तोड़ो, हर स्थान का गुणा करो, और हिस्सों को जोड़ो।",
    "You learned: break a number into places, multiply each, then add.": "तुमने सीखा: संख्या को स्थानों में तोड़ो, हर एक का गुणा करो, फिर जोड़ो।",
    "Expand the multiplicand and find 348 × 6. Drop the 6 card on a part, then type what that part makes.": "गुण्य को स्थानों में तोड़कर 348 × 6 निकालो। 6 का कार्ड एक हिस्से पर डालो, फिर उसका गुणनफल लिखो।",
    "Did the 300, the 40 and the 8 each get a row in the total?": "क्या 300, 40 और 8, हर एक की कुल में अपनी पंक्ति है?",
    "Find 526 × 4 the same way, one part at a time.": "526 × 4 इसी तरह निकालो, एक बार में एक हिस्सा।",
    "Add all three rows. Did the 20 and the 6 go into your total too?": "तीनों पंक्तियाँ जोड़ो। क्या 20 और 6 भी तुम्हारे कुल में गए?",
    "Another way to find 48 × 9?": "48 × 9 निकालने का दूसरा तरीका?",
    "Which is another way to find 48 × 9? Tap the 48 to break it, then pick on the pad.": "48 × 9 निकालने का दूसरा तरीका कौन सा है? 48 को तोड़ने के लिए उस पर टैप करो, फिर पैड पर चुनो।",
    "Does that way take the 8 as well as the 40?": "क्या वह तरीका 40 के साथ 8 को भी लेता है?",
    "Zeros at the end do the work for you": "आखिर के शून्य तुम्हारा काम कर देते हैं",
    "Drop the × 10 card on the rail, then the × 100 card. Say how many zeros will follow first.": "× 10 वाला कार्ड पटरी पर डालो, फिर × 100 वाला। पहले बताओ कि कितने शून्य आएँगे।",
    "Ten brought one zero, and a hundred brought two.": "दस से एक शून्य आया, और सौ से दो।",
    "The digits 4, 7 and 3 never changed. They only moved left.": "अंक 4, 7 और 3 कभी नहीं बदले। वे बस बाईं ओर खिसके।",
    "Where do those zeros go once the short fact has been worked?": "छोटा गुणा हल होने के बाद वे शून्य कहाँ जाते हैं?",
    "Work the short fact first. Then count the zeros the multiplier carries.": "पहले छोटा गुणा हल करो। फिर गुणक के शून्य गिनो।",
    "Use the short fact first, then write as many zeros as the multiplier carries.": "पहले छोटा गुणा करो, फिर गुणक में जितने शून्य हैं उतने लिखो।",
    "You learned: short fact first, then the multiplier's zeros.": "तुमने सीखा: पहले छोटा गुणा, फिर गुणक के शून्य।",
    "Now find 473 × 4,000. Type it, then drop the card on the rail.": "अब 473 × 4,000 निकालो। लिखो, फिर कार्ड को पटरी पर डालो।",
    "How many zeros are printed in 4,000?": "4,000 में कितने शून्य छपे हैं?",
    "Find 264 × 700. Type the product first, then send the card along.": "264 × 700 निकालो। पहले गुणनफल लिखो, फिर कार्ड आगे भेजो।",
    "What is 264 × 7? Then how many zeros does 700 carry?": "264 × 7 कितना है? फिर 700 में कितने शून्य हैं?",
    "Tablets in the carton?": "डिब्बे में कितनी गोलियाँ?",
    "A strip holds 20 tablets and a carton holds 300 such strips. How many tablets are in the carton?": "एक पत्ते में 20 गोलियाँ हैं और एक डिब्बे में ऐसे 300 पत्ते हैं। डिब्बे में कितनी गोलियाँ हैं?",
    "Count the zeros in 20 and in 300 together.": "20 और 300 के शून्य एक साथ गिनो।",
    /* the working area's own words */
    "1 group": "1 समूह", "no groups": "कोई समूह नहीं", "worked": "हल हुए",
    "1 zero": "1 शून्य", "2 zeros": "2 शून्य", "3 zeros": "3 शून्य", "4 zeros": "4 शून्य", "5 zeros": "5 शून्य",
    "ones": "इकाई", "tens": "दहाई", "hundreds": "सैकड़ा", "thousands": "हज़ार", "ten thousands": "दस हज़ार", "lakhs": "लाख", "ten lakhs": "दस लाख",
    "Home": "वापस", "Walk the digits home": "अंकों को वापस लाओ",
    "× 1 and × 0": "× 1 और × 0",
  },
  gu: {
    "Shortcut Bench": "ટૂંકી રીતોનું ટેબલ",
    "The same cards in both trays, arranged two different ways. Work them both.": "બંને ટ્રેમાં એ જ કાર્ડ છે, બે જુદી રીતે ગોઠવેલાં. બંને ઉકેલો.",
    "You changed the arrangement every single time, and the product never moved.": "તમે દર વખતે ગોઠવણી બદલી, અને ગુણાકાર ક્યારેય ન બદલાયો.",
    "Free play. Pick a number and send it along the zeros rail.": "મુક્ત રમત. એક સંખ્યા પસંદ કરો અને તેને શૂન્યોના પાટા પર મોકલો.",
    "One leaves it alone and zero flattens it": "એક સંખ્યા બદલતો નથી, શૂન્ય તેને ભૂંસી નાખે છે",
    "Take the number once. Now take it no times at all. What came back each time?": "સંખ્યાને એક વાર લો. હવે તેને એક પણ વાર ન લો. દર વખતે શું પાછું આવ્યું?",
    "What is left when a number is taken no times at all?": "સંખ્યા એક પણ વાર ન લેવાય, તો શું બચે?",
    "Think of 12 × 1 and 12 × 0 first. Then do the same with this number.": "પહેલાં 12 × 1 અને 12 × 0 વિચારો. પછી આ સંખ્યા સાથે પણ એમ જ કરો.",
    "Multiplying by one gives the number back unchanged, and multiplying by zero gives zero.": "એક વડે ગુણતાં એ જ સંખ્યા મળે છે, અને શૂન્ય વડે ગુણતાં શૂન્ય.",
    "You learned: times one gives the number back; times zero gives zero.": "તમે શીખ્યા: એક વડે ગુણતાં એ જ સંખ્યા, શૂન્ય વડે ગુણતાં શૂન્ય.",
    "4,826 × 1, then × 0?": "4,826 × 1, પછી × 0?",
    "What is 4,826 × 1? And what is 4,826 × 0? Pick your answer, then drop each card into a tray.": "4,826 × 1 કેટલા? અને 4,826 × 0 કેટલા? જવાબ પસંદ કરો, પછી દરેક કાર્ડ ટ્રેમાં નાખો.",
    "How many times does the zero card take the number?": "શૂન્યનું કાર્ડ સંખ્યાને કેટલી વાર લે છે?",
    "What is 5,307 × 1? Type it, then drop the card into the tray.": "5,307 × 1 કેટલા? લખો, પછી કાર્ડ ટ્રેમાં નાખો.",
    "The one card takes the number just once. What comes back?": "એકનું કાર્ડ સંખ્યાને ફક્ત એક વાર લે છે. શું પાછું આવે છે?",
    "What is 6,941 × 0? Type it first, then let the zero card fall in.": "6,941 × 0 કેટલા? પહેલાં લખો, પછી શૂન્યનું કાર્ડ પડવા દો.",
    "The zero card asks for zero groups of the number. What does the ledge hold then?": "શૂન્યનું કાર્ડ સંખ્યાનાં શૂન્ય જૂથ માગે છે. ત્યારે નીચેની પટ્ટી પર શું રહે છે?",
    "The order is yours to choose": "ક્રમ તમે જાતે પસંદ કરી શકો છો",
    "Swap them over, then work both trays. Did the product move?": "તેમની અદલાબદલી કરો, પછી બંને ટ્રે ઉકેલો. શું ગુણાકાર બદલાયો?",
    "What does changing their order do to the product?": "તેમનો ક્રમ બદલવાથી ગુણાકાર પર શી અસર થાય છે?",
    "Pick the arrangement that is easiest to work. Then multiply it one step at a time.": "જે ગોઠવણી ઉકેલવામાં સૌથી સહેલી હોય તે પસંદ કરો. પછી એક-એક પગલે ગુણાકાર કરો.",
    "Swapping the numbers, or bracketing a different pair, leaves the product alone. So pick the arrangement you would rather work.": "સંખ્યાઓની અદલાબદલીથી, કે બીજી જોડીને કૌંસમાં મૂકવાથી, ગુણાકાર બદલાતો નથી. તો જે ગોઠવણી સહેલી લાગે, તે પસંદ કરો.",
    "You learned: order and grouping never change the product.": "તમે શીખ્યા: ક્રમ અને જૂથ બદલવાથી ગુણાકાર ક્યારેય બદલાતો નથી.",
    "Find 6 × 427": "6 × 427 શોધો",
    "Find 6 × 427 by changing the order of the two numbers. Tap a card to swap them.": "બંને સંખ્યાનો ક્રમ બદલીને 6 × 427 શોધો. અદલાબદલી માટે એક કાર્ડ પર ટૅપ કરો.",
    "Put 427 on top. When 7 × 6 makes 42, where do the 4 tens go?": "427 ને ઉપર મૂકો. જ્યારે 7 × 6 થી 42 બને, ત્યારે 4 દશક ક્યાં જાય છે?",
    "Find 8 × 312": "8 × 312 શોધો",
    "Find 8 × 312 by putting the longer number on the mat first.": "લાંબી સંખ્યાને પહેલાં ઉપર મૂકીને 8 × 312 શોધો.",
    "With 312 on top, 2 × 8 makes 16. Which column does its 1 ten go to?": "312 ઉપર હોય, તો 2 × 8 થી 16 બને. તેનો 1 દશક કયા સ્તંભમાં જાય છે?",
    "Find 372 × 5 × 20 by pairing two of the numbers first. Tap a sign to bracket a pair, then type what it makes.": "પહેલાં બે સંખ્યાની જોડી બનાવીને 372 × 5 × 20 શોધો. કૌંસ માટે ચિહ્ન પર ટૅપ કરો, પછી જે બને તે લખો.",
    "Which two cards make a round number? Count the zeros it brings.": "કયાં બે કાર્ડ મળીને શૂન્યવાળી સંખ્યા બનાવે છે? તેના શૂન્ય ગણો.",
    "A number can be broken up before it is multiplied": "ગુણાકાર પહેલાં સંખ્યાને તોડી શકાય છે",
    "Break it into its places. Multiply each piece. Now put the pieces back together.": "તેને સ્થાનોમાં તોડો. દરેક ટુકડાનો ગુણાકાર કરો. હવે ટુકડા પાછા જોડો.",
    "What has to happen to every one of those parts?": "તે દરેક ભાગ સાથે શું થવું જોઈએ?",
    "Take every part with the whole multiplier. Then add all the rows together.": "દરેક ભાગને આખા ગુણકથી ગુણો. પછી બધી હાર ઉમેરો.",
    "Break the multiplicand into its places, multiply every one of those places, and add the parts.": "ગુણ્યને સ્થાનોમાં તોડો, દરેક સ્થાનનો ગુણાકાર કરો, અને ભાગો ઉમેરો.",
    "You learned: break a number into places, multiply each, then add.": "તમે શીખ્યા: સંખ્યાને સ્થાનોમાં તોડો, દરેકનો ગુણાકાર કરો, પછી ઉમેરો.",
    "Expand the multiplicand and find 348 × 6. Drop the 6 card on a part, then type what that part makes.": "ગુણ્યને સ્થાનોમાં તોડીને 348 × 6 શોધો. 6 નું કાર્ડ એક ભાગ પર મૂકો, પછી તેનો ગુણાકાર લખો.",
    "Did the 300, the 40 and the 8 each get a row in the total?": "શું 300, 40 અને 8, દરેકની કુલમાં પોતાની હાર છે?",
    "Find 526 × 4 the same way, one part at a time.": "526 × 4 એ જ રીતે શોધો, એક વખતે એક ભાગ.",
    "Add all three rows. Did the 20 and the 6 go into your total too?": "ત્રણેય હાર ઉમેરો. શું 20 અને 6 પણ તમારા કુલમાં ગયા?",
    "Another way to find 48 × 9?": "48 × 9 શોધવાની બીજી રીત?",
    "Which is another way to find 48 × 9? Tap the 48 to break it, then pick on the pad.": "48 × 9 શોધવાની બીજી રીત કઈ? 48 ને તોડવા તેના પર ટૅપ કરો, પછી પૅડ પર પસંદ કરો.",
    "Does that way take the 8 as well as the 40?": "શું તે રીત 40 સાથે 8 ને પણ લે છે?",
    "Zeros at the end do the work for you": "છેલ્લે આવતા શૂન્ય તમારું કામ કરી દે છે",
    "Drop the × 10 card on the rail, then the × 100 card. Say how many zeros will follow first.": "× 10 નું કાર્ડ પાટા પર મૂકો, પછી × 100 નું. પહેલાં કહો કે કેટલા શૂન્ય આવશે.",
    "Ten brought one zero, and a hundred brought two.": "દસથી એક શૂન્ય આવ્યો, અને સોથી બે.",
    "The digits 4, 7 and 3 never changed. They only moved left.": "અંક 4, 7 અને 3 ક્યારેય ન બદલાયા. તે ફક્ત ડાબી બાજુ ખસ્યા.",
    "Where do those zeros go once the short fact has been worked?": "નાનો ગુણાકાર ઉકેલાઈ જાય પછી તે શૂન્ય ક્યાં જાય છે?",
    "Work the short fact first. Then count the zeros the multiplier carries.": "પહેલાં નાનો ગુણાકાર ઉકેલો. પછી ગુણકના શૂન્ય ગણો.",
    "Use the short fact first, then write as many zeros as the multiplier carries.": "પહેલાં નાનો ગુણાકાર કરો, પછી ગુણકમાં જેટલા શૂન્ય છે તેટલા લખો.",
    "You learned: short fact first, then the multiplier's zeros.": "તમે શીખ્યા: પહેલાં નાનો ગુણાકાર, પછી ગુણકના શૂન્ય.",
    "Now find 473 × 4,000. Type it, then drop the card on the rail.": "હવે 473 × 4,000 શોધો. લખો, પછી કાર્ડ પાટા પર મૂકો.",
    "How many zeros are printed in 4,000?": "4,000 માં કેટલા શૂન્ય છાપેલા છે?",
    "Find 264 × 700. Type the product first, then send the card along.": "264 × 700 શોધો. પહેલાં ગુણાકાર લખો, પછી કાર્ડ આગળ મોકલો.",
    "What is 264 × 7? Then how many zeros does 700 carry?": "264 × 7 કેટલા? પછી 700 માં કેટલા શૂન્ય છે?",
    "Tablets in the carton?": "ખોખામાં કેટલી ગોળીઓ?",
    "A strip holds 20 tablets and a carton holds 300 such strips. How many tablets are in the carton?": "એક પટ્ટીમાં 20 ગોળીઓ છે અને એક ખોખામાં આવી 300 પટ્ટીઓ છે. ખોખામાં કેટલી ગોળીઓ છે?",
    "Count the zeros in 20 and in 300 together.": "20 અને 300 ના શૂન્ય સાથે ગણો.",
    /* the working area's own words */
    "1 group": "1 જૂથ", "no groups": "કોઈ જૂથ નહીં", "worked": "ઉકેલ્યા",
    "1 zero": "1 શૂન્ય", "2 zeros": "2 શૂન્ય", "3 zeros": "3 શૂન્ય", "4 zeros": "4 શૂન્ય", "5 zeros": "5 શૂન્ય",
    "ones": "એકમ", "tens": "દશક", "hundreds": "શતક", "thousands": "હજાર", "ten thousands": "દસ હજાર", "lakhs": "લાખ", "ten lakhs": "દસ લાખ",
    "Home": "પાછા", "Walk the digits home": "અંકોને પાછા લાવો",
    "× 1 and × 0": "× 1 અને × 0",
  },
};

/* ── the bench ───────────────────────────────────────────────────────────────────────────
   kinds  onezero · one · zero   phase 1: say what the tray will give, then drop the card in and watch
          order · group          phase 2: two trays of the same cards; swap or bracket, then type the product
          expand · which         phase 3: the expand strip; the multiplier takes every part, the rows add back
          rail                   phase 4: say the product, then drop the multiplier on the zeros rail
          demo · free            phase 4's worked start (× 10, then × 100) and Free play
   Colours are the chapter's own: multiplicand deep blue, multiplier amber, product green, a carry
   vermilion in a ring above its column, a partial product rose, a zero holding a place grey. */

const SB_COL: Record<string, string> = { blue: CONTENT.hundred, amber: CONTENT.ten, green: CONTENT.one, rose: CONTENT.bead, verm: CONTENT.pointer };
const SB_INK: Record<string, string> = { blue: shade(CONTENT.hundred, 0.25), amber: shade(CONTENT.ten, 0.4), green: shade(CONTENT.one, 0.25), rose: shade(CONTENT.bead, 0.35), verm: shade(CONTENT.pointer, 0.25) };
const SB_GREY = "#767676";
const SB_PLACES = ["ones", "tens", "hundreds", "thousands", "ten thousands", "lakhs", "ten lakhs"];
const SB_PREDICT: Record<string, boolean> = { onezero: true, one: true, zero: true, rail: true };
const SB_FREE = [473, 26, 5307, 8];
/* pairs as "× 1 gives & × 0 gives": at most 13 characters, so the slot's caret stays inside the slot */
const SB_OZ = ["4,826 & 0", "4,826 & 4,826", "0 & 0", "1 & 0"].map((s) => ({ id: s, label: s }));
/* the distractor is the plan's first mistake: stopping after one part */
const SB_WHICH = ["(40×9) + (8×9)", "40×9"].map((s) => ({ id: s, label: s }));

/* text width estimate in stage units (digits are tabular) */
const sbW = (s: any, size: number) => {
  let w = 0;
  for (const ch of String(s)) w += /\d/.test(ch) ? 0.64 : ch === "," || ch === " " ? 0.3 : ch === "(" || ch === ")" ? 0.36 : 0.62;
  return w * size;
};
const sbCardW = (s: string) => Math.max(112, Math.round(sbW(s, T.xl) + 36));
/* 348 -> [300, 40, 8] (a zero place gives no part) */
const sbParts = (a: number) => { const s = String(a), out: number[] = []; for (let i = 0; i < s.length; i++) if (s[i] !== "0") out.push(Number(s[i]) * Math.pow(10, s.length - 1 - i)); return out; };
/* 4000 -> { core: 4, z: 3 } */
const sbSplit = (v: number) => { let core = v, z = 0; while (core > 0 && core % 10 === 0) { core /= 10; z++; } return { core, z }; };
const sbIsRound = (v: number) => String(v).replace(/0+$/, "").length === 1;
const sbRoundPair = (t: number[]) => (sbIsRound(t[0] * t[1]) ? 0 : 1);
const sbChoice = (item: any, v: any) => {
  const c = (item.choices || []).find((x: any) => x.id === String(v) || String(x.label).toLowerCase() === String(v ?? "").trim().toLowerCase());
  return c ? c.id : null;
};
/* the question as a short sum (for the summary drawing; never the answer) */
const sbEqOf = (it: any) => {
  if (!it) return "";
  const k = it.kind;
  if (k === "onezero") return "× 1 and × 0";
  if (k === "one" || k === "zero") return indian(it.num) + " × " + (k === "one" ? 1 : 0);
  if (k === "order" || k === "group") return it.terms.map((t: number) => indian(t)).join(" × ");
  if (k === "expand" || k === "which") return indian(it.a) + " × " + it.m;
  if (k === "rail") return indian(it.a) + " × " + indian(it.b);
  return "";
};
/* 427 × 6 with every carry dropped (2422): the slip the column method is there to stop */
const sbNoCarry = (L: number, s: number) => {
  const ds = String(L).split("").reverse().map(Number);
  let out = "";
  ds.forEach((d, k) => { const p = d * s; out = (k === ds.length - 1 ? String(p) : String(p % 10)) + out; });
  return Number(out);
};

/* One entry per phase = one mount. */
const PHASES = [
  {
    n: 1,
    concept: "One leaves it alone and zero flattens it",
    conceptId: "M1.S2.T3.C8", objectiveIds: ["O3","O4"],
    says: ["Take the number once. Now take it no times at all. What came back each time?"],
    /* rung 3 as the plan writes it cuts the tray to a two digit number; the voice gives that small case */
    ladder: ["What is left when a number is taken no times at all?", "Think of 12 × 1 and 12 × 0 first. Then do the same with this number."],
    closing: "Multiplying by one gives the number back unchanged, and multiplying by zero gives zero.",
    learned: "You learned: times one gives the number back; times zero gives zero.",
    traceback: "The cards drop again, slowly: the one card sends one group of the number down to the ledge, the zero card sends no group and the tray empties, and each product is written out in full.",
    items: [
      /* learn ML1: answer in the plan = 4826 and 0 (two answers: a choice of pairs, then both cards dropped) */
      { qid: "M1.S2.T3.C8:ML1", kind: "onezero", num: 4826, choices: SB_OZ, answer: "4,826 & 0", winMs: 1400, ask: "4,826 × 1, then × 0?",
        say: "What is 4,826 × 1? And what is 4,826 × 0? Pick your answer, then drop each card into a tray.", miss: "How many times does the zero card take the number?" },
      /* practice 1: answer in the plan = 5307 */
      { qid: "M1.S2.T3.C8:1", kind: "one", num: 5307, answer: 5307, winMs: 1400, ask: "5,307 × 1?",
        say: "What is 5,307 × 1? Type it, then drop the card into the tray.", miss: "The one card takes the number just once. What comes back?" },
      /* practice 2: answer in the plan = 0 */
      { qid: "M1.S2.T3.C8:2", kind: "zero", num: 6941, answer: 0, winMs: 1400, ask: "6,941 × 0?",
        say: "What is 6,941 × 0? Type it first, then let the zero card fall in.", miss: "The zero card asks for zero groups of the number. What does the ledge hold then?" },
    ],
  },
  {
    n: 2,
    concept: "The order is yours to choose",
    conceptId: "M1.S2.T3.C9", objectiveIds: ["O3"],
    says: ["Swap them over, then work both trays. Did the product move?"],
    ladder: ["What does changing their order do to the product?", "Pick the arrangement that is easiest to work. Then multiply it one step at a time."],
    closing: "Swapping the numbers, or bracketing a different pair, leaves the product alone. So pick the arrangement you would rather work.",
    learned: "You learned: order and grouping never change the product.",
    traceback: "Both trays are worked on their own arrangements, slowly, every step drawn: the long number on the mat in one row with its carries, the short one on the mat in a row per place (or each grouping in two lines); the two products land side by side and match.",
    items: [
      /* learn ML2: answer in the plan = 2562 */
      { qid: "M1.S2.T3.C9:ML2", kind: "order", terms: [6, 427], answer: 2562, winMs: 4200, ask: "Find 6 × 427",
        say: "Find 6 × 427 by changing the order of the two numbers. Tap a card to swap them.", miss: "Put 427 on top. When 7 × 6 makes 42, where do the 4 tens go?" },
      /* practice 3: answer in the plan = 2496 */
      { qid: "M1.S2.T3.C9:3", kind: "order", terms: [8, 312], answer: 2496, winMs: 4200, ask: "Find 8 × 312",
        say: "Find 8 × 312 by putting the longer number on the mat first.", miss: "With 312 on top, 2 × 8 makes 16. Which column does its 1 ten go to?" },
      /* practice 4: answer in the plan = 37,200, by multiplying 5 and 20 first to make 100 */
      { qid: "M1.S2.T3.C9:4", kind: "group", terms: [372, 5, 20], answer: 37200, winMs: 4000, ask: "372 × 5 × 20?",
        say: "Find 372 × 5 × 20 by pairing two of the numbers first. Tap a sign to bracket a pair, then type what it makes.", miss: "Which two cards make a round number? Count the zeros it brings." },
    ],
  },
  {
    n: 3,
    concept: "A number can be broken up before it is multiplied",
    conceptId: "M1.S2.T3.C10", objectiveIds: ["O3"],
    says: ["Break it into its places. Multiply each piece. Now put the pieces back together."],
    ladder: ["What has to happen to every one of those parts?", "Take every part with the whole multiplier. Then add all the rows together."],
    closing: "Break the multiplicand into its places, multiply every one of those places, and add the parts.",
    learned: "You learned: break a number into places, multiply each, then add.",
    traceback: "The parts never taken are ringed, then the multiplier takes each of them in turn; the rows add to the total, and the whole number worked in its own column lands on the same product beside it.",
    items: [
      /* learn ML3: answer in the plan = 2088 */
      { qid: "M1.S2.T3.C10:ML3", kind: "expand", a: 348, m: 6, answer: 2088, winMs: 3400, ask: "348 × 6?",
        say: "Expand the multiplicand and find 348 × 6. Drop the 6 card on a part, then type what that part makes.", miss: "Did the 300, the 40 and the 8 each get a row in the total?" },
      /* practice 5: answer in the plan = 2104, because 2000 + 80 + 24 = 2104 */
      { qid: "M1.S2.T3.C10:5", kind: "expand", a: 526, m: 4, answer: 2104, winMs: 3400, ask: "526 × 4?",
        say: "Find 526 × 4 the same way, one part at a time.", miss: "Add all three rows. Did the 20 and the 6 go into your total too?" },
      /* practice 6: answer in the plan = (40 x 9) + (8 x 9), because it comes to 360 + 72 = 432, which is what 48 x 9 comes to */
      { qid: "M1.S2.T3.C10:6", kind: "which", a: 48, m: 9, choices: SB_WHICH, answer: "(40×9) + (8×9)", winMs: 3200, ask: "Another way to find 48 × 9?",
        say: "Which is another way to find 48 × 9? Tap the 48 to break it, then pick on the pad.", miss: "Does that way take the 8 as well as the 40?" },
    ],
  },
  {
    n: 4,
    concept: "Zeros at the end do the work for you",
    conceptId: "M1.S2.T3.C11", objectiveIds: ["O4"],
    says: ["Drop the × 10 card on the rail, then the × 100 card. Say how many zeros will follow first."],
    /* ML4's first two parts (473 × 10 and 473 × 100) are this worked start: the child sends the cards and watches */
    demo: { a: 473, cards: [10, 100] },
    demoLines: ["Ten brought one zero, and a hundred brought two.", "The digits 4, 7 and 3 never changed. They only moved left."],
    ladder: ["Where do those zeros go once the short fact has been worked?", "Work the short fact first. Then count the zeros the multiplier carries."],
    closing: "Use the short fact first, then write as many zeros as the multiplier carries.",
    learned: "You learned: short fact first, then the multiplier's zeros.",
    traceback: "The zeros of the numbers are ringed and counted one at a time, the short fact is worked above the rail, and then that many places open under its right hand end one at a time, each naming itself.",
    items: [
      /* learn ML4: answer in the plan = 4730, 47,300 and 18,92,000 (the first two are the rail's worked start) */
      { qid: "M1.S2.T3.C11:ML4", kind: "rail", a: 473, b: 4000, answer: 1892000, winMs: 1600, ask: "473 × 4,000?",
        say: "Now find 473 × 4,000. Type it, then drop the card on the rail.", miss: "How many zeros are printed in 4,000?" },
      /* practice 7: answer in the plan = 1,84,800, because 264 x 7 = 1848 and the multiplier carries two zeros */
      { qid: "M1.S2.T3.C11:7", kind: "rail", a: 264, b: 700, answer: 184800, winMs: 1600, ask: "264 × 700?",
        say: "Find 264 × 700. Type the product first, then send the card along.", miss: "What is 264 × 7? Then how many zeros does 700 carry?" },
      /* practice 8: answer in the plan = 6000 tablets, because 2 x 3 = 6 and the two numbers carry three zeros between them */
      { qid: "M1.S2.T3.C11:8", kind: "rail", a: 20, b: 300, answer: 6000, winMs: 1600, ask: "Tablets in the carton?",
        say: "A strip holds 20 tablets and a carton holds 300 such strips. How many tablets are in the carton?", miss: "Count the zeros in 20 and in 300 together." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  trays: { w: 500, h: 140, gap: 86, card: { minW: 112, h: 96 } },
  expandStrip: { rowPitch: 62, parts: "hundreds, tens and ones" },
  zerosRail: { places: SB_PLACES, cell: 150 },
  colours: { multiplicand: "deep blue", multiplier: "amber", product: "green", carry: "vermilion, small, in a ring above its column", partialProduct: "rose", placeHolder: "grey" },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a choice by its id or label; numbers compare as numbers */
const judge = (item: any, v: any) => {
  if (item.choices) { const id = sbChoice(item, v); return id !== null && id === item.answer; }
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};

/* oracle: every answer again by repeated addition (and the Indian commas by a regex), sharing no
   code with judge or the working area */
const sbAdd = (v: number, times: number) => { let s = 0; for (let i = 0; i < times; i++) s += v; return s; };
const sbCommaRe = (v: number) => String(v).replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const k = it.kind;
  if (k === "onezero") return it.answer === `${sbCommaRe(sbAdd(it.num, 1))} & ${sbAdd(it.num, 0)}`;
  if (k === "one") return it.answer === sbAdd(it.num, 1);
  if (k === "zero") return it.answer === sbAdd(it.num, 0);
  if (k === "order") return it.answer === sbAdd(it.terms[1], it.terms[0]) && it.answer === sbAdd(it.terms[0], it.terms[1]);
  if (k === "group") return it.answer === sbAdd(sbAdd(it.terms[0], it.terms[1]), it.terms[2]) && it.answer === sbAdd(it.terms[0], sbAdd(it.terms[1], it.terms[2]));
  if (k === "expand") return it.answer === sbAdd(it.a, it.m);
  if (k === "which") {
    const nums = (s: string) => (s.match(/\d+/g) || []).map(Number);
    const whole = sbAdd(it.a, it.m), [a, b, c, d] = nums(it.answer);
    const other = it.choices.find((x: any) => x.id !== it.answer), [e, f] = nums(other.id);
    return a + c === it.a && b === it.m && d === it.m && sbAdd(a, b) + sbAdd(c, d) === whole && sbAdd(e, f) !== whole;
  }
  if (k === "rail") return it.answer === sbAdd(it.a, it.b);
  return false;
}));

/* the most likely wrong answer (the item's misconception); judge must reject it */
const nearMiss = (item: any) => {
  const k = item.kind;
  if (k === "onezero") return `${indian(item.num)} & ${indian(item.num)}`;        /* zero treated the way one behaves */
  if (k === "one") return 0;                                                       /* both cards read in the same breath */
  if (k === "zero") return item.num;                                               /* zero treated the way one behaves */
  if (k === "order") { const [x, y] = item.terms; return String(x).length > String(y).length ? sbNoCarry(x, y) : sbNoCarry(y, x); }
  if (k === "group") return item.answer / 10;                                      /* a zero lost when the pair was made */
  if (k === "expand") return sbParts(item.a)[0] * item.m;                          /* only the hundreds taken */
  if (k === "which") return item.choices.find((c: any) => c.id !== item.answer).id; /* stops after one part */
  if (k === "rail") { const A = sbSplit(item.a), B = sbSplit(item.b), f = A.core * B.core; return A.z > 0 ? f * Math.pow(10, B.z) : f * 10; }
  return Number(item.answer) + 1;
};
/* the forms of an answer that no question, hint or ladder line may print. Times one hands the
   number back and times zero is the question's own 0, so for those the worked sum is the form. */
const answerForms = (item: any) => {
  const k = item.kind;
  if (k === "onezero") return [item.answer, `${item.num} & 0`, `${indian(item.num)} and 0`, `${item.num} and 0`];
  if (k === "one" || k === "zero") { const c = k === "one" ? 1 : 0; return [`${indian(item.num)} × ${c} = ${indian(item.answer)}`, `${item.num} × ${c} = ${item.answer}`]; }
  if (item.choices) return [item.answer];
  return [String(item.answer), indian(item.answer), words(item.answer)];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T0: any) => {
  if (T0.state().stage === "demo") return HOOK.demo && HOOK.demo();
  if (SB_PREDICT[item.kind]) { if (HOOK.enter) HOOK.enter(item.answer); setTimeout(() => HOOK.check && HOOK.check(), 80); return; }
  return T0.submit(item.answer);
};
/* the agent's answer(): a prediction is set as a child sets it (the card then waits); others are typed */
const answer = (item: any, v: any) => (SB_PREDICT[item.kind] ? (HOOK.enter ? !!HOOK.enter(v) : false) : undefined);
/* the agent's check(): drops the waiting card(s), or plays the rail's worked start; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── drawing pieces ──────────────────────────────────────────────────────────────────────── */

const SB_CSS = `
.sb-move{transition:transform 460ms cubic-bezier(.3,.7,.25,1)}
.sb-gone{transform-box:fill-box;transform-origin:center;transition:transform 560ms ease-in}
.sb-pop{transform-box:fill-box;transform-origin:center;animation:sbPop 420ms ease-out both}
@keyframes sbPop{from{opacity:0;transform:scale(.6)}to{opacity:1;transform:none}}
.sb-grab{cursor:grab}
@media (prefers-reduced-motion:reduce){.sb-move,.sb-gone{transition:none}.sb-pop{animation:none}}
`;

/* a number card: a solid plate with its number large. zeros/rings: the plate's trailing zeros
   (anchored at its right end) and how many of them are ringed so far, counted from the left */
function SbPlate({ x, y, w, h = 96, text, col, size = T.xl, zeros = 0, rings = 0, ring, C }: any) {
  const base = SB_COL[col] || CONTENT.line, ink = SB_INK[col] || CONTENT.line;
  const ty = y + h / 2 + size * 0.36, dw = size * 0.64;
  /* the trailing zeros are drawn one by one at known places so each can be ringed; the rest ends just before them */
  const tS = String(text), nz = Math.min(zeros, tS.length), head = tS.slice(0, tS.length - nz);
  const zx = x + w / 2 + sbW(tS, size) / 2 - nz * dw;
  return (
    <g filter="url(#fShadowSoft)">
      <rect x={x} y={y} width={w} height={h} rx={16} fill={`url(#sbG-${col})`} stroke={shade(base, 0.1)} strokeWidth={3} />
      <path d={`M ${x + 16} ${y + 4} H ${x + w - 16}`} stroke="#FFFFFF" strokeOpacity={0.9} strokeWidth={3} strokeLinecap="round" />
      {ring && <rect x={x + 6} y={y + 6} width={w - 12} height={h - 12} rx={12} fill="none" stroke={ring} strokeWidth={4} />}
      {nz > 0 ? (
        <g>
          {head && <text x={zx - 2} y={ty} textAnchor="end" fontSize={size} fontWeight={700} fill={ink}>{head}</text>}
          {Array.from({ length: nz }).map((_, j) => <text key={j} x={zx + (j + 0.5) * dw} y={ty} textAnchor="middle" fontSize={size} fontWeight={700} fill={ink}>0</text>)}
          {Array.from({ length: Math.min(rings, nz) }).map((_, j) => (
            <ellipse key={"r" + j} cx={zx + (j + 0.5) * dw} cy={y + h / 2 - 1} rx={dw * 0.46} ry={size * 0.44} fill="none" stroke={C ? C.accent : CHROME.accent} strokeWidth={3.5} />
          ))}
        </g>
      ) : <text x={x + w / 2} y={ty} textAnchor="middle" fontSize={size} fontWeight={700} fill={ink}>{text}</text>}
    </g>
  );
}

/* a sum written as separate tokens: [{ t, f?, op? }]; an op token is "× n" with its number coloured */
function SbEq({ cx, y, toks, C, size = T.speech, maxW = 1060, show = 99 }: any) {
  const widthAt = (s: number) => toks.reduce((a: number, t: any) => a + sbW(t.t, s), 0) + s * 0.32 * (toks.length - 1);
  let sz = size;
  if (widthAt(sz) > maxW) sz = T.label;
  if (widthAt(sz) > maxW) sz = T.micro;
  let at = cx - widthAt(sz) / 2;
  return (
    <g>
      {toks.map((t: any, i: number) => {
        const w = sbW(t.t, sz), tx = at + w / 2;
        at += w + sz * 0.32;
        if (i >= show) return null;
        if (t.op) return <text key={i} x={tx} y={y} textAnchor="middle" fontSize={sz} fontWeight={700} fill={C.ink}>{"× "}<tspan fill={t.f || C.ink}>{t.t.slice(2)}</tspan></text>;
        return <text key={i} x={tx} y={y} textAnchor="middle" fontSize={sz} fontWeight={700} fill={t.f || C.ink}>{t.t}</text>;
      })}
    </g>
  );
}

/* column arithmetic: place k's centre, right-aligned at xr, with room for the Indian commas */
const SB_ADV = 31, SB_CG = 10;
const sbPX = (xr: number, k: number) => xr - k * SB_ADV - (k >= 3 ? SB_CG : 0) - (k >= 5 ? SB_CG : 0);
function SbDigits({ xr, y, digits, zeros = 0, upto = 99, fill, size = T.speech }: any) {
  /* one text per row, each glyph placed on its column, so the row reads as one number ("2,562") */
  const ds = String(digits), L = ds.length + zeros, shown = Math.min(upto, L), cells: any[] = [];
  for (let k = shown - 1; k >= 0; k--) {
    const z = k < zeros;
    cells.push({ key: "d" + k, x: sbPX(xr, k), ch: z ? "0" : ds[ds.length - 1 - (k - zeros)], grey: z });
    if (k === 3 || k === 5) cells.push({ key: "c" + k, x: (sbPX(xr, k - 1) + sbPX(xr, k)) / 2, ch: "," });
  }
  return (
    <text y={y} textAnchor="middle" fontSize={size} fontWeight={700} fill={fill}>
      {cells.map((c) => (c.grey ? <tspan key={c.key} x={c.x} fill={SB_GREY}>{c.ch}</tspan> : <tspan key={c.key} x={c.x}>{c.ch}</tspan>))}
    </text>
  );
}
/* a carried digit: small, vermilion, in a ring above the column it joins */
const SbCarry = ({ x, y, v }: any) => (
  <g>
    <circle cx={x} cy={y} r={14} fill="#FFFFFF" stroke={SB_COL.verm} strokeWidth={3} />
    <text x={x} y={y + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={SB_INK.verm}>{v}</text>
  </g>
);
/* the multiplication sign between cards, drawn */
const SbTimes = ({ x, y, color, s = 22 }: any) => (
  <path d={`M ${x - s / 2} ${y - s / 2} L ${x + s / 2} ${y + s / 2} M ${x + s / 2} ${y - s / 2} L ${x - s / 2} ${y + s / 2}`} stroke={color} strokeWidth={6} strokeLinecap="round" />
);
/* an Indian comma in the gap between two rail places */
const SbComma = ({ x, y, color }: any) => (
  <path d={`M ${x + 7} ${y} A 7 7 0 1 0 ${x - 2} ${y + 6.7} C ${x} ${y + 12} ${x - 3} ${y + 20} ${x - 9} ${y + 26} C ${x + 3} ${y + 22} ${x + 8} ${y + 12} ${x + 7} ${y} Z`} fill={color} />
);

/* a fresh bench for an item */
const sbTray = () => ({ card: null as any, down: 0, going: false, gone: false, label: false, eq: 0 });
function sbSetup(it: any) {
  const k = it.kind;
  if (k === "onezero" || k === "one" || k === "zero") {
    const cards = k === "onezero" ? [1, 0] : k === "one" ? [1] : [0];
    return { k, num: it.num, cards, trays: cards.map(sbTray), armed: false, pred: null, revealed: false, sent: 0 };
  }
  if (k === "order" || k === "group")
    return { k, terms: it.terms.slice(), trays: [0, 1].map(() => ({ order: it.terms.map((_: any, i: number) => i), br: null, col: false, w: 0 })), worked: 0, touched: false, lit: false, pend: null };
  if (k === "expand" || k === "which") {
    const parts = sbParts(it.a);
    return { k, a: it.a, m: it.m, parts, broken: k === "expand", taken: parts.map(() => false), done: parts.map(() => false), pend: -1, ring: parts.map(() => false), total: false, whole: false, touched: false };
  }
  const a = k === "free" ? SB_FREE[0] : it.a, A = sbSplit(a);
  const vals = k === "demo" ? it.cards : k === "rail" ? [it.b] : [10, 100, 1000];
  return { k, a, b: k === "rail" ? it.b : null, core: A.core, open: A.z, gen: 0, cards: vals.map((v: number) => ({ v, used: false })),
    inuse: null, ring: 0, fact: null, eq: false, zlabel: null, armed: false, pred: null, revealed: false, sent: 0, fi: 0 };
}

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  HOOK.tx = tx;   /* the summary's Thumb draws its sum in the language in use */
  const tl = useTimeline();
  const free = stage === "free";
  const [S, setS] = useState<any>(() => sbSetup(phase.demo ? { kind: "demo", ...phase.demo } : item));
  const SR = useRef<any>(S);
  const upd = (patch: any) => { SR.current = { ...SR.current, ...patch }; setS(SR.current); };
  const busyRef = useRef(false);
  const stageRef = useRef(stage);
  stageRef.current = stage;
  const setupFor = useRef(phase.demo ? -1 : 0);
  const run = (steps: any[], done?: () => void) => {
    busyRef.current = true;
    tl.run(steps, () => { busyRef.current = false; if (done) done(); });
  };
  const reset = (it: any) => { tl.stop(); busyRef.current = false; SR.current = sbSetup(it); setS(SR.current); api.lock(false); };

  useEffect(() => {
    if (stage === "ask" && setupFor.current !== index) { setupFor.current = index; reset(item); }
  }, [stage, index]);
  /* free play: the zeros rail with any of four numbers and the × 10, × 100, × 1,000 cards */
  useEffect(() => {
    if (!free) return;
    setupFor.current = -2;
    reset({ kind: "free" });
  }, [free]);

  const k = S.k;
  const busy = tl.busy;
  const isP1 = k === "onezero" || k === "one" || k === "zero";
  const isP2 = k === "order" || k === "group";
  const isP3 = k === "expand" || k === "which";

  /* a prediction (phase 1 and the rail): typed or picked first, then the card waits to be dropped */
  const predict = (v: any) => {
    const s = SR.current;
    if (stageRef.current !== "ask" || busyRef.current || s.armed || !SB_PREDICT[s.k]) return false;
    if (v === "" || v === null || v === undefined) return false;
    const val = item.choices ? sbChoice(item, v) : leadNumber(v);
    if (val === null || val === undefined) return false;
    api.setTyped(String(val));
    if (s.revealed) { api.submit(val); return true; }   /* the tray already worked: a retry commits directly */
    upd({ pred: val, armed: true });
    api.lock(true);
    return true;
  };

  /* ── phase 1: the one card and the zero card ── */
  const trayX1 = (nT: number, t: number) => (nT === 1 ? 293 : t === 0 ? 0 : 586);
  const setTray = (t: number, patch: any) => upd({ trays: SR.current.trays.map((x: any, i: number) => (i === t ? { ...x, ...patch } : x)) });
  const waiting1 = () => SR.current.cards.filter((c: number) => !SR.current.trays.some((x: any) => x.card === c));
  const target1 = (card: number, p: any) => {
    const s = SR.current, nT = s.trays.length;
    if (p) {
      for (let t = 0; t < nT; t++) { const x = trayX1(nT, t); if (p.x >= x - 30 && p.x <= x + 530 && p.y >= -20 && p.y <= 330) return s.trays[t].card === null ? t : -1; }
      return -1;
    }
    for (const t of card === 1 ? [0, 1] : [1, 0]) if (t < nT && s.trays[t].card === null) return t;
    return -1;
  };
  const steps1 = (t: number, card: number, slow: number) => {
    const out: any[] = [[360 * slow, () => { setTray(t, { card }); api.sfx.tick(); }]];
    if (card === 1) out.push([40, () => setTray(t, { down: 1 })], [620 * slow, () => setTray(t, { down: 2, label: true })]);
    else out.push([40, () => setTray(t, { going: true })], [620 * slow, () => setTray(t, { gone: true, label: true })]);
    if (slow > 1) for (let e = 1; e < 4; e++) { const ee = e; out.push([300 * slow, () => setTray(t, { eq: ee })]); }
    out.push([300, () => { setTray(t, { eq: 4 }); upd({ sent: SR.current.sent + 1 }); }]);
    return out;
  };
  const finish1 = () => {
    if (waiting1().length) return;
    const pred = SR.current.pred;
    upd({ revealed: true, armed: false });
    api.submit(pred);
  };
  const drop1 = (card: number, p: any) => {
    const s = SR.current;
    if (busyRef.current || stageRef.current !== "ask" || !s.armed || s.revealed || !waiting1().includes(card)) return;
    const t = target1(card, p);
    if (t < 0) return;
    run(steps1(t, card, 1), finish1);
  };
  const dropAll1 = (slow: number, done: () => void) => {
    const left = waiting1();
    if (!left.length) { done(); return; }
    const c = left.includes(1) ? 1 : left[0];
    run(steps1(target1(c, null), c, slow), () => dropAll1(slow, done));
  };

  /* ── phase 2: two trays of the same cards ── */
  const trayX2 = (t: number) => (t === 0 ? 0 : 586);
  const setTrays2 = (f: (x: any, t: number) => any) => upd({ trays: SR.current.trays.map(f) });
  const colOf2 = (s: any, i: number) => (s.k === "order" ? (String(s.terms[i]).length > String(s.terms[1 - i]).length ? "blue" : "amber") : i === 0 ? "blue" : "amber");
  const slots2 = (s: any, t: number) => {
    const tr = s.trays[t], units: any[] = [];
    if (s.k === "group" && tr.br !== null && tr.col) {
      const i = tr.br, pair = { key: "p" + i, pair: i, text: indian(s.terms[i] * s.terms[i + 1]), col: i === 0 ? "blue" : "amber" };
      if (i === 0) units.push(pair, { key: "t2", term: 2, text: indian(s.terms[2]), col: colOf2(s, 2) });
      else units.push({ key: "t0", term: 0, text: indian(s.terms[0]), col: colOf2(s, 0) }, pair);
    } else tr.order.forEach((i: number) => units.push({ key: "t" + i, term: i, text: indian(s.terms[i]), col: colOf2(s, i) }));
    const gap = units.length > 2 ? 60 : 56;
    units.forEach((u) => { u.w = sbCardW(u.text); });
    const total = units.reduce((a, u) => a + u.w, 0) + gap * (units.length - 1);
    let at = trayX2(t) + (500 - total) / 2;
    units.forEach((u) => { u.x = at; at += u.w + gap; });
    return { units, gap };
  };
  const canPlay2 = () => stageRef.current === "ask" && !busyRef.current;
  const swap2 = (t: number, p: any) => {
    if (!canPlay2() || SR.current.k !== "order" || SR.current.worked > 0) return;
    if (p && !(p.x >= trayX2(t) - 30 && p.x <= trayX2(t) + 530 && p.y >= -30 && p.y <= 190)) return;
    upd({ touched: true });
    setTrays2((x, i) => (i === t ? { ...x, order: x.order.slice().reverse() } : x));
    api.sfx.tick();
  };
  /* a bracket closes round a pair, and the pair waits for the child to type what it makes */
  const bracket2 = (t: number, i: number) => {
    if (!canPlay2() || SR.current.worked > 0) return;
    const old = SR.current.pend;
    upd({ touched: true, pend: { t, i } });
    setTrays2((x, j) => (j === t ? { ...x, br: i, col: false } : old && j === old.t ? { ...x, br: null, col: false } : x));
    api.setTyped("");
    api.sfx.tick();
  };
  /* the pair's product, typed by the child: checked here, not graded. Right or not, the pair then
     becomes one card holding its true product, so a slip is corrected without a mark */
  const pairEnter2 = (v: any) => {
    const pd = SR.current.pend;
    if (!pd || stageRef.current !== "ask" || busyRef.current || leadNumber(v) === null) return;
    api.setTyped("");
    upd({ pend: null });
    setTrays2((x, j) => (j === pd.t ? { ...x, col: true } : x));
    api.sfx.tick();
  };
  const open2 = (t: number) => {
    if (!canPlay2() || SR.current.worked > 0) return;
    const pd = SR.current.pend;
    if (pd && pd.t === t) upd({ pend: null });
    setTrays2((x, j) => (j === t ? { ...x, br: null, col: false } : x));
    api.sfx.tick();
  };
  /* how many drawing steps a tray's working takes: a long number on the mat writes one place a
     step; a short one on the mat writes a row per place and then the sum; a grouping two lines */
  const count2 = (s: any, order: number[]) => {
    if (s.k === "group") return 2;
    const top = String(s.terms[order[0]]), bot = String(s.terms[order[1]]);
    return top.length >= bot.length ? top.length : bot.length + 1;
  };
  const steps2 = (slow: number) => {
    if (SR.current.pend) upd({ pend: null });
    const s = SR.current, out: any[] = [];
    let fin = s.trays.map((x: any) => x.order);
    if (s.k === "order") {
      if (fin[0].join() === fin[1].join()) {
        fin = [fin[0], fin[1].slice().reverse()];
        out.push([520 * slow, () => { setTrays2((x, i) => (i === 1 ? { ...x, order: x.order.slice().reverse() } : x)); api.sfx.tick(); }]);
      }
    } else {
      const round = sbRoundPair(s.terms), other = round === 0 ? 1 : 0;
      let L = s.trays[0].br === null ? other : s.trays[0].br, R = s.trays[1].br === null ? round : s.trays[1].br;
      if (L === R) { if (R === round) L = other; else R = round; }
      if (L !== s.trays[0].br || R !== s.trays[1].br || !s.trays[0].col || !s.trays[1].col) {
        out.push([480 * slow, () => { setTrays2((x, i) => ({ ...x, br: i === 0 ? L : R, col: false })); api.sfx.tick(); }]);
        out.push([480 * slow, () => setTrays2((x) => ({ ...x, col: true }))]);
      }
    }
    for (const t of [1, 0]) {
      const cnt = count2(s, fin[t]);
      for (let w = 1; w <= cnt; w++) { const ww = w; out.push([420 * slow, () => { setTrays2((x, i) => (i === t ? { ...x, w: ww } : x)); api.sfx.tick(); }]); }
      out.push([260 * slow, () => upd({ worked: SR.current.worked + 1 })]);
    }
    if (s.k === "group") out.push([200, () => upd({ lit: true })]);
    return out;
  };

  /* ── phase 3: the expand strip ── */
  const MX3 = 600;
  const units3 = (s: any) => {
    const us = s.broken ? s.parts.map((p: number, i: number) => ({ key: "p" + i, i, text: indian(p) })) : [{ key: "whole", i: -1, text: indian(s.a) }];
    let at = 0;
    us.forEach((u: any) => { u.w = sbCardW(u.text); u.x = at; at += u.w + 56; });
    return us;
  };
  const take3 = (i: number) => {
    const s = SR.current;
    if (stageRef.current !== "ask" || busyRef.current || !s.broken || i < 0 || s.taken[i] || s.pend >= 0) return;
    const taken = s.taken.slice(), done = s.done.slice();
    taken[i] = true;
    if (s.k === "which") done[i] = true;   /* the choice pad has no digit keys: that row is written for the child */
    upd({ taken, done, pend: s.k === "expand" ? i : -1, touched: true });
    if (s.k === "expand") api.setTyped("");
    api.sfx.tick();
  };
  /* the part's product, typed by the child: checked here, not graded; the row then holds the true
     product, so a slip is corrected without a mark, and the total stays the one judged answer */
  const partEnter3 = (v: any) => {
    const s = SR.current, i = s.pend;
    if (i < 0 || stageRef.current !== "ask" || busyRef.current || leadNumber(v) === null) return;
    const done = s.done.slice(); done[i] = true;
    api.setTyped("");
    upd({ done, pend: -1 });
    api.sfx.tick();
  };
  const drop3 = (p: any) => {
    const s = SR.current;
    if (!s.broken) return;
    if (!p) { take3(s.taken.indexOf(false)); return; }
    const u = units3(s).find((u: any) => p.x >= u.x - 24 && p.x <= u.x + u.w + 24 && p.y >= -30 && p.y <= 160);
    if (u) take3(u.i);
  };
  const break3 = () => {
    const s = SR.current;
    if (stageRef.current !== "ask" || busyRef.current || s.broken) return;
    upd({ broken: true, touched: true });
    api.sfx.tick();
  };
  const steps3 = (slow: number, ring: boolean) => {
    if (SR.current.pend >= 0) upd({ pend: -1 });
    const s = SR.current, out: any[] = [];
    if (!s.broken) out.push([560 * slow, () => { upd({ broken: true }); api.sfx.tick(); }]);
    const open = s.parts.map((_: any, i: number) => i).filter((i: number) => !s.done[i]);
    if (ring && open.length) out.push([760 * slow, () => upd({ ring: s.parts.map((_: any, i: number) => !s.done[i]) })]);
    open.forEach((i: number) => out.push([560 * slow, () => {
      const t = SR.current.taken.slice(), d = SR.current.done.slice(); t[i] = true; d[i] = true;
      upd({ taken: t, done: d }); api.sfx.tick();
    }]));
    out.push([600 * slow, () => upd({ total: true })]);
    out.push([600 * slow, () => { upd({ whole: true }); api.sfx.tick(); }]);
    out.push([200, () => upd({ ring: s.parts.map(() => false) })]);
    return out;
  };

  /* ── phase 4: the zeros rail ── */
  const RAIL_Y = 206, RAIL_DY = 286;
  const cellX = (kk: number) => 18 + (6 - kk) * 150;
  const bench4 = (s: any) => {
    let at = 1076;
    const pos: any[] = [];
    for (let i = s.cards.length - 1; i >= 0; i--) { const w = sbCardW("× " + indian(s.cards[i].v)); at -= w; pos[i] = { x: at, y: 12, w, h: 96 }; at -= 24; }
    return pos;
  };
  const live4 = (i: number) => {
    const s = SR.current, st = stageRef.current, c = s.cards[i];
    if (busyRef.current || !c) return false;
    if (st === "demo") return s.k === "demo" && !c.used;
    if (st === "ask") return s.k === "rail" && s.armed && !s.revealed && !c.used;
    if (st === "free") return s.k === "free" && String(s.core).length + s.open + sbSplit(c.v).z <= 7;
    return false;
  };
  const steps4 = (i: number, slow: number) => {
    const s = SR.current, b = s.cards[i].v, out: any[] = [];
    if (s.k === "free") {
      const z = sbSplit(b).z;
      out.push([160, () => api.sfx.tick()]);
      for (let j = 0; j < z; j++) out.push([480 * slow, () => { upd({ open: SR.current.open + 1, eq: true }); api.sfx.tick(); }]);
      return out;
    }
    const A = sbSplit(s.a), B = sbSplit(b), z = A.z + B.z, fact = A.core * B.core;
    out.push([340 * slow, () => { upd({ cards: SR.current.cards.map((c: any, j: number) => (j === i ? { ...c, used: true } : c)), inuse: i, ring: 0, fact: null, eq: false, zlabel: null }); api.sfx.tick(); }]);
    for (let j = s.open; j > A.z; j--) out.push([280 * slow, () => upd({ open: SR.current.open - 1 })]);          /* the digits walk home */
    for (let j = 1; j <= z; j++) { const jj = j; out.push([400 * slow, () => { upd({ ring: jj }); api.sfx.tick(); }]); } /* the zeros, counted */
    out.push([320 * slow, () => upd({ zlabel: z })]);
    if (A.z > 0 || B.core > 1) {                                                                                  /* the short fact first */
      out.push([640 * slow, () => upd({ fact: { a: A.core, b: B.core, f: fact } })]);
      out.push([520 * slow, () => upd({ core: fact, open: 0, gen: SR.current.gen + 1 })]);
    }
    for (let j = 0; j < z; j++) out.push([560 * slow, () => { upd({ open: SR.current.open + 1 }); api.sfx.tick(); }]); /* one place opens at a time */
    out.push([360 * slow, () => upd({ eq: true, sent: SR.current.sent + 1 })]);
    return out;
  };
  const send4 = (i: number, p: any) => {
    if (!live4(i)) return;
    if (p && p.y < 118 && p.x > 640) return; /* let go back on the bench: it simply stays there */
    const st = stageRef.current;
    run(steps4(i, 1), () => {
      const s = SR.current;
      if (st === "demo") { if (s.cards.every((c: any) => c.used)) api.demoDone(phase.demoLines); }
      else if (st === "ask") { const pred = s.pred; upd({ revealed: true, armed: false }); api.submit(pred); }
    });
  };
  const sendAll4 = (done: () => void) => {
    const i = SR.current.cards.findIndex((c: any) => !c.used);
    if (i < 0) { done(); return; }
    run(steps4(i, 1), () => sendAll4(done));
  };
  const home4 = () => {
    if (busyRef.current || stageRef.current !== "free") return;
    const s = SR.current, A = sbSplit(s.a), out: any[] = [];
    for (let j = s.open; j > A.z; j--) out.push([260, () => { upd({ open: SR.current.open - 1 }); api.sfx.tick(); }]);
    out.push([80, () => upd({ eq: false })]);
    run(out);
  };
  const nextNum4 = () => {
    if (busyRef.current || stageRef.current !== "free") return;
    const s = SR.current, fi = (s.fi + 1) % SB_FREE.length, a = SB_FREE[fi], A = sbSplit(a);
    upd({ fi, a, core: A.core, open: A.z, gen: s.gen + 1, eq: false });
    api.sfx.tick();
  };

  /* one drag for every piece: a move under 8 units, or Enter, is a tap ("put it where it belongs") */
  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    const at = moved ? p : null;
    if (pay.src === "p1") drop1(pay.card, at);
    else if (pay.src === "swap") swap2(pay.t, at);
    else if (pay.src === "take") drop3(at);
    else if (pay.src === "send") send4(pay.i, at);
  });
  const dd = drag.drag;
  const piece = (id: string, label: string, pay: any, box: any, live: boolean, body: any) => {
    const full = { ...pay, id, hx: box.x + box.w / 2, hy: box.y + box.h / 2 };
    const off = live && dd && dd.moved && dd.payload && dd.payload.id === id ? { x: dd.x - full.hx, y: dd.y - full.hy } : null;
    return (
      <g key={id} className={live ? "sb-grab c4-piece" : undefined} {...(live ? { ...control(id, label), ...drag.bind(full), ...drag.keys(full) } : {})}
        style={off ? ({ transform: `translate(${off.x}px, ${off.y}px)` } as any) : undefined} filter={off ? "url(#fLift)" : undefined}>
        {body}
        <rect x={box.x} y={box.y} width={box.w} height={box.h} fill="transparent" />
      </g>
    );
  };

  /* ── win motions ── */
  useEffect(() => {
    if (stage !== "win") return;
    const s = SR.current;
    if ((s.k === "order" || s.k === "group") && s.worked < 2) {
      setTrays2((x) => ({ ...x, w: 0 }));
      upd({ worked: 0 });
      run(steps2(0.55));
    } else if ((s.k === "expand" || s.k === "which") && !s.whole) run(steps3(0.55, false));
  }, [stage]);

  /* ── the traceback: the mathematics redrawn in steps, ending on the whole right answer;
        nothing marked, nothing cleared from the slot ── */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    const done = () => api.lock(false);
    const s = SR.current;
    if (s.k === "onezero" || s.k === "one" || s.k === "zero") {
      upd({ trays: s.trays.map(sbTray), armed: false, sent: 0 });
      run([[450, () => {}]], () => dropAll1(1.7, () => { upd({ revealed: true }); done(); }));
    } else if (s.k === "order" || s.k === "group") {
      setTrays2((x) => ({ ...x, w: 0 }));
      upd({ worked: 0, lit: false });
      run([[450, () => {}], ...steps2(1.6)], done);
    } else if (s.k === "expand" || s.k === "which") {
      if (s.total || s.whole) upd({ total: false, whole: false });
      run([[450, () => {}], ...steps3(1.6, true)], done);
    } else if (s.k === "rail") {
      const f = sbSetup(item);
      upd({ core: f.core, open: f.open, gen: s.gen + 1, cards: f.cards, inuse: null, ring: 0, fact: null, eq: false, zlabel: null, armed: false, sent: 0 });
      run([[450, () => {}], ...steps4(0, 1.6)], () => { upd({ revealed: true }); done(); });
    } else done();
  }, [wrong]);

  /* Enter and choice taps: a prediction arms the card; in the rail's worked start Enter sends the next card;
     a bracketed pair or a taken part waiting for its product takes the typed number first */
  const enterFn: any =
    stage === "demo" ? (k === "demo" ? () => { const i = SR.current.cards.findIndex((c: any) => !c.used); if (i >= 0) send4(i, null); } : null)
      : stage !== "ask" ? null
        : SB_PREDICT[k] ? (v: any) => { predict(v); }
          : k === "group" && S.pend ? pairEnter2
            : k === "expand" && S.pend >= 0 ? partEnter3
              : null;
  api.onEnter(enterFn);
  HOOK.enter = (v: any) => (stageRef.current === "ask" && SB_PREDICT[SR.current.k] ? predict(v) : false);
  HOOK.check = () => {
    const st = stageRef.current, s = SR.current;
    if (st === "demo" && s.k === "demo") { if (!busyRef.current) sendAll4(() => api.demoDone(phase.demoLines)); return true; }
    if (st !== "ask" || !SB_PREDICT[s.k]) return undefined;
    if (busyRef.current) return true;
    if (s.armed && !s.revealed) {
      if (s.k === "rail") sendAll4(() => { const pred = SR.current.pred; upd({ revealed: true, armed: false }); api.submit(pred); });
      else dropAll1(1, finish1);
      return true;
    }
    return undefined;
  };
  HOOK.demo = () => HOOK.check();

  /* ── what the host and the agent read back (toolApi.getState): the bench, never an answer ── */
  api.share({
    cards: isP1 ? [S.num, ...S.cards] : isP2 ? S.terms : isP3 ? [S.a, S.m] : [S.a, ...S.cards.map((c: any) => c.v)],
    leftTray: isP2 ? S.trays[0].order.map((i: number) => S.terms[i]) : isP1 ? S.trays[0].card : null,
    rightTray: isP2 ? S.trays[1].order.map((i: number) => S.terms[i]) : isP1 && S.trays[1] ? S.trays[1].card : null,
    brackets: isP2 ? S.trays.map((x: any) => x.br) : null,
    expandOpen: isP3 ? !!S.broken : false,
    railUnit: !isP1 && !isP2 && !isP3 ? S.open : null,
    pairing: isP2 && S.k === "group" ? !!S.lit : null,
    eq: free ? "" : sbEqOf(item),
  });

  /* ── drawing ── */
  const view1 = () => {
    const s = S, nT = s.trays.length, pw = sbCardW(indian(s.num)), cw = sbCardW("× 1");
    const benchX = (c: number) => (s.cards.length === 1 ? 543 - cw / 2 : s.cards.indexOf(c) === 0 ? 523 - cw : 563);
    const wait = s.cards.filter((c: number) => !s.trays.some((x: any) => x.card === c));
    const live = !busy && stage === "ask" && s.armed && !s.revealed;
    return (
      <g>
        {s.trays.map((tr: any, t: number) => {
          const x0 = trayX1(nT, t), px = x0 + 40, sx = px + pw + 30;
          return (
            <g key={"tray" + t}>
              <rect x={x0} y={0} width={500} height={170} rx={22} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
              {!tr.gone && (
                <g className="sb-gone" style={{ transform: tr.going ? "scale(0.02)" : "none" } as any}>
                  <SbPlate x={px} y={37} w={pw} text={indian(s.num)} col="blue" />
                </g>
              )}
              {tr.gone && <rect x={px} y={37} width={pw} height={96} rx={16} fill="none" stroke={C.rule} strokeWidth={2.5} strokeDasharray="10 9" />}
              {tr.card === null
                ? <rect x={sx} y={37} width={cw} height={96} rx={16} fill="#FFFFFF" stroke={C.rule} strokeWidth={2.5} strokeDasharray="10 9" />
                : <SbPlate x={sx} y={37} w={cw} text={"× " + tr.card} col="amber" />}
              <line x1={x0 + 16} y1={292} x2={x0 + 484} y2={292} stroke={C.rule} strokeWidth={5} strokeLinecap="round" />
              {tr.down > 0 && (
                <g className="sb-move" style={{ transform: `translateY(${tr.down === 1 ? 0 : 156}px)` } as any}>
                  <SbPlate x={px} y={37} w={pw} text={indian(s.num)} col="blue" />
                </g>
              )}
              {tr.card === 0 && tr.label && <rect x={px} y={193} width={pw} height={96} rx={16} fill="none" stroke={C.rule} strokeWidth={2.5} strokeDasharray="10 9" />}
              {tr.label && <text x={sx} y={252} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(tr.card === 1 ? "1 group" : "no groups")}</text>}
              {tr.eq > 0 && tr.card !== null && (
                <SbEq cx={x0 + 250} y={372} show={tr.eq} C={C} maxW={480}
                  toks={[{ t: indian(s.num), f: SB_INK.blue }, { t: "× " + tr.card, f: SB_INK.amber, op: true }, { t: "=" }, { t: indian(s.num * tr.card), f: SB_INK.green }]} />
              )}
            </g>
          );
        })}
        {s.cards.map((c: number, j: number) => {
          if (!wait.includes(c)) return null;
          const box = { x: benchX(c), y: 404, w: cw, h: 96 };
          return piece(j === 0 ? "loose" : "loose-" + c, "Drop the times " + c + " card into a tray", { src: "p1", card: c }, box, live,
            <SbPlate x={box.x} y={box.y} w={cw} text={"× " + c} col="amber" />);
        })}
        {live && wait.length > 0 && <Invite x={benchX(wait[0]) + cw / 2} y={452} r={62} C={C} />}
      </g>
    );
  };

  /* both trays' workings are built upward from one shared ledge, so the two products stand level on
     it whichever method needs more rows */
  const PY2 = 500;
  const column2 = (t: number) => {
    const s = S, tr = s.trays[t], o = tr.order, top = s.terms[o[0]], bot = s.terms[o[1]];
    const xr = trayX2(t) + 330, tS = String(top), bS = String(bot), long = tS.length >= bS.length, wide = Math.max(tS.length, bS.length);
    const yR2 = PY2 - 42, rows = bS.split("").reverse().map(Number);
    const yRow = (r: number) => yR2 - 18 - (rows.length - 1 - r) * 46;
    const yB = long ? yR2 - 18 : yRow(0) - 58, yA = yB - 52, yR1 = long ? yR2 : yB + 18;
    const rule = (key: string, y: number) => <line key={key} x1={sbPX(xr, 3) - 30} y1={y} x2={xr + 24} y2={y} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />;
    const out: any[] = [
      <SbDigits key="a" xr={xr} y={yA} digits={tS} fill={SB_INK[colOf2(s, o[0])]} />,
      <SbTimes key="x" x={sbPX(xr, wide) + 4} y={yB - 14} color={C.ink} />,
      <SbDigits key="b" xr={xr} y={yB} digits={bS} fill={SB_INK[colOf2(s, o[1])]} />,
      rule("r", yR1),
    ];
    if (long) {
      const P = String(top * bot), steps = tS.length, ds = tS.split("").reverse().map(Number);
      let c = 0;
      ds.forEach((d, kk) => {
        const p = d * bot + c;
        c = kk === steps - 1 ? 0 : Math.floor(p / 10);
        if (kk < steps - 1 && c > 0 && tr.w > kk) out.push(<SbCarry key={"c" + kk} x={sbPX(xr, kk + 1)} y={yA - 56} v={c} />);
      });
      if (tr.w > 0) out.push(<SbDigits key="p" xr={xr} y={PY2} digits={P} upto={tr.w >= steps ? P.length : tr.w} fill={SB_INK.green} />);
    } else {
      rows.forEach((d, r) => { if (tr.w > r) out.push(<SbDigits key={"row" + r} xr={xr} y={yRow(r)} digits={String(top * d)} zeros={r} fill={SB_INK.rose} />); });
      if (tr.w > rows.length) {
        out.push(rule("rule2", yR2));
        out.push(<SbDigits key="s" xr={xr} y={PY2} digits={String(top * bot)} fill={SB_INK.green} />);
      }
    }
    return <g>{out}</g>;
  };
  const lines2 = (t: number) => {
    const s = S, tr = s.trays[t], x0 = trayX2(t);
    if (tr.br === null || tr.w < 1) return null;
    const i = tr.br, pv = s.terms[i] * s.terms[i + 1], P = s.terms[0] * s.terms[1] * s.terms[2];
    const l1 = [{ t: indian(s.terms[i]), f: SB_INK[colOf2(s, i)] }, { t: "× " + indian(s.terms[i + 1]), f: SB_INK[colOf2(s, i + 1)], op: true }, { t: "=" }, { t: indian(pv) }];
    const l2 = i === 0
      ? [{ t: indian(pv) }, { t: "× " + indian(s.terms[2]), f: SB_INK.amber, op: true }, { t: "=" }, { t: indian(P), f: SB_INK.green }]
      : [{ t: indian(s.terms[0]), f: SB_INK.blue }, { t: "× " + indian(pv), op: true }, { t: "=" }, { t: indian(P), f: SB_INK.green }];
    return (
      <g>
        <SbEq cx={x0 + 250} y={PY2 - 82} toks={l1} C={C} maxW={470} />
        {tr.w >= 2 && <SbEq cx={x0 + 250} y={PY2} toks={l2} C={C} maxW={470} />}
      </g>
    );
  };
  const view2 = () => {
    const s = S, canTap = stage === "ask" && !busy && s.worked === 0, round = sbRoundPair(s.terms);
    let invite: any = null;
    const trays = [0, 1].map((t) => {
      const x0 = trayX2(t), tr = s.trays[t], { units, gap } = slots2(s, t);
      const byKey = units.slice().sort((a: any, b: any) => (a.key < b.key ? -1 : 1));
      if (t === 1 && s.k === "order" && canTap && !s.touched) invite = { x: units[0].x + units[0].w / 2, y: 68, r: 62 };
      return (
        <g key={"tray" + t}>
          <rect x={x0} y={0} width={500} height={136} rx={22} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          {byKey.map((u: any) => {
            const lit = s.lit && u.pair === round;
            const body = (
              <g className="sb-move" style={{ transform: `translate(${u.x}px, 20px)` } as any}>
                <SbPlate x={0} y={0} w={u.w} text={u.text} col={u.col} ring={lit ? C.accent : null} />
              </g>
            );
            if (s.k === "order") return piece("card-" + t + "-" + u.term, "Swap the two cards in this tray", { src: "swap", t }, { x: u.x, y: 20, w: u.w, h: 96 }, canTap, body);
            return (
              <g key={u.key}>
                {body}
                {u.pair !== undefined && canTap && <Hit id={"open-" + t} x={u.x} y={20} w={u.w} h={96} onPress={() => open2(t)} label="Open the bracket" />}
              </g>
            );
          })}
          {units.slice(0, -1).map((u: any, j: number) => {
            const x = u.x + u.w + gap / 2;
            return (
              <g key={"x" + j}>
                <SbTimes x={x} y={68} color={C.ink} />
                {s.k === "group" && !tr.col && canTap && tr.br !== j && (
                  <Hit id={"pair-" + t + "-" + j} x={x - 36} y={20} w={72} h={96} onPress={() => bracket2(t, j)}
                    label={"Bracket " + units[j].text + " and " + units[j + 1].text} />
                )}
              </g>
            );
          })}
          {tr.br !== null && !tr.col && (() => {
            const a = units[tr.br], b = units[tr.br + 1], xl = a.x - 7, xr2 = b.x + b.w + 7;
            return (
              <g stroke={C.ink} strokeWidth={7} strokeLinecap="round" fill="none">
                <path d={`M ${xl + 3} 16 Q ${xl - 13} 68 ${xl + 3} 120`} />
                <path d={`M ${xr2 - 3} 16 Q ${xr2 + 13} 68 ${xr2 - 3} 120`} />
              </g>
            );
          })()}
          {s.pend && s.pend.t === t && tr.br !== null && !tr.col && (() => {
            const a = units[tr.br], b = units[tr.br + 1], cx = (a.x + b.x + b.w) / 2;
            return (
              <g>
                <text x={cx - 104} y={190} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>=</text>
                <rect x={cx - 80} y={150} width={160} height={58} rx={14} fill="#FFFFFF" stroke={C.accent} strokeWidth={4} />
                {typed ? <text x={cx} y={193} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{sbSlotFormat(typed)}</text> : null}
              </g>
            );
          })()}
          {s.k === "order" ? column2(t) : lines2(t)}
        </g>
      );
    });
    return (
      <g>
        <line x1={16} y1={PY2 + 18} x2={1070} y2={PY2 + 18} stroke={C.rule} strokeWidth={4} strokeLinecap="round" />
        {trays}
        {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
      </g>
    );
  };

  const view3 = () => {
    const s = S, us = units3(s), cw = sbCardW("× " + s.m), n3 = s.parts.length;
    const yRow = (i: number) => 190 + i * 62, yRule = yRow(n3 - 1) + 26, yTot = yRule + 64;
    const canTap = stage === "ask" && !busy;
    const liveTake = canTap && s.broken && s.pend < 0 && s.taken.includes(false);
    const yA = n3 >= 3 ? yRow(n3 - 2) : yRow(0), yB = yRow(n3 - 1);
    const invite = !canTap ? null : !s.broken ? { x: us[0].x + us[0].w / 2, y: 60 } : !s.taken.some(Boolean) ? { x: MX3 + cw / 2, y: 60 } : null;
    return (
      <g>
        {us.map((u: any, j: number) => (
          <g key={u.key}>
            <SbPlate x={u.x} y={12} w={u.w} text={u.text} col="blue" ring={u.i >= 0 && s.taken[u.i] ? SB_COL.amber : null} />
            {j < us.length - 1 && <text x={u.x + u.w + 28} y={80} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>+</text>}
            {canTap && u.i < 0 && <Hit id="break" x={u.x} y={12} w={u.w} h={96} onPress={break3} label={"Break " + u.text + " into its places"} />}
            {canTap && u.i >= 0 && !s.taken[u.i] && s.pend < 0 && <Hit id={"part-" + u.i} x={u.x} y={12} w={u.w} h={96} onPress={() => take3(u.i)} label={"Take " + u.text + " times " + s.m} />}
          </g>
        ))}
        {piece("take", "Take a part with the " + s.m, { src: "take" }, { x: MX3, y: 12, w: cw, h: 96 }, liveTake,
          <SbPlate x={MX3} y={12} w={cw} text={"× " + s.m} col="amber" />)}
        {s.broken && s.parts.map((p: number, i: number) => s.taken[i] ? (
          <g key={"row" + i}>
            {s.ring[i] && <rect x={12} y={yRow(i) - 44} width={480} height={58} rx={14} fill="none" stroke={C.accent} strokeWidth={4} />}
            <text x={150} y={yRow(i)} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={SB_INK.blue}>{indian(p)}</text>
            <text x={206} y={yRow(i)} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{"× "}<tspan fill={SB_INK.amber}>{String(s.m)}</tspan></text>
            <text x={272} y={yRow(i)} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>=</text>
            {s.done[i] ? <text x={470} y={yRow(i)} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={SB_INK.rose}>{indian(p * s.m)}</text> : (
              <g>
                <rect x={312} y={yRow(i) - 44} width={176} height={58} rx={14} fill="#FFFFFF" stroke={C.accent} strokeWidth={4} />
                {typed ? <text x={470} y={yRow(i)} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={C.ink}>{sbSlotFormat(typed)}</text> : null}
              </g>
            )}
          </g>
        ) : (
          <rect key={"row" + i} x={12} y={yRow(i) - 44} width={480} height={58} rx={14} fill="none" stroke={s.ring[i] ? C.accent : C.rule} strokeWidth={s.ring[i] ? 4 : 2} strokeDasharray="10 9" />
        ))}
        {s.broken && <line x1={320} y1={yRule} x2={486} y2={yRule} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />}
        {s.broken && (s.total
          ? <text x={470} y={yTot} textAnchor="end" fontSize={T.xl} fontWeight={700} fill={SB_INK.green}>{indian(s.a * s.m)}</text>
          : <rect x={320} y={yRule + 12} width={166} height={62} rx={14} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="10 9" />)}
        {/* the whole number, worked in a column of its own */}
        <text x={1040} y={yA} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={SB_INK.blue}>{indian(s.a)}</text>
        <text x={1040} y={yB} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={C.ink}>{"× "}<tspan fill={SB_INK.amber}>{String(s.m)}</tspan></text>
        <line x1={868} y1={yRule} x2={1054} y2={yRule} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
        {s.whole
          ? <text x={1040} y={yTot} textAnchor="end" fontSize={T.xl} fontWeight={700} fill={SB_INK.green}>{indian(s.a * s.m)}</text>
          : <rect x={868} y={yRule + 12} width={186} height={62} rx={14} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="10 9" />}
        {invite && <Invite x={invite.x} y={invite.y} r={56} C={C} />}
      </g>
    );
  };

  const view4 = () => {
    const s = S, isFree = s.k === "free", len = String(s.core).length + s.open, A = sbSplit(s.a);
    const nw = sbCardW(indian(s.a)), pos = bench4(s);
    const inV = s.inuse !== null ? s.cards[s.inuse].v : null;
    const slotW = sbCardW("× " + indian(Math.max(...s.cards.map((c: any) => c.v))));
    const liveAny = s.cards.map((_: any, i: number) => live4(i));
    const inviteI = !isFree ? liveAny.indexOf(true) : -1;
    const eqB = isFree ? Math.pow(10, s.open - A.z) : inV;
    const coreS = String(s.core);
    return (
      <g>
        {/* the sum: the number, and the multiplier card once it is sent */}
        <SbPlate x={0} y={12} w={nw} text={indian(s.a)} col="blue" zeros={A.z} rings={Math.min(A.z, s.ring)} C={C} />
        {isFree && stage === "free" && !busy && <Hit id="number" x={0} y={12} w={nw} h={96} onPress={nextNum4} label="Try another number" />}
        {!isFree && (inV !== null
          ? <SbPlate x={nw + 24} y={12} w={sbCardW("× " + indian(inV))} text={"× " + indian(inV)} col="amber" zeros={sbSplit(inV).z} rings={Math.max(0, s.ring - A.z)} C={C} />
          : <rect x={nw + 24} y={12} width={slotW} height={96} rx={16} fill="#FFFFFF" stroke={C.rule} strokeWidth={2.5} strokeDasharray="10 9" />)}
        {s.zlabel !== null && <text x={nw + 24 + slotW + 24} y={72} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(s.zlabel === 1 ? "1 zero" : s.zlabel + " zeros")}</text>}
        {s.fact && (
          <SbEq cx={543} y={180} C={C} toks={[{ t: indian(s.fact.a), f: SB_INK.blue }, { t: "× " + s.fact.b, f: SB_INK.amber, op: true }, { t: "=" }, { t: indian(s.fact.f) }]} />
        )}
        {/* the rail: places open to the right and the digits slide left into them */}
        {SB_PLACES.map((nm, kk) => {
          const on = kk < len, x = cellX(kk), parts = tx(nm).split(" ");
          return (
            <g key={"cell" + kk}>
              <rect x={x} y={RAIL_Y} width={140} height={110} rx={16} fill={on ? "#FFFFFF" : tint(C.panel, 0.35)} stroke={on ? C.rule : tint(C.rule, 0.15)} strokeWidth={on ? 2.5 : 2} strokeDasharray={on ? undefined : "9 8"} />
              {on && <rect x={x} y={parts.length > 1 ? 324 : 330} width={140} height={parts.length > 1 ? 64 : 36} rx={12} fill={tint(C.accent, 0.82)} />}
              {on && parts.map((wd, j) => <text key={j} x={x + 70} y={(parts.length > 1 ? 348 : 356) + j * 30} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{wd}</text>)}
            </g>
          );
        })}
        {coreS.split("").map((d, i) => (
          <g key={"d" + s.gen + "-" + i} className="sb-move" style={{ transform: `translateX(${cellX(coreS.length - 1 - i + s.open) + 70}px)` } as any}>
            <text className="sb-pop" x={0} y={RAIL_DY} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>{d}</text>
          </g>
        ))}
        {Array.from({ length: s.open }).map((_, j) => (
          <g key={"z" + s.gen + "-" + j} className="sb-move" style={{ transform: `translateX(${cellX(s.open - 1 - j) + 70}px)` } as any}>
            <text className="sb-pop" x={0} y={RAIL_DY} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={SB_GREY}>0</text>
          </g>
        ))}
        {len > 3 && <SbComma x={cellX(2) - 5} y={RAIL_DY - 8} color={C.ink} />}
        {len > 5 && <SbComma x={cellX(4) - 5} y={RAIL_DY - 8} color={C.ink} />}
        {s.eq && eqB !== null && eqB > 1 && (
          <SbEq cx={543} y={462} C={C} toks={[{ t: indian(s.a), f: SB_INK.blue }, { t: "× " + indian(eqB), f: SB_INK.amber, op: true }, { t: "=" }, { t: indian(s.a * eqB), f: SB_INK.green }]} />
        )}
        {/* the bench: the multiplier cards waiting */}
        {s.cards.map((c: any, i: number) => {
          if (c.used && !isFree) return null;
          const box = pos[i], id = s.k === "rail" ? "loose" : "send-" + c.v;
          return piece(id, "Send the times " + indian(c.v) + " card along the rail", { src: "send", i }, box, liveAny[i],
            <SbPlate x={box.x} y={box.y} w={box.w} text={"× " + indian(c.v)} col="amber" />);
        })}
        {isFree && (
          <Key id="home" label={tx("Walk the digits home")} x={0} y={424} w={190} h={80} C={C} onClick={home4}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("Home")}</text>
          </Key>
        )}
        {inviteI >= 0 && <Invite x={pos[inviteI].x + pos[inviteI].w / 2} y={60} r={56} C={C} />}
      </g>
    );
  };

  /* the running count: the arrangements worked against the arrangements on the bench */
  const runsA = isP1 ? S.sent : isP2 ? S.worked : isP3 ? S.done.filter(Boolean).length : S.sent;
  const runsB = isP1 ? S.cards.length : isP2 ? 2 : isP3 ? S.parts.length : S.cards.length;

  return (
    <g>
      <style>{SB_CSS}</style>
      <defs>
        {Object.keys(SB_COL).map((c) => (
          <linearGradient key={c} id={"sbG-" + c} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={tint(SB_COL[c], 0.9)} />
            <stop offset="1" stopColor={tint(SB_COL[c], 0.76)} />
          </linearGradient>
        ))}
      </defs>
      {k !== "free" && (
        <g data-zone="runs">
          <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          <text x={20} y={-40} fontSize={T.speech} fontWeight={700} fill={C.ink}>{runsA + (lang === "en" ? " of " : " / ") + runsB}</text>
          <text x={312} y={-46} textAnchor="end" fontSize={T.micro} fontWeight={500} fill={C.ink}>{tx("worked")}</text>
        </g>
      )}
      {isP1 ? view1() : isP2 ? view2() : isP3 ? view3() : view4()}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ result, C, w, h }: any) {
  const L = (result && result.last) || null;
  if (!L || L.value === null || L.value === undefined || L.value === "") return null;
  const q0 = L.shared && L.shared.eq ? String(L.shared.eq) : "", q = HOOK.tx ? HOOK.tx(q0) : q0;
  const isNum = typeof L.answer === "number";
  const main = isNum ? indian(leadNumber(L.value) ?? 0) : String(L.value).replace(/[()]/g, "");
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {q && <text x={w / 2} y={32} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{q}</text>}
      <text x={w / 2} y={q ? h - 14 : h / 2 + 12} textAnchor="middle" fontSize={isNum ? T.label : T.micro} fontWeight={700} fill={isNum ? SB_INK.green : C.ink}>{main}</text>
    </g>
  );
}

/* the slot writes a typed number from 1,000 up with its Indian commas, as everywhere else */
const sbSlotFormat = (v: any) => (/^[1-9]\d{3,8}$/.test(String(v ?? "")) ? indian(Number(v)) : String(v ?? ""));

function ShortcutBench(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format: sbSlotFormat, fitHost: () => null }} />
  );
}

export default ShortcutBench;
