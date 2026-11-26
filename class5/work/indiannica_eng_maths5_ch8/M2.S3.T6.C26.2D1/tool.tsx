/* ═══ M2.S3.T6.C26.2D1 · work_back_area · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the working area already
   exists. THE LESSON IS SILENT (runtime r30): every line is printed on the bubble, which is the guide. keyOnly + navDots
   (the new look, LAYOUT §1d-§1e, PATTERNS §15-§16): the question lives ONLY in the bubble. NO imports in this file.
   Every English line the tool prints has a Hindi and a Gujarati entry in TR once the English is final.
   Phase 1: a Try dial grows a square against a target outline. Phase 2: Fold the perimeter string into four, Fill the
   rows. Phase 3: a Breadth dial stacks rows on a known length. Phase 4: Cut an L-shape across or down and Join it;
   equal squares laid with a Copies dial. Edit, never rewrite. */

const TOOL_ID = "work_back_area";
const MEDIA_ID = "M2.S3.T6.C26.2D1";
const TOOL_NAME = "Work Back and Split";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (not shown: phase 1 has steps) */
const OPENING = ["A target, and a shape to find."];
/* the whole-tool line (not shown from r44) */
const FINISH_LINE = "You worked back to a side and put areas together.";
/* printed when the child opens Free play: free play offers exactly this (the L-shaped floor, both cuts, Join) */
const FREE_LINE = "Free play. Cut the floor across or down, and add the two areas.";

/* THE START PAGE (docs/LAYOUT.md §1c): a target outline with a try square growing into it, and an L-shaped floor cut in two */
const START_HOOK = "Can you find a square's side when you know only its area?";
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  const u = 30, sx = 150, sy = 24, A = 9, s = 7;
  const lu = 30, lx = 690, ly = 24, LW = 12, LHb = 5, Lw = 7, Lh = 4;
  const cells: any[] = [];
  for (let r = 0; r < s; r++) for (let c = 0; c < s; c++)
    cells.push(<rect key={"c" + r + "-" + c} x={sx + c * u} y={sy + r * u} width={u} height={u} fill={tint(WB_UNIT, 0.35)} stroke={WB_INK} strokeWidth={2} />);
  const lp = `M ${lx} ${ly} H ${lx + Lw * lu} V ${ly + Lh * lu} H ${lx + LW * lu} V ${ly + (Lh + LHb) * lu} H ${lx} Z`;
  return (
    <g pointerEvents="none">
      <rect x={sx + 6} y={sy + 6} width={A * u} height={A * u} rx={8} fill="#000000" fillOpacity={0.06} />
      <rect x={sx} y={sy} width={A * u} height={A * u} fill={WB_WARM} rx={4} />
      {cells}
      <rect x={sx} y={sy} width={A * u} height={A * u} fill="none" stroke={WB_INK} strokeWidth={5} rx={4} />
      <text x={sx + (A * u) / 2} y={sy + A * u + 58} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={WB_INK}>{tx("Side?")}</text>
      
      <path d={lp} fill={WB_WARM} stroke={WB_INK} strokeWidth={5} strokeLinejoin="round" />
      <line x1={lx} y1={ly + Lh * lu} x2={lx + Lw * lu} y2={ly + Lh * lu} stroke={WB_INK} strokeWidth={4} strokeDasharray="14 10" />
      <text x={lx + (LW * lu) / 2} y={ly + (Lh + LHb) * lu + 58} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={WB_INK}>{tx("Split and add")}</text>
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): filled in the language pass, once the English is final. */
const TR: any = {
  hi: {
    "Work Back and Split": "उल्टा चलो और बाँटो",
    "A side from an area": "क्षेत्रफल से भुजा",
    "From perimeter to area": "परिमाप से क्षेत्रफल",
    "A missing breadth": "छूटी हुई चौड़ाई",
    "Split and add": "बाँटो और जोड़ो",
    "Tap plus to try a square with a side one longer.": "1 बड़ी भुजा वाला वर्ग आज़माने के लिए प्लस दबाओ।",
    "Find the key with a plus sign.": "प्लस के निशान वाली कुंजी ढूँढो।",
    "Tap plus again and see if the square fills the outline.": "फिर प्लस दबाओ और देखो कि वर्ग रूपरेखा भरता है या नहीं।",
    "Plus is the key on the right of the number.": "प्लस संख्या के दाईं ओर की कुंजी है।",
    "Tap plus once more and look at the outline.": "एक बार और प्लस दबाओ और रूपरेखा देखो।",
    "Use plus again, not minus.": "फिर से प्लस दबाओ, माइनस नहीं।",
    "Try a side, then multiply it by itself.": "एक भुजा आज़माओ, फिर उसे उसी से गुणा करो।",
    "If the square spills past, move the side the other way.": "वर्ग बाहर निकले तो भुजा उल्टी ओर बदलो।",
    "The side of a square is the number that times itself gives its area.": "वर्ग की भुजा वह संख्या है जिसे उसी से गुणा करने पर क्षेत्रफल मिलता है।",
    "You learned: a square's side times itself gives its area.": "तुमने सीखा: वर्ग की भुजा × भुजा = क्षेत्रफल।",
    "A square has an area of 256 square centimetres, so how long is each side?": "एक वर्ग का क्षेत्रफल 256 वर्ग सेमी है, हर भुजा कितनी लंबी है?",
    "Side of the square?": "वर्ग की भुजा?",
    "Try sides on the dial until the square fills the outline.": "डायल पर भुजाएँ आज़माओ जब तक वर्ग रूपरेखा न भर दे।",
    "Yes, 16 × 16 = 256, so each side is 16 cm.": "हाँ, 16×16=256, इसलिए हर भुजा 16 सेमी है।",
    "Another square covers 16 square centimetres; find the length of its side.": "दूसरा वर्ग 16 वर्ग सेमी घेरता है, उसकी भुजा की लंबाई बताओ।",
    "Side?": "भुजा?",
    "Start small and try a side of 2, then 3.": "छोटे से शुरू करो, पहले 2 की भुजा, फिर 3 की।",
    "Right, 4 × 4 = 16, so the side is 4 cm.": "सही, 4×4=16, इसलिए भुजा 4 सेमी है।",
    "Find each side of a square plot that covers 225 square metres.": "225 वर्ग मी के वर्गाकार भूखंड की हर भुजा बताओ।",
    "Side of the plot?": "भूखंड की भुजा?",
    "A side is never half the area, so try the dial.": "भुजा कभी क्षेत्रफल की आधी नहीं होती, डायल आज़माओ।",
    "Yes, 15 × 15 = 225, so each side is 15 m.": "हाँ, 15×15=225, इसलिए हर भुजा 15 मी है।",
    "Tap Fold to fold the 20 cm string into four equal sides.": "20 सेमी की डोरी को 4 बराबर भुजाओं में मोड़ने के लिए मोड़ो दबाओ।",
    "Tap the Fold key beside the square.": "वर्ग के पास मोड़ो कुंजी दबाओ।",
    "Now tap Fill to lay rows of squares inside.": "अब अंदर वर्गों की पंक्तियाँ बिछाने के लिए भरो दबाओ।",
    "Fill is the key beside the square, where Fold was.": "भरो वर्ग के पास की कुंजी है, जहाँ मोड़ो था।",
    "Multiply one side by itself to get the area.": "क्षेत्रफल के लिए एक भुजा को उसी से गुणा करो।",
    "Area is one side times the same side again.": "क्षेत्रफल = एक भुजा × वही भुजा फिर से।",
    "From a square's perimeter, find the side first, then the area.": "वर्ग के परिमाप से पहले भुजा निकालो, फिर क्षेत्रफल।",
    "You learned: from a square's perimeter, find the side, then the area.": "तुमने सीखा: परिमाप से पहले भुजा, फिर क्षेत्रफल।",
    "A square yard has a perimeter of 84 m; what is its area?": "एक वर्गाकार आँगन का परिमाप 84 मी है, उसका क्षेत्रफल क्या है?",
    "Area of the yard?": "आँगन का क्षेत्रफल?",
    "Now find the area of the square you folded.": "अब मोड़े हुए वर्ग का क्षेत्रफल निकालो।",
    "Yes, the side is 21 m and 21 × 21 = 441 square metres.": "हाँ, भुजा 21 मी है और 21×21=441 वर्ग मी।",
    "A square card has a perimeter of 40 cm; find its area.": "एक वर्गाकार कार्ड का परिमाप 40 सेमी है, उसका क्षेत्रफल निकालो।",
    "Area of the card?": "कार्ड का क्षेत्रफल?",
    "Four equal sides make the perimeter, so one side is a quarter of it.": "4 बराबर भुजाएँ परिमाप बनाती हैं, एक भुजा उसका चौथाई है।",
    "Right, a side of 10 cm gives 10 × 10 = 100 square centimetres.": "सही, 10 सेमी की भुजा से 10×10=100 वर्ग सेमी।",
    "A square garden is 48 m all the way round; how much area does it cover?": "एक वर्गाकार बगीचा चारों ओर 48 मी है, वह कितना क्षेत्रफल घेरता है?",
    "Area of the garden?": "बगीचे का क्षेत्रफल?",
    "Find the side first, then the area of that square.": "पहले भुजा निकालो, फिर उस वर्ग का क्षेत्रफल।",
    "Yes, 12 × 12 = 144 square metres.": "हाँ, 12×12=144 वर्ग मी।",
    "Tap plus to stack one row of 6 squares on the length.": "लंबाई पर 6 वर्गों की 1 पंक्ति रखने के लिए प्लस दबाओ।",
    "Tap the plus key beside the dial.": "डायल के पास वाली प्लस कुंजी दबाओ।",
    "Tap plus again to stack a second row on top.": "ऊपर दूसरी पंक्ति रखने के लिए फिर प्लस दबाओ।",
    "One more tap on plus adds a row.": "प्लस एक बार और दबाने से 1 पंक्ति जुड़ती है।",
    "Each row adds one length of squares to the area.": "हर पंक्ति क्षेत्रफल में लंबाई जितने वर्ग जोड़ती है।",
    "Try a row count, then multiply it by the length.": "पंक्तियों की संख्या आज़माओ, फिर उसे लंबाई से गुणा करो।",
    "A missing breadth is the number that times the length gives the area.": "छूटी चौड़ाई वह संख्या है जिसे लंबाई से गुणा करने पर क्षेत्रफल मिलता है।",
    "You learned: missing breadth × length gives the area.": "तुमने सीखा: चौड़ाई × लंबाई = क्षेत्रफल।",
    "How wide is a 19 cm long rectangle of 152 square centimetres?": "एक आयत का क्षेत्रफल 152 वर्ग सेमी और लंबाई 19 सेमी है, वह कितना चौड़ा है?",
    "Breadth?": "चौड़ाई?",
    "Stack rows until the total reaches the Area.": "पंक्तियाँ रखो जब तक कुल क्षेत्रफल तक न पहुँचे।",
    "Yes, 19 × 8 = 152, so the breadth is 8 cm.": "हाँ, 19×8=152, इसलिए चौड़ाई 8 सेमी है।",
    "A rectangle 9 m long covers 27 square metres; find its breadth.": "9 मी लंबा एक आयत 27 वर्ग मी घेरता है, उसकी चौड़ाई निकालो।",
    "How wide?": "कितना चौड़ा?",
    "Do not take the length away from the area.": "क्षेत्रफल में से लंबाई मत घटाओ।",
    "Right, 9 × 3 = 27, so it is 3 m wide.": "सही, 9×3=27, इसलिए वह 3 मी चौड़ा है।",
    "Find the breadth of a 14 cm long rectangle of 98 square centimetres.": "14 सेमी लंबे और 98 वर्ग सेमी क्षेत्रफल वाले आयत की चौड़ाई निकालो।",
    "Missing breadth?": "छूटी चौड़ाई?",
    "Check your breadth against the rows on the board.": "अपनी चौड़ाई को बोर्ड की पंक्तियों से मिलाओ।",
    "Yes, 14 × 7 = 98, so the breadth is 7 cm.": "हाँ, 14×7=98, इसलिए चौड़ाई 7 सेमी है।",
    "Tap Cut across to cut this floor into two rectangles.": "इस फ़र्श को 2 आयतों में काटने के लिए आड़ा काटो दबाओ।",
    "Cut across is the first key beside the floor.": "आड़ा काटो फ़र्श के पास की पहली कुंजी है।",
    "Now tap Join to slide the two parts back together.": "अब दोनों भागों को वापस सटाने के लिए जोड़ो दबाओ।",
    "Join is the key beside the floor.": "जोड़ो फ़र्श के पास वाली कुंजी है।",
    "Length times breadth gives each part's area.": "लंबाई × चौड़ाई से हर भाग का क्षेत्रफल मिलता है।",
    "Never multiply the two longest sides.": "दो सबसे लंबी भुजाओं को कभी गुणा मत करो।",
    "An L-shape cut into two rectangles has the two areas added.": "L-आकार को 2 आयतों में काटकर दोनों क्षेत्रफल जोड़ते हैं।",
    "You learned: cut an L-shape in two rectangles and add the areas.": "तुमने सीखा: L-आकार को 2 आयतों में काटो, क्षेत्रफल जोड़ो।",
    "What is the area of this L-shaped floor?": "इस L-आकार के फ़र्श का क्षेत्रफल क्या है?",
    "Area of the floor?": "फ़र्श का क्षेत्रफल?",
    "Find each part's area, then add them.": "हर भाग का क्षेत्रफल निकालो, फिर जोड़ो।",
    "Yes, the two parts add up to 108 square metres.": "हाँ, कुल 108 वर्ग मी।",
    "5 equal squares of 9 square centimetres each; what area do they cover?": "9 वर्ग सेमी के 5 बराबर वर्ग रखो, वे मिलकर कितना क्षेत्रफल घेरते हैं?",
    "Area of 5 squares?": "5 वर्गों का क्षेत्रफल?",
    "Count five lots of 9.": "9 के 5 समूह गिनो।",
    "Each square adds 9 square centimetres to the area.": "हर वर्ग क्षेत्रफल में 9 वर्ग सेमी जोड़ता है।",
    "Multiply the number of squares by one square's area.": "वर्गों की संख्या को एक वर्ग के क्षेत्रफल से गुणा करो।",
    "Right, 5 × 9 = 45 square centimetres.": "सही, 5×9=45 वर्ग सेमी।",
    "What area does this L-shaped patch cover?": "यह L-आकार का ज़मीन का टुकड़ा कितना क्षेत्रफल घेरता है?",
    "Area of the patch?": "टुकड़े का क्षेत्रफल?",
    "Part of the big rectangle is not part of the patch.": "बड़े आयत का एक भाग टुकड़े में नहीं है।",
    "Yes, the patch covers 98 square metres.": "हाँ, टुकड़ा 98 वर्ग मी घेरता है।",
    "Tap plus to try a side.": "भुजा आज़माने के लिए प्लस दबाओ।",
    "Tap plus to stack a row.": "पंक्ति रखने के लिए प्लस दबाओ।",
    "Tap Fold first.": "पहले मोड़ो दबाओ।",
    "Cut the floor first.": "पहले फ़र्श काटो।",
    "Lay the squares with plus.": "प्लस से वर्ग रखो।",
    "Free play. Cut the floor across or down, and add the two areas.": "मुक्त खेल। फ़र्श को आड़ा या खड़ा काटो और दोनों क्षेत्रफल जोड़ो।",
    "Free play.": "मुक्त खेल।",
    "Cut the floor across or down, and add the two areas.": "फ़र्श को आड़ा या खड़ा काटो और दोनों क्षेत्रफल जोड़ो।",
    "Boundary": "सीमा",
    "Row": "पंक्ति",
    "Can you find a square's side when you know only its area?": "क्षेत्रफल से वर्ग की भुजा निकाल सकोगे?",
    "A target, and a shape to find.": "एक लक्ष्य, और ढूँढने को एक आकृति।",
    "You worked back to a side and put areas together.": "तुमने उल्टा चलकर भुजा निकाली और क्षेत्रफल जोड़े।",
    "Area": "क्षेत्रफल",
    "Perimeter": "परिमाप",
    "One square": "एक वर्ग",
    "Side": "भुजा",
    "Breadth": "चौड़ाई",
    "Squares": "वर्ग",
    "Fold": "मोड़ो",
    "Fill": "भरो",
    "Cut across": "आड़ा काटो",
    "Cut down": "खड़ा काटो",
    "Join": "जोड़ो",
    "Not floor": "फ़र्श नहीं",
    "Cut the patch first.": "पहले टुकड़ा काटो।",
    "Not patch": "टुकड़ा नहीं",
    "cm": "सेमी",
    "m": "मी",
    "sq. cm": "वर्ग सेमी",
    "sq. m": "वर्ग मी",
  },
  gu: {
    "Work Back and Split": "ઊલટું ચાલો અને વહેંચો",
    "A side from an area": "ક્ષેત્રફળથી બાજુ",
    "From perimeter to area": "પરિમિતિથી ક્ષેત્રફળ",
    "A missing breadth": "ખૂટતી પહોળાઈ",
    "Split and add": "વહેંચો અને ઉમેરો",
    "Tap plus to try a square with a side one longer.": "1 મોટી બાજુવાળો ચોરસ અજમાવવા પ્લસ દબાવો.",
    "Find the key with a plus sign.": "પ્લસના નિશાનવાળી ચાવી શોધો.",
    "Tap plus again and see if the square fills the outline.": "ફરી પ્લસ દબાવો અને જુઓ ચોરસ રૂપરેખા ભરે છે કે નહીં.",
    "Plus is the key on the right of the number.": "પ્લસ સંખ્યાની જમણી બાજુની ચાવી છે.",
    "Tap plus once more and look at the outline.": "એક વાર વધુ પ્લસ દબાવો અને રૂપરેખા જુઓ.",
    "Use plus again, not minus.": "ફરી પ્લસ દબાવો, માઇનસ નહીં.",
    "Try a side, then multiply it by itself.": "એક બાજુ અજમાવો, પછી તેને તેનાથી જ ગુણો.",
    "If the square spills past, move the side the other way.": "ચોરસ બહાર નીકળે તો બાજુ ઊલટી દિશામાં બદલો.",
    "The side of a square is the number that times itself gives its area.": "ચોરસની બાજુ એ સંખ્યા છે જેને તેનાથી જ ગુણતાં ક્ષેત્રફળ મળે.",
    "You learned: a square's side times itself gives its area.": "તમે શીખ્યા: ચોરસની બાજુ × બાજુ = ક્ષેત્રફળ.",
    "A square has an area of 256 square centimetres, so how long is each side?": "એક ચોરસનું ક્ષેત્રફળ 256 ચોરસ સેમી છે, દરેક બાજુ કેટલી લાંબી છે?",
    "Side of the square?": "ચોરસની બાજુ?",
    "Try sides on the dial until the square fills the outline.": "ચોરસ રૂપરેખા ભરે ત્યાં સુધી ડાયલ પર બાજુઓ અજમાવો.",
    "Yes, 16 × 16 = 256, so each side is 16 cm.": "હા, 16×16=256, તેથી દરેક બાજુ 16 સેમી છે.",
    "Another square covers 16 square centimetres; find the length of its side.": "બીજો ચોરસ 16 ચોરસ સેમી રોકે છે, તેની બાજુની લંબાઈ શોધો.",
    "Side?": "બાજુ?",
    "Start small and try a side of 2, then 3.": "નાનાથી શરૂ કરો, પહેલાં 2ની બાજુ, પછી 3ની.",
    "Right, 4 × 4 = 16, so the side is 4 cm.": "સાચું, 4×4=16, તેથી બાજુ 4 સેમી છે.",
    "Find each side of a square plot that covers 225 square metres.": "225 ચોરસ મીના ચોરસ પ્લોટની દરેક બાજુ શોધો.",
    "Side of the plot?": "પ્લોટની બાજુ?",
    "A side is never half the area, so try the dial.": "બાજુ ક્યારેય ક્ષેત્રફળની અડધી નથી હોતી, ડાયલ અજમાવો.",
    "Yes, 15 × 15 = 225, so each side is 15 m.": "હા, 15×15=225, તેથી દરેક બાજુ 15 મી છે.",
    "Tap Fold to fold the 20 cm string into four equal sides.": "20 સેમીની દોરીને 4 સરખી બાજુમાં વાળવા વાળો દબાવો.",
    "Tap the Fold key beside the square.": "ચોરસની બાજુમાં વાળો ચાવી દબાવો.",
    "Now tap Fill to lay rows of squares inside.": "હવે અંદર ચોરસની હાર પાથરવા ભરો દબાવો.",
    "Fill is the key beside the square, where Fold was.": "ભરો ચોરસની બાજુની ચાવી છે, જ્યાં વાળો હતું.",
    "Multiply one side by itself to get the area.": "ક્ષેત્રફળ માટે એક બાજુને તેનાથી જ ગુણો.",
    "Area is one side times the same side again.": "ક્ષેત્રફળ = એક બાજુ × એ જ બાજુ ફરીથી.",
    "From a square's perimeter, find the side first, then the area.": "ચોરસની પરિમિતિથી પહેલાં બાજુ શોધો, પછી ક્ષેત્રફળ.",
    "You learned: from a square's perimeter, find the side, then the area.": "તમે શીખ્યા: પરિમિતિથી પહેલાં બાજુ, પછી ક્ષેત્રફળ.",
    "A square yard has a perimeter of 84 m; what is its area?": "એક ચોરસ આંગણાની પરિમિતિ 84 મી છે, તેનું ક્ષેત્રફળ કેટલું?",
    "Area of the yard?": "આંગણાનું ક્ષેત્રફળ?",
    "Now find the area of the square you folded.": "હવે વાળેલા ચોરસનું ક્ષેત્રફળ શોધો.",
    "Yes, the side is 21 m and 21 × 21 = 441 square metres.": "હા, બાજુ 21 મી છે અને 21×21=441 ચોરસ મી.",
    "A square card has a perimeter of 40 cm; find its area.": "એક ચોરસ કાર્ડની પરિમિતિ 40 સેમી છે, તેનું ક્ષેત્રફળ શોધો.",
    "Area of the card?": "કાર્ડનું ક્ષેત્રફળ?",
    "Four equal sides make the perimeter, so one side is a quarter of it.": "4 સરખી બાજુ પરિમિતિ બનાવે છે, એક બાજુ તેનો ચોથો ભાગ છે.",
    "Right, a side of 10 cm gives 10 × 10 = 100 square centimetres.": "સાચું, 10 સેમીની બાજુથી 10×10=100 ચોરસ સેમી.",
    "A square garden is 48 m all the way round; how much area does it cover?": "એક ચોરસ બગીચો ચારે બાજુ 48 મી છે, તે કેટલું ક્ષેત્રફળ રોકે છે?",
    "Area of the garden?": "બગીચાનું ક્ષેત્રફળ?",
    "Find the side first, then the area of that square.": "પહેલાં બાજુ શોધો, પછી તે ચોરસનું ક્ષેત્રફળ.",
    "Yes, 12 × 12 = 144 square metres.": "હા, 12×12=144 ચોરસ મી.",
    "Tap plus to stack one row of 6 squares on the length.": "લંબાઈ પર 6 ચોરસની 1 હાર મૂકવા પ્લસ દબાવો.",
    "Tap the plus key beside the dial.": "ડાયલ પાસેની પ્લસ ચાવી દબાવો.",
    "Tap plus again to stack a second row on top.": "ઉપર બીજી હાર મૂકવા ફરી પ્લસ દબાવો.",
    "One more tap on plus adds a row.": "પ્લસ એક વાર વધુ દબાવતાં 1 હાર ઉમેરાય છે.",
    "Each row adds one length of squares to the area.": "દરેક હાર ક્ષેત્રફળમાં લંબાઈ જેટલા ચોરસ ઉમેરે છે.",
    "Try a row count, then multiply it by the length.": "હારની સંખ્યા અજમાવો, પછી તેને લંબાઈથી ગુણો.",
    "A missing breadth is the number that times the length gives the area.": "ખૂટતી પહોળાઈ એ સંખ્યા છે જેને લંબાઈથી ગુણતાં ક્ષેત્રફળ મળે.",
    "You learned: missing breadth × length gives the area.": "તમે શીખ્યા: પહોળાઈ × લંબાઈ = ક્ષેત્રફળ.",
    "How wide is a 19 cm long rectangle of 152 square centimetres?": "એક લંબચોરસનું ક્ષેત્રફળ 152 ચોરસ સેમી અને લંબાઈ 19 સેમી છે, તે કેટલો પહોળો છે?",
    "Breadth?": "પહોળાઈ?",
    "Stack rows until the total reaches the Area.": "કુલ ક્ષેત્રફળ સુધી પહોંચે ત્યાં સુધી હાર મૂકો.",
    "Yes, 19 × 8 = 152, so the breadth is 8 cm.": "હા, 19×8=152, તેથી પહોળાઈ 8 સેમી છે.",
    "A rectangle 9 m long covers 27 square metres; find its breadth.": "9 મી લાંબો એક લંબચોરસ 27 ચોરસ મી રોકે છે, તેની પહોળાઈ શોધો.",
    "How wide?": "કેટલો પહોળો?",
    "Do not take the length away from the area.": "ક્ષેત્રફળમાંથી લંબાઈ બાદ ન કરો.",
    "Right, 9 × 3 = 27, so it is 3 m wide.": "સાચું, 9×3=27, તેથી તે 3 મી પહોળો છે.",
    "Find the breadth of a 14 cm long rectangle of 98 square centimetres.": "14 સેમી લાંબા અને 98 ચોરસ સેમી ક્ષેત્રફળવાળા લંબચોરસની પહોળાઈ શોધો.",
    "Missing breadth?": "ખૂટતી પહોળાઈ?",
    "Check your breadth against the rows on the board.": "તમારી પહોળાઈને બોર્ડની હાર સાથે સરખાવો.",
    "Yes, 14 × 7 = 98, so the breadth is 7 cm.": "હા, 14×7=98, તેથી પહોળાઈ 7 સેમી છે.",
    "Tap Cut across to cut this floor into two rectangles.": "આ ફરસને 2 લંબચોરસમાં કાપવા આડું કાપો દબાવો.",
    "Cut across is the first key beside the floor.": "આડું કાપો ફરસની બાજુની પહેલી ચાવી છે.",
    "Now tap Join to slide the two parts back together.": "હવે બંને ભાગ પાછા સરકાવવા જોડો દબાવો.",
    "Join is the key beside the floor.": "જોડો ફરસની બાજુની ચાવી છે.",
    "Length times breadth gives each part's area.": "લંબાઈ × પહોળાઈથી દરેક ભાગનું ક્ષેત્રફળ મળે.",
    "Never multiply the two longest sides.": "બે સૌથી લાંબી બાજુઓને ક્યારેય ન ગુણો.",
    "An L-shape cut into two rectangles has the two areas added.": "L-આકારને 2 લંબચોરસમાં કાપી બંને ક્ષેત્રફળ ઉમેરાય છે.",
    "You learned: cut an L-shape in two rectangles and add the areas.": "તમે શીખ્યા: L-આકારને 2 લંબચોરસમાં કાપો, ક્ષેત્રફળ ઉમેરો.",
    "What is the area of this L-shaped floor?": "આ L-આકારની ફરસનું ક્ષેત્રફળ કેટલું?",
    "Area of the floor?": "ફરસનું ક્ષેત્રફળ?",
    "Find each part's area, then add them.": "દરેક ભાગનું ક્ષેત્રફળ શોધો, પછી ઉમેરો.",
    "Yes, the two parts add up to 108 square metres.": "હા, કુલ 108 ચોરસ મી.",
    "5 equal squares of 9 square centimetres each; what area do they cover?": "9 ચોરસ સેમીના 5 સરખા ચોરસ મૂકો, તે મળીને કેટલું ક્ષેત્રફળ રોકે છે?",
    "Area of 5 squares?": "5 ચોરસનું ક્ષેત્રફળ?",
    "Count five lots of 9.": "9ના 5 જૂથ ગણો.",
    "Each square adds 9 square centimetres to the area.": "દરેક ચોરસ ક્ષેત્રફળમાં 9 ચોરસ સેમી ઉમેરે છે.",
    "Multiply the number of squares by one square's area.": "ચોરસની સંખ્યાને એક ચોરસના ક્ષેત્રફળથી ગુણો.",
    "Right, 5 × 9 = 45 square centimetres.": "સાચું, 5×9=45 ચોરસ સેમી.",
    "What area does this L-shaped patch cover?": "આ L-આકારનો જમીનનો ટુકડો કેટલું ક્ષેત્રફળ રોકે છે?",
    "Area of the patch?": "ટુકડાનું ક્ષેત્રફળ?",
    "Part of the big rectangle is not part of the patch.": "મોટા લંબચોરસનો એક ભાગ ટુકડામાં નથી.",
    "Yes, the patch covers 98 square metres.": "હા, ટુકડો 98 ચોરસ મી રોકે છે.",
    "Tap plus to try a side.": "બાજુ અજમાવવા પ્લસ દબાવો.",
    "Tap plus to stack a row.": "હાર મૂકવા પ્લસ દબાવો.",
    "Tap Fold first.": "પહેલાં વાળો દબાવો.",
    "Cut the floor first.": "પહેલાં ફરસ કાપો.",
    "Lay the squares with plus.": "પ્લસથી ચોરસ મૂકો.",
    "Free play. Cut the floor across or down, and add the two areas.": "મુક્ત રમત. ફરસને આડું કે ઊભું કાપો અને બંને ક્ષેત્રફળ ઉમેરો.",
    "Free play.": "મુક્ત રમત.",
    "Cut the floor across or down, and add the two areas.": "ફરસને આડું કે ઊભું કાપો અને બંને ક્ષેત્રફળ ઉમેરો.",
    "Boundary": "સીમા",
    "Row": "હાર",
    "Can you find a square's side when you know only its area?": "શું ફક્ત ક્ષેત્રફળથી ચોરસની બાજુ શોધી શકો?",
    "A target, and a shape to find.": "એક લક્ષ્ય, અને શોધવા એક આકૃતિ.",
    "You worked back to a side and put areas together.": "તમે ઊલટું ચાલીને બાજુ શોધી અને ક્ષેત્રફળ જોડ્યાં.",
    "Area": "ક્ષેત્રફળ",
    "Perimeter": "પરિમિતિ",
    "One square": "એક ચોરસ",
    "Side": "બાજુ",
    "Breadth": "પહોળાઈ",
    "Squares": "ચોરસ",
    "Fold": "વાળો",
    "Fill": "ભરો",
    "Cut across": "આડું કાપો",
    "Cut down": "ઊભું કાપો",
    "Join": "જોડો",
    "Not floor": "ફરસ નથી",
    "Cut the patch first.": "પહેલાં ટુકડો કાપો.",
    "Not patch": "ટુકડો નથી",
    "cm": "સેમી",
    "m": "મી",
    "sq. cm": "ચોરસ સેમી",
    "sq. m": "ચોરસ મી",
  },
};

const PHASES = [
  {
    n: 1,
    concept: "A side from an area",
    conceptId: "M2.S3.T6.C25", objectiveIds: ["O9"],
    says: ["What number times itself fills the target?"],
    /* warm-up: a 36 sq. cm target, the try starts at 4 (5 short, 6 fits, 7 spills); 6 is none of the phase's answers */
    steps: [
      { say: "Tap plus to try a square with a side one longer.", on: "plus", hint: "Find the key with a plus sign." },
      { say: "Tap plus again and see if the square fills the outline.", on: "plus", hint: "Plus is the key on the right of the number." },
      { say: "Tap plus once more and look at the outline.", on: "plus", hint: "Use plus again, not minus." },
    ],
    ladder: ["Try a side, then multiply it by itself.", "If the square spills past, move the side the other way."],
    closing: "The side of a square is the number that times itself gives its area.",
    learned: "You learned: a square's side times itself gives its area.",
    traceback: "the child's side is drawn as a try square against the target outline, then the try that fills it exactly, side x side = area, the side in green",
    items: [
      /* learn WB1: answer in the plan = 16 cm */
      { qid: "M2.S3.T6.C25:WB1", kind: "square", area: 256, unit: "cm", start: 10, answer: 16,
        say: "A square has an area of 256 square centimetres, so how long is each side?", ask: "Side of the square?",
        miss: "Try sides on the dial until the square fills the outline.",
        win: "Yes, 16 × 16 = 256, so each side is 16 cm." },
      /* practice 1: answer in the plan = 4 cm, because 4 x 4 = 16 */
      { qid: "M2.S3.T6.C25:1", kind: "square", area: 16, unit: "cm", start: 1, answer: 4,
        say: "Another square covers 16 square centimetres; find the length of its side.", ask: "Side?",
        miss: "Start small and try a side of 2, then 3.",
        win: "Right, 4 × 4 = 16, so the side is 4 cm." },
      /* practice 4: answer in the plan = 15 m, because 15 x 15 = 225 */
      { qid: "M2.S3.T6.C25:4", kind: "square", area: 225, unit: "m", start: 10, answer: 15,
        say: "Find each side of a square plot that covers 225 square metres.", ask: "Side of the plot?",
        miss: "A side is never half the area, so try the dial.",
        win: "Yes, 15 × 15 = 225, so each side is 15 m." },
    ],
  },
  {
    n: 2,
    concept: "From perimeter to area",
    conceptId: "M2.S3.T6.C26", objectiveIds: ["O9"],
    says: ["Side first. Then the area."],
    /* warm-up: a 20 cm string (side 5, area 25; none of the phase's answers) */
    steps: [
      { say: "Tap Fold to fold the 20 cm string into four equal sides.", on: "fold", hint: "Tap the Fold key beside the square." },
      { say: "Now tap Fill to lay rows of squares inside.", on: "fill", hint: "Fill is the key beside the square, where Fold was." },
    ],
    ladder: ["Multiply one side by itself to get the area.", "Area is one side times the same side again."],
    closing: "From a square's perimeter, find the side first, then the area.",
    learned: "You learned: from a square's perimeter, find the side, then the area.",
    traceback: "the string folds into four equal sides, the square fills with rows, side x side = area in green",
    items: [
      /* learn WB2: answer in the plan = 441 sq. m */
      { qid: "M2.S3.T6.C26:WB2", kind: "fold", per: 84, unit: "m", answer: 441,
        say: "A square yard has a perimeter of 84 m; what is its area?", ask: "Area of the yard?",
        miss: "Now find the area of the square you folded.",
        win: "Yes, the side is 21 m and 21 × 21 = 441 square metres." },
      /* practice 5: answer in the plan = 4 x 10 = 40, so each side is 10 cm; 10 x 10 = 100 sq. cm */
      { qid: "M2.S3.T6.C26:5", kind: "fold", per: 40, unit: "cm", answer: 100,
        say: "A square card has a perimeter of 40 cm; find its area.", ask: "Area of the card?",
        miss: "Four equal sides make the perimeter, so one side is a quarter of it.",
        win: "Right, a side of 10 cm gives 10 × 10 = 100 square centimetres." },
      /* AUTHORED (qid null): the plan has only two perimeter questions for this concept; a phase needs three. 48 m -> 12 m -> 144 sq. m */
      { qid: null, kind: "fold", per: 48, unit: "m", answer: 144,
        say: "A square garden is 48 m all the way round; how much area does it cover?", ask: "Area of the garden?",
        miss: "Find the side first, then the area of that square.",
        win: "Yes, 12 × 12 = 144 square metres." },
    ],
  },
  {
    n: 3,
    concept: "A missing breadth",
    conceptId: "M2.S3.T6.C27", objectiveIds: ["O10"],
    says: ["What times the length gives the area?"],
    /* warm-up: length 6 cm, area 24 sq. cm (breadth 4; none of the phase's answers) */
    steps: [
      { say: "Tap plus to stack one row of 6 squares on the length.", on: "plus", hint: "Tap the plus key beside the dial." },
      { say: "Tap plus again to stack a second row on top.", on: "plus", hint: "One more tap on plus adds a row." },
    ],
    ladder: ["Each row adds one length of squares to the area.", "Try a row count, then multiply it by the length."],
    closing: "A missing breadth is the number that times the length gives the area.",
    learned: "You learned: missing breadth × length gives the area.",
    traceback: "rows are stacked on the length from the child's breadth to the right one, length x breadth = area, the breadth in green",
    items: [
      /* learn WB3: answer in the plan = 8 cm */
      { qid: "M2.S3.T6.C27:WB3", kind: "rows", len: 19, area: 152, unit: "cm", answer: 8,
        say: "How wide is a 19 cm long rectangle of 152 square centimetres?", ask: "Breadth?",
        miss: "Stack rows until the total reaches the Area.",
        win: "Yes, 19 × 8 = 152, so the breadth is 8 cm." },
      /* practice 2: answer in the plan = 9 x 3 = 27, so the breadth is 3 m */
      { qid: "M2.S3.T6.C27:2", kind: "rows", len: 9, area: 27, unit: "m", answer: 3,
        say: "A rectangle 9 m long covers 27 square metres; find its breadth.", ask: "How wide?",
        miss: "Do not take the length away from the area.",
        win: "Right, 9 × 3 = 27, so it is 3 m wide." },
      /* practice 6: answer in the plan = 14 x 7 = 98, so the breadth is 7 cm */
      { qid: "M2.S3.T6.C27:6", kind: "rows", len: 14, area: 98, unit: "cm", answer: 7,
        say: "Find the breadth of a 14 cm long rectangle of 98 square centimetres.", ask: "Missing breadth?",
        miss: "Check your breadth against the rows on the board.",
        win: "Yes, 14 × 7 = 98, so the breadth is 7 cm." },
    ],
  },
  {
    n: 4,
    concept: "Split and add",
    conceptId: "M2.S3.T6.C28", objectiveIds: ["O10"],
    says: ["Cut it into two rectangles. Find each one, then add."],
    /* warm-up: an L of 6 m by 2 m under 3 m by 2 m (18 sq. m; none of the phase's answers) */
    steps: [
      { say: "Tap Cut across to cut this floor into two rectangles.", on: "cut-across", hint: "Cut across is the first key beside the floor." },
      { say: "Now tap Join to slide the two parts back together.", on: "join", hint: "Join is the key beside the floor." },
    ],
    ladder: ["Length times breadth gives each part's area.", "Never multiply the two longest sides."],
    closing: "An L-shape cut into two rectangles has the two areas added.",
    learned: "You learned: cut an L-shape in two rectangles and add the areas.",
    traceback: "the L is cut across into two rectangles that slide apart with their areas, then slide back with the sum in green (equal squares: count x one square)",
    items: [
      /* learn WB4: answer in the plan = 108 sq. m (14 m by 6 m and 8 m by 3 m) */
      { qid: "M2.S3.T6.C28:WB4", kind: "lshape", W: 14, Hb: 6, w: 8, h: 3, unit: "m", answer: 108,
        say: "What is the area of this L-shaped floor?", ask: "Area of the floor?",
        miss: "Find each part's area, then add them.",
        win: "Yes, the two parts add up to 108 square metres." },
      /* practice 3: answer in the plan = 5 x 9 = 45, so 45 sq. cm */
      { qid: "M2.S3.T6.C28:3", kind: "copies", count: 5, each: 9, unit: "cm", answer: 45,
        say: "5 equal squares of 9 square centimetres each; what area do they cover?", ask: "Area of 5 squares?",
        miss: "Count five lots of 9.",
        ladder: ["Each square adds 9 square centimetres to the area.", "Multiply the number of squares by one square's area."],
        win: "Right, 5 × 9 = 45 square centimetres." },
      /* practice 7: answer in the plan = 16 x 5 = 80, 9 x 2 = 18, 80 + 18 = 98 sq. m */
      { qid: "M2.S3.T6.C28:7", kind: "lshape", W: 16, Hb: 5, w: 9, h: 2, unit: "m", thing: "patch", answer: 98,
        say: "What area does this L-shaped patch cover?", ask: "Area of the patch?",
        miss: "Part of the big rectangle is not part of the patch.",
        win: "Yes, the patch covers 98 square metres." },
      /* UNUSED: practice 8 (M2.S3.T6.C28:8, 12 equal squares of 9 sq. cm = 108 sq. cm): a phase holds three, and its answer
         repeats question 1's 108 */
    ],
  },
];

/* The numbers each phase's warm-up works (the guide steps), and the free-play floor. */
const MODEL: any = {
  warm: {
    1: { kind: "square", area: 36, unit: "cm", start: 4 },
    2: { kind: "fold", per: 20, unit: "cm" },
    3: { kind: "rows", len: 6, area: 24, unit: "cm" },
    4: { kind: "lshape", W: 6, Hb: 2, w: 3, h: 2, unit: "m" },
  },
  free: { kind: "lshape", W: 14, Hb: 6, w: 8, h: 3, unit: "m" },
  unused: ["M2.S3.T6.C28:8"],
  /* the act that unlocks the answer, per question (PATTERNS §19); none ungated */
  answerGate: {
    note: "The Answer key and the pad stay disabled in user mode, after a real tap, until the act is done; a correction that has run counts as the act.",
    acts: { square: "one try on the Try dial (plus or minus)", rows: "one try on the Breadth dial (plus or minus)", fold: "Fold", lshape: "a cut (Cut across or Cut down)", copies: "reach 5 squares on the Copies dial" },
    ungated: [],
  },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: a second route to every answer, by counting (no square roots, no division) */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  let r = -1;
  if (it.kind === "square") { for (let s = 1; s <= it.area; s++) if (s * s === it.area) { r = s; break; } }
  if (it.kind === "fold") { let side = 0, left = it.per; while (left > 0) { left -= 4; side++; } r = 0; for (let k = 0; k < side; k++) r += side; }
  if (it.kind === "rows") { let b = 0, tot = 0; while (tot < it.area) { tot += it.len; b++; } r = tot === it.area ? b : -1; }
  if (it.kind === "lshape") { r = 0; const Ht = it.h + it.Hb; for (let x = 0; x < it.W; x++) for (let y = 0; y < Ht; y++) if (y >= it.h || x < it.w) r++; }
  if (it.kind === "copies") { r = 0; for (let k = 0; k < it.count; k++) r += it.each; }
  return r === it.answer;
}));
/* the misconception of each kind: half the area, the perimeter times itself, area take away length, the two longest sides
   multiplied, the count added to one square's area */
const nearMiss = (item: any) => (item.kind === "square" ? Math.floor(item.area / 2)
  : item.kind === "fold" ? item.per * item.per
  : item.kind === "rows" ? item.area - item.len
  : item.kind === "lshape" ? item.W * (item.h + item.Hb)
  : item.kind === "copies" ? item.count + item.each
  : item.answer + 1);
const answerForms = (item: any) => (item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
  : [String(item.answer)]);
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check(): performs the question's act at once (one try, the fold, a cut, the squares laid), then Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── colours, boxes and geometry (one function per figure, used by the drawing AND the acts) ─────────────────── */
const WB_GIVEN = CONTENT.hundred;   /* the lengths the question gives: deep blue */
const WB_ANS = CONTENT.one;         /* the answer reached: green */
const WB_BOUND = CONTENT.pointer;   /* the boundary string: vermilion */
const WB_UNIT = "#6A4FC4";          /* a counted unit square or row: violet (hue about 254) */
const WB_NOW = CONTENT.ten;         /* what spills past, the side worked on now: amber */
const WB_INK = "#2B2B2B";
const WB_WARM = "#FFF8EC";
const wbInk = (c: string) => shade(c, 0.25);
/* the layout is fixed inside x 0..900 (the room the open bigPad leaves), so nothing moves when the pad opens */
const WB_PB = { x: 16, y: 8, w: 540, h: 504 };      /* the square and the copies: picture box */
const WB_RC = { x: 572, w: 316 };                   /* their right column: card, dial, lines */
const WB_FRC = { x: 698, w: 194 };                  /* the fold's right column: card, Fold/Fill, lines */
const WB_LKC = { x: 648, w: 244 };                  /* the L's key column: Cut keys, Join, the sum */
const WB_LABEL: any = { minus: "−", plus: "+", fold: "Fold", fill: "Fill", "cut-across": "Cut across", "cut-down": "Cut down", join: "Join" };
const WB_SKIN_MAX = 40;   /* the main session: tile skins only on a screen of 40 cells or fewer, else every cell plain */
/* a real press on one of this tool's keys in this page: the child is at the board (user mode), so the answer gate may lock */
let WB_TOUCHED = false;
let WB_ENTER_AT = 0;
/* AI mode (the host's operatorMode, or a phase mount without navigable dots, as the runtime decides it): never gated */
let WB_AI = false;
/* an estimate of a string's width at a size (Devanagari and Gujarati a little wider) */
const wbW = (s: string, size: number) => String(s).length * size * (/[\u0900-\u097f]/.test(String(s)) ? 0.58 : /[\u0a80-\u0aff]/.test(String(s)) ? 0.47 : 0.5);

const wbSq = (F: any) => {
  const A = Math.round(Math.sqrt(F.area)), room = Math.min(WB_PB.w - 40, WB_PB.h - 72);
  const u = Math.min(Math.floor(385 / A), Math.floor(room / (A + 1))), M = Math.max(A + 1, Math.min(A + 2, Math.floor(room / u)));
  return { A, M, u, ox: WB_PB.x + 20, oy: WB_PB.y + 4 };
};
const wbRows = (F: any) => {
  const L = F.len, b = F.area / F.len, maxR = b + 1, ox = 150, baseY = 448;
  const u = Math.floor(Math.min((900 - ox - 40) / L, (baseY - 172) / maxR));
  return { L, b, maxR, u, ox, baseY };
};
const wbFold = (F: any) => {
  const s = F.per / 4, Q = 372, u = Q / s, ox = 140, oy = 72;
  return { s, Q, u, ox, oy, corners: [{ x: ox, y: oy }, { x: ox + Q, y: oy }, { x: ox + Q, y: oy + Q }, { x: ox, y: oy + Q }] };
};
const wbL = (F: any) => {
  const W = F.W, Hb = F.Hb, w = F.w, h = F.h, Ht = h + Hb, gap = 60;
  const u = Math.floor(Math.min(400 / W, 330 / Ht));
  const ox = 112 + (400 - W * u) / 2, oy = 84 + (330 - Ht * u) / 2;
  const parts = (dir: string) => (dir === "across"
    ? [{ x: 0, y: 0, w, h, dx: 0, dy: -gap / 2 }, { x: 0, y: h, w: W, h: Hb, dx: 0, dy: gap / 2 }]
    : [{ x: 0, y: 0, w, h: Ht, dx: -gap / 2, dy: 0 }, { x: w, y: h, w: W - w, h: Hb, dx: gap / 2, dy: 0 }]);
  const line = (dir: string) => (dir === "across" ? [ox, oy + h * u, ox + w * u, oy + h * u] : [ox + w * u, oy + h * u, ox + w * u, oy + Ht * u]);
  return { W, Hb, w, h, Ht, u, ox, oy, parts, line };
};
const wbCopies = (F: any) => {
  const q = Math.floor(Math.min((WB_PB.w - 2 * 18) / 3, (WB_PB.h - 2 * 18) / 3));
  const at = (i: number) => ({ x: WB_PB.x + (i % 3) * (q + 18), y: WB_PB.y + Math.floor(i / 3) * (q + 18) });
  return { q, at, side: Math.round(Math.sqrt(F.each)) };
};
/* the correction, as demo states: it ends on the whole right answer, on a layer the child's next press clears */
const wbTrace = (F: any, v: any) => {
  const x = leadNumber(v), num = typeof x === "number" && isFinite(x) ? x : 0;
  if (F.kind === "square") { const g = wbSq(F), c = Math.max(1, Math.min(g.M, Math.round(num))); return [[1100, { side: c, nosum: c !== Math.round(num) }], [0, { side: F.answer, fin: true, nosum: false }]]; }
  if (F.kind === "fold") { const s = F.per / 4; return [[900, { folded: true, pinch: 4, filled: 0 }], [900, { folded: true, pinch: 4, filled: s }], [0, { folded: true, pinch: 4, filled: s, fin: true }]]; }
  if (F.kind === "rows") { const g = wbRows(F); return [[1100, { rows: Math.max(0, Math.min(g.maxR, Math.round(num))) }], [0, { rows: F.answer, fin: true }]]; }
  if (F.kind === "lshape") {
    const pre = num === F.W * (F.h + F.Hb) ? [[1500, { box: true, cut: null, apart: false }]] : [];
    return pre.concat([[1300, { box: false, cut: "across", apart: true, areas: true, dash: 4 }], [0, { box: false, cut: "across", apart: false, areas: true, dash: 4, fin: true }]]);
  }
  if (F.kind === "copies") return [[900, { copies: F.count }], [0, { copies: F.count, fin: true }]];
  return [];
};
const wbUnit = (u: string, lang: string, tx: any) => tx(u);
/* a halo for text over lines or colour */
const WB_HALO: any = { stroke: "#FFFFFF", strokeWidth: 7, paintOrder: "stroke", strokeLinejoin: "round" };

/* ── the working area: 64,108, 1472 x 520 shut, 900 x 520 open (bigPad); everything stays in x 0..900, at one size ── */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const warm = !free && (stage === "demo" || stage === "teach") && !!(phase && phase.steps);
  const F: any = free ? MODEL.free : warm ? MODEL.warm[n] : item;
  const kind = F.kind;
  const dv = lang === "hi" ? 8 : 0;   /* Devanagari matras rise above the line: a label under an outline sits lower */
  /* the board is keyed to the ENTRY (PATTERNS §18): a new question, the warm-up or free play starts fresh */
  const qk = free ? "free" : warm ? n + "w" : n + ":" + index;
  const ent = useRef({ qk: "", e: 0 });
  if (ent.current.qk !== qk) ent.current = { qk, e: ent.current.e + 1 };
  const entry = ent.current.e;
  const fresh = () => ({ e: entry, side: F.start || 1, tries: 0, pinch: 0, folded: false, filled: 0, rows: 0, cutting: null, dash: 0,
    cut: null, apart: false, cuts: 0, last: null, joined: null, joinFade: false, copies: 1, reached: false, demo: null, traced: false });
  const [raw, setRaw] = useState<any>(fresh);
  const S: any = raw.e === entry ? raw : fresh();
  const put = (o: any) => setRaw((p: any) => { const b = p.e === entry ? p : fresh(); return { ...b, ...(typeof o === "function" ? o(b) : o) }; });
  const [busy, setBusy] = useState(false);
  const [trace, setTrace] = useState(false);
  const [tick, setTick] = useState(0);
  const playing = useRef(false), tracing = useRef(false), gated = useRef(false), lastAt = useRef(0);

  const solved = !free && (stage === "win" || stage === "idle");
  const sol = (): any => (kind === "square" ? { side: F.answer, fin: true }
    : kind === "fold" ? { folded: true, pinch: 4, filled: F.per / 4, fin: true }
    : kind === "rows" ? { rows: F.answer, fin: true }
    : kind === "lshape" ? { cut: S.last || "across", apart: false, areas: true, dash: 4, box: false, fin: true }
    : kind === "copies" ? { copies: F.count, fin: true } : {});
  const D: any = solved ? { ...S, ...sol() } : S.demo ? { ...S, ...S.demo } : S;
  /* a correction that has run counts as the act, so a wrong answer typed before the act never leaves the pad locked */
  const actDone = S.traced || (kind === "square" || kind === "rows" ? S.tries > 0 : kind === "fold" ? S.folded : kind === "lshape" ? S.cuts > 0 : kind === "copies" ? S.reached : true);

  /* ── the acts ── */
  const touch = () => { if (!WB_TOUCHED) { WB_TOUCHED = true; setTick((t) => t + 1); } };
  const runAct = (o: any, done: (ok: boolean) => void) => {
    if (playing.current) return;
    playing.current = true; setBusy(true);
    Promise.resolve(api.act(o)).then((ok: any) => { playing.current = false; setBusy(false); lastAt.current = Date.now(); done(!!ok); });
  };
  const act = (on: string, real?: boolean) => {
    if (real) touch();
    if (playing.current || tracing.current || solved) return;
    const dial = on === "minus" || on === "plus";
    /* a double tap does one act: a second press just after an act ended (or a guide step moved on) is ignored */
    if (real && (!dial || warm) && Date.now() - lastAt.current < 450) return;
    if (dial) {
      const d = on === "plus" ? 1 : -1;
      /* only a press that MOVES the dial counts as a try */
      if (kind === "square") { const g = wbSq(F); put((b: any) => { const from = b.demo && b.demo.side ? b.demo.side : b.side, to = Math.max(1, Math.min(g.M, from + d)); return to === from ? { demo: null } : { side: to, tries: b.tries + 1, demo: null }; }); }
      else if (kind === "rows") { const g = wbRows(F); put((b: any) => { const from = b.demo && b.demo.rows != null ? b.demo.rows : b.rows, to = Math.max(0, Math.min(g.maxR, from + d)); return to === from ? { demo: null } : { rows: to, tries: b.tries + 1, demo: null }; }); }
      else if (kind === "copies") put((b: any) => { const c = Math.max(1, Math.min(8, (b.demo && b.demo.copies ? b.demo.copies : b.copies) + d)); return { copies: c, reached: b.reached || c === F.count, demo: null }; });
      if (warm) lastAt.current = Date.now();
      api.sfx.tick(); api.did(on); return;
    }
    if (on === "fold") {
      if (S.folded) { api.did("fold"); return; }
      const g = wbFold(F);
      put({ demo: null, pinch: 0 });
      runAct({ tool: "hand", moves: "tap", ms: 800, at: g.corners, onPoint: (i: number) => put({ pinch: i + 1 }) },
        (ok) => { if (!ok) { put({ pinch: 0 }); return; } put({ folded: true, pinch: 4 }); api.sfx.settle(); api.did("fold"); });
      return;
    }
    if (on === "fill") {
      const g = wbFold(F);
      if (!S.folded || S.filled >= g.s) { api.did("fill"); return; }
      const pts = [0, 1, 2, 3, 4].map((k) => ({ x: g.ox + g.Q / 2, y: g.oy + ((k + 0.5) / 5) * g.Q }));
      put({ demo: null });
      runAct({ tool: "hand", moves: "sweep", ms: 800, at: pts, onPoint: (i: number) => put({ filled: Math.ceil(((i + 1) * g.s) / pts.length) }) },
        (ok) => { if (!ok) return; put({ filled: g.s }); api.sfx.settle(); api.did("fill"); });
      return;
    }
    if (on === "cut-across" || on === "cut-down") {
      const dir = on === "cut-across" ? "across" : "down";
      if (S.cut || kind !== "lshape") { api.did(on); return; }
      const g = wbL(F), [x1, y1, x2, y2] = g.line(dir);
      const pts = [0.12, 0.38, 0.62, 0.88].map((t) => ({ x: x1 + (x2 - x1) * t, y: y1 + (y2 - y1) * t }));
      put({ demo: null, cutting: dir, dash: 0, joined: null, joinFade: false });
      runAct({ tool: "scissors", moves: "snip", ms: 800, at: pts, onPoint: (i: number) => put({ dash: i + 1 }) },
        (ok) => {
          if (!ok) { put({ cutting: null, dash: 0 }); return; }
          put((b: any) => ({ cut: dir, apart: true, cuts: b.cuts + 1, last: dir, cutting: null, dash: 4 }));
          api.did(on);
        });
      return;
    }
    if (on === "join") {
      if (!S.cut || !S.apart) { api.did("join"); return; }
      const g = wbL(F), P = g.parts(S.cut)[1];
      const home = { x: g.ox + (P.x + P.w / 2) * g.u, y: g.oy + (P.y + P.h / 2) * g.u };
      put({ demo: null });
      runAct({ tool: "hand", moves: "push", ms: 800, from: { x: home.x + P.dx, y: home.y + P.dy }, at: [home] },
        (ok) => { if (!ok) return; put({ apart: false, cut: null, joined: S.cut, joinFade: false, dash: 0 }); api.sfx.settle(); api.did("join"); });
    }
  };
  /* the Delight: after Join the cut line fades away */
  useEffect(() => { if (!S.joined || S.joinFade) return; const t = setTimeout(() => put({ joinFade: true }), 700); return () => clearTimeout(t); }, [S.joined, entry]);
  /* Enter, the agent's check() in a step and the dev solve() perform the CURRENT step */
  /* a real Enter on a guide step (a trusted key event just now, in user mode) is the child at the board: it counts as a touch */
  api.onEnter(stage === "demo" && stepOn ? () => act(stepOn, !WB_AI && Date.now() - WB_ENTER_AT < 400) : null);
  HOOK.demo = () => { if (stepOn) act(stepOn); };
  /* the agent's act at an open question: done at once, never gated */
  HOOK.check = stage === "ask" && !free ? () => {
    if (actDone) return undefined;
    if (kind === "square") { const g = wbSq(F); put((b: any) => ({ side: Math.min(g.M, b.side + 1), tries: b.tries + 1 })); }
    if (kind === "rows") put((b: any) => ({ rows: b.rows + 1, tries: b.tries + 1 }));
    if (kind === "fold") put({ folded: true, pinch: 4 });
    if (kind === "lshape") put({ cut: "across", apart: true, cuts: 1, last: "across", dash: 4 });
    if (kind === "copies") put({ copies: F.count, reached: true });
    return undefined;
  } : null;

  /* ── the answer is gated by the act (PATTERNS §19): user mode only, locked after a real press while this question's act waits ── */
  const need = !WB_AI && stage === "ask" && !free && !actDone && WB_TOUCHED;
  useEffect(() => {
    if (need && !tracing.current) { gated.current = true; api.lock(true); }   /* every entry: the runtime unlocks at a question change */
    else if (!need && gated.current) { gated.current = false; api.lock(false); }
  }, [need, entry, tick]);
  useEffect(() => () => { if (gated.current) { gated.current = false; api.lock(false); } }, []);
  useEffect(() => {
    const k = (e: any) => { if (e.key === "Enter" && e.isTrusted) WB_ENTER_AT = Date.now(); };
    window.addEventListener("keydown", k, true);
    return () => window.removeEventListener("keydown", k, true);
  }, []);
  /* the gate's nudge (PATTERNS §19): a tap on the locked Answer key, a typed digit or Enter says the act, number-free (never while
     the act is running); the act, or the Hint key, brings the question back (PATTERNS §18) */
  const nudged = useRef(false);
  const nudge = () => {
    if (playing.current) return;
    nudged.current = true;
    if (kind === "square") api.say("Tap plus to try a side.");
    else if (kind === "rows") api.say("Tap plus to stack a row.");
    else if (kind === "fold") api.say("Tap Fold first.");
    else if (kind === "lshape" && F.thing === "patch") api.say("Cut the patch first.");
    else if (kind === "lshape") api.say("Cut the floor first.");
    else if (kind === "copies") api.say("Lay the squares with plus.");
  };
  useEffect(() => {
    if (!need) return;
    const down = (e: any) => {
      const el = e.target && e.target.closest ? e.target.closest("[data-control]") : null;
      const id = el ? el.getAttribute("data-control") : "";
      if (id === "again" && nudged.current) { nudged.current = false; setTimeout(() => api.say(item.say), 80); return; }
      if (id === "answer-open" || /^key-/.test(id || "")) nudge();
    };
    const key = (e: any) => { if (/^[0-9]$/.test(e.key) || e.key === "Enter") nudge(); };
    window.addEventListener("pointerdown", down, true); window.addEventListener("keydown", key, true);
    return () => { window.removeEventListener("pointerdown", down, true); window.removeEventListener("keydown", key, true); };
  }, [need, entry]);
  useEffect(() => { if (stage === "ask" && actDone && nudged.current) { nudged.current = false; api.say(item.say); } }, [actDone]);
  useEffect(() => { nudged.current = false; }, [entry]);

  /* ── the traceback: demo states on their own layer, ending on the whole right answer ── */
  useEffect(() => {
    if (!wrong || wrong.tries < 3 || stage !== "ask" || free) return;   /* misses 1 and 2: the bubble clue only (owner, 2026-11-18) */
    const steps: any[] = wbTrace(F, wrong.value);
    tracing.current = true; setTrace(true); api.lock(true); put({ traced: true });
    tl.run(steps.map(([ms, d]: any) => [ms, () => put({ demo: d })]), () => { tracing.current = false; setTrace(false); api.lock(false); });
  }, [wrong]);
  useEffect(() => () => { tl.stop(); if (tracing.current) { tracing.current = false; setTrace(false); api.lock(false); } }, [entry]);

  /* the win line (a phase's last one gives way to its closing, keyOnly) */
  useEffect(() => { if (stage === "win" && !free && item && item.win) api.say(item.win); }, [stage, entry]);

  api.share({
    target: kind === "square" || kind === "rows" ? F.area : kind === "fold" ? F.per : null,
    tries: S.tries, side: kind === "square" ? S.side : null, folded: S.folded, breadth: kind === "rows" ? S.rows : null,
    cut: S.cut, split: !!S.cut, copies: kind === "copies" ? S.copies : null, complete: stage === "idle",
  });

  /* ── drawing helpers (called, never mounted) ── */
  const off = busy || trace || solved;
  const lenU = tx(F.unit), areaU = tx("sq. " + F.unit);
  const txt = (x: number, y: number, s: any, o: any = {}) => (
    <text x={x} y={y} textAnchor={o.anchor || "middle"} fontSize={o.size || T.prompt} fontWeight={o.weight || 700} fill={o.fill || WB_INK} {...(o.halo ? WB_HALO : {})} style={lang !== "en" && /वर्ग|ચોરસ/.test(String(s)) ? ({ wordSpacing: lang === "hi" ? "8px" : "4px" } as any) : undefined}>{s}</text>
  );
  /* a grid of unit cells: every box its own dark outline; a counted box a deeper violet fill; tile skins only when few cells */
  const cellsOf = (list: any[], u: number, skin: boolean, keyp: string) => list.map((c: any, i: number) => (
    <g key={keyp + i}>
      <rect x={c.x} y={c.y} width={u} height={u} fill={c.fill ? tint(c.fill, 0.26) : WB_WARM} />
      {skin && c.fill && <Skin name="tile" x={c.x} y={c.y} w={u} h={u} fit="stretch" />}
      {skin && c.fill && <rect x={c.x} y={c.y} width={u} height={u} fill={c.fill} fillOpacity={0.84} />}
      <rect x={c.x} y={c.y} width={u} height={u} fill="none" stroke={WB_INK} strokeWidth={2.4} />
    </g>
  ));
  /* the Given card: a 40 title and the value (number big, unit beside it) */
  const card = (x: number, w: number, title: string, num: any, unit: string) => {
    /* the value line must leave 12 clear each side in the longest language: bold digits ~0.62 em, bold letters ~1.2x the plain estimate */
    const ns = T.display, nw = String(num).length * 0.62 * ns, uwOf = (z: number) => wbW(unit, z) * 1.2;
    const us = nw + 12 + uwOf(T.prompt) <= w - 24 ? T.prompt : 36, tot = nw + 12 + uwOf(us);
    const sc = tot > w - 24 ? (w - 24) / tot : 1;
    return (
      <g pointerEvents="none" filter="url(#wb-shadow)">
        <rect x={x} y={0} width={w} height={136} rx={18} fill="url(#wb-grad-card)" stroke={WB_GIVEN} strokeWidth={3} />
        {txt(x + w / 2, 44, tx(title), { size: T.prompt, fill: wbInk(WB_GIVEN), weight: 600 })}
        <text x={x + w / 2} y={118} textAnchor="middle" fontSize={ns * sc} fontWeight={700} fill={wbInk(WB_GIVEN)}>{String(num)}
          <tspan dx={12 * sc} fontSize={us * sc} style={lang !== "en" ? ({ wordSpacing: lang === "hi" ? "8px" : "4px" } as any) : undefined}>{unit}</tspan></text>
      </g>
    );
  };
  const line = (x: number, y: number, s: string, fin?: boolean, size?: number) => txt(x, y, s, { size: size || T.prompt, fill: fin ? wbInk(WB_ANS) : WB_INK, weight: 700, halo: true });
  /* "a × b" over "= c unit": the unit stays on the result line when it fits, else (and always in Hindi) on its own line, Devanagari pitch */
  const sum = (x: number, w: number, y: number, a: string, c: any, fin: boolean, unitOn: boolean, pitch = 52) => {
    const res = "= " + c, joined = res + " " + areaU;
    const own = unitOn && (lang === "hi" || wbW(joined, T.prompt) > w - 12);
    return (
      <g>
        {line(x, y, a, fin)}
        {line(x, y + pitch, unitOn && !own ? joined : res, fin)}
        {own && line(x, y + pitch + (lang === "hi" ? 60 : pitch), areaU, fin)}
      </g>
    );
  };

  const dialKind = kind === "square" || kind === "rows" || kind === "copies";
  const dialVal = kind === "square" ? D.side : kind === "rows" ? D.rows : D.copies;
  const dialCap = kind === "square" ? tx("Side") + ", " + lenU : kind === "rows" ? tx("Breadth") + ", " + lenU : tx("Squares");

  const drawSquare = () => {
    const g = wbSq(F), s = D.side, A = g.A, u = g.u, ox = g.ox, oy = g.oy;
    const list: any[] = [];
    for (let r = 0; r < s; r++) for (let c = 0; c < s; c++) list.push({ x: ox + c * u, y: oy + r * u, fill: r < A && c < A ? WB_UNIT : WB_NOW });
    const rx0 = ox + Math.max(s, A) * u + 16, rowLbl = rx0 + wbW(tx("Row"), T.label) <= WB_RC.x - 12;
    return (
      <g pointerEvents="none">
        <rect x={ox + 4} y={oy + 4} width={A * u} height={A * u} fill="#000000" fillOpacity={0.05} />
        <rect x={ox} y={oy} width={A * u} height={A * u} fill={WB_WARM} stroke={WB_INK} strokeWidth={1} />
        {cellsOf(list, u, s * s <= WB_SKIN_MAX, "sq")}
        <rect x={ox} y={oy} width={s * u} height={s * u} fill="none" stroke={WB_INK} strokeWidth={3.5} />
        <rect x={ox} y={oy} width={A * u} height={A * u} fill="none" stroke={WB_INK} strokeWidth={6.5} />
        {rowLbl && txt(rx0, oy + u / 2 + 11, tx("Row"), { size: T.label, anchor: "start", fill: wbInk(WB_UNIT), halo: true })}
        {D.fin && txt(ox + (s * u) / 2, oy + s * u + 46 + dv, s + " " + lenU, { fill: wbInk(WB_ANS), halo: true })}
      </g>
    );
  };
  const rope = (k: string, x1: number, y1: number, x2: number, y2: number) => {
    const len = Math.hypot(x2 - x1, y2 - y1), th = len / 9, ang = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
    return (
      <g key={k} transform={`translate(${(x1 + x2) / 2},${(y1 + y2) / 2}) rotate(${ang})`} filter="url(#wb-shadow-sm)">
        <rect x={-len / 2} y={-th / 2} width={len} height={th} rx={th / 2} fill={WB_BOUND} stroke={shade(WB_BOUND, 0.3)} strokeWidth={1.5} />
        <Skin name="rope" x={-len / 2} y={-th / 2} w={len} h={th} fit="stretch" />
        <rect x={-len / 2} y={-th / 2} width={len} height={th} rx={th / 2} fill={WB_BOUND} fillOpacity={0.42} />
      </g>
    );
  };
  const drawFold = () => {
    const g = wbFold(F), { s, Q, u, ox, oy } = g, f = D.filled || 0;
    const list: any[] = [];
    for (let r = 0; r < f; r++) for (let c = 0; c < s; c++) list.push({ x: ox + c * u, y: oy + r * u, fill: WB_UNIT });
    const gp = D.folded ? 14 : 0, th = (Q - 2 * gp) / 9;
    const sideLbl = String(s) + " " + lenU, ls = 36;
    const o = { size: ls, fill: wbInk(WB_NOW), halo: true };
    const pill = String(s * s) + " " + areaU, pw = Math.min(Q - th - 60, wbW(pill, T.prompt) + 32);
    return (
      <g pointerEvents="none">
        <rect x={ox + 4} y={oy + 4} width={Q} height={Q} fill="#000000" fillOpacity={0.06} rx={4} />
        <rect x={ox} y={oy} width={Q} height={Q} fill={WB_WARM} rx={2} />
        {cellsOf(list, u, f * s <= WB_SKIN_MAX, "fd")}
        <rect x={ox} y={oy} width={Q} height={Q} fill="none" stroke={WB_INK} strokeWidth={2} strokeDasharray="8 8" />
        {rope("t", ox + gp, oy, ox + Q - gp, oy)}
        {rope("r", ox + Q, oy + gp, ox + Q, oy + Q - gp)}
        {rope("b", ox + Q - gp, oy + Q, ox + gp, oy + Q)}
        {rope("l", ox, oy + Q - gp, ox, oy + gp)}
        {g.corners.slice(0, D.pinch || 0).map((p: any, i: number) => (
          <g key={"p" + i}>
            <circle cx={p.x} cy={p.y} r={12} fill="#1A1A1A" opacity={0.25} />
            <circle cx={p.x} cy={p.y} r={10} fill="url(#wb-grad-pin)" stroke="#1A1A1A" strokeWidth={2} />
            <circle cx={p.x - 3} cy={p.y - 3} r={3} fill="#FFFFFF" fillOpacity={0.7} />
          </g>
        ))}
        {!D.folded && txt(ox + Q / 2, oy - th / 2 - 14, String(F.per) + " " + lenU, { fill: wbInk(WB_GIVEN), halo: true })}
        {!D.folded && txt(ox + Q / 2, oy + Q + th / 2 + 40 + dv, tx("Boundary"), { size: T.label, fill: wbInk(WB_BOUND), halo: true })}
        {D.folded && txt(ox + Q / 2, oy - th / 2 - 12, sideLbl, o)}
        {D.folded && txt(ox + Q / 2, oy + Q + th / 2 + 40 + dv, sideLbl, o)}
        {D.folded && txt(ox - th / 2 - 12, oy + Q / 2 + 12, sideLbl, { ...o, anchor: "end" })}
        {D.folded && txt(ox + Q + th / 2 + 6, oy + Q / 2 + 12, sideLbl, { ...o, anchor: "start" })}
        {D.fin && (
          <g filter="url(#wb-shadow)">
            <rect x={ox + Q / 2 - pw / 2} y={oy + Q / 2 - 36} width={pw} height={72} rx={16} fill="#FFFFFF" stroke={WB_ANS} strokeWidth={3} />
            {txt(ox + Q / 2, oy + Q / 2 + 13, pill, { size: Math.min(T.prompt, ((pw - 32) / wbW(pill, T.prompt)) * T.prompt), fill: wbInk(WB_ANS) })}
          </g>
        )}
      </g>
    );
  };
  const drawRows = () => {
    const g = wbRows(F), { L, u, ox, baseY } = g, r = D.rows || 0;
    const list: any[] = [];
    for (let i = 0; i < r; i++) for (let c = 0; c < L; c++) list.push({ x: ox + c * u, y: baseY - (i + 1) * u, fill: (i + 1) * L <= F.area ? WB_UNIT : WB_NOW });
    const ticks: any[] = [];
    for (let c = 0; c <= L; c++) ticks.push(<line key={"t" + c} x1={ox + c * u} y1={baseY + 4} x2={ox + c * u} y2={baseY + 22} stroke={WB_INK} strokeWidth={2.4} />);
    const rowX = ox + L * u + 14, rowLbl = r > 0 && rowX + wbW(tx("Row"), T.label) <= 896;
    return (
      <g pointerEvents="none">
        {r === 0 && <rect x={ox} y={baseY - u} width={L * u} height={u} fill="none" stroke={WB_INK} strokeWidth={2} strokeDasharray="8 8" strokeOpacity={0.55} />}
        {cellsOf(list, u, r * L <= WB_SKIN_MAX, "rw")}
        {r > 0 && <rect x={ox} y={baseY - r * u} width={L * u} height={r * u} fill="none" stroke={WB_INK} strokeWidth={3.5} />}
        {rowLbl && txt(rowX, baseY - r * u + u / 2 + 11, tx("Row"), { size: T.label, anchor: "start", fill: wbInk(WB_UNIT), halo: true })}
        <rect x={ox} y={baseY + 4} width={L * u} height={16} rx={8} fill={WB_GIVEN} stroke={wbInk(WB_GIVEN)} strokeWidth={2} />
        {ticks}
        {txt(ox + (L * u) / 2, baseY + 60 + dv, String(L) + " " + lenU, { fill: wbInk(WB_GIVEN), halo: true })}
        {D.fin && r > 0 && (
          <g>
            <line x1={ox - 12} y1={baseY - r * u} x2={ox - 12} y2={baseY} stroke={WB_ANS} strokeWidth={6} strokeLinecap="round" />
            {txt(ox - 28, baseY - (r * u) / 2 + 13, r + " " + lenU, { fill: wbInk(WB_ANS), anchor: "end", halo: true })}
          </g>
        )}
      </g>
    );
  };
  const drawL = () => {
    const g = wbL(F), { W, Hb, w, h, Ht, u, ox, oy } = g;
    const P = (x: number) => ox + x * u, Qy = (y: number) => oy + y * u;
    const cut = D.cut, apart = !!D.apart && !!cut;
    const giv = { fill: wbInk(WB_GIVEN), halo: true };
    const showAreas = cut && (D.areas || free);
    const grid = (k: string, x: number, y: number, pw: number, ph: number) => {
      const ls: any[] = [];
      for (let i = 1; i < pw; i++) ls.push(<line key={k + "v" + i} x1={x + i * u} y1={y} x2={x + i * u} y2={y + ph * u} />);
      for (let j = 1; j < ph; j++) ls.push(<line key={k + "h" + j} x1={x} y1={y + j * u} x2={x + pw * u} y2={y + j * u} />);
      return <g stroke={WB_INK} strokeWidth={2.4}>{ls}</g>;
    };
    if (!cut) {
      const d = `M ${P(0)} ${Qy(0)} H ${P(w)} V ${Qy(h)} H ${P(W)} V ${Qy(Ht)} H ${P(0)} Z`;
      const dl = D.cutting ? g.line(D.cutting) : null;
      /* keep the riser's label 40 clear of the tread's: the riser's stays at mid-height; a crowded tread label stands past the corner */
      const gapX = (P(W) - 6 - wbW((W - w) + " " + lenU, T.prompt)) - (P(w) + 12 + wbW(h + " " + lenU, T.prompt));
      const riserY = Qy(h / 2) + 13, crowd = gapX < 40;
      return (
        <g pointerEvents="none">
          <path d={d} fill={WB_WARM} />
          {grid("a", P(0), Qy(0), w, h)}
          {grid("b", P(0), Qy(h), W, Hb)}
          {D.box && <rect x={P(w)} y={Qy(0)} width={(W - w) * u} height={h * u} fill={WB_NOW} fillOpacity={0.55} stroke={wbInk(WB_NOW)} strokeWidth={4} strokeDasharray="12 8" />}
          {D.box && txt(P((w + W) / 2), Qy(h / 2) + 10, tx(F.thing === "patch" ? "Not patch" : "Not floor"), { size: T.micro, fill: wbInk(WB_NOW), halo: true })}
          <path d={d} fill="none" stroke={WB_INK} strokeWidth={4.5} strokeLinejoin="round" />
          {!dl && D.joined && (() => { const jl = g.line(D.joined); return <line x1={jl[0]} y1={jl[1]} x2={jl[2]} y2={jl[3]} stroke={WB_INK} strokeWidth={4} strokeDasharray="14 10" strokeOpacity={D.joinFade ? 0 : 0.4} style={{ transition: "stroke-opacity 900ms ease" } as any} />; })()}
          {dl && D.dash > 0 && <line x1={dl[0]} y1={dl[1]} x2={dl[0] + ((dl[2] - dl[0]) * D.dash) / 4} y2={dl[1] + ((dl[3] - dl[1]) * D.dash) / 4} stroke={WB_INK} strokeWidth={5} strokeDasharray="14 10" />}
          {txt(P(W / 2), Qy(Ht) + 44 + dv, W + " " + lenU, giv)}
          {txt(P(0) - 16, Qy(Ht / 2) + 13, Ht + " " + lenU, { ...giv, anchor: "end" })}
          {txt(P(w / 2), Qy(0) - 16, w + " " + lenU, giv)}
          {/* the two notch labels, staggered: the riser's on its vertical edge, the tread's at the far end of the tread */}
          {!D.box && txt(P(w) + 12, riserY, h + " " + lenU, { ...giv, anchor: "start" })}
          {!D.box && (crowd ? txt(P(W) - 10, Qy(h) + 46 + dv, (W - w) + " " + lenU, { ...giv, anchor: "end" }) : txt(P(W) - 6, Qy(h) - 16, (W - w) + " " + lenU, { ...giv, anchor: "end" }))}
          {txt(P(W) + 16, Qy(h + Hb / 2) + 13, Hb + " " + lenU, { ...giv, anchor: "start" })}
        </g>
      );
    }
    const parts = g.parts(cut);
    const dl = g.line(cut);
    return (
      <g pointerEvents="none">
        {parts.map((p: any, i: number) => {
          const dx = apart ? p.dx : 0, dy = apart ? p.dy : 0, x = P(p.x), y = Qy(p.y), pw = p.w * u, ph = p.h * u;
          const top = cut === "across" ? i === 0 : true;
          /* the part's area is ALWAYS written: one line inside, else two lines inside, else (a thin strip) over the empty tread */
          const num = String(p.w * p.h), lab = num + " " + areaU;
          let lay: any = null;
          for (const z of [T.label, T.micro]) if (!lay && ph >= 60 && wbW(lab, z) + 32 <= pw - 16) lay = { two: false, z, bw: wbW(lab, z) + 32, bh: 52 };
          const w2 = Math.max(wbW(num, T.label), wbW(areaU, T.micro)) + 28;
          if (!lay && ph >= 104 && w2 <= pw - 16) lay = { two: true, z: T.micro, bw: w2, bh: 92 };
          const notch = !lay, tx0 = P(w), tx1 = P(W);
          if (!lay) {
            const room = tx1 - tx0 - 24, k = lang === "en" ? 1 : 1.15;   /* Devanagari/Gujarati bold runs wider than the estimate */
            for (const z of [T.label, T.micro]) if (!lay && wbW(lab, z) * k + 24 <= room) lay = { two: false, z, bw: wbW(lab, z) * k + 24, bh: 52 };
            if (!lay) lay = { two: true, z: T.micro, bw: Math.min(room, Math.max(wbW(num, T.label), wbW(areaU, T.micro) * k) + 24), bh: 92 };
          }
          let bx = x + pw / 2 - lay.bw / 2, by = y + ph / 2 - lay.bh / 2;
          if (notch) { bx = Math.max(tx0 + 12, Math.min(tx1 - lay.bw - 12, (tx0 + tx1) / 2 - lay.bw / 2)); by = y + ph - 16 - lay.bh; }
          return (
            <g key={"pt" + i} transform={`translate(${dx},${dy})`} style={{ transition: reducedMotion() ? "none" : "transform 420ms ease" } as any}>
              <rect x={x} y={y} width={pw} height={ph} fill={WB_WARM} />
              {grid("p" + i, x, y, p.w, p.h)}
              <rect x={x} y={y} width={pw} height={ph} fill="none" stroke={WB_INK} strokeWidth={4.5} />
              {apart && (top ? txt(x + pw / 2, y - 16, p.w + " " + lenU, giv) : txt(x + pw / 2, y + ph + 44 + dv, p.w + " " + lenU, giv))}
              {apart && (i === 0 ? txt(x - 16, y + ph / 2 + 13, p.h + " " + lenU, { ...giv, anchor: "end" }) : txt(x + pw + 16, y + ph / 2 + 13, p.h + " " + lenU, { ...giv, anchor: "start" }))}
              {showAreas && (
                <g filter="url(#wb-shadow-sm)">
                  <rect x={bx} y={by} width={lay.bw} height={lay.bh} rx={12} fill="#FFFFFF" stroke={WB_INK} strokeWidth={2.4} />
                  {lay.two ? txt(bx + lay.bw / 2, by + 40, num, { size: T.label }) : txt(bx + lay.bw / 2, by + 36, lab, { size: lay.z })}
                  {lay.two && txt(bx + lay.bw / 2, by + 78, areaU, { size: T.micro })}
                </g>
              )}
            </g>
          );
        })}
        {!apart && <line x1={dl[0]} y1={dl[1]} x2={dl[2]} y2={dl[3]} stroke={WB_INK} strokeWidth={4} strokeDasharray="14 10" strokeOpacity={0.5} />}
      </g>
    );
  };
  const drawCopies = () => {
    const g = wbCopies(F), c = D.copies || 1, sq = g.side, cu = g.q / sq;
    const out: any[] = [];
    for (let i = 0; i < c; i++) {
      const p = g.at(i), ls: any[] = [];
      for (let k = 1; k < sq; k++) {
        ls.push(<line key={"v" + k} x1={p.x + k * cu} y1={p.y} x2={p.x + k * cu} y2={p.y + g.q} />);
        ls.push(<line key={"h" + k} x1={p.x} y1={p.y + k * cu} x2={p.x + g.q} y2={p.y + k * cu} />);
      }
      out.push(
        <g key={"cp" + i} filter="url(#wb-shadow-sm)">
          <rect x={p.x} y={p.y} width={g.q} height={g.q} rx={8} fill={tint(WB_UNIT, 0.42)} />
          <Skin name="tile" x={p.x} y={p.y} w={g.q} h={g.q} fit="stretch" />
          <rect x={p.x} y={p.y} width={g.q} height={g.q} rx={8} fill={WB_UNIT} fillOpacity={0.84} />
          <g stroke={WB_INK} strokeWidth={2.4}>{ls}</g>
          <rect x={p.x} y={p.y} width={g.q} height={g.q} rx={8} fill="none" stroke={WB_INK} strokeWidth={4} />
        </g>
      );
    }
    return <g pointerEvents="none">{out}</g>;
  };

  /* ── the right side: cards, sums ── */
  /* the live product shows in the warm-up and question 1 only; questions 2 and 3 print it at the win and in the correction */
  const showProd = warm || free || index === 0 || !!D.fin;
  const RCX = WB_RC.x + WB_RC.w / 2;
  const right = () => {
    if (kind === "square") {
      const s = D.side;
      return <g>{card(WB_RC.x, WB_RC.w, "Area", F.area, areaU)}{showProd && !D.nosum && sum(RCX, WB_RC.w, 368, s + " × " + s, s * s, !!D.fin, !!D.fin)}</g>;
    }
    if (kind === "rows") {
      const r = D.rows, cx = 775;
      return <g>{card(0, 300, "Area", F.area, areaU)}{showProd && sum(cx, 240, 48, F.len + " × " + r, F.len * r, !!D.fin, !!D.fin)}</g>;
    }
    if (kind === "copies") return <g>{card(WB_RC.x, WB_RC.w, "One square", F.each, areaU)}{D.fin && sum(RCX, WB_RC.w, 368, F.count + " × " + F.each, F.count * F.each, true, true)}</g>;
    if (kind === "fold") {
      const s = F.per / 4, cx = WB_FRC.x + WB_FRC.w / 2;
      return (
        <g>
          {card(WB_FRC.x, WB_FRC.w, "Perimeter", F.per, lenU)}
          {D.folded && line(cx, 306, F.per + " ÷ 4")}
          {D.folded && line(cx, 352, "= " + s)}
          {D.filled >= s && (D.fin ? sum(cx, WB_FRC.w, 404, s + " × " + s, s * s, true, true, 46) : line(cx, 404, s + " × " + s))}
        </g>
      );
    }
    const cx = WB_LKC.x + WB_LKC.w / 2;
    if (kind === "lshape" && D.box) return line(cx, 210, F.W + " × " + (F.h + F.Hb));
    if (kind === "lshape" && D.cut && (D.areas || free)) {
      const ps = wbL(F).parts(D.cut), p0 = ps[0].w * ps[0].h, p1 = ps[1].w * ps[1].h, a = Math.max(p0, p1), b = Math.min(p0, p1);
      return sum(cx, WB_LKC.w, 252, a + " + " + b, a + b, !!(D.fin || free), true);
    }
    return null;
  };

  /* ── the keys: the dial (two keys round a window), the Fold/Fill key, the Cut keys and Join ── */
  let ids: string[] = [];
  if (kind === "fold") ids = trace || D.fin ? [] : !S.folded ? ["fold"] : S.filled < F.per / 4 ? ["fill"] : [];
  if (kind === "lshape") ids = trace ? [] : S.cut ? (S.apart ? ["join"] : []) : warm ? ["cut-across"] : ["cut-across", "cut-down"];
  if (solved) ids = [];
  const keyAt: any = {};
  if (kind === "fold") ids.forEach((id) => { keyAt[id] = { x: WB_FRC.x, y: 152, w: WB_FRC.w, h: 88 }; });
  if (kind === "lshape") ids.forEach((id, j) => { keyAt[id] = { x: WB_LKC.x, y: 4 + j * 104, w: WB_LKC.w, h: 88 }; });
  const dialBox = kind === "rows" ? { x: 316, y: 12, w: 324 } : { x: WB_RC.x, y: 152, w: WB_RC.w };
  if (dialKind && !solved) { keyAt.minus = { x: dialBox.x, y: dialBox.y, w: 96, h: 96 }; keyAt.plus = { x: dialBox.x + dialBox.w - 96, y: dialBox.y, w: 96, h: 96 }; }
  const primary = kind === "fold" ? (S.folded ? "fill" : "fold") : kind === "lshape" ? (S.cut ? "join" : "cut-across") : "plus";
  const inviteId = warm ? stepOn : stage === "ask" && !actDone && !off ? primary : null;
  const keyEl = (id: string, slot: string) => {
    const b = keyAt[id], big = id === "minus" || id === "plus";
    const lbl = big ? WB_LABEL[id] : tx(WB_LABEL[id]);
    const ks = big ? T.display : Math.min(T.prompt, ((b.w - 24) / wbW(lbl, T.prompt)) * T.prompt);
    return (
      <Key key={slot} id={id} label={big ? (id === "plus" ? "one more" : "one less") : lbl} x={b.x} y={b.y} w={b.w} h={b.h} C={C} tone="key" disabled={off} onClick={() => act(id, true)}>
        <text y={big ? 22 : 14} textAnchor="middle" fontSize={ks} fontWeight={700} fill={toneInk("key", C.ink)}>{lbl}</text>
      </Key>
    );
  };

  return (
    <g>
      <defs>
        <filter id="wb-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000000" floodOpacity="0.12" />
        </filter>
        <filter id="wb-shadow-sm" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.10" />
        </filter>
        <linearGradient id="wb-grad-card" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor={tint(WB_GIVEN, 0.92)} />
        </linearGradient>
        <linearGradient id="wb-grad-toplight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
        </linearGradient>
        <linearGradient id="wb-grad-pin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFE875" />
          <stop offset="100%" stopColor="#D49B00" />
        </linearGradient>
      </defs>

      {kind === "square" && drawSquare()}
      {kind === "fold" && drawFold()}
      {kind === "rows" && drawRows()}
      {kind === "lshape" && drawL()}
      {kind === "copies" && drawCopies()}
      {right()}
      {dialKind && (
        <g pointerEvents="none" filter="url(#wb-shadow)">
          <rect x={dialBox.x + 104} y={dialBox.y} width={dialBox.w - 208} height={96} rx={16} fill="#FFFFFF" stroke={WB_INK} strokeWidth={3} />
          {txt(dialBox.x + dialBox.w / 2, dialBox.y + 72, String(dialVal), { size: T.display })}
          {txt(dialBox.x + dialBox.w / 2, dialBox.y + 144, dialCap, { weight: 600, fill: wbInk(WB_GIVEN), halo: true })}
        </g>
      )}
      {inviteId && keyAt[inviteId] && <Invite x={keyAt[inviteId].x + keyAt[inviteId].w / 2} y={keyAt[inviteId].y + keyAt[inviteId].h / 2} w={keyAt[inviteId].w} h={keyAt[inviteId].h} rx={RAD.key} C={C} />}
      {Object.keys(keyAt).map((id, j) => keyEl(id, "key" + j))}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase (it = the item, r24) */
function Thumb({ result, it, n, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const item = it || (result && result.last && n && PHASES[n - 1] ? PHASES[n - 1].items[result.last.item] : null);
  if (!item || !result || !result.last) return null;
  const raw = leadNumber(result.last.value);
  const v = typeof raw === "number" ? raw : item.answer;
  const area = item.kind === "fold" || item.kind === "lshape" || item.kind === "copies";
  const unit = wbUnit(area ? "sq. " + item.unit : item.unit, lang, tx);
  const s = h - 20, x0 = 12, y0 = 10;
  const icon = item.kind === "lshape"
    ? <path d={`M ${x0} ${y0} H ${x0 + s * 0.5} V ${y0 + s * 0.4} H ${x0 + s} V ${y0 + s} H ${x0} Z`} fill={tint(WB_UNIT, 0.26)} stroke={WB_INK} strokeWidth={2.5} />
    : item.kind === "rows" ? <rect x={x0} y={y0 + s * 0.3} width={s * 1.2} height={s * 0.7} rx={2} fill={tint(WB_UNIT, 0.26)} stroke={WB_INK} strokeWidth={2.5} />
    : <rect x={x0} y={y0} width={s} height={s} rx={2} fill={tint(WB_UNIT, 0.26)} stroke={item.kind === "fold" ? WB_BOUND : WB_INK} strokeWidth={item.kind === "fold" ? 5 : 2.5} />;
  return (
    <g pointerEvents="none">
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {icon}
      <text x={w - 14} y={h / 2 + 11} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={wbInk(WB_ANS)}>{v + " " + unit}</text>
    </g>
  );
}

function WorkBackArea(props: any) {
  /* AI mode exactly as the runtime decides it (a phase mount without navigable dots), or the host's operatorMode: never gated */
  const ph = props && props.phase, hasPhase = !(ph === undefined || ph === null || ph === "" || !isFinite(Number(ph)));
  const nav = ((props && (props.navigableDots ?? (props.additionalProps && props.additionalProps.navigableDots))) === true);
  WB_AI = !!props && (props.operatorMode === "ai" || (hasPhase && !nav));
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

export default WorkBackArea;
