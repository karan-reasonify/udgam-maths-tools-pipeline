/* ═══ M2.S4.T8.C35.2D1 · capacity_columns · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, the sound effects, the printed bubble, scoring, the
   events, idle and restart. THE LESSON IS SILENT (runtime r30): nothing is spoken; every line is
   printed on the bubble, which is the guide (it instructs; after a wrong act or answer the hint shows UNDER the
   pinned instruction and stays until the child acts again; r34). The lesson is action-driven: nothing moves
   on unless the child acts (a tap, a key, an answer); after a right answer the next question follows its
   short celebration by itself. The header's Hint key (r35) shows the hint on demand.
   This template is the FULL NEW STYLE and is used for a chapter whose pinned runtime is silent (a voiced runtime, r21
   and before, is scaffolded from lib/build/skeleton.voiced.tsx instead). Blocks that a given runtime has no support for
   are left out when `scaffold` writes this file (board, start page, theme).
   NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md and docs/PATTERNS.md.
   Every English line the tool prints, in its data or drawn by Work (tx("...")), has a Hindi and a
   Gujarati entry in TR once the English is final (check's tr-coverage row lists what is missing).
   THE NEW LOOK (the owner, 2026-10-16; docs/LAYOUT.md §1d-§1e, docs/PATTERNS.md §15-§16): no question bar (only the blinking key at the top
   right), four small clickable phase dots, a big ONE-sentence bubble, digits as written, every act performed on screen (api.act). The question
   lives ONLY in the bubble: each item's `say` is the whole question in one sentence. Opt out (delete `keyOnly: true` / `navDots: true` below)
   only with a reason stated in the report.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "capacity_columns";
const MEDIA_ID = "M2.S4.T8.C35.2D1";
const TOOL_NAME = "Capacity Columns";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (not shown: phase 1 has guide steps) */
const OPENING = ["Litres and millilitres in columns: how many boxes do the millilitres take?"];
/* the whole-tool line (not shown from r44; kept for the sidecar) */
const FINISH_LINE = "Every litre carried or broken as a thousand, and every count poured first.";
/* printed when the child opens Free play: exactly what free play offers (the pouring bay) */
const FREE_LINE = "Free play: pick a bottle, then pour any jar into it and count the pourings.";

/* THE START PAGE (runtime r28; docs/LAYOUT.md §1c): a tank, a bucket, jars and a bottle (no column frame:
   the frame's three boxes would answer the hook) */
const START_HOOK = "How many boxes do the millilitres take?";
function StartArt({ box, C, lang, tx }: any) {
  const H = box.h;
  return (
    <g pointerEvents="none">
      <rect x={70} y={H - 34} width={box.w - 140} height={16} rx={8} fill={shade(C.panel, 0.14)} />
      {ccTankPic({ x: 170, y: 24, w: 200, h: H - 64 }, 0.62, 0, "tank", C)}
      {ccBucketPic({ x: 450, y: H - 150, w: 190, h: 116 }, C)}
      {ccJarPic(700, H - 34, 250, 0.7, "jar", C)}
      {ccJarPic(800, H - 34, 400, 0, "mug", C)}
      {ccJarPic(905, H - 34, 150, 0.5, "glass", C)}
      {ccBottleSkin({ id: "sa", cx: 1060, top: 30, bot: H - 34 }, 0.35, C)}
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, byte for byte, and the runtime looks each printed or drawn line
   up in it (Work draws its own words through tx("...")). Fill it AFTER the English is final and reviewed:
   `check` (tr-coverage) lists every printed line still missing. Nothing is baked: the lesson is silent.
   Empty = the tool runs in English only. */
const TR: any = {
  hi: {
    "Capacity Columns": "धारिता के स्तंभ",
    "Litres and millilitres in columns: how many boxes do the millilitres take?": "स्तंभों में लीटर और मिलीलीटर: मिलीलीटर कितने खाने लेते हैं?",
    "Every litre carried or broken as a thousand, and every count poured first.": "हर हज़ार मिलीलीटर से एक लीटर का हासिल बना या एक लीटर टूटा, और हर गिनती पहले उंडेलकर मिली।",
    "Free play: pick a bottle, then pour any jar into it and count the pourings.": "मुक्त खेल: बोतल चुनो, फिर कोई भी जार उसमें उंडेलो और बार गिनो।",
    "How many boxes do the millilitres take?": "मिलीलीटर कितने खाने लेते हैं?",
    /* phase 1 */
    "Three places for millilitres": "मिलीलीटर के तीन स्थान",
    "Tap the unit switch to show kilograms and grams.": "किलोग्राम और ग्राम दिखाने के लिए मात्रक स्विच दबाओ।",
    "The unit switch is the strip at the top.": "मात्रक स्विच ऊपर वाली पट्टी है।",
    "Tap the switch again for kilometres and metres.": "किलोमीटर और मीटर के लिए स्विच फिर से दबाओ।",
    "Each tap moves the switch on by one pair.": "हर बार दबाने पर स्विच अगली जोड़ी पर जाता है।",
    "Tap it once more to come back to litres and millilitres.": "लीटर और मिलीलीटर पर लौटने के लिए एक बार और दबाओ।",
    "The litres pair is the first one on the strip.": "लीटर वाली जोड़ी पट्टी पर पहली है।",
    "A number of millilitres ends in the ones box, the last of the three.": "मिलीलीटर की संख्या इकाई के खाने में खत्म होती है, तीनों में आखिरी।",
    "Fill the boxes in front of it with zeros, so every box holds a digit.": "उसके आगे के खाने शून्य से भरो, ताकि हर खाने में एक अंक हो।",
    "Beside litres the millilitres take three places, as grams and metres do.": "लीटर के साथ मिलीलीटर तीन स्थान लेते हैं, जैसे ग्राम और मीटर लेते हैं।",
    "You learned: millilitres take three places beside litres.": "तुमने सीखा: लीटर के साथ मिलीलीटर तीन स्थान लेते हैं।",
    "Tap the box for the 4 of 40 mL, then add 23 L 40 mL and 15 L 685 mL.": "40 मिली के 4 का खाना दबाओ, फिर 23 ली 40 मिली और 15 ली 685 मिली जोड़ो।",
    "23 L 40 mL + 15 L 685 mL": "23 ली 40 मिली + 15 ली 685 मिली",
    "40 mL is 4 tens and no ones, so its 4 goes in the tens box.": "40 मिली में 4 दहाई हैं और इकाई नहीं, इसलिए 4 दहाई के खाने में जाता है।",
    "Add the millilitres column first, then add 23 L and 15 L.": "पहले मिलीलीटर का स्तंभ जोड़ो, फिर 23 ली और 15 ली जोड़ो।",
    "Where does the 4 of 40 mL go: the hundreds box or the tens box?": "40 मिली का 4 कहाँ जाएगा: सैकड़े के खाने में या दहाई के खाने में?",
    "Yes, 40 mL is written 040, and the sum is 38 L 725 mL.": "हाँ, 40 मिली को 040 लिखते हैं, और योग 38 ली 725 मिली है।",
    "How is 8 mL written in the millilitres boxes?": "मिलीलीटर के खानों में 8 मिली कैसे लिखते हैं?",
    "8 mL in the boxes": "खानों में 8 मिली",
    "8 mL is a small amount: which box holds the ones?": "8 मिली थोड़ा-सा है: इकाई किस खाने में आती है?",
    "Right, 8 mL is 008: two zeros hold the empty places.": "सही, 8 मिली 008 है: दो शून्य खाली स्थान भरते हैं।",
    "19 L 65 mL goes in the frame: what goes in its millilitres boxes?": "19 ली 65 मिली ढाँचे में जाता है: उसके मिलीलीटर के खानों में क्या आएगा?",
    "mL boxes of 19 L 65 mL": "19 ली 65 मिली के मिली खाने",
    "Read your three boxes aloud: do they say 65 mL?": "अपने तीनों खाने ज़ोर से पढ़ो: क्या वे 65 मिली कहते हैं?",
    "Good, 65 mL is 065, with a zero in the hundreds box.": "बढ़िया, 65 मिली 065 है, सैकड़े के खाने में शून्य के साथ।",
    /* phase 2 */
    "Carrying and borrowing a litre": "एक लीटर का हासिल और उधार",
    "Tap Add to add 600 mL and 700 mL in the millilitres column.": "मिलीलीटर स्तंभ में 600 मिली और 700 मिली जोड़ने के लिए ‘जोड़ो’ दबाओ।",
    "The Add key is at the bottom of the board.": "‘जोड़ो’ बटन बोर्ड के नीचे है।",
    "1,300 mL will not fit in three boxes: tap Carry to carry 1 L.": "1,300 मिली तीन खानों में नहीं आता: 1 ली का हासिल लेने को ‘हासिल’ दबाओ।",
    "Now the Carry key is in the same place.": "अब ‘हासिल’ बटन उसी जगह है।",
    "Tap Add again to add the litres, with the carried litre.": "हासिल वाले लीटर के साथ लीटर जोड़ने के लिए फिर ‘जोड़ो’ दबाओ।",
    "The carried litre sits over the litres column.": "हासिल वाला लीटर, लीटर के स्तंभ के ऊपर है।",
    "In the take-away, 200 mL is too few to take 500 mL: tap Break.": "घटाने में 200 मिली में से 500 मिली नहीं घटता: ‘तोड़ो’ दबाओ।",
    "The Break key sits where Add and Carry did.": "‘तोड़ो’ बटन वहीं है जहाँ ‘जोड़ो’ और ‘हासिल’ थे।",
    "Tap Take away to work the millilitres, then the litres.": "पहले मिलीलीटर, फिर लीटर घटाने के लिए ‘घटाओ’ दबाओ।",
    "Now the millilitres on top are enough.": "अब ऊपर के मिलीलीटर काफ़ी हैं।",
    "Is a litre carried here, or is one broken to borrow?": "यहाँ एक लीटर का हासिल बनता है, या उधार के लिए एक लीटर टूटता है?",
    "Work the millilitres column first, then the litres column.": "पहले मिलीलीटर का स्तंभ हल करो, फिर लीटर का स्तंभ।",
    "A thousand millilitres carry as one litre, and a litre breaks into a thousand.": "हज़ार मिलीलीटर से एक लीटर का हासिल बनता है, और एक लीटर हज़ार में टूटता है।",
    "You learned: 1,000 mL carry as 1 L, and 1 L breaks into 1,000 mL.": "तुमने सीखा: 1,000 मिली से 1 ली का हासिल बनता है, और 1 ली टूटकर 1,000 मिली।",
    "Add 36 L 575 mL and 48 L 690 mL.": "36 ली 575 मिली और 48 ली 690 मिली जोड़ो।",
    "36 L 575 mL + 48 L 690 mL": "36 ली 575 मिली + 48 ली 690 मिली",
    "Can three boxes hold more than 999 mL?": "क्या तीन खानों में 999 मिली से ज़्यादा आ सकता है?",
    "Yes, 1,265 mL is 1 L 265 mL, so the sum is 85 L 265 mL.": "हाँ, 1,265 मिली = 1 ली 265 मिली, इसलिए योग 85 ली 265 मिली है।",
    "Add 14 L 380 mL, 26 L 745 mL and 9 L 90 mL.": "14 ली 380 मिली, 26 ली 745 मिली और 9 ली 90 मिली जोड़ो।",
    "Add the three amounts": "तीनों मात्राएँ जोड़ो",
    "Where does each full thousand millilitres go?": "हर पूरा हज़ार मिलीलीटर कहाँ जाता है?",
    "Right, the millilitres make 1,215, so 1 L is carried: 50 L 215 mL.": "सही, मिलीलीटर 1,215 होते हैं, तो 1 ली का हासिल बना: 50 ली 215 मिली।",
    "Two cows give 12 L 750 mL and 14 L 380 mL of milk: how much more does one give?": "दो गायें 12 ली 750 मिली और 14 ली 380 मिली दूध देती हैं: एक कितना ज़्यादा?",
    "How much more milk?": "कितना दूध ज़्यादा?",
    "Put the larger amount on top: can 750 mL come out of 380 mL?": "बड़ी मात्रा ऊपर रखो: क्या 380 मिली में से 750 मिली निकल सकते हैं?",
    "Good, the 2nd cow gives 1 L 630 mL more milk.": "बढ़िया, दूसरी गाय 1 ली 630 मिली ज़्यादा दूध देती है।",
    /* phase 3 */
    "How much is left": "कितना बचा",
    "Tap Run to play the first line of the story on the tank.": "कहानी की पहली पंक्ति टंकी पर चलाने के लिए ‘चलाओ’ दबाओ।",
    "The Run key is under the story card.": "‘चलाओ’ बटन कहानी कार्ड के नीचे है।",
    "Tap Run again: this line adds water to the tank.": "फिर ‘चलाओ’ दबाओ: यह पंक्ति टंकी में पानी डालती है।",
    "Play the story one line at a time.": "कहानी एक बार में एक पंक्ति चलाओ।",
    "Now tap the words that tell how much water was used.": "अब वे शब्द दबाओ जो बताएँ कि कितना पानी इस्तेमाल हुआ।",
    "The word keys stand in a column at the right.": "शब्दों के बटन दाईं ओर एक कतार में हैं।",
    "Play the story in its order: where does the level settle?": "कहानी उसके क्रम में चलाओ: स्तर कहाँ रुकता है?",
    "Take away each amount used and add each amount added, line by line.": "हर पंक्ति पर, इस्तेमाल हुई मात्रा घटाओ और डाली गई मात्रा जोड़ो।",
    "Work a story in its order, and answer in the question's own words.": "कहानी उसके क्रम में हल करो, और उत्तर प्रश्न के अपने शब्दों में दो।",
    "You learned: work a story in its order, and answer in its own words.": "तुमने सीखा: कहानी उसके क्रम में हल करो, उत्तर उसके शब्दों में दो।",
    "A tank holds 50 L and 32 L 650 mL is used: how much water is left in it?": "टंकी में 50 ली है और 32 ली 650 मिली इस्तेमाल होता है: उसमें कितना पानी बचा?",
    "Water left in the tank?": "टंकी में कितना पानी बचा?",
    "Check your words against the question: what must the answer say?": "अपने शब्द प्रश्न से मिलाओ: उत्तर को क्या कहना चाहिए?",
    "Take 650 mL from the 1,000 mL first, then take 32 L from the 49 L.": "पहले 1,000 मिली में से 650 मिली घटाओ, फिर 49 ली में से 32 ली।",
    "Think of 50 L as 49 L 1,000 mL, then pick the words.": "50 ली को 49 ली 1,000 मिली समझो, फिर शब्द चुनो।",
    "Yes, 49 L 1,000 mL less 32 L 650 mL leaves 17 L 350 mL of water.": "हाँ, 49 ली 1,000 मिली से 32 ली 650 मिली घटाकर 17 ली 350 मिली पानी बचा।",
    "A jar holds 5 L of juice and 2 L 640 mL is poured out: how much juice is left?": "जार में 5 ली रस है और 2 ली 640 मिली उंडेला जाता है: कितना रस बचा?",
    "Juice left in the jar?": "जार में कितना रस बचा?",
    "5 L is the same as 4 L and 1,000 mL.": "5 ली उतना ही है जितना 4 ली और 1,000 मिली।",
    "Right, 2 L 360 mL of juice is left in the jar.": "सही, जार में 2 ली 360 मिली रस बचा है।",
    "A 60 L tank: 34 L 500 mL used, 20 L added, 27 L 750 mL used; what is left?": "60 ली की टंकी: 34 ली 500 मिली खर्च, 20 ली डाला, 27 ली 750 मिली खर्च; कितना बचा?",
    "Water left at the end?": "अंत में कितना पानी बचा?",
    "Did the tank run to the last line of the story?": "क्या टंकी कहानी की आखिरी पंक्ति तक चली?",
    "Good, the story ends with 17 L 750 mL of water left.": "बढ़िया, कहानी के अंत में 17 ली 750 मिली पानी बचता है।",
    "Choose the words that answer the question.": "वे शब्द चुनो जो प्रश्न का उत्तर दें।",
    "This bottle is full: tap Empty to pour again.": "यह बोतल भर गई: फिर से उंडेलने के लिए ‘खाली करो’ दबाओ।",
    "This bottle is already full.": "यह बोतल पहले ही भर चुकी है।",
    /* phase 4 */
    "How many small jars fill a bottle": "कितने छोटे जार बोतल भरते हैं",
    "Tap the jar to fill it from the bucket.": "बाल्टी से भरने के लिए जार दबाओ।",
    "The jar stands on the shelf by the bucket.": "जार बाल्टी के ऊपर वाली शेल्फ़ पर है।",
    "Tap the full jar to pour it into the bottle: one pouring, one mark.": "भरा जार बोतल में उंडेलने के लिए दबाओ: एक बार उंडेलना, एक निशान।",
    "The bottle waits to the right of the jar.": "बोतल जार के दाईं ओर है।",
    "Pour again and again to the dashed line, then count the marks.": "टूटी रेखा तक बार-बार उंडेलो, फिर निशान गिनो।",
    "Count up in steps the size of one pouring until you reach the label.": "एक बार उंडेलने जितने कदमों में गिनते जाओ, लिखी हुई मात्रा तक।",
    "For the same bottle, a smaller jar needs more pourings.": "उसी बोतल के लिए छोटे जार को ज़्यादा बार उंडेलना पड़ता है।",
    "You learned: a smaller jar needs more pourings for the same bottle.": "तुमने सीखा: उसी बोतल के लिए छोटे जार से ज़्यादा बार उंडेलना पड़ता है।",
    "How many 300 mL glasses fill a jug that holds 2 L 400 mL?": "2 ली 400 मिली वाले जग को 300 मिली के कितने गिलास भरते हैं?",
    "Glasses to fill the jug?": "जग भरने को कितने गिलास?",
    "The jug holds 2,400 mL, and each glass adds 300 mL.": "जग में 2,400 मिली आता है, और हर गिलास 300 मिली डालता है।",
    "Yes, 8 glasses of 300 mL fill the jug.": "हाँ, 300 मिली के 8 गिलास जग भरते हैं।",
    "A bottle holds 1 L 200 mL: how many 150 mL cups of water fill it?": "बोतल में 1 ली 200 मिली आता है: 150 मिली के कितने कप पानी उसे भरते हैं?",
    "Cups to fill the bottle?": "बोतल भरने को कितने कप?",
    "1 L is not one cup: it is 1,000 mL, and the bottle holds 200 mL more.": "1 ली एक कप नहीं है: वह 1,000 मिली है, और बोतल में 200 मिली और आता है।",
    "Right, 8 cups fill it, as 8 times 150 mL is 1,200 mL.": "सही, 8 कप उसे भरते हैं, क्योंकि 8 गुणा 150 मिली = 1,200 मिली।",
    "A 3 L 200 mL jug: how many pourings with a 400 mL mug, and with a 200 mL glass?": "3 ली 200 मिली का जग: 400 मिली के मग से कितनी बार, और 200 मिली के गिलास से?",
    "Pourings for each?": "हर एक को कितनी बार?",
    "Which goes back and forth more often, the big mug or the small glass?": "कौन ज़्यादा बार आता जाता है, बड़ा मग या छोटा गिलास?",
    "Good, the glass holds half as much, so it needs twice as many pourings.": "बढ़िया, गिलास में आधा आता है, इसलिए उसे दोगुनी बार उंडेलना पड़ता है।",
    /* the picture's words, the keys and the answer boxes */
    "L": "ली", "mL": "मिली", "kg": "किग्रा", "g": "ग्रा", "km": "किमी", "m": "मी",
    "unit switch": "मात्रक स्विच",
    "Put the 4 of 40 mL in the hundreds box": "40 मिली का 4 सैकड़े के खाने में रखो", "Put the 4 of 40 mL in the tens box": "40 मिली का 4 दहाई के खाने में रखो",
    "Put the 1st cow's milk on top": "पहली गाय का दूध ऊपर रखो", "Put the 2nd cow's milk on top": "दूसरी गाय का दूध ऊपर रखो",
    "Add": "जोड़ो", "Carry": "हासिल", "Break": "तोड़ो", "Take away": "घटाओ", "Run": "चलाओ", "Run back": "उल्टा चलाओ", "Empty": "खाली करो",
    "1st cow": "पहली गाय", "2nd cow": "दूसरी गाय",
    "in the tank": "टंकी में", "in the jar": "जार में", "used": "इस्तेमाल हुआ", "added": "डाला गया", "poured out": "उंडेल दिया",
    "left in the tank": "टंकी में बचा", "left in the jar": "जार में बचा", "the difference": "अंतर", "used in all": "कुल इस्तेमाल",
    "glass": "गिलास", "cup": "कप", "mug": "मग", "jar": "जार", "pourings": "कितनी बार",
    "Fill and pour the glass": "गिलास भरो और उंडेलो", "Fill and pour the cup": "कप भरो और उंडेलो", "Fill and pour the mug": "मग भरो और उंडेलो",
    "Fill and pour the jar": "जार भरो और उंडेलो", "Fill and pour the 100 mL jar": "100 मिली का जार भरो और उंडेलो",
    "Fill and pour the 200 mL jar": "200 मिली का जार भरो और उंडेलो", "Fill and pour the 250 mL jar": "250 मिली का जार भरो और उंडेलो",
    "Fill and pour the 500 mL jar": "500 मिली का जार भरो और उंडेलो",
    "Choose the 1 L bottle": "1 ली की बोतल चुनो", "Choose the 2 L bottle": "2 ली की बोतल चुनो",
  },
  gu: {
    "Capacity Columns": "ક્ષમતાના સ્તંભ",
    "Litres and millilitres in columns: how many boxes do the millilitres take?": "સ્તંભમાં લિટર અને મિલિલિટર: મિલિલિટર કેટલાં ખાનાં લે છે?",
    "Every litre carried or broken as a thousand, and every count poured first.": "દરેક લિટર હજાર બનીને વદીમાં ગયો કે તૂટ્યો, અને દરેક ગણતરી પહેલાં રેડીને મળી.",
    "Free play: pick a bottle, then pour any jar into it and count the pourings.": "મુક્ત રમત: બાટલી પસંદ કરો, પછી કોઈ પણ બરણી તેમાં રેડો અને કેટલી વાર તે ગણો.",
    "How many boxes do the millilitres take?": "મિલિલિટર કેટલાં ખાનાં લે છે?",
    /* phase 1 */
    "Three places for millilitres": "મિલિલિટરનાં ત્રણ સ્થાન",
    "Tap the unit switch to show kilograms and grams.": "કિલોગ્રામ અને ગ્રામ બતાવવા માપ સ્વિચ દબાવો.",
    "The unit switch is the strip at the top.": "માપ સ્વિચ ઉપરની પટ્ટી છે.",
    "Tap the switch again for kilometres and metres.": "કિલોમીટર અને મીટર માટે સ્વિચ ફરી દબાવો.",
    "Each tap moves the switch on by one pair.": "દરેક વાર દબાવતાં સ્વિચ આગળની જોડી પર જાય છે.",
    "Tap it once more to come back to litres and millilitres.": "લિટર અને મિલિલિટર પર પાછા આવવા એક વાર વધુ દબાવો.",
    "The litres pair is the first one on the strip.": "લિટરની જોડી પટ્ટી પર પહેલી છે.",
    "A number of millilitres ends in the ones box, the last of the three.": "મિલિલિટરની સંખ્યા એકમના ખાનામાં પૂરી થાય, ત્રણેયમાં છેલ્લું.",
    "Fill the boxes in front of it with zeros, so every box holds a digit.": "તેની આગળનાં ખાનાં શૂન્યથી ભરો, જેથી દરેક ખાનામાં એક અંક હોય.",
    "Beside litres the millilitres take three places, as grams and metres do.": "લિટર સાથે મિલિલિટર ત્રણ સ્થાન લે છે, જેમ ગ્રામ અને મીટર લે છે.",
    "You learned: millilitres take three places beside litres.": "તમે શીખ્યા: લિટર સાથે મિલિલિટર ત્રણ સ્થાન લે છે.",
    "Tap the box for the 4 of 40 mL, then add 23 L 40 mL and 15 L 685 mL.": "40 મિલિના 4 માટેનું ખાનું દબાવો, પછી 23 લિ 40 મિલિ અને 15 લિ 685 મિલિ જોડો.",
    "23 L 40 mL + 15 L 685 mL": "23 લિ 40 મિલિ + 15 લિ 685 મિલિ",
    "40 mL is 4 tens and no ones, so its 4 goes in the tens box.": "40 મિલિમાં 4 દશક છે અને એકમ નથી, તેથી 4 દશકના ખાનામાં જાય.",
    "Add the millilitres column first, then add 23 L and 15 L.": "પહેલાં મિલિલિટરનો સ્તંભ જોડો, પછી 23 લિ અને 15 લિ જોડો.",
    "Where does the 4 of 40 mL go: the hundreds box or the tens box?": "40 મિલિનો 4 ક્યાં જાય: શતકના ખાનામાં કે દશકના ખાનામાં?",
    "Yes, 40 mL is written 040, and the sum is 38 L 725 mL.": "હા, 40 મિલિ 040 લખાય, અને સરવાળો 38 લિ 725 મિલિ છે.",
    "How is 8 mL written in the millilitres boxes?": "મિલિલિટરનાં ખાનાંમાં 8 મિલિ કેવી રીતે લખાય?",
    "8 mL in the boxes": "ખાનાંમાં 8 મિલિ",
    "8 mL is a small amount: which box holds the ones?": "8 મિલિ થોડું છે: એકમ કયા ખાનામાં આવે?",
    "Right, 8 mL is 008: two zeros hold the empty places.": "સાચું, 8 મિલિ 008 છે: બે શૂન્ય ખાલી સ્થાન ભરે છે.",
    "19 L 65 mL goes in the frame: what goes in its millilitres boxes?": "19 લિ 65 મિલિ માળખામાં જાય છે: તેનાં મિલિલિટરનાં ખાનાંમાં શું આવે?",
    "mL boxes of 19 L 65 mL": "19 લિ 65 મિલિનાં મિલિ ખાનાં",
    "Read your three boxes aloud: do they say 65 mL?": "તમારાં ત્રણેય ખાનાં મોટેથી વાંચો: શું તે 65 મિલિ કહે છે?",
    "Good, 65 mL is 065, with a zero in the hundreds box.": "સરસ, 65 મિલિ 065 છે, શતકના ખાનામાં શૂન્ય સાથે.",
    /* phase 2 */
    "Carrying and borrowing a litre": "એક લિટરની વદી અને ઉછીનું",
    "Tap Add to add 600 mL and 700 mL in the millilitres column.": "મિલિલિટર સ્તંભમાં 600 મિલિ અને 700 મિલિ જોડવા ‘જોડો’ દબાવો.",
    "The Add key is at the bottom of the board.": "‘જોડો’ બટન બોર્ડની નીચે છે.",
    "1,300 mL will not fit in three boxes: tap Carry to carry 1 L.": "1,300 મિલિ ત્રણ ખાનાંમાં નહીં સમાય: 1 લિ વદીમાં લઈ જવા ‘વદી’ દબાવો.",
    "Now the Carry key is in the same place.": "હવે ‘વદી’ બટન એ જ જગ્યાએ છે.",
    "Tap Add again to add the litres, with the carried litre.": "વદીના લિટર સાથે લિટર જોડવા ફરી ‘જોડો’ દબાવો.",
    "The carried litre sits over the litres column.": "વદીનો લિટર, લિટરના સ્તંભ ઉપર છે.",
    "In the take-away, 200 mL is too few to take 500 mL: tap Break.": "બાદબાકીમાં 200 મિલિમાંથી 500 મિલિ ન નીકળે: ‘તોડો’ દબાવો.",
    "The Break key sits where Add and Carry did.": "‘તોડો’ બટન ત્યાં જ છે જ્યાં ‘જોડો’ અને ‘વદી’ હતાં.",
    "Tap Take away to work the millilitres, then the litres.": "પહેલાં મિલિલિટર, પછી લિટર બાદ કરવા ‘બાદ કરો’ દબાવો.",
    "Now the millilitres on top are enough.": "હવે ઉપરના મિલિલિટર પૂરતા છે.",
    "Is a litre carried here, or is one broken to borrow?": "અહીં લિટર વદીમાં જાય છે, કે ઉછીનું લેવા એક લિટર તૂટે છે?",
    "Work the millilitres column first, then the litres column.": "પહેલાં મિલિલિટરનો સ્તંભ ગણો, પછી લિટરનો સ્તંભ.",
    "A thousand millilitres carry as one litre, and a litre breaks into a thousand.": "હજાર મિલિલિટર એક લિટર બનીને વદીમાં જાય, અને એક લિટર હજારમાં તૂટે.",
    "You learned: 1,000 mL carry as 1 L, and 1 L breaks into 1,000 mL.": "તમે શીખ્યા: 1,000 મિલિ = 1 લિ વદી, અને 1 લિ તૂટીને 1,000 મિલિ.",
    "Add 36 L 575 mL and 48 L 690 mL.": "36 લિ 575 મિલિ અને 48 લિ 690 મિલિ જોડો.",
    "36 L 575 mL + 48 L 690 mL": "36 લિ 575 મિલિ + 48 લિ 690 મિલિ",
    "Can three boxes hold more than 999 mL?": "શું ત્રણ ખાનાંમાં 999 મિલિથી વધારે સમાય?",
    "Yes, 1,265 mL is 1 L 265 mL, so the sum is 85 L 265 mL.": "હા, 1,265 મિલિ = 1 લિ 265 મિલિ, એટલે સરવાળો 85 લિ 265 મિલિ છે.",
    "Add 14 L 380 mL, 26 L 745 mL and 9 L 90 mL.": "14 લિ 380 મિલિ, 26 લિ 745 મિલિ અને 9 લિ 90 મિલિ જોડો.",
    "Add the three amounts": "ત્રણેય માપ જોડો",
    "Where does each full thousand millilitres go?": "દરેક પૂરા હજાર મિલિલિટર ક્યાં જાય?",
    "Right, the millilitres make 1,215, so 1 L is carried: 50 L 215 mL.": "સાચું, મિલિલિટર 1,215 થાય, એટલે 1 લિ વદીમાં ગયો: 50 લિ 215 મિલિ.",
    "Two cows give 12 L 750 mL and 14 L 380 mL of milk: how much more does one give?": "બે ગાય 12 લિ 750 મિલિ અને 14 લિ 380 મિલિ દૂધ આપે છે: એક કેટલું વધારે આપે?",
    "How much more milk?": "કેટલું દૂધ વધારે?",
    "Put the larger amount on top: can 750 mL come out of 380 mL?": "મોટું માપ ઉપર મૂકો: શું 380 મિલિમાંથી 750 મિલિ નીકળી શકે?",
    "Good, the 2nd cow gives 1 L 630 mL more milk.": "સરસ, બીજી ગાય 1 લિ 630 મિલિ વધારે દૂધ આપે છે.",
    /* phase 3 */
    "How much is left": "કેટલું બાકી",
    "Tap Run to play the first line of the story on the tank.": "વાર્તાની પહેલી લીટી ટાંકી પર ચલાવવા ‘ચલાવો’ દબાવો.",
    "The Run key is under the story card.": "‘ચલાવો’ બટન વાર્તા કાર્ડની નીચે છે.",
    "Tap Run again: this line adds water to the tank.": "ફરી ‘ચલાવો’ દબાવો: આ લીટી ટાંકીમાં પાણી ઉમેરે છે.",
    "Play the story one line at a time.": "વાર્તા એક વારમાં એક લીટી ચલાવો.",
    "Now tap the words that tell how much water was used.": "હવે એ શબ્દો દબાવો જે કહે કે કેટલું પાણી વપરાયું.",
    "The word keys stand in a column at the right.": "શબ્દોનાં બટન જમણી બાજુ એક હારમાં છે.",
    "Play the story in its order: where does the level settle?": "વાર્તા તેના ક્રમમાં ચલાવો: સ્તર ક્યાં અટકે છે?",
    "Take away each amount used and add each amount added, line by line.": "દરેક લીટીએ, વપરાયેલું માપ બાદ કરો અને ઉમેરેલું માપ ઉમેરો.",
    "Work a story in its order, and answer in the question's own words.": "વાર્તા તેના ક્રમમાં ગણો, અને જવાબ પ્રશ્નના પોતાના શબ્દોમાં આપો.",
    "You learned: work a story in its order, and answer in its own words.": "તમે શીખ્યા: વાર્તા તેના ક્રમમાં ગણો, જવાબ તેના શબ્દોમાં આપો.",
    "A tank holds 50 L and 32 L 650 mL is used: how much water is left in it?": "ટાંકીમાં 50 લિ છે અને 32 લિ 650 મિલિ વપરાય છે: તેમાં કેટલું પાણી બાકી?",
    "Water left in the tank?": "ટાંકીમાં કેટલું પાણી બાકી?",
    "Check your words against the question: what must the answer say?": "તમારા શબ્દો પ્રશ્ન સાથે સરખાવો: જવાબે શું કહેવું જોઈએ?",
    "Take 650 mL from the 1,000 mL first, then take 32 L from the 49 L.": "પહેલાં 1,000 મિલિમાંથી 650 મિલિ બાદ કરો, પછી 49 લિમાંથી 32 લિ.",
    "Think of 50 L as 49 L 1,000 mL, then pick the words.": "50 લિને 49 લિ 1,000 મિલિ સમજો, પછી શબ્દો પસંદ કરો.",
    "Yes, 49 L 1,000 mL less 32 L 650 mL leaves 17 L 350 mL of water.": "હા, 49 લિ 1,000 મિલિમાંથી 32 લિ 650 મિલિ બાદ કરતાં 17 લિ 350 મિલિ પાણી રહે.",
    "A jar holds 5 L of juice and 2 L 640 mL is poured out: how much juice is left?": "બરણીમાં 5 લિ રસ છે અને 2 લિ 640 મિલિ રેડી દેવાય છે: કેટલો રસ બાકી?",
    "Juice left in the jar?": "બરણીમાં કેટલો રસ બાકી?",
    "5 L is the same as 4 L and 1,000 mL.": "5 લિ એટલે 4 લિ અને 1,000 મિલિ.",
    "Right, 2 L 360 mL of juice is left in the jar.": "સાચું, બરણીમાં 2 લિ 360 મિલિ રસ બાકી છે.",
    "A 60 L tank: 34 L 500 mL used, 20 L added, 27 L 750 mL used; what is left?": "60 લિ ટાંકી: 34 લિ 500 મિલિ વપરાયું, 20 લિ નાખ્યું, 27 લિ 750 મિલિ ગયું; બાકી?",
    "Water left at the end?": "અંતે કેટલું પાણી બાકી?",
    "Did the tank run to the last line of the story?": "શું ટાંકી વાર્તાની છેલ્લી લીટી સુધી ચાલી?",
    "Good, the story ends with 17 L 750 mL of water left.": "સરસ, વાર્તાના અંતે 17 લિ 750 મિલિ પાણી બાકી રહે છે.",
    "Choose the words that answer the question.": "પ્રશ્નનો જવાબ આપે એવા શબ્દો પસંદ કરો.",
    "This bottle is full: tap Empty to pour again.": "આ બાટલી ભરાઈ ગઈ: ફરી રેડવા ‘ખાલી કરો’ દબાવો.",
    "This bottle is already full.": "આ બાટલી પહેલેથી ભરેલી છે.",
    /* phase 4 */
    "How many small jars fill a bottle": "કેટલી નાની બરણીથી બાટલી ભરાય",
    "Tap the jar to fill it from the bucket.": "ડોલમાંથી ભરવા બરણી દબાવો.",
    "The jar stands on the shelf by the bucket.": "બરણી ડોલની ઉપરની છાજલી પર છે.",
    "Tap the full jar to pour it into the bottle: one pouring, one mark.": "ભરેલી બરણી બાટલીમાં રેડવા દબાવો: એક વાર રેડવું, એક નિશાન.",
    "The bottle waits to the right of the jar.": "બાટલી બરણીની જમણી બાજુ છે.",
    "Pour again and again to the dashed line, then count the marks.": "તૂટક રેખા સુધી વારંવાર રેડો, પછી નિશાન ગણો.",
    "Count up in steps the size of one pouring until you reach the label.": "એક વાર રેડવા જેટલાં પગલાંમાં ગણતા જાઓ, લખેલા માપ સુધી.",
    "For the same bottle, a smaller jar needs more pourings.": "એ જ બાટલી માટે નાની બરણીને વધારે વાર રેડવી પડે.",
    "You learned: a smaller jar needs more pourings for the same bottle.": "તમે શીખ્યા: એ જ બાટલી માટે નાની બરણીથી વધારે વાર રેડવું પડે.",
    "How many 300 mL glasses fill a jug that holds 2 L 400 mL?": "2 લિ 400 મિલિનો જગ 300 મિલિના કેટલા ગ્લાસથી ભરાય?",
    "Glasses to fill the jug?": "જગ ભરવા કેટલા ગ્લાસ?",
    "The jug holds 2,400 mL, and each glass adds 300 mL.": "જગમાં 2,400 મિલિ સમાય, અને દરેક ગ્લાસ 300 મિલિ ઉમેરે.",
    "Yes, 8 glasses of 300 mL fill the jug.": "હા, 300 મિલિના 8 ગ્લાસથી જગ ભરાય.",
    "A bottle holds 1 L 200 mL: how many 150 mL cups of water fill it?": "બાટલીમાં 1 લિ 200 મિલિ સમાય: 150 મિલિના કેટલા કપ પાણીથી તે ભરાય?",
    "Cups to fill the bottle?": "બાટલી ભરવા કેટલા કપ?",
    "1 L is not one cup: it is 1,000 mL, and the bottle holds 200 mL more.": "1 લિ એક કપ નથી: તે 1,000 મિલિ છે, અને બાટલીમાં 200 મિલિ વધુ સમાય.",
    "Right, 8 cups fill it, as 8 times 150 mL is 1,200 mL.": "સાચું, 8 કપથી તે ભરાય, કારણ કે 8 ગુણ્યા 150 મિલિ = 1,200 મિલિ.",
    "A 3 L 200 mL jug: how many pourings with a 400 mL mug, and with a 200 mL glass?": "3 લિ 200 મિલિનો જગ: 400 મિલિના મગથી કેટલી વાર, અને 200 મિલિના ગ્લાસથી?",
    "Pourings for each?": "દરેકને કેટલી વાર?",
    "Which goes back and forth more often, the big mug or the small glass?": "કોણ વધારે વાર આવજા કરે, મોટો મગ કે નાનો ગ્લાસ?",
    "Good, the glass holds half as much, so it needs twice as many pourings.": "સરસ, ગ્લાસમાં અડધું સમાય, એટલે તેને બમણી વાર રેડવું પડે.",
    /* the picture's words, the keys and the answer boxes */
    "L": "લિ", "mL": "મિલિ", "kg": "કિગ્રા", "g": "ગ્રા", "km": "કિમી", "m": "મી",
    "unit switch": "માપ સ્વિચ",
    "Put the 4 of 40 mL in the hundreds box": "40 મિલિનો 4 શતકના ખાનામાં મૂકો", "Put the 4 of 40 mL in the tens box": "40 મિલિનો 4 દશકના ખાનામાં મૂકો",
    "Put the 1st cow's milk on top": "પહેલી ગાયનું દૂધ ઉપર મૂકો", "Put the 2nd cow's milk on top": "બીજી ગાયનું દૂધ ઉપર મૂકો",
    "Add": "જોડો", "Carry": "વદી", "Break": "તોડો", "Take away": "બાદ કરો", "Run": "ચલાવો", "Run back": "પાછું ચલાવો", "Empty": "ખાલી કરો",
    "1st cow": "પહેલી ગાય", "2nd cow": "બીજી ગાય",
    "in the tank": "ટાંકીમાં", "in the jar": "બરણીમાં", "used": "વપરાયું", "added": "ઉમેર્યું", "poured out": "રેડી દીધું",
    "left in the tank": "ટાંકીમાં બાકી", "left in the jar": "બરણીમાં બાકી", "the difference": "તફાવત", "used in all": "કુલ વપરાયું",
    "glass": "ગ્લાસ", "cup": "કપ", "mug": "મગ", "jar": "બરણી", "pourings": "કેટલી વાર",
    "Fill and pour the glass": "ગ્લાસ ભરો અને રેડો", "Fill and pour the cup": "કપ ભરો અને રેડો", "Fill and pour the mug": "મગ ભરો અને રેડો",
    "Fill and pour the jar": "બરણી ભરો અને રેડો", "Fill and pour the 100 mL jar": "100 મિલિની બરણી ભરો અને રેડો",
    "Fill and pour the 200 mL jar": "200 મિલિની બરણી ભરો અને રેડો", "Fill and pour the 250 mL jar": "250 મિલિની બરણી ભરો અને રેડો",
    "Fill and pour the 500 mL jar": "500 મિલિની બરણી ભરો અને રેડો",
    "Choose the 1 L bottle": "1 લિની બાટલી પસંદ કરો", "Choose the 2 L bottle": "2 લિની બાટલી પસંદ કરો",
  },
};

/* the two answer boxes of a measure in litres and millilitres, labelled with the unit symbol alone
   (BUILD_CARD §7, 2026-09-24 'Two-unit answer boxes') */
const CC_LML = [{ label: "L" }, { label: "mL", rtl: true, digits: 3 }];

/* One entry per phase = one mount. Every phase opens on GUIDE STEPS that work a WARM-UP (CC_WARM below:
   numbers in no question), then its three questions. Item fields of this tool: rows (the frame's measures),
   card (phase 1's waiting measure), story / phrases / words (the tank and the answer card), jar / bottle / jars
   (the pouring), near (the item's misconception), win (the one-sentence win line, said at the win). */
const PHASES: any[] = [
  {
    n: 1,
    concept: "Three places for millilitres",
    conceptId: "M2.S4.T8.C35", objectiveIds: ["O13"],
    /* the last act's result stands 0.9 s, then the question opens */
    stepHold: 900,
    steps: [
      { say: "Tap the unit switch to show kilograms and grams.", on: "switch", hint: "The unit switch is the strip at the top." },
      { say: "Tap the switch again for kilometres and metres.", on: "switch", hint: "Each tap moves the switch on by one pair." },
      { say: "Tap it once more to come back to litres and millilitres.", on: "switch", hint: "The litres pair is the first one on the strip." },
    ],
    ladder: ["A number of millilitres ends in the ones box, the last of the three.", "Fill the boxes in front of it with zeros, so every box holds a digit."],
    closing: "Beside litres the millilitres take three places, as grams and metres do.",
    learned: "You learned: millilitres take three places beside litres.",
    traceback: "The millilitres slide to the ones end with grey zeros in front, and the columns are added to the whole answer.",
    items: [
      /* learn ML1: answer in the plan = 38 L 725 mL. The child puts the 40 into its boxes, then adds */
      { qid: "M2.S4.T8.C35:ML1", kind: "place", say: "Tap the box for the 4 of 40 mL, then add 23 L 40 mL and 15 L 685 mL.",
        ask: "23 L 40 mL + 15 L 685 mL", parts: CC_LML, answer: [38, 725], near: [38, 1085], card: "40 mL",
        rows: [{ L: 23, ml: 40 }, { L: 15, ml: 685, sign: "+" }],
        ladder: ["40 mL is 4 tens and no ones, so its 4 goes in the tens box.", "Add the millilitres column first, then add 23 L and 15 L."],
        miss: "Where does the 4 of 40 mL go: the hundreds box or the tens box?",
        win: "Yes, 40 mL is written 040, and the sum is 38 L 725 mL." },
      /* practice 1: answer in the plan = 008, because millilitres take three places */
      { qid: "M2.S4.T8.C35:1", kind: "write", say: "How is 8 mL written in the millilitres boxes?",
        ask: "8 mL in the boxes", answer: "008", near: "8", L: "", ml: 8, card: "8 mL",
        miss: "8 mL is a small amount: which box holds the ones?",
        win: "Right, 8 mL is 008: two zeros hold the empty places." },
      /* practice 2: answer in the plan = 065. Plan question: 19 L 65 mL is written in columns. What goes in the millilitres column? */
      { qid: "M2.S4.T8.C35:2", kind: "write", say: "19 L 65 mL goes in the frame: what goes in its millilitres boxes?",
        ask: "mL boxes of 19 L 65 mL", answer: "065", near: "65", L: 19, ml: 65, card: "19 L 65 mL",
        miss: "Read your three boxes aloud: do they say 65 mL?",
        win: "Good, 65 mL is 065, with a zero in the hundreds box." },
    ],
  },
  {
    n: 2,
    concept: "Carrying and borrowing a litre",
    conceptId: "M2.S4.T8.C36", objectiveIds: ["O13"],
    /* the last act's result stands 0.9 s, then the question opens */
    stepHold: 900,
    steps: [
      { say: "Tap Add to add 600 mL and 700 mL in the millilitres column.", on: "add", hint: "The Add key is at the bottom of the board." },
      { say: "1,300 mL will not fit in three boxes: tap Carry to carry 1 L.", on: "carry", hint: "Now the Carry key is in the same place." },
      { say: "Tap Add again to add the litres, with the carried litre.", on: "add", hint: "The carried litre sits over the litres column." },
      { say: "In the take-away, 200 mL is too few to take 500 mL: tap Break.", on: "break", hint: "The Break key sits where Add and Carry did." },
      { say: "Tap Take away to work the millilitres, then the litres.", on: "sub", hint: "Now the millilitres on top are enough." },
    ],
    ladder: ["Is a litre carried here, or is one broken to borrow?", "Work the millilitres column first, then the litres column."],
    closing: "A thousand millilitres carry as one litre, and a litre breaks into a thousand.",
    learned: "You learned: 1,000 mL carry as 1 L, and 1 L breaks into 1,000 mL.",
    traceback: "The millilitres are worked first: a full thousand rises as one litre, or a litre breaks into a thousand, and the answer row fills.",
    items: [
      /* learn ML2: answer in the plan = 85 L 265 mL */
      { qid: "M2.S4.T8.C36:ML2", kind: "carry", say: "Add 36 L 575 mL and 48 L 690 mL.",
        ask: "36 L 575 mL + 48 L 690 mL", parts: CC_LML, answer: [85, 265], near: [84, 1265],
        rows: [{ L: 36, ml: 575 }, { L: 48, ml: 690, sign: "+" }],
        miss: "Can three boxes hold more than 999 mL?",
        win: "Yes, 1,265 mL is 1 L 265 mL, so the sum is 85 L 265 mL." },
      /* practice 3: answer in the plan = 50 L 215 mL. The millilitres make 1215, so write 215 and carry 1 L */
      { qid: "M2.S4.T8.C36:3", kind: "carry", say: "Add 14 L 380 mL, 26 L 745 mL and 9 L 90 mL.",
        ask: "Add the three amounts", parts: CC_LML, answer: [50, 215], near: [49, 1215],
        rows: [{ L: 14, ml: 380 }, { L: 26, ml: 745, sign: "+" }, { L: 9, ml: 90, sign: "+" }],
        miss: "Where does each full thousand millilitres go?",
        win: "Right, the millilitres make 1,215, so 1 L is carried: 50 L 215 mL." },
      /* practice 4: answer in the plan = The second cow gives more, by 1 L 630 mL. Break one litre: 13 L 1380 mL less 12 L 750 mL.
         Plan question: One cow gives 12 L 750 mL of milk and another gives 14 L 380 mL. Which cow gives more milk, and how much more?
         The typed answer is the amount; "which" is shown by putting the larger amount on top (a row tap) and said in the win line. */
      { qid: "M2.S4.T8.C36:4", kind: "break", say: "Two cows give 12 L 750 mL and 14 L 380 mL of milk: how much more does one give?",
        ask: "How much more milk?", parts: CC_LML, answer: [1, 630], near: [2, 370],
        rows: [{ L: 12, ml: 750, label: "1st cow" }, { L: 14, ml: 380, label: "2nd cow" }],
        miss: "Put the larger amount on top: can 750 mL come out of 380 mL?",
        win: "Good, the 2nd cow gives 1 L 630 mL more milk." },
    ],
  },
  {
    n: 3,
    concept: "How much is left",
    conceptId: "M2.S4.T8.C37", objectiveIds: ["O14"],
    /* the last act's result stands 0.9 s, then the question opens */
    stepHold: 900,
    steps: [
      { say: "Tap Run to play the first line of the story on the tank.", on: "run", hint: "The Run key is under the story card." },
      { say: "Tap Run again: this line adds water to the tank.", on: "run", hint: "Play the story one line at a time." },
      { say: "Now tap the words that tell how much water was used.", on: "words-used", hint: "The word keys stand in a column at the right." },
    ],
    ladder: ["Play the story in its order: where does the level settle?", "Take away each amount used and add each amount added, line by line."],
    closing: "Work a story in its order, and answer in the question's own words.",
    learned: "You learned: work a story in its order, and answer in its own words.",
    traceback: "The tank plays the story line by line, and the answer card ends on the amount left with the question's words.",
    items: [
      /* learn ML3: answer in the plan = 17 L 350 mL of water is left in the tank.
         Plan question: A tank holds 50 L of water. 32 L 650 mL of it is used. How much water is left in the tank? */
      { qid: "M2.S4.T8.C37:ML3", kind: "story", say: "A tank holds 50 L and 32 L 650 mL is used: how much water is left in it?",
        ask: "Water left in the tank?", parts: CC_LML, answer: [17, 350], near: [18, 650], vessel: "tank", words: "left",
        story: [{ amt: 50000, op: "start", verb: "in the tank" }, { amt: 32650, op: "use", verb: "used" }],
        /* the correction's working, three lines under the story card (a measure that missed): the break across the zero */
        unbundle: { from: "50 L", to: "49 L 1,000 mL", ml: "1,000 − 650", mlAns: "= 350 mL", L: "49 − 32", LAns: "= 17 L" },
        phrases: [{ id: "used", label: "used" }, { id: "left", label: "left in the tank" }, { id: "diff", label: "the difference" }],
        ladder: ["Check your words against the question: what must the answer say?", "Take 650 mL from the 1,000 mL first, then take 32 L from the 49 L."],
        miss: "Think of 50 L as 49 L 1,000 mL, then pick the words.",
        win: "Yes, 49 L 1,000 mL less 32 L 650 mL leaves 17 L 350 mL of water." },
      /* practice 5: answer in the plan = 2 L 360 mL of juice is left in the jar.
         Plan question: A jar holds 5 L of juice. 2 L 640 mL of it is poured out. How much juice is left in the jar? */
      { qid: "M2.S4.T8.C37:5", kind: "story", say: "A jar holds 5 L of juice and 2 L 640 mL is poured out: how much juice is left?",
        ask: "Juice left in the jar?", parts: CC_LML, answer: [2, 360], near: [3, 640], vessel: "jar", words: "left",
        story: [{ amt: 5000, op: "start", verb: "in the jar" }, { amt: 2640, op: "use", verb: "poured out" }],
        unbundle: { from: "5 L", to: "4 L 1,000 mL", ml: "1,000 − 640", mlAns: "= 360 mL", L: "4 − 2", LAns: "= 2 L" },
        phrases: [{ id: "left", label: "left in the jar" }, { id: "diff", label: "the difference" }, { id: "out", label: "poured out" }],
        miss: "5 L is the same as 4 L and 1,000 mL.",
        win: "Right, 2 L 360 mL of juice is left in the jar." },
      /* practice 6: answer in the plan = 17 L 750 mL of water is left. 60 L less 34 L 500 mL is 25 L 500 mL, 20 L more makes 45 L 500 mL,
         and taking 27 L 750 mL leaves 17 L 750 mL. Plan question: A water tank has 60 L. First 34 L 500 mL is used, then 20 L is added,
         then 27 L 750 mL is used. How much water is left in the tank? */
      { qid: "M2.S4.T8.C37:6", kind: "story", say: "A 60 L tank: 34 L 500 mL used, 20 L added, 27 L 750 mL used; what is left?",
        ask: "Water left at the end?", parts: CC_LML, answer: [17, 750], near: [25, 500], vessel: "tank", words: "left",
        story: [{ amt: 60000, op: "start", verb: "in the tank" }, { amt: 34500, op: "use", verb: "used" }, { amt: 20000, op: "add", verb: "added" }, { amt: 27750, op: "use", verb: "used" }],
        phrases: [{ id: "used", label: "used in all" }, { id: "added", label: "added" }, { id: "left", label: "left in the tank" }],
        miss: "Did the tank run to the last line of the story?",
        win: "Good, the story ends with 17 L 750 mL of water left." },
    ],
  },
  {
    n: 4,
    concept: "How many small jars fill a bottle",
    conceptId: "M2.S4.T8.C38", objectiveIds: ["O14"],
    /* the last act's result stands 0.9 s, then the question opens */
    stepHold: 900,
    steps: [
      { say: "Tap the jar to fill it from the bucket.", on: "fill", hint: "The jar stands on the shelf by the bucket." },
      { say: "Tap the full jar to pour it into the bottle: one pouring, one mark.", on: "pour", hint: "The bottle waits to the right of the jar." },
    ],
    ladder: ["Pour again and again to the dashed line, then count the marks.", "Count up in steps the size of one pouring until you reach the label."],
    closing: "For the same bottle, a smaller jar needs more pourings.",
    learned: "You learned: a smaller jar needs more pourings for the same bottle.",
    traceback: "The bottle is filled one pouring at a time up to its neck line, a mark for each, and the count drops into its cell.",
    items: [
      /* learn ML4: answer in the plan = 8 glasses */
      { qid: "M2.S4.T8.C38:ML4", kind: "pour", say: "How many 300 mL glasses fill a jug that holds 2 L 400 mL?",
        ask: "Glasses to fill the jug?", answer: 8, near: 2, jar: 300, jarName: "glass", pot: "jug", bottle: 2400,
        miss: "The jug holds 2,400 mL, and each glass adds 300 mL.",
        win: "Yes, 8 glasses of 300 mL fill the jug." },
      /* practice 7: answer in the plan = 8 cups, because 8 times 150 mL is 1200 mL. Near miss: the 1 L counted as 1 cup */
      { qid: "M2.S4.T8.C38:7", kind: "pour", say: "A bottle holds 1 L 200 mL: how many 150 mL cups of water fill it?",
        ask: "Cups to fill the bottle?", answer: 8, near: 1, jar: 150, jarName: "cup", pot: "bottle", bottle: 1200,
        miss: "1 L is not one cup: it is 1,000 mL, and the bottle holds 200 mL more.",
        win: "Right, 8 cups fill it, as 8 times 150 mL is 1,200 mL." },
      /* practice 8: answer in the plan = The mug needs 8 and the glass needs 16, so the smaller glass needs more pourings.
         Plan question: A 400 mL mug and a 200 mL glass are each used to fill a jug of 3 L 200 mL. How many pourings does each need, and which needs more?
         Both counts are typed; "which needs more" is read from them and said in the win line. */
      { qid: "M2.S4.T8.C38:8", kind: "pour2", say: "A 3 L 200 mL jug: how many pourings with a 400 mL mug, and with a 200 mL glass?",
        ask: "Pourings for each?", parts: [{ label: "mug" }, { label: "glass" }], answer: [8, 16], near: [16, 8], pot: "jug", bottle: 3200,
        jars: [{ id: "mug", cap: 400, name: "mug" }, { id: "glass", cap: 200, name: "glass" }],
        miss: "Which goes back and forth more often, the big mug or the small glass?",
        win: "Good, the glass holds half as much, so it needs twice as many pourings." },
    ],
  },
];
/* a win line is read, never cut: each question waits at least 68 ms a character of its win line */
PHASES.forEach((p: any) => p.items.forEach((it: any) => { if (it.win) it.winMs = Math.max(2400, it.win.length * 68 + 240); }));

/* the warm-ups the guide steps work: numbers that answer no question of their phase */
const CC_WARM: any = {
  1: { rows: [{ L: 2, ml: 500 }] },
  2: { sum: [{ L: 2, ml: 600 }, { L: 1, ml: 700, sign: "+" }], sub: [{ L: 5, ml: 200 }, { L: 2, ml: 500, sign: "−" }] },
  3: { vessel: "tank", story: [{ amt: 40000, op: "start", verb: "in the tank" }, { amt: 15000, op: "use", verb: "used" }, { amt: 10000, op: "add", verb: "added" }],
    phrases: [{ id: "used", label: "used" }, { id: "added", label: "added" }, { id: "left", label: "left in the tank" }] },
  4: { jar: 250, jarName: "jar", pot: "bottle", bottle: 1000 },
};

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  frame: { smallUnitBoxes: 3, joiningNumber: 1000, pairs: [["L", "mL"], ["kg", "g"], ["km", "m"]] },
  warmUps: CC_WARM,
  freePlay: { jars: [100, 200, 250, 500], bottles: [1000, 2000] },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* the answer card's words, sent with the measure by the child's Enter ([17, 350, "left"]) */
const ccWordsOf = (v: any) => (Array.isArray(v) ? (v.length > 2 ? v[2] : null) : (String(v ?? "").split("|")[2] ?? null));
/* judge: a measure is its two boxes; an answer card's words, when sent, must be the question's own;
   "008" is judged as written (millilitres take three places) */
const judge = (item: any, v: any) => {
  if (item.words) {
    const w = ccWordsOf(v);
    if (w && w !== item.words) return false;
    return judgeSlotParts(item, Array.isArray(v) ? v.slice(0, 2) : String(v ?? "").split("|").slice(0, 2).join("|"));
  }
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v ?? "").trim() === String(item.answer);
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work:
   measures in millilitres, stories run line by line, and pourings counted one at a time */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const two = (t: number) => Array.isArray(it.answer) && it.answer[0] === Math.floor(t / 1000) && it.answer[1] === t % 1000;
  if (it.kind === "write") { const s = String(it.ml); return it.answer === "000".slice(s.length) + s; }
  if (it.kind === "place" || it.kind === "carry") return two(it.rows.reduce((a: number, r: any) => a + r.L * 1000 + r.ml, 0));
  if (it.kind === "break") { const v = it.rows.map((r: any) => r.L * 1000 + r.ml); return two(Math.max(...v) - Math.min(...v)); }
  if (it.kind === "story") { let t = 0; for (const s of it.story) { t = s.op === "use" ? t - s.amt : t + s.amt; if (t < 0) return false; } return two(t); }
  const fill = (jar: number, cap: number) => { let lv = 0, k = 0; while (lv < cap) { lv += jar; k++; } return lv === cap ? k : -1; };
  if (it.kind === "pour") return fill(it.jar, it.bottle) === it.answer;
  if (it.kind === "pour2") return it.jars.every((j: any, k: number) => fill(j.cap, it.bottle) === it.answer[k]);
  return false;
}));
/* the most likely wrong answer (the item's misconception); judge must reject it */
const nearMiss = (item: any) => (item.near !== undefined ? (Array.isArray(item.near) ? item.near.join("|") : String(item.near))
  : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print: a measure as a whole */
const answerForms = (item: any) => (item.parts === CC_LML ? [`${item.answer[0]} L ${item.answer[1]} mL`, `${item.answer[0]} litres ${item.answer[1]} millilitres`]
  : item.parts ? item.answer.flatMap((x: number) => [String(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), words(item.answer)]
  : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer(): on an answer card it also sets the question's words, as a child taps them; the
   measure is then typed (undefined = type it) */
const answer = (item: any, v: any) => { if (item.words && HOOK.pickWords) HOOK.pickWords(); return undefined; };
/* the agent's check() before Enter: nothing waits on the board, so Enter (and in a guide step, the step's act) */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── this tool's drawing: colours, the column frame, the tank, the jars and the bottles ───────
   Every name is prefixed cc, so nothing shadows a runtime name. Helpers are CALLED, never mounted. */
const CC = { big: "#0072B2", small: "#009E73", amber: "#E69F00", zero: "#767676", left: "#CC79A7", count: "#56B4E9",
  water: "#BFE2F5", waterTop: "#4A93C4", glass: "#F7FBFE" };
const CC_INK = { big: shade(CC.big, 0.25), small: shade(CC.small, 0.25), amber: shade(CC.amber, 0.38), left: shade(CC.left, 0.35), count: shade(CC.count, 0.45) };
const CC_UNITS = [["L", "mL"], ["kg", "g"], ["km", "m"]];
const ccNum = (v: number) => (Math.abs(v) >= 1000 ? indian(v) : String(v));
const ccMeas = (ml: number) => { const L = Math.floor(ml / 1000), m = ml % 1000; return L && m ? `${L} L ${ccNum(m)} mL` : L ? `${L} L` : `${ccNum(m)} mL`; };
/* the tank's level after the first k lines of a story (line 0 is the start), in millilitres */
const ccLevel = (story: any[], k: number) => story.slice(0, k + 1).reduce((a: number, s: any) => (s.op === "use" ? a - s.amt : a + s.amt), 0);
/* a width estimate in em for shrink-to-fit: Devanagari and Gujarati letters and spacing signs 0.88, zero-advance marks 0 */
const ccZeroMark = (c: number) => (c >= 0x900 && c <= 0x902) || c === 0x93c || (c >= 0x941 && c <= 0x948) || c === 0x94d || (c >= 0x951 && c <= 0x957) || c === 0x962 || c === 0x963
  || (c >= 0xa81 && c <= 0xa82) || c === 0xabc || (c >= 0xac1 && c <= 0xac8) || c === 0xacd || c === 0xae2 || c === 0xae3;
const ccEm = (s: any) => { let w = 0; const cs = [...String(s)]; for (let i = 0; i < cs.length; i++) { const ch = cs[i], c = ch.codePointAt(0) || 0;
  /* Devanagari and Gujarati: a letter 0.7, a spacing vowel sign or a half letter (one before a virama) 0.35, a mark above or below 0 */
  if ((c >= 0x900 && c <= 0x97f) || (c >= 0xa80 && c <= 0xaff)) { const nx = cs[i + 1] ? cs[i + 1].codePointAt(0) || 0 : 0;
    w += ccZeroMark(c) ? 0 : (c >= 0x93e && c <= 0x94c) || (c >= 0xabe && c <= 0xacc) || nx === 0x94d || nx === 0xacd ? 0.35 : 0.7; }
  else w += ch === " " ? 0.3 : /[,.]/.test(ch) ? 0.3 : /[0-9]/.test(ch) ? 0.6 : /[A-Z]/.test(ch) ? 0.7 : 0.58; } return w; };
const ccFit = (s: any, size: number, maxW: number, min = 28) => Math.max(min, Math.min(size, Math.floor(maxW / Math.max(0.5, ccEm(s)))));
/* digits of a measure's millilitres, right-aligned into the three boxes; a fourth digit (and a fifth) stands on the joining line */
const ccRight = (s: any, c: string, pad = false) => {
  const ds = String(s ?? "").replace(/[^0-9]/g, "").split("");
  const bx = ds.slice(-3), ov = ds.slice(0, Math.max(0, ds.length - 3)).slice(-1);
  const ml = [...Array(3 - bx.length).fill(0).map(() => ({ d: pad ? "0" : "", c: CC.zero })), ...bx.map((d: string) => ({ d, c }))];
  return { ml, over: ov.map((d: string) => ({ d, c })) };
};
/* the digits as written, box by box from the left (phase 1's "what goes in the boxes") */
const ccLeft = (s: any, c: string) => { const ds = String(s ?? "").replace(/[^0-9]/g, "").split("").slice(0, 3); return [0, 1, 2].map((i) => ({ d: ds[i] || "", c })); };
const ccPad3 = (v: number) => { const s = String(v); return "000".slice(Math.min(3, s.length)) + s; };
/* a measure's frame row: litres and the three millilitres boxes, padding zeros grey */
const ccRow = (r: any, o: any = {}) => ({ L: r.L === "" || r.L === null || r.L === undefined ? "" : String(r.L), Lc: CC_INK.big, sign: r.sign || "", label: r.label || "",
  ml: ccPad3(r.ml).split("").map((d: string, i: number, a: string[]) => ({ d, c: a.slice(0, i + 1).every((x) => x === "0") ? CC.zero : CC_INK.small })), ...o });

/* the frame's geometry: x, top, scale s, a lane over the rows (carry chip, amber break), the number of rows */
const ccGeo = (x: number, top: number, s: number, lane: boolean, nr: number) => {
  const bw = 76 * s, bh = 72 * s, pitch = 82 * s, rp = 82 * s;
  const g: any = { x, s, bw, bh, fs: Math.round(58 * s), signX: x + 20 * s, cellL: x + 40 * s, cellR: x + 226 * s, div: x + 246 * s,
    bx: [0, 1, 2].map((i) => x + 262 * s + i * pitch) };
  g.right = g.bx[2] + bw + 12 * s;
  g.headY = top + 34 * s;
  g.laneY = top + 46 * s;
  const r0 = top + (lane ? 132 : 50) * s;
  g.rowY = [0, 1, 2, 3].map((k) => r0 + k * rp);
  g.ruleY = r0 + nr * rp + 4 * s;
  g.ansY = g.ruleY + 12 * s;
  return g;
};
const ccBase = (G: any, y: number) => y + G.bh / 2 + G.fs * 0.36;
const ccBoxC = (G: any, i: number) => G.bx[i] + G.bw / 2;

/* the column frame: F = { unit, rows: [{ L, Lc, ml: [{d,c}] x3, over, sign, label, struck, dim }], ans, chip, amber, rule } */
function ccFrame(G: any, F: any, C: any, tx: any) {
  const u = CC_UNITS[F.unit || 0];
  const nr = Math.max(1, F.rows.length);
  const top = G.headY - 30 * G.s;
  const bottom = F.ans ? G.ansY + G.bh : G.rowY[nr - 1] + G.bh;
  const mlText = (y: number, ds: any[], over: any[] = []) => (
    <text y={ccBase(G, y)} fontSize={G.fs} fontWeight={700} textAnchor="middle">
      {over.map((o: any, j: number) => <tspan key={"o" + j} x={G.div - (over.length - 1 - j) * G.fs * 0.64} fill={o.c}>{o.d}</tspan>)}
      {ds.map((d: any, i: number) => <tspan key={i} x={ccBoxC(G, i)} fill={d.c}>{d.d}</tspan>)}
    </text>
  );
  const row = (r: any, y: number, k: any) => {
    const lw = String(r.L).length * G.fs * 0.62;
    return (
      <g key={"r" + k} opacity={r.dim ? 0.42 : 1}>
        {[0, 1, 2].map((i) => <rect key={i} x={G.bx[i]} y={y} width={G.bw} height={G.bh} rx={10 * G.s} fill="#FFFFFF" stroke={C.ink} strokeWidth={2.4} />)}
        {r.sign ? <text x={G.signX} y={ccBase(G, y)} textAnchor="middle" fontSize={G.fs} fontWeight={700} fill={C.ink}>{r.sign}</text> : null}
        <text x={G.cellR - (r.over && r.over.length ? 16 * G.s : 0)} y={ccBase(G, y)} textAnchor="end" fontSize={ccFit(r.L, G.fs, G.cellR - G.cellL - 34 * G.s)} fontWeight={700} fill={r.Lc || CC_INK.big}>{r.L}</text>
        {r.over && r.over.length ? <rect x={G.div - G.fs * 0.36 - 5} y={y + 2} width={G.fs * 0.72 + 10} height={G.bh - 4} rx={8} fill="#FFFFFF" /> : null}
        {mlText(y, r.ml, r.over || [])}
        {r.struck && r.L !== "" && <line x1={G.cellR - lw - 4} y1={ccBase(G, y) - G.fs * 0.32} x2={G.cellR + 4} y2={ccBase(G, y) - G.fs * 0.32} stroke={C.ink} strokeWidth={3.5} />}
        {r.struck && <line x1={G.bx[0] + 10} y1={ccBase(G, y) - G.fs * 0.32} x2={G.bx[2] + G.bw - 10} y2={ccBase(G, y) - G.fs * 0.32} stroke={C.ink} strokeWidth={3.5} />}
        {r.label ? <text x={G.right + 14} y={ccBase(G, y) - 4} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(r.label)}</text> : null}
      </g>
    );
  };
  return (
    <g pointerEvents="none">
      <rect x={G.cellL - 8 * G.s} y={top + 40 * G.s} width={G.cellR - G.cellL + 22 * G.s} height={bottom - top - 32 * G.s} rx={12 * G.s} fill={tint(CC.big, 0.9)} />
      <text x={(G.cellL + G.cellR) / 2} y={G.headY} textAnchor="middle" fontSize={Math.max(32, Math.round(40 * G.s))} fontWeight={700} fill={CC_INK.big}>{tx(u[0])}</text>
      <text x={(G.bx[0] + G.bx[2] + G.bw) / 2} y={G.headY} textAnchor="middle" fontSize={Math.max(32, Math.round(40 * G.s))} fontWeight={700} fill={CC_INK.small}>{tx(u[1])}</text>
      <line x1={G.div} y1={top + 6} x2={G.div} y2={bottom + 6} stroke={C.ink} strokeWidth={4} />
      {F.rows.map((r: any, k: number) => row(r, G.rowY[k], k))}
      {F.extra ? row(F.extra, G.rowY[nr], "x") : null}
      {F.rule && <line x1={G.x + 4} y1={G.ruleY} x2={G.right} y2={G.ruleY} stroke={C.ink} strokeWidth={3} />}
      {F.ans ? row(F.ans, G.ansY, "a") : null}
      {F.chip && (
        <g>
          <rect x={G.cellR - 48 * G.s} y={G.laneY + 6 * G.s} width={56 * G.s} height={64 * G.s} rx={12 * G.s} fill={CC.big} stroke={shade(CC.big, 0.35)} strokeWidth={2} />
          <text x={G.cellR - 20 * G.s} y={G.laneY + 52 * G.s} textAnchor="middle" fontSize={Math.round(44 * G.s)} fontWeight={700} fill="#FFFFFF">1</text>
        </g>
      )}
      {F.amber && F.amber.L !== undefined && <text x={G.cellR} y={G.laneY + 54 * G.s} textAnchor="end" fontSize={Math.round(46 * G.s)} fontWeight={700} fill={CC_INK.amber}>{F.amber.L}</text>}
      {F.amber && F.amber.ml !== undefined && <text x={(G.bx[0] + G.bx[2] + G.bw) / 2} y={G.laneY + 54 * G.s} textAnchor="middle" fontSize={Math.round(46 * G.s)} fontWeight={700} fill={CC_INK.amber}>{F.amber.ml}</text>}
      {F.amber && F.amber.ml !== undefined && <path d={`M ${G.cellR + 4} ${G.laneY + 66 * G.s} Q ${G.div} ${G.laneY + 86 * G.s} ${G.bx[0] + 6} ${G.laneY + 66 * G.s}`} fill="none" stroke={CC_INK.amber} strokeWidth={4} strokeLinecap="round" />}
    </g>
  );
}

/* a jar, glass, cup or mug standing on by (its bottom), filled to frac. A "jar" wears the jar skin (134 x 160, one picture
   at every size, scaled uniformly, never stretched); the glass, cup and mug stay plain (the 3-skin cap) */
const CC_JAR_AR = 134 / 160;
const ccJarSize = (cap: number, shape?: string) => {
  const h = Math.round(66 + cap * 0.14);
  return { w: shape === "jar" ? Math.round(h * CC_JAR_AR) : Math.round(50 + cap * 0.1), h };
};
/* the water, ONE blue everywhere (the plain vessels too): opaque pale blue with one darker edge on top, its bottom corners
   rounded with the body it fills (over a skin it hides the dark glass, so the level reads) */
const ccWater = (IN: any, ly: number, rx: number, id: string, C: any) => (
  <g>
    <defs><clipPath id={id}><rect x={IN.x} y={IN.y} width={IN.w} height={IN.h} rx={rx} /></clipPath></defs>
    <rect x={IN.x} y={ly} width={IN.w} height={Math.max(0, IN.y + IN.h - ly)} fill={CC.water} fillOpacity={0.96} clipPath={`url(#${id})`} />
    <rect x={IN.x} y={ly} width={IN.w} height={4} fill={CC.waterTop} clipPath={`url(#${id})`} />
  </g>
);
function ccJarPic(cx: number, by: number, cap: number, frac: number, shape: string, C: any) {
  const { w, h } = ccJarSize(cap, shape);
  const x = cx - w / 2, y = by - h;
  const f = Math.max(0, Math.min(1, frac));
  if (shape === "jar") {
    const IN = { x: x + w * 0.1, y: y + h * 0.3, w: w * 0.8, h: h * 0.63 };
    return (
      <g>
        <rect x={x + w * 0.1} y={y + h * 0.1} width={w * 0.8} height={h * 0.84} rx={w * 0.22} fill={shade(CC.amber, 0.2)} stroke={C.ink} strokeWidth={3} />
        <Skin name="jar" x={x} y={y} w={w} h={h} fit="stretch" />
        {f > 0 && ccWater(IN, IN.y + IN.h - f * IN.h, w * 0.24, "ccJw" + Math.round(cx) + "-" + Math.round(by) + "-" + cap, C)}
      </g>
    );
  }
  const wl = f * (h - 12);
  return (
    <g>
      {shape === "mug" && <path d={`M ${x + w - 4} ${y + h * 0.22} C ${x + w + 34} ${y + h * 0.22}, ${x + w + 34} ${y + h * 0.78}, ${x + w - 4} ${y + h * 0.78}`} fill="none" stroke={C.ink} strokeWidth={7} strokeLinecap="round" />}
      <rect x={x} y={y} width={w} height={h} rx={shape === "glass" ? 6 : 14} fill={CC.glass} stroke={C.ink} strokeWidth={3} />
      {wl > 0 && ccWater({ x: x + 4, y: y + 6, w: w - 8, h: h - 10 }, by - 4 - wl, shape === "glass" ? 4 : 11, "ccPw" + Math.round(cx) + "-" + Math.round(by) + "-" + cap, C)}
      <line x1={x - 4} y1={y} x2={x + w + 4} y2={y} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
    </g>
  );
}
/* a jug (plain) B = { id, cx, w, nw, top, sh, bot }: its neck line, where it is full, is 6 below the neck's foot */
const ccNeckY = (B: any) => B.sh + 6;
function ccBottlePic(B: any, frac: number, C: any, jug = false) {
  const x = B.cx - B.w / 2, nx = B.cx - B.nw / 2, r = 22;
  const d = `M ${nx} ${B.top} L ${nx} ${B.sh - 18} Q ${nx} ${B.sh}, ${x + r} ${B.sh + 6} Q ${x} ${B.sh + 12}, ${x} ${B.sh + 36} L ${x} ${B.bot - r} Q ${x} ${B.bot}, ${x + r} ${B.bot} `
    + `L ${x + B.w - r} ${B.bot} Q ${x + B.w} ${B.bot}, ${x + B.w} ${B.bot - r} L ${x + B.w} ${B.sh + 36} Q ${x + B.w} ${B.sh + 12}, ${x + B.w - r} ${B.sh + 6} Q ${nx + B.nw} ${B.sh}, ${nx + B.nw} ${B.sh - 18} L ${nx + B.nw} ${B.top} Z`;
  const ny = ccNeckY(B);
  const ly = B.bot - Math.max(0, Math.min(1, frac)) * (B.bot - ny);
  const cid = "ccB-" + B.id;
  return (
    <g>
      <defs><clipPath id={cid}><path d={d} /></clipPath></defs>
      {jug && <path d={`M ${x + B.w - 2} ${B.sh + 40} C ${x + B.w + 46} ${B.sh + 40}, ${x + B.w + 46} ${B.sh + 150}, ${x + B.w - 2} ${B.sh + 160}`} fill="none" stroke={C.ink} strokeWidth={8} strokeLinecap="round" />}
      <path d={d} fill={CC.glass} stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
      {frac > 0 && <rect x={x} y={ly} width={B.w} height={B.bot - ly} fill={CC.water} clipPath={`url(#${cid})`} />}
      {frac > 0 && <rect x={x} y={ly} width={B.w} height={4} fill={CC.waterTop} clipPath={`url(#${cid})`} />}
      <line x1={nx - 10} y1={ny} x2={nx + B.nw + 10} y2={ny} stroke={C.ink} strokeWidth={3} strokeDasharray="7 5" />
      <rect x={nx - 4} y={B.top - 10} width={B.nw + 8} height={12} rx={5} fill={shade(C.panel, 0.2)} stroke={C.ink} strokeWidth={2} />
    </g>
  );
}
/* a bottle wearing the bottle skin (the copper water bottle, 66 x 160, one picture at two sizes, never stretched) B = { id, cx, top, bot }: the water
   fills the body and then the thin neck up to the neck line, by area, so a full bottle reaches the dashed line */
const CC_BOT_AR = 66 / 160;
const ccBottleBox = (B: any) => {
  const h = B.bot - B.top, w = h * CC_BOT_AR, x = B.cx - w / 2, y = B.top;
  return { x, y, w, h, body: { x: x + w * 0.1, y: y + h * 0.43, w: w * 0.8, h: h * 0.52 }, neck: { x: x + w * 0.37, y: y + h * 0.06, w: w * 0.26, h: h * 0.4 }, line: y + h * 0.27 };
};
function ccBottleSkin(B: any, frac: number, C: any) {
  const K = ccBottleBox(B), f = Math.max(0, Math.min(1, frac));
  const aB = K.body.w * K.body.h, aN = K.neck.w * (K.body.y - K.line), v = f * (aB + aN);
  const ly = v <= aB ? K.body.y + K.body.h - v / K.body.w : K.body.y - (v - aB) / K.neck.w;
  const cid = "ccS-" + B.id;
  return (
    <g>
      <defs><clipPath id={cid}><path d={`M ${K.body.x} ${K.body.y + K.w * 0.3} Q ${K.body.x} ${K.body.y}, ${K.neck.x} ${K.body.y - K.w * 0.04} L ${K.neck.x + K.neck.w} ${K.body.y - K.w * 0.04} Q ${K.body.x + K.body.w} ${K.body.y}, ${K.body.x + K.body.w} ${K.body.y + K.w * 0.3} L ${K.body.x + K.body.w} ${K.body.y + K.body.h - K.w * 0.14} Q ${K.body.x + K.body.w} ${K.body.y + K.body.h}, ${K.body.x + K.body.w - K.w * 0.14} ${K.body.y + K.body.h} L ${K.body.x + K.w * 0.14} ${K.body.y + K.body.h} Q ${K.body.x} ${K.body.y + K.body.h}, ${K.body.x} ${K.body.y + K.body.h - K.w * 0.14} Z`} /><rect x={K.neck.x} y={K.neck.y} width={K.neck.w} height={K.neck.h + 8} /></clipPath></defs>
      <rect x={K.body.x + 3} y={K.body.y + 4} width={K.body.w - 6} height={K.body.h - 6} rx={K.w * 0.16} fill={shade(CC.amber, 0.3)} stroke={C.ink} strokeWidth={2} />
      <rect x={K.neck.x + 2} y={K.neck.y + 4} width={K.neck.w - 4} height={K.neck.h - 4} fill={shade(CC.amber, 0.3)} stroke={C.ink} strokeWidth={2} />
      <Skin name="bottle" x={K.x} y={K.y} w={K.w} h={K.h} fit="stretch" />
      {f > 0 && <rect x={K.x} y={ly} width={K.w} height={K.y + K.h - ly} fill={CC.water} fillOpacity={0.96} clipPath={`url(#${cid})`} />}
      {f > 0 && <rect x={K.x} y={ly} width={K.w} height={4} fill={CC.waterTop} clipPath={`url(#${cid})`} />}
      <line x1={K.neck.x - 9} y1={K.line} x2={K.neck.x + K.neck.w + 9} y2={K.line} stroke={C.ink} strokeWidth={3} strokeDasharray="6 4" />
    </g>
  );
}
/* a tank (the tank skin, 144 x 200, stretched to its box) or a 5 L jar (the jar skin at its own aspect): the water is drawn
   over the skin's inner body, then the litre marks and the water line in near-black code */
const ccTankIn = (V: any, vessel: string) => (vessel === "jar" ? { x: V.x + V.w * 0.1, y: V.y + V.h * 0.3, w: V.w * 0.8, h: V.h * 0.63 }
  : { x: V.x + V.w * 0.08, y: V.y + V.h * 0.18, w: V.w * 0.84, h: V.h * 0.7 });
function ccTankPic(V: any, frac: number, capTop: number, vessel: string, C: any, marks?: any) {
  const jar = vessel === "jar";
  const IN = ccTankIn(V, vessel);
  const f = Math.max(0, Math.min(1, frac));
  return (
    <g>
      <rect x={V.x + V.w * 0.12} y={V.y + V.h * (jar ? 0.14 : 0.1)} width={V.w * 0.76} height={V.h * (jar ? 0.8 : 0.82)} rx={jar ? V.w * 0.2 : 18} fill={shade(CC.amber, 0.2)} stroke={C.ink} strokeWidth={3} />
      <Skin name={jar ? "jar" : "tank"} x={V.x} y={V.y} w={V.w} h={V.h} fit="stretch" />
      {f > 0 && ccWater(IN, IN.y + IN.h - f * IN.h, jar ? IN.w * 0.24 : IN.w * 0.14, "ccTw" + Math.round(V.x) + "-" + Math.round(V.y), C)}
      {marks && marks.map((m: any, i: number) => (
        <g key={i}>
          <line x1={IN.x - 2} y1={m.y} x2={IN.x + 26} y2={m.y} stroke={C.ink} strokeWidth={3.5} />
          <text x={V.x - 8} y={m.y + 11} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{m.t}</text>
          {m.u ? <text x={V.x - 8} y={m.y - 26} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{m.u}</text> : null}
        </g>
      ))}
    </g>
  );
}
function ccBucketPic(B: any, C: any) {
  return (
    <g>
      <path d={`M ${B.x + 20} ${B.y + 6} Q ${B.x + B.w / 2} ${B.y - 36} ${B.x + B.w - 20} ${B.y + 6}`} fill="none" stroke={C.ink} strokeWidth={4} />
      <path d={`M ${B.x} ${B.y} L ${B.x + B.w} ${B.y} L ${B.x + B.w - 22} ${B.y + B.h} L ${B.x + 22} ${B.y + B.h} Z`} fill={tint(CC.big, 0.82)} stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
      <rect x={B.x + 8} y={B.y + 8} width={B.w - 16} height={20} rx={9} fill={CC.water} stroke={CC.waterTop} strokeWidth={2} />
    </g>
  );
}
/* the pour counter: the ground line at the bottle's foot (y), one sky-blue mark a pouring hung below it (a part-pouring is half
   height), in rows of `per`; lw = the ground line's width */
function ccMarks(cx: number, y: number, list: any[], per: number, pitch: number, lw: number, C: any) {
  const wRow = per * pitch, x0 = cx - wRow / 2 + 3;
  return (
    <g pointerEvents="none">
      <line x1={cx - lw / 2} y1={y} x2={cx + lw / 2} y2={y} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
      {list.map((m: any, k: number) => {
        const r = Math.floor(k / per), i = k % per, hh = m.full ? 32 : 16;
        return <rect key={k} x={x0 + i * pitch} y={y + 8 + r * 40} width={pitch - 6} height={hh} rx={3} fill={CC.count} stroke={CC_INK.count} strokeWidth={1.5} />;
      })}
    </g>
  );
}

/* the controls' spoken names, one literal per case (so each has its Hindi and Gujarati entry) */
const CC_ARIA: any = { glass: "Fill and pour the glass", cup: "Fill and pour the cup", mug: "Fill and pour the mug", jar: "Fill and pour the jar",
  j100: "Fill and pour the 100 mL jar", j200: "Fill and pour the 200 mL jar", j250: "Fill and pour the 250 mL jar", j500: "Fill and pour the 500 mL jar",
  b1: "Choose the 1 L bottle", b2: "Choose the 2 L bottle" };

/* ── the working area ────────────────────────────────────────────────────────────────────────
   keyOnly: 64,108, 1472 x 520 shut, 900 x 520 open (bigPad); box.key is the key's corner. The picture is laid out
   ONE size, 900 wide, at ox (centred when shut, never under the key): every point below is a picture point, and
   an act's point is A(x, y) = (ox + x, y). */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  /* a measure drawn on the picture ("17 L 350 mL") with its unit symbols in the language in use */
  const U = (s: any) => String(s).replace(/\b(mL|L)\b/g, (m: string) => tx(m));
  const tl = useTimeline(); /* the traceback */
  const free = stage === "free";
  const P = PHASES[Math.max(0, Math.min(PHASES.length - 1, (n || 1) - 1))];
  const it: any = item || P.items[0];
  const warm = !free && !!(P.steps && P.steps.length) && (stage === "demo" || stage === "teach");
  const W = warm ? CC_WARM[P.n] : null;
  const kind = free ? "free" : warm ? "warm" + P.n : it.kind;
  const isDemo = stage === "demo";
  const sIx = stage === "teach" ? 0 : step || 0;
  /* the board belongs to the ENTRY (a question entered again opens fresh) */
  const qk = free ? "free" : warm ? "w" + P.n : "q" + P.n + ":" + index;
  const ekRef = useRef<any>({ qk: "", c: 0 });
  if (ekRef.current.qk !== qk) ekRef.current = { qk, c: ekRef.current.c + 1 };
  const ek = qk + "#" + ekRef.current.c;
  const ekNow = useRef(ek);
  ekNow.current = ek;
  const fresh = (): any => ({ ek, unit: 0, place: null, wstep: 0, wk: -1, wp: 0, swapped: false, broken: false, bp: 0,
    run: 0, back: false, show: null, lit: -1, words: null, nudged: false, lv: {}, jw: {}, mk: {}, sel: "b1", res: {}, mv: null });
  const [raw, setRaw] = useState<any>({ ek: "" });
  const st: any = raw.ek === ek ? raw : fresh();
  const put = (patch: any) => {
    const k = ek;
    setRaw((p: any) => {
      if (k !== ekNow.current) return p;
      const b = p.ek === k ? p : { ...fresh(), ek: k };
      return { ...b, ...(typeof patch === "function" ? patch(b) : patch), ek: k };
    });
  };
  /* the correction's drawing, on its own layer: it clears on the child's next act */
  const [dmRaw, setDm] = useState<any>(null);
  const dm = dmRaw && dmRaw.ek === ek ? dmRaw : null;
  const won = !free && !warm && (stage === "win" || (stage === "idle" && index === P.items.length - 1));

  /* the room: one picture 900 wide, never under the key's corner */
  const bw = box ? box.w : 1472;
  const kx = box && box.key ? box.key.x - 12 : bw;
  const ox = Math.round(Math.max(0, Math.min((bw - 900) / 2, kx - 900)));
  const A = (x: number, y: number) => ({ x: ox + x, y });

  /* ── acts: every act is performed on screen (api.act), the board reacts as it passes each point ── */
  const playing = useRef(false);
  const [busy, setBusy] = useState(0);
  const go = (o: any, done?: () => void) => {
    if (playing.current) return;
    const k = ek;
    playing.current = true;
    setBusy((b: number) => b + 1);
    /* the continuation waits 60 ms, so the runtime takes its act layer away in a render of its own (the logged
       action-anim gap: the layer stood one frame with acting false while a heavy step change rendered with it) */
    Promise.resolve(api.act ? api.act(o) : true).then((ok: any) => setTimeout(() => {
      playing.current = false;
      setBusy((b: number) => b + 1);
      if (ok && k === ekNow.current && done) done();
      /* r29 blocks the working area while an act plays: a tap that came in the act's last moments runs now */
      const q = tapRef.current;
      tapRef.current = null;
      if (q && k === ekNow.current) setTimeout(() => pressRef.current && pressRef.current(q), 0);
    }, 60));
  };
  const tapRef = useRef<any>(null);
  const pressRef = useRef<any>(null);
  useEffect(() => () => { tl.stop(); }, [ek]);

  /* every press on a control: in a guide step only the awaited act acts (any other reports itself and shows the
     step's hint); while a question is open or in free play the act runs and the correction's drawing clears */
  const live = (stage === "ask" || free || isDemo) && !tl.busy;
  const actName = useRef<any>("");
  const lastStepT = useRef(0);
  const lastPress = useRef<any>({ g: "", t: 0 });
  const press = (name: string, fn: () => void) => {
    const t = Date.now();
    /* a guide step never takes a kept tap; a question or free play keeps it, unless it is the control that is acting now */
    if (playing.current) { if (!isDemo && name !== actName.current) tapRef.current = name; return; }
    if (isDemo) {
      /* a double tap or two quick Enters never do two steps (400 ms, also under reduced motion where an act ends at once) */
      if (t - lastStepT.current < 400) return;
      if (name !== stepOn) { api.did(name); return; }
      lastStepT.current = t; actName.current = name; fn(); return;
    }
    if (!live) return;
    /* a double tap on one control (or two rows of one pair) is one act */
    const g = name.split("-")[0];
    if (g === lastPress.current.g && t - lastPress.current.t < 400) return;
    lastPress.current = { g, t };
    /* the cow question: a tap on the row that is already on top keeps the correction on show */
    if (dm && it.kind === "break" && /^cow-/.test(name) && Number(name.slice(4)) - 1 === (st.swapped ? 1 : 0)) return;
    if (dm) setDm(null);
    actName.current = name;
    fn();
  };
  const did = (name: string) => { if (isDemo) api.did(name); };

  /* ═══ phase 1: the unit switch and the frame ═══ */
  const SW = { x: 24, y: 0, w: 520, h: 72 };
  const actSwitch = () => go({ tool: "hand", moves: "tap", at: [A(SW.x + SW.w / 2, SW.y + SW.h / 2)], ms: 800,
    onPoint: () => { put((b: any) => ({ unit: (b.unit + 1) % 3 })); api.sfx.tick(); } }, () => did("switch"));
  /* phase 1's picture at 1.3 times (digits 75): the frame, and the card to its right */
  const G1 = ccGeo(0, 76, 1.3, false, 2);
  const twoLine = kind === "write" && it.L !== "";
  const CARD = { x: 690, y: G1.rowY[0] - 8, w: 206, h: twoLine ? 168 : 112 };
  const placeAt = (where: string) => (where === "h" ? { x: G1.bx[0] + G1.bw, y: G1.rowY[0] + G1.bh / 2 } : { x: G1.bx[1] + G1.bw, y: G1.rowY[0] + G1.bh / 2 });
  const actPlace = (where: string) => {
    if (st.place === where) { did("box-" + where); return; }
    const from = st.place ? placeAt(st.place) : { x: CARD.x + CARD.w / 2, y: CARD.y + CARD.h / 2 };
    put({ mv: "card" });
    go({ tool: "hand", moves: "carry", from: A(from.x, from.y), at: [A(placeAt(where).x, placeAt(where).y)], ms: 1000,
      hold: <g><rect x={-80} y={-38} width={160} height={76} rx={14} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} /><text y={20} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={CC_INK.small}>40</text></g>,
      onPoint: () => { put({ place: where, mv: null }); api.sfx.tick(); } }, () => { put({ mv: null }); });
  };

  /* ═══ phase 2: the warm-up's two frames (a sum that carries, a take-away that breaks), the cow question ═══ */
  const G2s = ccGeo(0, 0, 0.8, true, 2), G2t = ccGeo(450, 0, 0.8, true, 2);
  const G2 = ccGeo(0, 0, 1.1, true, it.rows ? it.rows.length : 2);
  const KEYB = { x: 330, y: 432, w: 240, h: 72 };
  const wShown = (k: number, all: number) => (st.wstep > k ? all : st.wk === k ? st.wp : 0);
  const wAct = (k: number, o: any, on: string) => {
    put({ wk: k, wp: 0 });
    go({ ...o, onPoint: (i: number) => { put({ wk: k, wp: i + 1 }); if (o.sfx) o.sfx(); } }, () => { put({ wstep: k + 1, wk: -1, wp: 0 }); api.sfx.settle(); did(on); });
  };
  const ansMid = (G: any) => G.ansY + G.bh / 2;
  const act2 = (on: string) => {
    const s = st.wstep;
    if (on === "add" && s === 0) wAct(0, { tool: "pencil", moves: "push", ms: 800, sfx: () => api.sfx.tick(),
      at: [A(G2s.div, ansMid(G2s)), ...[0, 1, 2].map((i) => A(ccBoxC(G2s, i), ansMid(G2s)))] }, "add");
    else if (on === "carry" && s === 1) wAct(1, { tool: "hand", moves: "carry", ms: 800, from: A(G2s.div, ansMid(G2s)), at: [A(G2s.cellR - 20 * G2s.s, G2s.laneY + 38 * G2s.s)],
      hold: <g><rect x={-22} y={-26} width={44} height={52} rx={10} fill={CC.big} /><text y={13} textAnchor="middle" fontSize={T.label} fontWeight={700} fill="#FFFFFF">1</text></g> }, "carry");
    else if (on === "add" && s === 2) wAct(2, { tool: "pencil", moves: "push", ms: 800, sfx: () => api.sfx.tick(), at: [A(G2s.cellR - 18, ansMid(G2s))] }, "add");
    else if (on === "break" && s === 3) wAct(3, { tool: "pencil", moves: "push", ms: 800, sfx: () => api.sfx.trade(),
      at: [A(G2t.cellR - 18, ccBase(G2t, G2t.rowY[0]) - 14), A(G2t.cellR - 18, G2t.laneY + 40), A(ccBoxC(G2t, 1), G2t.laneY + 40)] }, "break");
    else if (on === "sub" && s === 4) wAct(4, { tool: "pencil", moves: "push", ms: 800, sfx: () => api.sfx.tick(),
      at: [...[0, 1, 2].map((i) => A(ccBoxC(G2t, i), ansMid(G2t))), A(G2t.cellR - 18, ansMid(G2t))] }, "sub");
  };
  /* the cow question: tap a row to put it on top; Break once the millilitres on top are too few */
  const cowRows = it.kind === "break" ? (st.swapped ? [it.rows[1], it.rows[0]] : [it.rows[0], it.rows[1]]) : null;
  const canBreak = !!cowRows && !st.broken && cowRows[0].ml < cowRows[1].ml && cowRows[0].L > cowRows[1].L;
  const actSwap = (cow: number) => {
    const onTop = st.swapped ? 1 : 0;
    if (cow === onTop || st.broken) return;
    put({ mv: "row" });
    const r = it.rows[cow];
    go({ tool: "hand", moves: "carry", ms: 1000, from: A(G2.cellR - 60, G2.rowY[1] + G2.bh / 2), at: [A(G2.cellR - 60, G2.rowY[0] + G2.bh / 2)],
      hold: <g><rect x={-90} y={-36} width={180} height={72} rx={12} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} /><text y={20} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={CC_INK.big}>{r.L}</text></g>,
      onPoint: () => { put((b: any) => ({ swapped: !b.swapped, mv: null })); api.sfx.tick(); } }, () => put({ mv: null }));
  };
  const actBreak = () => {
    if (!canBreak) return;
    put({ bp: 0 });
    go({ tool: "pencil", moves: "push", ms: 1000,
      at: [A(G2.cellR - 30, ccBase(G2, G2.rowY[0]) - 16), A(G2.cellR - 30, G2.laneY + 40), A(ccBoxC(G2, 1), G2.laneY + 40)],
      onPoint: (i: number) => { put({ bp: i + 1 }); api.sfx.trade(); } }, () => { put({ broken: true, bp: 3 }); api.sfx.settle(); });
  };

  /* ═══ phase 3: the tank, the story card, Run, the answer card and its words ═══ */
  const story: any[] = kind === "warm3" ? W.story : it.story || [];
  const vessel = kind === "warm3" ? W.vessel : it.vessel || "tank";
  const phrases: any[] = kind === "warm3" ? W.phrases : it.phrases || [];
  const maxLv = story.length ? Math.max(...story.map((_: any, k: number) => ccLevel(story, k))) : 1;
  const stepL = maxLv <= 10000 ? 1000 : 10000;
  const capTop = Math.max(stepL, Math.ceil(maxLv / stepL) * stepL);
  const TK = vessel === "jar" ? { x: 70, y: 320 - Math.round(200 / CC_JAR_AR), w: 200, h: Math.round(200 / CC_JAR_AR) } : { x: 70, y: 20, w: 200, h: 300 };
  const TIN = ccTankIn(TK, vessel);
  const lvY = (ml: number) => TIN.y + TIN.h - (ml / capTop) * TIN.h;
  const SC = { x: 286, y: 0, w: 280, lh: 88 };
  const lineY = (k: number) => SC.y + 10 + k * SC.lh;
  /* Run stands under the tank, so the correction's working has the room under the story card */
  const RUN = { x: 30, y: 432, w: 240, h: 72 };
  const AC = { x: 582, y: 0, w: 314, h: 168 };
  const PK = (j: number) => ({ x: AC.x, y: 182 + j * 82, w: AC.w, h: 72 });
  const lastLine = story.length - 1;
  const actRun = () => {
    const k0 = st.run, k1 = st.back ? k0 - 1 : k0 + 1;
    if (k1 < 0 || k1 > lastLine) return;
    const l0 = ccLevel(story, k0), l1 = ccLevel(story, k1), at: any[] = [];
    for (let i = 1; i <= 4; i++) at.push(A(TK.x + TK.w / 2, lvY(l0 + ((l1 - l0) * i) / 4)));
    const ln = st.back ? k0 : k1;
    go({ tool: "hand", moves: "push", ms: 950, from: A(SC.x + 40, lineY(ln) + 30), at,
      onPoint: (i: number) => put({ show: l0 + ((l1 - l0) * (i + 1)) / 4, lit: ln }) },
      () => { put((b: any) => ({ run: k1, show: null, lit: ln, back: k1 >= lastLine ? true : k1 <= 0 ? false : b.back })); api.sfx.settle(); did("run"); });
  };
  const wordsRef = useRef<any>(null);
  wordsRef.current = st.words;
  HOOK.pickWords = () => { if (it && it.words && !warm) { wordsRef.current = it.words; put({ words: it.words, nudged: false }); } };
  const pickWords = (id: string) => {
    wordsRef.current = id;
    const was = st.nudged;
    put({ words: id, nudged: false });
    api.sfx.tick();
    did("words-" + id);
    if (stage === "ask") {
      /* after a miss the measure stays as it was (the next digit still starts its box afresh). When that measure was right and
         only the words missed, a new choice of words is the whole new answer: it is sent at once */
      const ps = slotPartsOf(typed, 2), lw = wrong && Array.isArray(wrong.value) ? wrong.value[2] : null;
      if (wrong && typed === missTyped.current && ps[0] !== "" && ps[1] !== "" && id !== lw && judgeSlotParts(it, ps.join("|"))) { api.submit([ps[0], ps[1], id]); return; }
      if (was) api.say(it.say);
    }
  };
  const missTyped = useRef<any>(null);
  const storyEnter = (v: any) => {
    const ps = slotPartsOf(v === undefined ? typed : v, 2);
    if (!wordsRef.current) { put({ nudged: true }); api.say("Choose the words that answer the question."); return; }
    api.submit([ps[0], ps[1], wordsRef.current]);
  };

  /* ═══ phase 4 and free play: the jars, the bucket, the bottles, the pour counter, the results table ═══ */
  const BK = { x: 20, y: 384, w: 170, h: 104 };
  const SHELF = 330;
  const pw: any = (() => {
    if (kind === "warm4") return { jars: [{ id: "j", cap: W.jar, cx: 105, name: W.jarName, shape: "jar" }],
      pots: [{ id: "b", cap: W.bottle, cx: 380, w: Math.round(270 * CC_BOT_AR), top: 130, bot: 400, skin: true, own: "j", label: "1 L" }] };
    if (kind === "pour") return { jars: [{ id: "j", cap: it.jar, cx: 105, name: it.jarName, shape: it.jarName }],
      pots: [it.pot === "jug" ? { id: "b", cap: it.bottle, cx: 380, w: 210, nw: 70, top: 70, sh: 150, bot: 400, own: "j", label: ccMeas(it.bottle), jug: true }
        : { id: "b", cap: it.bottle, cx: 380, w: Math.round(296 * CC_BOT_AR), top: 104, bot: 400, skin: true, own: "j", label: ccMeas(it.bottle) }] };
    if (kind === "pour2") return { jars: [{ id: "mug", cap: 400, cx: 58, name: "mug", shape: "mug" }, { id: "glass", cap: 200, cx: 180, name: "glass", shape: "glass" }],
      pots: [{ id: "A", cap: it.bottle, cx: 330, w: 170, nw: 58, top: 112, sh: 186, bot: 400, own: "mug", label: ccMeas(it.bottle), jug: true },
        { id: "B", cap: it.bottle, cx: 540, w: 170, nw: 58, top: 112, sh: 186, bot: 400, own: "glass", label: ccMeas(it.bottle), jug: true }] };
    if (free) return { free: true, jars: [100, 200, 250, 500].map((c: number, i: number) => ({ id: "j" + c, cap: c, cx: [50, 152, 258, 380][i], name: c + " mL", shape: "jar" })),
      pots: [{ id: "b1", cap: 1000, cx: 500, w: Math.round(220 * CC_BOT_AR), top: 180, bot: 400, skin: true, label: "1 L" }, { id: "b2", cap: 2000, cx: 628, w: Math.round(300 * CC_BOT_AR), top: 100, bot: 400, skin: true, label: "2 L" }] };
    return null;
  })();
  const jarOf = (id: string) => (pw ? pw.jars.find((j: any) => j.id === id) : null);
  const potFor = (j: any) => (pw.free ? pw.pots.find((p: any) => p.id === st.sel) : pw.pots.find((p: any) => p.own === j.id));
  const mouth = (p: any) => ({ x: p.cx + 10, y: p.top - 46 });
  /* one pouring: the jar (filled at the bucket first if it is empty) tips over its bottle until it is empty or the
     bottle reaches its neck line; a jar that stops with water in it keeps that water */
  const actPour = (jid: string, mode: string) => {
    const j = jarOf(jid);
    if (!j) return;
    const p = potFor(j);
    const lv = (p && st.lv[p.id]) || 0;
    const has = st.jw[jid] || 0;
    if (mode !== "fill" && p && lv >= p.cap) {
      /* a tap on a jar when its bottle is already full: one short line (free play: how to start again) */
      if (pw.free) api.say("This bottle is full: tap Empty to pour again.");
      else { api.say("This bottle is already full."); fullSaid.current = true; }
      api.sfx.tick();
      return;
    }
    const at: any[] = [], fns: any[] = [];
    const jy = SHELF - ccJarSize(j.cap, j.shape).h / 2;
    if (mode === "fill" || (has <= 0 && mode !== "pour")) { at.push(A(BK.x + BK.w / 2, BK.y - 20)); fns.push(() => { put((b: any) => ({ jw: { ...b.jw, [jid]: j.cap } })); api.sfx.tick(); }); }
    if (mode !== "fill") {
      at.push(A(mouth(p).x, mouth(p).y));
      fns.push(() => {
        put((b: any) => {
          const w0 = b.jw[jid] || (mode === "pour" ? 0 : j.cap);
          const l0 = b.lv[p.id] || 0, amt = Math.min(w0, p.cap - l0);
          if (amt <= 0) return {};
          const mk = [...(b.mk[p.id] || []), { j: jid, a: amt, full: amt === j.cap }];
          const nl = l0 + amt, res = { ...b.res };
          if (pw.free && nl === p.cap && mk.every((m: any) => m.j === jid && m.full)) res[p.id + ":" + jid] = mk.length;
          return { lv: { ...b.lv, [p.id]: nl }, jw: { ...b.jw, [jid]: w0 - amt }, mk: { ...b.mk, [p.id]: mk }, res };
        });
        api.sfx.settle();
      });
    }
    put({ mv: jid });
    go({ tool: "hand", moves: "carry", ms: at.length > 1 ? 1200 : 850, from: A(j.cx, jy), at, to: A(j.cx, jy),
      hold: <g transform={mode === "fill" ? undefined : "rotate(-28)"}>{ccJarPic(0, ccJarSize(j.cap, j.shape).h / 2, j.cap, 0.85, j.shape, C)}</g>,
      onPoint: (i: number) => fns[i] && fns[i]() }, () => { put({ mv: null }); did(mode === "fill" ? "fill" : mode === "pour" ? "pour" : "jar-" + jid); });
  };
  const fullSaid = useRef(false);
  /* the question comes back on the bubble once the child types after that line */
  useEffect(() => { if (fullSaid.current && typed && stage === "ask") { fullSaid.current = false; api.say(it.say); } }, [typed]);
  const actEmpty = () => go({ tool: "hand", moves: "sweep", ms: 1000, at: pw.pots.map((p: any) => A(p.cx, p.bot - 40)),
    onPoint: (i: number) => { const id = pw.pots[i].id; put((b: any) => ({ lv: { ...b.lv, [id]: 0 }, mk: { ...b.mk, [id]: [] } })); api.sfx.settle(); } });

  /* ═══ guide steps: Enter, the agent's check() and the dev solve() perform the CURRENT step ═══ */
  const doStep = (on: any) => {
    if (playing.current || !on) return;
    if (P.n === 1 && on === "switch") actSwitch();
    else if (P.n === 2) act2(on);
    else if (P.n === 3 && on === "run") actRun();
    else if (P.n === 3 && String(on).indexOf("words-") === 0) pickWords(String(on).slice(6));
    else if (P.n === 4 && (on === "fill" || on === "pour")) actPour("j", on);
  };
  const pend = useRef(0);
  HOOK.demo = () => {
    if (!isDemo || !stepOn) return;
    if (playing.current) { pend.current = Math.min(pend.current + 1, Math.max(0, P.steps.length - sIx)); return; }
    doStep(stepOn);
  };
  useEffect(() => {
    if (!isDemo) { pend.current = 0; return; }
    if (stepOn && pend.current > 0 && !playing.current) { pend.current -= 1; doStep(stepOn); }
  }, [stepOn, stage, busy]);
  /* Enter (and the agent's check) in a guide step goes through the same 400 ms guard as a tap */
  api.onEnter(isDemo && stepOn ? () => press(stepOn, () => doStep(stepOn)) : kind === "story" && stage === "ask" ? storyEnter : null);

  /* ═══ the traceback: redraw the maths in steps, ending on the whole right answer ═══ */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    api.lock(true);
    const k = ek, t0 = typed;
    missTyped.current = typed;
    /* phase 3: a measure that missed gets the working (the break across the zero) before the card; right measure, wrong words: the card only */
    const measOk = kind === "story" && judgeSlotParts(it, Array.isArray(wrong.value) ? wrong.value.slice(0, 2) : String(wrong.value ?? "").split("|").slice(0, 2).join("|"));
    const work = kind === "story" && !!it.unbundle && !measOk;
    const nStep = kind === "place" ? 4 : kind === "write" ? 2 : kind === "carry" ? 3 : kind === "break" ? 4
      : kind === "story" ? story.length + (work ? 4 : 1) : kind === "pour" ? it.answer + 1 : kind === "pour2" ? Math.max(...it.answer) + 1 : 1;
    const ms = kind === "pour" || kind === "pour2" ? 260 : 900;
    const steps: any[] = [];
    for (let s = 1; s <= nStep; s++) steps.push([ms, () => setDm({ ek: k, s, typed: t0, w: work })]);
    tl.run(steps, () => api.lock(false));
  }, [wrong]);
  /* the correction clears when the child types again */
  useEffect(() => { if (dm && typed !== dm.typed) setDm(null); }, [typed]);

  /* the win: the tool's own one-sentence line (a phase's last one is replaced by its closing line) */
  useEffect(() => {
    if (stage !== "win" || free || !it || !it.win) return;
    api.say(it.win);
  }, [stage, ek]);

  /* what the host and the agent read back (toolApi.getState) */
  api.share({ operation: kind === "carry" || kind === "place" ? "add" : kind === "break" || kind === "story" ? "take away" : kind === "write" ? "write" : "pour",
    unit: CC_UNITS[st.unit][0] + " " + CC_UNITS[st.unit][1], linesRun: kind === "story" || kind === "warm3" ? st.run : null,
    answerCard: st.words, complete: stage === "idle" });

  /* ─────────────────────────── drawing ─────────────────────────── */
  const ds = dm ? dm.s : 0;
  const sumL = (rows: any[]) => rows.reduce((a: number, r: any) => a + r.L, 0);
  const sumMl = (rows: any[]) => rows.reduce((a: number, r: any) => a + r.ml, 0);
  const tp = slotPartsOf(typed, 2);
  const typedRow = (Lc: string, mc: string) => {
    if (!typed) return null;
    const r = ccRight(tp[1], mc);
    return { L: String(tp[0] || "").slice(0, 3), Lc, ml: r.ml, over: r.over };
  };
  const invite = (x: number, y: number, w: number, h: number, rx = 14) => <Invite x={x + w / 2} y={y + h / 2} w={w} h={h} rx={rx} C={C} />;
  const keyLabel = (b: any, label: string, disabled = false) => (
    <text y={11} textAnchor="middle" fontSize={ccFit(tx(label), T.label, b.w - 24)} fontWeight={700} fill={disabled ? C.ink : toneInk("key", C.ink)}>{tx(label)}</text>
  );
  /* a white label chip whose bottom edge is at yb: one line at 32 when it fits maxW, else the litres over the millilitres
     (or the number over its unit), two lines 44 apart so a Devanagari matra never meets the line above */
  const chip = (cx: number, yb: number, txt: string, maxW: number) => {
    const pad = lang === "en" ? 28 : 36, one = U(txt), w1 = ccEm(one) * T.label + pad;
    if (w1 <= maxW) return (
      <g pointerEvents="none">
        <rect x={cx - w1 / 2} y={yb - 48} width={w1} height={48} rx={12} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
        <text x={cx} y={yb - 13} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{one}</text>
      </g>
    );
    const m = String(txt).match(/^(.*\bL)\s+(.+)$/) || String(txt).match(/^(\S+)\s+(.+)$/) || [txt, txt, ""];
    const a = U(m[1]), b = U(m[2]), w2 = Math.min(maxW, Math.max(ccEm(a), ccEm(b)) * T.label + pad - 12);
    return (
      <g pointerEvents="none">
        <rect x={cx - w2 / 2} y={yb - 96} width={w2} height={96} rx={12} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
        <text x={cx} y={yb - 58} textAnchor="middle" fontSize={ccFit(a, T.label, w2 - pad + 8)} fontWeight={700} fill={C.ink}>{a}</text>
        <text x={cx} y={yb - 14} textAnchor="middle" fontSize={ccFit(b, T.label, w2 - pad + 8)} fontWeight={700} fill={C.ink}>{b}</text>
      </g>
    );
  };
  const joinChip = (x: number, y: number, unit: number, w = 336) => {
    const u = CC_UNITS[unit];
    /* the joining number: "1 L" and "= 1,000 mL" as two labels (each at most 4 words), split where their widths say, 10 apart */
    const a = "1 " + tx(u[0]), b = "= 1,000 " + tx(u[1]);
    const k = lang === "en" ? 1 : 1.12, ea = ccEm(a) * k, eb = ccEm(b) * k, room = w - 34;
    const fs = Math.max(28, Math.min(T.prompt, Math.floor(room / (ea + eb))));
    const sx = x + 12 + (room * ea) / (ea + eb);
    return (
      <g pointerEvents="none">
        <rect x={x} y={y} width={w} height={64} rx={14} fill={tint(CC.amber, 0.82)} stroke={C.ink} strokeWidth={2} />
        <text x={sx} y={y + 44} textAnchor="end" fontSize={fs} fontWeight={700} fill={CC_INK.big}>{a}</text>
        <text x={sx + 10} y={y + 44} fontSize={fs} fontWeight={700} fill={C.ink}>{b}</text>
      </g>
    );
  };
  /* the card that holds the measure: one line, or the litres over the millilitres */
  const card = (txt: string) => {
    const m = twoLine ? String(txt).match(/^(.*\bL)\s+(.+)$/) : null;
    return (
      <g pointerEvents="none">
        <rect x={CARD.x} y={CARD.y} width={CARD.w} height={CARD.h} rx={16} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} />
        {m ? (
          <g>
            <text x={CARD.x + CARD.w / 2} y={CARD.y + 68} textAnchor="middle" fontSize={ccFit(U(m[1]), T.xl, CARD.w - 28)} fontWeight={700} fill={CC_INK.big}>{U(m[1])}</text>
            <text x={CARD.x + CARD.w / 2} y={CARD.y + 140} textAnchor="middle" fontSize={ccFit(U(m[2]), T.xl, CARD.w - 28)} fontWeight={700} fill={CC_INK.small}>{U(m[2])}</text>
          </g>
        ) : <text x={CARD.x + CARD.w / 2} y={CARD.y + CARD.h / 2 + 20} textAnchor="middle" fontSize={ccFit(U(txt), T.xl, CARD.w - 28)} fontWeight={700} fill={CC_INK.small}>{U(txt)}</text>}
      </g>
    );
  };

  /* phase 1 */
  const drawP1 = () => {
    const unit = kind === "warm1" ? st.unit : 0;
    const swDraw = (
      <g pointerEvents="none">
        <rect x={SW.x} y={SW.y} width={SW.w} height={SW.h} rx={36} fill={tint(C.panel, 0.3)} stroke={C.ink} strokeWidth={3} />
        {CC_UNITS.map((u: any, i: number) => {
          const sx = SW.x + 6 + (i * (SW.w - 12)) / 3, sw = (SW.w - 12) / 3, on = i === unit;
          const s = tx(u[0]) + ", " + tx(u[1]);
          return (
            <g key={i}>
              {on && <rect x={sx} y={SW.y + 6} width={sw} height={SW.h - 12} rx={30} fill={CC.big} />}
              <text x={sx + sw / 2} y={SW.y + SW.h / 2 + 11} textAnchor="middle" fontSize={ccFit(s, T.label, sw - 16)} fontWeight={700} fill={on ? "#FFFFFF" : C.ink}>{s}</text>
            </g>
          );
        })}
      </g>
    );
    if (kind === "warm1") {
      const G = ccGeo(0, 88, 1.3, false, 1);
      return (
        <g>
          {swDraw}
          {joinChip(552, 4, unit, 344)}
          {ccFrame(G, { unit, rows: [ccRow(W.rows[0])] }, C, tx)}
          {isDemo && stepOn === "switch" && <Hit id="switch" x={SW.x} y={SW.y} w={SW.w} h={Math.max(72, SW.h)} label={tx("unit switch")} onPress={() => press("switch", actSwitch)} />}
          {isDemo && stepOn === "switch" && invite(SW.x, SW.y, SW.w, SW.h, 36)}
        </g>
      );
    }
    if (kind === "place") {
      const solved = won || ds >= 2;
      const place = solved ? "t" : st.place;
      const r0ml = place === "h" ? [{ d: "4", c: CC_INK.small }, { d: "0", c: CC_INK.small }, { d: "", c: C.ink }]
        : place === "t" ? [{ d: "0", c: CC.zero }, { d: "4", c: CC_INK.small }, { d: "0", c: CC_INK.small }] : [{ d: "", c: C.ink }, { d: "", c: C.ink }, { d: "", c: C.ink }];
      const rows = [{ L: "23", Lc: CC_INK.big, ml: place && st.mv !== "card" ? r0ml : [{ d: "" }, { d: "" }, { d: "" }] }, ccRow(it.rows[1])];
      let ans: any = typedRow(C.ink, C.ink);
      if (dm) ans = { L: ds >= 4 ? "38" : "", Lc: CC_INK.big, ...(ds >= 3 ? ccRight("725", CC_INK.small) : { ml: [{ d: "" }, { d: "" }, { d: "" }], over: [] }) };
      if (won) ans = { L: "38", Lc: CC_INK.big, ...ccRight("725", CC_INK.small) };
      const cardOn = !place && st.mv !== "card" && !solved;
      /* the questions are litres only: no unit switch (it is the warm-up's) */
      return (
        <g>
          {joinChip(552, 0, 0, 344)}
          {ccFrame(G1, { unit: 0, rows, rule: true, ans: ans || { L: "", ml: [{ d: "" }, { d: "" }, { d: "" }] } }, C, tx)}
          {cardOn && card(it.card)}
          {stage === "ask" && !tl.busy && ["h", "t"].map((w: string, i: number) => (
            <Hit key={w} id={"box-" + w} x={G1.bx[i]} y={G1.rowY[0]} w={G1.bw} h={G1.bh} label={tx(i ? "Put the 4 of 40 mL in the tens box" : "Put the 4 of 40 mL in the hundreds box")}
              onPress={() => press("box-" + w, () => actPlace(w))} />
          ))}
        </g>
      );
    }
    /* write: what goes in the boxes, as the child types it; the correction writes the true row under it */
    const G = ccGeo(0, 76, 1.3, false, 1);
    const own = { L: it.L === "" ? "" : String(it.L), Lc: CC_INK.big, ml: won ? ccRow({ L: "", ml: it.ml }).ml : ccLeft(typed, C.ink) };
    let extra: any = null;
    if (dm) extra = { L: it.L === "" ? "" : String(it.L), Lc: CC_INK.big, ...ccRight(String(it.ml), CC_INK.small, ds >= 2) };
    return (
      <g>
        {joinChip(552, 0, 0, 344)}
        {ccFrame(G, { unit: 0, rows: [own], extra }, C, tx)}
        {card(it.card)}
      </g>
    );
  };

  /* phase 2 */
  const drawP2 = () => {
    if (kind === "warm2") {
      const s0 = wShown(0, 4), carried = wShown(1, 1) >= 1, s2 = wShown(2, 1), s3 = wShown(3, 3), s4 = wShown(4, 4);
      const sumAns: any = { L: s2 >= 1 ? "4" : "", Lc: CC_INK.big, ml: [{ d: "" }, { d: "" }, { d: "" }], over: [] };
      if (carried) sumAns.ml = ccRight("300", CC_INK.small).ml;
      else if (s0 > 0) { const d = ["1", "3", "0", "0"]; sumAns.over = [{ d: "1", c: CC_INK.small }]; sumAns.ml = [0, 1, 2].map((i) => ({ d: s0 >= i + 2 ? d[i + 1] : "", c: CC_INK.small })); }
      const sub = W.sub.map((r: any, k: number) => ccRow(r, { struck: k === 0 && s3 >= 1 }));
      const subAns: any = { L: s4 >= 4 ? "2" : "", Lc: CC_INK.left, ml: [0, 1, 2].map((i) => ({ d: s4 >= i + 1 ? "700"[i] : "", c: CC_INK.left })), over: [] };
      const amber = s3 >= 2 ? { L: "4", ml: s3 >= 3 ? "1,200" : undefined } : null;
      const on = stepOn;
      const label = on === "add" ? "Add" : on === "carry" ? "Carry" : on === "break" ? "Break" : on === "sub" ? "Take away" : "";
      return (
        <g>
          {ccFrame(G2s, { unit: 0, rows: W.sum.map((r: any) => ccRow(r)), rule: true, ans: sumAns, chip: carried }, C, tx)}
          {ccFrame(G2t, { unit: 0, rows: sub, rule: true, ans: subAns, amber }, C, tx)}
          {isDemo && on && label && (
            <g>
              <Key key="act0" id={on} label={tx(label)} x={KEYB.x} y={KEYB.y} w={KEYB.w} h={KEYB.h} C={C} tone="key" onClick={() => press(on, () => act2(on))}>{keyLabel(KEYB, label)}</Key>
              {invite(KEYB.x, KEYB.y, KEYB.w, KEYB.h)}
            </g>
          )}
        </g>
      );
    }
    if (kind === "carry") {
      const rows = it.rows.map((r: any) => ccRow(r));
      const tot = sumMl(it.rows), L = sumL(it.rows) + Math.floor(tot / 1000);
      let ans: any = typedRow(C.ink, C.ink), chip = false;
      if (dm) {
        ans = { L: ds >= 3 ? String(L) : "", Lc: CC_INK.big, ...(ds >= 2 ? ccRight(String(tot % 1000), CC_INK.small, true) : ccRight(String(tot), CC_INK.small, true)) };
        chip = ds >= 2;
      }
      if (won) { ans = { L: String(L), Lc: CC_INK.big, ...ccRight(String(tot % 1000), CC_INK.small, true) }; chip = true; }
      return (
        <g>
          {joinChip(560, 0, 0)}
          {ccFrame(G2, { unit: 0, rows, rule: true, ans: ans || { L: "", ml: [{ d: "" }, { d: "" }, { d: "" }] }, chip }, C, tx)}
        </g>
      );
    }
    /* break: the cows */
    const sw = dm || won ? true : st.swapped;
    const order = sw ? [it.rows[1], it.rows[0]] : [it.rows[0], it.rows[1]];
    const brk = won || ds >= 2 ? 3 : st.broken ? 3 : st.bp;
    const showBrk = sw && (won || ds >= 2 || st.broken || st.bp > 0);
    const rows = order.map((r: any, k: number) => ccRow({ ...r, sign: k === 1 ? "−" : "" }, { struck: k === 0 && showBrk && brk >= 1, dim: st.mv === "row" && k === 0 && !dm }));
    const top = order[0], bot = order[1];
    const amber = showBrk && brk >= 2 ? { L: String(top.L - 1), ml: brk >= 3 ? ccNum(top.ml + 1000) : undefined } : null;
    const diff = top.L * 1000 + top.ml - (bot.L * 1000 + bot.ml);
    let ans: any = typedRow(C.ink, C.ink);
    /* the child's own working stands first, then the break and the true answer */
    if (dm && ds === 1) ans = typedRow(C.ink, C.ink);
    else if (dm) ans = { L: ds >= 4 ? String(Math.floor(diff / 1000)) : "", Lc: CC_INK.left, ...(ds >= 3 ? ccRight(String(diff % 1000), CC_INK.left, true) : { ml: [{ d: "" }, { d: "" }, { d: "" }], over: [] }) };
    if (won) ans = { L: String(Math.floor(diff / 1000)), Lc: CC_INK.left, ...ccRight(String(diff % 1000), CC_INK.left, true) };
    const bk = canBreak && stage === "ask" && !tl.busy;
    return (
      <g>
        {joinChip(560, 0, 0)}
        {ccFrame(G2, { unit: 0, rows, rule: true, ans: ans || { L: "", ml: [{ d: "" }, { d: "" }, { d: "" }] }, amber }, C, tx)}
        {stage === "ask" && !tl.busy && !st.broken && [0, 1].map((k: number) => {
          const cow = sw ? (k === 0 ? 1 : 0) : k;
          return <Hit key={"cow" + cow} id={"cow-" + (cow + 1)} x={G2.x} y={G2.rowY[k]} w={G2.right - G2.x} h={G2.bh}
            label={tx(cow ? "Put the 2nd cow's milk on top" : "Put the 1st cow's milk on top")} onPress={() => press("cow-" + (cow + 1), () => actSwap(cow))} />;
        })}
        {stage === "ask" && (
          <Key key="act0" id="break" label={tx("Break")} x={KEYB.x} y={KEYB.y} w={KEYB.w} h={KEYB.h} C={C} tone="key" disabled={!bk} onClick={() => press("break", actBreak)}>{keyLabel(KEYB, "Break", !bk)}</Key>
        )}
      </g>
    );
  };

  /* phase 3 */
  const drawP3 = () => {
    const ds3 = dm ? Math.max(0, Math.min(ds - 1, lastLine)) : -1;
    const run = won ? lastLine : dm ? ds3 : st.run;
    const level = !dm && !won && st.show !== null ? st.show : ccLevel(story, run);
    const lit = won ? lastLine : dm ? ds3 : st.show !== null ? st.lit : st.run;
    const marks: any[] = [];
    for (let v = stepL; v <= capTop; v += stepL) marks.push({ y: lvY(v), t: String(v / 1000), u: v === capTop ? tx("L") : null });
    const dev = lang !== "en";
    const wk = !!(dm && dm.w && it.unbundle);
    const cardDone = won || (dm && ds >= story.length + (wk ? 4 : 1));
    const words = cardDone ? it.words : st.words;
    const phraseOf = (id: any) => (phrases.find((p: any) => p.id === id) || {}).label;
    /* a story line: what happens (small) over how much (bold), two labels */
    /* the typed measure on the card: at most 3 digits of litres and 4 of millilitres are drawn (the slot keeps the rest) */
    const Lv = cardDone ? String(it.answer[0]) : kind === "story" && typed ? String(tp[0]).slice(0, 3) : "";
    const Mv = cardDone ? String(it.answer[1]) : kind === "story" && typed ? String(tp[1]).slice(0, 4) : "";
    const vc = cardDone ? CC_INK.left : C.ink;
    const LB = { x: AC.x + 10, y: AC.y + 20, w: dev ? 64 : 72, h: 72 }, MB = { x: AC.x + (dev ? 122 : 128), y: AC.y + 20, w: dev ? 96 : 104, h: 72 };
    const isWarm = kind === "warm3";
    return (
      <g>
        <g pointerEvents="none">
          {ccTankPic(TK, level / capTop, capTop, vessel, C, marks)}
          {/* the correction and the win light the last level: a reddish-purple band across the water line */}
          {(dm || won) && <rect x={TIN.x - 6} y={lvY(level) - 5} width={TIN.w + 12} height={10} rx={5} fill={CC.left} stroke={C.ink} strokeWidth={1.5} />}
          <rect x={SC.x} y={SC.y} width={SC.w} height={story.length * SC.lh + 16} rx={16} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} />
          {story.map((s: any, k: number) => {
            const v = tx(s.verb), m = U(ccMeas(s.amt)), on = k === lit;
            return (
              <g key={k}>
                {on && <rect x={SC.x + 8} y={lineY(k) - 2} width={SC.w - 16} height={SC.lh - 6} rx={10} fill={tint(CC.big, 0.8)} />}
                <text x={SC.x + 20} y={lineY(k) + (dev ? 36 : 32)} fontSize={ccFit(v, T.label, SC.w - 40)} fontWeight={600} fill={C.ink}>{v}</text>
                <text x={SC.x + 20} y={lineY(k) + (dev ? 76 : 70)} fontSize={ccFit(m, T.label, SC.w - 40)} fontWeight={700} fill={C.ink}>{m}</text>
              </g>
            );
          })}
          {/* the correction's working under the story card: the litre broken across the zero, the millilitres, the litres */}
          {wk && ds >= story.length + 1 && (() => {
            const UB = it.unbundle, wy = SC.y + story.length * SC.lh + 30;
            const rows = [[U(UB.from), U(UB.to), CC_INK.amber], [UB.ml, U(UB.mlAns), CC_INK.left], [UB.L, U(UB.LAns), CC_INK.left]];
            /* Hindi and Gujarati lines stand further apart, so a matra never meets the line above */
            const top = dev ? 40 : 36, pair = dev ? 82 : 72, gap = dev ? 42 : 36;
            return (
              <g>
                <rect x={SC.x} y={wy} width={SC.w + 10} height={top + 2 * pair + gap + (dev ? 22 : 18)} rx={14} fill={tint(CC.amber, 0.88)} stroke={C.ink} strokeWidth={2} />
                {rows.map((r: any, i: number) => {
                  if (ds < story.length + 1 + i) return null;
                  const fa = ccFit(r[0], T.label, SC.w - 24), fb = ccFit(r[1], T.label, i === 0 ? SC.w - 16 : SC.w - 44), y = wy + top + i * pair, w1 = ccEm(r[0]) * fa;
                  return (
                    <g key={i}>
                      {/* row 0 as the frame writes a break: the new figure in amber ABOVE the struck one; rows 1-2: the working, then its result */}
                      <text x={SC.x + 20} y={i === 0 ? y + gap : y} fontSize={fa} fontWeight={700} fill={C.ink}>{r[0]}</text>
                      {i === 0 && <line x1={SC.x + 16} y1={y + gap - fa * 0.32} x2={SC.x + 22 + w1} y2={y + gap - fa * 0.32} stroke={C.ink} strokeWidth={3} />}
                      <text x={i === 0 ? SC.x + 20 : SC.x + 48} y={i === 0 ? y : y + gap} fontSize={fb} fontWeight={700} fill={r[2]}>{r[1]}</text>
                    </g>
                  );
                })}
              </g>
            );
          })()}
          {/* the answer card: the measure's two blanks and the question's own words */}
          {!isWarm && (
            <g>
              <rect x={AC.x} y={AC.y} width={AC.w} height={AC.h} rx={16} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} />
              <rect x={LB.x} y={LB.y} width={LB.w} height={LB.h} rx={10} fill="#FFFFFF" stroke={C.ink} strokeWidth={2.4} />
              <text x={LB.x + LB.w / 2} y={LB.y + 52} textAnchor="middle" fontSize={ccFit(Lv, T.xl, LB.w - 10)} fontWeight={700} fill={cardDone ? CC_INK.left : CC_INK.big}>{Lv}</text>
              <text x={LB.x + LB.w + 5} y={LB.y + 50} fontSize={ccFit(tx("L"), T.label, (MB.x - LB.x - LB.w - 12) / (dev ? 1.15 : 1))} fontWeight={700} fill={CC_INK.big}>{tx("L")}</text>
              <rect x={MB.x} y={MB.y} width={MB.w} height={MB.h} rx={10} fill="#FFFFFF" stroke={C.ink} strokeWidth={2.4} />
              <text x={MB.x + MB.w / 2} y={MB.y + 52} textAnchor="middle" fontSize={ccFit(Mv, T.xl, MB.w - 10)} fontWeight={700} fill={cardDone ? CC_INK.left : CC_INK.small}>{Mv}</text>
              <text x={MB.x + MB.w + 6} y={MB.y + 50} fontSize={ccFit(tx("mL"), T.label, (AC.x + AC.w - MB.x - MB.w - 16) / (dev ? 1.15 : 1))} fontWeight={700} fill={CC_INK.small}>{tx("mL")}</text>
              {words ? <text x={AC.x + AC.w / 2} y={AC.y + 146} textAnchor="middle" fontSize={ccFit(tx(phraseOf(words)), T.label, AC.w - 24)} fontWeight={700} fill={vc}>{tx(phraseOf(words))}</text>
                : <line x1={AC.x + 40} y1={AC.y + 146} x2={AC.x + AC.w - 40} y2={AC.y + 146} stroke={C.ink} strokeWidth={2.5} />}
            </g>
          )}
        </g>
        {/* the phrase keys: the question's own words */}
        {phrases.map((p: any, j: number) => {
          const b = PK(j), sel = (won ? it.words : st.words) === p.id;
          const can = (stage === "ask" && !tl.busy) || (isDemo && !!stepOn);
          return (
            <Key key={"ph" + j} id={"words-" + p.id} label={tx(p.label)} x={b.x} y={b.y} w={b.w} h={b.h} C={C} tone={sel ? "enter" : "key"} primary={sel} disabled={!can}
              onClick={() => press("words-" + p.id, () => pickWords(p.id))}>
              <text y={11} textAnchor="middle" fontSize={ccFit(tx(p.label), T.label, b.w - 24)} fontWeight={700} fill={!can ? C.ink : sel ? toneInk("enter", "#FFFFFF") : toneInk("key", C.ink)}>{tx(p.label)}</text>
            </Key>
          );
        })}
        {(stage === "ask" || (isDemo && !!stepOn)) && (
          <Key key="act0" id="run" label={tx(st.back ? "Run back" : "Run")} x={RUN.x} y={RUN.y} w={RUN.w} h={RUN.h} C={C} tone="key" disabled={tl.busy}
            onClick={() => press("run", actRun)}>{keyLabel(RUN, st.back ? "Run back" : "Run", tl.busy)}</Key>
        )}
        {isDemo && stepOn === "run" && invite(RUN.x, RUN.y, RUN.w, RUN.h)}
        {isDemo && stepOn && String(stepOn).indexOf("words-") === 0 && (() => { const j = phrases.findIndex((p: any) => "words-" + p.id === stepOn); const b = PK(Math.max(0, j)); return invite(b.x, b.y, b.w, b.h); })()}
      </g>
    );
  };

  /* phase 4 and free play */
  const drawP4 = () => {
    if (!pw) return null;
    const two = kind === "pour2";
    const ans = it.answer;
    /* the correction fills each bottle again from empty, a mark a pouring; the win shows every bottle full */
    const view = (p: any) => {
      if (won || (dm && ds > 0)) {
        const j = jarOf(p.own), need = Math.round(p.cap / j.cap), k = won ? need : Math.min(ds, need);
        return { lv: Math.min(p.cap, k * j.cap), mk: [...Array(k)].map(() => ({ full: true })) };
      }
      return { lv: st.lv[p.id] || 0, mk: st.mk[p.id] || [] };
    };
    const cellShown = won || (dm && ds >= (two ? Math.max(...ans) + 1 : ans + 1));
    const pitch = pw.free ? 12 : 20;
    const RT = pw.free ? { x: 718, y: 84, w: 178 } : { x: two ? 676 : 640, y: 48, w: two ? 220 : 256 };
    return (
      <g>
        <g pointerEvents="none">
          <line x1={0} y1={SHELF + 2} x2={pw.free ? 440 : 240} y2={SHELF + 2} stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
          {ccBucketPic(BK, C)}
          {pw.pots.map((p: any) => {
            const v = view(p);
            const glw = pw.free ? p.w + 10 : Math.max(p.w + 20, 180);
            const per = Math.max(4, Math.floor((glw - 6) / pitch));
            return (
              <g key={p.id}>
                {p.skin ? ccBottleSkin({ id: p.id + ek.replace(/[^a-z0-9]/gi, ""), cx: p.cx, top: p.top, bot: p.bot }, v.lv / p.cap, C)
                  : ccBottlePic({ id: p.id + ek.replace(/[^a-z0-9]/gi, ""), cx: p.cx, w: p.w, nw: p.nw, top: p.top, sh: p.sh, bot: p.bot }, v.lv / p.cap, C, !!p.jug)}
                {pw.free && st.sel === p.id && <rect x={p.cx - p.w / 2 - 8} y={p.top - 14} width={p.w + 16} height={p.bot - p.top + 14} rx={20} fill="none" stroke={C.accent} strokeWidth={5} />}
                {chip(p.cx, p.top - 18, p.label, two ? 200 : 250)}
                {ccMarks(p.cx, p.bot + 2, v.mk, per, pitch, glw, C)}
              </g>
            );
          })}
          {pw.jars.map((j: any) => {
            return (
              <g key={j.id}>
                {st.mv !== j.id && ccJarPic(j.cx, SHELF, j.cap, (st.jw[j.id] || 0) / j.cap, j.shape, C)}
                {chip(j.cx, SHELF - ccJarSize(j.cap, j.shape).h - 20, j.cap + " mL", pw.jars.length > 1 ? 98 : 150)}
              </g>
            );
          })}
          {/* the results table: every cell empty until the count has been given (free play: until a bottle is full) */}
          {kind !== "warm4" && !pw.free && (
            <g>
              <text x={RT.x + RT.w / 2} y={RT.y - 12} textAnchor="middle" fontSize={ccFit(tx("pourings"), T.label, RT.w)} fontWeight={700} fill={C.ink}>{tx("pourings")}</text>
              {(two ? it.jars : [{ id: "j", name: it.jarName }]).map((j: any, r: number) => {
                const y = RT.y + 8 + r * 92, v = two ? ans[r] : ans;
                return (
                  <g key={j.id}>
                    <rect x={RT.x} y={y} width={RT.w} height={84} rx={12} fill="#FFFFFF" stroke={C.ink} strokeWidth={2.4} />
                    <text x={RT.x + 14} y={y + 53} fontSize={ccFit(tx(j.name), T.label, RT.w - 112)} fontWeight={700} fill={C.ink}>{tx(j.name)}</text>
                    <rect x={RT.x + RT.w - 82} y={y + 8} width={72} height={68} rx={10} fill={tint(CC.count, 0.85)} stroke={C.ink} strokeWidth={2.4} />
                    {cellShown && <text x={RT.x + RT.w - 46} y={y + 58} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={CC_INK.count}>{v}</text>}
                  </g>
                );
              })}
            </g>
          )}
          {pw.free && (
            <g>
              {/* the headings: each bottle's number over its unit (no two labels share a line), the jars' unit over their column */}
              <text x={RT.x + 58} y={RT.y - 14} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("mL")}</text>
              {pw.pots.map((p: any, c: number) => (
                <g key={p.id}>
                  <text x={RT.x + 99 + c * 56} y={RT.y - 52} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{String(p.cap / 1000)}</text>
                  <text x={RT.x + 99 + c * 56} y={RT.y - 14} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("L")}</text>
                </g>
              ))}
              {pw.jars.map((j: any, r: number) => (
                <g key={j.id}>
                  <text x={RT.x + 58} y={RT.y + 41 + r * 64} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{j.cap}</text>
                  {pw.pots.map((p: any, c: number) => {
                    const v = st.res[p.id + ":" + j.id];
                    return (
                      <g key={p.id}>
                        <rect x={RT.x + 76 + c * 56} y={RT.y + 2 + r * 64} width={46} height={56} rx={8} fill={tint(CC.count, 0.85)} stroke={C.ink} strokeWidth={2} />
                        {v !== undefined && <text x={RT.x + 99 + c * 56} y={RT.y + 41 + r * 64} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={CC_INK.count}>{v}</text>}
                      </g>
                    );
                  })}
                </g>
              ))}
            </g>
          )}
        </g>
        {/* the jars are the controls: a tap fills and pours (the warm-up: fill, then pour) */}
        {(stage === "ask" || (isDemo && stepOn) || free) && !tl.busy && pw.jars.map((j: any) => {
          const { w, h } = ccJarSize(j.cap, j.shape);
          const id = kind === "warm4" ? (stepOn || "pour") : "jar-" + j.id;
          const bwid = Math.max(84, w + (j.shape === "mug" ? 30 : 12)), bh = Math.max(84, h + 12);
          return (
            <Hit key={"h" + j.id} id={id} x={j.cx - bwid / 2 + (j.shape === "mug" ? 10 : 0)} y={SHELF - bh + 6} w={bwid} h={bh}
              label={tx(CC_ARIA[pw.free ? j.id : j.name] || "Fill and pour the jar")}
              onPress={() => press(id, () => actPour(j.id, kind === "warm4" ? (stepOn || "pour") : "both"))} />
          );
        })}
        {free && pw.pots.map((p: any) => (
          <Hit key={"s" + p.id} id={"bottle-" + p.id} x={p.cx - p.w / 2} y={p.top} w={p.w} h={p.bot - p.top} label={tx(CC_ARIA[p.id] || "Choose the 1 L bottle")}
            onPress={() => press("bottle-" + p.id, () => { put({ sel: p.id }); api.sfx.tick(); })} />
        ))}
        {free && (
          <Key key="act0" id="empty" label={tx("Empty")} x={210} y={432} w={180} h={72} C={C} tone="key" onClick={() => press("empty", actEmpty)}>{keyLabel({ w: 180 }, "Empty")}</Key>
        )}
        {kind === "warm4" && isDemo && stepOn && (() => { const j = pw.jars[0], { w, h } = ccJarSize(j.cap, j.shape); return invite(j.cx - w / 2 - 6, SHELF - h - 6, w + 12, h + 12); })()}
      </g>
    );
  };

  /* a tap kept while an act played is run by its name, on the board as it is now */
  const handlerFor = (name: string): any => {
    if (name === "switch") return actSwitch;
    if (name === "box-h" || name === "box-t") return () => actPlace(name.slice(4));
    if (name === "cow-1" || name === "cow-2") return () => actSwap(Number(name.slice(4)) - 1);
    if (name === "break" && it.kind === "break" && !isDemo) return actBreak;
    if (isDemo && P.n === 2) return () => act2(name);
    if (name === "run") return actRun;
    if (name.indexOf("words-") === 0) return () => pickWords(name.slice(6));
    if (name === "fill" || name === "pour") return () => actPour("j", name);
    if (name.indexOf("jar-") === 0) return () => actPour(name.slice(4), "both");
    if (name.indexOf("bottle-") === 0) return () => { put({ sel: name.slice(7) }); api.sfx.tick(); };
    if (name === "empty") return actEmpty;
    return () => {};
  };
  pressRef.current = (name: string) => press(name, handlerFor(name));
  const body = free ? drawP4() : P.n === 1 ? drawP1() : P.n === 2 ? drawP2() : P.n === 3 ? drawP3() : drawP4();
  return (
    <g>
      <g transform={`translate(${ox},0)`}>{body}</g>
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: a frame row (litres | the three
   millilitres boxes) or the full bottle with its count; no words, so it reads the same in every language */
function Thumb({ result, it, n, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last) return null;
  const item: any = it || last.it || (n && PHASES[n - 1] ? PHASES[n - 1].items[last.item] : null) || {};
  const v = last.value;
  const bh = Math.min(h - 8, 60), y = (h - bh) / 2, fs = Math.round(bh * 0.66);
  const boxes = (x0: number, ds: any[]) => (
    <g>
      {[0, 1, 2].map((i) => <rect key={i} x={x0 + i * (bh * 0.9 + 4)} y={y} width={bh * 0.9} height={bh} rx={6} fill="#FFFFFF" stroke={C.ink} strokeWidth={1.8} />)}
      <text y={y + bh / 2 + fs * 0.36} fontSize={fs} fontWeight={700} textAnchor="middle">
        {ds.map((d: any, i: number) => <tspan key={i} x={x0 + i * (bh * 0.9 + 4) + bh * 0.45} fill={d.c}>{d.d}</tspan>)}
      </text>
    </g>
  );
  if (item.kind === "pour" || item.kind === "pour2") {
    const counts = item.kind === "pour2" ? slotPartsOf(v, 2) : [String(leadNumber(v) ?? v)];
    return (
      <g>
        {counts.map((c: any, k: number) => {
          const x0 = k * (w / counts.length);
          return (
            <g key={k}>
              <rect x={x0 + 10} y={y + 10} width={bh * 0.5} height={bh - 10} rx={8} fill={CC.water} stroke={C.ink} strokeWidth={1.8} />
              <rect x={x0 + 10 + bh * 0.13} y={y} width={bh * 0.24} height={12} rx={3} fill={CC.glass} stroke={C.ink} strokeWidth={1.5} />
              <text x={x0 + 22 + bh * 0.5 + 8} y={y + bh / 2 + fs * 0.36} fontSize={fs} fontWeight={700} fill={CC_INK.count}>{c}</text>
            </g>
          );
        })}
      </g>
    );
  }
  let L = "", ml: any[] = [];
  if (item.kind === "write") { L = item.L === "" ? "" : String(item.L ?? ""); ml = ccRow({ L: "", ml: Number(String(v)) }).ml; }
  else { const ps = slotPartsOf(Array.isArray(v) ? v.slice(0, 2) : v, 2); L = String(ps[0] ?? ""); ml = ccRow({ L: "", ml: Number(ps[1] || 0) }).ml;
    if (item.kind === "story" || item.kind === "break") ml = ml.map((d: any) => ({ ...d, c: d.c === CC.zero ? CC.zero : CC_INK.left })); }
  const lx = w * 0.36;
  return (
    <g>
      <rect x={4} y={y} width={lx - 12} height={bh} rx={8} fill={tint(CC.big, 0.88)} stroke={C.ink} strokeWidth={1.8} />
      <text x={lx - 16} y={y + bh / 2 + fs * 0.36} textAnchor="end" fontSize={fs} fontWeight={700} fill={item.kind === "story" || item.kind === "break" ? CC_INK.left : CC_INK.big}>{L}</text>
      <line x1={lx - 2} y1={y - 4} x2={lx - 2} y2={y + bh + 4} stroke={C.ink} strokeWidth={3} />
      {boxes(lx + 6, ml)}
    </g>
  );
}

function CapacityColumns(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b): the question and an Answer key on a bar across the top, the working area the
         whole card until the child taps Answer, the answer box and keypad in a panel that slides in from the right */
      board: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d, PATTERNS.md §16; needs board: true): no question bar, only its blinking key at the top right;
         the working area is 64,108, 1472 x 520 and the key's corner is props.box.key (keep every element out of it); the question lives
         only in the bubble. Opt out (a picture that needs the bar's room) by deleting this line, with the reason in the report. */
      keyOnly: true,
      /* the wide keypad (LAYOUT.md §1b, PATTERNS.md 9g; the owner: "empty space left of the keypad, increase its size"): the answer
         panel is 556 wide and the picture has x 64 to 964 while it is open. Keep it when the picture fits there; set it to false (or
         delete it) when the picture needs the full 1086 width: `check`'s board-fit names what runs under the panel. */
      bigPad: true,
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself; after a right answer the win picture waits for the child's tap on
         the blinking Next key (the question bar's right end; the classic layout: the answer slot's place). Delete to keep the timers. */
      nextKey: true,
      /* NAV DOTS (the new look; LAYOUT.md §1d; stands alone): the phase bar becomes one small clickable dot per phase, no text; a tap starts
         THAT phase, in user and AI mode. Delete this line to keep the bar. */
      navDots: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key (above) */
      StartArt, START_HOOK,
      /* the keypad colours: leave THEME unset and the image agent's TOOL_THEME (the slot's images.tsx) is picked up by the
         runtime by itself; set THEME here only to override it (docs/IMAGES.md) */
      }} />
  );
}

export default CapacityColumns;
