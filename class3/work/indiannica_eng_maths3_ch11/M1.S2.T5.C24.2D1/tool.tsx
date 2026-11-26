/* ═══ M1.S2.T5.C24.2D1 · money_columns · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ mascot, action kit, font kit) is prepended at build: header, card, keypad drawer, bubble,
   phase dots, toolApi, sounds, scoring and the summary are the runtime's. THE LESSON IS SILENT (r30) and action-driven.
   The new look (keyOnly, navDots, cardAnswer): the question lives in the bubble; the answer is typed ON the column sum's
   answer row (the card: paise box first, then rupees box). Every act is performed on screen (api.act, a writing pencil).
   The owner's description (NOTES.md 2026-11-12) wins over the plan brief: a desk (owner 2026-11-16: no notebook, the cells sit on the desk) with a deep blue
   Rupees column and a vermilion Paise column, the dots on one line, paper price tags; carry and borrow shown.
   NO imports in this file; only the five host hooks. Edit, never rewrite. */

const TOOL_ID = "money_columns";
const MEDIA_ID = "M1.S2.T5.C24.2D1";
const TOOL_NAME = "Money Columns";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

const OPENING = ["A board with two columns, and two price tags waiting to be set."];
const FINISH_LINE = "You kept the dots in one line and worked the paise first.";
const FREE_LINE = "Free play. Tap New prices, choose Add or Take away, then carry or borrow.";

/* the colour roles (owner 2026-11-12): deep blue = rupees, vermilion = paise, amber = a price, green = the answer */
const MC_BLUE = "#1F4FA3", MC_VERM = "#E2531A", MC_AMBER = "#E69F00", MC_GREEN = "#0B8A5F", MC_INK = "#2B2B2B";
const MC_BLUE_INK = "#173D80", MC_VERM_INK = "#A03A0A", MC_AMBER_INK = "#6E4A00", MC_GREEN_INK = "#08603F";
const MC_D = 64;   /* the digits in the cells */
const MC_C = 50;   /* the carry / borrow digits (bold: the carry is the picture of the lesson) */
const MC_PW = 9;   /* the pencil stroke of those digits, bold */
/* the column sum on the desk, laid out once for the 900-wide area the open keypad leaves (it never moves when the keypad opens) */
const MCG = (() => {
  const cw = 66, r0 = 66, nb = { x: 12, y: 8, w: 876, h: 504 };
  const g: any = { cw, nb, seam: nb.x + nb.w / 2, signX: 36, r0, r1: r0 + 3 * cw, dotX: r0 + 3 * cw + 16, p0: r0 + 3 * cw + 32,
    head: { y: 18, h: 58 }, carry: { y: 86, h: 62 }, row1: { y: 160, h: 88 }, row2: { y: 260, h: 88 }, rule: 360, ans: { y: 376, h: 88 } };
  g.p1 = g.p0 + 2 * cw;
  g.base = (r: any) => r.y + r.h / 2 + MC_D * 0.36;
  g.cBase = g.carry.y + g.carry.h / 2 + MC_C * 0.36;
  g.cw2 = 2 * cw;
  g.page2 = { x: g.seam, w: nb.x + nb.w - g.seam };
  g.mid2 = g.page2.x + g.page2.w / 2;
  g.tag = (k: number) => ({ x: Math.round(g.mid2 - 196 + k * 206), y: 18, w: 186, h: 232 });
  g.keyY = 330; g.key2Y = 420;
  return g;
})();
/* the parts of the answer, in the order the child types them: the paise first, then the rupees (owner: paise first) */
const MC_PARTS = [{ label: "paise", at: "dpart" }, { label: "rupees", at: "dwhole" }];
/* "13.40" -> { r: "13", p: "40" }; "9" -> { r: "9", p: "00", whole: true } (the picture's reading of an amount) */
const mcSplit = (a: any) => { const s = String(a); const k = s.indexOf("."); return k < 0 ? { r: s, p: "00", whole: true } : { r: s.slice(0, k), p: (s.slice(k + 1) + "00").slice(0, 2), whole: false }; };
/* what the child (or the agent) answered, as [paise, rupees] digit strings: [p, r], "p|r" (the card's own order) or "38.15" */
const mcParts = (v: any) => {
  const d = (x: any) => String(x ?? "").replace(/[^0-9]/g, "");
  if (Array.isArray(v)) return [d(v[0]), d(v[1])];
  const s = String(v ?? "");
  if (s.includes("|")) { const a = s.split("|"); return [d(a[0]), d(a[1])]; }
  const a = s.split(".");
  return [d(a[1]), d(a[0])];
};

/* THE START PAGE */
const START_HOOK = "How do two prices stand in columns so the dots make one line?";
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  const nx = 300, ny = 10, nw = 600, nh = 320;
  return (
    <g>
      <rect x={nx} y={ny} width={nw} height={nh} rx={14} fill="#C9A37A" />
      <Skin name="desk" x={nx} y={ny} w={nw} h={nh} />
      {[0, 1, 2].map((k) => <rect key={"r" + k} x={nx + 62 + k * 56} y={ny + 112} width={52} height={68} rx={8} fill="#FFFFFF" stroke="#D8CBB5" strokeWidth={1.5} />)}
      {[0, 1].map((k) => <rect key={"p" + k} x={nx + 258 + k * 56} y={ny + 112} width={52} height={68} rx={8} fill="#FFFFFF" stroke="#D8CBB5" strokeWidth={1.5} />)}
      <line x1={nx + 242} y1={ny + 104} x2={nx + 242} y2={ny + 300} stroke={MC_INK} strokeWidth={2.5} strokeDasharray="8 8" />
      <circle cx={nx + 242} cy={ny + 162} r={7} fill={MC_INK} stroke="#FFFFFF" strokeWidth={2} />
      <rect x={nx + 62} y={ny + 58} width={164} height={46} rx={10} fill={tint(MC_BLUE, 0.82)} stroke={MC_BLUE_INK} strokeWidth={2} />
      <rect x={nx + 252} y={ny + 58} width={120} height={46} rx={10} fill={tint(MC_VERM, 0.82)} stroke={MC_VERM_INK} strokeWidth={2} />
      <text x={nx + 144} y={ny + 92} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={MC_BLUE_INK}>{tx("Rupees")}</text>
      <text x={nx + 312} y={ny + 92} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={MC_VERM_INK}>{tx("Paise")}</text>
      {[0, 1].map((k) => (
        <g key={"t" + k}>
          <rect x={nx + 382 + k * 110} y={ny + 60} width={90} height={156} rx={10} fill="#E8CFA0" stroke={shade("#E8CFA0", 0.4)} strokeWidth={2} />
          <Skin name="pricetag" x={nx + 382 + k * 110} y={ny + 60} w={90} h={156} fit="stretch" />
        </g>
      ))}
      <rect x={nx + 40} y={ny + 250} width={260} height={22} rx={10} fill="#E9B949" stroke={MC_INK} strokeWidth={1.5} />
      <Skin name="pencil" x={nx + 40} y={ny + 250} w={260} h={22} fit="stretch" />
    </g>
  );
}

const TR: any = {
  hi: {
    "Count the paise of both prices together.": "दोनों दामों के पैसे मिलाकर गिनो।",
    "Type the paise sum, then press Enter.": "पैसों का जोड़ लिखो, फिर एंटर दबाओ।",
    "Add this column again, with the carried 1 on top.": "इस खाने को फिर जोड़ो, ऊपर के हासिल 1 के साथ।",
    "Add the top digit, the bottom digit and the small 1 together.": "ऊपर का अंक, नीचे का अंक और छोटा 1 मिलाकर जोड़ो।",
    "Add the two digits of this column again.": "इस खाने के दोनों अंक फिर से जोड़ो।",
    "Count on from the top digit by the bottom digit.": "ऊपर के अंक से आगे नीचे के अंक जितना गिनो।",
    "Type the sum of this column, then press Enter.": "इस खाने का जोड़ लिखो, फिर एंटर दबाओ।",
    "Use the new top digit written above the struck one.": "कटे अंक के ऊपर लिखा नया अंक लो।",
    "Count back from the top digit by the bottom digit.": "ऊपर के अंक से नीचे के अंक जितना पीछे गिनो।",
    "Type what is left in this column, then press Enter.": "इस खाने में जो बचा वह लिखो, फिर एंटर दबाओ।",
    "Look at the small 1 above this column before you add.": "जोड़ने से पहले इस खाने के ऊपर छोटा 1 देखो।",
    "Type this column's whole sum, and a 10 or more sends its 1 up.": "इस खाने का पूरा जोड़ लिखो, 10 या ज़्यादा हो तो 1 ऊपर जाता है।",
    "Use the new top digit if this column was borrowed from.": "अगर इस खाने से उधार लिया है, तो ऊपर का नया अंक लो।",
    "Take the bottom digit away from the top digit, then press Enter.": "ऊपर के अंक में से नीचे का अंक घटाओ, फिर एंटर दबाओ।",
    "Take away the paise first, then each rupee column.": "पहले पैसे घटाओ, फिर हर रुपये का खाना।",
    "Work one column at a time from the right and type its whole sum.": "दाईं ओर से एक-एक खाना लो और उसका पूरा जोड़ लिखो।",
    "A sum of 10 or more sends its 1 up to the next column when you press Enter.": "10 या ज़्यादा का जोड़ हो तो एंटर दबाने पर 1 अगले खाने में ऊपर जाता है।",
    "Work one column at a time from the right, top take away bottom.": "दाईं ओर से एक-एक खाना लो: ऊपर में से नीचे घटाओ।",
    "Compare the top paise with the bottom paise before you take away.": "घटाने से पहले ऊपर और नीचे के पैसों की तुलना करो।",
    "Type the paise answer first, then each rupee column from the right.": "पहले पैसों का उत्तर लिखो, फिर दाईं ओर से हर रुपये का खाना।",
    "Add the two paise again and type the whole sum.": "दोनों पैसे फिर से जोड़ो और पूरा जोड़ लिखो।",
    "Two paise amounts can make more than 100, so type the whole sum.": "दो पैसे मिलकर 100 से ज़्यादा हो सकते हैं, तो पूरा जोड़ लिखो।",
    "Take the bottom paise from the top paise again.": "ऊपर के पैसों में से नीचे के पैसे फिर से घटाओ।",
    "The top paise are too few, so think of Rs 1 as 100 more paise.": "ऊपर के पैसे कम हैं, तो 1 रुपये को 100 और पैसे मानो।",
    "Add this column again, with the carried 1 if there is one.": "इस खाने को फिर जोड़ो, हासिल का 1 हो तो उसे भी।",
    "Take the bottom digit from the top digit in this column again.": "इस खाने में ऊपर के अंक में से नीचे का अंक फिर घटाओ।",
    "Tap the blinking answer space.": "उत्तर के चमकते खाने पर टैप करो।",
    "answer": "उत्तर",
    "bill": "बिल",
    "Money Columns": "पैसों के खाने",
    "A board with two columns, and two price tags waiting to be set.": "दो खानों वाला तख़्ता, और लिखे जाने को तैयार दो दाम के टैग।",
    "You kept the dots in one line and worked the paise first.": "तुमने बिंदु एक रेखा में रखे और पहले पैसे हल किए।",
    "Free play. Tap New prices, choose Add or Take away, then carry or borrow.": "मुक्त खेल। नए दाम पर टैप करो, जोड़ो या घटाओ चुनो, फिर हासिल या उधार लो।",
    "How do two prices stand in columns so the dots make one line?": "दो दाम खानों में कैसे लिखें कि बिंदु एक रेखा में आएँ?",
    "Rupees": "रुपये",
    "Paise": "पैसे",
    "rupees": "रुपये",
    "paise": "पैसे",
    "Rs": "Rs",
    "Bill": "बिल",
    "100 p": "100 पैसे",
    "Carry": "हासिल",
    "Borrow": "उधार लो",
    "Add": "जोड़ो",
    "Take away": "घटाओ",
    "New prices": "नए दाम",
    "ball": "गेंद",
    "top": "लट्टू",
    "doll": "गुड़िया",
    "kite": "पतंग",
    "mask": "मुखौटा",
    "balloon": "गुब्बारा",
    "game": "खेल",
    "cap": "टोपी",
    "book": "किताब",
    "bag": "बस्ता",
    "fish bowl": "मछलीघर",
    "fish food": "दाना",
    "bus": "बस",
    "train": "रेल",
    "toys": "खिलौने",
    "books": "किताबें",
    "shoes": "जूते",
    "socks": "मोज़े",
    "pencil box": "डिब्बा",
    "ruler": "पटरी",
    "scarf": "मफ़लर",
    "toy car": "कार",
    "toy bus": "बस",
    "note": "नोट",
    "notebook, pen": "कॉपी, पेन",
    "purse": "बटुआ",
    "puzzle": "पहेली",
    "bottle": "बोतल",
    "pen": "पेन",
    "pencil": "पेंसिल",
    "toy": "खिलौना",
    "These paise make less than 100, so there is nothing to carry.": "ये पैसे 100 से कम हैं, इसलिए कुछ हासिल नहीं है।",
    "The top paise are enough, so there is nothing to borrow.": "ऊपर के पैसे काफ़ी हैं, इसलिए उधार नहीं लेना है।",
    "Choose Add or Take away first.": "पहले जोड़ो या घटाओ चुनो।",
    "Tap the paise column first.": "पहले पैसों के खाने पर टैप करो।",
    "Rupees under rupees, paise under paise": "रुपयों के नीचे रुपये, पैसों के नीचे पैसे",
    "Which column does each part belong in? Do the dots stand in one straight line?": "हर भाग किस खाने में जाएगा? क्या बिंदु एक सीधी रेखा में हैं?",
    "Tap the tag Rs 25.60 to write it in the Rupees and Paise columns.": "25.60 रुपये वाले टैग पर टैप करो, वह रुपये और पैसे के खानों में लिखा जाएगा।",
    "Tap the first price tag on the right.": "दाईं ओर पहले दाम वाले टैग पर टैप करो।",
    "Now tap the tag Rs 8: a whole rupee amount gets two zeros.": "अब 8 रुपये वाले टैग पर टैप करो: पूरे रुपयों के बाद दो शून्य लगते हैं।",
    "Tap the second price tag.": "दूसरे दाम वाले टैग पर टैप करो।",
    "Rupees stay left of the dot line and paise stay right of it.": "रुपये बिंदु रेखा के बाईं ओर और पैसे दाईं ओर रहते हैं।",
    "Type the two paise digits first, then the rupees, then press Enter.": "पहले पैसों के दो अंक लिखो, फिर रुपये, फिर एंटर दबाओ।",
    "Rupees go under rupees, paise go under paise, and the dots make one line.": "रुपये रुपयों के नीचे, पैसे पैसों के नीचे, और बिंदु एक रेखा में।",
    "You learned: rupees under rupees, paise under paise, dots in one line.": "तुमने सीखा: रुपयों के नीचे रुपये, पैसों के नीचे पैसे, बिंदु एक रेखा में।",
    "Write the kite's price under the doll's price.": "गुड़िया के दाम के नीचे पतंग का दाम लिखो।",
    "Kite's price in columns?": "पतंग का दाम खानों में?",
    "The rupees go left of the dot and the paise go right of it.": "रुपये बिंदु के बाएँ जाते हैं और पैसे उसके दाएँ।",
    "Yes, the kite's dot stands right under the doll's dot.": "हाँ, पतंग का बिंदु ठीक गुड़िया के बिंदु के नीचे है।",
    "Now write the balloon's price under the mask's price.": "अब मुखौटे के दाम के नीचे गुब्बारे का दाम लिखो।",
    "Balloon's price?": "गुब्बारे का दाम?",
    "Rs 9 is all rupees, so what goes in the paise cells?": "9 रुपये में सिर्फ़ रुपये हैं, तो पैसों के खानों में क्या आएगा?",
    "Yes, Rs 9 is written with two zeros after the dot.": "हाँ, 9 रुपये बिंदु के बाद दो शून्य के साथ लिखे जाते हैं।",
    "Write the cap's price under Rs 126.05, the dots in one line.": "टोपी का दाम 126.05 रुपये के नीचे ऐसे लिखो कि बिंदु एक रेखा में हों।",
    "Cap's price?": "टोपी का दाम?",
    "Count the rupee cells from the dot, not from the left edge.": "रुपये के खाने बिंदु से गिनो, बाएँ किनारे से नहीं।",
    "Yes, the 6 stands under the last rupee digit of 126.": "हाँ, 6 ठीक 126 के आखिरी अंक के नीचे है।",
    "Adding: a hundred paise carry one rupee": "जोड़: सौ पैसे का एक रुपया हासिल",
    "Add the paise first. Do they make a hundred or more?": "पहले पैसे जोड़ो। क्या वे सौ या उससे ज़्यादा हैं?",
    "Add the paise first: tap the paise of the two prices.": "पहले पैसे जोड़ो: दोनों दामों के पैसों पर टैप करो।",
    "Tap the paise cells on the right of the dot.": "बिंदु के दाईं ओर पैसों के खानों पर टैप करो।",
    "60 and 70 paise make more than 100, so tap Carry to send Rs 1 over.": "60 और 70 पैसे 100 से ज़्यादा हैं, तो हासिल बटन पर टैप करो।",
    "Tap the Carry key under the price tags.": "दाम के टैगों के नीचे हासिल बटन पर टैप करो।",
    "How many paise do the two paise cells make together?": "पैसों के दोनों खाने मिलकर कितने पैसे बनाते हैं?",
    "If the paise reach 100, 1 rupee goes over to the rupees column.": "अगर पैसे 100 हो जाएँ, तो 1 रुपया रुपये के खाने में जाता है।",
    "Add the paise first, and carry Rs 1 for every 100 paise.": "पहले पैसे जोड़ो, और हर 100 पैसे पर 1 रुपया हासिल लो।",
    "You learned: add the paise first and carry Rs 1 for 100 paise.": "तुमने सीखा: पहले पैसे जोड़ो, 100 पैसे पर 1 रुपया हासिल।",
    "Fish food is Rs 22.85 and a fish bowl Rs 15.30, so how much in all?": "मछलीघर 15.30 रुपये, मछली दाना 22.85 रुपये: कुल कितने रुपये?",
    "Bowl and food in all?": "मछलीघर और दाना कुल?",
    "Count again: 30 paise and 85 paise make how many paise?": "फिर से गिनो: 30 पैसे और 85 पैसे कितने पैसे बनाते हैं?",
    "Yes, 100 paise went over to the rupees as Rs 1.": "हाँ, 100 पैसे 1 रुपया बनकर रुपयों में गए।",
    "A bus ticket is Rs 31.20 and a train ticket Rs 14.35: add them in the columns.": "बस का टिकट 31.20 रुपये और रेल का टिकट 14.35 रुपये खानों में जोड़ो।",
    "Two tickets together?": "दोनों टिकट मिलाकर?",
    "Add the paise, then the rupees, each in its own column.": "पैसे जोड़ो, फिर रुपये, हर एक अपने खाने में।",
    "Yes, these paise made less than 100, so nothing was carried.": "हाँ, ये पैसे 100 से कम थे, इसलिए कुछ हासिल नहीं गया।",
    "What is the total of the two bills, Rs 57.90 and Rs 26.65?": "57.90 रुपये और 26.65 रुपये के दो बिलों का कुल कितना है?",
    "Total of the bills?": "बिलों का कुल?",
    "Add the paise first: 90 paise and 65 paise make how many paise?": "पहले पैसे जोड़ो: 90 पैसे और 65 पैसे कितने पैसे बनाते हैं?",
    "Yes, the carried 1 joined the rupees column.": "हाँ, हासिल का 1 रुपया रुपयों में जुड़ गया।",
    "Subtracting: one rupee borrowed is a hundred paise": "घटाना: उधार लिया 1 रुपया = 100 पैसे",
    "Look at the top paise. Are there enough to take away?": "ऊपर के पैसे देखो। क्या घटाने के लिए काफ़ी हैं?",
    "Tap the paise: are 30 paise enough to take 45 paise away?": "पैसों पर टैप करो: क्या 30 पैसों में से 45 पैसे घटाए जा सकते हैं?",
    "Tap the paise cells right of the dot.": "बिंदु के दाईं ओर वाले पैसों के खानों पर टैप करो।",
    "30 is fewer than 45, so tap Borrow to break Rs 1 into 100 paise.": "30, 45 से कम है, तो उधार लो बटन पर टैप करो।",
    "Tap the Borrow key under the price tags.": "दाम के टैगों के नीचे उधार लो बटन पर टैप करो।",
    "Compare the top paise with the bottom paise.": "ऊपर के पैसों की नीचे के पैसों से तुलना करो।",
    "Take away the paise first, then the rupees, one column at a time.": "पहले पैसे घटाओ, फिर रुपये, एक बार में एक खाना।",
    "Borrow Rs 1 as 100 paise, take the paise, then take the rupees.": "1 रुपया 100 पैसे बनाकर उधार लो, पैसे घटाओ, फिर रुपये घटाओ।",
    "You learned: borrow Rs 1 as 100 paise when the top paise are too few.": "तुमने सीखा: ऊपर पैसे कम हों तो 1 रुपया 100 पैसे बनाकर उधार लो।",
    "A pencil box is Rs 80.10 and a ruler Rs 41.35: how much more is the box?": "डिब्बा 80.10 रुपये, पटरी 41.35 रुपये: डिब्बा पटरी से कितने रुपये महँगा?",
    "How much more?": "कितना ज़्यादा?",
    "10 paise cannot give 35 paise, so the rupees must help.": "10 पैसों में से 35 पैसे घटाए नहीं जा सकते, तो रुपयों से मदद लो।",
    "Yes, the borrowed rupee gave the paise 100 more.": "हाँ, उधार लिए 1 रुपये से पैसों में 100 पैसे और जुड़ गए।",
    "From Rs 38.90, take away Rs 13.50 in the columns.": "खानों में 38.90 रुपये में से 13.50 रुपये घटाओ।",
    "Rs 38.90 take Rs 13.50?": "38.90 में से 13.50?",
    "Take the bottom paise from the top paise, then the rupees.": "ऊपर के पैसों में से नीचे के पैसे घटाओ, फिर रुपये।",
    "Yes, 90 paise were enough, so nothing was borrowed.": "हाँ, 90 पैसे काफ़ी थे, इसलिए कुछ उधार नहीं लिया।",
    "A toy car costs Rs 50 and a toy bus Rs 17.60, so how much more is the car?": "खिलौना कार 50 रुपये, खिलौना बस 17.60 रुपये: कार बस से कितने रुपये महँगी है?",
    "Car costs how much more?": "कार कितने रुपये ज़्यादा?",
    "The top has 00 paise, so borrow Rs 1 as 100 paise.": "ऊपर 00 पैसे हैं, तो 1 रुपया 100 पैसे बनाकर उधार लो।",
    "Yes, 50 rupees became 49 rupees and 100 paise.": "हाँ, 50 रुपये बन गए 49 रुपये और 100 पैसे।",
    "Money problems: in all, left, change": "पैसों के सवाल: कुल, बचे, वापसी",
    "Read the story. Do we put money together or take money away?": "कहानी पढ़ो। पैसे जोड़ने हैं या घटाने हैं?",
    "A pen is Rs 20.50 and a pencil Rs 5.25: tap Add to find the cost in all.": "पेन 20.50 रुपये का और पेंसिल 5.25 रुपये की है: जोड़ो बटन पर टैप करो।",
    "In all puts money together, so tap Add.": "कुल मतलब पैसे जोड़ना, तो जोड़ो बटन पर टैप करो।",
    "Choose Add to put money together, or Take away for what is left.": "पैसे मिलाने हों तो जोड़ो चुनो, बचे हुए के लिए घटाओ।",
    "Work the paise first, then the rupees, carrying or borrowing if needed.": "पहले पैसे, फिर रुपये, ज़रूरत हो तो हासिल या उधार लो।",
    "Add to find how much in all, and take away to find what is left.": "कुल के लिए जोड़ो, और बचा हुआ जानने के लिए घटाओ।",
    "You learned: add for in all, take away for what is left or change.": "तुमने सीखा: कुल के लिए जोड़ो, बचे या वापस पैसों के लिए घटाओ।",
    "Mina pays for Rs 65.75 with a Rs 100 note, so how much change does she get?": "मीना 100 रुपये के नोट से 65.75 रुपये देती है, तो वापसी के कितने पैसे मिलेंगे?",
    "Change from Rs 100?": "100 में से वापस?",
    "Change means take the bill away from the note.": "वापसी के पैसे मतलब नोट में से बिल घटाना।",
    "Yes, the bill taken from the note leaves the change.": "हाँ, नोट में से बिल घटाने पर वापसी के पैसे बचते हैं।",
    "A girl has Rs 86.50 and buys a puzzle for Rs 32.25, so how much money is left?": "लड़की के पास 86.50 रुपये हैं, 32.25 रुपये की पहेली ली: कितने बचे?",
    "Money left?": "कितने बचे?",
    "Money left means take the price away from the purse money.": "बचे पैसे मतलब बटुए के पैसों में से दाम घटाना।",
    "Yes, taking the price away leaves the rest in the purse.": "हाँ, दाम घटाने पर बाकी पैसे बटुए में रहते हैं।",
    "A bag costs Rs 98.75 and a bottle Rs 47.50, so how much is the bill?": "बस्ता 98.75 रुपये और बोतल 47.50 रुपये की है, तो बिल कितना है?",
    "How much is the bill?": "बिल कितना है?",
    "A bill puts all the prices together.": "बिल में सारे दाम जोड़े जाते हैं।",
    "Yes, 125 paise gave Rs 1 to the rupees, and the bill is complete.": "हाँ, 125 पैसों ने रुपयों को 1 रुपया दिया, और बिल पूरा हुआ।",
  },
  gu: {
    "Count the paise of both prices together.": "બંને ભાવના પૈસા ભેગા ગણો.",
    "Type the paise sum, then press Enter.": "પૈસાનો સરવાળો લખો, પછી દાખલ કરો દબાવો.",
    "Add this column again, with the carried 1 on top.": "આ ખાનું ફરી ઉમેરો, ઉપરની વદીના 1 સાથે.",
    "Add the top digit, the bottom digit and the small 1 together.": "ઉપરનો અંક, નીચેનો અંક અને નાનો 1 ભેગા ઉમેરો.",
    "Add the two digits of this column again.": "આ ખાનાના બંને અંક ફરી ઉમેરો.",
    "Count on from the top digit by the bottom digit.": "ઉપરના અંકથી આગળ નીચેના અંક જેટલું ગણો.",
    "Type the sum of this column, then press Enter.": "આ ખાનાનો સરવાળો લખો, પછી દાખલ કરો દબાવો.",
    "Use the new top digit written above the struck one.": "કાપેલા અંક ઉપર લખેલો નવો અંક લો.",
    "Count back from the top digit by the bottom digit.": "ઉપરના અંકથી નીચેના અંક જેટલું પાછળ ગણો.",
    "Type what is left in this column, then press Enter.": "આ ખાનામાં જે બચ્યું તે લખો, પછી દાખલ કરો દબાવો.",
    "Look at the small 1 above this column before you add.": "ઉમેરતાં પહેલાં આ ખાના ઉપરનો નાનો 1 જુઓ.",
    "Type this column's whole sum, and a 10 or more sends its 1 up.": "આ ખાનાનો આખો સરવાળો લખો, 10 કે વધુ હોય તો 1 ઉપર જાય.",
    "Use the new top digit if this column was borrowed from.": "આ ખાનામાંથી ઉછીનું લીધું હોય, તો ઉપરનો નવો અંક લો.",
    "Take the bottom digit away from the top digit, then press Enter.": "ઉપરના અંકમાંથી નીચેનો અંક બાદ કરો, પછી દાખલ કરો દબાવો.",
    "Take away the paise first, then each rupee column.": "પહેલાં પૈસા બાદ કરો, પછી દરેક રૂપિયાનું ખાનું.",
    "Work one column at a time from the right and type its whole sum.": "જમણી બાજુથી એક એક ખાનું લો અને તેનો આખો સરવાળો લખો.",
    "A sum of 10 or more sends its 1 up to the next column when you press Enter.": "10 કે વધુ સરવાળો હોય તો દાખલ કરો દબાવતાં 1 આગલા ખાનામાં ઉપર જાય.",
    "Work one column at a time from the right, top take away bottom.": "જમણી બાજુથી એક એક ખાનું લો: ઉપરમાંથી નીચે બાદ કરો.",
    "Compare the top paise with the bottom paise before you take away.": "બાદ કરતાં પહેલાં ઉપર અને નીચેના પૈસાની સરખામણી કરો.",
    "Type the paise answer first, then each rupee column from the right.": "પહેલાં પૈસાનો જવાબ લખો, પછી જમણેથી દરેક રૂપિયાનું ખાનું.",
    "Add the two paise again and type the whole sum.": "બંને પૈસા ફરી ઉમેરો અને આખો સરવાળો લખો.",
    "Two paise amounts can make more than 100, so type the whole sum.": "બે પૈસા મળીને 100થી વધુ થઈ શકે, તો આખો સરવાળો લખો.",
    "Take the bottom paise from the top paise again.": "ઉપરના પૈસામાંથી નીચેના પૈસા ફરી બાદ કરો.",
    "The top paise are too few, so think of Rs 1 as 100 more paise.": "ઉપરના પૈસા ઓછા છે, તો 1 રૂપિયાને 100 વધુ પૈસા ગણો.",
    "Add this column again, with the carried 1 if there is one.": "આ ખાનું ફરી ઉમેરો, વદીનો 1 હોય તો તે પણ.",
    "Take the bottom digit from the top digit in this column again.": "આ ખાનામાં ઉપરના અંકમાંથી નીચેનો અંક ફરી બાદ કરો.",
    "Tap the blinking answer space.": "ઝબકતી જવાબની જગ્યા પર ટૅપ કરો.",
    "answer": "જવાબ",
    "bill": "બિલ",
    "Money Columns": "પૈસાનાં ખાનાં",
    "A board with two columns, and two price tags waiting to be set.": "બે ખાનાંવાળું પાટિયું, અને લખાવા તૈયાર બે ભાવના ટૅગ.",
    "You kept the dots in one line and worked the paise first.": "તમે બિંદુ એક લીટીમાં રાખ્યાં અને પહેલાં પૈસા ઉકેલ્યા.",
    "Free play. Tap New prices, choose Add or Take away, then carry or borrow.": "મુક્ત રમત. નવા ભાવ દબાવો, ઉમેરો કે બાદ કરો પસંદ કરો, પછી વદી કે ઉછીનું લો.",
    "How do two prices stand in columns so the dots make one line?": "બે ભાવ ખાનાંમાં કેવી રીતે લખીએ કે બિંદુ એક લીટીમાં આવે?",
    "Rupees": "રૂપિયા",
    "Paise": "પૈસા",
    "rupees": "રૂપિયા",
    "paise": "પૈસા",
    "Rs": "Rs",
    "Bill": "બિલ",
    "100 p": "100 પૈસા",
    "Carry": "વદી",
    "Borrow": "ઉછીના લો",
    "Add": "ઉમેરો",
    "Take away": "બાદ કરો",
    "New prices": "નવા ભાવ",
    "ball": "દડો",
    "top": "ભમરડો",
    "doll": "ઢીંગલી",
    "kite": "પતંગ",
    "mask": "મહોરું",
    "balloon": "ફુગ્ગો",
    "game": "રમત",
    "cap": "ટોપી",
    "book": "ચોપડી",
    "bag": "થેલો",
    "fish bowl": "માછલીઘર",
    "fish food": "ચારો",
    "bus": "બસ",
    "train": "ટ્રેન",
    "toys": "રમકડાં",
    "books": "ચોપડીઓ",
    "shoes": "જૂતાં",
    "socks": "મોજાં",
    "pencil box": "પેટી",
    "ruler": "ફૂટપટ્ટી",
    "scarf": "મફલર",
    "toy car": "કાર",
    "toy bus": "બસ",
    "note": "નોટ",
    "notebook, pen": "નોટબુક, પેન",
    "purse": "પાકીટ",
    "puzzle": "કોયડો",
    "bottle": "બોટલ",
    "pen": "પેન",
    "pencil": "પેન્સિલ",
    "toy": "રમકડું",
    "These paise make less than 100, so there is nothing to carry.": "આ પૈસા 100થી ઓછા છે, તેથી કોઈ વદી નથી.",
    "The top paise are enough, so there is nothing to borrow.": "ઉપરના પૈસા પૂરતા છે, તેથી ઉછીનું લેવાનું નથી.",
    "Choose Add or Take away first.": "પહેલાં ઉમેરો કે બાદ કરો પસંદ કરો.",
    "Tap the paise column first.": "પહેલાં પૈસાના ખાના પર ટૅપ કરો.",
    "Rupees under rupees, paise under paise": "રૂપિયા નીચે રૂપિયા, પૈસા નીચે પૈસા",
    "Which column does each part belong in? Do the dots stand in one straight line?": "દરેક ભાગ કયા ખાનામાં જાય? શું બિંદુ એક સીધી લીટીમાં છે?",
    "Tap the tag Rs 25.60 to write it in the Rupees and Paise columns.": "25.60 રૂપિયાના ટૅગ પર ટૅપ કરો, તે રૂપિયા અને પૈસાનાં ખાનાંમાં લખાશે.",
    "Tap the first price tag on the right.": "જમણી બાજુ પહેલા ભાવના ટૅગ પર ટૅપ કરો.",
    "Now tap the tag Rs 8: a whole rupee amount gets two zeros.": "હવે 8 રૂપિયાના ટૅગ પર ટૅપ કરો: પૂરા રૂપિયા પછી બે શૂન્ય લખાય છે.",
    "Tap the second price tag.": "બીજા ભાવના ટૅગ પર ટૅપ કરો.",
    "Rupees stay left of the dot line and paise stay right of it.": "રૂપિયા બિંદુ લીટીની ડાબી બાજુ અને પૈસા જમણી બાજુ રહે છે.",
    "Type the two paise digits first, then the rupees, then press Enter.": "પહેલાં પૈસાના બે અંક લખો, પછી રૂપિયા, પછી દાખલ કરો દબાવો.",
    "Rupees go under rupees, paise go under paise, and the dots make one line.": "રૂપિયા રૂપિયા નીચે, પૈસા પૈસા નીચે, અને બિંદુ એક લીટીમાં.",
    "You learned: rupees under rupees, paise under paise, dots in one line.": "તમે શીખ્યા: રૂપિયા નીચે રૂપિયા, પૈસા નીચે પૈસા, બિંદુ એક લીટીમાં.",
    "Write the kite's price under the doll's price.": "ઢીંગલીના ભાવ નીચે પતંગનો ભાવ લખો.",
    "Kite's price in columns?": "પતંગનો ભાવ ખાનાંમાં?",
    "The rupees go left of the dot and the paise go right of it.": "રૂપિયા બિંદુની ડાબે જાય અને પૈસા તેની જમણે.",
    "Yes, the kite's dot stands right under the doll's dot.": "હા, પતંગનું બિંદુ બરાબર ઢીંગલીના બિંદુ નીચે છે.",
    "Now write the balloon's price under the mask's price.": "હવે મહોરાના ભાવ નીચે ફુગ્ગાનો ભાવ લખો.",
    "Balloon's price?": "ફુગ્ગાનો ભાવ?",
    "Rs 9 is all rupees, so what goes in the paise cells?": "9 રૂપિયામાં ફક્ત રૂપિયા છે, તો પૈસાનાં ખાનાંમાં શું આવે?",
    "Yes, Rs 9 is written with two zeros after the dot.": "હા, 9 રૂપિયા બિંદુ પછી બે શૂન્ય સાથે લખાય છે.",
    "Write the cap's price under Rs 126.05, the dots in one line.": "ટોપીનો ભાવ 126.05 રૂપિયા નીચે એમ લખો કે બિંદુ એક લીટીમાં રહે.",
    "Cap's price?": "ટોપીનો ભાવ?",
    "Count the rupee cells from the dot, not from the left edge.": "રૂપિયાનાં ખાનાં બિંદુથી ગણો, ડાબી ધારથી નહીં.",
    "Yes, the 6 stands under the last rupee digit of 126.": "હા, 6 બરાબર 126ના છેલ્લા અંક નીચે છે.",
    "Adding: a hundred paise carry one rupee": "સરવાળો: સો પૈસાનો એક રૂપિયો વદી",
    "Add the paise first. Do they make a hundred or more?": "પહેલાં પૈસા ઉમેરો. શું તે સો કે વધારે થાય છે?",
    "Add the paise first: tap the paise of the two prices.": "પહેલાં પૈસા ઉમેરો: બંને ભાવના પૈસા પર ટૅપ કરો.",
    "Tap the paise cells on the right of the dot.": "બિંદુની જમણી બાજુ પૈસાનાં ખાનાં પર ટૅપ કરો.",
    "60 and 70 paise make more than 100, so tap Carry to send Rs 1 over.": "60 અને 70 પૈસા 100થી વધારે છે, તો 1 રૂપિયો મોકલવા વદી દબાવો.",
    "Tap the Carry key under the price tags.": "ભાવના ટૅગ નીચે વદી બટન પર ટૅપ કરો.",
    "How many paise do the two paise cells make together?": "પૈસાનાં બંને ખાનાં મળીને કેટલા પૈસા થાય?",
    "If the paise reach 100, 1 rupee goes over to the rupees column.": "જો પૈસા 100 થાય, તો 1 રૂપિયો રૂપિયાના ખાનામાં જાય.",
    "Add the paise first, and carry Rs 1 for every 100 paise.": "પહેલાં પૈસા ઉમેરો, અને દર 100 પૈસે 1 રૂપિયો વદી ઉમેરો.",
    "You learned: add the paise first and carry Rs 1 for 100 paise.": "તમે શીખ્યા: પહેલાં પૈસા ઉમેરો, 100 પૈસે 1 રૂપિયો વદી.",
    "Fish food is Rs 22.85 and a fish bowl Rs 15.30, so how much in all?": "માછલીઘર 15.30 રૂપિયા, ચારો 22.85 રૂપિયા: કુલ કેટલા?",
    "Bowl and food in all?": "માછલીઘર અને ચારો કુલ?",
    "Count again: 30 paise and 85 paise make how many paise?": "ફરી ગણો: 30 પૈસા અને 85 પૈસા કેટલા પૈસા થાય?",
    "Yes, 100 paise went over to the rupees as Rs 1.": "હા, 100 પૈસા 1 રૂપિયો બનીને રૂપિયામાં ગયા.",
    "A bus ticket is Rs 31.20 and a train ticket Rs 14.35: add them in the columns.": "બસની ટિકિટ 31.20 રૂપિયા અને ટ્રેનની ટિકિટ 14.35 રૂપિયા ખાનાંમાં ઉમેરો.",
    "Two tickets together?": "બંને ટિકિટ મળીને?",
    "Add the paise, then the rupees, each in its own column.": "પૈસા ઉમેરો, પછી રૂપિયા, દરેક પોતાના ખાનામાં.",
    "Yes, these paise made less than 100, so nothing was carried.": "હા, આ પૈસા 100થી ઓછા હતા, તેથી કોઈ વદી ન ગઈ.",
    "What is the total of the two bills, Rs 57.90 and Rs 26.65?": "57.90 રૂપિયા અને 26.65 રૂપિયાનાં બે બિલનો કુલ કેટલો?",
    "Total of the bills?": "બિલનો કુલ?",
    "Add the paise first: 90 paise and 65 paise make how many paise?": "પહેલાં પૈસા ઉમેરો: 90 પૈસા અને 65 પૈસા કેટલા પૈસા થાય?",
    "Yes, the carried 1 joined the rupees column.": "હા, વદીનો 1 રૂપિયો રૂપિયામાં ઉમેરાયો.",
    "Subtracting: one rupee borrowed is a hundred paise": "બાદબાકી: ઉછીનો લીધેલો એક રૂપિયો સો પૈસા છે",
    "Look at the top paise. Are there enough to take away?": "ઉપરના પૈસા જુઓ. શું બાદ કરવા પૂરતા છે?",
    "Tap the paise: are 30 paise enough to take 45 paise away?": "પૈસા પર ટૅપ કરો: શું 30 પૈસામાંથી 45 પૈસા બાદ કરી શકાય?",
    "Tap the paise cells right of the dot.": "બિંદુની જમણી બાજુનાં પૈસાનાં ખાનાં પર ટૅપ કરો.",
    "30 is fewer than 45, so tap Borrow to break Rs 1 into 100 paise.": "30 એ 45થી ઓછા છે, તો 1 રૂપિયાના 100 પૈસા કરવા ઉછીના લો દબાવો.",
    "Tap the Borrow key under the price tags.": "ભાવના ટૅગ નીચે ઉછીના લો બટન પર ટૅપ કરો.",
    "Compare the top paise with the bottom paise.": "ઉપરના પૈસાની નીચેના પૈસા સાથે સરખામણી કરો.",
    "Take away the paise first, then the rupees, one column at a time.": "પહેલાં પૈસા બાદ કરો, પછી રૂપિયા, એક વારમાં એક ખાનું.",
    "Borrow Rs 1 as 100 paise, take the paise, then take the rupees.": "1 રૂપિયો 100 પૈસા તરીકે ઉછીનો લો, પૈસા બાદ કરો, પછી રૂપિયા.",
    "You learned: borrow Rs 1 as 100 paise when the top paise are too few.": "તમે શીખ્યા: ઉપર પૈસા ઓછા હોય તો 1 રૂપિયો 100 પૈસા તરીકે ઉછીનો લો.",
    "A pencil box is Rs 80.10 and a ruler Rs 41.35: how much more is the box?": "પેટી 80.10 રૂપિયા, ફૂટપટ્ટી 41.35 રૂપિયા: પેટી તેનાથી કેટલા રૂપિયા મોંઘી?",
    "How much more?": "કેટલું વધારે?",
    "10 paise cannot give 35 paise, so the rupees must help.": "10 પૈસામાંથી 35 પૈસા બાદ ન કરી શકાય, તો રૂપિયાની મદદ લો.",
    "Yes, the borrowed rupee gave the paise 100 more.": "હા, ઉછીના લીધેલા 1 રૂપિયાએ પૈસાને 100 વધુ આપ્યા.",
    "From Rs 38.90, take away Rs 13.50 in the columns.": "ખાનાંમાં 38.90 રૂપિયામાંથી 13.50 રૂપિયા બાદ કરો.",
    "Rs 38.90 take Rs 13.50?": "38.90માંથી 13.50?",
    "Take the bottom paise from the top paise, then the rupees.": "ઉપરના પૈસામાંથી નીચેના પૈસા બાદ કરો, પછી રૂપિયા.",
    "Yes, 90 paise were enough, so nothing was borrowed.": "હા, 90 પૈસા પૂરતા હતા, તેથી કંઈ ઉછીનું ન લીધું.",
    "A toy car costs Rs 50 and a toy bus Rs 17.60, so how much more is the car?": "રમકડાંની કાર 50 રૂપિયા, રમકડાંની બસ 17.60 રૂપિયા: કાર બસથી કેટલા રૂપિયા મોંઘી?",
    "Car costs how much more?": "કાર કેટલા રૂપિયા વધુ?",
    "The top has 00 paise, so borrow Rs 1 as 100 paise.": "ઉપર 00 પૈસા છે, તો 1 રૂપિયો 100 પૈસા તરીકે ઉછીનો લો.",
    "Yes, 50 rupees became 49 rupees and 100 paise.": "હા, 50 રૂપિયા બન્યા 49 રૂપિયા અને 100 પૈસા.",
    "Money problems: in all, left, change": "પૈસાના દાખલા: કુલ, બાકી, પાછા",
    "Read the story. Do we put money together or take money away?": "વાર્તા વાંચો. પૈસા ઉમેરવાના છે કે બાદ કરવાના?",
    "A pen is Rs 20.50 and a pencil Rs 5.25: tap Add to find the cost in all.": "પેન 20.50 રૂપિયા, પેન્સિલ 5.25 રૂપિયા: કુલ માટે ઉમેરો દબાવો.",
    "In all puts money together, so tap Add.": "કુલ એટલે પૈસા ઉમેરવા, તો ઉમેરો દબાવો.",
    "Choose Add to put money together, or Take away for what is left.": "પૈસા ભેગા કરવા ઉમેરો પસંદ કરો, બાકી માટે બાદ કરો.",
    "Work the paise first, then the rupees, carrying or borrowing if needed.": "પહેલાં પૈસા, પછી રૂપિયા, જરૂર હોય તો વદી કે ઉછીનું લો.",
    "Add to find how much in all, and take away to find what is left.": "કુલ માટે ઉમેરો, અને બાકી જાણવા બાદ કરો.",
    "You learned: add for in all, take away for what is left or change.": "તમે શીખ્યા: કુલ માટે ઉમેરો, બાકી કે પાછા પૈસા માટે બાદ કરો.",
    "Mina pays for Rs 65.75 with a Rs 100 note, so how much change does she get?": "મીના 100ની નોટથી 65.75 રૂપિયા ચૂકવે છે: કેટલા પાછા મળે?",
    "Change from Rs 100?": "100માંથી પાછા?",
    "Change means take the bill away from the note.": "પાછા પૈસા એટલે નોટમાંથી બિલ બાદ કરવું.",
    "Yes, the bill taken from the note leaves the change.": "હા, નોટમાંથી બિલ બાદ કરતાં પાછા આપવાના પૈસા બચે.",
    "A girl has Rs 86.50 and buys a puzzle for Rs 32.25, so how much money is left?": "છોકરી પાસે 86.50 રૂપિયા છે, 32.25 રૂપિયાનો કોયડો લીધો: કેટલા બચ્યા?",
    "Money left?": "કેટલા બચ્યા?",
    "Money left means take the price away from the purse money.": "બાકી પૈસા એટલે પાકીટના પૈસામાંથી ભાવ બાદ કરવો.",
    "Yes, taking the price away leaves the rest in the purse.": "હા, ભાવ બાદ કરતાં બાકીના પૈસા પાકીટમાં રહે.",
    "A bag costs Rs 98.75 and a bottle Rs 47.50, so how much is the bill?": "થેલો 98.75 રૂપિયા અને બોટલ 47.50 રૂપિયાની છે, તો બિલ કેટલું?",
    "How much is the bill?": "બિલ કેટલું છે?",
    "A bill puts all the prices together.": "બિલમાં બધા ભાવ ઉમેરાય છે.",
    "Yes, 125 paise gave Rs 1 to the rupees, and the bill is complete.": "હા, 125 પૈસાએ રૂપિયાને 1 રૂપિયો આપ્યો, અને બિલ પૂરું થયું.",
  },
};

/* One entry per phase = one mount. Every item carries a (top amount), b (second amount), op ("+" / "-"; none in phase 1),
   na / nb (what each price is for), ka / kb (tag, bill or purse), near (the misconception's answer, written form) and win. */
const PHASES = [
  {
    n: 1,
    concept: "Rupees under rupees, paise under paise",
    conceptId: "M1.S2.T5.C21", objectiveIds: ["O7"],
    says: ["Which column does each part belong in? Do the dots stand in one straight line?"],
    /* the warm-up: two tags written into the columns by the pencil, a whole amount with its two zeros */
    warm: { a: "25.60", b: "8", na: "ball", nb: "top", ka: "tag", kb: "tag" },
    steps: [
      { say: "Tap the tag Rs 25.60 to write it in the Rupees and Paise columns.", on: "tag-a", hint: "Tap the first price tag on the right." },
      { say: "Now tap the tag Rs 8: a whole rupee amount gets two zeros.", on: "tag-b", hint: "Tap the second price tag." },
    ],
    stepHold: 2000,
    ladder: ["Rupees stay left of the dot line and paise stay right of it.", "Type the two paise digits first, then the rupees, then press Enter."],
    closing: "Rupees go under rupees, paise go under paise, and the dots make one line.",
    learned: "You learned: rupees under rupees, paise under paise, dots in one line.",
    traceback: "The dot line lights, then the Rupees column, then the Paise column (a whole amount's paise cells blink); the child writes the amount.",
    items: [
      /* learn MC1: answer in the plan = The 7 goes under the 3 of 13, in the Rupees column. The dots make one straight line.
         Asked here as: write Rs 7.85 into the second row; the 7 lands under the 3 and the dots line up (owner: arrange the amounts in the columns) */
      { qid: "M1.S2.T5.C21:MC1", kind: "write", a: "13.40", b: "7.85", na: "doll", nb: "kite", ka: "tag", kb: "tag",
        say: "Write the kite's price under the doll's price.", ask: "Kite's price in columns?",
        parts: MC_PARTS, cardName: "answer", answer: ["85", "7"], near: "78.5", miss: "The rupees go left of the dot and the paise go right of it.",
        win: "Yes, the kite's dot stands right under the doll's dot." },
      /* practice 1: answer in the plan = Two zeros, 00. The balloon is Rs 9.00, with its dot in line with the dot of Rs 23.45 */
      { qid: "M1.S2.T5.C21:1", kind: "write", a: "23.45", b: "9", na: "mask", nb: "balloon", ka: "tag", kb: "tag",
        say: "Now write the balloon's price under the mask's price.", ask: "Balloon's price?",
        parts: MC_PARTS, cardName: "answer", answer: ["00", "9"], near: "9.0", miss: "Rs 9 is all rupees, so what goes in the paise cells?",
        win: "Yes, Rs 9 is written with two zeros after the dot." },
      /* practice 5: answer in the plan = Rs 126.05 has three digits and Rs 6.40 has one. The 6 stands under the last digit of 126, so the dots line up */
      { qid: "M1.S2.T5.C21:5", kind: "write", a: "126.05", b: "6.40", na: "game", nb: "cap", ka: "tag", kb: "tag",
        say: "Write the cap's price under Rs 126.05, the dots in one line.", ask: "Cap's price?",
        parts: MC_PARTS, cardName: "answer", answer: ["40", "6"], near: "64.0", miss: "Count the rupee cells from the dot, not from the left edge.",
        win: "Yes, the 6 stands under the last rupee digit of 126." },
    ],
  },
  {
    n: 2,
    concept: "Adding: a hundred paise carry one rupee",
    conceptId: "M1.S2.T5.C22", objectiveIds: ["O7"],
    says: ["Add the paise first. Do they make a hundred or more?"],
    warm: { a: "12.60", b: "24.70", op: "+", na: "book", nb: "bag", ka: "tag", kb: "tag" },
    steps: [
      { say: "Add the paise first: tap the paise of the two prices.", on: "paise", hint: "Tap the paise cells on the right of the dot." },
      { say: "60 and 70 paise make more than 100, so tap Carry to send Rs 1 over.", on: "carry", hint: "Tap the Carry key under the price tags." },
    ],
    stepHold: 2000,
    ladder: ["Work one column at a time from the right and type its whole sum.", "A sum of 10 or more sends its 1 up to the next column when you press Enter."],
    closing: "Add the paise first, and carry Rs 1 for every 100 paise.",
    learned: "You learned: add the paise first and carry Rs 1 for 100 paise.",
    traceback: "The paise column lights; when the paise make 100 or more a bundle of 100 paise slides over and the pencil writes the carried 1; the rupees light; the child writes the sum.",
    items: [
      /* learn MC2: answer in the plan = Rs 38.15 */
      { qid: "M1.S2.T5.C22:MC2", kind: "add", a: "15.30", b: "22.85", op: "+", na: "fish bowl", nb: "fish food", ka: "tag", kb: "tag",
        say: "Fish food is Rs 22.85 and a fish bowl Rs 15.30, so how much in all?", ask: "Bowl and food in all?",
        pad: "enter", answer: ["15", "38"], near: "37.15", miss: "Count again: 30 paise and 85 paise make how many paise?",
        win: "Yes, 100 paise went over to the rupees as Rs 1." },
      /* practice 2: answer in the plan = Rs 45.55 */
      { qid: "M1.S2.T5.C22:2", kind: "add", a: "31.20", b: "14.35", op: "+", na: "bus", nb: "train", ka: "tag", kb: "tag",
        say: "A bus ticket is Rs 31.20 and a train ticket Rs 14.35: add them in the columns.", ask: "Two tickets together?",
        pad: "enter", answer: ["55", "45"], near: "46.55", miss: "Add the paise, then the rupees, each in its own column.",
        win: "Yes, these paise made less than 100, so nothing was carried." },
      /* practice 6: answer in the plan = Rs 84.55, because 90 paise and 65 paise make more than a hundred, so write 55 and carry Rs 1 */
      { qid: "M1.S2.T5.C22:6", kind: "add", a: "57.90", b: "26.65", op: "+", na: "toys", nb: "books", ka: "bill", kb: "bill",
        say: "What is the total of the two bills, Rs 57.90 and Rs 26.65?", ask: "Total of the bills?",
        pad: "enter", answer: ["55", "84"], near: "83.55", miss: "Add the paise first: 90 paise and 65 paise make how many paise?",
        win: "Yes, the carried 1 joined the rupees column." },
    ],
  },
  {
    n: 3,
    concept: "Subtracting: one rupee borrowed is a hundred paise",
    conceptId: "M1.S2.T5.C23", objectiveIds: ["O8"],
    says: ["Look at the top paise. Are there enough to take away?"],
    warm: { a: "52.30", b: "18.45", op: "-", na: "shoes", nb: "socks", ka: "tag", kb: "tag" },
    steps: [
      { say: "Tap the paise: are 30 paise enough to take 45 paise away?", on: "paise", hint: "Tap the paise cells right of the dot." },
      { say: "30 is fewer than 45, so tap Borrow to break Rs 1 into 100 paise.", on: "borrow", hint: "Tap the Borrow key under the price tags." },
    ],
    stepHold: 2400,
    ladder: ["Work one column at a time from the right, top take away bottom.", "Compare the top paise with the bottom paise before you take away."],
    closing: "Borrow Rs 1 as 100 paise, take the paise, then take the rupees.",
    learned: "You learned: borrow Rs 1 as 100 paise when the top paise are too few.",
    traceback: "The paise column lights; when the top paise are too few a Rs 1 coin breaks into 100 paise and the pencil writes the new rupees and paise above; the rupees light; the child writes the difference.",
    items: [
      /* learn MC3: answer in the plan = Rs 38.75 */
      { qid: "M1.S2.T5.C23:MC3", kind: "sub", a: "80.10", b: "41.35", op: "-", na: "pencil box", nb: "ruler", ka: "tag", kb: "tag",
        say: "A pencil box is Rs 80.10 and a ruler Rs 41.35: how much more is the box?", ask: "How much more?",
        pad: "enter", answer: ["75", "38"], near: "39.75", miss: "10 paise cannot give 35 paise, so the rupees must help.",
        win: "Yes, the borrowed rupee gave the paise 100 more." },
      /* practice 3: answer in the plan = No. The answer is Rs 25.40, because 90 paise is more than 50 paise.
         Asked here as the difference (a typed amount), with no borrow needed */
      { qid: "M1.S2.T5.C23:3", kind: "sub", a: "38.90", b: "13.50", op: "-", na: "scarf", nb: "cap", ka: "tag", kb: "tag",
        say: "From Rs 38.90, take away Rs 13.50 in the columns.", ask: "Rs 38.90 take Rs 13.50?",
        pad: "enter", answer: ["40", "25"], near: "24.40", miss: "Take the bottom paise from the top paise, then the rupees.",
        win: "Yes, 90 paise were enough, so nothing was borrowed." },
      /* practice 7: answer in the plan = Rs 32.40. Rs 50.00 has no paise to take 60 from, so borrow Rs 1: 100 paise minus 60 paise is 40 paise, and Rs 49 minus Rs 17 is Rs 32 */
      { qid: "M1.S2.T5.C23:7", kind: "sub", a: "50.00", b: "17.60", op: "-", na: "toy car", nb: "toy bus", ka: "tag", kb: "tag",
        say: "A toy car costs Rs 50 and a toy bus Rs 17.60, so how much more is the car?", ask: "Car costs how much more?",
        pad: "enter", answer: ["40", "32"], near: "33.40", miss: "The top has 00 paise, so borrow Rs 1 as 100 paise.",
        win: "Yes, 50 rupees became 49 rupees and 100 paise." },
    ],
  },
  {
    n: 4,
    concept: "Money problems: in all, left, change",
    conceptId: "M1.S2.T5.C24", objectiveIds: ["O8"],
    says: ["Read the story. Do we put money together or take money away?"],
    warm: { a: "20.50", b: "5.25", op: "+", na: "pen", nb: "pencil", ka: "tag", kb: "tag" },
    steps: [
      { say: "A pen is Rs 20.50 and a pencil Rs 5.25: tap Add to find the cost in all.", on: "add", hint: "In all puts money together, so tap Add." },
    ],
    stepHold: 2000,
    ladder: ["Choose Add to put money together, or Take away for what is left.", "Type the paise answer first, then each rupee column from the right."],
    closing: "Add to find how much in all, and take away to find what is left.",
    learned: "You learned: add for in all, take away for what is left or change.",
    traceback: "A wrong sign is written again as the right one; the paise column lights; a carry or a borrow is shown; the rupees light; the child writes the answer.",
    items: [
      /* learn MC4: answer in the plan = She spends Rs 65.75 and gets Rs 34.25 change. Asked here: the change from the Rs 100 note
         for the Rs 65.75 she spends (one answer a question; phase 4 then has change, left and the bill) */
      { qid: "M1.S2.T5.C24:MC4", kind: "story", a: "100", b: "65.75", op: "-", na: "note", nb: "bill", ka: "note", kb: "bill",
        say: "Mina pays for Rs 65.75 with a Rs 100 note, so how much change does she get?", ask: "Change from Rs 100?",
        pad: "enter", answer: ["25", "34"], near: "165.75", miss: "Change means take the bill away from the note.",
        win: "Yes, the bill taken from the note leaves the change." },
      /* practice 4: answer in the plan = Rs 54.25 */
      { qid: "M1.S2.T5.C24:4", kind: "story", a: "86.50", b: "32.25", op: "-", na: "purse", nb: "puzzle", ka: "purse", kb: "tag",
        say: "A girl has Rs 86.50 and buys a puzzle for Rs 32.25, so how much money is left?", ask: "Money left?",
        pad: "enter", answer: ["25", "54"], near: "118.75", miss: "Money left means take the price away from the purse money.",
        win: "Yes, taking the price away leaves the rest in the purse." },
      /* practice 8: answer in the plan = The bill is Rs 146.25 and the change is Rs 53.75. Asked here: the bill (one answer a question) */
      { qid: "M1.S2.T5.C24:8", kind: "story", a: "98.75", b: "47.50", op: "+", na: "bag", nb: "bottle", ka: "tag", kb: "tag",
        say: "A bag costs Rs 98.75 and a bottle Rs 47.50, so how much is the bill?", ask: "How much is the bill?",
        pad: "enter", answer: ["25", "146"], near: "51.25", miss: "A bill puts all the prices together.",
        win: "Yes, 125 paise gave Rs 1 to the rupees, and the bill is complete." },
    ],
  },
];

/* each win line is read to its end before the Next key (classroom-pieces): winMs = its reading time */
PHASES.forEach((P: any) => P.items.forEach((it: any) => { it.winMs = Math.max(2400, 68 * String(it.win).length); }));

/* the hint for a wrong STEP of the column entry (phases 2 to 4): it replaces the item's own miss for that one miss */
const MC_STEP_MISS: any = {
  paiseAdd: "Add the two paise again and type the whole sum.",
  paiseAddCarry: "Two paise amounts can make more than 100, so type the whole sum.",
  paiseSub: "Take the bottom paise from the top paise again.",
  paiseSubBorrow: "The top paise are too few, so think of Rs 1 as 100 more paise.",
  colAdd: "Add this column again, with the carried 1 if there is one.",
  colSub: "Take the bottom digit from the top digit in this column again.",
  colAdd2: "Look at the small 1 above this column before you add.",
  colAdd3: "Type this column's whole sum, and a 10 or more sends its 1 up.",
  colSub2: "Use the new top digit if this column was borrowed from.",
  colSub3: "Take the bottom digit away from the top digit, then press Enter.",
  paiseSub3: "Take away the paise first, then each rupee column.",
  paiseCmp: "Compare the top paise with the bottom paise before you take away.",
  paiseOrder: "Type the paise answer first, then each rupee column from the right.",
  paiseCount: "Count the paise of both prices together.",
  paiseAddEnter: "Type the paise sum, then press Enter.",
  colAddC: "Add this column again, with the carried 1 on top.",
  colAddC3: "Add the top digit, the bottom digit and the small 1 together.",
  colAddN: "Add the two digits of this column again.",
  colAddN2: "Count on from the top digit by the bottom digit.",
  colAddN3: "Type the sum of this column, then press Enter.",
  colSubB2: "Use the new top digit written above the struck one.",
  colSubN2: "Count back from the top digit by the bottom digit.",
  colSubN3: "Type what is left in this column, then press Enter.",
};
/* the column entry, worked out for a pair and a sign: the paise step, then each rupee column from the right */
const mcSteps = (it: any, op: any) => {
  const A = mcSplit(it.a), B = mcSplit(it.b), ap = Number(A.p), bp = Number(B.p);
  const dig = (s: string, k: number) => Number(s[s.length - 1 - k] || 0);
  const cols: any[] = [];
  if (op === "+") {
    const ps = ap + bp; let c = ps >= 100 ? 1 : 0;
    const n = Math.max(A.r.length, B.r.length);
    for (let k = 0; k < n || c; k++) { const t = dig(A.r, k) + dig(B.r, k) + c; cols.push({ expect: t, digit: t % 10, out: t >= 10 }); c = t >= 10 ? 1 : 0; }
    return { paise: ps, carry: ps >= 100, borrow: false, p: String(ps % 100).padStart(2, "0"), cols };
  }
  const borrow = ap < bp, pd = ap + (borrow ? 100 : 0) - bp, top = String(Number(A.r) - (borrow ? 1 : 0));
  let bw = 0;
  for (let k = 0; k < top.length; k++) { let t = dig(top, k) - bw - dig(B.r, k); bw = t < 0 ? 1 : 0; if (t < 0) t += 10; cols.push({ expect: t, digit: t, out: false }); }
  return { paise: pd, carry: false, borrow, p: String(pd).padStart(2, "0"), cols };
};

/* free play: three pairs of prices (each top amount is the bigger, so both signs work) */
const MC_FREE = [
  { a: "24.60", b: "18.75", na: "toy", nb: "book", ka: "tag", kb: "tag" },
  { a: "60.00", b: "25.40", na: "bag", nb: "cap", ka: "tag", kb: "tag" },
  { a: "42.80", b: "35.50", na: "kite", nb: "ball", ka: "tag", kb: "tag" },
];

const MODEL = { cell: MCG.cw, rupeeCells: 3, paiseCells: 2, partsOrder: "paise, rupees", colours: { rupees: MC_BLUE, paise: MC_VERM, price: MC_AMBER, answer: MC_GREEN } };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: the paise digit for digit ("05" is not "5", "00" is not "0"), the rupees by value */
/* phase 4: the sign the child chose (set by Work); a wrong sign is a miss even when the digits are right */
let MC_NOW: any = { item: null, op: null };
const judge = (item: any, v: any) => {
  if (item.kind === "story" && MC_NOW.item === item && MC_NOW.op && MC_NOW.op !== item.op) return false;
  const [p, r] = mcParts(v), [wp, wr] = mcParts(item.answer);
  return p !== "" && r !== "" && p === wp && Number(r) === Number(wr);
};
/* oracle: every answer worked again by the column method, digit by digit with its carries and borrows (no code shared) */
const oracle = () => PHASES.every((P: any) => P.items.every((it: any) => {
  const cols = (s: string) => { const k = s.indexOf("."); const r = k < 0 ? s : s.slice(0, k), q = k < 0 ? "00" : (s.slice(k + 1) + "00").slice(0, 2); return (r.padStart(3, "0") + q).split("").map(Number); };
  const A = cols(it.a), B = cols(it.b), want = it.answer[1] + "." + it.answer[0];
  if (!it.op) return want === String(Number(B.slice(0, 3).join(""))) + "." + B.slice(3).join("");
  const out: number[] = []; let c = 0;
  for (let i = 4; i >= 0; i--) {
    let d = it.op === "+" ? A[i] + B[i] + c : A[i] - B[i] - c;
    if (it.op === "+") { c = d >= 10 ? 1 : 0; d = d % 10; } else { c = d < 0 ? 1 : 0; d = (d + 10) % 10; }
    out.unshift(d);
  }
  return c === 0 && want === String(Number(out.slice(0, 3).join(""))) + "." + out.slice(3).join("");
}));
/* the misconception's answer (the carried rupee forgotten, the borrowed rupee forgotten, the wrong sign, the parts swapped) */
const nearMiss = (item: any) => mcParts(item.near).join("|");
/* the written form of an answer ["15", "38"] -> "38.15"; the forms no question, hint or ladder line may print */
const mcWritten = (item: any) => { const [p, r] = mcParts(item.answer); return String(Number(r)) + "." + p; };
const answerForms = (item: any) => [mcWritten(item), "Rs " + mcWritten(item)];
/* the answer as the teacher agent gives it: the card's two boxes in their order, [paise, rupees] */
const agentKey = (item: any) => mcParts(item.answer);

const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer(): "38.15", [paise, rupees] or "paise|rupees" fills the card's boxes in their order */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : item.parts && HOOK.type ? HOOK.type(mcParts(v)) : undefined);
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* does this pair need a carry (op "+") or a borrow (op "-")? */
const mcNeeds = (it: any, op: any) => {
  if (!it || !op) return false;
  const A = mcSplit(it.a), B = mcSplit(it.b);
  return op === "+" ? Number(A.p) + Number(B.p) >= 100 : Number(A.p) < Number(B.p);
};

/* ── the working area ──────────────────────────────────────────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, part, captured, api, step, stepOn, box, answerOn, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const G = MCG;
  const free = stage === "free";
  const demo = !free && (stage === "demo" || stage === "teach") && !!phase.warm;
  const p1 = n === 1 && !free;

  /* the board is keyed to the ENTRY (PATTERNS 18): a fresh board whenever the question (or warm-up, or free play) changes */
  const qk = free ? "free" : n + "|" + (demo ? "w" : index);
  const ent = useRef({ k: "", e: 0 });
  if (ent.current.k !== qk) ent.current = { k: qk, e: ent.current.e + 1 };
  const E = ent.current.e;
  const fresh = (): any => ({ e: E, wa: 0, wb: 0, op: null, sg: 0, carried: false, borrowed: false, pc: 0, anim: "", at: 0, lit: [], touched: false, nudged: false, pair: 0, tb: false,
    entered: false, step: 0, buf: "", accP: null, accR: [], cc: [], done: false, given: null, mk: null });
  const [raw, setRaw] = useState(fresh);
  const S = raw.e === E ? raw : fresh();
  const SR = useRef(S); SR.current = S;
  const put = (o: any) => {
    SR.current = { ...(SR.current && SR.current.e === E ? SR.current : fresh()), ...o };   /* read at once by the next key in the same tick */
    setRaw((p: any) => ({ ...(p.e === E ? p : fresh()), ...o }));
  };

  const it: any = free ? MC_FREE[S.pair % MC_FREE.length] : demo ? phase.warm : item;
  const op = free || n === 4 ? (demo && step > 0 ? phase.warm.op : S.op) : it.op || null;
  const A = mcSplit(it.a), B = mcSplit(it.b);
  const actKey = op === "+" ? "carry" : op === "-" ? "borrow" : null;
  const done = op === "+" ? S.carried : S.borrowed;
  /* the answer gate (the same neutral act on every question of a phase): P2 and P3 the paise column worked first, P4 the sign chosen */
  /* phases 2 to 4: the answer is entered column by column, right to left, on the answer row (the owner, 2026-11-16). The gate:
     phase 4 the sign first, then (every phase) a tap on the blinking answer row, which lends the keypad to the row */
  const signNeed = !free && !demo && stage === "ask" && n === 4 && !S.op;
  const needAct = !free && !demo && stage === "ask" && !p1 && (signNeed || !S.entered);
  const entryOn = !free && !demo && !p1 && (stage === "ask" || stage === "win" || stage === "idle");
  const ST = !p1 && !free && (n !== 4 || S.op) ? mcSteps(it, n === 4 ? S.op : it.op) : null;
  /* the hint (the Hint key and each miss) follows the step the child is on: the paise step, then the rupee columns; in phase 4 the
     sign hint (the item's own miss and the phase ladder) only while no sign or a wrong sign is chosen */
  if (!p1 && !free && item && stage === "ask") {
    if (item._m0 === undefined) { item._m0 = item.miss; item._l0 = item.ladder; }
    const o = n === 4 ? S.op : item.op, M: any = MC_STEP_MISS;
    let rungs: any = null;
    if (n === 4 && (!S.op || S.op !== item.op)) rungs = null;
    else if (S.step === 0) rungs = o === "+" ? [n === 4 ? M.paiseAdd : item._m0, n === 4 ? M.paiseCount : M.paiseAdd, ST && ST.carry ? M.paiseAddCarry : M.paiseAddEnter]
      : [n === 4 ? M.paiseSub : item._m0, M.paiseCmp, ST && ST.borrow ? M.paiseSubBorrow : M.paiseSub3];
    else {
      const c = S.step - 1, cin = !!ST && (c === 0 ? ST.carry : !!(ST.cols[c - 1] && ST.cols[c - 1].out)), bwd = !!ST && ST.borrow && c === 0;
      rungs = o === "+" ? (cin ? [M.colAddC, M.colAdd2, M.colAddC3] : [M.colAddN, M.colAddN2, M.colAddN3])
        : (bwd ? [M.colSub, M.colSubB2, M.colSub3] : [M.colSub, M.colSubN2, M.colSubN3]);
    }
    if (rungs) { item.miss = rungs[0]; item.ladder = [rungs[1], rungs[2]]; } else { item.miss = item._m0; item.ladder = item._l0; }
  }
  if (!free && n === 4) MC_NOW = { item, op: S.op };

  const tok = useRef(0);
  const busy = useRef(false);
  const lastKey = useRef(0), lastId = useRef("");
  const actingRef = useRef(false);
  const capRef = useRef(false); capRef.current = !!captured;   /* keys are queued only for a keypad lent to the answer row */   /* a carry / borrow pencil act is playing: the runtime takes no key then, so the keyboard is kept here */
  const nap = (ms: number) => new Promise((r) => setTimeout(r, reducedMotion() ? 0 : ms));

  /* ── the acts, each performed on screen ── */
  const rowTok = (amt: any, base: number) => {
    const s = mcSplit(amt);
    return { tool: "pencil", moves: "write", text: [s.r, { dab: [G.dotX, base - 6] }, s.p], at: [{ x: G.r1 - s.r.length * G.cw, y: base }, null, { x: G.p0, y: base }],
      size: [MC_D, MC_D, MC_D], step: [G.cw, 0, G.cw], align: "start", color: [MC_BLUE_INK, MC_INK, MC_VERM_INK] };
  };
  const writeRow = async (which: string) => {
    const base = which === "a" ? G.base(G.row1) : G.base(G.row2);
    const ok = await api.act({ ...rowTok(which === "a" ? it.a : it.b, base), onPoint: (j: number) => put(which === "a" ? { wa: j + 1 } : { wb: j + 1 }) });
    if (ok) put(which === "a" ? { wa: 3 } : { wb: 3 });
    return ok;
  };
  const markPaise = async () => {
    const y = G.row2.y + G.row2.h + 6;
    const ok = await api.act({ tool: "pencil", moves: "draw", marks: true, from: { x: G.p0 + 4, y }, at: [{ x: G.p0 + G.cw, y }], to: { x: G.p1 - 4, y } });
    if (ok) put({ lit: ["pai"], paiseDone: true, lk: Date.now() });
    return ok;
  };
  const writeSign = async (o: string) => {
    put({ op: o, sg: 0, carried: false, borrowed: false, pc: 0, step: 0, buf: "", accP: null, accR: [], cc: [], done: false });
    const ok = await api.act({ tool: "pencil", moves: "write", text: [o === "+" ? "+" : "-"], at: [{ x: G.signX, y: G.base(G.row2) }], size: MC_D, align: "middle", color: MC_INK, onPoint: () => put({ sg: 1 }) });
    if (ok) put({ sg: 1, lk: Date.now() });
    return ok;
  };
  const carryX = G.r1 - G.cw / 2;
  const doCarry = async () => {
    put({ anim: "carry", at: 1, pc: 0 }); api.sfx.tick();
    await nap(80); put({ at: 2 });
    await nap(620); put({ at: 3 }); api.sfx.trade();
    await nap(160);
    actingRef.current = true; const ok = await api.act({ tool: "pencil", moves: "write", text: ["1"], at: [{ x: carryX, y: G.cBase }], size: MC_C, align: "middle", color: MC_BLUE_INK, onPoint: () => put({ pc: 1 }) }); actingRef.current = false;
    put({ anim: "", at: 0, ...(ok ? { carried: true } : {}) });
    return ok;
  };
  const strikeR = () => { const y = G.row1.y + G.row1.h / 2; return [G.r1 - A.r.length * G.cw + 8, y + 10, G.r1 - 8, y - 10]; };
  const strikeP = () => { const y = G.row1.y + G.row1.h / 2; return [G.p0 + 8, y + 10, G.p1 - 8, y - 10]; };
  const newR = String(Number(A.r) - 1), newP = String(Number(A.p) + 100);
  const doBorrow = async () => {
    put({ anim: "borrow", at: 1, pc: 0 }); api.sfx.tick();
    await nap(350); put({ at: 2 }); api.sfx.trade();
    await nap(620); put({ at: 3 });
    await nap(80);
    actingRef.current = true; const ok = await api.act({ tool: "pencil", moves: "write",
      text: [{ line: strikeR(), size: MC_D }, newR, { line: strikeP(), size: MC_D }, newP],
      at: [null, { x: G.r1 - newR.length * G.cw, y: G.cBase }, null, { x: G.p0 + G.cw, y: G.cBase }],
      size: [MC_D, MC_C, MC_D, MC_C], step: [0, G.cw, 0, 0], align: ["start", "start", "start", "middle"], color: [MC_INK, MC_BLUE_INK, MC_INK, MC_VERM_INK],
      onPoint: (j: number) => put({ pc: j + 1 }) }); actingRef.current = false;
    put({ anim: "", at: 0, ...(ok ? { borrowed: true } : {}) });
    return ok;
  };

  /* a carry written into the carry cell above rupee column k (k = 1 tens, 2 hundreds) */
  const colCarryX = (k: number) => G.r0 + (2 - k) * G.cw + G.cw / 2;
  const writeColCarry = async (k: number) => {
    actingRef.current = true; const ok = await api.act({ tool: "pencil", moves: "write", text: ["1"], at: [{ x: colCarryX(k), y: G.cBase }], size: MC_C, align: "middle", color: MC_BLUE_INK }); actingRef.current = false;
    const cc = SR.current.cc.slice(); cc[k] = true;
    put({ cc });
    return ok;
  };
  /* the typed carry digit (the 1 of 115 or of 14) flies up from the answer row into its carry cell; k = 0 the ones column (from the paise) */
  const flyCarry = async (fromX: number, toX: number, k: number) => {
    const tx = k === 0 ? carryX : toX;
    put({ fly: { x0: fromX, y0: G.base(G.ans), x1: tx, y1: G.cBase, go: false } });
    await nap(30); put({ fly: { x0: fromX, y0: G.base(G.ans), x1: tx, y1: G.cBase, go: true } }); api.sfx.trade();
    await nap(560);
    if (k === 0) put({ fly: null, carried: true });
    else { const cc = SR.current.cc.slice(); cc[k] = true; put({ fly: null, cc }); }
    api.sfx.settle();
  };
  /* the borrow on the paise Enter: Rs 1 becomes 100 paise (the coin, the bundle) and the new top amounts are written in */
  const borrowQuiet = async () => {
    put({ anim: "borrow", at: 1, pc: 0 }); api.sfx.tick();
    await nap(300); put({ at: 2 }); api.sfx.trade();
    await nap(620); put({ at: 3 });
    for (let j = 1; j <= 4; j++) { await nap(140); put({ pc: j }); }
    put({ anim: "", at: 0, borrowed: true });
  };
  /* a wrong step: one miss for the question (tries, hint ladder, correction); its own hint for that one miss */
  const stepMiss = (line: string, mk: any) => {
    put({ mk, buf: "" });
    const keep = item.miss;
    item.miss = line;
    try { api.submit("step:" + mk.step); } finally { item.miss = keep; }
  };
  const keyRef = useRef((k: string, queued?: boolean) => {});
  const pendKeys = useRef<string[]>([]);
  /* after a carry or borrow plays, the keys the child typed meanwhile go to the next column, in order */
  const flushKeys = () => {
    const next = () => { if (busy.current || !pendKeys.current.length) return; const k = pendKeys.current.shift() as string; keyRef.current(k, true); setTimeout(next, 30); };
    setTimeout(next, 30);
  };
  /* keyOnly: the question comes back in place of a hint once the act has ended and the pad is unlocked again */
  const questionBack = () => { setTimeout(() => api.openAnswer(), 80); };
  keyRef.current = (k: string, queued?: boolean) => {
    const s0 = SR.current;
    /* while a carry or borrow plays, or while keys typed then are still being replayed, a new key waits its turn behind them */
    if ((busy.current || (!queued && pendKeys.current.length)) && stage === "ask" && !s0.done) { if (k !== "clear" && pendKeys.current.length < 12 && !(k === "enter" && pendKeys.current[pendKeys.current.length - 1] === "enter")) { pendKeys.current.push(k); if (!busy.current) flushKeys(); } return; }
    if (stage !== "ask" || !ST || s0.done || s0.tb) return;
    const max = s0.step === 0 ? 3 : 2;
    if (k === "clear") { put({ buf: "" }); return; }
    if (k === "back") { put({ buf: s0.buf.slice(0, -1) }); return; }
    if (/^[0-9]$/.test(k)) { if (s0.buf.length < max) put({ buf: s0.buf + k }); return; }
    if (k !== "enter" || s0.buf === "") return;
    const v = Number(s0.buf), o = n === 4 ? s0.op : it.op;
    if (s0.step === 0) {
      if (v !== ST.paise) {
        const A0 = mcSplit(it.a), B0 = mcSplit(it.b);
        const line = o === "+" ? (ST.carry && v === ST.paise % 100 ? MC_STEP_MISS.paiseAddCarry : MC_STEP_MISS.paiseAdd)
          : (ST.borrow && v === Number(B0.p) - Number(A0.p) ? MC_STEP_MISS.paiseSubBorrow : MC_STEP_MISS.paiseSub);
        stepMiss(line, { step: 0 }); return;
      }
      api.sfx.tick();
      put({ accP: ST.p, buf: "" });
      busy.current = true;
      (async () => {
        if (ST.carry && !SR.current.carried) await flyCarry(slotX(2), carryX, 0);
        if (ST.borrow && !SR.current.borrowed) await borrowQuiet();
        busy.current = false;
        put({ step: 1 });
        questionBack();   /* keyOnly: an accepted column brings the question back in place of a hint */
        flushKeys();
      })();
      return;
    }
    const c = s0.step - 1, col = ST.cols[c];
    if (v !== col.expect) { stepMiss(item.miss, { step: s0.step, col: c }); return; }
    api.sfx.tick();
    const accR = [...s0.accR]; accR[c] = col.digit;
    put({ accR, buf: "" });
    busy.current = true;
    (async () => {
      if (col.out && c + 1 <= 2) await flyCarry(slotX(c + 3), colCarryX(c + 1), c + 1);
      busy.current = false;
      if (c + 1 >= ST.cols.length) {
        const r = String(Number(accR.slice().reverse().join("")));
        put({ done: true, step: s0.step + 1, given: [ST.p, r] });
        api.setTyped("");
        api.capture(null);
        api.submit([ST.p, r]);
      } else { put({ step: s0.step + 1 }); questionBack(); flushKeys(); }
    })();
  };
  const capFn = useRef((k: string) => keyRef.current(k)).current;
  /* while a carry or borrow pencil act plays the runtime drops every key: keep the keyboard's digits, Backspace and Enter for the next column */
  useEffect(() => {
    const on = (e: any) => {
      if (!actingRef.current || !capRef.current) return;
      const k = /^[0-9]$/.test(e.key) ? e.key : e.key === "Enter" ? "enter" : e.key === "Backspace" ? "back" : "";
      if (k && pendKeys.current.length < 12 && !(k === "enter" && pendKeys.current[pendKeys.current.length - 1] === "enter")) pendKeys.current.push(k);
    };
    /* a tap on a keypad key in that window: queued the same way (and kept from the dimmed key, so it never fires twice) */
    const tapOn = (e: any) => {
      if (!actingRef.current || !capRef.current) return;
      const el = e.target && e.target.closest ? e.target.closest("[data-control]") : null;
      const id = el ? String(el.getAttribute("data-control")) : "";
      const m = /^key-(\d|enter|back)$/.exec(id);
      if (!m) return;
      e.stopPropagation(); e.preventDefault();
      if (pendKeys.current.length < 12 && !(m[1] === "enter" && pendKeys.current[pendKeys.current.length - 1] === "enter")) pendKeys.current.push(m[1]);
    };
    window.addEventListener("keydown", on, true);
    window.addEventListener("pointerdown", tapOn, true);
    return () => { window.removeEventListener("keydown", on, true); window.removeEventListener("pointerdown", tapOn, true); };
  }, []);
  /* the lent keypad's own box shows what the child is typing for this column (the same digits as the board) */
  useEffect(() => { if (captured && stage === "ask" && !S.tb) api.setTyped(S.buf); }, [S.buf, captured]);
  useEffect(() => { if (!captured && S.buf) { put({ buf: "" }); if (stage === "ask") api.setTyped(""); } pendKeys.current = []; }, [captured]);

  /* one act, safe to start twice */
  const act = (id: string) => {
    if (busy.current) return;
    const go = (fn: () => Promise<any>, after?: () => void) => {
      busy.current = true;
      fn().then((ok: any) => { busy.current = false; if (ok && after) after(); flushKeys(); }, () => { busy.current = false; flushKeys(); });
    };
    if (id === "tag-a") return S.wa >= 3 ? api.did("tag-a") : go(() => writeRow("a"), () => api.did("tag-a"));
    if (id === "tag-b") return S.wb >= 3 ? api.did("tag-b") : go(() => writeRow("b"), () => api.did("tag-b"));
    if (id === "paise") return go(markPaise, () => { if (stage === "demo" || stage === "teach") api.did("paise"); });
    if (id === "row") {
      if (signNeed) { api.say("Choose Add or Take away first."); put({ nudged: true }); return; }
      put({ entered: true });
      api.capture(capFn);
      return;
    }
    if (id === "new") { put({ pair: (S.pair + 1) % MC_FREE.length, op: null, sg: 0, carried: false, borrowed: false, pc: 0, lit: [] }); api.sfx.settle(); return; }
    if (id === "add" || id === "sub") { if (SR.current.op === (id === "add" ? "+" : "-")) { api.did(id); return; } return go(() => writeSign(id === "add" ? "+" : "-"), () => api.did(id)); }
    if (id === "carry" || id === "borrow") {
      if (done) { api.did(id); return; }
      if (!mcNeeds(it, op)) {
        if (stage === "ask" || free) {
          if (id === "carry") api.say("These paise make less than 100, so there is nothing to carry.");
          else api.say("The top paise are enough, so there is nothing to borrow.");
          if (stage === "ask") put({ nudged: true });
        } else api.did(id);
        return;
      }
      go(id === "carry" ? doCarry : doBorrow, () => { api.sfx.settle(); api.did(id); });
    }
  };
  /* a child's own tap on a control */
  const tap = (id: string) => {
    if (Date.now() - lastKey.current < 400 && lastId.current === id) return;
    lastKey.current = Date.now(); lastId.current = id;
    if (S.tb) return;
    if (stage === "ask" && S.nudged) { api.say(item.say); put({ nudged: false }); }
    if (!S.touched) put({ touched: true });
    if (stage === "demo" || stage === "teach") {
      if (!stepOn) return;
      if (id !== stepOn) { api.did(id); return; }
    } else if (stage !== "ask" && !free) return;
    act(id);
  };
  /* Enter outside the lent keypad (the corner key, or the agent's check()): the finished entry is sent; before the row is tapped, a nudge */
  const askEnter = () => {
    const s0 = SR.current;
    if (s0.done && s0.given) { api.submit(s0.given); return; }
    if (signNeed) { api.say("Choose Add or Take away first."); put({ nudged: true }); return; }
    if (!captured && !s0.tb) { act("row"); return; }
  };
  api.onEnter(stage === "demo" && stepOn ? () => act(stepOn) : stage === "ask" && !p1 && !free ? askEnter : null);

  /* the agent and the dev driver */
  HOOK.demo = stage === "demo" && stepOn ? () => act(stepOn) : null;
  HOOK.check = stage === "ask" && !p1 ? () => {
    if (n === 4 && !SR.current.op) put({ op: it.op, sg: 1 });
    return undefined;
  } : null;
  /* the agent's answer(): the whole entry at once, as if every column were typed and accepted */
  HOOK.set = stage === "ask" && !p1 ? (v: any) => {
    const [p, r] = mcParts(v);
    if (p === "" || r === "") return false;
    put({ entered: true, done: true, given: [p, r], accP: p.padStart(2, "0").slice(-2), accR: r.split("").reverse().map(Number), step: 99, buf: "" });
    return true;
  } : null;
  HOOK.type = (ps: string[]) => {
    if (ps.some((x) => x === "")) return false;
    api.setTyped(ps.join("|"));
    api.pickPart(1);
    return true;
  };

  /* the answer gate: the card waits for the act (carry, borrow, the sign); the keys lock once the child has touched the board */
  useEffect(() => { if (stage === "ask") api.cardReady(!needAct, needAct); }, [stage, needAct, E]);
  /* (re-run after each act ends: an api.act restores the lock it found when it began) */
  useEffect(() => { if (stage === "ask" && !S.tb) api.lock(signNeed && S.touched); }, [stage, signNeed, S.touched, E, S.lk]);
  /* a question, a phase or free play changes: stop what was playing */
  useEffect(() => () => { tok.current++; tl.stop(); busy.current = false; if (SR.current.tb) api.lock(false); }, [E]);
  /* a nudge or the traceback's lights give way to the child's typing */
  useEffect(() => {
    if (!typed) return;
    if (S.nudged) { api.say(item.say); put({ nudged: false }); }
    if (S.lit.length && !S.tb) put({ lit: [] });
  }, [typed]);
  useEffect(() => {
    if (stage !== "ask" || free || !p1) return;   /* the card caps (phase 1 only); phases 2 to 4 mirror the lent keypad exactly */
    const [p, r] = slotPartsOf(typed, 2);
    if (p.length > 2 || r.length > 3) { api.setTyped(p.slice(0, 2) + "|" + r.slice(0, 3)); return; }
  }, [typed]);
  useEffect(() => { if (box.open && S.nudged && stage === "ask") { api.say(item.say); put({ nudged: false }); } }, [box.open]);
  /* the win line */
  /* the win line; a right answer that needed a carry or a borrow the child never pressed still shows the 100 paise moving */
  useEffect(() => {
    if (stage !== "win" || free || !item) return;
    if (item.win) api.say(item.win);
    const cur = SR.current;
    if (!p1 && mcNeeds(item, item.op) && !(item.op === "+" ? cur.carried : cur.borrowed) && !busy.current) {
      busy.current = true;
      (item.op === "+" ? doCarry() : doBorrow()).then(() => { busy.current = false; }, () => { busy.current = false; });
    }
  }, [stage, index]);

  /* the traceback: replays the working and stops one step before the answer (MISS HIDES THE ANSWER) */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    const my = ++tok.current;
    const alive = () => tok.current === my;
    put({ tb: true, lit: [] });
    api.lock(true);
    (async () => {
      const q = item;
      if (n === 1) {
        put({ lit: ["dot"] }); await nap(800); if (!alive()) return;
        put({ lit: ["dot", "rup"] }); await nap(800); if (!alive()) return;
        put({ lit: ["dot", "rup", "pai", ...(mcSplit(q.b).whole ? ["zeros"] : [])] }); await nap(1000);
      } else {
        /* a wrong STEP lights that column only (the paise, or one rupee column), and for a paise step that needed a borrow it shows
           the borrow: the working one step short, never the digit; a wrong whole answer (phase 4: a wrong sign) rewrites the sign and
           the entry starts again from the paise */
        const mk = String(wrong.value || "").startsWith("step:") ? SR.current.mk : null;
        if (mk && mk.step > 0) {
          put({ lit: ["col" + mk.col] }); await nap(1000);
        } else {
          if (!mk && n === 4 && SR.current.op !== q.op) { await writeSign(q.op); if (!alive()) return; await nap(300); }
          if (!mk) put({ step: 0, buf: "", accP: null, accR: [], cc: [], done: false, given: null });
          put({ lit: ["pai"] }); await nap(500); if (!alive()) return;
          const o = n === 4 ? SR.current.op : q.op, st = mcSteps(q, o);
          if (st.borrow && !SR.current.borrowed && (n !== 4 || mk)) { await doBorrow(); if (!alive()) return; }
          await nap(200);
        }
      }
      if (!alive()) return;
      pendKeys.current = [];
      put({ tb: false });
      api.lock(false);
    })();
  }, [wrong]);

  api.share({ phase: n, top: it.a, bottom: it.b, operation: op, carried: S.carried, borrowed: S.borrowed, plainColumns: false, complete: stage === "idle" });

  /* ── drawing ── */
  const lit = (k: string) => S.lit.includes(k);
  const won = !free && (stage === "win" || stage === "idle");
  const cardRow = p1 ? G.row2 : G.ans;
  const showCard = !free && !demo && (stage === "ask" || won);
  const ps = showCard ? slotPartsOf(typed, 2) : ["", ""];
  const rupeeCellX = (k: number) => G.r0 + k * G.cw;     /* k = 0 hundreds, 1 tens, 2 ones */
  const paiseCellX = (k: number) => G.p0 + k * G.cw;

  const struck = S.borrowed && op === "-";
  const cells = (row: any, key: string, tone: string) => (
    <g key={key}>
      {[0, 1, 2].map((k) => <rect key={"r" + k} x={rupeeCellX(k) + 5} y={row.y} width={G.cw - 10} height={row.h} rx={8} fill={tone !== "plain" && (lit("rup") || (lit("col" + (2 - k)) && !(struck && row === G.row1))) ? tint(MC_BLUE, 0.78) : "#FFFFFF"} stroke="#D8CBB5" strokeWidth={1.5} filter="url(#mc-shadow)" />)}
      {[0, 1].map((k) => <rect key={"p" + k} x={paiseCellX(k) + 5} y={row.y} width={G.cw - 10} height={row.h} rx={8} fill={tone !== "plain" && lit("pai") ? tint(MC_VERM, 0.78) : "#FFFFFF"} stroke="#D8CBB5" strokeWidth={1.5} filter="url(#mc-shadow)" />)}
    </g>
  );
  const dot = (row: any, key: string) => <circle key={key} cx={G.dotX} cy={G.base(row) - 7} r={8} fill={MC_INK} stroke="#FFFDF4" strokeWidth={2} />;
  /* an amount printed in its cells: rupees right-aligned to the dot, paise from the dot */
  const printed = (amt: any, row: any, key: string) => {
    const s = mcSplit(amt), y = G.base(row);
    return (
      <g key={key}>
        {s.r.split("").map((d: string, j: number) => <text key={"r" + j} x={G.r1 - (s.r.length - j - 0.5) * G.cw} y={y} textAnchor="middle" fontSize={MC_D} fontWeight={700} fill={MC_BLUE_INK}>{d}</text>)}
        {s.p.split("").map((d: string, j: number) => <text key={"p" + j} x={paiseCellX(j) + G.cw / 2} y={y} textAnchor="middle" fontSize={MC_D} fontWeight={700} fill={MC_VERM_INK}>{d}</text>)}
      </g>
    );
  };
  /* an amount the pencil is writing / wrote (the same geometry as its act) */
  const penned = (amt: any, row: any, pc: number, key: string) => {
    const s = mcSplit(amt), y = G.base(row);
    return (
      <g key={key}>
        {pc >= 1 && <PencilText text={s.r} x={G.r1 - s.r.length * G.cw} y={y} size={MC_D} align="start" step={G.cw} color={MC_BLUE_INK} />}
        {pc >= 3 && <PencilText text={s.p} x={G.p0} y={y} size={MC_D} align="start" step={G.cw} color={MC_VERM_INK} />}
      </g>
    );
  };
  /* what the child typed on the card: [paise, rupees] */
  const typedRow = () => {
    const y = G.base(cardRow), r = ps[1], p = ps[0];
    return (
      <g pointerEvents="none">
        {/* one text a box (the digits still one a cell, through the x list), so the box reads as the number it holds */}
        {r !== "" && <text x={r.split("").map((_: any, j: number) => G.r1 - (r.length - j - 0.5) * G.cw).join(" ")} y={y} textAnchor="middle" fontSize={MC_D} fontWeight={700} fill={MC_BLUE_INK}>{r}</text>}
        {p !== "" && <text x={p.split("").map((_: any, j: number) => paiseCellX(j) + G.cw / 2).join(" ")} y={y} textAnchor="middle" fontSize={MC_D} fontWeight={700} fill={MC_VERM_INK}>{p}</text>}
      </g>
    );
  };
  const card = () => {
    const y = cardRow.y, h = cardRow.h;
    const full = { x: G.r0, y: y - 2, w: G.p1 - G.r0, h: h + 4 };
    const pRect = { x: G.p0, y: y - 2, w: 2 * G.cw, h: h + 4 };
    const rRect = { x: G.r0, y: y - 2, w: 3 * G.cw - 6, h: h + 4 };
    const ready = !needAct && stage === "ask" && answerOn === "card";
    const caretOf = (j: number) => {
      const r = j === 0 ? pRect : rRect, s = ps[j];
      const cx = j === 0 ? paiseCellX(Math.min(s.length, 2)) - (s.length >= 2 ? 0 : 0) : G.r1;
      return <line x1={j === 0 ? Math.min(cx + 4, r.x + r.w - 6) : cx - 4} y1={y + 12} x2={j === 0 ? Math.min(cx + 4, r.x + r.w - 6) : cx - 4} y2={y + h - 12} stroke={MC_INK} strokeWidth={4} strokeLinecap="round" />;
    };
    return (
      <g>
        {box.open && stage === "ask" && <rect x={(part === 0 ? pRect : rRect).x} y={y - 2} width={(part === 0 ? pRect : rRect).w} height={h + 4} rx={8} fill="none" stroke={C.accent} strokeWidth={4} />}
        {box.open && stage === "ask" && caretOf(part === 0 ? 0 : 1)}
        {typedRow()}
        {/* the card while the act still waits: a tap says what comes first (never a dead key) */}
        {needAct && stage === "ask" && !S.tb && <Hit id="card-wait" x={full.x} y={full.y} w={full.w} h={full.h} label="the answer row" onPress={() => { api.say(n === 4 ? "Choose Add or Take away first." : "Tap the paise column first."); put({ nudged: true, touched: true }); }} />}
        {ready && !box.open && <SlotPartBox id="answer-open" label="Write the answer in the answer row" x={full.x} y={full.y} w={full.w} h={full.h} on={false} enabled={true} onPick={api.openAnswer} />}
        {ready && !box.open && <BlinkRing x={full.x} y={full.y} w={full.w} h={full.h} rx={10} C={C} />}
        {ready && box.open && <SlotPartBox id="part-1" label="paise" x={pRect.x} y={pRect.y} w={pRect.w} h={pRect.h} on={part === 0} enabled={true} onPick={() => api.pickPart(0)} />}
        {ready && box.open && <SlotPartBox id="part-2" label="rupees" x={rRect.x} y={rRect.y} w={rRect.w} h={rRect.h} on={part === 1} enabled={true} onPick={() => api.pickPart(1)} />}
      </g>
    );
  };

  /* phases 2 to 4: the answer row entered column by column, right to left. Slot i counts from the right: 0 and 1 the paise cells,
     2 the rupee ones cell, 3 tens, 4 hundreds. The keypad is lent to the row (api.capture) once the child taps it */
  const slotX = (i: number) => (i < 2 ? paiseCellX(1 - i) + G.cw / 2 : G.r0 + (4 - i) * G.cw + G.cw / 2);
  const entryRow = () => {
    const y = G.ans.y, h = G.ans.h, base = G.base(G.ans);
    const marks: any[] = [];
    const put1 = (i: number, d: string, key: string, ghost?: any) => { if (i <= 4) marks.push(<text key={key} x={slotX(i)} y={base} textAnchor="middle" fontSize={MC_D} fontWeight={700} fill={ghost || (i < 2 ? MC_VERM_INK : MC_BLUE_INK)} fillOpacity={ghost ? 0.5 : 1}>{d}</text>); };
    const shown = S.accP !== null || S.accR.length ? { p: S.accP || "", r: S.accR } : won ? { p: mcParts(item.answer)[0], r: mcParts(item.answer)[1].split("").reverse().map(Number) } : { p: "", r: [] as any[] };
    String(shown.p).split("").reverse().forEach((d: string, i: number) => put1(i, d, "ap" + i));
    shown.r.forEach((d: any, c: number) => { if (d !== undefined && d !== null) put1(c + 2, String(d), "ar" + c); });
    const at0 = S.step === 0 ? 0 : S.step + 1;   /* the slot the typed number ends in */
    const own = S.step === 0 ? 2 : 1;   /* how many slots the step's own answer fills */
    if (stage === "ask" && !S.done) S.buf.split("").reverse().forEach((d: string, i: number) => put1(at0 + i, d, "b" + i, i >= own ? (S.step === 0 ? MC_VERM : MC_BLUE) : null));
    const live = stage === "ask" && !S.done && !S.tb;
    const full = { x: G.r0, y: y - 2, w: G.p1 - G.r0, h: h + 4 };
    const caret = S.step === 0 ? { x: G.p0, w: 2 * G.cw } : { x: G.r0 + (2 - (S.step - 1)) * G.cw + 1, w: G.cw - 2 };
    return (
      <g>
        {live && captured && caret.x >= G.r0 - 2 && <rect x={caret.x} y={y - 2} width={caret.w} height={h + 4} rx={8} fill="none" stroke={C.accent} strokeWidth={4} pointerEvents="none" />}
        <g pointerEvents="none">{marks}</g>
        {live && signNeed && <Hit id="card-wait" x={full.x} y={full.y} w={full.w} h={full.h} label="the answer row" onPress={() => { api.say("Choose Add or Take away first."); put({ nudged: true, touched: true }); }} />}
        {live && !signNeed && <Hit id="answer-row" x={full.x} y={full.y} w={full.w} h={full.h} label="the answer row" enabled={!captured} onPress={() => tap("row")} />}
        {live && !signNeed && !captured && <BlinkRing x={full.x} y={full.y} w={full.w} h={full.h} rx={10} C={C} />}
      </g>
    );
  };

  /* a price tag, a bill, a purse or a note on the right page: the amount in amber (40+), the name under it (32, one line) */
  const priceThing = (k: number) => {
    const b = G.tag(k), amt = k === 0 ? it.a : it.b, name = k === 0 ? it.na : it.nb, kind = k === 0 ? it.ka : it.kb;
    const s = String(amt);
    const chip = { x: b.x + 10, y: b.y + 122, w: b.w - 20, h: 100 };
    const fs = Math.min(46, Math.floor((chip.w - 16) / (s.length * 0.62)));
    const v = Number(mcSplit(amt).r);
    const noteKey = [10, 20, 50, 100, 200, 500].includes(v) ? "note" + v : "note100";   /* the real note of that value */
    return (
      <g key={"thing" + k}>
        {(kind === "tag" || kind === "bill") && <rect x={b.x + 3} y={b.y + 5} width={b.w} height={b.h} rx={12} fill="#000000" fillOpacity={0.12} />}
        {kind === "note" ? (
          <g filter="url(#mc-shadow)">
            <rect x={b.x - 6} y={b.y + 14} width={b.w + 12} height={94} rx={6} fill="#C9B7D6" stroke={shade("#C9B7D6", 0.4)} strokeWidth={2} />
            <Skin name={noteKey} x={b.x - 6} y={b.y + 14} w={b.w + 12} h={94} fit="stretch" />
          </g>
        ) : kind === "purse" ? (
          <g filter="url(#mc-shadow)">
            <rect x={b.x + 8} y={b.y + 10} width={b.w - 16} height={150} rx={40} fill="#B07A45" stroke={shade("#B07A45", 0.4)} strokeWidth={2} />
            <Skin name="purse" x={b.x} y={b.y} w={b.w} h={166} />
          </g>
        ) : kind === "bill" ? (
          <g>
            <path d={`M ${b.x} ${b.y} H ${b.x + b.w} V ${b.y + b.h} ` + Array.from({ length: 8 }, (_, j) => `L ${b.x + b.w - (j + 0.5) * b.w / 8} ${b.y + b.h - 10} L ${b.x + b.w - (j + 1) * b.w / 8} ${b.y + b.h}`).join(" ") + " Z"} fill="#FFF8DC" stroke={shade("#FFF4C8", 0.45)} strokeWidth={2} />
            <Skin name="bill" x={b.x} y={b.y} w={b.w} h={b.h - 10} fit="stretch" />
            {[34, 58, 82, 106].map((yy) => <line key={yy} x1={b.x + 18} y1={b.y + yy} x2={b.x + b.w - (yy === 106 ? 70 : 18)} y2={b.y + yy} stroke="#9C927C" strokeWidth={2.5} strokeLinecap="round" />)}
          </g>
        ) : (
          <g>
            <path d={`M ${b.x + 30} ${b.y} H ${b.x + b.w - 30} L ${b.x + b.w} ${b.y + 34} V ${b.y + b.h - 12} Q ${b.x + b.w} ${b.y + b.h} ${b.x + b.w - 12} ${b.y + b.h} H ${b.x + 12} Q ${b.x} ${b.y + b.h} ${b.x} ${b.y + b.h - 12} V ${b.y + 34} Z`} fill="#E8CFA0" stroke={shade("#E8CFA0", 0.4)} strokeWidth={2} />
            <Skin name="pricetag" x={b.x} y={b.y} w={b.w} h={b.h} fit="stretch" />
            <circle cx={b.x + b.w / 2} cy={b.y + 30} r={9} fill="#FFFDF4" stroke={shade("#E8CFA0", 0.45)} strokeWidth={2.5} />
          </g>
        )}
        {/* the price is the question's own given, printed from the open question (data-scale: never read as an answer) */}
        <g data-scale="price">
          <rect x={chip.x} y={chip.y} width={chip.w} height={chip.h} rx={12} fill="url(#mc-tag-chip)" stroke={MC_AMBER} strokeWidth={3} filter="url(#mc-shadow)" />
          <text x={b.x + b.w / 2} y={chip.y + 34} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={MC_AMBER_INK}>{tx("Rs")}</text>
          <text x={b.x + b.w / 2} y={chip.y + 36 + fs * 0.92} textAnchor="middle" fontSize={fs} fontWeight={700} fill={MC_AMBER_INK}>{s}</text>
        </g>
        {name !== "" && <text x={b.x + b.w / 2} y={b.y + b.h + 40} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={MC_INK}>{tx(name)}</text>}
        {demo && p1 && <Hit id={k === 0 ? "tag-a" : "tag-b"} x={b.x - 4} y={b.y - 4} w={b.w + 8} h={b.h + 8} onPress={() => tap(k === 0 ? "tag-a" : "tag-b")} label={k === 0 ? "first price tag" : "second price tag"} />}
        {demo && p1 && stepOn === (k === 0 ? "tag-a" : "tag-b") && <Invite x={b.x + b.w / 2} y={b.y + b.h / 2} w={b.w} h={b.h} rx={12} C={C} />}
      </g>
    );
  };

  /* the keys under the tags: the two sign choices (phase 4, free play) side by side, the Carry / Borrow key under them, or
     (phases 2 and 3) the Carry / Borrow key alone; none outside a question, a warm-up or free play */
  const LABEL: any = { carry: "Carry", borrow: "Borrow", add: "Add", sub: "Take away", new: "New prices" };
  const live = free || demo || stage === "ask";
  const signKeys = live && !p1 && (free || n === 4) && !(demo && step > 0);
  const actOn = live && !p1 && !!actKey && !done && S.anim === "" && (n !== 4 && !free ? true : !!S.sg) && !(demo && n === 4);
  const keys: any[] = [];
  if (signKeys) ["add", "sub"].forEach((id, j) => keys.push({ id, x: G.mid2 - 206 + j * 212, y: G.keyY, w: 196, h: 72, on: S.op === (id === "add" ? "+" : "-") }));
  if (actOn) keys.push({ id: actKey, x: G.mid2 - 120, y: signKeys ? G.key2Y : G.keyY, w: 240, h: 72 });
  const keyOff = S.tb || S.anim !== "";
  const signInvite = (demo && stepOn === "add") || (!demo && !free && stage === "ask" && n === 4 && !S.op && !S.tb);

  /* the bundle of 100 paise (ten vermilion 10 p strips with its label at 64) and the Rs 1 coin (carry and borrow) */
  const BW = 132, BH = 58;   /* about the paise carry cell: it starts in that cell and ends over the rupees ones cell */
  const bundle = (x: number, y: number) => (
    <g filter="url(#mc-shadow)">
      <rect x={x} y={y} width={BW} height={BH} rx={10} fill={MC_VERM} stroke={MC_VERM_INK} strokeWidth={3} />
      {Array.from({ length: 9 }, (_, j) => <line key={j} x1={x + (j + 1) * BW / 10} y1={y + 3} x2={x + (j + 1) * BW / 10} y2={y + BH - 3} stroke="#FFFFFF" strokeOpacity={0.45} strokeWidth={2} />)}
      <rect x={x + 6} y={y + 6} width={BW - 12} height={BH - 12} rx={6} fill="#FFFDF4" />
      {lang === "en" ? <text x={x + BW / 2} y={y + 41} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={MC_VERM_INK}>{tx("100 p")}</text>
        : <text x={x + BW / 2} y={y + 39} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={MC_VERM_INK}>{tx("100 p")}</text>}
    </g>
  );
  const coin = (cx: number, cy: number, r: number) => (
    <g filter="url(#mc-shadow)">
      <circle cx={cx} cy={cy} r={r} fill="#D8D2C2" stroke="#6E6A5E" strokeWidth={2} />
      <Skin name="coin1" x={cx - r} y={cy - r} w={2 * r} h={2 * r} />
    </g>
  );
  const anim = () => {
    if (!S.anim) return null;
    const mv = reducedMotion() ? "none" : "transform 600ms cubic-bezier(.4,.1,.3,1), opacity 250ms";
    const by = G.carry.y + 2, left = G.r1 - BW - 2, right = G.p0;   /* from the paise carry cell to over the rupees ones cell, and back */
    if (S.anim === "carry") {
      const dx = S.at >= 2 ? left - right : 0;
      return (
        <g pointerEvents="none">
          <g style={{ transform: `translate(${dx}px,0px)`, transition: mv, opacity: S.at >= 3 ? 0 : 1 } as any}>{bundle(right, by)}</g>
          {S.at >= 3 && S.pc < 1 && coin(carryX, G.carry.y + G.carry.h / 2, 30)}
        </g>
      );
    }
    const dx = S.at >= 2 ? right - left : 0;
    return (
      <g pointerEvents="none">
        {S.at === 1 && coin(G.r1 - G.cw / 2, G.carry.y + G.carry.h / 2, 30)}
        {S.at >= 2 && <g style={{ transform: `translate(${dx}px,0px)`, transition: mv, opacity: S.at >= 3 ? 0 : 1 } as any}>{bundle(left, by)}</g>}
      </g>
    );
  };

  /* the borrow's pencil marks (struck top amount, new rupees and paise in the carry row) */
  const borrowMarks = () => {
    const k = S.borrowed ? 4 : S.anim === "borrow" ? S.pc : 0;
    if (!k) return null;
    const a = strikeR(), b = strikeP();
    return (
      <g pointerEvents="none">
        {k >= 1 && <PencilLine x1={a[0]} y1={a[1]} x2={a[2]} y2={a[3]} size={MC_D} />}
        {k >= 2 && <PencilText text={newR} x={G.r1 - newR.length * G.cw} y={G.cBase} size={MC_C} align="start" step={G.cw} color={MC_BLUE_INK} width={MC_PW} />}
        {k >= 3 && <PencilLine x1={b[0]} y1={b[1]} x2={b[2]} y2={b[3]} size={MC_D} />}
        {k >= 4 && <PencilText text={newP} x={G.p0 + G.cw} y={G.cBase} size={MC_C} align="middle" color={MC_VERM_INK} width={MC_PW} />}
      </g>
    );
  };

  /* the desk: one piece of wood from the left edge to the key's column (nothing runs under the key's corner, no seam) */
  const kcx = box.key ? box.key.x - 8 : box.w, kcy = box.key ? box.key.y + box.key.h + 8 : 0;
  /* the desk: wood to the key's column at full height, and under the key's corner a second piece of the same wood that
     cross-fades in over 180 units (a mask), so the grain runs across the whole card with no seam, no slab and no element
     under the key's corner (a clipped picture would still count as under it) */
  const cut = box.w > kcx + 4, XF = 150, FY = 56;
  const rowA = p1 && demo ? penned(it.a, G.row1, S.wa, "ra") : printed(it.a, G.row1, "ra");
  const rowB = p1 ? (demo ? penned(it.b, G.row2, S.wb, "rb") : null) : printed(it.b, G.row2, "rb");
  const signOp = !p1 && !free && n === 4 && !demo && (stage === "win" || stage === "idle") ? item.op : op;
  const signShown = n === 2 || n === 3 ? <text x={G.signX} y={G.base(G.row2)} textAnchor="middle" fontSize={MC_D} fontWeight={700} fill={MC_INK}>{n === 2 ? "+" : "−"}</text>
    : !p1 && signOp && (S.sg || (demo && step > 0) || signOp !== op) ? <PencilText text={signOp === "+" ? "+" : "-"} x={G.signX} y={G.base(G.row2)} size={MC_D} align="middle" color={MC_INK} width={MC_PW} /> : null;

  return (
    <g>
      <defs>
        <filter id="mc-shadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#1E2022" floodOpacity="0.16" />
        </filter>
        {/* the key's pocket, feathered on BOTH edges of the L: the main wood fades to the card over XF units at its right edge
            above the pocket line, the lower wood fades in from the left and from its top; no hard edge, no seam line */}
        {cut && <linearGradient id="mc-gxOut" gradientUnits="userSpaceOnUse" x1={kcx - XF} y1={0} x2={kcx} y2={0}>
          <stop offset="0%" stopColor="#000000" stopOpacity={0} /><stop offset="100%" stopColor="#000000" stopOpacity={1} />
        </linearGradient>}
        {cut && <linearGradient id="mc-gyIn" gradientUnits="userSpaceOnUse" x1={0} y1={kcy} x2={0} y2={kcy + FY}>
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0} /><stop offset="100%" stopColor="#FFFFFF" stopOpacity={1} />
        </linearGradient>}
        {/* the lower wood is drawn FIRST, fading in only from its top (y); the main wood is drawn OVER it and fades out only
            towards its right edge (x). Where both are present the result is a straight crossfade of the two woods (no white leak); at
            the key column the main wood is fully gone, so the left and right of the join are the same picture: no tone step */}
        {cut && <mask id="mc-mMain" maskUnits="userSpaceOnUse" x={0} y={0} width={kcx} height={box.h}>
          <rect x={0} y={0} width={kcx} height={box.h} fill="#FFFFFF" />
          <rect x={kcx - XF} y={0} width={XF} height={box.h} fill="url(#mc-gxOut)" />
        </mask>}
        {cut && <mask id="mc-mLow" maskUnits="userSpaceOnUse" x={kcx - XF} y={kcy} width={box.w - kcx + XF} height={box.h - kcy}>
          <rect x={kcx - XF} y={kcy} width={box.w - kcx + XF} height={box.h - kcy} fill="url(#mc-gyIn)" />
        </mask>}
        <linearGradient id="mc-tag-chip" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFDF9" />
          <stop offset="100%" stopColor="#F5EFE0" />
        </linearGradient>
      </defs>
      {/* the desk: one setting all through */}
      {cut && <g mask="url(#mc-mLow)">
        <rect x={kcx - XF} y={kcy} width={box.w - kcx + XF} height={box.h - kcy} fill="#C9A37A" />
        <Skin name="desk" x={kcx - XF} y={kcy} w={box.w - kcx + XF} h={box.h - kcy} />
      </g>}
      <g mask={cut ? "url(#mc-mMain)" : undefined}>
        <rect x={0} y={0} width={Math.min(box.w, kcx)} height={box.h} fill="#C9A37A" />
        <Skin name="desk" x={0} y={0} w={Math.min(box.w, kcx)} h={box.h} />
      </g>
      {/* the headings */}
      <rect x={G.r0} y={G.head.y} width={3 * G.cw} height={G.head.h} rx={10} fill={tint(MC_BLUE, lit("rup") ? 0.55 : 0.82)} stroke={MC_BLUE_INK} strokeWidth={2.4} />
      <text x={G.r0 + 1.5 * G.cw} y={G.head.y + (lang === "hi" ? 44 : 40)} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={MC_BLUE_INK}>{tx("Rupees")}</text>
      <rect x={G.p0} y={G.head.y} width={2 * G.cw} height={G.head.h} rx={10} fill={tint(MC_VERM, lit("pai") ? 0.55 : 0.82)} stroke={MC_VERM_INK} strokeWidth={2.4} />
      <text x={G.p0 + G.cw} y={G.head.y + (lang === "hi" ? 44 : 40)} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={MC_VERM_INK}>{tx("Paise")}</text>
      {/* the carry row (light cells) */}
      {!p1 && [0, 1, 2].map((k) => <rect key={"cr" + k} x={rupeeCellX(k) + 4} y={G.carry.y} width={G.cw - 8} height={G.carry.h} rx={6} fill={lit("col" + (2 - k)) ? tint(MC_BLUE, 0.78) : "#FFFFFF"} stroke="#D8CBB5" strokeWidth={1.5} filter="url(#mc-shadow)" />)}
      {!p1 && op === "-" && <rect x={G.p0 + 4} y={G.carry.y} width={G.cw2 - 8} height={G.carry.h} rx={6} fill="#FFFFFF" stroke="#D8CBB5" strokeWidth={1.5} filter="url(#mc-shadow)" />}
      {cells(G.row1, "c1", "")}
      {cells(G.row2, "c2", "")}
      {!p1 && <line x1={G.signX - 26} y1={G.rule} x2={G.p1 + 8} y2={G.rule} stroke={MC_INK} strokeWidth={4} strokeLinecap="round" />}
      {!p1 && !free && (
        <g>
          {won && <rect data-reveals="answer" x={G.r0} y={G.ans.y - 4} width={G.p1 - G.r0} height={G.ans.h + 8} rx={12} fill={tint(MC_GREEN, 0.7)} stroke={MC_GREEN} strokeWidth={4} />}
          {cells(G.ans, "ca", "plain")}
        </g>
      )}
      {p1 && won && <rect data-reveals="answer" x={G.r0} y={G.row2.y - 4} width={G.p1 - G.r0} height={G.row2.h + 8} rx={12} fill="none" stroke={MC_GREEN} strokeWidth={5} />}
      {/* the dot line: every dot stands on it */}
      <line x1={G.dotX} y1={G.head.y + G.head.h + 4} x2={G.dotX} y2={(p1 || free ? G.row2.y + G.row2.h : G.ans.y + G.ans.h) + 8} stroke={MC_INK} strokeWidth={lit("dot") ? 5 : 2.5} strokeDasharray="8 8" />
      {/* a whole amount's paise cells after a miss */}
      {lit("zeros") && <rect className="c4-pulse" x={G.p0 - 4} y={G.row2.y - 4} width={2 * G.cw + 8} height={G.row2.h + 8} rx={8} fill="none" stroke={MC_VERM} strokeWidth={5} pointerEvents="none" />}
      {rowA}
      {rowB}
      {signShown}
      {/* the carried 1 */}
      {(S.carried || (S.anim === "carry" && S.pc >= 1)) && <PencilText text="1" x={carryX} y={G.cBase} size={MC_C} align="middle" color={MC_BLUE_INK} width={MC_PW} />}
      {S.cc.map((on: any, k: number) => on && k > 0 && k <= 2 ? <PencilText key={"cc" + k} text="1" x={colCarryX(k)} y={G.cBase} size={MC_C} align="middle" color={MC_BLUE_INK} width={MC_PW} /> : null)}
      {borrowMarks()}
      {S.fly && <g pointerEvents="none" style={{ transform: `translate(${S.fly.go ? S.fly.x1 - S.fly.x0 : 0}px,${S.fly.go ? S.fly.y1 - S.fly.y0 : 0}px)`, transition: reducedMotion() ? "none" : "transform 520ms cubic-bezier(.4,.1,.3,1)" } as any}>
        <text x={S.fly.x0} y={S.fly.y0} textAnchor="middle" fontSize={MC_C} fontWeight={700} fill={MC_BLUE_INK} fillOpacity={S.fly.go ? 0.45 : 0.9}>1</text>
      </g>}
      {p1 && showCard && card()}
      {entryOn && entryRow()}
      {/* every dot on top of its cells, on the dot line */}
      {(!(p1 && demo) || S.wa >= 2) && dot(G.row1, "d1")}
      {(p1 ? (!demo || S.wb >= 2) : true) && dot(G.row2, "d2")}
      {!p1 && !free && dot(G.ans, "da")}
      {/* the warm-up's paise mark */}
      {(n === 2 || n === 3) && demo && <Hit id="paise" x={G.p0 - 6} y={G.row1.y - 4} w={2 * G.cw + 12} h={G.row2.y + G.row2.h - G.row1.y + 8} onPress={() => tap("paise")} label="the paise cells" />}
      {demo && stepOn === "paise" && <Invite x={G.p0 + G.cw + 2} y={(G.row1.y + G.row2.y + G.row2.h) / 2} w={2 * G.cw - 10} h={G.row2.y + G.row2.h - G.row1.y - 4} rx={8} C={C} />}
      {/* the resting pencil */}
      <rect x={90} y={484} width={260} height={20} rx={10} fill="#E9B949" stroke={MC_INK} strokeWidth={1.5} filter="url(#mc-shadow)" />
      <Skin name="pencil" x={90} y={484} w={260} h={20} fit="stretch" />
      {/* the right page: the prices */}
      {priceThing(0)}
      {priceThing(1)}
      {keys.map((b, j) => (
        <Key key={"act" + j} id={b.id} label={LABEL[b.id]} x={b.x} y={b.y} w={b.w} h={b.h} C={C} tone="key" disabled={keyOff} onClick={() => tap(b.id)}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{tx(LABEL[b.id])}</text>
        </Key>
      ))}
      {keys.filter((b) => b.on).map((b, j) => <rect key={"on" + j} x={b.x + 14} y={b.y + 60} width={b.w - 28} height={6} rx={3} fill={MC_GREEN} pointerEvents="none" />)}
      {keys.filter((b) => demo && b.id === stepOn && b.id !== "add").map((b, j) => <Invite key={"inv" + j} x={b.x + b.w / 2} y={b.y + b.h / 2} w={b.w} h={b.h} rx={RAD.key} C={C} />)}
      {signKeys && signInvite && <Invite x={G.mid2} y={G.keyY + 36} w={408} h={72} rx={RAD.key} C={C} />}
      {free && (
        <Key id="new" label="New prices" x={G.r0} y={G.ans.y} w={G.p1 - G.r0} h={80} C={C} tone="key" disabled={S.anim !== ""} onClick={() => tap("new")}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{tx("New prices")}</text>
        </Key>
      )}
      {anim()}
    </g>
  );
}

/* the summary page's drawing of the child's last right answer: the amount in its two colours on a paper strip */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const v = result && result.last ? result.last.value : null;
  if (v === null || v === undefined) return null;
  const [p, r] = mcParts(v);
  /* one line at the right end (the summary row's long concept name can run up to the thumbnail's left part): "Rs 38.15" in
     English, "38.15 रुपये" / "38.15 રૂપિયા" in Hindi and Gujarati (no Latin letter there); rupees deep blue, paise vermilion */
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill="#FFFDF4" stroke={MC_INK} strokeWidth={2.4} />
      <text x={w - 20} y={h / 2 + 10} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={MC_INK}>
        {lang === "en" && <tspan>{tx("Rs") + " "}</tspan>}
        <tspan fill={MC_BLUE_INK}>{r}</tspan><tspan>.</tspan><tspan fill={MC_VERM_INK}>{p}</tspan>
        {lang !== "en" && <tspan>{" " + tx("rupees")}</tspan>}
      </text>
    </g>
  );
}

function MoneyColumns(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      board: true,
      keyOnly: true,
      bigPad: true,
      nextKey: true,
      navDots: true,
      /* the answer is typed ON the answer row (the card), paise box first */
      cardAnswer: true,
      StartArt, START_HOOK,
      }} />
  );
}

export default MoneyColumns;