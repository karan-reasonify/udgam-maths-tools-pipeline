/* ═══ M2.S4.T7.C30.2D1 · which_is_more_rail · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, the sound effects, the printed bubble, scoring, the
   events, idle and restart. THE LESSON IS SILENT (runtime r30): nothing is spoken; every line is
   printed on the bubble, which is the guide. NO imports in this file; only the five host hooks.
   REMAKE in the class 4 look (keyOnly + navDots, every act through api.act). The old voiced v1 is tool.legacy.tsx (maths only). */

const TOOL_ID = "which_is_more_rail";
const MEDIA_ID = "M2.S4.T7.C30.2D1";
const TOOL_NAME = "Which Is More Rail";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["A pair at the head of the rail. Before you push, say what these two fractions share."];
/* the whole-tool line: printed on the summary page */
const FINISH_LINE = "You sent every pair to its gate, and parked the ones no gate could settle.";
/* printed when the child opens Free play (the plan's free-play line); its LAST piece stays on the bubble */
const FREE_LINE = "Free play. Send any pair or set down the rail.";

/* THE START PAGE (runtime r28): the rail with its two gates and the bay, a pair waiting at the head */
const START_HOOK = "Two fractions are on the rail. Which one is more?";
const SIGNS = [{ id: "<", label: "<" }, { id: ">", label: ">" }, { id: "=", label: "=" }];
function StartArt({ box, C, lang, tx }: any) {
  const w = box.w, h = box.h, ry = h - 70;
  const gx = [w * 0.285, w * 0.51], gw = w * 0.17 + 30, bx = w * 0.74, bw = w * 0.19;
  const frac = (x: number, y: number, a: number, b: number, s: number) => (
    <g>
      <text x={x} y={y - s * 0.25} textAnchor="middle" fontSize={s} fontWeight={700} fill={C.ink}>{a}</text>
      <rect x={x - s * 0.5} y={y - s * 0.05} width={s} height={Math.max(3, s * 0.07)} rx={2} fill={C.ink} />
      <text x={x} y={y + s * 0.97} textAnchor="middle" fontSize={s} fontWeight={700} fill={C.ink}>{b}</text>
    </g>
  );
  return (
    <g>
      <rect x={0} y={ry} width={w} height={10} rx={5} fill={shade(C.dim, 0.12)} />
      {Array.from({ length: 30 }).map((_, k) => <rect key={k} x={10 + k * (w / 30)} y={ry + 10} width={22} height={9} rx={3} fill={C.rule} />)}
      {[0, 1].map((k) => (
        <g key={k}>
          <rect x={gx[k]} y={ry - 210} width={gw} height={52} rx={12} fill="#FFFFFF" stroke={C.rule} strokeWidth={3} />
          <text x={gx[k] + gw / 2} y={ry - 174} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(k === 0 ? "same lower" : "same upper")}</text>
          <rect x={gx[k] + 8} y={ry - 158} width={14} height={158} rx={5} fill={C.dim} />
          <rect x={gx[k] + gw - 22} y={ry - 158} width={14} height={158} rx={5} fill={C.dim} />
          <rect x={gx[k] + 24} y={ry - 150} width={gw - 48} height={18} rx={7} fill={shade(C.dim, 0.18)} />
        </g>
      ))}
      <rect x={bx} y={ry - 210} width={bw} height={210} rx={18} fill={tint("#56B4E9", 0.86)} stroke={tint("#56B4E9", 0.3)} strokeWidth={3} />
      <text x={bx + bw / 2} y={ry - 168} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade("#56B4E9", 0.5)}>{tx("not yet")}</text>
      <g>
        <rect x={w * 0.03} y={ry - 150} width={w * 0.2} height={140} rx={16} fill="#FFFFFF" stroke={C.rule} strokeWidth={3} />
        {frac(w * 0.075, ry - 82, 3, 8, 54)}
        {frac(w * 0.155, ry - 82, 3, 4, 54)}
      </g>
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): the English stays exactly as the checks read it; the language pass fills this table */
const TR: any = {
  hi: {
    "Which Is More Rail": "कौन ज़्यादा रेल",
    "A pair at the head of the rail. Before you push, say what these two fractions share.": "पटरी के शुरू में एक जोड़ी है। भेजने से पहले बताओ कि इन दो भिन्नों में क्या समान है।",
    "You sent every pair to its gate, and parked the ones no gate could settle.": "तुमने हर जोड़ी को उसके फाटक पर भेजा, और जिन्हें कोई फाटक तय न कर सका उन्हें रोका।",
    "Free play. Send any pair or set down the rail.": "मुक्त खेल। कोई भी जोड़ी या सेट पटरी पर भेजो।",
    "Two fractions are on the rail. Which one is more?": "पटरी पर दो भिन्न हैं। कौन सी ज़्यादा है?",
    "Same pieces, so count them": "एक जैसे टुकड़े, तो गिनो",
    "These two are cut the same way. So what is left to compare?": "ये दोनों एक ही तरह कटे हैं। तो तुलना करने के लिए क्या बचा?",
    "Tap the same lower gate to send the pair through.": "जोड़ी भेजने के लिए नीचे समान वाले फाटक को छुओ।",
    "The gate that says same lower.": "नीचे समान वाला फाटक।",
    "Tap Cut to cut both ribbons into the same pieces.": "दोनों फीतों को एक जैसे टुकड़ों में काटने के लिए काटो छुओ।",
    "Tap the Cut key below.": "नीचे की काटो कुंजी छुओ।",
    "Tap Fill to colour the parts each upper number counts.": "ऊपर की संख्या जितने भाग गिनती है, उन्हें रंगने के लिए भरो छुओ।",
    "Tap the Fill key below.": "नीचे की भरो कुंजी छुओ।",
    "So what is left that can be different?": "तो ऐसा क्या बचा जो अलग हो सकता है?",
    "Count what each upper number takes: more pieces of one size is more.": "गिनो कि ऊपर की संख्या कितने भाग लेती है: एक माप के ज़्यादा टुकड़े बड़े होते हैं।",
    "Same lower number, same size pieces, so the bigger upper number wins.": "नीचे की संख्या समान, टुकड़े एक माप के, तो ऊपर की बड़ी संख्या जीतती है।",
    "You learned: same lower number? The bigger upper number wins.": "तुमने सीखा: नीचे की संख्या समान? ऊपर की बड़ी संख्या जीतती है।",
    "Which is greater?": "कौन सी भिन्न बड़ी है?",
    "Send the pair to the gate that takes it, then tap the greater one.": "जोड़ी को उस फाटक पर भेजो जो उसे लेता है, फिर बड़ी भिन्न छुओ।",
    "Are the two numbers below the lines the same?": "क्या रेखा के नीचे की दोनों संख्याएँ एक जैसी हैं?",
    "The same lower gate opened, because both are cut into elevenths.": "नीचे समान वाला फाटक खुला, क्योंकि दोनों 11 भागों में कटी हैं।",
    "Which fraction on the rail is greater?": "पटरी पर कौन सी भिन्न बड़ी है?",
    "Fourteenths both times, so which one takes more of them?": "दोनों बार 14 भाग हैं, तो कौन उनमें से ज़्यादा लेती है?",
    "Nine of the same pieces beat five of them.": "एक जैसे नौ टुकड़े पाँच टुकड़ों से बड़े हैं।",
    "Which sign?": "कौन सा चिह्न?",
    "Put the right sign between the two fractions.": "दोनों भिन्नों के बीच सही चिह्न लगाओ।",
    "Read it from the left card across to the right card.": "बाएँ कार्ड से दाएँ कार्ड तक पढ़ो।",
    "Three tenths is less than eight tenths.": "10 में से 3 भाग, 10 में से 8 भाग से छोटा है।",
    "Same count, so size the pieces": "उतने ही टुकड़े, तो माप देखो",
    "You are taking the same number of pieces each time. Which pieces are bigger?": "तुम हर बार उतने ही टुकड़े ले रहे हो। कौन से टुकड़े बड़े हैं?",
    "Tap the same upper gate to send the pair through.": "जोड़ी भेजने के लिए ऊपर समान वाले फाटक को छुओ।",
    "The gate that says same upper.": "ऊपर समान वाला फाटक।",
    "Tap Cut to cut each ribbon its own way.": "हर फीते को उसके अपने तरीके से काटने के लिए काटो छुओ।",
    "Tap the Cut key under the ribbons.": "फीतों के नीचे की काटो कुंजी छुओ।",
    "Tap Fill to take the same count of parts on each.": "दोनों पर उतने ही भाग लेने के लिए भरो छुओ।",
    "Tap the Fill key under the ribbons.": "फीतों के नीचे की भरो कुंजी छुओ।",
    "Which of the two wholes was cut into fewer pieces?": "दोनों में से किस पूर्ण के कम टुकड़े किए गए?",
    "Fewer pieces in a whole means every piece of it is bigger.": "पूर्ण में कम टुकड़े हों तो हर टुकड़ा बड़ा होता है।",
    "For a shared upper number, the whole cut into fewer parts gives the larger fraction.": "ऊपर की संख्या समान हो, तो कम भागों में कटा पूर्ण बड़ी भिन्न देता है।",
    "You learned: same upper number? Fewer parts in the whole wins.": "तुमने सीखा: ऊपर की संख्या समान? कम भागों वाला पूर्ण जीतता है।",
    "Find the gate that takes this pair, then tap the greater fraction.": "वह फाटक ढूँढो जो इस जोड़ी को लेता है, फिर बड़ी भिन्न छुओ।",
    "Are the two numbers above the lines the same?": "क्या रेखा के ऊपर की दोनों संख्याएँ एक जैसी हैं?",
    "The same upper gate opened, so the bigger pieces win.": "ऊपर समान वाला फाटक खुला, तो बड़े टुकड़े जीते।",
    "Which fraction on the rail is more?": "पटरी पर कौन सी भिन्न ज़्यादा है?",
    "Two pieces each time, so are a third and a ninth the same size?": "दोनों बार दो टुकड़े, तो क्या तिहाई और नवाँ भाग बराबर माप के हैं?",
    "Thirds are bigger pieces than ninths, and two of each were taken.": "तिहाई नवें भाग से बड़े टुकड़े हैं, और दोनों के दो-दो टुकड़े लिए गए।",
    "Send the pair on, then tap the greater one.": "जोड़ी को आगे भेजो, फिर बड़ी भिन्न छुओ।",
    "Seven pieces both times, so whose seven cover more of the whole?": "दोनों बार सात टुकड़े, तो किसके सात टुकड़े पूर्ण का ज़्यादा भाग ढकते हैं?",
    "Eighths are bigger pieces than twentieths, so seven of them reach further.": "आठवें भाग बीसवें भाग से बड़े टुकड़े हैं, इसलिए उनके सात टुकड़े आगे तक पहुँचते हैं।",
    "Putting a list in order": "सूची को क्रम में लगाना",
    "What do all of these have in common? Order them by whatever is left.": "इन सबमें क्या एक जैसा है? जो बचे, उसी से इन्हें क्रम में लगाओ।",
    "Tap the same lower gate to send the whole set through.": "पूरा सेट भेजने के लिए नीचे समान वाले फाटक को छुओ।",
    "Drag one card onto another to swap their places.": "एक कार्ड को दूसरे पर खींचकर उनकी जगह बदलो।",
    "Swap two cards on the board.": "बोर्ड पर दो कार्ड की जगह बदलो।",
    "Tap Fill to colour a strip under every card.": "हर कार्ड के नीचे पट्टी रंगने के लिए भरो छुओ।",
    "Tap the Fill key under the cards.": "कार्डों के नीचे की भरो कुंजी छुओ।",
    "Which rule compares that kind of set?": "ऐसे सेट की तुलना कौन सा नियम करता है?",
    "Put just two cards in order first, then fit the other two around them.": "पहले बस दो कार्ड क्रम में रखो, फिर बाकी दो को उनके आसपास लगाओ।",
    "Find what the whole set shares first, because that picks the rule.": "पहले देखो कि पूरे सेट में क्या समान है, उसी से नियम चुना जाता है।",
    "You learned: find what a set shares, then order it by that rule.": "तुमने सीखा: पहले देखो सेट में क्या समान है, फिर क्रम लगाओ।",
    "Ascending order": "आरोही क्रम",
    "Put the four cards in ascending order.": "चारों कार्डों को आरोही क्रम में लगाओ।",
    "What do all four of these cards have in common?": "इन चारों कार्डों में क्या एक जैसा है?",
    "Thirteenths all round, so the upper numbers run up the line.": "सब 13 भागों वाले हैं, तो ऊपर की संख्याएँ बढ़ती जाती हैं।",
    "Descending order": "अवरोही क्रम",
    "Now put the four cards in descending order.": "अब चारों कार्डों को अवरोही क्रम में लगाओ।",
    "Descending starts at the greatest and steps down.": "अवरोही क्रम सबसे बड़ी से शुरू होकर नीचे उतरता है।",
    "Ninths all round, so the upper numbers step down the line.": "सब 9 भागों वाले हैं, तो ऊपर की संख्याएँ घटती जाती हैं।",
    "Line up the four cards, smallest first.": "चारों कार्डों को लगाओ, सबसे छोटी पहले।",
    "The lower numbers change, so does a bigger one make a bigger piece?": "नीचे की संख्याएँ बदलती हैं, तो क्या बड़ी संख्या से बड़ा टुकड़ा बनता है?",
    "Six pieces each time, so the bigger the pieces, the further the strip.": "हर बार छह टुकड़े, तो टुकड़े जितने बड़े, पट्टी उतनी लंबी।",
    "Pairs these two rules cannot settle": "जो जोड़ियाँ नियम से तय न हों",
    "Neither gate will take this pair. What can you honestly say about it?": "कोई फाटक इस जोड़ी को नहीं लेगा। इसके बारे में तुम ईमानदारी से क्या कह सकते हो?",
    "Tap the same lower gate to try the pair on it.": "जोड़ी आज़माने के लिए नीचे समान वाले फाटक को छुओ।",
    "Tap the same upper gate to try it there too.": "वहाँ भी आज़माने के लिए ऊपर समान वाले फाटक को छुओ।",
    "Tap the blue bay at the end of the rail to park the pair.": "जोड़ी रोकने के लिए पटरी के आख़िर की नीली जगह छुओ।",
    "The sky blue place after both gates.": "दोनों फाटकों के बाद की आसमानी जगह।",
    "Do the two numbers above the lines match?": "क्या रेखा के ऊपर की दोनों संख्याएँ मिलती हैं?",
    "Say what each gate tests, then check it on these two cards.": "बताओ कि हर फाटक क्या जाँचता है, फिर इन दो कार्डों पर जाँचो।",
    "Park a pair that shares no number, and read eight over one as eight wholes.": "कोई संख्या समान न हो तो जोड़ी रोको, और 1 में से 8 भाग को आठ पूर्ण पढ़ो।",
    "You learned: a pair that shares no number cannot be settled yet.": "तुमने सीखा: कोई संख्या समान न हो तो जोड़ी अभी तय नहीं होती।",
    "Compare the two fractions using the rules of this chapter.": "इस अध्याय के नियमों से दोनों भिन्नों की तुलना करो।",
    "Do the two numbers below the lines match?": "क्या रेखा के नीचे की दोनों संख्याएँ मिलती हैं?",
    "Neither gate took it, so the pair waits in the bay.": "कोई फाटक इसे नहीं ले सका, इसलिए जोड़ी अभी नहीं में रुकी है।",
    "Which fraction is greater, and which rule settles it?": "कौन सी भिन्न बड़ी है, और कौन सा नियम इसे तय करता है?",
    "Try each gate in turn, does either one open for this pair?": "हर फाटक बारी-बारी आज़माओ, क्या कोई फाटक खुलता है?",
    "No rule here reaches this pair, so it is parked, not guessed.": "यहाँ कोई नियम इस जोड़ी तक नहीं पहुँचता, इसलिए इसे रोका, अंदाज़ा नहीं लगाया।",
    "Line them up, biggest first.": "उन्हें लगाओ, सबसे बड़ी पहले।",
    "All four take eight pieces, so whose pieces are the biggest?": "चारों आठ टुकड़े लेती हैं, तो किसके टुकड़े सबसे बड़े हैं?",
    "Eight over one is eight whole ones, so it leads the line.": "1 में से 8 भाग आठ पूर्ण हैं, इसलिए वह सबसे आगे है।",
    "same lower": "नीचे समान",
    "same upper": "ऊपर समान",
    "not yet": "अभी नहीं",
    "one": "एक",
    "whole": "पूर्ण",
    "wholes": "पूर्ण",
    "ascending": "आरोही क्रम",
    "descending": "अवरोही क्रम",
    "shares no number": "समान संख्या नहीं",
    "no rule reaches it": "कोई नियम लागू नहीं",
    "this pair shares": "इस जोड़ी में",
    "this set shares": "इस सेट में",
    "its lower number": "नीचे की संख्या समान",
    "its upper number": "ऊपर की संख्या समान",
    "Cut": "काटो",
    "Fill": "भरो",
    "Next pair": "अगली जोड़ी",
    "<": "<",
    ">": ">",
    "=": "=",
  },
  gu: {
    "Which Is More Rail": "કયું વધારે રેલ",
    "A pair at the head of the rail. Before you push, say what these two fractions share.": "પાટાની શરૂઆતમાં એક જોડી છે. મોકલતાં પહેલાં કહો કે આ બે અપૂર્ણાંકમાં શું સરખું છે.",
    "You sent every pair to its gate, and parked the ones no gate could settle.": "તમે દરેક જોડીને તેના ફાટક પર મોકલી, અને જેને કોઈ ફાટક નક્કી ન કરી શક્યું તેને રોકી.",
    "Free play. Send any pair or set down the rail.": "મુક્ત રમત. કોઈ પણ જોડી કે સેટ પાટા પર મોકલો.",
    "Two fractions are on the rail. Which one is more?": "પાટા પર બે અપૂર્ણાંક છે. કયો વધારે છે?",
    "Same pieces, so count them": "સરખા ટુકડા, તો ગણો",
    "These two are cut the same way. So what is left to compare?": "આ બંને એક જ રીતે કપાયેલા છે. તો સરખાવવા માટે શું બાકી રહ્યું?",
    "Tap the same lower gate to send the pair through.": "જોડી મોકલવા નીચે સરખી વાળા ફાટકને અડો.",
    "The gate that says same lower.": "નીચે સરખી વાળું ફાટક.",
    "Tap Cut to cut both ribbons into the same pieces.": "બંને રિબનને સરખા ટુકડામાં કાપવા કાપો અડો.",
    "Tap the Cut key below.": "નીચેની કાપો કી અડો.",
    "Tap Fill to colour the parts each upper number counts.": "ઉપરની સંખ્યા જેટલા ભાગ ગણે તેમને રંગવા ભરો અડો.",
    "Tap the Fill key below.": "નીચેની ભરો કી અડો.",
    "So what is left that can be different?": "તો એવું શું બાકી છે જે અલગ હોઈ શકે?",
    "Count what each upper number takes: more pieces of one size is more.": "ગણો કે ઉપરની સંખ્યા કેટલા ભાગ લે છે: એક જ માપના વધુ ટુકડા મોટા હોય.",
    "Same lower number, same size pieces, so the bigger upper number wins.": "નીચેની સંખ્યા સરખી, ટુકડા એક માપના, તો ઉપરની મોટી સંખ્યા જીતે.",
    "You learned: same lower number? The bigger upper number wins.": "તમે શીખ્યા: નીચેની સંખ્યા સરખી? ઉપરની મોટી સંખ્યા જીતે.",
    "Which is greater?": "કયો અપૂર્ણાંક મોટો છે?",
    "Send the pair to the gate that takes it, then tap the greater one.": "જોડીને એ ફાટક પર મોકલો જે તેને લે છે, પછી મોટો અપૂર્ણાંક અડો.",
    "Are the two numbers below the lines the same?": "શું રેખાની નીચેની બંને સંખ્યા સરખી છે?",
    "The same lower gate opened, because both are cut into elevenths.": "નીચે સરખી વાળું ફાટક ખુલ્યું, કારણ કે બંને 11 ભાગમાં કપાયેલા છે.",
    "Which fraction on the rail is greater?": "પાટા પર કયો અપૂર્ણાંક મોટો છે?",
    "Fourteenths both times, so which one takes more of them?": "બંને વખત 14 ભાગ છે, તો કોણ તેમાંથી વધુ લે છે?",
    "Nine of the same pieces beat five of them.": "સરખા નવ ટુકડા પાંચ ટુકડા કરતાં મોટા છે.",
    "Which sign?": "કયું ચિહ્ન?",
    "Put the right sign between the two fractions.": "બંને અપૂર્ણાંક વચ્ચે સાચું ચિહ્ન મૂકો.",
    "Read it from the left card across to the right card.": "ડાબા કાર્ડથી જમણા કાર્ડ સુધી વાંચો.",
    "Three tenths is less than eight tenths.": "10માંથી 3 ભાગ, 10માંથી 8 ભાગ કરતાં નાનો છે.",
    "Same count, so size the pieces": "એટલા જ ટુકડા, તો માપ જુઓ",
    "You are taking the same number of pieces each time. Which pieces are bigger?": "તમે દરેક વખતે એટલા જ ટુકડા લો છો. કયા ટુકડા મોટા છે?",
    "Tap the same upper gate to send the pair through.": "જોડી મોકલવા ઉપર સરખી વાળા ફાટકને અડો.",
    "The gate that says same upper.": "ઉપર સરખી વાળું ફાટક.",
    "Tap Cut to cut each ribbon its own way.": "દરેક રિબનને તેની રીતે કાપવા કાપો અડો.",
    "Tap the Cut key under the ribbons.": "રિબનની નીચેની કાપો કી અડો.",
    "Tap Fill to take the same count of parts on each.": "બંને પર એટલા જ ભાગ લેવા ભરો અડો.",
    "Tap the Fill key under the ribbons.": "રિબનની નીચેની ભરો કી અડો.",
    "Which of the two wholes was cut into fewer pieces?": "બેમાંથી કયા આખાના ઓછા ટુકડા કર્યા છે?",
    "Fewer pieces in a whole means every piece of it is bigger.": "આખામાં ઓછા ટુકડા હોય તો દરેક ટુકડો મોટો હોય છે.",
    "For a shared upper number, the whole cut into fewer parts gives the larger fraction.": "ઉપરની સંખ્યા સરખી હોય, તો ઓછા ભાગમાં કપાયેલું આખું મોટો અપૂર્ણાંક આપે.",
    "You learned: same upper number? Fewer parts in the whole wins.": "તમે શીખ્યા: ઉપરની સંખ્યા સરખી? ઓછા ભાગવાળું આખું જીતે.",
    "Find the gate that takes this pair, then tap the greater fraction.": "જે ફાટક આ જોડીને લે છે તે શોધો, પછી મોટો અપૂર્ણાંક અડો.",
    "Are the two numbers above the lines the same?": "શું રેખાની ઉપરની બંને સંખ્યા સરખી છે?",
    "The same upper gate opened, so the bigger pieces win.": "ઉપર સરખી વાળું ફાટક ખુલ્યું, એટલે મોટા ટુકડા જીત્યા.",
    "Which fraction on the rail is more?": "પાટા પર કયો અપૂર્ણાંક વધારે છે?",
    "Two pieces each time, so are a third and a ninth the same size?": "બંને વખત બે ટુકડા, તો શું ત્રીજો અને નવમો ભાગ સરખા માપના છે?",
    "Thirds are bigger pieces than ninths, and two of each were taken.": "ત્રીજા ભાગ નવમા ભાગ કરતાં મોટા ટુકડા છે, અને બંનેના બે-બે ટુકડા લીધા.",
    "Send the pair on, then tap the greater one.": "જોડીને આગળ મોકલો, પછી મોટો અપૂર્ણાંક અડો.",
    "Seven pieces both times, so whose seven cover more of the whole?": "બંને વખત સાત ટુકડા, તો કોના સાત ટુકડા આખાનો વધુ ભાગ ઢાંકે છે?",
    "Eighths are bigger pieces than twentieths, so seven of them reach further.": "આઠમા ભાગ વીસમા ભાગ કરતાં મોટા ટુકડા છે, એટલે તેના સાત ટુકડા વધુ આગળ પહોંચે છે.",
    "Putting a list in order": "યાદીને ક્રમમાં ગોઠવવી",
    "What do all of these have in common? Order them by whatever is left.": "આ બધામાં શું સરખું છે? જે બાકી રહે તેનાથી તેમને ક્રમમાં ગોઠવો.",
    "Tap the same lower gate to send the whole set through.": "આખો સેટ મોકલવા નીચે સરખી વાળા ફાટકને અડો.",
    "Drag one card onto another to swap their places.": "એક કાર્ડને બીજા પર ખેંચી તેમની જગ્યા બદલો.",
    "Swap two cards on the board.": "બોર્ડ પર બે કાર્ડની જગ્યા બદલો.",
    "Tap Fill to colour a strip under every card.": "દરેક કાર્ડ નીચે પટ્ટી રંગવા ભરો અડો.",
    "Tap the Fill key under the cards.": "કાર્ડની નીચેની ભરો કી અડો.",
    "Which rule compares that kind of set?": "આવા સેટની સરખામણી કયો નિયમ કરે છે?",
    "Put just two cards in order first, then fit the other two around them.": "પહેલાં ફક્ત બે કાર્ડ ક્રમમાં મૂકો, પછી બાકીના બેને તેમની આસપાસ ગોઠવો.",
    "Find what the whole set shares first, because that picks the rule.": "પહેલાં જુઓ કે આખા સેટમાં શું સરખું છે, તેનાથી જ નિયમ પસંદ થાય છે.",
    "You learned: find what a set shares, then order it by that rule.": "તમે શીખ્યા: સેટમાં જે સરખું છે તે શોધો, પછી ક્રમ ગોઠવો.",
    "Ascending order": "ચડતો ક્રમ",
    "Put the four cards in ascending order.": "ચારેય કાર્ડને ચડતા ક્રમમાં ગોઠવો.",
    "What do all four of these cards have in common?": "આ ચારેય કાર્ડમાં શું સરખું છે?",
    "Thirteenths all round, so the upper numbers run up the line.": "બધા 13 ભાગવાળા છે, એટલે ઉપરની સંખ્યાઓ વધતી જાય છે.",
    "Descending order": "ઊતરતો ક્રમ",
    "Now put the four cards in descending order.": "હવે ચારેય કાર્ડને ઊતરતા ક્રમમાં ગોઠવો.",
    "Descending starts at the greatest and steps down.": "ઊતરતો ક્રમ સૌથી મોટાથી શરૂ થઈ નીચે ઊતરે છે.",
    "Ninths all round, so the upper numbers step down the line.": "બધા 9 ભાગવાળા છે, એટલે ઉપરની સંખ્યાઓ ઘટતી જાય છે.",
    "Line up the four cards, smallest first.": "ચારેય કાર્ડ ગોઠવો, સૌથી નાનો પહેલાં.",
    "The lower numbers change, so does a bigger one make a bigger piece?": "નીચેની સંખ્યાઓ બદલાય છે, તો શું મોટી સંખ્યાથી મોટો ટુકડો બને છે?",
    "Six pieces each time, so the bigger the pieces, the further the strip.": "દર વખતે છ ટુકડા, તો ટુકડા જેટલા મોટા, પટ્ટી એટલી લાંબી.",
    "Pairs these two rules cannot settle": "નિયમથી નક્કી ન થાય એવી જોડીઓ",
    "Neither gate will take this pair. What can you honestly say about it?": "કોઈ ફાટક આ જોડીને લેશે નહીં. તેના વિશે તમે પ્રામાણિકપણે શું કહી શકો?",
    "Tap the same lower gate to try the pair on it.": "જોડી અજમાવવા નીચે સરખી વાળા ફાટકને અડો.",
    "Tap the same upper gate to try it there too.": "ત્યાં પણ અજમાવવા ઉપર સરખી વાળા ફાટકને અડો.",
    "Tap the blue bay at the end of the rail to park the pair.": "જોડી રોકવા પાટાના છેડાની વાદળી જગ્યા અડો.",
    "The sky blue place after both gates.": "બંને ફાટક પછીની આસમાની જગ્યા.",
    "Do the two numbers above the lines match?": "શું રેખાની ઉપરની બંને સંખ્યા મળે છે?",
    "Say what each gate tests, then check it on these two cards.": "કહો કે દરેક ફાટક શું તપાસે છે, પછી આ બે કાર્ડ પર તપાસો.",
    "Park a pair that shares no number, and read eight over one as eight wholes.": "કોઈ સંખ્યા સરખી ન હોય તો જોડી રોકો, અને 1માંથી 8 ભાગને આઠ આખા વાંચો.",
    "You learned: a pair that shares no number cannot be settled yet.": "તમે શીખ્યા: કોઈ સંખ્યા સરખી ન હોય તો જોડી હજી નક્કી ન થાય.",
    "Compare the two fractions using the rules of this chapter.": "આ પ્રકરણના નિયમોથી બંને અપૂર્ણાંકની સરખામણી કરો.",
    "Do the two numbers below the lines match?": "શું રેખાની નીચેની બંને સંખ્યા મળે છે?",
    "Neither gate took it, so the pair waits in the bay.": "કોઈ ફાટક તેને લઈ ન શક્યું, એટલે જોડી હજી નહીંમાં રોકાયેલી છે.",
    "Which fraction is greater, and which rule settles it?": "કયો અપૂર્ણાંક મોટો છે, અને કયો નિયમ તેને નક્કી કરે છે?",
    "Try each gate in turn, does either one open for this pair?": "દરેક ફાટક વારાફરતી અજમાવો, શું કોઈ ફાટક ખુલે છે?",
    "No rule here reaches this pair, so it is parked, not guessed.": "અહીં કોઈ નિયમ આ જોડી સુધી પહોંચતો નથી, એટલે તેને રોકી, અંદાજ ન લગાવ્યો.",
    "Line them up, biggest first.": "તેમને ગોઠવો, સૌથી મોટો પહેલાં.",
    "All four take eight pieces, so whose pieces are the biggest?": "ચારેય આઠ ટુકડા લે છે, તો કોના ટુકડા સૌથી મોટા છે?",
    "Eight over one is eight whole ones, so it leads the line.": "1માંથી 8 ભાગ આઠ આખા છે, એટલે તે સૌથી આગળ છે.",
    "same lower": "નીચે સરખી",
    "same upper": "ઉપર સરખી",
    "not yet": "હજી નહીં",
    "one": "એક",
    "whole": "આખું",
    "wholes": "આખા",
    "ascending": "ચડતો ક્રમ",
    "descending": "ઊતરતો ક્રમ",
    "shares no number": "સરખી સંખ્યા નથી",
    "no rule reaches it": "કોઈ નિયમ લાગુ નથી",
    "this pair shares": "આ જોડીમાં",
    "this set shares": "આ સેટમાં",
    "its lower number": "નીચેની સંખ્યા સરખી",
    "its upper number": "ઉપરની સંખ્યા સરખી",
    "Cut": "કાપો",
    "Fill": "ભરો",
    "Next pair": "આગળની જોડી",
    "<": "<",
    ">": ">",
    "=": "=",
  },
};

/* One entry per phase = one mount.
   kind    pick (send the pair to its gate, then tap the greater) · sign (a sign key) · bay (park a pair no gate takes) ·
           order (send the set to its gate, then arrange the cards on the line-up board)
   win     the one-sentence line said at the right answer (the phase's last one is replaced by its closing)
   warm    the warm-up the guide steps work on: never a question's own pair */
const PHASES: any[] = [
  {
    n: 1,
    concept: "Same pieces, so count them",
    conceptId: "M2.S4.T7.C30", objectiveIds: ["O11"],
    says: ["These two are cut the same way. So what is left to compare?"],
    steps: [
      { say: "Tap the same lower gate to send the pair through.", on: "gate1", hint: "The gate that says same lower." },
      { say: "Tap Cut to cut both ribbons into the same pieces.", on: "cut", hint: "Tap the Cut key below." },
      { say: "Tap Fill to colour the parts each upper number counts.", on: "fill", hint: "Tap the Fill key below." },
    ],
    warm: { kind: "pick", pair: [[2, 9], [5, 9]] },
    ladder: ["So what is left that can be different?", "Count what each upper number takes: more pieces of one size is more."],
    closing: "Same lower number, same size pieces, so the bigger upper number wins.",
    learned: "You learned: same lower number? The bigger upper number wins.",
    traceback: "The pair rolls into the same lower gate, both ribbons are cut the same way, the parts fill in step, and the fuller ribbon lifts out.",
    items: [
      /* learn ML1: answer in the plan = 7/11 is the greater, and the gate for a shared lower number settles it */
      { qid: "M2.S4.T7.C30:ML1", kind: "pick", pair: [[7, 11], [4, 11]], answer: [7, 11], pad: "enter", winMs: 4600,
        ask: "Which is greater?", say: "Send the pair to the gate that takes it, then tap the greater one.",
        miss: "Are the two numbers below the lines the same?",
        win: "The same lower gate opened, because both are cut into elevenths." },
      /* practice 1: answer in the plan = 9/14 */
      { qid: "M2.S4.T7.C30:1", kind: "pick", pair: [[5, 14], [9, 14]], answer: [9, 14], pad: "enter", winMs: 4600,
        ask: "Which is greater?", say: "Which fraction on the rail is greater?",
        miss: "Fourteenths both times, so which one takes more of them?",
        win: "Nine of the same pieces beat five of them." },
      /* practice 2: answer in the plan = 3/10 is less than 8/10 */
      { qid: "M2.S4.T7.C30:2", kind: "sign", pair: [[3, 10], [8, 10]], answer: "<", choices: SIGNS, winMs: 5400,
        ask: "Which sign?", say: "Put the right sign between the two fractions.",
        miss: "Read it from the left card across to the right card.",
        win: "Three tenths is less than eight tenths." },
    ],
  },
  {
    n: 2,
    concept: "Same count, so size the pieces",
    conceptId: "M2.S4.T7.C31", objectiveIds: ["O11"],
    says: ["You are taking the same number of pieces each time. Which pieces are bigger?"],
    steps: [
      { say: "Tap the same upper gate to send the pair through.", on: "gate2", hint: "The gate that says same upper." },
      { say: "Tap Cut to cut each ribbon its own way.", on: "cut", hint: "Tap the Cut key under the ribbons." },
      { say: "Tap Fill to take the same count of parts on each.", on: "fill", hint: "Tap the Fill key under the ribbons." },
    ],
    warm: { kind: "pick", pair: [[3, 4], [3, 8]] },
    ladder: ["Which of the two wholes was cut into fewer pieces?", "Fewer pieces in a whole means every piece of it is bigger."],
    closing: "For a shared upper number, the whole cut into fewer parts gives the larger fraction.",
    learned: "You learned: same upper number? Fewer parts in the whole wins.",
    traceback: "The pair rolls into the same upper gate, both ribbons are cut from one edge, the same count of parts fills in step, and a line measures how much further the fuller one reaches.",
    items: [
      /* learn ML2: answer in the plan = 5/6 is the greater */
      { qid: "M2.S4.T7.C31:ML2", kind: "pick", pair: [[5, 12], [5, 6]], answer: [5, 6], pad: "enter", winMs: 4800,
        ask: "Which is greater?", say: "Find the gate that takes this pair, then tap the greater fraction.",
        miss: "Are the two numbers above the lines the same?",
        win: "The same upper gate opened, so the bigger pieces win." },
      /* practice 3: answer in the plan = 2/3, because thirds are bigger parts than ninths and the same number of them is taken */
      { qid: "M2.S4.T7.C31:3", kind: "pick", pair: [[2, 3], [2, 9]], answer: [2, 3], pad: "enter", winMs: 4400,
        ask: "Which is greater?", say: "Which fraction on the rail is more?",
        miss: "Two pieces each time, so are a third and a ninth the same size?",
        win: "Thirds are bigger pieces than ninths, and two of each were taken." },
      /* practice 4: answer in the plan = 7/8 */
      { qid: "M2.S4.T7.C31:4", kind: "pick", pair: [[7, 20], [7, 8]], answer: [7, 8], pad: "enter", winMs: 4800,
        ask: "Which is greater?", say: "Send the pair on, then tap the greater one.",
        miss: "Seven pieces both times, so whose seven cover more of the whole?",
        win: "Eighths are bigger pieces than twentieths, so seven of them reach further." },
    ],
  },
  {
    n: 3,
    concept: "Putting a list in order",
    conceptId: "M2.S4.T7.C32", objectiveIds: ["O12"],
    says: ["What do all of these have in common? Order them by whatever is left."],
    steps: [
      { say: "Tap the same lower gate to send the whole set through.", on: "gate1", hint: "The gate that says same lower." },
      { say: "Drag one card onto another to swap their places.", on: "swap", hint: "Swap two cards on the board." },
      { say: "Tap Fill to colour a strip under every card.", on: "fill", hint: "Tap the Fill key under the cards." },
    ],
    warm: { kind: "order", set: [[3, 7], [1, 7], [5, 7]], dir: "up" },
    ladder: ["Which rule compares that kind of set?", "Put just two cards in order first, then fit the other two around them."],
    closing: "Find what the whole set shares first, because that picks the rule.",
    learned: "You learned: find what a set shares, then order it by that rule.",
    traceback: "The shared numbers light on all four cards, a strip grows under each one, and the cards slide into the order that was asked for.",
    items: [
      /* learn ML3: answer in the plan = 2/13, 6/13, 9/13, 11/13 */
      { qid: "M2.S4.T7.C32:ML3", kind: "order", set: [[6, 13], [2, 13], [11, 13], [9, 13]], dir: "up", answer: "2/13, 6/13, 9/13, 11/13",
        pad: "enter", winMs: 4600, ask: "Ascending order", say: "Put the four cards in ascending order.",
        miss: "What do all four of these cards have in common?",
        win: "Thirteenths all round, so the upper numbers run up the line." },
      /* practice 5: answer in the plan = 8/9, 5/9, 4/9, 1/9 */
      { qid: "M2.S4.T7.C32:5", kind: "order", set: [[4, 9], [8, 9], [1, 9], [5, 9]], dir: "down", answer: "8/9, 5/9, 4/9, 1/9",
        pad: "enter", winMs: 4400, ask: "Descending order", say: "Now put the four cards in descending order.",
        miss: "Descending starts at the greatest and steps down.",
        win: "Ninths all round, so the upper numbers step down the line." },
      /* practice 6: answer in the plan = 6/11, 6/7, 6/5, 6/2 */
      { qid: "M2.S4.T7.C32:6", kind: "order", set: [[6, 5], [6, 11], [6, 7], [6, 2]], dir: "up", answer: "6/11, 6/7, 6/5, 6/2",
        pad: "enter", winMs: 4400, ask: "Ascending order", say: "Line up the four cards, smallest first.",
        miss: "The lower numbers change, so does a bigger one make a bigger piece?",
        win: "Six pieces each time, so the bigger the pieces, the further the strip." },
    ],
  },
  {
    n: 4,
    concept: "Pairs these two rules cannot settle",
    conceptId: "M2.S4.T7.C33", objectiveIds: ["O12"],
    says: ["Neither gate will take this pair. What can you honestly say about it?"],
    steps: [
      { say: "Tap the same lower gate to try the pair on it.", on: "gate1", hint: "The gate that says same lower." },
      { say: "Tap the same upper gate to try it there too.", on: "gate2", hint: "The gate that says same upper." },
      { say: "Tap the blue bay at the end of the rail to park the pair.", on: "bay", hint: "The sky blue place after both gates." },
    ],
    warm: { kind: "bay", pair: [[2, 5], [3, 4]] },
    ladder: ["Do the two numbers above the lines match?", "Say what each gate tests, then check it on these two cards."],
    closing: "Park a pair that shares no number, and read eight over one as eight wholes.",
    learned: "You learned: a pair that shares no number cannot be settled yet.",
    traceback: "The pair tries each gate in turn, both light the numbers they compare and stay shut, and it rolls on into the bay with its reason printed.",
    items: [
      /* learn ML4: answer in the plan = Neither rule reaches this pair, so it cannot be settled yet */
      { qid: "M2.S4.T7.C33:ML4", kind: "bay", pair: [[3, 7], [5, 8]], answer: "not yet", pad: "enter", winMs: 3600,
        ask: "Which is greater?", say: "Compare the two fractions using the rules of this chapter.",
        miss: "Do the two numbers below the lines match?",
        win: "Neither gate took it, so the pair waits in the bay." },
      /* practice 7: answer in the plan = Neither rule settles it, because the pair shares no number, so it cannot be decided with what this chapter teaches */
      { qid: "M2.S4.T7.C33:7", kind: "bay", pair: [[4, 5], [7, 9]], answer: "not yet", pad: "enter", winMs: 3600,
        ask: "Which is greater?", say: "Which fraction is greater, and which rule settles it?",
        miss: "Try each gate in turn, does either one open for this pair?",
        win: "No rule here reaches this pair, so it is parked, not guessed." },
      /* practice 8: answer in the plan = 8/1, 8/3, 8/6, 8/12, and 8/1 is worth eight whole ones */
      { qid: "M2.S4.T7.C33:8", kind: "order", set: [[8, 6], [8, 1], [8, 12], [8, 3]], dir: "down", answer: "8/1, 8/3, 8/6, 8/12",
        pad: "enter", winMs: 5200, ask: "Descending order", say: "Line them up, biggest first.",
        miss: "All four take eight pieces, so whose pieces are the biggest?",
        win: "Eight over one is eight whole ones, so it leads the line." },
    ],
  },
];

/* free play runs through pairs the chapter never sets, plus one set for the board */
const FREE_RUN: any[] = [
  { kind: "pick", pair: [[3, 4], [3, 8]] },
  { kind: "pick", pair: [[9, 1], [9, 4]] },
  { kind: "bay", pair: [[2, 5], [3, 4]] },
  { kind: "pick", pair: [[7, 10], [3, 10]] },
  { kind: "order", set: [[5, 12], [11, 12], [2, 12], [8, 12]], dir: "up" },
  { kind: "bay", pair: [[4, 7], [5, 6]] },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  stations: ["head", "g1", "g2", "bay"],
  gates: [{ id: "g1", tests: "the two lower numbers", opens: "when they are the same" },
    { id: "g2", tests: "the two upper numbers", opens: "when they are the same" }],
  bay: { label: "not yet", takes: "a pair that shares neither number", reason: ["shares no number", "no rule reaches it"] },
  strip: { cutBy: "the lower number", fills: "the upper number" },
  board: { slots: 4, directions: ["ascending", "descending"] },
  reader: "a fraction over one is drawn as that many whole circles",
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* every fraction in a value: [[7, 11], …]. Reads "7/11", "7|11", [7, 11] and [[7, 11], …] */
const railList = (v: any): number[][] => {
  if (Array.isArray(v) && Array.isArray(v[0])) return v.map((f: any) => [Number(f[0]), Number(f[1])]);
  if (Array.isArray(v) && v.length === 2 && typeof v[0] !== "object") return [[Number(v[0]), Number(v[1])]];
  const out: number[][] = [];
  const re = /(\d+)\s*[/|]\s*(\d+)/g;
  let m: any;
  while ((m = re.exec(String(v == null ? "" : v)))) out.push([Number(m[1]), Number(m[2])]);
  return out;
};
const railSame = (a: any, b: any) => !!a && !!b && a[0] === b[0] && a[1] === b[1];
const railText = (f: any) => f[0] + "/" + f[1];
const railOrderText = (list: any[]) => list.map(railText).join(", ");
const railNotYet = (v: any) => /\b(not yet|bay|neither|cannot|can't)\b/i.test(String(v == null ? "" : v));

/* judge: the picked fraction, the sign, the parked verdict, or the whole line-up in order */
const judge = (item: any, v: any) => {
  if (item.kind === "sign") return String(v).trim() === String(item.answer);
  if (item.kind === "bay") return railNotYet(v);
  const got = railList(v), want = railList(item.answer);
  return want.length > 0 && got.length === want.length && want.every((f: any, k: number) => railSame(f, got[k]));
};

/* oracle: every answer re-derived by cross multiplication, which the picture and judge never use */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const parse = (s: any) => String(s).split(",").map((x: string) => x.trim().split("/").map(Number)).filter((f: any) => f.length === 2 && f.every((x: number) => x > 0));
  const more = (a: any, b: any) => a[0] * b[1] - b[0] * a[1];   /* > 0 when a is the greater */
  if (it.kind === "pick" || it.kind === "sign" || it.kind === "bay") {
    const a = it.pair[0], b = it.pair[1], top = a[0] === b[0], bottom = a[1] === b[1];
    if (it.kind === "bay") return !top && !bottom && railNotYet(it.answer);
    if (top === bottom) return false;                            /* exactly one gate may take it */
    const d = more(a, b);
    if (it.kind === "sign") return it.answer === (d > 0 ? ">" : d < 0 ? "<" : "=");
    const big = d > 0 ? a : b;
    return big[0] === Number(it.answer[0]) && big[1] === Number(it.answer[1]);
  }
  if (it.kind === "order") {
    const want = parse(it.answer);
    if (want.length !== it.set.length) return false;
    const sorted = it.set.slice().sort((x: any, y: any) => (it.dir === "down" ? more(y, x) : more(x, y)));
    return sorted.every((f: any, k: number) => f[0] === want[k][0] && f[1] === want[k][1])
      && it.set.every((f: any) => want.some((w: any) => w[0] === f[0] && w[1] === f[1]));
  }
  return false;
}));

/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => {
  if (item.kind === "sign") return item.answer === "<" ? ">" : "<";
  if (item.kind === "pick") {
    const want = railList(item.answer)[0];
    const other = railSame(item.pair[0], want) ? item.pair[1] : item.pair[0];
    return other[0] + "|" + other[1];
  }
  /* the bay pair settled anyway, on the smaller bottom number; a list ordered the other way round */
  if (item.kind === "bay") {
    const f = item.pair[0][1] < item.pair[1][1] ? item.pair[0] : item.pair[1];
    return f[0] + "|" + f[1];
  }
  return railOrderText(railList(item.answer).slice().reverse());
};

/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => {
  if (item.kind === "bay") return ["not yet"];
  if (item.kind === "order") return [String(item.answer), String(item.answer).replace(/, ([^,]+)$/, " and $1")];
  const a = item.pair[0], b = item.pair[1];
  if (item.kind === "sign") {
    const word = item.answer === "<" ? "is less than" : "is greater than";
    return [railText(a) + " " + item.answer + " " + railText(b), railText(a) + " " + word + " " + railText(b),
      fractionWords(a[0], a[1]) + " " + word + " " + fractionWords(b[0], b[1])];
  }
  const want = railList(item.answer)[0], other = railSame(a, want) ? b : a;
  return [railText(want) + " is greater", railText(want) + " is the greater", fractionWords(want[0], want[1]) + " is greater",
    railText(want) + " > " + railText(other), railText(other) + " < " + railText(want)];
};

/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => (item.kind === "pick" ? railText(railList(item.answer)[0]) : String(item.answer));

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (T.state().stage === "demo") return HOOK.demo && HOOK.demo();
  if (HOOK.set) HOOK.set(agentKey(item));
  return T.submit(item.choices ? item.answer : agentKey(item));
};
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.choices ? undefined : HOOK.set ? HOOK.set(v) : false);
/* the agent's check() before Enter: the working area holds the answer, so Enter commits it (undefined in the demo stage too) */
const check = () => undefined;

/* ── the rail: sizes in working-area units (the area is 1472 x 520 shut, 900 x 520 with the wide keypad open) ───── */
const RL = { rail: 205, top: 46, low0: 232, cartY: 60, X0: 150, rowA: 258, rowB: 368, stripH: 56, arm: 120, lift: 64 };
const SKY = "#56B4E9";           /* the undecided colour: the not yet bay */
const VERM = CONTENT.pointer;    /* the greater of a pair one of the rules settles */
const AMBER = CONTENT.ten;       /* the parts of the whole a fraction leaves */
const RL_CSS = `
.rl-roll{transition:transform 520ms cubic-bezier(.3,.7,.25,1)}
.rl-slide{transition:transform 420ms cubic-bezier(.3,.7,.25,1)}
.rl-lift{transition:transform 240ms ease}
.rl-arm{transition:transform 320ms ease-out}
.rl-grab{cursor:grab}
@media (prefers-reduced-motion:reduce){.rl-roll,.rl-slide,.rl-lift,.rl-arm{transition:none}}
`;

/* a tap target that is no keyboard trap: once it has done its part of the answer, Enter passes to the window */
function RlTap({ id, label, x, y, w, h, onPress, done }: any) {
  const p = usePress(onPress);
  const keys = (e: any) => { if (e.key === "Enter" && done) return; p.keys(e); };
  return (
    <rect className="c4-hit" data-control={id} role="button" tabIndex={0} aria-label={label}
      x={x} y={y} width={w} height={h} fill="transparent" {...p.bind()} onKeyDown={keys} />
  );
}

/* a fraction, always stacked: the top number over a rule over the bottom number (never 3/4) */
function RlFrac({ x, y, f, size, fill, maxW }: any) {
  const w0 = Math.max(String(f[0]).length, String(f[1]).length) * size * 0.62 + 10;
  const w = maxW ? Math.max(8, Math.min(w0, maxW)) : w0;
  return (
    <g>
      <text x={x} y={y - size * 0.25} textAnchor="middle" fontSize={size} fontWeight={700} fill={fill}>{f[0]}</text>
      <rect x={x - w / 2} y={y - size * 0.05} width={w} height={Math.max(3, size * 0.07)} rx={2} fill={fill} />
      <text x={x} y={y + size * 0.97} textAnchor="middle" fontSize={size} fontWeight={700} fill={fill}>{f[1]}</text>
    </g>
  );
}

/* a card holding one fraction; the gate's test lights the two numbers it compares */
function RlCard({ x, y, w, h, f, size, C, litTop, litBottom, hot, mine }: any) {
  const cy = y + h / 2;
  const lw = Math.max(String(f[0]).length, String(f[1]).length) * size * 0.62 + 22;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12} fill="#FFFFFF" stroke={hot ? shade(VERM, 0.1) : mine ? C.accent : C.rule} strokeWidth={hot || mine ? 5 : 2} filter="url(#fShadowSoft)" />
      {litTop && <rect x={x + w / 2 - lw / 2} y={cy - size * 1.04} width={lw} height={size * 0.92} rx={8} fill={tint(C.accent, 0.62)} />}
      {litBottom && <rect x={x + w / 2 - lw / 2} y={cy + size * 0.12} width={lw} height={size * 0.92} rx={8} fill={tint(C.accent, 0.62)} />}
      <RlFrac x={x + w / 2} y={cy} f={f} size={size} fill={hot ? shade(VERM, 0.25) : C.ink} />
    </g>
  );
}

/* one fraction as a ribbon: wholes of one length, each cut into its lower number, filled up to its upper number.
   The plain ribbon is drawn first (the fallback), the satin skin over it (one texture a strip, the cuts are drawn here), then the colour code:
   a pale cream wash on the parts the fraction leaves, deep blue (0.72, so the satin shows through) on the parts it counts. */
function RlStrip({ x, y, h, unit, f, wholes, cutDone, cutVis, fillOn, lift, C, thin }: any) {
  const d = f[1], cells = wholes * d, cw = unit / d, w = wholes * unit;
  const parts: any[] = [<rect key="b" x={x} y={y} width={w} height={h} fill={tint(C.panel, 0.4)} />, <Skin key="sk" name="ribbon" x={x} y={y} w={w} h={h} />];
  if (cutDone) {
    for (let j = 0; j < cells; j++) {
      const taken = j < f[0];
      if (!taken) parts.push(<rect key={"c" + j} x={x + j * cw} y={y} width={cw + 0.5} height={h} fill="#FFF8E6" fillOpacity={0.5} />);
      else if (fillOn(j)) parts.push(<rect key={"c" + j} x={x + j * cw} y={y} width={cw + 0.5} height={h} fill={CONTENT.hundred} fillOpacity={0.86} />);
    }
  }
  const lines: any[] = [];
  for (let j = 1; j < cells; j++) {
    const whole = j % d === 0;
    if (!whole && (cw < (thin ? 10 : 5) || !cutVis(j))) continue;
    lines.push(<line key={"l" + j} x1={x + j * cw} y1={y} x2={x + j * cw} y2={y + h} stroke={CONTENT.line} strokeWidth={thin ? (whole ? 3 : 1.5) : whole ? 4.5 : 3} />);
  }
  return (
    <g className="rl-lift" style={{ transform: `translateY(${lift ? -10 : 0}px)` } as any}>
      {parts}
      {lines}
      <rect x={x} y={y} width={w} height={h} rx={4} fill="none" stroke={lift ? shade(VERM, 0.1) : CONTENT.line} strokeWidth={lift ? 5 : 3} />
    </g>
  );
}

const RL_BAY_NOTE = ["shares no number", "no rule reaches it"];

function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const demo = stage === "demo" || stage === "teach";
  const P: any = PHASES[(n || 1) - 1] || PHASES[0];
  const [freeIdx, setFreeIdx] = useState(0);
  /* the guide steps work a warm-up pair, never a question's own (PATTERNS 9b) */
  const cur: any = free ? FREE_RUN[freeIdx % FREE_RUN.length] : demo && P.warm ? P.warm : item;
  const isSet = cur.kind === "order";
  const cards: any[] = isSet ? cur.set : cur.pair;
  const nC = cards.length;
  const qk = n + ":" + (free ? "f" + freeIdx : demo ? "d" : index);

  /* ONE state object tagged with its question: a new question draws a fresh board in the very first frame */
  const fresh = (k: string) => ({ qk: k, pos: "head", open: null, lit: {}, picked: null, parked: false, note: null, boardUp: false,
    order: [0, 1, 2, 3, 4, 5], sel: null, proof: null, reader: null, sign: null, held: false, touched: false, moving: false, carry: null, moved: false });
  const [raw, setRaw] = useState<any>(() => fresh(qk));
  const S: any = raw.qk === qk ? raw : fresh(qk);
  const Sr = useRef<any>(S);
  Sr.current = S;
  const put = (patch: any) => { const base = Sr.current.qk === qk ? Sr.current : fresh(qk); Sr.current = { ...base, ...patch }; setRaw(Sr.current); };
  const playing = useRef(false);
  const lockedByMe = useRef(false);
  const lastKey = useRef(0);
  const stepOnRef = useRef<any>(stepOn);
  stepOnRef.current = stepOn;
  const lock = (b: boolean) => { lockedByMe.current = b; api.lock(b); };
  useEffect(() => () => { tl.stop(); playing.current = false; if (lockedByMe.current) { lockedByMe.current = false; api.lock(false); } }, [qk]);
  const busy = tl.busy || S.moving || S.carry !== null;
  /* a restart of the phase (the header key, a phase dot) takes the guide steps back to the first: the warm-up starts over */
  const lastStep = useRef<any>(step);
  useEffect(() => {
    if (stage === "demo" && typeof step === "number" && typeof lastStep.current === "number" && step < lastStep.current) {
      tl.stop(); playing.current = false;
      Sr.current = fresh(qk); setRaw(Sr.current);
    }
    lastStep.current = step;
  }, [step, stage]);

  /* ── the room: the rail's stations lie left of the key's corner; the strips and the board use the whole width ── */
  const ww = box ? box.w : W.w;
  const kx = box && box.key ? box.key.x - 12 : ww;
  const RW = Math.min(ww, kx);
  const hw = Math.round(Math.max(184, Math.min(300, RW * 0.2)));
  const bw = Math.round(Math.max(200, Math.min(330, RW * 0.24)));
  const gap = Math.round(Math.max(14, RW * 0.02));
  const gw = Math.floor((RW - hw - bw - 3 * gap) / 2);
  const ST: any = { head: { x: 0, w: hw }, g1: { x: hw + gap, w: gw }, g2: { x: hw + 2 * gap + gw, w: gw }, bay: { x: RW - bw, w: bw } };
  const cw = hw - 12, chh = RL.rail - RL.cartY - 4, cardW = Math.floor((cw - 24) / 2);
  const cardSize = cardW >= 96 ? T.speech : T.label;
  const cartX = (pos: string) => ST[pos].x + (ST[pos].w - cw) / 2;
  const cartMid = (pos: string) => ({ x: cartX(pos) + cw / 2, y: RL.cartY + chh / 2 });
  const keyW = 240, keyH = 72, keyY = (box ? box.h : W.h) - 86;

  /* which gate takes this pair or set, if either does */
  const gateOf = () => {
    if (cards.every((f: any) => f[1] === cards[0][1])) return "g1";
    if (cards.every((f: any) => f[0] === cards[0][0])) return "g2";
    return null;
  };
  const gate = gateOf();
  const takes = (to: string) => (to === "bay" ? gate === null : gate === to);
  const shareNote = () => [isSet ? "this set shares" : "this pair shares", gate === "g1" ? "its lower number" : "its upper number"];
  const rowName = (g: string) => (g === "g1" ? "bottom" : "top");
  const stepName = (to: string) => (to === "g1" ? "gate1" : to === "g2" ? "gate2" : "bay");

  /* ── the two ribbons of a pair: wholes of one length, cut by the bottom number, filled by the top number ── */
  const wholesMax = Math.max(1, ...cards.map((f: any) => Math.ceil(f[0] / f[1])));
  const Lp = cur.kind === "bay" ? Math.min(520, ww * 0.36) : ww - RL.X0 - 30;
  const unit = Lp / wholesMax;
  const pairRows: any[] = isSet ? [] : cards.map((f: any, r: number) => {
    const wholes = Math.ceil(f[0] / f[1]);
    return { f, wholes, cells: wholes * f[1], cw: unit / f[1], w: wholes * unit, y: r === 0 ? RL.rowA : RL.rowB };
  });
  const cutSeq: any[] = [];
  pairRows.forEach((row: any, r: number) => { for (let j = 1; j < row.cells; j++) if (j % row.f[1] !== 0 && row.cw >= 5) cutSeq.push({ r, j }); });
  const fillSeq: any[] = [];
  for (let k = 0; k < Math.max(0, ...pairRows.map((row: any) => row.f[0])); k++) pairRows.forEach((row: any, r: number) => { if (k < row.f[0]) fillSeq.push({ r, c: k }); });
  const totalCut = cutSeq.length, totalFill = fillSeq.length;
  const prog: any = S.proof;
  const cutN = prog ? prog.cutN : 0, fillN = prog ? prog.fillN || 0 : 0;
  const bigIdx = () => (isSet ? -1 : cards[0][0] * cards[1][1] > cards[1][0] * cards[0][1] ? 0 : 1);

  /* ── the line-up board of a set ── */
  const MWb = ww - 272;
  const pitch = MWb / nC, bcw = Math.min(280, pitch - 24), bch = 136;
  const bx = (slot: number) => 6 + slot * pitch + (pitch - bcw) / 2;
  const by = RL.low0 + 4, sy = by + bch + 8, sh = 52;   /* 52: the strip ends at 432, just clear of the Next pair / Fill key at keyY 434 */
  const sUnit = (bcw - 12) / Math.max(1, ...cards.map((f: any) => Math.ceil(f[0] / f[1])));
  const ord: number[] = S.order.slice(0, nC);
  const orderText = (o: number[]) => railOrderText(o.map((k: number) => cards[k]));

  /* the answer the working area is holding right now (Enter commits it) */
  const valueOf = () => {
    if (isSet) return S.boardUp && S.moved ? orderText(ord) : null;
    if (cur.kind === "bay") return S.parked ? "not yet" : S.picked === null ? null : cards[S.picked][0] + "|" + cards[S.picked][1];
    if (cur.kind === "pick") return S.picked === null ? null : cards[S.picked][0] + "|" + cards[S.picked][1];
    return null;
  };
  const ask = !free && stage === "ask";
  useEffect(() => { api.answerReady(ask && cur.kind !== "sign" && valueOf() !== null); });

  /* a step's act, done when the child does it (or Enter / the agent / the dev driver does it for them) */
  const wrongAct = (name: string) => { api.did(name); };
  const sameStep = (name: string) => !demo || stage !== "demo" || stepOnRef.current === name;
  const reported = (name: string) => { if (stage === "demo" && Sr.current.qk === qk) api.did(name); };

  /* ── sending the pair (or the set) down the rail: a hand pushes it, then the gate tests it ── */
  const sendTo = async (to: string) => {
    const s = Sr.current;
    if (playing.current || tl.busy || s.held || s.open) return;
    if (!(free || stage === "ask" || stage === "demo")) return;
    if (to === s.pos && to !== "head") return;
    if (!sameStep(stepName(to))) { wrongAct(stepName(to)); return; }
    playing.current = true;
    put({ touched: true, moving: true, note: null, lit: {}, picked: null, parked: false, proof: null });
    if ((s.parked || (cur.kind === "bay" && s.picked !== null)) && stage === "ask") api.setTyped("");
    const a = cartMid(s.pos), b = cartMid(to);
    const ok = await api.act({ tool: "hand", moves: "push", hold: <g transform={`translate(${-cw / 2},${-chh / 2})`}>{cartArt()}</g>, from: a, at: [b], to: b });
    playing.current = false;
    if (!ok) { put({ moving: false }); return; }
    put({ pos: to, moving: false });
    const steps: any[] = [];
    if (to === "bay") {
      if (takes("bay")) steps.push([420, () => { put({ parked: true, note: RL_BAY_NOTE }); api.sfx.tick(); if (stage === "ask") api.setTyped("not yet"); }]);
      /* the bay refuses a pair a gate takes: [ms, fn] runs fn, THEN waits ms. The cart waits at the bay, rolls back to the head, and only then the reason is printed on the bare bay and held 1.5 s (never behind the parked cart) */
      else steps.push([320, () => {}], [560, () => put({ pos: "head" })], [1500, () => put({ note: shareNote() })], [0, () => put({ note: null })]);
    } else {
      steps.push([440, () => put({ lit: { [rowName(to)]: true } })]);
      if (takes(to)) {
        steps.push([360, () => { put({ open: to }); api.sfx.tick(); }]);
        if (isSet) steps.push([520, () => put({ boardUp: true })]);
      } else steps.push([700, () => put({ pos: "head" })], [420, () => {}]);
    }
    tl.run(steps, () => reported(stepName(to)));
  };

  /* ── Cut: scissors snip along every cut line of both ribbons, then Fill: a pencil shades the counted parts ── */
  const doCut = async () => {
    const s = Sr.current;
    if (playing.current || tl.busy || s.held || isSet || !s.open) return;
    if (s.proof && (totalCut === 0 || s.proof.cutN >= totalCut)) return;
    if (!sameStep("cut")) { wrongAct("cut"); return; }
    playing.current = true;
    put({ touched: true, proof: { cutN: 0, fillN: 0, measure: false, lift: -1 } });
    let ok = true;
    if (totalCut > 0) {
      ok = await api.act({ tool: "scissors", moves: "snip", at: cutSeq.map((e: any) => ({ x: RL.X0 + e.j * pairRows[e.r].cw, y: pairRows[e.r].y + RL.stripH / 2 })),
        onPoint: (i: number) => put({ proof: { ...(Sr.current.proof || { fillN: 0, measure: false, lift: -1 }), cutN: i + 1 } }) });
    }
    playing.current = false;
    if (!ok) { put({ proof: null }); return; }
    put({ proof: { ...(Sr.current.proof || {}), cutN: Math.max(totalCut, 1), fillN: 0, measure: false, lift: -1 } });
    api.sfx.settle();
    reported("cut");
  };
  const doFill = async () => {
    const s = Sr.current;
    if (playing.current || tl.busy || s.held || !s.open) return;
    if (isSet) {
      if (!s.boardUp || (s.proof && s.proof.fillCards >= nC)) return;
      if (!sameStep("fill")) { wrongAct("fill"); return; }
      playing.current = true;
      put({ touched: true, proof: { cutN: 999, fillN: 0, fillCards: 0, measure: false, lift: -1 } });
      const ok = await api.act({ tool: "pencil", moves: "rub", at: ord.map((k: number, slot: number) => ({ x: bx(slot) + 6 + sUnit * 0.5, y: sy + sh / 2 })),
        onPoint: (i: number) => put({ proof: { ...Sr.current.proof, fillCards: i + 1 } }) });
      playing.current = false;
      if (!ok) { put({ proof: null }); return; }
      put({ proof: { ...Sr.current.proof, fillCards: nC } });
      api.sfx.settle();
      reported("fill");
      return;
    }
    if (!s.proof || (totalCut > 0 && s.proof.cutN < totalCut) || s.proof.fillN >= totalFill) return;
    if (!sameStep("fill")) { wrongAct("fill"); return; }
    playing.current = true;
    put({ touched: true });
    const ok = await api.act({ tool: "pencil", moves: "rub", at: fillSeq.map((e: any) => ({ x: RL.X0 + (e.c + 0.5) * pairRows[e.r].cw, y: pairRows[e.r].y + RL.stripH / 2 })),
      onPoint: (i: number) => put({ proof: { ...Sr.current.proof, fillN: i + 1 } }) });
    playing.current = false;
    if (!ok) return;
    put({ proof: { ...Sr.current.proof, fillN: totalFill } });
    api.sfx.settle();
    tl.run([[320, () => { if (gate === "g2") put({ proof: { ...Sr.current.proof, measure: true } }); }],
      [520, () => { put({ proof: { ...Sr.current.proof, lift: bigIdx() } }); api.sfx.tick(); }], [500, () => {}]], () => reported("fill"));
  };

  /* ── the board: two cards change places ── */
  const doSwap = (a: number, b: number) => {
    const s = Sr.current;
    const o = s.order.slice(), ia = o.indexOf(a), ib = o.indexOf(b);
    if (ia < 0 || ib < 0) { put({ carry: null }); return; }
    o[ia] = b; o[ib] = a;
    put({ order: o, sel: null, carry: null, moved: true }); api.sfx.tick();
    if (stage === "ask") api.setTyped(orderText(o.slice(0, nC)));
    reported("swap");
  };
  /* a drag swaps at once (the child's own hand); a tap on the second card is an act, so a hand carries the first across */
  const swap = (a: number, b: number, byHand?: boolean) => {
    const s = Sr.current;
    if (playing.current || tl.busy || s.held || !s.boardUp || a === b) return;
    if (!byHand) { doSwap(a, b); return; }
    playing.current = true;
    put({ sel: null, carry: a });
    const mid = (slot: number) => ({ x: bx(slot) + bcw / 2, y: by + bch / 2 });
    const hold = <g transform={`translate(${-bcw / 2},${-bch / 2})`}><RlCard x={0} y={0} w={bcw} h={bch} f={cards[a]} size={T.xl} C={C} litTop={!!s.lit.top} litBottom={!!s.lit.bottom} /></g>;
    api.act({ tool: "hand", moves: "carry", hold, from: mid(s.order.indexOf(a)), at: [mid(s.order.indexOf(b))], to: mid(s.order.indexOf(b)) }).then((ok: any) => {
      playing.current = false;
      if (!ok) { put({ carry: null }); return; }
      doSwap(a, b);
    });
  };
  const tapCard = (k: number) => {
    const s = Sr.current;
    if (playing.current || tl.busy || s.held || !s.boardUp) return;
    if (s.sel === null) { put({ sel: k }); api.sfx.tick(); return; }
    if (s.sel === k) { put({ sel: null }); return; }
    swap(s.sel, k, true);
  };
  const slotAt = (p: any) => {
    if (!(p.y > RL.low0 - 20)) return -1;
    return Math.max(0, Math.min(nC - 1, Math.floor((p.x - 6) / pitch)));
  };
  const drag = useDrag((payload: any, p: any, moved: boolean) => {
    if (payload.src !== "card") return;
    if (!moved) { tapCard(payload.k); return; }
    const sl = slotAt(p);
    if (sl >= 0 && Sr.current.order[sl] !== payload.k) swap(payload.k, Sr.current.order[sl]);
    else if (stage === "demo") api.did("card");
  });

  /* a card claimed off the cart: inside the gate that opened, or (a pair no gate takes) as the guess the bay answers */
  const pickCard = (k: number) => {
    const s = Sr.current;
    if (playing.current || tl.busy || s.held) return;
    put({ picked: k }); api.sfx.tick();
    if (stage === "ask") api.setTyped(cards[k][0] + "|" + cards[k][1]);
  };

  /* Enter commits what the working area is holding (a step's act in a steps phase) */
  const enterFn: any = stage !== "ask" || busy || cur.kind === "sign" ? null : () => {
    const v = valueOf();
    if (!v) return;
    put({ held: false });
    api.submit(v);
  };
  const act = (on: any) => {
    if (on === "gate1") return sendTo("g1");
    if (on === "gate2") return sendTo("g2");
    if (on === "bay") return sendTo("bay");
    if (on === "cut") return doCut();
    if (on === "fill") return doFill();
    if (on === "swap") { const o = Sr.current.order; return swap(o[0], o[1], true); }
  };
  api.onEnter(stage === "demo" && stepOn ? () => act(stepOn) : enterFn);
  HOOK.enter = () => enterFn && enterFn();
  HOOK.demo = () => act(stepOnRef.current);
  const pressKey = (on: string) => {
    const t = Date.now();
    if (t - lastKey.current < 400) return;
    lastKey.current = t;
    act(on);
  };

  /* the agent sets the answer on the working area exactly as a child would */
  HOOK.set = (v: any) => {
    if (stage !== "ask" && !free) return false;
    put({ held: false });
    const g = gate;
    if (cur.kind === "bay") {
      if (g !== null) return false;
      if (railNotYet(v)) {
        put({ pos: "bay", parked: true, picked: null, note: RL_BAY_NOTE, lit: { top: true, bottom: true } });
        api.setTyped("not yet");
        return true;
      }
      const want = railList(v)[0], k = cards.findIndex((f: any) => railSame(f, want));
      if (k < 0) return false;
      put({ parked: false, pos: "head", picked: k });
      api.setTyped(cards[k][0] + "|" + cards[k][1]);
      return true;
    }
    if (cur.kind === "pick") {
      const want = railList(v)[0], k = cards.findIndex((f: any) => railSame(f, want));
      if (k < 0 || !g) return false;
      put({ pos: g, open: g, lit: { [rowName(g)]: true }, picked: k });
      api.setTyped(cards[k][0] + "|" + cards[k][1]);
      return true;
    }
    if (isSet) {
      const list = railList(v);
      if (!g || list.length !== cards.length) return false;
      const o: number[] = [];
      for (const f of list) { const k = cards.findIndex((c: any, i: number) => railSame(c, f) && o.indexOf(i) < 0); if (k < 0) return false; o.push(k); }
      put({ pos: g, open: g, lit: { [rowName(g)]: true }, boardUp: true, moved: true, order: o.concat([o.length, o.length + 1].filter((x) => x < 6)) });
      api.setTyped(orderText(o));
      return true;
    }
    return false;
  };

  /* ── the proof: both fractions drawn as ribbons, filled part by part, and the greater lifts clear ── */
  const proofSteps = (measure: boolean, lift: boolean) => {
    const st: any[] = [[420, () => put({ proof: { cutN: 999, fillN: 0, fillCards: 0, measure: false, lift: -1 } })]];
    if (isSet) for (let k = 1; k <= nC; k++) st.push([260, () => put({ proof: { ...Sr.current.proof, fillCards: k } })]);
    else for (let i = 1; i <= totalFill; i++) st.push([90, () => put({ proof: { ...Sr.current.proof, fillN: i } })]);
    if (measure) st.push([520, () => put({ proof: { ...Sr.current.proof, measure: true } })]);
    if (lift) st.push([520, () => { put({ proof: { ...Sr.current.proof, lift: bigIdx() } }); api.sfx.tick(); }]);
    st.push([600, () => {}]);
    return st;
  };
  /* the pair (or set) rolls to the gate that takes it and the gate opens, if it has not already */
  const routeSteps = () => {
    const g = gate;
    if (!g || Sr.current.open === g) return [];
    return [[420, () => put({ pos: "head", parked: false, note: null })],
      [520, () => put({ pos: g })],
      [420, () => put({ lit: { [rowName(g)]: true } })],
      [360, () => { put({ open: g }); api.sfx.tick(); }],
      ...(isSet ? [[480, () => put({ boardUp: true })]] : [])];
  };

  /* the win: the gate proves it, and the greater lifts clear */
  useEffect(() => {
    if (stage !== "win") return;
    if (cur.win) api.say(cur.win);
    if (cur.kind === "bay") { tl.run([[400, () => put({ parked: true, pos: "bay", note: RL_BAY_NOTE })]]); return; }
    if (cur.kind === "sign") { tl.run([...routeSteps(), [400, () => put({ sign: cur.answer })], ...proofSteps(gate === "g2", true)]); return; }
    if (cur.kind === "pick") { tl.run([...routeSteps(), ...proofSteps(gate === "g2", true)]); return; }
    const over = cards.find((f: any) => f[1] === 1);
    tl.run([...routeSteps(), ...proofSteps(false, false), ...(over ? [[700, () => put({ reader: over })]] : [])]);
  }, [stage]);

  /* the traceback: the maths redrawn, ending on the whole right answer; nothing marked */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    lock(true);
    put({ touched: true });
    const done = () => lock(false);
    if (cur.kind === "bay") {
      tl.run([
        [420, () => put({ picked: null, proof: null, pos: "head", parked: false, note: null, lit: {} })],
        [520, () => put({ pos: "g1" })], [460, () => put({ lit: { bottom: true } })],
        [560, () => put({ pos: "g2" })], [460, () => put({ lit: { top: true } })],
        [560, () => put({ pos: "bay" })], [420, () => { put({ parked: true, note: RL_BAY_NOTE }); api.sfx.tick(); }],
        [500, () => put({ held: true })],
      ], done);
      return;
    }
    if (isSet) {
      const mine = railList(wrong.value), g = gate || "g1";
      const o: number[] = [];
      for (const f of mine) { const k = cards.findIndex((c: any, i: number) => railSame(c, f) && o.indexOf(i) < 0); if (k >= 0) o.push(k); }
      const shown = o.length === cards.length ? o.concat([6, 7].slice(0, 0)) : Sr.current.order.slice(0, nC);
      const right: number[] = railList(cur.answer).map((f: any) => cards.findIndex((c: any) => railSame(c, f)));
      const over = cards.find((f: any) => f[1] === 1);
      tl.run([
        ...routeSteps(),
        [420, () => put({ proof: null, order: shown.concat(Sr.current.order.slice(shown.length)), boardUp: true, moved: true })],
        [700, () => put({ lit: { [rowName(g)]: true } })],
        [700, () => put({ lit: { top: true, bottom: true } })],
        ...proofSteps(false, false),
        [700, () => { put({ order: right.concat(Sr.current.order.slice(right.length)), sel: null }); api.sfx.tick(); }],
        [700, () => put({ reader: over || null, held: true })],
      ], done);
      return;
    }
    tl.run([[360, () => put({ picked: null, proof: null })], ...routeSteps(), ...proofSteps(gate === "g2", true),
      ...(cur.kind === "sign" ? [[420, () => put({ sign: cur.answer })]] : [])], done);
  }, [wrong]);

  /* what the host and the teacher agent read back (toolApi.getState) */
  api.share({
    left: railText(cards[0]), right: railText(cards[cards.length - 1]),
    gateOpened: S.open ? (S.open === "g1" ? "same lower" : "same upper") : null,
    verdict: valueOf(), parked: S.parked, direction: isSet ? (cur.dir === "down" ? "descending" : "ascending") : null,
    lineUp: isSet && S.boardUp ? ord.map((k: number) => railText(cards[k])) : null,
    complete: stage === "idle",
  });

  /* ── drawing ── */
  const ink = C.ink;
  const dragging = drag.drag && drag.drag.moved ? drag.drag : null;
  const canSend = !busy && !S.held && (free || stage === "ask" || stage === "demo") && !S.open && !(isSet && S.boardUp);
  const canPick = !busy && !S.held && ask && cur.kind === "pick" && !!S.open;
  const claim = !busy && !S.held && ask && cur.kind === "bay" && !S.parked && S.pos === "head";
  const boardLive = !busy && !S.held && S.boardUp && (free || stage === "ask" || stage === "demo");
  const rowCut = (r: number) => !!prog && cutSeq.every((e: any, i: number) => e.r !== r || i < cutN);
  const cutIsOn = (r: number, j: number) => cutSeq.findIndex((e: any) => e.r === r && e.j === j) < cutN;
  const fillIsOn = (r: number, c: number) => fillSeq.findIndex((e: any) => e.r === r && e.c === c) < fillN;
  /* the one key of the Cut / Fill sequence: its label follows the act (PATTERNS 16c); none while a question is graded */
  const seqKey: string | null = !(stage === "demo" || free) || busy || S.held || !S.open ? null
    : isSet ? (S.boardUp && (!prog || (prog.fillCards || 0) < nC) ? "fill" : null)
    : (!prog || (totalCut > 0 && cutN < totalCut) ? "cut" : fillN < totalFill ? "fill" : null);
  const keyX = Math.round(ww / 2 - keyW / 2);
  const invite: any = busy || S.held ? null
    : stage === "demo" && stepOn
      ? (stepOn === "gate1" || stepOn === "gate2" || stepOn === "bay"
        ? { x: ST[stepOn === "gate1" ? "g1" : stepOn === "gate2" ? "g2" : "bay"].x + ST[stepOn === "gate1" ? "g1" : stepOn === "gate2" ? "g2" : "bay"].w / 2, y: (RL.top + 12 + RL.rail - 10) / 2, w: ST[stepOn === "gate1" ? "g1" : stepOn === "gate2" ? "g2" : "bay"].w - 24, h: RL.rail - 10 - RL.top - 12, rx: 16 }
        : stepOn === "cut" || stepOn === "fill" ? (seqKey ? { x: keyX + keyW / 2, y: keyY + keyH / 2, w: keyW, h: keyH, rx: 20 } : null)
        : stepOn === "swap" && S.boardUp ? { x: bx(0) + bcw / 2, y: by + bch / 2, w: bcw, h: bch, rx: 14 } : null)
      : ask && !S.touched && S.pos === "head" && !S.boardUp
        ? (cur.kind === "bay" ? { x: cartX("head") + cw / 2, y: RL.cartY + chh / 2, w: cw, h: chh - 8, rx: 16 }
          /* one ring round both gates: the first thing to touch is the gate that takes the pair */
          : { x: (ST.g1.x + ST.g2.x + ST.g2.w) / 2, y: (RL.top + 12 + RL.rail - 10) / 2, w: ST.g2.x + ST.g2.w - ST.g1.x - 24, h: RL.rail - 10 - RL.top - 12, rx: 16 }) : null;

  function cartArt() {
    return (
      <g>
        <rect x={0} y={chh - 24} width={cw} height={14} rx={6} fill={C.accent} />
        <circle cx={44} cy={chh - 6} r={12} fill={shade(C.dim, 0.25)} />
        <circle cx={cw - 44} cy={chh - 6} r={12} fill={shade(C.dim, 0.25)} />
        {isSet
          ? cards.map((f: any, k: number) => (
            <rect key={k} x={10 + k * 14} y={6 + k * 10} width={cw - 20 - (nC - 1) * 14} height={80} rx={12} fill={k === nC - 1 ? "#FFFFFF" : tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />
          ))
          : cards.map((f: any, k: number) => (
            <g key={k} className="rl-lift" style={{ transform: `translateY(${S.picked === k ? -8 : 0}px)` } as any}>
              <RlCard x={8 + k * (cardW + 8)} y={0} w={cardW} h={118} f={f} size={cardSize} C={C} litTop={!!S.lit.top} litBottom={!!S.lit.bottom}
                hot={!!prog && prog.lift === k} mine={S.picked === k} />
            </g>
          ))}
      </g>
    );
  }

  const station = (g: string) => {
    const z = ST[g], isOpen = S.open === g, litHere = S.pos === g && (S.lit.top || S.lit.bottom);
    return (
      <g key={g}>
        {isOpen && <rect x={z.x + 14} y={RL.top} width={z.w - 28} height={RL.rail - RL.top} rx={10} fill={tint(C.panel, 0.55)} />}
        <rect x={z.x + 2} y={RL.top} width={14} height={RL.rail - RL.top} rx={5} fill={C.dim} />
        <rect x={z.x + z.w - 16} y={RL.top} width={14} height={RL.rail - RL.top} rx={5} fill={C.dim} />
        <rect x={z.x} y={0} width={z.w} height={RL.top} rx={12} fill="#FFFFFF" stroke={isOpen || litHere ? C.accent : C.rule} strokeWidth={isOpen ? 4 : 2} filter="url(#fShadowSoft)" />
        <text x={z.x + z.w / 2} y={34} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ink}>{tx(g === "g1" ? "same lower" : "same upper")}</text>
        <g className="rl-arm" style={{ transform: `translateY(${isOpen ? -RL.lift : 0}px)` } as any}>
          <rect x={z.x + 12} y={RL.arm} width={z.w - 24} height={20} rx={7} fill={shade(C.dim, 0.18)} />
          {Array.from({ length: Math.max(3, Math.floor((z.w - 48) / 38)) }).map((_, k) => <rect key={k} x={z.x + 26 + k * 38} y={RL.arm + 3} width={14} height={14} rx={3} fill={tint(C.dim, 0.75)} />)}
        </g>
      </g>
    );
  };

  const gateBtn = (g: string, label: string) => (
    <Hit id={stepName(g)} label={label} x={ST[g].x} y={0} w={ST[g].w} h={RL.rail} onPress={() => sendTo(g)} />
  );

  return (
    <g>
      <style>{RL_CSS}</style>

      {/* the rail and its sleepers */}
      <rect x={0} y={RL.rail} width={RW} height={10} rx={5} fill={shade(C.dim, 0.12)} />
      {Array.from({ length: Math.floor(RW / 40) }).map((_, k) => <rect key={k} x={6 + k * 40} y={RL.rail + 10} width={22} height={10} rx={3} fill={C.rule} />)}

      {/* the two gates: an archway that says what it tests, and opens only when its own test passes */}
      {station("g1")}
      {station("g2")}

      {/* the not yet bay: a labelled place, never a bin */}
      <g>
        <rect x={ST.bay.x} y={RL.top} width={ST.bay.w} height={RL.rail - RL.top} rx={16} fill={tint(SKY, 0.86)} stroke={tint(SKY, 0.3)} strokeWidth={2} />
        <rect x={ST.bay.x} y={0} width={ST.bay.w} height={RL.top} rx={12} fill={tint(SKY, 0.6)} stroke={S.parked ? shade(SKY, 0.45) : tint(SKY, 0.28)} strokeWidth={S.parked ? 4 : 2} filter="url(#fShadowSoft)" />
        <text x={ST.bay.x + ST.bay.w / 2} y={lang === "en" ? 34 : 38} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(SKY, 0.5)}>{tx("not yet")}</text>
        {S.note && !S.parked && S.note.map((ln: string, k: number) => (
          <text key={k} x={ST.bay.w < 280 ? ST.bay.x + ST.bay.w - 8 : ST.bay.x + ST.bay.w / 2} y={128 + k * 38} textAnchor={ST.bay.w < 280 ? "end" : "middle"} fontSize={T.micro} fontWeight={700} fill={shade(SKY, 0.5)}>{tx(ln)}</text>
        ))}
      </g>

      {/* the cart: the pair (or the set) riding the rail */}
      {!S.moving && (
        <g key="cart" className="rl-roll" style={{ transform: `translateX(${cartX(S.pos)}px)` } as any}>
          <g transform={`translate(0,${RL.cartY})`}>
            {cartArt()}
            {!isSet && (canPick || claim) && cards.map((f: any, k: number) => (
              <RlTap key={k} id={"card-" + k} label={"Pick " + fractionWords(f[0], f[1])} x={8 + k * (cardW + 8)} y={0} w={cardW} h={118}
                onPress={() => pickCard(k)} done={S.picked === k} />
            ))}
          </g>
        </g>
      )}

      {/* a fraction written over one, read as that many whole circles */}
      {S.reader && (() => {
        /* a fraction over one, read as that many whole circles: as large as the head zone allows, a green-washed cake when a circle is 28 across or more */
        const cnt = Math.min(S.reader[0], 12), cols = Math.ceil(cnt / 2), rows = cnt > cols ? 2 : 1;
        const room = RL.rail - 40 - 14;
        const r = Math.max(10, Math.min(40, Math.floor((hw - 16 - (cols - 1) * 4) / (2 * cols)), Math.floor((room - (rows - 1) * 6) / (2 * rows))));
        const tw = cols * 2 * r + (cols - 1) * 4, th = rows * 2 * r + (rows - 1) * 6;
        const x0 = (hw - tw) / 2 + r, y0 = 14 + (room - th) / 2 + r;
        return (
          <g>
            {Array.from({ length: cnt }).map((_, k) => {
              const cx = x0 + (k % cols) * (2 * r + 4), cy = y0 + Math.floor(k / cols) * (2 * r + 6);
              return (
                <g key={k}>
                  <Disc x={cx} y={cy} r={r} paint="gOne" flat />
                  {2 * r >= 28 && (
                    <g>
                      <clipPath id={"rl-rd" + k}><circle cx={cx} cy={cy} r={r} /></clipPath>
                      <Skin name="disc" x={cx - r} y={cy - r} w={2 * r} h={2 * r} clip={"url(#rl-rd" + k + ")"} />
                      <circle cx={cx} cy={cy} r={r} fill={CONTENT.one} fillOpacity={0.35} stroke={shade(CONTENT.one, 0.3)} strokeWidth={3} />
                    </g>
                  )}
                </g>
              );
            })}
            <text x={hw / 2} y={RL.rail - 6} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ink}>{S.reader[0] + " " + tx("wholes")}</text>
          </g>
        );
      })()}

      {/* the lower half: two ribbons for a pair, the line-up board for a set */}
      {!isSet && (
        <g>
          {pairRows.map((row: any, r: number) => {
            const up = !!prog && prog.lift === r, cutOk = rowCut(r) && (cutN > 0 || totalCut === 0);
            return (
              <g key={r}>
                {cutOk
                  ? <RlFrac x={70} y={row.y + RL.stripH / 2 - (up ? 10 : 0)} f={row.f} size={T.prompt} fill={up ? shade(VERM, 0.25) : ink} />
                  : (
                    <g>
                      <text x={70} y={row.y + (lang === "en" ? 20 : 14)} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ink}>{tx("one")}</text>
                      <text x={70} y={row.y + 54} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ink}>{tx("whole")}</text>
                    </g>
                  )}
                <RlStrip x={RL.X0} y={row.y} h={RL.stripH} unit={unit} f={row.f} wholes={row.wholes} cutDone={cutOk}
                  cutVis={(j: number) => cutIsOn(r, j)} fillOn={(c: number) => fillIsOn(r, c)} lift={up} C={C} />
              </g>
            );
          })}
          {prog && prog.measure && (() => {
            const len = (row: any) => RL.X0 + row.cw * row.f[0];
            const a = len(pairRows[0]), b = len(pairRows[1]), lo = Math.min(a, b), hi = Math.max(a, b);
            const mid = (RL.rowA + RL.stripH + RL.rowB) / 2;
            return (
              <g>
                <line x1={hi} y1={RL.rowA} x2={hi} y2={RL.rowB + RL.stripH} stroke={CONTENT.line} strokeWidth={2} strokeDasharray="7 7" />
                <line x1={lo} y1={mid} x2={hi} y2={mid} stroke={shade(VERM, 0.1)} strokeWidth={5} />
                <line x1={lo} y1={mid - 11} x2={lo} y2={mid + 11} stroke={shade(VERM, 0.1)} strokeWidth={5} />
                <line x1={hi} y1={mid - 11} x2={hi} y2={mid + 11} stroke={shade(VERM, 0.1)} strokeWidth={5} />
              </g>
            );
          })()}
          {prog && cur.kind === "sign" && S.sign && (
            <text x={RL.X0 + 32} y={(RL.rowA + RL.stripH + RL.rowB) / 2 + 17} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={ink}>{S.sign}</text>
          )}
          {/* the bay's printed reason: a labelled plaque beside the wholes, a settled end state */}
          {S.parked && (() => {
            const pw = Math.max(480, Math.min(ww - (RL.X0 + Lp + 40) - 14, 760)), px = Math.min(RL.X0 + Lp + 40, ww - 14 - pw);
            return (
              <g>
                <rect x={px} y={RL.rowA} width={pw} height={RL.rowB + RL.stripH - RL.rowA} rx={16} fill={tint(SKY, 0.78)} stroke={tint(SKY, 0.3)} strokeWidth={2} />
                {RL_BAY_NOTE.map((ln: string, k: number) => (
                  <text key={k} x={px + pw / 2} y={RL.rowA + 66 + k * 58} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={shade(SKY, 0.5)}>{tx(ln)}</text>
                ))}
              </g>
            );
          })()}
        </g>
      )}

      {isSet && (
        <g>
          {cards.map((f: any, k: number) => {
            if (S.carry === k) return null;
            const slot = ord.indexOf(k);
            const grabbed = dragging && dragging.payload.src === "card" && dragging.payload.k === k;
            const dx = grabbed ? dragging.x - bcw / 2 : bx(slot), dy = grabbed ? dragging.y - bch / 2 - by : 0;
            const strips = prog && prog.cutN >= 999;
            const filled = !!prog && slot < (prog.fillCards || 0);
            return (
              <g key={k} className={grabbed ? "" : "rl-slide"} style={{ transform: `translate(${dx}px, ${dy}px)` } as any}>
                <RlCard x={0} y={by} w={bcw} h={bch} f={f} size={T.xl} C={C} litTop={!!S.lit.top} litBottom={!!S.lit.bottom} mine={S.sel === k} />
                {strips && (
                  <RlStrip x={6} y={sy} h={sh} unit={sUnit} f={f} wholes={Math.ceil(f[0] / f[1])} cutDone cutVis={() => true}
                    fillOn={() => filled} lift={false} C={C} thin />
                )}
                {boardLive && (
                  <g className="rl-grab c4-piece" {...control("card-" + k, "Move " + fractionWords(f[0], f[1]) + " along the board")}
                    {...drag.bind({ src: "card", k })} {...drag.keys({ src: "card", k })}
                    onKeyDown={(e: any) => { if (e.key === "Enter" && S.sel === k) return; const kk = drag.keys({ src: "card", k }).onKeyDown; if (kk) kk(e); }}>
                    <rect x={0} y={by} width={bcw} height={bch} fill="transparent" />
                  </g>
                )}
              </g>
            );
          })}
          {/* which way the list runs, as the question sets it */}
          <g>
            <rect x={ww - 252} y={by} width={242} height={bch} rx={16} fill={tint(C.panel, 0.45)} stroke={C.rule} strokeWidth={2} />
            {Array.from({ length: 3 }).map((_, k) => {
              const h = 22 + (cur.dir === "down" ? 2 - k : k) * 20;
              return <rect key={k} x={ww - 252 + 76 + k * 32} y={by + 80 - h} width={24} height={h} rx={5} fill={shade(C.accent, 0.1)} />;
            })}
            <text x={ww - 131} y={by + 118} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ink}>{tx(cur.dir === "down" ? "descending" : "ascending")}</text>
          </g>
        </g>
      )}

      {/* the Cut / Fill key: ONE key at the bottom centre, its label follows the act */}
      {seqKey && (
        <Key key="seq" id={seqKey} label={seqKey === "cut" ? "Cut both ribbons" : "Fill the counted parts"} x={keyX} y={keyY} w={keyW} h={keyH} C={C} tone="key" onClick={() => pressKey(seqKey)}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{tx(seqKey === "cut" ? "Cut" : "Fill")}</text>
        </Key>
      )}
      {free && !busy && (
        <Key id="free-next" label="Load the next pair or set onto the rail" x={0} y={keyY} w={220} h={keyH} C={C} tone="enter"
          onClick={() => { tl.stop(); playing.current = false; setFreeIdx((k: number) => k + 1); }}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("enter", "#FFFFFF")}>{tx("Next pair")}</text>
        </Key>
      )}

      {/* the taps: a gate, or the bay, takes the pair when it is touched; nothing else is a control until a gate has opened */}
      {canSend && gateBtn("g1", "Send the " + (isSet ? "set" : "pair") + " to the same lower gate")}
      {canSend && gateBtn("g2", "Send the " + (isSet ? "set" : "pair") + " to the same upper gate")}
      {canSend && !S.parked && (
        <Hit id="bay" label={"Park the " + (isSet ? "set" : "pair") + " in the not yet bay"} x={ST.bay.x} y={0} w={ST.bay.w} h={RL.rail} onPress={() => sendTo("bay")} />
      )}

      {invite && <Invite x={invite.x} y={invite.y} w={invite.w} h={invite.h} rx={invite.rx} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const L = (result && result.last) || {};
  const q: any = it || L.it;
  if (!q || L.value === null || L.value === undefined) return null;
  const y = h / 2;
  const box = <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />;
  if (q.kind === "order") {
    const list = railList(L.value);
    const step = (w - 16) / Math.max(1, list.length);
    return (
      <g>
        {box}
        {list.map((f: any, k: number) => (
          <g key={k}>
            <RlFrac x={8 + step * (k + 0.5)} y={y} f={f} size={T.micro} fill={C.ink} maxW={step - 24} />
            {k > 0 && step >= 50 && <text x={8 + step * k} y={y + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={mix(C.ink, C.panel, 0.3)}>{q.dir === "down" ? ">" : "<"}</text>}
          </g>
        ))}
      </g>
    );
  }
  const a = q.pair[0], b = q.pair[1];
  if (q.kind === "bay") {
    return (
      <g>
        {box}
        <RlFrac x={40} y={y} f={a} size={T.micro} fill={C.ink} />
        <rect x={72} y={y - 17} width={96} height={34} rx={10} fill={tint(SKY, 0.65)} />
        <text x={120} y={y + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={shade(SKY, 0.5)}>{tx("not yet")}</text>
        <RlFrac x={200} y={y} f={b} size={T.micro} fill={C.ink} />
      </g>
    );
  }
  const big = q.kind === "sign" ? String(L.value) : railSame(railList(L.value)[0], a) ? ">" : "<";
  return (
    <g>
      {box}
      <RlFrac x={56} y={y} f={a} size={T.micro} fill={big === ">" ? shade(VERM, 0.25) : C.ink} />
      <text x={w / 2} y={y + 10} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{big}</text>
      <RlFrac x={w - 56} y={y} f={b} size={T.micro} fill={big === "<" ? shade(VERM, 0.25) : C.ink} />
    </g>
  );
}

function WhichIsMoreRail(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout and the new look (LAYOUT.md §1b, §1d): no question bar, four phase dots, a one-sentence bubble */
      board: true, keyOnly: true, bigPad: true, nextKey: true, navDots: true,
      StartArt, START_HOOK,
      }} />
  );
}

export default WhichIsMoreRail;
