/* ═══ M2.S4.T9.C40.2D1 · decimal_comparer · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, key corner, bubble + mascot,
   phase dots, window.toolApi, the sound effects, the printed bubble, scoring, the events, idle and
   restart. THE LESSON IS SILENT; the bubble is the guide. THE NEW LOOK (keyOnly, navDots, one
   sentence a screen, every act performed on screen through api.act). NO imports in this file.

   Phases 1-3: two decimal cards, one above the other, their points in one line under a place strip,
   and a measuring tape under them. The one key at the bottom reads Compare: each tap the hand
   points at the next place from the left (the whole number part first); a matching place fades,
   the first place that differs lights amber and Decides. Then the key reads Measure: a ruler slides
   along the tape and the two ribbons are laid on it to scale. The child taps the greater card, then
   Enter. Phase 4: the cards are dragged (or tapped, the hand carries them) onto a staircase that
   climbs for ascending order and falls for descending, a sign between every pair; a tap on a sign
   compares that pair. Guide steps play on the book's own examples, never on question 1. */

const TOOL_ID = "decimal_comparer";
const MEDIA_ID = "M2.S4.T9.C40.2D1";
const TOOL_NAME = "Decimal Comparer";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (not shown: phase 1 has steps) */
const OPENING = ["Two decimals, their points in one line."];
/* the whole-tool line (not shown from r44; kept for the sidecar) */
const FINISH_LINE = "The first place that differed decided every time.";
/* printed when the child opens Free play: only what free play really offers (New cards: pairs and rows) */
const FREE_LINE = "Free play: compare new pairs and put new rows of cards in order.";

/* THE START PAGE: two decimal cards, points in one line, over the measuring tape */
const START_HOOK = "Is a decimal with more digits always the greater one?";
function StartArt({ box, C, lang, tx }: any) {
  const cw = 560, ch = 112, x = (box.w - cw) / 2 - 60, pt = x + 170;
  const card = (w: string, d: string, y: number) => (
    <g>
      <rect x={x} y={y} width={cw} height={ch} rx={20} fill="#FFFFFF" stroke={C.rule} strokeWidth={3} filter="url(#fShadowSoft)" />
      <text x={pt - 26} y={y + 84} textAnchor="end" fontSize={T.display + 8} fontWeight={700} fill={DC_INK.blue}>{w}</text>
      <circle cx={pt} cy={y + 76} r={9} fill={C.ink} />
      {d.split("").map((c: string, j: number) => (
        <text key={j} x={pt + 64 + j * 110} y={y + 84} textAnchor="middle" fontSize={T.display + 8} fontWeight={700} fill={DC_INK.blue}>{c}</text>
      ))}
    </g>
  );
  return (
    <g>
      {card("0", "9", 20)}
      {card("0", "345", 150)}
      <circle cx={x + cw + 90} cy={146} r={46} fill="#FFFFFF" stroke={C.rule} strokeWidth={3} strokeDasharray="9 8" />
      <text x={x + cw + 90} y={162} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>?</text>
      <rect x={40} y={286} width={box.w - 80} height={46} rx={8} fill={DC_TAPE} stroke={shade(DC_TAPE, 0.3)} strokeWidth={2} />
      <Skin name="tape" x={40} y={286} w={box.w - 80} h={46} fit="stretch" />
      {Array.from({ length: 21 }, (_, k) => (
        <line key={k} x1={60 + k * ((box.w - 120) / 20)} y1={286} x2={60 + k * ((box.w - 120) / 20)} y2={k % 2 ? 300 : 310} stroke={C.ink} strokeWidth={k % 2 ? 1.5 : 3} />
      ))}
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): filled in the language pass, once the English is final. */
const TR: any = {
  hi: {
    "Decimal Comparer": "दशमलव तुलना",
    "Two decimals, their points in one line.": "दो दशमलव संख्याएँ, उनके बिंदु एक सीध में।",
    "Free play: compare new pairs and put new rows of cards in order.": "खुला खेल: नए जोड़ों की तुलना करो और नए कार्ड क्रम में लगाओ।",
    "Is a decimal with more digits always the greater one?": "क्या ज़्यादा अंकों वाली दशमलव संख्या हमेशा बड़ी होती है?",
    "The first place that differed decided every time.": "हर बार पहले अलग स्थान ने तय किया।",
    /* phase 1 */
    "Whole number parts first": "पहले पूर्ण संख्या भाग",
    "Look at the whole numbers first. Is it settled already?": "पहले पूर्ण संख्याएँ देखो। क्या तय हो गया?",
    "Tap Compare and watch the whole numbers light up.": "तुलना करो पर टैप करो और पूर्ण संख्याएँ चमकती देखो।",
    "The Compare key is at the bottom.": "तुलना करो बटन नीचे है।",
    "The greater whole number part makes the greater decimal.": "जिसका पूर्ण संख्या भाग बड़ा, वही दशमलव संख्या बड़ी।",
    "Cover the digits after each point, then compare what is left.": "हर बिंदु के बाद के अंक ढक दो, फिर बचे हुए की तुलना करो।",
    "When the whole number parts differ, they decide.": "पूर्ण संख्या भाग अलग हों तो वही तय करते हैं।",
    "You learned: if the whole number parts differ, they decide": "तुमने सीखा: पूर्ण संख्या भाग अलग हों तो वही तय करते हैं",
    "Tap the card that is greater, 15.2 or 8.96.": "जो कार्ड बड़ा है उस पर टैप करो, 15.2 या 8.96।",
    "Which is greater?": "कौन-सा बड़ा है?",
    "Read the two whole number parts.": "दोनों पूर्ण संख्या भाग पढ़ो।",
    "Now 19.8 or 21.05: tap the greater one.": "अब 19.8 या 21.05: बड़े वाले पर टैप करो।",
    "Look at the numbers before the points.": "बिंदुओं से पहले की संख्याएँ देखो।",
    "Last pair, 30.001 or 29.999: which card is greater?": "आख़िरी जोड़ा, 30.001 या 29.999: कौन-सा कार्ड बड़ा है?",
    "Start at the left end of each card.": "हर कार्ड के बाएँ सिरे से शुरू करो।",
    /* phase 2 */
    "Then tenths, then hundredths": "फिर दशांश, फिर शतांश",
    "The ones match. Which place is next?": "इकाई बराबर हैं। अगला स्थान कौन-सा है?",
    "Tap Compare to read the ones of both cards.": "दोनों कार्ड की इकाई पढ़ने के लिए तुलना करो पर टैप करो।",
    "The Compare key is under the tape.": "तुलना करो बटन फ़ीते के नीचे है।",
    "Tap Compare again to read the tenths.": "दशांश पढ़ने के लिए फिर से तुलना करो पर टैप करो।",
    "Press the same key once more.": "वही बटन एक बार और दबाओ।",
    "Compare the places after the point, starting with the tenths.": "बिंदु के बाद के स्थानों की तुलना करो, दशांश से शुरू करके।",
    "Go place by place and stop at the first digits that differ.": "एक-एक स्थान देखो और पहले अलग अंकों पर रुको।",
    "If the whole numbers match, the first place that differs decides.": "पूर्ण संख्याएँ बराबर हों तो पहला अलग स्थान तय करता है।",
    "You learned: equal whole parts? The first place that differs decides": "तुमने सीखा: पूर्ण संख्या भाग बराबर हों तो पहला अलग स्थान तय करता है",
    "Tap the greater card, 6.38 or 6.4.": "बड़े कार्ड पर टैप करो, 6.38 या 6.4।",
    "Check that the whole number parts match.": "देखो कि पूर्ण संख्या भाग बराबर हैं या नहीं।",
    "Next, 4.51 or 4.53: which one is more?": "अगला, 4.51 या 4.53: कौन-सा ज़्यादा है?",
    "Both start with 4, so look after the point.": "दोनों 4 से शुरू होते हैं, तो बिंदु के बाद देखो।",
    "One ribbon is 2.64 m and one is 2.6 m long: tap the longer one.": "एक रिबन 2.64 मीटर और एक 2.6 मीटर लंबा है: लंबे वाले पर टैप करो।",
    "Which ribbon is longer?": "कौन-सा रिबन लंबा है?",
    "Think of 2.6 as 2.60 if it helps your eye.": "आसानी हो तो 2.6 को 2.60 समझो।",
    /* phase 3 */
    "More digits is not more": "ज़्यादा अंक, ज़्यादा नहीं",
    "More digits. Is it more?": "ज़्यादा अंक। क्या वह ज़्यादा है?",
    "Tap Compare to start at the whole numbers.": "पूर्ण संख्याओं से शुरू करने के लिए तुलना करो पर टैप करो।",
    "Compare is the key at the bottom.": "तुलना करो नीचे वाला बटन है।",
    "Tap Compare again for the tenths.": "दशांश के लिए फिर तुलना करो पर टैप करो।",
    "One more press reads the next place.": "एक बार और दबाने पर अगला स्थान पढ़ा जाएगा।",
    "Now tap Measure to lay both ribbons on the tape.": "अब दोनों रिबन फ़ीते पर रखने के लिए नापो पर टैप करो।",
    "Measure lays a ruler along the tape.": "नापो फ़ीते के साथ एक पैमाना रखता है।",
    "The whole numbers match, so compare the tenths.": "पूर्ण संख्याएँ बराबर हैं, तो दशांश की तुलना करो।",
    "Count the tenths: the card with more tenths is greater.": "दशांश गिनो: जिस कार्ड में ज़्यादा दशांश हैं, वही बड़ा है।",
    "More digits after the point does not make a decimal greater.": "बिंदु के बाद ज़्यादा अंक होने से दशमलव संख्या बड़ी नहीं होती।",
    "You learned: more digits after the point does not mean greater": "तुमने सीखा: बिंदु के बाद ज़्यादा अंक का मतलब बड़ा नहीं",
    "Tap the card that is greater, 0.7 or 0.625.": "जो कार्ड बड़ा है उस पर टैप करो, 0.7 या 0.625।",
    "Read the first digit after each point.": "हर बिंदु के बाद का पहला अंक पढ़ो।",
    "Now 0.79 or 0.8: pick the greater one.": "अब 0.79 या 0.8: बड़ा वाला चुनो।",
    "Compare the cards place by place from the left.": "बाएँ से एक-एक स्थान करके कार्डों की तुलना करो।",
    "Last pair, 0.587 or 0.6: which one is more?": "आख़िरी जोड़ा, 0.587 या 0.6: कौन-सा ज़्यादा है?",
    "Begin with the whole numbers, then go right.": "पूर्ण संख्याओं से शुरू करो, फिर दाईं ओर बढ़ो।",
    /* phase 4 */
    "Putting decimals in order": "दशमलव संख्याओं को क्रम में लगाना",
    "Ascending puts the smallest first, and descending the greatest first.": "आरोही क्रम में सबसे छोटा पहले, अवरोही में सबसे बड़ा पहले।",
    "Drag the smallest card onto the lowest step.": "सबसे छोटे कार्ड को सबसे नीची सीढ़ी पर खींचो।",
    "Read each card from the left, place by place.": "हर कार्ड को बाएँ से, एक-एक स्थान करके पढ़ो।",
    "Now put the greatest card on the top step.": "अब सबसे बड़ा कार्ड सबसे ऊँची सीढ़ी पर रखो।",
    "The top step is at the right end.": "सबसे ऊँची सीढ़ी दाएँ सिरे पर है।",
    "Put the last card on the middle step.": "आख़िरी कार्ड बीच वाली सीढ़ी पर रखो।",
    "One step is still empty.": "एक सीढ़ी अभी खाली है।",
    "Compare the whole number parts, then the tenths.": "पहले पूर्ण संख्या भाग, फिर दशांश की तुलना करो।",
    "Compare each pair of cards on the steps, place by place.": "सीढ़ियों पर हर जोड़े की तुलना एक-एक स्थान करके करो।",
    "We order decimals by comparing them place by place.": "क्रम में लगाने के लिए एक-एक स्थान की तुलना करो।",
    "Tap the greater card first.": "पहले बड़े कार्ड पर टैप करो।",
    "Fill every step first.": "पहले हर सीढ़ी भरो।",
    "You learned: order decimals by comparing them place by place": "तुमने सीखा: एक-एक स्थान की तुलना करके दशमलव संख्याएँ क्रम में लगाना",
    "Put 3.09, 3.9 and 3.009 in descending order, greatest first.": "3.09, 3.9 और 3.009 को अवरोही क्रम में लगाओ, सबसे बड़ा पहले।",
    "Descending order": "अवरोही क्रम",
    "Descending puts the greatest card first.": "अवरोही क्रम में सबसे बड़ा कार्ड पहले आता है।",
    "This time, 5.06, 5.6 and 0.56 in ascending order, smallest first.": "इस बार 5.06, 5.6 और 0.56 आरोही क्रम में, सबसे छोटा पहले।",
    "Ascending order": "आरोही क्रम",
    "Ascending climbs up from the smallest card.": "आरोही क्रम सबसे छोटे कार्ड से ऊपर चढ़ता है।",
    "Four cards now, 12.4, 1.24, 12.04 and 124: greatest first.": "अब चार कार्ड, 12.4, 1.24, 12.04 और 124: सबसे बड़ा पहले।",
    "Look at the whole number part of each card.": "हर कार्ड का पूर्ण संख्या भाग देखो।",
    /* the win lines (said by Work: not listed by tr-coverage) */
    "15 is more than 8, so 15.2 is greater than 8.96.": "8 से 15 ज़्यादा है, इसलिए 8.96 से 15.2 बड़ा है।",
    "21.05 is greater, because its whole number part is bigger.": "21.05 बड़ा है, क्योंकि उसका पूर्ण संख्या भाग बड़ा है।",
    "30 beats 29, so the digits after the point never mattered.": "29 से 30 बड़ा है, इसलिए बिंदु के बाद के अंकों से फ़र्क नहीं पड़ा।",
    "4 tenths beat 3 tenths, so 6.4 is greater than 6.38.": "3 दशांश से 4 दशांश ज़्यादा हैं, इसलिए 6.38 से 6.4 बड़ा है।",
    "The hundredths decided it: 4.53 is greater than 4.51.": "शतांश ने तय किया: 4.51 से 4.53 बड़ा है।",
    "4 hundredths beat 0 hundredths, so the 2.64 m ribbon is longer.": "0 शतांश से 4 शतांश ज़्यादा हैं, इसलिए 2.64 मीटर वाला रिबन लंबा है।",
    "7 tenths beat 6 tenths, so 0.7 is greater than 0.625.": "6 दशांश से 7 दशांश ज़्यादा हैं, इसलिए 0.625 से 0.7 बड़ा है।",
    "0.8 is greater than 0.79, even with fewer digits.": "कम अंक होने पर भी 0.79 से 0.8 बड़ा है।",
    "0.6 is greater than 0.587, and its ribbon is the longer one.": "0.587 से 0.6 बड़ा है, और उसका रिबन ज़्यादा लंबा है।",
    "Greatest first: 3.9, then 3.09, then 3.009.": "सबसे बड़ा पहले: 3.9, फिर 3.09, फिर 3.009।",
    "Smallest first: 0.56, then 5.06, then 5.6, and descending is the other way round.": "सबसे छोटा पहले: 0.56, फिर 5.06, फिर 5.6, और अवरोही इसका उल्टा है।",
    "124 is the greatest, and 1.24 is the smallest.": "124 सबसे बड़ा है, और 1.24 सबसे छोटा है।",
    /* words the picture draws (tx), and the aria labels */
    "whole number": "पूर्ण संख्या", "tenths": "दशांश", "hundredths": "शतांश", "thousandths": "सहस्रांश",
    "Decides": "तय करता है", "Added zero": "जोड़ा शून्य", "Compare": "तुलना करो", "Measure": "नापो", "New cards": "नए कार्ड",
    "card": "कार्ड", "compare this pair": "इस जोड़े की तुलना करो", "m": "मी",
  },
  gu: {
    "Decimal Comparer": "દશાંશ સરખામણી",
    "Two decimals, their points in one line.": "બે દશાંશ સંખ્યાઓ, તેમનાં ચિહ્નો એક લીટીમાં.",
    "Free play: compare new pairs and put new rows of cards in order.": "મુક્ત રમત: નવી જોડીઓ સરખાવો અને નવાં કાર્ડ ક્રમમાં ગોઠવો.",
    "Is a decimal with more digits always the greater one?": "શું વધુ અંકોવાળી દશાંશ સંખ્યા હંમેશાં મોટી હોય?",
    "The first place that differed decided every time.": "દરેક વખતે પહેલા જુદા સ્થાને નક્કી કર્યું.",
    /* phase 1 */
    "Whole number parts first": "પહેલાં પૂર્ણ સંખ્યાનો ભાગ",
    "Look at the whole numbers first. Is it settled already?": "પહેલાં પૂર્ણ સંખ્યાઓ જુઓ. શું નક્કી થઈ ગયું?",
    "Tap Compare and watch the whole numbers light up.": "સરખાવો પર ટૅપ કરો અને પૂર્ણ સંખ્યાઓ ઝળકતી જુઓ.",
    "The Compare key is at the bottom.": "સરખાવો બટન નીચે છે.",
    "The greater whole number part makes the greater decimal.": "જેનો પૂર્ણ સંખ્યાનો ભાગ મોટો, તે દશાંશ સંખ્યા મોટી.",
    "Cover the digits after each point, then compare what is left.": "દરેક ચિહ્ન પછીના અંકો ઢાંકો, પછી બાકીનું સરખાવો.",
    "When the whole number parts differ, they decide.": "પૂર્ણ સંખ્યાના ભાગ જુદા હોય તો તે જ નક્કી કરે છે.",
    "You learned: if the whole number parts differ, they decide": "તમે શીખ્યા: પૂર્ણ સંખ્યાના ભાગ જુદા હોય તો તે જ નક્કી કરે",
    "Tap the card that is greater, 15.2 or 8.96.": "જે કાર્ડ મોટું છે તેના પર ટૅપ કરો, 15.2 કે 8.96.",
    "Which is greater?": "કયું મોટું છે?",
    "Read the two whole number parts.": "બંને પૂર્ણ સંખ્યાના ભાગ વાંચો.",
    "Now 19.8 or 21.05: tap the greater one.": "હવે 19.8 કે 21.05: મોટા પર ટૅપ કરો.",
    "Look at the numbers before the points.": "ચિહ્નો પહેલાંની સંખ્યાઓ જુઓ.",
    "Last pair, 30.001 or 29.999: which card is greater?": "છેલ્લી જોડી, 30.001 કે 29.999: કયું કાર્ડ મોટું છે?",
    "Start at the left end of each card.": "દરેક કાર્ડના ડાબા છેડેથી શરૂ કરો.",
    /* phase 2 */
    "Then tenths, then hundredths": "પછી દશાંશ, પછી શતાંશ",
    "The ones match. Which place is next?": "એકમ સરખા છે. હવે કયું સ્થાન?",
    "Tap Compare to read the ones of both cards.": "બંને કાર્ડના એકમ વાંચવા સરખાવો પર ટૅપ કરો.",
    "The Compare key is under the tape.": "સરખાવો બટન ટેપની નીચે છે.",
    "Tap Compare again to read the tenths.": "દશાંશ વાંચવા ફરી સરખાવો પર ટૅપ કરો.",
    "Press the same key once more.": "એ જ બટન એક વાર વધુ દબાવો.",
    "Compare the places after the point, starting with the tenths.": "ચિહ્ન પછીનાં સ્થાનો સરખાવો, દશાંશથી શરૂ કરીને.",
    "Go place by place and stop at the first digits that differ.": "એક પછી એક સ્થાન જુઓ અને પહેલા જુદા અંકો પર અટકો.",
    "If the whole numbers match, the first place that differs decides.": "પૂર્ણ સંખ્યાઓ સરખી હોય તો પહેલું જુદું સ્થાન નક્કી કરે છે.",
    "You learned: equal whole parts? The first place that differs decides": "તમે શીખ્યા: પૂર્ણ ભાગ સરખા હોય તો પહેલું જુદું સ્થાન નક્કી કરે",
    "Tap the greater card, 6.38 or 6.4.": "મોટા કાર્ડ પર ટૅપ કરો, 6.38 કે 6.4.",
    "Check that the whole number parts match.": "જુઓ કે પૂર્ણ સંખ્યાના ભાગ સરખા છે કે નહીં.",
    "Next, 4.51 or 4.53: which one is more?": "આગળ, 4.51 કે 4.53: કયું વધારે છે?",
    "Both start with 4, so look after the point.": "બંને 4થી શરૂ થાય છે, તો ચિહ્ન પછી જુઓ.",
    "One ribbon is 2.64 m and one is 2.6 m long: tap the longer one.": "એક રિબન 2.64 મીટર અને એક 2.6 મીટર લાંબી છે: લાંબી પર ટૅપ કરો.",
    "Which ribbon is longer?": "કઈ રિબન લાંબી છે?",
    "Think of 2.6 as 2.60 if it helps your eye.": "સરળ લાગે તો 2.6ને 2.60 ગણો.",
    /* phase 3 */
    "More digits is not more": "વધુ અંક એટલે વધુ નહીં",
    "More digits. Is it more?": "વધુ અંક. શું તે વધુ છે?",
    "Tap Compare to start at the whole numbers.": "પૂર્ણ સંખ્યાઓથી શરૂ કરવા સરખાવો પર ટૅપ કરો.",
    "Compare is the key at the bottom.": "સરખાવો એ નીચેનું બટન છે.",
    "Tap Compare again for the tenths.": "દશાંશ માટે ફરી સરખાવો પર ટૅપ કરો.",
    "One more press reads the next place.": "એક વાર વધુ દબાવતાં આગલું સ્થાન વંચાશે.",
    "Now tap Measure to lay both ribbons on the tape.": "હવે બંને રિબન ટેપ પર મૂકવા માપો પર ટૅપ કરો.",
    "Measure lays a ruler along the tape.": "માપો ટેપ સાથે ફૂટપટ્ટી મૂકે છે.",
    "The whole numbers match, so compare the tenths.": "પૂર્ણ સંખ્યાઓ સરખી છે, તો દશાંશ સરખાવો.",
    "Count the tenths: the card with more tenths is greater.": "દશાંશ ગણો: જે કાર્ડમાં વધુ દશાંશ છે તે મોટું છે.",
    "More digits after the point does not make a decimal greater.": "ચિહ્ન પછી વધુ અંકો હોવાથી દશાંશ સંખ્યા મોટી થતી નથી.",
    "You learned: more digits after the point does not mean greater": "તમે શીખ્યા: ચિહ્ન પછી વધુ અંક એટલે મોટું નહીં",
    "Tap the card that is greater, 0.7 or 0.625.": "જે કાર્ડ મોટું છે તેના પર ટૅપ કરો, 0.7 કે 0.625.",
    "Read the first digit after each point.": "દરેક ચિહ્ન પછીનો પહેલો અંક વાંચો.",
    "Now 0.79 or 0.8: pick the greater one.": "હવે 0.79 કે 0.8: મોટું પસંદ કરો.",
    "Compare the cards place by place from the left.": "ડાબેથી એક પછી એક સ્થાન લઈ કાર્ડ સરખાવો.",
    "Last pair, 0.587 or 0.6: which one is more?": "છેલ્લી જોડી, 0.587 કે 0.6: કયું વધારે છે?",
    "Begin with the whole numbers, then go right.": "પૂર્ણ સંખ્યાઓથી શરૂ કરો, પછી જમણે જાઓ.",
    /* phase 4 */
    "Putting decimals in order": "દશાંશ સંખ્યાઓને ક્રમમાં ગોઠવવી",
    "Ascending puts the smallest first, and descending the greatest first.": "ચડતા ક્રમમાં સૌથી નાનું પહેલાં, ઊતરતામાં સૌથી મોટું પહેલાં.",
    "Drag the smallest card onto the lowest step.": "સૌથી નાનું કાર્ડ સૌથી નીચલા પગથિયે ખેંચો.",
    "Read each card from the left, place by place.": "દરેક કાર્ડ ડાબેથી, એક પછી એક સ્થાન વાંચો.",
    "Now put the greatest card on the top step.": "હવે સૌથી મોટું કાર્ડ સૌથી ઉપલા પગથિયે મૂકો.",
    "The top step is at the right end.": "સૌથી ઉપલું પગથિયું જમણા છેડે છે.",
    "Put the last card on the middle step.": "છેલ્લું કાર્ડ વચલા પગથિયે મૂકો.",
    "One step is still empty.": "એક પગથિયું હજી ખાલી છે.",
    "Compare the whole number parts, then the tenths.": "પહેલાં પૂર્ણ સંખ્યાના ભાગ, પછી દશાંશ સરખાવો.",
    "Compare each pair of cards on the steps, place by place.": "પગથિયાં પરની દરેક જોડી એક પછી એક સ્થાન સરખાવો.",
    "We order decimals by comparing them place by place.": "ક્રમમાં ગોઠવવા એક પછી એક સ્થાન સરખાવો.",
    "Tap the greater card first.": "પહેલાં મોટા કાર્ડ પર ટૅપ કરો.",
    "Fill every step first.": "પહેલાં દરેક પગથિયું ભરો.",
    "You learned: order decimals by comparing them place by place": "તમે શીખ્યા: એક પછી એક સ્થાન સરખાવીને દશાંશ સંખ્યાઓ ગોઠવવી",
    "Put 3.09, 3.9 and 3.009 in descending order, greatest first.": "3.09, 3.9 અને 3.009ને ઊતરતા ક્રમમાં ગોઠવો, સૌથી મોટું પહેલાં.",
    "Descending order": "ઊતરતો ક્રમ",
    "Descending puts the greatest card first.": "ઊતરતા ક્રમમાં સૌથી મોટું કાર્ડ પહેલું આવે.",
    "This time, 5.06, 5.6 and 0.56 in ascending order, smallest first.": "આ વખતે 5.06, 5.6 અને 0.56 ચડતા ક્રમમાં, સૌથી નાનું પહેલાં.",
    "Ascending order": "ચડતો ક્રમ",
    "Ascending climbs up from the smallest card.": "ચડતો ક્રમ સૌથી નાના કાર્ડથી ઉપર ચડે છે.",
    "Four cards now, 12.4, 1.24, 12.04 and 124: greatest first.": "હવે ચાર કાર્ડ, 12.4, 1.24, 12.04 અને 124: સૌથી મોટું પહેલાં.",
    "Look at the whole number part of each card.": "દરેક કાર્ડનો પૂર્ણ સંખ્યાનો ભાગ જુઓ.",
    /* the win lines (said by Work: not listed by tr-coverage) */
    "15 is more than 8, so 15.2 is greater than 8.96.": "15 એ 8 કરતાં વધારે છે, તેથી 15.2 એ 8.96 કરતાં મોટું છે.",
    "21.05 is greater, because its whole number part is bigger.": "21.05 મોટું છે, કારણ કે તેનો પૂર્ણ સંખ્યાનો ભાગ મોટો છે.",
    "30 beats 29, so the digits after the point never mattered.": "30 એ 29થી મોટું છે, તેથી ચિહ્ન પછીના અંકોથી ફરક ન પડ્યો.",
    "4 tenths beat 3 tenths, so 6.4 is greater than 6.38.": "4 દશાંશ એ 3 દશાંશથી વધુ છે, તેથી 6.4 એ 6.38થી મોટું છે.",
    "The hundredths decided it: 4.53 is greater than 4.51.": "શતાંશે નક્કી કર્યું: 4.53 એ 4.51થી મોટું છે.",
    "4 hundredths beat 0 hundredths, so the 2.64 m ribbon is longer.": "4 શતાંશ એ 0 શતાંશથી વધુ છે, તેથી 2.64 મીટરની રિબન લાંબી છે.",
    "7 tenths beat 6 tenths, so 0.7 is greater than 0.625.": "7 દશાંશ એ 6 દશાંશથી વધુ છે, તેથી 0.7 એ 0.625થી મોટું છે.",
    "0.8 is greater than 0.79, even with fewer digits.": "ઓછા અંકો છતાં 0.8 એ 0.79થી મોટું છે.",
    "0.6 is greater than 0.587, and its ribbon is the longer one.": "0.6 એ 0.587થી મોટું છે, અને તેની રિબન વધુ લાંબી છે.",
    "Greatest first: 3.9, then 3.09, then 3.009.": "સૌથી મોટું પહેલાં: 3.9, પછી 3.09, પછી 3.009.",
    "Smallest first: 0.56, then 5.06, then 5.6, and descending is the other way round.": "સૌથી નાનું પહેલાં: 0.56, પછી 5.06, પછી 5.6, અને ઊતરતો ક્રમ ઊલટો છે.",
    "124 is the greatest, and 1.24 is the smallest.": "124 સૌથી મોટું છે, અને 1.24 સૌથી નાનું છે.",
    /* words the picture draws (tx), and the aria labels */
    "whole number": "પૂર્ણ સંખ્યા", "tenths": "દશાંશ", "hundredths": "શતાંશ", "thousandths": "સહસ્રાંશ",
    "Decides": "નક્કી કરે", "Added zero": "ઉમેરેલું શૂન્ય", "Compare": "સરખાવો", "Measure": "માપો", "New cards": "નવાં કાર્ડ",
    "card": "કાર્ડ", "compare this pair": "આ જોડી સરખાવો", "m": "મી",
  },
};

/* Phases 1-3: kind "pick", `cards` = [top, bottom], the answer is the greater card as written (tapped, then
   Enter: pad "enter"). Phase 4: kind "order", the answer is the ladder read left to right with its sign. */
const PHASES = [
  {
    n: 1,
    concept: "Whole number parts first",
    conceptId: "M2.S4.T9.C40", objectiveIds: ["O15"],
    says: ["Look at the whole numbers first. Is it settled already?"],
    /* on the book's own pair, 12.3 over 9.87 (never on question 1) */
    steps: [{ say: "Tap Compare and watch the whole numbers light up.", on: "compare", hint: "The Compare key is at the bottom." }],
    /* tries, as the plan writes it: First rung: read the two whole number parts. Second rung: say which is greater. Third rung: the same task with one digit after each point. */
    ladder: ["The greater whole number part makes the greater decimal.", "Cover the digits after each point, then compare what is left."],
    closing: "When the whole number parts differ, they decide.",
    learned: "You learned: if the whole number parts differ, they decide",
    traceback: "Compare walks from the left: the whole number parts light amber and decide, the ribbons are laid to scale, the greater card is ringed and the sign is written.",
    items: [
      /* learn DC1: answer in the plan = 15.2, because 15 > 8 */
      { qid: "M2.S4.T9.C40:DC1", kind: "pick", cards: ["15.2", "8.96"], answer: "15.2", pad: "enter", winMs: 3000,
        say: "Tap the card that is greater, 15.2 or 8.96.", ask: "Which is greater?",
        miss: "Read the two whole number parts." },
      /* practice 1: answer in the plan = 21.05, because 21 > 19 */
      { qid: "M2.S4.T9.C40:1", kind: "pick", cards: ["19.8", "21.05"], answer: "21.05", pad: "enter", winMs: 3000,
        say: "Now 19.8 or 21.05: tap the greater one.", ask: "Which is greater?",
        miss: "Look at the numbers before the points." },
      /* practice 8: answer in the plan = 30.001, because 30 > 29. The digits after the point do not matter */
      /* no ribbons for this pair: 0.002 apart is invisible on the tape, so the place walk is the proof (main session) */
      { qid: "M2.S4.T9.C40:8", kind: "pick", cards: ["30.001", "29.999"], ribbons: false, answer: "30.001", pad: "enter", winMs: 3000,
        say: "Last pair, 30.001 or 29.999: which card is greater?", ask: "Which is greater?",
        miss: "Start at the left end of each card." },
    ],
  },
  {
    n: 2,
    concept: "Then tenths, then hundredths",
    conceptId: "M2.S4.T9.C41", objectiveIds: ["O15"],
    says: ["The ones match. Which place is next?"],
    /* on the book's own pair, 4.72 over 4.8 */
    steps: [
      { say: "Tap Compare to read the ones of both cards.", on: "compare", hint: "The Compare key is under the tape." },
      { say: "Tap Compare again to read the tenths.", on: "compare", hint: "Press the same key once more." },
    ],
    /* tries, as the plan writes it: First rung: check that the whole number parts match. Second rung: compare the tenths. Third rung: the same task where the tenths already differ, before the hundredths are needed. */
    ladder: ["Compare the places after the point, starting with the tenths.", "Go place by place and stop at the first digits that differ."],
    closing: "If the whole numbers match, the first place that differs decides.",
    learned: "You learned: equal whole parts? The first place that differs decides",
    traceback: "Compare walks from the left: the matching ones fade, the first place after the point that differs lights amber, the ribbons are laid to scale and the sign is written.",
    items: [
      /* learn DC2: answer in the plan = 6.4 */
      { qid: "M2.S4.T9.C41:DC2", kind: "pick", cards: ["6.38", "6.4"], answer: "6.4", pad: "enter", winMs: 3000,
        say: "Tap the greater card, 6.38 or 6.4.", ask: "Which is greater?",
        miss: "Check that the whole number parts match." },
      /* practice 2: answer in the plan = 4.53. The ones and the tenths match, and 3 hundredths is more than 1 hundredth */
      { qid: "M2.S4.T9.C41:2", kind: "pick", cards: ["4.51", "4.53"], answer: "4.53", pad: "enter", winMs: 3000,
        say: "Next, 4.51 or 4.53: which one is more?", ask: "Which is greater?",
        miss: "Both start with 4, so look after the point." },
      /* practice 4: answer in the plan = The 2.64 m ribbon. The ones and the tenths match, and 4 hundredths is more than 0 hundredths
         plan: One ribbon is 2.64 m long and another is 2.6 m long. Which is longer? */
      { qid: "M2.S4.T9.C41:4", kind: "pick", cards: ["2.64", "2.6"], unit: "m", answer: "2.64", pad: "enter", winMs: 3000,
        say: "One ribbon is 2.64 m and one is 2.6 m long: tap the longer one.", ask: "Which ribbon is longer?",
        miss: "Think of 2.6 as 2.60 if it helps your eye." },
    ],
  },
  {
    n: 3,
    concept: "More digits is not more",
    conceptId: "M2.S4.T9.C42", objectiveIds: ["O15"],
    says: ["More digits. Is it more?"],
    /* on the book's own pair, 0.9 over 0.345 */
    steps: [
      { say: "Tap Compare to start at the whole numbers.", on: "compare", hint: "Compare is the key at the bottom." },
      { say: "Tap Compare again for the tenths.", on: "compare", hint: "One more press reads the next place." },
      { say: "Now tap Measure to lay both ribbons on the tape.", on: "measure", hint: "Measure lays a ruler along the tape." },
    ],
    /* tries, as the plan writes it: First rung: compare the tenths only. Second rung: look at the bars. Third rung: the same task with one digit after each point. */
    ladder: ["The whole numbers match, so compare the tenths.", "Count the tenths: the card with more tenths is greater."],
    closing: "More digits after the point does not make a decimal greater.",
    learned: "You learned: more digits after the point does not mean greater",
    traceback: "Compare walks from the left and the tenths decide; the ribbons are laid to scale and the longer decimal's ribbon is seen to stop first; the sign is written.",
    stepHold: 2200,
    items: [
      /* learn DC3: answer in the plan = 0.7 */
      { qid: "M2.S4.T9.C42:DC3", kind: "pick", cards: ["0.7", "0.625"], answer: "0.7", pad: "enter", winMs: 3000,
        say: "Tap the card that is greater, 0.7 or 0.625.", ask: "Which is greater?",
        miss: "Read the first digit after each point." },
      /* practice 3: answer in the plan = 0.8, because 8 tenths is more than 7 tenths */
      { qid: "M2.S4.T9.C42:3", kind: "pick", cards: ["0.79", "0.8"], answer: "0.8", pad: "enter", winMs: 3000,
        say: "Now 0.79 or 0.8: pick the greater one.", ask: "Which is greater?",
        miss: "Compare the cards place by place from the left." },
      /* practice 6: answer in the plan = 0.6, because 6 tenths is more than 5 tenths */
      { qid: "M2.S4.T9.C42:6", kind: "pick", cards: ["0.587", "0.6"], answer: "0.6", pad: "enter", winMs: 3000,
        say: "Last pair, 0.587 or 0.6: which one is more?", ask: "Which is greater?",
        miss: "Begin with the whole numbers, then go right." },
    ],
  },
  {
    n: 4,
    concept: "Putting decimals in order",
    conceptId: "M2.S4.T9.C43", objectiveIds: ["O16"],
    says: ["Ascending puts the smallest first, and descending the greatest first."],
    /* on the book's own row, 2.07, 2.7 and 2.075, ascending (the staircase climbs) */
    steps: [
      { say: "Drag the smallest card onto the lowest step.", on: "dcard-1", hint: "Read each card from the left, place by place." },
      { say: "Now put the greatest card on the top step.", on: "dcard-2", hint: "The top step is at the right end." },
      { say: "Put the last card on the middle step.", on: "dcard-3", hint: "One step is still empty." },
    ],
    /* tries, as the plan writes it: First rung: find the smallest card. Second rung: find the greatest. Third rung: the same task with three cards, before four return. */
    ladder: ["Compare the whole number parts, then the tenths.", "Compare each pair of cards on the steps, place by place."],
    closing: "We order decimals by comparing them place by place.",
    learned: "You learned: order decimals by comparing them place by place",
    traceback: "Each pair's first differing place lights amber on the ladder, the lowest step is ringed, and the right order is written above the ladder.",
    items: [
      /* learn DC4: answer in the plan = 3.9, 3.09, 3.009 */
      { qid: "M2.S4.T9.C43:DC4", kind: "order", cards: ["3.09", "3.9", "3.009"], dir: "desc", pad: "enter",
        answer: "3.9>3.09>3.009", near: "3.009>3.09>3.9", winMs: 3400,
        say: "Put 3.09, 3.9 and 3.009 in descending order, greatest first.", ask: "Descending order",
        miss: "Descending puts the greatest card first." },
      /* practice 5: answer in the plan = 0.56 < 5.06 < 5.6 */
      { qid: "M2.S4.T9.C43:5", kind: "order", cards: ["5.06", "5.6", "0.56"], dir: "asc", pad: "enter",
        answer: "0.56<5.06<5.6", near: "5.6<5.06<0.56", winMs: 3400,
        say: "This time, 5.06, 5.6 and 0.56 in ascending order, smallest first.", ask: "Ascending order",
        miss: "Ascending climbs up from the smallest card." },
      /* practice 7: answer in the plan = 124 > 12.4 > 12.04 > 1.24 */
      { qid: "M2.S4.T9.C43:7", kind: "order", cards: ["12.4", "1.24", "12.04", "124"], dir: "desc", pad: "enter",
        answer: "124>12.4>12.04>1.24", near: "1.24>12.04>12.4>124", winMs: 3400,
        say: "Four cards now, 12.4, 1.24, 12.04 and 124: greatest first.", ask: "Descending order",
        miss: "Look at the whole number part of each card." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  places: ["whole number", "tenths", "hundredths", "thousandths"],
  /* the guide steps' own examples (the textbook's), so no step solves a question */
  teach: { 1: { cards: ["12.3", "9.87"] }, 2: { cards: ["4.72", "4.8"] }, 3: { cards: ["0.9", "0.345"] }, 4: { cards: ["2.07", "2.7", "2.075"], dir: "asc" } },
  freeSets: [
    { cards: ["0.5", "0.45"] }, { cards: ["2.07", "2.7", "2.075", "2.705"], dir: "asc" },
    { cards: ["9.9", "10.01"] }, { cards: ["1.1", "1.01", "1.001", "1.11"], dir: "desc" },
    { cards: ["3.06", "3.6"] }, { cards: ["3.6", "3.06", "36", "0.36"], dir: "asc" },
  ],
  compare: { cardsX: 24, wholeW: 250, pointW: 44, placeW: 230, cardH: 96, yTop: 46, yBottom: 150, tapeY: 362 },
  ladder: { card: [210, 88], gap: 100, rise: 56, floor: 426 },
};

/* ── decimals, place by place (the picture's route; names start with dc so they never meet the runtime's) ── */
const dcSplit = (s: any) => { const t = String(s ?? ""); const i = t.indexOf("."); return i < 0 ? { w: t, d: "" } : { w: t.slice(0, i), d: t.slice(i + 1) }; };
/* the digit at place p (0 = the whole number part, 1 tenths, 2 hundredths, 3 thousandths); an empty place reads 0 */
const dcPlace = (s: any, p: number) => { const { w, d } = dcSplit(s); return p === 0 ? parseInt(w || "0", 10) : d[p - 1] === undefined ? 0 : Number(d[p - 1]); };
/* the first place from the left where a and b differ, and the sign between them (a, then b) */
const dcFirstDiff = (a: any, b: any) => {
  for (let p = 0; p <= 3; p++) { const x = dcPlace(a, p), y = dcPlace(b, p); if (x !== y) return { p, sign: x > y ? ">" : "<" }; }
  return { p: -1, sign: "=" };
};
/* how many places Compare lights before it stops (equal decimals: every place either one has) */
const dcStop = (a: any, b: any) => { const f = dcFirstDiff(a, b); return f.p >= 0 ? f.p + 1 : 1 + Math.max(dcSplit(a).d.length, dcSplit(b).d.length); };
/* the tape: the stretch the two ribbons are laid on, to scale */
const dcTape = (a: any, b: any) => {
  const wa = dcPlace(a, 0), wb = dcPlace(b, 0);
  if (wa === wb) return { lo: wa, hi: wa + 1, step: 0.1, tenths: true };
  const top = Math.max(wa, wb) + 1;
  const step = [1, 2, 5, 10, 20, 50, 100, 200, 500].find((s) => top / s <= 11) || 1000;
  return { lo: 0, hi: Math.ceil(top / step) * step, step, tenths: false };
};
/* the oracle's own route: thousandths as whole numbers */
const dcScaled = (s: any) => { const m = /^(\d+)(?:\.(\d{1,3}))?$/.exec(String(s)); return m ? Number(m[1]) * 1000 + Number(((m[2] || "") + "000").slice(0, 3)) : NaN; };

const DC_INK = { blue: shade(CONTENT.hundred, 0.25), amber: shade(CONTENT.ten, 0.42), green: shade(CONTENT.one, 0.3), violet: shade(CONTENT.bead, 0.35), grey: "#767676" };
const DC_TAPE = "#F3DD8A";
/* the tap cue on the cards: a solid, steady outline in the berry of the tool's Enter key (the image pass's theme; the
   runtime's default berry when there is none), so it reads as "tap here", never as an empty slot */
const DC_BERRY = () => {
  try { const th: any = typeof TOOL_THEME !== "undefined" ? TOOL_THEME : null; if (th && Array.isArray(th.enter) && th.enter[1]) return th.enter[1]; } catch (e) { /* no theme */ }
  return "#BE1F78";
};
/* a matching place fades, but never below 3.4:1 on white (large digits), so it still reads */
const dcLum = (hex: string) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((x) => (x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const dcFade = (hex: string) => { let t = 0.5; while (t > 0 && 1.05 / (dcLum(mix(hex, "#ffffff", t)) + 0.05) < 3.4) t -= 0.05; return mix(hex, "#ffffff", Math.max(t, 0)); };

/* the compare layout (working-area units) */
/* rows (hi/gu-safe pitch, 14+ between rows): place names 40 · cards 62-154 and 166-258 · Decides 300 · ribbons 326-360 and 378-412 ·
   tape 428-476; the compare view's one key stands at the right end of the tape row (a key row under the tape does not fit 520) */
const DC_C = { x0: 24, wholeW: 250, ptW: 44, decW: 230, pad: 24, aY: 62, bY: 166, h: 92, lblY: 40, decY: 300, barA: 326, barB: 378, barH: 34, tapeY: 428, tapeH: 48, keyY: 410, keyW: 300, keyH: 80, rowKeyY: 440 };
/* a bold < or > drawn as a stroke, filling about 60% of its circle */
const dcSign = (cx: number, cy: number, r: number, sign: string, colour: string) => {
  const s = r * 0.42, d = sign === ">" ? 1 : -1;
  return <path d={`M ${cx - d * s * 0.62} ${cy - s} L ${cx + d * s * 0.62} ${cy} L ${cx - d * s * 0.62} ${cy + s}`} fill="none" stroke={colour} strokeWidth={r * 0.2} strokeLinecap="round" strokeLinejoin="round" />;
};
/* a row of decimals with the drawn sign between each pair ("3.9 > 3.09 > 3.009"), centred on cx, baseline y. Each number's
   width is MEASURED once drawn (and again when the font has loaded), so every sign sits exactly midway between its two
   numbers; the first frame uses an estimate (Poppins bold: a digit 0.66 em, the point 0.18 em) */
const dcAdv = (t: string, fs: number) => [...t].reduce((a, ch) => a + (ch === "." ? 0.18 : 0.66), 0) * fs;
function DcRow({ s, cx, y, fs, r }: any) {
  const g = s.includes(">") ? ">" : "<", cs = s.split(g), key = s + "|" + fs;
  const refs = useRef<any[]>([]);
  const [wd, setWd] = useState<any>(null);
  useEffect(() => {
    let alive = true;
    const measure = () => {
      if (!alive) return;
      try {
        const ws = cs.map((_: any, j: number) => { const el = refs.current[j]; return el && el.getBBox ? el.getBBox().width : 0; });
        if (ws.every((v: number) => v > 0))
          setWd((p: any) => (p && p.key === key && p.ws.every((v: number, j: number) => Math.abs(v - ws[j]) < 0.5) ? p : { key, ws }));
      } catch (e) { /* not laid out yet: the estimate stands */ }
    };
    measure();
    const f: any = (window.document as any).fonts;
    if (f && f.ready) f.ready.then(measure);
    return () => { alive = false; };
  }, [key]);
  const ws: number[] = wd && wd.key === key ? wd.ws : cs.map((c: string) => dcAdv(c, fs));
  const gw = r * 1.3, total = ws.reduce((a: number, b: number) => a + b, 0) + (cs.length - 1) * gw;
  let x = cx - total / 2;
  const out: any[] = [];
  cs.forEach((c: string, j: number) => {
    if (j) { out.push(<g key={"s" + j}>{dcSign(x + gw / 2, y - fs * 0.36, r, g, DC_INK.green)}</g>); x += gw; }
    out.push(<text key={"c" + j} ref={(el: any) => { refs.current[j] = el; }} x={x} y={y} textAnchor="start" fontSize={fs} fontWeight={700} fill={DC_INK.blue}>{c}</text>);
    x += ws[j];
  });
  return <g>{out}</g>;
}
/* a sign circle that is a control: Enter passes on to answer once the ladder is full (PATTERNS §5b) */
function DcPairTap({ id, x, y, w, h, label, onPress, passEnter }: any) {
  const p = usePress(onPress || (() => {}), true);
  return (
    <g className={"c4-ctl" + (p.down ? " is-down" : "")} data-control={id} role="button" aria-label={label} tabIndex={0} {...p.bind()}
      onKeyDown={(e: any) => { if (e.key === "Enter" && passEnter && passEnter()) return; p.keys(e); }}>
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill="transparent" />
    </g>
  );
}
const dcColX = (p: number) => (p === 0 ? [DC_C.x0, DC_C.x0 + DC_C.wholeW] : [DC_C.x0 + DC_C.wholeW + DC_C.ptW + (p - 1) * DC_C.decW, DC_C.x0 + DC_C.wholeW + DC_C.ptW + p * DC_C.decW]);
const dcColC = (p: number) => { const c = dcColX(p); return (c[0] + c[1]) / 2; };
const dcMidY = (DC_C.aY + DC_C.h + DC_C.bY) / 2;
/* the ladder layout: a staircase that climbs for ascending and falls for descending */
const DC_L = { w: 230, h: 96, gap: 130, rise: 56, low: 386, floor: 426, waitY: 6 };
const dcLev = (N: number, r: number, dir: string) => (dir === "asc" ? r : N - 1 - r);

/* the line printed when a question is won: one literal a question */
const dcSayWin = (api: any, q: string) => {
  if (q === "M2.S4.T9.C40:DC1") api.say("15 is more than 8, so 15.2 is greater than 8.96.");
  else if (q === "M2.S4.T9.C40:1") api.say("21.05 is greater, because its whole number part is bigger.");
  else if (q === "M2.S4.T9.C40:8") api.say("30 beats 29, so the digits after the point never mattered.");
  else if (q === "M2.S4.T9.C41:DC2") api.say("4 tenths beat 3 tenths, so 6.4 is greater than 6.38.");
  else if (q === "M2.S4.T9.C41:2") api.say("The hundredths decided it: 4.53 is greater than 4.51.");
  else if (q === "M2.S4.T9.C41:4") api.say("4 hundredths beat 0 hundredths, so the 2.64 m ribbon is longer.");
  else if (q === "M2.S4.T9.C42:DC3") api.say("7 tenths beat 6 tenths, so 0.7 is greater than 0.625.");
  else if (q === "M2.S4.T9.C42:3") api.say("0.8 is greater than 0.79, even with fewer digits.");
  else if (q === "M2.S4.T9.C42:6") api.say("0.6 is greater than 0.587, and its ribbon is the longer one.");
  else if (q === "M2.S4.T9.C43:DC4") api.say("Greatest first: 3.9, then 3.09, then 3.009.");
  else if (q === "M2.S4.T9.C43:5") api.say("Smallest first: 0.56, then 5.06, then 5.6, and descending is the other way round.");
  else if (q === "M2.S4.T9.C43:7") api.say("124 is the greatest, and 1.24 is the smallest.");
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a pick is the greater decimal as written ("0.70" names the same card and is taken, ".7" is not);
   an order is the ladder read left to right with its sign */
const judge = (item: any, v: any) => {
  const s = String(v ?? "").replace(/\s+/g, "");
  if (item.kind === "order") return s === item.answer;
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(s)) return false;
  return s === item.answer || Number(s) === Number(item.answer);
};
/* oracle: every answer re-derived by a second route (thousandths as whole numbers, then sorted) */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "order") {
    const s = it.cards.slice().sort((x: string, y: string) => (it.dir === "asc" ? dcScaled(x) - dcScaled(y) : dcScaled(y) - dcScaled(x)));
    return s.join(it.dir === "asc" ? "<" : ">") === it.answer;
  }
  return (dcScaled(it.cards[0]) > dcScaled(it.cards[1]) ? it.cards[0] : it.cards[1]) === it.answer;
}));
/* the most likely wrong answer (the misconception): the other card; the order read the wrong way */
const nearMiss = (item: any) => (item.kind === "order" ? item.near : item.answer === item.cards[0] ? item.cards[1] : item.cards[0]);
/* the forms of an answer no question, hint or ladder line may print: a pick names both cards in its own
   question, so what gives it away is the comparison written out, never the card alone */
const answerForms = (item: any) => {
  if (item.kind === "order") {
    const sg = item.answer.includes(">") ? ">" : "<", cs = item.answer.split(sg);
    return [cs.join(" " + sg + " "), item.answer, cs.join(", ")];
  }
  const lo = item.answer === item.cards[0] ? item.cards[1] : item.cards[0];
  return [item.answer + " > " + lo, lo + " < " + item.answer, item.answer + " is greater", lo + " is less"];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer(): a card is picked, a ladder is set, as a child would */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: undefined = press Enter (in the demo stage it reaches api.onEnter: the step) */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* a two-way control that says whether it is on (aria-pressed) */
function DcToggle({ id, x, y, w, h, C, on, label, onPress, enabled = true, children }: any) {
  const p = usePress(onPress || (() => {}), enabled);
  const base = on ? shade(C.accent, 0.28) : shade(C.rule, 0.08);
  return (
    <g className={"c4-ctl" + (!enabled ? " is-off" : "") + (p.down ? " is-down" : "")} data-control={id} role="button"
      aria-label={label} aria-pressed={on ? "true" : "false"} aria-disabled={enabled ? undefined : "true"} tabIndex={enabled ? 0 : -1}
      {...(enabled ? p.bind() : {})} onKeyDown={p.keys}>
      {enabled && <rect x={x} y={y + EDGE} width={w} height={h} rx={RAD.key} fill={base} />}
      <g className="c4-body" style={{ transform: `translateY(${enabled && p.down ? EDGE : 0}px)` } as any}>
        <rect className="c4-face" x={x} y={y} width={w} height={h} rx={RAD.key}
          fill={!enabled ? tint(C.panel, 0.55) : on ? "url(#gAccent)" : "url(#gKey)"}
          stroke={!enabled ? tint(C.rule, 0.35) : on ? shade(C.accent, 0.18) : C.rule} strokeWidth={2} />
        {enabled && <path d={`M ${x + RAD.key} ${y + 3} H ${x + w - RAD.key}`} stroke="#FFFFFF" strokeOpacity={on ? 0.4 : 0.95} strokeWidth={3} strokeLinecap="round" />}
        <text x={x + w / 2} y={y + h / 2 + 11} textAnchor="middle" fontSize={T.label} fontWeight={700}
          fill={!enabled ? mix(C.ink, C.panel, 0.5) : on ? "#FFFFFF" : C.ink}>{children}</text>
      </g>
    </g>
  );
}

/* ── the working area: 1472 x 520 (keyOnly), origin at its top-left; nothing under box.key ────── */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();   /* the traceback */
  const tl2 = useTimeline();  /* a ribbon sliding in to its true length (the delight) */
  const free = stage === "free";
  const isDemo = stage === "demo";
  const it: any = (!free && item) || {};
  const [fset, setFset] = useState(0);
  const teach: any = (MODEL.teach || {})[n] || {};
  const FS: any = MODEL.freeSets[fset % MODEL.freeSets.length];
  /* what is on the board: free play's set, the steps' own example, or the question's cards */
  const cards: string[] = free ? FS.cards : isDemo ? teach.cards || [] : it.cards || [];
  const askDir: string = free ? FS.dir || "asc" : isDemo ? teach.dir || "asc" : it.dir || "asc";
  const unit = !free && !isDemo ? it.unit || "" : "";
  const pick = cards.length === 2, order = cards.length > 2;
  const qKey = free ? "free:" + fset : n + ":" + index + (isDemo ? ":demo" : "");
  const Wd = box ? box.w : W.w;
  const kx = box && box.key ? box.key.x - 12 : Wd;

  /* the board in hand; a new question (or the step's example giving way to the question) starts fresh */
  const fresh = (q: string) => ({ q, walk: 0, shown: 0, measured: false, growK: -1, grow: 1, picked: null, demo: null,
    rungs: cards.map(() => null), pairLit: {}, carry: -1, sent: false });
  const [S0, setS] = useState<any>(() => fresh(qKey));
  const SRef = useRef<any>(S0);
  const S = S0.q === qKey ? S0 : fresh(qKey);
  const cur = () => (SRef.current.q === qKey ? SRef.current : fresh(qKey));
  const put = (patch: any) => {
    const c = cur();
    const nx = { ...c, ...(typeof patch === "function" ? patch(c) : patch) };
    SRef.current = nx; setS(nx);
  };
  /* timed steps and acts write only into the board they were started for */
  const putIf = (q: string) => (patch: any) => {
    if (SRef.current.q !== q) return;
    const c = SRef.current;
    const nx = { ...c, ...(typeof patch === "function" ? patch(c) : patch) };
    SRef.current = nx; setS(nx);
  };
  useEffect(() => {
    if (SRef.current.q === qKey) return;
    tl.stop(); tl2.stop();
    const f = fresh(qKey);
    SRef.current = f; setS(f);
  }, [qKey]);

  const playing = useRef(false);
  /* a "first" nudge on the bubble (Enter too early): the child's next pick or placement puts the question back */
  const nudgeUp = useRef<any>(null);
  const unNudge = () => {
    if (nudgeUp.current !== qKey) return;
    nudgeUp.current = null;
    if (stage === "ask" && it.say) api.say(it.say);
  };
  const lastKey = useRef(0);
  const lastEnter = useRef(0);
  const lastTap = useRef<any>({ on: "", t: 0 });
  const did = (x: string) => { if (!free) api.did(x); };
  /* when an act ends, the keyboard stays where the child is: on the control that is live next */
  const focusOn = (ids: string[]) => !isDemo && setTimeout(() => {   /* never after a guide step: focus must not carry into the question */
    for (const id of ids) {
      const el: any = window.document.querySelector('[data-control="' + id + '"]');
      if (el && el.focus && el.getAttribute("aria-disabled") !== "true") { el.focus({ preventScroll: true }); return; }
    }
  }, 40);
  const live = free || stage === "ask" || (isDemo && !!stepOn);
  /* At a question the helpers that show which card is greater (Compare, Measure, a pair's compare) wait for the first miss
     or the header's Hint key; the guide steps, the correction and free play have them always. Work is told of no Hint key
     press, so the bubble's hint is read off toolApi.getState() and latched for the question (a runtime gap, reported). */
  const hintSeen = useRef<any>({ q: "", on: false });
  if (hintSeen.current.q !== qKey) hintSeen.current = { q: qKey, on: false };
  if (stage === "ask" && !hintSeen.current.on) {
    try {
      const T0: any = (window as any).toolApi, g = T0 && T0.getState ? T0.getState() : null;
      if (g && g.hint && g.hintKind !== "type") hintSeen.current.on = true;
    } catch (e) { /* no host api: the first miss still opens the helpers */ }
  }
  const helpOn = stage !== "ask" || (wrong && wrong.tries >= 1) || hintSeen.current.on;

  /* ── the compare geometry ── */
  const A = cards[0], B = cards[1];
  const maxD = pick ? Math.max(1, dcSplit(A).d.length, dcSplit(B).d.length) : 1;
  const cw = DC_C.wholeW + DC_C.ptW + maxD * DC_C.decW + DC_C.pad + (unit ? 80 : 0);
  /* the cards and their sign stand centred, the top card clear of the key's corner */
  const ox = Math.max(0, Math.round(Math.min((Wd - cw - 130) / 2 - DC_C.x0, kx - 8 - (DC_C.x0 + cw + 6))));
  const stop = pick ? dcStop(A, B) : 0;
  const tp = pick ? dcTape(A, B) : { lo: 0, hi: 1, step: 0.1, tenths: true };
  /* the tape ends 40 past its last tick and 24 short of the key at the right end of its row */
  const TX0 = 150, TX1 = Wd - 12 - DC_C.keyW - 24 - 40;
  const X = (v: number) => TX0 + Math.min(Math.max((v - tp.lo) / (tp.hi - tp.lo), 0), 1) * (TX1 - TX0);
  const byLen = [0, 1].sort((i, j) => Number(cards[i]) - Number(cards[j]));   /* the ribbons in the order the ruler reaches them */
  /* ribbons to scale, except where the difference cannot be seen on the tape (C40:8, 0.002 apart): the place walk is the proof there */
  const ribbons = free || isDemo || it.ribbons !== false;

  /* ── the ladder geometry ── */
  const N = cards.length;
  const ladX0 = (Wd - (N * DC_L.w + (N - 1) * DC_L.gap)) / 2;
  const rungX = (r: number) => ladX0 + r * (DC_L.w + DC_L.gap);
  const stepTop = (r: number) => DC_L.low - dcLev(N, r, askDir) * DC_L.rise;
  const rungY = (r: number) => stepTop(r) - DC_L.h - 6;
  const waitX = (k: number) => 24 + k * (DC_L.w + 20);
  const signCx = (r: number) => rungX(r) + DC_L.w + DC_L.gap / 2;
  /* in the gap, above the riser between the two steps (never straddling it) */
  const signCy = (r: number) => Math.min(stepTop(r), stepTop(r + 1)) - 36 - 14;
  const firstEmpty = (rungs: any[]) => rungs.indexOf(null);   /* the ladder fills in reading order: greatest first when descending */
  /* the rung each card belongs on in the ladder asked for (the steps' targets) */
  const rankOf = (k: number) => {
    const sorted = cards.map((_: any, j: number) => j).sort((i: number, j: number) => dcScaled(cards[i]) - dcScaled(cards[j]));
    const lv = sorted.indexOf(k);
    return askDir === "asc" ? lv : N - 1 - lv;
  };
  const cardHome = (k: number, rungs: any[]) => {
    const r = rungs.indexOf(k);
    return r >= 0 ? { x: rungX(r), y: rungY(r) } : { x: waitX(k), y: DC_L.waitY };
  };

  /* ── every act the child (or Enter, or the agent) does goes through here ── */
  const place = (k: number, to: any, q: string) => {
    const P = putIf(q), c = SRef.current.q === q ? SRef.current : cur();
    const rungs = c.rungs.slice(), from = rungs.indexOf(k);
    if (to === "wait") { if (from < 0) return; rungs[from] = null; }
    else { const occ = rungs[to]; if (from >= 0) rungs[from] = occ === undefined ? null : occ; rungs[to] = k; }
    P({ rungs, pairLit: {}, demo: null, sent: false, carry: -1 });
    api.sfx.tick();
    if (!free && stage === "ask") { api.answerReady(rungs.every((x: any) => x !== null)); unNudge(); }
  };
  /* a tap or drop that comes while an act plays waits for it (a second carry), never vanishes */
  const pending = useRef<any>(null);
  const endAct = () => {
    playing.current = false;
    const p = pending.current;
    pending.current = null;
    if (p) setTimeout(() => (typeof p === "function" ? p() : act(p)), 0);
  };
  const act = async (on: any) => {
    if (!on || !live || cur().fixing) return;                        /* nothing moves while the correction plays */
    if (playing.current) {
      if ((on === "card-a" || on === "card-b") && stage === "ask") { /* a pick is not part of the act: taken at once */ }
      else { if (/^dcard-/.test(on) && !isDemo) pending.current = on; return; }
    }
    const t = Date.now();
    if (lastTap.current.on === on && t - lastTap.current.t < 350) return;   /* a double tap on the same piece is one tap */
    lastTap.current = { on, t };
    const s = cur(), q = qKey, P = putIf(q);
    if (isDemo && on !== stepOn) { did(on); return; }              /* a wrong act in a step: its hint, nothing moves */
    if (!helpOn && (on === "compare" || on === "measure" || /^pair-/.test(on))) return;   /* not before the first miss or a hint */

    if (on === "compare") {                                        /* the hand points at the next place from the left */
      if (!pick || s.walk >= stop) { did(on); return; }
      const p = s.walk;
      playing.current = true;
      const ok = await api.act({ tool: "hand", moves: "tap", at: [{ x: ox + dcColC(p), y: dcMidY }], onPoint: () => { P({ walk: p + 1, demo: null }); api.sfx.tick(); } });
      endAct();
      if (ok !== true) return;
      P({ walk: p + 1 }); did(on); focusOn([p + 1 >= stop ? "measure" : "compare"]); return;
    }
    if (on === "measure") {                                        /* the ruler slides along the tape; the ribbons are laid to scale */
      if (!pick || !ribbons || s.walk < stop || s.measured) { did(on); return; }
      const soft = !reducedMotion();
      playing.current = true;
      /* the delight: each ribbon slides in from the left as the ruler reaches it, and stops at its true length (never past it) */
      const ok = await api.act({ tool: "ruler", moves: "slide", from: { x: TX0, y: DC_C.tapeY }, to: { x: TX1, y: DC_C.tapeY },
        at: byLen.map((k: number) => ({ x: X(Number(cards[k])), y: DC_C.tapeY })),
        onPoint: (i: number) => {
          P({ shown: i + 1, growK: soft ? byLen[i] : -1, grow: soft ? 0.2 : 1, demo: null }); api.sfx.tick();
          if (soft) tl2.run([0.4, 0.6, 0.78, 0.9, 1].map((f: number) => [55, () => P({ grow: f })]));
        } });
      endAct();
      if (ok !== true) return;
      P({ shown: 2, measured: true }); api.sfx.settle(); did(on);
      return;
    }
    if (on === "card-a" || on === "card-b") {                      /* a pick: the greater card, then Enter */
      if (stage !== "ask") { did(on); return; }
      P({ picked: on === "card-a" ? 0 : 1, demo: null, sent: false }); api.sfx.tick(); did(on); unNudge();
      api.answerReady(true);
      return;
    }
    if (/^dcard-\d$/.test(on)) {                                   /* a tap on a ladder card: the hand carries it */
      const k = Number(on.slice(6)) - 1;
      if (k < 0 || k >= N) return;
      const from = s.rungs.indexOf(k);
      if (from >= 0) { if (isDemo) { did("place"); return; } place(k, "wait", q); did(on); return; }
      const to = isDemo ? rankOf(k) : firstEmpty(s.rungs);
      if (to < 0 || s.rungs[to] !== null) { did("place"); return; }
      const h0 = cardHome(k, s.rungs);
      playing.current = true;
      P({ carry: k });
      const ok = await api.act({ tool: "hand", moves: "carry", from: { x: h0.x + DC_L.w / 2, y: h0.y + DC_L.h / 2 },
        at: [{ x: rungX(to) + DC_L.w / 2, y: rungY(to) + DC_L.h / 2 }], hold: ladFace(k, -DC_L.w / 2, -DC_L.h / 2, {}, false) });
      if (ok !== true) { P({ carry: -1 }); endAct(); return; }
      place(k, to, q); did(on); endAct(); focusOn([on]); return;
    }
    if (/^pair-\d$/.test(on)) {                                    /* the hand points at a sign: that pair is compared */
      const r = Number(on.slice(5)) - 1, a = cards[s.rungs[r]], b = cards[s.rungs[r + 1]];
      if (a === undefined || b === undefined) { did(on); return; }
      playing.current = true;
      const ok = await api.act({ tool: "hand", moves: "tap", at: [{ x: signCx(r), y: signCy(r) }] });
      endAct();
      if (ok !== true) return;
      P((c: any) => ({ pairLit: { ...c.pairLit, [r]: dcFirstDiff(a, b).p }, demo: null })); api.sfx.tick(); did(on);
      /* the keyboard goes on to Enter (never back onto the sign), or to the next card still waiting */
      const wk = cur().rungs.every((x: any) => x !== null) ? -1 : cards.findIndex((_: any, j: number) => cur().rungs.indexOf(j) < 0);
      focusOn(["answer-enter"].concat(wk >= 0 ? ["dcard-" + (wk + 1)] : []));
      return;
    }
    if (on === "new-cards" && free) { setFset((f: number) => (f + 1) % MODEL.freeSets.length); api.sfx.tick(); }
  };
  /* the one key: a 400 ms guard, so one tap never also presses the next label */
  const pressKey = (on: string) => {
    const t = Date.now();
    if (t - lastKey.current < 400) return;
    lastKey.current = t;
    act(on);
  };

  /* drag a ladder card onto a step (a tap, Enter or Space is the carry above) */
  const dragStart = useRef<any>(null);
  const drag = useDrag((pay: any, at: any, moved: boolean) => {
    if (!order || !live || cur().fixing) return;
    const k = pay.k, name = "dcard-" + (k + 1);
    if (!moved || !at || !isFinite(at.x) || !isFinite(at.y)) { act(name); return; }
    const drop = () => {
      const s = cur();
      let to: any = null;
      for (let r = 0; r < N; r++) {
        const x = rungX(r), y = rungY(r);
        if (at.x >= x - 30 && at.x <= x + DC_L.w + 30 && at.y >= y - 40 && at.y <= y + DC_L.h + 40) { to = r; break; }
      }
      if (to === null && at.y < 110) to = "wait";
      /* a guide step: any drop that is not its act (the wrong card, the wrong step, between the steps, the wait row) shows its hint */
      if (isDemo && (name !== stepOn || to === null || to === "wait" || to !== rankOf(k) || s.rungs[to] !== null)) { did(name !== stepOn ? name : "place"); return; }
      if (to === null || to === s.rungs.indexOf(k) || (to === "wait" && s.rungs.indexOf(k) < 0)) return;
      place(k, to, qKey); did(name);
    };
    if (playing.current) { if (!isDemo) pending.current = drop; return; }   /* lands once the carry in hand has landed */
    drop();
  });

  /* an Enter that cannot answer yet says what to do, once read the question comes back (Work has no hint channel at a
     question: api.say is the bubble's line, so the question is put back when the nudge has been read) */
  const stageRef = useRef(stage);
  stageRef.current = stage;
  const nudge = (line: string) => {
    const q = qKey, back = it.say;
    nudgeUp.current = q;
    api.say(line, () => { if (nudgeUp.current === q && stageRef.current === "ask" && SRef.current.q === q && !SRef.current.sent && back) { nudgeUp.current = null; api.say(back); } });
  };
  /* Enter: the current step's act in a steps phase; at a question it sends the pick or the full ladder */
  const enterAnswer = () => {
    const s = cur();
    if (s.sent || playing.current || s.fixing) return;   /* an unchanged wrong answer is never sent again */
    if (pick) {
      if (s.picked === null) { nudge("Tap the greater card first."); return; }
      put({ sent: true }); api.submit(cards[s.picked]); return;
    }
    if (order) {
      if (s.rungs.some((r: any) => r === null)) { nudge("Fill every step first."); return; }
      put({ sent: true }); api.submit(s.rungs.map((k: number) => cards[k]).join(askDir === "asc" ? "<" : ">"));
    }
  };
  /* 400 ms: two Enters never finish two steps */
  const enterStep = () => { const t = Date.now(); if (t - lastEnter.current < 400) return; lastEnter.current = t; act(stepOn); };
  api.onEnter(free ? null : isDemo ? (stepOn ? enterStep : null) : stage === "ask" ? enterAnswer : null);

  /* the agent's hands */
  HOOK.demo = () => (isDemo && stepOn ? act(stepOn) : undefined);
  HOOK.set = (v: any) => {
    if (stage !== "ask") return false;
    const s = String(v ?? "").replace(/\s+/g, "");
    if (pick) {
      let k = cards.indexOf(s);
      if (k < 0) k = cards.findIndex((c: string) => Number(c) === Number(s));
      if (k < 0 || !s) return false;
      put({ picked: k, demo: null, sent: false }); api.answerReady(true); return true;
    }
    const sg = s.includes(">") ? ">" : s.includes("<") ? "<" : "";
    if (!sg) return false;
    const parts = s.split(sg), used: any = {};
    if (parts.length !== N) return false;
    const ord = parts.map((p: string) => { const k = cards.findIndex((c: string, j: number) => c === p && !used[j]); if (k >= 0) used[k] = true; return k; });
    if (ord.some((k: number) => k < 0)) return false;
    /* the ladder runs the way the question asks: a reading the other way round is set on it reversed */
    const rungs = sg === (askDir === "asc" ? "<" : ">") ? ord : ord.slice().reverse();
    put({ rungs, demo: null, pairLit: {}, sent: false }); api.answerReady(true); return true;
  };

  /* the traceback: redraw the comparison from the left, ending on the whole right answer (a demo layer) */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    const P = putIf(qKey);
    api.lock(true);
    if (pick) {
      const steps: any[] = [[400, () => P({ walk: 0, demo: { on: true } })]];
      for (let w = 1; w <= stop; w++) steps.push([650, () => P({ walk: w })]);
      if (ribbons) steps.push([650, () => P({ measured: true, shown: 2, growK: -1 })]);
      steps.push([650, () => P((c: any) => ({ demo: { ...(c.demo || {}), greater: true } }))]);
      tl.run(steps, () => api.lock(false));   /* `sent` stays: an unchanged wrong pick is never sent again */
    } else if (order) {
      /* each pair the child made lights its deciding place, the lowest step is ringed, the cards move into the right
         order (the child's next act is Enter, which confirms it), and only then do the signs and the reading turn green */
      const sg = askDir === "asc" ? "<" : ">";
      const ans = String(it.answer).split(sg).map((c: string) => cards.indexOf(c));
      P({ fixing: true });                                           /* the cards are inert while it plays */
      tl.run([
        [400, () => P({ demo: { pairs: true } })],
        [900, () => P((c: any) => ({ demo: { ...(c.demo || {}), rung: true } }))],
        [900, () => { P({ rungs: ans, pairLit: {}, demo: { rung: true } }); api.sfx.settle(); }],
        [700, () => P({ demo: { reading: true }, sent: false })],
      ], () => { P({ fixing: false }); api.lock(false); api.answerReady(cur().rungs.every((x: any) => x !== null)); });
    } else api.lock(false);
  }, [wrong]);

  /* the win: Compare finishes its walk, the ribbons lie to scale, the sign is written */
  useEffect(() => {
    if (stage !== "win" || free) return;
    const P = putIf(qKey);
    tl.stop(); tl2.stop();
    if (pick) P({ walk: stop, measured: ribbons, shown: ribbons ? 2 : 0, growK: -1, demo: null });
    else if (order) {
      const sg = askDir === "asc" ? "<" : ">";
      P({ rungs: String(it.answer).split(sg).map((c: string) => cards.indexOf(c)), demo: null, pairLit: {} });
    }
    dcSayWin(api, it.qid);
  }, [stage]);

  /* ── drawing ── */
  const done = !free && (stage === "win" || stage === "idle");
  const lbl = (x: number, y: number, s: string, o: any = {}) => (
    <text x={x} y={y} textAnchor={o.anchor || "middle"} fontSize={o.size || T.label} fontWeight={o.weight || 600} fill={o.fill || C.ink}>{s}</text>
  );
  /* the bottom keys, side by side at the centre */
  /* the keys: the ladder's at the bottom centre; the compare view's at the right end of the tape row (stacked upward in free play) */
  const keyRow = (list: any[]) => {
    if (pick) return list.map((b: any, j: number) => ({ ...b, x: Wd - 12 - DC_C.keyW, y: DC_C.keyY - (list.length - 1 - j) * (DC_C.keyH + 16) }));
    const tw = list.length * DC_C.keyW + (list.length - 1) * 24, x0 = (Wd - tw) / 2;
    return list.map((b: any, j: number) => ({ ...b, x: x0 + j * (DC_C.keyW + 24), y: DC_C.rowKeyY }));
  };

  /* two cards over a place strip, the sign between them, and the tape with its ribbons */
  const cmpView = () => {
    const fd = dcFirstDiff(A, B), dec = S.walk >= stop;
    const st = (p: number) => (p >= S.walk ? "" : dec && fd.p === p ? "dec" : "same");
    const paint = (c: string, p: number) => (st(p) === "dec" ? DC_INK.amber : st(p) === "same" ? dcFade(c) : c);
    const greaterK = fd.sign === ">" ? 0 : fd.sign === "<" ? 1 : -1;
    const showGreater = done || !!(S.demo && S.demo.greater) || (free && dec);
    const x0 = DC_C.x0;
    const digits = (s: string, y: number, other: string) => {
      const { w, d } = dcSplit(s), od = dcSplit(other).d;
      const out: any[] = [];
      out.push(
        <text key="w" x={x0 + DC_C.wholeW - 12} y={y + 70} textAnchor="end" fontSize={T.display} fontWeight={700}>
          {w.split("").map((ch: string, j: number) => <tspan key={j} fill={paint(ch === "0" && w !== "0" ? DC_INK.grey : DC_INK.blue, 0)}>{ch}</tspan>)}
        </text>
      );
      const added = (p: number) => p >= 1 && d[p - 1] === undefined && od[p - 1] !== undefined && S.walk > p;
      const ptx = x0 + DC_C.wholeW + DC_C.ptW / 2;
      if (d) out.push(<circle key="pt" cx={ptx} cy={y + 64} r={8} fill={C.ink} />);
      else if (added(1)) out.push(<circle key="pt" cx={ptx} cy={y + 64} r={8} fill={DC_INK.violet} />);
      for (let p = 1; p <= maxD; p++) {
        const ch = d[p - 1];
        if (ch !== undefined) out.push(<text key={"d" + p} x={dcColC(p)} y={y + 70} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={paint(ch === "0" ? DC_INK.grey : DC_INK.blue, p)}>{ch}</text>);
        else if (added(p)) {
          /* the bottom card: the label under the card right of its column (beside "Decides"), a leader from the dashed box;
             the top card (never in the authored pairs): right of the card, past the sign circle */
          const zx = dcColC(p), low = y === DC_C.bY;
          const lx = low ? dcColX(p)[1] + 18 : x0 + cw + 118, ly = low ? DC_C.decY : y + 58;
          out.push(
            <g key={"z" + p} pointerEvents="none">
              {/* a zero written to line the places up: violet, in a dashed box, a help and not a rule */}
              <rect x={zx - 36} y={y + 10} width={72} height={72} rx={12} fill="none" stroke={DC_INK.violet} strokeWidth={2.5} strokeDasharray="7 6" />
              <text x={zx} y={y + 70} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={st(p) === "dec" ? DC_INK.amber : DC_INK.violet}>0</text>
              {low && <line x1={zx + 30} y1={y + 82} x2={lx - 6} y2={ly - 24} stroke={DC_INK.violet} strokeWidth={2.5} strokeLinecap="round" />}
              {lbl(lx, ly, tx("Added zero"), { anchor: "start", fill: DC_INK.violet, weight: 700 })}
            </g>
          );
        }
      }
      if (unit) out.push(<text key="u" x={x0 + cw - 22} y={y + 64} textAnchor="end" fontSize={T.speech} fontWeight={600} fill={C.ink}>{tx(unit)}</text>);
      return out;
    };
    /* a ring drawn INSIDE the card's edge, so it never reaches the place names or the other card */
    const ring = (k: number, colour: string, wd: number, dash?: string) => (
      <rect key={"ring" + k + colour + (dash || "")} x={x0 + wd / 2 + 1} y={(k ? DC_C.bY : DC_C.aY) + wd / 2 + 1} width={cw - wd - 2} height={DC_C.h - wd - 2} rx={16}
        fill="none" stroke={colour} strokeWidth={wd} strokeDasharray={dash} pointerEvents="none" />
    );
    /* the tape: marked in ones (or tenths, when the whole number parts match), its numbers drawn in code */
    const ticks: any[] = [];
    const ty = DC_C.tapeY;
    if (tp.tenths) {
      for (let k = 0; k <= 100; k++) {
        const x = TX0 + (k / 100) * (TX1 - TX0), major = k % 10 === 0, half = k % 5 === 0;
        ticks.push(<line key={"t" + k} x1={x} y1={ty} x2={x} y2={ty + (major ? 14 : half ? 10 : 6)} stroke={C.ink} strokeWidth={major ? 2.5 : 1.2} />);
        if (major) ticks.push(<g key={"l" + k}>{lbl(x, ty + 42, k === 0 ? String(tp.lo) : k === 100 ? String(tp.lo + 1) : tp.lo + "." + k / 10, { weight: 700 })}</g>);
      }
    } else {
      const nT = Math.round(tp.hi / tp.step);
      for (let k = 0; k <= nT; k++) {
        const v = k * tp.step, x = X(v);
        ticks.push(<line key={"t" + k} x1={x} y1={ty} x2={x} y2={ty + 14} stroke={C.ink} strokeWidth={2.5} />);
        ticks.push(<g key={"l" + k}>{lbl(x, ty + 42, v >= 1000 ? indian(v) : String(v), { weight: 700 })}</g>);
      }
      if (tp.step === 1) for (let k = 0; k < nT; k++) ticks.push(<line key={"h" + k} x1={X(k + 0.5)} y1={ty} x2={X(k + 0.5)} y2={ty + 9} stroke={C.ink} strokeWidth={1.2} />);
    }
    const bar = (k: number) => {
      const s = cards[k], y = k ? DC_C.barB : DC_C.barA;
      const rank = byLen.indexOf(k);
      if (!ribbons || !(S.measured || rank < S.shown)) return null;
      let len = X(Number(s)) - TX0;
      if (k === S.growK) len = len * Math.min(1, Math.max(0, S.grow));   /* sliding in: never past its true length */
      len = Math.max(len, 4);
      /* the greater card's ribbon turns green (the result) only at the win and in the correction */
      const win = showGreater && k === greaterK;
      const fillC = win ? CONTENT.one : CONTENT.hundred, inkC = win ? DC_INK.green : DC_INK.blue;
      return (
        <g key={"bar" + k} data-role="ribbon">
          <clipPath id={"dc-rib" + k}><rect x={TX0} y={y} width={len} height={DC_C.barH} rx={7} /></clipPath>
          <rect x={TX0} y={y} width={len} height={DC_C.barH} rx={7} fill={fillC} />
          <Skin name="bar" x={TX0} y={y} w={TX1 - TX0} h={DC_C.barH} clip={"url(#dc-rib" + k + ")"} />
          <rect x={TX0} y={y} width={len} height={DC_C.barH} rx={7} fill={fillC} fillOpacity={0.6} stroke={inkC} strokeWidth={2} />
          {lbl(TX0 - 14, y + DC_C.barH / 2 + 11, unit ? s + " " + tx(unit) : s, { anchor: "end", weight: 700, fill: inkC })}
        </g>
      );
    };
    const signOn = showGreater && greaterK >= 0;
    const sx = x0 + cw + 64;
    return (
      <g>
       <g transform={`translate(${ox},0)`}>
        {/* the place strip */}
        {Array.from({ length: maxD + 1 }, (_, p) => (
          <g key={"pl" + p}>{lbl(dcColC(p), DC_C.lblY, tx(MODEL.places[p]), { fill: st(p) === "dec" ? DC_INK.amber : C.ink, weight: st(p) === "dec" ? 700 : 600 })}</g>
        ))}
        {/* the two cards */}
        {[DC_C.aY, DC_C.bY].map((y: number, k: number) => (
          <rect key={"card" + k} x={x0} y={y} width={cw} height={DC_C.h} rx={18} fill="#FFFFFF" stroke={C.rule} strokeWidth={2.5} filter="url(#fShadowSoft)" />
        ))}
        {dec && fd.p >= 0 && (
          <rect x={dcColX(fd.p)[0] + 4} y={DC_C.aY} width={dcColX(fd.p)[1] - dcColX(fd.p)[0] - 8} height={DC_C.bY + DC_C.h - DC_C.aY} rx={14}
            fill={tint(CONTENT.ten, 0.78)} fillOpacity={0.85} stroke={CONTENT.ten} strokeWidth={3} pointerEvents="none" />
        )}
        {digits(A, DC_C.aY, B)}
        {digits(B, DC_C.bY, A)}
        {/* the invite at a question's open: a static dashed ring inside each card (it reads under reduced motion too) */}
        {!free && stage === "ask" && !wrong && S.picked === null && [0, 1].map((k: number) => ring(k, DC_BERRY(), 4))}
        {!done && S.picked !== null && !(showGreater && S.picked === greaterK) && ring(S.picked, C.accent, 5)}
        {showGreater && greaterK >= 0 && ring(greaterK, DC_INK.green, 6)}
        {dec && fd.p >= 0 && lbl(dcColC(fd.p), DC_C.decY, tx("Decides"), { fill: DC_INK.amber, weight: 700 })}
        {/* the sign between the two cards: a plain circle (not a control) until the answer (or the correction) writes it */}
        <g pointerEvents="none">
          <circle cx={sx} cy={dcMidY} r={42} fill="#FFFFFF" stroke={signOn ? DC_INK.green : tint(C.rule, 0.2)} strokeWidth={signOn ? 4 : 2} />
          {signOn && dcSign(sx, dcMidY, 42, fd.sign, DC_INK.green)}
        </g>
        {/* the cards are tapped to pick the greater (a question), or to report a wrong act (a step) */}
        {!free && (isDemo || stage === "ask") && [0, 1].map((k: number) => (
          <Hit key={"hit" + k} id={k ? "card-b" : "card-a"} x={x0} y={k ? DC_C.bY : DC_C.aY} w={cw} h={DC_C.h} label={tx("card") + " " + cards[k]}
            enabled={live && !(stage === "ask" && S.picked === k)} onPress={() => act(k ? "card-b" : "card-a")} />
        ))}
       </g>
        {/* the measuring tape (a real tape from the first frame), and the ribbons laid on it to scale */}
        <rect x={TX0 - 30} y={ty} width={TX1 - TX0 + 70} height={DC_C.tapeH} rx={8} fill={DC_TAPE} stroke={shade(DC_TAPE, 0.3)} strokeWidth={2} />
        <Skin name="tape" x={TX0 - 30} y={ty} w={TX1 - TX0 + 70} h={DC_C.tapeH} fit="stretch" />
        {ticks}
        {bar(0)}
        {bar(1)}
      </g>
    );
  };

  /* a ladder card's face: digits blue, the point ink, place-holder zeros grey, compared places amber */
  const ladFace = (k: number, x: number, y: number, lit: any, lifted: boolean) => {
    const s = cards[k], { w, d } = dcSplit(s), L = lit[k] || {};
    const col = (c: string, p: number) => (L[p] !== undefined ? DC_INK.amber : c);
    const bits: any[] = [];
    w.split("").forEach((ch: string, j: number) => bits.push(<tspan key={"w" + j} fill={col(ch === "0" && w !== "0" ? DC_INK.grey : DC_INK.blue, 0)}>{ch}</tspan>));
    if (d) bits.push(<tspan key="pt" fill={C.ink}>.</tspan>);
    d.split("").forEach((ch: string, j: number) => bits.push(<tspan key={"d" + j} fill={col(ch === "0" ? DC_INK.grey : DC_INK.blue, j + 1)}>{ch}</tspan>));
    return (
      <g transform={`translate(${x},${y})`}>
        <rect x={0} y={0} width={DC_L.w} height={DC_L.h} rx={16} fill="#FFFFFF" stroke={C.rule} strokeWidth={2.5} filter={lifted ? "url(#fLift)" : "url(#fShadowSoft)"} />
        <text x={DC_L.w / 2} y={DC_L.h / 2 + 25} textAnchor="middle" fontSize={T.display} fontWeight={700}>{bits}</text>
      </g>
    );
  };

  /* the staircase: cards wait in a row, go onto the steps, a sign between every pair */
  const ladView = () => {
    const sg = askDir === "asc" ? "<" : ">";
    const demo = S.demo || {};
    const rungs = S.rungs;
    /* the places lit amber: a pair the child compared, and every pair in the correction */
    const lit: any = {};
    const light = (r: number, p: number) => { if (p < 0) return; [rungs[r], rungs[r + 1]].forEach((k: any) => { if (k !== null && k !== undefined) (lit[k] = lit[k] || {})[p] = true; }); };
    Object.keys(S.pairLit || {}).forEach((r: any) => light(Number(r), S.pairLit[r]));
    if (demo.pairs) for (let r = 0; r + 1 < N; r++) if (rungs[r] !== null && rungs[r + 1] !== null) light(r, dcFirstDiff(cards[rungs[r]], cards[rungs[r + 1]]).p);
    const dg = drag.drag;
    const dragK = live && dg && dg.payload ? dg.payload.k : -1;
    if (dragK >= 0 && (!dragStart.current || dragStart.current.k !== dragK)) dragStart.current = { k: dragK, x: dg.x, y: dg.y };
    if (dragK < 0) dragStart.current = null;
    const zOrder = cards.map((_: any, k: number) => k).filter((k: number) => k !== dragK).concat(dragK >= 0 ? [dragK] : []);
    const lowR = rungs.length ? rungs.findIndex((_: any, r: number) => dcLev(N, r, askDir) === 0) : -1;
    const cardLive = live && !done && !S.fixing;
    const cardEl = (k: number) => {
      if (S.carry === k) return null;                                /* the hand is carrying it */
      const h = cardHome(k, rungs);
      let x = h.x, y = h.y;
      const lifted = k === dragK && dragStart.current;
      if (lifted) { x += dg.x - dragStart.current.x; y += dg.y - dragStart.current.y; }
      const pay = { k };
      const full = rungs.every((r: any) => r !== null);
      const keys = (e: any) => {
        if (e.key === "Enter" && full && stage === "ask") return;    /* a full ladder: Enter goes on to answer (PATTERNS §5b) */
        if (e.key !== "Enter" && e.key !== " ") return;
        drag.keys(pay).onKeyDown(e);
      };
      const liveProps = cardLive ? { ...control("dcard-" + (k + 1), tx("card") + " " + cards[k]), ...drag.bind(pay), onKeyDown: keys } : {};
      return (
        <g key={"dc" + k} {...liveProps} style={cardLive ? ({ cursor: "grab" } as any) : undefined}>
          {ladFace(k, x, y, lit, !!lifted)}
        </g>
      );
    };
    const reading = done || demo.reading ? String(it.answer) : "";
    const readX = Math.min(Wd / 2, kx - 470);
    return (
      <g>
        {/* the steps */}
        {cards.map((_: any, r: number) => (
          <rect key={"st" + r} x={rungX(r) - DC_L.gap / 2} y={stepTop(r)} width={DC_L.w + DC_L.gap} height={DC_L.floor - stepTop(r)}
            fill={tint(C.panel, 0.25)} stroke={C.rule} strokeWidth={2} />
        ))}
        {cards.map((_: any, r: number) => (rungs[r] === null || rungs[r] === dragK || rungs[r] === S.carry) && (
          <rect key={"slot" + r} x={rungX(r)} y={rungY(r)} width={DC_L.w} height={DC_L.h} rx={16} fill="#FFFFFF" fillOpacity={0.6}
            stroke={C.rule} strokeWidth={2.5} strokeDasharray="10 8" />
        ))}
        {/* a sign between every pair: the ladder's sign only once that pair stands in the right order (never a false
            inequality); a pair the child compared shows its TRUE sign; green only on the right ladder */}
        {cards.slice(1).map((_: any, r: number) => {
          const both = rungs[r] !== null && rungs[r + 1] !== null && rungs[r] !== dragK && rungs[r + 1] !== dragK;
          const a = both ? cards[rungs[r]] : "", b = both ? cards[rungs[r + 1]] : "";
          const right = both && (askDir === "asc" ? dcScaled(a) < dcScaled(b) : dcScaled(a) > dcScaled(b));
          /* while the child builds, a sign shows only for a pair the child compared (its TRUE sign), so the circles never mark a
             placement right or wrong; the ladder's sign comes at the win or at the end of the correction */
          const green = right && (done || !!demo.reading);
          const shown = green ? sg : both && S.pairLit && S.pairLit[r] !== undefined ? dcFirstDiff(a, b).sign : "";
          /* a circle that is a control (both cards there, the helpers open) is dashed; one that is not is drawn plain */
          const tappable = cardLive && !isDemo && helpOn && both && !shown;
          return (
            <g key={"sg" + r} pointerEvents="none">
              <circle cx={signCx(r)} cy={signCy(r)} r={36} fill="#FFFFFF" stroke={green ? DC_INK.green : tappable ? C.ink : tint(C.rule, 0.2)}
                strokeWidth={green ? 4 : tappable ? 3 : 2} strokeDasharray={tappable ? "8 6" : undefined} />
              {shown && dcSign(signCx(r), signCy(r), 36, shown, green ? DC_INK.green : C.ink)}
            </g>
          );
        })}
        {/* the cards (the one being dragged is drawn last, on top) */}
        {zOrder.map((k: number) => cardEl(k))}
        {/* a tap on a sign compares that pair, place by place; Enter on it answers a full ladder */}
        {cardLive && !isDemo && helpOn && dragK < 0 && cards.slice(1).map((_: any, r: number) => (rungs[r] !== null && rungs[r + 1] !== null) && (
          <DcPairTap key={"ph" + r} id={"pair-" + (r + 1)} x={signCx(r) - 36} y={signCy(r) - 36} w={72} h={72} onPress={() => act("pair-" + (r + 1))}
            label={tx("compare this pair")} passEnter={() => stage === "ask" && cur().rungs.every((x: any) => x !== null)} />
        ))}
        {/* the correction: the lowest step ringed, the right order written above the ladder */}
        {demo.rung && lowR >= 0 && <rect x={rungX(lowR) - 9} y={rungY(lowR) - 9} width={DC_L.w + 18} height={DC_L.h + 18} rx={22} fill="none" stroke={CONTENT.ten} strokeWidth={5} pointerEvents="none" />}
        {reading && <g pointerEvents="none"><DcRow s={reading} cx={readX} y={72} fs={T.xl} r={46} /></g>}
      </g>
    );
  };

  /* the bottom keys */
  let keys: any[] = [];
  if (pick && !done && helpOn) {
    const seq = S.walk < stop ? "compare" : !S.measured && ribbons ? "measure" : "";
    if (seq) keys.push({ id: seq, label: seq === "compare" ? "Compare" : "Measure", seq: true });
  }
  if (free) keys.push({ id: "new-cards", label: "New cards" });
  keys = keyRow(keys);
  const keyLive = live && !(isDemo && !stepOn);

  /* the one invite: the step's control, the Compare key at a fresh question, the first card at an empty ladder */
  let invite: any = null;
  if (isDemo && stepOn) {
    const kb = keys.find((b: any) => b.id === stepOn);
    if (kb) invite = { x: kb.x + 42, y: kb.y + DC_C.keyH / 2, r: 28 };
    else if (/^dcard-/.test(stepOn) && order) {
      const k = Number(stepOn.slice(6)) - 1, r = rankOf(k);
      if (r >= 0 && S.rungs[r] === null) invite = { x: rungX(r) + DC_L.w / 2, y: rungY(r) + DC_L.h / 2, r: 42 };
    }
  } else if (stage === "ask" && !wrong) {
    if (pick && helpOn && S.walk === 0 && S.picked === null && keys[0]) invite = { x: keys[0].x + 42, y: keys[0].y + DC_C.keyH / 2, r: 28 };
    /* the FIRST slot to fill, at the left: the smallest when ascending, the greatest when descending */
    if (order && S.rungs.every((r: any) => r === null)) invite = { x: rungX(0) + DC_L.w / 2, y: rungY(0) + DC_L.h / 2, r: 40 };
  }

  /* what the host and the agent read back (toolApi.getState); no answer is shared before it is given */
  if (pick) api.share({ cards, compared: S.walk, decides: S.walk >= stop ? MODEL.places[dcFirstDiff(A, B).p] || null : null, measured: S.measured,
    picked: S.picked === null ? null : cards[S.picked], complete: stage === "idle" });
  else api.share({ cards, ladder: S.rungs.map((k: any) => (k === null ? null : cards[k])), direction: askDir, complete: stage === "idle" });

  return (
    <g>
      {pick ? cmpView() : order ? ladView() : null}
      {keys.map((b: any, j: number) => (
        <Key key={"key" + j} id={b.id} label={tx(b.label)} x={b.x} y={b.y} w={DC_C.keyW} h={DC_C.keyH} C={C} disabled={!keyLive} onClick={() => pressKey(b.id)}>
          {/* an icon at the key's left (where the invite pulses), the word beside it */}
          {b.id === "compare" && <path d="M -126 0 H -90 M -104 -14 L -90 0 L -104 14" fill="none" stroke={keyLive ? C.ink : mix(C.ink, C.panel, 0.5)} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />}
          {b.id === "measure" && <g fill="none" stroke={keyLive ? C.ink : mix(C.ink, C.panel, 0.5)} strokeWidth={3}>
            <rect x={-128} y={-12} width={40} height={24} rx={4} /><path d="M -120 -12 V -2 M -112 -12 V -6 M -104 -12 V -2 M -96 -12 V -6" /></g>}
          <text x={b.id === "compare" || b.id === "measure" ? 26 : 0} y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={keyLive ? C.ink : mix(C.ink, C.panel, 0.5)}>{tx(b.label)}</text>
        </Key>
      ))}
      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase (`it` is the item, r24) */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last) return null;
  const q: any = it || last.it || (PHASES[(n || 1) - 1] || { items: [] }).items[last.item];
  if (!q || !q.cards) return null;
  /* the child's WHOLE answer on ONE line, the drawn sign centred between every pair ("124 > 12.4 > 12.04 > 1.24",
     "30.001 > 29.999"): the card is widened to the LEFT (about 360) into the free room beside the row's text, its right
     edge where the runtime's thumb box ends */
  const fs = T.micro, TW = Math.max(w, 360), x0 = w - TW;
  const lo = q.kind === "order" ? "" : q.answer === q.cards[0] ? q.cards[1] : q.cards[0];
  const line = q.kind === "order" ? q.answer : q.answer + ">" + lo;
  return (
    <g>
      <rect x={x0} y={0} width={TW} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <DcRow s={line} cx={x0 + TW / 2} y={h / 2 + fs * 0.36} fs={fs} r={20} />
    </g>
  );
}

function DecimalComparer(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b): every question is answered on the working area (pad "enter"), so no panel opens */
      board: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d, PATTERNS.md §16): no question bar, only its key at the top right */
      keyOnly: true,
      /* the wide keypad: kept (the default); no question here opens the panel */
      bigPad: true,
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself */
      nextKey: true,
      /* NAV DOTS (the new look; LAYOUT.md §1d): one small clickable dot per phase */
      navDots: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key (above) */
      StartArt, START_HOOK,
      }} />
  );
}

export default DecimalComparer;
