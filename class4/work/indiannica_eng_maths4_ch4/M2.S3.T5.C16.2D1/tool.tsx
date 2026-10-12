/* ═══ M2.S3.T5.C16.2D1 · partial_product_workshop · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "partial_product_workshop";
const MEDIA_ID = "M2.S3.T5.C16.2D1";
const TOOL_NAME = "Partial Product Workshop";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["The multiplier is standing whole. Nothing moves until it comes apart."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "You split every multiplier by place and closed the rows a zero never needed. Then round numbers worked through their own zeros.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Pick a new sum, split it, slide the zeros, swap the numbers and add the rows.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r13+: `lineFor(line, lang, TR)`); the
   English above and below stays what the checks read. NCERT class 4 terms: गुणक / ગુણક, आंशिक गुणनफल /
   આંશિક ગુણાકાર, पंक्ति / હાર, स्तंभ / સ્તંભ. Digits stay digits: the runtime speaks them in the
   language in use. A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Partial Product Workshop": "आंशिक गुणनफल कार्यशाला",
    "The multiplier is standing whole. Nothing moves until it comes apart.": "गुणक पूरा खड़ा है। जब तक यह अलग न हो, कुछ नहीं हिलेगा।",
    "You split every multiplier by place and closed the rows a zero never needed. Then round numbers worked through their own zeros.": "तुमने हर गुणक को स्थान के अनुसार तोड़ा और शून्य की बेकार पंक्तियाँ बंद कीं। फिर शून्यों वाली संख्याओं ने अपने शून्यों से काम किया।",
    "Free play. Pick a new sum, split it, slide the zeros, swap the numbers and add the rows.": "मुक्त खेल। नया सवाल चुनो, उसे तोड़ो, शून्य खिसकाओ, संख्याएँ बदलो और पंक्तियाँ जोड़ो।",
    "A long multiplier is used one place at a time": "लंबा गुणक एक बार में एक स्थान लिया जाता है",
    "Split the multiplier by place first. Nothing gets multiplied until the cards are down.": "पहले गुणक को स्थान के अनुसार तोड़ो। कार्ड नीचे आने तक कुछ भी गुणा नहीं होगा।",
    "What is each card worth, read together with its place name?": "हर कार्ड अपने स्थान के नाम के साथ पढ़ने पर कितने का है?",
    "Look at the heading over that digit. A digit in the tens column counts tens, not ones.": "उस अंक के ऊपर का शीर्षक देखो। दहाई के स्तंभ का अंक दहाई गिनता है, इकाई नहीं।",
    "The multiplier is split by place before anything is multiplied. So the number of rows is settled before the first digit is worked.": "कुछ भी गुणा करने से पहले गुणक स्थान के अनुसार तोड़ा जाता है। इसलिए पहला अंक हल होने से पहले ही पंक्तियों की गिनती तय हो जाती है।",
    "You learned: split the multiplier by place before you multiply.": "तुमने सीखा: गुणा करने से पहले गुणक को स्थान के अनुसार तोड़ो।",
    "The tens card is worth?": "दहाई का कार्ड कितने का है?",
    "The multiplier in 4,213 × 32 has two digits. Tap it to split it by place. What is the tens card worth?": "4,213 × 32 में गुणक के दो अंक हैं। स्थान के अनुसार तोड़ने के लिए उस पर टैप करो। दहाई का कार्ड कितने का है?",
    "Which column is the 3 of 32 standing in?": "32 का 3 किस स्तंभ में खड़ा है?",
    "How is the multiplier in 5,142 × 46 split by place? Split it, then say what the tens card is worth.": "5,142 × 46 में गुणक स्थान के अनुसार कैसे टूटता है? उसे तोड़ो, फिर बताओ दहाई का कार्ड कितने का है।",
    "Read the 4 of 46 together with the name of its column.": "46 के 4 को उसके स्तंभ के नाम के साथ पढ़ो।",
    "How many rows?": "कितनी पंक्तियाँ?",
    "How many partial products does a multiplier of 235 give? Type it, then tap the multiplier to see.": "235 गुणक से कितने आंशिक गुणनफल बनते हैं? लिखो, फिर देखने के लिए गुणक पर टैप करो।",
    "Each digit of 235 gives one card. How many digits are there?": "235 का हर अंक एक कार्ड देता है। कितने अंक हैं?",
    "Each place gives one row, and the rows are added": "हर स्थान की एक पंक्ति, फिर जोड़ना",
    "One row for each card. Then add the rows together, and nothing is left over.": "हर कार्ड के लिए एक पंक्ति। फिर पंक्तियाँ जोड़ो, और कुछ नहीं बचता।",
    "Slide the zero on the tens card into its row, and watch.": "दहाई वाले कार्ड का शून्य उसकी पंक्ति में खिसकाओ, और देखो।",
    "The grey zero only holds the ones column open. The zero beside it came from 658 × 5.": "धूसर शून्य बस इकाई का स्तंभ खुला रखता है। उसके पास वाला शून्य 658 × 5 से आया।",
    "Three rows, one for each place, and they add to 99,358.": "तीन पंक्तियाँ, हर स्थान के लिए एक, और उनका जोड़ 99,358 है।",
    "Which zero in that row is only holding a column open?": "उस पंक्ति में कौन सा शून्य सिर्फ़ एक स्तंभ खुला रख रहा है?",
    "Build the tens row again from its right hand end. Its holding zero goes in first.": "दहाई की पंक्ति फिर से दाएँ सिरे से बनाओ। उसका जगह रखने वाला शून्य पहले आता है।",
    "Each row starts one column further left than the row above it. A row is read by the column it starts in, not by the zeros at its end.": "हर पंक्ति ऊपर की पंक्ति से एक स्तंभ और बाईं ओर शुरू होती है। पंक्ति उस स्तंभ से पढ़ी जाती है जहाँ से वह शुरू होती है, आखिर के शून्यों से नहीं।",
    "You learned: each place gives one row, and the rows add up.": "तुमने सीखा: हर स्थान एक पंक्ति देता है, और पंक्तियाँ जुड़ती हैं।",
    "What do the rows add to?": "पंक्तियों का जोड़ कितना है?",
    "Multiply 3,124 by 23. Build each card's row, then add the rows.": "3,124 को 23 से गुणा करो। हर कार्ड की पंक्ति बनाओ, फिर पंक्तियाँ जोड़ो।",
    "The tens row holds 3,124 × 20. Which column must its zero keep open?": "दहाई की पंक्ति में 3,124 × 20 है। उसके शून्य को कौन सा स्तंभ खुला रखना है?",
    "Multiply 2,132 by 14.": "2,132 को 14 से गुणा करो।",
    "The 1 in 14 is one ten. Did its row start in the tens column?": "14 का 1 एक दहाई है। क्या उसकी पंक्ति दहाई के स्तंभ से शुरू हुई?",
    "Multiply 4,318 by 26. Read each partial product as its row fills.": "4,318 को 26 से गुणा करो। हर पंक्ति भरते समय उसका आंशिक गुणनफल पढ़ो।",
    "Look at the tens row of 4,318 × 26. Is a grey zero holding its ones column?": "4,318 × 26 की दहाई वाली पंक्ति देखो। क्या एक धूसर शून्य उसका इकाई स्तंभ थामे है?",
    "A zero place is a step you skip": "शून्य वाला स्थान एक छोड़ा जाने वाला कदम है",
    "One of these cards holds nothing. Would a row built from it change the total?": "इनमें से एक कार्ड में कुछ नहीं है। क्या उससे बनी पंक्ति कुल को बदलेगी?",
    "What would that row have added if it had been written?": "अगर वह पंक्ति लिखी जाती, तो वह क्या जोड़ती?",
    "Name each place before you touch its card. The hundreds row still starts in the hundreds column.": "हर कार्ड छूने से पहले उसके स्थान का नाम बोलो। सैकड़े की पंक्ति फिर भी सैकड़े के स्तंभ से शुरू होती है।",
    "A zero place is a step you skip, not a row you work. The places above it keep their own columns, because a skipped row is not a missing place.": "शून्य वाला स्थान छोड़ा जाने वाला कदम है, हल करने वाली पंक्ति नहीं। उसके ऊपर के स्थान अपने ही स्तंभ में रहते हैं, क्योंकि छोड़ी गई पंक्ति गायब स्थान नहीं है।",
    "You learned: a zero place is skipped, and no row moves up.": "तुमने सीखा: शून्य वाला स्थान छोड़ा जाता है, और कोई पंक्ति ऊपर नहीं खिसकती।",
    "Multiply 2,143 by 304. Work the cards in order, and let the zero card close its row.": "2,143 को 304 से गुणा करो। कार्ड क्रम से हल करो। शून्य वाला कार्ड अपनी पंक्ति बंद करेगा।",
    "The 3 in 304 is 3 hundreds. Which column does its row begin in?": "304 का 3, 3 सैकड़े है। उसकी पंक्ति किस स्तंभ से शुरू होती है?",
    "Multiply 1,256 by 203.": "1,256 को 203 से गुणा करो।",
    "Skipping the tens row never moves the hundreds row. Where does that row begin?": "दहाई की पंक्ति छोड़ने से सैकड़े की पंक्ति कभी नहीं खिसकती। वह पंक्ति कहाँ से शुरू होती है?",
    "How many rows were needed?": "कितनी पंक्तियाँ चाहिए थीं?",
    "A child working 3,241 × 506 opened three rows. How many rows were needed? Type it, then tap the zero card.": "3,241 × 506 करते हुए एक बच्चे ने तीन पंक्तियाँ खोलीं। कितनी पंक्तियाँ चाहिए थीं? लिखो, फिर शून्य वाले कार्ड पर टैप करो।",
    "Which card of 506 holds nothing at all?": "506 के किस कार्ड में कुछ भी नहीं है?",
    "A round multiplier is better swapped than split": "शून्यों वाले गुणक को तोड़ने से अच्छा है अदला-बदली",
    "That number is all zeros after its first digit. Would you really split it into places?": "उस संख्या में पहले अंक के बाद सब शून्य हैं। क्या तुम सच में उसे स्थानों में तोड़ोगे?",
    "What short fact is left once those zeros have been set aside?": "वे शून्य अलग रखने के बाद कौन सा छोटा गुणा बचता है?",
    "Swap them so the round number is the multiplier. Its zeros go straight down into the row.": "अदला-बदली करो ताकि शून्यों वाली संख्या गुणक बने। उसके शून्य सीधे पंक्ति में नीचे जाते हैं।",
    "A round number is handled by its own zeros and is never split by place. Swapping puts it where those zeros can work.": "शून्यों वाली संख्या अपने शून्यों से ही हल होती है, उसे स्थान के अनुसार कभी नहीं तोड़ते। अदला-बदली उसे वहाँ रखती है जहाँ वे शून्य काम कर सकें।",
    "You learned: swap so a round number works through its zeros.": "तुमने सीखा: अदला-बदली करो ताकि शून्यों वाली संख्या अपने शून्यों से काम करे।",
    "What is the product?": "गुणनफल क्या है?",
    "Find 3,000 × 214 in the shortest way you can.": "3,000 × 214 सबसे छोटे तरीके से निकालो।",
    "Count the zeros of 3,000. Did every one of them reach the row?": "3,000 के शून्य गिनो। क्या हर एक पंक्ति तक पहुँचा?",
    "Find 4,000 × 125 in the shortest way. Think about why you may swap them.": "4,000 × 125 सबसे छोटे तरीके से निकालो। सोचो कि तुम इनकी अदला-बदली क्यों कर सकते हो।",
    "The short fact ends in zeros of its own. Did all the zeros of 4,000 come down too?": "छोटे गुणे के अपने शून्य भी हैं। क्या 4,000 के सारे शून्य भी नीचे आए?",
    "How many bags?": "कितने थैले?",
    "A mill packs 2,000 bags of flour a day. How many bags in 365 days? Let the zeros do the work.": "एक चक्की रोज़ आटे के 2,000 थैले भरती है। 365 दिनों में कितने थैले? शून्यों को काम करने दो।",
    "Once 2,000 is the multiplier, how many zeros follow the short fact?": "जब 2,000 गुणक बन जाए, तो छोटे गुणे के बाद कितने शून्य आते हैं?",
    /* the working area's own words */
    "card": "कार्ड", "cards": "कार्ड", "row": "पंक्ति", "rows": "पंक्तियाँ", "zero": "शून्य", "zeros": "शून्य",
    "O": "इ", "T": "द", "H": "सै", "Th": "ह", "TTh": "द.ह", "L": "ला", "TL": "द.ला",
    "ones": "इकाई", "tens": "दहाई", "hundreds": "सैकड़ा", "thousands": "हज़ार", "ten thousands": "दस हज़ार", "lakhs": "लाख", "ten lakhs": "दस लाख",
    "skipped": "छोड़ी गई", "Swap": "बदलो", "New sum": "नया सवाल", "Add rows": "पंक्तियाँ जोड़ो",
    "Swap the two numbers": "दोनों संख्याएँ बदलो", "A new sum": "एक नया सवाल", "Add the rows": "पंक्तियाँ जोड़ो",
    "1 row": "1 पंक्ति", "2 rows": "2 पंक्तियाँ", "3 rows": "3 पंक्तियाँ",
  },
  gu: {
    "Partial Product Workshop": "આંશિક ગુણાકાર કાર્યશાળા",
    "The multiplier is standing whole. Nothing moves until it comes apart.": "ગુણક આખો ઊભો છે. તે છૂટો ન પડે ત્યાં સુધી કંઈ નહીં ખસે.",
    "You split every multiplier by place and closed the rows a zero never needed. Then round numbers worked through their own zeros.": "તમે દરેક ગુણકને સ્થાન પ્રમાણે તોડ્યો અને શૂન્યની બિનજરૂરી હાર બંધ કરી. પછી શૂન્યોવાળી સંખ્યાઓએ પોતાના શૂન્યથી કામ કર્યું.",
    "Free play. Pick a new sum, split it, slide the zeros, swap the numbers and add the rows.": "મુક્ત રમત. નવો દાખલો પસંદ કરો, તેને તોડો, શૂન્ય સરકાવો, સંખ્યાઓ બદલો અને હાર ઉમેરો.",
    "A long multiplier is used one place at a time": "લાંબો ગુણક એક વખતે એક સ્થાન લેવાય છે",
    "Split the multiplier by place first. Nothing gets multiplied until the cards are down.": "પહેલાં ગુણકને સ્થાન પ્રમાણે તોડો. કાર્ડ નીચે આવે ત્યાં સુધી કંઈ ગુણાશે નહીં.",
    "What is each card worth, read together with its place name?": "દરેક કાર્ડ તેના સ્થાનના નામ સાથે વાંચતાં કેટલાનું છે?",
    "Look at the heading over that digit. A digit in the tens column counts tens, not ones.": "તે અંક ઉપરનું મથાળું જુઓ. દશકના સ્તંભનો અંક દશક ગણે છે, એકમ નહીં.",
    "The multiplier is split by place before anything is multiplied. So the number of rows is settled before the first digit is worked.": "કંઈ પણ ગુણતાં પહેલાં ગુણકને સ્થાન પ્રમાણે તોડાય છે. તેથી પહેલો અંક ઉકેલાય તે પહેલાં જ હારની સંખ્યા નક્કી થઈ જાય છે.",
    "You learned: split the multiplier by place before you multiply.": "તમે શીખ્યા: ગુણાકાર કરતાં પહેલાં ગુણકને સ્થાન પ્રમાણે તોડો.",
    "The tens card is worth?": "દશકનું કાર્ડ કેટલાનું છે?",
    "The multiplier in 4,213 × 32 has two digits. Tap it to split it by place. What is the tens card worth?": "4,213 × 32 માં ગુણકના બે અંક છે. સ્થાન પ્રમાણે તોડવા તેના પર ટૅપ કરો. દશકનું કાર્ડ કેટલાનું છે?",
    "Which column is the 3 of 32 standing in?": "32 નો 3 કયા સ્તંભમાં ઊભો છે?",
    "How is the multiplier in 5,142 × 46 split by place? Split it, then say what the tens card is worth.": "5,142 × 46 માં ગુણક સ્થાન પ્રમાણે કેવી રીતે તૂટે છે? તેને તોડો, પછી કહો દશકનું કાર્ડ કેટલાનું છે.",
    "Read the 4 of 46 together with the name of its column.": "46 ના 4 ને તેના સ્તંભના નામ સાથે વાંચો.",
    "How many rows?": "કેટલી હાર?",
    "How many partial products does a multiplier of 235 give? Type it, then tap the multiplier to see.": "235 ગુણકથી કેટલા આંશિક ગુણાકાર બને છે? લખો, પછી જોવા માટે ગુણક પર ટૅપ કરો.",
    "Each digit of 235 gives one card. How many digits are there?": "235 નો દરેક અંક એક કાર્ડ આપે છે. કેટલા અંક છે?",
    "Each place gives one row, and the rows are added": "દરેક સ્થાન એક હાર આપે છે, અને હાર ઉમેરાય છે",
    "One row for each card. Then add the rows together, and nothing is left over.": "દરેક કાર્ડ માટે એક હાર. પછી હાર ઉમેરો, અને કંઈ બાકી રહેતું નથી.",
    "Slide the zero on the tens card into its row, and watch.": "દશકના કાર્ડનો શૂન્ય તેની હારમાં સરકાવો, અને જુઓ.",
    "The grey zero only holds the ones column open. The zero beside it came from 658 × 5.": "રાખોડી શૂન્ય ફક્ત એકમનો સ્તંભ ખુલ્લો રાખે છે. તેની બાજુનો શૂન્ય 658 × 5 માંથી આવ્યો.",
    "Three rows, one for each place, and they add to 99,358.": "ત્રણ હાર, દરેક સ્થાન માટે એક, અને તેમનો સરવાળો 99,358 છે.",
    "Which zero in that row is only holding a column open?": "તે હારમાં કયો શૂન્ય ફક્ત એક સ્તંભ ખુલ્લો રાખે છે?",
    "Build the tens row again from its right hand end. Its holding zero goes in first.": "દશકની હાર ફરીથી જમણા છેડેથી બનાવો. તેનો જગ્યા રાખતો શૂન્ય પહેલાં આવે છે.",
    "Each row starts one column further left than the row above it. A row is read by the column it starts in, not by the zeros at its end.": "દરેક હાર ઉપરની હાર કરતાં એક સ્તંભ વધુ ડાબેથી શરૂ થાય છે. હાર જે સ્તંભથી શરૂ થાય તેનાથી વંચાય છે, છેડાના શૂન્યથી નહીં.",
    "You learned: each place gives one row, and the rows add up.": "તમે શીખ્યા: દરેક સ્થાન એક હાર આપે છે, અને હાર ઉમેરાય છે.",
    "What do the rows add to?": "હારનો સરવાળો કેટલો છે?",
    "Multiply 3,124 by 23. Build each card's row, then add the rows.": "3,124 નો 23 સાથે ગુણાકાર કરો. દરેક કાર્ડની હાર બનાવો, પછી હાર ઉમેરો.",
    "The tens row holds 3,124 × 20. Which column must its zero keep open?": "દશકની હારમાં 3,124 × 20 છે. તેના શૂન્યે કયો સ્તંભ ખુલ્લો રાખવાનો છે?",
    "Multiply 2,132 by 14.": "2,132 નો 14 સાથે ગુણાકાર કરો.",
    "The 1 in 14 is one ten. Did its row start in the tens column?": "14 નો 1 એક દશક છે. શું તેની હાર દશકના સ્તંભથી શરૂ થઈ?",
    "Multiply 4,318 by 26. Read each partial product as its row fills.": "4,318 નો 26 સાથે ગુણાકાર કરો. દરેક હાર ભરાય ત્યારે તેનો આંશિક ગુણાકાર વાંચો.",
    "Look at the tens row of 4,318 × 26. Is a grey zero holding its ones column?": "4,318 × 26 ની દશકની હાર જુઓ. શું રાખોડી શૂન્ય તેનો એકમ સ્તંભ પકડી રાખે છે?",
    "A zero place is a step you skip": "શૂન્યવાળું સ્થાન છોડી દેવાનું પગલું છે",
    "One of these cards holds nothing. Would a row built from it change the total?": "આમાંથી એક કાર્ડમાં કંઈ નથી. શું તેનાથી બનેલી હાર કુલ બદલશે?",
    "What would that row have added if it had been written?": "જો તે હાર લખાઈ હોત, તો તે શું ઉમેરત?",
    "Name each place before you touch its card. The hundreds row still starts in the hundreds column.": "દરેક કાર્ડને અડતાં પહેલાં તેના સ્થાનનું નામ બોલો. શતકની હાર તો પણ શતકના સ્તંભથી શરૂ થાય છે.",
    "A zero place is a step you skip, not a row you work. The places above it keep their own columns, because a skipped row is not a missing place.": "શૂન્યવાળું સ્થાન છોડી દેવાનું પગલું છે, ઉકેલવાની હાર નહીં. તેની ઉપરનાં સ્થાન પોતાના જ સ્તંભમાં રહે છે, કારણ કે છોડેલી હાર ખૂટતું સ્થાન નથી.",
    "You learned: a zero place is skipped, and no row moves up.": "તમે શીખ્યા: શૂન્યવાળું સ્થાન છોડાય છે, અને કોઈ હાર ઉપર ખસતી નથી.",
    "Multiply 2,143 by 304. Work the cards in order, and let the zero card close its row.": "2,143 નો 304 સાથે ગુણાકાર કરો. કાર્ડ ક્રમમાં ઉકેલો. શૂન્યનું કાર્ડ પોતાની હાર બંધ કરશે.",
    "The 3 in 304 is 3 hundreds. Which column does its row begin in?": "304 નો 3, 3 શતક છે. તેની હાર કયા સ્તંભથી શરૂ થાય છે?",
    "Multiply 1,256 by 203.": "1,256 નો 203 સાથે ગુણાકાર કરો.",
    "Skipping the tens row never moves the hundreds row. Where does that row begin?": "દશકની હાર છોડવાથી શતકની હાર ક્યારેય ખસતી નથી. તે હાર ક્યાંથી શરૂ થાય છે?",
    "How many rows were needed?": "કેટલી હાર જોઈતી હતી?",
    "A child working 3,241 × 506 opened three rows. How many rows were needed? Type it, then tap the zero card.": "3,241 × 506 કરતાં એક બાળકે ત્રણ હાર ખોલી. કેટલી હાર જોઈતી હતી? લખો, પછી શૂન્યના કાર્ડ પર ટૅપ કરો.",
    "Which card of 506 holds nothing at all?": "506 ના કયા કાર્ડમાં કંઈ જ નથી?",
    "A round multiplier is better swapped than split": "શૂન્યોવાળા ગુણકને તોડવા કરતાં અદલાબદલી સારી",
    "That number is all zeros after its first digit. Would you really split it into places?": "તે સંખ્યામાં પહેલા અંક પછી બધા શૂન્ય છે. શું તમે ખરેખર તેને સ્થાનોમાં તોડશો?",
    "What short fact is left once those zeros have been set aside?": "તે શૂન્ય બાજુએ મૂક્યા પછી કયો નાનો ગુણાકાર બચે છે?",
    "Swap them so the round number is the multiplier. Its zeros go straight down into the row.": "અદલાબદલી કરો જેથી શૂન્યોવાળી સંખ્યા ગુણક બને. તેના શૂન્ય સીધા હારમાં નીચે જાય છે.",
    "A round number is handled by its own zeros and is never split by place. Swapping puts it where those zeros can work.": "શૂન્યોવાળી સંખ્યા પોતાના શૂન્યથી જ ઉકેલાય છે, તેને સ્થાન પ્રમાણે ક્યારેય તોડાતી નથી. અદલાબદલી તેને ત્યાં મૂકે છે જ્યાં તે શૂન્ય કામ કરી શકે.",
    "You learned: swap so a round number works through its zeros.": "તમે શીખ્યા: અદલાબદલી કરો જેથી શૂન્યોવાળી સંખ્યા પોતાના શૂન્યથી કામ કરે.",
    "What is the product?": "ગુણાકાર કેટલો છે?",
    "Find 3,000 × 214 in the shortest way you can.": "3,000 × 214 સૌથી ટૂંકી રીતે શોધો.",
    "Count the zeros of 3,000. Did every one of them reach the row?": "3,000 ના શૂન્ય ગણો. શું દરેક હાર સુધી પહોંચ્યો?",
    "Find 4,000 × 125 in the shortest way. Think about why you may swap them.": "4,000 × 125 સૌથી ટૂંકી રીતે શોધો. વિચારો કે તમે તેમની અદલાબદલી કેમ કરી શકો.",
    "The short fact ends in zeros of its own. Did all the zeros of 4,000 come down too?": "નાના ગુણાકારના પોતાના શૂન્ય પણ છે. શું 4,000 ના બધા શૂન્ય પણ નીચે આવ્યા?",
    "How many bags?": "કેટલી થેલી?",
    "A mill packs 2,000 bags of flour a day. How many bags in 365 days? Let the zeros do the work.": "એક ઘંટી રોજ લોટની 2,000 થેલી ભરે છે. 365 દિવસમાં કેટલી થેલી? શૂન્યોને કામ કરવા દો.",
    "Once 2,000 is the multiplier, how many zeros follow the short fact?": "2,000 ગુણક બને પછી, નાના ગુણાકાર પછી કેટલા શૂન્ય આવે છે?",
    /* the working area's own words */
    "card": "કાર્ડ", "cards": "કાર્ડ", "row": "હાર", "rows": "હાર", "zero": "શૂન્ય", "zeros": "શૂન્ય",
    "O": "એ", "T": "દ", "H": "શ", "Th": "હ", "TTh": "દ.હ", "L": "લા", "TL": "દ.લા",
    "ones": "એકમ", "tens": "દશક", "hundreds": "શતક", "thousands": "હજાર", "ten thousands": "દસ હજાર", "lakhs": "લાખ", "ten lakhs": "દસ લાખ",
    "skipped": "છોડી દીધી", "Swap": "બદલો", "New sum": "નવો દાખલો", "Add rows": "હાર ઉમેરો",
    "Swap the two numbers": "બંને સંખ્યા બદલો", "A new sum": "એક નવો દાખલો", "Add the rows": "હાર ઉમેરો",
    "1 row": "1 હાર", "2 rows": "2 હાર", "3 rows": "3 હાર",
  },
};

/* ── the column chart ─────────────────────────────────────────────────────────────────────
   Seven columns (TL L TTh Th H T O) at the right of the working area, the margin at the left holds
   each row's place card. Rows from the top: headings, the multiplicand (deep blue), the multiplier
   (amber) with the times sign, the rule, the carry strip (vermilion, small), the partial product rows
   (rose, one per place card), the second rule and the product (green). Grey is a zero holding a
   place open, or a step that is skipped. */
const NC = 7;
const CW = 96;
const RIGHT = 1076;
const colX = (k: number) => RIGHT - (k + 1) * CW;
const colC = (k: number) => colX(k) + CW / 2;
const LEFT = colX(NC - 1);
const HEADS = ["O", "T", "H", "Th", "TTh", "L", "TL"];
const PLACE = ["ones", "tens", "hundreds", "thousands", "ten thousands", "lakhs", "ten lakhs"];
const G = { headH: 40, aTop: 46, bTop: 106, rowH: 58, rule1: 172, carry: 204, row0: 212, pitch: 62 };
const rowTop = (r: number) => G.row0 + r * G.pitch;
const BASE = 48;                                  /* a digit's baseline inside a 58-tall row */
const CARD = { x: 164, w: 232, h: 50 };          /* a place card in the margin of its row */
const LABEL_X = 152;                              /* the row's place name, right-aligned */
const SWAPKEY = { x: 206, y: 54, w: 190, h: 104 };
const chipX = (jl: number) => CARD.x + 96 + jl * 44;   /* the jl-th holding zero on a card, from the left */
const BLUE = CONTENT.hundred, AMBER = CONTENT.ten, GREEN = CONTENT.one, ROSE = CONTENT.bead, VERM = CONTENT.pointer;
const ZERO = "#767676";
const inkBlue = shade(BLUE, 0.25), inkAmber = shade(AMBER, 0.4), inkGreen = shade(GREEN, 0.25), inkRose = shade(ROSE, 0.25), inkVerm = shade(VERM, 0.25);
const FREE_PAIRS = [[5632, 23], [658, 151], [3134, 205], [7000, 140], [4213, 32]];

const digitsOf = (v: number) => String(Math.trunc(v)).split("").reverse().map(Number); /* ones first */
const isRound = (v: number) => v >= 10 && /^[1-9]0+$/.test(String(v));
const zerosOf = (v: number) => String(v).length - 1;
const empty7 = () => Array.from({ length: NC }, () => null as any);
const newRow = (p: number) => ({ p, cells: empty7(), closed: false });
const upTo = (m: number) => Array.from({ length: Math.max(0, m) }, (_, k) => k);
const ppClone = (o: any) => JSON.parse(JSON.stringify(o));

/* the chart as it stands for an item: the two numbers, the cards (one per place of the multiplier,
   ones first) and their rows, the product, and what is lit */
function sheetFor(it: any, n: number) {
  const kind = it.kind;
  const s: any = {
    kind, style: kind === "free" || n >= 2 ? "chips" : "plain",
    nums: [{ id: 0, v: it.a === undefined ? null : it.a }, { id: 1, v: it.b }], top: 0, liftId: -1, swapped: false,
    mode: "split", split: false, cards: [], rows: [], rule2: false, prod: empty7(), carry: empty7(),
    fact: null, lit: [], hiCard: -1, hiCol: -1, hiMult: false, zerosMoved: 0, roundDone: false,
  };
  if (kind === "product" || kind === "demo" || (kind === "rows" && n === 3)) {
    s.split = true;
    s.cards = digitsOf(it.b).map((d, p) => ({ p, d, read: true, used: 0, state: "open", fly: false }));
    s.rows = s.cards.map((c: any) => newRow(c.p));
  }
  if (kind === "demo") {                          /* the worked example: its ones row is already written */
    digitsOf(it.a * s.cards[0].d).forEach((d, k) => { s.rows[0].cells[k] = { ch: String(d), kind: "fact" }; });
    s.cards[0].state = "built";
  }
  if (kind === "swap") s.mode = "pre";
  if (kind === "free" && isRound(it.b)) { s.mode = "round"; s.rows = [newRow(zerosOf(it.b))]; }
  return s;
}
const topOf = (s: any) => s.nums[s.top].v;
const botOf = (s: any) => s.nums[1 - s.top].v;

/* ── phases ─────────────────────────────────────────────────────────────────────────────
   kinds: split (tap the multiplier into place cards, then type what the tens card is worth) ·
          rows (type how many rows, then make the one move that shows it) ·
          product (build each card's row, the holding zeros slid in by hand, then type the sum) ·
          swap (swap so the round number is the multiplier, slide its zeros down, type the product) */
const PHASES = [
  {
    n: 1,
    concept: "A long multiplier is used one place at a time",
    conceptId: "M2.S3.T5.C16", objectiveIds: ["O7"],
    says: ["Split the multiplier by place first. Nothing gets multiplied until the cards are down."],
    /* tries, as the plan writes it: A miss is answered three ways at once and none of them is the answer. First rung, from the item's own miss line: which of the two numbers is the multiplier? Second rung, the phase's: what is each card worth, read together with its place name? Third rung: the multiplier is cut to two digits with its place names printed under it, and the cards are laid down by the tool while the child reads them out. The pad stays open behind all three. */
    ladder: ["What is each card worth, read together with its place name?", "Look at the heading over that digit. A digit in the tens column counts tens, not ones."],
    closing: "The multiplier is split by place before anything is multiplied. So the number of rows is settled before the first digit is worked.",
    learned: "You learned: split the multiplier by place before you multiply.",
    traceback: "The multiplier splits into its place cards again; the heading over each digit lights and each card is read as its place value, so 3 tens becomes × 30; it ends on every card showing its whole value under the lit multiplier.",
    items: [
      /* learn ML1: answer in the plan = 32 splits into 30 and 2, and each part multiplies 4213 in its own row
         (the slot takes the part the misconception gets wrong: the tens card, 30) */
      { qid: "M2.S3.T5.C16:ML1", kind: "split", a: 4213, b: 32, answer: 30, winMs: 2800, ask: "The tens card is worth?",
        say: "The multiplier in 4,213 × 32 has two digits. Tap it to split it by place. What is the tens card worth?", miss: "Which column is the 3 of 32 standing in?" },
      /* practice 1: answer in the plan = Into 40 and 6, and each part multiplies 5142 in its own row */
      { qid: "M2.S3.T5.C16:1", kind: "split", a: 5142, b: 46, answer: 40, winMs: 2800, ask: "The tens card is worth?",
        say: "How is the multiplier in 5,142 × 46 split by place? Split it, then say what the tens card is worth.", miss: "Read the 4 of 46 together with the name of its column." },
      /* practice 2: answer in the plan = Three, one from the ones, one from the tens and one from the hundreds */
      { qid: "M2.S3.T5.C16:2", kind: "rows", a: null, b: 235, answer: 3, winMs: 2600, ask: "How many rows?",
        say: "How many partial products does a multiplier of 235 give? Type it, then tap the multiplier to see.", miss: "Each digit of 235 gives one card. How many digits are there?" },
    ],
  },
  {
    n: 2,
    concept: "Each place gives one row, and the rows are added",
    conceptId: "M2.S3.T5.C17", objectiveIds: ["O7"],
    says: ["One row for each card. Then add the rows together, and nothing is left over.", "Slide the zero on the tens card into its row, and watch."],
    /* the book's worked example, 658 × 151 (the plan's delight): the child slides the tens row's holding zero in */
    demo: { kind: "demo", a: 658, b: 151 },
    demoLines: ["The grey zero only holds the ones column open. The zero beside it came from 658 × 5.", "Three rows, one for each place, and they add to 99,358."],
    /* tries, as the plan writes it: First rung, from the item: which column does that row start in? Second rung, the phase's: which of the zeros at its end was put there to hold a column open, and which one came out of the short fact? Third rung: the row is built again from its right hand end with the holding zeros walking in grey before the short fact is worked above them. The pad stays open and nothing already written is taken away. */
    ladder: ["Which zero in that row is only holding a column open?", "Build the tens row again from its right hand end. Its holding zero goes in first."],
    closing: "Each row starts one column further left than the row above it. A row is read by the column it starts in, not by the zeros at its end.",
    learned: "You learned: each place gives one row, and the rows add up.",
    traceback: "The headings light from the ones; the tens row is built again from its right hand end, its grey holding zero walking into the ones column before the short fact comes down; the rule closes and the rows are added column by column, carries small above, ending on the whole product.",
    items: [
      /* learn ML2: answer in the plan = 71,852 */
      { qid: "M2.S3.T5.C17:ML2", kind: "product", a: 3124, b: 23, answer: 71852, winMs: 5600, ask: "What do the rows add to?",
        say: "Multiply 3,124 by 23. Build each card's row, then add the rows.", miss: "The tens row holds 3,124 × 20. Which column must its zero keep open?" },
      /* practice 3: answer in the plan = 29,848 */
      { qid: "M2.S3.T5.C17:3", kind: "product", a: 2132, b: 14, answer: 29848, winMs: 5600, ask: "What do the rows add to?",
        say: "Multiply 2,132 by 14.", miss: "The 1 in 14 is one ten. Did its row start in the tens column?" },
      /* practice 4: answer in the plan = 1,12,268, from 25,908 for the ones place and 86,360 for the tens place */
      { qid: "M2.S3.T5.C17:4", kind: "product", a: 4318, b: 26, answer: 112268, winMs: 5600, ask: "What do the rows add to?",
        say: "Multiply 4,318 by 26. Read each partial product as its row fills.", miss: "Look at the tens row of 4,318 × 26. Is a grey zero holding its ones column?" },
    ],
  },
  {
    n: 3,
    concept: "A zero place is a step you skip",
    conceptId: "M2.S3.T5.C18", objectiveIds: ["O8"],
    says: ["One of these cards holds nothing. Would a row built from it change the total?"],
    /* tries, as the plan writes it: First rung, from the item: which place of the multiplier holds a zero? Second rung, the phase's: what would that row have added if it had been written? Third rung: the place names are printed under the multiplier and the child names each place aloud before its card is touched, with the zero card refusing to open a row at all. The pad stays open. */
    ladder: ["What would that row have added if it had been written?", "Name each place before you touch its card. The hundreds row still starts in the hundreds column."],
    closing: "A zero place is a step you skip, not a row you work. The places above it keep their own columns, because a skipped row is not a missing place.",
    learned: "You learned: a zero place is skipped, and no row moves up.",
    traceback: "The ones row is built, the zero card greys and its row closes to a thin line marked skipped, and the hundreds row is built again with its grey holding zeros so it begins in the hundreds column; the rows are added, ending on the whole product.",
    items: [
      /* learn ML3: answer in the plan = 6,51,472, and the tens place needs no step at all */
      { qid: "M2.S3.T5.C18:ML3", kind: "product", a: 2143, b: 304, answer: 651472, winMs: 6400, ask: "What do the rows add to?",
        say: "Multiply 2,143 by 304. Work the cards in order, and let the zero card close its row.", miss: "The 3 in 304 is 3 hundreds. Which column does its row begin in?" },
      /* practice 5: answer in the plan = 2,54,968, and the tens place is skipped */
      { qid: "M2.S3.T5.C18:5", kind: "product", a: 1256, b: 203, answer: 254968, winMs: 6400, ask: "What do the rows add to?",
        say: "Multiply 1,256 by 203.", miss: "Skipping the tens row never moves the hundreds row. Where does that row begin?" },
      /* practice 6: answer in the plan = Two, because the tens place of the multiplier holds a zero and that step is skipped rather than worked */
      { qid: "M2.S3.T5.C18:6", kind: "rows", a: 3241, b: 506, answer: 2, winMs: 2200, ask: "How many rows were needed?",
        say: "A child working 3,241 × 506 opened three rows. How many rows were needed? Type it, then tap the zero card.", miss: "Which card of 506 holds nothing at all?" },
    ],
  },
  {
    n: 4,
    concept: "A round multiplier is better swapped than split",
    conceptId: "M2.S3.T5.C19", objectiveIds: ["O8"],
    says: ["That number is all zeros after its first digit. Would you really split it into places?"],
    /* tries, as the plan writes it: First rung, from the item: which of your two numbers is all zeros after its first digit? Second rung, the phase's: what short fact is left once those zeros have been set aside? Third rung: the swap is made by the tool and the zeros open one at a time to the right of the short fact while the chart headings are named. Nothing is marked and the pad stays open. */
    ladder: ["What short fact is left once those zeros have been set aside?", "Swap them so the round number is the multiplier. Its zeros go straight down into the row."],
    closing: "A round number is handled by its own zeros and is never split by place. Swapping puts it where those zeros can work.",
    learned: "You learned: swap so a round number works through its zeros.",
    traceback: "The two numbers swap so the round one is the multiplier; its zeros walk down into the ones, tens and hundreds columns one at a time while the headings light; then the short fact is worked and its digits come down beside them, ending on the whole product in one row.",
    items: [
      /* learn ML4: answer in the plan = 6,42,000, by handling 3000 through its zeros instead of splitting it */
      { qid: "M2.S3.T5.C19:ML4", kind: "swap", a: 3000, b: 214, answer: 642000, winMs: 4600, ask: "What is the product?",
        say: "Find 3,000 × 214 in the shortest way you can.", miss: "Count the zeros of 3,000. Did every one of them reach the row?" },
      /* practice 7: answer in the plan = 5,00,000, because swapping never changes a product, so 125 x 4 = 500 is worked and the three zeros of 4000 follow */
      { qid: "M2.S3.T5.C19:7", kind: "swap", a: 4000, b: 125, answer: 500000, winMs: 4600, ask: "What is the product?",
        say: "Find 4,000 × 125 in the shortest way. Think about why you may swap them.", miss: "The short fact ends in zeros of its own. Did all the zeros of 4,000 come down too?" },
      /* practice 8: answer in the plan = 7,30,000 bags, letting the three zeros of 2000 do the work instead of splitting it into places */
      { qid: "M2.S3.T5.C19:8", kind: "swap", a: 2000, b: 365, answer: 730000, winMs: 4600, ask: "How many bags?",
        say: "A mill packs 2,000 bags of flour a day. How many bags in 365 days? Let the zeros do the work.", miss: "Once 2,000 is the multiplier, how many zeros follow the short fact?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  columns: HEADS, columnWidth: CW, places: PLACE,
  colours: { multiplicand: BLUE, multiplier: AMBER, partialRow: ROSE, product: GREEN, carry: VERM, holdingZero: ZERO },
  items: PHASES.map((p: any) => p.items.map((it: any) => ({ qid: it.qid, kind: it.kind, multiplicand: it.a, multiplier: it.b, answer: it.answer }))),
  freePlay: FREE_PAIRS,
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: numbers compare as numbers (commas and a trailing word are fine) */
const judge = (item: any, v: any) => leadNumber(v) === item.answer;

/* the schoolbook grid (every digit times every digit, then the carries), which shares nothing with
   the chart's rows or with judge */
const gridProduct = (x: number, y: number) => {
  const X = String(x).split("").reverse().map(Number), Y = String(y).split("").reverse().map(Number);
  const out = new Array(X.length + Y.length).fill(0);
  X.forEach((p, i) => Y.forEach((q, j) => { out[i + j] += p * q; }));
  for (let k = 0; k < out.length - 1; k++) { out[k + 1] += Math.floor(out[k] / 10); out[k] %= 10; }
  return Number(out.reverse().join(""));
};
/* oracle: every answer re-derived by a second route */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const bs = String(it.b);
  if (it.kind === "split") return bs.length === 2 && it.answer === Number(bs[0] + "0");
  if (it.kind === "rows") return it.answer === bs.split("").filter((c) => c !== "0").length;
  if (it.kind === "product" || it.kind === "swap") return it.answer === gridProduct(it.a, it.b);
  return false;
}));
/* the misconception each item breaks; judge must reject it */
const nearMiss = (item: any) => {
  const bd = digitsOf(item.b || 0);
  if (item.kind === "split") return bd[bd.length - 1];                         /* the tens digit read as ones */
  if (item.kind === "rows") return bd.includes(0) ? bd.length : bd.length - 1; /* the zero row worked / a place missed */
  if (item.kind === "product") {
    if (bd.includes(0)) {                                                        /* the zero skipped, then the rows above moved up */
      let s = 0, at = 0;
      bd.forEach((d) => { if (d) { s += item.a * d * Math.pow(10, at); at++; } });
      return s;
    }
    return bd.reduce((s, d) => s + item.a * d, 0);                              /* every row flush with the ones: the holding zeros left off */
  }
  if (item.kind === "swap") return item.answer / 10;                            /* one zero lost on the way */
  return typeof item.answer === "number" ? item.answer + 1 : "~";
};
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;
/* what the child types is shown with Indian commas from 1,000 */
const format = (t: any) => (/^[1-9]\d{3,}$/.test(String(t)) ? indian(Number(t)) : String(t ?? ""));

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (T.state().stage === "demo") return HOOK.demo && HOOK.demo();
  if (!HOOK.enter) return T.submit(item.answer);
  HOOK.enter(item.answer);
  if (item.kind === "rows") setTimeout(() => HOOK.check && HOOK.check(), 80);
};
/* answers are typed: the agent's answer() goes to the slot */
const answer = (item: any, v: any) => undefined;
/* the agent's check() before Enter: with a prediction made, it makes the move that shows it; undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

const PPW_CSS = `
.ppw-fly{animation:ppwFly 460ms cubic-bezier(.3,.7,.25,1) both}
@keyframes ppwFly{from{transform:translate(var(--dx),var(--dy));opacity:.3}to{transform:none;opacity:1}}
.ppw-walk{animation:ppwWalk 440ms cubic-bezier(.3,.7,.25,1) both}
@keyframes ppwWalk{from{transform:translate(var(--dx),var(--dy))}to{transform:none}}
.ppw-drop{animation:ppwDrop 300ms ease-out both}
@keyframes ppwDrop{from{transform:translateY(-26px);opacity:0}to{transform:none;opacity:1}}
.ppw-slide{transition:transform 480ms cubic-bezier(.3,.7,.25,1)}
.ppw-rule{stroke-dasharray:720;stroke-dashoffset:720;animation:ppwRule 380ms ease-out forwards}
@keyframes ppwRule{to{stroke-dashoffset:0}}
.ppw-grab{cursor:grab}
@media (prefers-reduced-motion:reduce){.ppw-fly,.ppw-walk,.ppw-drop,.ppw-rule{animation:none}.ppw-rule{stroke-dashoffset:0}.ppw-slide{transition:none}}
`;

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  HOOK.tx = tx;   /* the summary's Thumb draws its words in the language in use */
  const tl = useTimeline();
  const free = stage === "free";
  const [S, setS] = useState<any>(() => sheetFor(phase.demo || item, n));
  const sRef = useRef<any>(S);
  const put = (s: any) => { sRef.current = s; setS(s); };
  const [armed, setArmed] = useState(false);          /* rows: the prediction is in, the move waits */
  const armedRef = useRef(false);
  const predRef = useRef<any>(null);
  const revealedRef = useRef(false);                  /* the move has been made (a retry commits directly) */
  const [pairAt, setPairAt] = useState(0);
  const setupFor = useRef(phase.demo ? -1 : 0);
  const busy = tl.busy;
  const kind = S.kind;

  const reset = (it: any) => {
    tl.stop();
    put(sheetFor(it, n));
    armedRef.current = false; setArmed(false); predRef.current = null; revealedRef.current = false;
    api.lock(false);
  };

  useEffect(() => {
    if (stage === "ask" && setupFor.current !== index) { setupFor.current = index; reset(item); }
  }, [stage, index]);

  /* free play (the plan's freePlay): the book's sums in turn, every control open, nothing to get right */
  useEffect(() => {
    if (!free) return;
    setupFor.current = -2;
    setPairAt(0);
    reset({ kind: "free", a: FREE_PAIRS[0][0], b: FREE_PAIRS[0][1] });
  }, [free]);

  /* ── steps: each changes a copy of the chart, and the timeline shows the copies in turn ── */
  const plan = () => {
    const sim = ppClone(sRef.current);
    const steps: any[] = [];
    const step = (ms: number, fn?: (s: any) => void, snd = false) => {
      if (fn) fn(sim);
      const snap = ppClone(sim);
      steps.push([ms, () => { put(snap); if (snd) api.sfx.tick(); }]);
    };
    return { sim, steps, step };
  };

  /* the multiplier comes apart: one card per place, ones first, each opening its own row */
  const doSplit = (P: any, f = 1) => {
    if (P.sim.split || P.sim.mode !== "split") return;
    const chips = P.sim.style === "chips";
    P.step(320 * f, (s) => { s.hiMult = true; });
    digitsOf(botOf(P.sim)).forEach((d, p) => P.step(460 * f, (s) => {
      s.split = true; s.cards.push({ p, d, read: chips, used: 0, state: "open", fly: true }); s.rows.push(newRow(p));
    }, true));
    P.step(200 * f, (s) => { s.hiMult = false; });
  };
  /* a card is read as its place value: 3 tens becomes × 30 */
  const doRead = (P: any, r: number, f = 1) => {
    const p = P.sim.cards[r].p;
    P.step(300 * f, (s) => { s.hiCard = r; s.lit = [p]; });
    P.step(600 * f, (s) => { s.cards[r].read = true; }, true);
    P.step(160 * f, (s) => { s.hiCard = -1; s.lit = []; });
  };
  /* a holding zero walks from its card into column j of that card's row */
  const walkIn = (P: any, r: number, j: number, f = 1, from?: any) => {
    const c = P.sim.cards[r];
    const src = from || { x: chipX(c.p - 1 - j) + 19, y: rowTop(r) + 29 };
    P.step(480 * f, (s) => {
      s.rows[r].cells[j] = { ch: "0", kind: "hold", fx: Math.round(src.x - colC(j)), fy: Math.round(src.y - (rowTop(r) + 29)) };
      s.cards[r].used = j + 1;
    }, true);
  };
  /* the short fact (the multiplicand times the card's digit), then its digits come down from the right,
     starting in the card's own column */
  const doFact = (P: any, r: number, f = 1) => {
    const c = P.sim.cards[r], a = topOf(P.sim), fct = a * c.d;
    P.step(420 * f, (s) => { s.fact = { a, d: c.d, f: null, green: false }; s.hiCard = r; });
    P.step(520 * f, (s) => { s.fact.f = fct; });
    digitsOf(fct).forEach((d, i) => P.step(250 * f, (s) => { s.rows[r].cells[c.p + i] = { ch: String(d), kind: "fact" }; }, true));
    P.step(420 * f, (s) => { s.cards[r].state = "built"; s.hiCard = -1; s.lit = []; });
    P.step(60 * f, (s) => { s.fact = null; });   /* the row now says it: the working goes */
  };
  const doBuild = (P: any, r: number, f = 1, clear = false, heads = false) => {
    const c = P.sim.cards[r];
    if (clear) P.step(340 * f, (s) => { s.rows[r].cells = empty7(); s.cards[r].used = 0; s.cards[r].state = "open"; s.hiCard = r; s.fact = null; });
    else P.step(160 * f, (s) => { s.hiCard = r; });
    for (let j = c.used; j < c.p; j++) {
      if (heads) P.step(320 * f, (s) => { s.lit = upTo(j + 1); });
      walkIn(P, r, j, f);
    }
    if (heads) P.step(320 * f, (s) => { s.lit = upTo(c.p + 1); });
    doFact(P, r, f);
  };
  /* a card holding a zero greys, and its row closes to a thin line: skipped, not worked */
  const doSkip = (P: any, r: number, f = 1) => {
    const p = P.sim.cards[r].p;
    P.step(320 * f, (s) => { s.hiCard = r; s.lit = [p]; });
    P.step(560 * f, (s) => { s.cards[r].state = "skipped"; s.rows[r].closed = true; s.rows[r].cells = empty7(); }, true);
    P.step(200 * f, (s) => { s.hiCard = -1; s.lit = []; });
  };
  const allDone = (s: any) => s.split && s.cards.length > 0 && s.cards.every((c: any) => c.state !== "open");
  const doRule = (P: any, f = 1) => { if (!P.sim.rule2) P.step(380 * f, (s) => { s.rule2 = true; }, true); };
  /* the rows are added column by column from the ones; a carry stands small over the next column */
  const doAdd = (P: any, f = 1) => {
    P.step(200 * f, (s) => { s.prod = empty7(); s.carry = empty7(); s.fact = null; });
    const live = P.sim.rows.filter((r: any) => !r.closed);
    let carry = 0;
    for (let k = 0; k < NC; k++) {
      const col = live.map((r: any) => (r.cells[k] ? Number(r.cells[k].ch) : null));
      if (col.every((x: any) => x === null) && carry === 0) break;
      const sum = carry + col.reduce((t: number, x: any) => t + (x || 0), 0);
      const dg = sum % 10, cy = Math.floor(sum / 10);
      P.step(300 * f, (s) => { s.hiCol = k; s.lit = [k]; });
      P.step(380 * f, (s) => { s.prod[k] = String(dg); if (cy && k + 1 < NC) s.carry[k + 1] = String(cy); }, true);
      carry = cy;
    }
    P.step(260 * f, (s) => { s.hiCol = -1; s.lit = []; });
  };
  /* every open card done in order (the ones row, the zero card, the shifted rows) */
  const doAllRows = (P: any, f = 1) => {
    P.sim.cards.forEach((c: any, r: number) => {
      if (c.state !== "open") return;
      if (c.d === 0 && c.p > 0) doSkip(P, r, f);
      else doBuild(P, r, f);
    });
  };
  /* the swap: the upper number steps aside, the two pass each other, and the round one lands as the multiplier */
  const doSwap = (P: any, f = 1) => {
    const down = P.sim.nums[P.sim.top].id;
    P.step(320 * f, (s) => { s.liftId = down; });
    P.step(560 * f, (s) => { s.top = 1 - s.top; s.swapped = !s.swapped; });
    P.step(300 * f, (s) => {
      s.liftId = -1;
      const b = botOf(s);
      s.mode = isRound(b) ? "round" : "split";
      s.split = false; s.cards = []; s.rows = s.mode === "round" ? [newRow(zerosOf(b))] : [];
      s.rule2 = false; s.prod = empty7(); s.carry = empty7(); s.fact = null; s.zerosMoved = 0; s.roundDone = false;
    }, true);
  };
  /* a round multiplier: its zeros go straight down into the row, one at a time */
  const mWalk = (P: any, j: number, f = 1, from?: any) => {
    const src = from || { x: colC(j), y: G.bTop + 29 };
    P.step(480 * f, (s) => {
      s.rows[0].cells[j] = { ch: "0", kind: "hold", fx: Math.round(src.x - colC(j)), fy: Math.round(src.y - (rowTop(0) + 29)) };
      s.zerosMoved = j + 1;
    }, true);
  };
  const doZeros = (P: any, f = 1, heads = false) => {
    const p = P.sim.rows[0].p;
    for (let j = P.sim.zerosMoved; j < p; j++) {
      if (heads) P.step(300 * f, (s) => { s.lit = upTo(j + 1); });
      mWalk(P, j, f);
    }
  };
  const doRoundFact = (P: any, f = 1) => {
    const a = topOf(P.sim), b = botOf(P.sim), p = P.sim.rows[0].p, d = Math.round(b / Math.pow(10, p)), fct = a * d;
    P.step(420 * f, (s) => { s.fact = { a, d, f: null, green: true }; s.lit = []; });
    P.step(520 * f, (s) => { s.fact.f = fct; });
    digitsOf(fct).forEach((dd, i) => P.step(250 * f, (s) => { s.rows[0].cells[p + i] = { ch: String(dd), kind: "prod" }; }, true));
    P.step(200 * f, (s) => { s.roundDone = true; });
  };

  /* ── the child's moves ── */
  const runAct = (P: any, after?: () => void) => {
    api.lock(true);
    tl.run(P.steps, () => { api.lock(false); if (after) after(); });
  };
  /* rows: the prediction is in; the one move that shows the count, then the prediction is judged */
  const act = () => {
    if (!armedRef.current || revealedRef.current) return;
    const P = plan();
    if (!P.sim.split) doSplit(P);
    else { const r = P.sim.cards.findIndex((c: any) => c.d === 0 && c.p > 0 && c.state === "open"); if (r >= 0) doSkip(P, r); }
    armedRef.current = false; setArmed(false);
    tl.run(P.steps, () => { revealedRef.current = true; api.submit(predRef.current); });
  };
  const tapSplit = () => {
    if (kind === "rows") { act(); return; }
    const P = plan(); doSplit(P); runAct(P);
  };
  const tapCard = (r: number) => {
    if (kind === "rows") { act(); return; }
    const P = plan(), c = P.sim.cards[r];
    if (c.d === 0 && c.p > 0) doSkip(P, r); else doFact(P, r);
    if (allDone(P.sim)) doRule(P);
    runAct(P);
  };
  const moveZero = (r: number, j: number, from?: any) => {
    const P = plan();
    walkIn(P, r, j, 1, from);
    if (stage === "demo") {
      /* the delight: the grey zero stands alone a beat, then the short fact's digits come down beside it;
         then the book finishes its example (the hundreds row, the rule, the sum) */
      P.step(900);
      doFact(P, r, 1.2);
      P.step(1000);
      doAllRows(P, 0.9); doRule(P); doAdd(P, 0.9);
      P.step(500);
      tl.run(P.steps, () => api.demoDone(phase.demoLines));
      return;
    }
    if (P.sim.cards[r].used >= P.sim.cards[r].p) { doFact(P, r); if (allDone(P.sim)) doRule(P); }
    runAct(P);
  };
  const moveMZero = (j: number, from?: any) => {
    const P = plan();
    mWalk(P, j, 1, from);
    if (free && P.sim.zerosMoved >= P.sim.rows[0].p) doRoundFact(P);
    runAct(P);
  };
  const tapSwap = () => { const P = plan(); doSwap(P); runAct(P); };
  const freeNew = () => {
    const k = (pairAt + 1) % FREE_PAIRS.length;
    setPairAt(k);
    reset({ kind: "free", a: FREE_PAIRS[k][0], b: FREE_PAIRS[k][1] });
  };
  const freeAdd = () => { const P = plan(); doRule(P); doAdd(P); runAct(P); };

  /* what is live right now (one thing at a time, in the order the book works it) */
  const asking = stage === "ask" && !busy;
  const nextCard = S.split ? S.cards.findIndex((c: any) => c.state === "open") : -1;
  const splitOn = !busy && S.mode === "split" && !S.split && (free || (asking && (kind === "split" || (kind === "rows" && armed))));
  const buildOn = !busy && S.mode === "split" && S.split && nextCard >= 0 && (free || (asking && kind === "product") || (stage === "demo" && kind === "demo"));
  const zeroCard = S.cards.findIndex((c: any) => c.d === 0 && c.p > 0 && c.state === "open");
  const skipOn = asking && kind === "rows" && armed && S.split && zeroCard >= 0;
  const nc = nextCard >= 0 ? S.cards[nextCard] : null;
  const chipOn = buildOn && nc && nc.d > 0 && nc.p > nc.used;
  const cardOn = (buildOn && nc && !chipOn) ? nextCard : skipOn ? zeroCard : -1;
  const swapOn = !busy && (free || (asking && kind === "swap" && !S.swapped));
  const mzeroOn = !busy && S.mode === "round" && S.rows.length > 0 && S.zerosMoved < S.rows[0].p && !S.roundDone && (free || (asking && kind === "swap"));
  const addOn = free && !busy && S.mode === "split" && allDone(S) && !S.prod.some(Boolean);

  const inCell = (p: any, top: number, j: number) => p.x >= colX(j) - 8 && p.x <= colX(j) + CW + 8 && p.y >= top - 24 && p.y <= top + G.rowH + 24;
  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (pay.src === "zero") {
      if (!chipOn || pay.r !== nextCard) return;
      if (!moved) moveZero(pay.r, pay.j);
      else if (inCell(p, rowTop(pay.r), pay.j)) moveZero(pay.r, pay.j, p);   /* anywhere else: it goes back */
    } else if (pay.src === "mzero") {
      if (!mzeroOn) return;
      if (!moved) moveMZero(pay.j);
      else if (inCell(p, rowTop(0), pay.j)) moveMZero(pay.j, p);
    }
  });

  /* Enter: a rows prediction arms the move (the reference's predict-then-drop); everything else is typed and judged */
  const demoAct = () => { if (stage === "demo" && chipOn) moveZero(nextCard, nc.used); };
  const enterFn: any = stage === "demo" ? (chipOn ? () => demoAct() : null) : stage === "ask" && !busy && kind === "rows" ? (v: any) => {
    const val = leadNumber(v);
    if (val === null || v === "") return;
    api.setTyped(String(val));
    if (revealedRef.current) { api.submit(val); return; }
    if (armedRef.current) return;
    predRef.current = val; armedRef.current = true; setArmed(true); api.lock(true);
  } : null;
  api.onEnter(enterFn);
  HOOK.enter = (v: any) => { api.setTyped(String(v)); if (enterFn) enterFn(v); else api.submit(v); };
  HOOK.check = () => (stage === "demo" ? (demoAct(), true) : armedRef.current && !revealedRef.current ? (act(), true) : undefined);
  HOOK.demo = demoAct;

  /* ── the win: the maths finishes itself (rows built, rule closed, rows added) ── */
  useEffect(() => {
    if (stage !== "win") return;
    const P = plan();
    if (kind === "split" || (kind === "rows" && n === 1)) {
      doSplit(P, 0.6);
      for (let r = P.sim.cards.length - 1; r >= 0; r--) if (!P.sim.cards[r].read) doRead(P, r, 0.6);
      P.step(300, (s) => { s.hiMult = true; });
    } else if (kind === "product") {
      doAllRows(P, 0.5); doRule(P, 0.6); doAdd(P, 0.6);
    } else if (kind === "swap") {
      if (!P.sim.swapped) doSwap(P, 0.6);
      doZeros(P, 0.6); doRoundFact(P, 0.6);
    } else P.step(300);
    tl.run(P.steps);
  }, [stage]);

  /* ── the traceback: the mathematics redrawn in steps, ending on the whole right answer;
        nothing marked, the child's answer stays in the slot ── */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    armedRef.current = false; setArmed(false);
    const P = plan();
    if (kind === "split") {
      doSplit(P);
      P.step(260, (s) => { s.cards.forEach((c: any) => { c.read = false; }); s.hiMult = true; });
      for (let r = P.sim.cards.length - 1; r >= 0; r--) doRead(P, r, 1.2);
      P.step(300, (s) => { s.hiMult = true; });
    } else if (kind === "rows" && n === 1) {
      if (!P.sim.split) doSplit(P, 1.4);
      else P.sim.cards.forEach((c: any, r: number) => P.step(560, (s) => { s.hiCard = r; s.lit = [c.p]; }, true));
      P.step(200, (s) => { s.hiCard = -1; s.lit = []; });
      for (let r = P.sim.cards.length - 1; r >= 0; r--) if (!P.sim.cards[r].read) doRead(P, r);
    } else if (kind === "rows") {
      const z = P.sim.cards.findIndex((c: any) => c.d === 0 && c.p > 0);
      if (z >= 0 && P.sim.cards[z].state !== "skipped") doSkip(P, z, 1.3);
      P.sim.cards.forEach((c: any, r: number) => P.step(620, (s) => { s.hiCard = r; s.lit = [c.p]; }, c.state !== "skipped"));
      P.step(300, (s) => { s.hiCard = -1; s.lit = []; });
    } else if (kind === "product") {
      P.step(240, (s) => { s.prod = empty7(); s.carry = empty7(); s.rule2 = false; s.fact = null; });
      const top = Math.max(...P.sim.cards.map((c: any) => c.p));
      if (n === 2) for (let k = 0; k <= top; k++) P.step(360, (s) => { s.lit = upTo(k + 1); });
      P.step(200, (s) => { s.lit = []; });
      P.sim.cards.forEach((c: any, r: number) => {
        if (c.d === 0 && c.p > 0) { if (c.state !== "skipped") doSkip(P, r); else P.step(600, (s) => { s.hiCard = r; s.lit = [c.p]; }); }
        else if (c.p === 0) { if (c.state !== "built") doBuild(P, r); }
        else doBuild(P, r, 1, true, true);     /* the shifted rows are always built again from their right hand end */
      });
      P.step(200, (s) => { s.hiCard = -1; s.lit = []; });
      doRule(P); doAdd(P, 0.8);
    } else if (kind === "swap") {
      if (!P.sim.swapped) doSwap(P);
      P.step(320, (s) => { if (s.rows[0]) s.rows[0].cells = empty7(); s.zerosMoved = 0; s.roundDone = false; s.fact = null; });
      doZeros(P, 1.1, true);
      doRoundFact(P);
    }
    tl.run(P.steps, () => { revealedRef.current = true; api.lock(false); });
  }, [wrong]);

  /* ── what the host and the agent read back (toolApi.getState) ── */
  const a = topOf(S), b = botOf(S);
  const openRows = S.mode === "split" ? S.rows.filter((r: any) => !r.closed).length : S.mode === "round" ? 1 : 0;
  const prodDigits = S.mode === "round" ? (S.roundDone && S.rows[0] ? S.rows[0].cells : null) : S.prod.some(Boolean) ? S.prod : null;
  const product = prodDigits ? Number(prodDigits.map((c: any) => (c ? (typeof c === "string" ? c : c.ch) : "")).reverse().join("")) : null;
  api.share({
    phase: n, multiplicand: a, multiplier: b,
    placeCards: S.cards.map((c: any) => ({ place: PLACE[c.p], digit: c.d, read: c.read, state: c.state })),
    rows: openRows, greyed: S.cards.filter((c: any) => c.state === "skipped").length, swapped: S.swapped, product,
  });

  /* ── drawing ── */
  const lenA = a === null || a === undefined ? 0 : String(a).length, lenB = String(b).length;
  const xcol = Math.min(NC - 1, Math.max(lenA, lenB));
  const nRows = S.mode === "split" ? S.rows.length : 0;
  const prodTop = rowTop(nRows) + 8;
  const showProd = S.mode === "split" && nRows > 0 && (S.rule2 || S.prod.some(Boolean));
  const chartBottom = S.mode === "round" ? rowTop(0) + G.rowH : showProd ? prodTop + G.rowH : nRows ? rowTop(nRows - 1) + G.rowH : G.bTop + G.rowH;
  const factY = chartBottom + 50;
  const dragging = drag.drag && drag.drag.moved ? drag.drag.payload : null;
  const cellInk = (c: any) => (c.kind === "hold" ? ZERO : c.kind === "prod" ? inkGreen : inkRose);

  /* the counts: cards down and rows open; on a round multiplier, the zeros that followed and the rows */
  const counts = S.mode === "split"
    ? [[S.cards.length, "card", "cards"], [openRows, "row", "rows"]]
    : S.mode === "round" ? [[S.zerosMoved, "zero", "zeros"], [1, "row", "rows"]]
      : [[0, "zero", "zeros"], [digitsOf(b).filter((d) => d).length, "row", "rows"]];

  const commas = (cells: any[], top: number, inkOf: (c: any) => string) => (
    <g>
      {cells[3] && <text x={colX(2)} y={top + BASE} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={inkOf(cells[3])}>,</text>}
      {cells[5] && <text x={colX(4)} y={top + BASE} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={inkOf(cells[5])}>,</text>}
    </g>
  );
  const cellText = (c: any, k: number, top: number) => (
    <text key={k} className={c.fx !== undefined ? "ppw-walk" : "ppw-drop"}
      style={c.fx !== undefined ? ({ ["--dx" as any]: c.fx + "px", ["--dy" as any]: c.fy + "px" } as any) : undefined}
      x={colC(k)} y={top + BASE} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={cellInk(c)}>{c.ch}</text>
  );

  const numView = (e: any) => {
    if (e.v === null || e.v === undefined) return null;
    const onTop = S.nums[S.top].id === e.id, ds = digitsOf(e.v), ink = onTop ? inkBlue : inkAmber;
    const dx = S.liftId === e.id ? -130 : 0, dy = onTop ? 0 : G.bTop - G.aTop;
    return (
      <g key={"num" + e.id} className="ppw-slide" style={{ transform: `translate(${dx}px, ${dy}px)` } as any}>
        {ds.map((d, k) => <text key={k} x={colC(k)} y={G.aTop + BASE} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={d === 0 ? ZERO : ink}>{d}</text>)}
        {ds.length >= 4 && <text x={colX(2)} y={G.aTop + BASE} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={ink}>,</text>}
        {ds.length >= 6 && <text x={colX(4)} y={G.aTop + BASE} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={ink}>,</text>}
      </g>
    );
  };

  const cardView = (c: any, r: number) => {
    const y = rowTop(r) + 4, hi = S.hiCard === r, skipped = c.state === "skipped";
    const chips = S.style === "chips" && c.d > 0 && c.p > 0 && c.used < c.p;   /* once its zeros are down, the card reads whole again */
    const fly = c.fly ? ({ ["--dx" as any]: (colC(c.p) - (CARD.x + 60)) + "px", ["--dy" as any]: (G.bTop - y) + "px" } as any) : undefined;
    return (
      <g key={"card" + r} className={c.fly ? "ppw-fly" : undefined} style={fly}>
        {c.read && <text x={LABEL_X} y={y + 35} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(PLACE[c.p])}</text>}
        <rect x={CARD.x} y={y} width={CARD.w} height={CARD.h} rx={12}
          fill={skipped ? tint(C.panel, 0.5) : hi ? tint(AMBER, 0.78) : "#FFFFFF"} stroke={skipped ? ZERO : hi ? C.accent : AMBER}
          strokeWidth={hi ? 4 : 3} strokeDasharray={skipped ? "8 6" : undefined} />
        {!c.read ? (
          <text x={CARD.x + 14} y={y + 36} fontSize={T.label} fontWeight={700} fill={inkAmber}>{c.d + " " + tx(PLACE[c.p])}</text>
        ) : chips ? (
          <g>
            <text x={CARD.x + 14} y={y + 40} fontSize={T.speech} fontWeight={700} fill={inkAmber}>{"× " + c.d}</text>
            {upTo(c.p).map((jl) => {
              const j = c.p - 1 - jl, used = j < c.used, x0 = chipX(jl);
              const live = chipOn && r === nextCard && j === c.used;
              const held = dragging && dragging.src === "zero" && dragging.r === r && dragging.j === j;
              return (
                <g key={jl}>
                  {!used && <rect x={x0} y={y + 3} width={38} height={44} rx={9} fill="#FFFFFF" stroke={live ? C.accent : ZERO} strokeWidth={live ? 3 : 2} strokeDasharray={held ? "5 4" : undefined} />}
                  {!held && <text x={x0 + 19} y={y + 40} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={ZERO}>0</text>}
                </g>
              );
            })}
          </g>
        ) : (
          <text x={CARD.x + 14} y={y + 40} fontSize={T.speech} fontWeight={700} fill={skipped ? ZERO : inkAmber}>
            {"× " + c.d}{c.d > 0 && c.p > 0 ? <tspan fill={ZERO}>{"0".repeat(c.p)}</tspan> : null}
          </text>
        )}
      </g>
    );
  };

  const rowView = (row: any, r: number) => {
    const top = rowTop(r);
    if (row.closed) return (
      <g key={"row" + r}>
        <line x1={LEFT + 10} y1={top + 29} x2={RIGHT - 10} y2={top + 29} stroke={ZERO} strokeWidth={3} strokeLinecap="round" />
        <rect x={(LEFT + RIGHT) / 2 - 76} y={top + 10} width={152} height={38} rx={10} fill="#FFFFFF" />
        <text x={(LEFT + RIGHT) / 2} y={top + 39} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={ZERO}>{tx("skipped")}</text>
      </g>
    );
    return (
      <g key={"row" + r}>
        <rect x={LEFT + 4} y={top} width={RIGHT - LEFT - 8} height={G.rowH} rx={12} fill={tint(ROSE, 0.86)} stroke={tint(ROSE, 0.35)} strokeWidth={2} />
        {row.cells.map((c: any, k: number) => c && cellText(c, k, top))}
        {commas(row.cells, top, cellInk)}
      </g>
    );
  };

  /* the one thing to touch: the invite's pulse drawn as a rounded box around that thing only (the
     runtime's round Invite, stretched to a row, would also ring the multiplicand above it) */
  const invite =
    splitOn ? { x: colX(lenB - 1) - 6, y: G.bTop - 1, w: RIGHT - 4 - (colX(lenB - 1) - 6), h: G.rowH + 2 }
      : chipOn ? { x: chipX(nc.p - 1 - nc.used) - 6, y: rowTop(nextCard) + 1, w: 50, h: G.rowH - 2 }
        : cardOn >= 0 ? { x: CARD.x - 6, y: rowTop(cardOn) - 1, w: CARD.w + 12, h: G.rowH + 2 }
          : swapOn && !free ? { x: SWAPKEY.x - 8, y: SWAPKEY.y - 8, w: SWAPKEY.w + 16, h: SWAPKEY.h + 21 }
            : mzeroOn ? { x: colC(S.zerosMoved) - 30, y: G.bTop, w: 60, h: G.rowH }
              : null;

  return (
    <g>
      <style>{PPW_CSS}</style>

      {/* running count, in the runs zone (64,108): cards down and rows open */}
      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        {counts.map(([num, one, many]: any, i: number) => (
          <g key={i}>
            <text x={22 + i * 156} y={-40} fontSize={T.speech} fontWeight={700} fill={C.ink}>{num}</text>
            <text x={22 + i * 156 + 32 + (String(num).length - 1) * 26} y={-40} fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(num === 1 ? one : many)}</text>
          </g>
        ))}
      </g>

      {/* headings */}
      {HEADS.map((h, k) => {
        const lit = S.lit.includes(k);
        return (
          <g key={"h" + k}>
            <rect x={colX(k) + 3} y={0} width={CW - 6} height={G.headH} rx={10} fill={lit ? tint(C.accent, 0.62) : tint(C.panel, 0.35)} stroke={lit ? C.accent : C.rule} strokeWidth={lit ? 3 : 1.5} />
            <text x={colC(k)} y={30} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(h)}</text>
          </g>
        );
      })}
      {/* faint column lines */}
      {upTo(NC + 1).map((k) => <line key={"v" + k} x1={RIGHT - k * CW} y1={44} x2={RIGHT - k * CW} y2={chartBottom + 4} stroke={tint(C.rule, 0.35)} strokeWidth={1.5} />)}

      {/* the multiplier lit as the total of its cards */}
      {S.mode === "split" && (S.split || S.hiMult) && (
        <rect x={colX(lenB - 1) - 6} y={G.bTop + 2} width={RIGHT - colX(lenB - 1) + 2} height={G.rowH - 4} rx={12}
          fill={tint(AMBER, 0.84)} stroke={S.hiMult ? C.accent : "none"} strokeWidth={3} />
      )}
      {/* the round multiplier's next zero, ready to go down */}
      {mzeroOn && !(dragging && dragging.src === "mzero") && (
        <rect x={colC(S.zerosMoved) - 24} y={G.bTop + 4} width={48} height={50} rx={10} fill="#FFFFFF" stroke={C.accent} strokeWidth={3} />
      )}
      {S.nums.map((e: any) => numView(e))}
      {/* the times sign, drawn */}
      <path d={`M ${colC(xcol) - 13} ${G.bTop + 16} L ${colC(xcol) + 13} ${G.bTop + 42} M ${colC(xcol) + 13} ${G.bTop + 16} L ${colC(xcol) - 13} ${G.bTop + 42}`}
        stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
      <line x1={LEFT + 4} y1={G.rule1} x2={RIGHT - 4} y2={G.rule1} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />

      {/* carries, small, over the column they are added into */}
      {S.carry.map((c: any, k: number) => c && (
        <text key={"c" + k} className="ppw-drop" x={colC(k)} y={G.carry} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={inkVerm}>{c}</text>
      ))}

      {/* split: the rows, one per card, and the cards in the margin */}
      {S.mode === "split" && S.rows.map((row: any, r: number) => rowView(row, r))}
      {S.mode === "split" && S.cards.map((c: any, r: number) => cardView(c, r))}

      {/* the column being added */}
      {S.hiCol >= 0 && <rect x={colX(S.hiCol) + 4} y={rowTop(0) - 4} width={CW - 8} height={prodTop + G.rowH + 4 - (rowTop(0) - 4)} rx={12} fill="none" stroke={C.accent} strokeWidth={3} />}

      {/* the rule under the rows, and the product */}
      {showProd && (
        <g>
          <line className="ppw-rule" x1={RIGHT - 4} y1={rowTop(nRows) + 2} x2={LEFT + 4} y2={rowTop(nRows) + 2} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
          <rect x={LEFT + 4} y={prodTop} width={RIGHT - LEFT - 8} height={G.rowH} rx={12} fill={tint(GREEN, 0.86)} stroke={tint(GREEN, 0.4)} strokeWidth={2} />
          {S.prod.map((d: any, k: number) => d && cellText({ ch: d, kind: "prod" }, k, prodTop))}
          {commas(S.prod.map((d: any) => (d ? { ch: d, kind: "prod" } : null)), prodTop, cellInk)}
        </g>
      )}

      {/* round: one row, straight under the rule, and it is the product */}
      {S.mode === "round" && S.rows[0] && (
        <g>
          <rect x={LEFT + 4} y={rowTop(0)} width={RIGHT - LEFT - 8} height={G.rowH} rx={12} fill={tint(GREEN, 0.86)} stroke={tint(GREEN, 0.4)} strokeWidth={2} />
          {S.rows[0].cells.map((c: any, k: number) => c && cellText(c, k, rowTop(0)))}
          {commas(S.rows[0].cells, rowTop(0), cellInk)}
        </g>
      )}

      {/* the short fact being worked */}
      {S.fact && (
        <g>
          <text x={(LEFT + RIGHT) / 2 - 6} y={factY} textAnchor="end" fontSize={T.speech} fontWeight={700}>
            <tspan fill={inkBlue}>{indian(S.fact.a)}</tspan><tspan fill={inkAmber}>{" × " + S.fact.d}</tspan>
          </text>
          {S.fact.f !== null && (
            <text className="ppw-drop" x={(LEFT + RIGHT) / 2 + 10} y={factY} fontSize={T.speech} fontWeight={700} fill={S.fact.green ? inkGreen : inkRose}>{"= " + indian(S.fact.f)}</text>
          )}
        </g>
      )}

      {/* controls on the object */}
      {splitOn && <Hit id="split" label="Split the multiplier by place" x={colX(lenB - 1) - 64} y={G.bTop - 7} w={RIGHT - colX(lenB - 1) + 64} h={72} onPress={tapSplit} />}
      {cardOn >= 0 && (
        <Hit id={"card-" + cardOn} label={S.cards[cardOn].d === 0 ? "Grey the zero card and close its row" : "Work the " + PLACE[S.cards[cardOn].p] + " row"}
          x={CARD.x} y={rowTop(cardOn) - 7} w={CARD.w} h={72} onPress={() => tapCard(cardOn)} />
      )}
      {chipOn && (() => {
        const pay = { src: "zero", r: nextCard, j: nc.used };
        const cx = chipX(nc.p - 1 - nc.used) + 19, cy = rowTop(nextCard) + 29;
        return (
          <g className="ppw-grab c4-piece" {...control("zero-chip", "Slide a holding zero into the " + PLACE[nc.p] + " row")} {...drag.bind(pay)} {...drag.keys(pay)}>
            <rect x={cx - 36} y={cy - 36} width={72} height={72} fill="transparent" />
          </g>
        );
      })()}
      {mzeroOn && (() => {
        const pay = { src: "mzero", j: S.zerosMoved };
        const cx = colC(S.zerosMoved), cy = G.bTop + 29;
        return (
          <g className="ppw-grab c4-piece" {...control("mult-zero", "Bring a zero of the multiplier down into the row")} {...drag.bind(pay)} {...drag.keys(pay)}>
            <rect x={cx - 36} y={cy - 36} width={72} height={72} fill="transparent" />
          </g>
        );
      })()}
      {(kind === "swap" || free) && (
        <Key id="swap" label={tx("Swap the two numbers")} x={SWAPKEY.x} y={SWAPKEY.y} w={SWAPKEY.w} h={SWAPKEY.h} C={C} primary={swapOn} disabled={!swapOn} onClick={() => swapOn && tapSwap()}>
          <g fill="none" stroke={swapOn ? "#FFFFFF" : mix(C.ink, C.panel, 0.5)} strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M -60 -20 L -60 22 M -70 10 L -60 22 L -50 10" />
            <path d="M -36 22 L -36 -20 M -46 -8 L -36 -20 L -26 -8" />
          </g>
          <text x={24} y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={swapOn ? "#FFFFFF" : mix(C.ink, C.panel, 0.5)}>{tx("Swap")}</text>
        </Key>
      )}
      {free && (
        <g>
          <Key id="free-new" label={tx("A new sum")} x={0} y={440} w={190} h={72} C={C} disabled={busy} onClick={() => !busy && freeNew()}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={busy ? mix(C.ink, C.panel, 0.5) : C.ink}>{tx("New sum")}</text>
          </Key>
          <Key id="free-add" label={tx("Add the rows")} x={206} y={440} w={190} h={72} C={C} primary={addOn} disabled={!addOn} onClick={() => addOn && freeAdd()}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={addOn ? "#FFFFFF" : mix(C.ink, C.panel, 0.5)}>{tx("Add rows")}</text>
          </Key>
        </g>
      )}

      {/* the zero under the finger */}
      {dragging && drag.drag && (
        <g pointerEvents="none" transform={`translate(${drag.drag.x},${drag.drag.y})`}>
          <rect x={-19} y={-24} width={38} height={46} rx={9} fill="#FFFFFF" stroke={C.accent} strokeWidth={3} filter="url(#fLift)" />
          <text x={0} y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ZERO}>0</text>
        </g>
      )}

      {invite && (stage === "ask" || stage === "demo" || free) && (
        <rect className="c4-pulse" x={invite.x} y={invite.y} width={invite.w} height={invite.h} rx={16} fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" />
      )}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ result, C, w, h }: any) {
  const L = (result && result.last) || {};
  const v = typeof L.answer === "number" ? L.answer : leadNumber(L.value);
  if (v === null || v === undefined) return null;
  const txt = L.kind === "split" ? "× " + v : L.kind === "rows" ? v + (v === 1 ? " row" : " rows") : indian(v);
  const fill = L.kind === "split" ? inkAmber : L.kind === "rows" ? C.ink : inkGreen;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <text x={w - 16} y={h / 2 + 12} textAnchor="end" fontSize={T.label} fontWeight={700} fill={fill}>{HOOK.tx ? HOOK.tx(txt) : txt}</text>
    </g>
  );
}

function PartialProductWorkshop(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null }} />
  );
}

export default PartialProductWorkshop;
