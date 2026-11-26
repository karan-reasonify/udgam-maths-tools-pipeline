/* ═══ M1.S2.T3.C9.2D1 · bigger_to_smaller · tool-specific part ═══════════════════════════════
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

const TOOL_ID = "bigger_to_smaller";
const MEDIA_ID = "M1.S2.T3.C9.2D1";
const TOOL_NAME = "Big to Small Converter";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["A bar of time on a ladder, ready to break down."];
/* the whole-tool line: kept for the tool object's shape; not shown from r44 */
const FINISH_LINE = "You broke bigger units into smaller ones and added the leftover part.";
/* printed when the child opens Free play; its LAST piece stays on the bubble */
const FREE_LINE = "Free play. Pick a unit and a number of bars, then break them down.";

/* the unit ladder: four rungs, and how many of the next rung down make one of this rung */
const B2S_UNITS = [
  { name: "days", short: "days", per: 24, fact: "1 day=24 h" },
  { name: "hours", short: "h", per: 60, fact: "1 h=60 min" },
  { name: "minutes", short: "min", per: 60, fact: "1 min=60 s" },
  { name: "seconds", short: "s", per: 0, fact: "" },
];
/* content colours of the chapter: given deep blue, answer green, regroup violet, the part worked on now amber */
const B2S_BLUE = "#0072B2", B2S_GREEN = "#009E73", B2S_VIOLET = "#7A3E9D", B2S_AMBER = "#E69F00";

/* the acts each question needs, in order: ONE key at the bottom centre whose label follows the act */
const b2sSeq = (it: any) => (it.kind === "chain" ? ["break", "add", "break2"]
  : it.kind === "frac" ? (it.whole ? ["break"] : []).concat(["cut", "shade"])
  : it.left ? ["break", "add"] : ["break"]);
const B2S_KEY: any = { break: "Break down", break2: "Break down", add: "Add", cut: "Cut", shade: "Shade" };

/* THE START PAGE: the ladder of four units and a day bar cut into its hour cells */
const START_HOOK = "How many hours hide inside one whole day?";
function StartArt({ box, C, lang, tx }: any) {
  const rungs = ["days", "hours", "minutes", "seconds"];
  const bx = 330, bw = 820, by = 150, bh = 84, cell = bw / 24;
  return (
    <g>
      <defs>
        <linearGradient id="b2s-start-bar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3399DB" />
          <stop offset="100%" stopColor="#005C94" />
        </linearGradient>
        <filter id="b2s-start-shadow" x="-5%" y="-5%" width="110%" height="115%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.14" />
        </filter>
      </defs>
      {rungs.map((r, i) => (
        <g key={r} filter="url(#b2s-start-shadow)">
          <rect x={20} y={10 + i * 82} width={250} height={66} rx={14} fill={i === 0 ? tint(B2S_BLUE, 0.82) : C.paper} stroke={i === 0 ? shade(B2S_BLUE, 0.15) : C.ink} strokeWidth={3} />
          <text x={145} y={10 + i * 82 + 33} textAnchor="middle" dominantBaseline="central" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(r)}</text>
        </g>
      ))}
      <g filter="url(#b2s-start-shadow)">
        <rect x={bx} y={by} width={bw} height={bh} rx={12} fill="url(#b2s-start-bar)" stroke={shade(B2S_BLUE, 0.35)} strokeWidth={3} />
        {Array.from({ length: 23 }, (_, k) => (
          <line key={k} x1={bx + (k + 1) * cell} y1={by + 6} x2={bx + (k + 1) * cell} y2={by + bh - 6} stroke="#FFFFFF" strokeOpacity={0.85} strokeWidth={2.5} />
        ))}
        <rect x={bx + 2} y={by + 2} width={bw - 4} height={bh / 3} rx={10} fill="#FFFFFF" fillOpacity={0.2} pointerEvents="none" />
      </g>
      <text x={bx + bw / 2} y={by - 24} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={shade(B2S_BLUE, 0.25)}>{tx("1 day")}</text>
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): filled in the language pass, once the English is final. */
const TR: any = {
  hi: {
    "total": "कुल",
    "total box": "कुल बॉक्स",
    "Tap Break down first.": "पहले तोड़ो दबाओ।",
    "Tap Cut first.": "पहले काटो दबाओ।",
    "Each minute bar became a row of 60 second bars.": "हर मिनट की पट्टी 60 सेकंड की पट्टियों की एक पंक्ति बनी।",
    "Find 6 groups of 60, since nothing is left over.": "60 के 6 समूह बनाओ, क्योंकि कुछ नहीं बचा।",
    "2 and 3/4 h is 2 hours and 3/4 of an hour, so change both to minutes.": "2¾ घंटे यानी 2 घंटे और 3/4 घंटा, दोनों को मिनट में बदलो।",
    "Write both lengths in the same unit, then compare.": "दोनों समय एक ही इकाई में लिखो, फिर तुलना करो।",
    "Big to Small Converter": "बड़ी इकाई से छोटी इकाई",
    "A bar of time on a ladder, ready to break down.": "सीढ़ी पर समय की एक पट्टी, तोड़ने के लिए तैयार।",
    "You broke bigger units into smaller ones and added the leftover part.": "तुमने बड़ी इकाइयों को छोटी में तोड़ा और बचा हुआ भाग जोड़ा।",
    "Free play. Pick a unit and a number of bars, then break them down.": "मुक्त खेल। एक इकाई और पट्टियों की गिनती चुनो, फिर उन्हें तोड़ो।",
    "How many hours hide inside one whole day?": "एक पूरे दिन में कितने घंटे छिपे हैं?",
    "days": "दिन",
    "hours": "घंटे",
    "minutes": "मिनट",
    "seconds": "सेकंड",
    "day": "दिन",
    "h": "घंटे",
    "min": "मिनट",
    "s": "सेकंड",
    "1 day": "1 दिन",
    "1 h": "1 घंटा",
    "1 min": "1 मिनट",
    "of 60 min": "× 60 मिनट",
    "1 day=24 h": "1 दिन=24 घंटे",
    "1 h=60 min": "1 घंटा=60 मिनट",
    "1 min=60 s": "1 मिनट=60 सेकंड",
    "Break down": "तोड़ो",
    "Add": "जोड़ो",
    "Cut": "काटो",
    "Shade": "रंग भरो",
    "Unit": "इकाई",
    "More": "अधिक",
    "Now tap Add.": "अब जोड़ो दबाओ।",
    "Now tap Break down again.": "अब फिर से तोड़ो दबाओ।",
    "Now tap Cut.": "अब काटो दबाओ।",
    "Now tap Shade.": "अब रंग भरो दबाओ।",
    "2 and 3/4 h": "2¾ घंटे",
    "150 min": "150 मिनट",
    "Days into hours": "दिन से घंटे",
    "How many hours in one day? Break down every day bar.": "एक दिन में कितने घंटे? हर दिन की पट्टी तोड़ो।",
    "Tap Break down to split each day bar into 24 hour bars.": "हर दिन की पट्टी को 24 घंटे की पट्टियों में बाँटने के लिए तोड़ो दबाओ।",
    "Tap the Break down key at the bottom.": "नीचे तोड़ो बटन दबाओ।",
    "Now tap Add to drop the 4 leftover hours in with the rest.": "अब बचे हुए 4 घंटे बाकी के साथ डालने के लिए जोड़ो दबाओ।",
    "The Add key puts the tray in.": "जोड़ो बटन ट्रे को अंदर डालता है।",
    "1 day is 24 h, so the days are multiplied by 24, never added to 24.": "1 दिन 24 घंटे का है, इसलिए दिनों को 24 से गुणा करो, 24 में जोड़ो नहीं।",
    "Write days × 24 first, then add the leftover hours to that product.": "पहले दिन × 24 लिखो, फिर गुणनफल में बचे हुए घंटे जोड़ो।",
    "Hours are shorter than days, so there are more of them: 24 in each day.": "घंटे दिन से छोटे हैं, इसलिए वे ज़्यादा होते हैं: हर दिन में 24।",
    "You learned: days × 24, then add the leftover hours.": "तुमने सीखा: दिन × 24, फिर बचे हुए घंटे जोड़ो।",
    "How many hours are there in 9 days 5 h?": "9 दिन 5 घंटे में कितने घंटे हैं?",
    "9 days 5 h in hours?": "9 दिन 5 घंटे, घंटों में?",
    "Each day bar made 24 hour bars, so multiply 9 by 24.": "हर दिन की पट्टी से 24 घंटे की पट्टियाँ बनीं, इसलिए 9 को 24 से गुणा करो।",
    "Yes, 9 days 5 h is 221 h.": "हाँ, 9 दिन 5 घंटे 221 घंटे होते हैं।",
    "Change 2 days 6 h into hours.": "2 दिन 6 घंटे को घंटों में बदलो।",
    "2 days 6 h in hours?": "2 दिन 6 घंटे, घंटों में?",
    "Two rows of 24 hours, and then the 6 leftover hours.": "24 घंटे की दो पंक्तियाँ, और फिर बचे हुए 6 घंटे।",
    "Right, 2 days 6 h makes 54 h.": "सही, 2 दिन 6 घंटे से 54 घंटे बनते हैं।",
    "A trip lasts 12 days 20 h, so how many hours is that?": "एक यात्रा 12 दिन 20 घंटे चलती है, तो वह कितने घंटे हुए?",
    "12 days 20 h in hours?": "12 दिन 20 घंटे, घंटों में?",
    "Multiply 12 by 24 first, then add the 20 hours.": "पहले 12 को 24 से गुणा करो, फिर 20 घंटे जोड़ो।",
    "Well done, the trip is 308 h long.": "शाबाश, यात्रा 308 घंटे की है।",
    "Hours into minutes": "घंटे से मिनट",
    "Sixty minutes to an hour. Break down each bar, then drop in the minutes left over.": "एक घंटे में साठ मिनट। हर पट्टी तोड़ो, फिर बचे हुए मिनट डालो।",
    "Tap Break down to split each hour bar into 60 minute bars.": "हर घंटे की पट्टी को 60 मिनट की पट्टियों में बाँटने के लिए तोड़ो दबाओ।",
    "Tap the Break down key first.": "पहले तोड़ो बटन दबाओ।",
    "Now tap Add to drop the 15 leftover minutes in.": "अब बचे हुए 15 मिनट डालने के लिए जोड़ो दबाओ।",
    "Next comes the Add key, at the bottom.": "अब नीचे वाला जोड़ो बटन।",
    "1 h is 60 min, so the hours are multiplied by 60, not by 10.": "1 घंटा 60 मिनट का है, इसलिए घंटों को 60 से गुणा करो, 10 से नहीं।",
    "Write hours × 60 first, then add the leftover minutes once.": "पहले घंटे × 60 लिखो, फिर बचे हुए मिनट एक बार जोड़ो।",
    "Every hour holds 60 minutes, and the minutes left over join at the end.": "हर घंटे में 60 मिनट होते हैं, और बचे हुए मिनट अंत में जुड़ते हैं।",
    "You learned: hours × 60, then add the leftover minutes.": "तुमने सीखा: घंटे × 60, फिर बचे हुए मिनट जोड़ो।",
    "How many minutes are there in 5 h 50 min?": "5 घंटे 50 मिनट में कितने मिनट हैं?",
    "5 h 50 min in minutes?": "5 घंटे 50 मिनट, मिनटों में?",
    "Each hour bar made 60 minute bars, not 10.": "हर घंटे की पट्टी से 60 मिनट की पट्टियाँ बनीं, 10 नहीं।",
    "Yes, 5 h 50 min is 350 min.": "हाँ, 5 घंटे 50 मिनट 350 मिनट होते हैं।",
    "Write 4 h 10 min in minutes.": "4 घंटे 10 मिनट को मिनटों में लिखो।",
    "4 h 10 min in minutes?": "4 घंटे 10 मिनट, मिनटों में?",
    "Four rows of 60 minutes, and then the 10 leftover minutes.": "60 मिनट की चार पंक्तियाँ, और फिर बचे हुए 10 मिनट।",
    "Right, 4 h 10 min makes 250 min.": "सही, 4 घंटे 10 मिनट से 250 मिनट बनते हैं।",
    "A train ride takes 6 h 45 min, so how many minutes is that?": "एक रेल यात्रा 6 घंटे 45 मिनट लेती है, तो वह कितने मिनट हुए?",
    "6 h 45 min in minutes?": "6 घंटे 45 मिनट, मिनटों में?",
    "Did the 45 leftover minutes go into the total?": "क्या बचे हुए 45 मिनट कुल में जुड़े?",
    "Well done, the ride is 405 min long.": "शाबाश, रेल यात्रा 405 मिनट की है।",
    "Minutes into seconds": "मिनट से सेकंड",
    "Sixty seconds to a minute. Do you need the minutes first?": "एक मिनट में साठ सेकंड। क्या पहले मिनट चाहिए?",
    "Tap Break down to split each minute bar into 60 second bars.": "हर मिनट की पट्टी को 60 सेकंड की पट्टियों में बाँटने के लिए तोड़ो दबाओ।",
    "The Break down key is at the bottom.": "तोड़ो बटन नीचे है।",
    "Now tap Add to drop the 20 leftover seconds in.": "अब बचे हुए 20 सेकंड डालने के लिए जोड़ो दबाओ।",
    "Tap the Add key to drop them in.": "उन्हें डालने के लिए जोड़ो बटन दबाओ।",
    "Minutes × 60 gives seconds, and hours go to minutes first.": "मिनट × 60 से सेकंड मिलते हैं, और घंटे पहले मिनट बनते हैं।",
    "Add any leftover just once, in its own unit.": "जो बचा है उसे एक ही बार, उसकी अपनी इकाई में जोड़ो।",
    "Every minute holds 60 seconds, so go one unit down at a time.": "हर मिनट में 60 सेकंड होते हैं, इसलिए एक बार में एक इकाई नीचे जाओ।",
    "You learned: minutes × 60, plus the leftover seconds, step by step.": "तुमने सीखा: मिनट × 60, और बचे हुए सेकंड, एक-एक कदम।",
    "How many seconds are there in 26 min 15 s?": "26 मिनट 15 सेकंड में कितने सेकंड हैं?",
    "26 min 15 s in seconds?": "26 मिनट 15 सेकंड, सेकंडों में?",
    "Multiply 26 by 60, then add the 15 seconds just once.": "26 को 60 से गुणा करो, फिर 15 सेकंड सिर्फ़ एक बार जोड़ो।",
    "Yes, 26 min 15 s is 1,575 s.": "हाँ, 26 मिनट 15 सेकंड 1,575 सेकंड होते हैं।",
    "Change 6 min into seconds.": "6 मिनट को सेकंडों में बदलो।",
    "6 min in seconds?": "6 मिनट, सेकंडों में?",
    "Six rows of 60 seconds, with nothing left over.": "60 सेकंड की छह पंक्तियाँ, कुछ भी नहीं बचा।",
    "Right, 6 min makes 360 s.": "सही, 6 मिनट से 360 सेकंड बनते हैं।",
    "How many seconds are there in 1 h 5 min, changing the hours to minutes first?": "पहले घंटों को मिनट में बदलकर, 1 घंटा 5 मिनट में कितने सेकंड हैं?",
    "1 h 5 min in seconds?": "1 घंटा 5 मिनट, सेकंडों में?",
    "1 h 5 min is 65 min, and each minute is 60 seconds.": "1 घंटा 5 मिनट 65 मिनट है, और हर मिनट 60 सेकंड है।",
    "Well done, 1 h 5 min is 3,900 s.": "शाबाश, 1 घंटा 5 मिनट 3,900 सेकंड है।",
    "Part of an hour": "घंटे का भाग",
    "Shade the part of the hour. How many minute cells is that?": "घंटे का भाग रंगो। वह कितने मिनट के खाने हैं?",
    "Tap Cut to cut the hour bar into 2 equal parts.": "घंटे की पट्टी को 2 बराबर भागों में काटने के लिए काटो दबाओ।",
    "Tap the Cut key at the bottom.": "नीचे काटो बटन दबाओ।",
    "Now tap Shade to shade 1 of the 2 parts.": "अब 2 में से 1 भाग रंगने के लिए रंग भरो दबाओ।",
    "The Shade key colours one part.": "रंग भरो बटन एक भाग रंगता है।",
    "A part of an hour is that part of the 60 minute cells.": "घंटे का एक भाग, 60 मिनट के खानों का वही भाग है।",
    "Whole hours × 60, then add the minutes in the shaded part.": "पूरे घंटे × 60, फिर रंगे भाग के मिनट जोड़ो।",
    "Equal parts of the hour hold the same number of minutes.": "घंटे के बराबर भागों में मिनट भी बराबर होते हैं।",
    "You learned: a part of an hour is that part of 60 min.": "तुमने सीखा: घंटे का भाग 60 मिनट का वही भाग है।",
    "How many minutes are there in 3 and 3/4 h?": "3 और 3/4 घंटे में कितने मिनट हैं?",
    "3 and 3/4 h in minutes?": "3 और 3/4 घंटे, मिनटों में?",
    "3/4 of 60 is not 34, so count the shaded minute cells.": "60 का 3/4 भाग 34 नहीं है, इसलिए रंगे मिनट खाने गिनो।",
    "Yes, 3 and 3/4 h is 225 min.": "हाँ, 3 और 3/4 घंटे 225 मिनट होते हैं।",
    "Write 1/5 h in minutes.": "1/5 घंटे को मिनटों में लिखो।",
    "1/5 h in minutes?": "1/5 घंटा, मिनटों में?",
    "Count the minute cells in 1 of the 5 equal parts.": "5 बराबर भागों में से 1 भाग के मिनट खाने गिनो।",
    "Equal parts hold the same number of cells.": "बराबर भागों में खाने भी बराबर होते हैं।",
    "Share 60 minutes equally into 5 parts and count one part.": "60 मिनट को 5 बराबर भागों में बाँटो और एक भाग गिनो।",
    "Right, 1/5 h makes 12 min.": "सही, 1/5 घंटे से 12 मिनट बनते हैं।",
    "Which is longer, 150 min or 2 and 3/4 h?": "कौन ज़्यादा लंबा है, 150 मिनट या 2¾ घंटे?",
    "Which is longer?": "कौन ज़्यादा लंबा है?",
    "Change 2 and 3/4 h to minutes, then compare it with 150.": "2¾ घंटे को मिनट में बदलो, फिर 150 से तुलना करो।",
    "Well done, 165 min is longer than 150 min.": "शाबाश, 165 मिनट 150 मिनट से ज़्यादा लंबा है।",
  },
  gu: {
    "total": "કુલ",
    "total box": "કુલ બૉક્સ",
    "Tap Break down first.": "પહેલાં તોડો દબાવો.",
    "Tap Cut first.": "પહેલાં કાપો દબાવો.",
    "Each minute bar became a row of 60 second bars.": "દરેક મિનિટની પટ્ટી 60 સેકન્ડની પટ્ટીઓની એક હરોળ બની.",
    "Find 6 groups of 60, since nothing is left over.": "60 ના 6 જૂથ બનાવો, કારણ કે કંઈ બાકી નથી.",
    "2 and 3/4 h is 2 hours and 3/4 of an hour, so change both to minutes.": "2¾ કલાક એટલે 2 કલાક અને 3/4 કલાક, બંનેને મિનિટમાં ફેરવો.",
    "Write both lengths in the same unit, then compare.": "બંને સમય એક જ એકમમાં લખો, પછી સરખાવો.",
    "Big to Small Converter": "મોટા એકમથી નાના એકમ",
    "A bar of time on a ladder, ready to break down.": "સીડી પર સમયની એક પટ્ટી, તોડવા માટે તૈયાર.",
    "You broke bigger units into smaller ones and added the leftover part.": "તમે મોટા એકમને નાના એકમમાં તોડ્યા અને બાકીનો ભાગ ઉમેર્યો.",
    "Free play. Pick a unit and a number of bars, then break them down.": "મુક્ત રમત. એક એકમ અને પટ્ટીઓની સંખ્યા પસંદ કરો, પછી તેમને તોડો.",
    "How many hours hide inside one whole day?": "એક આખા દિવસમાં કેટલા કલાક છુપાયેલા છે?",
    "days": "દિવસ",
    "hours": "કલાક",
    "minutes": "મિનિટ",
    "seconds": "સેકન્ડ",
    "day": "દિવસ",
    "h": "કલાક",
    "min": "મિનિટ",
    "s": "સેકન્ડ",
    "1 day": "1 દિવસ",
    "1 h": "1 કલાક",
    "1 min": "1 મિનિટ",
    "of 60 min": "× 60 મિનિટ",
    "1 day=24 h": "1 દિવસ=24 કલાક",
    "1 h=60 min": "1 કલાક=60 મિનિટ",
    "1 min=60 s": "1 મિનિટ=60 સેકન્ડ",
    "Break down": "તોડો",
    "Add": "ઉમેરો",
    "Cut": "કાપો",
    "Shade": "રંગ પૂરો",
    "Unit": "એકમ",
    "More": "વધુ",
    "Now tap Add.": "હવે ઉમેરો દબાવો.",
    "Now tap Break down again.": "હવે ફરી તોડો દબાવો.",
    "Now tap Cut.": "હવે કાપો દબાવો.",
    "Now tap Shade.": "હવે રંગ પૂરો દબાવો.",
    "2 and 3/4 h": "2¾ કલાક",
    "150 min": "150 મિનિટ",
    "Days into hours": "દિવસમાંથી કલાક",
    "How many hours in one day? Break down every day bar.": "એક દિવસમાં કેટલા કલાક? દરેક દિવસની પટ્ટી તોડો.",
    "Tap Break down to split each day bar into 24 hour bars.": "દરેક દિવસની પટ્ટીને 24 કલાકની પટ્ટીઓમાં વહેંચવા તોડો દબાવો.",
    "Tap the Break down key at the bottom.": "નીચે તોડો બટન દબાવો.",
    "Now tap Add to drop the 4 leftover hours in with the rest.": "હવે બાકીના 4 કલાક બીજા સાથે મૂકવા ઉમેરો દબાવો.",
    "The Add key puts the tray in.": "ઉમેરો બટન ટ્રેને અંદર મૂકે છે.",
    "1 day is 24 h, so the days are multiplied by 24, never added to 24.": "1 દિવસ 24 કલાકનો છે, તેથી દિવસોને 24 વડે ગુણો, 24 માં ઉમેરો નહીં.",
    "Write days × 24 first, then add the leftover hours to that product.": "પહેલાં દિવસ × 24 લખો, પછી ગુણાકારમાં બાકીના કલાક ઉમેરો.",
    "Hours are shorter than days, so there are more of them: 24 in each day.": "કલાક દિવસ કરતાં નાના છે, તેથી તે વધુ હોય છે: દરેક દિવસમાં 24.",
    "You learned: days × 24, then add the leftover hours.": "તમે શીખ્યા: દિવસ × 24, પછી બાકીના કલાક ઉમેરો.",
    "How many hours are there in 9 days 5 h?": "9 દિવસ 5 કલાકમાં કેટલા કલાક છે?",
    "9 days 5 h in hours?": "9 દિવસ 5 કલાક, કલાકમાં?",
    "Each day bar made 24 hour bars, so multiply 9 by 24.": "દરેક દિવસની પટ્ટીમાંથી 24 કલાકની પટ્ટીઓ બની, તેથી 9 ને 24 વડે ગુણો.",
    "Yes, 9 days 5 h is 221 h.": "હા, 9 દિવસ 5 કલાક એટલે 221 કલાક.",
    "Change 2 days 6 h into hours.": "2 દિવસ 6 કલાકને કલાકમાં ફેરવો.",
    "2 days 6 h in hours?": "2 દિવસ 6 કલાક, કલાકમાં?",
    "Two rows of 24 hours, and then the 6 leftover hours.": "24 કલાકની બે હરોળ, અને પછી બાકીના 6 કલાક.",
    "Right, 2 days 6 h makes 54 h.": "સાચું, 2 દિવસ 6 કલાકથી 54 કલાક બને છે.",
    "A trip lasts 12 days 20 h, so how many hours is that?": "એક પ્રવાસ 12 દિવસ 20 કલાક ચાલે છે, તો તે કેટલા કલાક થયા?",
    "12 days 20 h in hours?": "12 દિવસ 20 કલાક, કલાકમાં?",
    "Multiply 12 by 24 first, then add the 20 hours.": "પહેલાં 12 ને 24 વડે ગુણો, પછી 20 કલાક ઉમેરો.",
    "Well done, the trip is 308 h long.": "શાબાશ, પ્રવાસ 308 કલાકનો છે.",
    "Hours into minutes": "કલાકમાંથી મિનિટ",
    "Sixty minutes to an hour. Break down each bar, then drop in the minutes left over.": "એક કલાકમાં સાઠ મિનિટ. દરેક પટ્ટી તોડો, પછી બાકીની મિનિટ મૂકો.",
    "Tap Break down to split each hour bar into 60 minute bars.": "દરેક કલાકની પટ્ટીને 60 મિનિટની પટ્ટીઓમાં વહેંચવા તોડો દબાવો.",
    "Tap the Break down key first.": "પહેલાં તોડો બટન દબાવો.",
    "Now tap Add to drop the 15 leftover minutes in.": "હવે બાકીની 15 મિનિટ મૂકવા ઉમેરો દબાવો.",
    "Next comes the Add key, at the bottom.": "હવે નીચેનું ઉમેરો બટન.",
    "1 h is 60 min, so the hours are multiplied by 60, not by 10.": "1 કલાક 60 મિનિટનો છે, તેથી કલાકને 60 વડે ગુણો, 10 વડે નહીં.",
    "Write hours × 60 first, then add the leftover minutes once.": "પહેલાં કલાક × 60 લખો, પછી બાકીની મિનિટ એક વાર ઉમેરો.",
    "Every hour holds 60 minutes, and the minutes left over join at the end.": "દરેક કલાકમાં 60 મિનિટ હોય છે, અને બાકીની મિનિટ છેલ્લે ઉમેરાય છે.",
    "You learned: hours × 60, then add the leftover minutes.": "તમે શીખ્યા: કલાક × 60, પછી બાકીની મિનિટ ઉમેરો.",
    "How many minutes are there in 5 h 50 min?": "5 કલાક 50 મિનિટમાં કેટલી મિનિટ છે?",
    "5 h 50 min in minutes?": "5 કલાક 50 મિનિટ, મિનિટમાં?",
    "Each hour bar made 60 minute bars, not 10.": "દરેક કલાકની પટ્ટીમાંથી 60 મિનિટની પટ્ટીઓ બની, 10 નહીં.",
    "Yes, 5 h 50 min is 350 min.": "હા, 5 કલાક 50 મિનિટ એટલે 350 મિનિટ.",
    "Write 4 h 10 min in minutes.": "4 કલાક 10 મિનિટને મિનિટમાં લખો.",
    "4 h 10 min in minutes?": "4 કલાક 10 મિનિટ, મિનિટમાં?",
    "Four rows of 60 minutes, and then the 10 leftover minutes.": "60 મિનિટની ચાર હરોળ, અને પછી બાકીની 10 મિનિટ.",
    "Right, 4 h 10 min makes 250 min.": "સાચું, 4 કલાક 10 મિનિટથી 250 મિનિટ બને છે.",
    "A train ride takes 6 h 45 min, so how many minutes is that?": "એક ટ્રેનની મુસાફરી 6 કલાક 45 મિનિટ લે છે, તો તે કેટલી મિનિટ થઈ?",
    "6 h 45 min in minutes?": "6 કલાક 45 મિનિટ, મિનિટમાં?",
    "Did the 45 leftover minutes go into the total?": "શું બાકીની 45 મિનિટ કુલમાં ઉમેરાઈ?",
    "Well done, the ride is 405 min long.": "શાબાશ, મુસાફરી 405 મિનિટની છે.",
    "Minutes into seconds": "મિનિટમાંથી સેકન્ડ",
    "Sixty seconds to a minute. Do you need the minutes first?": "એક મિનિટમાં સાઠ સેકન્ડ. શું પહેલાં મિનિટ જોઈએ?",
    "Tap Break down to split each minute bar into 60 second bars.": "દરેક મિનિટની પટ્ટીને 60 સેકન્ડની પટ્ટીઓમાં વહેંચવા તોડો દબાવો.",
    "The Break down key is at the bottom.": "તોડો બટન નીચે છે.",
    "Now tap Add to drop the 20 leftover seconds in.": "હવે બાકીની 20 સેકન્ડ મૂકવા ઉમેરો દબાવો.",
    "Tap the Add key to drop them in.": "તેમને મૂકવા ઉમેરો બટન દબાવો.",
    "Minutes × 60 gives seconds, and hours go to minutes first.": "મિનિટ × 60 થી સેકન્ડ મળે છે, અને કલાક પહેલાં મિનિટ બને છે.",
    "Add any leftover just once, in its own unit.": "જે બાકી છે તેને એક જ વાર, તેના પોતાના એકમમાં ઉમેરો.",
    "Every minute holds 60 seconds, so go one unit down at a time.": "દરેક મિનિટમાં 60 સેકન્ડ હોય છે, તેથી એક વારમાં એક એકમ નીચે જાઓ.",
    "You learned: minutes × 60, plus the leftover seconds, step by step.": "તમે શીખ્યા: મિનિટ × 60, વત્તા બાકીની સેકન્ડ, એક પછી એક પગલું.",
    "How many seconds are there in 26 min 15 s?": "26 મિનિટ 15 સેકન્ડમાં કેટલી સેકન્ડ છે?",
    "26 min 15 s in seconds?": "26 મિનિટ 15 સેકન્ડ, સેકન્ડમાં?",
    "Multiply 26 by 60, then add the 15 seconds just once.": "26 ને 60 વડે ગુણો, પછી 15 સેકન્ડ ફક્ત એક વાર ઉમેરો.",
    "Yes, 26 min 15 s is 1,575 s.": "હા, 26 મિનિટ 15 સેકન્ડ એટલે 1,575 સેકન્ડ.",
    "Change 6 min into seconds.": "6 મિનિટને સેકન્ડમાં ફેરવો.",
    "6 min in seconds?": "6 મિનિટ, સેકન્ડમાં?",
    "Six rows of 60 seconds, with nothing left over.": "60 સેકન્ડની છ હરોળ, કંઈ બાકી નથી.",
    "Right, 6 min makes 360 s.": "સાચું, 6 મિનિટથી 360 સેકન્ડ બને છે.",
    "How many seconds are there in 1 h 5 min, changing the hours to minutes first?": "પહેલાં કલાકને મિનિટમાં ફેરવીને, 1 કલાક 5 મિનિટમાં કેટલી સેકન્ડ છે?",
    "1 h 5 min in seconds?": "1 કલાક 5 મિનિટ, સેકન્ડમાં?",
    "1 h 5 min is 65 min, and each minute is 60 seconds.": "1 કલાક 5 મિનિટ એટલે 65 મિનિટ, અને દરેક મિનિટ 60 સેકન્ડ છે.",
    "Well done, 1 h 5 min is 3,900 s.": "શાબાશ, 1 કલાક 5 મિનિટ એટલે 3,900 સેકન્ડ.",
    "Part of an hour": "કલાકનો ભાગ",
    "Shade the part of the hour. How many minute cells is that?": "કલાકનો ભાગ રંગો. તે કેટલા મિનિટના ખાના છે?",
    "Tap Cut to cut the hour bar into 2 equal parts.": "કલાકની પટ્ટીને 2 સરખા ભાગમાં કાપવા કાપો દબાવો.",
    "Tap the Cut key at the bottom.": "નીચે કાપો બટન દબાવો.",
    "Now tap Shade to shade 1 of the 2 parts.": "હવે 2 માંથી 1 ભાગ રંગવા રંગ પૂરો દબાવો.",
    "The Shade key colours one part.": "રંગ પૂરો બટન એક ભાગ રંગે છે.",
    "A part of an hour is that part of the 60 minute cells.": "કલાકનો એક ભાગ, 60 મિનિટના ખાનાનો એ જ ભાગ છે.",
    "Whole hours × 60, then add the minutes in the shaded part.": "પૂરા કલાક × 60, પછી રંગેલા ભાગની મિનિટ ઉમેરો.",
    "Equal parts of the hour hold the same number of minutes.": "કલાકના સરખા ભાગોમાં મિનિટ પણ સરખી હોય છે.",
    "You learned: a part of an hour is that part of 60 min.": "તમે શીખ્યા: કલાકનો ભાગ 60 મિનિટનો એ જ ભાગ છે.",
    "How many minutes are there in 3 and 3/4 h?": "3 અને 3/4 કલાકમાં કેટલી મિનિટ છે?",
    "3 and 3/4 h in minutes?": "3 અને 3/4 કલાક, મિનિટમાં?",
    "3/4 of 60 is not 34, so count the shaded minute cells.": "60 નો 3/4 ભાગ 34 નથી, તેથી રંગેલા મિનિટના ખાના ગણો.",
    "Yes, 3 and 3/4 h is 225 min.": "હા, 3 અને 3/4 કલાક એટલે 225 મિનિટ.",
    "Write 1/5 h in minutes.": "1/5 કલાકને મિનિટમાં લખો.",
    "1/5 h in minutes?": "1/5 કલાક, મિનિટમાં?",
    "Count the minute cells in 1 of the 5 equal parts.": "5 સરખા ભાગમાંથી 1 ભાગના મિનિટના ખાના ગણો.",
    "Equal parts hold the same number of cells.": "સરખા ભાગોમાં ખાના પણ સરખા હોય છે.",
    "Share 60 minutes equally into 5 parts and count one part.": "60 મિનિટને 5 સરખા ભાગમાં વહેંચો અને એક ભાગ ગણો.",
    "Right, 1/5 h makes 12 min.": "સાચું, 1/5 કલાકથી 12 મિનિટ બને છે.",
    "Which is longer, 150 min or 2 and 3/4 h?": "કયું વધુ લાંબું છે, 150 મિનિટ કે 2¾ કલાક?",
    "Which is longer?": "કયું વધુ લાંબું છે?",
    "Change 2 and 3/4 h to minutes, then compare it with 150.": "2¾ કલાકને મિનિટમાં ફેરવો, પછી 150 સાથે સરખાવો.",
    "Well done, 165 min is longer than 150 min.": "શાબાશ, 165 મિનિટ 150 મિનિટ કરતાં લાંબું છે.",
  },
};

/* One entry per phase = one mount. Each phase opens on a WARM-UP (MODEL.warm[n]) worked by its guide steps;
   the three questions follow. Item fields: kind conv (u = the bigger unit's rung, big whole units, left the
   leftover smaller part), chain (hours and minutes to seconds, one step at a time), frac (whole hours and a
   fraction num/den of an hour; vs: the minutes it is compared with). */
const PHASES = [
  {
    n: 1,
    concept: "Days into hours",
    conceptId: "M1.S2.T3.C10", objectiveIds: ["O3"],
    says: ["How many hours in one day? Break down every day bar."],
    steps: [
      { say: "Tap Break down to split each day bar into 24 hour bars.", on: "break", hint: "Tap the Break down key at the bottom." },
      { say: "Now tap Add to drop the 4 leftover hours in with the rest.", on: "add", hint: "The Add key puts the tray in." },
    ],
    ladder: ["1 day is 24 h, so the days are multiplied by 24, never added to 24.", "Write days × 24 first, then add the leftover hours to that product."],
    closing: "Hours are shorter than days, so there are more of them: 24 in each day.",
    learned: "You learned: days × 24, then add the leftover hours.",
    traceback: "every day bar breaks into a row of 24 hour bars, the leftover hours drop in, and days × 24 + leftover = the hours, in green",
    items: [
      /* learn BS1: answer in the plan = 221 h (9 x 24 = 216, 216 + 5 = 221) */
      { qid: "M1.S2.T3.C10:BS1", kind: "conv", u: 0, big: 9, left: 5, parts: [{ label: "total", unit: "h" }], answer: [221],
        say: "How many hours are there in 9 days 5 h?", ask: "9 days 5 h in hours?",
        miss: "Each day bar made 24 hour bars, so multiply 9 by 24.", win: "Yes, 9 days 5 h is 221 h." },
      /* practice 1: answer in the plan = 54 h, because 2 x 24 = 48 and 48 + 6 = 54 */
      { qid: "M1.S2.T3.C10:1", kind: "conv", u: 0, big: 2, left: 6, parts: [{ label: "total", unit: "h" }], answer: [54],
        say: "Change 2 days 6 h into hours.", ask: "2 days 6 h in hours?",
        miss: "Two rows of 24 hours, and then the 6 leftover hours.", win: "Right, 2 days 6 h makes 54 h." },
      /* practice 5: answer in the plan = 308 h, because 12 x 24 = 288 and 288 + 20 = 308 */
      { qid: "M1.S2.T3.C10:5", kind: "conv", u: 0, big: 12, left: 20, parts: [{ label: "total", unit: "h" }], answer: [308],
        say: "A trip lasts 12 days 20 h, so how many hours is that?", ask: "12 days 20 h in hours?",
        miss: "Multiply 12 by 24 first, then add the 20 hours.", win: "Well done, the trip is 308 h long." },
    ],
  },
  {
    n: 2,
    concept: "Hours into minutes",
    conceptId: "M1.S2.T3.C11", objectiveIds: ["O3"],
    says: ["Sixty minutes to an hour. Break down each bar, then drop in the minutes left over."],
    steps: [
      { say: "Tap Break down to split each hour bar into 60 minute bars.", on: "break", hint: "Tap the Break down key first." },
      { say: "Now tap Add to drop the 15 leftover minutes in.", on: "add", hint: "Next comes the Add key, at the bottom." },
    ],
    ladder: ["1 h is 60 min, so the hours are multiplied by 60, not by 10.", "Write hours × 60 first, then add the leftover minutes once."],
    closing: "Every hour holds 60 minutes, and the minutes left over join at the end.",
    learned: "You learned: hours × 60, then add the leftover minutes.",
    traceback: "every hour bar breaks into a row of 60 minute bars, the leftover minutes drop in, and hours × 60 + leftover = the minutes, in green",
    items: [
      /* learn BS2: answer in the plan = 350 min (5 x 60 = 300, 300 + 50 = 350) */
      { qid: "M1.S2.T3.C11:BS2", kind: "conv", u: 1, big: 5, left: 50, parts: [{ label: "total", unit: "min" }], answer: [350],
        say: "How many minutes are there in 5 h 50 min?", ask: "5 h 50 min in minutes?",
        miss: "Each hour bar made 60 minute bars, not 10.", win: "Yes, 5 h 50 min is 350 min." },
      /* practice 2: answer in the plan = 250 min, because 4 x 60 = 240 and 240 + 10 = 250 */
      { qid: "M1.S2.T3.C11:2", kind: "conv", u: 1, big: 4, left: 10, parts: [{ label: "total", unit: "min" }], answer: [250],
        say: "Write 4 h 10 min in minutes.", ask: "4 h 10 min in minutes?",
        miss: "Four rows of 60 minutes, and then the 10 leftover minutes.", win: "Right, 4 h 10 min makes 250 min." },
      /* practice 6: answer in the plan = 405 min, because 6 x 60 = 360 and 360 + 45 = 405 */
      { qid: "M1.S2.T3.C11:6", kind: "conv", u: 1, big: 6, left: 45, parts: [{ label: "total", unit: "min" }], answer: [405],
        say: "A train ride takes 6 h 45 min, so how many minutes is that?", ask: "6 h 45 min in minutes?",
        miss: "Did the 45 leftover minutes go into the total?", win: "Well done, the ride is 405 min long." },
    ],
  },
  {
    n: 3,
    concept: "Minutes into seconds",
    conceptId: "M1.S2.T3.C12", objectiveIds: ["O4"],
    says: ["Sixty seconds to a minute. Do you need the minutes first?"],
    steps: [
      { say: "Tap Break down to split each minute bar into 60 second bars.", on: "break", hint: "The Break down key is at the bottom." },
      { say: "Now tap Add to drop the 20 leftover seconds in.", on: "add", hint: "Tap the Add key to drop them in." },
    ],
    ladder: ["Minutes × 60 gives seconds, and hours go to minutes first.", "Add any leftover just once, in its own unit."],
    closing: "Every minute holds 60 seconds, so go one unit down at a time.",
    learned: "You learned: minutes × 60, plus the leftover seconds, step by step.",
    traceback: "the minute bars break into rows of 60 second bars (hours first into minutes), the leftover seconds drop in once, and the seconds show in green",
    items: [
      /* learn BS3: answer in the plan = 1575 s (26 x 60 = 1,560, 1,560 + 15 = 1,575) */
      { qid: "M1.S2.T3.C12:BS3", kind: "conv", u: 2, big: 26, left: 15, parts: [{ label: "total", unit: "s" }], answer: [1575],
        say: "How many seconds are there in 26 min 15 s?", ask: "26 min 15 s in seconds?",
        miss: "Multiply 26 by 60, then add the 15 seconds just once.", win: "Yes, 26 min 15 s is 1,575 s." },
      /* practice 3: answer in the plan = 360 s, because 6 x 60 = 360 */
      { qid: "M1.S2.T3.C12:3", kind: "conv", u: 2, big: 6, left: 0, parts: [{ label: "total", unit: "s" }], answer: [360],
        say: "Change 6 min into seconds.", ask: "6 min in seconds?",
        miss: "Six rows of 60 seconds, with nothing left over.",
        ladder: ["Each minute bar became a row of 60 second bars.", "Find 6 groups of 60, since nothing is left over."], win: "Right, 6 min makes 360 s." },
      /* practice 7: answer in the plan = 3900 s, because 1 h 5 min is 65 min and 65 x 60 = 3900 */
      { qid: "M1.S2.T3.C12:7", kind: "chain", u: 1, big: 1, left: 5, parts: [{ label: "total", unit: "s" }], answer: [3900],
        say: "How many seconds are there in 1 h 5 min, changing the hours to minutes first?", ask: "1 h 5 min in seconds?",
        miss: "1 h 5 min is 65 min, and each minute is 60 seconds.", win: "Well done, 1 h 5 min is 3,900 s." },
    ],
  },
  {
    n: 4,
    concept: "Part of an hour",
    conceptId: "M1.S2.T3.C13", objectiveIds: ["O4"],
    says: ["Shade the part of the hour. How many minute cells is that?"],
    steps: [
      { say: "Tap Cut to cut the hour bar into 2 equal parts.", on: "cut", hint: "Tap the Cut key at the bottom." },
      { say: "Now tap Shade to shade 1 of the 2 parts.", on: "shade", hint: "The Shade key colours one part." },
    ],
    ladder: ["A part of an hour is that part of the 60 minute cells.", "Whole hours × 60, then add the minutes in the shaded part."],
    closing: "Equal parts of the hour hold the same number of minutes.",
    learned: "You learned: a part of an hour is that part of 60 min.",
    traceback: "the whole hours break into rows of 60 minute cells, the hour bar is cut and the part shaded, and the minutes show in green",
    items: [
      /* learn BS4: answer in the plan = 225 min (3 x 60 = 180, 3/4 of 60 = 45, 180 + 45 = 225) */
      { qid: "M1.S2.T3.C13:BS4", kind: "frac", whole: 3, num: 3, den: 4, parts: [{ label: "total", unit: "min" }], answer: [225],
        say: "How many minutes are there in 3 and 3/4 h?", ask: "3 and 3/4 h in minutes?",
        miss: "3/4 of 60 is not 34, so count the shaded minute cells.", win: "Yes, 3 and 3/4 h is 225 min." },
      /* practice 4: answer in the plan = 12 min, because 1/5 of 60 is 12 */
      { qid: "M1.S2.T3.C13:4", kind: "frac", whole: 0, num: 1, den: 5, parts: [{ label: "total", unit: "min" }], answer: [12],
        say: "Write 1/5 h in minutes.", ask: "1/5 h in minutes?",
        miss: "Count the minute cells in 1 of the 5 equal parts.",
        ladder: ["Equal parts hold the same number of cells.", "Share 60 minutes equally into 5 parts and count one part."], win: "Right, 1/5 h makes 12 min." },
      /* practice 8: answer in the plan = 2 and 3/4 h, because 2 and 3/4 h is 165 min, and that is more than 150 min */
      { qid: "M1.S2.T3.C13:8", kind: "frac", whole: 2, num: 3, den: 4, vs: 150, answer: "h",
        choices: [{ id: "h", label: "2 and 3/4 h" }, { id: "min", label: "150 min" }],
        say: "Which is longer, 150 min or 2 and 3/4 h?", ask: "Which is longer?",
        miss: "Change 2 and 3/4 h to minutes, then compare it with 150.",
        ladder: ["2 and 3/4 h is 2 hours and 3/4 of an hour, so change both to minutes.", "Write both lengths in the same unit, then compare."], win: "Well done, 165 min is longer than 150 min." },
    ],
  },
];

/* The numbers the working area needs (they go into the sidecar too): each phase's warm-up for its guide steps
   (a length whose result is none of the phase's answers) and the free-play start. */
const MODEL = {
  units: B2S_UNITS.map((u) => u.name),
  warm: {
    1: { kind: "conv", u: 0, big: 2, left: 4 },
    2: { kind: "conv", u: 1, big: 2, left: 15 },
    3: { kind: "conv", u: 2, big: 3, left: 20 },
    4: { kind: "frac", whole: 0, num: 1, den: 2 },
  } as any,
  free: { kind: "conv", u: 0, big: 3, left: 0 },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* the minutes, hours or seconds a question's length makes (Work's working line and the win) */
const b2sTotal = (it: any) => (it.kind === "chain" ? (it.big * 60 + it.left) * 60
  : it.kind === "frac" ? it.whole * 60 + (60 * it.num) / it.den
  : it.big * B2S_UNITS[it.u].per + it.left);
/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work: count the small
   units one by one (a day is 24 hours, an hour 60 minutes, a minute 60 seconds) */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const step = [24, 60, 60];
  let n = 0;
  if (it.kind === "conv") { for (let b = 0; b < it.big; b++) for (let c = 0; c < step[it.u]; c++) n++; n += it.left; }
  else if (it.kind === "chain") { let m = it.left; for (let b = 0; b < it.big; b++) m += 60; for (let k = 0; k < m; k++) n += 60; }
  else { for (let b = 0; b < it.whole; b++) n += 60; let cells = 0; for (let c = 0; c < 60; c++) if (c % it.den === 0) cells++; n += cells * it.num; }
  if (it.choices) return (n > it.vs ? "h" : "min") === it.answer;
  return Array.isArray(it.answer) && it.answer[0] === n;
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => (item.choices ? "min"
  : item.kind === "frac" ? String(item.whole * 60 + Number(String(item.num) + String(item.den)))
  : item.kind === "chain" ? String((item.big * 60 + item.left))
  : item.u === 0 ? String(item.big + 24 + item.left)                 /* P1: adds 24 instead of multiplying */
  : item.u === 1 ? String(item.big * 60)                             /* P2: leaves the leftover minutes out */
  : item.left ? String((item.big + item.left) * 60)                  /* P3: multiplies the leftover seconds by 60 too */
  : String(item.big + 60));
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : item.choices ? [String(b2sTotal(item)) + " min"] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : (HOOK.check && HOOK.check(), T.submit(item.answer)));
/* the agent's answer() for an item made on the working area: none here, so the agent types it */
const answer = (item: any, v: any) => undefined;
/* the agent's check() before Enter: perform the question's acts at once (never in the demo stage) */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* a fraction drawn stacked (numerator over a bar over denominator), centred on x, its bar at y */
function B2sFrac({ x, y, a, b, size, fill, tight = false }: any) {
  const w = size * 0.75 * Math.max(String(a).length, String(b).length) + 10;
  /* tight (the summary thumbnail): the digits 4 off the bar, so the stack is about 48 tall */
  return (
    <g>
      <text x={x} y={y - (tight ? 4 : 8)} textAnchor="middle" fontSize={size} fontWeight={700} fill={fill}>{a}</text>
      <line x1={x - w / 2} y1={y} x2={x + w / 2} y2={y} stroke={fill} strokeWidth={3.5} strokeLinecap="round" />
      <text x={x} y={y + (tight ? size * 0.72 + 4 : size * 0.8 + 4)} textAnchor="middle" fontSize={size} fontWeight={700} fill={fill}>{b}</text>
    </g>
  );
}
/* width a text of `s` takes at `size` (Poppins about 0.56 em a character; a little more for safety) */
const b2sTw = (s: string, size: number) => String(s).length * size * 0.58;
/* the same, closer for Hindi and Gujarati: zero-advance marks take no width, letters about half an em */
const B2S_ZERO = /[\u0900-\u0902\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962\u0963\u0A81\u0A82\u0ABC\u0AC1-\u0AC8\u0ACD\u0AE2\u0AE3]/;
const B2S_FACT_EST = (s: string) => b2sTwL(s, T.micro) * 1.1;
const b2sTwL = (s: string, size: number) => Array.from(String(s)).reduce((a, ch) => a + size * (B2S_ZERO.test(ch) ? 0 : /[\u0900-\u097F]/.test(ch) ? 0.7 : /[\u0A80-\u0AFF]/.test(ch) ? 0.66 : ch === " " ? 0.3 : 0.6), 0);

/* ── the working area ────────────────────────────────────────────────────────────────────────
   keyOnly board: 1472 x 520 shut, 900 open (bigPad); box.key is the key's corner (nothing under it).
   Left: the unit ladder (days, hours, minutes, seconds) with each unit fact in violet between the rungs.
   Right: the given row (deep blue bars and the leftover tray), the rows the bars break into, the working line,
   and ONE key at the bottom centre whose label follows the act (Break down, Add, Cut, Shade). */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  /* Devanagari and Gujarati sit high on a central baseline: lower them a little in chips and pills */
  const dv = lang === "hi" || lang === "gu" ? 6 : 0;
  /* MEASURED text widths (getBBox, again when the fonts arrive), by the text drawn: the lit fact and the tray's chip */
  const mEl = useRef<any>({});
  const [mw, setMw] = useState<any>({});
  const mref = (k: string) => (el: any) => { if (el) mEl.current[k] = el; else delete mEl.current[k]; };
  useEffect(() => {
    let on = true;
    const m = () => {
      if (!on) return;
      const nx: any = {};
      let ch = false;
      for (const k of Object.keys(mEl.current)) {
        try { const w = mEl.current[k].getBBox().width; if (w > 0) { nx[k] = w; if (Math.abs((mw[k] || 0) - w) > 0.5) ch = true; } } catch (e) { /* not drawn */ }
      }
      if (ch) setMw((p: any) => ({ ...p, ...nx }));
    };
    m();
    /* a direct mount draws before the bundled Poppins has loaded: measure again when it arrives (ready AND loadingdone) */
    let fs: any = null;
    try { fs = (document as any).fonts; fs.ready.then(m); fs.addEventListener("loadingdone", m); } catch (e) { fs = null; }
    return () => { on = false; try { if (fs) fs.removeEventListener("loadingdone", m); } catch (e) { /* none */ } };
  });
  const wOfM = (k: string, est: number) => (mw[k] > 0 ? mw[k] : est);
  const demo = (stage === "demo" || stage === "teach") && !!MODEL.warm[n];
  const it = free ? null : demo ? MODEL.warm[n] : item;

  /* the board, keyed to the ENTRY of a question (PATTERNS §18): a fresh board whenever the question changes */
  const qk = free ? "free" : n + ":" + (demo ? "warm" : "q" + index);
  const entry = useRef({ qk: "", n: 0 });
  if (entry.current.qk !== qk) entry.current = { qk, n: entry.current.n + 1 };
  const ek = qk + "#" + entry.current.n;
  const fresh = () => ({ ek, done: 0, pt: 0, acting: "", tb: false, fu: MODEL.free.u, fb: MODEL.free.big });
  const [raw, setRaw] = useState<any>(fresh);
  const S = raw.ek === ek ? raw : fresh();
  const put = (o: any) => setRaw((p: any) => ({ ...(p.ek === ek ? p : fresh()), ...o }));

  const cur: any = free ? { kind: "conv", u: S.fu, big: S.fb, left: 0 } : it;
  const seq = b2sSeq(cur);
  const d = S.done;
  const nextAct = d < seq.length ? seq[d] : null;
  const winNow = !free && !demo && (stage === "win" || stage === "idle");
  const reveal = winNow || S.tb || (demo && d >= seq.length);

  /* the gate: the answer waits for the acts (user mode, after a real touch); never in AI mode or a toolApi run */
  const touched = useRef(false);
  const gated = useRef(false);
  const gateWant = stage === "ask" && !S.tb && d < seq.length && touched.current;
  /* what the window listeners read (they are registered once) */
  const live = useRef<any>({});
  live.current = { ...live.current, stage, d, seq, ek, q: item && item.say };
  /* when this question opened: a double press that opens it must not put the act nudge over the question */
  useEffect(() => { live.current.openAt = Date.now(); }, [stage, ek]);
  useEffect(() => {
    let user = false;
    try { user = (window as any).toolApi.getState().mode === "user"; } catch (e) { user = false; }
    if (gateWant && user) { gated.current = true; api.lock(true); }
    else if (gated.current) { gated.current = false; api.lock(false); }
  }, [gateWant, ek, S.acting, d]);

  /* geometry: the ladder at the left, the main area from LX to R */
  const W0 = box ? box.w : W.w;
  /* laid out from the OPEN width (900 with bigPad), so the picture keeps its size and place when the keypad opens */
  const R = Math.min(W0, 900) - 12;
  const kx = Math.min(R, box && box.key ? box.key.x - 12 : R);
  const LX = 292;
  const fromU = cur.kind === "frac" ? 1 : cur.u;
  const toU = cur.kind === "chain" && d >= 3 ? 3 : cur.kind === "chain" ? 2 : fromU + 1;
  const keyW = 260, keyH = 76, keyY = 436, keyX = Math.round((LX + R) / 2 - keyW / 2);

  /* the given row (y 6 to 86) */
  const unitBig = cur.kind === "frac" ? "h" : B2S_UNITS[cur.u].short;
  const unitSmall = cur.kind === "frac" ? "min" : B2S_UNITS[cur.u + 1].short;
  const bigLabel = cur.kind === "frac" ? "" : cur.big === 1 ? tx(cur.u === 0 ? "1 day" : "1 " + unitBig) : cur.big + " " + tx(unitBig);
  const labW = cur.kind === "frac" ? (cur.whole ? 44 : 0) + 64 + b2sTw(tx("h"), T.prompt) : b2sTw(bigLabel, 40);
  const hasTray = cur.kind !== "frac" && cur.left > 0;
  const trayLab = hasTray ? cur.left + " " + tx(unitSmall) : "";
  const trayW = Math.max(100, wOfM("tray:" + trayLab, b2sTwL(trayLab, T.label)) + 24 + 32), trayH = 78, trayX = kx - trayW - 6, trayY = 6;
  const cmpW = Math.max(190, b2sTw((cur.vs || "") + " " + tx("min"), T.prompt) + 48), cmpX = kx - cmpW - 6;
  const barsX0 = LX + labW + 22;
  const nBars = cur.kind === "frac" ? cur.whole : cur.big;
  const barsEnd = hasTray ? trayX - 24 : cur.vs ? cmpX - 24 : kx - 10;
  const bg = nBars > 14 ? 4 : 8;
  /* many bars and a long unit word (hi, gu): the given bars go in two rows of half height */
  const perRow = nBars > 12 ? 10 : nBars && (barsEnd - barsX0) / nBars - bg < 10 ? Math.ceil(nBars / 2) : nBars;
  const stripRows = nBars ? Math.ceil(nBars / perRow) : 1;
  const bw = nBars ? Math.max(5, Math.min(60, (barsEnd - barsX0) / perRow - bg)) : 0;
  const barH = stripRows > 1 ? Math.floor((64 - 4 * (stripRows - 1)) / stripRows) : 64;
  const barAt = (k: number) => ({ x: barsX0 + (k % perRow) * (bw + bg), y: 14 + Math.floor(k / perRow) * (barH + 4) });
  /* before Break down the given bars stand BIG in the rows area (the picture the child acts on), then move to the top strip */
  const bigGiven = nBars > 0 && !(d >= 1 && seq[0] === "break");
  const bigGap = nBars > 14 ? 6 : 14;
  const bigW = nBars ? Math.max(8, Math.min(nBars <= 3 ? 180 : 90, (R - LX - 10) / nBars - bigGap)) : 0;
  const bigY = cur.kind === "frac" ? 210 : 104, bigH = cur.kind === "frac" ? 126 : 220;
  const bigAt = (k: number) => ({ x: LX + k * (bigW + bigGap), y: bigY });
  const broke = d >= 1 && seq[0] === "break";
  const added = cur.kind !== "frac" && cur.left > 0 && d >= 2;

  /* the act, done when the child does it (or Enter, the agent's check(), solve()); reported with api.did */
  const playing = useRef(false);
  const lastKey = useRef(0);
  const act = async (on: any) => {
    if (on !== nextAct) { if (stage === "demo") api.did(on); return; }
    if (playing.current) return;
    playing.current = true;
    const o: any = actFor(on);
    put({ acting: on, pt: 0 });
    const ok = await api.act(o);
    playing.current = false;
    if (!ok) { put({ acting: "", pt: 0 }); return; }
    put({ done: d + 1, acting: "", pt: 0 });
    api.sfx.settle();
    if (stage === "demo") api.did(on);
  };
  /* one press = one step: a second press within 400 ms (a double tap) does nothing */
  /* ...and no act press counts in the first 900 ms of a question (a late second tap on the last guide key must not act on
     question 1); toolApi.answer / check / gotoStep never come through here */
  const guard = () => {
    const t = Date.now();
    if (t - lastKey.current < 400) return false;
    if (stage === "ask" && t - (live.current.openAt || 0) < 900) return false;
    lastKey.current = t; return true;
  };
  const pressKey = (on: any) => {
    if (!guard()) return;
    touched.current = true;
    act(on);
  };
  api.onEnter(stage === "demo" && stepOn ? () => act(stepOn) : null);
  HOOK.demo = stage === "demo" && stepOn ? () => act(stepOn) : null;
  HOOK.check = stage === "ask" && d < seq.length ? () => { put({ done: seq.length, acting: "", pt: 0 }); return undefined; } : null;

  /* the rows block (y 100 to 356) */
  const RY = 100, RH = 250;
  const rowsBlock = () => {
    const rows: any[] = [];
    let per = 0, fill = "url(#b2s-blue-bar)";
    if (cur.kind === "conv") {
      per = B2S_UNITS[cur.u].per;
      const shown = broke ? cur.big : S.acting === "break" ? S.pt : 0;
      for (let r = 0; r < shown; r++) rows.push({ c: per, f: "row" });
      if (added || (S.acting === "add" && S.pt > 0)) rows.push({ c: cur.left, f: "left" });
    } else if (cur.kind === "chain") {
      per = 60;
      if (d >= 3 || S.acting === "break2") {
        const m = cur.big * 60 + cur.left, shown = d >= 3 ? m : Math.round(m * Math.min(1, S.pt / 3));
        for (let r = 0; r < shown; r++) rows.push({ c: 60, f: r >= cur.big * 60 ? "left" : "row", gapAt: r === cur.big * 60 });
      } else {
        if (d >= 1 || (S.acting === "break" && S.pt > 0)) rows.push({ c: 60, f: "row" });
        if (d >= 2 || (S.acting === "add" && S.pt > 0)) rows.push({ c: cur.left, f: "left" });
      }
    } else {
      per = 60;
      const shown = broke ? cur.whole : S.acting === "break" ? S.pt : 0;
      for (let r = 0; r < shown; r++) rows.push({ c: 60, f: "row" });
    }
    if (!rows.length) return null;
    const y0 = cur.kind === "frac" ? (hbSide ? 236 : 210) : RY;
    const hMax = cur.kind === "frac" ? 336 - y0 : RH;
    const nR = rows.length, tens = nR > 12 ? Math.floor((nR - 1) / 10) : 0, tenGap = 3;
    const gapIdx = rows.findIndex((q: any) => q.gapAt);
    const extra = gapIdx >= 0 ? 4 : 0;
    const pitch = Math.max(2, Math.min(38, Math.floor((hMax - extra - tens * tenGap) / nR)));
    const gap = pitch >= 12 ? 4 : pitch >= 6 ? 2 : 1;
    const rh = pitch - gap;
    const thin = rh < 8;
    const rw = R - LX - 10;
    const cell = rw / per;
    const pid = "b2s-cells-" + per;
    const g = winNow || S.tb;
    return (
      <g data-role="rows">
        <defs>
          <pattern id={pid} patternUnits="userSpaceOnUse" x={LX} y={0} width={cell} height={8}>
            <line x1={0.6} y1={0} x2={0.6} y2={8} stroke={C.ink} strokeOpacity={0.75} strokeWidth={1.6} />
          </pattern>
        </defs>
        {rows.map((r: any, k: number) => {
          const y = y0 + k * pitch + (tens ? Math.floor(k / 10) * tenGap : 0) + (gapIdx >= 0 && k >= gapIdx ? extra : 0), w = r.c * cell;
          const f = g ? "url(#b2s-green-bar)" : r.f === "left" ? "url(#b2s-amber-bar)" : fill;
          return (
            <g key={k}>
              <rect x={LX} y={y} width={w} height={rh} rx={thin ? 0 : Math.min(5, rh / 3)} fill={f} stroke={thin ? "none" : C.ink} strokeWidth={1.6} />
              {!thin && <rect x={LX} y={y} width={w} height={rh} fill={"url(#" + pid + ")"} pointerEvents="none" />}
            </g>
          );
        })}
      </g>
    );
  };

  /* the hour bar of sixty minute cells (phase 4) */
  const hbLab = tx("1 h");
  /* the "1 h" label stands above the bar's right end, or beside it when the 150 min card holds the top right */
  const hbSide = cur.kind === "frac" && !!cur.vs;
  const HB = { x: LX, y: RY, w: R - LX - 10, h: cur.kind === "frac" && cur.whole ? 84 : 150 };   /* = the rows' length (rw) */
  const shadedN = cur.kind === "frac" ? (d >= seq.length ? cur.num : S.acting === "shade" ? S.pt : 0) : 0;
  const cutDone = cur.kind === "frac" && (d >= seq.indexOf("cut") + 1 || S.acting === "cut");
  const cutShown = cur.kind === "frac" ? (d >= seq.indexOf("cut") + 1 ? cur.den - 1 : S.acting === "cut" ? S.pt : 0) : 0;
  const hourBar = () => {
    if (cur.kind !== "frac") return null;
    const part = HB.w / cur.den, cell = HB.w / 60;
    return (
      <g data-role="hour-bar" filter="url(#b2s-card-shadow)">
        <defs>
          <pattern id="b2s-hcells" patternUnits="userSpaceOnUse" x={HB.x} y={0} width={cell * 5} height={8}>
            <line x1={1.2} y1={0} x2={1.2} y2={8} stroke={C.ink} strokeWidth={2.6} />
            {[1, 2, 3, 4].map((j) => <line key={j} x1={j * cell} y1={0} x2={j * cell} y2={8} stroke={C.ink} strokeWidth={1.3} />)}
          </pattern>
        </defs>
        <rect x={HB.x} y={HB.y} width={HB.w} height={HB.h} rx={10} fill={C.paper} stroke={C.ink} strokeWidth={3} />
        {Array.from({ length: shadedN }, (_, k) => (
          <rect key={k} x={HB.x + k * part} y={HB.y} width={part} height={HB.h} fill={winNow || S.tb ? "url(#b2s-green-bar)" : "url(#b2s-amber-bar)"} />
        ))}
        <rect x={HB.x} y={HB.y} width={HB.w} height={HB.h} rx={10} fill="url(#b2s-hcells)" pointerEvents="none" />
        {Array.from({ length: cutShown }, (_, k) => (
          <line key={k} x1={HB.x + (k + 1) * part} y1={HB.y - 8} x2={HB.x + (k + 1) * part} y2={HB.y + HB.h + 8} stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
        ))}
        <rect x={HB.x} y={HB.y} width={HB.w} height={HB.h} rx={10} fill="none" stroke={C.ink} strokeWidth={3} />
        {hbSide ? <text x={HB.x + HB.w} y={HB.y + HB.h + 39} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{hbLab}</text>
          : <text x={HB.x + HB.w} y={HB.y - 12} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{hbLab}</text>}
      </g>
    );
  };

  /* the act's on-screen tool (PATTERNS §15) */
  function actFor(on: any) {
    if (on === "break") {
      if (cur.kind === "frac" || cur.kind === "conv") {
        const pts = Array.from({ length: nBars }, (_, k) => ({ x: bigAt(k).x + bigW / 2, y: bigY + bigH / 2 }));
        return { tool: "knife", moves: "slice", at: pts, onPoint: (i: number) => put({ pt: i + 1 }) };
      }
      return { tool: "knife", moves: "slice", at: [{ x: barsX0 + bw / 2, y: 46 }], onPoint: (i: number) => put({ pt: i + 1 }) };
    }
    if (on === "add") {
      const rowsN = cur.kind === "chain" ? 1 : cur.big;
      const tw = trayW - 32;
      const hold = (
        <g>
          <rect x={-tw / 2} y={-25} width={tw} height={50} rx={10} fill={C.paper} stroke={shade(B2S_AMBER, 0.4)} strokeWidth={1.5} />
          <text x={0} y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(B2S_BLUE, 0.25)}>{trayLab}</text>
        </g>
      );
      return { tool: "hand", moves: "carry", from: { x: trayX + trayW / 2, y: trayY + trayH / 2 }, hold,
        at: [{ x: LX + 120, y: RY + Math.min(rowsN * 38, RH - 20) }], onPoint: () => put({ pt: 1 }) };
    }
    if (on === "break2") return { tool: "knife", moves: "slice", at: [{ x: LX + 60, y: RY + 17 }, { x: LX + 200, y: RY + 17 }, { x: LX + 340, y: RY + 17 }], onPoint: (i: number) => put({ pt: i + 1 }) };
    if (on === "cut") {
      const part = HB.w / cur.den;
      return { tool: "knife", moves: "slice", at: Array.from({ length: cur.den - 1 }, (_, k) => ({ x: HB.x + (k + 1) * part, y: HB.y + HB.h / 2 })), onPoint: (i: number) => put({ pt: i + 1 }) };
    }
    const part = HB.w / cur.den;
    return { tool: "pencil", moves: "draw", marks: true, at: Array.from({ length: cur.num }, (_, k) => ({ x: HB.x + (k + 0.5) * part, y: HB.y + HB.h / 2 })), onPoint: (i: number) => put({ pt: i + 1 }) };
  }

  /* the traceback: every act done, the working line ends on the whole right answer (unmarked) */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    playing.current = false;
    put({ done: 0, acting: "", pt: 0, tb: true });
    tl.run(seq.map((_, k) => [650, () => put({ done: k + 1 })]).concat([[700, () => {}]]), () => api.lock(false));
  }, [wrong]);
  const B2S_NUDGE: any = { add: "Now tap Add.", break2: "Now tap Break down again.", cut: "Now tap Cut.", shade: "Now tap Shade." };
  /* the nudge for the act still waiting: the dimmed Answer key, a plain Enter or the Hint key at a locked question say it */
  const hintN = useRef({ tag: "", n: 0 });
  useEffect(() => {
    const L = () => live.current;
    const waits = () => L().stage === "ask" && gated.current && L().d < L().seq.length;
    const nudge = () => { if (!waits() || Date.now() - (L().openAt || 0) < 900) return; const { d: dd, seq: sq } = L();
      if (dd === 0) { if (sq[0] === "cut") api.say("Tap Cut first."); else api.say("Tap Break down first."); }
      else api.say(B2S_NUDGE[sq[dd]]); };
    const onKey = (e: any) => {
      if (!e.isTrusted || e.repeat) return;   /* a held key never acts, nudges or arms */
      if (L().stage === "demo" && (e.key === "Enter" || e.key === " ")) {
        const ae: any = document.activeElement;
        if (!ae || ae === document.body || (ae.closest && ae.closest('[data-zone="work"]'))) touched.current = true;
      }
      if (e.key === "Enter" && waits()) setTimeout(nudge, 60);
    };
    const onClick = (e: any) => {
      if (!e.isTrusted) return;
      const c = e.target && e.target.closest ? e.target.closest("[data-control]") : null;
      const id = c ? c.getAttribute("data-control") : "";
      if (L().stage === "demo" && e.target && e.target.closest && e.target.closest('[data-zone="work"]')) touched.current = true;
      if (!waits()) return;
      if (id === "answer-open" || id === "key-enter") setTimeout(nudge, 60);
      if (id === "again") {
        const tag = L().ek + ":" + L().d;
        hintN.current = { tag, n: hintN.current.tag === tag ? hintN.current.n + 1 : 1 };
        /* odd presses re-show the question, even ones say the act still waiting */
        if (hintN.current.n % 2 === 0) setTimeout(nudge, 60);
        else setTimeout(() => { if (waits() && L().q) api.say(L().q); }, 60);
      }
    };
    window.addEventListener("keydown", onKey, true);
    window.addEventListener("click", onClick, true);
    return () => { window.removeEventListener("keydown", onKey, true); window.removeEventListener("click", onClick, true); };
  }, []);
  const nudged = useRef("");
  useEffect(() => {
    if (stage !== "ask" || S.tb || S.acting || d === 0) return;
    if (d < seq.length) {
      if (!gated.current || nudged.current === ek + ":" + d) return;
      nudged.current = ek + ":" + d;
      api.say(B2S_NUDGE[seq[d]]);
    } else if (nudged.current.startsWith(ek + ":")) { nudged.current = ""; api.say(item.say); }
  }, [d, S.acting, ek]);
  /* the win line, said once a question is won (the phase's closing replaces it at the last question) */
  const wonFor = useRef("");
  useEffect(() => {
    if (stage !== "win" || free || !item || !item.win || wonFor.current === ek) return;
    wonFor.current = ek;
    api.say(item.win);
  }, [stage, ek]);
  useEffect(() => () => tl.stop(), [qk]);

  /* the working lines: pieces of at most four words. One size for every line (44 when they all fit on one line each,
     else 36), a piece that cannot fit wraps under its line, and a line is never closer than 14 to the one above */
  const workLine = () => {
    const ink = C.ink, green = shade(B2S_GREEN, 0.25);
    const total = b2sTotal(cur);
    const L1: any[] = [], L2: any[] = [];
    const P = (L: any[], s: string, fill = ink) => L.push({ s, fill });
    if (cur.kind === "conv") {
      const per = B2S_UNITS[cur.u].per, us = tx(B2S_UNITS[cur.u + 1].short);
      if (d >= 1) P(L1, cur.big + " × " + per + " " + us);
      if (added) P(L1, "+ " + cur.left + " " + us);
      if (reveal && d >= seq.length) P(L1, "= " + indian(total) + " " + us, green);
    } else if (cur.kind === "chain") {
      const m = cur.big * 60 + cur.left;
      if (d >= 1) P(L1, cur.big + " × 60 " + tx("min"));
      if (d >= 2) { P(L1, "+ " + cur.left + " " + tx("min")); P(L1, "= " + m + " " + tx("min")); }
      if (d >= 3) P(L2, m + " × 60 " + tx("s"));
      if (reveal && d >= 3) P(L2, "= " + indian(total) + " " + tx("s"), green);
    } else {
      if (broke) P(L1, cur.whole + " × 60 " + tx("min"));
      if (shadedN >= cur.num && d >= seq.length) {
        if (broke) P(L1, "+");
        L1.push({ frac: true });
        P(L1, tx("of 60 min"));
      }
      if (reveal && d >= seq.length) P(L2, "= " + indian(total) + " " + tx("min"), green);
      if (reveal && d >= seq.length && cur.vs) { L2.push({ gt: total > cur.vs }); P(L2, cur.vs + " " + tx("min")); }
    }
    const avail = R - LX;
    const FR = T.label, frW = FR * 0.75 * Math.max(String(cur.num || "").length, String(cur.den || "").length) + 10;
    const wOf = (q: any, sz: number) => (q.frac ? frW : q.gt !== undefined ? sz * 0.62 : b2sTwL(q.s, sz));
    const lineW = (L: any[], sz: number) => L.reduce((a, q) => a + wOf(q, sz), 0) + 24 * Math.max(0, L.length - 1);
    const sz = [L1, L2].every((L) => lineW(L, T.speech) <= avail) ? T.speech : Math.round(T.prompt * 0.9);
    const out: any[] = [];
    let y = 404;
    for (const L of [L1, L2]) {
      if (!L.length) continue;
      const hasFrac = L.some((q) => q.frac);
      let x = LX;
      for (const q of L) {
        const w = wOf(q, sz);
        if (x > LX && x + w > R) { x = LX; y += sz + 14; }
        if (q.frac) out.push(<B2sFrac key={out.length} x={x + w / 2} y={y - sz * 0.32} a={cur.num} b={cur.den} size={FR} fill={ink} />);
        else if (q.gt !== undefined) {
          const h = sz * 0.5, cx = x + w / 2, cy = y - sz * 0.34;
          out.push(<path key={out.length} d={q.gt ? `M${cx - h / 2} ${cy - h / 2}L${cx + h / 2} ${cy}L${cx - h / 2} ${cy + h / 2}` : `M${cx + h / 2} ${cy - h / 2}L${cx - h / 2} ${cy}L${cx + h / 2} ${cy + h / 2}`}
            fill="none" stroke={ink} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />);
        } else out.push(<text key={out.length} x={x} y={y} fontSize={sz} fontWeight={700} fill={q.fill}>{q.s}</text>);
        x += w + 24;
      }
      /* the next line clears this one's descenders, and a stacked fraction's whole height */
      y += hasFrac ? Math.max(sz + 14, FR * 0.8 + 4 + 8 + 14 + sz * 0.72 + sz * 0.32) : sz + 14;
    }
    return <g data-role="working">{out}</g>;
  };

  /* the given row */
  const givenRow = () => {
    const blueInk = shade(B2S_BLUE, 0.25);
    const dim = broke || (cur.kind === "chain" && d >= 1);
    return (
      <g data-role="given">
        {cur.kind === "frac" ? (
          <g>
            {cur.whole > 0 && <text x={LX + 20} y={60} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={blueInk}>{cur.whole}</text>}
            <B2sFrac x={LX + (cur.whole ? 44 : 0) + 30} y={40} a={cur.num} b={cur.den} size={T.label} fill={blueInk} />
            <text x={LX + (cur.whole ? 44 : 0) + 64} y={60} fontSize={T.prompt} fontWeight={700} fill={blueInk}>{tx("h")}</text>
          </g>
        ) : (
          <text x={LX} y={60} fontSize={T.prompt} fontWeight={700} fill={blueInk}>{bigLabel}</text>
        )}
        {!bigGiven && Array.from({ length: nBars }, (_, k) => (
          <g key={k} filter={dim ? undefined : "url(#b2s-card-shadow)"}>
            <rect x={barAt(k).x} y={barAt(k).y} width={bw} height={barH} rx={Math.min(8, barH / 4)}
              fill={dim ? tint(B2S_BLUE, 0.78) : "url(#b2s-blue-bar)"} stroke={dim ? tint(B2S_BLUE, 0.3) : shade(B2S_BLUE, 0.35)} strokeWidth={2.5} />
            {!dim && <rect x={barAt(k).x + 1} y={barAt(k).y + 1} width={Math.max(1, bw - 2)} height={barH * 0.31} rx={Math.min(6, barH / 5)} fill="#FFFFFF" fillOpacity={0.25} pointerEvents="none" />}
          </g>
        ))}
        {hasTray && (
          <g data-role="tray" filter="url(#b2s-card-shadow)">
            <rect x={trayX} y={trayY} width={trayW} height={trayH} rx={12} fill={tint(B2S_AMBER, 0.75)} stroke={shade(B2S_AMBER, 0.35)} strokeWidth={2.5} />
            <Skin name="tray" x={trayX} y={trayY} w={trayW} h={trayH} fit="stretch" />
            {!added && S.acting !== "add" && (
              <g>
                <rect x={trayX + 16} y={trayY + 14} width={trayW - 32} height={50} rx={10} fill={C.paper} fillOpacity={0.94} stroke={shade(B2S_AMBER, 0.4)} strokeWidth={1.5} />
                <text ref={mref("tray:" + trayLab)} x={trayX + trayW / 2} y={trayY + 39 + (dv ? 3 : 0)} textAnchor="middle" dominantBaseline="central" fontSize={T.label} fontWeight={700} fill={blueInk}>{trayLab}</text>
              </g>
            )}
          </g>
        )}
        {cur.vs && (
          <g data-role="compare" filter="url(#b2s-card-shadow)">
            <rect x={cmpX} y={8} width={cmpW} height={76} rx={14} fill={C.paper} stroke={C.ink} strokeWidth={3} />
            <text x={cmpX + cmpW / 2} y={46 + dv} textAnchor="middle" dominantBaseline="central" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{cur.vs + " " + tx("min")}</text>
          </g>
        )}
      </g>
    );
  };

  /* the given bars, big, before Break down; a bar the knife has passed shows its cells */
  const bigBars = () => {
    if (!bigGiven) return null;
    const per = cur.kind === "conv" ? B2S_UNITS[cur.u].per : 60;
    const sliced = S.acting === "break" ? S.pt : 0;
    return (
      <g data-role="given-big">
        {Array.from({ length: nBars }, (_, k) => {
          const b = bigAt(k);
          let path = "";
          if (k < sliced) for (let c = 1; c < per; c++) { const y = Math.round(b.y + (c * bigH) / per) + 0.5; path += "M" + b.x + " " + y + "H" + (b.x + bigW); }
          return (
            <g key={k} filter="url(#b2s-card-shadow)">
              <rect x={b.x} y={b.y} width={bigW} height={bigH} rx={Math.min(10, bigW / 3)} fill="url(#b2s-blue-bar)" stroke={shade(B2S_BLUE, 0.35)} strokeWidth={2.5} />
              {k < sliced && <path d={path} stroke="#FFFFFF" strokeOpacity={0.85} strokeWidth={per > 30 ? 1 : 2} />}
            </g>
          );
        })}
      </g>
    );
  };

  /* the unit ladder: four rungs, the unit fact in violet between them; the rungs in play are lit */
  const ladder = () => {
    const rh = 76, gap = 60, y0 = 18, vInk = shade(B2S_VIOLET, 0.2), LC = 140;
    /* the lit fact's pill: the measured text + 2 x 12, 40 tall (6 air to the rungs), inside x 6..262 (18 short of the main area) */
    const litFact = tx(B2S_UNITS[Math.min(2, fromU)].fact);
    const fw = wOfM("fact:" + litFact, B2S_FACT_EST(litFact) + 20);
    const pw = Math.min(276, fw + 24), ph = 40;
    return (
      <g data-role="ladder">
        {B2S_UNITS.map((u, i) => (
          <g key={"rail" + i}>
            <line x1={LC - 109} y1={y0 + i * (rh + gap) + (S.tb && fromU === i - 1 ? 4 : 0)} x2={LC - 109} y2={y0 + i * (rh + gap) + rh - (S.tb && fromU === i ? 4 : 0)} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
            <line x1={LC + 109} y1={y0 + i * (rh + gap) + (S.tb && fromU === i - 1 ? 4 : 0)} x2={LC + 109} y2={y0 + i * (rh + gap) + rh - (S.tb && fromU === i ? 4 : 0)} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
          </g>
        ))}
        {B2S_UNITS.map((u, i) => {
          const y = y0 + i * (rh + gap);
          const isFrom = i === fromU, isTo = i === toU;
          return (
            <g key={u.name} filter="url(#b2s-card-shadow)">
              <rect x={LC - 99} y={y} width={198} height={rh} rx={14} fill={isFrom ? tint(B2S_BLUE, 0.82) : isTo ? tint(B2S_GREEN, 0.82) : C.paper}
                stroke={isFrom ? shade(B2S_BLUE, 0.15) : isTo ? shade(B2S_GREEN, 0.15) : C.ink} strokeWidth={isFrom || isTo ? 4 : 2.5} />
              <text x={LC} y={y + rh / 2 + dv} textAnchor="middle" dominantBaseline="central" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(u.name)}</text>
              {u.fact && S.tb && i === fromU && (
                <rect x={LC - pw / 2} y={y + rh + (gap - ph) / 2} width={pw} height={ph} rx={10} fill={tint(B2S_VIOLET, 0.8)} stroke={B2S_VIOLET} strokeWidth={2} />
              )}
              {u.fact && (
                <text ref={i === fromU ? mref("fact:" + tx(u.fact)) : undefined} x={LC} y={y + rh + gap / 2 + (lang === "hi" ? 14 : lang === "gu" ? 11 : /[gjpqy]/.test(tx(u.fact)) ? 7 : 10)} textAnchor="middle" fontSize={T.micro} fontWeight={700}
                  fill={vInk} stroke={C.paper} strokeWidth={5} strokeLinejoin="round" paintOrder="stroke">
                  {tx(u.fact).split("=")[0]}<tspan dx={10}>=</tspan><tspan dx={10}>{tx(u.fact).split("=").slice(1).join("=")}</tspan>
                </text>
              )}
            </g>
          );
        })}
      </g>
    );
  };

  /* the free-play keys: Unit (days, h, min), More (1 to 9 bars), Break down */
  const freeKeys = () => {
    const ks = [
      { id: "unit", label: "Unit", w: 150, on: () => { if (!guard()) return; touched.current = true; put({ fu: (S.fu + 1) % 3, done: 0, pt: 0 }); } },
      { id: "more", label: "More", w: 150, on: () => { if (!guard()) return; touched.current = true; put({ fb: S.fb % 9 + 1, done: 0, pt: 0 }); } },
      { id: "break", label: "Break down", w: 240, on: () => pressKey("break"), off: d >= 1 },
    ];
    const tot = ks.reduce((a, k) => a + k.w, 0) + 16 * (ks.length - 1);
    let x = Math.round((LX + R) / 2 - tot / 2);
    return ks.map((k) => {
      const kx0 = x; x += k.w + 16;
      return (
        <Key key={"fk" + k.id} id={k.id} label={tx(k.label)} x={kx0} y={keyY} w={k.w} h={keyH} C={C} tone="key" disabled={k.off} onClick={k.on}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={k.off ? tint(C.ink, 0.45) : toneInk("key", C.ink)}>{tx(k.label)}</text>
        </Key>
      );
    });
  };

  /* what the host and the agent read back (toolApi.getState): never the answer */
  api.share({ phase: n, amount: free ? cur.big + " " + B2S_UNITS[cur.u].short : null, rung: B2S_UNITS[fromU].name,
    bars: nBars, leftover: cur.kind === "frac" ? 0 : cur.left, fraction: cur.kind === "frac" ? cur.num + "/" + cur.den : null,
    acts: d, actsNeeded: seq.length, complete: stage === "idle" });

  const showKey = !free && nextAct && !S.tb && (stage === "demo" || stage === "ask");
  return (
    <g>
      <defs>
        <linearGradient id="b2s-blue-bar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3399DB" />
          <stop offset="100%" stopColor="#005C94" />
        </linearGradient>
        <linearGradient id="b2s-green-bar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#20C997" />
          <stop offset="100%" stopColor="#007A58" />
        </linearGradient>
        <linearGradient id="b2s-amber-bar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFC107" />
          <stop offset="100%" stopColor="#C68700" />
        </linearGradient>
        <filter id="b2s-card-shadow" x="-5%" y="-5%" width="110%" height="115%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.12" />
        </filter>
      </defs>
      {ladder()}
      {givenRow()}
      {hourBar()}
      {bigBars()}
      {rowsBlock()}
      {workLine()}
      {showKey && (
        <g filter="url(#b2s-card-shadow)">
          <Key key="actkey" id={nextAct} label={tx(B2S_KEY[nextAct])} x={keyX} y={keyY} w={keyW} h={keyH} C={C} tone="key" onClick={() => pressKey(nextAct)}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{tx(B2S_KEY[nextAct])}</text>
          </Key>
          {!S.acting && <Invite x={keyX + keyW / 2} y={keyY + keyH / 2} w={keyW} h={keyH} C={C} />}
        </g>
      )}
      {free && freeKeys()}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: the given (a small pile of its bars, or
   the stacked fraction of an hour), "=" and the child's answer in green; nothing closer than 14 to the frame or each other */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last) return null;
  const item = it || (PHASES[n - 1] && PHASES[n - 1].items[last.item]) || {};
  const tu = (u: string) => (lang === "en" || (TR[lang] && TR[lang][u]) ? tx(u) : "");
  const unit = item.parts && item.parts[0] ? tu(item.parts[0].unit) : "";
  const val0 = (item.choices ? (last.value === "h" ? b2sTotal(item) : item.vs) + " " + tu("min") : indian(Number(slotPartsOf(last.value, 1)[0])) + " " + unit);
  const blue = shade(B2S_BLUE, 0.25), sz = T.micro;
  /* "=" and BOTH units always (a fraction row without them reads as a false equation): when the row needs more than
     the thumbnail's width, its chip reaches further left into the row's empty space (x0 < 0), never a smaller type */
  const val = "= " + val0;
  const valW = b2sTwL(val, sz) * 1.08, room = w - 14 - valW - 12 - 14;   /* the width left of the answer, 12 clear of it */
  const fracNeed = item.kind === "frac" ? 14 + (item.whole ? b2sTwL(String(item.whole), sz) + 6 : 0) + 34 + 6 + b2sTwL(tu("h"), sz) * 1.08 + 12 + valW + 14 : 0;
  const x0 = item.kind === "frac" ? Math.min(0, Math.round(w - fracNeed)) : 0;
  let left: any = null;
  if (item.kind === "frac") {
    const fw = 34, hw = b2sTwL(tu("h"), sz);
    const wholeW = item.whole ? b2sTwL(String(item.whole), sz) + 6 : 0;
    left = (
      <g>
        {item.whole > 0 && <text x={x0 + 14} y={h / 2 + 10} fontSize={sz} fontWeight={700} fill={blue}>{item.whole}</text>}
        {/* centred on the row, 1 lower: the numerator's top and the denominator's foot sit as far from the frame */}
        <B2sFrac tight x={x0 + 14 + wholeW + fw / 2} y={Math.round(h / 2) + 1} a={item.num} b={item.den} size={sz} fill={blue} />
        <text x={x0 + 14 + wholeW + fw + 6} y={h / 2 + 10} fontSize={sz} fontWeight={700} fill={blue}>{tu("h")}</text>
      </g>
    );
  } else {
    const nb = item.kind === "chain" ? 1 : item.big || 1;
    const bw = 10, bg = 5, fit = Math.max(1, Math.min(nb, Math.floor((room + bg) / (bw + bg)), 8));
    left = (
      <g>
        {Array.from({ length: fit }, (_, k) => (
          <rect key={k} x={14 + k * (bw + bg)} y={h / 2 - 20} width={bw} height={40} rx={3} fill="url(#gHundred)" stroke={shade(B2S_BLUE, 0.3)} strokeWidth={1.5} />
        ))}
      </g>
    );
  }
  return (
    <g>
      <rect x={x0} y={0} width={w - x0} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {left}
      <text x={w - 14} y={h / 2 + 10} textAnchor="end" fontSize={sz} fontWeight={700} fill={shade(B2S_GREEN, 0.25)}>{val}</text>
    </g>
  );
}

function BiggerToSmaller(props: any) {
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

export default BiggerToSmaller;