/* ═══ M1.S2.T4.C15.2D1 · tower_builder · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, bubble + mascot, phase dots,
   window.toolApi, the sound effects, the printed bubble, scoring, the events, idle and restart.
   THE LESSON IS SILENT (runtime r30+): every line is printed on the bubble. THE NEW LOOK (keyOnly + navDots,
   docs/LAYOUT.md §1d-§1e): the question lives only in the bubble, one sentence a screen.
   The tower: bottom row given, every box rests on exactly two boxes below. Build items: the child taps the
   lowest empty box, types its number (the pad is lent to the box) and the top box is the answer. Check items:
   the child steps up the tower box by box (the working shows the pair only), then gives a verdict. The warm-up
   steps of each phase are performed on screen through api.act (a pencil writes). */

const TOOL_ID = "tower_builder";
const MEDIA_ID = "M1.S2.T4.C15.2D1";
const TOOL_NAME = "Tower Builder";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["A tower of empty boxes, and a sign stands at its foot."];
/* the whole-tool line: printed on the summary page */
const FINISH_LINE = "Every tower built from the bottom, and every box checked against one sign.";
/* printed when the child opens Free play; its LAST piece stays on the bubble */
const FREE_LINE = "Free play. Change any bottom number and switch the sign.";

/* THE START PAGE: START_HOOK is ONE printed question to wonder at (never an answer); StartArt is the object the
   lesson is about, drawn in a 1200 x 340 box: a small tower, bottom row given, the boxes above waiting. */
const START_HOOK = "What holds up each box in this tower?";
function StartArt({ box, C, lang, tx }: any) {
  const bw = 150, bh = 64, gx = 30, gy = 12, nb = 4, given = [3, 5, 2, 4];
  const x0 = (box.w - (nb * bw + (nb - 1) * gx)) / 2;
  const out: any[] = [];
  for (let r = 0; r < nb; r++) for (let c = 0; c < nb - r; c++) {
    const x = x0 + r * (bw + gx) / 2 + c * (bw + gx), y = box.h - 12 - bh - r * (bh + gy);
    if (r > 0) {
      out.push(<rect key={"sa" + r + c} x={x + 24} y={y + bh} width={5} height={gy} fill={C.ink} />);
      out.push(<rect key={"sb" + r + c} x={x + bw - 29} y={y + bh} width={5} height={gy} fill={C.ink} />);
    }
    out.push(
      <g key={"b" + r + c}>
        <rect x={x} y={y} width={bw} height={bh} rx={RAD.piece + 4} fill={r === 0 ? tint(CONTENT.hundred, 0.84) : "#FFFFFF"}
          stroke={r === 0 ? CONTENT.hundred : C.dim} strokeWidth={3} strokeDasharray={r === 0 ? undefined : "9 9"} />
        {r === 0 && <Skin name="brick" x={x} y={y} w={bw} h={bh} fit="stretch" />}
        {r === 0 && <rect x={x} y={y} width={bw} height={bh} rx={RAD.piece + 4} fill={CONTENT.hundred} fillOpacity={0.3} stroke={CONTENT.hundred} strokeWidth={3} />}
        {r === 0 && <text x={x + bw / 2} y={y + bh / 2 + 15} textAnchor="middle" fontSize={T.speech} fontWeight={700}
          fill={shade(CONTENT.hundred, 0.45)}>{given[c]}</text>}
      </g>
    );
    if (c + 1 < nb - r) out.push(twrSign("add", x + bw + gx / 2, y + bh / 2, 22, CONTENT.pointer, "p" + r + c));
  }
  return <g>{out}</g>;
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): the language pass fills this, keyed by the English, byte for byte. */
const TR: any = {
  hi: {
    "Tower Builder": "मीनार बनाओ",
    "A tower of empty boxes, and a sign stands at its foot.": "खाली डिब्बों की एक मीनार है, और उसके नीचे एक चिह्न रखा है।",
    "Every tower built from the bottom, and every box checked against one sign.": "हर मीनार नीचे से बनी, और हर डिब्बा एक चिह्न से जाँचा गया।",
    "Free play. Change any bottom number and switch the sign.": "मुक्त खेल। नीचे की कोई संख्या बदलो और चिह्न बदलो।",
    "What holds up each box in this tower?": "इस मीनार में हर डिब्बे को क्या थामे है?",
    "Two neighbours make the box above": "पास-पास के दो डिब्बे ऊपर का डिब्बा बनाते हैं",
    "Which two boxes hold this one up? Add them together.": "यह डिब्बा किन दो डिब्बों पर टिका है? उन्हें जोड़ो।",
    "Tap the empty box to see which two boxes hold it up.": "खाली डिब्बे को टैप करो और देखो कि वह किन दो पर टिका है।",
    "Tap the box that has the pink ring around it.": "जिस डिब्बे के चारों ओर गुलाबी घेरा है, उसे टैप करो।",
    "Now tap Add to write what the two lit boxes make.": "अब जोड़ो टैप करो, दोनों चमकते डिब्बों का जोड़ लिखा जाएगा।",
    "Tap the Add key at the foot.": "नीचे रखा जोड़ो बटन टैप करो।",
    "What do those two make when they are added?": "इन दोनों डिब्बों को आपस में जोड़ने पर क्या मिलता है?",
    "Ones first, then tens.": "पहले इकाई, फिर दहाई।",
    "Each box in an adding tower is the sum of the two boxes side by side beneath it.": "जोड़ वाली मीनार में हर डिब्बा नीचे के दो डिब्बों का जोड़ होता है।",
    "You learned: each box is the sum of the two boxes under it.": "तुमने सीखा: हर डिब्बा नीचे के दो डिब्बों का जोड़ है।",
    "Fill this adding tower up to the top.": "इस जोड़ वाली मीनार के सारे खाली डिब्बे ऊपर तक भरो।",
    "The top box?": "सबसे ऊपर का डिब्बा?",
    "Add the two boxes just under the box you opened.": "जो डिब्बा खोला है, उसके ठीक नीचे के दो डिब्बे जोड़ो।",
    "The top box is built from the pairs below it.": "सबसे ऊपर का डिब्बा नीचे की जोड़ियों से बना है।",
    "Fill the boxes above 8, 5 and 7, up to the top.": "8, 5 और 7 के ऊपर के डिब्बे भरो, सबसे ऊपर तक।",
    "Look at the two boxes right under it.": "इस डिब्बे के ठीक नीचे के दो डिब्बों को ध्यान से देखो।",
    "Again, each box is its two neighbours added.": "फिर से, हर डिब्बा अपने दो पड़ोसियों का जोड़ है।",
    "What number sits at the top above 14, 16, 20 and 5?": "14, 16, 20 और 5 के ऊपर सबसे ऊपर कौन-सी संख्या है?",
    "Check the sum of the pair that holds it up.": "जिस जोड़ी पर यह टिका है, उसका जोड़ जाँचो।",
    "Four boxes at the bottom still build one top.": "नीचे के चार डिब्बे मिलकर एक सबसे ऊपर का डिब्बा बनाते हैं।",
    "Do the bottom pairs first, then the row above them.": "पहले नीचे की जोड़ियाँ करो, फिर उनके ऊपर की पंक्ति।",
    "Start with 14 and 16, then 16 and 20, then 20 and 5.": "14 और 16 से शुरू करो, फिर 16 और 20, फिर 20 और 5।",
    "A tower that multiplies": "गुणा करने वाली मीनार",
    "This tower multiplies. Which two boxes hold this one up?": "यह मीनार गुणा करती है। यह डिब्बा किन दो डिब्बों पर टिका है?",
    "Tap the empty box to light the two boxes under it.": "खाली डिब्बे को टैप करो, उसके नीचे के दो डिब्बे चमक उठेंगे।",
    "Now tap Multiply to write what the two lit boxes make.": "अब गुणा करो टैप करो, दोनों चमकते डिब्बों का गुणनफल लिखा जाएगा।",
    "Tap the Multiply key at the foot.": "नीचे रखा गुणा करो बटन टैप करो।",
    "Multiply the two boxes below: what do they make?": "नीचे के दो डिब्बों का गुणा करो: क्या मिलता है?",
    "Take the pair below, one box at a time.": "नीचे की जोड़ी लो और एक-एक डिब्बा भरो।",
    "Each box in a multiplying tower is the product of the two below it.": "गुणा वाली मीनार में हर डिब्बा नीचे के दो डिब्बों का गुणनफल होता है।",
    "You learned: a multiplying tower keeps the same shape and pairs.": "तुमने सीखा: गुणा वाली मीनार का आकार और जोड़ियाँ वही रहती हैं।",
    "Fill this multiplying tower up to the top.": "इस गुणा वाली मीनार के सारे खाली डिब्बे ऊपर तक भरो।",
    "Look at the sign between the boxes.": "डिब्बों के बीच में जो चिह्न है, उसे ध्यान से देखो।",
    "Same shape, and each box multiplied its pair.": "आकार वही, और हर डिब्बे ने अपनी जोड़ी का गुणा किया।",
    "Fill the boxes above 2, 5 and 1, up to the top.": "2, 5 और 1 के ऊपर के डिब्बे भरो, सबसे ऊपर तक।",
    "A number times one stays just as it was.": "किसी संख्या को एक से गुणा करने पर वह वैसी ही रहती है।",
    "Each row was multiplied, and the top landed last.": "हर पंक्ति का गुणा हुआ और सबसे ऊपर का डिब्बा आखिर में आया।",
    "What number goes in the missing box?": "बताओ, खाली डिब्बे में कौन-सी संख्या आएगी?",
    "The missing box?": "खाली डिब्बा?",
    "Which number multiplied by 3 gives 12?": "कौन-सी संख्या को 3 से गुणा करने पर 12 मिलता है?",
    "Count in threes up to 12 and see how many you say.": "तीन-तीन करके 12 तक गिनो और देखो कितनी बार बोले।",
    "The blank and the 3 beside it make the 12 above.": "खाली डिब्बा और उसके पास का 3 मिलकर ऊपर का 12 बनाते हैं।",
    "That box fits, and the tower builds up from it.": "वह डिब्बा ठीक बैठा और मीनार उससे ऊपर बनती गई।",
    "Checking a tower box by box": "एक-एक डिब्बा करके मीनार जाँचना",
    "Check each box against the two below it, one box at a time.": "हर डिब्बे को उसके नीचे के दो डिब्बों से जाँचो, एक-एक करके।",
    "Tap the first box above the bottom row to test it.": "सबसे नीचे की पंक्ति के ऊपर का पहला डिब्बा टैप करके जाँचो।",
    "Work out what the two lit boxes make, then tap Check to see it written.": "सोचो कि दोनों चमकते डिब्बे क्या बनाते हैं, फिर जाँचो टैप करके लिखा देखो।",
    "Tap the Check key at the foot.": "नीचे रखा जाँचो बटन टैप करो।",
    "Does that box match the sign of the rest?": "क्या यह डिब्बा बाकी डिब्बों के चिह्न से मेल खाता है?",
    "Look for one box that does not match its pair.": "ऐसा एक डिब्बा ढूँढो जो अपनी जोड़ी से मेल न खाए।",
    "Every box gets its turn, from the bottom row up.": "हर डिब्बे की बारी आती है, नीचे की पंक्ति से ऊपर तक।",
    "You learned: test every box, not only the top one.": "तुमने सीखा: हर डिब्बा जाँचो, सिर्फ़ सबसे ऊपर का नहीं।",
    "Yes": "हाँ",
    "No": "नहीं",
    "Does every box match the same operation?": "क्या हर डिब्बा एक ही संक्रिया से मेल खाता है?",
    "One sign for all?": "सबके लिए एक चिह्न?",
    "Which two boxes hold up the box you are checking?": "जिस डिब्बे को जाँच रहे हो, उसे कौन-से दो डिब्बे थामे हैं?",
    "One box broke the rule, so the answer is no.": "एक डिब्बे ने नियम तोड़ा, इसलिए उत्तर नहीं है।",
    "Does it add all the way up the tower?": "क्या यह मीनार नीचे से ऊपर तक जोड़ से ही बनी है?",
    "Adds all the way?": "ऊपर तक जोड़?",
    "Add each pair and see whether the box matches.": "हर जोड़ी को जोड़ो और देखो कि डिब्बा मेल खाता है या नहीं।",
    "Every box added, so the tower is correct.": "हर डिब्बा जोड़ से बना, इसलिए मीनार सही है।",
    "Adding": "जोड़",
    "Multiplying": "गुणा",
    "Which operation builds every box in this tower?": "इस मीनार का हर डिब्बा कौन-सी संक्रिया से बना है?",
    "Which sign works?": "कौन-सा चिह्न चलेगा?",
    "Step up the tower, then tap Other sign and step up again.": "मीनार पर ऊपर चढ़ो, फिर दूसरा चिह्न टैप करके दोबारा चढ़ो।",
    "Keep the sign that always matches, box after box.": "वही चिह्न चुनो जो हर डिब्बे पर हमेशा मेल खाए।",
    "Try the bottom pair with each sign in turn.": "नीचे की जोड़ी पर बारी-बारी से हर चिह्न आज़माओ।",
    "Every box was multiplied, so times is the sign.": "हर डिब्बा गुणा से बना, इसलिए गुणा ही चिह्न है।",
    "One operation all the way up": "ऊपर तक एक ही संक्रिया",
    "Try one sign for every box. Does it work all the way up?": "हर डिब्बे के लिए एक चिह्न आज़माओ। क्या वह ऊपर तक चलता है?",
    "Tap the first box in the row above to test adding.": "ऊपर की पंक्ति का पहला डिब्बा टैप करके जोड़ से जाँचो।",
    "Now tap Other sign to test the same box with times.": "अब दूसरा चिह्न टैप करो और उसी डिब्बे को गुणा से जाँचो।",
    "Tap the Other sign key at the foot.": "नीचे रखा दूसरा चिह्न बटन टैप करो।",
    "Does that same sign make every other box?": "क्या वही चिह्न बाकी हर डिब्बा भी बनाता है?",
    "A tower that changes sign halfway is neither kind.": "जो मीनार बीच में चिह्न बदल ले, वह इन दोनों में से कोई नहीं है।",
    "A correct tower uses one operation for every box from bottom to top.": "सही मीनार में नीचे से ऊपर तक हर डिब्बा एक ही संक्रिया से बनता है।",
    "You learned: a correct tower keeps one sign for every box.": "तुमने सीखा: सही मीनार में हर डिब्बे के लिए एक चिह्न रहता है।",
    "Is this a correct tower, with one sign for every box?": "क्या यह सही मीनार है, जिसमें हर डिब्बे के लिए एक ही चिह्न हो?",
    "A correct tower?": "सही मीनार?",
    "Which sign makes the lowest box on the left?": "बाईं ओर का निचला डिब्बा किस चिह्न से बनता है?",
    "Two signs were needed, so it is not correct.": "दो चिह्न चाहिए थे, इसलिए यह सही नहीं है।",
    "Is this one a correct tower too?": "क्या यह भी सही मीनार है?",
    "One sign only?": "सिर्फ़ एक चिह्न?",
    "Check the middle row first, then the top box.": "पहले बीच की पंक्ति जाँचो, फिर सबसे ऊपर का डिब्बा।",
    "The top multiplied while the rest added.": "सबसे ऊपर वाले ने गुणा किया, बाकी ने जोड़।",
    "What goes in each box above the bottom row?": "सबसे नीचे की पंक्ति के ऊपर हर डिब्बे में क्या आएगा?",
    "Work along the bottom pairs first, then the row above.": "पहले नीचे की जोड़ियाँ करो, फिर ऊपर की पंक्ति।",
    "Start with 2 times 3, then 3 times 5, then the pair above them.": "2 गुणा 3 से शुरू करो, फिर 3 गुणा 5, फिर उनके ऊपर की जोड़ी।",
    "Multiply the pair under the box you opened.": "जो डिब्बा खोला है, उसके नीचे की जोड़ी का गुणा करो।",
    "Every box above the bottom row was multiplied.": "सबसे नीचे की पंक्ति के ऊपर हर डिब्बे में गुणा हुआ।",
    "working": "हिसाब",
    "adds": "जोड़",
    "times": "गुणा",
    "Add": "जोड़ो",
    "Multiply": "गुणा करो",
    "Check": "जाँचो",
    "Other sign": "दूसरा चिह्न",
    "Switch sign": "चिह्न बदलो",
    "every box adds": "हर डिब्बा जोड़ से बना",
    "every box multiplies": "हर डिब्बा गुणा से बना",
    "no one sign works": "कोई एक चिह्न नहीं चलता",
    "The empty box": "खाली डिब्बा",
    "Test this box": "यह डिब्बा जाँचो",
    "Bottom box": "नीचे का डिब्बा",
  },
  gu: {
    "Tower Builder": "મિનાર બનાવો",
    "A tower of empty boxes, and a sign stands at its foot.": "ખાલી ડબ્બાઓનો એક મિનાર છે, અને તેના તળિયે એક ચિહ્ન મૂકેલું છે.",
    "Every tower built from the bottom, and every box checked against one sign.": "દરેક મિનાર નીચેથી બન્યો, અને દરેક ડબ્બો એક ચિહ્નથી તપાસાયો.",
    "Free play. Change any bottom number and switch the sign.": "મુક્ત રમત. નીચેની કોઈ પણ સંખ્યા બદલો અને ચિહ્ન બદલો.",
    "What holds up each box in this tower?": "આ મિનારમાં દરેક ડબ્બાને શું ટેકો આપે છે?",
    "Two neighbours make the box above": "બાજુ-બાજુના બે ડબ્બા ઉપરનો ડબ્બો બનાવે છે",
    "Which two boxes hold this one up? Add them together.": "આ ડબ્બો કયા બે ડબ્બા પર ટકેલો છે? તેમને ઉમેરો.",
    "Tap the empty box to see which two boxes hold it up.": "ખાલી ડબ્બાને ટૅપ કરો અને જુઓ કે તે કયા બે પર ટકેલો છે.",
    "Tap the box that has the pink ring around it.": "જે ડબ્બાની ફરતે ગુલાબી ઘેરો છે, તેને ટૅપ કરો.",
    "Now tap Add to write what the two lit boxes make.": "હવે ઉમેરો ટૅપ કરો, બંને ચમકતા ડબ્બાનો સરવાળો લખાશે.",
    "Tap the Add key at the foot.": "નીચે રાખેલું ઉમેરો બટન ટૅપ કરો.",
    "What do those two make when they are added?": "આ બંનેને ઉમેરવાથી શું મળે?",
    "Ones first, then tens.": "પહેલાં એકમ, પછી દશક.",
    "Each box in an adding tower is the sum of the two boxes side by side beneath it.": "સરવાળાવાળા મિનારમાં દરેક ડબ્બો નીચેના બાજુ-બાજુના બે ડબ્બાનો સરવાળો હોય છે.",
    "You learned: each box is the sum of the two boxes under it.": "તમે શીખ્યા: દરેક ડબ્બો નીચેના બે ડબ્બાનો સરવાળો છે.",
    "Fill this adding tower up to the top.": "આ સરવાળાવાળા મિનારના બધા ખાલી ડબ્બા ઉપર સુધી ભરો.",
    "The top box?": "સૌથી ઉપરનો ડબ્બો?",
    "Add the two boxes just under the box you opened.": "જે ડબ્બો ખોલ્યો છે, તેની બરાબર નીચેના બે ડબ્બા ઉમેરો.",
    "The top box is built from the pairs below it.": "સૌથી ઉપરનો ડબ્બો નીચેની જોડીઓથી બન્યો છે.",
    "Fill the boxes above 8, 5 and 7, up to the top.": "8, 5 અને 7 ની ઉપરના ડબ્બા ભરો, સૌથી ઉપર સુધી.",
    "Look at the two boxes right under it.": "તેની બરાબર નીચેના બે ડબ્બા ધ્યાનથી જુઓ.",
    "Again, each box is its two neighbours added.": "ફરી, દરેક ડબ્બો તેના બે પડોશીઓનો સરવાળો છે.",
    "What number sits at the top above 14, 16, 20 and 5?": "14, 16, 20 અને 5 ની ઉપર સૌથી ઉપર કઈ સંખ્યા છે?",
    "Check the sum of the pair that holds it up.": "જે જોડી પર તે ટકેલો છે, તેનો સરવાળો તપાસો.",
    "Four boxes at the bottom still build one top.": "નીચેના ચાર ડબ્બા મળીને એક સૌથી ઉપરનો ડબ્બો બનાવે છે.",
    "Do the bottom pairs first, then the row above them.": "પહેલાં નીચેની જોડીઓ કરો, પછી તેમની ઉપરની હરોળ.",
    "Start with 14 and 16, then 16 and 20, then 20 and 5.": "14 અને 16 થી શરૂ કરો, પછી 16 અને 20, પછી 20 અને 5.",
    "A tower that multiplies": "ગુણાકાર કરતો મિનાર",
    "This tower multiplies. Which two boxes hold this one up?": "આ મિનાર ગુણાકાર કરે છે. આ ડબ્બો કયા બે ડબ્બા પર ટકેલો છે?",
    "Tap the empty box to light the two boxes under it.": "ખાલી ડબ્બાને ટૅપ કરો, તેની નીચેના બે ડબ્બા ચમકી ઊઠશે.",
    "Now tap Multiply to write what the two lit boxes make.": "હવે ગુણાકાર કરો ટૅપ કરો, બંને ચમકતા ડબ્બાનો ગુણાકાર લખાશે.",
    "Tap the Multiply key at the foot.": "નીચે રાખેલું ગુણાકાર કરો બટન ટૅપ કરો.",
    "Multiply the two boxes below: what do they make?": "નીચેના બે ડબ્બાનો ગુણાકાર કરો: શું મળે?",
    "Take the pair below, one box at a time.": "નીચેની જોડી લો અને એક-એક ડબ્બો ભરો.",
    "Each box in a multiplying tower is the product of the two below it.": "ગુણાકારવાળા મિનારમાં દરેક ડબ્બો નીચેના બે ડબ્બાનો ગુણાકાર હોય છે.",
    "You learned: a multiplying tower keeps the same shape and pairs.": "તમે શીખ્યા: ગુણાકારના મિનારમાં આકાર અને જોડીઓ એ જ રહે છે.",
    "Fill this multiplying tower up to the top.": "આ ગુણાકારવાળા મિનારના બધા ખાલી ડબ્બા ઉપર સુધી ભરો.",
    "Look at the sign between the boxes.": "ડબ્બા વચ્ચેનું ચિહ્ન જુઓ.",
    "Same shape, and each box multiplied its pair.": "આકાર એ જ, અને દરેક ડબ્બાએ પોતાની જોડીનો ગુણાકાર કર્યો.",
    "Fill the boxes above 2, 5 and 1, up to the top.": "2, 5 અને 1 ની ઉપરના ડબ્બા ભરો, સૌથી ઉપર સુધી.",
    "A number times one stays just as it was.": "કોઈ સંખ્યાને એકથી ગુણો તો તે એવી જ રહે છે.",
    "Each row was multiplied, and the top landed last.": "દરેક હરોળનો ગુણાકાર થયો અને સૌથી ઉપરનો ડબ્બો છેલ્લે આવ્યો.",
    "What number goes in the missing box?": "આ મિનારમાં ખાલી ડબ્બામાં કઈ સંખ્યા આવશે એ જણાવો.",
    "The missing box?": "ખાલી ડબ્બો?",
    "Which number multiplied by 3 gives 12?": "કઈ સંખ્યાને 3 વડે ગુણવાથી 12 મળે છે?",
    "Count in threes up to 12 and see how many you say.": "ત્રણ-ત્રણ કરીને 12 સુધી ગણો અને જુઓ કેટલી વાર બોલ્યા.",
    "The blank and the 3 beside it make the 12 above.": "ખાલી ડબ્બો અને તેની બાજુનો 3 મળીને ઉપરનો 12 બનાવે છે.",
    "That box fits, and the tower builds up from it.": "એ ડબ્બો બરાબર બેસે છે અને મિનાર તેનાથી ઉપર બનતો જાય છે.",
    "Checking a tower box by box": "એક-એક ડબ્બો કરીને મિનાર તપાસવો",
    "Check each box against the two below it, one box at a time.": "દરેક ડબ્બાને તેની નીચેના બે ડબ્બા સાથે તપાસો, એક-એક કરીને.",
    "Tap the first box above the bottom row to test it.": "સૌથી નીચેની હરોળની ઉપરનો પહેલો ડબ્બો ટૅપ કરીને તપાસો.",
    "Work out what the two lit boxes make, then tap Check to see it written.": "વિચારો કે બંને ચમકતા ડબ્બા શું બનાવે, પછી તપાસો ટૅપ કરીને લખેલું જુઓ.",
    "Tap the Check key at the foot.": "નીચે રાખેલું તપાસો બટન ટૅપ કરો.",
    "Does that box match the sign of the rest?": "શું આ ડબ્બો બાકીના ડબ્બાના ચિહ્ન સાથે મેળ ખાય છે?",
    "Look for one box that does not match its pair.": "એવો એક ડબ્બો શોધો જે પોતાની જોડી સાથે મેળ ન ખાય.",
    "Every box gets its turn, from the bottom row up.": "દરેક ડબ્બાનો વારો આવે છે, નીચેની હરોળથી ઉપર સુધી.",
    "You learned: test every box, not only the top one.": "તમે શીખ્યા: દરેક ડબ્બો તપાસો, ફક્ત સૌથી ઉપરનો જ નહીં.",
    "Yes": "હા",
    "No": "ના",
    "Does every box match the same operation?": "શું દરેક ડબ્બો એક જ ક્રિયા સાથે મેળ ખાય છે?",
    "One sign for all?": "બધા માટે એક ચિહ્ન?",
    "Which two boxes hold up the box you are checking?": "જે ડબ્બો તપાસી રહ્યા છો, તેને કયા બે ડબ્બા ટેકો આપે છે?",
    "One box broke the rule, so the answer is no.": "એક ડબ્બાએ નિયમ તોડ્યો, તેથી જવાબ ના છે.",
    "Does it add all the way up the tower?": "શું તે મિનાર નીચેથી ઉપર સુધી સરવાળાથી જ બન્યો છે?",
    "Adds all the way?": "ઉપર સુધી સરવાળો?",
    "Add each pair and see whether the box matches.": "દરેક જોડી ઉમેરો અને જુઓ કે ડબ્બો મેળ ખાય છે કે નહીં.",
    "Every box added, so the tower is correct.": "દરેક ડબ્બો સરવાળાથી બન્યો, તેથી મિનાર સાચો છે.",
    "Adding": "સરવાળો",
    "Multiplying": "ગુણાકાર",
    "Which operation builds every box in this tower?": "આ મિનારનો દરેક ડબ્બો કઈ ક્રિયાથી બન્યો છે?",
    "Which sign works?": "કયું ચિહ્ન ચાલશે?",
    "Step up the tower, then tap Other sign and step up again.": "મિનાર પર ઉપર ચઢો, પછી બીજું ચિહ્ન ટૅપ કરીને ફરી ચઢો.",
    "Keep the sign that always matches, box after box.": "એ જ ચિહ્ન પસંદ કરો જે દરેક ડબ્બા પર હંમેશા મેળ ખાય.",
    "Try the bottom pair with each sign in turn.": "નીચેની જોડી પર વારાફરતી દરેક ચિહ્ન અજમાવો.",
    "Every box was multiplied, so times is the sign.": "દરેક ડબ્બો ગુણાકારથી બન્યો, તેથી ગુણાકાર જ ચિહ્ન છે.",
    "One operation all the way up": "ઉપર સુધી એક જ ક્રિયા",
    "Try one sign for every box. Does it work all the way up?": "દરેક ડબ્બા માટે એક ચિહ્ન અજમાવો. શું તે ઉપર સુધી ચાલે છે?",
    "Tap the first box in the row above to test adding.": "ઉપરની હરોળનો પહેલો ડબ્બો ટૅપ કરીને સરવાળાથી તપાસો.",
    "Now tap Other sign to test the same box with times.": "હવે બીજું ચિહ્ન ટૅપ કરો અને એ જ ડબ્બાને ગુણાકારથી તપાસો.",
    "Tap the Other sign key at the foot.": "નીચે રાખેલું બીજું ચિહ્ન બટન ટૅપ કરો.",
    "Does that same sign make every other box?": "શું એ જ ચિહ્ન બાકીના દરેક ડબ્બાને પણ બનાવે છે?",
    "A tower that changes sign halfway is neither kind.": "જે મિનાર વચ્ચેથી ચિહ્ન બદલે, તે આ બેમાંથી એક પણ પ્રકારનો નથી.",
    "A correct tower uses one operation for every box from bottom to top.": "સાચા મિનારમાં નીચેથી ઉપર સુધી દરેક ડબ્બા માટે એક જ ક્રિયા હોય છે.",
    "You learned: a correct tower keeps one sign for every box.": "તમે શીખ્યા: સાચા મિનારમાં દરેક ડબ્બા માટે એક ચિહ્ન રહે છે.",
    "Is this a correct tower, with one sign for every box?": "શું આ સાચો મિનાર છે, જેમાં દરેક ડબ્બા માટે એક જ ચિહ્ન હોય?",
    "A correct tower?": "સાચો મિનાર?",
    "Which sign makes the lowest box on the left?": "ડાબી બાજુનો નીચલો ડબ્બો કયા ચિહ્નથી બને છે?",
    "Two signs were needed, so it is not correct.": "બે ચિહ્ન જોઈતા હતા, તેથી આ મિનાર સાચો નથી.",
    "Is this one a correct tower too?": "શું આ પણ સાચો મિનાર છે?",
    "One sign only?": "ફક્ત એક ચિહ્ન?",
    "Check the middle row first, then the top box.": "પહેલાં વચ્ચેની હરોળ તપાસો, પછી સૌથી ઉપરનો ડબ્બો.",
    "The top multiplied while the rest added.": "સૌથી ઉપરનાએ ગુણાકાર કર્યો, બાકીનાએ સરવાળો.",
    "What goes in each box above the bottom row?": "સૌથી નીચેની હરોળની ઉપર દરેક ડબ્બામાં શું આવશે?",
    "Work along the bottom pairs first, then the row above.": "પહેલાં નીચેની જોડીઓ પર કામ કરો, પછી ઉપરની હરોળ.",
    "Start with 2 times 3, then 3 times 5, then the pair above them.": "2 ગુણ્યા 3 થી શરૂ કરો, પછી 3 ગુણ્યા 5, પછી તેમની ઉપરની જોડી.",
    "Multiply the pair under the box you opened.": "જે ડબ્બો ખોલ્યો છે, તેની નીચેની જોડીનો ગુણાકાર કરો.",
    "Every box above the bottom row was multiplied.": "સૌથી નીચેની હરોળની ઉપર દરેક ડબ્બામાં ગુણાકાર થયો.",
    "working": "હિસાબ",
    "adds": "સરવાળો",
    "times": "ગુણાકાર",
    "Add": "ઉમેરો",
    "Multiply": "ગુણાકાર કરો",
    "Check": "તપાસો",
    "Other sign": "બીજું ચિહ્ન",
    "Switch sign": "ચિહ્ન બદલો",
    "every box adds": "દરેક ડબ્બો સરવાળાથી બન્યો",
    "every box multiplies": "દરેક ડબ્બો ગુણાકારથી બન્યો",
    "no one sign works": "કોઈ એક ચિહ્ન ચાલતું નથી",
    "The empty box": "ખાલી ડબ્બો",
    "Test this box": "આ ડબ્બો તપાસો",
    "Bottom box": "નીચેનો ડબ્બો",
  },
};

/* One entry per phase = one mount. Each phase opens on guide steps (a warm-up tower of its own, never a question's),
   then three questions. A build item's answer is its TOP box (C16:4: the blank bottom box); the boxes on the way are checked
   in their own box, and a wrong one shows the item's miss, then its ladder, on the bubble. */
const PHASES = [
  {
    n: 1,
    stepHold: 3300,   /* the pencil's step is taken as it starts: its result then stays on show about 1.6 s after it ends */
    concept: "Two neighbours make the box above",
    conceptId: "M1.S2.T4.C15", objectiveIds: ["O5"],
    says: ["Which two boxes hold this one up? Add them together."],
    steps: [
      { say: "Tap the empty box to see which two boxes hold it up.", on: "box", hint: "Tap the box that has the pink ring around it." },
      { say: "Now tap Add to write what the two lit boxes make.", on: "fill", hint: "Tap the Add key at the foot." },
    ],
    ladder: ["What do those two make when they are added?", "Ones first, then tens."],
    closing: "Each box in an adding tower is the sum of the two boxes side by side beneath it.",
    learned: "You learned: each box is the sum of the two boxes under it.",
    traceback: "The tower builds itself again row by row, each pair written in the ledger, ending on the top box.",
    items: [
      /* learn ML1: answer in the plan = 15, 13 and 15, then 28 and 28, then 56 at the top (each box is checked in its box; the answer is the top) */
      { qid: "M1.S2.T4.C15:ML1", kind: "build", answer: 56, near: 30, winMs: 3400,
        say: "Fill this adding tower up to the top.", ask: "The top box?",
        miss: "Add the two boxes just under the box you opened.", win: "The top box is built from the pairs below it." },
      /* practice 1: answer in the plan = 13 and 12, then 25 at the top */
      { qid: "M1.S2.T4.C15:1", kind: "build", answer: 25, near: 20, winMs: 2800,
        say: "Fill the boxes above 8, 5 and 7, up to the top.", ask: "The top box?",
        miss: "Look at the two boxes right under it.", win: "Again, each box is its two neighbours added." },
      /* practice 2: answer in the plan = 127: the rows above the bottom are 30, 36 and 25, then 66 and 61, then 127 */
      { qid: "M1.S2.T4.C15:2", kind: "build", answer: 127, near: 55, winMs: 3400,
        say: "What number sits at the top above 14, 16, 20 and 5?", ask: "The top box?",
        ladder: ["Do the bottom pairs first, then the row above them.", "Start with 14 and 16, then 16 and 20, then 20 and 5."],
        miss: "Check the sum of the pair that holds it up.", win: "Four boxes at the bottom still build one top." },
    ],
  },
  {
    n: 2,
    stepHold: 3300,   /* the pencil's step is taken as it starts: its result then stays on show about 1.6 s after it ends */
    concept: "A tower that multiplies",
    conceptId: "M1.S2.T4.C16", objectiveIds: ["O5"],
    says: ["This tower multiplies. Which two boxes hold this one up?"],
    steps: [
      { say: "Tap the empty box to light the two boxes under it.", on: "box", hint: "Tap the box that has the pink ring around it." },
      { say: "Now tap Multiply to write what the two lit boxes make.", on: "fill", hint: "Tap the Multiply key at the foot." },
    ],
    ladder: ["Multiply the two boxes below: what do they make?", "Take the pair below, one box at a time."],
    closing: "Each box in a multiplying tower is the product of the two below it.",
    learned: "You learned: a multiplying tower keeps the same shape and pairs.",
    traceback: "Each pair is multiplied again in the ledger, row by row, ending on the top box.",
    items: [
      /* learn ML2: answer in the plan = 3, 2 and 4, then 6 and 8, then 48 at the top; near 144 = adding in the first row (4, 3, 4) then multiplying above */
      { qid: "M1.S2.T4.C16:ML2", kind: "build", answer: 48, near: 144, winMs: 3400,
        say: "Fill this multiplying tower up to the top.", ask: "The top box?",
        miss: "Look at the sign between the boxes.", win: "Same shape, and each box multiplied its pair." },
      /* practice 3: answer in the plan = 10 and 5, then 50 at the top */
      { qid: "M1.S2.T4.C16:3", kind: "build", answer: 50, near: 10, winMs: 2800,
        say: "Fill the boxes above 2, 5 and 1, up to the top.", ask: "The top box?",
        miss: "A number times one stays just as it was.", win: "Each row was multiplied, and the top landed last." },
      /* practice 4: answer in the plan = 4 (the missing box), because 3 x 4 = 12 and 4 x 2 = 8, and the top is 12 x 8 = 96.
         Judged on the blank bottom box (4); the win builds the rest of the tower up to the top. near 9 = adding (3 + 9 = 12). */
      { qid: "M1.S2.T4.C16:4", kind: "build", answer: 4, near: 9, winMs: 3200,
        say: "What number goes in the missing box?", ask: "The missing box?",
        ladder: ["Which number multiplied by 3 gives 12?", "Count in threes up to 12 and see how many you say."],
        miss: "The blank and the 3 beside it make the 12 above.", win: "That box fits, and the tower builds up from it." },
    ],
  },
  {
    n: 3,
    stepHold: 3300,   /* the pencil's step is taken as it starts: its result then stays on show about 1.6 s after it ends */
    concept: "Checking a tower box by box",
    conceptId: "M1.S2.T4.C17", objectiveIds: ["O6"],
    says: ["Check each box against the two below it, one box at a time."],
    steps: [
      { say: "Tap the first box above the bottom row to test it.", on: "box", hint: "Tap the box that has the pink ring around it." },
      { say: "Work out what the two lit boxes make, then tap Check to see it written.", on: "fill", hint: "Tap the Check key at the foot." },
    ],
    ladder: ["Does that box match the sign of the rest?", "Look for one box that does not match its pair."],
    closing: "Every box gets its turn, from the bottom row up.",
    learned: "You learned: test every box, not only the top one.",
    traceback: "The walk climbs the tower box by box with each sign, writing every pair, and a box its sign cannot make stays lit.",
    items: [
      /* learn ML3: answer in the plan = No. 8 is 6 + 2 and 18 is 8 + 10, but 10 is 2 x 5 and not 2 + 5 */
      { qid: "M1.S2.T4.C17:ML3", kind: "check", answer: "one breaks", near: "all follow", winMs: 3600,
        choices: [{ id: "all follow", label: "Yes" }, { id: "one breaks", label: "No" }],
        say: "Does every box match the same operation?", ask: "One sign for all?",
        miss: "Which two boxes hold up the box you are checking?", win: "One box broke the rule, so the answer is no." },
      /* practice 5: answer in the plan = Yes. 3 + 4 = 7, 4 + 6 = 10 and 7 + 10 = 17, so every box adds */
      { qid: "M1.S2.T4.C17:5", kind: "check", answer: "all follow", near: "one breaks", winMs: 3200,
        choices: [{ id: "all follow", label: "Yes" }, { id: "one breaks", label: "No" }],
        say: "Does it add all the way up the tower?", ask: "Adds all the way?",
        miss: "Add each pair and see whether the box matches.", win: "Every box added, so the tower is correct." },
      /* practice 6: answer in the plan = Multiplying: 2 x 3 = 6, 3 x 4 = 12 and 6 x 12 = 72 */
      { qid: "M1.S2.T4.C17:6", kind: "check", answer: "multiplying", near: "adding", winMs: 3200,
        choices: [{ id: "adding", label: "Adding" }, { id: "multiplying", label: "Multiplying" }],
        say: "Which operation builds every box in this tower?", ask: "Which sign works?",
        ladder: ["Step up the tower, then tap Other sign and step up again.", "Keep the sign that always matches, box after box."],
        miss: "Try the bottom pair with each sign in turn.", win: "Every box was multiplied, so times is the sign." },
    ],
  },
  {
    n: 4,
    concept: "One operation all the way up",
    conceptId: "M1.S2.T4.C18", objectiveIds: ["O6"],
    says: ["Try one sign for every box. Does it work all the way up?"],
    steps: [
      { say: "Tap the first box in the row above to test adding.", on: "box", hint: "Tap the box that has the pink ring around it." },
      { say: "Work out what the two lit boxes make, then tap Check to see it written.", on: "fill", hint: "Tap the Check key at the foot." },
      { say: "Now tap Other sign to test the same box with times.", on: "sign", hint: "Tap the Other sign key at the foot." },
    ],
    ladder: ["Does that same sign make every other box?", "A tower that changes sign halfway is neither kind."],
    closing: "A correct tower uses one operation for every box from bottom to top.",
    learned: "You learned: a correct tower keeps one sign for every box.",
    traceback: "Both walks run the whole tower side by side, and the box each sign cannot make stays lit.",
    items: [
      /* learn ML4: answer in the plan = No. The middle boxes multiply, 5 x 1 = 5 and 1 x 3 = 3, but the top adds, 5 + 3 = 8 */
      { qid: "M1.S2.T4.C18:ML4", kind: "check", answer: "two signs", near: "one sign", winMs: 3600,
        choices: [{ id: "one sign", label: "Yes" }, { id: "two signs", label: "No" }],
        say: "Is this a correct tower, with one sign for every box?", ask: "A correct tower?",
        miss: "Which sign makes the lowest box on the left?", win: "Two signs were needed, so it is not correct." },
      /* practice 7: answer in the plan = No. The middle row adds, 2 + 4 = 6 and 4 + 3 = 7, but the top multiplies, 6 x 7 = 42 */
      { qid: "M1.S2.T4.C18:7", kind: "check", answer: "two signs", near: "one sign", winMs: 3200,
        choices: [{ id: "one sign", label: "Yes" }, { id: "two signs", label: "No" }],
        say: "Is this one a correct tower too?", ask: "One sign only?",
        miss: "Check the middle row first, then the top box.", win: "The top multiplied while the rest added." },
      /* practice 8: answer in the plan = 6 and 15, then 90 at the top, because 2 x 3 = 6, 3 x 5 = 15 and 6 x 15 = 90 */
      { qid: "M1.S2.T4.C18:8", kind: "build", answer: 90, near: 30, winMs: 3000,
        say: "What goes in each box above the bottom row?", ask: "The top box?",
        ladder: ["Work along the bottom pairs first, then the row above.", "Start with 2 times 3, then 3 times 5, then the pair above them."],
        miss: "Multiply the pair under the box you opened.", win: "Every box above the bottom row was multiplied." },
    ],
  },
];

/* The towers, sizes and targets the working area needs (they go into the sidecar too).
   rows[0] is the bottom row; rows[r][c] rests on rows[r-1][c] and rows[r-1][c+1].
   show: which cells stand filled when a build question opens (the rest is the child's, lowest row first, the last one asked,
   or the cell `target` [r, c] names: the blank bottom box of C16:4, where the win builds the rest).
   warm: the guide steps' own tower for each phase (never a question's). */
const MODEL = {
  /* the box of a tower four wide (the room is the width) and of one three wide (the room is the height: bigger boxes, bigger digits) */
  box: { w: 118, h: 80, gx: 28, gy: 16 },
  box3: { w: 160, h: 110, gx: 34, gy: 22 },     /* three wide, built or Free play: about 1.3 times the first size */
  box3c: { w: 136, h: 108, gx: 26, gy: 20 },    /* three wide, checked: the working's two columns take the width, so a smaller step up */
  footY: 396,
  towers: {
    "M1.S2.T4.C15:ML1": { kind: "build", op: "add", rows: [[6, 9, 4, 11], [15, 13, 15], [28, 28], [56]] },
    "M1.S2.T4.C15:1": { kind: "build", op: "add", rows: [[8, 5, 7], [13, 12], [25]] },
    "M1.S2.T4.C15:2": { kind: "build", op: "add", rows: [[14, 16, 20, 5], [30, 36, 25], [66, 61], [127]] },
    "M1.S2.T4.C16:ML2": { kind: "build", op: "mul", rows: [[3, 1, 2, 2], [3, 2, 4], [6, 8], [48]] },
    "M1.S2.T4.C16:3": { kind: "build", op: "mul", rows: [[2, 5, 1], [10, 5], [50]] },
    "M1.S2.T4.C16:4": { kind: "build", op: "mul", rows: [[3, 4, 2], [12, 8], [96]],
      show: [[true, false, true], [true, true], [false]], target: [0, 1] },
    "M1.S2.T4.C17:ML3": { kind: "check", rows: [[6, 2, 5], [8, 10], [18]] },
    "M1.S2.T4.C17:5": { kind: "check", rows: [[3, 4, 6], [7, 10], [17]] },
    "M1.S2.T4.C17:6": { kind: "check", rows: [[2, 3, 4], [6, 12], [72]] },
    "M1.S2.T4.C18:ML4": { kind: "check", rows: [[5, 1, 3], [5, 3], [8]] },
    "M1.S2.T4.C18:7": { kind: "check", rows: [[2, 4, 3], [6, 7], [42]] },
    "M1.S2.T4.C18:8": { kind: "build", op: "mul", rows: [[2, 3, 5], [6, 15], [90]] },
  },
  warm: {
    1: { kind: "build", op: "add", rows: [[2, 3, 1], [5, 4], [9]] },
    2: { kind: "build", op: "mul", rows: [[3, 2, 1], [6, 2], [12]] },
    3: { kind: "check", rows: [[4, 1, 2], [5, 3], [8]] },
    4: { kind: "check", rows: [[3, 2, 2], [6, 4], [10]] },
  },
  /* Free play takes the child's own bottom row; a bottom number stays 1 to 9 so the tallest multiplying tower (6,561)
     still reads in its box. */
  free: { base: [2, 3, 4], op: "add", max: 9 },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

const twrApply = (op: string, a: number, b: number) => (op === "mul" ? a * b : a + b);
/* the grid a bottom row makes under one sign (Free play, and the oracle) */
const twrGrid = (base: number[], op: string) => {
  const rows = [base.slice()];
  while (rows[rows.length - 1].length > 1) {
    const r = rows[rows.length - 1], up = [];
    for (let c = 0; c + 1 < r.length; c++) up.push(twrApply(op, r[c], r[c + 1]));
    rows.push(up);
  }
  return rows;
};
/* which cells a sign cannot make from the two beneath them, in a tower that is already printed */
const twrBreaks = (rows: number[][], op: string) => {
  const out: string[] = [];
  for (let r = 1; r < rows.length; r++) for (let c = 0; c < rows[r].length; c++)
    if (twrApply(op, rows[r - 1][c], rows[r - 1][c + 1]) !== rows[r][c]) out.push(r + "," + c);
  return out;
};
/* the sign that makes the most boxes of a printed tower (adding on a tie) */
const twrBest = (rows: number[][]) => (twrBreaks(rows, "add").length <= twrBreaks(rows, "mul").length ? "add" : "mul");
const twrShow = (t: any) => t.show || t.rows.map((row: number[], r: number) => row.map(() => t.kind === "check" || r === 0));
/* the cells a build tower leaves for the child, lowest row first, left to right (the last one is asked) */
const twrOrder = (t: any) => {
  const show = twrShow(t), out: any[] = [];
  for (let r = 0; r < t.rows.length; r++) for (let c = 0; c < t.rows[r].length; c++) if (!show[r][c]) out.push({ r, c });
  return out;
};
/* the walk's order in a printed tower: every box above the bottom row, bottom up */
const twrWalk = (t: any) => {
  const out: any[] = [];
  for (let r = 1; r < t.rows.length; r++) for (let c = 0; c < t.rows[r].length; c++) out.push({ r, c });
  return out;
};
/* the boxes above a bottom box that rest on it, directly or through the rows between, row by row (the boxes a changed bottom number rebuilds) */
const twrAbove = (nbw: number, c: number) => {
  const out: any[] = [];
  for (let r = 1; r < nbw; r++) for (let j = Math.max(0, c - r); j <= Math.min(c, nbw - 1 - r); j++) out.push({ r, c: j });
  return out;
};
/* every box above the bottom row, row by row */
const twrAll = (nbw: number) => {
  const out: any[] = [];
  for (let r = 1; r < nbw; r++) for (let j = 0; j + r < nbw; j++) out.push({ r, c: j });
  return out;
};
const twrNum = (v: any) => (typeof v === "number" && v >= 1000 ? indian(v) : String(v));
/* the sign drawn as two bars: a plus, or the same turned a quarter for a times */
const twrSign = (op: string, cx: number, cy: number, s: number, col: string, kk?: any) => {
  const t = s * 0.26;
  return (
    <g key={kk} transform={op === "mul" ? `rotate(45 ${cx} ${cy})` : undefined}>
      <rect x={cx - s / 2} y={cy - t / 2} width={s} height={t} rx={t / 2} fill={col} />
      <rect x={cx - t / 2} y={cy - s / 2} width={t} height={s} rx={t / 2} fill={col} />
    </g>
  );
};

/* judge: is this value right for this item? (numbers compare as numbers, verdicts as their ids) */
const judge = (item: any, v: any) => {
  if (v && typeof v === "object" && !Array.isArray(v)) return false;   /* { inner: n }: a wrong number in a box on the way is a miss, never a win */
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work.
   A build tower is folded up from its bottom row with plain arithmetic; a printed tower is tested sign by sign,
   and the verdict is read off which sign (if any) makes every box. */
const oracle = () => {
  const fold = (base: number[], mul: boolean) => {
    let row = base.slice();
    while (row.length > 1) {
      const up = [];
      for (let i = 0; i + 1 < row.length; i++) up.push(mul ? row[i] * row[i + 1] : row[i] + row[i + 1]);
      row = up;
    }
    return row[0];
  };
  const clean = (rows: number[][], mul: boolean) => {
    for (let r = 1; r < rows.length; r++) for (let c = 0; c < rows[r].length; c++) {
      const a = rows[r - 1][c], b = rows[r - 1][c + 1];
      if ((mul ? a * b : a + b) !== rows[r][c]) return false;
    }
    return true;
  };
  const shaped = (t: any) => t.rows.every((row: number[], r: number) => r === 0 || row.length === t.rows[r - 1].length - 1);
  const items = PHASES.every((p: any) => p.items.every((it: any) => {
    const t = MODEL.towers[it.qid];
    if (!t || !shaped(t)) return false;
    if (t.kind === "build") {
      if (!clean(t.rows, t.op === "mul")) return false;
      if (t.target) {
        /* judged on the blank bottom box: the box above it divided (or subtracted) by its neighbour gives it back */
        const [tr, tc] = t.target, nb = tc > 0 ? tc - 1 : 1, up = t.rows[1][tc > 0 ? tc - 1 : 0];
        const back = t.op === "mul" ? up / t.rows[0][nb] : up - t.rows[0][nb];
        return tr === 0 && back === it.answer && t.rows[tr][tc] === it.answer;
      }
      if (fold(t.rows[0], t.op === "mul") !== it.answer) return false;
      const last = twrOrder(t)[twrOrder(t).length - 1];
      return !!last && t.rows[last.r][last.c] === it.answer;
    }
    const plus = clean(t.rows, false), times = clean(t.rows, true);
    const ids = it.choices.map((c: any) => c.id).join("|");
    if (ids === "adding|multiplying") return it.answer === (plus && !times ? "adding" : times && !plus ? "multiplying" : "");
    if (ids === "all follow|one breaks") return it.answer === (plus || times ? "all follow" : "one breaks");
    if (ids === "one sign|two signs") return it.answer === (plus || times ? "one sign" : "two signs");
    return false;
  }));
  /* the warm-up towers are real towers too */
  const warm = [1, 2].every((n) => { const t = MODEL.warm[n]; return shaped(t) && clean(t.rows, t.op === "mul"); })
    && [3, 4].every((n) => shaped(MODEL.warm[n]));
  return items && warm;
};
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => (item.near !== undefined ? item.near : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (typeof item.answer === "number"
  ? [String(item.answer), indian(item.answer), words(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter; undefined = press Enter (so, in a guide step, the agent reaches api.onEnter) */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area ────────────────────────────────────────────────────────────────────────
   keyOnly: 64,108, 1472 x 520 shut; 900 x 520 with the wide pad open; box.key is the key's corner (nothing under it).
   The whole picture (tower + working) is laid out inside the 900 the pad leaves and stays where it is whether the pad
   is open or shut, so the box the child tapped never moves under the finger. There is no runs box under keyOnly. */
function Work({ phase, n, item, index, stage, wrong, typed, captured, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const H = box ? box.h : 520;

  const free = stage === "free";
  /* a phase opens on stage "teach" for one frame before its guide steps ("demo"): both draw the warm-up tower */
  const warm = !free && (stage === "demo" || stage === "teach") && !!MODEL.warm[n];
  const tower = free ? null : warm ? MODEL.warm[n] : MODEL.towers[item.qid];
  const kind = free ? "free" : tower.kind;
  const keyOf = free ? "free" : n + ":" + (warm ? "w" : index);

  const fresh = (kk: string) => ({
    key: kk, base: MODEL.free.base.slice(), op: free ? MODEL.free.op : "add",
    vals: {} as any, part: null as any, open: null as any, typing: "", sel: null as any,
    demo: null as any, demoAt: null as any, tb: false, old: null as any, upd: {} as any, pend: {} as any,
    wn: { add: 0, mul: 0 } as any, sg: "add", worked: {} as any, reveal: false, done: false,
  });
  const [st, setSt] = useState<any>(() => fresh(keyOf));
  const S = st.key === keyOf ? st : fresh(keyOf);
  const live = useRef(keyOf);
  live.current = keyOf;
  /* reset inside the setter: a late keyed reset must never wipe an act that has just resolved */
  useEffect(() => { setSt((p: any) => (p.key === keyOf ? p : fresh(keyOf))); }, [keyOf]);
  useEffect(() => { inner.current = false; return () => tl.stop(); }, [keyOf]);
  const put = (patch: any) => { if (live.current !== keyOf) return; setSt((s: any) => ({ ...(s.key === keyOf ? s : fresh(keyOf)), ...patch, key: keyOf })); };

  /* the grid on screen: a printed tower as authored, Free play folded from the child's bottom row */
  const truth: number[][] = free ? twrGrid(S.base, S.op) : tower.rows;
  /* Free play, a bottom number or the sign just changed: a box keeps its old number until the pencil reaches it */
  const rows: number[][] = free && S.old ? truth.map((row, r) => row.map((v, c) => (r === 0 || !S.pend[r + "," + c] || S.upd[r + "," + c] ? v : S.old[r][c]))) : truth;
  const B = rows[0].length === 3 ? (kind === "check" ? MODEL.box3c : MODEL.box3) : MODEL.box;
  const show = free ? rows.map((row, r) => row.map(() => r === 0)) : twrShow(tower);
  const order: any[] = free ? [] : kind === "build" ? twrOrder(tower) : twrWalk(tower);
  const cellKey = (c: any) => c.r + "," + c.c;
  const cellOf = (s: string) => ({ r: Number(s.split(",")[0]), c: Number(s.split(",")[1]) });
  const target = kind === "build" && !warm && order.length
    ? (tower.target ? { r: tower.target[0], c: tower.target[1] } : order[order.length - 1]) : null;
  const nextFill = kind === "build" ? order.find((c: any) => S.vals[cellKey(c)] === undefined) : null;
  const nextWalk = kind === "check" ? order[S.wn[S.sg]] : null;
  /* the sign on the rail: the tower's own while it is built, the sign being tested while one is checked */
  const rail = free ? S.op : kind === "check" ? S.sg : tower.op;
  const other = (op: string) => (op === "add" ? "mul" : "add");

  /* a cell's value on screen: printed, filled by the child, being written by the pencil, or standing on the correction layer */
  const valueAt = (r: number, c: number) => {
    if (free || show[r][c]) return rows[r][c];
    const k = r + "," + c;
    if (S.vals[k] !== undefined) return S.vals[k];
    if (S.part && S.part.k === k) return S.part.s;
    if (S.demo && S.demo[k] !== undefined) return S.demo[k];
    return null;
  };

  const busy = useRef(false);
  /* a guide step waits for one act: a tap on any other control is reported, shows the step's hint, and does nothing */
  const press = (name: string, fn: () => void) => {
    if (stage === "demo" && stepOn !== name) { api.did(name); return; }
    fn();
  };
  const lastKey = useRef(0);
  const pressKey = (name: string, fn: () => void) => {
    const t = Date.now();
    if (t - lastKey.current < 400) return;
    lastKey.current = t;
    press(name, fn);
  };

  /* ── the child's acts ───────────────────────────────────────────────────────────────────── */
  /* the pad is lent to the open box; the runtime holds one function, so it is sent through a ref and always runs against this render's tower */
  const inner = useRef(false);
  /* Free play: the pencil makes the boxes in `cells` again (row by row), each showing its new number as the tip reaches it */
  const cellsOf = (cells: any[]) => { const o: any = {}; cells.forEach((c: any) => { o[cellKey(c)] = true; }); return o; };
  /* a bottom box tapped (or Entered) while the pencil works waits and opens when it is done; a tap on the working area itself
     is dropped by the runtime while an act plays (its work zone takes no pointer then), which is why the act is kept short */
  const wantBox = useRef<any>(null);
  const rebuild = async (cells: any[]) => {
    if (!cells.length) { put({ old: null, upd: {}, pend: {} }); return; }
    busy.current = true;
    const upd: any = {};
    await api.act({
      tool: "pencil", moves: "push", ms: 700,
      at: cells.map((c: any) => ({ x: X(c.r, c.c) + B.w / 2, y: Y(c.r) + B.h / 2 })),
      onPoint: (i: number) => { upd[cellKey(cells[i])] = true; put({ upd: { ...upd } }); },
    });
    busy.current = false;
    put({ old: null, upd: {}, pend: {} });
    if (wantBox.current) { const w = wantBox.current; wantBox.current = null; openBox(w); }
  };
  const keyRef = useRef<any>(null);
  keyRef.current = (k: string) => {
    const cell = S.open;
    if (!cell) { api.capture(null); return; }
    if (k === "clear") { put({ typing: "" }); return; }
    if (k === "back") { put({ typing: String(S.typing).slice(0, -1) }); return; }
    if (k === "enter") {
      if (!S.typing) { api.capture(null); put({ open: null }); return; }
      const v = Number(S.typing);
      if (free) {
        const nv = Math.max(1, Math.min(v, MODEL.free.max));
        api.capture(null);
        if (nv === S.base[cell.c] || busy.current) { put({ open: null, typing: "" }); return; }
        const b = S.base.slice();
        b[cell.c] = nv;
        api.sfx.tick();
        /* the Delight: only the boxes resting on the changed number are made again, row by row */
        const cells = twrAbove(b.length, cell.c);
        put({ base: b, open: null, typing: "", old: twrGrid(S.base, S.op), upd: {}, pend: cellsOf(cells) });
        rebuild(cells);
        return;
      }
      if (target && cell.r === target.r && cell.c === target.c) {
        api.capture(null);
        put({ open: null, typing: "", demo: null, demoAt: null });
        api.submit(v);
        return;
      }
      if (v === rows[cell.r][cell.c]) {
        api.capture(null); api.sfx.tick();
        put({ vals: { ...S.vals, [cellKey(cell)]: v }, open: null, typing: "" });
      } else {
        /* a wrong number in a box on the way is a real miss of the runtime: the question is no longer first try, the bubble shows
           the next rung of the SAME ladder the Hint key climbs (getState().hint is that line), and the box is handed back with its
           two boxes still lit. The value goes as { inner } so it can never equal (win) the answer, and the traceback below skips it. */
        inner.current = true;
        put({ typing: "" });
        api.submit({ inner: v });
      }
      return;
    }
    if (!/^[0-9]$/.test(k)) return;
    const next = String(S.typing) + k;
    /* Free play never lets a bottom number past the cap, so the tower it folds always fits its boxes */
    if (free) { if (Number(next) >= 1 && Number(next) <= MODEL.free.max) put({ typing: next }); return; }
    put({ typing: String(S.typing).length >= 3 ? String(S.typing) : next });
  };
  const padKey = (k: string) => keyRef.current && keyRef.current(k);
  /* the Close key (or anything else) takes the pad back: the open box shuts with it */
  const wasCap = useRef(false);
  useEffect(() => {
    if (wasCap.current && !captured && S.open) put({ open: null, typing: "" });
    wasCap.current = !!captured;
  }, [captured]);

  const clearDemo = () => { if (S.demo || S.demoAt) put({ demo: null, demoAt: null }); };
  /* the correction stands on its own layer and clears the moment the child writes again */
  const lastTyped = useRef(typed);
  useEffect(() => {
    if (lastTyped.current !== typed) { lastTyped.current = typed; if (S.demo) put({ demo: null, demoAt: null }); }
  }, [typed]);

  const openBox = (cell: any) => {
    clearDemo();
    put({ open: cell, typing: "" });
    api.capture(padKey);
  };

  /* warm-up, a build tower: tap the empty box and its two boxes light */
  const selBox = (cell: any) => {
    if (S.sel) return;
    api.sfx.tick();
    put({ sel: cell });
    api.did("box");
  };
  /* a printed tower: step to the next box; its pair lights and the working writes the pair only */
  const stepWalk = () => {
    if (!nextWalk) return;
    clearDemo();
    api.sfx.tick();
    put({ wn: { ...S.wn, [S.sg]: S.wn[S.sg] + 1 } });
    if (warm) api.did("box");
  };
  /* the pencil writes the sum into the lit box, digit by digit (a warm-up step on a build tower) */
  const writeBox = async () => {
    const cell = S.sel;
    if (!cell || busy.current || S.part) return;
    const k = cellKey(cell), s = String(rows[cell.r][cell.c]);
    const dw = 34, cx = ox + cell.r * (B.w + B.gx) / 2 + cell.c * (B.w + B.gx) + B.w / 2, cy = Y(cell.r) + B.h / 2;
    busy.current = true;
    api.did("fill");   /* the step is taken the moment the pencil starts (the result stays on show for the phase's stepHold) */
    const ok = await api.act({
      tool: "pencil", moves: "push", ms: 800,
      at: s.split("").map((_: any, i: number) => ({ x: cx - (s.length * dw) / 2 + (i + 0.5) * dw, y: cy })),
      onPoint: (i: number) => put({ part: { k, s: s.slice(0, i + 1) } }),
    });
    busy.current = false;
    if (!ok) { put({ part: null }); return; }
    put({ part: null, vals: { [k]: rows[cell.r][cell.c] } });
    api.sfx.settle();
  };
  /* the pencil writes the result of the stepped box in the working (a warm-up step on a printed tower) */
  const writeWork = async () => {
    const i = S.wn[S.sg] - 1;
    if (i < 0 || busy.current) return;
    const col = twoCol ? L.x + L.w * (S.sg === "add" ? 0.25 : 0.75) : L.x + L.w / 2;
    busy.current = true;
    api.did("fill");
    const ok = await api.act({
      tool: "pencil", moves: "push", ms: 800,
      at: [{ x: col + 64, y: L.y + 120 + i * 44 }],
      onPoint: () => put({ worked: { ...S.worked, [S.sg + ":" + i]: true } }),
    });
    busy.current = false;
    if (!ok) return;
    api.sfx.settle();
  };
  /* Other sign (a printed tower): test with the other sign; Switch sign (Free play): the tower folds again under it */
  const flipSign = () => {
    api.sfx.tick();
    if (free) {
      if (busy.current) return;
      if (S.open) api.capture(null);
      const cells = twrAll(rows[0].length);
      put({ op: other(S.op), open: null, typing: "", old: twrGrid(S.base, S.op), upd: {}, pend: cellsOf(cells) });
      rebuild(cells);
      return;
    }
    const o = other(S.sg);
    if (warm) {
      put({ sg: o, wn: { ...S.wn, [o]: Math.max(S.wn[o], 1) }, worked: { ...S.worked, [o + ":0"]: true } });
      api.did("sign");
      return;
    }
    clearDemo();
    put({ sg: o });
  };
  /* Enter, the agent's check() and the dev solve() perform the CURRENT step */
  const act = (on: string) => {
    if (on === "box") { if (kind === "build") { if (order[0]) selBox(order[0]); } else stepWalk(); }
    else if (on === "fill") { if (kind === "build") writeBox(); else writeWork(); }
    else if (on === "sign") flipSign();
  };
  api.onEnter(stage === "demo" && stepOn ? () => act(stepOn) : null);

  /* ── winning: the tower finishes itself, the walks finish their working ─────────────────── */
  useEffect(() => {
    if (stage !== "win" || free || warm) return;
    api.say(item.win);
    if (kind === "check") {
      put({ wn: { add: order.length, mul: order.length }, sg: twrBest(rows), reveal: true, done: true, demo: null, demoAt: null });
      return;
    }
    const left = order.filter((c: any) => S.vals[cellKey(c)] === undefined);
    if (!left.length) return;
    const got: any = {};
    tl.run(left.map((c: any) => [420, () => { got[cellKey(c)] = rows[c.r][c.c]; put({ vals: { ...S.vals, ...got } }); }]));
  }, [stage, index]);

  /* ── the traceback: the maths redrawn, ending on the whole right answer ─────────────────── */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free || warm) return;
    if (inner.current) { inner.current = false; return; }   /* a box on the way was wrong: its miss is shown, nothing is redrawn */
    api.lock(true);
    if (S.open) api.capture(null);
    const done = () => { put({ tb: false }); api.lock(false); };
    if (kind === "build") {
      const layer: any = {};
      const steps: any[] = [[420, () => put({ open: null, typing: "", tb: true, demo: {}, demoAt: null })]];
      order.forEach((c: any) => steps.push([560, () => {
        layer[cellKey(c)] = rows[c.r][c.c];
        put({ demo: { ...layer }, demoAt: cellKey(c) });
      }]));
      steps.push([700, () => put({ demoAt: null })]);
      tl.run(steps, done);
      return;
    }
    const first = twrBest(rows), second = other(first);
    const steps: any[] = [[420, () => put({ tb: true, sg: first, wn: { add: 0, mul: 0 }, reveal: true, done: false, demo: null, demoAt: null })]];
    for (let k = 1; k <= order.length; k++) steps.push([520, () => put({ sg: first, wn: { [first]: k, [second]: 0 } })]);
    steps.push([620, () => put({ sg: second })]);
    for (let k = 1; k <= order.length; k++) steps.push([520, () => put({ sg: second, wn: { [first]: order.length, [second]: k } })]);
    steps.push([800, () => put({ sg: first, done: true })]);
    tl.run(steps, done);
  }, [wrong]);

  /* ── layout: tower on the left, the working beside it; the plate and the key row at the foot ── */
  const nb = rows[0].length;
  const towerW = nb * B.w + (nb - 1) * B.gx;
  const twoCol = kind === "check";
  const LW = twoCol ? 400 : 290;
  const groupW = towerW + 26 + LW;
  const ox = Math.round((900 - groupW) / 2);
  const X = (r: number, c: number) => ox + r * (B.w + B.gx) / 2 + c * (B.w + B.gx);
  const Y = (r: number) => MODEL.footY - B.h - r * (B.h + B.gy);
  const L = { x: ox + towerW + 26, y: 16, w: LW, h: MODEL.footY - 16 };
  const kh = 72, ky = H - kh - 8;
  const BLUE = CONTENT.hundred, GREEN = CONTENT.one, AMBER = CONTENT.ten, STEP = CONTENT.pointer;
  /* a box its sign cannot make: a thick dark purple outline (hue 310) on its own tan, apart from the pink invite ring */
  const NOTE = "#8A2C7A";
  /* the digits on a brick: near-black, tinted by the state (given blue, made green, broken purple), at least 4.5:1 on the tan */
  const INK_GIVEN = "#0B2A3D", INK_MADE = "#06301F", INK_BROKEN = "#3A1530", INK_NOTE = "#5A1D4F";
  const spaced: any = lang === "en" ? undefined : { wordSpacing: 10 };   /* Hindi and Gujarati words keep a visible gap */

  /* what the host and the agent read back (toolApi.getState) */
  const filledCount = rows.reduce((a: number, row: number[], r: number) => a + row.filter((_: number, c: number) => valueAt(r, c) !== null).length, 0);
  const cellCount = rows.reduce((a: number, row: number[]) => a + row.length, 0);
  api.share({
    operation: rail === "mul" ? "multiply" : "add",
    bottomRow: rows[0].map((_: number, c: number) => valueAt(0, c)),   /* a blank bottom box stays null until it is answered */
    boxes: filledCount,
    checked: kind === "check" ? S.wn[S.sg] : 0,
    brokenBoxes: kind === "check" && (stage === "win" || stage === "idle") ? twrBreaks(rows, twrBest(rows)).length : 0,
    missing: cellCount - filledCount,
    complete: stage === "idle",
  });

  /* the rest lights: the two boxes the box in play stands on (for a blank in the bottom row: its neighbour and the box it helps make) */
  const restOf = (cell: any) => {
    if (!cell) return [];
    if (cell.r > 0) return [{ r: cell.r - 1, c: cell.c }, { r: cell.r - 1, c: cell.c + 1 }];
    const c = cell.c > 0 ? cell.c - 1 : 0;
    return [{ r: 0, c: cell.c > 0 ? c : 1 }, { r: 1, c }];
  };
  const inPlay = S.open ? S.open
    : S.demoAt ? cellOf(S.demoAt)
    : kind === "build" && warm && S.sel ? S.sel
    : kind === "check" && !S.done && S.wn[S.sg] > 0 ? order[Math.min(S.wn[S.sg], order.length) - 1] : null;
  const lit = restOf(inPlay).map(cellKey);

  const boxes: any[] = [];
  const struts: any[] = [];
  const signs: any[] = [];
  for (let r = 0; r < rows.length; r++) {
    for (let c = 0; c < rows[r].length; c++) {
      const x = X(r, c), y = Y(r), k = r + "," + c;
      const v = valueAt(r, c);
      const isOpen = S.open && S.open.r === r && S.open.c === c;
      const onDemo = !!(S.demo && S.demo[k] !== undefined);
      const atNow = !!(inPlay && inPlay.r === r && inPlay.c === c);
      const idx = kind === "check" && r > 0 ? order.findIndex((o: any) => o.r === r && o.c === c) : -1;
      const known = idx >= 0 && S.wn[S.sg] > idx && (S.reveal || !!S.worked[S.sg + ":" + idx]);
      const broken = known && twrApply(S.sg, rows[r - 1][c], rows[r - 1][c + 1]) !== rows[r][c];
      const given = free ? r === 0 : !!show[r][c];
      const hue = broken ? NOTE : given ? BLUE : GREEN;
      const face = v === null ? "#FFFFFF" : broken ? tint("#C9A27A", 0.6) : tint(hue, 0.84);
      const edge = v === null ? (isOpen ? C.accent : C.dim) : hue;
      const ink = broken ? INK_BROKEN : given && !onDemo ? INK_GIVEN : INK_MADE;
      const shown = v === null ? "" : twrNum(v);
      const fs = shown.length <= 2 ? (B.w > 130 ? T.display : T.xl) : shown.length === 3 ? (B.w > 130 ? T.xl : T.speech) : T.label;
      boxes.push(
        <g key={"b" + k} data-role="tower-box">
          <rect x={x} y={y} width={B.w} height={B.h} rx={RAD.piece + 4} fill={face} stroke={edge}
            strokeWidth={isOpen ? 5 : 3} strokeDasharray={v === null && !isOpen ? "9 9" : undefined} filter="url(#fShadowSoft)" />
          {/* a box that holds a number is a brick (the skin; the plain rect above is the fallback); the colour code
              stays on it as a wash and an outline: blue given, green made, reddish purple a box its sign cannot make */}
          {v !== null && !isOpen && <Skin name="brick" x={x} y={y} w={B.w} h={B.h} fit="stretch" />}
          {v !== null && !isOpen && <rect x={x} y={y} width={B.w} height={B.h} rx={RAD.piece + 4} fill={hue} fillOpacity={broken ? 0 : 0.1}
            stroke={edge} strokeWidth={broken ? 7 : 4} />}
          {lit.indexOf(k) >= 0 && <rect x={x - 6} y={y - 6} width={B.w + 12} height={B.h + 12} rx={RAD.piece + 9}
            fill="none" stroke={AMBER} strokeWidth={5} />}
          {(known || atNow) && <rect x={x - 6} y={y - 6} width={B.w + 12} height={B.h + 12} rx={RAD.piece + 9}
            fill="none" stroke={known ? (broken ? NOTE : GREEN) : STEP} strokeWidth={broken ? 5 : 4} />}
          {v !== null && !isOpen && <text x={x + B.w / 2} y={y + B.h / 2 + fs * 0.35} textAnchor="middle"
            fontSize={fs} fontWeight={700} fill={ink}>{shown}</text>}
          {isOpen && <text x={x + B.w / 2 - (S.typing ? 8 : 0)} y={y + B.h / 2 + 15} textAnchor="middle"
            fontSize={T.speech} fontWeight={700} fill={shade(GREEN, 0.25)}>{S.typing}</text>}
          {isOpen && <rect className="c4-caret" x={x + B.w / 2 + String(S.typing).length * 13 - 6} y={y + 18}
            width={4} height={44} rx={2} fill={C.accent} />}
        </g>
      );
      if (r > 0) struts.push(
        <g key={"s" + k}>
          <rect x={x + 20} y={y + B.h} width={5} height={B.gy} fill={atNow ? STEP : C.ink} />
          <rect x={x + B.w - 25} y={y + B.h} width={5} height={B.gy} fill={atNow ? STEP : C.ink} />
        </g>
      );
      if (c + 1 < rows[r].length) signs.push(twrSign(rail, x + B.w + B.gx / 2, y + B.h / 2, 22, STEP, "r" + k));
    }
  }

  /* the working: one line to a box, in words and signs. A line reads its pair only until the result is in.
     One column while a tower is built; one column a sign while a printed tower is checked. */
  const lineOf = (cell: any, op: string, full: boolean) => {
    const g = op === "mul" ? "×" : "+";
    if (cell.r > 0) {
      const a = rows[cell.r - 1][cell.c], b = rows[cell.r - 1][cell.c + 1];
      return [twrNum(a) + " " + g + " " + twrNum(b), full ? "= " + twrNum(twrApply(op, a, b)) : ""];
    }
    const c = cell.c > 0 ? cell.c - 1 : 0;
    const a = rows[0][cell.c > 0 ? c : 1], out = rows[1][c];
    return [twrNum(a) + " " + g + " " + (full ? twrNum(rows[0][cell.c]) : "?"), "= " + twrNum(out)];
  };
  /* a line of the working is two texts, the pair then its result, so a label stays three words and the equals signs line up */
  const lineAt = (kk: string, cx: number, y: number, parts: string[], fill: string) => {
    const dx = twoCol ? 6 : 20;
    return [
      <text key={kk + "a"} x={cx + dx} y={y} textAnchor="end" fontSize={T.label} fontWeight={600} fill={fill}>{parts[0]}</text>,
      parts[1] ? <text key={kk + "b"} x={cx + dx + 12} y={y} textAnchor="start" fontSize={T.label} fontWeight={600} fill={fill}>{parts[1]}</text> : null,
    ];
  };
  const ledger: any[] = [];
  if (kind === "check") {
    ["add", "mul"].forEach((op, j) => {
      const cx = L.x + L.w * (0.25 + 0.5 * j);
      ledger.push(<g key={"h" + op}>{twrSign(op, cx, L.y + 74, 26, shade(STEP, 0.2))}</g>);
      order.slice(0, S.wn[op]).forEach((cell: any, i: number) => {
        const full = S.reveal || !!S.worked[op + ":" + i];
        const bad = full && twrApply(op, rows[cell.r - 1][cell.c], rows[cell.r - 1][cell.c + 1]) !== rows[cell.r][cell.c];
        ledger.push(...lineAt("l" + op + i, cx, L.y + 130 + i * 44, lineOf(cell, op, full), bad ? INK_NOTE : C.ink));
      });
    });
  } else {
    const wk = free ? twrWalk({ rows }) : order;
    const lines = wk.filter((c: any) => (valueAt(c.r, c.c) !== null || (S.open && S.open.r === c.r && S.open.c === c.c))
      && !(free && S.old && S.pend[cellKey(c)] && !S.upd[cellKey(c)]));   /* a box the pencil has not reached yet keeps no new working; the others keep theirs */
    ledger.push(<g key="hh">{twrSign(rail, L.x + L.w / 2, L.y + 74, 26, shade(STEP, 0.2))}</g>);
    lines.forEach((cell: any, i: number) => ledger.push(
      ...lineAt("l" + i, L.x + L.w / 2, L.y + 130 + i * 44, lineOf(cell, rail, valueAt(cell.r, cell.c) !== null), C.ink)
    ));
  }

  /* the foot: a sign plate, and ONE key (two in a warm-up of phase 4 and in Free play's sign) beside it */
  const keys: any[] = [];
  if (warm && kind === "build") keys.push({ id: "fill", label: rail === "mul" ? "Multiply" : "Add", glyph: rail, fn: () => act("fill") });
  if (warm && kind === "check") keys.push({ id: "fill", label: "Check", glyph: S.sg, fn: () => act("fill") });
  if (kind === "check" && (!warm || n === 4) && !S.done) keys.push({ id: "sign", label: "Other sign", glyph: other(S.sg), fn: flipSign });
  if (free) keys.push({ id: "sign", label: "Switch sign", glyph: other(S.op), fn: flipSign });
  const kw = keys.length > 1 ? 272 : 310, kgap = 24;
  const keyL = ox + 216, keyR = ox + groupW;
  const keysW = keys.length * kw + (keys.length - 1) * kgap;
  const keyX0 = keyL + (keyR - keyL - keysW) / 2;
  const vt = kind === "check" && S.done
    ? (twrBreaks(rows, "add").length === 0 ? tx("every box adds") : twrBreaks(rows, "mul").length === 0 ? tx("every box multiplies") : tx("no one sign works"))
    : null;

  /* the one invite: the box or the key the step waits for; at a question, the box to tap first */
  let inv: any = null;
  if (warm) {
    if (stepOn === "box") { const cell = order[0]; if (cell) inv = { x: X(cell.r, cell.c) + B.w / 2, y: Y(cell.r) + B.h / 2, w: B.w, h: B.h, rx: RAD.piece + 4 }; }
    else { const j = keys.findIndex((q: any) => q.id === stepOn); if (j >= 0) inv = { x: keyX0 + j * (kw + kgap) + kw / 2, y: ky + kh / 2, w: kw, h: kh, rx: RAD.key }; }
  } else if (!free && kind === "build" && nextFill && !S.open && !S.demo) {
    inv = { x: X(nextFill.r, nextFill.c) + B.w / 2, y: Y(nextFill.r) + B.h / 2, w: B.w, h: B.h, rx: RAD.piece + 4 };
  } else if (!free && kind === "check" && nextWalk && S.wn.add + S.wn.mul === 0) {
    inv = { x: X(nextWalk.r, nextWalk.c) + B.w / 2, y: Y(nextWalk.r) + B.h / 2, w: B.w, h: B.h, rx: RAD.piece + 4 };
  }

  const railWord = tx(rail === "mul" ? "times" : "adds");

  return (
    <g>
      <rect x={L.x} y={L.y} width={L.w} height={L.h} rx={RAD.panel} fill={tint(C.panel, 0.5)} stroke={C.rule} strokeWidth={2} />
      <text x={L.x + L.w / 2} y={L.y + 34} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("working")}</text>
      {ledger}

      {struts}
      {boxes}
      {signs}

      <rect x={ox} y={ky} width={200} height={kh} rx={RAD.key} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={2} />
      {twrSign(rail, ox + 44, ky + kh / 2, 30, shade(STEP, 0.2))}
      <text x={ox + 124} y={ky + kh / 2 + 11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{railWord}</text>

      {keys.map((q: any, j: number) => (
        <Key key={"k" + j} id={q.id} label={tx(q.label)} x={keyX0 + j * (kw + kgap)} y={ky} w={kw} h={kh} C={C} tone="soft"
          disabled={warm && stepOn !== q.id} onClick={() => pressKey(q.id, q.fn)}>
          {twrSign(q.glyph, -kw / 2 + 42, 0, 28, warm && stepOn !== q.id ? C.dim : toneInk("soft", shade(STEP, 0.2)))}
          <text x={Math.round(kw * 0.14)} y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} style={spaced}
            fill={warm && stepOn !== q.id ? C.dim : toneInk("soft", C.ink)}>{tx(q.label)}</text>
        </Key>
      ))}
      {vt && <text x={(keyL + keyR) / 2} y={ky + kh / 2 + 11} textAnchor="middle" fontSize={T.label} fontWeight={700}
        fill={INK_NOTE} style={spaced}>{vt}</text>}

      {/* the live boxes: the lowest empty box while a tower is built, the next box of the walk while one is checked.
          A box holding the pad is not a control, so Enter still reaches the window. */}
      {free && rows[0].map((_: number, c: number) => (
        <Hit key={"f" + c} id={"base-" + c} x={X(0, c)} y={Y(0)} w={B.w} h={B.h} label={tx("Bottom box") + " " + (c + 1)}
          enabled={!(S.open && S.open.c === c)} onPress={() => (busy.current ? (wantBox.current = { r: 0, c }) : openBox({ r: 0, c }))} />
      ))}
      {!free && kind === "build" && warm && !S.sel && order[0] && (
        <Hit id="box" x={X(order[0].r, order[0].c)} y={Y(order[0].r)} w={B.w} h={B.h} label={tx("The empty box")}
          onPress={() => press("box", () => selBox(order[0]))} />
      )}
      {!free && kind === "build" && !warm && nextFill && !S.tb && (
        <Hit id="box" x={X(nextFill.r, nextFill.c)} y={Y(nextFill.r)} w={B.w} h={B.h} label={tx("The empty box")}
          enabled={!S.open} onPress={() => openBox(nextFill)} />
      )}
      {!free && kind === "check" && nextWalk && !S.done && !S.tb && (!warm || S.wn[S.sg] === 0) && (
        <Hit id="box" x={X(nextWalk.r, nextWalk.c)} y={Y(nextWalk.r)} w={B.w} h={B.h} label={tx("Test this box")}
          onPress={() => press("box", stepWalk)} />
      )}
      {inv && <Invite x={inv.x} y={inv.y} w={inv.w} h={inv.h} rx={inv.rx} C={C} />}
    </g>
  );
}

/* the summary page's small drawing (236 x 66) of the child's last right answer in a phase: the whole tower, every row, as a small brick
   wall. The digits are at the 28 floor, so a row gets its numbers only when its pitch allows (all three rows of a three-row tower;
   the bottom and the top of a four-row one, the rows between stay plain bricks). A checked tower also shows the sign (or both
   signs) that makes it, drawn as signs so the picture needs no word in any language. */
function Thumb({ result, it, C, w, h, lang = "en", tx: tr = (v: any) => v }: any) {
  const last = result && result.last ? result.last : null;
  const v = last ? last.value : null;
  if (v === null || v === undefined || !it) return null;
  const t = MODEL.towers[it.qid];
  if (!t) return null;
  const BLUE = CONTENT.hundred, GREEN = CONTENT.one;
  const R = t.rows.length, nb = t.rows[0].length, show = twrShow(t);
  const tg = t.target ? t.target[1] * 100 + t.target[0] : -1;   /* the box the child found (C16:4), if the question is judged on one */
  const signs = !it.choices ? [] : twrBreaks(t.rows, "add").length === 0 ? ["add"] : twrBreaks(t.rows, "mul").length === 0 ? ["mul"] : ["add", "mul"];
  const gap = 3, vg = 1.5, bw = Math.min(46, (w - 14 - (nb - 1) * gap) / nb);
  /* the rows' heights: a three-row tower is three rows with numbers; a four-row one has numbers on its bottom and top rows
     (tall bricks) and its two middle rows as thin plain bricks between them, so every digit stays at the 28 floor */
  const hs: number[] = R <= 3 ? Array(R).fill((h - 4 - (R - 1) * vg) / R) : [23, 5, 5, 23].slice(0, R);
  const total = nb * bw + (nb - 1) * gap, x0 = signs.length ? 10 : (w - total) / 2;
  const cells: any[] = [];
  let yBase = h - 2;
  for (let r = 0; r < R; r++) {
    const bh = hs[r], y = yBase - bh;
    yBase = y - vg;
    for (let c = 0; c < t.rows[r].length; c++) {
      const given = show[r][c], found = tg >= 0 && r === t.target[0] && c === t.target[1];
      const str = twrNum(t.rows[r][c]), bwr = r === R - 1 && str.length > 2 ? Math.max(bw, str.length * 17 + 10) : bw;
      const x = x0 + r * (bw + gap) / 2 + c * (bw + gap) - (bwr - bw) / 2;
      const hue = found || !given ? GREEN : BLUE;
      cells.push(
        <g key={r + "," + c}>
          <rect x={x} y={y} width={bwr} height={bh} rx={Math.min(5, bh / 2)} fill={tint(hue, found ? 0.62 : 0.8)} stroke={hue} strokeWidth={found ? 2.5 : 1} />
          {bh >= 19 && <text x={x + bwr / 2} y={y + bh / 2 + 9.5} textAnchor="middle" fontSize={T.micro} fontWeight={700}
            fill={hue === BLUE ? "#0B2A3D" : "#06301F"}>{str}</text>}
        </g>
      );
    }
  }
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {cells}
      {signs.map((op, k) => twrSign(op, w - 44 - (signs.length - 1 - k) * 38 + (signs.length - 1) * 19, h / 2, 22, shade(CONTENT.pointer, 0.2), "g" + k))}
    </g>
  );
}

function TowerBuilder(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b): the working area the whole card until the child taps Answer or a box, the answer
         box and keypad in a panel that slides in from the right */
      board: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d, PATTERNS.md §16): no question bar, only the blinking key at the top right; the
         working area is 64,108, 1472 x 520 and the key's corner is props.box.key (nothing of mine stands under it); the question
         lives only in the bubble. */
      keyOnly: true,
      /* the wide keypad: the panel is 556 wide and the picture has x 64 to 964 while it is open (the tower + working fit in 900) */
      bigPad: true,
      /* the Next key: nothing moves on by itself; the win picture waits for the child's tap on the blinking Next key */
      nextKey: true,
      /* NAV DOTS (the new look): one small clickable dot per phase, no text */
      navDots: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key */
      StartArt, START_HOOK,
      }} />
  );
}

export default TowerBuilder;
