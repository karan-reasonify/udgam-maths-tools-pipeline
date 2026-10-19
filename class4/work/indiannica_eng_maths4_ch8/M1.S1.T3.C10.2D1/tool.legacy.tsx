/* ═══ M1.S1.T3.C10.2D1 · zoom_grid · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "zoom_grid";
const MEDIA_ID = "M1.S1.T3.C10.2D1";
const TOOL_NAME = "Zoom Grid";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["One piece off the strip and into the glass. Watch what happens when it is cut again."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Three names on the ladder, and every one of them made by the same single cut.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Lift any piece, split as often as the stage allows. Grid and word pad are open. Colour some cells to see them in words.";

/* Hindi and Gujarati, keyed by the English line exactly (runtime r21: `lineFor(line, lang, TR)`); the English
   above and below stays what the checks read. NCERT class 4 decimals: दशमलव / દશાંશ, दसवाँ / सौवाँ /
   हज़ारवाँ भाग and દશમો / સોમો / હજારમો ભાગ (plural दसवें भाग / દશમા ભાગ), जाली / ગ્રીડ, पट्टी / પટ્ટી.
   Digits stay digits (the runtime speaks them). The three amounts of phase 4 are also drawn word by word:
   their entry is the tiles of the bay, joined by "|" (the last tile is the word that names the denominator).
   A first draft; wants a native speaker's read. */
const TR: any = {
  hi: {
    "Zoom Grid": "ज़ूम जाली",
    "One piece off the strip and into the glass. Watch what happens when it is cut again.": "पट्टी से एक टुकड़ा उठाकर काँच में रखा। देखो, इसे फिर से काटने पर क्या होता है।",
    "Three names on the ladder, and every one of them made by the same single cut.": "सीढ़ी पर तीन नाम, और हर नाम एक ही तरह काटने से बना।",
    "Free play. Lift any piece, split as often as the stage allows. Grid and word pad are open. Colour some cells to see them in words.": "मुक्त खेल। कोई भी टुकड़ा उठाओ, जितनी बार हो सके बाँटो। जाली और शब्द पैड खुले हैं। कुछ खाने रंगो और उन्हें शब्दों में देखो।",
    /* phase 1 */
    "Splitting a tenth again": "दसवें भाग को फिर से बाँटना",
    "Cut that one tenth into equal pieces, and count what comes out.": "उस एक दसवें भाग को बराबर टुकड़ों में काटो, और निकले टुकड़े गिनो।",
    "The glass holds the piece big enough to see, while the strip keeps its real size.": "काँच टुकड़े को इतना बड़ा दिखाता है कि वह साफ़ दिखे, जबकि पट्टी अपने असली आकार में रहती है।",
    "The strip is ten of these tenths, and every one of them can be cut the same way.": "पट्टी में ऐसे दस दसवें भाग हैं, और हर एक को इसी तरह काटा जा सकता है।",
    "How many pieces did that one piece become?": "वह एक टुकड़ा कितने टुकड़े बन गया?",
    "Put the pieces back beside the one they came from and count them into it again.": "टुकड़ों को वापस उसी खाली जगह में रखो जहाँ से वे आए थे, और गिनते जाओ।",
    "A hundredth is one tenth split into ten, so one tenth is ten hundredths.": "एक दसवें भाग के दस टुकड़े करने से सौवाँ भाग बनता है, इसलिए एक दसवें भाग में दस सौवें भाग होते हैं।",
    "You learned: ten hundredths fit exactly into one tenth.": "तुमने सीखा: दस सौवें भाग मिलकर ठीक एक दसवाँ भाग बनाते हैं।",
    "One piece as a fraction": "एक टुकड़ा भिन्न में",
    "Write one of the pieces in the glass as a fraction of the whole strip.": "काँच में रखे एक टुकड़े को पूरी पट्टी के भिन्न के रूप में लिखो।",
    "What was in the glass before it was cut?": "काटने से पहले काँच में क्या था?",
    "Hundredths in one tenth?": "एक दसवें भाग में कितने सौवें भाग?",
    "How many hundredths make one tenth?": "कितने सौवें भाग मिलकर एक दसवाँ भाग बनाते हैं?",
    "Count along the row that came out of the glass.": "काँच से निकली पंक्ति में गिनते जाओ।",
    "Shaded as a fraction": "रंगा भाग भिन्न में",
    "Some squares of the grid are shaded. Write the shaded part as a fraction.": "जाली के कुछ खाने रंगे हैं। रंगे हुए भाग को भिन्न के रूप में लिखो।",
    "Count the coloured squares first, and then count them all.": "पहले रंगे हुए खाने गिनो, फिर सारे खाने गिनो।",
    /* phase 2 */
    "One more split, and the pattern is clear": "एक और बँटवारा, और पैटर्न साफ़ है",
    "Split it once more. What do you think this one will be called?": "इसे एक बार और बाँटो। तुम्हारे हिसाब से इसका नाम क्या होगा?",
    "What happened to the piece before this one when it was cut?": "इससे पहले वाले टुकड़े को काटने पर क्या हुआ था?",
    "Read the ladder downwards, and say what each cut made.": "सीढ़ी को ऊपर से नीचे पढ़ो, और बताओ हर कट से क्या बना।",
    "A thousandth is one hundredth split into ten, and every place is a tenth of the place on its left.": "सौवें भाग के दस टुकड़ों से हज़ारवाँ भाग बनता है, और हर स्थान बाईं ओर वाले स्थान का दसवाँ भाग है।",
    "You learned: the same cut by ten makes each new place, again and again.": "तुमने सीखा: दस टुकड़े करने से हर बार एक नया स्थान बनता है।",
    "Name the new piece": "नए टुकड़े का नाम",
    "That one hundredth has been cut into equal pieces again. Say what one of the new pieces is called.": "उस सौवें भाग को फिर बराबर टुकड़ों में काटा गया। बताओ, नए टुकड़ों में से एक का नाम क्या है?",
    "What was in the glass this time?": "इस बार काँच में क्या था?",
    "Thousandths in one hundredth?": "एक सौवें भाग में कितने हज़ारवें भाग?",
    "How many thousandths make one hundredth?": "कितने हज़ारवें भाग मिलकर एक सौवाँ भाग बनाते हैं?",
    "Count the new pieces inside the glass.": "काँच के अंदर नए टुकड़े गिनो।",
    "Which is smallest?": "सबसे छोटा कौन सा है?",
    "Look at the three rungs on the ladder. Which piece is the smallest?": "सीढ़ी के तीनों पायदान देखो। कौन सा टुकड़ा सबसे छोटा है?",
    "Each cut makes a piece smaller than the one before.": "हर कट से टुकड़ा पिछले टुकड़े से छोटा हो जाता है।",
    /* phase 3 */
    "Reading a shaded grid": "रंगी हुई जाली पढ़ना",
    "Count what is shaded. Now count the whole thing. Write both of them.": "रंगे हुए खाने गिनो। अब सारे खाने गिनो। दोनों को लिखो।",
    "How many of them are coloured?": "उनमें से कितने रंगे हैं?",
    "Slide the frame down the grid and count the rows as they light.": "फ़्रेम को जाली में नीचे सरकाओ और पंक्तियों को जगमगाते हुए गिनो।",
    "A shaded figure is read by counting the shaded parts for the top number. The total parts go underneath.": "रंगी आकृति पढ़ने के लिए रंगे भाग गिनो, वह ऊपर की संख्या है। कुल भाग नीचे लिखे जाते हैं।",
    "You learned: the whole grid goes below, the coloured part on top.": "तुमने सीखा: पूरी जाली नीचे, रंगा भाग ऊपर।",
    "Write the fraction": "भिन्न लिखो",
    "Write the shaded part of this grid as a fraction.": "इस जाली के रंगे भाग को भिन्न के रूप में लिखो।",
    "How many squares is the whole grid?": "पूरी जाली में कितने खाने हैं?",
    "Write the decimal": "दशमलव लिखो",
    "Here is a new grid. Say the same amount with a point instead.": "यह नई जाली है। यही मात्रा अब दशमलव बिंदु के साथ लिखो।",
    "Count the shaded squares in rows, not one by one.": "रंगे खाने एक-एक करके नहीं, पंक्तियों में गिनो।",
    "Score as a decimal": "प्राप्त अंक दशमलव में",
    "A test was marked out of a hundred and this many squares were coloured. Write the score with a point.": "एक परीक्षा सौ में से जाँची गई और इतने खाने रंगे गए। प्राप्त अंक बिंदु के साथ लिखो।",
    "Two digits go after the point for hundredths.": "सौवें भागों के लिए बिंदु के बाद दो अंक आते हैं।",
    /* phase 4 */
    "From words straight to a decimal fraction": "शब्दों से सीधे दशमलव भिन्न",
    "Listen to the last word. What does that word put underneath?": "आखिरी शब्द सुनो। वह शब्द नीचे कौन सी संख्या बताता है?",
    "Which rung of the ladder does that word name?": "वह शब्द सीढ़ी के किस पायदान का नाम है?",
    "Tap the last word in the bay and watch the ladder light.": "आखिरी शब्द पर टैप करो और सीढ़ी को जगमगाते देखो।",
    "The last word of a spoken amount names the denominator.": "बोली गई मात्रा का आखिरी शब्द हर का नाम बताता है।",
    "You learned: the word an amount ends on tells you the bottom number.": "तुमने सीखा: मात्रा जिस शब्द पर खत्म होती है, वह नीचे की संख्या बताता है।",
    "Write it as a fraction": "इसे भिन्न में लिखो",
    "Write two hundred five thousandths as a decimal fraction.": "दो सौ पाँच हज़ारवें भाग को दशमलव भिन्न के रूप में लिखो।",
    "What is the last word of the amount?": "मात्रा का आखिरी शब्द क्या है?",
    "Write this amount": "यह मात्रा लिखो",
    "Now write thirty-seven thousandths in the same way.": "अब सैंतीस हज़ारवें भाग को इसी तरह लिखो।",
    "Say the amount again and stop on the last word.": "मात्रा फिर से बोलो और आखिरी शब्द पर रुक जाओ।",
    "Write this one too": "इसे भी लिखो",
    "One more. Write four hundred nine thousandths.": "एक और। चार सौ नौ हज़ारवें भाग लिखो।",
    "The word hundred is inside the top number, not underneath.": "सौ शब्द ऊपर की संख्या के अंदर है, नीचे नहीं।",
    /* the working area's own words: the places, the choices, the amounts, the terms, the free-play keys */
    "places named": "स्थान के नाम बताए",
    "tenths": "दसवें भाग", "hundredths": "सौवें भाग", "thousandths": "हज़ारवें भाग",
    "hundredth": "सौवाँ भाग", "tenth": "दसवाँ भाग", "thousandth": "हज़ारवाँ भाग", "ten hundredth": "दस सौवें भाग",
    "hundredth part": "सौवाँ भाग",
    "one tenth": "एक दसवाँ भाग", "one hundredth": "एक सौवाँ भाग", "one thousandth": "एक हज़ारवाँ भाग",
    "two hundred five thousandths": "दो|सौ|पाँच|हज़ारवें भाग",
    "thirty-seven thousandths": "सैंतीस|हज़ारवें भाग",
    "four hundred nine thousandths": "चार|सौ|नौ|हज़ारवें भाग",
    "place value": "स्थानीय मान", "decimal place": "दशमलव स्थान", "decimal": "दशमलव", "decimal fraction": "दशमलव भिन्न", "decimal point": "दशमलव बिंदु",
    "Strip": "पट्टी", "Grid": "जाली", "Word pad": "शब्द पैड", "Next": "आगे", "Back": "पीछे", "Clear": "मिटाओ",
  },
  gu: {
    "Zoom Grid": "ઝૂમ ગ્રીડ",
    "One piece off the strip and into the glass. Watch what happens when it is cut again.": "પટ્ટીમાંથી એક ટુકડો કાઢીને કાચમાં મૂક્યો. જુઓ, તેને ફરી કાપવાથી શું થાય છે.",
    "Three names on the ladder, and every one of them made by the same single cut.": "સીડી પર ત્રણ નામ, અને દરેક નામ એક જ રીતે કાપવાથી બન્યું.",
    "Free play. Lift any piece, split as often as the stage allows. Grid and word pad are open. Colour some cells to see them in words.": "મુક્ત રમત. કોઈ પણ ટુકડો ઉપાડો, જેટલી વાર થઈ શકે તેટલી વાર વહેંચો. ગ્રીડ અને શબ્દ પેડ ખુલ્લાં છે. થોડાં ખાનાં રંગો અને તેમને શબ્દોમાં જુઓ.",
    /* phase 1 */
    "Splitting a tenth again": "દશમા ભાગને ફરી વહેંચવો",
    "Cut that one tenth into equal pieces, and count what comes out.": "તે એક દશમા ભાગને સરખા ટુકડામાં કાપો, અને નીકળેલા ટુકડા ગણો.",
    "The glass holds the piece big enough to see, while the strip keeps its real size.": "કાચ ટુકડાને જોઈ શકાય તેટલો મોટો બતાવે છે, જ્યારે પટ્ટી તેના અસલ કદમાં રહે છે.",
    "The strip is ten of these tenths, and every one of them can be cut the same way.": "પટ્ટીમાં આવા દસ દશમા ભાગ છે, અને દરેકને આ જ રીતે કાપી શકાય છે.",
    "How many pieces did that one piece become?": "તે એક ટુકડાના કેટલા ટુકડા થયા?",
    "Put the pieces back beside the one they came from and count them into it again.": "ટુકડાઓને જ્યાંથી આવ્યા હતા તે ખાલી જગ્યામાં પાછા મૂકો અને ગણતા જાઓ.",
    "A hundredth is one tenth split into ten, so one tenth is ten hundredths.": "એક દશમા ભાગના દસ ટુકડા કરવાથી સોમો ભાગ બને છે, તેથી એક દશમા ભાગમાં દસ સોમા ભાગ હોય છે.",
    "You learned: ten hundredths fit exactly into one tenth.": "તમે શીખ્યા: દસ સોમા ભાગ મળીને બરાબર એક દશમો ભાગ બને છે.",
    "One piece as a fraction": "એક ટુકડો અપૂર્ણાંકમાં",
    "Write one of the pieces in the glass as a fraction of the whole strip.": "કાચમાંના એક ટુકડાને આખી પટ્ટીના અપૂર્ણાંક તરીકે લખો.",
    "What was in the glass before it was cut?": "કાપતા પહેલાં કાચમાં શું હતું?",
    "Hundredths in one tenth?": "એક દશમા ભાગમાં કેટલા સોમા ભાગ?",
    "How many hundredths make one tenth?": "કેટલા સોમા ભાગ મળીને એક દશમો ભાગ બને?",
    "Count along the row that came out of the glass.": "કાચમાંથી નીકળેલી હરોળમાં ગણતા જાઓ.",
    "Shaded as a fraction": "રંગેલો ભાગ અપૂર્ણાંકમાં",
    "Some squares of the grid are shaded. Write the shaded part as a fraction.": "ગ્રીડનાં કેટલાંક ખાનાં રંગેલાં છે. રંગેલા ભાગને અપૂર્ણાંક તરીકે લખો.",
    "Count the coloured squares first, and then count them all.": "પહેલાં રંગેલાં ખાનાં ગણો, પછી બધાં ખાનાં ગણો.",
    /* phase 2 */
    "One more split, and the pattern is clear": "એક વધુ ભાગ, અને પેટર્ન સ્પષ્ટ છે",
    "Split it once more. What do you think this one will be called?": "તેને ફરી એક વાર વહેંચો. તમને શું લાગે છે, આનું નામ શું હશે?",
    "What happened to the piece before this one when it was cut?": "આની પહેલાંના ટુકડાને કાપ્યો ત્યારે શું થયું હતું?",
    "Read the ladder downwards, and say what each cut made.": "સીડી ઉપરથી નીચે વાંચો, અને કહો કે દરેક કાપથી શું બન્યું.",
    "A thousandth is one hundredth split into ten, and every place is a tenth of the place on its left.": "એક સોમા ભાગના દસ ટુકડા કરવાથી હજારમો ભાગ બને છે, અને દરેક સ્થાન તેની ડાબી બાજુના સ્થાનનો દશમો ભાગ છે.",
    "You learned: the same cut by ten makes each new place, again and again.": "તમે શીખ્યા: દસ ટુકડા કરવાથી દર વખતે એક નવું સ્થાન બને છે.",
    "Name the new piece": "નવા ટુકડાનું નામ",
    "That one hundredth has been cut into equal pieces again. Say what one of the new pieces is called.": "તે એક સોમા ભાગને ફરી સરખા ટુકડામાં કાપ્યો. કહો, નવા ટુકડાઓમાંથી એકનું નામ શું છે?",
    "What was in the glass this time?": "આ વખતે કાચમાં શું હતું?",
    "Thousandths in one hundredth?": "એક સોમા ભાગમાં કેટલા હજારમા ભાગ?",
    "How many thousandths make one hundredth?": "કેટલા હજારમા ભાગ મળીને એક સોમો ભાગ બને?",
    "Count the new pieces inside the glass.": "કાચની અંદર નવા ટુકડા ગણો.",
    "Which is smallest?": "સૌથી નાનો કયો?",
    "Look at the three rungs on the ladder. Which piece is the smallest?": "સીડીનાં ત્રણેય પગથિયાં જુઓ. કયો ટુકડો સૌથી નાનો છે?",
    "Each cut makes a piece smaller than the one before.": "દરેક કાપથી ટુકડો પહેલાંના ટુકડા કરતાં નાનો થાય છે.",
    /* phase 3 */
    "Reading a shaded grid": "રંગેલી ગ્રીડ વાંચવી",
    "Count what is shaded. Now count the whole thing. Write both of them.": "રંગેલાં ખાનાં ગણો. હવે બધાં ખાનાં ગણો. બંને લખો.",
    "How many of them are coloured?": "તેમાંથી કેટલાં રંગેલાં છે?",
    "Slide the frame down the grid and count the rows as they light.": "ફ્રેમને ગ્રીડમાં નીચે સરકાવો અને ઝળહળતી હરોળો ગણો.",
    "A shaded figure is read by counting the shaded parts for the top number. The total parts go underneath.": "રંગેલી આકૃતિ વાંચવા માટે રંગેલા ભાગ ગણો, તે ઉપરની સંખ્યા છે. કુલ ભાગ નીચે લખાય છે.",
    "You learned: the whole grid goes below, the coloured part on top.": "તમે શીખ્યા: આખી ગ્રીડ નીચે, રંગેલો ભાગ ઉપર.",
    "Write the fraction": "અપૂર્ણાંક લખો",
    "Write the shaded part of this grid as a fraction.": "આ ગ્રીડના રંગેલા ભાગને અપૂર્ણાંક તરીકે લખો.",
    "How many squares is the whole grid?": "આખી ગ્રીડમાં કેટલાં ખાનાં છે?",
    "Write the decimal": "દશાંશ લખો",
    "Here is a new grid. Say the same amount with a point instead.": "આ નવી ગ્રીડ છે. આ જ માત્રા હવે દશાંશ ચિહ્ન સાથે લખો.",
    "Count the shaded squares in rows, not one by one.": "રંગેલાં ખાનાં એક-એક કરીને નહીં, હરોળમાં ગણો.",
    "Score as a decimal": "મળેલા ગુણ દશાંશમાં",
    "A test was marked out of a hundred and this many squares were coloured. Write the score with a point.": "એક પરીક્ષા સો ગુણની હતી અને આટલાં ખાનાં રંગાયાં. ગુણ દશાંશ ચિહ્ન સાથે લખો.",
    "Two digits go after the point for hundredths.": "સોમા ભાગ માટે ચિહ્ન પછી બે અંક આવે છે.",
    /* phase 4 */
    "From words straight to a decimal fraction": "શબ્દોથી સીધા દશાંશ અપૂર્ણાંક",
    "Listen to the last word. What does that word put underneath?": "છેલ્લો શબ્દ સાંભળો. તે શબ્દ નીચે કઈ સંખ્યા બતાવે છે?",
    "Which rung of the ladder does that word name?": "તે શબ્દ સીડીના કયા પગથિયાનું નામ છે?",
    "Tap the last word in the bay and watch the ladder light.": "છેલ્લા શબ્દ પર ટૅપ કરો અને સીડીને ઝળહળતી જુઓ.",
    "The last word of a spoken amount names the denominator.": "બોલેલી માત્રાનો છેલ્લો શબ્દ છેદનું નામ બતાવે છે.",
    "You learned: the word an amount ends on tells you the bottom number.": "તમે શીખ્યા: માત્રા જે શબ્દ પર પૂરી થાય, તે નીચેની સંખ્યા બતાવે છે.",
    "Write it as a fraction": "તેને અપૂર્ણાંક તરીકે લખો",
    "Write two hundred five thousandths as a decimal fraction.": "બસો પાંચ હજારમા ભાગને દશાંશ અપૂર્ણાંક તરીકે લખો.",
    "What is the last word of the amount?": "માત્રાનો છેલ્લો શબ્દ કયો છે?",
    "Write this amount": "આ માત્રા લખો",
    "Now write thirty-seven thousandths in the same way.": "હવે સાડત્રીસ હજારમા ભાગને આ જ રીતે લખો.",
    "Say the amount again and stop on the last word.": "માત્રા ફરી બોલો અને છેલ્લા શબ્દ પર અટકો.",
    "Write this one too": "આ પણ લખો",
    "One more. Write four hundred nine thousandths.": "એક વધુ. ચારસો નવ હજારમા ભાગ લખો.",
    "The word hundred is inside the top number, not underneath.": "સો શબ્દ ઉપરની સંખ્યાની અંદર છે, નીચે નથી.",
    /* the working area's own words: the places, the choices, the amounts, the terms, the free-play keys */
    "places named": "નામ આપેલાં સ્થાન",
    "tenths": "દશમા ભાગ", "hundredths": "સોમા ભાગ", "thousandths": "હજારમા ભાગ",
    /* the choices of phase 2 carry "એક" so that no label is the ten-character "હજારમો ભાગ" (it fills a tile edge to edge) */
    "hundredth": "એક સોમો ભાગ", "tenth": "એક દશમો ભાગ", "thousandth": "એક હજારમો ભાગ", "ten hundredth": "દસ સોમા ભાગ",
    "hundredth part": "સોમો ભાગ",
    "one tenth": "એક દશમો ભાગ", "one hundredth": "એક સોમો ભાગ", "one thousandth": "એક હજારમો ભાગ",
    "two hundred five thousandths": "બસો|પાંચ|હજારમા ભાગ",
    "thirty-seven thousandths": "સાડત્રીસ|હજારમા ભાગ",
    "four hundred nine thousandths": "ચારસો|નવ|હજારમા ભાગ",
    "place value": "સ્થાનકિંમત", "decimal place": "દશાંશ સ્થાન", "decimal": "દશાંશ", "decimal fraction": "દશાંશ અપૂર્ણાંક", "decimal point": "દશાંશ ચિહ્ન",
    "Strip": "પટ્ટી", "Grid": "ગ્રીડ", "Word pad": "શબ્દ પેડ", "Next": "આગળ", "Back": "પાછળ", "Clear": "સાફ",
  },
};

/* ── the three places this topic makes, each a tenth of the one above it ──────────────── */

const CUT = 10;
const PLACES = [
  { name: "tenths", one: "one tenth", den: 10, color: CONTENT.ten },      /* amber */
  { name: "hundredths", one: "one hundredth", den: 100, color: CONTENT.bead },   /* rose */
  { name: "thousandths", one: "one thousandth", den: 1000, color: CONTENT.hundred }, /* sky blue */
];
/* coloured numerals take a deeper ink, so they read at 4.5:1 on white and on the panel */
const inkOf = (c: string) => shade(c, 0.25);
/* the chapter's own reading of a decimal: left of the point deep blue, right of it green, the point vermilion */
const DEC = { left: shade(CONTENT.hundred, 0.25), right: shade(CONTENT.one, 0.25), point: shade(CONTENT.pointer, 0.25) };
/* which side of the point a digit stands on, counted from the point itself (never from the first digit) */
const decInk = (s: string, ch: string, k: number) => {
  if (ch === ".") return DEC.point;
  const dot = s.indexOf(".");
  return dot < 0 || k < dot ? DEC.left : DEC.right;
};

/* geometry in working-area units (1086 x 528) */
/* the strip ends 36 short of the ladder, so a tenth never touches a rung card */
const STRIP = { x: 0, y: 24, w: 770, h: 132 };
const PW = STRIP.w / CUT;                  /* one tenth of the strip: 77 wide */
const GLASS = { cx: 385, cy: 348, r: 150, mw: 130, mh: 250 };   /* phase 1: the magnifier under the strip, centred on it */
const GLASS2 = { cx: 528, cy: 246, r: 146, mw: 200, mh: 200 };  /* phase 2: beside the small grid */
const GRID = { x: 214, y: 24, cell: 40 };  /* the hundred grid: 400 x 400, high enough to leave the free bay room under it */
const SMALL = { x: 8, y: 86, cell: 30 };   /* phase 2's grid of hundredths */
const LIFTED = 49;                          /* the cell that went into the glass: row 5, at the right edge */
const LAD = { x: 806, y: 14, w: 280, h: 156, gap: 8 };
/* the words bay, centred on the working area's midline: on this phase it is the whole picture */
const BAY = { x: 0, y: 190, w: 790, h: 148, pad: 28, gap: 12, inset: 16 };
/* free play: a smaller bay under the hundred grid, reading back whatever is coloured on it */
const FBAY = { x: 208, y: 458, w: 562, h: 68, pad: 24, gap: 10, inset: 6 };
const bayLayout = (ws: string[], b: any = BAY, fs: number = T.prompt) => {
  const wide = ws.map((w: string) => Math.max(96, w.length * fs * 0.58 + b.pad));
  const total = wide.reduce((a: number, c: number) => a + c, 0) + (ws.length - 1) * b.gap;
  let x = b.x + (b.w - total) / 2;
  return { wide, at: wide.map((w: number) => { const v = x; x += w + b.gap; return v; }) };
};
/* the rung a word of an amount names ("hundredths" or "hundredth"), or -1 for a number word */
const placeOfWord = (w: string) => {
  const s = String(w).toLowerCase();
  return PLACES.findIndex((p) => p.name === s || p.name === s + "s");
};
/* the chapter's eight highlighted terms, on a card in Free play for a partner to quiz from */
const TERMS = ["place value", "decimal place", "decimal", "decimal fraction", "decimal point",
  "tenths", "hundredths", "thousandths"];
const CARD = { x: 214, y: 120, w: 556, h: 240 };
const FKEY = { x: 0, w: 168, h: 68, y: [168, 252, 336, 420] };  /* 46 clear of the grid and the word pad card */
const NOTE_AT: Record<string, any> = {
  strip: { x: 652, y: 250, size: T.speech }, grid: { x: 700, y: 236, size: T.speech },
  small: { x: 528, y: 424, size: T.label }, bay: { x: 398, y: 400, size: T.xl },
};
const cellXY = (g: any, k: number) => ({ x: g.x + (k % CUT) * g.cell, y: g.y + Math.floor(k / CUT) * g.cell });
const rowY = (r: number) => GRID.y + r * GRID.cell;

/* which picture a phase's question stands on, and how many names the ladder holds by then */
const viewOf = (n: number, i: number) => (n === 1 ? (i === 0 ? "strip" : "grid") : n === 2 ? "small" : n === 3 ? "grid" : "bay");
const rungsOf = (n: number, i: number) => (n === 1 ? (i === 0 ? 1 : 2) : n === 2 ? (i === 0 ? 2 : 3) : 3);

/* ── phases ─────────────────────────────────────────────────────────────────────────────
   kinds: piece (the new piece written as a fraction) · count (how many make one of the place
          above) · name (the place, from word keys) · read (a shaded grid as a fraction) ·
          decimal (the same grid with a point) · words (a spoken amount straight to a fraction) */

const PHASES = [
  {
    n: 1,
    concept: "Splitting a tenth again",
    conceptId: "M1.S1.T3.C10", objectiveIds: ["O3"],
    says: ["Cut that one tenth into equal pieces, and count what comes out."],
    demo: { piece: "tenth" },
    demoLines: ["The glass holds the piece big enough to see, while the strip keeps its real size.",
      "The strip is ten of these tenths, and every one of them can be cut the same way."],
    ladder: ["How many pieces did that one piece become?",
      "Put the pieces back beside the one they came from and count them into it again."],
    closing: "A hundredth is one tenth split into ten, so one tenth is ten hundredths.",
    learned: "You learned: ten hundredths fit exactly into one tenth.",
    traceback: "One small piece is laid along the tenth it came from until ten of them fill it, and the ladder writes the new place.",
    items: [
      /* learn ML1: answer in the plan = One hundredth, written 1/100 and also 0.01 */
      { qid: "M1.S1.T3.C10:ML1", kind: "piece", depth: 2, parts: SLOT_FRACTION, answer: [1, 100], winMs: 3000,
        ask: "One piece as a fraction",
        say: "Write one of the pieces in the glass as a fraction of the whole strip.",
        miss: "What was in the glass before it was cut?" },
      /* practice 1: answer in the plan = Ten, because hundredths are made by splitting one tenth into ten equal pieces */
      { qid: "M1.S1.T3.C10:1", kind: "count", answer: 10, winMs: 2400,
        ask: "Hundredths in one tenth?",
        say: "How many hundredths make one tenth?",
        miss: "Count along the row that came out of the glass." },
      /* practice 2: answer in the plan = 7/100 */
      { qid: "M1.S1.T3.C10:2", kind: "read", shaded: 7, cells: 100, parts: SLOT_FRACTION, answer: [7, 100], winMs: 2600,
        ask: "Shaded as a fraction",
        say: "Some squares of the grid are shaded. Write the shaded part as a fraction.",
        miss: "Count the coloured squares first, and then count them all." },
    ],
  },
  {
    n: 2,
    concept: "One more split, and the pattern is clear",
    conceptId: "M1.S1.T3.C11", objectiveIds: ["O3"],
    says: ["Split it once more. What do you think this one will be called?"],
    ladder: ["What happened to the piece before this one when it was cut?",
      "Read the ladder downwards, and say what each cut made."],
    closing: "A thousandth is one hundredth split into ten, and every place is a tenth of the place on its left.",
    learned: "You learned: the same cut by ten makes each new place, again and again.",
    traceback: "The glass replays both cuts and the ladder writes the third name under the two above it.",
    items: [
      /* learn ML2: answer in the plan = One thousandth, and ten thousandths make one hundredth */
      { qid: "M1.S1.T3.C11:ML2", kind: "name", depth: 3, answer: "thousandth", near: "ten hundredth", winMs: 2800,
        choices: [{ id: "tenth", label: "tenth" }, { id: "hundredth", label: "hundredth" },
          { id: "thousandth", label: "thousandth" }, { id: "ten hundredth", label: "ten hundredth" }],
        ask: "Name the new piece",
        say: "That one hundredth has been cut into equal pieces again. Say what one of the new pieces is called.",
        miss: "What was in the glass this time?" },
      /* practice 3: answer in the plan = Ten */
      { qid: "M1.S1.T3.C11:3", kind: "count", answer: 10, winMs: 2400,
        ask: "Thousandths in one hundredth?",
        say: "How many thousandths make one hundredth?",
        miss: "Count the new pieces inside the glass." },
      /* practice 4: answer in the plan = One thousandth, and it is ten times smaller than one hundredth */
      { qid: "M1.S1.T3.C11:4", kind: "name", depth: 3, lead: true, answer: "one thousandth", near: "one tenth", winMs: 2600,
        choices: [{ id: "one tenth", label: "one tenth" }, { id: "one hundredth", label: "one hundredth" },
          { id: "one thousandth", label: "one thousandth" }],
        ask: "Which is smallest?",
        say: "Look at the three rungs on the ladder. Which piece is the smallest?",
        miss: "Each cut makes a piece smaller than the one before." },
    ],
  },
  {
    n: 3,
    concept: "Reading a shaded grid",
    conceptId: "M1.S1.T3.C12", objectiveIds: ["O4"],
    says: ["Count what is shaded. Now count the whole thing. Write both of them."],
    ladder: ["How many of them are coloured?",
      "Slide the frame down the grid and count the rows as they light."],
    closing: "A shaded figure is read by counting the shaded parts for the top number. The total parts go underneath.",
    learned: "You learned: the whole grid goes below, the coloured part on top.",
    traceback: "The grid is counted again in rows of ten with the tens written down its edge, and the amount is written under it.",
    items: [
      /* learn ML3: answer in the plan = 43/100, which is written 0.43 */
      { qid: "M1.S1.T3.C12:ML3", kind: "read", shaded: 43, cells: 100, parts: SLOT_FRACTION, answer: [43, 100], winMs: 2800,
        ask: "Write the fraction",
        say: "Write the shaded part of this grid as a fraction.",
        miss: "How many squares is the whole grid?" },
      /* practice 5: answer in the plan = 86/100, which is 0.86 */
      { qid: "M1.S1.T3.C12:5", kind: "decimal", shaded: 86, cells: 100, answer: "0.86", winMs: 2800,
        ask: "Write the decimal",
        say: "Here is a new grid. Say the same amount with a point instead.",
        miss: "Count the shaded squares in rows, not one by one." },
      /* practice 6: answer in the plan = 0.52 */
      { qid: "M1.S1.T3.C12:6", kind: "decimal", shaded: 52, cells: 100, answer: "0.52", winMs: 2800,
        ask: "Score as a decimal",
        say: "A test was marked out of a hundred and this many squares were coloured. Write the score with a point.",
        miss: "Two digits go after the point for hundredths." },
    ],
  },
  {
    n: 4,
    concept: "From words straight to a decimal fraction",
    conceptId: "M1.S1.T3.C13", objectiveIds: ["O4"],
    says: ["Listen to the last word. What does that word put underneath?"],
    ladder: ["Which rung of the ladder does that word name?",
      "Tap the last word in the bay and watch the ladder light."],
    closing: "The last word of a spoken amount names the denominator.",
    learned: "You learned: the word an amount ends on tells you the bottom number.",
    traceback: "The words light in their groups, the last one stands alone, and the amount is written under the bay.",
    items: [
      /* learn ML4: answer in the plan = 205/1000 */
      { qid: "M1.S1.T3.C13:ML4", kind: "words", amount: "two hundred five thousandths", parts: SLOT_FRACTION, answer: [205, 1000], winMs: 2800,
        ask: "Write it as a fraction",
        say: "Write two hundred five thousandths as a decimal fraction.",
        miss: "What is the last word of the amount?" },
      /* practice 7: answer in the plan = 37/1000 */
      { qid: "M1.S1.T3.C13:7", kind: "words", amount: "thirty-seven thousandths", parts: SLOT_FRACTION, answer: [37, 1000], winMs: 2800,
        ask: "Write this amount",
        say: "Now write thirty-seven thousandths in the same way.",
        miss: "Say the amount again and stop on the last word." },
      /* practice 8: answer in the plan = 409/1000, and the word thousandths told you */
      { qid: "M1.S1.T3.C13:8", kind: "words", amount: "four hundred nine thousandths", parts: SLOT_FRACTION, answer: [409, 1000], winMs: 2800,
        ask: "Write this one too",
        say: "One more. Write four hundred nine thousandths.",
        miss: "The word hundred is inside the top number, not underneath." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  cut: CUT, strip: CUT, grid: { rows: CUT, cols: CUT, cells: CUT * CUT },
  places: PLACES.map((p) => ({ name: p.name, one: p.one, den: p.den })),
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a fraction fills both boxes; a decimal is its written form, exactly (the zero in front counts) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (item.choices) return String(v).trim().toLowerCase() === String(item.answer).toLowerCase();
  if (item.kind === "decimal") return String(v).trim() === String(item.answer);
  return leadNumber(v) === item.answer;
};

/* a second route to every answer, sharing no code with judge or the picture: the ladder is rebuilt
   from the splits, a shaded grid is divided out, and an amount in words is read word by word */
const WORD_NUM: Record<string, number> = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9,
  ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18,
  nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 };
const DEN_OF: Record<string, number> = { tenths: 10, hundredths: 100, thousandths: 1000 };
/* "two hundred five thousandths" -> { top: 205, den: 1000 } */
const readAmount = (line: string) => {
  const w = String(line).toLowerCase().split(/[\s-]+/).filter(Boolean);
  let top = 0;
  for (const x of w.slice(0, -1)) {
    if (x === "hundred") top *= 100;
    else if (WORD_NUM[x] !== undefined) top += WORD_NUM[x];
  }
  return { top, den: DEN_OF[w[w.length - 1]] || 0 };
};
const oracle = () => PLACES.every((p, k) => p.den === (k === 0 ? CUT : PLACES[k - 1].den * CUT))
  && PHASES.every((p: any) => p.items.length === 3 && p.items.every((it: any) => {
    const A = it.answer;
    if (it.kind === "piece") return Array.isArray(A) && A[0] === 1 && A[1] === Math.pow(CUT, it.depth);
    if (it.kind === "count") return A === CUT;
    if (it.kind === "read") return Array.isArray(A) && A[0] === it.shaded && A[1] === it.cells && it.shaded <= it.cells;
    if (it.kind === "decimal") return A === (it.shaded / it.cells).toFixed(String(it.cells).length - 1);
    if (it.kind === "name") {
      const nm = PLACES[it.depth - 1].name.replace(/s$/, "");
      return A === (it.lead ? "one " + nm : nm) && it.choices.some((c: any) => c.id === A);
    }
    if (it.kind === "words") {
      const r = readAmount(it.amount);
      return Array.isArray(A) && r.top === A[0] && r.den === A[1] && String(it.say).toLowerCase().indexOf(it.amount) >= 0;
    }
    return false;
  }));

/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => {
  if (item.choices) return item.near;
  /* a spoken amount: the number heard written over TEN, whatever word it ends on (the brief's
     phase-4 misconception); a piece or a shaded grid: over ten, because the grid has ten rows */
  if (item.parts) return item.kind === "words" ? [item.answer[0], CUT] : [item.answer[0], item.answer[1] / CUT];
  if (item.kind === "decimal") return String(item.answer).slice(1); /* ".86": the zero in front left off */
  return item.answer * CUT;
};

/* the forms of an answer that no question, hint or ladder line may print
   (no commas inside a fraction or a decimal, as the book writes them) */
const answerForms = (item: any) => {
  if (item.choices) return [String(item.answer)];
  if (item.kind === "decimal") return [String(item.answer), speakable(item.answer)];
  if (item.parts) {
    const top = item.answer[0], den = item.answer[1];
    const out = [String(den), words(den), String(top)];
    if (item.kind !== "words" && top >= 2) out.push(words(top)); /* in phase 4 the amount in words IS the question */
    return out;
  }
  return [String(item.answer), indian(item.answer), words(item.answer)];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T2: any) => (T2.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T2.submit(item.answer));
/* the agent's answer(): a decimal keeps its point, which the runtime's digits-only path would drop */
const answer = (item: any, v: any) => (item.kind === "decimal" && HOOK.type ? (HOOK.type(String(v)), true) : undefined);
/* the agent's check() before Enter: in the demo it makes the one cut; otherwise Enter answers */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────── */

const ZG_CSS = `
.zg-in{animation:zgIn 380ms ease-out both}
@keyframes zgIn{from{opacity:0}to{opacity:1}}
.zg-move{transition:transform 380ms cubic-bezier(.3,.7,.25,1)}
.zg-grab{cursor:grab}
.zg-tap{cursor:pointer}
@media (prefers-reduced-motion:reduce){.zg-in{animation:none}.zg-move{transition:none}}
`;

/* a fraction drawn stacked, with the decimal under it when there is one: the tool's way of
   writing an amount on the working area (the answer the traceback ends on) */
function Note({ C, x, y, size, top, den, dec, word }: any) {
  const half = Math.max(String(top ?? "").length, String(den ?? "").length) * size * 0.34 + 18;
  return (
    <g className="zg-in">
      {den !== undefined && (
        <g>
          <text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight={700} fill={C.ink}>{String(top)}</text>
          <rect x={x - half} y={y + size * 0.32} width={half * 2} height={4} rx={2} fill={C.ink} />
          <text x={x} y={y + size * 1.45} textAnchor="middle" fontSize={size} fontWeight={700} fill={C.ink}>{String(den)}</text>
        </g>
      )}
      {dec !== undefined && (
        <text x={x} y={y + size * 2.9} textAnchor="middle" fontSize={T.xl} fontWeight={700}>
          {String(dec).split("").map((ch: string, k: number) => (
            <tspan key={k} fill={decInk(String(dec), ch, k)}>{ch}</tspan>
          ))}
        </text>
      )}
      {word !== undefined && (
        <text x={x} y={den === undefined ? y : y + size * 2.6} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{word}</text>
      )}
    </g>
  );
}

/* the name ladder: one rung a place, written in as each split finishes, never printed in advance.
   `numbers` is false where the question is which number the place puts underneath (phase 4): the
   names stand alone until the answer is given, so the ladder is never a card to copy from. */
function Ladder({ C, rungs, lit, numbers, tx = (v: any) => v }: any) {
  const nums = numbers !== false;
  return (
    <g>
      {PLACES.map((p, k) => {
        const y = LAD.y + k * (LAD.h + LAD.gap), on = lit === k, written = k < rungs;
        return (
          <g key={k}>
            <rect x={LAD.x} y={y} width={LAD.w} height={LAD.h} rx={18}
              fill={written ? tint(p.color, 0.86) : tint(C.panel, 0.35)} stroke={on ? inkOf(p.color) : C.rule} strokeWidth={on ? 5 : 2} />
            {written && (
              <g className="zg-in">
                <text x={LAD.x + LAD.w / 2} y={y + (nums ? 46 : LAD.h / 2 + 12)} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={inkOf(p.color)}>{tx(p.name)}</text>
                {nums && (
                  <g>
                    <text x={LAD.x + LAD.w / 2} y={y + 96} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>1</text>
                    <rect x={LAD.x + LAD.w / 2 - 46} y={y + 106} width={92} height={4} rx={2} fill={C.ink} />
                    <text x={LAD.x + LAD.w / 2} y={y + 142} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{p.den}</text>
                  </g>
                )}
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
}

/* the strip of ten tenths: the lifted one leaves a plain outlined gap that fills from the bottom
   as the small pieces are laid back into it */
function StripPic({ C, gapAt, laid }: any) {
  return (
    <g>
      {Array.from({ length: CUT }).map((_, k) => {
        const x = STRIP.x + k * PW;
        if (k === gapAt) {
          const h = STRIP.h / CUT;
          return (
            <g key={k}>
              <rect x={x + 2} y={STRIP.y} width={PW - 4} height={STRIP.h} rx={8} fill="#FFFFFF" stroke={C.rule} strokeWidth={2.5} strokeDasharray="8 8" />
              {Array.from({ length: laid }).map((__, j) => (
                <rect key={j} x={x + 5} y={STRIP.y + STRIP.h - (j + 1) * h + 1} width={PW - 10} height={h - 2} rx={2}
                  fill={PLACES[1].color} stroke={inkOf(PLACES[1].color)} strokeWidth={1} />
              ))}
            </g>
          );
        }
        return <rect key={k} x={x + 2} y={STRIP.y} width={PW - 4} height={STRIP.h} rx={8} fill={PLACES[0].color} stroke={inkOf(PLACES[0].color)} strokeWidth={2} />;
      })}
    </g>
  );
}

/* the magnifier: a plain rim, a magnifier mark on it, and the piece inside drawn larger than it is */
function GlassPic({ C, g, place, cut, gone, blade, count, empty }: any) {
  const x0 = g.cx - g.mw / 2, y0 = g.cy - g.mh / 2, sh = g.mh / CUT;
  const p = PLACES[place];
  return (
    <g>
      <circle cx={g.cx} cy={g.cy} r={g.r} fill="#FFFFFF" stroke={C.rule} strokeWidth={6} />
      <path d={`M ${g.cx + g.r * 0.71} ${g.cy + g.r * 0.71} L ${g.cx + g.r * 0.71 + 28} ${g.cy + g.r * 0.71 + 28}`}
        stroke={C.rule} strokeWidth={14} strokeLinecap="round" fill="none" />
      {!empty && !cut && gone < CUT && (
        <rect x={x0} y={y0} width={g.mw} height={g.mh} rx={6} fill={p.color} stroke={inkOf(p.color)} strokeWidth={3} />
      )}
      {!empty && cut && Array.from({ length: CUT - gone }).map((_, j) => (
        <rect key={j} className="zg-in" x={x0} y={y0 + j * sh + 2} width={g.mw} height={sh - 4} rx={3}
          fill={PLACES[place + 1] ? PLACES[place + 1].color : p.color} stroke={inkOf(PLACES[place + 1] ? PLACES[place + 1].color : p.color)} strokeWidth={2} />
      ))}
      {blade && <rect x={x0 - 14} y={g.cy - 3} width={g.mw + 28} height={6} rx={3} fill={C.accent} />}
      {count !== undefined && count > 0 && (
        <text x={g.cx + g.r + 58} y={g.cy + 16} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{count}</text>
      )}
    </g>
  );
}

/* the hundred grid: every cell the same size, a shaded cell rose, the row that came out of the
   glass tinted, and the tens written down the left edge while a count runs */
function GridPic({ C, g, shaded, litRow, counted, tens, ones, frame, tone, gap }: any) {
  const cells = CUT * CUT;
  return (
    <g>
      <rect x={g.x - 6} y={g.y - 6} width={g.cell * CUT + 12} height={g.cell * CUT + 12} rx={12} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      {Array.from({ length: cells }).map((_, k) => {
        const c = cellXY(g, k), on = k < shaded, row = Math.floor(k / CUT);
        /* a cell of the amber row lights full amber as it is counted along the row */
        const told = row === litRow && k % CUT < (counted || 0);
        if (k === gap) return (
          <rect key={k} x={c.x} y={c.y} width={g.cell} height={g.cell} fill="#FFFFFF"
            stroke={inkOf(PLACES[1].color)} strokeWidth={3} strokeDasharray="6 5" />
        );
        return (
          <rect key={k} x={c.x} y={c.y} width={g.cell} height={g.cell}
            fill={on ? PLACES[1].color : told ? PLACES[0].color : row === litRow ? tint(PLACES[0].color, 0.72) : tone || "#FFFFFF"}
            stroke={told ? inkOf(PLACES[0].color) : C.rule} strokeWidth={told ? 2.5 : 1.5} />
        );
      })}
      {(tens || []).map((t: any, k: number) => (
        <text key={k} x={g.x - 18} y={g.y + t.row * g.cell + g.cell / 2 + 10} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>{t.n}</text>
      ))}
      {ones !== undefined && ones > 0 && (
        <text x={g.x + g.cell * CUT / 2} y={g.y + g.cell * CUT + 48} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{ones}</text>
      )}
      {frame !== undefined && frame >= 0 && (
        <g pointerEvents="none">
          <rect x={g.x - 5} y={g.y + frame * g.cell - 5} width={g.cell * CUT + 10} height={g.cell + 10} rx={10}
            fill="none" stroke={C.accent} strokeWidth={5} />
          {/* a grip at the left end: the frame is dragged by it, row by row */}
          <circle cx={g.x + 14} cy={g.y + (frame + 0.5) * g.cell} r={17} fill={C.accent} />
          <circle cx={g.x + 14} cy={g.y + (frame + 0.5) * g.cell} r={6} fill="#FFFFFF" />
        </g>
      )}
    </g>
  );
}

/* the words bay: an amount said in words, one tile a word, with the word the child picks lit */
function BayPic({ C, words: ws, lit, group, b, fs, tone }: any) {
  const B = b || BAY, F = fs || T.prompt, hue = tone || PLACES[2].color;
  const { wide, at } = bayLayout(ws, B, F);
  return (
    <g>
      <rect x={B.x} y={B.y} width={B.w} height={B.h} rx={22} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={2} />
      {ws.map((w: string, k: number) => {
        const on = lit === k || (group || []).indexOf(k) >= 0;
        return (
          <rect key={k} x={at[k]} y={B.y + B.inset} width={wide[k]} height={B.h - 2 * B.inset} rx={14}
            fill={on ? tint(hue, 0.78) : "#FFFFFF"} stroke={on ? inkOf(hue) : C.rule} strokeWidth={on ? 4 : 2} />
        );
      })}
      {ws.map((w: string, k: number) => (
        <text key={k} x={at[k] + wide[k] / 2} y={B.y + B.h / 2 + F * 0.35} textAnchor="middle" fontSize={F} fontWeight={600} fill={C.ink}>{w}</text>
      ))}
    </g>
  );
}

function Work({ phase, n, item, index, stage, wrong, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const [cut, setCut] = useState(false);
  const [back, setBack] = useState(0);        /* small pieces laid back into the gap: the child's own count */
  const [rungs, setRungs] = useState(1);
  const [shaded, setShaded] = useState(0);
  const [row, setRow] = useState(0);
  const [litWord, setLitWord] = useState(-1);
  const [litRung, setLitRung] = useState(-1);  /* the rung the word the child tapped names */
  const [blade, setBlade] = useState(false);
  const [gapAt, setGapAt] = useState(3);
  const [depth, setDepth] = useState(1);      /* free play: how deep the glass has been cut */
  const [gridOn, setGridOn] = useState(false);
  const [wordOn, setWordOn] = useState(false); /* free play: the word pad, for a partner to quiz from */
  const [term, setTerm] = useState(0);
  const [built, setBuilt] = useState(false);  /* the rest of the strip cut the same way: the hundred grid */
  const [touched, setTouched] = useState(false);
  /* the demo layer: what a correction or a win draws. It is never the state the child's taps
     change, and the child's next act on the picture clears it. */
  const [show, setShow] = useState<any>(null);
  const setupFor = useRef(-1);
  const backRef = useRef(0); backRef.current = back;
  const busy = tl.busy;
  /* the win of the first question cuts the rest of the strip the same way, so the hundred grid the
     next question stands on is seen being made */
  const view = free ? (wordOn ? "words" : gridOn ? "grid" : "strip") : n === 1 && index === 0 && built ? "grid" : viewOf(n, index);
  const kind = free ? "free" : item.kind;
  const ws = item.amount ? String(item.amount).split(/\s+/) : [];
  /* what the bay draws: the English words, or in Hindi and Gujarati the tiles of the amount's TR entry
     (joined by "|": the last tile is the word that names the denominator). Every index below is a tile. */
  const trAmount = item.amount ? String(tx(item.amount)) : "";
  const wd = lang === "en" || !item.amount || trAmount === String(item.amount) ? ws : trAmount.split("|");
  /* free play: the words bay under the grid reads back whatever is coloured, its last word lit
     (the word that names the denominator) until the child taps another, with the rung it names */
  const fws = free && view === "grid" && shaded > 0 ? (words(shaded) + (shaded === 1 ? " hundredth" : " hundredths")).split(/\s+/) : [];
  /* the same words as tiles in Hindi and Gujarati: the number in words (wordsIn), then the place's name */
  const fwd = lang === "en" || !fws.length ? fws : [...wordsIn(shaded, lang).split(/\s+/), tx(shaded === 1 ? "hundredth part" : "hundredths")];
  const fLit = fwd.length ? (litWord >= 0 && litWord < fwd.length ? litWord : fwd.length - 1) : -1;
  const freeRung = fLit >= 0 ? (lang === "en" ? placeOfWord(fws[fLit]) : fLit === fwd.length - 1 ? 1 : -1) : -1;

  const reset = (i: number) => {
    tl.stop();
    setCut(n === 1 ? true : n === 2 ? i > 0 : false);
    setBack(0); backRef.current = 0;
    setRungs(rungsOf(n, i));
    setShaded((phase.items[i] || {}).shaded || 0);
    /* "how many hundredths make one tenth" is counted along the amber row, so the frame starts there */
    const gap0 = 3;
    setRow(n === 1 && (phase.items[i] || {}).kind === "count" ? gap0 : 0);
    setLitWord(-1); setLitRung(-1); setBlade(false); setGapAt(gap0); setDepth(n === 2 ? 2 : 1);
    setGridOn(false); setWordOn(false); setTerm(0); setBuilt(false); setTouched(false); setShow(null);
    api.lock(false);
  };
  useEffect(() => {
    if (stage === "ask" && setupFor.current !== index) { setupFor.current = index; reset(index); }
  }, [stage, index]);

  /* free play (the plan's freePlay): lift any tenth, split it as deep as the stage goes, build the
     grid and colour it by dragging; the bay reads back whatever is coloured. Nothing to get right. */
  useEffect(() => {
    if (!free) return;
    setupFor.current = -2;
    tl.stop();
    setCut(false); setBack(0); setRungs(3); setShaded(0); setRow(0); setLitWord(-1); setLitRung(-1);
    setBlade(false); setGapAt(-1); setDepth(1); setGridOn(false); setWordOn(false); setTerm(0);
    setBuilt(false); setTouched(false); setShow(null);
    api.lock(false);
  }, [free]);

  /* the child's next act on the picture takes the correction away with it */
  const act = () => { setTouched(true); setShow(null); };

  /* ── the one cut: whatever is in the glass opens into ten equal pieces ── */
  const canCut = !busy && ((stage === "demo") || (free && gapAt >= 0 && depth < PLACES.length)
    || (n === 2 && stage === "ask" && index === 0 && !cut));
  const doCut = () => {
    if (!canCut) return;
    const wasDemo = stage === "demo";
    act();
    tl.run([
      [90, () => setBlade(true)],
      [420, () => { setBlade(false); setCut(true); setDepth((d) => Math.min(d + 1, PLACES.length)); api.sfx.tick(); }],
      [360, () => {}],
    ], () => { if (wasDemo) api.demoDone(phase.demoLines); });
  };

  /* ── one small piece at a time, back into the gap it came from ── */
  const canTake = !busy && !free && n === 1 && index === 0 && stage === "ask" && cut && back < CUT;
  const putBack = () => {
    if (!canTake) return;
    act();
    const next = backRef.current + 1;
    backRef.current = next;
    tl.run([[240, () => { setBack(next); api.sfx.tick(); }]]);
  };

  /* ── free play: lift a tenth off the strip, and colour the grid by dragging across it ── */
  const liftPiece = (k: number) => { if (!free || busy) return; act(); setGapAt(k); setCut(false); setBack(0); setDepth(1); };
  const rowAt = (y: number) => Math.min(Math.max(Math.round((y - GRID.y - GRID.cell / 2) / GRID.cell), 0), CUT - 1);
  const colAt = (x: number) => Math.min(Math.max(Math.floor((x - GRID.x) / GRID.cell), 0), CUT - 1);
  const drag = useDrag((payload: any, p: any, moved: boolean) => {
    if (payload.id === "lens") {
      const r = isFinite(p.y) ? rowAt(p.y) : Math.min(row + 1, CUT - 1);
      act();
      setRow(r);
      if (free) { setShaded(isFinite(p.x) ? r * CUT + colAt(p.x) + 1 : (r + 1) * CUT); setLitWord(-1); }
      api.sfx.tick();
      return;
    }
    if (payload.id === "piece") { if (!moved || (isFinite(p.y) && p.y < STRIP.y + STRIP.h + 60)) putBack(); }
  });

  /* Enter makes the cut while the stage waits on the child's one act; otherwise it answers */
  api.onEnter(stage === "demo" ? () => doCut() : null);
  HOOK.demo = () => doCut();
  HOOK.check = () => (stage === "demo" && canCut ? (doCut(), true) : undefined);
  HOOK.type = (s: string) => api.setTyped(s);

  /* ── the steps a correction and a win are drawn in ── */
  const tens = (upTo: number) => Array.from({ length: upTo }).map((_, k) => ({ row: k, n: (k + 1) * CUT }));
  const noteOf = (it: any) => (it.kind === "decimal" ? { top: it.shaded, den: it.cells, dec: it.answer }
    : it.kind === "name" ? { top: 1, den: PLACES[it.depth - 1].den, word: PLACES[it.depth - 1].one }
      : { top: it.answer[0], den: it.answer[1] });
  const countSteps = (it: any, slow: number) => {
    const S: any[] = [];
    const full = Math.floor(it.shaded / CUT), rest = it.shaded % CUT;
    for (let k = 1; k <= full; k++) { const j = k; S.push([260 * slow, () => setShow({ tens: tens(j), ones: j * CUT })]); }
    for (let k = 1; k <= rest; k++) { const j = k; S.push([200 * slow, () => setShow({ tens: tens(full), ones: full * CUT + j })]); }
    S.push([520 * slow, () => setShow({ tens: tens(full), ones: it.shaded })]);
    for (let k = full + 1; k <= CUT; k++) { const j = k; S.push([170 * slow, () => setShow({ tens: tens(j), ones: it.shaded })]); }
    S.push([500, () => setShow({ tens: tens(CUT), ones: it.shaded, note: noteOf(it) })]);
    return S;
  };
  const wordSteps = (it: any, slow: number) => {
    const S: any[] = [], last = wd.length - 1;
    for (let k = 0; k < last; k++) { const j = k; S.push([420 * slow, () => setShow({ group: wd.map((_: any, i: number) => i).slice(0, j + 1) })]); }
    S.push([620 * slow, () => setShow({ group: wd.map((_: any, i: number) => i).slice(0, last) })]);
    S.push([640 * slow, () => setShow({ word: last, rung: PLACES.length - 1 })]);
    S.push([520, () => setShow({ word: last, rung: PLACES.length - 1, note: noteOf(it) })]);
    return S;
  };

  /* ── the win: the amount is written where the child can read it back ── */
  useEffect(() => {
    if (stage !== "win") return;
    if (kind === "piece") tl.run([[260, () => setShow({ laid: CUT })], [500, () => setRungs(2)],
      [460, () => { setBuilt(true); api.sfx.tick(); }], [520, () => setShow({ note: noteOf(item) })], [600, () => {}]]);
    else if (kind === "count") {
      /* the ten cells of the amber row light one by one as the count climbs, ending on the whole row */
      const W: any[] = [[200, () => setShow({ ones: 0, glass: 0, counted: 0, frame: gapAt })]];
      for (let k = 1; k <= CUT; k++) { const j = k; W.push([120, () => setShow({ ones: j, glass: j, counted: j, frame: gapAt })]); }
      W.push([700, () => {}]);
      tl.run(W);
    }
    else if (kind === "read" || kind === "decimal") tl.run([[240, () => setShow({ tens: tens(CUT), ones: item.shaded })], [700, () => setShow({ tens: tens(CUT), ones: item.shaded, note: noteOf(item) })], [700, () => {}]]);
    else if (kind === "name") tl.run(item.lead
      ? [[260, () => setShow({ rung: 0 })], [300, () => setShow({ rung: 1 })], [340, () => setShow({ rung: 2 })], [500, () => setShow({ rung: 2, note: noteOf(item) })], [500, () => {}]]
      : [[300, () => setRungs(PLACES.length)], [520, () => setShow({ rung: 2, note: noteOf(item) })], [700, () => {}]]);
    else if (kind === "words") tl.run([[260, () => setShow({ word: wd.length - 1, rung: PLACES.length - 1 })], [560, () => setShow({ word: wd.length - 1, rung: PLACES.length - 1, note: noteOf(item) })], [700, () => {}]]);
  }, [stage]);

  /* ── the traceback: the mathematics redrawn in steps, ending on the whole right answer.
        Nothing is marked, nothing resets, and the child's answer stays in the slot. ── */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    const done = () => api.lock(false);
    if (kind === "piece") {
      const S: any[] = [[420, () => setShow({ laid: 0 })]];
      for (let k = 1; k <= CUT; k++) { const j = k; S.push([210, () => { setShow({ laid: j }); api.sfx.tick(); }]); }
      S.push([620, () => setRungs(2)]);
      S.push([500, () => setShow({ laid: CUT, note: noteOf(item) })]);
      tl.run(S, done);
    } else if (kind === "count") {
      /* the frame goes onto the row that came out of the glass, and its cells light one by one
         as the count climbs under the grid, so the ten are counted along that row */
      const S: any[] = [[380, () => { setRow(gapAt); setShow({ ones: 0, glass: 0, counted: 0, frame: gapAt }); }]];
      for (let k = 1; k <= CUT; k++) { const j = k; S.push([240, () => { setShow({ ones: j, glass: j, counted: j, frame: gapAt }); api.sfx.tick(); }]); }
      S.push([700, () => {}]);
      tl.run(S, done);
    } else if (kind === "read" || kind === "decimal") {
      tl.run([[380, () => setShow({ tens: [], ones: 0 })], ...countSteps(item, 1), [500, () => {}]], done);
    } else if (kind === "name" && !item.lead) {
      /* the glass replays both cuts, one after the other, and the ladder is walked from the top:
         each rung lights as the cut that made it lands (a tenth cut gives hundredths, a hundredth
         cut gives the third name), so the third name comes from the same cut as the second */
      tl.run([
        [320, () => setShow({ place: 0, cut: false, rung: 0 })],
        [560, () => setShow({ place: 0, cut: false, blade: true, rung: 0 })],
        [420, () => { setShow({ place: 0, cut: true, rung: 1 }); api.sfx.tick(); }],
        [820, () => setShow({ place: 1, cut: false, rung: 1 })],
        [560, () => setShow({ place: 1, cut: false, blade: true, rung: 1 })],
        [420, () => { setCut(true); setRungs(PLACES.length); setShow({ place: 1, cut: true, rung: 2 }); api.sfx.tick(); }],
        [680, () => setShow({ place: 1, cut: true, rung: 2, note: noteOf(item) })],
        [500, () => {}],
      ], done);
    } else if (kind === "name") {
      tl.run([[320, () => setShow({ rung: 0 })], [420, () => setShow({ rung: 1 })], [460, () => setShow({ rung: 2 })],
        [560, () => setShow({ rung: 2, note: noteOf(item) })], [500, () => {}]], done);
    } else if (kind === "words") {
      tl.run([[380, () => setShow({ group: [] })], ...wordSteps(item, 1), [500, () => {}]], done);
    } else done();
  }, [wrong]);

  /* ── what the host and the agent read back (toolApi.getState) ── */
  api.share({
    lifted: gapAt >= 0, splitDepth: free ? depth : n === 1 ? (cut ? 2 : 1) : n === 2 ? (cut ? 3 : 2) : PLACES.length,
    gridCells: view === "grid" || view === "small" ? CUT * CUT : 0, shadedCells: shaded,
    wordsHeard: free ? (fws.join(" ") || null) : item.amount || null,
  });

  /* ── drawing ── */
  const S = show || {};
  const laid = Math.max(back, S.laid || 0);
  const dragRow = drag.drag && drag.drag.payload.id === "lens" && drag.drag.moved ? rowAt(drag.drag.y) : row;
  const frameRow = view === "grid" ? dragRow : -1;
  const lensLive = !busy && (view === "grid") && (free || stage === "ask");
  const at = NOTE_AT[view] || NOTE_AT.grid;
  const invite = busy || S.note ? null
    : stage === "demo" ? { x: GLASS.cx, y: GLASS.cy, r: 96 }
      /* free play: a quiet ring on the glass while a lifted piece sits uncut in it, so a finger
         poking the strip finds out that the glass cuts (the one looping invite LAYOUT §10 allows;
         keyed on the piece, it starts again with each lift and stops at the cut) */
      : free ? (view === "strip" && canCut && !cut ? { x: GLASS.cx, y: GLASS.cy, r: 96, key: "lift-" + gapAt } : null)
      : touched || stage !== "ask" ? null
        : view === "strip" && canTake ? { x: GLASS.cx, y: GLASS.cy + GLASS.mh / 2 - GLASS.mh / CUT / 2, r: 38 }
          : view === "small" && canCut ? { x: GLASS2.cx, y: GLASS2.cy, r: 96 }
            : view === "grid" && lensLive ? { x: GRID.x + 14, y: rowY(dragRow) + GRID.cell / 2, r: 38 }
              : view === "bay" && ws.length ? null
                : null;
  const bayInvite = view === "bay" && !touched && stage === "ask" && !busy && !S.note;

  return (
    <g>
      <style>{ZG_CSS}</style>

      {/* the running count: the places this topic has named so far */}
      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        <text x={18} y={lang === "en" ? -52 : -57} fontSize={T.prompt} fontWeight={700} fill={C.ink}>{lang === "hi" ? `${PLACES.length} में से ${rungs}` : lang === "gu" ? `${PLACES.length} માંથી ${rungs}` : `${rungs} of ${PLACES.length}`}</text>
        <text x={18} y={lang === "en" ? -26 : -24} fontSize={T.micro} fontWeight={500} fill={C.ink}>{tx("places named")}</text>
      </g>

      {/* a question whose answer is what goes underneath (a shaded grid read as a fraction or a
          decimal, a spoken amount) sees only the names on the ladder until the amount has been
          written: a 1/100 rung beside a hundred grid would hand over the bottom number. Everywhere
          else the fractions stand (the split made them), and free play shows them all */}
      <Ladder C={C} rungs={rungs} lit={S.rung !== undefined ? S.rung : free ? freeRung : litRung} tx={tx}
        numbers={free || !(kind === "read" || kind === "decimal" || kind === "words") || !!S.note} />

      {view === "strip" && (
        <g>
          <StripPic C={C} gapAt={gapAt} laid={laid} />
          <GlassPic C={C} g={GLASS} place={free ? Math.max(0, depth - 2) : 0} cut={cut} gone={laid} blade={blade} empty={gapAt < 0} />
          {free && Array.from({ length: CUT }).map((_, k) => (
            <Hit key={k} id={"tenth-" + k} label={"Lift tenth " + (k + 1) + " into the glass"} x={STRIP.x + k * PW + 2} y={STRIP.y}
              w={PW - 4} h={STRIP.h} onPress={() => liftPiece(k)} />
          ))}
          {canCut && <Hit id="cut-piece" label="Cut the piece in the glass into ten" x={GLASS.cx - GLASS.mw / 2} y={GLASS.cy - GLASS.mh / 2} w={GLASS.mw} h={GLASS.mh} onPress={doCut} />}
          {canTake && (() => {
            const pay = { id: "piece" };
            const y0 = GLASS.cy + GLASS.mh / 2 - (laid + 1) * (GLASS.mh / CUT);
            return (
              <g className="zg-grab" {...control("piece", "Take one piece back to the strip")} {...drag.bind(pay)} {...drag.keys(pay)}>
                <rect x={GLASS.cx - GLASS.mw / 2 - 10} y={y0 + GLASS.mh / CUT / 2 - HIT / 2} width={GLASS.mw + 20} height={HIT} fill="transparent" />
              </g>
            );
          })()}
        </g>
      )}

      {view === "small" && (
        <g>
          <GridPic C={C} g={SMALL} shaded={0} litRow={-1} tone={tint(PLACES[1].color, 0.82)} gap={LIFTED} />
          {/* the cell in the glass came from that hole: the two are tied by eye (not while the
              glass replays the first cut, which was made on a tenth) */}
          {S.place !== 0 && (
            <path d={`M ${SMALL.x + CUT * SMALL.cell + 6} ${SMALL.y + (Math.floor(LIFTED / CUT) + 0.5) * SMALL.cell} L ${GLASS2.cx - GLASS2.r - 6} ${GLASS2.cy}`}
              fill="none" stroke={C.rule} strokeWidth={3} strokeDasharray="8 8" />
          )}
          <GlassPic C={C} g={GLASS2} place={S.place !== undefined ? S.place : 1} cut={S.cut !== undefined ? S.cut : cut}
            gone={0} blade={blade || !!S.blade} count={S.glass} />
          {canCut && <Hit id="cut-piece" label="Cut the piece in the glass into ten" x={GLASS2.cx - GLASS2.mw / 2} y={GLASS2.cy - GLASS2.mh / 2} w={GLASS2.mw} h={GLASS2.mh} onPress={doCut} />}
        </g>
      )}

      {view === "grid" && (
        <g>
          {/* the amber row is the tenth the glass cut: it stands only where the question is about
              that tenth (the grid it was cut into, and how many hundredths make it), never behind
              a shaded grid it does not belong to */}
          <GridPic C={C} g={GRID} shaded={shaded} litRow={!free && n === 1 && (kind === "count" || (kind === "piece" && built)) ? gapAt : -1}
            counted={S.counted} tens={S.tens} ones={S.ones} frame={S.frame !== undefined ? S.frame : lensLive ? frameRow : -1} />
          {lensLive && (() => {
            const pay = { id: "lens" };
            return (
              <g className="zg-grab" {...control("lens", free ? "Drag across the grid to colour it" : "Drag the frame down the grid")} {...drag.bind(pay)} {...drag.keys(pay)}>
                <rect x={GRID.x - 10} y={rowY(dragRow) + GRID.cell / 2 - HIT / 2} width={GRID.cell * CUT + 20} height={HIT} fill="transparent" />
              </g>
            );
          })()}
          {free && fwd.length > 0 && (
            <g>
              <BayPic C={C} words={fwd} lit={fLit} b={FBAY} fs={T.label} tone={PLACES[1].color} />
              {!busy && fwd.map((w: string, k: number) => {
                const L = bayLayout(fwd, FBAY, T.label);
                return <Hit key={k} id={"fword-" + k} label={"The word " + w} x={L.at[k]} y={FBAY.y + FBAY.h / 2 - HIT / 2} w={L.wide[k]} h={HIT}
                  onPress={() => { act(); setLitWord(k); api.sfx.tick(); }} />;
              })}
            </g>
          )}
        </g>
      )}

      {view === "bay" && (
        <g>
          <BayPic C={C} words={wd} lit={S.word !== undefined ? S.word : litWord} group={S.group} />
          {stage === "ask" && !busy && wd.map((w: string, k: number) => {
            const L = bayLayout(wd);
            return <Hit key={k} id={"word-" + k} label={"The word " + w} x={L.at[k]} y={BAY.y + 16} w={L.wide[k]} h={BAY.h - 32}
              onPress={() => { act(); setLitWord(k); setLitRung(wd === ws ? PLACES.findIndex((p) => p.name === String(w).toLowerCase()) : k === wd.length - 1 ? PLACES.length - 1 : -1); api.sfx.tick(); }} />;
          })}
          {/* the invite opens the bay at its first word: the word that names the denominator is the
              child's to find, so it is lit by their tap and never pulsed at them beforehand */}
          {bayInvite && (() => {
            const L = bayLayout(wd);
            return <Invite x={L.at[0] + L.wide[0] / 2} y={BAY.y + BAY.h / 2} r={44} C={C} />;
          })()}
        </g>
      )}

      {/* the word pad: the chapter's eight terms, one at a time, for a partner to quiz from */}
      {view === "words" && (
        <g>
          <rect x={CARD.x} y={CARD.y} width={CARD.w} height={CARD.h} rx={22} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />
          <text x={CARD.x + CARD.w / 2} y={CARD.y + CARD.h / 2 + 18} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{tx(TERMS[term % TERMS.length])}</text>
        </g>
      )}

      {free && (
        <g>
          <Key id="free-grid" label={view === "grid" ? "Back to the strip" : "Build the grid"} x={FKEY.x} y={FKEY.y[0]} w={FKEY.w} h={FKEY.h} C={C}
            primary={view === "grid"} onClick={() => { act(); setWordOn(false); setGridOn((g) => !g); }}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={view === "grid" ? "#FFFFFF" : C.ink}>{tx(view === "grid" ? "Strip" : "Grid")}</text>
          </Key>
          <Key id="free-words" label={wordOn ? "Back to the pieces" : "Open the word pad"} x={FKEY.x} y={FKEY.y[1]} w={FKEY.w} h={FKEY.h} C={C}
            primary={wordOn} onClick={() => { act(); setWordOn((b) => !b); }}>
            <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={wordOn ? "#FFFFFF" : C.ink}>{tx("Word pad")}</text>
          </Key>
          {view === "words" && (
            <g>
              <Key id="free-next" label="The next word" x={FKEY.x} y={FKEY.y[2]} w={FKEY.w} h={FKEY.h} C={C} onClick={() => { act(); setTerm((t) => (t + 1) % TERMS.length); api.sfx.tick(); }}>
                <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("Next")}</text>
              </Key>
              <Key id="free-prev" label="The word before" x={FKEY.x} y={FKEY.y[3]} w={FKEY.w} h={FKEY.h} C={C} onClick={() => { act(); setTerm((t) => (t + TERMS.length - 1) % TERMS.length); api.sfx.tick(); }}>
                <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("Back")}</text>
              </Key>
            </g>
          )}
          {view === "grid" && (
            <Key id="free-clear" label="Clear the colour" x={FKEY.x} y={FKEY.y[2]} w={FKEY.w} h={FKEY.h} C={C} onClick={() => { act(); setShaded(0); setLitWord(-1); }}>
              <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("Clear")}</text>
            </Key>
          )}
        </g>
      )}

      {S.note && <Note C={C} x={at.x} y={at.y} size={at.size} {...S.note} word={S.note.word === undefined ? undefined : tx(S.note.word)} />}
      {invite && <Invite key={invite.key || "invite"} x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const L = (result && result.last) || {};
  const v = L.value;
  if (v === null || v === undefined || v === "") return null;
  const k = L.kind;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {k === "piece" || k === "read" || k === "words" ? (() => {
        const ps = slotPartsOf(v, 2);
        return (
          <g>
            <text x={w / 2} y={h / 2 - 6} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{ps[0]}</text>
            <rect x={w / 2 - 34} y={h / 2 + 2} width={68} height={3} rx={1.5} fill={C.ink} />
            <text x={w / 2} y={h / 2 + 30} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{ps[1]}</text>
          </g>
        );
      })() : k === "decimal" ? (
        <text x={w / 2} y={h / 2 + 12} textAnchor="middle" fontSize={T.label} fontWeight={700}>
          {String(v).split("").map((ch: string, j: number) => (
            <tspan key={j} fill={decInk(String(v), ch, j)}>{ch}</tspan>
          ))}
        </text>
      ) : (
        <text x={w / 2} y={h / 2 + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(String(v))}</text>
      )}
    </g>
  );
}

function ZoomGrid(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, pointKey: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default ZoomGrid;
