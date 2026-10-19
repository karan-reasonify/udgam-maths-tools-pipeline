/* ═══ M2.S3.T5.C20.2D1 · measure_comparer · tool-specific part ═══════════════════════════════
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

const TOOL_ID = "measure_comparer";
const MEDIA_ID = "M2.S3.T5.C20.2D1";
const TOOL_NAME = "Same-Unit Comparer";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["Some measure cards, each written its own way."];
/* the whole-tool line: printed on the summary page */
const FINISH_LINE = "You put every measure in one unit before you compared.";
/* printed when the child opens Free play (the plan's free-play line); its LAST piece stays on the bubble */
const FREE_LINE = "Free play. Tap New cards, then stand them up side by side.";

/* THE START PAGE (runtime r28; docs/LAYOUT.md §1c, docs/PATTERNS.md §14): the first thing a child sees in user mode.
   START_HOOK is ONE printed question to wonder at (it needs a TR entry, and never gives an answer away); StartArt is
   the object the lesson is about, drawn in a 1200 x 340 box ({ box, C, lang, tx }; plain shapes in the chrome and content
   colours, a <Skin> over them when the image agent made one). This stub is a dashed outline: draw the real object. */
const START_HOOK = "Is the bigger number always the bigger measure?";
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  /* two measure cards, each standing on its bar on one shelf, a sign box waiting between them */
  const cx = [box.w / 2 - 300, box.w / 2 + 300], blue = shade(CONTENT.hundred, 0.25);
  const cards = [["1 " + tx("kg") + " 50 " + tx("g")], [indian(1500) + " " + tx("g")]], hs = [70, 190];
  return (
    <g>
      <rect x={140} y={300} width={box.w - 280} height={18} rx={8} fill={C.rule} stroke={C.ink} strokeWidth={2} />
      {cx.map((x, j) => (
        <g key={j}>
          {/* 400 wide, the text fitted to it (a Hindi unit runs longer than "kg") */}
          <rect x={x - 200} y={0} width={400} height={96} rx={18} fill="#FFFFFF" stroke={CONTENT.hundred} strokeWidth={4} filter="url(#fShadowSoft)" />
          <text x={x} y={48 + 0.36 * Math.min(T.xl, 356 / mcW(cards[j][0]))} textAnchor="middle" fontSize={Math.min(T.xl, 356 / mcW(cards[j][0]))} fontWeight={700} fill={blue}>{cards[j][0]}</text>
          <rect x={x - 70} y={300 - hs[j]} width={140} height={hs[j]} rx={10} fill="url(#gHundred)" stroke={shade(CONTENT.hundred, 0.3)} strokeWidth={2} />
          <clipPath id={"mcs-" + j}><rect x={x - 70} y={300 - hs[j]} width={140} height={hs[j]} rx={10} /></clipPath>
          <g clipPath={"url(#mcs-" + j + ")"}>
            <g transform={`rotate(-90 ${x} ${300 - hs[j] / 2})`}>
              <Skin name="bar" x={x - hs[j] / 2} y={300 - hs[j] / 2 - 70} w={hs[j]} h={140} />
            </g>
          </g>
        </g>
      ))}
      <rect x={box.w / 2 - 48} y={150} width={96} height={96} rx={18} fill="#FFFFFF" stroke={C.ink} strokeWidth={3} strokeDasharray="10 8" />
      <text x={box.w / 2} y={220} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>?</text>
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, byte for byte, and the runtime looks each printed or drawn line
   up in it (Work draws its own words through tx("...")). Fill it AFTER the English is final and reviewed:
   `check` (tr-coverage) lists every printed line still missing. Nothing is baked: the lesson is silent.
   Empty = the tool runs in English only. */
/* terms (one per idea): unit of measure मात्रक / એકમ (इकाई stays the ones place); bar पट्टी / પટ્ટી; ascending order आरोही क्रम /
   ચડતો ક્રમ; descending order अवरोही क्रम / ઊતરતો ક્રમ; capacity धारिता / ગુંજાશ; units किग्रा ग्राम लीटर मिली किमी मीटर सेमी /
   કિગ્રા ગ્રામ લિટર મિલિ કિમી મીટર સેમી (no dots: the bubble pages at a full stop) */
const TR: any = {
  hi: {
    "Same-Unit Comparer": "समान मात्रक तुलना",
    "Same unit first": "पहले समान मात्रक",
    "Equal measures": "बराबर माप",
    "By how much": "कितना अधिक",
    "Putting measures in order": "मापों को क्रम में रखना",
    "Some measure cards, each written its own way.": "कुछ माप कार्ड, हर एक अपने ढंग से लिखा।",
    "You put every measure in one unit before you compared.": "तुमने तुलना से पहले हर माप एक मात्रक में लिखा।",
    "Free play. Tap New cards, then stand them up side by side.": "मुक्त खेल। नए कार्ड दबाओ, फिर उन्हें साथ-साथ खड़ा करो।",
    "Is the bigger number always the bigger measure?": "क्या बड़ी संख्या हमेशा बड़ा माप होती है?",
    "Same unit first. Which bar stands taller?": "पहले समान मात्रक। कौन-सी पट्टी ऊँची है?",
    "Same unit. Are they level?": "समान मात्रक। क्या वे बराबर ऊँची हैं?",
    "Lay the shorter one over. How much sticks out?": "छोटी पट्टी ऊपर रखो। कितना बाहर निकला है?",
    "Same unit first. Now smallest to largest.": "पहले समान मात्रक। अब सबसे छोटे से सबसे बड़ा।",
    "Tap Same unit to write both weights in grams.": "दोनों भार ग्राम में लिखने के लिए समान मात्रक दबाओ।",
    "The Same unit key is at the bottom.": "समान मात्रक का बटन नीचे है।",
    "Tap Same unit to write both lengths in centimetres.": "दोनों लंबाइयाँ सेमी में लिखने के लिए समान मात्रक दबाओ।",
    "Find the Same unit key at the bottom.": "नीचे समान मात्रक का बटन ढूँढो।",
    "Tap Same unit to write both amounts in millilitres.": "दोनों मात्राएँ मिली में लिखने के लिए समान मात्रक दबाओ।",
    "Start with the Same unit key.": "समान मात्रक के बटन से शुरू करो।",
    "Now tap Take away to lay the shorter bar over the longer one.": "अब घटाओ दबाओ, छोटी पट्टी लंबी पट्टी पर रखी जाएगी।",
    "The key at the bottom now says Take away.": "नीचे का बटन अब घटाओ कहता है।",
    "Tap Same unit to write all four weights in grams.": "चारों भार ग्राम में लिखने के लिए समान मात्रक दबाओ।",
    "Tap the Same unit key first.": "पहले समान मात्रक का बटन दबाओ।",
    "Now tap one bar to move it into the first place on the shelf.": "अब कोई एक पट्टी दबाओ, वह शेल्फ़ पर पहले स्थान पर जाएगी।",
    "Tap any one of the four bars.": "चार पट्टियों में से कोई एक दबाओ।",
    "Put both cards in the smaller unit before you compare them.": "तुलना से पहले दोनों कार्ड छोटे मात्रक में लिखो।",
    "Now the two numbers share a unit, so compare them place by place.": "अब दोनों संख्याएँ एक मात्रक में हैं, तो हर स्थान की तुलना करो।",
    "Write the mixed card in the smaller unit, then hold it beside the other card.": "मिश्रित कार्ड को छोटे मात्रक में लिखो, फिर दूसरे कार्ड से मिलाओ।",
    "Equal measures stand exactly level once they share a unit.": "एक मात्रक में आने पर बराबर माप बिल्कुल बराबर ऊँचे खड़े होते हैं।",
    "Lay the shorter bar over the longer and read what sticks out.": "छोटी पट्टी लंबी पर रखो और बाहर निकला भाग पढ़ो।",
    "Take the smaller number from the larger one, both in the same unit.": "दोनों को एक मात्रक में लिखकर बड़ी संख्या में से छोटी घटाओ।",
    "Order just two of the bars first, then fit in a third.": "पहले सिर्फ़ दो पट्टियों को क्रम में रखो, फिर तीसरी जोड़ो।",
    "Read the bar heights, since all four now share one unit.": "पट्टियों की ऊँचाई पढ़ो, चारों अब एक ही मात्रक में हैं।",
    "Write both measures in the same unit, then compare the numbers.": "दोनों माप समान मात्रक में लिखो, फिर संख्याओं की तुलना करो।",
    "Two measures are equal when they are the same in the same unit.": "समान मात्रक में एक जैसे हों, तो दो माप बराबर होते हैं।",
    "The flour is heavier by 145 g, found by taking the smaller from the larger.": "आटा 145 ग्राम भारी है, यह बड़े में से छोटा घटाकर मिला।",
    "Put every measure in the same unit, then order them up or down.": "हर माप समान मात्रक में लिखो, फिर आरोही या अवरोही क्रम में रखो।",
    "You learned: put both measures in one unit, then compare the numbers.": "तुमने सीखा: दोनों माप एक मात्रक में लिखकर संख्याओं की तुलना करो।",
    "You learned: two measures are equal when they match in one unit.": "तुमने सीखा: एक मात्रक में एक जैसे दो माप बराबर होते हैं।",
    "You learned: take the smaller from the larger, both in one unit.": "तुमने सीखा: एक मात्रक में बड़े में से छोटा घटाओ।",
    "You learned: put all in one unit, then order them up or down.": "तुमने सीखा: सबको एक मात्रक में लिखकर आरोही या अवरोही क्रम बनाओ।",
    "Which is heavier, 3 kg 90 g or 3,150 g?": "कौन भारी है, 3 किग्रा 90 ग्राम या 3,150 ग्राम?",
    "Which is heavier?": "कौन भारी है?",
    "Compare grams with grams, so look at the two bars.": "ग्राम की तुलना ग्राम से करो, दोनों पट्टियाँ देखो।",
    "3 kg is 3,000 g, so 3 kg 90 g is 3,000 g and 90 g more.": "3 किग्रा 3,000 ग्राम है, तो 3 किग्रा 90 ग्राम उससे 90 ग्राम अधिक है।",
    "Line up 3,090 and 3,150, then compare their hundreds.": "3,090 और 3,150 को एक के नीचे एक लिखो, फिर सैकड़े मिलाओ।",
    "Which is longer, 3 m 20 cm or 330 cm?": "कौन लंबा है, 3 मीटर 20 सेमी या 330 सेमी?",
    "Which is longer?": "कौन लंबा है?",
    "Write 3 m 20 cm in centimetres before you choose.": "चुनने से पहले 3 मीटर 20 सेमी को सेमी में लिखो।",
    "1 m is 100 cm, so 3 m is 300 cm.": "1 मीटर 100 सेमी है, तो 3 मीटर 300 सेमी है।",
    "3 m 20 cm is 320 cm, so set 320 beside 330.": "3 मीटर 20 सेमी 320 सेमी है, अब 320 को 330 के साथ रखो।",
    "Which is lighter, 4 kg 60 g or 4,600 g?": "कौन हल्का है, 4 किग्रा 60 ग्राम या 4,600 ग्राम?",
    "Which is lighter?": "कौन हल्का है?",
    "Lighter means less: how many grams are 4 kg 60 g?": "हल्का यानी कम: 4 किग्रा 60 ग्राम कितने ग्राम हैं?",
    "4 kg is 4,000 g, and 60 g more is 4,060 g.": "4 किग्रा 4,000 ग्राम है, और 60 ग्राम अधिक 4,060 ग्राम है।",
    "The 0 in 4,060 holds the hundreds, so compare 0 hundreds with 6.": "4,060 में 0 सैकड़े का स्थान रखता है, तो 0 सैकड़े की तुलना 6 से करो।",
    "Is 6 m 5 cm the same length as 605 cm?": "क्या 6 मीटर 5 सेमी, 605 सेमी के बराबर लंबा है?",
    "Same length?": "बराबर लंबाई?",
    "See whether the two bars stand level in centimetres.": "देखो, सेमी में दोनों पट्टियाँ बराबर ऊँची हैं या नहीं।",
    "6 m is 600 cm, and the 5 cm goes in the ones place.": "6 मीटर 600 सेमी है, और 5 सेमी इकाई के स्थान पर आता है।",
    "6 m 5 cm has no tens, so a zero holds the tens place.": "6 मीटर 5 सेमी में दहाई नहीं है, तो दहाई के स्थान पर शून्य आता है।",
    "Do 5 L 300 mL and 5,300 mL hold the same amount?": "क्या 5 लीटर 300 मिली और 5,300 मिली में बराबर मात्रा है?",
    "Same amount?": "बराबर मात्रा?",
    "Put both in millilitres and look at the tops of the bars.": "दोनों को मिली में लिखो और पट्टियों के सिरे देखो।",
    "1 L is 1,000 mL, so 5 L is 5,000 mL.": "1 लीटर 1,000 मिली है, तो 5 लीटर 5,000 मिली है।",
    "Add the 300 mL to 5,000 mL, then set it beside 5,300 mL.": "5,000 मिली में 300 मिली जोड़ो, फिर उसे 5,300 मिली के साथ रखो।",
    "Which of these is the same length as 3 km 50 m: 3,500 m, 3,050 m or 3,005 m?": "3 किमी 50 मीटर किसके बराबर है: 3,500 मीटर, 3,050 मीटर या 3,005 मीटर?",
    "Which is equal?": "कौन बराबर है?",
    "Write 3 km 50 m in metres, then find the card that matches it.": "3 किमी 50 मीटर को मीटर में लिखो, फिर उससे मिलता कार्ड ढूँढो।",
    "1 km is 1,000 m, so 3 km is 3,000 m.": "1 किमी 1,000 मीटर है, तो 3 किमी 3,000 मीटर है।",
    "50 m fills only the tens and the ones, so a zero holds the hundreds.": "50 मीटर सिर्फ़ दहाई और इकाई भरता है, तो सैकड़े पर शून्य आता है।",
    "A pot holds 2 L 640 mL, a kettle 2,475 mL: how much more does the bigger hold?": "पतीले में 2 लीटर 640 मिली, केतली में 2,475 मिली: बड़े में कितना अधिक आता है?",
    "How much more?": "कितना अधिक?",
    "Read only the part that sticks out past the shorter bar.": "छोटी पट्टी से बाहर निकला भाग ही पढ़ो।",
    "2 L 640 mL is 2,640 mL, so take 2,475 mL away from it.": "2 लीटर 640 मिली 2,640 मिली है, उसमें से 2,475 मिली घटाओ।",
    "Count on: 2,475 and 25 make 2,500, and 140 more make 2,640.": "आगे गिनो: 2,475 और 25 से 2,500, और 140 अधिक से 2,640 बनता है।",
    "The green ribbon is 1 m 85 cm, the red 164 cm: how much longer is the green?": "हरा रिबन 1 मीटर 85 सेमी है, लाल 164 सेमी: हरा कितना अधिक लंबा है?",
    "How much longer?": "कितना अधिक लंबा?",
    "Write 1 m 85 cm in centimetres before you take away.": "घटाने से पहले 1 मीटर 85 सेमी को सेमी में लिखो।",
    "1 m 85 cm is 185 cm, so take 164 cm from 185 cm.": "1 मीटर 85 सेमी 185 सेमी है, तो 185 सेमी में से 164 सेमी घटाओ।",
    "Count on from 164 cm: 6 more make 170 cm, and 15 more make 185 cm.": "164 सेमी से आगे गिनो: 6 और से 170 सेमी, 15 और से 185 सेमी।",
    "Flour weighs 5 kg 125 g and lentils weigh 4 kg 980 g: what is the difference?": "आटे का भार 5 किग्रा 125 ग्राम, दाल का 4 किग्रा 980 ग्राम: अंतर कितना है?",
    "The difference?": "अंतर कितना?",
    "Write both sacks in grams, then take the smaller away.": "दोनों बोरियों को ग्राम में लिखो, फिर छोटा घटाओ।",
    "5 kg 125 g is 5,125 g and 4 kg 980 g is 4,980 g.": "5 किग्रा 125 ग्राम 5,125 ग्राम है और 4 किग्रा 980 ग्राम 4,980 ग्राम है।",
    "From 4,980 g, 20 g more make 5,000 g, and 125 g more make 5,125 g.": "4,980 ग्राम में 20 ग्राम जोड़कर 5,000 ग्राम, फिर 125 ग्राम जोड़कर 5,125 ग्राम।",
    "Put the four weights in ascending order.": "चारों भारों को आरोही क्रम में रखो।",
    "Ascending order?": "आरोही क्रम?",
    "Look at the zeros: 4 g is a tiny part of a kilogram.": "शून्यों को देखो: 4 ग्राम एक किलोग्राम का बहुत छोटा भाग है।",
    "1 kg 4 g is 1,004 g, since zeros hold the hundreds and the tens.": "1 किग्रा 4 ग्राम 1,004 ग्राम है, सैकड़े और दहाई पर शून्य हैं।",
    "Compare 1,040 and 1,400 by their hundreds, then their tens.": "1,040 और 1,400 के पहले सैकड़े, फिर दहाई मिलाओ।",
    "What does descending order mean?": "अवरोही क्रम का क्या अर्थ है?",
    "Descending means?": "अवरोही यानी?",
    "Think of the word: to descend means to go down.": "शब्द पर सोचो: अवरोह का अर्थ है नीचे उतरना।",
    "Ascending climbs up from the shortest bar, and descending does the reverse.": "आरोही सबसे छोटी पट्टी से ऊपर चढ़ता है, अवरोही इसका उल्टा है।",
    "Start at the tallest bar and step down to the shortest.": "सबसे ऊँची पट्टी से शुरू करके सबसे छोटी तक नीचे उतरो।",
    "Now arrange these four capacities in descending order.": "अब इन चारों धारिताओं को अवरोही क्रम में रखो।",
    "Descending order?": "अवरोही क्रम?",
    "Write each card in millilitres, minding the zeros that hold places.": "हर कार्ड को मिली में लिखो, स्थान रखने वाले शून्यों का ध्यान रखो।",
    "3 L 75 mL is 3,075 mL, and 3 L 7 mL is 3,007 mL.": "3 लीटर 75 मिली 3,075 मिली है, और 3 लीटर 7 मिली 3,007 मिली है।",
    "Compare 3,570 and 3,705 by their hundreds first.": "3,570 और 3,705 के पहले सैकड़े मिलाओ।",
    "Yes, 3,150 g is heavier than 3,090 g.": "हाँ, 3,150 ग्राम, 3,090 ग्राम से भारी है।",
    "Yes, 330 cm is longer than 320 cm.": "हाँ, 330 सेमी, 320 सेमी से लंबा है।",
    "Yes, 605 cm and 6 m 5 cm stand exactly level.": "हाँ, 605 सेमी और 6 मीटर 5 सेमी बिल्कुल बराबर ऊँचे हैं।",
    "Yes, 5 L 300 mL is 5,300 mL, so they are equal.": "हाँ, 5 लीटर 300 मिली 5,300 मिली है, तो दोनों बराबर हैं।",
    "Yes, the pot holds 165 mL more than the kettle.": "हाँ, पतीले में केतली से 165 मिली अधिक आता है।",
    "Yes, the green ribbon is 21 cm longer.": "हाँ, हरा रिबन 21 सेमी अधिक लंबा है।",
    "Yes, they rise like steps from 1,004 g to 1,410 g.": "हाँ, वे 1,004 ग्राम से 1,410 ग्राम तक सीढ़ी जैसे चढ़ते हैं।",
    "Yes, descending goes from the largest down to the smallest.": "हाँ, अवरोही क्रम सबसे बड़े से सबसे छोटे तक जाता है।",
    "3 kg 90 g": "3 किग्रा 90 ग्राम", "3,150 g": "3,150 ग्राम", "3 m 20 cm": "3 मीटर 20 सेमी", "330 cm": "330 सेमी",
    "4 kg 60 g": "4 किग्रा 60 ग्राम", "4,600 g": "4,600 ग्राम", "Yes": "हाँ", "No": "नहीं",
    "3,500 m": "3,500 मीटर", "3,050 m": "3,050 मीटर", "3,005 m": "3,005 मीटर",
    "Largest to smallest": "बड़े से छोटा", "Smallest to largest": "छोटे से बड़ा",
    "kg": "किग्रा", "g": "ग्राम", "L": "लीटर", "mL": "मिली", "km": "किमी", "m": "मीटर", "cm": "सेमी",
    "Same unit": "समान मात्रक", "Take away": "घटाओ", "New cards": "नए कार्ड", "Taken away": "घटाया गया",
    "Ascending": "आरोही क्रम", "Descending": "अवरोही क्रम",
    "Pot": "पतीला", "Kettle": "केतली", "Green": "हरा", "Red": "लाल", "Flour": "आटा", "Lentils": "दाल", "Jug": "जग", "Bottle": "बोतल",
  },
  gu: {
    "Same-Unit Comparer": "સમાન એકમ સરખામણી",
    "Same unit first": "પહેલાં સમાન એકમ",
    "Equal measures": "સરખાં માપ",
    "By how much": "કેટલું વધારે",
    "Putting measures in order": "માપને ક્રમમાં ગોઠવવાં",
    "Some measure cards, each written its own way.": "થોડાં માપ કાર્ડ, દરેક પોતાની રીતે લખેલું.",
    "You put every measure in one unit before you compared.": "તમે સરખામણી પહેલાં દરેક માપ એક એકમમાં લખ્યું.",
    "Free play. Tap New cards, then stand them up side by side.": "મુક્ત રમત. નવાં કાર્ડ દબાવો, પછી તેમને બાજુ-બાજુમાં ઊભાં કરો.",
    "Is the bigger number always the bigger measure?": "શું મોટી સંખ્યા હંમેશાં મોટું માપ હોય?",
    "Same unit first. Which bar stands taller?": "પહેલાં સમાન એકમ. કઈ પટ્ટી ઊંચી છે?",
    "Same unit. Are they level?": "સમાન એકમ. શું તે સરખી ઊંચી છે?",
    "Lay the shorter one over. How much sticks out?": "નાની પટ્ટી ઉપર મૂકો. કેટલું બહાર રહે છે?",
    "Same unit first. Now smallest to largest.": "પહેલાં સમાન એકમ. હવે સૌથી નાનાથી સૌથી મોટું.",
    "Tap Same unit to write both weights in grams.": "બંને વજન ગ્રામમાં લખવા સમાન એકમ દબાવો.",
    "The Same unit key is at the bottom.": "સમાન એકમનું બટન નીચે છે.",
    "Tap Same unit to write both lengths in centimetres.": "બંને લંબાઈ સેમીમાં લખવા સમાન એકમ દબાવો.",
    "Find the Same unit key at the bottom.": "નીચે સમાન એકમનું બટન શોધો.",
    "Tap Same unit to write both amounts in millilitres.": "બંને માપ મિલિમાં લખવા સમાન એકમ દબાવો.",
    "Start with the Same unit key.": "સમાન એકમના બટનથી શરૂ કરો.",
    "Now tap Take away to lay the shorter bar over the longer one.": "હવે બાદ કરો દબાવો, નાની પટ્ટી મોટી પટ્ટી પર મુકાશે.",
    "The key at the bottom now says Take away.": "નીચેનું બટન હવે બાદ કરો કહે છે.",
    "Tap Same unit to write all four weights in grams.": "ચારેય વજન ગ્રામમાં લખવા સમાન એકમ દબાવો.",
    "Tap the Same unit key first.": "પહેલાં સમાન એકમનું બટન દબાવો.",
    "Now tap one bar to move it into the first place on the shelf.": "હવે કોઈ એક પટ્ટી દબાવો, તે છાજલી પર પહેલા સ્થાને જશે.",
    "Tap any one of the four bars.": "ચાર પટ્ટીમાંથી કોઈ એક દબાવો.",
    "Put both cards in the smaller unit before you compare them.": "સરખામણી પહેલાં બંને કાર્ડ નાના એકમમાં લખો.",
    "Now the two numbers share a unit, so compare them place by place.": "હવે બંને સંખ્યા એક એકમમાં છે, તેથી દરેક સ્થાન સરખાવો.",
    "Write the mixed card in the smaller unit, then hold it beside the other card.": "મિશ્ર કાર્ડને નાના એકમમાં લખો, પછી બીજા કાર્ડ સાથે સરખાવો.",
    "Equal measures stand exactly level once they share a unit.": "એક એકમમાં આવતાં સરખાં માપ બરાબર સરખી ઊંચાઈએ ઊભાં રહે છે.",
    "Lay the shorter bar over the longer and read what sticks out.": "નાની પટ્ટી મોટી પર મૂકો અને બહાર રહેલો ભાગ વાંચો.",
    "Take the smaller number from the larger one, both in the same unit.": "બંનેને એક એકમમાં લખી મોટી સંખ્યામાંથી નાની બાદ કરો.",
    "Order just two of the bars first, then fit in a third.": "પહેલાં ફક્ત બે પટ્ટીને ક્રમમાં મૂકો, પછી ત્રીજી ઉમેરો.",
    "Read the bar heights, since all four now share one unit.": "પટ્ટીઓની ઊંચાઈ વાંચો, ચારેય હવે એક જ એકમમાં છે.",
    "Write both measures in the same unit, then compare the numbers.": "બંને માપ સમાન એકમમાં લખો, પછી સંખ્યાઓ સરખાવો.",
    "Two measures are equal when they are the same in the same unit.": "સમાન એકમમાં એકસરખાં હોય, તો બે માપ સરખાં છે.",
    "The flour is heavier by 145 g, found by taking the smaller from the larger.": "લોટ 145 ગ્રામ ભારે છે, મોટામાંથી નાનું બાદ કરીને મળ્યું.",
    "Put every measure in the same unit, then order them up or down.": "દરેક માપ સમાન એકમમાં લખો, પછી ચડતા કે ઊતરતા ક્રમમાં ગોઠવો.",
    "You learned: put both measures in one unit, then compare the numbers.": "તમે શીખ્યા: બંને માપ એક એકમમાં લખી સંખ્યાઓ સરખાવો.",
    "You learned: two measures are equal when they match in one unit.": "તમે શીખ્યા: એક એકમમાં એકસરખાં બે માપ સરખાં હોય છે.",
    "You learned: take the smaller from the larger, both in one unit.": "તમે શીખ્યા: એક એકમમાં મોટામાંથી નાનું બાદ કરો.",
    "You learned: put all in one unit, then order them up or down.": "તમે શીખ્યા: બધાંને એક એકમમાં લખી ચડતો કે ઊતરતો ક્રમ બનાવો.",
    "Which is heavier, 3 kg 90 g or 3,150 g?": "કયું ભારે છે, 3 કિગ્રા 90 ગ્રામ કે 3,150 ગ્રામ?",
    "Which is heavier?": "કયું ભારે છે?",
    "Compare grams with grams, so look at the two bars.": "ગ્રામની સરખામણી ગ્રામ સાથે કરો, બંને પટ્ટી જુઓ.",
    "3 kg is 3,000 g, so 3 kg 90 g is 3,000 g and 90 g more.": "3 કિગ્રા એટલે 3,000 ગ્રામ, તેથી 3 કિગ્રા 90 ગ્રામ તેનાથી 90 ગ્રામ વધુ છે.",
    "Line up 3,090 and 3,150, then compare their hundreds.": "3,090 અને 3,150 એકની નીચે એક લખો, પછી શતક સરખાવો.",
    "Which is longer, 3 m 20 cm or 330 cm?": "કયું લાંબું છે, 3 મીટર 20 સેમી કે 330 સેમી?",
    "Which is longer?": "કયું લાંબું છે?",
    "Write 3 m 20 cm in centimetres before you choose.": "પસંદ કરતાં પહેલાં 3 મીટર 20 સેમીને સેમીમાં લખો.",
    "1 m is 100 cm, so 3 m is 300 cm.": "1 મીટર એટલે 100 સેમી, તેથી 3 મીટર એટલે 300 સેમી.",
    "3 m 20 cm is 320 cm, so set 320 beside 330.": "3 મીટર 20 સેમી એટલે 320 સેમી, હવે 320 ને 330 સાથે મૂકો.",
    "Which is lighter, 4 kg 60 g or 4,600 g?": "કયું હલકું છે, 4 કિગ્રા 60 ગ્રામ કે 4,600 ગ્રામ?",
    "Which is lighter?": "કયું હલકું છે?",
    "Lighter means less: how many grams are 4 kg 60 g?": "હલકું એટલે ઓછું: 4 કિગ્રા 60 ગ્રામ કેટલા ગ્રામ થાય?",
    "4 kg is 4,000 g, and 60 g more is 4,060 g.": "4 કિગ્રા એટલે 4,000 ગ્રામ, અને 60 ગ્રામ વધુ એટલે 4,060 ગ્રામ.",
    "The 0 in 4,060 holds the hundreds, so compare 0 hundreds with 6.": "4,060 માં 0 શતકનું સ્થાન સાચવે છે, તેથી 0 શતકને 6 સાથે સરખાવો.",
    "Is 6 m 5 cm the same length as 605 cm?": "શું 6 મીટર 5 સેમી, 605 સેમી જેટલું લાંબું છે?",
    "Same length?": "સરખી લંબાઈ?",
    "See whether the two bars stand level in centimetres.": "જુઓ, સેમીમાં બંને પટ્ટી સરખી ઊંચી છે કે નહીં.",
    "6 m is 600 cm, and the 5 cm goes in the ones place.": "6 મીટર એટલે 600 સેમી, અને 5 સેમી એકમના સ્થાને આવે છે.",
    "6 m 5 cm has no tens, so a zero holds the tens place.": "6 મીટર 5 સેમીમાં દશક નથી, તેથી દશકના સ્થાને શૂન્ય આવે છે.",
    "Do 5 L 300 mL and 5,300 mL hold the same amount?": "શું 5 લિટર 300 મિલિ અને 5,300 મિલિમાં સરખું માપ છે?",
    "Same amount?": "સરખું માપ?",
    "Put both in millilitres and look at the tops of the bars.": "બંનેને મિલિમાં લખો અને પટ્ટીઓની ટોચ જુઓ.",
    "1 L is 1,000 mL, so 5 L is 5,000 mL.": "1 લિટર એટલે 1,000 મિલિ, તેથી 5 લિટર એટલે 5,000 મિલિ.",
    "Add the 300 mL to 5,000 mL, then set it beside 5,300 mL.": "5,000 મિલિમાં 300 મિલિ ઉમેરો, પછી તેને 5,300 મિલિ સાથે મૂકો.",
    "Which of these is the same length as 3 km 50 m: 3,500 m, 3,050 m or 3,005 m?": "3 કિમી 50 મીટર કોના જેટલું છે: 3,500 મીટર, 3,050 મીટર કે 3,005 મીટર?",
    "Which is equal?": "કયું સરખું છે?",
    "Write 3 km 50 m in metres, then find the card that matches it.": "3 કિમી 50 મીટરને મીટરમાં લખો, પછી તેને મળતું કાર્ડ શોધો.",
    "1 km is 1,000 m, so 3 km is 3,000 m.": "1 કિમી એટલે 1,000 મીટર, તેથી 3 કિમી એટલે 3,000 મીટર.",
    "50 m fills only the tens and the ones, so a zero holds the hundreds.": "50 મીટર ફક્ત દશક અને એકમ ભરે છે, તેથી શતકમાં શૂન્ય આવે છે.",
    "A pot holds 2 L 640 mL, a kettle 2,475 mL: how much more does the bigger hold?": "તપેલીમાં 2 લિટર 640 મિલિ, કીટલીમાં 2,475 મિલિ: મોટામાં કેટલું વધારે સમાય?",
    "How much more?": "કેટલું વધારે?",
    "Read only the part that sticks out past the shorter bar.": "નાની પટ્ટીથી બહાર રહેલો ભાગ જ વાંચો.",
    "2 L 640 mL is 2,640 mL, so take 2,475 mL away from it.": "2 લિટર 640 મિલિ એટલે 2,640 મિલિ, તેમાંથી 2,475 મિલિ બાદ કરો.",
    "Count on: 2,475 and 25 make 2,500, and 140 more make 2,640.": "આગળ ગણો: 2,475 અને 25 થી 2,500, અને 140 વધુથી 2,640 થાય.",
    "The green ribbon is 1 m 85 cm, the red 164 cm: how much longer is the green?": "લીલી રિબન 1 મીટર 85 સેમી, લાલ 164 સેમી: લીલી કેટલી વધુ લાંબી છે?",
    "How much longer?": "કેટલી વધુ લાંબી?",
    "Write 1 m 85 cm in centimetres before you take away.": "બાદ કરતાં પહેલાં 1 મીટર 85 સેમીને સેમીમાં લખો.",
    "1 m 85 cm is 185 cm, so take 164 cm from 185 cm.": "1 મીટર 85 સેમી એટલે 185 સેમી, તેથી 185 સેમીમાંથી 164 સેમી બાદ કરો.",
    "Count on from 164 cm: 6 more make 170 cm, and 15 more make 185 cm.": "164 સેમીથી આગળ ગણો: 6 વધુથી 170 સેમી, 15 વધુથી 185 સેમી.",
    "Flour weighs 5 kg 125 g and lentils weigh 4 kg 980 g: what is the difference?": "લોટ 5 કિગ્રા 125 ગ્રામ, દાળ 4 કિગ્રા 980 ગ્રામ: બંનેનો તફાવત કેટલો?",
    "The difference?": "તફાવત કેટલો?",
    "Write both sacks in grams, then take the smaller away.": "બંને થેલીને ગ્રામમાં લખો, પછી નાનું બાદ કરો.",
    "5 kg 125 g is 5,125 g and 4 kg 980 g is 4,980 g.": "5 કિગ્રા 125 ગ્રામ એટલે 5,125 ગ્રામ, 4 કિગ્રા 980 ગ્રામ એટલે 4,980 ગ્રામ.",
    "From 4,980 g, 20 g more make 5,000 g, and 125 g more make 5,125 g.": "4,980 ગ્રામમાં 20 ગ્રામ ઉમેરતાં 5,000 ગ્રામ, પછી 125 ગ્રામ ઉમેરતાં 5,125 ગ્રામ.",
    "Put the four weights in ascending order.": "ચારેય વજનને ચડતા ક્રમમાં ગોઠવો.",
    "Ascending order?": "ચડતો ક્રમ?",
    "Look at the zeros: 4 g is a tiny part of a kilogram.": "શૂન્ય જુઓ: 4 ગ્રામ એક કિલોગ્રામનો બહુ નાનો ભાગ છે.",
    "1 kg 4 g is 1,004 g, since zeros hold the hundreds and the tens.": "1 કિગ્રા 4 ગ્રામ એટલે 1,004 ગ્રામ, શતક અને દશકમાં શૂન્ય છે.",
    "Compare 1,040 and 1,400 by their hundreds, then their tens.": "1,040 અને 1,400 ના પહેલાં શતક, પછી દશક સરખાવો.",
    "What does descending order mean?": "ઊતરતો ક્રમ એટલે શું?",
    "Descending means?": "ઊતરતો એટલે?",
    "Think of the word: to descend means to go down.": "શબ્દ વિશે વિચારો: ઊતરવું એટલે નીચે જવું.",
    "Ascending climbs up from the shortest bar, and descending does the reverse.": "ચડતો ક્રમ સૌથી નાની પટ્ટીથી ઉપર ચડે છે, ઊતરતો તેનાથી ઊલટો છે.",
    "Start at the tallest bar and step down to the shortest.": "સૌથી ઊંચી પટ્ટીથી શરૂ કરી સૌથી નાની સુધી નીચે ઊતરો.",
    "Now arrange these four capacities in descending order.": "હવે આ ચારેય ગુંજાશને ઊતરતા ક્રમમાં ગોઠવો.",
    "Descending order?": "ઊતરતો ક્રમ?",
    "Write each card in millilitres, minding the zeros that hold places.": "દરેક કાર્ડને મિલિમાં લખો, સ્થાન સાચવતા શૂન્યનું ધ્યાન રાખો.",
    "3 L 75 mL is 3,075 mL, and 3 L 7 mL is 3,007 mL.": "3 લિટર 75 મિલિ એટલે 3,075 મિલિ, અને 3 લિટર 7 મિલિ એટલે 3,007 મિલિ.",
    "Compare 3,570 and 3,705 by their hundreds first.": "3,570 અને 3,705 ના પહેલાં શતક સરખાવો.",
    "Yes, 3,150 g is heavier than 3,090 g.": "હા, 3,150 ગ્રામ, 3,090 ગ્રામ કરતાં ભારે છે.",
    "Yes, 330 cm is longer than 320 cm.": "હા, 330 સેમી, 320 સેમી કરતાં લાંબું છે.",
    "Yes, 605 cm and 6 m 5 cm stand exactly level.": "હા, 605 સેમી અને 6 મીટર 5 સેમી બરાબર સરખાં ઊંચાં છે.",
    "Yes, 5 L 300 mL is 5,300 mL, so they are equal.": "હા, 5 લિટર 300 મિલિ એટલે 5,300 મિલિ, તેથી બંને સરખાં છે.",
    "Yes, the pot holds 165 mL more than the kettle.": "હા, તપેલીમાં કીટલી કરતાં 165 મિલિ વધુ સમાય છે.",
    "Yes, the green ribbon is 21 cm longer.": "હા, લીલી રિબન 21 સેમી વધુ લાંબી છે.",
    "Yes, they rise like steps from 1,004 g to 1,410 g.": "હા, તે 1,004 ગ્રામથી 1,410 ગ્રામ સુધી પગથિયાંની જેમ ચડે છે.",
    "Yes, descending goes from the largest down to the smallest.": "હા, ઊતરતો ક્રમ સૌથી મોટાથી સૌથી નાના સુધી જાય છે.",
    "3 kg 90 g": "3 કિગ્રા 90 ગ્રામ", "3,150 g": "3,150 ગ્રામ", "3 m 20 cm": "3 મીટર 20 સેમી", "330 cm": "330 સેમી",
    "4 kg 60 g": "4 કિગ્રા 60 ગ્રામ", "4,600 g": "4,600 ગ્રામ", "Yes": "હા", "No": "ના",
    "3,500 m": "3,500 મીટર", "3,050 m": "3,050 મીટર", "3,005 m": "3,005 મીટર",
    "Largest to smallest": "મોટાથી નાનું", "Smallest to largest": "નાનાથી મોટું",
    "kg": "કિગ્રા", "g": "ગ્રામ", "L": "લિટર", "mL": "મિલિ", "km": "કિમી", "m": "મીટર", "cm": "સેમી",
    "Same unit": "સમાન એકમ", "Take away": "બાદ કરો", "New cards": "નવાં કાર્ડ", "Taken away": "બાદ કરેલું",
    "Ascending": "ચડતો ક્રમ", "Descending": "ઊતરતો ક્રમ",
    "Pot": "તપેલી", "Kettle": "કીટલી", "Green": "લીલી", "Red": "લાલ", "Flour": "લોટ", "Lentils": "દાળ", "Jug": "જગ", "Bottle": "બોટલ",
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
    concept: "Same unit first",
    conceptId: "M2.S3.T5.C20", objectiveIds: ["O7"],
    says: ["Same unit first. Which bar stands taller?"],
    /* one act: Same unit writes both cards in grams and stands them up as bars */
    steps: [{ say: "Tap Same unit to write both weights in grams.", on: "same", hint: "The Same unit key is at the bottom." }],
    /* the warm-up the step works on (never question 1's own cards): 1,070 g stands shorter than 1,200 g */
    warm: { u: "g", cards: [{ id: "w1", b: 1, s: 70 }, { id: "w2", v: 1200 }] },
    /* tries, as the plan writes it: First rung: rewrite only the mixed card in the smaller unit. Second rung: compare two numbers now in one unit. Third rung: the same task on two lengths, before the question's own weights return.
       (each question carries its own rungs below; these are the phase's fallback) */
    ladder: ["Put both cards in the smaller unit before you compare them.", "Now the two numbers share a unit, so compare them place by place."],
    closing: "Write both measures in the same unit, then compare the numbers.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: put both measures in one unit, then compare the numbers.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "Both cards are written in the smaller unit and stand up as bars, the mixed card lit amber, and the sign between the bars shows which is more.",
    items: [
      /* learn CM1: answer in the plan = 3150 g. */
      { qid: "M2.S3.T5.C20:CM1", kind: "cmp", u: "g", want: "more", cards: [{ id: "c1", b: 3, s: 90 }, { id: "c2", v: 3150 }],
        choices: [{ id: "c1", label: "3 kg 90 g" }, { id: "c2", label: "3,150 g" }], answer: "c2", near: "c1",
        plan: "Which is heavier, 3 kg 90 g or 3150 g?",
        say: "Which is heavier, 3 kg 90 g or 3,150 g?", ask: "Which is heavier?",
        miss: "Compare grams with grams, so look at the two bars.",
        ladder: ["3 kg is 3,000 g, so 3 kg 90 g is 3,000 g and 90 g more.", "Line up 3,090 and 3,150, then compare their hundreds."] },
      /* practice 1: answer in the plan = 330 cm, because 3 m 20 cm is 320 cm */
      { qid: "M2.S3.T5.C20:1", kind: "cmp", u: "cm", want: "more", cards: [{ id: "c1", b: 3, s: 20 }, { id: "c2", v: 330 }],
        choices: [{ id: "c1", label: "3 m 20 cm" }, { id: "c2", label: "330 cm" }], answer: "c2", near: "c1",
        plan: "Which is longer, 3 m 20 cm or 330 cm?",
        say: "Which is longer, 3 m 20 cm or 330 cm?", ask: "Which is longer?",
        miss: "Write 3 m 20 cm in centimetres before you choose.",
        ladder: ["1 m is 100 cm, so 3 m is 300 cm.", "3 m 20 cm is 320 cm, so set 320 beside 330."] },
      /* practice 5: answer in the plan = 4 kg 60 g, because it is 4060 g */
      /* noKey: no Same unit key, the child converts in their head (the correction still writes it after a miss) */
      { qid: "M2.S3.T5.C20:5", kind: "cmp", u: "g", want: "less", noKey: true, cards: [{ id: "c1", b: 4, s: 60 }, { id: "c2", v: 4600 }],
        choices: [{ id: "c1", label: "4 kg 60 g" }, { id: "c2", label: "4,600 g" }], answer: "c1", near: "c2",
        plan: "Which is lighter, 4 kg 60 g or 4600 g?",
        say: "Which is lighter, 4 kg 60 g or 4,600 g?", ask: "Which is lighter?",
        miss: "Lighter means less: how many grams are 4 kg 60 g?",
        ladder: ["4 kg is 4,000 g, and 60 g more is 4,060 g.", "The 0 in 4,060 holds the hundreds, so compare 0 hundreds with 6."] },
    ],
  },
  {
    n: 2,
    concept: "Equal measures",
    conceptId: "M2.S3.T5.C21", objectiveIds: ["O7"],
    says: ["Same unit. Are they level?"],
    /* one act: Same unit writes both cards in the smaller unit and stands them up as bars */
    steps: [{ say: "Tap Same unit to write both lengths in centimetres.", on: "same", hint: "Find the Same unit key at the bottom." }],
    /* the warm-up: 2 m 40 cm and 240 cm stand level */
    warm: { u: "cm", cards: [{ id: "w1", b: 2, s: 40 }, { id: "w2", v: 240 }] },
    /* tries, as the plan writes it: First rung: rewrite the mixed card in centimetres. Second rung: compare it with the other card. Third rung: the same task with a whole number of metres, before the question's own cards return.
       (each question carries its own rungs below; these are the phase's fallback) */
    ladder: ["Write the mixed card in the smaller unit, then hold it beside the other card.", "Equal measures stand exactly level once they share a unit."],
    closing: "Two measures are equal when they are the same in the same unit.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: two measures are equal when they match in one unit.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "Every card is written in the smaller unit and stands up as a bar; the equal bars stand level, joined by the equals sign or a level line.",
    items: [
      /* learn CM2: answer in the plan = Yes. They are the same length. */
      { qid: "M2.S3.T5.C21:CM2", kind: "same", u: "cm", cards: [{ id: "c1", b: 6, s: 5 }, { id: "c2", v: 605 }],
        choices: [{ id: "yes", label: "Yes" }, { id: "no", label: "No" }], answer: "yes", near: "no",
        plan: "Is 6 m 5 cm the same length as 605 cm?",
        say: "Is 6 m 5 cm the same length as 605 cm?", ask: "Same length?",
        miss: "See whether the two bars stand level in centimetres.",
        ladder: ["6 m is 600 cm, and the 5 cm goes in the ones place.", "6 m 5 cm has no tens, so a zero holds the tens place."] },
      /* practice 2: answer in the plan = Yes. 5 L 300 mL is 5300 mL */
      { qid: "M2.S3.T5.C21:2", kind: "same", u: "mL", cards: [{ id: "c1", b: 5, s: 300 }, { id: "c2", v: 5300 }],
        choices: [{ id: "yes", label: "Yes" }, { id: "no", label: "No" }], answer: "yes", near: "no",
        plan: "Do 5 L 300 mL and 5300 mL hold the same amount?",
        say: "Do 5 L 300 mL and 5,300 mL hold the same amount?", ask: "Same amount?",
        miss: "Put both in millilitres and look at the tops of the bars.",
        ladder: ["1 L is 1,000 mL, so 5 L is 5,000 mL.", "Add the 300 mL to 5,000 mL, then set it beside 5,300 mL."] },
      /* practice 6: answer in the plan = 3050 m */
      /* noKey: no Same unit key, the child converts in their head (the correction still writes it after a miss) */
      { qid: "M2.S3.T5.C21:6", kind: "pick", u: "m", noKey: true, cards: [{ id: "c1", b: 3, s: 50 }, { id: "o1", v: 3500 }, { id: "o2", v: 3050 }, { id: "o3", v: 3005 }],
        choices: [{ id: "o1", label: "3,500 m" }, { id: "o2", label: "3,050 m" }, { id: "o3", label: "3,005 m" }], answer: "o2", near: "o1",
        plan: "Which of these is the same length as 3 km 50 m: 3500 m, 3050 m or 3005 m?",
        say: "Which of these is the same length as 3 km 50 m: 3,500 m, 3,050 m or 3,005 m?", ask: "Which is equal?",
        miss: "Write 3 km 50 m in metres, then find the card that matches it.",
        ladder: ["1 km is 1,000 m, so 3 km is 3,000 m.", "50 m fills only the tens and the ones, so a zero holds the hundreds."] },
    ],
  },
  {
    n: 3,
    concept: "By how much",
    conceptId: "M2.S3.T5.C22", objectiveIds: ["O8"],
    says: ["Lay the shorter one over. How much sticks out?"],
    /* two acts on the one key: Same unit, then Take away (the shorter bar laid over the longer) */
    steps: [{ say: "Tap Same unit to write both amounts in millilitres.", on: "same", hint: "Start with the Same unit key." },
            { say: "Now tap Take away to lay the shorter bar over the longer one.", on: "take", hint: "The key at the bottom now says Take away." }],
    /* the warm-up, the textbook's own: the bottle holds 1,450 mL, the jug 1 L 380 mL, so 70 mL sticks out */
    warm: { u: "mL", cards: [{ id: "w1", b: 1, s: 380, name: "Jug" }, { id: "w2", v: 1450, name: "Bottle" }] },
    /* tries, as the plan writes it: First rung: put both cards in millilitres. Second rung: lay the shorter bar over the longer and read what sticks out. Third rung: the same task on two capacities in whole litres, before the question's own cards return.
       (each question carries its own rungs below; these are the phase's fallback) */
    ladder: ["Lay the shorter bar over the longer and read what sticks out.", "Take the smaller number from the larger one, both in the same unit."],
    /* shown in place of the last question's win line (keyOnly), so it names which sack is heavier */
    closing: "The flour is heavier by 145 g, found by taking the smaller from the larger.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: take the smaller from the larger, both in one unit.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "Both cards go into the smaller unit, the shorter bar is laid over the longer, and the part that sticks out is labelled with the difference.",
    items: [
      /* learn CM3: answer in the plan = The pot holds 165 mL more.
         plan question: A pot holds 2 L 640 mL and a kettle holds 2475 mL. Which holds more, and by how much?
         (one answer box takes only the difference: the bars show which holds more, the win line names it) */
      { qid: "M2.S3.T5.C22:CM3", kind: "diff", u: "mL", cards: [{ id: "c1", b: 2, s: 640, name: "Pot" }, { id: "c2", v: 2475, name: "Kettle" }],
        parts: [{ label: "mL" }], answer: [165], near: [1835],
        plan: "A pot holds 2 L 640 mL and a kettle holds 2475 mL. Which holds more, and by how much?",
        say: "A pot holds 2 L 640 mL, a kettle 2,475 mL: how much more does the bigger hold?", ask: "How much more?",
        miss: "Read only the part that sticks out past the shorter bar.",
        ladder: ["2 L 640 mL is 2,640 mL, so take 2,475 mL away from it.", "Count on: 2,475 and 25 make 2,500, and 140 more make 2,640."] },
      /* practice 4: answer in the plan = 21 cm longer, because 1 m 85 cm is 185 cm and 185 - 164 = 21
         plan question: A green ribbon is 1 m 85 cm long and a red ribbon is 164 cm long. How much longer is the green ribbon? */
      { qid: "M2.S3.T5.C22:4", kind: "diff", u: "cm", cards: [{ id: "c1", b: 1, s: 85, name: "Green" }, { id: "c2", v: 164, name: "Red" }],
        parts: [{ label: "cm" }], answer: [21], near: [79],
        plan: "A green ribbon is 1 m 85 cm long and a red ribbon is 164 cm long. How much longer is the green ribbon?",
        say: "The green ribbon is 1 m 85 cm, the red 164 cm: how much longer is the green?", ask: "How much longer?",
        miss: "Write 1 m 85 cm in centimetres before you take away.",
        ladder: ["1 m 85 cm is 185 cm, so take 164 cm from 185 cm.", "Count on from 164 cm: 6 more make 170 cm, and 15 more make 185 cm."] },
      /* practice 7: answer in the plan = The flour, by 145 g, because 5125 - 4980 = 145
         plan question: A sack of flour weighs 5 kg 125 g and a sack of lentils weighs 4 kg 980 g. Which is heavier, and by how much? */
      { qid: "M2.S3.T5.C22:7", kind: "diff", u: "g", cards: [{ id: "c1", b: 5, s: 125, name: "Flour" }, { id: "c2", b: 4, s: 980, name: "Lentils" }],
        parts: [{ label: "g" }], answer: [145], near: [855],
        plan: "A sack of flour weighs 5 kg 125 g and a sack of lentils weighs 4 kg 980 g. Which is heavier, and by how much?",
        say: "Flour weighs 5 kg 125 g and lentils weigh 4 kg 980 g: what is the difference?", ask: "The difference?",
        miss: "Write both sacks in grams, then take the smaller away.",
        ladder: ["5 kg 125 g is 5,125 g and 4 kg 980 g is 4,980 g.", "From 4,980 g, 20 g more make 5,000 g, and 125 g more make 5,125 g."] },
    ],
  },
  {
    n: 4,
    concept: "Putting measures in order",
    conceptId: "M2.S3.T5.C23", objectiveIds: ["O8"],
    says: ["Same unit first. Now smallest to largest."],
    /* two acts on the warm-up: Same unit stands the four up on the shelf, then one tap shows how a bar moves into a place */
    steps: [{ say: "Tap Same unit to write all four weights in grams.", on: "same", hint: "Tap the Same unit key first." },
            { say: "Now tap one bar to move it into the first place on the shelf.", on: "place", hint: "Tap any one of the four bars." }],
    /* the warm-up, the textbook's own four: 3 kg 80 g, 3,250 g, 3 kg 800 g, 3,008 g */
    warm: { u: "g", cards: [{ id: "w1", b: 3, s: 80 }, { id: "w2", v: 3250 }, { id: "w3", b: 3, s: 800 }, { id: "w4", v: 3008 }] },
    /* tries, as the plan writes it: First rung: order just two of the cards. Second rung: add a third. Third rung: the same task with all four already in grams, before the question's own cards return.
       (each question carries its own rungs below; these are the phase's fallback) */
    ladder: ["Order just two of the bars first, then fit in a third.", "Read the bar heights, since all four now share one unit."],
    closing: "Put every measure in the same unit, then order them up or down.",
    /* the summary page's row: "You learned: ..." in at most 72 characters */
    learned: "You learned: put all in one unit, then order them up or down.",
    /* the traceback for a miss, in one line (it goes into the sidecar) */
    traceback: "Every card goes into the smaller unit, the bars out of place are lit amber, and each bar is numbered with its right place under the order's name.",
    items: [
      /* learn CM4: answer in the plan = 1 kg 4 g, 1040 g, 1 kg 400 g, 1410 g.
         plan question: Put these weights in ascending order: 1 kg 400 g, 1040 g, 1 kg 4 g, 1410 g. */
      { qid: "M2.S3.T5.C23:CM4", kind: "order", dir: "up", u: "g", pad: "enter",
        cards: [{ id: "c1", b: 1, s: 400 }, { id: "c2", v: 1040 }, { id: "c3", b: 1, s: 4 }, { id: "c4", v: 1410 }],
        answer: "c3,c2,c1,c4", near: "c2,c1,c4,c3",
        plan: "Put these weights in ascending order: 1 kg 400 g, 1040 g, 1 kg 4 g, 1410 g.",
        say: "Put the four weights in ascending order.", ask: "Ascending order?",
        miss: "Look at the zeros: 4 g is a tiny part of a kilogram.",
        ladder: ["1 kg 4 g is 1,004 g, since zeros hold the hundreds and the tens.", "Compare 1,040 and 1,400 by their hundreds, then their tens."] },
      /* practice 3: answer in the plan = From largest to smallest
         (the picture: the four bars of the first question, standing in ascending order) */
      { qid: "M2.S3.T5.C23:3", kind: "word", u: "g", pre: true,
        cards: [{ id: "c3", b: 1, s: 4 }, { id: "c2", v: 1040 }, { id: "c1", b: 1, s: 400 }, { id: "c4", v: 1410 }],
        choices: [{ id: "lg", label: "Largest to smallest" }, { id: "sm", label: "Smallest to largest" }], answer: "lg", near: "sm",
        plan: "What does descending order mean?",
        say: "What does descending order mean?", ask: "Descending means?",
        miss: "Think of the word: to descend means to go down.",
        ladder: ["Ascending climbs up from the shortest bar, and descending does the reverse.", "Start at the tallest bar and step down to the shortest."] },
      /* practice 8: answer in the plan = 3705 mL, 3570 mL, 3 L 75 mL, 3 L 7 mL
         plan question: Put these in descending order: 3 L 75 mL, 3570 mL, 3 L 7 mL, 3705 mL. */
      { qid: "M2.S3.T5.C23:8", kind: "order", dir: "down", u: "mL", pad: "enter",
        cards: [{ id: "c1", b: 3, s: 75 }, { id: "c2", v: 3570 }, { id: "c3", b: 3, s: 7 }, { id: "c4", v: 3705 }],
        answer: "c4,c2,c1,c3", near: "c3,c1,c2,c4",
        plan: "Put these in descending order: 3 L 75 mL, 3570 mL, 3 L 7 mL, 3705 mL.",
        say: "Now arrange these four capacities in descending order.", ask: "Descending order?",
        miss: "Write each card in millilitres, minding the zeros that hold places.",
        ladder: ["3 L 75 mL is 3,075 mL, and 3 L 7 mL is 3,007 mL.", "Compare 3,570 and 3,705 by their hundreds first."] },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
/* a string's width in ems at weight 700, never under the real width (measured in the page 2026-10-18: "3,500 मीटर" 5.38,
   "मीटर" 2.32, "ग्राम" 1.96; Gujarati runs narrower than Devanagari, so it shares the Devanagari numbers). A Latin-only string keeps
   0.6 a character, as the English layouts always had; in a Hindi or Gujarati string a space or comma is 0.3, the vowel sign ि 0.6,
   ी 0.52, े ै 0.25, ा and the other spacing signs 0.3, a virama -0.14 (the half form is narrower), the other marks nothing */
const mcW = (s: string) => {
  const cs = [...String(s)], ind = cs.some((c) => /[ऀ-ॿ઀-૿]/.test(c));
  return cs.reduce((w, c) => w + (!ind ? 0.6 : /[\s,.]/.test(c) ? 0.3
    : /[्્]/.test(c) ? -0.14
    : /[िિ]/.test(c) ? 0.6 : /[ीી]/.test(c) ? 0.52 : /[ेैેૈ]/.test(c) ? 0.25
    : /[ःऻाॉ-ौॎॏઃાૉોૌ]/.test(c) ? 0.3
    : /[ऀ-ंऺ़ु-ै॑-ॗॢॣઁં઼ુ-ૈૢૣ]/.test(c) ? 0
    : /[ऀ-ॿ઀-૿]/.test(c) ? 0.62 : 0.6), 0);   /* a letter 0.62 ("लीटर" is 2.39) */
};
/* the base the bars stand on: the largest round number (a multiple of the power of ten under the spread) that keeps the
   shortest bar at least a quarter of the tallest; equal measures keep the whole big units under them */
const mcBase = (vs: number[], k: number) => {
  const lo = Math.min(...vs), hi = Math.max(...vs);
  if (hi === lo) return Math.floor(lo / k) * k;
  const bmax = (lo - 0.25 * hi) / 0.75, step = Math.pow(10, Math.floor(Math.log10(hi - lo)));
  return bmax <= 0 ? 0 : Math.floor(bmax / step) * step;
};
/* the slot shows a chosen measure by its label, never its id (format is not told the question: Work sets MC_NOW) */
let MC_NOW: any = null;
const mcFormat = (v: any, j: any) => {
  const ch = j === undefined && MC_NOW && MC_NOW.choices ? MC_NOW.choices.find((c: any) => c.id === String(v)) : null;
  return ch ? ch.label : v;
};
/* the unit pairs: a card is { b, s } (b of the big unit and s of the small one: 3 kg 90 g) or { v } (v of the small unit: 3,150 g) */
const MC_U: any = {
  g: { big: "kg", small: "g", k: 1000 },
  cm: { big: "m", small: "cm", k: 100 },
  mL: { big: "L", small: "mL", k: 1000 },
  m: { big: "km", small: "m", k: 1000 },
};
/* the chapter's content colours as ink (4.5:1 on white): given deep blue, the same measure green, taken away rose,
   the unit fact violet, a zero holding a place open grey */
const MC_BLUE_INK = shade(CONTENT.hundred, 0.25), MC_GREEN_INK = shade(CONTENT.one, 0.3), MC_ROSE_INK = shade(CONTENT.bead, 0.45);
const MC_VIOLET = "#6A4C9C", MC_GREY = "#767676", MC_BAR_EDGE = "#7A5A1E";
/* free play: pairs to stand up side by side (New cards steps through them) */
const MC_FREE = [
  { u: "g", cards: [{ id: "f1", b: 2, s: 50 }, { id: "f2", v: 2500 }] },
  { u: "cm", cards: [{ id: "f1", b: 1, s: 9 }, { id: "f2", v: 190 }] },
  { u: "mL", cards: [{ id: "f1", b: 4, s: 400 }, { id: "f2", v: 4040 }] },
  { u: "m", cards: [{ id: "f1", b: 2, s: 5 }, { id: "f2", v: 2050 }] },
];
const MODEL = { units: MC_U, free: MC_FREE, scale: "bars stand on one baseline that starts at the whole big units below the smallest measure (a break mark shows it)" };
/* a card's measure in the small unit */
const mcVal = (u: string, c: any) => (c.v !== undefined ? c.v : c.b * MC_U[u].k + c.s);
/* a card as the question wrote it, in pieces (a mixed measure is two pieces, so a narrow card can stack them) */
const mcGiven = (u: string, c: any, tx: any = (v: any) => v) => (c.v !== undefined ? [indian(c.v) + " " + tx(MC_U[u].small)]
  : [c.b + " " + tx(MC_U[u].big), c.s + " " + tx(MC_U[u].small)]);
/* the same measure in the small unit, digit by digit: a zero that holds a place open in a rewritten mixed measure is `ph` (grey) */
const mcDigits = (u: string, c: any) => {
  const U = MC_U[u], one = (d: string) => ({ d, ph: false });
  const ds = c.v !== undefined ? String(c.v).split("").map(one)
    : [...String(c.b).split("").map(one), ...Array.from({ length: String(U.k).length - 1 - String(c.s).length }, () => ({ d: "0", ph: true })), ...String(c.s).split("").map(one)];
  const out: any[] = [];
  ds.forEach((x: any, i: number) => { const r = ds.length - i - 1; out.push(x); if (r === 3 || (r > 3 && (r - 3) % 2 === 0)) out.push({ d: ",", ph: false }); });
  return out;
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* an order answer as a list of card ids, from "c3,c2,c1,c4", "c3|c2|..." or an array */
const mcIds = (v: any) => (Array.isArray(v) ? v.map(String) : String(v ?? "").split(/[\s,|]+/).filter(Boolean));
/* judge: is this value right for this item? */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (item.kind === "order") return mcIds(v).join(",") === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived from the PLAN's own question text, by its own parser (no card data, no judge) */
const ORC_F: any = { kg: 1000, g: 1, L: 1000, mL: 1, km: 100000, m: 100, cm: 1 };
const orcMeasures = (s: string) => {
  const re = /(\d[\d,]*)\s*(kg|km|cm|mL|g|m|L)\b(?:\s+(\d[\d,]*)\s*(g|cm|mL|m)\b)?/g, out: number[] = [];
  let m: any;
  while ((m = re.exec(s))) out.push(Number(m[1].replace(/,/g, "")) * ORC_F[m[2]] + (m[3] ? Number(m[3].replace(/,/g, "")) * ORC_F[m[4]] : 0));
  return out;
};
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const ms = orcMeasures(it.plan || "");
  if (it.kind === "cmp") {
    const big = /heavier|longer|more/.test(it.plan), want = big ? Math.max(...ms) : Math.min(...ms);
    return ms.length === 2 && it.answer === "c" + (ms.indexOf(want) + 1);
  }
  if (it.kind === "same") return ms.length === 2 && it.answer === (ms[0] === ms[1] ? "yes" : "no");
  if (it.kind === "pick") return ms.length === 4 && ms.slice(1).filter((x) => x === ms[0]).length === 1 && it.answer === "o" + (ms.slice(1).indexOf(ms[0]) + 1);
  if (it.kind === "diff") return ms.length === 2 && Math.abs(ms[0] - ms[1]) / ORC_F[it.parts[0].label] === it.answer[0];
  if (it.kind === "order") {
    const up = /ascending/.test(it.plan), idx = ms.map((x, i) => i).sort((a, b) => (up ? ms[a] - ms[b] : ms[b] - ms[a]));
    return ms.length === 4 && idx.map((i) => "c" + (i + 1)).join(",") === it.answer;
  }
  if (it.kind === "word") return /descending/.test(it.plan) && /^largest/i.test((it.choices.find((c: any) => c.id === it.answer) || {}).label || "");
  return false;
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => (item.parts ? String(item.near[0]) : item.near);
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : item.kind === "order" ? [item.answer, mcIds(item.answer).map((id) => mcGiven(item.u, item.cards.find((c: any) => c.id === id)).join(" ")).join(", ")]
  : item.kind === "word" ? [item.answer, "largest to smallest"]
  : [String(item.answer)]);
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
  const tl = useTimeline();   /* the traceback */
  const tw = useTimeline();   /* the win's rolling ball */
  const free = stage === "free";
  /* a restart (or a phase dot) brings the phase's first guide step back: a new generation, so its picture starts afresh
     (counted in render, never in an effect: a late effect would wipe an act the agent already did) */
  /* a phase opens on stage "teach" for a frame before "demo" (PATTERNS §18): both are the warm-up's, one generation */
  const pre = stage === "demo" || stage === "teach";
  const gen = useRef<any>({ pre: false, step: null, n: 0 });
  if (pre && !step && (!gen.current.pre || gen.current.step)) gen.current.n++;
  gen.current.pre = pre; gen.current.step = step;
  /* the guide steps work the phase's own WARM-UP cards (phase.warm), never question 1's: when the stage turns demo -> ask
     the key changes, so question 1 opens afresh like the others */
  const warm = !free && pre && phase.warm;
  /* every ENTRY of a question is a new board: Q2 -> Q3 (untouched) -> Q2 must not find Q2's old bars or correction, so the key
     carries an entry count bumped (in render) whenever the question shown changes */
  const ent = useRef<any>({ key: "", n: 0 });
  const entKey = free ? "free" : n + "." + (warm ? "w" : index);
  if (ent.current.key !== entKey) { ent.current.key = entKey; ent.current.n++; }
  const qk = entKey + "." + gen.current.n + "." + ent.current.n;
  if (!free) MC_NOW = item;
  /* free play: `item` is the last question of the last phase, so nothing below reads it there (PATTERNS §13) */
  const kind = free ? "free" : item.kind;
  const fresh = (q: string) => ({ q, fi: 0, shown: 0, conv: !free && !!item.pre, taken: false });
  const [raw, setRaw] = useState<any>(() => fresh(qk));
  const st = raw.q === qk ? raw : fresh(qk);
  const put = (patch: any) => setRaw((o: any) => ({ ...(o.q === qk ? o : fresh(qk)), ...patch }));
  const [tbRaw, setTb] = useState<any>(null);
  const tb = tbRaw && tbRaw.q === qk ? tbRaw : null;
  const [ballRaw, setBall] = useState<any>(null);
  const ball = ballRaw && ballRaw.q === qk ? ballRaw.i : -1;
  const [, bump] = useState(0);
  const Q = free ? MC_FREE[st.fi % MC_FREE.length] : warm ? phase.warm : item;
  const u = Q.u, U = MC_U[u], cards = Q.cards, N = cards.length;
  /* the shelf order of an ordering question (a ref, so the agent's answer() and the Enter after it read the same thing) */
  const ord = useRef<any>({ q: "" });
  if (ord.current.q !== qk + "/" + st.fi) ord.current = { q: qk + "/" + st.fi, pos: cards.map((c: any) => c.id), k: 0, dirty: false };

  /* the numbers: each card in the small unit; the bars start at a round base under the smallest card (mcBase) */
  const vals: any = {};
  cards.forEach((c: any) => { vals[c.id] = mcVal(u, c); });
  const vs = cards.map((c: any) => vals[c.id]);
  const hi = Math.max(...vs), base = mcBase(vs, U.k);
  const win = stage === "win" || stage === "idle";
  const showAns = win || !!(tb && tb.show);
  /* the sign and the difference are printed once known: the answer shown, free play, or a warm-up's own cards */
  const open = showAns || free || !!warm;
  const conv = st.conv;

  /* the layout, from the room there is (box.w eases while the answer panel slides; nothing under the key's corner) */
  const bw0 = box ? box.w : 1472;
  const kx = box && box.key ? box.key.x - 12 : bw0;
  /* a question answered on the keypad (a choice or a typed difference) is laid out from the width the area has with the
     keypad OPEN, so nothing moves when the child taps Answer; an ordering question (no keypad) and free play take it all */
  const R = !free && kind !== "order" ? Math.min(bw0, kx, BOARD_OPEN_W_BIG) : Math.min(bw0, kx);
  /* the axis needs only a narrow margin (its base label stands on one line under the shelf's left end), so the cards and
     bars take the rest of the width */
  const AX = 40, colW = (R - AX) / N;
  const cw = Math.min(330, colW - 10), ch = 110, barW = Math.min(150, colW * 0.55);
  const Y = { lab: 166, top: 190, base: 410, key: 438, cap: 508, foot: 460 };
  /* an ordering question keeps room above its tallest bar for the win's ball, clear of the green labels */
  const H = Y.base - Y.top - (kind === "order" ? 30 : 0);
  const hOf = (v: number) => (hi === base ? H : Math.max(6, ((v - base) / (hi - base)) * H));
  const ansIds = kind === "order" ? mcIds(item.answer) : [];
  /* at the win the bars stand in their right order, so they rise (or fall) like steps */
  const pos: string[] = kind === "order" ? (win ? ansIds : ord.current.pos)
    : kind === "word" && showAns ? cards.map((c: any) => c.id).reverse() : cards.map((c: any) => c.id);
  const cx = (id: string) => AX + colW * (pos.indexOf(id) + 0.5);
  const labOn = (id: string) => conv || pos.indexOf(id) < st.shown;
  const [ida, idb] = [cards[0].id, cards[N - 1].id];
  const longId = vals[ida] >= vals[idb] ? ida : idb, shortId = longId === ida ? idb : ida;

  /* ── the acts, each performed on screen (api.act) and reported (api.did) ── */
  const busy = useRef(false);
  const lastKey = useRef(0);
  const live = useRef<any>({});
  live.current = { stage };
  const doSame = () => {
    if (st.conv || busy.current) return;
    busy.current = true;
    const ids = pos.slice();
    /* a pencil writes each card's same measure above its bar, one after another; each bar stands up as it is written */
    api.act({ tool: "pencil", moves: "draw", at: ids.map((id) => ({ x: cx(id), y: Y.lab - 14 })), onPoint: (i: number) => put({ shown: i + 1 }) })
      .then((ok: any) => {
        busy.current = false;
        if (!ok) return;
        put({ conv: true, shown: N });
        api.sfx.settle();
        if (live.current.stage === "demo") api.did("same");
      });
  };
  const doTake = () => {
    if (!st.conv || st.taken || busy.current || N !== 2) return;
    busy.current = true;
    const hS = hOf(vals[shortId]);
    /* the hand lays a copy of the shorter bar over the longer one */
    api.act({ tool: "hand", moves: "push", from: { x: cx(shortId), y: Y.base - hS / 2 }, at: [{ x: cx(longId), y: Y.base - hS / 2 }],
      hold: <rect x={-barW / 2} y={-hS / 2} width={barW} height={hS} rx={8} fill={CONTENT.bead} fillOpacity={0.8} stroke={MC_ROSE_INK} strokeWidth={2} /> })
      .then((ok: any) => {
        busy.current = false;
        if (!ok) return;
        put({ taken: true });
        api.sfx.trade();
        if (live.current.stage === "demo") api.did("take");
      });
  };
  const act = (on: any) => {
    if (on === "same") doSame();
    else if (on === "take") doTake();
    else if (on === "new") { if (!busy.current) { put({ fi: st.fi + 1, shown: 0, conv: false, taken: false }); api.sfx.tick(); } }
    else if (on === "place" && conv) { const o = ord.current; tapBar(o.pos.slice(o.k).sort((a: string, b: string) => vals[a] - vals[b])[0]); }
  };
  /* ONE key whose label follows the act (Same unit, then Take away): a double tap never presses the next label too */
  const pressKey = (on: any) => {
    const t = Date.now();
    if (t - lastKey.current < 400 || tl.busy) return;
    lastKey.current = t;
    act(on);
  };
  HOOK.demo = () => (stepOn ? act(stepOn) : undefined);

  /* ── ordering: a tap puts that bar in the next place from the left; a tap on a placed bar takes it and the later ones back ── */
  const placeStep = stage === "demo" && stepOn === "place";   /* the warm-up's one tap: it shows how a bar moves into a place */
  /* a double tap places ONE bar: the bars re-lay after a placement, so the second tap of a double lands on a neighbour. A tap at
     the SAME SPOT (within 40 stage units) within half a second of a placement is ignored; a quick tap elsewhere still counts */
  const lastPlace = useRef<any>({ t: 0, x: -999, y: -999 });
  const ptr = useRef<any>(null);
  const notePtr = (e: any) => {
    const svg = e.currentTarget && e.currentTarget.ownerSVGElement, r = svg ? svg.getBoundingClientRect() : null;
    const s = r && r.width ? 1600 / r.width : 1;
    ptr.current = { t: Date.now(), x: e.clientX * s, y: e.clientY * s };
  };
  const tapBar = (id: string) => {
    if ((stage !== "ask" && !placeStep) || tl.busy || busy.current) return;
    if (placeStep && ord.current.k > 0) { api.did("place"); return; }
    const now = Date.now(), p = ptr.current && now - ptr.current.t < 600 ? ptr.current : null, L = lastPlace.current;
    if (p && now - L.t < 500 && Math.hypot(p.x - L.x, p.y - L.y) < 40) return;
    lastPlace.current = { t: now, x: p ? p.x : -999, y: p ? p.y : -999 };
    const o = ord.current, j = o.pos.indexOf(id), p2 = o.pos.slice();
    let k = o.k;
    if (j < k) k = j;
    else { p2.splice(j, 1); p2.splice(k, 0, id); k++; }
    if (k === N - 1) k = N;
    ord.current = { ...o, pos: p2, k, dirty: true };
    setTb(null);
    api.sfx.tick();
    bump((x) => x + 1);
    if (placeStep) api.did("place");
  };
  const enterOrder = () => {
    const o = ord.current;
    if (o.k < N || !o.dirty) return;   /* the order is not finished, or it is the one that just missed */
    o.dirty = false;
    api.submit(o.pos.join(","));
  };
  HOOK.set = kind === "order" && stage === "ask" ? (v: any) => {
    const ids = mcIds(v);
    if (ids.length !== N || ids.some((id) => vals[id] === undefined)) return false;
    ord.current = { ...ord.current, pos: ids, k: N, dirty: true };
    bump((x) => x + 1);
    return true;
  } : null;
  /* Enter: in a guide step it performs the step; on an ordering question it sends the shelf's order; else the runtime's own */
  api.onEnter(stage === "demo" && stepOn ? () => act(stepOn) : stage === "ask" && kind === "order" ? enterOrder : null);
  /* the Enter key of an ordering question blinks once all four bars are placed (the Answer key of the others is the runtime's) */
  useEffect(() => { if (stage === "ask" && kind === "order") api.answerReady(ord.current.k >= N && ord.current.dirty); });

  /* the traceback: the cards go into one unit, the bars stand, the trap is lit amber, and it ends on the whole answer */
  const replaying = useRef(false);
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    ord.current.dirty = false;
    api.lock(true);
    const amber = kind === "cmp" ? cards.filter((c: any) => c.b !== undefined).map((c: any) => c.id)
      : kind === "pick" ? [String(wrong.value)] : kind === "same" ? ["sign"]
      : kind === "order" ? ord.current.pos.filter((id: string, j: number) => j < ord.current.k && ansIds[j] !== id) : [];
    const steps: any[] = [[350, () => setTb({ q: qk, amber, show: false })]];
    if (!st.conv) steps.push([750, () => { put({ conv: true, shown: N }); api.sfx.settle(); }]);
    if (kind === "diff" && !st.taken) steps.push([750, () => { put({ taken: true }); api.sfx.trade(); }]);
    steps.push([500, () => setTb({ q: qk, amber, show: true })]);
    replaying.current = true;
    tl.run(steps, () => { replaying.current = false; api.lock(false); });
  }, [wrong]);
  /* a correction never outlives its question (the teacher's next() or gotoStep mid-correction): stop it and give the lock back */
  useEffect(() => () => {
    tw.stop();
    if (replaying.current) { replaying.current = false; tl.stop(); api.lock(false); }
  }, [qk]);

  /* the win: the picture shows the whole answer and stays until the Next key; an order gets a ball rolling up its steps */
  useEffect(() => {
    if (stage !== "win" || free) return;
    if (!st.conv || (kind === "diff" && !st.taken)) put({ conv: true, shown: N, taken: kind === "diff" });
    /* the last question of a phase: the runtime puts the phase's closing in place of whatever is said here */
    if (index === phase.items.length - 1) api.say(phase.closing); else mcWinLine(item.qid, api);
    if (kind === "order") tw.run([[0, () => setBall({ q: qk, i: 0 })], [420, () => setBall({ q: qk, i: 1 })], [420, () => setBall({ q: qk, i: 2 })], [420, () => setBall({ q: qk, i: 3 })]]);
  }, [stage]);

  /* what the host and the agent read back (toolApi.getState): nothing that answers before the child has */
  const sign = (a: number, b: number) => (a < b ? "<" : a > b ? ">" : "=");
  api.share({ phase: n, cards: cards.map((c: any) => mcGiven(u, c).join(" ")), same_unit: conv,
    sign: N === 2 && conv && open && kind !== "diff" ? sign(vals[ida], vals[idb]) : null,
    difference: kind === "diff" && win ? item.answer[0] : null, order: kind === "order" ? ord.current.pos.slice(0, ord.current.k) : null,
    answer: win ? agentKey(item) : null, complete: stage === "idle" });

  /* ── drawing ── */
  const greenOn = (id: string) => showAns && (kind === "cmp" ? id === item.answer : kind === "pick" ? id === item.answer || id === ida : kind === "order" ? win : false);
  const amberOn = (id: string) => !!(tb && tb.amber.includes(id));
  const noKey = !free && !warm && !!item.noKey;   /* the question converts in the child's head: no Same unit key */
  const keyOn = !win && stage !== "summary" && kind !== "word" && !noKey && (!conv || ((kind === "diff" || kind === "free") && !st.taken));
  const keyId = !conv ? "same" : "take";
  const keys: any[] = [];
  if (free) keys.push({ id: "new", label: "New cards" });
  if (keyOn) keys.push({ id: keyId, label: keyId === "same" ? "Same unit" : "Take away" });
  /* the key row stands under the picture; an ordering question's key row keeps the open width too (it may be shown with the
     panel open, ?answer=open), so it never slides under the text it was measured against */
  const kw0 = keys.length > 1 ? 260 : 280, kgap = 20, xc = (AX + (free ? R : Math.min(R, BOARD_OPEN_W_BIG))) / 2;
  /* the key blinks while a guide step waits for it; at a question the Answer key blinks (the runtime's), so this one stays still */
  const blinkKey = keyOn && !tl.busy && ((stage === "demo" && stepOn === keyId) || (stage === "ask" && kind === "order"));
  /* the unit fact, drawn as three labels round a drawn equals sign: "1 kg" = "1,000 g"; a longer Hindi or Gujarati unit
     pushes the keys right (never the chip off the board's left edge) */
  const factL = "1 " + tx(U.big), factR = indian(U.k) + " " + tx(U.small);
  const factLW = mcW(factL) * T.label, factW = factLW + mcW(factR) * T.label + 92;
  /* the base label stands on one line at the end of a leader from the axis foot; with bars up the chip and the key stand clear
     of it, and a key narrows (never under 220) rather than run past the picture's right edge */
  const barsUp = cards.some((c: any) => labOn(c.id));
  const baseText = indian(base) + " " + tx(U.small), baseFs = T.label, baseRight = 36 + mcW(baseText) * baseFs + 20;
  const factOn = keys.length > 0 || (noKey && stage === "ask" && !conv);
  const kx0 = Math.max(xc - (keys.length * kw0 + (keys.length - 1) * kgap) / 2, factW + 24, barsUp ? baseRight + factW + 20 : 0);
  const kw = Math.max(220, Math.min(kw0, (R - 8 - kx0 - (keys.length - 1) * kgap) / Math.max(1, keys.length)));
  const fx0 = keys.length ? kx0 - 20 - factW : Math.max(4, xc - factW / 2);
  const gx = (cx(ida) + cx(idb)) / 2;
  const taken = kind === "diff" || kind === "free" ? st.taken : false;
  const hL = hOf(vals[longId]), hS = hOf(vals[shortId]);
  /* the order's name is shown only once the answer is (the correction or the win), never before: it would answer "descending" */
  const capOn = (kind === "order" || kind === "word") && showAns;
  const capDown = kind === "word" ? showAns : item.dir === "down";
  const byHeight = pos.slice().sort((a, b) => vals[a] - vals[b]);

  /* ONE type size for the whole row of cards, fitted to the longest: each card's best size on one line, or (a mixed measure) on
     two lines inside the 110-tall card, where Hindi and Gujarati rise higher over the line and take at most 32, English 36 */
  const ind = lang !== "en";
  /* a named card (Pot, Kettle ...) keeps its value under the caption: 38 in Hindi and Gujarati, whose matras rise high, 44 in English */
  const fitOf = (c: any) => {
    /* the text keeps 12 a side INSIDE the thickest border (the 7-wide win / amber edge: 3.5 inside the card), so 31 of the width */
    /* (Hindi and Gujarati take 2 more for the rounding of their estimate) */
    const room = cw - (ind ? 33 : 31);
    const ps = mcGiven(u, c, tx), one = Math.min(c.name ? (ind ? 38 : 44) : T.xl, room / mcW(ps.join(" ")));
    const two = !c.name && ps.length > 1 ? Math.min(ind ? 32 : 36, room / Math.max(...ps.map((p: string) => mcW(p)))) : 0;
    return { one, two };
  };
  const fits: any = {};
  cards.forEach((c: any) => { fits[c.id] = fitOf(c); });
  /* every card on one line when the row still reads at 32 or more; only then may a mixed card take two lines */
  const oneRow = Math.min(...cards.map((c: any) => fits[c.id].one));
  /* otherwise EVERY mixed card wraps to two lines (never one wrapped and its neighbour not) and the row takes the smallest fit */
  const twoRow = oneRow < T.label;
  const rowFs = Math.max(T.micro, !twoRow ? oneRow : Math.min(...cards.map((c: any) => (fits[c.id].two > 0 ? fits[c.id].two : fits[c.id].one))));
  const card = (c: any) => {
    const x = cx(c.id) - cw / 2, ps = mcGiven(u, c, tx), line = ps.join(" ");
    const fs = rowFs, two = twoRow && fits[c.id].two > 0;
    const edge = amberOn(c.id) ? CONTENT.ten : greenOn(c.id) ? CONTENT.one : CONTENT.hundred;
    return (
      <g key={"card" + c.id} data-role="card">
        <rect x={x} y={0} width={cw} height={ch} rx={18} fill="#FFFFFF" stroke={edge} strokeWidth={edge === CONTENT.hundred ? 4 : 7} filter="url(#fShadowSoft)" />
        {/* the caption's matras clear the top border; the value sits on a baseline near the card's foot, clear of the caption */}
        {c.name && <text x={x + 18} y={38} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(c.name)}</text>}
        {two ? ps.map((p: string, k: number) => (
          <text key={k} x={x + cw / 2} y={ind ? 44 + k * 45 : 48 + k * 40} textAnchor="middle" fontSize={fs} fontWeight={700} fill={MC_BLUE_INK}>{p}</text>
        )) : <text x={x + cw / 2} y={c.name ? ch - 18 : ch / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill={MC_BLUE_INK}>{line}</text>}
      </g>
    );
  };
  const label = (c: any) => {
    const ds = mcDigits(u, c), unit = tx(U.small);
    /* a clear gap between neighbours, and never bigger than the given card above it (the derived number does not outweigh it) */
    const fs = Math.max(T.micro, Math.min(T.speech, rowFs, (colW - 30) / ((ds.length + 1) * 0.6 + mcW(unit))));
    return (
      <text key={"lab" + c.id} x={cx(c.id)} y={Y.lab} textAnchor="middle" fontSize={fs} fontWeight={700} fill={MC_GREEN_INK}>
        {ds.map((x: any, k: number) => <tspan key={k} fill={x.ph ? MC_GREY : MC_GREEN_INK}>{x.d}</tspan>)}
        <tspan>{" " + unit}</tspan>
      </text>
    );
  };
  const bar = (c: any) => {
    const h = hOf(vals[c.id]), x = cx(c.id) - barW / 2;
    const over = taken && c.id === longId;
    const paint = amberOn(c.id) ? "url(#gTen)" : greenOn(c.id) ? "url(#gOne)" : "url(#gHundred)";
    const tint0 = amberOn(c.id) ? CONTENT.ten : greenOn(c.id) ? CONTENT.one : null;
    return (
      <g key={"bar" + c.id} data-role="bar">
        {/* the plain bar: the whole drawing without the skin */}
        {over ? (
          <g>
            <rect x={x} y={Y.base - hL} width={barW} height={hL - hS} rx={8} fill="url(#gOne)" stroke={shade(CONTENT.one, 0.3)} strokeWidth={2} />
            <rect x={x} y={Y.base - hS} width={barW} height={hS} rx={8} fill={CONTENT.bead} stroke={MC_ROSE_INK} strokeWidth={2} />
          </g>
        ) : <rect x={x} y={Y.base - h} width={barW} height={h} rx={8} fill={paint} stroke={shade(CONTENT.hundred, 0.3)} strokeWidth={2} />}
        {/* the skin: the golden ribbon turned upright and clipped to the bar, then the colour code over it */}
        <clipPath id={"mcb-" + c.id}><rect x={x} y={Y.base - h} width={barW} height={h} rx={8} /></clipPath>
        <g clipPath={"url(#mcb-" + c.id + ")"} pointerEvents="none">
          <g transform={`rotate(-90 ${x + barW / 2} ${Y.base - h / 2})`}>
            <Skin name="bar" x={x + barW / 2 - h / 2} y={Y.base - h / 2 - barW / 2} w={h} h={barW} />
          </g>
          {over ? (
            <g>
              <rect x={x} y={Y.base - hL} width={barW} height={hL - hS} fill={CONTENT.one} fillOpacity={0.72} />
              <rect x={x} y={Y.base - hS} width={barW} height={hS} fill={CONTENT.bead} fillOpacity={0.72} />
            </g>
          ) : tint0 && <rect x={x} y={Y.base - h} width={barW} height={h} fill={tint0} fillOpacity={0.72} />}
        </g>
        {/* a dark edge so the pale ribbon reads against the board */}
        <rect x={x} y={Y.base - h} width={barW} height={h} rx={8} fill="none" stroke={MC_BAR_EDGE} strokeWidth={2.5} pointerEvents="none" />
      </g>
    );
  };

  return (
    <g>
      {/* keyOnly: no runs zone; nothing under box.key; the question is in the bubble only */}
      {/* the scale: the shelf every bar stands on, and an axis with a break mark that starts at the whole big units */}
      <rect x={4} y={Y.base} width={R - 8} height={12} rx={5} fill={C.rule} stroke={C.ink} strokeWidth={2} />
      {barsUp && (
        <g pointerEvents="none">
          <line x1={20} y1={Y.base} x2={20} y2={Y.top - 6} stroke={C.ink} strokeWidth={3} />
          {/* the break: the bars do not start at zero */}
          <rect x={6} y={Y.base - 48} width={28} height={16} fill={C.paper} />
          <line x1={4} y1={Y.base - 36} x2={36} y2={Y.base - 50} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
          <line x1={4} y1={Y.base - 22} x2={36} y2={Y.base - 36} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
          {/* a dark leader from the axis foot down past the shelf to the label: "the bars start here" */}
          <path d={`M 20 ${Y.base} V ${Y.foot - 11} H 32`} stroke={C.ink} strokeWidth={3} fill="none" />
          <text x={36} y={Y.foot} fontSize={baseFs} fontWeight={700} fill={C.ink}>{baseText}</text>
        </g>
      )}
      {cards.map((c: any) => card(c))}
      {cards.map((c: any) => (labOn(c.id) ? label(c) : null))}
      {cards.map((c: any) => (labOn(c.id) ? bar(c) : null))}

      {/* the sign box between two bars: empty until the answer is given (or the correction shows it) */}
      {N === 2 && conv && kind !== "diff" && !taken && (
        <g pointerEvents="none">
          <rect x={gx - 48} y={(Y.top + Y.base) / 2 - 48} width={96} height={96} rx={18} fill="#FFFFFF"
            stroke={amberOn("sign") ? CONTENT.ten : C.ink} strokeWidth={amberOn("sign") ? 6 : 3} strokeDasharray={open ? undefined : "10 8"} />
          {open && <text x={gx} y={(Y.top + Y.base) / 2 + 24} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={MC_GREEN_INK}>{sign(vals[ida], vals[idb])}</text>}
        </g>
      )}
      {/* equal lengths stand level: a line from the given bar's top to the bar that matches it */}
      {kind === "pick" && conv && showAns && (
        <line x1={cx(ida) - barW / 2} y1={Y.base - hOf(vals[ida])} x2={cx(item.answer) + barW / 2} y2={Y.base - hOf(vals[ida])}
          stroke={MC_GREEN_INK} strokeWidth={4} strokeDasharray="12 8" pointerEvents="none" />
      )}
      {/* Take away: the covered part (rose) and the part that sticks out (green), labelled in the gap between the bars */}
      {taken && (
        <g pointerEvents="none">
          <line x1={cx(longId) + (cx(longId) < gx ? barW / 2 + 12 : -barW / 2 - 12)} y1={Y.base - hL} x2={cx(longId) + (cx(longId) < gx ? barW / 2 + 12 : -barW / 2 - 12)} y2={Y.base - hS}
            stroke={MC_GREEN_INK} strokeWidth={4} />
          <text x={gx} y={Y.base - (hL + hS) / 2 + 14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={MC_GREEN_INK}>
            {open ? indian(vals[longId] - vals[shortId]) + " " + tx(U.small) : "?"}</text>
          <text x={gx} y={Math.min(Y.base - hS / 2 + 11, Y.base - 24)} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={MC_ROSE_INK}>{tx("Taken away")}</text>
        </g>
      )}
      {/* ordering: each placed bar carries its place; the correction (and the win) number every bar with its right place */}
      {kind === "order" && conv && (
        <g pointerEvents="none">
          {pos.map((id: string, j: number) => {
            const rank = showAns ? ansIds.indexOf(id) + 1 : j < ord.current.k ? j + 1 : 0;
            return rank ? (
              <g key={"chip" + id}>
                {/* inside the bar's foot (the shortest bar is a quarter of the tallest), so the shelf's foot keeps the base label */}
                <circle cx={cx(id)} cy={Y.base - 24} r={19} fill={showAns ? MC_GREEN_INK : C.ink} stroke="#FFFFFF" strokeWidth={2} />
                <text x={cx(id)} y={Y.base - 14} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF">{rank}</text>
              </g>
            ) : null;
          })}
          {/* the win's ball climbs the steps from the shortest bar to the tallest, resting on each top, below the green labels */}
          {ball >= 0 && <circle cx={cx(byHeight[ball])} cy={Y.base - hOf(vals[byHeight[ball]]) - 15} r={13} fill={CONTENT.pointer} stroke={C.ink} strokeWidth={2} />}
        </g>
      )}
      {/* the order's name, with an arrow that rises or falls to the right */}
      {capOn && (
        <g pointerEvents="none">
          <text x={R - 84} y={Y.cap} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(capDown ? "Descending" : "Ascending")}</text>
          <path d={capDown ? `M ${R - 74} ${Y.cap - 26} L ${R - 18} ${Y.cap - 2}` : `M ${R - 74} ${Y.cap - 2} L ${R - 18} ${Y.cap - 26}`} stroke={C.ink} strokeWidth={4} fill="none" />
          <path d={capDown ? `M ${R - 36} ${Y.cap + 2} L ${R - 14} ${Y.cap} L ${R - 26} ${Y.cap - 20}` : `M ${R - 36} ${Y.cap - 32} L ${R - 14} ${Y.cap - 28} L ${R - 24} ${Y.cap - 8}`}
            stroke={C.ink} strokeWidth={4} fill="none" strokeLinejoin="round" />
        </g>
      )}
      {/* the bars to tap into order */}
      {kind === "order" && conv && (stage === "ask" || placeStep) && (
        <g onPointerDownCapture={notePtr}>
          {pos.map((id: string) => (
            <Hit key={"hit" + id} id={placeStep ? "place" : "bar-" + id} x={cx(id) - colW / 2 + 6} y={0} w={colW - 12} h={Y.base + 4}
              label={mcGiven(u, cards.find((c: any) => c.id === id), tx).join(" ")} onPress={() => tapBar(id)} />
          ))}
        </g>
      )}
      {placeStep && ord.current.k === 0 && <Invite x={cx(pos[0])} y={Y.base - Math.max(hOf(vals[pos[0]]), 60) / 2} r={60} C={C} />}

      {/* the unit fact beside the key (centred when the question has no key), and the one key at the bottom centre */}
      {factOn && (
        <g pointerEvents="none">
          <rect x={fx0} y={Y.key + 8} width={factW} height={56} rx={14} fill={tint(MC_VIOLET, 0.88)} stroke={MC_VIOLET} strokeWidth={3} />
          <text x={fx0 + 16} y={Y.key + 47} fontSize={T.label} fontWeight={700} fill={MC_VIOLET}>{factL}</text>
          <text x={fx0 + 16 + factLW + 30} y={Y.key + 47} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={MC_VIOLET}>=</text>
          <text x={fx0 + factW - 16} y={Y.key + 47} textAnchor="end" fontSize={T.label} fontWeight={700} fill={MC_VIOLET}>{factR}</text>
        </g>
      )}
      {keys.map((b: any, j: number) => (
        <g key={"key" + j}>
          <Key id={b.id} label={tx(b.label)} x={kx0 + j * (kw + kgap)} y={Y.key} w={kw} h={72} C={C} tone="key" disabled={tl.busy} onClick={() => pressKey(b.id)}>
            <text y={13} textAnchor="middle" fontSize={Math.max(T.label, Math.min(T.prompt, (kw - 28) / mcW(tx(b.label))))} fontWeight={700} fill={toneInk("key", C.ink)}>{tx(b.label)}</text>
          </Key>
          {blinkKey && b.id === keyId && <BlinkRing x={kx0 + j * (kw + kgap)} y={Y.key} w={kw} h={72 + EDGE} rx={RAD.key} C={C} />}
        </g>
      ))}
    </g>
  );
}

/* the right answer's own line (one sentence; a literal per question, so each has its Hindi and Gujarati); a phase's
   last question shows its closing instead, so it has none */
function mcWinLine(qid: string, api: any) {
  if (qid === "M2.S3.T5.C20:CM1") api.say("Yes, 3,150 g is heavier than 3,090 g.");
  if (qid === "M2.S3.T5.C20:1") api.say("Yes, 330 cm is longer than 320 cm.");
  if (qid === "M2.S3.T5.C21:CM2") api.say("Yes, 605 cm and 6 m 5 cm stand exactly level.");
  if (qid === "M2.S3.T5.C21:2") api.say("Yes, 5 L 300 mL is 5,300 mL, so they are equal.");
  if (qid === "M2.S3.T5.C22:CM3") api.say("Yes, the pot holds 165 mL more than the kettle.");
  if (qid === "M2.S3.T5.C22:4") api.say("Yes, the green ribbon is 21 cm longer.");
  if (qid === "M2.S3.T5.C23:CM4") api.say("Yes, they rise like steps from 1,004 g to 1,410 g.");
  if (qid === "M2.S3.T5.C23:3") api.say("Yes, descending goes from the largest down to the smallest.");
}

/* the summary page's small drawing of the child's last right answer in a phase (it = the question, r24) */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const item = it || (result && result.last && PHASES[n - 1] && PHASES[n - 1].items[result.last.item]) || null;
  if (!item || !item.cards) return null;
  const u = item.u, cs = item.cards, vals = cs.map((c: any) => mcVal(u, c));
  const lo = mcBase(vals, MC_U[u].k), hi = Math.max(...vals), bh = h - 24;
  const hOf = (v: number) => (hi === lo ? bh : Math.max(4, ((v - lo) / (hi - lo)) * bh));
  /* a pick shows the given bar and the one level with it */
  const ids = item.kind === "order" ? mcIds(item.answer) : item.kind === "word" ? cs.map((c: any) => c.id).reverse()
    : item.kind === "pick" ? [cs[0].id, item.answer] : cs.map((c: any) => c.id);
  const vOf = (id: string) => vals[cs.findIndex((c: any) => c.id === id)];
  const bw = ids.length > 2 ? 16 : 14, step = bw + 6;
  /* the unit in the language in use; an English symbol is never drawn in Hindi or Gujarati (until TR gives it, the number stands alone) */
  const un = tx(MC_U[u].small), unit = lang === "en" || !/[A-Za-z]/.test(un) ? " " + un : "";
  const text = item.kind === "diff" ? indian(item.answer[0]) + unit
    : item.kind === "cmp" || item.kind === "pick" ? indian(vOf(item.answer)) + unit
    : item.kind === "same" ? "=" : "";
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <line x1={10} y1={h - 10} x2={20 + ids.length * step} y2={h - 10} stroke={C.ink} strokeWidth={2} />
      {ids.map((id: string, j: number) => (
        <rect key={id} x={16 + j * step} y={h - 10 - hOf(vOf(id))} width={bw} height={hOf(vOf(id))} rx={4}
          fill={item.kind === "cmp" ? (id === item.answer ? CONTENT.one : CONTENT.hundred) : CONTENT.one} />
      ))}
      {/* the value stands right, at least 14 clear of the bars */}
      {text && <text x={w - 12} y={h / 2 + 10} textAnchor="end" fontSize={Math.min(T.micro, (w - 12 - (16 + ids.length * step) - 14) / mcW(text))} fontWeight={700} fill={MC_GREEN_INK}>{text}</text>}
    </g>
  );
}

function MeasureComparer(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null, format: mcFormat,
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

export default MeasureComparer;
