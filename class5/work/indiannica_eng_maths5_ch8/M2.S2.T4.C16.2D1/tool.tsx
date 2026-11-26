/* ═══ M2.S2.T4.C16.2D1 · square_cover · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ mascot) is prepended at build: header, canvas, key corner, drawer, bubble, nav dots, toolApi, sounds,
   scoring are the runtime's. SILENT runtime (r66): the bubble is the guide; keyOnly + navDots + nextKey + bigPad.
   Work draws only the working area: phase 1 a card with a string and squares, phase 2 a shelf of unit squares and a picture
   card, phase 3 a rectangle covered row by row, phase 4 two patches counted and compared. Every act goes through api.act (the hand).
   NO imports in this file. Edit, never rewrite. */

const TOOL_ID = "square_cover";
const MEDIA_ID = "M2.S2.T4.C16.2D1";
const TOOL_NAME = "Square Cover";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

const OPENING = ["A card, a string and a tray of squares."];
const FINISH_LINE = "You measured a surface by the squares that cover it.";
const FREE_LINE = "Free play. Pick a shape and cover it with rows of squares.";

/* the chapter's content colours (brief): given deep blue, answer green, boundary vermilion, unit violet, working amber */
const SC_COL = { given: "#0072B2", answer: "#009E73", bound: "#D55E00", unit: "#7E57C2", amber: "#E69F00", cell: "#FFFDF7", card: "#FFF3DA", grass: "#7DB65A", ink: "#2B2B2B" };
const scDeep = (c: string) => shade(c, 0.25);
/* a unit square reads VIOLET (hue about 260) on the plain path and over the tile skin alike */
const SC_VIO = "#8A6CCB", SC_VIO_SKIN = "#6A4FD0", SC_VIO_OVER = 0.8;   /* over the warm tile photo a bluer violet at 0.8 lands at hue ~258 */

/* THE START PAGE: a card with a string round it and a few unit squares on it, a tray of squares beside it */
const START_HOOK = "A string goes round a card; what covers its inside?";
function StartArt({ box, C, lang, tx }: any) {
  const c = 70, cx = 470, cy = 60, cols = 5, rows = 3;
  const laid = [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1]];
  return (
    <g>
      <defs>
        <filter id="sc-art-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#2B2B2B" floodOpacity="0.14" />
        </filter>
      </defs>
      <rect x={cx} y={cy} width={cols * c} height={rows * c} rx={8} fill={SC_COL.card} stroke={SC_COL.ink} strokeWidth={4.5} filter="url(#sc-art-shadow)" />
      {laid.map(([i, j], k) => (
        <g key={k}>
          <rect x={cx + i * c} y={cy + j * c} width={c} height={c} fill={SC_VIO} rx={3} />
          <Skin name="tile" x={cx + i * c} y={cy + j * c} w={c} h={c} fit="stretch" />
          <rect x={cx + i * c} y={cy + j * c} width={c} height={c} fill={SC_VIO_SKIN} fillOpacity={SC_VIO_OVER} rx={3} />
          <rect x={cx + i * c} y={cy + j * c} width={c} height={c} fill="none" stroke={SC_COL.ink} strokeWidth={2.4} rx={3} />
        </g>
      ))}
      <rect x={cx - 10} y={cy - 10} width={cols * c + 20} height={rows * c + 20} rx={14} fill="none" stroke={SC_COL.bound} strokeWidth={7} />
      {[0, 1, 2].map((k) => (
        <g key={"t" + k}>
          <rect x={150 + k * 18} y={120 + k * 26} width={c} height={c} fill={SC_VIO} rx={3} />
          <Skin name="tile" x={150 + k * 18} y={120 + k * 26} w={c} h={c} fit="stretch" />
          <rect x={150 + k * 18} y={120 + k * 26} width={c} height={c} fill={SC_VIO_SKIN} fillOpacity={SC_VIO_OVER} rx={3} />
          <rect x={150 + k * 18} y={120 + k * 26} width={c} height={c} fill="none" stroke={SC_COL.ink} strokeWidth={2.4} rx={3} />
        </g>
      ))}
      <text x={cx + (cols * c) / 2} y={cy + rows * c + 62} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={scDeep(SC_COL.bound)} paintOrder="stroke">{tx("Boundary")}</text>
      <text x={150 + 53} y={300} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={scDeep(SC_COL.unit)} paintOrder="stroke">{tx("Unit square")}</text>
    </g>
  );
}

/* Hindi and Gujarati: filled in the language pass, keyed by the English byte for byte */
const TR: any = {
  hi: {
    "sq. cm": "वर्ग सेमी",
    "sq. m": "वर्ग मी",
    "sq. km": "वर्ग किमी",
    "The surface covered": "ढकी हुई सतह",
    "Tap String to lay a string once round this card's edge.": "डोरी दबाओ और कार्ड के किनारे पर डोरी घुमाओ।",
    "Find the String key under the card.": "कार्ड के नीचे डोरी बटन दबाओ।",
    "Now tap Cover to fill the card with unit squares.": "अब ढको दबाओ, कार्ड इकाई वर्गों से भरो।",
    "The key under the card now reads Cover.": "कार्ड के नीचे अब ढको बटन है।",
    "The string measured the edge, and the squares measured the surface.": "डोरी ने किनारा मापा, वर्गों ने सतह मापी।",
    "You learned: area is the surface; perimeter is the length round.": "तुमने सीखा: क्षेत्रफल सतह है; परिमाप चारों ओर की लंबाई है।",
    "Lay the string, cover the card, then type its area in square centimetres.": "डोरी रखो, कार्ड ढको, फिर वर्ग सेंटीमीटर में क्षेत्रफल लिखो।",
    "Area in sq. cm?": "क्षेत्रफल वर्ग सेमी में?",
    "The string tells the edge; count the squares inside.": "डोरी किनारा बताती है; अंदर के वर्ग गिनो।",
    "Yes, its area is 15 square centimetres.": "हाँ, इसका क्षेत्रफल 15 वर्ग सेंटीमीटर है।",
    "Area": "क्षेत्रफल",
    "Perimeter": "परिमाप",
    "Does a fence round a garden measure its perimeter or its area?": "बगीचे के चारों ओर की बाड़ परिमाप मापती है या क्षेत्रफल?",
    "A fence measures?": "बाड़ क्या मापती है?",
    "Think where the fence stands in the garden.": "सोचो, बाड़ बगीचे में कहाँ लगी है।",
    "Yes, a fence measures the perimeter.": "हाँ, बाड़ परिमाप मापती है।",
    "Cover this new card too, then type its area in square centimetres.": "यह नया कार्ड भी ढको, फिर वर्ग सेंटीमीटर में क्षेत्रफल लिखो।",
    "This card's string is long; look at its squares instead.": "इस कार्ड की डोरी लंबी है; उसके वर्ग देखो।",
    "Yes, 12 square centimetres, with the same string.": "हाँ, 12 वर्ग सेंटीमीटर, डोरी वही है।",
    "The unit square": "इकाई वर्ग",
    "The bigger the surface, the bigger the unit square we count it in.": "सतह जितनी बड़ी, उसे गिनने का इकाई वर्ग उतना बड़ा।",
    "You learned: sq. cm for small, sq. m for large, sq. km for very large.": "तुमने सीखा: छोटा वर्ग सेमी, बड़ा वर्ग मी, बहुत बड़ा वर्ग किमी।",
    "Which unit square fits the area of a school playground?": "स्कूल के मैदान के क्षेत्रफल के लिए कौन सा इकाई वर्ग ठीक है?",
    "Unit for it?": "इसकी इकाई?",
    "Is a playground small, large or very large?": "मैदान छोटा है, बड़ा है या बहुत बड़ा?",
    "Yes, a playground is measured in square metres.": "हाँ, मैदान वर्ग मीटर में मापा जाता है।",
    "4 m": "4 मी",
    "1 sq. cm": "1 वर्ग सेमी",
    "1 sq. m": "1 वर्ग मी",
    "What is the area of one unit square with sides of 1 m?": "1 मी भुजा वाले इकाई वर्ग का क्षेत्रफल क्या है?",
    "Area of it?": "इसका क्षेत्रफल?",
    "Area is counted in square units, not in m.": "क्षेत्रफल वर्ग इकाइयों में गिना जाता है, मी में नहीं।",
    "Yes, its area is 1 square metre.": "हाँ, इसका क्षेत्रफल 1 वर्ग मीटर है।",
    "And which unit fits the area of a postage stamp?": "और डाक टिकट के क्षेत्रफल के लिए कौन सी इकाई ठीक है?",
    "How big is a stamp next to your hand?": "तुम्हारे हाथ के पास टिकट कितना बड़ा है?",
    "Yes, a stamp is small: square centimetres fit it.": "हाँ, टिकट छोटा है: वर्ग सेंटीमीटर ठीक है।",
    "Counting the squares": "वर्ग गिनना",
    "Tap Lay a row to lay one row of squares along the length.": "पंक्ति बिछाओ दबाकर लंबाई पर वर्गों की एक पंक्ति रखो।",
    "The Lay a row key is under the rectangle.": "पंक्ति बिछाओ बटन आयत के नीचे है।",
    "Tap Lay a row again to cover the rest.": "बाकी ढकने के लिए फिर पंक्ति बिछाओ दबाओ।",
    "One more row fills this rectangle.": "एक और पंक्ति से यह आयत भर जाएगा।",
    "The squares that cover a surface, counted by rows, give its area.": "सतह ढकने वाले वर्ग, पंक्तियों में गिनकर, क्षेत्रफल देते हैं।",
    "You learned: count the unit squares by rows to find the area.": "तुमने सीखा: क्षेत्रफल के लिए इकाई वर्ग पंक्तियों में गिनो।",
    "Cover this 9 cm by 4 cm rectangle, then type its area in square centimetres.": "9 सेमी गुणा 4 सेमी का आयत ढको, फिर वर्ग सेंटीमीटर में क्षेत्रफल लिखो।",
    "Count the inside squares too, not just the edge ones.": "सिर्फ किनारे वाले नहीं, अंदर के वर्ग भी गिनो।",
    "Yes, 4 rows of 9 make 36 square centimetres.": "हाँ, 9 की 4 पंक्तियाँ 36 वर्ग सेंटीमीटर बनाती हैं।",
    "How many 1 cm squares cover a rectangle 8 cm long and 2 cm wide?": "8 सेमी लंबे, 2 सेमी चौड़े आयत को कितने 1 सेमी वर्ग ढकते हैं?",
    "Squares in all?": "कुल वर्ग?",
    "Count the squares in both rows.": "दोनों पंक्तियों के वर्ग गिनो।",
    "Yes, 8 + 8 = 16 squares cover it.": "हाँ, 8 + 8 = 16 वर्ग इसे ढकते हैं।",
    "What is the area of a 13 cm by 3 cm rectangle, in square centimetres?": "13 सेमी गुणा 3 सेमी के आयत का क्षेत्रफल वर्ग सेंटीमीटर में क्या है?",
    "Every one of the 3 rows is full; count the middle row too.": "तीनों पंक्तियाँ भरी हैं; बीच वाली पंक्ति भी गिनो।",
    "Yes, 13 + 13 + 13 = 39 square centimetres.": "हाँ, 13 + 13 + 13 = 39 वर्ग सेंटीमीटर।",
    "Comparing by counting": "गिनकर तुलना",
    "Tap Count A to count the squares of Patch A.": "टुकड़ा A के वर्ग गिनने के लिए A गिनो दबाओ।",
    "Find the Count A key under the patches.": "टुकड़ों के नीचे A गिनो बटन है।",
    "Now tap Count B to count the squares of Patch B.": "अब टुकड़ा B के वर्ग गिनने के लिए B गिनो दबाओ।",
    "The key under the patches now reads Count B.": "टुकड़ों के नीचे अब B गिनो बटन है।",
    "Two areas compare by counting only when the squares are the same size.": "गिनकर तुलना तभी होती है जब वर्ग एक ही माप के हों।",
    "You learned: compare areas by counts only with squares of one size.": "तुमने सीखा: एक माप के वर्गों से ही क्षेत्रफल की तुलना करो।",
    "Patch A": "टुकड़ा A",
    "Patch B": "टुकड़ा B",
    "Patch A is 10 by 2 squares and Patch B is 7 by 3; which covers more?": "A में 10 गुणा 2 वर्ग, B में 7 गुणा 3; कौन ज़्यादा ढकता है?",
    "Which covers more?": "कौन ज़्यादा ढकता है?",
    "Look at A and B: count their squares first.": "A और B देखो: पहले उनके वर्ग गिनो।",
    "Yes, Patch B covers 21 squares, A only 20.": "हाँ, B 21 वर्ग ढकता है, A सिर्फ 20।",
    "Now count these two new patches: which one covers more?": "अब ये दो नए टुकड़े गिनो: कौन ज़्यादा ढकता है?",
    "Count every row of each patch, then compare.": "हर टुकड़े की हर पंक्ति गिनो, फिर तुलना करो।",
    "Yes, Patch A covers 27 squares and B 24.": "हाँ, A 27 वर्ग ढकता है और B 24।",
    "Yes": "हाँ",
    "No": "नहीं",
    "Can 20 small squares and 12 big squares alone say which patch covers more?": "क्या 20 छोटे और 12 बड़े वर्ग अकेले बता सकते हैं कि कौन ज़्यादा ढकता है?",
    "Are counts enough?": "क्या गिनती काफ़ी है?",
    "Think about what each number counts.": "सोचो, हर संख्या क्या गिनती है।",
    "Right, the squares differ, so counts cannot tell.": "सही, वर्ग अलग हैं, इसलिए गिनती नहीं बता सकती।",
    "Count the squares you laid, one row at a time.": "रखे हुए वर्ग एक-एक पंक्ति करके गिनो।",
    "Add the rows together: how many squares in all?": "पंक्तियाँ जोड़ो: कुल कितने वर्ग?",
    "Run your finger along the fence: does it go round or across?": "बाड़ पर उंगली चलाओ: वह चारों ओर है या बीच से?",
    "Perimeter runs round the edge; area covers the inside.": "परिमाप किनारे के चारों ओर है; क्षेत्रफल अंदर ढकता है।",
    "Try each unit square on the card to see which fits.": "हर इकाई वर्ग कार्ड पर रखकर देखो कौन ठीक है।",
    "Which square, laid again and again, would cover it best?": "कौन सा वर्ग बार-बार रखने पर इसे सबसे अच्छा ढकेगा?",
    "Lay one 1 m square on the floor: how much floor does it cover?": "फ़र्श पर 1 मी का एक वर्ग रखो: वह कितना फ़र्श ढकता है?",
    "Its sides are in m, so what kind of square unit is it?": "इसकी भुजाएँ मी में हैं, तो यह कौन सी वर्ग इकाई है?",
    "Now count how many rows you laid.": "अब गिनो, तुमने कितनी पंक्तियाँ रखीं।",
    "Add one row's count for every row: what is the total?": "हर पंक्ति के लिए एक पंक्ति की गिनती जोड़ो: कुल कितना?",
    "Count the squares of each patch, row by row.": "हर टुकड़े के वर्ग पंक्ति-दर-पंक्ति गिनो।",
    "Which patch has more squares?": "किस टुकड़े में ज़्यादा वर्ग हैं?",
    "How many small squares fit in one big square?": "एक बड़े वर्ग में कितने छोटे वर्ग आते हैं?",
    "With both in small squares, which patch has more?": "दोनों छोटे वर्गों में हों, तो किसमें ज़्यादा हैं?",
    "The string goes round the edge. The squares cover the inside.": "डोरी किनारे पर घूमती है। वर्ग अंदर ढकते हैं।",
    "Each unit square has sides of 1 cm, 1 m or 1 km.": "हर इकाई वर्ग की भुजा 1 सेमी, 1 मी या 1 किमी है।",
    "Pick the one that fits the surface.": "जो सतह पर ठीक बैठे, वह चुनो।",
    "Lay a row along the length. How many rows fill it?": "लंबाई पर एक पंक्ति रखो। कितनी पंक्तियाँ भरेंगी?",
    "Count both. Are the squares the same size?": "दोनों गिनो। क्या वर्ग एक ही माप के हैं?",
    "Lay the string and cover the card before you answer.": "उत्तर से पहले डोरी रखो और कार्ड ढको।",
    "Now cover the card before you answer.": "अब उत्तर से पहले कार्ड ढको।",
    "Keep tapping Lay a row until the whole rectangle is covered.": "पूरा आयत ढकने तक पंक्ति बिछाओ दबाते रहो।",
    "Count both patches before you answer.": "उत्तर से पहले दोनों टुकड़े गिनो।",
    "Tap Same size before you answer.": "उत्तर से पहले एक जैसा माप दबाओ।",
    "Try a unit square on the card before you answer.": "उत्तर से पहले कार्ड पर एक इकाई वर्ग रखकर देखो।",
    "Boundary": "सीमा",
    "Unit square": "इकाई वर्ग",
    "cm": "सेमी",
    "Length": "लंबाई",
    "Surface": "सतह",
    "Garden": "बगीचा",
    "Unit squares": "इकाई वर्ग",
    "m": "मी",
    "covers more": "ज़्यादा ढकता है",
    "No: sizes differ": "नहीं: माप अलग हैं",
    "Square Cover": "वर्ग से ढको",
    "A card, a string and a tray of squares.": "एक कार्ड, एक डोरी और वर्गों की ट्रे।",
    "Free play. Pick a shape and cover it with rows of squares.": "खुला खेल। एक आकृति चुनो और वर्गों की पंक्तियों से ढको।",
    "A string goes round a card; what covers its inside?": "डोरी कार्ड के चारों ओर है; अंदर क्या ढकता है?",
    "String": "डोरी",
    "Cover": "ढको",
    "Lay a row": "पंक्ति बिछाओ",
    "Count A": "A गिनो",
    "Count B": "B गिनो",
    "Same size": "एक जैसा माप",
    "New shape": "नई आकृति",
    "1 cm": "1 सेमी",
    "1 m": "1 मी",
    "1 km": "1 किमी",
    "Playground": "मैदान",
    "Postage stamp": "डाक टिकट",
  },
  gu: {
    "sq. cm": "ચો. સેમી",
    "sq. m": "ચો. મી",
    "sq. km": "ચો. કિમી",
    "The surface covered": "ઢંકાયેલી સપાટી",
    "Tap String to lay a string once round this card's edge.": "દોરી દબાવો અને કાર્ડની ધારે દોરી ફેરવો.",
    "Find the String key under the card.": "કાર્ડ નીચે દોરી બટન દબાવો.",
    "Now tap Cover to fill the card with unit squares.": "હવે ઢાંકો દબાવો, કાર્ડ એકમ ચોરસથી ભરો.",
    "The key under the card now reads Cover.": "કાર્ડ નીચે હવે ઢાંકો બટન છે.",
    "The string measured the edge, and the squares measured the surface.": "દોરીએ ધાર માપી, ચોરસે સપાટી માપી.",
    "You learned: area is the surface; perimeter is the length round.": "તમે શીખ્યા: ક્ષેત્રફળ સપાટી છે; પરિમિતિ ફરતી લંબાઈ છે.",
    "Lay the string, cover the card, then type its area in square centimetres.": "દોરી મૂકો, કાર્ડ ઢાંકો, પછી ચોરસ સેન્ટિમીટરમાં ક્ષેત્રફળ લખો.",
    "Area in sq. cm?": "ક્ષેત્રફળ ચો. સેમીમાં?",
    "The string tells the edge; count the squares inside.": "દોરી ધાર બતાવે છે; અંદરના ચોરસ ગણો.",
    "Yes, its area is 15 square centimetres.": "હા, તેનું ક્ષેત્રફળ 15 ચોરસ સેન્ટિમીટર છે.",
    "Area": "ક્ષેત્રફળ",
    "Perimeter": "પરિમિતિ",
    "Does a fence round a garden measure its perimeter or its area?": "બગીચાની ફરતી વાડ પરિમિતિ માપે કે ક્ષેત્રફળ?",
    "A fence measures?": "વાડ શું માપે?",
    "Think where the fence stands in the garden.": "વિચારો, વાડ બગીચામાં ક્યાં છે.",
    "Yes, a fence measures the perimeter.": "હા, વાડ પરિમિતિ માપે છે.",
    "Cover this new card too, then type its area in square centimetres.": "આ નવું કાર્ડ પણ ઢાંકો, પછી ચોરસ સેન્ટિમીટરમાં ક્ષેત્રફળ લખો.",
    "This card's string is long; look at its squares instead.": "આ કાર્ડની દોરી લાંબી છે; તેના ચોરસ જુઓ.",
    "Yes, 12 square centimetres, with the same string.": "હા, 12 ચોરસ સેન્ટિમીટર, દોરી એ જ છે.",
    "The unit square": "એકમ ચોરસ",
    "The bigger the surface, the bigger the unit square we count it in.": "સપાટી જેટલી મોટી, ગણવાનો એકમ ચોરસ એટલો મોટો.",
    "You learned: sq. cm for small, sq. m for large, sq. km for very large.": "તમે શીખ્યા: નાનું ચો. સેમી, મોટું ચો. મી, ખૂબ મોટું ચો. કિમી.",
    "Which unit square fits the area of a school playground?": "શાળાના મેદાનના ક્ષેત્રફળ માટે કયો એકમ ચોરસ બંધબેસે?",
    "Unit for it?": "તેનો એકમ?",
    "Is a playground small, large or very large?": "મેદાન નાનું છે, મોટું કે ખૂબ મોટું?",
    "Yes, a playground is measured in square metres.": "હા, મેદાન ચોરસ મીટરમાં મપાય છે.",
    "4 m": "4 મી",
    "1 sq. cm": "1 ચો. સેમી",
    "1 sq. m": "1 ચો. મી",
    "What is the area of one unit square with sides of 1 m?": "1 મી બાજુવાળા એકમ ચોરસનું ક્ષેત્રફળ શું છે?",
    "Area of it?": "તેનું ક્ષેત્રફળ?",
    "Area is counted in square units, not in m.": "ક્ષેત્રફળ ચોરસ એકમમાં ગણાય, મી માં નહીં.",
    "Yes, its area is 1 square metre.": "હા, તેનું ક્ષેત્રફળ 1 ચોરસ મીટર છે.",
    "And which unit fits the area of a postage stamp?": "અને ટપાલ ટિકિટના ક્ષેત્રફળ માટે કયો એકમ બંધબેસે?",
    "How big is a stamp next to your hand?": "તમારા હાથની સામે ટિકિટ કેટલી મોટી છે?",
    "Yes, a stamp is small: square centimetres fit it.": "હા, ટિકિટ નાની છે: ચોરસ સેન્ટિમીટર બંધબેસે.",
    "Counting the squares": "ચોરસ ગણવા",
    "Tap Lay a row to lay one row of squares along the length.": "પંક્તિ મૂકો દબાવી લંબાઈ પર ચોરસની એક પંક્તિ મૂકો.",
    "The Lay a row key is under the rectangle.": "પંક્તિ મૂકો બટન લંબચોરસ નીચે છે.",
    "Tap Lay a row again to cover the rest.": "બાકીનું ઢાંકવા ફરી પંક્તિ મૂકો દબાવો.",
    "One more row fills this rectangle.": "એક વધુ પંક્તિથી આ લંબચોરસ ભરાશે.",
    "The squares that cover a surface, counted by rows, give its area.": "સપાટી ઢાંકતા ચોરસ, પંક્તિએ ગણતાં, ક્ષેત્રફળ આપે છે.",
    "You learned: count the unit squares by rows to find the area.": "તમે શીખ્યા: ક્ષેત્રફળ માટે એકમ ચોરસ પંક્તિએ ગણો.",
    "Cover this 9 cm by 4 cm rectangle, then type its area in square centimetres.": "9 સેમી બાય 4 સેમીનો લંબચોરસ ઢાંકો, પછી ચોરસ સેન્ટિમીટરમાં ક્ષેત્રફળ લખો.",
    "Count the inside squares too, not just the edge ones.": "ફક્ત ધારના નહીં, અંદરના ચોરસ પણ ગણો.",
    "Yes, 4 rows of 9 make 36 square centimetres.": "હા, 9 ની 4 પંક્તિ 36 ચોરસ સેન્ટિમીટર બને.",
    "How many 1 cm squares cover a rectangle 8 cm long and 2 cm wide?": "8 સેમી લાંબા, 2 સેમી પહોળા લંબચોરસને કેટલા 1 સેમી ચોરસ ઢાંકે?",
    "Squares in all?": "કુલ ચોરસ?",
    "Count the squares in both rows.": "બંને પંક્તિના ચોરસ ગણો.",
    "Yes, 8 + 8 = 16 squares cover it.": "હા, 8 + 8 = 16 ચોરસ તેને ઢાંકે છે.",
    "What is the area of a 13 cm by 3 cm rectangle, in square centimetres?": "13 સેમી બાય 3 સેમીના લંબચોરસનું ક્ષેત્રફળ ચોરસ સેન્ટિમીટરમાં કેટલું?",
    "Every one of the 3 rows is full; count the middle row too.": "ત્રણેય પંક્તિ ભરેલી છે; વચ્ચેની પંક્તિ પણ ગણો.",
    "Yes, 13 + 13 + 13 = 39 square centimetres.": "હા, 13 + 13 + 13 = 39 ચોરસ સેન્ટિમીટર.",
    "Comparing by counting": "ગણીને સરખામણી",
    "Tap Count A to count the squares of Patch A.": "ટુકડો A ના ચોરસ ગણવા A ગણો દબાવો.",
    "Find the Count A key under the patches.": "ટુકડા નીચે A ગણો બટન છે.",
    "Now tap Count B to count the squares of Patch B.": "હવે ટુકડો B ના ચોરસ ગણવા B ગણો દબાવો.",
    "The key under the patches now reads Count B.": "ટુકડા નીચે હવે B ગણો બટન છે.",
    "Two areas compare by counting only when the squares are the same size.": "ગણીને સરખામણી ત્યારે જ થાય જ્યારે ચોરસ સરખા માપના હોય.",
    "You learned: compare areas by counts only with squares of one size.": "તમે શીખ્યા: એક માપના ચોરસથી જ ક્ષેત્રફળ સરખાવો.",
    "Patch A": "ટુકડો A",
    "Patch B": "ટુકડો B",
    "Patch A is 10 by 2 squares and Patch B is 7 by 3; which covers more?": "A માં 10 બાય 2 ચોરસ, B માં 7 બાય 3; કયો વધુ ઢાંકે?",
    "Which covers more?": "કયો વધુ ઢાંકે?",
    "Look at A and B: count their squares first.": "A અને B જુઓ: પહેલાં તેમના ચોરસ ગણો.",
    "Yes, Patch B covers 21 squares, A only 20.": "હા, B 21 ચોરસ ઢાંકે, A ફક્ત 20.",
    "Now count these two new patches: which one covers more?": "હવે આ બે નવા ટુકડા ગણો: કયો વધુ ઢાંકે?",
    "Count every row of each patch, then compare.": "દરેક ટુકડાની દરેક પંક્તિ ગણો, પછી સરખાવો.",
    "Yes, Patch A covers 27 squares and B 24.": "હા, A 27 ચોરસ ઢાંકે અને B 24.",
    "Yes": "હા",
    "No": "ના",
    "Can 20 small squares and 12 big squares alone say which patch covers more?": "શું 20 નાના અને 12 મોટા ચોરસ એકલા કહી શકે કે કયો વધુ ઢાંકે?",
    "Are counts enough?": "શું ગણતરી પૂરતી છે?",
    "Think about what each number counts.": "વિચારો, દરેક સંખ્યા શું ગણે છે.",
    "Right, the squares differ, so counts cannot tell.": "સાચું, ચોરસ જુદા છે, તેથી ગણતરી કહી ન શકે.",
    "Count the squares you laid, one row at a time.": "મૂકેલા ચોરસ એક એક પંક્તિ ગણો.",
    "Add the rows together: how many squares in all?": "પંક્તિઓ ઉમેરો: કુલ કેટલા ચોરસ?",
    "Run your finger along the fence: does it go round or across?": "વાડ પર આંગળી ફેરવો: તે ફરતે છે કે વચ્ચેથી?",
    "Perimeter runs round the edge; area covers the inside.": "પરિમિતિ ધારની ફરતે છે; ક્ષેત્રફળ અંદર ઢાંકે છે.",
    "Try each unit square on the card to see which fits.": "દરેક એકમ ચોરસ કાર્ડ પર મૂકી જુઓ કયો બંધબેસે.",
    "Which square, laid again and again, would cover it best?": "કયો ચોરસ વારંવાર મૂકતાં તેને સૌથી સારું ઢાંકે?",
    "Lay one 1 m square on the floor: how much floor does it cover?": "ફરસ પર 1 મી નો એક ચોરસ મૂકો: તે કેટલી ફરસ ઢાંકે?",
    "Its sides are in m, so what kind of square unit is it?": "તેની બાજુ મી માં છે, તો આ કયો ચોરસ એકમ છે?",
    "Now count how many rows you laid.": "હવે ગણો, તમે કેટલી પંક્તિ મૂકી.",
    "Add one row's count for every row: what is the total?": "દરેક પંક્તિ માટે એક પંક્તિની ગણતરી ઉમેરો: કુલ કેટલું?",
    "Count the squares of each patch, row by row.": "દરેક ટુકડાના ચોરસ પંક્તિ પ્રમાણે ગણો.",
    "Which patch has more squares?": "કયા ટુકડામાં વધુ ચોરસ છે?",
    "How many small squares fit in one big square?": "એક મોટા ચોરસમાં કેટલા નાના ચોરસ સમાય?",
    "With both in small squares, which patch has more?": "બંને નાના ચોરસમાં હોય, તો કયામાં વધુ છે?",
    "The string goes round the edge. The squares cover the inside.": "દોરી ધારે ફરે છે. ચોરસ અંદર ઢાંકે છે.",
    "Each unit square has sides of 1 cm, 1 m or 1 km.": "દરેક એકમ ચોરસની બાજુ 1 સેમી, 1 મી કે 1 કિમી છે.",
    "Pick the one that fits the surface.": "જે સપાટીને બંધબેસે તે પસંદ કરો.",
    "Lay a row along the length. How many rows fill it?": "લંબાઈ પર એક પંક્તિ મૂકો. કેટલી પંક્તિ ભરશે?",
    "Count both. Are the squares the same size?": "બંને ગણો. શું ચોરસ સરખા માપના છે?",
    "Lay the string and cover the card before you answer.": "જવાબ પહેલાં દોરી મૂકો અને કાર્ડ ઢાંકો.",
    "Now cover the card before you answer.": "હવે જવાબ પહેલાં કાર્ડ ઢાંકો.",
    "Keep tapping Lay a row until the whole rectangle is covered.": "આખો લંબચોરસ ઢંકાય ત્યાં સુધી પંક્તિ મૂકો દબાવો.",
    "Count both patches before you answer.": "જવાબ પહેલાં બંને ટુકડા ગણો.",
    "Tap Same size before you answer.": "જવાબ પહેલાં સરખું માપ દબાવો.",
    "Try a unit square on the card before you answer.": "જવાબ પહેલાં કાર્ડ પર એક એકમ ચોરસ મૂકી જુઓ.",
    "Boundary": "સીમા",
    "Unit square": "એકમ ચોરસ",
    "cm": "સેમી",
    "Length": "લંબાઈ",
    "Surface": "સપાટી",
    "Garden": "બગીચો",
    "Unit squares": "એકમ ચોરસ",
    "m": "મી",
    "covers more": "વધુ ઢાંકે",
    "No: sizes differ": "ના: માપ જુદાં છે",
    "Square Cover": "ચોરસથી ઢાંકો",
    "A card, a string and a tray of squares.": "એક કાર્ડ, એક દોરી અને ચોરસની ટ્રે.",
    "Free play. Pick a shape and cover it with rows of squares.": "મુક્ત રમત. એક આકાર પસંદ કરો અને ચોરસની પંક્તિથી ઢાંકો.",
    "A string goes round a card; what covers its inside?": "દોરી કાર્ડની ફરતે છે; અંદર શું ઢાંકે?",
    "String": "દોરી",
    "Cover": "ઢાંકો",
    "Lay a row": "પંક્તિ મૂકો",
    "Count A": "A ગણો",
    "Count B": "B ગણો",
    "Same size": "સરખું માપ",
    "New shape": "નવો આકાર",
    "1 cm": "1 સેમી",
    "1 m": "1 મી",
    "1 km": "1 કિમી",
    "Playground": "મેદાન",
    "Postage stamp": "ટપાલ ટિકિટ",
  },
};

const SC_UNITS = [{ id: "u_cm", side: "1 cm", rank: 0, s: 48 }, { id: "u_m", side: "1 m", rank: 1, s: 78 }, { id: "u_km", side: "1 km", rank: 2, s: 102 }];
const SC_UNIT_CH = [{ id: "u_cm", label: "sq. cm" }, { id: "u_m", label: "sq. m" }, { id: "u_km", label: "sq. km" }];

const PHASES = [
  {
    n: 1,
    concept: "The surface covered",
    conceptId: "M2.S2.T4.C15", objectiveIds: ["O5"],
    says: ["The string goes round the edge. The squares cover the inside."],
    /* warm-up card 3 by 2 (string 10 cm, 6 squares): none of the phase's answers */
    steps: [
      { say: "Tap String to lay a string once round this card's edge.", on: "string", hint: "Find the String key under the card." },
      { say: "Now tap Cover to fill the card with unit squares.", on: "cover", hint: "The key under the card now reads Cover." },
    ],
    ladder: ["Count the squares you laid, one row at a time.", "Add the rows together: how many squares in all?"],
    closing: "The string measured the edge, and the squares measured the surface.",
    learned: "You learned: area is the surface; perimeter is the length round.",
    traceback: "The string is lit with the word Length, the squares with the word Surface, and the squares are numbered one by one to the whole area in sq. cm.",
    items: [
      /* learn SC1: answer in the plan = The area is 15 sq. cm and the perimeter is 16 cm. Typed: the area; the near miss is the string's 16. */
      { qid: "M2.S2.T4.C15:SC1", kind: "card", l: 5, b: 3, answer: 15,
        say: "Lay the string, cover the card, then type its area in square centimetres.", ask: "Area in sq. cm?",
        miss: "The string tells the edge; count the squares inside.",
        win: "Yes, its area is 15 square centimetres." },
      /* practice 1: answer in the plan = Its perimeter, the length of the boundary */
      { qid: "M2.S2.T4.C15:1", kind: "fence", answer: "m_per",
        choices: [{ id: "m_area", label: "Area" }, { id: "m_per", label: "Perimeter" }],
        say: "Does a fence round a garden measure its perimeter or its area?", ask: "A fence measures?",
        miss: "Think where the fence stands in the garden.",
        ladder: ["Run your finger along the fence: does it go round or across?", "Perimeter runs round the edge; area covers the inside."],
        win: "Yes, a fence measures the perimeter." },
      /* authored (the plan has two questions for C15 and a phase needs three): a card with the SAME string, 16 cm, and a smaller area */
      { qid: null, kind: "card", l: 6, b: 2, answer: 12,
        say: "Cover this new card too, then type its area in square centimetres.", ask: "Area in sq. cm?",
        miss: "This card's string is long; look at its squares instead.",
        win: "Yes, 12 square centimetres, with the same string." },
    ],
  },
  {
    n: 2,
    concept: "The unit square",
    conceptId: "M2.S2.T4.C16", objectiveIds: ["O5"],
    says: ["Each unit square has sides of 1 cm, 1 m or 1 km.", "Pick the one that fits the surface."],
    ladder: ["Try each unit square on the card to see which fits.", "Which square, laid again and again, would cover it best?"],
    closing: "The bigger the surface, the bigger the unit square we count it in.",
    learned: "You learned: sq. cm for small, sq. m for large, sq. km for very large.",
    traceback: "The unit square that fits is lit amber and laid on the picture card, its unit written under the card.",
    items: [
      /* learn SC2: answer in the plan = sq. m */
      { qid: "M2.S2.T4.C16:SC2", kind: "unit", surf: "playground", fit: "u_m", answer: "u_m", choices: SC_UNIT_CH,
        say: "Which unit square fits the area of a school playground?", ask: "Unit for it?",
        miss: "Is a playground small, large or very large?",
        win: "Yes, a playground is measured in square metres." },
      /* practice 2: answer in the plan = 1 sq. m (a choice: the unit is the lesson, and a typed 1 would echo "1 m") */
      { qid: "M2.S2.T4.C16:2", kind: "sq1m", answer: "sq1m",
        choices: [{ id: "len4m", label: "4 m" }, { id: "sq1cm", label: "1 sq. cm" }, { id: "sq1m", label: "1 sq. m" }],
        say: "What is the area of one unit square with sides of 1 m?", ask: "Area of it?",
        miss: "Area is counted in square units, not in m.",
        ladder: ["Lay one 1 m square on the floor: how much floor does it cover?", "Its sides are in m, so what kind of square unit is it?"],
        win: "Yes, its area is 1 square metre." },
      /* practice 4: answer in the plan = sq. cm */
      { qid: "M2.S2.T4.C16:4", kind: "unit", surf: "stamp", fit: "u_cm", answer: "u_cm", choices: SC_UNIT_CH,
        say: "And which unit fits the area of a postage stamp?", ask: "Unit for it?",
        miss: "How big is a stamp next to your hand?",
        win: "Yes, a stamp is small: square centimetres fit it." },
    ],
  },
  {
    n: 3,
    concept: "Counting the squares",
    conceptId: "M2.S2.T4.C17", objectiveIds: ["O6"],
    says: ["Lay a row along the length. How many rows fill it?"],
    /* warm-up rectangle 5 by 2 (10 squares): none of the phase's answers */
    steps: [
      { say: "Tap Lay a row to lay one row of squares along the length.", on: "row", hint: "The Lay a row key is under the rectangle." },
      { say: "Tap Lay a row again to cover the rest.", on: "row", hint: "One more row fills this rectangle." },
    ],
    ladder: ["Now count how many rows you laid.", "Add one row's count for every row: what is the total?"],
    closing: "The squares that cover a surface, counted by rows, give its area.",
    learned: "You learned: count the unit squares by rows to find the area.",
    traceback: "The rows light one by one with the running count at each row's end, ending on the whole area in sq. cm.",
    items: [
      /* learn SC3: answer in the plan = 36 squares, so 36 sq. cm */
      { qid: "M2.S2.T4.C17:SC3", kind: "rect", l: 9, b: 4, answer: 36,
        say: "Cover this 9 cm by 4 cm rectangle, then type its area in square centimetres.", ask: "Area in sq. cm?",
        miss: "Count the inside squares too, not just the edge ones.",
        win: "Yes, 4 rows of 9 make 36 square centimetres." },
      /* practice 3: answer in the plan = 2 rows of 8 squares: 8 + 8 = 16, so 16 squares */
      { qid: "M2.S2.T4.C17:3", kind: "rect", l: 8, b: 2, answer: 16,
        say: "How many 1 cm squares cover a rectangle 8 cm long and 2 cm wide?", ask: "Squares in all?",
        miss: "Count the squares in both rows.",
        win: "Yes, 8 + 8 = 16 squares cover it." },
      /* practice 5: answer in the plan = 3 rows of 13: 13 + 13 + 13 = 39, so 39 sq. cm */
      { qid: "M2.S2.T4.C17:5", kind: "rect", l: 13, b: 3, answer: 39,
        say: "What is the area of a 13 cm by 3 cm rectangle, in square centimetres?", ask: "Area in sq. cm?",
        miss: "Every one of the 3 rows is full; count the middle row too.",
        win: "Yes, 13 + 13 + 13 = 39 square centimetres." },
      /* unused: practice 8 (14 by 5 = 70): a phase holds three, and 70 tiles is past the 40 skins a screen */
    ],
  },
  {
    n: 4,
    concept: "Comparing by counting",
    conceptId: "M2.S2.T4.C18", objectiveIds: ["O6"],
    says: ["Count both. Are the squares the same size?"],
    /* warm-up patches 4 by 1 and 3 by 2: none of the phase's answers */
    steps: [
      { say: "Tap Count A to count the squares of Patch A.", on: "countA", hint: "Find the Count A key under the patches." },
      { say: "Now tap Count B to count the squares of Patch B.", on: "countB", hint: "The key under the patches now reads Count B." },
    ],
    ladder: ["Count the squares of each patch, row by row.", "Which patch has more squares?"],
    closing: "Two areas compare by counting only when the squares are the same size.",
    learned: "You learned: compare areas by counts only with squares of one size.",
    traceback: "Both counters are drawn row by row under their patches and the greater count is lit amber; for mixed sizes the big squares are redrawn in small ones.",
    items: [
      /* learn SC4: answer in the plan = Patch B */
      { qid: "M2.S2.T4.C18:SC4", kind: "compare", A: [10, 2], B: [7, 3], answer: "p_b",
        choices: [{ id: "p_a", label: "Patch A" }, { id: "p_b", label: "Patch B" }],
        say: "Patch A is 10 by 2 squares and Patch B is 7 by 3; which covers more?", ask: "Which covers more?",
        miss: "Look at A and B: count their squares first.",
        win: "Yes, Patch B covers 21 squares, A only 20." },
      /* practice 6: answer in the plan = Patch A covers 27 squares and Patch B covers 24, so Patch A covers more */
      { qid: "M2.S2.T4.C18:6", kind: "compare", A: [9, 3], B: [6, 4], answer: "p_a",
        choices: [{ id: "p_a", label: "Patch A" }, { id: "p_b", label: "Patch B" }],
        say: "Now count these two new patches: which one covers more?", ask: "Which covers more?",
        miss: "Count every row of each patch, then compare.",
        win: "Yes, Patch A covers 27 squares and B 24." },
      /* practice 7: answer in the plan = No. Counts can be compared only when the squares are the same size.
         Small patch 5 by 4 (20); big patch 4 by 3 big squares (12), each big square 2 by 2 small ones (48 small). */
      { qid: "M2.S2.T4.C18:7", kind: "sizes", A: [5, 4], B: [4, 3], k: 2, answer: "y_no",
        choices: [{ id: "y_yes", label: "Yes" }, { id: "y_no", label: "No" }],
        say: "Can 20 small squares and 12 big squares alone say which patch covers more?", ask: "Are counts enough?",
        miss: "Think about what each number counts.",
        ladder: ["How many small squares fit in one big square?", "With both in small squares, which patch has more?"],
        win: "Right, the squares differ, so counts cannot tell." },
    ],
  },
];

/* The numbers the working area needs (they go into the sidecar too). */
const MODEL = {
  warm: { 1: { l: 3, b: 2 }, 3: { l: 5, b: 2 }, 4: { A: [4, 1], B: [3, 2] } },
  units: SC_UNITS,
  free: [[4, 3], [6, 2], [7, 3], [5, 5], [8, 4], [3, 3]],
  answerGate: "Answer key and pad stay off after the child's first real touch (a tap on a key or piece, or a real Enter on a guide step) until the act is done: 1.1 and 1.3 lay the string and cover the card; 3.1-3.3 every row laid; 4.1 and 4.2 both patches counted; 4.3 Same size pressed; 2.1 and 2.3 one unit square tried on the card. Ungated: 1.2 (fence) and 2.2 (the 1 m square). A tap or a hardware digit or Enter on the locked key shows the nudge for the act left; toolApi and AI mode are never gated.",
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

const judge = (item: any, v: any) => {
  if (item.choices) return String(v).trim() === String(item.answer);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: a second route. Areas by repeated addition of the rows, units by a size table, comparisons by counting cell by cell. */
const oracle = () => {
  const unitOf: any = { playground: "u_m", stamp: "u_cm" };
  return PHASES.every((p: any) => p.items.every((it: any) => {
    if (it.kind === "card" || it.kind === "rect") { let s = 0; for (let r = 0; r < it.b; r++) s += it.l; return s === it.answer; }
    if (it.kind === "fence") return it.answer === "m_per";
    if (it.kind === "sq1m") return it.answer === "sq1m";
    if (it.kind === "unit") return unitOf[it.surf] === it.answer;
    if (it.kind === "compare") {
      let a = 0, b = 0;
      for (let i = 0; i < it.A[0]; i++) for (let j = 0; j < it.A[1]; j++) a++;
      for (let i = 0; i < it.B[0]; i++) for (let j = 0; j < it.B[1]; j++) b++;
      return a !== b && it.answer === (a > b ? "p_a" : "p_b");
    }
    if (it.kind === "sizes") return it.k !== 1 && it.answer === "y_no";
    return false;
  }));
};
/* the misconception: the string's length for a card's area, one row short for a rectangle, the longer patch, the big unit, Yes */
const nearMiss = (item: any) => {
  if (item.kind === "card") return 2 * (item.l + item.b);
  if (item.kind === "rect") return item.b > 2 ? 2 * item.l + 2 * (item.b - 2) : item.l * (item.b - 1);   /* the edge ring (9 by 4: 22) */
  const nm: any = { fence: "m_area", sq1m: "len4m", sizes: "y_yes" };
  if (nm[item.kind]) return nm[item.kind];
  if (item.kind === "unit") return item.fit === "u_cm" ? "u_m" : "u_km";
  if (item.kind === "compare") return item.answer === "p_a" ? "p_b" : "p_a";
  return "~";
};
const answerForms = (item: any) => (typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)] : [String(item.answer)]);
const agentKey = (item: any) => item.answer;

const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
const answer = (item: any, v: any) => undefined;
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── geometry (pure; the act and the drawing share it) ───────────────────────────────── */
const SC_PW = BOARD_OPEN_W_BIG;   /* the picture is laid out for the OPEN panel and stays put when it shuts */
/* a rectangle of l x b unit cells, the biggest that fits above the key row */
const SC_ROPE = 12;   /* the string lies this far OUTSIDE the card outline, so every unit square shows whole */
const scRect = (l: number, b: number, H: number, card = false) => {
  /* left: the side label ("4 सेमी") stays inside the working area; a card leaves room round it for the string and its labels */
  const left = card ? 170 : 130, right = card ? 170 : 90, top = card ? 112 : 74, bottom = card ? 142 : 118;   /* card: the rope's lower edge 12+ clear of the key's invite ring */
  const aw = SC_PW - left - right, ah = H - top - bottom;
  const c = Math.floor(Math.min(aw / l, ah / b, 170));
  const w = l * c, h = b * c;
  return { c, w, h, x: left + Math.round((aw - w) / 2), y: top + Math.round((ah - h) / 2) };
};
/* two patches side by side; B's cell is k times A's */
const scPatches = (A: number[], B: number[], k: number, H: number) => {
  const gap = 90, top = 70, bot = 118 + 64;
  const ah = H - top - bot;
  const c = Math.floor(Math.min((SC_PW - 60 - gap) / (A[0] + B[0] * k), ah / Math.max(A[1], B[1] * k), 120));
  const wa = A[0] * c, ha = A[1] * c, wb = B[0] * c * k, hb = B[1] * c * k;
  const x0 = Math.round((SC_PW - (wa + gap + wb)) / 2), ym = top + ah / 2;
  return { a: { x: x0, y: Math.round(ym - ha / 2), w: wa, h: ha, c, cols: A[0], rows: A[1] },
           b: { x: x0 + wa + gap, y: Math.round(ym - hb / 2), w: wb, h: hb, c: c * k, cols: B[0], rows: B[1] } };
};
const SC_SHELF = (i: number) => ({ x: 22 + i * 126, w: 118, y: 120, h: 250 });
const SC_PIC = { x: 440, y: 64, w: 440, h: 300 };
const SC_KEY = { one: { w: 280 }, two: { w: 240 } };
const SC_LABEL: any = { string: "String", cover: "Cover", row: "Lay a row", countA: "Count A", countB: "Count B", same: "Same size", shape: "New shape" };

const scFresh = (e: number, fi = 0) => ({ e, str: 0, rows: 0, part: 0, ca: 0, cb: 0, tried: "", same: false, fi });

/* ── the working area ─────────────────────────────────────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const H = box ? box.h : W.h;
  const free = stage === "free";
  const warm = !free && (stage === "demo" || stage === "teach") && !!phase.steps;
  const won = !free && (stage === "win" || stage === "idle");
  /* misses 1 and 2 get the bubble clue only; the correction (and anything that holds the answer) comes from miss 3 (owner, 2026-11-18) */
  const shown = !!wrong && wrong.tries >= 3;

  /* the board belongs to an ENTRY: a new question (or the warm-up, or free play) starts a fresh one */
  const qk = free ? "free" : n + "." + (warm ? "w" : index);
  const entry = useRef<any>({ qk: null, n: 0 });
  const touchRef = useRef<any>({ e: -1 });
  if (entry.current.qk !== qk) {
    const was = entry.current;
    entry.current = { qk, n: was.n + 1 };
    if (was.qk && /\.w$/.test(was.qk) && touchRef.current.e === was.n) touchRef.current.e = was.n + 1;   /* warm-up -> its first question */
  }
  const eN = entry.current.n;
  const [raw, setRaw] = useState<any>(() => scFresh(-1));
  const S = raw.e === eN ? raw : scFresh(eN, raw.fi || 0);
  /* a late write from an act of an older entry (the warm-up's last act lands as the question opens) is dropped */
  const put = (patch: any) => { const e0 = entry.current.n; setRaw((p: any) => {
    if (entry.current.n !== e0) return p;
    const base = p.e === e0 ? p : scFresh(e0, p.fi || 0);
    return { ...base, ...(typeof patch === "function" ? patch(base) : patch) };
  }); };

  /* what is on the board: the warm-up's figure, the question's, or free play's */
  const fr = MODEL.free[S.fi % MODEL.free.length];
  const fig: any = free ? { kind: "rect", l: fr[0], b: fr[1] }
    : warm ? (n === 1 ? { kind: "card", ...MODEL.warm[1] } : n === 3 ? { kind: "rect", ...MODEL.warm[3] } : n === 4 ? { kind: "compare", ...MODEL.warm[4] } : item)
    : item;
  const kind = fig.kind;
  const R = kind === "card" || kind === "rect" ? scRect(fig.l, fig.b, H, kind === "card") : null;
  const P = kind === "compare" || kind === "sizes" ? scPatches(fig.A, fig.B, fig.k || 1, H) : null;

  /* is the act this question needs still to be done? */
  const actDone = kind === "card" ? S.str === 4 && S.rows >= fig.b
    : kind === "rect" ? S.rows >= fig.b
    : kind === "compare" ? S.ca >= fig.A[0] * fig.A[1] && S.cb >= fig.B[0] * fig.B[1]
    : kind === "sizes" ? S.same
    : kind === "unit" ? !!S.tried
    : true;

  const [, setTouchTick] = useState(0);
  const touched = touchRef.current.e === eN;
  const setTouched = (b: boolean) => { if (b && touchRef.current.e !== entry.current.n) { touchRef.current.e = entry.current.n; setTouchTick((t) => t + 1); } };
  const nudged = useRef(false);
  const playing = useRef(false);
  const gate = useRef(false);
  const [actEnd, setActEnd] = useState(0);
  const live = useRef<any>({});
  live.current = { stage, kind, say: item ? item.say : "", str: S.str };
  const restoreQuestion = () => { if (nudged.current) { nudged.current = false; if (live.current.stage === "ask") api.say(live.current.say); } };
  const play = (o: any, done: () => void) => {
    if (playing.current) return;
    playing.current = true;
    api.act(o).then((ok: boolean) => {
      playing.current = false; setActEnd((k) => k + 1);   /* the gate may open only now, when the hand has left */
      if (gate.current) api.lock(true);   /* hold: the act layer restores the lock it found at its start; the gate effect releases it once the act is COMPLETE */
      if (ok) { done(); restoreQuestion(); }
    });   /* an act changes what waits: the nudge goes */
  };
  const didStep = (on: string) => { if (stage === "demo") api.did(on); };

  const act = (on: any) => {
    if (on === "string" && R) {
      if (S.str >= 4) { didStep(on); return; }
      const o = SC_ROPE, g = { x: R.x - o, y: R.y - o, w: R.w + 2 * o, h: R.h + 2 * o };
      play({ tool: "hand", moves: "push", ms: 800, from: { x: g.x - 30, y: g.y }, to: { x: g.x - 30, y: g.y },
        at: [{ x: g.x + g.w, y: g.y }, { x: g.x + g.w, y: g.y + g.h }, { x: g.x, y: g.y + g.h }, { x: g.x, y: g.y }],
        onPoint: (i: number) => put({ str: i + 1 }) }, () => { put({ str: 4 }); api.sfx.settle(); didStep(on); });
    } else if (on === "cover" && R) {
      if (S.rows >= fig.b) { didStep(on); return; }
      const g = R, rs = Array.from({ length: fig.b }, (_, r) => ({ x: g.x + g.w / 2, y: g.y + (r + 0.5) * g.c }));
      play({ tool: "hand", moves: "sweep", ms: 800, from: { x: g.x, y: g.y + g.c / 2 }, at: rs, to: { x: g.x + g.w, y: g.y + g.h - g.c / 2 },
        onPoint: (i: number) => { put({ rows: i + 1 }); api.sfx.tick(); } }, () => { put({ rows: fig.b }); api.sfx.settle(); didStep(on); });
    } else if (on === "row" && R) {
      const r = S.rows;
      if (r >= fig.b) { didStep(on); return; }
      const g = R, cs = Array.from({ length: fig.l }, (_, j) => ({ x: g.x + (j + 0.5) * g.c, y: g.y + (r + 0.5) * g.c }));
      play({ tool: "hand", moves: "push", ms: 800, from: { x: g.x - 24, y: g.y + (r + 0.5) * g.c }, at: cs,
        onPoint: (j: number) => put({ part: j + 1 }) }, () => { put({ rows: r + 1, part: 0 }); api.sfx.settle(); didStep(on); });
    } else if ((on === "countA" || on === "countB") && P) {
      /* the hand sweeps the patch and its squares light ONE BY ONE (a count, in squares) */
      const q = on === "countA" ? P.a : P.b, f = on === "countA" ? "ca" : "cb", tot = q.rows * q.cols;
      if (S[f] >= tot) { didStep(on); return; }
      const cs = Array.from({ length: tot }, (_, i) => ({ x: q.x + ((i % q.cols) + 0.5) * q.c, y: q.y + (Math.floor(i / q.cols) + 0.5) * q.c }));
      play({ tool: "hand", moves: "sweep", ms: 900, at: cs, onPoint: (i: number) => { put({ [f]: i + 1 }); if ((i + 1) % q.cols === 0) api.sfx.tick(); } },
        () => { put({ [f]: tot }); didStep(on); });
    } else if (on === "same" && P) {
      if (S.same) return;
      play({ tool: "hand", moves: "tap", ms: 700, at: [{ x: P.b.x + P.b.w / 2, y: P.b.y + P.b.h / 2 }] },
        () => { put({ same: true }); api.sfx.trade(); });
    } else if (on === "shape") {
      put((b: any) => ({ ...scFresh(entry.current.n, (b.fi || 0) + 1) }));
    }
  };
  /* the gate locks synchronously at the first real press, before the act starts, so the act layer finds it locked */
  const lockNow = () => { if (stage === "ask" && !actDone && !gate.current) { gate.current = true; api.lock(true); } };
  const tryUnit = (u: any, i: number) => {
    const sh = SC_SHELF(i);
    setTouched(true); lockNow();
    play({ tool: "hand", moves: "carry", ms: 800, from: { x: sh.x + sh.w / 2, y: sh.y + sh.h - 90 }, at: [{ x: SC_PIC.x + SC_PIC.w / 2, y: SC_PIC.y + SC_PIC.h / 2 }],
      hold: <rect x={-u.s / 4} y={-u.s / 4} width={u.s / 2} height={u.s / 2} fill={SC_VIO} stroke={SC_COL.ink} strokeWidth={2.4} /> },
      () => { put({ tried: u.id }); api.sfx.settle(); });
  };
  /* one key at a time; a 400 ms guard so one tap never also presses the next label */
  const lastKey = useRef(0);
  const pressKey = (on: string) => {
    const t = Date.now();
    if (t - lastKey.current < 400) return;
    lastKey.current = t;
    setTouched(true); lockNow();
    act(on);
  };
  /* Enter, the agent's check() and the dev solve() perform the CURRENT step */
  api.onEnter(stage === "demo" && stepOn ? () => act(stepOn) : null);
  HOOK.demo = stage === "demo" && stepOn ? () => act(stepOn) : null;
  /* the agent's check() at a question does the act at once (AI mode and toolApi runs are never gated) */
  const finished = () => ({ str: kind === "card" ? 4 : S.str, rows: fig.b || 0, part: 0, ca: fig.A ? fig.A[0] * fig.A[1] : 0, cb: fig.B ? fig.B[0] * fig.B[1] : 0, same: true,
    tried: kind === "unit" ? (SC_UNITS.find((u) => u.id !== fig.fit) || SC_UNITS[0]).id : "" });
  HOOK.check = stage === "ask" ? () => {
    if (!actDone) put(finished());
    return undefined;
  } : null;
  /* a right answer typed before the act still ends on the finished working */
  useEffect(() => { if (won && !actDone) put(finished()); }, [won, actDone, eN]);

  /* THE ANSWER IS GATED BY THE ACT: locked once the child has touched the board for real (a tap on a key or piece, or a
     real Enter on a guide step; toolApi and AI mode never do), until this question's act is done (gate: declared with play) */
  useEffect(() => {
    const want = stage === "ask" && (!actDone || playing.current) && touched;   /* an act still playing holds the gate, even past its last point */
    if (want && !gate.current) { gate.current = true; api.lock(true); }
    else if (!want && gate.current) {
      gate.current = false; api.lock(false);
      if (nudged.current && stage === "ask") { nudged.current = false; api.say(item.say); }   /* the question comes back */
    }
  }, [stage, actDone, touched, eN, actEnd]);
  /* a real Enter on a guide step is a touch; a tap on the locked Answer key or pad gets the nudge for the act left */
  useEffect(() => {
    const nudge = () => {
      if (playing.current) return;   /* never while the act is running */
      nudged.current = true;
      const k = live.current.kind;
      if (k === "card" && live.current.str >= 4) api.say("Now cover the card before you answer.");
      else if (k === "card") api.say("Lay the string and cover the card before you answer.");
      else if (k === "rect") api.say("Keep tapping Lay a row until the whole rectangle is covered.");
      else if (k === "compare") api.say("Count both patches before you answer.");
      else if (k === "sizes") api.say("Tap Same size before you answer.");
      else if (k === "unit") api.say("Try a unit square on the card before you answer.");
    };
    const onKey = (e: any) => {
      if (!e.isTrusted) return;
      if (e.key === "Enter" && live.current.stage === "demo") setTouched(true);
      const c = e.target && e.target.closest ? e.target.closest("[data-control]") : null;
      const cid = c ? String(c.getAttribute("data-control")) : "";
      if (cid === "again" && (e.key === "Enter" || e.key === " ") && gate.current) { setTimeout(restoreQuestion, 60); return; }   /* the Hint key re-shows the QUESTION */
      const own = c && (SC_LABEL[cid] || /^unit-/.test(cid));
      if (!own && gate.current && live.current.stage === "ask" && /^([0-9.]|Enter)$/.test(e.key)) nudge();   /* Enter on our own act key is the act */
    };
    const onDown = (e: any) => {
      if (!e.isTrusted || !gate.current || live.current.stage !== "ask") return;
      const c = e.target && e.target.closest ? e.target.closest("[data-control]") : null;
      const id = c ? String(c.getAttribute("data-control")) : "";
      if (id === "again") setTimeout(restoreQuestion, 60);   /* the Hint key re-shows the QUESTION */
      else if (id === "answer-open" || /^(key-|choice-)/.test(id)) nudge();
    };
    window.addEventListener("keydown", onKey, true);
    window.addEventListener("pointerdown", onDown, true);
    return () => { window.removeEventListener("keydown", onKey, true); window.removeEventListener("pointerdown", onDown, true); };
  }, []);

  /* the win line, one sentence (the runtime swaps a phase's last one for its closing) */
  useEffect(() => { if (stage === "win" && item && item.win) api.say(item.win); }, [stage, index, n]);

  /* the traceback: redraws the maths in steps, ending on the whole right answer, then unlocks */
  const [tb, setTb] = useState<any>({ e: -1, k: 0, end: false });
  const tbLive = useRef(false);
  useEffect(() => {
    if (!wrong || wrong.tries < 3 || stage !== "ask") return;
    const e = entry.current.n, it = item;
    const N = it.kind === "card" ? it.l * it.b : it.kind === "rect" ? it.b : it.kind === "compare" ? it.A[1] + it.B[1] : 2;
    const gap = it.kind === "card" ? 140 : it.kind === "rect" ? 520 : it.kind === "compare" ? 380 : 700;
    api.lock(true); tbLive.current = true;
    const ring = it.kind === "rect" && it.b > 2 && leadNumber(wrong.value) === 2 * it.l + 2 * (it.b - 2);
    const steps: any[] = [[400, () => setTb({ e, k: 0, end: false })]];
    if (ring) steps.push([1100, () => setTb({ e, k: 0, end: false, inside: true })]);
    for (let i = 1; i <= N; i++) steps.push([gap, () => setTb({ e, k: i, end: false })]);
    steps.push([600, () => setTb({ e, k: N, end: true })]);
    tl.run(steps, () => { tbLive.current = false; api.lock(false); });
  }, [wrong]);
  /* a correction never outlives its question */
  useEffect(() => () => { tl.stop(); if (tbLive.current) { tbLive.current = false; api.lock(false); } }, [qk]);
  const showTb = !free && stage === "ask" && shown && tb.e === eN;

  /* phase 4: a question's counts stay hidden until it is answered right, or missed 3 times; the warm-up keeps its numbers */
  const countsShown = warm || won || (stage === "ask" && shown);
  /* what the host and the agent read back (no total before the child gives it) */
  api.share({ phase: n, rows_laid: S.rows, string_laid: S.str >= 4, unit_picked: S.tried || null,
    /* the counts reach the host only once they are on screen: the warm-up, or after the question is answered */
    patch_a: P && countsShown && S.ca >= fig.A[0] * fig.A[1] ? fig.A[0] * fig.A[1] : null, patch_b: P && countsShown && S.cb >= fig.B[0] * fig.B[1] ? fig.B[0] * fig.B[1] : null,
    bigger: kind === "sizes" ? !S.same : false, complete: stage === "idle" });

  /* ── drawing helpers (called, never mounted) ── */
  const txt = (x: number, y: number, s: string, o: any = {}) => (
    <text x={x} y={y} textAnchor={o.a || "middle"} fontSize={o.size || T.label} fontWeight={o.w || 700} fill={o.fill || C.ink}
      stroke={o.halo ? SC_COL.cell : undefined} strokeWidth={o.halo ? 6 : undefined} paintOrder="stroke fill">{s}</text>
  );
  const cellFill = SC_VIO;
  /* one unit square: the plain box (fallback), the tile skin, the colour code over it (counted: violet; not yet: a pale wash), the dark outline */
  const tileCell = (x: number, y: number, c: number, counted: boolean, skin: boolean) => (
    <g key={`tc-${x}-${y}`}>
      <rect x={x} y={y} width={c} height={c} fill={counted ? cellFill : SC_COL.cell} rx={Math.min(3, c * 0.06)} />
      {skin && <Skin name="tile" x={x} y={y} w={c} h={c} fit="stretch" />}
      {skin && <rect x={x} y={y} width={c} height={c} fill={counted ? SC_VIO_SKIN : SC_COL.cell} fillOpacity={counted ? SC_VIO_OVER : 0.6} rx={Math.min(3, c * 0.06)} />}
      <rect x={x} y={y} width={c} height={c} fill="none" stroke={SC_COL.ink} strokeWidth={2.4} rx={Math.min(3, c * 0.06)} />
    </g>
  );
  /* the string: a vermilion line (fallback) with the rope skin over each laid side at its own aspect (slice, never stretched) */
  const ropeSide = (x1: number, y1: number, x2: number, y2: number, k: number) => {
    const len = Math.hypot(x2 - x1, y2 - y1), ang = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI, th = 18;
    return (
      <g key={"rope" + k} transform={`translate(${x1},${y1}) rotate(${ang})`}>
        <rect x={-th / 2} y={-th / 2} width={len + th} height={th} rx={th / 2} fill={SC_COL.bound} />
        <Skin name="rope" x={-th / 2} y={-th / 2} w={len + th} h={th} />
        <rect x={-th / 2} y={-th / 2} width={len + th} height={th} rx={th / 2} fill={SC_COL.bound} fillOpacity={0.38} />
        <rect x={-th / 2} y={-th / 2} width={len + th} height={th} rx={th / 2} fill="none" stroke={shade(SC_COL.bound, 0.4)} strokeWidth={2} />
      </g>
    );
  };
  const cells = (g: any, cols: number, rowsFull: number, partial: number, key: string) => {
    const out: any[] = [];
    for (let r = 0; r < rowsFull; r++) for (let j = 0; j < cols; j++) out.push([j, r]);
    for (let j = 0; j < partial; j++) out.push([j, rowsFull]);
    const isSkinned = cols * (rowsFull + (partial > 0 ? 1 : 0)) <= 40;
    return out.map(([j, r]) => tileCell(g.x + j * g.c, g.y + r * g.c, g.c, true, isSkinned));
  };
  const actKeys = () => {
    let ids: string[] = [];
    if (free) ids = ["row", "shape"];
    else if (showTb) ids = [];
    else if (stage === "demo") ids = stepOn ? [stepOn] : [];
    else if (stage === "ask") {
      if (kind === "card") ids = S.str < 4 ? ["string"] : S.rows < fig.b ? ["cover"] : [];
      else if (kind === "rect") ids = S.rows < fig.b ? ["row"] : [];
      else if (kind === "compare") ids = S.ca < fig.A[0] * fig.A[1] ? ["countA"] : S.cb < fig.B[0] * fig.B[1] ? ["countB"] : [];
      else if (kind === "sizes") ids = S.same ? [] : ["same"];
    }
    const ky = H - 96, two = ids.length > 1;
    const w = two ? SC_KEY.two.w : SC_KEY.one.w;
    return ids.map((id, j) => ({ id, j, x: two ? SC_PW / 2 - w - 12 + j * (w + 24) : SC_PW / 2 - w / 2, y: ky, w, h: 80,
      label: SC_LABEL[id], off: free && id === "row" && R && S.rows >= fig.b }));
  };
  const keys = actKeys();
  const inviteKey = !free && keys.length === 1 && (stage === "demo" || !actDone) ? keys[0] : null;

  /* ── phase pictures ── */
  const areaDy = lang === "hi" ? 66 : lang === "gu" ? 58 : 54;   /* Devanagari's shirorekha and matras stand taller: 12+ clear of the rope */
  const drawCard = () => {
    const g = R!;
    const s4 = S.str;
    const o = SC_ROPE;
    const corners = [[g.x - o, g.y - o], [g.x + g.w + o, g.y - o], [g.x + g.w + o, g.y + g.h + o], [g.x - o, g.y + g.h + o], [g.x - o, g.y - o]];
    const per = 2 * (fig.l + fig.b);
    /* the side / area connection: only after a right answer, and in the guide once the warm-up card is covered */
    const conn = (won || (warm && S.str >= 4 && S.rows >= fig.b)) && s4 >= 4;
    return (
      <g filter="url(#sc-shadow)">
        <rect x={g.x} y={g.y} width={g.w} height={g.h} rx={6} fill={SC_COL.card} stroke={SC_COL.ink} strokeWidth={4.5} />
        {cells(g, fig.l, S.rows, 0, "c")}
        {S.rows > 0 && <rect x={g.x} y={g.y} width={g.w} height={g.h} rx={6} fill="none" stroke={SC_COL.ink} strokeWidth={4.5} />}
        {s4 > 0 && <g pointerEvents="none">{corners.slice(0, s4).map((p, k) => ropeSide(p[0], p[1], corners[k + 1][0], corners[k + 1][1], k))}</g>}
        {s4 >= 4 && txt(g.x + g.w / 2, g.y - o - 28, conn ? tx("Perimeter") + ": " + fig.l + "+" + fig.b + "+" + fig.l + "+" + fig.b + "=" + per + " " + tx("cm") : tx("Perimeter") + " " + per + " " + tx("cm"), { fill: scDeep(SC_COL.bound), size: T.prompt })}
        {conn && txt(g.x + g.w / 2, g.y + g.h + o + 56, fig.l + " " + tx("cm"), { fill: scDeep(SC_COL.given) })}
        {conn && txt(g.x - o - 23, g.y + g.h / 2 + 11, fig.b + " " + tx("cm"), { a: "end", fill: scDeep(SC_COL.given) })}
        {conn && txt(g.x + g.w / 2, g.y + g.h + o + 110, tx("Area") + ": " + fig.l + "×" + fig.b + "=" + fig.l * fig.b + " " + tx("sq. cm"), { fill: scDeep(SC_COL.answer), size: T.prompt })}
        {s4 < 1 && !showTb && (
          <g aria-hidden="true" pointerEvents="none">{[0, 1, 2].map((k) => ropeSide(g.x - o - 104 + k * 4, g.y + 18 + k * 26, g.x - o - 28 - k * 4, g.y + 18 + k * 26, 10 + k))}</g>
        )}
      </g>
    );
  };
  const drawCardTb = () => {
    const g = R!, N = fig.l * fig.b;
    const nums: any[] = [];
    for (let i = 0; i < Math.min(tb.k, N); i++) {
      const j = i % fig.l, r = Math.floor(i / fig.l);
      nums.push(<g key={"n" + i}>
        {r >= S.rows && tileCell(g.x + j * g.c, g.y + r * g.c, g.c, true, N <= 40)}
        {txt(g.x + (j + 0.5) * g.c, g.y + (r + 0.5) * g.c + 15, String(i + 1), { fill: C.ink, size: 44, halo: true })}
      </g>);
    }
    return (
      <g pointerEvents="none">
        <rect x={g.x - SC_ROPE} y={g.y - SC_ROPE} width={g.w + 2 * SC_ROPE} height={g.h + 2 * SC_ROPE} rx={6} fill="none" stroke={SC_COL.bound} strokeWidth={10} strokeLinejoin="round" />
        {txt(g.x + g.w + SC_ROPE + 23, g.y + 30, tx("Length"), { a: "start", fill: scDeep(SC_COL.bound) })}
        {nums}
        {txt(g.x - SC_ROPE - 23, g.y + g.h / 2 + 11, tx("Surface"), { a: "end", fill: scDeep(SC_COL.unit) })}
        {tb.end && txt(g.x + g.w / 2, g.y + g.h + SC_ROPE + areaDy, tx("Area") + " " + item.answer + " " + tx("sq. cm"), { fill: scDeep(SC_COL.answer), size: T.prompt })}
      </g>
    );
  };
  const drawRect = () => {
    const g = R!;
    return (
      <g filter="url(#sc-shadow)">
        <rect x={g.x} y={g.y} width={g.w} height={g.h} fill={SC_COL.cell} stroke={SC_COL.ink} strokeWidth={4.5} />
        {cells(g, fig.l, S.rows, S.part, "r")}
        <rect x={g.x} y={g.y} width={g.w} height={g.h} fill="none" stroke={SC_COL.ink} strokeWidth={4.5} />
        {txt(g.x + g.w / 2, g.y - 18, fig.l + " " + tx("cm"), { fill: scDeep(SC_COL.given) })}
        {txt(g.x - 16, g.y + g.h / 2 + 11, fig.b + " " + tx("cm"), { a: "end", fill: scDeep(SC_COL.given) })}
        {won && txt(g.x + g.w / 2, g.y + g.h + 56, tx("Area") + " " + item.answer + " " + tx("sq. cm"), { fill: scDeep(SC_COL.answer), size: T.prompt })}
      </g>
    );
  };
  const drawRectTb = () => {
    const g = R!, k = Math.min(tb.k, fig.b);
    return (
      <g pointerEvents="none">
        {tb.inside && k === 0 && <rect x={g.x + g.c} y={g.y + g.c} width={g.w - 2 * g.c} height={g.h - 2 * g.c} fill={SC_COL.amber} fillOpacity={0.85} stroke={SC_COL.ink} strokeWidth={3} />}
        {Array.from({ length: k }, (_, r) => (
          <g key={"tr" + r}>
            {Array.from({ length: fig.l }, (_, j) => (
              <g key={j}>
                {r >= S.rows && tileCell(g.x + j * g.c, g.y + r * g.c, g.c, true, fig.l * fig.b <= 40)}
                {r === k - 1 && !tb.end && <rect x={g.x + j * g.c} y={g.y + r * g.c} width={g.c} height={g.c} fill={SC_COL.amber} fillOpacity={0.85} stroke={SC_COL.ink} strokeWidth={2.4} />}
              </g>
            ))}
            {txt(g.x + g.w + 16, g.y + (r + 0.5) * g.c + 13, String(fig.l * (r + 1)), { a: "start", size: T.prompt, fill: C.ink })}
          </g>
        ))}
        <rect x={g.x} y={g.y} width={g.w} height={g.h} fill="none" stroke={SC_COL.ink} strokeWidth={4.5} />
        {tb.end && txt(g.x + g.w / 2, g.y + g.h + 56, tx("Area") + " " + item.answer + " " + tx("sq. cm"), { fill: scDeep(SC_COL.answer), size: T.prompt })}
      </g>
    );
  };
  const drawFence = (lit: boolean) => {
    const g = { x: 186, y: 76, w: 560, h: 300 };
    const posts: any[] = [];
    for (let x = g.x; x <= g.x + g.w + 1; x += 56) { posts.push([x, g.y]); posts.push([x, g.y + g.h]); }
    for (let y = g.y + 60; y < g.y + g.h; y += 60) { posts.push([g.x, y]); posts.push([g.x + g.w, y]); }
    return (
      <g filter="url(#sc-shadow)">
        <rect x={g.x} y={g.y} width={g.w} height={g.h} rx={12} fill={SC_COL.grass} stroke={SC_COL.ink} strokeWidth={3.5} />
        <rect x={g.x + 8} y={g.y + 8} width={g.w - 16} height={g.h - 16} rx={8} fill="none" stroke="#FFFFFF" strokeWidth={2} strokeDasharray="8 6" opacity={0.5} />
        <rect x={g.x} y={g.y} width={g.w} height={g.h} rx={12} fill="none" stroke={SC_COL.bound} strokeWidth={lit ? 12 : 7} />
        {posts.map(([x, y], i) => (
          <g key={i}>
            <rect x={x - 6} y={y - 14} width={12} height={28} rx={3} fill={shade(SC_COL.bound, 0.25)} stroke={SC_COL.ink} strokeWidth={1.5} />
            <rect x={x - 4} y={y - 12} width={8} height={10} rx={1} fill="#FFFFFF" opacity={0.2} />
          </g>
        ))}
        {txt(g.x + g.w / 2, g.y - 26, tx("Garden"), { fill: C.ink })}
        {lit && txt(g.x - 26, g.y + g.h / 2 + 11, tx("Boundary"), { a: "end", fill: scDeep(SC_COL.bound), halo: true })}
        {(lit && tb.end) || won ? txt(g.x + g.w / 2, g.y + g.h + 60, tx("Perimeter"), { fill: scDeep(SC_COL.answer), size: T.prompt }) : null}
      </g>
    );
  };
  const drawShelf = (live: boolean, lit: string) => (
    <g>
      {txt(SC_SHELF(1).x + SC_SHELF(1).w / 2, 64, tx("Unit squares"), { fill: scDeep(SC_COL.unit) })}
      {SC_UNITS.map((u, i) => {
        const sh = SC_SHELF(i), sx = sh.x + (sh.w - u.s) / 2, sy = sh.y + 170 - u.s;
        const on = lit === u.id || (!won && S.tried === u.id);
        return (
          <g key={u.id}>
            <rect x={sh.x} y={sh.y} width={sh.w} height={sh.h} rx={12} fill="url(#sc-shelf-grad)" stroke={SC_COL.rule} strokeWidth={2} filter="url(#sc-shadow-sm)" />
            <rect x={sx} y={sy} width={u.s} height={u.s} fill={on ? tint(SC_COL.amber, 0.4) : cellFill} rx={Math.min(4, u.s * 0.08)} />
            <rect x={sx} y={sy} width={u.s} height={u.s} fill="none" stroke={SC_COL.ink} strokeWidth={2.4} rx={Math.min(4, u.s * 0.08)} />
            {txt(sh.x + sh.w / 2, sh.y + 218, tx(u.side), { fill: C.ink })}
            {live && <Hit id={"unit-" + u.id.slice(2)} x={sh.x} y={sh.y} w={sh.w} h={sh.h} label={tx("Unit square") + " " + u.side} onPress={() => tryUnit(u, i)} />}
          </g>
        );
      })}
    </g>
  );
  const drawSurface = (surf: string) => {
    const g = SC_PIC;
    return (
      <g filter="url(#sc-shadow)">
        <clipPath id="sc-pic"><rect x={g.x} y={g.y} width={g.w} height={g.h} rx={12} /></clipPath>
        {surf === "playground" ? (
          <g clipPath="url(#sc-pic)">
            <rect x={g.x} y={g.y} width={g.w} height={g.h} fill={SC_COL.grass} />
            <rect x={g.x + 40} y={g.y + 40} width={g.w - 80} height={g.h - 80} rx={70} fill="none" stroke="#FFFFFF" strokeWidth={6} />
            <line x1={g.x + g.w / 2} y1={g.y + 40} x2={g.x + g.w / 2} y2={g.y + g.h - 40} stroke="#FFFFFF" strokeWidth={5} />
            <Skin name="playground" x={g.x} y={g.y} w={g.w} h={g.h} clip="url(#sc-pic)" />
          </g>
        ) : (
          <g clipPath="url(#sc-pic)">
            <rect x={g.x} y={g.y} width={g.w} height={g.h} fill="#EEF1F4" />
            <rect x={g.x + g.w / 2 - 70} y={g.y + g.h / 2 - 90} width={140} height={180} fill={SC_COL.cell} stroke={SC_COL.ink} strokeWidth={3} strokeDasharray="7 5" rx={4} />
            <rect x={g.x + g.w / 2 - 50} y={g.y + g.h / 2 - 70} width={100} height={120} fill="#DCE6EE" stroke="#5B6770" strokeWidth={2} />
            <path d={`M ${g.x + g.w / 2 - 50} ${g.y + g.h / 2 + 30} L ${g.x + g.w / 2 - 15} ${g.y + g.h / 2 - 10} L ${g.x + g.w / 2 + 10} ${g.y + g.h / 2 + 12} L ${g.x + g.w / 2 + 50} ${g.y + g.h / 2 - 20} L ${g.x + g.w / 2 + 50} ${g.y + g.h / 2 + 50} L ${g.x + g.w / 2 - 50} ${g.y + g.h / 2 + 50} Z`} fill="#9AA4AC" />
          </g>
        )}
        <rect x={g.x} y={g.y} width={g.w} height={g.h} rx={12} fill="none" stroke={SC_COL.ink} strokeWidth={4.5} />
        {txt(g.x + g.w / 2, g.y - 20, tx(surf === "playground" ? "Playground" : "Postage stamp"), { fill: C.ink })}
      </g>
    );
  };
  /* a unit square tried on the picture card: too small a speck, the fitting one a neat row, too big swallows the card */
  const drawTried = (u: string, fit: string, amber: boolean) => {
    if (!u) return null;
    /* on the stamp the unit squares are laid over the stamp itself (140 wide), not over the whole card */
    const g = fig.surf === "stamp" ? { x: SC_PIC.x + SC_PIC.w / 2 - 70, y: SC_PIC.y + SC_PIC.h / 2 - 90, w: 140, h: 180 } : SC_PIC, d = SC_UNITS.findIndex((x) => x.id === u) - SC_UNITS.findIndex((x) => x.id === fit);
    const st = amber ? tint(SC_COL.amber, 0.45) : SC_VIO;
    if (d < 0) return (
      <g pointerEvents="none">
        {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={g.x + 20 + i * 9} y={g.y + 20} width={8} height={8} fill={st} stroke={SC_COL.ink} strokeWidth={1} />)}
      </g>
    );
    if (d > 0) return (
      <g pointerEvents="none" clipPath="url(#sc-pic)">
        <rect x={g.x + 30} y={g.y + 30} width={g.w * 3} height={g.h * 3} fill={st} fillOpacity={0.8} stroke={SC_COL.ink} strokeWidth={3} />
      </g>
    );
    const nAcross = fig.surf === "stamp" ? 2 : 6, s = Math.round(g.w / nAcross);
    return (
      <g pointerEvents="none">
        {Array.from({ length: nAcross }, (_, i) => i).map((i) => <rect key={i} x={g.x + i * s} y={g.y} width={s} height={s} fill={i === 0 ? st : "none"} stroke={SC_COL.ink} strokeWidth={i === 0 ? 2.4 : 2} strokeDasharray={i === 0 ? undefined : "8 6"} />)}
      </g>
    );
  };
  const drawSq1m = (tbOn: boolean) => {
    const s = 260, x = SC_PIC.x + (SC_PIC.w - s) / 2, y = SC_PIC.y + 10;
    return (
      <g filter="url(#sc-shadow)">
        <rect x={x} y={y} width={s} height={s} fill={cellFill} rx={6} />
        <Skin name="tile" x={x} y={y} w={s} h={s} fit="stretch" />
        <rect x={x} y={y} width={s} height={s} fill={SC_VIO_SKIN} fillOpacity={SC_VIO_OVER} rx={6} />
        <rect x={x} y={y} width={s} height={s} fill="none" stroke={tbOn ? SC_COL.bound : SC_COL.ink} strokeWidth={tbOn ? 9 : 4.5} rx={6} />
        {txt(x + s / 2, y - 14, "1 " + tx("m"), { fill: scDeep(SC_COL.given) })}
        {txt(x - 14, y + s / 2 + 11, "1 " + tx("m"), { a: "end", fill: scDeep(SC_COL.given) })}
        {tbOn && txt(x + s + 14, y + s / 2 + 11, tx("Boundary"), { a: "start", fill: scDeep(SC_COL.bound) })}
        {(tbOn && tb.end) || won ? txt(x + s / 2, y + s / 2 + 14, "1 " + tx("sq. m"), { fill: scDeep(SC_COL.answer), size: T.prompt, halo: true }) : null}
      </g>
    );
  };
  const patchSkin = P ? !warm && P.a.rows * P.a.cols + P.b.rows * P.b.cols <= 40 : false;   /* the warm-up is drawn like the phase's question grids */
  const lblY = P ? Math.min(P.a.y, P.b.y) - (kind === "sizes" ? (lang === "hi" ? 30 : 26) : (lang === "hi" ? 29 : lang === "gu" ? 26 : 16)) : 0,   /* hi/gu nukta, hook and descenders 12+ clear of the grid top */ cntY = P ? Math.max(P.a.y + P.a.h, P.b.y + P.b.h) + 50 : 0;
  const patch = (q: any, name: string, counted: number, dim: boolean, lit: string, skinKey: string) => {
    const cl: any[] = [];
    for (let r = 0; r < q.rows; r++) for (let j = 0; j < q.cols; j++)
      cl.push(
        <g key={j + "-" + r}>
          {tileCell(q.x + j * q.c, q.y + r * q.c, q.c, r * q.cols + j < counted, patchSkin)}
          {lit && <rect x={q.x + j * q.c} y={q.y + r * q.c} width={q.c} height={q.c} fill={lit === "green" ? SC_COL.answer : SC_COL.amber} fillOpacity={0.85} stroke={SC_COL.ink} strokeWidth={2.4} rx={Math.min(3, q.c * 0.06)} />}
        </g>
      );
    return (
      <g opacity={dim ? 0.5 : 1} filter="url(#sc-shadow-sm)">
        {cl}
        <rect x={q.x} y={q.y} width={q.w} height={q.h} fill="none" stroke={SC_COL.ink} strokeWidth={4.5} rx={4} />
        {txt(q.x + q.w / 2, lblY, tx(name), { fill: C.ink })}
        {counted > 0 && countsShown && skinKey !== "nocount" && txt(q.x + q.w / 2, cntY, String(counted), { size: T.prompt, fill: counted >= q.rows * q.cols ? C.ink : scDeep(SC_COL.unit) })}
      </g>
    );
  };
  const drawCompare = () => {
    const tbOn = showTb, A = P!.a, B = P!.b;
    const ta = tbOn ? Math.min(tb.k, A.rows) * A.cols : 0, tbb = tbOn ? Math.max(0, Math.min(tb.k - A.rows, B.rows)) * B.cols : 0;
    const big = fig.A[0] * fig.A[1] > fig.B[0] * fig.B[1] ? "a" : "b";
    const ca = Math.max(S.ca, ta), cb = Math.max(S.cb, tbb);
    const litA = (tbOn && tb.end && big === "a") ? "amber" : (won && big === "a") ? "green" : "";
    const litB = (tbOn && tb.end && big === "b") ? "amber" : (won && big === "b") ? "green" : "";
    return (
      <g>
        {patch(A, "Patch A", ca, false, litA, "")}
        {patch(B, "Patch B", cb, false, litB, "")}
        {tbOn && tb.end && txt(SC_PW / 2, H - 40, tx(big === "a" ? "Patch A" : "Patch B") + " " + tx("covers more"), { fill: scDeep(SC_COL.answer), size: T.prompt })}
      </g>
    );
  };
  const drawSizes = () => {
    const A = P!.a, B = P!.b, k = fig.k, sm = S.same || (showTb && tb.k >= 1);
    const bigCells: any[] = [];
    if (sm) for (let r = 0; r < B.rows * k; r++) for (let j = 0; j < B.cols * k; j++)
      bigCells.push(<rect key={j + "-" + r} x={B.x + j * A.c} y={B.y + r * A.c} width={A.c} height={A.c} fill="none" stroke={SC_COL.ink} strokeWidth={1.4} strokeDasharray="5 4" />);
    return (
      <g>
        {patch(A, "Patch A", A.rows * A.cols, false, "", "nocount")}
        {patch(B, "Patch B", B.rows * B.cols, false, showTb && tb.k >= 2 ? "amber" : "", "nocount")}
        <g pointerEvents="none">{bigCells}</g>
        {countsShown && txt(A.x + A.w / 2, cntY, String(fig.A[0] * fig.A[1]), { size: T.prompt })}
        {countsShown && txt(B.x + B.w / 2, cntY, sm ? String(B.rows * k * B.cols * k) : String(fig.B[0] * fig.B[1]), { size: T.prompt, fill: sm ? scDeep(SC_COL.unit) : C.ink })}
        {(showTb && tb.end) || won ? txt(SC_PW / 2, H - 40, tx("No: sizes differ"), { fill: scDeep(SC_COL.answer), size: T.prompt }) : null}
      </g>
    );
  };

  return (
    <g>
      <defs>
        <filter id="sc-shadow" x="-8%" y="-8%" width="116%" height="116%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#2B2B2B" floodOpacity="0.12" />
        </filter>
        <filter id="sc-shadow-sm" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#2B2B2B" floodOpacity="0.10" />
        </filter>
        <linearGradient id="sc-shelf-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FAF7F0" />
          <stop offset="100%" stopColor="#EDE5D8" />
        </linearGradient>
      </defs>
      {kind === "card" && drawCard()}
      {kind === "card" && showTb && drawCardTb()}
      {kind === "rect" && drawRect()}
      {kind === "rect" && showTb && drawRectTb()}
      {kind === "fence" && drawFence(showTb)}
      {kind === "unit" && (
        <g>
          {drawShelf(!won && !showTb, showTb ? fig.fit : "")}
          {drawSurface(fig.surf)}
          {!showTb && !won && drawTried(S.tried, fig.fit, false)}
          {(showTb || won) && drawTried(fig.fit, fig.fit, showTb)}
          {(showTb && tb.end) || won ? txt(SC_PIC.x + SC_PIC.w / 2, SC_PIC.y + SC_PIC.h + 56, tx((SC_UNIT_CH.find((c) => c.id === fig.fit) || SC_UNIT_CH[0]).label), { fill: scDeep(SC_COL.answer), size: T.prompt }) : null}
          {!S.tried && stage === "ask" && !showTb && !(box && box.open) && <Invite x={SC_SHELF(1).x + SC_SHELF(1).w / 2} y={SC_SHELF(0).y + SC_SHELF(0).h / 2} w={3 * 126 - 8} h={250} rx={16} C={C} />}
        </g>
      )}
      {kind === "sq1m" && (
        <g>
          {drawShelf(false, "")}
          {drawSq1m(showTb)}
        </g>
      )}
      {kind === "compare" && drawCompare()}
      {kind === "sizes" && drawSizes()}
      {keys.map((b) => (
        <Key key={"act" + b.j} id={b.id} label={tx(b.label)} x={b.x} y={b.y} w={b.w} h={b.h} C={C} tone="key" disabled={b.off} onClick={() => pressKey(b.id)}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={b.off ? shade(C.dim, 0.4) : toneInk("key", C.ink)}>{tx(b.label)}</text>
        </Key>
      ))}
      {inviteKey && <Invite x={inviteKey.x + inviteKey.w / 2} y={inviteKey.y + inviteKey.h / 2} w={inviteKey.w} h={inviteKey.h} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ result, it, n, C, w, h }: any) {
  const v = result && result.last ? result.last.value : null;
  if (v === null || v === undefined) return null;
  const item = it || (result.last && PHASES[(n || 1) - 1] && PHASES[(n || 1) - 1].items[result.last.item]) || {};
  const sv = String(v), my = h / 2, cy = 10, ch = h - 20;
  const box = (x: number, y: number, s: number, f: string, k: any) => <rect key={k} x={x} y={y} width={s} height={s} fill={f} stroke={SC_COL.ink} strokeWidth={1.8} rx={2} />;
  const green = tint(SC_COL.answer, 0.35), vio = SC_VIO;
  let art: any = null;
  if (item.kind === "fence") art = <rect x={60} y={cy + 6} width={w - 120} height={ch - 12} rx={6} fill={SC_COL.grass} stroke={SC_COL.bound} strokeWidth={5} />;
  else if (item.kind === "unit") art = <g>{[16, 26, 36].map((s, i) => box(40 + i * 60, my + 18 - s, s, SC_UNITS[i].id === sv ? green : SC_COL.cell, i))}</g>;
  else if (item.kind === "sq1m") art = <g>{box(w / 2 - 28, my - 28, 56, green, 0)}<text x={w / 2} y={my + 8} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>1</text></g>;
  else if (item.kind === "compare") art = <g>{box(40, my - 20, 40, sv === "p_a" ? green : SC_COL.cell, 0)}{box(140, my - 20, 40, sv === "p_b" ? green : SC_COL.cell, 1)}</g>;
  else if (item.kind === "sizes") art = <g>{box(36, my - 10, 20, vio, 0)}<g stroke={C.ink} strokeWidth={4} strokeLinecap="round"><line x1={w / 2 - 16} y1={my - 7} x2={w / 2 + 16} y2={my - 7} /><line x1={w / 2 - 16} y1={my + 7} x2={w / 2 + 16} y2={my + 7} /><line x1={w / 2 + 8} y1={my - 18} x2={w / 2 - 8} y2={my + 18} /></g>{box(w - 84, my - 24, 48, vio, 1)}</g>;
  else {
    const L = item.l || 3, B = item.b || 2, c = Math.min(18, (w - 110) / L, ch / B);
    const cells: any[] = [];
    for (let r = 0; r < B; r++) for (let j = 0; j < L; j++) cells.push(box(14 + j * c, my - (B * c) / 2 + r * c, c, vio, j + "-" + r));
    art = <g>{cells}
      <text x={w - 18} y={my + 8} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={scDeep(SC_COL.answer)}>{sv}</text></g>;
  }
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {art}
    </g>
  );
}

function SquareCover(props: any) {
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

export default SquareCover;