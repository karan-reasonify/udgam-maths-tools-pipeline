/* ═══ M1.S2.T4.C15.2D1 · smaller_to_bigger · tool-specific part ═══════════════════════════════
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

const TOOL_ID = "smaller_to_bigger";
const MEDIA_ID = "M1.S2.T4.C15.2D1";
const TOOL_NAME = "Small to Big Converter";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (not shown: phase 1 has steps) */
const OPENING = ["A tray of blocks, waiting to be swept into piles."];
const FINISH_LINE = "You grouped a smaller unit into a bigger one and kept the remainder.";
/* free play: hour blocks into days (the controls in the stage === "free" branch: Add 10, Add 1, Group, Lift) */
const FREE_LINE = "Free play. Add hour blocks to the tray and group them into days.";

const START_HOOK = "How many days hide in a big heap of hours?";
function StartArt({ box, C, lang, tx }: any) {
  const p = 24, gx = 480, gy = 84, rows = [24, 24, 24, 24, 9];
  const names = ["days", "hours", "minutes", "seconds"];
  return (
    <g>
      {names.map((nm, k) => (
        <g key={nm}>
          <rect x={42} y={22 + k * 80} width={300} height={66} rx={14} fill="#000000" fillOpacity={0.06} />
          <rect x={40} y={20 + k * 80} width={300} height={66} rx={14} fill={k === 0 ? "#F3E8FF" : k === 1 ? "#E6F4FF" : tint(C.panel, 0.4)} stroke={k === 0 ? STB_VIO : k === 1 ? CONTENT.hundred : C.rule} strokeWidth={k < 2 ? 3.5 : 2} />
          <text x={190} y={62 + k * 80} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={k === 0 ? shade(STB_VIO, 0.25) : k === 1 ? shade(CONTENT.hundred, 0.25) : C.ink}>{tx(nm)}</text>
        </g>
      ))}
      <rect x={432} y={52} width={730} height={270} rx={22} fill="#000000" fillOpacity={0.12} />
      <rect x={430} y={50} width={730} height={270} rx={22} fill="#5C381E" stroke="#3A2211" strokeWidth={3} />
      <Skin name="tray" x={430} y={50} w={730} h={270} fit="stretch" />
      <rect x={452} y={70} width={686} height={230} rx={14} fill="#FFF7EA" fillOpacity={0.9} stroke="#D9C3B0" strokeWidth={1.5} />
      {rows.map((cnt, r) => Array.from({ length: cnt }).map((_, i) => (
        <g key={r + "-" + i}>
          <rect x={gx + (i + Math.floor(i / 10)) * p} y={gy + r * (p + 14)} width={p - 4} height={p - 4} rx={4} fill={r < 2 ? STB_VIO : CONTENT.hundred} stroke={shade(r < 2 ? STB_VIO : CONTENT.hundred, 0.35)} strokeWidth={1.2} />
          <rect x={gx + (i + Math.floor(i / 10)) * p + 2} y={gy + r * (p + 14) + 2} width={p - 8} height={4} rx={1} fill="#FFFFFF" fillOpacity={0.35} />
        </g>
      )))}
      <rect x={gx - 8} y={gy - 8} width={26 * p + 8} height={2 * (p + 14) - 6} rx={8} fill="none" stroke={shade(STB_VIO, 0.25)} strokeWidth={3} strokeDasharray="10 8" />
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): filled in the language pass, once the English is final. */
const TR: any = {
  hi: {
    "days": "दिन",
    "hours": "घंटे",
    "minutes": "मिनट",
    "seconds": "सेकंड",
    "h": "घंटे",
    "min": "मिनट",
    "s": "सेकंड",
    "Small to Big Converter": "छोटी से बड़ी इकाई",
    "Free play. Add hour blocks to the tray and group them into days.": "मुक्त खेल। ट्रे में घंटे के ब्लॉक डालो और उनसे दिन बनाओ।",
    "How many days hide in a big heap of hours?": "घंटों के बड़े ढेर में कितने दिन छिपे हैं?",
    "A tray of blocks, waiting to be swept into piles.": "ब्लॉकों की ट्रे, ढेरियाँ बनने का इंतज़ार कर रही है।",
    "Hours into days": "घंटों से दिन",
    "How many hours fill one day? What is left over?": "एक दिन में कितने घंटे होते हैं? क्या बचता है?",
    "Tap Group to sweep these 77 h into piles of 24.": "ढेरी बनाओ बटन से इन 77 घंटों को 24 की ढेरियों में बाँटो।",
    "Tap the Group key under the ladder.": "सीढ़ी के नीचे ढेरी बनाओ बटन दबाओ।",
    "Tap Lift to move each full pile up to the days shelf.": "उठाओ बटन से हर पूरी ढेरी दिन वाली शेल्फ़ पर रखो।",
    "Tap the Lift key to raise the piles.": "ढेरियाँ उठाने के लिए उठाओ बटन दबाओ।",
    "Count the tiles on the days shelf, then count the hours left in the tray.": "दिन वाली शेल्फ़ की टाइलें गिनो, फिर ट्रे में बचे घंटे गिनो।",
    "Divide the hours by 24: the piles are days and the remainder is hours.": "घंटों को 24 से भाग दो, ढेरियाँ दिन हैं और शेषफल घंटे।",
    "To check, piles × 24 plus the hours left gives the hours you began with.": "जाँचो, ढेरियाँ × 24 और बचे घंटे मिलकर शुरू के घंटे बनते हैं।",
    "You learned: hours ÷ 24 gives days, and the remainder stays hours.": "तुमने सीखा: घंटे ÷ 24 से दिन मिलते हैं, शेषफल घंटे रहता है।",
    "How many days and hours are there in 150 h?": "150 घंटों में कितने दिन और घंटे हैं?",
    "Now change 55 h into days and hours.": "अब 55 घंटों को दिन और घंटों में बदलो।",
    "What is 290 h in days and hours?": "290 घंटे कितने दिन और घंटे हैं?",
    "The shelf tiles stand in fives, so read the days there.": "शेल्फ़ की टाइलें पाँच-पाँच में हैं, वहीं दिन पढ़ो।",
    "Minutes into hours": "मिनट से घंटे",
    "Sixty minutes fill an hour. How many piles, and what is left?": "साठ मिनट से एक घंटा बनता है। कितनी ढेरियाँ, और क्या बचा?",
    "Tap Group to sweep these 90 min into piles of 60.": "ढेरी बनाओ बटन से 90 मिनट को 60 की ढेरियों में बाँटो।",
    "One pile of 60 min makes 1 h, so tap Group.": "60 मिनट की एक ढेरी 1 घंटा है, ढेरी बनाओ बटन दबाओ।",
    "Tap Lift to move each full pile up to the hours shelf.": "उठाओ बटन से हर पूरी ढेरी घंटे वाली शेल्फ़ पर रखो।",
    "Tap Lift to raise the full piles.": "पूरी ढेरियाँ उठाने को उठाओ बटन दबाओ।",
    "Count the tiles on the hours shelf, then count the minutes left in the tray.": "घंटे वाली शेल्फ़ की टाइलें गिनो, फिर ट्रे में बचे मिनट गिनो।",
    "Divide the minutes by 60: the piles are hours and the remainder is minutes.": "मिनटों को 60 से भाग दो, ढेरियाँ घंटे हैं और शेषफल मिनट।",
    "To check, piles × 60 plus the minutes left gives the minutes you began with.": "जाँचो, ढेरियाँ × 60 और बचे मिनट मिलकर शुरू के मिनट बनते हैं।",
    "You learned: minutes ÷ 60 gives hours, and the remainder stays minutes.": "तुमने सीखा: मिनट ÷ 60 से घंटे मिलते हैं, शेषफल मिनट रहता है।",
    "How many hours and minutes are there in 395 min?": "395 मिनट में कितने घंटे और मिनट हैं?",
    "An hour is 60 min, so each pile holds 60 blocks.": "एक घंटा 60 मिनट है, हर ढेरी में 60 ब्लॉक हैं।",
    "Now change 130 min into hours and minutes.": "अब 130 मिनट को घंटे और मिनट में बदलो।",
    "Two numbers are needed, the whole hours and the minutes left.": "दो संख्याएँ चाहिए, पूरे घंटे और बचे मिनट।",
    "What is 470 min in hours and minutes?": "470 मिनट कितने घंटे और मिनट हैं?",
    "Seconds into minutes": "सेकंड से मिनट",
    "Sixty seconds fill a minute. Which unit does the leftover part stay in?": "साठ सेकंड से एक मिनट बनता है। बचा हुआ भाग किस इकाई में रहता है?",
    "Tap Group to sweep these 150 s into piles of 60.": "ढेरी बनाओ बटन से इन 150 सेकंड को 60 की ढेरियों में बाँटो।",
    "Tap Group: each pile of 60 s is 1 min.": "ढेरी बनाओ बटन दबाओ, 60 सेकंड की हर ढेरी 1 मिनट है।",
    "Tap Lift to move each full pile up to the minutes shelf.": "उठाओ बटन से हर पूरी ढेरी मिनट वाली शेल्फ़ पर रखो।",
    "Tap the Lift key now.": "अब उठाओ बटन दबाओ।",
    "Count the tiles on the minutes shelf, then count the seconds left in the tray.": "मिनट वाली शेल्फ़ की टाइलें गिनो, फिर ट्रे में बचे सेकंड गिनो।",
    "Divide the seconds by 60: the piles are minutes and the remainder is seconds.": "सेकंड को 60 से भाग दो, ढेरियाँ मिनट हैं और शेषफल सेकंड।",
    "To check, piles × 60 plus the seconds left gives the seconds you began with.": "जाँचो, ढेरियाँ × 60 और बचे सेकंड मिलकर शुरू के सेकंड बनते हैं।",
    "You learned: seconds ÷ 60 gives minutes; the remainder stays seconds.": "तुमने सीखा: सेकंड ÷ 60 से मिनट मिलते हैं, शेषफल सेकंड रहता है।",
    "How many minutes and seconds are there in 725 s?": "725 सेकंड में कितने मिनट और सेकंड हैं?",
    "Now change 190 s into minutes and seconds.": "अब 190 सेकंड को मिनट और सेकंड में बदलो।",
    "What is 2,000 s in minutes and seconds?": "2,000 सेकंड कितने मिनट और सेकंड हैं?",
    "Read the minutes from the shelf tiles, five at a time.": "शेल्फ़ की टाइलों से मिनट पढ़ो, पाँच-पाँच करके।",
    "A leftover part too big": "बहुत बड़ा बचा हुआ भाग",
    "Are there a whole sixty minutes in the leftover part? Bundle them and carry.": "क्या बचे भाग में पूरे साठ मिनट हैं? उनका बंडल बनाकर ले जाओ।",
    "Tap Bundle to wrap 60 of these 75 min into one tile.": "बंडल बनाओ बटन से 75 मिनट में से 60 की एक टाइल बनाओ।",
    "Tap the Bundle key under the ladder.": "सीढ़ी के नीचे बंडल बनाओ बटन दबाओ।",
    "Tap Carry to move the tile across to the hours.": "ले जाओ बटन से टाइल को घंटों तक पहुँचाओ।",
    "The tile goes to the hours: tap Carry.": "टाइल घंटों में जाती है, ले जाओ बटन दबाओ।",
    "Count the hour tiles after the carry, then count the minutes left.": "ले जाने के बाद घंटे की टाइलें गिनो, फिर बचे मिनट गिनो।",
    "Each 60 min is 1 h, so add every bundle to the hours.": "हर 60 मिनट 1 घंटा है, हर बंडल घंटों में जोड़ो।",
    "A leftover part of 60 min or more is carried as 1 h, so fewer than 60 min stay.": "60 मिनट या ज़्यादा का बचा भाग 1 घंटा बनकर जाता है, 60 से कम मिनट बचते हैं।",
    "You learned: 60 min or more left over is carried to the hours.": "तुमने सीखा: बचे 60 मिनट या ज़्यादा घंटों में ले जाते हैं।",
    "Write 6 h 70 min with fewer than 60 minutes.": "6 घंटे 70 मिनट को 60 से कम मिनट के साथ लिखो।",
    "The 60 min you bundle become 1 h, so the hours go up too.": "बंडल के 60 मिनट 1 घंटा बनते हैं, तो घंटे भी बढ़ते हैं।",
    "Now write 4 h 75 min so it has fewer than 60 minutes.": "अब 4 घंटे 75 मिनट को ऐसे लिखो कि 60 से कम मिनट हों।",
    "How do you write 2 h 200 min with fewer than 60 minutes?": "2 घंटे 200 मिनट को 60 से कम मिनट के साथ कैसे लिखोगे?",
    "200 min holds more than one pile of 60.": "200 मिनट में 60 की एक से ज़्यादा ढेरियाँ हैं।",
    "Add 10": "10 डालो",
    "Add 1": "1 डालो",
    "bundles of 60": "60 के बंडल",
    "piles of 24": "24 की ढेरियाँ",
    "piles of 60": "60 की ढेरियाँ",
    "remainder": "शेषफल",
    "Group": "ढेरी बनाओ",
    "Lift": "उठाओ",
    "Bundle": "बंडल बनाओ",
    "Carry": "ले जाओ",
    "1 day: 24 h": "1 दिन: 24 घंटे",
    "1 h: 60 min": "1 घंटा: 60 मिनट",
    "1 min: 60 s": "1 मिनट: 60 सेकंड",
    "Tap Group to make piles, then tap Lift.": "ढेरी बनाओ बटन से ढेरियाँ बनाओ, फिर उठाओ बटन दबाओ।",
    "Now tap Lift to put the piles on the shelf.": "अब उठाओ बटन से ढेरियाँ शेल्फ़ पर रखो।",
    "Tap Bundle first, then tap Carry.": "पहले बंडल बनाओ बटन दबाओ, फिर ले जाओ बटन दबाओ।",
    "Now tap Carry to take the tiles to the hours.": "अब ले जाओ बटन से टाइलें घंटों तक ले जाओ।",
    "150 h in days and hours": "150 घंटे, दिन और घंटों में",
    "55 h in days and hours": "55 घंटे, दिन और घंटों में",
    "290 h in days and hours": "290 घंटे, दिन और घंटों में",
    "395 min in hours and minutes": "395 मिनट, घंटे और मिनट में",
    "130 min in hours and minutes": "130 मिनट, घंटे और मिनट में",
    "470 min in hours and minutes": "470 मिनट, घंटे और मिनट में",
    "725 s in minutes and seconds": "725 सेकंड, मिनट और सेकंड में",
    "190 s in minutes and seconds": "190 सेकंड, मिनट और सेकंड में",
    "2,000 s in minutes and seconds": "2,000 सेकंड, मिनट और सेकंड में",
    "6 h 70 min, under 60 min": "6 घंटे 70 मिनट, 60 से कम मिनट",
    "4 h 75 min, under 60 min": "4 घंटे 75 मिनट, 60 से कम मिनट",
    "2 h 200 min, under 60 min": "2 घंटे 200 मिनट, 60 से कम मिनट",
    "150 ÷ 24 is 6, remainder 6, so 150 h is 6 days 6 h.": "150 ÷ 24 = 6, शेषफल 6, तो 150 घंटे = 6 दिन 6 घंटे।",
    "55 ÷ 24 is 2, remainder 7, so 55 h is 2 days 7 h.": "55 ÷ 24 = 2, शेषफल 7, तो 55 घंटे = 2 दिन 7 घंटे।",
    "290 ÷ 24 is 12, remainder 2, so 290 h is 12 days 2 h.": "290 ÷ 24 = 12, शेषफल 2, तो 290 घंटे = 12 दिन 2 घंटे।",
    "395 ÷ 60 is 6, remainder 35, so 395 min is 6 h 35 min.": "395 ÷ 60 = 6, शेषफल 35, तो 395 मिनट = 6 घंटे 35 मिनट।",
    "130 ÷ 60 is 2, remainder 10, so 130 min is 2 h 10 min.": "130 ÷ 60 = 2, शेषफल 10, तो 130 मिनट = 2 घंटे 10 मिनट।",
    "470 ÷ 60 is 7, remainder 50, so 470 min is 7 h 50 min.": "470 ÷ 60 = 7, शेषफल 50, तो 470 मिनट = 7 घंटे 50 मिनट।",
    "725 ÷ 60 is 12, remainder 5, so 725 s is 12 min 5 s.": "725 ÷ 60 = 12, शेषफल 5, तो 725 सेकंड = 12 मिनट 5 सेकंड।",
    "190 ÷ 60 is 3, remainder 10, so 190 s is 3 min 10 s.": "190 ÷ 60 = 3, शेषफल 10, तो 190 सेकंड = 3 मिनट 10 सेकंड।",
    "2,000 ÷ 60 is 33, remainder 20, so 2,000 s is 33 min 20 s.": "2,000 ÷ 60 = 33, शेषफल 20, तो 2,000 सेकंड = 33 मिनट 20 सेकंड।",
    "70 min is 1 h 10 min, so 6 h 70 min is 7 h 10 min.": "70 मिनट = 1 घंटा 10 मिनट, तो 6 घंटे 70 मिनट = 7 घंटे 10 मिनट।",
    "75 min is 1 h 15 min, so 4 h 75 min is 5 h 15 min.": "75 मिनट = 1 घंटा 15 मिनट, तो 4 घंटे 75 मिनट = 5 घंटे 15 मिनट।",
    "200 min is 3 h 20 min, so 2 h 200 min is 5 h 20 min.": "200 मिनट = 3 घंटा 20 मिनट, तो 2 घंटे 200 मिनट = 5 घंटे 20 मिनट।",
    "Both boxes matter: days from the shelf and hours from the tray.": "दोनों खाने ज़रूरी हैं, दिन शेल्फ़ से और घंटे ट्रे से।",
    "Each tile on the shelf is one day, and each block in the tray is one hour.": "शेल्फ़ की हर टाइल एक दिन है, और ट्रे का हर ब्लॉक एक घंटा।",
    "Each tile on the shelf is one hour; the blocks in the tray are minutes.": "शेल्फ़ की हर टाइल एक घंटा है, ट्रे के ब्लॉक मिनट हैं।",
    "Read the minutes on the shelf and the seconds still in the tray.": "शेल्फ़ पर मिनट पढ़ो और ट्रे में बचे सेकंड।",
    "Each tile on the shelf is one minute, and each block in the tray is one second.": "शेल्फ़ की हर टाइल एक मिनट है, और ट्रे का हर ब्लॉक एक सेकंड।",
    "The answer needs the hours on the shelf and fewer than 60 minutes in the tray.": "उत्तर में शेल्फ़ के घंटे और ट्रे में 60 से कम मिनट चाहिए।",
    "The shelf is full.": "शेल्फ़ भर गई है।",
    "The tray is full.": "ट्रे भर गई है।",
    "h#1": "घंटा",
    "hours#1": "घंटा"
  },
  gu: {
    "days": "દિવસ",
    "hours": "કલાક",
    "minutes": "મિનિટ",
    "seconds": "સેકન્ડ",
    "h": "કલાક",
    "min": "મિનિટ",
    "s": "સેકન્ડ",
    "Small to Big Converter": "નાનાથી મોટો એકમ",
    "Free play. Add hour blocks to the tray and group them into days.": "મુક્ત રમત. ટ્રેમાં કલાકના બ્લૉક મૂકો અને તેમાંથી દિવસ બનાવો.",
    "How many days hide in a big heap of hours?": "કલાકના મોટા ઢગલામાં કેટલા દિવસ છુપાયા છે?",
    "A tray of blocks, waiting to be swept into piles.": "બ્લૉકની ટ્રે, ઢગલીઓ બનવાની રાહ જુએ છે.",
    "Hours into days": "કલાકથી દિવસ",
    "How many hours fill one day? What is left over?": "એક દિવસમાં કેટલા કલાક હોય? શું બાકી રહે?",
    "Tap Group to sweep these 77 h into piles of 24.": "ઢગલી કરો બટન દબાવી આ 77 કલાકને 24ની ઢગલીઓમાં વહેંચો.",
    "Tap the Group key under the ladder.": "સીડી નીચે ઢગલી કરો બટન દબાવો.",
    "Tap Lift to move each full pile up to the days shelf.": "ઉપાડો બટન દબાવી દરેક પૂરી ઢગલી દિવસની છાજલી પર મૂકો.",
    "Tap the Lift key to raise the piles.": "ઢગલીઓ ઉપાડવા ઉપાડો બટન દબાવો.",
    "Count the tiles on the days shelf, then count the hours left in the tray.": "દિવસની છાજલીની ટાઇલ ગણો, પછી ટ્રેમાં બાકી કલાક ગણો.",
    "Divide the hours by 24: the piles are days and the remainder is hours.": "કલાકને 24 વડે ભાગો, ઢગલીઓ દિવસ છે અને શેષ કલાક.",
    "To check, piles × 24 plus the hours left gives the hours you began with.": "ચકાસો, ઢગલીઓ × 24 વત્તા બાકી કલાક એટલે શરૂઆતના કલાક.",
    "You learned: hours ÷ 24 gives days, and the remainder stays hours.": "તમે શીખ્યા: કલાક ÷ 24 થી દિવસ મળે, શેષ કલાક રહે.",
    "How many days and hours are there in 150 h?": "150 કલાકમાં કેટલા દિવસ અને કલાક છે?",
    "Now change 55 h into days and hours.": "હવે 55 કલાકને દિવસ અને કલાકમાં બદલો.",
    "What is 290 h in days and hours?": "290 કલાક એટલે કેટલા દિવસ અને કલાક?",
    "The shelf tiles stand in fives, so read the days there.": "છાજલીની ટાઇલ પાંચ-પાંચમાં છે, ત્યાં દિવસ વાંચો.",
    "Minutes into hours": "મિનિટથી કલાક",
    "Sixty minutes fill an hour. How many piles, and what is left?": "સાઠ મિનિટથી એક કલાક બને. કેટલી ઢગલી, અને શું બાકી?",
    "Tap Group to sweep these 90 min into piles of 60.": "ઢગલી કરો બટન દબાવી આ 90 મિનિટને 60ની ઢગલીઓમાં વહેંચો.",
    "One pile of 60 min makes 1 h, so tap Group.": "60 મિનિટની એક ઢગલી 1 કલાક છે, ઢગલી કરો બટન દબાવો.",
    "Tap Lift to move each full pile up to the hours shelf.": "ઉપાડો બટન દબાવી દરેક પૂરી ઢગલી કલાકની છાજલી પર મૂકો.",
    "Tap Lift to raise the full piles.": "પૂરી ઢગલીઓ ઉપાડવા ઉપાડો બટન દબાવો.",
    "Count the tiles on the hours shelf, then count the minutes left in the tray.": "કલાકની છાજલીની ટાઇલ ગણો, પછી ટ્રેમાં બાકી મિનિટ ગણો.",
    "Divide the minutes by 60: the piles are hours and the remainder is minutes.": "મિનિટને 60 વડે ભાગો, ઢગલીઓ કલાક છે અને શેષ મિનિટ.",
    "To check, piles × 60 plus the minutes left gives the minutes you began with.": "ચકાસો, ઢગલીઓ × 60 વત્તા બાકી મિનિટ એટલે શરૂઆતની મિનિટ.",
    "You learned: minutes ÷ 60 gives hours, and the remainder stays minutes.": "તમે શીખ્યા: મિનિટ ÷ 60 થી કલાક મળે, શેષ મિનિટ રહે.",
    "How many hours and minutes are there in 395 min?": "395 મિનિટમાં કેટલા કલાક અને મિનિટ છે?",
    "An hour is 60 min, so each pile holds 60 blocks.": "એક કલાક 60 મિનિટ છે, દરેક ઢગલીમાં 60 બ્લૉક છે.",
    "Now change 130 min into hours and minutes.": "હવે 130 મિનિટને કલાક અને મિનિટમાં બદલો.",
    "Two numbers are needed, the whole hours and the minutes left.": "બે સંખ્યા જોઈએ, પૂરા કલાક અને બાકી મિનિટ.",
    "What is 470 min in hours and minutes?": "470 મિનિટ એટલે કેટલા કલાક અને મિનિટ?",
    "Seconds into minutes": "સેકન્ડથી મિનિટ",
    "Sixty seconds fill a minute. Which unit does the leftover part stay in?": "સાઠ સેકન્ડથી એક મિનિટ બને. બાકી ભાગ કયા એકમમાં રહે?",
    "Tap Group to sweep these 150 s into piles of 60.": "ઢગલી કરો બટન દબાવી આ 150 સેકન્ડને 60ની ઢગલીઓમાં વહેંચો.",
    "Tap Group: each pile of 60 s is 1 min.": "ઢગલી કરો બટન દબાવો, 60 સેકન્ડની દરેક ઢગલી 1 મિનિટ છે.",
    "Tap Lift to move each full pile up to the minutes shelf.": "ઉપાડો બટન દબાવી દરેક પૂરી ઢગલી મિનિટની છાજલી પર મૂકો.",
    "Tap the Lift key now.": "હવે ઉપાડો બટન દબાવો.",
    "Count the tiles on the minutes shelf, then count the seconds left in the tray.": "મિનિટની છાજલીની ટાઇલ ગણો, પછી ટ્રેમાં બાકી સેકન્ડ ગણો.",
    "Divide the seconds by 60: the piles are minutes and the remainder is seconds.": "સેકન્ડને 60 વડે ભાગો, ઢગલીઓ મિનિટ છે અને શેષ સેકન્ડ.",
    "To check, piles × 60 plus the seconds left gives the seconds you began with.": "ચકાસો, ઢગલીઓ × 60 વત્તા બાકી સેકન્ડ એટલે શરૂઆતની સેકન્ડ.",
    "You learned: seconds ÷ 60 gives minutes; the remainder stays seconds.": "તમે શીખ્યા: સેકન્ડ ÷ 60 થી મિનિટ મળે, શેષ સેકન્ડ રહે.",
    "How many minutes and seconds are there in 725 s?": "725 સેકન્ડમાં કેટલી મિનિટ અને સેકન્ડ છે?",
    "Now change 190 s into minutes and seconds.": "હવે 190 સેકન્ડને મિનિટ અને સેકન્ડમાં બદલો.",
    "What is 2,000 s in minutes and seconds?": "2,000 સેકન્ડ એટલે કેટલી મિનિટ અને સેકન્ડ?",
    "Read the minutes from the shelf tiles, five at a time.": "છાજલીની ટાઇલથી મિનિટ વાંચો, પાંચ-પાંચ કરીને.",
    "A leftover part too big": "ખૂબ મોટો બાકી ભાગ",
    "Are there a whole sixty minutes in the leftover part? Bundle them and carry.": "શું બાકી ભાગમાં પૂરી સાઠ મિનિટ છે? તેનું બંડલ કરી લઈ જાઓ.",
    "Tap Bundle to wrap 60 of these 75 min into one tile.": "બંડલ કરો બટન દબાવી આ 75 મિનિટમાંથી 60ની એક ટાઇલ બનાવો.",
    "Tap the Bundle key under the ladder.": "સીડી નીચે બંડલ કરો બટન દબાવો.",
    "Tap Carry to move the tile across to the hours.": "લઈ જાઓ બટન દબાવી ટાઇલને કલાક સુધી પહોંચાડો.",
    "The tile goes to the hours: tap Carry.": "ટાઇલ કલાકમાં જાય છે, લઈ જાઓ બટન દબાવો.",
    "Count the hour tiles after the carry, then count the minutes left.": "લઈ ગયા પછી કલાકની ટાઇલ ગણો, પછી બાકી મિનિટ ગણો.",
    "Each 60 min is 1 h, so add every bundle to the hours.": "દરેક 60 મિનિટ 1 કલાક છે, દરેક બંડલ કલાકમાં ઉમેરો.",
    "A leftover part of 60 min or more is carried as 1 h, so fewer than 60 min stay.": "60 મિનિટ કે વધુનો બાકી ભાગ 1 કલાક બની જાય, 60થી ઓછી મિનિટ બાકી રહે.",
    "You learned: 60 min or more left over is carried to the hours.": "તમે શીખ્યા: બાકી 60 મિનિટ કે વધુ કલાકમાં લઈ જવાય.",
    "Write 6 h 70 min with fewer than 60 minutes.": "6 કલાક 70 મિનિટને 60થી ઓછી મિનિટ સાથે લખો.",
    "The 60 min you bundle become 1 h, so the hours go up too.": "બંડલની 60 મિનિટ 1 કલાક બને, તેથી કલાક પણ વધે.",
    "Now write 4 h 75 min so it has fewer than 60 minutes.": "હવે 4 કલાક 75 મિનિટને એવી રીતે લખો કે 60થી ઓછી મિનિટ રહે.",
    "How do you write 2 h 200 min with fewer than 60 minutes?": "2 કલાક 200 મિનિટને 60થી ઓછી મિનિટ સાથે કેવી રીતે લખશો?",
    "200 min holds more than one pile of 60.": "200 મિનિટમાં 60ની એકથી વધુ ઢગલી છે.",
    "Add 10": "10 ઉમેરો",
    "Add 1": "1 ઉમેરો",
    "bundles of 60": "60ના બંડલ",
    "piles of 24": "24ની ઢગલીઓ",
    "piles of 60": "60ની ઢગલીઓ",
    "remainder": "શેષ",
    "Group": "ઢગલી કરો",
    "Lift": "ઉપાડો",
    "Bundle": "બંડલ કરો",
    "Carry": "લઈ જાઓ",
    "1 day: 24 h": "1 દિવસ: 24 કલાક",
    "1 h: 60 min": "1 કલાક: 60 મિનિટ",
    "1 min: 60 s": "1 મિનિટ: 60 સેકન્ડ",
    "Tap Group to make piles, then tap Lift.": "ઢગલી કરો બટન દબાવી ઢગલીઓ બનાવો, પછી ઉપાડો બટન દબાવો.",
    "Now tap Lift to put the piles on the shelf.": "હવે ઉપાડો બટન દબાવી ઢગલીઓ છાજલી પર મૂકો.",
    "Tap Bundle first, then tap Carry.": "પહેલાં બંડલ કરો બટન દબાવો, પછી લઈ જાઓ બટન દબાવો.",
    "Now tap Carry to take the tiles to the hours.": "હવે લઈ જાઓ બટન દબાવી ટાઇલ કલાક સુધી લઈ જાઓ.",
    "150 h in days and hours": "150 કલાક, દિવસ અને કલાકમાં",
    "55 h in days and hours": "55 કલાક, દિવસ અને કલાકમાં",
    "290 h in days and hours": "290 કલાક, દિવસ અને કલાકમાં",
    "395 min in hours and minutes": "395 મિનિટ, કલાક અને મિનિટમાં",
    "130 min in hours and minutes": "130 મિનિટ, કલાક અને મિનિટમાં",
    "470 min in hours and minutes": "470 મિનિટ, કલાક અને મિનિટમાં",
    "725 s in minutes and seconds": "725 સેકન્ડ, મિનિટ અને સેકન્ડમાં",
    "190 s in minutes and seconds": "190 સેકન્ડ, મિનિટ અને સેકન્ડમાં",
    "2,000 s in minutes and seconds": "2,000 સેકન્ડ, મિનિટ અને સેકન્ડમાં",
    "6 h 70 min, under 60 min": "6 કલાક 70 મિનિટ, 60થી ઓછી મિનિટ",
    "4 h 75 min, under 60 min": "4 કલાક 75 મિનિટ, 60થી ઓછી મિનિટ",
    "2 h 200 min, under 60 min": "2 કલાક 200 મિનિટ, 60થી ઓછી મિનિટ",
    "150 ÷ 24 is 6, remainder 6, so 150 h is 6 days 6 h.": "150 ÷ 24 = 6, શેષ 6, તેથી 150 કલાક = 6 દિવસ 6 કલાક.",
    "55 ÷ 24 is 2, remainder 7, so 55 h is 2 days 7 h.": "55 ÷ 24 = 2, શેષ 7, તેથી 55 કલાક = 2 દિવસ 7 કલાક.",
    "290 ÷ 24 is 12, remainder 2, so 290 h is 12 days 2 h.": "290 ÷ 24 = 12, શેષ 2, તેથી 290 કલાક = 12 દિવસ 2 કલાક.",
    "395 ÷ 60 is 6, remainder 35, so 395 min is 6 h 35 min.": "395 ÷ 60 = 6, શેષ 35, તેથી 395 મિનિટ = 6 કલાક 35 મિનિટ.",
    "130 ÷ 60 is 2, remainder 10, so 130 min is 2 h 10 min.": "130 ÷ 60 = 2, શેષ 10, તેથી 130 મિનિટ = 2 કલાક 10 મિનિટ.",
    "470 ÷ 60 is 7, remainder 50, so 470 min is 7 h 50 min.": "470 ÷ 60 = 7, શેષ 50, તેથી 470 મિનિટ = 7 કલાક 50 મિનિટ.",
    "725 ÷ 60 is 12, remainder 5, so 725 s is 12 min 5 s.": "725 ÷ 60 = 12, શેષ 5, તેથી 725 સેકન્ડ = 12 મિનિટ 5 સેકન્ડ.",
    "190 ÷ 60 is 3, remainder 10, so 190 s is 3 min 10 s.": "190 ÷ 60 = 3, શેષ 10, તેથી 190 સેકન્ડ = 3 મિનિટ 10 સેકન્ડ.",
    "2,000 ÷ 60 is 33, remainder 20, so 2,000 s is 33 min 20 s.": "2,000 ÷ 60 = 33, શેષ 20, તેથી 2,000 સેકન્ડ = 33 મિનિટ 20 સેકન્ડ.",
    "70 min is 1 h 10 min, so 6 h 70 min is 7 h 10 min.": "70 મિનિટ = 1 કલાક 10 મિનિટ, તેથી 6 કલાક 70 મિનિટ = 7 કલાક 10 મિનિટ.",
    "75 min is 1 h 15 min, so 4 h 75 min is 5 h 15 min.": "75 મિનિટ = 1 કલાક 15 મિનિટ, તેથી 4 કલાક 75 મિનિટ = 5 કલાક 15 મિનિટ.",
    "200 min is 3 h 20 min, so 2 h 200 min is 5 h 20 min.": "200 મિનિટ = 3 કલાક 20 મિનિટ, તેથી 2 કલાક 200 મિનિટ = 5 કલાક 20 મિનિટ.",
    "Both boxes matter: days from the shelf and hours from the tray.": "બંને ખાનાં જરૂરી છે, દિવસ છાજલીમાંથી અને કલાક ટ્રેમાંથી.",
    "Each tile on the shelf is one day, and each block in the tray is one hour.": "છાજલીની દરેક ટાઇલ એક દિવસ છે, અને ટ્રેનો દરેક બ્લૉક એક કલાક.",
    "Each tile on the shelf is one hour; the blocks in the tray are minutes.": "છાજલીની દરેક ટાઇલ એક કલાક છે, ટ્રેના બ્લૉક મિનિટ છે.",
    "Read the minutes on the shelf and the seconds still in the tray.": "છાજલી પર મિનિટ વાંચો અને ટ્રેમાં બાકી સેકન્ડ.",
    "Each tile on the shelf is one minute, and each block in the tray is one second.": "છાજલીની દરેક ટાઇલ એક મિનિટ છે, અને ટ્રેનો દરેક બ્લૉક એક સેકન્ડ.",
    "The answer needs the hours on the shelf and fewer than 60 minutes in the tray.": "જવાબમાં છાજલીના કલાક અને ટ્રેમાં 60થી ઓછી મિનિટ જોઈએ.",
    "The shelf is full.": "છાજલી ભરાઈ ગઈ છે.",
    "The tray is full.": "ટ્રે ભરાઈ ગઈ છે."
  },
};

/* the chapter's content colours (BRIEF "Stage"): given deep blue, answer green, carry / regroup violet, worked-on amber */
const STB_VIO = "#7E57C2";
const STB_BLUE = CONTENT.hundred, STB_GREEN = CONTENT.one, STB_AMBER = CONTENT.ten;

const PHASES = [
  {
    n: 1,
    concept: "Hours into days",
    conceptId: "M1.S2.T4.C15", objectiveIds: ["O5"],
    says: ["How many hours fill one day? What is left over?"],
    /* the steps work a WARM-UP (77 h, the textbook's example), never question 1's own blocks */
    warm: { amt: 77 },
    steps: [
      { say: "Tap Group to sweep these 77 h into piles of 24.", on: "group", hint: "Tap the Group key under the ladder." },
      { say: "Tap Lift to move each full pile up to the days shelf.", on: "lift", hint: "Tap the Lift key to raise the piles." },
    ],
    stepHold: 2200,
    ladder: ["Count the tiles on the days shelf, then count the hours left in the tray.", "Divide the hours by 24: the piles are days and the remainder is hours."],
    closing: "To check, piles × 24 plus the hours left gives the hours you began with.",
    learned: "You learned: hours ÷ 24 gives days, and the remainder stays hours.",
    traceback: "the blocks are grouped in piles of 24 and lifted to the days rung, the hours left are lit amber, then the division and the answer in days and hours are written in green",
    items: [
      /* learn SB1: answer in the plan = 6 days 6 h. */
      { qid: "M1.S2.T4.C15:SB1", kind: "convert", amt: 150, parts: [{ label: "days" }, { label: "h" }], answer: [6, 6], near: "6|0",
        say: "How many days and hours are there in 150 h?", ask: "150 h in days and hours",
        miss: "Both boxes matter: days from the shelf and hours from the tray.",
        win: "150 ÷ 24 is 6, remainder 6, so 150 h is 6 days 6 h." },
      /* practice 1: answer in the plan = 2 days 7 h, because 55 divided by 24 is 2, remainder 7 */
      { qid: "M1.S2.T4.C15:1", kind: "convert", amt: 55, parts: [{ label: "days" }, { label: "h" }], answer: [2, 7], near: "2|0",
        say: "Now change 55 h into days and hours.", ask: "55 h in days and hours",
        miss: "Each tile on the shelf is one day, and each block in the tray is one hour.",
        win: "55 ÷ 24 is 2, remainder 7, so 55 h is 2 days 7 h." },
      /* practice 5: answer in the plan = 12 days 2 h, because 290 divided by 24 is 12, remainder 2 */
      { qid: "M1.S2.T4.C15:5", kind: "convert", amt: 290, parts: [{ label: "days" }, { label: "h" }], answer: [12, 2], near: "12|0",
        say: "What is 290 h in days and hours?", ask: "290 h in days and hours",
        miss: "The shelf tiles stand in fives, so read the days there.",
        win: "290 ÷ 24 is 12, remainder 2, so 290 h is 12 days 2 h." },
    ],
  },
  {
    n: 2,
    concept: "Minutes into hours",
    conceptId: "M1.S2.T4.C16", objectiveIds: ["O5"],
    says: ["Sixty minutes fill an hour. How many piles, and what is left?"],
    warm: { amt: 90 },
    steps: [
      { say: "Tap Group to sweep these 90 min into piles of 60.", on: "group", hint: "One pile of 60 min makes 1 h, so tap Group." },
      { say: "Tap Lift to move each full pile up to the hours shelf.", on: "lift", hint: "Tap Lift to raise the full piles." },
    ],
    stepHold: 2200,
    ladder: ["Count the tiles on the hours shelf, then count the minutes left in the tray.", "Divide the minutes by 60: the piles are hours and the remainder is minutes."],
    closing: "To check, piles × 60 plus the minutes left gives the minutes you began with.",
    learned: "You learned: minutes ÷ 60 gives hours, and the remainder stays minutes.",
    traceback: "the blocks are grouped in piles of 60 and lifted to the hours rung, the minutes left are lit amber, then the division and the answer in hours and minutes are written in green",
    items: [
      /* learn SB2: answer in the plan = 6 h 35 min. */
      { qid: "M1.S2.T4.C16:SB2", kind: "convert", amt: 395, parts: [{ label: "h" }, { label: "min" }], answer: [6, 35], near: "3|95",
        say: "How many hours and minutes are there in 395 min?", ask: "395 min in hours and minutes",
        miss: "An hour is 60 min, so each pile holds 60 blocks.",
        win: "395 ÷ 60 is 6, remainder 35, so 395 min is 6 h 35 min." },
      /* practice 2: answer in the plan = 2 h 10 min, because 130 divided by 60 is 2, remainder 10 */
      { qid: "M1.S2.T4.C16:2", kind: "convert", amt: 130, parts: [{ label: "h" }, { label: "min" }], answer: [2, 10], near: "1|30",
        say: "Now change 130 min into hours and minutes.", ask: "130 min in hours and minutes",
        miss: "Two numbers are needed, the whole hours and the minutes left.",
        win: "130 ÷ 60 is 2, remainder 10, so 130 min is 2 h 10 min." },
      /* practice 6: answer in the plan = 7 h 50 min, because 470 divided by 60 is 7, remainder 50 */
      { qid: "M1.S2.T4.C16:6", kind: "convert", amt: 470, parts: [{ label: "h" }, { label: "min" }], answer: [7, 50], near: "4|70",
        say: "What is 470 min in hours and minutes?", ask: "470 min in hours and minutes",
        miss: "Each tile on the shelf is one hour; the blocks in the tray are minutes.",
        win: "470 ÷ 60 is 7, remainder 50, so 470 min is 7 h 50 min." },
    ],
  },
  {
    n: 3,
    concept: "Seconds into minutes",
    conceptId: "M1.S2.T4.C17", objectiveIds: ["O6"],
    says: ["Sixty seconds fill a minute. Which unit does the leftover part stay in?"],
    warm: { amt: 150 },
    steps: [
      { say: "Tap Group to sweep these 150 s into piles of 60.", on: "group", hint: "Tap Group: each pile of 60 s is 1 min." },
      { say: "Tap Lift to move each full pile up to the minutes shelf.", on: "lift", hint: "Tap the Lift key now." },
    ],
    stepHold: 2200,
    ladder: ["Count the tiles on the minutes shelf, then count the seconds left in the tray.", "Divide the seconds by 60: the piles are minutes and the remainder is seconds."],
    closing: "To check, piles × 60 plus the seconds left gives the seconds you began with.",
    learned: "You learned: seconds ÷ 60 gives minutes; the remainder stays seconds.",
    traceback: "the blocks are grouped in piles of 60 and lifted to the minutes rung, the seconds left are lit amber and counted as whole seconds, then the division and the answer are written in green",
    items: [
      /* learn SB3: answer in the plan = 12 min 5 s. */
      { qid: "M1.S2.T4.C17:SB3", kind: "convert", amt: 725, parts: [{ label: "min" }, { label: "s" }], answer: [12, 5], near: "13|0",
        say: "How many minutes and seconds are there in 725 s?", ask: "725 s in minutes and seconds",
        miss: "Read the minutes on the shelf and the seconds still in the tray.",
        win: "725 ÷ 60 is 12, remainder 5, so 725 s is 12 min 5 s." },
      /* practice 3: answer in the plan = 3 min 10 s, because 190 divided by 60 is 3, remainder 10 */
      { qid: "M1.S2.T4.C17:3", kind: "convert", amt: 190, parts: [{ label: "min" }, { label: "s" }], answer: [3, 10], near: "4|0",
        say: "Now change 190 s into minutes and seconds.", ask: "190 s in minutes and seconds",
        miss: "Each tile on the shelf is one minute, and each block in the tray is one second.",
        win: "190 ÷ 60 is 3, remainder 10, so 190 s is 3 min 10 s." },
      /* practice 7: answer in the plan = 33 min 20 s, because 2000 divided by 60 is 33, remainder 20 */
      { qid: "M1.S2.T4.C17:7", kind: "convert", amt: 2000, parts: [{ label: "min" }, { label: "s" }], answer: [33, 20], near: "34|0",
        say: "What is 2,000 s in minutes and seconds?", ask: "2,000 s in minutes and seconds",
        miss: "Read the minutes from the shelf tiles, five at a time.",
        win: "2,000 ÷ 60 is 33, remainder 20, so 2,000 s is 33 min 20 s." },
    ],
  },
  {
    n: 4,
    concept: "A leftover part too big",
    conceptId: "M1.S2.T4.C18", objectiveIds: ["O6"],
    says: ["Are there a whole sixty minutes in the leftover part? Bundle them and carry."],
    warm: { h0: 5, amt: 75 },
    steps: [
      { say: "Tap Bundle to wrap 60 of these 75 min into one tile.", on: "bundle", hint: "Tap the Bundle key under the ladder." },
      { say: "Tap Carry to move the tile across to the hours.", on: "carry", hint: "The tile goes to the hours: tap Carry." },
    ],
    stepHold: 2200,
    ladder: ["Count the hour tiles after the carry, then count the minutes left.", "Each 60 min is 1 h, so add every bundle to the hours."],
    closing: "A leftover part of 60 min or more is carried as 1 h, so fewer than 60 min stay.",
    learned: "You learned: 60 min or more left over is carried to the hours.",
    traceback: "every full row of 60 minutes is bundled into a violet tile and carried to the hours, the minutes left are lit amber, then the length is written again in green",
    items: [
      /* learn SB4: answer in the plan = 7 h 10 min. */
      { qid: "M1.S2.T4.C18:SB4", kind: "regroup", h0: 6, amt: 70, parts: [{ label: "h" }, { label: "min" }], answer: [7, 10], near: "6|70",
        say: "Write 6 h 70 min with fewer than 60 minutes.", ask: "6 h 70 min, under 60 min",
        miss: "The 60 min you bundle become 1 h, so the hours go up too.",
        win: "70 min is 1 h 10 min, so 6 h 70 min is 7 h 10 min." },
      /* practice 4: answer in the plan = 5 h 15 min, because 75 min is 1 h 15 min */
      { qid: "M1.S2.T4.C18:4", kind: "regroup", h0: 4, amt: 75, parts: [{ label: "h" }, { label: "min" }], answer: [5, 15], near: "4|75",
        say: "Now write 4 h 75 min so it has fewer than 60 minutes.", ask: "4 h 75 min, under 60 min",
        miss: "The answer needs the hours on the shelf and fewer than 60 minutes in the tray.",
        win: "75 min is 1 h 15 min, so 4 h 75 min is 5 h 15 min." },
      /* practice 8: answer in the plan = 5 h 20 min, because 200 min is 3 h 20 min */
      { qid: "M1.S2.T4.C18:8", kind: "regroup", h0: 2, amt: 200, parts: [{ label: "h" }, { label: "min" }], answer: [5, 20], near: "2|200",
        say: "How do you write 2 h 200 min with fewer than 60 minutes?", ask: "2 h 200 min, under 60 min",
        miss: "200 min holds more than one pile of 60.",
        win: "200 min is 3 h 20 min, so 2 h 200 min is 5 h 20 min." },
    ],
  },
];

/* The units of each phase: the pile size, the two rungs, the two acts (they go into the sidecar too). */
const MODEL = {
  rungs: ["days", "hours", "minutes", "seconds"],
  facts: ["1 day: 24 h", "1 h: 60 min", "1 min: 60 s"],
  units: {
    1: { g: 24, bigRung: 0, big: "days", bigU: "days", small: "hours", smallU: "h", a1: "group", a2: "lift" },
    2: { g: 60, bigRung: 1, big: "hours", bigU: "h", small: "minutes", smallU: "min", a1: "group", a2: "lift" },
    3: { g: 60, bigRung: 2, big: "minutes", bigU: "min", small: "seconds", smallU: "s", a1: "group", a2: "lift" },
    4: { g: 60, bigRung: 1, big: "hours", bigU: "h", small: "minutes", smallU: "min", a1: "bundle", a2: "carry" },
  } as any,
  freeCap: 288,
};
const STB_KEY: any = { group: "Group", lift: "Lift", bundle: "Bundle", carry: "Carry" };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: a second route, by repeated subtraction of whole piles, sharing no code with judge or Work */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const g = p.n === 1 ? 24 : 60;
  let left = it.amt, piles = it.h0 || 0;
  while (left >= g) { left -= g; piles += 1; }
  return Array.isArray(it.answer) && it.answer[0] === piles && it.answer[1] === left && left < g;
}));
/* the misconception: no remainder (1, 3), dividing by 100 (2), the leftover left as it stands (4) */
const nearMiss = (item: any) => item.near;
const answerForms = (item: any) => {
  const [a, b] = item.answer;
  const out = item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)]);
  return [...out, a + " " + item.parts[0].label + " " + b + " " + item.parts[1].label];
};
const agentKey = (item: any) => item.answer;

const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
const answer = (item: any, v: any) => undefined;
/* the agent's check(): performs the question's two acts at once (never gated), then Enter; undefined in the demo stage */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* the child has pressed one of the tool's own keys for real (the answer gate starts only after a real touch, user mode) */
const STB_T = { touched: false };
const stbUser = () => {
  try { const b = document.querySelector('[data-zone="bar"]'); return !!b && b.getAttribute("data-mode") === "user"; } catch (e) { return false; }
};
const stbFresh = (ek: string) => ({ ek, grouped: 0, lifted: 0, tb: 0, fAmt: 0, fTiles: 0 });

/* fixed layout (the same with the keypad open or shut; laid out for the 900 open width): ladder | shelf over tray */
const STB = { lw: 250, rx: 270, rw: 620, shH: 124, trY: 134, trH: 382, key: { x: 10, y: 432, w: 230, h: 80 } };

function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const warm = !free && (stage === "demo" || stage === "teach") && !!phase.warm;
  const U = MODEL.units[free ? 1 : n] || MODEL.units[1];
  const K = n + ":" + (free ? "f" : warm ? "w" : "q" + index);
  /* the board is keyed to the ENTRY (PATTERNS §18): a question entered again opens fresh */
  const ent = useRef({ k: "", e: 0 });
  if (ent.current.k !== K) ent.current = { k: K, e: ent.current.e + 1 };
  const EK = K + "#" + ent.current.e;
  const cur = useRef(EK);
  cur.current = EK;
  const [raw, setRaw] = useState<any>({ ek: "" });
  const S = raw.ek === EK ? raw : stbFresh(EK);
  const put = (ek: string, patch: any) => setRaw((p: any) => {
    const base = p.ek === ek ? p : ek === cur.current ? stbFresh(ek) : null;
    return base ? { ...base, ...patch } : p;
  });

  const src: any = free ? { amt: S.fAmt, h0: S.fTiles } : warm ? phase.warm : item;
  const g = U.g, amt = src.amt || 0, h0 = src.h0 || 0;
  const full = Math.floor(amt / g), rem = amt % g;
  const acted = S.lifted >= full && S.grouped >= full;
  const asking = stage === "ask";
  const shown = S.tb >= 2 || stage === "win" || stage === "idle";

  /* the tray: each pile of g blocks is a cluster of cw columns x L lines (an empty block's room after every ten columns),
     the piles in pc columns; the layout that gives the biggest block wins, fixed for the question */
  const gw = STB.rw - 40, gh = STB.trH - 72, gy = STB.trY + 58;
  const nP = free ? Math.ceil(MODEL.freeCap / g) : Math.max(1, full + (rem ? 1 : 0));
  let lay = { p: 0, L: 1, pc: 1 };
  for (const Ln of [1, 2, 3, 4, 6]) {
    if (g % Ln) continue;
    const cwn = g / Ln, uwn = cwn + (Ln === 1 ? Math.floor((cwn - 1) / 10) : 0);
    for (let pcn = 1; pcn <= 4; pcn++) {
      const pr = Math.ceil(nP / pcn);
      const pp = Math.min(gw / (pcn * uwn + (pcn - 1) * 2), gh / (pr * Ln + (pr - 1)), 30);
      if (pp > lay.p + 0.01) lay = { p: pp, L: Ln, pc: pcn };
    }
  }
  const p = lay.p, L = lay.L, pc = lay.pc, cw = g / L, uw = cw + (L === 1 ? Math.floor((cw - 1) / 10) : 0);
  const bs = p * 0.84;
  const pileW = (uw - 1) * p + bs, pileH = (L - 1) * p + bs;
  const gx = STB.rx + 20 + (gw - (pc * (uw + 2) - 2) * p) / 2;
  const pileX = (i: number) => gx + (i % pc) * (uw + 2) * p;
  const pileY = (i: number) => gy + Math.floor(i / pc) * (L + 1) * p;
  /* before Group: ONE heap, same-length rows of tens (a row length that is never the pile size), no pile shown */
  const heaped = S.grouped === 0 && !shown;
  let hl = { p: 0, W: 10 };
  /* the heap is ONE unsplit block of rows. No number it shows (row length, row count, last row) may be the pile size, a part or a
     multiple of it, the quotient, the remainder or the bigger-unit answer (h0 + full); the block size comes from the COUNT, so the
     heap stands about 60-70% of the tray and at most 85% of its width. A count no shape can satisfy (90, 70) lets the row count and
     last row be a part of the pile, never one of the answer's numbers. */
  const answerNums = [full, rem, h0 + full];
  const badW = (v: number) => g % v === 0 || v % g === 0 || answerNums.includes(v);
  const badR = (v: number, strict: boolean) => (strict ? badW(v) : v % g === 0 || answerNums.includes(v));
  for (const strict of [true, false]) {
    for (let Wn = 7; Wn <= 90; Wn++) {
      const Rn = Math.max(1, Math.ceil(Math.max(amt, 1) / Wn)), Ln = Math.max(amt, 1) - (Rn - 1) * Wn, Fn = Ln === Wn ? Rn : Rn - 1;
      if (badW(Wn) || badR(Rn, strict) || badR(Ln, strict) || (Fn > 0 && badR(Fn, strict))) continue;
      const hpn = Math.min((gw * 0.85) / (Wn - 1 + 0.84), (gh * 0.7) / Rn, 40);
      if (hpn > hl.p + 0.01) hl = { p: hpn, W: Wn };
    }
    if (hl.p > 0) break;
  }
  const hp = hl.p, HW = hl.W, hRows = Math.ceil(amt / HW);
  const hx = STB.rx + 20 + (gw - ((HW - 1) * hp + hp * 0.84)) / 2;
  const hy = gy + Math.max(0, (gh - (hRows - 1) * hp - hp * 0.84) / 2);
  /* the shelf of the bigger unit: one tile a pile, a gap after every five */
  const nT = free ? Math.max(10, S.fTiles + full) : h0 + full;
  const tp = Math.min(46, (STB.rw - 32) / Math.max(1, nT + Math.floor(Math.max(0, nT - 1) / 5)));
  const tw = tp * 0.78, th = 50, ty = 62, tx0 = STB.rx + 16;
  const tileX = (k: number) => tx0 + (k + Math.floor(k / 5)) * tp;

  /* the act key: its label follows the act (one key for the sequence, PATTERNS §16c) */
  const actId = !free && (shown || stage === "win") ? null
    : S.grouped < full ? U.a1 : S.lifted < full ? U.a2 : free ? U.a1 : null;
  const actLive = !!actId && (stage === "demo" || asking || free) && (!free || full > S.lifted) && !(wrong && asking);
  const busy = useRef(false);
  const [actOn, setActOn] = useState(false);
  const lastKey = useRef(0);

  const doAct = async (on: any) => {
    const ek = EK;
    if (busy.current) return;
    if (stage === "demo" && on !== stepOn) { api.did(on); return; }
    if (on === U.a1) {
      if (S.grouped >= full) { if (stage === "demo") api.did(on); return; }
      const rows = Array.from({ length: full - S.lifted }).map((_, i) => S.lifted + i);
      busy.current = true; setActOn(true);
      const ok = await api.act({ tool: "hand", moves: "sweep", ms: 1000, from: { x: pileX(rows[0]) - 16, y: pileY(rows[0]) + pileH / 2 },
        at: rows.map((r) => ({ x: pileX(r) + pileW / 2, y: pileY(r) + pileH / 2 })),
        onPoint: (i: number) => put(ek, { grouped: rows[i] + 1 }) });
      busy.current = false; setActOn(false);
      if (!ok) return;
      put(ek, { grouped: full });
      if (stage === "demo") api.did(on);
      return;
    }
    if (on === U.a2) {
      if (S.grouped < full || S.lifted >= full) { if (stage === "demo") api.did(on); return; }
      const from = S.lifted;
      const ks = Array.from({ length: full - from }).map((_, i) => from + i);
      busy.current = true; setActOn(true);
      const base = free ? S.fTiles : h0;
      const ok = await api.act({ tool: "hand", moves: "carry", ms: 1000, from: { x: pileX(from) + pileW / 2, y: pileY(from) + pileH / 2 },
        at: ks.map((k) => ({ x: tileX(base + k) + tw / 2, y: ty + th / 2 })),
        hold: <rect x={-tw / 2} y={-th / 2} width={tw} height={th} rx={4} fill={STB_VIO} stroke={shade(STB_VIO, 0.3)} strokeWidth={2} />,
        onPoint: (i: number) => put(ek, { lifted: ks[i] + 1 }) });
      busy.current = false; setActOn(false);
      if (!ok) return;
      put(ek, { lifted: full });
      if (stage === "demo") api.did(on);
    }
  };
  /* free play: Add folds the lifted piles onto the shelf first; the shelf holds 24 tiles, so Add stops before a pile could find no room */
  const lastAdd = useRef(0);
  const canAdd = (k: number) => {
    const tiles = S.fTiles + S.lifted, left = S.fAmt - S.lifted * g;
    return left + k <= MODEL.freeCap && tiles + Math.floor((left + k) / g) <= 24;
  };
  const add = (k: number) => {
    const t = Date.now();
    if (t - lastAdd.current < 120 || busy.current || !canAdd(k)) return;   /* 120 ms: one double tap is one press, a quick second tap counts */
    lastAdd.current = t;
    STB_T.touched = true;
    const tiles = S.fTiles + S.lifted, left = S.fAmt - S.lifted * g;
    put(EK, { fTiles: tiles, fAmt: left + k, grouped: 0, lifted: 0 });
  };
  const fTot = free ? S.fTiles * g + S.fAmt : 0, fDone = free && S.lifted >= full && (full === 0 || S.grouped >= full);
  const fQ = Math.floor(fTot / 24), fR = fTot % 24;
  const fullWhy = !free || canAdd(1) ? "" : S.fAmt - S.lifted * g + 1 > MODEL.freeCap ? "tray" : "shelf";
  const wasFull = useRef("");
  useEffect(() => {
    if (fullWhy === "tray") api.say("The tray is full.");
    else if (fullWhy === "shelf") api.say("The shelf is full.");
    else if (wasFull.current) api.say(FREE_LINE);
    wasFull.current = fullWhy;
  }, [fullWhy]);
  /* a question that has just opened takes no act for 900 ms: the second tap of a double tap on the LAST guide step's key
     (which becomes this question's Group / Bundle key) is swallowed, never an act on the new question */
  const askEK = useRef(""), askAt = useRef(0);
  if (asking && askEK.current !== EK) { askEK.current = EK; askAt.current = Date.now(); }
  const justOpened = () => asking && Date.now() - askAt.current < 900;   /* 900: a 700 ms touch gap still leaked at 600 */
  const pressKey = (on: any) => {
    const t = Date.now();
    if (justOpened()) return;
    if (t - lastKey.current < 400) return;
    lastKey.current = t;
    STB_T.touched = true;
    doAct(on);
  };
  api.onEnter(stage === "demo" && stepOn ? () => {
    const ev: any = (window as any).event;
    if (ev && ev.isTrusted) {
      const t = Date.now();
      if (t - lastKey.current < 400) return;   /* two Enters 50 ms apart are one press: one step, never Group AND Lift */
      lastKey.current = t;
      if (stbUser()) STB_T.touched = true;   /* a real key OR a real tap on the Enter key; toolApi.check() has no event */
    }
    doAct(stepOn);
  } : null);
  HOOK.demo = stage === "demo" && stepOn ? () => doAct(stepOn) : null;
  HOOK.check = asking && !acted ? () => { put(EK, { grouped: full, lifted: full }); return undefined; } : null;

  /* the answer gate (PATTERNS §19): Answer and the keypad wait for Group and Lift (Bundle and Carry) */
  const tbOn = useRef(false);
  const gate = asking && !acted && STB_T.touched && stbUser();
  useEffect(() => { if (!tbOn.current) api.lock(gate); }, [gate, EK]);
  const nudge = !gate ? null : S.grouped < full
    ? (U.a1 === "bundle" ? "Tap Bundle first, then tap Carry." : "Tap Group to make piles, then tap Lift.")
    : (U.a1 === "bundle" ? "Now tap Carry to take the tiles to the hours." : "Now tap Lift to put the piles on the shelf.");
  const nudgeRef = useRef<any>(null);
  nudgeRef.current = nudge;
  const nudged = useRef("");
  const justOpenedRef = useRef<any>(() => false);
  justOpenedRef.current = justOpened;
  const sayRef = useRef<any>(null);
  sayRef.current = asking && item ? item.say : null;
  useEffect(() => {
    const said = () => { const l = nudgeRef.current; if (l && !justOpenedRef.current()) { nudged.current = cur.current; api.say(l); } };
    const onKey = (e: any) => { if (e.repeat) return; if (/^[0-9.]$/.test(e.key) || e.key === "Backspace" || e.key === "Enter") said(); };
    const onTap = (e: any) => { const el = e.target && e.target.closest && e.target.closest('[data-control="answer-open"],[data-zone="ask"]'); if (el) said(); };
    /* the runtime's locked Hint key repeats the last line (the nudge); the question comes back after it */
    const onHint = (e: any) => {
      const el = e.target && e.target.closest && e.target.closest('[data-control="again"]');
      if (!el || !nudgeRef.current || !sayRef.current) return;
      if (e.type === "keydown" && e.key !== "Enter" && e.key !== " ") return;
      setTimeout(() => { if (nudgeRef.current && sayRef.current) api.say(sayRef.current); }, 150);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onTap, true);
    window.addEventListener("pointerup", onHint, true);
    window.addEventListener("keydown", onHint, true);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("pointerdown", onTap, true);
      window.removeEventListener("pointerup", onHint, true); window.removeEventListener("keydown", onHint, true); };
  }, []);
  /* once a nudge was shown, the act that answers it brings the next line: the second nudge, then the question again */
  useEffect(() => {
    if (nudged.current !== EK || !asking) return;
    if (acted) { nudged.current = ""; api.say(item.say); } else if (nudge) api.say(nudge);
  }, [S.grouped >= full, acted]);

  /* the traceback: group, lift, light the blocks left, then write the division and the whole answer */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    const ek = EK;
    tbOn.current = true;
    api.lock(true);
    const mine = wrong && wrong.value !== undefined ? slotPartsOf(wrong.value, 2) : ["", ""];
    const steps: any[] = n === 4
      /* the leftover left as it stands: the full piles hiding among the minutes are outlined amber, bundled, then carried */
      ? [[1300, () => put(ek, { grouped: full, lifted: 0, tb: 1, mine })], [1100, () => put(ek, { lifted: full })], [900, () => put(ek, { tb: 2 })]]
      : mine[1] !== "" && Number(mine[1]) !== 0
      /* a wrong pile size, or piles and leftover swapped: the heap is swept again into piles of g, beside the child's own answer */
      ? [[900, () => put(ek, { grouped: 0, lifted: 0, tb: 1, mine, resweep: true })], [900, () => put(ek, { grouped: full })], [900, () => put(ek, { lifted: full })], [900, () => put(ek, { tb: 2 })]]
      /* no remainder, or a short heap counted as a pile: the blocks left are counted in ink, 1 to n */
      : [[700, () => put(ek, { grouped: full, lifted: full, mine })], [1600, () => put(ek, { tb: 1, count: true })], [900, () => put(ek, { tb: 2, count: true })]];
    tl.run(steps, () => { tbOn.current = false; api.lock(false); });
  }, [wrong]);
  useEffect(() => () => { tl.stop(); if (tbOn.current) { tbOn.current = false; api.lock(false); } }, [EK]);
  /* the win: the picture finishes itself (an agent may answer without the acts) and the win line is printed */
  useEffect(() => {
    if (stage !== "win" || free || warm) return;
    put(EK, { grouped: full, lifted: full, tb: 2 });
    if (item && item.win) api.say(item.win);
  }, [stage, EK]);

  api.share({ phase: n, amount: amt, piles: S.lifted, remainder: shown ? rem : null, carry: n === 4 ? S.lifted : null,
    answer: shown && !free ? [h0 + full, rem] : null, complete: stage === "idle" });

  const deep = (c: string) => shade(c, 0.25);
  /* each chip is sized from its text's real width (measured once it is drawn; a fresh label starts from an estimate) */
  const [chipW, setChipW] = useState<any>({});
  /* the bundled Poppins can arrive after the first paint (a direct mount): redraw once the fonts are in, so every measured width
     (chips, the free-play line, the summary line) is taken again from the real face, never cached from the fallback */
  const [, setFontTick] = useState(0);
  useEffect(() => {
    const f: any = typeof document !== "undefined" ? (document as any).fonts : null;
    if (!f) return;
    let live = true;
    const bump = () => { if (live) setFontTick((k: number) => k + 1); };
    if (f.ready && f.ready.then) f.ready.then(bump);
    if (f.addEventListener) f.addEventListener("loadingdone", bump);
    return () => { live = false; if (f.removeEventListener) f.removeEventListener("loadingdone", bump); };
  }, []);
  const chipRef = (label: string) => (el: any) => {
    if (!el || !el.getComputedTextLength) return;
    const m = Math.ceil(el.getComputedTextLength());
    if (m > 0 && Math.abs((chipW[label] || 0) - m) > 1) setChipW((o: any) => (Math.abs((o[label] || 0) - m) > 1 ? { ...o, [label]: m } : o));
  };
  const uN = (k: number, u: string) => {
    if (k !== 1) return tx(u);
    const one = tx(u + "#1");
    return one !== u + "#1" ? one : lang === "en" && u === "days" ? "day" : tx(u);
  };
  const bigInk = (shown ? deep(STB_GREEN) : C.ink);
  const leftLit = full > 0 && S.lifted >= full;
  const wide = box && box.w >= 1400 && !box.open;
  const rungY = (k: number) => k * 114;

  /* one row of the tray, drawn as segments of ten blocks (one patterned rect each) */
  const pileSegs = (i: number, k: number, fill: string) => {
    const out: any[] = [];
    for (let l = 0; l < L; l++) {
      const inLine = Math.max(0, Math.min(cw, k - l * cw));
      for (let s = 0; s * 10 < inLine; s++) {
        const c = Math.min(10, inLine - s * 10);
        out.push(<rect key={l + "." + s} x={s * (L === 1 ? 11 : 10) * p} y={l * p} width={(c - 1) * p + bs} height={bs} fill={fill} />);
      }
    }
    return <g key={"p" + i} transform={`translate(${pileX(i)},${pileY(i)})`}>{out}</g>;
  };
  const blockPat = (id: string, c: string, p: number, ox = 0, oy = 0) => {
    const bs = p * 0.84;
    const rim = shade(c, 0.35);
    const topLight = tint(c, 0.25);
    const bottomShadow = shade(c, 0.15);
    return (
      <pattern id={id} x={ox} y={oy} width={p} height={p} patternUnits="userSpaceOnUse">
        <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={topLight} />
          <stop offset="45%" stopColor={c} />
          <stop offset="100%" stopColor={bottomShadow} />
        </linearGradient>
        <rect x={bs * 0.05} y={bs * 0.08} width={bs * 0.9} height={bs * 0.9} rx={Math.min(4, bs * 0.2)} fill="#000000" fillOpacity={0.16} />
        <rect x={0} y={0} width={bs} height={bs} rx={Math.min(4, bs * 0.2)} fill={`url(#grad-${id})`} stroke={rim} strokeWidth={Math.max(0.9, bs * 0.07)} />
        <rect x={bs * 0.12} y={bs * 0.1} width={bs * 0.76} height={bs * 0.22} rx={bs * 0.08} fill="#FFFFFF" fillOpacity={0.4} />
      </pattern>
    );
  };
  const tilePat = (id: string, c: string) => (
    <pattern id={id} x={tx0} y={ty} width={tp} height={th / 4} patternUnits="userSpaceOnUse">
      <rect x={0} y={0} width={tw} height={th / 4 - 1} rx={2} fill={c} stroke={shade(c, 0.3)} strokeWidth={0.8} />
      <rect x={tw * 0.14} y={1} width={tw * 0.72} height={Math.max(2, th / 16)} rx={1} fill="#FFFFFF" fillOpacity={0.35} />
    </pattern>
  );

  /* Gujarati has no headline: the ink rises to ~30 over the baseline with a matra above, ~21 without; a comma hangs ~8 under it */
  const guBase = (t: string, fs: number) => {
    const up = /[\u0A81\u0A82\u0ABF\u0AC0\u0AC5\u0AC7\u0AC8\u0AC9\u0ACB\u0ACC]/.test(t) ? 30 : 21;
    const down = /[,\u0AC1\u0AC2\u0AC3\u0AC4]/.test(t) ? 8 : 2;
    return Math.round(22 + ((up - down) * fs) / 64);
  };
  const chip = (x: number, y: number, label: string, ink: string, edge: string, right = false) => {
    const cfs = label.indexOf(",") >= 0 ? T.micro : T.label;
    const w = Math.max(96, (chipW[label] || label.length * cfs * 0.62) + 28);
    if (right) x -= w;
    return (
      <g pointerEvents="none">
        <rect x={x + 1} y={y + 1} width={w} height={44} rx={12} fill="#000000" fillOpacity={0.08} />
        <rect x={x} y={y} width={w} height={44} rx={12} fill={C.paper} stroke={edge} strokeWidth={3} />
        <text ref={chipRef(label)} x={x + w / 2} y={y + (lang === "hi" ? (cfs === T.label ? 38 : 36) : lang === "gu" ? guBase(label, cfs) : (cfs === T.label ? 31 : 30))} textAnchor="middle" fontSize={cfs} fontWeight={700} fill={ink}>{label}</text>
      </g>
    );
  };
  const tiles = [];
  const totalTiles = (free ? S.fTiles : h0) + S.lifted;
  for (let k = 0; k < totalTiles; k++) {
    const given = k < (free ? S.fTiles : h0) && n === 4 && !free;
    const tileColor = given ? STB_BLUE : STB_VIO;
    tiles.push(<g key={"t" + k}>
      <rect x={tileX(k)} y={ty} width={tw} height={th} rx={6} fill={given ? "url(#stb-tb)" : "url(#stb-tv)"} stroke={shade(tileColor, 0.35)} strokeWidth={2.5} />
      <Skin name="block" x={tileX(k)} y={ty} w={tw} h={th} fit="stretch" opacity={0.35} />
      <rect x={tileX(k) + 3} y={ty + 3} width={tw - 6} height={10} rx={3} fill="#FFFFFF" fillOpacity={0.3} pointerEvents="none" />
    </g>);
  }
  const trayRows = [];
  if (heaped) {
    for (let r = 0; r < hRows; r++) {
      const k = Math.min(HW, amt - r * HW);
      trayRows.push(<rect key={"h" + r} x={hx} y={hy + r * hp} width={(k - 1) * hp + hp * 0.84} height={hp * 0.84} fill="url(#stb-bh)" />);
    }
  }
  for (let r = heaped ? full : S.lifted; r < full; r++) {
    const grp = r < S.grouped;
    trayRows.push(<g key={"r" + r}>{pileSegs(r, g, grp ? "url(#stb-bv)" : "url(#stb-bb)")}
      {grp && <rect x={pileX(r) - 4} y={pileY(r) - 3} width={pileW + 8} height={pileH + 6} rx={5} fill="none" stroke={n === 4 && S.tb === 1 ? deep(STB_AMBER) : deep(STB_VIO)} strokeWidth={n === 4 && S.tb === 1 ? 5 : 2.5} />}</g>);
  }
  /* the blocks left: once every pile is lifted they come together, big, in rows of ten, lit amber to be counted */
  const lay5 = { c: 5, pl: Math.min(64, (gw * 0.85) / 4.84, (gh * 0.66) / Math.max(1, Math.ceil(rem / 5))) };
  const lay10 = { c: 10, pl: Math.min(64, (gw * 0.85) / 10.44, (gh * 0.66) / Math.max(1, Math.ceil(rem / 10))) };
  const lc = lay5.pl >= lay10.pl ? lay5 : lay10;
  const lpr = lc.c, lines = Math.ceil(rem / lpr), pl = lc.pl, lgx = (j: number) => (j + (lpr === 10 && j >= 5 ? 0.6 : 0)) * pl;
  const lx = STB.rx + 20 + (gw - lgx(Math.min(lpr, rem) - 1) - pl * 0.84) / 2, ly = gy + (gh - (lines - 1) * pl - pl * 0.84) / 2;
  if (rem && !leftLit && !heaped) trayRows.push(<g key="rem">{pileSegs(full, rem, "url(#stb-bb)")}</g>);
  if (rem && leftLit) trayRows.push(<g key="left" transform={`translate(${lx},${ly})`}>
    {Array.from({ length: rem }).map((_, j) => <g key={j}>
      <rect x={lgx(j % lpr)} y={Math.floor(j / lpr) * pl} width={pl * 0.84} height={pl * 0.84} rx={Math.min(6, pl * 0.12)} fill={STB_AMBER} stroke={shade(STB_AMBER, 0.3)} strokeWidth={2} />
      <rect x={lgx(j % lpr) + pl * 0.12} y={Math.floor(j / lpr) * pl + pl * 0.1} width={pl * 0.6} height={pl * 0.16} rx={pl * 0.08} fill="#FFFFFF" fillOpacity={0.35} />
    </g>)}
    {/* the correction counts the blocks left in ink, 1 to n */}
    {S.count && S.tb >= 1 && Array.from({ length: rem }).map((_, j) => (
      <text key={"c" + j} x={lgx(j % lpr) + pl * 0.42} y={Math.floor(j / lpr) * pl + pl * 0.42 + T.prompt * 0.36} textAnchor="middle" fontSize={pl >= 52 ? T.prompt : T.label} fontWeight={700} fill={C.ink}>{j + 1}</text>
    ))}
  </g>);

  const div = n === 4 ? null : indian(amt) + " ÷ " + g;
  return (
    <g>
      <defs>
        <linearGradient id="stb-shelf-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFDF7" />
          <stop offset="100%" stopColor="#F5ECDC" />
        </linearGradient>
        {blockPat("stb-bb", STB_BLUE, p)}
        {blockPat("stb-bh", STB_BLUE, hp, hx, hy)}
        {blockPat("stb-bv", STB_VIO, p)}
        {blockPat("stb-bA", STB_AMBER, pl)}
        {tilePat("stb-tv", STB_VIO)}
        {tilePat("stb-tb", STB_BLUE)}
      </defs>

      {/* the unit ladder: four rungs, the unit fact on each step between them */}
      <line x1={14} y1={8} x2={14} y2={420} stroke="#A89B8C" strokeWidth={8} strokeLinecap="round" />
      <line x1={14} y1={8} x2={14} y2={420} stroke={shade(C.rule, 0.25)} strokeWidth={4} strokeLinecap="round" />
      <line x1={STB.lw - 14} y1={8} x2={STB.lw - 14} y2={420} stroke="#A89B8C" strokeWidth={8} strokeLinecap="round" />
      <line x1={STB.lw - 14} y1={8} x2={STB.lw - 14} y2={420} stroke={shade(C.rule, 0.25)} strokeWidth={4} strokeLinecap="round" />

      {MODEL.rungs.map((nm: string, k: number) => {
        const big = k === U.bigRung, small = k === U.bigRung + 1;
        const active = big || small;
        return (
          <g key={nm}>
            <rect x={2} y={rungY(k) + 2} width={STB.lw} height={63} rx={14} fill="#000000" fillOpacity={0.06} />
            <rect x={0} y={rungY(k)} width={STB.lw} height={63} rx={14} fill={big ? "#F3E8FF" : small ? "#E6F4FF" : tint(C.panel, 0.4)}
              stroke={big ? deep(STB_VIO) : small ? deep(STB_BLUE) : C.rule} strokeWidth={active ? 3.5 : 2} />
            {active && <rect x={4} y={rungY(k) + 4} width={8} height={55} rx={4} fill={big ? deep(STB_VIO) : deep(STB_BLUE)} />}
            <text x={STB.lw / 2 + (active ? 4 : 0)} y={rungY(k) + (lang === "hi" ? 44 : 42)} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={big ? deep(STB_VIO) : small ? deep(STB_BLUE) : C.ink}>{tx(nm)}</text>
            {k < 3 && (
              <g pointerEvents="none">
                {(() => { const ff = lang === "en" ? T.label : T.micro, fw = Math.min(STB.lw, tx(MODEL.facts[k]).length * ff * 0.52 + 24); return (
                  <g>
                    <rect x={STB.lw / 2 - fw / 2} y={rungY(k) + 69} width={fw} height={38} rx={17} fill={C.paper} stroke={shade(STB_VIO, 0.2)} strokeWidth={1.5} />
                    <text x={STB.lw / 2} y={rungY(k) + 88 + ff * 0.36 + (lang === "hi" ? 3 : 0)} textAnchor="middle" fontSize={ff} fontWeight={700} fill={deep(STB_VIO)}>{tx(MODEL.facts[k])}</text>
                  </g>); })()}
              </g>
            )}
          </g>
        );
      })}

      {/* the shelf: the bigger unit, one tile a full pile */}
      <rect x={STB.rx + 2} y={2} width={STB.rw} height={STB.shH} rx={16} fill="#000000" fillOpacity={0.06} />
      <rect x={STB.rx} y={0} width={STB.rw} height={STB.shH} rx={16} fill="url(#stb-shelf-bg)" stroke={deep(STB_VIO)} strokeWidth={3} />
      {chip(STB.rx + 12, 6, tx(U.big), C.ink, deep(STB_VIO))}
      {tiles}
      {shown && !free && <text x={STB.rx + STB.rw - 18} y={38} textAnchor="end" fontSize={T.label} fontWeight={700} fill={deep(STB_GREEN)}>{(h0 + full) + " " + uN(h0 + full, U.bigU)}</text>}

      {/* the tray: the smaller unit, blocks in rows of g */}
      <rect x={STB.rx + 2} y={STB.trY + 3} width={STB.rw} height={STB.trH} rx={20} fill="#000000" fillOpacity={0.12} />
      <rect x={STB.rx} y={STB.trY} width={STB.rw} height={STB.trH} rx={20} fill="#5C381E" stroke="#3A2211" strokeWidth={3} />
      <Skin name="tray" x={STB.rx} y={STB.trY} w={STB.rw} h={STB.trH} fit="stretch" />
      <rect x={STB.rx + 12} y={STB.trY + 52} width={STB.rw - 24} height={STB.trH - 64} rx={14} fill="#FFF7EA" fillOpacity={0.92} stroke="#D9C3B0" strokeWidth={1.5} />
      {chip(STB.rx + 12, STB.trY + 6, indian(free ? amt - S.lifted * g : amt) + " " + tx(U.smallU), deep(STB_BLUE), deep(STB_BLUE))}
      {shown && !free && chip(STB.rx + STB.rw - 12, STB.trY + 6, (h0 + full) + " " + uN(h0 + full, U.bigU) + " " + rem + " " + tx(U.smallU), deep(STB_GREEN), deep(STB_GREEN), true)}
      {S.tb === 1 && S.resweep && S.mine && chip(STB.rx + STB.rw - 12, STB.trY + 6, S.mine[0] + " " + uN(Number(S.mine[0]), U.bigU) + " " + S.mine[1] + " " + tx(U.smallU), C.ink, C.rule, true)}
      {trayRows}
      {n === 4 && !free && S.grouped > S.lifted && !shown && S.tb !== 2 && chip(STB.rx + STB.rw - 12, STB.trY + 6, tx("Carry"), deep(STB_VIO), deep(STB_VIO), true)}

      {/* the act key under the ladder: Group, then Lift (Bundle, then Carry) */}
      {actId && (
        <g>
          <Key id={actId} label={tx(STB_KEY[actId])} x={STB.key.x} y={STB.key.y} w={STB.key.w} h={STB.key.h} C={C} tone="key"
            disabled={!actLive} onClick={() => pressKey(actId)}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={actLive ? toneInk("key", C.ink) : mix(C.ink, "#FFFFFF", 0.3)}>{tx(STB_KEY[actId])}</text>
          </Key>
          {actLive && !free && (stage === "demo" ? stepOn === actId : !wrong) && (
            <Invite x={STB.key.x + STB.key.w / 2} y={STB.key.y + STB.key.h / 2} w={STB.key.w} h={STB.key.h} rx={RAD.key} C={C} />
          )}
        </g>
      )}
      {free && wide && (
        <g>
          <g pointerEvents="none">
            <rect x={910} y={100} width={540} height={300} rx={20} fill={C.paper} stroke={C.rule} strokeWidth={2.5} />
            <text x={1180} y={190} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={deep(STB_BLUE)}>{indian(fTot) + " " + tx("h")}</text>
            {fDone && fTot > 0 && (() => {
              const line = indian(fTot) + " ÷ 24 = " + fQ + ", " + tx("remainder") + " " + fR;
              const w40 = chipW["f:" + line] || line.length * T.prompt * 0.56;   /* measured at the prompt size */
              const fs = w40 <= 516 ? T.prompt : (w40 * T.label) / T.prompt <= 516 ? T.label : T.micro;
              return <text ref={(el: any) => { if (!el || !el.getComputedTextLength) return; const m = Math.ceil((el.getComputedTextLength() * T.prompt) / fs);
                if (m > 0 && Math.abs((chipW["f:" + line] || 0) - m) > 1) setChipW((o: any) => ({ ...o, ["f:" + line]: m })); }}
                x={1180} y={270} textAnchor="middle" fontSize={fs} fontWeight={700} fill={C.ink}>{line}</text>;
            })()}
            {fDone && fTot > 0 && <text x={1180} y={350} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={deep(STB_GREEN)}>{fQ + " " + uN(fQ, "days") + " " + fR + " " + uN(fR, "h")}</text>}
            {!fDone && S.grouped > 0 && <text x={1180} y={290} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={deep(STB_VIO)}>{tx("piles of 24")}</text>}
          </g>
          <Key id="add-ten" label={tx("Add 10")} x={930} y={420} w={240} h={84} C={C} tone="key" disabled={!canAdd(10) || actOn} onClick={() => add(10)}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={canAdd(10) && !actOn ? toneInk("key", C.ink) : mix(C.ink, "#FFFFFF", 0.3)}>{tx("Add 10")}</text>
          </Key>
          <Key id="add-one" label={tx("Add 1")} x={1190} y={420} w={240} h={84} C={C} tone="key" disabled={!canAdd(1) || actOn} onClick={() => add(1)}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={canAdd(1) && !actOn ? toneInk("key", C.ink) : mix(C.ink, "#FFFFFF", 0.3)}>{tx("Add 1")}</text>
          </Key>
        </g>
      )}

      {/* the working, beside the picture while the keypad is shut: the given, the division and the answer */}
      {wide && !free && (
        <g pointerEvents="none">
          <rect x={912} y={102} width={540} height={410} rx={20} fill="#000000" fillOpacity={0.06} />
          <rect x={910} y={100} width={540} height={410} rx={20} fill={C.paper} stroke={C.rule} strokeWidth={2.5} />
          <rect x={930} y={120} width={500} height={4} rx={2} fill={deep(STB_BLUE)} fillOpacity={0.3} />
          <text x={1180} y={200} textAnchor="middle" fontSize={n === 4 ? T.xl : T.display} fontWeight={700} fill={deep(STB_BLUE)}>{(h0 ? h0 + " " + uN(h0, U.bigU) + " " : "") + indian(amt) + " " + tx(U.smallU)}</text>
          {S.grouped > 0 && !shown && <text x={1180} y={270} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={deep(STB_VIO)}>{n === 4 ? tx("bundles of 60") : g === 24 ? tx("piles of 24") : tx("piles of 60")}</text>}
          {shown && div && <text x={1180} y={276} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{div}</text>}
          {shown && div && <text x={1180} y={334} textAnchor="middle" fontSize={T.prompt} fontWeight={600} fill={C.ink}>{"= " + full + ", " + tx("remainder") + " " + rem}</text>}
          {shown && !div && <text x={1180} y={276} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{amt + " " + tx("min")}</text>}
          {shown && !div && <text x={1180} y={334} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{"= " + full + " " + uN(full, "h") + " " + rem + " " + tx("min")}</text>}
          {shown && <text x={1180} y={440} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={deep(STB_GREEN)}>{(h0 + full) + " " + uN(h0 + full, U.bigU) + " " + rem + " " + tx(U.smallU)}</text>}
        </g>
      )}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const [mw, setMw] = useState(0);   /* before any return: a hook runs on every render */
  /* the bundled Poppins can arrive after the first paint (a direct mount): redraw once the fonts are in, so every measured width
     (chips, the free-play line, the summary line) is taken again from the real face, never cached from the fallback */
  const [, setFontTick] = useState(0);
  useEffect(() => {
    const f: any = typeof document !== "undefined" ? (document as any).fonts : null;
    if (!f) return;
    let live = true;
    const bump = () => { if (live) setFontTick((k: number) => k + 1); };
    if (f.ready && f.ready.then) f.ready.then(bump);
    if (f.addEventListener) f.addEventListener("loadingdone", bump);
    return () => { live = false; if (f.removeEventListener) f.removeEventListener("loadingdone", bump); };
  }, []);
  const v = result && result.last ? result.last.value : null;
  if (v === null || v === undefined || !it || !it.parts) return null;
  const [a, b] = slotPartsOf(v, 2);
  const unitOf = (u: string) => {
    const v = tx(u); if (v !== u) return v;
    const base = u.replace(/#1$/, "");
    if (lang === "en") return u === "days#1" ? "day" : base;
    return tx(base) !== base ? tx(base) : "";
  };
  const line = "= " + [a, unitOf(it.parts[0].label + (Number(a) === 1 ? "#1" : "")), b, unitOf(it.parts[1].label + (Number(b) === 1 ? "#1" : ""))].filter((x) => x !== "").join(" ");
  const tref = (el: any) => { if (!el || !el.getComputedTextLength) return; const m = Math.ceil(el.getComputedTextLength()); if (m > 0 && Math.abs(m - mw) > 1) setMw(m); };
  const tw = mw || [...line].length * T.micro * 0.6;
  const reach = -80;   /* the row's "You learned" line ends near stage x 1200 (thumb x -90): 10 clear */
  const room = w - reach - tw - 34;
  const nb = room >= 9 ? Math.max(1, Math.min(8, Number(a) || 1, Math.floor(room / 9))) : 0;
  const xl = Math.max(reach, w - tw - 24 - (nb ? nb * 9 + 10 : 0));
  return (
    <g>
      <rect x={xl} y={0} width={w - xl} height={h} rx={14} fill={tint(CHROME.panel, 0.55)} stroke={CHROME.rule} strokeWidth={1.5} />
      {Array.from({ length: nb }).map((_, k) => (
        <rect key={k} x={xl + 12 + k * 9} y={h / 2 - 16} width={6} height={32} rx={2} fill={STB_VIO} />
      ))}
      <text ref={tref} x={w - 12} y={h / 2 + (lang === "en" ? 10 : 12)} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={shade(STB_GREEN, 0.25)}>{line}</text>
    </g>
  );
}

function SmallerToBigger(props: any) {
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

export default SmallerToBigger;