/* ═══ M1.S2.T3.C8.2D1 · check_bench · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "check_bench";
const MEDIA_ID = "M1.S2.T3.C8.2D1";
const TOOL_NAME = "Check Bench";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["Two bays. The working in the upper one, and the putting back in the lower one."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every check written out in full, and every total held against the number it set out from.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Any subtraction, the verdict rail live and the dice bay open beside it.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r13+: `lineFor(line, lang, TR)`); the
   English above and below stays what the checks read. NCERT class 4 terms: इकाई दहाई सैकड़ा हज़ार /
   એકમ દશક શતક હજાર, वियोज्य वियोजक अंतर / વિયોજ્ય વિયોજક તફાવત, जाँच / ચકાસણી. Digits stay digits: the
   runtime speaks them in the language in use. A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Check Bench": "जाँच बेंच",
    "Two bays. The working in the upper one, and the putting back in the lower one.": "दो हिस्से। ऊपर वाले में हल, और नीचे वाले में वापस जोड़ना।",
    "Every check written out in full, and every total held against the number it set out from.": "हर जाँच पूरी लिखी गई, और हर जोड़ को शुरू की संख्या से मिलाया गया।",
    "Free play. Any subtraction, the verdict rail live and the dice bay open beside it.": "मुक्त खेल। कोई भी घटाना, सही-गलत की पट्टी चालू, और पास में पासों का हिस्सा खुला।",
    "The answer and the number taken away rebuild the start": "उत्तर और घटाई गई संख्या मिलकर शुरू की संख्या बनाते हैं",
    "Put back what you took away. Where does it land?": "जो घटाया था, उसे वापस रखो। यह कहाँ पहुँचता है?",
    "If you put that number back, what should be standing there?": "अगर वह संख्या वापस रखो, तो वहाँ क्या होना चाहिए?",
    "Add the two in the lower bay, one column at a time, from the ones.": "नीचे वाले हिस्से में दोनों को जोड़ो, इकाई से, एक-एक खाना।",
    "Difference plus subtrahend gives the minuend back.": "अंतर और वियोजक को जोड़ने से वियोज्य वापस मिलता है।",
    "You learned: difference plus subtrahend gives the minuend back.": "तुमने सीखा: अंतर और वियोजक जोड़ो, तो वियोज्य वापस मिलता है।",
    "The working took 21,543 away. It left 32,416. The start is under the lid. Drop them down and add them back together.": "हल में 21,543 घटाया गया। 32,416 बचा। शुरू की संख्या ढक्कन के नीचे है। दोनों को नीचे लाओ और वापस जोड़ो।",
    "Where does it land?": "यह कहाँ पहुँचता है?",
    "Which number was taken off the bench by the working?": "हल में बेंच से कौन सी संख्या घटाई गई थी?",
    "The difference is 5,214. The subtrahend is 3,478. What was the number on top?": "अंतर 5,214 है। वियोजक 3,478 है। ऊपर की संख्या क्या थी?",
    "Number on top?": "ऊपर की संख्या?",
    "The subtrahend was taken off the top. What puts it back?": "वियोजक ऊपर की संख्या से घटाया गया था। उसे वापस क्या लाता है?",
    "What do you add to a difference to get back to the number the working started from? Drag it down beside the answer.": "हल जिस संख्या से शुरू हुआ, वहाँ लौटने के लिए अंतर में क्या जोड़ते हो? उसे उत्तर के पास नीचे खींचो।",
    "Which one do you add?": "कौन सी जोड़ोगे?",
    "Which row did the working take off the top number?": "हल में ऊपर की संख्या से कौन सी पंक्ति घटाई गई?",
    "number on top": "ऊपर की संख्या", "number taken away": "घटाई गई संख्या",
    "A check worked all the way through": "शुरू से अंत तक पूरी जाँच",
    "Write the whole check out. Looking at an answer is not checking it.": "पूरी जाँच लिखो। उत्तर को बस देखना, जाँचना नहीं है।",
    "Which column does a check begin at?": "जाँच किस खाने से शुरू होती है?",
    "Take away one column at a time, from the ones. Take a ten when the top is short.": "इकाई से, एक-एक खाना घटाओ। ऊपर कम हो तो एक दहाई लो।",
    "Write the check out in full, because glancing at an answer is not checking it.": "जाँच पूरी लिखो, क्योंकि उत्तर पर नज़र डालना जाँचना नहीं है।",
    "You learned: write the check out in full; a glance is not a check.": "तुमने सीखा: जाँच पूरी लिखो; नज़र डालना जाँच नहीं है।",
    "Start at 81,375. Take away 46,208. Type what is left, then write the check out in full.": "81,375 से शुरू करो। 46,208 घटाओ। जो बचा वह लिखो, फिर पूरी जाँच लिखो।",
    "What is left?": "क्या बचा?",
    "Add your answer back onto the number taken away. Does it make the number on top?": "अपना उत्तर घटाई गई संख्या में वापस जोड़ो। क्या ऊपर की संख्या बनती है?",
    "Start at 29,857. Take away 12,304. Then check the answer by addition.": "29,857 से शुरू करो। 12,304 घटाओ। फिर उत्तर को जोड़कर जाँचो।",
    "Which column of the check has been added so far?": "जाँच का कौन सा खाना अब तक जोड़ा गया है?",
    "The greater number is 8,120. The difference is 3,946. Find the smaller number and check it.": "बड़ी संख्या 8,120 है। अंतर 3,946 है। छोटी संख्या निकालो और उसे जाँचो।",
    "Smaller number?": "छोटी संख्या?",
    "Put your smaller number and the difference together. Do they make the greater number?": "अपनी छोटी संख्या और अंतर को जोड़ो। क्या बड़ी संख्या बनती है?",
    "A printed answer can be wrong": "छपा हुआ उत्तर भी गलत हो सकता है",
    "Somebody has written this already. Check it before you believe it.": "यह किसी ने पहले से लिखा है। मानने से पहले इसे जाँचो।",
    "Is that the number the statement started from?": "क्या यही वह संख्या है जिससे कथन शुरू हुआ था?",
    "Drop the written answer down, add it back, and hold it against the start.": "लिखे उत्तर को नीचे लाओ, वापस जोड़ो, और शुरू की संख्या से मिलाओ।",
    "Check a written answer before you believe it, and then say what it should have been.": "लिखे उत्तर को मानने से पहले जाँचो, फिर बताओ कि वह क्या होना चाहिए था।",
    "You learned: check a written answer before you believe it.": "तुमने सीखा: लिखे उत्तर को मानने से पहले जाँचो।",
    "A sheet starts at 47,382. It takes away 25,140. It writes 21,242. Check it, then say whether it holds.": "एक पन्ना 47,382 से शुरू होता है। वह 25,140 घटाता है। वह 21,242 लिखता है। जाँचो, फिर बताओ कि यह सही है या नहीं।",
    "True or false?": "सही या गलत?",
    "What does the written answer come to when it is added back on to the number that was taken away?": "लिखे उत्तर को घटाई गई संख्या में वापस जोड़ने पर क्या बनता है?",
    "true": "सही", "false": "गलत",
    "A board starts at 63,470. It takes away 41,250. It writes 22,120. Is the statement right?": "एक बोर्ड 63,470 से शुरू होता है। वह 41,250 घटाता है। वह 22,120 लिखता है। क्या कथन सही है?",
    "Add the written answer back. Does the total match the number the board started at?": "लिखे उत्तर को वापस जोड़ो। क्या जोड़ बोर्ड की शुरू की संख्या से मिलता है?",
    "A board starts at 58,916. It takes away 27,504. It writes 31,412. True or false?": "एक बोर्ड 58,916 से शुरू होता है। वह 27,504 घटाता है। वह 31,412 लिखता है। सही या गलत?",
    "Hold its check against the start. Do the two read the same?": "इसकी जाँच को शुरू की संख्या से मिलाओ। क्या दोनों एक जैसे हैं?",
    "Addition and subtraction check each other": "जोड़ और घटाना एक-दूसरे को जाँचते हैं",
    "This time it is an addition. How would taking away test it?": "इस बार यह जोड़ है। घटाकर इसे कैसे जाँचोगे?",
    "What should be left when one part is taken off the total?": "कुल में से एक भाग घटाने पर क्या बचना चाहिए?",
    "Take the part away one column at a time, from the ones.": "इकाई से, एक-एक खाना करके भाग घटाओ।",
    "To check an addition, take one of its two numbers away from the total and look for the other one.": "जोड़ जाँचने के लिए, कुल में से उसकी एक संख्या घटाओ और दूसरी को ढूँढो।",
    "You learned: take one part from the total and the other is left.": "तुमने सीखा: कुल में से एक भाग घटाओ, तो दूसरा बचता है।",
    "A child adds two numbers and gets 62,703. One of them is 28,197. The other is under the lid. Turn it round. Take 28,197 from the total.": "एक बच्चा दो संख्याएँ जोड़कर 62,703 पाता है। उनमें से एक 28,197 है। दूसरी ढक्कन के नीचे है। इसे उलटो। कुल में से 28,197 घटाओ।",
    "Which of the three numbers is the total?": "तीनों संख्याओं में से कुल कौन सी है?",
    "A shopkeeper writes 44,721 as a total. One of the two numbers is 19,087. The lid hides the other. Take 19,087 away to check it.": "एक दुकानदार कुल 44,721 लिखता है। दो संख्याओं में से एक 19,087 है। ढक्कन दूसरी को छिपाता है। जाँचने के लिए 19,087 घटाओ।",
    "Start from the total, not from the two parts. What is left after taking one away?": "दोनों भागों से नहीं, कुल से शुरू करो। एक घटाने के बाद क्या बचता है?",
    "In a game of three, the dice make 12,345. It is taken from 99,999. The answer is written as 87,554. Add it back. Does it hold?": "तीन के खेल में पासे 12,345 बनाते हैं। इसे 99,999 में से घटाया जाता है। उत्तर 87,554 लिखा है। वापस जोड़ो। क्या यह सही है?",
    "Add it back. Total?": "वापस जोड़ो। कुल?",
    "The check adds the written answer to the rolled number. What does that come to?": "जाँच में लिखे उत्तर को पासों की संख्या में जोड़ते हैं। उससे क्या बनता है?",
    /* said once on the bench */
    "Now drop your answer down and add it back.": "अब अपना उत्तर नीचे लाओ और वापस जोड़ो।",
    "Hold the total against the number on top.": "कुल को ऊपर की संख्या से मिलाओ।",
    "Now send the statement to the end the check has earned.": "अब कथन को उस छोर पर भेजो जो जाँच ने बताया।",
    /* the working area's own words */
    "O": "इ", "T": "द", "H": "सै", "Th": "ह", "TTh": "द.ह.", "L": "ला",
    "checked": "जाँचे", "sums": "सवाल", "start": "शुरू", "part": "भाग", "taken away": "घटाया", "answer": "उत्तर", "check": "जाँच",
    "the book's check": "किताब की जाँच", "should be": "सही उत्तर",
    "top added": "ऊपर वाली जोड़ी", "your check": "तुम्हारी जाँच", "added again": "फिर से जोड़ा", "taken away again": "फिर से घटाया",
    "Add it back": "वापस जोड़ो", "Turn it round": "उलटो",
    "Roll the dice": "पासे फेंको", "Roll": "फेंको", "Fix": "ठीक करो", "Slip": "गलती",
    "Take the slip out of the working": "हल से गलती हटाओ", "Put a slip in the working": "हल में एक गलती डालो",
  },
  gu: {
    "Check Bench": "ચકાસણી બેન્ચ",
    "Two bays. The working in the upper one, and the putting back in the lower one.": "બે ભાગ. ઉપરના ભાગમાં ગણતરી, અને નીચેના ભાગમાં પાછું ઉમેરવું.",
    "Every check written out in full, and every total held against the number it set out from.": "દરેક ચકાસણી પૂરી લખાઈ, અને દરેક સરવાળો શરૂઆતની સંખ્યા સાથે સરખાવાયો.",
    "Free play. Any subtraction, the verdict rail live and the dice bay open beside it.": "મુક્ત રમત. કોઈ પણ બાદબાકી, સાચું-ખોટુંની પટ્ટી ચાલુ, અને બાજુમાં પાસાનો ભાગ ખુલ્લો.",
    "The answer and the number taken away rebuild the start": "જવાબ અને બાદ કરેલી સંખ્યા મળીને શરૂઆતની સંખ્યા બનાવે છે",
    "Put back what you took away. Where does it land?": "જે બાદ કર્યું હતું તે પાછું મૂકો. તે ક્યાં પહોંચે છે?",
    "If you put that number back, what should be standing there?": "જો તે સંખ્યા પાછી મૂકો, તો ત્યાં શું હોવું જોઈએ?",
    "Add the two in the lower bay, one column at a time, from the ones.": "નીચેના ભાગમાં બંનેને ઉમેરો, એકમથી, એક પછી એક ખાનું.",
    "Difference plus subtrahend gives the minuend back.": "તફાવત અને વિયોજક ઉમેરવાથી વિયોજ્ય પાછો મળે છે.",
    "You learned: difference plus subtrahend gives the minuend back.": "તમે શીખ્યા: તફાવત અને વિયોજક ઉમેરો, તો વિયોજ્ય પાછો મળે.",
    "The working took 21,543 away. It left 32,416. The start is under the lid. Drop them down and add them back together.": "ગણતરીમાં 21,543 બાદ કર્યા. 32,416 બાકી રહ્યા. શરૂઆતની સંખ્યા ઢાંકણ નીચે છે. બંનેને નીચે લાવો અને પાછા ઉમેરો.",
    "Where does it land?": "તે ક્યાં પહોંચે છે?",
    "Which number was taken off the bench by the working?": "ગણતરીમાં બેન્ચ પરથી કઈ સંખ્યા બાદ કરાઈ હતી?",
    "The difference is 5,214. The subtrahend is 3,478. What was the number on top?": "તફાવત 5,214 છે. વિયોજક 3,478 છે. ઉપરની સંખ્યા કઈ હતી?",
    "Number on top?": "ઉપરની સંખ્યા?",
    "The subtrahend was taken off the top. What puts it back?": "વિયોજક ઉપરની સંખ્યામાંથી બાદ થયો હતો. તેને પાછો શું લાવે?",
    "What do you add to a difference to get back to the number the working started from? Drag it down beside the answer.": "ગણતરી જે સંખ્યાથી શરૂ થઈ, ત્યાં પાછા પહોંચવા તફાવતમાં શું ઉમેરો? તેને જવાબની બાજુમાં નીચે ખેંચો.",
    "Which one do you add?": "કઈ ઉમેરશો?",
    "Which row did the working take off the top number?": "ગણતરીમાં ઉપરની સંખ્યામાંથી કઈ હરોળ બાદ થઈ?",
    "number on top": "ઉપરની સંખ્યા", "number taken away": "બાદ કરેલી સંખ્યા",
    "A check worked all the way through": "શરૂથી અંત સુધી પૂરી ચકાસણી",
    "Write the whole check out. Looking at an answer is not checking it.": "આખી ચકાસણી લખો. જવાબને ફક્ત જોવો એ ચકાસણી નથી.",
    "Which column does a check begin at?": "ચકાસણી કયા ખાનાથી શરૂ થાય છે?",
    "Take away one column at a time, from the ones. Take a ten when the top is short.": "એકમથી, એક પછી એક ખાનું બાદ કરો. ઉપર ઓછું હોય તો એક દશક લો.",
    "Write the check out in full, because glancing at an answer is not checking it.": "ચકાસણી પૂરી લખો, કારણ કે જવાબ પર નજર નાખવી એ ચકાસણી નથી.",
    "You learned: write the check out in full; a glance is not a check.": "તમે શીખ્યા: ચકાસણી પૂરી લખો; નજર નાખવી એ ચકાસણી નથી.",
    "Start at 81,375. Take away 46,208. Type what is left, then write the check out in full.": "81,375 થી શરૂ કરો. 46,208 બાદ કરો. જે બાકી રહે તે લખો, પછી આખી ચકાસણી લખો.",
    "What is left?": "શું બાકી રહ્યું?",
    "Add your answer back onto the number taken away. Does it make the number on top?": "તમારો જવાબ બાદ કરેલી સંખ્યામાં પાછો ઉમેરો. શું ઉપરની સંખ્યા બને છે?",
    "Start at 29,857. Take away 12,304. Then check the answer by addition.": "29,857 થી શરૂ કરો. 12,304 બાદ કરો. પછી જવાબનો સરવાળો કરી ચકાસો.",
    "Which column of the check has been added so far?": "ચકાસણીનું કયું ખાનું અત્યાર સુધી ઉમેરાયું છે?",
    "The greater number is 8,120. The difference is 3,946. Find the smaller number and check it.": "મોટી સંખ્યા 8,120 છે. તફાવત 3,946 છે. નાની સંખ્યા શોધો અને તેને ચકાસો.",
    "Smaller number?": "નાની સંખ્યા?",
    "Put your smaller number and the difference together. Do they make the greater number?": "તમારી નાની સંખ્યા અને તફાવતને ઉમેરો. શું મોટી સંખ્યા બને છે?",
    "A printed answer can be wrong": "છાપેલો જવાબ પણ ખોટો હોઈ શકે",
    "Somebody has written this already. Check it before you believe it.": "આ કોઈએ પહેલેથી લખ્યું છે. માનતાં પહેલાં તેને ચકાસો.",
    "Is that the number the statement started from?": "શું આ એ જ સંખ્યા છે જેનાથી વિધાન શરૂ થયું હતું?",
    "Drop the written answer down, add it back, and hold it against the start.": "લખેલો જવાબ નીચે લાવો, પાછો ઉમેરો, અને શરૂઆતની સંખ્યા સાથે સરખાવો.",
    "Check a written answer before you believe it, and then say what it should have been.": "લખેલો જવાબ માનતાં પહેલાં ચકાસો, પછી કહો કે તે શું હોવો જોઈતો હતો.",
    "You learned: check a written answer before you believe it.": "તમે શીખ્યા: લખેલો જવાબ માનતાં પહેલાં ચકાસો.",
    "A sheet starts at 47,382. It takes away 25,140. It writes 21,242. Check it, then say whether it holds.": "એક પાનું 47,382 થી શરૂ થાય છે. તે 25,140 બાદ કરે છે. તે 21,242 લખે છે. ચકાસો, પછી કહો કે તે સાચું છે કે નહીં.",
    "True or false?": "સાચું કે ખોટું?",
    "What does the written answer come to when it is added back on to the number that was taken away?": "લખેલા જવાબને બાદ કરેલી સંખ્યામાં પાછો ઉમેરતાં શું મળે છે?",
    "true": "સાચું", "false": "ખોટું",
    "A board starts at 63,470. It takes away 41,250. It writes 22,120. Is the statement right?": "એક બોર્ડ 63,470 થી શરૂ થાય છે. તે 41,250 બાદ કરે છે. તે 22,120 લખે છે. શું વિધાન સાચું છે?",
    "Add the written answer back. Does the total match the number the board started at?": "લખેલો જવાબ પાછો ઉમેરો. શું સરવાળો બોર્ડની શરૂઆતની સંખ્યા સાથે મળે છે?",
    "A board starts at 58,916. It takes away 27,504. It writes 31,412. True or false?": "એક બોર્ડ 58,916 થી શરૂ થાય છે. તે 27,504 બાદ કરે છે. તે 31,412 લખે છે. સાચું કે ખોટું?",
    "Hold its check against the start. Do the two read the same?": "તેની ચકાસણીને શરૂઆતની સંખ્યા સાથે સરખાવો. શું બંને સરખાં છે?",
    "Addition and subtraction check each other": "સરવાળો અને બાદબાકી એકબીજાને ચકાસે છે",
    "This time it is an addition. How would taking away test it?": "આ વખતે સરવાળો છે. બાદ કરીને તેને કેવી રીતે ચકાસશો?",
    "What should be left when one part is taken off the total?": "કુલમાંથી એક ભાગ બાદ કરતાં શું બાકી રહેવું જોઈએ?",
    "Take the part away one column at a time, from the ones.": "એકમથી, એક પછી એક ખાનું કરીને ભાગ બાદ કરો.",
    "To check an addition, take one of its two numbers away from the total and look for the other one.": "સરવાળો ચકાસવા, કુલમાંથી તેની એક સંખ્યા બાદ કરો અને બીજી શોધો.",
    "You learned: take one part from the total and the other is left.": "તમે શીખ્યા: કુલમાંથી એક ભાગ બાદ કરો, તો બીજો બાકી રહે.",
    "A child adds two numbers and gets 62,703. One of them is 28,197. The other is under the lid. Turn it round. Take 28,197 from the total.": "એક બાળક બે સંખ્યાઓ ઉમેરીને 62,703 મેળવે છે. તેમાંથી એક 28,197 છે. બીજી ઢાંકણ નીચે છે. તેને ઊલટાવો. કુલમાંથી 28,197 બાદ કરો.",
    "Which of the three numbers is the total?": "ત્રણ સંખ્યાઓમાંથી કુલ કઈ છે?",
    "A shopkeeper writes 44,721 as a total. One of the two numbers is 19,087. The lid hides the other. Take 19,087 away to check it.": "એક દુકાનદાર કુલ 44,721 લખે છે. બે સંખ્યાઓમાંથી એક 19,087 છે. ઢાંકણ બીજીને છુપાવે છે. ચકાસવા 19,087 બાદ કરો.",
    "Start from the total, not from the two parts. What is left after taking one away?": "બે ભાગથી નહીં, કુલથી શરૂ કરો. એક બાદ કર્યા પછી શું બાકી રહે છે?",
    "In a game of three, the dice make 12,345. It is taken from 99,999. The answer is written as 87,554. Add it back. Does it hold?": "ત્રણની રમતમાં પાસા 12,345 બનાવે છે. તેને 99,999 માંથી બાદ કરાય છે. જવાબ 87,554 લખ્યો છે. પાછો ઉમેરો. શું તે સાચું છે?",
    "Add it back. Total?": "પાછું ઉમેરો. કુલ?",
    "The check adds the written answer to the rolled number. What does that come to?": "ચકાસણીમાં લખેલો જવાબ પાસાની સંખ્યામાં ઉમેરાય છે. તેનાથી શું મળે છે?",
    /* said once on the bench */
    "Now drop your answer down and add it back.": "હવે તમારો જવાબ નીચે લાવો અને પાછો ઉમેરો.",
    "Hold the total against the number on top.": "કુલને ઉપરની સંખ્યા સાથે સરખાવો.",
    "Now send the statement to the end the check has earned.": "હવે વિધાનને તે છેડે મોકલો જે ચકાસણીએ બતાવ્યો.",
    /* the working area's own words */
    "O": "એ", "T": "દ", "H": "શ", "Th": "હ", "TTh": "દ.હ.", "L": "લા",
    "checked": "ચકાસ્યા", "sums": "દાખલા", "start": "શરૂઆત", "part": "ભાગ", "taken away": "બાદ કર્યા", "answer": "જવાબ", "check": "ચકાસણી",
    "the book's check": "પુસ્તકની ચકાસણી", "should be": "સાચો જવાબ",
    "top added": "ઉપરની ઉમેરી", "your check": "તમારી ચકાસણી", "added again": "ફરી ઉમેર્યું", "taken away again": "ફરી બાદ કર્યું",
    "Add it back": "પાછું ઉમેરો", "Turn it round": "ઊલટાવો",
    "Roll the dice": "પાસા ફેંકો", "Roll": "ફેંકો", "Fix": "સુધારો", "Slip": "ભૂલ",
    "Take the slip out of the working": "ગણતરીમાંથી ભૂલ કાઢો", "Put a slip in the working": "ગણતરીમાં એક ભૂલ મૂકો",
  },
};

/* ── the bench ──────────────────────────────────────────────────────────────────────────
   Two bays of the book's column mat, one above the other and joined by a spine: the working
   above, the check below. The headings (TTh Th H T O) sit over the upper bay and the columns run
   straight down through both. The number on top is deep blue, the number taken away amber, the
   answer under a rule green; a ten lifted out of a column (or a carried one) is vermilion, a digit
   rewritten after that trade rose over its struck digit (the strike in ink), a zero holding a
   place grey. Drop to check slides copies of the answer and the number taken away down into the
   lower bay; the originals never leave. Hold against lifts the check's total along a drawn path to
   the shelf, beside a copy of the number the working set out from; the pairs are read from the
   right and the match light fills only when the last pair agrees (where they part, that column
   keeps an amber ring and the light stays dark). The number a check should land on waits under a
   lid until the check is held against it, so the check is added, never read off. */
const HEADS = ["O", "T", "H", "Th", "TTh", "L"];
const TOP_C = CONTENT.hundred;   /* the number on top */
const TAKE_C = CONTENT.ten;      /* the number taken away */
const ANS_C = CONTENT.one;       /* the answer under the rule */
const LENT_C = CONTENT.pointer;  /* the ten lifted out, a carried one */
const NEW_C = CONTENT.bead;      /* a digit rewritten after the trade */
const ZERO_C = "#767676";        /* a zero holding a place open */
const AMBER = CONTENT.ten;       /* the column being worked; the column where two numbers part */
const inkOf = (c: string) => shade(c, 0.25);

/* geometry in working-area units (1086 x 528); the ones column is pinned right */
const CW = 100;
const colC = (k: number) => 630 - k * CW;
const colX = (k: number) => colC(k) - CW / 2;
const BAY_W = 700;
/* two layouts: tall bays where the foot of the area is free (phases 1, 2, 4), and the plan's
   206-tall bays above the verdict rail (phase 3 and free play, where the working is never redone
   in the upper bay, so it needs no row for rewritten digits) */
const LAYOUT: any = {
  tall: {
    UP: { y0: 0, h: 250, marks: 72, r1: 120, r2: 174, rule: 184, ans: 234, sq: 197, top: 44, bot: 244 },
    LO: { y0: 278, h: 250, marks: 318, r1: 368, r2: 420, rule: 430, ans: 482, sq: 445, top: 288, bot: 520 },
    key: { x: 772, y: 300, w: 280, h: 92 }, dice: { x: 762, y: 278, w: 300, h: 206 },
  },
  short: {
    UP: { y0: 0, h: 206, marks: 60, r1: 82, r2: 128, rule: 140, ans: 186, sq: 150, top: 42, bot: 202 },
    LO: { y0: 228, h: 206, marks: 262, r1: 304, r2: 350, rule: 360, ans: 410, sq: 373, top: 236, bot: 428 },
    key: { x: 772, y: 254, w: 280, h: 92 }, dice: { x: 762, y: 228, w: 300, h: 206 },
  },
};
const SH = { x: 762, w: 300, h: 206, a: 78, b: 172, lx: 780, lamp: { x: 818, y: 125 } };
const CARD = { w: 520, h: 72, y: 453, grip: 50 };
const cardX = (at: string) => (at === "true" ? 206 : at === "false" ? 364 : 283);
const shX = (k: number) => 1036 - k * 28 - (k >= 3 ? 14 : 0) - (k >= 5 ? 14 : 0);

const range = (a: number, b: number) => Array.from({ length: Math.max(0, b - a) }, (_, i) => a + i);
const dig = (v: number, k: number) => Math.floor(Math.abs(v) / Math.pow(10, k)) % 10;
const lenOf = (v: number) => String(Math.max(0, Math.trunc(Math.abs(v || 0)))).length;
const digitsOf = (v: number) => String(Math.trunc(Math.abs(v))).split("").reverse().map(Number);

/* column addition from the ones: the digit that stays and the one carried on */
const addCols = (a: number, b: number, cols: number) => {
  const out: any[] = [];
  let c = 0;
  for (let k = 0; k < cols; k++) {
    const s = dig(a, k) + dig(b, k) + c;
    out.push({ d: s % 10, carry: s >= 10 ? 1 : 0 });
    c = s >= 10 ? 1 : 0;
  }
  return out;
};
/* column subtraction, the book's way: a column whose top is short takes a ten from its left, and
   across a zero the ten travels on. Per column: the value it gives down to (mid), the value it ends
   with (now), and the step (the column being worked) at which each rewrite is written. */
const subCols = (a: number, b: number, cols: number) => {
  const out: any[] = [];
  let gave = 0;
  for (let k = 0; k < cols; k++) {
    const t = dig(a, k) - gave, took = t < dig(b, k);
    out.push({ gave: !!gave, took, forced: t < 0, mid: t, now: took ? t + 10 : t, d: (took ? t + 10 : t) - dig(b, k) });
    gave = took ? 1 : 0;
  }
  for (let k = 0; k < cols; k++) {
    const c = out[k];
    c.atGave = c.gave ? out[k - 1].atTook : 99;
    c.atTook = c.took ? (c.forced ? c.atGave : k) : 99;
  }
  return out;
};
const rewriteAt = (c: any, s: number) => (s >= c.atTook ? c.now : s >= c.atGave ? c.mid : null);

/* the classic slip: the smaller digit taken from the larger in every column */
const slipOf = (a: number, b: number) => range(0, lenOf(a)).reduce((s, k) => s + Math.abs(dig(a, k) - dig(b, k)) * Math.pow(10, k), 0);

/* One entry per phase = one mount.
   items   kinds: addback   the working stands above; drop its answer and the number taken away down,
                            add them (a digit a column from the ones, or the whole total) and hold the
                            total against the start (under a lid when `lid`)
                  which     the difference is already down; drag the number that goes with it (or choose)
                  subcheck  work the subtraction (type what is left), then drop it, add it back and hold
                            it against the top: the check decides when the answer goes in
                  verdict   a written statement: drop, add it back, hold it against the start, then send
                            the card to the true or the false end of the rail (or press a verdict key)
                  takeback  an addition with one part under a lid: turn it round and take the other part
                            from the total (a digit a column, or the whole); what is left is held against
                            the lid */
const PHASES = [
  {
    n: 1,
    concept: "The answer and the number taken away rebuild the start",
    conceptId: "M1.S2.T3.C8", objectiveIds: ["O3"],
    says: ["Put back what you took away. Where does it land?"],
    /* tries, as the plan writes it: A miss is answered three ways at once and none of them is the answer. First rung, from the item's own miss line: which number was taken off the bench by the working? Second rung, the phase's: if you put that number back, what should be standing there? Third rung: the bench is cut to a two column subtraction and the child drops the pair and adds it back. The number pad stays open behind all three rungs. */
    ladder: ["If you put that number back, what should be standing there?", "Add the two in the lower bay, one column at a time, from the ones."],
    closing: "Difference plus subtrahend gives the minuend back.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: difference plus subtrahend gives the minuend back.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The pair drops into the lower bay and is added column by column from the ones, each carry small above its column; the total lifts to the shelf, the lid opens on the start, the pairs are read from the right and the match light fills. When the number on top was added instead, that sum runs first and stands taller than the start with the light dark, the rows are named, and the right pair rebuilds the start.",
    items: [
      /* learn ML1: answer in the plan = On 53,959, the number the working started from (the start waits under the lid, so the landing is added, not read) */
      { qid: "M1.S2.T3.C8:ML1", kind: "addback", lid: true, top: 53959, sub: 21543, diff: 32416, answer: 53959, winMs: 3800, ask: "Where does it land?",
        say: "The working took 21,543 away. It left 32,416. The start is under the lid. Drop them down and add them back together.",
        miss: "Which number was taken off the bench by the working?" },
      /* practice 1: answer in the plan = 8,692 */
      { qid: "M1.S2.T3.C8:1", kind: "addback", lid: true, top: 8692, sub: 3478, diff: 5214, answer: 8692, winMs: 3800, ask: "Number on top?",
        say: "The difference is 5,214. The subtrahend is 3,478. What was the number on top?",
        miss: "The subtrahend was taken off the top. What puts it back?" },
      /* practice 2: answer in the plan = The subtrahend, which is the number that was taken away
         (the plan names no numbers: the bench shows 7,425 take away 2,816, which leaves 4,609) */
      { qid: "M1.S2.T3.C8:2", kind: "which", top: 7425, sub: 2816, diff: 4609, answer: "subtrahend", winMs: 3800, ask: "Which one do you add?",
        choices: [{ id: "minuend", label: "number on top" }, { id: "subtrahend", label: "number taken away" }],
        say: "What do you add to a difference to get back to the number the working started from? Drag it down beside the answer.",
        miss: "Which row did the working take off the top number?" },
    ],
  },
  {
    n: 2,
    concept: "A check worked all the way through",
    conceptId: "M1.S2.T3.C9", objectiveIds: ["O3"],
    says: ["Write the whole check out. Looking at an answer is not checking it."],
    /* tries, as the plan writes it: First rung, from the item: which column of the check has been added so far? Second rung, the phase's: which column does a check begin at? Third rung: the check is cut to two columns and the child adds those two and holds the total against the number on top. The number pad stays open. */
    ladder: ["Which column does a check begin at?", "Take away one column at a time, from the ones. Take a ten when the top is short."],
    closing: "Write the check out in full, because glancing at an answer is not checking it.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: write the check out in full; a glance is not a check.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The child's answer drops into the lower bay and is added back column by column; its total stands on the shelf beside the number on top with the light dark and the first column that parts ringed; then the subtraction is worked again column by column, a ten taken where the top is short, and the right answer is checked until the light fills.",
    items: [
      /* learn ML2: answer in the plan = 35,167, and the check is 35,167 + 46,208 = 81,375 */
      { qid: "M1.S2.T3.C9:ML2", kind: "subcheck", top: 81375, sub: 46208, answer: 35167, winMs: 3000, ask: "What is left?",
        say: "Start at 81,375. Take away 46,208. Type what is left, then write the check out in full.",
        miss: "Add your answer back onto the number taken away. Does it make the number on top?" },
      /* practice 3: answer in the plan = 17,553, and the check is 17,553 + 12,304 = 29,857 */
      { qid: "M1.S2.T3.C9:3", kind: "subcheck", top: 29857, sub: 12304, answer: 17553, winMs: 3000, ask: "What is left?",
        say: "Start at 29,857. Take away 12,304. Then check the answer by addition.",
        miss: "Which column of the check has been added so far?" },
      /* practice 4: answer in the plan = 4,174, and the check is 4,174 + 3,946 = 8,120 */
      { qid: "M1.S2.T3.C9:4", kind: "subcheck", top: 8120, sub: 3946, answer: 4174, winMs: 3000, ask: "Smaller number?",
        say: "The greater number is 8,120. The difference is 3,946. Find the smaller number and check it.",
        miss: "Put your smaller number and the difference together. Do they make the greater number?" },
    ],
  },
  {
    n: 3,
    concept: "A printed answer can be wrong",
    conceptId: "M1.S2.T3.C10", objectiveIds: ["O4"],
    says: ["Somebody has written this already. Check it before you believe it."],
    /* tries, as the plan writes it: First rung, from the item: what does the written answer come to when it is added back on to the number that was taken away? Second rung, the phase's: is that the number the statement started from? Third rung: the statement is cut to a two column one and the child checks it and sends it to an end. The verdict keys stay open. */
    ladder: ["Is that the number the statement started from?", "Drop the written answer down, add it back, and hold it against the start."],
    closing: "Check a written answer before you believe it, and then say what it should have been.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: check a written answer before you believe it.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The statement springs back to the middle of the rail with nothing marked; the check runs by itself (drop, add it back, hold it against the start), the pairs are read from the right, and the end the check earned lights, with the true difference beside it when the statement fails.",
    items: [
      /* learn ML3: answer in the plan = It is wrong. The true difference is 22,242 */
      { qid: "M1.S2.T3.C10:ML3", kind: "verdict", top: 47382, sub: 25140, written: 21242, answer: "false", winMs: 3400, ask: "True or false?",
        choices: [{ id: "true", label: "true" }, { id: "false", label: "false" }],
        say: "A sheet starts at 47,382. It takes away 25,140. It writes 21,242. Check it, then say whether it holds.",
        miss: "What does the written answer come to when it is added back on to the number that was taken away?" },
      /* practice 5: answer in the plan = No. The true difference is 22,220, because 22,220 + 41,250 = 63,470 */
      { qid: "M1.S2.T3.C10:5", kind: "verdict", top: 63470, sub: 41250, written: 22120, answer: "false", winMs: 3400, ask: "True or false?",
        choices: [{ id: "true", label: "true" }, { id: "false", label: "false" }],
        say: "A board starts at 63,470. It takes away 41,250. It writes 22,120. Is the statement right?",
        miss: "Add the written answer back. Does the total match the number the board started at?" },
      /* practice 6: answer in the plan = Yes. Adding 31,412 and 27,504 gives 58,916, the number it started from */
      { qid: "M1.S2.T3.C10:6", kind: "verdict", top: 58916, sub: 27504, written: 31412, answer: "true", winMs: 3400, ask: "True or false?",
        choices: [{ id: "true", label: "true" }, { id: "false", label: "false" }],
        say: "A board starts at 58,916. It takes away 27,504. It writes 31,412. True or false?",
        miss: "Hold its check against the start. Do the two read the same?" },
    ],
  },
  {
    n: 4,
    concept: "Addition and subtraction check each other",
    conceptId: "M1.S2.T3.C11", objectiveIds: ["O4"],
    says: ["This time it is an addition. How would taking away test it?"],
    /* tries, as the plan writes it: First rung, from the item: which of the three numbers is the total? Second rung, the phase's: what should be left when one part is taken off the total? Third rung: the bench is cut to a two column addition and the child checks it by taking one number away. The number pad stays open. */
    ladder: ["What should be left when one part is taken off the total?", "Take the part away one column at a time, from the ones."],
    closing: "To check an addition, take one of its two numbers away from the total and look for the other one.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: take one part from the total and the other is left.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "The bench turns round and the part is taken from the total column by column from the ones, each trade a struck digit with its new value small above in rose; what is left lifts to the shelf, the lid opens on the other part and the light fills. The dice sum is added back column by column and held against 99,999, where the hundreds part.",
    items: [
      /* learn ML4: answer in the plan = The addition is right, because 62,703 - 28,197 = 34,506 (the other part waits under the lid) */
      { qid: "M1.S2.T3.C11:ML4", kind: "takeback", a: 34506, b: 28197, total: 62703, answer: 34506, winMs: 3800, ask: "What is left?",
        say: "A child adds two numbers and gets 62,703. One of them is 28,197. The other is under the lid. Turn it round. Take 28,197 from the total.",
        miss: "Which of the three numbers is the total?" },
      /* practice 7: answer in the plan = It is right, because 44,721 - 19,087 = 25,634 */
      { qid: "M1.S2.T3.C11:7", kind: "takeback", a: 25634, b: 19087, total: 44721, answer: 25634, winMs: 3800, ask: "What is left?",
        say: "A shopkeeper writes 44,721 as a total. One of the two numbers is 19,087. The lid hides the other. Take 19,087 away to check it.",
        miss: "Start from the total, not from the two parts. What is left after taking one away?" },
      /* practice 8: answer in the plan = It is wrong. Adding 87,554 and 12,345 gives 99,899, not 99,999, so the difference should be 87,654
         (asked: the check's total, which the dice game then holds against 99,999) */
      { qid: "M1.S2.T3.C11:8", kind: "addback", lid: false, dice: [1, 2, 3, 4, 5], top: 99999, sub: 12345, diff: 87554, answer: 99899, winMs: 3800, ask: "Add it back. Total?",
        say: "In a game of three, the dice make 12,345. It is taken from 99,999. The answer is written as 87,554. Add it back. Does it hold?",
        miss: "The check adds the written answer to the rolled number. What does that come to?" },
    ],
  },
];

/* said once on the bench while a check is being built (no numbers in them) */
const LINE_DROP = "Now drop your answer down and add it back.";
const LINE_HOLD = "Hold the total against the number on top.";
const LINE_SEND = "Now send the statement to the end the check has earned.";

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  bays: { upper: { x: 0, y: 0, w: BAY_W, h: "250 (206 above the rail)" }, lower: { x: 0, y: "278 (228 above the rail)", w: BAY_W, h: "250 (206)" }, spine: { x: 344, w: 12 },
    columnWidth: CW, headings: HEADS, rows: "the number on top, the number taken away with its sign 76 to the left, a rule 6 tall, the answer in one square a column" },
  shelf: { x: 762, y: 0, w: 300, h: 206, rows: ["start (or part)", "check"], matchLight: "fills only when the last pair from the right agrees; the first pair that parts keeps an amber ring" },
  diceBay: { x: 762, y: "278 (228 in free play)", w: 300, h: 206, use: "phase 4 question 3 and free play: five dice build the number taken from 99,999" },
  verdictRail: { x: 0, y: 450, w: 1086, h: 78, ends: ["true", "false"], use: "phase 3 and free play" },
  lid: "the number a check should land on (the start in phase 1, the other part in phase 4) waits under a lid until the check is held against it",
  colours: { top: TOP_C, takenAway: TAKE_C, answer: ANS_C, lentTen: LENT_C, rewritten: NEW_C, placeZero: ZERO_C, workingColumn: AMBER },
  runs: "checks held against the start in this phase, and the sums on the bench (3)",
  freePlay: { first: "the chapter's worked check, 98,975 take away 56,986", start: 99999, dice: "Roll: five dice, 1 to 6, make the number taken from 99,999", slip: "puts a one-column slip into the working so the check can catch it",
    rail: "the statement card docks at either end", check: "drop the answer down: it is added back and held against 99,999 by itself" },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: numbers compare as numbers (with or without commas); words compare as words */
const judge = (item: any, v: any) => {
  if (v === null || v === undefined || typeof v === "object") return false;
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work:
   plain arithmetic on the item's own numbers (the bench works in columns) */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "addback") return it.answer === it.diff + it.sub && (!it.lid || it.top - it.sub === it.diff)
    && (!it.dice || Number(it.dice.join("")) === it.sub);
  if (it.kind === "which") return it.answer === "subtrahend" && it.top - it.sub === it.diff && it.diff + it.sub === it.top;
  if (it.kind === "subcheck") return it.answer === it.top - it.sub && it.answer + it.sub === it.top;
  if (it.kind === "verdict") return it.answer === (it.top - it.sub === it.written ? "true" : "false");
  if (it.kind === "takeback") return it.a + it.b === it.total && it.answer === it.total - it.b;
  return false;
}));
/* the most likely wrong answer (the item's misconception); judge must reject it */
const nearMiss = (item: any) => {
  if (item.kind === "addback") return item.lid ? item.diff - item.sub : item.top; /* taken away again / assumed to land on the start */
  if (item.kind === "which") return "minuend";                                    /* the difference added to the number on top */
  /* phase 2: the child types the difference and the bench runs the check before it counts, so the plan's two
     check errors (a verdict without the check, the top number copied into the total) cannot be typed; the
     likeliest slip in the working (the smaller digit taken from the larger) stands in, and the check catches it */
  if (item.kind === "subcheck") { const s = slipOf(item.top, item.sub); return s !== item.answer ? s : item.answer + 100; }
  if (item.kind === "verdict") return item.answer === "true" ? "false" : "true";  /* believed (or doubted) as written */
  if (item.kind === "takeback") return item.total;                                 /* the two numbers added again */
  return "~";
};
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
  : item.kind === "verdict" ? (item.answer === "true" ? ["it holds", "it is right"] : ["does not hold", "it is wrong"])
    : item.kind === "which" ? ["subtrahend", "number taken away"] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, drv: any) => drv.submit(item.answer);
/* the agent's answer(): typed, or a choice (undefined = the runtime types it or picks it) */
const answer = (item: any, v: any) => undefined;
/* the agent's check() before Enter: a written answer waiting for its check gets it; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);
/* the slot shows a typed number with its Indian commas, and a choice by its short name */
const SHOWN: Record<string, string> = { minuend: "on top", subtrahend: "taken away", true: "true", false: "false" };
const format = (s: any) => {
  const t = String(s ?? "");
  if (/^\d{4,}$/.test(t)) return indian(Number(t));
  return SHOWN[t] || t;
};

/* ── pieces ─────────────────────────────────────────────────────────────────────────── */
const PIPS: Record<number, number[][]> = {
  1: [[0.5, 0.5]], 2: [[0.27, 0.27], [0.73, 0.73]], 3: [[0.25, 0.25], [0.5, 0.5], [0.75, 0.75]],
  4: [[0.28, 0.28], [0.72, 0.28], [0.28, 0.72], [0.72, 0.72]], 5: [[0.27, 0.27], [0.73, 0.27], [0.5, 0.5], [0.27, 0.73], [0.73, 0.73]],
  6: [[0.28, 0.24], [0.72, 0.24], [0.28, 0.5], [0.72, 0.5], [0.28, 0.76], [0.72, 0.76]],
};
function DieFace({ x, y, s, v, C }: any) {
  return (
    <g>
      <rect x={x} y={y} width={s} height={s} rx={10} fill="#FFFFFF" stroke={shade(C.rule, 0.3)} strokeWidth={2} />
      {(PIPS[v] || []).map((p: number[], i: number) => <circle key={i} cx={x + p[0] * s} cy={y + p[1] * s} r={s * 0.085} fill={C.ink} />)}
    </g>
  );
}

const emptyShelf = (label: string) => ({ a: null, b: null, read: -1, part: -1, lit: false, label });
const colsOf = (it: any) => {
  const nums = it.kind === "which" ? [it.top, it.sub, it.diff, it.top + it.diff]
    : it.kind === "takeback" ? [it.a, it.b, it.total]
      : it.kind === "verdict" ? [it.top, it.sub, it.written, it.written + it.sub]
        : it.kind === "subcheck" ? [it.top, it.sub]
          : [it.top, it.sub, it.diff, it.diff + it.sub];
  return Math.min(6, Math.max(...nums.map(lenOf)));
};
/* the bench an item opens on */
const benchFor = (it: any) => {
  const base: any = { kind: it.kind, it, cols: colsOf(it), lid: false, turned: false, card: "mid", endLit: null, tag: null,
    revealed: false, cur: -1, curBay: "lo", names: false, glow: false, rival: null, shelf: emptyShelf("start") };
  const sub = (r1: number, r2: number, ans: any) => ({ op: "sub", r1, r2, ans, done: 99, step: -1, len: Math.max(lenOf(r1), lenOf(r2)), c1: TOP_C, c2: TAKE_C });
  const low = (len: number, o: any = {}) => ({ op: "add", r1: null, r2: null, done: 0, step: -1, len, c1: ANS_C, c2: TAKE_C, v: 0, ...o });
  if (it.kind === "which") return { ...base, up: sub(it.top, it.sub, it.diff), lo: low(Math.max(lenOf(it.diff), lenOf(it.top)), { r1: it.diff }) };
  if (it.kind === "subcheck") return { ...base, up: sub(it.top, it.sub, null), lo: low(lenOf(it.top), { r2: it.sub }) };
  if (it.kind === "verdict") return { ...base, up: sub(it.top, it.sub, it.written), lo: low(Math.max(lenOf(it.written), lenOf(it.sub))) };
  if (it.kind === "takeback") return { ...base, lid: true, shelf: emptyShelf("part"),
    up: { ...sub(it.a, it.b, it.total), op: "add" }, lo: { ...low(lenOf(it.total)), op: null } };
  return { ...base, lid: !!it.lid, up: sub(it.top, it.sub, it.diff), lo: low(Math.max(lenOf(it.diff), lenOf(it.sub))) };
};
/* free play: the chapter's own worked check first (98,975 take away 56,986), then 99,999 take away the
   number the dice make; a slip takes one off the first column from the hundreds down that can spare it */
const BOOK_CHECK = { top: 98975, sub: 56986 };
const freeBench = (top: number, sub: number, dice: number[] | null, slip: boolean) => {
  const right = top - sub;
  const diff = !slip ? right : dig(right, 2) > 0 ? right - 100 : dig(right, 1) > 0 ? right - 10 : right + 1;
  return { ...benchFor({ kind: "addback", lid: false, top, sub, diff }), kind: "free", dice, slip };
};

const CB_CSS = `
.cb-slide{animation:cbSlide 620ms cubic-bezier(.3,.7,.25,1) both}
@keyframes cbSlide{from{transform:translateY(var(--dy))}to{transform:none}}
.cb-fade{animation:cbFade 420ms ease-out both}
@keyframes cbFade{from{opacity:0}to{opacity:1}}
.cb-card{transition:transform 380ms cubic-bezier(.3,.7,.25,1)}
.cb-grab{cursor:grab}
@media (prefers-reduced-motion:reduce){.cb-slide,.cb-fade{animation:none}.cb-card,.cb-fly{transition:none!important}}
`;

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const [b, setB] = useState<any>(() => benchFor(item));
  const bRef = useRef<any>(b);
  const put = (x: any) => { bRef.current = x; setB(x); };
  const upd = (f: (x: any) => any) => put(f(bRef.current));
  const [fly, setFly] = useState<any>(null);
  const [held, setHeld] = useState<number[]>([]);      /* questions whose check stood on the shelf */
  const [touched, setTouched] = useState(false);
  const stageRef = useRef(stage);
  stageRef.current = stage;
  const idxRef = useRef(index);
  idxRef.current = index;
  const setupFor = useRef<any>(index);
  const said = useRef<Record<string, boolean>>({});
  const busy = tl.busy;
  const busyRef = useRef(busy);
  busyRef.current = busy;
  const tick = () => api.sfx.tick();
  const kind = b.kind;
  const it = b.it;
  const asking = stage === "ask";
  const tall = !(kind === "verdict" || kind === "free");
  const { UP, LO, key: KEY_BOX, dice: DICE } = LAYOUT[tall ? "tall" : "short"];
  const sayOnce = (key: string, line: string) => { if (said.current[key]) return; said.current[key] = true; api.say(line); };

  const reset = (x: any) => { tl.stop(); put(x); setFly(null); setTouched(false); said.current = {}; api.lock(false); };
  useEffect(() => {
    if ((stage === "ask" || stage === "teach") && setupFor.current !== index) { setupFor.current = index; reset(benchFor(item)); }
  }, [stage, index]);
  /* free play (the plan's freePlay): 99,999 take away what the dice make; drop the answer down and
     the check runs by itself; a slip can be put in; the statement docks at either end; nothing to get right */
  useEffect(() => {
    if (!free) return;
    setupFor.current = -2;
    reset(freeBench(BOOK_CHECK.top, BOOK_CHECK.sub, null, false));
  }, [free]);

  const loAns = (x: any) => (x.lo.r1 === null || x.lo.r2 === null || !x.lo.op ? null : x.lo.op === "sub" ? x.lo.r1 - x.lo.r2 : x.lo.r1 + x.lo.r2);
  const markHeld = () => { const i = idxRef.current; setHeld((h) => (h.includes(i) ? h : [...h, i])); };

  /* ── the bench's moves ── */
  /* drop to check: copies of the answer and the number taken away slide down into the lower bay */
  const dropNow = () => {
    const x = bRef.current;
    if (!x.up || x.up.ans === null || x.lo.r1 !== null || x.kind === "which" || x.kind === "takeback") return false;
    const had2 = x.lo.r2 !== null;
    put({ ...x, cols: Math.min(6, Math.max(x.cols, lenOf(x.up.ans + x.up.r2))),
      lo: { ...x.lo, r1: x.up.ans, r2: x.up.r2, done: 0, d1: LO.r1 - UP.ans, d2: had2 ? 0 : LO.r2 - UP.r2, v: x.lo.v + 1 } });
    setTimeout(tick, 560);
    return true;
  };
  /* turn it round: the lower bay opens as a subtraction, the total over the part it takes */
  const turnNow = () => {
    const x = bRef.current;
    if (x.kind !== "takeback" || x.turned) return false;
    put({ ...x, turned: true, lo: { ...x.lo, op: "sub", r1: x.it.total, r2: x.it.b, done: 0, d1: LO.r1 - UP.ans, d2: LO.r2 - UP.r2, v: x.lo.v + 1 } });
    setTimeout(tick, 560);
    return true;
  };
  /* the child's own difference, written under the rule (a new one takes the check back up) */
  const writeDiff = (v: number) => upd((x) => ({ ...x, cols: Math.min(6, Math.max(x.cols, lenOf(v), lenOf(v + x.up.r2))),
    up: { ...x.up, ans: v, done: 99, step: -1 }, lo: { ...x.lo, r1: null, done: 0 }, shelf: emptyShelf(x.shelf.label) }));

  /* one bay worked a column at a time from the ones: the column lights, then its digit (and its
     carry, or its trade) is written */
  const colSteps = (bay: string, from: number, to: number, ms: number) => {
    const S: any[] = [];
    for (let k = from; k < to; k++) {
      S.push([Math.round(ms * 0.4), () => upd((x) => ({ ...x, cur: k, curBay: bay }))]);
      S.push([Math.round(ms * 0.6), () => { upd((x) => ({ ...x, [bay]: { ...x[bay], done: k + 1, step: k } })); tick(); }]);
    }
    S.push([120, () => upd((x) => ({ ...x, cur: -1 }))]);
    return S;
  };
  /* hold against: the total lifts along the path to the shelf, the lid opens, the start's copy stands
     above it, and the pairs are read from the right until one parts or the last agrees */
  const holdSteps = (tot: number, start: number, sp = 1) => {
    const L = lenOf(tot), S: any[] = [];
    const from = { x: (colC(0) + colC(L - 1)) / 2, y: LO.ans }, to = { x: (shX(0) + shX(L - 1)) / 2, y: SH.b };
    S.push([40, () => setFly({ text: indian(tot), x0: from.x, y0: from.y, x1: to.x, y1: to.y, to: false })]);
    S.push([Math.round(760 * sp), () => setFly((f: any) => (f ? { ...f, to: true } : f))]);
    S.push([Math.round(200 * sp), () => {
      setFly(null);
      upd((x) => ({ ...x, lid: false, shelf: { ...x.shelf, a: start, b: tot, read: -1, part: -1, lit: false } }));
      tick(); markHeld();
    }]);
    const M = Math.max(L, lenOf(start));
    for (let k = 0; k < M; k++) {
      const differ = dig(tot, k) !== dig(start, k) || (k < L) !== (k < lenOf(start));
      S.push([Math.round(330 * sp), () => upd((x) => ({ ...x, shelf: { ...x.shelf, read: k, part: differ ? k : -1 } }))]);
      if (differ) { S.push([Math.round(500 * sp), null]); return S; }
    }
    S.push([Math.round(320 * sp), () => { upd((x) => ({ ...x, shelf: { ...x.shelf, lit: true } })); tick(); }]);
    return S;
  };
  /* whatever is still missing of a check, run at walking pace: drop, add it back, hold it against */
  const checkSteps = (sp: number) => {
    const x = bRef.current, S: any[] = [];
    const r1 = x.lo.r1 !== null ? x.lo.r1 : x.up.ans;
    if (r1 === null) return S;
    if (x.lo.r1 === null) S.push([Math.round(700 * sp), () => dropNow()]);
    const tot = r1 + x.up.r2;
    S.push(...colSteps("lo", x.lo.r1 === null ? 0 : x.lo.done, lenOf(tot), Math.round(440 * sp)));
    if (x.shelf.b === null) S.push(...holdSteps(tot, x.up.r1, sp));
    return S;
  };
  const autoCheck = () => {
    const x = bRef.current;
    if (busyRef.current || x.up.ans === null) return;
    const S = checkSteps(1);
    api.lock(true);
    tl.run(S, () => { api.lock(false); if (x.kind === "subcheck" && stageRef.current === "ask") api.submit(String(bRef.current.up.ans)); });
  };

  /* ── the child's moves ── */
  const dropByChild = () => {
    const st = stageRef.current;
    if (busyRef.current || !["ask", "teach", "free"].includes(st)) return;
    if (!dropNow()) return;
    setTouched(true);
    const x = bRef.current;
    if (st === "free") { tl.run([[620, null], ...checkSteps(1)]); return; }
    if (x.kind === "subcheck" || x.kind === "verdict") return;
  };
  const addBack = () => {
    const x = bRef.current, tot = loAns(x);
    if (busyRef.current || tot === null || x.lo.done > 0) return;
    setTouched(true); api.lock(true);
    tl.run(colSteps("lo", 0, lenOf(tot), 480), () => { api.lock(false); sayOnce("hold" + idxRef.current, LINE_HOLD); });
  };
  const holdNow = () => {
    const x = bRef.current, tot = loAns(x);
    if (busyRef.current || tot === null || x.lo.done < lenOf(tot) || x.shelf.b !== null) return;
    setTouched(true); api.lock(true);
    tl.run(holdSteps(tot, x.up.r1, 1), () => {
      api.lock(false);
      if (stageRef.current !== "ask") return;
      if (x.kind === "subcheck") api.submit(String(x.up.ans));
      else if (x.kind === "verdict") sayOnce("send" + idxRef.current, LINE_SEND);
    });
  };
  const sendCard = (end: string) => {
    const x = bRef.current;
    if (busyRef.current) return;
    upd((y) => ({ ...y, card: end })); tick(); setTouched(true);
    if (x.kind !== "verdict" || stageRef.current !== "ask") return;
    if (x.shelf.b !== null) { api.submit(end); return; }
    /* the check judges the statement, not its looks: a verdict given before the check waits while
       the check runs by itself (drop, add it back, hold it against the start) */
    api.lock(true);
    tl.run([[420, null], ...checkSteps(0.8)], () => { api.lock(false); api.submit(end); });
  };
  const pickRow = (row: string) => {
    const x = bRef.current;
    if (busyRef.current || x.kind !== "which" || stageRef.current !== "ask") return;
    const top = row === "minuend";
    put({ ...x, shelf: emptyShelf("start"), names: false, glow: false,
      lo: { ...x.lo, r2: top ? x.it.top : x.it.sub, c2: top ? TOP_C : TAKE_C, done: 0, d1: 0, d2: LO.r2 - (top ? UP.r1 : UP.r2), v: x.lo.v + 1 } });
    setTimeout(tick, 560);
    setTouched(true);
    api.submit(row);
  };
  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (!pay) return;
    if (pay.src === "diff") { if (!moved || p.y > UP.h + 8) dropByChild(); return; }
    if (pay.src === "row") { if (!moved || p.y > UP.h + 8) pickRow(pay.row); return; }
    if (pay.src === "total") { if (!moved || p.x > BAY_W - 40 || p.y < LO.y0) holdNow(); return; }
    if (pay.src === "card") {
      if (!moved) return;                                       /* a statement has no place of its own: it waits for a verdict */
      const end = p.x < 330 ? "true" : p.x > 756 ? "false" : null;
      if (end && (free || stageRef.current === "ask")) sendCard(end);
    }
  });
  const roll = () => {
    if (busyRef.current) return;
    const dice = range(0, 5).map(() => 1 + Math.floor(Math.random() * 6));
    reset(freeBench(99999, Number(dice.join("")), dice, !!bRef.current.slip)); setTouched(true); tick();
  };
  const slipToggle = () => { if (busyRef.current) return; const x = bRef.current; reset(freeBench(x.it.top, x.it.sub, x.dice, !x.slip)); setTouched(true); tick(); };

  /* Enter: a number goes into the lower bay a column at a time (or whole); a difference is written
     and waits for its check; a second Enter runs the check */
  const digitsIn = (v: any) => String(v ?? "").replace(/[^0-9]/g, "");
  const enterFn: any = !asking ? null
    : kind === "addback" || kind === "takeback" ? (v: any) => {
      const s = digitsIn(v);
      if (!s || busyRef.current) return;
      setTouched(true);
      if (kind === "addback") dropNow(); else turnNow();
      const x = bRef.current, tot = loAns(x);
      if (x.revealed || s.length >= 2 || tot === null) { api.submit(s); return; }
      const k = x.lo.done;
      if (Number(s) !== dig(tot, k)) { api.submit(s); return; }   /* a miss: the check is worked out in full */
      upd((y) => ({ ...y, lo: { ...y.lo, done: k + 1, step: k } }));
      tick();
      if (k + 1 >= lenOf(tot)) api.submit(String(tot));
      else api.setTyped("");
    }
      : kind === "subcheck" ? (v: any) => {
        const s = digitsIn(v), x = bRef.current;
        if (busyRef.current) return;
        if (x.revealed) { if (s) api.submit(s); return; }
        setTouched(true);
        if (s && Number(s) !== x.up.ans) { writeDiff(Number(s)); api.setTyped(""); sayOnce("drop" + idxRef.current, LINE_DROP); return; }
        if (x.up.ans !== null) autoCheck();
      }
        : kind === "verdict" ? (v: any) => {
          /* a verdict key (or the agent) sends the statement to that end of the rail */
          const id = String(v ?? "").trim().toLowerCase();
          if (id === "true" || id === "false") sendCard(id);
        }
          : null;
  api.onEnter(enterFn);
  HOOK.check = () => {
    const x = bRef.current;
    if (busyRef.current && stageRef.current === "ask") return true;   /* a check already running: let it finish */
    if (x.kind !== "subcheck" || stageRef.current !== "ask" || x.revealed || x.up.ans === null) return undefined;
    if (!busyRef.current) autoCheck();
    return true;
  };

  /* ── the win: the check the answer earned, run to its end ── */
  useEffect(() => {
    if (stage !== "win") return;
    const x = bRef.current, S: any[] = [];
    if (kind === "addback") S.push(...checkSteps(0.6));
    else if (kind === "which") {
      if (x.lo.r2 !== x.it.sub) S.push([560, () => upd((y) => ({ ...y, shelf: emptyShelf("start"), lo: { ...y.lo, r2: y.it.sub, c2: TAKE_C, done: 0, d2: LO.r2 - UP.r2, v: y.lo.v + 1 } }))]);
      if (x.shelf.b === null || x.lo.r2 !== x.it.sub) {
        S.push(...colSteps("lo", 0, lenOf(x.it.top), 260));
        S.push(...holdSteps(x.it.top, x.it.top, 0.6));
      }
    } else if (kind === "subcheck") {
      /* an answer given without its check (the agent, or a retry): the check is run for it */
      if (x.shelf.b === null && x.up.ans !== x.it.answer) S.push([240, () => writeDiff(x.it.answer)], [10, () => tl.run(checkSteps(0.6))]);
      else if (x.shelf.b === null) S.push(...checkSteps(0.6));
    } else if (kind === "verdict") {
      if (x.card !== x.it.answer) S.push([420, () => upd((y) => ({ ...y, card: y.it.answer }))]);
      if (x.shelf.b === null) S.push(...checkSteps(0.6));
      S.push([300, () => upd((y) => ({ ...y, endLit: y.it.answer, tag: y.it.answer === "false" ? y.it.top - y.it.sub : null }))]);
    } else if (kind === "takeback") {
      if (!x.turned) S.push([560, () => turnNow()]);
      S.push(...colSteps("lo", x.turned ? x.lo.done : 0, lenOf(x.it.total), 260));
      if (x.shelf.b === null) S.push(...holdSteps(x.it.a, x.it.a, 0.6));
    }
    if (kind === "addback" && x.it.lid === false) S.push([300, () => upd((y) => ({ ...y, tag: y.it.top - y.it.sub }))]);
    if (S.length) tl.run(S);
  }, [stage]);

  /* ── the traceback: the mathematics redrawn in steps, ending on the whole right answer;
        nothing marked, nothing cleared, the child's answer stays in the slot ── */
  const backWhich = () => {
    const x = bRef.current, t = x.it, off = t.diff + t.top, right = t.diff + t.sub, S: any[] = [];
    if (x.lo.r2 !== t.top) S.push([760, () => upd((y) => ({ ...y, shelf: emptyShelf("start"), lo: { ...y.lo, r2: t.top, c2: TOP_C, done: 0, d2: LO.r2 - UP.r1, v: y.lo.v + 1 } }))]);
    else S.push([300, null]);
    if (x.shelf.b === null || x.lo.r2 !== t.top) {
      S.push(...colSteps("lo", 0, lenOf(off), 500));
      S.push(...holdSteps(off, t.top, 1));
    }
    S.push([700, () => upd((y) => ({ ...y, rival: { label: "top added", a: t.diff, b: t.top, op: "+", r: off } }))]);
    S.push([1100, () => upd((y) => ({ ...y, names: true }))]);
    S.push([1200, () => upd((y) => ({ ...y, glow: true }))]);
    S.push([780, () => upd((y) => ({ ...y, shelf: emptyShelf("start"), lo: { ...y.lo, r2: t.sub, c2: TAKE_C, done: 0, d2: LO.r2 - UP.r2, v: y.lo.v + 1 } }))]);
    S.push(...colSteps("lo", 0, lenOf(right), 500));
    S.push(...holdSteps(right, t.top, 1));
    return S;
  };
  const backSubcheck = (v: number | null) => {
    const x = bRef.current, t = x.it, S: any[] = [];
    if (v !== null && v !== t.answer && lenOf(v + t.sub) <= 6) {
      if (x.up.ans !== v) S.push([420, () => writeDiff(v)]);
      const fresh = x.lo.r1 !== v;
      if (fresh) S.push([760, () => { upd((y) => ({ ...y, lo: { ...y.lo, r1: null, done: 0 } })); dropNow(); }]);
      if (fresh || x.shelf.b === null) {
        S.push(...colSteps("lo", fresh ? 0 : x.lo.done, lenOf(v + t.sub), 460));
        S.push(...holdSteps(v + t.sub, t.top, 0.9));
      }
      S.push([1100, () => upd((y) => ({ ...y, rival: { label: "your check", a: v, b: t.sub, op: "+", r: v + t.sub } }))]);
    }
    /* the working again, column by column from the ones, a ten taken where the top is short */
    S.push([560, () => upd((y) => ({ ...y, up: { ...y.up, ans: t.answer, done: 0, step: -1 }, lo: { ...y.lo, r1: null, done: 0 }, shelf: emptyShelf("start") }))]);
    S.push(...colSteps("up", 0, lenOf(t.top), 660));
    S.push([760, () => dropNow()]);
    S.push(...colSteps("lo", 0, lenOf(t.top), 380));
    S.push(...holdSteps(t.top, t.top, 0.9));
    return S;
  };
  const backVerdict = () => {
    const x = bRef.current, S: any[] = [];
    if (x.card !== "mid") S.push([600, () => upd((y) => ({ ...y, card: "mid" }))]);
    S.push(...checkSteps(1));
    S.push([600, () => upd((y) => ({ ...y, endLit: y.it.answer, tag: y.it.answer === "false" ? y.it.top - y.it.sub : null }))]);
    return S;
  };
  const backTakeback = (v: number | null) => {
    const x = bRef.current, t = x.it, S: any[] = [];
    if (v === t.total) S.push([900, () => upd((y) => ({ ...y, rival: { label: "added again", a: null, b: t.b, op: "+", r: t.total } }))]);
    else if (v !== null && v !== t.a && lenOf(v + t.b) <= 6) S.push([900, () => upd((y) => ({ ...y, rival: { label: "your check", a: v, b: t.b, op: "+", r: v + t.b } }))]);
    if (!x.turned) S.push([760, () => turnNow()]);
    S.push(...colSteps("lo", x.turned ? x.lo.done : 0, lenOf(t.total), 700));
    if (x.shelf.b === null) S.push(...holdSteps(t.a, t.a, 1));
    return S;
  };
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    setTouched(true);
    const v = leadNumber(wrong.value), t0 = bRef.current.it;
    const S = kind === "addback" ? [...(t0.lid && v === t0.diff - t0.sub
      ? [[900, () => upd((y) => ({ ...y, rival: { label: "taken away again", a: t0.diff, b: t0.sub, op: "−", r: v } }))]] : []), ...checkSteps(1.25)]
      : kind === "which" ? backWhich()
        : kind === "subcheck" ? backSubcheck(v)
          : kind === "verdict" ? backVerdict()
            : kind === "takeback" ? backTakeback(leadNumber(wrong.value)) : [];
    tl.run(S, () => { upd((x) => ({ ...x, cur: -1, revealed: true })); api.lock(false); });
  }, [wrong]);

  /* ── what the host and the agent read back (toolApi.getState): only what stands on the bench ── */
  const upAns = b.up && b.up.ans;
  api.share({
    phase: n,
    minuend: kind === "takeback" ? it.total : b.lid ? null : b.up.r1,
    subtrahend: kind === "takeback" ? it.b : b.up.r2,
    difference: kind === "takeback" ? null : upAns,
    checkTotal: b.shelf.b,
    matched: b.shelf.b === null ? null : b.shelf.lit,
    verdict: b.card === "mid" ? null : b.card,
    rolled: b.dice ? b.up.r2 : it.dice ? it.sub : null,
    lid: b.lid, turned: b.turned, dropped: b.lo.r1 !== null, columnsAdded: Math.min(b.lo.done, 9),
  });

  /* ── drawing ── */
  const cols = b.cols;
  const dg = drag.drag && drag.drag.moved && drag.drag.payload ? drag.drag : null;
  const dSrc = dg ? dg.payload.src : null;
  const loTot = loAns(b);
  const live = (asking || free) && !busy;
  const pieceDiff = (kind === "addback" || kind === "subcheck" || kind === "verdict" || kind === "free") && upAns !== null && b.lo.r1 === null
    && (live || (stage === "teach" && !busy));
  const pieceTotal = (kind === "subcheck" || kind === "verdict") && asking && !busy && loTot !== null && b.lo.done >= lenOf(loTot) && b.shelf.b === null;
  const pieceRows = kind === "which" && asking && !busy && (b.lo.r2 === null || b.revealed);
  const pieceCard = (kind === "verdict" && asking && !busy && b.card === "mid") || (kind === "free" && free && !busy);
  const keyAdd = (kind === "subcheck" || kind === "verdict") && asking && !busy && b.lo.r1 !== null && b.lo.done === 0 && !b.revealed;
  const keyTurn = kind === "takeback" && !b.turned && (asking || stage === "teach") && !busy;
  const typingLo = (kind === "addback" || kind === "takeback") && asking && !b.revealed && b.lo.op && b.lo.r1 !== null && loTot !== null && b.lo.done < lenOf(loTot);
  const showRail = kind === "verdict" || kind === "free";
  const showDice = kind === "free" || !!(it && it.dice);

  const signX = (len: number) => colC(Math.max(1, len) - 1) - 76;
  const rowDigits = (v: any, y: number, colour: string, key: string, o: any = {}) => {
    if (v === null || v === undefined) return null;
    const ds = digitsOf(v);
    return (
      <g key={key} className={o.dy ? "cb-slide" : o.fade ? "cb-fade" : undefined} style={o.dy ? ({ ["--dy" as any]: -o.dy + "px" } as any) : undefined}>
        {ds.map((d: number, k: number) => (k < (o.upto ?? 99) ? (
          <text key={k} x={colC(k)} y={y} textAnchor="middle" fontSize={T.speech} fontWeight={700}
            fill={d === 0 && ds.length > 1 ? ZERO_C : inkOf(colour)}>{d}</text>
        ) : null))}
      </g>
    );
  };
  const bay = (which: string) => {
    const G: any = which === "up" ? UP : LO, x = b[which];
    if (!x) return null;
    const on = b.cur >= 0 && b.curBay === which;
    const sx = signX(x.len);
    const ruleL = Math.min(sx - 30, colX(cols - 1) + 4);
    const marks: any[] = [];
    if (x.op === "sub" && x.r1 !== null && x.r2 !== null && x.step >= 0) {
      subCols(x.r1, x.r2, cols).forEach((c: any, k: number) => {
        const val = rewriteAt(c, x.step);
        if (val === null) return;
        const s = String(val);
        marks.push(
          <g key={"m" + k}>
            <line x1={colC(k) - 15} y1={G.r1 - 3} x2={colC(k) + 15} y2={G.r1 - 29} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
            <text x={colC(k)} y={G.marks} textAnchor="middle" fontSize={T.micro} fontWeight={700}>
              {s.length > 1 ? <tspan fill={inkOf(LENT_C)}>{s[0]}</tspan> : null}
              <tspan fill={inkOf(NEW_C)}>{s.length > 1 ? s.slice(1) : s}</tspan>
            </text>
          </g>,
        );
      });
    }
    if (x.op === "add" && x.r1 !== null && x.r2 !== null && (which === "lo" || x.done < 99)) {
      addCols(x.r1, x.r2, cols).forEach((c: any, k: number) => {
        if (k < x.done && c.carry && k + 1 < cols) marks.push(
          <text key={"c" + k} className="cb-fade" x={colC(k + 1)} y={G.marks} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={inkOf(LENT_C)}>1</text>,
        );
      });
    }
    const ans = which === "up" ? x.ans : loAns(b);
    const holder = (y: number, len: number, k2: string) => (
      <rect key={k2} x={colX(len - 1) + 8} y={y - 40} width={colC(0) + 42 - (colX(len - 1) + 8)} height={50} rx={12}
        fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="8 8" />
    );
    return (
      <g>
        {x.op && x.r1 === null && which === "lo" && holder(G.r1, x.len, "h1")}
        {x.op && x.r2 === null && which === "lo" && holder(G.r2, x.len, "h2")}
        {marks}
        {!(which === "up" && b.lid) && rowDigits(x.r1, G.r1, x.c1, which + "r1-" + (which === "lo" ? x.v : 0),
          which === "lo" ? { dy: x.d1 } : { fade: !!(it.lid || it.kind === "takeback") })}
        {rowDigits(x.r2, G.r2, x.c2, which + "r2-" + (which === "lo" ? x.v + "-" + x.r2 : 0), which === "lo" ? { dy: x.d2 } : {})}
        {x.op && <text x={sx} y={G.r2} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{x.op === "sub" ? "−" : "+"}</text>}
        {x.op && <rect x={ruleL} y={G.rule} width={684 - ruleL} height={6} rx={3} fill={C.ink} />}
        {x.op && range(0, cols).map((k) => {
          const cur = (which === "lo" && typingLo && k === x.done) || (which === "up" && kind === "subcheck" && asking && upAns === null && k === 0);
          return <rect key={"sq" + k} x={colC(k) - 32} y={G.sq} width={64} height={46} rx={11} fill="#FFFFFF"
            stroke={cur ? C.accent : on && b.cur === k ? AMBER : C.rule} strokeWidth={cur ? 4 : on && b.cur === k ? 3 : 1.5} />;
        })}
        {ans !== null && ans !== undefined && rowDigits(ans, G.ans, ANS_C, which + "ans", { upto: x.done })}
      </g>
    );
  };
  const stripes = (G: any, which: string) => range(0, cols).map((k) => {
    const on = b.cur === k && b.curBay === which;
    return <rect key={which + "st" + k} x={colX(k) + 5} y={G.top} width={CW - 10} height={G.bot - G.top} rx={14} fill="#FFFFFF"
      stroke={on ? AMBER : C.rule} strokeWidth={on ? 4 : 1.2} />;
  });
  const rowSpan = (len: number) => ({ x0: colX(Math.max(1, len) - 1) + 4, x1: colC(0) + 46 });
  const chip = (text: string, colour: string, x: number, y: number) => {
    const w = text.length * 26 + 36;
    return (
      <g pointerEvents="none" transform={`translate(${x},${y})`}>
        <rect x={-w / 2} y={-32} width={w} height={64} rx={16} fill="#FFFFFF" stroke={colour} strokeWidth={3} filter="url(#fLift)" />
        <text y={15} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={inkOf(colour)}>{text}</text>
      </g>
    );
  };
  const upSpan = rowSpan(b.up.len);
  const rowCut = Math.round((UP.r1 + UP.r2 - 31) / 2);   /* between the two rows: their finger boxes tile */
  const loSpan = rowSpan(Math.max(b.lo.len, loTot !== null ? lenOf(loTot) : 0));
  const cardText = `${indian(b.up.r1)} − ${indian(b.up.r2)} = ${indian(b.up.ans ?? 0)}`;
  const shelfRow = (v: any, y: number, colour: string, key: string) => (v === null ? (
    <line key={key} x1={shX(4) - 16} y1={y + 10} x2={shX(0) + 16} y2={y + 10} stroke={C.rule} strokeWidth={2} strokeDasharray="6 8" />
  ) : (
    <g key={key + v} className="cb-fade">
      {digitsOf(v).map((d: number, k: number) => (
        <text key={k} x={shX(k)} y={y} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={d === 0 && v > 9 ? ZERO_C : inkOf(colour)}>{d}</text>
      ))}
      {v >= 1000 && <text x={(shX(2) + shX(3)) / 2} y={y} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={inkOf(colour)}>,</text>}
      {v >= 100000 && <text x={(shX(4) + shX(5)) / 2} y={y} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={inkOf(colour)}>,</text>}
    </g>
  ));
  const sh = b.shelf;
  const pairs = sh.b === null ? 0 : Math.max(lenOf(sh.a), lenOf(sh.b));

  const invite =
    busy || dg || b.revealed || !(asking || stage === "teach" || free) ? null
      : pieceDiff && (kind !== "free" || !touched) ? { x: (upSpan.x0 + upSpan.x1) / 2, y: UP.ans - 16, r: 44 }
        : kind === "which" && b.lo.r2 === null ? { x: (loSpan.x0 + loSpan.x1) / 2, y: LO.r2 - 16, r: 40 }
          : typingLo ? { x: colC(b.lo.done), y: LO.ans - 16, r: 36 }
            : kind === "subcheck" && upAns === null ? { x: colC(0), y: UP.ans - 16, r: 36 }
              : pieceTotal ? { x: (loSpan.x0 + loSpan.x1) / 2, y: LO.ans - 16, r: 44 }
                : pieceCard && kind === "verdict" && b.shelf.b !== null ? { x: cardX("mid") + CARD.grip / 2, y: CARD.y + CARD.h / 2, r: 30 }
                  : null;

  const tagV = b.tag;
  /* the grip at the left of the statement card: six dots to take hold of */
  const grip = <g>{[0, 1, 2].map((r) => [0, 1].map((c) => <circle key={r + "-" + c} cx={19 + c * 12} cy={24 + r * 12} r={3.5} fill={C.dim} />))}</g>;
  return (
    <g>
      <style>{CB_CSS}</style>

      {/* running count, in the runs zone (64,108): checks held against the start, sums on the bench */}
      {!free && (
        <g data-zone="runs">
          <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          <text x={22} y={-40} fontSize={T.speech} fontWeight={700} fill={C.ink}>{held.length}</text>
          <text x={56} y={-46} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("checked")}</text>
          <text x={200} y={-40} fontSize={T.speech} fontWeight={700} fill={C.ink}>{(phase.items || []).length}</text>
          <text x={234} y={-46} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("sums")}</text>
        </g>
      )}

      {/* the two bays and the spine that joins them */}
      <rect x={0} y={UP.y0} width={BAY_W} height={UP.h} rx={RAD.panel} fill={tint(C.panel, 0.45)} stroke={C.rule} strokeWidth={2} />
      <rect x={0} y={LO.y0} width={BAY_W} height={LO.h} rx={RAD.panel} fill={tint(C.panel, 0.45)} stroke={C.rule} strokeWidth={2} />
      <rect x={344} y={UP.h - 2} width={12} height={LO.y0 - UP.h + 4} rx={6} fill={C.rule} />
      {range(0, cols).map((k) => {
        const on = b.cur === k;
        return (
          <g key={"hd" + k}>
            <rect x={colX(k) + 5} y={6} width={CW - 10} height={32} rx={10} fill={on ? tint(AMBER, 0.6) : tint(C.panel, 0.2)} stroke={on ? AMBER : C.rule} strokeWidth={on ? 3 : 1.5} />
            <text x={colC(k)} y={31} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(HEADS[k])}</text>
          </g>
        );
      })}
      {stripes(UP, "up")}
      {stripes(LO, "lo")}

      {/* the rows that rebuild the top one light together (a correction) */}
      {b.glow && [UP.r2, UP.ans].map((y, j) => (
        <rect key={"gl" + j} x={upSpan.x0} y={y - 40} width={upSpan.x1 - upSpan.x0} height={50} rx={12} fill={tint(ANS_C, 0.8)} stroke={ANS_C} strokeWidth={2} />
      ))}
      {bay("up")}
      {bay("lo")}
      {b.names && [["start", UP.r1], ["taken away", UP.r2], ["answer", UP.ans]].map(([t, y]: any) => (
        <text key={t} x={14} y={y - 6} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(t)}</text>
      ))}

      {/* the lid: what the check should land on, until the check is held against it */}
      {b.lid && (
        <g>
          <rect x={upSpan.x0} y={UP.r1 - 44} width={upSpan.x1 - upSpan.x0} height={54} rx={14} fill="url(#gKey)" stroke={shade(C.rule, 0.2)} strokeWidth={2} filter="url(#fShadowSoft)" />
          <rect x={(upSpan.x0 + upSpan.x1) / 2 - 24} y={UP.r1 - 52} width={48} height={12} rx={6} fill={shade(C.rule, 0.2)} />
          <text x={(upSpan.x0 + upSpan.x1) / 2} y={UP.r1 - 1} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>?</text>
        </g>
      )}

      {/* the path a total takes to the shelf, and the shelf with its match light */}
      <path d={`M ${BAY_W - 8} ${LO.ans - 16} C ${BAY_W + 44} ${LO.ans - 16}, ${SH.x - 40} ${SH.b - 12}, ${SH.x} ${SH.b - 12}`} fill="none" stroke={C.rule} strokeWidth={3} strokeDasharray="8 9" />
      <rect x={SH.x} y={0} width={SH.w} height={SH.h} rx={RAD.panel} fill={tint(C.panel, 0.45)} stroke={C.rule} strokeWidth={2} />
      {range(0, pairs).map((k) => (sh.read >= k ? (
        <rect key={"pr" + k} x={shX(k) - 18} y={SH.a - 42} width={36} height={SH.b - SH.a + 54} rx={18}
          fill={sh.part === k ? "none" : tint(ANS_C, 0.82)} stroke={sh.part === k ? AMBER : "none"} strokeWidth={5} />
      ) : null))}
      <text x={SH.lx} y={SH.a} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(sh.label)}</text>
      <text x={SH.lx} y={SH.b} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("check")}</text>
      {sh.lit && <circle cx={SH.lamp.x} cy={SH.lamp.y} r={27} fill={ANS_C} fillOpacity={0.22} />}
      <circle cx={SH.lamp.x} cy={SH.lamp.y} r={16} fill={sh.lit ? ANS_C : tint(C.dim, 0.55)} stroke={sh.lit ? shade(ANS_C, 0.2) : C.dim} strokeWidth={2.5} />
      {shelfRow(sh.a, SH.a, kind === "takeback" ? TOP_C : TOP_C, "sa")}
      {shelfRow(sh.b, SH.b, ANS_C, "sb")}

      {/* the dice bay (the book's game of three, and free play) */}
      {showDice && (
        <g>
          <rect x={DICE.x} y={DICE.y} width={DICE.w} height={DICE.h} rx={RAD.panel} fill={tint(C.panel, 0.45)} stroke={C.rule} strokeWidth={2} />
          {(b.dice || it.dice || []).map((v: number, i: number) => <DieFace key={i} x={785 + i * 52} y={DICE.y + 12} s={46} v={v} C={C} />)}
          {!(b.dice || it.dice) && <text x={DICE.x + DICE.w / 2} y={DICE.y + 46} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("the book's check")}</text>}
          <text x={DICE.x + DICE.w / 2} y={DICE.y + 94} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={inkOf(TAKE_C)}>{indian(b.up.r2)}</text>
          {kind === "free" && free && (
            <g>
              <Key id="free-roll" label={tx("Roll the dice")} x={772} y={DICE.y + 110} w={136} h={84} C={C} primary disabled={busy} onClick={roll}>
                <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={busy ? C.ink : "#FFFFFF"}>{tx("Roll")}</text>
              </Key>
              <Key id="free-slip" label={tx(b.slip ? "Take the slip out of the working" : "Put a slip in the working")} x={918} y={DICE.y + 110} w={136} h={84} C={C} disabled={busy} onClick={slipToggle}>
                <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(b.slip ? "Fix" : "Slip")}</text>
              </Key>
            </g>
          )}
        </g>
      )}

      {/* a correction: the child own route, on a card beside the right one (never marked) */}
      {b.rival && !showDice && (() => {
        const R = b.rival, D = DICE, xr = D.x + D.w - 34, fz = T.label;
        return (
          <g className="cb-fade">
            <rect x={D.x} y={D.y} width={D.w} height={D.h} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} strokeDasharray="10 8" />
            <text x={D.x + 20} y={D.y + 40} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(R.label)}</text>
            <text x={xr} y={D.y + 86} textAnchor="end" fontSize={fz} fontWeight={700} fill={C.ink}>{R.a !== null ? indian(R.a) : b.lid ? "?" : indian(it.a)}</text>
            <text x={xr - 156} y={D.y + 128} textAnchor="middle" fontSize={fz} fontWeight={700} fill={C.ink}>{R.op}</text>
            <text x={xr} y={D.y + 128} textAnchor="end" fontSize={fz} fontWeight={700} fill={C.ink}>{indian(R.b)}</text>
            <rect x={xr - 180} y={D.y + 140} width={184} height={4} rx={2} fill={C.ink} />
            <text x={xr} y={D.y + 184} textAnchor="end" fontSize={fz} fontWeight={700} fill={C.ink}>{indian(R.r)}</text>
          </g>
        );
      })()}

      {/* the controls of the check */}
      {keyAdd && (
        <Key id="add-back" label={tx("Add it back")} x={KEY_BOX.x} y={KEY_BOX.y} w={KEY_BOX.w} h={KEY_BOX.h} C={C} primary onClick={addBack}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill="#FFFFFF">{tx("Add it back")}</text>
        </Key>
      )}
      {keyTurn && (
        <Key id="turn-round" label={tx("Turn it round")} x={KEY_BOX.x} y={KEY_BOX.y} w={KEY_BOX.w} h={KEY_BOX.h} C={C} primary onClick={() => { if (turnNow()) setTouched(true); }}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill="#FFFFFF">{tx("Turn it round")}</text>
        </Key>
      )}
      {tagV !== null && (
        <text x={DICE.x + DICE.w / 2} y={DICE.y + 186} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>
          {tx("should be")} <tspan fill={inkOf(ANS_C)}>{indian(tagV)}</tspan>
        </text>
      )}

      {/* the verdict rail: a true end, a false end, and the written statement between them */}
      {showRail && (
        <g>
          <rect x={0} y={450} width={1086} height={78} rx={39} fill={tint(C.panel, 0.45)} stroke={C.rule} strokeWidth={2} />
          {["true", "false"].map((e) => {
            const x0 = e === "true" ? 6 : 890, lit = b.endLit === e, at = b.card === e;
            return (
              <g key={e}>
                <rect x={x0} y={456} width={190} height={66} rx={33} fill={lit ? tint(ANS_C, 0.72) : "#FFFFFF"}
                  stroke={lit ? shade(ANS_C, 0.1) : at ? C.ink : C.rule} strokeWidth={lit || at ? 4 : 2} />
                <text x={x0 + 95} y={500} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(e)}</text>
              </g>
            );
          })}
          {dSrc !== "card" && (
            <g className="cb-card" style={{ transform: `translate(${cardX(b.card)}px, ${CARD.y}px)` } as any}>
              <rect x={0} y={0} width={CARD.w} height={CARD.h} rx={16} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} filter="url(#fShadowSoft)" />
              {grip}
              <g data-role="reading"><text x={(CARD.w + CARD.grip) / 2} y={47} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{cardText}</text></g>
            </g>
          )}
        </g>
      )}

      {/* the pieces the child moves (a tap puts each where it belongs) */}
      {pieceDiff && (
        <rect className="cb-grab c4-piece" {...control("diff", "Drop the answer down to check it")} {...drag.bind({ src: "diff" })} {...drag.keys({ src: "diff" })}
          x={upSpan.x0} y={UP.rule - 4} width={upSpan.x1 - upSpan.x0} height={72} fill="transparent" />
      )}
      {pieceRows && [["minuend", rowCut - 72], ["subtrahend", rowCut]].map(([row, y]: any) => (
        <rect key={row} className="cb-grab c4-piece" {...control("row-" + row, row === "minuend" ? "Drag the number on top down" : "Drag the number taken away down")}
          {...drag.bind({ src: "row", row })} {...drag.keys({ src: "row", row })}
          x={upSpan.x0 - 70} y={y} width={upSpan.x1 - upSpan.x0 + 70} height={72} fill="transparent" />
      ))}
      {pieceTotal && (
        <rect className="cb-grab c4-piece" {...control("total", "Hold the total against the number on top")} {...drag.bind({ src: "total" })} {...drag.keys({ src: "total" })}
          x={loSpan.x0} y={LO.rule - 4} width={loSpan.x1 - loSpan.x0} height={72} fill="transparent" />
      )}
      {pieceCard && showRail && (
        <rect className="cb-grab c4-piece" {...control("card", "The written statement: drag it to the true end or the false end")} {...drag.bind({ src: "card" })} {...drag.keys({ src: "card" })}
          x={cardX(b.card)} y={CARD.y} width={CARD.w} height={CARD.h} fill="transparent" />
      )}

      {/* a piece on its way under the finger */}
      {dSrc === "diff" && chip(indian(upAns), ANS_C, dg.x, dg.y)}
      {dSrc === "row" && chip(indian(dg.payload.row === "minuend" ? it.top : it.sub), dg.payload.row === "minuend" ? TOP_C : TAKE_C, dg.x, dg.y)}
      {dSrc === "total" && loTot !== null && chip(indian(loTot), ANS_C, dg.x, dg.y)}
      {dSrc === "card" && (
        <g pointerEvents="none" transform={`translate(${dg.x - CARD.w / 2},${Math.min(CARD.y, dg.y - CARD.h / 2)})`}>
          <rect x={0} y={0} width={CARD.w} height={CARD.h} rx={16} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} filter="url(#fLift)" />
          {grip}
              <g data-role="reading"><text x={(CARD.w + CARD.grip) / 2} y={47} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{cardText}</text></g>
        </g>
      )}
      {/* a total lifting to the shelf */}
      {fly && (
        <g className="cb-fly" pointerEvents="none"
          style={{ transform: `translate(${fly.to ? fly.x1 : fly.x0}px, ${fly.to ? fly.y1 : fly.y0}px)`, transition: fly.to ? "transform 700ms cubic-bezier(.4,.1,.3,1)" : "none" } as any}>
          <text textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={inkOf(ANS_C)}>{fly.text}</text>
        </g>
      )}

      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: the answer, a number
   with its commas or the word chosen */
function Thumb({ n, result, C, w, h }: any) {
  const L = (result && result.last) || {};
  const it = PHASES[(n || 1) - 1] && PHASES[(n || 1) - 1].items[L.item];
  if (!it || L.value === null || L.value === undefined) return null;
  const num = leadNumber(L.value);
  const text = typeof it.answer === "number" && num !== null ? indian(num) : format(L.value);
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <text x={w - 16} y={h / 2 + (text.length > 7 ? 10 : 12)} textAnchor="end" fontSize={text.length > 7 ? T.micro : T.label} fontWeight={700}
        fill={typeof it.answer === "number" ? inkOf(ANS_C) : C.ink}>{text}</text>
    </g>
  );
}

function CheckBench(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null }} />
  );
}

export default CheckBench;
