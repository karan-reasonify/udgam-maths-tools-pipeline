/* ═══ M1.S1.T2.C6.2D1 · edge_walker · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build. SILENT runtime (r66): the bubble is the guide.
   The new look (keyOnly, navDots, bigPad, nextKey, board). Every act is performed on screen (api.act): the pencil
   WRITES the sum on the strip as the ant walks the boundary (pencil acts strict: every one is moves: "write"), the
   hand carries the Length tag. Concepts are verbatim (check compares them). Edit, never rewrite. */

const TOOL_ID = "edge_walker";
const MEDIA_ID = "M1.S1.T2.C6.2D1";
const TOOL_NAME = "Edge Walker";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

const OPENING = ["A shape, and an ant at one corner."];
const FINISH_LINE = "You measured the length of the boundary, one side at a time.";
const FREE_LINE = "Free play. Tap Shape for a new shape, then walk the ant round it.";
const START_HOOK = "How far does an ant walk to go once round a flower bed?";

/* ── the figures (squared-paper drawings; each side's length as the question gives it) ── */
const EW_C = { given: "#0072B2", answer: "#009E73", walk: "#D55E00", now: "#E69F00", line: "#2B2B2B", grid: "#C9DDEC" };
const ewDeep = (c: string) => shade(c, 0.25);
const ewParse = (s: string) => { const m = /^(\d+) (m|cm)$/.exec(String(s)); return { v: m ? Number(m[1]) : 0, u: m ? m[2] : "cm" }; };
const ewCm = (s: string) => { const p = ewParse(s); return p.u === "m" ? p.v * 100 : p.v; };
function ewPent(side: number) {
  const r = side / (2 * Math.sin(Math.PI / 5));
  return [0, 1, 2, 3, 4].map((k) => { const a = (54 + 72 * k) * Math.PI / 180; return [r * Math.cos(a), r * Math.sin(a)]; });
}
function ewRect(L: string, B: string, portrait?: boolean) {
  const r = Math.max(1.15, Math.min(portrait ? 1.3 : 2.2, ewCm(L) / ewCm(B)));
  const dw = portrait ? 100 : 100 * r, dh = portrait ? 100 * r : 100;
  return { rect: [L, B], portrait: !!portrait, pts: [[0, 0], [dw, 0], [dw, dh], [0, dh]],
    sides: portrait ? [B, L, B, L] : [L, B, L, B], long: portrait ? [1, 3] : [0, 2] };
}
const EW_FIGS: any = {
  tri1: { pts: [[0, 3], [4, 3], [0, 0]], sides: ["4 cm", "5 cm", "3 cm"] },
  bed: { skin: "bed", pts: [[0, 10], [14, 10], [16, 1.5], [5.5, -1.5], [-1.5, 1]], sides: ["14 m", "9 m", "11 m", "7 m", "10 m"] },
  card: { pts: [[0, 7], [9, 7], [8.5, 0], [0.6, 0.4]], sides: ["9 cm", "7 cm", "8 cm", "6 cm"] },
  badge: { pts: ewPent(7), sides: ["7 cm", "7 cm", "7 cm", "7 cm", "7 cm"] },
  tri2: { pts: [[0, 60], [80, 60], [0, 0]], sides: ["80 cm", "1 m", "60 cm"] },
  mat: { skin: "mat", pts: [[0, 80], [100, 80], [95, -5], [5, 0]], sides: ["1 m", "85 cm", "90 cm", "75 cm"] },
  garden: { pts: [[0, 130], [200, 130], [124.75, 0]], sides: ["2 m", "150 cm", "180 cm"] },
  frame: ewRect("1 m", "60 cm"),
  r9x4: ewRect("9 cm", "4 cm"), r11x6: ewRect("11 cm", "6 cm"), r12x5: ewRect("12 cm", "5 cm", true), r17x7: ewRect("17 cm", "7 cm"),
  r8x6: ewRect("8 m", "6 m"), r15x8: ewRect("15 m", "8 m"), r21x14: ewRect("21 m", "14 m"), r250x1: ewRect("250 cm", "1 m"),
};
const EW_FREE = ["tri1", "bed", "card", "badge", "r11x6", "r15x8"];

/* Hindi and Gujarati: filled at the language pass, once the English is final */
const TR: any = {
  hi: {
    "Edge Walker": "किनारे की सैर",
    "A shape, and an ant at one corner.": "एक आकृति, और एक कोने पर एक चींटी।",
    "Free play. Tap Shape for a new shape, then walk the ant round it.": "खुला खेल। आकार दबाओ, फिर चींटी को घुमाओ।",
    "How far does an ant walk to go once round a flower bed?": "क्यारी के एक चक्कर में चींटी कितना चलती है?",
    "Perimeter is a length": "परिमाप एक लंबाई है",
    "Tap Walk to send the ant once round this triangle.": "चींटी को इस त्रिभुज का एक चक्कर लगवाने के लिए चलो दबाओ।",
    "Tap the Walk key under the shape.": "आकृति के नीचे चलो कुंजी दबाओ।",
    "Check the sum: is every side's length in it?": "जोड़ देखो: क्या हर भुजा की लंबाई उसमें है?",
    "Every side is a length to add, so never just count the sides.": "हर भुजा जोड़ने वाली लंबाई है, सिर्फ़ भुजाएँ मत गिनो।",
    "So a perimeter is the length of the boundary, every side added once.": "तो परिमाप सीमा की लंबाई है, हर भुजा एक बार जोड़ी जाती है।",
    "You learned: a perimeter adds every side of the boundary once.": "तुमने सीखा: परिमाप में सीमा की हर भुजा एक बार जुड़ती है।",
    "Walk the ant round this flower bed and find its perimeter.": "चींटी को इस क्यारी के चारों ओर चलाओ और परिमाप निकालो।",
    "Flower bed's perimeter?": "क्यारी का परिमाप?",
    "Add the first two sides, 14 and 9, then keep adding.": "पहली दो भुजाएँ, 14 और 9, जोड़ो, फिर जोड़ते जाओ।",
    "perimeter": "परिमाप",
    "m": "मी",
    "cm": "सेमी",
    "How long is the boundary of this card, in cm?": "इस कार्ड की सीमा कितने सेमी लंबी है?",
    "Card's perimeter?": "कार्ड का परिमाप?",
    "Start with 9 + 7, then add the other two sides.": "9 + 7 से शुरू करो, फिर बाकी दो भुजाएँ जोड़ो।",
    "Each side of this badge is 7 cm, so how far is it round the badge?": "इस बैज की हर भुजा 7 सेमी है, तो इसका चक्कर कितना है?",
    "Badge's perimeter?": "बैज का परिमाप?",
    "Count the badge's sides, then add 7 for each one.": "बैज की भुजाएँ गिनो, फिर हर एक के लिए 7 जोड़ो।",
    "One unit for every side": "हर भुजा के लिए एक ही इकाई",
    "1 m = 100 cm, so tap Write in cm to change the metre side.": "1 मी = 100 सेमी, तो सेमी में लिखो दबाओ।",
    "Tap the Write in cm key under the shape.": "आकृति के नीचे सेमी में लिखो कुंजी दबाओ।",
    "Now every side is in cm, so tap Walk to add them.": "अब हर भुजा सेमी में है, तो जोड़ने के लिए चलो दबाओ।",
    "Tap the Walk key to send the ant round.": "चींटी को घुमाने के लिए चलो कुंजी दबाओ।",
    "Look at each side: is it in cm yet?": "हर भुजा देखो: क्या वह सेमी में है?",
    "Then add all the cm lengths, one side at a time, round the shape.": "फिर आकृति के चारों ओर एक-एक भुजा की सेमी लंबाई जोड़ो।",
    "So we write every side in one unit first, using 1 m = 100 cm.": "तो पहले हर भुजा एक ही इकाई में लिखते हैं।",
    "You learned: write every side in one unit before adding.": "तुमने सीखा: जोड़ने से पहले हर भुजा एक ही इकाई में लिखो।",
    "Write this mat's sides in cm, walk round it and find its perimeter.": "भुजाएँ सेमी में लिखो, फिर चटाई का परिमाप निकालो।",
    "Mat in cm?": "चटाई, सेमी में?",
    "Write 1 m as centimetres before you add the sides.": "भुजाएँ जोड़ने से पहले 1 मी को सेंटीमीटर में लिखो।",
    "What is the perimeter of this garden bed in centimetres?": "इस बगीचे की क्यारी का परिमाप कितने सेंटीमीटर है?",
    "Garden bed in cm?": "क्यारी, सेमी में?",
    "How many centimetres make 2 m?": "2 मी में कितने सेंटीमीटर होते हैं?",
    "This photo frame has two sides of 1 m, so how far is it round in cm?": "फ्रेम की दो भुजाएँ 1 मी हैं, इसका परिमाप कितने सेमी है?",
    "Frame in cm?": "फ्रेम, सेमी में?",
    "Both of the 1 m sides need writing as 100 cm.": "1 मी वाली दोनों भुजाएँ 100 सेमी लिखनी हैं।",
    "Length and breadth": "लंबाई और चौड़ाई",
    "The longer side of a rectangle is its length, so tap a longer side.": "आयत की लंबी भुजा उसकी लंबाई है, तो एक लंबी भुजा दबाओ।",
    "Tap one of the two longer sides.": "दो लंबी भुजाओं में से एक दबाओ।",
    "Opposite sides are equal, so tap Walk to go round all four.": "सामने की भुजाएँ बराबर हैं, तो चारों के लिए चलो दबाओ।",
    "Tap the Walk key to add all four sides.": "चारों भुजाएँ जोड़ने के लिए चलो कुंजी दबाओ।",
    "Count what you added: four sides, not two.": "गिनो क्या जोड़ा: चार भुजाएँ, दो नहीं।",
    "Write it as length + breadth + length + breadth, then add.": "इसे लंबाई + चौड़ाई + लंबाई + चौड़ाई लिखो, फिर जोड़ो।",
    "So the longer side is the length and the shorter side is the breadth.": "तो लंबी भुजा लंबाई है और छोटी भुजा चौड़ाई है।",
    "You learned: length is the longer side, breadth the shorter.": "तुमने सीखा: लंबाई लंबी भुजा है, चौड़ाई छोटी।",
    "Tag this rectangle's length, then walk round to find its perimeter.": "लंबाई पर टैग लगाओ, फिर घूमकर परिमाप निकालो।",
    "Rectangle's perimeter?": "आयत का परिमाप?",
    "Opposite sides are equal, so all four sides go in the sum.": "सामने की भुजाएँ बराबर हैं, चारों जोड़ में आती हैं।",
    "Put the Length tag on the side of this rectangle that is its length.": "इस आयत की जो भुजा लंबाई है, उस पर लंबाई का टैग लगाओ।",
    "Tag the length": "लंबाई पर टैग",
    "The length is the longer side, not the shorter one.": "लंबाई लंबी भुजा है, छोटी नहीं।",
    "Look at the two numbers on the sides and pick the bigger one.": "भुजाओं पर लिखी दो संख्याएँ देखो और बड़ी वाली चुनो।",
    "Opposite sides match, so you may tag either side of the pair.": "सामने की भुजाएँ एक जैसी हैं, तो जोड़ी की कोई भी भुजा चुनो।",
    "This rectangle is 17 cm long and 7 cm wide, so how long is its boundary?": "आयत 17 सेमी लंबा, 7 सेमी चौड़ा है, सीमा कितनी है?",
    "Perimeter, 17 by 7?": "परिमाप, 17 और 7?",
    "Add 17 + 7, and then the two opposite sides as well.": "17 + 7 जोड़ो, और फिर सामने की दोनों भुजाएँ भी।",
    "Two lots of length and breadth": "लंबाई और चौड़ाई का दो गुना",
    "Tap Two lots to write one length and one breadth, taken twice.": "लंबाई और चौड़ाई का दो गुना लिखने को दो गुना दबाओ।",
    "Tap the Two lots key under the rectangle.": "आयत के नीचे दो गुना कुंजी दबाओ।",
    "Two lots means the whole bracket times 2, not just the length times 2.": "दो गुना मतलब पूरा कोष्ठक गुणा 2, सिर्फ़ लंबाई गुणा 2 नहीं।",
    "You can check it by adding all four sides.": "चारों भुजाएँ जोड़कर तुम इसे जाँच सकते हो।",
    "So the perimeter of a rectangle is 2 × (length + breadth).": "तो आयत का परिमाप 2 × (लंबाई + चौड़ाई) है।",
    "You learned: perimeter of a rectangle = 2 × (length + breadth).": "तुमने सीखा: आयत का परिमाप = 2 × (लंबाई + चौड़ाई)।",
    "Use Two lots to find the perimeter of this rectangle by the formula.": "दो गुना से, सूत्र द्वारा इस आयत का परिमाप निकालो।",
    "By the formula?": "सूत्र से?",
    "Find 15 + 8 first, then the formula doubles that.": "पहले 15 + 8 निकालो, फिर सूत्र उसका दो गुना करता है।",
    "Find the perimeter of a rectangle 21 m long and 14 m wide by the formula.": "21 मी लंबे, 14 मी चौड़े आयत का परिमाप सूत्र से निकालो।",
    "21 m by 14 m?": "21 मी और 14 मी?",
    "First 21 + 14, then take two lots of that.": "पहले 21 + 14, फिर उसका दो गुना करो।",
    "This rectangle is 250 cm long and 1 m wide, so find its perimeter in cm.": "आयत 250 सेमी लंबा, 1 मी चौड़ा है, परिमाप सेमी में?",
    "250 cm by 1 m?": "250 सेमी और 1 मी?",
    "Write 1 m as 100 cm before you take two lots.": "दो गुना करने से पहले 1 मी को 100 सेमी लिखो।",
    "Tap Write in cm first.": "पहले सेमी में लिखो दबाओ।",
    "Tap a longer side first.": "पहले एक लंबी भुजा दबाओ।",
    "Put the Length tag on first.": "पहले लंबाई का टैग लगाओ।",
    "Tap the side that is the length first.": "पहले वह भुजा दबाओ जो लंबाई है।",
    "Tap Two lots first.": "पहले दो गुना दबाओ।",
    "Tap Walk first, then give the perimeter.": "पहले चलो दबाओ, फिर परिमाप बताओ।",
    "Yes, the boundary is 51 m long.": "हाँ, सीमा 51 मी लंबी है।",
    "Right, the card's edge is 30 cm.": "सही, कार्ड का किनारा 30 सेमी है।",
    "Yes, the badge is 35 cm round.": "हाँ, बैज का चक्कर 35 सेमी है।",
    "Yes, the mat is 350 cm round.": "हाँ, चटाई का चक्कर 350 सेमी है।",
    "Right, that bed is 530 cm round.": "सही, उस क्यारी का चक्कर 530 सेमी है।",
    "Yes, the frame is 320 cm round.": "हाँ, फ्रेम का चक्कर 320 सेमी है।",
    "Yes, the perimeter is 34 cm.": "हाँ, परिमाप 34 सेमी है।",
    "Right, the 12 cm side is the length.": "सही, 12 सेमी वाली भुजा लंबाई है।",
    "Yes, the boundary is 48 cm.": "हाँ, सीमा 48 सेमी है।",
    "Yes, two lots of 23 make 46 m.": "हाँ, 23 का दो गुना 46 मी है।",
    "Right, 2 × 35 is 70 m.": "सही, 2 × 35 = 70 मी।",
    "Yes, 2 × 350 is 700 cm.": "हाँ, 2 × 350 = 700 सेमी।",
    "Length": "लंबाई",
    "Breadth": "चौड़ाई",
    "Walk": "चलो",
    "Write in cm": "सेमी में लिखो",
    "Two lots": "दो गुना",
    "Shape": "आकार",
    "Boundary": "सीमा",
  },
  gu: {
    "Edge Walker": "કિનારીની સફર",
    "A shape, and an ant at one corner.": "એક આકૃતિ, અને એક ખૂણે એક કીડી.",
    "Free play. Tap Shape for a new shape, then walk the ant round it.": "મુક્ત રમત. આકાર દબાવો, પછી કીડીને ફેરવો.",
    "How far does an ant walk to go once round a flower bed?": "ક્યારીની એક વાર ફરતે ફરવા કીડી કેટલું ચાલે?",
    "Perimeter is a length": "પરિમિતિ એક લંબાઈ છે",
    "Tap Walk to send the ant once round this triangle.": "કીડીને આ ત્રિકોણની ફરતે ફેરવવા ચાલો દબાવો.",
    "Tap the Walk key under the shape.": "આકૃતિની નીચે ચાલો બટન દબાવો.",
    "Check the sum: is every side's length in it?": "સરવાળો જુઓ: શું દરેક બાજુની લંબાઈ તેમાં છે?",
    "Every side is a length to add, so never just count the sides.": "દરેક બાજુ ઉમેરવાની લંબાઈ છે, ફક્ત બાજુઓ ન ગણો.",
    "So a perimeter is the length of the boundary, every side added once.": "તેથી પરિમિતિ સીમાની લંબાઈ છે, દરેક બાજુ એક વાર ઉમેરાય છે.",
    "You learned: a perimeter adds every side of the boundary once.": "તમે શીખ્યા: પરિમિતિમાં સીમાની દરેક બાજુ એક વાર ઉમેરાય છે.",
    "Walk the ant round this flower bed and find its perimeter.": "કીડીને આ ક્યારીની ફરતે ચલાવો અને પરિમિતિ શોધો.",
    "Flower bed's perimeter?": "ક્યારીની પરિમિતિ?",
    "Add the first two sides, 14 and 9, then keep adding.": "પહેલી બે બાજુ, 14 અને 9, ઉમેરો, પછી ઉમેરતા જાઓ.",
    "perimeter": "પરિમિતિ",
    "m": "મી",
    "cm": "સેમી",
    "How long is the boundary of this card, in cm?": "આ કાર્ડની સીમા કેટલા સેમી લાંબી છે?",
    "Card's perimeter?": "કાર્ડની પરિમિતિ?",
    "Start with 9 + 7, then add the other two sides.": "9 + 7 થી શરૂ કરો, પછી બાકીની બે બાજુ ઉમેરો.",
    "Each side of this badge is 7 cm, so how far is it round the badge?": "આ બેજની દરેક બાજુ 7 સેમી છે, તો તેની ફરતે કેટલું છે?",
    "Badge's perimeter?": "બેજની પરિમિતિ?",
    "Count the badge's sides, then add 7 for each one.": "બેજની બાજુઓ ગણો, પછી દરેક માટે 7 ઉમેરો.",
    "One unit for every side": "દરેક બાજુ માટે એક જ એકમ",
    "1 m = 100 cm, so tap Write in cm to change the metre side.": "1 મી = 100 સેમી, તેથી સેમીમાં લખો દબાવો.",
    "Tap the Write in cm key under the shape.": "આકૃતિની નીચે સેમીમાં લખો બટન દબાવો.",
    "Now every side is in cm, so tap Walk to add them.": "હવે દરેક બાજુ સેમીમાં છે, તેથી ઉમેરવા ચાલો દબાવો.",
    "Tap the Walk key to send the ant round.": "કીડીને ફેરવવા ચાલો બટન દબાવો.",
    "Look at each side: is it in cm yet?": "દરેક બાજુ જુઓ: શું તે સેમીમાં છે?",
    "Then add all the cm lengths, one side at a time, round the shape.": "પછી આકૃતિની ફરતે એક એક બાજુની સેમી લંબાઈ ઉમેરો.",
    "So we write every side in one unit first, using 1 m = 100 cm.": "તેથી પહેલાં દરેક બાજુ એક જ એકમમાં લખીએ.",
    "You learned: write every side in one unit before adding.": "તમે શીખ્યા: ઉમેરતાં પહેલાં દરેક બાજુ એક જ એકમમાં લખો.",
    "Write this mat's sides in cm, walk round it and find its perimeter.": "આ સાદડીની બાજુઓ સેમીમાં લખો, ફરતે ચાલો અને પરિમિતિ શોધો.",
    "Mat in cm?": "સાદડી, સેમીમાં?",
    "Write 1 m as centimetres before you add the sides.": "બાજુઓ ઉમેરતાં પહેલાં 1 મીને સેન્ટિમીટરમાં લખો.",
    "What is the perimeter of this garden bed in centimetres?": "આ બગીચાની ક્યારીની પરિમિતિ કેટલા સેન્ટિમીટર છે?",
    "Garden bed in cm?": "ક્યારી, સેમીમાં?",
    "How many centimetres make 2 m?": "2 મીમાં કેટલા સેન્ટિમીટર થાય?",
    "This photo frame has two sides of 1 m, so how far is it round in cm?": "ફ્રેમની બે બાજુ 1 મી છે, પરિમિતિ કેટલા સેમી છે?",
    "Frame in cm?": "ફ્રેમ, સેમીમાં?",
    "Both of the 1 m sides need writing as 100 cm.": "1 મીવાળી બંને બાજુ 100 સેમી લખવાની છે.",
    "Length and breadth": "લંબાઈ અને પહોળાઈ",
    "The longer side of a rectangle is its length, so tap a longer side.": "લાંબી બાજુ લંબાઈ છે, તેથી એક લાંબી બાજુ દબાવો.",
    "Tap one of the two longer sides.": "બે લાંબી બાજુઓમાંથી એક દબાવો.",
    "Opposite sides are equal, so tap Walk to go round all four.": "સામસામેની બાજુઓ સરખી છે, તેથી ચારેય માટે ચાલો દબાવો.",
    "Tap the Walk key to add all four sides.": "ચારેય બાજુ ઉમેરવા ચાલો બટન દબાવો.",
    "Count what you added: four sides, not two.": "ગણો શું ઉમેર્યું: ચાર બાજુ, બે નહીં.",
    "Write it as length + breadth + length + breadth, then add.": "તેને લંબાઈ + પહોળાઈ + લંબાઈ + પહોળાઈ લખો, પછી ઉમેરો.",
    "So the longer side is the length and the shorter side is the breadth.": "તેથી લાંબી બાજુ લંબાઈ છે અને ટૂંકી બાજુ પહોળાઈ છે.",
    "You learned: length is the longer side, breadth the shorter.": "તમે શીખ્યા: લંબાઈ લાંબી બાજુ છે, પહોળાઈ ટૂંકી.",
    "Tag this rectangle's length, then walk round to find its perimeter.": "લંબાઈ પર ટેગ લગાવો, પછી ફરતે ચાલી પરિમિતિ શોધો.",
    "Rectangle's perimeter?": "લંબચોરસની પરિમિતિ?",
    "Opposite sides are equal, so all four sides go in the sum.": "સામસામેની બાજુઓ સરખી છે, તેથી ચારેય બાજુ સરવાળામાં આવે.",
    "Put the Length tag on the side of this rectangle that is its length.": "આ લંબચોરસની જે બાજુ લંબાઈ છે, તેના પર લંબાઈનો ટેગ લગાવો.",
    "Tag the length": "લંબાઈ પર ટેગ",
    "The length is the longer side, not the shorter one.": "લંબાઈ લાંબી બાજુ છે, ટૂંકી નહીં.",
    "Look at the two numbers on the sides and pick the bigger one.": "બાજુઓ પરની બે સંખ્યા જુઓ અને મોટી પસંદ કરો.",
    "Opposite sides match, so you may tag either side of the pair.": "સામસામેની બાજુઓ સરખી છે, તેથી જોડીની કોઈ પણ બાજુ પસંદ કરો.",
    "This rectangle is 17 cm long and 7 cm wide, so how long is its boundary?": "લંબચોરસ 17 સેમી લાંબો, 7 સેમી પહોળો છે, સીમા કેટલી?",
    "Perimeter, 17 by 7?": "પરિમિતિ, 17 અને 7?",
    "Add 17 + 7, and then the two opposite sides as well.": "17 + 7 ઉમેરો, અને પછી સામેની બંને બાજુ પણ.",
    "Two lots of length and breadth": "લંબાઈ અને પહોળાઈનું બમણું",
    "Tap Two lots to write one length and one breadth, taken twice.": "એક લંબાઈ અને એક પહોળાઈનું બમણું લખવા બમણું દબાવો.",
    "Tap the Two lots key under the rectangle.": "લંબચોરસની નીચે બમણું બટન દબાવો.",
    "Two lots means the whole bracket times 2, not just the length times 2.": "બમણું એટલે આખો કૌંસ ગુણ્યા 2, ફક્ત લંબાઈ ગુણ્યા 2 નહીં.",
    "You can check it by adding all four sides.": "ચારેય બાજુ ઉમેરીને તમે તે ચકાસી શકો.",
    "So the perimeter of a rectangle is 2 × (length + breadth).": "તેથી લંબચોરસની પરિમિતિ 2 × (લંબાઈ + પહોળાઈ) છે.",
    "You learned: perimeter of a rectangle = 2 × (length + breadth).": "તમે શીખ્યા: લંબચોરસની પરિમિતિ = 2 × (લંબાઈ + પહોળાઈ).",
    "Use Two lots to find the perimeter of this rectangle by the formula.": "બમણું વડે, સૂત્રથી આ લંબચોરસની પરિમિતિ શોધો.",
    "By the formula?": "સૂત્રથી?",
    "Find 15 + 8 first, then the formula doubles that.": "પહેલાં 15 + 8 શોધો, પછી સૂત્ર તેને બમણું કરે છે.",
    "Find the perimeter of a rectangle 21 m long and 14 m wide by the formula.": "21 મી લાંબા, 14 મી પહોળા લંબચોરસની પરિમિતિ સૂત્રથી શોધો.",
    "21 m by 14 m?": "21 મી અને 14 મી?",
    "First 21 + 14, then take two lots of that.": "પહેલાં 21 + 14, પછી તેનું બમણું કરો.",
    "This rectangle is 250 cm long and 1 m wide, so find its perimeter in cm.": "લંબચોરસ 250 સેમી લાંબો, 1 મી પહોળો છે, પરિમિતિ સેમીમાં?",
    "250 cm by 1 m?": "250 સેમી અને 1 મી?",
    "Write 1 m as 100 cm before you take two lots.": "બમણું કરતાં પહેલાં 1 મીને 100 સેમી લખો.",
    "Tap Write in cm first.": "પહેલાં સેમીમાં લખો દબાવો.",
    "Tap a longer side first.": "પહેલાં એક લાંબી બાજુ દબાવો.",
    "Put the Length tag on first.": "પહેલાં લંબાઈનો ટેગ લગાવો.",
    "Tap the side that is the length first.": "પહેલાં લંબાઈવાળી બાજુ દબાવો.",
    "Tap Two lots first.": "પહેલાં બમણું દબાવો.",
    "Tap Walk first, then give the perimeter.": "પહેલાં ચાલો દબાવો, પછી પરિમિતિ કહો.",
    "Yes, the boundary is 51 m long.": "હા, સીમા 51 મી લાંબી છે.",
    "Right, the card's edge is 30 cm.": "સાચું, કાર્ડની કિનારી 30 સેમી છે.",
    "Yes, the badge is 35 cm round.": "હા, બેજની ફરતે 35 સેમી છે.",
    "Yes, the mat is 350 cm round.": "હા, સાદડીની ફરતે 350 સેમી છે.",
    "Right, that bed is 530 cm round.": "સાચું, તે ક્યારીની ફરતે 530 સેમી છે.",
    "Yes, the frame is 320 cm round.": "હા, ફ્રેમની ફરતે 320 સેમી છે.",
    "Yes, the perimeter is 34 cm.": "હા, પરિમિતિ 34 સેમી છે.",
    "Right, the 12 cm side is the length.": "સાચું, 12 સેમીવાળી બાજુ લંબાઈ છે.",
    "Yes, the boundary is 48 cm.": "હા, સીમા 48 સેમી છે.",
    "Yes, two lots of 23 make 46 m.": "હા, 23નું બમણું 46 મી છે.",
    "Right, 2 × 35 is 70 m.": "સાચું, 2 × 35 = 70 મી.",
    "Yes, 2 × 350 is 700 cm.": "હા, 2 × 350 = 700 સેમી.",
    "Length": "લંબાઈ",
    "Breadth": "પહોળાઈ",
    "Walk": "ચાલો",
    "Write in cm": "સેમીમાં લખો",
    "Two lots": "બમણું",
    "Shape": "આકાર",
    "Boundary": "સીમા",
  },
};

/* kinds: walk (walk the boundary) · conv (Write in cm, then walk) · tag (tag the length, then walk) · taglen (tag the length:
   the answer) · lots (Two lots writes 2 × (length + breadth)) · lotsconv (Write in cm, then Two lots) */
const PHASES = [
  {
    n: 1,
    concept: "Perimeter is a length",
    conceptId: "M1.S1.T2.C5", objectiveIds: ["O1"],
    says: ["Walk the ant all the way round. Every side, once."],
    warm: { fig: "tri1", kind: "walk" }, stepHold: 2600,
    steps: [{ say: "Tap Walk to send the ant once round this triangle.", on: "walk", hint: "Tap the Walk key under the shape." }],
    ladder: ["Check the sum: is every side's length in it?", "Every side is a length to add, so never just count the sides."],
    closing: "So a perimeter is the length of the boundary, every side added once.",
    learned: "You learned: a perimeter adds every side of the boundary once.",
    traceback: "each side lights in turn as its length joins the sum, ending on the whole perimeter in green",
    items: [
      /* learn EW1: answer in the plan = 51 m (A five-sided flower bed has sides of 14 m, 9 m, 11 m, 7 m and 10 m.) */
      { qid: "M1.S1.T2.C5:EW1", kind: "walk", fig: "bed", say: "Walk the ant round this flower bed and find its perimeter.", ask: "Flower bed's perimeter?",
        parts: [{ label: "perimeter", unit: "m" }], answer: [51], nm: 5, miss: "Add the first two sides, 14 and 9, then keep adding.",
        win: "Yes, the boundary is 51 m long." },
      /* practice 1: answer in the plan = 9 + 7 + 8 + 6 = 30, so 30 cm */
      { qid: "M1.S1.T2.C5:1", kind: "walk", fig: "card", say: "How long is the boundary of this card, in cm?", ask: "Card's perimeter?",
        parts: [{ label: "perimeter", unit: "cm" }], answer: [30], nm: 4, miss: "Start with 9 + 7, then add the other two sides.",
        win: "Right, the card's edge is 30 cm." },
      /* practice 4: answer in the plan = 7 + 7 + 7 + 7 + 7 = 35, so 35 cm */
      { qid: "M1.S1.T2.C5:4", kind: "walk", fig: "badge", say: "Each side of this badge is 7 cm, so how far is it round the badge?", ask: "Badge's perimeter?",
        parts: [{ label: "perimeter", unit: "cm" }], answer: [35], nm: 5, miss: "Count the badge's sides, then add 7 for each one.",
        win: "Yes, the badge is 35 cm round." },
    ],
  },
  {
    n: 2,
    concept: "One unit for every side",
    conceptId: "M1.S1.T2.C6", objectiveIds: ["O1"],
    says: ["One side is in metres. Make every side centimetres first."],
    warm: { fig: "tri2", kind: "conv" }, stepHold: 2600,
    steps: [
      { say: "1 m = 100 cm, so tap Write in cm to change the metre side.", on: "cm", hint: "Tap the Write in cm key under the shape." },
      { say: "Now every side is in cm, so tap Walk to add them.", on: "walk", hint: "Tap the Walk key to send the ant round." },
    ],
    ladder: ["Look at each side: is it in cm yet?", "Then add all the cm lengths, one side at a time, round the shape."],
    closing: "So we write every side in one unit first, using 1 m = 100 cm.",
    learned: "You learned: write every side in one unit before adding.",
    traceback: "the metre sides are rewritten in cm, then each side lights as it joins the sum, ending on the perimeter in cm",
    items: [
      /* learn EW2: answer in the plan = 350 cm (A mat has sides of 1 m, 85 cm, 90 cm and 75 cm.) */
      { qid: "M1.S1.T2.C6:EW2", kind: "conv", fig: "mat", say: "Write this mat's sides in cm, walk round it and find its perimeter.", ask: "Mat in cm?",
        parts: [{ label: "perimeter", unit: "cm" }], answer: [350], nm: 251, miss: "Write 1 m as centimetres before you add the sides.",
        win: "Yes, the mat is 350 cm round." },
      /* practice 3: answer in the plan = 2 m = 200 cm, and 200 + 150 + 180 = 530, so 530 cm */
      { qid: "M1.S1.T2.C6:3", kind: "conv", fig: "garden", say: "What is the perimeter of this garden bed in centimetres?", ask: "Garden bed in cm?",
        parts: [{ label: "perimeter", unit: "cm" }], answer: [530], nm: 332, miss: "How many centimetres make 2 m?",
        win: "Right, that bed is 530 cm round." },
      /* practice 5: answer in the plan = 1 m = 100 cm, and 100 + 100 + 60 + 60 = 320, so 320 cm */
      { qid: "M1.S1.T2.C6:5", kind: "conv", fig: "frame", say: "This photo frame has two sides of 1 m, so how far is it round in cm?", ask: "Frame in cm?",
        parts: [{ label: "perimeter", unit: "cm" }], answer: [320], nm: 122, miss: "Both of the 1 m sides need writing as 100 cm.",
        win: "Yes, the frame is 320 cm round." },
    ],
  },
  {
    n: 3,
    concept: "Length and breadth",
    conceptId: "M1.S1.T2.C7", objectiveIds: ["O2"],
    says: ["Which side is longer? That one is the length."],
    warm: { fig: "r9x4", kind: "tag" }, stepHold: 2600,
    steps: [
      { say: "The longer side of a rectangle is its length, so tap a longer side.", on: "length", hint: "Tap one of the two longer sides." },
      { say: "Opposite sides are equal, so tap Walk to go round all four.", on: "walk", hint: "Tap the Walk key to add all four sides." },
    ],
    ladder: ["Count what you added: four sides, not two.", "Write it as length + breadth + length + breadth, then add."],
    closing: "So the longer side is the length and the shorter side is the breadth.",
    learned: "You learned: length is the longer side, breadth the shorter.",
    traceback: "each of the four sides lights as it joins the sum (or the two longer sides light for the length), ending on the answer in green",
    items: [
      /* learn EW3: answer in the plan = The length is 11 cm, and the perimeter is 34 cm (the length is the tag act; the typed answer is the perimeter) */
      { qid: "M1.S1.T2.C7:EW3", kind: "tag", fig: "r11x6", say: "Tag this rectangle's length, then walk round to find its perimeter.", ask: "Rectangle's perimeter?",
        parts: [{ label: "perimeter", unit: "cm" }], answer: [34], nm: 17, miss: "Opposite sides are equal, so all four sides go in the sum.",
        win: "Yes, the perimeter is 34 cm." },
      /* practice 2: answer in the plan = The 12 cm side, because the longer side is the length (answered on the board: the Length tag, then Enter) */
      { qid: "M1.S1.T2.C7:2", kind: "taglen", fig: "r12x5", pad: "enter", say: "Put the Length tag on the side of this rectangle that is its length.", ask: "Tag the length",
        answer: "s1", nm: "s2", miss: "The length is the longer side, not the shorter one.",
        ladder: ["Look at the two numbers on the sides and pick the bigger one.", "Opposite sides match, so you may tag either side of the pair."],
        win: "Right, the 12 cm side is the length." },
      /* practice 6: answer in the plan = The perimeter of a rectangle 17 cm long and 7 cm wide is 17 + 7 + 17 + 7 = 48 cm */
      { qid: "M1.S1.T2.C7:6", kind: "tag", fig: "r17x7", say: "This rectangle is 17 cm long and 7 cm wide, so how long is its boundary?", ask: "Perimeter, 17 by 7?",
        parts: [{ label: "perimeter", unit: "cm" }], answer: [48], nm: 24, miss: "Add 17 + 7, and then the two opposite sides as well.",
        win: "Yes, the boundary is 48 cm." },
    ],
  },
  {
    n: 4,
    concept: "Two lots of length and breadth",
    conceptId: "M1.S1.T2.C8", objectiveIds: ["O2"],
    says: ["Add one length and one breadth. Then take two lots."],
    warm: { fig: "r8x6", kind: "lots" }, stepHold: 2600,
    steps: [{ say: "Tap Two lots to write one length and one breadth, taken twice.", on: "lots", hint: "Tap the Two lots key under the rectangle." }],
    ladder: ["Two lots means the whole bracket times 2, not just the length times 2.", "You can check it by adding all four sides."],
    closing: "So the perimeter of a rectangle is 2 × (length + breadth).",
    learned: "You learned: perimeter of a rectangle = 2 × (length + breadth).",
    traceback: "length + breadth is added, then taken twice, ending on the perimeter in green",
    items: [
      /* learn EW4: answer in the plan = 46 m (A rectangle is 15 m long and 8 m wide. Find its perimeter by the formula.) */
      { qid: "M1.S1.T2.C8:EW4", kind: "lots", fig: "r15x8", say: "Use Two lots to find the perimeter of this rectangle by the formula.", ask: "By the formula?",
        parts: [{ label: "perimeter", unit: "m" }], answer: [46], nm: 38, miss: "Find 15 + 8 first, then the formula doubles that.",
        win: "Yes, two lots of 23 make 46 m." },
      /* practice 7: answer in the plan = The perimeter of a rectangle 21 m long and 14 m wide is 2 x (21 + 14) = 70 m */
      { qid: "M1.S1.T2.C8:7", kind: "lots", fig: "r21x14", say: "Find the perimeter of a rectangle 21 m long and 14 m wide by the formula.", ask: "21 m by 14 m?",
        parts: [{ label: "perimeter", unit: "m" }], answer: [70], nm: 35, miss: "First 21 + 14, then take two lots of that.",
        win: "Right, 2 × 35 is 70 m." },
      /* practice 8: answer in the plan = 1 m = 100 cm, and 2 x (250 + 100) = 700, so 700 cm */
      { qid: "M1.S1.T2.C8:8", kind: "lotsconv", fig: "r250x1", say: "This rectangle is 250 cm long and 1 m wide, so find its perimeter in cm.", ask: "250 cm by 1 m?",
        parts: [{ label: "perimeter", unit: "cm" }], answer: [700], nm: 502, miss: "Write 1 m as 100 cm before you take two lots.",
        win: "Yes, 2 × 350 is 700 cm." },
    ],
  },
];

const MODEL = { figs: EW_FIGS, freeFigs: EW_FREE, colours: EW_C,
  /* the answer gate (PATTERNS "Answer gated by the act"): the Answer key and keypad stay shut, in user mode after a real tap on a key or piece of the phase, until the act is done */
  answerGate: {
    phase1: "Walk (the ant walks the boundary while the pencil writes the sum)",
    phase2: "Write in cm, then Walk",
    phase3: "Q1 and Q3: tap a longer side (the Length tag), then Walk; a wrong tag shows the correction and keeps Walk shut until a longer side is tapped. Q2: place the Length tag, then Enter",
    phase4: "Q1 and Q2: Two lots; Q3: Write in cm, then Two lots",
    ungated: "none; the gate arms after a real tap on a key or piece of the phase, or a real Enter on a guide step (user mode; the question after the steps); typing before that is not gated, and after a miss the gate stands down",
    nudge: "while gated, a press on the Answer key or a keypad key, a typed digit or a hardware Enter says what is still to do (never while an act plays)",
  } };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: a second route from the side strings alone (regex units, the rectangle formula), sharing nothing with judge or Work */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const f = EW_FIGS[it.fig];
  const toCm = (s: string) => (s.endsWith(" m") ? 100 : 1) * parseInt(s, 10);
  const asIs = (s: string) => parseInt(s, 10);
  if (it.kind === "taglen") return it.answer === (toCm(f.rect[0]) > toCm(f.rect[1]) ? "s1" : "s2");
  const cv = it.kind === "conv" || it.kind === "lotsconv" ? toCm : asIs;
  const want = f.rect && (it.kind === "lots" || it.kind === "lotsconv")
    ? 2 * (cv(f.rect[0]) + cv(f.rect[1]))
    : f.sides.reduce((s: number, x: string) => s + cv(x), 0);
  return Array.isArray(it.answer) && it.answer[0] === want;
}));
const nearMiss = (item: any) => String(item.nm);
const answerForms = (item: any) => (Array.isArray(item.answer) ? item.answer.flatMap((x: number) => [String(x), indian(x), words(x)]) : [String(item.answer)]);
const agentKey = (item: any) => item.answer;

const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── geometry helpers ── */
const ewW = (s: string, size: number) => {
  let n = 0;
  for (const ch of String(s)) {
    const c = ch.codePointAt(0) || 0;
    if ((c >= 0x900 && c <= 0x902) || c === 0x93c || (c >= 0x941 && c <= 0x948) || c === 0x94d || (c >= 0x951 && c <= 0x957) || (c >= 0x962 && c <= 0x963)
      || (c >= 0xa81 && c <= 0xa82) || c === 0xabc || (c >= 0xac1 && c <= 0xac8) || c === 0xacd || (c >= 0xae2 && c <= 0xae3)) continue;
    n += ch === " " ? 0.28 : c >= 0x900 ? 0.62 : ch === "m" || ch === "M" || ch === "W" ? 0.9 : /[A-Z]/.test(ch) ? 0.7 : /[0-9+=×()]/.test(ch) ? 0.66 : 0.6;
  }
  return n * size;
};
function ewFit(pts: number[][], b: any) {
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  const x0 = Math.min(...xs), y0 = Math.min(...ys), w = Math.max(...xs) - x0 || 1, h = Math.max(...ys) - y0 || 1;
  const s = Math.min(b.w / w, b.h / h), ox = b.x + (b.w - s * w) / 2 - s * x0, oy = b.y + (b.h - s * h) / 2 - s * y0;
  return pts.map((p) => [ox + s * p[0], oy + s * p[1]]);
}
const EW_SS = T.prompt;                       /* the strip's type */
const EW_LS = T.prompt;                       /* a side's length label */
const ewPenW = (s: string) => penLayout(s, 0, 0, EW_SS, "start", 0).w;
const ewUnitOf = (it: any) => (it && it.parts ? it.parts[0].unit : "cm");
/* a unit word, from TR like every other word the picture draws */
const ewU = (u: string, lang: string) => (TR[lang] && TR[lang][u]) || u;
/* a line of working as ONE text: the words spaced by dx (no space characters, so it reads as one label), an optional green tail */
function ewRow(k: string, str: string, x: number, y: number, size: number, fill: string, weight: number, anchor?: string, tail?: string, tailFill?: string) {
  const a = String(str).trim().split(" ").filter(Boolean), b = String(tail || "").trim().split(" ").filter(Boolean), dx = size * 0.3;
  const el = (
    <text key={k} x={x} y={y} fontSize={size} fontWeight={weight} fill={fill} textAnchor={anchor === "middle" ? "middle" : "start"}>
      {a.map((w, i) => <tspan key={"a" + i} dx={i ? dx : 0}>{w}</tspan>)}
      {b.map((w, i) => <tspan key={"b" + i} dx={a.length || i ? dx : 0} fill={tailFill || fill} fontWeight={700}>{w}</tspan>)}
    </text>
  );
  return { el };
}

function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const warm = !free && phase && phase.warm && (stage === "demo" || stage === "teach");
  const it: any = free ? null : warm ? phase.warm : item;
  /* the board is keyed to the ENTRY of a question (PATTERNS §18) */
  const qid = n + ":" + (free ? "f" : warm ? "w" : index);
  const ent = useRef({ q: "", e: 0 });
  if (ent.current.q !== qid) ent.current = { q: qid, e: ent.current.e + 1 };
  const qk = qid + "#" + ent.current.e;
  const curQk = useRef(qk); curQk.current = qk;
  const stageRef = useRef(stage); stageRef.current = stage;
  const fresh = () => ({ key: qk, fi: 0, walking: false, walked: false, pc: 0, converting: false, conv: false, cpc: 0, tag: null as any, bad: false, nudged: false, hintWork: false, lotting: false, lots: false, lpc: 0, tb: 0, tbOn: false });
  const [raw, setRaw] = useState(fresh);
  const S: any = raw.key === qk ? raw : fresh();
  const put = (o: any, k: string = qk) => setRaw((p: any) => (k !== curQk.current ? p : { ...(p.key === k ? p : fresh()), ...o, key: k }));
  const [touchN, setTouchN] = useState(0);
  const [enterQ, setEnterQ] = useState("");
  const touched = touchN === n || enterQ === qk;
  const lastEnter = useRef(0);          /* the time of the last TRUSTED hardware Enter (a child's key, never toolApi / HOOK / the dev driver) */
  const stepEnter = useRef(0);          /* the phase whose guide step a trusted Enter performed, in user mode */
  const busy = useRef(false);
  const lastKey = useRef(0);
  useEffect(() => () => { tl.stop(); busy.current = false; }, [qk]);

  const figId = free ? EW_FREE[S.fi % EW_FREE.length] : it ? it.fig : "tri1";
  const f = EW_FIGS[figId];
  const kind = free ? "walk" : it ? it.kind : "walk";
  const isConv = kind === "conv" || kind === "lotsconv";
  const isTag = kind === "tag" || kind === "taglen";
  const isLots = kind === "lots" || kind === "lotsconv";
  const walks = kind === "walk" || kind === "conv" || kind === "tag";
  const N = f.sides.length;
  const unit = free ? ewParse(f.sides[0]).u : warm ? (isConv ? "cm" : ewParse(f.sides[0]).u) : ewUnitOf(it);
  const won = !free && !warm && (stage === "win" || stage === "idle");
  /* a REAL question (Q1-Q3; not the guide steps, not free play): the acts only light the figure; the working shows with a right
     answer, or (steps, no total) after the header's Hint key; misses 1 and 2 show the bubble hint only (the owner, 2026-11-17),
     the 3rd miss and later play the traceback to the whole answer (the owner, 2026-11-18) */
  const real = !free && !warm;
  const tbShow = S.tb > 0;

  /* the side values as they go into the sum (cm once converted) */
  const conv = S.conv || (isConv && (tbShow || won));
  const val = (i: number) => (isConv && conv ? ewCm(f.sides[i]) : ewParse(f.sides[i]).v);
  const terms = f.sides.map((_s: string, i: number) => String(val(i)));
  const expr = terms.join(" + ");
  const ranges = terms.map((t: string, i: number) => { const s0 = terms.slice(0, i).reduce((a: number, x: string) => a + x.length + 3, 0); return [s0, s0 + t.length]; });
  const L0 = f.rect ? (isConv && conv ? String(ewCm(f.rect[0])) : String(ewParse(f.rect[0]).v)) : "";
  const B0 = f.rect ? (isConv && conv ? String(ewCm(f.rect[1])) : String(ewParse(f.rect[1]).v)) : "";
  const lotsMid = L0 + " + " + B0;
  const total = isLots ? 2 * (Number(L0) + Number(B0)) : terms.reduce((a: number, t: string) => a + Number(t), 0);
  const longIdx = f.long ? f.long[1] : 0;   /* the long side with no label pill before the tag, so the step's ring crosses no number */

  /* what is still to do on this board */
  const nextAct = isConv && !S.conv ? "cm" : isTag && (S.tag === null || S.bad) ? "tag" : walks && !S.walked ? "walk" : isLots && !S.lots ? "lots" : null;
  const actDone = nextAct === null;

  /* ── layout (from box; the picture lives in x 0-900 so the open panel never covers it) ── */
  const Wd = Math.min(box.w, 900), ox = Math.max(0, (box.w - Wd) / 2);
  const hasFact = isConv;
  const dev = lang === "hi" || lang === "gu";
  const lenOnly = kind === "taglen";     /* P3 Q2 has no walk: its one working line sits in the key row, so the paper takes the strip's band */
  const FB = { x: ox + 40, y: 2, w: Wd - 80, h: lenOnly ? 427 : 352 };
  const SB = { x: ox + 40, y: lenOnly ? 443 : 366, w: Wd - 80, h: 66 };
  const KY = 441, KH = 72;              /* the key's invite ring (6 outside) ends at 519, inside the 520 working area */
  const sx0 = SB.x + 24, sBase = SB.y + SB.h / 2 + (dev ? 15 : EW_SS * 0.36);
  /* chip sizes come from the words alone, so the figure leaves room for the widest chip in THIS language (12+ clear of the paper) */
  const CH1 = dev ? 60 : 52, CH2 = dev ? 108 : 92, B1 = dev ? 20 : 14, W2 = dev ? -11 : -14, V2 = dev ? 47 : 34;
  const chipW = (i: number) => {
    const u = ewParse(f.sides[i]).u, vt = (isConv && u === "m" ? String(ewCm(f.sides[i])) + " " + ewU("cm", lang) : ewParse(f.sides[i]).v + " " + ewU(u, lang));
    return Math.max(ewW(vt, EW_LS), isTag || isLots ? ewW(tx("Breadth"), T.label) : 0) + 28;
  };
  /* a portrait rectangle labels its short (top and bottom) sides INSIDE, so it can use the paper's whole height */
  const mX = Math.max(...f.sides.map((_s: string, i: number) => chipW(i))) + 30, mY = f.portrait ? 34 : CH1 + 30;
  const P = ewFit(f.pts, { x: FB.x + mX, y: FB.y + mY, w: FB.w - 2 * mX, h: FB.h - 2 * mY });
  const cx = P.reduce((a, p) => a + p[0], 0) / N, cy = P.reduce((a, p) => a + p[1], 0) / N;
  const side = (i: number) => { const a = P[i], b = P[(i + 1) % N]; return { a, b, mx: (a[0] + b[0]) / 2, my: (a[1] + b[1]) / 2, vert: Math.abs(b[1] - a[1]) > Math.abs(b[0] - a[0]) }; };
  /* labels never follow a tap: the full Length / Breadth labels come only from the rectangle itself, after a RIGHT tag (the win, in Q2);
     before that the child's own tag stays on the side they put it on */
  const tagFull = isLots || (kind === "tag" && ((S.tag !== null && !S.bad) || won)) || (kind === "taglen" && won);
  const tagWord = (i: number) => (tagFull ? (f.long.indexOf(i) >= 0 ? "Length" : "Breadth") : isTag && i === S.tag ? "Length" : "");
  /* a side's chip: its value (and its tag), placed outside the side along the outward normal */
  const chip = (i: number) => {
    const sd = side(i), u = ewParse(f.sides[i]).u;
    const isM = isConv && u === "m";
    const showConv = isM && (S.conv || S.converting || tbShow || won);
    const valTxt = showConv ? String(ewCm(f.sides[i])) + " " + ewU("cm", lang) : ewParse(f.sides[i]).v + " " + ewU(u, lang);
    const word = tagWord(i) ? tx(tagWord(i)) : "";
    const inside = !!f.portrait && !sd.vert;
    const two = !!word && (sd.vert || inside);
    const wv = ewW(valTxt, EW_LS), ww = word ? ewW(word, T.label) : 0;
    const cw = two ? Math.max(wv, ww) + 28 : wv + (word ? ww + 14 : 0) + 28, ch = two ? CH2 : CH1;
    let nx = sd.b[1] - sd.a[1], ny = -(sd.b[0] - sd.a[0]);
    const len = Math.hypot(nx, ny) || 1; nx /= len; ny /= len;
    if ((nx * (sd.mx - cx) + ny * (sd.my - cy) < 0) !== inside) { nx = -nx; ny = -ny; }
    const off = Math.abs(nx) * cw / 2 + Math.abs(ny) * ch / 2 + 18;
    return { i, x: sd.mx + nx * off, y: sd.my + ny * off, cw, ch, two, word, valTxt, isM, showConv, wv, ww };
  };
  const shownChip = (i: number) => !isTag || tagFull || tbShow || i === 0 || i === 1 || i === S.tag;
  const chips = f.sides.map((_s: string, i: number) => chip(i));
  const mIdx = isConv ? f.sides.map((s: string, i: number) => (ewParse(s).u === "m" ? i : -1)).filter((i: number) => i >= 0) : [];
  /* the converted label: the pencil's number, then the printed unit */
  const convGeo = (c: any) => {
    const num = String(ewCm(f.sides[c.i])), wn = ewPenW(num) * EW_LS / EW_SS, wu = ewW(ewU("cm", lang), EW_LS), gap = 12;
    const start = c.x - (wn + gap + wu) / 2;
    return { num, end: start + wn, ux: start + wn + gap, base: c.two ? c.y + V2 : c.y + B1 };
  };
  /* the Two lots line: "2 ×", "(", "L + B", ")" */
  const w1 = ewPenW("2 ×"), xb1 = sx0 + w1 + EW_SS * 0.25, x2 = xb1 + EW_SS * 0.45, w2 = ewPenW(lotsMid), xb2 = x2 + w2 + EW_SS * 0.12;
  const lotsEnd = xb2 + EW_SS * 0.4;
  const factOn = hasFact && (warm ? S.conv || S.converting : S.conv || tbShow || won);
  const factS = "1 " + ewU("m", lang) + " = 100 " + ewU("cm", lang), factW = ewW(factS, T.label) + 36;
  const keyRow = (k: number) => { const w = k > 1 ? 240 : 280, gap = 24, tot = k * w + (k - 1) * gap, x0 = Math.max(ox + Wd / 2 - tot / 2, factOn ? ox + 40 + factW + 30 : 0); return Array.from({ length: k }, (_v, j) => ({ x: x0 + j * (w + gap), y: KY, w, h: KH })); };
  const tray = { len: { x: ox + Wd / 2 - 222, y: KY + 4, w: 210, h: 64 }, br: { x: ox + Wd / 2 + 12, y: KY + 4, w: 210, h: 64 } };

  const did = (nm: string) => { if (stageRef.current === "demo") api.did(nm); };
  const touch = () => { if (touchN !== n) setTouchN(n); };

  /* ── the acts (every one performed on screen) ── */
  const walk = async () => {
    if (S.walked) { did("walk"); return; }
    if (busy.current || nextAct !== "walk") return;
    busy.current = true; const k = qk; put({ walking: true, pc: 0, tb: 0 });
    const ok = real
      ? await api.act({ tool: "pencil", moves: "draw", marks: true, ms: 1400, from: { x: P[0][0], y: P[0][1] }, at: P.slice(1).concat([P[0]]).map((q: number[]) => ({ x: q[0], y: q[1] })),
          onPoint: (i: number) => put({ pc: ranges[Math.min(i, N - 1)][1] }, k) })
      : await api.act({ tool: "pencil", moves: "write", text: expr, at: [{ x: sx0, y: sBase }], size: EW_SS, align: "start", onPoint: (j: number) => put({ pc: j + 1 }, k) });
    busy.current = false;
    if (!ok) { put({ walking: false, pc: 0 }, k); return; }
    put({ walking: false, walked: true, pc: expr.length }, k); api.sfx.settle(); did("walk");
  };
  const toCm = async () => {
    if (S.conv) { did("cm"); return; }
    if (busy.current || !isConv) return;
    busy.current = true; const k = qk; put({ converting: true, cpc: 0, tb: 0 });
    const gs = mIdx.map((i: number) => convGeo(chips[i]));
    const ok = await api.act({ tool: "pencil", moves: "write", text: gs.map((g: any) => g.num), at: gs.map((g: any) => ({ x: g.end, y: g.base })), size: EW_LS, align: "end", onPoint: (j: number) => put({ cpc: j + 1 }, k) });
    busy.current = false;
    if (!ok) { put({ converting: false, cpc: 0 }, k); return; }
    put({ converting: false, conv: true, cpc: 99 }, k); api.sfx.settle(); did("cm");
  };
  const lotsAct = async () => {
    if (S.lots) { did("lots"); return; }
    if (busy.current || nextAct !== "lots") return;
    busy.current = true; const k = qk; put({ lotting: true, lpc: 0, tb: 0 });
    const by = sBase - EW_SS * 0.36;
    const ok = real
      ? await api.act({ tool: "pencil", moves: "draw", marks: true, ms: 1200, from: { x: P[0][0], y: P[0][1] }, at: [{ x: P[1][0], y: P[1][1] }, { x: P[2][0], y: P[2][1] }],
          onPoint: (i: number) => put({ lpc: i === 0 ? 4 + L0.length : 4 + lotsMid.length }, k) })
      : await api.act({ tool: "pencil", moves: "write", text: ["2 ×", { dab: [xb1 + EW_SS * 0.15, by] }, lotsMid, { dab: [xb2 + EW_SS * 0.15, by] }],
      at: [{ x: sx0, y: sBase }, null, { x: x2, y: sBase }, null], size: EW_SS, align: "start", onPoint: (j: number) => put({ lpc: j + 1 }, k) });
    busy.current = false;
    if (!ok) { put({ lotting: false, lpc: 0 }, k); return; }
    put({ lotting: false, lots: true, lpc: 99 }, k); api.sfx.trade(); did("lots");
  };
  const tagAct = async (s: number) => {
    const isLong = f.long && f.long.indexOf(s) >= 0;
    if (stageRef.current === "demo" && (stepOn !== "length" || !isLong)) { api.did(isLong ? "length" : "side-" + (s + 1)); return; }
    if (busy.current || !isTag || S.walked || S.walking || S.tbOn) return;
    if (kind === "tag" && S.tag !== null && !S.bad && !isLong) return;
    busy.current = true; const k = qk; put({ tb: 0 });
    const c = chips[s];
    const ok = await api.act({ tool: "hand", moves: "carry", from: { x: tray.len.x + tray.len.w / 2, y: tray.len.y + tray.len.h / 2 }, to: { x: c.x, y: c.y },
      hold: <g>{pill(-105, -32, 210, 64, tx("Length"))}</g> });
    busy.current = false;
    if (!ok) return;
    const badTag = kind === "tag" && !isLong;
    put({ tag: s, bad: badTag, ...(badTag ? { nudged: "bad" } : {}) }, k); api.sfx.tick(); did(isLong ? "length" : "side-" + (s + 1));
    if (badTag) {
      api.say("Tap a longer side first.");
      setTimeout(() => setRaw((p: any) => (p.key === k && p.bad && p.tag === s ? { ...p, tag: null } : p)), 1500);
    }
    if (kind === "taglen") { api.setTyped(isLong ? "s1" : "s2"); api.answerReady(true); }
  };
  const shape = () => { if (busy.current) return; put({ ...fresh(), fi: (S.fi + 1) % EW_FREE.length }); api.sfx.tick(); };
  const act = (on: any): any => {
    if (on === "walk") return walk(); if (on === "cm") return toCm(); if (on === "lots") return lotsAct(); if (on === "length") return tagAct(longIdx); if (on === "shape") return shape();
  };
  const inWork = () => { const a: any = document.activeElement; return !!(a && a.closest && a.closest('[data-zone="work"]')); };
  const keepFocus = (was: boolean) => {
    if (!was) return;
    /* only the next ACT key (walk, cm, lots, shape) may take the focus, never a side tag target; after the last act nothing in the board holds it,
       so the child's Enter answers */
    setTimeout(() => {
      const ae: any = document.activeElement;
      const key: any = document.querySelector('[data-zone="work"] :is([data-control="walk"],[data-control="cm"],[data-control="lots"],[data-control="shape"]):not([aria-disabled="true"])');
      if (key) { if (!ae || ae === document.body || (ae.closest && ae.closest('[data-zone="work"]'))) key.focus(); return; }
      if (ae && ae.closest && ae.closest('[data-zone="work"]') && ae.blur) ae.blur();
    }, 120);
  };
  const press = (on: string) => { const t = Date.now(); if (t - lastKey.current < 400) return; lastKey.current = t; touch(); const was = inWork(); Promise.resolve(act(on)).then(() => keepFocus(was)); };
  const userMode = () => { try { const t = (window as any).toolApi; return !!t && t.getState().mode === "user"; } catch (e) { return false; } };
  api.onEnter(stage === "demo" && stepOn ? () => { if (Date.now() - lastEnter.current < 250 && userMode()) stepEnter.current = n; act(stepOn); } : null);
  /* the question that follows guide steps worked by a real Enter is gated like one worked by a real tap (Q1 only: a jump elsewhere is a new entry) */
  if (stage === "ask" && stepEnter.current === n && enterQ !== qk) { stepEnter.current = 0; setEnterQ(qk); }

  /* the agent (toolApi) acts at once, never gated */
  HOOK.check = stage === "ask" ? () => { put({ conv: true, cpc: 99, tag: S.tag === null || S.bad ? longIdx : S.tag, bad: false, walked: walks, pc: expr.length, lots: isLots, lpc: 99 }); return undefined; } : null;
  HOOK.set = (v: any) => { if (!f.long) return false; put({ tb: 0, tag: String(v) === "s1" ? f.long[0] : (f.long[0] + 1) % 4 }); api.setTyped(String(v)); return true; };

  /* the traceback: redraws the sum side by side and ends on the whole answer. In a REAL question only from the 3rd miss on
     (misses 1 and 2: the bubble hint only, nothing of the working; the owner, 2026-11-18) */
  useEffect(() => {
    if (!wrong || stage !== "ask" || (real && !(wrong.tries >= 3))) return;
    api.lock(true);                                   /* at once, in the same commit as the miss */
    const k = qk;
    const steps = kind === "taglen" ? 2 : isLots ? 3 : N + 1;
    put({ tb: 1, tbOn: true }, k);
    const seq: any[] = [];
    for (let j = 2; j <= steps; j++) seq.push([700, () => put({ tb: j }, k)]);
    seq.push([500, () => {}]);
    tl.run(seq, () => put({ tbOn: false }, k));
  }, [wrong]);

  /* the answer is gated by the act (user mode: only after a real touch; the agent goes through HOOK, never gated) */
  const gate = stage === "ask" && touched && !actDone && S.tb === 0;
  useEffect(() => { api.lock(!!(S.tbOn || gate)); }, [S.tbOn, gate]);
  const gateRef = useRef(false); gateRef.current = gate;
  const waitKey = nextAct === "tag" && S.bad ? "bad" : nextAct === "tag" && kind === "tag" ? "tapLen" : nextAct;
  const nudgeLine = (w: any) => (w === "cm" ? "Tap Write in cm first." : w === "bad" ? "Tap a longer side first." : w === "tapLen" ? "Tap the side that is the length first." : w === "tag" ? "Put the Length tag on first." : w === "lots" ? "Tap Two lots first." : "Tap Walk first, then give the perimeter.");
  const nudge = () => {
    if (!gateRef.current || busy.current) return;
    api.say(nudgeLine(waitKey));
    put({ nudged: waitKey });
  };
  const nudgeRef = useRef(nudge); nudgeRef.current = nudge;
  const hintRef = useRef(() => {}); hintRef.current = () => { if (stageRef.current === "ask" && real && !S.hintWork) put({ hintWork: true }); };
  useEffect(() => {
    const isHint = (t: any) => !!(t && t.closest && t.closest('[data-control="again"]'));
    const onDown = (e: any) => { if (isHint(e.target)) hintRef.current(); };
    const onKey = (e: any) => { if ((e.key === "Enter" || e.key === " ") && isHint(document.activeElement)) hintRef.current(); };
    window.addEventListener("pointerdown", onDown, true); window.addEventListener("keydown", onKey, true);
    return () => { window.removeEventListener("pointerdown", onDown, true); window.removeEventListener("keydown", onKey, true); };
  }, []);
  useEffect(() => {
    /* a press on the shut Answer key or a keypad key, or a typed digit, while the act still waits */
    const onDown = (e: any) => { const t = e.target && e.target.closest ? e.target.closest('[data-control="answer-open"],[data-control^="key-"]') : null; if (t) nudgeRef.current(); };
    const onKey = (e: any) => {
      if (e.key === "Enter" && e.isTrusted) lastEnter.current = Date.now();
      const onPiece = e.target && e.target.closest && e.target.closest('[data-zone="work"] [data-control]');
      if (/^[0-9]$/.test(String(e.key)) || (e.key === "Enter" && e.isTrusted && !onPiece)) nudgeRef.current();
    };
    window.addEventListener("pointerdown", onDown, true); window.addEventListener("keydown", onKey, true);
    return () => { window.removeEventListener("pointerdown", onDown, true); window.removeEventListener("keydown", onKey, true); };
  }, []);
  useEffect(() => {
    if (!S.nudged || S.nudged === waitKey || stage !== "ask" || !item) return;
    if (gate && !busy.current && waitKey) { api.say(nudgeLine(waitKey)); put({ nudged: waitKey }); }   /* what is waiting changed: say the new nudge at once */
    else { api.say(item.say); put({ nudged: false }); }                                                /* the act is done: the question again */
  }, [waitKey, S.nudged]);
  useEffect(() => { if (stage === "ask" && kind === "taglen") api.answerReady(S.tag !== null && typed !== ""); }, [S.tag, typed, stage]);
  /* the win line, said once at the right answer */
  useEffect(() => { if (stage === "win" && item && item.win) api.say(item.win); }, [stage, qk]);

  const nDone = S.walked ? N : S.walking ? ranges.filter((r: number[]) => S.pc >= r[1]).length : 0;
  api.share({ sides_walked: nDone, units_same: !isConv || S.conv, length_tag: S.tag, two_lots: S.lots, working_shown: !real || won || !!S.hintWork || tbShow, complete: stage === "idle" });

  /* ── drawing ── */
  function pill(x: number, y: number, w: number, h: number, label: string) {
    return (
      <g filter="url(#ew-shadow)">
        <rect x={x} y={y} width={w} height={h} rx={h / 2} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} />
        <rect x={x + 3} y={y + 3} width={w - 6} height={h / 2 - 3} rx={h / 4} fill="#FFFFFF" fillOpacity={0.4} pointerEvents="none" />
        <text x={x + w / 2} y={y + h / 2 + 10} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{label}</text>
      </g>
    );
  }
  /* side colour: vermilion once walked, amber while being worked */
  const sideState = (i: number) => {
    if (won && (walks || isLots)) return "walk";
    if (S.bad && !tbShow) return f.long.indexOf(i) >= 0 ? "now" : "";
    if (tbShow) {
      if (kind === "taglen") return f.long.indexOf(i) >= 0 ? "now" : "";
      if (isLots) return S.tb >= 2 ? "walk" : (i === 0 || i === 1) ? "now" : "";
      if (i < S.tb - 1) return "walk";
      if (i === S.tb - 1) return "now";
      return S.tb > N ? "walk" : "";
    }
    if (isLots) {
      if (S.lots) return "walk";
      if (S.lotting) { const p = S.lpc; if (p >= 5 + lotsMid.length) return "walk"; if (i === 0 && p >= 4 + L0.length) return "now"; if (i === 1 && p >= 4 + lotsMid.length) return "now"; }
      return "";
    }
    if (S.walked) return "walk";
    if (S.walking) { const r = ranges[i]; if (S.pc >= r[1]) return "walk"; if (S.pc >= Math.max(0, r[0] - 3)) return "now"; }
    return "";
  };
  const antV = S.walked ? 0 : nDone % N;
  const antA = (() => { const a = P[antV], b = P[(antV + 1) % N]; return Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI + 90; })();
  const rm = reducedMotion();
  const cell = 34;
  const gridX: number[] = [], gridY: number[] = [];
  for (let x = FB.x + cell; x < FB.x + FB.w - 4; x += cell) gridX.push(x);
  for (let y = FB.y + cell; y < FB.y + FB.h - 4; y += cell) gridY.push(y);
  const poly = P.map((p) => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
  const bb = { x: Math.min(...P.map((p) => p[0])), y: Math.min(...P.map((p) => p[1])), w: 0, h: 0 };
  bb.w = Math.max(...P.map((p) => p[0])) - bb.x; bb.h = Math.max(...P.map((p) => p[1])) - bb.y;
  const clipId = "ew-clip-" + figId;

  /* the keys at the bottom centre: their label follows the act */
  const KEY_LABEL: any = { walk: tx("Walk"), cm: tx("Write in cm"), lots: tx("Two lots"), shape: tx("Shape") };
  const keyIds: string[] = S.tbOn || won ? [] : free ? ["shape", "walk"] : nextAct === "cm" || nextAct === "walk" || nextAct === "lots" ? [nextAct] : [];
  const kb = keyRow(keyIds.length);
  const inviteOn = (stage === "demo" || stage === "ask" || free) && !S.walking && !S.converting && !S.lotting && !tbShow;
  /* the written Boundary label: inside the lit outline, at the widest row near the middle (12+ clear of every edge) */
  const allLit = f.sides.every((_s: string, i: number) => sideState(i) === "walk");
  const bLab = (() => {
    const w = ewW(tx("Boundary"), T.label) + 36, h = dev ? 60 : 52;
    const span = (y: number) => { const xs: number[] = []; for (let i = 0; i < N; i++) { const a = P[i], b = P[(i + 1) % N]; if ((a[1] - y) * (b[1] - y) <= 0 && a[1] !== b[1]) xs.push(a[0] + ((y - a[1]) * (b[0] - a[0])) / (b[1] - a[1])); } return xs.length >= 2 ? [Math.min(...xs), Math.max(...xs)] : null; };
    let best: any = null;
    for (let k = -8; k <= 8; k++) {
      const y = cy + k * 8, s1 = span(y - h / 2 - 12), s2 = span(y + h / 2 + 12);
      if (!s1 || !s2) continue;
      const lo = Math.max(s1[0], s2[0]) + 12, hi = Math.min(s1[1], s2[1]) - 12;
      if (hi - lo >= w && (!best || Math.abs(k) < best.k)) best = { k: Math.abs(k), x: (lo + hi) / 2, y };
    }
    if (best) return { x: best.x, y: best.y, w, h };
    /* no room inside (a small figure): the paper's top-left corner, with a short leader to the nearest corner of the outline */
    const v = P.reduce((a: number[], q: number[]) => (q[0] + q[1] < a[0] + a[1] ? q : a), P[0]);
    return { x: FB.x + 14 + w / 2, y: FB.y + 14 + h / 2, w, h, lead: v };
  })();

  /* the strip's text */
  const ansTxt = "= " + (kind === "taglen" ? "" : total) + " " + ewU(unit, lang);
  const greenInk = ewDeep(EW_C.answer);
  const tbLine = (() => {
    if (!tbShow) return null;
    if (kind === "taglen") return { a: S.tb >= 2 ? tx("Length") + " = " : "", b: S.tb >= 2 ? ewParse(f.rect[0]).v + " " + ewU(ewParse(f.rect[0]).u, lang) : "" };
    if (isLots) {
      const s1 = "2 × (" + lotsMid + ")";
      if (S.tb === 1) return { a: s1, b: "" };
      if (S.tb === 2) return { a: s1 + " = 2 × " + (Number(L0) + Number(B0)), b: "" };
      return { a: s1 + " = 2 × " + (Number(L0) + Number(B0)) + " ", b: "= " + total + " " + ewU(unit, lang) };
    }
    const k = Math.min(S.tb, N);
    return { a: terms.slice(0, k).join(" + ") + " ", b: S.tb > N ? "= " + total + " " + ewU(unit, lang) : "" };
  })();
  const fullLine = isLots ? "2 × (" + lotsMid + ") " : kind === "taglen" ? "" : expr + " ";
  const ownLine = !real && (isLots ? (S.lotting || S.lots) : (S.walking || S.walked));
  /* the Hint key's working: the steps with every side in one unit, never the total */
  const hv = (s0: string) => String(isConv ? ewCm(s0) : ewParse(s0).v);
  const hintLine = real && S.hintWork && !won && !tbShow && kind !== "taglen"
    ? (isLots ? "2 × (" + hv(f.rect[0]) + " + " + hv(f.rect[1]) + ")" : f.sides.map((s0: string) => hv(s0)).join(" + ")) : "";
  const showResult = (won || (warm && actDone) || (free && S.walked)) && !tbShow;
  const tbSize = (s: string) => Math.min(EW_SS, (SB.w - 48) / Math.max(1, ewW(s, 1)));

  return (
    <g>
      <defs>
        <clipPath id={clipId}><polygon points={poly} /></clipPath>
        <filter id="ew-shadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#1E293B" floodOpacity="0.14" />
        </filter>
        <linearGradient id="ew-paper-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FAF8F5" />
        </linearGradient>
      </defs>
      {/* squared paper */}
      <rect data-role="ew-paper" x={FB.x} y={FB.y} width={FB.w} height={FB.h} rx={16} fill="url(#ew-paper-grad)" stroke={C.rule} strokeWidth={2.5} filter="url(#ew-shadow)" />
      {gridX.map((x, j) => <line key={"gx" + j} x1={x} y1={FB.y + 2} x2={x} y2={FB.y + FB.h - 2} stroke={EW_C.grid} strokeWidth={1} opacity={0.45} />)}
      {gridY.map((y, j) => <line key={"gy" + j} x1={FB.x + 2} y1={y} x2={FB.x + FB.w - 2} y2={y} stroke={EW_C.grid} strokeWidth={1} opacity={0.45} />)}
      {/* the figure: plain fill, the object's skin over it (clipped to the outline) */}
      <polygon points={poly} fill={f.skin ? "#F6E7C8" : "#FFFDF7"} />
      {f.skin && <Skin name={f.skin} x={bb.x} y={bb.y} w={bb.w} h={bb.h} clip={"url(#" + clipId + ")"} />}
      {f.sides.map((_s: string, i: number) => {
        const sd = side(i), st = sideState(i);
        return (
          <g key={"sd" + i}>
            {f.skin && <line x1={sd.a[0]} y1={sd.a[1]} x2={sd.b[0]} y2={sd.b[1]} stroke="#FFFFFF" strokeWidth={st ? 16 : 11} strokeLinecap="round" strokeLinejoin="round" />}
            <line x1={sd.a[0]} y1={sd.a[1]} x2={sd.b[0]} y2={sd.b[1]} stroke={st === "walk" ? EW_C.walk : st === "now" ? EW_C.now : EW_C.line}
              strokeWidth={st ? 10 : 5} strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );
      })}
      {allLit && <polygon points={poly} fill="none" stroke={EW_C.walk} strokeWidth={10} strokeLinejoin="round" pointerEvents="none" />}
      {isTag && stepOn === "length" && inviteOn && (() => { const sd = side(longIdx); return <Invite x={sd.mx} y={sd.my} w={Math.abs(sd.b[0] - sd.a[0]) || 72} h={sd.vert ? Math.abs(sd.b[1] - sd.a[1]) : 72} rx={20} C={C} />; })()}
      {allLit && bLab && (
        <g pointerEvents="none">
          {bLab.lead && <line x1={bLab.x} y1={bLab.y + bLab.h / 2} x2={bLab.lead[0]} y2={bLab.lead[1]} stroke={EW_C.walk} strokeWidth={3} strokeDasharray="6 6" />}
          <rect x={bLab.x - bLab.w / 2} y={bLab.y - bLab.h / 2} width={bLab.w} height={bLab.h} rx={bLab.h / 2} fill="#FFFFFF" stroke={EW_C.walk} strokeWidth={3} />
          <text x={bLab.x} y={bLab.y + (dev ? 13 : 11)} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ewDeep(EW_C.walk)}>{tx("Boundary")}</text>
        </g>
      )}
      {/* side labels (given lengths, deep blue; tags in ink) */}
      {chips.map((c: any) => (!shownChip(c.i) ? null : (
        <g key={"ch" + c.i} filter="url(#ew-shadow)">
          <rect x={c.x - c.cw / 2} y={c.y - c.ch / 2} width={c.cw} height={c.ch} rx={14} fill="#FFFFFF" stroke={tint(EW_C.given, 0.45)} strokeWidth={2.5} />
          {c.two && <text x={c.x} y={c.y + W2} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{c.word}</text>}
          {c.showConv && !tbShow && (S.conv || S.converting) ? (() => {
            const g = convGeo(c), off = mIdx.indexOf(c.i), sofar = mIdx.slice(0, off).reduce((a: number, i: number) => a + String(ewCm(f.sides[i])).length, 0);
            const chs = S.conv ? g.num.length : Math.max(0, Math.min(g.num.length, S.cpc - sofar));
            return (
              <g>
                <PencilText text={g.num} x={g.end} y={g.base} size={EW_LS} align="end" chars={chs} />
                {chs >= g.num.length && <text x={g.ux} y={g.base} fontSize={EW_LS} fontWeight={700} fill={ewDeep(EW_C.given)}>{ewU("cm", lang)}</text>}
              </g>
            );
          })() : c.two ? (
            <text x={c.x} y={c.y + V2} textAnchor="middle" fontSize={EW_LS} fontWeight={700} fill={ewDeep(EW_C.given)}>{c.valTxt}</text>
          ) : c.word ? (
            <text x={c.x - c.cw / 2 + 14} y={c.y + B1} fontSize={EW_LS} fontWeight={700}>
              <tspan fontSize={T.label} fill={C.ink}>{c.word}</tspan>
              <tspan dx={14} fill={ewDeep(EW_C.given)}>{c.valTxt}</tspan>
            </text>
          ) : (
            <text x={c.x} y={c.y + B1} textAnchor="middle" fontSize={EW_LS} fontWeight={700} fill={ewDeep(EW_C.given)}>{c.valTxt}</text>
          )}
        </g>
      )))}
      {/* the ant: walks to the far corner of each side as its length is written */}
      {(walks || free) && (
        <g style={{ transform: `translate(${P[antV][0]}px, ${P[antV][1]}px) rotate(${antA}deg)`, transition: rm ? undefined : "transform 0.35s ease" } as any} pointerEvents="none" filter="url(#ew-shadow)">
          <ellipse cx={0} cy={14} rx={9} ry={13} fill="#7A3B1E" stroke="#3B1D0E" strokeWidth={2} />
          <ellipse cx={0} cy={-2} rx={7} ry={8} fill="#8A4524" stroke="#3B1D0E" strokeWidth={2} />
          <circle cx={0} cy={-16} r={8} fill="#7A3B1E" stroke="#3B1D0E" strokeWidth={2} />
          <path d="M -7 -2 L -17 -8 M 7 -2 L 17 -8 M -7 2 L -18 4 M 7 2 L 18 4 M -7 8 L -16 16 M 7 8 L 16 16 M -3 -22 L -8 -30 M 3 -22 L 8 -30" stroke="#3B1D0E" strokeWidth={2.5} strokeLinecap="round" fill="none" />
          <Skin name="ant" x={-17} y={-30} w={34} h={59} />
        </g>
      )}
      {/* the sides of a rectangle answer a tap while the Length tag may still go on */}
      {isTag && !S.walked && !S.walking && !S.tbOn && !won && f.sides.map((_s: string, i: number) => {
        const sd = side(i), inset = 40;
        const r = sd.vert
          ? { x: sd.a[0] - 36, y: Math.min(sd.a[1], sd.b[1]) + inset, w: 72, h: Math.abs(sd.b[1] - sd.a[1]) - 2 * inset }
          : { x: Math.min(sd.a[0], sd.b[0]) + inset, y: sd.a[1] - 36, w: Math.abs(sd.b[0] - sd.a[0]) - 2 * inset, h: 72 };
        return <Hit key={"hit" + i} id={i === longIdx ? "length" : "side-" + (i + 1)} x={r.x} y={r.y} w={r.w} h={r.h} label={"Side " + (i + 1)}
          onPress={() => { touch(); const was = inWork(); tagAct(i).then(() => keepFocus(was)); }} />;
      })}
      {/* the tag tray: waits at the foot until the Length tag goes on */}
      {isTag && S.tag === null && !S.tbOn && !won && (
        <g pointerEvents="none">
          {[[tray.len, tx("Length")], [tray.br, tx("Breadth")]].map(([b, l]: any, j: number) => (
            <g key={"tray" + j}>
              <rect x={b.x} y={b.y + 6} width={b.w} height={b.h - 12} rx={10} fill={tint(C.panel, 0.4)} stroke="none" />
              <text x={b.x + b.w / 2} y={b.y + b.h / 2 + (dev ? 12 : 11)} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{l}</text>
            </g>
          ))}
        </g>
      )}
      {/* the unit fact */}
      {factOn && !(showResult && isLots) && (() => {
        const s = factS, w = factW;
        return (
          <g filter="url(#ew-shadow)">
            <rect x={ox + 40} y={KY + (dev ? 6 : 10)} width={w} height={dev ? 60 : 52} rx={26} fill={tint(EW_C.given, 0.88)} stroke={tint(EW_C.given, 0.45)} strokeWidth={2} />
            {ewRow("fact", s, ox + 40 + w / 2, KY + (dev ? 48 : 45), T.label, C.ink, 700, "middle").el}
          </g>
        );
      })()}
      {/* the strip: the pencil writes the sum here as the ant walks */}
      {(ownLine || tbShow || showResult || !!hintLine) && <rect x={SB.x} y={SB.y} width={SB.w} height={SB.h} rx={16} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} filter="url(#ew-shadow)" />}
      {!tbShow && ownLine && !isLots && <PencilText text={expr} x={sx0} y={sBase} size={EW_SS} align="start" chars={S.walked ? expr.length : S.pc} />}
      {!tbShow && ownLine && isLots && (
        <g>
          <PencilText text="2 ×" x={sx0} y={sBase} size={EW_SS} align="start" chars={S.lots ? 3 : Math.min(3, S.lpc)} />
          {(S.lots || S.lpc >= 4) && <text x={xb1} y={sBase} fontSize={EW_SS} fontWeight={500} fill="#3F3F3F">(</text>}
          <PencilText text={lotsMid} x={x2} y={sBase} size={EW_SS} align="start" chars={S.lots ? lotsMid.length : Math.max(0, Math.min(lotsMid.length, S.lpc - 4))} />
          {(S.lots || S.lpc >= 5 + lotsMid.length) && <text x={xb2} y={sBase} fontSize={EW_SS} fontWeight={500} fill="#3F3F3F">)</text>}
        </g>
      )}
      {hintLine && <g pointerEvents="none">{ewRow("hint", hintLine, sx0, sBase, tbSize(hintLine), C.ink, 600).el}</g>}
      {showResult && kind === "taglen" && (
        <g>{ewRow("tl", tx("Length") + " = " + ewParse(f.rect[0]).v + " " + ewU(ewParse(f.rect[0]).u, lang), sx0, sBase, EW_SS, greenInk, 700).el}</g>
      )}
      {showResult && kind !== "taglen" && ownLine && (
        <g>{ewRow("ans", ansTxt, (isLots ? lotsEnd : sx0 + ewPenW(expr)) + 14, sBase, EW_SS, greenInk, 700).el}</g>
      )}
      {showResult && kind !== "taglen" && !ownLine && (
        <g>{ewRow("fl", fullLine, sx0, sBase, tbSize(fullLine + ansTxt), C.ink, 600, "", ansTxt, greenInk).el}</g>
      )}
      {showResult && isLots && (
        <g>{ewRow("chk", [L0, B0, L0, B0].join(" + ") + " = " + total + " " + ewU(unit, lang), ox + Wd / 2, KY + 48, EW_SS, greenInk, 700, "middle").el}</g>
      )}
      {/* the correction: drawn over the strip, never takes a tap */}
      {tbLine && (
        <g pointerEvents="none">
          <rect x={SB.x + 4} y={SB.y + 4} width={SB.w - 8} height={SB.h - 8} rx={12} fill="#FFFFFF" />
          {ewRow("ta", tbLine.a, sx0, sBase, tbSize(tbLine.a + tbLine.b), C.ink, 600, "", tbLine.b, greenInk).el}
        </g>
      )}
      {/* the one key (two in free play) */}
      {keyIds.map((id, j) => (
        <Key key={"act" + j} id={id} label={KEY_LABEL[id]} x={kb[j].x} y={kb[j].y} w={kb[j].w} h={kb[j].h} C={C} tone="key" onClick={() => press(id)}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{KEY_LABEL[id]}</text>
        </Key>
      ))}
      {keyIds.length === 1 && inviteOn && (stage !== "demo" || stepOn === keyIds[0]) && (
        <Invite x={kb[0].x + kb[0].w / 2} y={kb[0].y + kb[0].h / 2} w={kb[0].w} h={kb[0].h} rx={RAD.key} C={C} />
      )}
    </g>
  );
}

/* the summary page's small drawing: a rectangle of boundary and the child's answer with its unit */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const item = it || (result && result.last && PHASES[(n || 1) - 1] && PHASES[(n || 1) - 1].items[result.last.item]) || null;
  if (!item || !result || !result.last) return null;
  const f = EW_FIGS[item.fig];
  const txt = item.kind === "taglen" ? ewParse(f.rect[0]).v + " " + ewU(ewParse(f.rect[0]).u, lang) : slotPartsOf(result.last.value, 1)[0] + " " + ewU(ewUnitOf(item), lang);
  const P = ewFit(f.pts, { x: 14, y: 12, w: Math.min(w * 0.26, 64), h: h - 24 });
  const sx = Math.max(...P.map((p) => p[0])) + 14, fs = Math.max(T.micro, Math.min(T.label, (w - 14 - sx) / Math.max(1, ewW(txt, 1))));
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <polygon points={P.map((p) => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ")} fill="#FFFFFF" stroke={EW_C.walk} strokeWidth={5} strokeLinejoin="round" strokeLinecap="round" />
      <text x={w - 14} y={h / 2 + fs * 0.35} textAnchor="end" fontSize={fs} fontWeight={700} fill={ewDeep(EW_C.answer)}>{txt}</text>
    </g>
  );
}

/* the start page: the flower bed on squared paper, its boundary lit, the ant at a corner */
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  const P = ewFit(EW_FIGS.bed.pts, { x: box.w / 2 - 330, y: 40, w: 660, h: 250 });
  const poly = P.map((p) => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
  const xs = P.map((p) => p[0]), ys = P.map((p) => p[1]);
  const gx: number[] = []; for (let x = 34; x < box.w; x += 34) gx.push(x);
  const gy: number[] = []; for (let y = 34; y < box.h; y += 34) gy.push(y);
  return (
    <g>
      <defs>
        <clipPath id="ew-start-clip"><polygon points={poly} /></clipPath>
        <filter id="ew-start-shadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#1E293B" floodOpacity="0.14" />
        </filter>
      </defs>
      <rect x={0} y={0} width={box.w} height={box.h} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} filter="url(#ew-start-shadow)" />
      {gx.map((x, j) => <line key={"x" + j} x1={x} y1={2} x2={x} y2={box.h - 2} stroke={EW_C.grid} strokeWidth={1} opacity={0.45} />)}
      {gy.map((y, j) => <line key={"y" + j} x1={2} y1={y} x2={box.w - 2} y2={y} stroke={EW_C.grid} strokeWidth={1} opacity={0.45} />)}
      <polygon points={poly} fill="#F6E7C8" />
      <Skin name="bed" x={Math.min(...xs)} y={Math.min(...ys)} w={Math.max(...xs) - Math.min(...xs)} h={Math.max(...ys) - Math.min(...ys)} clip="url(#ew-start-clip)" />
      <polygon points={poly} fill="none" stroke="#FFFFFF" strokeWidth={16} strokeLinejoin="round" />
      <polygon points={poly} fill="none" stroke={EW_C.walk} strokeWidth={10} strokeLinejoin="round" strokeLinecap="round" />
      <g transform={`translate(${P[0][0]},${P[0][1]}) rotate(90)`} filter="url(#ew-start-shadow)">
        <ellipse cx={0} cy={14} rx={9} ry={13} fill="#7A3B1E" stroke="#3B1D0E" strokeWidth={2} />
        <circle cx={0} cy={-12} r={9} fill="#7A3B1E" stroke="#3B1D0E" strokeWidth={2} />
        <Skin name="ant" x={-20} y={-35} w={40} h={70} />
      </g>
      {(() => {
        const mx = (P[1][0] + P[2][0]) / 2, my = (P[1][1] + P[2][1]) / 2, bw = ewW(tx("Boundary"), T.label) + 36, bx = mx + 70, dv = lang === "hi" || lang === "gu", bh = dv ? 62 : 56;
        return (
          <g filter="url(#ew-start-shadow)">
            <line x1={mx + 6} y1={my} x2={bx} y2={my} stroke={EW_C.walk} strokeWidth={4} strokeLinecap="round" />
            <circle cx={mx + 4} cy={my} r={7} fill={EW_C.walk} />
            <rect x={bx} y={my - bh / 2} width={bw} height={bh} rx={bh / 2} fill="#FFFFFF" stroke={EW_C.walk} strokeWidth={3} />
            <text x={bx + bw / 2} y={my + (dv ? 13 : 11)} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ewDeep(EW_C.walk)}>{tx("Boundary")}</text>
          </g>
        );
      })()}
    </g>
  );
}

function EdgeWalker(props: any) {
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

export default EdgeWalker;