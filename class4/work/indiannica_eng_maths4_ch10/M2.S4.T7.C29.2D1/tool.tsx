/* ═══ M2.S4.T7.C29.2D1 · tile_bench · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, answer panel, bubble + mascot,
   phase dots, window.toolApi, the sound effects, the printed bubble, scoring, the events, idle and restart.
   THE LESSON IS SILENT (runtime r30): every line is printed on the bubble. The lesson is action-driven: nothing moves
   on unless the child acts. THE NEW LOOK (docs/LAYOUT.md §1d-§1e, docs/PATTERNS.md §15-§16): no question bar, four phase dots,
   a one-sentence bubble, every act performed on screen (api.act). REMADE 2026-10-26 from the owner's tessellation description: a tray of seven
   shapes, copies laid and turned on dotted paper, both finders measured on the true shapes, a patch kept to compare, pictures of the real thing.
   NO imports in this file; only the five host hooks.
   Every English line the tool prints, in its data or drawn by Work (tx("...")), has a Hindi and a Gujarati entry in TR
   once the English is final. Edit, never rewrite. */

const TOOL_ID = "tile_bench";
const MEDIA_ID = "M2.S4.T7.C29.2D1";
const TOOL_NAME = "Tile Bench";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (not shown when phase 1 has steps) */
const OPENING = ["A bench of dotted paper and a tray of shapes. Lay the first copy down."];
/* the whole-tool line (kept for the sidecar; the summary page no longer shows it) */
const FINISH_LINE = "Patches tested for gaps and overlaps, and patterns made from things around you.";
/* printed when the child opens Free play; every control it names is on the free-play bench */
const FREE_LINE = "Free play. Lay, turn and test any shape. Keep one patch to compare.";

/* THE START PAGE: the object the lesson is about, in the 1200 x 340 box: a bench of dotted paper, a patch of bricks and a tray of shapes */
const START_HOOK = "Can copies of one shape fit with no gaps and no overlaps?";
function StartArt({ box, C, lang, tx }: any) {
  const bricks: any[] = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) bricks.push({ x: 90 + c * 120 + (r % 2) * 60, y: 50 + r * 60, w: 120, h: 60 });
  return (
    <g>
      <rect x={0} y={0} width={box.w} height={box.h} rx={RAD.panel} fill={C.paper} stroke={C.rule} strokeWidth={3} />
      <defs><pattern id="tbStartDots" width={40} height={40} patternUnits="userSpaceOnUse"><circle cx={20} cy={20} r={2.6} fill="#767676" /></pattern></defs>
      <rect x={10} y={10} width={box.w - 20} height={box.h - 20} rx={RAD.panel} fill="url(#tbStartDots)" />
      {bricks.map((b, i) => <rect key={"b" + i} x={b.x} y={b.y} width={b.w} height={b.h} fill="url(#gHundred)" stroke={shade(CONTENT.hundred, 0.25)} strokeWidth={3} />)}
      <g>
        <rect x={800} y={36} width={340} height={268} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={3} />
        <rect x={832} y={72} width={84} height={84} rx={8} fill="url(#gHundred)" stroke={shade(CONTENT.hundred, 0.25)} strokeWidth={3} />
        <path d="M 1024 156 H 1108 L 1066 72 Z" fill="url(#gHundred)" stroke={shade(CONTENT.hundred, 0.25)} strokeWidth={3} strokeLinejoin="round" />
        <path d="M 874 188 L 916 230 L 874 272 L 832 230 Z" fill="url(#gHundred)" stroke={shade(CONTENT.hundred, 0.25)} strokeWidth={3} strokeLinejoin="round" />
        <circle cx={1066} cy={230} r={42} fill="url(#gHundred)" stroke={shade(CONTENT.hundred, 0.25)} strokeWidth={3} />
      </g>
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line stays English, exactly as the checks read it; this table is keyed by
   that English, byte for byte. Filled after the English is final. */
const TR: any = {
  hi: {
    "Free play. Lay, turn and test any shape. Keep one patch to compare.": "मुक्त खेल। किसी भी आकृति को रखो, घुमाओ और जाँचो। तुलना के लिए एक पैच रख लो।",
    "Tap the square in the tray at the top.": "ऊपर ट्रे में वर्ग दबाओ।",
    "Tap the first shape in the tray.": "ट्रे में पहली आकृति दबाओ।",
    "Tap Lay a copy to set the next copy down.": "अगली टाइल रखने के लिए “टाइल रखो” दबाओ।",
    "Tap Turn to turn the copy you just laid.": "अभी रखी टाइल घुमाने के लिए “घुमाओ” दबाओ।",
    "Tap the Turn key.": "“घुमाओ” दबाओ।",    "Tap the picture to see a pattern around you.": "चित्र दबाओ और अपने आसपास का पैटर्न देखो।",
    "Tap the big picture on the right.": "दाईं ओर की बड़ी तस्वीर दबाओ।",
    "No gap yet": "अभी कोई खाली जगह नहीं",
    "Kept": "रखा हुआ",
    "Keep one to compare": "तुलना के लिए रखो",
    "Rectangle": "आयत",
    "Hexagon": "षट्भुज",
    "Pentagon": "पंचभुज",
    "Octagon": "अष्टभुज",
    "Floor tiles": "फ़र्श की टाइलें",
    "Wall pattern": "दीवार का पैटर्न",
    "Jaali": "जाली",
    "Rangoli": "रंगोली",
    "It tessellates": "टेसेलेशन बनता है",
    "It leaves gaps": "खाली जगह बचती है",
    "It overlaps": "ओवरलैप होता है",
    "Gaps and overlaps": "खाली जगह और ओवरलैप",
    "Tessellates": "टेसेलेशन",
    "Leaves gaps": "खाली जगह",
    "Overlaps": "ओवरलैप",
    "Both faults": "दोनों कमियाँ",
    "Turn": "घुमाओ",
    "Keep it": "रख लो",
    "Run both finders, then answer.": "दोनों खोजक चलाओ, फिर जवाब दो।",
    "Run the Gap finder, then answer.": "खाली जगह खोजक चलाओ, फिर जवाब दो।",
    "Tap Bracket, then answer.": "“ब्रैकेट” दबाओ, फिर जवाब दो।",
    "Set all three seats, then answer.": "तीनों जगह भरो, फिर जवाब दो।",
    "No gaps": "खाली जगह नहीं",
    "Tap Lay things, then answer.": "“चीज़ें रखो” दबाओ, फिर जवाब दो।",
    "Tap Carry on, then answer.": "“आगे बढ़ाओ” दबाओ, फिर जवाब दो।",
    "Tile Bench": "टाइल बेंच",
    "A bench of dotted paper and a tray of shapes. Lay the first copy down.": "बिंदुओं वाले कागज़ की बेंच और आकृतियों की एक ट्रे। पहली टाइल रखो।",
    "Free play. Pick a shape, lay copies to make a tessellation of your own, then test it.": "मुक्त खेल। एक आकृति चुनो, टाइलें रखकर अपना टेसेलेशन बनाओ और उसे जाँचो।",
    "Can copies of one shape fit with no gaps and no overlaps?": "क्या एक आकृति की टाइलें बिना खाली जगह और ओवरलैप के बैठ सकती हैं?",
    "Copies that fit with no gaps": "बिना खाली जगह वाली टाइलें",
    "Look at the patch. Is anything left uncovered? Is anything doubled?": "बिछी टाइलें देखो। क्या कोई जगह खाली रह गई? क्या कोई हिस्सा दो बार ढका है?",
    "Tap Lay a copy to set the last square down.": "आखिरी वर्ग रखने के लिए “टाइल रखो” दबाओ।",
    "Tap the key at the bottom.": "नीचे वाला बटन दबाओ।",
    "Tap Gap finder to look for any space left over.": "कोई खाली जगह बची है, यह देखने के लिए खाली जगह खोजक दबाओ।",
    "Tap the Gap finder key.": "खाली जगह खोजक दबाओ।",
    "Tap Overlap finder to see if a copy lies over another.": "कोई टाइल दूसरी के ऊपर है, यह देखने के लिए ओवरलैप खोजक दबाओ।",
    "Tap the Overlap finder key.": "ओवरलैप खोजक दबाओ।",
    "Is any space left over, or any part covered twice?": "क्या कोई जगह बची है, या कोई हिस्सा दो बार ढका है?",
    "Run both finders: a tessellation leaves both of them empty.": "दोनों खोजक चलाओ: टेसेलेशन में दोनों खाली मिलते हैं।",
    "Shapes that cover a surface with no gaps or overlaps tessellate.": "बिना खाली जगह और ओवरलैप के सतह ढकें, तो टेसेलेशन बनता है।",
    "You learned: no gaps and no overlaps makes a tessellation.": "तुमने सीखा: खाली जगह और ओवरलैप न हो, तो टेसेलेशन बनता है।",
    "This wall has each row moved half a brick: is it a tessellation?": "इस दीवार की हर कतार आधी ईंट खिसकी है: क्या यह टेसेलेशन है?",
    "Tessellation?": "टेसेलेशन?",
    "Look along each row to see whether a brick sits right against the next.": "हर कतार देखो: क्या हर ईंट अगली ईंट से सटी है?",
    "Yes, the bricks fit side by side with no space and no overlap.": "हाँ, ईंटें बिना जगह छोड़े और बिना ओवरलैप के साथ-साथ बैठी हैं।",
    "A tessellation": "टेसेलेशन है",
    "Yes": "हाँ",
    "No": "नहीं",
    "Round coins lie touching on a table: do they make a tessellation?": "गोल सिक्के मेज़ पर सटे रखे हैं: क्या ये टेसेलेशन बनाते हैं?",
    "The coins already touch: look in the space between four of them.": "सिक्के पहले से सटे हैं: चार सिक्कों के बीच की जगह देखो।",
    "No, the coins leave a space between them, so circles cannot tessellate.": "नहीं, सिक्कों के बीच जगह बचती है, इसलिए वृत्तों से टेसेलेशन नहीं बनता।",
    "Not a tessellation": "टेसेलेशन नहीं",
    "Two squares lie half over each other with nothing uncovered: a tessellation?": "दो वर्ग आधे एक-दूसरे पर हैं, कुछ खाली नहीं: क्या यह टेसेलेशन है?",
    "Run the overlap finder over the pair and see if any part is covered twice.": "जोड़ी पर ओवरलैप खोजक चलाओ: क्या कोई हिस्सा दो बार ढका है?",
    "No, one tile lies over the other, so it is not a tessellation.": "नहीं, एक टाइल दूसरी के ऊपर है, इसलिए यह टेसेलेशन नहीं है।",
    "A gap or only the edge": "खाली जगह या सिर्फ़ किनारा",
    "Is this space closed in by tiles all round? Or is it where the tiling stops?": "क्या यह जगह चारों ओर से टाइलों से घिरी है? या यहीं टाइलें खत्म हो जाती हैं?",
    "Tap Gap finder and watch which spaces fill with colour.": "खाली जगह खोजक दबाओ और देखो कौन-सी जगहें रंग से भरती हैं।",
    "Tap Trace to follow a notch out to the open bench.": "खाँचे से खुली बेंच तक जाने के लिए “रास्ता खोजो” दबाओ।",
    "Tap the Trace key.": "“रास्ता खोजो” दबाओ।",
    "Go round the space: does a tile close it in on every side?": "उस जगह के चारों ओर देखो: क्या हर तरफ़ टाइल उसे घेरती है?",
    "Can a finger get out to the open without crossing a tile?": "क्या उँगली टाइल पार किए बिना खुली जगह तक पहुँच सकती है?",
    "A space with tiles all round it is a gap; a bumpy outer edge is not.": "जिस जगह के चारों ओर टाइलें हों, वह खाली जगह है; ऊबड़-खाबड़ किनारा नहीं।",
    "You learned: a gap is closed in; the outer edge is not.": "तुमने सीखा: खाली जगह घिरी होती है, बाहरी किनारा नहीं।",
    "This triangle patch has a bumpy top edge: is it a tessellation?": "इस त्रिभुज वाली बिछावट का ऊपरी किनारा ऊबड़-खाबड़ है: क्या यह टेसेलेशन है?",
    "Look inside the patch for any space with tiles closed all round it.": "बिछावट के अंदर ऐसी जगह ढूँढो जिसके चारों ओर टाइलें हों।",
    "Yes, the notches are only where the tiling stops, so there is no gap.": "हाँ, खाँचे वहीं हैं जहाँ टाइलें खत्म होती हैं, इसलिए कोई खाली जगह नहीं है।",
    "Are the saw teeth of these diamonds gaps, or only the edge?": "क्या इन हीरों के आरी जैसे दाँते खाली जगह हैं, या सिर्फ़ किनारा?",
    "Gap or edge?": "खाली जगह या किनारा?",
    "Look at one tooth: are there tiles on every side of it?": "एक दाँता देखो: क्या उसके चारों ओर टाइलें हैं?",
    "Only the edge, because every tooth opens out to the bench.": "सिर्फ़ किनारा, क्योंकि हर दाँता बेंच की ओर खुलता है।",
    "Only the edge": "सिर्फ़ किनारा",
    "A gap": "खाली जगह",
    "Is the little space between four packed circles a gap, or only the edge?": "चार सटे वृत्तों के बीच की छोटी जगह खाली जगह है या सिर्फ़ किनारा?",
    "Look at what touches that space, all the way round it.": "देखो उस जगह को चारों ओर से क्या छू रहा है।",
    "A gap, because the circles close round that space on every side.": "खाली जगह, क्योंकि वृत्त उस जगह को चारों ओर से घेरते हैं।",
    "Carrying a tiling on": "बिछावट को आगे बढ़ाना",
    "Where does the next one go? Which way must it face?": "अगली टाइल कहाँ जाएगी? उसे किस ओर घुमाकर रखना है?",
    "Tap the dashed circle to put the next copy down.": "अगली टाइल रखने के लिए बिंदीदार गोले को दबाओ।",
    "Tap the dashed circle on the bench.": "बेंच पर बिंदीदार गोले को दबाओ।",
    "It does not fit, so tap the copy again to turn it over.": "यह ठीक नहीं बैठी, इसलिए टाइल को फिर दबाकर पलटो।",
    "Tap the same copy once more.": "उसी टाइल को एक बार और दबाओ।",
    "Where does the next copy touch the last one?": "अगली टाइल पिछली से कहाँ छूती है?",
    "Turn each copy until its slanting side lies flat on the last.": "हर टाइल को तब तक घुमाओ जब तक उसकी तिरछी भुजा पिछली पर सपाट न बैठे।",
    "Repeat the pattern, no gap, no overlap; if first is up, even places point down.": "पैटर्न दोहराओ: न खाली जगह, न ओवरलैप; सम स्थान पर नोक नीचे।",
    "You learned: repeat the same shape the same way.": "तुमने सीखा: उसी आकृति को उसी तरह दोहराओ।",
    "The row goes up, down, up, so set the next three triangles the right way.": "कतार ऊपर, नीचे, ऊपर जाती है: अगले तीन त्रिभुज सही ओर रखो।",
    "Set them down": "इन्हें रखो",
    "Look at the copy just before it: which way does that one face?": "इससे ठीक पहले वाली टाइल देखो: वह किस ओर है?",
    "Each copy fits against the last when it is turned the right way.": "सही ओर घुमाने पर हर टाइल पिछली से ठीक बैठती है।",
    "Down, up, down": "नीचे, ऊपर, नीचे",
    "A row has four two-square dominoes: how many squares long with three more?": "कतार में दो-दो खाने के चार डोमिनो हैं: तीन और रखने पर कितने खाने लंबी होगी?",
    "Squares in all": "कुल खाने",
    "Count the squares on one domino, then count the dominoes.": "एक डोमिनो के खाने गिनो, फिर डोमिनो गिनो।",
    "Tap Carry on, then count every square in the row.": "“आगे बढ़ाओ” दबाओ, फिर कतार के सारे खाने गिनो।",
    "Each domino is two squares, so count the row by twos.": "हर डोमिनो दो खाने का है, इसलिए कतार दो-दो करके गिनो।",
    "Seven dominoes of two squares each make a row 14 squares long.": "दो-दो खाने के सात डोमिनो मिलकर 14 खाने लंबी कतार बनाते हैं।",
    "The first points up and they take turns: which way does the tenth point?": "पहला ऊपर की ओर है और वे बारी-बारी से आते हैं: दसवाँ किस ओर होगा?",
    "The tenth one": "दसवाँ",
    "Carry the row on and count the copies as they land.": "कतार को आगे बढ़ाओ और टाइलें रखते हुए गिनो।",
    "Say the facings in order, one for each place along the row.": "कतार में हर स्थान की ओर क्रम से बोलो।",
    "Count along the row to the tenth place and say which way it faces.": "कतार में दसवें स्थान तक गिनो और बताओ वह किस ओर है।",
    "The tenth triangle points down, because every even place points down.": "दसवाँ त्रिभुज नीचे की ओर है, क्योंकि हर सम स्थान नीचे की ओर है।",
    "Points down": "नोक नीचे की ओर",
    "Up": "ऊपर",
    "Down": "नीचे",
    "Patterns made from things around you": "आस-पास की चीज़ों से पैटर्न",
    "Lay a pattern from things around you. Which group comes round again?": "आसपास की चीज़ों से एक पैटर्न बिछाओ। कौन सा समूह बार-बार आता है?",
    "Tap Lay things to hang the next ones on the string.": "डोरी पर अगली चीज़ें लटकाने के लिए “चीज़ें रखो” दबाओ।",
    "Tap the Lay things key.": "“चीज़ें रखो” दबाओ।",
    "Tap Bracket to mark the group that comes round again.": "जो समूह बार-बार आता है उसे चिह्नित करने के लिए “ब्रैकेट” दबाओ।",
    "Tap the Bracket key.": "“ब्रैकेट” दबाओ।",
    "Look at the first thing and find where it returns.": "पहली चीज़ को देखो और ढूँढो कि वह कहाँ फिर आती है।",
    "Read the string from the start and watch for the first thing that returns.": "डोरी को शुरू से देखो और पहली लौटती चीज़ पर ध्यान दो।",
    "A repeating group makes a pattern; tiles with no gaps or overlaps tessellate.": "समूह दोहराने से पैटर्न बनता है; खाली जगह-ओवरलैप रहित टाइलें टेसेलेशन हैं।",
    "You learned: things make a pattern when a group repeats.": "तुमने सीखा: समूह दोहराने से चीज़ों का पैटर्न बनता है।",
    "The toran repeats marigold, leaf, leaf, rose over twelve: how many marigolds?": "तोरण में गेंदा, पत्ता, पत्ता, गुलाब बार-बार आते हैं, कुल 12: कितने गेंदे?",
    "Marigolds?": "गेंदे?",
    "Start at the first marigold and see where the next one hangs.": "पहले गेंदे से शुरू करो और देखो अगला कहाँ लटकता है।",
    "How many things hang in one group?": "एक समूह में कितनी चीज़ें लटकी हैं?",
    "Count the marigolds in one bracket, then count the brackets.": "एक ब्रैकेट में गेंदे गिनो, फिर ब्रैकेट गिनो।",
    "Three marigolds, one in each group of four.": "तीन गेंदे, चार के हर समूह में एक।",
    "Coins and caps swap like a chessboard in three rows of five: how many coins?": "सिक्के और ढक्कन पाँच-पाँच की तीन कतारों में शतरंज जैसे बदलते हैं: कितने सिक्के?",
    "Coins?": "सिक्के?",
    "Row 3 starts like row 1: count its coins too.": "कतार 3 कतार 1 की तरह शुरू होती है: उसके सिक्के भी गिनो।",
    "Tap Lay things to carry the third row on, then count the coins.": "तीसरी कतार रखने के लिए “चीज़ें रखो” दबाओ, फिर सिक्के गिनो।",
    "Count the coins row by row and add them up.": "कतार-कतार सिक्के गिनो और जोड़ लो।",
    "Eight coins, because row 3 starts like row 1: three, two and three.": "आठ सिक्के, क्योंकि कतार 3 कतार 1 की तरह शुरू होती है: तीन, दो और तीन।",
    "Which chapter word names a floor of tiles with no gaps and no overlaps?": "कौन-सा शब्द बिना खाली जगह और ओवरलैप वाले टाइलों के फर्श को कहते हैं?",
    "Which word?": "कौन सा शब्द?",
    "Look at the four cards: which word did the bench lessons use?": "चारों कार्ड देखो: बेंच के पाठों में कौन-सा शब्द आया था?",
    "Read each word again and match it to what you see on the bench.": "हर शब्द फिर पढ़ो और उसे बेंच पर दिखने वाली चीज़ से मिलाओ।",
    "Pick the word the lesson used for copies of one shape that fit together.": "जो शब्द पाठ में एक आकृति की जुड़ी टाइलों के लिए आया था, उसे चुनो।",
    "A tessellation is a floor of tiles with no gaps and no overlaps.": "टेसेलेशन ऐसा टाइलों का फर्श है जिसमें न खाली जगह है, न ओवरलैप।",
    "Number pattern": "संख्या पैटर्न",
    "Series": "क्रम",
    "Secret code": "गुप्त कोड",
    "Tessellation": "टेसेलेशन",
    "Lay a copy": "टाइल रखो",
    "Gap finder": "खाली जगह खोजक",
    "Overlap finder": "ओवरलैप खोजक",
    "Trace": "रास्ता खोजो",
    "Bracket": "ब्रैकेट",
    "Set all three seats first.": "पहले तीनों जगह भरो।",
    "Seat": "जगह",
    "Square": "वर्ग", "Brick": "ईंट", "Triangle": "त्रिभुज", "Diamond": "समचतुर्भुज", "Circle": "वृत्त", "L shape": "L आकार",
    "Carry on": "आगे बढ़ाओ",
    "Lay things": "चीज़ें रखो",
    "Marigold": "गेंदा",
    "Leaf": "पत्ता",
    "Rose": "गुलाब",
    "Coin": "सिक्का",
    "Cap": "ढक्कन",
    "Numbers that follow a rule": "नियम से चलती संख्याएँ",
    "A list in order": "क्रम से लगी सूची",
    "Read with a key": "कुंजी से पढ़ें",
    "No gaps, no overlaps": "न खाली जगह, न ओवरलैप",
    "yes": "हाँ",
    "no": "नहीं",
    "gap": "खाली जगह",
    "edge": "सिर्फ़ किनारा",
    "up": "ऊपर",
    "down": "नीचे",
    "pattern": "संख्या पैटर्न",
    "series": "क्रम",
    "code": "गुप्त कोड",
    "tessellation": "टेसेलेशन",
  },
  gu: {
    "Free play. Lay, turn and test any shape. Keep one patch to compare.": "મુક્ત રમત. કોઈ પણ આકૃતિ મૂકો, ફેરવો અને તપાસો. સરખામણી માટે એક પેચ સાચવો.",
    "Tap the square in the tray at the top.": "ઉપર ટ્રેમાં ચોરસ દબાવો.",
    "Tap the first shape in the tray.": "ટ્રેમાં પહેલી આકૃતિ દબાવો.",
    "Tap Lay a copy to set the next copy down.": "આગળની ટાઇલ મૂકવા “ટાઇલ મૂકો” દબાવો.",
    "Tap Turn to turn the copy you just laid.": "હમણાં મૂકેલી ટાઇલ ફેરવવા “ફેરવો” દબાવો.",
    "Tap the Turn key.": "“ફેરવો” દબાવો.",    "Tap the picture to see a pattern around you.": "ચિત્ર દબાવો અને તમારી આસપાસની પેટર્ન જુઓ.",
    "Tap the big picture on the right.": "જમણી બાજુનું મોટું ચિત્ર દબાવો.",
    "No gap yet": "હજી કોઈ ખાલી જગ્યા નથી",
    "Kept": "સાચવેલું",
    "Keep one to compare": "સરખામણી માટે સાચવો",
    "Rectangle": "લંબચોરસ",
    "Hexagon": "ષટ્કોણ",
    "Pentagon": "પંચકોણ",
    "Octagon": "અષ્ટકોણ",
    "Floor tiles": "ફરસની ટાઇલો",
    "Wall pattern": "દીવાલની પેટર્ન",
    "Jaali": "જાળી",
    "Rangoli": "રંગોળી",
    "It tessellates": "ટેસેલેશન બને છે",
    "It leaves gaps": "ખાલી જગ્યા રહે છે",
    "It overlaps": "ઓવરલેપ થાય છે",
    "Gaps and overlaps": "ખાલી જગ્યા અને ઓવરલેપ",
    "Tessellates": "ટેસેલેશન",
    "Leaves gaps": "ખાલી જગ્યા",
    "Overlaps": "ઓવરલેપ",
    "Both faults": "બંને ખામી",
    "Turn": "ફેરવો",
    "Keep it": "સાચવો",
    "Run both finders, then answer.": "બંને શોધક ચલાવો, પછી જવાબ આપો.",
    "Run the Gap finder, then answer.": "ખાલી જગ્યા શોધક ચલાવો, પછી જવાબ આપો.",
    "Tap Bracket, then answer.": "“બ્રેકેટ” દબાવો, પછી જવાબ આપો.",
    "Set all three seats, then answer.": "ત્રણેય જગ્યા ભરો, પછી જવાબ આપો.",
    "No gaps": "ખાલી જગ્યા નથી",
    "Tap Lay things, then answer.": "“વસ્તુઓ મૂકો” દબાવો, પછી જવાબ આપો.",
    "Tap Carry on, then answer.": "“આગળ વધારો” દબાવો, પછી જવાબ આપો.",
    "Tile Bench": "ટાઇલ બેન્ચ",
    "A bench of dotted paper and a tray of shapes. Lay the first copy down.": "ટપકાંવાળા કાગળની બેન્ચ અને આકૃતિઓની એક ટ્રે. પહેલી ટાઇલ મૂકો.",
    "Free play. Pick a shape, lay copies to make a tessellation of your own, then test it.": "મુક્ત રમત. એક આકૃતિ પસંદ કરો, ટાઇલો મૂકીને તમારું ટેસેલેશન બનાવો અને તપાસો.",
    "Can copies of one shape fit with no gaps and no overlaps?": "શું એક આકૃતિની ટાઇલો ખાલી જગ્યા અને ઓવરલેપ વગર બેસી શકે?",
    "Copies that fit with no gaps": "ખાલી જગ્યા વગરની ટાઇલો",
    "Look at the patch. Is anything left uncovered? Is anything doubled?": "પાથરેલી ટાઇલો જુઓ. શું કોઈ જગ્યા ખાલી રહી? શું કોઈ ભાગ બે વાર ઢંકાયો?",
    "Tap Lay a copy to set the last square down.": "છેલ્લો ચોરસ મૂકવા “ટાઇલ મૂકો” દબાવો.",
    "Tap the key at the bottom.": "નીચેનું બટન દબાવો.",
    "Tap Gap finder to look for any space left over.": "કોઈ ખાલી જગ્યા બચી છે કે નહીં તે જોવા ખાલી જગ્યા શોધક દબાવો.",
    "Tap the Gap finder key.": "ખાલી જગ્યા શોધક દબાવો.",
    "Tap Overlap finder to see if a copy lies over another.": "કોઈ ટાઇલ બીજી ઉપર છે કે નહીં તે જોવા ઓવરલેપ શોધક દબાવો.",
    "Tap the Overlap finder key.": "ઓવરલેપ શોધક દબાવો.",
    "Is any space left over, or any part covered twice?": "શું કોઈ જગ્યા બચી છે, કે કોઈ ભાગ બે વાર ઢંકાયો છે?",
    "Run both finders: a tessellation leaves both of them empty.": "બંને શોધક ચલાવો: ટેસેલેશનમાં બંને ખાલી મળે છે.",
    "Shapes that cover a surface with no gaps or overlaps tessellate.": "જે આકૃતિઓ ખાલી જગ્યા અને ઓવરલેપ વગર સપાટી ઢાંકે તે ટેસેલેશન બનાવે છે.",
    "You learned: no gaps and no overlaps makes a tessellation.": "તમે શીખ્યા: ખાલી જગ્યા અને ઓવરલેપ ન હોય તો ટેસેલેશન બને.",
    "This wall has each row moved half a brick: is it a tessellation?": "આ દીવાલની દરેક હરોળ અડધી ઇંટ ખસેલી છે: શું આ ટેસેલેશન છે?",
    "Tessellation?": "ટેસેલેશન?",
    "Look along each row to see whether a brick sits right against the next.": "દરેક હરોળ જુઓ: શું દરેક ઇંટ બાજુની ઇંટને અડીને છે?",
    "Yes, the bricks fit side by side with no space and no overlap.": "હા, ઇંટો જગ્યા છોડ્યા વગર અને ઓવરલેપ વગર બાજુ બાજુમાં બેઠી છે.",
    "A tessellation": "ટેસેલેશન છે",
    "Yes": "હા",
    "No": "ના",
    "Round coins lie touching on a table: do they make a tessellation?": "ગોળ સિક્કા ટેબલ પર અડીને પડ્યા છે: શું તે ટેસેલેશન બનાવે છે?",
    "The coins already touch: look in the space between four of them.": "સિક્કા પહેલેથી અડેલા છે: ચાર સિક્કાની વચ્ચેની જગ્યા જુઓ.",
    "No, the coins leave a space between them, so circles cannot tessellate.": "ના, સિક્કા વચ્ચે જગ્યા બચે છે, તેથી વર્તુળોથી ટેસેલેશન બનતું નથી.",
    "Not a tessellation": "ટેસેલેશન નથી",
    "Two squares lie half over each other with nothing uncovered: a tessellation?": "બે ચોરસ અડધા એકબીજા પર છે, કંઈ ખાલી નથી: શું આ ટેસેલેશન છે?",
    "Run the overlap finder over the pair and see if any part is covered twice.": "જોડી પર ઓવરલેપ શોધક ચલાવો: શું કોઈ ભાગ બે વાર ઢંકાયો છે?",
    "No, one tile lies over the other, so it is not a tessellation.": "ના, એક ટાઇલ બીજી ઉપર છે, તેથી આ ટેસેલેશન નથી.",
    "A gap or only the edge": "ખાલી જગ્યા કે ફક્ત કિનારો",
    "Is this space closed in by tiles all round? Or is it where the tiling stops?": "શું આ જગ્યા ચારે બાજુ ટાઇલોથી ઘેરાયેલી છે? કે અહીં ટાઇલો પૂરી થાય છે?",
    "Tap Gap finder and watch which spaces fill with colour.": "ખાલી જગ્યા શોધક દબાવો અને જુઓ કઈ જગ્યાઓ રંગથી ભરાય છે.",
    "Tap Trace to follow a notch out to the open bench.": "ખાંચામાંથી ખુલ્લી બેન્ચ સુધી જવા “રસ્તો શોધો” દબાવો.",
    "Tap the Trace key.": "“રસ્તો શોધો” દબાવો.",
    "Go round the space: does a tile close it in on every side?": "તે જગ્યાની આસપાસ જુઓ: શું દરેક બાજુ ટાઇલ તેને ઘેરે છે?",
    "Can a finger get out to the open without crossing a tile?": "શું આંગળી ટાઇલ પાર કર્યા વગર ખુલ્લી જગ્યાએ પહોંચી શકે?",
    "A space with tiles all round it is a gap; a bumpy outer edge is not.": "જે જગ્યાની ચારે બાજુ ટાઇલો હોય તે ખાલી જગ્યા છે; ઊબડખાબડ કિનારો નથી.",
    "You learned: a gap is closed in; the outer edge is not.": "તમે શીખ્યા: ખાલી જગ્યા ઘેરાયેલી હોય, બહારનો કિનારો નહીં.",
    "This triangle patch has a bumpy top edge: is it a tessellation?": "ત્રિકોણોની આ ગોઠવણીનો ઉપરનો કિનારો ઊબડખાબડ છે: શું આ ટેસેલેશન છે?",
    "Look inside the patch for any space with tiles closed all round it.": "ગોઠવણીની અંદર એવી જગ્યા શોધો જેની ચારે બાજુ ટાઇલો હોય.",
    "Yes, the notches are only where the tiling stops, so there is no gap.": "હા, ખાંચા ત્યાં જ છે જ્યાં ટાઇલો પૂરી થાય છે, તેથી કોઈ ખાલી જગ્યા નથી.",
    "Are the saw teeth of these diamonds gaps, or only the edge?": "શું આ હીરાના કરવત જેવા દાંતા ખાલી જગ્યા છે, કે ફક્ત કિનારો?",
    "Gap or edge?": "ખાલી જગ્યા કે કિનારો?",
    "Look at one tooth: are there tiles on every side of it?": "એક દાંતો જુઓ: શું તેની ચારે બાજુ ટાઇલો છે?",
    "Only the edge, because every tooth opens out to the bench.": "ફક્ત કિનારો, કારણ કે દરેક દાંતો બેન્ચ તરફ ખુલે છે.",
    "Only the edge": "ફક્ત કિનારો",
    "A gap": "ખાલી જગ્યા",
    "Is the little space between four packed circles a gap, or only the edge?": "ચાર અડીને પડેલા વર્તુળો વચ્ચેની નાની જગ્યા ખાલી જગ્યા છે કે ફક્ત કિનારો?",
    "Look at what touches that space, all the way round it.": "જુઓ તે જગ્યાને ચારે બાજુથી શું અડે છે.",
    "A gap, because the circles close round that space on every side.": "ખાલી જગ્યા, કારણ કે વર્તુળો તે જગ્યાને ચારે બાજુથી ઘેરે છે.",
    "Carrying a tiling on": "ગોઠવણીને આગળ વધારવી",
    "Where does the next one go? Which way must it face?": "આગળની ટાઇલ ક્યાં જશે? તેને કઈ તરફ ફેરવીને મૂકવી?",
    "Tap the dashed circle to put the next copy down.": "આગળની ટાઇલ મૂકવા ટપકાંવાળા ગોળને દબાવો.",
    "Tap the dashed circle on the bench.": "બેન્ચ પર ટપકાંવાળા ગોળને દબાવો.",
    "It does not fit, so tap the copy again to turn it over.": "આ બરાબર બેઠી નથી, તેથી ટાઇલને ફરી દબાવીને ફેરવો.",
    "Tap the same copy once more.": "એ જ ટાઇલને ફરી એક વાર દબાવો.",
    "Where does the next copy touch the last one?": "આગળની ટાઇલ પાછલી ટાઇલને ક્યાં અડે છે?",
    "Turn each copy until its slanting side lies flat on the last.": "દરેક ટાઇલને ત્યાં સુધી ફેરવો જ્યાં સુધી તેની ત્રાંસી બાજુ પાછલી પર સપાટ ન બેસે.",
    "Repeat the pattern, no gap, no overlap; if first is up, even places point down.": "પેટર્ન દોહરાવો: ન ખાલી જગ્યા, ન ઓવરલેપ; બેકી સ્થાને ટોચ નીચે.",
    "You learned: repeat the same shape the same way.": "તમે શીખ્યા: એ જ આકૃતિને એ જ રીતે દોહરાવો.",
    "The row goes up, down, up, so set the next three triangles the right way.": "હરોળ ઉપર, નીચે, ઉપર જાય છે: આગળના ત્રણ ત્રિકોણ સાચી તરફ મૂકો.",
    "Set them down": "તેમને મૂકો",
    "Look at the copy just before it: which way does that one face?": "તેની તરત પહેલાંની ટાઇલ જુઓ: તે કઈ તરફ છે?",
    "Each copy fits against the last when it is turned the right way.": "સાચી તરફ ફેરવતાં દરેક ટાઇલ પાછલી સાથે બરાબર બેસે છે.",
    "Down, up, down": "નીચે, ઉપર, નીચે",
    "A row has four two-square dominoes: how many squares long with three more?": "હરોળમાં બે-બે ખાનાંના ચાર ડોમિનો છે: ત્રણ વધુ મૂકતાં કેટલા ખાનાં લાંબી થશે?",
    "Squares in all": "કુલ ખાનાં",
    "Count the squares on one domino, then count the dominoes.": "એક ડોમિનોના ખાનાં ગણો, પછી ડોમિનો ગણો.",
    "Tap Carry on, then count every square in the row.": "“આગળ વધારો” દબાવો, પછી હરોળના બધાં ખાનાં ગણો.",
    "Each domino is two squares, so count the row by twos.": "દરેક ડોમિનો બે ખાનાંનો છે, તેથી હરોળ બે-બેના ગણતરીથી ગણો.",
    "Seven dominoes of two squares each make a row 14 squares long.": "બે-બે ખાનાંના સાત ડોમિનો મળીને 14 ખાનાં લાંબી હરોળ બનાવે છે.",
    "The first points up and they take turns: which way does the tenth point?": "પહેલો ઉપર તરફ છે અને તે વારાફરતી આવે છે: દસમો કઈ તરફ હશે?",
    "The tenth one": "દસમો",
    "Carry the row on and count the copies as they land.": "હરોળ આગળ વધારો અને ટાઇલો મૂકતાં ગણો.",
    "Say the facings in order, one for each place along the row.": "હરોળના દરેક સ્થાનની તરફ ક્રમમાં બોલો.",
    "Count along the row to the tenth place and say which way it faces.": "હરોળમાં દસમા સ્થાન સુધી ગણો અને કહો તે કઈ તરફ છે.",
    "The tenth triangle points down, because every even place points down.": "દસમો ત્રિકોણ નીચે તરફ છે, કારણ કે દરેક બેકી સ્થાન નીચે તરફ છે.",
    "Points down": "ટોચ નીચે તરફ",
    "Up": "ઉપર",
    "Down": "નીચે",
    "Patterns made from things around you": "આસપાસની વસ્તુઓથી પેટર્ન",
    "Lay a pattern from things around you. Which group comes round again?": "આસપાસની વસ્તુઓથી એક પેટર્ન ગોઠવો. કયો સમૂહ ફરી ફરી આવે છે?",
    "Tap Lay things to hang the next ones on the string.": "દોરી પર આગળની વસ્તુઓ લટકાવવા “વસ્તુઓ મૂકો” દબાવો.",
    "Tap the Lay things key.": "“વસ્તુઓ મૂકો” દબાવો.",
    "Tap Bracket to mark the group that comes round again.": "જે સમૂહ ફરી ફરી આવે છે તેને ચિહ્નિત કરવા “બ્રેકેટ” દબાવો.",
    "Tap the Bracket key.": "“બ્રેકેટ” દબાવો.",
    "Look at the first thing and find where it returns.": "પહેલી વસ્તુ જુઓ અને શોધો કે તે ક્યાં ફરી આવે છે.",
    "Read the string from the start and watch for the first thing that returns.": "દોરી શરૂઆતથી જુઓ અને પહેલી પાછી આવતી વસ્તુ પર ધ્યાન આપો.",
    "A repeating group makes a pattern; tiles with no gaps or overlaps tessellate.": "સમૂહ દોહરાવવાથી પેટર્ન બને છે; ખાલી જગ્યા-ઓવરલેપ વગરની ટાઇલો ટેસેલેશન છે.",
    "You learned: things make a pattern when a group repeats.": "તમે શીખ્યા: સમૂહ દોહરાય ત્યારે વસ્તુઓની પેટર્ન બને છે.",
    "The toran repeats marigold, leaf, leaf, rose over twelve: how many marigolds?": "તોરણમાં ગલગોટો, પાન, પાન, ગુલાબ ફરી ફરી આવે છે, કુલ 12 છે: કેટલા ગલગોટા છે?",
    "Marigolds?": "ગલગોટા?",
    "Start at the first marigold and see where the next one hangs.": "પહેલા ગલગોટાથી શરૂ કરો અને જુઓ આગળનો ક્યાં લટકે છે.",
    "How many things hang in one group?": "એક સમૂહમાં કેટલી વસ્તુઓ લટકે છે?",
    "Count the marigolds in one bracket, then count the brackets.": "એક બ્રેકેટમાં ગલગોટા ગણો, પછી બ્રેકેટ ગણો.",
    "Three marigolds, one in each group of four.": "ત્રણ ગલગોટા, ચારના દરેક સમૂહમાં એક.",
    "Coins and caps swap like a chessboard in three rows of five: how many coins?": "સિક્કા અને ઢાંકણાં પાંચ-પાંચની ત્રણ હરોળમાં ચેસની જેમ બદલાય છે: કેટલા સિક્કા છે?",
    "Coins?": "સિક્કા?",
    "Row 3 starts like row 1: count its coins too.": "હરોળ 3 હરોળ 1ની જેમ શરૂ થાય છે: તેના સિક્કા પણ ગણો.",
    "Tap Lay things to carry the third row on, then count the coins.": "ત્રીજી હરોળ મૂકવા “વસ્તુઓ મૂકો” દબાવો, પછી સિક્કા ગણો.",
    "Count the coins row by row and add them up.": "હરોળ પ્રમાણે સિક્કા ગણો અને ઉમેરો.",
    "Eight coins, because row 3 starts like row 1: three, two and three.": "આઠ સિક્કા, કારણ કે હરોળ 3 હરોળ 1ની જેમ શરૂ થાય છે: ત્રણ, બે અને ત્રણ.",
    "Which chapter word names a floor of tiles with no gaps and no overlaps?": "કયો શબ્દ ખાલી જગ્યા અને ઓવરલેપ વગરની ટાઇલોના ફર્શને કહેવાય?",
    "Which word?": "કયો શબ્દ?",
    "Look at the four cards: which word did the bench lessons use?": "ચારેય કાર્ડ જુઓ: બેન્ચના પાઠોમાં કયો શબ્દ આવ્યો હતો?",
    "Read each word again and match it to what you see on the bench.": "દરેક શબ્દ ફરી વાંચો અને બેન્ચ પર જે દેખાય છે તેની સાથે મેળવો.",
    "Pick the word the lesson used for copies of one shape that fit together.": "જે શબ્દ પાઠમાં એક આકૃતિની જોડાયેલી ટાઇલો માટે આવ્યો હતો તે પસંદ કરો.",
    "A tessellation is a floor of tiles with no gaps and no overlaps.": "ટેસેલેશન એવું ટાઇલોનું ફર્શ છે જેમાં ન ખાલી જગ્યા છે, ન ઓવરલેપ.",
    "Number pattern": "સંખ્યા પેટર્ન",
    "Series": "ક્રમ",
    "Secret code": "ગુપ્ત સંકેત",
    "Tessellation": "ટેસેલેશન",
    "Lay a copy": "ટાઇલ મૂકો",
    "Gap finder": "ખાલી જગ્યા શોધક",
    "Overlap finder": "ઓવરલેપ શોધક",
    "Trace": "રસ્તો શોધો",
    "Bracket": "બ્રેકેટ",
    "Set all three seats first.": "પહેલાં ત્રણેય જગ્યા ભરો.",
    "Seat": "જગ્યા",
    "Square": "ચોરસ", "Brick": "ઈંટ", "Triangle": "ત્રિકોણ", "Diamond": "સમચતુર્ભુજ", "Circle": "વર્તુળ", "L shape": "L આકાર",
    "Carry on": "આગળ વધારો",
    "Lay things": "વસ્તુઓ મૂકો",
    "Marigold": "ગલગોટો",
    "Leaf": "પાન",
    "Rose": "ગુલાબ",
    "Coin": "સિક્કો",
    "Cap": "ઢાંકણ",
    "Numbers that follow a rule": "નિયમ મુજબ ચાલતી સંખ્યાઓ",
    "A list in order": "ક્રમમાં યાદી",
    "Read with a key": "ચાવીથી વાંચો",
    "No gaps, no overlaps": "ન ખાલી જગ્યા, ન ઓવરલેપ",
    "yes": "હા",
    "no": "ના",
    "gap": "ખાલી જગ્યા",
    "edge": "ફક્ત કિનારો",
    "up": "ઉપર",
    "down": "નીચે",
    "pattern": "સંખ્યા પેટર્ન",
    "series": "ક્રમ",
    "code": "ગુપ્ત સંકેત",
    "tessellation": "ટેસેલેશન",
  },
};

/* One entry per phase = one mount. Every instruction and hint is ONE sentence (one bubble page). */
const YN = [{ id: "yes", label: "Yes" }, { id: "no", label: "No" }];
const GE = [{ id: "gap", label: "A gap" }, { id: "edge", label: "Only the edge" }];
const PHASES = [
  {
    n: 1,
    concept: "Copies that fit with no gaps",
    conceptId: "M2.S4.T7.C30", objectiveIds: ["O11"],
    says: ["Look at the patch. Is anything left uncovered? Is anything doubled?"],
    steps: [
      { say: "Tap the square in the tray at the top.", on: "shape", hint: "Tap the first shape in the tray." },
      { say: "Tap Lay a copy to set the next copy down.", on: "lay", hint: "Tap the key at the bottom." },
      { say: "Tap Turn to turn the copy you just laid.", on: "turn", hint: "Tap the Turn key." },
      { say: "Tap Gap finder to look for any space left over.", on: "gaps", hint: "Tap the Gap finder key." },
      { say: "Tap Overlap finder to see if a copy lies over another.", on: "laps", hint: "Tap the Overlap finder key." },
    ],
    ladder: ["Is any space left over, or any part covered twice?", "Run both finders: a tessellation leaves both of them empty."],
    closing: "Shapes that cover a surface with no gaps or overlaps tessellate.",
    learned: "You learned: no gaps and no overlaps makes a tessellation.",
    traceback: "Both finders run over the child's own patch and the patch is named on a plate.",
    items: [
      /* learn ML1: answer in the plan = Yes. The bricks fit side by side with no gaps and no overlaps, so the wall is a tessellation */
      { qid: "M2.S4.T7.C30:ML1", kind: "verdict", lay: "brick", pre: 12, all: 12, keys: ["gaps", "laps"], badge: "A tessellation",
        say: "This wall has each row moved half a brick: is it a tessellation?",
        ask: "Tessellation?", answer: "yes", near: "no", choices: YN,
        miss: "Look along each row to see whether a brick sits right against the next.",
        win: "Yes, the bricks fit side by side with no space and no overlap." },
      /* practice 1: answer in the plan = No. Circles leave gaps between them, however they are pushed together */
      { qid: "M2.S4.T7.C30:1", kind: "verdict", lay: "coin", pre: 12, all: 12, keys: ["gaps", "laps"], badge: "Not a tessellation",
        say: "Round coins lie touching on a table: do they make a tessellation?",
        ask: "Tessellation?", answer: "no", near: "yes", choices: YN,
        miss: "The coins already touch: look in the space between four of them.",
        win: "No, the coins leave a space between them, so circles cannot tessellate." },
      /* practice 2: answer in the plan = No. There are no gaps, but one tile overlaps the other */
      { qid: "M2.S4.T7.C30:2", kind: "verdict", lay: "lap", pre: 2, all: 2, keys: ["gaps", "laps"], badge: "Not a tessellation",
        say: "Two squares lie half over each other with nothing uncovered: a tessellation?",
        ask: "Tessellation?", answer: "no", near: "yes", choices: YN,
        miss: "Run the overlap finder over the pair and see if any part is covered twice.",
        win: "No, one tile lies over the other, so it is not a tessellation." },
    ],
  },
  {
    n: 2,
    concept: "A gap or only the edge",
    conceptId: "M2.S4.T7.C31", objectiveIds: ["O11"],
    says: ["Is this space closed in by tiles all round? Or is it where the tiling stops?"],
    steps: [
      { say: "Tap Gap finder and watch which spaces fill with colour.", on: "gaps", hint: "Tap the Gap finder key." },
      { say: "Tap Trace to follow a notch out to the open bench.", on: "trace", hint: "Tap the Trace key." },
    ],
    ladder: ["Go round the space: does a tile close it in on every side?", "Can a finger get out to the open without crossing a tile?"],
    closing: "A space with tiles all round it is a gap; a bumpy outer edge is not.",
    learned: "You learned: a gap is closed in; the outer edge is not.",
    traceback: "The colour fills the closed-in spaces, a tracer runs from the space, and the plate names it.",
    items: [
      /* learn ML2: answer in the plan = Yes. The notches are only where the tiling stops, so they are not a gap */
      { qid: "M2.S4.T7.C31:ML2", kind: "verdict", lay: "spike", pre: 13, all: 13, keys: ["gaps", "trace"], badge: "A tessellation",
        tr: [[80, 70], [80, 10], [80, -8]],
        say: "This triangle patch has a bumpy top edge: is it a tessellation?",
        ask: "Tessellation?", answer: "yes", near: "no", choices: YN,
        miss: "Look inside the patch for any space with tiles closed all round it.",
        win: "Yes, the notches are only where the tiling stops, so there is no gap." },
      /* practice 3: answer in the plan = No. The saw-tooth outline is only where the tiling stops, so it is not a gap */
      { qid: "M2.S4.T7.C31:3", kind: "space", lay: "dia", pre: 20, all: 20, keys: ["gaps", "trace"], badge: "Only the edge",
        tr: [[30, 80], [0, 80], [-30, 80]],
        say: "Are the saw teeth of these diamonds gaps, or only the edge?",
        ask: "Gap or edge?", answer: "edge", near: "gap", choices: GE,
        miss: "Look at one tooth: are there tiles on every side of it?",
        win: "Only the edge, because every tooth opens out to the bench." },
      /* practice 4: answer in the plan = A gap, because circles close round it on every side */
      { qid: "M2.S4.T7.C31:4", kind: "space", lay: "coin", pre: 18, all: 18, keys: ["gaps", "trace"], badge: "A gap",
        tr: [[80.0, 69.0], [85.5, 70.5], [89.5, 74.5], [91.0, 80.0], [89.5, 85.5], [85.5, 89.5], [80.0, 91.0], [74.5, 89.5], [70.5, 85.5], [69.0, 80.0], [70.5, 74.5], [74.5, 70.5], [80.0, 69.0]],
        say: "Is the little space between four packed circles a gap, or only the edge?",
        ask: "Gap or edge?", answer: "gap", near: "edge", choices: GE,
        miss: "Look at what touches that space, all the way round it.",
        win: "A gap, because the circles close round that space on every side." },
    ],
  },
  {
    n: 3,
    concept: "Carrying a tiling on",
    conceptId: "M2.S4.T7.C32", objectiveIds: ["O12"],
    says: ["Where does the next one go? Which way must it face?"],
    steps: [
      { say: "Tap the dashed circle to put the next copy down.", on: "seat", hint: "Tap the dashed circle on the bench." },
      { say: "It does not fit, so tap the copy again to turn it over.", on: "seat", hint: "Tap the same copy once more." },
    ],
    ladder: ["Where does the next copy touch the last one?", "Turn each copy until its slanting side lies flat on the last."],
    closing: "Repeat the pattern, no gap, no overlap; if first is up, even places point down.",
    learned: "You learned: repeat the same shape the same way.",
    traceback: "The next copies are set down the right way up on a demo layer.",
    items: [
      /* learn ML3: answer in the plan = Point down, point up, point down. Three seats on the bench; a tap sets a copy and a second tap turns it. */
      { qid: "M2.S4.T7.C32:ML3", kind: "place", lay: "tri", par: 0, pre: 3, all: 6, nseat: 3, pad: "enter", keys: [], badge: "Down, up, down",
        say: "The row goes up, down, up, so set the next three triangles the right way.",
        ask: "Set them down", answer: "down,up,down", near: "up,up,up",
        miss: "Look at the copy just before it: which way does that one face?",
        win: "Each copy fits against the last when it is turned the right way." },
      /* practice 5: answer in the plan = 14 squares, because seven dominoes each two squares long make 14 */
      { qid: "M2.S4.T7.C32:5", kind: "count", lay: "domino", pre: 4, all: 7, keys: ["lay"], layLab: "Carry on",
        say: "A row has four two-square dominoes: how many squares long with three more?",
        ask: "Squares in all", answer: 14, near: 7,
        ladder: ["Tap Carry on, then count every square in the row.", "Each domino is two squares, so count the row by twos."],
        miss: "Count the squares on one domino, then count the dominoes.",
        win: "Seven dominoes of two squares each make a row 14 squares long." },
      /* practice 6: answer in the plan = Down. The odd-numbered triangles point up and the even-numbered ones point down, and ten is even */
      { qid: "M2.S4.T7.C32:6", kind: "facing", lay: "tri", par: 0, pre: 3, all: 10, keys: ["lay"], layLab: "Carry on", badge: "Points down",
        say: "The first points up and they take turns: which way does the tenth point?",
        ask: "The tenth one", answer: "down", near: "up", choices: [{ id: "up", label: "Up" }, { id: "down", label: "Down" }],
        ladder: ["Say the facings in order, one for each place along the row.", "Count along the row to the tenth place and say which way it faces."],
        miss: "Carry the row on and count the copies as they land.",
        win: "The tenth triangle points down, because every even place points down." },
    ],
  },
  {
    n: 4,
    concept: "Patterns made from things around you",
    conceptId: "M2.S4.T7.C33", objectiveIds: ["O12"],
    says: ["Lay a pattern from things around you. Which group comes round again?"],
    steps: [
      { say: "Tap the picture to see a pattern around you.", on: "look", hint: "Tap the big picture on the right." },
      { say: "Tap Lay things to hang the next ones on the string.", on: "lay", hint: "Tap the Lay things key." },
      { say: "Tap Bracket to mark the group that comes round again.", on: "bracket", hint: "Tap the Bracket key." },
    ],
    ladder: ["Look at the first thing and find where it returns.", "Read the string from the start and watch for the first thing that returns."],
    closing: "A repeating group makes a pattern; tiles with no gaps or overlaps tessellate.",
    learned: "You learned: things make a pattern when a group repeats.",
    traceback: "The bracket lights every copy of the group, and the count is drawn beside it.",
    items: [
      /* learn ML4: answer in the plan = Three, because the group of four repeats three times in twelve pieces */
      { qid: "M2.S4.T7.C33:ML4", kind: "string", str: ["marigold", "leaf", "leaf", "rose", "marigold", "leaf", "leaf", "rose", "marigold", "leaf", "leaf", "rose"],
        pre: 12, all: 12, keys: ["bracket"], ask: "Marigolds?", litk: "marigold", leg: ["marigold", "leaf", "rose"],
        say: "The toran repeats marigold, leaf, leaf, rose over twelve: how many marigolds?",
        answer: 3, near: 6, ladder: ["How many things hang in one group?", "Count the marigolds in one bracket, then count the brackets."],
        miss: "Start at the first marigold and see where the next one hangs.",
        win: "Three marigolds, one in each group of four." },
      /* practice 7: answer in the plan = Blue starts the third row, and 8 buttons are blue. Told by shape, not colour: coins and caps. */
      { qid: "M2.S4.T7.C33:7", kind: "rows", pre: 10, all: 15, keys: ["lay"], layLab: "Lay things", ask: "Coins?", litk: "coin", leg: ["coin", "cap"],
        say: "Coins and caps swap like a chessboard in three rows of five: how many coins?",
        answer: 8, near: 7, ladder: ["Tap Lay things to carry the third row on, then count the coins.", "Count the coins row by row and add them up."],
        miss: "Row 3 starts like row 1: count its coins too.",
        win: "Eight coins, because row 3 starts like row 1: three, two and three." },
      /* practice 8: answer in the plan = A tessellation; a secret code; a series. One of the three is asked. */
      { qid: "M2.S4.T7.C33:8", kind: "card", pre: 0, all: 0, keys: [],
        say: "Which chapter word names a floor of tiles with no gaps and no overlaps?",
        ask: "Which word?", answer: "tessellation", near: "series",
        choices: [{ id: "pattern", label: "Number pattern" }, { id: "series", label: "Series" }, { id: "code", label: "Secret code" }, { id: "tessellation", label: "Tessellation" }],
        ladder: ["Read each word again and match it to what you see on the bench.", "Pick the word the lesson used for copies of one shape that fit together."],
        miss: "Look at the four cards: which word did the bench lessons use?",
        win: "A tessellation is a floor of tiles with no gaps and no overlaps." },
    ],
  },
];

/* a win line is read to its end (2.4 s a short line, 68 ms a character), so each question holds its celebration that long */
PHASES.forEach((p: any) => p.items.forEach((it: any) => { if (it.win) it.winMs = Math.max(2400, 68 * it.win.length); }));


/* the warm-ups the guide steps work on (never a question's own picture) */
const WARM: any = {
  1: { kind: "warm", lay0: "hex", pick: true, pre: 2, keys: ["lay", "turn", "gaps", "laps"] },
  2: { kind: "warm", lay: "ring", pre: 9, all: 9, keys: ["gaps", "trace"], tr: [[245, 120], [300, 120], [360, 120]] },
  3: { kind: "warm", lay: "tri", par: 1, pre: 2, all: 3, nseat: 1, keys: [] },
  4: { kind: "string", pre: 3, all: 9, keys: ["lay", "bracket"], layLab: "Lay things", leg: ["coin", "cap"], str: ["coin", "cap", "cap", "coin", "cap", "cap", "coin", "cap", "cap"] },
};
const CARD_MEANS: any = { pattern: "Numbers that follow a rule", series: "A list in order", code: "Read with a key", tessellation: "No gaps, no overlaps" };
const PNAME: any = { marigold: "Marigold", leaf: "Leaf", rose: "Rose", coin: "Coin", cap: "Cap" };
/* the tray: seven shapes, four that tessellate and three that cannot; `id` is the lattice a copy is laid on */
const FREE_SHAPES = [{ id: "sqr", label: "Square" }, { id: "brick", label: "Rectangle" }, { id: "tri2", label: "Triangle" }, { id: "hex", label: "Hexagon" },
  { id: "pent", label: "Pentagon" }, { id: "oct", label: "Octagon" }, { id: "coin", label: "Circle" }];
const LAY_MAX: any = { sqr: 12, brick: 12, tri2: 14, hex: 12, pent: 12, oct: 12, coin: 12 };
/* which tray shape a question's own picture is made of (the lattice names of the questions) */
const TRAY_OF: any = { blk: "sqr", sqr: "sqr", lap: "sqr", ring: "sqr", brick: "brick", domino: "brick", tri: "tri2", spike: "tri2", coin: "coin" };
/* the pictures of the real thing round us (`floor`, `wall`, `rangoli` of images.json), each shown beside the tessellation it matches */
const GAL = [{ id: "floor", label: "Floor tiles", lay: "blk", n: 4 }, { id: "wall", label: "Wall pattern", lay: "brick", n: 8 }, { id: "rangoli", label: "Rangoli", lay: "", n: 0 }];

/* ── the bench, in working-area units: laid out ONCE for the 1086 room the area has with the keypad open (bigPad false) and kept at
   that size and place when it is shut (LAYOUT §3). Rows: the shape tray 0-84, the bench 96-416, the keys 432-512. ─────────── */
const BX = 20, BY = 96, BH = 320, KEY_Y = 432, KEY_H = 80;
const BW_WIDE = 1046, BW_NARROW = 700;               /* the narrow bench leaves the right column (326 wide) to the picture of the real thing */
const GX = 740, GW = 326;
const GAPC = "#9B1F6E", GAPE = "#5C0F40";   /* the deeper reddish purple of a gap and of an overlap, and its darker edge */
const CELL = 6;                      /* the finders read the bench on a lattice this fine */
const HEXH = (80 * 2) / Math.sqrt(3), PENTH = (90 * 1.809017) / 1.902113;

/* the numbers, rows, sizes and targets the working area needs (they go into the sidecar too) */
const MODEL = { bench: { w: BW_WIDE, h: BH }, cell: CELL, dot: 40, free: LAY_MAX, toran: PHASES[3].items[0].str, cards: Object.keys(CARD_MEANS) };

/* seat i of a tiling, in natural units (a dot is 40): kind, box and, for a triangle or an L, which way it faces */
const seatOf = (lay: string, i: number, par?: number): any => {
  const q = Math.floor;
  switch (lay) {
    case "blk": return { k: "rect", x: (i % 2) * 80, y: q(i / 2) * 80, w: 80, h: 80 };
    case "sqr": return { k: "rect", x: (i % 4) * 80, y: q(i / 4) * 80, w: 80, h: 80 };
    case "brick": return { k: "rect", x: (i % 4) * 80 + (q(i / 4) % 2) * 40, y: q(i / 4) * 40, w: 80, h: 40 };
    case "coin": return { k: "disc", x: (i % 6) * 80, y: q(i / 6) * 80, w: 80, h: 80 };
    case "lap": return { k: "rect", x: i * 40, y: 0, w: 80, h: 80 };
    case "domino": return { k: "rect", x: i * 80, y: 0, w: 80, h: 40, split: true };
    case "dia": return { k: "dia", x: (i % 5) * 80 + (q(i / 5) % 2) * 40, y: q(i / 5) * 40, w: 80, h: 80 };
    case "ell": { const p = q(i / 2); return { k: "ell", x: (p % 5) * 120, y: q(p / 5) * 80, u: 40, w: 120, h: 80, f: i % 2 ? "b" : "a" }; }
    case "spike": return i < 9 ? { k: "tri", x: i * 40, y: 80, w: 80, h: 80, f: i % 2 ? "down" : "up" } : { k: "tri", x: (i - 9) * 80, y: 0, w: 80, h: 80, f: "up" };
    case "ring": { const R = [[0, 0], [80, 0], [160, 0], [240, 0], [0, 80], [160, 80], [0, 160], [80, 160], [160, 160]][i]; return { k: "rect", x: R[0], y: R[1], w: 80, h: 80 }; }
    case "tri2": { const r = q(i / 7), c = i % 7; return { k: "tri", x: c * 40, y: r * 80, w: 80, h: 80, f: (c + r) % 2 ? "down" : "up" }; }
    case "hex": { const r = q(i / 4); return { k: "hex", x: (i % 4) * 80 + (r % 2) * 40, y: r * 0.75 * HEXH, w: 80, h: HEXH }; }
    case "pent": return { k: "pent", x: (i % 4) * 90, y: q(i / 4) * PENTH, w: 90, h: PENTH };
    case "oct": return { k: "oct", x: (i % 4) * 90, y: q(i / 4) * 90, w: 90, h: 90 };
    default: return { k: "tri", x: i * 40, y: 0, w: 80, h: 80, f: (i + (par || 0)) % 2 ? "down" : "up" };
  }
};
/* the scale and the corner that put the whole tiling (every seat it will ever use) in the middle of a bench `bw` wide */
const fitOf = (lay: string, n: number, par: number | undefined, bw: number, tight?: boolean) => {
  let x1 = 1, y1 = 1;
  for (let i = 0; i < n; i++) { const t = seatOf(lay, i, par); x1 = Math.max(x1, t.x + t.w); y1 = Math.max(y1, t.y + t.h); }
  /* `tight` (the arranging bench of Free play and the warm-up): a hair less margin, so that every seat of every lattice has its centre 72 or more from the next (the 72 x 72 taps never overlap) */
  const s = Math.floor(Math.min((bw - (tight ? 24 : 80)) / x1, (BH - (tight ? 20 : 40)) / y1, lay === "tri" ? 3.5 : 2.5) * 8) / 8;
  return { s, x: (bw - x1 * s) / 2, y: (BH - y1 * s) / 2 };
};
const tileAt = (lay: string, i: number, par: number | undefined, f: any) => {
  const t = seatOf(lay, i, par);
  return { ...t, x: f.x + t.x * f.s, y: f.y + t.y * f.s, w: t.w * f.s, h: t.h * f.s, u: (t.u || 40) * f.s };
};
/* ONE vertex list per shape, so the outline that is drawn and the edge the finders measure are the same line; a turned copy (`rot`, degrees) turns about its middle
   (a pentagon about the middle of its five corners) */
const polyCache = new WeakMap();
const polyOf = (t: any): number[][] => {
  const hit = polyCache.get(t);
  if (hit) return hit;
  const x = t.x, y = t.y, w = t.w, h = t.h, cx = x + w / 2, cy = y + h / 2;
  let p: number[][];
  if (t.k === "dia") p = [[cx, cy - w / 2], [cx + w / 2, cy], [cx, cy + w / 2], [cx - w / 2, cy]];
  else if (t.k === "ell") { const u = t.u; p = t.f === "b" ? [[x + u, y], [x + 3 * u, y], [x + 3 * u, y + 2 * u], [x + 2 * u, y + 2 * u], [x + 2 * u, y + u], [x + u, y + u]] : [[x, y], [x + u, y], [x + u, y + u], [x + 2 * u, y + u], [x + 2 * u, y + 2 * u], [x, y + 2 * u]]; }
  else if (t.k === "tri") p = t.f === "down" ? [[x, y], [x + w, y], [cx, y + h]] : [[x, y + h], [x + w, y + h], [cx, y]];
  else if (t.k === "hex") p = [[cx, y], [x + w, y + h / 4], [x + w, y + (3 * h) / 4], [cx, y + h], [x, y + (3 * h) / 4], [x, y + h / 4]];
  else if (t.k === "pent") p = [0, 1, 2, 3, 4].map((j) => { const a = ((-90 + 72 * j) * Math.PI) / 180; return [x + ((Math.cos(a) + 0.951057) / 1.902113) * w, y + ((Math.sin(a) + 1) / 1.809017) * h]; });
  else if (t.k === "oct") { const c = 0.292893; p = [[x + c * w, y], [x + (1 - c) * w, y], [x + w, y + c * h], [x + w, y + (1 - c) * h], [x + (1 - c) * w, y + h], [x + c * w, y + h], [x, y + (1 - c) * h], [x, y + c * h]]; }
  else p = [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
  if (t.rot) {
    const py = t.k === "pent" ? y + h * 0.552786 : cy, a = (t.rot * Math.PI) / 180, co = Math.cos(a), si = Math.sin(a);
    p = p.map((v) => [cx + (v[0] - cx) * co - (v[1] - py) * si, py + (v[0] - cx) * si + (v[1] - py) * co]);
  }
  polyCache.set(t, p);
  return p;
};
const rd = (v: number) => Math.round(v * 100) / 100;
/* one tile as an SVG path: the same outline the finders read */
const tilePath = (t: any) => {
  if (t.k === "disc") { const cx = t.x + t.w / 2, cy = t.y + t.h / 2, r = t.w / 2; return `M ${cx - r} ${cy} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0 Z`; }
  return "M " + polyOf(t).map((v) => rd(v[0]) + " " + rd(v[1])).join(" L ") + " Z";
};
const pointIn = (p: number[][], px: number, py: number) => {
  let c = false;
  for (let i = 0, j = p.length - 1; i < p.length; j = i++) if ((p[i][1] > py) !== (p[j][1] > py) && px < ((p[j][0] - p[i][0]) * (py - p[i][1])) / (p[j][1] - p[i][1]) + p[i][0]) c = !c;
  return c;
};
const inTile = (t: any, px: number, py: number) => {
  if (t.k === "disc") { const dx = px - (t.x + t.w / 2), dy = py - (t.y + t.h / 2); return dx * dx + dy * dy <= (t.w / 2) * (t.w / 2); }
  return pointIn(polyOf(t), px, py);
};
/* the two finders, measured on the true shapes: every space with tiles closed round it on every side (the gap), and every part covered more than once.
   A cell counts as covered for the flood if ANY of five points of it is inside a tile, so two tiles that meet at one corner (pentagons, circles) seal the
   space between them; a sliver of fewer than 10 cells left behind in a notch's tip belongs to the outside. */
const scanBench = (tiles: any[], bw: number) => {
  const cols = Math.ceil(bw / CELL), rows = Math.ceil(BH / CELL), N = cols * rows;
  const cnt = new Uint8Array(N), cov = new Uint8Array(N), out = new Uint8Array(N), seen = new Uint8Array(N);
  const D = 2.37, offs = [[D, D], [-D, D], [D, -D], [-D, -D]];
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const cx = i * CELL + 3.713, cy = j * CELL + 4.127, p = j * cols + i;
    let c = 0;
    for (let k = 0; k < tiles.length && c < 2; k++) if (inTile(tiles[k], cx, cy)) c++;
    cnt[p] = c;
    let any = c > 0;
    for (let o = 0; o < 4 && !any; o++) for (let k = 0; k < tiles.length && !any; k++) if (inTile(tiles[k], cx + offs[o][0], cy + offs[o][1])) any = true;
    cov[p] = any ? 1 : 0;
  }
  const stack: number[] = [];
  const open = (i: number, j: number) => { const p = j * cols + i; if (i < 0 || j < 0 || i >= cols || j >= rows || out[p] || cov[p]) return; out[p] = 1; stack.push(p); };
  for (let i = 0; i < cols; i++) { open(i, 0); open(i, rows - 1); }
  for (let j = 0; j < rows; j++) { open(0, j); open(cols - 1, j); }
  while (stack.length) { const p = stack.pop() as number, i = p % cols, j = (p - i) / cols; open(i - 1, j); open(i + 1, j); open(i, j - 1); open(i, j + 1); }
  /* the uncovered cells that only the five-point test kept out of the flood (one cell wide along every tile edge) go with the outside they touch */
  const near: number[] = [];
  for (let p = 0; p < N; p++) if (!cnt[p] && !out[p]) { const i = p % cols, j = (p - i) / cols; let t = false;
    for (let dj = -1; dj <= 1 && !t; dj++) for (let di = -1; di <= 1 && !t; di++) { const a = i + di, b = j + dj; if (a >= 0 && b >= 0 && a < cols && b < rows && out[b * cols + a]) t = true; }
    if (t) near.push(p); }
  for (const p of near) out[p] = 1;
  const gapCell = new Uint8Array(N); let nGapCells = 0, nGap = 0;
  for (let p0 = 0; p0 < N; p0++) {
    if (cnt[p0] || out[p0] || seen[p0]) continue;
    const comp: number[] = [p0]; seen[p0] = 1;
    for (let h = 0; h < comp.length; h++) { const p = comp[h], i = p % cols, j = (p - i) / cols;
      for (let dj = -1; dj <= 1; dj++) for (let di = -1; di <= 1; di++) { const a = i + di, b = j + dj, q = b * cols + a;
        if (a >= 0 && b >= 0 && a < cols && b < rows && !seen[q] && !cnt[q] && !out[q]) { seen[q] = 1; comp.push(q); } } }
    if (comp.length >= 10) { nGap++; for (const p of comp) { gapCell[p] = 1; nGapCells++; } }
  }
  const runs = (pick: (p: number) => boolean) => {
    const r: any[] = [];
    for (let j = 0; j < rows; j++) { let s = -1;
      for (let i = 0; i <= cols; i++) { const on = i < cols && pick(j * cols + i);
        if (on && s < 0) s = i;
        else if (!on && s >= 0) { r.push({ x: s * CELL, y: j * CELL, w: (i - s) * CELL, h: CELL }); s = -1; } } }
    return r;
  };
  /* how many separate pieces the copies make (corner contact joins, as the five-point test above seals it): scattered copies are not one tiling */
  const pc = new Uint8Array(N); let nPiece = 0;
  for (let p0 = 0; p0 < N; p0++) {
    if (!cov[p0] || pc[p0]) continue;
    nPiece++; pc[p0] = 1; const q: number[] = [p0];
    while (q.length) { const p = q.pop() as number, i = p % cols, j = (p - i) / cols;
      for (let dj = -1; dj <= 1; dj++) for (let di = -1; di <= 1; di++) { const a = i + di, b = j + dj, r = b * cols + a;
        if (a >= 0 && b >= 0 && a < cols && b < rows && cov[r] && !pc[r]) { pc[r] = 1; q.push(r); } } }
  }
  const gaps = runs((p) => gapCell[p] === 1);
  const laps = runs((p) => cnt[p] > 1);
  return { gaps, laps, nGap, nLap: laps.length, nGapCells, nPiece };
};
/* the outline of the patch: the edges of the tiles that face the open bench (the notches and bumps), as one path; a space closed in between tiles has none */
const outerEdges = (tiles: any[], bw: number, gaps: any[]) => {
  if (!tiles.length) return "";
  const inGap = (px: number, py: number) => { for (const g of gaps) if (px >= g.x - 3 && px < g.x + g.w + 3 && py >= g.y - 3 && py < g.y + g.h + 3) return true; return false; };
  const any = (px: number, py: number) => { for (let k = 0; k < tiles.length; k++) if (inTile(tiles[k], px, py)) return true; return false; };
  let d = "";
  tiles.forEach((t) => {
    const pts: number[][] = t.k === "disc" ? Array.from({ length: 36 }, (_, j) => [t.x + t.w / 2 + (t.w / 2) * Math.cos((j / 36) * 2 * Math.PI), t.y + t.h / 2 + (t.w / 2) * Math.sin((j / 36) * 2 * Math.PI)]) : polyOf(t);
    for (let j = 0; j < pts.length; j++) {
      const a = pts[j], b = pts[(j + 1) % pts.length], mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      const nx = (b[1] - a[1]) / len, ny = -(b[0] - a[0]) / len;
      const free1 = !any(mx + nx * 3, my + ny * 3), free2 = !any(mx - nx * 3, my - ny * 3);
      if ((free1 && !inGap(mx + nx * 3, my + ny * 3)) || (free2 && !inGap(mx - nx * 3, my - ny * 3))) d += `M ${rd(a[0])} ${rd(a[1])} L ${rd(b[0])} ${rd(b[1])} `;
    }
  });
  return d;
};
/* a polyline walked in steps of about `step` units, so a pencil can draw it point by point */
const walk = (pts: number[][], step: number) => {
  const out: number[][] = [pts[0]];
  for (let k = 1; k < pts.length; k++) {
    const a = pts[k - 1], b = pts[k], d = Math.hypot(b[0] - a[0], b[1] - a[1]), m = Math.max(1, Math.round(d / step));
    for (let j = 1; j <= m; j++) out.push([a[0] + ((b[0] - a[0]) * j) / m, a[1] + ((b[1] - a[1]) * j) / m]);
  }
  return out;
};
/* the things of the last phase (a string and rows), in bench units: they hang 84 apart on the wide bench and closer on the narrow one */
const pitchOf = (sc: any, bw: number) => Math.min(84, (bw - 100) / Math.max(1, (sc.all || 2) - 1));
const pieceAt = (sc: any, i: number, bw: number) => {
  if (sc.kind === "rows") { const cp = Math.min(190, (bw - 120) / 5); return { x: bw / 2 + ((i % 5) - 2) * cp, y: 46 + Math.floor(i / 5) * 78, k: (Math.floor(i / 5) + (i % 5)) % 2 ? "cap" : "coin", r: bw < 800 ? 30 : 34 }; }
  const pt = pitchOf(sc, bw), x = (bw - (sc.all - 1) * pt) / 2 + i * pt, t = (x - 30) / (bw - 60);
  return { x, y: 50 + 120 * t * (1 - t) + 60, k: sc.str[i], r: pt < 84 ? Math.round(pt * 0.46) : 38 };
};
const periodOf = (str: string[]) => { for (let p = 1; p < str.length; p++) if (str.length % p === 0 && str.every((k, i) => k === str[i % p])) return p; return str.length; };
/* how far one tap of Turn turns a copy, by its shape (a triangle turns over, a hexagon a sixth, a pentagon a fifth) */
const TURN_BY: any = { rect: 90, disc: 90, tri: 180, hex: 60, pent: 72, oct: 45, dia: 90, ell: 90 };
/* what the two finders found, in words (a tessellation is told only when both come back empty) */
/* "It tessellates" is told only for the four shapes that do (square, rectangle, triangle, hexagon) and only for one joined patch; a pentagon, an octagon or a circle
   with no closed-in gap yet says "No gap yet", and so do copies that lie apart */
const NO_FIT = ["pent", "oct", "coin"];
const verdictOf = (nG: number, nL: number, lay?: string, nPiece?: number) => (nG === 0 && nL === 0 ? (NO_FIT.indexOf(lay || "") >= 0 || (nPiece || 0) > 1 ? "No gap yet" : "It tessellates") : nG > 0 && nL > 0 ? "Gaps and overlaps" : nG > 0 ? "It leaves gaps" : "It overlaps");
const SHORT_OF: any = { "It tessellates": "Tessellates", "No gap yet": "No gap yet", "It leaves gaps": "Leaves gaps", "It overlaps": "Overlaps", "Gaps and overlaps": "Both faults" };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work.
   The verdicts come from area arithmetic and tangency, the numbers from repeated addition, parity and walking the pattern out. */
const oracle = () => {
  const d: any = {};
  /* 12 bricks of 80 by 40 = 38,400, and the three flush rows of four measure the same, so nothing is doubled or left over */
  d["M2.S4.T7.C30:ML1"] = 12 * 80 * 40 === 3 * (4 * 80) * 40 ? "yes" : "no";
  /* 12 circles of radius 40 stand in the 480 by 160 box their centres fill, and cover less of it */
  d["M2.S4.T7.C30:1"] = 12 * Math.PI * 40 * 40 < 480 * 160 ? "no" : "yes";
  /* two 80-squares set 40 apart cover a strip only 120 by 80: more tile than strip */
  d["M2.S4.T7.C30:2"] = 2 * 80 * 80 > (40 + 80) * 80 ? "no" : "yes";
  /* nine triangles of half of 80 by 80 fill a trapezoid (400 below, 320 above, 80 high) and four more stand on its top edge: no doubled part,
     and every notch between two of them has open bench straight above it (their apexes stand at one height) */
  d["M2.S4.T7.C31:ML2"] = 9 * (80 * 80 / 2) === ((400 + 320) / 2) * 80 ? "yes" : "no";
  /* the diamond rows start 40 apart, so each tooth of the outline has bench straight beside it */
  d["M2.S4.T7.C31:3"] = 40 !== 0 ? "edge" : "gap";
  /* the four circles round the little space are 80 apart and their radii add to 80: they touch, so the ring closes */
  d["M2.S4.T7.C31:4"] = 40 + 40 >= 80 ? "gap" : "edge";
  /* the row takes turns from seat zero pointing up: the facings of seats three, four, five */
  d["M2.S4.T7.C32:ML3"] = [3, 4, 5].map((i) => (i % 2 ? "down" : "up")).join(",");
  /* seven dominoes, two squares each, counted on by twos */
  let sq = 0; for (let i = 0; i < 7; i++) sq += 2;
  d["M2.S4.T7.C32:5"] = sq;
  /* the tenth triangle: turn the facing over nine times from the first */
  let f2 = "up"; for (let i = 1; i < 10; i++) f2 = f2 === "up" ? "down" : "up";
  d["M2.S4.T7.C32:6"] = f2;
  /* walk the twelve pieces of the toran and count the marigolds */
  d["M2.S4.T7.C33:ML4"] = PHASES[3].items[0].str.filter((t: string) => t === "marigold").length;
  /* three rows of five, a coin wherever the row and the place are both odd or both even */
  let coins = 0; for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) if ((r + c) % 2 === 0) coins++;
  d["M2.S4.T7.C33:7"] = coins;
  /* the one card whose meaning is about gaps and overlaps */
  d["M2.S4.T7.C33:8"] = Object.keys(CARD_MEANS).filter((k) => /gaps/.test(CARD_MEANS[k]))[0];
  return PHASES.every((p: any) => p.items.every((it: any) => String(d[it.qid]) === String(it.answer)));
};
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print (a word choice bans nothing: the panel prints every choice) */
const answerForms = (item: any) => (item.choices || typeof item.answer !== "number" ? [] : [String(item.answer), indian(item.answer), words(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
const check = () => (HOOK.check ? HOOK.check() : undefined);


/* what the last question's patch looked like, kept so the next question (and Free play's Keep key) can set two patches side by side */
let CMP: any = null;

/* a few of the tiles of a patch drawn small, with the dark outline, in a box (x, y, w, h) */
const miniPatch = (tiles: any[], bw: number, x: number, y: number, w: number, h: number, key: string) => {
  if (!tiles.length) return null;
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
  tiles.forEach((t) => { x0 = Math.min(x0, t.x); y0 = Math.min(y0, t.y); x1 = Math.max(x1, t.x + t.w); y1 = Math.max(y1, t.y + t.h); });
  const s = Math.min(w / (x1 - x0), h / (y1 - y0)), ox = x + (w - (x1 - x0) * s) / 2 - x0 * s, oy = y + (h - (y1 - y0) * s) / 2 - y0 * s;
  return (
    <g key={key} transform={`translate(${rd(ox)},${rd(oy)}) scale(${rd(s * 1000) / 1000})`}>
      {tiles.map((t, i) => <path key={i} d={tilePath(t)} fill={t.k === "disc" ? "url(#tbCoin)" : "url(#gHundred)"} stroke={CHROME.ink} strokeWidth={Math.max(2, 3 / s)} strokeLinejoin="round" />)}
    </g>
  );
};

/* ── the working area ────────────────────────────────────────────────────────────────────────
   Rows: the shape tray (0-84) with the plate beside it, the bench of dotted paper (96-416), the keys (432-512). The bench is laid out ONCE
   from the 1086 the area has with the keypad open (1046 wide, or 700 beside the picture of the real thing) and keeps that size and place when
   the keypad is shut; nothing stands past x 1066, so nothing is under the key's corner (box.key). The question is only in the bubble. Every
   key performs its act on screen (api.act); a tap on a seat or a picture is the child's own touch. */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const warm = (stage === "demo" || stage === "teach") && !!WARM[n];

  /* the board belongs to the ENTRY into a question (a question entered again opens fresh, PATTERNS §18) */
  const qk = free ? "free" : n + ":" + (warm ? "w" : index);
  const entry = useRef<any>({ last: "", n: 0 });
  if (entry.current.last !== qk) entry.current = { last: qk, n: entry.current.n + 1 };
  const ek = qk + "#" + entry.current.n;
  const fresh = () => ({ ek, laid: 0, occ: [] as number[], gaps: false, laps: false, wash: 1, trN: 0, seats: [null, null, null], nudge: false, brN: 0, br: false, shape: null, rots: [], look: 0, touched: false, demo: null });
  const [raw, setRaw] = useState<any>(() => fresh());
  const S: any = raw.ek === ek ? raw : fresh();
  const live = useRef(ek); live.current = ek;
  const upd = (patch: any) => { if (live.current !== ek) return; setRaw((p: any) => ({ ...(p.ek === ek ? p : fresh()), ...patch })); };
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false);
  const gateRef = useRef(false);
  const lookT = useRef(0);

  const sc: any = free ? { kind: "free", lay0: "sqr", pick: true, keys: ["lay", "turn", "gaps", "laps", "keep"] } : warm ? WARM[n] : item;
  const kind = sc.kind;
  const piece = kind === "string" || kind === "rows";
  const pickable = free || (warm && !!sc.pick);
  const lay = pickable ? (S.shape || sc.lay0) : sc.lay;
  const narrow = free || piece;                               /* the bench shares the room with the picture of the real thing */
  const BWc = narrow ? BW_NARROW : BW_WIDE;
  const N = pickable ? LAY_MAX[lay] : (sc.all || 0);
  const pre = free ? 0 : (sc.pre || 0);
  const layN = kind === "facing" ? N - 1 : N;                  /* Carry on stops one short of the tenth: the asked piece is never laid for the child */
  const rest = Math.max(0, layN - pre - S.laid);
  const nseat = sc.nseat || 0;
  const fit = useMemo(() => (lay ? fitOf(lay, N, sc.par, BWc, pickable) : null), [lay, N, sc.par, BWc, pickable]);

  /* Work coordinates of a point on the bench, for api.act (the bench never moves: same size and place, keypad open or shut) */
  const WP = (x: number, y: number) => ({ x: BX + x, y: BY + y });
  const trayIdx = Math.max(0, FREE_SHAPES.map((s) => s.id).indexOf(pickable ? lay : (TRAY_OF[sc.lay] || "")));
  const trayPt = { x: BX + trayIdx * 92 + 42, y: 42 };

  const padEnter = !free && !warm && !!item && item.pad === "enter";
  /* the seats the child set; a miss submitted without them (the dev driver, the agent) shows the submitted row instead */
  const sentSeats = padEnter && wrong && typeof typed === "string" ? typed.split(",").map((s: string) => s.trim().toLowerCase()) : [];
  /* a right answer shows all three right copies, whoever sent it (a tap row, the dev driver or the agent sets no seat) */
  const seatsNow: any[] = padEnter && (stage === "win" || stage === "idle") && typeof item.answer === "string" ? item.answer.split(",") : S.seats.some((v: any) => !!v) || sentSeats.length !== 3 || sentSeats.some((v: string) => v !== "up" && v !== "down") ? S.seats : sentSeats;
  const seatsKey = seatsNow.join(",");
  const seatsDone = nseat === 3 && S.seats.slice(0, 3).every((v: any) => !!v);

  /* every tile standing on the bench: what the question gave, what the child laid (and turned), the seats the child turned */
  const tiles = useMemo(() => {
    const out: any[] = [];
    if (!lay || !fit) return out;
    const seats = kind === "place" || (warm && nseat > 0);
    for (let i = 0; i < pre; i++) out.push({ ...tileAt(lay, i, sc.par, fit), own: "given" });
    if (seats) { for (let j = 0; j < nseat; j++) if (seatsNow[j]) out.push({ ...tileAt(lay, pre + j, sc.par, fit), f: seatsNow[j], own: "laid", seat: true, sj: j }); }
    /* the copies the child laid, in the order laid: on the arranging bench each sits on the seat it was set on (any seat), else on the next seat in a row */
    else for (let k = 0; k < S.laid; k++) out.push({ ...tileAt(lay, pickable && typeof S.occ[k] === "number" ? S.occ[k] : pre + k, sc.par, fit), rot: S.rots[k] || 0, own: "laid" });
    return out;
  }, [lay, N, pre, S.laid, S.occ.join(","), S.rots.join(","), seatsKey, kind, warm, sc.par, BWc]);
  const scan = useMemo(() => scanBench(tiles, BWc), [tiles, BWc]);
  const outline = useMemo(() => outerEdges(tiles, BWc, scan.gaps), [tiles, scan]);
  /* which pairs of tiles lie over each other: the overlap hatch is clipped to the true shared part of each pair, never to stair-step cells */
  const lapPairs = useMemo(() => {
    const seen: any = {}, out: number[][] = [];
    for (const g of scan.laps) for (let px = g.x + 3.7; px < g.x + g.w; px += CELL) {
      const hit: number[] = [];
      for (let k = 0; k < tiles.length; k++) if (inTile(tiles[k], px, g.y + 4.1)) hit.push(k);
      for (let a = 0; a < hit.length; a++) for (let b = a + 1; b < hit.length; b++) if (!seen[hit[a] + "_" + hit[b]]) { seen[hit[a] + "_" + hit[b]] = 1; out.push([hit[a], hit[b]]); }
    }
    return out;
  }, [scan, tiles]);

  /* ── the acts: each key performs its act on screen (api.act) and reacts only when it resolves true ───────────────── */
  const canTap = !busy && !tl.busy && (stage === "ask" || free || (stage === "demo" && !!stepOn));
  const runAct = async (spec: any, after: () => void) => {
    if (busyRef.current) return;
    busyRef.current = true; setBusy(true);
    const ok = await api.act(spec);
    busyRef.current = false; setBusy(false);
    if (ok) after();
  };
  /* the tracer's path in bench units, kept inside the bench rim (the notch the pencil leaves by opens onto the bench, not past it) */
  const trailOf = (id: string) => { const r = sc.tr ? walk(sc.tr, 22) : []; return fit ? r.map((p) => [Math.max(14, Math.min(BWc - 14, fit.x + p[0] * fit.s)), Math.max(14, Math.min(BH - 14, fit.y + p[1] * fit.s))]) : r; };
  /* the arranging bench (Free play and the warm-up): the next empty seat, or the one the child tapped */
  const nextFree = () => { for (let i = pre; i < N; i++) if (S.occ.indexOf(i) < 0) return i; return N; };
  const doLay = (at?: number) => {
    if (rest <= 0) return;
    const one = free || !!sc.pick;
    const take = one ? 1 : rest, first = pickable ? (typeof at === "number" && S.occ.indexOf(at) < 0 && at >= pre && at < N ? at : nextFree()) : pre + S.laid, pts: any[] = [];
    for (let j = 0; j < take; j++) {
      if (piece) { const p = pieceAt(sc, first + j, BWc); pts.push(WP(p.x, p.y)); }
      else { const t = tileAt(lay, first + j, sc.par, fit); pts.push(WP(t.x + t.w / 2, t.y + t.h / 2)); }
    }
    const b0 = piece ? null : seatOf(lay, first, sc.par);
    const hold = piece ? undefined : <path d={tilePath({ k: b0.k, f: b0.f, u: 20, x: -20, y: -20, w: 40, h: 40 })} fill={lay === "coin" ? "#D5DADD" : "url(#gHundred)"} stroke={CHROME.ink} strokeWidth={3} />;
    const base = S.laid;
    runAct({ tool: "hand", moves: take > 1 ? "push" : "carry", from: trayPt, at: pts, hold: take > 1 ? undefined : hold,
      onPoint: (j: number) => { api.sfx.tick(); upd(pickable ? { laid: base + 1, occ: S.occ.concat([first]) } : { laid: base + j + 1 }); } }, () => { api.sfx.settle(); api.did("lay"); });
  };
  /* Turn: the copy laid last (the Turn key) or the copy the child tapped (`k`, in the order laid) turns by one step of its shape (a triangle over, a hexagon a sixth ...);
     a turned copy that no longer fits shows it to the finders */
  const doTurn = (k?: number) => {
    const at = typeof k === "number" ? k : S.laid - 1;
    if (S.laid < 1 || at < 0 || at >= S.laid || !tiles[pre + at]) return;
    const t = tiles[pre + at], by = TURN_BY[t.k] || 90, now = ((S.rots[at] || 0) + by) % 360;
    runAct({ tool: "hand", moves: "tap", at: [WP(t.x + t.w / 2, t.y + t.h / 2)],
      onPoint: () => { api.sfx.tick(); const r = S.rots.slice(); while (r.length < at) r.push(0); r[at] = now; upd({ rots: r, gaps: false, laps: false, wash: 1 }); } }, () => { api.sfx.settle(); api.did("turn"); });
  };
  const sweepPts = [WP(BWc * 0.2, BH * 0.15), WP(BWc * 0.8, BH * 0.3), WP(BWc * 0.2, BH * 0.5), WP(BWc * 0.8, BH * 0.7), WP(BWc * 0.5, BH * 0.88)];
  const doGaps = () => {
    upd({ gaps: true, wash: 0 });
    runAct({ tool: "hand", moves: "sweep", from: WP(40, 20), at: sweepPts, to: WP(BWc - 40, BH - 20),
      onPoint: (j: number) => upd({ wash: (j + 1) / sweepPts.length }) }, () => { upd({ wash: 1 }); api.did("gaps"); });
  };
  const doLaps = () => {
    runAct({ tool: "hand", moves: "sweep", from: WP(40, 20), at: sweepPts, to: WP(BWc - 40, BH - 20),
      onPoint: (j: number) => { if (j === 1) upd({ laps: true }); } }, () => { upd({ laps: true }); api.did("laps"); });
  };
  const doTrace = () => {
    const pts = trailOf("tr");
    if (pts.length < 2) return;
    upd({ trN: 0 });
    runAct({ tool: "pencil", moves: "draw", marks: true, at: pts.map((p) => WP(p[0], p[1])), onPoint: (j: number) => upd({ trN: j + 1 }) }, () => { upd({ trN: pts.length }); api.did("trace"); });
  };
  const doBracket = () => {
    const p = periodOf(sc.str), a = pieceAt(sc, 0, BWc), b = pieceAt(sc, p - 1, BWc), hf = pitchOf(sc, BWc) / 2, x0 = a.x - hf, x1 = b.x + hf;
    const pts = walk([[x0, 205], [x0, 224], [x1, 224], [x1, 205]], 26);
    upd({ brN: 0 });
    runAct({ tool: "pencil", moves: "draw", marks: true, at: pts.map((q) => WP(q[0], q[1])), onPoint: (j: number) => upd({ brN: j + 1 }) }, () => { upd({ br: true, brN: pts.length }); api.sfx.settle(); api.did("bracket"); });
  };
  const doSeat = (j: number) => {
    const t = tileAt(lay, pre + j, sc.par, fit);
    const next = S.seats[j] === "up" ? "down" : "up";
    runAct({ tool: "hand", moves: "tap", at: [WP(t.x + t.w / 2, t.y + t.h / 2)],
      onPoint: () => { api.sfx.tick(); upd({ seats: S.seats.map((v: any, q: number) => (q === j ? next : v)), nudge: false }); if (S.nudge && item) api.say(item.say); } }, () => api.did("seat"));
  };
  /* Keep: the patch on the bench goes to the card beside it, to be compared with the next one */
  const doKeep = () => {
    if (!tiles.length) return;
    runAct({ tool: "hand", moves: "tap", at: [{ x: GX + GW / 2, y: BY + 270 }],
      onPoint: () => { api.sfx.tick(); CMP = { n: "free", tiles: tiles.map((t) => ({ ...t })), bw: BWc, line: verdictOf(scan.nGap, scan.nLap, lay, scan.nPiece), laid: S.laid }; upd({ kept: S.laid + ":" + lay + ":" + S.occ.join("-") + ":" + S.rots.join("-") }); } }, () => { api.sfx.settle(); api.did("keep"); });
  };
  const pickShape = (id: string) => { upd({ shape: id, laid: 0, occ: [], rots: [], gaps: false, laps: false, wash: 1, trN: 0, demo: null }); api.sfx.tick(); api.did("shape"); };
  const lookAt = (j: number) => { const now = Date.now(); if (now - lookT.current < 300) return; lookT.current = now; upd({ look: (S.look + 1) % GAL.length }); api.sfx.tick(); api.did("look"); };
  const act = (on: string, j?: any) => {
    if (!canTap) return;
    /* a tap on an empty seat is Lay a copy, a tap on a laid copy is Turn, for a step that waits for either key */
    if (stage === "demo" && stepOn && (on === "put" ? "lay" : on === "spin" ? "turn" : on) !== stepOn) { api.did(on); return; }
    if (S.demo) upd({ demo: null });
    if (on === "lay") doLay();
    else if (on === "put") doLay(Number(j));
    else if (on === "spin") doTurn(Number(j));
    else if (on === "turn") doTurn();
    else if (on === "gaps") doGaps();
    else if (on === "laps") doLaps();
    else if (on === "trace") doTrace();
    else if (on === "bracket") doBracket();
    else if (on === "keep") doKeep();
    else if (on === "seat") doSeat(j || 0);
    else if (on === "shape") pickShape(String(j));
    else if (on === "look") lookAt(Number(j) || 0);
  };
  /* a tap by the child (a key, a seat, a picture): it is what makes the answer wait for the act (PATTERNS §20) */
  const childAct = (on: string, j?: any) => { if (!S.touched && !busy) upd({ touched: true }); act(on, j); };

  /* Enter, while the working area holds the answer; in a steps phase it performs the CURRENT step's act */
  /* Enter (the pink key or the physical one) with a seat still empty only says so: it sends nothing and takes no try */
  api.onEnter(stage === "demo" && stepOn ? () => act(stepOn, stepOn === "shape" ? "sqr" : 0)
    : padEnter && stage === "ask" ? () => { if (seatsDone) api.submit(S.seats.slice(0, 3).join(",")); else { upd({ nudge: true }); api.say("Set all three seats first."); } } : null);
  HOOK.set = (v: any) => {
    if (!padEnter) return undefined;
    const a = String(v).split(",").map((s) => s.trim().toLowerCase());
    if (a.length !== 3 || a.some((s) => s !== "up" && s !== "down")) return false;
    upd({ seats: a }); return true;
  };
  /* the keyboard reaches the seats: 1, 2 and 3 tap seat 1, 2 and 3 (the runtime ignores a digit on a working-area question) */
  const actNow = useRef<any>(null); actNow.current = act;
  useEffect(() => {
    if (!padEnter || stage !== "ask") return;
    const h = (e: any) => { if (!e.repeat && !e.metaKey && !e.ctrlKey && !e.altKey && /^[123]$/.test(e.key)) actNow.current("seat", Number(e.key) - 1); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [padEnter, stage, ek]);
  useEffect(() => { if (padEnter && stage === "ask") api.answerReady(!!seatsDone); }, [seatsDone, stage, ek]);

  /* the win line, said once a right answer lands (the bubble then shows the phase's closing at the last one) */
  useEffect(() => { if (stage === "win" && item && item.win) api.say(item.win); }, [stage, ek]);

  /* ── the answer waits for the act (PATTERNS §20): once the child has touched the bench, the corner key stays flat until the finders (or Carry on,
     the bracket, the things) have been used; the agent's own calls never touch the bench, so they are never held ─────────────────── */
  const bothFinders = !free && !warm && !!sc.keys && sc.keys.indexOf("laps") >= 0;
  const finderDone = S.gaps && S.wash >= 1 && (!bothFinders || S.laps);
  const needAct = !free && !warm && stage === "ask" && !!item && (kind === "verdict" || kind === "space" ? !finderDone
    : kind === "count" || kind === "facing" || kind === "rows" ? rest > 0
    : kind === "string" ? !S.br : kind === "place" ? !seatsDone : false);
  useEffect(() => {
    const want = needAct && S.touched;
    if (want && !gateRef.current) {
      gateRef.current = true; api.lock(true);
      if (kind === "verdict" && bothFinders) api.say("Run both finders, then answer.");
      else if (kind === "verdict" || kind === "space") api.say("Run the Gap finder, then answer.");
      else if (kind === "string") api.say("Tap Bracket, then answer.");
      else if (kind === "place") api.say("Set all three seats, then answer.");
      else if (kind === "rows") api.say("Tap Lay things, then answer.");
      else api.say("Tap Carry on, then answer.");
    } else if (!want && gateRef.current) {
      gateRef.current = false; api.lock(false);
      if (stage === "ask" && item) api.say(item.say);
    } else if (want && !busy) api.lock(true);   /* runtime gap: useActionKit unlocks when an act ends if the tool had not locked before it began (`if (!c.was) lockNow(false)`), so lock again once the act is over */
  }, [needAct, S.touched, ek, busy]);

  /* ── the traceback: the maths redrawn on a demo layer, ending on the whole right answer ───────────────────── */
  /* the right way for each seat the child got wrong or left empty (a seat already right needs no ghost: the child's own copy stays where it lies) */
  const rightSeats = () => [0, 1, 2].map((j) => ({ i: pre + j, f: (pre + j) % 2 ? "down" : "up" })).filter((g) => seatsNow[g.i - pre] !== g.f);
  const restSeats = () => { const o: any[] = []; for (let i = pre + S.laid; i < N; i++) o.push({ i, f: (i + (sc.par || 0)) % 2 ? "down" : "up" }); return o; };
  const finalDemo = (): any => {
    if (kind === "verdict" || kind === "space") return { gap: true, lap: true, tr: !!sc.tr, badge: sc.badge };
    if (kind === "place") return { badge: sc.badge };
    if (kind === "count") return { copies: restSeats(), lit: 14, num: 14 };
    if (kind === "facing") return { ghosts: restSeats(), tenth: true, badge: sc.badge };
    if (kind === "string") return { br: true, lit: true, num: 3 };
    if (kind === "rows") return { row3: true, lit: true, num: 8 };
    if (kind === "card") return { flip: true, card: "tessellation" };
    return null;
  };
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    const st: any[] = [];
    if (kind === "verdict" || kind === "space") {
      st.push([120, () => upd({ demo: { gap: true }, wash: 0 })], [100, () => upd({ wash: 0.4 })], [100, () => upd({ wash: 0.8 })], [160, () => upd({ wash: 1 })],
        [700, () => upd({ demo: { gap: true, lap: true } })]);
      if (sc.tr) st.push([700, () => upd({ demo: { gap: true, lap: true, tr: true } })]);
      st.push([600, () => upd({ demo: finalDemo() })]);
    } else if (kind === "place") {
      st.push([800, () => upd({ demo: { lap: true } })], [900, () => upd({ demo: { lap: true, ghosts: rightSeats() } })], [800, () => upd({ demo: { lap: true, ghosts: rightSeats(), badge: sc.badge } })]);
    } else if (kind === "count") {
      st.push([600, () => upd({ demo: { copies: restSeats() } })]);
      for (let k = 2; k <= 14; k += 2) { const q = k; st.push([180, () => upd({ demo: { copies: restSeats(), lit: q } })]); }
      st.push([600, () => upd({ demo: finalDemo() })]);
    } else if (kind === "facing") {
      st.push([500, () => upd({ demo: { ghosts: restSeats() } })], [800, () => upd({ demo: { ghosts: restSeats(), tenth: true } })], [600, () => upd({ demo: finalDemo() })]);
    } else if (kind === "string") {
      st.push([700, () => upd({ demo: { br: true } })], [800, () => upd({ demo: { br: true, lit: true } })], [600, () => upd({ demo: finalDemo() })]);
    } else if (kind === "rows") {
      st.push([700, () => upd({ demo: { row3: true } })], [800, () => upd({ demo: { row3: true, lit: true } })], [600, () => upd({ demo: finalDemo() })]);
    } else if (kind === "card") {
      st.push([800, () => upd({ demo: { card: "tessellation" } })], [700, () => upd({ demo: finalDemo() })]);
    }
    tl.run(st, () => api.lock(false));
  }, [wrong]);
  /* a correction outlives its question: stop it and give the pad back when the question changes */
  useEffect(() => () => { tl.stop(); gateRef.current = false; api.lock(false); }, [ek]);

  const won = stage === "win" || stage === "idle";
  const view: any = S.demo || (won && !free && !warm ? finalDemo() : null);

  /* what the host and the agent read back (toolApi.getState): only what is on the bench */
  const showGap = !!((view && view.gap) || S.gaps) && !piece && kind !== "card";
  const showLap = !!((view && view.lap) || S.laps) && !piece && kind !== "card";
  api.share({
    tiles: tiles.length, gaps: showGap ? scan.nGap : null, overlaps: showLap ? scan.nLap : null,
    edgeTraced: showGap && S.wash >= 1, carried: S.laid, objects: piece ? pre + S.laid : 0, ticked: won ? n : 0, complete: stage === "idle",
    nudge: S.nudge ? "Set all three seats first." : "", shape: pickable ? lay : "",
  });

  /* ── drawing helpers (called, never mounted) ───────────────────────────────────────────────────────────────── */
  const ink = C.ink, quiet = mix(C.ink, C.panel, 0.55);
  const stepInk = shade(CONTENT.pointer, 0.25), okInk = shade(CONTENT.one, 0.25);
  /* one paint for every copy: the tray, the copy in the hand, the given ones and the laid ones (a coin is a silver disc) */
  const paintOf = (t: any) => (t.k === "disc" ? "url(#tbCoin)" : "url(#gHundred)");
  const thing = (k: string, cx: number, cy: number, r: number, key: any, lit?: boolean) => {
    const parts: any[] = [];
    if (lit) parts.push(<circle key="lit" cx={cx} cy={cy} r={r + 9} fill="none" stroke={okInk} strokeWidth={5} />);
    if (k === "marigold") {
      const col = CONTENT.ten, np = 8, pr = r * 0.42, ring = r * 0.54;
      let d = "";
      for (let i = 0; i < np; i++) { const a = (i / np) * Math.PI * 2, px = cx + Math.cos(a) * ring, py = cy + Math.sin(a) * ring;
        d += `M ${px - pr} ${py} a ${pr} ${pr} 0 1 0 ${2 * pr} 0 a ${pr} ${pr} 0 1 0 ${-2 * pr} 0 `; }
      parts.push(<path key="p" d={d} fill={col} stroke={shade(col, 0.35)} strokeWidth={1.5} />);
      parts.push(<circle key="c" cx={cx} cy={cy} r={r * 0.46} fill={shade(col, 0.3)} stroke={shade(col, 0.35)} strokeWidth={2} />);
    } else if (k === "cap") {
      /* a bottle cap at coin size: a flat disc with a fine crimped edge (24 teeth) and a lighter ring round its top */
      const col = CONTENT.pointer, teeth = 24;
      let d = "";
      for (let i = 0; i < teeth * 2; i++) { const a = (i / (teeth * 2)) * Math.PI * 2, rr = i % 2 ? r * 0.92 : r; d += (i ? "L " : "M ") + (cx + Math.cos(a) * rr) + " " + (cy + Math.sin(a) * rr) + " "; }
      parts.push(<path key="p" d={d + "Z"} fill={shade(col, 0.12)} stroke={shade(col, 0.45)} strokeWidth={1.5} strokeLinejoin="round" />);
      parts.push(<circle key="c" cx={cx} cy={cy} r={r * 0.74} fill={col} stroke={shade(col, 0.4)} strokeWidth={1.5} />);
      parts.push(<circle key="t" cx={cx} cy={cy} r={r * 0.6} fill="none" stroke={tint(col, 0.55)} strokeWidth={r * 0.12} />);
    } else if (k === "leaf") {
      parts.push(<path key="p" d={`M ${cx} ${cy - r} Q ${cx + r * 1.05} ${cy} ${cx} ${cy + r} Q ${cx - r * 1.05} ${cy} ${cx} ${cy - r} Z`} fill={CONTENT.one} stroke={shade(CONTENT.one, 0.3)} strokeWidth={2} />);
      parts.push(<path key="v" d={`M ${cx} ${cy - r * 0.7} V ${cy + r * 0.7}`} stroke={shade(CONTENT.one, 0.45)} strokeWidth={2.5} fill="none" />);
    } else if (k === "rose") {
      const col = shade(CONTENT.bead, 0.1);
      parts.push(<circle key="c" cx={cx} cy={cy} r={r} fill={col} stroke={shade(col, 0.3)} strokeWidth={2} />);
      parts.push(<path key="s" d={`M ${cx} ${cy - r * 0.55} a ${r * 0.55} ${r * 0.55} 0 1 1 ${-r * 0.55} ${r * 0.55} a ${r * 0.3} ${r * 0.3} 0 1 0 ${r * 0.3} ${-r * 0.3}`} fill="none" stroke={shade(col, 0.45)} strokeWidth={3} />);
    } else {
      /* a coin: a silver disc with a rim, a plain face and no value */
      parts.push(<circle key="c" cx={cx} cy={cy} r={r} fill="url(#tbCoin)" stroke="#6F7A82" strokeWidth={2.5} />);
      parts.push(<circle key="i" cx={cx} cy={cy} r={r * 0.78} fill="none" stroke="#8A949B" strokeWidth={Math.max(2, r * 0.08)} />);
    }
    return <g key={key}>{parts}</g>;
  };
  /* Gujarati letters draw smaller than Hindi at one size, so its key labels and word cards are set ~14% / 10% larger and its keys widened to match */
  const guK = lang === "gu" ? 35 : T.label, guC = lang === "gu" ? 44 : T.prompt, guM = lang === "gu" ? 31 : T.micro;
  const KEYLAB = (id: string) => (id === "lay" ? (sc.layLab || "Lay a copy") : id === "turn" ? "Turn" : id === "gaps" ? "Gap finder" : id === "laps" ? "Overlap finder" : id === "trace" ? "Trace" : id === "keep" ? "Keep it" : "Bracket");
  /* the five keys of Free play share one row: in Gujarati they are packed closer (less padding, a tighter letter width) so the row stays inside the bench's 1046 */
  const keyW = (id: string) => { const row5 = lang === "gu" && ids.length > 3; return Math.max(row5 ? 110 : 130, Math.round(tx(KEYLAB(id)).length * (lang === "en" ? 16 : lang === "hi" ? 19 : row5 ? 17 : 20) * (kfs / T.label) + (row5 ? 24 : 40))); };

  /* the keys at the foot: in a guide step only the one the step waits for; otherwise the scene's own */
  let ids: string[] = (sc.keys || []).filter((id: string) => id !== "lay" || rest > 0 || free);
  if (stage === "demo" || stage === "teach") ids = stepOn ? ids.filter((id) => id === stepOn) : [];
  /* the keys read at 40 (last bench); the five of Free play share one row, so they read at 32 */
  const kfs = ids.length > 3 ? guK : (lang === "gu" ? 44 : T.prompt);
  const kws = ids.map(keyW);
  const totW = kws.reduce((a: number, b: number) => a + b, 0) + 12 * Math.max(0, ids.length - 1);
  let kxp = BX + (BW_WIDE - totW) / 2;           /* the keys stand in the middle of the whole row, beside the picture as well as under the bench */
  const keyBoxes = ids.map((id, i) => { const b = { id, x: kxp, w: kws[i] }; kxp += kws[i] + 12; return b; });
  const keyOff = (id: string) => !canTap || (id === "lay" && rest <= 0) || (id === "turn" && S.laid < 1) || (id === "keep" && !tiles.length);

  /* the tray: seven shapes; a tap is live in Free play and in the guide step that asks for one, otherwise the tray only shows the question's shape */
  const trayLive = pickable && !busy && (free || (stage === "demo" && stepOn === "shape"));
  const trayId = pickable ? lay : (TRAY_OF[sc.lay] || "");
  const lookLive = (piece || free) && !busy && (stage === "ask" || free || (stage === "demo" && stepOn === "look"));

  /* the invite: one pulse, on the control the guide step waits for */
  let invite: any = null;
  if (stage === "demo" && stepOn && !busy) {
    if (stepOn === "seat" && fit) { const t = tileAt(lay, pre, sc.par, fit); invite = { x: BX + t.x + t.w / 2, y: BY + t.y + t.h / 2, w: 84, h: 84, rx: 42 }; }
    else if (stepOn === "shape") invite = { x: BX + 42, y: 42, w: 84, h: 84, rx: 14 };
    else if (stepOn === "look") invite = { x: GX + GW / 2, y: BY + 115, w: GW, h: 230, rx: 20 };
    else { const kb = keyBoxes.filter((b) => b.id === stepOn)[0]; if (kb) invite = { x: kb.x + kb.w / 2, y: KEY_Y + KEY_H / 2, w: kb.w, h: KEY_H, rx: RAD.key }; }
  }

  /* ── the picture ──────────────────────────────────────────────────────────────────────────────────────── */
  const dotsDef = (
    <defs>
      <pattern id="tbDots" width={40} height={40} patternUnits="userSpaceOnUse" x={BX} y={BY}><circle cx={20} cy={20} r={2.6} fill="#767676" /></pattern>
      <pattern id="tbHatchOk" width={14} height={14} patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M 7 0 V 14" stroke={okInk} strokeWidth={5} /></pattern>
      <pattern id="tbHatch" width={16} height={16} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect x={0} y={0} width={16} height={16} fill="#FFFFFF" fillOpacity={0.6} />
        <path d="M 8 0 V 16" stroke={GAPC} strokeWidth={7} />
      </pattern>
      <radialGradient id="tbCoin" cx="35%" cy="30%" r="80%"><stop offset="0" stopColor="#F6F8F9" /><stop offset="1" stopColor="#AEB7BE" /></radialGradient>
      <clipPath id="tbWash"><rect x={0} y={BH * (1 - S.wash)} width={BWc} height={BH * S.wash + 1} /></clipPath>
      {/* the closed-in spaces, grown a little so the tiles painted over them leave the true gap and its smooth edge */}
      <clipPath id="tbGapNear">{scan.gaps.map((g: any, i: number) => <rect key={i} x={g.x - 6} y={g.y - 6} width={g.w + 12} height={g.h + 12} />)}</clipPath>
      {/* each tile a lap pair touches, to cut the hatch to the shared part */}
      {Array.from(new Set(lapPairs.reduce((a: number[], p: number[]) => a.concat(p), [])) as any).map((k: any) => <clipPath key={"c" + k} id={"tbT" + k}><path d={tilePath(tiles[k])} /></clipPath>)}
    </defs>
  );
  const benchRect = (
    <g>
      <rect x={BX} y={BY} width={BWc} height={BH} rx={RAD.panel} fill={C.paper} stroke={C.rule} strokeWidth={2} />
      <rect x={BX} y={BY} width={BWc} height={BH} rx={RAD.panel} fill="url(#tbDots)" />
    </g>
  );

  /* the dashed seat circle grows with the copies (a triangle row is drawn up to 3.5 times) */
  const seatR = fit ? Math.max(34, Math.min(48, Math.round((34 * fit.s) / 2.5))) : 34;
  /* the tiles, the finders and the correction */
  const tileArt = () => {
    const ghostTiles: any[] = (view && (view.ghosts || view.copies) ? (view.ghosts || view.copies) : []).map((g: any) => ({ ...tileAt(lay, g.i, sc.par, fit), f: g.f || undefined }));
    return (
      <g transform={`translate(${BX},${BY})`}>
        {/* the seats of the shape's lattice that are still empty, faint and dashed (Free play and the warm-up: a tap on one lays a copy there); the closed-in purple of a gap covers them */}
        {pickable && fit && <g pointerEvents="none">{Array.from({ length: Math.max(0, N - pre) }, (_, q) => pre + q).filter((i) => S.occ.indexOf(i) < 0).map((i) =>
          <path key={"es" + i} d={tilePath(tileAt(lay, i, sc.par, fit))} fill="none" stroke={ink} strokeOpacity={0.55} strokeWidth={3.5} strokeDasharray="9 7" strokeLinejoin="round" />)}</g>}
        {/* a gap: the closed-in spaces in a solid deeper purple UNDER the tiles, so the tiles' own outlines are the smooth edge of the true gap */}
        {showGap && <g clipPath="url(#tbWash)">{scan.gaps.map((g: any, i: number) => <rect key={"g" + i} x={g.x - 4} y={g.y - 4} width={g.w + 8} height={g.h + 8} fill={GAPC} />)}</g>}
        {tiles.map((t: any, i: number) => (
          <g key={"t" + i}>
            <path d={tilePath(t)} fill={paintOf(t)} stroke={ink} strokeWidth={t.seat ? 4.5 : 3.5} strokeLinejoin="round" opacity={kind === "place" && view && view.ghosts && t.seat && rightSeats().some((g: any) => g.i === pre + t.sj) ? 0.3 : 1} />
            {t.k === "disc" && <circle cx={t.x + t.w / 2} cy={t.y + t.h / 2} r={t.w * 0.39} fill="none" stroke="#8A949B" strokeWidth={Math.max(2, t.w * 0.03)} />}
            {t.split && <path d={`M ${t.x + t.w / 2} ${t.y} V ${t.y + t.h}`} stroke={ink} strokeWidth={3} fill="none" />}
            {pickable && t.own === "laid" && (() => {
              /* a small dot on one corner turns with the copy, so a turn of a square or a circle can be seen */
              const cx = t.x + t.w / 2, cy = t.y + t.h / 2, a = ((t.rot || 0) - 90) * Math.PI / 180, v = t.k === "disc" ? [cx + Math.cos(a) * t.w * 0.3, cy + Math.sin(a) * t.w * 0.3] : polyOf(t)[0];
              return <circle cx={t.k === "disc" ? v[0] : cx + (v[0] - cx) * 0.7} cy={t.k === "disc" ? v[1] : cy + (v[1] - cy) * 0.7} r={5} fill={ink} />;
            })()}
          </g>
        ))}
        {/* the outline of the patch, traced plain in near-black: the edges that face the open bench, so the bumps and notches are the edge and nothing is filled */}
        {showGap && S.wash >= 1 && outline && <path d={outline} fill="none" stroke={ink} strokeWidth={7} strokeLinecap="round" />}
        {/* the thin darker edge of the gap: the tile outlines, in deep purple, only where they bound a gap */}
        {showGap && scan.gaps.length > 0 && <g clipPath="url(#tbWash)"><g clipPath="url(#tbGapNear)">{tiles.map((t: any, i: number) => <path key={"ge" + i} d={tilePath(t)} fill="none" stroke={GAPE} strokeWidth={5} strokeLinejoin="round" />)}</g></g>}
        {/* an overlap: lines 7 wide in the same purple, cut to the shared part of each pair of tiles (the lines only; never a stair-step of cells) */}
        {showLap && lapPairs.map((p: number[], i: number) => <g key={"l" + i} clipPath={"url(#tbT" + p[0] + ")"}><g clipPath={"url(#tbT" + p[1] + ")"}><rect x={0} y={0} width={BWc} height={BH} fill="url(#tbHatch)" /></g></g>)}
        {/* the seats still waiting: a dashed circle, tapped to set a copy down and again to turn it; gone once the seat is filled */}
        {nseat > 0 && fit && [0, 1, 2].slice(0, nseat).map((j) => {
          const t = tileAt(lay, pre + j, sc.par, fit);
          return seatsNow[j] || (view && view.ghosts) ? null : <circle key={"sd" + j} cx={t.x + t.w / 2} cy={t.y + t.h / 2} r={seatR} fill="none" stroke={ink} strokeWidth={4} strokeDasharray="9 8" />;
        })}
        {/* the tenth triangle is the piece asked about: it waits as a dashed seat and Carry on never lays it */}
        {kind === "facing" && fit && !view && (() => { const t = tileAt(lay, N - 1, sc.par, fit);
          return <circle cx={t.x + t.w / 2} cy={t.y + t.h / 2} r={seatR} fill="none" stroke={ink} strokeWidth={4} strokeDasharray="9 8" />; })()}
        <g pointerEvents="none">
          {ghostTiles.map((t: any, i: number) => <path key={"gh" + i} d={tilePath(t)} fill={kind === "place" ? "url(#tbHatchOk)" : CONTENT.one} fillOpacity={kind === "place" ? 1 : 0.34} stroke={ink} strokeWidth={4} strokeDasharray="10 8" strokeLinejoin="round" />)}
          {view && view.tenth && fit && <path d={tilePath({ ...tileAt(lay, 9, sc.par, fit), f: "down" })} fill="none" stroke={okInk} strokeWidth={7} strokeLinejoin="round" />}
          {view && view.lit && kind === "count" && Array.from({ length: view.lit }).map((_, k) => {
            const t = tileAt("domino", Math.floor(k / 2), 0, fit), sz = t.h;
            return <rect key={"u" + k} x={t.x + (k % 2) * sz + 4} y={t.y + 4} width={sz - 8} height={sz - 8} rx={6} fill="none" stroke={okInk} strokeWidth={4} />;
          })}
          {((view && view.tr) || S.trN > 0) && sc.tr && (() => {
            const pts = trailOf("tr"), upto = view && view.tr ? pts.length : S.trN, shown = pts.slice(0, upto);
            if (shown.length < 1) return null;
            /* the pencil's dot rides the end of the line only while it is drawing; at rest nothing is left over but the line itself */
            return <g><path d={"M " + shown.map((p) => p[0] + " " + p[1]).join(" L ")} fill="none" stroke={stepInk} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
              {upto >= pts.length && pts.length > 1 && Math.hypot(pts[0][0] - pts[pts.length - 1][0], pts[0][1] - pts[pts.length - 1][1]) > 20 && (() => {
                const a = pts[pts.length - 2], b = pts[pts.length - 1], an = Math.atan2(b[1] - a[1], b[0] - a[0]), L = 22, c = Math.cos(an), sn = Math.sin(an);
                return <path d={`M ${b[0]} ${b[1]} L ${b[0] - c * L - sn * 12} ${b[1] - sn * L + c * 12} L ${b[0] - c * L + sn * 12} ${b[1] - sn * L - c * 12} Z`} fill={stepInk} stroke={stepInk} strokeWidth={3} strokeLinejoin="round" />; })()}
              {busy && !(view && view.tr) && upto < pts.length && <circle cx={shown[shown.length - 1][0]} cy={shown[shown.length - 1][1]} r={9} fill={stepInk} />}</g>;
          })()}
        </g>
      </g>
    );
  };

  /* the string (a toran, or coins and caps) and the rows */
  const thingsArt = () => {
    const shown = pre + S.laid;
    const lit = !!(view && view.lit);
    const rowsAll = kind === "rows" ? (view && view.row3 ? 15 : shown) : shown;
    const p = kind === "string" ? periodOf(sc.str) : 0;
    const hf = pitchOf(sc, BWc) / 2;
    const showBr = kind === "string" && (S.br || (view && view.br));
    const grp = (g: number, strong: boolean) => {
      const a = pieceAt(sc, g * p, BWc), b = pieceAt(sc, g * p + p - 1, BWc), x0 = a.x - hf, x1 = b.x + hf;
      return <path key={"br" + g} d={`M ${x0} 205 V 224 H ${x1} V 205`} fill="none" stroke={strong ? stepInk : okInk} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />;
    };
    const drawn = (S.brN > 0 && !showBr && kind === "string") ? walk([[pieceAt(sc, 0, BWc).x - hf, 205], [pieceAt(sc, 0, BWc).x - hf, 224], [pieceAt(sc, p - 1, BWc).x + hf, 224], [pieceAt(sc, p - 1, BWc).x + hf, 205]], 26).slice(0, S.brN) : [];
    return (
      <g transform={`translate(${BX},${BY})`}>
        {kind === "string" && <path d={`M 30 50 Q ${BWc / 2} 110 ${BWc - 30} 50`} fill="none" stroke={ink} strokeWidth={4} />}
        {Array.from({ length: sc.all }).map((_, i) => {
          const q = pieceAt(sc, i, BWc);
          if (i >= rowsAll) return kind === "rows" ? <circle key={"e" + i} cx={q.x} cy={q.y} r={q.r} fill="none" stroke={C.rule} strokeWidth={3} strokeDasharray="9 7" /> : null;
          return <g key={"p" + i}>
            {kind === "string" && <path d={`M ${q.x} ${q.y - q.r - 24} V ${q.y - q.r}`} stroke={ink} strokeWidth={2.5} fill="none" />}
            {thing(q.k, q.x, q.y, q.r, "th" + i, lit && q.k === sc.litk)}
          </g>;
        })}
        {showBr && Array.from({ length: sc.all / p }).map((_, g) => (g * p + p <= shown ? grp(g, g === 0) : null))}
        {drawn.length > 1 && <path d={"M " + drawn.map((q) => q[0] + " " + q[1]).join(" L ")} fill="none" stroke={stepInk} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />}
        {/* the legend: a plain cream strip across the foot of the bench (no bench dot behind or after a label), names at 40 */}
        {sc.leg && (() => {
          const nn = sc.leg.length, zw = (BWc - 40) / nn, fs = lang === "gu" ? 44 : T.prompt;
          return <g>
            <rect x={14} y={244} width={BWc - 28} height={66} rx={14} fill={tint(C.panel, 0.6)} stroke={C.rule} strokeWidth={2} />
            {sc.leg.map((k: string, j: number) => {
              const lab = tx(PNAME[k]), tw = lab.length * fs * 0.6, x0 = 20 + zw * j + (zw - (58 + tw)) / 2;
              return <g key={"lg" + j}>{thing(k, x0 + 23, 280, 23, "lgi" + j)}<text x={x0 + 58} y={284 + fs * 0.35} fontSize={fs} fontWeight={600} fill={ink}>{lab}</text></g>;
            })}
          </g>;
        })()}
      </g>
    );
  };

  /* the four word cards of the last question: words first, turned over to their meanings in the correction */
  const cardsArt = () => {
    const ids4 = Object.keys(CARD_MEANS), flip = !!(view && view.flip), pick = view && view.card;
    /* the grid sits in the middle of the bench with 24 clear all round and 20 between the cards; the cards are flat paper (they are not tapped) */
    const gm = 24, gg = 20, cw = (BWc - 2 * gm - gg) / 2, ch = (BH - 2 * gm - gg) / 2;
    return (
      <g transform={`translate(${BX},${BY})`}>
        {ids4.map((id, j) => {
          const x = gm + (j % 2) * (cw + gg), y = gm + Math.floor(j / 2) * (ch + gg), on = pick === id && !!(flip || (view && view.card));
          const word = item.choices.filter((c: any) => c.id === id)[0].label;
          return <g key={id}>
            <rect x={x} y={y} width={cw} height={ch} rx={RAD.panel} fill={tint(C.panel, 0.62)} stroke={on ? okInk : C.rule} strokeWidth={on ? 6 : 2} />
            <text x={x + cw / 2} y={flip ? y + ch / 2 - 6 : y + ch / 2 + 12} textAnchor="middle" fontSize={guC} fontWeight={700} fill={ink}>{tx(word)}</text>
            {flip && <text x={x + cw / 2} y={y + ch / 2 + 34} textAnchor="middle" fontSize={guM} fontWeight={500} fill={ink}>{tx(CARD_MEANS[id])}</text>}
          </g>;
        })}
      </g>
    );
  };

  /* the tray along the top: a tile of each shape, the one on the bench lit */
  const trayArt = () => (
    <g>
      {FREE_SHAPES.map((s, i) => {
        const base = seatOf(s.id, 0), sz = 52 / Math.max(base.w, base.h), cx = BX + 42 + i * 92, on = trayId === s.id;
        const tl0 = { ...base, x: cx - (base.w * sz) / 2, y: 42 - (base.h * sz) / 2, w: base.w * sz, h: base.h * sz, u: 40 * sz };
        const id = s.id === "sqr" && stepOn === "shape" ? "shape" : "shape-" + s.id;
        return <g key={s.id}>
          <rect x={cx - 42} y={0} width={84} height={84} rx={14} fill={on ? tint(CONTENT.hundred, 0.8) : "url(#gPanel)"} stroke={on ? okInk : C.rule} strokeWidth={on ? 5 : 2} />
          <path d={tilePath(tl0)} fill={paintOf(base)} stroke={ink} strokeWidth={3} strokeLinejoin="round" />
          {trayLive && <Hit id={id} label={tx(s.label)} x={cx - 42} y={0} w={84} h={84} onPress={() => childAct(s.id === "sqr" || stepOn !== "shape" ? "shape" : "shape-" + s.id, s.id)} enabled={canTap} />}
        </g>;
      })}
    </g>
  );

  /* the plate beside the tray: the shape on the bench and what the finders found (Free play and the warm-up), or the name a right answer / its correction gives;
     a question never shows the patch of the one before it (that gave an answer by analogy): comparing is Free play's Keep card only */
  const finders = (S.laps && S.gaps && S.wash >= 1);
  let plate: any = null;
  const PX = 660, PW = 406;
  if (pickable) {
    const nm = FREE_SHAPES.filter((s) => s.id === lay)[0].label, vd = finders && tiles.length ? verdictOf(scan.nGap, scan.nLap, lay, scan.nPiece) : "";
    plate = <g pointerEvents="none">
      <rect x={PX} y={4} width={PW} height={76} rx={16} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
      {vd ? <text x={PX + PW / 2} y={58} textAnchor="middle" fontSize={[T.prompt, 36, T.label, 28].filter((q) => tx(vd).length * q * (lang === "en" ? 0.56 : 0.62) <= PW - 30)[0] || 28} fontWeight={700} fill={ink}>{tx(vd)}</text>
        : <text x={PX + PW / 2} y={58} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={ink}>{tx(nm)}</text>}
    </g>;
  } else if (view && (view.badge || view.num !== undefined)) {
    const plateText = view.badge ? view.badge : null, plateNum = view.num !== undefined ? String(view.num) : null, pw = plateNum ? 200 : PW;
    plate = <g pointerEvents="none">
      <rect x={PX + PW - pw} y={8} width={pw} height={68} rx={16} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
      <text x={PX + PW - pw / 2} y={plateNum ? 63 : 58} textAnchor="middle" fontSize={plateNum ? T.xl : T.prompt} fontWeight={700} fill={ink}>{plateNum || tx(plateText)}</text>
    </g>;
  }

  /* the picture of the real thing round us, beside the bench: a few touching copies of the real tile, brick or rangoli (a plain shape under each Skin) on the left,
     the tessellation it matches drawn by the tool on the right; a tap on the card brings the next picture. In Free play the patch kept to compare sits under it. */
  const galArt = () => {
    /* the wall picture is narrower so the tessellation it matches can be drawn about three times larger; the name plate is tall enough for Devanagari */
    const ph = free ? 200 : 230, pix = GAL[S.look % GAL.length], bw = pix.id === "wall" ? 160 : 196, bh = ph - 76, cw = GW - bw - 18;
    const skinPic = () => {
      if (pix.id === "floor") { const sd = Math.min(bw / 2, bh / 2) - 2; return [0, 1, 2, 3].map((i) => { const x = 6 + (bw - 2 * sd) / 2 + (i % 2) * sd, y = 6 + (bh - 2 * sd) / 2 + Math.floor(i / 2) * sd;
        return <g key={i}><rect x={GX + x} y={BY + y} width={sd} height={sd} fill={tint(CONTENT.ten, 0.55)} /><Skin name="floor" x={GX + x} y={BY + y} w={sd} h={sd} fit="stretch" /><rect x={GX + x} y={BY + y} width={sd} height={sd} fill="none" stroke={ink} strokeWidth={3} /></g>; }); }
      if (pix.id === "wall") { const kw = Math.min(bw / 2.5, (bh / 3) / 0.545), kh = kw * 0.545, y0 = 6 + (bh - 3 * kh) / 2, x0 = 6 + (bw - 2.5 * kw) / 2;
        return [0, 1, 2, 3, 4, 5].map((i) => { const r = Math.floor(i / 2), x = x0 + (i % 2) * kw + (r % 2) * (kw / 2), y = y0 + r * kh;
          return <g key={i}><rect x={GX + x} y={BY + y} width={kw} height={kh} fill={tint(CONTENT.pointer, 0.5)} /><Skin name="wall" x={GX + x} y={BY + y} w={kw} h={kh} fit="stretch" /><rect x={GX + x} y={BY + y} width={kw} height={kh} fill="none" stroke={ink} strokeWidth={3} /></g>; }); }
      const d = Math.min(bw, bh) - 4, x = 6 + (bw - d) / 2, y = 6 + (bh - d) / 2;
      return <g><circle cx={GX + x + d / 2} cy={BY + y + d / 2} r={d / 2} fill={tint(CONTENT.ten, 0.6)} stroke={ink} strokeWidth={3} /><Skin name="rangoli" x={GX + x} y={BY + y} w={d} h={d} /></g>;
    };
    const match = pix.id === "wall" ? [0, 1, 4, 5, 8, 9].map((i) => seatOf("brick", i, 0)) : pix.n ? Array.from({ length: pix.n }, (_, i) => seatOf(pix.lay, i, 0)) : [];
    return (
      <g>
        <rect x={GX} y={BY} width={GW} height={ph} rx={RAD.panel} fill={C.paper} stroke={C.rule} strokeWidth={2} />
        {skinPic()}
        {match.length > 0 && <g pointerEvents="none">{miniPatch(match, 0, GX + bw + 12, BY + 40, cw - 12, bh - 42, "match")}</g>}
        <rect x={GX + 6} y={BY + ph - 66} width={GW - 12} height={60} rx={10} fill={C.panel} fillOpacity={0.9} />
        <text x={GX + GW / 2} y={BY + ph - 15} textAnchor="middle" fontSize={lang === "hi" ? 36 : guC} fontWeight={700} fill={ink}>{tx(pix.label)}</text>
        {GAL.map((g, j) => <circle key={g.id} cx={GX + GW - 24 - (GAL.length - 1 - j) * 26} cy={BY + 20} r={8} fill={j === S.look % GAL.length ? okInk : C.rule} />)}
        {lookLive && <Hit id={stepOn === "look" ? "look" : "look-next"} label={tx(pix.label)} x={GX} y={BY} w={GW} h={ph} onPress={() => childAct("look", 0)} enabled={canTap} />}
        {free && (() => {
          const ky = BY + ph + 8, kh = BY + BH - ky;
          return <g pointerEvents="none">
            <rect x={GX} y={ky} width={GW} height={kh} rx={14} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
            {CMP && CMP.n === "free" ? <g>
              {miniPatch(CMP.tiles, CMP.bw, GX + 10, ky + 8, 110, kh - 16, "kept")}
              <text x={GX + 134} y={ky + kh / 2 - 6} fontSize={T.micro} fontWeight={600} fill={ink}>{tx("Kept")}</text>
              <text x={GX + 134} y={ky + kh / 2 + 28} fontSize={T.micro} fontWeight={700} fill={ink}>{tx(SHORT_OF[CMP.line])}</text>
            </g> : <text x={GX + GW / 2} y={ky + kh / 2 + 10} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={mix(C.ink, C.panel, 0.1)}>{tx("Keep one to compare")}</text>}
          </g>;
        })()}
      </g>
    );
  };

  /* the seat controls: 72 x 72 taps centred on each seat */
  const seatHits = (nseat > 0 && fit) ? [0, 1, 2].slice(0, nseat).map((j) => {
    const t = tileAt(lay, pre + j, sc.par, fit);
    return <Hit key={"seat" + j} id={"seat-" + (j + 1)} label={tx("Seat") + " " + (j + 1)} x={BX + t.x + t.w / 2 - 36} y={BY + t.y + t.h / 2 - 36} w={72} h={72} onPress={() => childAct("seat", j)} enabled={canTap} />;
  }) : null;

  /* ARRANGE (Free play, and the warm-up steps that lay and turn): a tap on an empty seat of the lattice lays a copy there, a tap on any laid copy turns it by one step of its shape;
     one 72 x 72 tap on each seat, the centres 72 or more apart (`fitOf` tight). A graded question never has them. */
  const arrangeHits = (pickable && fit && !busy && (free || (stage === "demo" && (stepOn === "lay" || stepOn === "turn"))))
    ? Array.from({ length: Math.max(0, N - pre) }, (_, q) => pre + q).map((i) => {
      const t = tileAt(lay, i, sc.par, fit), k = S.occ.indexOf(i), cx = BX + t.x + t.w / 2, cy = BY + t.y + t.h / 2;
      return k < 0
        ? <Hit key={"seat" + i} id={"put-" + i} label={tx("Seat") + " " + (i + 1)} x={cx - 36} y={cy - 36} w={72} h={72} onPress={() => childAct("put", i)} enabled={canTap} />
        : <Hit key={"seat" + i} id={"spin-" + i} label={tx("Turn") + " " + (i + 1)} x={cx - 36} y={cy - 36} w={72} h={72} onPress={() => childAct("spin", k)} enabled={canTap} />;
    }) : null;

  return (
    <g>
      <g>
        {dotsDef}
        {trayArt()}
        {plate}
        {benchRect}
        {kind === "card" ? cardsArt() : piece ? thingsArt() : tileArt()}
        {narrow && galArt()}
        {seatHits}
        {arrangeHits}
        {keyBoxes.map((b) => (
          <Key key={b.id} id={b.id} label={tx(KEYLAB(b.id))} x={b.x} y={KEY_Y} w={b.w} h={KEY_H} C={C}
            disabled={keyOff(b.id)} onClick={() => childAct(b.id)}>
            <text textAnchor="middle" y={Math.round(kfs * 0.36)} fontSize={kfs} fontWeight={700} fill={keyOff(b.id) ? quiet : ink}>{tx(KEYLAB(b.id))}</text>
          </Key>
        ))}
        {invite && <Invite x={invite.x} y={invite.y} w={invite.w} h={invite.h} rx={invite.rx} C={C} />}
      </g>
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: a few tiles and what was answered */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last ? result.last : null;
  if (!last) return null;
  const item = it || (PHASES[(n || 1) - 1] && PHASES[(n || 1) - 1].items[last.item]) || {};
  const v = last.value;
  let label = String(v);
  if (item.choices) { const c = item.choices.filter((x: any) => x.id === v)[0]; if (c) label = c.label; }
  else if (item.pad === "enter") label = item.badge || label;
  if (n === 1) label = "No gaps";                        /* phase 1's picture is the lesson itself: copies side by side with nothing left over */
  const lay = item.lay || "blk", base = [0, 1, 2].map((i) => seatOf(lay === "domino" ? "sqr" : lay === "ring" ? "blk" : lay, i, 0));
  const ts = Math.max(20, Math.min(h * 0.4, (w - 24) / 3.7)), sz = ts / Math.max(base[0].w, base[0].h);   /* the picture fills about half the card */
  /* phase 4 ends on the word "tessellation": its picture is a little wall of touching bricks, not three loose squares like phase 1's */
  const wall = n === 4 && item.kind === "card";
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {n === 1 ? [0, 1, 2].map((i) => <rect key={i} x={12 + i * ts} y={4} width={ts} height={ts} fill={CONTENT.hundred} fillOpacity={0.3} stroke={shade(CONTENT.hundred, 0.25)} strokeWidth={1.5} />)
        : wall ? [0, 1].map((r) => [0, 1, 2].map((c) => <rect key={r + "_" + c} x={12 + c * ts + r * ts * 0.5} y={4 + r * ts * 0.5} width={ts} height={ts * 0.5} fill={CONTENT.hundred} fillOpacity={0.3} stroke={shade(CONTENT.hundred, 0.25)} strokeWidth={1.5} />))
        : base.map((t: any, i: number) => <path key={i} d={tilePath({ ...t, x: 12 + i * ts * 1.3 + (ts - t.w * sz) / 2, y: 4 + (ts - t.h * sz) / 2, w: t.w * sz, h: t.h * sz, u: 40 * sz })} fill={CONTENT.hundred} fillOpacity={0.3} stroke={shade(CONTENT.hundred, 0.25)} strokeWidth={1.5} />)}
      <text x={w - 12} y={h - 8} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(label)}</text>
    </g>
  );
}

function TileBench(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b): the working area is the whole card until the child taps Answer */
      board: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d, PATTERNS.md §16): no question bar, only the blinking key at the top right; the question lives only in the bubble */
      keyOnly: true,
      /* the standard panel (PATTERNS.md 9g, `bigPad: false`): the bench is laid out once for the 1086 the area has with the keypad open, and keeps that size and place when it is shut */
      bigPad: false,
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself */
      nextKey: true,
      /* NAV DOTS (the new look; LAYOUT.md §1d): one small clickable dot per phase */
      navDots: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key */
      StartArt, START_HOOK,
      }} />
  );
}

export default TileBench;
