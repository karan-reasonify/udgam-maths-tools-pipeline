/* ═══ M1.S1.T2.C4.2D1 · rupee_paise_board · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them).

   The board: a rupee tray of play coins (each one rupee) and a paise tray of rupee strips, each strip
   a hundred cells in ten blocks of ten, so a full strip is exactly one rupee. A coin breaks into a
   strip (drag it across, or tap it); a full strip folds back into a coin. A paise meter under the
   trays reads every paise in the paise tray. Phase 2 and 3 put a price tag above the trays (rupees,
   a vermilion dot, two paise boxes always drawn); phase 4 sets two tags against a sign slot that
   opens once both are in paise. The answer is typed on the pad (the point key on every question). */

const TOOL_ID = "rupee_paise_board";
const MEDIA_ID = "M1.S1.T2.C4.2D1";
const TOOL_NAME = "Rupee and Paise Board";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["Rupees on one side and paise on the other. What is one rupee made of?"];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every rupee opened into its hundred, every tag read, and every pair compared in one unit.";
/* said when the child opens Free play from the summary page: exactly what the free board offers */
const FREE_LINE = "Free play. Break a rupee, fold a strip back, or tap the meter to drop and lift its flap.";

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, and the runtime looks each spoken or drawn line up in it.
   Fill it AFTER the English is final and reviewed (`node cli.mjs voice` lists every line still missing),
   then bake the voice. Empty = the tool runs in English only.
   Chapter conventions: spoken money in words with its digits ("53 रुपये 40 पैसे"), never "Rs 53.40" (the
   Hindi and Gujarati number speller does not read money); drawn money keeps its digits and point and writes
   the rupee sign ("₹53.40"). Terms (first drafts for a native speaker): rupee रुपया / રૂપિયો, paise पैसे /
   પૈસા, coin सिक्का / સિક્કો, note नोट / નોટ, price कीमत / કિંમત, amount रकम / રકમ, strip पट्टी / પટ્ટી, cell
   खाना / ખાનું, box (on a tag) डिब्बा / ચોકઠું, dot बिंदु / બિંદુ, place स्थान / સ્થાન, tag टैग / ટૅગ, meter मीटर /
   મીટર, flap ढक्कन / ઢાંકણ, switch स्विच / સ્વિચ, sign चिह्न / ચિહ્ન, unit मात्रक / એકમ. */
const TR: any = {
  hi: {
    "Rupee and Paise Board": "रुपया-पैसा बोर्ड",
    "Rupees on one side and paise on the other. What is one rupee made of?": "एक तरफ़ रुपये और दूसरी तरफ़ पैसे। एक रुपया किससे बनता है?",
    "Every rupee opened into its hundred, every tag read, and every pair compared in one unit.": "हर रुपया सौ पैसों में खुला और हर टैग पढ़ा गया। हर जोड़ी की तुलना एक ही मात्रक में हुई।",
    "Free play. Break a rupee, fold a strip back, or tap the meter to drop and lift its flap.": "मुक्त खेल। रुपया तोड़ो, पट्टी मोड़ो, या मीटर का ढक्कन गिराओ-उठाओ।",
    /* phase 1 */
    "A hundred paise make a rupee": "सौ पैसे का एक रुपया",
    "Break one rupee coin into paise, and watch how far the meter climbs.": "एक रुपये का सिक्का तोड़कर पैसे बनाओ, और देखो मीटर कितना चढ़ता है।",
    "How far does the meter move for one full strip?": "एक पूरी पट्टी पर मीटर कितना आगे बढ़ता है?",
    "Count one strip in blocks of ten. Every coin is worth one full strip.": "एक पट्टी को दस-दस करके गिनो। हर सिक्का एक पूरी पट्टी के बराबर है।",
    "A hundred paise make one rupee, so rupees become paise when multiplied by a hundred.": "सौ पैसे का एक रुपया होता है। इसलिए रुपयों को सौ से गुणा करने पर पैसे मिलते हैं।",
    "You learned: a hundred paise make one rupee.": "तुमने सीखा: सौ पैसे का एक रुपया होता है।",
    "A shopkeeper counts Rs 36 in rupee coins. How many paise is that?": "एक दुकानदार एक-एक रुपये के सिक्कों में 36 रुपये गिनता है। यह कितने पैसे हुए?",
    "Rs 36 in paise?": "₹36 कितने पैसे?",
    "How many cells are on one strip?": "एक पट्टी पर कितने खाने हैं?",
    "How many paise make Rs 15?": "15 रुपये में कितने पैसे होते हैं?",
    "Rs 15 in paise?": "₹15 कितने पैसे?",
    "Each coin opens into a strip. How many cells is that all together?": "हर सिक्का एक पट्टी में खुलता है। सब मिलाकर कितने खाने हुए?",
    "A jar holds 900 paise. How many rupees is that?": "एक बरनी में 900 पैसे हैं। यह कितने रुपये हुए?",
    "900 paise in rupees?": "900 पैसे कितने रुपये?",
    "Fold one strip back. What does it turn into?": "एक पट्टी वापस मोड़ो। वह किसमें बदलती है?",
    /* phase 2 */
    "The dot between rupees and paise": "रुपये और पैसे के बीच का बिंदु",
    "A dot on a price tag splits the rupees from the paise. Tap the dot and see.": "कीमत के टैग पर बिंदु रुपयों को पैसों से अलग करता है। बिंदु को छूकर देखो।",
    "How many places do the paise take after the dot?": "बिंदु के बाद पैसे कितने स्थान लेते हैं?",
    "The first box after the dot counts tens of paise. The second box counts single paise.": "बिंदु के बाद पहला डिब्बा दस-दस पैसे गिनता है। दूसरा डिब्बा एक-एक पैसा गिनता है।",
    "Rupees come before the dot. The paise take two places after it, so eight paise are written zero eight.": "रुपये बिंदु से पहले आते हैं। बिंदु के बाद पैसे दो स्थान लेते हैं। इसलिए आठ पैसे शून्य आठ लिखे जाते हैं।",
    "You learned: the paise take two places after the dot.": "तुमने सीखा: बिंदु के बाद पैसे दो स्थान लेते हैं।",
    "Look at this price tag. How many rupees and how many paise does it show?": "यह कीमत का टैग देखो। इस पर कितने रुपये और कितने पैसे हैं?",
    "Rupees and paise?": "रुपये और पैसे?",
    "Read the two boxes after the dot one at a time. What does each hold?": "बिंदु के बाद के दोनों डिब्बे एक-एक करके पढ़ो। हर डिब्बे में क्या है?",
    "Write 27 rupees and 45 paise with a dot.": "27 रुपये और 45 पैसे बिंदु लगाकर लिखो।",
    "Write 27 rupees 45 paise": "27 रुपये 45 पैसे लिखो",
    "Write it in order: the rupees, then the dot, then the paise.": "क्रम से लिखो: पहले रुपये, फिर बिंदु, फिर पैसे।",
    "Now 12 rupees and 6 paise, the same way.": "अब 12 रुपये और 6 पैसे, इसी तरह।",
    "Write 12 rupees 6 paise": "12 रुपये 6 पैसे लिखो",
    "Look at the strip. Is there a full block of ten?": "पट्टी देखो। क्या उसमें दस का एक पूरा खंड है?",
    /* phase 3 */
    "An amount in paise alone": "रकम सिर्फ़ पैसों में",
    "Every rupee is a hundred paise. Turn the rupees into paise, then add the paise on the strip.": "हर रुपया सौ पैसे है। रुपयों को पैसों में बदलो, फिर पट्टी के पैसे जोड़ो।",
    "How many paise are on the strip?": "पट्टी पर कितने पैसे हैं?",
    "Try Rs 1 and 10 paise first. Write it in paise, then with a dot.": "पहले 1 रुपया 10 पैसे लेकर देखो। उसे पैसों में लिखो, फिर बिंदु लगाकर।",
    "An amount is written in paise alone by turning the rupees into hundreds of paise and adding the paise.": "रकम सिर्फ़ पैसों में लिखने के लिए रुपयों को सौ-सौ पैसों में बदलो। फिर उसमें पैसे जोड़ो।",
    "You learned: rupees become hundreds of paise, then add the paise.": "तुमने सीखा: रुपये सौ-सौ पैसे बनते हैं, फिर पैसे जोड़ो।",
    "Write Rs 53.40 in paise alone.": "53 रुपये 40 पैसे सिर्फ़ पैसों में लिखो।",
    "Rs 53.40 in paise?": "₹53.40 कितने पैसे?",
    "How many paise do 53 rupees make?": "53 रुपये कितने पैसे बनाते हैं?",
    "Now Rs 48.60, in paise alone.": "अब 48 रुपये 60 पैसे, सिर्फ़ पैसों में।",
    "Rs 48.60 in paise?": "₹48.60 कितने पैसे?",
    "Look at the strip. Is every one of its paise in your number?": "पट्टी देखो। क्या उसके सारे पैसे तुम्हारी संख्या में हैं?",
    "A purse holds Rs 50 + Rs 10 + Rs 2 + 30 paise. Which tag shows the same amount?": "एक बटुए में 50 रुपये, 10 रुपये, 2 रुपये और 30 पैसे हैं। कौन-सा टैग यही रकम दिखाता है?",
    "Which tag matches?": "कौन-सा टैग मिलता है?",
    "Add the rupees first. Where do the 30 paise go?": "पहले रुपये जोड़ो। 30 पैसे कहाँ जाएँगे?",
    "Rs 60.32": "₹60.32",
    "Rs 62.30": "₹62.30",
    "6,203 paise": "6,203 पैसे",
    /* phase 4 */
    "Comparing two amounts": "दो रकमों की तुलना",
    "One tag counts rupees and one counts paise. The switch writes both of them in paise.": "एक टैग रुपये गिनता है और एक पैसे। स्विच दोनों को पैसों में लिख देता है।",
    "How many paise is the rupee tag?": "रुपये वाला टैग कितने पैसे का है?",
    "Try one rupee against 90 paise first. Turn the rupee into paise, then compare.": "पहले 1 रुपया और 90 पैसे लेकर देखो। रुपये को पैसों में बदलो, फिर तुलना करो।",
    "Put both amounts in the same unit before comparing them. When both come to the same number of paise, the equals sign goes between them.": "तुलना से पहले दोनों रकमों को एक ही मात्रक में लाओ। जब दोनों के पैसे बराबर हों, तब बीच में बराबर का चिह्न आता है।",
    "You learned: compare two amounts once both are in one unit.": "तुमने सीखा: दोनों रकमें एक मात्रक में हों, तब तुलना करो।",
    "The tags say Rs 70 and 6,950 paise. Put greater than, less than or equals between them.": "टैग पर 70 रुपये और 6,950 पैसे लिखे हैं। इनके बीच बड़ा, छोटा या बराबर का चिह्न लगाओ।",
    "Which sign fits?": "कौन-सा चिह्न?",
    "What unit is each tag in?": "हर टैग किस मात्रक में है?",
    "greater than": "बड़ा",
    "less than": "छोटा",
    "equals": "बराबर",
    "Now the left tag is Rs 30 + Rs 45, and the right one 7,500 paise. Which sign goes between these two?": "अब बायाँ टैग 30 रुपये + 45 रुपये है। दायाँ टैग 7,500 पैसे है। इन दोनों के बीच कौन-सा चिह्न आएगा?",
    "Which sign now?": "अब कौन-सा चिह्न?",
    "Add the two rupee amounts first. Then write them in paise.": "पहले रुपये वाली दोनों रकमें जोड़ो। फिर उन्हें पैसों में लिखो।",
    "One tag says Rs 84.50, the other 8,405 paise. Which is more?": "एक टैग पर 84 रुपये 50 पैसे हैं, दूसरे पर 8,405 पैसे। कौन-सा ज़्यादा है?",
    "Which is more?": "कौन-सा ज़्यादा?",
    "Flip the switch. Then read both amounts place by place from the left.": "स्विच दबाओ। फिर दोनों रकमें बाएँ से एक-एक स्थान करके पढ़ो।",
    "Rs 84.50": "₹84.50",
    "8,405 paise": "8,405 पैसे",
    /* spoken by the board */
    "The rest will open when you answer.": "बाकी सिक्के तुम्हारे उत्तर देने पर खुलेंगे।",
    "The rest will fold when you answer.": "बाकी पट्टियाँ तुम्हारे उत्तर देने पर मुड़ेंगी।",
    /* drawn on the board (and the two answer boxes' labels) */
    "rupees": "रुपये",
    "paise": "पैसे",
    "more": "और",
    "paise meter": "पैसा मीटर",
    "waiting for your answer": "तुम्हारे उत्तर का इंतज़ार",
    "both in paise": "दोनों पैसों में",
    "opened": "खोले",
    "folded": "मोड़ीं",
  },
  gu: {
    "Rupee and Paise Board": "રૂપિયા-પૈસા બોર્ડ",
    "Rupees on one side and paise on the other. What is one rupee made of?": "એક બાજુ રૂપિયા અને બીજી બાજુ પૈસા. એક રૂપિયો શાનો બનેલો છે?",
    "Every rupee opened into its hundred, every tag read, and every pair compared in one unit.": "દરેક રૂપિયો સો પૈસામાં ખૂલ્યો અને દરેક ટૅગ વંચાયું. દરેક જોડીની સરખામણી એક જ એકમમાં થઈ.",
    "Free play. Break a rupee, fold a strip back, or tap the meter to drop and lift its flap.": "મુક્ત રમત. રૂપિયો તોડો, પટ્ટી વાળો, કે મીટરનું ઢાંકણ પાડો-ઉઠાવો.",
    /* phase 1 */
    "A hundred paise make a rupee": "સો પૈસાનો એક રૂપિયો",
    "Break one rupee coin into paise, and watch how far the meter climbs.": "એક રૂપિયાનો સિક્કો તોડીને પૈસા બનાવો, અને જુઓ મીટર કેટલું ચઢે છે.",
    "How far does the meter move for one full strip?": "એક આખી પટ્ટી માટે મીટર કેટલું આગળ વધે છે?",
    "Count one strip in blocks of ten. Every coin is worth one full strip.": "એક પટ્ટીને દસ-દસ કરીને ગણો. દરેક સિક્કો એક આખી પટ્ટી બરાબર છે.",
    "A hundred paise make one rupee, so rupees become paise when multiplied by a hundred.": "સો પૈસાનો એક રૂપિયો થાય. એટલે રૂપિયાને સોથી ગુણવાથી પૈસા મળે.",
    "You learned: a hundred paise make one rupee.": "તમે શીખ્યા: સો પૈસાનો એક રૂપિયો થાય.",
    "A shopkeeper counts Rs 36 in rupee coins. How many paise is that?": "એક દુકાનદાર એક-એક રૂપિયાના સિક્કામાં 36 રૂપિયા ગણે છે. તે કેટલા પૈસા થયા?",
    "Rs 36 in paise?": "₹36 કેટલા પૈસા?",
    "How many cells are on one strip?": "એક પટ્ટી પર કેટલાં ખાનાં છે?",
    "How many paise make Rs 15?": "15 રૂપિયામાં કેટલા પૈસા થાય?",
    "Rs 15 in paise?": "₹15 કેટલા પૈસા?",
    "Each coin opens into a strip. How many cells is that all together?": "દરેક સિક્કો એક પટ્ટીમાં ખૂલે છે. બધાં મળીને કેટલાં ખાનાં થયાં?",
    "A jar holds 900 paise. How many rupees is that?": "એક બરણીમાં 900 પૈસા છે. તે કેટલા રૂપિયા થયા?",
    "900 paise in rupees?": "900 પૈસા કેટલા રૂપિયા?",
    "Fold one strip back. What does it turn into?": "એક પટ્ટી પાછી વાળો. તે શેમાં બદલાય છે?",
    /* phase 2 */
    "The dot between rupees and paise": "રૂપિયા અને પૈસા વચ્ચેનું બિંદુ",
    "A dot on a price tag splits the rupees from the paise. Tap the dot and see.": "કિંમતના ટૅગ પરનું બિંદુ રૂપિયાને પૈસાથી અલગ કરે છે. બિંદુને અડીને જુઓ.",
    "How many places do the paise take after the dot?": "બિંદુ પછી પૈસા કેટલાં સ્થાન લે છે?",
    "The first box after the dot counts tens of paise. The second box counts single paise.": "બિંદુ પછીનું પહેલું ચોકઠું દસ-દસ પૈસા ગણે છે. બીજું ચોકઠું એક-એક પૈસો ગણે છે.",
    "Rupees come before the dot. The paise take two places after it, so eight paise are written zero eight.": "રૂપિયા બિંદુની પહેલાં આવે છે. બિંદુ પછી પૈસા બે સ્થાન લે છે. એટલે આઠ પૈસા શૂન્ય આઠ લખાય છે.",
    "You learned: the paise take two places after the dot.": "તમે શીખ્યા: બિંદુ પછી પૈસા બે સ્થાન લે છે.",
    "Look at this price tag. How many rupees and how many paise does it show?": "આ કિંમતનું ટૅગ જુઓ. તેના પર કેટલા રૂપિયા અને કેટલા પૈસા છે?",
    "Rupees and paise?": "રૂપિયા અને પૈસા?",
    "Read the two boxes after the dot one at a time. What does each hold?": "બિંદુ પછીનાં બંને ચોકઠાં એક પછી એક વાંચો. દરેકમાં શું છે?",
    "Write 27 rupees and 45 paise with a dot.": "27 રૂપિયા અને 45 પૈસા બિંદુ મૂકીને લખો.",
    "Write 27 rupees 45 paise": "27 રૂપિયા 45 પૈસા લખો",
    "Write it in order: the rupees, then the dot, then the paise.": "ક્રમમાં લખો: પહેલાં રૂપિયા, પછી બિંદુ, પછી પૈસા.",
    "Now 12 rupees and 6 paise, the same way.": "હવે 12 રૂપિયા અને 6 પૈસા, એ જ રીતે.",
    "Write 12 rupees 6 paise": "12 રૂપિયા 6 પૈસા લખો",
    "Look at the strip. Is there a full block of ten?": "પટ્ટી જુઓ. તેમાં દસનો એક આખો ખંડ છે?",
    /* phase 3 */
    "An amount in paise alone": "રકમ ફક્ત પૈસામાં",
    "Every rupee is a hundred paise. Turn the rupees into paise, then add the paise on the strip.": "દરેક રૂપિયો સો પૈસા છે. રૂપિયાને પૈસામાં ફેરવો, પછી પટ્ટીના પૈસા ઉમેરો.",
    "How many paise are on the strip?": "પટ્ટી પર કેટલા પૈસા છે?",
    "Try Rs 1 and 10 paise first. Write it in paise, then with a dot.": "પહેલાં 1 રૂપિયો 10 પૈસા લઈને જુઓ. તેને પૈસામાં લખો, પછી બિંદુ મૂકીને.",
    "An amount is written in paise alone by turning the rupees into hundreds of paise and adding the paise.": "રકમ ફક્ત પૈસામાં લખવા રૂપિયાને સો-સો પૈસામાં ફેરવો. પછી તેમાં પૈસા ઉમેરો.",
    "You learned: rupees become hundreds of paise, then add the paise.": "તમે શીખ્યા: રૂપિયા સો-સો પૈસા બને, પછી પૈસા ઉમેરો.",
    "Write Rs 53.40 in paise alone.": "53 રૂપિયા 40 પૈસા ફક્ત પૈસામાં લખો.",
    "Rs 53.40 in paise?": "₹53.40 કેટલા પૈસા?",
    "How many paise do 53 rupees make?": "53 રૂપિયાના કેટલા પૈસા થાય?",
    "Now Rs 48.60, in paise alone.": "હવે 48 રૂપિયા 60 પૈસા, ફક્ત પૈસામાં.",
    "Rs 48.60 in paise?": "₹48.60 કેટલા પૈસા?",
    "Look at the strip. Is every one of its paise in your number?": "પટ્ટી જુઓ. તેના બધા પૈસા તમારી સંખ્યામાં છે?",
    "A purse holds Rs 50 + Rs 10 + Rs 2 + 30 paise. Which tag shows the same amount?": "એક પાકીટમાં 50 રૂપિયા, 10 રૂપિયા, 2 રૂપિયા અને 30 પૈસા છે. કયું ટૅગ એ જ રકમ બતાવે છે?",
    "Which tag matches?": "કયું ટૅગ મળે છે?",
    "Add the rupees first. Where do the 30 paise go?": "પહેલાં રૂપિયા ઉમેરો. 30 પૈસા ક્યાં જશે?",
    "Rs 60.32": "₹60.32",
    "Rs 62.30": "₹62.30",
    "6,203 paise": "6,203 પૈસા",
    /* phase 4 */
    "Comparing two amounts": "બે રકમની સરખામણી",
    "One tag counts rupees and one counts paise. The switch writes both of them in paise.": "એક ટૅગ રૂપિયા ગણે છે અને એક પૈસા. સ્વિચ બંનેને પૈસામાં લખી દે છે.",
    "How many paise is the rupee tag?": "રૂપિયાવાળું ટૅગ કેટલા પૈસાનું છે?",
    "Try one rupee against 90 paise first. Turn the rupee into paise, then compare.": "પહેલાં 1 રૂપિયો અને 90 પૈસા લઈને જુઓ. રૂપિયાને પૈસામાં ફેરવો, પછી સરખામણી કરો.",
    "Put both amounts in the same unit before comparing them. When both come to the same number of paise, the equals sign goes between them.": "સરખામણી પહેલાં બંને રકમને એક જ એકમમાં લાવો. બંનેના પૈસા સરખા હોય, ત્યારે વચ્ચે બરાબરનું ચિહ્ન આવે.",
    "You learned: compare two amounts once both are in one unit.": "તમે શીખ્યા: બંને રકમ એક એકમમાં હોય, પછી સરખામણી કરો.",
    "The tags say Rs 70 and 6,950 paise. Put greater than, less than or equals between them.": "ટૅગ પર 70 રૂપિયા અને 6,950 પૈસા લખ્યા છે. એમની વચ્ચે મોટું, નાનું કે બરાબરનું ચિહ્ન મૂકો.",
    "Which sign fits?": "કયું ચિહ્ન?",
    "What unit is each tag in?": "દરેક ટૅગ કયા એકમમાં છે?",
    "greater than": "મોટું",
    "less than": "નાનું",
    "equals": "બરાબર",
    "Now the left tag is Rs 30 + Rs 45, and the right one 7,500 paise. Which sign goes between these two?": "હવે ડાબું ટૅગ 30 રૂપિયા + 45 રૂપિયા છે. જમણું ટૅગ 7,500 પૈસા છે. આ બંને વચ્ચે કયું ચિહ્ન આવશે?",
    "Which sign now?": "હવે કયું ચિહ્ન?",
    "Add the two rupee amounts first. Then write them in paise.": "પહેલાં રૂપિયાની બંને રકમ ઉમેરો. પછી તેને પૈસામાં લખો.",
    "One tag says Rs 84.50, the other 8,405 paise. Which is more?": "એક ટૅગ પર 84 રૂપિયા 50 પૈસા છે, બીજા પર 8,405 પૈસા. કયું વધારે છે?",
    "Which is more?": "કયું વધારે?",
    "Flip the switch. Then read both amounts place by place from the left.": "સ્વિચ દબાવો. પછી બંને રકમ ડાબેથી એક-એક સ્થાન કરીને વાંચો.",
    "Rs 84.50": "₹84.50",
    "8,405 paise": "8,405 પૈસા",
    /* spoken by the board */
    "The rest will open when you answer.": "બાકીના સિક્કા તમે જવાબ આપશો ત્યારે ખૂલશે.",
    "The rest will fold when you answer.": "બાકીની પટ્ટીઓ તમે જવાબ આપશો ત્યારે વળશે.",
    /* drawn on the board (and the two answer boxes' labels) */
    "rupees": "રૂપિયા",
    "paise": "પૈસા",
    "more": "વધુ",
    "paise meter": "પૈસા મીટર",
    "waiting for your answer": "તમારા જવાબની રાહ",
    "both in paise": "બંને પૈસામાં",
    "opened": "ખોલ્યા",
    "folded": "વાળી",
  },
};

/* phase 4's three signs, the one answer the pad's word keys hold */
const RP_SIGNS = [{ id: "greater", label: "greater than" }, { id: "less", label: "less than" }, { id: "equals", label: "equals" }];

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   items   three a phase. kind: open (coins into strips) · fold (strips into coins) · read (a tag into
           two boxes) · write (an amount into a tag, with the point key) · alone (a tag into paise) ·
           match (a sum against three tags) · compare / more (two tags in one unit, then a sign).
           near = the item's misconception (judge must reject it). unitOf = what the slot writes after
           the number. */
const PHASES = [
  {
    n: 1,
    concept: "A hundred paise make a rupee",
    conceptId: "M1.S1.T2.C4", objectiveIds: ["O1"],
    says: ["Break one rupee coin into paise, and watch how far the meter climbs."],
    /* tries, as the plan writes it: first rung, how many cells are on one strip; second, how far did the
       meter climb when one rupee opened; third, the tray cut to one coin, counted in blocks of ten */
    ladder: ["How far does the meter move for one full strip?", "Count one strip in blocks of ten. Every coin is worth one full strip."],
    closing: "A hundred paise make one rupee, so rupees become paise when multiplied by a hundred.",
    learned: "You learned: a hundred paise make one rupee.",
    traceback: "The coins open one at a time, the meter climbing a hundred each, then all of them, and the meter stops on the whole amount beside the child's number on its scale.",
    items: [
      /* learn ML1: answer in the plan = 3600 paise */
      { qid: "M1.S1.T2.C4:ML1", kind: "open", rupees: 36, unitOf: "paise", near: 360, winMs: 3600,
        say: "A shopkeeper counts Rs 36 in rupee coins. How many paise is that?", ask: "Rs 36 in paise?", answer: 3600,
        miss: "How many cells are on one strip?" },
      /* practice 1: answer in the plan = 1500 paise, because each rupee is 100 paise */
      { qid: "M1.S1.T2.C4:1", kind: "open", rupees: 15, unitOf: "paise", near: 150, winMs: 2800,
        say: "How many paise make Rs 15?", ask: "Rs 15 in paise?", answer: 1500,
        miss: "Each coin opens into a strip. How many cells is that all together?" },
      /* practice 2: answer in the plan = Rs 9, because every 100 paise make one rupee */
      { qid: "M1.S1.T2.C4:2", kind: "fold", paise: 900, unitOf: "rupees", near: 90, winMs: 2800,
        say: "A jar holds 900 paise. How many rupees is that?", ask: "900 paise in rupees?", answer: 9,
        miss: "Fold one strip back. What does it turn into?" },
    ],
  },
  {
    n: 2,
    concept: "The dot between rupees and paise",
    conceptId: "M1.S1.T2.C5", objectiveIds: ["O1"],
    says: ["A dot on a price tag splits the rupees from the paise. Tap the dot and see."],
    /* tries, as the plan writes it: which part of the tag is rupees; how many places do the paise take;
       the tag cut to one rupee and a few paise, shaded cell by cell */
    ladder: ["How many places do the paise take after the dot?", "The first box after the dot counts tens of paise. The second box counts single paise."],
    closing: "Rupees come before the dot. The paise take two places after it, so eight paise are written zero eight.",
    learned: "You learned: the paise take two places after the dot.",
    traceback: "The dot glows and the tag parts at it: the rupees fill the rupee tray, the paise shade cells as one two-place number, and the right tag is built box by box.",
    items: [
      /* learn ML2: answer in the plan = 64 rupees and 8 paise (two answers: two boxes) */
      { qid: "M1.S1.T2.C5:ML2", kind: "read", tag: "64.08", parts: [{ label: "rupees" }, { label: "paise" }], answer: [64, 8], near: "64|80", winMs: 3000,
        say: "Look at this price tag. How many rupees and how many paise does it show?", ask: "Rupees and paise?",
        miss: "Read the two boxes after the dot one at a time. What does each hold?" },
      /* practice 3: answer in the plan = Rs 27.45 */
      { qid: "M1.S1.T2.C5:3", kind: "write", rs: 27, ps: 45, answer: "27.45", near: "2745", winMs: 2200,
        say: "Write 27 rupees and 45 paise with a dot.", ask: "Write 27 rupees 45 paise",
        miss: "Write it in order: the rupees, then the dot, then the paise." },
      /* practice 4: answer in the plan = Rs 12.06. The paise take two places after the dot, so 6 paise is written 06 */
      { qid: "M1.S1.T2.C5:4", kind: "write", rs: 12, ps: 6, answer: "12.06", near: "12.6", winMs: 2200,
        say: "Now 12 rupees and 6 paise, the same way.", ask: "Write 12 rupees 6 paise",
        miss: "Look at the strip. Is there a full block of ten?" },
    ],
  },
  {
    n: 3,
    concept: "An amount in paise alone",
    conceptId: "M1.S1.T2.C6", objectiveIds: ["O2"],
    says: ["Every rupee is a hundred paise. Turn the rupees into paise, then add the paise on the strip."],
    /* tries, as the plan writes it: how many paise do the rupees make; how many paise are on the strip;
       the board cut to one rupee coin and a few cells */
    ladder: ["How many paise are on the strip?", "Try Rs 1 and 10 paise first. Write it in paise, then with a dot."],
    closing: "An amount is written in paise alone by turning the rupees into hundreds of paise and adding the paise.",
    learned: "You learned: rupees become hundreds of paise, then add the paise.",
    traceback: "The flap lifts, every coin opens into its strip, and the meter counts a hundred for each rupee, then the paise, beside the child's number on its scale.",
    items: [
      /* learn ML3: answer in the plan = 5340 paise */
      { qid: "M1.S1.T2.C6:ML3", kind: "alone", tag: "53.40", unitOf: "paise", near: 93, winMs: 4200,
        say: "Write Rs 53.40 in paise alone.", ask: "Rs 53.40 in paise?", answer: 5340,
        miss: "How many paise do 53 rupees make?" },
      /* practice 5: answer in the plan = 4860 paise. 48 rupees are 4800 paise, and 60 more make 4860 */
      { qid: "M1.S1.T2.C6:5", kind: "alone", tag: "48.60", unitOf: "paise", near: 486, winMs: 4000,
        say: "Now Rs 48.60, in paise alone.", ask: "Rs 48.60 in paise?", answer: 4860,
        miss: "Look at the strip. Is every one of its paise in your number?" },
      /* practice 6: answer in the plan = Rs 62.30. The rupees add to 62 and the paise are 30. 6203 paise is Rs 62.03 */
      { qid: "M1.S1.T2.C6:6", kind: "match", notes: [50, 10, 2], ps: 30, near: "6203p", winMs: 2600,
        choices: [{ id: "60.32", label: "Rs 60.32" }, { id: "62.30", label: "Rs 62.30" }, { id: "6203p", label: "6,203 paise" }],
        say: "A purse holds Rs 50 + Rs 10 + Rs 2 + 30 paise. Which tag shows the same amount?", ask: "Which tag matches?", answer: "62.30",
        miss: "Add the rupees first. Where do the 30 paise go?" },
    ],
  },
  {
    n: 4,
    concept: "Comparing two amounts",
    conceptId: "M1.S1.T2.C7", objectiveIds: ["O2"],
    says: ["One tag counts rupees and one counts paise. The switch writes both of them in paise."],
    /* tries, as the plan writes it: what unit is each tag in; how many paise is the rupee tag; the tags cut
       to one rupee against ninety paise */
    ladder: ["How many paise is the rupee tag?", "Try one rupee against 90 paise first. Turn the rupee into paise, then compare."],
    closing: "Put both amounts in the same unit before comparing them. When both come to the same number of paise, the equals sign goes between them.",
    learned: "You learned: compare two amounts once both are in one unit.",
    traceback: "The switch writes the rupee tag in paise, the two numbers are compared digit by digit from the left, and the right sign drops into the slot.",
    items: [
      /* learn ML4: answer in the plan = Rs 70 is greater than 6950 paise, because Rs 70 is 7000 paise */
      { qid: "M1.S1.T2.C7:ML4", kind: "compare", left: { rs: [70] }, right: { p: 6950 }, choices: RP_SIGNS, answer: "greater", near: "less", winMs: 2600,
        say: "The tags say Rs 70 and 6,950 paise. Put greater than, less than or equals between them.", ask: "Which sign fits?",
        miss: "What unit is each tag in?" },
      /* practice 7: answer in the plan = Equals. Rs 30 and Rs 45 make Rs 75, which is 7500 paise */
      { qid: "M1.S1.T2.C7:7", kind: "compare", left: { rs: [30, 45] }, right: { p: 7500 }, choices: RP_SIGNS, answer: "equals", near: "less", winMs: 2600,
        say: "Now the left tag is Rs 30 + Rs 45, and the right one 7,500 paise. Which sign goes between these two?", ask: "Which sign now?",
        miss: "Add the two rupee amounts first. Then write them in paise." },
      /* practice 8: answer in the plan = Rs 84.50, because it is 8450 paise, and 8450 is more than 8405 */
      { qid: "M1.S1.T2.C7:8", kind: "more", left: { rs: [84], ps: 50 }, right: { p: 8405 }, near: "8405p", winMs: 2600,
        choices: [{ id: "84.50", label: "Rs 84.50" }, { id: "8405p", label: "8,405 paise" }],
        say: "One tag says Rs 84.50, the other 8,405 paise. Which is more?", ask: "Which is more?", answer: "84.50",
        miss: "Flip the switch. Then read both amounts place by place from the left." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  strip: { cells: 100, blocks: 10, cellW: 5.8, w: 580, h: 26 },
  coin: { r: 17, perRow: 10, pitch: 40 },
  trays: { rupee: { x: 0, w: 440 }, paise: { x: 468, w: 618 }, rowsShown: 8 },
  /* phase 1: the child may open (or fold) three before answering, so the meter never reads the answer first */
  actsBeforeAnswer: 3,
  meterScale: "hundred ticks to the next thousand above the amount, the scale never labelled",
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? An amount with a dot is judged in its written form, both paise
   places ("12.6" is not "12.06"). Whole rupees are right as digits or with ".00" typed on the point key
   ("9" and "9.00" are Rs 9); a count of paise has no decimal part, so it is right as digits only, and any
   form with a point ("9.", "9.0", "3600.", "3600.00") is an ordinary miss. A whole number is written with
   no zero in front ("0009" and "05340" are misses, as "027.45" is). In the two boxes the rupees take no zero
   in front either, while the paise box is its two places after the dot: "8" or "08" is 8 paise. */
const judge = (item: any, v: any) => {
  if (item.parts) {
    const [r, p] = slotPartsOf(v, 2);
    return /^(0|[1-9]\d*)$/.test(r) && /^\d{1,2}$/.test(p) && judgeSlotParts(item, v);
  }
  if (typeof item.answer === "number") {
    const s = String(v ?? "").trim();
    return (item.unitOf === "rupees" ? /^(0|[1-9]\d*)(\.00)?$/ : /^(0|[1-9]\d*)$/).test(s) && Number(s) === item.answer;
  }
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived from the spoken question itself (the tag's text for the one question that
   only points at the tag), by a second route that shares no code with judge or the picture */
const rpNumOf = (s: any) => Number(String(s).replace(/,/g, ""));
const oracle = () => {
  const want = (it: any): any => {
    const say = String(it.say);
    const re = /Rs (\d+)(?:\.(\d\d))?/g, money: any[] = [];
    let m: any;
    while ((m = re.exec(say))) money.push({ r: Number(m[1]), p: m[2] ? Number(m[2]) : 0 });
    const pm = /([\d,]+) paise/.exec(say.replace(/Rs [\d.]+/g, ""));
    const paise = pm ? rpNumOf(pm[1]) : 0;
    const inPaise = money.reduce((a, x) => a + x.r * 100 + x.p, 0);
    switch (it.kind) {
      case "open": { let p = 0; for (let k = 0; k < money[0].r; k++) p += 100; return p; }
      case "fold": { let left = paise, r = 0; while (left >= 100) { left -= 100; r++; } return r; }
      case "read": { const x = Math.round(parseFloat(it.tag) * 100); return [Math.floor(x / 100), x % 100]; }
      case "write": { const w = /(\d+) rupees and (\d+) paise/.exec(say) as any; return w[1] + "." + (w[2].length < 2 ? "0" + w[2] : w[2]); }
      case "alone": { const a = /Rs (\d+)\.(\d\d)/.exec(say) as any; return Number(a[1] + a[2]); }
      case "match": {
        const total = inPaise + paise;
        const worth = (label: string) => (/^Rs/.test(label) ? Math.round(parseFloat(label.slice(3)) * 100) : rpNumOf(label.split(" ")[0]));
        return (it.choices.find((c: any) => worth(c.label) === total) || {}).id;
      }
      case "compare": return inPaise > paise ? "greater" : inPaise < paise ? "less" : "equals";
      case "more": return (it.choices.find((c: any) => (inPaise > paise ? /^Rs/ : /paise$/).test(c.label)) || {}).id;
    }
    return undefined;
  };
  return PHASES.every((p: any) => p.items.every((it: any) => JSON.stringify(want(it)) === JSON.stringify(it.answer)));
};
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => (item.near !== undefined ? item.near : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print. A tag the child reads is the
   question itself, so for it the answer is the reading in words ("8 paise"); a choice is its verdict. */
const answerForms = (item: any) => {
  const a = item.answer;
  if (item.kind === "read") return [a[0] + " rupees", a[1] + " paise", words(a[1]) + " paise"];
  if (item.kind === "write" || item.kind === "match") return [a, "Rs " + a];
  if (item.kind === "compare") return ({ greater: ["is greater than", "is more than"], less: ["is less than"], equals: ["are equal", "is equal to"] } as any)[a];
  if (item.kind === "more") return ["Rs " + a + " is more"];
  if (item.kind === "fold") return ["Rs " + a, a + " rupees", words(a) + " rupees"];
  return [String(a), indian(a), words(a)];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer(): an amount with a dot is typed as it is written (toolApi.answer would strip the point
   and type "12.06" as 1206); everything else is typed or chosen by the runtime */
const answer = (item: any, v: any) => (item.kind === "write" && HOOK.type ? HOOK.type(String(v)) : undefined);
/* the agent's check() before Enter: nothing waits on the board, so Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* what the slot shows: the unit is always written beside the number (Rs before it, paise after it) */
const RP_NOW: any = { item: null, sym: "Rs" }; /* sym: the rupee mark a tag draws (Work and Thumb set it from lang) */
const RP_SIGN: any = { greater: ">", less: "<", equals: "=" };
const format = (v: any, j?: any, o?: any) => {
  const s = String(v ?? "");
  const it = RP_NOW.item;
  const tr = (o && o.tx) || ((x: any) => x);
  if (s === "" || !it || it.parts) return s;
  if (it.choices) { const c = it.choices.find((x: any) => x.id === s); return RP_SIGN[s] || (c ? c.label : s); }
  /* commas on a whole number from 1,000 up; never inside an amount written with a dot (kind "write") */
  const num = it.kind !== "write" && /^[1-9]\d{3,}$/.test(s) ? indian(Number(s)) : s;
  /* drawn money: "Rs 9" in English, the language-neutral "₹9" in Hindi and Gujarati */
  return it.unitOf === "paise" ? num + " " + tr("paise") : (o && o.lang && o.lang !== "en" ? "₹" : "Rs ") + num;
};

/* ── the board: sizes, places and pieces (working-area units) ──────────────────────────────── */

const RPI = { blue: shade(CONTENT.hundred, 0.25), green: shade(CONTENT.one, 0.25), sky: shade("#56B4E9", 0.45), quiet: "#5F6368" };
const RP_FREE = { kind: "free", rupees: 12, ps: 35 };
const RP_SX = 18; /* a strip's left inset in the paise tray */

const rpLayout = (kind: string) => {
  const tagged = kind === "read" || kind === "write" || kind === "alone";
  const top = kind === "alone" ? 146 : tagged ? 170 : 56;
  const h = kind === "alone" ? 280 : tagged ? 296 : 300;
  return {
    top, tagSc: kind === "alone" ? 1 : 1.2,
    rt: { x: 0, y: top, w: 440, h },
    pt: { x: 468, y: top, w: 618, h },
    meter: kind === "read" || kind === "write" ? null : { x: 0, y: top + h + 18, w: 1086, h: 76 },
  };
};
const rpCoinAt = (rt: any, k: number) => ({ x: rt.x + 40 + (k % 10) * 40, y: rt.y + 28 + Math.floor(k / 10) * 40 });
const rpRowY = (pt: any, r: number) => pt.y + 10 + r * 34;
/* the paise tray's rows: full strips, then (past what fits) a stack with its count, then the part strip */
const rpRows = (full: number, part: number) => {
  const rows: any[] = [];
  const room = part > 0 ? 6 : 7; /* at most seven rows, so the tray keeps a margin at its floor */
  if (full <= room) for (let k = 0; k < full; k++) rows.push({ t: "full" });
  else { for (let k = 0; k < room - 1; k++) rows.push({ t: "full" }); rows.push({ t: "stack", n: full - (room - 1) }); }
  if (part > 0) rows.push({ t: "part", c: part });
  return rows;
};
const rpTagParts = (s: string) => { const [r, p = ""] = String(s).split("."); return { rs: r, p1: p.charAt(0), p2: p.charAt(1) }; };
const rpSidePaise = (sd: any) => (sd.p !== undefined ? sd.p : sd.rs.reduce((a: number, x: number) => a + x, 0) * 100 + (sd.ps || 0));
const rpMeterMax = (it: any) => {
  const amount = it.kind === "open" ? it.rupees * 100 : it.kind === "fold" ? it.paise : it.kind === "free" ? it.rupees * 100 + it.ps
    : Number(rpTagParts(it.tag).rs) * 100 + 100;
  return Math.ceil((amount + 1) / 1000) * 1000;
};
const rpBoard = (it: any) => {
  const k = it.kind;
  if (k === "open") return { coins: it.rupees, full: 0, part: 0, fill: 100, acts: 0, count: null };
  if (k === "fold") return { coins: 0, full: Math.floor(it.paise / 100), part: it.paise % 100, fill: 100, acts: 0, count: null };
  if (k === "read") return { coins: 0, full: 0, part: 0, fill: 100, parted: false, count: null };
  if (k === "write") return { coins: it.rs, full: 0, part: it.ps, fill: 100, count: null };
  if (k === "alone") { const t = rpTagParts(it.tag); return { coins: Number(t.rs), full: 0, part: Number(t.p1 + t.p2), fill: 100, acts: 0, flap: true, count: null }; }
  if (k === "free") return { coins: it.rupees, full: 0, part: it.ps, fill: 100, acts: 0, flap: false, count: null };
  return { sw: false };
};
/* the first place, from the left, where two amounts in paise differ (-1 when they are equal) */
const rpFirstDiff = (a: number, b: number) => {
  const sa = String(a), sb = String(b);
  if (sa.length !== sb.length) return 0;
  for (let k = 0; k < sa.length; k++) if (sa[k] !== sb[k]) return k;
  return -1;
};

/* a play coin: one plain steel disc with its value, one rupee unless it says otherwise */
function rpCoin(C: any, x: number, y: number, key: any, o: any = {}) {
  const r = o.r || 17, size = o.size || T.micro;
  return (
    <g key={key} filter={o.lift ? "url(#fLift)" : undefined}>
      <circle cx={x} cy={y} r={r} fill="url(#rpSteel)" stroke="#7D8790" strokeWidth={2} />
      <text x={x} y={y + size * 0.36} textAnchor="middle" fontSize={size} fontWeight={700} fill={RPI.blue}>{o.label || "1"}</text>
    </g>
  );
}
/* a rupee strip: a hundred cells in ten blocks of ten, `cells` of them shaded (a ghost is the child's reading) */
function rpStrip(C: any, x: number, y: number, cells: number, key: any, o: any = {}) {
  const h = 26;
  return (
    <g key={key} transform={`translate(${x},${y})`}>
      <rect x={0} y={0} width={580} height={h} fill="#FFFFFF" />
      {cells > 0 && <rect x={0} y={0} width={Math.min(100, cells) * 5.8} height={h} fill={o.ghost ? "#C4CACF" : "url(#gOne)"} />}
      <rect x={0} y={0} width={580} height={h} fill="url(#rpTick)" />
      {Array.from({ length: 9 }, (_, k) => <line key={k} x1={(k + 1) * 58} y1={0} x2={(k + 1) * 58} y2={h} stroke={C.ink} strokeWidth={2} />)}
      <rect x={0} y={0} width={580} height={h} fill="none" stroke={C.ink} strokeWidth={2} />
    </g>
  );
}
/* full strips past what the tray shows: a neat stack (a pile of strips, drawn narrower), the number of
   strips in it beside it, so the count never sits on the ruled cells */
function rpStack(C: any, x: number, y: number, count: number, key: any, tx: any) {
  const w = 420, bw = w / 10;
  return (
    <g key={key} transform={`translate(${x},${y})`}>
      <rect x={8} y={6} width={w} height={22} fill={tint(CONTENT.one, 0.55)} stroke={C.ink} strokeWidth={1.5} />
      <rect x={4} y={3} width={w} height={22} fill={tint(CONTENT.one, 0.35)} stroke={C.ink} strokeWidth={1.5} />
      <rect x={0} y={0} width={w} height={22} fill="url(#gOne)" />
      {Array.from({ length: 9 }, (_, k) => <line key={k} x1={(k + 1) * bw} y1={0} x2={(k + 1) * bw} y2={22} stroke={C.ink} strokeWidth={1.5} />)}
      <rect x={0} y={0} width={w} height={22} fill="none" stroke={C.ink} strokeWidth={2} />
      <rect x={444} y={-2} width={136} height={30} rx={15} fill="#FFFFFF" stroke={C.ink} strokeWidth={1.5} />
      <text x={512} y={22} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={RPI.sky}>{count + " " + tx("more")}</text>
    </g>
  );
}
/* a play note: one plain pale blue rectangle with its value */
function rpNote(C: any, x: number, y: number, v: number, key: any) {
  return (
    <g key={key}>
      <rect x={x} y={y} width={130} height={76} rx={8} fill="#D6E7F4" stroke={shade(CONTENT.hundred, 0.3)} strokeWidth={2} />
      <rect x={x + 7} y={y + 7} width={116} height={62} rx={5} fill="none" stroke={tint(CONTENT.hundred, 0.45)} strokeWidth={1.5} />
      <text x={x + 65} y={y + 58} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={RPI.blue}>{v}</text>
    </g>
  );
}
/* a price tag, 440 x 100: Rs, the rupees in blue, the vermilion dot, and BOTH paise boxes drawn, filled or not */
function rpTag(C: any, x: number, y: number, t: any, sc = 1, key?: any) {
  const off = t.parted ? 12 : 0;
  const rs = String(t.rs || "");
  /* a long run of rupee digits (a child who typed past the dot) drops a size so it never runs into "Rs" */
  const rsSize = rs.length <= 2 ? T.display : Math.max(T.micro, Math.floor(122 / (rs.length * 0.64)));
  const ring = (rx: number, ry: number, w: number, h: number) => <rect x={rx} y={ry} width={w} height={h} rx={14} fill="none" stroke={C.accent} strokeWidth={5} />;
  const box = (bx: number, ch: string) => (
    <g>
      <rect x={bx} y={14} width={64} height={74} rx={10} fill={tint(CONTENT.one, 0.88)} stroke={RPI.green} strokeWidth={2.5} />
      {ch !== "" && <text x={bx + 32} y={76} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={RPI.green}>{ch}</text>}
    </g>
  );
  /* the rupees end 23 short of the dot and the first paise box starts 23 past it, so the dot's pulse and its
     ring never touch a digit or a box; a zero in a paise box is a digit like any other (green, full size) */
  return (
    <g key={key} transform={`translate(${x},${y})${sc !== 1 ? ` scale(${sc})` : ""}`}>
      <rect x={0} y={0} width={440} height={100} rx={18} fill="#FFFFFF" stroke={t.lit ? C.accent : C.ink} strokeWidth={t.lit ? 5 : 2.5} />
      <circle cx={24} cy={50} r={8} fill={C.paper} stroke={C.ink} strokeWidth={2} />
      <text x={42} y={68} fontSize={T.speech} fontWeight={600} fill={C.ink}>{RP_NOW.sym}</text>
      {rs !== "" && <text x={232 - off} y={76} textAnchor="end" fontSize={rsSize} fontWeight={700} fill={RPI.blue}>{rs}</text>}
      <circle cx={255} cy={68} r={9} fill={CONTENT.pointer} />
      {t.ring === "dot" && <circle cx={255} cy={68} r={18} fill="none" stroke={CONTENT.pointer} strokeWidth={4} />}
      <g transform={`translate(${off},0)`}>
        {t.parted && <rect x={272} y={7} width={150} height={88} rx={14} fill="none" stroke={RPI.green} strokeWidth={4} />}
        {box(278, t.p1 || "")}
        {box(350, t.p2 || "")}
        {t.ring === "p1" && ring(272, 8, 76, 86)}
        {t.ring === "p2" && ring(344, 8, 76, 86)}
      </g>
      {t.ring === "rs" && ring(110, 8, 130, 86)}
    </g>
  );
}
/* an amount in paise alone, drawn digit by digit (so the place where two amounts differ can be ringed) */
function rpDigitsRow(C: any, cx: number, y: number, value: number, ring: number, tx: any) {
  /* a comma gets half a digit's room, so a ring round the digit before it keeps clear of it */
  const s = indian(value), size = T.xl, dw = size * 0.66, cwid = size * 0.42, uw = 5 * T.label * 0.58 + 14;
  let w = 0;
  for (const ch of s) w += ch === "," ? cwid : dw;
  let x = cx - (w + uw) / 2, di = 0;
  const out: any[] = [];
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === ",") { out.push(<text key={i} x={x + cwid / 2 + 4} y={y} textAnchor="middle" fontSize={size} fontWeight={700} fill={RPI.green}>,</text>); x += cwid; continue; }
    if (di === ring) out.push(<rect key="ring" x={x - 1} y={y - size * 0.86} width={dw + 2} height={size * 1.04} rx={10} fill="none" stroke={C.accent} strokeWidth={4} />);
    out.push(<text key={i} x={x + dw / 2} y={y} textAnchor="middle" fontSize={size} fontWeight={700} fill={RPI.green}>{ch}</text>);
    x += dw; di++;
  }
  out.push(<text key="u" x={x + 14} y={y} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("paise")}</text>);
  return out;
}
/* an invisible tap target that is a toggle (the same-unit switch, the flap): the runtime's Hit, plus
   aria-pressed, so its on or off state is not visual only. A module-level component, so its type is stable. */
function RpToggle({ id, x, y, w, h, on, onPress, label, enabled = true }: any) {
  const p = usePress(onPress, enabled);
  return (
    <rect className="c4-hit" data-control={id} role="button" tabIndex={0} aria-label={label || id} aria-pressed={on ? "true" : "false"}
      x={x} y={y} width={w} height={h} fill="transparent" {...p.bind()} onKeyDown={p.keys} />
  );
}
/* the paise meter: a scale ticked every hundred (a thousand taller), never labelled, and the reading beside it */
function rpMeter(C: any, m: any, value: number, max: number, o: any, tx: any) {
  const tx0 = m.x + 20, tw = m.w - 330, ty = m.y + 42, th = 20;
  const at = (v: number) => tx0 + Math.max(0, Math.min(1, v / max)) * tw;
  const ticks: any[] = [];
  for (let v = 100; v < max; v += 100) {
    const big = v % 1000 === 0;
    ticks.push(<line key={v} x1={at(v)} y1={ty - (big ? 12 : 5)} x2={at(v)} y2={ty + th} stroke={big ? C.ink : "#8A9096"} strokeWidth={big ? 2.5 : 1.2} />);
  }
  const mk = o.marker;
  const showMk = !o.covered && typeof mk === "number" && isFinite(mk) && mk >= 0 && mk <= max;
  return (
    <g>
      <rect x={m.x} y={m.y} width={m.w} height={m.h} rx={16} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
      {!o.covered && (
        <g>
          <rect x={tx0} y={ty} width={tw} height={th} rx={4} fill={tint(C.panel, 0.4)} stroke={C.ink} strokeWidth={1.5} />
          {value > 0 && <rect x={tx0} y={ty} width={at(value) - tx0} height={th} rx={4} fill="url(#gOne)" />}
          {ticks}
          {showMk && (
            <g pointerEvents="none">
              <path d={`M ${at(mk) - 9} ${ty - 13} L ${at(mk) + 9} ${ty - 13} L ${at(mk)} ${ty - 2} Z`} fill={RPI.quiet} />
              <text x={Math.max(tx0 + 36, Math.min(tx0 + tw - 36, at(mk)))} y={m.y + 28} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={RPI.quiet}>{indian(mk)}</text>
            </g>
          )}
          <text x={m.x + m.w - 124} y={m.y + 54} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={RPI.green}>{indian(value)}</text>
          <text x={m.x + m.w - 110} y={m.y + 54} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("paise")}</text>
        </g>
      )}
      {o.covered && (
        <g>
          <rect x={m.x + 6} y={m.y + 6} width={m.w - 12} height={m.h - 12} rx={12} fill={C.panel} stroke={C.ink} strokeWidth={2} />
          <text x={m.x + 32} y={m.y + 48} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("paise meter")}</text>
          <rect x={m.x + m.w / 2 - 60} y={m.y + m.h / 2 - 5} width={120} height={10} rx={5} fill={C.ink} />
        </g>
      )}
      {/* a flap that can come down: rolled up along the whole of the meter's top edge, its grip showing */}
      {o.rolled && !o.covered && (
        <g>
          <rect x={m.x + 16} y={m.y - 6} width={m.w - 32} height={12} rx={6} fill={C.panel} stroke={C.ink} strokeWidth={2} />
          <rect x={m.x + m.w / 2 - 40} y={m.y - 2} width={80} height={4} rx={2} fill={C.ink} />
        </g>
      )}
    </g>
  );
}

/* ── the working area: 1086 x 528, origin at its top-left ────────────────────────────────────
   Countable things use CONTENT colours: rupees deep blue, paise green, the dot vermilion. The picture
   builds the amount; nothing prints the answer before the child gives it (phase 1 lets three coins open
   before the answer, phase 3 keeps the meter under its flap). `wrong` = { value, tries } after a miss:
   lock, redraw the mathematics in steps ending on the whole right answer (the traceback), unlock;
   never mark it, never reset it. stage === "free" is Free play. */
function Work({ phase, n, item, index, stage, wrong, typed, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const free = stage === "free";
  const it: any = free ? RP_FREE : item || {};
  RP_NOW.item = free ? null : it;
  /* drawn money: "Rs 70" in English, "₹70" in Hindi and Gujarati (the picture's own amounts) */
  RP_NOW.sym = lang === "en" ? "Rs" : "₹";
  const RS = lang === "en" ? "Rs " : "₹";
  const kind = it.kind;
  const L = rpLayout(kind);
  const key = free ? "free" : n + ":" + index;
  const tl = useTimeline();   /* the traceback and the win (the pad waits) */
  const ft = useTimeline();   /* the child's own moves: a strip filling, the flap's sweep */
  const [S, setS] = useState<any>(() => ({ key, b: rpBoard(it), d: {} }));
  let cur = S;
  if (S.key !== key) { cur = { key, b: rpBoard(it), d: {} }; setS(cur); }
  const b = cur.b, d = cur.d;
  const putB = (k: string, o: any) => setS((s: any) => (s.key !== k ? s : { ...s, b: { ...s.b, ...(typeof o === "function" ? o(s.b) : o) } }));
  const putD = (k: string, o: any) => setS((s: any) => (s.key !== k ? s : { ...s, d: { ...s.d, ...(typeof o === "function" ? o(s.d) : o) } }));
  const clearD = (k: string) => setS((s: any) => (s.key !== k ? s : { ...s, d: {} }));
  useEffect(() => () => { tl.stop(); ft.stop(); }, [key]);

  /* Enter and choice taps go straight to the runtime: the answer is typed or chosen */
  api.onEnter(null);
  HOOK.type = (v: string) => { api.setTyped(v); return true; };

  const live = !tl.busy && (free || stage === "ask" || stage === "teach");
  /* phase 1's allowance: three coins (or strips) before the answer, so the meter never reads it first.
     Taps during the teach lines have their own three and never spend the question's; once the question's
     three are used, the tray stays a control that says the rest open with the answer, and a quiet label
     under the waiting coins says the same. */
  const capped = kind === "open" || kind === "fold";
  const spent = stage === "teach" ? (b.pre || 0) : (b.used || 0);
  const allow = !capped || spent < 3;
  const pieceOpen = live && (kind === "open" || kind === "alone" || free) && b.coins > 0;
  const pieceFold = live && (kind === "fold" || free) && b.full > 0;
  const canOpen = pieceOpen && allow;
  const canFold = pieceFold && allow;
  const waiting = capped && stage === "ask" && !tl.busy && !d.done && !d.totals && (b.used || 0) >= 3 && (kind === "open" ? b.coins > 0 : b.full > 0);
  const spend = (x: any) => (stage === "teach" ? { pre: (x.pre || 0) + 1 } : { used: (x.used || 0) + 1 });
  const cue = () => {
    if (b.cued) return;
    putB(key, { cued: true });
    if (kind === "fold") api.say("The rest will fold when you answer.");
    else api.say("The rest will open when you answer.");
  };
  const flapLive = live && ((kind === "alone" && d.traced) || free);
  const startCoins = kind === "open" ? it.rupees : kind === "alone" ? Number(rpTagParts(it.tag).rs) : 0;

  /* the paise in the paise tray (the newest strip counts only as far as it has filled) */
  const trueP = b.full * 100 + (b.part || 0) - (b.full > 0 && b.fill < 100 ? 100 - b.fill : 0);
  const shownP = b.count ?? trueP;

  /* ── the child's moves ── */
  const openOne = () => {
    if (!pieceOpen) return;
    if (!allow) { cue(); return; }
    const k = key;
    api.sfx.tick();
    putB(k, (x: any) => ({ coins: x.coins - 1, full: x.full + 1, fill: 0, acts: (x.acts || 0) + 1, count: null, ...spend(x) }));
    ft.run(Array.from({ length: 10 }, (_, j) => [40, () => putB(k, { fill: (j + 1) * 10 })]));
  };
  const foldOne = () => {
    if (!pieceFold) return;
    if (!allow) { cue(); return; }
    api.sfx.tick();
    putB(key, (x: any) => ({ full: x.full - 1, coins: x.coins + 1, acts: (x.acts || 0) + 1, fill: 100, count: null, ...spend(x) }));
  };
  const partTag = () => { if (!live || kind !== "read") return; api.sfx.tick(); putB(key, (x: any) => ({ parted: !x.parted })); };
  const flip = () => { if (!live) return; api.sfx.tick(); putB(key, (x: any) => ({ sw: !x.sw })); };
  /* the flap: lifting it opens every coin still in the rupee tray, left to right, and the meter counts a
     hundred for each, then the part strip last; dropping it sends the coins home. The voice says nothing. */
  const sweepSteps = (k: string, coins: number, part: number, ms: number) => {
    const s: any[] = [[150, () => putB(k, (x: any) => ({ flap: false, count: x.full * 100, fill: 100 }))]];
    for (let j = 0; j < coins; j++) s.push([ms, () => putB(k, (x: any) => (x.coins > 0 ? { coins: x.coins - 1, full: x.full + 1, acts: (x.acts || 0) + 1, count: (x.count ?? 0) + 100 } : {}))]);
    for (let c = 10; c < part; c += 10) { const cc = c; s.push([80, () => putB(k, (x: any) => ({ count: x.full * 100 + cc }))]); }
    s.push([120, () => putB(k, { count: null })]);
    return s;
  };
  const toggleFlap = () => {
    if (!flapLive) return;
    api.sfx.tick();
    if (b.flap) ft.run(sweepSteps(key, b.coins, b.part, 45));
    else { ft.stop(); putB(key, (x: any) => ({ flap: true, coins: x.coins + x.full, full: 0, count: null, fill: 100 })); }
  };

  const drag = useDrag((pay: any, at: any, moved: boolean) => {
    const inside = (r: any) => at && at.x >= r.x && at.x <= r.x + r.w && at.y >= r.y && at.y <= r.y + r.h;
    if (pay === "coin") { if (!moved || inside(L.pt)) openOne(); }
    else if (pay === "strip") { if (!moved || inside(L.rt)) foldOne(); }
  });

  /* ── steps the traceback and the win share ── */
  const openSteps = (k: string, count: number, slow: boolean) => {
    const out: any[] = [];
    for (let j = 0; j < count; j++) {
      if (slow) {
        out.push([80, () => putB(k, (x: any) => (x.coins > 0 ? { coins: x.coins - 1, full: x.full + 1, fill: 0, acts: (x.acts || 0) + 1, count: null } : {}))]);
        for (let f = 1; f <= 10; f++) { const ff = f; out.push([50, () => putB(k, { fill: ff * 10 })]); }
        out.push([260, () => api.sfx.tick()]);
      } else out.push([45, () => putB(k, (x: any) => (x.coins > 0 ? { coins: x.coins - 1, full: x.full + 1, fill: 100, acts: (x.acts || 0) + 1, count: null } : {}))]);
    }
    return out;
  };
  const foldSteps = (k: string, count: number, slowN: number) => {
    const out: any[] = [];
    for (let j = 0; j < count; j++) out.push([j < slowN ? 480 : 160, () => { putB(k, (x: any) => (x.full > 0 ? { full: x.full - 1, coins: x.coins + 1, acts: (x.acts || 0) + 1, fill: 100 } : {})); if (j < slowN) api.sfx.tick(); }]);
    return out;
  };
  const coinRows = (k: string, rs: number) => {
    const out: any[] = [];
    for (let c = 10; c < rs + 10; c += 10) { const cc = Math.min(rs, c); out.push([110, () => putB(k, { coins: cc })]); }
    return out;
  };
  const cmpSign = () => { const a = rpSidePaise(it.left), z = rpSidePaise(it.right); return a > z ? ">" : a < z ? "<" : "="; };

  const traceSteps = (k: string, value: any) => {
    const B = cur.b;
    const s: any[] = [[250, () => clearD(k)]];
    if (kind === "open") {
      const v = leadNumber(value);
      const slowN = Math.min(Math.max(1, 3 - (B.acts || 0)), B.coins);
      s.push(...openSteps(k, slowN, true));
      if (v !== null && isFinite(v) && v >= 0 && v !== it.answer) s.push([500, () => putD(k, { marker: v })]);
      s.push(...openSteps(k, B.coins - slowN, false));
      s.push([300, () => putD(k, { done: true })]);
    } else if (kind === "fold") {
      s.push(...foldSteps(k, B.full, Math.max(1, 3 - (B.acts || 0))));
      s.push([300, () => putD(k, { totals: true })]);
    } else if (kind === "read") {
      const t = rpTagParts(it.tag), rs = Number(t.rs), ps = Number(t.p1 + t.p2);
      const pv = Number(slotPartsOf(value, 2)[1]);
      s.push([400, () => { putB(k, { parted: true }); putD(k, { ring: "dot" }); }]);
      s.push(...coinRows(k, rs));
      if (slotPartsOf(value, 2)[1] !== "" && isFinite(pv) && pv !== ps && pv >= 0 && pv <= 100) s.push([500, () => putD(k, { ghost: pv })]);
      s.push([600, () => putB(k, { part: ps })]);
      s.push([400, () => putD(k, { ring: null, totals: true })]);
    } else if (kind === "write") {
      const cp = String(value ?? "").split(".")[1] || "";
      const pv = cp.length === 1 ? Number(cp) * 10 : cp.length === 2 ? Number(cp) : NaN;
      if (isFinite(pv) && pv !== it.ps) s.push([500, () => putD(k, { ghost: pv })]);
      /* the right tag starts from its dot: it glows first, and the rupees go before it, the paise after it */
      s.push([700, () => putD(k, { dtag: { rs: "", p1: "", p2: "" }, ring: "dot" })]);
      s.push([650, () => putD(k, (D: any) => ({ dtag: { ...D.dtag, rs: String(it.rs) }, ring: "rt" }))]);
      s.push([750, () => putD(k, (D: any) => ({ dtag: { ...D.dtag, p1: String(Math.floor(it.ps / 10)) }, ring: "tens" }))]);
      s.push([750, () => putD(k, (D: any) => ({ dtag: { ...D.dtag, p2: String(it.ps % 10) }, ring: "ones" }))]);
      s.push([400, () => putD(k, { ring: null, totals: true })]);
    } else if (kind === "alone") {
      const v = leadNumber(value);
      s.push(...sweepSteps(k, B.coins, B.part, 45));
      if (v !== null && isFinite(v) && v >= 0 && v !== it.answer) s.push([400, () => putD(k, { marker: v })]);
      s.push([200, () => putD(k, { traced: true })]);
    } else if (kind === "match") {
      s.push([500, () => putD(k, { sumR: true })], [600, () => putD(k, { sumP: true })], [600, () => putD(k, { join: it.answer })]);
    } else if (kind === "compare" || kind === "more") {
      s.push([400, () => putB(k, { sw: true })], [800, () => putD(k, { rings: true })], [700, () => putD(k, { sign: cmpSign() })]);
      if (kind === "more") s.push([400, () => putD(k, { big: true })]);
    }
    return s;
  };
  const winSteps = (k: string) => {
    const B = cur.b;
    const s: any[] = [];
    if (kind === "open") s.push(...openSteps(k, B.coins, false), [200, () => putD(k, { done: true })]);
    else if (kind === "fold") s.push(...foldSteps(k, B.full, 0), [200, () => putD(k, { totals: true })]);
    else if (kind === "read") {
      const t = rpTagParts(it.tag);
      s.push([200, () => putB(k, { parted: true })], ...coinRows(k, Number(t.rs)), [300, () => putB(k, { part: Number(t.p1 + t.p2) })], [200, () => putD(k, { totals: true })]);
    } else if (kind === "write") s.push([200, () => putD(k, { lit: true, totals: true })]);
    else if (kind === "alone") s.push(...sweepSteps(k, B.coins, B.part, 40));
    else if (kind === "match") s.push([200, () => putD(k, { sumR: true, sumP: true })], [400, () => putD(k, { join: it.answer })]);
    else if (kind === "compare" || kind === "more") {
      s.push([200, () => putB(k, { sw: true })], [600, () => putD(k, { sign: cmpSign(), big: kind === "more" })]);
    }
    return s;
  };

  /* the traceback: the pad waits while the board redraws the maths, ending on the whole right answer */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    api.lock(true);
    ft.stop();
    tl.run(traceSteps(key, wrong.value), () => api.lock(false));
  }, [wrong]);
  /* the win: the board finishes the move the answer named */
  useEffect(() => {
    if (free || stage !== "win") return;
    ft.stop();
    tl.run(winSteps(key));
  }, [stage, key]);

  /* what the host and the agent read back (toolApi.getState); a covered meter shares nothing */
  const meterSeen = !!L.meter && !b.flap;
  api.share({
    phase: n, rupees: b.coins ?? null, paise: meterSeen ? trueP : null, paiseMeter: meterSeen ? shownP : null,
    tag: kind === "read" || kind === "alone" ? "Rs " + it.tag : kind === "write" ? "Rs " + String(typed || "") : null,
    leftTag: it.left ? (b.sw ? indian(rpSidePaise(it.left)) + " paise" : "Rs " + it.left.rs.join(" + Rs ") + (it.left.ps ? "." + it.left.ps : "")) : null,
    rightTag: it.right ? indian(it.right.p) + " paise" : null, sign: d.sign || null,
  });

  const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
  const moving = drag.drag ? drag.drag.payload : null;
  const idleAsk = (stage === "ask" || stage === "teach") && !tl.busy && !d.done && !d.traced && !d.dtag && !d.ring;

  /* ── the board (phases 1 to 3, and Free play) ── */
  const drawBoard = () => {
    const rows = rpRows(b.full, b.part || 0);
    const stackAt = rows.findIndex((r: any) => r.t === "stack");
    const lastFull = stackAt >= 0 ? stackAt : rows.map((r: any) => r.t).lastIndexOf("full");
    const sx = L.pt.x + RP_SX;
    const stripPiece = pieceFold && lastFull >= 0;
    const statics = pieceOpen ? b.coins - 1 : b.coins;
    const tagT = kind === "read" || kind === "alone" ? rpTagParts(it.tag)
      : kind === "write" ? (() => { const [r, p = ""] = String(typed || "").split("."); return { rs: r, p1: p.charAt(0), p2: p.charAt(1) }; })() : null;
    const ringOnBoard = (r: string) => {
      if (kind !== "write" || d.ring !== r) return null;
      const y0 = rpRowY(L.pt, 0);
      if (r === "rt") return <rect x={L.rt.x - 4} y={L.rt.y - 4} width={L.rt.w + 8} height={L.rt.h + 8} rx={20} fill="none" stroke={C.accent} strokeWidth={5} />;
      const tens = Math.floor(it.ps / 10);
      if (r === "tens") return tens > 0 ? <rect x={sx - 5} y={y0 - 5} width={tens * 58 + 10} height={36} rx={8} fill="none" stroke={C.accent} strokeWidth={4} /> : null;
      return <rect x={sx + tens * 58 - 5} y={y0 - 5} width={(it.ps % 10) * 5.8 + 10} height={36} rx={8} fill="none" stroke={C.accent} strokeWidth={4} />;
    };
    let invite: any = null;
    if (idleAsk && !free) {
      if (canOpen && !(b.acts || 0)) invite = rpCoinAt(L.rt, b.coins - 1);
      else if (stripPiece && !(b.acts || 0)) invite = { x: sx + 40, y: rpRowY(L.pt, lastFull) + 13 };
      else if (kind === "read" && !b.parted) invite = { x: 255 * L.tagSc, y: 68 * L.tagSc, r: 16 };
    }
    const tagTotal = kind === "fold" ? RS + b.coins : kind === "read" ? Number(rpTagParts(it.tag).rs) + " " + tx("rupees") : kind === "write" ? it.rs + " " + tx("rupees") : null;
    const paiseTotal = kind === "read" ? Number(rpTagParts(it.tag).p1 + rpTagParts(it.tag).p2) + " " + tx("paise") : kind === "write" ? it.ps + " " + tx("paise") : null;
    return (
      <g>
        {tagT && rpTag(C, 0, 0, { ...tagT, parted: kind === "read" && b.parted, ring: kind === "read" && d.ring === "dot" ? "dot" : null, lit: !!d.lit }, L.tagSc)}
        {kind === "read" && <RpToggle id="dot" x={255 * L.tagSc - 36} y={68 * L.tagSc - 36} w={72} h={72} on={!!b.parted} onPress={partTag} label={tx("the dot")} enabled={live} />}
        {d.dtag && (
          <g pointerEvents="none">
            {rpTag(C, 1086 - 440 * L.tagSc, 0, { ...d.dtag, ring: d.ring === "dot" ? "dot" : d.ring === "rt" ? "rs" : d.ring === "tens" ? "p1" : d.ring === "ones" ? "p2" : null }, L.tagSc)}
          </g>
        )}

        <text x={L.rt.x + 8} y={L.rt.y - 12} fontSize={T.micro} fontWeight={600} fill={RPI.blue}>{tx("rupees")}</text>
        <text x={L.pt.x + 8} y={L.pt.y - 12} fontSize={T.micro} fontWeight={600} fill={RPI.green}>{tx("paise")}</text>
        {(d.totals) && tagTotal && <text x={L.rt.x + L.rt.w - 8} y={L.rt.y - 12} textAnchor="end" fontSize={T.label} fontWeight={700} fill={RPI.blue}>{tagTotal}</text>}
        {(d.totals) && paiseTotal && <text x={L.pt.x + L.pt.w - 8} y={L.pt.y - 12} textAnchor="end" fontSize={T.label} fontWeight={700} fill={RPI.green}>{paiseTotal}</text>}
        <rect x={L.rt.x} y={L.rt.y} width={L.rt.w} height={L.rt.h} rx={16} fill={tint(C.panel, 0.45)} stroke={C.ink} strokeWidth={2} />
        <rect x={L.pt.x} y={L.pt.y} width={L.pt.w} height={L.pt.h} rx={16} fill={tint(C.panel, 0.45)} stroke={C.ink} strokeWidth={2} />

        {Array.from({ length: Math.max(0, statics) }, (_, k) => { const p = rpCoinAt(L.rt, k); return rpCoin(C, p.x, p.y, "c" + k); })}
        {rows.map((r: any, k: number) => {
          const y = rpRowY(L.pt, k);
          if (r.t === "full") return stripPiece && k === lastFull ? null : rpStrip(C, sx, y, k === lastFull && stackAt < 0 ? b.fill : 100, "r" + k);
          if (r.t === "stack") return rpStack(C, sx, y, r.n, "r" + k, tx);
          return rpStrip(C, sx, y, r.c, "r" + k);
        })}
        {typeof d.ghost === "number" && (
          <g pointerEvents="none">
            {rpStrip(C, sx, rpRowY(L.pt, 2), d.ghost, "ghost", { ghost: true })}
            <text x={sx} y={rpRowY(L.pt, 3) + 24} fontSize={T.micro} fontWeight={600} fill={RPI.quiet}>{d.ghost + " " + tx("paise")}</text>
          </g>
        )}
        <g pointerEvents="none">{ringOnBoard("rt")}{ringOnBoard("tens")}{ringOnBoard("ones")}</g>

        {stripPiece && (() => {
          const y = rpRowY(L.pt, lastFull), isStack = rows[lastFull].t === "stack", mv = moving === "strip";
          const px = mv ? clamp(drag.drag.x - 290, 0, 1086 - 580) : sx, py = mv ? clamp(drag.drag.y - 13, 0, 528 - 26) : y;
          return (
            <g key="strip-piece" {...control("strip", tx("fold a strip into a rupee"))} {...drag.bind("strip")} {...drag.keys("strip")}>
              <rect x={L.pt.x} y={L.pt.y} width={L.pt.w} height={L.pt.h} fill="transparent" />
              {(!isStack || mv) && <g filter={mv ? "url(#fLift)" : undefined}>{rpStrip(C, px, py, 100, "sp")}</g>}
            </g>
          );
        })()}
        {waiting && (
          <text pointerEvents="none" x={(kind === "fold" ? L.pt : L.rt).x + (kind === "fold" ? L.pt : L.rt).w / 2} y={(kind === "fold" ? L.pt : L.rt).y + (kind === "fold" ? L.pt : L.rt).h - 16}
            textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={RPI.quiet}>{tx("waiting for your answer")}</text>
        )}
        {pieceOpen && (() => {
          const p = rpCoinAt(L.rt, b.coins - 1), mv = moving === "coin";
          const cx = mv ? clamp(drag.drag.x, 20, 1066) : p.x, cy = mv ? clamp(drag.drag.y, 20, 508) : p.y;
          return (
            <g key="coin-piece" {...control("coin", tx("break a rupee into paise"))} {...drag.bind("coin")} {...drag.keys("coin")}>
              <rect x={L.rt.x} y={L.rt.y} width={L.rt.w} height={L.rt.h} fill="transparent" />
              {rpCoin(C, cx, cy, "cp", { lift: mv })}
            </g>
          );
        })()}

        {L.meter && rpMeter(C, L.meter, shownP, rpMeterMax(it), { covered: !!b.flap, marker: d.marker, rolled: flapLive }, tx)}
        {L.meter && flapLive && <RpToggle id="flap" x={L.meter.x} y={L.meter.y - 6} w={L.meter.w} h={L.meter.h + 6} on={!!b.flap} onPress={toggleFlap} label={tx("the flap over the meter")} />}
        {invite && <Invite x={invite.x} y={invite.y} r={invite.r || 30} C={C} />}
      </g>
    );
  };

  /* ── phase 3's last question: a sum of smaller amounts above three tags ── */
  const drawMatch = () => {
    const tags = it.choices.map((c: any, k: number) => ({ c, x: k * 378 }));
    return (
      <g>
        <rect x={0} y={8} width={1086} height={160} rx={20} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
        {rpNote(C, 24, 32, it.notes[0], "n0")}
        <text x={172} y={82} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>+</text>
        {rpNote(C, 190, 32, it.notes[1], "n1")}
        <text x={338} y={82} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>+</text>
        {rpCoin(C, 391, 70, "n2", { label: String(it.notes[2]) })}
        <text x={444} y={82} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>+</text>
        {rpStrip(C, 470, 57, it.ps, "ms")}
        {d.sumR && <text x={207} y={152} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={RPI.blue}>{RS + it.notes.reduce((a: number, x: number) => a + x, 0)}</text>}
        {d.sumP && <text x={760} y={152} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={RPI.green}>{it.ps + " " + tx("paise")}</text>}
        {tags.map(({ c, x }: any) => (/p$/.test(c.id)
          ? (
            <g key={c.id}>
              <rect x={x} y={250} width={330} height={75} rx={14} fill="#FFFFFF" stroke={C.ink} strokeWidth={2.5} />
              <circle cx={x + 18} cy={287} r={6} fill={C.paper} stroke={C.ink} strokeWidth={2} />
              <text x={x + 196} y={307} textAnchor="end" fontSize={T.xl} fontWeight={700} fill={RPI.green}>{indian(rpNumOf(c.label.split(" ")[0]))}</text>
              <text x={x + 208} y={307} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("paise")}</text>
            </g>
          )
          : rpTag(C, x, 250, rpTagParts(c.id), 0.75, c.id)))}
        {d.join && (() => {
          const k = it.choices.findIndex((c: any) => c.id === d.join), cx = k * 378 + 165;
          return (
            <g pointerEvents="none">
              <line x1={cx} y1={168} x2={cx} y2={246} stroke={C.ink} strokeWidth={3} />
              <circle cx={cx} cy={168} r={6} fill={C.ink} />
              <rect x={k * 378 - 6} y={244} width={342} height={87} rx={18} fill="none" stroke={C.accent} strokeWidth={5} />
            </g>
          );
        })()}
      </g>
    );
  };

  /* ── phase 4: two tags, the sign slot between them, the same-unit switch under them ── */
  const drawCompare = () => {
    const LT = { x: 40, y: 90, w: 400, h: 150 }, SS = { x: 480, y: 90, w: 126, h: 150 }, RT = { x: 646, y: 90, w: 400, h: 150 };
    const SWB = { x: 343, y: 300, w: 400, h: 84 };
    const sw = !!b.sw;
    const lp = rpSidePaise(it.left), rp = rpSidePaise(it.right);
    const ringAt = d.rings && sw ? rpFirstDiff(lp, rp) : -1;
    /* a tag in rupees, coloured as every amount is (rupees blue, the dot vermilion, paise green); as the
       caption over a tag the switch rewrote, a sum also shows what it adds up to */
    const rupeeText = (sd: any, size: number, cx: number, y: number, caption?: boolean) => (
      <g data-role="reading">
        <text x={cx} y={y} textAnchor="middle" fontSize={size} fontWeight={700} fill={C.ink}>
          {sd.rs.reduce((acc: any[], r: number, k: number) => acc.concat(
            k > 0 ? [<tspan key={"p" + k} fill={C.ink}>{" + "}</tspan>] : [],
            [<tspan key={"s" + k} fill={C.ink}>{RS}</tspan>, <tspan key={"v" + k} fill={RPI.blue}>{String(r)}</tspan>]), [])}
          {sd.ps ? <tspan fill={CONTENT.pointer}>.</tspan> : null}
          {sd.ps ? <tspan fill={RPI.green}>{String(sd.ps).padStart(2, "0")}</tspan> : null}
          {caption && sd.rs.length > 1 ? <tspan fill={C.ink}>{" = " + RS}</tspan> : null}
          {caption && sd.rs.length > 1 ? <tspan fill={RPI.blue}>{String(sd.rs.reduce((a: number, x: number) => a + x, 0))}</tspan> : null}
        </text>
      </g>
    );
    const side = (box: any, sd: any) => {
      const cx = box.x + box.w / 2 + 10;
      const inPaise = sd.p !== undefined || sw;
      return (
        <g>
          <rect x={box.x} y={box.y} width={box.w} height={box.h} rx={20} fill="#FFFFFF" stroke={C.ink} strokeWidth={2.5} />
          <circle cx={box.x + 22} cy={box.y + box.h / 2} r={8} fill={C.paper} stroke={C.ink} strokeWidth={2} />
          {inPaise && sd.p === undefined && (
            rupeeText(sd, T.micro, cx, box.y + 42, true)
          )}
          {inPaise ? rpDigitsRow(C, cx, box.y + 108, rpSidePaise(sd), ringAt, tx) : rupeeText(sd, sd.rs.length > 1 ? T.speech : T.xl, cx, box.y + 108)}
        </g>
      );
    };
    const shown = d.sign && sw ? d.sign : null;
    return (
      <g>
        {side(LT, it.left)}
        {side(RT, it.right)}
        {sw ? (
          <rect x={SS.x} y={SS.y} width={SS.w} height={SS.h} rx={16} fill="#FFFFFF" stroke={C.ink} strokeWidth={2.5} strokeDasharray="10 8" />
        ) : (
          /* shut: a hollow box under a closed lid, no glyph in it (a bar would read as a minus sign) */
          <g>
            <rect x={SS.x} y={SS.y + 18} width={SS.w} height={SS.h - 18} rx={14} fill={tint(C.panel, 0.5)} stroke={C.ink} strokeWidth={2.5} />
            <rect x={SS.x - 8} y={SS.y} width={SS.w + 16} height={26} rx={10} fill={C.panel} stroke={C.ink} strokeWidth={2.5} />
          </g>
        )}
        {shown && <text x={SS.x + SS.w / 2} y={SS.y + SS.h / 2 + 26} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>{shown}</text>}
        {d.big && (
          <rect pointerEvents="none" x={(lp >= rp ? LT : RT).x - 8} y={LT.y - 8} width={LT.w + 16} height={LT.h + 16} rx={26} fill="none" stroke={C.accent} strokeWidth={5} />
        )}
        <g>
          <rect x={SWB.x + 20} y={SWB.y + 16} width={112} height={52} rx={26} fill={sw ? tint(C.accent, 0.35) : "#FFFFFF"} stroke={C.ink} strokeWidth={2.5} />
          <circle cx={sw ? SWB.x + 106 : SWB.x + 46} cy={SWB.y + 42} r={20} fill="url(#gKey)" stroke={C.ink} strokeWidth={2.5} />
          <text x={SWB.x + 152} y={SWB.y + 53} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("both in paise")}</text>
          <RpToggle id="same-unit" x={SWB.x} y={SWB.y} w={SWB.w} h={SWB.h} on={sw} onPress={flip} label={tx("write both tags in paise")} enabled={live} />
        </g>
        {idleAsk && !sw && <Invite x={SWB.x + 46} y={SWB.y + 42} r={32} C={C} />}
      </g>
    );
  };

  const runsOn = !free && (kind === "open" || kind === "fold" || kind === "alone");
  const boardKinds = ["open", "fold", "read", "write", "alone", "free"];
  return (
    <g>
      <defs>
        <linearGradient id="rpSteel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F4F6F8" />
          <stop offset="1" stopColor="#C2CAD1" />
        </linearGradient>
        <pattern id="rpTick" x="0" y="0" width={5.8} height={30} patternUnits="userSpaceOnUse">
          <line x1={0} y1={0} x2={0} y2={30} stroke="#9AA0A6" strokeWidth={0.8} />
        </pattern>
      </defs>
      {runsOn && (
        <g data-zone="runs">
          <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          <text x={22} y={-46} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(kind === "fold" ? "folded" : "opened")}</text>
          <text x={308} y={-40} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={C.ink}>{kind === "fold" ? String(b.acts || 0) : (b.acts || 0) + " / " + startCoins}</text>
        </g>
      )}
      {boardKinds.includes(kind) && drawBoard()}
      {kind === "match" && drawMatch()}
      {(kind === "compare" || kind === "more") && drawCompare()}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ n, result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last) return null;
  const ph: any = PHASES[(n || 1) - 1];
  const it: any = ph && ph.items[last.item];
  if (!it) return null;
  const sign = (a: number, z: number) => (a > z ? ">" : a < z ? "<" : "=");
  const RS = lang === "en" ? "Rs " : "₹"; /* drawn money, as in Work */
  const lines: string[] =
    it.kind === "open" ? [RS + it.rupees, indian(it.answer) + " " + tx("paise")]
    : it.kind === "fold" ? [it.paise + " " + tx("paise"), RS + it.answer]
    : it.kind === "read" || it.kind === "alone" ? [RS + it.tag].concat(it.kind === "alone" ? [indian(it.answer) + " " + tx("paise")] : [])
    : it.kind === "write" || it.kind === "match" ? [RS + it.answer]
    : [indian(rpSidePaise(it.left)) + " " + sign(rpSidePaise(it.left), rpSidePaise(it.right)) + " " + indian(rpSidePaise(it.right)), tx("paise")];
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {lines.map((s, k) => (
        <text key={k} x={w / 2} y={lines.length === 1 ? h / 2 + 11 : h / 2 - 6 + k * 34} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{s}</text>
      ))}
    </g>
  );
}

function RupeePaiseBoard(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, pointKey: true, fitHost: () => null }} />
  );
}

export default RupeePaiseBoard;
