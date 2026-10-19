/* ═══ M3.S4.T7.C30.2D1 · measure_multiplier · tool-specific part ═══════════════════════════════
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

const TOOL_ID = "measure_multiplier";
const MEDIA_ID = "M3.S4.T7.C30.2D1";
const TOOL_NAME = "Smallest Unit Multiplier";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["A measure on a card, and an empty slot for its smallest unit."];
/* the whole-tool line: printed on the summary page */
const FINISH_LINE = "You multiplied and shared in the smallest unit, with whole numbers.";
/* printed when the child opens Free play (the plan's free-play line); its LAST piece stays on the bubble */
const FREE_LINE = "Free play. Copy or cut any strip you like.";

/* THE START PAGE (runtime r28; docs/LAYOUT.md §1c, docs/PATTERNS.md §14): the first thing a child sees in user mode.
   START_HOOK is ONE printed question to wonder at (it needs a TR entry, and never gives an answer away); StartArt is
   the object the lesson is about, drawn in a 1200 x 340 box ({ box, C, lang, tx }; plain shapes in the chrome and content
   colours, a <Skin> over them when the image agent made one). This stub is a dashed outline: draw the real object. */
const START_HOOK = "How can whole numbers help you multiply and share a measure?";
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  /* four ribbons laid end to end over a measuring tape, and a jug of water beside four clay cups seen from above: the lesson's own
     objects, in its own skins (the plain shapes under them are the fallback) */
  const sw = 190, sx = 40, sy = 70;
  return (
    <g>
      {[0, 1, 2, 3].map((i) => (
        <g key={"s" + i}>
          <clipPath id={"mmsa" + i}><rect x={sx + i * sw} y={sy} width={sw} height={74} rx={12} /></clipPath>
          <rect x={sx + i * sw} y={sy} width={sw} height={74} rx={12} fill={MM_FILL.given} />
          <Skin name="ribbon" x={sx + i * sw} y={sy} w={sw} h={74} clip={"url(#mmsa" + i + ")"} />
          <rect x={sx + i * sw} y={sy} width={sw} height={74} rx={12} fill="none" stroke={MM_BLUE} strokeWidth={4} />
        </g>
      ))}
      <rect x={sx} y={sy + 96} width={4 * sw} height={40} rx={6} fill="#FFF3C4" stroke={C.ink} strokeWidth={3} />
      {Array.from({ length: 41 }, (_, k) => <line key={"t" + k} x1={sx + k * (sw / 10)} y1={sy + 96} x2={sx + k * (sw / 10)} y2={sy + 96 + (k % 10 === 0 ? 30 : k % 5 === 0 ? 20 : 12)} stroke={C.ink} strokeWidth={k % 10 === 0 ? 3 : 2} />)}
      <text x={sx + 2 * sw} y={sy + 196} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={MM_INK.unit}>{tx("smallest unit")}</text>
      <rect x={880} y={40} width={140} height={230} rx={22} fill="#FFFFFF" stroke={C.ink} strokeWidth={4} />
      <rect x={892} y={92} width={116} height={166} rx={14} fill={MM_FILL.given} stroke={MM_BLUE} strokeWidth={3} />
      {[0, 1, 2, 3].map((i) => {
        const cx = 1085 + (i % 2) * 96, cy = 108 + Math.floor(i / 2) * 104, R = 44;
        return (
          <g key={"c" + i}>
            <circle cx={cx} cy={cy} r={R - 2} fill="#F3E6D8" stroke={C.ink} strokeWidth={3} />
            <circle cx={cx} cy={cy} r={R * 0.66} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
            <Skin name="cup" x={cx - R} y={cy - R} w={2 * R} h={2 * R} />
          </g>
        );
      })}
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
    "Smallest Unit Multiplier": "सबसे छोटी इकाई से गुणा",
    "Multiply in the smallest unit": "सबसे छोटी इकाई में गुणा",
    "Back to the larger unit": "फिर से बड़ी इकाई में",
    "Sharing equally": "बराबर बाँटना",
    "Some left over": "कुछ बचा हुआ",
    "A measure on a card, and an empty slot for its smallest unit.": "कार्ड पर एक माप, और उसकी सबसे छोटी इकाई के लिए खाली जगह।",
    "Free play. Copy or cut any strip you like.": "मुक्त खेल। जो भी पट्टी चाहो, उसकी नकल करो या काटो।",
    "How can whole numbers help you multiply and share a measure?": "पूरी संख्याएँ माप का गुणा और बँटवारा करने में कैसे मदद करती हैं?",
    /* phase 1 */
    "A ribbon is 1 m 20 cm long, so tap Centimetres to write it in its smallest unit.": "रिबन 1 मी 20 सेमी लंबा है, सेंटीमीटर दबाकर इसे सबसे छोटी इकाई में लिखो।",
    "Tap the Centimetres key at the bottom.": "नीचे सेंटीमीटर बटन दबाओ।",
    "Tap Copy to lay a second ribbon at the end of the first one.": "नकल दबाकर पहले रिबन के आगे दूसरा रिबन रखो।",
    "The Copy key lays one more ribbon.": "नकल बटन एक और रिबन रखता है।",
    "Tap Copy once more, so that 3 ribbons lie end to end.": "एक बार और नकल दबाओ, ताकि 3 रिबन एक के बाद एक हों।",
    "One ribbon is still missing from the row.": "पंक्ति में अभी एक रिबन कम है।",
    "Now add one copy at a time along the row.": "अब पंक्ति में एक-एक नकल जोड़ो।",
    "Multiply the length of one copy by the number of copies.": "एक नकल की लंबाई को नकलों की संख्या से गुणा करो।",
    "Smallest unit first, then multiply the whole number.": "पहले सबसे छोटी इकाई, फिर पूरी संख्या का गुणा।",
    "You learned to multiply a measure in its smallest unit.": "तुमने माप को सबसे छोटी इकाई में गुणा करना सीखा।",
    "A shelf is 1 m 45 cm long; how long are 4 shelves in a row, in centimetres?": "एक शेल्फ 1 मी 45 सेमी लंबी है; पंक्ति में 4 शेल्फ कितने सेंटीमीटर लंबी हैं?",
    "4 shelves in cm?": "4 शेल्फ, सेमी में?",
    "Count the metre too: one shelf is 100 cm and 45 cm more.": "मीटर भी गिनो: एक शेल्फ 100 सेमी और 45 सेमी है।",
    "Write 3 m 5 cm in its smallest unit, in centimetres, before you multiply it.": "गुणा करने से पहले 3 मी 5 सेमी को सबसे छोटी इकाई, सेंटीमीटर में लिखो।",
    "3 m 5 cm in cm?": "3 मी 5 सेमी, सेमी में?",
    "Each metre is 100 cm, so count the three metres first.": "हर मीटर 100 सेमी है, पहले तीनों मीटर गिनो।",
    "Write each of the three metres as 100 cm.": "तीनों मीटर में से हर एक को 100 सेमी लिखो।",
    "Put the three hundreds together, then add the small part.": "तीनों सौ को मिलाओ, फिर छोटा भाग जोड़ो।",
    "A tile is 1 m 15 cm long; how long are 3 tiles laid end to end, in centimetres?": "एक टाइल 1 मी 15 सेमी लंबी है; एक के बाद एक रखी 3 टाइलें कितने सेंटीमीटर हैं?",
    "3 tiles in cm?": "3 टाइलें, सेमी में?",
    "Write one tile in centimetres before you multiply it by 3.": "3 से गुणा करने से पहले एक टाइल को सेंटीमीटर में लिखो।",
    /* phase 2 */
    "A bag holds 1 kg 200 g of rice, so tap Grams to write it in grams.": "थैले में 1 किग्रा 200 ग्रा चावल है, ग्राम दबाकर इसे ग्राम में लिखो।",
    "Tap the Grams key at the bottom.": "नीचे ग्राम बटन दबाओ।",
    "Tap Copy to put out 4 bags and find their total in grams.": "नकल दबाकर 4 थैले रखो और ग्राम में कुल पता करो।",
    "The Copy key puts out the other bags.": "नकल बटन बाकी थैले रखता है।",
    "Tap Regroup to make a sack of every 1,000 g.": "समूह बनाओ दबाकर हर 1,000 ग्रा की एक बोरी बनाओ।",
    "The Regroup key bundles the grams.": "समूह बनाओ बटन ग्राम को बाँधता है।",
    "Make one bundle of the larger unit from the total, then the next.": "कुल में से बड़ी इकाई का एक समूह बनाओ, फिर अगला।",
    "The part left after the last bundle is smaller than one bundle.": "आख़िरी समूह के बाद बचा भाग एक समूह से छोटा होता है।",
    "The product went back into the larger unit, with a small part beside it.": "गुणनफल फिर बड़ी इकाई में गया, साथ में एक छोटा भाग रहा।",
    "You learned to write a product back in the larger unit.": "तुमने गुणनफल को फिर बड़ी इकाई में लिखना सीखा।",
    "How much do 6 packets of 2 kg 350 g hold, in kilograms and grams?": "2 किग्रा 350 ग्रा के 6 पैकेट में कुल कितना है, किलोग्राम और ग्राम में?",
    "6 packets in kg and g?": "6 पैकेट, किग्रा और ग्रा में?",
    "Count how many thousands the total holds; each one is a whole unit.": "गिनो कि कुल में कितने हज़ार हैं; हर एक पूरी इकाई है।",
    "5 bottles hold 1 L 350 mL each; how much is that in litres and millilitres?": "5 बोतलों में हर एक में 1 ली 350 मिली है; लीटर और मिलीलीटर में कुल कितना है?",
    "5 bottles in L and mL?": "5 बोतलें, ली और मिली में?",
    "Write the total in millilitres, then count its whole litres.": "कुल को मिलीलीटर में लिखो, फिर पूरे लीटर गिनो।",
    "How long are 4 planks of 2 m 65 cm end to end, in metres and centimetres?": "2 मी 65 सेमी के 4 तख़्ते एक के बाद एक कितने लंबे हैं, मीटर और सेंटीमीटर में?",
    "4 planks in m and cm?": "4 तख़्ते, मी और सेमी में?",
    "Write the total in centimetres; 100 cm make 1 m, not 1,000.": "कुल को सेंटीमीटर में लिखो; 100 सेमी का 1 मी होता है, 1,000 का नहीं।",
    /* phase 3 */
    "A ribbon is 4 m 20 cm long, so tap Centimetres to write it in centimetres.": "रिबन 4 मी 20 सेमी लंबा है, सेंटीमीटर दबाकर इसे सेंटीमीटर में लिखो।",
    "Tap the Centimetres key first.": "पहले सेंटीमीटर बटन दबाओ।",
    "Tap Cut to cut the ribbon into 5 equal pieces.": "काटो दबाकर रिबन के 5 बराबर टुकड़े करो।",
    "The Cut key cuts the ribbon.": "काटो बटन रिबन काटता है।",
    "Now divide that whole number by the number of equal pieces.": "अब उस पूरी संख्या को बराबर टुकड़ों की संख्या से भाग दो।",
    "Ask what number times the number of pieces makes the whole.": "सोचो कौन-सी संख्या गुणा टुकड़ों की संख्या से पूरा बनता है।",
    "Smallest unit first, then divide; each piece is the answer to the division.": "पहले सबसे छोटी इकाई, फिर भाग; हर टुकड़ा भाग का उत्तर है।",
    "You learned to share a measure equally in its smallest unit.": "तुमने माप को सबसे छोटी इकाई में बराबर बाँटना सीखा।",
    "A pipe of 4 m 50 cm is cut into 6 equal pieces; how many centimetres is each?": "4 मी 50 सेमी के पाइप के 6 बराबर टुकड़े किए; हर टुकड़ा कितने सेंटीमीटर है?",
    "Each piece in cm?": "हर टुकड़ा, सेमी में?",
    "Share the whole pipe in centimetres, not only the 50 cm.": "पूरे पाइप को सेंटीमीटर में बाँटो, सिर्फ़ 50 सेमी को नहीं।",
    "96 cm of string is shared into 4 equal pieces; how long is each piece?": "96 सेमी डोरी के 4 बराबर टुकड़े किए; हर टुकड़ा कितना लंबा है?",
    "The string is already in centimetres, so divide 96 by 4.": "डोरी पहले से सेंटीमीटर में है, तो 96 को 4 से भाग दो।",
    "Think of 96 as 80 and 16, and share each among the 4 pieces.": "96 को 80 और 16 सोचो, और हर एक को 4 टुकड़ों में बाँटो।",
    "80 shared by 4 is 20; now share the 16 the same way.": "80 को 4 में बाँटने पर 20; अब 16 को भी वैसे ही बाँटो।",
    "2 kg 400 g of clay is shared equally among 8 pots; how many grams go in each?": "2 किग्रा 400 ग्रा मिट्टी 8 गमलों में बराबर बाँटी; हर एक में कितने ग्राम?",
    "Each pot in g?": "हर गमला, ग्रा में?",
    "Write the clay in grams before you share it among the pots.": "गमलों में बाँटने से पहले मिट्टी को ग्राम में लिखो।",
    /* phase 4 */
    "A jug holds 1 L 300 mL, so tap Millilitres to write it in millilitres.": "जग में 1 ली 300 मिली है, मिलीलीटर दबाकर इसे मिलीलीटर में लिखो।",
    "Tap the Millilitres key at the bottom.": "नीचे मिलीलीटर बटन दबाओ।",
    "Tap Share to pour the water equally into the 3 cups.": "बाँटो दबाकर पानी 3 कपों में बराबर डालो।",
    "The Share key fills the cups.": "बाँटो बटन कप भरता है।",
    "Divide in the smallest unit; what cannot be shared is left over.": "सबसे छोटी इकाई में भाग दो; जो बँट न सके वह बचा हुआ है।",
    "Multiply the share back and add what is left: it must make the whole.": "हिस्से को वापस गुणा करो और बचा हुआ जोड़ो: पूरा बनना चाहिए।",
    "When a sharing is not even, say each share and what is left over.": "बँटवारा बराबर न हो, तो हर हिस्सा और बचा हुआ बताओ।",
    "You learned to say what is left over when a sharing is not even.": "तुमने बँटवारा बराबर न होने पर बचा हुआ बताना सीखा।",
    "How much juice does each of 4 cups get from 1 L 850 mL, and how much is left?": "1 ली 850 मिली रस में से 4 कपों में हर एक को कितना मिलेगा, और कितना बचेगा?",
    "Each cup and left over?": "हर कप और बचा हुआ?",
    "Divide the juice, in millilitres, by 4, and type what is left in the second box.": "रस को मिलीलीटर में 4 से भाग दो, और बचा हुआ दूसरे खाने में लिखो।",
    "4 bowls share 1 kg 30 g of rice equally; find each share and what is left.": "4 कटोरियों में 1 किग्रा 30 ग्रा चावल बराबर बाँटो; हर हिस्सा और बचा हुआ बताओ।",
    "Each bowl and left over?": "हर कटोरी और बचा हुआ?",
    "Write the rice in grams, then share it among the 4 bowls.": "चावल को ग्राम में लिखो, फिर 4 कटोरियों में बाँटो।",
    "5 L 30 mL of water fills 7 bottles equally; what is in each, and what stays?": "5 ली 30 मिली पानी 7 बोतलों में बराबर भरा; हर एक में कितना, और कितना रहा?",
    "Each bottle and left over?": "हर बोतल और बचा हुआ?",
    "Write the water in millilitres; 5 L is 5,000 mL.": "पानी को मिलीलीटर में लिखो; 5 ली 5,000 मिली है।",
    /* win lines */
    "Yes, 4 shelves of 145 cm make 580 cm in a row.": "हाँ, 145 सेमी की 4 शेल्फ पंक्ति में 580 सेमी बनाती हैं।",
    "Yes, 3 m 5 cm is 305 cm, one whole number.": "हाँ, 3 मी 5 सेमी 305 सेमी है, एक पूरी संख्या।",
    "Yes, 3 tiles of 115 cm make 345 cm.": "हाँ, 115 सेमी की 3 टाइलें 345 सेमी बनाती हैं।",
    "Yes, 1,000 g make 1 kg, so 14,100 g is 14 kg and 100 g, or 14.1 kg.": "हाँ, 1,000 ग्रा का 1 किग्रा, तो 14,100 ग्रा 14 किग्रा 100 ग्रा या 14.1 किग्रा।",
    "Yes, 1,000 mL make 1 L, so 6,750 mL is 6 L and 750 mL.": "हाँ, 1,000 मिली का 1 ली होता है, तो 6,750 मिली 6 ली 750 मिली है।",
    "Yes, 1,060 cm is 10 m and 60 cm.": "हाँ, 1,060 सेमी 10 मी 60 सेमी है।",
    "Yes, 450 cm shared by 6 is 75 cm a piece.": "हाँ, 450 सेमी को 6 में बाँटने पर हर टुकड़ा 75 सेमी है।",
    "Yes, 96 cm shared by 4 is 24 cm a piece.": "हाँ, 96 सेमी को 4 में बाँटने पर हर टुकड़ा 24 सेमी है।",
    "Yes, 2,400 g shared by 8 is 300 g a pot.": "हाँ, 2,400 ग्रा को 8 में बाँटने पर हर गमले में 300 ग्रा है।",
    "Yes, each cup gets 462 mL, and 2 mL is left over.": "हाँ, हर कप को 462 मिली मिला, और 2 मिली बचा।",
    "Yes, each bowl gets 257 g, and 2 g is left over.": "हाँ, हर कटोरी को 257 ग्रा मिला, और 2 ग्रा बचा।",
    "Yes, each bottle gets 718 mL, and 4 mL is left over.": "हाँ, हर बोतल को 718 मिली मिला, और 4 मिली बचा।",
    /* the picture, the keys, the answer boxes and the thumbnails */
    "Given": "दिया है", "Smallest unit": "सबसे छोटी इकाई", "smallest unit": "सबसे छोटी इकाई", "Answer": "उत्तर",
    "Left over": "बचा हुआ", "left over": "बचा हुआ", "left": "बचा हुआ", "each": "हर एक",
    "m": "मी", "cm": "सेमी", "kg": "किग्रा", "g": "ग्रा", "L": "ली", "mL": "मिली",
    "Centimetres": "सेंटीमीटर", "Grams": "ग्राम", "Millilitres": "मिलीलीटर", "Copy": "नकल", "Cut": "काटो", "Share": "बाँटो", "Regroup": "समूह बनाओ",
    "1 m each": "हर एक 1 मी", "1 kg each": "हर एक 1 किग्रा", "1 L each": "हर एक 1 ली",
    "shelf": "शेल्फ", "ribbon": "रिबन", "tile": "टाइल", "packet": "पैकेट", "bottle": "बोतल", "plank": "तख़्ता", "pipe": "पाइप", "string": "डोरी",
    "clay": "मिट्टी", "juice": "रस", "rice": "चावल", "water": "पानी", "bag": "थैला", "cup": "कप", "bowl": "कटोरी", "sack": "बोरी", "jug": "जग",
  },
  gu: {
    "Smallest Unit Multiplier": "સૌથી નાના એકમથી ગુણાકાર",
    "Multiply in the smallest unit": "સૌથી નાના એકમમાં ગુણાકાર",
    "Back to the larger unit": "ફરી મોટા એકમમાં",
    "Sharing equally": "સરખા ભાગે વહેંચવું",
    "Some left over": "થોડું બાકી",
    "A measure on a card, and an empty slot for its smallest unit.": "કાર્ડ પર એક માપ, અને તેના સૌથી નાના એકમ માટે ખાલી જગ્યા.",
    "Free play. Copy or cut any strip you like.": "મુક્ત રમત. ગમે તે પટ્ટીની નકલ કરો અથવા તેને કાપો.",
    "How can whole numbers help you multiply and share a measure?": "આખી સંખ્યાઓ માપનો ગુણાકાર અને વહેંચણી કરવામાં કેવી રીતે મદદ કરે?",
    /* phase 1 */
    "A ribbon is 1 m 20 cm long, so tap Centimetres to write it in its smallest unit.": "રિબન 1 મી 20 સેમી લાંબી છે, સેન્ટિમીટર દબાવી તેને સૌથી નાના એકમમાં લખો.",
    "Tap the Centimetres key at the bottom.": "નીચે સેન્ટિમીટર બટન દબાવો.",
    "Tap Copy to lay a second ribbon at the end of the first one.": "નકલ દબાવી પહેલી રિબન પછી બીજી રિબન મૂકો.",
    "The Copy key lays one more ribbon.": "નકલ બટન એક વધુ રિબન મૂકે છે.",
    "Tap Copy once more, so that 3 ribbons lie end to end.": "ફરી એક વાર નકલ દબાવો, જેથી 3 રિબન એક પછી એક હોય.",
    "One ribbon is still missing from the row.": "હારમાં હજી એક રિબન ઓછી છે.",
    "Now add one copy at a time along the row.": "હવે હારમાં એક-એક નકલ ઉમેરો.",
    "Multiply the length of one copy by the number of copies.": "એક નકલની લંબાઈને નકલોની સંખ્યા વડે ગુણો.",
    "Smallest unit first, then multiply the whole number.": "પહેલાં સૌથી નાનો એકમ, પછી આખી સંખ્યાનો ગુણાકાર.",
    "You learned to multiply a measure in its smallest unit.": "તમે માપનો સૌથી નાના એકમમાં ગુણાકાર કરતાં શીખ્યા.",
    "A shelf is 1 m 45 cm long; how long are 4 shelves in a row, in centimetres?": "એક છાજલી 1 મી 45 સેમી લાંબી છે; હારમાં 4 છાજલી કેટલા સેન્ટિમીટર લાંબી છે?",
    "4 shelves in cm?": "4 છાજલી, સેમીમાં?",
    "Count the metre too: one shelf is 100 cm and 45 cm more.": "મીટર પણ ગણો: એક છાજલી 100 સેમી અને 45 સેમી છે.",
    "Write 3 m 5 cm in its smallest unit, in centimetres, before you multiply it.": "ગુણાકાર પહેલાં 3 મી 5 સેમીને સૌથી નાના એકમ, સેન્ટિમીટરમાં લખો.",
    "3 m 5 cm in cm?": "3 મી 5 સેમી, સેમીમાં?",
    "Each metre is 100 cm, so count the three metres first.": "દરેક મીટર 100 સેમી છે, પહેલાં ત્રણે મીટર ગણો.",
    "Write each of the three metres as 100 cm.": "ત્રણે મીટરમાંથી દરેકને 100 સેમી લખો.",
    "Put the three hundreds together, then add the small part.": "ત્રણે સોને ભેગા કરો, પછી નાનો ભાગ ઉમેરો.",
    "A tile is 1 m 15 cm long; how long are 3 tiles laid end to end, in centimetres?": "એક ટાઇલ 1 મી 15 સેમી લાંબી છે; એક પછી એક મૂકેલી 3 ટાઇલ કેટલા સેન્ટિમીટર છે?",
    "3 tiles in cm?": "3 ટાઇલ, સેમીમાં?",
    "Write one tile in centimetres before you multiply it by 3.": "3 વડે ગુણતાં પહેલાં એક ટાઇલને સેન્ટિમીટરમાં લખો.",
    /* phase 2 */
    "A bag holds 1 kg 200 g of rice, so tap Grams to write it in grams.": "થેલીમાં 1 કિગ્રા 200 ગ્રા ચોખા છે, ગ્રામ દબાવી તેને ગ્રામમાં લખો.",
    "Tap the Grams key at the bottom.": "નીચે ગ્રામ બટન દબાવો.",
    "Tap Copy to put out 4 bags and find their total in grams.": "નકલ દબાવી 4 થેલી મૂકો અને ગ્રામમાં કુલ શોધો.",
    "The Copy key puts out the other bags.": "નકલ બટન બાકીની થેલીઓ મૂકે છે.",
    "Tap Regroup to make a sack of every 1,000 g.": "જૂથ બનાવો દબાવી દર 1,000 ગ્રાની એક બોરી બનાવો.",
    "The Regroup key bundles the grams.": "જૂથ બનાવો બટન ગ્રામને બાંધે છે.",
    "Make one bundle of the larger unit from the total, then the next.": "કુલમાંથી મોટા એકમનું એક જૂથ બનાવો, પછી બીજું.",
    "The part left after the last bundle is smaller than one bundle.": "છેલ્લા જૂથ પછી બાકી ભાગ એક જૂથ કરતાં નાનો હોય છે.",
    "The product went back into the larger unit, with a small part beside it.": "ગુણનફળ ફરી મોટા એકમમાં ગયું, સાથે એક નાનો ભાગ રહ્યો.",
    "You learned to write a product back in the larger unit.": "તમે ગુણનફળને ફરી મોટા એકમમાં લખતાં શીખ્યા.",
    "How much do 6 packets of 2 kg 350 g hold, in kilograms and grams?": "2 કિગ્રા 350 ગ્રાના 6 પેકેટમાં કુલ કેટલું છે, કિલોગ્રામ અને ગ્રામમાં?",
    "6 packets in kg and g?": "6 પેકેટ, કિગ્રા અને ગ્રામાં?",
    "Count how many thousands the total holds; each one is a whole unit.": "ગણો કે કુલમાં કેટલા હજાર છે; દરેક એક આખો એકમ છે.",
    "5 bottles hold 1 L 350 mL each; how much is that in litres and millilitres?": "5 બોટલમાં દરેકમાં 1 લિ 350 મિલિ છે; લિટર અને મિલિલિટરમાં કુલ કેટલું છે?",
    "5 bottles in L and mL?": "5 બોટલ, લિ અને મિલિમાં?",
    "Write the total in millilitres, then count its whole litres.": "કુલને મિલિલિટરમાં લખો, પછી આખા લિટર ગણો.",
    "How long are 4 planks of 2 m 65 cm end to end, in metres and centimetres?": "2 મી 65 સેમીનાં 4 પાટિયાં એક પછી એક કેટલાં લાંબાં છે, મીટર અને સેન્ટિમીટરમાં?",
    "4 planks in m and cm?": "4 પાટિયાં, મી અને સેમીમાં?",
    "Write the total in centimetres; 100 cm make 1 m, not 1,000.": "કુલને સેન્ટિમીટરમાં લખો; 100 સેમીનો 1 મી થાય, 1,000નો નહીં.",
    /* phase 3 */
    "A ribbon is 4 m 20 cm long, so tap Centimetres to write it in centimetres.": "રિબન 4 મી 20 સેમી લાંબી છે, સેન્ટિમીટર દબાવી તેને સેન્ટિમીટરમાં લખો.",
    "Tap the Centimetres key first.": "પહેલાં સેન્ટિમીટર બટન દબાવો.",
    "Tap Cut to cut the ribbon into 5 equal pieces.": "કાપો દબાવી રિબનના 5 સરખા ટુકડા કરો.",
    "The Cut key cuts the ribbon.": "કાપો બટન રિબન કાપે છે.",
    "Now divide that whole number by the number of equal pieces.": "હવે તે આખી સંખ્યાને સરખા ટુકડાની સંખ્યા વડે ભાગો.",
    "Ask what number times the number of pieces makes the whole.": "વિચારો કઈ સંખ્યા ગુણ્યા ટુકડાની સંખ્યા આખું બનાવે.",
    "Smallest unit first, then divide; each piece is the answer to the division.": "પહેલાં સૌથી નાનો એકમ, પછી ભાગાકાર; દરેક ટુકડો ભાગાકારનો જવાબ છે.",
    "You learned to share a measure equally in its smallest unit.": "તમે માપને સૌથી નાના એકમમાં સરખું વહેંચતાં શીખ્યા.",
    "A pipe of 4 m 50 cm is cut into 6 equal pieces; how many centimetres is each?": "4 મી 50 સેમીની પાઇપના 6 સરખા ટુકડા કર્યા; દરેક ટુકડો કેટલા સેન્ટિમીટર છે?",
    "Each piece in cm?": "દરેક ટુકડો, સેમીમાં?",
    "Share the whole pipe in centimetres, not only the 50 cm.": "આખી પાઇપને સેન્ટિમીટરમાં વહેંચો, ફક્ત 50 સેમીને નહીં.",
    "96 cm of string is shared into 4 equal pieces; how long is each piece?": "96 સેમી દોરીના 4 સરખા ટુકડા કર્યા; દરેક ટુકડો કેટલો લાંબો છે?",
    "The string is already in centimetres, so divide 96 by 4.": "દોરી પહેલેથી સેન્ટિમીટરમાં છે, તો 96ને 4 વડે ભાગો.",
    "Think of 96 as 80 and 16, and share each among the 4 pieces.": "96ને 80 અને 16 વિચારો, અને દરેકને 4 ટુકડામાં વહેંચો.",
    "80 shared by 4 is 20; now share the 16 the same way.": "80ને 4માં વહેંચતાં 20; હવે 16ને પણ એમ જ વહેંચો.",
    "2 kg 400 g of clay is shared equally among 8 pots; how many grams go in each?": "2 કિગ્રા 400 ગ્રા માટી 8 કૂંડામાં સરખી વહેંચી; દરેકમાં કેટલા ગ્રામ?",
    "Each pot in g?": "દરેક કૂંડું, ગ્રામાં?",
    "Write the clay in grams before you share it among the pots.": "કૂંડામાં વહેંચતાં પહેલાં માટીને ગ્રામમાં લખો.",
    /* phase 4 */
    "A jug holds 1 L 300 mL, so tap Millilitres to write it in millilitres.": "જગમાં 1 લિ 300 મિલિ છે, મિલિલિટર દબાવી તેને મિલિલિટરમાં લખો.",
    "Tap the Millilitres key at the bottom.": "નીચે મિલિલિટર બટન દબાવો.",
    "Tap Share to pour the water equally into the 3 cups.": "વહેંચો દબાવી પાણી 3 કપમાં સરખું રેડો.",
    "The Share key fills the cups.": "વહેંચો બટન કપ ભરે છે.",
    "Divide in the smallest unit; what cannot be shared is left over.": "સૌથી નાના એકમમાં ભાગો; જે વહેંચાય નહીં તે બાકી છે.",
    "Multiply the share back and add what is left: it must make the whole.": "હિસ્સાને પાછો ગુણો અને બાકી ઉમેરો: આખું બનવું જોઈએ.",
    "When a sharing is not even, say each share and what is left over.": "વહેંચણી સરખી ન થાય, તો દરેક હિસ્સો અને બાકી કહો.",
    "You learned to say what is left over when a sharing is not even.": "તમે વહેંચણી સરખી ન થાય ત્યારે બાકી કહેતાં શીખ્યા.",
    "How much juice does each of 4 cups get from 1 L 850 mL, and how much is left?": "1 લિ 850 મિલિ રસમાંથી 4 કપમાં દરેકને કેટલું મળશે, અને કેટલું બાકી રહેશે?",
    "Each cup and left over?": "દરેક કપ અને બાકી?",
    "Divide the juice, in millilitres, by 4, and type what is left in the second box.": "રસને મિલિલિટરમાં 4 વડે ભાગો, અને બાકી બીજા ખાનામાં લખો.",
    "4 bowls share 1 kg 30 g of rice equally; find each share and what is left.": "4 વાટકીમાં 1 કિગ્રા 30 ગ્રા ચોખા સરખા વહેંચો; દરેક હિસ્સો અને બાકી શોધો.",
    "Each bowl and left over?": "દરેક વાટકી અને બાકી?",
    "Write the rice in grams, then share it among the 4 bowls.": "ચોખાને ગ્રામમાં લખો, પછી 4 વાટકીમાં વહેંચો.",
    "5 L 30 mL of water fills 7 bottles equally; what is in each, and what stays?": "5 લિ 30 મિલિ પાણી 7 બોટલમાં સરખું ભર્યું; દરેકમાં કેટલું, અને કેટલું રહ્યું?",
    "Each bottle and left over?": "દરેક બોટલ અને બાકી?",
    "Write the water in millilitres; 5 L is 5,000 mL.": "પાણીને મિલિલિટરમાં લખો; 5 લિ એટલે 5,000 મિલિ.",
    /* win lines */
    "Yes, 4 shelves of 145 cm make 580 cm in a row.": "હા, 145 સેમીની 4 છાજલી હારમાં 580 સેમી બને છે.",
    "Yes, 3 m 5 cm is 305 cm, one whole number.": "હા, 3 મી 5 સેમી એટલે 305 સેમી, એક આખી સંખ્યા.",
    "Yes, 3 tiles of 115 cm make 345 cm.": "હા, 115 સેમીની 3 ટાઇલ 345 સેમી બને છે.",
    "Yes, 1,000 g make 1 kg, so 14,100 g is 14 kg and 100 g, or 14.1 kg.": "હા, 1,000 ગ્રાનો 1 કિગ્રા, તો 14,100 ગ્રા 14 કિગ્રા 100 ગ્રા કે 14.1 કિગ્રા.",
    "Yes, 1,000 mL make 1 L, so 6,750 mL is 6 L and 750 mL.": "હા, 1,000 મિલિનો 1 લિ થાય, તો 6,750 મિલિ એટલે 6 લિ 750 મિલિ.",
    "Yes, 1,060 cm is 10 m and 60 cm.": "હા, 1,060 સેમી એટલે 10 મી 60 સેમી.",
    "Yes, 450 cm shared by 6 is 75 cm a piece.": "હા, 450 સેમીને 6માં વહેંચતાં દરેક ટુકડો 75 સેમી.",
    "Yes, 96 cm shared by 4 is 24 cm a piece.": "હા, 96 સેમીને 4માં વહેંચતાં દરેક ટુકડો 24 સેમી.",
    "Yes, 2,400 g shared by 8 is 300 g a pot.": "હા, 2,400 ગ્રાને 8માં વહેંચતાં દરેક કૂંડામાં 300 ગ્રા.",
    "Yes, each cup gets 462 mL, and 2 mL is left over.": "હા, દરેક કપને 462 મિલિ મળ્યું, અને 2 મિલિ બાકી રહ્યું.",
    "Yes, each bowl gets 257 g, and 2 g is left over.": "હા, દરેક વાટકીને 257 ગ્રા મળ્યા, અને 2 ગ્રા બાકી રહ્યા.",
    "Yes, each bottle gets 718 mL, and 4 mL is left over.": "હા, દરેક બોટલને 718 મિલિ મળ્યું, અને 4 મિલિ બાકી રહ્યું.",
    /* the picture, the keys, the answer boxes and the thumbnails */
    "Given": "આપેલું", "Smallest unit": "સૌથી નાનો એકમ", "smallest unit": "સૌથી નાનો એકમ", "Answer": "જવાબ",
    "Left over": "બાકી", "left over": "બાકી", "left": "બાકી", "each": "દરેક",
    "m": "મી", "cm": "સેમી", "kg": "કિગ્રા", "g": "ગ્રા", "L": "લિ", "mL": "મિલિ",
    "Centimetres": "સેન્ટિમીટર", "Grams": "ગ્રામ", "Millilitres": "મિલિલિટર", "Copy": "નકલ", "Cut": "કાપો", "Share": "વહેંચો", "Regroup": "જૂથ બનાવો",
    "1 m each": "દરેક 1 મી", "1 kg each": "દરેક 1 કિગ્રા", "1 L each": "દરેક 1 લિ",
    "shelf": "છાજલી", "ribbon": "રિબન", "tile": "ટાઇલ", "packet": "પેકેટ", "bottle": "બોટલ", "plank": "પાટિયું", "pipe": "પાઇપ", "string": "દોરી",
    "clay": "માટી", "juice": "રસ", "rice": "ચોખા", "water": "પાણી", "bag": "થેલી", "cup": "કપ", "bowl": "વાટકી", "sack": "બોરી", "jug": "જગ",
  },
};

/* One entry per phase = one mount.
   says    the teach run, printed on the bubble a piece at a time before anything is asked (numbers are printed as words)
           keyOnly: digits print as written; a bubble line may name its number unless that gives the answer away
   steps   GUIDE STEPS (runtime r30; `hint` r34), when the plan's teach lines describe acts:
             steps: [{ say: "Tap Cut to cut the bar into ten equal parts.", on: "cut", hint: "Tap the Cut key first." },
                     { say: "Now tap one part to shade it.", on: "shade", hint: "Tap one piece of the bar." }],
           The phase then opens on steps[0].say with the question and the Answer key waiting (stage "demo"; `says` and
           OPENING are not shown). Work does the act when the CHILD does it and reports it: api.did("cut"). Only then does
           the bubble move to the next step (never on a timer); the last act opens the first question with its say.
           ONE CLICK PER STEP (2026-10-08): a step completes on one click of one control (a button such as Cut, or one
           piece of the picture), never on a count; if the idea needs more clicks, write more steps, each with the next
           instruction (the same `on` may repeat). The keypad's Enter is not a step act. Name a step's button after its
           act (data-control "cut") so the check can click it.
           Report EVERY click Work gets with api.did(name) at the moment of the click, awaited or not: a wrong act shows
           that step's `hint` UNDER the pinned instruction, unchanged until the child acts again (the header's Hint key
           shows it on demand as well). Work must also register api.onEnter so that Enter, the agent's check() and the dev
           solve() perform the CURRENT step (see Work below); props.stepOn names the act waited for: put the one <Invite/>
           on that control. ONE PAGE (r35): each `say`, each `hint`, each question's `say`, each `miss` and ladder rung is
           ONE sentence that fits the bubble (no timer ever pages it); a hint at most about 40 characters when its
           instruction runs to two lines, never over 80, never the answer; each hint unique in the phase.
           The scaffold writes ONE stub step per phase from its teach line: make it real, or delete the `steps` array of a
           phase whose teach describes no act (then `says` is the teach run and the phase opens on its first question).
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, printed once when it goes idle
           keyOnly: ONE sentence; the bubble shows it in place of the last win line
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   demo?   { ... } when the phase opens on the child's one physical act (see api.demoDone); steps are the newer way
   items   the authored fallback: three a phase, the third tests whether the phase landed.
           qid   the plan's question id (<conceptId>:ML<n> or <conceptId>:<q_no>); null for an item you author
           kind  your name for the item type (the Work, judge and oracle switch on it)
           say   the question's line on the bubble (one sentence: one page); ask = the short prompt above the slot
                 (<= 3 lines of ~15 chars)
                 keyOnly: there is no question bar, so the bubble is the only place the question shows: `say` is the WHOLE question in ONE
                 sentence (the plan's question cut to one: put its setup back in when the child needs it). `ask` stays, because the checks and
                 the sidecar read it, but it is never drawn. A hint (miss, ladder rung) shows in place of the question: ONE sentence each
           answer what the slot or the working area must produce; miss = rung 1, shown at once UNDER the pinned
                  instruction after a miss (one sentence, never the answer; a second miss shows ladder[0], a third
                  ladder[1]), and kept there until the child acts again
           choices? [{ id, label }] for a word answer; pad?: "enter" when it is made on the working area
           parts?  [{ label, unit? }, …] with answer [a, b]: two boxes in the slot (quotient · remainder;
                   label at most 10 characters, e.g. { label: "each bowl", unit: "mL" }); typed reads "16|1".
                   A fraction: parts: SLOT_FRACTION, answer [3, 4] (drawn stacked). A mixed number or a
                   tidied answer: parts: SLOT_MIXED, answer [1, 2, 3] · [5, null, null] · [null, 7, 10]
                   (null = that box stays empty; the slot never says which kind the answer is)
                   A decimal: answer "0.09", a string in its written form (so "0.30" is not "0.3" and ".3"
                   is not "0.3"), with pointKey: true in the tool object below (the pad's point key) */
const PHASES = [
  {
    n: 1,
    concept: "Multiply in the smallest unit",
    conceptId: "M3.S4.T7.C30", objectiveIds: ["O11"],
    says: ["Smallest unit first. Now lay it again, and again."],
    /* guide steps on a WARM-UP ribbon (never question 1's own item): into centimetres, then one Copy a step; the picture
       resets when question 1 opens */
    warm: { kind: "times", u: "cm", big: 1, small: 20, times: 3, obj: "ribbon" }, stepHold: 2600,
    steps: [
      { say: "A ribbon is 1 m 20 cm long, so tap Centimetres to write it in its smallest unit.", on: "convert", hint: "Tap the Centimetres key at the bottom." },
      { say: "Tap Copy to lay a second ribbon at the end of the first one.", on: "copy", hint: "The Copy key lays one more ribbon." },
      { say: "Tap Copy once more, so that 3 ribbons lie end to end.", on: "copy", hint: "One ribbon is still missing from the row." },
    ],
    /* tries, as the plan writes it: First rung: write the measure in centimetres only. Second rung: lay two copies and add them. Third rung: the same task with fewer copies, before the question's own number of copies returns. */
    ladder: ["Now add one copy at a time along the row.", "Multiply the length of one copy by the number of copies."],
    closing: "Smallest unit first, then multiply the whole number.",
    learned: "You learned to multiply a measure in its smallest unit.",
    traceback: "The metres become centimetres, each copy is counted along the row, and the row's length in centimetres is written in green.",
    items: [
      /* learn SM1: answer in the plan = 580 cm. Plan: A shelf is 1 m 45 cm long. How long are 4 shelves in a row, in centimetres? */
      { qid: "M3.S4.T7.C30:SM1", kind: "times", u: "cm", big: 1, small: 45, times: 4, obj: "shelf", near: 180,
        say: "A shelf is 1 m 45 cm long; how long are 4 shelves in a row, in centimetres?", ask: "4 shelves in cm?", answer: 580,
        miss: "Count the metre too: one shelf is 100 cm and 45 cm more." },
      /* practice 1: answer in the plan = 305 cm. Plan: Before multiplying 3 m 5 cm by a number, write it in its smallest unit. What is it? */
      { qid: "M3.S4.T7.C30:1", kind: "convert", u: "cm", big: 3, small: 5, obj: "ribbon", near: 35,
        say: "Write 3 m 5 cm in its smallest unit, in centimetres, before you multiply it.", ask: "3 m 5 cm in cm?", answer: 305,
        miss: "Each metre is 100 cm, so count the three metres first.",
        ladder: ["Write each of the three metres as 100 cm.", "Put the three hundreds together, then add the small part."] },
      /* practice 3: answer in the plan = 345 cm, because 115 x 3 = 345. Plan: A tile is 1 m 15 cm long. How long are 3 tiles laid end to end, in centimetres? */
      { qid: "M3.S4.T7.C30:3", kind: "times", u: "cm", big: 1, small: 15, times: 3, obj: "tile", near: 45,
        say: "A tile is 1 m 15 cm long; how long are 3 tiles laid end to end, in centimetres?", ask: "3 tiles in cm?", answer: 345,
        miss: "Write one tile in centimetres before you multiply it by 3." },
    ],
  },
  {
    n: 2,
    concept: "Back to the larger unit",
    conceptId: "M3.S4.T7.C31", objectiveIds: ["O11"],
    says: ["How many whole kilograms are in there?"],
    /* guide steps on a WARM-UP bag: into grams, Copy puts out 4 bags with their total, Regroup makes a sack of every 1,000 g;
       the picture resets when question 1 opens (no Regroup key at a question: it would print the answer) */
    warm: { kind: "regroup", u: "g", big: 1, small: 200, times: 4, obj: "bag", warm: true }, stepHold: 2800,
    steps: [
      { say: "A bag holds 1 kg 200 g of rice, so tap Grams to write it in grams.", on: "convert", hint: "Tap the Grams key at the bottom." },
      { say: "Tap Copy to put out 4 bags and find their total in grams.", on: "copy", hint: "The Copy key puts out the other bags." },
      { say: "Tap Regroup to make a sack of every 1,000 g.", on: "regroup", hint: "The Regroup key bundles the grams." },
    ],
    /* tries, as the plan writes it: First rung: make one bundle from the total. Second rung: make every bundle it holds. Third rung: the same task on a total just over one kilogram, before the question's own total returns. */
    ladder: ["Make one bundle of the larger unit from the total, then the next.", "The part left after the last bundle is smaller than one bundle."],
    closing: "The product went back into the larger unit, with a small part beside it.",
    learned: "You learned to write a product back in the larger unit.",
    traceback: "The total is bundled into the larger unit one bundle at a time, and the part that is left beside them is written in green.",
    items: [
      /* learn SM2: answer in the plan = 14 kg 100 g, which is 14.1 kg. Plan: A packet holds 2 kg 350 g of sugar. How much do 6 packets hold, in kilograms and grams? */
      { qid: "M3.S4.T7.C31:SM2", kind: "regroup", u: "g", big: 2, small: 350, times: 6, obj: "packet", near: "141|0",
        parts: [{ label: "kg" }, { label: "g" }], answer: [14, 100],
        say: "How much do 6 packets of 2 kg 350 g hold, in kilograms and grams?", ask: "6 packets in kg and g?",
        miss: "Count how many thousands the total holds; each one is a whole unit." },
      /* practice 4: answer in the plan = 6 L 750 mL, because 1350 x 5 = 6750. Plan: A bottle holds 1 L 350 mL. How much do 5 bottles hold, in litres and millilitres? */
      { qid: "M3.S4.T7.C31:4", kind: "regroup", u: "mL", big: 1, small: 350, times: 5, obj: "bottle", near: "67|50",
        parts: [{ label: "L" }, { label: "mL" }], answer: [6, 750],
        say: "5 bottles hold 1 L 350 mL each; how much is that in litres and millilitres?", ask: "5 bottles in L and mL?",
        miss: "Write the total in millilitres, then count its whole litres." },
      /* practice 7: answer in the plan = 10 m 60 cm, because 265 x 4 = 1060. Plan: A plank is 2 m 65 cm long. How long are 4 planks laid end to end, in metres and centimetres? */
      { qid: "M3.S4.T7.C31:7", kind: "regroup", u: "cm", big: 2, small: 65, times: 4, obj: "plank", near: "1|60",
        parts: [{ label: "m" }, { label: "cm" }], answer: [10, 60],
        say: "How long are 4 planks of 2 m 65 cm end to end, in metres and centimetres?", ask: "4 planks in m and cm?",
        miss: "Write the total in centimetres; 100 cm make 1 m, not 1,000." },
    ],
  },
  {
    n: 3,
    concept: "Sharing equally",
    conceptId: "M3.S4.T7.C32", objectiveIds: ["O12"],
    says: ["Smallest unit first. Now cut it into equal pieces."],
    /* guide steps on a WARM-UP ribbon (the book's 4 m 20 cm into 5): into centimetres, then one Cut; the picture resets when
       question 1 opens */
    warm: { kind: "share", u: "cm", big: 4, small: 20, share: 5, obj: "ribbon" }, stepHold: 2600,
    steps: [
      { say: "A ribbon is 4 m 20 cm long, so tap Centimetres to write it in centimetres.", on: "convert", hint: "Tap the Centimetres key first." },
      { say: "Tap Cut to cut the ribbon into 5 equal pieces.", on: "cut", hint: "The Cut key cuts the ribbon." },
    ],
    /* tries, as the plan writes it: First rung: write the length in centimetres only. Second rung: cut it into two equal pieces. Third rung: the same task into fewer pieces, before the question's own number of pieces returns. */
    ladder: ["Now divide that whole number by the number of equal pieces.", "Ask what number times the number of pieces makes the whole."],
    closing: "Smallest unit first, then divide; each piece is the answer to the division.",
    learned: "You learned to share a measure equally in its smallest unit.",
    traceback: "The measure is cut into its equal pieces, each piece is labelled in the smallest unit, and one piece is written in green.",
    items: [
      /* learn SM3: answer in the plan = 75 cm. Plan: A pipe 4 m 50 cm long is cut into 6 equal pieces. How long is each piece? */
      { qid: "M3.S4.T7.C32:SM3", kind: "share", u: "cm", big: 4, small: 50, share: 6, obj: "pipe", near: 8,
        say: "A pipe of 4 m 50 cm is cut into 6 equal pieces; how many centimetres is each?", ask: "Each piece in cm?", answer: 75,
        miss: "Share the whole pipe in centimetres, not only the 50 cm." },
      /* practice 2: answer in the plan = 24 cm. Plan: A string 96 cm long is cut into 4 equal pieces. How long is each piece? */
      { qid: "M3.S4.T7.C32:2", kind: "share", u: "cm", big: 0, small: 96, share: 4, obj: "string", near: 25,
        say: "96 cm of string is shared into 4 equal pieces; how long is each piece?", ask: "Each piece in cm?", answer: 24,
        miss: "The string is already in centimetres, so divide 96 by 4.",
        ladder: ["Think of 96 as 80 and 16, and share each among the 4 pieces.", "80 shared by 4 is 20; now share the 16 the same way."] },
      /* practice 6: answer in the plan = 300 g, because 2400 divided by 8 is 300. Plan: A block of clay of 2 kg 400 g is shared equally among 8 pots. How much clay goes in each pot? */
      { qid: "M3.S4.T7.C32:6", kind: "share", u: "g", big: 2, small: 400, share: 8, obj: "clay", near: 50,
        say: "2 kg 400 g of clay is shared equally among 8 pots; how many grams go in each?", ask: "Each pot in g?", answer: 300,
        miss: "Write the clay in grams before you share it among the pots." },
    ],
  },
  {
    n: 4,
    concept: "Some left over",
    conceptId: "M3.S4.T7.C33", objectiveIds: ["O12"],
    says: ["Each cup gets the same. Is anything left over?"],
    /* guide steps on a WARM-UP jug: into millilitres, then one Share pours it equally into 3 cups; the picture resets when
       question 1 opens */
    warm: { kind: "left", u: "mL", big: 1, small: 300, share: 3, obj: "water", to: "cup" }, stepHold: 2800,
    steps: [
      { say: "A jug holds 1 L 300 mL, so tap Millilitres to write it in millilitres.", on: "convert", hint: "Tap the Millilitres key at the bottom." },
      { say: "Tap Share to pour the water equally into the 3 cups.", on: "share", hint: "The Share key fills the cups." },
    ],
    /* tries, as the plan writes it: First rung: write the capacity in millilitres only. Second rung: share it among two cups. Third rung: the same task among fewer cups, before the question's own cups return. */
    ladder: ["Divide in the smallest unit; what cannot be shared is left over.", "Multiply the share back and add what is left: it must make the whole."],
    closing: "When a sharing is not even, say each share and what is left over.",
    learned: "You learned to say what is left over when a sharing is not even.",
    traceback: "The cups fill level one by one, the part left over stays at the bottom in rose, and each share and the part left over are written in green.",
    items: [
      /* learn SM4: answer in the plan = 462 mL in each cup, with 2 mL left over in the can. Plan: A can holds 1 L 850 mL of juice. It is shared equally among 4 cups. How much goes in each cup, and how much is left over? */
      { qid: "M3.S4.T7.C33:SM4", kind: "left", u: "mL", big: 1, small: 850, share: 4, obj: "juice", to: "cup", near: "462|0",
        parts: [{ label: "each", unit: "mL" }, { label: "left over", unit: "mL" }], answer: [462, 2],
        say: "How much juice does each of 4 cups get from 1 L 850 mL, and how much is left?", ask: "Each cup and left over?",
        miss: "Divide the juice, in millilitres, by 4, and type what is left in the second box." },
      /* practice 5: answer in the plan = 257 g in each bowl, with 2 g left over, because 1030 divided by 4 is 257, with 2 left over. Plan: A bag of 1 kg 30 g of rice is shared equally among 4 bowls. How much goes in each bowl, and how much is left over? */
      { qid: "M3.S4.T7.C33:5", kind: "left", u: "g", big: 1, small: 30, share: 4, obj: "rice", to: "bowl", near: "257|0",
        parts: [{ label: "each", unit: "g" }, { label: "left over", unit: "g" }], answer: [257, 2],
        say: "4 bowls share 1 kg 30 g of rice equally; find each share and what is left.", ask: "Each bowl and left over?",
        miss: "Write the rice in grams, then share it among the 4 bowls." },
      /* practice 8: answer in the plan = 718 mL in each bottle, with 4 mL left over, because 5030 divided by 7 is 718, with 4 left over. Plan: A tank of 5 L 30 mL is shared equally into 7 bottles. How much goes in each bottle, and how much is left over? */
      { qid: "M3.S4.T7.C33:8", kind: "left", u: "mL", big: 5, small: 30, share: 7, obj: "water", to: "bottle", near: "718|0",
        parts: [{ label: "each", unit: "mL" }, { label: "left over", unit: "mL" }], answer: [718, 4],
        say: "5 L 30 mL of water fills 7 bottles equally; what is in each, and what stays?", ask: "Each bottle and left over?",
        miss: "Write the water in millilitres; 5 L is 5,000 mL." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  units: { cm: "1 m = 100 cm", g: "1 kg = 1,000 g", mL: "1 L = 1,000 mL" },
  method: "write the measure in its smallest unit, multiply or divide the whole number, write a product back in the larger unit, say what is left over",
};

/* the chapter's colours (the brief): Given deep blue, Answer green, Unit fact violet, Left over rose, the step at work amber */
const MM_BLUE = "#0072B2", MM_GREEN = "#009E73", MM_ROSE = "#CC79A7", MM_AMBER = "#E69F00";
const MM_FILL: any = { given: "#D6E8F5", answer: "#CDEFE2", now: "#FBE6B0", left: "#F4D5E6", unit: "#ECE3F7" };
const MM_INK: any = { given: "#004A75", answer: "#006247", unit: "#4E2F86", left: "#7A3A5E" };
/* a unit pair: the larger and the smaller unit, how many small make one large, the key that writes a measure in the small one */
const MM_UNITS: any = {
  cm: { big: "m", small: "cm", per: 100, key: "Centimetres" },
  g: { big: "kg", small: "g", per: 1000, key: "Grams" },
  mL: { big: "L", small: "mL", per: 1000, key: "Millilitres" },
};
/* free play: a ribbon laid up to 3 times (each copy a third of the board) and cut into 2 to 6 pieces */
const MM_FREE: any = { kind: "free", u: "cm", big: 1, small: 20, times: 3, obj: "ribbon" };
const mmNum = (v: number) => (v >= 1000 ? indian(v) : String(v));
const mmBase = (it: any) => (it.big || 0) * MM_UNITS[it.u].per + it.small;
const mmGiven = (it: any, tx: any) => (it.big ? `${it.big} ${tx(MM_UNITS[it.u].big)} ${it.small} ${tx(MM_UNITS[it.u].small)}` : `${it.small} ${tx(MM_UNITS[it.u].small)}`);
/* a text's width: Latin about 0.58 em a character; a Devanagari letter about 0.6 em (Poppins), a Gujarati one about 0.68 (the
   device's Gujarati font is wider); a spacing vowel sign (ा ि ी ો ...) about 0.3; a sign above or below none; a conjunct (letter,
   halant, letter) one letter */
const mmTW = (s: any, fs: number) => {
  let em = 0, skip = false;
  for (const ch of String(s)) {
    const c = ch.codePointAt(0) || 0, dev = c >= 0x900 && c <= 0x97f, guj = c >= 0xa80 && c <= 0xaff;
    if (skip) { skip = false; if (dev || guj) continue; }
    if (!dev && !guj) { em += 0.58; continue; }
    const o = c - (dev ? 0x900 : 0xa80);
    if (o === 0x4d) { skip = true; continue; }
    if (o <= 2 || o === 0x3a || o === 0x3c || (o >= 0x41 && o <= 0x48) || (o >= 0x51 && o <= 0x57) || o === 0x62 || o === 0x63) continue;
    em += o >= 0x3e && o <= 0x4c ? 0.32 : guj ? 0.7 : 0.64;
  }
  return em * fs;
};
/* the acts a question offers, in order (one key at the bottom follows them); a question whose answer IS the smallest unit offers none */
const mmSeq = (it: any) => {
  if (!it || it.kind === "convert" || it.kind === "free") return [];
  const a: string[] = it.big ? ["convert"] : [];
  if (it.kind === "times") for (let i = 1; i < it.times; i++) a.push("copy");
  if (it.kind === "regroup") { a.push("copy"); if (it.warm) a.push("regroup"); }
  if (it.kind === "share") a.push("cut");
  if (it.kind === "left") a.push("share");
  return a;
};
/* the traceback's last frame (it ends on the whole answer) */
const mmFinal = (it: any) => {
  if (it.kind === "times") return it.times + 1;
  if (it.kind === "convert") return it.big + 1;
  if (it.kind === "regroup") return Math.floor(mmBase(it) * it.times / MM_UNITS[it.u].per);
  return it.share + 1;
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work */
/* (by counting: repeated addition for a product, dealing out for a share, bundling by repeated subtraction) */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const per = it.u === "cm" ? 100 : 1000;
  let whole = it.small;
  for (let i = 0; i < it.big; i++) whole += per;
  if (it.kind === "convert") return it.answer === whole;
  if (it.kind === "times" || it.kind === "regroup") {
    let t = 0;
    for (let i = 0; i < it.times; i++) t += whole;
    if (it.kind === "times") return it.answer === t;
    let k = 0;
    while (t >= per) { t -= per; k++; }
    return it.answer[0] === k && it.answer[1] === t;
  }
  let q = 0, r = whole;
  while (r >= it.share) { r -= it.share; q++; }
  return it.kind === "share" ? r === 0 && it.answer === q : it.answer[0] === q && it.answer[1] === r;
}));
/* the most likely wrong answer (the misconception named on the item: only the centimetres multiplied, the split after two digits,
   the part left over dropped); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
  : /^\d*\.\d+$/.test(String(item.answer)) ? [String(item.answer), speakable(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: e.g. drop a token that waits; undefined = press Enter. In a guide-steps phase
   (stage "demo") it must return undefined, so the agent's check() reaches api.onEnter and performs the current step:
   set HOOK.check only while a question is open */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area ────────────────────────────────────────────────────────────────────────
   Its size is `box` ({ w, h, open }): the whole card (1472 x 528) with the answer panel shut and 1086 x 528 with it
   open, easing between (the board layout, docs/LAYOUT.md §1b, docs/PATTERNS.md §14): lay everything out from box.w
   with plain arithmetic in render, never from constants or api.W. Origin at the area's top-left.
   keyOnly (LAYOUT.md §1d): the question bar is gone, so the working area is 64,108, 1472 x 520 (NOT 64,202 x 528) with the panel shut, 1086 (900
   with bigPad) x 520 open. box.key = { x, y, w, h } is the key's corner in THIS area's coordinates (about x 1190, y 0, 282 x 88; wider on a
   Yes/No question): keep every element out of it, e.g. const kx = box.key ? box.key.x - 12 : box.w; (board-fit). There is no runs zone.
   Every act (cut, measure, count, tidy ...) is performed on screen: await api.act({ tool, moves, at, onPoint }) from the child's tap and
   react only when it resolves true (PATTERNS.md §15).
   Countable things use CONTENT colours (url(#gHundred|gTen|gOne|gBead|gPointer)); coloured numerals
   and words use a deeper ink, shade(colour, 0.25), so they read at 4.5:1. Type uses T.* only.
   Pieces: drag = useDrag(onDrop) then {...control(id, label), ...drag.bind(pay), ...drag.keys(pay)};
   taps = <Hit id x y w h onPress label />. One <Invite/> marks the one thing to touch.
   Nothing is written here that the bubble already says. `wrong` = { value, tries } after a miss:
   lock, redraw the mathematics in steps (the traceback), unlock; never mark it, never reset it.
   stage === "free" is Free play (the plan's writeup.freePlay): no target, every control unlocked.
   Sound effects where the picture moves: api.sfx.cut() (a knife), settle() (pieces come to rest),
   trade() (pieces close into one), tick() (a snap); correct, wrong, win and cheer are the runtime's.
   step / stepOn: the guide step the child is on and the act it waits for (null outside a steps phase).
   nextKey: true (the ToolFrame below, runtime r48+): nothing moves on by itself. After a right answer the win picture
   stays on the board until the child presses the blinking Next key, so never reset it on a timer (PATTERNS.md 9d).
   A SKIN (docs/IMAGES.md, docs/PATTERNS.md §14): when the slot has an images.tsx, draw <Skin name x y w h clip /> over
   the plain shape the tool already draws for the object (the plain shape stays the fallback); never a raster tag of your own here (no-raster-in-tool).
   */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  /* the guide steps work the phase's WARM-UP measure, never question 1's own; the questions draw their own item */
  /* a phase opens on "teach" for one frame before "demo": that frame draws the warm-up too, never question 1 */
  const warmIt = !free && (stage === "demo" || stage === "teach") && PHASES[n - 1] ? PHASES[n - 1].warm : null;
  const it: any = free ? MM_FREE : warmIt || item || MM_FREE;
  const k = free ? "free" : it.kind;
  const U = MM_UNITS[it.u] || MM_UNITS.cm;
  const seq = free ? [] : mmSeq(it);
  /* done: acts finished in `seq` · acting/prog: the act playing and how many of its points it has passed · tb: the traceback's
     frame · fc/fp: free play's copies and pieces */
  /* a new picture for every question, the warm-up and free play (Work remounts on a phase change). The state carries the key it
     belongs to and is reset DURING render, so a stale picture (the warm-up's, or the last question's) is never drawn or shared */
  const qk = n + ":" + index + ":" + (free ? "free" : warmIt ? "warm" : "q");
  const fresh = () => ({ done: 0, acting: "", prog: 0, tb: -1, fc: 1, fp: 1, qk });
  const [s0, setS] = useState<any>(fresh);
  const stale = s0.qk !== qk;
  if (stale) setS(fresh());
  const s = stale ? fresh() : s0;
  const put = (o: any) => setS((p: any) => ({ ...p, ...o }));
  const playing = useRef(false);
  const lastKey = useRef(0);
  useEffect(() => { tl.stop(); playing.current = false; }, [qk]);

  /* ── the room: laid out from box every frame (1472 x 520 shut, 900 x 520 open with bigPad); nothing under box.key ── */
  const W = box && box.w ? box.w : 1472, H = box && box.h ? box.h : 520;
  const kx = box && box.key ? Math.min(W, box.key.x - 12) : W;

  /* ── where the question stands ── */
  const F = free ? 0 : mmFinal(it);
  const tbOn = !free && s.tb >= 0;
  const rv = !free && (stage === "win" || stage === "idle" || s.tb >= F);   /* the whole answer is drawn (win, or the traceback's end) */
  /* `full`: the whole working is drawn: the win, the traceback's end, or the warm-up once its last act has played */
  const full = rv || (!!warmIt && mmSeq(it).length > 0 && s.done >= mmSeq(it).length);
  const f = full ? F : s.tb;
  const nDone = tbOn || rv ? seq.length : s.done;
  const did = seq.slice(0, nDone);
  const cur = !free && !tbOn && !rv && (stage === "demo" || stage === "ask") ? seq[s.done] : undefined;
  const base = mmBase(it);
  const times = it.times || 1, parts = it.share || 1;
  const q = Math.floor(base / parts), r = base - q * parts;
  const conv = k === "free" || (k !== "convert" && (!it.big || did.includes("convert") || (s.acting === "convert" && s.prog > 0)));
  const copies = k === "free" ? s.fc + (s.acting === "copy" && s.fc < MM_FREE.times ? s.prog : 0)
    : k === "times" ? Math.min(times, 1 + did.filter((a: string) => a === "copy").length + (s.acting === "copy" ? s.prog : 0))
    : k === "regroup" ? (did.includes("copy") ? times : Math.min(times, 1 + (s.acting === "copy" ? s.prog : 0))) : 1;
  const freeTp = s.fp >= 6 ? 2 : s.fp + 1;
  const pieces = k === "share" ? parts : k === "free" ? (s.acting === "cut" ? freeTp : s.fp) : 1;
  const cutN = k === "share" ? (did.includes("cut") ? parts - 1 : s.acting === "cut" ? s.prog : 0) : k === "free" ? (s.acting === "cut" ? s.prog : s.fp - 1) : 0;
  const parted = k === "share" ? did.includes("cut") : k === "free" ? s.fp > 1 && s.acting !== "cut" : false;
  const filled = k === "left" ? (did.includes("share") ? parts : s.acting === "share" ? s.prog : 0) : 0;

  /* ── the top row: the Given card, the × or ÷ card, the Smallest unit card, the violet unit fact ── */
  const fsV = W >= 1200 ? 56 : 48;
  const gTxt = mmGiven(it, tx);
  const gW = Math.max(230, mmTW(gTxt, fsV) + 44);
  const opTxt = k === "times" || k === "regroup" || k === "free" ? "× " + (k === "free" ? copies : times) : k === "share" || k === "left" ? "÷ " + parts : "";
  const oW = opTxt ? 132 : 0;
  const sVal = mmNum(base) + " " + tx(U.small);
  const sW = Math.max(260, mmTW(sVal, fsV) + 44, mmTW(tx("Smallest unit"), T.micro) + 40);
  const ox = gW + 16, sx = ox + (oW ? oW + 16 : 0);
  const ufL = "1 " + tx(U.big) + " =", ufR = mmNum(U.per) + " " + tx(U.small);
  const ufW = (mmTW(ufL, T.label) + mmTW(ufR, T.label)) * 0.95 + 16 + 40;
  const uf = sx + sW + 16 + ufW <= kx ? { x: sx + sW + 16, y: 32, w: ufW, h: 56 } : { x: sx, y: 128, w: ufW, h: 52 };
  const smShow = k === "convert" ? full : conv;
  /* the object skins (images.tsx): the ribbon only where the named whole IS a ribbon, a sack on each bundle of 1,000 g, the
     clay cup on cups; everything else stays plain (a skin never contradicts a name on screen) */
  const skR = it.obj === "ribbon" ? "ribbon" : "";
  const skB = it.obj === "bag" ? "sack" : "";   /* a sack of rice only where the item names rice (the warm-up's bag) */
  const skC = it.to === "cup" ? "cup" : "";
  const round = k === "left" && it.to !== "bottle";

  /* ── the strip band, drawn to scale: one copy is `cw` long ── */
  const SX = 10, SL = W - 20;
  /* phase 2: the copies stand tall in the middle of the free band at a question; when the bundles come (the warm-up's Regroup, the
     correction, the win) the row moves up to leave them room */
  const showB = k === "regroup" && (tbOn || full || did.includes("regroup") || s.acting === "regroup");
  /* ONE strip height per item, in every state (no size change mid-question): 170 where nothing later needs the room (phase 3,
     question 1.2), 130 where the green bracket must fit under it (1.1, 1.3 and their warm-up; free play) */
  const tallS = k === "share" || k === "convert";
  const BY = k === "regroup" ? (showB ? 196 : 236) : tallS ? 220 : 212, BH = k === "regroup" ? (showB ? 76 : 112) : tallS ? 170 : 130, CY = BY + BH / 2;
  const rowLen = k === "times" || k === "regroup" ? base * times : k === "free" ? base * MM_FREE.times : base;
  const sc = SL / rowLen, cw = base * sc;
  /* a label is sized for the room it has with the keypad OPEN (900 wide), so it never jumps when the panel comes and goes */
  const openK = Math.min(1, 880 / SL);
  /* the vessel and the cups (phase 4) */
  const VX = 10, VY = 140, VW = 240, VH = 224, IX = VX + 12, IY = VY + 16, IW = VW - 24, IH = VH - 28;
  const CX0 = VX + VW + 40, cupG = 20;
  /* cups and bowls are seen from above (round, the clay cup's own view), bottles from the side */
  const cupW = Math.min(round ? 156 : 118, (W - CX0 - 10 - cupG * (parts - 1)) / parts), cupH = round ? cupW : 150, cupY = VY + VH - cupH;
  /* a label's size inside a box of width w (28 to 32), or 0 when it must stand above the box instead */
  const fitFs = (txt: string, w: number, max = T.label) => { const fs = Math.min(max, (w - 20) / Math.max(0.5, mmTW(txt, 1))); return fs >= T.micro ? Math.floor(fs) : 0; };
  const callX = (cx: number, txt: string, fs: number) => { const hw = mmTW(txt, fs) * 0.62 + 8; return Math.max(hw, Math.min(W - hw, cx)); };

  /* ── the acts: every one performed on screen by the action kit or the drawn hand (api.act) ── */
  const KEY_LBL: any = { convert: U.key, copy: "Copy", cut: "Cut", share: "Share", regroup: "Regroup" };
  const bundleW = U.per * sc, nBundles = Math.floor((base * times) / U.per), BDY = 344, BDH = 70;
  const actFor = (on: string) => {
    if (on === "convert") return { tool: "pencil", moves: "draw", from: { x: sx + 30, y: 96 }, at: [{ x: sx + sW / 2, y: 96 }], to: { x: sx + sW - 30, y: 96 } };
    if (on === "copy") {
      if (k === "regroup") return { tool: "hand", moves: "tap", at: Array.from({ length: times - 1 }, (_, i) => ({ x: SX + (i + 1.5) * cw, y: CY })) };
      if (k === "free" && s.fc >= MM_FREE.times) return { tool: "hand", moves: "sweep", from: { x: SX + 2.5 * cw, y: CY }, at: [{ x: SX + 1.5 * cw, y: CY }], to: { x: SX + 0.5 * cw, y: CY } };
      return { tool: "hand", moves: "carry", from: { x: SX + cw / 2, y: CY }, at: [{ x: SX + (copies + 0.5) * cw, y: CY }],
        hold: <rect x={-cw / 2} y={-BH / 2} width={cw} height={BH} rx={12} fill={MM_FILL.given} stroke={MM_BLUE} strokeWidth={3} /> };
    }
    if (on === "cut") {
      const len = k === "free" ? s.fc * cw : base * sc, np = k === "free" ? freeTp : parts;
      return { tool: "knife", moves: "slice", at: Array.from({ length: np - 1 }, (_, j) => ({ x: SX + ((j + 1) * len) / np, y: CY })) };
    }
    if (on === "share") return { tool: "hand", moves: "tap", at: Array.from({ length: parts }, (_, i) => ({ x: CX0 + i * (cupW + cupG) + cupW / 2, y: cupY + cupH / 2 })) };
    if (on === "regroup") return { tool: "hand", moves: "sweep", from: { x: SX, y: BDY + BDH / 2 }, at: Array.from({ length: nBundles }, (_, i) => ({ x: SX + (i + 0.5) * bundleW, y: BDY + BDH / 2 })),
      to: { x: SX + nBundles * bundleW, y: BDY + BDH / 2 } };
    return null;
  };
  /* the act of a step (or of the key at a question, or in free play): the picture changes as the tool passes each point; the
     step moves on (api.did) only when the act has played to its end */
  const act = (on: string) => {
    if (playing.current) return;
    if (stage === "demo" && on !== stepOn) { api.did(on); return; }
    const o: any = actFor(on);
    if (!o) return;
    playing.current = true;
    const demo = stage === "demo";
    /* every update of this act lands only on the picture it started on (never on the next question's fresh one) */
    const myQk = qk, mine = (fn: (p: any) => any) => setS((p: any) => (p.qk === myQk ? fn(p) : p));
    put({ acting: on, prog: 0, ...(free && on === "copy" ? { fp: 1 } : {}) });
    api.act({ ...o, onPoint: (i: number) => mine((p: any) => ({ ...p, prog: i + 1 })) }).then((ok: boolean) => {
      playing.current = false;
      if (!ok) { mine((p: any) => ({ ...p, acting: "", prog: 0 })); return; }
      if (on === "cut" || on === "share") api.sfx.settle();
      if (demo) api.did(on);
      mine((p: any) => (free
        ? { ...p, acting: "", prog: 0, ...(on === "copy" ? { fc: p.fc >= MM_FREE.times ? 1 : p.fc + 1, fp: 1 } : { fp: p.fp >= 6 ? 2 : p.fp + 1 }) }
        : { ...p, done: p.done + 1, acting: "", prog: 0 }));
    });
  };
  const pressKey = (id: string) => { const t = Date.now(); if (t - lastKey.current < 400) return; lastKey.current = t; act(id); };
  /* Enter, the agent's check() and the dev solve() perform the CURRENT step */
  api.onEnter(stage === "demo" && stepOn ? () => act(stepOn) : null);
  HOOK.demo = () => { if (stepOn) act(stepOn); };

  /* the traceback: the acts are all done at once, then the maths is redrawn frame by frame and ends on the whole answer */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    api.lock(true);
    const gap = k === "regroup" ? 240 : 420, steps: any[] = [];
    for (let i = 0; i <= F; i++) steps.push([i === F ? 300 : gap, () => put({ tb: i, acting: "", prog: 0 })]);
    tl.run(steps, () => api.lock(false));
  }, [wrong]);

  /* a right answer: the question's own win line (the phase's closing replaces it at the last question) */
  const prevWin = useRef(false);
  useEffect(() => { const w = stage === "win"; if (w && !prevWin.current && !free) mmSayWin(api, it.qid); prevWin.current = w; }, [stage, index]);

  /* what the host and the agent read back (toolApi.getState): nothing that answers the question before it is answered */
  const won = stage === "win" || stage === "idle";
  api.share({ phase: n, measure: free ? null : mmGiven(it, (v: any) => v), smallest: k === "convert" ? (won ? base : null) : conv ? base : null,
    copies: k === "times" || k === "regroup" || k === "free" ? copies : null, cuts: k === "share" || k === "free" ? cutN : null,
    left_over: k === "left" && won ? r : null, answer: won ? it.answer : null, complete: stage === "idle" });

  /* ── drawing ── */
  const txtEl = (key: string, x: number, y: number, t: string, fs: number, fill: string, anchor = "middle", w = 700) => (
    <text key={key} x={x} y={y} textAnchor={anchor} fontSize={fs} fontWeight={w} fill={fill}>{t}</text>
  );
  const lookFill = (look: string) => (look === "answer" ? MM_FILL.answer : look === "now" ? MM_FILL.now : look === "left" ? MM_FILL.left : MM_FILL.given);
  const lookStroke = (look: string) => (look === "answer" ? MM_GREEN : look === "now" ? MM_AMBER : look === "left" ? MM_ROSE : MM_BLUE);
  /* a piece: the plain shape (the fallback), then its skin clipped to it, the colour code over the skin for a marked piece, the outline */
  const box3 = (key: string, x: number, y: number, w: number, h: number, look: string, rx = 12, sk = "") => {
    const ww = Math.max(2, w), rr = Math.min(rx, ww / 2), sw = look === "now" ? 5 : 3;
    if (!sk) return <rect key={key} x={x} y={y} width={ww} height={h} rx={rr} fill={lookFill(look)} stroke={lookStroke(look)} strokeWidth={sw} />;
    const cid = "mmclip-" + key;
    return (
      <g key={key}>
        <clipPath id={cid}><rect x={x} y={y} width={ww} height={h} rx={rr} /></clipPath>
        <rect x={x} y={y} width={ww} height={h} rx={rr} fill={lookFill(look)} />
        <Skin name={sk} x={x} y={y} w={ww} h={h} clip={"url(#" + cid + ")"} />
        {look !== "given" && <rect x={x} y={y} width={ww} height={h} rx={rr} fill={lookFill(look)} fillOpacity={0.6} />}
        <rect x={x} y={y} width={ww} height={h} rx={rr} fill="none" stroke={lookStroke(look)} strokeWidth={sw} />
      </g>
    );
  };
  /* a label inside its box (on a light chip over a skin), or (too narrow) just above the band */
  const labelIn = (key: string, cx: number, w: number, t: string, fill = C.ink, max = T.prompt, chip = false) => {
    const fs = fitFs(t, w * openK, max);
    if (!fs) return txtEl(key, callX(cx, t, T.label), BY - 12, t, T.label, fill);
    if (!chip) return txtEl(key, cx, CY + fs * 0.36, t, fs, fill);
    const tw = Math.min(w - 8, mmTW(t, fs) * 0.92 + 16);
    return (
      <g key={key}>
        <rect x={cx - tw / 2} y={CY - fs * 0.62} width={tw} height={fs * 1.24} rx={10} fill="#FFFFFF" fillOpacity={0.9} />
        {txtEl(key + "t", cx, CY + fs * 0.36, t, fs, fill)}
      </g>
    );
  };

  const topRow = () => (
    <g>
      <rect x={0} y={0} width={gW} height={120} rx={16} fill="#FFFFFF" stroke={MM_BLUE} strokeWidth={4} />
      {txtEl("gl", 18, 32, tx("Given"), T.micro, MM_INK.given, "start", 600)}
      {txtEl("gv", gW / 2, 98, gTxt, fsV, MM_INK.given)}
      {opTxt && <rect x={ox} y={0} width={oW} height={120} rx={16} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} />}
      {opTxt && txtEl("op", ox + oW / 2, 80, opTxt, T.xl, C.ink)}
      <rect x={sx} y={0} width={sW} height={120} rx={16} fill="#FFFFFF"
        stroke={tbOn && !full && f === 0 && (k === "times" || k === "regroup") ? MM_AMBER : k === "convert" && full ? MM_GREEN : C.rule} strokeWidth={4} />
      {txtEl("sl", sx + 18, 32, tx("Smallest unit"), T.micro, C.ink, "start", 600)}
      {txtEl("sv", sx + sW / 2, 98, smShow ? sVal : "? " + tx(U.small), fsV, k === "convert" && full ? MM_INK.answer : smShow ? MM_INK.given : C.ink)}
      <rect x={uf.x} y={uf.y} width={uf.w} height={uf.h} rx={14} fill={MM_FILL.unit} stroke={MM_INK.unit} strokeWidth={3} />
      {txtEl("u1", uf.x + 20, uf.y + uf.h / 2 + 11, ufL, T.label, MM_INK.unit, "start")}
      {txtEl("u2", uf.x + 20 + mmTW(ufL, T.label) * 0.95 + 16, uf.y + uf.h / 2 + 11, ufR, T.label, MM_INK.unit, "start")}
    </g>
  );

  /* one measure as its sections: a box a large unit and the small part, each named (before it is written in the small unit) */
  const sections = (relab: (i: number) => boolean, look: (i: number) => string) => {
    const out: any[] = [];
    for (let i = 0; i <= it.big; i++) {
      const isBig = i < it.big, w = (isBig ? U.per : it.small) * sc, x = SX + i * U.per * sc;
      if (!isBig && !it.small) continue;
      const t = isBig ? (relab(i) ? mmNum(U.per) + " " + tx(U.small) : "1 " + tx(U.big)) : it.small + " " + tx(U.small);
      out.push(box3("sec" + i, x, BY, w, BH, look(i), 10, skR));
      out.push(labelIn("sect" + i, x + w / 2, w, t, C.ink, T.prompt, !!skR));
    }
    return <g>{out}</g>;
  };

  /* phase 1 and 2: the copies laid end to end, the ones still to lay outlined */
  const copiesRow = () => {
    const out: any[] = [];
    const n1 = k === "free" ? MM_FREE.times : times;
    for (let i = copies; i < n1; i++) if (k !== "free") out.push(<rect key={"gh" + i} x={SX + i * cw + 3} y={BY + 3} width={cw - 6} height={BH - 6} rx={12} fill="none" stroke={C.rule} strokeWidth={3} strokeDasharray="10 8" />);
    if (k === "times" && copies === 1 && !conv) return <g>{out}{sections(() => false, () => "given")}</g>;
    /* each copy carries its length (in phase 2, six to a row, the number alone when "2,350 g" would fall under 32 with the keypad
       open: the unit stands on the Smallest unit card and the bracket); when it cannot fit inside (a long translation), only the
       first copy is named, above the row */
    const lab0 = conv ? sVal : gTxt;
    const lab = k === "regroup" && conv && fitFs(lab0, cw * openK) < T.label ? mmNum(base) : lab0, inside = fitFs(lab, cw * openK) > 0;
    for (let i = 0; i < copies; i++) {
      const look = full && k === "times" ? "answer" : tbOn && k === "times" && f >= 1 ? (i < f - 1 ? "answer" : i === f - 1 ? "now" : "given") : "given";
      out.push(box3("cp" + i, SX + i * cw, BY, cw, BH, look, 12, skR));
      if (inside || i === 0) out.push(labelIn("cpt" + i, SX + i * cw + cw / 2, cw, lab, C.ink, T.prompt, !!skR));
    }
    return <g>{out}</g>;
  };
  /* a bracket under the row with its length */
  const bracket = (len: number, t: string, fill: string, stroke: string) => {
    const y = BY + BH + 14, x2 = SX + len, fs = T.label;
    return (
      <g>
        <path d={`M ${SX} ${y} v 10 H ${x2} v -10`} fill="none" stroke={stroke} strokeWidth={3} />
        {txtEl("br", callX(SX + len / 2, t, fs), y + 44, t, fs, fill)}
      </g>
    );
  };
  /* phase 3 and free play: a strip cut into equal pieces that slide apart */
  const piecesRow = (len: number, label: string) => {
    const out: any[] = [];
    const gap = parted ? Math.min(24, len / pieces / 5) : 0, pw = (len - gap * (pieces - 1)) / pieces;
    if (parted) {
      const inFit = fitFs(label, pw * openK) > 0;
      for (let i = 0; i < pieces; i++) {
        const look = k === "share" && full ? (i === 0 ? "answer" : "given") : k === "share" && tbOn && f >= 1 ? (i === f - 1 ? "now" : "given") : "given";
        out.push(box3("pc" + i, SX + i * (pw + gap), BY, pw, BH, look, 12, skR));
        const shown = k === "free" || full || (tbOn && i < f);
        if (shown && inFit) out.push(labelIn("pct" + i, SX + i * (pw + gap) + pw / 2, pw, label, i === 0 && full ? MM_INK.answer : C.ink, T.label, !!skR));
      }
      /* free play: pieces too small to name one by one get one caption over the row ("each 40 cm") */
      if (k === "free" && !inFit) out.push(txtEl("pcc", SX, BY - 16, tx("each") + " " + label, T.label, C.ink, "start"));
      return <g>{out}</g>;
    }
    out.push(box3("whole", SX, BY, len, BH, "given", 12, skR));
    out.push(labelIn("wholet", SX + len / 2, len, k === "free" ? mmNum(len / sc) + " " + tx(U.small) : sVal, C.ink, T.prompt, !!skR));
    for (let j = 1; j <= cutN; j++) out.push(<line key={"cut" + j} x1={SX + (j * len) / pieces} y1={BY - 6} x2={SX + (j * len) / pieces} y2={BY + BH + 6} stroke={C.ink} strokeWidth={4} />);
    return <g>{out}</g>;
  };
  /* phase 2: the total bundled back into the larger unit, one bundle a frame, at the same scale as the row above */
  const bundles = () => {
    const T2 = base * times, K = nBundles, rem = T2 - K * U.per, bw = bundleW, y = BDY, h = BDH;
    const fullB = full || did.includes("regroup");
    const nB = fullB ? K : s.acting === "regroup" ? Math.min(K, s.prog) : Math.min(K, f + 1);
    const out: any[] = [];
    for (let i = 0; i < nB; i++) {
      out.push(box3("bd" + i, SX + i * bw + 2, y, bw - 4, h, !fullB && tbOn && i === f ? "now" : "answer", 8));
      const t = String(i + 1), fs = fitFs(t, bw - 4), cx = SX + i * bw + bw / 2;
      if (skB) {
        /* a sack of 1,000 g on each bundle, the count on a light chip at its foot */
        const sw = Math.min(bw - 10, (h - 6) * 0.8), sh = sw / 0.8;
        out.push(<Skin key={"bds" + i} name={skB} x={cx - sw / 2} y={y + (h - sh) / 2} w={sw} h={sh} />);
        if (fs) {
          const tw = mmTW(t, fs) + 10;
          out.push(<rect key={"bdk" + i} x={cx - tw / 2} y={y + h - fs - 8} width={tw} height={fs + 4} rx={8} fill="#FFFFFF" fillOpacity={0.92} />);
          out.push(txtEl("bdt" + i, cx, y + h - 10, t, fs, MM_INK.answer));
        }
      } else if (fs) out.push(txtEl("bdt" + i, cx, y + h / 2 + fs * 0.36, t, fs, MM_INK.answer));
    }
    /* the side labels share the total's baseline; Devanagari and Gujarati stand 6 lower so their top line clears the bracket */
    const sideY = BY + BH + 58 + (lang === "en" ? 0 : 6);
    if (nB) out.push(txtEl("bdc", SX, sideY, tx(MM_EACH[it.u]), T.label, MM_INK.answer, "start", 600));
    if (fullB) {
      out.push(box3("rem", SX + K * bw, y, Math.max(6, rem * sc), h, "answer", 3));
      const t = rem + " " + tx(U.small);
      out.push(txtEl("remt", Math.min(W - 4, SX + K * bw + Math.max(6, rem * sc)), sideY, t, T.label, MM_INK.answer, "end"));
    }
    return <g pointerEvents="none">{out}</g>;
  };
  /* phase 4: the vessel and the cups */
  const vessel = () => {
    const remain = base - filled * q, poured = filled === parts;
    const lvl = poured ? Math.max(16, (r / base) * IH) : (remain / base) * IH;
    const out: any[] = [];
    out.push(<rect key="vs" x={VX} y={VY} width={VW} height={VH} rx={24} fill="#FFFFFF" stroke={C.ink} strokeWidth={4} />);
    if (lvl > 0) out.push(box3("lq", IX, IY + IH - lvl, IW, lvl, poured ? (tbOn && !full && f === parts ? "now" : "left") : "given", 8));
    if (!filled) {
      const t = conv ? sVal : gTxt, fs = fitFs(t, IW);
      /* always 32 (the last bench): inside the vessel when it fits there at 32, else under it, where nothing stands before the pour */
      out.push(fs >= T.label ? txtEl("vt", IX + IW / 2, IY + IH / 2 + T.label * 0.36, t, T.label, C.ink) : txtEl("vt", VX, VY + VH + 38, t, T.label, C.ink, "start"));
    }
    if (poured) {
      out.push(txtEl("lo", IX + IW / 2, IY + IH - lvl - 12, tx("Left over"), T.micro, MM_INK.left));
      if (full) out.push(txtEl("lon", IX + IW / 2, IY + IH - lvl - 50, r + " " + tx(U.small), T.label, MM_INK.answer));
    }
    for (let i = 0; i < parts; i++) {
      const x = CX0 + i * (cupW + cupG), look = full ? "answer" : tbOn && f === i ? "now" : "given";
      if (round) {
        /* a cup or bowl seen from above: the rim, its hollow, the clay cup's skin over a cup, the share as a level disc inside */
        const cx = x + cupW / 2, cy = cupY + cupH / 2, R = cupW / 2;
        out.push(<circle key={"cup" + i} cx={cx} cy={cy} r={R - 2} fill="#F3E6D8" stroke={C.ink} strokeWidth={3} />);
        out.push(<circle key={"cuh" + i} cx={cx} cy={cy} r={R * 0.66} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />);
        if (skC) out.push(<Skin key={"cus" + i} name={skC} x={x} y={cupY} w={cupW} h={cupH} />);
        if (i < filled) out.push(<circle key={"cl" + i} cx={cx} cy={cy} r={R * 0.54} fill={lookFill(look)} fillOpacity={0.94} stroke={lookStroke(look)} strokeWidth={look === "now" ? 5 : 3} />);
      } else {
        out.push(<rect key={"cup" + i} x={x} y={cupY} width={cupW} height={cupH} rx={14} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} />);
        if (i < filled) out.push(box3("cl" + i, x + 7, cupY + cupH * 0.34, cupW - 14, cupH * 0.66 - 7, look, 8));
      }
    }
    return <g>{out}</g>;
  };
  /* the answer, written out (the win and the traceback's end) */
  const answerLine = () => {
    const u = tx(U.small), T2 = base * times, K = Math.floor(T2 / U.per);
    const ch: any[] = k === "times" ? [[`${mmNum(base)} ${u} × ${times}`], [`= ${mmNum(T2)} ${u}`]]
      : k === "convert" ? [[`${mmNum(it.big * U.per)} ${u} +`], [`${it.small} ${u}`], [`= ${mmNum(base)} ${u}`]]
      : k === "regroup" ? [[`${mmNum(T2)} ${u}`], [`= ${K} ${tx(U.big)}`], [`${T2 - K * U.per} ${u}`]]
      : k === "share" ? [[`${mmNum(base)} ${u} ÷ ${parts}`], [`= ${q} ${u}`]]
      : [[`${mmNum(base)} ${u} ÷ ${parts}`], [`= ${q} ${u},`], [`${r} ${u}`], [tx("left over"), MM_INK.left]];
    /* a sharing with a part left over is checked the book's way: the share times the parts, plus what is left, is the whole */
    const ch2: any[] = k === "left" ? [[`${parts} × ${q}`], [`+ ${r}`], [`= ${mmNum(base)} ${u}`]] : [];
    const ems = ch.reduce((a: number, c: any) => a + mmTW(c[0], 1), 0);
    const fs = Math.max(30, Math.min(40, (W - 100 - 18 * ch.length) / (ems * 1.04)));
    const two = ch2.length > 0, top = two ? 388 : 428, b1 = two ? 458 : 502;
    let x = 30, x2 = 30;
    const out = ch.map((c: any, j: number) => { const el = txtEl("al" + j, x, b1, c[0], fs, c[1] || MM_INK.answer, "start"); x += mmTW(c[0], fs) * 1.04 + 18; return el; });
    const out2 = ch2.map((c: any, j: number) => { const el = txtEl("am" + j, x2, 502, c[0], fs, MM_INK.answer, "start"); x2 += mmTW(c[0], fs) * 1.04 + 18; return el; });
    return (
      <g pointerEvents="none">
        <rect x={10} y={top} width={Math.max(x, x2) - 6} height={516 - top} rx={16} fill="#FFFFFF" stroke={MM_GREEN} strokeWidth={4} />
        {txtEl("alh", 30, top + 30, tx("Answer"), T.micro, MM_INK.answer, "start", 600)}
        {out}
        {out2}
      </g>
    );
  };
  /* the one key at the bottom centre: its label and its data-control follow the act (free play: Copy and Cut side by side) */
  const keys = () => {
    const ids = free ? ["copy", "cut"] : cur ? [cur] : [];
    if (!ids.length) return null;
    const kh = 80, ky = H - kh - 12, ws = ids.map((id) => Math.max(240, mmTW(tx(KEY_LBL[id]), T.label) + 64));
    let x = (W - (ws.reduce((a, b) => a + b, 0) + 24 * (ids.length - 1))) / 2;
    return ids.map((id, j) => {
      const kx0 = x, w = ws[j];
      x += w + 24;
      return (
        <g key={"act" + j}>
          <Key id={id} label={tx(KEY_LBL[id])} x={kx0} y={ky} w={w} h={kh} C={C} tone="key" onClick={() => pressKey(id)}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{tx(KEY_LBL[id])}</text>
          </Key>
          {stage === "demo" && id === stepOn && <BlinkRing x={kx0} y={ky} w={w} h={kh + EDGE} C={C} />}
        </g>
      );
    });
  };

  const strip = k === "left" ? vessel()
    : k === "convert" ? sections((i) => full || (tbOn && f >= i), (i) => (full ? "answer" : tbOn && f === i ? "now" : "given"))
    : k === "share" ? (!conv && !parted && !cutN ? sections(() => false, () => "given") : piecesRow(base * sc, mmNum(q) + " " + tx(U.small)))
    : k === "free" ? (s.fp > 1 || s.acting === "cut" ? piecesRow(s.fc * cw, mmNum((base * s.fc) / pieces) + " " + tx(U.small)) : copiesRow())
    : copiesRow();
  return (
    <g>
      {topRow()}
      {strip}
      {k === "regroup" && did.includes("copy") && bracket(base * times * sc, mmNum(base * times) + " " + tx(U.small), C.ink, C.ink)}
      {k === "times" && full && bracket(base * times * sc, mmNum(base * times) + " " + tx(U.small), MM_INK.answer, MM_GREEN)}
      {k === "free" && s.fc > 1 && bracket(s.fc * cw, mmNum(base * s.fc) + " " + tx(U.small), C.ink, C.ink)}
      {showB && bundles()}
      {full && answerLine()}
      {keys()}
    </g>
  );
}
const MM_EACH: any = { cm: "1 m each", g: "1 kg each", mL: "1 L each" };
/* the win line of each question, one literal a case (keyOnly: at a phase's last right answer the runtime shows the closing instead) */
function mmSayWin(api: any, qid: string) {
  if (qid === "M3.S4.T7.C30:SM1") api.say("Yes, 4 shelves of 145 cm make 580 cm in a row.");
  else if (qid === "M3.S4.T7.C30:1") api.say("Yes, 3 m 5 cm is 305 cm, one whole number.");
  else if (qid === "M3.S4.T7.C30:3") api.say("Yes, 3 tiles of 115 cm make 345 cm.");
  else if (qid === "M3.S4.T7.C31:SM2") api.say("Yes, 1,000 g make 1 kg, so 14,100 g is 14 kg and 100 g, or 14.1 kg.");
  else if (qid === "M3.S4.T7.C31:4") api.say("Yes, 1,000 mL make 1 L, so 6,750 mL is 6 L and 750 mL.");
  else if (qid === "M3.S4.T7.C31:7") api.say("Yes, 1,060 cm is 10 m and 60 cm.");
  else if (qid === "M3.S4.T7.C32:SM3") api.say("Yes, 450 cm shared by 6 is 75 cm a piece.");
  else if (qid === "M3.S4.T7.C32:2") api.say("Yes, 96 cm shared by 4 is 24 cm a piece.");
  else if (qid === "M3.S4.T7.C32:6") api.say("Yes, 2,400 g shared by 8 is 300 g a pot.");
  else if (qid === "M3.S4.T7.C33:SM4") api.say("Yes, each cup gets 462 mL, and 2 mL is left over.");
  else if (qid === "M3.S4.T7.C33:5") api.say("Yes, each bowl gets 257 g, and 2 g is left over.");
  else if (qid === "M3.S4.T7.C33:8") api.say("Yes, each bottle gets 718 mL, and 4 mL is left over.");
}

/* the summary page's small drawing of the child's last right answer in a phase (r24: `it` is the question itself;
   a two-box answer is read with slotPartsOf) */
function Thumb({ result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last) return null;
  const item = it || last.it;
  if (!item || !MM_UNITS[item.u]) return null;
  const U = MM_UNITS[item.u];
  /* one line (a row is about 66 tall: two lines of Hindi or Gujarati touch its outline): the answer in green; a left-over
     answer puts what is left in a rose chip (rose = left over, as on the board); the small green strip stands left of the
     text only where the text leaves it room in that language */
  let a = "", r = "";
  if (item.kind === "regroup") { const ps = slotPartsOf(last.value, 2); a = `${ps[0]} ${tx(U.big)} ${ps[1]} ${tx(U.small)}`; }
  else if (item.kind === "left") { const ps = slotPartsOf(last.value, 2); a = `${ps[0]} ${tx(U.small)}`; r = String(ps[1]); }
  else a = `${mmNum(Number(leadNumber(last.value)))} ${tx(U.small)}`;
  const tw = mmTW(a, T.micro) * 1.05, rw = r ? Math.max(44, mmTW(r, T.micro) + 18) : 0;
  const room = w - 28 - tw - (r ? rw + 12 : 0), strip = room >= 56;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {strip && <rect x={14} y={h / 2 - 14} width={Math.min(44, room - 12)} height={28} rx={6} fill={MM_FILL.answer} stroke={MM_GREEN} strokeWidth={2} />}
      {!strip && <rect x={w - 14 - tw - (r ? rw + 12 : 0)} y={h / 2 + 16} width={tw} height={5} rx={2.5} fill={MM_GREEN} />}
      <text x={w - 14 - (r ? rw + 12 : 0)} y={h / 2 + 10} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={MM_INK.answer}>{a}</text>
      {r && <rect x={w - 14 - rw} y={h / 2 - 20} width={rw} height={40} rx={10} fill={MM_FILL.left} stroke={MM_ROSE} strokeWidth={2} />}
      {r && <text x={w - 14 - rw / 2} y={h / 2 + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={MM_INK.left}>{r}</text>}
    </g>
  );
}

function MeasureMultiplier(props: any) {
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

export default MeasureMultiplier;
