/* ═══ M2.S4.T7.C30.2D1 · tile_bench · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, answer panel, bubble + mascot,
   phase dots, window.toolApi, the sound effects, the printed bubble, scoring, the events, idle and restart.
   THE LESSON IS SILENT (runtime r30): every line is printed on the bubble. The lesson is action-driven: nothing moves
   on unless the child acts. THE NEW LOOK (docs/LAYOUT.md §1d-§1e, docs/PATTERNS.md §15-§16): no question bar, four phase dots,
   a one-sentence bubble, every act performed on screen (api.act).
   NO imports in this file; only the five host hooks.
   Every English line the tool prints, in its data or drawn by Work (tx("...")), has a Hindi and a Gujarati entry in TR
   once the English is final. Edit, never rewrite. */

const TOOL_ID = "tile_bench";
const MEDIA_ID = "M2.S4.T7.C30.2D1";
const TOOL_NAME = "Tile Bench";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (not shown when phase 1 has steps) */
const OPENING = ["A bench of dotted paper and a tray of shapes. Lay the first copy down."];
/* the whole-tool line (kept for the sidecar; the summary page no longer shows it) */
const FINISH_LINE = "Every patch tested for gaps and for overlaps, and a pattern of your own laid out.";
/* printed when the child opens Free play; every control it names is on the free-play bench */
const FREE_LINE = "Free play. Pick a shape, lay copies to make a tessellation of your own, then test it.";

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
        <rect x={832} y={72} width={84} height={84} rx={8} fill="url(#gOne)" stroke={shade(CONTENT.one, 0.25)} strokeWidth={3} />
        <path d="M 1024 156 H 1108 L 1066 72 Z" fill="url(#gOne)" stroke={shade(CONTENT.one, 0.25)} strokeWidth={3} strokeLinejoin="round" />
        <path d="M 874 188 L 916 230 L 874 272 L 832 230 Z" fill="url(#gOne)" stroke={shade(CONTENT.one, 0.25)} strokeWidth={3} strokeLinejoin="round" />
        <circle cx={1066} cy={230} r={42} fill="url(#gOne)" stroke={shade(CONTENT.one, 0.25)} strokeWidth={3} />
      </g>
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line stays English, exactly as the checks read it; this table is keyed by
   that English, byte for byte. Filled after the English is final. */
const TR: any = {
  hi: {
    "Tile Bench": "टाइल बेंच",
    "A bench of dotted paper and a tray of shapes. Lay the first copy down.": "बिंदुओं वाले कागज़ की बेंच और आकृतियों की एक ट्रे। पहली टाइल रखो।",
    "Free play. Pick a shape, lay copies to make a tessellation of your own, then test it.": "मुक्त खेल। एक आकृति चुनो, टाइलें रखकर अपना टेसेलेशन बनाओ और उसे जाँचो।",
    "Can copies of one shape fit with no gaps and no overlaps?": "क्या एक आकृति की टाइलें बिना खाली जगह और ओवरलैप के बैठ सकती हैं?",
    "Copies that fit with no gaps": "बिना खाली जगह वाली टाइलें",
    "Lay the copies side by side. Is anything left uncovered? Is anything doubled?": "टाइलें साथ-साथ रखो। क्या कोई जगह खाली रह गई? क्या कोई हिस्सा दो बार ढका है?",
    "Tap Lay a copy to set the last square down.": "आखिरी वर्ग रखने के लिए “टाइल रखो” दबाओ।",
    "Tap the key at the bottom.": "नीचे वाला बटन दबाओ।",
    "Tap Gap finder to look for any space left over.": "कोई खाली जगह बची है, यह देखने के लिए खाली जगह खोजक दबाओ।",
    "Tap the Gap finder key.": "खाली जगह खोजक दबाओ।",
    "Tap Overlap finder to see if a copy lies over another.": "कोई टाइल दूसरी के ऊपर है, यह देखने के लिए ओवरलैप खोजक दबाओ।",
    "Tap the Overlap finder key.": "ओवरलैप खोजक दबाओ।",
    "Is any space left over, or any part covered twice?": "क्या कोई जगह बची है, या कोई हिस्सा दो बार ढका है?",
    "Run both finders: a tessellation leaves both of them empty.": "दोनों खोजक चलाओ: टेसेलेशन में दोनों खाली मिलते हैं।",
    "Copies of one shape tessellate with no gaps and no overlaps.": "एक आकृति की टाइलें बिना खाली जगह और ओवरलैप के टेसेलेशन बनाती हैं।",
    "You learned: no gaps and no overlaps makes a tessellation.": "तुमने सीखा: खाली जगह और ओवरलैप न हो, तो टेसेलेशन बनता है।",
    "This wall has each row moved half a brick: is it a tessellation?": "इस दीवार की हर कतार आधी ईंट खिसकी है: क्या यह टेसेलेशन है?",
    "Tessellation?": "टेसेलेशन?",
    "Look along each row to see whether a brick sits right against the next.": "हर कतार देखो: क्या हर ईंट अगली ईंट से सटी है?",
    "Yes, the bricks fit side by side with no space and no overlap.": "हाँ, ईंटें बिना जगह छोड़े और बिना ओवरलैप के साथ-साथ बैठी हैं।",
    "A tessellation": "टेसेलेशन है",
    "Yes": "हाँ",
    "No": "नहीं",
    "Round coins lie touching on a table: do they make a tessellation?": "गोल सिक्के मेज़ पर सटे रखे हैं: क्या ये टेसेलेशन बनाते हैं?",
    "Push the coins as close as you like and look between four of them.": "सिक्कों को जितना चाहो पास खिसकाओ और चार के बीच देखो।",
    "No, the coins leave a space between them, so circles cannot tessellate.": "नहीं, सिक्कों के बीच जगह बचती है, इसलिए वृत्तों से टेसेलेशन नहीं बनता।",
    "Not a tessellation": "टेसेलेशन नहीं",
    "Two squares lie half over each other with nothing uncovered: a tessellation?": "दो वर्ग आधे एक-दूसरे पर हैं, कुछ खाली नहीं: क्या यह टेसेलेशन है?",
    "Run the overlap finder over the pair and see if any part is covered twice.": "जोड़ी पर ओवरलैप खोजक चलाओ: क्या कोई हिस्सा दो बार ढका है?",
    "No, one tile lies over the other, so it is not a tessellation.": "नहीं, एक टाइल दूसरी के ऊपर है, इसलिए यह टेसेलेशन नहीं है।",
    "A gap or only the edge": "खाली जगह या सिर्फ़ किनारा",
    "Is this space closed in by tiles all round? Or is it where the tiling stops?": "क्या यह जगह चारों ओर से टाइलों से घिरी है? या यहीं टाइलें खत्म हो जाती हैं?",
    "Tap Gap finder and watch which spaces fill with colour.": "खाली जगह खोजक दबाओ और देखो कौन-सी जगहें रंग से भरती हैं।",
    "Tap Trace to follow a notch out to the open bench.": "खाँचे से खुली बेंच तक जाने के लिए “रास्ता खोजो” दबाओ।",
    "Tap the Trace key.": "“रास्ता खोजो” दबाओ।",
    "Can a finger run from it to the outside without crossing a tile?": "क्या उँगली टाइल पार किए बिना वहाँ से बाहर जा सकती है?",
    "Tap Trace and see whether the pencil gets out to the open bench.": "“रास्ता खोजो” दबाओ और देखो पेंसिल खुली बेंच तक पहुँचती है या नहीं।",
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
    "Same way, no gap, no overlap; if the first is up, even places point down.": "उसी तरह, न खाली जगह, न ओवरलैप; पहला ऊपर हो तो सम स्थानों की नोक नीचे होती है।",
    "You learned: repeat the same shape the same way.": "तुमने सीखा: उसी आकृति को उसी तरह दोहराओ।",
    "The row goes up, down, up, so set the next three triangles the right way.": "कतार ऊपर, नीचे, ऊपर जाती है: अगले तीन त्रिभुज सही ओर रखो।",
    "Set them down": "इन्हें रखो",
    "Look at the copy just before it: which way does that one face?": "इससे ठीक पहले वाली टाइल देखो: वह किस ओर है?",
    "Each copy fits against the last when it is turned the right way.": "सही ओर घुमाने पर हर टाइल पिछली से ठीक बैठती है।",
    "Down, up, down": "नीचे, ऊपर, नीचे",
    "A row has four two-square dominoes: how many squares long with three more?": "कतार में दो-दो खाने के चार डोमिनो हैं: तीन और रखने पर कितने खाने लंबी होगी?",
    "Squares in all": "कुल खाने",
    "Count the squares on one domino, then count the dominoes.": "एक डोमिनो के खाने गिनो, फिर डोमिनो गिनो।",
    "Tap Carry on, then count every square in the row.": "“आगे बढ़ाओ” दबाओ, फिर कतार के सारे खाने गिनो।",
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
    "Make a pattern of your own. Which group comes round again?": "अपना एक पैटर्न बनाओ। कौन सा समूह बार-बार आता है?",
    "Tap Lay things to hang the next ones on the string.": "डोरी पर अगली चीज़ें लटकाने के लिए “चीज़ें रखो” दबाओ।",
    "Tap the Lay things key.": "“चीज़ें रखो” दबाओ।",
    "Tap Bracket to mark the group that comes round again.": "जो समूह बार-बार आता है उसे चिह्नित करने के लिए “ब्रैकेट” दबाओ।",
    "Tap the Bracket key.": "“ब्रैकेट” दबाओ।",
    "Which group of things comes round again?": "चीज़ों का कौन-सा समूह बार-बार आता है?",
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
    "Look down one column, coin then cap: what is third?": "एक स्तंभ में ऊपर से देखो, सिक्का फिर ढक्कन: तीसरा क्या है?",
    "Tap Lay things to carry the third row on, then count the coins.": "तीसरी कतार रखने के लिए “चीज़ें रखो” दबाओ, फिर सिक्के गिनो।",
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
    "Tile Bench": "ટાઇલ બેન્ચ",
    "A bench of dotted paper and a tray of shapes. Lay the first copy down.": "ટપકાંવાળા કાગળની બેન્ચ અને આકૃતિઓની એક ટ્રે. પહેલી ટાઇલ મૂકો.",
    "Free play. Pick a shape, lay copies to make a tessellation of your own, then test it.": "મુક્ત રમત. એક આકૃતિ પસંદ કરો, ટાઇલો મૂકીને તમારું ટેસેલેશન બનાવો અને તપાસો.",
    "Can copies of one shape fit with no gaps and no overlaps?": "શું એક આકૃતિની ટાઇલો ખાલી જગ્યા અને ઓવરલેપ વગર બેસી શકે?",
    "Copies that fit with no gaps": "ખાલી જગ્યા વગરની ટાઇલો",
    "Lay the copies side by side. Is anything left uncovered? Is anything doubled?": "ટાઇલો બાજુ બાજુમાં મૂકો. શું કોઈ જગ્યા ખાલી રહી? શું કોઈ ભાગ બે વાર ઢંકાયો?",
    "Tap Lay a copy to set the last square down.": "છેલ્લો ચોરસ મૂકવા “ટાઇલ મૂકો” દબાવો.",
    "Tap the key at the bottom.": "નીચેનું બટન દબાવો.",
    "Tap Gap finder to look for any space left over.": "કોઈ ખાલી જગ્યા બચી છે કે નહીં તે જોવા ખાલી જગ્યા શોધક દબાવો.",
    "Tap the Gap finder key.": "ખાલી જગ્યા શોધક દબાવો.",
    "Tap Overlap finder to see if a copy lies over another.": "કોઈ ટાઇલ બીજી ઉપર છે કે નહીં તે જોવા ઓવરલેપ શોધક દબાવો.",
    "Tap the Overlap finder key.": "ઓવરલેપ શોધક દબાવો.",
    "Is any space left over, or any part covered twice?": "શું કોઈ જગ્યા બચી છે, કે કોઈ ભાગ બે વાર ઢંકાયો છે?",
    "Run both finders: a tessellation leaves both of them empty.": "બંને શોધક ચલાવો: ટેસેલેશનમાં બંને ખાલી મળે છે.",
    "Copies of one shape tessellate with no gaps and no overlaps.": "એક આકૃતિની ટાઇલો ખાલી જગ્યા અને ઓવરલેપ વગર ટેસેલેશન બનાવે છે.",
    "You learned: no gaps and no overlaps makes a tessellation.": "તમે શીખ્યા: ખાલી જગ્યા અને ઓવરલેપ ન હોય તો ટેસેલેશન બને.",
    "This wall has each row moved half a brick: is it a tessellation?": "આ દીવાલની દરેક હરોળ અડધી ઇંટ ખસેલી છે: શું આ ટેસેલેશન છે?",
    "Tessellation?": "ટેસેલેશન?",
    "Look along each row to see whether a brick sits right against the next.": "દરેક હરોળ જુઓ: શું દરેક ઇંટ બાજુની ઇંટને અડીને છે?",
    "Yes, the bricks fit side by side with no space and no overlap.": "હા, ઇંટો જગ્યા છોડ્યા વગર અને ઓવરલેપ વગર બાજુ બાજુમાં બેઠી છે.",
    "A tessellation": "ટેસેલેશન છે",
    "Yes": "હા",
    "No": "ના",
    "Round coins lie touching on a table: do they make a tessellation?": "ગોળ સિક્કા ટેબલ પર અડીને પડ્યા છે: શું તે ટેસેલેશન બનાવે છે?",
    "Push the coins as close as you like and look between four of them.": "સિક્કાને ગમે તેટલા નજીક ખસેડો અને ચારની વચ્ચે જુઓ.",
    "No, the coins leave a space between them, so circles cannot tessellate.": "ના, સિક્કા વચ્ચે જગ્યા બચે છે, તેથી વર્તુળોથી ટેસેલેશન બનતું નથી.",
    "Not a tessellation": "ટેસેલેશન નથી",
    "Two squares lie half over each other with nothing uncovered: a tessellation?": "બે ચોરસ અડધા એકબીજા પર છે, કંઈ ખાલી નથી: શું આ ટેસેલેશન છે?",
    "Run the overlap finder over the pair and see if any part is covered twice.": "જોડી પર ઓવરલેપ શોધક ચલાવો: શું કોઈ ભાગ બે વાર ઢંકાયો છે?",
    "No, one tile lies over the other, so it is not a tessellation.": "ના, એક ટાઇલ બીજી ઉપર છે, તેથી આ ટેસેલેશન નથી.",
    "A gap or only the edge": "ખાલી જગ્યા કે ફક્ત કિનારો",
    "Is this space closed in by tiles all round? Or is it where the tiling stops?": "શું આ જગ્યા ચારે બાજુ ટાઇલોથી ઘેરાયેલી છે? કે અહીં ટાઇલો પૂરી થાય છે?",
    "Tap Gap finder and watch which spaces fill with colour.": "ખાલી જગ્યા શોધક દબાવો અને જુઓ કઈ જગ્યાઓ રંગથી ભરાય છે.",
    "Tap Trace to follow a notch out to the open bench.": "ખાંચામાંથી ખુલ્લી બેન્ચ સુધી જવા “રસ્તો શોધો” દબાવો.",
    "Tap the Trace key.": "“રસ્તો શોધો” દબાવો.",
    "Can a finger run from it to the outside without crossing a tile?": "શું આંગળી ટાઇલ પાર કર્યા વગર ત્યાંથી બહાર જઈ શકે?",
    "Tap Trace and see whether the pencil gets out to the open bench.": "“રસ્તો શોધો” દબાવો અને જુઓ પેન્સિલ ખુલ્લી બેન્ચ સુધી પહોંચે છે કે નહીં.",
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
    "Same way, no gap, no overlap; if the first is up, even places point down.": "એ જ રીતે, ન ખાલી જગ્યા, ન ઓવરલેપ; પહેલો ઉપર હોય તો બેકી સ્થાનની ટોચ નીચે હોય.",
    "You learned: repeat the same shape the same way.": "તમે શીખ્યા: એ જ આકૃતિને એ જ રીતે દોહરાવો.",
    "The row goes up, down, up, so set the next three triangles the right way.": "હરોળ ઉપર, નીચે, ઉપર જાય છે: આગળના ત્રણ ત્રિકોણ સાચી તરફ મૂકો.",
    "Set them down": "તેમને મૂકો",
    "Look at the copy just before it: which way does that one face?": "તેની તરત પહેલાંની ટાઇલ જુઓ: તે કઈ તરફ છે?",
    "Each copy fits against the last when it is turned the right way.": "સાચી તરફ ફેરવતાં દરેક ટાઇલ પાછલી સાથે બરાબર બેસે છે.",
    "Down, up, down": "નીચે, ઉપર, નીચે",
    "A row has four two-square dominoes: how many squares long with three more?": "હરોળમાં બે-બે ખાનાંના ચાર ડોમિનો છે: ત્રણ વધુ મૂકતાં કેટલા ખાનાં લાંબી થશે?",
    "Squares in all": "કુલ ખાનાં",
    "Count the squares on one domino, then count the dominoes.": "એક ડોમિનોના ખાનાં ગણો, પછી ડોમિનો ગણો.",
    "Tap Carry on, then count every square in the row.": "“આગળ વધારો” દબાવો, પછી હરોળના બધાં ખાનાં ગણો.",
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
    "Make a pattern of your own. Which group comes round again?": "તમારી પોતાની એક પેટર્ન બનાવો. કયો સમૂહ ફરી ફરી આવે છે?",
    "Tap Lay things to hang the next ones on the string.": "દોરી પર આગળની વસ્તુઓ લટકાવવા “વસ્તુઓ મૂકો” દબાવો.",
    "Tap the Lay things key.": "“વસ્તુઓ મૂકો” દબાવો.",
    "Tap Bracket to mark the group that comes round again.": "જે સમૂહ ફરી ફરી આવે છે તેને ચિહ્નિત કરવા “બ્રેકેટ” દબાવો.",
    "Tap the Bracket key.": "“બ્રેકેટ” દબાવો.",
    "Which group of things comes round again?": "વસ્તુઓનો કયો સમૂહ ફરી ફરી આવે છે?",
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
    "Look down one column, coin then cap: what is third?": "એક સ્તંભમાં ઉપરથી જુઓ, સિક્કો પછી ઢાંકણ: ત્રીજું શું છે?",
    "Tap Lay things to carry the third row on, then count the coins.": "ત્રીજી હરોળ મૂકવા “વસ્તુઓ મૂકો” દબાવો, પછી સિક્કા ગણો.",
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
    says: ["Lay the copies side by side. Is anything left uncovered? Is anything doubled?"],
    steps: [
      { say: "Tap Lay a copy to set the last square down.", on: "lay", hint: "Tap the key at the bottom." },
      { say: "Tap Gap finder to look for any space left over.", on: "gaps", hint: "Tap the Gap finder key." },
      { say: "Tap Overlap finder to see if a copy lies over another.", on: "laps", hint: "Tap the Overlap finder key." },
    ],
    ladder: ["Is any space left over, or any part covered twice?", "Run both finders: a tessellation leaves both of them empty."],
    closing: "Copies of one shape tessellate with no gaps and no overlaps.",
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
        miss: "Push the coins as close as you like and look between four of them.",
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
    ladder: ["Can a finger run from it to the outside without crossing a tile?", "Tap Trace and see whether the pencil gets out to the open bench."],
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
        tr: [[50, 80], [0, 80], [-30, 80]],
        say: "Are the saw teeth of these diamonds gaps, or only the edge?",
        ask: "Gap or edge?", answer: "edge", near: "gap", choices: GE,
        miss: "Look at one tooth: are there tiles on every side of it?",
        win: "Only the edge, because every tooth opens out to the bench." },
      /* practice 4: answer in the plan = A gap, because circles close round it on every side */
      { qid: "M2.S4.T7.C31:4", kind: "space", lay: "coin", pre: 18, all: 18, keys: ["gaps", "trace"], badge: "A gap",
        tr: [[80, 68], [92, 80], [80, 92], [68, 80], [80, 68], [92, 80]],
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
    closing: "Same way, no gap, no overlap; if the first is up, even places point down.",
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
    says: ["Make a pattern of your own. Which group comes round again?"],
    steps: [
      { say: "Tap Lay things to hang the next ones on the string.", on: "lay", hint: "Tap the Lay things key." },
      { say: "Tap Bracket to mark the group that comes round again.", on: "bracket", hint: "Tap the Bracket key." },
    ],
    ladder: ["Which group of things comes round again?", "Read the string from the start and watch for the first thing that returns."],
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
        miss: "Look down one column, coin then cap: what is third?",
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
  1: { kind: "warm", lay: "blk", pre: 3, all: 4, keys: ["lay", "gaps", "laps"] },
  2: { kind: "warm", lay: "ring", pre: 9, all: 9, keys: ["gaps", "trace"], tr: [[245, 120], [300, 120], [360, 120]] },
  3: { kind: "warm", lay: "tri", par: 1, pre: 2, all: 3, nseat: 1, keys: [] },
  4: { kind: "string", pre: 3, all: 9, keys: ["lay", "bracket"], layLab: "Lay things", leg: ["coin", "cap"], str: ["coin", "cap", "cap", "coin", "cap", "cap", "coin", "cap", "cap"] },
};
const CARD_MEANS: any = { pattern: "Numbers that follow a rule", series: "A list in order", code: "Read with a key", tessellation: "No gaps, no overlaps" };
const PNAME: any = { marigold: "Marigold", leaf: "Leaf", rose: "Rose", coin: "Coin", cap: "Cap" };
const FREE_SHAPES = [{ id: "sqr", label: "Square" }, { id: "brick", label: "Brick" }, { id: "tri", label: "Triangle" }, { id: "dia", label: "Diamond" }, { id: "coin", label: "Circle" }, { id: "ell", label: "L shape" }];
const LAY_MAX: any = { sqr: 8, brick: 12, tri: 13, dia: 20, coin: 12, ell: 20 };

/* ── the bench, in working-area units (the area is drawn 900 wide; shut, it is centred) ───────────── */
const BW = 860, BH = 320, BX = 20, BY = 100, KEY_Y = 432, KEY_H = 72;
const CELL = 8;                      /* the finders read the bench on a lattice this fine */

/* the numbers, rows, sizes and targets the working area needs (they go into the sidecar too) */
const MODEL = { bench: { w: BW, h: BH }, cell: CELL, dot: 40, free: LAY_MAX, toran: PHASES[3].items[0].str, cards: Object.keys(CARD_MEANS) };

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
    default: return { k: "tri", x: i * 40, y: 0, w: 80, h: 80, f: (i + (par || 0)) % 2 ? "down" : "up" };
  }
};
/* the scale and the corner that put the whole tiling (every seat it will ever use) in the middle of the bench */
const fitOf = (lay: string, n: number, par?: number) => {
  let x1 = 1, y1 = 1;
  for (let i = 0; i < n; i++) { const t = seatOf(lay, i, par); x1 = Math.max(x1, t.x + t.w); y1 = Math.max(y1, t.y + t.h); }
  const s = Math.floor(Math.min(780 / x1, 280 / y1, 2.5) * 8) / 8;
  return { s, x: (BW - x1 * s) / 2, y: (BH - y1 * s) / 2 };
};
const tileAt = (lay: string, i: number, par: number | undefined, f: any) => {
  const t = seatOf(lay, i, par);
  return { ...t, x: f.x + t.x * f.s, y: f.y + t.y * f.s, w: t.w * f.s, h: t.h * f.s, u: (t.u || 40) * f.s };
};
/* one tile as an SVG path: the same outline the finders read */
const tilePath = (t: any) => {
  if (t.k === "rect") return `M ${t.x} ${t.y} H ${t.x + t.w} V ${t.y + t.h} H ${t.x} Z`;
  if (t.k === "dia") { const cx = t.x + t.w / 2, cy = t.y + t.h / 2, a = t.w / 2; return `M ${cx} ${cy - a} L ${cx + a} ${cy} L ${cx} ${cy + a} L ${cx - a} ${cy} Z`; }
  if (t.k === "ell") { const u = t.u, x = t.x, y = t.y;
    return t.f === "b" ? `M ${x + u} ${y} H ${x + 3 * u} V ${y + 2 * u} H ${x + 2 * u} V ${y + u} H ${x + u} Z`
      : `M ${x} ${y} H ${x + u} V ${y + u} H ${x + 2 * u} V ${y + 2 * u} H ${x} Z`; }
  if (t.k === "tri") { const a = t.x, b = t.x + t.w, m = t.x + t.w / 2;
    return t.f === "down" ? `M ${a} ${t.y} H ${b} L ${m} ${t.y + t.h} Z` : `M ${a} ${t.y + t.h} H ${b} L ${m} ${t.y} Z`; }
  const cx = t.x + t.w / 2, cy = t.y + t.h / 2, r = t.w / 2;
  return `M ${cx - r} ${cy} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0 Z`;
};
const inTile = (t: any, px: number, py: number) => {
  if (t.k === "rect") return px >= t.x && px < t.x + t.w && py >= t.y && py < t.y + t.h;
  if (t.k === "ell") { const u = t.u, x = t.x, y = t.y;
    return t.f === "b" ? ((px >= x + u && px < x + 3 * u && py >= y && py < y + u) || (px >= x + 2 * u && px < x + 3 * u && py >= y + u && py < y + 2 * u))
      : ((px >= x && px < x + u && py >= y && py < y + 2 * u) || (px >= x + u && px < x + 2 * u && py >= y + u && py < y + 2 * u)); }
  if (t.k === "disc") { const dx = px - (t.x + t.w / 2), dy = py - (t.y + t.h / 2); return dx * dx + dy * dy <= (t.w / 2) * (t.w / 2); }
  if (t.k === "dia") { const a = t.w / 2; return Math.abs(px - (t.x + a)) / a + Math.abs(py - (t.y + a)) / a <= 1; }
  if (py < t.y || py >= t.y + t.h) return false;
  const up = t.f !== "down", g = up ? (py - t.y) / t.h : 1 - (py - t.y) / t.h;
  return Math.abs(px - (t.x + t.w / 2)) <= g * (t.w / 2);
};
/* the two finders, measured: every space with tiles closed round it on every side, and every part covered more than once.
   The lattice is sampled off the whole numbers, so a shared edge is never read as a doubled part. */
const scanBench = (tiles: any[]) => {
  const cols = Math.ceil(BW / CELL), rows = Math.ceil(BH / CELL);
  const cnt = new Uint8Array(cols * rows);
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const px = i * CELL + 3.7, py = j * CELL + 4.1;
    let c = 0;
    for (let k = 0; k < tiles.length && c < 2; k++) if (inTile(tiles[k], px, py)) c++;
    cnt[j * cols + i] = c;
  }
  const out = new Uint8Array(cols * rows), stack: number[] = [];
  const open = (i: number, j: number) => { const p = j * cols + i; if (i < 0 || j < 0 || i >= cols || j >= rows || out[p] || cnt[p]) return; out[p] = 1; stack.push(p); };
  for (let i = 0; i < cols; i++) { open(i, 0); open(i, rows - 1); }
  for (let j = 0; j < rows; j++) { open(0, j); open(cols - 1, j); }
  while (stack.length) { const p = stack.pop() as number, i = p % cols, j = (p - i) / cols; open(i - 1, j); open(i + 1, j); open(i, j - 1); open(i, j + 1); }
  const runs = (pick: (p: number) => boolean) => {
    const r: any[] = [];
    for (let j = 0; j < rows; j++) { let s = -1;
      for (let i = 0; i <= cols; i++) { const on = i < cols && pick(j * cols + i);
        if (on && s < 0) s = i;
        else if (!on && s >= 0) { r.push({ x: s * CELL, y: j * CELL, w: (i - s) * CELL, h: CELL }); s = -1; } } }
    return r;
  };
  const gaps = runs((p) => cnt[p] === 0 && !out[p]);
  const laps = runs((p) => cnt[p] > 1);
  return { gaps, laps, nGap: gaps.length, nLap: laps.length };
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
/* the things of the last phase (a string and rows), in bench units */
const pieceAt = (sc: any, i: number) => {
  if (sc.kind === "rows") return { x: 150 + (i % 5) * 140, y: 50 + Math.floor(i / 5) * 80, k: (Math.floor(i / 5) + (i % 5)) % 2 ? "cap" : "coin", r: 30 };
  const x = (BW - (sc.all - 1) * 66) / 2 + i * 66, t = (x - 30) / 800;
  return { x, y: 50 + 120 * t * (1 - t) + 52, k: sc.str[i], r: 30 };
};
const periodOf = (str: string[]) => { for (let p = 1; p < str.length; p++) if (str.length % p === 0 && str.every((k, i) => k === str[i % p])) return p; return str.length; };

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

/* ── the working area ────────────────────────────────────────────────────────────────────────
   Drawn for the OPEN width (900); shut, the picture is centred and clear of the key's corner (box.key). Bench 860 x 320 at
   (20,100); a top band (tray of loose copies on the left, the plate that names a verdict on the right); the action keys at the
   foot. The question is only in the bubble. Every act goes through api.act. */
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
  const fresh = () => ({ ek, laid: 0, gaps: false, laps: false, wash: 1, trN: 0, seats: [null, null, null], brN: 0, br: false, shape: "sqr", demo: null });
  const [raw, setRaw] = useState<any>(() => fresh());
  const S: any = raw.ek === ek ? raw : fresh();
  const live = useRef(ek); live.current = ek;
  const upd = (patch: any) => { if (live.current !== ek) return; setRaw((p: any) => ({ ...(p.ek === ek ? p : fresh()), ...patch })); };
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false);

  const sc: any = free ? { kind: "free", keys: ["lay", "gaps", "laps"] } : warm ? WARM[n] : item;
  const kind = sc.kind;
  const piece = kind === "string" || kind === "rows";
  const lay = free ? S.shape : sc.lay;
  const N = free ? LAY_MAX[S.shape] : (sc.all || 0);
  const pre = free ? 0 : (sc.pre || 0);
  const layN = kind === "facing" ? N - 1 : N;                  /* Carry on stops one short of the tenth: the asked piece is never laid for the child */
  const rest = Math.max(0, layN - pre - S.laid);
  const nseat = sc.nseat || 0;
  const fit = useMemo(() => (lay ? fitOf(lay, N, sc.par) : null), [lay, N, sc.par]);

  /* Work coordinates of a point on the bench, for api.act (the picture is shifted by ox when the panel is shut) */
  const kx = box && box.key ? box.key.x - 12 : (box ? box.w : 1472);
  const ox = Math.max(0, Math.min(Math.round(((box ? box.w : 900) - 900) / 2), kx - 906));
  const WP = (x: number, y: number) => ({ x: ox + BX + x, y: BY + y });
  const trayPt = { x: ox + 60, y: 46 };

  const padEnter = !free && !warm && !!item && item.pad === "enter";
  const seatsKey = S.seats.join(",");
  const seatsDone = nseat === 3 && S.seats.slice(0, 3).every((v: any) => !!v);

  /* every tile standing on the bench: what the question gave, what the child laid, the seats the child turned */
  const tiles = useMemo(() => {
    const out: any[] = [];
    if (!lay || !fit) return out;
    const seats = kind === "place" || (warm && nseat > 0);
    for (let i = 0; i < pre; i++) out.push({ ...tileAt(lay, i, sc.par, fit), own: "given" });
    if (seats) { for (let j = 0; j < nseat; j++) if (S.seats[j]) out.push({ ...tileAt(lay, pre + j, sc.par, fit), f: S.seats[j], own: "laid" }); }
    else for (let i = pre; i < pre + S.laid; i++) out.push({ ...tileAt(lay, i, sc.par, fit), own: "laid" });
    return out;
  }, [lay, N, pre, S.laid, seatsKey, kind, warm, sc.par]);
  const scan = useMemo(() => scanBench(tiles), [tiles]);

  /* ── the acts: each one is performed on screen (api.act) and reacts only when it resolves true ───────────────── */
  const canTap = !busy && !tl.busy && (stage === "ask" || free || (stage === "demo" && !!stepOn));
  const runAct = async (spec: any, after: () => void) => {
    if (busyRef.current) return;
    busyRef.current = true; setBusy(true);
    const ok = await api.act(spec);
    busyRef.current = false; setBusy(false);
    if (ok) after();
  };
  const trailOf = (id: string) => { const r = sc.tr ? walk(sc.tr, 22) : []; return fit ? r.map((p) => [fit.x + p[0] * fit.s, fit.y + p[1] * fit.s]) : r; };
  const doLay = () => {
    if (rest <= 0) return;
    const take = free ? 1 : rest, first = pre + S.laid, pts: any[] = [];
    for (let j = 0; j < take; j++) {
      if (piece) { const p = pieceAt(sc, first + j); pts.push(WP(p.x, p.y)); }
      else { const t = tileAt(lay, first + j, sc.par, fit); pts.push(WP(t.x + t.w / 2, t.y + t.h / 2)); }
    }
    const hold = piece ? undefined : <path d={tilePath({ ...tileAt(lay, first, sc.par, fit), x: -20, y: -20, w: 40, h: 40, u: 20 })} fill="url(#gOne)" stroke={shade(CONTENT.one, 0.25)} strokeWidth={3} />;
    const base = S.laid;
    runAct({ tool: "hand", moves: take > 1 ? "push" : "carry", from: trayPt, at: pts, hold: take > 1 ? undefined : hold,
      onPoint: (j: number) => { api.sfx.tick(); upd({ laid: base + j + 1 }); } }, () => { api.sfx.settle(); api.did("lay"); });
  };
  const sweepPts = [WP(BW * 0.2, BH * 0.15), WP(BW * 0.8, BH * 0.3), WP(BW * 0.2, BH * 0.5), WP(BW * 0.8, BH * 0.7), WP(BW * 0.5, BH * 0.88)];
  const doGaps = () => {
    upd({ gaps: true, wash: 0 });
    runAct({ tool: "hand", moves: "sweep", from: WP(40, 20), at: sweepPts, to: WP(BW - 40, BH - 20),
      onPoint: (j: number) => upd({ wash: (j + 1) / sweepPts.length }) }, () => { upd({ wash: 1 }); api.did("gaps"); });
  };
  const doLaps = () => {
    runAct({ tool: "hand", moves: "sweep", from: WP(40, 20), at: sweepPts, to: WP(BW - 40, BH - 20),
      onPoint: (j: number) => { if (j === 1) upd({ laps: true }); } }, () => { upd({ laps: true }); api.did("laps"); });
  };
  const doTrace = () => {
    const pts = trailOf("tr");
    if (pts.length < 2) return;
    upd({ trN: 0 });
    runAct({ tool: "pencil", moves: "draw", at: pts.map((p) => WP(p[0], p[1])), onPoint: (j: number) => upd({ trN: j + 1 }) }, () => { upd({ trN: pts.length }); api.did("trace"); });
  };
  const doBracket = () => {
    const p = periodOf(sc.str), a = pieceAt(sc, 0), b = pieceAt(sc, p - 1), x0 = a.x - 34, x1 = b.x + 34;
    const pts = walk([[x0, 205], [x0, 224], [x1, 224], [x1, 205]], 26);
    upd({ brN: 0 });
    runAct({ tool: "pencil", moves: "draw", at: pts.map((q) => WP(q[0], q[1])), onPoint: (j: number) => upd({ brN: j + 1 }) }, () => { upd({ br: true, brN: pts.length }); api.sfx.settle(); api.did("bracket"); });
  };
  const doSeat = (j: number) => {
    const t = tileAt(lay, pre + j, sc.par, fit);
    const next = S.seats[j] === "up" ? "down" : "up";
    runAct({ tool: "hand", moves: "tap", at: [WP(t.x + t.w / 2, t.y + t.h / 2)],
      onPoint: () => { api.sfx.tick(); upd({ seats: S.seats.map((v: any, q: number) => (q === j ? next : v)) }); } }, () => api.did("seat"));
  };
  const act = (on: string, j?: number) => {
    if (!canTap) return;
    if (stage === "demo" && stepOn && on !== stepOn) { api.did(on); return; }
    if (S.demo) upd({ demo: null });
    if (on === "lay") doLay();
    else if (on === "gaps") doGaps();
    else if (on === "laps") doLaps();
    else if (on === "trace") doTrace();
    else if (on === "bracket") doBracket();
    else if (on === "seat") doSeat(j || 0);
  };
  const pickShape = (id: string) => { if (!canTap) return; upd({ shape: id, laid: 0, gaps: false, laps: false, wash: 1, trN: 0, demo: null }); api.sfx.tick(); };

  /* Enter, while the working area holds the answer; in a steps phase it performs the CURRENT step's act */
  api.onEnter(stage === "demo" && stepOn ? () => act(stepOn) : padEnter && stage === "ask" ? () => { if (seatsDone) api.submit(S.seats.slice(0, 3).join(",")); } : null);
  HOOK.set = (v: any) => {
    if (!padEnter) return undefined;
    const a = String(v).split(",").map((s) => s.trim());
    if (a.length !== 3) return false;
    upd({ seats: a }); return true;
  };
  useEffect(() => { if (padEnter && stage === "ask") api.answerReady(!!seatsDone); }, [seatsDone, stage, ek]);

  /* the win line, said once a right answer lands (the bubble then shows the phase's closing at the last one) */
  useEffect(() => { if (stage === "win" && item && item.win) api.say(item.win); }, [stage, ek]);

  /* ── the traceback: the maths redrawn on a demo layer, ending on the whole right answer ───────────────────── */
  const rightSeats = () => [0, 1, 2].map((j) => ({ i: pre + j, f: (pre + j) % 2 ? "down" : "up" }));
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
      st.push([800, () => upd({ demo: { lap: true } })], [900, () => upd({ demo: { ghosts: rightSeats() } })], [800, () => upd({ demo: { ghosts: rightSeats(), badge: sc.badge } })]);
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
  useEffect(() => () => { tl.stop(); api.lock(false); }, [ek]);

  const won = stage === "win" || stage === "idle";
  const view: any = S.demo || (won && !free && !warm ? finalDemo() : null);

  /* what the host and the agent read back (toolApi.getState): only what is on the bench */
  const showGap = !!((view && view.gap) || S.gaps) && !piece && kind !== "card";
  const showLap = !!((view && view.lap) || S.laps) && !piece && kind !== "card";
  api.share({
    tiles: tiles.length, gaps: showGap ? scan.nGap : null, overlaps: showLap ? scan.nLap : null,
    edgeTraced: showGap && S.wash >= 1, carried: S.laid, objects: piece ? pre + S.laid : 0, ticked: won ? n : 0, complete: stage === "idle",
  });

  /* ── drawing helpers (called, never mounted) ───────────────────────────────────────────────────────────────── */
  const ink = C.ink, quiet = mix(C.ink, C.panel, 0.55);
  const bead = CONTENT.bead, stepInk = shade(CONTENT.pointer, 0.25), okInk = shade(CONTENT.one, 0.25);
  const paintOf = (t: any) => (t.own === "given" ? "url(#gHundred)" : "url(#gOne)");
  const edgeOf = (t: any) => (t.own === "given" ? shade(CONTENT.hundred, 0.25) : okInk);
  const thing = (k: string, cx: number, cy: number, r: number, key: any, lit?: boolean) => {
    const parts: any[] = [];
    if (lit) parts.push(<circle key="lit" cx={cx} cy={cy} r={r + 9} fill="none" stroke={okInk} strokeWidth={5} />);
    if (k === "marigold" || k === "cap") {
      const col = k === "marigold" ? CONTENT.ten : CONTENT.pointer, np = k === "marigold" ? 8 : 10, pr = k === "marigold" ? r * 0.42 : r * 0.22, ring = k === "marigold" ? r * 0.54 : r * 0.62;
      let d = "";
      for (let i = 0; i < np; i++) { const a = (i / np) * Math.PI * 2, px = cx + Math.cos(a) * ring, py = cy + Math.sin(a) * ring;
        d += `M ${px - pr} ${py} a ${pr} ${pr} 0 1 0 ${2 * pr} 0 a ${pr} ${pr} 0 1 0 ${-2 * pr} 0 `; }
      parts.push(<path key="p" d={d} fill={col} stroke={shade(col, 0.35)} strokeWidth={1.5} />);
      parts.push(<circle key="c" cx={cx} cy={cy} r={r * 0.46} fill={k === "marigold" ? shade(col, 0.3) : col} stroke={shade(col, 0.35)} strokeWidth={2} />);
    } else if (k === "leaf") {
      parts.push(<path key="p" d={`M ${cx} ${cy - r} Q ${cx + r * 1.05} ${cy} ${cx} ${cy + r} Q ${cx - r * 1.05} ${cy} ${cx} ${cy - r} Z`} fill={CONTENT.one} stroke={shade(CONTENT.one, 0.3)} strokeWidth={2} />);
      parts.push(<path key="v" d={`M ${cx} ${cy - r * 0.7} V ${cy + r * 0.7}`} stroke={shade(CONTENT.one, 0.45)} strokeWidth={2.5} fill="none" />);
    } else if (k === "rose") {
      const col = shade(CONTENT.bead, 0.1);
      parts.push(<circle key="c" cx={cx} cy={cy} r={r} fill={col} stroke={shade(col, 0.3)} strokeWidth={2} />);
      parts.push(<path key="s" d={`M ${cx} ${cy - r * 0.55} a ${r * 0.55} ${r * 0.55} 0 1 1 ${-r * 0.55} ${r * 0.55} a ${r * 0.3} ${r * 0.3} 0 1 0 ${r * 0.3} ${-r * 0.3}`} fill="none" stroke={shade(col, 0.45)} strokeWidth={3} />);
    } else {
      parts.push(<circle key="c" cx={cx} cy={cy} r={r} fill={CONTENT.hundred} stroke={shade(CONTENT.hundred, 0.3)} strokeWidth={2} />);
      parts.push(<circle key="i" cx={cx} cy={cy} r={r * 0.55} fill="none" stroke={shade(CONTENT.hundred, 0.5)} strokeWidth={3} />);
    }
    /* the picture of the object over its plain shape (the shape stays the fallback); the leaf skin is 63 x 120, so its box is narrow */
    if (k === "marigold") parts.push(<Skin key="sk" name="marigold" x={cx - r} y={cy - r} w={2 * r} h={2 * r} />);
    else if (k === "rose") parts.push(<Skin key="sk" name="rose" x={cx - r} y={cy - r * 0.975} w={2 * r} h={2 * r * 0.975} />);
    else if (k === "leaf") parts.push(<Skin key="sk" name="leaf" x={cx - r * 0.525} y={cy - r} w={r * 1.05} h={2 * r} />);
    return <g key={key}>{parts}</g>;
  };
  const keyW = (id: string) => Math.max(200, Math.round(tx(KEYLAB(id)).length * (lang === "en" ? 18 : lang === "hi" ? 21 : 17) + 48));
  const KEYLAB = (id: string) => (id === "lay" ? (sc.layLab || "Lay a copy") : id === "gaps" ? "Gap finder" : id === "laps" ? "Overlap finder" : id === "trace" ? "Trace" : "Bracket");

  /* the keys at the foot: in a guide step only the one the step waits for; otherwise the scene's own */
  let ids: string[] = (sc.keys || []).filter((id: string) => id !== "lay" || rest > 0 || free);
  if (stage === "demo" || stage === "teach") ids = stepOn ? ids.filter((id) => id === stepOn) : [];
  const kws = ids.map(keyW);
  const totW = kws.reduce((a: number, b: number) => a + b, 0) + 16 * Math.max(0, ids.length - 1);
  let kxp = BX + (BW - totW) / 2;
  const keyBoxes = ids.map((id, i) => { const b = { id, x: kxp, w: kws[i] }; kxp += kws[i] + 16; return b; });

  /* the invite: one pulse, on the control the guide step waits for */
  let invite: any = null;
  if (stage === "demo" && stepOn && !busy) {
    if (stepOn === "seat" && fit) { const t = tileAt(lay, pre, sc.par, fit); invite = { x: BX + t.x + t.w / 2, y: BY + t.y + t.h / 2, w: 84, h: 84, rx: 42 }; }
    else { const kb = keyBoxes.filter((b) => b.id === stepOn)[0]; if (kb) invite = { x: kb.x + kb.w / 2, y: KEY_Y + KEY_H / 2, w: kb.w, h: KEY_H, rx: RAD.key }; }
  }

  /* ── the picture ──────────────────────────────────────────────────────────────────────────────────────── */
  const dotsDef = (
    <defs>
      <pattern id="tbDots" width={40} height={40} patternUnits="userSpaceOnUse" x={BX} y={BY}><circle cx={20} cy={20} r={2.6} fill="#767676" /></pattern>
      <pattern id="tbHatch" width={14} height={14} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect x={0} y={0} width={14} height={14} fill={bead} fillOpacity={0.2} />
        <path d="M 0 0 V 14" stroke={bead} strokeWidth={6} />
      </pattern>
      <clipPath id="tbWash"><rect x={0} y={BH * (1 - S.wash)} width={BW} height={BH * S.wash + 1} /></clipPath>
    </defs>
  );
  const benchRect = (
    <g>
      <rect x={BX} y={BY} width={BW} height={BH} rx={RAD.panel} fill={C.paper} stroke={C.rule} strokeWidth={2} />
      <rect x={BX} y={BY} width={BW} height={BH} rx={RAD.panel} fill="url(#tbDots)" />
    </g>
  );

  /* the tiles, the finders and the correction */
  const tileArt = () => {
    const ghostTiles: any[] = (view && (view.ghosts || view.copies) ? (view.ghosts || view.copies) : []).map((g: any) => ({ ...tileAt(lay, g.i, sc.par, fit), f: g.f || undefined }));
    return (
      <g transform={`translate(${BX},${BY})`}>
        {showGap && S.wash >= 1 && <g>{tiles.map((t: any, i: number) => <path key={"rim" + i} d={tilePath(t)} fill="none" stroke={ink} strokeWidth={12} strokeLinejoin="round" />)}</g>}
        {tiles.map((t: any, i: number) => (
          <g key={"t" + i}>
            <path d={tilePath(t)} fill={paintOf(t)} stroke={edgeOf(t)} strokeWidth={2.5} strokeLinejoin="round" />
            {t.split && <path d={`M ${t.x + t.w / 2} ${t.y} V ${t.y + t.h}`} stroke={edgeOf(t)} strokeWidth={2.5} fill="none" />}
          </g>
        ))}
        {showGap && <g clipPath="url(#tbWash)">{scan.gaps.map((g: any, i: number) => <rect key={"g" + i} x={g.x} y={g.y} width={g.w} height={g.h} fill={bead} fillOpacity={0.95} />)}</g>}
        {showLap && scan.laps.map((g: any, i: number) => <rect key={"l" + i} x={g.x} y={g.y} width={g.w} height={g.h} fill="url(#tbHatch)" />)}
        {/* the seats still waiting: a dashed circle, tapped to set a copy down and again to turn it */}
        {nseat > 0 && fit && [0, 1, 2].slice(0, nseat).map((j) => {
          const t = tileAt(lay, pre + j, sc.par, fit);
          return S.seats[j] ? null : <circle key={"sd" + j} cx={t.x + t.w / 2} cy={t.y + t.h / 2} r={34} fill="none" stroke={ink} strokeWidth={4} strokeDasharray="9 8" />;
        })}
        {/* the tenth triangle is the piece asked about: it waits as a dashed seat and Carry on never lays it */}
        {kind === "facing" && fit && !view && (() => { const t = tileAt(lay, N - 1, sc.par, fit);
          return <circle cx={t.x + t.w / 2} cy={t.y + t.h / 2} r={34} fill="none" stroke={ink} strokeWidth={4} strokeDasharray="9 8" />; })()}
        <g pointerEvents="none">
          {ghostTiles.map((t: any, i: number) => <path key={"gh" + i} d={tilePath(t)} fill={CONTENT.one} fillOpacity={0.34} stroke={ink} strokeWidth={4} strokeDasharray="10 8" strokeLinejoin="round" />)}
          {view && view.tenth && fit && <path d={tilePath({ ...tileAt(lay, 9, sc.par, fit), f: "down" })} fill="none" stroke={okInk} strokeWidth={7} strokeLinejoin="round" />}
          {view && view.lit && kind === "count" && Array.from({ length: view.lit }).map((_, k) => {
            const t = tileAt("domino", Math.floor(k / 2), 0, fit), sz = t.h;
            return <rect key={"u" + k} x={t.x + (k % 2) * sz + 4} y={t.y + 4} width={sz - 8} height={sz - 8} rx={6} fill="none" stroke={okInk} strokeWidth={4} />;
          })}
          {((view && view.tr) || S.trN > 0) && sc.tr && (() => {
            const pts = trailOf("tr"), upto = view && view.tr ? pts.length : S.trN, shown = pts.slice(0, upto);
            if (shown.length < 1) return null;
            return <g><path d={"M " + shown.map((p) => p[0] + " " + p[1]).join(" L ")} fill="none" stroke={stepInk} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
              <circle cx={shown[shown.length - 1][0]} cy={shown[shown.length - 1][1]} r={9} fill={stepInk} /></g>;
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
    const showBr = kind === "string" && (S.br || (view && view.br));
    const grp = (g: number, strong: boolean) => {
      const a = pieceAt(sc, g * p), b = pieceAt(sc, g * p + p - 1), x0 = a.x - 34, x1 = b.x + 34;
      return <path key={"br" + g} d={`M ${x0} 205 V 224 H ${x1} V 205`} fill="none" stroke={strong ? stepInk : okInk} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />;
    };
    const drawn = (S.brN > 0 && !showBr && kind === "string") ? walk([[pieceAt(sc, 0).x - 34, 205], [pieceAt(sc, 0).x - 34, 224], [pieceAt(sc, p - 1).x + 34, 224], [pieceAt(sc, p - 1).x + 34, 205]], 26).slice(0, S.brN) : [];
    return (
      <g transform={`translate(${BX},${BY})`}>
        {kind === "string" && <path d="M 30 50 Q 430 110 830 50" fill="none" stroke={ink} strokeWidth={4} />}
        {Array.from({ length: sc.all }).map((_, i) => {
          if (i >= rowsAll) return kind === "rows" ? <circle key={"e" + i} cx={pieceAt(sc, i).x} cy={pieceAt(sc, i).y} r={30} fill="none" stroke={C.rule} strokeWidth={3} strokeDasharray="9 7" /> : null;
          const q = pieceAt(sc, i);
          return <g key={"p" + i}>
            {kind === "string" && <path d={`M ${q.x} ${q.y - q.r - 24} V ${q.y - q.r}`} stroke={ink} strokeWidth={2.5} fill="none" />}
            {thing(q.k, q.x, q.y, q.r, "th" + i, lit && q.k === sc.litk)}
          </g>;
        })}
        {showBr && Array.from({ length: sc.all / p }).map((_, g) => (g * p + p <= shown ? grp(g, g === 0) : null))}
        {drawn.length > 1 && <path d={"M " + drawn.map((q) => q[0] + " " + q[1]).join(" L ")} fill="none" stroke={stepInk} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />}
        {sc.leg && sc.leg.map((k: string, j: number) => {
          const xs = (BW * (j + 0.5)) / sc.leg.length, yy = kind === "rows" ? 288 : 272;
          return <g key={"lg" + j}>{thing(k, xs - 70, yy, 26, "lgi" + j)}<text x={xs - 36} y={yy + 11} fontSize={T.label} fontWeight={600} fill={ink}>{tx(PNAME[k])}</text></g>;
        })}
      </g>
    );
  };

  /* the four word cards of the last question: words first, turned over to their meanings in the correction */
  const cardsArt = () => {
    const ids4 = Object.keys(CARD_MEANS), flip = !!(view && view.flip), pick = view && view.card;
    return (
      <g transform={`translate(${BX},${BY})`}>
        {ids4.map((id, j) => {
          const x = 30 + (j % 2) * 420, y = 24 + Math.floor(j / 2) * 140, on = pick === id && !!(flip || (view && view.card));
          const word = item.choices.filter((c: any) => c.id === id)[0].label;
          return <g key={id}>
            <rect x={x} y={y} width={400} height={120} rx={RAD.panel} fill="url(#gPanel)" stroke={on ? okInk : C.rule} strokeWidth={on ? 6 : 3} />
            <text x={x + 200} y={flip ? y + 52 : y + 74} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ink}>{tx(word)}</text>
            {flip && <text x={x + 200} y={y + 94} textAnchor="middle" fontSize={T.micro} fontWeight={500} fill={ink}>{tx(CARD_MEANS[id])}</text>}
          </g>;
        })}
      </g>
    );
  };

  /* the top band: loose copies on the left, the plate that names the answer on the right */
  const looseCopies = () => {
    if (piece || kind === "card" || kind === "place" || !lay || free || nseat > 0) return null;
    const cnt = Math.min(3, rest);
    if (cnt < 1) return null;
    const base = seatOf(lay, 0, sc.par), sz = 64 / Math.max(base.w, base.h);
    return (
      <g>
        <rect x={BX} y={6} width={320} height={80} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        {Array.from({ length: cnt }).map((_, j) => <path key={j} d={tilePath({ ...base, x: BX + 40 + j * 88 + (64 - base.w * sz) / 2, y: 14 + (64 - base.h * sz) / 2, w: base.w * sz, h: base.h * sz, u: 40 * sz })} fill="url(#gOne)" stroke={okInk} strokeWidth={2.5} strokeLinejoin="round" />)}
      </g>
    );
  };
  const freeTray = () => !free ? null : (
    <g>
      {FREE_SHAPES.map((s, i) => {
        const base = seatOf(s.id, 0), sz = 60 / Math.max(base.w, base.h), cx = BX + 44 + i * 92, on = S.shape === s.id;
        return <g key={s.id}>
          <rect x={cx - 42} y={6} width={84} height={84} rx={14} fill={on ? tint(CONTENT.one, 0.8) : "url(#gPanel)"} stroke={on ? okInk : C.rule} strokeWidth={on ? 4 : 2} />
          <path d={tilePath({ ...base, x: cx - (base.w * sz) / 2, y: 48 - (base.h * sz) / 2, w: base.w * sz, h: base.h * sz, u: 40 * sz })} fill="url(#gOne)" stroke={okInk} strokeWidth={2.5} strokeLinejoin="round" />
          <Hit id={"shape-" + s.id} label={s.label} x={cx - 42} y={6} w={84} h={84} onPress={() => pickShape(s.id)} enabled={canTap} />
        </g>;
      })}
    </g>
  );
  const plateText = view && view.badge ? view.badge : null, plateNum = view && view.num !== undefined ? String(view.num) : null;
  const plate = (plateText || plateNum) ? (() => {
    const pw = plateNum ? 200 : 520;
    return <g pointerEvents="none">
      <rect x={BX + BW - pw} y={10} width={pw} height={68} rx={16} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
      <text x={BX + BW - pw / 2} y={plateNum ? 63 : 58} textAnchor="middle" fontSize={plateNum ? T.xl : T.prompt} fontWeight={700} fill={ink}>{plateNum || tx(plateText)}</text>
    </g>;
  })() : null;

  /* the seat controls: 72 x 72 taps centred on each seat */
  const seatHits = (nseat > 0 && fit) ? [0, 1, 2].slice(0, nseat).map((j) => {
    const t = tileAt(lay, pre + j, sc.par, fit);
    return <Hit key={"seat" + j} id={"seat-" + (j + 1)} label={tx("Seat") + " " + (j + 1)} x={BX + t.x + t.w / 2 - 36} y={BY + t.y + t.h / 2 - 36} w={72} h={72} onPress={() => act("seat", j)} enabled={canTap} />;
  }) : null;

  return (
    <g>
      <g transform={`translate(${ox},0)`}>
        {dotsDef}
        {freeTray()}
        {looseCopies()}
        {plate}
        {benchRect}
        {kind === "card" ? cardsArt() : piece ? thingsArt() : tileArt()}
        {seatHits}
        {keyBoxes.map((b) => (
          <Key key={b.id} id={b.id} label={tx(KEYLAB(b.id))} x={b.x} y={KEY_Y} w={b.w} h={KEY_H} C={C}
            disabled={!canTap || (b.id === "lay" && rest <= 0)} onClick={() => act(b.id)}>
            <text textAnchor="middle" y={11} fontSize={T.label} fontWeight={700} fill={!canTap || (b.id === "lay" && rest <= 0) ? quiet : ink}>{tx(KEYLAB(b.id))}</text>
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
  const lay = item.lay || "blk", base = [0, 1, 2].map((i) => seatOf(lay === "domino" ? "sqr" : lay === "ring" ? "blk" : lay, i, 0));
  const sz = 24 / Math.max(base[0].w, base[0].h);
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {base.map((t: any, i: number) => <path key={i} d={tilePath({ ...t, x: 12 + i * 32 + (24 - t.w * sz) / 2, y: 6 + (24 - t.h * sz) / 2, w: t.w * sz, h: t.h * sz, u: 40 * sz })} fill={CONTENT.hundred} fillOpacity={0.3} stroke={shade(CONTENT.hundred, 0.25)} strokeWidth={1.5} />)}
      <text x={w - 12} y={h - 10} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(label)}</text>
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
      /* the wide keypad (PATTERNS.md 9g): the picture is drawn for x 64 to 964 while the panel is open */
      bigPad: true,
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
