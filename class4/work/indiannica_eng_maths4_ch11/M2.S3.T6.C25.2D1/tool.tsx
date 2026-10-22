/* ═══ M2.S3.T6.C25.2D1 · weight_columns · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, the sound effects, the printed bubble, scoring, the
   events, idle and restart. THE LESSON IS SILENT (runtime r30): nothing is spoken; every line is
   printed on the bubble, which is the guide. The lesson is action-driven: nothing moves on unless the
   child acts. THE NEW LOOK (keyOnly, navDots, bigPad, nextKey; docs/LAYOUT.md §1d-§1e, docs/PATTERNS.md
   §15-§16): no question bar, the question lives only in the bubble (each item's `say`, one sentence),
   every act is performed on screen (api.act). NO imports in this file; only the five host hooks.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "weight_columns";
const MEDIA_ID = "M2.S3.T6.C25.2D1";
const TOOL_NAME = "Weight Columns";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["Bags with weight tags and a frame. How many boxes do the grams take?"];
/* the whole-tool line (not shown from r44; kept for the sidecar) */
const FINISH_LINE = "Every gram in its three places, every thousand carried or broken, and every question answered in full.";
/* printed when the child opens Free play: what the free branch below really offers (the frame, the carry, the
   break and the balance) */
const FREE_LINE = "Free play: tap two bags, then add or take away, and watch the balance.";

/* THE START PAGE (docs/LAYOUT.md §1c): the hook asks about the grams boxes, so the art never draws the frame (that
   would answer it): a balance with two tagged bags. */
const START_HOOK = "How many boxes do the grams take?";
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  const B = { px: box.w / 2, py: 46, L: 230, S: 156, PW: 260, base: 316 };
  const bags = [{ kg: 5, g: 250 }, { kg: 4, g: 800 }];
  return (
    <g>
      {wcBalance(B, -7, (side: number) => wcBag(-100, B.S - 142, 200, 140, wcTagLines(bags[side], tx), C, T.label), C, () => null, 0)}
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): filled at the language pass, once the English is final. */
const TR: any = {
  hi: {
    "Weight Columns": "वज़न के स्तंभ",
    "Bags with weight tags and a frame. How many boxes do the grams take?": "वज़न की पर्ची वाले थैले और एक फ्रेम। ग्राम कितने खाने लेते हैं?",
    "Every gram in its three places, every thousand carried or broken, and every question answered in full.": "हर ग्राम अपने तीन स्थानों में, हर हज़ार हासिल या तोड़ा गया, और हर सवाल का पूरा उत्तर।",
    "Free play: tap two bags, then add or take away, and watch the balance.": "मुक्त खेल: दो थैले दबाओ, फिर जोड़ो या घटाओ, और तराजू देखो।",
    "How many boxes do the grams take?": "ग्राम कितने खाने लेते हैं?",
    /* phase 1 */
    "Three places for grams": "ग्राम के लिए तीन स्थान",
    "The grams column has three boxes. How is a two-digit number of grams written?": "ग्राम के स्तंभ में तीन खाने हैं। दो अंकों वाले ग्राम कैसे लिखे जाते हैं?",
    "Tap the bag of 2,305 g to write its weight in the frame.": "2,305 ग्रा का थैला दबाओ और उसका वज़न फ्रेम में लिखो।",
    "The bag with the tag waits at the right of the frame.": "पर्ची वाला थैला फ्रेम के दाईं ओर रखा है।",
    "Tap Count to count the grams in the three boxes.": "‘गिनो’ दबाओ और तीनों खानों के ग्राम गिनो।",
    "The Count key is at the bottom right of the board.": "‘गिनो’ बटन बोर्ड पर नीचे दाईं ओर है।",
    "Which places does this number of grams fill?": "ग्राम की यह संख्या कौन-से स्थान भरती है?",
    "Put a 0 in each empty box in front, so the number ends in the ones box.": "आगे के हर खाली खाने में 0 लिखो, ताकि संख्या इकाई के खाने पर ख़त्म हो।",
    "Beside kilograms the grams take three places, with zeros in the empty ones.": "किलोग्राम के साथ ग्राम तीन स्थान लेते हैं, खाली स्थानों में शून्य।",
    "You learned: beside kilograms, grams always take three places.": "तुमने सीखा: किलोग्राम के साथ ग्राम हमेशा तीन स्थान लेते हैं।",
    "Tap both bags, then add 26 kg 48 g and 13 kg 705 g in columns.": "दोनों थैले दबाओ, फिर स्तंभों में 26 किग्रा 48 ग्रा और 13 किग्रा 705 ग्रा जोड़ो।",
    "Add 26 kg 48 g and 13 kg 705 g": "दोनों थैलों का वज़न जोड़ो",
    "How many grams boxes are there?": "ग्राम के कितने खाने हैं?",
    "Yes, 39 kg 753 g, with 48 g written as 048.": "हाँ, 39 किग्रा 753 ग्रा, और 48 ग्रा को 048 लिखा।",
    "How is 7 g written in the grams column beside kilograms?": "किलोग्राम के साथ ग्राम के स्तंभ में 7 ग्रा कैसे लिखते हैं?",
    "7 g in the grams boxes": "ग्राम के खानों में 7 ग्रा",
    "Which box does the 7 stand in?": "7 किस खाने में आता है?",
    "Right, 007: two zeros hold the hundreds and the tens.": "सही, 007: दो शून्य सैकड़ा और दहाई का स्थान भरते हैं।",
    "12 kg 90 g is written in columns, so what goes in the grams column?": "12 किग्रा 90 ग्रा स्तंभों में लिखा है, तो ग्राम के स्तंभ में क्या आएगा?",
    "Grams boxes for 12 kg 90 g": "ग्राम के खाने: 90 ग्रा",
    "Do your three boxes read 90 grams?": "क्या तुम्हारे तीनों खाने 90 ग्राम पढ़ते हैं?",
    "Good, 090: the 9 sits in the tens box, with a zero in front.": "बढ़िया, 090: 9 दहाई के खाने में है, आगे एक शून्य।",
    /* phase 2 */
    "Carrying a kilogram": "एक किलोग्राम हासिल",
    "The grams make more than a thousand. What is written, and what is carried?": "ग्राम एक हज़ार से ज़्यादा हो जाते हैं। क्या लिखा जाता है, और हासिल क्या जाता है?",
    "Tap Add to add the grams, 600 g and 700 g.": "‘जोड़ो’ दबाओ और ग्राम जोड़ो, 600 ग्रा और 700 ग्रा।",
    "The Add key is at the bottom right of the board.": "‘जोड़ो’ बटन बोर्ड पर नीचे दाईं ओर है।",
    "Tap Carry to make 1,000 of those grams into one kilogram.": "‘हासिल’ दबाओ, उनमें से 1,000 ग्राम एक किलोग्राम बनेंगे।",
    "Now the Carry key is in the same place.": "अब ‘हासिल’ बटन उसी जगह है।",
    "Is that a thousand or more?": "क्या यह एक हज़ार या उससे ज़्यादा है?",
    "Take 1,000 out of the grams sum and carry it as one kilogram.": "ग्राम के जोड़ में से 1,000 निकालो और उसे एक किलोग्राम हासिल लो।",
    "Add the grams first, and every full 1,000 g becomes one more kilogram.": "पहले ग्राम जोड़ो, हर पूरे 1,000 ग्रा से एक किलोग्राम और बनता है।",
    "You learned: each full thousand grams is carried as one kilogram.": "तुमने सीखा: हर पूरे हज़ार ग्राम का एक किलोग्राम हासिल जाता है।",
    "Add 58 kg 675 g and 34 kg 812 g.": "58 किग्रा 675 ग्रा और 34 किग्रा 812 ग्रा जोड़ो।",
    "58 kg 675 g + 34 kg 812 g": "दोनों वज़न जोड़ो",
    "What do the grams add up to?": "ग्राम मिलकर कितने होते हैं?",
    "Yes, 1,487 g is 1 kg 487 g, so 93 kg 487 g.": "हाँ, 1,487 ग्रा यानी 1 किग्रा 487 ग्रा, तो 93 किग्रा 487 ग्रा।",
    "What do 34 kg 760 g and 27 kg 385 g make together?": "34 किग्रा 760 ग्रा और 27 किग्रा 385 ग्रा मिलकर कितने होते हैं?",
    "34 kg 760 g + 27 kg 385 g": "दोनों का कुल वज़न?",
    "Did the carried kilogram join the kilograms?": "क्या हासिल वाला किलोग्राम किलोग्रामों में जुड़ा?",
    "Right, 62 kg 145 g, with one kilogram carried.": "सही, 62 किग्रा 145 ग्रा, एक किलोग्राम हासिल के साथ।",
    "A shop sold 15 kg 640 g, 22 kg 75 g and 9 kg 480 g: find the total weight.": "15 किग्रा 640 ग्रा, 22 किग्रा 75 ग्रा, 9 किग्रा 480 ग्रा बिका: कुल वज़न?",
    "Total weight sold": "कुल कितना वज़न बिका?",
    "The three grams together make how many whole thousands?": "तीनों ग्राम मिलकर कितने पूरे हज़ार बनाते हैं?",
    "Good, the shop sold 47 kg 195 g in all.": "बढ़िया, दुकान ने कुल 47 किग्रा 195 ग्रा बेचा।",
    /* phase 3 */
    "Borrowing from zero grams": "शून्य ग्राम से उधार",
    "No grams on top. Open one kilogram. How many grams does it give?": "ऊपर कोई ग्राम नहीं। एक किलोग्राम खोलो। उससे कितने ग्राम मिलते हैं?",
    "Tap Break to borrow one kilogram from the 5 kg on top.": "‘तोड़ो’ दबाओ और ऊपर के 5 किग्रा में से एक किलोग्राम उधार लो।",
    "The Break key is at the bottom right of the board.": "‘तोड़ो’ बटन बोर्ड पर नीचे दाईं ओर है।",
    "Tap Open to open that kilogram into ten 100 g bars.": "‘खोलो’ दबाओ और उस किलोग्राम को 100 ग्रा की दस छड़ों में खोलो।",
    "Now the Open key is in the same place.": "अब ‘खोलो’ बटन उसी जगह है।",
    "Where can grams come from when there are none?": "जब ग्राम हैं ही नहीं, तो ग्राम कहाँ से आएँगे?",
    "The kilograms on top get one less, and the grams on top get 1,000 more.": "ऊपर के किलोग्राम एक कम होते हैं, और ऊपर के ग्राम 1,000 ज़्यादा।",
    "When the grams on top are too few, break one kilogram into 1,000 g.": "जब ऊपर के ग्राम कम हों, तो एक किलोग्राम को 1,000 ग्रा में तोड़ो।",
    "You learned: when grams on top are too few, break one kilogram.": "तुमने सीखा: ऊपर के ग्राम कम हों, तो एक किलोग्राम तोड़ो।",
    "A crate holds 60 kg of mangoes and 18 kg 350 g are sold; how much is left?": "एक पेटी में 60 किग्रा आम हैं और 18 किग्रा 350 ग्रा बिक गए; कितने बचे?",
    "Left in the crate?": "पेटी में कितना बचा?",
    "How many grams are on top?": "ऊपर कितने ग्राम हैं?",
    "Yes, 41 kg 650 g of mangoes is left in the crate.": "हाँ, पेटी में 41 किग्रा 650 ग्रा आम बचे।",
    "Take 7 kg 425 g from 20 kg.": "20 किग्रा में से 7 किग्रा 425 ग्रा घटाओ।",
    "Take 7 kg 425 g from 20 kg": "कितना बचेगा?",
    "Can you take 425 g from 000 g?": "क्या 000 ग्रा में से 425 ग्रा घट सकते हैं?",
    "Right, 12 kg 575 g, once one kilogram was broken.": "सही, 12 किग्रा 575 ग्रा, एक किलोग्राम तोड़ने के बाद।",
    "From 81 kg 215 g, take away 36 kg 780 g.": "81 किग्रा 215 ग्रा में से 36 किग्रा 780 ग्रा निकालो।",
    "81 kg 215 g − 36 kg 780 g": "बाक़ी वज़न कितना?",
    "Are the 215 g on top enough to take 780 g away?": "क्या ऊपर के 215 ग्रा में से 780 ग्रा घट सकते हैं?",
    "After the break, how many kilograms are on top?": "तोड़ने के बाद ऊपर कितने किलोग्राम हैं?",
    "Break one of the 81 kg into 1,000 g and add it to the 215 g.": "81 किग्रा में से एक को 1,000 ग्रा में तोड़ो और 215 ग्रा में जोड़ो।",
    "Good, 44 kg 435 g, once the break made 1,215 g on top.": "बढ़िया, 44 किग्रा 435 ग्रा, तोड़ने से ऊपर 1,215 ग्रा बने।",
    /* phase 4 */
    "Heavier, and by how much": "कौन भारी, और कितना",
    "Which bag is heavier? Now how much heavier? Fill both blanks.": "कौन-सा थैला भारी है? अब, कितना भारी? दोनों खाली जगहें भरो।",
    "Tap Weigh to hang the rice and the sugar on the balance.": "‘तौलो’ दबाओ और चावल व चीनी को तराजू पर टाँगो।",
    "The Weigh key is at the bottom of the board.": "‘तौलो’ बटन बोर्ड पर नीचे है।",
    "Tap Level to put 200 g on the lighter bag's pan.": "‘बराबर करो’ दबाओ और हल्के थैले के पलड़े पर 200 ग्रा रखो।",
    "Now the Level key is in the same place.": "अब ‘बराबर करो’ बटन उसी जगह है।",
    "What does the question ask for, one thing or two?": "सवाल क्या पूछता है, एक बात या दो?",
    "Pick the heavier one, then subtract grams first, breaking a kilogram if needed.": "भारी वाला चुनो, फिर पहले ग्राम घटाओ, ज़रूरत हो तो एक किलोग्राम तोड़ो।",
    "Kilograms decide first; only a tie sends you on to the grams.": "पहले किलोग्राम तय करते हैं; बराबर हों तभी ग्राम देखो।",
    "You learned: compare kilograms first, and give both answers.": "तुमने सीखा: पहले किलोग्राम की तुलना करो, और दोनों उत्तर दो।",
    "Which suitcase is heavier, 17 kg 280 g or 21 kg 45 g, and by how much?": "कौन-सा सूटकेस भारी है, 17 किग्रा 280 ग्रा या 21 किग्रा 45 ग्रा, और कितना?",
    "Heavier, and by how much?": "कौन भारी, और कितना?",
    "Which way does the balance tip?": "तराजू किस ओर झुकता है?",
    "Yes, suitcase 2 is heavier, by 3 kg 765 g.": "हाँ, सूटकेस 2 भारी है, 3 किग्रा 765 ग्रा से।",
    "Potatoes 9 kg 150 g, onions 11 kg 40 g: name the heavier bag and how much more.": "आलू 9 किग्रा 150 ग्रा, प्याज़ 11 किग्रा 40 ग्रा: भारी थैला और अंतर बताओ।",
    "Which bag, how much more?": "कौन-सा थैला, कितना ज़्यादा?",
    "Which bag has more whole kilograms?": "किस थैले में ज़्यादा पूरे किलोग्राम हैं?",
    "Right, onions: 11 kg beats 9 kg, so they are 1 kg 890 g heavier.": "सही, प्याज़: 11 किग्रा 9 किग्रा से ज़्यादा, तो वे 1 किग्रा 890 ग्रा भारी हैं।",
    "Parcel A 12 kg 60 g, parcel B 12 kg 600 g: which is heavier, and by how much?": "पार्सल A 12 किग्रा 60 ग्रा, पार्सल B 12 किग्रा 600 ग्रा: कौन भारी, और कितना?",
    "Which parcel, how much more?": "कौन-सा पार्सल, कितना ज़्यादा?",
    "The kilograms are equal, so which grams are more?": "किलोग्राम बराबर हैं, तो किसके ग्राम ज़्यादा हैं?",
    "Good, parcel B: the kilograms tie, so the grams decide, by 540 g.": "बढ़िया, पार्सल B: किलोग्राम बराबर, तो ग्राम तय करते हैं, 540 ग्रा से।",
    /* what the working area, the slot and the summary draw */
    "kg": "किग्रा", "g": "ग्रा",
    "Count": "गिनो", "Add": "जोड़ो", "Carry": "हासिल", "Break": "तोड़ो", "Open": "खोलो", "Weigh": "तौलो", "Level": "बराबर करो", "Take away": "घटाओ",
    "heavier": "भारी", "by how much": "कितना ज़्यादा",
    "flour": "आटा", "rice": "चावल", "sugar": "चीनी",
    "suitcase 1": "सूटकेस 1", "suitcase 2": "सूटकेस 2", "potatoes": "आलू", "onions": "प्याज़", "parcel A": "पार्सल A", "parcel B": "पार्सल B",
  },
  gu: {
    "Weight Columns": "વજનના સ્તંભ",
    "Bags with weight tags and a frame. How many boxes do the grams take?": "વજનની ચિઠ્ઠીવાળી થેલીઓ અને એક ફ્રેમ. ગ્રામ કેટલાં ખાનાં લે છે?",
    "Every gram in its three places, every thousand carried or broken, and every question answered in full.": "દરેક ગ્રામ તેનાં ત્રણ સ્થાનમાં, દરેક હજાર વદી ગયો કે તોડાયો, અને દરેક પ્રશ્નનો પૂરો જવાબ.",
    "Free play: tap two bags, then add or take away, and watch the balance.": "મુક્ત રમત: બે થેલી દબાવો, પછી ઉમેરો કે બાદ કરો, અને ત્રાજવું જુઓ.",
    "How many boxes do the grams take?": "ગ્રામ કેટલાં ખાનાં લે છે?",
    /* phase 1 */
    "Three places for grams": "ગ્રામ માટે ત્રણ સ્થાન",
    "The grams column has three boxes. How is a two-digit number of grams written?": "ગ્રામના સ્તંભમાં ત્રણ ખાનાં છે. બે અંકના ગ્રામ કેવી રીતે લખાય?",
    "Tap the bag of 2,305 g to write its weight in the frame.": "2,305 ગ્રાની થેલી દબાવો અને તેનું વજન ફ્રેમમાં લખો.",
    "The bag with the tag waits at the right of the frame.": "ચિઠ્ઠીવાળી થેલી ફ્રેમની જમણી બાજુ છે.",
    "Tap Count to count the grams in the three boxes.": "‘ગણો’ દબાવો અને ત્રણે ખાનાંના ગ્રામ ગણો.",
    "The Count key is at the bottom right of the board.": "‘ગણો’ બટન બોર્ડ પર નીચે જમણી બાજુ છે.",
    "Which places does this number of grams fill?": "ગ્રામની આ સંખ્યા કયાં સ્થાન ભરે છે?",
    "Put a 0 in each empty box in front, so the number ends in the ones box.": "આગળના દરેક ખાલી ખાનામાં 0 લખો, જેથી સંખ્યા એકમના ખાનામાં પૂરી થાય.",
    "Beside kilograms the grams take three places, with zeros in the empty ones.": "કિલોગ્રામની સાથે ગ્રામ ત્રણ સ્થાન લે છે, ખાલી સ્થાનોમાં શૂન્ય.",
    "You learned: beside kilograms, grams always take three places.": "તમે શીખ્યા: કિલોગ્રામની સાથે ગ્રામ હંમેશાં ત્રણ સ્થાન લે છે.",
    "Tap both bags, then add 26 kg 48 g and 13 kg 705 g in columns.": "બંને થેલી દબાવો, પછી સ્તંભમાં 26 કિગ્રા 48 ગ્રા અને 13 કિગ્રા 705 ગ્રા ઉમેરો.",
    "Add 26 kg 48 g and 13 kg 705 g": "બંને થેલીનું વજન ઉમેરો",
    "How many grams boxes are there?": "ગ્રામનાં કેટલાં ખાનાં છે?",
    "Yes, 39 kg 753 g, with 48 g written as 048.": "હા, 39 કિગ્રા 753 ગ્રા, અને 48 ગ્રાને 048 લખ્યા.",
    "How is 7 g written in the grams column beside kilograms?": "કિલોગ્રામની સાથે ગ્રામના સ્તંભમાં 7 ગ્રા કેવી રીતે લખાય?",
    "7 g in the grams boxes": "ગ્રામનાં ખાનાંમાં 7 ગ્રા",
    "Which box does the 7 stand in?": "7 કયા ખાનામાં આવે?",
    "Right, 007: two zeros hold the hundreds and the tens.": "સાચું, 007: બે શૂન્ય શતક અને દશકનું સ્થાન ભરે છે.",
    "12 kg 90 g is written in columns, so what goes in the grams column?": "12 કિગ્રા 90 ગ્રા સ્તંભમાં લખ્યું છે, તો ગ્રામના સ્તંભમાં શું આવશે?",
    "Grams boxes for 12 kg 90 g": "ગ્રામનાં ખાનાં: 90 ગ્રા",
    "Do your three boxes read 90 grams?": "શું તમારાં ત્રણે ખાનાં 90 ગ્રામ વંચાય છે?",
    "Good, 090: the 9 sits in the tens box, with a zero in front.": "સરસ, 090: 9 દશકના ખાનામાં છે, આગળ એક શૂન્ય.",
    /* phase 2 */
    "Carrying a kilogram": "એક કિલોગ્રામની વદી",
    "The grams make more than a thousand. What is written, and what is carried?": "ગ્રામ એક હજારથી વધી જાય છે. શું લખાય, અને વદી શું જાય?",
    "Tap Add to add the grams, 600 g and 700 g.": "‘ઉમેરો’ દબાવો અને ગ્રામ ઉમેરો, 600 ગ્રા અને 700 ગ્રા.",
    "The Add key is at the bottom right of the board.": "‘ઉમેરો’ બટન બોર્ડ પર નીચે જમણી બાજુ છે.",
    "Tap Carry to make 1,000 of those grams into one kilogram.": "‘વદી’ દબાવો, તેમાંથી 1,000 ગ્રામનો એક કિલોગ્રામ બનશે.",
    "Now the Carry key is in the same place.": "હવે ‘વદી’ બટન એ જ જગ્યાએ છે.",
    "Is that a thousand or more?": "શું તે એક હજાર કે વધુ છે?",
    "Take 1,000 out of the grams sum and carry it as one kilogram.": "ગ્રામના સરવાળામાંથી 1,000 કાઢો અને તેને એક કિલોગ્રામ વદી લો.",
    "Add the grams first, and every full 1,000 g becomes one more kilogram.": "પહેલાં ગ્રામ ઉમેરો, દરેક પૂરા 1,000 ગ્રાથી એક કિલોગ્રામ વધે છે.",
    "You learned: each full thousand grams is carried as one kilogram.": "તમે શીખ્યા: દરેક પૂરા હજાર ગ્રામનો એક કિલોગ્રામ વદી જાય છે.",
    "Add 58 kg 675 g and 34 kg 812 g.": "58 કિગ્રા 675 ગ્રા અને 34 કિગ્રા 812 ગ્રા ઉમેરો.",
    "58 kg 675 g + 34 kg 812 g": "બંને વજન ઉમેરો",
    "What do the grams add up to?": "ગ્રામ મળીને કેટલા થાય?",
    "Yes, 1,487 g is 1 kg 487 g, so 93 kg 487 g.": "હા, 1,487 ગ્રા એટલે 1 કિગ્રા 487 ગ્રા, તો 93 કિગ્રા 487 ગ્રા.",
    "What do 34 kg 760 g and 27 kg 385 g make together?": "34 કિગ્રા 760 ગ્રા અને 27 કિગ્રા 385 ગ્રા મળીને કેટલા થાય?",
    "34 kg 760 g + 27 kg 385 g": "બંનેનું કુલ વજન?",
    "Did the carried kilogram join the kilograms?": "વદીનો કિલોગ્રામ કિલોગ્રામમાં ઉમેરાયો?",
    "Right, 62 kg 145 g, with one kilogram carried.": "સાચું, 62 કિગ્રા 145 ગ્રા, એક કિલોગ્રામની વદી સાથે.",
    "A shop sold 15 kg 640 g, 22 kg 75 g and 9 kg 480 g: find the total weight.": "15 કિગ્રા 640 ગ્રા, 22 કિગ્રા 75 ગ્રા, 9 કિગ્રા 480 ગ્રા વેચાયું: કુલ વજન?",
    "Total weight sold": "કુલ કેટલું વજન વેચાયું?",
    "The three grams together make how many whole thousands?": "ત્રણે ગ્રામ મળીને કેટલા પૂરા હજાર બને?",
    "Good, the shop sold 47 kg 195 g in all.": "સરસ, દુકાને કુલ 47 કિગ્રા 195 ગ્રા વેચ્યું.",
    /* phase 3 */
    "Borrowing from zero grams": "શૂન્ય ગ્રામમાંથી ઉછીનું",
    "No grams on top. Open one kilogram. How many grams does it give?": "ઉપર એક પણ ગ્રામ નથી. એક કિલોગ્રામ ખોલો. તેમાંથી કેટલા ગ્રામ મળે?",
    "Tap Break to borrow one kilogram from the 5 kg on top.": "‘તોડો’ દબાવો અને ઉપરના 5 કિગ્રામાંથી એક કિલોગ્રામ ઉછીનો લો.",
    "The Break key is at the bottom right of the board.": "‘તોડો’ બટન બોર્ડ પર નીચે જમણી બાજુ છે.",
    "Tap Open to open that kilogram into ten 100 g bars.": "‘ખોલો’ દબાવો અને તે કિલોગ્રામને 100 ગ્રાના દસ સળિયામાં ખોલો.",
    "Now the Open key is in the same place.": "હવે ‘ખોલો’ બટન એ જ જગ્યાએ છે.",
    "Where can grams come from when there are none?": "ગ્રામ જ ન હોય, તો ગ્રામ ક્યાંથી આવે?",
    "The kilograms on top get one less, and the grams on top get 1,000 more.": "ઉપરના કિલોગ્રામ એક ઓછા થાય, અને ઉપરના ગ્રામ 1,000 વધે.",
    "When the grams on top are too few, break one kilogram into 1,000 g.": "ઉપરના ગ્રામ ઓછા હોય, ત્યારે એક કિલોગ્રામને 1,000 ગ્રામાં તોડો.",
    "You learned: when grams on top are too few, break one kilogram.": "તમે શીખ્યા: ઉપરના ગ્રામ ઓછા હોય, તો એક કિલોગ્રામ તોડો.",
    "A crate holds 60 kg of mangoes and 18 kg 350 g are sold; how much is left?": "એક પેટીમાં 60 કિગ્રા કેરી છે અને 18 કિગ્રા 350 ગ્રા વેચાઈ; કેટલી બાકી?",
    "Left in the crate?": "પેટીમાં કેટલું બચ્યું?",
    "How many grams are on top?": "ઉપર કેટલા ગ્રામ છે?",
    "Yes, 41 kg 650 g of mangoes is left in the crate.": "હા, પેટીમાં 41 કિગ્રા 650 ગ્રા કેરી બાકી રહી.",
    "Take 7 kg 425 g from 20 kg.": "20 કિગ્રામાંથી 7 કિગ્રા 425 ગ્રા બાદ કરો.",
    "Take 7 kg 425 g from 20 kg": "કેટલું બાકી રહેશે?",
    "Can you take 425 g from 000 g?": "શું 000 ગ્રામાંથી 425 ગ્રા બાદ થાય?",
    "Right, 12 kg 575 g, once one kilogram was broken.": "સાચું, 12 કિગ્રા 575 ગ્રા, એક કિલોગ્રામ તોડ્યા પછી.",
    "From 81 kg 215 g, take away 36 kg 780 g.": "81 કિગ્રા 215 ગ્રામાંથી 36 કિગ્રા 780 ગ્રા કાઢો.",
    "81 kg 215 g − 36 kg 780 g": "બાકી વજન કેટલું?",
    "Are the 215 g on top enough to take 780 g away?": "શું ઉપરના 215 ગ્રામાંથી 780 ગ્રા બાદ થાય?",
    "After the break, how many kilograms are on top?": "તોડ્યા પછી ઉપર કેટલા કિલોગ્રામ છે?",
    "Break one of the 81 kg into 1,000 g and add it to the 215 g.": "81 કિગ્રામાંથી એકને 1,000 ગ્રામાં તોડો અને 215 ગ્રામાં ઉમેરો.",
    "Good, 44 kg 435 g, once the break made 1,215 g on top.": "સરસ, 44 કિગ્રા 435 ગ્રા, તોડવાથી ઉપર 1,215 ગ્રા થયા.",
    /* phase 4 */
    "Heavier, and by how much": "કયું ભારે, અને કેટલું",
    "Which bag is heavier? Now how much heavier? Fill both blanks.": "કઈ થેલી ભારે છે? હવે, કેટલી ભારે? બંને ખાલી જગ્યા ભરો.",
    "Tap Weigh to hang the rice and the sugar on the balance.": "‘તોલો’ દબાવો અને ચોખા અને ખાંડને ત્રાજવા પર લટકાવો.",
    "The Weigh key is at the bottom of the board.": "‘તોલો’ બટન બોર્ડ પર નીચે છે.",
    "Tap Level to put 200 g on the lighter bag's pan.": "‘સરખું કરો’ દબાવો અને હલકી થેલીના પલ્લામાં 200 ગ્રા મૂકો.",
    "Now the Level key is in the same place.": "હવે ‘સરખું કરો’ બટન એ જ જગ્યાએ છે.",
    "What does the question ask for, one thing or two?": "પ્રશ્ન શું પૂછે છે, એક વાત કે બે?",
    "Pick the heavier one, then subtract grams first, breaking a kilogram if needed.": "ભારે વાળું પસંદ કરો, પછી પહેલાં ગ્રામ બાદ કરો, જરૂર હોય તો કિલોગ્રામ તોડો.",
    "Kilograms decide first; only a tie sends you on to the grams.": "પહેલાં કિલોગ્રામ નક્કી કરે; સરખા હોય ત્યારે જ ગ્રામ જુઓ.",
    "You learned: compare kilograms first, and give both answers.": "તમે શીખ્યા: પહેલાં કિલોગ્રામ સરખાવો, અને બંને જવાબ આપો.",
    "Which suitcase is heavier, 17 kg 280 g or 21 kg 45 g, and by how much?": "કઈ સૂટકેસ ભારે છે, 17 કિગ્રા 280 ગ્રા કે 21 કિગ્રા 45 ગ્રા, અને કેટલી?",
    "Heavier, and by how much?": "કયું ભારે, અને કેટલું?",
    "Which way does the balance tip?": "ત્રાજવું કઈ બાજુ નમે છે?",
    "Yes, suitcase 2 is heavier, by 3 kg 765 g.": "હા, સૂટકેસ 2 ભારે છે, 3 કિગ્રા 765 ગ્રાથી.",
    "Potatoes 9 kg 150 g, onions 11 kg 40 g: name the heavier bag and how much more.": "બટાકા 9 કિગ્રા 150 ગ્રા, ડુંગળી 11 કિગ્રા 40 ગ્રા: ભારે થેલી અને તફાવત કહો.",
    "Which bag, how much more?": "કઈ થેલી, કેટલું વધુ?",
    "Which bag has more whole kilograms?": "કઈ થેલીમાં વધુ પૂરા કિલોગ્રામ છે?",
    "Right, onions: 11 kg beats 9 kg, so they are 1 kg 890 g heavier.": "સાચું, ડુંગળી: 11 કિગ્રા 9 કિગ્રાથી વધુ, તો તે 1 કિગ્રા 890 ગ્રા ભારે છે.",
    "Parcel A 12 kg 60 g, parcel B 12 kg 600 g: which is heavier, and by how much?": "પાર્સલ A 12 કિગ્રા 60 ગ્રા, પાર્સલ B 12 કિગ્રા 600 ગ્રા: કયું ભારે, અને કેટલું?",
    "Which parcel, how much more?": "કયું પાર્સલ, કેટલું વધુ?",
    "The kilograms are equal, so which grams are more?": "કિલોગ્રામ સરખા છે, તો કોના ગ્રામ વધુ છે?",
    "Good, parcel B: the kilograms tie, so the grams decide, by 540 g.": "સરસ, પાર્સલ B: કિલોગ્રામ સરખા, તો ગ્રામ નક્કી કરે, 540 ગ્રાથી.",
    /* what the working area, the slot and the summary draw */
    "kg": "કિગ્રા", "g": "ગ્રા",
    "Count": "ગણો", "Add": "ઉમેરો", "Carry": "વદી", "Break": "તોડો", "Open": "ખોલો", "Weigh": "તોલો", "Level": "સરખું કરો", "Take away": "બાદ કરો",
    "heavier": "ભારે", "by how much": "કેટલું વધુ",
    "flour": "લોટ", "rice": "ચોખા", "sugar": "ખાંડ",
    "suitcase 1": "સૂટકેસ 1", "suitcase 2": "સૂટકેસ 2", "potatoes": "બટાકા", "onions": "ડુંગળી", "parcel A": "પાર્સલ A", "parcel B": "પાર્સલ B",
  },
};

/* the chapter's colours, which are the pictures' colours too: the larger unit (kilograms) deep blue, the
   smaller unit (grams) green, a kilogram carried or broken and every figure it rewrites amber, what is left
   and the difference reddish purple, a count of things (bags) sky blue. A zero that holds an empty grams
   place is grey, at full size. Coloured numerals use a deeper ink so they read at 4.5:1. */
const WC_KG = CONTENT.hundred;
const WC_G = CONTENT.one;
const WC_MOVE = CONTENT.ten;
const WC_LEFT = CONTENT.bead;
const WC_SKY = "#56B4E9";
const WC_ZERO = "#767676";
const WC_INK: any = { kg: shade(WC_KG, 0.25), g: shade(WC_G, 0.25), move: shade(WC_MOVE, 0.42), left: shade(WC_LEFT, 0.35) };
/* a measure in two units: the slot's two boxes, kilograms then grams, each named by its unit symbol
   (BUILD_CARD §7, 2026-09-24) */
const WC_PARTS = [{ label: "kg" }, { label: "g" }];
/* Free play's bags: pairs that carry (3 kg 450 g + 1 kg 800 g), break (5 kg less 2 kg 75 g) and neither */
const WC_FREE_BAGS = [{ id: "f1", kg: 3, g: 450 }, { id: "f2", kg: 1, g: 800 }, { id: "f3", kg: 2, g: 75 }, { id: "f4", kg: 5, g: 0 }, { id: "f5", kg: 4, g: 625 }];
/* the guide steps work a WARM-UP of a different kind from the phase's questions, on numbers that are no
   question's answer or answer part: a grams-only tag split into kg and three boxes (no padding zero); grams
   alone added past a thousand; one kilogram of whole kilograms opened (no take-away); two bags weighed and
   levelled on the balance (no card) */
const WC_WARM: any = {
  1: { kind: "w-drop", bags: [{ id: "w", kg: 2, g: 305, grams: 2305 }] },
  2: { kind: "w-carry", rows: [[null, 600], [null, 700]] },
  3: { kind: "w-break", rows: [[5, 0]] },
  4: { kind: "w-level", bags: [{ id: "rice", label: "rice", kg: 3, g: 900 }, { id: "sugar", label: "sugar", kg: 4, g: 100 }], diff: 200 },
};

/* One entry per phase = one mount (see docs/PATTERNS.md §9b for steps; §16b for the one-sentence bubble). */
const PHASES = [
  {
    n: 1,
    concept: "Three places for grams",
    conceptId: "M2.S3.T6.C25", objectiveIds: ["O9"],
    says: ["The grams column has three boxes. How is a two-digit number of grams written?"],
    steps: [
      { say: "Tap the bag of 2,305 g to write its weight in the frame.", on: "bag", hint: "The bag with the tag waits at the right of the frame." },
      { say: "Tap Count to count the grams in the three boxes.", on: "count", hint: "The Count key is at the bottom right of the board." },
    ],
    /* tries, as the plan writes it: first rung, the item's own miss; second, which places this number of grams fills;
       third (the plan's cut-down tag), said here as the rule it teaches */
    /* the last act's result stays on show a little longer before question 1 opens on a fresh frame */
    stepHold: 900,
    ladder: ["Which places does this number of grams fill?", "Put a 0 in each empty box in front, so the number ends in the ones box."],
    closing: "Beside kilograms the grams take three places, with zeros in the empty ones.",
    learned: "You learned: beside kilograms, grams always take three places.",
    traceback: "The bags drop into the frame with a grey zero in each empty grams place and the columns are added; a typed grams row is read back as it stands and redrawn in its right boxes.",
    items: [
      /* learn ML1: answer in the plan = 39 kg 753 g. Each bag is tapped into the frame (48 g drops in as 0 4 8, the
         zero grey); the sum goes in the slot's two boxes */
      { qid: "M2.S3.T6.C25:ML1", kind: "add", rows: [[26, 48], [13, 705]], bags: [{ id: "b0", kg: 26, g: 48 }, { id: "b1", kg: 13, g: 705 }],
        parts: WC_PARTS, answer: [39, 753], near: "40|185", winMs: 3200,
        say: "Tap both bags, then add 26 kg 48 g and 13 kg 705 g in columns.", ask: "Add 26 kg 48 g and 13 kg 705 g",
        miss: "How many grams boxes are there?", win: "Yes, 39 kg 753 g, with 48 g written as 048." },
      /* practice 1: answer in the plan = 007, because grams take three places. The frame's three grams boxes fill
         left to right as the digits are typed; "7" or "700" is not it */
      { qid: "M2.S3.T6.C25:1", kind: "write", rows: [[null, 7]], bags: [{ id: "t", kg: null, g: 7 }], answer: "007", near: "700", winMs: 3600,
        say: "How is 7 g written in the grams column beside kilograms?", ask: "7 g in the grams boxes",
        miss: "Which box does the 7 stand in?", win: "Right, 007: two zeros hold the hundreds and the tens." },
      /* practice 2: answer in the plan = 090 */
      { qid: "M2.S3.T6.C25:2", kind: "write", rows: [[12, 90]], bags: [{ id: "t", kg: 12, g: 90 }], answer: "090", near: "900", winMs: 4200,
        say: "12 kg 90 g is written in columns, so what goes in the grams column?", ask: "Grams boxes for 12 kg 90 g",
        miss: "Do your three boxes read 90 grams?", win: "Good, 090: the 9 sits in the tens box, with a zero in front." },
    ],
  },
  {
    n: 2,
    concept: "Carrying a kilogram",
    conceptId: "M2.S3.T6.C26", objectiveIds: ["O9"],
    says: ["The grams make more than a thousand. What is written, and what is carried?"],
    steps: [
      { say: "Tap Add to add the grams, 600 g and 700 g.", on: "add", hint: "The Add key is at the bottom right of the board." },
      { say: "Tap Carry to make 1,000 of those grams into one kilogram.", on: "carry", hint: "Now the Carry key is in the same place." },
    ],
    stepHold: 900,
    ladder: ["Is that a thousand or more?", "Take 1,000 out of the grams sum and carry it as one kilogram."],
    closing: "Add the grams first, and every full 1,000 g becomes one more kilogram.",
    learned: "You learned: each full thousand grams is carried as one kilogram.",
    traceback: "The grams are added in full, a thousand of them is carried as one kilogram weight over the kilograms, only the grams left stay, and the kilograms are added with the carry.",
    items: [
      /* learn ML2: answer in the plan = 93 kg 487 g */
      { qid: "M2.S3.T6.C26:ML2", kind: "carry", rows: [[58, 675], [34, 812]], parts: WC_PARTS, answer: [93, 487], near: "92|1487", winMs: 3200,
        say: "Add 58 kg 675 g and 34 kg 812 g.", ask: "58 kg 675 g + 34 kg 812 g",
        miss: "What do the grams add up to?", win: "Yes, 1,487 g is 1 kg 487 g, so 93 kg 487 g." },
      /* practice 3: answer in the plan = 62 kg 145 g. The grams make 1145, so write 145 and carry 1 kg */
      { qid: "M2.S3.T6.C26:3", kind: "carry", rows: [[34, 760], [27, 385]], parts: WC_PARTS, answer: [62, 145], near: "61|145", winMs: 3200,
        say: "What do 34 kg 760 g and 27 kg 385 g make together?", ask: "34 kg 760 g + 27 kg 385 g",
        miss: "Did the carried kilogram join the kilograms?", win: "Right, 62 kg 145 g, with one kilogram carried." },
      /* practice 4: answer in the plan = 47 kg 195 g. The grams make 1195, so write 195 and carry 1 kg.
         The plan's question: A shop sold 15 kg 640 g of flour, 22 kg 75 g of rice and 9 kg 480 g of sugar. What
         total weight did it sell? (one sentence for the bubble; the frame names each row) */
      { qid: "M2.S3.T6.C26:4", kind: "carry", rows: [[15, 640], [22, 75], [9, 480]], labels: ["flour", "rice", "sugar"], parts: WC_PARTS, answer: [47, 195], near: "46|1195", winMs: 2800,
        say: "A shop sold 15 kg 640 g, 22 kg 75 g and 9 kg 480 g: find the total weight.", ask: "Total weight sold",
        miss: "The three grams together make how many whole thousands?", win: "Good, the shop sold 47 kg 195 g in all." },
    ],
  },
  {
    n: 3,
    concept: "Borrowing from zero grams",
    conceptId: "M2.S3.T6.C27", objectiveIds: ["O10"],
    says: ["No grams on top. Open one kilogram. How many grams does it give?"],
    steps: [
      { say: "Tap Break to borrow one kilogram from the 5 kg on top.", on: "break", hint: "The Break key is at the bottom right of the board." },
      { say: "Tap Open to open that kilogram into ten 100 g bars.", on: "open", hint: "Now the Open key is in the same place." },
    ],
    stepHold: 900,
    ladder: ["Where can grams come from when there are none?", "The kilograms on top get one less, and the grams on top get 1,000 more."],
    closing: "When the grams on top are too few, break one kilogram into 1,000 g.",
    learned: "You learned: when grams on top are too few, break one kilogram.",
    traceback: "One kilogram on top is broken: the kilograms are struck and written one less in amber, 1,000 g join the grams on top, then the grams and the kilograms are taken away.",
    items: [
      /* learn ML3: answer in the plan = 41 kg 650 g of mangoes is left in the crate. The plan's question: A crate holds
         60 kg of mangoes. 18 kg 350 g of them are sold. How much is left in the crate? */
      { qid: "M2.S3.T6.C27:ML3", kind: "take", rows: [[60, 0], [18, 350]], parts: WC_PARTS, answer: [41, 650], near: "42|350", winMs: 3400,
        say: "A crate holds 60 kg of mangoes and 18 kg 350 g are sold; how much is left?", ask: "Left in the crate?",
        miss: "How many grams are on top?", win: "Yes, 41 kg 650 g of mangoes is left in the crate." },
      /* practice 5: answer in the plan = 12 kg 575 g. Write 20 kg as 20 kg 000 g and break one kilogram into a thousand grams */
      { qid: "M2.S3.T6.C27:5", kind: "take", rows: [[20, 0], [7, 425]], parts: WC_PARTS, answer: [12, 575], near: "13|425", winMs: 3400,
        say: "Take 7 kg 425 g from 20 kg.", ask: "Take 7 kg 425 g from 20 kg",
        miss: "Can you take 425 g from 000 g?", win: "Right, 12 kg 575 g, once one kilogram was broken." },
      /* practice 6: answer in the plan = 44 kg 435 g. Break one kilogram: 80 kg 1215 g, and 1215 less 780 is 435.
         Its near miss is the brief's: the kilogram broken but the kilograms left as they were (45 kg 435 g). It has
         grams on top, so its rungs are its own (the phase's second rung says "none") */
      { qid: "M2.S3.T6.C27:6", kind: "take", rows: [[81, 215], [36, 780]], parts: WC_PARTS, answer: [44, 435], near: "45|435", winMs: 3800,
        say: "From 81 kg 215 g, take away 36 kg 780 g.", ask: "81 kg 215 g − 36 kg 780 g",
        miss: "Are the 215 g on top enough to take 780 g away?",
        ladder: ["After the break, how many kilograms are on top?", "Break one of the 81 kg into 1,000 g and add it to the 215 g."],
        win: "Good, 44 kg 435 g, once the break made 1,215 g on top." },
    ],
  },
  {
    n: 4,
    concept: "Heavier, and by how much",
    conceptId: "M2.S3.T6.C28", objectiveIds: ["O10"],
    says: ["Which bag is heavier? Now how much heavier? Fill both blanks."],
    steps: [
      { say: "Tap Weigh to hang the rice and the sugar on the balance.", on: "weigh", hint: "The Weigh key is at the bottom of the board." },
      { say: "Tap Level to put 200 g on the lighter bag's pan.", on: "level", hint: "Now the Level key is in the same place." },
    ],
    stepHold: 900,
    ladder: ["What does the question ask for, one thing or two?", "Pick the heavier one, then subtract grams first, breaking a kilogram if needed."],
    closing: "Kilograms decide first; only a tie sends you on to the grams.",
    learned: "You learned: compare kilograms first, and give both answers.",
    traceback: "The heavier pan is ringed, the lighter weight is taken from the heavier in the frame (a kilogram broken where the grams are too few), and the difference is written.",
    items: [
      /* learn ML4: answer in the plan = The second suitcase is heavier, by 3 kg 765 g. The answer card has two blanks on
         the working area: a key for the heavier one, and kilograms and grams cells that borrow the pad (api.capture).
         answer "pick|kg|g" (kg empty when there are no whole kilograms, as "B||540"); the card never closes on the
         difference alone */
      { qid: "M2.S3.T6.C28:ML4", kind: "compare", pad: "enter", winMs: 3400, answer: "second|3|765", near: "first|3|765",
        bags: [{ id: "first", label: "suitcase 1", kg: 17, g: 280, look: "case" }, { id: "second", label: "suitcase 2", kg: 21, g: 45, look: "case" }],
        say: "Which suitcase is heavier, 17 kg 280 g or 21 kg 45 g, and by how much?", ask: "Heavier, and by how much?",
        miss: "Which way does the balance tip?", win: "Yes, suitcase 2 is heavier, by 3 kg 765 g." },
      /* practice 7: answer in the plan = The bag of onions is heavier, by 1 kg 890 g. The onions hang on the left pan
         (the heavier bag is not always the second one) */
      { qid: "M2.S3.T6.C28:7", kind: "compare", pad: "enter", winMs: 4500, answer: "onions|1|890", near: "potatoes|1|890",
        bags: [{ id: "onions", label: "onions", kg: 11, g: 40 }, { id: "potatoes", label: "potatoes", kg: 9, g: 150 }],
        say: "Potatoes 9 kg 150 g, onions 11 kg 40 g: name the heavier bag and how much more.", ask: "Which bag, how much more?",
        miss: "Which bag has more whole kilograms?", win: "Right, onions: 11 kg beats 9 kg, so they are 1 kg 890 g heavier." },
      /* practice 8: answer in the plan = Parcel B is heavier, by 540 g. The kilograms are equal, and 600 g is more than
         060 g. Its near miss is the brief's: "they weigh the same", so no difference */
      { qid: "M2.S3.T6.C28:8", kind: "compare", pad: "enter", winMs: 4400, answer: "B||540", near: "B|0|0",
        bags: [{ id: "A", label: "parcel A", kg: 12, g: 60, look: "parcel" }, { id: "B", label: "parcel B", kg: 12, g: 600, look: "parcel" }],
        say: "Parcel A 12 kg 60 g, parcel B 12 kg 600 g: which is heavier, and by how much?", ask: "Which parcel, how much more?",
        miss: "The kilograms are equal, so which grams are more?", win: "Good, parcel B: the kilograms tie, so the grams decide, by 540 g." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  gramsPerKilogram: 1000, gramsBoxes: 3,
  /* the frame: a kilograms column, a near-black line, then the grams in exactly three boxes; a fourth digit of
     grams has no box and stands on the line */
  frame: { width: 540, compactWidth: 428, rowHeight: 72, gramsBox: 84, rows: "up to three, a rule, then the answer row" },
  kinds: ["add", "write", "carry", "take", "compare"],
  warmUps: WC_WARM,
  freePlayBags: WC_FREE_BAGS,
  colours: { kilograms: WC_KG, grams: WC_G, carriedOrBroken: WC_MOVE, leftOrDifference: WC_LEFT, bags: WC_SKY, paddingZero: WC_ZERO },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a card answer is "pick|kg|g": the heavier one AND the difference, so the difference alone ("|3|765") is
   never right. The grams of one weight ("007") are judged as written: three places, so "7" and "700" are not "007". */
const judge = (item: any, v: any) => {
  if (item.kind === "compare") {
    const got = String(Array.isArray(v) ? v.join("|") : v ?? "").split("|"), want = String(item.answer).split("|");
    return got.length === 3 && got[0] === want[0] && /^\d*$/.test(got[1]) && /^\d+$/.test(got[2])
      && Number(got[1] || 0) === Number(want[1] || 0) && Number(got[2]) === Number(want[2]);
  }
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v ?? "").trim() === String(item.answer);
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work: everything is turned
   into grams, added or taken away whole, and turned back (the picture works column by column) */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const inGrams = (kg: any, g: number) => Number(kg || 0) * 1000 + g;
  const back = (t: number) => [Math.floor(t / 1000), t % 1000];
  if (it.kind === "write") return it.answer === ("00" + it.rows[0][1]).slice(-3);
  if (it.kind === "add" || it.kind === "carry") {
    const t = back(it.rows.reduce((a: number, r: any) => a + inGrams(r[0], r[1]), 0));
    return it.answer[0] === t[0] && it.answer[1] === t[1];
  }
  if (it.kind === "take") {
    const t = back(inGrams(it.rows[0][0], it.rows[0][1]) - inGrams(it.rows[1][0], it.rows[1][1]));
    return it.answer[0] === t[0] && it.answer[1] === t[1];
  }
  if (it.kind === "compare") {
    const [a, b] = it.bags.map((x: any) => ({ id: x.id, t: inGrams(x.kg, x.g) }));
    const dd = back(Math.abs(a.t - b.t));
    return a.t !== b.t && it.answer === [a.t > b.t ? a.id : b.id, dd[0] || "", dd[1]].join("|");
  }
  return false;
}));
/* the item's own misconception (judge must reject it): 48 g read as 480 g, 1487 g written whole, the kilogram not
   paid for, the lighter bag chosen, "the same" */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print (a card's names are in its question, so
   only the difference counts) */
const answerForms = (item: any) => {
  const nums = item.kind === "compare" ? String(item.answer).split("|").slice(1).filter((x: string) => x !== "").map(Number)
    : Array.isArray(item.answer) ? item.answer : null;
  if (nums) return nums.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)]);
  return [String(item.answer)];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;
/* a measure as the book writes it: 3 kg 765 g, and 540 g when there are no whole kilograms */
const wcMeasure = (kg: any, g: any, tx: any) => (Number(kg || 0) ? `${Number(kg)} ${tx("kg")} ${Number(g || 0)} ${tx("g")}` : `${Number(g || 0)} ${tx("g")}`);
/* a bag's name from its id (the card's answer names the bag) */
const wcLabelOf = (id: any) => {
  for (const p of PHASES as any[]) for (const it of p.items) for (const b of it.bags || []) if (b.id === id && b.label) return b.label;
  return String(id ?? "");
};
/* the slot: a card answer ("onions|1|890") reads as the bag and the difference; a number typed into a kg or g box
   from 1,000 up takes its commas */
const format = (v: any, j: any, o: any) => {
  const s = String(v ?? ""), t = (o && o.tx) || ((x: any) => x), a = s.split("|");
  if (j === undefined && a.length === 3) return (a[0] ? t(wcLabelOf(a[0])) + ", " : "") + wcMeasure(a[1], a[2], t);
  if (j === undefined && a.length === 2) return wcMeasure(a[0], a[1], t);
  if (j !== undefined && /^\d+$/.test(s) && Number(s) >= 1000) return indian(Number(s));
  return s;
};

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: undefined = press Enter (the card's Enter is api.onEnter) */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area's pieces (drawing helpers are called, never mounted) ─────────────────── */

/* the frame, in the 900 x 520 board's units: a kilograms column, a near-black line, then exactly three grams boxes.
   WC_FA is the full frame (phases 1 to 3), WC_FB the compact one beside the balance (phase 4, free play) */
const WC_FA = { kgR: 196, bar: 222, gL: 244, bw: 84, bh: 72, gap: 8, w: 540, row0: 168, step: 80 };
const WC_FB = { kgR: 158, bar: 182, gL: 200, bw: 68, bh: 72, gap: 6, w: 428, row0: 168, step: 80 };
const WC_FIN: any = { add: 3, write: 2, carry: 3, take: 3, compare: 4 };
const WC_KEY: any = { count: "Count", add: "Add", carry: "Carry", break: "Break", open: "Open", weigh: "Weigh", level: "Level", fadd: "Add", ftake: "Take away" };
const wcBX = (F: any, k: number) => F.gL + k * (F.bw + F.gap);
const wcBM = (F: any, k: number) => (k < 0 ? F.bar : wcBX(F, k) + F.bw / 2);
const wcRowY = (F: any, r: number) => F.row0 + r * F.step;
const wcGW = (F: any) => 3 * F.bw + 2 * F.gap;
const wcAnsY = (F: any, nR: number) => wcRowY(F, nR) + 6;
/* the balance's own judgement: kilograms first, the grams only when the kilograms are equal */
const wcHeavier = (a: any, b: any) => (a.kg !== b.kg ? a.kg - b.kg : a.g - b.g);
/* the columns as the frame works them: grams first, each full thousand carried as one kilogram */
const wcAddCols = (rows: any[]) => {
  const gs = rows.reduce((a: number, r: any) => a + r[1], 0), carry = Math.floor(gs / 1000);
  return { gs, carry, g: gs - carry * 1000, kg: rows.reduce((a: number, r: any) => a + (r[0] || 0), 0) + carry };
};
/* take away: grams too few on top, so one kilogram is broken into a thousand grams */
const wcTakeCols = (top: any[], bot: any[]) => {
  const need = top[1] < bot[1], tk = need ? top[0] - 1 : top[0], tg = need ? top[1] + 1000 : top[1];
  return { need, tk, tg, kg: tk - (bot[0] || 0), g: tg - bot[1] };
};
/* grams as digits in the three boxes, standing against the ones box: zeros that hold an empty place are grey
   (all three of a whole kilogram's 000); a four-digit sum puts its thousand on the line (k = -1) */
const wcCellsR = (g: any) => {
  if (g === null || g === undefined || g === "") return [];
  const s = String(Number(g));
  if (Number(g) === 0) return [0, 1, 2].map((k) => ({ ch: "0", k, grey: true }));
  if (s.length > 3) return s.split("").map((ch, i) => ({ ch, k: i - (s.length - 3), grey: false }));
  const lead = 3 - s.length;
  return s.padStart(3, "0").split("").map((ch, i) => ({ ch, k: i, grey: i < lead }));
};
/* grams typed into the boxes one by one, from the left (the child's own writing) */
const wcCellsL = (s: any) => {
  const dd = String(s ?? "").replace(/\D/g, "").slice(0, 3);
  const lead = dd.search(/[1-9]/);
  return dd.split("").map((ch, i) => ({ ch, k: i, grey: lead < 0 || i < lead }));
};
/* what three boxes read as they stand: empty boxes after the digits count as zeros ("7" in the first box is 700 g) */
const wcReadL = (s: any) => Number(String(s ?? "").replace(/\D/g, "").slice(0, 3).padEnd(3, "0"));
const wcTagLines = (b: any, tx: any) => {
  if (b.grams) return [{ t: indian(b.grams) + " " + tx("g"), f: WC_INK.g }];
  const out: any[] = [];
  if (b.kg) out.push({ t: b.kg + " " + tx("kg"), f: WC_INK.kg });
  if (b.g || !b.kg) out.push({ t: b.g + " " + tx("g"), f: WC_INK.g });
  return out;
};
const wcFit = (s: string, size: number, room: number) => {
  let n = 0;
  for (const ch of String(s)) n += /[ऀ-ं़ु-ै्॑-ॗॢॣઁં઼ુ-ૈ્ૢૣ]/.test(ch) ? 0 : /[ऀ-૿]/.test(ch) ? 0.7 : 0.6;   /* a Devanagari or Gujarati letter measures about 0.6 em: 0.7 keeps a margin */
  return Math.max(T.micro, Math.min(size, Math.floor(room / Math.max(1, n))));
};
/* the measured Poppins widths (Latin about 0.53 em, a Devanagari or Gujarati letter about 0.6): for a title that must stay
   at 32 where it fits; a zero-advance mark counts nothing */
const wcFitT = (s: string, size: number, room: number) => {
  let n = 0;
  for (const ch of String(s)) n += /[ऀ-ं़ु-ै्॑-ॗॢॣઁં઼ુ-ૈ્ૢૣ]/.test(ch) ? 0 : /[ऀ-૿]/.test(ch) ? 0.6 : 0.53;
  return Math.max(T.micro, Math.min(size, Math.floor(room / Math.max(1, n))));
};
const wcWidth = (s: string, size: number) => {
  let n = 0;
  for (const ch of String(s)) n += /[ऀ-ं़ु-ै्॑-ॗॢॣઁં઼ુ-ૈ્ૢૣ]/.test(ch) ? 0 : /[ऀ-૿]/.test(ch) ? 0.6 : 0.56;
  return n * size;
};

/* a bag with its weight tag (kilograms in blue ink over grams in green ink). look: "sack" (a jute sack, portrait 0.8,
   never stretched), "case" (a suitcase, landscape 1.24) or "parcel" (plain: past the 3-skin cap). The object sits at its
   own aspect, centred in the box; the plain shape is drawn first (the fallback) and the skin over it; the tag is code and
   may be wider than a narrow sack, so a long Hindi or Gujarati line fits */
const WC_TAN = { body: "#D9B98B", edge: "#8A6234", dark: "#A97C47" };
function wcBag(x: number, y: number, w: number, h: number, lines: any[], C: any, size: number, look = "sack", tagTop = false) {
  const asp = look === "case" ? 1.24 : look === "parcel" ? 1.1 : 0.8;
  const ow = Math.min(w, h * asp), oh = ow / asp, ox = x + (w - ow) / 2, oy = y + (h - oh);
  const cx = x + w / 2, step = size + 6, tagH = lines.length ? lines.length * step + 10 : 0;
  const tagW = Math.min(w - 8, Math.max(ow * 0.9, 150));
  /* tagTop: on a pan the tag hangs at the top, so a weight can stand on the pan's flat below it */
  const tagY = tagTop ? oy + 6 : Math.max(oy + 4, Math.min(oy + oh - tagH - 4, oy + oh * (look === "sack" ? 0.4 : look === "case" ? 0.45 : 0.3)));
  let body: any = null;
  if (look === "sack") {
    const neck = oy + oh * 0.2, nk = ow * 0.13, r = Math.min(26, ow * 0.18);
    body = (
      <g>
        <path d={`M ${cx - nk} ${neck} L ${cx - nk * 2} ${oy + 4} Q ${cx} ${oy + 16} ${cx + nk * 2} ${oy + 4} L ${cx + nk} ${neck} Z`}
          fill={WC_TAN.body} stroke={WC_TAN.edge} strokeWidth={3} strokeLinejoin="round" />
        <path d={`M ${cx - nk} ${neck} Q ${ox} ${neck + 4} ${ox} ${neck + (oy + oh - neck) * 0.45} L ${ox} ${oy + oh - r} Q ${ox} ${oy + oh} ${ox + r} ${oy + oh}
          L ${ox + ow - r} ${oy + oh} Q ${ox + ow} ${oy + oh} ${ox + ow} ${oy + oh - r} L ${ox + ow} ${neck + (oy + oh - neck) * 0.45} Q ${ox + ow} ${neck + 4} ${cx + nk} ${neck} Z`}
          fill={WC_TAN.body} stroke={WC_TAN.edge} strokeWidth={3} strokeLinejoin="round" />
        <line x1={cx - nk * 1.3} y1={neck} x2={cx + nk * 1.3} y2={neck} stroke={WC_TAN.edge} strokeWidth={6} strokeLinecap="round" />
        <Skin name="sack" x={ox} y={oy} w={ow} h={oh} />
      </g>
    );
  } else if (look === "case") {
    const hy = oy + oh * 0.16;
    body = (
      <g>
        <path d={`M ${cx - ow * 0.16} ${hy} L ${cx - ow * 0.16} ${oy + 3} L ${cx + ow * 0.16} ${oy + 3} L ${cx + ow * 0.16} ${hy}`} fill="none" stroke={WC_TAN.edge} strokeWidth={5} strokeLinejoin="round" />
        <rect x={ox} y={hy} width={ow} height={oy + oh - hy} rx={Math.min(16, ow * 0.12)} fill={WC_TAN.body} stroke={WC_TAN.edge} strokeWidth={3} />
        <Skin name="suitcase" x={ox} y={oy} w={ow} h={oh} />
      </g>
    );
  } else {
    body = (
      <g>
        <rect x={ox} y={oy + 4} width={ow} height={oh - 4} rx={8} fill={WC_TAN.body} stroke={shade(WC_TAN.edge, 0.3)} strokeWidth={3.5} />
        <line x1={cx} y1={oy + 4} x2={cx} y2={oy + oh} stroke={WC_TAN.dark} strokeWidth={5} />
        <line x1={ox} y1={oy + oh * 0.55} x2={ox + ow} y2={oy + oh * 0.55} stroke={WC_TAN.dark} strokeWidth={5} />
      </g>
    );
  }
  return (
    <g>
      {body}
      {lines.length > 0 && <rect x={cx - tagW / 2} y={tagY} width={tagW} height={tagH} rx={8} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />}
      {lines.map((l: any, i: number) => (
        <text key={i} x={cx} y={tagY + 5 + size * 0.92 + i * step} textAnchor="middle" fontSize={wcFit(l.t, size, tagW - 12)} fontWeight={700} fill={l.f}>{l.t}</text>
      ))}
    </g>
  );
}

/* a weight: a brass slab (the skin, landscape 1.56, stretched to the slab) tinted in its unit's colour at 0.72 over the
   plain slab (the fallback): deep blue a kilogram carried or broken, green grams, reddish purple the difference. The
   tint is only about 2:1 against plain brass, so the unit name and the column heading carry the reading */
function wcWeight(x: number, y: number, w: number, h: number, fill: string, edge: string) {
  const r = Math.min(10, h * 0.22);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} stroke={edge} strokeWidth={2.5} />
      <Skin name="weight" x={x} y={y} w={w} h={h} fit="stretch" />
      <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} fillOpacity={0.72} stroke={edge} strokeWidth={2.5} />
    </g>
  );
}
/* a bar of grams (a hundred, a ten, a one): the stretched weight skin, tinted green, only when it is 16 or more tall */
function wcBar(key: string, x: number, y: number, w: number, h: number) {
  return (
    <g key={key}>
      <rect x={x} y={y} width={w} height={h} rx={4} fill={WC_G} stroke={shade(WC_G, 0.3)} strokeWidth={2} />
      {h >= 16 && <Skin name="weight" x={x} y={y} w={w} h={h} fit="stretch" />}
      {h >= 16 && <rect x={x} y={y} width={w} height={h} rx={4} fill={WC_G} fillOpacity={0.72} stroke={shade(WC_G, 0.3)} strokeWidth={2} />}
    </g>
  );
}

/* the frame. s = { rows: [{ kg, kgInk, g: cells, gInk, struck, lit }], sign, carry, carryLit, above: { kg, g: cells } | null,
   rule, ans: { kg, kgInk, g: cells, gInk } | null, reads: [{ r, t, f }], labels: [..], rings: [{ x, y, w, h }] } */
function wcFrame(F: any, s: any, C: any, tx: any) {
  const gw = wcGW(F), nR = Math.max(1, s.rows.length);
  const ruleY = wcRowY(F, nR) - 1, ansTop = wcAnsY(F, nR);
  const bottom = s.rule ? ansTop + F.bh + 10 : wcRowY(F, nR) + 4;
  const boxes = (key: string, top: number, lit?: boolean) => [0, 1, 2].map((k) => (
    <rect key={key + k} x={wcBX(F, k)} y={top} width={F.bw} height={F.bh} rx={10} fill="#FFFFFF"
      stroke={lit ? C.accent : tint(C.ink, 0.45)} strokeWidth={lit ? 4 : 2.5} />
  ));
  const kgText = (v: any, top: number, ink: string, key: string, size = T.xl) => (v === "" || v === null || v === undefined ? null
    : <text key={key} x={F.kgR - 4} y={top + 56} textAnchor="end" fontSize={size} fontWeight={700} fill={ink}>{String(v)}</text>);
  /* digits drawn box by box are ONE text (a tspan a digit), so the number reads whole */
  const digits = (cells: any[], y: number, ink: string, key: string, size = T.xl) => {
    const cs = (cells || []).filter((c: any) => c && c.ch !== "" && c.ch !== undefined);
    if (!cs.length) return null;
    /* a thousand with no box stands on the line: a paper patch under it so the line never cuts the digit */
    const off = cs.some((c: any) => c.k < 0);
    return (
      <g key={key}>
        {off && <rect x={F.bar - size * 0.36} y={y - size * 0.8} width={size * 0.72} height={size * 0.9} rx={6} fill="#FFFFFF" />}
        <text y={y} textAnchor="middle" fontSize={size} fontWeight={700}>
          {cs.map((c: any, j: number) => <tspan key={j} x={wcBM(F, c.k)} fill={c.grey ? WC_ZERO : ink}>{c.ch}</tspan>)}
        </text>
      </g>
    );
  };
  const kgW = (v: any) => String(v ?? "").length * 34;
  return (
    <g>
      {/* the joining sign: a thousand grams make one kilogram */}
      <text x={F.bar - 16} y={34} textAnchor="end" fontSize={T.label} fontWeight={700} fill={WC_INK.kg}>{"1 " + tx("kg")}</text>
      <text x={F.bar} y={34} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>=</text>
      <text x={F.bar + 16} y={34} fontSize={T.label} fontWeight={700} fill={WC_INK.g}>{indian(1000) + " " + tx("g")}</text>
      <rect x={0} y={48} width={F.w} height={bottom - 48} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      <rect x={8} y={54} width={F.bar - 16} height={bottom - 60} rx={12} fill={tint(WC_KG, 0.9)} />
      <rect x={F.gL - 8} y={54} width={gw + 16} height={bottom - 60} rx={12} fill={tint(WC_G, 0.9)} />
      <line x1={F.bar} y1={56} x2={F.bar} y2={bottom - 8} stroke={CONTENT.line} strokeWidth={4} />
      <text x={F.kgR - 40} y={86} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={WC_INK.kg}>{tx("kg")}</text>
      <text x={F.gL + gw / 2} y={86} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={WC_INK.g}>{tx("g")}</text>
      {/* the carry row: the kilogram weight carried over the kilograms (deep blue) with its "1" on an amber chip */}
      {s.carry && (
        <g>
          {wcWeight(F.kgR - 80, 110, 72, 46, WC_KG, shade(WC_KG, 0.3))}
          <rect x={F.kgR - 61} y={117} width={36} height={32} rx={9} fill={tint(WC_MOVE, 0.72)} stroke={shade(WC_MOVE, 0.35)} strokeWidth={2.5} />
          <text x={F.kgR - 43} y={144} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={WC_INK.move}>1</text>
          {s.carryLit && <rect x={F.kgR - 84} y={102} width={82} height={62} rx={12} fill="none" stroke={C.accent} strokeWidth={5} />}
        </g>
      )}
      {/* the figures a break rewrites, in amber over the top row */}
      {s.above && s.above.kg !== undefined && s.above.kg !== "" && kgText(s.above.kg, 94, WC_INK.move, "ak", T.prompt)}
      {/* the top grams and the 1,000 g a break adds, written above them as one number (80 kg 1215 g, as the book does) */}
      {s.above && s.above.gs ? <text x={F.gL + gw / 2} y={150} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={WC_INK.move}>{s.above.gs}</text> : null}
      {s.rows.map((r: any, i: number) => {
        const top = wcRowY(F, i);
        return (
          <g key={"row" + i}>
            {boxes("b" + i + "-", top, r.lit)}
            {kgText(r.kg, top, r.kgInk || WC_INK.kg, "k" + i)}
            {digits(r.g, top + 56, r.gInk || WC_INK.g, "g" + i)}
            {r.struck && r.kg !== "" && r.kg !== null && r.kg !== undefined && (
              <line x1={F.kgR - 10 - kgW(r.kg)} y1={top + 38} x2={F.kgR + 2} y2={top + 38} stroke={CONTENT.line} strokeWidth={4} />
            )}
            {r.gStruck && <line x1={F.gL + 6} y1={top + 38} x2={F.gL + gw - 6} y2={top + 38} stroke={CONTENT.line} strokeWidth={4} />}
          </g>
        );
      })}
      {s.sign && <text x={30} y={wcRowY(F, nR - 1) + 56} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{s.sign}</text>}
      {s.rule && (
        <g>
          <line x1={8} y1={ruleY} x2={F.w - 8} y2={ruleY} stroke={CONTENT.line} strokeWidth={4} />
          {boxes("a-", ansTop)}
          {s.ans && kgText(s.ans.kg, ansTop, s.ans.kgInk || WC_INK.kg, "ak2")}
          {s.ans && digits(s.ans.g, ansTop + 56, s.ans.gInk || WC_INK.g, "ag2")}
        </g>
      )}
      {(s.labels || []).map((t: string, i: number) => (t ? (
        <text key={"lb" + i} x={F.w + 14} y={wcRowY(F, i) + 48} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(t)}</text>
      ) : null))}
      {(s.reads || []).map((q: any, i: number) => (
        <text key={"rd" + i} x={F.w + 14} y={wcRowY(F, q.r) + 48} fontSize={T.label} fontWeight={700} fill={q.f || C.ink}>{q.t}</text>
      ))}
      {(s.rings || []).map((q: any, i: number) => (
        <rect key={"ring" + i} x={q.x} y={q.y} width={q.w} height={q.h} rx={12} fill="none" stroke={C.accent} strokeWidth={5} />
      ))}
    </g>
  );
}

/* the balance: it judges the whole weight of each bag and tips toward the heavier. content(side) draws what sits on a
   pan and below(side) what hangs under the dish, in the pan's own units (the strings' top at 0,0; the dish at B.S) */
function wcBalance(B: any, theta: number, content: (side: number) => any, C: any, below?: (side: number) => any, ms = 900) {
  const dy = B.L * Math.sin((theta * Math.PI) / 180);
  const ease = reducedMotion() || !ms ? "none" : `transform ${ms}ms ease-in-out`;
  return (
    <g>
      <rect x={B.px - 6} y={B.py} width={12} height={B.base - B.py} rx={4} fill={CONTENT.line} />
      <rect x={B.px - (B.baseW || 160) / 2} y={B.base} width={B.baseW || 160} height={12} rx={6} fill={CONTENT.line} />
      {[0, 1].map((side) => (
        <g key={side} transform={`translate(${B.px + (side ? B.L : -B.L)},${B.py})`}>
          <g style={{ transform: `translate(0px,${side ? dy : -dy}px)`, transition: ease } as any}>
            <line x1={0} y1={0} x2={-B.PW / 2 + 8} y2={B.S} stroke={CONTENT.line} strokeWidth={2.5} />
            <line x1={0} y1={0} x2={B.PW / 2 - 8} y2={B.S} stroke={CONTENT.line} strokeWidth={2.5} />
            {content(side)}
            <path d={`M ${-B.PW / 2} ${B.S} Q 0 ${B.S + 32} ${B.PW / 2} ${B.S} Z`} fill={tint(C.rule, 0.35)} stroke={CONTENT.line} strokeWidth={2.5} />
            {below ? below(side) : null}
          </g>
        </g>
      ))}
      <g transform={`translate(${B.px},${B.py})`}>
        <g style={{ transform: `rotate(${theta}deg)`, transformBox: "fill-box", transformOrigin: "center", transition: ease } as any}>
          <rect x={-B.L - 10} y={-6} width={2 * B.L + 20} height={12} rx={6} fill={CONTENT.line} />
        </g>
        <circle cx={0} cy={0} r={11} fill={C.panel} stroke={CONTENT.line} strokeWidth={3} />
      </g>
    </g>
  );
}

/* a tap target over a plain shape: one top-level control (data-control, a label, aria-disabled when it cannot act
   now); passEnter lets Enter reach the window while the pad is lent to the card (no keyboard trap) */
function WcPress({ id, label, x, y, w, h, onPress, live = true, passEnter = false }: any) {
  const p = usePress(onPress, live);
  const keys = (ev: any) => { if (passEnter && ev.key === "Enter") return; p.keys(ev); };
  return (
    <rect className="c4-hit" data-control={id} role="button" tabIndex={0} aria-label={label} aria-disabled={live ? undefined : "true"}
      x={x} y={y} width={w} height={h} rx={14} fill="transparent" style={{ cursor: live ? "pointer" : "default", touchAction: "none" }}
      {...p.bind()} onKeyDown={keys} />
  );
}

/* ── the board's places (900 x 520, its own units; Work shifts it by ox) ── */
const WC_BAGS1: any = { w: { x: 650, y: 140, w: 200, h: 170 }, b0: { x: 620, y: 14, w: 240, h: 190 }, b1: { x: 620, y: 230, w: 240, h: 190 }, t: { x: 716, y: 16, w: 184, h: 210 } };
/* phase 4's balance beside the compact frame: bags as wide as the pans allow, so a "17 किग्रा" tag line fits later */
const WC_B4 = { px: 676, py: 44, L: 132, S: 132, PW: 168, bw: 152, bh: 120, base: 272, baseW: 70 };
const WC_BW = { px: 450, py: 66, L: 200, S: 140, PW: 230, bw: 172, bh: 128, base: 330 };
const WC_WFLOOR: any = { rice: { x: 30, y: 336, w: 172, h: 128 }, sugar: { x: 700, y: 336, w: 172, h: 128 }, wt: { x: 236, y: 410, w: 76, h: 49 } };
/* the one action key: its face and ring stay inside the 520-tall working area */
const WC_KEYBOX = { x: 620, y: 432, w: 240, h: 72 };
const WC_CARD = { x: 452, y: 290, w: 448, h: 214 };
const wcBlank = (k: number) => ({ e: k, done: [] as string[], prog: null as any, placed: [] as number[], card: null as any });

function Work({ n, item, index, stage, wrong, typed, captured, api, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const warm = !free && (stage === "teach" || stage === "demo");
  const asking = !free && !warm && stage === "ask";
  const full = !free && !warm && !!item && (stage === "win" || stage === "idle");
  /* free play: two bags in the frame and on the pans, then add or take away; a new bag after that starts over */
  const [fp, setFpS] = useState<any>({ rows: [], ord: null, op: "", opP: "", p: 0, lvl: false, k: 0 });
  const fpRef = useRef<any>(fp);
  const setFp = (f: any) => setFpS((p: any) => { const nx = typeof f === "function" ? f(p) : f; fpRef.current = nx; return nx; });
  const W0: any = WC_WARM[n] || WC_WARM[1];
  const it: any = free ? { kind: "free" } : warm ? W0 : item || W0;
  const kind: string = it.kind || "";
  /* the board belongs to the ENTRY: a new question or a warm-up opens a fresh one */
  const qk = free ? "free" : warm ? n + ":w" : n + ":" + index;
  const ekRef = useRef<any>({ qk: "", e: 0 });
  if (ekRef.current.qk !== qk) ekRef.current = { qk, e: ekRef.current.e + 1 };
  const e = ekRef.current.e;
  const [raw, setRaw] = useState<any>(null);
  const S: any = raw && raw.e === e ? raw : wcBlank(e);
  /* a write belongs to the entry open when it was called: a late write from an older entry is dropped */
  const putE = (k: number, f: any) => setRaw((p: any) => {
    if (k !== ekRef.current.e) return p;
    const b = p && p.e === k ? p : wcBlank(k);
    return { ...b, ...(typeof f === "function" ? f(b) : f) };
  });
  /* the correction's layer: { e, d, typed }, drawn over the child's own state and never written into it */
  const [demo, setDemo] = useState<any>(null);
  const ty = String(typed ?? "");
  const dmRaw = demo && demo.e === e ? demo : null;
  const fresh = !!dmRaw && kind === "write" && ty !== dmRaw.typed;
  const dm = fresh ? null : dmRaw;
  const R = (on: string) => (S.done.indexOf(on) >= 0 ? 999 : S.prog && S.prog.on === on ? S.prog.p : 0);
  const FIN = WC_FIN[kind] || 0;
  const d = full ? FIN : dm ? dm.d : -1;

  /* one 900 x 520 picture, centred while the panel is shut, never under the key's corner */
  const bwid = box ? box.w : 1472;
  const kx = box && box.key ? box.key.x - 12 : bwid;
  const ox = Math.round(Math.max(0, Math.min((bwid - 900) / 2, kx - 900)));
  const ax = (p: any) => ({ x: p.x + ox, y: p.y });
  const open = !!(box && box.open);
  const F = n === 4 || free ? WC_FB : WC_FA;
  const gw = wcGW(F);
  const rows: any[] = it.rows || [];
  const bags: any[] = it.bags || [];
  const rowC = (r: number) => ({ x: F.gL + gw / 2 - 30, y: wcRowY(F, r) + 36 });
  const centre = (b: any) => ({ x: b.x + b.w / 2, y: b.y + b.h / 2 });

  /* the card (phase 4): the heavier one, and the difference in kilograms and grams; the pad is lent to its cells */
  const cardRef = useRef<any>({ e: -1, pick: "", kg: "", g: "", cell: null });
  if (cardRef.current.e !== e) cardRef.current = { e, pick: "", kg: "", g: "", cell: null };
  const card = cardRef.current;
  const staleRef = useRef<any>({ e: -1, kg: false, g: false });
  const lastSent = useRef<any>({ e: -1, v: "" });
  const [nudge, setNudge] = useState(-1);
  /* the same card sent again after a miss is not judged twice: the card rings until the child changes it */
  const [same, setSame] = useState(-1);
  const setCard = (c: any) => {
    const k = ekRef.current.e;
    cardRef.current = { ...c, e: k };
    putE(k, { card: { pick: c.pick, kg: c.kg, g: c.g, cell: c.cell } });
  };

  /* ── the acts: every one is performed on screen (api.act); the board reacts as the tool passes each point ── */
  const playing = useRef(false);
  const locked = useRef(false);
  const [, setBusy] = useState(false);
  const lastKey = useRef(0);
  const setP = (k: number, name: string, p: number) => putE(k, { prog: { on: name, p } });
  const pen = (pts: any[], onP: any, ms?: number) => api.act({ tool: "pencil", moves: "push", at: pts.map(ax), onPoint: onP, ms: ms || 900 });
  const carryTo = (from: any, to: any, hold: any, onP: any, ms?: number) => api.act({ tool: "hand", moves: "carry", from: ax(from), at: [ax(to)], hold, onPoint: onP, ms: ms || 950 });
  const holdBag = (look = "sack") => wcBag(-48, -60, 96, 120, [], C, T.micro, look);
  const holdKg = () => wcWeight(-36, -23, 72, 46, WC_KG, shade(WC_KG, 0.3));
  const holdGrams = (g: number) => (
    <g>
      {wcWeight(-40, -26, 80, 51, WC_LEFT, shade(WC_LEFT, 0.35))}
    </g>
  );
  /* phase 3's opened kilogram: the weight in the right panel, then ten bars of a hundred grams */
  const KW = { x: 660, y: 170, w: 160, h: 102 };
  const cutXs = Array.from({ length: 9 }).map((_: any, i: number) => KW.x + 8 + (i + 1) * 14.4);
  /* phase 1's count: hundreds as tall bars, tens as short bars, ones as squares */
  const countOf = (g: number) => {
    const out: any[] = [];
    let x = 600;
    for (let i = 0; i < Math.floor(g / 100); i++) { out.push({ x, y: 160, w: 18, h: 110 }); x += 30; }
    for (let i = 0; i < Math.floor((g % 100) / 10); i++) { out.push({ x, y: 216, w: 16, h: 54 }); x += 26; }
    if (g % 10) x += 12;
    for (let i = 0; i < g % 10; i++) { out.push({ x, y: 252, w: 18, h: 18 }); x += 26; }
    return out;
  };
  const takeTop = kind === "take" && rows.length === 2 ? rows[0] : kind === "w-break" ? rows[0] : null;
  const tsol = kind === "take" && rows.length === 2 ? wcTakeCols(rows[0], rows[1]) : kind === "w-break" ? { need: true, tk: rows[0][0] - 1, tg: 1000, kg: 0, g: 0 } : null;
  /* the break, as the pencil writes it: strike the kilograms, the one less above, strike the grams, the grams + 1,000 above */
  const brkPlan = () => {
    const top = wcRowY(F, 0), kS = String(takeTop ? takeTop[0] : ""), tkS = String(tsol ? tsol.tk : "");
    const sk = [0, 1, 2].map((i) => ({ x: F.kgR - 8 - kS.length * 34 + i * kS.length * 17, y: top + 38 }));
    const ak = tkS.split("").map((_: any, j: number) => ({ x: F.kgR - 4 - (tkS.length - 1 - j) * 34 - 17, y: 124 }));
    const sg = [0, 1, 2].map((i) => ({ x: wcBM(F, i), y: top + 38 }));
    const tgS = tsol ? indian(tsol.tg) : "";   /* "1,000", "1,215": commas from 1,000; a pencil point a character */
    const ag = tgS.split("").map((_: any, j: number) => ({ x: F.gL + wcGW(F) / 2 + (j - (tgS.length - 1) / 2) * 25, y: 136 }));
    return { sk, ak, sg, ag };
  };

  const cmp = kind === "compare" && bags.length === 2 ? (() => {
    const h = wcHeavier(bags[0], bags[1]) > 0 ? 0 : 1, H = bags[h], Lb = bags[1 - h];
    return { h, H, Lb, sol: wcTakeCols([H.kg, H.g], [Lb.kg, Lb.g]) };
  })() : null;

  const runAct = async (on: string, k: number): Promise<boolean> => {
    if (kind === "w-drop") {
      if (on === "bag") { setP(k, on, 0); return carryTo(centre(WC_BAGS1.w), rowC(0), holdBag(), () => { setP(k, on, 1); api.sfx.tick(); }); }
      if (on === "count") { setP(k, on, 0); return api.act({ tool: "hand", moves: "tap", at: countOf(305).map((q: any) => ax({ x: q.x + q.w / 2, y: q.y + q.h / 2 })), onPoint: (i: number) => setP(k, on, i + 1), ms: 1000 }); }
    }
    if (kind === "add" && on.indexOf("bag-") === 0) {
      const j = Number(on.slice(4)), r = S.placed.length;
      setP(k, on, 0);
      return carryTo(centre(WC_BAGS1["b" + j]), rowC(r), holdBag(), () => { putE(k, (b: any) => ({ placed: b.placed.concat([j]), prog: { on, p: 1 } })); api.sfx.tick(); });
    }
    if (kind === "w-carry") {
      const at = wcAnsY(F, 2) + 36;
      if (on === "add") { setP(k, on, 0); return pen([-1, 0, 1, 2].map((kk) => ({ x: wcBM(F, kk), y: at })), (i: number) => setP(k, on, i + 1)); }
      if (on === "carry") {
        setP(k, on, 0);
        if (!(await carryTo({ x: F.bar, y: at }, { x: F.kgR - 43, y: 129 }, holdKg(), () => { setP(k, on, 1); api.sfx.trade(); }))) return false;
        return pen([{ x: F.kgR - 20, y: at }], () => setP(k, on, 2));
      }
    }
    if (kind === "w-break" || (kind === "take" && on === "break")) {
      const P = brkPlan();
      if (kind === "w-break" && on === "break") { setP(k, on, 0); return pen([...P.sk, ...P.ak], (i: number) => setP(k, on, i + 1)); }
      if (kind === "w-break" && on === "open") {
        setP(k, on, 0);
        if (!(await api.act({ tool: "knife", moves: "slice", at: cutXs.map((x) => ax({ x, y: KW.y + KW.h / 2 })), ms: 1000, onPoint: (i: number) => { setP(k, on, i + 1); if (i === 8) api.sfx.trade(); } }))) return false;
        return pen([...P.sg, ...P.ag], (i: number) => setP(k, on, 10 + i));
      }
      if (kind === "take") {
        setP(k, on, 0);
        const all = [...P.sk, ...P.ak, ...P.sg, ...P.ag];
        if (!(await pen(all, (i: number) => setP(k, on, i + 1), 1100))) return false;
        return api.act({ tool: "knife", moves: "slice", at: cutXs.map((x) => ax({ x, y: KW.y + KW.h / 2 })), ms: 900, onPoint: (i: number) => { setP(k, on, all.length + 1 + i); if (i === 8) api.sfx.trade(); } });
      }
    }
    if (kind === "w-level") {
      const B = WC_BW;
      const panTop = (side: number) => ({ x: B.px + (side ? B.L : -B.L), y: B.py + B.S - B.bh / 2 - 4 });
      if (on === "weigh") {
        setP(k, on, 0);
        if (!(await carryTo(centre(WC_WFLOOR.rice), panTop(0), holdBag(), () => { setP(k, on, 1); api.sfx.tick(); }, 900))) return false;
        setP(k, on, 2);
        return carryTo(centre(WC_WFLOOR.sugar), panTop(1), holdBag(), () => { setP(k, on, 3); api.sfx.tick(); }, 900);
      }
      if (on === "level") {
        setP(k, on, 0);
        return carryTo(centre(WC_WFLOOR.wt), { x: B.px - B.L, y: B.py + B.S - 20 }, holdGrams(200), () => { setP(k, on, 1); api.sfx.settle(); });
      }
    }
    return false;
  };
  const perform = async (on: string) => {
    if (playing.current || locked.current) return;
    const k = e, wasWarm = warm;
    playing.current = true; setBusy(true);
    setDemo(null);
    let ok = false;
    try { ok = await runAct(on, k); } catch (err) { ok = false; }
    playing.current = false; setBusy(false);
    if (!ok) { putE(k, { prog: null }); return; }
    putE(k, (b: any) => ({ done: b.done.concat([on]), prog: null }));
    api.sfx.settle();
    if (wasWarm) api.did(on);
  };

  /* ── free play ── */
  const fBag = (id: string) => WC_FREE_BAGS.find((b: any) => b.id === id) || WC_FREE_BAGS[0];
  const fShelf = (i: number) => (i < 3 ? { x: 458 + i * 148, y: 292, w: 140, h: 92 } : { x: 532 + (i - 3) * 148, y: 392, w: 140, h: 92 });
  const panAt = (side: number) => ({ x: WC_B4.px + (side ? WC_B4.L : -WC_B4.L), y: WC_B4.py + WC_B4.S - WC_B4.bh / 2 - 2 });
  const freeBag = async (id: string) => {
    let f = fpRef.current;
    if (f.rows.indexOf(id) >= 0 && !f.op) return;
    if (f.rows.length >= 2 || f.op) { f = { rows: [], ord: null, op: "", opP: "", p: 0, lvl: false, k: f.k + 1 }; setFp(f); }
    const slot = f.rows.length, i = WC_FREE_BAGS.findIndex((b: any) => b.id === id);
    playing.current = true; setBusy(true);
    setFp((p: any) => ({ ...p, moving: id }));
    const ok = await carryTo(centre(fShelf(i)), panAt(slot), holdBag(), () => { setFp((p: any) => ({ ...p, rows: p.rows.concat([id]), moving: "" })); api.sfx.tick(); });
    playing.current = false; setBusy(false);
    if (!ok) setFp((p: any) => ({ ...p, moving: "" }));
    else api.sfx.settle();
  };
  const freeOp = async (op: string) => {
    const f = fpRef.current;
    if (f.rows.length < 2 || f.op) return;
    const A = fBag(f.rows[0]), B = fBag(f.rows[1]);
    const ord = op === "-" && wcHeavier(A, B) < 0 ? [f.rows[1], f.rows[0]] : f.rows.slice();
    const top = fBag(ord[0]), bot = fBag(ord[1]);
    setFp((p: any) => ({ ...p, ord, opP: op, p: 0 }));
    const at = wcAnsY(F, 2) + 36, pts: any[] = [];
    const sol: any = op === "+" ? wcAddCols([[top.kg, top.g], [bot.kg, bot.g]]) : wcTakeCols([top.kg, top.g], [bot.kg, bot.g]);
    if (op === "+" && sol.carry) pts.push({ x: F.kgR - 43, y: 129 });
    if (op === "-" && sol.need) pts.push({ x: F.kgR - 20, y: 124 }, { x: wcBM(F, 1), y: 136 });
    [0, 1, 2].forEach((kk) => pts.push({ x: wcBM(F, kk), y: at }));
    pts.push({ x: F.kgR - 20, y: at });
    playing.current = true; setBusy(true);
    let ok = await pen(pts, (i: number) => setFp((p: any) => ({ ...p, p: i + 1 })), 1000);
    if (ok && op === "-") {
      const light = ord[1] === f.rows[0] ? 0 : 1;
      ok = await carryTo({ x: 300, y: 470 }, { x: panAt(light).x, y: WC_B4.py + WC_B4.S - 18 }, holdGrams(0), () => { setFp((p: any) => ({ ...p, lvl: true })); api.sfx.settle(); });
    }
    playing.current = false; setBusy(false);
    setFp((p: any) => ({ ...p, op: op, p: 99 }));
    api.sfx.settle();
  };

  /* ── the card's typing (phase 4) ── */
  const closeCell = () => { if (cardRef.current.cell) setCard({ ...cardRef.current, cell: null }); api.capture(null); };
  const finish = () => {
    const c = cardRef.current;
    if (c.e !== ekRef.current.e || playing.current || locked.current) return;
    if (c.g === "") return;
    /* the difference alone never closes the card: its first blank pulses */
    if (!c.pick) { setNudge(c.e); api.sfx.tick(); return; }
    const v = [c.pick, c.kg === "" ? "" : String(Number(c.kg)), String(Number(c.g))].join("|");
    if (lastSent.current.e === c.e && lastSent.current.v === v) { setSame(c.e); api.sfx.tick(); return; }
    lastSent.current = { e: c.e, v };
    setCard({ ...c, cell: null });
    api.capture(null);
    api.submit(v);
  };
  const padKey = (k: string) => {
    const c = cardRef.current, at = c.cell;
    if (!at || c.e !== ekRef.current.e) return;
    const st = staleRef.current.e === c.e && staleRef.current[at];
    const unstale = () => { if (staleRef.current.e === c.e) staleRef.current = { ...staleRef.current, [at]: false }; };
    const cur = String(c[at] || "");
    if (/^\d$/.test(k)) {
      const base = st ? "" : cur;
      if (base.length >= (at === "kg" ? 2 : 3)) return;
      unstale(); setDemo(null); setSame(-1);
      setCard({ ...c, [at]: base + k });
      return;
    }
    if (k === "back") { unstale(); setCard({ ...c, [at]: cur.slice(0, -1) }); return; }
    if (k === "clear") { unstale(); setCard({ ...c, [at]: "" }); return; }
    if (k === "enter") {
      if (at === "kg") { setCard({ ...c, cell: "g" }); return; }
      if (cur === "") return;
      finish();
    }
  };
  const openCell = (which: string) => {
    if (!asking || playing.current || locked.current) return;
    setDemo(null); setNudge(-1); setSame(-1);
    setCard({ ...cardRef.current, cell: which });
    api.capture(padKey);
  };
  const pickBag = (id: string) => {
    if (!asking || playing.current || locked.current) return;
    setDemo(null); setNudge(-1); setSame(-1);
    const c = cardRef.current;
    if (c.pick === id) return;
    setCard({ ...c, pick: id });
    api.sfx.tick();
  };
  /* the teacher agent fills the card as a child would: "onions|1|890", ["onions", 1, 890] */
  const fromAgent = (v: any) => {
    const a = Array.isArray(v) ? v.map((x: any) => String(x ?? "")) : String(v ?? "").split("|");
    const hit = bags.find((b: any) => b.id === a[0] || String(b.label).toLowerCase() === String(a[0] || "").toLowerCase());
    api.capture(null); setNudge(-1); setDemo(null);
    staleRef.current = { e, kg: false, g: false };
    setCard({ pick: hit ? hit.id : "", kg: String(a[1] || "").replace(/\D/g, "").slice(0, 2), g: String(a[2] || "").replace(/\D/g, "").slice(0, 3), cell: null });
    return true;
  };
  HOOK.set = asking && kind === "compare" ? fromAgent : null;
  /* the Enter key blinks for a whole card the child has not sent yet (not for the card that just missed) */
  useEffect(() => {
    if (!asking || kind !== "compare") return;
    const cv = [card.pick, card.kg === "" ? "" : String(Number(card.kg)), String(Number(card.g))].join("|");
    const sent = lastSent.current.e === e && lastSent.current.v === cv;
    api.answerReady(!!card.pick && card.g !== "" && !sent);
  }, [S.card, qk, stage, wrong]);

  /* ── every tap on a control: the step's act, or a wrong act reported (the runtime shows the step's hint) ── */
  /* the bags and Break stay live with the keypad open (the picture stays in x 0 to 900). A tap while an act plays never
     reaches the tool on r29 (the runtime holds the working area for the act), so nothing is queued */
  const askTap = (on: string) => {
    if (locked.current || playing.current) return;
    if (kind === "add" && on.indexOf("bag-") === 0) { if (S.placed.indexOf(Number(on.slice(4))) < 0) perform(on); return; }
    if (kind === "take" && on === "break") { if (R("break") < 999) perform(on); return; }
    if (kind === "compare") {
      if (on.indexOf("heavy-") === 0) pickBag(on.slice(6));
      else if (on === "cell-kg") openCell("kg");
      else if (on === "cell-g") openCell("g");
    }
  };
  const tap = (on: string) => {
    if (free) {
      if (playing.current) return;
      if (on.indexOf("fbag-") === 0) freeBag(on.slice(5));
      else if (on === "fadd") freeOp("+");
      else if (on === "ftake") freeOp("-");
      return;
    }
    if (warm) { if (stepOn && on === stepOn) perform(on); else api.did(on); return; }
    if (asking) askTap(on);
  };
  const pressKey = (on: string) => { const t = Date.now(); if (t - lastKey.current < 400) return; lastKey.current = t; tap(on); };
  /* Enter, the agent's check() and the dev solve() perform the CURRENT step; at a card question Enter closes the card */
  /* a physical Enter does a guide step at most once in 400 ms (the keys' own guard), so two quick Enters never pass two steps */
  api.onEnter(stage === "demo" && stepOn ? () => pressKey(stepOn) : asking && kind === "compare" ? () => finish() : null);
  /* the dev solve() calls this again and again: a call that comes while an act plays waits its turn (at most the steps
     left), so a driven walk never drops a step; a child's tap or Enter during an act is ignored as before */
  const pend = useRef(0);
  const stepsLeft = (PHASES[n - 1] && (PHASES[n - 1] as any).steps ? (PHASES[n - 1] as any).steps.length : 0) - ((step || 0) + 1);
  HOOK.demo = () => {
    if (!stepOn) return undefined;
    if (playing.current) { pend.current = Math.min(pend.current + 1, Math.max(0, stepsLeft)); return undefined; }
    return tap(stepOn);
  };
  useEffect(() => { if (stage === "demo" && stepOn && pend.current > 0 && !playing.current) { pend.current -= 1; tap(stepOn); } }, [stepOn, stage]);
  useEffect(() => { pend.current = 0; }, [qk]);

  /* the traceback: lock, redraw the maths step by step on a demo layer, end on the whole right answer, unlock */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free || !item) return;
    const t0 = ty, k = e;
    locked.current = true;
    api.lock(true);
    if (kind === "compare") { closeCell(); staleRef.current = { e: k, kg: true, g: true }; setNudge(-1); }
    const steps: any[] = [];
    /* step 0 redraws the child's own answer in the answer row (plain ink, nothing marked) and holds it to be read */
    for (let s = 0; s <= FIN; s++) steps.push([s === 0 ? 1800 : 1100, () => setDemo({ e: k, d: s, typed: t0 })]);   /* [ms, fn]: fn, then ms */
    tl.run(steps, () => { locked.current = false; api.lock(false); });
  }, [wrong]);
  /* a correction never outlives its question */
  useEffect(() => () => { tl.stop(); if (locked.current) { locked.current = false; api.lock(false); } }, [qk]);
  /* the three grams boxes take three digits; a two-box answer takes at most 3 digits of kilograms and 4 of grams (a
     thousand on the line is the most a wrong sum can show), so the correction redraws the child's own answer legibly */
  useEffect(() => {
    if (!asking) return;
    if (kind === "write") { const s = ty.replace(/\D/g, ""); if (s.length > 3) api.setTyped(s.slice(0, 3)); return; }
    if (kind === "add" || kind === "carry" || kind === "take") {
      const tp = ty.split("|"), a = (tp[0] || "").slice(0, 3), b = tp.length > 1 ? (tp[1] || "").slice(0, 4) : null;
      const nx = b === null ? a : a + "|" + b;
      if (nx !== ty) api.setTyped(nx);
    }
  }, [ty]);
  /* the win line, once per entry */
  const saidWin = useRef("");
  useEffect(() => {
    if (free || !item || stage !== "win" || !item.win) return;
    const k = qk + ":" + e;
    if (saidWin.current === k) return;
    saidWin.current = k;
    api.say(item.win);
  }, [stage, qk]);
  /* phase 4's win (the brief's delight): a weight of exactly the difference drops onto the lighter pan, the beam lifts
     past level, wobbles back, and settles dead level */
  const [winK, setWinK] = useState<any>({ e: -1, k: 0 });
  useEffect(() => {
    if (kind !== "compare" || stage !== "win") return;
    const k = e;
    if (reducedMotion()) { setWinK({ e: k, k: 4 }); return; }
    tl.run([[120, () => setWinK({ e: k, k: 1 })], [520, () => setWinK({ e: k, k: 2 })], [520, () => setWinK({ e: k, k: 3 })], [460, () => setWinK({ e: k, k: 4 })]]);
  }, [stage, qk]);
  const wk = winK.e === e ? winK.k : full && kind === "compare" ? 4 : 0;

  /* the child's own typed answer, redrawn in the answer row as the correction's first frame (a four-digit grams answer
     puts its thousand on the line, with no box) */
  const childAns = dm && kind !== "write" && kind !== "compare" ? (() => {
    const p = slotPartsOf(dm.typed, 2);
    const gv = p[1] === "" || p[1] === null || p[1] === undefined || !/^\d+$/.test(String(p[1])) ? null : Number(p[1]);
    return { kg: String(p[0] ?? ""), kgInk: C.ink, g: wcCellsR(gv), gInk: C.ink };
  })() : null;
  /* ── the frame as it stands now (the child's state, then the correction or the win over it) ── */
  const fs: any = { rows: [], sign: "", carry: false, above: null, rule: false, ans: null, reads: [], labels: [], rings: [] };
  const rowOf = (kg: any, g: any) => ({ kg: kg === null || kg === undefined ? "" : String(kg), g: wcCellsR(g) });
  if (kind === "w-drop") {
    if (R("bag") >= 1) fs.rows = [rowOf(2, 305)];
    else fs.rows = [{ kg: "", g: [] }];
  } else if (kind === "add") {
    const order = S.placed.slice();
    if (d >= 0) [0, 1].forEach((j) => { if (order.indexOf(j) < 0) order.push(j); });
    /* the frame stands empty down to its rule until the bags are tapped in */
    fs.rows = order.map((j: number) => rowOf(bags[j].kg, bags[j].g));
    while (fs.rows.length < 2) fs.rows.push({ kg: "", g: [] });
    fs.sign = "+"; fs.rule = true;
    const sol = wcAddCols(rows);
    if (d >= 1 && d < FIN) {
      const r48 = order.findIndex((j: number) => bags[j].g < 100);
      if (r48 >= 0) fs.rings.push({ x: wcBX(F, 0) - 6, y: wcRowY(F, r48) - 6, w: F.bw + 12, h: F.bh + 12 });
    }
    if (d >= 2) fs.ans = { kg: d >= 3 ? String(sol.kg) : "", g: wcCellsR(sol.g) };
    else if (childAns) fs.ans = childAns;
  } else if (kind === "write") {
    const kg0 = rows[0][0];
    if (full) fs.rows = [{ kg: kg0 === null ? "" : String(kg0), g: wcCellsL(item.answer) }];
    else if (dm) {
      fs.rows = [{ kg: kg0 === null ? "" : String(kg0), g: wcCellsL(dm.typed) }];
      if (dm.d >= 1) fs.reads.push({ r: 0, t: wcReadL(dm.typed) + " " + tx("g"), f: C.ink });
      if (dm.d >= 2) { fs.rows.push({ kg: kg0 === null ? "" : String(kg0), g: wcCellsR(rows[0][1]), lit: true }); fs.reads.push({ r: 1, t: rows[0][1] + " " + tx("g"), f: WC_INK.g }); }
    } else fs.rows = [{ kg: kg0 === null ? "" : String(kg0), g: wcCellsL(ty), lit: asking }];
  } else if (kind === "w-carry" || kind === "carry") {
    fs.rows = rows.map((r: any) => rowOf(r[0], r[1]));
    fs.sign = "+"; fs.rule = true; fs.labels = it.labels || [];
    const sol = wcAddCols(rows);
    if (kind === "w-carry") {
      const pa = R("add"), pc = R("carry");
      const cells = wcCellsR(sol.gs).filter((c: any, i: number) => i < pa && !(pc >= 1 && c.k < 0));
      fs.carry = pc >= 1;
      fs.ans = { kg: pc >= 2 ? String(sol.kg) : "", g: cells };
    } else if (d >= 1) {
      const cells = d >= 2 ? wcCellsR(sol.g) : wcCellsR(sol.gs);
      fs.carry = d >= 2 && sol.carry > 0;
      fs.carryLit = d === 3 && !full;
      fs.ans = { kg: d >= 3 ? String(sol.kg) : "", g: cells };
    } else if (childAns) fs.ans = childAns;
  } else if (kind === "w-break" || kind === "take") {
    fs.rows = rows.map((r: any) => rowOf(r[0], r[1]));
    if (kind === "take") { fs.sign = "−"; fs.rule = true; }
    const P = brkPlan(), nk = P.ak.length;
    const pb = R("break"), po = R("open");
    /* how far the break has gone: the child's own act, or the correction (d >= 1) / the win drawing it whole */
    const whole = d >= 1;
    const vSk = whole || pb >= 1, vAk = (j: number) => whole || pb >= 4 + j;
    const vSg = kind === "w-break" ? po >= 10 : whole || pb >= 4 + nk;
    const vAg = (j: number) => (kind === "w-break" ? po >= 13 + j : whole || pb >= 7 + nk + j);
    if (vSk) fs.rows[0] = { ...fs.rows[0], struck: true, gStruck: vSg };
    const tkS = String(tsol ? tsol.tk : "");
    const akS = tkS.split("").filter((_: any, j: number) => vAk(j)).join("");
    const agS = (tsol ? indian(tsol.tg) : "").split("").filter((_: any, j: number) => vAg(j)).join("");
    if (akS || agS) fs.above = { kg: akS, gs: agS };
    if (kind === "take") {
      const sol = tsol as any;
      if (d >= 2) fs.ans = { kg: d >= 3 ? String(sol.kg) : "", kgInk: WC_INK.left, g: wcCellsR(sol.g), gInk: WC_INK.left };
      else if (childAns) fs.ans = childAns;
      if (d === 1 && !full) fs.rows[0] = { ...fs.rows[0], lit: true };
    }
  } else if (kind === "compare" && cmp) {
    const pickIdx = bags.findIndex((b: any) => b.id === card.pick);
    const order = d >= 2 ? [cmp.h, 1 - cmp.h] : pickIdx >= 0 ? [pickIdx, 1 - pickIdx] : [];
    fs.rows = order.length ? order.map((j: number) => rowOf(bags[j].kg, bags[j].g)) : [{ kg: "", g: [] }, { kg: "", g: [] }];
    if (order.length) { fs.sign = "−"; fs.rule = true; }
    const topIsH = order.length && order[0] === cmp.h;
    if (topIsH && cmp.sol.need && d >= 3) {
      fs.rows[0] = { ...fs.rows[0], struck: true, gStruck: true };
      fs.above = { kg: String(cmp.sol.tk), gs: indian(cmp.sol.tg) };
    }
    if (d >= 4) fs.ans = { kg: String(cmp.sol.kg), kgInk: cmp.sol.kg ? WC_INK.left : WC_ZERO, g: wcCellsR(cmp.sol.g), gInk: WC_INK.left };
    /* the correction compares the kilograms first (both kg figures ringed), and only when they tie, the grams */
    const both = { y: wcRowY(F, 0) - 6, h: F.step + F.bh + 12 };
    if (d === 2 && !full) fs.rings.push({ x: F.kgR - 84, y: both.y, w: 90, h: both.h });
    if (d === 3 && !full && bags[0].kg === bags[1].kg) fs.rings.push({ x: F.gL - 6, y: both.y, w: gw + 12, h: both.h });
  } else if (free) {
    const ord = fp.ord || fp.rows;
    fs.rows = ord.length ? ord.map((id: string) => rowOf(fBag(id).kg, fBag(id).g)) : [{ kg: "", g: [] }];
    while (fs.rows.length < 2) fs.rows.push({ kg: "", g: [] });
    if (fp.opP) {
      fs.sign = fp.opP === "-" ? "−" : "+"; fs.rule = true;
      const top = fBag(ord[0]), bot = fBag(ord[1]);
      if (fp.opP === "+") {
        const sol = wcAddCols([[top.kg, top.g], [bot.kg, bot.g]]), off = sol.carry ? 1 : 0;
        fs.carry = sol.carry > 0 && fp.p >= 1;
        fs.ans = { kg: fp.p >= off + 4 ? String(sol.kg) : "", g: wcCellsR(sol.g).filter((_: any, j: number) => fp.p >= off + 1 + j) };
      } else {
        const sol = wcTakeCols([top.kg, top.g], [bot.kg, bot.g]), off = sol.need ? 2 : 0;
        if (sol.need && fp.p >= 1) { fs.rows[0] = { ...fs.rows[0], struck: true, gStruck: fp.p >= 2 }; fs.above = { kg: String(sol.tk), gs: fp.p >= 2 ? indian(sol.tg) : "" }; }
        fs.ans = { kg: fp.p >= off + 4 ? String(sol.kg) : "", kgInk: WC_INK.left, g: wcCellsR(sol.g).filter((_: any, j: number) => fp.p >= off + 1 + j), gInk: WC_INK.left };
      }
    }
  }

  /* what the host and the agent read back (toolApi.getState); never the answer before it is given */
  api.share({
    phase: n, operation: kind === "add" || kind === "carry" ? "add" : kind === "take" ? "take away" : kind === "compare" ? "compare" : kind === "write" ? "write" : kind,
    rows: fs.rows.filter((r: any) => r.kg !== "" || (r.g && r.g.length)).map((r: any) => (r.kg ? r.kg + " kg " : "") + (r.g || []).map((c: any) => c.ch).join("") + " g"),
    carries: fs.carry ? 1 : 0, breaks: fs.above ? 1 : 0,
    heavier: kind === "compare" ? card.pick || null : null,
    difference: kind === "compare" && full ? String(item.answer).split("|").slice(1).join("|") : null,
    answerCard: kind === "compare" ? { heavier: card.pick, kg: card.kg, g: card.g } : null,
    complete: stage === "idle",
  });

  /* ── drawing ── */
  const live = (asking || warm || free) && !playing.current && !locked.current;
  /* icon: a key that names a bag carries that bag's small picture beside its word (sack or suitcase; a parcel is plain) */
  const keyAt = (id: string, on: string, x: number, y: number, w: number, enabled: boolean, label?: string, icon?: string) => {
    const lab = label || WC_KEY[on] || on;
    /* with a picture the word starts after it (picture x -w/2+8 to -w/2+48, word from -w/2+56), never over it */
    const pic = icon === "sack" || icon === "case", tw = pic ? w - 64 : w - 24;
    return (
      <Key key={"key-" + id} id={id} x={x} y={y} w={w} h={72} C={C} tone="key" disabled={!enabled} onClick={() => pressKey(on)} label={lab}>
        {pic && <g pointerEvents="none">{wcBag(-w / 2 + 8, -24, 40, 48, [], C, T.micro, icon)}</g>}
        {/* a flat (disabled) key keeps its word readable: dark ink on its light face */}
        <text x={pic ? -w / 2 + 56 : 0} y={11} textAnchor={pic ? "start" : "middle"} fontSize={wcFit(tx(lab), T.label, tw)} fontWeight={700} fill={enabled ? toneInk("key", C.ink) : C.ink}>{tx(lab)}</text>
      </Key>
    );
  };
  const panel = () => {
    const out: any[] = [];
    if (kind === "w-drop") {
      const b = WC_BAGS1.w;
      const away = R("bag") > 0 || (S.prog && S.prog.on === "bag");
      if (!away) {
        out.push(<g key="bag">{wcBag(b.x, b.y, b.w, b.h, wcTagLines(bags[0], tx), C, T.label)}</g>);
        out.push(<WcPress key="bagp" id={stepOn === "bag" ? "bag" : "bag-w"} label="the bag of 2,305 grams" x={b.x} y={b.y} w={b.w} h={b.h} onPress={() => tap("bag")} live={warm && live} />);
      }
      const nb = Math.min(8, R("count"));
      countOf(305).forEach((q: any, i: number) => { if (i < nb) out.push(wcBar("c" + i, q.x, q.y, q.w, q.h)); });
      if (R("count") >= 999) out.push(<text key="cl" x={600} y={322} fontSize={T.label} fontWeight={700} fill={WC_INK.g}>{"305 " + tx("g")}</text>);
      if (stepOn === "count") out.push(keyAt("count", "count", WC_KEYBOX.x, WC_KEYBOX.y, WC_KEYBOX.w, live));
    }
    if (kind === "add") {
      bags.forEach((bg: any, j: number) => {
        const b = WC_BAGS1["b" + j];
        const moving = S.prog && S.prog.on === "bag-" + j && S.prog.p < 1;
        if (S.placed.indexOf(j) >= 0 || moving || d >= 1) return;   /* in the frame (the correction and the win put them there) */
        out.push(<g key={"bag" + j}>{wcBag(b.x, b.y, b.w, b.h, wcTagLines(bg, tx), C, T.label)}</g>);
        if (!(d >= 1)) out.push(<WcPress key={"bagp" + j} id={"bag-" + j} label={"bag of " + bg.kg + " kilograms " + bg.g + " grams"} x={b.x} y={b.y} w={b.w} h={b.h} onPress={() => tap("bag-" + j)} live={asking && live} />);
      });
    }
    if (kind === "write") {
      const b = WC_BAGS1.t;
      out.push(<g key="bag">{wcBag(b.x, b.y, b.w, b.h, wcTagLines(bags[0], tx), C, T.label)}</g>);
    }
    if (kind === "w-carry") {
      if (stepOn === "add" || stepOn === "carry") out.push(keyAt(stepOn, stepOn, WC_KEYBOX.x, WC_KEYBOX.y, WC_KEYBOX.w, live));
    }
    if (kind === "w-break" || kind === "take") {
      const P = brkPlan(), nk = P.ak.length, allN = P.sk.length + nk + P.sg.length + P.ag.length;
      const pb = R("break"), po = R("open");
      const whole = d >= 1;
      const showW = kind === "w-break" ? pb >= 4 && po < 999 && po < 9 : (whole ? false : pb >= 3 + nk && pb < allN + 9 && pb < 999);
      const cuts = kind === "w-break" ? Math.min(9, po) : Math.max(0, Math.min(9, pb - allN));
      const showBars = kind === "w-break" ? po >= 9 : whole || pb >= allN + 9;
      if (showW) {
        out.push(<g key="kw">{wcWeight(KW.x, KW.y, KW.w, KW.h, WC_KG, shade(WC_KG, 0.3))}</g>);
        out.push(<text key="kwt" x={KW.x + KW.w / 2} y={KW.y + KW.h / 2 + 12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill="#FFFFFF">{"1 " + tx("kg")}</text>);
        cutXs.forEach((x, i) => { if (i < cuts) out.push(<line key={"cut" + i} x1={x} y1={KW.y + 4} x2={x} y2={KW.y + KW.h - 4} stroke="#FFFFFF" strokeWidth={3} />); });
      }
      if (showBars) {
        Array.from({ length: 10 }).forEach((_: any, i: number) => out.push(wcBar("bar" + i, 596 + i * 28, KW.y, 20, KW.h)));
        out.push(<text key="bart" x={596 + 4.5 * 28 + 10} y={KW.y + KW.h + 40} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={WC_INK.g}>{indian(1000) + " " + tx("g")}</text>);
      }
      if (kind === "w-break" && (stepOn === "break" || stepOn === "open")) out.push(keyAt(stepOn, stepOn, WC_KEYBOX.x, WC_KEYBOX.y, WC_KEYBOX.w, live));
      if (kind === "take" && asking && pb < 999 && !whole) out.push(keyAt("break", "break", WC_KEYBOX.x, WC_KEYBOX.y, WC_KEYBOX.w, live && !(S.prog && S.prog.on === "break")));
    }
    return out;
  };

  /* phase 4's warm-up: the balance alone, the bags and the 200 g weight on the floor */
  const levelBoard = () => {
    const B = WC_BW, pw = R("weigh"), lv = R("level") >= 1;
    const onL = pw >= 1, onR = pw >= 3;
    const theta = onL && onR && !lv ? 10 : onL && !onR ? -12 : 0;
    const bagOn = (side: number) => (side ? onR : onL) ? wcBag(-B.bw / 2, B.S - B.bh - 2, B.bw, B.bh, wcTagLines(bags[side], tx), C, T.label, "sack", true) : null;
    /* the 200 g stands on the pan's flat below the tag; its value is written on a chip under the pan's name plate */
    const wt = (side: number) => (side === 0 && lv ? (
      <g>{wcWeight(-26, B.S - 36, 52, 33, WC_LEFT, shade(WC_LEFT, 0.35))}</g>
    ) : null);
    const out: any[] = [];
    out.push(<g key="bal">{wcBalance(B, theta, (side: number) => <g>{bagOn(side)}{wt(side)}</g>, C, (side: number) => (
      <g>
        <rect x={-B.PW / 2 + 10} y={B.S + 20} width={B.PW - 20} height={54} rx={10} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
        <text x={0} y={B.S + 58} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(bags[side].label)}</text>
        {side === 0 && lv && (
          <g>
            <rect x={-100} y={B.S + 80} width={200} height={36} rx={10} fill="#FFFFFF" stroke={shade(WC_LEFT, 0.35)} strokeWidth={2.5} />
            <text x={0} y={B.S + 108} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={WC_INK.left}>{"200 " + tx("g")}</text>
          </g>
        )}
      </g>
    ))}</g>);
    const movingRice = S.prog && S.prog.on === "weigh" && pw < 1, movingSugar = S.prog && S.prog.on === "weigh" && pw === 2;
    const named = (bg: any) => [{ t: tx(bg.label), f: C.ink }, ...wcTagLines(bg, tx)];
    if (!onL && !movingRice) { const b = WC_WFLOOR.rice; out.push(<g key="fr">{wcBag(b.x, b.y - 30, b.w, b.h + 30, named(bags[0]), C, T.micro)}</g>); }
    if (!onR && !movingSugar) { const b = WC_WFLOOR.sugar; out.push(<g key="fs">{wcBag(b.x, b.y - 30, b.w, b.h + 30, named(bags[1]), C, T.micro)}</g>); }
    if (!lv && !(S.prog && S.prog.on === "level")) {
      const b = WC_WFLOOR.wt;
      out.push(<g key="fw">{wcWeight(b.x, b.y, b.w, b.h, WC_LEFT, shade(WC_LEFT, 0.35))}
        <text x={b.x + b.w / 2} y={b.y - 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={WC_INK.left}>{"200 " + tx("g")}</text></g>);
    }
    if (stepOn === "weigh" || stepOn === "level") out.push(keyAt(stepOn, stepOn, 330, 432, 240, live));
    return <g>{out}</g>;
  };

  /* phase 4's questions and free play: the balance beside the frame */
  const sideBoard = () => {
    const B = WC_B4;
    let pans: any[] = [null, null], theta = 0, ring = -1, diffOn = -1, diffLabel = "";
    if (kind === "compare" && cmp) {
      pans = bags;
      const tip = cmp.h === 1 ? 10 : -10;
      theta = wk >= 4 ? 0 : wk === 3 ? -tip * 0.3 : wk === 2 ? -tip * 0.5 : tip;
      if (d >= 1 && !full) ring = cmp.h;
      if (wk >= 2) diffOn = 1 - cmp.h;   /* its label stands under the frame (cmpLabel), clear of the pans */
    } else if (free) {
      const ids = fp.rows;
      pans = [ids[0] ? fBag(ids[0]) : null, ids[1] ? fBag(ids[1]) : null];
      if (pans[0] && pans[1]) {
        const hv = wcHeavier(pans[0], pans[1]);
        theta = fp.lvl ? 0 : hv > 0 ? -10 : hv < 0 ? 10 : 0;
        if (fp.lvl) {
          diffOn = hv > 0 ? 1 : 0;
          const top = hv > 0 ? pans[0] : pans[1], bot = hv > 0 ? pans[1] : pans[0], sol = wcTakeCols([top.kg, top.g], [bot.kg, bot.g]);
          diffLabel = wcMeasure(sol.kg, sol.g, tx);
        }
      } else if (pans[0]) theta = -12;
    }
    const content = (side: number) => {
      const b = pans[side];
      return (
        <g>
          {b && wcBag(-B.bw / 2, B.S - B.bh - 2, B.bw, B.bh, wcTagLines(b, tx), C, T.micro, b.look || "sack", true)}
          {/* the difference stands on the pan's flat, below the tag (its value on a chip under the name plate) */}
          {side === diffOn && (
            <g>
              {wcWeight(-24, B.S - 33, 48, 30, WC_LEFT, shade(WC_LEFT, 0.35))}
            </g>
          )}
          {/* the ring takes in the bag AND its name plate, so it never cuts across the plate */}
          {side === ring && <rect x={-B.PW / 2 - 8} y={B.S - B.bh - 12} width={B.PW + 16} height={B.bh + 92} rx={16} fill="none" stroke={C.accent} strokeWidth={5} />}
        </g>
      );
    };
    const below = (side: number) => (kind === "compare" && pans[side] ? (
      <g>
        <rect x={-86} y={B.S + 20} width={172} height={54} rx={10} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
        <text x={0} y={B.S + 58} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(pans[side].label)}</text>
        {side === diffOn && cmp && wk >= 4 && (
          <g>
            <rect x={-92} y={B.S + 78} width={184} height={33} rx={10} fill="#FFFFFF" stroke={shade(WC_LEFT, 0.35)} strokeWidth={2.5} />
            {/* at the 28 floor a Hindi or Gujarati value is as wide as the chip: it is fitted to 168, never smaller in size */}
            <text x={0} y={B.S + 104} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={WC_INK.left}
              textLength={wcWidth(wcMeasure(cmp.sol.kg, cmp.sol.g, tx), T.micro) > 168 ? 168 : undefined} lengthAdjust="spacingAndGlyphs">{wcMeasure(cmp.sol.kg, cmp.sol.g, tx)}</text>
          </g>
        )}
      </g>
    ) : null);
    const out: any[] = [<g key="bal">{wcBalance(B, theta, content, C, below)}</g>];
    if (diffLabel) out.push(
      <g key="dlab">
        <rect x={B.px - 140} y={B.base - 46} width={280} height={40} rx={10} fill="#FFFFFF" stroke={shade(WC_LEFT, 0.35)} strokeWidth={2} />
        <text x={B.px} y={B.base - 17} textAnchor="middle" fontSize={wcFit(diffLabel, T.micro, 264)} fontWeight={700} fill={WC_INK.left}>{diffLabel}</text>
      </g>
    );
    if (free) {
      WC_FREE_BAGS.forEach((bg: any, i: number) => {
        const b = fShelf(i), on = fp.rows.indexOf(bg.id) >= 0, moving = fp.moving === bg.id;
        if (on || moving) { out.push(<rect key={"fe" + i} x={b.x + 6} y={b.y + 6} width={b.w - 12} height={b.h - 12} rx={14} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="8 8" />); return; }
        out.push(<g key={"fb" + i}>{wcBag(b.x, b.y, b.w, b.h, wcTagLines(bg, tx), C, T.micro)}</g>);
        out.push(<WcPress key={"fp" + i} id={"fbag-" + bg.id} label={"bag of " + bg.kg + " kilograms " + bg.g + " grams"} x={b.x} y={b.y} w={b.w} h={b.h} onPress={() => tap("fbag-" + bg.id)} live={live} />);
      });
      if (fp.rows.length === 2 && !fp.op && !fp.opP) {
        out.push(keyAt("fadd", "fadd", 14, 432, 196, live));
        out.push(keyAt("ftake", "ftake", 222, 432, 196, live));
      }
    }
    return <g>{out}</g>;
  };

  /* the card: two blanks, which bag is heavier (a key for each bag) and by how much (kg and g cells lent the pad) */
  const cardDraw = () => {
    if (kind !== "compare" || !cmp) return null;
    /* two columns, each title on its own band: the heavier bag's two keys stacked at the left, the kg and g cells stacked
       at the right; the titles' baselines sit 42 below the card's edge, so a Hindi or Gujarati matra clears the outline */
    const K = WC_CARD, act = captured ? card.cell : null;
    const cellBox = (which: string) => (which === "kg" ? { x: K.x + 236, y: K.y + 52, w: 104, h: 72 } : { x: K.x + 236, y: K.y + 132, w: 140, h: 72 });
    const keyW = 212;
    const out: any[] = [];
    out.push(<rect key="card" x={K.x} y={K.y} width={K.w} height={K.h} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2.5} />);
    out.push(<line key="cdiv" x1={K.x + 228} y1={K.y + 14} x2={K.x + 228} y2={K.y + K.h - 14} stroke={C.rule} strokeWidth={2} />);
    out.push(<text key="hh" x={K.x + 14} y={K.y + 42} fontSize={wcFitT(tx("heavier"), T.label, 206)} fontWeight={700} fill={C.ink}>{tx("heavier")}</text>);
    bags.forEach((bg: any, j: number) => {
      const x = K.x + 10, y = K.y + 52 + j * 80, on = card.pick === bg.id;
      out.push(keyAt("heavy-" + bg.id, "heavy-" + bg.id, x, y, keyW, asking && live, bg.label, bg.look || "sack"));
      if (on) out.push(<rect key={"hr" + j} x={x - 5} y={y - 5} width={keyW + 10} height={82} rx={18} fill="none" stroke={WC_INK.left} strokeWidth={5} pointerEvents="none" />);
    });
    out.push(<text key="bh" x={K.x + 236} y={K.y + 42} fontSize={wcFitT(tx("by how much"), T.label, 204)} fontWeight={700} fill={C.ink}>{tx("by how much")}</text>);
    ["kg", "g"].forEach((which: string) => {
      const b = cellBox(which), v = String(card[which] || ""), on = act === which;
      out.push(<rect key={"cb" + which} x={b.x} y={b.y} width={b.w} height={b.h} rx={12} fill="#FFFFFF" stroke={on ? C.accent : tint(C.ink, 0.45)} strokeWidth={on ? 4 : 2.5} />);
      if (v) out.push(<text key={"cv" + which} x={b.x + b.w / 2} y={b.y + 56} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={WC_INK.left}>{v}</text>);
      if (on) out.push(<rect key={"cc" + which} x={b.x + b.w / 2 + (v ? v.length * 17 + 4 : -2)} y={b.y + 14} width={4} height={48} fill={C.ink} />);
      out.push(<text key={"cu" + which} x={b.x + b.w + 10} y={b.y + 52} fontSize={T.label} fontWeight={700} fill={which === "kg" ? WC_INK.kg : WC_INK.g}>{tx(which)}</text>);
      out.push(<WcPress key={"cp" + which} id={"cell-" + which} label={which === "kg" ? "the kilograms of the difference" : "the grams of the difference"} x={b.x} y={b.y} w={b.w} h={b.h}
        onPress={() => tap("cell-" + which)} live={asking && live} passEnter={!!captured} />);
    });
    return <g>{out}</g>;
  };

  /* the one invite: on the control the guide step waits for (none while a question is open, save the card's refusal) */
  const invite = () => {
    if (warm && stepOn === "bag") { const b = WC_BAGS1.w; return <Invite x={b.x + b.w / 2} y={b.y + b.h / 2} w={b.w} h={b.h} rx={18} C={C} />; }
    if (warm && stepOn && WC_KEY[stepOn]) {
      const kb = kind === "w-level" ? { x: 330, y: 432, w: 240 } : WC_KEYBOX;
      return <Invite x={kb.x + kb.w / 2} y={kb.y + 36} w={kb.w} h={72} rx={18} C={C} />;
    }
    if (asking && kind === "compare" && same === e) return <Invite x={WC_CARD.x + WC_CARD.w / 2} y={WC_CARD.y + WC_CARD.h / 2} w={WC_CARD.w - 20} h={WC_CARD.h - 20} rx={20} C={C} />;
    if (asking && kind === "compare" && nudge === e && !card.pick) return <Invite x={WC_CARD.x + 116} y={WC_CARD.y + 128} w={214} h={150} rx={18} C={C} />;
    return null;
  };

  /* phase 4's answer in words under the frame, at the end of a correction and at the win: the heavier bag, and by how much */
  const cmpLabel = () => {
    if (kind !== "compare" || !cmp || d < 4) return null;
    const plate = tx("heavier") + ": " + tx(cmp.H.label), ms = wcMeasure(cmp.sol.kg, cmp.sol.g, tx);
    const top = wcAnsY(F, 2) + F.bh + 16;
    return (
      <g pointerEvents="none">
        <rect x={8} y={top} width={F.w - 16} height={88} rx={14} fill="#FFFFFF" stroke={shade(WC_LEFT, 0.35)} strokeWidth={2.5} />
        <text x={F.w / 2} y={top + 38} textAnchor="middle" fontSize={wcFit(plate, T.label, F.w - 40)} fontWeight={700} fill={C.ink}>{plate}</text>
        <text x={F.w / 2} y={top + 76} textAnchor="middle" fontSize={wcFit(ms, T.label, F.w - 40)} fontWeight={700} fill={WC_INK.left}>{ms}</text>
      </g>
    );
  };
  const showFrame = kind !== "w-level";
  return (
    <g transform={`translate(${ox},0)`}>
      {/* a one-row grams question draws its frame 1.3 times as big (x 0 to 702), the bag beside it, so the last bench reads it */}
      {showFrame && <g pointerEvents="none" transform={kind === "write" ? "scale(1.3)" : undefined}>{wcFrame(F, fs, C, tx)}</g>}
      {kind === "w-level" ? levelBoard() : null}
      {kind === "compare" || free ? sideBoard() : null}
      {panel()}
      {cardDraw()}
      {cmpLabel()}
      {invite()}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: the weight as the frame writes it,
   the kilograms blue, three grams boxes with the zeros in front grey (and the heavier bag's name on phase 4) */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const item: any = it || last.it || (n && PHASES[n - 1] ? (PHASES[n - 1] as any).items[last.item] : null) || {};
  let kg = "", cells: any[] = [], name = "";
  if (item.kind === "compare") {
    const a = String(Array.isArray(last.value) ? last.value.join("|") : last.value).split("|");
    name = tx(wcLabelOf(a[0])); kg = String(Number(a[1] || 0)); cells = wcCellsR(Number(a[2] || 0));
  } else if (item.kind === "write") {
    kg = item.rows && item.rows[0] && item.rows[0][0] !== null ? String(item.rows[0][0]) : "";
    cells = wcCellsL(String(last.value));
  } else {
    const p = slotPartsOf(last.value, 2);
    kg = String(p[0] ?? ""); cells = wcCellsR(p[1] === "" || p[1] === undefined ? null : Number(p[1]));
  }
  const ink = item.kind === "take" || item.kind === "compare" ? WC_INK.left : null;
  /* one row of the frame, sized to the row's height: the kilograms, the line, three grams boxes (and on phase 4 a small
     balance tipped toward the heavier bag, its bag ringed, in place of the bag's name: no words to translate) */
  const cmpT = item.kind === "compare" && (item.bags || []).length === 2;
  const bh = Math.max(36, Math.min(52, h - 14)), top = (h - bh) / 2;
  const x0 = cmpT ? 96 : 0, bw = cmpT ? 32 : 40, gap = cmpT ? 3 : 6;
  const bar = x0 + (cmpT ? 26 : 88), bx = (k: number) => bar + (cmpT ? 6 : 8) + k * (bw + gap);
  const dsz = cmpT ? T.micro : T.label;
  let tilt = 0, heavySide = -1;
  if (cmpT) { heavySide = wcHeavier(item.bags[0], item.bags[1]) > 0 ? 0 : 1; tilt = heavySide ? 7 : -7; }
  const px = 48, py = Math.max(10, h / 2 - 16);
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {cmpT && (
        <g>
          <rect x={px - 3} y={py} width={6} height={h - py - 8} fill={CONTENT.line} />
          <line x1={px - 26} y1={py - tilt} x2={px + 26} y2={py + tilt} stroke={CONTENT.line} strokeWidth={5} strokeLinecap="round" />
          {[0, 1].map((sd) => {
            const x = px + (sd ? 26 : -26), y = py + (sd ? tilt : -tilt) + 24;
            return (
              <g key={sd}>
                <line x1={x} y1={y - 24} x2={x} y2={y - 14} stroke={CONTENT.line} strokeWidth={2} />
                <rect x={x - 9} y={y - 16} width={18} height={16} rx={5} fill={WC_TAN.body} stroke={sd === heavySide ? WC_INK.left : WC_TAN.edge} strokeWidth={sd === heavySide ? 3.5 : 2} />
                <path d={`M ${x - 13} ${y} Q ${x} ${y + 8} ${x + 13} ${y} Z`} fill={tint(C.rule, 0.35)} stroke={CONTENT.line} strokeWidth={2} />
              </g>
            );
          })}
        </g>
      )}
      <line x1={bar} y1={top} x2={bar} y2={top + bh} stroke={CONTENT.line} strokeWidth={3} />
      <text x={bar - 8} y={top + bh / 2 + dsz * 0.36} textAnchor="end" fontSize={cmpT ? T.label : T.prompt} fontWeight={700} fill={ink || WC_INK.kg}>{kg}</text>
      {[0, 1, 2].map((k) => <rect key={k} x={bx(k)} y={top} width={bw} height={bh} rx={7} fill="#FFFFFF" stroke={tint(C.ink, 0.45)} strokeWidth={2} />)}
      <text y={top + bh / 2 + dsz * 0.36} textAnchor="middle" fontSize={dsz} fontWeight={700}>
        {cells.filter((c: any) => c.k >= 0).map((c: any, j: number) => <tspan key={j} x={bx(c.k) + bw / 2} fill={c.grey ? WC_ZERO : ink || WC_INK.g}>{c.ch}</tspan>)}
      </text>
    </g>
  );
}

function WeightColumns(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b) */
      board: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d, PATTERNS.md §16): no question bar, only its key at the top right; the
         working area is 64,108, 1472 x 520 and the key's corner is props.box.key (nothing of the picture runs under it) */
      keyOnly: true,
      /* the wide keypad (LAYOUT.md §1b, PATTERNS.md 9g): the picture is one 900-wide board, so it fits x 64 to 964 */
      bigPad: true,
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself */
      nextKey: true,
      /* NAV DOTS (LAYOUT.md §1d): one small clickable dot per phase */
      navDots: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key */
      StartArt, START_HOOK,
      }} />
  );
}

export default WeightColumns;
