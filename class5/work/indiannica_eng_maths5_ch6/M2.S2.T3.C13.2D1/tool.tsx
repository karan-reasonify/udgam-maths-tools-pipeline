/* ═══ M2.S2.T3.C13.2D1 · fraction_to_per_cent · tool-specific part ═══════════════════════════════
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

const TOOL_ID = "fraction_to_per_cent";
const MEDIA_ID = "M2.S2.T3.C13.2D1";
const TOOL_NAME = "Fraction to Per Cent";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["A fraction, and a bar of the same whole."];
/* the whole-tool line: printed on the summary page */
const FINISH_LINE = "You made hundredths, and wrote the per cent sign last.";
/* printed when the child opens Free play (the plan's free-play line); its LAST piece stays on the bubble */
const FREE_LINE = "Free play. Tap the card for a new fraction, then grow, simplify or bracket it.";

/* THE START PAGE (runtime r28; docs/LAYOUT.md §1c, docs/PATTERNS.md §14): the first thing a child sees in user mode.
   START_HOOK is ONE printed question to wonder at (it needs a TR entry, and never gives an answer away); StartArt is
   the object the lesson is about, drawn in a 1200 x 340 box ({ box, C, lang, tx }; plain shapes in the chrome and content
   colours, a <Skin> over them when the image agent made one). This stub is a dashed outline: draw the real object. */
const START_HOOK = "Can every fraction be turned into hundredths?";
/* the start page: a 3/4 card, its strip cut in quarters and the same strip cut in hundredths (the shading never moves), and a % sign */
function StartArt({ box, C, lang, tx }: any) {
  const L = 560, sx = 330, sh = 80;   /* the strips end at 890 and their labels by about 1010, clear of the % disc (1056 to 1184) */
  const strip = (y: number, d: number) => (
    <g>
      <defs><clipPath id={"fpStart" + y}><rect x={sx} y={y} width={L} height={sh} rx={10} /></clipPath></defs>
      <rect x={sx} y={y} width={L} height={sh} rx={10} fill={C.paper} stroke={C.ink} strokeWidth={3} />
      <Skin name="ribbon" x={sx} y={y} w={L} h={sh} clip={"url(#fpStart" + y + ")"} />
      <rect x={sx} y={y} width={L * 0.75} height={sh} fill="url(#gHundred)" fillOpacity={0.8} clipPath={"url(#fpStart" + y + ")"} />
      {Array.from({ length: d - 1 }).map((_, i) => {
        const x = sx + (L * (i + 1)) / d;
        return <line key={i} x1={x} y1={y + 3} x2={x} y2={y + sh - 3} stroke={x < sx + L * 0.75 ? "#FFFFFF" : C.ink} strokeOpacity={0.85} strokeWidth={d > 20 ? 1.4 : 3} />;
      })}
      <rect x={sx} y={y} width={L} height={sh} rx={10} fill="none" stroke={C.ink} strokeWidth={3} />
    </g>
  );
  return (
    <g>
      <rect x={60} y={30} width={210} height={280} rx={24} fill={C.paper} stroke={C.ink} strokeWidth={3} filter="url(#fShadowSoft)" />
      <text x={165} y={140} textAnchor="middle" fontSize={T.display + 16} fontWeight={700} fill={shade(CONTENT.hundred, 0.25)}>3</text>
      <line x1={110} y1={170} x2={220} y2={170} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
      <text x={165} y={268} textAnchor="middle" fontSize={T.display + 16} fontWeight={700} fill={shade(CONTENT.hundred, 0.25)}>4</text>
      {strip(50, 4)}
      {strip(200, 100)}
      <text x={sx + L + 24} y={104} fontSize={T.prompt} fontWeight={700} fill={C.ink}>100%</text>
      <text x={sx + L + 24} y={254} fontSize={T.prompt} fontWeight={700} fill={C.ink}>100%</text>
      <circle cx={1120} cy={170} r={64} fill={tint(CONTENT.one, 0.85)} stroke={shade(CONTENT.one, 0.25)} strokeWidth={4} />
      <text x={1120} y={196} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={shade(CONTENT.one, 0.25)}>%</text>
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, byte for byte, and the runtime looks each printed or drawn line
   up in it (Work draws its own words through tx("...")). Fill it AFTER the English is final and reviewed:
   `check` (tr-coverage) lists every printed line still missing. Nothing is baked: the lesson is silent.
   Empty = the tool runs in English only. */
/* terms, one per idea: per cent प्रतिशत / ટકા · fraction भिन्न / અપૂર્ણાંક · top (numerator) अंश / અંશ · bottom (denominator)
   हर / છેદ · term पद / પદ · HCF म॰स॰प॰ / ગુ૰સા૰અ૰ · improper fraction विषम भिन्न / અશુદ્ધ અપૂર્ણાંક · brackets कोष्ठक / કૌંસ ·
   strip पट्टी / પટ્ટી · whole पूरा / આખું · simplify सरल करो / સાદું રૂપ આપો · Times key गुणा कुंजी / ગુણાકાર ચાવી */
const TR: any = {
  hi: {
    "Fraction to Per Cent": "भिन्न से प्रतिशत",
    "A denominator of 100": "100 वाला हर",
    "Simplify first": "पहले सरल करो",
    "Times 100 in brackets": "कोष्ठक में × 100",
    "More than one whole": "एक पूरे से अधिक",
    "Can every fraction be turned into hundredths?": "क्या हर भिन्न को सौवें भागों में बदल सकते हैं?",
    "Free play. Tap the card for a new fraction, then grow, simplify or bracket it.": "खुला खेल। नई भिन्न के लिए कार्ड छुओ, फिर उसे बढ़ाओ, सरल करो या कोष्ठक में लिखो।",
    /* phase 1 */
    "Tap the Times key that turns 50 into 100.": "वह गुणा कुंजी दबाओ जो 50 को 100 बनाए।",
    "Count on in fifties until you reach 100.": "50-50 आगे गिनो, 100 तक पहुँचो।",
    "Whatever the bottom is multiplied by, multiply the top by the same.": "हर को जिससे गुणा करो, अंश को भी उसी से।",
    "Once the bottom is 100, the top number is the per cent.": "हर 100 हो जाए, तो अंश ही प्रतिशत है।",
    "Make the denominator 100, and the numerator is the per cent.": "हर को 100 बनाओ, तब अंश ही प्रतिशत है।",
    "You learned: once the denominator is 100, the numerator is the per cent.": "तुमने सीखा: हर 100 हो, तो अंश ही प्रतिशत है।",
    "Write 13/50 as a per cent.": "13/50 को प्रतिशत में लिखो।",
    "How many per cent?": "कितने प्रतिशत?",
    "Start with the bottom number, 50, and reach 100.": "हर 50 से शुरू करो और 100 तक पहुँचो।",
    "What per cent is 9/50?": "9/50 कितने प्रतिशत है?",
    "What per cent?": "कितना प्रतिशत?",
    "What times 50 makes 100?": "50 को किससे गुणा करें कि 100 बने?",
    "Now turn 43/50 into a per cent.": "अब 43/50 को प्रतिशत में बदलो।",
    "As a per cent?": "प्रतिशत में?",
    "Grow both terms until the bottom is 100.": "दोनों पद बढ़ाओ, जब तक हर 100 न हो।",
    /* phase 2 */
    "This bottom does not go into 100, so tap ÷ HCF to simplify first.": "इस हर से 100 नहीं बनता, पहले ÷ म॰स॰प॰ दबाओ।",
    "The ÷ HCF key divides both terms.": "÷ म॰स॰प॰ कुंजी दोनों पदों को भाग देती है।",
    "Now tap the Times key that turns 5 into 100.": "अब वह गुणा कुंजी दबाओ जो 5 को 100 बनाए।",
    "5 times what makes 100?": "5 को किससे गुणा करें कि 100 बने?",
    "Once both terms are divided, ask what times the new bottom makes 100.": "भाग देने के बाद, नया हर किससे गुणा होकर 100 बने?",
    "When the bottom is 100, the top number is the per cent.": "जब हर 100 हो, तब अंश ही प्रतिशत है।",
    "Simplify first if the bottom does not make 100, but 1/3 never can.": "हर 100 न बने तो पहले सरल करो, पर 1/3 कभी नहीं बनता।",
    "You learned: simplify by the HCF first if the bottom cannot make 100.": "तुमने सीखा: हर 100 न बने तो पहले म॰स॰प॰ से सरल करो।",
    "Write 33/60 as a per cent.": "33/60 को प्रतिशत में लिखो।",
    "Find the HCF of 33 and 60, and divide both terms by it.": "33 और 60 का म॰स॰प॰ लो, दोनों पदों को उससे भाग दो।",
    "Simplify 12/30 first, then write it as a per cent.": "पहले 12/30 को सरल करो, फिर प्रतिशत में लिखो।",
    "Which number divides both 12 and 30?": "कौन-सी संख्या 12 और 30 दोनों को भाग देती है?",
    "Can 1/3 get a denominator of 100 by multiplying both terms by one whole number?": "क्या दोनों पदों को एक पूर्ण संख्या से गुणा करके 1/3 का हर 100 हो सकता है?",
    "Can 1/3 reach 100?": "क्या 1/3 का हर 100 बनेगा?",
    "Try the Times keys on 1/3 and watch the bottom.": "1/3 पर गुणा कुंजियाँ आज़माओ और हर देखो।",
    "Count on in threes near 100 and see where you land.": "100 के पास 3-3 आगे गिनो, देखो कहाँ पहुँचते हो।",
    "3 × 33 is 99 and 3 × 34 is 102.": "3 × 33 = 99 और 3 × 34 = 102 है।",
    "Yes, × 33": "हाँ, × 33",
    "No": "नहीं",
    "Yes, × 34": "हाँ, × 34",
    /* phase 3 */
    "Tap × 100 to write the fraction times 100 inside brackets.": "× 100 दबाओ, भिन्न गुणा 100 कोष्ठक में लिखी जाएगी।",
    "The key under the strip says × 100.": "पट्टी के नीचे की कुंजी पर × 100 लिखा है।",
    "Now tap %, the sign that stands after the closing bracket.": "अब % दबाओ, यह चिह्न कोष्ठक बंद होने के बाद आता है।",
    "The same key now shows the % sign.": "वही कुंजी अब % चिह्न दिखाती है।",
    "Multiply the top by 100 and keep the bottom as it is.": "अंश को 100 से गुणा करो, हर वैसा ही रखो।",
    "Divide that product by the bottom to finish the brackets.": "उस गुणनफल को हर से भाग दो, कोष्ठक पूरा होगा।",
    "Times 100 goes inside the brackets, and the % sign stands after them.": "× 100 कोष्ठक के अंदर आता है और % चिह्न उसके बाद।",
    "You learned: (fraction × 100)%, with the % sign after the brackets.": "तुमने सीखा: (भिन्न × 100)%, % चिह्न कोष्ठक के बाद।",
    "Work out the brackets to write 21/35 as a per cent.": "कोष्ठक हल करके 21/35 को प्रतिशत में लिखो।",
    "Find the times sign inside the brackets.": "कोष्ठक के अंदर गुणा का चिह्न ढूँढो।",
    "Use the brackets to write 3/6 as a per cent.": "कोष्ठक से 3/6 को प्रतिशत में लिखो।",
    "Which number is multiplied by 100 here?": "यहाँ किस संख्या को 100 से गुणा किया है?",
    "Write 18/40 as a per cent with times 100 in brackets.": "कोष्ठक में × 100 लगाकर 18/40 को प्रतिशत में लिखो।",
    "Read the brackets: what is multiplied first?": "कोष्ठक पढ़ो: पहले किसका गुणा होता है?",
    /* phase 4 */
    "Tap Unmix to turn 1 1/4 into an improper fraction.": "विषम करो दबाओ, 1 1/4 विषम भिन्न बनेगी।",
    "The Unmix key is at the end of the row.": "विषम करो कुंजी पंक्ति के अंत में है।",
    "Now make the denominator 100 with one Times key.": "अब एक गुणा कुंजी से हर 100 बनाओ।",
    "4 times what makes 100?": "4 को किससे गुणा करें कि 100 बने?",
    "One whole strip is 100%, so count the whole strips first.": "एक पूरी पट्टी 100% है, पहले पूरी पट्टियाँ गिनो।",
    "Add 100% for each whole strip to the per cent of the last strip.": "हर पूरी पट्टी का 100% आखिरी पट्टी के प्रतिशत में जोड़ो।",
    "Unmix first, and more than one whole is more than 100%.": "पहले विषम भिन्न बनाओ, एक पूरे से अधिक 100% से अधिक है।",
    "You learned: unmix first; more than one whole is more than 100%.": "तुमने सीखा: पहले विषम भिन्न; एक पूरे से अधिक, 100% से अधिक।",
    "Write 1 9/20 as a per cent.": "1 9/20 को प्रतिशत में लिखो।",
    "Turn the whole 1 into twentieths and add them to the 9.": "पूरे 1 को बीसवें भागों में बदलो और 9 में जोड़ो।",
    "What per cent is 2 1/2?": "2 1/2 कितने प्रतिशत है?",
    "How many halves make 2 whole strips and a half?": "2 पूरी पट्टियों और आधी में कितने आधे हैं?",
    "Turn 1 1/10 into a per cent.": "1 1/10 को प्रतिशत में बदलो।",
    "Count every tenth in 1 1/10, the whole strip too.": "1 1/10 का हर दसवाँ भाग गिनो, पूरी पट्टी का भी।",
    /* win lines (Work's api.say) */
    "Yes, 13/50 is 26/100, and that is 26%.": "हाँ, 13/50 = 26/100, यानी 26%।",
    "Yes, 9/50 is 18/100, so it is 18%.": "हाँ, 9/50 = 18/100, तो यह 18% है।",
    "Yes, 43/50 is 86/100, so it is 86%.": "हाँ, 43/50 = 86/100, तो यह 86% है।",
    "Yes, 33/60 is 11/20, which is 55/100 or 55%.": "हाँ, 33/60 = 11/20 = 55/100, यानी 55%।",
    "Yes, 12/30 is 2/5, which is 40/100 or 40%.": "हाँ, 12/30 = 2/5 = 40/100, यानी 40%।",
    "Right, 3 never goes into 100 exactly.": "सही, 100 को 3 से कभी पूरा भाग नहीं जाता।",
    "Yes, (21/35 × 100)% is 60%.": "हाँ, (21/35 × 100)% = 60%।",
    "Yes, (3/6 × 100)% is 50%.": "हाँ, (3/6 × 100)% = 50%।",
    "Yes, (18/40 × 100)% is 45%.": "हाँ, (18/40 × 100)% = 45%।",
    "Yes, 1 9/20 is 145/100, which is 145%.": "हाँ, 1 9/20 = 145/100, यानी 145%।",
    "Yes, 2 1/2 is 250/100, so it is 250%.": "हाँ, 2 1/2 = 250/100, तो यह 250% है।",
    "Yes, 1 1/10 is 110%, more than 100%.": "हाँ, 1 1/10 = 110%, 100% से अधिक।",
    /* the answer slot and the words Work draws */
    "per cent": "प्रतिशत",
    "%": "%",
    "Both terms": "दोनों पद",
    "Improper fraction": "विषम भिन्न",
    "÷ HCF": "÷ म॰स॰प॰",
    "Unmix": "विषम करो",
    "Top only": "केवल अंश",
  },
  gu: {
    "Fraction to Per Cent": "અપૂર્ણાંકથી ટકા",
    "A denominator of 100": "100 વાળો છેદ",
    "Simplify first": "પહેલાં સાદું રૂપ",
    "Times 100 in brackets": "કૌંસમાં × 100",
    "More than one whole": "એક આખા કરતાં વધુ",
    "Can every fraction be turned into hundredths?": "શું દરેક અપૂર્ણાંકને સોમા ભાગમાં ફેરવી શકાય?",
    "Free play. Tap the card for a new fraction, then grow, simplify or bracket it.": "મુક્ત રમત. કાર્ડ દબાવી નવો અપૂર્ણાંક લો, પછી મોટો કરો, સાદું કરો કે કૌંસમાં લખો.",
    /* phase 1 */
    "Tap the Times key that turns 50 into 100.": "એ ગુણાકાર ચાવી દબાવો જે 50 ને 100 બનાવે.",
    "Count on in fifties until you reach 100.": "50-50 આગળ ગણો, 100 સુધી પહોંચો.",
    "Whatever the bottom is multiplied by, multiply the top by the same.": "છેદને જેનાથી ગુણો, અંશને પણ તેનાથી જ ગુણો.",
    "Once the bottom is 100, the top number is the per cent.": "છેદ 100 થાય, ત્યારે અંશ જ ટકા છે.",
    "Make the denominator 100, and the numerator is the per cent.": "છેદને 100 બનાવો, પછી અંશ જ ટકા છે.",
    "You learned: once the denominator is 100, the numerator is the per cent.": "તમે શીખ્યા: છેદ 100 હોય, તો અંશ જ ટકા છે.",
    "Write 13/50 as a per cent.": "13/50 ને ટકામાં લખો.",
    "How many per cent?": "કેટલા ટકા?",
    "Start with the bottom number, 50, and reach 100.": "છેદ 50 થી શરૂ કરો અને 100 સુધી પહોંચો.",
    "What per cent is 9/50?": "9/50 કેટલા ટકા છે?",
    "What per cent?": "કેટલા ટકા થાય?",
    "What times 50 makes 100?": "50 ને શેનાથી ગુણીએ તો 100 થાય?",
    "Now turn 43/50 into a per cent.": "હવે 43/50 ને ટકામાં ફેરવો.",
    "As a per cent?": "ટકામાં?",
    "Grow both terms until the bottom is 100.": "છેદ 100 થાય ત્યાં સુધી બંને પદ વધારો.",
    /* phase 2 */
    "This bottom does not go into 100, so tap ÷ HCF to simplify first.": "આ છેદથી 100 નથી બનતું, પહેલાં ÷ ગુ૰સા૰અ૰ દબાવો.",
    "The ÷ HCF key divides both terms.": "÷ ગુ૰સા૰અ૰ ચાવી બંને પદને ભાગે છે.",
    "Now tap the Times key that turns 5 into 100.": "હવે એ ગુણાકાર ચાવી દબાવો જે 5 ને 100 બનાવે.",
    "5 times what makes 100?": "5 ને શેનાથી ગુણીએ તો 100 થાય?",
    "Once both terms are divided, ask what times the new bottom makes 100.": "ભાગ્યા પછી, નવો છેદ શેનાથી ગુણાઈને 100 થાય?",
    "When the bottom is 100, the top number is the per cent.": "જ્યારે છેદ 100 હોય, ત્યારે અંશ જ ટકા છે.",
    "Simplify first if the bottom does not make 100, but 1/3 never can.": "છેદ 100 ન બને તો પહેલાં સાદું રૂપ આપો, પણ 1/3 ક્યારેય નહીં.",
    "You learned: simplify by the HCF first if the bottom cannot make 100.": "તમે શીખ્યા: છેદ 100 ન બને તો પહેલાં ગુ૰સા૰અ૰થી સાદું કરો.",
    "Write 33/60 as a per cent.": "33/60 ને ટકામાં લખો.",
    "Find the HCF of 33 and 60, and divide both terms by it.": "33 અને 60 નો ગુ૰સા૰અ૰ શોધો, બંને પદને તેનાથી ભાગો.",
    "Simplify 12/30 first, then write it as a per cent.": "પહેલાં 12/30 ને સાદું રૂપ આપો, પછી ટકામાં લખો.",
    "Which number divides both 12 and 30?": "કઈ સંખ્યા 12 અને 30 બંનેને ભાગે છે?",
    "Can 1/3 get a denominator of 100 by multiplying both terms by one whole number?": "શું બંને પદને એક પૂર્ણ સંખ્યાથી ગુણીને 1/3 નો છેદ 100 થઈ શકે?",
    "Can 1/3 reach 100?": "શું 1/3 નો છેદ 100 બને?",
    "Try the Times keys on 1/3 and watch the bottom.": "1/3 પર ગુણાકાર ચાવીઓ અજમાવો અને છેદ જુઓ.",
    "Count on in threes near 100 and see where you land.": "100 પાસે 3-3 આગળ ગણો, જુઓ ક્યાં પહોંચો છો.",
    "3 × 33 is 99 and 3 × 34 is 102.": "3 × 33 = 99 અને 3 × 34 = 102 છે.",
    "Yes, × 33": "હા, × 33",
    "No": "ના",
    "Yes, × 34": "હા, × 34",
    /* phase 3 */
    "Tap × 100 to write the fraction times 100 inside brackets.": "× 100 દબાવો, અપૂર્ણાંક ગુણ્યા 100 કૌંસમાં લખાશે.",
    "The key under the strip says × 100.": "પટ્ટી નીચેની ચાવી પર × 100 લખ્યું છે.",
    "Now tap %, the sign that stands after the closing bracket.": "હવે % દબાવો, આ ચિહ્ન કૌંસ બંધ થયા પછી આવે છે.",
    "The same key now shows the % sign.": "એ જ ચાવી હવે % ચિહ્ન બતાવે છે.",
    "Multiply the top by 100 and keep the bottom as it is.": "અંશને 100 થી ગુણો, છેદ એમ જ રાખો.",
    "Divide that product by the bottom to finish the brackets.": "એ ગુણાકારને છેદથી ભાગો, કૌંસ પૂરો થશે.",
    "Times 100 goes inside the brackets, and the % sign stands after them.": "× 100 કૌંસની અંદર આવે છે અને % ચિહ્ન તેના પછી.",
    "You learned: (fraction × 100)%, with the % sign after the brackets.": "તમે શીખ્યા: (અપૂર્ણાંક × 100)%, % ચિહ્ન કૌંસ પછી.",
    "Work out the brackets to write 21/35 as a per cent.": "કૌંસ ઉકેલીને 21/35 ને ટકામાં લખો.",
    "Find the times sign inside the brackets.": "કૌંસની અંદર ગુણાકારનું ચિહ્ન શોધો.",
    "Use the brackets to write 3/6 as a per cent.": "કૌંસથી 3/6 ને ટકામાં લખો.",
    "Which number is multiplied by 100 here?": "અહીં કઈ સંખ્યાને 100 થી ગુણી છે?",
    "Write 18/40 as a per cent with times 100 in brackets.": "કૌંસમાં × 100 મૂકીને 18/40 ને ટકામાં લખો.",
    "Read the brackets: what is multiplied first?": "કૌંસ વાંચો: પહેલાં શેનો ગુણાકાર થાય છે?",
    /* phase 4 */
    "Tap Unmix to turn 1 1/4 into an improper fraction.": "અશુદ્ધ કરો દબાવો, 1 1/4 અશુદ્ધ અપૂર્ણાંક બનશે.",
    "The Unmix key is at the end of the row.": "અશુદ્ધ કરો ચાવી હરોળના છેડે છે.",
    "Now make the denominator 100 with one Times key.": "હવે એક ગુણાકાર ચાવીથી છેદ 100 બનાવો.",
    "4 times what makes 100?": "4 ને શેનાથી ગુણીએ તો 100 થાય?",
    "One whole strip is 100%, so count the whole strips first.": "એક આખી પટ્ટી 100% છે, પહેલાં આખી પટ્ટીઓ ગણો.",
    "Add 100% for each whole strip to the per cent of the last strip.": "દરેક આખી પટ્ટીના 100% છેલ્લી પટ્ટીના ટકામાં ઉમેરો.",
    "Unmix first, and more than one whole is more than 100%.": "પહેલાં અશુદ્ધ અપૂર્ણાંક બનાવો, એક આખાથી વધુ એટલે 100% થી વધુ.",
    "You learned: unmix first; more than one whole is more than 100%.": "તમે શીખ્યા: પહેલાં અશુદ્ધ; એક આખાથી વધુ એટલે 100% થી વધુ.",
    "Write 1 9/20 as a per cent.": "1 9/20 ને ટકામાં લખો.",
    "Turn the whole 1 into twentieths and add them to the 9.": "આખા 1 ને વીસમા ભાગોમાં ફેરવો અને 9 માં ઉમેરો.",
    "What per cent is 2 1/2?": "2 1/2 કેટલા ટકા છે?",
    "How many halves make 2 whole strips and a half?": "2 આખી પટ્ટી અને અડધીમાં કેટલા અડધા છે?",
    "Turn 1 1/10 into a per cent.": "1 1/10 ને ટકામાં ફેરવો.",
    "Count every tenth in 1 1/10, the whole strip too.": "1 1/10 નો દરેક દસમો ભાગ ગણો, આખી પટ્ટીનો પણ.",
    /* win lines (Work's api.say) */
    "Yes, 13/50 is 26/100, and that is 26%.": "હા, 13/50 = 26/100, એટલે 26%.",
    "Yes, 9/50 is 18/100, so it is 18%.": "હા, 9/50 = 18/100, એટલે 18% છે.",
    "Yes, 43/50 is 86/100, so it is 86%.": "હા, 43/50 = 86/100, એટલે 86% છે.",
    "Yes, 33/60 is 11/20, which is 55/100 or 55%.": "હા, 33/60 = 11/20 = 55/100, એટલે 55%.",
    "Yes, 12/30 is 2/5, which is 40/100 or 40%.": "હા, 12/30 = 2/5 = 40/100, એટલે 40%.",
    "Right, 3 never goes into 100 exactly.": "સાચું, 100 ને 3 થી ક્યારેય પૂરો ભાગ જતો નથી.",
    "Yes, (21/35 × 100)% is 60%.": "હા, (21/35 × 100)% = 60%.",
    "Yes, (3/6 × 100)% is 50%.": "હા, (3/6 × 100)% = 50%.",
    "Yes, (18/40 × 100)% is 45%.": "હા, (18/40 × 100)% = 45%.",
    "Yes, 1 9/20 is 145/100, which is 145%.": "હા, 1 9/20 = 145/100, એટલે 145%.",
    "Yes, 2 1/2 is 250/100, so it is 250%.": "હા, 2 1/2 = 250/100, એટલે 250% છે.",
    "Yes, 1 1/10 is 110%, more than 100%.": "હા, 1 1/10 = 110%, 100% થી વધુ.",
    /* the answer slot and the words Work draws */
    "per cent": "ટકા",
    "%": "%",
    "Both terms": "બંને પદ",
    "Improper fraction": "અશુદ્ધ અપૂર્ણાંક",
    "÷ HCF": "÷ ગુ૰સા૰અ૰",
    "Unmix": "અશુદ્ધ કરો",
    "Top only": "માત્ર અંશ",
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
/* A per cent answer: ONE box with the % sign printed after it; the child types the number only (chapter 6 decision,
   BUILD_CARD §7 2026-10-17). Writing the % sign last is taught on the working area (phase 3's × 100 then % key). */
const PCT = [{ label: "per cent", unit: "%" }];
/* the Times keys (both terms multiplied by one number) and Free play's fractions (each reaches a whole per cent) */
const FP_KEYS = [2, 4, 5, 10, 20, 25, 50];
const FP_FREE = [[0, 12, 40], [0, 9, 20], [0, 18, 24], [0, 12, 15], [0, 7, 25], [0, 1, 4]];
const fpGcd = (a: number, b: number): number => (b ? fpGcd(b, a % b) : a);
/* the chapter's colours, as ink: deep blue = the given fraction, green = the per cent reached, vermilion = both terms / times 100,
   amber = what is being worked on now */
const FP_INK = { given: shade(CONTENT.hundred, 0.25), answer: shade(CONTENT.one, 0.25), both: shade(CONTENT.pointer, 0.25), now: shade(CONTENT.ten, 0.4) };
/* a text's width in Poppins, by character */
const fpTw = (t: string, fs: number) => String(t).split("").reduce((a: number, ch: string) => a + (ch === " " ? 0.28 : ch === "(" || ch === ")" ? 0.36 : ch === "%" ? 0.86 : /[A-Z]/.test(ch) ? 0.68 : /[a-z]/.test(ch) ? 0.56 : 0.62), 0) * fs;
/* the picture's state for one fraction: w n d (mixed until Unmix), k = the Times key used (dPrev the bottom before it), g = the HCF
   used, un = the wholes unmixed, tried = products that missed 100, br = 0 / 1 brackets / 2 % sign, rev = how far an act has drawn,
   tr = the correction's stage, lit = what is lit amber */
const fpFresh = (f: number[]) => ({ w: f[0], n: f[1], d: f[2], mixed: f[0] > 0, k: 0, dPrev: 0, g: 0, un: 0, tried: [] as any[], br: 0,
  rev: null as any, revKind: "", nd: 0, tr: 0, lit: "", cmp: null as any, ownHcf: false });
/* the rest of the method from state S, as patches in order (the traceback plays them one by one; the win applies them all) */
const fpPlan = (S: any, kind: string) => {
  if (kind === "bracket") return (S.br < 2 ? [{ br: 2 }] : []).concat([{ tr: 1 }, { tr: 2 }] as any[]);
  if (kind === "third") return [{ tried: [{ k: 32, p: 96 }] }, { tried: [{ k: 32, p: 96 }, { k: 33, p: 99 }] }, { tried: [{ k: 33, p: 99 }, { k: 34, p: 102 }] }, { tr: 2 }];
  const out: any[] = [];
  let n = S.n, d = S.d;
  if (S.mixed) { n = S.w * d + n; out.push({ mixed: false, w: 0, n, un: S.w, tried: [] }); }
  const g = fpGcd(n, d);
  if (100 % d && g > 1) { n /= g; d /= g; out.push({ n, d, g, tried: [] }); }
  if (d !== 100 && 100 % d === 0) { const K = 100 / d; out.push({ n: n * K, d: 100, k: K, dPrev: d, tried: [] }); }
  out.push({ tr: 2 });
  return out;
};
/* item.f = [whole, numerator, denominator] (whole 0: a plain fraction) */
const PHASES = [
  {
    n: 1,
    concept: "A denominator of 100",
    conceptId: "M2.S2.T3.C10", objectiveIds: ["O3"],
    says: ["What times the bottom number makes a hundred? Do the same to the top."],
    /* the guide steps run on a warm-up fraction (the brief: fresh fractions); question 1 then opens untouched, like 2 and 3 */
    warm: [0, 7, 50],
    steps: [{ say: "Tap the Times key that turns 50 into 100.", on: "times-2", hint: "Count on in fifties until you reach 100." }],
    /* tries, as the plan writes it: First rung: ask what times the denominator makes one hundred. Second rung: tap that button and read the new denominator. Third rung: the same task with a denominator that gets there in one step, before the question's own returns. */
    ladder: ["Whatever the bottom is multiplied by, multiply the top by the same.", "Once the bottom is 100, the top number is the per cent."],
    closing: "Make the denominator 100, and the numerator is the per cent.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: once the denominator is 100, the numerator is the per cent.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "the denominator is lit amber, both terms are multiplied until it is 100 (the strip recut into hundredths, its shading still), and the per cent card shows the answer in green",
    items: [
      /* learn FP1: answer in the plan = 26% */
      { qid: "M2.S2.T3.C10:FP1", kind: "grow", f: [0, 13, 50], parts: PCT, answer: [26], say: "Write 13/50 as a per cent.", ask: "How many per cent?", miss: "Start with the bottom number, 50, and reach 100." },
      /* practice 1: answer in the plan = 18%, because 9/50 = 18/100 */
      { qid: "M2.S2.T3.C10:1", kind: "grow", f: [0, 9, 50], parts: PCT, answer: [18], say: "What per cent is 9/50?", ask: "What per cent?", miss: "What times 50 makes 100?" },
      /* practice 4: answer in the plan = 86%, because 43/50 = 86/100 */
      { qid: "M2.S2.T3.C10:4", kind: "grow", f: [0, 43, 50], parts: PCT, answer: [86], say: "Now turn 43/50 into a per cent.", ask: "As a per cent?", miss: "Grow both terms until the bottom is 100." },
    ],
  },
  {
    n: 2,
    concept: "Simplify first",
    conceptId: "M2.S2.T3.C11", objectiveIds: ["O3"],
    says: ["Sixty does not go into a hundred. Simplify first, then try again."],
    warm: [0, 8, 40],
    steps: [
      { say: "This bottom does not go into 100, so tap ÷ HCF to simplify first.", on: "hcf", hint: "The ÷ HCF key divides both terms." },
      { say: "Now tap the Times key that turns 5 into 100.", on: "times-20", hint: "5 times what makes 100?" },
    ],
    /* tries, as the plan writes it: First rung: find one number that divides both terms. Second rung: divide both terms by it and read the new denominator. Third rung: the same task with smaller terms, before the question's fraction returns. */
    ladder: ["Once both terms are divided, ask what times the new bottom makes 100.", "When the bottom is 100, the top number is the per cent."],
    closing: "Simplify first if the bottom does not make 100, but 1/3 never can.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: simplify by the HCF first if the bottom cannot make 100.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "the denominator is lit amber, both terms are divided by the HCF and then multiplied until it is 100, and the per cent card shows the answer in green; for 1/3 the products 96, 99 and 102 climb past 100 and never land on it",
    items: [
      /* learn FP2: answer in the plan = 55% */
      { qid: "M2.S2.T3.C11:FP2", kind: "grow", f: [0, 33, 60], parts: PCT, answer: [55], near: 11, say: "Write 33/60 as a per cent.", ask: "How many per cent?", miss: "Find the HCF of 33 and 60, and divide both terms by it." },
      /* practice 2: the plan's 9/30 = 30% changed to 12/30 = 40% on the owner's word (BUILD_CARD §7: the copied denominator scored right).
         The HCF is 6, so 12/30 = 2/5 = 40/100; only the top divided gives 2 */
      { qid: "M2.S2.T3.C11:2", kind: "grow", f: [0, 12, 30], parts: PCT, answer: [40], near: 2, say: "Simplify 12/30 first, then write it as a per cent.", ask: "What per cent?", miss: "Which number divides both 12 and 30?" },
      /* practice 5: answer in the plan = Because 3 does not go into 100: 3 x 33 = 99 and 3 x 34 = 102, and no whole number times 3 makes 100.
         Built as a Yes / No choice (a "why" cannot be typed): the Times keys on 1/3 show the products, the traceback shows 99 and 102. */
      { qid: "M2.S2.T3.C11:5", kind: "third", f: [0, 1, 3], choices: [{ id: "yes33", label: "Yes, × 33" }, { id: "no", label: "No" }, { id: "yes34", label: "Yes, × 34" }], answer: "no",
        say: "Can 1/3 get a denominator of 100 by multiplying both terms by one whole number?", ask: "Can 1/3 reach 100?",
        miss: "Try the Times keys on 1/3 and watch the bottom.",
        ladder: ["Count on in threes near 100 and see where you land.", "3 × 33 is 99 and 3 × 34 is 102."] },
    ],
  },
  {
    n: 3,
    concept: "Times 100 in brackets",
    conceptId: "M2.S2.T3.C12", objectiveIds: ["O4"],
    says: ["Times a hundred goes inside the brackets. The per cent sign goes last."],
    warm: [0, 21, 30],
    steps: [
      { say: "Tap × 100 to write the fraction times 100 inside brackets.", on: "times100", hint: "The key under the strip says × 100." },
      { say: "Now tap %, the sign that stands after the closing bracket.", on: "percent", hint: "The same key now shows the % sign." },
    ],
    /* tries, as the plan writes it: First rung: write the fraction inside brackets. Second rung: add times one hundred and work out the product. Third rung: the same task with a denominator that goes into one hundred, before the question's own returns. */
    ladder: ["Multiply the top by 100 and keep the bottom as it is.", "Divide that product by the bottom to finish the brackets."],
    closing: "Times 100 goes inside the brackets, and the % sign stands after them.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: (fraction × 100)%, with the % sign after the brackets.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "the brackets and the % sign are written, then the product inside the brackets is worked out on a second line, ending on the per cent in green",
    items: [
      /* learn FP3: answer in the plan = 60% */
      { qid: "M2.S2.T3.C12:FP3", kind: "bracket", f: [0, 21, 35], parts: PCT, answer: [60], say: "Work out the brackets to write 21/35 as a per cent.", ask: "How many per cent?", miss: "Find the times sign inside the brackets." },
      /* practice 3: answer in the plan = (3/6 x 100)% = 50% */
      { qid: "M2.S2.T3.C12:3", kind: "bracket", f: [0, 3, 6], parts: PCT, answer: [50], say: "Use the brackets to write 3/6 as a per cent.", ask: "What per cent?", miss: "Which number is multiplied by 100 here?" },
      /* practice 6: the plan's (16/40 x 100)% = 40% changed to 18/40 = 45% on the owner's word (BUILD_CARD §7); (18/40 x 100)% = 1800/40 = 45 */
      { qid: "M2.S2.T3.C12:6", kind: "bracket", f: [0, 18, 40], parts: PCT, answer: [45], say: "Write 18/40 as a per cent with times 100 in brackets.", ask: "As a per cent?", miss: "Read the brackets: what is multiplied first?" },
    ],
  },
  {
    n: 4,
    concept: "More than one whole",
    conceptId: "M2.S2.T3.C13", objectiveIds: ["O4"],
    says: ["One whole is a hundred per cent. Is this more or less than one whole?"],
    warm: [1, 1, 4],
    steps: [
      { say: "Tap Unmix to turn 1 1/4 into an improper fraction.", on: "unmix", hint: "The Unmix key is at the end of the row." },
      { say: "Now make the denominator 100 with one Times key.", on: "times-25", hint: "4 times what makes 100?" },
    ],
    /* tries, as the plan writes it: First rung: count the whole bars only. Second rung: count the shaded parts of the last bar. Third rung: the same task with one whole and a half, before the question's own returns. */
    ladder: ["One whole strip is 100%, so count the whole strips first.", "Add 100% for each whole strip to the per cent of the last strip."],
    closing: "Unmix first, and more than one whole is more than 100%.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: unmix first; more than one whole is more than 100%.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "the denominator is lit amber, the whole strips are cut into the same parts (Unmix), both terms are multiplied until the bottom is 100, and the per cent card shows the answer, past the 100% mark, in green",
    items: [
      /* learn FP4: answer in the plan = 145% */
      { qid: "M2.S2.T3.C13:FP4", kind: "grow", f: [1, 9, 20], parts: PCT, answer: [145], say: "Write 1 9/20 as a per cent.", ask: "How many per cent?", miss: "Turn the whole 1 into twentieths and add them to the 9." },
      /* practice 7: answer in the plan = 250%, because 2 1/2 = 5/2 = 250/100 */
      { qid: "M2.S2.T3.C13:7", kind: "grow", f: [2, 1, 2], parts: PCT, answer: [250], say: "What per cent is 2 1/2?", ask: "What per cent?", miss: "How many halves make 2 whole strips and a half?" },
      /* practice 8: answer in the plan = More: 1 1/10 = 11/10 = 110/100, which is 110% */
      /* plan question: Is 1 1/10 more or less than 100%? Write it as a per cent. (one sentence for the bubble below) */
      { qid: "M2.S2.T3.C13:8", kind: "grow", f: [1, 1, 10], parts: PCT, answer: [110], say: "Turn 1 1/10 into a per cent.", ask: "As a per cent?", miss: "Count every tenth in 1 1/10, the whole strip too." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = { timesKeys: FP_KEYS, freeFractions: FP_FREE, strip: { length: 740, label: "100% at the end of each whole" } };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work */
/* (a per cent is (whole x d + n) x 100 / d by long division, never through the Times keys; 1/3: no whole number k has 3 x k = 100) */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const [w, n, d] = it.f;
  if (it.choices) { let k = 1; while (d * k < 100) k++; return it.answer === (d * k === 100 ? "yes" : "no"); }
  const top = (w * d + n) * 100;
  return top % d === 0 && Array.isArray(it.answer) && it.answer.length === 1 && it.answer[0] === top / d;
}));
/* the most likely wrong answer (the misconception); judge must reject it: item.near where the item names one (phase 2: only the
   top divided by the HCF, 11 for 33/60), else the starting numerator as the per cent, the fraction part alone for a mixed number
   (45 for 1 9/20), "Yes, × 33" for 1/3 */
const nearMiss = (item: any) => (item.choices ? "yes33" : item.near != null ? String(item.near)
  : item.f[0] > 0 ? String((item.f[1] * 100) / item.f[2]) : String(item.f[1]));
/* the forms of an answer that no question, hint or ladder line may print: the per cent in every form; the bare number too,
   unless it is a term of the question's own fraction (a fraction whose per cent equals one of its own terms, such as 9/30 = 30%) */
const answerForms = (item: any) => {
  if (item.choices) return [String(item.answer)];
  const a = item.answer[0], terms = item.f.map(String);
  return [a + "%", a + " per cent", words(a)].concat(terms.includes(String(a)) ? [] : [String(a), indian(a)]);
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: e.g. drop a token that waits; undefined = press Enter. In a guide-steps phase
   (stage "demo") it must return undefined, so the agent's check() reaches api.onEnter and performs the current step:
   set HOOK.check only while a question is open */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area ────────────────────────────────────────────────────────────────────────
   Its size is `box` ({ w, h, open }): the whole card (1472 x 528) with the answer panel shut and 1086 x 528 with it
   open, easing between (the board layout, docs/LAYOUT.md §1b, docs/PATTERNS.md §14): lay everything out from box.w
   with plain arithmetic in render, never from constants or api.W. Origin at the area's top-left.
   keyOnly (LAYOUT.md §1d): the question bar is gone, so the working area is 64,108, 1472 x 520 (NOT 64,202 x 528) with the panel shut, 1086 (900
   with bigPad) x 520 open. box.key = { x, y, w, h } is the key's corner in THIS area's coordinates (about x 1190, y 0, 282 x 88; wider on a
   Yes/No question): keep every element out of it, e.g. const kx = box.key ? box.key.x - 12 : box.w; (board-fit). There is no runs zone.
   Every act (cut, measure, count, tidy ...) is performed on screen: await api.act({ tool, moves, at, onPoint }) from the child's tap and
   react only when it resolves true (PATTERNS.md §15).
   Countable things use CONTENT colours (url(#gHundred|gTen|gOne|gBead|gPointer)); coloured numerals
   and words use a deeper ink, shade(colour, 0.25), so they read at 4.5:1. Type uses T.* only.
   Pieces: drag = useDrag(onDrop) then {...control(id, label), ...drag.bind(pay), ...drag.keys(pay)};
   taps = <Hit id x y w h onPress label />. One <Invite/> marks the one thing to touch.
   Nothing is written here that the bubble already says. `wrong` = { value, tries } after a miss:
   lock, redraw the mathematics in steps (the traceback), unlock; never mark it, never reset it.
   stage === "free" is Free play (the plan's writeup.freePlay): no target, every control unlocked.
   Sound effects where the picture moves: api.sfx.cut() (a knife), settle() (pieces come to rest),
   trade() (pieces close into one), tick() (a snap); correct, wrong, win and cheer are the runtime's.
   step / stepOn: the guide step the child is on and the act it waits for (null outside a steps phase).
   nextKey: true (the ToolFrame below, runtime r48+): nothing moves on by itself. After a right answer the win picture
   stays on the board until the child presses the blinking Next key, so never reset it on a timer (PATTERNS.md 9d).
   A SKIN (docs/IMAGES.md, docs/PATTERNS.md §14): when the slot has an images.tsx, draw <Skin name x y w h clip /> over
   the plain shape the tool already draws for the object (the plain shape stays the fallback); never a raster tag of your own here (no-raster-in-tool).
   */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  /* every English word the picture draws goes through tx("...") (its key is added to TR); a number in words
     is wordsIn(n, lang) */
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const kind = free ? "free" : item.kind;
  const [fi, setFi] = useState(0);
  /* a phase with a warm-up fraction (`warm`) runs its guide steps on it; question 1 then opens on its own fraction, untouched */
  /* a phase opens on "teach" for one frame before "demo": the warm-up is drawn for both (PATTERNS §18, ch 9) */
  const warm = !free && (stage === "demo" || stage === "teach") && PHASES[n - 1] && (PHASES[n - 1] as any).warm;
  const f0 = free ? FP_FREE[fi % FP_FREE.length] : warm || item.f;

  /* the picture's own state, reset when the question, the phase or Free play's fraction changes, when the stage leaves the
     warm-up (PATTERNS §9b), and when a phase (re)opens its guide steps (a phase dot or the restart) */
  const qkey = free ? "free:" + fi : n + ":" + index + (warm ? ":warm" : "");
  const stepNo = typeof step === "number" ? step : 0;
  const st = useRef<any>(null);
  const seen = useRef<any>({ key: "", stage: "", step: 0 });
  const [, bump] = useState(0);
  if (!st.current || seen.current.key !== qkey || (stage === "demo" && (seen.current.stage !== "demo" || stepNo < seen.current.step))) st.current = fpFresh(f0);
  seen.current = { key: qkey, stage, step: stepNo };
  const s = st.current;
  const put = (o: any) => { st.current = { ...st.current, ...o }; bump((x: number) => x + 1); };
  const live = useRef<any>({});
  live.current = { stage, stepOn };
  const demo = () => live.current.stage === "demo";

  /* ── layout: the picture is laid out in 900 x 520 (the room beside the open wide keypad) and centred while it is shut, clear of
     the key's corner ── */
  const W0 = 900;
  const bw = box ? box.w : W.w;
  const kx = box && box.key ? box.key.x - 12 : bw;
  /* ONE size and ONE place (LAYOUT §3, PREFLIGHT 24): laid out for the open keypad, and it stays there when the keypad is shut */
  const ox = 0;
  void bw; void kx;
  const cardW = s.mixed ? 290 : 210, cardH = 236;
  const cx0 = cardW + 28, CTR_W = 420, rx0 = 210 + 28 + CTR_W + 24;
  const L = 700;   /* leaves room at the strip's end for its label at 40 in Gujarati (to x 900) */
  const v = (s.w * s.d + s.n) / s.d;
  const nb = Math.max(1, Math.ceil(v - 1e-9));
  const rowsN = nb + (s.cmp ? 1 : 0);   /* a correction's comparison strip (the child's top-only fraction) goes under the strips */
  const barH = rowsN === 1 ? 90 : rowsN === 2 ? 64 : 48, gap = rowsN === 2 ? 18 : 12;
  const by0 = 248 + Math.round((168 - (rowsN * barH + (rowsN - 1) * gap)) / 2);
  const barY = (b: number) => by0 + b * (barH + gap);
  /* a word key (÷ HCF, Unmix) is wider in Hindi and Gujarati, whose labels run longer (the box grows, never the type shrinks) */
  const KY = 424, KH = 80, TW = 78, TG = 4, XW = 128, XG = 14, XWW = lang === "en" ? 128 : 164;
  const quiet = mix(C.ink, C.panel, 0.5);

  /* ── the acts, each performed on screen (api.act), the state changed only when it resolves true ── */
  const playing = useRef(false);
  const run = (o: any, done: () => void) => {
    if (playing.current) return;
    playing.current = true;
    api.act(o).then((ok: boolean) => { playing.current = false; if (ok) done(); else put({ rev: null, revKind: "" }); });
  };
  const stripPts = (b0: number, b1: number) => {
    const pts: any[] = [];
    for (let b = b0; b < b1; b++) for (let j = 0; j < 4; j++) pts.push({ x: ox + (L * (j + 0.5)) / 4, y: barY(b) + barH / 2 });
    return pts;
  };
  /* a Times key: only a product of exactly 100 grows the card (a pencil draws the new cut lines along the strips); any other
     product is kept beside the counter, amber */
  const tapTimes = (K: number) => {
    const S = st.current, on = "times-" + K;
    if (playing.current || S.mixed || S.d === 100 || S.br) return;
    if (S.d * K !== 100) {
      put({ tried: [...S.tried, { k: K, p: S.d * K }].slice(-2) });
      api.sfx.tick();
      if (demo()) api.did(on);
      return;
    }
    if (demo() && live.current.stepOn !== on) { api.did(on); return; }
    const pts = stripPts(0, nb);
    run({ tool: "pencil", moves: "draw", at: pts, onPoint: (i: number) => put({ rev: (i + 1) / pts.length, revKind: "grow", nd: 100 }) }, () => {
      const T = st.current;
      put({ n: T.n * K, d: 100, k: K, dPrev: T.d, tried: [], rev: null, revKind: "" });
      api.sfx.settle();
      if (demo()) api.did(on);
    });
  };
  /* ÷ HCF: both terms divided by their HCF; an eraser rubs out the cut lines that go */
  const tapHcf = () => {
    const S = st.current, g = fpGcd(S.n, S.d);
    if (playing.current || S.mixed || g < 2 || S.d === 100 || S.br) return;
    if (demo() && live.current.stepOn !== "hcf") { api.did("hcf"); return; }
    const pts = stripPts(0, nb);
    run({ tool: "eraser", moves: "rub", at: pts, onPoint: (i: number) => put({ rev: (i + 1) / pts.length, revKind: "erase", nd: S.d / g }) }, () => {
      const T = st.current;
      put({ n: T.n / g, d: T.d / g, g, ownHcf: true, tried: [], rev: null, revKind: "" });
      api.sfx.settle();
      if (demo()) api.did("hcf");
    });
  };
  /* Unmix: the whole strips are cut into the same parts (a pencil draws them), so the whole joins the numerator */
  const tapUnmix = () => {
    const S = st.current;
    if (playing.current || !S.mixed) return;
    if (demo() && live.current.stepOn !== "unmix") { api.did("unmix"); return; }
    const pts = stripPts(0, S.w);
    run({ tool: "pencil", moves: "draw", at: pts, onPoint: (i: number) => put({ rev: (i + 1) / pts.length, revKind: "unmix", nd: S.d }) }, () => {
      const T = st.current;
      put({ mixed: false, n: T.w * T.d + T.n, w: 0, un: T.w, tried: [], rev: null, revKind: "" });
      api.sfx.settle();
      if (demo()) api.did("unmix");
    });
  };
  /* the bracket line, row 1: ( n/d × 100 ) then % : token centres (the pencil writes at each) */
  const fsS = 56, fsF = 44, Y1 = 66, Y2 = 178;
  const fracW = (a: number, b: number) => Math.max(String(a).length, String(b).length) * 0.62 * fsF + 16;
  const r1w = [fpTw("(", fsS), fracW(s.n, s.d), fpTw("× 100", fsS), fpTw(")", fsS), fpTw("%", fsS)];
  const r1x: number[] = [];
  r1w.reduce((x: number, w: number) => { r1x.push(x + w / 2); return x + w + 10; }, cx0 + 12);
  const tapBracket = (on: string) => {
    const S = st.current;
    if (playing.current || on !== (S.br === 0 ? "times100" : S.br === 1 ? "percent" : "")) return;
    if (demo() && live.current.stepOn !== on) { api.did(on); return; }
    const pts = (on === "times100" ? r1x.slice(0, 4) : [r1x[4]]).map((x: number) => ({ x: ox + x, y: Y1 }));
    run({ tool: "pencil", moves: "draw", at: pts, onPoint: (i: number) => put({ rev: (i + 1) / pts.length, revKind: on }) }, () => {
      put({ br: st.current.br + 1, rev: null, revKind: "" });
      api.sfx.tick();
      if (demo()) api.did(on);
    });
  };
  const lastKey = useRef(0);
  const pressBracket = (on: string) => {   /* one key whose label follows the act: 400 ms, so one tap never also presses the next label */
    const t = Date.now();
    if (t - lastKey.current < 400) return;
    lastKey.current = t;
    tapBracket(on);
  };
  const act = (on: any) => {
    if (!on) return;
    if (String(on).indexOf("times-") === 0) tapTimes(Number(String(on).slice(6)));
    else if (on === "hcf") tapHcf();
    else if (on === "unmix") tapUnmix();
    else tapBracket(on);
  };
  /* Enter, the agent's check() and the dev solve() perform the CURRENT step's act */
  api.onEnter(stage === "demo" && stepOn ? () => act(stepOn) : null);
  HOOK.demo = stage === "demo" && stepOn ? () => act(stepOn) : null;

  /* the traceback: the denominator lit amber, the rest of the method done on the card (unmix, simplify, grow; or the brackets
     worked out), ending on the per cent in green; the child's answer stays in the slot */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    const plan = fpPlan(st.current, item.kind);
    /* "divided only the top by the HCF" (item.near): that fraction is drawn as a second strip of the same whole, its shading
       plainly shorter, while the untouched bottom is lit */
    const typedV = Number(slotPartsOf(wrong.value, 1)[0]);
    /* only the CHILD's own ÷ HCF tap (ownHcf) rules it out: the correction's own simplifying (g) must not hide it on a second miss */
    const cmp = item.near != null && typedV === item.near && !st.current.ownHcf ? { n: item.near, d: item.f[2] } : null;
    tl.run([[cmp ? 1200 : 700, () => put({ lit: "den", cmp })], ...plan.map((p: any) => [900, () => put(p)]), [300, () => put({ lit: "" })]], () => api.lock(false));
  }, [wrong]);
  /* the win: the maths finishes on the board (the card at its hundredths, the per cent in green) and stays until Next */
  useEffect(() => {
    if (free || (stage !== "win" && stage !== "idle")) return;
    const plan = fpPlan(st.current, item.kind);
    put(Object.assign({ lit: "", cmp: null }, ...plan));
    if (stage === "win") sayWin(item.qid);
  }, [stage]);
  /* the win line, one sentence (keyOnly: at a phase's last question the runtime shows the phase's closing in its place) */
  const sayWin = (q: string) => {
    switch (q) {
      case "M2.S2.T3.C10:FP1": api.say("Yes, 13/50 is 26/100, and that is 26%."); break;
      case "M2.S2.T3.C10:1": api.say("Yes, 9/50 is 18/100, so it is 18%."); break;
      case "M2.S2.T3.C10:4": api.say("Yes, 43/50 is 86/100, so it is 86%."); break;
      case "M2.S2.T3.C11:FP2": api.say("Yes, 33/60 is 11/20, which is 55/100 or 55%."); break;
      case "M2.S2.T3.C11:2": api.say("Yes, 12/30 is 2/5, which is 40/100 or 40%."); break;
      case "M2.S2.T3.C11:5": api.say("Right, 3 never goes into 100 exactly."); break;
      case "M2.S2.T3.C12:FP3": api.say("Yes, (21/35 × 100)% is 60%."); break;
      case "M2.S2.T3.C12:3": api.say("Yes, (3/6 × 100)% is 50%."); break;
      case "M2.S2.T3.C12:6": api.say("Yes, (18/40 × 100)% is 45%."); break;
      case "M2.S2.T3.C13:FP4": api.say("Yes, 1 9/20 is 145/100, which is 145%."); break;
      case "M2.S2.T3.C13:7": api.say("Yes, 2 1/2 is 250/100, so it is 250%."); break;
      case "M2.S2.T3.C13:8": api.say("Yes, 1 1/10 is 110%, more than 100%."); break;
    }
  };

  /* what the host and the agent read back (toolApi.getState) */
  api.share({ numerator: s.n, denominator: s.d, whole: s.mixed ? s.w : 0, factor: s.k || null, hcf: s.g || null, bracket: s.br, unmixed: !s.mixed, complete: stage === "idle" });

  const canAct = (stage === "demo" || stage === "ask" || free) && !tl.busy;
  const timesOn = canAct && !s.mixed && s.d !== 100 && !s.br;
  const hcfOn = canAct && !s.mixed && !s.br && s.d !== 100 && fpGcd(s.n, s.d) > 1;
  const unmixOn = canAct && s.mixed;
  const brOn = canAct && s.br < 2;
  const showCounter = kind !== "bracket" && !s.br && s.revKind !== "times100";
  const showRows = kind === "bracket" || (free && (s.br > 0 || s.revKind === "times100"));

  /* ── drawing helpers (called, never mounted) ── */
  const frac = (x: number, ybar: number, a: any, b: any, fs: number, ca: string, cb: string, sw = 5) => {
    const half = (Math.max(String(a).length, String(b).length) * 0.62 * fs + 16) / 2;
    return (
      <g>
        <text x={x} y={ybar - fs * 0.28} textAnchor="middle" fontSize={fs} fontWeight={700} fill={ca}>{a}</text>
        <line x1={x - half} y1={ybar} x2={x + half} y2={ybar} stroke={C.ink} strokeWidth={sw} strokeLinecap="round" />
        <text x={x} y={ybar + fs * 0.98} textAnchor="middle" fontSize={fs} fontWeight={700} fill={cb}>{b}</text>
      </g>
    );
  };
  const card = () => {
    const both = s.k > 0 || s.g > 0 || s.un > 0;
    const ct = both ? FP_INK.both : FP_INK.given, cd = s.lit === "den" ? FP_INK.now : ct;
    const fx = s.mixed ? 200 : cardW / 2;
    return (
      <g data-role="fraction-card">
        <rect x={0} y={0} width={cardW} height={cardH} rx={24} fill={C.paper} stroke={C.ink} strokeWidth={3} filter="url(#fShadowSoft)" />
        {s.lit === "den" && <rect x={fx - 70} y={136} width={140} height={84} rx={14} fill={tint(CONTENT.ten, 0.7)} />}
        {s.mixed && <text x={72} y={156} textAnchor="middle" fontSize={T.display + 32} fontWeight={700} fill={ct}>{s.w}</text>}
        {frac(fx, 122, s.n, s.d, T.display, ct, cd, 6)}
        {free && <Hit id="new-fraction" x={0} y={0} w={cardW} h={cardH} onPress={() => setFi((x: number) => x + 1)} label="New fraction" />}
      </g>
    );
  };
  const counter = () => {
    const done = s.d === 100;
    const ink = done ? FP_INK.answer : C.ink;
    const t = [String(done ? s.dPrev || 100 : s.d), done ? "× " + (s.k || 1) : "× ?", "= 100"];
    const ws = t.map((x) => fpTw(x, T.xl));
    const total = ws[0] + ws[1] + ws[2] + 44;
    let x = cx0 + (CTR_W - total) / 2;
    return (
      <g data-role="makes-100">
        <rect x={cx0} y={0} width={CTR_W} height={104} rx={18} fill={done ? tint(CONTENT.one, 0.86) : tint(C.panel, 0.45)} stroke={done ? FP_INK.answer : C.rule} strokeWidth={3} />
        {t.map((tt, i) => { const el = <text key={i} x={x} y={72} fontSize={T.xl} fontWeight={700} fill={i === 1 && !done ? FP_INK.now : ink}>{tt}</text>; x += ws[i] + 22; return el; })}
      </g>
    );
  };
  const chips = () => {
    const op = s.k ? [tx("Both terms"), " × " + s.k] : s.g ? [tx("Both terms"), " ÷ " + s.g] : s.un ? [tx("Improper fraction"), ""] : null;
    let x = cx0;
    return (
      <g data-role="chips">
        {op && (
          <g>
            <rect x={cx0} y={110} width={Math.min(CTR_W, fpTw(op[0] + op[1], T.prompt) + 32)} height={60} rx={14} fill={tint(CONTENT.pointer, 0.85)} stroke={FP_INK.both} strokeWidth={2.5} />
            <text x={cx0 + 16} y={154} fontSize={T.prompt} fontWeight={700} fill={FP_INK.both}>{op[0]}{op[1]}</text>
          </g>
        )}
        {s.tried.map((t: any, i: number) => {
          const label = "×" + t.k + "=" + t.p, w = fpTw(label, T.prompt) + 24;   /* at 40 for the last bench; two fit the counter's width */
          const el = (
            <g key={i}>
              <rect x={x} y={178} width={w} height={58} rx={12} fill={tint(CONTENT.ten, 0.8)} stroke={FP_INK.now} strokeWidth={2.5} />
              <text x={x + 12} y={221} fontSize={T.prompt} fontWeight={700} fill={C.ink}>{label}</text>
            </g>
          );
          x += w + 12;
          return el;
        })}
      </g>
    );
  };
  const result = () => {
    const show = kind !== "bracket" && (s.tr >= 2 || (free && s.d === 100 && !s.br));
    if (!show) return null;
    const txt = kind === "third" ? tx("No") : (free ? s.n : item.answer[0]) + "%";
    const fs = String(txt).length > 3 ? 64 : T.display;
    return (
      <g data-role="per-cent-card" pointerEvents="none">
        <rect x={rx0} y={0} width={W0 - rx0} height={cardH} rx={24} fill={tint(CONTENT.one, 0.86)} stroke={FP_INK.answer} strokeWidth={4} />
        <text x={rx0 + (W0 - rx0) / 2} y={cardH / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill={FP_INK.answer}>{txt}</text>
      </g>
    );
  };
  const rows = () => {
    const R = s.rev, K = s.revKind;
    const seen1 = (i: number) => s.br >= 1 || (K === "times100" && R !== null && R >= (i + 1) / 4 - 1e-6);
    const seenPct = s.br >= 2 || (K === "percent" && R !== null && R >= 1 - 1e-6);
    const r2 = s.tr >= 1 || (free && s.br === 2), r2end = s.tr >= 2 || (free && s.br === 2);
    const top = s.n * 100, pc = (s.n * 100) / s.d;
    const sym = (x: number, y: number, t: string, fill: string) => <text x={x} y={y + 20} textAnchor="middle" fontSize={fsS} fontWeight={700} fill={fill}>{t}</text>;
    const w2 = [fpTw("=", fsS), fpTw("(", fsS), fracW(top, s.d), fpTw(")", fsS), fpTw("%", fsS), fpTw("=", fsS), fpTw(pc + "%", fsS)];
    const x2: number[] = [];
    w2.reduce((x: number, w: number) => { x2.push(x + w / 2); return x + w + 10; }, cx0 + 12);
    return (
      <g data-role="brackets">
        {/* the writing rules end at stage x 900, well clear of the open keypad (x 980) */}
        <line x1={cx0} y1={Y1 + 52} x2={W0 - 64} y2={Y1 + 52} stroke={C.rule} strokeWidth={2} />
        <line x1={cx0} y1={Y2 + 52} x2={W0 - 64} y2={Y2 + 52} stroke={C.rule} strokeWidth={2} />
        {seen1(0) && sym(r1x[0], Y1, "(", C.ink)}
        {seen1(1) && frac(r1x[1], Y1, s.n, s.d, fsF, FP_INK.given, s.lit === "den" ? FP_INK.now : FP_INK.given, 4)}
        {seen1(2) && sym(r1x[2], Y1, "× 100", FP_INK.both)}
        {seen1(3) && sym(r1x[3], Y1, ")", C.ink)}
        {seenPct && sym(r1x[4], Y1, "%", C.ink)}
        {r2 && (
          <g pointerEvents="none">
            {sym(x2[0], Y2, "=", C.ink)}
            {sym(x2[1], Y2, "(", C.ink)}
            {frac(x2[2], Y2, top, s.d, fsF, r2end ? C.ink : FP_INK.now, r2end ? C.ink : FP_INK.now, 4)}
            {sym(x2[3], Y2, ")", C.ink)}
            {sym(x2[4], Y2, "%", C.ink)}
            {r2end && sym(x2[5], Y2, "=", C.ink)}
            {r2end && sym(x2[6], Y2, pc + "%", FP_INK.answer)}
          </g>
        )}
      </g>
    );
  };
  const strips = () => Array.from({ length: nb }).map((_, b) => {
    const y = barY(b), shadeW = Math.max(0, Math.min(1, v - b)) * L;
    const whole = s.mixed && b < s.w;
    const R = s.rev, K = s.revKind;
    const cutXs = (d: number, sw: number) => Array.from({ length: Math.max(0, d - 1) }, (_, i) => ({ x: (L * (i + 1)) / d, sw }));
    const thin = (d: number) => (d > 50 ? 1.6 : d > 20 ? 2.2 : 3);
    const at = (x: number, of: number) => (b + x / L) / of;
    let lines: any[] = [];
    if (whole) lines = K === "unmix" && R !== null ? cutXs(s.d, thin(s.d)).filter((c) => at(c.x, s.w) <= R + 1e-6) : [];
    else if (K === "grow" && R !== null) lines = cutXs(s.d, thin(s.d)).concat(cutXs(s.nd, thin(s.nd)).filter((c) => at(c.x, nb) <= R + 1e-6));
    else if (K === "erase" && R !== null) lines = cutXs(s.nd, thin(s.nd)).concat(cutXs(s.d, thin(s.d)).filter((c) => at(c.x, nb) > R + 1e-6));
    else lines = cutXs(s.d, thin(s.d));
    return (
      <g key={"s" + b} data-role="strip">
        <defs><clipPath id={"fpStrip" + b}><rect x={0} y={y} width={L} height={barH} rx={10} /></clipPath></defs>
        <rect x={0} y={y} width={L} height={barH} rx={10} fill={C.paper} />
        {/* the whole strip is a ribbon: ONE skin over the plain strip (its fallback), clipped to it; cuts and tints in code over it */}
        <Skin name="ribbon" x={0} y={y} w={L} h={barH} clip={"url(#fpStrip" + b + ")"} />
        <g clipPath={"url(#fpStrip" + b + ")"}>
          {shadeW > 0 && <rect x={0} y={y} width={shadeW} height={barH} fill="url(#gHundred)" fillOpacity={0.8} />}
          {lines.map((c, i) => <line key={i} x1={c.x} y1={y} x2={c.x} y2={y + barH} stroke={c.x < shadeW - 0.5 ? "#FFFFFF" : C.ink} strokeOpacity={c.x < shadeW - 0.5 ? 0.85 : 1} strokeWidth={c.sw} />)}
        </g>
        <rect x={0} y={y} width={L} height={barH} rx={10} fill="none" stroke={C.ink} strokeWidth={3} />
        <text x={L + 16} y={y + barH / 2 + 13} fontSize={nb > 2 ? T.label : 36} fontWeight={700} fill={C.ink}>{(b + 1) * 100}%</text>
      </g>
    );
  });
  /* the key row: the seven Times keys, then ÷ HCF / Unmix; the bracket phase has ONE key whose label follows the act */
  const keyText = (t: string, on: boolean) => <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={on ? toneInk("key", C.ink) : quiet}>{t}</text>;
  const keySpots: any = {};
  const keyRow = () => {
    if (kind === "bracket") {
      if (s.br >= 2) return null;
      const id = s.br === 0 ? "times100" : "percent", x = (W0 - 240) / 2;
      keySpots[id] = { x: x + 120, y: KY + KH / 2, w: 240 };
      return (
        <Key key="act0" id={id} label={s.br === 0 ? "Times 100" : "Per cent sign"} x={x} y={KY} w={240} h={KH} C={C} tone="key" disabled={!brOn} onClick={() => pressBracket(id)}>
          {keyText(s.br === 0 ? "× 100" : "%", brOn)}
        </Key>
      );
    }
    const extra: any[] = [];
    if (kind === "free" || n === 2) extra.push({ id: "hcf", label: "÷ HCF", aria: "Divide by HCF", on: hcfOn, fn: tapHcf, w: XWW });
    if (!free && n === 4) extra.push({ id: "unmix", label: "Unmix", aria: "Unmix", on: unmixOn, fn: tapUnmix, w: XWW });
    if (free) extra.push({ id: s.br === 0 ? "times100" : "percent", label: s.br === 0 ? "× 100" : "%", aria: s.br === 0 ? "Times 100" : "Per cent sign",
      on: brOn, fn: () => pressBracket(s.br === 0 ? "times100" : "percent"), w: XW });
    const rowW = 7 * TW + 6 * TG + extra.reduce((a: number, e: any) => a + e.w + XG, 0);
    let x = Math.round((W0 - rowW) / 2);
    const els: any[] = [];
    FP_KEYS.forEach((K) => {
      const id = "times-" + K;
      keySpots[id] = { x: x + TW / 2, y: KY + KH / 2, w: TW };
      els.push(
        <Key key={"t" + K} id={id} label={"Times " + K} x={x} y={KY} w={TW} h={KH} C={C} tone="key" disabled={!timesOn} onClick={() => tapTimes(K)}>
          {keyText("× " + K, timesOn)}
        </Key>
      );
      x += TW + TG;
    });
    extra.forEach((e, j) => {
      x += XG - TG + (j ? TG : 0);
      keySpots[e.id] = { x: x + e.w / 2, y: KY + KH / 2, w: e.w };
      if (!(free && j === extra.length - 1 && s.br >= 2)) els.push(
        <Key key={"x" + j} id={e.id} label={e.aria} x={x} y={KY} w={e.w} h={KH} C={C} tone="key" disabled={!e.on} onClick={e.fn}>
          {keyText(e.label.indexOf("×") === 0 || e.label === "%" ? e.label : tx(e.label), e.on)}
        </Key>
      );
      x += e.w;
    });
    return els;
  };

  const keys = keyRow();
  const inv = stage === "demo" && stepOn && keySpots[stepOn];
  return (
    <g>
      {/* keyOnly: no runs zone; nothing under box.key; the question is in the bubble only */}
      <g transform={`translate(${ox},0)`}>
        {card()}
        {showCounter && counter()}
        {showCounter && chips()}
        {result()}
        {showRows && rows()}
        {strips()}
        {s.cmp && (() => {
          const y = barY(nb), c = s.cmp, sw = L * (c.n / c.d);
          return (
            <g data-role="top-only-strip" pointerEvents="none">
              <defs><clipPath id="fpStripCmp"><rect x={0} y={y} width={L} height={barH} rx={10} /></clipPath></defs>
              <rect x={0} y={y} width={L} height={barH} rx={10} fill={C.paper} />
              <Skin name="ribbon" x={0} y={y} w={L} h={barH} clip="url(#fpStripCmp)" />
              <g clipPath="url(#fpStripCmp)">
                {/* a deeper amber than the content colour, so it stands apart from the golden ribbon under it */}
                <rect x={0} y={y} width={sw} height={barH} fill={shade(CONTENT.ten, 0.4)} fillOpacity={0.85} />
                {Array.from({ length: c.d - 1 }, (_, i) => (L * (i + 1)) / c.d).map((x, i) => (
                  <line key={i} x1={x} y1={y} x2={x} y2={y + barH} stroke={x < sw - 0.5 ? "#FFFFFF" : C.ink} strokeOpacity={x < sw - 0.5 ? 0.85 : 1} strokeWidth={c.d > 50 ? 1.6 : 2.2} />
                ))}
              </g>
              <rect x={0} y={y} width={L} height={barH} rx={10} fill="none" stroke={C.ink} strokeWidth={3} />
              {/* Gujarati letters stand smaller than Latin or Devanagari at one size: 40 there reads as 32 does in en and hi */}
              <text x={L + 16} y={y + barH / 2 + (lang === "gu" ? 14 : 12)} fontSize={lang === "gu" ? T.prompt : T.label} fontWeight={700} fill={C.ink}>{tx("Top only")}</text>
            </g>
          );
        })()}
        {keys}
        {/* r57: the ring hugs the key as a rounded rect, so it never cuts through a long label */}
        {/* inset by the ring's own 6-unit stand-off, so at rest it sits on the key's edge and never reaches a close neighbour */}
        {inv && <Invite x={inv.x} y={inv.y} w={inv.w - 12} h={KH - 12} rx={RAD.key - 6} C={C} />}
      </g>
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: the question's fraction and the per cent
   (result.last.item is the INDEX; `it` is the item, r24) */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  const item = it || (last && PHASES[n - 1] && PHASES[n - 1].items[last.item]) || null;
  if (!last || !item) return null;
  const [wh, nu, de] = item.f;
  const cy = h / 2, fx = wh ? 62 : 48, blue = shade(CONTENT.hundred, 0.25), green = shade(CONTENT.one, 0.25);
  const fr = (x: number, a: any, b: any, fill: string) => (
    <g>
      <text x={x} y={cy - 6} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={fill}>{a}</text>
      <line x1={x - 24} y1={cy} x2={x + 24} y2={cy} stroke={C.ink} strokeWidth={2.5} strokeLinecap="round" />
      <text x={x} y={cy + 26} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={fill}>{b}</text>
    </g>
  );
  /* 1/3 (the Yes / No question): no fraction over 100 equals it, drawn without a word: 1/3 ≠ ?/100 */
  if (item.choices) return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {fr(48, nu, de, blue)}
      <text x={w / 2} y={cy + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>≠</text>
      {fr(w - 52, "?", 100, green)}
    </g>
  );
  const right = slotPartsOf(last.value, 1)[0] + "%", rw = fpTw(right, T.label);
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {wh > 0 && <text x={20} y={cy + 12} textAnchor="middle" fontSize={T.label + 4} fontWeight={700} fill={blue}>{wh}</text>}
      {fr(fx, nu, de, blue)}
      <text x={w - 16 - rw - 14} y={cy + 11} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>=</text>
      <text x={w - 16} y={cy + 12} textAnchor="end" fontSize={T.label} fontWeight={700} fill={green}>{right}</text>
    </g>
  );
}

function FractionToPerCent(props: any) {
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

export default FractionToPerCent;
