/* ═══ M1.S2.T3.C10.2D1 · unit_ladder · tool-specific part ═══════════════════════════════
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

const TOOL_ID = "unit_ladder";
const MEDIA_ID = "M1.S2.T3.C10.2D1";
const TOOL_NAME = "Unit Ladder";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* the plan's opening line: not shown, since phase 1 opens on its guide steps */
const OPENING = ["Here is a ladder of length units, from millimetres up to kilometres."];
/* the whole-tool line (not shown from r44; kept short) */
const FINISH_LINE = "Each step has its own number, and the rest stays in the smaller unit.";
/* printed when the child opens Free play; the free branch offers exactly this */
const FREE_LINE = "Free play: step the card up and down the ladder as often as you like.";

/* THE START PAGE (runtime r28; docs/LAYOUT.md §1c, docs/PATTERNS.md §14): the first thing a child sees in user mode.
   START_HOOK is ONE printed question to wonder at (it needs a TR entry, and never gives an answer away); StartArt is
   the object the lesson is about, drawn in a 1200 x 340 box ({ box, C, lang, tx }; plain shapes in the chrome and content
   colours, a <Skin> over them when the image agent made one). This stub is a dashed outline: draw the real object. */
const START_HOOK = "Which number belongs on each step?";
/* the ladder of units as a staircase: four rungs rising from mm to km, the three steps between them blank */
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  const hs = [72, 132, 192, 252], bw = 220, gap = 50, x0 = (box.w - (4 * bw + 3 * gap)) / 2;
  return (
    <g>
      {[0, 1, 2, 3].map((r) => {
        const x = x0 + r * (bw + gap), y = box.h - hs[r];
        return (
          <g key={"st" + r}>
            <rect x={x} y={y} width={bw} height={hs[r]} rx={18} fill={tint(r % 2 ? UL_BIG : UL_SMALL, 0.78)} stroke={C.ink} strokeWidth={3} />
            <text x={x + bw / 2} y={y + 58} textAnchor="middle" fontSize={T.speech + 4} fontWeight={700} fill={C.ink}>{tx(UL_UNITS[r])}</text>
          </g>
        );
      })}
      {[0, 1, 2].map((s) => {
        const cx = x0 + (s + 1) * (bw + gap) - gap / 2, cy = box.h - hs[s + 1] - 46;
        return (
          <g key={"sp" + s}>
            <rect x={cx - 60} y={cy - 32} width={120} height={64} rx={14} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} strokeDasharray="10 8" />
            <text x={cx} y={cy + 15} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>?</text>
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
    "Unit Ladder": "मात्रकों की सीढ़ी",
    "Here is a ladder of length units, from millimetres up to kilometres.": "यह लंबाई के मात्रकों की सीढ़ी है, मिलीमीटर से किलोमीटर तक।",
    "Free play: step the card up and down the ladder as often as you like.": "मुक्त खेल: कार्ड को सीढ़ी पर जितनी बार चाहो ऊपर-नीचे ले जाओ।",
    "Which number belongs on each step?": "हर पायदान पर कौन-सी संख्या आएगी?",
    /* phase 1 */
    "Each step has its own number": "हर पायदान की अपनी संख्या",
    "Each step joins two units, and each step has its own number.": "हर पायदान दो मात्रकों को जोड़ता है, और हर पायदान की अपनी संख्या है।",
    "Tap the ruler to lay it beside the centimetre rung.": "स्केल दबाओ और उसे सेंटीमीटर वाले डंडे के पास रखो।",
    "The ruler is the first one, on the left of the tray.": "स्केल ट्रे में सबसे बाईं ओर पहली चीज़ है।",
    "Now tap the metre stick to lay it beside the metre rung.": "अब मीटर-छड़ दबाओ और उसे मीटर वाले डंडे के पास रखो।",
    "The metre stick is the left one of the two in the tray.": "ट्रे में बची दो चीज़ों में बाईं वाली मीटर-छड़ है।",
    "Last, tap the road sign to stand it by the kilometre rung.": "आख़िर में सड़क का बोर्ड दबाओ और उसे किलोमीटर वाले डंडे के पास लगाओ।",
    "The road sign is the only one left in the tray.": "ट्रे में बची अकेली चीज़ सड़क का बोर्ड है।",
    "How many of the smaller unit fit into one of the larger?": "बड़े मात्रक के एक में छोटे मात्रक के कितने आते हैं?",
    "Check each step against the ruler, the metre stick or the road sign.": "हर पायदान को स्केल, मीटर-छड़ या सड़क के बोर्ड से मिलाकर देखो।",
    "Each step has its own number: 10, 100 and 1,000.": "हर पायदान की अपनी संख्या है: 10, 100 और 1,000।",
    "You learned: 10, 100 and 1,000 each join a different pair of units.": "तुमने सीखा: 10, 100 और 1,000 अलग-अलग मात्रक-जोड़ों को जोड़ते हैं।",
    "A child writes 3 m as 30 cm: how many centimetres is 3 m really?": "एक बच्चा 3 मी को 30 सेमी लिखता है: असल में 3 मी कितने सेंटीमीटर है?",
    "3 m is how many cm?": "3 मी कितने सेमी?",
    "The long marks on the metre stick are 10 cm apart: count the gaps.": "मीटर-छड़ के लंबे निशान 10 सेमी की दूरी पर हैं: बीच की जगहें गिनो।",
    "Yes, 3 m is 300 cm, not 30 cm.": "हाँ, 3 मी 300 सेमी है, 30 सेमी नहीं।",
    "How many centimetres make a metre, and how many millimetres make a centimetre?": "कितने सेंटीमीटर से एक मीटर बनता है, और कितने मिलीमीटर से एक सेंटीमीटर?",
    "cm in 1 m? mm in 1 cm?": "1 मी में सेमी? 1 सेमी में मिमी?",
    "Read the metre stick for the first box and the ruler for the second.": "पहले खाने के लिए मीटर-छड़ पढ़ो और दूसरे के लिए स्केल।",
    "Yes, 100 cm make 1 m and 10 mm make 1 cm.": "हाँ, 100 सेमी से 1 मी और 10 मिमी से 1 सेमी बनता है।",
    "Set each number tile on the step it belongs to, then press Enter.": "हर संख्या टाइल को उसके सही पायदान पर रखो, फिर दर्ज करें दबाओ।",
    "Set each tile on its step.": "हर टाइल अपने पायदान पर रखो।",
    "Start with the bottom step, the two smallest units.": "सबसे नीचे के पायदान से शुरू करो, जहाँ सबसे छोटे दो मात्रक हैं।",
    "Yes, the 10 sits only between millimetres and centimetres.": "हाँ, 10 सिर्फ़ मिलीमीटर और सेंटीमीटर के बीच आता है।",
    /* phase 2 */
    "Larger to smaller: multiply": "बड़े से छोटा: गुणा करो",
    "Step it down. Which number is on this step? Now add on the metres.": "इसे नीचे उतारो। इस पायदान पर कौन-सी संख्या है? अब मीटर जोड़ो।",
    "Tap Step down to take the 3 km down to metres.": "नीचे जाओ दबाओ और 3 किमी को मीटर में उतारो।",
    "The Step down key is at the bottom right.": "नीचे जाओ बटन नीचे दाईं ओर है।",
    "Now tap Add on to bring the 125 m down to join them.": "अब जोड़ो दबाओ, ताकि 125 मी नीचे आकर उनसे जुड़ जाएँ।",
    "The Add on key stands where Step down was.": "जोड़ो बटन वहीं है जहाँ नीचे जाओ बटन था।",
    "Which part of the card gets multiplied, and by which number?": "कार्ड के किस भाग का गुणा होता है, और किस संख्या से?",
    "Start with 1 of the larger unit: how many of the smaller unit is that?": "बड़े मात्रक के 1 से शुरू करो: वह छोटे मात्रक के कितने है?",
    "Larger to smaller: multiply by the step's number, then add the smaller part.": "बड़े से छोटा: पायदान की संख्या से गुणा करो, फिर छोटा भाग जोड़ो।",
    "You learned: larger to smaller, multiply and add the smaller part.": "तुमने सीखा: बड़े से छोटा, गुणा करो और छोटा भाग जोड़ो।",
    "Convert 7 km 245 m into metres.": "7 किमी 245 मी को मीटर में बदलो।",
    "7 km 245 m in m?": "7 किमी 245 मी, मी में?",
    "Which step is the card crossing, and what number is on it?": "कार्ड कौन-सा पायदान पार कर रहा है, और उस पर कौन-सी संख्या है?",
    "Yes, 7 km 245 m is 7,245 m.": "हाँ, 7 किमी 245 मी में 7,245 मी होते हैं।",
    "How many centimetres is 9 m?": "9 मी कितने सेंटीमीटर है?",
    "9 m in cm?": "9 मी, सेमी में?",
    "Read the number painted between metres and centimetres.": "मीटर और सेंटीमीटर के बीच लिखी संख्या पढ़ो।",
    "Yes, 9 m is 900 cm.": "हाँ, 9 मी में 900 सेमी होते हैं।",
    "Write 12 cm 7 mm all in millimetres.": "12 सेमी 7 मिमी को पूरा मिलीमीटर में लिखो।",
    "12 cm 7 mm in mm?": "12 सेमी 7 मिमी, मिमी में?",
    "Multiply the centimetres first, then bring the millimetres along.": "पहले सेंटीमीटर का गुणा करो, फिर मिलीमीटर साथ ले आओ।",
    "Yes, 12 cm 7 mm is 127 mm.": "हाँ, 12 सेमी 7 मिमी में 127 मिमी होते हैं।",
    /* phase 3 */
    "Smaller to larger: divide and keep the rest": "छोटे से बड़ा: भाग दो और बचा हुआ रखो",
    "How many whole metres are in it? What is left stays in centimetres.": "इसमें कितने पूरे मीटर हैं? जो बचे, वह सेंटीमीटर में रहता है।",
    "Tap Step up to find the whole metres in 250 cm.": "ऊपर जाओ दबाओ और 250 सेमी में पूरे मीटर ढूँढो।",
    "The Step up key is at the bottom right.": "ऊपर जाओ बटन नीचे दाईं ओर है।",
    "Now tap Rebuild to put the card back together.": "अब फिर बनाओ दबाओ और कार्ड को दोबारा जोड़ो।",
    "The Rebuild key stands where Step up was.": "फिर बनाओ बटन वहीं है जहाँ ऊपर जाओ बटन था।",
    "How many whole larger units fit, and what is left over?": "बड़े मात्रक के कितने पूरे आते हैं, और कितना बचता है?",
    "Check: whole units times the step's number, plus the rest, give the card again.": "जाँचो: पूरे मात्रक गुणा पायदान की संख्या, और बचा हुआ, फिर से कार्ड बनाते हैं।",
    "Divide by the step's number: the quotient is the larger unit, the rest stays.": "पायदान की संख्या से भाग दो: भागफल बड़ा मात्रक है, शेषफल छोटे में रहता है।",
    "You learned: smaller to larger, divide and keep the rest.": "तुमने सीखा: छोटे से बड़ा, भाग दो और बचा हुआ रखो।",
    "Write 570 cm in metres and centimetres.": "570 सेमी को मीटर और सेंटीमीटर में लिखो।",
    "570 cm in m and cm?": "570 सेमी, मी और सेमी में?",
    "Which number joins centimetres and metres?": "सेंटीमीटर और मीटर को कौन-सी संख्या जोड़ती है?",
    "Yes, 570 cm is 5 m 70 cm.": "हाँ, 570 सेमी में 5 मी 70 सेमी होते हैं।",
    "Change 83 mm into centimetres and millimetres.": "83 मिमी को सेंटीमीटर और मिलीमीटर में बदलो।",
    "83 mm in cm and mm?": "83 मिमी, सेमी और मिमी में?",
    "How many whole centimetres fit in 83 mm?": "83 मिमी में कितने पूरे सेंटीमीटर आते हैं?",
    "Yes, 83 mm is 8 cm 3 mm.": "हाँ, 83 मिमी में 8 सेमी 3 मिमी होते हैं।",
    "A path is 4,608 m long: write its length in kilometres and metres.": "एक रास्ता 4,608 मी लंबा है: इसकी लंबाई किलोमीटर और मीटर में लिखो।",
    "4,608 m in km and m?": "4,608 मी, किमी और मी में?",
    "How many whole thousands are in 4,608?": "4,608 में कितने पूरे हज़ार हैं?",
    "Yes, the path is 4 km 608 m.": "हाँ, रास्ता 4 किमी 608 मी लंबा है।",
    /* phase 4 */
    "A zero that holds a place": "स्थान सँभालने वाला शून्य",
    "The metres fill the tens and the ones. What goes in the hundreds?": "मीटर दहाई और इकाई को भरते हैं। सैकड़े में क्या आएगा?",
    "Tap Step down to change 5 km 26 m into metres.": "नीचे जाओ दबाओ और 5 किमी 26 मी को मीटर में बदलो।",
    "Now tap Write to put the metres on the place board.": "अब लिखो दबाओ और मीटर को स्थान सारणी में लिखो।",
    "The Write key stands where Step down was.": "लिखो बटन वहीं है जहाँ नीचे जाओ बटन था।",
    "Tap the empty box to drop a zero into it.": "खाली खाना दबाओ और उसमें शून्य डालो।",
    "One box on the place board has no digit yet.": "स्थान सारणी के एक खाने में अभी कोई अंक नहीं है।",
    "Which place does each digit on the card sit in?": "कार्ड का हर अंक किस स्थान पर बैठता है?",
    "Start the smaller part at the ones place and work to the left.": "छोटा भाग इकाई के स्थान से शुरू करो और बाईं ओर बढ़ो।",
    "An empty place in the smaller part is held open by a zero.": "छोटे भाग के खाली स्थान को शून्य सँभालता है।",
    "You learned: an empty place in the smaller part takes a zero.": "तुमने सीखा: छोटे भाग के खाली स्थान में शून्य आता है।",
    "Convert 6 km 38 m into metres.": "6 किमी 38 मी को मीटर में बदलो।",
    "6 km 38 m in m?": "6 किमी 38 मी, मी में?",
    "How many places do the metres take beside kilometres?": "किलोमीटर के साथ मीटर कितने स्थान लेते हैं?",
    "Yes, 6 km 38 m is 6,038 m.": "हाँ, 6 किमी 38 मी में 6,038 मी होते हैं।",
    "A child writes 9 km 7 m as 9,700 m: write it in metres yourself.": "एक बच्चा 9 किमी 7 मी को 9,700 मी लिखता है: तुम खुद इसे मीटर में लिखो।",
    "9 km 7 m in m?": "9 किमी 7 मी, मी में?",
    "7 m takes only the ones place: what fills the two places before it?": "7 मी सिर्फ़ इकाई का स्थान लेता है: उससे पहले के दो स्थान किससे भरेंगे?",
    "Yes, 9 km 7 m is 9,007 m.": "हाँ, 9 किमी 7 मी में 9,007 मी होते हैं।",
    "A ribbon is 305 cm long: write its length in metres and centimetres.": "एक रिबन 305 सेमी लंबा है: इसकी लंबाई मीटर और सेंटीमीटर में लिखो।",
    "305 cm in m and cm?": "305 सेमी, मी और सेमी में?",
    "Beside metres, centimetres take two places: which two digits are they?": "मीटर के साथ सेंटीमीटर दो स्थान लेते हैं: वे कौन-से दो अंक हैं?",
    "Yes, the ribbon is 3 m 5 cm.": "हाँ, रिबन 3 मी 5 सेमी लंबा है।",
    /* the answer boxes, and every word and unit symbol the picture draws */
    "1 m": "1 मी", "1 cm": "1 सेमी",
    "km": "किमी", "m": "मी", "cm": "सेमी", "mm": "मिमी",
    "Th": "ह.", "H": "सै.", "T": "द.", "O": "इ.",
    "Step down": "नीचे जाओ", "Step up": "ऊपर जाओ", "Add on": "जोड़ो", "Rebuild": "फिर बनाओ", "Write": "लिखो",
    "Put a tile on every step first, then press Enter.": "पहले हर पायदान पर एक टाइल रखो, फिर दर्ज करें दबाओ।",
    "This card cannot step up now: step it down first.": "यह कार्ड अभी ऊपर नहीं जा सकता: पहले इसे नीचे ले जाओ।",
    "This card is on the lowest rung, so it can only step up.": "यह कार्ड सबसे नीचे वाले डंडे पर है, इसलिए सिर्फ़ ऊपर जा सकता है।",
  },
  gu: {
    "Unit Ladder": "એકમોની સીડી",
    "Here is a ladder of length units, from millimetres up to kilometres.": "આ લંબાઈના એકમોની સીડી છે, મિલિમીટરથી કિલોમીટર સુધી.",
    "Free play: step the card up and down the ladder as often as you like.": "મુક્ત રમત: કાર્ડને સીડી પર ગમે તેટલી વાર ઉપર-નીચે લઈ જાઓ.",
    "Which number belongs on each step?": "દરેક પગથિયા પર કઈ સંખ્યા આવે?",
    /* phase 1 */
    "Each step has its own number": "દરેક પગથિયાની પોતાની સંખ્યા",
    "Each step joins two units, and each step has its own number.": "દરેક પગથિયું બે એકમોને જોડે છે, અને દરેકની પોતાની સંખ્યા છે.",
    "Tap the ruler to lay it beside the centimetre rung.": "ફૂટપટ્ટી દબાવો અને તેને સેન્ટિમીટરના દાંડા પાસે મૂકો.",
    "The ruler is the first one, on the left of the tray.": "ફૂટપટ્ટી ટ્રેમાં સૌથી ડાબી બાજુ પહેલી છે.",
    "Now tap the metre stick to lay it beside the metre rung.": "હવે મીટર પટ્ટી દબાવો અને તેને મીટરના દાંડા પાસે મૂકો.",
    "The metre stick is the left one of the two in the tray.": "ટ્રેમાં બચેલી બેમાંથી ડાબી બાજુની મીટર પટ્ટી છે.",
    "Last, tap the road sign to stand it by the kilometre rung.": "છેલ્લે રસ્તાનું પાટિયું દબાવો અને તેને કિલોમીટરના દાંડા પાસે મૂકો.",
    "The road sign is the only one left in the tray.": "ટ્રેમાં બાકી રહેલું એકમાત્ર રસ્તાનું પાટિયું છે.",
    "How many of the smaller unit fit into one of the larger?": "મોટા એકમના એકમાં નાના એકમના કેટલા સમાય?",
    "Check each step against the ruler, the metre stick or the road sign.": "દરેક પગથિયાને ફૂટપટ્ટી, મીટર પટ્ટી કે રસ્તાના પાટિયા સાથે સરખાવો.",
    "Each step has its own number: 10, 100 and 1,000.": "દરેક પગથિયાની પોતાની સંખ્યા છે: 10, 100 અને 1,000.",
    "You learned: 10, 100 and 1,000 each join a different pair of units.": "તમે શીખ્યા: 10, 100 અને 1,000 જુદી જુદી એકમ-જોડીઓને જોડે છે.",
    "A child writes 3 m as 30 cm: how many centimetres is 3 m really?": "એક બાળક 3 મી ને 30 સેમી લખે છે: ખરેખર 3 મી કેટલા સેન્ટિમીટર છે?",
    "3 m is how many cm?": "3 મી કેટલા સેમી?",
    "The long marks on the metre stick are 10 cm apart: count the gaps.": "મીટર પટ્ટીના લાંબા કાપા 10 સેમીના અંતરે છે: વચ્ચેના ગાળા ગણો.",
    "Yes, 3 m is 300 cm, not 30 cm.": "હા, 3 મી એટલે 300 સેમી, 30 સેમી નહીં.",
    "How many centimetres make a metre, and how many millimetres make a centimetre?": "કેટલા સેન્ટિમીટરનો એક મીટર બને, અને કેટલા મિલિમીટરનો એક સેન્ટિમીટર?",
    "cm in 1 m? mm in 1 cm?": "1 મી માં સેમી? 1 સેમી માં મિમી?",
    "Read the metre stick for the first box and the ruler for the second.": "પહેલા ખાના માટે મીટર પટ્ટી વાંચો અને બીજા માટે ફૂટપટ્ટી.",
    "Yes, 100 cm make 1 m and 10 mm make 1 cm.": "હા, 100 સેમીનો 1 મી અને 10 મિમીનો 1 સેમી બને છે.",
    "Set each number tile on the step it belongs to, then press Enter.": "દરેક સંખ્યા ટાઇલને તેના સાચા પગથિયે મૂકો, પછી દાખલ કરો દબાવો.",
    "Set each tile on its step.": "દરેક ટાઇલ તેના પગથિયે મૂકો.",
    "Start with the bottom step, the two smallest units.": "સૌથી નીચેના પગથિયાથી શરૂ કરો, જ્યાં સૌથી નાના બે એકમ છે.",
    "Yes, the 10 sits only between millimetres and centimetres.": "હા, 10 ફક્ત મિલિમીટર અને સેન્ટિમીટર વચ્ચે આવે છે.",
    /* phase 2 */
    "Larger to smaller: multiply": "મોટાથી નાનો: ગુણાકાર કરો",
    "Step it down. Which number is on this step? Now add on the metres.": "તેને નીચે ઉતારો. આ પગથિયા પર કઈ સંખ્યા છે? હવે મીટર ઉમેરો.",
    "Tap Step down to take the 3 km down to metres.": "નીચે જાઓ દબાવો અને 3 કિમીને મીટરમાં ઉતારો.",
    "The Step down key is at the bottom right.": "નીચે જાઓ બટન નીચે જમણી બાજુ છે.",
    "Now tap Add on to bring the 125 m down to join them.": "હવે ઉમેરો દબાવો, જેથી 125 મી નીચે આવીને તેમની સાથે જોડાય.",
    "The Add on key stands where Step down was.": "ઉમેરો બટન ત્યાં જ છે જ્યાં નીચે જાઓ બટન હતું.",
    "Which part of the card gets multiplied, and by which number?": "કાર્ડના કયા ભાગનો ગુણાકાર થાય છે, અને કઈ સંખ્યાથી?",
    "Start with 1 of the larger unit: how many of the smaller unit is that?": "મોટા એકમના 1 થી શરૂ કરો: તે નાના એકમના કેટલા થાય?",
    "Larger to smaller: multiply by the step's number, then add the smaller part.": "મોટાથી નાનો: પગથિયાની સંખ્યાથી ગુણો, પછી નાનો ભાગ ઉમેરો.",
    "You learned: larger to smaller, multiply and add the smaller part.": "તમે શીખ્યા: મોટાથી નાનો, ગુણો અને નાનો ભાગ ઉમેરો.",
    "Convert 7 km 245 m into metres.": "7 કિમી 245 મી ને મીટરમાં ફેરવો.",
    "7 km 245 m in m?": "7 કિમી 245 મી, મી માં?",
    "Which step is the card crossing, and what number is on it?": "કાર્ડ કયું પગથિયું પાર કરે છે, અને તેના પર કઈ સંખ્યા છે?",
    "Yes, 7 km 245 m is 7,245 m.": "હા, 7 કિમી 245 મી એટલે 7,245 મી.",
    "How many centimetres is 9 m?": "9 મી કેટલા સેન્ટિમીટર છે?",
    "9 m in cm?": "9 મી, સેમી માં?",
    "Read the number painted between metres and centimetres.": "મીટર અને સેન્ટિમીટર વચ્ચે લખેલી સંખ્યા વાંચો.",
    "Yes, 9 m is 900 cm.": "હા, 9 મી એટલે 900 સેમી.",
    "Write 12 cm 7 mm all in millimetres.": "12 સેમી 7 મિમીને આખું મિલિમીટરમાં લખો.",
    "12 cm 7 mm in mm?": "12 સેમી 7 મિમી, મિમી માં?",
    "Multiply the centimetres first, then bring the millimetres along.": "પહેલાં સેન્ટિમીટરનો ગુણાકાર કરો, પછી મિલિમીટર સાથે લાવો.",
    "Yes, 12 cm 7 mm is 127 mm.": "હા, 12 સેમી 7 મિમી એટલે 127 મિમી.",
    /* phase 3 */
    "Smaller to larger: divide and keep the rest": "નાનાથી મોટો: ભાગો અને બાકી રાખો",
    "How many whole metres are in it? What is left stays in centimetres.": "તેમાં કેટલા પૂરા મીટર છે? જે બાકી રહે તે સેન્ટિમીટરમાં રહે છે.",
    "Tap Step up to find the whole metres in 250 cm.": "ઉપર જાઓ દબાવો અને 250 સેમીમાં પૂરા મીટર શોધો.",
    "The Step up key is at the bottom right.": "ઉપર જાઓ બટન નીચે જમણી બાજુ છે.",
    "Now tap Rebuild to put the card back together.": "હવે ફરી બનાવો દબાવો અને કાર્ડને ફરીથી જોડો.",
    "The Rebuild key stands where Step up was.": "ફરી બનાવો બટન ત્યાં જ છે જ્યાં ઉપર જાઓ બટન હતું.",
    "How many whole larger units fit, and what is left over?": "મોટા એકમના કેટલા પૂરા સમાય, અને કેટલું બાકી રહે?",
    "Check: whole units times the step's number, plus the rest, give the card again.": "તપાસો: પૂરા એકમ ગુણ્યા પગથિયાની સંખ્યા, વત્તા બાકી, ફરી કાર્ડ બનાવે છે.",
    "Divide by the step's number: the quotient is the larger unit, the rest stays.": "પગથિયાની સંખ્યાથી ભાગો: ભાગફળ મોટો એકમ છે, શેષ નાનામાં રહે છે.",
    "You learned: smaller to larger, divide and keep the rest.": "તમે શીખ્યા: નાનાથી મોટો, ભાગો અને બાકી રાખો.",
    "Write 570 cm in metres and centimetres.": "570 સેમીને મીટર અને સેન્ટિમીટરમાં લખો.",
    "570 cm in m and cm?": "570 સેમી, મી અને સેમીમાં?",
    "Which number joins centimetres and metres?": "સેન્ટિમીટર અને મીટરને કઈ સંખ્યા જોડે છે?",
    "Yes, 570 cm is 5 m 70 cm.": "હા, 570 સેમી એટલે 5 મી 70 સેમી.",
    "Change 83 mm into centimetres and millimetres.": "83 મિમીને સેન્ટિમીટર અને મિલિમીટરમાં ફેરવો.",
    "83 mm in cm and mm?": "83 મિમી, સેમી અને મિમીમાં?",
    "How many whole centimetres fit in 83 mm?": "83 મિમીમાં કેટલા પૂરા સેન્ટિમીટર સમાય?",
    "Yes, 83 mm is 8 cm 3 mm.": "હા, 83 મિમી એટલે 8 સેમી 3 મિમી.",
    "A path is 4,608 m long: write its length in kilometres and metres.": "એક રસ્તો 4,608 મી લાંબો છે: તેની લંબાઈ કિલોમીટર અને મીટરમાં લખો.",
    "4,608 m in km and m?": "4,608 મી, કિમી અને મીમાં?",
    "How many whole thousands are in 4,608?": "4,608 માં કેટલા પૂરા હજાર છે?",
    "Yes, the path is 4 km 608 m.": "હા, રસ્તો 4 કિમી 608 મી લાંબો છે.",
    /* phase 4 */
    "A zero that holds a place": "સ્થાન સાચવતો શૂન્ય",
    "The metres fill the tens and the ones. What goes in the hundreds?": "મીટર દશક અને એકમ ભરે છે. શતકમાં શું આવે?",
    "Tap Step down to change 5 km 26 m into metres.": "નીચે જાઓ દબાવો અને 5 કિમી 26 મી ને મીટરમાં ફેરવો.",
    "Now tap Write to put the metres on the place board.": "હવે લખો દબાવો અને મીટરને સ્થાન કોઠામાં લખો.",
    "The Write key stands where Step down was.": "લખો બટન ત્યાં જ છે જ્યાં નીચે જાઓ બટન હતું.",
    "Tap the empty box to drop a zero into it.": "ખાલી ખાનું દબાવો અને તેમાં શૂન્ય મૂકો.",
    "One box on the place board has no digit yet.": "સ્થાન કોઠાના એક ખાનામાં હજી કોઈ અંક નથી.",
    "Which place does each digit on the card sit in?": "કાર્ડનો દરેક અંક કયા સ્થાને બેસે છે?",
    "Start the smaller part at the ones place and work to the left.": "નાનો ભાગ એકમના સ્થાનથી શરૂ કરો અને ડાબી તરફ આગળ વધો.",
    "An empty place in the smaller part is held open by a zero.": "નાના ભાગના ખાલી સ્થાનને શૂન્ય સાચવે છે.",
    "You learned: an empty place in the smaller part takes a zero.": "તમે શીખ્યા: નાના ભાગના ખાલી સ્થાનમાં શૂન્ય આવે છે.",
    "Convert 6 km 38 m into metres.": "6 કિમી 38 મી ને મીટરમાં ફેરવો.",
    "6 km 38 m in m?": "6 કિમી 38 મી, મી માં?",
    "How many places do the metres take beside kilometres?": "કિલોમીટરની સાથે મીટર કેટલાં સ્થાન લે છે?",
    "Yes, 6 km 38 m is 6,038 m.": "હા, 6 કિમી 38 મી એટલે 6,038 મી.",
    "A child writes 9 km 7 m as 9,700 m: write it in metres yourself.": "એક બાળક 9 કિમી 7 મી ને 9,700 મી લખે છે: તમે જાતે તેને મીટરમાં લખો.",
    "9 km 7 m in m?": "9 કિમી 7 મી, મી માં?",
    "7 m takes only the ones place: what fills the two places before it?": "7 મી ફક્ત એકમનું સ્થાન લે છે: તેની પહેલાંનાં બે સ્થાન શાનાથી ભરાશે?",
    "Yes, 9 km 7 m is 9,007 m.": "હા, 9 કિમી 7 મી એટલે 9,007 મી.",
    "A ribbon is 305 cm long: write its length in metres and centimetres.": "એક રિબન 305 સેમી લાંબી છે: તેની લંબાઈ મીટર અને સેન્ટિમીટરમાં લખો.",
    "305 cm in m and cm?": "305 સેમી, મી અને સેમીમાં?",
    "Beside metres, centimetres take two places: which two digits are they?": "મીટરની સાથે સેન્ટિમીટર બે સ્થાન લે છે: તે કયા બે અંક છે?",
    "Yes, the ribbon is 3 m 5 cm.": "હા, રિબન 3 મી 5 સેમી લાંબી છે.",
    /* the answer boxes, and every word and unit symbol the picture draws */
    "1 m": "1 મી", "1 cm": "1 સેમી",
    "km": "કિમી", "m": "મી", "cm": "સેમી", "mm": "મિમી",
    "Th": "હ.", "H": "શ.", "T": "દ.", "O": "એ.",
    "Step down": "નીચે જાઓ", "Step up": "ઉપર જાઓ", "Add on": "ઉમેરો", "Rebuild": "ફરી બનાવો", "Write": "લખો",
    "Put a tile on every step first, then press Enter.": "પહેલાં દરેક પગથિયે એક ટાઇલ મૂકો, પછી દાખલ કરો દબાવો.",
    "This card cannot step up now: step it down first.": "આ કાર્ડ હમણાં ઉપર નહીં જઈ શકે: પહેલાં તેને નીચે લઈ જાઓ.",
    "This card is on the lowest rung, so it can only step up.": "આ કાર્ડ સૌથી નીચેના દાંડા પર છે, તેથી ફક્ત ઉપર જઈ શકે.",
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
    concept: "Each step has its own number",
    conceptId: "M1.S2.T3.C10", objectiveIds: ["O3"],
    says: ["Each step joins two units, and each step has its own number."],
    /* the guide steps lay the three measures beside their rungs; no number is printed on a step until it is answered */
    steps: [
      { say: "Tap the ruler to lay it beside the centimetre rung.", on: "ruler", hint: "The ruler is the first one, on the left of the tray." },
      { say: "Now tap the metre stick to lay it beside the metre rung.", on: "stick", hint: "The metre stick is the left one of the two in the tray." },
      { say: "Last, tap the road sign to stand it by the kilometre rung.", on: "sign", hint: "The road sign is the only one left in the tray." },
    ],
    stepHold: 900,
    ladder: ["How many of the smaller unit fit into one of the larger?", "Check each step against the ruler, the metre stick or the road sign."],
    closing: "Each step has its own number: 10, 100 and 1,000.",
    learned: "You learned: 10, 100 and 1,000 each join a different pair of units.",
    traceback: "The step that joins the two units lights, metre sticks are laid out in centimetres, the right number shows on the step and the length is written in both units.",
    items: [
      /* learn ML1: answer in the plan = No. 3 m is 300 cm, because a hundred centimetres make a metre (the number is asked: the child checks the claim by writing it) */
      { qid: "M1.S2.T3.C10:ML1", kind: "claim", step: 1, count: 3, answer: 300, near: 30, winMs: 3600,
        say: "A child writes 3 m as 30 cm: how many centimetres is 3 m really?",
        ask: "3 m is how many cm?", miss: "The long marks on the metre stick are 10 cm apart: count the gaps.",
        win: "Yes, 3 m is 300 cm, not 30 cm." },
      /* practice 1: answer in the plan = 100 cm make a metre, and 10 mm make a centimetre */
      { qid: "M1.S2.T3.C10:1", kind: "pair", parts: [{ label: "1 m", unit: "cm" }, { label: "1 cm", unit: "mm" }], answer: [100, 10], near: "10|10", winMs: 3600,
        say: "How many centimetres make a metre, and how many millimetres make a centimetre?",
        ask: "cm in 1 m? mm in 1 cm?", miss: "Read the metre stick for the first box and the ruler for the second.",
        win: "Yes, 100 cm make 1 m and 10 mm make 1 cm." },
      /* practice 2: answer in the plan = 10, 100 and 1000 (read bottom step to top step) */
      { qid: "M1.S2.T3.C10:2", kind: "tiles", pad: "enter", answer: "10|100|1000", near: "100|10|1000", winMs: 3600,
        say: "Set each number tile on the step it belongs to, then press Enter.",
        ask: "Set each tile on its step.", miss: "Start with the bottom step, the two smallest units.",
        win: "Yes, the 10 sits only between millimetres and centimetres." },
    ],
  },
  {
    n: 2,
    concept: "Larger to smaller: multiply",
    conceptId: "M1.S2.T3.C11", objectiveIds: ["O3"],
    says: ["Step it down. Which number is on this step? Now add on the metres."],
    /* the guide steps work a warm-up card, 3 km 125 m (UL_WARM[2]); no question asks about it */
    steps: [
      { say: "Tap Step down to take the 3 km down to metres.", on: "down", hint: "The Step down key is at the bottom right." },
      { say: "Now tap Add on to bring the 125 m down to join them.", on: "add", hint: "The Add on key stands where Step down was." },
    ],
    stepHold: 900,
    ladder: ["Which part of the card gets multiplied, and by which number?", "Start with 1 of the larger unit: how many of the smaller unit is that?"],
    closing: "Larger to smaller: multiply by the step's number, then add the smaller part.",
    learned: "You learned: larger to smaller, multiply and add the smaller part.",
    traceback: "The card steps down with the step's number lit, the larger part is multiplied by it and the smaller part added, and the card reads the whole length.",
    items: [
      /* learn ML2: answer in the plan = 7245 m */
      { qid: "M1.S2.T3.C11:ML2", kind: "down", from: 3, big: 7, small: 245, answer: 7245, near: 945, winMs: 3600,
        say: "Convert 7 km 245 m into metres.", ask: "7 km 245 m in m?",
        miss: "Which step is the card crossing, and what number is on it?", win: "Yes, 7 km 245 m is 7,245 m." },
      /* practice 3: answer in the plan = 900 cm */
      { qid: "M1.S2.T3.C11:3", kind: "down", from: 2, big: 9, small: 0, answer: 900, near: 90, winMs: 3600,
        say: "How many centimetres is 9 m?", ask: "9 m in cm?",
        miss: "Read the number painted between metres and centimetres.", win: "Yes, 9 m is 900 cm." },
      /* practice 4: answer in the plan = 127 mm, because 12 cm is 120 mm and 7 mm more makes 127 mm */
      { qid: "M1.S2.T3.C11:4", kind: "down", from: 1, big: 12, small: 7, answer: 127, near: 120, winMs: 3600,
        say: "Write 12 cm 7 mm all in millimetres.", ask: "12 cm 7 mm in mm?",
        miss: "Multiply the centimetres first, then bring the millimetres along.", win: "Yes, 12 cm 7 mm is 127 mm." },
    ],
  },
  {
    n: 3,
    concept: "Smaller to larger: divide and keep the rest",
    conceptId: "M1.S2.T3.C12", objectiveIds: ["O4"],
    says: ["How many whole metres are in it? What is left stays in centimetres."],
    /* the guide steps work a warm-up card, 250 cm (UL_WARM[3]); no question asks about it */
    steps: [
      { say: "Tap Step up to find the whole metres in 250 cm.", on: "up", hint: "The Step up key is at the bottom right." },
      { say: "Now tap Rebuild to put the card back together.", on: "rebuild", hint: "The Rebuild key stands where Step up was." },
    ],
    stepHold: 900,
    ladder: ["How many whole larger units fit, and what is left over?", "Check: whole units times the step's number, plus the rest, give the card again."],
    closing: "Divide by the step's number: the quotient is the larger unit, the rest stays.",
    learned: "You learned: smaller to larger, divide and keep the rest.",
    traceback: "The card steps up: the quotient climbs to the larger rung, the remainder drops into the slot, the rebuild gives the card again, and the child's answer is rebuilt beside it.",
    items: [
      /* learn ML3: answer in the plan = 5 m 70 cm */
      { qid: "M1.S2.T3.C12:ML3", kind: "up", from: 1, total: 570, parts: [{ label: "m" }, { label: "cm" }], answer: [5, 70], near: "5|7", winMs: 3600,
        say: "Write 570 cm in metres and centimetres.", ask: "570 cm in m and cm?",
        miss: "Which number joins centimetres and metres?", win: "Yes, 570 cm is 5 m 70 cm." },
      /* practice 5: answer in the plan = 8 cm 3 mm, because 83 divided by 10 is 8 remainder 3 */
      { qid: "M1.S2.T3.C12:5", kind: "up", from: 0, total: 83, parts: [{ label: "cm" }, { label: "mm" }], answer: [8, 3], near: "8|0", winMs: 3600,
        say: "Change 83 mm into centimetres and millimetres.", ask: "83 mm in cm and mm?",
        miss: "How many whole centimetres fit in 83 mm?", win: "Yes, 83 mm is 8 cm 3 mm." },
      /* practice 6: answer in the plan = 4 km 608 m, because 4608 divided by 1000 is 4 remainder 608 */
      { qid: "M1.S2.T3.C12:6", kind: "up", from: 2, total: 4608, parts: [{ label: "km" }, { label: "m" }], answer: [4, 608], near: "46|8", winMs: 3600,
        say: "A path is 4,608 m long: write its length in kilometres and metres.", ask: "4,608 m in km and m?",
        miss: "How many whole thousands are in 4,608?", win: "Yes, the path is 4 km 608 m." },
    ],
  },
  {
    n: 4,
    concept: "A zero that holds a place",
    conceptId: "M1.S2.T3.C13", objectiveIds: ["O4"],
    says: ["The metres fill the tens and the ones. What goes in the hundreds?"],
    /* the guide steps work a warm-up card, 5 km 26 m (UL_WARM[4]); no question asks about it */
    steps: [
      { say: "Tap Step down to change 5 km 26 m into metres.", on: "down", hint: "The Step down key is at the bottom right." },
      { say: "Now tap Write to put the metres on the place board.", on: "write", hint: "The Write key stands where Step down was." },
      { say: "Tap the empty box to drop a zero into it.", on: "zero", hint: "One box on the place board has no digit yet." },
    ],
    stepHold: 900,
    ladder: ["Which place does each digit on the card sit in?", "Start the smaller part at the ones place and work to the left."],
    closing: "An empty place in the smaller part is held open by a zero.",
    learned: "You learned: an empty place in the smaller part takes a zero.",
    traceback: "The place board takes the larger part and the smaller part in their own boxes, the empty box is ringed, and a grey zero drops into it.",
    items: [
      /* learn ML4: answer in the plan = 6038 m */
      { qid: "M1.S2.T3.C13:ML4", kind: "down", pb: true, from: 3, big: 6, small: 38, answer: 6038, near: 6380, winMs: 3600,
        say: "Convert 6 km 38 m into metres.", ask: "6 km 38 m in m?",
        miss: "How many places do the metres take beside kilometres?", win: "Yes, 6 km 38 m is 6,038 m." },
      /* practice 7: answer in the plan = No. It is 9007 m. The 7 m fill the ones, so zeros hold the tens and the hundreds */
      { qid: "M1.S2.T3.C13:7", kind: "down", pb: true, from: 3, big: 9, small: 7, answer: 9007, near: 9700, winMs: 3600,
        say: "A child writes 9 km 7 m as 9,700 m: write it in metres yourself.", ask: "9 km 7 m in m?",
        miss: "7 m takes only the ones place: what fills the two places before it?", win: "Yes, 9 km 7 m is 9,007 m." },
      /* practice 8: answer in the plan = 3 m 5 cm. 305 divided by 100 is 3 remainder 5; the zero was holding the tens, so it is not 3 m 50 cm */
      { qid: "M1.S2.T3.C13:8", kind: "up", pb: true, from: 1, total: 305, parts: [{ label: "m" }, { label: "cm" }], answer: [3, 5], near: "3|50", winMs: 3600,
        say: "A ribbon is 305 cm long: write its length in metres and centimetres.", ask: "305 cm in m and cm?",
        miss: "Beside metres, centimetres take two places: which two digits are they?", win: "Yes, the ribbon is 3 m 5 cm." },
    ],
  },
];

/* ── the ladder's numbers and the picture's frame ───────────────────────────────────────── */
const UL_UNITS = ["mm", "cm", "m", "km"];
const UL_WORDS = ["millimetres", "centimetres", "metres", "kilometres"];
const UL_FACT = [10, 100, 1000];        /* the number on each step: mm-cm, cm-m, m-km */
const UL_PLACES = [1, 2, 3];            /* the places the smaller unit takes beside the larger */
const UL_TRAY = [100, 1000, 10];        /* the number tiles in the tray, not in ladder order */
const UL_BIG = CONTENT.hundred;         /* the larger unit of a pair: deep blue */
const UL_SMALL = CONTENT.one;           /* the smaller unit, and what is left over: green */
const UL_ZERO = "#767676";              /* a zero that holds an empty place: grey, full size */
const UL_WOOD = "#EFCB6A";                                   /* the cm ruler (plain: an action-kit item) */
const UL_STICK = "#A8642F", UL_CREAM = "#FFF4DA";           /* the metre stick skin's plain fallback, and its uncounted wash */
const UL_SIGNW = "#E2AA5C", UL_RIM = "#7A4A1C", UL_ROAD = "#D3A46A";   /* the road sign plaque and the dirt road */
/* the picture is laid out once, 900 x 520 (it fits x 64 to 964 beside the wide keypad), placed at ox */
const UL_FW = 900, UL_FH = 520;
const UL_RY = [470, 350, 214, 52];      /* rung centres, mm at the bottom: three gaps of three sizes */
const UL_SY = [410, 282, 133];          /* step centres: mm-cm, cm-m, m-km */
const UL_LANE = 300;                    /* the cards ride here, beside the ladder */
/* (the remainder slot's place comes from ulSlot, beside the card's room on its rung) */
const UL_FSLOT = { x: 542, w: 140 };     /* free play's slot: no card shares its rung */
const UL_PX = 193;                      /* the step panels' centre across the ladder */
const UL_CH = 80;                       /* a card's height */
const UL_KEY = { x: 690, y: 432, w: 200, h: 76 };      /* the one action key, bottom right */
const UL_KEY_UP = { x: 690, y: 340, w: 200, h: 76 };   /* free play's second key, above it */
const UL_PB = { x: 300, y: 428, w: 76, h: 80, gap: 8 }; /* the place board: thousands, hundreds, tens, ones */
const UL_HEADS = ["Th", "H", "T", "O"];
const UL_KEYS: any = { down: "Step down", up: "Step up", add: "Add on", rebuild: "Rebuild", write: "Write" };
/* the guide steps' warm-up cards (no question asks about them) */
const UL_WARM: any = {
  1: { kind: "refs" },
  2: { kind: "down", from: 3, big: 3, small: 125 },
  3: { kind: "up", from: 1, total: 250 },
  4: { kind: "down", pb: true, from: 3, big: 5, small: 26 },
};
const UL_FREE0 = { r: 2, v: 4065, rem: null };
const UL_REFS = ["ruler", "stick", "sign"];
const UL_TRAYX: any = { ruler: { x: 300, w: 180 }, stick: { x: 490, w: 222 }, sign: { x: 722, w: 168 } };   /* phase 1's tray cells */
const UL_TRAY_Y = 428;                  /* the tray cells are 80 tall */

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  rungs: UL_WORDS,
  units: UL_UNITS,
  stepNumbers: UL_FACT,
  tray: UL_TRAY,
  placeBoard: ["thousands", "hundreds", "tens", "ones"],
  warmUps: ["3 km 125 m (phase 2)", "250 cm (phase 3)", "5 km 26 m (phase 4)"],
  freePlayStart: "4,065 m on the metre rung",
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers; the tiles as bottom-to-top step numbers) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (item.kind === "tiles") return (Array.isArray(v) ? v.join("|") : String(v ?? "")).replace(/[^0-9|]/g, "") === item.answer;
  return leadNumber(v) === item.answer;
};
/* oracle: every answer re-derived by a second route (every length in millimetres, division by repeated
   subtraction), sharing no code with judge or Work */
const oracle = () => {
  const mm = [1, 10, 1000, 1000000];
  return PHASES.every((p: any) => p.items.every((it: any) => {
    if (it.kind === "claim") return it.answer === (it.count * mm[it.step + 1]) / mm[it.step];
    if (it.kind === "pair") return it.answer[0] === mm[2] / mm[1] && it.answer[1] === mm[1] / mm[0];
    if (it.kind === "tiles") return it.answer === [mm[1] / mm[0], mm[2] / mm[1], mm[3] / mm[2]].join("|");
    if (it.kind === "down") return it.answer === (it.big * mm[it.from] + it.small * mm[it.from - 1]) / mm[it.from - 1];
    if (it.kind === "up") {
      let rest = it.total * mm[it.from], whole = 0;
      while (rest >= mm[it.from + 1]) { rest -= mm[it.from + 1]; whole += 1; }
      return it.answer[0] === whole && it.answer[1] === rest / mm[it.from];
    }
    return false;
  }));
};
/* the most likely wrong answer (the item's misconception); judge must reject it */
const nearMiss = (item: any) => (item.near !== undefined ? item.near : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print (a two-unit answer only as the pair,
   so a question's own "4,608" never reads as its remainder 608) */
const answerForms = (item: any) => {
  if (item.kind === "tiles") return [item.answer];
  if (item.kind === "up") {
    const [a, b] = item.answer, u1 = item.from + 1, u0 = item.from;
    return [`${a} ${UL_UNITS[u1]} ${b} ${UL_UNITS[u0]}`, `${a} ${UL_WORDS[u1]} ${b} ${UL_WORDS[u0]}`, `${words(a)} ${UL_WORDS[u1]} ${words(b)} ${UL_WORDS[u0]}`];
  }
  if (item.parts) return item.answer.flatMap((x: number) => [String(x), indian(x), words(x)]);
  return [String(item.answer), indian(item.answer), words(item.answer)];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;
/* what the slot shows: a typed number from 1,000 up with its commas */
const ulFormat = (v: any) => {
  const s = String(v ?? "");
  if (s.includes("|")) return s;
  return /^[1-9]\d{3,8}$/.test(s) ? indian(Number(s)) : s;
};

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area (the tiles): set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: undefined = press Enter (in the guide steps Enter performs the current step) */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── drawing helpers (called, never mounted) ─────────────────────────────────────────────── */

/* a text's width, estimated from its characters (stage text has no layout engine) */
const ulTw = (s: string, size: number) => {
  let w = 0;
  /* Hindi and Gujarati: a sign written above or below a letter adds no width; a vowel sign beside it adds about a third */
  for (const ch of String(s)) w += /[ऀ-ं़ु-ै्॑-ॗॢॣઁં઼ુ-ૈ્ૢૣ]/.test(ch) ? 0
    : /[ःा-ीॉ-ौॎॏઃા-ીૉોૌ]/.test(ch) ? 0.42
    : /[ऀ-૿]/.test(ch) ? 0.88
    : ch === " " ? 0.28 : ch === "," || ch === "." ? 0.3 : ch === "m" ? 0.92 : /[0-9×÷+=?]/.test(ch) ? 0.62 : 0.58;
  return w * size;
};
/* the biggest size up to `max` (never under the 28 floor) at which a text fits `w` */
const ulFit = (s: string, w: number, max: number) => Math.max(T.micro, Math.min(max, Math.floor(w / Math.max(0.01, ulTw(s, 1)))));
const ulSegsW = (segs: any[], size: number) => segs.reduce((a: number, g: any) => a + ulTw(g.s, size), 0) + 0.6 * size * Math.max(0, segs.length - 1);
const ulCol = (C: any, c: string) => (c === "big" ? shade(UL_BIG, 0.25) : c === "small" ? shade(UL_SMALL, 0.25) : c === "zero" ? UL_ZERO : C.ink);
const ulSeg = (s: string, c: string) => ({ s, c });
/* a length's digits coloured by the part they came from: the larger part deep blue, the smaller part's places
   green, and a zero that only holds one of those places grey */
function ulDigits(value: number, places: number, small: number): any[] {
  const s = indian(value), sl = small > 0 ? String(small).length : 0;
  const out: any[] = [];
  let pos = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === ",") { out.unshift({ s: ",", c: "ink" }); continue; }
    out.unshift({ s: s[i], c: pos < places ? (pos < sl ? "small" : "zero") : "big" });
    pos += 1;
  }
  return out;
}
const ulRuns = (cs: any[]) => cs.reduce((a: any[], t: any) => { const l = a[a.length - 1]; if (l && l.c === t.c) l.s += t.s; else a.push({ ...t }); return a; }, []);
/* one row of short texts, each its own label (at most 4 words), side by side with a wide gap (0.6 em, so an
   under-estimated width never lets two pieces touch): centred on x, or starting at x */
function ulLine(key: string, segs: any[], x: number, y: number, C: any, size: number = T.label, start = false) {
  let cx = start ? x : x - ulSegsW(segs, size) / 2;
  return segs.map((g: any, i: number) => {
    const el = (
      <text key={key + "-" + i} x={cx} y={y} fontSize={size} fontWeight={700} fill={ulCol(C, g.c)} style={{ whiteSpace: "pre" } as any}>
        {g.d ? g.d.map((t: any, j: number) => <tspan key={j} fill={ulCol(C, t.c)}>{t.s}</tspan>) : g.s}
      </text>
    );
    cx += ulTw(g.s, size) + 0.6 * size;
    return el;
  });
}
/* one card's numbers: it crosses step s (number F) from rung r0 to r1; an up card's quotient and remainder */
const ulCase = (it: any) => {
  const up = it.kind === "up", r0 = it.from, r1 = up ? r0 + 1 : r0 - 1, s = up ? r0 : r0 - 1, F = UL_FACT[s];
  const total = up ? it.total : it.big * F + it.small;
  return { up, r0, r1, s, F, total, q: up ? Math.floor(total / F) : 0, rem: up ? total % F : 0 };
};
/* the gaps the working lines take: the crossed step's own first, then the free ones (none under the place board) */
/* (the rebuild line always sits ABOVE the child's own line) */
const ulGaps = (s: number, pb: boolean) => [s].concat(s === 0 ? [2, 1] : s === 1 ? [2, 0] : [1, 0]).filter((g: number) => !(pb && g === 0));
/* a card's type: 60 when it fits its room (maxW), never under 40; and its width at that size */
const ulCardSize = (segs: any[], maxW: number, max = 60) => Math.max(40, Math.min(max, Math.floor((maxW - 44) / Math.max(0.01, ulSegsW(segs, 1)))));
const ulCardW = (segs: any[], maxW = 580, max = 60) => Math.max(200, Math.round(ulSegsW(segs, ulCardSize(segs, maxW, max)) + 44));
/* the room a card has on rung r: the action key stands beside the lowest rung; an up card leaves room for its slot */
const ulRoom = (r: number, slot = false) => (slot ? (r === 0 ? 236 : 300) : r === 0 ? 380 : 580);
/* the remainder slot beside an up card on rung r */
const ulSlot = (r: number, pb = false) => ({ x: UL_LANE + ulRoom(r, true) + 12, w: r === 0 ? 130 : 150, y: UL_RY[r] - 40 - (pb ? 12 : 0) });
/* the tiles set on the steps, read bottom step to top step, or null while a step is empty */
const ulPlacing = (tiles: any) => {
  const on: any = {};
  Object.keys(tiles || {}).forEach((k) => { on[tiles[k]] = Number(k); });
  return [0, 1, 2].every((s) => on[s]) ? [0, 1, 2].map((s) => on[s]).join("|") : null;
};
const ulKeepRight = (tiles: any) => {
  const t: any = {};
  Object.keys(tiles || {}).forEach((k) => { if (UL_FACT[tiles[k]] === Number(k)) t[k] = tiles[k]; });
  return t;
};
/* the card an item starts from, as the book writes it */
const ulCardText = (it: any) => (it.kind === "down" ? `${it.big} ${UL_UNITS[it.from]}${it.small ? ` ${it.small} ${UL_UNITS[it.from - 1]}` : ""}`
  : it.kind === "up" ? `${indian(it.total)} ${UL_UNITS[it.from]}` : "");

/* ── the working area ────────────────────────────────────────────────────────────────────────
   keyOnly: the area is 1472 x 520 shut, 900 x 520 open (bigPad); box.key is the key's corner. The picture is
   laid out ONCE, 900 x 520, at ox (centred when shut, never under the key's corner). The ladder stands at the
   left (x 0-284: four rungs mm, cm, m, km, a step panel between each two), the card rides in the lane beside its
   rung (x 300-), the remainder slot sits on the rung the card came from (x 530-680), the working lines sit in
   the gaps beside the steps, the action key at the bottom right (x 690-890), and phase 4's place board under
   the lane. Phase 1 has the ruler, the metre stick and the road sign beside their rungs, and its tiles' tray.
   Every act is performed on screen (api.act: the hand carries the card across a step, a pencil writes the
   place board). `wrong` = { value, tries } after a miss: lock, redraw the maths in three steps ending on the
   whole right answer (a pointerEvents="none" layer), unlock; never marked. stage "free": step the card up and
   down the ladder as often as the child likes. */
function Work({ phase, n, item, index, stage, wrong, typed, api, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const un = (k: number) => tx(UL_UNITS[k]);
  /* Hindi and Gujarati: a card's type tops at 48 and sits lower, so a matra never meets the card's outline */
  const dev = lang === "hi" || lang === "gu", cardMax = dev ? 48 : 60;
  const pn = phase && phase.n ? phase.n : n;
  const free = stage === "free";
  /* a phase opens on "teach" for one frame before "demo": both are the warm-up */
  const warm = !free && (stage === "demo" || stage === "teach") && !!UL_WARM[pn];
  const won = !free && (stage === "win" || stage === "idle");
  const it: any = free ? {} : warm ? UL_WARM[pn] : (item || {});
  const cs = !free && (it.kind === "down" || it.kind === "up") ? ulCase(it) : null;

  /* the picture's place: one size, 900 wide, centred when the keypad is shut, never under the key's corner */
  const bw = box ? box.w : UL_FW, bh = box ? box.h : UL_FH;
  const kx = box && box.key ? box.key.x - 12 : bw;
  const ox = Math.round(Math.max(0, Math.min((bw - UL_FW) / 2, kx - UL_FW)));
  const oy = Math.round(Math.max(0, (bh - UL_FH) / 2));
  const P = (x: number, y: number) => ({ x: x + ox, y: y + oy });

  /* the board belongs to an ENTRY (a question opened, the warm-up, free play), never to a question id */
  const qk = free ? "free" : warm ? "w" + pn : "q" + pn + "." + index;
  const entry = useRef<any>({ qk: "", n: 0 });
  if (entry.current.qk !== qk) entry.current = { qk, n: entry.current.n + 1 };
  const ek = qk + "#" + entry.current.n;
  const ekRef = useRef(ek);
  ekRef.current = ek;
  const fresh = (k: string) => ({ k, laid: {}, crossed: 0, rebuilt: false, wrote: 0, zero: false, tiles: {}, held: null, ghost: false, nudge: false, demo: null, moving: "", fp: UL_FREE0, fline: null });
  const [raw, setRaw] = useState<any>(() => fresh(ek));
  const S = raw.k === ek ? raw : fresh(ek);
  const sRef = useRef(S);
  sRef.current = S;
  /* a write belongs to the entry that was open when it was made: one that lands after the entry changed is dropped */
  const put = (patch: any) => {
    const k = ekRef.current;
    setRaw((p: any) => {
      if (k !== ekRef.current) return p;
      const b = p.k === k ? p : fresh(k);
      return { ...b, ...(typeof patch === "function" ? patch(b) : patch) };
    });
  };
  /* the tiles as just set (the agent's answer() and Enter can come in one tick) */
  const tilesNow = useRef<any>({ k: "", t: {} });
  if (tilesNow.current.k !== ek) tilesNow.current = { k: ek, t: S.tiles };
  const setTiles = (t: any, more: any = {}) => { tilesNow.current = { k: ekRef.current, t }; put({ tiles: t, ...more }); };

  /* ── acts: every act is performed on screen (api.act); the board changes when it resolves true ── */
  const playing = useRef(false);
  /* a tap that comes while an act of ours is still settling is kept (the last one) and run when it is free */
  const pending = useRef<any>(null);
  const perform = (o: any, hide: string, patch: any, after?: () => void) => {
    if (playing.current) return;
    const mine = ekRef.current;
    playing.current = true;
    if (hide) put({ moving: hide });
    api.act(o).then((ok: boolean) => {
      playing.current = false;
      if (ekRef.current !== mine) { pending.current = null; return; }
      put((b: any) => ({ moving: "", ...(ok ? (typeof patch === "function" ? patch(b) : patch) : {}) }));
      if (ok && after) after();
      const next = pending.current;
      pending.current = null;
      if (next) setTimeout(() => { if (ekRef.current === mine) next(); }, 60);
    });
  };
  const cardNode = (key: string, segs: any[], w: number, lit: boolean, size: number) => (
    <g key={key}>
      <rect x={-w / 2} y={-UL_CH / 2} width={w} height={UL_CH} rx={18} fill="#FFFFFF" stroke={lit ? C.accent : C.ink} strokeWidth={lit ? 5 : 3} filter="url(#fShadowSoft)" />
      {ulLine(key + "t", segs, 0, Math.round(size * (dev ? 0.42 : 0.36)), C, size)}
    </g>
  );
  const carry = (segs: any[], r0: number, room0: number, r1: number, w1: number) => {
    const w0 = ulCardW(segs, room0, cardMax);
    return { tool: "hand", moves: "carry", from: P(UL_LANE + w0 / 2, UL_RY[r0]), to: P(UL_LANE + w1 / 2, UL_RY[r1]),
      hold: <g>{cardNode("hold", segs, w0, false, ulCardSize(segs, room0, cardMax))}</g> };
  };
  const boxX = (i: number) => UL_PB.x + i * (UL_PB.w + UL_PB.gap);

  /* the card's segments at the start of a question or warm-up */
  const startSegs = (): any[] => {
    if (!cs) return [];
    if (cs.up) return [ulSeg(`${indian(it.total)} ${un(cs.r0)}`, "ink")];
    return [ulSeg(`${indian(it.big)} ${un(cs.r0)}`, "big")].concat(it.small ? [ulSeg(`${indian(it.small)} ${un(cs.r1)}`, "small")] : []);
  };
  const qSegs = (): any[] => (cs ? [ulSeg(`? ${un(cs.r1)}`, "ink")] : []);
  const resSegs = (): any[] => {
    if (!cs) return [];
    if (cs.up) return [ulSeg(`${indian(cs.q)} ${un(cs.r1)}`, "big")];
    const s = `${indian(cs.total)} ${un(cs.r1)}`;
    return [{ s, d: ulRuns(ulDigits(cs.total, UL_PLACES[cs.s], it.small)).concat([{ s: " " + un(cs.r1), c: "ink" }]) }];
  };
  /* the written box indexes of the warm-up's place board (the zero places are left for the zero) */
  const pbDigits = (): any[] => {
    if (!cs) return [];
    const ds = ulDigits(cs.total, UL_PLACES[cs.s], cs.up ? cs.rem : it.small).filter((t: any) => t.s !== ",");
    return Array.from({ length: 4 - ds.length }, () => ({ s: "", c: "ink" })).concat(ds);
  };
  const slotG = cs && cs.up ? ulSlot(cs.r0, !!it.pb) : null;

  const freeAct = (on: string) => {
    const f = S.fp;
    const canUp = f.r < 3 && f.rem === null && f.v >= UL_FACT[f.r], canDown = f.r > 0;
    /* a quiet key says why it cannot move the card (one line each) */
    if (on === "free-up" && !canUp) { api.say("This card cannot step up now: step it down first."); return; }
    if (on === "free-down" && !canDown) { api.say("This card is on the lowest rung, so it can only step up."); return; }
    const from = [ulSeg(`${indian(f.v)} ${un(f.r)}`, "ink")];
    if (on === "free-down") {
      const F = UL_FACT[f.r - 1], v2 = f.v * F + (f.rem ?? 0), seg1 = [ulSeg(`${indian(v2)} ${un(f.r - 1)}`, "ink")];
      perform(carry(from, f.r, ulRoom(f.r), f.r - 1, ulCardW(seg1, ulRoom(f.r - 1), cardMax)), "card",
        { fp: { r: f.r - 1, v: v2, rem: null }, fline: { s: f.r - 1, kind: "down", v: f.v, F, rem: f.rem } }, () => api.sfx.settle());
    }
    if (on === "free-up") {
      const F = UL_FACT[f.r], q = Math.floor(f.v / F), rm = f.v % F, seg1 = [ulSeg(`${indian(q)} ${un(f.r + 1)}`, "big")];
      perform(carry(from, f.r, ulRoom(f.r), f.r + 1, ulCardW(seg1, ulRoom(f.r + 1), cardMax)), "card",
        { fp: { r: f.r + 1, v: q, rem: rm }, fline: { s: f.r, kind: "up", v: f.v, F, rem: null } }, () => api.sfx.trade());
    }
  };

  /* the act of a key or a piece: in the guide steps only the awaited one is done, any other is reported */
  const act = (on: string) => {
    if (warm) {
      if (!stepOn) return;
      if (on !== stepOn) { api.did(on); return; }
    }
    if (tl.busy) return;
    if (playing.current) { pending.current = () => act(on); return; }
    if (free) { freeAct(on); return; }
    if (UL_REFS.indexOf(on) >= 0) {
      /* phase 1's warm-up: the kit's ruler slides in beside the centimetre rung; the hand carries the stick and the sign */
      if (!warm || pn !== 1 || S.laid[on]) return;
      const cx = UL_TRAYX[on].x + UL_TRAYX[on].w / 2, cy = UL_TRAY_Y + 40;
      const o = on === "ruler" ? { tool: "ruler", moves: "slide", from: P(300, 322), to: P(660, 322), at: [0, 1, 2, 3].map((c) => P(316 + c * 110, 322)) }
        : on === "stick" ? { tool: "hand", moves: "carry", from: P(cx, cy), to: P(590, 214), hold: <g>{miniRef("stick", true)}</g> }
        : { tool: "hand", moves: "carry", from: P(cx, cy), to: P(364, 39), hold: <g>{miniRef("sign", true)}</g> };
      perform(o, on, (b: any) => ({ laid: { ...b.laid, [on]: true } }), () => { api.sfx.settle(); api.did(on); });
      return;
    }
    if (!cs) return;
    if ((on === "down" || on === "up") && !S.crossed) {
      const seg1 = warm && pn === 2 ? [ulSeg(`${indian(it.big * cs.F)} ${un(cs.r1)}`, "big")] : warm && pn === 3 ? resSegs() : qSegs();
      perform(carry(startSegs(), cs.r0, ulRoom(cs.r0, cs.up), cs.r1, ulCardW(seg1, ulRoom(cs.r1), cardMax)), "card", { crossed: 1 }, () => { api.sfx.settle(); if (warm) api.did(on); });
    } else if (on === "add" && S.crossed === 1) {
      const chip = [ulSeg(`${indian(it.small)} ${un(cs.r1)}`, "small")];
      perform(carry(chip, cs.r0, ulRoom(cs.r0), cs.r1, ulCardW(resSegs(), ulRoom(cs.r1), cardMax)), "chip", { crossed: 2 }, () => { api.sfx.trade(); api.did("add"); });
    } else if (on === "rebuild" && S.crossed && !S.rebuilt && slotG) {
      perform({ tool: "hand", moves: "tap", at: [P(UL_LANE + ulCardW(resSegs(), ulRoom(cs.r1), cardMax) / 2, UL_RY[cs.r1]), P(slotG.x + slotG.w / 2, slotG.y + 36)] }, "",
        { rebuilt: true }, () => { api.sfx.trade(); api.did("rebuild"); });
    } else if (on === "write" && S.crossed && S.wrote < 3) {
      const idx = pbDigits().map((d: any, i: number) => (d.c !== "zero" && d.s ? i : -1)).filter((i: number) => i >= 0);
      perform({ tool: "pencil", moves: "push", at: idx.map((i: number) => P(boxX(i) + UL_PB.w / 2, UL_PB.y + UL_PB.h / 2)),
        onPoint: (i: number) => put({ wrote: i + 1 }) }, "", { wrote: 3 }, () => api.did("write"));
    } else if (on === "zero" && S.wrote >= 3 && !S.zero) {
      perform({ tool: "pencil", moves: "push", at: [P(boxX(1) + UL_PB.w / 2, UL_PB.y + UL_PB.h / 2)], onPoint: () => put({ zero: true }) }, "",
        { zero: true }, () => api.did("zero"));
    }
  };
  /* one key, its label following the act; a 400 ms guard so one tap never also presses the next label */
  const lastKey = useRef(0);
  const pressKey = (on: string) => {
    const t = Date.now();
    if (t - lastKey.current < 400) return;
    lastKey.current = t;
    act(on);
  };
  /* Enter in the guide steps: a second Enter within 180 ms is the same press (the agent's checks come 300 ms apart) */
  const lastEnter = useRef(0);
  const enterStep = () => {
    const t = Date.now();
    if (t - lastEnter.current < 180) return;
    lastEnter.current = t;
    if (stepOn) act(stepOn);
  };

  /* ── phase 1's tiles: tap a tile, then a step (or drag it there); Enter judges the three ── */
  const tilesQ = !free && pn === 1 && it.kind === "tiles";
  const live = tilesQ && stage === "ask" && !tl.busy;
  /* when each tile last landed on a step: a second tap of a double tap (400 ms) never lifts it off again */
  const placedAt = useRef<any>({});
  /* the child's own move ends a correction's ghosts and lights; after an early-Enter nudge the question comes back */
  const moved = (more: any = {}) => {
    if (sRef.current.nudge && it.say) api.say(it.say);
    return { held: null, nudge: false, demo: null, ghost: false, ...more };
  };
  const place = (v: number, s: number) => {
    const t: any = {};
    Object.keys(tilesNow.current.t).forEach((k) => { if (tilesNow.current.t[k] !== s) t[k] = tilesNow.current.t[k]; });
    t[v] = s;
    placedAt.current[v] = Date.now();
    setTiles(t, moved());
    api.sfx.tick();
  };
  const unplace = (v: number) => {
    const t: any = { ...tilesNow.current.t };
    delete t[v];
    setTiles(t, moved());
  };
  const tapTile = (v: number) => {
    if (!live) return;
    const on = tilesNow.current.t[v], h = sRef.current.held;
    if (on !== undefined && Date.now() - (placedAt.current[v] || 0) < 400) return;
    if (h === null) { if (on !== undefined) unplace(v); else put(moved({ held: v })); return; }
    if (h === v) { put({ held: null }); return; }
    if (on !== undefined) place(h, on); else put(moved({ held: v }));
  };
  const tapStep = (s: number) => { if (live && sRef.current.held !== null) place(sRef.current.held, s); };
  const drag = useDrag((pl: any, p: any, mv: boolean) => {
    if (!pl || pl.tile === undefined || !live) return;
    if (!mv || !isFinite(p.x)) { tapTile(pl.tile); return; }
    const fx = p.x - ox, fy = p.y - oy;
    const s = fx >= 40 && fx <= 300 ? [0, 1, 2].reduce((b: any, k: number) => (Math.abs(fy - UL_SY[k]) <= 44 ? k : b), null) : null;
    if (s !== null) place(pl.tile, s);
    else if (tilesNow.current.t[pl.tile] !== undefined) unplace(pl.tile);
  });
  const placed = ulPlacing(S.tiles);
  const enterTiles = () => {
    if (!live) return;
    const t = Date.now();
    if (t - lastEnter.current < 180) return;
    lastEnter.current = t;
    const p = ulPlacing(tilesNow.current.t);
    if (!p) { if (!sRef.current.nudge) api.say("Put a tile on every step first, then press Enter."); put({ nudge: true }); return; }
    api.submit(p);
  };
  HOOK.set = (v: any) => {
    const vals = (Array.isArray(v) ? v : String(v ?? "").split("|")).map((x: any) => Number(String(x).replace(/[^0-9]/g, "")));
    if (vals.length !== 3 || vals.some((x: number) => UL_FACT.indexOf(x) < 0) || new Set(vals).size !== 3) return false;
    const t: any = {};
    vals.forEach((x: number, s: number) => { t[x] = s; });
    setTiles(t, { held: null, nudge: false, demo: null, ghost: false });
    return true;
  };
  HOOK.demo = () => { if (warm && stepOn) act(stepOn); };
  HOOK.check = undefined;
  useEffect(() => { if (tilesQ && stage === "ask") api.answerReady(!!placed && !tl.busy); }, [tilesQ, stage, placed, ek, tl.busy]);

  /* typing never outgrows the boxes the picture draws: 4 digits on the place board, 5 in any other box */
  useEffect(() => {
    if (free || stage !== "ask" || typeof typed !== "string") return;
    const cap = it.pb && !it.parts ? 4 : 5;
    const ps = typed.split("|");
    if (ps.some((p: string) => p.replace(/\D/g, "").length > cap)) api.setTyped(ps.map((p: string) => p.replace(/\D/g, "").slice(0, cap)).join("|"));
  }, [typed]);

  /* Enter: in the guide steps it performs the current step; on the tiles question it judges the tiles */
  api.onEnter(warm && stepOn ? enterStep : tilesQ && stage === "ask" ? enterTiles : null);

  /* ── the traceback: three steps ending on the whole right answer, then the pad unlocks ── */
  const lockRef = useRef(false);
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    const mine = ekRef.current, k = it.kind, v = wrong.value;
    lockRef.current = true;
    api.lock(true);
    const at = (n2: number, extra: any) => () => {
      if (ekRef.current !== mine) return;
      /* the tiles question: a tile on a step it does not belong to slides back to the tray */
      if (k === "tiles" && n2 === 1) { const t = ulKeepRight(tilesNow.current.t); tilesNow.current = { k: mine, t }; extra = { tiles: t }; }
      put({ demo: { lv: n2, v }, held: null, nudge: false, ...(extra || {}) });
    };
    tl.run([
      [900, at(1, null)],
      [1000, at(2, k === "tiles" ? { ghost: true } : cs ? { crossed: 1 } : null)],
      [900, at(3, null)],
    ], () => {
      lockRef.current = false;
      api.lock(false);
      if (k === "tiles" && ekRef.current === mine) put({ demo: null });
    });
  }, [wrong]);
  /* a correction never outlives its question */
  useEffect(() => () => { tl.stop(); if (lockRef.current) { lockRef.current = false; api.lock(false); } }, [qk]);

  /* the win line, said once at the win (the runtime shows the phase's closing in its place at a phase's last) */
  const saidWin = useRef("");
  useEffect(() => { if (stage === "win" && !free && it.win && saidWin.current !== ek) { saidWin.current = ek; api.say(it.win); } }, [stage, ek]);

  const lv = won ? 3 : S.demo ? S.demo.lv : 0;

  /* ── the ladder ── */
  const stepView = (s: number): any => {
    if (free) return { v: indian(UL_FACT[s]), lit: !!S.fline && S.fline.s === s };
    if (pn !== 1) return { v: indian(UL_FACT[s]), lit: !!cs && s === cs.s && (S.crossed > 0 || lv >= 1) };
    const rel = it.kind === "claim" ? s === it.step : it.kind === "pair" ? s <= 1 : false;
    if (it.kind === "tiles") {
      const tiled = UL_TRAY.some((t) => S.tiles[t] === s);
      return { v: !tiled && S.ghost ? indian(UL_FACT[s]) : null, ghost: !tiled && S.ghost, blank: !tiled, hideNum: tiled };
    }
    return { v: S.demo && S.demo.lv >= 2 && rel ? indian(UL_FACT[s]) : null, ghost: !!(S.demo && S.demo.lv >= 2 && rel), lit: !!(S.demo && rel), blank: true };
  };
  const ladder = () => (
    <g pointerEvents="none">
      {[100, 272].map((x) => <rect key={"rail" + x} x={x} y={14} width={14} height={492} rx={7} fill={tint(C.rule, 0.25)} stroke={shade(C.rule, 0.35)} strokeWidth={2} />)}
      {[0, 1, 2, 3].map((r) => (
        <g key={"rung" + r}>
          <rect x={0} y={UL_RY[r] - (lang === "en" ? 22 : 25)} width={284} height={lang === "en" ? 44 : 50} rx={12} fill={C.panel} stroke={C.ink} strokeWidth={2.5} />
          <text x={52} y={UL_RY[r] + (lang === "en" ? 13 : 16)} textAnchor="middle" fontSize={ulFit(un(r), 84, lang === "en" ? T.label + 4 : T.label)} fontWeight={700} fill={C.ink}>{un(r)}</text>
        </g>
      ))}
      {[0, 1, 2].map((s) => {
        const sv = stepView(s), nudged = tilesQ && S.nudge && sv.blank && [0, 1, 2].filter((k) => stepView(k).blank)[0] === s;
        return (
          <g key={"step" + s}>
            <rect x={UL_PX - 75} y={UL_SY[s] - 28} width={150} height={56} rx={12} fill={sv.lit || sv.ghost ? tint(C.accent, 0.88) : "#FFFFFF"}
              stroke={sv.lit || sv.ghost ? C.accent : C.ink} strokeWidth={sv.lit ? 5 : sv.ghost ? 3.5 : 2.5} strokeDasharray={sv.blank && !sv.lit ? "9 7" : undefined} />
            {sv.lit && <rect x={UL_PX - 81} y={UL_SY[s] - 34} width={162} height={68} rx={16} fill="none" stroke={ringC} strokeWidth={7} />}
            {sv.v && <text x={UL_PX} y={UL_SY[s] + 13} textAnchor="middle" fontSize={T.label + 4} fontWeight={700} fill={sv.ghost ? shade(C.accent, 0.35) : C.ink}>{sv.v}</text>}
            {nudged && <rect className="c4-pulse" x={UL_PX - 81} y={UL_SY[s] - 34} width={162} height={68} rx={16} fill="none" stroke={C.accent} strokeWidth={5} />}
          </g>
        );
      })}
    </g>
  );

  /* a working line in a gap beside the steps */
  /* a working line in a gap: 32, shrinking (never under 28) to stay inside the canvas, or left of free play's keys */
  const gapLine = (key: string, g: number, segs: any[], maxW = 580) => (
    <g key={key}>{ulLine(key, segs, UL_LANE + 6, UL_SY[g] + (dev && g === 0 ? 14 : 9), C, Math.max(T.micro, Math.min(T.label, Math.floor(maxW / Math.max(0.01, ulSegsW(segs, 1))))), true)}</g>
  );
  /* the remainder slot on rung r */
  const slotNode = (r: number, val: any, lit: boolean, tone: string, g: any) => {
    const y = g.y, UL_SLOTX = g.x, UL_SLOTW = g.w;
    return (
      <g key={"slot" + r}>
        <rect x={UL_SLOTX} y={y} width={UL_SLOTW} height={72} rx={14} fill="#FFFFFF" stroke={lit ? C.accent : C.ink} strokeWidth={lit ? 5 : 2.5} strokeDasharray={val === null ? "9 7" : undefined} />
        <text x={UL_SLOTX + UL_SLOTW / 2} y={y + 49} textAnchor="middle" fontSize={ulFit(val === null ? un(r) : val + " " + un(r), UL_SLOTW - 16, T.prompt)} fontWeight={700} fill={ulCol(C, tone)}>{val === null ? un(r) : val + " " + un(r)}</text>
      </g>
    );
  };
  const laneCard = (key: string, r: number, segs: any[], lit = false, room = 580, dy = 0) => {
    const w = ulCardW(segs, room, cardMax);
    return <g key={key} transform={`translate(${UL_LANE + w / 2},${UL_RY[r] + dy})`}>{cardNode(key + "c", segs, w, lit, ulCardSize(segs, room, cardMax))}</g>;
  };
  /* the place board: one digit to a box; `ring` = the box that waits for its zero */
  const board = (digs: any[], ring: number | null) => (
    <g key="pb">
      {UL_HEADS.map((h, i) => {
        const x = boxX(i), d = digs[i];
        return (
          <g key={"pb" + i}>
            <text x={x + UL_PB.w / 2} y={UL_PB.y - (dev ? 6 : 10)} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(h)}</text>
            <rect x={x} y={UL_PB.y} width={UL_PB.w} height={UL_PB.h} rx={12} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} />
            {d && d.s && <text x={x + UL_PB.w / 2} y={UL_PB.y + 60} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={ulCol(C, d.c)}>{d.s}</text>}
            {ring === i && <rect className="c4-pulse" x={x - 5} y={UL_PB.y - 5} width={UL_PB.w + 10} height={UL_PB.h + 10} rx={16} fill="none" stroke={C.accent} strokeWidth={5} />}
          </g>
        );
      })}
    </g>
  );

  /* ── phase 1: the ruler, the metre stick and the road sign beside their rungs ──
     skins (images.tsx): `stick` (stretched along its length, a pale cream wash while uncounted, deep blue when counted:
     the dark-skin rule), `sign` (always 1.64:1, "1 km" written on in code), `road` (exactly 720:56); the ruler is plain */
  /* a lit measure: a 7-wide ring in the theme's berry, 6 outside the thing (never red) */
  const ringC = (THEME && THEME.enter && THEME.enter[1]) || C.accent;
  const litRing = (key: string, x: number, y: number, w: number, h: number) => (
    <rect key={key} x={x - 6} y={y - 6} width={w + 12} height={h + 12} rx={12} fill="none" stroke={ringC} strokeWidth={7} />
  );
  const stickNode = (key: string, x: number, y: number, w: number, h: number, counted: boolean, bare = false) => (
    <g key={key}>
      <rect x={x} y={y} width={w} height={h} rx={Math.min(8, h / 3)} fill={UL_STICK} />
      {!bare && <Skin name="stick" x={x} y={y} w={w} h={h} fit="stretch" />}
      <rect x={x} y={y} width={w} height={h} rx={Math.min(8, h / 3)} fill={counted ? shade(UL_BIG, 0.25) : UL_CREAM} fillOpacity={counted ? 0.82 : 0.6}
        stroke={C.ink} strokeWidth={2.5} />
    </g>
  );
  const signNode = (key: string, cx: number, cy: number, h: number, bare = false) => {
    const w = Math.round(h * 1.64);
    return (
      <g key={key}>
        <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={12} fill={UL_SIGNW} />
        {!bare && <Skin name="sign" x={cx - w / 2} y={cy - h / 2} w={w} h={h} fit="stretch" />}
        <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={12} fill="none" stroke={UL_RIM} strokeWidth={3} />
        <text x={cx} y={cy + h * 0.17} textAnchor="middle" fontSize={ulFit("1 " + un(3), w - 16, T.label + 4)} fontWeight={700} fill={C.ink} style={{ whiteSpace: "pre" } as any}>{"1 " + un(3)}</text>
      </g>
    );
  };
  /* the pictures in phase 1's tray (and in the hand that carries them), centred on 0,0 */
  const miniRef = (k: string, bare = false) => (k === "ruler" ? (
    <g>
      <rect x={-82} y={-23} width={164} height={46} rx={5} fill={UL_WOOD} stroke={C.ink} strokeWidth={2.5} />
      {Array.from({ length: 21 }).map((_, i) => <line key={"mr" + i} x1={-74 + i * 7.4} y1={-23} x2={-74 + i * 7.4} y2={i % 10 === 0 ? -5 : i % 5 === 0 ? -9 : -14} stroke={C.ink} strokeWidth={1.5} />)}
    </g>
  ) : k === "stick" ? (
    <g>
      {stickNode("ms", -102, -15, 204, 30, false, bare)}
      {Array.from({ length: 11 }).map((_, i) => <line key={"ms" + i} x1={-96 + i * 19.2} y1={-15} x2={-96 + i * 19.2} y2={i % 5 === 0 ? 0 : -6} stroke={C.ink} strokeWidth={1.6} />)}
    </g>
  ) : signNode("mg", 0, 0, 72, bare));
  const refs = (show: any, lit: any) => (
    <g key="refs">
      {show.ruler && <g>
      <rect x={300} y={322} width={360} height={56} rx={6} fill={UL_WOOD} stroke={C.ink} strokeWidth={2.5} />
      {Array.from({ length: 31 }).map((_, i) => (
        <line key={"rt" + i} x1={316 + i * 11} y1={322} x2={316 + i * 11} y2={322 + (i % 10 === 0 ? 22 : i % 5 === 0 ? 16 : 10)} stroke={C.ink} strokeWidth={i % 10 === 0 ? 2.5 : 1.5} />
      ))}
      {[0, 1, 2, 3].map((c) => <text key={"rn" + c} x={316 + c * 110} y={374} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{c}</text>)}
      {lit.ruler && litRing("lr", 300, 322, 360, 56)}
      </g>}
      {show.stick && <g>
      {stickNode("stk", 300, 190, 580, 48, false)}
      {Array.from({ length: 101 }).map((_, i) => (
        <line key={"st" + i} x1={310 + i * 5.6} y1={190} x2={310 + i * 5.6} y2={190 + (i % 10 === 0 ? 13 : 6)} stroke={C.ink} strokeWidth={i % 10 === 0 ? 2 : 1.2} />
      ))}
      <text x={312} y={234} fontSize={T.label} fontWeight={700} fill={C.ink}>0</text>
      <text x={868} y={234} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink} style={{ whiteSpace: "pre" } as any}>{"1 " + un(2)}</text>
      {lit.stick && litRing("ls", 300, 190, 580, 48)}
      </g>}
      {show.sign && <g>
      {/* the kilometre road, as long as the metre stick at least, with a break mark: it goes on far beyond the picture */}
      <rect x={300} y={50} width={580} height={45} rx={8} fill={UL_ROAD} />
      <Skin name="road" x={300} y={50} w={580} h={45} fit="stretch" />
      <path d="M 818 44 L 804 101 M 836 44 L 822 101" stroke={C.paper} strokeWidth={9} />
      <path d="M 818 44 L 804 101 M 836 44 L 822 101" stroke={C.ink} strokeWidth={2} />
      {signNode("sgn", 364, 39, 78)}
      {lit.sign && litRing("lg", 300, 0, 128, 78)}
      </g>}
    </g>
  );
  const p1Lane = () => {
    const k = it.kind, d = S.demo, lit: any = {};
    if (d && (k === "claim" || k === "pair")) { lit.stick = true; if (k === "pair") lit.ruler = true; }
    if (k === "tiles") {
      /* a tiles miss lights the measure beside each step whose tile went back (until the child's next move) */
      const back = d ? String(d.v).split("|").map(Number) : [];
      [0, 1, 2].forEach((s) => {
        const empty = !UL_TRAY.some((t) => S.tiles[t] === s);
        if ((S.ghost && empty) || (back.length === 3 && back[s] !== UL_FACT[s])) lit[UL_REFS[s]] = true;
      });
    }
    const out: any[] = [refs(warm ? S.laid : { ruler: true, stick: true, sign: true }, lit)];
    if (warm) {
      /* the tray: what is still to be laid beside its rung */
      UL_REFS.forEach((r) => {
        if (S.laid[r]) return;
        out.push(<g key={"tray" + r}>
          <rect x={UL_TRAYX[r].x} y={UL_TRAY_Y} width={UL_TRAYX[r].w} height={80} rx={16} fill={tint(C.panel, 0.45)} stroke={C.rule} strokeWidth={2} />
          {S.moving !== r && <g transform={`translate(${UL_TRAYX[r].x + UL_TRAYX[r].w / 2},${UL_TRAY_Y + 40})`}>{miniRef(r)}</g>}
        </g>);
      });
    }
    if (k === "claim") {
      if (d && d.lv >= 2) {
        /* three metre sticks of 100 cm, counted (deep blue, the centimetres marked), and the child's length under them */
        const mv = leadNumber(d.v), lab = mv !== null ? indian(mv) + " " + un(1) : "";
        const lw = ulTw(lab, T.label) + 6, room = Math.min(552, 880 - 12 - lw - 304), full = mv !== null ? (mv / 100) * 180 : 0;
        const mw = Math.max(8, Math.min(room, full));
        out.push(<g key="sticks">
          {[0, 1, 2].map((i) => (
            <g key={"bar" + i}>
              <text x={394 + i * 186} y={424} textAnchor="middle" fontSize={ulFit("100 " + un(1), 176, T.prompt)} fontWeight={700} fill={shade(UL_BIG, 0.25)} style={{ whiteSpace: "pre" } as any}>{"100 " + un(1)}</text>
              {stickNode("cs" + i, 304 + i * 186, 432, 180, 26, true)}
              {Array.from({ length: 9 }).map((_, j) => <line key={"ct" + j} x1={304 + i * 186 + (j + 1) * 18} y1={432} x2={304 + i * 186 + (j + 1) * 18} y2={432 + (j === 4 ? 13 : 8)} stroke="#FFFFFF" strokeWidth={2} />)}
            </g>
          ))}
          {mv !== null && mv > 0 && mv !== it.answer && (
            <g>
              <rect x={304} y={476} width={mw} height={20} rx={5} fill={tint(C.rule, 0.4)} stroke={C.ink} strokeWidth={2} />
              {full > mw && <path d={`M ${304 + mw - 10} 472 L ${304 + mw - 18} 500 M ${304 + mw - 2} 472 L ${304 + mw - 10} 500`} stroke={C.ink} strokeWidth={2.5} />}
              <text x={316 + mw} y={499} fontSize={T.label} fontWeight={700} fill={C.ink} style={{ whiteSpace: "pre" } as any}>{lab}</text>
            </g>
          )}
        </g>);
      }
      if (lv >= 3) out.push(gapLine("cl", 1, [ulSeg(`3 ${un(2)}`, "big"), ulSeg("=", "ink"), ulSeg(`300 ${un(1)}`, "small")]));
    }
    if (k === "pair" && lv >= 3) {
      out.push(gapLine("p1", 1, [ulSeg(`1 ${un(2)}`, "big"), ulSeg("=", "ink"), ulSeg(`100 ${un(1)}`, "small")]));
      out.push(gapLine("p0", 0, [ulSeg(`1 ${un(1)}`, "big"), ulSeg("=", "ink"), ulSeg(`10 ${un(0)}`, "small")]));
    }
    if (k === "tiles") out.push(<rect key="tray" x={300} y={426} width={392} height={88} rx={18} fill={tint(C.panel, 0.45)} stroke={C.rule} strokeWidth={2} />);
    return out;
  };
  const tiles = () => {
    if (!tilesQ) return null;
    const dg = drag.drag;
    return UL_TRAY.map((v, i) => {
      const s = S.tiles[v], dragging = live && dg && dg.payload && dg.payload.tile === v && dg.moved;
      const x = dragging ? dg.x - ox - 75 : s !== undefined ? UL_PX - 75 : 312 + i * 126;
      const y = dragging ? dg.y - oy - 36 : s !== undefined ? UL_SY[s] - 36 : 434;
      const w = s !== undefined || dragging ? 150 : 116, held = S.held === v;
      return (
        <g key={"tile" + v} className="c4-piece" {...control("tile-" + v, "the " + v + " tile")} {...drag.bind({ tile: v })} {...drag.keys({ tile: v })}>
          <rect x={x} y={y} width={w} height={72} fill="transparent" />
          <rect x={x} y={y + 8} width={w} height={56} rx={12} fill="#FFFFFF" stroke={held ? C.accent : C.ink} strokeWidth={held ? 5 : 3} filter={held || dragging ? "url(#fLift)" : "url(#fShadowSoft)"} />
          <text x={x + w / 2} y={y + 49} textAnchor="middle" fontSize={T.label + 4} fontWeight={700} fill={C.ink}>{indian(v)}</text>
        </g>
      );
    });
  };

  /* ── phases 2 to 4: the card crosses one step ── */
  const cardLane = () => {
    if (!cs) return [];
    const out: any[] = [], gaps = ulGaps(cs.s, !!it.pb);
    const hideCard = S.moving === "card", hideChip = S.moving === "chip";
    /* where the card is and what it reads */
    let r = cs.r0, segs = startSegs(), lit = false, slot: any = null, chip: any = null;
    const lines: any[] = [];
    let digs: any[] | null = null, ring: number | null = null;
    if (warm) {
      if (S.crossed) {
        r = cs.r1;
        if (pn === 2) {
          segs = S.crossed === 2 ? resSegs() : [ulSeg(`${indian(it.big * cs.F)} ${un(cs.r1)}`, "big")];
          if (S.crossed === 1) chip = [ulSeg(`${indian(it.small)} ${un(cs.r1)}`, "small")];
          lines.push([ulSeg(`${it.big} × ${indian(cs.F)}`, "big")].concat(S.crossed === 2 ? [ulSeg(`+ ${indian(it.small)}`, "small")] : []));
        } else if (pn === 3) {
          segs = resSegs();
          slot = { val: indian(cs.rem), tone: "small" };
          lines.push([ulSeg(`${indian(cs.total)} ÷ ${indian(cs.F)}`, "ink")]);
          if (S.rebuilt) lines.push([ulSeg(`${cs.q} × ${indian(cs.F)}`, "big"), ulSeg(`+ ${indian(cs.rem)}`, "small"), ulSeg(`= ${indian(cs.total)}`, "ink")]);
        } else {
          segs = S.zero ? resSegs() : qSegs();
          lines.push([ulSeg(`${it.big} × ${indian(cs.F)}`, "big"), ulSeg(`+ ${indian(it.small)}`, "small")]);
        }
      }
      if (cs.up && !S.crossed) slot = { val: null, tone: "ink" };
      if (it.pb) {
        const all = pbDigits();
        let w = 0;
        digs = all.map((d: any) => {
          if (d.c === "zero") return S.zero ? d : { s: "", c: "zero" };
          if (!d.s) return d;
          w += 1;
          return w <= S.wrote ? d : { s: "", c: d.c };
        });
        if (S.wrote >= 3 && !S.zero) ring = 1;
      }
    } else {
      const across = S.crossed > 0 || lv >= 2;
      if (across) r = cs.r1;
      if (lv >= 3) segs = resSegs();
      else if (across) segs = qSegs();
      if (cs.up) slot = lv >= 2 ? { val: indian(cs.rem), tone: "small" } : across ? { val: "?", tone: "ink", lit: true } : { val: null, tone: "ink" };
      if (cs.up && lv === 2) segs = resSegs();
      if (lv >= 2) {
        if (cs.up) lines.push([ulSeg(`${indian(cs.total)} ÷ ${indian(cs.F)}`, "ink")]);
        else lines.push([ulSeg(`${it.big} × ${indian(cs.F)}`, "big")].concat(it.small ? [ulSeg(`+ ${indian(it.small)}`, "small")] : []));
      }
      if (cs.up && lv >= 3) {
        lines.push([ulSeg(`${cs.q} × ${indian(cs.F)}`, "big"), ulSeg(`+ ${indian(cs.rem)}`, "small"), ulSeg(`= ${indian(cs.total)}`, "ink")]);
        const d = S.demo, mp = d ? slotPartsOf(d.v, 2) : null;
        if (mp && mp[0] !== "" && mp[1] !== "" && (Number(mp[0]) !== cs.q || Number(mp[1]) !== cs.rem)) {
          const a = Number(mp[0]), b = Number(mp[1]);
          lines.push([ulSeg(`${indian(a)} ${un(cs.r1)} ${indian(b)} ${un(cs.r0)}`, "ink"), ulSeg(`= ${indian(a * cs.F + b)} ${un(cs.r0)}`, "ink")]);
        }
      }
      if (it.pb) {
        /* the up card: four empty boxes until the correction or the win (the zero holding a place is what it asks) */
        if (cs.up) digs = lv >= 2 ? pbDigits() : [0, 1, 2, 3].map(() => ({ s: "", c: "ink" }));
        else if (lv >= 2) { digs = pbDigits().map((d: any) => (d.c === "zero" && lv < 3 ? { s: "", c: "zero" } : d)); if (lv === 2) ring = digs.findIndex((d: any) => d.c === "zero"); }
        else {
          const t = String(typed || "").replace(/\D/g, "");
          const ds = t.length <= 4 ? t.split("") : [];
          digs = Array.from({ length: 4 - ds.length }, () => ({ s: "", c: "ink" })).concat(ds.map((c: string) => ({ s: c, c: "ink" })));
        }
      }
    }
    lines.slice(0, gaps.length).forEach((l: any, i: number) => out.push(gapLine("gl" + i, gaps[i], l)));
    if (slot && slotG) out.push(slotNode(cs.r0, slot.val, !!slot.lit, slot.tone, slotG));
    if (chip && !hideChip) out.push(laneCard("chip", cs.r0, chip, true, ulRoom(cs.r0)));
    if (!hideCard) out.push(laneCard("card", r, segs, lit, ulRoom(r, cs.up && r === cs.r0), it.pb && cs.up && r === cs.r0 ? -16 : 0));
    if (digs) out.push(board(digs, ring !== null && ring >= 0 ? ring : null));
    return out;
  };

  /* ── free play: the card on any rung, stepped up and down ── */
  const freeLane = () => {
    const f = S.fp, out: any[] = [];
    if (S.fline) {
      const l = S.fline;
      out.push(gapLine("fl", l.s, l.kind === "down" ? [ulSeg(`${indian(l.v)} × ${indian(l.F)}`, "big")].concat(l.rem !== null && l.rem !== undefined ? [ulSeg(`+ ${indian(l.rem)}`, "small")] : [])
        : [ulSeg(`${indian(l.v)} ÷ ${indian(l.F)}`, "ink")], 370));
    }
    if (f.rem !== null && f.r > 0) out.push(slotNode(f.r - 1, indian(f.rem), false, "small", { x: UL_FSLOT.x, w: UL_FSLOT.w, y: UL_RY[f.r - 1] - 36 }));
    if (S.moving !== "card") out.push(laneCard("fcard", f.r, [ulSeg(`${indian(f.v)} ${un(f.r)}`, f.rem !== null ? "big" : "ink")], false, ulRoom(f.r)));
    return out;
  };

  /* ── the keys ── */
  const keyIds = (): string[] => {
    if (free) return [];
    if (warm) {
      if (pn === 2) return S.crossed === 0 ? ["down"] : S.crossed === 1 ? ["add"] : [];
      if (pn === 3) return S.crossed === 0 ? ["up"] : !S.rebuilt ? ["rebuild"] : [];
      if (pn === 4) return S.crossed === 0 ? ["down"] : S.wrote < 3 ? ["write"] : [];
      return [];
    }
    if (stage === "ask" && cs && !S.crossed && !S.demo && !tl.busy) return [cs.up ? "up" : "down"];
    return [];
  };
  const keyFace = (label: string, on: boolean) => (
    <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk(on ? "key" : "soft", C.ink)}>{tx(label)}</text>
  );
  const keysDrawn = () => {
    if (free) {
      const f = S.fp, canUp = f.r < 3 && f.rem === null && f.v >= UL_FACT[f.r], canDown = f.r > 0;
      return [
        <Key key="fk0" id="free-up" label="Step up" x={UL_KEY_UP.x} y={UL_KEY_UP.y} w={UL_KEY_UP.w} h={UL_KEY_UP.h} C={C} tone={canUp ? "key" : "soft"} onClick={() => pressKey("free-up")}>{keyFace("Step up", canUp)}</Key>,
        <Key key="fk1" id="free-down" label="Step down" x={UL_KEY.x} y={UL_KEY.y} w={UL_KEY.w} h={UL_KEY.h} C={C} tone={canDown ? "key" : "soft"} onClick={() => pressKey("free-down")}>{keyFace("Step down", canDown)}</Key>,
      ];
    }
    return keyIds().map((id, j) => (
      <Key key={"act" + j} id={id} label={UL_KEYS[id]} x={UL_KEY.x} y={UL_KEY.y} w={UL_KEY.w} h={UL_KEY.h} C={C} tone="key" onClick={() => pressKey(id)}>{keyFace(UL_KEYS[id], true)}</Key>
    ));
  };
  const zeroHit = warm && pn === 4 && S.wrote >= 3 && !S.zero;
  const invite = () => {
    if (!warm || !stepOn || S.moving || playing.current) return null;
    if (pn === 1) return UL_REFS.indexOf(stepOn) >= 0 && !S.laid[stepOn] ? <Invite x={UL_TRAYX[stepOn].x + UL_TRAYX[stepOn].w / 2} y={UL_TRAY_Y + 40} w={UL_TRAYX[stepOn].w} h={80} rx={16} C={C} /> : null;
    if (stepOn === "zero") return zeroHit ? <Invite x={boxX(1) + UL_PB.w / 2} y={UL_PB.y + UL_PB.h / 2} w={UL_PB.w} h={UL_PB.h} rx={12} C={C} /> : null;
    return keyIds().indexOf(stepOn) >= 0 ? <Invite x={UL_KEY.x + UL_KEY.w / 2} y={UL_KEY.y + UL_KEY.h / 2} w={UL_KEY.w} h={UL_KEY.h} C={C} /> : null;
  };

  /* what the host and the agent read back (toolApi.getState): never the answer before it is given */
  api.share({
    card: free ? `${indian(S.fp.v)} ${UL_UNITS[S.fp.r]}` : ulCardText(it),
    rung: free ? UL_UNITS[S.fp.r] : cs ? UL_UNITS[(S.crossed || lv >= 2) ? cs.r1 : cs.r0] : null,
    stepNumber: cs && (S.crossed || lv >= 1) ? cs.F : null,
    quotient: won && cs && cs.up ? cs.q : null,
    remainder: won && cs && cs.up ? cs.rem : null,
    places: won && it.pb && cs ? String(cs.total) : null,
    complete: stage === "idle",
  });

  return (
    <g>
      <g transform={`translate(${ox},${oy})`}>
        {ladder()}
        <g pointerEvents="none">{free ? freeLane() : pn === 1 ? p1Lane() : cardLane()}</g>
        {live && S.held !== null && [0, 1, 2].filter((s) => !UL_TRAY.some((v) => S.tiles[v] === s)).map((s) => (
          <Hit key={"hs" + s} id={"step-" + s} x={UL_PX - 75} y={UL_SY[s] - 36} w={150} h={72} onPress={() => tapStep(s)}
            label={"the step between " + UL_WORDS[s] + " and " + UL_WORDS[s + 1]} />
        ))}
        {tiles()}
        {warm && pn === 1 && UL_REFS.filter((r) => !S.laid[r]).map((r) => (
          <Hit key={"ref" + r} id={r} x={UL_TRAYX[r].x} y={UL_TRAY_Y} w={UL_TRAYX[r].w} h={80} onPress={() => act(r)}
            label={r === "ruler" ? "the ruler" : r === "stick" ? "the metre stick" : "the road sign"} />
        ))}
        {zeroHit && <Hit id="zero" x={boxX(1)} y={UL_PB.y} w={UL_PB.w} h={UL_PB.h} onPress={() => act("zero")} label="the empty hundreds box" />}
        {keysDrawn()}
        {invite()}
      </g>
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase (r24: `it` is the item) */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last) return null;
  const item: any = it || last.it || (PHASES[(n || 1) - 1] && (PHASES[(n || 1) - 1] as any).items[last.item]) || {};
  const v = last.value, u = (k: number) => tx(UL_UNITS[k]);
  /* the answer as the measure card writes it: the larger unit deep blue, the smaller green, a place-holding zero grey */
  let segs: any[] = [];
  let r0 = -1, r1 = -1;
  if (item.kind === "tiles") segs = [ulSeg("10, 100, 1,000", "ink")];
  else if (item.kind === "pair") { const [a, b] = slotPartsOf(v, 2); segs = [ulSeg(`${a} ${u(1)},`, "small"), ulSeg(`${b} ${u(0)}`, "small")]; }
  else if (item.kind === "claim") segs = [ulSeg(`${indian(leadNumber(v) ?? 0)} ${u(1)}`, "small")];
  else if (item.kind === "up") {
    const [a, b] = slotPartsOf(v, 2);
    r0 = item.from; r1 = item.from + 1;
    segs = [ulSeg(`${indian(Number(a))} ${u(r1)}`, "big"), ulSeg(`${indian(Number(b))} ${u(r0)}`, "small")];
  } else if (item.kind === "down") {
    const x = leadNumber(v) ?? 0;
    r0 = item.from; r1 = item.from - 1;
    segs = [{ s: `${indian(x)} ${u(r1)}`, d: ulRuns(ulDigits(x, UL_PLACES[r1], item.small)).concat([{ s: " " + u(r1), c: "ink" }]) }];
  } else segs = [ulSeg(String(v ?? ""), "ink")];
  /* a small ladder at the left (the two rungs the card crossed in their colours, or phase 1's three tiles), when the
     answer still fits beside it at 28 or more; otherwise the card alone */
  const lad = 48, tw = ulSegsW(segs, 1);
  const withLad = (w - lad - 18) / tw >= T.micro;
  const x0 = withLad ? lad : 8, avail = w - x0 - 10;
  const size = Math.max(T.micro, Math.min(T.label + 4, Math.floor(avail / tw)));
  const ry = (r: number) => h - 11 - r * ((h - 22) / 3);
  const rungFill = (r: number) => (r === r0 || r === r1 ? (r === Math.max(r0, r1) ? UL_BIG : UL_SMALL) : tint(C.rule, 0.25));
  /* phase 1's tiles: the three number tiles themselves; a two-unit answer: the card and its remainder slot, as on the ladder */
  const chips = (list: any[], gap0: number) => {
    /* hi/gu: tighter chips (padding 8, gap 6) so the frame keeps about 10 on each side at the 28 floor */
    const pad = lang === "en" ? 16 : 8, gap = lang === "en" ? gap0 : 6;
    const sz = Math.max(T.micro, Math.min(T.label + 2, Math.floor((w - (lang === "en" ? 16 : 24) - gap * (list.length - 1) - pad * list.length) / Math.max(0.01, list.reduce((q: number, c: any) => q + ulTw(c.s, 1), 0)))));
    let x = (w - (list.reduce((q: number, c: any) => q + ulTw(c.s, sz) + pad, 0) + gap * (list.length - 1))) / 2;
    return list.map((c: any, i: number) => {
      const cw = ulTw(c.s, sz) + pad, el = (
        <g key={"ch" + i}>
          <rect x={x} y={h / 2 - sz * 0.75} width={cw} height={sz * 1.5} rx={8} fill="#FFFFFF" stroke={c.c === "small" ? shade(UL_SMALL, 0.25) : C.ink} strokeWidth={2.5} strokeDasharray={c.dash ? "6 4" : undefined} />
          <text x={x + cw / 2} y={h / 2 + sz * 0.36} textAnchor="middle" fontSize={sz} fontWeight={700} fill={ulCol(C, c.c)} style={{ whiteSpace: "pre" } as any}>{c.s}</text>
        </g>
      );
      x += cw + gap;
      return el;
    });
  };
  if (item.kind === "tiles" || item.kind === "up") return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.45)} stroke={C.ink} strokeWidth={2.5} />
      {chips(item.kind === "tiles" ? ["10", "100", "1,000"].map((t) => ({ s: t, c: "ink" })) : segs.map((g: any, i: number) => ({ s: g.s, c: g.c, dash: i === 1 })), 8)}
    </g>
  );
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill="#FFFFFF" stroke={C.ink} strokeWidth={2.5} />
      {withLad && (
        <g>
          <rect x={12} y={5} width={4} height={h - 10} rx={2} fill={shade(C.rule, 0.35)} />
          <rect x={36} y={5} width={4} height={h - 10} rx={2} fill={shade(C.rule, 0.35)} />
          {[0, 1, 2, 3].map((r) => <rect key={"tr" + r} x={7} y={ry(r) - 3} width={38} height={6} rx={3} fill={rungFill(r)} stroke={C.ink} strokeWidth={1} />)}
          {item.kind === "tiles" || item.kind === "pair" || item.kind === "claim"
            ? [0, 1, 2].map((s) => <rect key={"tt" + s} x={17} y={(ry(s) + ry(s + 1)) / 2 - 4} width={18} height={8} rx={2} fill="#FFFFFF" stroke={C.ink} strokeWidth={1.2} />)
            : r0 >= 0 && <path d={r1 < r0 ? `M 26 ${ry(r0) + 5} L 26 ${ry(r1) - 8} M 21 ${ry(r1) - 13} L 26 ${ry(r1) - 6} L 31 ${ry(r1) - 13}`
              : `M 26 ${ry(r0) - 5} L 26 ${ry(r1) + 8} M 21 ${ry(r1) + 13} L 26 ${ry(r1) + 6} L 31 ${ry(r1) + 13}`} fill="none" stroke={C.ink} strokeWidth={2.2} />}
        </g>
      )}
      {ulLine("th", segs, x0 + avail / 2, h / 2 + Math.round(size * 0.36), C, size)}
    </g>
  );
}


function UnitLadder(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null, format: ulFormat,
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

export default UnitLadder;
