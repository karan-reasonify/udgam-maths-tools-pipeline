/* ═══ M2.S3.T6.C28.2D1 · place_value_chart · tool-specific part ═══════════════════════════════
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

const TOOL_ID = "place_value_chart";
const MEDIA_ID = "M2.S3.T6.C28.2D1";
const TOOL_NAME = "Place Value Board";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["A place value chart, with room past the point."];
/* the whole-tool line: printed on the summary page */
const FINISH_LINE = "Every digit has a place, and a worth that goes with it.";
/* printed when the child opens Free play (the plan's free-play line); its LAST piece stays on the bubble */
const FREE_LINE = "Free play: set a decimal up to 99.999 and tap a digit for its worth.";

/* THE START PAGE (runtime r28; docs/LAYOUT.md §1c, docs/PATTERNS.md §14): the first thing a child sees in user mode.
   START_HOOK is ONE printed question to wonder at (it needs a TR entry, and never gives an answer away); StartArt is
   the object the lesson is about, drawn in a 1200 x 340 box ({ box, C, lang, tx }; plain shapes in the chrome and content
   colours, a <Skin> over them when the image agent made one). This stub is a dashed outline: draw the real object. */
const START_HOOK = "How far can a place value chart go past the point?";
/* the chart the class already knows: Tens, Ones and the point, with 47 on it; what comes past the point is the hook's
   question and phase 1's discovery, so none of it is drawn here */
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  const W0 = PV_PT + 28, H0 = PV_CELL.y + pvCellH({}) + 6, s = Math.min(box.w / (W0 + 20), box.h / (H0 + 10));   /* the frame's real height, so it stays inside its box */
  return (
    <g transform={`translate(${(box.w - W0 * s) / 2},${(box.h - H0 * s) / 2}) scale(${s})`}>
      {pvFrame(C, tx, { drawn: 0 })}
      {pvRow("47")}
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, byte for byte, and the runtime looks each printed or drawn line
   up in it (Work draws its own words through tx("...")). Fill it AFTER the English is final and reviewed:
   `check` (tr-coverage) lists every printed line still missing. Nothing is baked: the lesson is silent.
   Empty = the tool runs in English only. */
/* terms (NCERT Class 5): place value स्थानीय मान / સ્થાનકિંમત, worth मान / કિંમત, place स्थान / સ્થાન, column स्तंभ / સ્તંભ,
   point बिंदु (दशमलव बिंदु) / ચિહ્ન (દશાંશ ચિહ્ન), decimal दशमलव / દશાંશ સંખ્યા, fraction भिन्न / અપૂર્ણાંક, digit अंक / અંક,
   places दहाई इकाई दशांश शतांश सहस्रांश / દશક એકમ દશાંશ શતાંશ સહસ્રાંશ; the child is तुम / તમે */
const TR: any = {
  hi: {
    "Place Value Board": "स्थानीय मान बोर्ड",
    "A place value chart, with room past the point.": "दशमलव बिंदु के आगे जगह वाली स्थानीय मान सारणी।",
    "Free play: set a decimal up to 99.999 and tap a digit for its worth.": "खुला खेल: 99.999 तक दशमलव बनाओ, अंक दबाकर मान देखो।",
    "How far can a place value chart go past the point?": "स्थानीय मान सारणी दशमलव बिंदु के आगे कितनी दूर जा सकती है?",
    "The chart goes past the point": "सारणी दशमलव बिंदु के आगे बढ़ती है",
    "The place value of a digit": "किसी अंक का स्थानीय मान",
    "One digit in two places": "एक अंक, दो स्थान",
    "Changing one place": "एक स्थान बदलना",
    "The ones stay where they were. What comes after the point?": "इकाई वहीं रहती है। दशमलव बिंदु के बाद क्या आता है?",
    "First say which place. Then say how much it is worth.": "पहले स्थान बताओ। फिर बताओ कि उसका मान कितना है।",
    "The same digit, two places. What is each one worth?": "एक ही अंक, दो स्थान। हर एक का मान क्या है?",
    "Add three tenths. Which tile changes, and which stay still?": "तीन दशांश जोड़ो। कौन-सी टाइल बदलती है, कौन-सी नहीं?",
    "The ones stay where they were, so tap Draw to add a column after the point.": "इकाई अपनी जगह रहती है, बिंदु के बाद स्तंभ जोड़ने के लिए बनाओ बटन दबाओ।",
    "Tap the Draw key under the chart.": "सारणी के नीचे बनाओ बटन दबाओ।",
    "That new column is Tenths, so tap Draw for the next one.": "यह नया स्तंभ दशांश है, अगले के लिए बनाओ दबाओ।",
    "Each tap on Draw adds one column.": "बनाओ को हर बार दबाने पर एक स्तंभ जुड़ता है।",
    "Tap Draw once more for the last column of the chart.": "सारणी के आख़िरी स्तंभ के लिए बनाओ एक बार और दबाओ।",
    "One more tap on Draw finishes the chart.": "बनाओ एक बार और दबाने से सारणी पूरी होगी।",
    "Place the first digit after the point.": "बिंदु के बाद वाला पहला अंक रखो।",
    "Start at the point and move right, one column for each digit.": "बिंदु से शुरू करके दाईं ओर बढ़ो, हर अंक के लिए एक स्तंभ।",
    "After the point come tenths, then hundredths, then thousandths.": "बिंदु के बाद पहले दशांश, फिर शतांश, फिर सहस्रांश आते हैं।",
    "You learned: after the point come tenths, hundredths, thousandths": "तुमने सीखा: बिंदु के बाद दशांश, शतांश, सहस्रांश आते हैं",
    "Put 63.508 on the place value chart.": "63.508 को स्थानीय मान सारणी में रखो।",
    "Put 63.508 on the chart": "63.508 सारणी में रखो",
    "Every digit needs a column of its own, even a zero.": "हर अंक को अपना स्तंभ चाहिए, शून्य को भी।",
    "Yes, the 0 keeps its own column.": "हाँ, 0 का भी अपना स्तंभ है।",
    "In 7.24 on the chart, which digit is in the tenths place?": "सारणी में 7.24 के दशांश स्थान पर कौन-सा अंक है?",
    "The Tenths column is the first one after the point.": "दशांश स्तंभ बिंदु के बाद पहला स्तंभ है।",
    "Look at the tile under the Tenths name.": "दशांश नाम के नीचे वाली टाइल देखो।",
    "The tile just after the point counts the tenths.": "बिंदु के ठीक बाद वाली टाइल दशांश गिनती है।",
    "Digit in the tenths place?": "दशांश स्थान का अंक?",
    "Yes, 2 is the tenths digit of 7.24.": "हाँ, 7.24 में दशांश का अंक 2 है।",
    "Put 15.093 on the chart, then tap the name of the column that holds the 9.": "15.093 को सारणी में रखो, फिर उस स्तंभ का नाम दबाओ जिसमें 9 है।",
    "Which place is the 9 in?": "9 किस स्थान पर है?",
    "Count the places after the point, one by one.": "बिंदु के बाद के स्थान एक-एक करके गिनो।",
    "Yes, the 9 sits in the hundredths place.": "हाँ, 9 शतांश स्थान पर है।",
    "First the place: in 47.216, tap the column the 1 is in.": "पहले स्थान: 47.216 में उस स्तंभ को दबाओ जिसमें 1 है।",
    "The 1 is the tile with the ring.": "1 वह टाइल है जिसके चारों ओर घेरा है।",
    "Then the place value: tap the Worth card to see what that 1 is worth.": "फिर स्थानीय मान: मान कार्ड दबाओ और देखो उस 1 का मान क्या है।",
    "The Worth card is the wide card under the chart.": "मान कार्ड सारणी के नीचे वाला चौड़ा कार्ड है।",
    "Say the digit with that place's name.": "अंक के साथ उस स्थान का नाम बोलो।",
    "A digit in the tenths place is worth that many tenths.": "दशांश स्थान का अंक उतने ही दशांश के बराबर होता है।",
    "The place is where a digit sits; the place value is what it is worth.": "स्थान बताता है अंक कहाँ है; स्थानीय मान बताता है उसका मान कितना है।",
    "You learned: the place is where a digit sits, its value is its worth": "तुमने सीखा: स्थान अंक की जगह है, स्थानीय मान उसका मान है",
    "In 4.286, what is the 8 worth, as a decimal?": "4.286 में 8 का मान दशमलव में क्या है?",
    "Worth of the 8, as a decimal?": "8 का मान, दशमलव में?",
    "The 8 alone is only the digit, so what is it worth in its place?": "अकेला 8 सिर्फ़ अंक है, अपने स्थान पर उसका मान क्या है?",
    "Yes, the 8 is worth 8 hundredths.": "हाँ, 8 का मान 8 शतांश है।",
    "What is the place value of 6 in 0.461, written as a fraction?": "0.461 में 6 का स्थानीय मान भिन्न में क्या है?",
    "Worth of the 6, as a fraction?": "6 का मान, भिन्न में?",
    "Read the column name above the 6, then ask how many of those make one.": "6 के ऊपर स्तंभ का नाम पढ़ो, फिर सोचो कितने मिलकर एक बनाते हैं।",
    "Right, that 6 counts 6 parts of 100.": "सही, यह 6 का अर्थ है 100 में से 6 भाग।",
    "And what is the place value of the 3 in 12.803, as a decimal?": "और 12.803 में 3 का स्थानीय मान दशमलव में क्या है?",
    "Worth of the 3, as a decimal?": "3 का मान, दशमलव में?",
    "Count the places from the point to the 3.": "बिंदु से 3 तक के स्थान गिनो।",
    "Yes, the 3 is worth 3 thousandths.": "हाँ, 3 का मान 3 सहस्रांश है।",
    "The same digit sits in two places: in 58.85, tap the first 8 to see its worth.": "एक ही अंक दो स्थानों पर है: 58.85 में पहला 8 दबाकर उसका मान देखो।",
    "Start with the 8 on the left.": "बाईं ओर वाले 8 से शुरू करो।",
    "Now tap the other 8 and read what it is worth.": "अब दूसरा 8 दबाओ और उसका मान पढ़ो।",
    "The second 8 stands just after the point.": "दूसरा 8 बिंदु के ठीक बाद है।",
    "Tap Line up to set one worth above the other.": "एक मान को दूसरे के ऊपर रखने के लिए सीध में रखो दबाओ।",
    "Line up is the key beside the Two places panel.": "सीध में रखो बटन दो स्थान वाले खाने के पास है।",
    "Tap Subtract to take the smaller worth from the greater.": "बड़े मान में से छोटा मान घटाने के लिए घटाओ दबाओ।",
    "Subtract stands where Line up was.": "घटाओ बटन वहीं है जहाँ सीध में रखो था।",
    "Find the worth of the digit on the left first, then the one on the right.": "पहले बाएँ अंक का मान निकालो, फिर दाएँ वाले का।",
    "Give both worths the same places after the point, then subtract.": "दोनों मानों में बिंदु के बाद बराबर स्थान बनाओ, फिर घटाओ।",
    "The same digit is worth different amounts in different places.": "एक ही अंक का मान अलग-अलग स्थानों पर अलग होता है।",
    "You learned: one digit has different worths; subtract to compare": "तुमने सीखा: एक अंक के मान अलग-अलग; तुलना के लिए घटाओ",
    "In 5.45, what is the difference between the place values of the two 5s?": "5.45 में दोनों 5 के स्थानीय मानों का अंतर क्या है?",
    "Difference of the two 5s?": "दोनों 5 का अंतर?",
    "The digits match, but their worths do not, so which is worth more?": "अंक एक जैसे हैं पर मान नहीं, तो किसका मान ज़्यादा है?",
    "Yes, 5 take away 0.05 is 4.95.": "हाँ, 5 में से 0.05 घटाने पर 4.95 बचता है।",
    "Now find the difference between the place values of the two 2s in 2.62.": "अब 2.62 में दोनों 2 के स्थानीय मानों का अंतर निकालो।",
    "Difference of the two 2s?": "दोनों 2 का अंतर?",
    "Think of the 2 as 2.00, so the points line up.": "2 को 2.00 सोचो, ताकि बिंदु एक सीध में आएँ।",
    "Right, 2.00 minus 0.02 leaves 1.98.": "सही, 2.00 में से 0.02 घटाने पर 1.98 बचता है।",
    "The digit 4 appears three times in 44.4, so type what each 4 is worth.": "44.4 में अंक 4 तीन बार है, हर 4 का मान लिखो।",
    "What is each 4 worth?": "हर 4 का मान क्या है?",
    "Each step to the left makes a digit worth ten times as much.": "बाईं ओर हर कदम पर अंक का मान दस गुना हो जाता है।",
    "Read the column name above each 4: it says what that 4 counts.": "हर 4 के ऊपर स्तंभ का नाम पढ़ो: वह बताता है कि 4 क्या गिनता है।",
    "The 4 in the Tens column counts tens.": "दहाई स्तंभ का 4 दहाइयाँ गिनता है।",
    "Yes, each 4 is ten times the 4 to its right, in each pair.": "हाँ, हर जोड़ी में 4 अपने दाएँ वाले 4 का दस गुना है।",
    "To add 3 tenths to 0.415, tap the up arrow in the Tenths column.": "0.415 में 3 दशांश जोड़ने के लिए दशांश स्तंभ का ऊपर वाला तीर दबाओ।",
    "Tenths is the first column after the point.": "दशांश बिंदु के बाद पहला स्तंभ है।",
    "Tap that same arrow again for 1 more tenth.": "1 और दशांश के लिए वही तीर फिर दबाओ।",
    "Use the up arrow in the Tenths column again.": "दशांश स्तंभ का ऊपर वाला तीर फिर से दबाओ।",
    "Tap it once more and see which tiles stayed still.": "उसे एक बार और दबाओ और देखो कौन-सी टाइलें नहीं बदलीं।",
    "One more tap on the Tenths up arrow.": "बस एक बार और दशांश का ऊपर वाला तीर।",
    "Nudge one column once, and watch which tile changes.": "एक स्तंभ को एक बार खिसकाओ और देखो कौन-सी टाइल बदलती है।",
    "One tap moves one tile by one, so count your taps.": "एक बार दबाने से एक टाइल एक से बदलती है, तो गिनते जाओ।",
    "Adding or taking away in one place changes only that place's digit.": "एक स्थान में जोड़ने या घटाने से सिर्फ़ उसी स्थान का अंक बदलता है।",
    "You learned: changing one place changes only that place's digit": "तुमने सीखा: एक स्थान बदलने से सिर्फ़ उसी का अंक बदलता है",
    "Use the arrows to find the number that is 4 hundredths greater than 2.351.": "तीरों से वह संख्या बनाओ जो 2.351 से 4 शतांश ज़्यादा है।",
    "4 hundredths more than 2.351?": "2.351 से 4 शतांश ज़्यादा?",
    "Hundredths is the second column after the point: nudge it up 4 times.": "शतांश बिंदु के बाद दूसरा स्तंभ है: उसे 4 बार ऊपर खिसकाओ।",
    "Yes, only the hundredths tile moved.": "हाँ, सिर्फ़ शतांश की टाइल बदली।",
    "Now find the number that is 3 tenths greater than 5.26.": "अब वह संख्या बनाओ जो 5.26 से 3 दशांश ज़्यादा है।",
    "3 tenths more than 5.26?": "5.26 से 3 दशांश ज़्यादा?",
    "Nudge only the Tenths column, up 3 times.": "सिर्फ़ दशांश स्तंभ को 3 बार ऊपर खिसकाओ।",
    "Right, the 2 tenths became 5 tenths.": "सही, 2 दशांश अब 5 दशांश हो गए।",
    "This time take away: what is 2 hundredths less than 6.145?": "इस बार घटाओ: 6.145 से 2 शतांश कम क्या है?",
    "2 hundredths less than 6.145?": "6.145 से 2 शतांश कम?",
    "Less means the down arrow: tap it 2 times in the Hundredths column.": "कम का मतलब नीचे वाला तीर: शतांश स्तंभ में उसे 2 बार दबाओ।",
    "Yes, 4 hundredths went down to 2.": "हाँ, 4 शतांश घटकर 2 रह गए।",
    /* said by Work for an act that cannot be done yet, and the first hint of an equivalent written form */
    "First move all the tiles onto the chart.": "पहले सारी टाइलें सारणी में रखो।",
    "Choose a column name first.": "पहले किसी स्तंभ का नाम चुनो।",
    "Tap an arrow before you press Enter.": "दर्ज करें दबाने से पहले कोई तीर दबाओ।",
    "This place cannot go lower.": "यह स्थान इससे कम नहीं हो सकता।",
    "This place cannot go higher.": "यह स्थान इससे ज़्यादा नहीं हो सकता।",
    "Tap a column to put this tile in.": "यह टाइल रखने के लिए कोई स्तंभ दबाओ।",
    "That is the same amount; write it with one 0 before the point and no extra zeros.": "मान वही है; बिंदु से पहले एक 0 लिखो, फ़ालतू शून्य नहीं।",
    /* drawn in the working area (tx) */
    "Tens": "दहाई", "Ones": "इकाई", "Tenths": "दशांश", "Hundredths": "शतांश", "Thousandths": "सहस्रांश",
    "tens": "दहाई", "ones": "इकाई", "tenths": "दशांश", "hundredths": "शतांश", "thousandths": "सहस्रांश",
    "ten": "दहाई", "one": "इकाई", "tenth": "दशांश", "hundredth": "शतांश", "thousandth": "सहस्रांश",
    "place": "स्थान", "Which place": "कौन-सा स्थान", "Worth": "मान", "Two places": "दो स्थान", "Added zeros": "जोड़े गए शून्य",
    "Answer": "उत्तर", "Place holder": "स्थानधारक", "Draw": "बनाओ", "Line up": "सीध में रखो", "Subtract": "घटाओ",
    /* aria labels (tx) */
    "tile": "टाइल", "the Worth card": "मान कार्ड", "the first ringed digit": "घेरे वाला पहला अंक", "the second ringed digit": "घेरे वाला दूसरा अंक",
    "put in Tens": "दहाई में रखो", "put in Ones": "इकाई में रखो", "put in Tenths": "दशांश में रखो", "put in Hundredths": "शतांश में रखो", "put in Thousandths": "सहस्रांश में रखो",
    "add 1 ten": "1 दहाई जोड़ो", "add 1 one": "1 इकाई जोड़ो", "add 1 tenth": "1 दशांश जोड़ो", "add 1 hundredth": "1 शतांश जोड़ो", "add 1 thousandth": "1 सहस्रांश जोड़ो",
    "take away 1 ten": "1 दहाई घटाओ", "take away 1 one": "1 इकाई घटाओ", "take away 1 tenth": "1 दशांश घटाओ", "take away 1 hundredth": "1 शतांश घटाओ", "take away 1 thousandth": "1 सहस्रांश घटाओ",
    "digit in Tens": "दहाई का अंक", "digit in Ones": "इकाई का अंक", "digit in Tenths": "दशांश का अंक", "digit in Hundredths": "शतांश का अंक", "digit in Thousandths": "सहस्रांश का अंक",
    "worth of the 4 in Tens": "दहाई वाले 4 का मान", "worth of the 4 in Ones": "इकाई वाले 4 का मान", "worth of the 4 in Tenths": "दशांश वाले 4 का मान",
  },
  gu: {
    "Place Value Board": "સ્થાનકિંમત બોર્ડ",
    "A place value chart, with room past the point.": "દશાંશ ચિહ્ન પછી જગ્યા વાળું સ્થાનકિંમત કોષ્ટક.",
    "Free play: set a decimal up to 99.999 and tap a digit for its worth.": "મુક્ત રમત: 99.999 સુધી દશાંશ બનાવો, અંક દબાવી કિંમત જુઓ.",
    "How far can a place value chart go past the point?": "સ્થાનકિંમત કોષ્ટક દશાંશ ચિહ્ન પછી કેટલે સુધી જઈ શકે?",
    "The chart goes past the point": "કોષ્ટક દશાંશ ચિહ્ન પછી આગળ વધે છે",
    "The place value of a digit": "અંકની સ્થાનકિંમત",
    "One digit in two places": "એક અંક, બે સ્થાન",
    "Changing one place": "એક સ્થાન બદલવું",
    "The ones stay where they were. What comes after the point?": "એકમ ત્યાં જ રહે છે. દશાંશ ચિહ્ન પછી શું આવે?",
    "First say which place. Then say how much it is worth.": "પહેલાં સ્થાન કહો. પછી કહો કે તેની કિંમત કેટલી છે.",
    "The same digit, two places. What is each one worth?": "એક જ અંક, બે સ્થાન. દરેકની કિંમત શું છે?",
    "Add three tenths. Which tile changes, and which stay still?": "ત્રણ દશાંશ ઉમેરો. કઈ ટાઇલ બદલાય છે, કઈ નહીં?",
    "The ones stay where they were, so tap Draw to add a column after the point.": "એકમ પોતાની જગ્યાએ રહે છે, ચિહ્ન પછી સ્તંભ ઉમેરવા દોરો બટન દબાવો.",
    "Tap the Draw key under the chart.": "કોષ્ટક નીચે દોરો બટન દબાવો.",
    "That new column is Tenths, so tap Draw for the next one.": "આ નવો સ્તંભ દશાંશ છે, આગળના માટે દોરો દબાવો.",
    "Each tap on Draw adds one column.": "દોરો દરેક વાર દબાવતાં એક સ્તંભ ઉમેરાય છે.",
    "Tap Draw once more for the last column of the chart.": "કોષ્ટકના છેલ્લા સ્તંભ માટે દોરો ફરી એક વાર દબાવો.",
    "One more tap on Draw finishes the chart.": "દોરો એક વાર વધુ દબાવતાં કોષ્ટક પૂરું થશે.",
    "Place the first digit after the point.": "ચિહ્ન પછીનો પહેલો અંક મૂકો.",
    "Start at the point and move right, one column for each digit.": "ચિહ્નથી શરૂ કરી જમણી તરફ જાઓ, દરેક અંક માટે એક સ્તંભ.",
    "After the point come tenths, then hundredths, then thousandths.": "ચિહ્ન પછી દશાંશ, પછી શતાંશ, પછી સહસ્રાંશ આવે છે.",
    "You learned: after the point come tenths, hundredths, thousandths": "તમે શીખ્યા: ચિહ્ન પછી દશાંશ, શતાંશ, સહસ્રાંશ આવે",
    "Put 63.508 on the place value chart.": "63.508 ને સ્થાનકિંમત કોષ્ટકમાં મૂકો.",
    "Put 63.508 on the chart": "63.508 કોષ્ટકમાં મૂકો",
    "Every digit needs a column of its own, even a zero.": "દરેક અંકને પોતાનો સ્તંભ જોઈએ, શૂન્યને પણ.",
    "Yes, the 0 keeps its own column.": "હા, 0 નો પણ પોતાનો સ્તંભ છે.",
    "In 7.24 on the chart, which digit is in the tenths place?": "કોષ્ટકમાં 7.24 ના દશાંશ સ્થાને કયો અંક છે?",
    "The Tenths column is the first one after the point.": "દશાંશ સ્તંભ ચિહ્ન પછીનો પહેલો સ્તંભ છે.",
    "Look at the tile under the Tenths name.": "દશાંશ નામ નીચેની ટાઇલ જુઓ.",
    "The tile just after the point counts the tenths.": "ચિહ્નની તરત પછીની ટાઇલ દશાંશ ગણે છે.",
    "Digit in the tenths place?": "દશાંશ સ્થાનનો અંક?",
    "Yes, 2 is the tenths digit of 7.24.": "હા, 7.24 માં દશાંશનો અંક 2 છે.",
    "Put 15.093 on the chart, then tap the name of the column that holds the 9.": "15.093 ને કોષ્ટકમાં મૂકો, પછી 9 વાળા સ્તંભનું નામ દબાવો.",
    "Which place is the 9 in?": "9 કયા સ્થાને છે?",
    "Count the places after the point, one by one.": "ચિહ્ન પછીનાં સ્થાન એક પછી એક ગણો.",
    "Yes, the 9 sits in the hundredths place.": "હા, 9 શતાંશ સ્થાને છે.",
    "First the place: in 47.216, tap the column the 1 is in.": "પહેલાં સ્થાન: 47.216 માં જે સ્તંભમાં 1 છે તે દબાવો.",
    "The 1 is the tile with the ring.": "1 એ ઘેરાવાળી ટાઇલ છે.",
    "Then the place value: tap the Worth card to see what that 1 is worth.": "પછી સ્થાનકિંમત: કિંમત કાર્ડ દબાવો અને જુઓ એ 1 ની કિંમત શું છે.",
    "The Worth card is the wide card under the chart.": "કિંમત કાર્ડ કોષ્ટક નીચેનું પહોળું કાર્ડ છે.",
    "Say the digit with that place's name.": "અંક સાથે તે સ્થાનનું નામ બોલો.",
    "A digit in the tenths place is worth that many tenths.": "દશાંશ સ્થાનનો અંક તેટલા જ દશાંશ બરાબર હોય છે.",
    "The place is where a digit sits; the place value is what it is worth.": "સ્થાન એટલે અંક ક્યાં છે; સ્થાનકિંમત એટલે તેની કિંમત.",
    "You learned: the place is where a digit sits, its value is its worth": "તમે શીખ્યા: સ્થાન એ અંકની જગ્યા, સ્થાનકિંમત એની કિંમત",
    "In 4.286, what is the 8 worth, as a decimal?": "4.286 માં 8 ની કિંમત દશાંશ સંખ્યામાં શું છે?",
    "Worth of the 8, as a decimal?": "8 ની કિંમત, દશાંશ સંખ્યામાં?",
    "The 8 alone is only the digit, so what is it worth in its place?": "એકલો 8 ફક્ત અંક છે, તેના સ્થાને તેની કિંમત શું છે?",
    "Yes, the 8 is worth 8 hundredths.": "હા, 8 ની કિંમત 8 શતાંશ છે.",
    "What is the place value of 6 in 0.461, written as a fraction?": "0.461 માં 6 ની સ્થાનકિંમત અપૂર્ણાંકમાં શું છે?",
    "Worth of the 6, as a fraction?": "6 ની કિંમત, અપૂર્ણાંકમાં?",
    "Read the column name above the 6, then ask how many of those make one.": "6 ઉપરના સ્તંભનું નામ વાંચો, પછી વિચારો કેટલા મળીને એક બને.",
    "Right, that 6 counts 6 parts of 100.": "સાચું, આ 6 એટલે 100 માંથી 6 ભાગ.",
    "And what is the place value of the 3 in 12.803, as a decimal?": "અને 12.803 માં 3 ની સ્થાનકિંમત દશાંશ સંખ્યામાં શું છે?",
    "Worth of the 3, as a decimal?": "3 ની કિંમત, દશાંશ સંખ્યામાં?",
    "Count the places from the point to the 3.": "ચિહ્નથી 3 સુધીનાં સ્થાન ગણો.",
    "Yes, the 3 is worth 3 thousandths.": "હા, 3 ની કિંમત 3 સહસ્રાંશ છે.",
    "The same digit sits in two places: in 58.85, tap the first 8 to see its worth.": "એક જ અંક બે સ્થાને છે: 58.85 માં પહેલો 8 દબાવી તેની કિંમત જુઓ.",
    "Start with the 8 on the left.": "ડાબી બાજુના 8 થી શરૂ કરો.",
    "Now tap the other 8 and read what it is worth.": "હવે બીજો 8 દબાવો અને તેની કિંમત વાંચો.",
    "The second 8 stands just after the point.": "બીજો 8 ચિહ્નની તરત પછી છે.",
    "Tap Line up to set one worth above the other.": "એક કિંમતને બીજી ઉપર મૂકવા હરોળમાં મૂકો દબાવો.",
    "Line up is the key beside the Two places panel.": "હરોળમાં મૂકો બટન બે સ્થાન વાળા ખાના પાસે છે.",
    "Tap Subtract to take the smaller worth from the greater.": "મોટી કિંમતમાંથી નાની કિંમત બાદ કરવા બાદ કરો દબાવો.",
    "Subtract stands where Line up was.": "બાદ કરો બટન ત્યાં જ છે જ્યાં હરોળમાં મૂકો હતું.",
    "Find the worth of the digit on the left first, then the one on the right.": "પહેલાં ડાબા અંકની કિંમત શોધો, પછી જમણાની.",
    "Give both worths the same places after the point, then subtract.": "બંને કિંમતમાં ચિહ્ન પછી સરખાં સ્થાન કરો, પછી બાદ કરો.",
    "The same digit is worth different amounts in different places.": "એક જ અંકની કિંમત જુદાં જુદાં સ્થાને જુદી હોય છે.",
    "You learned: one digit has different worths; subtract to compare": "તમે શીખ્યા: એક અંકની કિંમત જુદી; સરખાવવા બાદ કરો",
    "In 5.45, what is the difference between the place values of the two 5s?": "5.45 માં બંને 5 ની સ્થાનકિંમતનો તફાવત શું છે?",
    "Difference of the two 5s?": "બંને 5 નો તફાવત?",
    "The digits match, but their worths do not, so which is worth more?": "અંક સરખા છે પણ કિંમત નહીં, તો કોની કિંમત વધુ છે?",
    "Yes, 5 take away 0.05 is 4.95.": "હા, 5 માંથી 0.05 બાદ કરતાં 4.95 રહે છે.",
    "Now find the difference between the place values of the two 2s in 2.62.": "હવે 2.62 માં બંને 2 ની સ્થાનકિંમતનો તફાવત શોધો.",
    "Difference of the two 2s?": "બંને 2 નો તફાવત?",
    "Think of the 2 as 2.00, so the points line up.": "2 ને 2.00 વિચારો, જેથી ચિહ્ન એક હરોળમાં આવે.",
    "Right, 2.00 minus 0.02 leaves 1.98.": "સાચું, 2.00 માંથી 0.02 બાદ કરતાં 1.98 રહે છે.",
    "The digit 4 appears three times in 44.4, so type what each 4 is worth.": "44.4 માં અંક 4 ત્રણ વાર છે, દરેક 4 ની કિંમત લખો.",
    "What is each 4 worth?": "દરેક 4 ની કિંમત શું છે?",
    "Each step to the left makes a digit worth ten times as much.": "ડાબી તરફ દરેક પગલે અંકની કિંમત દસ ગણી થાય છે.",
    "Read the column name above each 4: it says what that 4 counts.": "દરેક 4 ઉપર સ્તંભનું નામ વાંચો: તે કહે છે કે 4 શું ગણે છે.",
    "The 4 in the Tens column counts tens.": "દશક સ્તંભનો 4 દશક ગણે છે.",
    "Yes, each 4 is ten times the 4 to its right, in each pair.": "હા, દરેક જોડીમાં 4 તેની જમણી બાજુના 4 કરતાં દસ ગણો છે.",
    "To add 3 tenths to 0.415, tap the up arrow in the Tenths column.": "0.415 માં 3 દશાંશ ઉમેરવા દશાંશ સ્તંભનું ઉપરનું તીર દબાવો.",
    "Tenths is the first column after the point.": "દશાંશ ચિહ્ન પછીનો પહેલો સ્તંભ છે.",
    "Tap that same arrow again for 1 more tenth.": "1 વધુ દશાંશ માટે એ જ તીર ફરી દબાવો.",
    "Use the up arrow in the Tenths column again.": "દશાંશ સ્તંભનું ઉપરનું તીર ફરીથી દબાવો.",
    "Tap it once more and see which tiles stayed still.": "તેને એક વાર વધુ દબાવો અને જુઓ કઈ ટાઇલ ન બદલાઈ.",
    "One more tap on the Tenths up arrow.": "બસ એક વાર વધુ દશાંશનું ઉપરનું તીર.",
    "Nudge one column once, and watch which tile changes.": "એક સ્તંભને એક વાર ખસેડો અને જુઓ કઈ ટાઇલ બદલાય છે.",
    "One tap moves one tile by one, so count your taps.": "એક વાર દબાવવાથી એક ટાઇલ એકથી બદલાય છે, તો ગણતા જાઓ.",
    "Adding or taking away in one place changes only that place's digit.": "એક સ્થાનમાં ઉમેરવા કે બાદ કરવાથી ફક્ત એ જ સ્થાનનો અંક બદલાય છે.",
    "You learned: changing one place changes only that place's digit": "તમે શીખ્યા: એક સ્થાન બદલતાં ફક્ત એનો જ અંક બદલાય",
    "Use the arrows to find the number that is 4 hundredths greater than 2.351.": "તીરથી એ સંખ્યા બનાવો જે 2.351 કરતાં 4 શતાંશ વધુ છે.",
    "4 hundredths more than 2.351?": "2.351 કરતાં 4 શતાંશ વધુ?",
    "Hundredths is the second column after the point: nudge it up 4 times.": "શતાંશ ચિહ્ન પછીનો બીજો સ્તંભ છે: તેને 4 વાર ઉપર ખસેડો.",
    "Yes, only the hundredths tile moved.": "હા, ફક્ત શતાંશની ટાઇલ બદલાઈ.",
    "Now find the number that is 3 tenths greater than 5.26.": "હવે એ સંખ્યા બનાવો જે 5.26 કરતાં 3 દશાંશ વધુ છે.",
    "3 tenths more than 5.26?": "5.26 કરતાં 3 દશાંશ વધુ?",
    "Nudge only the Tenths column, up 3 times.": "ફક્ત દશાંશ સ્તંભને 3 વાર ઉપર ખસેડો.",
    "Right, the 2 tenths became 5 tenths.": "સાચું, 2 દશાંશ હવે 5 દશાંશ થયા.",
    "This time take away: what is 2 hundredths less than 6.145?": "આ વખતે બાદ કરો: 6.145 કરતાં 2 શતાંશ ઓછું શું છે?",
    "2 hundredths less than 6.145?": "6.145 કરતાં 2 શતાંશ ઓછું?",
    "Less means the down arrow: tap it 2 times in the Hundredths column.": "ઓછું એટલે નીચેનું તીર: શતાંશ સ્તંભમાં તેને 2 વાર દબાવો.",
    "Yes, 4 hundredths went down to 2.": "હા, 4 શતાંશ ઘટીને 2 રહ્યા.",
    /* said by Work for an act that cannot be done yet, and the first hint of an equivalent written form */
    "First move all the tiles onto the chart.": "પહેલાં બધી ટાઇલ કોષ્ટકમાં મૂકો.",
    "Choose a column name first.": "પહેલાં કોઈ સ્તંભનું નામ પસંદ કરો.",
    "Tap an arrow before you press Enter.": "દાખલ કરો દબાવતાં પહેલાં કોઈ તીર દબાવો.",
    "This place cannot go lower.": "આ સ્થાન આનાથી ઓછું ન થઈ શકે.",
    "This place cannot go higher.": "આ સ્થાન આનાથી વધુ ન થઈ શકે.",
    "Tap a column to put this tile in.": "આ ટાઇલ મૂકવા કોઈ સ્તંભ દબાવો.",
    "That is the same amount; write it with one 0 before the point and no extra zeros.": "કિંમત એ જ છે; ચિહ્ન પહેલાં એક 0 લખો, વધારાનાં શૂન્ય નહીં.",
    /* drawn in the working area (tx) */
    "Tens": "દશક", "Ones": "એકમ", "Tenths": "દશાંશ", "Hundredths": "શતાંશ", "Thousandths": "સહસ્રાંશ",
    "tens": "દશક", "ones": "એકમ", "tenths": "દશાંશ", "hundredths": "શતાંશ", "thousandths": "સહસ્રાંશ",
    "ten": "દશક", "one": "એકમ", "tenth": "દશાંશ", "hundredth": "શતાંશ", "thousandth": "સહસ્રાંશ",
    "place": "સ્થાન", "Which place": "કયું સ્થાન", "Worth": "કિંમત", "Two places": "બે સ્થાન", "Added zeros": "ઉમેરેલાં શૂન્ય",
    "Answer": "જવાબ", "Place holder": "સ્થાનધારક", "Draw": "દોરો", "Line up": "હરોળમાં મૂકો", "Subtract": "બાદ કરો",
    /* aria labels (tx) */
    "tile": "ટાઇલ", "the Worth card": "કિંમત કાર્ડ", "the first ringed digit": "ઘેરાવાળો પહેલો અંક", "the second ringed digit": "ઘેરાવાળો બીજો અંક",
    "put in Tens": "દશકમાં મૂકો", "put in Ones": "એકમમાં મૂકો", "put in Tenths": "દશાંશમાં મૂકો", "put in Hundredths": "શતાંશમાં મૂકો", "put in Thousandths": "સહસ્રાંશમાં મૂકો",
    "add 1 ten": "1 દશક ઉમેરો", "add 1 one": "1 એકમ ઉમેરો", "add 1 tenth": "1 દશાંશ ઉમેરો", "add 1 hundredth": "1 શતાંશ ઉમેરો", "add 1 thousandth": "1 સહસ્રાંશ ઉમેરો",
    "take away 1 ten": "1 દશક બાદ કરો", "take away 1 one": "1 એકમ બાદ કરો", "take away 1 tenth": "1 દશાંશ બાદ કરો", "take away 1 hundredth": "1 શતાંશ બાદ કરો", "take away 1 thousandth": "1 સહસ્રાંશ બાદ કરો",
    "digit in Tens": "દશકનો અંક", "digit in Ones": "એકમનો અંક", "digit in Tenths": "દશાંશનો અંક", "digit in Hundredths": "શતાંશનો અંક", "digit in Thousandths": "સહસ્રાંશનો અંક",
    "worth of the 4 in Tens": "દશકના 4 ની કિંમત", "worth of the 4 in Ones": "એકમના 4 ની કિંમત", "worth of the 4 in Tenths": "દશાંશના 4 ની કિંમત",
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
    concept: "The chart goes past the point",
    conceptId: "M2.S3.T6.C25", objectiveIds: ["O9"],
    says: ["The ones stay where they were. What comes after the point?"],
    /* the chart starts as the one the class knows (Tens, Ones, the point); each Draw tap rules one more column past the point */
    steps: [
      { say: "The ones stay where they were, so tap Draw to add a column after the point.", on: "draw", hint: "Tap the Draw key under the chart." },
      { say: "That new column is Tenths, so tap Draw for the next one.", on: "draw", hint: "Each tap on Draw adds one column." },
      { say: "Tap Draw once more for the last column of the chart.", on: "draw", hint: "One more tap on Draw finishes the chart." },
    ],
    /* tries, as the plan writes it: First rung: place the whole number digits. Second rung: place the first digit after the point. Third rung: the same task with one digit after the point, before longer decimals return. */
    ladder: ["Place the first digit after the point.", "Start at the point and move right, one column for each digit."],
    closing: "After the point come tenths, then hundredths, then thousandths.",
    learned: "You learned: after the point come tenths, hundredths, thousandths",
    traceback: "the column that went wrong lights amber, and an Answer row under the chart sets each digit in its own column, a zero as a grey place holder",
    items: [
      /* learn PV1: answer in the plan = 6 tens, 3 ones, 5 tenths, 0 hundredths and 8 thousandths */
      { qid: "M2.S3.T6.C25:PV1", kind: "build", num: "63.508", pad: "enter", winMs: 2600,
        named: "6 tens, 3 ones, 5 tenths, 0 hundredths and 8 thousandths", near: "63.58",
        say: "Put 63.508 on the place value chart.", ask: "Put 63.508 on the chart",
        answer: "63.508", miss: "Every digit needs a column of its own, even a zero.", win: "Yes, the 0 keeps its own column." },
      /* practice 1: answer in the plan = 2 */
      { qid: "M2.S3.T6.C25:1", kind: "digit", num: "7.24", place: "tenths", near: "7",
        say: "In 7.24 on the chart, which digit is in the tenths place?", ask: "Digit in the tenths place?",
        answer: "2", miss: "The Tenths column is the first one after the point.",
        ladder: ["Look at the tile under the Tenths name.", "The tile just after the point counts the tenths."], win: "Yes, 2 is the tenths digit of 7.24." },
      /* practice 3 (moved here from phase 2, which has four: it names a place past the point, and its 0 is this phase's
         place holder): answer in the plan = The hundredths place */
      { qid: "M2.S3.T6.C26:3", kind: "head", num: "15.093", at: "hundredths", pad: "enter", near: "tenths",
        say: "Put 15.093 on the chart, then tap the name of the column that holds the 9.", ask: "Which place is the 9 in?",
        answer: "hundredths", miss: "Count the places after the point, one by one.", win: "Yes, the 9 sits in the hundredths place." },
    ],
  },
  {
    n: 2,
    concept: "The place value of a digit",
    conceptId: "M2.S3.T6.C26", objectiveIds: ["O9"],
    says: ["First say which place. Then say how much it is worth."],
    /* the textbook's own example, 47.216: the 1 names its place, then the Worth card shows what it is worth */
    steps: [
      { say: "First the place: in 47.216, tap the column the 1 is in.", on: "head-hundredths", hint: "The 1 is the tile with the ring." },
      { say: "Then the place value: tap the Worth card to see what that 1 is worth.", on: "worth", hint: "The Worth card is the wide card under the chart." },
    ],
    /* tries, as the plan writes it: First rung: point at the digit's column head. Second rung: say the digit with that place's name. Third rung: the same task on a digit in the tenths place, before other places return. */
    ladder: ["Say the digit with that place's name.", "A digit in the tenths place is worth that many tenths."],
    closing: "The place is where a digit sits; the place value is what it is worth.",
    learned: "You learned: the place is where a digit sits, its value is its worth",
    traceback: "the column head lights, the Which place card names the place, and the Worth card writes the amount three ways, ending on the asked form",
    items: [
      /* learn PV2: answer in the plan = The hundredths place. Its place value is 8 hundredths, which is 8/100 or 0.08 */
      { qid: "M2.S3.T6.C26:PV2", kind: "worth", num: "4.286", at: "hundredths", near: "8",
        say: "In 4.286, what is the 8 worth, as a decimal?",
        ask: "Worth of the 8, as a decimal?", answer: "0.08", miss: "The 8 alone is only the digit, so what is it worth in its place?", win: "Yes, the 8 is worth 8 hundredths." },
      /* practice 2: answer in the plan = 6 hundredths, which is 6/100 or 0.06 */
      { qid: "M2.S3.T6.C26:2", kind: "frac", num: "0.461", at: "hundredths", parts: SLOT_FRACTION, near: "6|10",
        say: "What is the place value of 6 in 0.461, written as a fraction?",
        ask: "Worth of the 6, as a fraction?", answer: [6, 100], miss: "Read the column name above the 6, then ask how many of those make one.", win: "Right, that 6 counts 6 parts of 100." },
      /* practice 3 (M2.S3.T6.C26:3, which place the 9 of 15.093 is in) moved to phase 1, so each phase keeps three */
      /* practice 4: answer in the plan = 3 thousandths, which is 3/1000 or 0.003 */
      { qid: "M2.S3.T6.C26:4", kind: "worth", num: "12.803", at: "thousandths", near: "3",
        say: "And what is the place value of the 3 in 12.803, as a decimal?",
        ask: "Worth of the 3, as a decimal?", answer: "0.003", miss: "Count the places from the point to the 3.", win: "Yes, the 3 is worth 3 thousandths." },
    ],
  },
  {
    n: 3,
    concept: "One digit in two places",
    conceptId: "M2.S3.T6.C27", objectiveIds: ["O10"],
    says: ["The same digit, two places. What is each one worth?"],
    /* the textbook's 58.85: tap each 8 for its worth, Line up sets the worths one above the other (the hand carries them),
       then Subtract (the same key, its label follows the act) rules the line and writes the difference */
    steps: [
      { say: "The same digit sits in two places: in 58.85, tap the first 8 to see its worth.", on: "twin-left", hint: "Start with the 8 on the left." },
      { say: "Now tap the other 8 and read what it is worth.", on: "twin-right", hint: "The second 8 stands just after the point." },
      { say: "Tap Line up to set one worth above the other.", on: "lineup", hint: "Line up is the key beside the Two places panel." },
      { say: "Tap Subtract to take the smaller worth from the greater.", on: "subtract", hint: "Subtract stands where Line up was." },
    ],
    /* tries, as the plan writes it: First rung: give the worth of the digit on the left. Second rung: give the worth of the one on the right. Third rung: the same task with the two digits in neighbouring places. */
    ladder: ["Find the worth of the digit on the left first, then the one on the right.", "Give both worths the same places after the point, then subtract."],
    closing: "The same digit is worth different amounts in different places.",
    learned: "You learned: one digit has different worths; subtract to compare",
    traceback: "each digit's worth fills under it, the worths line up by their points in the Two places panel, and the subtraction is written to its answer",
    items: [
      /* learn PV3: answer in the plan = 4.95, because 5 - 0.05 = 4.95 */
      { qid: "M2.S3.T6.C27:PV3", kind: "diff", num: "5.45", twins: ["ones", "hundredths"], near: "0",
        say: "In 5.45, what is the difference between the place values of the two 5s?",
        ask: "Difference of the two 5s?", answer: "4.95", miss: "The digits match, but their worths do not, so which is worth more?", win: "Yes, 5 take away 0.05 is 4.95." },
      /* practice 5: answer in the plan = 1.98. The first 2 is worth 2 and the second is worth 0.02, and 2.00 - 0.02 = 1.98 */
      { qid: "M2.S3.T6.C27:5", kind: "diff", num: "2.62", twins: ["ones", "hundredths"], near: "0",
        say: "Now find the difference between the place values of the two 2s in 2.62.",
        ask: "Difference of the two 2s?", answer: "1.98", miss: "Think of the 2 as 2.00, so the points line up.", win: "Right, 2.00 minus 0.02 leaves 1.98." },
      /* practice 7: answer in the plan = 40, 4 and 0.4: 4 tens, 4 ones and 4 tenths */
      { qid: "M2.S3.T6.C27:7", kind: "each", num: "44.4", cells: ["tens", "ones", "tenths"], pad: "enter", near: "4|4|4",
        say: "The digit 4 appears three times in 44.4, so type what each 4 is worth.",
        ask: "What is each 4 worth?", answer: ["40", "4", "0.4"], miss: "Each step to the left makes a digit worth ten times as much.",
        ladder: ["Read the column name above each 4: it says what that 4 counts.", "The 4 in the Tens column counts tens."],
        win: "Yes, each 4 is ten times the 4 to its right, in each pair." },
    ],
  },
  {
    n: 4,
    concept: "Changing one place",
    conceptId: "M2.S3.T6.C28", objectiveIds: ["O10"],
    says: ["Add three tenths. Which tile changes, and which stay still?"],
    /* the textbook's 0.415 + 3 tenths: three taps on the Tenths up arrow, one a step */
    steps: [
      { say: "To add 3 tenths to 0.415, tap the up arrow in the Tenths column.", on: "up-tenths", hint: "Tenths is the first column after the point." },
      { say: "Tap that same arrow again for 1 more tenth.", on: "up-tenths", hint: "Use the up arrow in the Tenths column again." },
      { say: "Tap it once more and see which tiles stayed still.", on: "up-tenths", hint: "One more tap on the Tenths up arrow." },
    ],
    /* tries, as the plan writes it: First rung: find the column the question names. Second rung: nudge it once. Third rung: the same task with one nudge, before larger changes return. */
    ladder: ["Nudge one column once, and watch which tile changes.", "One tap moves one tile by one, so count your taps."],
    closing: "Adding or taking away in one place changes only that place's digit.",
    learned: "You learned: changing one place changes only that place's digit",
    traceback: "the named column lights, an Answer row ticks that one digit a step at a time, and the new decimal stands written in full",
    items: [
      /* learn PV4: answer in the plan = 2.391 */
      { qid: "M2.S3.T6.C28:PV4", kind: "nudge", num: "2.351", col: "hundredths", by: 4, pad: "enter", near: "2.355",
        say: "Use the arrows to find the number that is 4 hundredths greater than 2.351.",
        ask: "4 hundredths more than 2.351?", answer: "2.391", miss: "Hundredths is the second column after the point: nudge it up 4 times.", win: "Yes, only the hundredths tile moved." },
      /* practice 6: answer in the plan = 5.56. Only the tenths digit changes, from 2 to 5 */
      { qid: "M2.S3.T6.C28:6", kind: "nudge", num: "5.26", col: "tenths", by: 3, pad: "enter", near: "5.29",
        say: "Now find the number that is 3 tenths greater than 5.26.",
        ask: "3 tenths more than 5.26?", answer: "5.56", miss: "Nudge only the Tenths column, up 3 times.", win: "Right, the 2 tenths became 5 tenths." },
      /* practice 8: answer in the plan = 6.125. Only the hundredths digit changes, from 4 to 2 */
      { qid: "M2.S3.T6.C28:8", kind: "nudge", num: "6.145", col: "hundredths", by: -2, pad: "enter", near: "6.143",
        say: "This time take away: what is 2 hundredths less than 6.145?",
        ask: "2 hundredths less than 6.145?", answer: "6.125", miss: "Less means the down arrow: tap it 2 times in the Hundredths column.", win: "Yes, 4 hundredths went down to 2." },
    ],
  },
];

/* ── the chart, shared by every phase (working-area units) ───────────────────────────────────
   Five columns and the point: no number in this tool has a hundreds digit. Tens and Ones are 176 wide, so their up and
   down arrows stand side by side 16 apart; the three columns past the point are 236 wide, "Thousandths" on one line at 32.
   The chart is laid out for the room the working area has with the answer panel OPEN (bigPad off: the drawer starts at
   x 1094 here) and stays at that size and place. Its cells are tall enough for "Place holder" under a grey 0 (phase 3,
   which has no zero, uses a lower cell to leave room for the Two places panel).
   A value is kept in whole thousandths, so a nudge never drifts the way a float would. */
const PV_COLS: any[] = [
  { key: "tens", name: "Tens", one: "ten", x: 6, w: 176, unit: 10000, dp: 0 },
  { key: "ones", name: "Ones", one: "one", x: 182, w: 176, unit: 1000, dp: 0 },
  { key: "tenths", name: "Tenths", one: "tenth", x: 378, w: 236, unit: 100, dp: 1 },
  { key: "hundredths", name: "Hundredths", one: "hundredth", x: 614, w: 236, unit: 10, dp: 2 },
  { key: "thousandths", name: "Thousandths", one: "thousandth", x: 850, w: 236, unit: 1, dp: 3 },
];
const PV_PT = 368;
const PV_HEAD = { y: 6, h: 80 }, PV_CELL = { y: 94, h: 178 }, PV_CELL_LOW = 140;
const PV_TW = 128, PV_TH = 116, PV_TY = 100;
const PV_GREEN = shade(CONTENT.one, 0.25), PV_AMBER = shade(CONTENT.ten, 0.45), PV_VIOLET = shade(CONTENT.bead, 0.35), PV_GREY = "#767676";
const PV_FREE = "47.216";
/* phase 3: the worth chips under the low chart, the Two places panel under them and the key beside it */
const PV_CHIP = { y: 250, h: 60 };
const PV_PN = { x: 4, y: 330, w: 560, h: 188, X: 360 };   /* 188: the working area ends under it; the rows sit high enough to clear its bottom by 16 */
const PV_KEY = { x: 620, y: 446, w: 240, h: 72 };
/* phase 4 and free play: the arrows under the chart; phase 1: the tray; the Answer row of a correction */
const PV_ARROW_Y = 286, PV_TRAY_Y = 340, PV_ROW1 = 318, PV_ROW4 = 432;
const pvCol = (k: string): any => PV_COLS.find((c) => c.key === k) || PV_COLS[1];
const pvCx = (k: string) => pvCol(k).x + pvCol(k).w / 2;
/* a Draw, Line up or Subtract key, and an arrow key, ringed by the one invite that hugs it */
const pvKeyInvite = (b: any, C: any, pad = 16) => <Invite x={b.x + b.w / 2} y={b.y + b.h / 2} w={b.w + pad} h={b.h + pad} rx={22} C={C} />;
/* "63.508" -> { tens: "6", ones: "3", tenths: "5", hundredths: "0", thousandths: "8" }; a place it lacks is absent */
const pvDigits = (s: string) => {
  const [w, f = ""] = String(s).split(".");
  const out: any = {}, ww = w.slice(-2);
  if (ww.length === 2) { out.tens = ww[0]; out.ones = ww[1]; } else if (ww.length === 1) out.ones = ww[0];
  ["tenths", "hundredths", "thousandths"].forEach((k, j) => { if (f[j] !== undefined) out[k] = f[j]; });
  return out;
};
/* the zeros that hold a place open inside the number (a nonzero digit on each side): grey, labelled Place holder */
const pvInner = (s: string) => {
  const g = pvDigits(s), ks = PV_COLS.map((c) => c.key).filter((k) => g[k] !== undefined), out: any = {};
  ks.forEach((k, i) => { if (g[k] === "0" && ks.slice(0, i).some((x) => g[x] !== "0") && ks.slice(i + 1).some((x) => g[x] !== "0")) out[k] = true; });
  return out;
};
const pvList = (s: string) => { const g = pvDigits(s); return PV_COLS.filter((c) => g[c.key] !== undefined).map((c) => ({ d: g[c.key], col: c.key })); };
const pvTh = (s: string) => { const [w, f = ""] = String(s).split("."); return Number(w || 0) * 1000 + Number((f + "000").slice(0, 3)); };
const pvDp = (s: string) => (String(s).split(".")[1] || "").length;
/* a value in thousandths, written with at least dp0 places and as many more as a nonzero digit needs */
const pvRead = (th: number, dp0: number) => {
  const f = String(th % 1000).padStart(3, "0");
  let dp = dp0;
  for (let d = 3; d > dp0; d--) if (f[d - 1] !== "0") { dp = d; break; }
  return dp > 0 ? Math.floor(th / 1000) + "." + f.slice(0, dp) : String(Math.floor(th / 1000));
};
/* what the chart reads from the tiles the child placed (an empty column is simply not read) */
const pvReadPlaced = (cols: any, tiles: any[]) => {
  const d = (k: string) => (cols[k] !== undefined && cols[k] !== null ? tiles[cols[k]].d : "");
  const w = d("tens") + d("ones"), f = d("tenths") + d("hundredths") + d("thousandths");
  return f ? w + "." + f : w;
};
/* one digit's worth, as the book writes it: 40, 4, 0.4, 0.05 */
const pvWorth = (d: string, col: string) => (d === "0" ? "0" : pvRead(Number(d) * pvCol(col).unit, 0));
const pvCount = (d: string, col: string) => d + " " + (d === "1" ? pvCol(col).one : pvCol(col).key);

const MODEL = { columns: PV_COLS.map((c) => c.name), point: "between Ones and Tenths", freePlay: PV_FREE,
  warmUps: { 1: "draw the Tenths, Hundredths and Thousandths columns", 2: "47.216: the 1", 3: "58.85: 8 - 0.8 = 7.2", 4: "0.415 + 3 tenths = 0.715" } };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: exact written forms ("0.08", not "0.080" or ".08"); a digit takes the digit only. A decimal that is the same
   amount in another written form (".08", "0.080", "00.08", ".4") stays a miss, but its first hint says so (PV_EQ) in
   place of the item's own miss; the item's miss is put back for any other value */
const PV_EQ = "That is the same amount; write it with one 0 before the point and no extra zeros.";
const PV_MISS = new Map();
const pvSame = (want: string, got: string) => want.includes(".") && got !== want && /^(\d+\.?\d*|\.\d+)$/.test(got) && Number(got) === Number(want);
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (item.kind === "build") return String(v) === item.answer || String(v) === item.named;
  let ok = false, eq = false;
  if (Array.isArray(item.answer)) {
    const a = Array.isArray(v) ? v.map((x: any) => String(x).trim()) : String(v ?? "").split("|").map((x) => x.trim());
    ok = a.length === item.answer.length && a.every((x: string, k: number) => x === item.answer[k]);
    eq = !ok && a.length === item.answer.length && a.every((x: string, k: number) => x === item.answer[k] || pvSame(item.answer[k], x));
  } else {
    const g = String(v ?? "").trim().toLowerCase();
    ok = g === String(item.answer).toLowerCase();
    eq = !ok && typeof item.answer === "string" && pvSame(item.answer, g);
  }
  if (item.kind === "worth" || item.kind === "diff" || item.kind === "each") {
    if (!PV_MISS.has(item)) PV_MISS.set(item, item.miss);
    item.miss = eq ? PV_EQ : PV_MISS.get(item);
  }
  return ok;
};
/* oracle: every answer re-derived from the item's own number by plain arithmetic, sharing nothing with
   judge or the picture */
const ORC_PLACES = ["tenths", "hundredths", "thousandths"];
const orcDigitAt = (num: string, place: string) => {
  const [w, f = ""] = num.split(".");
  if (place === "ones") return w[w.length - 1];
  if (place === "tens") return w[w.length - 2];
  return f[ORC_PLACES.indexOf(place)];
};
const orcAmount = (num: string, place: string) => {
  const p = ({ tens: 1, ones: 0, tenths: -1, hundredths: -2, thousandths: -3 } as any)[place];
  return Number(orcDigitAt(num, place)) * Math.pow(10, p);
};
const orcFixed = (x: number, dp: number) => (Math.round(x * 1000) / 1000).toFixed(dp);
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const num = it.num, dp = (num.split(".")[1] || "").length;
  if (it.kind === "build") {
    const got: any = {};
    it.named.replace(" and ", ", ").split(", ").forEach((part: string) => { const [d, name] = part.split(" "); got[name] = d; });
    return it.answer === num && (got.tens || "") + got.ones + "." + got.tenths + got.hundredths + got.thousandths === num;
  }
  if (it.kind === "digit") return it.answer === orcDigitAt(num, it.place);
  if (it.kind === "head") return orcDigitAt(num, it.answer) === "9" && it.say.includes("the 9");
  if (it.kind === "worth") { const x = orcAmount(num, it.at); return it.answer === orcFixed(x, -({ tenths: -1, hundredths: -2, thousandths: -3 } as any)[it.at]); }
  if (it.kind === "frac") return it.answer[0] === Number(orcDigitAt(num, it.at)) && it.answer[1] === Math.pow(10, ORC_PLACES.indexOf(it.at) + 1);
  if (it.kind === "diff") {
    const a = orcAmount(num, it.twins[0]), b = orcAmount(num, it.twins[1]);
    return orcDigitAt(num, it.twins[0]) === orcDigitAt(num, it.twins[1]) && it.answer === orcFixed(a - b, 2);
  }
  if (it.kind === "each") return it.cells.every((c: string, k: number) => Number(it.answer[k]) === Math.round(orcAmount(num, c) * 1000) / 1000);
  if (it.kind === "nudge") {
    const step = ({ tenths: 0.1, hundredths: 0.01, thousandths: 0.001 } as any)[it.col];
    return it.answer === orcFixed(Number(num) + it.by * step, dp);
  }
  return false;
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print (a build target is the question itself) */
const answerForms = (item: any) => {
  const sp = (x: string) => [x, speakable(x)];
  if (item.kind === "build") return [];
  if (item.kind === "digit") return [item.answer, words(Number(item.answer))];
  if (item.kind === "head") return [item.answer];
  const d = item.num ? pvDigits(item.num)[item.at] : "";
  if (item.kind === "worth") return [...sp(item.answer), pvCount(d, item.at), words(Number(d)) + " " + pvCol(item.at).key];
  if (item.kind === "frac") return [pvCount(d, item.at), words(Number(d)) + " " + pvCol(item.at).key, ...sp(pvWorth(d, item.at))];
  if (item.kind === "each") return item.answer.filter((x: string) => x !== pvDigits(item.num).ones).flatMap(sp);
  return sp(String(item.answer));
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it: a build is named
   place by place, as the plan writes it */
const agentKey = (item: any) => (item.kind === "build" ? item.named : item.answer);

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo()
  : T.submit(item.parts ? item.answer : Array.isArray(item.answer) ? item.answer.join("|") : item.answer));
/* the agent's answer(): a working-area item is set as a child would set it; a decimal is typed with its
   point (toolApi.answer strips the point); a digit or a fraction falls back to the runtime */
const answer = (item: any, v: any) => {
  if (item.pad === "enter") return HOOK.set ? HOOK.set(v) : false;
  if (!item.parts && typeof item.answer === "string" && item.answer.includes(".")) return HOOK.type ? HOOK.type(v) : undefined;
  return undefined;
};
/* the agent's check() before Enter: undefined = press Enter (so in a guide step it reaches api.onEnter) */
const check = () => (HOOK.check ? HOOK.check() : undefined);
/* how a thumbnail writes a value: the worths of "each" with commas, not the "|" they travel with */
const pvShow = (v: any) => (Array.isArray(v) ? v.join(", ") : String(v ?? "").replace(/\|/g, ", "));

/* ── drawing helpers: called, never mounted (a component declared inside Work is rebuilt every frame) ── */

/* the frame, the column heads (lit amber, glowing, or chosen) and the point; `drawn` = how many columns past the
   point are ruled (the phase 1 warm-up draws them one by one), `ink` = the one the pencil is ruling now; `low` = the
   shorter cells of phase 3 */
const pvCellH = (o: any = {}) => (o.low ? PV_CELL_LOW : PV_CELL.h);
function pvFrame(C: any, tx: any, o: any = {}) {
  const lit = o.lit || [], glow = o.glow || [], drawn = o.drawn === undefined ? 3 : o.drawn, ink = o.ink, ch = pvCellH(o);
  const vis = (c: any) => c.dp <= drawn ? 2 : ink && ink.k === c.dp - 1 && ink.k === drawn ? ink.part : 0;
  const lastOn = PV_COLS.filter((c) => vis(c) > 0).pop();
  const right = lastOn.dp === 0 ? PV_PT + 28 : lastOn.x + lastOn.w;   /* 1086: the open drawer (board-fit) starts at 1094 */
  return (
    <g pointerEvents="none">
      <rect x={0} y={2} width={right} height={PV_CELL.y + ch + 2} rx={RAD.panel} fill={tint(C.panel, 0.45)} stroke={C.rule} strokeWidth={2} />
      {PV_COLS.map((c) => {
        const v = vis(c);
        if (!v) return null;
        const on = lit.includes(c.key), g = glow.includes(c.key), sel = o.sel === c.key;
        return (
          <g key={c.key}>
            <rect x={c.x + 4} y={PV_HEAD.y} width={c.w - 8} height={PV_HEAD.h} rx={14}
              fill={on ? tint(CONTENT.ten, 0.55) : g ? tint(CONTENT.one, 0.7) : "#FFFFFF"}
              stroke={sel ? C.accent : on ? CONTENT.ten : g ? CONTENT.one : C.ink} strokeWidth={sel ? 6 : on || g ? 4 : 2} />
            <text x={c.x + c.w / 2} y={PV_HEAD.y + 52} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(c.name)}</text>
            {v >= 2 && (
              <rect x={c.x + 4} y={PV_CELL.y} width={c.w - 8} height={ch} rx={14} fill="#FFFFFF"
                stroke={o.open ? C.accent : C.rule} strokeWidth={o.open ? 3 : 2} strokeDasharray="8 8" />
            )}
          </g>
        );
      })}
      <circle cx={PV_PT} cy={PV_TY + PV_TH - 14} r={11} fill={C.ink} />
    </g>
  );
}

/* a digit tile: deep blue, or grey for a zero holding a place inside the number (o.grey), which carries its
   "Place holder" label under it (o.tx given) */
function pvTile(x: number, y: number, d: string, o: any = {}) {
  const base = o.grey ? PV_GREY : CONTENT.hundred;
  return (
    <g>
      <g filter={o.lift ? "url(#fLift)" : "url(#fShadowSoft)"}>
        <rect x={x} y={y} width={PV_TW} height={PV_TH} rx={16} fill={o.grey ? PV_GREY : "url(#gHundred)"}
          stroke={o.ring || shade(base, 0.25)} strokeWidth={o.ring ? 7 : 2} />
        <text x={x + PV_TW / 2} y={y + PV_TH / 2 + 25} textAnchor="middle" fontSize={T.display} fontWeight={700} fill="#FFFFFF">{d}</text>
      </g>
      {o.grey && o.tx && (
        <text x={x + PV_TW / 2} y={y + PV_TH + 38} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={PV_GREY} pointerEvents="none">{o.tx("Place holder")}</text>
      )}
    </g>
  );
}
const pvTileXY = (col: string) => ({ x: pvCx(col) - PV_TW / 2, y: PV_TY });

/* the tiles of a decimal standing in the chart (rings: column -> outline colour) */
function pvRow(s: string, rings: any = {}, tx: any = null) {
  const g = pvDigits(s), inner = pvInner(s);
  return PV_COLS.filter((c) => g[c.key] !== undefined).map((c) => {
    const p = pvTileXY(c.key);
    return <g key={c.key}>{pvTile(p.x, p.y, g[c.key], { ring: rings[c.key], grey: !!inner[c.key], tx })}</g>;
  });
}

/* a row written under the chart, column by column (the correction's Answer row, a win's written number) */
function pvAnswerRow(C: any, tx: any, s: string, y: number, o: any = {}) {
  const g = pvDigits(s), upto = o.upto === undefined ? 9 : o.upto, ink = o.ink || PV_GREEN, inner = pvInner(s);
  const cols = PV_COLS.filter((c) => g[c.key] !== undefined);
  const wholeN = cols.filter((c) => c.dp === 0).length;
  return (
    <g pointerEvents="none">
      {!o.bare && <text x={8} y={o.labelY === undefined ? y : o.labelY} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(o.label || "Answer")}</text>}
      {cols.map((c, k) => k < upto && (
        <g key={c.key}>
          <text x={pvCx(c.key)} y={y + 64} textAnchor="middle" fontSize={T.xl} fontWeight={700}
            fill={inner[c.key] ? PV_GREY : (o.inks && o.inks[c.key]) || ink}>{g[c.key]}</text>
          {inner[c.key] && o.holder && !o.bare && (
            <text x={pvCx(c.key)} y={y + 112} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={PV_GREY}>{tx("Place holder")}</text>
          )}
        </g>
      ))}
      {s.includes(".") && upto > wholeN && <text x={PV_PT} y={y + 64} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={ink}>.</text>}
    </g>
  );
}

/* the Which place card and the Worth card: a place is a name, a place value is an amount, three ways (the count, the
   fraction, the decimal; the asked form last and green). `compact` (free play, under the arrows): one line each */
function pvCards(C: any, tx: any, y: number, h: number, d: string | null, col: string | null, o: any = {}) {
  const c = col ? pvCol(col) : null, upto = o.upto || 0, whole = c && c.dp === 0, cp = !!o.compact;
  const yc = y + 44 + (h - 44) / 2;
  const q = <text textAnchor="middle" fontSize={T.xl} fontWeight={600} fill={mix(C.ink, "#FFFFFF", 0.3)}>?</text>;
  const W0 = 364, WW = 722;
  const pc = o.placeCol ? pvCol(o.placeCol) : c, askF = o.ask === "frac" && !whole;
  const decAt = (cx: number, asked: boolean) => (
    <text x={cx} y={yc + (cp ? 12 : 20)} textAnchor="middle" fontSize={cp ? T.prompt : T.xl} fontWeight={700} fill={asked ? PV_GREEN : C.ink}>{pvWorth(d || "0", c.key)}</text>
  );
  const fracAt = (cx: number, asked: boolean) => {
    const fs = cp ? T.label : asked ? T.xl : T.speech, ink = asked ? PV_GREEN : C.ink;
    return (
      <g>
        <text x={cx} y={yc - 6} textAnchor="middle" fontSize={fs} fontWeight={700} fill={ink}>{d}</text>
        <rect x={cx - (cp ? 44 : 64)} y={yc + 4} width={cp ? 88 : 128} height={4} rx={2} fill={ink} />
        <text x={cx} y={yc + 12 + fs * 0.72} textAnchor="middle" fontSize={fs} fontWeight={700} fill={ink}>{String(1000 / c.unit)}</text>
      </g>
    );
  };
  /* x of each piece: the count, =, the second form, =, the asked form */
  const X = cp ? [W0 + 24, W0 + 300, W0 + 360, W0 + 430, W0 + 540] : [W0 + 150, W0 + 312, W0 + 406, W0 + 494, W0 + 606];
  return (
    <g pointerEvents="none">
      <rect x={4} y={y} width={340} height={h} rx={RAD.panel} fill="#FFFFFF" stroke={o.placeLit ? CONTENT.ten : C.rule} strokeWidth={o.placeLit ? 4 : 2} />
      <text x={24} y={y + 42} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("Which place")}</text>
      {o.place && pc ? (cp ? (
        <text x={174} y={yc + 12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(pc.key) + " " + tx("place")}</text>
      ) : (
        <g>
          <text x={174} y={yc - 4} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{tx(pc.key)}</text>
          <text x={174} y={yc + 44} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("place")}</text>
        </g>
      )) : <g transform={`translate(174,${yc + 20})`}>{q}</g>}
      <rect x={W0} y={y} width={WW} height={h} rx={RAD.panel} fill="#FFFFFF" stroke={o.worthLit ? CONTENT.ten : C.rule} strokeWidth={o.worthLit ? 4 : 2} />
      <text x={W0 + 20} y={y + 42} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("Worth")}</text>
      {upto === 0 || !c || d === null ? <g transform={`translate(${W0 + WW / 2},${yc + 20})`}>{q}</g> : (
        <g>
          {cp ? (
            <text x={X[0]} y={yc + 12} fontSize={T.label} fontWeight={600} fill={C.ink}>
              <tspan fontSize={T.prompt} fontWeight={700}>{d}</tspan><tspan>{" " + tx(d === "1" ? c.one : c.key)}</tspan>
            </text>
          ) : (
            <g>
              <text x={X[0]} y={yc + 2} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{d}</text>
              <text x={X[0]} y={yc + 48} textAnchor="middle" fontSize={T.prompt} fontWeight={600} fill={C.ink}>{tx(d === "1" ? c.one : c.key)}</text>
            </g>
          )}
          {upto >= 2 && !whole && (
            <g>
              <text x={X[1]} y={yc + 14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>=</text>
              {askF ? decAt(X[2] + 6, false) : fracAt(X[2], false)}
            </g>
          )}
          {upto >= 3 && (
            <g>
              <text x={whole ? X[1] : X[3]} y={yc + 14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>=</text>
              {askF ? fracAt(X[4], true) : decAt(whole ? X[2] + 40 : X[4], true)}
            </g>
          )}
        </g>
      )}
    </g>
  );
}

/* the Two places panel: the greater worth over the smaller, points in one line, added zeros violet;
   rows = how many worths have landed, ruled = the line under them is drawn, diff = the difference (or null) */
function pvPanel(C: any, tx: any, a: string | null, b: string | null, diff: string | null, rows: number, ruled: boolean) {
  const P = PV_PN, X = P.X, aa = a || "0", bb = b || "0";
  const dp = Math.max(pvDp(aa), pvDp(bb)), aw = pvRead(pvTh(aa), dp), bw = pvRead(pvTh(bb), dp);
  const grid = (str: string, y: number, own: number, ink: string) => {
    const [w, f = ""] = str.split("."), out: any[] = [];
    w.split("").reverse().forEach((ch, k) => out.push(<text key={"w" + k} x={X - 30 - k * 36} y={y} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={ink}>{ch}</text>));
    if (str.includes(".")) out.push(<text key="pt" x={X} y={y} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={own === 0 ? PV_VIOLET : ink}>.</text>);
    f.split("").forEach((ch, k) => out.push(<text key={"f" + k} x={X + 30 + k * 36} y={y} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={k >= own ? PV_VIOLET : ink}>{ch}</text>));
    return out;
  };
  const added = rows >= 1 && (pvDp(aa) < dp || pvDp(bb) < dp);
  return (
    <g pointerEvents="none">
      <rect x={P.x} y={P.y} width={P.w} height={P.h} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      <text x={P.x + 20} y={P.y + 40} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("Two places")}</text>
      {added && <text x={P.x + 20} y={P.y + 96} fontSize={T.micro} fontWeight={700} fill={PV_VIOLET}>{tx("Added zeros")}</text>}
      {rows >= 1 && <g>{grid(aw, P.y + 68, pvDp(aa), C.ink)}</g>}
      {rows >= 2 && <text x={X - 112} y={P.y + 118} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>−</text>}
      {rows >= 2 && <g>{grid(bw, P.y + 118, pvDp(bb), C.ink)}</g>}
      {ruled && <rect x={X - 136} y={P.y + 131} width={244} height={4} rx={2} fill={C.ink} />}
      {diff ? <g>{grid(diff, P.y + 172, 9, PV_GREEN)}</g>
        : ruled && <text x={X} y={P.y + 172} textAnchor="middle" fontSize={T.speech} fontWeight={600} fill={mix(C.ink, "#FFFFFF", 0.3)}>?</text>}
    </g>
  );
}

const pvArrow = (up: boolean, c: string) => (
  <path d={up ? "M -18 9 L 0 -11 L 18 9" : "M -18 -9 L 0 11 L 18 -9"} fill="none" stroke={c} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
);

/* the warm-up of each phase (its guide steps) is played on the textbook's own number, never a question's */
const PV_DEMO: any = {
  1: { kind: "draw" },
  2: { kind: "worth", num: "47.216", at: "hundredths" },
  3: { kind: "diff", num: "58.85", twins: ["ones", "tenths"] },
  4: { kind: "nudge", num: "0.415", col: "tenths", by: 3 },
};

const pvFresh = (qk: string, it: any) => ({
  qk, cols: {}, picked: null, carrying: null, head: null, seen: false, worthOn: false, shown: [], landed: 0, ruled: false, subtracted: false,
  cells: ["", "", ""], open: null, cellFresh: false, ink: null,
  V: pvTh(it.num || "0"), nudges: {}, moved: false, judged: null, given: null, tb: null, freeAt: null,
});

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
function Work({ phase, n, item, index, stage, wrong, typed, captured, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  /* every English word the picture draws goes through tx("...") (its key is added to TR) */
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free", demo = stage === "demo";
  /* free play reads no question (item is the last one); a guide step plays the phase's warm-up number */
  const it: any = free ? { kind: "free", num: PV_FREE } : demo ? PV_DEMO[n] || {} : item || {};
  const qk = free ? "free" : n + ":" + (demo ? "d" : index);
  const S = useRef<any>(null);
  const [, force] = useState(0);
  const playing = useRef(false);
  const lastKey = useRef(0);
  /* a fresh picture for every question, and for a warm-up started again (restart, a phase dot: the step goes back) */
  if (!S.current || S.current.qk !== qk || (demo && (step || 0) < (S.current.st || 0))) S.current = pvFresh(qk, it);
  if (demo) S.current.st = step || 0;
  const s = S.current;
  const put = (p: any) => { S.current = { ...S.current, ...p }; force((x: number) => x + 1); };
  const won = stage === "win" || stage === "idle";
  const live = (stage === "ask" || free) && !tl.busy;
  const tb = s.tb === null ? 0 : s.tb, inTb = s.tb !== null;
  /* tiles to place: the build and the head question; the digit question reads 7.24 already standing in the chart */
  const tiles = it.kind === "build" || it.kind === "head" ? pvList(it.num) : [];
  const dp0 = free ? 3 : pvDp(it.num || "");
  const inviteAt = (x: number, y: number, r = 70) => <Invite x={x} y={y} r={r} C={C} />;

  /* ── the acts ── */
  /* the keyboard child keeps the focus after an act: on the control pressed, or the next live one */
  const kbRef = useRef(false);
  const focusSoon = (ids: string[]) => setTimeout(() => {
    for (const id of ids) {
      const el: any = document.querySelector('[data-zone="work"] [data-control="' + id + '"]') || document.querySelector('[data-control="' + id + '"]');
      if (el && el.focus && el.getAttribute("aria-disabled") !== "true") { el.focus(); return; }
    }
  }, 60);
  /* a short line on the bubble for an act that cannot be done yet (an empty chart, an arrow at its end); the question
     comes back with the child's next act */
  const note = (line: string) => { if (stage !== "ask" && !free) return; api.say(line); S.current.noted = true; };
  const unnote = () => {
    if (!S.current.noted) return;
    S.current.noted = false;
    if (free) api.say(FREE_LINE); else if (item && item.say) api.say(item.say);
  };
  /* a tap on a control: in a guide step it is that step's act, or a wrong act (the step's hint shows); else it is done */
  const lastTap = useRef<any>({ name: "", t: 0 });
  const tap = (name: string, fn: () => void, next: string[] = [], gap = 350) => {
    /* a second tap on the same piece within `gap` ms is a double tap, never a second act; in a warm-up it shows the hint.
       The arrows pass 100: a nudge is a counting tap, so quick taps all count. A guarded key press keeps its focus. */
    const t = Date.now(), L0 = lastTap.current;
    const ae: any = typeof document !== "undefined" ? document.activeElement : null;
    const kb = !!(ae && ae.closest && ae.closest('[data-control="' + name + '"]'));
    if (L0.name === name && t - L0.t < gap) { if (demo) api.did(name + "-again"); if (kb) focusSoon([name]); return; }
    lastTap.current = { name, t };
    kbRef.current = kb;
    if (demo) { if (stepOn && name === stepOn) act(name); else api.did(name); }
    else { unnote(); fn(); }
    if (kbRef.current && !playing.current) focusSoon([name, ...next]);
  };
  /* one key for a sequence, and Enter on a step: a 400 ms guard, so one tap never also presses the label that follows */
  const press = (name: string, fn: () => void) => {
    const t = Date.now();
    if (t - lastKey.current < 400) return;
    lastKey.current = t;
    tap(name, fn);
  };
  const actKey = (id: string, label: string, b: any, fn: () => void) => (
    <Key key="act0" id={id} label={tx(label)} x={b.x} y={b.y} w={b.w} h={b.h} C={C} tone="key" onClick={() => press(id, fn)}>
      <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{tx(label)}</text>
    </Key>
  );

  /* phase 1 warm-up: the pencil rules the next column past the point (head, then cell) */
  const drawCol = () => {
    const k = step || 0, c = PV_COLS[2 + k];
    if (!c || playing.current) return;
    const x1 = c.x + c.w - 6;
    playing.current = true;
    api.act({ tool: "pencil", moves: "draw", from: { x: c.x + 6, y: PV_HEAD.y }, at: [{ x: x1, y: PV_HEAD.y }, { x: x1, y: PV_CELL.y + PV_CELL.h }],
      onPoint: (i: number) => put({ ink: { k, part: i + 1 } }) })
      .then((ok: boolean) => {
        playing.current = false;
        if (!ok) { put({ ink: null }); return; }
        put({ ink: { k, part: 2 } }); api.sfx.settle(); api.did("draw");
        if (kbRef.current) focusSoon(["draw"]);
      });
  };

  /* phase 3: the hand carries both worths into the Two places panel, one above the other */
  const lineUp = () => {
    if (playing.current || S.current.landed >= 2 || !it.twins) return;
    const [L, R] = it.twins, X = PV_PN.X, wasDemo = demo;
    playing.current = true;
    const cy = PV_CHIP.y + PV_CHIP.h / 2;
    api.act({ tool: "hand", moves: "carry", from: { x: pvCx(L), y: cy },
      at: [{ x: X - 20, y: PV_PN.y + 54 }, { x: pvCx(R), y: cy }, { x: X - 20, y: PV_PN.y + 104 }],
      onPoint: (i: number) => { if (i === 0) put({ landed: 1 }); if (i === 2) put({ landed: 2 }); } })
      .then((ok: boolean) => {
        playing.current = false;
        if (!ok) { put({ landed: 0 }); return; }
        put({ landed: 2 }); api.sfx.settle();
        if (wasDemo) api.did("lineup");
        if (kbRef.current) focusSoon(["subtract", "answer-open"]);
      });
  };
  /* phase 3 warm-up only: the pencil rules the line and the difference is written under it */
  const subtractAct = () => {
    if (playing.current) return;
    const X = PV_PN.X, y = PV_PN.y + 133;   /* the ruled line, on the panel's rule */
    playing.current = true;
    api.act({ tool: "pencil", moves: "draw", from: { x: X - 136, y }, at: [{ x: X + 108, y }], onPoint: () => put({ ruled: true }) })
      .then((ok: boolean) => {
        playing.current = false;
        if (!ok) { put({ ruled: false }); return; }
        put({ ruled: true, subtracted: true }); api.sfx.settle(); api.did("subtract");
      });
  };
  const reveal = (c: string) => { api.sfx.tick(); put({ shown: [...S.current.shown, c] }); };

  /* phase 4 and free play: a nudge adds or takes one of a place */
  const nudge = (col: string, d: number) => {
    const V = S.current.V + d * pvCol(col).unit;
    if (V < 0) { note("This place cannot go lower."); return; }
    if (V > 99999) { note("This place cannot go higher."); return; }
    api.sfx.tick();
    put({ V, moved: true, nudges: { ...S.current.nudges, [col]: (S.current.nudges[col] || 0) + d } });
  };

  /* the act of the current guide step (a real tap on its control, Enter, the agent's check(), the dev solve()) */
  const act = (on: string) => {
    if (!demo || !on || playing.current) return;
    if (on === "draw") { drawCol(); return; }
    if (on === "lineup") { lineUp(); return; }
    if (on === "subtract") { subtractAct(); return; }
    /* the runtime takes the act first (it may refuse a repeat): only an act it took changes the picture */
    if (!api.did(on)) return;
    if (on.indexOf("head-") === 0) { api.sfx.tick(); put({ head: on.slice(5) }); }
    else if (on === "worth") { api.sfx.tick(); put({ worthOn: true }); }
    else if (on === "twin-left" || on === "twin-right") reveal(it.twins[on === "twin-left" ? 0 : 1]);
    else if (on.indexOf("up-") === 0) nudge(on.slice(3), 1);
  };

  /* the column heads as controls: a place is named by tapping its head (phase 1's last question, every phase 2 question) */
  const headHits = (pick: (k: string) => void, tall = false) => PV_COLS.map((c) => (
    <Hit key={"h" + c.key} id={"head-" + c.key} x={c.x + 4} y={PV_HEAD.y} w={c.w - 8} h={tall ? PV_CELL.y + PV_CELL.h - PV_HEAD.y : PV_HEAD.h} label={tx(c.name)}
      onPress={() => tap("head-" + c.key, () => pick(c.key))} />
  ));

  /* ── phase 1: tiles into columns ── */
  const colOf = (j: number) => Object.keys(S.current.cols).find((k) => S.current.cols[k] === j) || null;
  const allPlaced = tiles.length > 0 && tiles.every((t: any, j: number) => colOf(j) !== null);
  const placeTile = (j: number, c: string | null) => {
    const cols = { ...S.current.cols }, from = colOf(j);
    if (from) delete cols[from];
    if (c) {
      const occ = cols[c];
      if (occ !== undefined && occ !== j && from) cols[from] = occ;
      cols[c] = j;
    }
    api.sfx.tick();
    put({ cols, picked: null, moved: true });
  };
  /* a correction that runs while tiles are still in the tray (an agent's answer; a child's Enter waits for every tile)
     writes the answer bare, digits only, and the tray steps down under it */
  const trayLow = () => s.tb !== null && tiles.some((t: any, j: number) => colOf(j) === null);
  const traySlot = (j: number) => {
    const m = tiles.length, x0 = 543 - (m * PV_TW + (m - 1) * 28) / 2;
    return { x: x0 + j * (PV_TW + 28), y: trayLow() ? 384 : PV_TRAY_Y };
  };
  const tileAt = (j: number) => { const c = colOf(j); return c ? pvTileXY(c) : traySlot(j); };
  /* a tile picked, then a column tapped: the hand carries it there (a drag is the child's own hand) */
  const carryTo = (j: number, c: string) => {
    if (playing.current || !tiles[j]) return;
    const p = tileAt(j), q = pvTileXY(c);
    playing.current = true;
    put({ carrying: j });
    api.act({ tool: "hand", moves: "carry", from: { x: p.x + PV_TW / 2, y: p.y + PV_TH / 2 }, at: [{ x: q.x + PV_TW / 2, y: q.y + PV_TH / 2 }],
      hold: <g>{pvTile(-PV_TW / 2, -PV_TH / 2, tiles[j].d, { lift: true, grey: !!pvInner(it.num)[tiles[j].col] })}</g> })
      .then((ok: boolean) => {
        playing.current = false; put({ carrying: null });
        if (!ok) return;
        placeTile(j, c);
        /* the keyboard goes on to the next tile still in the tray, else to the answer key */
        if (kbRef.current) focusSoon([...tiles.map((t: any, i: number) => i).filter((i: number) => colOf(i) === null).map((i: number) => "tile-" + (i + 1)), "answer-open"]);
      });
  };
  const tapTile = (j: number) => {
    const p = S.current.picked;
    if (p === null) put({ picked: j, moved: true });
    else if (p === j) { if (colOf(j)) placeTile(j, null); else put({ picked: null }); }
    else { const c = colOf(j); if (c) carryTo(p, c); else put({ picked: j }); }
  };
  const colAt = (x: number, y: number) => {
    if (y < -30 || y > PV_CELL.y + PV_CELL.h + 30 || x < 0 || x > 1094) return null;
    let best: any = null;
    PV_COLS.forEach((c) => { const d = Math.abs(x - pvCx(c.key)); if (!best || d < best.d) best = { d, k: c.key }; });
    return best.k;
  };
  const drag = useDrag((pay: any, at: any, moved: boolean) => {
    if (!live || !pay || pay.j === undefined || playing.current) return;
    unnote();
    if (!moved || !isFinite(at.x) || !isFinite(at.y)) {
      const t = Date.now(), L0 = lastTap.current, nm = "tile-" + (pay.j + 1);
      if (L0.name === nm && t - L0.t < 350) return;   /* a double tap on one tile is one tap */
      lastTap.current = { name: nm, t };
      tapTile(pay.j);
    } else placeTile(pay.j, colAt(at.x, at.y));
  });

  /* ── phase 3 "each": the pad lent to the box under a digit ── */
  const cellKey = (k: string) => {
    const S0 = S.current, o = S0.open;
    if (o === null || o === undefined) return;
    const cells = S0.cells.slice();
    let v = cells[o];
    if (k === "enter") {
      /* Enter confirms the box being typed and moves to the next; only the last box (all filled) answers */
      if (v === "") return;
      if (o < cells.length - 1) { put({ open: o + 1, cellFresh: true }); return; }
      const nx = cells.findIndex((c: string) => c === "");
      if (nx >= 0) { put({ open: nx, cellFresh: true }); return; }
      api.capture(null); put({ open: null }); enter(); return;
    }
    if (k === "clear") v = "";
    else if (k === "back") v = v.slice(0, -1);
    else if (k === "point") v = S0.cellFresh ? "." : v.includes(".") || v.length >= 6 ? v : v + ".";
    else if (/^\d$/.test(k)) v = S0.cellFresh ? k : v.length >= 6 ? v : v + k;
    else return;
    cells[o] = v;
    put({ cells, cellFresh: false });
  };
  const openCell = (k: number) => { unnote(); put({ open: k, cellFresh: true }); api.capture(cellKey); };

  /* ── a working-area answer: what the child has made, and Enter on it ── */
  const sigNow = () => {
    const S0 = S.current;
    if (it.kind === "build") return Object.keys(S0.cols).length ? JSON.stringify(S0.cols) : null;
    if (it.kind === "head") return S0.head;
    if (it.kind === "each") return S0.cells.every((c: string) => c !== "") ? S0.cells.join("|") : null;
    if (it.kind === "nudge") return S0.moved ? pvRead(S0.V, dp0) : null;
    return null;
  };
  /* Enter judges only work the child has changed since it was last judged */
  const enter = () => {
    const S0 = S.current;
    if ((it.kind === "build" || it.kind === "head") && !allPlaced) { note("First move all the tiles onto the chart."); return; }
    if (it.kind === "head" && !S0.head) { note("Choose a column name first."); return; }
    if (it.kind === "nudge" && !S0.moved) { note("Tap an arrow before you press Enter."); return; }
    if (it.kind === "each") {
      const gap = S0.cells.findIndex((c: string) => c === "");
      if (gap >= 0) { if (S0.open === null) openCell(gap); return; }
    }
    const sig = sigNow();
    if (!sig || sig === S0.judged) return;
    const v = it.kind === "build" ? pvReadPlaced(S0.cols, tiles) : sig;
    if (it.kind === "each") api.capture(null);
    put({ judged: sig, given: v, picked: null, open: null });
    api.submit(v);
  };
  /* the Enter key blinks once the answer on the chart is complete and new */
  const sg = it.pad === "enter" && stage === "ask" ? sigNow() : null;
  const ready = !!sg && sg !== s.judged && (it.kind !== "build" && it.kind !== "head" || allPlaced) && !tl.busy;
  useEffect(() => { if (it.pad === "enter" && stage === "ask") api.answerReady(ready); }, [ready, qk, stage]);
  /* with a tile picked, a tap on the empty paper (the runtime's floor) says where a tile goes */
  useEffect(() => {
    if (typeof document === "undefined") return;
    const onUp = (e: any) => {
      const tg = e.target;
      if (S.current.picked === null || S.current.carrying !== null || stage !== "ask") return;
      if (tg && tg.getAttribute && tg.getAttribute("data-role") === "work-floor") note("Tap a column to put this tile in.");
    };
    document.addEventListener("pointerup", onUp);
    return () => document.removeEventListener("pointerup", onUp);
  });

  /* Enter: in a guide step it performs the step; at a working-area question it answers */
  api.onEnter(demo ? (stepOn ? () => press(stepOn, () => {}) : null)
    : !free && stage === "ask" && it.pad === "enter" ? () => { if (!tl.busy) enter(); } : null);

  /* a right answer's own line (one sentence); at a phase's last question the runtime shows the closing instead */
  useEffect(() => { if (stage === "win" && !free && item && item.win) api.say(item.win); }, [stage, qk]);
  HOOK.demo = demo && stepOn ? () => act(stepOn) : null;

  /* the agent sets a working-area answer as a child would, and types a decimal with its point */
  HOOK.set = (v: any) => {
    if (it.kind === "build") {
      if (!judge(it, v)) return false;
      const cols: any = {};
      tiles.forEach((t: any, j: number) => { cols[t.col] = j; });
      put({ cols, picked: null, moved: true });
      return true;
    }
    if (it.kind === "head") {
      /* as a child must: every tile in its column first, then the column name */
      const k = String(v).toLowerCase();
      if (!PV_COLS.some((c) => c.key === k)) return false;
      const cols: any = {};
      tiles.forEach((t: any, j: number) => { cols[t.col] = j; });
      put({ cols, picked: null, moved: true, head: k });
      return true;
    }
    if (it.kind === "each") {
      const a = Array.isArray(v) ? v.map(String) : String(v).split("|");
      api.capture(null);
      put({ cells: [a[0] || "", a[1] || "", a[2] || ""], open: null });
      return true;
    }
    if (it.kind === "nudge") { put({ V: pvTh(String(v)), moved: true }); return true; }
    return false;
  };
  HOOK.type = (v: any) => { api.setTyped(String(v)); return true; };

  /* the traceback: lock, redraw the maths step by step to the whole right answer, unlock */
  const stepsOf = () => {
    if (it.kind === "build" || it.kind === "digit" || it.kind === "head") return pvList(it.num).length + 2;
    if (it.kind === "worth" || it.kind === "frac") return 4;
    if (it.kind === "diff" || it.kind === "each") return 3;
    if (it.kind === "nudge") return Math.abs(it.by) + 2;
    return 1;
  };
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    put({ tb: 0, picked: null });
    const seq: any[] = [];
    for (let k = 1; k <= stepsOf(); k++) seq.push([k === 1 ? 700 : 650, () => put({ tb: k })]);
    seq.push([300, () => {}]);
    tl.run(seq, () => api.lock(false));
  }, [wrong]);

  /* what the host and the agent read back (toolApi.getState); the answer only once the child gave it */
  const reading = it.kind === "build" ? pvReadPlaced(s.cols, tiles) : it.kind === "nudge" || free ? pvRead(s.V, dp0) : it.num || "";
  api.share({
    decimal: reading, tiles: tiles.length ? Object.keys(s.cols).length : null, picked: s.picked !== null ? "tile-" + (s.picked + 1) : s.head,
    worths: it.kind === "diff" ? s.shown : it.kind === "each" ? s.cells.join("|") : null, nudges: s.nudges,
    answer: s.given !== null ? s.given : wrong ? wrong.value : won ? typed : null, complete: stage === "idle",
  });

  /* ── phase 1 ── */
  const phase1 = () => {
    if (it.kind === "draw") {
      const drawn = stepOn ? step || 0 : 3, kb = { x: 423, y: 404, w: 240, h: 80 };
      return (
        <g>
          {pvFrame(C, tx, { drawn, ink: s.ink })}
          {stepOn === "draw" && !playing.current && pvKeyInvite(kb, C)}
          {stepOn === "draw" && actKey("draw", "Draw", kb, () => {})}
        </g>
      );
    }
    const ans = pvList(it.num), inner = pvInner(it.num);
    const firstOff = ans.find((a: any) => { const j = S.current.cols[a.col]; return j === undefined || tiles[j].d !== a.d; });
    /* the column a correction lights: where the child's chart first goes wrong (an empty chart: the zero's column) */
    const zeroCol = (ans.find((a: any) => a.d === "0") || { col: "tenths" }).col;
    const offCol = Object.keys(s.cols).length && firstOff ? firstOff.col : zeroCol;
    const hot = it.kind === "head" ? it.at : it.place;
    const lit = won ? (it.kind === "build" ? [] : [hot]) : tb >= 1 ? [it.kind === "build" ? offCol : hot] : [];
    const glow = won && it.kind === "build" ? ["tenths", "hundredths", "thousandths"] : [];
    const dragging = drag.drag && drag.drag.moved && drag.drag.payload ? drag.drag.payload.j : null;
    const ghost = () => {
      const d = drag.drag;
      if (dragging === null || !tiles[dragging]) return null;
      return <g pointerEvents="none">{pvTile(Math.min(Math.max(d.x - 64, 0), 958), Math.min(Math.max(d.y - 58, 0), 400), tiles[dragging].d, { lift: true, grey: !!inner[tiles[dragging].col] })}</g>;
    };
    const picking = live && s.picked !== null && s.carrying === null;
    const firstOut = tiles.findIndex((t: any, j: number) => colOf(j) === null);
    const inks = it.kind === "build" ? {} : { [hot]: PV_AMBER };
    return (
      <g>
        {pvFrame(C, tx, { lit, glow, sel: it.kind === "head" && !won ? s.head : null, open: picking })}
        {it.kind === "head" && live && !picking && headHits((k) => { api.sfx.tick(); put({ head: k }); })}
        {it.kind === "digit" && !won && pvRow(it.num, {}, tx)}
        {won ? pvRow(it.num, it.kind === "build" ? {} : { [hot]: CONTENT.ten }) : tiles.map(   /* won: "Place holder" once, on the answer row */(t: any, j: number) => {
          const c = colOf(j), p = c ? pvTileXY(c) : traySlot(j), picked = s.picked === j;
          const ctl = live ? {
            ...control("tile-" + (j + 1), tx("tile") + " " + t.d), ...drag.bind({ j }),
            onKeyDown: (e: any) => { if (e.key === "Enter" && it.kind === "build" && allPlaced && S.current.picked === null) return; drag.keys({ j }).onKeyDown(e); },
          } : {};
          return (
            <g key={"t" + j} {...ctl}>
              {dragging === j || s.carrying === j
                ? <rect x={p.x} y={p.y} width={PV_TW} height={PV_TH} rx={16} fill="none" stroke={C.rule} strokeWidth={3} strokeDasharray="8 8" />
                : pvTile(p.x, p.y, t.d, { ring: picked ? C.accent : undefined, lift: picked, grey: !!inner[t.col] })}
            </g>
          );
        })}
        {!won && tiles.map((t: any, j: number) => {
          const c = colOf(j), p = c ? pvTileXY(c) : traySlot(j);
          if (!inner[t.col] || dragging === j || s.carrying === j || (!c && trayLow())) return null;
          return <text key={"ph" + j} x={p.x + PV_TW / 2} y={p.y + PV_TH + 38} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={PV_GREY} pointerEvents="none">{tx("Place holder")}</text>;
        })}
        {/* with a tile picked, a column takes it: the whole column when it is empty, its name when a tile stands there */}
        {picking && PV_COLS.map((c) => {
          const empty = S.current.cols[c.key] === undefined;
          return (
            <Hit key={"c" + c.key} id={"col-" + c.key} x={c.x + 4} y={PV_HEAD.y} w={c.w - 8} h={empty ? PV_CELL.y + PV_CELL.h - PV_HEAD.y : PV_HEAD.h}
              label={tx("put in " + c.name)} onPress={() => tap("col-" + c.key, () => carryTo(S.current.picked, c.key))} />
          );
        })}
        {!won && tb >= 1 && (trayLow() ? pvAnswerRow(C, tx, it.num, PV_ROW1 - 36, { upto: tb - 1, inks, bare: true })
          : pvAnswerRow(C, tx, it.num, PV_ROW1, { upto: tb - 1, holder: tb >= ans.length + 2, inks }))}
        {won && pvAnswerRow(C, tx, it.num, PV_ROW1, { holder: true, inks })}
        {live && !inTb && !won && firstOut >= 0 && s.picked === null && inviteAt(traySlot(firstOut).x + PV_TW / 2, traySlot(firstOut).y + PV_TH / 2, 64)}
        {ghost()}
      </g>
    );
  };

  /* ── phase 2 ── */
  const phase2 = () => {
    const g = pvDigits(it.num), d = g[it.at];
    /* the child names the place by tapping a column head; the Which place card shows that choice, the correction and
       the win the right one */
    const fixed = won || tb >= 1, placeCol = fixed ? it.at : s.head;
    const upto = won ? 3 : tb >= 4 ? 3 : tb >= 3 ? 2 : tb >= 2 ? 1 : demo && s.worthOn ? 3 : 0;
    const canTap = ((demo && !!stepOn) || (live && !free)) && !won;
    return (
      <g>
        {pvFrame(C, tx, { lit: fixed ? [it.at] : [], sel: fixed ? null : s.head })}
        {pvRow(it.num, { [it.at]: CONTENT.ten }, tx)}
        {pvCards(C, tx, 288, 228, d, it.at, { place: !!placeCol, placeCol, upto, ask: it.kind === "frac" ? "frac" : "dec", worthLit: tb >= 1 && tb < 4 && !won })}
        {demo && stepOn && stepOn.indexOf("head-") === 0 && inviteAt(pvCx(it.at), PV_TY + PV_TH / 2, 72)}
        {demo && stepOn === "worth" && pvKeyInvite({ x: 372, y: 296, w: 706, h: 212 }, C)}
        {canTap && headHits((k) => { api.sfx.tick(); put({ head: k }); }, true)}
        {demo && !!stepOn && <Hit id="worth" x={364} y={288} w={722} h={228} label={tx("the Worth card")} onPress={() => tap("worth", () => {})} />}
      </g>
    );
  };

  /* ── phase 3 ── */
  const phase3 = () => {
    const g = pvDigits(it.num);
    if (it.kind === "each") {
      const rings: any = {};
      it.cells.forEach((c: string) => { rings[c] = CONTENT.ten; });
      return (
        <g>
          {pvFrame(C, tx, { low: true })}
          {pvRow(it.num, rings, tx)}
          {it.cells.map((c: string, k: number) => {
            const x = pvCx(c) - 74, y = PV_CHIP.y, open = s.open === k && captured && !won, v = won ? it.answer[k] : s.cells[k];
            return (
              <g key={c}>
                <rect x={x} y={y} width={148} height={72} rx={14} fill="#FFFFFF" stroke={open ? C.accent : C.ink} strokeWidth={open ? 4 : 2} pointerEvents="none" />
                <text x={x + 74} y={y + 50} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={won ? PV_GREEN : C.ink} pointerEvents="none">{v}</text>
                {open && <rect className="c4-caret" x={x + 74 + v.length * 12 + 4} y={y + 14} width={4} height={44} rx={2} fill={C.accent} pointerEvents="none" />}
                {live && stage === "ask" && (
                  <Hit id={"box-" + (k + 1)} x={x} y={y} w={148} h={72} label={tx("worth of the 4 in " + pvCol(c).name)} enabled={!(captured && s.open === k)}
                    onPress={() => tap("box-" + (k + 1), () => openCell(k))} />
                )}
              </g>
            );
          })}
          {!won && tb >= 1 && (
            <g pointerEvents="none">
              <text x={8} y={366} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("Answer")}</text>
              {it.cells.map((c: string, k: number) => k < tb && (
                <text key={c} x={pvCx(c)} y={432} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={PV_GREEN}>{it.answer[k]}</text>
              ))}
            </g>
          )}
          {live && !inTb && s.open === null && s.cells.every((c: string) => c === "") && pvKeyInvite({ x: pvCx(it.cells[0]) - 74, y: PV_CHIP.y, w: 148, h: 72 }, C)}
        </g>
      );
    }
    const [L, R] = it.twins;
    const shown = (c: string) => won || tb >= 1 || s.shown.includes(c);
    const both = shown(L) && shown(R);
    const rows = won || tb >= 2 ? 2 : s.landed;
    const ruled = won || tb >= 2 || (demo ? s.ruled : s.landed >= 2);
    const wL = pvWorth(g[L], L), wR = pvWorth(g[R], R);
    const diff = won || tb >= 3 || (demo && s.subtracted) ? pvRead(pvTh(wL) - pvTh(wR), Math.max(pvDp(wL), pvDp(wR))) : null;
    const keyId = demo ? (stepOn === "lineup" || stepOn === "subtract" ? stepOn : null)
      : live && !free && both && s.landed < 2 && !won && !inTb ? "lineup" : null;
    const canTap = (demo && !!stepOn) || (live && !free);
    return (
      <g>
        {pvFrame(C, tx, { low: true })}
        {pvRow(it.num, { [L]: CONTENT.ten, [R]: CONTENT.ten }, tx)}
        {[L, R].map((c: string) => shown(c) && (
          <g key={"w" + c} pointerEvents="none">
            <rect x={pvCx(c) - 80} y={PV_CHIP.y} width={160} height={PV_CHIP.h} rx={14} fill="#FFFFFF" stroke={CONTENT.ten} strokeWidth={3} />
            <text x={pvCx(c)} y={PV_CHIP.y + 44} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{pvWorth(g[c], c)}</text>
          </g>
        ))}
        {pvPanel(C, tx, wL, wR, diff, rows, ruled)}
        {demo && (stepOn === "twin-left" || stepOn === "twin-right") && inviteAt(pvCx(it.twins[stepOn === "twin-left" ? 0 : 1]), PV_TY + PV_TH / 2, 72)}
        {demo && keyId && !playing.current && pvKeyInvite(PV_KEY, C)}
        {canTap && [L, R].map((c: string, k: number) => !shown(c) && (
          <Hit key={"t" + c} id={k ? "twin-right" : "twin-left"} x={pvCx(c) - 90} y={PV_CELL.y} w={180} h={PV_CELL_LOW} label={tx(k ? "the second ringed digit" : "the first ringed digit")}
            onPress={() => tap(k ? "twin-right" : "twin-left", () => reveal(c))} />
        ))}
        {keyId && actKey(keyId, keyId === "subtract" ? "Subtract" : "Line up", PV_KEY, keyId === "subtract" ? subtractAct : lineUp)}
      </g>
    );
  };

  /* ── phase 4 and free play: the nudge arrows (up and down stay two keys: both are real choices) ── */
  const arrowBox = (col: string, up: boolean) => ({ x: pvCx(col) + (up ? -80 : 8), y: PV_ARROW_Y, w: 72, h: 72 });
  const arrows = (enabled: boolean) => PV_COLS.map((c) => {
    const u = arrowBox(c.key, true), d = arrowBox(c.key, false);
    return (
      <g key={c.key}>
        <Key id={"up-" + c.key} label={tx("add 1 " + c.one)} x={u.x} y={u.y} w={u.w} h={u.h} C={C} disabled={!enabled}
          onClick={() => tap("up-" + c.key, () => nudge(c.key, 1), [], 100)}>{pvArrow(true, enabled ? C.ink : C.dim)}</Key>
        <Key id={"down-" + c.key} label={tx("take away 1 " + c.one)} x={d.x} y={d.y} w={d.w} h={d.h} C={C} disabled={!enabled}
          onClick={() => tap("down-" + c.key, () => nudge(c.key, -1), [], 100)}>{pvArrow(false, enabled ? C.ink : C.dim)}</Key>
      </g>
    );
  });
  const phase4 = () => {
    const unit = pvCol(it.col).unit, start = pvTh(it.num), sign = it.by < 0 ? -1 : 1, last = Math.abs(it.by) + 2;
    const rowAt = tb >= 1 ? pvRead(start + sign * Math.min(tb - 1, Math.abs(it.by)) * unit, dp0) : "";
    const shownNum = won ? String(it.answer) : pvRead(s.V, dp0);
    const demoDone = demo && !stepOn;
    return (
      <g>
        {pvFrame(C, tx, { lit: !won && tb >= 1 ? [it.col] : [], glow: won || demoDone ? [it.col] : [] })}
        {pvRow(shownNum, {}, tx)}
        {demo && stepOn && pvKeyInvite(arrowBox(it.col, true), C, 6)}   /* tight: the chart bottom is just above, the down arrow just beside */
        {arrows((demo && !!stepOn) || (live && !free))}
        {!won && !demoDone && PV_COLS.filter((c) => s.nudges[c.key]).map((c) => (
          <text key={c.key} x={pvCx(c.key)} y={PV_ARROW_Y + 110} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={PV_AMBER} pointerEvents="none">
            {(s.nudges[c.key] > 0 ? "+" : "−") + Math.abs(s.nudges[c.key])}
          </text>
        ))}
        {won && pvAnswerRow(C, tx, String(it.answer), PV_ROW4, {})}
        {demoDone && pvAnswerRow(C, tx, pvRead(s.V, dp0), PV_ROW4, {})}
        {!won && tb >= 1 && pvAnswerRow(C, tx, rowAt, PV_ROW4, tb >= last ? {} : { ink: C.ink, inks: { [it.col]: PV_AMBER } })}
      </g>
    );
  };

  /* ── Free play: any decimal by the arrows, any digit tapped for its place and worth ── */
  const freeArea = () => {
    const shownNum = pvRead(s.V, 3), g = pvDigits(shownNum), at = s.freeAt && g[s.freeAt] !== undefined ? s.freeAt : null;
    return (
      <g>
        {pvFrame(C, tx, { lit: at ? [at] : [] })}
        {pvRow(shownNum, at ? { [at]: CONTENT.ten } : {}, tx)}
        {PV_COLS.filter((c) => g[c.key] !== undefined).map((c) => (
          <Hit key={c.key} id={"digit-" + c.key} x={c.x + 4} y={PV_CELL.y} w={c.w - 8} h={PV_CELL.h} label={tx("digit in " + c.name)}
            onPress={() => tap("digit-" + c.key, () => { api.sfx.tick(); put({ freeAt: c.key }); })} />
        ))}
        {arrows(true)}
        {pvCards(C, tx, 374, 144, at ? g[at] : null, at, { place: !!at, upto: at ? 3 : 0, compact: true })}
      </g>
    );
  };

  return (
    <g>
      {free ? freeArea() : n === 1 ? phase1() : n === 2 ? phase2() : n === 3 ? phase3() : phase4()}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase (r24: `it` is the item) */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const L = result && result.last;
  if (!L || L.value === null || L.value === undefined) return null;
  const item: any = it || L.it || ((PHASES[(n || 1) - 1] || { items: [] }).items || [])[L.item] || {};
  const frac = item.parts ? slotPartsOf(L.value, 2) : null;
  /* sized from the card's own height, so nothing pokes out; a place answer is the number with that digit in green (no word) */
  const place = item.kind === "head" ? String(L.value) : item.kind === "digit" ? item.place : item.at || null;
  /* sized from the card's own height so nothing pokes out: the number on top, the place name under it when there is one */
  const two = !!place && !frac && h >= 60;   /* the summary's box is 66 tall: two lines at 28 */
  const fs = two ? T.micro : Math.max(T.micro, Math.min(T.label, Math.floor(h * 0.4)));
  const base = two ? h / 2 - 5 : h / 2 + fs * 0.36;
  const num = String(item.num || ""), dot = num.indexOf(".");
  const k = (item.kind === "head" || item.kind === "digit") && place && dot >= 0 ? dot + 1 + ["tenths", "hundredths", "thousandths"].indexOf(place) : -1;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {k > dot ? (
        <text x={w / 2} y={base} textAnchor="middle" fontSize={fs} fontWeight={700} fill={C.ink}>
          <tspan>{num.slice(0, k)}</tspan><tspan fill={PV_GREEN}>{num[k]}</tspan><tspan>{num.slice(k + 1)}</tspan>
        </text>
      ) : frac ? (
        <g>
          <text x={w / 2} y={h / 2 - 6} textAnchor="middle" fontSize={fs} fontWeight={700} fill={PV_GREEN}>{frac[0]}</text>
          <rect x={w / 2 - 40} y={h / 2 - 2} width={80} height={4} rx={2} fill={PV_GREEN} />
          <text x={w / 2} y={h / 2 + 6 + fs * 0.72} textAnchor="middle" fontSize={fs} fontWeight={700} fill={PV_GREEN}>{frac[1]}</text>
        </g>
      ) : <text x={w / 2} y={base} textAnchor="middle" fontSize={fs} fontWeight={700} fill={PV_GREEN}>{pvShow(L.value)}</text>}
      {two && <text x={w / 2} y={h / 2 + 24} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(place)}</text>}
    </g>
  );
}

function PlaceValueChart(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* a place value is typed with its point ("0.08"); the pad has the point key on every question */
      pointKey: true,
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
      /* OFF: a chart of five columns and the point is 1074 wide; it is laid out for the 1086 the open standard panel leaves */
      bigPad: false,
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

export default PlaceValueChart;
