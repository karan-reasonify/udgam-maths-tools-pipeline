/* ═══ M1.S3.T7.C33.2D1 · capacity_converter · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, the sound effects, the printed bubble, scoring, the
   events, idle and restart. THE LESSON IS SILENT (runtime r30): every line is printed on the bubble.
   THE NEW LOOK (keyOnly, navDots; LAYOUT §1d-§1e, PATTERNS §15-§16): the question lives only in the bubble.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them).

   THE OWNER'S DESCRIPTION wins over the plan brief's phase titles (ch 9 NOTES.md "TOOLS 2 TO 6"):
     1 litres into millilitres on labelled measuring jugs (Pour: each litre fills a jug to its 1 L line, 1,000 mL);
     2 millilitres into litres and the millilitres left (Group: 1,000 mL a jug, the part jug ringed amber "Left");
     3 adding and subtracting on a litres | millilitres column board (Carry or Borrow, both keys shown, the child decides);
     4 filling a larger jar with a small cup (Pour, one cup a tap, a counter), the child types the cups.
   ANSWER GATED BY THE ACT (PATTERNS 19; guide.answerGate for the sidecar is MODEL.answerGate): every question is gated.
   MISS HIDES THE ANSWER (strict): each correction replays the act's end state and the count and stops ONE step short;
   whatever shows the answer carries data-reveals="answer" and is drawn only at the win; scales carry data-scale. */

const TOOL_ID = "capacity_converter";
const MEDIA_ID = "M1.S3.T7.C33.2D1";
const TOOL_NAME = "Capacity Converter";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (not shown: phase 1 has steps) */
const OPENING = ["Litre jugs, a column board and a cup to pour with."];
/* the whole-tool line (r44: no longer shown) */
const FINISH_LINE = "You changed litres and millilitres, added and subtracted in columns, and filled a jar cup by cup.";
/* printed when the child opens Free play: free play is the jar and the cup of phase 4 */
const FREE_LINE = "Free play: pour cups into the big jar and count.";

/* THE START PAGE (runtime r28; LAYOUT §1c) */
const START_HOOK = "How many millilitres does a 1 litre jug hold?";
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  const by = box.h - 20;
  return (
    <g>
      {ccPic("sa-b", "bucket", 250, by, 230, 230)}
      {ccJug("sa-j", 560, by - 300, 243, 1000, { tx, lang, mid: true })}
      {ccPic("sa-c", "cup", 960, by, 150, 160)}
    </g>
  );
}

/* Hindi and Gujarati (PATTERNS §11): filled in the language pass, after the English is final. Work, Thumb and format draw
   every word through tx(); the item `win` lines and the nudges need their entries by hand then (data-borne / api.say). */
const TR: any = {
  hi: {
    "Capacity Converter": "धारिता बदलो",
    "Free play: pour cups into the big jar and count.": "मुक्त खेल: कप से बड़ा मर्तबान भरो और गिनो।",
    "How many millilitres does a 1 litre jug hold?": "1 लीटर के जग में कितने मिलीलीटर आते हैं?",
    "Litre jugs, a column board and a cup to pour with.": "लीटर वाले जग, खानों वाला बोर्ड और उँडेलने के लिए एक कप।",
    "You changed litres and millilitres, added and subtracted in columns, and filled a jar cup by cup.": "तुमने लीटर-मिलीलीटर बदले, खानों में जोड़ा-घटाया और मर्तबान को कप-कप भरा।",
    "Litres into millilitres: multiply by 1,000": "लीटर से मिलीलीटर: 1,000 से गुणा करो",
    "Each litre jug fills to its 1 L line.": "हर लीटर वाला जग अपनी 1 लीटर की रेखा तक भरता है।",
    "Tap Pour to fill litre jugs from this 2 L bottle.": "उँडेलो बटन छुओ और इस 2 लीटर की बोतल से लीटर वाले जग भरो।",
    "The Pour key is under the empty jugs.": "उँडेलो बटन जगों के नीचे है।",
    "Look once more at the litre jugs.": "लीटर के जग फिर से देखो।",
    "Think of a thousand for every litre.": "हर लीटर को एक हज़ार मानो।",
    "One litre equals 1,000 millilitres, and a 0 keeps an empty hundreds place.": "एक लीटर में 1,000 मिलीलीटर होते हैं; खाली सैकड़े पर 0 लिखते हैं।",
    "You learned: 1 L is 1,000 mL, so multiply the litres by 1,000.": "तुमने सीखा: 1 लीटर यानी 1,000 मिलीलीटर, इसलिए लीटर को 1,000 से गुणा करो।",
    "This bucket holds 3 L of water: how many millilitres is that?": "इस बाल्टी में 3 लीटर पानी है, यह कितने मिलीलीटर हुआ?",
    "3 L in mL?": "3 लीटर में कितने मिलीलीटर?",
    "Look at the chip under each full jug.": "भरे जग के नीचे का टैग देखो।",
    "Each full jug holds 1,000 mL.": "हर भरे जग में 1,000 मिलीलीटर आता है।",
    "To get millilitres, multiply the litres by 1,000.": "लीटर को मिलीलीटर में बदलने के लिए 1,000 से गुणा करो।",
    "Yes, 3 L is the same as 3,000 mL.": "हाँ, 3 लीटर यानी 3,000 मिलीलीटर।",
    "A bottle has 1 L 750 mL of juice: how many millilitres is that?": "बोतल में 1 लीटर 750 मिलीलीटर जूस है, यह कुल कितने मिलीलीटर हुआ?",
    "1 L 750 mL in mL?": "1 लीटर 750 मिलीलीटर में कितने मिलीलीटर?",
    "Look at the part jug as well as the full one.": "भरे जग के साथ थोड़ा भरा जग भी देखो।",
    "The part jug has another 750 mL.": "थोड़े भरे जग में 750 मिलीलीटर और है।",
    "Add the 1,000 mL and the 750 mL.": "1,000 मिलीलीटर और 750 मिलीलीटर को जोड़ो।",
    "Yes, 1 L 750 mL is 1,750 mL.": "हाँ, 1 लीटर 750 मिलीलीटर यानी 1,750 मिलीलीटर।",
    "There are 2 L 50 mL of water in this drum: how many millilitres is that?": "इस ड्रम में 2 लीटर 50 मिलीलीटर पानी है, यह कितने मिलीलीटर हुआ?",
    "2 L 50 mL in mL?": "2 लीटर 50 मिलीलीटर में कितने मिलीलीटर?",
    "2 L is 2,000 mL, so start from 2,000.": "2 लीटर यानी 2,000 मिलीलीटर, तो 2,000 से शुरू करो।",
    "Now put the 50 mL on top of 2,000 mL.": "अब 2,000 मिलीलीटर के ऊपर 50 मिलीलीटर जोड़ दो।",
    "50 mL has no hundreds, so the hundreds place gets a 0.": "50 में सैकड़ा नहीं है, सैकड़े के स्थान पर 0 लिखो।",
    "Yes, that is right.": "हाँ, यह सही है।",
    "Millilitres into litres: divide by 1,000": "मिलीलीटर से लीटर: 1,000 से भाग करो",
    "Every 1,000 mL fills one litre jug.": "हर 1,000 मिलीलीटर से एक लीटर वाला जग भर जाता है।",
    "Tap Group to pour 1,000 mL of this water into each jug.": "इकट्ठा करो बटन छुओ: इस पानी में से हर जग में 1,000 मिलीलीटर जाएगा।",
    "The Group key is under the empty jugs.": "इकट्ठा करो बटन खाली जगों के नीचे है।",
    "Each full jug is a whole litre of water.": "हर भरा जग एक पूरा लीटर है।",
    "The part jug shows the millilitres left.": "थोड़ा भरा जग बचे हुए मिलीलीटर दिखाता है।",
    "Every 1,000 millilitres make one litre.": "हर 1,000 मिलीलीटर से एक लीटर बनता है।",
    "You learned: 1,000 mL make 1 L, so group millilitres in thousands.": "तुमने सीखा: 1,000 मिलीलीटर का 1 लीटर, इसलिए हज़ार-हज़ार में इकट्ठा करो।",
    "Group the water in this drum into litres: how many litres and millilitres is it?": "इस ड्रम का पानी लीटर में इकट्ठा करो, कितने लीटर और मिलीलीटर हुए?",
    "litres and mL left?": "कितने लीटर और कितने मिलीलीटर बचे?",
    "Only a full jug makes one whole litre.": "सिर्फ़ भरा हुआ जग ही एक पूरा लीटर बनाता है।",
    "Count the full jugs for the litres.": "लीटर के लिए भरे जग गिनो।",
    "Divide by 1,000 for the litres, then work out the millilitres left.": "लीटर के लिए 1,000 से भाग दो, फिर बचे मिलीलीटर निकालो।",
    "Yes, 2,600 mL is 2 L and 600 mL left over.": "हाँ, 2,600 मिलीलीटर यानी 2 लीटर और 600 मिलीलीटर बचे।",
    "litres": "लीटर",
    "L": "ली",
    "left over": "बचा हुआ",
    "mL": "मिली",
    "How many litres and millilitres of water are in this bucket?": "इस बाल्टी में कितने लीटर और कितने मिलीलीटर पानी है?",
    "Look how many jugs are full after grouping.": "देखो, इकट्ठा करने के बाद कितने जग भर गए।",
    "Look at the last jug: is any water left over?": "आख़िरी जग देखो: क्या कुछ पानी बचा है?",
    "If no water is left after the full jugs, no millilitres are left over.": "भरे जगों के बाद पानी न बचे, तो कोई मिलीलीटर नहीं बचता।",
    "Yes, 4,000 mL is exactly 4 L, with nothing left over.": "हाँ, 4,000 मिलीलीटर ठीक 4 लीटर है, कुछ नहीं बचा।",
    "Change the water in this bottle into litres and the millilitres left over.": "इस बोतल के पानी को लीटर और बचे हुए मिलीलीटर में बदलो।",
    "Fill the whole jugs first, then look at the part jug.": "पहले पूरे जग भरो, फिर थोड़े भरे जग को देखो।",
    "Take 1,000 mL away from the amount to find what is left.": "कुल में से 1,000 मिलीलीटर घटाकर बचा हुआ देखो।",
    "What is left has no hundreds, so write it as tens and ones.": "बचे में सैकड़ा नहीं, उसे दहाई और इकाई में लिखो।",
    "Litres and millilitres together": "लीटर और मिलीलीटर एक साथ",
    "Litres and millilitres each go in their own column.": "लीटर और मिलीलीटर को अपने-अपने खानों में लिखो।",
    "Start with the millilitres: 600 mL and 700 mL pass 1,000 mL, so tap Carry.": "मिलीलीटर से शुरू करो: 600 और 700 का जोड़ 1,000 से ज़्यादा है, तो हासिल बटन छुओ।",
    "Carry sends 1,000 mL across as 1 L.": "हासिल 1,000 मिलीलीटर को 1 लीटर बनाकर आगे भेजता है।",
    "Here 200 mL is less than 500 mL, so tap Borrow to bring 1 L across.": "यहाँ 200 मिलीलीटर, 500 से कम है, तो 1 लीटर लाने के लिए उधार बटन छुओ।",
    "Borrow turns 1 L into 1,000 mL.": "उधार से 1 लीटर, 1,000 मिलीलीटर बनता है।",
    "Work out the millilitres column first.": "पहले मिलीलीटर के खाने का हिसाब लगाओ।",
    "Then do the litres column.": "फिर लीटर का खाना हल करो।",
    "Carry 1,000 mL as 1 L, or borrow 1 L as 1,000 mL.": "हासिल: 1,000 मिलीलीटर से 1 लीटर; उधार: 1 लीटर से 1,000 मिलीलीटर।",
    "You learned: do the millilitres first, then carry or borrow 1 L.": "तुमने सीखा: पहले मिलीलीटर, फिर 1 लीटर हासिल लो या उधार लो।",
    "A bucket holds 6 L 120 mL; 2 L 460 mL is poured out: how much is left?": "बाल्टी में 6 लीटर 120 मिलीलीटर पानी था, 2 लीटर 460 मिलीलीटर निकाला, कितना बचा?",
    "6 L 120 mL take away 2 L 460 mL": "6 लीटर 120 मिलीलीटर में से 2 लीटर 460 मिलीलीटर घटाओ",
    "You cannot take 460 mL from 120 mL.": "120 मिलीलीटर में से 460 मिलीलीटर नहीं घटा सकते।",
    "After the borrow the top row is 5 L and 1,120 mL.": "उधार के बाद ऊपर 5 लीटर और 1,120 मिलीलीटर हैं।",
    "Take 460 mL from 1,120 mL, then 2 L from 5 L.": "1,120 मिलीलीटर से 460 घटाओ, फिर 5 लीटर से 2।",
    "Yes, 3 L 660 mL of water is left in the bucket.": "हाँ, 3 लीटर 660 मिलीलीटर पानी बाल्टी में बचा है।",
    "millilitres": "मिलीलीटर",
    "A can has 4 L 680 mL of juice and a bottle 2 L 530 mL: how much in all?": "कैन में 4 लीटर 680 मिलीलीटर जूस, बोतल में 2 लीटर 530 मिलीलीटर, कुल कितना हुआ?",
    "4 L 680 mL add 2 L 530 mL": "4 लीटर 680 मिलीलीटर में 2 लीटर 530 मिलीलीटर जोड़ो",
    "680 mL and 530 mL make more than 1,000 mL.": "680 और 530 मिलीलीटर मिलकर 1,000 से ज़्यादा हैं।",
    "Carry 1 L and keep what is over 1,000 mL.": "1 लीटर हासिल लो और 1,000 से ऊपर के मिलीलीटर रखो।",
    "Add the carried 1 L to 4 L and 2 L.": "हासिल का 1 लीटर 4 लीटर और 2 लीटर में जोड़ो।",
    "Yes, there are 7 L 210 mL of juice in all.": "हाँ, कुल 7 लीटर 210 मिलीलीटर जूस है।",
    "A pot gets 3 L 600 mL of milk, then 2 L 400 mL more: how much milk now?": "पतीले में 3 लीटर 600 मिलीलीटर दूध था, 2 लीटर 400 मिलीलीटर और डाला, अब कितना है?",
    "3 L 600 mL add 2 L 400 mL": "3 लीटर 600 मिलीलीटर में 2 लीटर 400 मिलीलीटर जोड़ो",
    "Start by adding 600 mL and 400 mL.": "पहले 600 मिलीलीटर और 400 मिलीलीटर जोड़ो।",
    "600 mL and 400 mL make exactly 1,000 mL, which is 1 L.": "600 और 400 मिलीलीटर मिलकर ठीक 1 लीटर बनते हैं।",
    "The litres column gets 3 L, 2 L and one more litre from the carry.": "लीटर के खाने में 3, 2 और हासिल का 1 लीटर जोड़ो।",
    "Adding, subtracting and filling cups": "जोड़ना, घटाना और कप भरना",
    "A small cup can fill a big jar, one pour at a time.": "एक छोटा कप बड़े मर्तबान को एक-एक बार उँडेलकर भर सकता है।",
    "Tap Pour to tip this 500 mL cup into the 1 L jug.": "उँडेलो बटन छुओ और यह 500 मिलीलीटर का कप 1 लीटर के जग में उँडेलो।",
    "The Pour key is under the big jug.": "उँडेलो बटन बड़े जग के ठीक नीचे है।",
    "Count each cup as you fill the container: pour the second cup.": "बर्तन भरते समय हर कप गिनो: दूसरा कप उँडेलो।",
    "Pour again until the jug is full.": "जग भरने तक फिर से उँडेलो।",
    "Watch the level rise with each cup.": "हर कप के साथ पानी का स्तर चढ़ता देखो।",
    "The row of cups counts every pour.": "कपों की कतार उँडेलने की गिनती बताती है।",
    "Count the cups, or divide the big amount by the cup amount.": "कप गिनो, या बड़ी मात्रा को कप की मात्रा से भाग दो।",
    "You learned: count the cups that fill a container, or divide.": "तुमने सीखा: बर्तन भरने वाले कप गिनो, या भाग दो।",
    "How many 250 mL cups of water fill this 2 L jar?": "250 मिलीलीटर के कितने कप पानी से यह 2 लीटर का मर्तबान भरेगा?",
    "How many cups?": "कितने कप?",
    "The jar holds 2 L: count the cups for both litres.": "मर्तबान 2 लीटर का है, इसलिए 2 लीटर तक कप गिनो।",
    "Four 250 mL cups fill exactly one litre.": "250 मिलीलीटर के चार कप ठीक एक लीटर भरते हैं।",
    "Change 2 L into millilitres, then see how many 250 mL cups go in.": "2 लीटर को मिलीलीटर बनाओ, फिर देखो कितने 250 आते हैं।",
    "Yes, 8 cups of 250 mL fill the 2 L jar.": "हाँ, 250 मिलीलीटर के 8 कप से 2 लीटर का मर्तबान भरता है।",
    "Ravi fills a 1 L 500 mL jar with a 250 mL cup: how many cupfuls does he pour?": "1 लीटर 500 मिलीलीटर का मर्तबान रवि 250 मिलीलीटर के कप से भरता है, कितने कप?",
    "How many cupfuls?": "कितने कप उँडेले?",
    "Count every cup picture, the last one too.": "हर कप की तस्वीर गिनो, आख़िरी वाली भी।",
    "Each cup adds 250 mL and the jar holds 1,500 mL.": "हर कप 250 मिलीलीटर, मर्तबान 1,500 मिलीलीटर का।",
    "Count how many 250 mL make 1,500 mL.": "गिनो कि कितने 250 मिलकर 1,500 बनते हैं।",
    "Yes, 6 cupfuls of 250 mL make 1,500 mL.": "हाँ, 250 मिलीलीटर के 6 कप से 1,500 मिलीलीटर बनता है।",
    "A glass holds 140 mL: how many glasses of juice fill a 1 L 260 mL jar?": "गिलास 140 मिलीलीटर का है, कितने गिलास से 1 लीटर 260 मिलीलीटर का मर्तबान भरेगा?",
    "How many glasses?": "कितने गिलास?",
    "Check that the juice reaches the very top of the jar.": "देखो कि जूस मर्तबान के बिल्कुल ऊपर तक पहुँचा है।",
    "Each glass adds 140 mL to the jar.": "हर गिलास मर्तबान में 140 मिलीलीटर जोड़ता है।",
    "Count the glasses until the jar holds 1,260 mL.": "मर्तबान में 1,260 मिलीलीटर होने तक गिलास गिनो।",
    "Pour the water into the jugs first.": "पहले पानी जगों में उँडेलो।",
    "First tap Pour to fill the litre jugs.": "पहले उँडेलो बटन छुओ और लीटर वाले जग भरो।",
    "Group the water into the jugs first.": "पहले सारा पानी जगों में इकट्ठा करो।",
    "First tap Group to fill the jugs.": "पहले इकट्ठा करो बटन छुओ और जग भरो।",
    "Decide on Carry or Borrow before you answer.": "उत्तर देने से पहले हासिल या उधार तय करो।",
    "First choose Carry or Borrow on the board.": "पहले बोर्ड पर हासिल या उधार बटन चुनो।",
    "Fill the jar with the cup before you answer.": "उत्तर देने से पहले कप से मर्तबान भरो।",
    "Keep tapping Pour until the jar is full.": "मर्तबान भरने तक उँडेलो बटन छूते रहो।",
    "Check the millilitres again, then choose.": "मिलीलीटर फिर से देखो, फिर बटन चुनो।",
    "Look at the millilitres column: too many millilitres, or too few?": "मिलीलीटर का खाना देखो: मिलीलीटर बहुत ज़्यादा हैं या बहुत कम?",
    "Pour": "उँडेलो",
    "Group": "इकट्ठा करो",
    "Carry": "हासिल",
    "Borrow": "उधार",
    "Left": "बचा",
    "Pours": "उँडेले",
    "cup": "कप",
    "cups": "कप",
    "glass": "गिलास",
    "glasses": "गिलास",
    "Tap Pour so each litre fills its own jug.": "उँडेलो बटन छुओ ताकि हर लीटर अपने जग में भरे।",
    "Tap Group so every 1,000 mL fills a jug.": "इकट्ठा करो बटन छुओ ताकि हर 1,000 मिलीलीटर से एक जग भरे।",
    "Tap Carry or Borrow under the board first.": "पहले बोर्ड के नीचे हासिल या उधार बटन छुओ।",
    "Pour cup after cup until the jar is full.": "मर्तबान भरने तक एक के बाद एक कप उँडेलो।",
    "Do the millilitres need a carry or a borrow?": "मिलीलीटर के लिए हासिल चाहिए या उधार?",
    "Fill both boxes.": "दोनों खाने भरो।",
    "Answer": "उत्तर",
    "Type your answer first.": "पहले अपना उत्तर लिखो।",
    "Fill the jar with the glasses before you answer.": "उत्तर देने से पहले गिलासों से मर्तबान भरो।",
    "Pour glass after glass until the jar is full.": "मर्तबान भरने तक एक के बाद एक गिलास उँडेलो।",
  },
  gu: {
    "Capacity Converter": "ક્ષમતા બદલો",
    "Free play: pour cups into the big jar and count.": "મુક્ત રમત: કપથી મોટી બરણી ભરો અને ગણો.",
    "How many millilitres does a 1 litre jug hold?": "1 લીટરના જગમાં કેટલા મિલીલીટર સમાય છે?",
    "Litre jugs, a column board and a cup to pour with.": "લીટરના જગ, કૉલમવાળું બોર્ડ અને રેડવા માટે એક કપ.",
    "You changed litres and millilitres, added and subtracted in columns, and filled a jar cup by cup.": "તમે લીટર-મિલીલીટર બદલ્યા, કૉલમમાં સરવાળો-બાદબાકી કરી અને બરણી એક-એક કપથી ભરી.",
    "Litres into millilitres: multiply by 1,000": "લીટરમાંથી મિલીલીટર: 1,000 વડે ગુણો",
    "Each litre jug fills to its 1 L line.": "દરેક લીટરનો જગ તેની 1 લીટરની રેખા સુધી ભરાય છે.",
    "Tap Pour to fill litre jugs from this 2 L bottle.": "રેડો બટનને સ્પર્શ કરો અને આ 2 લીટરની બોટલથી લીટરના જગ ભરો.",
    "The Pour key is under the empty jugs.": "રેડો બટન ખાલી જગની નીચે છે.",
    "Look once more at the litre jugs.": "લીટરના જગ ફરીથી જુઓ.",
    "Think of a thousand for every litre.": "દરેક લીટરને એક હજાર ગણો.",
    "One litre equals 1,000 millilitres, and a 0 keeps an empty hundreds place.": "એક લીટરમાં 1,000 મિલીલીટર હોય છે, અને ખાલી શતકની જગ્યાએ 0 રહે છે.",
    "You learned: 1 L is 1,000 mL, so multiply the litres by 1,000.": "તમે શીખ્યા: 1 લીટર એટલે 1,000 મિલીલીટર, તેથી લીટરને 1,000 વડે ગુણો.",
    "This bucket holds 3 L of water: how many millilitres is that?": "આ ડોલમાં 3 લીટર પાણી છે: એ કેટલા મિલીલીટર થાય?",
    "3 L in mL?": "3 લીટરમાં કેટલા મિલીલીટર?",
    "Look at the chip under each full jug.": "ભરેલા જગ નીચેનો ટેગ જુઓ.",
    "Each full jug holds 1,000 mL.": "દરેક ભરેલા જગમાં 1,000 મિલીલીટર સમાય છે.",
    "To get millilitres, multiply the litres by 1,000.": "લીટરને મિલીલીટરમાં બદલવા 1,000 વડે ગુણો.",
    "Yes, 3 L is the same as 3,000 mL.": "હા, 3 લીટર અને 3,000 મિલીલીટર સરખા છે.",
    "A bottle has 1 L 750 mL of juice: how many millilitres is that?": "બોટલમાં 1 લીટર 750 મિલીલીટર જ્યૂસ છે: એ કુલ કેટલા મિલીલીટર થાય?",
    "1 L 750 mL in mL?": "1 લીટર 750 મિલીલીટરમાં કેટલા મિલીલીટર?",
    "Look at the part jug as well as the full one.": "ભરેલા જગ સાથે થોડો ભરેલો જગ પણ જુઓ.",
    "The part jug has another 750 mL.": "થોડા ભરેલા જગમાં 750 મિલીલીટર વધારે છે.",
    "Add the 1,000 mL and the 750 mL.": "1,000 મિલીલીટર અને 750 મિલીલીટર ઉમેરો.",
    "Yes, 1 L 750 mL is 1,750 mL.": "હા, 1 લીટર 750 મિલીલીટર એટલે 1,750 મિલીલીટર.",
    "There are 2 L 50 mL of water in this drum: how many millilitres is that?": "આ ડ્રમમાં 2 લીટર 50 મિલીલીટર પાણી છે: એ કેટલા મિલીલીટર થાય?",
    "2 L 50 mL in mL?": "2 લીટર 50 મિલીલીટરમાં કેટલા મિલીલીટર?",
    "2 L is 2,000 mL, so start from 2,000.": "2 લીટર એટલે 2,000 મિલીલીટર, તો 2,000 થી શરૂ કરો.",
    "Now put the 50 mL on top of 2,000 mL.": "હવે 2,000 મિલીલીટરની ઉપર 50 મિલીલીટર ઉમેરો.",
    "50 mL has no hundreds, so the hundreds place gets a 0.": "50 મિલીલીટરમાં શતક નથી, તો શતકના સ્થાને 0 લખો.",
    "Yes, that is right.": "હા, એ સાચું છે.",
    "Millilitres into litres: divide by 1,000": "મિલીલીટરમાંથી લીટર: 1,000 વડે ભાગો",
    "Every 1,000 mL fills one litre jug.": "દર 1,000 મિલીલીટરથી એક લીટરનો જગ ભરાય છે.",
    "Tap Group to pour 1,000 mL of this water into each jug.": "ભેગા કરો બટનને સ્પર્શ કરો, દરેક જગમાં આ પાણીના 1,000 મિલીલીટર જશે.",
    "The Group key is under the empty jugs.": "ભેગા કરો બટન ખાલી જગની બરાબર નીચે છે.",
    "Each full jug is a whole litre of water.": "દરેક ભરેલો જગ પૂરો એક લીટર પાણી છે.",
    "The part jug shows the millilitres left.": "થોડો ભરેલો જગ બાકી રહેલા મિલીલીટર બતાવે છે.",
    "Every 1,000 millilitres make one litre.": "દર 1,000 મિલીલીટરથી એક લીટર બને છે.",
    "You learned: 1,000 mL make 1 L, so group millilitres in thousands.": "તમે શીખ્યા: 1,000 મિલીલીટરનો 1 લીટર, તેથી હજાર-હજારમાં ભેગા કરો.",
    "Group the water in this drum into litres: how many litres and millilitres is it?": "આ ડ્રમનું પાણી લીટરમાં ભેગું કરો: કેટલા લીટર અને કેટલા મિલીલીટર?",
    "litres and mL left?": "કેટલા લીટર અને કેટલા મિલીલીટર બાકી?",
    "Only a full jug makes one whole litre.": "ફક્ત ભરેલો જગ જ એક પૂરો લીટર બનાવે છે.",
    "Count the full jugs for the litres.": "લીટર માટે ભરેલા જગ ગણો.",
    "Divide by 1,000 for the litres, then work out the millilitres left.": "1,000 વડે ભાગી લીટર શોધો, પછી બાકી મિલીલીટર.",
    "Yes, 2,600 mL is 2 L and 600 mL left over.": "હા, 2,600 મિલીલીટર એટલે 2 લીટર અને 600 મિલીલીટર બાકી.",
    "litres": "લીટર",
    "L": "લી",
    "left over": "બાકી",
    "mL": "મિલી",
    "How many litres and millilitres of water are in this bucket?": "આ ડોલમાં કેટલા લીટર અને કેટલા મિલીલીટર પાણી છે?",
    "Look how many jugs are full after grouping.": "ભેગા કર્યા પછી કેટલા જગ ભરાયા તે જુઓ.",
    "Look at the last jug: is any water left over?": "છેલ્લો જગ જુઓ: શું થોડું પાણી બાકી છે?",
    "If no water is left after the full jugs, no millilitres are left over.": "ભરેલા જગ પછી પાણી ન વધે તો મિલીલીટર બાકી નથી.",
    "Yes, 4,000 mL is exactly 4 L, with nothing left over.": "હા, 4,000 મિલીલીટર બરાબર 4 લીટર છે, કશું બાકી નથી.",
    "Change the water in this bottle into litres and the millilitres left over.": "આ બોટલના પાણીને લીટર અને બાકી રહેલા મિલીલીટરમાં બદલો.",
    "Fill the whole jugs first, then look at the part jug.": "પહેલાં પૂરા જગ ભરો, પછી થોડા ભરેલા જગને જુઓ.",
    "Take 1,000 mL away from the amount to find what is left.": "કુલમાંથી 1,000 મિલીલીટર બાદ કરી બાકી જુઓ.",
    "What is left has no hundreds, so write it as tens and ones.": "જે બાકી છે તેમાં શતક નથી, તો તેને દશક અને એકમમાં લખો.",
    "Litres and millilitres together": "લીટર અને મિલીલીટર એકસાથે",
    "Litres and millilitres each go in their own column.": "લીટર અને મિલીલીટર પોતપોતાની કૉલમમાં લખો.",
    "Start with the millilitres: 600 mL and 700 mL pass 1,000 mL, so tap Carry.": "મિલીલીટરથી શરૂ કરો: 600 અને 700 મળીને 1,000 કરતાં વધુ, તો વદી બટનને સ્પર્શ કરો.",
    "Carry sends 1,000 mL across as 1 L.": "વદી 1,000 મિલીલીટરને 1 લીટર બનાવીને આગળ મોકલે છે.",
    "Here 200 mL is less than 500 mL, so tap Borrow to bring 1 L across.": "500 મિલીલીટર કરતાં 200 મિલીલીટર ઓછા છે, તો 1 લીટર લાવવા ઉછીના બટનને સ્પર્શ કરો.",
    "Borrow turns 1 L into 1,000 mL.": "ઉછીનાથી 1 લીટર, 1,000 મિલીલીટર બને છે.",
    "Work out the millilitres column first.": "પહેલાં મિલીલીટરની કૉલમનો હિસાબ કરો.",
    "Then do the litres column.": "પછી લીટરની કૉલમનો હિસાબ કરો.",
    "Carry 1,000 mL as 1 L, or borrow 1 L as 1,000 mL.": "વદી: 1,000 મિલીલીટરથી 1 લીટર; ઉછીના: 1 લીટરથી 1,000 મિલીલીટર.",
    "You learned: do the millilitres first, then carry or borrow 1 L.": "તમે શીખ્યા: પહેલાં મિલીલીટર, પછી 1 લીટર વદી લો કે ઉછીના લો.",
    "A bucket holds 6 L 120 mL; 2 L 460 mL is poured out: how much is left?": "ડોલમાં 6 લીટર 120 મિલીલીટર છે; 2 લીટર 460 મિલીલીટર રેડી દીધું: કેટલું બાકી?",
    "6 L 120 mL take away 2 L 460 mL": "6 લીટર 120 મિલીલીટરમાંથી 2 લીટર 460 મિલીલીટર બાદ કરો",
    "You cannot take 460 mL from 120 mL.": "120 મિલીલીટરમાંથી 460 મિલીલીટર બાદ ન કરી શકાય.",
    "After the borrow the top row is 5 L and 1,120 mL.": "ઉછીના પછી ઉપર 5 લીટર અને 1,120 મિલીલીટર છે.",
    "Take 460 mL from 1,120 mL, then 2 L from 5 L.": "1,120 મિલીલીટરમાંથી 460 બાદ કરો, પછી 5 માંથી 2 લીટર.",
    "Yes, 3 L 660 mL of water is left in the bucket.": "હા, 3 લીટર 660 મિલીલીટર પાણી ડોલમાં બાકી છે.",
    "millilitres": "મિલીલીટર",
    "A can has 4 L 680 mL of juice and a bottle 2 L 530 mL: how much in all?": "કૅનમાં 4 લીટર 680 મિલીલીટર જ્યૂસ અને બોટલમાં 2 લીટર 530 મિલીલીટર: કુલ કેટલું?",
    "4 L 680 mL add 2 L 530 mL": "4 લીટર 680 મિલીલીટરમાં 2 લીટર 530 મિલીલીટર ઉમેરો",
    "680 mL and 530 mL make more than 1,000 mL.": "680 અને 530 મિલીલીટર મળીને 1,000 કરતાં વધુ થાય.",
    "Carry 1 L and keep what is over 1,000 mL.": "1 લીટર વદી લો અને 1,000 થી વધારાના મિલીલીટર રાખો.",
    "Add the carried 1 L to 4 L and 2 L.": "વદીનો 1 લીટર 4 લીટર અને 2 લીટરમાં ઉમેરો.",
    "Yes, there are 7 L 210 mL of juice in all.": "હા, કુલ 7 લીટર 210 મિલીલીટર જ્યૂસ છે.",
    "A pot gets 3 L 600 mL of milk, then 2 L 400 mL more: how much milk now?": "તપેલામાં 3 લીટર 600 મિલીલીટર દૂધ છે, પછી 2 લીટર 400 મિલીલીટર વધુ: હવે કેટલું?",
    "3 L 600 mL add 2 L 400 mL": "3 લીટર 600 મિલીલીટરમાં 2 લીટર 400 મિલીલીટર ઉમેરો",
    "Start by adding 600 mL and 400 mL.": "પહેલાં 600 મિલીલીટર અને 400 મિલીલીટર ઉમેરો.",
    "600 mL and 400 mL make exactly 1,000 mL, which is 1 L.": "600 અને 400 મિલીલીટર મળીને બરાબર 1 લીટર થાય.",
    "The litres column gets 3 L, 2 L and one more litre from the carry.": "લીટરની કૉલમમાં 3, 2 અને વદીનો 1 લીટર ઉમેરો.",
    "Adding, subtracting and filling cups": "સરવાળો, બાદબાકી અને કપ ભરવા",
    "A small cup can fill a big jar, one pour at a time.": "એક નાનો કપ મોટી બરણીને એક એક વાર રેડીને ભરી શકે છે.",
    "Tap Pour to tip this 500 mL cup into the 1 L jug.": "રેડો બટનને સ્પર્શ કરો અને આ 500 મિલીલીટરનો કપ 1 લીટરના જગમાં ખાલી કરો.",
    "The Pour key is under the big jug.": "રેડો બટન મોટા જગની નીચે છે.",
    "Count each cup as you fill the container: pour the second cup.": "વાસણ ભરતી વખતે દરેક કપ ગણો: બીજો કપ રેડો.",
    "Pour again until the jug is full.": "જગ ભરાય ત્યાં સુધી રેડો.",
    "Watch the level rise with each cup.": "દરેક કપ સાથે પાણીની સપાટી ચઢતી જુઓ.",
    "The row of cups counts every pour.": "કપની હરોળ રેડવાની ગણતરી બતાવે છે.",
    "Count the cups, or divide the big amount by the cup amount.": "કપ ગણો, અથવા મોટી માત્રાને કપની માત્રા વડે ભાગો.",
    "You learned: count the cups that fill a container, or divide.": "તમે શીખ્યા: વાસણ ભરતા કપ ગણો, અથવા ભાગો.",
    "How many 250 mL cups of water fill this 2 L jar?": "250 મિલીલીટરના કેટલા કપ પાણીથી આ 2 લીટરની બરણી ભરાશે?",
    "How many cups?": "કેટલા કપ?",
    "The jar holds 2 L: count the cups for both litres.": "બરણી 2 લીટરની છે: બંને લીટરના કપ ગણો.",
    "Four 250 mL cups fill exactly one litre.": "250 મિલીલીટરના ચાર કપ બરાબર એક લીટર ભરે છે.",
    "Change 2 L into millilitres, then see how many 250 mL cups go in.": "2 લીટરને મિલીલીટર બનાવો, પછી જુઓ કેટલા 250 સમાય.",
    "Yes, 8 cups of 250 mL fill the 2 L jar.": "હા, 250 મિલીલીટરના 8 કપથી 2 લીટરની બરણી ભરાય છે.",
    "Ravi fills a 1 L 500 mL jar with a 250 mL cup: how many cupfuls does he pour?": "1 લીટર 500 મિલીલીટરની બરણી રવિ 250 મિલીલીટરના કપથી ભરે છે: કેટલા કપ રેડે?",
    "How many cupfuls?": "કેટલા કપ રેડ્યા?",
    "Count every cup picture, the last one too.": "કપનું દરેક ચિત્ર ગણો, છેલ્લું પણ.",
    "Each cup adds 250 mL and the jar holds 1,500 mL.": "દરેક કપ 250 મિલીલીટર, બરણી 1,500 મિલીલીટરની.",
    "Count how many 250 mL make 1,500 mL.": "ગણો કે કેટલા 250 મળીને 1,500 થાય.",
    "Yes, 6 cupfuls of 250 mL make 1,500 mL.": "હા, 250 મિલીલીટરના 6 કપથી 1,500 મિલીલીટર થાય છે.",
    "A glass holds 140 mL: how many glasses of juice fill a 1 L 260 mL jar?": "ગ્લાસમાં 140 મિલીલીટર સમાય છે: કેટલા ગ્લાસથી 1 લીટર 260 મિલીલીટરની બરણી ભરાશે?",
    "How many glasses?": "કેટલા ગ્લાસ?",
    "Check that the juice reaches the very top of the jar.": "જુઓ કે જ્યૂસ બરણીના સાવ ઉપર સુધી પહોંચ્યો છે.",
    "Each glass adds 140 mL to the jar.": "દરેક ગ્લાસ બરણીમાં 140 મિલીલીટર ઉમેરે છે.",
    "Count the glasses until the jar holds 1,260 mL.": "બરણીમાં 1,260 મિલીલીટર થાય ત્યાં સુધી ગ્લાસ ગણો.",
    "Pour the water into the jugs first.": "પહેલાં પાણી જગમાં રેડો.",
    "First tap Pour to fill the litre jugs.": "પહેલાં રેડો બટનને સ્પર્શ કરો અને લીટરના જગ ભરો.",
    "Group the water into the jugs first.": "પહેલાં પાણી જગમાં ભેગું કરો.",
    "First tap Group to fill the jugs.": "પહેલાં ભેગા કરો બટનને સ્પર્શ કરો અને જગ ભરો.",
    "Decide on Carry or Borrow before you answer.": "જવાબ આપતાં પહેલાં વદી કે ઉછીના નક્કી કરો.",
    "First choose Carry or Borrow on the board.": "પહેલાં બોર્ડ પર વદી કે ઉછીના પસંદ કરો.",
    "Fill the jar with the cup before you answer.": "જવાબ પહેલાં કપથી બરણી ભરો.",
    "Keep tapping Pour until the jar is full.": "બરણી ભરાય ત્યાં સુધી રેડો બટનને સ્પર્શ કરતા રહો.",
    "Check the millilitres again, then choose.": "ફરીથી મિલીલીટર જુઓ અને પછી બટન પસંદ કરો.",
    "Look at the millilitres column: too many millilitres, or too few?": "મિલીલીટરની કૉલમ જુઓ: મિલીલીટર બહુ વધુ છે કે બહુ ઓછા?",
    "Pour": "રેડો",
    "Group": "ભેગા કરો",
    "Carry": "વદી",
    "Borrow": "ઉછીના",
    "Left": "બાકી",
    "Pours": "રેડ્યા",
    "cup": "કપ",
    "cups": "કપ",
    "glass": "ગ્લાસ",
    "glasses": "ગ્લાસ",
    "Tap Pour so each litre fills its own jug.": "રેડો બટનને સ્પર્શ કરો જેથી દરેક લીટર પોતાના જગમાં ભરાય.",
    "Tap Group so every 1,000 mL fills a jug.": "ભેગા કરો બટનને સ્પર્શ કરો જેથી દર 1,000 મિલીલીટરથી એક જગ ભરાય.",
    "Tap Carry or Borrow under the board first.": "પહેલાં બોર્ડની નીચે વદી કે ઉછીના બટનને સ્પર્શ કરો.",
    "Pour cup after cup until the jar is full.": "બરણી ભરાય ત્યાં સુધી એક પછી એક કપ રેડો.",
    "Do the millilitres need a carry or a borrow?": "મિલીલીટર માટે વદી જોઈએ કે પછી ઉછીના?",
    "Fill both boxes.": "બંને ખાનાં ભરો.",
    "Answer": "જવાબ",
    "Type your answer first.": "પહેલાં તમારો જવાબ લખો.",
    "Fill the jar with the glasses before you answer.": "જવાબ આપતાં પહેલાં ગ્લાસથી બરણી ભરો.",
    "Pour glass after glass until the jar is full.": "બરણી ભરાય ત્યાં સુધી એક પછી એક ગ્લાસ રેડો.",
  },
};

/* ── the pictures and their numbers ───────────────────────────────────────────────────────── */
const CC_BLUE = "#0072B2";     /* Given: the amount the question gives */
const CC_GREEN = "#009E73";    /* Answer: only at the win */
const CC_VERM = "#D55E00";     /* Unit fact */
const CC_AMBER = "#E69F00";    /* Left, carried, borrowed */
const CC_WATER = "#4FA3E0";
const CC_JUICE = "#F2A33A";
const CC_INK = "#2B2B2B";
const CC_GLASS = "#93A1AD";
const CC_SW = 900;             /* every scene is laid out 900 wide (the panel-open room), centred in the shut room */
const CC_KINDS = ["lit", "grp", "col", "pour"];
/* the clear glass jug photo (`jug`, 200 x 247, re-cut 2026-10-28: no white patch inside): its clear interior, as fractions of the
   picture (x from the left, y from the top), left wall top to bottom, then right wall bottom to top; the code water is clipped to it,
   never into the handle opening; the scale is ONE linear function from the inside floor (0 mL, y 0.862) to the 1 L line near the
   neck (y 0.16): y = 0.862 - 0.702 * mL / 1000 */
const CC_JUG = { w: 200, h: 247, floor: 0.862, per: 0.702 };
/* below y 0.48 the inner wall is sampled from the photo every 0.03 of its height (measured on the decoded picture, 2026-10-29), pushed
   out 0.006 so the water meets the glass, and the bottom curves to the floor */
const CC_JUG_L = [[0.2, 0.016], [0.155, 0.15], [0.079, 0.48], [0.069, 0.51], [0.059, 0.54], [0.049, 0.57], [0.049, 0.6], [0.039, 0.63], [0.039, 0.66], [0.034, 0.69], [0.049, 0.72], [0.054, 0.75], [0.069, 0.78], [0.089, 0.81], [0.129, 0.84], [0.19, 0.862]];
const CC_JUG_R = [[0.63, 0.862], [0.676, 0.84], [0.696, 0.81], [0.716, 0.78], [0.731, 0.75], [0.741, 0.72], [0.741, 0.69], [0.736, 0.66], [0.731, 0.63], [0.731, 0.6], [0.726, 0.57], [0.726, 0.54], [0.716, 0.51], [0.711, 0.48], [0.62, 0.15], [0.62, 0.016]];
const ccJugY = (ml: number) => CC_JUG.floor - (CC_JUG.per * ml) / 1000;
const ccWall = (fy: number) => {
  for (let i = 0; i < CC_JUG_L.length - 1; i++) {
    const [x0, y0] = CC_JUG_L[i], [x1, y1] = CC_JUG_L[i + 1];
    if (fy >= y0 && fy <= y1) return x0 + ((x1 - x0) * (fy - y0)) / (y1 - y0);
  }
  return CC_JUG_L[CC_JUG_L.length - 1][0];
};
/* the photos' own sizes (images.json made.w x made.h): every skin is drawn in a box of its own aspect */
const CC_PIC: any = { bucket: [200, 182], drum: [154, 200], bottle: [84, 260], cup: [124, 150], jug: [200, 247] };
const ccFit = (name: string, mw: number, mh: number) => {
  const [w, h] = CC_PIC[name];
  const s = Math.min(mw / w, mh / h);
  return [w * s, h * s];
};
/* a label's width at a size, counting a Devanagari or Gujarati sign that takes no room as nothing (PATTERNS 18) */
const ccTW = (s: string, size: number) => {
  let n = 0;
  for (const ch of String(s)) {
    const c = ch.codePointAt(0) || 0;
    if ((c >= 0x900 && c <= 0x902) || c === 0x93c || (c >= 0x941 && c <= 0x948) || c === 0x94d || (c >= 0x951 && c <= 0x957) || c === 0x962 || c === 0x963 ||
      (c >= 0xa81 && c <= 0xa82) || c === 0xabc || (c >= 0xac1 && c <= 0xac8) || c === 0xacd || c === 0xae2 || c === 0xae3) continue;
    n += ch === " " || ch === "," || ch === "." ? 0.3 : ch === "=" ? 0.62 : 0.6;
  }
  return n * size;
};
/* an amount as the book writes it: "1 L 750 mL", "2 L", "600 mL", "2,600 mL" (every unit through tx) */
const ccLM = (L: number, ml: number, tx: any) =>
  L > 0 && ml > 0 ? L + " " + tx("L") + " " + ml + " " + tx("mL") : L > 0 ? L + " " + tx("L") : indian(ml) + " " + tx("mL");
const ccML = (ml: number, tx: any) => indian(ml) + " " + tx("mL");

/* a tag: a coloured edge and a light fill, the text in the colour's deep ink */
const ccTag = (k: string, x: number, y: number, w: number, h: number, text: string, col: string, size: number, extra?: any) => (
  <g key={k} {...(extra || {})}>
    <rect x={x} y={y} width={w} height={h} rx={14} fill={tint(col, 0.86)} stroke={col} strokeWidth={4} />
    <text x={x + w / 2} y={y + h / 2 + size * 0.35} textAnchor="middle" fontSize={size} fontWeight={700} fill={shade(col, 0.5)}>{text}</text>
  </g>
);

/* the clear measuring jug: the water behind (clipped to the interior), the photo, then the scale on the cream at the LEFT */
/* has the slot a picture for this key (and are skins on)? Then the plain fallback under it is painted clear, never seen through
   the photo; with no picture (or props.skins false) the plain shape is the whole drawing */
const ccHas = (name: string) => {
  try { return !!SKINS && typeof TOOL_IMAGES !== "undefined" && !!(TOOL_IMAGES as any)[name]; } catch (e) { return false; }
};
/* a scale pill's height: Hindi and Gujarati marks rise above the letters, so their pills are 8 taller */
const ccPillH = (lang: any) => (lang === "hi" || lang === "gu" ? 60 : 40);
/* the text sits 4 lower in a tall hi/gu pill, so the tall marks (ि ी) clear its top outline */
const ccPillDy = (ph: number) => (ph > 40 ? 15 : 11);
function ccJug(k: string, x: number, y: number, w: number, ml: number, o: any = {}) {
  const h = (w * CC_JUG.h) / CC_JUG.w;
  const tx = o.tx || ((v: any) => v);
  const has = ccHas("jug");
  const pt = (fx: number, fy: number) => (x + fx * w).toFixed(1) + " " + (y + fy * h).toFixed(1);
  const d = "M " + CC_JUG_L.concat(CC_JUG_R).map(([fx, fy]: any) => pt(fx, fy)).join(" L ") + " Z";
  const fl = y + h * CC_JUG.floor;
  const lv = y + h * ccJugY(Math.max(0, Math.min(ml, 1000)));
  const liq = o.liq || CC_WATER;
  const oneY = y + h * ccJugY(1000);
  const oneT = "1 " + tx("L");
  const ph = ccPillH(o.lang);
  const pw = Math.max(56, ccTW(oneT, 32) + 12);
  const oneWall = x + ccWall(ccJugY(1000)) * w - 1.5;
  /* the 1 L pill: "top" stands above the rim at the jug's left with a short leader down to the tick (a row of jugs, so it never
     reaches the jug before); otherwise it sits left of the tick, its right edge at the tick's end */
  const top = o.pill === "top";
  const pX = top ? x - 2 : oneWall - 18 - 6 - pw, pY = top ? y - 10 - ph : oneY - ph / 2;
  const midY = y + h * ccJugY(500);
  const midT = "500 " + tx("mL");
  const mw = ccTW(midT, 32) + 20;
  const midR = x + ccWall(ccJugY(500)) * w - 1.5 - 12 - 6;
  return (
    <g key={k}>
      <defs>
        <clipPath id={"ccj-" + k}><path d={d} /></clipPath>
        <linearGradient id={"ccj-g-" + k} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={shade(liq, 0.2)} stopOpacity="0.75" />
          <stop offset="35%" stopColor={liq} stopOpacity="0.6" />
          <stop offset="70%" stopColor={tint(liq, 0.25)} stopOpacity="0.7" />
          <stop offset="100%" stopColor={shade(liq, 0.25)} stopOpacity="0.8" />
        </linearGradient>
      </defs>
      {/* the plain fallback: a light glass outline, a handle and a base, painted clear once the photo is there */}
      <path d={d} fill={has ? "none" : "#FFFFFF"} fillOpacity={0.25} stroke={has ? "none" : CC_GLASS} strokeWidth={2.5} strokeLinejoin="round" />
      <path d={"M " + pt(0.62, 0.3) + " C " + pt(0.99, 0.3) + " " + pt(0.99, 0.7) + " " + pt(0.67, 0.72)} fill="none" stroke={has ? "none" : CC_GLASS} strokeWidth={5} strokeLinecap="round" />
      <rect x={x + 0.22 * w} y={fl} width={0.44 * w} height={0.12 * h} rx={6} fill={has ? "none" : "#E3E8EC"} stroke={has ? "none" : CC_GLASS} strokeWidth={2} />
      {ml > 0 && (
        <g clipPath={"url(#ccj-" + k + ")"}>
          <rect x={x} y={lv} width={w} height={Math.max(0, fl - lv)} fill={`url(#ccj-g-${k})`} />
          <line x1={x} y1={lv} x2={x + w} y2={lv} stroke={shade(liq, 0.4)} strokeWidth={3} />
        </g>
      )}
      <Skin name="jug" x={x} y={y} w={w} h={h} />
      {o.ring && <rect x={x - 4} y={y - 4} width={w + 8} height={h + 8} rx={14} fill="none" stroke={CC_AMBER} strokeWidth={5} />}
      <g data-scale="jug">
        {[250, 500, 750, 1000].map((m) => {
          const fy = ccJugY(m), wx = x + ccWall(fy) * w - 1.5, yy = y + fy * h, L = m === 1000 ? 18 : 12;
          return <line key={m} x1={wx - L} y1={yy} x2={wx} y2={yy} stroke={CC_INK} strokeWidth={m === 1000 ? 3.5 : 2.5} strokeLinecap="round" />;
        })}
        {top && <line x1={x + 2} y1={y - 10} x2={x + 2} y2={oneY} stroke={CC_INK} strokeWidth={2.5} strokeLinecap="round" />}
        <rect x={pX} y={pY} width={pw} height={ph} rx={ph / 2} fill="#FFF8EA" stroke={CHROME.rule} strokeWidth={2} />
        <text x={pX + pw / 2} y={pY + ph / 2 + ccPillDy(ph)} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={CC_INK}>{oneT}</text>
        {o.mid && <rect x={midR - mw} y={midY - ph / 2} width={mw} height={ph} rx={ph / 2} fill="#FFF8EA" stroke={CHROME.rule} strokeWidth={2} />}
        {o.mid && <text x={midR - mw / 2} y={midY + ccPillDy(ph)} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={CC_INK}>{midT}</text>}
      </g>
    </g>
  );
}

/* a container photo (bucket, drum, bottle, cup) standing on `bottom`, in a box of its own aspect, the plain shape under it */
function ccPic(k: string, name: string, cx: number, bottom: number, mw: number, mh: number) {
  const [w, h] = ccFit(name, mw, mh);
  const x = cx - w / 2, y = bottom - h;
  /* the plain fallback lies wholly inside the photo's own outline, and is painted clear once the photo is there */
  const has = ccHas(name);
  const F = (c: string) => (has ? "none" : c);
  let plain: any = null;
  if (name === "bucket") plain = <path d={`M ${x + w * 0.1} ${y + h * 0.14} L ${x + w * 0.9} ${y + h * 0.14} L ${x + w * 0.8} ${y + h * 0.94} L ${x + w * 0.2} ${y + h * 0.94} Z`} fill={F("#F4C542")} stroke={F("#B48A12")} strokeWidth={3} />;
  else if (name === "drum") plain = <g><rect x={x + w * 0.12} y={y + h * 0.12} width={w * 0.76} height={h * 0.82} rx={14} fill={F("#B8663F")} stroke={F("#7A3F22")} strokeWidth={3} /><rect x={x + w * 0.32} y={y + h * 0.04} width={w * 0.36} height={h * 0.09} rx={6} fill={F("#8E4A2A")} /></g>;
  else if (name === "bottle") plain = <g><rect x={x + w * 0.16} y={y + h * 0.18} width={w * 0.68} height={h * 0.78} rx={w * 0.28} fill={F("#F39A2B")} stroke={F("#A85E10")} strokeWidth={3} /><rect x={x + w * 0.34} y={y + h * 0.03} width={w * 0.32} height={h * 0.16} rx={6} fill={F("#C46A12")} /></g>;
  else plain = <path d={`M ${x + w * 0.12} ${y + h * 0.08} L ${x + w * 0.88} ${y + h * 0.08} L ${x + w * 0.78} ${y + h * 0.94} L ${x + w * 0.22} ${y + h * 0.94} Z`} fill={F("#F7D33C")} stroke={F("#B9971A")} strokeWidth={3} />;
  return <g key={k}>{plain}<Skin name={name} x={x} y={y} w={w} h={h} /></g>;
}

/* the clear drinking glass photo (`glass`, 92 x 150): drawn in a box of 92:150 from its width; its clear inside is the trapezoid
   (0.07, 0.04) (0.93, 0.04) (0.84, 0.83) (0.15, 0.83), so the juice is drawn BEHIND the photo and clipped to it; the plain tumbler
   under it (the juice colour, a dark outline) is the fallback, painted clear once the photo is there */
const CC_GLASS_PIC = { w: 92, h: 150 };
const CC_GLASS_IN = [[0.07, 0.04], [0.93, 0.04], [0.84, 0.83], [0.15, 0.83]];
function ccGlass(k: string, cx: number, bottom: number, w: number, liq: string, full: boolean) {
  const h = (w * CC_GLASS_PIC.h) / CC_GLASS_PIC.w;
  const x = cx - w / 2, y = bottom - h;
  const has = ccHas("glass");
  const P = (fx: number, fy: number) => (x + fx * w).toFixed(1) + " " + (y + fy * h).toFixed(1);
  const din = "M " + CC_GLASS_IN.map(([fx, fy]: any) => P(fx, fy)).join(" L ") + " Z";
  const top = y + h * 0.12, fl = y + h * 0.83;
  return (
    <g key={k}>
      <defs>
        <linearGradient id={"ccg-g-" + k} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={shade(liq, 0.2)} stopOpacity="0.8" />
          <stop offset="50%" stopColor={liq} stopOpacity="0.65" />
          <stop offset="100%" stopColor={shade(liq, 0.25)} stopOpacity="0.85" />
        </linearGradient>
        <clipPath id={"ccg-c-" + k}><path d={din} /></clipPath>
      </defs>
      {/* the plain fallback: a tumbler with a dark outline, painted clear once the photo is there */}
      <path d={din} fill={has ? "none" : "#FFFFFF"} fillOpacity={0.2} stroke={has ? "none" : shade(liq, 0.55)} strokeWidth={w < 60 ? 2.5 : 3.5} strokeLinejoin="round" />
      {full && <g clipPath={"url(#ccg-c-" + k + ")"}><rect x={x} y={top} width={w} height={fl - top} fill={`url(#ccg-g-${k})`} /></g>}
      <Skin name="glass" x={x} y={y} w={w} h={h} />
    </g>
  );
}

/* the clear glass storage jar photo of phase 4 (`jar`, 129 x 220, re-cut 2026-10-28): straight sides x 0.047 to 0.946 down to y 0.5,
   narrowing to 0.085 to 0.907 at y 0.79, the inside floor y 0.836 (0 mL) and the full line y 0.10 (the jar's capacity); the code water
   is clipped to that outline and its level is LINEAR in the volume between the two lines; the box grows with the capacity (0.13 units
   a mL in every jar), so a litre is the same height in every question */
const CC_JAR = { w: 129, h: 220, full: 0.1, floor: 0.836, k: 0.13 };
/* the inner wall sampled from the photo every 0.03 of its height below y 0.54 (2026-10-29), pushed out 0.006, the bottom curved to the floor */
const CC_JAR_IN = [[0.041, 0.1], [0.041, 0.54], [0.048, 0.57], [0.048, 0.6], [0.056, 0.63], [0.056, 0.66], [0.064, 0.69], [0.064, 0.72], [0.072, 0.75], [0.079, 0.78], [0.079, 0.81], [0.105, 0.836], [0.885, 0.836], [0.911, 0.81], [0.913, 0.78], [0.921, 0.75], [0.928, 0.72], [0.928, 0.69], [0.936, 0.66], [0.936, 0.63], [0.944, 0.6], [0.944, 0.57], [0.952, 0.54], [0.952, 0.1]];
const ccJarBox = (cap: number) => {
  const h = (cap * CC_JAR.k) / (CC_JAR.floor - CC_JAR.full);
  return { w: (h * CC_JAR.w) / CC_JAR.h, h };
};
function ccJar(k: string, cx: number, bottom: number, cap: number, ml: number, liq: string, tx: any, lang?: any) {
  const { w, h } = ccJarBox(cap);
  const x = cx - w / 2, y = bottom - h;
  const fl = y + h * CC_JAR.floor, top = y + h * CC_JAR.full;
  const yOf = (m: number) => fl - ((fl - top) * m) / cap;
  const lv = yOf(Math.min(ml, cap));
  const ix = x, iw = w;
  const has = ccHas("jar"), ph = ccPillH(lang);
  const din = "M " + CC_JAR_IN.map(([fx, fy]: any) => (x + fx * w).toFixed(1) + " " + (y + fy * h).toFixed(1)).join(" L ") + " Z";
  /* the left glass wall at a height (stage units): straight to y 0.5, then narrowing */
  const wallAt = (yy: number) => {
    const fy = (yy - y) / h;
    /* the measured inner wall (the clip points' left half, without their 0.006 push) */
    const Lp = CC_JAR_IN.slice(0, 12);
    let fx = Lp[Lp.length - 1][0];
    for (let i = 0; i < Lp.length - 1; i++) {
      const [x0, y0] = Lp[i], [x1, y1] = Lp[i + 1];
      if (fy >= y0 && fy <= y1) { fx = x0 + ((x1 - x0) * (fy - y0)) / (y1 - y0); break; }
    }
    return x + (fx + 0.006) * w - 2;
  };
  const ticks: number[] = [];
  for (let m = 250; m <= cap; m += 250) ticks.push(m);
  const pills: number[] = [];
  for (let m = 1000; m <= cap; m += 1000) pills.push(m);
  return (
    <g key={k}>
      <defs>
        <linearGradient id={"ccjar-g-" + k} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={shade(liq, 0.25)} stopOpacity="0.75" />
          <stop offset="40%" stopColor={liq} stopOpacity="0.6" />
          <stop offset="100%" stopColor={shade(liq, 0.3)} stopOpacity="0.8" />
        </linearGradient>
        <clipPath id={"ccjar-c-" + k}><path d={din} /></clipPath>
      </defs>
      {/* the plain fallback: the jar's glass outline, painted clear once the photo is there */}
      <path d={din} fill={has ? "none" : "#FFFFFF"} fillOpacity={0.25} stroke={has ? "none" : CC_GLASS} strokeWidth={3} strokeLinejoin="round" />
      <line x1={x + w * 0.04} y1={y + h * 0.04} x2={x + w * 0.96} y2={y + h * 0.04} stroke={has ? "none" : CC_GLASS} strokeWidth={4} strokeLinecap="round" />
      {ml > 0 && (
        <g clipPath={"url(#ccjar-c-" + k + ")"}>
          <rect x={ix} y={lv} width={iw} height={Math.max(0, fl - lv)} fill={`url(#ccjar-g-${k})`} />
          <line x1={ix} y1={lv} x2={ix + iw} y2={lv} stroke={shade(liq, 0.4)} strokeWidth={3} />
        </g>
      )}
      <Skin name="jar" x={x} y={y} w={w} h={h} />
      <g data-scale="jar">
        {/* each tick ends within 2 units of the glass wall */}
        {ticks.map((m) => { const wx = wallAt(yOf(m)); return <line key={m} x1={wx - (m % 1000 === 0 ? 20 : 12)} y1={yOf(m)} x2={wx} y2={yOf(m)} stroke={CC_INK} strokeWidth={m % 1000 === 0 ? 3.5 : 2.5} strokeLinecap="round" />; })}
        {pills.map((m) => {
          const t = m / 1000 + " " + tx("L"), pw = Math.max(56, ccTW(t, 32) + 14), yy = yOf(m), r = wallAt(yy) - 20 - 6;
          return (
            <g key={"p" + m}>
              <rect x={r - pw} y={yy - ph / 2} width={pw} height={ph} rx={ph / 2} fill="#FFF8EA" stroke={CHROME.rule} strokeWidth={2} />
              <text x={r - pw / 2} y={yy + ccPillDy(ph)} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={CC_INK}>{t}</text>
            </g>
          );
        })}
      </g>
    </g>
  );
}

/* the current question, for `format` (it is not told which question is up: PATTERNS 12) */
let CC_NOW: any = null;
/* free play: the 2 L jar and a 250 mL cup */
const CC_FREE: any = { kind: "pour", cup: 250, cap: 2000, small: "cup", big: "jar" };
const ccFresh = (ek: number) => ({ ek, fill: 0, done: false, carry: false, borrow: false, pours: 0, cwk: 0, corr: false, ck: 0, carrying: false });

/* One entry per phase = one mount. */
const PHASES = [
  {
    n: 1,
    concept: "Litres into millilitres: multiply by 1,000",
    conceptId: "M1.S3.T7.C33", objectiveIds: ["O11"],
    says: ["Each litre jug fills to its 1 L line."],
    /* the warm-up (guide steps work it, never question 1): 2 L into two jugs, ending on 2,000 mL */
    warm: [{ kind: "lit", L: 2, ml: 0, box: "bottle" }], stepWarm: [0],
    steps: [{ say: "Tap Pour to fill litre jugs from this 2 L bottle.", on: "pour", hint: "The Pour key is under the empty jugs." }],
    ladder: ["Look once more at the litre jugs.", "Think of a thousand for every litre."],
    closing: "One litre equals 1,000 millilitres, and a 0 keeps an empty hundreds place.",
    learned: "You learned: 1 L is 1,000 mL, so multiply the litres by 1,000.",
    traceback: "The jugs fill again one by one, each chip turning from 1 L to 1,000 mL, and the count stops one jug before the end.",
    items: [
      /* authored: the plan's 19 L, 28 L and 37 L would need 19 to 37 jugs, too small for the 1,000 mL chip on each (the owner's "show each litre becoming 1,000 millilitres") */
      { qid: null, kind: "lit", L: 3, ml: 0, box: "bucket", near: 300,
        say: "This bucket holds 3 L of water: how many millilitres is that?", ask: "3 L in mL?", answer: 3000,
        miss: "Look at the chip under each full jug.",
        ladder: ["Each full jug holds 1,000 mL.", "To get millilitres, multiply the litres by 1,000."],
        win: "Yes, 3 L is the same as 3,000 mL." },
      /* near 1,000: the writeup's error, the litres changed and the millilitres forgotten */
      { qid: null, kind: "lit", L: 1, ml: 750, box: "bottle", liq: "juice", near: 1000,
        say: "A bottle has 1 L 750 mL of juice: how many millilitres is that?", ask: "1 L 750 mL in mL?", answer: 1750,
        miss: "Look at the part jug as well as the full one.",
        ladder: ["The part jug has another 750 mL.", "Add the 1,000 mL and the 750 mL."],
        win: "Yes, 1 L 750 mL is 1,750 mL." },
      /* near 250: the litres and the millilitres written side by side */
      { qid: null, kind: "lit", L: 2, ml: 50, box: "drum", near: 250,
        say: "There are 2 L 50 mL of water in this drum: how many millilitres is that?", ask: "2 L 50 mL in mL?", answer: 2050,
        miss: "2 L is 2,000 mL, so start from 2,000.",
        ladder: ["Now put the 50 mL on top of 2,000 mL.", "50 mL has no hundreds, so the hundreds place gets a 0."],
        win: "Yes, that is right." },
    ],
  },
  {
    n: 2,
    concept: "Millilitres into litres: divide by 1,000",
    conceptId: "M1.S3.T7.C34", objectiveIds: ["O11"],
    says: ["Every 1,000 mL fills one litre jug."],
    /* the warm-up: 1,500 mL, ending on 1 L and 500 mL left */
    warm: [{ kind: "grp", tot: 1500, box: "bucket" }], stepWarm: [0],
    steps: [{ say: "Tap Group to pour 1,000 mL of this water into each jug.", on: "group", hint: "The Group key is under the empty jugs." }],
    ladder: ["Each full jug is a whole litre of water.", "The part jug shows the millilitres left."],
    closing: "Every 1,000 millilitres make one litre.",
    learned: "You learned: 1,000 mL make 1 L, so group millilitres in thousands.",
    traceback: "The jugs fill again 1,000 mL at a time, and the count stops one jug before the end, the part left over not yet poured.",
    items: [
      /* authored: the plan's 17,000, 31,000 and 26,000 mL have no millilitres left over (the owner's phase 2 asks for the
         part left) and need 17 to 31 jugs */
      { qid: null, kind: "grp", tot: 2600, box: "drum", near: [26, 0],
        parts: [{ label: "litres", unit: "L" }, { label: "left over", unit: "mL" }], answer: [2, 600],
        say: "Group the water in this drum into litres: how many litres and millilitres is it?", ask: "litres and mL left?",
        miss: "Only a full jug makes one whole litre.",
        ladder: ["Count the full jugs for the litres.", "Divide by 1,000 for the litres, then work out the millilitres left."],
        win: "Yes, 2,600 mL is 2 L and 600 mL left over." },
      { qid: null, kind: "grp", tot: 4000, box: "bucket", near: [40, 0],
        parts: [{ label: "litres", unit: "L" }, { label: "left over", unit: "mL" }], answer: [4, 0],
        say: "How many litres and millilitres of water are in this bucket?", ask: "litres and mL left?",
        miss: "Look how many jugs are full after grouping.",
        ladder: ["Look at the last jug: is any water left over?", "If no water is left after the full jugs, no millilitres are left over."],
        win: "Yes, 4,000 mL is exactly 4 L, with nothing left over." },
      { qid: null, kind: "grp", tot: 1080, box: "bottle", near: [1, 800],
        parts: [{ label: "litres", unit: "L" }, { label: "left over", unit: "mL" }], answer: [1, 80],
        say: "Change the water in this bottle into litres and the millilitres left over.", ask: "litres and mL left?",
        miss: "Fill the whole jugs first, then look at the part jug.",
        ladder: ["Take 1,000 mL away from the amount to find what is left.", "What is left has no hundreds, so write it as tens and ones."],
        win: "Yes, that is right." },
    ],
  },
  {
    n: 3,
    concept: "Litres and millilitres together",
    conceptId: "M1.S3.T7.C35", objectiveIds: ["O11"],
    says: ["Litres and millilitres each go in their own column."],
    /* the warm-ups: a carry (1 L 600 mL + 2 L 700 mL = 4 L 300 mL), then a borrow (4 L 200 mL - 1 L 500 mL = 2 L 700 mL) */
    warm: [
      { kind: "col", op: "+", a: [1, 600], b: [2, 700], key: "carry", res: [4, 300] },
      { kind: "col", op: "-", a: [4, 200], b: [1, 500], key: "borrow", res: [2, 700] },
    ],
    stepWarm: [0, 1], stepHold: 2200,
    steps: [
      { say: "Start with the millilitres: 600 mL and 700 mL pass 1,000 mL, so tap Carry.", on: "carry", hint: "Carry sends 1,000 mL across as 1 L." },
      { say: "Here 200 mL is less than 500 mL, so tap Borrow to bring 1 L across.", on: "borrow", hint: "Borrow turns 1 L into 1,000 mL." },
    ],
    ladder: ["Work out the millilitres column first.", "Then do the litres column."],
    closing: "Carry 1,000 mL as 1 L, or borrow 1 L as 1,000 mL.",
    learned: "You learned: do the millilitres first, then carry or borrow 1 L.",
    traceback: "The board shows the carry or the borrow again, lights the millilitres column, then the litres column, and leaves the answer row for the child.",
    items: [
      /* authored on the owner's column board: CC4's and practice 4's numbers (C36 questions) with C35's concept id */
      { qid: null, kind: "col", op: "-", a: [6, 120], b: [2, 460], key: "borrow", near: [4, 340],
        parts: [{ label: "litres", unit: "L" }, { label: "millilitres", unit: "mL" }], answer: [3, 660],
        say: "A bucket holds 6 L 120 mL; 2 L 460 mL is poured out: how much is left?", ask: "6 L 120 mL take away 2 L 460 mL",
        miss: "You cannot take 460 mL from 120 mL.",
        ladder: ["After the borrow the top row is 5 L and 1,120 mL.", "Take 460 mL from 1,120 mL, then 2 L from 5 L."],
        win: "Yes, 3 L 660 mL of water is left in the bucket." },
      { qid: null, kind: "col", op: "+", a: [4, 680], b: [2, 530], key: "carry", near: [6, 1210],
        parts: [{ label: "litres", unit: "L" }, { label: "millilitres", unit: "mL" }], answer: [7, 210],
        say: "A can has 4 L 680 mL of juice and a bottle 2 L 530 mL: how much in all?", ask: "4 L 680 mL add 2 L 530 mL",
        miss: "680 mL and 530 mL make more than 1,000 mL.",
        ladder: ["Carry 1 L and keep what is over 1,000 mL.", "Add the carried 1 L to 4 L and 2 L."],
        win: "Yes, there are 7 L 210 mL of juice in all." },
      { qid: null, kind: "col", op: "+", a: [3, 600], b: [2, 400], key: "carry", near: [5, 1000],
        parts: [{ label: "litres", unit: "L" }, { label: "millilitres", unit: "mL" }], answer: [6, 0],
        say: "A pot gets 3 L 600 mL of milk, then 2 L 400 mL more: how much milk now?", ask: "3 L 600 mL add 2 L 400 mL",
        miss: "Start by adding 600 mL and 400 mL.",
        ladder: ["600 mL and 400 mL make exactly 1,000 mL, which is 1 L.", "The litres column gets 3 L, 2 L and one more litre from the carry."],
        win: "Yes, that is right." },
    ],
  },
  {
    n: 4,
    concept: "Adding, subtracting and filling cups",
    conceptId: "M1.S3.T7.C36", objectiveIds: ["O12"],
    says: ["A small cup can fill a big jar, one pour at a time."],
    /* the warm-up: a 500 mL cup into the 1 L jug, two pours, ending on 2 cups */
    warm: [{ kind: "pour", cup: 500, cap: 1000, small: "cup", big: "jug" }], stepWarm: [0, 0],
    steps: [
      { say: "Tap Pour to tip this 500 mL cup into the 1 L jug.", on: "pour", hint: "The Pour key is under the big jug." },
      { say: "Count each cup as you fill the container: pour the second cup.", on: "pour", hint: "Pour again until the jug is full." },
    ],
    ladder: ["Watch the level rise with each cup.", "The row of cups counts every pour."],
    closing: "Count the cups, or divide the big amount by the cup amount.",
    learned: "You learned: count the cups that fill a container, or divide.",
    traceback: "The jar empties and the cups pour in again one by one, the row of cups growing with them, stopping one cup before it is full.",
    items: [
      /* qid null: authored from the owner's examples (2 L / 250 mL = 8, 1 L 500 mL / 250 mL = 6); the plan's other C36 questions
         (CC4, practice 4) are column sums, which the owner's phase 4 does not ask */
      /* near 4: only the first litre filled */
      { qid: null, kind: "pour", cup: 250, cap: 2000, small: "cup", big: "jar", near: 4,
        say: "How many 250 mL cups of water fill this 2 L jar?", ask: "How many cups?", answer: 8,
        miss: "The jar holds 2 L: count the cups for both litres.",
        ladder: ["Four 250 mL cups fill exactly one litre.", "Change 2 L into millilitres, then see how many 250 mL cups go in."],
        win: "Yes, 8 cups of 250 mL fill the 2 L jar." },
      /* near 5: one cup short */
      { qid: null, kind: "pour", cup: 250, cap: 1500, small: "cup", big: "jar", near: 5,
        say: "Ravi fills a 1 L 500 mL jar with a 250 mL cup: how many cupfuls does he pour?", ask: "How many cupfuls?", answer: 6,
        miss: "Count every cup picture, the last one too.",
        ladder: ["Each cup adds 250 mL and the jar holds 1,500 mL.", "Count how many 250 mL make 1,500 mL."],
        win: "Yes, 6 cupfuls of 250 mL make 1,500 mL." },
      /* practice 8: answer in the plan = 9 glasses, because 1 L 260 mL is 1260 mL and 140 mL nine times gives 1260 mL; near 8: one glass short */
      { qid: "M1.S3.T7.C36:8", kind: "pour", cup: 140, cap: 1260, small: "glass", big: "jar", liq: "juice", near: 8,
        say: "A glass holds 140 mL: how many glasses of juice fill a 1 L 260 mL jar?", ask: "How many glasses?", answer: 9,
        miss: "Check that the juice reaches the very top of the jar.",
        ladder: ["Each glass adds 140 mL to the jar.", "Count the glasses until the jar holds 1,260 mL."],
        win: "Yes, that is right." },
    ],
  },
];

/* a win line is read whole in every language: winMs from the LONGEST of its English, Hindi and Gujarati (68 ms a character, 2.4 s at least) */
PHASES.forEach((p: any) => p.items.forEach((it: any) => {
  if (!it.win) return;
  const len = (s: any) => (s ? Array.from(String(s)).length : 0);
  it.winMs = Math.max(2400, 68 * Math.max(len(it.win), len(TR.hi[it.win]), len(TR.gu[it.win])));
}));

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  jug: { photo: "jug 200 x 247", floorAt: 0.842, oneLitreAt: 0.16, scale: "y = 0.842 - 0.682 x mL / 1000 of the picture's height" },
  jugsInARow: 4, jugWidth: 112, jarPxPerMl: 0.165,
  answerGate: "Every question is gated by its act: phase 1 Pour (the litres fill the jugs), phase 2 Group (1,000 mL a jug), phase 3 Carry or Borrow (the right one for the question; the wrong one only nudges, no try), phase 4 Pour until the jar is full. No question is ungated. The gate arms after a real touch of the board or a real Enter on a guide step; the agent's check() performs the act at once.",
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  /* a two-box answer counts only with every box filled: a 0 part is typed, never left empty */
  if (item.parts) return slotPartsOf(v, item.parts.length).every((p: any) => p !== null && p !== undefined && String(p).trim() !== "") && judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "lit") return Number(String(it.L) + String(it.ml + 1000).slice(1)) === it.answer;
  if (it.kind === "grp") { let r = it.tot, l = 0; while (r >= 1000) { r -= 1000; l++; } return it.answer[0] === l && it.answer[1] === r; }
  if (it.kind === "col") {
    const a = it.a[0] * 1000 + it.a[1], b = it.b[0] * 1000 + it.b[1], t = it.op === "+" ? a + b : a - b;
    const needs = it.op === "+" ? it.a[1] + it.b[1] >= 1000 : it.a[1] < it.b[1];
    return needs && it.key === (it.op === "+" ? "carry" : "borrow") && it.answer[0] === Math.floor(t / 1000) && it.answer[1] === t % 1000;
  }
  if (it.kind === "pour") { let s = 0, c = 0; while (s < it.cap) { s += it.cup; c++; } return s === it.cap && c === it.answer; }
  return false;
}));
/* the most likely wrong answer (the item's misconception); judge must reject it */
const nearMiss = (item: any) => (item.near !== undefined ? (Array.isArray(item.near) ? item.near.join("|") : item.near)
  : item.parts ? item.answer.map((x: any) => x + 1).join("|") : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
  : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;
/* the slot shows a typed amount with Indian commas and its unit ("1,750 mL", "8 cups") */
const format = (v: any, i: any, o: any) => {
  const it = CC_NOW;
  const s = String(v === null || v === undefined ? "" : v);
  if (!it || it.parts || !/^\d+$/.test(s)) return s;
  const tx = (o && o.tx) || ((x: any) => x);
  const num = Number(s);
  const unit = it.kind === "lit" ? "mL" : it.small === "glass" ? (num === 1 ? "glass" : "glasses") : num === 1 ? "cup" : "cups";
  return indian(num) + " " + tx(unit);
};

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : (HOOK.check && HOOK.check(), T.submit(item.answer)));
/* the agent's answer() for an item made on the working area: none here (every answer is typed) */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: at a question whose act is still to do it performs the act at once (so AI mode is never
   gated); in a guide step (stage "demo") it is undefined, so check() reaches api.onEnter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area ──────────────────────────────────────────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, part, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const P: any = PHASES[n - 1] || PHASES[0];
  const free = stage === "free";
  const bw = box ? box.w : 1472;
  const kx = box && box.key ? box.key.x - 12 : bw;
  /* the jug row of phases 1 and 2: the jugs keep ONE size with the panel open and shut (120 wide); the pitch takes the room
     (152 open, 222 shut); every scene is centred; only its top band (y < 88) must stay left of the key's corner */
  const jugRow = n <= 2 && !free;
  const JW = 130, J0 = 300;
  const JP = Math.max(144, Math.min(222, (bw - 24 - J0 - JW) / 3));
  const SW = jugRow ? J0 + 3 * JP + JW + 40 : CC_SW;
  const ox = Math.max(0, (bw - SW) / 2);
  const ask = stage === "ask";
  const isWin = !free && (stage === "win" || stage === "idle");

  /* the warm-up board a guide step works on (teach is drawn as step 0: PATTERNS 18) */
  const ls = useRef({ n: 0, s: 0 });
  if (ls.current.n !== n) ls.current = { n, s: 0 };
  if (stage === "demo" && typeof step === "number" && P.steps) ls.current.s = Math.max(0, Math.min(step, P.steps.length - 1));
  const warm = !free && (stage === "demo" || stage === "teach") && !!P.warm;
  const si = stage === "teach" ? 0 : ls.current.s;
  const wi = warm ? (P.stepWarm || [])[si] || 0 : 0;
  const it: any = free ? CC_FREE : warm ? P.warm[wi] : item || P.items[0];
  const kind = free ? "pour" : CC_KINDS[n - 1];
  CC_NOW = warm || free ? null : it;

  /* the board belongs to the ENTRY (PATTERNS 18): a new entry builds a fresh board during render */
  const qk = free ? "free" : warm ? n + ":w" + wi : n + ":q" + index;
  const ent = useRef({ qk: "", n: 0 });
  const W0 = useRef<any>(null);
  const entAt = useRef(0);
  if (ent.current.qk !== qk) { ent.current = { qk, n: ent.current.n + 1 }; W0.current = wrong; entAt.current = Date.now(); }
  const ek = ent.current.n;
  const [raw, setRaw] = useState<any>(() => ccFresh(-1));
  const S = raw.ek === ek ? raw : ccFresh(ek);
  const put = (patch: any, e: number = ek) => setRaw((p: any) => ({ ...(p.ek === e ? p : ccFresh(e)), ...patch }));
  const [, bump] = useState(0);

  /* the numbers of this board */
  const liq = it.liq === "juice" ? CC_JUICE : CC_WATER;
  let full = 0, left = 0;
  if (kind === "lit") { full = it.L; left = it.ml; }
  if (kind === "grp") { full = Math.floor(it.tot / 1000); left = it.tot % 1000; }
  const used = full + (left > 0 ? 1 : 0);
  const N = kind === "pour" ? Math.round(it.cap / it.cup) : 0;

  /* the correction: derived in render from `wrong`, so the first frame after the miss already shows its start */
  const wk = wrong ? wrong.tries || 1 : 0;
  const pend = ask && !free && !!wrong && wrong !== W0.current && S.cwk !== wk;
  const corr = ask && (pend || !!S.corr);
  const fill = isWin ? used : pend ? 0 : S.fill;
  const pours = isWin ? N : pend ? 0 : S.pours;
  const doneAct = isWin || (!pend && S.done);
  const carryOn = isWin ? it.key === "carry" : !pend && S.carry;
  const borrowOn = isWin ? it.key === "borrow" : !pend && S.borrow;
  const ck = pend || isWin ? 0 : S.ck;

  /* ANSWER GATED BY THE ACT (PATTERNS 19) */
  const G = useRef<any>({ armed: false, n: 0 });
  if (G.current.n !== n) G.current = { armed: false, n };
  const needs = ask && !free && !corr && (kind === "pour" ? pours < N && !S.done : !S.done);
  const gate = needs && G.current.armed;
  const playing = useRef(false);
  const queued = useRef<any>(null);
  const KB = useRef(0);
  const KBAns = useRef(0);
  const nudgeT = useRef<any>(0);
  const nudged = useRef(false);
  const sentDid = useRef(-1);
  const queuedAns = useRef(false);
  const queuedPours = useRef(0);
  /* the nudge forms rotate through the phase, one step a nudge, so two nudges in a row never say the same line */
  const NC = useRef({ n: 0, c: 0, k: 0 });
  if (NC.current.n !== n) NC.current = { n, c: 0, k: 0 };
  useEffect(() => { if (stage === "ask" && !playing.current) api.lock(!!(gate || corr)); });
  /* a correction replay never outlives the question (a right answer then draws the finished picture) */
  useEffect(() => { if (stage !== "ask") tl.stop(); }, [stage]);

  /* the nudge for a locked question: names the ACT, never the answer; three forms, rotating tap by tap */
  const sayQ = () => { const L = live.current; if (L.stage === "ask" && L.item) api.say(L.item.say); };
  const holdNudge = () => {
    nudged.current = true;
    clearTimeout(nudgeT.current);
    nudgeT.current = setTimeout(() => { if (nudged.current) { nudged.current = false; sayQ(); } }, 3000);
  };
  const nudge = () => {
    const L = live.current;
    if (!L.gate || playing.current || Date.now() - entAt.current < 450) return;
    const f = NC.current.c++ % 3;
    if (L.kind === "lit") { if (f === 0) api.say("First tap Pour to fill the litre jugs."); else if (f === 1) api.say("Pour the water into the jugs first."); else api.say("Tap Pour so each litre fills its own jug."); }
    else if (L.kind === "grp") { if (f === 0) api.say("First tap Group to fill the jugs."); else if (f === 1) api.say("Group the water into the jugs first."); else api.say("Tap Group so every 1,000 mL fills a jug."); }
    else if (L.kind === "col") { if (f === 0) api.say("First choose Carry or Borrow on the board."); else if (f === 1) api.say("Decide on Carry or Borrow before you answer."); else api.say("Tap Carry or Borrow under the board first."); }
    else {
      const gl = !!(L.item && L.item.small === "glass");
      if (f === 0) api.say("Keep tapping Pour until the jar is full.");
      else if (f === 1) { if (gl) api.say("Fill the jar with the glasses before you answer."); else api.say("Fill the jar with the cup before you answer."); }
      else { if (gl) api.say("Pour glass after glass until the jar is full."); else api.say("Pour cup after cup until the jar is full."); }
    }
    holdNudge();
  };
  /* the wrong one of Carry and Borrow: a calm nudge that never says which is right, and costs no try */
  const keyNudge = () => {
    const f = NC.current.k++ % 3;
    if (f === 0) api.say("Look at the millilitres column: too many millilitres, or too few?");
    else if (f === 1) api.say("Check the millilitres again, then choose.");
    else api.say("Do the millilitres need a carry or a borrow?");
    holdNudge();
  };
  /* Enter on an empty box of a two-box answer */
  const fillBoth = () => { api.say("Fill both boxes."); holdNudge(); };
  /* Enter on the empty box of a one-number answer */
  const typeFirst = () => { api.say("Type your answer first."); holdNudge(); };
  /* keyboard focus never drops to the page: after a keyboard act it goes to the control just used while it can act again, else
     to the control the lesson waits for next */
  const refocus = (ids: any[], ms = 170) => setTimeout(() => {
    for (const id of ids) {
      if (!id) continue;
      const el: any = document.querySelector('[data-control="' + id + '"]');
      if (el && el.getAttribute("aria-disabled") !== "true" && el.focus) { el.focus(); return; }
    }
  }, ms);
  const afterAct = (kb: boolean) => {
    clearTimeout(nudgeT.current);
    if (nudged.current) { nudged.current = false; sayQ(); }
    if (kb) refocus(["answer-open"], 160);
  };

  /* every act is performed on screen (api.act), reacted to 40 ms after it resolves (the action-anim race, NOTES.md) */
  const run = (o: any, onDone: () => void) => {
    if (playing.current) return;
    playing.current = true;
    api.act(o).then((ok: boolean) => {
      setTimeout(() => {
        playing.current = false;
        if (ok) onDone();
        const q = queued.current;
        queued.current = null;
        /* Pour taps made while a cup was pouring are kept in order: each runs in turn and takes its target when it runs
           (a full jar takes none); another key keeps its one slot */
        if (ok && queuedPours.current > 0) { queuedPours.current--; setTimeout(() => live.current.act && live.current.act("pour"), 60); }
        else if (ok && q) setTimeout(() => live.current.act && live.current.act(q), 60);
        if (!ok) queuedPours.current = 0;
        /* a tap on the Answer key made while the act played: open the pad once the act has opened the gate */
        if (queuedAns.current) {
          queuedAns.current = false;
          if (ok) setTimeout(() => { const L = live.current; if (L.stage === "ask" && !L.gate && !L.corr && api.openAnswer) api.openAnswer(); }, 160);
        }
        bump((x: number) => x + 1);
      }, 40);
    });
  };
  const didOnce = (on: string, e: number) => { if (sentDid.current === e) return; sentDid.current = e; api.did(on); };

  /* the geometry, in Work units */
  const JH = (JW * CC_JUG.h) / CC_JUG.w, JB = 302, JT = JB - JH;
  const jx = (j: number) => ox + J0 + j * JP;
  const jcx = (j: number) => jx(j) + JW * 0.4;
  const rowC = ox + J0 + (3 * JP + JW) / 2;
  const B = { sx: ox + 148, lx: ox + 300, mx: ox + 600, top: 205, bot: 285, regY: 112 };
  const J4 = { cupX: ox + 110, cupB: 330, jx: ox + 420, jb: 428, bot: 412, wx: ox + 360, ww: 230 };
  const pourTo = () => (it.big === "jug" ? { x: J4.wx + J4.ww * 0.35, y: J4.bot - (J4.ww * CC_JUG.h) / CC_JUG.w + 40 } : { x: J4.jx, y: J4.jb - ccJarBox(it.cap).h - 24 });

  const act = (on: string) => {
    if (corr || isWin) return;
    const demo = stage === "demo";
    if (demo && !stepOn) return;
    if (demo && on !== stepOn) { api.did(on); return; }
    if (!(demo || ask || free)) return;
    const e = ek, kb = Date.now() - KB.current < 450;
    if (kind === "lit" || kind === "grp") {
      if (on !== (kind === "lit" ? "pour" : "group")) return;
      if (fill >= used) { if (demo) didOnce(on, e); return; }
      const from = fill, pts: any[] = [];
      for (let j = from; j < used; j++) pts.push({ x: jcx(j), y: JT + 36 });
      const drop = <path d="M 0 -18 C 10 -4 14 4 14 9 A 14 14 0 0 1 -14 9 C -14 4 -10 -4 0 -18 Z" fill={liq} fillOpacity={0.85} stroke={shade(liq, 0.35)} strokeWidth={2} />;
      run({ tool: "hand", moves: "carry", from: { x: ox + 140, y: 200 }, at: pts, hold: drop, onPoint: (i: number) => put({ fill: from + i + 1 }, e) }, () => {
        put({ fill: used, done: true }, e);
        api.sfx.settle();
        if (demo) didOnce(on, e); else afterAct(kb);
      });
      return;
    }
    if (kind === "col") {
      if (on !== "carry" && on !== "borrow") return;
      if (S.done) { if (demo) didOnce(on, e); return; }
      if (!demo && on !== it.key) { keyNudge(); if (kb) refocus([on]); return; }
      const chip = <g><rect x={-46} y={-26} width={92} height={52} rx={14} fill={tint(CC_AMBER, 0.8)} stroke={CC_AMBER} strokeWidth={4} /><text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(CC_AMBER, 0.5)}>{"1 " + tx("L")}</text></g>;
      const from = on === "carry" ? { x: B.mx, y: B.top - 20 } : { x: B.lx, y: B.top - 20 };
      const to = on === "carry" ? { x: B.lx, y: B.regY } : { x: B.mx, y: B.regY };
      run({ tool: "hand", moves: "carry", from, at: [to], hold: chip, onPoint: () => put({ [on]: true }, e) }, () => {
        put({ [on]: true, done: true }, e);
        api.sfx.trade();
        if (demo) {
          if (P.steps && si < P.steps.length - 1) {
            setTimeout(() => { if (live.current.ek === e) didOnce(on, e); }, 900);
            if (kb) refocus([P.steps[si + 1].on], 1100);
          } else didOnce(on, e);
        } else afterAct(kb);
      });
      return;
    }
    /* pour: one cup a tap */
    if (on !== "pour") return;
    let p0 = pours;
    if (free && p0 >= N) { put({ pours: 0 }, e); p0 = 0; }
    if (p0 >= N) { queuedPours.current = 0; if (demo) didOnce(on, e); return; }
    const cupNode = it.small === "glass" ? ccGlass("hold", 0, 50, 60, liq, true) : ccPic("hold", "cup", 0, 50, 84, 100);
    const home = { x: J4.cupX, y: J4.cupB - 70 };
    put({ carrying: true }, e);
    run({ tool: "hand", moves: "carry", from: home, at: [pourTo()], to: home, ms: 750, hold: cupNode, onPoint: () => put({ pours: p0 + 1 }, e) }, () => {
      const np = p0 + 1;
      put({ pours: np, carrying: false, done: !free && !demo && np >= N ? true : S.done }, e);
      if (demo) { sentDid.current = -1; api.did(on); if (kb) refocus(["pour"]); }
      else if (np >= N && !free) { queuedPours.current = 0; api.sfx.settle(); afterAct(kb); }
      else if (kb) refocus(["pour"]);
    });
  };

  /* what the listeners read: always the latest render */
  const live = useRef<any>({});
  live.current = { stage, gate, corr, kind, index, item, ek, act, nudge, fillBoth, typeFirst, typed, part, open: !!(box && box.open), parts: !!(item && item.parts) && !free };

  /* keyboard focus at the turns the runtime takes: a question opening after a guide step goes to its act key; the pad opening
     by the keyboard goes to the pad's Enter key (digits still type from anywhere; Enter on it answers) */
  const actId = kind === "lit" || kind === "pour" ? "pour" : kind === "grp" ? "group" : "carry";
  useEffect(() => {
    const blank = () => !document.activeElement || document.activeElement === document.body;
    if (stage === "ask" && Date.now() - KB.current < 6000 && blank()) refocus([actId, "answer-open"], 220);
  }, [stage, ek]);
  const openNow = !!(box && box.open);
  useEffect(() => {
    /* only when the keyboard's Enter or Space on the Answer key itself opened the pad (a mouse or finger never moves focus) */
    if (openNow && stage === "ask" && Date.now() - KBAns.current < 1200) {
      setTimeout(() => {
        const a = document.activeElement;
        if (!a || a === document.body || (a.getAttribute && a.getAttribute("data-control") === "answer-open")) {
          const el: any = document.querySelector('[data-control="key-enter"]');
          if (el && el.focus) el.focus();
        }
      }, 200);
    }
  }, [openNow]);

  /* the gate arms after a real touch of the board (or a real Enter or Space on a guide step or an act key); a tap made while an
     act plays is queued; while a correction replays the pad, its keys and the Answer key are dead */
  useEffect(() => {
    const down = (ev: any) => {
      if (!ev.isTrusted) return;
      const t: any = ev.target, L = live.current;
      const at = (sel: string) => !!(t && t.closest && t.closest(sel));
      if (L.corr && at('[data-control^="key-"],[data-control="answer-open"]')) { ev.stopPropagation(); ev.preventDefault(); return; }
      if (at('[data-zone="work"]') && !G.current.armed && (L.stage === "demo" || L.stage === "ask")) { G.current.armed = true; bump((x: number) => x + 1); }
      if (playing.current && L.stage === "ask" && at('[data-control="answer-open"]')) { queuedAns.current = true; return; }
      if (L.gate && at('[data-control="answer-open"],[data-control="again"],[data-zone="ask"]')) setTimeout(() => live.current.nudge(), 90);
      /* the pad's own Enter on an empty box */
      if (L.stage === "ask" && L.open && !L.gate && !L.corr && at('[data-control="key-enter"]')) {
        if (L.parts) {
          const ps = slotPartsOf(L.typed || "", 2), p = typeof L.part === "number" ? L.part : 0;
          if (ps[p] === undefined || ps[p] === null || String(ps[p]) === "") setTimeout(() => live.current.fillBoth(), 90);
        } else if (!String(L.typed || "").trim()) setTimeout(() => live.current.typeFirst(), 90);
      }
    };
    const up = (ev: any) => {
      /* a guide step waits for its own act: a tap made while its act plays is dropped, never shown later as a wrong act */
      if (!ev.isTrusted || !playing.current || live.current.stage === "demo") return;
      Array.from(document.querySelectorAll('[data-control="pour"],[data-control="group"],[data-control="carry"],[data-control="borrow"]')).forEach((el: any) => {
        const r = el.getBoundingClientRect();
        if (el.getAttribute("aria-disabled") !== "true" && ev.clientX >= r.left && ev.clientX <= r.right && ev.clientY >= r.top && ev.clientY <= r.bottom) {
          const id = el.getAttribute("data-control");
          if (id === "pour") queuedPours.current++; else queued.current = id;
        }
      });
    };
    const key = (ev: any) => {
      if (!ev.isTrusted) return;
      const L = live.current;
      const digit = /^[0-9]$/.test(ev.key);
      if (L.corr && (digit || ev.key === "Enter" || ev.key === "Backspace" || ev.key === "Escape" || ev.key === ".")) { ev.stopImmediatePropagation(); ev.preventDefault(); return; }
      if (ev.key === "Enter" || ev.key === " ") {
        KB.current = Date.now();
        if (ev.target && ev.target.closest && ev.target.closest('[data-control="answer-open"]')) KBAns.current = Date.now();
        const inWork = !!(ev.target && ev.target.closest && ev.target.closest('[data-zone="work"]'));
        if (!G.current.armed && (L.stage === "demo" || (L.stage === "ask" && inWork))) { G.current.armed = true; bump((x: number) => x + 1); }
      }
      /* a digit, or Enter / Space / Backspace anywhere but on an act key, at a question still waiting for its act: the act's nudge */
      const onAct = !!(ev.target && ev.target.closest && ev.target.closest('[data-zone="work"] [data-control]'));
      if (L.gate && (digit || ((ev.key === "Enter" || ev.key === " " || ev.key === "Backspace") && !onAct))) setTimeout(() => live.current.nudge(), 90);
      if (ev.key === "Enter" && L.stage === "ask" && L.open && !L.gate && !L.corr) {
        if (L.parts) {
          const ps = slotPartsOf(L.typed || "", 2), p = typeof L.part === "number" ? L.part : 0;
          if (ps[p] === undefined || ps[p] === null || String(ps[p]) === "") setTimeout(() => live.current.fillBoth(), 90);
        } else if (!String(L.typed || "").trim()) setTimeout(() => live.current.typeFirst(), 90);
      }
    };
    window.addEventListener("pointerdown", down, true);
    window.addEventListener("pointerup", up, true);
    window.addEventListener("keydown", key, true);
    return () => {
      window.removeEventListener("pointerdown", down, true);
      window.removeEventListener("pointerup", up, true);
      window.removeEventListener("keydown", key, true);
      clearTimeout(nudgeT.current);
    };
  }, []);

  /* Enter, the agent's check() and the dev solve() perform the CURRENT step */
  api.onEnter(stage === "demo" && stepOn ? () => act(stepOn) : null);
  HOOK.demo = () => act(stepOn);
  /* the agent performs a question's act at once (no animation), only while it is still to do */
  HOOK.check = needs ? () => {
    if (kind === "lit" || kind === "grp") put({ fill: used, done: true });
    else if (kind === "col") put({ [it.key]: true, done: true });
    else put({ pours: N, done: true });
    return true;
  } : undefined;

  /* THE CORRECTION (MISS HIDES THE ANSWER): replay the act's end state and the count, one step short; the picture is locked */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free || wrong === W0.current) return;
    const e = ek, w = wrong.tries || 1;
    tl.stop();
    clearTimeout(nudgeT.current);
    nudged.current = false;
    const steps: any[] = [[520, null]];
    if (kind === "lit" || kind === "grp") {
      put({ cwk: w, corr: true, fill: 0, done: true }, e);
      /* phase 1 refills every litre but the last; phase 2 (the owner, MISS HIDES THE ANSWER) fills ONE jug of 1,000 mL and stops */
      const stopAt = kind === "grp" ? Math.min(1, used - 1) : used - 1;
      for (let k = 1; k <= stopAt; k++) steps.push([480, () => { put({ fill: k }, e); api.sfx.tick(); }]);
    } else if (kind === "col") {
      put({ cwk: w, corr: true, ck: 0, carry: it.key === "carry", borrow: it.key === "borrow", done: true }, e);
      steps.push([820, () => put({ ck: 1 }, e)]);
      steps.push([820, () => put({ ck: 2 }, e)]);
    } else {
      put({ cwk: w, corr: true, pours: 0, done: true, carrying: false }, e);
      for (let k = 1; k < N; k++) steps.push([360, () => { put({ pours: k }, e); api.sfx.tick(); }]);
    }
    tl.run(steps, () => put({ corr: false }, e));
  }, [wrong]);
  useEffect(() => () => { tl.stop(); queuedPours.current = 0; queued.current = null; }, [ek]);

  /* the win line, said at the win (a phase's last one is replaced by its closing line) */
  useEffect(() => { if (stage === "win" && item && item.win) api.say(item.win); }, [stage, index, n]);

  /* what the host and the agent read back (toolApi.getState): the given amounts and the act, never the answer */
  api.share({ phase: n, act: doneAct, carry: !!carryOn, borrow: !!borrowOn, complete: stage === "idle" });

  const invite = (x: number, y: number, w: number, h: number) => <Invite x={x + w / 2} y={y + h / 2} w={w} h={h} rx={RAD.key} C={C} />;
  const actKey = (id: string, label: string, x: number, y: number, w: number, off: boolean) => (
    <Key key={"k-" + id} id={id} label={label} x={x} y={y} w={w} h={72} C={C} tone="key" disabled={off} onClick={() => act(id)}>
      <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={off ? C.dim : toneInk("key", C.ink)}>{tx(label)}</text>
    </Key>
  );
  const wantInvite = (id: string) => (stage === "demo" ? stepOn === id : (ask && needs && !corr) || (free && id === "pour"));

  /* ── phase 1 and 2: the given container, a row of four litre jugs ── */
  const drawJugs = () => {
    const isLit = kind === "lit";
    const given = isLit ? ccLM(it.L, it.ml, tx) : ccML(it.tot, tx);
    /* the given tag: ONE line in every language, 32, at least 200 wide, above the container (x 4 to about 280) */
    const gw = Math.max(200, ccTW(given, 32) + 32);
    const gx = ox + Math.max(4, 140 - gw / 2);
    /* the chips under the jugs: one line, at least 200 wide; on two staggered rows when the pitch is too small for one */
    const chipW = (t: string) => Math.max(200, ccTW(t, 32) + 28);
    const twoRows = JP < chipW("1,000 " + tx("mL")) + 16;
    /* rows 20 apart (16 seen between the 4-wide outlines), the key 19 below */
    const chipY = (j: number) => (twoRows && j % 2 === 1 ? 378 : 310);
    const chipX = (j: number, cw: number) => Math.max(ox + 4, Math.min(bw - 4 - cw, jcx(j) - cw / 2));
    /* the unit fact, two texts split at the "=" (each a short label): "1 L =" | "1,000 mL" */
    const fL = isLit ? "1 " + tx("L") + " =" : "1,000 " + tx("mL") + " =";
    const fR = isLit ? "1,000 " + tx("mL") : "1 " + tx("L");
    const wL = ccTW(fL, 40), wR = ccTW(fR, 40);
    const fw = wL + wR + 14 + 64;
    const fc = Math.min(rowC, kx - fw / 2 - 6);
    const fSplit = fc + (wL - wR) / 2;
    const keyId = isLit ? "pour" : "group";
    const kw = 220, kX = rowC - kw / 2, kY = 445;
    const showChips = doneAct || corr || (warm && S.done);
    const res = isLit ? ccML(it.L * 1000 + it.ml, tx) : left > 0 ? ccLM(full, left, tx) : full + " " + tx("L");
    /* the win's green tag carries its role: "Answer: 3,000 mL" (NOTES rule 3); the warm-up's result is the amount alone */
    const ans = tx("Answer") + ": " + res;
    const rw = Math.max(260, ccTW(res, 40) + 40), aw = Math.max(300, ccTW(ans, 40) + 40);
    return (
      <g>
        {ccPic("box", it.box, ox + 140, JB, 200, 170)}
        {lang === "hi" || lang === "gu" ? ccTag("given", gx, 62, gw, 60, given, CC_BLUE, 32) : ccTag("given", gx, 66, gw, 52, given, CC_BLUE, 32)}
        <g data-scale="fact">
          <rect x={fc - fw / 2} y={4} width={fw} height={52} rx={26} fill={tint(CC_VERM, 0.9)} stroke={CC_VERM} strokeWidth={5} />
          <text x={fSplit - 7} y={44} textAnchor="end" fontSize={T.prompt} fontWeight={700} fill={shade(CC_VERM, 0.45)}>{fL}</text>
          <text x={fSplit + 7} y={44} textAnchor="start" fontSize={T.prompt} fontWeight={700} fill={shade(CC_VERM, 0.45)}>{fR}</text>
        </g>
        {[0, 1, 2, 3].map((j) => {
          const ml = j < fill ? (j < full ? 1000 : left) : 0;
          const isLeft = !isLit && j === full && left > 0 && fill > j;
          return ccJug("j" + j, jx(j), JT, JW, ml, { tx, lang, liq, ring: isLeft, pill: "top" });
        })}
        {showChips && [0, 1, 2, 3].map((j) => {
          if (j >= fill) return null;
          const isPart = j >= full;
          if (!isLit && isPart) { const cw = chipW(tx("Left")); return <g key={"c" + j}>{ccTag("c" + j, chipX(j, cw), chipY(j), cw, 48, tx("Left"), CC_AMBER, 32)}</g>; }
          const t = (isPart ? String(left) : "1,000") + " " + tx("mL"), cw = chipW(t);
          return <g key={"c" + j}>{ccTag("c" + j, chipX(j, cw), chipY(j), cw, 48, t, isPart ? CC_AMBER : CC_BLUE, 32)}</g>;
        })}
        {!isWin && actKey(keyId, isLit ? "Pour" : "Group", kX, kY, kw, corr || fill >= used || (warm && S.done))}
        {!isWin && wantInvite(keyId) && fill < used && invite(kX, kY, kw, 72)}
        {warm && S.done && ccTag("res", rowC - rw / 2, 440, rw, 72, res, CC_GREEN, 40)}
        {isWin && <g data-reveals="answer">{ccTag("ans", rowC - aw / 2, 440, aw, 72, ans, CC_GREEN, 40)}</g>}
      </g>
    );
  };

  /* ── phase 3: the litres | millilitres column board ── */
  const drawBoard = () => {
    const a = it.a, b = it.b, plus = it.op === "+";
    const res = warm ? it.res : item ? item.answer : [0, 0];
    const showRes = (warm && S.done) || isWin;
    const cell = (k: string, x: number, w: number, text: string, on: boolean) => (
      <g key={k}>
        <rect x={x} y={330} width={w} height={76} rx={14} fill={on ? tint(CC_GREEN, 0.85) : "#FFFFFF"} stroke={on ? CC_GREEN : CHROME.rule} strokeWidth={on ? 4 : 2.5} strokeDasharray={on ? undefined : "10 8"} />
        {on && <text x={x + w / 2} y={388} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={shade(CC_GREEN, 0.5)}>{text}</text>}
      </g>
    );
    const ckX = ox + 220, bkX = ox + 460, kY = 436;
    const off = corr || S.done || isWin || (warm && S.done);
    return (
      <g>
        <rect x={ox + 100} y={0} width={700} height={420} rx={22} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={3} />
        {ck >= 1 && <rect x={ox + 414} y={74} width={380} height={246} rx={14} fill={tint(CC_AMBER, 0.78)} />}
        {ck >= 2 && <rect x={ox + 194} y={74} width={212} height={246} rx={14} fill={tint(CC_AMBER, 0.78)} />}
        <line x1={ox + 410} y1={14} x2={ox + 410} y2={410} stroke={CC_INK} strokeWidth={3} />
        <g data-scale="heads">
          <text x={B.lx} y={52} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={CC_INK}>{tx("L")}</text>
          <text x={B.mx} y={52} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={CC_INK}>{tx("mL")}</text>
        </g>
        <line x1={ox + 120} y1={70} x2={ox + 780} y2={70} stroke={C.rule} strokeWidth={2.5} />
        {carryOn && ccTag("cy", B.lx - 40, B.regY - 27, 80, 54, "1", CC_AMBER, 40)}
        {borrowOn && ccTag("bl", B.lx - 40, B.regY - 27, 80, 54, String(a[0] - 1), CC_AMBER, 40)}
        {borrowOn && ccTag("bm", B.mx - 90, B.regY - 27, 180, 54, indian(a[1] + 1000), CC_AMBER, 40)}
        <text x={B.lx} y={B.top} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={shade(CC_BLUE, 0.35)}>{a[0]}</text>
        <text x={B.mx} y={B.top} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={shade(CC_BLUE, 0.35)}>{a[1]}</text>
        {borrowOn && <line x1={B.lx - 26} y1={B.top - 18} x2={B.lx + 26} y2={B.top - 24} stroke={CC_INK} strokeWidth={4} />}
        {borrowOn && <line x1={B.mx - 60} y1={B.top - 18} x2={B.mx + 60} y2={B.top - 24} stroke={CC_INK} strokeWidth={4} />}
        <text x={B.sx} y={B.bot} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={CC_INK}>{plus ? "+" : "−"}</text>
        {/* the second amount of a sum or a difference wears the amber Second role */}
        <text x={B.lx} y={B.bot} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={shade(CC_AMBER, 0.5)}>{b[0]}</text>
        <text x={B.mx} y={B.bot} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={shade(CC_AMBER, 0.5)}>{b[1]}</text>
        <line x1={ox + 120} y1={312} x2={ox + 780} y2={312} stroke={CC_INK} strokeWidth={4} />
        {isWin ? <g data-reveals="answer">{cell("rl", ox + 230, 140, String(res[0]), true)}{cell("rm", ox + 470, 260, String(res[1]), true)}
            {(() => { const t = tx("Answer") + ": " + ccLM(res[0], res[1], tx) + (res[1] === 0 ? " 0 " + tx("mL") : ""), aw = Math.max(300, ccTW(t, 40) + 40); return ccTag("ans", ox + 450 - aw / 2, 444, aw, 72, t, CC_GREEN, 40); })()}</g>
          : <g>{cell("rl", ox + 230, 140, String(res[0]), showRes)}{cell("rm", ox + 470, 260, String(res[1]), showRes)}</g>}
        {!isWin && actKey("carry", "Carry", ckX, kY, 220, off)}
        {!isWin && actKey("borrow", "Borrow", bkX, kY, 220, off)}
        {!isWin && !off && wantInvite("carry") && stage === "demo" && invite(ckX, kY, 220, 72)}
        {!isWin && !off && wantInvite("borrow") && stage === "demo" && invite(bkX, kY, 220, 72)}
      </g>
    );
  };

  /* ── phase 4 and free play: a small cup (or glass) and a big jar (the warm-up: the 1 L jug) ── */
  const drawPour = () => {
    const ml = pours * it.cup;
    const cupT = it.cup + " " + tx("mL");
    const cw = Math.max(170, ccTW(cupT, 36) + 28);
    const capT = it.big === "jug" ? "1 " + tx("L") : ccLM(Math.floor(it.cap / 1000), it.cap % 1000, tx);
    const capW = Math.max(150, ccTW(capT, 36) + 28);
    const jb = it.big === "jug" ? null : ccJarBox(it.cap);
    /* the key sits under the container; the jar's capacity tag stands above its top-left corner, the jug's above its middle */
    const capX = it.big === "jug" ? J4.wx + J4.ww * 0.4 : J4.jx;
    const capL = jb ? Math.max(ox + 4, J4.jx - jb.w / 2 + 40 - capW) : capX - capW / 2;
    const capY = jb ? Math.max(0, J4.jb - jb.h - 90) : 4;
    const unitW = it.small === "glass" ? (pours === 1 ? "glass" : "glasses") : pours === 1 ? "cup" : "cups";
    const res = (warm || free ? pours : N) + " " + tx(unitW);
    const ans = tx("Answer") + ": " + N + " " + tx(it.small === "glass" ? "glasses" : "cups");
    const aw = Math.max(300, ccTW(ans, 40) + 40);
    const kw = 220, kX = capX - kw / 2, kY = 436;
    const offKey = corr || isWin || (!free && pours >= N);
    const tallyX = ox + 650;
    /* the Pours count (and its caption) shows in the warm-up and free play, and its number at the win; at a question the child counts the cups */
    const showCount = warm || free || isWin;
    const big = it.big === "jug"
      ? ccJug("big", J4.wx, J4.bot - (J4.ww * CC_JUG.h) / CC_JUG.w, J4.ww, ml, { tx, lang, liq, mid: true })
      : ccJar("big", J4.jx, J4.jb, it.cap, ml, liq, tx, lang);
    return (
      <g>
        {!S.carrying && (it.small === "glass" ? ccGlass("small", J4.cupX, J4.cupB, 86, liq, true) : ccPic("small", "cup", J4.cupX, J4.cupB, 120, 145))}
        {ccTag("cupT", J4.cupX - cw / 2, 346, cw, 60, cupT, CC_BLUE, 36)}
        {big}
        {lang === "hi" || lang === "gu" ? ccTag("capT", capL, capY, capW, 66, capT, CC_BLUE, 36) : ccTag("capT", capL, capY, capW, 58, capT, CC_BLUE, 36)}
        {showCount && <text x={tallyX + 110} y={120} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={CC_INK}>{tx("Pours")}</text>}
        {showCount && <rect x={tallyX + 50} y={134} width={120} height={96} rx={16} fill="#FFFFFF" stroke={C.rule} strokeWidth={3} />}
        {(warm || free) && <text x={tallyX + 110} y={206} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={CC_INK}>{pours}</text>}
        {Array.from({ length: isWin ? 0 : pours }, (_, i) => {
          const tx0 = tallyX + (i % 5) * 46, ty0 = 300 + Math.floor(i / 5) * 58;
          return it.small === "glass" ? ccGlass("t" + i, tx0 + 20, ty0, 32, liq, true) : ccPic("t" + i, "cup", tx0 + 20, ty0, 38, 46);
        })}
        {!isWin && actKey("pour", "Pour", kX, kY, kw, offKey)}
        {!isWin && !offKey && wantInvite("pour") && invite(kX, kY, kw, 72)}
        {warm && pours >= N && ccTag("res", tallyX, 412, 240, 70, res, CC_GREEN, 40)}
        {isWin && <g data-reveals="answer">
          <text x={tallyX + 110} y={206} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={CC_INK}>{N}</text>
          {Array.from({ length: N }, (_, i) => {
            const tx0 = tallyX + (i % 5) * 46, ty0 = 300 + Math.floor(i / 5) * 58;
            return it.small === "glass" ? ccGlass("w" + i, tx0 + 20, ty0, 32, liq, true) : ccPic("w" + i, "cup", tx0 + 20, ty0, 38, 46);
          })}
          {ccTag("ans", Math.max(ox + 4, capX - aw / 2), 444, aw, 72, ans, CC_GREEN, 40)}
        </g>}
      </g>
    );
  };

  return (
    <g>
      {kind === "lit" || kind === "grp" ? drawJugs() : kind === "col" ? drawBoard() : drawPour()}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase (r24: `it` is the item) */
function Thumb({ result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const item: any = it || last.it || {};
  const kind = item.kind || last.kind;
  /* a unit is printed in Hindi and Gujarati only once its TR line exists (summary-thumbs, before the language pass) */
  const U = (s: string) => (lang === "en" || (TR[lang] && TR[lang][s]) ? " " + tx(s) : "");
  const num = (v: any) => Number(String(v).replace(/[^0-9]/g, "")) || 0;
  /* the amount, one line when it fits beside the picture, else its number over its unit */
  let lines: string[] = [];
  if (kind === "grp" || kind === "col") { const [a, b] = slotPartsOf(last.value, 2); lines = [a + U("L"), b + U("mL")]; }
  else if (kind === "lit") lines = [indian(num(last.value)), U("mL").trim()];
  else { const v = num(last.value); lines = [String(v), U(item.small === "glass" ? (v === 1 ? "glass" : "glasses") : v === 1 ? "cup" : "cups").trim()]; }
  lines = lines.filter((s) => s);
  /* the picture takes 48 (x 8 to 56), so the amount gets the rest of the row: ONE line at 32 when it fits, else one line at 28
     (two lines of Hindi or Gujarati cannot clear a 76-tall row), the text never nearer the right edge than 12. The width estimate
     here is closer than ccTW: Latin 0.53 em, Devanagari / Gujarati 0.5 em (FIT_KEY.devEm), a space or comma 0.28 */
  const s = Math.min(h - 16, 60), iy = (h - s) / 2, tx0 = 68, room = w - tx0 - 12;
  const one = lines.join(" ");
  const tw = (t: string, size: number) => {
    let n = 0;
    for (const ch of t) {
      const c = ch.codePointAt(0) || 0;
      if ((c >= 0x900 && c <= 0x902) || c === 0x93c || (c >= 0x941 && c <= 0x948) || c === 0x94d || (c >= 0xa81 && c <= 0xa82) || c === 0xabc || (c >= 0xac1 && c <= 0xac8) || c === 0xacd) continue;
      n += ch === " " || ch === "," ? 0.28 : c >= 0x900 ? 0.5 : 0.53;
    }
    return n * size;
  };
  const fit1 = tw(one, T.label) <= room;
  const fit28 = !fit1 && tw(one, T.micro) <= room;
  /* each phase its own small picture: a full litre jug (phase 1), a jug with a part ringed (phase 2), an L | mL board (phase 3), cups (phase 4) */
  const jugMini = (x: number, lvl: number, ring: boolean) => (
    <g>
      <path d={`M ${x + 5} ${iy} L ${x + 33} ${iy} L ${x + 38} ${iy + s} L ${x} ${iy + s} Z`} fill="#FFFFFF" fillOpacity={0.5} />
      <path d={`M ${x + 5 * lvl} ${iy + s * (1 - lvl)} L ${x + 38 - 5 * lvl} ${iy + s * (1 - lvl)} L ${x + 38} ${iy + s} L ${x} ${iy + s} Z`} fill={CC_WATER} fillOpacity={0.6} />
      <path d={`M ${x + 5} ${iy} L ${x + 33} ${iy} L ${x + 38} ${iy + s} L ${x} ${iy + s} Z`} fill="none" stroke={shade(CC_GLASS, 0.3)} strokeWidth={3} strokeLinejoin="round" />
      <path d={`M ${x + 34} ${iy + s * 0.2} C ${x + 47} ${iy + s * 0.2} ${x + 47} ${iy + s * 0.6} ${x + 36} ${iy + s * 0.62}`} fill="none" stroke={shade(CC_GLASS, 0.3)} strokeWidth={3} />
      {ring && <rect x={x - 3} y={iy - 3} width={52} height={s + 6} rx={9} fill="none" stroke={CC_AMBER} strokeWidth={3} />}
    </g>
  );
  let pic: any = null;
  if (kind === "lit") pic = jugMini(9, 1, false);
  else if (kind === "grp") pic = jugMini(9, 0.35, true);
  else if (kind === "col") pic = (
    <g>
      <rect x={8} y={iy} width={48} height={s} rx={7} fill="#FFFFFF" stroke={shade(C.rule, 0.3)} strokeWidth={2.5} />
      <line x1={26} y1={iy + 4} x2={26} y2={iy + s - 4} stroke={C.ink} strokeWidth={2.5} />
      <line x1={11} y1={iy + s * 0.68} x2={53} y2={iy + s * 0.68} stroke={C.ink} strokeWidth={2.5} />
      <rect x={11} y={iy + s * 0.74} width={12} height={s * 0.2} rx={3} fill={tint(CC_GREEN, 0.5)} />
      <rect x={29} y={iy + s * 0.74} width={24} height={s * 0.2} rx={3} fill={tint(CC_GREEN, 0.5)} />
    </g>
  );
  else pic = (
    <g>
      {[0, 1, 2].map((i) => item.small === "glass"
        ? <path key={i} d={`M ${8 + i * 16} ${iy + s * 0.3} L ${22 + i * 16} ${iy + s * 0.3} L ${20 + i * 16} ${iy + s} L ${10 + i * 16} ${iy + s} Z`} fill={CC_JUICE} fillOpacity={0.7} stroke={shade(CC_JUICE, 0.55)} strokeWidth={2} />
        : <path key={i} d={`M ${8 + i * 16} ${iy + s * 0.3} L ${22 + i * 16} ${iy + s * 0.3} L ${20 + i * 16} ${iy + s} L ${10 + i * 16} ${iy + s} Z`} fill="#F4C542" stroke="#9A7410" strokeWidth={2} />)}
    </g>
  );
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {pic}
      {fit1 || fit28 ? <text x={tx0} y={h / 2 + (fit1 ? 11 : 10)} fontSize={fit1 ? T.label : T.micro} fontWeight={700} fill={C.ink}>{one}</text>
        : lines.map((s2, i) => <text key={i} x={tx0} y={h / 2 + 10 + (i - (lines.length - 1) / 2) * 36} fontSize={T.micro} fontWeight={700} fill={C.ink}>{s2}</text>)}
    </g>
  );
}

function CapacityConverter(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b) */
      board: true,
      /* KEY ONLY (LAYOUT.md §1d, PATTERNS.md §16) */
      keyOnly: true,
      /* the wide keypad (PATTERNS.md 9g): every scene is laid out in x 64 to 964 */
      bigPad: true,
      /* the Next key (PATTERNS.md 9d) */
      nextKey: true,
      /* NAV DOTS (LAYOUT.md §1d) */
      navDots: true,
      /* the start page */
      StartArt, START_HOOK,
      }} />
  );
}

export default CapacityConverter;