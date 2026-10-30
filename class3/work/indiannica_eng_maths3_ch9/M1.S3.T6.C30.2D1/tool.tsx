/* ═══ M1.S3.T6.C30.2D1 · pour_it · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build: header, canvas, keys, bubble, Kiko, phase dots,
   toolApi, sounds, scoring and the summary are the runtime's. THE LESSON IS SILENT (r30) and keyOnly (the question lives
   only in the bubble). This file draws the working area only: a see-through 1 L measuring jug (every 100 mL mark, the
   quarter, half and three quarter marks), the containers (photo skins: cup, bottle, bucket, drum, packet; drawn in code:
   the measuring vessels, glasses, teacups, the pot, the pan) and the three bins of phase 4.
   The water level is a pure function of the millilitres poured (piLevelY): the same amount stands at the same height in
   every frame. Every pour is an act through api.act (the drawn hand), the water rising in steps of about 50 mL.
   MISS HIDES THE ANSWER (ch 9 strict): a correction replays the working and stops one step before the answer; what shows
   the answer carries data-reveals="answer" and is drawn only at the win; the jug scales carry data-scale.
   THE ANSWER IS GATED BY THE ACT (PATTERNS 19): one source of truth, `want`, drives api.lock.
   NO imports in this file; only the five host hooks.
   ONE CAPACITY PER OBJECT (every screen, every phase; a scaled copy of a photo is another object, with its own name and label):
     bottle (photo) 1 L = 1,000 mL · jug, the measuring jug (photo) 1 L · bucket (photo) 10 L · drum (photo) 50 L · pot (photo) 3 L
     cup (photo) 200 mL · teacup (the cup photo, smaller) 140 mL · juice packet (photo) 200 mL · milk carton (its own photo) 500 mL
     glass, a drinking glass (photo) 250 mL · the measuring vessels (the glass photo at four sizes) 50, 100, 200 and 500 mL
     the small measuring jug of phase 2 (the jug photo) marked to 200 mL every 20 mL
   A source poured only in part (the bottle filling the jug to a long mark in phase 3) still holds its own 1 L. */

const TOOL_ID = "pour_it";
const MEDIA_ID = "M1.S3.T6.C30.2D1";
const TOOL_NAME = "Pour It";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed before phase 1's teach lines only (not shown: phase 1 has guide steps) */
const OPENING = ["A glass jug, small vessels and a shelf of containers. Let us pour."];
/* the whole-tool line (r44: no longer shown; kept for the tool object's shape) */
const FINISH_LINE = "You poured, read the level at a mark, and sorted the containers against a litre.";
/* printed when the child opens Free play: everything it names is in the free branch of Work */
const FREE_LINE = "Free play: pour any container into the jug and tap the jug to empty it.";

/* THE START PAGE (r28): one question to wonder at, and the objects the lesson is about (no digits, no answer). */
const START_HOOK = "Cup, bottle or bucket: which holds most?";
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  const J = piJugAt(260, 290, { cap: 1000, step: 100, nums: [], long: [] }, 306);
  return (
    <g>
      <rect x={60} y={304} width={box.w - 120} height={12} rx={6} fill={PI_C.table} />
      <rect x={60} y={316} width={box.w - 120} height={4} rx={2} fill={PI_C.tableDark} opacity={0.35} />
      {piJug(J, 600, { tx, labels: {} })}
      <g transform="translate(640 306)">{piObj("cup", 150, false)}</g>
      {/* the 1 L bottle as tall as the 1 L jug (the owner: equal capacity, equal size) */}
      <g transform="translate(800 306)">{piObj("bottle", 290, false)}</g>
      <g transform="translate(1000 306)">{piObj("bucket", 210, false)}</g>
    </g>
  );
}

/* Hindi and Gujarati (PATTERNS §11): filled in the language pass, once the English is final and reviewed. */
const TR: any = {
  hi: {
    "Pour It": "इसे उँडेलो",
    "A glass jug, small vessels and a shelf of containers. Let us pour.": "काँच का एक जग, कुछ छोटे बर्तन और असली बर्तनों की एक शेल्फ। चलो\u00A0उँडेलें।",
    "You poured, read the level at a mark, and sorted the containers against a litre.": "तुमने पानी उँडेला, निशान पर स्तर पढ़ा और बर्तनों को एक लीटर से तुलना करके\u00A0छाँटा।",
    "Free play: pour any container into the jug and tap the jug to empty it.": "मुक्त खेल: कोई भी बर्तन जग में उँडेलो और जग छूकर उसे खाली\u00A0करो।",
    "Cup, bottle or bucket: which holds most?": "कप, बोतल या बाल्टी: किसमें सबसे ज़्यादा\u00A0आता है?",
    "Capacity: litres and millilitres": "धारिता: लीटर और मिलीलीटर",
    "Pour some water in. Is this a small amount or a large amount?": "थोड़ा पानी उँडेलो। यह कम मात्रा है या ज़्यादा\u00A0मात्रा?",
    "This jug holds 1 litre: tap the bottle to pour it in.": "इस जग में 1\u00A0लीटर आता है: बोतल को छुओ और उसे\u00A0उँडेलो।",
    "Tap the orange bottle.": "नारंगी बोतल को\u00A0छुओ।",
    "1 litre is 1,000 millilitres: tap the jug to empty it.": "1\u00A0लीटर में 1,000\u00A0मिलीलीटर होते हैं: जग को छुओ और उसे खाली\u00A0करो।",
    "Now tap the jug of water.": "अब पानी वाले जग को\u00A0छुओ।",
    "Small amounts are measured in millilitres and large amounts in litres.": "कम मात्रा मिलीलीटर में नापते हैं और ज़्यादा मात्रा लीटर\u00A0में।",
    "You learned: millilitres for small amounts, litres for large ones.": "तुमने सीखा: कम मात्रा मिलीलीटर में, ज़्यादा मात्रा लीटर\u00A0में।",
    "Tap the cup to pour it into the jug: is a cup measured in mL or L?": "कप को छुओ और जग में उँडेलो: कप को मिलीलीटर में नापते हैं या लीटर\u00A0में?",
    "A cup: mL or L?": "कप: मिलीलीटर या\u00A0लीटर?",
    "See how high the water from the cup came in the jug.": "देखो, कप का पानी जग में कितना ऊपर तक\u00A0आया।",
    "The cup filled only a little of the 1 litre jug.": "कप से 1\u00A0लीटर वाला जग थोड़ा ही\u00A0भरा।",
    "A little amount is measured in the smaller unit.": "थोड़ी मात्रा को छोटी इकाई में नापते\u00A0हैं।",
    "Yes, a cup holds little, so we use millilitres.": "हाँ, कप में कम पानी आता है, इसलिए हम मिलीलीटर से नापते\u00A0हैं।",
    "mL": "मिली",
    "L": "ली",
    "Pour the bucket into the jug, then tap the unit tag that fits a bucket.": "बाल्टी को जग में उँडेलो, फिर बाल्टी के लिए सही इकाई वाला टैग\u00A0छुओ।",
    "A bucket: tap mL or L": "बाल्टी: मिली टैग या ली टैग\u00A0छुओ",
    "Tap the bucket and watch the water.": "बाल्टी को छुओ और पानी को\u00A0देखो।",
    "One bucket holds more than a whole 1 litre jug.": "एक बाल्टी में 1\u00A0लीटर के पूरे जग से भी ज़्यादा आता\u00A0है।",
    "A big amount is measured in the bigger unit.": "ज़्यादा मात्रा को बड़ी इकाई में नापते\u00A0हैं।",
    "Yes, a bucket holds a lot, so we use litres.": "हाँ, बाल्टी में बहुत पानी आता है, इसलिए उसे लीटर में नापते\u00A0हैं।",
    "Pour the juice packet and the drum: which one is measured in mL?": "जूस का पैकेट और ड्रम उँडेलो: किसे मिलीलीटर में नापते\u00A0हैं?",
    "Which one in mL?": "कौन-सा मिलीलीटर\u00A0में?",
    "Pour each one again and watch the water in the jug.": "हर एक को फिर से उँडेलो और जग का पानी\u00A0देखो।",
    "One of them spilled over the jug and one did not fill it.": "एक का पानी जग से बाहर गिर गया और दूसरे से जग भरा ही\u00A0नहीं।",
    "The one that holds only a little uses the small unit.": "जिसमें थोड़ा पानी आता है, उसे छोटी इकाई में नापते\u00A0हैं।",
    "Packet": "पैकेट",
    "Drum": "ड्रम",
    "Yes, a juice packet is measured in millilitres and a drum in litres.": "हाँ, जूस के पैकेट को मिलीलीटर में और ड्रम को लीटर में नापते\u00A0हैं।",
    "Standard vessels: from 50 mL up to 1 L": "मानक बर्तन: 50 मिलीलीटर से 1 लीटर तक",
    "Pour the small vessels into the big jug. How many does it take to reach the top?": "छोटे बर्तनों को बड़े जग में\u00A0उँडेलो। ऊपर तक भरने में कितने लगते\u00A0हैं?",
    "Tap the 100 mL vessel to pour it into the jug.": "100\u00A0मिलीलीटर वाले बर्तन को छुओ और उसे जग में\u00A0उँडेलो।",
    "Tap the vessel marked 100 mL.": "100\u00A0मिलीलीटर वाला बर्तन\u00A0छुओ।",
    "Now pour the 200 mL vessel and watch the water rise.": "अब 200\u00A0मिलीलीटर वाले बर्तन को उँडेलो और पानी को ऊपर चढ़ते\u00A0देखो।",
    "Tap the middle vessel, marked 200 mL.": "बीच वाले बर्तन (200\u00A0मिलीलीटर) को\u00A0छुओ।",
    "Pour the 500 mL vessel and read the level at its mark.": "500\u00A0मिलीलीटर वाले बर्तन को उँडेलो और उसके निशान पर स्तर\u00A0पढ़ो।",
    "Tap the biggest vessel, marked 500 mL.": "सबसे बड़े बर्तन (500\u00A0मिलीलीटर) को\u00A0छुओ।",
    "Small vessels fill the 1 litre jug when their amounts add up to 1 litre.": "छोटे बर्तन मिलकर 1\u00A0लीटर बनें तो वे 1\u00A0लीटर का जग भर देते\u00A0हैं।",
    "You learned: small vessels fill 1 L when their amounts add up to 1 L.": "तुमने सीखा: छोटे बर्तनों की मात्रा जुड़कर 1\u00A0लीटर हो, तो 1\u00A0लीटर भर जाता\u00A0है।",
    "Pour 500 mL vessels into the jug until it is full: how many fill it?": "जग भर जाने तक 500\u00A0मिलीलीटर वाले बर्तन उँडेलो: कितने बर्तन से जग भरता\u00A0है?",
    "500 mL vessels in 1 L?": "1\u00A0लीटर में 500\u00A0मिलीलीटर के कितने\u00A0बर्तन?",
    "Pour again and count each vessel as it goes in.": "फिर से उँडेलो और हर बर्तन को जग में जाते समय\u00A0गिनो।",
    "Each vessel lifts the water by 500 mL; count up to the 1 L mark.": "हर बर्तन पानी को 500\u00A0मिलीलीटर ऊपर उठाता है; 1\u00A0लीटर के निशान तक\u00A0गिनो।",
    "Pour until the water touches the 1 L mark, then count the vessels you used.": "पानी 1\u00A0लीटर के निशान को छू ले, तब तक उँडेलो; फिर काम में लिए बर्तन\u00A0गिनो।",
    "Yes, 2 vessels of 500 mL fill the 1 litre jug.": "हाँ, 500\u00A0मिलीलीटर के 2\u00A0बर्तन से 1\u00A0लीटर का जग भरता\u00A0है।",
    "how many": "कितने",
    "vessels": "बर्तन",
    "Pour the full 1 L jug into 200 mL cups: how many cups does it fill?": "भरा हुआ 1\u00A0लीटर का जग 200\u00A0मिलीलीटर के कपों में उँडेलो: कितने कप\u00A0भरेंगे?",
    "200 mL cups from 1 L?": "1\u00A0लीटर से 200\u00A0मिलीलीटर के कितने\u00A0कप?",
    "Pour again and watch the water in the jug go down.": "फिर से उँडेलो और जग का पानी नीचे जाते\u00A0देखो।",
    "Each cup takes 200 mL out of the jug; keep going until it is empty.": "हर कप जग से 200\u00A0मिलीलीटर निकालता है; जग खाली होने तक करते\u00A0रहो।",
    "Count in 200s up to 1,000 mL and count the cups as you go.": "200\u00A0के हिसाब से 1,000\u00A0मिलीलीटर तक गिनो और साथ में कप भी\u00A0गिनो।",
    "Yes, 1 litre fills 5 cups of 200 mL.": "हाँ, 1\u00A0लीटर से 200\u00A0मिलीलीटर के 5\u00A0कप भरते\u00A0हैं।",
    "cups": "कप",
    "Pour the teacup into the small jug marked every 20 mL: how much is in it?": "चाय का कप छोटे जग में उँडेलो, जिसमें हर 20\u00A0मिलीलीटर पर निशान है: कितना पानी\u00A0है?",
    "Water in the jug?": "जग में कितना\u00A0पानी?",
    "Find the last number below the water, then count the marks up.": "पानी के नीचे की आखिरी संख्या ढूँढ़ो, फिर निशान गिनते हुए ऊपर\u00A0जाओ।",
    "Each small mark is 20 mL more than the mark below it.": "हर छोटा निशान अपने नीचे वाले निशान से 20\u00A0मिलीलीटर ज़्यादा\u00A0है।",
    "Start at 100 mL and count on by 20s up to the water.": "100\u00A0मिलीलीटर से शुरू करो और पानी तक 20\u00A0के हिसाब से आगे\u00A0गिनो।",
    "Yes, the water is at the 140 mL mark.": "हाँ, पानी 140\u00A0मिलीलीटर के निशान पर\u00A0है।",
    "water": "पानी",
    "Half a litre and a quarter of a litre": "आधा लीटर और चौथाई लीटर",
    "Pour to the middle mark. Which thing holds about as much?": "बीच वाले निशान तक उँडेलो। किस चीज़ में लगभग इतना आता\u00A0है?",
    "Tap the lowest long mark near the bottom.": "तल के पास वाले सबसे निचले लंबे निशान को\u00A0छुओ।",
    "It is the long line just above 200 mL.": "यह 200\u00A0मिलीलीटर के ठीक ऊपर वाली लंबी रेखा\u00A0है।",
    "The middle long mark shows half a litre and the lowest shows a quarter.": "बीच वाला लंबा निशान आधा लीटर दिखाता है और सबसे नीचे वाला चौथाई\u00A0लीटर।",
    "You learned: half a litre is 500 mL and a quarter of a litre is 250 mL.": "तुमने सीखा: आधा लीटर 500\u00A0मिलीलीटर और चौथाई लीटर 250\u00A0मिलीलीटर होता\u00A0है।",
    "Tap the middle long mark to fill the jug to half a litre: how many mL is that?": "बीच के लंबे निशान को छुओ और जग में आधा लीटर भरो: कितने मिलीलीटर\u00A0हुए?",
    "Half a litre in mL?": "आधा लीटर कितने\u00A0मिलीलीटर?",
    "Look at the scale beside the middle long mark.": "बीच वाले लंबे निशान के पास की संख्याएँ\u00A0देखो।",
    "The middle mark is half way from 0 to 1,000 mL.": "बीच का निशान 0\u00A0से 1,000\u00A0मिलीलीटर के ठीक आधे रास्ते पर\u00A0है।",
    "The middle mark is half way from 400 mL to 600 mL.": "बीच का निशान 400\u00A0मिलीलीटर और 600\u00A0मिलीलीटर के निशानों के ठीक बीच में\u00A0है।",
    "Yes, half a litre is 500 millilitres.": "हाँ, आधा लीटर 500\u00A0मिलीलीटर होता\u00A0है।",
    "half litre": "आधा लीटर",
    "Pour the milk carton into the jug: is it about a quarter, a half or 1 litre?": "दूध का कार्टन जग में उँडेलो: क्या यह लगभग चौथाई लीटर, आधा लीटर या 1\u00A0लीटर\u00A0है?",
    "About how much?": "लगभग कितना?",
    "Pour the rest of the milk and look at the long marks.": "दूध के कार्टन का बाकी दूध उँडेलो और लंबे निशान\u00A0देखो।",
    "The quarter mark is low; the 1 litre mark is at the top.": "चौथाई लीटर का निशान नीचे है और 1\u00A0लीटर का निशान ऊपर\u00A0है।",
    "Is the water near the bottom, the middle or the top?": "जग में पानी नीचे के पास है, बीच में है या ऊपर\u00A0है?",
    "Yes, the milk carton held about half a litre.": "हाँ, दूध के कार्टन में लगभग आधा लीटर\u00A0आया।",
    "quarter litre": "चौथाई लीटर",
    "1 litre": "1 लीटर",
    "Pour the quarter litre glasses into the jug: how many fill 1 litre?": "चौथाई लीटर वाले गिलास जग में उँडेलो: कितने गिलास से 1\u00A0लीटर भरता\u00A0है?",
    "Glasses in 1 L?": "1\u00A0लीटर में कितने\u00A0गिलास?",
    "Pour the glasses again and count each one.": "गिलास फिर से उँडेलो और हर एक को\u00A0गिनो।",
    "Each glass lifts the water up to the next long mark.": "हर गिलास पानी को अगले लंबे निशान तक ऊपर उठाता\u00A0है।",
    "Count the quarters: 1 quarter, 2 quarters, and on up to 1 litre.": "चौथाई गिनो: 1\u00A0चौथाई, 2\u00A0चौथाई, और ऐसे ही 1\u00A0लीटर\u00A0तक।",
    "Yes, 4 quarter litre glasses fill 1 litre.": "हाँ, चौथाई लीटर के 4\u00A0गिलास से 1\u00A0लीटर भरता\u00A0है।",
    "glasses": "गिलास",
    "More than or less than one litre": "एक लीटर से ज़्यादा या कम",
    "Does this hold more than the jug, or less? Drag it to its side.": "इसमें जग से ज़्यादा आता है या कम? इसे इसकी तरफ़\u00A0खींचो।",
    "Tap the orange pot to pick it up: it holds 3 L.": "नारंगी पतीले को छुओ और उठाओ: उसमें 3\u00A0लीटर आता\u00A0है।",
    "Tap the orange pot.": "नारंगी पतीले को\u00A0छुओ।",
    "3 L is more than 1 L, so tap the bin More than 1 L.": "3\u00A0लीटर, 1\u00A0लीटर से ज़्यादा है, इसलिए 1\u00A0ली से ज़्यादा लिखे डिब्बे को\u00A0छुओ।",
    "Tap the bin on the right.": "दाईं ओर वाले डिब्बे को\u00A0छुओ।",
    "A container whose label is more than 1 L (1,000 mL) holds more than 1 litre.": "1\u00A0लीटर से ज़्यादा लिखे बर्तन में 1\u00A0लीटर से ज़्यादा पानी आता\u00A0है।",
    "You learned: compare each label with 1 L, which is the same as 1,000 mL.": "तुमने सीखा: लेबल की तुलना 1\u00A0लीटर यानी 1,000\u00A0मिलीलीटर से\u00A0करो।",
    "Put the drum and the cup in their bins: which one holds more than 1 L?": "ड्रम और कप को उनके डिब्बों में रखो: किसमें 1\u00A0लीटर से ज़्यादा आता\u00A0है?",
    "Sort: drum, cup": "छाँटो: ड्रम, कप",
    "Read each label and compare it with 1 L.": "हर लेबल पढ़ो और उसकी तुलना 1\u00A0लीटर से\u00A0करो।",
    "A litre is a big amount; a few hundred millilitres is much less.": "लीटर बड़ी मात्रा है; कुछ सौ मिलीलीटर उससे बहुत कम\u00A0है।",
    "Over 1 L goes in More, under 1 L goes in Less.": "1\u00A0लीटर से बड़ा लेबल ज़्यादा वाले डिब्बे में जाता है, छोटा कम वाले\u00A0में।",
    "Yes, the drum holds more than 1 L and the cup holds less.": "हाँ, ड्रम में 1\u00A0लीटर से ज़्यादा आता है और कप में\u00A0कम।",
    "Sort the bucket, the jug, the bottle and the juice packet into the three bins.": "बाल्टी, जग, बोतल और जूस के पैकेट को तीन डिब्बों में\u00A0छाँटो।",
    "Sort all four": "चारों को छाँटो",
    "Check each label again before you place it.": "रखने से पहले हर लेबल फिर से\u00A0देखो।",
    "Change 1 L into millilitres, then compare each label.": "1\u00A0लीटर को मिलीलीटर में बदलो, फिर हर लेबल की तुलना\u00A0करो।",
    "A label in mL is compared with 1,000 mL.": "मिलीलीटर वाले लेबल की तुलना 1,000\u00A0मिलीलीटर से की जाती\u00A0है।",
    "Yes, the jug and the 1,000 mL bottle both hold exactly 1 L.": "हाँ, जग और 1,000\u00A0मिलीलीटर की बोतल, दोनों में ठीक 1\u00A0लीटर आता\u00A0है।",
    "Each teacup holds 140 mL: how many teacups fill the jug up to the 560 mL line?": "चाय का एक कप 140\u00A0मिलीलीटर का है: जग में 560\u00A0मिलीलीटर की रेखा तक कितने\u00A0कप?",
    "Teacups to the line?": "रेखा तक कितने चाय के\u00A0कप?",
    "Pour the teacups in one by one and count them.": "चाय के कप एक-एक करके उँडेलो और उन्हें\u00A0गिनो।",
    "Each teacup lifts the water by 140 mL.": "हर चाय का कप पानी को 140\u00A0मिलीलीटर ऊपर उठाता\u00A0है।",
    "Count in 140s until you reach 560 mL.": "140\u00A0के हिसाब से गिनो, जब तक 560\u00A0मिलीलीटर न आ\u00A0जाए।",
    "Yes, 4 teacups of 140 mL fill the jug to the 560 mL line.": "हाँ, 140\u00A0मिलीलीटर के 4\u00A0चाय के कप से जग 560\u00A0मिलीलीटर तक भरता\u00A0है।",
    "teacups": "चाय के कप",
    "That one is empty now: pour a full one.": "वह अब खाली है: कोई भरा हुआ\u00A0उँडेलो।",
    "The water is at the line.": "पानी अब रेखा तक आ गया\u00A0है।",
    "The jug is full now.": "जग अब भर गया\u00A0है।",
    "That cup is full: tap an empty cup.": "वह कप भरा है: कोई खाली कप\u00A0छुओ।",
    "The jug is empty now.": "जग अब खाली\u00A0है।",
    "The water is in: now read the level.": "पानी जग में आ गया: अब स्तर\u00A0पढ़ो।",
    "The milk carton is empty.": "दूध का कार्टन अब खाली\u00A0है।",
    "Now tap the middle mark.": "अब बीच वाले लंबे निशान को\u00A0छुओ।",
    "Pour the bucket into the jug first.": "पहले बाल्टी को जग में\u00A0उँडेलो।",
    "Tap a container first, then its bin.": "पहले बर्तन को छुओ, फिर उसके डिब्बे\u00A0को।",
    "Now tap mL or L.": "अब मिली या ली को\u00A0छुओ।",
    "Tap mL or L, then Enter.": "मिली या ली छुओ, फिर दर्ज करें\u00A0दबाओ।",
    "Put every container in a bin first.": "पहले हर बर्तन को डिब्बे में\u00A0रखो।",
    "1 L =": "1 ली =",
    "1,000 mL": "1,000 मिली",
    "Less than 1 L": "1 ली से कम",
    "Equal to 1 L": "1 ली के बराबर",
    "More than 1 L": "1 ली से ज़्यादा",
    "Answer": "उत्तर",
    "juice packet": "जूस का पैकेट",
    "packet": "पैकेट",
    "about half a litre": "लगभग आधा लीटर",
    "three quarters": "पौन लीटर",
    "sorted": "छाँटे गए",
    "each vessel": "हर बर्तन",
    "each cup": "हर कप",
    "each glass": "हर गिलास",
    "each teacup": "हर चाय का कप",
    "First, pour the cup in.": "पहले कप को जग में\u00A0उँडेलो।",
    "Tap the cup to pour it.": "पहले कप को छुओ ताकि वह उँडेला\u00A0जाए।",
    "The cup must be poured before you answer.": "उत्तर देने से पहले कप उँडेलना\u00A0है।",
    "Pour the juice packet and the drum first.": "पहले जूस का पैकेट और ड्रम\u00A0उँडेलो।",
    "First pour both containers into the jug.": "पहले दोनों बर्तन जग में\u00A0उँडेलो।",
    "Both must be poured before you answer.": "उत्तर देने से पहले दोनों को उँडेलना\u00A0है।",
    "Pour vessels until the jug is full first.": "पहले जग भरने तक बर्तन\u00A0उँडेलो।",
    "First fill the jug with the vessels.": "पहले बर्तनों से जग\u00A0भरो।",
    "The jug must be full before you answer.": "उत्तर देने से पहले जग भरा होना\u00A0चाहिए।",
    "Pour the jug into the cups until it is empty first.": "पहले जग खाली होने तक कपों में\u00A0उँडेलो।",
    "First empty the jug into the cups.": "पहले जग को कपों में खाली\u00A0करो।",
    "The jug must be empty before you answer.": "उत्तर देने से पहले जग खाली होना\u00A0चाहिए।",
    "Pour the teacup into the small jug first.": "पहले चाय का कप छोटे जग में\u00A0उँडेलो।",
    "First tap the teacup to pour it.": "पहले चाय के कप को छुओ ताकि वह उँडेला\u00A0जाए।",
    "The teacup must be poured before you answer.": "उत्तर देने से पहले चाय का कप उँडेलना\u00A0है।",
    "Tap the middle mark first.": "पहले बीच वाले लंबे निशान को\u00A0छुओ।",
    "First fill the jug to the middle long mark.": "पहले जग को बीच वाले लंबे निशान तक\u00A0भरो।",
    "Fill up to the middle mark, then answer.": "उत्तर देने से पहले पानी बीच वाले निशान तक आना\u00A0चाहिए।",
    "Pour the milk carton into the jug first.": "पहले दूध का कार्टन जग में\u00A0उँडेलो।",
    "First tap the milk carton to pour it.": "पहले दूध के कार्टन को छुओ ताकि वह उँडेला\u00A0जाए।",
    "The milk carton must be poured before you answer.": "उत्तर देने से पहले दूध का कार्टन उँडेलना\u00A0है।",
    "Pour glasses until the jug is full first.": "पहले जग भरने तक गिलास\u00A0उँडेलो।",
    "First fill the jug with the glasses.": "पहले गिलासों से जग\u00A0भरो।",
    "The jug must be full of water before you answer.": "उत्तर देने से पहले जग पानी से भरा होना\u00A0चाहिए।",
    "Pour teacups up to the 560 mL line first.": "पहले 560\u00A0मिलीलीटर की रेखा तक चाय के कप\u00A0उँडेलो।",
    "First fill the jug up to the line.": "पहले जग को रेखा तक\u00A0भरो।",
    "The water must reach the line before you answer.": "उत्तर देने से पहले पानी रेखा तक आना\u00A0चाहिए।",
    "Now tap the Answer key.": "अब उत्तर कुंजी को\u00A0छुओ।",
    "Type your answer, then press Enter.": "अपना उत्तर लिखो, फिर दर्ज करें\u00A0दबाओ।",
    "Choose your answer.": "अपना उत्तर\u00A0चुनो।",
    "This one is poured already: pick a full one.": "यह तो उँडेला जा चुका है: कोई भरा हुआ\u00A0चुनो।",
    "Choose one that still has water in it.": "ऐसा चुनो जिसमें अभी पानी\u00A0हो।",
    "Stop: the jug is full.": "अब और नहीं आएगा: जग भर गया\u00A0है।",
    "The jug cannot hold any more water.": "जग में अब और पानी नहीं आ\u00A0सकता।",
    "The water has reached the 560 mL line.": "पानी 560\u00A0मिलीलीटर की रेखा तक पहुँच गया\u00A0है।",
    "No more is needed: the water is at the line.": "अब और नहीं चाहिए: पानी रेखा पर\u00A0है।",
    "This cup has water already: choose an empty one.": "इस कप में पानी आ चुका है: कोई खाली कप\u00A0चुनो।",
    "Pick an empty cup.": "ऐसा कप चुनो जो अभी खाली\u00A0हो।",
    "There is no water left in the jug.": "जग में अब पानी नहीं\u00A0बचा।",
    "The jug has nothing more to pour.": "जग में उँडेलने को अब कुछ नहीं\u00A0है।",
    "All the water is poured: read the mark.": "सारा पानी उँडेल दिया: अब निशान\u00A0पढ़ो।",
    "Now look at the marks and read the water.": "अब निशान देखो और पानी का स्तर\u00A0पढ़ो।",
    "All the milk is already in the jug.": "सारा दूध अब जग में\u00A0है।",
    "Nothing is left in the milk carton.": "दूध के कार्टन में कुछ नहीं\u00A0बचा।",
    "The question asks for the middle long mark.": "सवाल बीच वाले लंबे निशान के बारे में\u00A0है।",
    "Find the long mark half way up and tap it.": "आधी ऊँचाई वाला लंबा निशान ढूँढो और\u00A0छुओ।",
    "First pour the bucket, then choose a tag.": "पहले बाल्टी उँडेलो, फिर कोई टैग\u00A0चुनो।",
    "The bucket must be poured before a tag.": "टैग से पहले बाल्टी उँडेलनी\u00A0है।",
    "Pick up a container before you tap a bin.": "डिब्बे को छूने से पहले कोई बर्तन\u00A0उठाओ।",
    "Choose a container, then the bin it goes in.": "कोई बर्तन चुनो, फिर उसका\u00A0डिब्बा।",
    "Choose one unit tag first.": "दोनों इकाई टैग में से एक\u00A0चुनो।",
    "A unit tag must be chosen before Enter.": "दर्ज करने से पहले एक इकाई टैग चुनना\u00A0है।",
    "Some containers are still on the shelf.": "कुछ बर्तन अभी शेल्फ पर\u00A0हैं।",
    "Every container needs a bin before Enter.": "दर्ज करने से पहले हर बर्तन को डिब्बा\u00A0चाहिए।",
    "vessel": "बर्तन",
    "cup": "कप",
    "glass": "गिलास",
    "teacup": "चाय का कप",
    "bottle": "बोतल",
    "bucket": "बाल्टी",
    "drum": "ड्रम",
    "milk carton": "दूध का कार्टन",
    "orange pot": "नारंगी पतीला",
    "jug": "जग",
    "50 mL vessel": "50 मिली का बर्तन",
    "100 mL vessel": "100 मिली का बर्तन",
    "200 mL vessel": "200 मिली का बर्तन",
    "500 mL vessel": "500 मिली का बर्तन",
  },
  gu: {
    "Pour It": "તેને રેડો",
    "A glass jug, small vessels and a shelf of containers. Let us pour.": "કાચનો એક જગ, થોડા નાના વાસણ અને અસલી વાસણોની એક છાજલી. ચાલો\u00A0રેડીએ.",
    "You poured, read the level at a mark, and sorted the containers against a litre.": "તમે પાણી રેડ્યું, નિશાન પર સપાટી વાંચી અને વાસણોને એક લીટર સાથે સરખાવીને જુદા\u00A0પાડ્યા.",
    "Free play: pour any container into the jug and tap the jug to empty it.": "મુક્ત રમત: કોઈ પણ વાસણ જગમાં રેડો અને જગને સ્પર્શ કરી ખાલી\u00A0કરો.",
    "Cup, bottle or bucket: which holds most?": "કપ, બોટલ કે ડોલ: કોનામાં સૌથી\u00A0વધુ સમાય?",
    "Capacity: litres and millilitres": "ક્ષમતા: લીટર અને મિલીલીટર",
    "Pour some water in. Is this a small amount or a large amount?": "થોડું પાણી રેડો. આ ઓછી માત્રા છે કે વધુ\u00A0માત્રા?",
    "This jug holds 1 litre: tap the bottle to pour it in.": "આ જગમાં 1\u00A0લીટર સમાય છે: બોટલને સ્પર્શ કરો અને તેને\u00A0રેડો.",
    "Tap the orange bottle.": "નારંગી બોટલને સ્પર્શ\u00A0કરો.",
    "1 litre is 1,000 millilitres: tap the jug to empty it.": "1\u00A0લીટરમાં 1,000\u00A0મિલીલીટર હોય છે: જગને સ્પર્શ કરો અને તેને ખાલી\u00A0કરો.",
    "Now tap the jug of water.": "હવે પાણીવાળા જગને સ્પર્શ\u00A0કરો.",
    "Small amounts are measured in millilitres and large amounts in litres.": "ઓછી માત્રાને મિલીલીટરમાં અને વધુ માત્રાને લીટરમાં માપીએ\u00A0છીએ.",
    "You learned: millilitres for small amounts, litres for large ones.": "તમે શીખ્યા: ઓછી માત્રા મિલીલીટરમાં, વધુ માત્રા\u00A0લીટરમાં.",
    "Tap the cup to pour it into the jug: is a cup measured in mL or L?": "કપને સ્પર્શ કરી જગમાં રેડો: કપ મિલીલીટરમાં મપાય કે\u00A0લીટરમાં?",
    "A cup: mL or L?": "કપ: મિલીલીટર કે\u00A0લીટર?",
    "See how high the water from the cup came in the jug.": "જુઓ, કપનું પાણી જગમાં કેટલું ઉપર સુધી\u00A0આવ્યું.",
    "The cup filled only a little of the 1 litre jug.": "કપથી 1\u00A0લીટરનો જગ થોડો જ\u00A0ભરાયો.",
    "A little amount is measured in the smaller unit.": "થોડી માત્રાને નાના એકમમાં માપીએ\u00A0છીએ.",
    "Yes, a cup holds little, so we use millilitres.": "હા, કપમાં ઓછું સમાય છે, તેથી આપણે મિલીલીટર વાપરીએ\u00A0છીએ.",
    "mL": "મિલી",
    "L": "લી",
    "Pour the bucket into the jug, then tap the unit tag that fits a bucket.": "ડોલને જગમાં રેડો, પછી ડોલ માટે સાચા એકમવાળો ટેગ સ્પર્શ\u00A0કરો.",
    "A bucket: tap mL or L": "ડોલ: મિલી ટેગ કે લી ટેગ સ્પર્શ કરો",
    "Tap the bucket and watch the water.": "ડોલને સ્પર્શ કરો અને પાણીને\u00A0જુઓ.",
    "One bucket holds more than a whole 1 litre jug.": "એક ડોલમાં 1\u00A0લીટરના આખા જગ કરતાં પણ વધુ સમાય\u00A0છે.",
    "A big amount is measured in the bigger unit.": "વધુ માત્રાને મોટા એકમમાં માપીએ\u00A0છીએ.",
    "Yes, a bucket holds a lot, so we use litres.": "હા, ડોલમાં ઘણું પાણી સમાય છે, તેથી તેને લીટરમાં માપીએ\u00A0છીએ.",
    "Pour the juice packet and the drum: which one is measured in mL?": "જ્યૂસનું પૅકેટ અને ડ્રમ રેડો: કોને મિલીલીટરમાં\u00A0માપીએ?",
    "Which one in mL?": "કયું મિલીલીટરમાં?",
    "Pour each one again and watch the water in the jug.": "દરેકને ફરીથી રેડો અને જગનું પાણી\u00A0જુઓ.",
    "One of them spilled over the jug and one did not fill it.": "એકનું પાણી જગની બહાર ઢોળાયું અને બીજાથી જગ ભરાયો જ\u00A0નહીં.",
    "The one that holds only a little uses the small unit.": "જેમાં થોડું પાણી સમાય તેને નાના એકમમાં માપીએ\u00A0છીએ.",
    "Packet": "પૅકેટ",
    "Drum": "ડ્રમ",
    "Yes, a juice packet is measured in millilitres and a drum in litres.": "હા, જ્યૂસના પૅકેટને મિલીલીટરમાં અને ડ્રમને લીટરમાં માપીએ\u00A0છીએ.",
    "Standard vessels: from 50 mL up to 1 L": "પ્રમાણભૂત વાસણ: 50 મિલીલીટરથી 1 લીટર સુધી",
    "Pour the small vessels into the big jug. How many does it take to reach the top?": "નાના વાસણો મોટા જગમાં રેડો. ઉપર સુધી ભરવા કેટલા\u00A0જોઈએ?",
    "Tap the 100 mL vessel to pour it into the jug.": "100\u00A0મિલીલીટરના વાસણને સ્પર્શ કરો અને તેને જગમાં\u00A0રેડો.",
    "Tap the vessel marked 100 mL.": "100\u00A0મિલીલીટરવાળા વાસણને સ્પર્શ\u00A0કરો.",
    "Now pour the 200 mL vessel and watch the water rise.": "હવે 200\u00A0મિલીલીટરનું વાસણ રેડો અને પાણીને ઉપર ચઢતું\u00A0જુઓ.",
    "Tap the middle vessel, marked 200 mL.": "વચ્ચેના વાસણ (200\u00A0મિલીલીટર)ને સ્પર્શ\u00A0કરો.",
    "Pour the 500 mL vessel and read the level at its mark.": "500\u00A0મિલીલીટરનું વાસણ રેડો અને તેના નિશાન પર સપાટી\u00A0વાંચો.",
    "Tap the biggest vessel, marked 500 mL.": "સૌથી મોટા વાસણ (500\u00A0મિલીલીટર)ને સ્પર્શ\u00A0કરો.",
    "Small vessels fill the 1 litre jug when their amounts add up to 1 litre.": "નાના વાસણોનું પાણી ભેગું કરતાં 1\u00A0લીટર થાય, તો 1\u00A0લીટરનો જગ ભરાય\u00A0છે.",
    "You learned: small vessels fill 1 L when their amounts add up to 1 L.": "તમે શીખ્યા: નાના વાસણોની માત્રા ભેગી થઈ 1\u00A0લીટર થાય તો 1\u00A0લીટર ભરાય\u00A0છે.",
    "Pour 500 mL vessels into the jug until it is full: how many fill it?": "જગ ભરાય ત્યાં સુધી 500\u00A0મિલીલીટરના વાસણ રેડો: કેટલા વાસણથી જગ\u00A0ભરાય?",
    "500 mL vessels in 1 L?": "1\u00A0લીટરમાં 500\u00A0મિલીલીટરના કેટલા\u00A0વાસણ?",
    "Pour again and count each vessel as it goes in.": "ફરીથી રેડો અને દરેક વાસણ જગમાં જાય ત્યારે\u00A0ગણો.",
    "Each vessel lifts the water by 500 mL; count up to the 1 L mark.": "દરેક વાસણ પાણીને 500\u00A0મિલીલીટર ઉપર ચઢાવે છે; 1\u00A0લીટરના નિશાન સુધી\u00A0ગણો.",
    "Pour until the water touches the 1 L mark, then count the vessels you used.": "પાણી 1\u00A0લીટરના નિશાનને પહોંચે ત્યાં સુધી રેડો, પછી વાપરેલા વાસણ\u00A0ગણો.",
    "Yes, 2 vessels of 500 mL fill the 1 litre jug.": "હા, 500\u00A0મિલીલીટરના 2\u00A0વાસણથી 1\u00A0લીટરનો જગ ભરાય\u00A0છે.",
    "how many": "કેટલા",
    "vessels": "વાસણ",
    "Pour the full 1 L jug into 200 mL cups: how many cups does it fill?": "ભરેલો 1\u00A0લીટરનો જગ 200\u00A0મિલીલીટરના કપમાં રેડો: કેટલા કપ\u00A0ભરાશે?",
    "200 mL cups from 1 L?": "1\u00A0લીટરમાંથી 200\u00A0મિલીલીટરના કેટલા\u00A0કપ?",
    "Pour again and watch the water in the jug go down.": "ફરીથી રેડો અને જગનું પાણી નીચે જતું\u00A0જુઓ.",
    "Each cup takes 200 mL out of the jug; keep going until it is empty.": "દરેક કપ જગમાંથી 200\u00A0મિલીલીટર પાણી લે છે; જગ ખાલી થાય ત્યાં સુધી ચાલુ\u00A0રાખો.",
    "Count in 200s up to 1,000 mL and count the cups as you go.": "200\u00A0ના હિસાબે 1,000\u00A0મિલીલીટર સુધી ગણો અને સાથે કપ પણ\u00A0ગણો.",
    "Yes, 1 litre fills 5 cups of 200 mL.": "હા, 1\u00A0લીટરથી 200\u00A0મિલીલીટરના 5\u00A0કપ ભરાય\u00A0છે.",
    "cups": "કપ",
    "Pour the teacup into the small jug marked every 20 mL: how much is in it?": "ચાનો કપ નાના જગમાં રેડો, જેમાં દર 20\u00A0મિલીલીટરે નિશાન છે: કેટલું પાણી\u00A0છે?",
    "Water in the jug?": "જગમાં કેટલું\u00A0પાણી?",
    "Find the last number below the water, then count the marks up.": "પાણીની નીચેનો છેલ્લો આંકડો શોધો, પછી નિશાન ગણતાં ઉપર\u00A0જાઓ.",
    "Each small mark is 20 mL more than the mark below it.": "દરેક નાનું નિશાન તેની નીચેના નિશાન કરતાં 20\u00A0મિલીલીટર વધુ\u00A0છે.",
    "Start at 100 mL and count on by 20s up to the water.": "100\u00A0મિલીલીટરથી શરૂ કરો અને પાણી સુધી 20\u00A0ના હિસાબે આગળ\u00A0ગણો.",
    "Yes, the water is at the 140 mL mark.": "હા, પાણી 140\u00A0મિલીલીટરના નિશાન પર\u00A0છે.",
    "water": "પાણી",
    "Half a litre and a quarter of a litre": "અડધો લીટર અને પા લીટર",
    "Pour to the middle mark. Which thing holds about as much?": "વચ્ચેના નિશાન સુધી રેડો. કઈ વસ્તુમાં લગભગ આટલું સમાય\u00A0છે?",
    "Tap the lowest long mark near the bottom.": "તળિયા પાસેના સૌથી નીચેના લાંબા નિશાનને સ્પર્શ\u00A0કરો.",
    "It is the long line just above 200 mL.": "તે 200\u00A0મિલીલીટરની બરાબર ઉપરની લાંબી રેખા\u00A0છે.",
    "The middle long mark shows half a litre and the lowest shows a quarter.": "વચ્ચેનું લાંબું નિશાન અડધો લીટર બતાવે છે અને સૌથી નીચેનું પા\u00A0લીટર.",
    "You learned: half a litre is 500 mL and a quarter of a litre is 250 mL.": "તમે શીખ્યા: અડધો લીટર 500\u00A0મિલીલીટર અને પા લીટર 250\u00A0મિલીલીટર\u00A0થાય.",
    "Tap the middle long mark to fill the jug to half a litre: how many mL is that?": "વચ્ચેના લાંબા નિશાનને સ્પર્શ કરો અને જગને અડધો લીટર ભરો: એ કેટલા મિલીલીટર\u00A0થાય?",
    "Half a litre in mL?": "અડધો લીટર કેટલા\u00A0મિલીલીટર?",
    "Look at the scale beside the middle long mark.": "વચ્ચેના લાંબા નિશાન પાસેના આંક\u00A0જુઓ.",
    "The middle mark is half way from 0 to 1,000 mL.": "વચ્ચેનું નિશાન 0\u00A0થી 1,000\u00A0મિલીલીટરના બરાબર અડધે રસ્તે\u00A0છે.",
    "The middle mark is half way from 400 mL to 600 mL.": "વચ્ચેનું નિશાન 400\u00A0મિલીલીટર અને 600\u00A0મિલીલીટરના નિશાનની બરાબર વચ્ચે\u00A0છે.",
    "Yes, half a litre is 500 millilitres.": "હા, અડધો લીટર 500\u00A0મિલીલીટર\u00A0થાય\u00A0છે.",
    "half litre": "અડધો લીટર",
    "Pour the milk carton into the jug: is it about a quarter, a half or 1 litre?": "દૂધનું કાર્ટન જગમાં રેડો: શું તે લગભગ પા લીટર, અડધો લીટર કે 1\u00A0લીટર\u00A0છે?",
    "About how much?": "લગભગ કેટલું?",
    "Pour the rest of the milk and look at the long marks.": "દૂધના કાર્ટનનું બાકીનું દૂધ રેડો અને લાંબા નિશાન\u00A0જુઓ.",
    "The quarter mark is low; the 1 litre mark is at the top.": "પા લીટરનું નિશાન નીચે છે અને 1\u00A0લીટરનું નિશાન ઉપર\u00A0છે.",
    "Is the water near the bottom, the middle or the top?": "જગમાં પાણી નીચેની પાસે છે, વચ્ચે છે કે ઉપર\u00A0છે?",
    "Yes, the milk carton held about half a litre.": "હા, દૂધના કાર્ટનમાં લગભગ અડધો લીટર\u00A0હતું.",
    "quarter litre": "પા લીટર",
    "1 litre": "1 લીટર",
    "Pour the quarter litre glasses into the jug: how many fill 1 litre?": "પા લીટરના ગ્લાસ જગમાં રેડો: 1\u00A0લીટર ભરવા કેટલા ગ્લાસ\u00A0જોઈએ?",
    "Glasses in 1 L?": "1\u00A0લીટરમાં કેટલા\u00A0ગ્લાસ?",
    "Pour the glasses again and count each one.": "ગ્લાસ ફરીથી રેડો અને દરેકને\u00A0ગણો.",
    "Each glass lifts the water up to the next long mark.": "દરેક ગ્લાસ પાણીને આગળના લાંબા નિશાન સુધી ચઢાવે\u00A0છે.",
    "Count the quarters: 1 quarter, 2 quarters, and on up to 1 litre.": "પા લીટર ગણો: પા, અડધો, પોણો,\u00A01\u00A0લીટર.",
    "Yes, 4 quarter litre glasses fill 1 litre.": "હા, પા લીટરના 4\u00A0ગ્લાસથી 1\u00A0લીટર ભરાય\u00A0છે.",
    "glasses": "ગ્લાસ",
    "More than or less than one litre": "એક લીટરથી વધુ કે ઓછું",
    "Does this hold more than the jug, or less? Drag it to its side.": "આમાં જગ કરતાં વધુ સમાય છે કે\u00A0ઓછું? તેને તેની બાજુ\u00A0ખેંચો.",
    "Tap the orange pot to pick it up: it holds 3 L.": "નારંગી તપેલાને સ્પર્શ કરી ઉપાડો: તેમાં 3\u00A0લીટર સમાય\u00A0છે.",
    "Tap the orange pot.": "નારંગી તપેલાને સ્પર્શ\u00A0કરો.",
    "3 L is more than 1 L, so tap the bin More than 1 L.": "3\u00A0લીટર, 1\u00A0લીટરથી વધુ છે, તેથી 1\u00A0લીથી વધુ લખેલા ડબ્બાને સ્પર્શ\u00A0કરો.",
    "Tap the bin on the right.": "જમણી બાજુના ડબ્બાને સ્પર્શ\u00A0કરો.",
    "A container whose label is more than 1 L (1,000 mL) holds more than 1 litre.": "1\u00A0લીટરથી વધુ લખેલા વાસણમાં 1\u00A0લીટરથી વધુ પાણી સમાય\u00A0છે.",
    "You learned: compare each label with 1 L, which is the same as 1,000 mL.": "તમે શીખ્યા: લેબલને 1\u00A0લીટર એટલે કે 1,000\u00A0મિલીલીટર સાથે\u00A0સરખાવો.",
    "Put the drum and the cup in their bins: which one holds more than 1 L?": "ડ્રમ અને કપને તેમના ડબ્બામાં મૂકો: કોનામાં 1\u00A0લીટરથી વધુ સમાય\u00A0છે?",
    "Sort: drum, cup": "જુદા પાડો: ડ્રમ, કપ",
    "Read each label and compare it with 1 L.": "દરેક લેબલ વાંચો અને તેને 1\u00A0લીટર સાથે\u00A0સરખાવો.",
    "A litre is a big amount; a few hundred millilitres is much less.": "લીટર મોટી માત્રા છે; થોડા સો મિલીલીટર તેનાથી ઘણા ઓછા\u00A0છે.",
    "Over 1 L goes in More, under 1 L goes in Less.": "1\u00A0લીટરથી મોટું લેબલ વધુવાળા ડબ્બામાં જાય, નાનું ઓછાવાળા\u00A0ડબ્બામાં.",
    "Yes, the drum holds more than 1 L and the cup holds less.": "હા, ડ્રમમાં 1\u00A0લીટરથી વધુ સમાય છે અને કપમાં\u00A0ઓછું.",
    "Sort the bucket, the jug, the bottle and the juice packet into the three bins.": "ડોલ, જગ, બોટલ અને જ્યૂસના પૅકેટને ત્રણ ડબ્બામાં જુદા\u00A0પાડો.",
    "Sort all four": "ચારેયને જુદા પાડો",
    "Check each label again before you place it.": "મૂકતા પહેલાં દરેક લેબલ ફરીથી\u00A0જુઓ.",
    "Change 1 L into millilitres, then compare each label.": "1\u00A0લીટરને મિલીલીટરમાં બદલો, પછી દરેક લેબલને\u00A0સરખાવો.",
    "A label in mL is compared with 1,000 mL.": "મિલીલીટરવાળા લેબલને 1,000\u00A0મિલીલીટર સાથે સરખાવાય\u00A0છે.",
    "Yes, the jug and the 1,000 mL bottle both hold exactly 1 L.": "હા, જગ અને 1,000\u00A0મિલીલીટરની બોટલ, બંનેમાં બરાબર 1\u00A0લીટર સમાય\u00A0છે.",
    "Each teacup holds 140 mL: how many teacups fill the jug up to the 560 mL line?": "ચાનો એક કપ 140\u00A0મિલીલીટરનો છે: જગમાં 560\u00A0મિલીલીટરની રેખા સુધી કેટલા\u00A0કપ?",
    "Teacups to the line?": "રેખા સુધી કેટલા ચાના\u00A0કપ?",
    "Pour the teacups in one by one and count them.": "ચાના કપ એક પછી એક રેડો અને તેમને\u00A0ગણો.",
    "Each teacup lifts the water by 140 mL.": "દરેક ચાનો કપ પાણીને 140\u00A0મિલીલીટર ઉપર ચઢાવે\u00A0છે.",
    "Count in 140s until you reach 560 mL.": "140\u00A0ના હિસાબે ગણો, જ્યાં સુધી 560\u00A0મિલીલીટર ન\u00A0આવે.",
    "Yes, 4 teacups of 140 mL fill the jug to the 560 mL line.": "હા, 140\u00A0મિલીલીટરના 4\u00A0ચાના કપથી જગ 560\u00A0મિલીલીટર સુધી ભરાય\u00A0છે.",
    "teacups": "ચાના કપ",
    "That one is empty now: pour a full one.": "તે હવે ખાલી છે: કોઈ ભરેલું\u00A0રેડો.",
    "The water is at the line.": "પાણી હવે રેખા સુધી આવી ગયું\u00A0છે.",
    "The jug is full now.": "જગ હવે ભરાઈ ગયો\u00A0છે.",
    "That cup is full: tap an empty cup.": "તે કપ ભરેલો છે: કોઈ ખાલી કપને સ્પર્શ\u00A0કરો.",
    "The jug is empty now.": "જગ હવે ખાલી\u00A0છે.",
    "The water is in: now read the level.": "પાણી જગમાં આવી ગયું: હવે સપાટી\u00A0વાંચો.",
    "The milk carton is empty.": "દૂધનું કાર્ટન હવે ખાલી\u00A0છે.",
    "Now tap the middle mark.": "હવે વચ્ચેના લાંબા નિશાનને સ્પર્શ\u00A0કરો.",
    "Pour the bucket into the jug first.": "પહેલાં ડોલને જગમાં\u00A0રેડો.",
    "Tap a container first, then its bin.": "પહેલાં વાસણને સ્પર્શ કરો, પછી તેના\u00A0ડબ્બાને.",
    "Now tap mL or L.": "હવે મિલી કે લી ટેગને સ્પર્શ\u00A0કરો.",
    "Tap mL or L, then Enter.": "મિલી કે લી પસંદ કરો, પછી દાખલ કરો\u00A0દબાવો.",
    "Put every container in a bin first.": "પહેલાં દરેક વાસણને ડબ્બામાં\u00A0મૂકો.",
    "1 L =": "1 લી =",
    "1,000 mL": "1,000 મિલી",
    "Less than 1 L": "1 લીથી ઓછું",
    "Equal to 1 L": "1 લી બરાબર",
    "More than 1 L": "1 લીથી વધુ",
    "Answer": "જવાબ",
    "juice packet": "જ્યૂસનું પૅકેટ",
    "packet": "પૅકેટ",
    "about half a litre": "લગભગ અડધો લીટર",
    "three quarters": "પોણો લીટર",
    "sorted": "છટણી થઈ",
    "each vessel": "દરેક વાસણ",
    "each cup": "દરેક કપ",
    "each glass": "દરેક ગ્લાસ",
    "each teacup": "દરેક ચાનો કપ",
    "First, pour the cup in.": "પહેલાં કપને જગમાં\u00A0રેડો.",
    "Tap the cup to pour it.": "પહેલાં કપને સ્પર્શ કરો જેથી તે\u00A0રેડાય.",
    "The cup must be poured before you answer.": "જવાબ આપતાં પહેલાં કપ રેડવાનો\u00A0છે.",
    "Pour the juice packet and the drum first.": "પહેલાં જ્યૂસનું પૅકેટ અને ડ્રમ\u00A0રેડો.",
    "First pour both containers into the jug.": "પહેલાં બંને વાસણ જગમાં\u00A0રેડો.",
    "Both must be poured before you answer.": "જવાબ આપતાં પહેલાં બંને રેડવાના\u00A0છે.",
    "Pour vessels until the jug is full first.": "પહેલાં જગ ભરાય ત્યાં સુધી વાસણ\u00A0રેડો.",
    "First fill the jug with the vessels.": "પહેલાં વાસણોથી જગ\u00A0ભરો.",
    "The jug must be full before you answer.": "જવાબ આપતાં પહેલાં જગ ભરેલો હોવો\u00A0જોઈએ.",
    "Pour the jug into the cups until it is empty first.": "પહેલાં જગ ખાલી થાય ત્યાં સુધી કપમાં\u00A0રેડો.",
    "First empty the jug into the cups.": "પહેલાં જગને કપમાં ખાલી\u00A0કરો.",
    "The jug must be empty before you answer.": "જવાબ આપતાં પહેલાં જગ ખાલી હોવો\u00A0જોઈએ.",
    "Pour the teacup into the small jug first.": "પહેલાં ચાનો કપ નાના જગમાં\u00A0રેડો.",
    "First tap the teacup to pour it.": "પહેલાં ચાના કપને સ્પર્શ કરો જેથી તે\u00A0રેડાય.",
    "The teacup must be poured before you answer.": "જવાબ આપતાં પહેલાં ચાનો કપ રેડવાનો\u00A0છે.",
    "Tap the middle mark first.": "પહેલાં વચ્ચેના લાંબા નિશાનને સ્પર્શ\u00A0કરો.",
    "First fill the jug to the middle long mark.": "પહેલાં જગને વચ્ચેના લાંબા નિશાન સુધી\u00A0ભરો.",
    "Fill up to the middle mark, then answer.": "જવાબ આપતાં પહેલાં પાણી વચ્ચેના નિશાન સુધી આવવું\u00A0જોઈએ.",
    "Pour the milk carton into the jug first.": "પહેલાં દૂધનું કાર્ટન જગમાં\u00A0રેડો.",
    "First tap the milk carton to pour it.": "પહેલાં દૂધના કાર્ટનને સ્પર્શ કરો જેથી તે\u00A0રેડાય.",
    "The milk carton must be poured before you answer.": "જવાબ આપતાં પહેલાં દૂધનું કાર્ટન રેડવાનું\u00A0છે.",
    "Pour glasses until the jug is full first.": "પહેલાં જગ ભરાય ત્યાં સુધી ગ્લાસ\u00A0રેડો.",
    "First fill the jug with the glasses.": "પહેલાં ગ્લાસથી જગ\u00A0ભરો.",
    "The jug must be full of water before you answer.": "જવાબ આપતાં પહેલાં જગ પાણીથી ભરેલો હોવો\u00A0જોઈએ.",
    "Pour teacups up to the 560 mL line first.": "પહેલાં 560\u00A0મિલીલીટરની રેખા સુધી ચાના કપ\u00A0રેડો.",
    "First fill the jug up to the line.": "પહેલાં જગને રેખા સુધી\u00A0ભરો.",
    "The water must reach the line before you answer.": "જવાબ આપતાં પહેલાં પાણી રેખા સુધી આવવું\u00A0જોઈએ.",
    "Now tap the Answer key.": "હવે જવાબ કીને સ્પર્શ\u00A0કરો.",
    "Type your answer, then press Enter.": "તમારો જવાબ લખો, પછી દાખલ કરો\u00A0દબાવો.",
    "Choose your answer.": "તમારો જવાબ પસંદ\u00A0કરો.",
    "This one is poured already: pick a full one.": "આ તો રેડાઈ ગયું છે: કોઈ ભરેલું પસંદ\u00A0કરો.",
    "Choose one that still has water in it.": "એવું પસંદ કરો જેમાં હજી પાણી\u00A0હોય.",
    "Stop: the jug is full.": "હવે વધુ નહીં સમાય: જગ ભરાઈ ગયો\u00A0છે.",
    "The jug cannot hold any more water.": "જગમાં હવે વધુ પાણી સમાઈ શકે\u00A0નહીં.",
    "The water has reached the 560 mL line.": "પાણી 560\u00A0મિલીલીટરની રેખા સુધી પહોંચી ગયું\u00A0છે.",
    "No more is needed: the water is at the line.": "હવે વધુ જોઈતું નથી: પાણી રેખા પર\u00A0છે.",
    "This cup has water already: choose an empty one.": "આ કપમાં પાણી આવી ગયું છે: કોઈ ખાલી કપ પસંદ\u00A0કરો.",
    "Pick an empty cup.": "એવો કપ પસંદ કરો જે હજી ખાલી\u00A0હોય.",
    "There is no water left in the jug.": "જગમાં હવે પાણી બચ્યું\u00A0નથી.",
    "The jug has nothing more to pour.": "જગમાં રેડવા માટે હવે કંઈ\u00A0નથી.",
    "All the water is poured: read the mark.": "બધું પાણી રેડાઈ ગયું: હવે નિશાન\u00A0વાંચો.",
    "Now look at the marks and read the water.": "હવે નિશાન જુઓ અને પાણીની સપાટી\u00A0વાંચો.",
    "All the milk is already in the jug.": "બધું દૂધ હવે જગમાં\u00A0છે.",
    "Nothing is left in the milk carton.": "દૂધના કાર્ટનમાં કંઈ બચ્યું\u00A0નથી.",
    "The question asks for the middle long mark.": "પ્રશ્ન વચ્ચેના લાંબા નિશાન વિશે\u00A0છે.",
    "Find the long mark half way up and tap it.": "અડધી ઊંચાઈએ આવેલું લાંબું નિશાન શોધો અને સ્પર્શ\u00A0કરો.",
    "First pour the bucket, then choose a tag.": "પહેલાં ડોલ રેડો, પછી કોઈ ટેગ પસંદ\u00A0કરો.",
    "The bucket must be poured before a tag.": "ટેગ પહેલાં ડોલ રેડવાની\u00A0છે.",
    "Pick up a container before you tap a bin.": "ડબ્બાને સ્પર્શ કરતાં પહેલાં કોઈ વાસણ\u00A0ઉપાડો.",
    "Choose a container, then the bin it goes in.": "કોઈ વાસણ પસંદ કરો, પછી તેનો\u00A0ડબ્બો.",
    "Choose one unit tag first.": "બે એકમ ટેગમાંથી એક પસંદ\u00A0કરો.",
    "A unit tag must be chosen before Enter.": "દાખલ કરતાં પહેલાં એક એકમ ટેગ પસંદ કરવાનો\u00A0છે.",
    "Some containers are still on the shelf.": "કેટલાંક વાસણ હજી છાજલી પર\u00A0છે.",
    "Every container needs a bin before Enter.": "દાખલ કરતાં પહેલાં દરેક વાસણને ડબ્બો\u00A0જોઈએ.",
    "vessel": "વાસણ",
    "cup": "કપ",
    "glass": "ગ્લાસ",
    "teacup": "ચાનો કપ",
    "bottle": "બોટલ",
    "bucket": "ડોલ",
    "drum": "ડ્રમ",
    "milk carton": "દૂધનું કાર્ટન",
    "orange pot": "નારંગી તપેલું",
    "jug": "જગ",
    "50 mL vessel": "50 મિલીનું વાસણ",
    "100 mL vessel": "100 મિલીનું વાસણ",
    "200 mL vessel": "200 મિલીનું વાસણ",
    "500 mL vessel": "500 મિલીનું વાસણ",
  },
};

/* One entry per phase = one mount. Each item: say = the whole question in ONE sentence (the bubble is the only place it
   shows), ask = a short prompt (read by the checks and the sidecar, never drawn), miss + ladder = the hint rungs (weak to
   strong, never the answer, unique in the phase), win = the line printed at the right answer.
   Scene fields read by Work and the oracle: objs (the containers), n* (how many vessels stand ready), amount, marks,
   target. near = the item's misconception (nearMiss). */
const PHASES = [
  {
    n: 1,
    concept: "Capacity: litres and millilitres",
    conceptId: "M1.S3.T6.C27", objectiveIds: ["O9"],
    says: ["Pour some water in. Is this a small amount or a large amount?"],
    /* warm-up: the 1 L bottle fills the jug to its 1 L mark, then the jug is emptied (no question's answer) */
    steps: [
      { say: "This jug holds 1 litre: tap the bottle to pour it in.", on: "pour-bottle", hint: "Tap the orange bottle." },
      { say: "1 litre is 1,000 millilitres: tap the jug to empty it.", on: "empty", hint: "Now tap the jug of water." },
    ],
    ladder: [],
    closing: "Small amounts are measured in millilitres and large amounts in litres.",
    learned: "You learned: millilitres for small amounts, litres for large ones.",
    traceback: "The container is poured into the 1 L jug again, and the child picks the unit once more.",
    items: [
      /* learn PI1: answer in the plan = Millilitres. A cup of tea is measured. Which unit fits the capacity of the cup, millilitres or litres? */
      { qid: "M1.S3.T6.C27:PI1", kind: "unit", objs: [{ id: "cup" }], choices: [{ id: "mL", label: "mL" }, { id: "L", label: "L" }], answer: "mL", near: "L",
        say: "Tap the cup to pour it into the jug: is a cup measured in mL or L?",
        ask: "A cup: mL or L?",
        miss: "See how high the water from the cup came in the jug.",
        ladder: ["The cup filled only a little of the 1 litre jug.", "A little amount is measured in the smaller unit."],
        win: "Yes, a cup holds little, so we use millilitres." },
      /* practice 1: answer in the plan = Litres, because a kettle holds a large amount of water. A kettle is filled at a tap.
         Which unit fits its capacity? (drawn as the bucket: the slot's photo of a large container; answered on the mL and L tags) */
      { qid: "M1.S3.T6.C27:1", kind: "tag", objs: [{ id: "bucket" }], pad: "enter", answer: "L", near: "mL",
        say: "Pour the bucket into the jug, then tap the unit tag that fits a bucket.",
        ask: "A bucket: tap mL or L",
        miss: "Tap the bucket and watch the water.",
        ladder: ["One bucket holds more than a whole 1 litre jug.", "A big amount is measured in the bigger unit."],
        win: "Yes, a bucket holds a lot, so we use litres." },
      /* practice 5: answer in the plan = The syringe in millilitres and the bucket in litres. A syringe and a bucket are both
         filled with water. (drawn as the juice packet and the drum, the slot's photos of a small and a large container) */
      { qid: "M1.S3.T6.C27:5", kind: "pair", objs: [{ id: "packet" }, { id: "drum" }], choices: [{ id: "packet", label: "Packet" }, { id: "drum", label: "Drum" }], answer: "packet", near: "drum",
        say: "Pour the juice packet and the drum: which one is measured in mL?",
        ask: "Which one in mL?",
        miss: "Pour each one again and watch the water in the jug.",
        ladder: ["One of them spilled over the jug and one did not fill it.", "The one that holds only a little uses the small unit."],
        win: "Yes, a juice packet is measured in millilitres and a drum in litres." },
    ],
  },
  {
    n: 2,
    concept: "Standard vessels: from 50 mL up to 1 L",
    conceptId: "M1.S3.T6.C28", objectiveIds: ["O9"],
    says: ["Pour the small vessels into the big jug. How many does it take to reach the top?"],
    /* warm-up: 100 mL, then 200 mL, then 500 mL: the water stands at 800 mL after 3 pours (no question's answer) */
    steps: [
      { say: "Tap the 100 mL vessel to pour it into the jug.", on: "pour-v100", hint: "Tap the vessel marked 100 mL." },
      { say: "Now pour the 200 mL vessel and watch the water rise.", on: "pour-v200", hint: "Tap the middle vessel, marked 200 mL." },
      { say: "Pour the 500 mL vessel and read the level at its mark.", on: "pour-v500", hint: "Tap the biggest vessel, marked 500 mL." },
    ],
    ladder: [],
    closing: "Small vessels fill the 1 litre jug when their amounts add up to 1 litre.",
    learned: "You learned: small vessels fill 1 L when their amounts add up to 1 L.",
    traceback: "The pours are replayed one at a time with a counter, stopping one pour before the answer.",
    items: [
      /* learn PI2: answer in the plan = Two vessels. A glass jug holds one litre. A small vessel holds five hundred millilitres. How many fill the jug? */
      { qid: "M1.S3.T6.C28:PI2", kind: "count", vessel: "v500", nv: 3, parts: [{ label: "how many", unit: "vessels" }], answer: [2], near: "500",
        say: "Pour 500 mL vessels into the jug until it is full: how many fill it?",
        ask: "500 mL vessels in 1 L?",
        miss: "Pour again and count each vessel as it goes in.",
        ladder: ["Each vessel lifts the water by 500 mL; count up to the 1 L mark.", "Pour until the water touches the 1 L mark, then count the vessels you used."],
        win: "Yes, 2 vessels of 500 mL fill the 1 litre jug." },
      /* practice 2: answer in the plan = Five cups. A pot holds one litre of water. It is poured into small cups that each hold
         two hundred millilitres. How many cups does it fill? (the pot is the full 1 L measuring jug, so its level can be read) */
      { qid: "M1.S3.T6.C28:2", kind: "share", nc: 6, parts: [{ label: "how many", unit: "cups" }], answer: [5], near: "200",
        say: "Pour the full 1 L jug into 200 mL cups: how many cups does it fill?",
        ask: "200 mL cups from 1 L?",
        miss: "Pour again and watch the water in the jug go down.",
        ladder: ["Each cup takes 200 mL out of the jug; keep going until it is empty.", "Count in 200s up to 1,000 mL and count the cups as you go."],
        win: "Yes, 1 litre fills 5 cups of 200 mL." },
      /* practice 6: answer in the plan = 140 mL, because seven marks of 20 mL each give 140 mL */
      { qid: "M1.S3.T6.C28:6", kind: "read", marks: 7, parts: [{ label: "water", unit: "mL" }], answer: [140], near: "7",
        say: "Pour the teacup into the small jug marked every 20 mL: how much is in it?",
        ask: "Water in the jug?",
        miss: "Find the last number below the water, then count the marks up.",
        ladder: ["Each small mark is 20 mL more than the mark below it.", "Start at 100 mL and count on by 20s up to the water."],
        win: "Yes, the water is at the 140 mL mark." },
    ],
  },
  {
    n: 3,
    concept: "Half a litre and a quarter of a litre",
    conceptId: "M1.S3.T6.C29", objectiveIds: ["O10"],
    says: ["Pour to the middle mark. Which thing holds about as much?"],
    /* warm-up: the quarter mark (250 mL is no question's answer) */
    steps: [
      { say: "Tap the lowest long mark near the bottom.", on: "mark-250", hint: "It is the long line just above 200 mL." },
    ],
    ladder: [],
    closing: "The middle long mark shows half a litre and the lowest shows a quarter.",
    learned: "You learned: half a litre is 500 mL and a quarter of a litre is 250 mL.",
    traceback: "The jug is filled again to one step below the mark, and the child finishes the pour.",
    items: [
      /* learn PI3: answer in the plan = Five hundred millilitres. A bottle is marked up to one litre. Water is poured to the half way mark. */
      { qid: "M1.S3.T6.C29:PI3", kind: "half", target: 500, parts: [{ label: "half litre", unit: "mL" }], answer: [500], near: "250",
        say: "Tap the middle long mark to fill the jug to half a litre: how many mL is that?",
        ask: "Half a litre in mL?",
        miss: "Look at the scale beside the middle long mark.",
        ladder: ["The middle mark is half way from 0 to 1,000 mL.", "The middle mark is half way from 400 mL to 600 mL."],
        win: "Yes, half a litre is 500 millilitres." },
      /* practice 3: answer in the plan = Half a litre, because the bottle is half full. A one litre water bottle is filled to the
         half way mark. Is the water about a quarter of a litre, half a litre or one litre? */
      { qid: "M1.S3.T6.C29:3", kind: "about", src: "carton", choices: [{ id: "quarter", label: "quarter litre" }, { id: "half", label: "half litre" }, { id: "one", label: "1 litre" }], answer: "half", near: "quarter",
        say: "Pour the milk carton into the jug: is it about a quarter, a half or 1 litre?",
        ask: "About how much?",
        miss: "Pour the rest of the milk and look at the long marks.",
        ladder: ["The quarter mark is low; the 1 litre mark is at the top.", "Is the water near the bottom, the middle or the top?"],
        win: "Yes, the milk carton held about half a litre." },
      /* practice 7: answer in the plan = About four glasses, because four quarters make one litre */
      { qid: "M1.S3.T6.C29:7", kind: "glasses", ng: 6, parts: [{ label: "how many", unit: "glasses" }], answer: [4], near: "250",
        say: "Pour the quarter litre glasses into the jug: how many fill 1 litre?",
        ask: "Glasses in 1 L?",
        miss: "Pour the glasses again and count each one.",
        ladder: ["Each glass lifts the water up to the next long mark.", "Count the quarters: 1 quarter, 2 quarters, and on up to 1 litre."],
        win: "Yes, 4 quarter litre glasses fill 1 litre." },
    ],
  },
  {
    n: 4,
    concept: "More than or less than one litre",
    conceptId: "M1.S3.T6.C30", objectiveIds: ["O10"],
    says: ["Does this hold more than the jug, or less? Drag it to its side."],
    /* warm-up: a 3 L steel pot (in no question) goes to More than 1 L */
    steps: [
      { say: "Tap the orange pot to pick it up: it holds 3 L.", on: "pick-pot", hint: "Tap the orange pot." },
      { say: "3 L is more than 1 L, so tap the bin More than 1 L.", on: "bin-more", hint: "Tap the bin on the right." },
    ],
    ladder: [],
    closing: "A container whose label is more than 1 L (1,000 mL) holds more than 1 litre.",
    learned: "You learned: compare each label with 1 L, which is the same as 1,000 mL.",
    traceback: "The containers go back to the shelf, 1 L = 1,000 mL lights, and the child sorts again.",
    items: [
      /* learn PI4: answer in the plan = The drum. A drum and a cup are both filled with water. Which one holds more than one litre? */
      { qid: "M1.S3.T6.C30:PI4", kind: "sort", objs: [{ id: "drum", show: "L" }, { id: "cup", show: "mL" }], pad: "enter", answer: "more,less", near: "less,more",
        say: "Put the drum and the cup in their bins: which one holds more than 1 L?",
        ask: "Sort: drum, cup",
        miss: "Read each label and compare it with 1 L.",
        ladder: ["A litre is a big amount; a few hundred millilitres is much less.", "Over 1 L goes in More, under 1 L goes in Less."],
        win: "Yes, the drum holds more than 1 L and the cup holds less." },
      /* practice 4: answer in the plan = The spoon, because a spoon holds only a very small amount. A car fuel tank and a spoon
         are filled with water. Which one holds less than one litre? (a sort with the exact 1 L jug and the 1,000 mL bottle;
         the juice packet is the one that holds less) */
      { qid: "M1.S3.T6.C30:4", kind: "sort", objs: [{ id: "bucket", show: "L" }, { id: "jug", show: "L" }, { id: "bottle", show: "mL" }, { id: "packet", show: "mL" }], pad: "enter", answer: "more,equal,equal,less", near: "more,equal,more,less",
        say: "Sort the bucket, the jug, the bottle and the juice packet into the three bins.",
        ask: "Sort all four",
        miss: "Check each label again before you place it.",
        ladder: ["Change 1 L into millilitres, then compare each label.", "A label in mL is compared with 1,000 mL."],
        win: "Yes, the jug and the 1,000 mL bottle both hold exactly 1 L." },
      /* practice 8: answer in the plan = 4 cups, because counting 140, 280, 420, 560 takes four steps (the 140 mL cups are teacups; the
         560 mL pan is the measuring jug filled up to a 560 mL line on its own 1 L scale) */
      { qid: "M1.S3.T6.C30:8", kind: "pan", nt: 6, parts: [{ label: "how many", unit: "teacups" }], answer: [4], near: "140",
        say: "Each teacup holds 140 mL: how many teacups fill the jug up to the 560 mL line?",
        ask: "Teacups to the line?",
        miss: "Pour the teacups in one by one and count them.",
        ladder: ["Each teacup lifts the water by 140 mL.", "Count in 140s until you reach 560 mL."],
        win: "Yes, 4 teacups of 140 mL fill the jug to the 560 mL line." },
    ],
  },
];

/* a win line is read, never cut (r41): each question's celebration lasts the win line's reading time (68 ms a character) */
PHASES.forEach((p: any) => p.items.forEach((it: any) => {
  if (!it.win || it.winMs) return;
  /* the longest of the English, Hindi and Gujarati win lines sets the time it is read for */
  const len = Math.max(it.win.length, String(TR.hi[it.win] || "").length, String(TR.gu[it.win] || "").length);
  it.winMs = Math.max(1600, Math.round(68 * len));
}));

/* The numbers the working area needs (they go into the sidecar too). One capacity per object for the whole tool. */
const MODEL = {
  cap: { cup: 200, bottle: 1000, bucket: 10000, drum: 50000, packet: 200, carton: 500, glass: 250, teacup: 140, pot: 3000, jug: 1000, v50: 50, v100: 100, v200: 200, v500: 500 },
  jug: { cap: 1000, step: 100, long: [250, 500, 750] },
  small: { cap: 200, step: 20, numbered: [100, 200] },
  fill: { line: 560 },
  bins: ["less", "equal", "more"],
  /* the answer is gated by the act (PATTERNS 19): the act each question waits for before its Answer or Enter key wakes (none is ungated) */
  answerGate: {
    "1.1": "pour the cup into the jug", "1.2": "pour the bucket into the jug (then tap a unit tag, Enter)", "1.3": "pour the juice packet and the drum",
    "2.1": "fill the jug to 1 L with 500 mL vessels", "2.2": "empty the full jug into 200 mL cups", "2.3": "pour the teacup into the small jug",
    "3.1": "tap the middle long mark (the jug fills to it)", "3.2": "pour the milk carton into the jug", "3.3": "fill the jug with quarter litre glasses",
    "4.1": "put both containers in bins (Enter)", "4.2": "put all four containers in bins (Enter)", "4.3": "pour teacups up to the 560 mL line",
    note: "after a miss clears the bins the key stays awake; Enter then nudges until every container is placed",
  },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).replace(/\s+/g, "").toLowerCase() === String(item.answer).replace(/\s+/g, "").toLowerCase();
};
/* oracle: every answer re-derived from the scene's own numbers (MODEL), sharing no code with judge or Work */
const piDerive = (it: any) => {
  const cap = (id: string) => (MODEL.cap as any)[id];
  if (it.kind === "unit" || it.kind === "tag") return cap(it.objs[0].id) >= 1000 ? "L" : "mL";
  if (it.kind === "pair") return it.objs.find((o: any) => cap(o.id) < 1000).id;
  if (it.kind === "count") return [MODEL.jug.cap / cap(it.vessel)];
  if (it.kind === "share") return [MODEL.jug.cap / cap("cup")];
  if (it.kind === "read") return [it.marks * MODEL.small.step];
  if (it.kind === "half") return [MODEL.jug.cap / 2];
  if (it.kind === "about") { const f = cap(it.src) / MODEL.jug.cap; return f === 0.25 ? "quarter" : f === 0.5 ? "half" : f === 1 ? "one" : "?"; }
  if (it.kind === "glasses") return [MODEL.jug.cap / cap("glass")];
  if (it.kind === "pan") return [MODEL.fill.line / cap("teacup")];
  if (it.kind === "sort") return it.objs.map((o: any) => (cap(o.id) > 1000 ? "more" : cap(o.id) === 1000 ? "equal" : "less")).join(",");
  return null;
};
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => JSON.stringify(piDerive(it)) === JSON.stringify(it.answer)));
/* the item's misconception (the number on the vessel, the other unit, the 1,000 that looks bigger than 1) */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print (a choice or a sort names its options) */
const answerForms = (item: any) => (item.parts ? item.answer.flatMap((x: number) => [String(x), indian(x), words(x)])
  : item.choices || item.pad === "enter" ? [] : [String(item.answer)]);
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area (the unit tags, the bins): set it as a child would */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check(): performs the question's act at once (no animation), then Enter goes as usual */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── drawing (module level: called, never mounted) ─────────────────────────────────────────── */

const PI_C = { card: "#FFFDF7", ink: "#1E293B", blue: "#0072B2", green: "#00875A", verm: "#C24E00", water: "#4DA1E8", waterD: "#1F6CB5",
  glass: "#F3F9FC", glassE: "#3A5565", table: "#B89F7D", tableDark: "#8D7352", chip: "#FFFFFF" };
/* the photo jug (images.json `jug`, a clear glass pitcher 200 x 247, spout left, handle right; its inside and its handle's opening
   transparent), as fractions of its picture: the interior profile [y, left x, right x] (a belly, not a tube: the code water is
   clipped to it), the inner floor y 0.842 (0 mL) and the 1 L mark y 0.16, linear between (y = 0.842 - 0.682 x mL / 1000), the belly's
   widest left x 0.10, the neck x 0.195 to 0.595 (where a pour goes in), the rim's right end (a pour out leaves there) */
/* (re-cut 2026-10-28: the interior is fully transparent, so the water meets the glass wall; profile from the re-cut picture) */
const PI_JP = { a: 200 / 247, floor: 0.842, full: 0.16, belly: 0.10, neckL: 0.165, neckR: 0.615, lipR: [0.6, 0.03],
  /* sampled every 0.03 of height through the belly and grown about 4 px into the glass wall, so the water meets the curved wall and the
     opaque glass paints over its edge; the bottom follows the bowl down to y 0.862 */
  prof: [[0.02, 0.165, 0.615], [0.15, 0.155, 0.62], [0.5, 0.08, 0.705], [0.57, 0.062, 0.716], [0.6, 0.05, 0.722], [0.63, 0.04, 0.728], [0.66, 0.031, 0.737],
    [0.69, 0.03, 0.74], [0.72, 0.035, 0.738], [0.75, 0.052, 0.725], [0.78, 0.072, 0.708], [0.81, 0.1, 0.688], [0.84, 0.15, 0.648], [0.862, 0.26, 0.54]] };
/* a measuring jug placed by the right edge of its number column (col: the pills end there, 58 left of the belly's widest point), the
   picture ph tall on the table (base): x, bw = the neck, yb = 0 mL, H = the height of the full capacity, brim = the rim, pic = the photo box */
function piJugAt(col: number, ph: number, more: any, base = 440) {
  const pw = ph * PI_JP.a, px = col + 58 - PI_JP.belly * pw, py = base - ph * 0.995;
  return { x: px + PI_JP.neckL * pw, bw: (PI_JP.neckR - PI_JP.neckL) * pw, yb: py + PI_JP.floor * ph, H: (PI_JP.floor - PI_JP.full) * ph,
    brim: py + 0.01 * ph, air: py + 0.02 * ph, col, pic: { x: px, y: py, w: pw, h: ph }, ...more };
}
/* the glass's inner left edge at height y (the profile, interpolated) */
const piEdgeL = (J: any, y: number) => {
  const p = J.pic, f = (y - p.y) / p.h, pr = PI_JP.prof;
  if (f <= pr[0][0]) return p.x + pr[0][1] * p.w;
  for (let k = 1; k < pr.length; k++) if (f <= pr[k][0]) { const a = pr[k - 1], b = pr[k], t = (f - a[0]) / (b[0] - a[0]); return p.x + (a[1] + (b[1] - a[1]) * t) * p.w; }
  return p.x + pr[pr.length - 1][1] * p.w;
};
/* the glass's inner right edge at height y */
const piEdgeR = (J: any, y: number) => {
  const p = J.pic, f = (y - p.y) / p.h, pr = PI_JP.prof;
  if (f <= pr[0][0]) return p.x + pr[0][2] * p.w;
  for (let k = 1; k < pr.length; k++) if (f <= pr[k][0]) { const a = pr[k - 1], b = pr[k], t = (f - a[0]) / (b[0] - a[0]); return p.x + (a[2] + (b[2] - a[2]) * t) * p.w; }
  return p.x + pr[pr.length - 1][2] * p.w;
};
/* the interior as a polygon in the picture's own box (x, y, w, h): the water is clipped to it */
const piProfile = (x: number, y: number, w: number, h: number) => {
  const pr = PI_JP.prof;
  return pr.map((r) => `${(x + r[1] * w).toFixed(1)},${(y + r[0] * h).toFixed(1)}`).concat(pr.slice().reverse().map((r) => `${(x + r[2] * w).toFixed(1)},${(y + r[0] * h).toFixed(1)}`)).join(" ");
};
/* a mark every 100 mL; a number on a pill every 200 mL (a 32-type pill needs 42 of the 61 between two), so 500 is read half way */
const PI_ONE = { cap: 1000, step: 100, nums: [200, 400, 600, 800, 1000], long: [] };
/* phase 3 only: the long marks at a quarter, a half and three quarters of a litre, without the unlabelled 300 and 700 beside them */
const PI_HALF = { ...PI_ONE, long: [250, 500, 750], skip: [300, 700] };
/* phases 1, 2 and free play: the pills left of the jug; phase 3 and the small jug: the words (or the counted marks) left of the pills */
/* ONE place for the jug in every phase: col 188, so the widest Hindi or Gujarati pill (182) starts inside the area; the words of the long
   marks, the counted marks of a correction and the 560 mL tag stand to the RIGHT of the jug (x 557 to 720), never beside a pill */
const PI_J1 = piJugAt(188, 428, PI_ONE);
const PI_J2 = piJugAt(188, 428, PI_HALF);
/* the 1 L bottle beside the 1 L jug: the jug photo's height */
const PI_BOT = 428;
const PI_J3 = PI_J1;
const PI_J4 = PI_J1;
/* the small 200 mL jug: the same photo at 0.7 of the litre jug's size (one capacity, one size), standing on the table */
const PI_JS = piJugAt(188, 300, { cap: 200, step: 20, nums: [100, 200], long: [] });
/* the right of the jug: where its words and side tags start */
const piRightX = (J: any) => J.pic.x + 0.98 * J.pic.w + 10;
const PI_LONG: any = { 250: "quarter litre", 500: "half litre", 750: "three quarters" };
const PI_BINS = [{ id: "less", label: "Less than 1 L" }, { id: "equal", label: "Equal to 1 L" }, { id: "more", label: "More than 1 L" }];
/* a bin: its labelled plate (a 76 tall control) on top, then four rows of 80, one a placed container (each a 76 tall control) */
const PI_BIN = (k: number) => ({ x: 660 + k * 270, y: 96, w: 249, h: 416 });
const PI_ROW = (B: any, r: number) => ({ x: B.x + 6, y: B.y + 82 + r * 82, w: B.w - 12, h: 78 });
/* each object's width : height (the photos at their own made aspect, never stretched) */
const PI_ASPECT: any = { cup: 124 / 150, bottle: 84 / 260, bucket: 200 / 182, drum: 154 / 200, packet: 84 / 170,
  v50: 92 / 150, v100: 92 / 150, v200: 92 / 150, v500: 92 / 150, glass: 92 / 150, "glass-code": 92 / 150, teacup: 124 / 150, carton: 73 / 190, milk: 73 / 190, pot: 200 / 140, jug: 200 / 246, "jug-code": 200 / 246 };
const PI_PHOTO: any = { cup: "#F2C230", bottle: "#EE8B2B", bucket: "#F5C518", drum: "#A0522D", packet: "#E98AA8", milk: "#F1EDE2" };
const PI_OPAQUE: any = { cup: 1, teacup: 1, bottle: 1, bucket: 1, drum: 1, packet: 1, carton: 1, milk: 1 };
const PI_NAME: any = { cup: "cup", bottle: "bottle", bucket: "bucket", drum: "drum", packet: "juice packet", carton: "milk carton", v200: "200 mL vessel", glass: "glass", teacup: "teacup", pot: "orange pot", jug: "jug", v50: "50 mL vessel", v100: "100 mL vessel", v500: "500 mL vessel" };

/* where the water stands: a pure function of the millilitres */
const piLevelY = (J: any, ml: number) => J.yb - (Math.max(0, Math.min(ml, J.cap)) / J.cap) * J.H;
/* a photo skin is drawn: the plain shape under it is then painted clear (it stays in the DOM: skins-fallback) */
const piSkinOn = (k: string) => { try { return typeof TOOL_IMAGES !== "undefined" && !!(TOOL_IMAGES as any)[k] && SKINS !== false; } catch (e) { return false; } };
const piMl = (ml: number, tx: any) => (ml >= 1000 && ml % 1000 === 0 ? ml / 1000 + " " + tx("L") : indian(ml) + " " + tx("mL"));
const piLabel = (id: string, show: string, tx: any) => { const c = (MODEL.cap as any)[id]; return show === "L" ? c / 1000 + " " + tx("L") : indian(c) + " " + tx("mL"); };

/* a tag: a rounded chip centred at (cx, cy) */
/* one line of text that never leaves its box: drawn at `start`, measured once drawn and stepped down to the 28 floor until it is
   at most maxW wide */
const piFit = (maxW: number, start: number) => (el: any) => {
  if (!el || !el.getComputedTextLength) return;
  try {
    let fs = start;
    el.setAttribute("font-size", String(fs));
    while (el.getComputedTextLength() > maxW && fs > T.micro) { fs -= 1; el.setAttribute("font-size", String(fs)); }
  } catch (e) { /* the starting size stands */ }
};
/* the unit fact "1 L = 1,000 mL" on a vermilion pill centred at (cx, cy): two labels (each under 4 words), measured once drawn so the
   pair sits in the middle of its pill in every language */
function piFact(cx: number, cy: number, tx: any) {
  const a = tx("1 L ="), b = tx("1,000 mL"), wa = a.length * T.label * 0.56, wb = b.length * T.label * 0.56, wt = wa + 12 + wb;
  const fit = (g: any) => {
    if (!g) return;
    try {
      const ts = g.querySelectorAll("text"), r = g.querySelector("rect");
      const A = ts[0].getComputedTextLength(), B = ts[1].getComputedTextLength(), W = A + 12 + B, x0 = cx - W / 2;
      if (!(W > 0)) return;
      ts[0].setAttribute("x", String(x0 + A)); ts[1].setAttribute("x", String(x0 + A + 12));
      r.setAttribute("x", String(x0 - 28)); r.setAttribute("width", String(W + 56));
    } catch (e) { /* the estimate stands */ }
  };
  return (
    <g ref={fit}>
      <rect x={cx - wt / 2 - 28} y={cy - 33} width={wt + 56} height={66} rx={33} fill="#FFFFFF" stroke={PI_C.verm} strokeWidth={4} />
      <text x={cx - wt / 2 + wa} y={cy} textAnchor="end" dominantBaseline="central" fontSize={T.label} fontWeight={700} fill={PI_C.ink}>{a}</text>
      <text x={cx - wt / 2 + wa + 12} y={cy} textAnchor="start" dominantBaseline="central" fontSize={T.label} fontWeight={700} fill={PI_C.ink}>{b}</text>
    </g>
  );
}

function piTag(cx: number, cy: number, text: string, fill: string, ink: string, size = T.label, edge?: string) {
  /* Devanagari and Gujarati run narrower than Latin in Poppins (0.5 em a character, FIT_KEY.devEm) */
  const em = 0.58;
  const w = Math.max(76, Math.round(String(text).length * size * em + 20)), h = Math.round(size * 1.5);
  return (
    <g>
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={h / 2.4} fill={fill} stroke={edge || "none"} strokeWidth={edge ? 3 : 0} />
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fontSize={size} fontWeight={700} fill={ink}>{text}</text>
    </g>
  );
}

/* the measuring jug, drawn in this order: (1) the WATER behind the glass, a light-blue translucent fill clipped to the interior
   profile from the inner floor up to the level (a pure function of the millilitres, the same in every frame), with a darker line on
   its surface; (2) the photo `jug` over it, its walls and highlights showing on the water; (3) the marks, never on the water: a
   short dark tick outside the glass's left wall at every step, long ticks at the quarter, half and three quarter marks, a number
   on a cream pill every 200 mL in the column left of the jug with a leader line to its tick, and the quarter and half words (once
   the child's act names them) left of the pills. The code-drawn jug (the profile's outline and a handle) is the fallback, painted
   clear once the photo is on. */
const PI_PILL = 130;   /* the number column's width in English: "800 mL" at 32 on a pill */
/* a scale number as the pill prints it, its pill's width, and the right edge of the word column: left of the WIDEST pill in the
   language on screen (Hindi and Gujarati pills run wider than English ones) */
const piNumLab = (v: number, tx: any) => (v >= 1000 ? "1 " + tx("L") : v + " " + tx("mL"));
const piPillW = (lab: string) => Math.max(150, Math.round(String(lab).length * T.label * 0.6 + 28));
const piWordR = (J: any, tx: any) => J.col - Math.max(PI_PILL, ...J.nums.map((v: number) => piPillW(piNumLab(v, tx)))) - 12;
function piJug(J: any, ml: number, o: any) {
  const { yb, H, cap } = J;
  const tx = o.tx || ((v: any) => v);
  const p = J.pic;
  const on = piSkinOn("jug"), op = on ? 0 : 1;
  const wy = piLevelY(J, ml);
  const over = ml > cap;
  const top = over ? J.air : wy;
  const cid = "piJw" + Math.round(p.x) + "_" + Math.round(p.y);
  const poly = piProfile(p.x, p.y, p.w, p.h);
  const numR = J.col, wordR = piWordR(J, tx);
  const marks: any[] = [];
  for (let v = J.step; v <= cap + 0.01; v += J.step) {
    /* phase 3: no unlabelled minor beside a long mark (three ticks in 29 px read as a double line) */
    if (J.skip && J.skip.indexOf(v) >= 0) continue;
    const y = yb - (v / cap) * H, e = piEdgeL(J, y), big = J.nums.indexOf(v) >= 0;
    marks.push(<line key={"t" + v} x1={e - 32} y1={y} x2={e - 3} y2={y} stroke={PI_C.ink} strokeWidth={big ? 5 : 4} strokeLinecap="round" />);
    if (big) {
      const lab = v >= 1000 ? "1 " + tx("L") : v + " " + tx("mL");
      const w = piPillW(lab);
      marks.push(<line key={"l" + v} x1={numR} y1={y} x2={e - 32} y2={y} stroke={PI_C.ink} strokeWidth={3} />);
      marks.push(<rect key={"p" + v} x={numR - w} y={y - 21} width={w} height={42} rx={21} fill={PI_C.card} stroke={PI_C.tableDark} strokeWidth={2.5} />);
      marks.push(<text key={"n" + v} x={numR - w / 2} y={y + 2} textAnchor="middle" dominantBaseline="central" fontSize={T.label} fontWeight={700} fill={PI_C.ink}>{lab}</text>);
    }
  }
  return (
    <g>
      <defs>
        <clipPath id={cid}><polygon points={poly} /></clipPath>
        <linearGradient id={cid + "_waterGrad"} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6CC0F7" stopOpacity={on ? 0.65 : 0.9} />
          <stop offset="100%" stopColor="#257CC4" stopOpacity={on ? 0.75 : 0.95} />
        </linearGradient>
      </defs>
      {/* (1) the water, and a pour's stream, behind the glass */}
      {ml > 0 && <g clipPath={"url(#" + cid + ")"}>
        <rect x={p.x} y={top} width={p.w} height={Math.max(0, p.y + 0.862 * p.h - top)} fill={`url(#${cid}_waterGrad)`} />
        <line x1={p.x} y1={top} x2={p.x + p.w} y2={top} stroke={PI_C.waterD} strokeWidth={3.5} />
      </g>}
      {/* a full line (phase 4: the jug filled up to 560 mL): a given fact, drawn across the inside and named in the far left column */}
      {o.fill && <g data-scale="fill" clipPath={"url(#" + cid + ")"}><line x1={p.x} y1={yb - (o.fill / cap) * H} x2={p.x + p.w} y2={yb - (o.fill / cap) * H} stroke={PI_C.ink} strokeWidth={3.5} strokeDasharray="10 6" /></g>}
      {o.stream && <rect x={J.x + J.bw / 2 - 8} y={J.brim - 20} width={16} height={Math.max(20, top - J.brim + 20)} rx={8} fill={`url(#${cid}_waterGrad)`} />}
      {/* the fallback: the interior's outline, a base and a handle, clear once the photo is on */}
      <polygon points={poly} fill="none" stroke={PI_C.glassE} strokeOpacity={op} strokeWidth={4} strokeLinejoin="round" />
      <rect x={p.x + 0.22 * p.w} y={p.y + 0.842 * p.h} width={0.43 * p.w} height={0.15 * p.h} rx={10} fill={PI_C.glass} fillOpacity={op} stroke={PI_C.glassE} strokeOpacity={op} strokeWidth={4} />
      <path d={`M ${p.x + 0.62 * p.w} ${p.y + 0.2 * p.h} C ${p.x + 0.98 * p.w} ${p.y + 0.18 * p.h} ${p.x + 0.98 * p.w} ${p.y + 0.62 * p.h} ${p.x + 0.69 * p.w} ${p.y + 0.66 * p.h}`} fill="none" stroke={PI_C.glassE} strokeOpacity={op} strokeWidth={10} strokeLinecap="round" />
      {/* (2) the glass */}
      <Skin name="jug" x={p.x} y={p.y} w={p.w} h={p.h} />
      {over && <g>
        <path d={`M ${p.x + 0.07 * p.w} ${p.y + 0.06 * p.h} Q ${p.x - 0.02 * p.w} ${p.y + 0.1 * p.h} ${p.x - 0.01 * p.w} ${p.y + 0.3 * p.h} L ${p.x - 0.01 * p.w} ${p.y + 0.98 * p.h}`} fill="none" stroke={PI_C.water} strokeOpacity={0.7} strokeWidth={6} strokeLinecap="round" />
        <ellipse cx={p.x - 0.01 * p.w} cy={p.y + 0.99 * p.h} rx={24} ry={6} fill={PI_C.water} fillOpacity={0.7} />
      </g>}
      {/* (3) the marks, outside the glass */}
      <g data-scale="jug">{marks}</g>
      {o.fill && (() => {
        const y = yb - (o.fill / cap) * H, er = piEdgeR(J, y), rx = piRightX(J), lab = o.fill + " " + tx("mL"), w = Math.round(lab.length * T.label * 0.58 + 20);
        return (
          <g data-scale="fill">
            <line x1={er + 3} y1={y} x2={rx + 4} y2={y} stroke={PI_C.ink} strokeWidth={3} strokeDasharray="8 6" />
            {piTag(rx + 8 + w / 2, y, lab, PI_C.blue, "#FFFFFF", T.label)}
          </g>
        );
      })()}
      {(J.long || []).map((v: number) => {
        const y = yb - (v / cap) * H, e = piEdgeL(J, y);
        /* the quarter and half words, each on ONE line right of the jug; three quarters is never named (not this lesson) */
        const lab = o.labels && o.labels[v] && v !== 750;
        return (
          <g key={"L" + v}>
            {/* the quarter marks start at the number pills' edge (the 200 mL and 800 mL pills stand 15 px away) */}
            <line x1={v === 500 ? e - 50 : Math.max(e - 50, J.col + 4)} y1={y} x2={e - 3} y2={y} stroke={PI_C.ink} strokeWidth={6} strokeLinecap="round" />
            {lab && <g data-reveals={o.reveal && o.reveal[v] ? "answer" : undefined}>
              <line x1={piEdgeR(J, y) + 3} y1={y} x2={piRightX(J) - 6} y2={y} stroke={PI_C.ink} strokeWidth={3} strokeDasharray="8 6" />
              <text x={piRightX(J)} y={y} textAnchor="start" dominantBaseline="central" fontSize={T.label} fontWeight={700} fill={PI_C.ink}>{tx(PI_LONG[v])}</text>
            </g>}
          </g>
        );
      })}
    </g>
  );
}

/* the photo `glass` (a clear tumbler, 92 x 150, its inside transparent) as fractions of its picture: the tapered interior
   [y, left x, right x] down to the inner floor y 0.83; a full glass holds its water up to y 0.2 */
/* grown about 1 percent into the wall so the water meets it on both sides */
const PI_GP = { floor: 0.845, top: 0.2, prof: [[0.09, 0.077, 0.934], [0.42, 0.13, 0.875], [0.62, 0.165, 0.838], [0.82, 0.207, 0.803], [0.845, 0.25, 0.76]] };
/* a profile's interior from height ft down to its floor, as polygon points in the box (x, y, w, h): the water of a glass */
const piCut = (pr: any[], ft: number, x: number, y: number, w: number, h: number) => {
  const at = (f: number) => {
    if (f <= pr[0][0]) return [pr[0][1], pr[0][2]];
    for (let k = 1; k < pr.length; k++) if (f <= pr[k][0]) { const a = pr[k - 1], b = pr[k], t = (f - a[0]) / (b[0] - a[0]); return [a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }
    return [pr[pr.length - 1][1], pr[pr.length - 1][2]];
  };
  const e = at(ft), below = pr.filter((r) => r[0] > ft);
  const pts = [[ft, e[0]], ...below.map((r) => [r[0], r[1]]), ...below.slice().reverse().map((r) => [r[0], r[2]]), [ft, e[1]]];
  return pts.map((p) => `${(x + p[1] * w).toFixed(1)},${(y + p[0] * h).toFixed(1)}`).join(" ");
};
/* the glass photo stands for the drinking glass and for the measuring vessels (a different object at each size, each labelled) */
const PI_GLASSY: any = { glass: 1, v50: 1, v100: 1, v200: 1, v500: 1 };

/* one container, standing, its base centre at (0, 0), h tall. full: the water inside shows (see-through ones: drawn behind the
   glass), or a water top shows (an opaque cup). A photo object is the skin over a plain shape that is painted clear once the skin is on. */
function piObj(id: string, h: number, full: boolean) {
  const w = h * (PI_ASPECT[id] || 0.7);
  /* a scaled copy of a photo is its own object: the teacup is the cup picture, smaller */
  if (id === "teacup") return piObj("cup", h, full);
  if (id === "carton") return piObj("milk", h, full);   /* the milk carton: its own photo  (73 x 190, a gable top) */
  /* the 1 L measuring jug: its photo (full of water), the code-drawn jug under it painted clear */
  if (id === "jug") {
    const on = piSkinOn("jug");
    return (
      <g>
        <ellipse cx={0} cy={-2} rx={w * 0.45} ry={7} fill="#000000" opacity={0.12} />
        <g opacity={on ? 0 : 1}>{piObj("jug-code", h, full)}</g>
        <defs><clipPath id="piJugObj"><polygon points={piProfile(-w / 2, -h, w, h)} /></clipPath></defs>
        <rect x={-w / 2} y={-h + PI_JP.full * h} width={w} height={(PI_JP.floor - PI_JP.full) * h} clipPath="url(#piJugObj)" fill={PI_C.water} fillOpacity={on && full ? 0.65 : 0} />
        <Skin name="jug" x={-w / 2} y={-h} w={w} h={h} />
      </g>
    );
  }
  /* a glass (a drinking glass, a measuring vessel): the water behind the clear glass, cut to its tapered inside */
  if (PI_GLASSY[id]) {
    const on = piSkinOn("glass");
    const top = -h + PI_GP.top * h;
    return (
      <g>
        <ellipse cx={0} cy={-2} rx={w * 0.4} ry={5} fill="#000000" opacity={0.12} />
        <g opacity={on ? 0 : 1}>{piObj("glass-code", h, full)}</g>
        {full && <polygon points={piCut(PI_GP.prof, PI_GP.top, -w / 2, -h, w, h)} fill={PI_C.water} fillOpacity={on ? 0.65 : 0} />}
        {full && <line x1={-w / 2 + 0.095 * w} y1={top} x2={-w / 2 + 0.914 * w} y2={top} stroke={PI_C.waterD} strokeWidth={3} strokeOpacity={on ? 1 : 0} />}
        <Skin name="glass" x={-w / 2} y={-h} w={w} h={h} />
      </g>
    );
  }
  if (id === "pot") {
    const on = piSkinOn("pot"), op = on ? 0 : 1;
    return (
      <g>
        <ellipse cx={0} cy={-2} rx={w * 0.45} ry={7} fill="#000000" opacity={0.12} />
        <g opacity={op}>
          <rect x={-w * 0.5} y={-h * 0.7} width={w * 0.1} height={h * 0.12} rx={5} fill="#B4521E" />
          <rect x={w * 0.4} y={-h * 0.7} width={w * 0.1} height={h * 0.12} rx={5} fill="#B4521E" />
          <rect x={-w * 0.42} y={-h * 0.82} width={w * 0.84} height={h * 0.8} rx={18} fill="#E8762C" stroke="#9A4317" strokeWidth={3} />
          <ellipse cx={0} cy={-h * 0.84} rx={w * 0.44} ry={h * 0.07} fill="#F08A3E" stroke="#9A4317" strokeWidth={3} />
        </g>
        <Skin name="pot" x={-w / 2} y={-h} w={w} h={h} />
      </g>
    );
  }
  if (PI_PHOTO[id]) {
    const on = piSkinOn(id), col = PI_PHOTO[id], op = on ? 0 : 1;
    let d = "";
    if (id === "cup") d = `M ${-w * 0.44} ${-h * 0.95} L ${w * 0.44} ${-h * 0.95} L ${w * 0.32} ${-h * 0.02} L ${-w * 0.32} ${-h * 0.02} Z`;
    else if (id === "bottle") d = `M ${-w * 0.42} ${-h * 0.68} Q ${-w * 0.42} ${-h * 0.8} ${-w * 0.2} ${-h * 0.84} L ${-w * 0.2} ${-h * 0.97} L ${w * 0.2} ${-h * 0.97} L ${w * 0.2} ${-h * 0.84} Q ${w * 0.42} ${-h * 0.8} ${w * 0.42} ${-h * 0.68} L ${w * 0.42} ${-h * 0.02} L ${-w * 0.42} ${-h * 0.02} Z`;
    else if (id === "bucket") d = `M ${-w * 0.46} ${-h * 0.92} L ${w * 0.46} ${-h * 0.92} L ${w * 0.36} ${-h * 0.03} L ${-w * 0.36} ${-h * 0.03} Z`;
    else if (id === "milk") d = `M ${-w * 0.45} ${-h * 0.02} L ${-w * 0.45} ${-h * 0.7} L 0 ${-h * 0.93} L ${w * 0.45} ${-h * 0.7} L ${w * 0.45} ${-h * 0.02} Z`;
    else if (id === "drum") d = `M ${-w * 0.44} ${-h * 0.9} Q ${-w * 0.44} ${-h * 0.96} ${-w * 0.3} ${-h * 0.96} L ${w * 0.3} ${-h * 0.96} Q ${w * 0.44} ${-h * 0.96} ${w * 0.44} ${-h * 0.9} L ${w * 0.44} ${-h * 0.04} L ${-w * 0.44} ${-h * 0.04} Z`;
    else d = `M ${-w * 0.42} ${-h * 0.86} L ${-w * 0.3} ${-h * 0.97} L ${w * 0.3} ${-h * 0.97} L ${w * 0.42} ${-h * 0.86} L ${w * 0.42} ${-h * 0.02} L ${-w * 0.42} ${-h * 0.02} Z`;
    return (
      <g>
        <ellipse cx={0} cy={-2} rx={w * 0.42} ry={6} fill="#000000" opacity={0.14} />
        <path d={d} fill={col} fillOpacity={op} stroke={shade(col, 0.35)} strokeOpacity={op} strokeWidth={3} />
        <Skin name={id} x={-w / 2} y={-h} w={w} h={h} />
        {full && id === "cup" && <ellipse cx={0} cy={-h * 0.9} rx={w * 0.36} ry={Math.max(5, h * 0.045)} fill={PI_C.water} stroke={PI_C.waterD} strokeWidth={2} />}
      </g>
    );
  }
  /* the code-drawn fallbacks under the glass and jug photos */
  const top = id === "glass-code" ? w * 0.45 : w * 0.46, bot = id === "glass-code" ? w * 0.3 : w * 0.46;
  const body = `M ${-top} ${-h} L ${-bot} ${-8} Q ${-bot} 0 ${-bot + 10} 0 L ${bot - 10} 0 Q ${bot} 0 ${bot} ${-8} L ${top} ${-h}`;
  const wl = 0.8, wy = -h * wl, wt = bot + (top - bot) * wl;
  return (
    <g>
      <ellipse cx={0} cy={-2} rx={top * 0.9} ry={5} fill="#000000" opacity={0.12} />
      {id === "jug-code" && <path d={`M ${top - 2} ${-h * 0.86} C ${top + w * 0.36} ${-h * 0.86} ${top + w * 0.36} ${-h * 0.36} ${bot - 2} ${-h * 0.36}`} fill="none" stroke={PI_C.glassE} strokeWidth={8} strokeLinecap="round" />}
      <path d={body + " Z"} fill={PI_C.glass} />
      {full && <path d={`M ${-wt + 3} ${wy} L ${-bot + 3} ${-6} Q ${-bot + 4} -3 ${-bot + 12} -3 L ${bot - 12} -3 Q ${bot - 4} -3 ${bot - 3} -6 L ${wt - 3} ${wy} Z`} fill={PI_C.water} />}
      <path d={body} fill="none" stroke={PI_C.glassE} strokeWidth={4} strokeLinejoin="round" />
    </g>
  );
}

/* where a source stands and, while it pours, where it is tipped: one transform function for both, so CSS can glide between */
const piPose = (x: number, y: number, r: number, s: number, h: number) =>
  `translate(${Math.round(x)}px, ${Math.round(y)}px) rotate(${r}deg) scale(${s}) translate(0px, ${Math.round(h)}px)`;

/* each screen's things: the jug (or pan), the sources a child taps, and where each one is tipped to pour */
function piScene(n: number, kind: string, item: any) {
  /* a source: its id (the control is "pour-<id>"), what it is, where its base stands, its height; ty = its tag's centre below the base */
  const S = (id: string, obj: string, cx: number, yb: number, h: number, more: any = {}) => ({ id, obj, cx, yb, h, ty: 48, ...more });
  /* two shelves of three, right of the jug (x 480 to 900) */
  /* the first cup's ring starts 27 right of the jug's handle (x 555) */
  const row2 = (i: number) => ({ cx: 630 + 110 * (i % 3), yb: i < 3 ? 206 : 406 });
  const T0 = 436;   /* the table top */
  /* THE 1 L BOTTLE IS AS TALL AS THE 1 L JUG (the owner: equal capacity, equal size; PI_BOT = the jug photo's height), its own aspect.
     Free play: the tall bottle first, beside the jug (it would reach the key's corner at the far right), the vessels after it, 16+ apart */
  if (kind === "free") return { full: true, wide: true, jug: PI_J1, srcs: [S("bottle", "bottle", 660, T0, PI_BOT, { cap: 1000, tag: true }), S("v50", "v50", 795, T0, 120, { cap: 50, tag: true }), S("v100", "v100", 905, T0, 150, { cap: 100, tag: true, up: true }), S("v200", "v200", 1024, T0, 180, { cap: 200, tag: true }), S("v500", "v500", 1165, T0, 215, { cap: 500, tag: true, up: true, hw: 120 })] };
  if (kind === "warm1") return { full: true, jug: PI_J1, srcs: [S("bottle", "bottle", 690, T0, PI_BOT, { cap: 1000 })] };
  if (kind === "unit") return { full: true, jug: PI_J1, srcs: [S("cup", "cup", 720, T0, 230, { cap: 200 })] };
  if (kind === "tag") return { full: true, jug: PI_J1, srcs: [S("bucket", "bucket", 740, T0, 280, { cap: 10000 })], tags: [{ id: "mL", x: 930, y: 150, w: 210, h: 110 }, { id: "L", x: 930, y: 300, w: 210, h: 110 }] };
  if (kind === "pair") return { full: true, jug: PI_J1, srcs: [S("packet", "packet", 620, T0, 200, { cap: 200 }), S("drum", "drum", 790, T0, 265, { cap: 50000 })] };
  const row4 = (i: number) => 480 + 113 * i;   /* four in a row, x 440 to 890, hit boxes 96 wide */
  /* three vessels 135 apart, so their tags never touch, in any language */
  if (kind === "warm2") return { jug: PI_J3, srcs: [S("v100", "v100", 600, T0, 135, { cap: 100, tag: true, hw: 96 }), S("v200", "v200", 710, T0, 160, { cap: 200, tag: true, up: true, hw: 96 }), S("v500", "v500", 834, T0, 185, { cap: 500, tag: true, hw: 96 })] };
  if (kind === "count") return { jug: PI_J3, each: { key: "each vessel", cap: 500, x: 728, y: 484 }, srcs: [0, 1, 2].map((i) => S("vessel-" + (i + 1), "v500", 609 + 119 * i, T0, 170, { cap: 500, hw: 96 })) };
  if (kind === "share") return { jug: PI_J3, share: true, shelfX: 580, each: { key: "each cup", cap: 200, x: 726, y: 484 }, shelves: [206, 406], srcs: [0, 1, 2, 3, 4, 5].map((i) => S("cup-" + (i + 1), "cup", row2(i).cx, row2(i).yb, 110, { cap: 200, hw: 96 })) };
  if (kind === "read") return { jug: PI_JS, srcs: [S("teacup", "teacup", 800, T0, 150, { cap: 140 })] };
  if (kind === "about") return { jug: PI_J2, srcs: [S("carton", "carton", 840, T0, 230, { cap: 500 })] };
  /* phase 3: the jug's quarter and half words need x 585 to 780, so the tall bottle stands right of them (x 851 to 989) and steps
     aside while the keypad is open (its pour is done by then) */
  if (kind === "warm3" || kind === "half") return { jug: PI_J2, marks: true, srcs: [S("bottle", "bottle", 920, T0, PI_BOT, { cap: 1000, still: true, hideOpen: true })] };
  /* two rows of three right of the jug (x 662 to 898): a shelf at 176 and the table, so the middle band (y 190 to 330) stays free for
     the quarter and half words and the 560 mL tag */
  const row3 = (i: number) => ({ cx: 700 + 80 * (i % 3), yb: i < 3 ? 176 : 436 });
  if (kind === "glasses") return { jug: PI_J2, shelves: [176], shelfX: 652, each: { key: "each glass", cap: 250, x: 806, y: 484 }, srcs: [0, 1, 2, 3, 4, 5].map((i) => S("glass-" + (i + 1), "glass", row3(i).cx, row3(i).yb, 108, { cap: 250, hw: 74 })) };
  /* the teacups' shelf a little higher (156), so the 560 mL tag on its line (y 211) stands 16+ clear of it */
  if (kind === "pan") return { jug: PI_J4, fill: MODEL.fill.line, shelves: [156], shelfX: 652, each: { key: "each teacup", cap: 140, x: 815, y: 484 }, srcs: [0, 1, 2, 3, 4, 5].map((i) => S("teacup-" + (i + 1), "teacup", row3(i).cx, i < 3 ? 156 : 436, 80, { cap: 140, hw: 74 })) };
  /* warm4 and sort: the shelf of containers on the left, the three bins on the right */
  const objs = kind === "warm4" ? [{ id: "pot", show: "L" }] : item.objs;
  const H: any = { drum: 280, cup: 170, bucket: 190, jug: 210, bottle: 260, packet: 180, pot: 190 };
  const cell = 610 / objs.length;
  const fitH = (id: string) => Math.min(H[id] || 180, objs.length > 2 ? 230 : 300, (cell - 18) / (PI_ASPECT[id] || 0.7));
  /* the 1 L bottle and the 1 L jug on one shelf stand equally tall (equal capacity, equal size) */
  const pair = objs.some((o: any) => o.id === "bottle") && objs.some((o: any) => o.id === "jug") ? Math.min(fitH("bottle"), fitH("jug")) : 0;
  const hOf = (id: string) => (pair && (id === "bottle" || id === "jug") ? pair : fitH(id));
  return { full: true, shelf: true, srcs: objs.map((o: any, i: number) => S(o.id, o.id, 30 + cell * (i + 0.5), 392, hOf(o.id), { show: o.show })) };
}

/* the act's target for a question, as the board would show it once the child has acted (HOOK.check and the win) */
function piTarget(kind: string, item: any) {
  if (kind === "unit") return { ml: 200, poured: { cup: true }, last: "cup" };
  if (kind === "tag") return { ml: 10000, poured: { bucket: true }, last: "bucket" };
  if (kind === "pair") return { ml: 200, poured: { packet: true, drum: true }, last: "packet" };
  if (kind === "count") return { ml: 1000, used: ["vessel-1", "vessel-2"] };
  if (kind === "share") return { ml: 0, used: ["cup-1", "cup-2", "cup-3", "cup-4", "cup-5"] };
  if (kind === "read") return { ml: 140, poured: { teacup: true } };
  if (kind === "half") return { ml: 500, mark: 500, labels: { 500: true } };
  if (kind === "about") return { ml: 500, poured: { carton: true } };
  if (kind === "glasses") return { ml: 1000, used: ["glass-1", "glass-2", "glass-3", "glass-4"], labels: { 250: true, 500: true, 750: true } };
  if (kind === "pan") return { ml: 560, used: ["teacup-1", "teacup-2", "teacup-3", "teacup-4"] };
  if (kind === "sort") { const bins = String(item.answer).split(","), pl: any = {}; item.objs.forEach((o: any, i: number) => { pl[o.id] = { bin: bins[i], t: i + 1 }; }); return { placed: pl, sel: null }; }
  return {};
}

/* every nudge in three forms, rotating per question and per tap, so no nudge line repeats inside a phase run */
const PI_NUDGE: any = {
  actCup: ["First, pour the cup in.", "Tap the cup to pour it.", "The cup must be poured before you answer."],
  actPair: ["Pour the juice packet and the drum first.", "First pour both containers into the jug.", "Both must be poured before you answer."],
  actCount: ["Pour vessels until the jug is full first.", "First fill the jug with the vessels.", "The jug must be full before you answer."],
  actShare: ["Pour the jug into the cups until it is empty first.", "First empty the jug into the cups.", "The jug must be empty before you answer."],
  actRead: ["Pour the teacup into the small jug first.", "First tap the teacup to pour it.", "The teacup must be poured before you answer."],
  actHalf: ["Tap the middle mark first.", "First fill the jug to the middle long mark.", "Fill up to the middle mark, then answer."],
  actAbout: ["Pour the milk carton into the jug first.", "First tap the milk carton to pour it.", "The milk carton must be poured before you answer."],
  actGlasses: ["Pour glasses until the jug is full first.", "First fill the jug with the glasses.", "The jug must be full of water before you answer."],
  actPan: ["Pour teacups up to the 560 mL line first.", "First fill the jug up to the line.", "The water must reach the line before you answer."],
  emptyOne: ["That one is empty now: pour a full one.", "This one is poured already: pick a full one.", "Choose one that still has water in it."],
  jugFull: ["The jug is full now.", "Stop: the jug is full.", "The jug cannot hold any more water."],
  lineFull: ["The water is at the line.", "The water has reached the 560 mL line.", "No more is needed: the water is at the line."],
  cupFull: ["That cup is full: tap an empty cup.", "This cup has water already: choose an empty one.", "Pick an empty cup."],
  jugEmpty: ["The jug is empty now.", "There is no water left in the jug.", "The jug has nothing more to pour."],
  readNow: ["The water is in: now read the level.", "All the water is poured: read the mark.", "Now look at the marks and read the water."],
  cartonEmpty: ["The milk carton is empty.", "All the milk is already in the jug.", "Nothing is left in the milk carton."],
  middleMark: ["Now tap the middle mark.", "The question asks for the middle long mark.", "Find the long mark half way up and tap it."],
  bucketFirst: ["Pour the bucket into the jug first.", "First pour the bucket, then choose a tag.", "The bucket must be poured before a tag."],
  pickFirst: ["Tap a container first, then its bin.", "Pick up a container before you tap a bin.", "Choose a container, then the bin it goes in."],
  tagFirst: ["Tap mL or L, then Enter.","Choose one unit tag first.", "A unit tag must be chosen before Enter."],
  allPlaced: ["Put every container in a bin first.", "Some containers are still on the shelf.", "Every container needs a bin before Enter."],
};

/* ── the working area ──────────────────────────────────────────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const P: any = PHASES[n - 1] || {};
  const demoLike = !free && (stage === "demo" || stage === "teach") && !!(P.steps && P.steps.length);
  const kind = free ? "free" : demoLike ? "warm" + n : item.kind;
  const last = !free && index === (P.items || []).length - 1;
  const win = !free && !demoLike && (stage === "win" || (stage === "idle" && last));
  const asking = !free && !demoLike && stage === "ask";
  const sc: any = piScene(n, kind, item);

  /* the board is keyed to the ENTRY (PATTERNS 18): a new question, the warm-up or free play starts a fresh board */
  const qk = n + ":" + (free ? "f" : demoLike ? "w" : String(index));
  const ent = useRef({ qk: "", n: 0 });
  if (ent.current.qk !== qk) ent.current = { qk, n: ent.current.n + 1 };
  const eN = ent.current.n;
  const fresh = { e: eN, ml: kind === "share" ? 1000 : 0, used: [], poured: {}, placed: {}, sel: null, unit: null, mark: null, labels: {},
    moving: null, pouring: null, stream: null, last: null, demo: null, replay: false, ever: false, t: 0 };
  const [raw, setRaw] = useState<any>(null);
  const SR = useRef<any>(null);
  if (!SR.current || SR.current.e !== eN) SR.current = raw && raw.e === eN ? raw : fresh;
  const S = SR.current;
  const put = (patch: any) => {
    if (ent.current.n !== eN) return;
    const b = SR.current && SR.current.e === eN ? SR.current : fresh;
    const nx = { ...b, ...(typeof patch === "function" ? patch(b) : patch) };
    SR.current = nx;
    setRaw(nx);
  };
  const stageRef = useRef(stage);
  stageRef.current = stage;

  /* did the child do the question's act on the board? */
  const doneOf = (s: any) => {
    if (kind === "unit") return !!s.poured.cup;
    if (kind === "tag") return !!s.poured.bucket;
    if (kind === "pair") return !!(s.poured.packet && s.poured.drum);
    if (kind === "count" || kind === "glasses") return s.ml >= 1000;
    if (kind === "share") return s.ml <= 0;
    if (kind === "read") return s.ml === 140;
    if (kind === "half") return s.ml === 500 && s.mark === 500;
    if (kind === "about") return s.ml === 500;
    if (kind === "pan") return s.ml >= 560;
    if (kind === "sort") return item.objs.every((o: any) => s.placed[o.id]);
    return true;
  };
  const done = doneOf(S);

  /* THE GATE (PATTERNS 19): one source of truth. Locked while the question still needs its act, the child has touched the
     board for real (a tap here, or a real Enter on a guide step) and the act was never complete on this entry; and while a
     correction plays (taps and keys wait for it). The agent's toolApi never touches the board, so it is never gated. */
  const real = useRef(false);
  /* the gate arms 450 ms after a question opens: the pointerup of the tap on the Next key that opened it must not land on a dimmed
     Answer key (the runtime would nudge the act instead of showing the question) */
  const armAt = useRef({ e: 0, t: 0 });
  if (armAt.current.e !== eN) armAt.current = { e: eN, t: Date.now() + 450 };
  useEffect(() => {
    const block = (e: any) => { const t = e && e.target; if (Date.now() < armAt.current.t && t && t.closest && t.closest('[data-zone="ask"]')) e.stopPropagation(); };
    const kinds = ["pointerdown", "pointerup", "mousedown", "mouseup", "click", "touchstart", "touchend"];
    kinds.forEach((k) => window.addEventListener(k, block, true));
    return () => kinds.forEach((k) => window.removeEventListener(k, block, true));
  }, []);
  const want = (asking && real.current && !S.ever && !done) || (asking && S.replay);
  const held = useRef(false);
  const syncLock = (w: boolean) => {
    if (w && !held.current) { held.current = true; api.lock(true); }
    else if (!w && held.current) { held.current = false; api.lock(false); }
  };
  useEffect(() => { syncLock(want); });
  useEffect(() => () => { if (held.current) { held.current = false; api.lock(false); } }, [eN]);
  useEffect(() => { if (asking && done && !S.ever) put({ ever: true }); }, [done, asking, eN]);
  useEffect(() => {
    /* a real Enter or Space on a guide step arms the gate (a trusted key only: the agent's check() never does) */
    const f = (e: any) => { if (e && e.isTrusted && (e.key === "Enter" || e.key === " ") && stageRef.current === "demo") real.current = true; };
    /* a tap on the dimmed Answer key while an act plays is kept: the keypad opens when the act has woken the key */
    const g = (e: any) => { const t = e && e.target; if (busy.current && t && t.closest && t.closest('[data-control="answer-open"]')) pendingOpen.current = true; };
    window.addEventListener("keydown", f, true);
    window.addEventListener("pointerdown", g, true);
    return () => { window.removeEventListener("keydown", f, true); window.removeEventListener("pointerdown", g, true); };
  }, []);
  const touch = () => {
    real.current = true;
    /* the first real tap arms the gate BEFORE the act starts, so the act's end never releases it (useActionKit keeps a lock held before it) */
    if (asking && !SR.current.ever && !doneOf(SR.current)) syncLock(true);
    if (asking) childActed.current.on = true;
  };

  /* a nudge goes back to the question after 3 s */
  const nudgeT = useRef<any>(0);
  const nudgeN = useRef({ e: 0, n: 0 });
  const nudge = (kind0: string) => {
    if (nudgeN.current.e !== eN) nudgeN.current = { e: eN, n: 0 };
    const forms = PI_NUDGE[kind0] || [kind0];
    const line = forms[((index || 0) + nudgeN.current.n++) % forms.length];
    api.say(line);
    clearTimeout(nudgeT.current);
    const e = eN, say = item && item.say;
    nudgeT.current = setTimeout(() => { if (ent.current.n === e && stageRef.current === "ask" && say) api.say(say); }, 3000);
  };
  useEffect(() => () => { clearTimeout(nudgeT.current); tl.stop(); }, [eN]);
  const nudgeRef = useRef<any>(() => {});
  nudgeRef.current = nudge;
  /* the act each question waits for, named when the child taps a locked key */
  const ACTK: any = { unit: "actCup", tag: "bucketFirst", pair: "actPair", count: "actCount", share: "actShare", read: "actRead", half: "actHalf", about: "actAbout", glasses: "actGlasses", pan: "actPan", sort: "allPlaced" };
  const gateNow = useRef<any>({ locked: false, key: "" });
  gateNow.current = { locked: asking && held.current && !S.replay && !done, key: ACTK[kind] || "" };
  /* after the CHILD's act (not the agent's check): the cue the runtime keeps unprinted under keyOnly, once a question; then, when the keypad
     opens, the typing or choosing cue; a stale nudge goes with it */
  const childActed = useRef({ e: 0, on: false });
  if (childActed.current.e !== eN) childActed.current = { e: eN, on: false };
  const cueSaid = useRef(0);
  const cueArmed = useRef(false);
  useEffect(() => {
    if (!asking || !done || !childActed.current.on || cueSaid.current === eN || S.replay || wrong) return;
    cueSaid.current = eN;
    clearTimeout(nudgeT.current);
    if (item.pad === "enter") { if (kind === "tag") api.say("Now tap mL or L."); return; }
    api.say("Now tap the Answer key.");
    cueArmed.current = true;
  }, [done, asking, eN]);
  useEffect(() => {
    if (!asking || !box || !box.open || !cueArmed.current || wrong) return;
    cueArmed.current = false;
    api.say(item.choices ? "Choose your answer." : "Type your answer, then press Enter.");
  }, [box && box.open]);

  /* acts go one at a time; a tap made while one plays is queued, never dropped */
  const busy = useRef(false);
  const queue = useRef<any[]>([]);
  const pendingOpen = useRef(false);
  const curSrc = useRef<any>(null);
  /* a LOCKED question (the gate) names its act: a real tap on the dimmed Answer key, the Hint key, a digit key or a choice, a real digit or
     Enter (not on a board control, whose Enter is the act itself) shows the act's nudge (after the runtime's own response, so it stays) */
  useEffect(() => {
    const show = () => { const g = gateNow.current; if (g.locked && g.key) setTimeout(() => { if (gateNow.current.locked) nudgeRef.current(g.key); }, 90); };
    const onUp = (e: any) => { const t = e && e.isTrusted && e.target; if (t && t.closest && t.closest('[data-control="answer-open"], [data-control="again"], [data-control^="key-"], [data-control^="choice-"]')) show(); };
    const onKey = (e: any) => {
      if (!e || !e.isTrusted || !(/^[0-9]$/.test(e.key) || e.key === "Enter")) return;
      const a: any = document.activeElement;
      if (e.key === "Enter" && a && a.closest && a.closest('[data-zone="work"] [data-control]')) return;
      show();
    };
    window.addEventListener("pointerup", onUp, true);
    window.addEventListener("keydown", onKey, true);
    return () => { window.removeEventListener("pointerup", onUp, true); window.removeEventListener("keydown", onKey, true); };
  }, []);
  const srcBoxes = useRef<any[]>([]);
  const tapSrc = useRef<any>(null);
  useEffect(() => {
    const up = (e: any) => {
      if (!busy.current || !e || !e.isTrusted) return;
      const zone: any = document.querySelector('[data-zone="work"]');
      const m = zone && zone.getScreenCTM && zone.getScreenCTM();
      if (!m) return;
      const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
      const b = srcBoxes.current.find((r: any) => p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h);
      if (b && tapSrc.current) tapSrc.current(b.s);
    };
    window.addEventListener("pointerup", up, true);
    return () => window.removeEventListener("pointerup", up, true);
  }, []);
  /* KEYBOARD FOCUS. The runtime's usePress drops focus to BODY after Enter or Space, so a child who Tabs to a board control would Tab
     again from the top after every act. After Enter or Space on a board control, focus stays on that control while its act plays, then
     goes to what the lesson waits for next (focusPlan): the next guide step's control, the next full container or shelf container,
     the Answer key (the Enter key, or the first unit tag) once the act is done, the keypad's Enter key or first choice once the keypad
     is open, the Next key at the win. Never BODY, and never a board control while the answer waits (it would swallow the submitting
     Enter). A mouse or a finger ends it (pointerdown), so pointer play is untouched. */
  const kb = useRef<any>({ id: "", held: "" });
  const focusPlan = useRef<string>("=");
  const ctlEl = (id: string): any => (id ? document.querySelector('[data-control="' + id + '"]') : null);
  const refocus = (final: boolean) => {
    const k = kb.current;
    if (!k.id) return;
    const a: any = document.activeElement;
    const mine = !a || a === document.body || (!!k.held && !!a.getAttribute && a.getAttribute("data-control") === k.held);
    if (!mine) return;
    /* right after the key (the runtime's blur): only put back what was dropped, never move a focus already placed */
    const want = final ? focusPlan.current : "=";
    if (want === "=") {
      if (!a || a === document.body) { const el = ctlEl(k.held) || ctlEl(k.id); if (el && el.focus) el.focus({ preventScroll: true }); }
      return;
    }
    const el = ctlEl(want);
    if (el && el.focus) { if (el !== a) el.focus({ preventScroll: true }); k.held = want; return; }
    /* nothing on the board to wait on (the win): onto the Next key, else off the board */
    const nx = ctlEl("next-key");
    if (nx && nx.focus) { nx.focus({ preventScroll: true }); k.held = "next-key"; }
    else if (a && a !== document.body && a.blur) { a.blur(); k.held = ""; }
  };
  const refocusRef = useRef<any>(refocus);
  refocusRef.current = refocus;
  useEffect(() => {
    const onKey = (e: any) => {
      if (!e || !e.isTrusted || !(e.key === "Enter" || e.key === " ")) return;
      const c = e.target && e.target.closest && e.target.closest('[data-zone="work"] [data-control]');
      if (!c) {
        /* a key of the runtime's (the Answer key, a keypad or choice key, the Next key) pressed by a keyboard child: put focus where
           the lesson waits next once it has acted */
        const r = e.target && e.target.closest && e.target.closest("[data-control]");
        if (r && kb.current.id) [80, 300, 900].forEach((ms) => setTimeout(() => { if (!busy.current) refocusRef.current(true); }, ms));
        return;
      }
      const id = c.getAttribute("data-control");
      kb.current = { id, held: id };
      setTimeout(() => refocusRef.current(false), 0);
      setTimeout(() => refocusRef.current(false), 120);
    };
    const onPtr = (e: any) => { if (e && e.isTrusted) kb.current = { id: "", held: "" }; };
    window.addEventListener("keydown", onKey, true);
    window.addEventListener("pointerdown", onPtr, true);
    return () => { window.removeEventListener("keydown", onKey, true); window.removeEventListener("pointerdown", onPtr, true); };
  }, []);
  /* after a render with no act playing (a step done, a tag chosen, a container placed, the keypad opened, the win) */
  useEffect(() => {
    if (!kb.current.id || busy.current) return;
    /* the Next key comes a moment after the win: try again then */
    const ts = (focusPlan.current === "" ? [60, 500, 1500] : [60]).map((ms) => setTimeout(() => { if (!busy.current) refocusRef.current(true); }, ms));
    return () => ts.forEach((t) => clearTimeout(t));
  });
  const go = (fn: () => Promise<any>) => {
    if (busy.current) { queue.current.push({ fn, e: eN }); return; }
    busy.current = true;
    const e = eN;
    fn().then(() => {
      busy.current = false;
      /* the taps queued while it ran, in order (each decides its own target when it runs) */
      queue.current = queue.current.filter((q: any) => q.e === ent.current.n);
      const q = queue.current.shift();
      if (q) { go(q.fn); return; }
      setTimeout(() => { if (!busy.current) refocusRef.current(true); }, 80);
      if (pendingOpen.current) {
        pendingOpen.current = false;
        if (ent.current.n === e && stageRef.current === "ask" && doneOf(SR.current) && typeof api.openAnswer === "function") setTimeout(() => api.openAnswer(), 150);
      }
    });
  };

  /* a correction left a demo picture: the child's next act starts from it (the child finishes the working) */
  const adopt = () => {
    const s = SR.current;
    if (!s.demo || s.replay) return;
    const d = s.demo;
    put({ demo: null, ...(d.ml !== undefined ? { ml: d.ml } : {}), ...(d.used ? { used: d.used } : {}) });
  };

  /* POUR: the hand carries the source to the jug and tips it; the water moves from where it stands to `to` in steps of about
     50 mL, each step at one point of the act (onPoint), so the level always shows exactly what has been poured */
  const J: any = sc.jug || null;
  const brimOf = (j: any) => j.brim;
  const pour = (src: any, to: number, extra: any = {}) => () => {
    const from = SR.current.ml, diff = to - from;
    const big = Math.abs(diff) > 1000;
    const k = Math.max(1, Math.min(20, Math.round(Math.abs(big ? 1500 : diff) / 50)));
    const tgt = { x: J.x + J.bw / 2, y: brimOf(J) - 10 };
    const at = Array.from({ length: k }, (_, i) => ({ x: tgt.x + 40 - (80 * i) / Math.max(1, k - 1), y: tgt.y }));
    const home = { x: src.cx, y: src.yb - src.h * 0.6 };
    curSrc.current = src.id;
    put({ moving: src.id, pouring: null });
    return api.act({ tool: "hand", moves: "carry", from: home, at, to: home, ms: 1100,
      onPoint: (i: number) => put({ ml: Math.round(from + (diff * (i + 1)) / k), pouring: src.id }) })
      .then((ok: boolean) => {
        put((b: any) => ({ moving: null, pouring: null, ...(ok ? { ml: to, ...(typeof extra === "function" ? extra(b) : extra) } : {}) }));
        if (ok) api.sfx.settle();
        return ok;
      });
  };
  /* the jug poured OUT into a cup (phase 2's share): the hand taps the cup while the stream runs from the jug's lip */
  const pourOut = (src: any) => () => {
    const from = SR.current.ml, to = Math.max(0, from - src.cap), k = 4;
    curSrc.current = src.id;
    put({ stream: src.id });
    return api.act({ tool: "hand", moves: "tap", at: Array.from({ length: k }, (_, i) => ({ x: src.cx - 12 + 8 * i, y: src.yb - src.h - 18 })), ms: 1000,
      onPoint: (i: number) => put({ ml: Math.round(from - ((from - to) * (i + 1)) / k) }) })
      .then((ok: boolean) => {
        put((b: any) => ({ stream: null, ...(ok ? { ml: to, used: b.used.concat([src.id]) } : {}) }));
        if (ok) api.sfx.settle();
        return ok;
      });
  };
  /* empty the jug: the hand taps it and the water goes down in steps */
  const empty = () => {
    const from = SR.current.ml, k = 5;
    return api.act({ tool: "hand", moves: "tap", at: Array.from({ length: k }, (_, i) => ({ x: J.x + J.bw / 2 - 30 + 15 * i, y: J.yb - 120 })), ms: 1000,
      onPoint: (i: number) => put({ ml: Math.round(from - (Math.min(from, 1500) * (i + 1)) / k) * (i === k - 1 ? 0 : 1) }) })
      .then((ok: boolean) => { if (ok) put({ ml: 0 }); return ok; });
  };
  /* phase 4: the hand carries the picked container into a bin */
  const toBin = (id: string, bin: string) => () => {
    const src = sc.srcs.find((s: any) => s.id === id);
    const k = PI_BINS.findIndex((b) => b.id === bin), B = PI_BIN(k);
    const rows = Object.keys(SR.current.placed).filter((x) => x !== id && SR.current.placed[x].bin === bin).length;
    const R = PI_ROW(B, Math.min(3, rows));
    const from = { x: src.cx, y: src.yb - src.h * 0.5 };
    return api.act({ tool: "hand", moves: "carry", from, at: [{ x: R.x + 40, y: R.y + 38 }], ms: 1000,
      onPoint: () => put((b: any) => ({ placed: { ...b.placed, [id]: { bin, t: b.t + 1 } }, t: b.t + 1, sel: null })) })
      .then((ok: boolean) => { if (ok) { api.sfx.tick(); put((b: any) => ({ placed: { ...b.placed, [id]: b.placed[id] || { bin, t: b.t + 1 } }, t: b.t + 1, sel: null })); } return ok; });
  };

  /* ── the guide steps: done when the child does them, reported with api.did ── */
  const stepAct = (name: string) => {
    if (stage !== "demo" || !stepOn) return;
    if (name !== stepOn) { api.did(name); return; }
    if (busy.current) return;   /* safe to start twice */
    const src = (id: string) => sc.srcs.find((s: any) => s.id === id);
    if (n === 1 && name === "pour-bottle") go(() => pour(src("bottle"), 1000, { poured: { bottle: true } })().then((ok: boolean) => { if (ok) api.did(name); }));
    else if (n === 1 && name === "empty") go(() => empty().then((ok: boolean) => { if (ok) api.did(name); }));
    else if (n === 2) {
      const s = src(name.replace("pour-", ""));
      go(() => pour(s, SR.current.ml + s.cap, (b: any) => ({ used: b.used.concat([s.id]) }))().then((ok: boolean) => { if (ok) api.did(name); }));
    } else if (n === 3 && name === "mark-250") go(() => pour(src("bottle"), 250, (b: any) => ({ mark: 250, labels: { ...b.labels, 250: true } }))().then((ok: boolean) => { if (ok) api.did(name); }));
    else if (n === 4 && name === "pick-pot") { put({ sel: "pot" }); api.sfx.tick(); api.did(name); }
    else if (n === 4 && name === "bin-more") go(() => toBin("pot", "more")().then((ok: boolean) => { if (ok) api.did(name); }));
  };
  /* every tap on a control: during a guide step it is that step's act (or a wrong act, which shows the step's hint) */
  const tap = (name: string, fn: () => void) => () => {
    real.current = true;
    if (stage === "demo") { stepAct(name); return; }
    if (S.replay) return;   /* the board takes no tap while the correction plays */
    touch();
    fn();
  };

  /* ── the question's own acts ── */
  const full = (s: any) => (kind === "pan" ? s.ml >= MODEL.fill.line : s.ml >= 1000);
  /* every decision is taken when the pour RUNS (a tap made during a pour is queued by go(): its jug level, its used vessel and a full
     jug are read then, never at the tap), and a second tap on the source that is pouring right now counts once */
  const late = (fn: () => any) => () => { const r = fn(); return r && r.then ? r : Promise.resolve(false); };
  const onSource = (src: any) => {
    if (busy.current && curSrc.current === src.id) return;
    if (free) { go(late(() => pour(src, SR.current.ml + src.cap)())); return; }
    if (!asking) return;
    adopt();
    if (kind === "unit" || kind === "tag" || kind === "pair") {
      /* each container is measured on its own: the jug is emptied first (the hand empties it, an act of its own) */
      const fill = () => pour(src, src.cap, (b: any) => ({ poured: { ...b.poured, [src.id]: true }, last: src.id }))();
      go(() => (SR.current.ml > 0 ? empty().then((ok: boolean) => (ok ? fill() : false)) : fill()));
      return;
    }
    if (kind === "count" || kind === "glasses" || kind === "pan") {
      go(late(() => {
        const s = SR.current;
        if (s.used.indexOf(src.id) >= 0) { nudge("emptyOne"); return null; }
        if (full(s)) { nudge(kind === "pan" ? "lineFull" : "jugFull"); return null; }
        return pour(src, s.ml + src.cap, (b: any) => ({ used: b.used.concat([src.id]), labels: kind === "glasses" ? { ...b.labels, ...(b.ml <= 500 ? { [b.ml]: true } : {}) } : b.labels }))();
      }));
      return;
    }
    if (kind === "share") {
      go(late(() => {
        const s = SR.current;
        if (s.used.indexOf(src.id) >= 0) { nudge("cupFull"); return null; }
        if (s.ml <= 0) { nudge("jugEmpty"); return null; }
        return pourOut(src)();
      }));
      return;
    }
    if (kind === "read") {
      go(late(() => (SR.current.ml >= 140 ? (nudge("readNow"), null) : pour(src, 140, { poured: { teacup: true } })())));
      return;
    }
    if (kind === "about") {
      go(late(() => (SR.current.ml >= 500 ? (nudge("cartonEmpty"), null) : pour(src, 500, { poured: { carton: true } })())));
    }
  };
  const onMark = (v: number) => {
    if (!asking) return;
    adopt();
    const src = sc.srcs[0];
    if (SR.current.ml === v) { put({ mark: v }); if (v !== 500) nudge("middleMark"); return; }
    /* a lower mark: the jug is emptied first (never a tipped bottle while the water falls), then filled to the mark */
    const fillTo = () => pour(src, v, (b: any) => ({ mark: v, labels: { ...b.labels, [v]: true } }))().then((ok: boolean) => { if (ok && v !== 500) nudge("middleMark"); return ok; });
    go(() => (SR.current.ml > v ? empty().then((ok: boolean) => (ok ? fillTo() : false)) : fillTo()));
  };
  const onTag = (u: string) => {
    if (!asking) return;
    if (!SR.current.poured.bucket) { nudge("bucketFirst"); return; }
    put({ unit: u });
    api.sfx.tick();
  };
  /* phase 4: pick a container (a tap, or Enter on it), then a bin; or drag it straight into a bin */
  const pick = (id: string) => {
    real.current = true;
    if (stage === "demo") { stepAct("pick-" + id); return; }
    if (!asking || S.replay) return;
    touch();
    put((b: any) => ({ sel: b.sel === id ? null : id, demo: null }));
    api.sfx.tick();
  };
  const onBin = (bin: string) => {
    real.current = true;
    if (stage === "demo") { stepAct("bin-" + bin); return; }
    if (!asking || S.replay) return;
    touch();
    const id = SR.current.sel;
    if (SR.current.demo) put({ demo: null });
    if (!id) { nudge("pickFirst"); return; }
    go(toBin(id, bin));
  };
  const binAt = (p: any) => { for (let k = 0; k < 3; k++) { const B = PI_BIN(k); if (p.x >= B.x && p.x <= B.x + B.w && p.y >= B.y - 20 && p.y <= B.y + B.h + 20) return PI_BINS[k].id; } return null; };
  const drag = useDrag((id: any, p: any, moved: boolean) => {
    if (!moved || !isFinite(p.x)) { pick(id); return; }
    if (stage === "demo") { stepAct("pick-" + id); return; }
    if (!asking || S.replay) return;
    touch();
    const bin = binAt(p);
    if (bin) { put((b: any) => ({ placed: { ...b.placed, [id]: { bin, t: b.t + 1 } }, t: b.t + 1, sel: null, demo: null })); api.sfx.tick(); }
    else put((b: any) => { const pl = { ...b.placed }; delete pl[id]; return { placed: pl, sel: null, demo: null }; });
  });

  /* Enter: a guide step's act, or the answer made on the board (the unit tag, the bins) */
  const sortValue = (s: any) => item.objs.map((o: any) => (s.placed[o.id] ? s.placed[o.id].bin : "")).join(",");
  const enterBoard = () => {
    const s = SR.current;
    if (s.replay) return;
    if (kind === "tag") {
      if (!s.poured.bucket) { nudge("bucketFirst"); return; }
      if (!s.unit) { nudge("tagFirst"); return; }
      api.submit(s.unit);
      return;
    }
    if (kind === "sort") {
      if (!item.objs.every((o: any) => s.placed[o.id])) { nudge("allPlaced"); return; }
      api.submit(sortValue(s));
    }
  };
  api.onEnter(stage === "demo" && stepOn ? () => stepAct(stepOn) : asking && item.pad === "enter" ? enterBoard : null);
  const ready = asking && item.pad === "enter" && (kind === "tag" ? !!(S.unit && S.poured.bucket) : kind === "sort" ? done : false);
  useEffect(() => { if (asking && item.pad === "enter") api.answerReady(ready); }, [ready, asking, eN]);

  /* the agent and the dev driver */
  HOOK.demo = () => stepAct(stepOn);
  HOOK.set = (v: any) => {
    if (kind === "tag") { put((b: any) => ({ unit: String(v).trim() === "mL" || String(v).toLowerCase() === "ml" ? "mL" : "L", poured: { ...b.poured, bucket: true }, ml: 10000, last: "bucket", ever: true })); return true; }
    if (kind === "sort") {
      const bins = String(v).split(",").map((x) => x.trim().toLowerCase());
      const pl: any = {};
      item.objs.forEach((o: any, i: number) => { if (MODEL.bins.indexOf(bins[i]) >= 0) pl[o.id] = { bin: bins[i], t: i + 1 }; });
      put({ placed: pl, t: item.objs.length + 1, sel: null, ever: true });
      return true;
    }
    return undefined;
  };
  HOOK.check = () => {
    if (stageRef.current !== "ask" || free) return undefined;
    if (!doneOf(SR.current) && kind !== "sort") put({ ...piTarget(kind, item), demo: null, ever: true });
    return undefined;
  };

  /* ── the correction: replay the working and stop ONE step before the answer (MISS HIDES THE ANSWER) ── */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    const seq: any[] = [];
    const add = (ms: number, d: any) => seq.push([ms, d]);
    /* one container poured again: it tips over the jug (moving), the water rises in steps, then it goes home */
    const rise = (from: number, to: number, stepMl: number, src: string | null, more: any = {}) => {
      for (let v = from + stepMl; stepMl > 0 ? v <= to + 0.1 : v >= to - 0.1; v += stepMl) add(110, { ml: Math.round(v), moving: src, pouring: src, ...more });
    };
    const home = (ml: number, more: any = {}) => add(450, { ml, moving: null, pouring: null, stream: null, ...more });
    let first: any = { ml: 0, used: [] };
    if (kind === "unit") { rise(0, 200, 50, "cup"); home(200, { poured: { cup: true } }); }
    else if (kind === "tag") { rise(0, 1000, 250, "bucket"); add(300, { ml: 1500, moving: "bucket", pouring: "bucket" }); home(1500, { poured: { bucket: true } }); }
    else if (kind === "pair") {
      rise(0, 200, 50, "packet"); home(200, { poured: { packet: true } });
      rise(200, 0, -50, null, { poured: { packet: true } });                                  /* the jug is emptied before the next container */
      rise(0, 1000, 250, "drum", { poured: { packet: true } }); add(300, { ml: 1500, moving: "drum", pouring: "drum", poured: { packet: true } }); home(1500, { poured: { packet: true, drum: true } });
    }
    else if (kind === "count") { rise(0, 500, 50, "vessel-1"); home(500, { used: ["vessel-1"], count: 1 }); }
    else if (kind === "share") {
      first = { ml: 1000, used: [] };
      const u: string[] = [];
      for (let c = 0; c < 4; c++) {
        for (let v = 1000 - 200 * c - 50; v >= 800 - 200 * c; v -= 50) add(110, { ml: v, used: u.slice(), stream: "cup-" + (c + 1) });
        u.push("cup-" + (c + 1)); home(800 - 200 * c, { used: u.slice(), count: c + 1 });
      }
    }
    /* the reading: the water stays where the child poured it; the marks are counted from the bottom, one short of the water */
    else if (kind === "read") { first = { ml: 140, lit: 0 }; for (let v = 20; v <= 120; v += 20) add(300, { ml: 140, lit: v }); }
    /* half a litre: first to the quarter mark (its word lit), then on to the 400 mL mark, one mark short of the middle */
    else if (kind === "half" || kind === "about") {
      const src = kind === "about" ? "carton" : "bottle";
      first = { ml: 0, labels: {} };
      rise(0, 250, 50, src, { labels: {} });
      add(600, { ml: 250, moving: null, pouring: null, labels: { 250: true } });
      rise(250, 400, 50, src, { labels: { 250: true } });
      home(400, { labels: { 250: true } });
    }
    else if (kind === "glasses") {
      const u: string[] = [], lb: any = {};
      for (let g = 0; g < 3; g++) { rise(250 * g, 250 * (g + 1), 50, "glass-" + (g + 1), { used: u.slice(), labels: { ...lb } }); u.push("glass-" + (g + 1)); lb[250 * (g + 1)] = true; home(250 * (g + 1), { used: u.slice(), count: g + 1, labels: { ...lb } }); }
    }
    else if (kind === "pan") {
      const u: string[] = [];
      for (let g = 0; g < 3; g++) { rise(140 * g, 140 * (g + 1), 35, "teacup-" + (g + 1), { used: u.slice() }); u.push("teacup-" + (g + 1)); home(140 * (g + 1), { used: u.slice(), count: g + 1 }); }
    }
    else if (kind === "sort") { first = { fact: true }; }
    /* the miss emptied the slot (the runtime); the board answer empties too: the chosen tag, every bin */
    syncLock(true);   /* keys and the pad are dead while the correction plays (no digit lands, no half replay is answered) */
    put({ replay: true, demo: first, sel: null, ...(kind === "tag" ? { unit: null } : {}), ...(kind === "sort" ? { placed: {} } : {}) });
    tl.run([[200, () => {}], ...seq.map(([ms, d]: any) => [ms, () => put({ demo: d })])], () => put({ replay: false }));
  }, [wrong]);

  /* the win line (keyOnly: at a phase's last question the runtime shows the closing instead) */
  const saidWin = useRef("");
  useEffect(() => { if (stage === "win" && !free && item && item.win && saidWin.current !== qk) { saidWin.current = qk; api.say(item.win); } }, [stage, qk]);

  api.share({ phase: n, kind, acted: !!done, complete: stage === "idle" });

  /* ── what is drawn: the child's board, the correction's picture over it, or the act's target at the win ── */
  const V: any = win ? { ...S, ...piTarget(kind, item), demo: null } : S.demo ? { ...S, ...S.demo } : S;
  if (win && kind === "tag") V.unit = "L";
  const used = (id: string) => (V.used || []).indexOf(id) >= 0;
  const kx = box && box.key ? box.key.x - 12 : (box ? box.w : 1472);

  /* the one invite: the control the guide step names, else the next thing to act on until the act is done */
  let inviteOn: string | null = null;
  if (stage === "demo" && stepOn) inviteOn = stepOn;
  else if (asking && !done && !S.replay && !S.demo) {
    if (kind === "half") inviteOn = "mark-500";
    else if (kind === "sort") inviteOn = S.sel ? null : "pick-" + (item.objs.find((o: any) => !S.placed[o.id]) || {}).id;
    else if (kind === "pair") inviteOn = "pour-" + (S.poured.packet ? "drum" : "packet");
    else if (kind === "share") inviteOn = "fill-" + (sc.srcs.find((s: any) => !used(s.id)) || {}).id;
    else { const nx = sc.srcs.find((s: any) => !used(s.id)); inviteOn = nx ? (kind === "count" || kind === "glasses" || kind === "pan" ? "pour-" + nx.id : "pour-" + nx.id) : null; }
  }

  /* where keyboard focus goes next ("=" keeps it, "" leaves the board): see KEYBOARD FOCUS */
  focusPlan.current = (() => {
    if (box && box.open) return !asking ? "=" : item.choices ? "choice-" + item.choices[0].id : "key-enter";
    if (stage === "demo") return stepOn || "=";
    if (free) return "=";
    if (!asking) return "";
    if (S.replay || S.demo) return "=";
    if (done) return kind === "tag" && !V.unit ? "tag-ml" : item.pad === "enter" ? "answer-enter" : "answer-open";
    return inviteOn || "=";
  })();

  const motion = !reducedMotion();
  const ctlOf =(s: any) => (kind === "share" ? "fill-" + s.id : stage === "demo" && n === 2 ? "pour-" + s.id : "pour-" + s.id);

  /* a source container, standing at home or tipped over the jug while it pours */
  const drawSource = (s: any) => {
    const moving = V.moving === s.id;
    if (s.hideOpen && box && box.open && !moving) return null;
    const aspect = PI_ASPECT[s.obj] || 0.7;
    const tgtJ = J ? { x: J.x + J.bw / 2 + 50, y: brimOf(J) - 4 } : { x: s.cx, y: s.yb - s.h };
    const ps = Math.min(1, 140 / s.h);
    const tf = moving ? piPose(tgtJ.x, tgtJ.y, -100, ps, s.h) : piPose(s.cx, s.yb - s.h, 0, 1, s.h);
    const isFull = kind === "share" ? used(s.id) : !used(s.id) && !(V.poured && V.poured[s.id] && kind !== "free") && !(kind === "read" && V.ml >= 140) && !(kind === "about" && V.ml >= 500);
    /* ONE rule: a poured container you cannot see into (cup, teacup, bottle, bucket, drum, packet, carton) fades; a glass shows its own water */
    const dim = (kind === "share" ? false : !isFull) && !moving && !!PI_OPAQUE[s.obj];
    return (
      <g key={"s" + s.id} style={{ transform: tf, transition: motion ? "transform 0.4s ease" : "none" } as any} opacity={dim ? 0.55 : 1}>
        {piObj(s.obj, s.h, isFull)}
      </g>
    );
  };

  /* the sources' tags (the Given capacity, deep blue) */
  /* a source's Given capacity: under it, or over it (up) where its neighbours stand close, so no two tags touch in any language */
  /* an up tag stands 16 clear above the tallest container its width reaches (its own or a neighbour's: a wider Hindi or Gujarati tag
     reaches further) */
  const srcTag = (s: any) => {
    if (!s.tag) return null;
    const lab = piMl(s.cap, tx), tw = Math.max(76, Math.round(String(lab).length * T.label * 0.58 + 20)), th = Math.round(T.label * 1.5);
    let cy = s.yb + (s.ty || 48);
    if (s.up) {
      let top = s.yb - s.h;
      sc.srcs.forEach((o: any) => { const ow = o.h * (PI_ASPECT[o.obj] || 0.7) / 2; if (o.cx + ow + 16 > s.cx - tw / 2 && o.cx - ow - 16 < s.cx + tw / 2) top = Math.min(top, o.yb - o.h); });
      cy = top - 16 - th / 2;
    }
    return <g key={"g" + s.id}>{piTag(s.cx, cy, lab, PI_C.blue, "#FFFFFF", T.label)}</g>;
  };
  const srcHit = (s: any) => {
    if (s.still) return null;
    const w = Math.min(s.hw || 999, Math.max(96, s.h * (PI_ASPECT[s.obj] || 0.7) + 16)), h = Math.max(96, s.h + 16);
    const id = ctlOf(s);
    return <Hit key={"h" + s.id} id={id} x={s.cx - w / 2} y={s.yb - s.h - 8} w={w} h={h} label={tx(PI_NAME[s.obj] || s.obj)}
      onPress={tap(id, () => onSource(s))} />;
  };
  const inviteFor = (s: any) => {
    const id = ctlOf(s);
    if (inviteOn !== id) return null;
    const w = Math.min(s.hw || 999, Math.max(96, s.h * (PI_ASPECT[s.obj] || 0.7) + 16)), h = Math.max(96, s.h + 16);
    return <Invite key={"i" + s.id} x={s.cx} y={s.yb - s.h / 2} w={w} h={h} rx={16} C={C} />;
  };

  /* the sources' tap boxes, for a tap made while a pour runs (the act layer takes that pointer: the window listener finds the source and queues it) */
  srcBoxes.current = sc.shelf ? [] : sc.srcs.filter((s: any) => !s.still).map((s: any) => { const w = Math.min(s.hw || 999, Math.max(96, s.h * (PI_ASPECT[s.obj] || 0.7) + 16)), h = Math.max(96, s.h + 16); return { x: s.cx - w / 2, y: s.yb - s.h - 8, w, h, s }; });
  tapSrc.current = (s: any) => tap(ctlOf(s), () => onSource(s))();

  /* ── phase 4: the shelf and the three bins ── */
  if (sc.shelf) {
    const objs = sc.srcs;
    const pl = V.placed || {};
    const rowsOf = (bin: string) => Object.keys(pl).filter((id) => pl[id].bin === bin).sort((a, b) => pl[a].t - pl[b].t);
    const fact = V.fact || win;
    const dragging = drag.drag && drag.drag.moved ? drag.drag : null;
    const cellW = 610 / objs.length;
    const tagSize = T.label;
    /* where each container's control is: its shelf box (never wider than its cell), or its row in a bin */
    const boxOf = (s: any) => {
      const p = pl[s.id];
      if (p) { const k = PI_BINS.findIndex((b) => b.id === p.bin); return PI_ROW(PI_BIN(k), rowsOf(p.bin).indexOf(s.id)); }
      /* the container's own box plus 8 (the pot's handles, the drum's rim), never wider than its cell */
      const ow = s.h * (PI_ASPECT[s.obj] || 0.7);
      const w = Math.min(cellW - 6, Math.max(Math.min(176, cellW - 12), ow + 16));
      return { x: s.cx - w / 2, y: s.yb - s.h - 24, w, h: s.h + 24 };
    };
    /* the capacity tags in ONE row under the shelf (x 20 to 634), 16+ apart, each pushed only as far as it must and joined to its
       container by a leader line */
    const tagRow: any = {};
    (() => {
      const free = objs;   /* every container keeps its place in the row, placed or not */
      const ws = free.map((s: any) => Math.max(76, Math.round(String(piLabel(s.obj, s.show, tx)).length * tagSize * 0.58 + 20)));
      const L = free.map((s: any, i: number) => s.cx - ws[i] / 2);
      for (let i = 0; i < L.length; i++) { L[i] = Math.max(L[i], 20); if (i > 0) L[i] = Math.max(L[i], L[i - 1] + ws[i - 1] + 16); }
      for (let i = L.length - 1; i >= 0; i--) { const R = i === L.length - 1 ? 634 : L[i + 1] - 16; if (L[i] + ws[i] > R) L[i] = R - ws[i]; }
      free.forEach((s: any, i: number) => { tagRow[s.id] = L[i] + ws[i] / 2; });
    })();
    return (
      <g>
        <rect x={20} y={394} width={630} height={12} rx={6} fill={PI_C.table} />
        <rect x={20} y={406} width={630} height={4} rx={2} fill={PI_C.tableDark} opacity={0.35} />
        {PI_BINS.map((b, k) => {
          const B = PI_BIN(k);
          return (
            <g key={"b" + b.id}>
              <rect x={B.x} y={B.y + 78} width={B.w} height={B.h - 78} rx={18} fill="#FDFBF7" stroke={PI_C.ink} strokeWidth={3} />
              <rect x={B.x} y={B.y} width={B.w} height={74} rx={16} fill="#F5EAD9" stroke={PI_C.ink} strokeWidth={3} />
              <text x={B.x + B.w / 2} y={B.y + 37} textAnchor="middle" dominantBaseline="central" fontSize={T.label} fontWeight={700} fill={PI_C.ink}>{tx(b.label)}</text>
              {win && rowsOf(b.id).length > 0 && <rect data-reveals="answer" x={B.x - 5} y={B.y - 5} width={B.w + 10} height={B.h + 10} rx={22} fill="none" stroke={PI_C.green} strokeWidth={6} />}
            </g>
          );
        })}
        {fact && <g pointerEvents="none">{piFact(340, 47, tx)}</g>}
        {objs.map((s: any) => {
          const p = pl[s.id];
          const sel = V.sel === s.id;
          const dr = dragging && dragging.payload === s.id;
          const bx = boxOf(s);
          let tf = piPose(s.cx, s.yb - s.h - (sel ? 14 : 0), 0, 1, s.h);
          if (p) tf = piPose(bx.x + 44, bx.y + 3, 0, 72 / s.h, s.h);
          if (dr) tf = piPose(dragging.x, dragging.y - s.h * 0.4, 0, 0.8, s.h);
          return (
            <g key={"o" + s.id}>
              <g style={{ transform: tf, transition: motion && !dr ? "transform 0.35s ease" : "none" } as any}>
                {piObj(s.obj, s.h, s.obj !== "pot")}
              </g>
              {/* a dotted leader only where the tag stands well aside of its container (a short one read as a stray mark) */}
              {!p && !dr && Math.abs(tagRow[s.id] - s.cx) > 24 && <line x1={s.cx} y1={s.yb + 18} x2={tagRow[s.id]} y2={s.yb + 46} stroke={PI_C.blue} strokeWidth={3} strokeDasharray="2 6" strokeLinecap="round" />}
              {!p && !dr && piTag(tagRow[s.id], s.yb + 70, piLabel(s.obj, s.show, tx), PI_C.blue, "#FFFFFF", tagSize)}
              {/* the capacity in its bin row: 30, stepped down to fit 12+ inside the bin's outline in every language */}
              {p && <text ref={piFit(bx.w - 104, T.label - 2)} x={bx.x + 92} y={bx.y + 41} dominantBaseline="central" fontSize={T.label - 2} fontWeight={700} fill={PI_C.blue}>{piLabel(s.obj, s.show, tx)}</text>}
              {sel && !p && <rect x={bx.x} y={bx.y - 14} width={bx.w} height={bx.h} rx={18} fill="none" stroke={PI_C.blue} strokeWidth={5} pointerEvents="none" />}
            </g>
          );
        })}
        {/* the controls: each container (tap or drag; Enter picks it) and each bin's plate */}
        {objs.map((s: any) => {
          const bx = boxOf(s);
          return (
            <g key={"c" + s.id} {...control("pick-" + s.id, tx(PI_NAME[s.obj] || s.obj))} {...drag.bind(s.id)} {...drag.keys(s.id)} style={{ touchAction: "none", cursor: "pointer" } as any}>
              <rect x={bx.x} y={bx.y} width={bx.w} height={bx.h} fill="transparent" />
            </g>
          );
        })}
        {PI_BINS.map((b, k) => { const B = PI_BIN(k); return <Hit key={"hb" + b.id} id={"bin-" + b.id} x={B.x} y={B.y} w={B.w} h={76} label={tx(b.label)} onPress={() => onBin(b.id)} />; })}
        {inviteOn && inviteOn.indexOf("pick-") === 0 && (() => { const s = objs.find((o: any) => "pick-" + o.id === inviteOn); if (!s) return null; const bx = boxOf(s); return <Invite x={bx.x + bx.w / 2} y={bx.y + bx.h / 2} w={bx.w} h={bx.h} rx={18} C={C} />; })()}
        {inviteOn && inviteOn.indexOf("bin-") === 0 && (() => { const k = PI_BINS.findIndex((b) => "bin-" + b.id === inviteOn), B = PI_BIN(k); return <Invite x={B.x + B.w / 2} y={B.y + 37} w={B.w} h={74} rx={16} C={C} />; })()}
      </g>
    );
  }

  /* ── phases 1 to 3, phase 4's pan and free play: the jug (or the pan) and the sources ── */
  const Jd: any = J;
  const showMarks = !!sc.marks;
  const reveal: any = kind === "about" ? { 500: true } : {};
  const labels = { ...(V.labels || {}), ...(win && kind === "about" ? { 500: true } : {}) };
  const corr = S.demo && !win ? S.demo : null;
  const srcPouring = V.pouring && sc.srcs.find((s: any) => s.id === V.pouring);
  const streamSrc = V.stream && sc.srcs.find((s: any) => s.id === V.stream);
  const answerTag = (text: string, x: number, y: number) => { const t = tx("Answer") + ": " + text, w = t.length * T.label * 0.58 + 20, cx = Jd && y < 120 ? Math.max(x, piRightX(Jd) + w / 2) : x; return <g data-reveals="answer">{piTag(cx, y, t, PI_C.green, "#FFFFFF", T.label)}</g>; };
  const unitOf = (k: string) => tx(k);

  return (
    <g>
      {/* free play's table runs under the vessels at the far right (it is far below the key's corner) */}
      <rect x={10} y={436} width={sc.wide ? (box ? box.w : 1472) - 20 : sc.full ? Math.min(box ? box.w : 1472, kx) - 20 : 880} height={12} rx={6} fill={PI_C.table} />
      <rect x={10} y={448} width={sc.wide ? (box ? box.w : 1472) - 20 : sc.full ? Math.min(box ? box.w : 1472, kx) - 20 : 880} height={4} rx={2} fill={PI_C.tableDark} opacity={0.35} />
      {(sc.shelves || []).map((y: number) => (
        <g key={"sh" + y}>
          <rect x={sc.shelfX || 500} y={y} width={900 - (sc.shelfX || 500)} height={10} rx={5} fill={PI_C.table} />
          <rect x={sc.shelfX || 500} y={y + 10} width={900 - (sc.shelfX || 500)} height={3} rx={1.5} fill={PI_C.tableDark} opacity={0.35} />
        </g>
      ))}
      {Jd && piJug(Jd, V.ml, { tx, labels, reveal, stream: !!srcPouring, fill: sc.fill })}
      {/* the share: a stream from the jug's lip into the cup being filled */}
      {streamSrc && Jd && <path d={`M ${Jd.pic.x + PI_JP.lipR[0] * Jd.pic.w} ${Jd.pic.y + PI_JP.lipR[1] * Jd.pic.h} Q ${(Jd.pic.x + Jd.pic.w + streamSrc.cx) / 2} ${Jd.pic.y - 10} ${streamSrc.cx} ${streamSrc.yb - streamSrc.h - 6}`} fill="none" stroke={PI_C.water} strokeWidth={14} strokeLinecap="round" pointerEvents="none" />}
      {sc.srcs.map((s: any) => srcTag(s))}
      {/* a row of identical containers: ONE Given tag for all of them */}
      {sc.each && (() => { const t = tx(sc.each.key) + " " + piMl(sc.each.cap, tx), w = t.length * T.label * 0.58 + 20; return piTag(Math.min(sc.each.x, 896 - w / 2), sc.each.y, t, PI_C.blue, "#FFFFFF", T.label); })()}
      {sc.srcs.map((s: any) => drawSource(s))}
      {/* phase 1, the bucket: the two unit tags the answer is made on */}
      {sc.tags && sc.tags.map((t: any) => {
        const on = V.unit === t.id;
        const live = asking && !!V.poured.bucket && !S.replay;
        return (
          <g key={"t" + t.id}>
            <rect x={t.x} y={t.y} width={t.w} height={t.h} rx={22} fill={on ? "#E3EEF7" : "#FFFFFF"} stroke={on ? PI_C.blue : PI_C.ink} strokeWidth={on ? 6 : 3.5} />
            <text x={t.x + t.w / 2} y={t.y + t.h / 2} textAnchor="middle" dominantBaseline="central" fontSize={T.xl} fontWeight={700} fill={PI_C.ink}>{tx(t.id)}</text>
            <Hit id={"tag-" + t.id.toLowerCase()} x={t.x} y={t.y} w={t.w} h={t.h} label={tx(t.id)} onPress={tap("tag-" + t.id.toLowerCase(), () => onTag(t.id))} />
            {win && t.id === "L" && <rect data-reveals="answer" x={t.x - 8} y={t.y - 8} width={t.w + 16} height={t.h + 16} rx={28} fill="none" stroke={PI_C.green} strokeWidth={6} />}
          </g>
        );
      })}
      {/* the long marks are controls in phase 3 (select a mark, the jug fills to it) */}
      {showMarks && Jd && Jd.long.map((v: number) => {
        const y = Jd.yb - (v / Jd.cap) * Jd.H, id = "mark-" + v;
        return (
          <g key={"m" + v}>
            <Hit id={id} x={piEdgeL(Jd, y) - 70} y={y - 36} w={130} h={72} label={tx(PI_LONG[v])} onPress={tap(id, () => onMark(v))} />
            {/* a small ring round the long tick only, clear of the number pills */}
            {inviteOn === id && <Invite x={piEdgeL(Jd, y) + (v === 500 ? -18 : 6)} y={y} r={22} C={C} />}
          </g>
        );
      })}
      {/* the jug itself is a control in phase 1's warm-up and in free play: tap it to empty it */}
      {Jd && (kind === "warm1" || free) && <Hit id="empty" x={Jd.pic.x} y={Jd.pic.y} w={Jd.pic.w} h={Jd.pic.h} label={tx("jug")} onPress={free ? () => { if (!busy.current && SR.current.ml > 0) go(empty); } : tap("empty", () => {})} />}
      {sc.srcs.map((s: any) => srcHit(s))}
      {sc.srcs.map((s: any) => inviteFor(s))}
      {inviteOn === "empty" && Jd && <Invite x={Jd.pic.x + Jd.pic.w / 2} y={Jd.pic.y + Jd.pic.h / 2} w={Jd.pic.w} h={Jd.pic.h} rx={18} C={C} />}
      {/* the unit fact: in phase 1 once the jug has been filled to 1 L, and at the wins */}
      {n === 1 && ((kind === "warm1" && (V.poured.bottle)) || win) && <g pointerEvents="none">{piFact(kind === "warm1" ? 1010 : 770, 43, tx)}</g>}
      {/* THE CORRECTION's own marks (never the answer): a counter of the pours replayed, the marks counted so far */}
      {corr && <g pointerEvents="none">
        {corr.count ? piTag(Jd.pic.x + Jd.pic.w + 90, kind === "glasses" ? 30 : 40,corr.count + " " + tx(kind === "count" ? (corr.count === 1 ? "vessel" : "vessels") : kind === "share" ? (corr.count === 1 ? "cup" : "cups") : kind === "glasses" ? (corr.count === 1 ? "glass" : "glasses") : (corr.count === 1 ? "teacup" : "teacups")), "#FFFFFF", PI_C.ink, T.label, PI_C.ink) : null}
        {corr.lit && Jd && Array.from({ length: corr.lit / 20 }, (_, i) => {
          const v = 20 * (i + 1), y = Jd.yb - (v / Jd.cap) * Jd.H;
          return <g key={"lit" + v}>
            <line x1={piEdgeL(Jd, y) - 34} y1={y} x2={piEdgeL(Jd, y) - 3} y2={y} stroke={PI_C.ink} strokeWidth={7} strokeLinecap="round" />
            {v % 40 === 0 && <line x1={piEdgeR(Jd, y) + 3} y1={y} x2={piRightX(Jd) - 6} y2={y} stroke={PI_C.ink} strokeWidth={3} strokeDasharray="8 6" />}
            {v % 40 === 0 && <text x={piRightX(Jd)} y={y} textAnchor="start" dominantBaseline="central" fontSize={T.label} fontWeight={700} fill={PI_C.ink}>{v + " " + tx("mL")}</text>}
          </g>;
        })}
      </g>}
      {/* THE WIN: the answer in a green tag, only now */}
      {win && kind === "unit" && answerTag(unitOf("mL"), 700, 484)}
      {win && kind === "tag" && answerTag(unitOf("L"), 640, 484)}
      {win && kind === "pair" && answerTag(tx("packet") + ", " + unitOf("mL"), 640, 484)}
      {win && kind === "count" && answerTag("2 " + tx("vessels"), 690, 44)}
      {win && kind === "share" && answerTag("5 " + tx("cups"), 690, 44)}
      {win && kind === "read" && answerTag("140 " + tx("mL"), 820, 40)}
      {win && kind === "half" && answerTag("500 " + tx("mL"), 820, 40)}
      {win && kind === "about" && answerTag(tx("about half a litre"), 885, 40)}
      {win && kind === "glasses" && answerTag("4 " + tx("glasses"), 770, 28)}
      {win && kind === "pan" && answerTag("4 " + tx("teacups"), 800, 28)}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const lastR = result && result.last;
  if (!lastR) return null;
  const item = it || lastR.it || {};
  const v = lastR.value;
  /* every word and unit through its TR entry (short unit forms on the thumbnail: मिली / ली, મિલી / લી); a word with no entry in the
     language is left out, so a Hindi or Gujarati thumbnail never shows a Latin word */
  const word = (s: string) => (lang === "en" || (TR[lang] && TR[lang][s]) ? tx(s) : "");
  let text = "";
  if (item.choices) { const c = item.choices.find((x: any) => x.id === String(v)); text = c ? word(c.label) + (item.kind === "pair" && word("mL") ? ": " + word("mL") : "") : ""; }
  /* the short name on the thumbnail ("4 cups": a teacup is a cup), so it reads at full size */
  else if (item.parts) text = (slotPartsOf(v, 1)[0] + " " + word(item.parts[0].unit === "teacups" ? "cups" : item.parts[0].unit)).trim();
  else if (item.kind === "tag") text = word(String(v));
  else if (item.kind === "sort") text = word("sorted");
  else text = String(v);
  /* the object the answer is about (its own photo); the jug only where the answer IS a level on the litre jug */
  const lvl: any = { half: 0.5, about: 0.5 };
  const OBJ: any = { unit: "cup", tag: "bucket", pair: "packet", count: "v500", share: "cup", read: "teacup", about: "carton", glasses: "glass", pan: "teacup" };
  const bx = 4, bw = 56, by = 10, bh = h - 20, cid = "piTh" + String(item.qid || item.kind).replace(/[^A-Za-z0-9]/g, "_");
  const ob = OBJ[item.kind], oh = ob ? Math.min(bh, bw / (PI_ASPECT[ob] || 0.7)) : 0;
  const drawing = ob
    ? <g transform={`translate(${bx + bw / 2} ${by + bh - (bh - oh) / 2})`}>{piObj(ob, oh, true)}</g>
    : item.kind === "sort"
    ? <g>{[0, 1, 2].map((k) => <g key={k}>
        <rect x={bx + k * 24} y={by + bh * 0.35} width={20} height={bh * 0.65} rx={4} fill="#F5EAD9" stroke={C.ink} strokeWidth={2} />
        <circle cx={bx + k * 24 + 10} cy={by + bh * (0.55 + 0.12 * (k % 2))} r={6} fill={PI_C.blue} />
      </g>)}</g>
    : <g>
        <clipPath id={cid}><polygon points={piProfile(bx, by, bw, bh)} /></clipPath>
        <rect x={bx} y={by + (PI_JP.floor - (PI_JP.floor - PI_JP.full) * (lvl[item.kind] ?? 1)) * bh} width={bw} height={bh} clipPath={"url(#" + cid + ")"} fill={PI_C.water} />
        {item.kind === "pan" && <line x1={bx} y1={by + (PI_JP.floor - (PI_JP.floor - PI_JP.full) * 0.56) * bh} x2={bx + bw} y2={by + (PI_JP.floor - (PI_JP.floor - PI_JP.full) * 0.56) * bh} stroke={C.ink} strokeWidth={2} strokeDasharray="5 4" />}
        <polygon points={piProfile(bx, by, bw, bh)} fill="none" stroke={PI_C.glassE} strokeWidth={2.5} strokeLinejoin="round" />
        <path d={`M ${bx + 0.62 * bw} ${by + 0.2 * bh} C ${bx + 0.98 * bw} ${by + 0.18 * bh} ${bx + 0.98 * bw} ${by + 0.62 * bh} ${bx + 0.69 * bw} ${by + 0.66 * bh}`} fill="none" stroke={PI_C.glassE} strokeWidth={4} strokeLinecap="round" />
      </g>;
  /* the answer on ONE line, 12+ clear of the card's edges: 30 to start (32 lifted the Gujarati and Hindi matras out of the card), measured
     once drawn and stepped down to the 28 floor until it fits */
  const tx0 = bx + bw + 6, room = w - tx0 - 12, cx = tx0 + room / 2;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill="#FFFFFF" stroke={C.rule} strokeWidth={1.5} />
      {drawing}
      <text ref={piFit(room, T.label - 2)} x={cx} y={h / 2} textAnchor="middle" dominantBaseline="central" fontSize={T.label - 2} fontWeight={700} fill={C.ink}>{text}</text>
    </g>
  );
}

function PourIt(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b) */
      board: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d, PATTERNS.md §16) */
      keyOnly: true,
      /* the wide keypad (PATTERNS.md 9g): every typed screen is drawn inside x 0 to 900 */
      bigPad: true,
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself */
      nextKey: true,
      /* NAV DOTS (the new look; LAYOUT.md §1d) */
      navDots: true,
      /* the start page */
      StartArt, START_HOOK,
      }} />
  );
}

export default PourIt;