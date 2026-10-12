/* ═══ M1.S2.T5.C16.2D1 · square_counter · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md. */

const TOOL_ID = "square_counter";
const MEDIA_ID = "M1.S2.T5.C16.2D1";
const TOOL_NAME = "Square Counter";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A shape on squared paper and a tray of equal squares. How much space is inside it?"];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every shape covered edge to edge, every area written with its unit, and every edge counted apart.";
/* said when the child opens Free play from the summary page */
const FREE_LINE = "Free play. Lay the tiles anywhere on the sheet and count what they cover.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r21: `lineFor(line, lang, TR)`); the English
   everywhere else stays what the checks read. NCERT class 4 geometry: क्षेत्रफल / ક્ષેત્રફળ (area), परिमाप /
   પરિમિતિ (perimeter), वर्ग / ચોરસ (a square), टाइल / ટાઇલ (a tile), पंक्ति / હરોળ (a row), किनारा / ધાર (the
   edge round), सीमा / સીમા (the boundary), ग्रिड / જાળી (the grid), वर्ग इकाई / ચોરસ એકમ, वर्ग सेमी /
   ચોરસ સેમી. Digits stay digits: the runtime speaks them in the language in use. The last four keys of each
   language are the answer words the summary page's small drawing prints (`twice`, `sqcm`, `equal`, `row`).
   A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Square Counter": "वर्ग गिनो",
    "A shape on squared paper and a tray of equal squares. How much space is inside it?": "खानों वाले कागज़ पर एक आकृति है और बराबर वर्गों की एक ट्रे। इसके अंदर कितनी जगह है?",
    "Every shape covered edge to edge, every area written with its unit, and every edge counted apart.": "हर आकृति किनारे से किनारा मिलाकर ढकी। हर क्षेत्रफल इकाई के साथ लिखा, और हर परिमाप अलग गिना।",
    "Free play. Lay the tiles anywhere on the sheet and count what they cover.": "मुक्त खेल। टाइलें शीट पर कहीं भी बिछाओ और गिनो कि वे कितनी जगह ढकती हैं।",

    "Covering with equal squares": "बराबर वर्गों से ढकना",
    "The space inside a shape is called its area.": "आकृति के अंदर की जगह को उसका क्षेत्रफल कहते हैं।",
    "We measure it by covering the shape with equal squares.": "हम आकृति को बराबर वर्गों से ढककर उसे नापते हैं।",
    "Is there a gap or an overlap anywhere?": "क्या कहीं खाली जगह है, या कोई टाइल दूसरी पर चढ़ी है?",
    "Lay the tiles again, one row at a time, and count aloud.": "टाइलें फिर से बिछाओ, एक बार में एक पंक्ति, और ज़ोर से गिनो।",
    "Area is the space inside a boundary, counted in equal squares with no gaps and no overlaps.": "क्षेत्रफल सीमा के अंदर की जगह है। इसे बराबर वर्गों से गिनते हैं। न खाली जगह रहे, न वर्ग एक-दूसरे पर चढ़ें।",
    "You learned: area is the squares that cover the inside of a shape.": "तुमने सीखा: आकृति के अंदर को ढकने वाले वर्ग उसका क्षेत्रफल हैं।",
    "Cover the shape with tiles, edge to edge. How many squares fit inside the boundary?": "आकृति को टाइलों से ढको, किनारे से किनारा मिलाकर। सीमा के अंदर कितने वर्ग आते हैं?",
    "How many squares?": "कितने वर्ग?",
    "Is every tile inside the boundary?": "क्या हर टाइल सीमा के अंदर है?",
    "Here is a bigger shape. Cover it the same way and count the tiles that fit.": "यह एक बड़ी आकृति है। इसे भी इसी तरह ढको और गिनो कि कितनी टाइलें आती हैं।",
    "Squares in all?": "कुल कितने वर्ग?",
    "Count the tiles row by row, and do not skip one.": "टाइलें पंक्ति-पंक्ति गिनो, और कोई न छोड़ो।",
    "Two tiles lie partly on top of each other. Why does that spoil the count of the area?": "दो टाइलें आधी एक-दूसरी के ऊपर रखी हैं। इससे क्षेत्रफल की गिनती क्यों बिगड़ जाती है?",
    "counted twice": "दो बार गिना",
    "it evens out": "बराबर हो जाता है",
    "a square is lost": "एक वर्ग खो गया",
    "Why is the count spoilt?": "गिनती क्यों बिगड़ी?",
    "Look at the part where one tile lies on the other.": "वह हिस्सा देखो जहाँ एक टाइल दूसरी पर रखी है।",

    "Square centimetres": "वर्ग सेंटीमीटर",
    "Now each square on the grid is one centimetre along every side.": "अब ग्रिड का हर वर्ग हर तरफ़ से एक सेंटीमीटर का है।",
    "An area counted on this grid needs a square unit.": "इस ग्रिड पर गिने क्षेत्रफल के लिए वर्ग इकाई चाहिए।",
    "What is the size of one square on this grid?": "इस ग्रिड के एक वर्ग की माप क्या है?",
    "Turn the unit card and look at the square on it.": "इकाई कार्ड को पलटो और उस पर बना वर्ग देखो।",
    "A square one centimetre on every side is one square centimetre, the unit of area.": "जिस वर्ग की हर भुजा एक सेंटीमीटर हो, वह एक वर्ग सेंटीमीटर है। यही क्षेत्रफल की इकाई है।",
    "You learned: an area is written in square units, not in lengths.": "तुमने सीखा: क्षेत्रफल वर्ग इकाई में लिखते हैं, लंबाई में नहीं।",
    "Count the shaded squares on the grid. What is the area of the shaded shape?": "ग्रिड पर रंगे हुए वर्ग गिनो। रंगी हुई आकृति का क्षेत्रफल क्या है?",
    "Shaded squares?": "रंगे हुए वर्ग?",
    "How many squares are shaded?": "कितने वर्ग रंगे हैं?",
    "square cm": "वर्ग सेमी",
    "cm": "सेमी",
    "metres": "मीटर",
    "Five squares of this centimetre grid are shaded. Which unit is that area written in?": "इस सेंटीमीटर ग्रिड के 5 वर्ग रंगे हैं। वह क्षेत्रफल किस इकाई में लिखा जाता है?",
    "Which unit?": "कौन सी इकाई?",
    "A length is measured in centimetres. What does an area count?": "लंबाई सेंटीमीटर में नापी जाती है। क्षेत्रफल में क्या गिना जाता है?",
    "This shaded shape has a row of five squares with a row of four below it. What is its area?": "इस रंगी आकृति में ऊपर 5 वर्गों की पंक्ति है। उसके नीचे 4 वर्गों की पंक्ति है। इसका क्षेत्रफल क्या है?",
    "Area in squares?": "वर्गों में क्षेत्रफल?",
    "Count the top row, then the row under it.": "पहले ऊपर की पंक्ति गिनो, फिर उसके नीचे की।",

    "Rows instead of one by one": "एक-एक की जगह पंक्तियों से",
    "Counting one square at a time is slow and easy to lose.": "एक बार में एक वर्ग गिनना धीमा है, और गिनती आसानी से खो जाती है।",
    "A shape of equal rows can be counted row by row.": "बराबर पंक्तियों वाली आकृति को पंक्ति-पंक्ति गिना जा सकता है।",
    "How many rows are there, all the same?": "कितनी पंक्तियाँ हैं, सब एक जैसी?",
    "Add one row at a time and keep the total in your head.": "एक बार में एक पंक्ति जोड़ो और कुल संख्या याद रखो।",
    "Equal rows are counted by the rows, so one row counted is every row counted.": "बराबर पंक्तियाँ पंक्ति से गिनी जाती हैं। इसलिए एक पंक्ति गिनना हर पंक्ति गिनना है।",
    "You learned: equal rows are counted as rows times the squares in one.": "तुमने सीखा: पंक्तियाँ गुणा हर पंक्ति के वर्ग।",
    "This board is six rows of seven squares. Press the rows control and find its area.": "इस बोर्ड में 6 पंक्तियाँ हैं और हर पंक्ति में 7 वर्ग। पंक्ति वाला बटन दबाओ और इसका क्षेत्रफल ढूँढो।",
    "Area of the board?": "बोर्ड का क्षेत्रफल?",
    "How many squares are in one row?": "एक पंक्ति में कितने वर्ग हैं?",
    "A board has nine rows of nine squares. Copy the rows down and count them all.": "एक बोर्ड में 9 पंक्तियाँ हैं और हर पंक्ति में 9 वर्ग। पंक्तियाँ नीचे दोहराओ और सब वर्ग गिनो।",
    "Every row is the same. Count them as you copy them down.": "हर पंक्ति एक जैसी है। नीचे दोहराते हुए उन्हें गिनते जाओ।",
    "A path is laid in five rows of eight square tiles. How many tiles cover the path?": "रास्ते पर 5 पंक्तियाँ बिछी हैं, हर पंक्ति में 8 वर्ग टाइलें। रास्ते को कुल कितनी टाइलें ढकती हैं?",
    "Tiles in all?": "कुल कितनी टाइलें?",
    "Count one row first, then count the rows.": "पहले एक पंक्ति गिनो, फिर पंक्तियाँ गिनो।",
    "square units": "वर्ग इकाई",

    "Area and perimeter are different": "क्षेत्रफल और परिमाप अलग हैं",
    "The squares inside a shape and the edge round it are two different counts.": "आकृति के अंदर के वर्ग और चारों ओर का किनारा दो अलग गिनतियाँ हैं।",
    "Area counts the squares. Perimeter measures the edge.": "क्षेत्रफल वर्ग गिनता है। परिमाप किनारे को नापता है।",
    "Which unit goes with that count?": "उस गिनती के साथ कौन सी इकाई आती है?",
    "Walk the outside edge and count each square's side.": "बाहर के किनारे पर चलो और हर वर्ग की भुजा गिनो।",
    "Area counts the squares inside, in square units. Perimeter measures the edge round them, in centimetres.": "क्षेत्रफल अंदर के वर्ग गिनता है, वर्ग इकाई में। परिमाप उनके चारों ओर का किनारा नापता है, सेंटीमीटर में।",
    "You learned: area counts the squares inside, perimeter the edge round.": "तुमने सीखा: क्षेत्रफल अंदर के वर्ग, परिमाप चारों ओर का किनारा।",
    "inside": "अंदर",
    "round": "चारों ओर",
    "sq cm": "वर्ग सेमी",
    "A row of squares lies on the grid, each one centimetre along every side. Find the area and the perimeter.": "ग्रिड पर वर्गों की एक पंक्ति है। हर वर्ग की हर भुजा एक सेंटीमीटर की है। क्षेत्रफल और परिमाप ढूँढो।",
    "Area and edge?": "क्षेत्रफल और किनारा?",
    "Is the question asking for the squares inside or the edge round them?": "सवाल अंदर के वर्ग पूछ रहा है या उनके चारों ओर का किनारा?",
    "This rectangle is three squares long and two squares wide. Find both of its counts.": "यह आयत 3 वर्ग लंबा और 2 वर्ग चौड़ा है। इसकी दोनों गिनतियाँ ढूँढो।",
    "Inside and round?": "अंदर और चारों ओर?",
    "Count the squares first, then send the walker round the outside.": "पहले वर्ग गिनो, फिर चलने वाले को बाहर-बाहर घुमाओ।",
    "the row": "पंक्ति वाली",
    "the square": "वर्ग वाली",
    "the same": "दोनों बराबर",
    "One shape is three squares by three. The other is a row of squares. Which has the bigger area?": "एक आकृति 3 वर्ग लंबी और 3 वर्ग चौड़ी है। दूसरी वर्गों की एक पंक्ति है। किसका क्षेत्रफल बड़ा है?",
    "Bigger area?": "बड़ा क्षेत्रफल?",
    "Cover both shapes with tiles and count what is inside each.": "दोनों आकृतियों को टाइलों से ढको और हर एक के अंदर के वर्ग गिनो।",

    /* what the working area draws, and the summary page's small drawing */
    "Tiles laid": "बिछी टाइलें", "Rows laid": "बिछी पंक्तियाँ", "Squares shaded": "रंगे वर्ग", "Squares inside": "अंदर के वर्ग",
    "on a tile": "टाइल पर", "a gap": "खाली जगह", "outside": "बाहर",
    "equal tiles": "बराबर टाइलें", "Clear the sheet": "शीट साफ़ करो",
    "One square": "एक वर्ग", "Area": "क्षेत्रफल", "1 cm": "1 सेमी", "turn the card": "कार्ड पलटो",
    "Lay them again": "फिर से बिछाओ", "Copy a row down": "एक पंक्ति नीचे दोहराओ", "Walk the edge": "किनारे पर चलो",
    "twice": "दो बार", "sqcm": "वर्ग सेमी", "equal": "बराबर", "row": "पंक्ति",
  },
  gu: {
    "Square Counter": "ચોરસ ગણો",
    "A shape on squared paper and a tray of equal squares. How much space is inside it?": "ખાનાવાળા કાગળ પર એક આકૃતિ છે અને સરખા ચોરસની એક ટ્રે. તેની અંદર કેટલી જગ્યા છે?",
    "Every shape covered edge to edge, every area written with its unit, and every edge counted apart.": "દરેક આકૃતિ કિનારીથી કિનારી મળે તેમ ઢાંકી. દરેક ક્ષેત્રફળ એકમ સાથે લખ્યું, અને દરેક પરિમિતિ અલગ ગણી.",
    "Free play. Lay the tiles anywhere on the sheet and count what they cover.": "મુક્ત રમત. ટાઇલો શીટ પર ગમે ત્યાં મૂકો અને ગણો કે તે કેટલી જગ્યા ઢાંકે છે.",

    "Covering with equal squares": "સરખા ચોરસથી ઢાંકવું",
    "The space inside a shape is called its area.": "આકૃતિની અંદરની જગ્યાને તેનું ક્ષેત્રફળ કહેવાય છે.",
    "We measure it by covering the shape with equal squares.": "આપણે આકૃતિને સરખા ચોરસથી ઢાંકીને તેને માપીએ છીએ.",
    "Is there a gap or an overlap anywhere?": "શું ક્યાંક ખાલી જગ્યા છે, કે કોઈ ટાઇલ બીજી પર ચડી છે?",
    "Lay the tiles again, one row at a time, and count aloud.": "ટાઇલો ફરીથી મૂકો, એક વારમાં એક હરોળ, અને મોટેથી ગણો.",
    "Area is the space inside a boundary, counted in equal squares with no gaps and no overlaps.": "ક્ષેત્રફળ એટલે સીમાની અંદરની જગ્યા. તેને સરખા ચોરસથી ગણાય છે. ખાલી જગ્યા નહીં, અને ચોરસ એકબીજા પર નહીં.",
    "You learned: area is the squares that cover the inside of a shape.": "તમે શીખ્યા: આકૃતિની અંદર ઢાંકતા ચોરસ એટલે ક્ષેત્રફળ.",
    "Cover the shape with tiles, edge to edge. How many squares fit inside the boundary?": "આકૃતિને ટાઇલોથી ઢાંકો, કિનારીથી કિનારી મળે તેમ. સીમાની અંદર કેટલા ચોરસ સમાય છે?",
    "How many squares?": "કેટલા ચોરસ?",
    "Is every tile inside the boundary?": "શું દરેક ટાઇલ સીમાની અંદર છે?",
    "Here is a bigger shape. Cover it the same way and count the tiles that fit.": "આ એક મોટી આકૃતિ છે. તેને પણ એ જ રીતે ઢાંકો અને ગણો કે કેટલી ટાઇલ સમાય છે.",
    "Squares in all?": "કુલ કેટલા ચોરસ?",
    "Count the tiles row by row, and do not skip one.": "ટાઇલો હરોળ પ્રમાણે ગણો, અને એકેય ન છોડો.",
    "Two tiles lie partly on top of each other. Why does that spoil the count of the area?": "બે ટાઇલો અડધી એકબીજા પર મૂકી છે. તેનાથી ક્ષેત્રફળની ગણતરી કેમ બગડે છે?",
    "counted twice": "બે વાર ગણાય",
    "it evens out": "સરભર થઈ જાય",
    "a square is lost": "એક ચોરસ ખોવાય",
    "Why is the count spoilt?": "ગણતરી કેમ બગડી?",
    "Look at the part where one tile lies on the other.": "એ ભાગ જુઓ જ્યાં એક ટાઇલ બીજી પર મૂકી છે.",

    "Square centimetres": "ચોરસ સેન્ટિમીટર",
    "Now each square on the grid is one centimetre along every side.": "હવે જાળીનો દરેક ચોરસ દરેક બાજુએ એક સેન્ટિમીટરનો છે.",
    "An area counted on this grid needs a square unit.": "આ જાળી પર ગણેલા ક્ષેત્રફળ માટે ચોરસ એકમ જોઈએ.",
    "What is the size of one square on this grid?": "આ જાળીના એક ચોરસનું માપ શું છે?",
    "Turn the unit card and look at the square on it.": "એકમ કાર્ડ ફેરવો અને તેના પરનો ચોરસ જુઓ.",
    "A square one centimetre on every side is one square centimetre, the unit of area.": "જે ચોરસની દરેક બાજુ એક સેન્ટિમીટર હોય, તે એક ચોરસ સેન્ટિમીટર છે. તે ક્ષેત્રફળનો એકમ છે.",
    "You learned: an area is written in square units, not in lengths.": "તમે શીખ્યા: ક્ષેત્રફળ ચોરસ એકમમાં લખાય, લંબાઈમાં નહીં.",
    "Count the shaded squares on the grid. What is the area of the shaded shape?": "જાળી પર રંગેલા ચોરસ ગણો. રંગેલી આકૃતિનું ક્ષેત્રફળ કેટલું છે?",
    "Shaded squares?": "રંગેલા ચોરસ?",
    "How many squares are shaded?": "કેટલા ચોરસ રંગેલા છે?",
    "square cm": "ચોરસ સેમી",
    "cm": "સેમી",
    "metres": "મીટર",
    "Five squares of this centimetre grid are shaded. Which unit is that area written in?": "આ સેન્ટિમીટર જાળીના 5 ચોરસ રંગેલા છે. તે ક્ષેત્રફળ કયા એકમમાં લખાય છે?",
    "Which unit?": "કયો એકમ?",
    "A length is measured in centimetres. What does an area count?": "લંબાઈ સેન્ટિમીટરમાં મપાય છે. ક્ષેત્રફળમાં શું ગણાય છે?",
    "This shaded shape has a row of five squares with a row of four below it. What is its area?": "આ રંગેલી આકૃતિમાં ઉપર 5 ચોરસની હરોળ છે. તેની નીચે 4 ચોરસની હરોળ છે. તેનું ક્ષેત્રફળ કેટલું છે?",
    "Area in squares?": "ચોરસમાં ક્ષેત્રફળ?",
    "Count the top row, then the row under it.": "પહેલા ઉપરની હરોળ ગણો, પછી તેની નીચેની.",

    "Rows instead of one by one": "એક-એકને બદલે હરોળથી",
    "Counting one square at a time is slow and easy to lose.": "એક વારમાં એક ચોરસ ગણવું ધીમું છે. ગણતરી સહેલાઈથી ખોવાઈ જાય છે.",
    "A shape of equal rows can be counted row by row.": "સરખી હરોળવાળી આકૃતિને હરોળ પ્રમાણે ગણી શકાય.",
    "How many rows are there, all the same?": "કેટલી હરોળ છે, બધી સરખી?",
    "Add one row at a time and keep the total in your head.": "એક વારમાં એક હરોળ ઉમેરો અને કુલ સંખ્યા યાદ રાખો.",
    "Equal rows are counted by the rows, so one row counted is every row counted.": "સરખી હરોળ હરોળ પ્રમાણે ગણાય છે. એટલે એક હરોળ ગણવી એટલે દરેક હરોળ ગણવી.",
    "You learned: equal rows are counted as rows times the squares in one.": "તમે શીખ્યા: હરોળ ગુણ્યા દરેક હરોળના ચોરસ.",
    "This board is six rows of seven squares. Press the rows control and find its area.": "આ બોર્ડમાં 6 હરોળ છે અને દરેક હરોળમાં 7 ચોરસ. હરોળનું બટન દબાવો અને તેનું ક્ષેત્રફળ શોધો.",
    "Area of the board?": "બોર્ડનું ક્ષેત્રફળ?",
    "How many squares are in one row?": "એક હરોળમાં કેટલા ચોરસ છે?",
    "A board has nine rows of nine squares. Copy the rows down and count them all.": "એક બોર્ડમાં 9 હરોળ છે અને દરેક હરોળમાં 9 ચોરસ. હરોળ નીચે દોહરાવો અને બધા ચોરસ ગણો.",
    "Every row is the same. Count them as you copy them down.": "દરેક હરોળ સરખી છે. નીચે દોહરાવતા જાઓ અને ગણતા જાઓ.",
    "A path is laid in five rows of eight square tiles. How many tiles cover the path?": "રસ્તા પર ચોરસ ટાઇલોની 5 હરોળ પાથરી છે, દરેક હરોળમાં 8 ટાઇલ. રસ્તાને કુલ કેટલી ટાઇલ ઢાંકે છે?",
    "Tiles in all?": "કુલ કેટલી ટાઇલ?",
    "Count one row first, then count the rows.": "પહેલા એક હરોળ ગણો, પછી હરોળ ગણો.",
    "square units": "ચોરસ એકમ",

    "Area and perimeter are different": "ક્ષેત્રફળ અને પરિમિતિ અલગ છે",
    "The squares inside a shape and the edge round it are two different counts.": "આકૃતિની અંદરના ચોરસ અને તેની ચારેબાજુની ધાર, એ બે અલગ ગણતરી છે.",
    "Area counts the squares. Perimeter measures the edge.": "ક્ષેત્રફળ ચોરસ ગણે છે. પરિમિતિ ધારને માપે છે.",
    "Which unit goes with that count?": "એ ગણતરી સાથે કયો એકમ આવે છે?",
    "Walk the outside edge and count each square's side.": "બહારની ધાર પર ચાલો અને દરેક ચોરસની બાજુ ગણો.",
    "Area counts the squares inside, in square units. Perimeter measures the edge round them, in centimetres.": "ક્ષેત્રફળ અંદરના ચોરસ ગણે છે, ચોરસ એકમમાં. પરિમિતિ તેમની ચારેબાજુની ધાર માપે છે, સેન્ટિમીટરમાં.",
    "You learned: area counts the squares inside, perimeter the edge round.": "તમે શીખ્યા: ક્ષેત્રફળ અંદરના ચોરસ, પરિમિતિ ચારેબાજુની ધાર.",
    "inside": "અંદર",
    "round": "ચારેબાજુ",
    "sq cm": "ચોરસ સેમી",
    "A row of squares lies on the grid, each one centimetre along every side. Find the area and the perimeter.": "જાળી પર ચોરસની એક હરોળ છે. દરેક ચોરસની દરેક બાજુ એક સેન્ટિમીટર છે. ક્ષેત્રફળ અને પરિમિતિ શોધો.",
    "Area and edge?": "ક્ષેત્રફળ અને ધાર?",
    "Is the question asking for the squares inside or the edge round them?": "પ્રશ્ન અંદરના ચોરસ પૂછે છે કે તેમની ચારેબાજુની ધાર?",
    "This rectangle is three squares long and two squares wide. Find both of its counts.": "આ લંબચોરસ 3 ચોરસ લાંબો અને 2 ચોરસ પહોળો છે. તેની બંને ગણતરી શોધો.",
    "Inside and round?": "અંદર અને ચારેબાજુ?",
    "Count the squares first, then send the walker round the outside.": "પહેલા ચોરસ ગણો, પછી ચાલનારને બહારની ધાર પર ફેરવો.",
    "the row": "હરોળવાળી",
    "the square": "ચોરસવાળી",
    "the same": "બંને સરખા",
    "One shape is three squares by three. The other is a row of squares. Which has the bigger area?": "એક આકૃતિ 3 ચોરસ લાંબી અને 3 ચોરસ પહોળી છે. બીજી ચોરસની એક હરોળ છે. કોનું ક્ષેત્રફળ મોટું છે?",
    "Bigger area?": "મોટું ક્ષેત્રફળ?",
    "Cover both shapes with tiles and count what is inside each.": "બંને આકૃતિઓને ટાઇલોથી ઢાંકો અને દરેકની અંદરના ચોરસ ગણો.",

    /* what the working area draws, and the summary page's small drawing */
    "Tiles laid": "મૂકેલી ટાઇલ", "Rows laid": "મૂકેલી હરોળ", "Squares shaded": "રંગેલા ચોરસ", "Squares inside": "અંદરના ચોરસ",
    "on a tile": "ટાઇલ પર", "a gap": "ખાલી જગ્યા", "outside": "બહાર",
    "equal tiles": "સરખી ટાઇલ", "Clear the sheet": "શીટ સાફ કરો",
    "One square": "એક ચોરસ", "Area": "ક્ષેત્રફળ", "1 cm": "1 સેમી", "turn the card": "કાર્ડ ફેરવો",
    "Lay them again": "ફરી મૂકો", "Copy a row down": "એક હરોળ નીચે દોહરાવો", "Walk the edge": "ધાર પર ચાલો",
    "twice": "બે વાર", "sqcm": "ચોરસ સેમી", "equal": "સરખા", "row": "હરોળ",
  },
};

const PHASES = [
  {
    n: 1,
    concept: "Covering with equal squares",
    conceptId: "M1.S2.T5.C16", objectiveIds: ["O7"],
    says: ["The space inside a shape is called its area.", "We measure it by covering the shape with equal squares."],
    ladder: ["Is there a gap or an overlap anywhere?", "Lay the tiles again, one row at a time, and count aloud."],
    closing: "Area is the space inside a boundary, counted in equal squares with no gaps and no overlaps.",
    learned: "You learned: area is the squares that cover the inside of a shape.",
    traceback: "The squares inside the boundary light one row at a time and the count lands on the whole area.",
    items: [
      /* learn ML1: answer in the plan = Eighteen square units */
      { qid: "M1.S2.T5.C16:ML1", kind: "cover", answer: 18, near: 54, winMs: 3200,
        say: "Cover the shape with tiles, edge to edge. How many squares fit inside the boundary?",
        ask: "How many squares?", miss: "Is every tile inside the boundary?" },
      /* practice 1: answer in the plan = Twenty-four square units */
      { qid: "M1.S2.T5.C16:1", kind: "cover", answer: 24, near: 28, winMs: 3200,
        say: "Here is a bigger shape. Cover it the same way and count the tiles that fit.",
        ask: "Squares in all?", miss: "Count the tiles row by row, and do not skip one." },
      /* practice 2: answer in the plan = The space where they overlap is counted twice, so the tiles
         must meet edge to edge with no overlaps. Asked as a word choice (the reason, not a count). */
      { qid: "M1.S2.T5.C16:2", kind: "lap", answer: "twice", near: "evens", winMs: 3600,
        choices: [{ id: "twice", label: "counted twice" }, { id: "evens", label: "it evens out" }, { id: "lost", label: "a square is lost" }],
        say: "Two tiles lie partly on top of each other. Why does that spoil the count of the area?",
        ask: "Why is the count spoilt?", miss: "Look at the part where one tile lies on the other." },
    ],
  },
  {
    n: 2,
    concept: "Square centimetres",
    conceptId: "M1.S2.T5.C17", objectiveIds: ["O7"],
    says: ["Now each square on the grid is one centimetre along every side.", "An area counted on this grid needs a square unit."],
    ladder: ["What is the size of one square on this grid?", "Turn the unit card and look at the square on it."],
    closing: "A square one centimetre on every side is one square centimetre, the unit of area.",
    learned: "You learned: an area is written in square units, not in lengths.",
    traceback: "The unit card turns to its measured square and the shaded squares are counted again to the area.",
    items: [
      /* learn ML2: answer in the plan = Seven square centimetres */
      { qid: "M1.S2.T5.C17:ML2", kind: "shade", answer: 7, near: 6, winMs: 3200,
        say: "Count the shaded squares on the grid. What is the area of the shaded shape?",
        ask: "Shaded squares?", miss: "How many squares are shaded?" },
      /* practice 3: answer in the plan = Five square centimetres. Asked as the unit of that area,
         which is what this phase settles (the misconception is writing a length for an area). */
      { qid: "M1.S2.T5.C17:3", kind: "shade", answer: "sqcm", near: "cm", winMs: 3600,
        choices: [{ id: "sqcm", label: "square cm" }, { id: "cm", label: "cm" }, { id: "m", label: "metres" }],
        say: "Five squares of this centimetre grid are shaded. Which unit is that area written in?",
        ask: "Which unit?", miss: "A length is measured in centimetres. What does an area count?" },
      /* practice 4: answer in the plan = Nine square centimetres */
      { qid: "M1.S2.T5.C17:4", kind: "shade", answer: 9, near: 5, winMs: 3200,
        say: "This shaded shape has a row of five squares with a row of four below it. What is its area?",
        ask: "Area in squares?", miss: "Count the top row, then the row under it." },
    ],
  },
  {
    n: 3,
    concept: "Rows instead of one by one",
    conceptId: "M1.S2.T5.C18", objectiveIds: ["O8"],
    says: ["Counting one square at a time is slow and easy to lose.", "A shape of equal rows can be counted row by row."],
    ladder: ["How many rows are there, all the same?", "Add one row at a time and keep the total in your head."],
    closing: "Equal rows are counted by the rows, so one row counted is every row counted.",
    learned: "You learned: equal rows are counted as rows times the squares in one.",
    traceback: "The rows copy down one at a time with the total beside each row, ending on the whole board.",
    items: [
      /* learn ML3: answer in the plan = Forty-two square centimetres */
      { qid: "M1.S2.T5.C18:ML3", kind: "rows", answer: 42, near: 13, winMs: 3600,
        say: "This board is six rows of seven squares. Press the rows control and find its area.",
        ask: "Area of the board?", miss: "How many squares are in one row?" },
      /* practice 5: answer in the plan = Eighty-one square centimetres, nine rows of nine */
      { qid: "M1.S2.T5.C18:5", kind: "rows", answer: 81, near: 18, winMs: 3600,
        say: "A board has nine rows of nine squares. Copy the rows down and count them all.",
        ask: "Squares in all?", miss: "Every row is the same. Count them as you copy them down." },
      /* practice 6: answer in the plan = Forty square units, five rows of eight */
      { qid: "M1.S2.T5.C18:6", kind: "rows", answer: 40, near: 8, winMs: 3600, unit: "square units",
        say: "A path is laid in five rows of eight square tiles. How many tiles cover the path?",
        ask: "Tiles in all?", miss: "Count one row first, then count the rows." },
    ],
  },
  {
    n: 4,
    concept: "Area and perimeter are different",
    conceptId: "M1.S2.T5.C19", objectiveIds: ["O8"],
    says: ["The squares inside a shape and the edge round it are two different counts.", "Area counts the squares. Perimeter measures the edge."],
    ladder: ["Which unit goes with that count?", "Walk the outside edge and count each square's side."],
    closing: "Area counts the squares inside, in square units. Perimeter measures the edge round them, in centimetres.",
    learned: "You learned: area counts the squares inside, perimeter the edge round.",
    traceback: "The squares inside are counted into the bay, then the walker goes round and both counts stand.",
    items: [
      /* learn ML4: answer in the plan = area six square centimetres, perimeter fourteen centimetres */
      { qid: "M1.S2.T5.C19:ML4", kind: "cmp", parts: [{ label: "inside", unit: "sq cm" }, { label: "round", unit: "cm" }],
        answer: [6, 14], near: [6, 6], winMs: 4200,
        say: "A row of squares lies on the grid, each one centimetre along every side. Find the area and the perimeter.",
        ask: "Area and edge?", miss: "Is the question asking for the squares inside or the edge round them?" },
      /* practice 7: answer in the plan = area six square centimetres, perimeter ten centimetres */
      { qid: "M1.S2.T5.C19:7", kind: "cmp", parts: [{ label: "inside", unit: "sq cm" }, { label: "round", unit: "cm" }],
        answer: [6, 10], near: [6, 6], winMs: 4200,
        say: "This rectangle is three squares long and two squares wide. Find both of its counts.",
        ask: "Inside and round?", miss: "Count the squares first, then send the walker round the outside." },
      /* practice 8: answer in the plan = both have an area of nine square centimetres, while the
         perimeters are twelve and twenty centimetres. Asked as the choice the misconception turns on. */
      { qid: "M1.S2.T5.C19:8", kind: "cmp", answer: "equal", near: "row", winMs: 4200,
        choices: [{ id: "row", label: "the row" }, { id: "square", label: "the square" }, { id: "equal", label: "the same" }],
        say: "One shape is three squares by three. The other is a row of squares. Which has the bigger area?",
        ask: "Bigger area?", miss: "Cover both shapes with tiles and count what is inside each." },
    ],
  },
];

/* The sheet, the bay, the tray, the control strip and every shape the working area draws.
   A shape is a list of row lengths (runs) starting at column `at`; a board is cols x rows. */
const MODEL = {
  sheet: { x: 8, y: 12, w: 648, h: 432 },
  bay: { x: 696, y: 12, w: 390, h: 424 },
  ctl: { x: 696, y: 448, w: 390, h: 72 },
  tray: { x: 8, y: 448, w: 648, h: 72 },
  free: { kind: "cover", cell: 72, cols: 9, rows: 6, runs: [9, 9, 9, 9, 9, 9], at: 0 },
  items: [
    [
      { kind: "cover", cell: 72, cols: 9, rows: 6, runs: [4, 4, 4, 6], at: 1, top: 1 },
      { kind: "cover", cell: 72, cols: 9, rows: 6, runs: [5, 5, 7, 7], at: 1, top: 1 },
      { kind: "lap", cell: 72, cols: 9, rows: 6, at: 3, top: 2 },
    ],
    [
      { kind: "shade", cell: 64, cols: 9, rows: 6, runs: [3, 3, 1], at: 3, top: 2 },
      { kind: "shade", cell: 64, cols: 9, rows: 6, runs: [5], at: 2, top: 3 },
      { kind: "shade", cell: 64, cols: 9, rows: 6, runs: [5, 4], at: 2, top: 2 },
    ],
    [
      { kind: "rows", cell: 68, cols: 7, rows: 6 },
      { kind: "rows", cell: 46, cols: 9, rows: 9 },
      { kind: "rows", cell: 62, cols: 8, rows: 5 },
    ],
    [
      { kind: "cmp", cell: 92, shapes: [[6, 1]] },
      { kind: "cmp", cell: 116, shapes: [[3, 2]] },
      { kind: "cmp", cell: 66, shapes: [[3, 3], [9, 1]] },
    ],
  ],
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (item.choices) return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};

/* oracle: every answer re-derived from MODEL by a second route. Areas are counted by filling a
   boolean grid cell by cell (never by the run lengths the picture draws with) and boards by
   repeated addition; a perimeter is counted as the cell sides that have no neighbour. */
const oracle = () => {
  const fill = (s: any) => {
    const g: any = {};
    if (s.runs) s.runs.forEach((len: number, r: number) => { for (let i = 0; i < len; i++) g[(s.at + i) + "," + r] = 1; });
    else for (let r = 0; r < s.rows; r++) for (let c = 0; c < s.cols; c++) g[c + "," + r] = 1;
    return g;
  };
  const size = (g: any) => Object.keys(g).length;
  const edges = (g: any) => {
    let e = 0;
    Object.keys(g).forEach((k) => {
      const c = +k.split(",")[0], r = +k.split(",")[1];
      [[c + 1, r], [c - 1, r], [c, r + 1], [c, r - 1]].forEach((p) => { if (!g[p[0] + "," + p[1]]) e++; });
    });
    return e;
  };
  const byAdding = (s: any) => { let t = 0; for (let j = 0; j < s.rows; j++) t += s.cols; return t; };
  let ok = true;
  PHASES.forEach((p: any, pi: number) => p.items.forEach((it: any, k: number) => {
    const s: any = MODEL.items[pi][k];
    if (it.parts) {
      const one: any = { rows: s.shapes[0][1], cols: s.shapes[0][0] };
      const g = fill(one);
      if (it.answer[0] !== size(g) || it.answer[1] !== edges(g)) ok = false;
    } else if (typeof it.answer === "number") {
      const want = s.kind === "rows" ? byAdding(s) : size(fill(s));
      if (it.answer !== want) ok = false;
    } else {
      /* a word choice: the reason, not a count. It must be one of the offered ids, and the two
         shapes of the compare item must really cover the same number of squares. */
      if (!it.choices.some((c: any) => c.id === it.answer)) ok = false;
      if (s.kind === "cmp") {
        const a = size(fill({ cols: s.shapes[0][0], rows: s.shapes[0][1] }));
        const b = size(fill({ cols: s.shapes[1][0], rows: s.shapes[1][1] }));
        if ((a === b) !== (it.answer === "equal")) ok = false;
      }
    }
  }));
  return ok;
};

/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => (item.near !== undefined ? item.near
  : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.parts ? item.answer.filter((x: any) => typeof x === "number" && x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
  : [String(item.answer)]);
const agentKey = (item: any) => item.answer;

const HOOK: any = {};
const solve = (item: any, T2: any) => T2.submit(item.answer);
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area: 1086 x 528 ───────────────────────────────────────────────────────── */

const SQ_AREA = CONTENT.one;      /* the squares that cover an inside: green */
const SQ_EDGE = CONTENT.ten;      /* a length walked or measured: amber */
const SQ_FIG = CONTENT.hundred;   /* the figure's own boundary: deep blue */

/* the cells of a shape, as [col, row] pairs */
const sqCells = (s: any) => {
  const out: any[] = [];
  if (s.runs) s.runs.forEach((len: number, r: number) => { for (let i = 0; i < len; i++) out.push([s.at + i, (s.top || 0) + r]); });
  else for (let r = 0; r < s.rows; r++) for (let c = 0; c < s.cols; c++) out.push([c, r]);
  return out;
};
/* the unit sides of a rectangle, in walking order (top, right, bottom, left) */
const sqRing = (cols: number, rows: number) => {
  const e: any[] = [];
  for (let i = 0; i < cols; i++) e.push([i, 0, i + 1, 0]);
  for (let j = 0; j < rows; j++) e.push([cols, j, cols, j + 1]);
  for (let i = cols; i > 0; i--) e.push([i, rows, i - 1, rows]);
  for (let j = rows; j > 0; j--) e.push([0, j, 0, j - 1]);
  return e;
};

function SqGrid({ x, y, cols, rows, cell, C }: any) {
  const line = mix(C.ink, C.paper, 0.25);
  const v: any[] = [], h: any[] = [];
  for (let i = 0; i <= cols; i++) v.push(<line key={"v" + i} x1={x + i * cell} y1={y} x2={x + i * cell} y2={y + rows * cell} stroke={line} strokeWidth={1.5} />);
  for (let j = 0; j <= rows; j++) h.push(<line key={"h" + j} x1={x} y1={y + j * cell} x2={x + cols * cell} y2={y + j * cell} stroke={line} strokeWidth={1.5} />);
  return <g>{v}{h}</g>;
}

function SqTile({ x, y, s, lift, dim }: any) {
  return (
    <g filter={lift ? "url(#fLift)" : "url(#fShadowSoft)"}>
      <rect x={x} y={y} width={s} height={s} rx={5} fill="url(#gOne)"
        fillOpacity={dim ? 0.45 : 1} stroke={shade(SQ_AREA, 0.2)} strokeWidth={2} />
      <path d={`M ${x + 10} ${y + 9} H ${x + s - 10}`} stroke="#FFFFFF" strokeOpacity={0.55} strokeWidth={3} strokeLinecap="round" />
    </g>
  );
}

/* the outline of a set of cells: every cell side that has no neighbour */
function SqOutline({ cells, x, y, cell, colour, width }: any) {
  const set: any = {};
  cells.forEach((p: any) => { set[p[0] + "," + p[1]] = 1; });
  const segs: any[] = [];
  cells.forEach((p: any) => {
    const c = p[0], r = p[1], X = x + c * cell, Y = y + r * cell;
    if (!set[c + "," + (r - 1)]) segs.push([X, Y, X + cell, Y]);
    if (!set[c + "," + (r + 1)]) segs.push([X, Y + cell, X + cell, Y + cell]);
    if (!set[(c - 1) + "," + r]) segs.push([X, Y, X, Y + cell]);
    if (!set[(c + 1) + "," + r]) segs.push([X + cell, Y, X + cell, Y + cell]);
  });
  return <g>{segs.map((s, i) => <line key={i} x1={s[0]} y1={s[1]} x2={s[2]} y2={s[3]} stroke={colour} strokeWidth={width || 6} strokeLinecap="round" />)}</g>;
}

/* where a count lands: an empty white box while the question is open, the number once it is answered */
function SqCount({ x, y, w, h, value, unit, C }: any) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={18} fill={C.paper} stroke={C.rule} strokeWidth={2} />
      {value !== null && value !== undefined &&
        <text x={x + w / 2} y={y + h / 2 + 26} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={shade(SQ_AREA, 0.25)}>{value}</text>}
      {unit && <text x={x + w / 2} y={y + h + 40} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{unit}</text>}
    </g>
  );
}

function Work({ n, item, index, stage, wrong, api, MODEL, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const list = MODEL.items[Math.max(0, Math.min(3, (n || 1) - 1))];
  const idx = Math.max(0, Math.min(list.length - 1, index || 0));
  const spec = free ? MODEL.free : list[idx];
  const it = item || {};

  const [laid, setLaid] = useState<any>({});
  const [lap, setLap] = useState<any>(null);
  const [bad, setBad] = useState<any>(null);
  const [flip, setFlip] = useState(false);
  const [rows, setRows] = useState(1);
  const [walk, setWalk] = useState(0);
  const [tb, setTb] = useState<any>(null);

  api.onEnter(null);

  useEffect(() => {
    setLaid({}); setLap(null); setBad(null); setFlip(false); setRows(1); setWalk(0); setTb(null);
  }, [n, idx, free]);

  const clearTb = () => { if (tb) setTb(null); };

  /* ── the traceback: redraw the maths, end on the whole right answer ───────────────── */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    const steps: any[] = [];
    if (spec.kind === "cover" || spec.kind === "shade") {
      if (spec.kind === "shade") steps.push([600, () => setTb({ flip: true, lit: 0, tally: 0 })]);
      let acc = 0;
      spec.runs.forEach((len: number, r: number) => {
        acc += len; const upto = r + 1, t = acc;
        steps.push([560, () => setTb({ flip: true, lit: upto, tally: t })]);
      });
      steps.push([1000, () => setTb({ flip: true, lit: spec.runs.length, tally: acc, done: true })]);
    } else if (spec.kind === "lap") {
      steps.push([800, () => setTb({ lap: "apart" })]);
      steps.push([900, () => setTb({ lap: "over" })]);
      steps.push([1200, () => setTb({ lap: "over", done: true })]);
    } else if (spec.kind === "rows") {
      for (let k = 1; k <= spec.rows; k++) {
        const kk = k;
        steps.push([500, () => setTb({ rows: kk, tally: kk * spec.cols })]);
      }
      steps.push([1100, () => setTb({ rows: spec.rows, tally: spec.rows * spec.cols, done: true })]);
    } else {
      steps.push([900, () => setTb({ inside: true })]);
      spec.shapes.forEach((sh: any, si: number) => {
        const per = 2 * (sh[0] + sh[1]);
        for (let e = 1; e <= per; e++) { const ee = e; steps.push([165, () => setTb({ inside: true, walk: { si, e: ee } })]); }
      });
      const last = spec.shapes.length - 1, lastPer = 2 * (spec.shapes[last][0] + spec.shapes[last][1]);
      steps.push([1200, () => setTb({ inside: true, walk: { si: last, e: lastPer }, done: true })]);
    }
    tl.run(steps, () => api.lock(false));
  }, [wrong]);

  /* ── dragging a tile (phase 1 and Free play) ─────────────────────────────────────── */
  const sheet = MODEL.sheet, cell = spec.cell;
  const gx = sheet.x, gy = sheet.y;
  const cells = spec.kind === "cover" ? sqCells(spec) : [];
  const inShape: any = {};
  cells.forEach((p: any) => { inShape[p[0] + "," + p[1]] = 1; });
  const nLaid = Object.keys(laid).length;

  const nextFree = () => {
    for (let i = 0; i < cells.length; i++) { const k = cells[i][0] + "," + cells[i][1]; if (!laid[k]) return cells[i]; }
    return null;
  };
  const touches = (c: number, r: number) => nLaid === 0 || !!(laid[(c - 1) + "," + r] || laid[(c + 1) + "," + r] || laid[c + "," + (r - 1)] || laid[c + "," + (r + 1)]);

  const drag = useDrag((pay: any, at: any, moved: boolean) => {
    if (stage !== "ask" && stage !== "free") return;
    clearTb();
    if (spec.kind === "lap") {
      const half = cell / 2;
      const p = isNaN(at.x) ? { x: (lap ? lap.x : (spec.at + 1) * cell + gx - half) + cell, y: (lap ? lap.y : (spec.top + 0.5) * cell + gy) } : { x: at.x - half, y: at.y - half };
      setLap({ x: Math.max(gx, Math.min(gx + spec.cols * cell - cell, p.x)), y: Math.max(gy, Math.min(gy + spec.rows * cell - cell, p.y)) });
      api.sfx.tick();
      return;
    }
    if (spec.kind !== "cover") return;
    let c: number, r: number;
    if (isNaN(at.x)) { const f = nextFree(); if (!f) return; c = f[0]; r = f[1]; }
    else { c = Math.floor((at.x - gx) / cell); r = Math.floor((at.y - gy) / cell); }
    const k = c + "," + r;
    if (!inShape[k]) { setBad({ c, r, kind: "out" }); return; }
    if (laid[k]) { setBad({ c, r, kind: "over" }); return; }
    if (!free && !touches(c, r)) { setBad({ c, r, kind: "gap" }); return; }
    setBad(null);
    setLaid((s: any) => { const o: any = {}; Object.keys(s).forEach((q) => { o[q] = 1; }); o[k] = 1; return o; });
    api.sfx.tick();
  });

  /* ── the controls of phases 2, 3 and 4 ───────────────────────────────────────────── */
  const turnCard = () => { clearTb(); setFlip((f: boolean) => !f); api.sfx.tick(); };
  const addRow = () => {
    clearTb();
    if (rows >= spec.rows) { setRows(1); return; }
    setRows((r: number) => r + 1); api.sfx.tick();
  };
  const walkEdge = () => {
    clearTb();
    const tot = spec.shapes.reduce((a: number, s: any) => a + 2 * (s[0] + s[1]), 0);
    if (walk >= tot) { setWalk(0); return; }
    const steps: any[] = [];
    for (let e = walk + 1; e <= tot; e++) { const ee = e; steps.push([150, () => setWalk(ee)]); }
    tl.run(steps);
    api.sfx.tick();
  };
  const clearSheet = () => { clearTb(); setLaid({}); setBad(null); };

  api.share({
    phase: n, shape: spec.kind, tilesLaid: nLaid, rows: spec.kind === "rows" ? rows : null,
    perRow: spec.kind === "rows" ? spec.cols : null, unit: flip ? "square centimetre" : null,
    edgeCount: spec.kind === "cmp" ? walk : null, complete: stage === "idle",
  });

  /* ── what is drawn ───────────────────────────────────────────────────────────────── */
  const shown = !!wrong || stage === "win" || stage === "idle" || stage === "summary";
  const runsLabel = tx(free ? "Tiles laid" : n === 3 ? "Rows laid" : n === 2 ? "Squares shaded" : "Squares inside");
  const runsValue = free ? nLaid : n === 3 ? (tb && tb.rows ? tb.rows : rows)
    : tb && tb.tally !== undefined ? tb.tally
    : typeof it.answer === "number" ? it.answer : Array.isArray(it.answer) ? it.answer[0] : null;
  const runsShow = free || n === 3 || (shown && runsValue !== null);

  const bayTitle = n === 2 ? tx("One square") : n === 4 ? null : tx("Area");
  const unitWord = tx(it.unit || (n === 1 ? "square units" : "square cm"));

  const bcx = MODEL.bay.x + MODEL.bay.w / 2;
  const tallyNow = tb && tb.tally !== undefined ? tb.tally : shown && typeof it.answer === "number" ? it.answer : null;
  const unitNow = !!(tb && tb.done) || stage === "win" || stage === "idle" ? unitWord : null;

  return (
    <g>
      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill={tint(C.panel, 0.5)} stroke={C.rule} strokeWidth={2} />
        <text x={18} y={-42} fontSize={T.micro} fontWeight={600} fill={C.ink}>{runsLabel}</text>
        {runsShow
          ? <text x={312} y={-38} textAnchor="end" fontSize={T.prompt} fontWeight={700} fill={shade(n === 3 ? SQ_EDGE : SQ_AREA, 0.25)}>{runsValue}</text>
          : <line x1={250} y1={-44} x2={312} y2={-44} stroke={C.rule} strokeWidth={4} strokeLinecap="round" />}
      </g>

      {/* ── phase 1 and Free play: a sheet, a boundary and a tray of equal tiles ── */}
      {(spec.kind === "cover" || spec.kind === "lap") && (
        <g>
          {spec.kind === "cover" && !free && cells.map((p: any, i: number) => (
            <rect key={"in" + i} x={gx + p[0] * cell} y={gy + p[1] * cell} width={cell} height={cell} fill={tint(C.panel, 0.3)} />
          ))}
          <SqGrid x={gx} y={gy} cols={spec.cols} rows={spec.rows} cell={cell} C={C} />
          {spec.kind === "cover" && !free && <SqOutline cells={cells} x={gx} y={gy} cell={cell} colour={SQ_FIG} width={7} />}
          {Object.keys(laid).map((k) => {
            const c = +k.split(",")[0], r = +k.split(",")[1];
            return <SqTile key={k} x={gx + c * cell} y={gy + r * cell} s={cell} />;
          })}
          {tb && tb.lit !== undefined && cells.filter((p: any) => p[1] < (spec.top || 0) + tb.lit).map((p: any) => (
            <rect key={"t" + p[0] + p[1]} x={gx + p[0] * cell} y={gy + p[1] * cell} width={cell} height={cell}
              rx={5} fill={SQ_AREA} fillOpacity={0.5} stroke={shade(SQ_AREA, 0.25)} strokeWidth={3} />
          ))}
          {bad && !tb && (
            <g>
              <rect x={gx + bad.c * cell + 4} y={gy + bad.r * cell + 4} width={cell - 8} height={cell - 8} rx={RAD.piece}
                fill={SQ_EDGE} fillOpacity={0.22} stroke={shade(SQ_EDGE, 0.2)} strokeWidth={5} />
              <text x={gx + bad.c * cell + cell / 2} y={gy + bad.r * cell - 10} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={shade(SQ_EDGE, 0.3)}>
                {tx(bad.kind === "over" ? "on a tile" : bad.kind === "gap" ? "a gap" : "outside")}
              </text>
            </g>
          )}
          {spec.kind === "lap" && (() => {
            const fx = gx + spec.at * cell, fy = gy + spec.top * cell;
            const apart = tb && tb.lap === "apart";
            const lx = apart ? fx + cell * 1.6 : lap ? lap.x : fx + cell * 0.5;
            const ly = apart ? fy : lap ? lap.y : fy + cell * 0.5;
            const ox = Math.max(fx, lx), oy = Math.max(fy, ly);
            const ow = Math.min(fx + cell, lx + cell) - ox, oh = Math.min(fy + cell, ly + cell) - oy;
            return (
              <g>
                <SqTile x={fx} y={fy} s={cell} />
                <g {...control("tile-top", "the top tile")} {...drag.bind({ id: "top" })} {...drag.keys({ id: "top" })}>
                  <rect x={lx} y={ly} width={cell} height={cell} fill="transparent" />
                  <SqTile x={lx} y={ly} s={cell} lift={!!(drag.drag)} />
                </g>
                {ow > 0 && oh > 0 && (
                  <rect x={ox} y={oy} width={ow} height={oh} rx={6} fill={SQ_EDGE} fillOpacity={0.45} stroke={shade(SQ_EDGE, 0.25)} strokeWidth={4} />
                )}
                {tb && tb.done && <text x={fx + cell / 2} y={fy + cell * 2 + 24} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={shade(SQ_EDGE, 0.3)}>{tx("counted twice")}</text>}
              </g>
            );
          })()}
          {spec.kind === "cover" && (
            <g>
              <rect x={MODEL.tray.x} y={MODEL.tray.y} width={MODEL.tray.w} height={MODEL.tray.h} rx={RAD.panel} fill={tint(C.panel, 0.45)} stroke={C.rule} strokeWidth={2} />
              {[36, 18].map((d) => (
                <rect key={d} x={MODEL.tray.x + 11 + d} y={MODEL.tray.y + 3} width={cell - 6} height={cell - 6} rx={RAD.piece}
                  fill={tint(SQ_AREA, 0.72)} stroke={mix(SQ_AREA, C.paper, 0.45)} strokeWidth={2} />
              ))}
              <g {...control("tile-new", "a square tile")} {...drag.bind({ id: "new" })} {...drag.keys({ id: "new" })}>
                <rect x={MODEL.tray.x + 8} y={MODEL.tray.y} width={cell} height={cell} fill="transparent" />
                <SqTile x={MODEL.tray.x + 8} y={MODEL.tray.y} s={cell} lift={!!drag.drag} />
              </g>
              <text x={MODEL.tray.x + cell + 78} y={MODEL.tray.y + 46} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("equal tiles")}</text>
              {free && <Key id="clear" x={MODEL.ctl.x} y={MODEL.ctl.y} w={MODEL.ctl.w} h={MODEL.ctl.h} C={C} label="clear the sheet" onClick={clearSheet}>
                <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("Clear the sheet")}</text>
              </Key>}
            </g>
          )}
          {!free && stage === "ask" && !wrong && !tb && (
            spec.kind === "lap"
              ? <Invite x={(lap ? lap.x : gx + (spec.at + 0.5) * cell) + cell / 2} y={(lap ? lap.y : gy + (spec.top + 0.5) * cell) + cell / 2} r={40} C={C} />
              : nLaid === 0 ? <Invite x={MODEL.tray.x + 8 + cell / 2} y={MODEL.tray.y + cell / 2} r={34} C={C} /> : null
          )}
          {spec.kind === "cover" && !free && (
            <g>
              <text x={bcx} y={MODEL.bay.y + 124} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{bayTitle}</text>
              <SqCount x={bcx - 110} y={MODEL.bay.y + 150} w={220} h={116} C={C} value={tallyNow} unit={unitNow} />
            </g>
          )}
        </g>
      )}

      {/* ── phase 2: a shaded shape on a centimetre grid, and the unit card ── */}
      {spec.kind === "shade" && (() => {
        const sc = sqCells(spec);
        const turned = flip || !!(tb && tb.flip);
        const cx = MODEL.bay.x + MODEL.bay.w / 2;
        return (
          <g>
            <SqGrid x={gx} y={gy} cols={spec.cols} rows={spec.rows} cell={cell} C={C} />
            {sc.map((p: any, i: number) => (
              <rect key={i} x={gx + p[0] * cell + 3} y={gy + p[1] * cell + 3} width={cell - 6} height={cell - 6} rx={8}
                fill={SQ_AREA} fillOpacity={tb && tb.lit !== undefined && p[1] >= (spec.top || 0) + tb.lit ? 0.3 : 0.85}
                stroke={shade(SQ_AREA, 0.2)} strokeWidth={2} />
            ))}
            <SqOutline cells={sc} x={gx} y={gy} cell={cell} colour={SQ_FIG} width={6} />
            <text x={cx} y={MODEL.bay.y + 34} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{bayTitle}</text>
            <g>
              <rect x={cx - 134} y={MODEL.bay.y + 56} width={268} height={200} rx={RAD.panel}
                fill={turned ? C.paper : tint(C.panel, 0.15)} stroke={C.rule} strokeWidth={3} filter="url(#fShadowSoft)" />
              {turned ? (
                <g>
                  <rect x={cx - 48} y={MODEL.bay.y + 84} width={96} height={96} rx={8} fill={SQ_AREA} fillOpacity={0.85} stroke={shade(SQ_AREA, 0.2)} strokeWidth={2} />
                  <line x1={cx - 48} y1={MODEL.bay.y + 198} x2={cx + 48} y2={MODEL.bay.y + 198} stroke={shade(SQ_EDGE, 0.15)} strokeWidth={6} strokeLinecap="round" />
                  <text x={cx} y={MODEL.bay.y + 236} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={shade(SQ_EDGE, 0.3)}>{tx("1 cm")}</text>
                  <line x1={cx - 70} y1={MODEL.bay.y + 84} x2={cx - 70} y2={MODEL.bay.y + 180} stroke={shade(SQ_EDGE, 0.15)} strokeWidth={6} strokeLinecap="round" />
                  <text x={cx - 84} y={MODEL.bay.y + 142} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={shade(SQ_EDGE, 0.3)}>{tx("1 cm")}</text>
                </g>
              ) : (
                <g>
                  {[0, 1, 2].map((i) => [0, 1, 2].map((j) => (
                    <rect key={i + "," + j} x={cx - 76 + j * 52} y={MODEL.bay.y + 84 + i * 52} width={44} height={44} rx={6}
                      fill="none" stroke={mix(C.ink, C.panel, 0.55)} strokeWidth={2} />
                  )))}
                  <text x={cx} y={MODEL.bay.y + 254} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("turn the card")}</text>
                </g>
              )}
              <Hit id="unit-card" x={cx - 134} y={MODEL.bay.y + 56} w={268} h={200} onPress={turnCard} label="the unit card" />
            </g>
            <SqCount x={cx - 110} y={MODEL.bay.y + 286} w={220} h={104} C={C}
              value={tb && tb.tally !== undefined ? tb.tally : shown && typeof it.answer === "number" ? it.answer : null}
              unit={(!!(tb && tb.done) || stage === "win" || stage === "idle") ? tx("square cm") : null} />
            {stage === "ask" && !wrong && !tb && !flip && <Invite x={cx} y={MODEL.bay.y + 156} r={56} C={C} />}
          </g>
        );
      })()}

      {/* ── phase 3: a board counted by its rows ── */}
      {spec.kind === "rows" && (() => {
        const bw = spec.cols * cell, bh = spec.rows * cell;
        const bx = sheet.x + 70 + (sheet.w - 140 - bw) / 2, by = sheet.y + (sheet.h - bh) / 2;
        const upto = tb && tb.rows ? tb.rows : rows;
        const cx = MODEL.bay.x + MODEL.bay.w / 2;
        return (
          <g>
            <SqGrid x={bx} y={by} cols={spec.cols} rows={spec.rows} cell={cell} C={C} />
            {Array.from({ length: spec.rows }).map((_, r) => (
              <g key={r}>
                {r < upto && Array.from({ length: spec.cols }).map((__, c) => (
                  <rect key={c} x={bx + c * cell + 2} y={by + r * cell + 2} width={cell - 4} height={cell - 4} rx={6}
                    fill={SQ_AREA} fillOpacity={0.85} stroke={shade(SQ_AREA, 0.2)} strokeWidth={1.5} />
                ))}
                {r < upto && <text x={bx - 16} y={by + r * cell + cell / 2 + 10} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={shade(SQ_EDGE, 0.3)}>{r + 1}</text>}
                {tb && tb.rows !== undefined && r < tb.rows && (
                  <text x={bx + bw + 16} y={by + r * cell + cell / 2 + 10} fontSize={T.micro} fontWeight={700} fill={shade(SQ_AREA, 0.25)}>{(r + 1) * spec.cols}</text>
                )}
              </g>
            ))}
            <SqOutline cells={sqCells(spec)} x={bx} y={by} cell={cell} colour={SQ_FIG} width={6} />
            <Key id="rows-ctl" x={MODEL.ctl.x} y={MODEL.ctl.y} w={MODEL.ctl.w} h={MODEL.ctl.h} C={C}
              label={rows >= spec.rows ? "lay them again" : "copy a row down"} onClick={addRow}>
              <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(rows >= spec.rows ? "Lay them again" : "Copy a row down")}</text>
            </Key>
            <text x={cx} y={MODEL.bay.y + 124} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{bayTitle}</text>
            <SqCount x={cx - 110} y={MODEL.bay.y + 150} w={220} h={116} C={C} value={tallyNow} unit={unitNow} />
            {stage === "ask" && !wrong && !tb && rows === 1 && <Invite x={MODEL.ctl.x + MODEL.ctl.w / 2} y={MODEL.ctl.y + 36} r={34} C={C} />}
          </g>
        );
      })()}

      {/* ── phase 4: the squares inside beside the edge round them ── */}
      {spec.kind === "cmp" && (() => {
        const two = spec.shapes.length > 1;
        const tops = two ? [40, 290] : [(MODEL.sheet.h - spec.shapes[0][1] * cell) / 2];
        const cxs = MODEL.bay.x + 100, cxr = MODEL.bay.x + 280;
        const walked = (si: number) => {
          const w = tb && tb.walk ? tb.walk : (walk ? { si: 0, e: walk } : null);
          if (!w) return 0;
          let left = spec.shapes.slice(0, si).reduce((a: number, s: any) => a + 2 * (s[0] + s[1]), 0);
          if (tb && tb.walk) return w.si > si ? 2 * (spec.shapes[si][0] + spec.shapes[si][1]) : w.si === si ? w.e : 0;
          return Math.max(0, Math.min(2 * (spec.shapes[si][0] + spec.shapes[si][1]), walk - left));
        };
        return (
          <g>
            {spec.shapes.map((sh: any, si: number) => {
              const bw = sh[0] * cell, bh = sh[1] * cell;
              const bx = sheet.x + (sheet.w - bw) / 2, by = sheet.y + tops[si];
              const ring = sqRing(sh[0], sh[1]);
              const done = walked(si);
              return (
                <g key={si}>
                  <SqGrid x={bx} y={by} cols={sh[0]} rows={sh[1]} cell={cell} C={C} />
                  {Array.from({ length: sh[1] }).map((_, r) => Array.from({ length: sh[0] }).map((__, c) => (
                    <rect key={r + "," + c} x={bx + c * cell + 3} y={by + r * cell + 3} width={cell - 6} height={cell - 6} rx={7}
                      fill={SQ_AREA} fillOpacity={0.85} stroke={shade(SQ_AREA, 0.2)} strokeWidth={1.5} />
                  )))}
                  <SqOutline cells={sqCells({ cols: sh[0], rows: sh[1] })} x={bx} y={by} cell={cell} colour={SQ_FIG} width={6} />
                  {ring.slice(0, done).map((e: any, i: number) => (
                    <line key={i} x1={bx + e[0] * cell} y1={by + e[1] * cell} x2={bx + e[2] * cell} y2={by + e[3] * cell}
                      stroke={SQ_EDGE} strokeWidth={10} strokeLinecap="round" />
                  ))}
                  {done > 0 && done <= ring.length && (
                    <circle cx={bx + ring[done - 1][2] * cell} cy={by + ring[done - 1][3] * cell} r={11} fill={CONTENT.pointer} stroke="#FFFFFF" strokeWidth={3} />
                  )}
                </g>
              );
            })}
            <rect x={MODEL.bay.x} y={MODEL.bay.y} width={MODEL.bay.w} height={MODEL.bay.h} rx={RAD.panel} fill={tint(C.panel, 0.45)} stroke={C.rule} strokeWidth={2} />
            <text x={cxs} y={MODEL.bay.y + 54} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(SQ_AREA, 0.25)}>{tx("inside")}</text>
            <text x={cxr} y={MODEL.bay.y + 54} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(SQ_EDGE, 0.3)}>{tx("round")}</text>
            {spec.shapes.map((sh: any, si: number) => {
              const y = MODEL.bay.y + 110 + si * 150;
              const ar = sh[0] * sh[1], pe = 2 * (sh[0] + sh[1]);
              const showIn = !!(tb && tb.inside) || shown;
              const wk = walked(si);
              const showRound = !!(tb && tb.walk) || shown;
              return (
                <g key={si}>
                  <rect x={cxs - 74} y={y} width={148} height={96} rx={16} fill={C.paper} stroke={C.rule} strokeWidth={2} />
                  <rect x={cxr - 74} y={y} width={148} height={96} rx={16} fill={C.paper} stroke={C.rule} strokeWidth={2} />
                  {showIn && <text x={cxs} y={y + 66} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={shade(SQ_AREA, 0.25)}>{ar}</text>}
                  {showRound && <text x={cxr} y={y + 66} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={shade(SQ_EDGE, 0.3)}>{tb && tb.walk ? wk : pe}</text>}
                </g>
              );
            })}
            <Key id="walk-ctl" x={MODEL.ctl.x} y={MODEL.ctl.y} w={MODEL.ctl.w} h={MODEL.ctl.h} C={C}
              label="walk the edge" onClick={walkEdge}>
              <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("Walk the edge")}</text>
            </Key>
            {stage === "ask" && !wrong && !tb && walk === 0 && <Invite x={MODEL.ctl.x + MODEL.ctl.w / 2} y={MODEL.ctl.y + 36} r={34} C={C} />}
          </g>
        );
      })()}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last) return null;
  const a = last.answer;
  const two = Array.isArray(a);
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {Array.from({ length: 6 }).map((_, i) => (
        <rect key={i} x={14 + (i % 3) * 26} y={h / 2 - 26 + Math.floor(i / 3) * 26} width={22} height={22} rx={4}
          fill={SQ_AREA} fillOpacity={0.8} stroke={shade(SQ_AREA, 0.2)} strokeWidth={1} />
      ))}
      {two ? (
        <g>
          <text x={w - 14} y={h / 2 - 2} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={shade(SQ_AREA, 0.25)}>{a[0]}</text>
          <text x={w - 14} y={h / 2 + 30} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={shade(SQ_EDGE, 0.3)}>{a[1]}</text>
        </g>
      ) : (
        <text x={w - 14} y={h / 2 + 14} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(String(last.value))}</text>
      )}
    </g>
  );
}

function SquareCounter(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default SquareCounter;
