/* ═══ M2.S2.T5.C21.2D1 · rows_times_squares · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build. SILENT runtime (r66): the bubble is the guide.
   keyOnly + navDots + board + bigPad + nextKey (docs/LAYOUT.md §1b-§1e, docs/PATTERNS.md §15-§16).
   The picture: a rectangle of unit squares, rows stacked from the bottom; rows x squares in a row = the count.
   Phase 1 Rows (one row a tap) · phase 2 Fill (every row) · phase 3 Square (the breadth pulled up to the side) ·
   phase 4 Split the length in three, Drop one part as the breadth, Fill. Every act through api.act. The answer is
   gated by the act (PATTERNS §19). Laid out once in the OPEN width (900 x 520), so nothing moves when the pad opens.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "rows_times_squares";
const MEDIA_ID = "M2.S2.T5.C21.2D1";
const TOOL_NAME = "Rows Times Squares";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

const OPENING = ["A rectangle, and one row of squares along it."];
const FINISH_LINE = "You turned counting squares into length times breadth.";
const FREE_LINE = "Free play. Change the length and the breadth, then stack the rows.";

const START_HOOK = "How can you count every square without counting one by one?";
function StartArt({ box, C }: any) {
  const L = 9, B = 5, cell = 56, gw = L * cell, gh = B * cell;
  const gx = Math.round(box.w / 2 - gw / 2), gy = Math.round(box.h / 2 - gh / 2);
  const lines: string[] = [];
  for (let i = 1; i < L; i++) lines.push(`M ${gx + i * cell} ${gy} V ${gy + gh}`);
  for (let r = 1; r < B; r++) lines.push(`M ${gx} ${gy + r * cell} H ${gx + gw}`);
  return (
    <g>
      <rect x={gx - 4} y={gy - 4} width={gw + 8} height={gh + 8} rx={6} fill="#000000" fillOpacity={0.06} />
      <rect x={gx} y={gy} width={gw} height={gh} fill={RX.cell} rx={4} />
      <rect x={gx} y={gy + gh - 2 * cell} width={gw} height={2 * cell} fill={tint(RX.violet, 0.55)} />
      <rect x={gx} y={gy + gh - 3 * cell} width={gw} height={cell} fill={tint(RX.amber, 0.45)} />
      <path d={lines.join(" ")} stroke={RX.ink} strokeWidth={2.4} fill="none" />
      <rect x={gx} y={gy} width={gw} height={gh} fill="none" stroke={RX.ink} strokeWidth={4.5} rx={4} />
    </g>
  );
}

/* Hindi and Gujarati: filled in the language pass, once the English is final. */
const TR: any = {
  hi: {
    "Rows Times Squares": "पंक्तियाँ गुणा वर्ग",
    "Rows times squares in a row": "पंक्तियाँ गुणा एक पंक्ति के वर्ग",
    "Length times breadth": "लंबाई गुणा चौड़ाई",
    "Side times side": "भुजा गुणा भुजा",
    "A breadth from a clue": "संकेत से चौड़ाई",
    "One row is laid. How many rows fill it?": "एक पंक्ति बिछी है। कितनी पंक्तियाँ इसे भरेंगी?",
    "The longer side is the length. Multiply it by the breadth.": "लंबी भुजा लंबाई है। इसे चौड़ाई से गुणा करो।",
    "In a square, the length and the breadth are the same.": "वर्ग में लंबाई और चौड़ाई बराबर होती हैं।",
    "Split the length into three equal parts. One part is the breadth.": "लंबाई को तीन बराबर भागों में बाँटो। एक भाग चौड़ाई है।",
    "Tap Fill to stack the rows on this 9 m by 6 m garden.": "9 m लंबे और 6 m चौड़े बगीचे पर पंक्तियाँ लगाने के लिए भरो दबाओ।",
    "The Fill key stacks every row.": "भरो बटन सारी पंक्तियाँ लगा देता है।",
    "Tap Square to make this board a square.": "इस तख्ते को वर्ग बनाने के लिए वर्ग दबाओ।",
    "Tap the Square key under the board.": "तख्ते के नीचे वर्ग बटन दबाओ।",
    "Tap Split to cut the strip.": "पट्टी काटने के लिए काटो दबाओ।",
    "One tap on Split cuts it in three.": "काटो पर एक बार दबाने से तीन भाग बनते हैं।",
    "Tap Drop to stand one part up as the breadth.": "एक भाग को चौड़ाई बनाकर खड़ा करने के लिए रखो दबाओ।",
    "Drop moves one part beside the rectangle.": "रखो एक भाग को आयत के पास ले जाता है।",
    "Tap Fill to stack the rows on the rectangle.": "आयत पर पंक्तियाँ लगाने के लिए भरो दबाओ।",
    "The Fill key is under the picture.": "भरो बटन चित्र के नीचे है।",
    "Multiply the squares in one row by the number of rows.": "एक पंक्ति के वर्गों को पंक्तियों की संख्या से गुणा करो।",
    "Look at the two side numbers on the picture.": "चित्र पर दोनों भुजाओं की संख्याएँ देखो।",
    "Multiply the two side numbers to count the unit squares.": "इकाई वर्ग गिनने के लिए दोनों भुजाओं की संख्याएँ गुणा करो।",
    "Read the side number under the square.": "वर्ग के नीचे लिखी भुजा की संख्या पढ़ो।",
    "Multiply the side number by the same number again.": "भुजा की संख्या को उसी संख्या से गुणा करो।",
    "Read the number on one cut part of the strip.": "पट्टी के एक कटे भाग पर लिखी संख्या पढ़ो।",
    "Ask what number times 3 gives the length, then multiply.": "सोचो किस संख्या का 3 गुना लंबाई है, फिर गुणा करो।",
    "Squares along the length times squares along the breadth gives the count.": "लंबाई के वर्ग गुणा चौड़ाई के वर्ग से कुल गिनती मिलती है।",
    "So the area of a rectangle is length times breadth in square units.": "तो आयत का क्षेत्रफल वर्ग इकाइयों में लंबाई गुणा चौड़ाई है।",
    "A square is a rectangle with equal sides, so its area is side times side.": "वर्ग बराबर भुजाओं वाला आयत है इसलिए उसका क्षेत्रफल भुजा गुणा भुजा है।",
    "Find the breadth from the clue first, then multiply length by breadth.": "पहले संकेत से चौड़ाई निकालो और फिर लंबाई को चौड़ाई से गुणा करो।",
    "You learned: squares in a row times the rows gives the count.": "तुमने सीखा: एक पंक्ति के वर्ग गुणा पंक्तियाँ = कुल गिनती।",
    "You learned: area = length × breadth, in square units.": "तुमने सीखा: क्षेत्रफल = लंबाई × चौड़ाई, वर्ग इकाइयों में।",
    "You learned: the area of a square is side × side.": "तुमने सीखा: वर्ग का क्षेत्रफल = भुजा × भुजा।",
    "You learned: find the breadth from the clue, then multiply.": "तुमने सीखा: पहले संकेत से चौड़ाई निकालो, फिर गुणा करो।",
    "Stack the rows, then say how many squares cover this 9 by 5 rectangle.": "पंक्तियाँ लगाओ और बताओ 9 वर्ग लंबे और 5 वर्ग चौड़े आयत में कितने वर्ग हैं।",
    "Squares in all?": "कुल कितने वर्ग?",
    "Each row holds 9 squares, so count the rows.": "हर पंक्ति में 9 वर्ग हैं, तो पंक्तियाँ गिनो।",
    "Yes, 5 rows of 9 squares make 45 squares.": "हाँ, 9 वर्गों की 5 पंक्तियाँ 45 वर्ग बनाती हैं।",
    "Now stack the rows of a 6 by 4 rectangle and find how many squares it covers.": "अब 6 लंबे और 4 चौड़े आयत पर पंक्तियाँ लगाओ और वर्ग गिनो।",
    "Count the squares in one row, then count the rows.": "एक पंक्ति के वर्ग गिनो, फिर पंक्तियाँ गिनो।",
    "Yes, 6 × 4 = 24 squares.": "हाँ, 6 × 4 = 24 वर्ग।",
    "How many squares cover a rectangle 12 squares long and 8 squares wide?": "12 वर्ग लंबे और 8 वर्ग चौड़े आयत में कितने वर्ग हैं?",
    "There are 8 rows, and each is as long as the length.": "8 पंक्तियाँ हैं और हर पंक्ति लंबाई जितनी लंबी है।",
    "Yes, 12 × 8 = 96 squares.": "हाँ, 12 × 8 = 96 वर्ग।",
    "Fill this 16 m by 7 m garden and find its area in square metres.": "16 m लंबे और 7 m चौड़े बगीचे को भरो और क्षेत्रफल वर्ग मीटर में बताओ।",
    "Area in sq. m?": "क्षेत्रफल वर्ग मी में?",
    "Adding the sides gives a length, not a surface.": "भुजाएँ जोड़ने से लंबाई मिलती है, सतह नहीं।",
    "Yes, 16 × 7 = 112 square metres.": "हाँ, 16 × 7 = 112 वर्ग मीटर।",
    "A card is 8 cm long and 6 cm wide, so what is its area in square centimetres?": "8 cm लंबे और 6 cm चौड़े कार्ड का क्षेत्रफल वर्ग सेंटीमीटर में कितना है?",
    "Area in sq. cm?": "क्षेत्रफल वर्ग सेमी में?",
    "Think of the card covered in rows of unit squares.": "सोचो कार्ड इकाई वर्गों की पंक्तियों से ढका है।",
    "Yes, 8 × 6 = 48 square centimetres.": "हाँ, 8 × 6 = 48 वर्ग सेंटीमीटर।",
    "Find the area in square metres of a floor 14 m long and 9 m wide.": "14 m लंबे और 9 m चौड़े फ़र्श का क्षेत्रफल वर्ग मीटर में निकालो।",
    "Each of the 9 rows holds 14 squares of one metre.": "9 पंक्तियों में से हर एक में एक मीटर के 14 वर्ग हैं।",
    "Yes, 14 × 9 = 126 square metres.": "हाँ, 14 × 9 = 126 वर्ग मीटर।",
    "Turn the board into a 15 cm square; what is its area in square centimetres?": "तख्ते को 15 cm का वर्ग बनाओ और क्षेत्रफल वर्ग सेंटीमीटर में बताओ।",
    "Adding the four sides gives the way round the edge, not the area.": "चारों भुजाएँ जोड़ने से किनारे का घेरा मिलता है, क्षेत्रफल नहीं।",
    "Yes, 15 × 15 = 225 square centimetres.": "हाँ, 15 × 15 = 225 वर्ग सेंटीमीटर।",
    "This stamp is a square of side 4 cm; what is its area in square centimetres?": "4 cm भुजा वाले वर्ग टिकट का क्षेत्रफल वर्ग सेंटीमीटर में कितना है?",
    "Count the rows of the stamp and the squares in each row.": "टिकट की पंक्तियाँ और हर पंक्ति के वर्ग गिनो।",
    "Yes, 4 × 4 = 16 square centimetres.": "हाँ, 4 × 4 = 16 वर्ग सेंटीमीटर।",
    "What is the area in square centimetres of a square tile with sides of 20 cm?": "20 cm भुजा वाली वर्गाकार टाइल का क्षेत्रफल वर्ग सेंटीमीटर में कितना है?",
    "The tile has 20 rows, and each row holds 20 squares.": "टाइल में 20 पंक्तियाँ हैं और हर पंक्ति में 20 वर्ग हैं।",
    "Yes, 20 × 20 = 400 square centimetres.": "हाँ, 20 × 20 = 400 वर्ग सेंटीमीटर।",
    "Its length is 27 cm and its breadth one third of that; find the area.": "लंबाई 27 cm है और चौड़ाई उसकी एक तिहाई; क्षेत्रफल निकालो।",
    "Is the breadth three times the length, or one third of it?": "चौड़ाई लंबाई की तीन गुना है या एक तिहाई?",
    "Yes, 27 × 9 = 243 square centimetres.": "हाँ, 27 × 9 = 243 वर्ग सेंटीमीटर।",
    "Now the length is 24 cm and the breadth is a third of it; what is the area?": "अब लंबाई 24 cm है और चौड़ाई उसकी एक तिहाई; क्षेत्रफल कितना है?",
    "Split 24 into three equal parts before you multiply.": "गुणा करने से पहले 24 को तीन बराबर भागों में बाँटो।",
    "Yes, 24 × 8 = 192 square centimetres.": "हाँ, 24 × 8 = 192 वर्ग सेंटीमीटर।",
    "A rectangle is 33 m long and one third of that wide; what is its area?": "एक आयत 33 m लंबा है और चौड़ाई उसकी एक तिहाई; क्षेत्रफल कितना है?",
    "One part of the three is the breadth, so find it first.": "तीन में से एक भाग चौड़ाई है, पहले उसे निकालो।",
    "Yes, 33 × 11 = 363 square metres.": "हाँ, 33 × 11 = 363 वर्ग मीटर।",
    "Stack the rows with the Fill key first.": "पहले भरो बटन से पंक्तियाँ लगाओ।",
    "Make the board a square with the Square key first.": "पहले वर्ग बटन से तख्ते को वर्ग बनाओ।",
    "Cut the length with the Split key first.": "पहले काटो बटन से लंबाई काटो।",
    "Stand one part up with the Drop key first.": "पहले रखो बटन से एक भाग खड़ा करो।",
    "A rectangle, and one row of squares along it.": "एक आयत और उसके साथ वर्गों की एक पंक्ति।",
    "Free play. Change the length and the breadth, then stack the rows.": "खुला खेल। लंबाई और चौड़ाई बदलो, फिर पंक्तियाँ लगाओ।",
    "How can you count every square without counting one by one?": "एक-एक गिने बिना सारे वर्ग कैसे गिनोगे?",
    "You turned counting squares into length times breadth.": "तुमने वर्ग गिनने को लंबाई गुणा चौड़ाई में बदल दिया।",
    "Rows": "पंक्ति",
    "Stack rows": "पंक्तियाँ लगाओ",
    "Tap Stack rows first.": "पहले पंक्तियाँ लगाओ दबाओ।",
    "Tap Stack rows to fill the rectangle with rows of squares.": "आयत को वर्गों की पंक्तियों से भरने के लिए पंक्तियाँ लगाओ दबाओ।",
    "One tap on Stack rows fills every row.": "पंक्तियाँ लगाओ पर एक बार दबाने से सारी पंक्तियाँ भर जाती हैं।",
    "Find the squares in one row and the number of rows.": "एक पंक्ति के वर्ग और पंक्तियों की संख्या देखो।",
    "Fill": "भरो",
    "Square": "वर्ग",
    "Split": "काटो",
    "Drop": "रखो",
    "Length −": "लंबाई −",
    "Length +": "लंबाई +",
    "Breadth −": "चौड़ाई −",
    "Breadth +": "चौड़ाई +",
    "squares": "वर्ग",
    "square": "वर्ग",
    "Row": "पंक्ति",
    "Boundary": "सीमा",
    "Breadth =": "चौड़ाई =",
    "one third of length": "लंबाई का एक तिहाई",
    "sq. cm": "वर्ग सेमी",
    "sq. m": "वर्ग मी",
  },
  gu: {
    "Rows Times Squares": "હરોળ ગુણ્યા ચોરસ",
    "Rows times squares in a row": "હરોળ ગુણ્યા એક હરોળના ચોરસ",
    "Length times breadth": "લંબાઈ ગુણ્યા પહોળાઈ",
    "Side times side": "બાજુ ગુણ્યા બાજુ",
    "A breadth from a clue": "સંકેતથી પહોળાઈ",
    "One row is laid. How many rows fill it?": "એક હરોળ મૂકી છે. કેટલી હરોળ તેને ભરશે?",
    "The longer side is the length. Multiply it by the breadth.": "લાંબી બાજુ લંબાઈ છે. તેને પહોળાઈથી ગુણો.",
    "In a square, the length and the breadth are the same.": "ચોરસમાં લંબાઈ અને પહોળાઈ સરખી હોય છે.",
    "Split the length into three equal parts. One part is the breadth.": "લંબાઈને ત્રણ સરખા ભાગમાં વહેંચો. એક ભાગ પહોળાઈ છે.",
    "Tap Fill to stack the rows on this 9 m by 6 m garden.": "9 m લાંબા અને 6 m પહોળા બગીચા પર હરોળ ગોઠવવા ભરો દબાવો.",
    "The Fill key stacks every row.": "ભરો બટન બધી હરોળ ગોઠવે છે.",
    "Tap Square to make this board a square.": "આ પાટિયાને ચોરસ બનાવવા ચોરસ દબાવો.",
    "Tap the Square key under the board.": "પાટિયા નીચેનું ચોરસ બટન દબાવો.",
    "Tap Split to cut the strip.": "પટ્ટી કાપવા કાપો દબાવો.",
    "One tap on Split cuts it in three.": "કાપો પર એક વાર દબાવવાથી ત્રણ ભાગ થાય છે.",
    "Tap Drop to stand one part up as the breadth.": "એક ભાગને પહોળાઈ તરીકે ઊભો કરવા મૂકો દબાવો.",
    "Drop moves one part beside the rectangle.": "મૂકો એક ભાગને લંબચોરસ પાસે લઈ જાય છે.",
    "Tap Fill to stack the rows on the rectangle.": "લંબચોરસ પર હરોળ ગોઠવવા ભરો દબાવો.",
    "The Fill key is under the picture.": "ભરો બટન ચિત્રની નીચે છે.",
    "Multiply the squares in one row by the number of rows.": "એક હરોળના ચોરસને હરોળની સંખ્યાથી ગુણો.",
    "Look at the two side numbers on the picture.": "ચિત્ર પર બંને બાજુની સંખ્યાઓ જુઓ.",
    "Multiply the two side numbers to count the unit squares.": "એકમ ચોરસ ગણવા બંને બાજુની સંખ્યાઓ ગુણો.",
    "Read the side number under the square.": "ચોરસની નીચે લખેલી બાજુની સંખ્યા વાંચો.",
    "Multiply the side number by the same number again.": "બાજુની સંખ્યાને એ જ સંખ્યાથી ગુણો.",
    "Read the number on one cut part of the strip.": "પટ્ટીના એક કાપેલા ભાગ પરની સંખ્યા વાંચો.",
    "Ask what number times 3 gives the length, then multiply.": "વિચારો કઈ સંખ્યાના 3 ગણા લંબાઈ થાય, પછી ગુણો.",
    "Squares along the length times squares along the breadth gives the count.": "લંબાઈના ચોરસ ગુણ્યા પહોળાઈના ચોરસથી કુલ ગણતરી મળે છે.",
    "So the area of a rectangle is length times breadth in square units.": "તો લંબચોરસનું ક્ષેત્રફળ ચોરસ એકમમાં લંબાઈ ગુણ્યા પહોળાઈ છે.",
    "A square is a rectangle with equal sides, so its area is side times side.": "ચોરસ સરખી બાજુઓવાળો લંબચોરસ છે તેથી તેનું ક્ષેત્રફળ બાજુ ગુણ્યા બાજુ છે.",
    "Find the breadth from the clue first, then multiply length by breadth.": "પહેલાં સંકેતથી પહોળાઈ શોધો અને પછી લંબાઈને પહોળાઈથી ગુણો.",
    "You learned: squares in a row times the rows gives the count.": "તમે શીખ્યા: એક હરોળના ચોરસ ગુણ્યા હરોળ = કુલ ગણતરી.",
    "You learned: area = length × breadth, in square units.": "તમે શીખ્યા: ક્ષેત્રફળ = લંબાઈ × પહોળાઈ, ચોરસ એકમમાં.",
    "You learned: the area of a square is side × side.": "તમે શીખ્યા: ચોરસનું ક્ષેત્રફળ = બાજુ × બાજુ.",
    "You learned: find the breadth from the clue, then multiply.": "તમે શીખ્યા: પહેલાં સંકેતથી પહોળાઈ શોધો, પછી ગુણો.",
    "Stack the rows, then say how many squares cover this 9 by 5 rectangle.": "હરોળ ગોઠવો અને કહો 9 ચોરસ લાંબા અને 5 ચોરસ પહોળા લંબચોરસમાં કેટલા ચોરસ છે.",
    "Squares in all?": "કુલ કેટલા ચોરસ?",
    "Each row holds 9 squares, so count the rows.": "દરેક હરોળમાં 9 ચોરસ છે, તો હરોળ ગણો.",
    "Yes, 5 rows of 9 squares make 45 squares.": "હા, 9 ચોરસની 5 હરોળ 45 ચોરસ બનાવે છે.",
    "Now stack the rows of a 6 by 4 rectangle and find how many squares it covers.": "હવે 6 લાંબા અને 4 પહોળા લંબચોરસ પર હરોળ ગોઠવો અને ચોરસ ગણો.",
    "Count the squares in one row, then count the rows.": "એક હરોળના ચોરસ ગણો, પછી હરોળ ગણો.",
    "Yes, 6 × 4 = 24 squares.": "હા, 6 × 4 = 24 ચોરસ.",
    "How many squares cover a rectangle 12 squares long and 8 squares wide?": "12 ચોરસ લાંબા અને 8 ચોરસ પહોળા લંબચોરસમાં કેટલા ચોરસ છે?",
    "There are 8 rows, and each is as long as the length.": "8 હરોળ છે અને દરેક હરોળ લંબાઈ જેટલી લાંબી છે.",
    "Yes, 12 × 8 = 96 squares.": "હા, 12 × 8 = 96 ચોરસ.",
    "Fill this 16 m by 7 m garden and find its area in square metres.": "16 m લાંબા અને 7 m પહોળા બગીચાને ભરો અને ક્ષેત્રફળ ચોરસ મીટરમાં કહો.",
    "Area in sq. m?": "ક્ષેત્રફળ ચોરસ મીમાં?",
    "Adding the sides gives a length, not a surface.": "બાજુઓ ઉમેરવાથી લંબાઈ મળે છે, સપાટી નહીં.",
    "Yes, 16 × 7 = 112 square metres.": "હા, 16 × 7 = 112 ચોરસ મીટર.",
    "A card is 8 cm long and 6 cm wide, so what is its area in square centimetres?": "8 cm લાંબા અને 6 cm પહોળા કાર્ડનું ક્ષેત્રફળ ચોરસ સેન્ટિમીટરમાં કેટલું છે?",
    "Area in sq. cm?": "ક્ષેત્રફળ ચોરસ સેમીમાં?",
    "Think of the card covered in rows of unit squares.": "વિચારો કે કાર્ડ એકમ ચોરસની હરોળથી ઢંકાયેલું છે.",
    "Yes, 8 × 6 = 48 square centimetres.": "હા, 8 × 6 = 48 ચોરસ સેન્ટિમીટર.",
    "Find the area in square metres of a floor 14 m long and 9 m wide.": "14 m લાંબી અને 9 m પહોળી ફરસનું ક્ષેત્રફળ ચોરસ મીટરમાં શોધો.",
    "Each of the 9 rows holds 14 squares of one metre.": "9 હરોળમાંની દરેકમાં એક મીટરના 14 ચોરસ છે.",
    "Yes, 14 × 9 = 126 square metres.": "હા, 14 × 9 = 126 ચોરસ મીટર.",
    "Turn the board into a 15 cm square; what is its area in square centimetres?": "પાટિયાને 15 cmનો ચોરસ બનાવો અને ક્ષેત્રફળ ચોરસ સેન્ટિમીટરમાં કહો.",
    "Adding the four sides gives the way round the edge, not the area.": "ચારેય બાજુઓ ઉમેરવાથી કિનારીનો ઘેરાવો મળે છે, ક્ષેત્રફળ નહીં.",
    "Yes, 15 × 15 = 225 square centimetres.": "હા, 15 × 15 = 225 ચોરસ સેન્ટિમીટર.",
    "This stamp is a square of side 4 cm; what is its area in square centimetres?": "4 cm બાજુવાળી ચોરસ ટિકિટનું ક્ષેત્રફળ ચોરસ સેન્ટિમીટરમાં કેટલું છે?",
    "Count the rows of the stamp and the squares in each row.": "ટિકિટની હરોળ અને દરેક હરોળના ચોરસ ગણો.",
    "Yes, 4 × 4 = 16 square centimetres.": "હા, 4 × 4 = 16 ચોરસ સેન્ટિમીટર.",
    "What is the area in square centimetres of a square tile with sides of 20 cm?": "20 cm બાજુવાળી ચોરસ ટાઇલનું ક્ષેત્રફળ ચોરસ સેન્ટિમીટરમાં કેટલું છે?",
    "The tile has 20 rows, and each row holds 20 squares.": "ટાઇલમાં 20 હરોળ છે અને દરેક હરોળમાં 20 ચોરસ છે.",
    "Yes, 20 × 20 = 400 square centimetres.": "હા, 20 × 20 = 400 ચોરસ સેન્ટિમીટર.",
    "Its length is 27 cm and its breadth one third of that; find the area.": "લંબાઈ 27 cm છે અને પહોળાઈ તેનો એક તૃતીયાંશ; ક્ષેત્રફળ શોધો.",
    "Is the breadth three times the length, or one third of it?": "પહોળાઈ લંબાઈની ત્રણ ગણી છે કે એક તૃતીયાંશ?",
    "Yes, 27 × 9 = 243 square centimetres.": "હા, 27 × 9 = 243 ચોરસ સેન્ટિમીટર.",
    "Now the length is 24 cm and the breadth is a third of it; what is the area?": "હવે લંબાઈ 24 cm છે અને પહોળાઈ તેનો એક તૃતીયાંશ; ક્ષેત્રફળ કેટલું છે?",
    "Split 24 into three equal parts before you multiply.": "ગુણતા પહેલાં 24ને ત્રણ સરખા ભાગમાં વહેંચો.",
    "Yes, 24 × 8 = 192 square centimetres.": "હા, 24 × 8 = 192 ચોરસ સેન્ટિમીટર.",
    "A rectangle is 33 m long and one third of that wide; what is its area?": "એક લંબચોરસ 33 m લાંબો છે અને પહોળાઈ તેનો એક તૃતીયાંશ; ક્ષેત્રફળ કેટલું છે?",
    "One part of the three is the breadth, so find it first.": "ત્રણમાંથી એક ભાગ પહોળાઈ છે, પહેલાં તે શોધો.",
    "Yes, 33 × 11 = 363 square metres.": "હા, 33 × 11 = 363 ચોરસ મીટર.",
    "Stack the rows with the Fill key first.": "પહેલાં ભરો બટનથી હરોળ ગોઠવો.",
    "Make the board a square with the Square key first.": "પહેલાં ચોરસ બટનથી પાટિયાને ચોરસ બનાવો.",
    "Cut the length with the Split key first.": "પહેલાં કાપો બટનથી લંબાઈ કાપો.",
    "Stand one part up with the Drop key first.": "પહેલાં મૂકો બટનથી એક ભાગ ઊભો કરો.",
    "A rectangle, and one row of squares along it.": "એક લંબચોરસ અને તેની સાથે ચોરસની એક હરોળ.",
    "Free play. Change the length and the breadth, then stack the rows.": "મુક્ત રમત. લંબાઈ અને પહોળાઈ બદલો, પછી હરોળ ગોઠવો.",
    "How can you count every square without counting one by one?": "એક-એક ગણ્યા વગર બધા ચોરસ કેવી રીતે ગણશો?",
    "You turned counting squares into length times breadth.": "તમે ચોરસ ગણવાને લંબાઈ ગુણ્યા પહોળાઈમાં ફેરવ્યું.",
    "Rows": "હરોળ",
    "Stack rows": "હરોળ ગોઠવો",
    "Tap Stack rows first.": "પહેલાં હરોળ ગોઠવો દબાવો.",
    "Tap Stack rows to fill the rectangle with rows of squares.": "લંબચોરસને ચોરસની હરોળથી ભરવા હરોળ ગોઠવો દબાવો.",
    "One tap on Stack rows fills every row.": "હરોળ ગોઠવો પર એક વાર દબાવવાથી બધી હરોળ ભરાય છે.",
    "Find the squares in one row and the number of rows.": "એક હરોળના ચોરસ અને હરોળની સંખ્યા જુઓ.",
    "Fill": "ભરો",
    "Square": "ચોરસ",
    "Split": "કાપો",
    "Drop": "મૂકો",
    "Length −": "લંબાઈ −",
    "Length +": "લંબાઈ +",
    "Breadth −": "પહોળાઈ −",
    "Breadth +": "પહોળાઈ +",
    "squares": "ચોરસ",
    "square": "ચોરસ",
    "Row": "હરોળ",
    "Boundary": "સીમા",
    "Breadth =": "પહોળાઈ =",
    "one third of length": "લંબાઈનો એક તૃતીયાંશ",
    "sq. cm": "ચોરસ સેમી",
    "sq. m": "ચોરસ મી",
  },
};

/* item fields: kind count | rect | square | clue · L squares (or units) along the length · B along the breadth (count, rect) ·
   b0 the board's breadth before Square (square) · clue: the breadth is L / 3 · unit "" | "cm" | "m" · win: the win line */
const PHASES: any[] = [
  {
    n: 1,
    concept: "Rows times squares in a row",
    conceptId: "M2.S2.T5.C20", objectiveIds: ["O7"],
    says: ["One row is laid. How many rows fill it?"],
    /* the warm-up: 7 along, 3 rows (none of this phase's answers) */
    warm: { kind: "count", L: 7, B: 3, unit: "" },
    steps: [
      { say: "Tap Stack rows to fill the rectangle with rows of squares.", on: "rows", hint: "One tap on Stack rows fills every row." },
    ],
    ladder: ["Find the squares in one row and the number of rows.", "Multiply the squares in one row by the number of rows."],
    closing: "Squares along the length times squares along the breadth gives the count.",
    learned: "You learned: squares in a row times the rows gives the count.",
    traceback: "The rows light up again one at a time beside the count, and the line ends on length x breadth = the count.",
    items: [
      /* learn RS1: answer in the plan = 45 squares */
      { qid: "M2.S2.T5.C20:RS1", kind: "count", L: 9, B: 5, unit: "", answer: 45, ask: "Squares in all?",
        say: "Stack the rows, then say how many squares cover this 9 by 5 rectangle.",
        miss: "Each row holds 9 squares, so count the rows.", win: "Yes, 5 rows of 9 squares make 45 squares." },
      /* practice 1: answer in the plan = 6 x 4 = 24, so 24 squares */
      { qid: "M2.S2.T5.C20:1", kind: "count", L: 6, B: 4, unit: "", answer: 24, ask: "Squares in all?",
        say: "Now stack the rows of a 6 by 4 rectangle and find how many squares it covers.",
        miss: "Count the squares in one row, then count the rows.", win: "Yes, 6 × 4 = 24 squares." },
      /* practice 8: answer in the plan = 12 x 8 = 96, so 96 squares */
      { qid: "M2.S2.T5.C20:8", kind: "count", L: 12, B: 8, unit: "", answer: 96, ask: "Squares in all?",
        say: "How many squares cover a rectangle 12 squares long and 8 squares wide?",
        miss: "There are 8 rows, and each is as long as the length.", win: "Yes, 12 × 8 = 96 squares." },
    ],
  },
  {
    n: 2,
    concept: "Length times breadth",
    conceptId: "M2.S2.T5.C21", objectiveIds: ["O7"],
    says: ["The longer side is the length. Multiply it by the breadth."],
    /* the warm-up: the textbook's 9 m by 6 m (54, none of this phase's answers) */
    warm: { kind: "rect", L: 9, B: 6, unit: "m", obj: "garden" },
    steps: [
      { say: "Tap Fill to stack the rows on this 9 m by 6 m garden.", on: "fill", hint: "The Fill key stacks every row." },
    ],
    ladder: ["Look at the two side numbers on the picture.", "Multiply the two side numbers to count the unit squares."],
    closing: "So the area of a rectangle is length times breadth in square units.",
    learned: "You learned: area = length × breadth, in square units.",
    traceback: "The rows of unit squares light up again, then the line ends on length x breadth = the area with its square unit.",
    items: [
      /* learn RS2: answer in the plan = 112 sq. m */
      { qid: "M2.S2.T5.C21:RS2", kind: "rect", L: 16, B: 7, unit: "m", answer: 112, ask: "Area in sq. m?",
        say: "Fill this 16 m by 7 m garden and find its area in square metres.", obj: "garden",
        miss: "Adding the sides gives a length, not a surface.", win: "Yes, 16 × 7 = 112 square metres." },
      /* practice 2: answer in the plan = 8 x 6 = 48, so the area of an 8 cm by 6 cm rectangle is 48 sq. cm */
      { qid: "M2.S2.T5.C21:2", kind: "rect", L: 8, B: 6, unit: "cm", answer: 48, ask: "Area in sq. cm?",
        say: "A card is 8 cm long and 6 cm wide, so what is its area in square centimetres?",
        miss: "Think of the card covered in rows of unit squares.", win: "Yes, 8 × 6 = 48 square centimetres." },
      /* practice 5: answer in the plan = 14 x 9 = 126, so the area of a 14 m by 9 m rectangle is 126 sq. m */
      { qid: "M2.S2.T5.C21:5", kind: "rect", L: 14, B: 9, unit: "m", answer: 126, ask: "Area in sq. m?",
        say: "Find the area in square metres of a floor 14 m long and 9 m wide.",
        miss: "Each of the 9 rows holds 14 squares of one metre.", win: "Yes, 14 × 9 = 126 square metres." },
    ],
  },
  {
    n: 3,
    concept: "Side times side",
    conceptId: "M2.S2.T5.C22", objectiveIds: ["O8"],
    says: ["In a square, the length and the breadth are the same."],
    /* the warm-up: the textbook's square of side 14 cm, from a 14 by 8 board (196, none of this phase's answers) */
    warm: { kind: "square", L: 14, b0: 8, unit: "cm" },
    steps: [
      { say: "Tap Square to make this board a square.", on: "square", hint: "Tap the Square key under the board." },
    ],
    ladder: ["Read the side number under the square.", "Multiply the side number by the same number again."],
    closing: "A square is a rectangle with equal sides, so its area is side times side.",
    learned: "You learned: the area of a square is side × side.",
    traceback: "The rows of the square light up again, then the line ends on side x side = the area in sq. cm.",
    items: [
      /* learn RS3: answer in the plan = 225 sq. cm */
      { qid: "M2.S2.T5.C22:RS3", kind: "square", L: 15, b0: 9, unit: "cm", answer: 225, ask: "Area in sq. cm?",
        say: "Turn the board into a 15 cm square; what is its area in square centimetres?",
        miss: "Adding the four sides gives the way round the edge, not the area.", win: "Yes, 15 × 15 = 225 square centimetres." },
      /* practice 3: answer in the plan = 4 x 4 = 16, so the area of a square of side 4 cm is 16 sq. cm */
      { qid: "M2.S2.T5.C22:3", kind: "square", L: 4, b0: 4, unit: "cm", answer: 16, ask: "Area in sq. cm?",
        say: "This stamp is a square of side 4 cm; what is its area in square centimetres?",
        miss: "Count the rows of the stamp and the squares in each row.", win: "Yes, 4 × 4 = 16 square centimetres." },
      /* practice 6: answer in the plan = 20 x 20 = 400, so 400 sq. cm */
      { qid: "M2.S2.T5.C22:6", kind: "square", L: 20, b0: 20, unit: "cm", answer: 400, ask: "Area in sq. cm?",
        say: "What is the area in square centimetres of a square tile with sides of 20 cm?",
        miss: "The tile has 20 rows, and each row holds 20 squares.", win: "Yes, 20 × 20 = 400 square centimetres." },
    ],
  },
  {
    n: 4,
    concept: "A breadth from a clue",
    conceptId: "M2.S2.T5.C23", objectiveIds: ["O8"],
    says: ["Split the length into three equal parts. One part is the breadth."],
    /* the warm-up: the textbook's 18 cm, breadth 6 cm (108, none of this phase's answers) */
    warm: { kind: "clue", L: 18, unit: "cm" },
    stepHold: 2000,
    steps: [
      { say: "Tap Split to cut the strip.", on: "split", hint: "One tap on Split cuts it in three." },
      { say: "Tap Drop to stand one part up as the breadth.", on: "drop", hint: "Drop moves one part beside the rectangle." },
      { say: "Tap Fill to stack the rows on the rectangle.", on: "fill", hint: "The Fill key is under the picture." },
    ],
    ladder: ["Read the number on one cut part of the strip.", "Ask what number times 3 gives the length, then multiply."],
    closing: "Find the breadth from the clue first, then multiply length by breadth.",
    learned: "You learned: find the breadth from the clue, then multiply.",
    traceback: "The split part stands as the breadth and the rows light up again, then the line ends on length x breadth = the area.",
    items: [
      /* learn RS4: answer in the plan = 243 sq. cm */
      { qid: "M2.S2.T5.C23:RS4", kind: "clue", L: 27, unit: "cm", answer: 243, ask: "Area in sq. cm?",
        say: "Its length is 27 cm and its breadth one third of that; find the area.",
        miss: "Is the breadth three times the length, or one third of it?", win: "Yes, 27 × 9 = 243 square centimetres." },
      /* authored (the plan has only two questions for this concept): 24 cm, breadth 8 cm, 24 x 8 = 192 sq. cm */
      { qid: null, kind: "clue", L: 24, unit: "cm", answer: 192, ask: "Area in sq. cm?",
        say: "Now the length is 24 cm and the breadth is a third of it; what is the area?",
        miss: "Split 24 into three equal parts before you multiply.", win: "Yes, 24 × 8 = 192 square centimetres." },
      /* practice 7: answer in the plan = One third of 33 m is 11 m, because 3 x 11 = 33. The area of a 33 m by 11 m rectangle is 33 x 11 = 363 sq. m */
      { qid: "M2.S2.T5.C23:7", kind: "clue", L: 33, unit: "m", answer: 363, ask: "Area in sq. m?",
        say: "A rectangle is 33 m long and one third of that wide; what is its area?",
        miss: "One part of the three is the breadth, so find it first.", win: "Yes, 33 × 11 = 363 square metres." },
    ],
  },
];

/* The numbers the working area needs (they go into the sidecar too). Unused plan question: M2.S2.T5.C20:4 (7 x 6 = 42,
   "the product and the count", the same number asked twice); phase 1 keeps three. */
const MODEL = { unusedQuestionIds: ["M2.S2.T5.C20:4"], cellMax: 72,
  /* the answer gate (PATTERNS §19), for the sidecar: every question is gated; none is ungated */
  answerGate: { "1": "Stack rows, one tap stacks every row; the pad opens when the sweep ends", "2": "Fill", "3": "Square on the learn item (15 x 9 board); Fill on items 2 and 3 (they open square)", "4": "Split, then Drop, then Fill", lockedAfter: "a real tap on an act key or a real Enter on a guide step (user mode); the agent's check() does the act at once", nudge: "a number-free line names the act key while locked; the act brings the question back" }, room: { x0: 70, x1: 830, y0: 12, y1: 368 } };

/* ── the maths ──────────────────────────────────────────────────────────────────────────── */
const judge = (item: any, v: any) => leadNumber(v) === item.answer;
/* oracle: rows are added up one by one (no multiplication), and a clue's breadth is found by counting up to a third */
const oracle = () => PHASES.every((p: any) => [p.warm, ...p.items].every((it: any) => {
  let b = it.B;
  if (it.kind === "square") b = it.L;
  if (it.kind === "clue") { b = 0; while (b + b + b < it.L) b++; if (b + b + b !== it.L) return false; }
  let s = 0;
  for (let r = 0; r < b; r++) s += it.L;
  return it === p.warm ? p.items.every((q: any) => q.answer !== s) : s === it.answer;
}));
/* the misconception: adding the sides (1, 2), four lots of the side (3), the length times three (4) */
const nearMiss = (item: any) => (item.kind === "square" ? (4 * item.L !== item.answer ? 4 * item.L : 2 * item.L) : item.kind === "clue" ? item.L * item.L * 3 : item.L + item.B);
const answerForms = (item: any) => [String(item.answer), indian(item.answer), words(item.answer)];
const agentKey = (item: any) => item.answer;

const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (T.state().stage === "demo") return HOOK.demo && HOOK.demo();
  if (HOOK.check) HOOK.check();
  return T.submit(item.answer);
};
const answer = (item: any, v: any) => undefined;
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area ──────────────────────────────────────────────────────────────────────── */
const RX = { blue: "#0072B2", green: "#009E73", violet: "#7A5BB5", amber: "#E69F00", verm: "#D55E00", ink: "#1E1E1E", cell: "#FFF8EC" };
const RX_X0 = 70, RX_X1 = 830, RX_Y0 = 12, RX_Y1 = 368;
const RX_STRIP_Y = 18, RX_STRIP_H = 64;
/* the laid (counted) squares: one violet, hue about 261, saturation about 0.46 (rule 3) */
/* the ink of a dim key's label: about 4:1 on the dim key's cream face, still clearly "off" */
const RX_DIM_INK = "#7A736A";
const RX_LAID = "#B39DDB", RX_LAID_TILE = "#A594E0", RX_LAID_PHOTO = "#6A55E0";
const RX_KEY = { x: 620, y: 428, w: 240, h: 76 };
const RX_LABEL: any = { rows: "Stack rows", fill: "Fill", square: "Square", split: "Split", drop: "Drop" };

function rxBreadth(it: any) { return it.kind === "square" ? it.L : it.kind === "clue" ? it.L / 3 : it.B; }
function rxGeo(L: number, B: number, top: number, x0 = RX_X0, x1 = RX_X1, y1 = RX_Y1) {
  const cell = Math.min((x1 - x0) / L, (y1 - top) / B, 100);
  const gw = L * cell, gh = B * cell;
  return { cell, gw, gh, gx: Math.round((x0 + x1) / 2 - gw / 2), gy: y1 - gh };
}
function rxOpenSq(it: any) { return it.kind === "square" && !(it.b0 < it.L); }
function rxFresh(it: any) { return { rows: it.kind === "square" && !rxOpenSq(it) ? it.b0 : it.kind === "clue" ? 0 : 1, cuts: 0, dropped: false }; }
function rxDone(it: any, S: any) { return it.kind === "clue" ? S.dropped && S.rows >= rxBreadth(it) : S.rows >= rxBreadth(it); }
function rxFull(it: any) { return { rows: rxBreadth(it), cuts: 2, dropped: true }; }
function rxNext(it: any, S: any) {
  if (it.kind === "count") return S.rows < it.B ? "rows" : null;
  if (it.kind === "rect") return S.rows < it.B ? "fill" : null;
  if (it.kind === "square") return S.rows < it.L ? (rxOpenSq(it) ? "fill" : "square") : null;
  if (S.cuts < 2) return "split";
  if (!S.dropped) return "drop";
  return S.rows < rxBreadth(it) ? "fill" : null;
}
function rxUnit(it: any) { return it.unit ? "sq. " + it.unit : ""; }

function Work({ phase, n, item, index, stage, wrong, typed, api, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const warm = (stage === "demo" || stage === "teach") && phase && phase.warm;
  const [F, setF] = useState<any>({ L: 8, B: 5, rows: 1 });
  const it: any = free ? { kind: "count", L: F.L, B: F.B, unit: "" } : warm ? phase.warm : item || {};

  /* the board belongs to an ENTRY of a question (PATTERNS §18): a new entry is a fresh board */
  const base = free ? "free" : warm ? "w" + n : "q" + n + "." + index;
  const ent = useRef({ base: "", k: 0 });
  if (ent.current.base !== base) ent.current = { base, k: ent.current.k + 1 };
  const qk = base + "#" + ent.current.k;
  const [raw, setRaw] = useState<any>({ qk: "" });
  const S0: any = free ? { rows: F.rows, cuts: 0, dropped: false } : raw.qk === qk ? raw : { ...rxFresh(it), qk };
  /* a right answer reached without the act (keyboard, gotoStep, classroom) still ends on the whole, correct working (rule 7) */
  const S: any = !free && (stage === "win" || stage === "idle") && !rxDone(it, S0) ? { ...S0, ...rxFull(it) } : S0;
  const put = (o: any) => {
    if (free) { setF((p: any) => ({ ...p, ...o })); return; }
    setRaw((p: any) => ({ ...(p.qk === qk ? p : { ...rxFresh(it), qk }), ...o, qk }));
  };

  const B = rxBreadth(it);
  const clue = it.kind === "clue";
  /* free play has no pad, so it takes the whole card: the grid on the left, its keys in a column on the right */
  const FKX = Math.round((box ? box.w : 900) - 230);
  const Y1 = free ? 444 : RX_Y1;
  const g = free ? rxGeo(it.L || 1, B || 1, 66, RX_X0, FKX - 90, Y1) : rxGeo(it.L || 1, B || 1, clue ? RX_STRIP_Y + RX_STRIP_H + 44 : RX_Y0);
  const done = rxDone(it, S);
  const win = !free && (stage === "win" || stage === "idle");
  const nxt = stage === "demo" ? stepOn : stage === "ask" ? rxNext(it, S) : free ? (S.rows < F.B ? "rows" : null) : null;

  const playing = useRef(false);
  const [busy, setBusy] = useState(false);
  const [touched, setTouched] = useState(false);
  const rowTop = (r: number) => Y1 - (r + 1) * g.cell;
  const run = (o: any, fin: () => void) => {
    if (playing.current) return;
    playing.current = true; setBusy(true);
    api.act(o).then((ok: boolean) => { playing.current = false; setBusy(false); if (ok) fin(); });
  };
  /* one act, done the same way by a tap, Enter in a guide step, the agent's check() and solve() */
  const act = (on: any) => {
    if (playing.current || !on) return;
    const demo = stage === "demo";
    const report = () => { if (demo) api.did(on); };
    const cx = g.gx + g.gw / 2;
    if (on === "rows" && !free) {
      const r0 = S.rows;
      if (r0 >= B) { report(); return; }
      const pts: any[] = [];
      for (let r = r0; r < B; r++) pts.push({ x: cx, y: rowTop(r) + g.cell / 2 });
      run({ tool: "hand", moves: "push", ms: Math.max(700, Math.min(1300, 250 * (B - r0))), from: { x: cx, y: Math.min(Y1 + 30, rowTop(r0) + g.cell * 1.6) }, at: pts, onPoint: (i: number) => put({ rows: r0 + i + 1 }) },
        () => { put({ rows: B }); api.sfx.settle(); report(); });
      return;
    }
    if (on === "rows") {
      const top = F.B, r = S.rows;
      if (r >= top) { report(); return; }
      run({ tool: "hand", moves: "push", from: { x: cx, y: rowTop(r) + g.cell * 1.6 }, at: [{ x: cx, y: rowTop(r) + g.cell / 2 }], onPoint: () => put({ rows: r + 1 }) },
        () => { put({ rows: r + 1 }); report(); });
      return;
    }
    if (on === "fill" || on === "square") {
      const top = on === "square" ? it.L : B, r0 = S.rows;
      if (r0 >= top || (clue && !S.dropped)) { report(); return; }
      const pts: any[] = [];
      for (let r = r0; r < top; r++) pts.push({ x: cx, y: rowTop(r) + g.cell / 2 });
      run({ tool: "hand", moves: "push", from: { x: cx, y: Math.min(Y1 + 30, rowTop(r0) + g.cell * 1.6) }, at: pts, onPoint: (i: number) => put({ rows: r0 + i + 1 }) },
        () => { put({ rows: top }); api.sfx.settle(); report(); });
      return;
    }
    if (on === "split") {
      if (S.cuts >= 2) { report(); return; }
      run({ tool: "scissors", moves: "snip", at: [1, 2].map((k) => ({ x: g.gx + (g.gw * k) / 3, y: RX_STRIP_Y + RX_STRIP_H / 2 })), onPoint: (i: number) => put({ cuts: i + 1 }) },
        () => { put({ cuts: 2 }); api.sfx.settle(); report(); });
      return;
    }
    if (on === "drop") {
      if (S.dropped || S.cuts < 2) { report(); return; }
      run({ tool: "hand", moves: "carry", from: { x: g.gx + g.gw / 6, y: RX_STRIP_Y + RX_STRIP_H / 2 }, at: [{ x: g.gx - 20, y: Y1 - g.gh / 2 }], onPoint: () => put({ dropped: true }) },
        () => { put({ dropped: true }); api.sfx.tick(); report(); });
    }
  };
  const lastKey = useRef(0);
  const pressKey = (on: any) => {
    const t = Date.now();
    if (t - lastKey.current < 400) return;
    lastKey.current = t;
    setTouched(true);
    act(on);
  };
  /* a real Enter on a guide step is a touch (user mode: the agent's check() sends no key event) */
  const realEnter = useRef(0);
  api.onEnter(stage === "demo" && stepOn ? () => { if (Date.now() - realEnter.current < 400) setTouched(true); act(stepOn); } : null);
  HOOK.demo = stage === "demo" && stepOn ? () => act(stepOn) : null;
  /* the agent performs the question's act at once (AI mode is never gated) */
  HOOK.check = stage === "ask" && !done ? () => { put(rxFull(it)); return undefined; } : null;

  /* the answer is gated by the act (PATTERNS §19): locked only after a real touch, until the act is done */
  useEffect(() => {
    if (stage !== "ask" || free || tl.busy) return;
    api.lock(touched && (!done || busy));
  }, [stage, touched, done, busy, qk]);

  /* the nudge while the Answer key is locked (PATTERNS §19 side effect 1): number-free, one literal a case; a tap on the
     locked key or a typed key brings it, and the act that answers it brings the question back */
  const nudge = (on: any) => {
    if (on === "rows") api.say("Tap Stack rows first.");
    else if (on === "fill") api.say("Stack the rows with the Fill key first.");
    else if (on === "square") api.say("Make the board a square with the Square key first.");
    else if (on === "split") api.say("Cut the length with the Split key first.");
    else if (on === "drop") api.say("Stand one part up with the Drop key first.");
  };
  const gate = useRef<any>({});
  gate.current = { locked: stage === "ask" && !free && touched && (!done || busy), next: rxNext(it, S), nudged: stage === "ask" && (gate.current.nudged === qk || gate.current.nudged === "-" + qk) ? gate.current.nudged : "" };
  useEffect(() => {
    const onKey = (e: any) => {
      /* only a key meant for the lesson: on the page itself, a key of the pad or one of this tool's act keys (never the header's Hint key) */
      const ctl = e.target && e.target.closest ? e.target.closest("[data-control]") : null;
      const id = ctl ? ctl.getAttribute("data-control") : "";
      const lesson = !ctl || /^(key-|answer-open$)/.test(id) || !!RX_LABEL[id];
      if (!lesson) return;
      if (e.key === "Enter" && !e.repeat && e.isTrusted) realEnter.current = Date.now();
      const G = gate.current;
      if (G.locked && !playing.current && !G.nudged && (/^[0-9.]$/.test(e.key) || e.key === "Enter" || e.key === "Backspace")) { G.nudged = qk; nudgedOn.current = G.next; nudge(G.next); }
    };
    const onDown = (e: any) => {
      const G = gate.current;
      const el = e.target && e.target.closest ? e.target.closest('[data-control="answer-open"],[data-control^="key-"]') : null;
      if (el && G.locked && !playing.current && !G.nudged) { G.nudged = qk; nudgedOn.current = G.next; nudge(G.next); }
    };
    document.addEventListener("keydown", onKey, true);
    document.addEventListener("pointerdown", onDown, true);
    return () => { document.removeEventListener("keydown", onKey, true); document.removeEventListener("pointerdown", onDown, true); };
  }, [qk]);
  /* after an act, a question whose nudge is showing gets the next nudge, or the question again once the act is done */
  const lastDone = useRef("");
  const nudgedOn = useRef("");
  useEffect(() => { nudgedOn.current = ""; }, [qk]);
  useEffect(() => {
    if (stage !== "ask" || free || busy || gate.current.nudged !== qk) return;
    const key = qk + ":" + S.rows + ":" + S.cuts + ":" + S.dropped;
    if (lastDone.current === key) return;
    lastDone.current = key;
    /* the question comes back only when the WHOLE act is done; until then the bubble names the act still waiting (said once each) */
    if (done) { gate.current.nudged = "-" + qk; api.say(item.say); return; }
    const nx = rxNext(it, S);
    if (nx && nx !== nudgedOn.current) { nudgedOn.current = nx; nudge(nx); }
  }, [busy, done, S.rows, S.cuts, S.dropped]);

  /* the traceback: the act completed if it was not, the rows light up one at a time with L x k beside them,
     then the whole line L x B = the answer; drawn on a demo layer that clears when the child types again */
  const [trc, setTrc] = useState<any>(null);
  useEffect(() => {
    if (!wrong || wrong.tries < 3 || stage !== "ask" || free) return;   /* misses 1 and 2: the bubble clue only (owner, 2026-11-18) */
    api.lock(true);
    if (!done) put(rxFull(it));
    const v = leadNumber(wrong.value);
    const bound = v === 2 * (it.L + B);
    const sum = !bound && it.kind !== "square" && v === it.L + B;
    const steps: any[] = [];
    if (bound || sum) steps.push([900, () => setTrc({ qk, k: 0, bound, sum, line: false })]);
    const ms = Math.max(140, Math.min(320, 2400 / B));
    for (let r = 1; r <= B; r++) { const k = r; steps.push([ms, () => setTrc({ qk, k, bound, sum, line: false })]); }
    steps.push([500, () => setTrc({ qk, k: 0, bound: false, line: true })]);
    tl.run(steps, () => api.lock(false));
  }, [wrong]);
  useEffect(() => () => tl.stop(), [qk]);
  const T0 = trc && trc.qk === qk && stage === "ask" && !typed ? trc : null;

  /* the win line, one sentence (a phase's last one gives way to its closing) */
  useEffect(() => { if (stage === "win" && item && item.win) api.say(item.win); }, [stage]);

  api.share({ phase: n, along_length: it.L, rows: S.rows, square: it.kind === "square" ? S.rows >= it.L : undefined,
    split: clue ? S.cuts >= 2 : undefined, breadth: clue ? (S.dropped ? B : null) : undefined, complete: stage === "idle" });

  /* ── drawing ── */
  const blueInk = shade(RX.blue, 0.25), greenInk = shade(RX.green, 0.25), amberInk = shade(RX.amber, 0.35);
  const showRows = it.kind === "square" && !rxOpenSq(it) ? S.rows : B;
  const gridOn = !clue || S.dropped;
  const gy = Y1 - showRows * g.cell, gh = showRows * g.cell;
  const thin = g.cell < 30 ? 1.6 : 2.4;
  const lit = T0 ? T0.k : -1;
  const gridLines = () => {
    const d: string[] = [];
    for (let i = 1; i < it.L; i++) d.push(`M ${g.gx + i * g.cell} ${gy} V ${Y1}`);
    for (let r = 1; r < showRows; r++) d.push(`M ${g.gx} ${Y1 - r * g.cell} H ${g.gx + g.gw}`);
    return d.join(" ");
  };
  const laidFill = win ? tint(RX.green, 0.45) : RX_LAID;
  /* skins (owner, 2026-11-16): a tile per counted square only on a screen of at most 40 cells; a bigger grid stays plain.
     The garden's flower bed shows under the garden's empty squares. */
  const laidN = Math.min(S.rows, showRows);
  const tiles = it.L * (it.kind === "square" ? it.L : B) <= 40;
  const garden = it.obj === "garden";
  const tileCells = () => {
    const out: any[] = [];
    for (let r = 0; r < laidN; r++) {
      for (let i = 0; i < it.L; i++) {
        const cx = g.gx + i * g.cell;
        const cy = rowTop(r);
        out.push(
          <g key={"tl" + r + "." + i}>
            <rect x={cx} y={cy} width={g.cell} height={g.cell} fill={RX.cell} />
            <Skin name="tile" x={cx} y={cy} w={g.cell} h={g.cell} fit="stretch" />
          </g>
        );
      }
    }
    return out;
  };
  const grid = () => (
    <g>
      <rect x={g.gx - 3} y={gy - 3} width={g.gw + 6} height={gh + 6} rx={6} fill="#000000" fillOpacity={0.06} />
      <rect x={g.gx} y={gy} width={g.gw} height={gh} fill={garden ? tint(RX.green, 0.5) : RX.cell} rx={4} />
      {garden && <Skin name="garden" x={g.gx} y={gy} w={g.gw} h={gh} clip="url(#rx-garden)" />}
      {garden && <defs><clipPath id="rx-garden"><rect x={g.gx} y={gy} width={g.gw} height={gh} rx={4} /></clipPath></defs>}
      {tiles && tileCells()}
      {S.rows > 0 && <rect x={g.gx} y={Y1 - laidN * g.cell} width={g.gw} height={laidN * g.cell} fill={win ? laidFill : garden ? RX_LAID_PHOTO : tiles ? RX_LAID_TILE : laidFill} fillOpacity={win ? (tiles || garden ? 0.85 : 1) : tiles ? 0.85 : garden ? 0.82 : 1} />}
      {busy && S.rows > 0 && <rect x={g.gx} y={rowTop(S.rows - 1)} width={g.gw} height={g.cell} fill={tint(RX.amber, 0.35)} />}
      {lit > 0 && <rect x={g.gx} y={Y1 - lit * g.cell} width={g.gw} height={lit * g.cell} fill={RX.amber} fillOpacity={0.45} pointerEvents="none" />}
      {garden && <path d={gridLines()} stroke="#FFFDF7" strokeWidth={thin + 2.6} strokeOpacity={0.8} fill="none" />}
      <path d={gridLines()} stroke={RX.ink} strokeWidth={thin} fill="none" />
      <rect x={g.gx} y={gy} width={g.gw} height={gh} fill="none" stroke={T0 && T0.bound ? RX.verm : RX.ink} strokeWidth={T0 && T0.bound ? 9 : 4.5} rx={4} />
      {T0 && T0.sum && <path d={`M ${g.gx} ${Y1} H ${g.gx + g.gw} V ${gy}`} fill="none" stroke={RX.amber} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" pointerEvents="none" />}
      {it.kind === "square" && !rxOpenSq(it) && S.rows < it.L && (
        <rect x={g.gx} y={Y1 - it.L * g.cell} width={g.gw} height={(it.L - S.rows) * g.cell} fill="none" stroke={RX.amber} strokeWidth={3} strokeDasharray="12 10" />
      )}
    </g>
  );
  const chipH = (size: number) => Math.round(size * (lang === "en" ? 1.25 : 1.55));
  const chip = (x: number, y: number, s: string, size: number, fill: string, anchor = "middle", rot = 0, maxH = 0, k = 0.58) => {
    const padX = 14;
    const h = maxH ? Math.min(chipH(size), maxH) : chipH(size);
    if (maxH) size = Math.min(size, h / (lang === "en" ? 1.2 : 1.35));
    const w = Math.max(48, Math.round(s.length * size * k + padX * 2));
    const x0 = anchor === "middle" ? x - w / 2 : anchor === "end" ? x - w : x;
    const y0 = y - h / 2;
    return (
      <g transform={rot ? `rotate(${rot} ${x} ${y})` : undefined}>
        <rect x={x0} y={y0} width={w} height={h} rx={h / 2} fill="#FFFFFF" stroke="#E2D9CC" strokeWidth={1.5} filter="url(#rx-chip-shadow)" />
        <text x={anchor === "middle" ? x : anchor === "end" ? x - padX : x + padX} y={lang === "en" ? y : y + size * 0.08} textAnchor={anchor} dominantBaseline="central" fontSize={size} fontWeight={700} fill={fill}>{s}</text>
      </g>
    );
  };
  const unitOf = (k: number) => (it.kind === "count" ? (k === 1 ? tx("square") : tx("squares")) : it.unit);
  const lenLabel = `${it.L} ${unitOf(it.L)}`;
  const brLabel = it.kind === "square" ? `${showRows} ${it.unit}` : `${B} ${unitOf(B)}`;

  /* the line under the picture: L x B = ? once the act is done; the answer only at the win, in the warm-up and in a correction */
  const ans = it.L * B;
  const reveal = win || stage === "demo" || free || (T0 && T0.line);
  const lineOn = T0 ? T0.k > 0 || T0.line : done && ((stage === "ask" && index === 0) || stage === "demo" || win || free);
  /* the line: ONE run with real, equal spaces, the unit on the result ("15 × 15 = 225 sq. cm"); a reading, not a label */
  const lineText = T0 && !T0.line ? `${it.L} × ${T0.k}` : `${it.L} × ${B} = ${reveal ? ans : "?"}`;
  const unitWords: string[] = T0 && !T0.line ? [] : rxUnit(it) ? String(tx(rxUnit(it))).split(/\s+/) : [];
  const lineAt = (x: number, y: number, size: number, fill: string, anchor: string) => (
    <text x={x} y={y} textAnchor={anchor} dominantBaseline="central" fontSize={size} fontWeight={700} fill={fill} style={{ whiteSpace: "pre" } as any}>
      {lineText}{unitWords.map((u, j) => <tspan key={"u" + j} dx={size * (lang === "en" ? 0.26 : 0.34)}>{u}</tspan>)}
    </text>
  );
  const lineInk = reveal && !(T0 && !T0.line) ? greenInk : RX.ink;

  /* the one key (its label follows the act) */
  const keyOn = nxt && !(T0 && !T0.line);
  /* "Stack rows" (two words; the hi label is the longest) gets a wider key, right edge unchanged */
  const keyW = nxt === "rows" ? (lang === "hi" ? 262 : 236) : RX_KEY.w;
  const freeKeys = free ? [
    { id: "len-less", label: "Length −", on: () => setF((p: any) => { const L = Math.max(2, p.L - 1); return { ...p, L, B: Math.min(p.B, L), rows: 1 }; }), off: F.L <= 2 },
    { id: "len-more", label: "Length +", on: () => setF((p: any) => ({ ...p, L: Math.min(16, p.L + 1), rows: 1 })), off: F.L >= 16 },
    { id: "br-less", label: "Breadth −", on: () => setF((p: any) => ({ ...p, B: Math.max(1, p.B - 1), rows: 1 })), off: F.B <= 1 },
    { id: "br-more", label: "Breadth +", on: () => setF((p: any) => ({ ...p, B: Math.min(10, p.L, p.B + 1), rows: 1 })), off: F.B >= 10 || F.B >= F.L },
    { id: "rows", label: "Rows", on: () => pressKey("rows"), off: S.rows >= F.B },
  ] : [];

  /* phase 4: the strip, cut in three, one part standing as the breadth */
  const strip = () => {
    const pw = g.gw / 3;
    const parts = S.cuts >= 2 ? [0, 1, 2] : [-1];
    return (
      <g>
        {parts.map((k) => {
          if (k === 0 && S.dropped) return null;
          const x = k < 0 ? g.gx : g.gx + k * pw + (k === 0 ? 0 : 5);
          const w = k < 0 ? g.gw : pw - 5;
          return (
            <g key={"sp" + k}>
              <rect x={x} y={RX_STRIP_Y} width={w} height={RX_STRIP_H} rx={8} fill={tint(RX.blue, 0.6)} />
              <defs><clipPath id={"rx-sp" + k}><rect x={x} y={RX_STRIP_Y} width={w} height={RX_STRIP_H} rx={8} /></clipPath></defs>
              <Skin name="ribbon" x={g.gx} y={RX_STRIP_Y} w={g.gw} h={RX_STRIP_H} fit="stretch" clip={"url(#rx-sp" + k + ")"} />
              <rect x={x} y={RX_STRIP_Y} width={w} height={RX_STRIP_H} rx={8} fill={RX.blue} fillOpacity={0.18} stroke={blueInk} strokeWidth={3} />
            </g>
          );
        })}
        {S.cuts === 1 && <line x1={g.gx + pw} y1={RX_STRIP_Y - 6} x2={g.gx + pw} y2={RX_STRIP_Y + RX_STRIP_H + 6} stroke={RX.ink} strokeWidth={3.5} strokeLinecap="round" />}
        {S.cuts < 2 && chip(g.gx + g.gw / 2, RX_STRIP_Y + RX_STRIP_H / 2, `${it.L} ${it.unit}`, T.label, blueInk)}
        {S.cuts >= 2 && [0, 1, 2].filter((k) => !(k === 0 && S.dropped)).map((k) => (
          <g key={"pl" + k}>{chip(g.gx + k * pw + pw / 2, RX_STRIP_Y + RX_STRIP_H / 2, `${B} ${it.unit}`, T.label, blueInk)}</g>
        ))}
        {S.dropped && (
          <g>
            <rect x={g.gx - 30} y={Y1 - g.gh} width={22} height={g.gh} rx={6} fill={tint(RX.blue, 0.6)} />
            <g transform={`rotate(-90 ${g.gx - 19} ${Y1 - g.gh / 2})`}>
              <Skin name="ribbon" x={g.gx - 19 - g.gh / 2} y={Y1 - g.gh / 2 - 11} w={g.gh} h={22} fit="stretch" />
            </g>
            <rect x={g.gx - 30} y={Y1 - g.gh} width={22} height={g.gh} rx={6} fill={T0 ? RX.amber : RX.blue} fillOpacity={T0 ? 0.6 : 0.18} stroke={blueInk} strokeWidth={3} />
          </g>
        )}
        {S.rows === 0 && <rect x={g.gx} y={Y1 - g.gh} width={g.gw} height={g.gh} rx={4} fill="none" stroke={RX.ink} strokeWidth={3.5} strokeDasharray="14 10" />}
        {!S.dropped && <line x1={g.gx} y1={Y1} x2={g.gx + g.gw} y2={Y1} stroke={blueInk} strokeWidth={6} strokeLinecap="round" />}
      </g>
    );
  };

  const rnFontSize = Math.max(32, Math.min(40, g.cell * 0.95));

  return (
    <g>
      <defs>
        <filter id="rx-chip-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#1E1E1E" floodOpacity="0.12" />
        </filter>
      </defs>
      {clue && !free && strip()}
      {gridOn && (clue ? S.rows > 0 : true) && grid()}
      {it.kind === "count" && !free && Array.from({ length: Math.min(S.rows, B) }, (_, r) => (
        <text key={"rn" + r} x={g.gx - 16} y={rowTop(r) + g.cell / 2} textAnchor="end" dominantBaseline="central"
          fontSize={rnFontSize} fontWeight={700} fill={RX.ink} stroke="#FFFDF7" strokeWidth={4} paintOrder="stroke fill">{r + 1}</text>
      ))}
      {(it.kind === "count" || it.kind === "rect") && !win && !T0 && S.rows > 0 && g.cell - (lang === "en" ? 8 : 12) >= 28 * (lang === "en" ? 1.2 : 1.35) && chip(g.gx + g.gw / 2, Y1 - g.cell / 2, tx("Row"), Math.min(32, Math.max(28, g.cell * 0.6)), shade(RX.violet, 0.3), "middle", 0, g.cell - (lang === "en" ? 8 : 12))}
      {/* the given sides, deep blue */}
      {chip(g.gx + g.gw / 2, Y1 + (free ? 40 : lang === "en" ? 42 : 44), lenLabel, 36, blueInk)}
      {gridOn && (clue ? S.dropped : true) && chip(g.gx + g.gw + Math.max(38, 17 + chipH(36) / 2) + (T0 && T0.bound ? 5 : 0), Y1 - showRows * g.cell / 2, brLabel, 36, blueInk, "middle", -90)}
      {T0 && T0.bound && chip(g.gx + 20, gy + 40, tx("Boundary"), T.label, shade(RX.verm, 0.25), "start", 0, 0, lang === "en" ? 0.68 : 0.62)}
      {/* the clue, or the line */}
      {clue && !free && !S.dropped && (
        <g>
          <text x={RX_X0} y={454} fontSize={T.label} fontWeight={700} fill={amberInk}>{tx("Breadth =")}</text>
          <text x={RX_X0} y={500} fontSize={T.label} fontWeight={700} fill={amberInk}>{tx("one third of length")}</text>
        </g>
      )}
      {lineOn && !(clue && !S.dropped) && (
        <g pointerEvents="none" data-role="reading">
          {free ? lineAt(g.gx + g.gw / 2, 32, T.speech, greenInk, "middle") : lineAt(g.gx, 482, T.speech, lineInk, "start")}
        </g>
      )}
      {!free && keyOn && (
        <g>
          <Key id={nxt} label={tx(RX_LABEL[nxt])} x={RX_KEY.x + RX_KEY.w - keyW} y={RX_KEY.y} w={keyW} h={RX_KEY.h} C={C} tone="key" disabled={busy}
            onClick={() => pressKey(nxt)}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={busy ? RX_DIM_INK : toneInk("key", C.ink)}>{tx(RX_LABEL[nxt])}</text>
          </Key>
          {!busy && <Invite x={RX_KEY.x + RX_KEY.w - keyW / 2} y={RX_KEY.y + RX_KEY.h / 2} w={keyW} h={RX_KEY.h} C={C} />}
        </g>
      )}
      {free && freeKeys.map((k, j) => (
        <Key key={k.id} id={k.id} label={tx(k.label)} x={FKX} y={104 + j * 82} w={200} h={72} C={C} tone="key" disabled={k.off || busy}
          onClick={k.on}>
          <text y={10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={k.off || busy ? RX_DIM_INK : toneInk("key", C.ink)}>{tx(k.label)}</text>
        </Key>
      ))}
    </g>
  );
}

/* the summary page: the child's rectangle and its line */
function Thumb({ result, it, C, w, h, tx = (v: any) => v }: any) {
  if (!result || !result.last) return null;
  const item = it || {};
  const L = item.L || 1, B = rxBreadth(item) || 1;
  const v = leadNumber(result.last.value);
  const bw = 56, bh = h - 20, s = Math.min(bw / L, bh / B), gw = L * s, gh = B * s;
  const eq = `${L}×${B}=${v}`, ex = 10 + bw + 14;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <rect x={10 + (bw - gw) / 2} y={(h - gh) / 2} width={gw} height={gh} rx={3} fill={tint(RX.green, 0.45)} stroke={RX.ink} strokeWidth={2} />
      <text x={ex} y={h / 2} dominantBaseline="central" fontSize={T.micro} fontWeight={700} fill={shade(RX.green, 0.25)}
        textLength={eq.length * T.micro * 0.6 > w - ex - 12 ? w - ex - 12 : undefined} lengthAdjust="spacingAndGlyphs">{eq}</text>
    </g>
  );
}

function RowsTimesSquares(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      board: true,
      keyOnly: true,
      bigPad: true,
      nextKey: true,
      navDots: true,
      StartArt, START_HOOK,
      }} />
  );
}

export default RowsTimesSquares;