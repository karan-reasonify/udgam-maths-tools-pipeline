/* ═══ M3.S4.T9.C41.2D1 · layer_stacker · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the working area already exists
   (header, canvas, key corner, keypad panel, bubble + Kiko, nav dots, toolApi, sounds, scoring). THE LESSON IS SILENT (r30):
   the bubble is the guide; the new look (keyOnly, navDots): the question lives only in the bubble, one sentence a screen.
   Every act is performed on screen (api.act). NO imports in this file; only the five host hooks.
   The picture: a solid drawn in isometric view, fitted once per question to its FULL size inside x 130-630, y 10-410 (the same
   place with the keypad open or shut), the working rows along y 462 and 508, the controls in x 660-880. */

const TOOL_ID = "layer_stacker";
const MEDIA_ID = "M3.S4.T9.C41.2D1";
const TOOL_NAME = "Layer Stacker";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

const OPENING = ["A layer of cubes, ready to stack."];
const FINISH_LINE = "You turned stacking layers into length times breadth times height.";
const FREE_LINE = "Free play. Stack layers on any base you like.";

/* Global SVG Filter & Gradient Definitions */
const LSDefs = () => (
  <defs>
    <filter id="ls-shadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#1A202C" floodOpacity="0.16" />
    </filter>
    <radialGradient id="ls-glass-grad" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
      <stop offset="40%" stopColor="#EBF8FF" stopOpacity="0.88" />
      <stop offset="100%" stopColor="#C3E8FF" stopOpacity="0.92" />
    </radialGradient>
    <linearGradient id="ls-handle-grad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#FFFFFF" />
      <stop offset="100%" stopColor="#F0F4F8" />
    </linearGradient>
    <radialGradient id="ls-bead-grad" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stopColor="#FFFFFF" />
      <stop offset="30%" stopColor="#FFD166" />
      <stop offset="85%" stopColor="#E69F00" />
      <stop offset="100%" stopColor="#B37A00" />
    </radialGradient>
  </defs>
);

const START_HOOK = "How many cubes does it take to fill a box?";
function StartArt({ box }: any) {
  /* a little stack of wooden cubes, 3 long, 2 wide, 3 high, every cube its own picture (18 skins) */
  const g = lsGeo(3, 2, 3, { x: box.w / 2 - 230, y: 10, w: 460, h: box.h - 20 });
  const cubes: any[] = [];
  for (let s = 0; s <= 3; s++) for (let u = 0; u < 3; u++) { const v = s - u; if (v < 0 || v > 1) continue; for (let z = 0; z < 3; z++) cubes.push([u, v, z]); }
  return (
    <g>
      <LSDefs />
      <ellipse cx={box.w / 2} cy={box.h - 24} rx={210} ry={22} fill="#000000" fillOpacity={0.08} />
      {cubes.map(([u, v, z]: any) => lsCube(g, u, v, z, "st" + u + v + z, LS_VIO))}
    </g>
  );
}

/* Hindi and Gujarati: filled in the language pass, once the English is final (docs/PATTERNS.md §11). */
const TR: any = {
  hi: {
    "Layer Stacker": "परतों का ढेर",
    "A layer of cubes, ready to stack.": "घनों की एक परत, ढेर बनाने को तैयार।",
    "Free play. Stack layers on any base you like.": "खुला खेल। किसी भी आधार पर परतें रखो।",
    "How many cubes does it take to fill a box?": "एक डिब्बा भरने में कितने घन लगते हैं?",
    "You turned stacking layers into length times breadth times height.": "तुमने परतों के ढेर को लंबाई×चौड़ाई×ऊँचाई बना दिया।",
    "Layers of cubes": "घनों की परतें",
    "Count one layer. Then count the layers.": "एक परत गिनो। फिर परतें गिनो।",
    "Tap the base layer to count its cubes.": "नीचे की परत के घन गिनने के लिए उसे छुओ।",
    "Tap the violet cubes on the table.": "मेज़ पर रखे बैंगनी घन छुओ।",
    "Now push the Height handle up to stack one more layer.": "अब एक और परत रखने के लिए ऊँचाई हैंडल ऊपर धकेलो।",
    "Tap the round grip beside the cubes.": "घनों के पास वाली गोल पकड़ छुओ।",
    "One layer holds length times breadth cubes, and the layers multiply that count.": "एक परत में लंबाई×चौड़ाई घन हैं, और परतें उसे गुणा करती हैं।",
    "You learned: one layer has length × breadth cubes; layers multiply it": "तुमने सीखा: एक परत में लंबाई×चौड़ाई घन; परतें गुणा करती हैं",
    "A cuboid is 7 cubes long, 5 wide and 2 high; how many cubes build it?": "घनाभ 7 घन लंबा, 5 चौड़ा और 2 ऊँचा है; कितने घन लगेंगे?",
    "Cubes in all?": "कुल घन?",
    "Look at the bottom layer only: 7 rows of 5 cubes.": "सिर्फ़ नीचे की परत देखो: 5 घनों की 7 पंक्तियाँ।",
    "Yes, 2 layers of 35 cubes make 70.": "हाँ, 35 घनों की 2 परतें 70 बनाती हैं।",
    "Stack a cuboid 7 cubes long, 2 wide and 2 high; how many cubes is that?": "7 घन लंबा, 2 चौड़ा, 2 ऊँचा घनाभ बनाओ; कितने घन हुए?",
    "This bottom layer is just 7 long and 2 wide.": "यह नीचे की परत बस 7 लंबी और 2 चौड़ी है।",
    "Right, 2 layers of 14 make 28 cubes.": "सही, 14 की 2 परतें 28 घन बनाती हैं।",
    "This one is 9 cubes long, 2 wide and 3 high; how many cubes fill it?": "यह 9 घन लंबा, 2 चौड़ा और 3 ऊँचा है; कितने घन भरेंगे?",
    "Three layers stand here, each one like the bottom one.": "यहाँ तीन परतें हैं, हर एक नीचे वाली जैसी।",
    "Yes, 3 layers of 18 make 54 cubes.": "हाँ, 18 की 3 परतें 54 घन बनाती हैं।",
    "Multiply the cubes in one layer by the number of layers.": "एक परत के घनों को परतों की संख्या से गुणा करो।",
    "Add one layer's cubes once for every layer in the stack.": "ढेर की हर परत के लिए एक परत के घन एक बार जोड़ो।",
    "Length times breadth times height": "लंबाई×चौड़ाई×ऊँचाई",
    "Length, then breadth, then height. Multiply all three.": "लंबाई, फिर चौड़ाई, फिर ऊँचाई। तीनों को गुणा करो।",
    "Push the Height handle to put the first layer of cubes in the box.": "डिब्बे में घनों की पहली परत रखने को ऊँचाई हैंडल धकेलो।",
    "Tap the round grip beside the box.": "डिब्बे के पास वाली गोल पकड़ छुओ।",
    "Push it again to fill the box up to its lid.": "डिब्बे को ढक्कन तक भरने के लिए फिर धकेलो।",
    "The grip waits at the side of the box.": "पकड़ डिब्बे के किनारे पर है।",
    "The volume of a cuboid is length × breadth × height.": "घनाभ का आयतन लंबाई×चौड़ाई×ऊँचाई है।",
    "You learned: the volume of a cuboid is length × breadth × height": "तुमने सीखा: घनाभ का आयतन लंबाई×चौड़ाई×ऊँचाई है",
    "Find the cubic centimetres in a box 11 cm long, 6 cm wide, 4 cm high.": "11×6×4 सेमी के डिब्बे में कितने घन सेंटीमीटर हैं?",
    "Volume in cubic cm?": "आयतन घन सेमी में?",
    "Look at the bottom layer: 11 cubes along, 6 rows deep.": "नीचे की परत देखो: 11 घन लंबाई में, 6 पंक्तियाँ।",
    "Yes, 264 cubic centimetres fill the box.": "हाँ, 264 घन सेंटीमीटर डिब्बा भरते हैं।",
    "How many cubic centimetres fill a box 9 cm by 7 cm by 2 cm?": "9 सेमी×7 सेमी×2 सेमी डिब्बे में कितने घन सेंटीमीटर भरेंगे?",
    "The floor of this box holds 9 rows of 7 cubes.": "इस डिब्बे के तले में 7 घनों की 9 पंक्तियाँ हैं।",
    "Right, that is 126 cubic centimetres.": "सही, यह 126 घन सेंटीमीटर है।",
    "A box is 11 m long, 5 m wide and 2 m high; find its volume in cubic metres.": "डिब्बा 11 मी लंबा, 5 मी चौड़ा, 2 मी ऊँचा है; आयतन घन मीटर में बताओ।",
    "Volume in cubic m?": "आयतन घन मी में?",
    "This box is 2 layers high, and each layer is 11 by 5.": "यह डिब्बा 2 परत ऊँचा है, और हर परत 11×5 है।",
    "Yes, the box holds 110 cubic metres.": "हाँ, डिब्बे में 110 घन मीटर आता है।",
    "Multiply the length and the breadth, then multiply that by the height.": "लंबाई और चौड़ाई गुणा करो, फिर उसे ऊँचाई से गुणा करो।",
    "Edges in metres give cubic metres; edges in centimetres give cubic centimetres.": "मीटर के किनारे घन मीटर देते हैं; सेंटीमीटर के किनारे घन सेंटीमीटर।",
    "A cube has equal edges": "घन के किनारे बराबर होते हैं",
    "Are all the edges the same? Then it is a cube.": "क्या सब किनारे बराबर हैं? तब यह घन है।",
    "Tap the bead to run it along the length.": "मनके को लंबाई पर चलाने के लिए उसे छुओ।",
    "Tap the bead at the front corner.": "आगे वाले कोने का मनका छुओ।",
    "Tap it again to run it along the breadth.": "चौड़ाई पर चलाने के लिए उसे फिर छुओ।",
    "The bead waits at the corner of the solid.": "मनका ठोस के कोने पर है।",
    "Tap it once more to run it up the height.": "ऊँचाई पर चलाने के लिए एक बार और छुओ।",
    "One more run, up the standing edge.": "एक बार और, खड़े किनारे पर ऊपर।",
    "A cube has all edges equal, so its volume is side×side×side.": "घन के सब किनारे बराबर हैं, तो आयतन भुजा×भुजा×भुजा है।",
    "You learned: a cube has equal edges, so volume is side × side × side": "तुमने सीखा: घन के किनारे बराबर, आयतन भुजा×भुजा×भुजा",
    "A solid's edges are 9 cm, 9 cm and 9 cm; how many cubic centimetres is it?": "ठोस के किनारे 9 सेमी, 9 सेमी और 9 सेमी हैं; कितने घन सेंटीमीटर?",
    "Look at the bottom layer: 9 by 9 cubes.": "नीचे की परत देखो: 9×9 घन।",
    "Yes, a cube of 729 cubic centimetres.": "हाँ, 729 घन सेंटीमीटर का घन।",
    "A cube has edges of 10 m; what is its volume in cubic metres?": "घन के किनारे 10 मी हैं; आयतन घन मीटर में कितना है?",
    "One layer of this cube is 10 by 10 cubes.": "इस घन की एक परत 10×10 घन है।",
    "Right, that is 1,000 cubic metres.": "सही, यह 1,000 घन मीटर है।",
    "A solid is 6 cm by 6 cm by 4 cm; is it a cube?": "ठोस 6 सेमी×6 सेमी×4 सेमी है; क्या यह घन है?",
    "Is it a cube?": "क्या यह घन है?",
    "Yes": "हाँ",
    "No": "नहीं",
    "Read the three edge labels: 6 cm, 6 cm and 4 cm.": "तीनों किनारों के नाप पढ़ो: 6 सेमी, 6 सेमी, 4 सेमी।",
    "Right, unequal edges make a cuboid.": "सही, असमान किनारे घनाभ बनाते हैं।",
    "Find the cubes in one layer, then multiply by the layers standing on it.": "एक परत के घन निकालो, फिर उस पर खड़ी परतों से गुणा करो।",
    "Length, breadth and height are equal here, so use that number three times.": "यहाँ लंबाई, चौड़ाई, ऊँचाई बराबर हैं, तो वही संख्या तीन बार लो।",
    "Compare all three edges; a cube has every edge equal.": "तीनों किनारे मिलाओ; घन का हर किनारा बराबर होता है।",
    "One edge that is different makes the solid a cuboid, not a cube.": "एक अलग किनारा ठोस को घनाभ बनाता है, घन नहीं।",
    "An edge in tenths": "दशांश वाला किनारा",
    "Whole numbers first. Then the tenths.": "पहले पूर्ण संख्याएँ। फिर दशांश।",
    "Tap Multiply to multiply the two whole-number edges.": "दो पूर्ण संख्या वाले किनारे गुणा करने को गुणा करो छुओ।",
    "Tap the Multiply key beside the box.": "डिब्बे के पास वाली गुणा करो कुंजी छुओ।",
    "Now tap the Tenths lens to hold it over the edge in tenths.": "अब दशांश लेंस को दशांश वाले किनारे पर रखने को छुओ।",
    "Tap the round glass beside the box.": "डिब्बे के पास वाला गोल काँच छुओ।",
    "Tap Multiply again to multiply the tenths by that product.": "दशांश को उस गुणनफल से गुणा करने को फिर गुणा करो छुओ।",
    "The Multiply key does the last step.": "आखिरी कदम गुणा करो कुंजी करती है।",
    "An edge in tenths is multiplied as a count of tenths by the whole-number edges.": "दशांश वाले किनारे को दशांशों की गिनती मानकर पूर्ण किनारों से गुणा करते हैं।",
    "You learned: an edge in tenths is multiplied as a count of tenths": "तुमने सीखा: दशांश वाला किनारा दशांशों की गिनती की तरह गुणा होता है",
    "A box is 8 cm by 3.5 cm by 2 cm; how many cubic centimetres is its volume?": "डिब्बा 8 सेमी×3.5 सेमी×2 सेमी है; आयतन कितने घन सेंटीमीटर?",
    "Look at the lens: what unit is that edge in?": "लेंस देखो: वह किनारा किस इकाई में है?",
    "Yes, 560 tenths is 56 cubic centimetres.": "हाँ, 560 दशांश यानी 56 घन सेंटीमीटर।",
    "Find the volume of a box 6 cm by 2.5 cm by 4 cm in cubic centimetres.": "6 सेमी×2.5 सेमी×4 सेमी डिब्बे का आयतन घन सेंटीमीटर में निकालो।",
    "Check the unit the lens shows before you multiply.": "गुणा करने से पहले लेंस की इकाई देखो।",
    "Right, 600 tenths is 60 cubic centimetres.": "सही, 600 दशांश यानी 60 घन सेंटीमीटर।",
    "A box 4 cm by 2.5 cm by 1.5 cm: can tenths times whole numbers give its volume?": "डिब्बा 4 सेमी×2.5 सेमी×1.5 सेमी: क्या दशांश×पूर्ण संख्या से आयतन मिलेगा?",
    "Tenths times whole numbers?": "दशांश×पूर्ण संख्या?",
    "Count the edges the lens read in tenths.": "लेंस ने जिन किनारों को दशांश में पढ़ा, उन्हें गिनो।",
    "Right, that needs a step taught later.": "सही, उसके लिए बाद में सिखाया जाने वाला कदम चाहिए।",
    "Your product counts tenths of a cubic centimetre, not whole ones.": "तुम्हारा गुणनफल घन सेंटीमीटर के दशांश गिनता है, पूरे नहीं।",
    "Ten tenths make one, so divide the count of tenths by 10 to write it back.": "दस दशांश से एक बनता है, तो दशांशों की गिनती को 10 से भाग दो।",
    "Tenths times whole numbers works when only one edge has tenths.": "दशांश×पूर्ण संख्या तभी चलता है जब एक ही किनारे में दशांश हो।",
    "Two edges in tenths need tenths times tenths, a step for later.": "दो दशांश वाले किनारों को दशांश×दशांश चाहिए, जो बाद में आएगा।",
    "tenths": "दशांश",
    "cubes": "घन",
    "cm": "सेमी",
    "m": "मी",
    "cu. cm": "घन सेमी",
    "cu. m": "घन मी",
    "long": "लंबा",
    "wide": "चौड़ा",
    "high": "ऊँचा",
    "Cube": "घन",
    "Cuboid": "घनाभ",
    "Longer": "लंबा करो",
    "Wider": "चौड़ा करो",
    "No: edges not equal": "नहीं: किनारे बराबर नहीं",
    "Two edges in tenths": "दो किनारे दशांश में",
    "No: a step for later": "नहीं: बाद का कदम",
    "Height handle": "ऊँचाई हैंडल",
    "Edge checker": "किनारा जाँच",
    "Multiply": "गुणा करो",
    "Tenths lens": "दशांश लेंस",
    "Taught later": "बाद में सीखेंगे",
    "units": "इकाई",
    "Units switch": "इकाई बटन",
    "Base layer": "नीचे की परत",
    "Layer": "परत",
    "Later": "बाद में",
    "Stack the layers up to the dashed top first.": "पहले परतें टूटी रेखा वाले ऊपर तक रखो।",
    "Stack the layers up to the top of the box first.": "पहले परतें डिब्बे के ऊपर तक रखो।",
    "Run the bead along all three edges first.": "पहले मनका तीनों किनारों पर चलाओ।",
    "Use the Tenths lens on the box first.": "पहले डिब्बे पर दशांश लेंस लगाओ।",
    "Hold the Tenths lens over the edge in tenths first.": "पहले दशांश लेंस दशांश वाले किनारे पर रखो।",
    "Tap Multiply first.": "पहले गुणा दबाओ।",
    "Tap Multiply and the Tenths lens first.": "पहले गुणा और दशांश लेंस दबाओ।",
  },
  gu: {
    "Layer Stacker": "થરનો ઢગલો",
    "A layer of cubes, ready to stack.": "ઘનની એક થર, ઢગલો કરવા તૈયાર.",
    "Free play. Stack layers on any base you like.": "મુક્ત રમત. કોઈ પણ આધાર પર થર ગોઠવો.",
    "How many cubes does it take to fill a box?": "એક ખોખું ભરવા કેટલા ઘન જોઈએ?",
    "You turned stacking layers into length times breadth times height.": "તમે થરના ઢગલાને લંબાઈ×પહોળાઈ×ઊંચાઈ બનાવ્યો.",
    "Layers of cubes": "ઘનના થર",
    "Count one layer. Then count the layers.": "એક થર ગણો. પછી થર ગણો.",
    "Tap the base layer to count its cubes.": "નીચેના થરના ઘન ગણવા તેને અડો.",
    "Tap the violet cubes on the table.": "ટેબલ પરના જાંબલી ઘન અડો.",
    "Now push the Height handle up to stack one more layer.": "હવે એક વધુ થર મૂકવા ઊંચાઈ હેન્ડલ ઉપર ધકેલો.",
    "Tap the round grip beside the cubes.": "ઘનની બાજુની ગોળ પકડ અડો.",
    "One layer holds length times breadth cubes, and the layers multiply that count.": "એક થરમાં લંબાઈ×પહોળાઈ ઘન છે, અને થર તેને ગુણે છે.",
    "You learned: one layer has length × breadth cubes; layers multiply it": "તમે શીખ્યા: એક થરમાં લંબાઈ×પહોળાઈ ઘન; થર ગુણે છે",
    "A cuboid is 7 cubes long, 5 wide and 2 high; how many cubes build it?": "લંબઘન 7 ઘન લાંબો, 5 પહોળો, 2 ઊંચો છે; કેટલા ઘન જોઈએ?",
    "Cubes in all?": "કુલ ઘન?",
    "Look at the bottom layer only: 7 rows of 5 cubes.": "ફક્ત નીચેનો થર જુઓ: 5 ઘનની 7 હાર.",
    "Yes, 2 layers of 35 cubes make 70.": "હા, 35 ઘનના 2 થર 70 બનાવે છે.",
    "Stack a cuboid 7 cubes long, 2 wide and 2 high; how many cubes is that?": "7 ઘન લાંબો, 2 પહોળો, 2 ઊંચો લંબઘન બનાવો; કેટલા ઘન થયા?",
    "This bottom layer is just 7 long and 2 wide.": "આ નીચેનો થર ફક્ત 7 લાંબો અને 2 પહોળો છે.",
    "Right, 2 layers of 14 make 28 cubes.": "સાચું, 14ના 2 થર 28 ઘન બનાવે છે.",
    "This one is 9 cubes long, 2 wide and 3 high; how many cubes fill it?": "આ 9 ઘન લાંબો, 2 પહોળો, 3 ઊંચો છે; કેટલા ઘન ભરાશે?",
    "Three layers stand here, each one like the bottom one.": "અહીં ત્રણ થર છે, દરેક નીચેના જેવો.",
    "Yes, 3 layers of 18 make 54 cubes.": "હા, 18ના 3 થર 54 ઘન બનાવે છે.",
    "Multiply the cubes in one layer by the number of layers.": "એક થરના ઘનને થરની સંખ્યાથી ગુણો.",
    "Add one layer's cubes once for every layer in the stack.": "ઢગલાના દરેક થર માટે એક થરના ઘન એક વાર ઉમેરો.",
    "Length times breadth times height": "લંબાઈ×પહોળાઈ×ઊંચાઈ",
    "Length, then breadth, then height. Multiply all three.": "લંબાઈ, પછી પહોળાઈ, પછી ઊંચાઈ. ત્રણેય ગુણો.",
    "Push the Height handle to put the first layer of cubes in the box.": "ખોખામાં ઘનનો પહેલો થર મૂકવા ઊંચાઈ હેન્ડલ ધકેલો.",
    "Tap the round grip beside the box.": "ખોખાની બાજુની ગોળ પકડ અડો.",
    "Push it again to fill the box up to its lid.": "ખોખું ઢાંકણ સુધી ભરવા ફરી ધકેલો.",
    "The grip waits at the side of the box.": "પકડ ખોખાની બાજુએ છે.",
    "The volume of a cuboid is length × breadth × height.": "લંબઘનનું ઘનફળ લંબાઈ×પહોળાઈ×ઊંચાઈ છે.",
    "You learned: the volume of a cuboid is length × breadth × height": "તમે શીખ્યા: લંબઘનનું ઘનફળ લંબાઈ×પહોળાઈ×ઊંચાઈ છે",
    "Find the cubic centimetres in a box 11 cm long, 6 cm wide, 4 cm high.": "11 સેમી લાંબા, 6 સેમી પહોળા, 4 સેમી ઊંચા ખોખામાં કેટલા ઘન સેન્ટીમીટર?",
    "Volume in cubic cm?": "ઘનફળ ઘન સેમીમાં?",
    "Look at the bottom layer: 11 cubes along, 6 rows deep.": "નીચેનો થર જુઓ: 11 ઘન લંબાઈમાં, 6 હાર.",
    "Yes, 264 cubic centimetres fill the box.": "હા, 264 ઘન સેન્ટીમીટર ખોખું ભરે છે.",
    "How many cubic centimetres fill a box 9 cm by 7 cm by 2 cm?": "9 સેમી×7 સેમી×2 સેમીના ખોખામાં કેટલા ઘન સેન્ટીમીટર ભરાય?",
    "The floor of this box holds 9 rows of 7 cubes.": "આ ખોખાના તળિયે 7 ઘનની 9 હાર છે.",
    "Right, that is 126 cubic centimetres.": "સાચું, તે 126 ઘન સેન્ટીમીટર છે.",
    "A box is 11 m long, 5 m wide and 2 m high; find its volume in cubic metres.": "ખોખું 11 મી લાંબું, 5 મી પહોળું, 2 મી ઊંચું; ઘનફળ ઘન મીટરમાં શોધો.",
    "Volume in cubic m?": "ઘનફળ ઘન મીમાં?",
    "This box is 2 layers high, and each layer is 11 by 5.": "આ ખોખું 2 થર ઊંચું છે, અને દરેક થર 11×5 છે.",
    "Yes, the box holds 110 cubic metres.": "હા, ખોખામાં 110 ઘન મીટર સમાય છે.",
    "Multiply the length and the breadth, then multiply that by the height.": "લંબાઈ અને પહોળાઈ ગુણો, પછી તેને ઊંચાઈથી ગુણો.",
    "Edges in metres give cubic metres; edges in centimetres give cubic centimetres.": "મીટરની ધાર ઘન મીટર આપે; સેન્ટીમીટરની ધાર ઘન સેન્ટીમીટર.",
    "A cube has equal edges": "સમઘનની ધાર સરખી હોય",
    "Are all the edges the same? Then it is a cube.": "શું બધી ધાર સરખી છે? તો તે સમઘન છે.",
    "Tap the bead to run it along the length.": "મણકાને લંબાઈ પર ચલાવવા તેને અડો.",
    "Tap the bead at the front corner.": "આગળના ખૂણાનો મણકો અડો.",
    "Tap it again to run it along the breadth.": "પહોળાઈ પર ચલાવવા તેને ફરી અડો.",
    "The bead waits at the corner of the solid.": "મણકો ઘન આકારના ખૂણે છે.",
    "Tap it once more to run it up the height.": "ઊંચાઈ પર ચલાવવા એક વાર વધુ અડો.",
    "One more run, up the standing edge.": "એક વાર વધુ, ઊભી ધાર પર ઉપર.",
    "A cube has all edges equal, so its volume is side×side×side.": "સમઘનની બધી ધાર સરખી, તેથી ઘનફળ બાજુ×બાજુ×બાજુ છે.",
    "You learned: a cube has equal edges, so volume is side × side × side": "તમે શીખ્યા: સમઘનની ધાર સરખી, ઘનફળ બાજુ×બાજુ×બાજુ",
    "A solid's edges are 9 cm, 9 cm and 9 cm; how many cubic centimetres is it?": "ઘન આકારની ધાર 9 સેમી, 9 સેમી, 9 સેમી છે; કેટલા ઘન સેન્ટીમીટર?",
    "Look at the bottom layer: 9 by 9 cubes.": "નીચેનો થર જુઓ: 9×9 ઘન.",
    "Yes, a cube of 729 cubic centimetres.": "હા, 729 ઘન સેન્ટીમીટરનો સમઘન.",
    "A cube has edges of 10 m; what is its volume in cubic metres?": "સમઘનની ધાર 10 મી છે; ઘનફળ ઘન મીટરમાં કેટલું?",
    "One layer of this cube is 10 by 10 cubes.": "આ સમઘનનો એક થર 10×10 ઘન છે.",
    "Right, that is 1,000 cubic metres.": "સાચું, તે 1,000 ઘન મીટર છે.",
    "A solid is 6 cm by 6 cm by 4 cm; is it a cube?": "ઘન આકાર 6 સેમી×6 સેમી×4 સેમી છે; શું તે સમઘન છે?",
    "Is it a cube?": "શું તે સમઘન છે?",
    "Yes": "હા",
    "No": "ના",
    "Read the three edge labels: 6 cm, 6 cm and 4 cm.": "ત્રણેય ધારના માપ વાંચો: 6 સેમી, 6 સેમી, 4 સેમી.",
    "Right, unequal edges make a cuboid.": "સાચું, અસમાન ધાર લંબઘન બનાવે છે.",
    "Find the cubes in one layer, then multiply by the layers standing on it.": "એક થરના ઘન શોધો, પછી તેના પરના થરથી ગુણો.",
    "Length, breadth and height are equal here, so use that number three times.": "અહીં લંબાઈ, પહોળાઈ, ઊંચાઈ સરખી છે, તો તે સંખ્યા ત્રણ વાર લો.",
    "Compare all three edges; a cube has every edge equal.": "ત્રણેય ધાર સરખાવો; સમઘનની દરેક ધાર સરખી હોય.",
    "One edge that is different makes the solid a cuboid, not a cube.": "એક જુદી ધાર ઘન આકારને લંબઘન બનાવે, સમઘન નહીં.",
    "An edge in tenths": "દશાંશવાળી ધાર",
    "Whole numbers first. Then the tenths.": "પહેલા પૂર્ણ સંખ્યા. પછી દશાંશ.",
    "Tap Multiply to multiply the two whole-number edges.": "બે પૂર્ણ સંખ્યાની ધાર ગુણવા ગુણો અડો.",
    "Tap the Multiply key beside the box.": "ખોખાની બાજુની ગુણો કી અડો.",
    "Now tap the Tenths lens to hold it over the edge in tenths.": "હવે દશાંશ લેન્સને દશાંશવાળી ધાર પર મૂકવા અડો.",
    "Tap the round glass beside the box.": "ખોખાની બાજુનો ગોળ કાચ અડો.",
    "Tap Multiply again to multiply the tenths by that product.": "દશાંશને તે ગુણાકારથી ગુણવા ફરી ગુણો અડો.",
    "The Multiply key does the last step.": "છેલ્લું પગલું ગુણો કી કરે છે.",
    "An edge in tenths is multiplied as a count of tenths by the whole-number edges.": "દશાંશવાળી ધારને દશાંશની ગણતરી ગણી પૂર્ણ ધારથી ગુણીએ.",
    "You learned: an edge in tenths is multiplied as a count of tenths": "તમે શીખ્યા: દશાંશવાળી ધાર દશાંશની ગણતરી જેમ ગુણાય",
    "A box is 8 cm by 3.5 cm by 2 cm; how many cubic centimetres is its volume?": "ખોખું 8 સેમી×3.5 સેમી×2 સેમી છે; ઘનફળ કેટલા ઘન સેન્ટીમીટર?",
    "Look at the lens: what unit is that edge in?": "લેન્સ જુઓ: તે ધાર કયા એકમમાં છે?",
    "Yes, 560 tenths is 56 cubic centimetres.": "હા, 560 દશાંશ એટલે 56 ઘન સેન્ટીમીટર.",
    "Find the volume of a box 6 cm by 2.5 cm by 4 cm in cubic centimetres.": "6 સેમી×2.5 સેમી×4 સેમી ખોખાનું ઘનફળ ઘન સેન્ટીમીટરમાં શોધો.",
    "Check the unit the lens shows before you multiply.": "ગુણતાં પહેલાં લેન્સનો એકમ જુઓ.",
    "Right, 600 tenths is 60 cubic centimetres.": "સાચું, 600 દશાંશ એટલે 60 ઘન સેન્ટીમીટર.",
    "A box 4 cm by 2.5 cm by 1.5 cm: can tenths times whole numbers give its volume?": "ખોખું 4 સેમી×2.5 સેમી×1.5 સેમી: શું દશાંશ×પૂર્ણ સંખ્યાથી ઘનફળ મળે?",
    "Tenths times whole numbers?": "દશાંશ×પૂર્ણ સંખ્યા?",
    "Count the edges the lens read in tenths.": "લેન્સે દશાંશમાં વાંચેલી ધાર ગણો.",
    "Right, that needs a step taught later.": "સાચું, તેને પછી શીખવાતું પગલું જોઈએ.",
    "Your product counts tenths of a cubic centimetre, not whole ones.": "તમારો ગુણાકાર ઘન સેન્ટીમીટરના દશાંશ ગણે છે, આખા નહીં.",
    "Ten tenths make one, so divide the count of tenths by 10 to write it back.": "દસ દશાંશથી એક બને, તેથી દશાંશની ગણતરીને 10થી ભાગો.",
    "Tenths times whole numbers works when only one edge has tenths.": "દશાંશ×પૂર્ણ સંખ્યા ત્યારે ચાલે જ્યારે એક જ ધારમાં દશાંશ હોય.",
    "Two edges in tenths need tenths times tenths, a step for later.": "બે દશાંશવાળી ધારને દશાંશ×દશાંશ જોઈએ, જે પછી આવશે.",
    "tenths": "દશાંશ",
    "cubes": "ઘન",
    "cm": "સેમી",
    "m": "મી",
    "cu. cm": "ઘન સેમી",
    "cu. m": "ઘન મી",
    "long": "લાંબો",
    "wide": "પહોળો",
    "high": "ઊંચો",
    "Cube": "સમઘન",
    "Cuboid": "લંબઘન",
    "Longer": "લાંબું કરો",
    "Wider": "પહોળું કરો",
    "No: edges not equal": "ના: ધાર સરખી નથી",
    "Two edges in tenths": "બે ધાર દશાંશમાં",
    "No: a step for later": "ના: પછીનું પગલું",
    "Height handle": "ઊંચાઈ હેન્ડલ",
    "Edge checker": "ધાર તપાસ",
    "Multiply": "ગુણો",
    "Tenths lens": "દશાંશ લેન્સ",
    "Taught later": "પછી શીખીશું",
    "units": "એકમ",
    "Units switch": "એકમ બટન",
    "Base layer": "નીચેનો થર",
    "Layer": "થર",
    "Later": "પછી",
    "Stack the layers up to the dashed top first.": "પહેલા થર તૂટક રેખાવાળા ઉપર સુધી મૂકો.",
    "Stack the layers up to the top of the box first.": "પહેલા થર ખોખાની ટોચ સુધી મૂકો.",
    "Run the bead along all three edges first.": "પહેલા મણકો ત્રણેય ધાર પર ચલાવો.",
    "Use the Tenths lens on the box first.": "પહેલા ખોખા પર દશાંશ લેન્સ વાપરો.",
    "Hold the Tenths lens over the edge in tenths first.": "પહેલા દશાંશ લેન્સ દશાંશવાળી ધાર પર મૂકો.",
    "Tap Multiply first.": "પહેલા ગુણો દબાવો.",
    "Tap Multiply and the Tenths lens first.": "પહેલા ગુણો અને દશાંશ લેન્સ દબાવો.",
  },
};

/* One entry per phase = one mount. Each item carries its solid: l, b, h (edges), u (unit: "" counts cubes, "cm", "m"),
   t (P4: the edges in tenths), win (the one-sentence win line, said at the win). */
const PHASES = [
  {
    n: 1,
    concept: "Layers of cubes",
    conceptId: "M3.S4.T9.C40", objectiveIds: ["O15"],
    says: ["Count one layer. Then count the layers."],
    /* a warm-up base 4 x 3, two layers high (12 and 24 are none of the phase's answers) */
    steps: [
      { say: "Tap the base layer to count its cubes.", on: "count", hint: "Tap the violet cubes on the table." },
      { say: "Now push the Height handle up to stack one more layer.", on: "lift", hint: "Tap the round grip beside the cubes." },
    ],
    stepHold: 2600,
    ladder: ["Multiply the cubes in one layer by the number of layers.", "Add one layer's cubes once for every layer in the stack."],
    closing: "One layer holds length times breadth cubes, and the layers multiply that count.",
    learned: "You learned: one layer has length × breadth cubes; layers multiply it",
    traceback: "the base layer lights amber with length x breadth, then each layer above it lights in turn and the count ends green",
    items: [
      /* learn LS1: answer in the plan = 70 cubes */
      { qid: "M3.S4.T9.C40:LS1", kind: "stack", l: 7, b: 5, h: 2, u: "",
        say: "A cuboid is 7 cubes long, 5 wide and 2 high; how many cubes build it?", ask: "Cubes in all?", answer: 70,
        miss: "Look at the bottom layer only: 7 rows of 5 cubes.", win: "Yes, 2 layers of 35 cubes make 70." },
      /* practice 1: answer in the plan = One layer has 7 x 2 = 14 cubes, and 2 x 14 = 28, so 28 cubes */
      { qid: "M3.S4.T9.C40:1", kind: "stack", l: 7, b: 2, h: 2, u: "",
        say: "Stack a cuboid 7 cubes long, 2 wide and 2 high; how many cubes is that?", ask: "Cubes in all?", answer: 28,
        miss: "This bottom layer is just 7 long and 2 wide.", win: "Right, 2 layers of 14 make 28 cubes." },
      /* practice 6: answer in the plan = One layer has 9 x 2 = 18 cubes, and 3 x 18 = 54, so 54 cubes */
      { qid: "M3.S4.T9.C40:6", kind: "stack", l: 9, b: 2, h: 3, u: "",
        say: "This one is 9 cubes long, 2 wide and 3 high; how many cubes fill it?", ask: "Cubes in all?", answer: 54,
        miss: "Three layers stand here, each one like the bottom one.", win: "Yes, 3 layers of 18 make 54 cubes." },
    ],
  },
  {
    n: 2,
    concept: "Length times breadth times height",
    conceptId: "M3.S4.T9.C41", objectiveIds: ["O15"],
    says: ["Length, then breadth, then height. Multiply all three."],
    /* a warm-up box 5 cm x 3 cm x 2 cm (15 and 30 are none of the phase's answers) */
    steps: [
      { say: "Push the Height handle to put the first layer of cubes in the box.", on: "lift", hint: "Tap the round grip beside the box." },
      { say: "Push it again to fill the box up to its lid.", on: "lift", hint: "The grip waits at the side of the box." },
    ],
    stepHold: 2600,
    ladder: ["Multiply the length and the breadth, then multiply that by the height.", "Edges in metres give cubic metres; edges in centimetres give cubic centimetres."],
    closing: "The volume of a cuboid is length × breadth × height.",
    learned: "You learned: the volume of a cuboid is length × breadth × height",
    traceback: "the base layer lights amber with length x breadth, the layers stack in steps to the lid and length x breadth x height ends green",
    items: [
      /* learn LS2: answer in the plan = 264 cu. cm */
      { qid: "M3.S4.T9.C41:LS2", kind: "box", l: 11, b: 6, h: 4, u: "cm",
        say: "Find the cubic centimetres in a box 11 cm long, 6 cm wide, 4 cm high.", ask: "Volume in cubic cm?", answer: 264,
        miss: "Look at the bottom layer: 11 cubes along, 6 rows deep.", win: "Yes, 264 cubic centimetres fill the box." },
      /* practice 2: answer in the plan = The volume of a cuboid 9 cm long, 7 cm wide and 2 cm high is 9 x 7 x 2 = 126 cu. cm */
      { qid: "M3.S4.T9.C41:2", kind: "box", l: 9, b: 7, h: 2, u: "cm",
        say: "How many cubic centimetres fill a box 9 cm by 7 cm by 2 cm?", ask: "Volume in cubic cm?", answer: 126,
        miss: "The floor of this box holds 9 rows of 7 cubes.", win: "Right, that is 126 cubic centimetres." },
      /* practice 5: answer in the plan = The volume of a cuboid 11 m long, 5 m wide and 2 m high is 11 x 5 x 2 = 110 cu. m */
      { qid: "M3.S4.T9.C41:5", kind: "box", l: 11, b: 5, h: 2, u: "m",
        say: "A box is 11 m long, 5 m wide and 2 m high; find its volume in cubic metres.", ask: "Volume in cubic m?", answer: 110,
        miss: "This box is 2 layers high, and each layer is 11 by 5.", win: "Yes, the box holds 110 cubic metres." },
    ],
  },
  {
    n: 3,
    concept: "A cube has equal edges",
    conceptId: "M3.S4.T9.C42", objectiveIds: ["O16"],
    says: ["Are all the edges the same? Then it is a cube."],
    /* a warm-up solid 3 cm x 3 cm x 3 cm (27 is none of the phase's answers) */
    steps: [
      { say: "Tap the bead to run it along the length.", on: "run", hint: "Tap the bead at the front corner." },
      { say: "Tap it again to run it along the breadth.", on: "run", hint: "The bead waits at the corner of the solid." },
      { say: "Tap it once more to run it up the height.", on: "run", hint: "One more run, up the standing edge." },
    ],
    stepHold: 2600,
    ladder: ["Find the cubes in one layer, then multiply by the layers standing on it.", "Length, breadth and height are equal here, so use that number three times."],
    closing: "A cube has all edges equal, so its volume is side×side×side.",
    learned: "You learned: a cube has equal edges, so volume is side × side × side",
    traceback: "volume: the bottom layer lights amber with side x side, the layers light up in steps and side x side x side ends green; cube: the bead runs up the height, the unequal edge lights amber and Cuboid ends green",
    items: [
      /* learn LS3: answer in the plan = Yes, it is a cube, and its volume is 729 cu. cm */
      { qid: "M3.S4.T9.C42:LS3", kind: "edges", l: 9, b: 9, h: 9, u: "cm",
        say: "A solid's edges are 9 cm, 9 cm and 9 cm; how many cubic centimetres is it?", ask: "Volume in cubic cm?", answer: 729,
        miss: "Look at the bottom layer: 9 by 9 cubes.", win: "Yes, a cube of 729 cubic centimetres." },
      /* practice 3: answer in the plan = The volume of a cube of edge 10 m is 10 x 10 x 10 = 1000 cu. m */
      { qid: "M3.S4.T9.C42:3", kind: "edges", l: 10, b: 10, h: 10, u: "m",
        say: "A cube has edges of 10 m; what is its volume in cubic metres?", ask: "Volume in cubic m?", answer: 1000,
        miss: "One layer of this cube is 10 by 10 cubes.", win: "Right, that is 1,000 cubic metres." },
      /* practice 4: answer in the plan = No. Its edges are not all equal, so it is a cuboid, not a cube */
      { qid: "M3.S4.T9.C42:4", kind: "edges", l: 6, b: 6, h: 4, u: "cm",
        say: "A solid is 6 cm by 6 cm by 4 cm; is it a cube?", ask: "Is it a cube?", answer: "no",
        choices: [{ id: "yes", label: "Yes" }, { id: "no", label: "No" }],
        miss: "Read the three edge labels: 6 cm, 6 cm and 4 cm.",
        ladder: ["Compare all three edges; a cube has every edge equal.", "One edge that is different makes the solid a cuboid, not a cube."], win: "Right, unequal edges make a cuboid." },
    ],
  },
  {
    n: 4,
    concept: "An edge in tenths",
    conceptId: "M3.S4.T9.C43", objectiveIds: ["O16"],
    says: ["Whole numbers first. Then the tenths."],
    /* a warm-up box 5 cm x 1.5 cm x 2 cm (10, 150 tenths and 15 are none of the phase's answers) */
    steps: [
      { say: "Tap Multiply to multiply the two whole-number edges.", on: "multiply", hint: "Tap the Multiply key beside the box." },
      { say: "Now tap the Tenths lens to hold it over the edge in tenths.", on: "lens", hint: "Tap the round glass beside the box." },
      { say: "Tap Multiply again to multiply the tenths by that product.", on: "multiply", hint: "The Multiply key does the last step." },
    ],
    stepHold: 3000,
    ladder: ["Your product counts tenths of a cubic centimetre, not whole ones.", "Ten tenths make one, so divide the count of tenths by 10 to write it back."],
    closing: "An edge in tenths is multiplied as a count of tenths by the whole-number edges.",
    learned: "You learned: an edge in tenths is multiplied as a count of tenths",
    traceback: "the word tenths lights amber under the product and the count of tenths is written back as cubic centimetres in green; two edges in tenths: the lens stays dark and Taught later lights amber",
    items: [
      /* learn LS4: answer in the plan = 56 cu. cm */
      { qid: "M3.S4.T9.C43:LS4", kind: "tenths", l: 8, b: 3.5, h: 2, u: "cm", t: ["b"],
        say: "A box is 8 cm by 3.5 cm by 2 cm; how many cubic centimetres is its volume?", ask: "Volume in cubic cm?", answer: 56,
        miss: "Look at the lens: what unit is that edge in?", win: "Yes, 560 tenths is 56 cubic centimetres." },
      /* practice 7: answer in the plan = 6 x 4 = 24. 2.5 cm is 25 tenths, and 25 x 24 = 600, so 600 tenths, which is 60 cu. cm */
      { qid: "M3.S4.T9.C43:7", kind: "tenths", l: 6, b: 2.5, h: 4, u: "cm", t: ["b"],
        say: "Find the volume of a box 6 cm by 2.5 cm by 4 cm in cubic centimetres.", ask: "Volume in cubic cm?", answer: 60,
        miss: "Check the unit the lens shows before you multiply.", win: "Right, 600 tenths is 60 cubic centimetres." },
      /* practice 8: answer in the plan = No. Two of its edges have tenths, so it needs a decimal times a decimal, a step taught later */
      { qid: "M3.S4.T9.C43:8", kind: "tenths", l: 4, b: 2.5, h: 1.5, u: "cm", t: ["b", "h"],
        say: "A box 4 cm by 2.5 cm by 1.5 cm: can tenths times whole numbers give its volume?", ask: "Tenths times whole numbers?", answer: "no",
        choices: [{ id: "yes", label: "Yes" }, { id: "no", label: "No" }],
        miss: "Count the edges the lens read in tenths.",
        ladder: ["Tenths times whole numbers works when only one edge has tenths.", "Two edges in tenths need tenths times tenths, a step for later."], win: "Right, that needs a step taught later." },
    ],
  },
];

/* The warm-ups the guide steps work on (never a question's own solid), and the free-play limits. */
const MODEL = {
  warm: [
    { kind: "stack", l: 4, b: 3, h: 2, u: "" },
    { kind: "box", l: 5, b: 3, h: 2, u: "cm" },
    { kind: "edges", l: 3, b: 3, h: 3, u: "cm" },
    { kind: "tenths", l: 5, b: 1.5, h: 2, u: "cm", t: ["b"] },
  ],
  free: { maxL: 8, maxB: 6, maxH: 5 },
  /* the act that unlocks each question's answer (user mode, after a real tap on that question's board; AI mode never gated) */
  answerGate: {
    "1": "stack the layers to the full height (Height handle: a tap per layer, or drag up)",
    "2": "fill the box layer by layer to its lid (Height handle)",
    "3": "run the Edge checker's bead along all three edges",
    "4 Q1-Q2": "tap Multiply (the whole-number edges), then hold the Tenths lens over the edge in tenths",
    "4 Q3": "hold the Tenths lens over both edges in tenths",
    ungated: "none",
  },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: a second route that shares no code with judge or Work: count the solid layer by layer, row by row
   (in tenths of a cube for an edge in tenths); a cube iff its edges are equal; tenths times whole numbers alone iff at
   most one edge has tenths */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const e = [it.l, it.b, it.h];
  const frac = e.filter((x: number) => Math.round(x * 10) % 10 !== 0).length;
  if (it.choices) return it.answer === (p.n === 3 ? (e[0] === e[1] && e[1] === e[2] ? "yes" : "no") : (frac <= 1 ? "yes" : "no"));
  const ten = e.map((x: number) => Math.round(x * 10));
  let tenths = 0;
  for (let z = 0; z < ten[2]; z++) for (let r = 0; r < ten[1]; r++) tenths += ten[0];   /* thousandths of a cube */
  return tenths === it.answer * 1000;
}));
/* the misconception of each phase: P1 the three edge counts added, P2 and P3 one layer only, P4 the tenths left as
   cubic centimetres (ten times too big); Yes for the two Yes / No questions */
const nearMiss = (item: any) => (item.choices ? "yes"
  : item.kind === "stack" ? item.l + item.b + item.h
  : item.kind === "tenths" ? item.answer * 10
  : item.l * item.b);
const answerForms = (item: any) => (typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)] : []);
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() at a question performs the question's acts at once (so AI mode and toolApi runs are never gated);
   undefined in the demo stage, so a guide step reaches api.onEnter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── drawing: an isometric solid ───────────────────────────────────────────────────────────── */
const LS_COS = 0.866;
const LS_VIO = "#5B47D6", LS_AMB = "#E69F00", LS_GRN = "#009E73", LS_BLU = "#0072B2", LS_INK = "#2B2B2B", LS_WARM = "#FFF4E2";
/* the invite's colour: the theme's Enter colour, as the runtime's own ring */
const LS_RING = "#BE1F78";
const LS_FRAME = { x: 172, y: 10, w: 438, h: 372 };
const LS_ROW = { x: 30, y1: 450, y2: 508, s: 40 };   /* 58 apart: 1.45 em for Hindi and Gujarati */
const LS_COL = { x: 680, w: 216 };
const LS_LENS = { x: 788, y: 214, r: 78 };
/* the geometry of a solid l x b x h fitted into a frame, sitting on the frame's bottom */
function lsGeo(l: number, b: number, h: number, fr: any = LS_FRAME) {
  const e = Math.min(64, fr.w / ((l + b) * LS_COS), fr.h / ((l + b) * 0.5 + h));
  const Wd = (l + b) * LS_COS * e, Ht = ((l + b) * 0.5 + h) * e;
  const ox = fr.x + (fr.w - Wd) / 2 + b * LS_COS * e, oy = fr.y + (fr.h - Ht) + h * e;
  const P = (u: number, v: number, z: number) => [ox + (u - v) * LS_COS * e, oy + (u + v) * 0.5 * e - z * e];
  return { e, P, l, b, h };
}
const lsPts = (pts: any[]) => pts.map((p: any) => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
function lsBB(pts: any[]) {
  const xs = pts.map((p: any) => p[0]), ys = pts.map((p: any) => p[1]);
  const x = Math.min(...xs), y = Math.min(...ys), w = Math.max(...xs) - x, h = Math.max(...ys) - y;
  return { x, y, w, h, cx: x + w / 2, cy: y + h / 2 };
}
function lsFaces(g: any, z0: number, z1: number) {
  const { P, l, b } = g;
  return {
    left: [P(0, b, z0), P(l, b, z0), P(l, b, z1), P(0, b, z1)],
    right: [P(l, b, z0), P(l, 0, z0), P(l, 0, z1), P(l, b, z1)],
    top: [P(0, 0, z1), P(l, 0, z1), P(l, b, z1), P(0, b, z1)],
  };
}
/* a picture laid over one face: the wooden cube's flat top as a wood grain, or the cardboard sheet */
function lsTex(pts: any[], cid: string, tex: string) {
  const bb = lsBB(pts);
  return <Skin name="carton" x={bb.x} y={bb.y} w={bb.w} h={bb.h} clip={"url(#" + cid + ")"} />;
}
/* the unit-cube lines on a slab's faces (whole edges only) */
function lsGrid(g: any, z0: number, z1: number, top: boolean, sw: number) {
  const { P, l, b } = g, out: any[] = [];
  const ln = (a: any, c: any, k: string) => out.push(<line key={k} x1={a[0]} y1={a[1]} x2={c[0]} y2={c[1]} stroke={LS_INK} strokeWidth={sw} strokeLinecap="round" />);
  for (let u = 1; u < l - 0.01; u++) ln(P(u, b, z0), P(u, b, z1), "lu" + u + "." + z0);
  for (let v = 1; v < b - 0.01; v++) ln(P(l, v, z0), P(l, v, z1), "rv" + v + "." + z0);
  for (let z = z0 + 1; z < z1 - 0.01; z++) { ln(P(0, b, z), P(l, b, z), "lz" + z); ln(P(l, b, z), P(l, 0, z), "rz" + z); }
  if (top) {
    for (let u = 1; u < l - 0.01; u++) ln(P(u, 0, z1), P(u, b, z1), "tu" + u);
    for (let v = 1; v < b - 0.01; v++) ln(P(0, v, z1), P(l, v, z1), "tv" + v);
  }
  return out;
}
/* one slab (z0 to z1) of the solid: plain fill (the fallback), the picture, the light, a colour code, the grid, the outline */
function lsSlab(g: any, z0: number, z1: number, o: any) {
  const F = lsFaces(g, z0, z1), keys = o.top ? ["left", "right", "top"] : ["left", "right"];
  const sw = Math.max(2, Math.min(2.6, g.e / 14));
  return (
    <g key={o.id}>
      {keys.map((k) => {
        const pts = (F as any)[k], cid = "ls-" + o.id + k;
        return (
          <g key={k}>
            <clipPath id={cid}><polygon points={lsPts(pts)} /></clipPath>
            <polygon points={lsPts(pts)} fill={o.tex === "carton" ? "#D8B98A" : LS_WARM} />
            {o.tex === "carton" && lsTex(pts, cid, o.tex)}
            {o.tint && <polygon points={lsPts(pts)} fill={o.tint} fillOpacity={o.op ?? 0.88} />}
            {k === "top" && <polygon points={lsPts(pts)} fill="#FFFFFF" fillOpacity={0.05} />}
            {k !== "top" && <polygon points={lsPts(pts)} fill="#000000" fillOpacity={k === "left" ? 0.07 : 0.18} />}
          </g>
        );
      })}
      {o.grid && lsGrid(g, z0, z1, !!o.top, sw)}
      {keys.map((k) => <polygon key={"o" + k} points={lsPts((F as any)[k])} fill="none" stroke={LS_INK} strokeWidth={sw + 1.4} strokeLinejoin="round" />)}
    </g>
  );
}
/* one unit cube with the wooden-cube picture over it (a base layer of at most 40 cubes) */
function lsCube(g: any, u: number, v: number, z: number, id: string, tint: any) {
  const { P } = g;
  const hex = [P(u, v, z + 1), P(u + 1, v, z + 1), P(u + 1, v, z), P(u + 1, v + 1, z), P(u, v + 1, z), P(u, v + 1, z + 1)];
  const c = P(u + 1, v + 1, z + 1), bb = lsBB(hex), cid = "ls-c" + id;
  const sw = Math.max(2, Math.min(2.6, g.e / 14));
  const leftFace = [P(u, v + 1, z), P(u + 1, v + 1, z), c, P(u, v + 1, z + 1)];
  const rightFace = [P(u + 1, v + 1, z), P(u + 1, v, z), P(u + 1, v, z + 1), c];
  const topFace = [hex[0], hex[1], c, P(u, v + 1, z + 1)];

  return (
    <g key={id}>
      <clipPath id={cid}><polygon points={lsPts(hex)} /></clipPath>
      <polygon points={lsPts(hex)} fill={LS_WARM} />
      <Skin name="cube" x={bb.x} y={bb.y} w={bb.w} h={bb.h} fit="stretch" clip={"url(#" + cid + ")"} />
      {tint && <polygon points={lsPts(hex)} fill={tint} fillOpacity={0.84} />}
      <polygon points={lsPts(topFace)} fill="#FFFFFF" fillOpacity={0.05} />
      <polygon points={lsPts(leftFace)} fill="#000000" fillOpacity={0.07} />
      <polygon points={lsPts(rightFace)} fill="#000000" fillOpacity={0.18} />
      <path d={`M ${c[0]} ${c[1]} L ${hex[0][0]} ${hex[0][1]} M ${c[0]} ${c[1]} L ${hex[2][0]} ${hex[2][1]} M ${c[0]} ${c[1]} L ${hex[4][0]} ${hex[4][1]}`}
        stroke={LS_INK} strokeWidth={sw} fill="none" />
      <polygon points={lsPts(hex)} fill="none" stroke={LS_INK} strokeWidth={sw + 0.8} strokeLinejoin="round" />
    </g>
  );
}
/* the base layer, cube by cube from the back (painter's order) */
function lsBase(g: any, tint: any, id: string) {
  const out: any[] = [];
  for (let s = 0; s <= g.l + g.b - 2; s++) for (let u = 0; u < g.l; u++) { const v = s - u; if (v >= 0 && v < g.b) out.push(lsCube(g, u, v, 0, id + u + "." + v, tint)); }
  return out;
}
/* where the edge labels stand: length under the left foot, breadth under the right foot, height left of the back edge */
function lsLabels(g: any) {
  const { P, l, b, h } = g;
  const L = P(l / 2, b, 0), B = P(l, b / 2, 0), H = P(0, b, h / 2);
  return { l: { x: L[0] - 34, y: L[1] + 64, a: "end" }, b: { x: B[0] + 40, y: B[1] + 64, a: "start" }, h: { x: H[0] - 26, y: H[1] + 14, a: "end" } };
}
const lsNum = (x: number) => String(x);
/* the outline of a whole solid (its six outer corners) and a point's distance to it */
const lsHull = (g: any) => { const { P, l, b, h } = g; return [P(0, 0, h), P(l, 0, h), P(l, 0, 0), P(l, b, 0), P(0, b, 0), P(0, b, h)]; };
function lsDist(x: number, y: number, pts: any[]) {
  let best = 1e9;
  pts.forEach((a: any, i: number) => {
    const c = pts[(i + 1) % pts.length], dx = c[0] - a[0], dy = c[1] - a[1];
    const t = Math.max(0, Math.min(1, ((x - a[0]) * dx + (y - a[1]) * dy) / (dx * dx + dy * dy || 1)));
    best = Math.min(best, Math.hypot(x - a[0] - t * dx, y - a[1] - t * dy));
  });
  return best;
}
/* the tool's own controls (a key press on one of them is its act, never a nudge) */
const LS_OWN = ["lift", "run", "lens", "multiply", "count", "longer", "wider", "units"];
/* the width of a pencil-written string: the pencil's own layout */
const lsPenW = (s: string, size: number) => penLayout(s, 0, 0, size, "start", 0).w;
const lsRowW = (s: string, size: number) => Array.from(s).reduce((a: number, ch: string) => a + (ch === " " ? 0.28 : ch === "." || ch === "," ? 0.3 : /[0-9]/.test(ch) ? 0.62 : 0.56), 0) * size;
/* the drawn handle's grip: at the right edge of the solid, level with the top of the stack */
const lsGrip = (g: any, z: number) => { const p = g.P(g.l, 0, z); return { x: p[0] + (g.gd || 46), y: p[1] }; };

/* ── the working area ──────────────────────────────────────────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, api, MODEL, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const warmOn = (stage === "demo" || stage === "teach") && MODEL.warm[n - 1];
  const it: any = free ? { kind: "free" } : warmOn ? MODEL.warm[n - 1] : item;
  const kind = it ? it.kind : "stack";

  /* the board is keyed to the ENTRY of a question (PATTERNS §18): a question entered again opens fresh */
  const ent = useRef({ base: "", n: 0 });
  const base = free ? "free" : n + ":" + (warmOn ? "w" : index);
  if (base !== ent.current.base) { ent.current.base = base; ent.current.n++; }
  const qk = base + "#" + ent.current.n;
  const fresh = () => ({ qk, layers: kind === "box" ? 0 : 1, runs: 0, mult: 0, lens: 0, pc1: 0, pc2: 0, tb: -1, touch: 0,
    bead: false, lensAway: false, fl: 4, fb: 3, fh: 1, fu: "cm" });
  const [raw, setRaw] = useState<any>({ qk: "" });
  const S = raw.qk === qk ? raw : fresh();
  const put = (o: any) => setRaw((p: any) => { const s0 = p.qk === qk ? p : fresh(); return { ...s0, ...(typeof o === "function" ? o(s0) : o) }; });
  const busy = useRef(false);
  /* a new question (also a teacher's gotoStep mid-act) starts with no act in flight: the old act was ended by the runtime */
  const lastQk = useRef("");
  if (lastQk.current !== qk) { lastQk.current = qk; busy.current = false; }
  const real = useRef(false);
  const gated = useRef(false);
  const tbOn = useRef(false);

  /* the solid on show */
  const dims = free ? { l: S.fl, b: S.fb, h: S.fh } : { l: it.l, b: it.b, h: it.h };
  const g: any = free ? lsGeo(S.fl, S.fb, MODEL.free.maxH, { ...LS_FRAME, x: LS_FRAME.x - 20, h: 420 }) : lsGeo(dims.l, dims.b, dims.h);
  if (!free) g.gd = 61;
  const gs = free ? { ...g, l: S.fl, b: S.fb, h: S.fh } : g;      /* free play: the frame of this base at the full height, so stacking never jumps */
  const unit = free ? S.fu : it.u;
  const tenOf = (k: string) => Math.round((it as any)[k] * 10);
  const tset = (it && it.t) || [];
  const wholes = ["l", "b", "h"].filter((k) => tset.indexOf(k) < 0);
  const yn = !!(it && it.choices);
  const isCube = dims.l === dims.b && dims.b === dims.h;
  const vol = (dims.l * dims.b * dims.h);

  /* is the question's act done? (the answer is gated on it) */
  const actDone = kind === "stack" || kind === "box" ? S.layers >= dims.h
    : kind === "edges" ? S.runs >= 3
    : kind === "tenths" ? (yn ? S.lens >= 2 : S.mult >= 1 && S.lens >= 1) : true;
  const finishActs = () => put((s: any) => (kind === "stack" || kind === "box" ? { layers: dims.h }
    : kind === "edges" ? { runs: 3 }
    : yn ? { lens: 2 } : { mult: Math.max(1, s.mult), lens: 1, pc1: 99 }));

  /* a real tap on one of the tool's own pieces, in user mode: from then on a question's answer waits for its act */
  const userMode = () => { try { const t = (window as any).toolApi; return !(t && t.getState && t.getState().mode === "ai"); } catch (e) { return true; } };
  const markReal = () => {
    if (!userMode()) return;
    real.current = true;
    if (needAct) { gated.current = true; api.lock(true); }
    put((s: any) => ({ touch: s.touch + 1 }));
  };
  /* after an act that did not finish the question, the gate holds (never released by a motion ending) */
  const hold = (done: boolean) => { if (gated.current && stage === "ask" && !done) api.lock(true); };

  /* ── the acts, each performed on screen ── */
  const write = (text: any, at: any[], key: string, len: number) =>
    api.act({ tool: "pencil", moves: "write", text, at, size: LS_ROW.s, align: "start", onPoint: (j: number) => put({ [key]: j + 1 }) })
      .then((ok: boolean) => { if (ok) put({ [key]: len }); return ok; });
  const lift = async (k: number) => {
    const H = free ? MODEL.free.maxH : dims.h, z0 = free ? S.fh : S.layers;
    if (busy.current) return false;
    let to = Math.min(H, z0 + k);
    if (to === z0) return false;
    busy.current = true;
    const pts: any[] = [];
    if (to > z0) for (let z = z0 + 1; z <= to; z++) pts.push(lsGrip(gs, z)); else pts.push(lsGrip(gs, to));
    const ok = await api.act({ tool: "hand", moves: "push", from: lsGrip(gs, z0), at: pts,
      onPoint: (i: number) => put(free ? { fh: to > z0 ? z0 + i + 1 : to } : { layers: z0 + i + 1 }) });
    busy.current = false;
    if (ok) put(free ? { fh: to, layers: to } : { layers: to });
    if (!free) hold(ok && to >= dims.h);
    return ok;
  };
  const beadEnd = (r: number) => (r === 0 ? g.P(0, g.b, 0) : r === 1 ? g.P(g.l, 0, 0) : g.P(g.l, g.b, g.h));
  const runBead = async () => {
    if (busy.current || S.runs >= 3) return false;
    busy.current = true;
    const F = g.P(g.l, g.b, 0), E = beadEnd(S.runs);
    put({ bead: true });
    const ok = await api.act({ tool: "hand", moves: "push", from: { x: F[0], y: F[1] }, at: [{ x: E[0], y: E[1] }],
      hold: <circle r={17} fill="url(#ls-bead-grad)" stroke={LS_INK} strokeWidth={4} filter="url(#ls-shadow)" /> });
    busy.current = false;
    put((s: any) => ({ bead: false, runs: ok ? s.runs + 1 : s.runs }));
    hold(ok && S.runs + 1 >= 3);
    return ok;
  };
  const LB = lsLabels(g);
  const lensAt = (k: number) => {
    if (k === 0) return { x: LS_LENS.x, y: LS_LENS.y };
    const p = (LB as any)[tset[k - 1]], lw = lsRowW(lbl(tset[k - 1]), T.prompt);
    let x = Math.max(LS_LENS.r + 4, p.a === "end" ? p.x - lw / 2 : p.x + lw / 2);
    const y = p.y - 35, dir = p.a === "end" ? -1 : 1;
    /* the glass keeps 12+ clear of the box: slide it sideways (right of the box, or left of it), never down onto the working line */
    for (let i = 0; i < 80 && lsDist(x, y, lsHull(g)) < LS_LENS.r + 17; i++) x += 2 * dir;
    return { x: Math.max(LS_LENS.r + 4, x), y };
  };
  const moveLens = async () => {
    const max = Math.max(1, tset.length);
    if (busy.current || S.lens >= max) return false;
    busy.current = true;
    put({ lensAway: true });
    const ok = await api.act({ tool: "hand", moves: "carry", from: lensAt(S.lens), at: [lensAt(S.lens + 1)], hold: lsGlass(null) });
    busy.current = false;
    put((s: any) => ({ lensAway: false, lens: ok ? s.lens + 1 : s.lens }));
    hold(ok && (yn ? S.lens + 1 >= 2 : S.mult >= 1));
    return ok;
  };
  const r1 = () => (kind === "stack" ? `${dims.l} × ${dims.b} = ${dims.l * dims.b}` : `${tenOf(wholes[0]) / 10} × ${tenOf(wholes[1]) / 10} = ${(tenOf(wholes[0]) * tenOf(wholes[1])) / 100}`);
  const multiply = async () => {
    if (busy.current) return false;
    busy.current = true;
    let ok = false;
    if (S.mult === 0) ok = await write(r1(), [{ x: LS_ROW.x, y: LS_ROW.y1 }], "pc1", r1().length);
    else if (warmOn) {
      const tc = tenOf(tset[0]), w = (tenOf(wholes[0]) * tenOf(wholes[1])) / 100, a = `${tc} × ${w} = ${tc * w}`;
      ok = await write([a, lsNum(vol)], [{ x: LS_ROW.x, y: LS_ROW.y2 }, { x: w2x(a), y: LS_ROW.y2 }], "pc2", a.length + lsNum(vol).length);
    }
    busy.current = false;
    if (ok) put((s: any) => ({ mult: s.mult + 1 }));
    hold(ok && S.lens >= 1);
    return ok;
  };
  const w2x = (a: string) => LS_ROW.x + lsPenW(a, LS_ROW.s) + 14 + lsRowW(tx("tenths") + " =", LS_ROW.s) + 14;
  const countBase = async () => {
    if (busy.current || S.pc1 > 0) return false;
    busy.current = true;
    const ok = await write(r1(), [{ x: LS_ROW.x, y: LS_ROW.y1 }], "pc1", r1().length);
    busy.current = false;
    return ok;
  };

  const stepAt = useRef(0);
  const pressAt = useRef(0);
  const enterAt = useRef(0);
  /* a guide step's act (the warm-up), reported once it has played */
  const doStep = async (on: string) => {
    let ok: any = false;
    if (on === "count") ok = await countBase();
    if (on === "lift") {
      ok = await lift(1);
      if (ok && kind === "stack") { const a = `${dims.h} × ${dims.l * dims.b} = ${vol}`; ok = await write(a, [{ x: LS_ROW.x, y: LS_ROW.y2 }], "pc2", a.length); }
      if (ok && kind === "box" && S.layers + 1 >= dims.h) { const a = `${dims.l} × ${dims.b} × ${dims.h} = ${vol}`; ok = await write(a, [{ x: LS_ROW.x, y: LS_ROW.y2 }], "pc2", a.length); }
    }
    if (on === "run") ok = await runBead();
    if (on === "multiply") ok = await multiply();
    if (on === "lens") ok = await moveLens();
    if (ok) { stepAt.current = Date.now(); api.did(on); }
  };
  /* a tap on one of the tool's pieces */
  const press = (on: string, fn: () => any) => {
    if (Date.now() - pressAt.current < 300) return;   /* a 45 ms double tap is one press, in reduced motion too */
    pressAt.current = Date.now();
    markReal();
    if (stage === "demo" || stage === "teach") { if (stepOn !== on) { api.did(on); return; } doStep(on); return; }
    if (stage === "ask" && S.tb < 0) fn();
    if (free) fn();
  };
  api.onEnter((stage === "demo") && stepOn ? () => {
    if (busy.current || Date.now() - stepAt.current < 300) return;   /* two Enters 50 ms apart are one step */
    if (Date.now() - enterAt.current < 250) markReal();               /* only a real (trusted) Enter is a touch */
    doStep(stepOn);
  } : null);
  HOOK.check = stage === "ask" && !actDone ? () => { finishActs(); return undefined; } : null;

  /* the Height handle: a tap stacks one layer, a drag up stacks as many as it travels */
  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    const k = moved ? Math.round((lsGrip(gs, free ? S.fh : S.layers).y - p.y) / g.e) : 1;
    if (k <= 0) return;   /* a drag down or sideways stacks nothing; a tap stacks one */
    press("lift", () => lift(k));
  });

  /* the answer waits for the act (user mode, after a real tap; AI mode and toolApi runs are never gated) */
  const needAct = stage === "ask" && !actDone && S.tb < 0;
  useEffect(() => {
    /* the gate engages once the child has touched THIS question's board for real (a tap on one of its pieces, user mode) */
    if (needAct && real.current && S.touch > 0) { gated.current = true; api.lock(true); }
    else if (gated.current) { gated.current = false; if (!tbOn.current) api.lock(false); }
  }, [needAct, S.touch, qk]);
  const nudged = useRef(false);
  const nudgeLine = () => (kind === "stack" ? "Stack the layers up to the dashed top first."
    : kind === "box" ? "Stack the layers up to the top of the box first."
    : kind === "edges" ? "Run the bead along all three edges first."
    : yn ? "Use the Tenths lens on the box first."
    : S.mult >= 1 ? "Hold the Tenths lens over the edge in tenths first."
    : S.lens >= 1 ? "Tap Multiply first." : "Tap Multiply and the Tenths lens first.");
  const nudgeRef = useRef(nudgeLine);
  nudgeRef.current = nudgeLine;
  useEffect(() => {
    if (!needAct) return;
    const onDown = (e: any) => {
      const el = e.target && e.target.closest ? e.target.closest('[data-control="answer-open"]') : null;
      if (el && gated.current && !busy.current) { nudged.current = true; api.say(nudgeRef.current()); }
      const hk = e.target && e.target.closest ? e.target.closest('[data-control="again"]') : null;
      if (hk && nudged.current && item) { nudged.current = false; api.say(item.say); }   /* Hint over a nudge: the question again */
    };
    const onKey = (e: any) => {
      const hk = e.target && e.target.closest ? e.target.closest('[data-control="again"]') : null;
      if (hk && (e.key === "Enter" || e.key === " ") && nudged.current && item) { nudged.current = false; api.say(item.say); return; }
      if (!gated.current || busy.current || !/^([0-9]|Enter|Escape|y|n|Y|N|\.)$/.test(e.key)) return;
      const c = e.target && e.target.closest ? e.target.closest("[data-control]") : null;
      if (c && LS_OWN.indexOf(c.getAttribute("data-control")) >= 0) return;   /* Enter on the handle, bead, lens or a key is that act */
      nudged.current = true; api.say(nudgeRef.current());
    };
    window.addEventListener("pointerdown", onDown, true);
    window.addEventListener("keydown", onKey, true);
    return () => { window.removeEventListener("pointerdown", onDown, true); window.removeEventListener("keydown", onKey, true); };
  }, [needAct, qk]);
  useEffect(() => { if (needAct && nudged.current && item) { nudged.current = false; api.say(item.say); } }, [S.layers, S.runs, S.mult, S.lens]);
  useEffect(() => {
    const onKey = (e: any) => { if (e.key === "Enter" && e.isTrusted) enterAt.current = Date.now(); };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, []);
  useEffect(() => { if (!needAct && nudged.current && stage === "ask" && item) { nudged.current = false; api.say(item.say); } }, [needAct]);
  useEffect(() => { nudged.current = false; }, [qk]);
  useEffect(() => () => { tl.stop(); if (tbOn.current || gated.current) { tbOn.current = false; gated.current = false; api.lock(false); } }, [qk]);

  /* the win line, one sentence (the runtime puts the phase's closing in its place at the last question) */
  useEffect(() => { if (stage === "win" && item) { finishActs(); if (item.win) api.say(item.win); } }, [stage, qk]);

  /* the traceback: the acts done, then the maths redrawn in steps, ending on the whole right answer */
  const tbN = kind === "edges" && !yn ? dims.h + 1 : kind === "stack" || kind === "box" ? dims.h + 1 : 2;
  useEffect(() => {
    if (!wrong || wrong.tries < 3 || stage !== "ask" || !item) return;   /* misses 1 and 2: the bubble's clue only (the owner, 2026-11-18) */
    tbOn.current = true;
    api.lock(true);
    finishActs();
    const seq: any[] = [];
    for (let k = 0; k < tbN; k++) seq.push([kind === "tenths" || yn ? (k === 0 ? 350 : 1100) : k === 0 ? 1200 : dims.h > 5 ? 340 : 650, () => put({ tb: k })]);   /* [ms, fn]: fn, then ms: the bottom layer stays lit 1.2 s */
    seq.push([900, () => {}]);
    tl.run(seq, () => { tbOn.current = false; api.lock(false); });
  }, [wrong]);

  const winOn = (stage === "win" || stage === "idle") && !!item;
  const tbFull = S.tb >= tbN - 1;
  const showEnd = winOn || tbFull;

  api.share({ phase: n, base_length: dims.l, base_breadth: dims.b, layers: kind === "edges" || kind === "tenths" ? dims.h : S.layers,
    count: showEnd ? vol : null, units: unit || "cubes", edges_equal: kind === "edges" && (showEnd || warmOn) ? isCube : null,
    tenths: kind === "tenths" ? S.lens : null, answer: showEnd ? (item ? item.answer : null) : null, complete: stage === "idle" });

  /* ── drawing ── */
  const lbl = (k: string) => {
    const v = (dims as any)[k];
    return unit ? `${lsNum(v)} ${tx(unit)}` : `${v} ${tx(k === "l" ? "long" : k === "b" ? "wide" : "high")}`;
  };
  const deep = (c: string) => shade(c, 0.25);
  const edgeLabels = () => ["l", "b", "h"].map((k) => {
    const p = (LB as any)[k];
    const lensHere = kind === "tenths" && tset.indexOf(k) >= 0 && S.lens > tset.indexOf(k) && !(S.lensAway && S.lens === tset.indexOf(k) + 1);
    if (lensHere) return null;
    const dark = kind === "tenths" && yn && k === tset[1] && S.lens >= 2 && (S.tb >= 0 || showEnd);
    if (dark) return null;   /* under the smoked lens: the lens shows it */
    return <text key={k} x={p.x} y={p.y} textAnchor={p.a} fontSize={T.prompt} fontWeight={700} fill={deep(LS_BLU)}
      stroke="#FFFDF7" strokeWidth={8} paintOrder="stroke">{lbl(k)}</text>;
  });

  /* the solid */
  const solid = () => {
    if (kind === "stack" || kind === "free") {
      const H = free ? S.fh : dims.h, top = free ? S.fh : S.layers;
      const big = free || gs.l * gs.b > 40;   /* free play: one look, plain violet faces */
      const ghost = lsFaces(gs, 0, free ? S.fh : dims.h);
      return (
        <g>
          {!free && <path d={"M " + [ghost.top[0], ghost.top[1], ghost.right[1], ghost.right[0], ghost.left[0], ghost.left[3], ghost.top[0]].map((q: any) => q[0].toFixed(1) + " " + q[1].toFixed(1)).join(" L ")
            + " M " + ghost.top[2][0].toFixed(1) + " " + ghost.top[2][1].toFixed(1) + " L " + ghost.top[1][0].toFixed(1) + " " + ghost.top[1][1].toFixed(1)
            + " M " + ghost.top[2][0].toFixed(1) + " " + ghost.top[2][1].toFixed(1) + " L " + ghost.top[3][0].toFixed(1) + " " + ghost.top[3][1].toFixed(1)
            + " M " + ghost.top[2][0].toFixed(1) + " " + ghost.top[2][1].toFixed(1) + " L " + ghost.right[0][0].toFixed(1) + " " + ghost.right[0][1].toFixed(1)}
            fill="none" stroke={LS_INK} strokeOpacity={0.5} strokeWidth={2.5} strokeDasharray="10 9" />}
          {big ? lsSlab(gs, 0, 1, { id: "b0", top: top === 1, tex: null, tint: !free && S.tb === 0 ? LS_AMB : LS_VIO, grid: true }) : lsBase(gs, !free && S.tb === 0 ? LS_AMB : LS_VIO, "b")}
          {Array.from({ length: Math.max(0, top - 1) }, (_, i) => {
            const z = i + 1, lit = (!free && S.tb >= 0 && S.tb === z) || (!free && S.tb < 0 && !showEnd && busy.current && z === top - 1);
            return lsSlab(gs, z, z + 1, { id: "s" + z, top: z === top - 1, tex: null, tint: lit ? LS_AMB : LS_VIO, grid: true });
          })}
          {void H}
          {layerTag()}
        </g>
      );
    }
    if (kind === "box") {
      const L = S.layers;
      return (
        <g>
          {lsSlab(g, 0, g.h, { id: "box", top: true, tex: "carton" })}
          {Array.from({ length: L }, (_, z) => lsSlab(g, z, z + 1, { id: "l" + z, top: z === g.h - 1, tex: null,
            tint: S.tb === z || (S.tb < 0 && busy.current && z === L - 1) ? LS_AMB : LS_VIO, grid: true }))}
          {tbOverlay()}
          {layerTag()}
        </g>
      );
    }
    if (kind === "edges") {
      const lit = (r: number) => S.runs > r || (yn && S.tb >= 0 && r === 2);
      const ends = [beadEnd(0), beadEnd(1), beadEnd(2)], F = g.P(g.l, g.b, 0);
      const endC = (r: number) => (showEnd || (warmOn && S.runs >= 3) ? (isCube ? LS_GRN : r === 2 ? LS_AMB : LS_GRN) : LS_AMB);
      return (
        <g>
          {lsSlab(g, 0, g.h, { id: "sol", top: true, tex: null, grid: true, tint: yn && (S.tb >= 0 || showEnd) ? LS_VIO : null })}
          {tbOverlay()}
          {layerTag()}
          {ends.map((E: any, r: number) => lit(r) ? <line key={"e" + r} x1={F[0]} y1={F[1]} x2={E[0]} y2={E[1]} stroke={endC(r)} strokeWidth={10} strokeLinecap="round" opacity={0.9} /> : null)}
        </g>
      );
    }
    /* tenths: a cardboard box, no grid (an edge in tenths has no whole cubes) */
    return <g>{lsSlab(g, 0, g.h, { id: "tbx", top: true, tex: "carton" })}</g>;
  };
  /* the written label of the layer the correction lights amber */
  const layerTag = () => {
    if (!(S.tb >= 0 && !showEnd && !yn && S.tb < dims.h && (kind === "stack" || kind === "box" || kind === "edges"))) return null;
    const p = g.P(g.l, 0, S.tb + 0.5), x = p[0] + (kind === "edges" ? 28 : (g.gd || 46) + 45);
    return <text x={x} y={p[1] + 14} fontSize={T.prompt} fontWeight={700} fill={deep(LS_AMB)} stroke="#FFFDF7" strokeWidth={8} paintOrder="stroke" pointerEvents="none">{tx("Layer")}</text>;
  };
  /* the correction's colour code over the solid: the base layer amber, then the layers above it in turn */
  const tbOverlay = () => {
    if (!(S.tb >= 0 || showEnd) || yn || !(kind === "stack" || kind === "box" || kind === "edges")) return null;
    const upto = showEnd ? dims.h : Math.min(dims.h, S.tb + 1);
    if (kind === "stack") return null;
    return (
      <g pointerEvents="none">
        {Array.from({ length: upto }, (_, z) => lsSlab(g, z, z + 1, { id: "tb" + z, top: z === upto - 1, tex: null,
          tint: !showEnd && z === S.tb ? LS_AMB : LS_VIO, grid: true }))}
      </g>
    );
  };

  /* the rows of working: pencil where the child's act wrote it, printed where the correction or the win shows it */
  const rows = () => {
    const out: any[] = [];
    const S1 = LS_ROW.s;
    /* a row of working: one text, its terms spaced by dx rather than by space characters (labels on the board stay short) */
    const txt = (key: string, x: number, y: number, parts: any[]) => {
      const toks: any[] = [];
      parts.forEach((p: any) => String(p.t).split(" ").filter(Boolean).forEach((t: string) => {
        const last = toks[toks.length - 1];
        if (t === "×" && last) last.t = last.t + " ×"; else toks.push({ t, c: p.c || LS_INK });   /* "×" rides on the number before it, a space each side */
      }));
      return (
        <text key={key} x={x} y={y} fontSize={S1} fontWeight={700} fill={LS_INK}>
          {toks.map((r: any, j: number) => <tspan key={j} dx={j ? 0.28 * S1 : 0} fill={r.c}>{r.t}</tspan>)}
        </text>
      );
    };
    const uw = unit ? " " + tx(unit === "m" ? "cu. m" : "cu. cm") : " " + tx("cubes");
    if (free) {
      out.push(txt("fr", LS_ROW.x, LS_ROW.y2, [{ t: `${S.fl} × ${S.fb} × ${S.fh} = ${S.fl * S.fb * S.fh}` }, { t: " " + tx(S.fu === "m" ? "cu. m" : "cu. cm") }]));
      return out;
    }
    if (kind === "stack" || kind === "box" || (kind === "edges" && !yn)) {
      const a = `${dims.l} × ${dims.b} = ${dims.l * dims.b}`;
      const bLine = kind === "stack" ? `${dims.h} × ${dims.l * dims.b} = ${vol}` : `${dims.l} × ${dims.b} × ${dims.h} = ${indian(vol)}`;
      if (warmOn) {
        if (kind === "stack" && S.pc1 > 0) out.push(<PencilText key="w1" text={a} x={LS_ROW.x} y={LS_ROW.y1} size={S1} align="start" chars={S.pc1} />);
        if (S.pc2 > 0) out.push(<PencilText key="w2" text={bLine} x={LS_ROW.x} y={LS_ROW.y2} size={S1} align="start" chars={S.pc2} />);
        if (kind === "box" && S.pc2 >= bLine.length) out.push(txt("wu", LS_ROW.x + lsPenW(bLine, S1) + 14, LS_ROW.y2, [{ t: uw }]));
        if (kind === "edges" && S.runs >= 3) out.push(txt("wc", LS_ROW.x, LS_ROW.y2, [{ t: `${dims.l} = ${dims.b} = ${dims.h}` }]));
        return out;
      }
      if (S.tb >= 0 || showEnd) out.push(txt("t1", LS_ROW.x, LS_ROW.y1, [{ t: a, c: !showEnd && S.tb === 0 ? deep(LS_AMB) : LS_INK }]));
      if (showEnd) out.push(txt("t2", LS_ROW.x, LS_ROW.y2, [{ t: bLine, c: deep(LS_GRN) }, { t: uw, c: deep(LS_GRN) }]));
      return out;
    }
    if (kind === "edges" && yn) {
      if (S.tb >= 0 || showEnd) out.push(txt("y1", LS_ROW.x, LS_ROW.y1 + (lang === "hi" ? 6 : 0), [{ t: `${dims.l} ${tx("cm")},` }, { t: `${dims.b} ${tx("cm")},` }, { t: `${dims.h} ${tx("cm")}`, c: deep(LS_AMB) }]));
      if (showEnd) out.push(txt("y2", LS_ROW.x, LS_ROW.y2 + (lang === "hi" ? 6 : 0), [{ t: tx("No: edges not equal"), c: deep(LS_GRN) }]));
      return out;
    }
    if (kind === "edges") return out;
    /* tenths */
    if (yn) {
      if (S.tb >= 0 || showEnd) out.push(txt("q1", LS_ROW.x, LS_ROW.y1, [{ t: tx("Two edges in tenths"), c: deep(LS_AMB) }]));
      if (showEnd) out.push(txt("q2", LS_ROW.x, LS_ROW.y2, [{ t: tx("No: a step for later"), c: deep(LS_GRN) }]));
      return out;
    }
    const a = r1();
    if (S.pc1 > 0 && S.pc1 < 99) out.push(<PencilText key="p1" text={a} x={LS_ROW.x} y={LS_ROW.y1} size={S1} align="start" chars={S.pc1} />);
    if (S.pc1 >= 99) out.push(txt("p1t", LS_ROW.x, LS_ROW.y1, [{ t: a }]));
    const tc = tenOf(tset[0]), w = (tenOf(wholes[0]) * tenOf(wholes[1])) / 100, b2 = `${tc} × ${w} = ${tc * w}`;
    if (warmOn && S.pc2 > 0) {
      out.push(<PencilText key="p2" text={b2} x={LS_ROW.x} y={LS_ROW.y2} size={S1} align="start" chars={Math.min(S.pc2, b2.length)} />);
      if (S.pc2 >= b2.length) out.push(txt("p2t", LS_ROW.x + lsPenW(b2, S1) + 14, LS_ROW.y2, [{ t: tx("tenths") + " =" }]));
      if (S.pc2 > b2.length) out.push(<PencilText key="p2v" text={lsNum(vol)} x={w2x(b2)} y={LS_ROW.y2} size={S1} align="start" chars={S.pc2 - b2.length} />);
      if (S.pc2 >= b2.length + lsNum(vol).length) out.push(txt("p2u", w2x(b2) + lsPenW(lsNum(vol), S1) + 14, LS_ROW.y2, [{ t: tx("cu. cm") }]));
      return out;
    }
    if (S.tb >= 0 || showEnd) {
      const parts: any[] = [{ t: b2 + " " }, { t: tx("tenths"), c: S.tb >= 0 ? deep(LS_AMB) : LS_INK }];
      if (showEnd) parts.push({ t: " = " + lsNum(vol), c: deep(LS_GRN) }, { t: " " + tx("cu. cm"), c: deep(LS_GRN) });
      out.push(txt("p3", LS_ROW.x, LS_ROW.y2, parts));
    }
    return out;
  };

  /* the controls */
  const grip = () => {
    if (!(kind === "stack" || kind === "box" || free)) return null;
    const H = free ? MODEL.free.maxH : dims.h, z = free ? S.fh : S.layers, gp = lsGrip(gs, z), b0 = lsGrip(gs, 0), bt = lsGrip(gs, H);
    const full = z >= H;
    const live = !full && !busy.current;
    return (
      <g>
        <line x1={b0.x} y1={b0.y} x2={bt.x} y2={bt.y} stroke={LS_INK} strokeOpacity={0.4} strokeWidth={4} strokeDasharray="6 8" strokeLinecap="round" />
        <g {...(live ? { ...control("lift", tx("Height handle")), ...drag.bind(1), ...drag.keys(1) } : { "aria-disabled": "true" })} style={{ cursor: live ? "grab" : "default" } as any} opacity={full ? 0.45 : 1}>
          <rect x={gp.x - 36} y={gp.y - 36} width={72} height={72} fill="transparent" />
          <circle cx={gp.x} cy={gp.y} r={28} fill={live ? "url(#ls-handle-grad)" : tint(C.panel, 0.4)} stroke={LS_INK} strokeWidth={4} filter={live ? "url(#ls-shadow)" : undefined} />
          <circle cx={gp.x} cy={gp.y} r={22} fill="none" stroke="#FFFFFF" strokeWidth={2} opacity={0.6} />
          <path d={`M ${gp.x - 11} ${gp.y + 6} L ${gp.x} ${gp.y - 8} L ${gp.x + 11} ${gp.y + 6}`} fill="none" stroke={LS_INK} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
    );
  };
  const bead = () => {
    if (kind !== "edges" || S.bead) return null;
    const F = g.P(g.l, g.b, 0), live = S.runs < 3 && !busy.current && !showEnd;
    return (
      <g>
        {live && <Hit id="run" x={F[0] - 36} y={F[1] - 36} w={72} h={72} onPress={() => press("run", runBead)} label={tx("Edge checker")} />}
        <circle cx={F[0]} cy={F[1]} r={17} fill="url(#ls-bead-grad)" stroke={LS_INK} strokeWidth={4} pointerEvents="none" filter="url(#ls-shadow)" />
        <circle cx={F[0] - 4} cy={F[1] - 4} r={5} fill="#FFFFFF" opacity={0.6} pointerEvents="none" />
      </g>
    );
  };
  const multKey = () => {
    if (kind !== "tenths" || yn) return null;
    const live = !busy.current && (stage === "demo" || (stage === "ask" && S.mult < 1 && S.tb < 0 && !showEnd));
    return (
      <Key id="multiply" x={LS_COL.x} y={20} w={LS_COL.w} h={80} C={C} tone="key" disabled={!live}
        label={tx("Multiply")} onClick={() => press("multiply", multiply)}>
        <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={live ? toneInk("key", C.ink) : tint(LS_INK, 0.45)}>{tx("Multiply")}</text>
      </Key>
    );
  };
  const lens = () => {
    if (kind !== "tenths") return null;
    const max = Math.max(1, tset.length);
    const out: any[] = [];
    /* readings left behind where the lens was (Q3: the first edge stays read when the lens moves on) */
    for (let k = 1; k <= S.lens; k++) {
      if (S.lensAway && k === S.lens) continue;
      const here = k === S.lens && !S.lensAway, p = lensAt(k), ek = tset[k - 1];
      if (here) continue;
      const lp = (LB as any)[ek];
      out.push(<text key={"rd" + k} x={lp.x} y={lp.y} textAnchor={lp.a} fontSize={T.prompt} fontWeight={700} fill={deep(LS_BLU)}
        stroke="#FFFDF7" strokeWidth={8} paintOrder="stroke">{tenOf(ek) + " " + tx("tenths")}</text>);
      void p;
    }
    if (!S.lensAway) {
      const p = lensAt(S.lens), live = S.lens < max && !busy.current && !showEnd && S.tb < 0;
      const dark = yn && S.lens === 2 && (S.tb >= 0 || showEnd);
      out.push(
        <g key="lens" transform={`translate(${p.x},${p.y})`}>
          {lsGlass(S.lens > 0 ? (dark ? lbl(tset[S.lens - 1]) : tenOf(tset[S.lens - 1])) : null, tx("tenths"), dark, S.lens > 0 && (LB as any)[tset[S.lens - 1]].a === "end")}
          {live && <Hit id="lens" x={-LS_LENS.r} y={-LS_LENS.r} w={2 * LS_LENS.r} h={2 * LS_LENS.r} onPress={() => press("lens", moveLens)} label={tx("Tenths lens")} />}
        </g>
      );
    }
    if (yn && (S.tb >= 1 || showEnd)) {
      out.push(
        <g key="tl" pointerEvents="none">
          <rect x={636} y={150} width={262} height={70} rx={18} fill={tint(LS_AMB, 0.55)} stroke={deep(LS_AMB)} strokeWidth={3} filter="url(#ls-shadow)" />
          <text x={636 + 131} y={194} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={LS_INK}>{tx("Taught later")}</text>
        </g>
      );
    }
    return out;
  };
  const unitsSwitch = () => {
    if (!(kind === "box" || free)) return null;
    const u = free ? S.fu : unit, x = LS_COL.x, y = 20, w = LS_COL.w, h = 80;
    const face = (
      <g>
        <rect x={x} y={y} width={w} height={h} rx={40} fill="#FFFFFF" stroke={LS_INK} strokeWidth={3} filter="url(#ls-shadow)" />
        <rect x={u === "cm" ? x + 6 : x + w / 2} y={y + 6} width={w / 2 - 6} height={h - 12} rx={34} fill={tint(LS_BLU, 0.2)} stroke={deep(LS_BLU)} strokeWidth={3} />
        <text x={x + w / 4 + 3} y={y + h / 2 + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={LS_INK}>{tx("cm")}</text>
        <text x={x + (3 * w) / 4 - 3} y={y + h / 2 + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={LS_INK}>{tx("m")}</text>
      </g>
    );
    if (!free) return (
      <g pointerEvents="none">
        <text x={x} y={y + h / 2 + 14} fontSize={T.prompt} fontWeight={700} fill={deep(LS_BLU)}>{tx("units") + ": " + tx(u)}</text>
      </g>
    );
    return (
      <g>
        {face}
        <Hit id="units" x={x} y={y} w={w} h={h} label={tx("Units switch")} onPress={() => press("units", () => put({ fu: S.fu === "cm" ? "m" : "cm" }))} />
      </g>
    );
  };
  const freeKeys = () => {
    if (!free) return null;
    const grow = (k: string) => press(k, async () => {
      if (busy.current) return;
      const max = k === "longer" ? MODEL.free.maxL : Math.min(MODEL.free.maxB, S.fl), cur = k === "longer" ? S.fl : S.fb;
      if (cur >= max) return;
      const nx = cur + 1;   /* the keys only grow, up to their limit; the breadth never passes the length */
      const a = k === "longer" ? gs.P(S.fl, S.fb / 2, 0.5) : gs.P(S.fl / 2, S.fb, 0.5);
      const bb = k === "longer" ? gs.P(nx, S.fb / 2, 0.5) : gs.P(S.fl / 2, nx, 0.5);
      busy.current = true;
      const ok = await api.act({ tool: "hand", moves: "push", from: { x: a[0], y: a[1] }, at: [{ x: bb[0], y: bb[1] }] });
      busy.current = false;
      if (ok) put(k === "longer" ? { fl: nx } : { fb: nx });
    });
    const off = (k: string) => busy.current || (k === "longer" ? S.fl >= MODEL.free.maxL : S.fb >= Math.min(MODEL.free.maxB, S.fl));
    return ["longer", "wider"].map((k, j) => (
      <Key key={k} id={k} x={LS_COL.x} y={128 + j * 100} w={LS_COL.w} h={80} C={C} tone="key"
        disabled={off(k)} label={tx(k === "longer" ? "Longer" : "Wider")} onClick={() => grow(k)}>
        <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={off(k) ? tint(LS_INK, 0.45) : toneInk("key", C.ink)}>{tx(k === "longer" ? "Longer" : "Wider")}</text>
      </Key>
    ));
  };
  const nameTag = () => {
    if (kind !== "edges") return null;
    const on = showEnd || (warmOn && S.runs >= 3);
    if (!on) return null;
    const cube = isCube;
    return (
      <g pointerEvents="none">
        <rect x={648} y={150} width={248} height={100} rx={20} fill={tint(LS_GRN, 0.82)} stroke={deep(LS_GRN)} strokeWidth={3} filter="url(#ls-shadow)" />
        <text x={648 + 124} y={214} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={deep(LS_GRN)}>{tx(cube ? "Cube" : "Cuboid")}</text>
      </g>
    );
  };
  const baseTap = () => {
    if (!(kind === "stack" && warmOn && (stage === "demo" || stage === "teach"))) return null;
    const bb = lsBB([g.P(0, 0, 1), g.P(g.l, 0, 1), g.P(g.l, 0, 0), g.P(g.l, g.b, 0), g.P(0, g.b, 0), g.P(0, g.b, 1)]);
    return <Hit id="count" x={bb.x} y={bb.y} w={bb.w} h={bb.h} label={tx("Base layer")} onPress={() => press("count", countBase)} />;
  };

  /* the one invite: on the control the step waits for, or on the question's act while it is still to do */
  const invite = () => {
    if (busy.current || (box && box.open)) return null;
    const want = stage === "demo" ? stepOn : stage === "ask" && !actDone && S.tb < 0
      ? (kind === "stack" || kind === "box" ? "lift" : kind === "edges" ? "run" : !yn && S.mult < 1 ? "multiply" : "lens") : null;
    if (!want) return null;
    const ring = (x: number, y: number, w: number, h: number, rx: number) => (stage === "demo" ? <Invite x={x} y={y} w={w} h={h} rx={rx} C={C} />
      : <rect key={qk + ":" + S.layers + "." + S.runs + "." + S.mult + "." + S.lens} x={x - w / 2 - 6} y={y - h / 2 - 6} width={w + 12} height={h + 12} rx={rx + 6}
          fill="none" stroke={LS_RING} strokeWidth={5} pointerEvents="none" opacity={0}
          style={{ transformBox: "fill-box", transformOrigin: "center", animation: "c4pulse 1.8s ease-out 2" } as any} />);
    if (want === "lift") { const p = lsGrip(gs, free ? S.fh : S.layers); return ring(p.x, p.y, 60, 60, 30); }
    if (want === "run") { const F = g.P(g.l, g.b, 0); return ring(F[0], F[1], 36, 36, 18); }
    if (want === "lens") { const p = lensAt(S.lens); return ring(p.x, p.y, 2 * LS_LENS.r, 2 * LS_LENS.r, LS_LENS.r); }
    if (want === "multiply") return ring(LS_COL.x + LS_COL.w / 2, 60, LS_COL.w, 80, 18);
    if (want === "count") {   /* the base layer's own outline, a little outside it, so no label is crossed */
      const P = g.P, c = P(g.l / 2, g.b / 2, 0.5), hex = [P(0, 0, 1), P(g.l, 0, 1), P(g.l, 0, 0), P(g.l, g.b, 0), P(0, g.b, 0), P(0, g.b, 1)];
      const out = hex.map((q: any) => { const dx = q[0] - c[0], dy = q[1] - c[1], d = Math.hypot(dx, dy) || 1; return [q[0] + (dx / d) * 7, q[1] + (dy / d) * 7]; });
      return <polygon className="c4-nextblink" points={lsPts(out)} fill="none" stroke={LS_RING} strokeWidth={5} strokeLinejoin="round" pointerEvents="none" />;
    }
    return null;
  };

  return (
    <g>
      <LSDefs />
      {solid()}
      {invite()}
      {!free && edgeLabels()}
      {free && ["l", "b", "h"].map((k) => { const p = (lsLabels(gs) as any)[k]; return (
        <text key={"f" + k} x={p.x} y={p.y} textAnchor={p.a} fontSize={T.prompt} fontWeight={700} fill={deep(LS_BLU)} stroke="#FFFDF7" strokeWidth={8} paintOrder="stroke">
          {`${k === "l" ? S.fl : k === "b" ? S.fb : S.fh} ${tx(S.fu)}`}</text>); })}
      {baseTap()}
      {grip()}
      {bead()}
      {unitsSwitch()}
      {freeKeys()}
      {multKey()}
      {lens()}
      {nameTag()}
      <g pointerEvents="none">{rows()}</g>
      {void lang}
    </g>
  );
}

/* the Tenths lens: clear glass on a handle, showing the count of tenths it reads */
function lsGlass(count: any, word?: string, dark?: boolean, left?: boolean) {
  const r = LS_LENS.r, hx = left ? -1 : 1;   /* left of the box, the handle points away from it */
  return (
    <g pointerEvents="none">
      <line x1={hx * r * 0.7} y1={-r * 0.7} x2={hx * r * 1.3} y2={-r * 1.3} stroke="#2D3748" strokeWidth={14} strokeLinecap="round" />
      <line x1={hx * r * 0.7} y1={-r * 0.7} x2={hx * r * 1.3} y2={-r * 1.3} stroke="#718096" strokeWidth={6} strokeLinecap="round" />
      <circle r={r + 2} fill="none" stroke="#1A202C" strokeWidth={1.5} opacity={0.3} />
      <circle r={r} fill={dark ? "#4B5866" : "url(#ls-glass-grad)"} fillOpacity={dark ? 0.55 : 0.92} stroke={LS_INK} strokeWidth={5} filter="url(#ls-shadow)" />
      <path d={`M ${-r * 0.6} ${-r * 0.25} A ${r * 0.65} ${r * 0.65} 0 0 1 ${-r * 0.2} ${-r * 0.65}`} stroke="#FFFFFF" strokeWidth={5} strokeLinecap="round" fill="none" opacity={0.9} />
      <path d={`M ${r * 0.2} ${r * 0.65} A ${r * 0.65} ${r * 0.65} 0 0 1 ${r * 0.6} ${r * 0.25}`} stroke="#FFFFFF" strokeWidth={2.5} strokeLinecap="round" fill="none" opacity={0.5} />
      {count !== null && !dark && <text y={-12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(LS_BLU, 0.25)}>{count}</text>}
      {count !== null && !dark && <text y={39} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={LS_INK}>{word}</text>}
      {count !== null && dark && <text y={12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill="#FFFFFF" stroke="#2B2B2B" strokeWidth={4} paintOrder="stroke">{count}</text>}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const q = it || {};
  const v = result && result.last ? result.last.value : null;
  if (v === null || v === undefined || !q.kind) return null;
  const pw = lang === "en" ? 72 : 44;
  const g = lsGeo(q.l, q.b, q.h, { x: 8, y: 6, w: pw, h: h - 12 });
  const look = q.kind === "box" || q.kind === "tenths" ? { tex: "carton" } : q.kind === "edges" ? { grid: g.e >= 6 } : { tint: LS_VIO, grid: g.e >= 6 };
  const unit = q.u === "m" ? "cu. m" : q.u === "cm" ? "cu. cm" : "cubes";
  const l1 = q.choices ? tx("No") : indian(Number(v));
  const l2 = q.choices ? tx(q.kind === "edges" ? "Cuboid" : "Later") : tx(unit);
  const cx = pw + 16 + (w - pw - 16) / 2;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {lsSlab(g, 0, q.h, { id: "th" + n, top: true, ...look })}
      {lang === "en" && <text x={cx} y={h / 2 - 4} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(LS_GRN, 0.25)}>{l1}</text>}
      {lang === "en" && <text x={cx} y={h / 2 + 28} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={shade(LS_GRN, 0.25)}>{l2}</text>}
      {lang !== "en" && <text x={cx} y={h / 2 + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={shade(LS_GRN, 0.25)}>{l1 + (q.choices ? ": " : " ") + l2}</text>}
    </g>
  );
}

function LayerStacker(props: any) {
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

export default LayerStacker;
