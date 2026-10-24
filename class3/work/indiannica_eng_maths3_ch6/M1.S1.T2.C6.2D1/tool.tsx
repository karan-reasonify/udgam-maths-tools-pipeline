/* ═══ M1.S1.T2.C6.2D1 · fraction_maker · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ mascot, action kit, font kit) is prepended at build: header, canvas, keypad panel, bubble,
   mascot, phase dots, toolApi, sounds, scoring and events already exist. SILENT runtime (r30+): the bubble is the
   guide; nothing moves on unless the child acts. THE NEW LOOK (keyOnly, navDots, cardAnswer): no question bar, the
   question lives only in the bubble, the fraction is answered ON the fraction card, every act is done on screen
   (api.act: the knife cuts, the hand lifts, counts and puts back, the pencil writes).
   Wholes (the owner, 2026-10-23): a roti, a pizza and a chocolate bar (3 skins: roti, pizza, bar); every disc is
   drawn in one 300 x 300 box and the bar at 320 x 85, so every comparison is between equal wholes.
   NO imports in this file; only the five host hooks. Edit, never rewrite. */

const TOOL_ID = "fraction_maker";
const MEDIA_ID = "M1.S1.T2.C6.2D1";
const TOOL_NAME = "Fraction Maker";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (not shown: phase 1 has steps) */
const OPENING = ["A kitchen table with a roti, a pizza and a chocolate bar."];
/* kept for the tool object's shape; not shown from r44 */
const FINISH_LINE = "You named every fraction by counting.";
/* printed when the child opens Free play: free play offers exactly this (a whole, the Cut dial, lifting and Put together) */
const FREE_LINE = "Free play. Cut, take and put back as you like.";
const START_HOOK = "Can you cut a roti so that every friend gets the same share?";

/* ── the look: colour roles (brief), sizes, geometry helpers (prefixed fm: tools share one scope with the runtime) ── */
const FM_BLUE = "#1B4592", FM_BLUE_INK = "#14306A", FM_PLATE = "#DCE6F7";            /* taken / coloured / counted */
const FM_AMBER = "#F6D693", FM_AMBER_EDGE = "#B7832A", FM_AMBER_INK = "#6B4300";     /* left */
const FM_GREEN = "#2E8B57", FM_GREEN_INK = "#1D5E36";                                 /* a whole */
const FM_VERM = "#D55E00", FM_VERM_INK = "#8A3B00";                                   /* bigger */
const FM_LINE = "#232323", FM_CREAM = "#FFF3D6", FM_HUE = "#1E5BD8";
const FM_PLAIN: any = { roti: "#E6BD78", pizza: "#F2C65A", bar: "#7A3F22" };
const FM_NAMES: any = { 2: "one half", 3: "one third", 4: "one quarter" };
/* the frame: 900 x 520, the working area with the keypad OPEN; every layout lives inside it (fmGeo) */
const FM_FW = 900;
const FM_WHOLE_LABEL: any = { roti: "Roti", pizza: "Pizza", bar: "Chocolate" };
const FM_BAR = { w: 320, h: 85 };
/* the bar: a left part under a cream wash (0.8 over the mean chocolate 118,51,32 -> about 228,205,178), a taken part keeps the chocolate's
   own light and detail under a blue hue (blend "color"), so the two are about 6:1 apart */
const FM_CREAM_A = 0.8;
const FM_CARD = { x: 694, y: 64, w: 206, h: 336, top: { x: 727, y: 114, w: 140, h: 104 }, bot: { x: 727, y: 246, w: 140, h: 104 }, bar: 232, topC: 166, botC: 298 };
const FM_FREE = { obj: "roti", np: 2, uncut: true };
const fmPol = (cx: number, cy: number, r: number, d: number) => [cx + r * Math.sin((d * Math.PI) / 180), cy - r * Math.cos((d * Math.PI) / 180)];
/* cut angles, clockwise from the top; "by eye" is a careless cut into 4 (130, 75, 85 and 70 degrees) */
const fmAngles = (np: number, uneven?: boolean) => (uneven ? [0, 130, 205, 290] : Array.from({ length: np }, (_, i) => (i * 360) / np));
function fmWedge(cx: number, cy: number, r: number, a: number, b: number) {
  const p = fmPol(cx, cy, r, a), q = fmPol(cx, cy, r, b);
  return `M ${cx} ${cy} L ${p[0]} ${p[1]} A ${r} ${r} 0 ${b - a > 180 ? 1 : 0} 1 ${q[0]} ${q[1]} Z`;
}
/* a wedge's centroid */
function fmMid(cx: number, cy: number, r: number, a: number, b: number) {
  const t = ((b - a) * Math.PI) / 180;
  return fmPol(cx, cy, (4 * r * Math.sin(t / 2)) / (3 * t), (a + b) / 2);
}
/* one whole's geometry in a layout: a disc { cx, cy, R }, the bar { x, y, w, h } (stacked over its tray, so 4 parts are 120 wide) or a
   group of rotis in rows of 5 { s, pitch, rowH, x0, y0 }; mv = where a taken piece goes (the plate to the right, the tray or basket below).
   "one" (phase 1, a whole and the name card) and "pair" (two equal rotis) are bigger: no keypad shares their room. */
function fmGeo(kind: string, obj: string, np: number, which: number) {
  if (obj === "group") {
    const big = np <= 5;
    return big ? { big, s: 120, pitch: 132, rowH: 132, x0: 12, y0: 74, mv: [0, 212] } : { big, s: 96, pitch: 106, rowH: 106, x0: 10, y0: 62, mv: [0, 234] };
  }
  if (obj === "bar") return { x: 30, y: 86, w: 460, h: 122, mv: [0, 200] };
  if (kind === "one") return { cx: 235, cy: 255, R: 215, mv: [0, 0] };
  if (kind === "pair") return { cx: which ? 670 : 220, cy: 270, R: 185, mv: [0, 0] };
  return { cx: 168, cy: 232, R: 150, mv: [350, 0] };
}
/* the pieces of one whole in its geometry g: wedges of a disc, parts of the bar, or rotis of a group */
function fmPieces(obj: string, np: number, uneven: boolean, g: any) {
  if (obj === "bar") {
    const w = g.w / np;
    return Array.from({ length: np }, (_, i) => ({ i, rect: [g.x + i * w, g.y, w, g.h], mid: [g.x + (i + 0.5) * w, g.y + g.h / 2] }));
  }
  if (obj === "group") return Array.from({ length: np }, (_, i) => {
    const x = g.x0 + (i % 5) * g.pitch, y = g.y0 + Math.floor(i / 5) * g.rowH;
    return { i, rect: [x, y, g.s, g.s], mid: [x + g.s / 2, y + g.s / 2] };
  });
  const an = fmAngles(np, uneven);
  return an.map((a, i) => {
    const b = i + 1 < an.length ? an[i + 1] : 360;
    return { i, d: fmWedge(g.cx, g.cy, g.R, a, b), mid: fmMid(g.cx, g.cy, g.R, a, b) };
  });
}
/* where each cut falls: an x for the bar, an angle for a disc */
const fmCuts = (obj: string, np: number, uneven: boolean, g: any) => (obj === "bar"
  ? Array.from({ length: np - 1 }, (_, k) => g.x + ((k + 1) * g.w) / np) : fmAngles(np, uneven));
const fmCutDone = (S: any) => S.obj === "group" || S.cut >= (S.obj === "bar" ? S.np - 1 : S.np);
function fmFresh(sc: any, e: number) {
  const np = sc.np || 2;
  return { e, obj: sc.obj, np, uneven: false, cut: sc.uncut ? 0 : 99, taken: Array.from({ length: np }, (_, i) => (sc.tk || []).includes(i)),
    written: 0, counted: 0, together: false };
}
/* a whole drawn as a still picture (the start page): plain shape, its skin, the outline */
function fmWholeArt(id: string, obj: string, cx: number, cy: number, r: number) {
  if (obj === "bar") {
    const x = cx - FM_BAR.w / 2, y = cy - FM_BAR.h / 2;
    return (
      <g>
        <clipPath id={id}><rect x={x} y={y} width={FM_BAR.w} height={FM_BAR.h} rx={8} /></clipPath>
        <rect x={x} y={y} width={FM_BAR.w} height={FM_BAR.h} rx={8} fill={FM_PLAIN.bar} />
        <Skin name="bar" x={x} y={y} w={FM_BAR.w} h={FM_BAR.h} fit="stretch" clip={"url(#" + id + ")"} />
        <rect x={x} y={y} width={FM_BAR.w} height={FM_BAR.h} rx={8} fill="none" stroke={FM_LINE} strokeWidth={3.5} />
      </g>
    );
  }
  return (
    <g>
      <clipPath id={id}><circle cx={cx} cy={cy} r={r} /></clipPath>
      <circle cx={cx} cy={cy} r={r} fill={FM_PLAIN[obj]} />
      <Skin name={obj} x={cx - r} y={cy - r} w={2 * r} h={2 * r} clip={"url(#" + id + ")"} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={FM_LINE} strokeWidth={3.5} />
    </g>
  );
}

/* THE START PAGE: the three wholes of the lesson on the kitchen table */
function StartArt({ box }: any) {
  const cy = box.h / 2 - 8;
  return (
    <g>
      <defs>
        <filter id="fmStartShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#2A1B0E" floodOpacity="0.18" />
        </filter>
      </defs>
      <rect x={60} y={cy + 152} width={box.w - 120} height={14} rx={7} fill={FM_AMBER} stroke={FM_AMBER_EDGE} strokeWidth={2} />
      <g filter="url(#fmStartShadow)">
        {fmWholeArt("fmsa1", "roti", 250, cy, 145)}
        {fmWholeArt("fmsa2", "pizza", 600, cy, 145)}
        {fmWholeArt("fmsa3", "bar", 950, cy, 0)}
      </g>
    </g>
  );
}

/* Hindi and Gujarati: filled in the language pass, once the English is final (PATTERNS §11). */
/* For the language pass, besides the lines check lists: every item's `win` line (said by Work) and the words Work draws through
   tx(): Left, Taken, Whole, Bigger, numerator, denominator, One part is, one half, one third, one quarter, Not equal,
   Cut into, By eye, Cut, Write, Put together, Count, Roti, Pizza, Chocolate, Fraction card; and the nudge said at a repeated Enter. */
const TR: any = {
  hi: {
      "Fraction Maker": "भिन्न बनाओ",
      "Free play. Cut, take and put back as you like.": "खुला खेल। जैसे चाहो काटो, उठाओ और वापस रखो।",
      "Can you cut a roti so that every friend gets the same share?": "क्या तुम रोटी ऐसे काट सकते हो कि हर दोस्त को बराबर हिस्सा मिले?",
      " half ": "  आधा  ",
      " third ": "एक तिहाई",
      "quarter": "एक चौथाई",
      "Equal parts: halves, thirds and quarters": "बराबर भाग: आधा, तिहाई और चौथाई",
      "Tap By eye to cut this roti into 4 pieces by guessing.": "अंदाज़ से दबाओ और रोटी के 4 टुकड़े अंदाज़े से काटो।",
      "Tap the By eye key under the roti.": "रोटी के नीचे अंदाज़ से वाला बटन दबाओ।",
      "Now tap Cut to cut a fresh roti into 4 equal parts.": "अब काटो दबाकर नई रोटी के 4 बराबर भाग करो।",
      "Tap the Cut key to cut it the fair way.": "ठीक से काटने के लिए काटो बटन दबाओ।",
      "Fewer equal parts make bigger parts, so a half is bigger than a quarter.": "कम बराबर भाग हों तो भाग बड़े होते हैं, इसलिए आधा चौथाई से बड़ा है।",
      "You learned: 2, 3 or 4 equal parts are halves, thirds or quarters.": "तुमने सीखा: 2, 3 या 4 बराबर भाग आधे, तिहाई या चौथाई होते हैं।",
      "This roti is cut into 2 equal parts, so what is the coloured part called?": "यह रोटी 2 बराबर भागों में कटी है, रंगे भाग को क्या कहते हैं?",
      "Name the coloured part": "रंगे भाग का नाम",
      "Count the equal parts of the roti.": "रोटी के बराबर भाग गिनो।",
      "Yes, one of 2 equal parts is one half.": "हाँ, 2 बराबर भागों में से एक भाग आधा है।",
      "Now the pizza has 3 equal slices: what do we call the coloured one?": "अब पिज़्ज़ा के 3 बराबर टुकड़े हैं, रंगे टुकड़े को क्या कहेंगे?",
      "Name the slice": "टुकड़े का नाम",
      "Count the slices, one cut line at a time.": "एक-एक कटी रेखा देखकर टुकड़े गिनो।",
      "Yes, one of 3 equal slices is one third.": "हाँ, 3 बराबर टुकड़ों में से एक, एक तिहाई है।",
      "One roti is in halves and one in quarters, so which coloured part is bigger?": "एक रोटी आधे भागों में और एक चौथाई भागों में है, कौन-सा रंगा भाग बड़ा है?",
      "Which is bigger?": "कौन-सा बड़ा है?",
      "Look at the two coloured parts side by side.": "दोनों रंगे भागों को साथ-साथ देखो।",
      "Yes, a half is bigger than a quarter of the same roti.": "हाँ, उसी रोटी का आधा भाग चौथाई से बड़ा है।",
      "Coloured parts: the top and bottom numbers": "रंगे भाग: ऊपर और नीचे की संख्या",
      "Tap 4 on the Cut dial to cut the pizza into 4 equal slices.": "डायल पर 4 दबाओ और पिज़्ज़ा के 4 बराबर टुकड़े करो।",
      "Tap the key with 4 on it.": "4 लिखा बटन दबाओ।",
      "Tap one slice to lift it onto the blue plate.": "एक टुकड़ा दबाकर नीली प्लेट पर रखो।",
      "Tap a slice of the pizza.": "पिज़्ज़ा का एक टुकड़ा दबाओ।",
      "Tap Write to write the plate's fraction on the card.": "लिखो दबाकर प्लेट का भिन्न कार्ड पर लिखो।",
      "Tap the Write key under the plate.": "प्लेट के नीचे लिखो बटन दबाओ।",
      "The bottom number counts all the parts, the top counts the parts taken.": "नीचे की संख्या सारे भाग गिनती है, ऊपर की संख्या लिए गए भाग।",
      "You learned: bottom counts all equal parts, top counts parts taken.": "तुमने सीखा: हर सारे बराबर भाग गिनता है, अंश लिए गए भाग।",
      "Touch each part once as you count it.": "गिनते समय हर भाग को एक बार छुओ।",
      "A fraction has two counts, one above and one below the line.": "भिन्न में दो गिनतियाँ होती हैं, एक रेखा के ऊपर, एक नीचे।",
      "What fraction of the chocolate bar is on the blue plate?": "चॉकलेट का कितना भिन्न नीली प्लेट पर है?",
      "Fraction on the plate": "प्लेट पर भिन्न",
      "The bottom number counts all the parts of the bar.": "नीचे की संख्या चॉकलेट के सारे भाग गिनती है।",
      "Count the bar's parts on the board and on the plate together.": "बोर्ड और प्लेट, दोनों पर चॉकलेट के भाग गिनो।",
      "Then count only the part on the plate for the top number.": "फिर ऊपर की संख्या के लिए सिर्फ़ प्लेट वाला भाग गिनो।",
      "Yes, 1 part of 2 is on the plate.": "हाँ, 2 में से 1 भाग प्लेट पर है।",
      "Count the slices on the plate and on the board, then write the plate's fraction.": "प्लेट और बोर्ड के टुकड़े गिनो, फिर प्लेट का भिन्न लिखो।",
      "Slices on the plate": "प्लेट पर टुकड़े",
      "Count every slice of the pizza for the bottom number.": "नीचे की संख्या के लिए पिज़्ज़ा का हर टुकड़ा गिनो।",
      "The slices sitting on the blue plate give the top number.": "नीली प्लेट के टुकड़े ऊपर की संख्या देते हैं।",
      "Write the plate's slices on top and every slice of the pizza below.": "प्लेट के टुकड़े ऊपर लिखो और पिज़्ज़ा के सारे टुकड़े नीचे।",
      "Yes, 2 of the 3 slices are on the plate.": "हाँ, 3 में से 2 टुकड़े प्लेट पर हैं।",
      "Lift pieces onto the plate to make the card's fraction.": "टुकड़े प्लेट पर रखकर कार्ड वाला भिन्न बनाओ।",
      "Make the card's fraction": "कार्ड का भिन्न बनाओ",
      "The top number tells how many pieces go on the plate.": "ऊपर की संख्या बताती है कि प्लेट पर कितने टुकड़े जाएँ।",
      "Look at the top number on the card, then count your plate.": "कार्ड की ऊपर की संख्या देखो, फिर अपनी प्लेट गिनो।",
      "Lift or put back pieces until the plate holds the top number.": "प्लेट पर ऊपर की संख्या जितने टुकड़े होने तक रखो या लौटाओ।",
      "Yes, 3 of the 4 pieces make the card's fraction.": "हाँ, 4 में से 3 टुकड़े कार्ड वाला भिन्न बनाते हैं।",
      "All the parts make one whole": "सारे भाग मिलकर एक पूरा",
      "Tap Put together to put every slice back on the board.": "जोड़ो दबाकर हर टुकड़ा वापस बोर्ड पर रखो।",
      "Tap the Put together key.": "जोड़ो बटन दबाओ।",
      "When the top and bottom numbers are the same, the parts make one whole.": "जब ऊपर और नीचे की संख्या एक-सी हो, तो भाग मिलकर एक पूरा बनाते हैं।",
      "You learned: the same top and bottom number makes one whole.": "तुमने सीखा: अंश और हर बराबर हों तो एक पूरा बनता है।",
      "Count slowly and touch each part once.": "धीरे-धीरे गिनो और हर भाग को एक बार छुओ।",
      "Look at both places, the board and the plate, before you write.": "लिखने से पहले बोर्ड और प्लेट, दोनों जगह देखो।",
      "Every slice is on the plate, so how many thirds make the whole pizza?": "हर टुकड़ा प्लेट पर है, कितनी तिहाई से पूरा पिज़्ज़ा बनता है?",
      "Thirds in the whole": "पूरे में तिहाई",
      "Count the pizza slices on the plate.": "प्लेट पर पिज़्ज़ा के टुकड़े गिनो।",
      "Point at each slice on the plate as you count it.": "गिनते हुए प्लेट के हर टुकड़े पर उँगली रखो।",
      "Each slice is one third, so the slices tell how many thirds.": "हर टुकड़ा एक तिहाई है, इसलिए टुकड़े गिनो तो तिहाई गिनी।",
      "Yes, 3 thirds make the whole pizza.": "हाँ, 3 तिहाई से पूरा पिज़्ज़ा बनता है।",
      "One piece is on the plate, so what fraction of the bar is still on the board?": "एक टुकड़ा प्लेट पर है, चॉकलेट का कितना भिन्न अभी बोर्ड पर है?",
      "Fraction still on the board": "बोर्ड पर बचा भिन्न",
      "Count only the pieces on the board for the top number.": "ऊपर की संख्या के लिए सिर्फ़ बोर्ड के टुकड़े गिनो।",
      "Count every piece of the bar, board and plate, for the bottom.": "नीचे के लिए बोर्ड और प्लेट के सारे टुकड़े गिनो।",
      "Leave out the piece on the plate when you count the top.": "ऊपर की गिनती में प्लेट वाला टुकड़ा छोड़ दो।",
      "Yes, 3 quarters on the board and 1 quarter on the plate make the whole bar.": "हाँ, बोर्ड के 3 चौथाई और प्लेट का 1 चौथाई मिलकर पूरी चॉकलेट हैं।",
      "Write the fraction for this pizza, whose slices are all on the plate.": "इस पिज़्ज़ा का भिन्न लिखो, इसके सारे टुकड़े प्लेट पर हैं।",
      "Count every slice on the plate for the top number.": "ऊपर की संख्या के लिए प्लेट का हर टुकड़ा गिनो।",
      "Count all the slices of the pizza for the bottom number.": "नीचे की संख्या के लिए पिज़्ज़ा के सारे टुकड़े गिनो।",
      "Every slice is on the plate, so both numbers count the same slices.": "हर टुकड़ा प्लेट पर है, तो दोनों संख्याएँ वही टुकड़े गिनती हैं।",
      "Yes, all 4 quarters on the plate are the whole pizza.": "हाँ, प्लेट के सारे 4 चौथाई मिलकर पूरा पिज़्ज़ा हैं।",
      "A fraction of a group of things": "चीज़ों के समूह का भिन्न",
      "Tap a roti on the shelf to lift it into the blue basket.": "शेल्फ़ की एक रोटी दबाकर नीली टोकरी में रखो।",
      "Tap one roti on the shelf.": "शेल्फ़ पर एक रोटी दबाओ।",
      "Tap Count to count every roti, on the shelf and in the basket.": "गिनो दबाकर शेल्फ़ और टोकरी की हर रोटी गिनो।",
      "Tap the Count key beside the shelf.": "शेल्फ़ के पास गिनो बटन दबाओ।",
      "A group works like a whole: all go below the line, counted ones above.": "समूह भी पूरे जैसा है: सब रेखा के नीचे, गिनी गई चीज़ें ऊपर।",
      "You learned: all the things go below the line, the ones counted above.": "तुमने सीखा: सारी चीज़ें रेखा के नीचे, गिनी गई ऊपर।",
      "Point at each roti once as you count.": "गिनते हुए हर रोटी पर एक बार उँगली रखो।",
      "A fraction of a group is written like a fraction of a whole.": "समूह का भिन्न भी पूरे के भिन्न जैसा लिखते हैं।",
      "What fraction of all the rotis is in the blue basket?": "सारी रोटियों का कितना भिन्न नीली टोकरी में है?",
      "Fraction in the basket": "टोकरी में भिन्न",
      "The bottom number counts all the rotis, not only the shelf.": "नीचे की संख्या सारी रोटियाँ गिनती है, सिर्फ़ शेल्फ़ की नहीं।",
      "Count the rotis in the basket for the top number.": "ऊपर की संख्या के लिए टोकरी की रोटियाँ गिनो।",
      "Add the shelf rotis and the basket rotis for the bottom number.": "नीचे की संख्या के लिए शेल्फ़ और टोकरी की रोटियाँ जोड़ो।",
      "Yes, 6 of the 10 rotis are in the basket.": "हाँ, 10 में से 6 रोटियाँ टोकरी में हैं।",
      "Write the fraction of these rotis that we lifted into the basket.": "टोकरी में रखी गई रोटियों का भिन्न लिखो।",
      "Rotis lifted": "उठाई गई रोटियाँ",
      "Every roti, lifted or not, is counted below the line.": "हर रोटी, उठाई हो या नहीं, रेखा के नीचे गिनी जाती है।",
      "The top number counts only the lifted rotis.": "ऊपर की संख्या सिर्फ़ उठाई गई रोटियाँ गिनती है।",
      "Count the basket, then count the shelf and the basket together.": "पहले टोकरी गिनो, फिर शेल्फ़ और टोकरी साथ में।",
      "Yes, 7 of the 9 rotis went into the basket.": "हाँ, 9 में से 7 रोटियाँ टोकरी में गईं।",
      "What fraction of the rotis is still on the shelf?": "रोटियों का कितना भिन्न अभी शेल्फ़ पर है?",
      "Fraction on the shelf": "शेल्फ़ पर भिन्न",
      "The top number counts the rotis that were not lifted.": "ऊपर की संख्या वे रोटियाँ गिनती है जो उठाई नहीं गईं।",
      "Count the rotis on the shelf, not the basket.": "शेल्फ़ की रोटियाँ गिनो, टोकरी की नहीं।",
      "All the rotis go below the line and the shelf ones above it.": "सारी रोटियाँ रेखा के नीचे और शेल्फ़ वाली ऊपर।",
      "Yes, 7 of the 10 rotis are still on the shelf.": "हाँ, 10 में से 7 रोटियाँ अभी शेल्फ़ पर हैं।",
      "Lay one part on another to check they match.": "एक भाग दूसरे पर रखकर देखो कि वे बराबर हैं।",
      "The name tells how many equal parts make the whole.": "नाम बताता है कि पूरे में कितने बराबर भाग हैं।",
      "Each part is just the same size as the other one.": "हर भाग दूसरे भाग जितना ही बड़ा है।",
      "Two friends sharing the roti fairly get one part each.": "दो दोस्त रोटी बराबर बाँटें तो हर एक को एक भाग मिलता है।",
      "Lay one slice on another: every slice matches.": "एक टुकड़ा दूसरे पर रखो, हर टुकड़ा बराबर है।",
      "The name of one slice comes from the number of slices.": "एक टुकड़े का नाम टुकड़ों की गिनती से बनता है।",
      "Count the parts of each roti before you choose.": "चुनने से पहले हर रोटी के भाग गिनो।",
      "The more parts a roti is cut into, the smaller each part.": "रोटी के जितने ज़्यादा भाग, हर भाग उतना छोटा।",
      "numerator": "अंश",
      "denominator": "हर",
      "One part is": "एक भाग है",
      "one half": "आधा",
      "one third": "एक तिहाई",
      "one quarter": "एक चौथाई",
      "Not equal": "बराबर नहीं",
      "Cut into": "भाग करो",
      "Fraction card": "भिन्न कार्ड",
      "Roti": "रोटी",
      "Pizza": "पिज़्ज़ा",
      "Chocolate": "चॉकलेट",
      "Put together": "जोड़ो",
      "By eye": "अंदाज़ से",
      "Cut": "काटो",
      "Write": "लिखो",
      "Change the plate first: lift or put back a piece.": "पहले प्लेट बदलो: कोई टुकड़ा रखो या लौटाओ।",
      "Count": "गिनो",
      "Bigger": "बड़ा",
      "Left": "बाकी",
      "Taken": "लिए गए",
      "Whole": "पूरा"
  },
  gu: {
      "Fraction Maker": "અપૂર્ણાંક બનાવો",
      "Free play. Cut, take and put back as you like.": "મુક્ત રમત. ગમે તેમ કાપો, લો અને પાછું મૂકો.",
      "Can you cut a roti so that every friend gets the same share?": "શું તમે રોટલી એવી કાપી શકો કે દરેક મિત્રને સરખો ભાગ મળે?",
      " half ": " અડધો ભાગ ",
      " third ": "ત્રીજો ભાગ",
      "quarter": " ચોથો ભાગ ",
      "Equal parts: halves, thirds and quarters": "સરખા ભાગ: અડધો, ત્રીજો અને ચોથો ભાગ",
      "Tap By eye to cut this roti into 4 pieces by guessing.": "અંદાજે દબાવી રોટલીના 4 ટુકડા અંદાજથી કાપો.",
      "Tap the By eye key under the roti.": "રોટલી નીચે અંદાજે વાળું બટન દબાવો.",
      "Now tap Cut to cut a fresh roti into 4 equal parts.": "હવે કાપો દબાવી નવી રોટલીના 4 સરખા ભાગ કરો.",
      "Tap the Cut key to cut it the fair way.": "બરાબર કાપવા માટે કાપો બટન દબાવો.",
      "Fewer equal parts make bigger parts, so a half is bigger than a quarter.": "ઓછા સરખા ભાગ હોય તો ભાગ મોટા થાય, એટલે અડધો ભાગ ચોથા ભાગથી મોટો છે.",
      "You learned: 2, 3 or 4 equal parts are halves, thirds or quarters.": "તમે શીખ્યા: 2, 3 કે 4 સરખા ભાગ એટલે અડધા, ત્રીજા કે ચોથા ભાગ.",
      "This roti is cut into 2 equal parts, so what is the coloured part called?": "આ રોટલીના 2 સરખા ભાગ છે, રંગેલા ભાગને શું કહેવાય?",
      "Name the coloured part": "રંગેલા ભાગનું નામ",
      "Count the equal parts of the roti.": "રોટલીના સરખા ભાગ ગણો.",
      "Yes, one of 2 equal parts is one half.": "હા, 2 સરખા ભાગમાંથી એક ભાગ અડધો છે.",
      "Now the pizza has 3 equal slices: what do we call the coloured one?": "હવે પિઝાના 3 સરખા ટુકડા છે, રંગેલા ટુકડાને શું કહીશું?",
      "Name the slice": "ટુકડાનું નામ",
      "Count the slices, one cut line at a time.": "એક એક કાપ જોઈને ટુકડા ગણો.",
      "Yes, one of 3 equal slices is one third.": "હા, 3 સરખા ટુકડામાંથી એક ત્રીજો ભાગ છે.",
      "One roti is in halves and one in quarters, so which coloured part is bigger?": "એક રોટલી અડધા ભાગમાં અને એક ચોથા ભાગમાં છે, કયો રંગેલો ભાગ મોટો છે?",
      "Which is bigger?": "કયો મોટો છે?",
      "Look at the two coloured parts side by side.": "બંને રંગેલા ભાગ બાજુ બાજુમાં જુઓ.",
      "Yes, a half is bigger than a quarter of the same roti.": "હા, એ જ રોટલીનો અડધો ભાગ ચોથા ભાગ કરતાં મોટો છે.",
      "Coloured parts: the top and bottom numbers": "રંગેલા ભાગ: ઉપર અને નીચેની સંખ્યા",
      "Tap 4 on the Cut dial to cut the pizza into 4 equal slices.": "ડાયલ પર 4 દબાવી પિઝાના 4 સરખા ટુકડા કરો.",
      "Tap the key with 4 on it.": "4 લખેલું બટન દબાવો.",
      "Tap one slice to lift it onto the blue plate.": "એક ટુકડો દબાવી વાદળી થાળીમાં મૂકો.",
      "Tap a slice of the pizza.": "પિઝાનો એક ટુકડો દબાવો.",
      "Tap Write to write the plate's fraction on the card.": "લખો દબાવી થાળીનો અપૂર્ણાંક કાર્ડ પર લખો.",
      "Tap the Write key under the plate.": "થાળી નીચે લખો બટન દબાવો.",
      "The bottom number counts all the parts, the top counts the parts taken.": "નીચેની સંખ્યા બધા ભાગ ગણે છે, ઉપરની સંખ્યા લીધેલા ભાગ.",
      "You learned: bottom counts all equal parts, top counts parts taken.": "તમે શીખ્યા: છેદ બધા સરખા ભાગ ગણે, અંશ લીધેલા ભાગ.",
      "Touch each part once as you count it.": "ગણતી વખતે દરેક ભાગને એક વાર અડો.",
      "A fraction has two counts, one above and one below the line.": "અપૂર્ણાંકમાં બે ગણતરી હોય, એક લીટી ઉપર અને એક નીચે.",
      "What fraction of the chocolate bar is on the blue plate?": "ચોકલેટનો કેટલો અપૂર્ણાંક વાદળી થાળીમાં છે?",
      "Fraction on the plate": "થાળીમાંનો અપૂર્ણાંક",
      "The bottom number counts all the parts of the bar.": "નીચેની સંખ્યા ચોકલેટના બધા ભાગ ગણે છે.",
      "Count the bar's parts on the board and on the plate together.": "બોર્ડ અને થાળી, બંને પર ચોકલેટના ભાગ ગણો.",
      "Then count only the part on the plate for the top number.": "પછી ઉપરની સંખ્યા માટે ફક્ત થાળીનો ભાગ ગણો.",
      "Yes, 1 part of 2 is on the plate.": "હા, 2 માંથી 1 ભાગ થાળીમાં છે.",
      "Count the slices on the plate and on the board, then write the plate's fraction.": "થાળી અને બોર્ડના ટુકડા ગણો, પછી થાળીનો અપૂર્ણાંક લખો.",
      "Slices on the plate": "થાળીમાં ટુકડા",
      "Count every slice of the pizza for the bottom number.": "નીચેની સંખ્યા માટે પિઝાનો દરેક ટુકડો ગણો.",
      "The slices sitting on the blue plate give the top number.": "વાદળી થાળીના ટુકડા ઉપરની સંખ્યા આપે છે.",
      "Write the plate's slices on top and every slice of the pizza below.": "થાળીના ટુકડા ઉપર લખો અને પિઝાના બધા ટુકડા નીચે.",
      "Yes, 2 of the 3 slices are on the plate.": "હા, 3 માંથી 2 ટુકડા થાળીમાં છે.",
      "Lift pieces onto the plate to make the card's fraction.": "ટુકડા થાળીમાં મૂકી કાર્ડનો અપૂર્ણાંક બનાવો.",
      "Make the card's fraction": "કાર્ડનો અપૂર્ણાંક બનાવો",
      "The top number tells how many pieces go on the plate.": "ઉપરની સંખ્યા કહે છે કે થાળીમાં કેટલા ટુકડા જાય.",
      "Look at the top number on the card, then count your plate.": "કાર્ડની ઉપરની સંખ્યા જુઓ, પછી તમારી થાળી ગણો.",
      "Lift or put back pieces until the plate holds the top number.": "થાળીમાં ઉપરની સંખ્યા જેટલા ટુકડા થાય ત્યાં સુધી મૂકો કે પાછા લો.",
      "Yes, 3 of the 4 pieces make the card's fraction.": "હા, 4 માંથી 3 ટુકડા કાર્ડનો અપૂર્ણાંક બનાવે છે.",
      "All the parts make one whole": "બધા ભાગ મળીને એક આખું",
      "Tap Put together to put every slice back on the board.": "જોડો દબાવી દરેક ટુકડો પાછો બોર્ડ પર મૂકો.",
      "Tap the Put together key.": "જોડો બટન દબાવો.",
      "When the top and bottom numbers are the same, the parts make one whole.": "ઉપર અને નીચેની સંખ્યા સરખી હોય ત્યારે ભાગ મળીને એક આખું બને.",
      "You learned: the same top and bottom number makes one whole.": "તમે શીખ્યા: અંશ અને છેદ સરખા હોય તો એક આખું બને.",
      "Count slowly and touch each part once.": "ધીમે ધીમે ગણો અને દરેક ભાગને એક વાર અડો.",
      "Look at both places, the board and the plate, before you write.": "લખતાં પહેલાં બોર્ડ અને થાળી, બંને જગ્યા જુઓ.",
      "Every slice is on the plate, so how many thirds make the whole pizza?": "દરેક ટુકડો થાળીમાં છે, કેટલા ત્રીજા ભાગથી આખો પિઝા બને?",
      "Thirds in the whole": "આખામાં ત્રીજા ભાગ",
      "Count the pizza slices on the plate.": "થાળીમાં પિઝાના ટુકડા ગણો.",
      "Point at each slice on the plate as you count it.": "ગણતી વખતે થાળીના દરેક ટુકડા પર આંગળી મૂકો.",
      "Each slice is one third, so the slices tell how many thirds.": "દરેક ટુકડો ત્રીજો ભાગ છે, ટુકડા ગણો એટલે ત્રીજા ભાગ ગણાય.",
      "Yes, 3 thirds make the whole pizza.": "હા, 3 ત્રીજા ભાગથી આખો પિઝા બને.",
      "One piece is on the plate, so what fraction of the bar is still on the board?": "એક ટુકડો થાળીમાં છે, ચોકલેટનો કેટલો અપૂર્ણાંક હજી બોર્ડ પર છે?",
      "Fraction still on the board": "બોર્ડ પર બાકી અપૂર્ણાંક",
      "Count only the pieces on the board for the top number.": "ઉપરની સંખ્યા માટે ફક્ત બોર્ડના ટુકડા ગણો.",
      "Count every piece of the bar, board and plate, for the bottom.": "નીચે માટે બોર્ડ અને થાળીના બધા ટુકડા ગણો.",
      "Leave out the piece on the plate when you count the top.": "ઉપરની ગણતરીમાં થાળીનો ટુકડો છોડી દો.",
      "Yes, 3 quarters on the board and 1 quarter on the plate make the whole bar.": "હા, બોર્ડના 3 ચોથા ભાગ અને થાળીનો 1 ચોથો ભાગ મળી આખી ચોકલેટ.",
      "Write the fraction for this pizza, whose slices are all on the plate.": "આ પિઝાનો અપૂર્ણાંક લખો, તેના બધા ટુકડા થાળીમાં છે.",
      "Count every slice on the plate for the top number.": "ઉપરની સંખ્યા માટે થાળીનો દરેક ટુકડો ગણો.",
      "Count all the slices of the pizza for the bottom number.": "નીચેની સંખ્યા માટે પિઝાના બધા ટુકડા ગણો.",
      "Every slice is on the plate, so both numbers count the same slices.": "દરેક ટુકડો થાળીમાં છે, એટલે બંને સંખ્યા એ જ ટુકડા ગણે.",
      "Yes, all 4 quarters on the plate are the whole pizza.": "હા, થાળીના બધા 4 ચોથા ભાગ મળીને આખો પિઝા છે.",
      "A fraction of a group of things": "વસ્તુઓના સમૂહનો અપૂર્ણાંક",
      "Tap a roti on the shelf to lift it into the blue basket.": "છાજલી પરની એક રોટલી દબાવી વાદળી ટોપલીમાં મૂકો.",
      "Tap one roti on the shelf.": "છાજલી પર એક રોટલી દબાવો.",
      "Tap Count to count every roti, on the shelf and in the basket.": "ગણો દબાવી છાજલી અને ટોપલીની દરેક રોટલી ગણો.",
      "Tap the Count key beside the shelf.": "છાજલી પાસે ગણો બટન દબાવો.",
      "A group works like a whole: all go below the line, counted ones above.": "સમૂહ પણ આખા જેવો છે: બધી લીટી નીચે, ગણેલી વસ્તુ ઉપર.",
      "You learned: all the things go below the line, the ones counted above.": "તમે શીખ્યા: બધી વસ્તુ લીટી નીચે, ગણેલી ઉપર.",
      "Point at each roti once as you count.": "ગણતી વખતે દરેક રોટલી પર એક વાર આંગળી મૂકો.",
      "A fraction of a group is written like a fraction of a whole.": "સમૂહનો અપૂર્ણાંક પણ આખાના અપૂર્ણાંક જેવો લખાય.",
      "What fraction of all the rotis is in the blue basket?": "બધી રોટલીનો કેટલો અપૂર્ણાંક વાદળી ટોપલીમાં છે?",
      "Fraction in the basket": "ટોપલીમાં અપૂર્ણાંક",
      "The bottom number counts all the rotis, not only the shelf.": "નીચેની સંખ્યા બધી રોટલી ગણે છે, ફક્ત છાજલીની નહીં.",
      "Count the rotis in the basket for the top number.": "ઉપરની સંખ્યા માટે ટોપલીની રોટલી ગણો.",
      "Add the shelf rotis and the basket rotis for the bottom number.": "નીચેની સંખ્યા માટે છાજલી અને ટોપલીની રોટલી ઉમેરો.",
      "Yes, 6 of the 10 rotis are in the basket.": "હા, 10 માંથી 6 રોટલી ટોપલીમાં છે.",
      "Write the fraction of these rotis that we lifted into the basket.": "ટોપલીમાં મૂકેલી રોટલીનો અપૂર્ણાંક લખો.",
      "Rotis lifted": "ઉપાડેલી રોટલી",
      "Every roti, lifted or not, is counted below the line.": "દરેક રોટલી, ઉપાડેલી હોય કે નહીં, લીટી નીચે ગણાય.",
      "The top number counts only the lifted rotis.": "ઉપરની સંખ્યા ફક્ત ઉપાડેલી રોટલી ગણે છે.",
      "Count the basket, then count the shelf and the basket together.": "પહેલાં ટોપલી ગણો, પછી છાજલી અને ટોપલી સાથે.",
      "Yes, 7 of the 9 rotis went into the basket.": "હા, 9 માંથી 7 રોટલી ટોપલીમાં ગઈ.",
      "What fraction of the rotis is still on the shelf?": "રોટલીનો કેટલો અપૂર્ણાંક હજી છાજલી પર છે?",
      "Fraction on the shelf": "છાજલી પર અપૂર્ણાંક",
      "The top number counts the rotis that were not lifted.": "ઉપરની સંખ્યા ન ઉપાડેલી રોટલી ગણે છે.",
      "Count the rotis on the shelf, not the basket.": "છાજલીની રોટલી ગણો, ટોપલીની નહીં.",
      "All the rotis go below the line and the shelf ones above it.": "બધી રોટલી લીટી નીચે અને છાજલીવાળી ઉપર.",
      "Yes, 7 of the 10 rotis are still on the shelf.": "હા, 10 માંથી 7 રોટલી હજી છાજલી પર છે.",
      "Lay one part on another to check they match.": "એક ભાગ બીજા પર મૂકીને જુઓ કે સરખા છે.",
      "The name tells how many equal parts make the whole.": "નામ કહે છે કે આખામાં કેટલા સરખા ભાગ છે.",
      "Each part is just the same size as the other one.": "દરેક ભાગ બીજા ભાગ જેટલો જ મોટો છે.",
      "Two friends sharing the roti fairly get one part each.": "બે મિત્રો રોટલી સરખી વહેંચે તો દરેકને એક ભાગ મળે.",
      "Lay one slice on another: every slice matches.": "એક ટુકડો બીજા પર મૂકો, દરેક ટુકડો સરખો છે.",
      "The name of one slice comes from the number of slices.": "એક ટુકડાનું નામ ટુકડાની ગણતરી પરથી બને છે.",
      "Count the parts of each roti before you choose.": "પસંદ કરતાં પહેલાં દરેક રોટલીના ભાગ ગણો.",
      "The more parts a roti is cut into, the smaller each part.": "રોટલીના જેટલા વધુ ભાગ, દરેક ભાગ એટલો નાનો.",
      "numerator": "અંશ",
      "denominator": "છેદ",
      "One part is": "એક ભાગ છે",
      "one half": "અડધો ભાગ",
      "one third": "ત્રીજો ભાગ",
      "one quarter": "ચોથો ભાગ",
      "Not equal": "સરખા નથી",
      "Cut into": "ભાગ કરો",
      "Fraction card": "અપૂર્ણાંક કાર્ડ",
      "Roti": "રોટલી",
      "Pizza": "પિઝા",
      "Chocolate": "ચોકલેટ",
      "Put together": "જોડો",
      "By eye": "અંદાજે",
      "Cut": "કાપો",
      "Write": "લખો",
      "Change the plate first: lift or put back a piece.": "પહેલાં થાળી બદલો: કોઈ ટુકડો મૂકો કે પાછો લો.",
      "Count": "ગણો",
      "Bigger": "મોટો",
      "Left": "બાકી",
      "Taken": "લીધેલા",
      "Whole": "આખું"
  },
};

/* the labels are padded with no-break spaces (invisible, centred) so the runtime draws all of a row's keys at ONE size, the size the
   longest label needs (it sizes each key on its own; hi and gu are padded the same way in TR) */
const FM_HALF = " half ", FM_THIRD = " third ";
const FM_CH3 = [{ id: "half", label: FM_HALF }, { id: "third", label: FM_THIRD }, { id: "quarter", label: "quarter" }];

/* One entry per phase = one mount. Item fields of this tool: obj (roti | pizza | bar | group), np (equal parts or things),
   tk (indices taken: on the plate or in the basket), cnt (what the top number counts: "taken" or "left"), col (parts
   coloured in place), pair (two wholes cut into [a, b]), target (the card's fraction to make), win (the win line),
   near (the misconception's answer). warm = the guide steps' warm-up, never a question's own whole. */
const PHASES = [
  {
    n: 1,
    concept: "Equal parts: halves, thirds and quarters",
    conceptId: "M1.S1.T2.C6", objectiveIds: ["O1"],
    says: ["Cut the roti into equal parts. What is one part called?"],
    warm: { obj: "roti", np: 4, uncut: true },
    steps: [
      { say: "Tap By eye to cut this roti into 4 pieces by guessing.", on: "byeye", hint: "Tap the By eye key under the roti." },
      { say: "Now tap Cut to cut a fresh roti into 4 equal parts.", on: "cut", hint: "Tap the Cut key to cut it the fair way." },
    ],
    ladder: ["Lay one part on another to check they match.", "The name tells how many equal parts make the whole."],
    closing: "Fewer equal parts make bigger parts, so a half is bigger than a quarter.",
    learned: "You learned: 2, 3 or 4 equal parts are halves, thirds or quarters.",
    traceback: "The cut runs from 2 to 4 equal parts with the name card changing each time, and ends on the right name.",
    items: [
      /* practice 1 (plan: a chapati cut into 2 equal parts; answer a half) */
      { qid: "M1.S1.T2.C6:1", kind: "name", obj: "roti", np: 2, col: [0], choices: FM_CH3, answer: "half", near: "third",
        say: "This roti is cut into 2 equal parts, so what is the coloured part called?", ask: "Name the coloured part",
        miss: "Count the equal parts of the roti.",
        ladder: ["Each part is just the same size as the other one.", "Two friends sharing the roti fairly get one part each."],
        win: "Yes, one of 2 equal parts is one half." },
      /* learn FM1 (plan: a pizza cut into 3 equal slices; answer one-third) */
      { qid: "M1.S1.T2.C6:FM1", kind: "name", obj: "pizza", np: 3, col: [0], choices: FM_CH3, answer: "third", near: "half",
        say: "Now the pizza has 3 equal slices: what do we call the coloured one?", ask: "Name the slice",
        miss: "Count the slices, one cut line at a time.",
        ladder: ["Lay one slice on another: every slice matches.", "The name of one slice comes from the number of slices."],
        win: "Yes, one of 3 equal slices is one third." },
      /* authored (the owner's extra: a half beside a quarter of two equal wholes; the plan's practice 5, the torn roti, is the warm-up) */
      { qid: null, kind: "compare", obj: "roti", pair: [2, 4], choices: [{ id: "half", label: FM_HALF }, { id: "quarter", label: "quarter" }],
        answer: "half", near: "quarter",
        say: "One roti is in halves and one in quarters, so which coloured part is bigger?", ask: "Which is bigger?",
        miss: "Look at the two coloured parts side by side.",
        ladder: ["Count the parts of each roti before you choose.", "The more parts a roti is cut into, the smaller each part."],
        win: "Yes, a half is bigger than a quarter of the same roti." },
    ],
  },
  {
    n: 2,
    concept: "Coloured parts: the top and bottom numbers",
    conceptId: "M1.S1.T2.C7", objectiveIds: ["O2"],
    says: ["Take some pieces. Count all the pieces, then count the pieces you took."],
    warm: { obj: "pizza", np: 4, uncut: true },
    steps: [
      { say: "Tap 4 on the Cut dial to cut the pizza into 4 equal slices.", on: "dial4", hint: "Tap the key with 4 on it." },
      { say: "Tap one slice to lift it onto the blue plate.", on: "lift", hint: "Tap a slice of the pizza." },
      { say: "Tap Write to write the plate's fraction on the card.", on: "write", hint: "Tap the Write key under the plate." },
    ],
    ladder: ["Touch each part once as you count it.", "A fraction has two counts, one above and one below the line."],
    closing: "The bottom number counts all the parts, the top counts the parts taken.",
    learned: "You learned: bottom counts all equal parts, top counts parts taken.",
    traceback: "All the parts are counted in amber into the bottom box, then the plate's parts in blue into the top box.",
    items: [
      /* authored, so plan FM2 is unused (plan: a bar of 6 squares, 4 taken, numerator 4; here 2 parts, the owner's cut dial of 2 to 4) */
      { qid: null, kind: "frac", obj: "bar", np: 2, tk: [0], cnt: "taken", parts: SLOT_FRACTION, answer: [1, 2], near: "2|1",
        say: "What fraction of the chocolate bar is on the blue plate?", ask: "Fraction on the plate",
        miss: "The bottom number counts all the parts of the bar.",
        ladder: ["Count the bar's parts on the board and on the plate together.", "Then count only the part on the plate for the top number."],
        win: "Yes, 1 part of 2 is on the plate." },
      /* authored, so plan practice 2 is unused (plan: a jug of 7 marks filled to 5; the jug is gone, here a pizza of 3 slices with 2 taken) */
      { qid: null, kind: "frac", obj: "pizza", np: 3, tk: [0, 1], cnt: "taken", parts: SLOT_FRACTION, answer: [2, 3], near: "3|2",
        say: "Count the slices on the plate and on the board, then write the plate's fraction.", ask: "Slices on the plate",
        miss: "Count every slice of the pizza for the bottom number.",
        ladder: ["The slices sitting on the blue plate give the top number.", "Write the plate's slices on top and every slice of the pizza below."],
        win: "Yes, 2 of the 3 slices are on the plate." },
      /* authored, so plan practice 7 is unused (plan: a cake of 8, one more slice taken, the top number changes; here the child makes 3 quarters of a bar
         and watches the top number grow while the bottom stays) */
      { qid: null, kind: "make", obj: "bar", np: 4, tk: [], target: [3, 4], pad: "enter", answer: 3, near: 4,
        say: "Lift pieces onto the plate to make the card's fraction.", ask: "Make the card's fraction",
        miss: "The top number tells how many pieces go on the plate.",
        ladder: ["Look at the top number on the card, then count your plate.", "Lift or put back pieces until the plate holds the top number."],
        win: "Yes, 3 of the 4 pieces make the card's fraction." },
    ],
  },
  {
    n: 3,
    concept: "All the parts make one whole",
    conceptId: "M1.S1.T2.C8", objectiveIds: ["O1"],
    says: ["Put the slices back in the box. What do they make?"],
    warm: { obj: "pizza", np: 2, tk: [0, 1] },
    steps: [
      { say: "Tap Put together to put every slice back on the board.", on: "together", hint: "Tap the Put together key." },
    ],
    ladder: ["Count slowly and touch each part once.", "Look at both places, the board and the plate, before you write."],
    closing: "When the top and bottom numbers are the same, the parts make one whole.",
    learned: "You learned: the same top and bottom number makes one whole.",
    traceback: "Every part is counted in amber into the bottom box, then the asked parts in blue into the top box.",
    items: [
      /* practice 3 (plan: a pizza cut into thirds; how many thirds make the whole pizza) */
      { qid: "M1.S1.T2.C8:3", kind: "num", obj: "pizza", np: 3, tk: [0, 1, 2], answer: 3, near: 1,
        say: "Every slice is on the plate, so how many thirds make the whole pizza?", ask: "Thirds in the whole",
        miss: "Count the pizza slices on the plate.",
        ladder: ["Point at each slice on the plate as you count it.", "Each slice is one third, so the slices tell how many thirds."],
        win: "Yes, 3 thirds make the whole pizza." },
      /* authored (the owner's extra: the parts left and the parts taken make the whole; the plan's practice 6 is unused) */
      { qid: null, kind: "frac", obj: "bar", np: 4, tk: [0], cnt: "left", parts: SLOT_FRACTION, answer: [3, 4], near: "1|4",
        say: "One piece is on the plate, so what fraction of the bar is still on the board?", ask: "Fraction still on the board",
        miss: "Count only the pieces on the board for the top number.",
        ladder: ["Count every piece of the bar, board and plate, for the bottom.", "Leave out the piece on the plate when you count the top."],
        win: "Yes, 3 quarters on the board and 1 quarter on the plate make the whole bar." },
      /* authored, so plan FM3 is unused (plan: a cake of 7 slices all on the plate; the owner keeps every whole at 2 to 4 parts, so a pizza of 4) */
      { qid: null, kind: "frac", obj: "pizza", np: 4, tk: [0, 1, 2, 3], cnt: "taken", parts: SLOT_FRACTION, answer: [4, 4], near: "1|4",
        say: "Write the fraction for this pizza, whose slices are all on the plate.", ask: "Fraction on the plate",
        miss: "Count every slice on the plate for the top number.",
        ladder: ["Count all the slices of the pizza for the bottom number.", "Every slice is on the plate, so both numbers count the same slices."],
        win: "Yes, all 4 quarters on the plate are the whole pizza." },
    ],
  },
  {
    n: 4,
    concept: "A fraction of a group of things",
    conceptId: "M1.S1.T2.C9", objectiveIds: ["O2"],
    says: ["Here is a group of things. Count them all, then count the ones in the basket."],
    warm: { obj: "group", np: 5, tk: [0] },
    steps: [
      { say: "Tap a roti on the shelf to lift it into the blue basket.", on: "lift", hint: "Tap one roti on the shelf." },
      { say: "Tap Count to count every roti, on the shelf and in the basket.", on: "count", hint: "Tap the Count key beside the shelf." },
    ],
    ladder: ["Point at each roti once as you count.", "A fraction of a group is written like a fraction of a whole."],
    closing: "A group works like a whole: all go below the line, counted ones above.",
    learned: "You learned: all the things go below the line, the ones counted above.",
    traceback: "Every roti is counted in amber into the bottom box, then the asked rotis in blue into the top box.",
    items: [
      /* learn FM4 (plan: 10 laddoos, 6 yellow; the owner: the group is rotis, the counted ones in the basket) */
      { qid: "M1.S1.T2.C9:FM4", kind: "frac", obj: "group", np: 10, tk: [0, 2, 3, 5, 7, 8], cnt: "taken", parts: SLOT_FRACTION, answer: [6, 10], near: "6|4",
        say: "What fraction of all the rotis is in the blue basket?", ask: "Fraction in the basket",
        miss: "The bottom number counts all the rotis, not only the shelf.",
        ladder: ["Count the rotis in the basket for the top number.", "Add the shelf rotis and the basket rotis for the bottom number."],
        win: "Yes, 6 of the 10 rotis are in the basket." },
      /* practice 4 (plan: 9 balloons, 7 red; here 9 rotis, 7 in the basket) */
      { qid: "M1.S1.T2.C9:4", kind: "frac", obj: "group", np: 9, tk: [0, 1, 3, 4, 5, 7, 8], cnt: "taken", parts: SLOT_FRACTION, answer: [7, 9], near: "7|2",
        say: "Write the fraction of these rotis that we lifted into the basket.", ask: "Rotis lifted",
        miss: "Every roti, lifted or not, is counted below the line.",
        ladder: ["The top number counts only the lifted rotis.", "Count the basket, then count the shelf and the basket together."],
        win: "Yes, 7 of the 9 rotis went into the basket." },
      /* practice 8 (plan: 10 bangles, 3 red, red and not red; here 10 rotis, 3 in the basket, the 7 still on the shelf) */
      { qid: "M1.S1.T2.C9:8", kind: "frac", obj: "group", np: 10, tk: [1, 4, 8], cnt: "left", parts: SLOT_FRACTION, answer: [7, 10], near: "3|10",
        say: "What fraction of the rotis is still on the shelf?", ask: "Fraction on the shelf",
        miss: "The top number counts the rotis that were not lifted.",
        ladder: ["Count the rotis on the shelf, not the basket.", "All the rotis go below the line and the shelf ones above it."],
        win: "Yes, 7 of the 10 rotis are still on the shelf." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = { wholes: ["roti", "pizza", "bar"], disc: 300, bar: [320, 85], groupThing: 80, cutDial: [2, 3, 4],
  names: FM_NAMES, plate: "blue (taken)", board: "amber (left)" };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer counted again from the item's own picture data (shares no code with judge or Work) */
const fmTruth = (it: any) => {
  const kn: any = { 2: "half", 3: "third", 4: "quarter" };
  if (it.kind === "name") return kn[it.np];
  if (it.kind === "compare") return kn[Math.min(it.pair[0], it.pair[1])];
  if (it.kind === "num") return it.tk.length === it.np ? it.np : null;
  if (it.kind === "make") return it.target[0];
  const t = it.tk.length;
  return [it.cnt === "left" ? it.np - t : t, it.np];
};
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => JSON.stringify(fmTruth(it)) === JSON.stringify(it.answer)));
/* the most likely wrong answer (the item's misconception); judge must reject it */
const nearMiss = (item: any) => (item.near !== undefined ? item.near : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
  : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for the make question: lift that many pieces, as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* nothing waits on the board before Enter (and the demo stage must reach api.onEnter) */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area ────────────────────────────────────────────────────────────────────────
   keyOnly: 1472 x 520 with the panel shut, 900 x 520 open (bigPad); box.key is the key's corner (kept clear). Everything is
   drawn in one 900 x 520 frame placed at ox: centred while there is room, never under the key's corner, at 0 with the panel open.
   Layouts: "one" (a whole and the name card), "pair" (two equal rotis), "two" (the amber board, the blue plate, the fraction
   card), "group" (a shelf and a basket of rotis, the card). */
function Work({ phase, n, item, index, stage, wrong, typed, part, api, step, stepOn, box, answerOn, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const rm = reducedMotion();
  const free = stage === "free";
  const demoLike = stage === "demo" || stage === "teach";
  const isDemo = stage === "demo";
  const asking = stage === "ask";
  const sc: any = free ? FM_FREE : demoLike && phase.warm ? phase.warm : item;
  /* the board belongs to the ENTRY, not the question: a question entered again opens fresh (PATTERNS §18) */
  const qk = n + "|" + (free ? "f" : demoLike && phase.warm ? "w" : index);
  const ent = useRef({ qk: "", e: 0 });
  if (ent.current.qk !== qk) ent.current = { qk, e: ent.current.e + 1 };
  const E = ent.current.e;
  const [raw, setRaw] = useState<any>(() => fmFresh(sc, E));
  const S: any = raw.e === E ? raw : fmFresh(sc, E);
  const upd = (f: any) => setRaw((p0: any) => { const p = p0.e === E ? p0 : fmFresh(sc, E); return { ...p, ...f(p) }; });
  const [tbRaw, setTbRaw] = useState<any>({ e: 0 });
  const tb: any = tbRaw.e === E ? tbRaw : { e: E };
  const setTb = (o: any) => setTbRaw((p: any) => ({ ...(p.e === E ? p : { e: E }), ...o }));
  const playing = useRef(false);
  const acted = useRef(true);
  const nudged = useRef(false);
  const lockRef = useRef(false);
  const lastKey = useRef(0);
  const liftRef = useRef(0);
  const queue = useRef<any[]>([]);
  const liftNow = useRef<any>(null);
  useEffect(() => () => {
    tl.stop(); playing.current = false; queue.current = []; nudged.current = false;
    if (lockRef.current) { lockRef.current = false; api.lock(false); }
  }, [qk]);

  const stp = stage === "teach" ? 0 : step;
  const make = !free && !demoLike && item.kind === "make";
  const won = !free && !demoLike && (stage === "win" || stage === "idle");
  const kind = sc.pair ? "pair" : S.obj === "group" ? "group" : S.obj === "bar" ? "bar" : !free && n === 1 ? "one" : "two";
  const bw = box ? box.w : 1472;
  const kx = box && box.key ? box.key.x - 12 : bw;
  /* laid out for the OPEN keypad and kept at that size and place when it shuts; phase 1 (choice keys) and free play have no keypad, so they centre */
  const ox = kind === "one" || kind === "pair" || free ? Math.max(0, Math.min((bw - FM_FW) / 2, kx - FM_FW)) : 0;
  const g: any = fmGeo(kind, S.obj, S.np, 0);
  const cutDone = fmCutDone(S);
  const lifted = S.taken.filter(Boolean).length;
  liftRef.current = lifted;
  /* phase 3's win: every piece goes back onto the board, inside the green Whole outline */
  const allBack = won && n === 3 && item.cnt !== "left";
  /* a "left" question keeps its taken part on the plate: the outline goes round both, so left + taken read as the whole */
  const wholeBoth = won && n === 3 && item.cnt === "left";
  const makeWon = make && won;
  const tkOf = (i: number) => (allBack ? false : makeWon ? i < item.target[0] : !!S.taken[i]);
  const P: any[] = fmPieces(S.obj, S.np, S.uneven, g);
  const mv = g.mv;
  /* a group is packed left to right in each place (no holes where a roti was lifted): its k-th roti on the shelf, or in the basket */
  const gpos = (i: number) => {
    const role = tkOf(i), k = P.slice(0, i).filter((_: any, j: number) => tkOf(j) === role).length;
    return [g.x0 + (k % 5) * g.pitch, g.y0 + Math.floor(k / 5) * g.rowH + (role ? mv[1] : 0)];
  };
  const at = (i: number) => {
    if (S.obj === "group") { const q = gpos(i); return [q[0] + g.s / 2, q[1] + g.s / 2]; }
    const m = P[i].mid; return tkOf(i) ? [m[0] + mv[0], m[1] + mv[1]] : m;
  };
  const wp = (c: any) => ({ x: ox + c[0], y: c[1] });

  /* ── the acts: every one performed on screen (api.act), the state changing as the tool passes each point ── */
  const go = (o: any, done: any) => {
    if (playing.current) return;
    playing.current = true;
    Promise.resolve(api.act(o)).then((ok: any) => { playing.current = false; if (ok) done(); });
  };
  const cutAct = (on: string, np: number, uneven: boolean) => {
    const obj = S.obj, gg = fmGeo(kind, obj, np, 0);
    upd(() => ({ np, uneven, cut: 0, taken: Array(np).fill(false), together: false, written: 0, counted: 0 }));
    const cuts: any[] = fmCuts(obj, np, uneven, gg);
    const pts = obj === "bar" ? cuts.map((x: number) => ({ x: ox + x, y: gg.y + gg.h / 2 }))
      : cuts.map((a: number) => wp(fmPol(gg.cx, gg.cy, gg.R * 0.64, a)));
    go({ tool: "knife", moves: "slice", at: pts, ms: 1000, onPoint: (k: number) => upd(() => ({ cut: k + 1 })) },
      () => { upd(() => ({ cut: 99 })); api.sfx.settle(); api.did(on); });
  };
  const lift = (i: number) => {
    if (isDemo && stepOn !== "lift") { api.did("lift"); return; }
    if (!cutDone) return;
    /* a second tap while the hand is still busy is kept and done next, never dropped */
    if (playing.current) { if (!isDemo) queue.current.push(i); return; }
    if (isDemo && S.taken[i]) { api.did("putback"); return; }
    go({ tool: "hand", moves: "tap", at: [wp(at(i))], ms: 800,
      onPoint: () => upd((p: any) => { const t = p.taken.slice(); t[i] = !t[i]; return { taken: t, together: false }; }) },
      () => {
        acted.current = true; api.did("lift");
        if (nudged.current && make) { nudged.current = false; api.say(item.say); }
        const nx = queue.current.shift();
        if (nx !== undefined) setTimeout(() => liftNow.current && liftNow.current(nx), 0);
      });
  };
  liftNow.current = lift;
  const act = (on: string) => {
    if (isDemo && on !== stepOn) { api.did(on); return; }
    if (playing.current) return;
    if (on === "byeye") { cutAct(on, 4, true); return; }
    if (on === "cut") { cutAct(on, S.np, false); return; }
    if (on.indexOf("dial") === 0) { cutAct(on, Number(on.slice(4)), false); return; }
    if (on === "lift") { const i = S.taken.findIndex((t: any) => !t); if (i >= 0) lift(i); return; }
    if (on === "roti" || on === "pizza" || on === "bar") { upd(() => fmFresh({ obj: on, np: S.np, uncut: true }, E)); api.did(on); return; }
    if (on === "write") {
      const c = FM_CARD, mx = ox + c.x + c.w / 2;
      go({ tool: "pencil", moves: "write", text: [{ line: [ox + c.x + 22, c.bar, ox + c.x + c.w - 22, c.bar], size: T.display }, String(S.np), String(lifted)],
        at: [null, { x: mx, y: c.botC + 26 }, { x: mx, y: c.topC + 26 }], size: [T.display, T.display, T.display], align: "middle",
        onPoint: (j: number) => upd(() => ({ written: j + 1 })) },
        () => { upd(() => ({ written: 3 })); api.did("write"); });
      return;
    }
    if (on === "together") {
      const idx = S.taken.map((t: any, i: number) => (t ? i : -1)).filter((i: number) => i >= 0);
      if (!idx.length || !cutDone) { api.did(on); return; }
      go({ tool: "hand", moves: "tap", ms: 1000, at: idx.map((i: number) => wp(at(i))),
        onPoint: (k: number) => upd((p: any) => { const t = p.taken.slice(); t[idx[k]] = false; return { taken: t }; }) },
        () => { upd(() => ({ together: true })); api.sfx.trade(); api.did(on); });
      return;
    }
    if (on === "count") {
      go({ tool: "hand", moves: "tap", ms: 1000, at: P.map((_: any, i: number) => wp(at(i))),
        onPoint: (k: number) => upd(() => ({ counted: k + 1 })) },
        () => { upd(() => ({ counted: S.np })); api.did(on); });
    }
  };
  const press = (id: string) => { const t = Date.now(); if (t - lastKey.current < 400) return; lastKey.current = t; act(id); };

  /* Enter, the agent's check() and the dev solve() perform the current step; on the make question Enter sends the plate's count,
     and the same plate again (no lift since the miss) gets a nudge instead of a second try */
  api.onEnter(isDemo && stepOn ? () => act(stepOn)
    : make && asking ? () => {
      if (liftRef.current > 0 && acted.current) { api.submit(liftRef.current); return; }
      if (liftRef.current > 0) { nudged.current = true; api.say("Change the plate first: lift or put back a piece."); }
    } : null);
  HOOK.demo = isDemo && stepOn ? () => act(stepOn) : null;
  HOOK.set = make ? (v: any) => {
    const k = Math.max(0, Math.min(S.np, Math.round(Number(v) || 0)));
    liftRef.current = k; acted.current = true;
    upd(() => ({ taken: Array.from({ length: S.np }, (_, i) => i < k) }));
    return true;
  } : null;
  HOOK.check = null;
  useEffect(() => { if (make && asking) api.answerReady(lifted > 0); }, [lifted, stage, qk]);
  /* every right answer has its own one-sentence line (a phase's last is replaced by its closing) */
  /* said a tick later: the runtime's own state reads "win" only after its effects, and only then does it swap a phase's last win line for the closing */
  useEffect(() => {
    if (stage !== "win" || !item || !item.win) return;
    const t = setTimeout(() => api.say(item.win), 0);
    return () => clearTimeout(t);
  }, [stage, qk]);

  /* the traceback: redraw the maths, end on the whole right answer, unmarked */
  const countedSet = () => {
    if (item.kind === "make") return Array.from({ length: item.target[0] }, (_, i) => i);
    const want = item.cnt !== "left";
    return S.taken.map((t: any, i: number) => (!!t === want ? i : -1)).filter((i: number) => i >= 0);
  };
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    acted.current = false;
    lockRef.current = true; api.lock(true);
    const typedAt = typed, seq: any[] = [];
    if (item.kind === "name") {
      setTb({ cyc: 0, done: 0 });
      [2, 3, 4, item.np].forEach((c, k) => seq.push([k < 3 ? 900 : 400, () => setTb({ cyc: c })]));
    } else if (item.kind === "compare") {
      setTb({ lay: 0, ring: 0, done: 0 });
      seq.push([500, () => setTb({ lay: 1 })], [1200, () => setTb({ lay: 2 })], [500, () => setTb({ ring: 1 })]);
    } else {
      setTb({ all: 0, top: 0, bot: 0, tops: 0, done: 0, typedAt: null });
      const gap = S.np > 6 ? 240 : 380, cs = countedSet();
      for (let i = 1; i <= S.np; i++) seq.push([gap, () => setTb({ all: i })]);
      seq.push([300, () => setTb({ bot: S.np })]);
      for (let j = 1; j <= cs.length; j++) seq.push([gap, () => setTb({ top: j })]);
      seq.push([300, () => setTb({ tops: cs.length })]);
    }
    tl.run(seq, () => { setTb({ done: 1, typedAt }); lockRef.current = false; api.lock(false); });
  }, [wrong]);

  /* what the host and the agent read back (never a count that answers the question) */
  api.share({ whole: S.obj, uneven: !!S.uneven, together: !!S.together, group: S.obj === "group", complete: stage === "idle" });

  /* ── drawing (helpers are called, never mounted) ── */
  const uid = "fm" + n + (free ? "f" : demoLike ? "w" : index) + "-";
  const dev = lang === "hi" || lang === "gu";
  /* a role pill: one size per language (Devanagari and Gujarati a step smaller, so the matras clear the outline) */
  const chip = (cx: number, y: number, label: string, ink: string, fill: string, edge: string, w = 170, fs = 0) => (
    <g filter="url(#fmShadowSoft)">
      <rect x={cx - w / 2} y={y} width={w} height={56} rx={28} fill={fill} stroke={edge} strokeWidth={3} />
      <text x={cx} y={y + 28} textAnchor="middle" dominantBaseline="central" fontSize={fs || (dev ? T.label : T.prompt)} fontWeight={700} fill={ink}>{tx(label)}</text>
    </g>
  );
  const numChip = (c: any, t: number, blue: boolean, k: string) => (
    <g key={k} filter="url(#fmShadowSoft)">
      <circle cx={c[0]} cy={c[1]} r={27} fill="#FFFFFF" stroke={blue ? FM_BLUE : FM_AMBER_EDGE} strokeWidth={4} />
      <text x={c[0]} y={c[1]} textAnchor="middle" dominantBaseline="central" fontSize={T.label} fontWeight={700} fill={blue ? FM_BLUE_INK : FM_AMBER_INK}>{t}</text>
    </g>
  );
  /* one whole in its geometry gg: uncut (with the cut lines made so far) or its pieces, each with its skin clipped to it */
  const objEl = (Sd: any, gg: any, tag: string, o: any = {}) => {
    const obj = Sd.obj, isBar = obj === "bar";
    if (!fmCutDone(Sd)) {
      const cuts: any[] = fmCuts(obj, Sd.np, Sd.uneven, gg).slice(0, Sd.cut);
      if (isBar) return (
        <g>
          <clipPath id={tag + "w"}><rect x={gg.x} y={gg.y} width={gg.w} height={gg.h} rx={8} /></clipPath>
          <rect x={gg.x} y={gg.y} width={gg.w} height={gg.h} fill={FM_PLAIN.bar} rx={8} />
          <Skin name="bar" x={gg.x} y={gg.y} w={gg.w} h={gg.h} fit="stretch" clip={"url(#" + tag + "w)"} />
          <rect x={gg.x} y={gg.y} width={gg.w} height={gg.h} fill={FM_CREAM} fillOpacity={FM_CREAM_A} rx={8} />
          <rect x={gg.x} y={gg.y} width={gg.w} height={gg.h} fill="none" stroke={FM_LINE} strokeWidth={4} rx={8} />
          {cuts.map((x: number, k: number) => <line key={k} x1={x} y1={gg.y} x2={x} y2={gg.y + gg.h} stroke={FM_LINE} strokeWidth={4} strokeLinecap="round" />)}
        </g>
      );
      return (
        <g>
          <clipPath id={tag + "w"}><circle cx={gg.cx} cy={gg.cy} r={gg.R} /></clipPath>
          <circle cx={gg.cx} cy={gg.cy} r={gg.R} fill={FM_PLAIN[obj]} />
          <Skin name={obj} x={gg.cx - gg.R} y={gg.cy - gg.R} w={2 * gg.R} h={2 * gg.R} clip={"url(#" + tag + "w)"} />
          <circle cx={gg.cx} cy={gg.cy} r={gg.R} fill="none" stroke={FM_LINE} strokeWidth={3.5} />
          {cuts.map((a: number, k: number) => { const q = fmPol(gg.cx, gg.cy, gg.R, a); return <line key={k} x1={gg.cx} y1={gg.cy} x2={q[0]} y2={q[1]} stroke={FM_LINE} strokeWidth={4} strokeLinecap="round" />; })}
        </g>
      );
    }
    const PP: any[] = fmPieces(obj, Sd.np, Sd.uneven, gg), mvv = gg.mv;
    return (
      <g>
        {PP.map((p: any) => {
          const tk = o.taken ? o.taken(p.i) : false, blue = tk || (o.col || []).includes(p.i), id = tag + "p" + p.i;
          const sh = (pr: any) => (p.d ? <path d={p.d} {...pr} /> : obj === "group" ? <circle cx={p.mid[0]} cy={p.mid[1]} r={gg.s / 2} {...pr} />
            : <rect x={p.rect[0] + 2} y={p.rect[1]} width={p.rect[2] - 4} height={p.rect[3]} rx={6} {...pr} />);
          const hw = obj === "bar" ? p.rect[2] - 4 : 110, hh = obj === "bar" ? gg.h : 110;
          const nm = obj === "group" ? "roti" : obj === "bar" ? "square" : "slice";
          return (
            <g key={p.i} style={{ transform: o.pos ? `translate(${o.pos(p.i)[0] - p.rect[0]}px, ${o.pos(p.i)[1] - p.rect[1]}px)` : tk ? `translate(${mvv[0]}px, ${mvv[1]}px)` : "translate(0px, 0px)", transition: rm ? "none" : "transform 0.5s ease" } as any}>
              <clipPath id={id}>{sh({})}</clipPath>
              {sh({ fill: FM_PLAIN[obj === "group" ? "roti" : obj] })}
              {obj === "bar" ? <Skin name="bar" x={gg.x} y={gg.y} w={gg.w} h={gg.h} fit="stretch" clip={"url(#" + id + ")"} />
                : obj === "group" ? <Skin name="roti" x={p.rect[0]} y={p.rect[1]} w={gg.s} h={gg.s} clip={"url(#" + id + ")"} />
                : <Skin name={obj} x={gg.cx - gg.R} y={gg.cy - gg.R} w={2 * gg.R} h={2 * gg.R} clip={"url(#" + id + ")"} />}
              {/* the colour code: a taken bar part deep blue, a left one cream (4:1 apart on the dark chocolate); a round thing keeps its
                  own detail under a blue hue (blend "color") with a blue rim */}
              {isBar && !blue ? sh({ fill: FM_CREAM, fillOpacity: FM_CREAM_A }) : null}
              {blue ? sh({ fill: FM_HUE, fillOpacity: isBar ? 1 : 0.85, style: { mixBlendMode: "color" } }) : null}
              {blue ? sh({ fill: "none", stroke: FM_BLUE, strokeWidth: 8, strokeOpacity: 0.85 }) : null}
              {sh({ fill: "none", stroke: FM_LINE, strokeWidth: isBar ? 4 : 3.5, strokeLinejoin: "round", strokeLinecap: "round" })}
              {o.live && <Hit id={nm + "-" + (p.i + 1)} x={p.mid[0] - hw / 2} y={p.mid[1] - hh / 2} w={hw} h={hh} label={nm + " " + (p.i + 1)} onPress={() => lift(p.i)} />}
            </g>
          );
        })}
      </g>
    );
  };
  /* the fraction card: numerator box over the line over the denominator box; its digits come from the caller */
  const card = (top: string, bot: string, o: any = {}) => {
    const c = FM_CARD, mx = c.x + c.w / 2;
    const boxEl = (b: any, on: boolean, lit: string) => (
      <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={16} fill={lit || "#FFFDF7"} stroke={on ? FM_BLUE : C.ink} strokeWidth={on ? 6 : 3.5} />
    );
    const dig = (t: string, b: any) => t !== "" && <text x={mx} y={b.y + b.h / 2} textAnchor="middle" dominantBaseline="central" fontSize={T.display} fontWeight={700} fill={C.ink}>{t}</text>;
    return (
      <g filter="url(#fmShadowSoft)">
        <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={22} fill="url(#fmCardGrad)" stroke={C.rule} strokeWidth={3} />
        <text x={mx} y={c.y + 30} textAnchor="middle" dominantBaseline="central" fontSize={T.micro} fontWeight={500} fill={C.ink}>{tx("numerator")}</text>
        {boxEl(c.top, !!o.onTop, o.litTop || "")}
        {o.noBar ? null : <line x1={c.x + 22} y1={c.bar} x2={c.x + c.w - 22} y2={c.bar} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />}
        {boxEl(c.bot, !!o.onBot, o.litBot || "")}
        <text x={mx} y={c.y + c.h - 18} textAnchor="middle" dominantBaseline="central" fontSize={T.micro} fontWeight={500} fill={C.ink}>{tx("denominator")}</text>
        {dig(top, c.top)}
        {dig(bot, c.bot)}
        {o.caretTop && <line x1={mx + top.length * 20 + 10} y1={c.top.y + 22} x2={mx + top.length * 20 + 10} y2={c.top.y + c.top.h - 22} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />}
        {o.caretBot && <line x1={mx + bot.length * 20 + 10} y1={c.bot.y + 22} x2={mx + bot.length * 20 + 10} y2={c.bot.y + c.bot.h - 22} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />}
        {o.extra}
      </g>
    );
  };
  /* the action keys, one row; a sequence is ONE key whose label follows the act; each key is as wide as its label in THIS language */
  const kwOf = (label: string, min: number) => Math.max(min, Math.ceil(String(tx(label)).length * T.label * (dev ? 0.8 : 0.6)) + 44);
  const nextWhole: any = { roti: "pizza", pizza: "bar", bar: "roti" };
  const keysOf = (): any[] => {
    if (free) {
      const nx = nextWhole[S.obj] || "roti", pw = Math.max(...["roti", "pizza", "bar"].map((k) => kwOf(FM_WHOLE_LABEL[k], 120)));
      return [[nx, FM_WHOLE_LABEL[nx], pw], ["dial2", "2", 76], ["dial3", "3", 76], ["dial4", "4", 76], ["together", "Put together", kwOf("Put together", 160)]];
    }
    if (!demoLike) return [];
    if (n === 1) return stp === 0 ? [["byeye", "By eye", kwOf("By eye", 200)]] : stp === 1 ? [["cut", "Cut", kwOf("Cut", 200)]] : [];
    if (n === 2) return stp === 0 ? [["dial2", "2", 88], ["dial3", "3", 88], ["dial4", "4", 88]] : stp === 2 ? [["write", "Write", kwOf("Write", 200)]] : [];
    if (n === 3) return stp === 0 ? [["together", "Put together", kwOf("Put together", 220)]] : [];
    if (n === 4) return stp === 1 ? [["count", "Count", kwOf("Count", 200)]] : [];
    return [];
  };
  const ks = keysOf();
  const kcx = free ? FM_FW / 2 : kind === "one" ? 700 : kind === "group" ? 336 : 343;
  const kyy = free ? 440 : kind === "one" ? 370 : kind === "group" ? 436 : 424;
  const kGap = free ? 10 : 12;
  const kTot = ks.reduce((a: number, k: any) => a + k[2], 0) + Math.max(0, ks.length - 1) * kGap;
  let kxx = kcx - kTot / 2;
  const keyBoxes = ks.map((k: any) => { const b = { id: k[0], label: k[1], x: kxx, y: kyy, w: k[2], h: 72 }; kxx += k[2] + kGap; return b; });
  const dialNote = !free && n === 2 && demoLike && stp === 0 && keyBoxes.length ? keyBoxes[0] : null;
  const invKey = isDemo && stepOn ? keyBoxes.find((b: any) => b.id === stepOn) : null;
  const firstFree = S.taken.findIndex((t: any) => !t);
  const invPiece = isDemo && stepOn === "lift" && cutDone && firstFree >= 0 ? at(firstFree) : null;

  /* the card's digits */
  const tp = slotPartsOf(typed, 2);
  const tbOn = tb.all !== undefined && (!tb.done || typed === tb.typedAt);
  let topT = "", botT = "";
  if (free) { topT = cutDone ? String(lifted) : ""; botT = cutDone ? String(S.np) : ""; }
  else if (demoLike) { topT = ""; botT = ""; }
  else if (make) { topT = String(item.target[0]); botT = String(item.target[1]); }
  else if (won) { const a = Array.isArray(item.answer) ? item.answer : [item.answer, item.np]; topT = String(a[0]); botT = String(a[1]); }
  else if (tbOn) { topT = tb.tops ? String(tb.tops) : ""; botT = tb.bot ? String(tb.bot) : ""; }
  else if (item.parts) { topT = tp[0] || ""; botT = tp[1] || ""; }
  const cardAsk = answerOn === "card" && asking && !lockRef.current;
  const open = !!(box && box.open);
  const penCard = !free && n === 2 && demoLike;
  const C2 = FM_CARD, pmx = C2.x + C2.w / 2;
  const leftCnt = !free && !demoLike && item.cnt === "left";
  /* the one-number question (how many thirds) is typed in the keypad: its card stays away until the correction or the win fills it */
  const hideCard = kind === "one" || kind === "pair" || (!free && !demoLike && item.kind === "num" && !won && !tbOn);
  const cardEl = hideCard ? null : card(topT, botT, {
    onTop: cardAsk && open && part === 0, onBot: cardAsk && open && part === 1,
    caretTop: cardAsk && open && part === 0, caretBot: cardAsk && open && part === 1,
    litTop: (tbOn && tb.tops) || won ? (leftCnt ? tint(FM_AMBER, 0.55) : tint(FM_BLUE, 0.82)) : "",
    litBot: (tbOn && tb.bot) || won ? tint(FM_AMBER, 0.55) : "",
    noBar: penCard && S.written < 1,
    extra: penCard ? (
      <g>
        {S.written >= 1 && <PencilLine x1={C2.x + 22} y1={C2.bar} x2={C2.x + C2.w - 22} y2={C2.bar} size={T.display} />}
        {S.written >= 2 && <PencilText text={String(S.np)} x={pmx} y={C2.botC + 26} size={T.display} align="middle" />}
        {S.written >= 3 && <PencilText text={String(lifted)} x={pmx} y={C2.topC + 26} size={T.display} align="middle" />}
      </g>
    ) : null,
  });

  /* the pieces' number chips, each in its piece's role colour (blue taken, amber left): the count step (phase 4) and the traceback
     (every piece counted, the others first, then the asked ones counted again 1, 2, 3 ...) */
  const chipsEl = () => {
    if (S.obj === "group" && demoLike && S.counted) return P.slice(0, S.counted).map((_: any, i: number) => numChip(at(i), i + 1, tkOf(i), "c" + i));
    if (tb.all === undefined || kind === "one" || kind === "pair") return null;
    if (make) {
      /* the make question's correction: count the pieces, then ghost the target count of pieces onto the plate (blue) */
      const K = Math.min(tb.top || 0, item.target[0]), out: any[] = [];
      P.forEach((_: any, i: number) => { if (i < tb.all && !(i < K && tkOf(i))) out.push(numChip(at(i), i + 1, tkOf(i), "a" + i)); });
      for (let r = 0; r < K; r++) {
        const q = P[r], gx = q.rect[0] + mv[0], gy = q.rect[1] + mv[1];
        out.push(
          <g key={"g" + r}>
            <rect x={gx + 2} y={gy} width={q.rect[2] - 4} height={q.rect[3]} fill={FM_BLUE} fillOpacity={0.25} stroke={FM_BLUE_INK} strokeWidth={4} strokeDasharray="10 7" rx={6} />
            {numChip([gx + q.rect[2] / 2, gy + q.rect[3] / 2], r + 1, true, "gb" + r)}
          </g>
        );
      }
      return out;
    }
    const cs = countedSet(), order = [...P.map((_: any, i: number) => i).filter((i: number) => cs.indexOf(i) < 0), ...cs], out: any[] = [];
    order.forEach((i: number, k: number) => {
      const r = cs.indexOf(i);
      if (r >= 0 && r < tb.top) out.push(numChip(at(i), r + 1, tkOf(i), "b" + i));
      else if (k < tb.all) out.push(numChip(at(i), k + 1, tkOf(i), "a" + i));
    });
    return out;
  };

  /* ── the layouts ── */
  const board = (x: number, y: number, w: number, h: number, rx = 28) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={rx} fill="url(#fmBoardGrad)" stroke={FM_AMBER_EDGE} strokeWidth={5} filter="url(#fmShadowSoft)" />
      <rect x={x + 8} y={y + 8} width={w - 16} height={h - 16} rx={rx - 6} fill="none" stroke="#FFFFFF" strokeWidth={2} opacity={0.4} />
    </g>
  );
  let body: any = null;
  if (kind === "one") {
    const Sd = tb.cyc ? { ...fmFresh({ obj: S.obj, np: tb.cyc }, E) } : S;
    const word = tb.cyc ? FM_NAMES[tb.cyc] : demoLike ? (S.cut > 0 && cutDone ? (S.uneven ? "Not equal" : FM_NAMES[S.np]) : "")
      : won ? FM_NAMES[item.np] : "";
    const shown = word ? tx(word) : "?";
    body = (
      <g>
        {board(0, 20, 470, 470)}
        {objEl(Sd, g, uid + (tb.cyc ? "c" + tb.cyc : "o"), { col: demoLike ? [] : [0] })}
        <g filter="url(#fmShadowSoft)">
          <rect x={520} y={150} width={360} height={180} rx={24} fill="url(#fmCardGrad)" stroke={C.rule} strokeWidth={3} />
          <text x={700} y={196} textAnchor="middle" dominantBaseline="central" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("One part is")}</text>
          <text x={700} y={268} textAnchor="middle" dominantBaseline="central" fontSize={String(shown).length > 9 ? T.speech : T.xl} fontWeight={700} fill={C.ink}>{shown}</text>
        </g>
      </g>
    );
  } else if (kind === "pair") {
    const A = fmFresh({ obj: S.obj, np: sc.pair[0] }, E), B = fmFresh({ obj: S.obj, np: sc.pair[1] }, E);
    const gA = fmGeo("pair", S.obj, sc.pair[0], 0), gB = fmGeo("pair", S.obj, sc.pair[1], 1);
    const ring = won || tb.ring;
    body = (
      <g>
        {board(gA.cx - 200, 70, 400, 400)}
        {board(gB.cx - 200, 70, 400, 400)}
        {objEl(A, gA, uid + "a", { col: [0] })}
        {objEl(B, gB, uid + "b", { col: [0] })}
        {tb.lay ? (
          <g pointerEvents="none" style={{ transform: tb.lay > 1 ? `translate(${gA.cx - gB.cx}px, 0px)` : "translate(0px, 0px)", transition: rm ? "none" : "transform 0.9s ease" } as any}>
            <path d={fmWedge(gB.cx, gB.cy, gB.R, 0, 90)} fill={FM_BLUE} fillOpacity={0.6} stroke={FM_BLUE_INK} strokeWidth={5} strokeDasharray="12 8" />
          </g>
        ) : null}
        {ring ? (
          <g pointerEvents="none">
            <path d={fmWedge(gA.cx, gA.cy, gA.R + 9, 0, 180)} fill="none" stroke={FM_VERM} strokeWidth={7} strokeLinejoin="round" />
            {chip(gA.cx + 90, 8, "Bigger", FM_VERM_INK, "#FCE9DC", FM_VERM, 180)}
          </g>
        ) : null}
        {ring || tb.lay ? (
          <g pointerEvents="none">
            <text x={gA.cx} y={496} textAnchor="middle" dominantBaseline="central" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{tx("one half")}</text>
            <text x={gB.cx} y={496} textAnchor="middle" dominantBaseline="central" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{tx("one quarter")}</text>
          </g>
        ) : null}
      </g>
    );
  } else if (kind === "group") {
    const big = g.big, rows = Math.ceil(S.np / 5), cw = big ? 672 : 540, ch = rows * g.rowH + 12, sy = g.y0 - 12;
    body = (
      <g>
        {board(0, sy, cw, ch, 18)}
        {Array.from({ length: rows }, (_, r) => <rect key={r} x={8} y={g.y0 + g.s + 2 + r * g.rowH} width={cw - 16} height={8} rx={4} fill={FM_AMBER_EDGE} />)}
        <rect x={0} y={sy + g.mv[1]} width={cw} height={ch} rx={30} fill="url(#fmPlateGrad)" stroke={FM_BLUE} strokeWidth={8} filter="url(#fmShadowSoft)" />
        {big ? chip(85, sy - 62, "Left", FM_AMBER_INK, "#FFF4DD", FM_AMBER_EDGE, 160) : chip(617, sy + ch / 2 - 28, "Left", FM_AMBER_INK, "#FFF4DD", FM_AMBER_EDGE, 140, T.label)}
        {big ? chip(85, sy + ch + 6, "Taken", FM_BLUE_INK, "#E3ECFA", FM_BLUE, 160) : chip(617, sy + g.mv[1] + ch / 2 - 28, "Taken", FM_BLUE_INK, "#E3ECFA", FM_BLUE, 140, T.label)}
        {objEl(S, g, uid + "g", { taken: tkOf, pos: gpos, live: free || make || isDemo })}
        {cardEl}
      </g>
    );
  } else if (kind === "bar") {
    body = (
      <g>
        {board(0, 62, 520, 170, 24)}
        <rect x={0} y={262} width={520} height={170} rx={30} fill="url(#fmPlateGrad)" stroke={FM_BLUE} strokeWidth={8} filter="url(#fmShadowSoft)" />
        {chip(605, 119, "Left", FM_AMBER_INK, "#FFF4DD", FM_AMBER_EDGE, 160)}
        {chip(605, 319, "Taken", FM_BLUE_INK, "#E3ECFA", FM_BLUE, 160)}
        {objEl(S, g, uid + "r", { taken: tkOf, live: cutDone && (free || make) })}
        {wholeBoth ? (
          <g pointerEvents="none">
            <rect x={-2} y={56} width={526} height={382} rx={34} fill="none" stroke={FM_GREEN} strokeWidth={7} />
            {chip(260, 446, "Whole", FM_GREEN_INK, "#E5F4EA", FM_GREEN)}
          </g>
        ) : null}
        {cardEl}
      </g>
    );
  } else {
    const whole = (n === 3 && demoLike && S.together) || allBack;
    body = (
      <g>
        {board(g.cx - 168, 64, 336, 336)}
        <circle cx={g.cx + g.mv[0]} cy={g.cy} r={168} fill="url(#fmPlateGrad)" stroke={FM_BLUE} strokeWidth={8} filter="url(#fmShadowSoft)" />
        {whole ? chip(g.cx, 2, "Whole", FM_GREEN_INK, "#E5F4EA", FM_GREEN) : chip(g.cx, 2, "Left", FM_AMBER_INK, "#FFF4DD", FM_AMBER_EDGE)}
        {chip(g.cx + g.mv[0], 2, "Taken", FM_BLUE_INK, "#E3ECFA", FM_BLUE)}
        {objEl(S, g, uid + "t", { taken: tkOf, live: cutDone && (free || make || (isDemo && n >= 2)) })}
        {whole ? (
          <g pointerEvents="none">
            <circle cx={g.cx} cy={g.cy} r={g.R + 8} fill="none" stroke={FM_GREEN} strokeWidth={7} />
          </g>
        ) : null}
        {cardEl}
      </g>
    );
  }

  return (
    <g transform={`translate(${ox},0)`}>
      <defs>
        <filter id="fmShadowSoft" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#1B2A4A" floodOpacity="0.12" />
        </filter>
        <linearGradient id="fmBoardGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F6D58A" />
          <stop offset="100%" stopColor="#E8B552" />
        </linearGradient>
        <radialGradient id="fmPlateGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#EAF1FB" />
          <stop offset="70%" stopColor="#E4EEFA" />
          <stop offset="100%" stopColor="#D2E2F7" />
        </radialGradient>
        <linearGradient id="fmCardGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F7F5EE" />
        </linearGradient>
      </defs>
      {body}
      <g pointerEvents="none">{chipsEl()}</g>
      {dialNote && (
        <text x={dialNote.x - 16} y={kyy + 36} textAnchor="end" dominantBaseline="central" fontSize={T.label} fontWeight={700} fill={C.ink}>
          {tx("Cut into")}
        </text>
      )}
      {keyBoxes.map((b: any, j: number) => (
        <Key key={"k" + j} id={b.id} label={tx(b.label)} x={b.x} y={b.y} w={b.w} h={b.h} C={C} tone="key" onClick={() => press(b.id)}>
          <text y={0} textAnchor="middle" dominantBaseline="central" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{tx(b.label)}</text>
        </Key>
      ))}
      {cardAsk && cardEl ? (open
        ? (
          <g>
            <SlotPartBox id="part-1" label={tx("numerator")} x={FM_CARD.top.x} y={FM_CARD.top.y} w={FM_CARD.top.w} h={FM_CARD.top.h} on={part === 0} enabled onPick={() => api.pickPart(0)} />
            <SlotPartBox id="part-2" label={tx("denominator")} x={FM_CARD.bot.x} y={FM_CARD.bot.y} w={FM_CARD.bot.w} h={FM_CARD.bot.h} on={part === 1} enabled onPick={() => api.pickPart(1)} />
          </g>
        ) : (
          <g>
            <SlotPartBox id="answer-open" label={tx("Fraction card")} x={FM_CARD.x} y={FM_CARD.y} w={FM_CARD.w} h={FM_CARD.h} on={false} enabled onPick={api.openAnswer} />
            <BlinkRing x={FM_CARD.x} y={FM_CARD.y} w={FM_CARD.w} h={FM_CARD.h} rx={22} C={C} />
          </g>
        )) : null}
      {invKey ? <Invite x={invKey.x + invKey.w / 2} y={invKey.y + 36} w={invKey.w} h={72} C={C} /> : null}
      {invPiece ? <Invite x={invPiece[0]} y={invPiece[1]} r={50} C={C} /> : null}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: a small whole and the stacked numbers, no words */
function Thumb({ result, it, C, w, h }: any) {
  const last = result && result.last;
  if (!last) return null;
  const item = it || last.it || {};
  const r = Math.max(18, h * 0.38), cy = h / 2, cx = r + 16;
  let top = "", bot = "";
  if (item.parts) { const v = slotPartsOf(last.value, 2); top = v[0]; bot = v[1]; }
  else if (item.kind === "make") { top = String(last.value); bot = String(item.target[1]); }
  else if (item.kind === "num") { top = String(last.value); bot = String(item.np); }
  const disc = (x: number, np: number, col: number, k: string) => (
    <g key={k}>
      {fmAngles(np).map((a, i) => (
        <path key={i} d={np === 1 ? "" : fmWedge(x, cy, r, a, i + 1 < np ? ((i + 1) * 360) / np : 360)} fill={i < col ? FM_BLUE : FM_PLAIN.roti}
          fillOpacity={i < col ? 0.8 : 1} stroke={FM_LINE} strokeWidth={2} />
      ))}
    </g>
  );
  const dots = (np: number, col: number) => Array.from({ length: np }, (_, i) => (
    <circle key={i} cx={14 + (i % 5) * (r * 0.62) + r * 0.3} cy={cy - r * 0.36 + Math.floor(i / 5) * r * 0.72} r={r * 0.28}
      fill={i < col ? FM_BLUE : FM_PLAIN.roti} stroke={FM_LINE} strokeWidth={1.5} />
  ));
  const strip = (np: number, col: number) => {
    const bw0 = Math.min(w - 96, r * 3.4), bh = r * 0.9;
    return Array.from({ length: np }, (_, i) => (
      <rect key={i} x={14 + (i * bw0) / np} y={cy - bh / 2} width={bw0 / np} height={bh} fill={i < col ? FM_BLUE : FM_PLAIN.bar}
        fillOpacity={i < col ? 0.85 : 1} stroke={FM_LINE} strokeWidth={1.5} />
    ));
  };
  const tx0 = w - 44;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {item.pair ? [disc(cx, item.pair[0], 1, "a"), disc(cx + 2 * r + 14, item.pair[1], 1, "b")]
        : item.obj === "group" ? dots(item.np, Number(top) || 0)
        : item.obj === "bar" ? strip(item.target ? item.target[1] : item.np, Number(top) || 0)
        : disc(cx, item.target ? item.target[1] : item.np || 2, item.choices ? 1 : Number(top) || 0, "o")}
      {top !== "" && (
        <g>
          <text x={tx0} y={cy - 20} textAnchor="middle" dominantBaseline="central" fontSize={T.micro} fontWeight={700} fill={C.ink}>{top}</text>
          <line x1={tx0 - 24} y1={cy} x2={tx0 + 24} y2={cy} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
          <text x={tx0} y={cy + 22} textAnchor="middle" dominantBaseline="central" fontSize={T.micro} fontWeight={700} fill={C.ink}>{bot}</text>
        </g>
      )}
    </g>
  );
}

function FractionMaker(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      board: true,
      keyOnly: true,
      bigPad: true,
      nextKey: true,
      navDots: true,
      /* the fraction answers are typed ON the fraction card (PATTERNS 9e) */
      cardAnswer: true,
      StartArt, START_HOOK,
      }} />
  );
}

export default FractionMaker;