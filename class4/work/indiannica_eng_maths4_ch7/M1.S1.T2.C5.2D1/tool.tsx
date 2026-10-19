/* ═══ M1.S1.T2.C5.2D1 · cut_and_name · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, the sound effects, the printed bubble, scoring, the
   events, idle and restart. THE LESSON IS SILENT (runtime r30): nothing is spoken; every line is
   printed on the bubble, which is the guide (it instructs; after a wrong act or answer the hint shows UNDER the
   pinned instruction and stays until the child acts again; r34). The lesson is action-driven: nothing moves
   on unless the child acts (a tap, a key, an answer); after a right answer the next question follows its
   short celebration by itself. The header's Hint key (r35) shows the hint on demand.
   THE NEW LOOK (the owner, 2026-10-16; docs/LAYOUT.md §1d-§1e, docs/PATTERNS.md §15-§16): no question bar (only the blinking key at the top
   right), four small clickable phase dots, a big ONE-sentence bubble, digits as written, every act performed on screen (api.act). The question
   lives ONLY in the bubble: each item's `say` is the whole question in one sentence.
   NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md and docs/PATTERNS.md.
   Every English line the tool prints, in its data or drawn by Work (tx("...")), has a Hindi and a
   Gujarati entry in TR once the English is final (check's tr-coverage row lists what is missing).
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "cut_and_name";
const MEDIA_ID = "M1.S1.T2.C5.2D1";
const TOOL_NAME = "Cut and Name";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["One whole thing on the mat. Cut it into equal parts before you colour anything."];
/* the whole-tool line: printed on the summary page */
const FINISH_LINE = "Every whole cut, every part named, and the pieces nobody took still lying on the mat.";
/* printed when the child opens Free play; it names only what the free branch of Work offers */
const FREE_LINE = "Free play. Cut a whole into parts and tap parts to colour them.";

/* THE START PAGE (runtime r28; docs/LAYOUT.md §1c): START_HOOK is ONE printed question to wonder at; StartArt is the object the
   lesson is about, drawn in a 1200 x 340 box: a round whole and a bar, both cut into equal parts with some coloured. */
const START_HOOK = "How do we name one part of a whole?";
function StartArt({ box, C, lang, tx }: any) {
  const disc = { kind: "disc", cx: 300, cy: 170, r: 140, from: 0, sweep: 360 };
  const bar = { kind: "bar", x: 640, y: 110, w: 520, h: 120 };
  return (
    <g>
      {cnWhole({ id: "sa-disc", G: disc, b: cnEven(8), taken: (i: number) => i < 3, C })}
      {cnWhole({ id: "sa-bar", G: bar, b: cnEven(5), taken: (i: number) => i < 2, C })}
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, byte for byte. Fill it AFTER the English is final and reviewed. */
const TR: any = {
  hi: {
    "Cut and Name": "काटो और नाम दो",
    "How do we name one part of a whole?": "पूर्ण के एक भाग को हम क्या नाम देते हैं?",
    "Free play. Cut a whole into parts and tap parts to colour them.": "मुक्त खेल। पूर्ण को भागों में काटो और भागों पर टैप करके रंगो।",
    "What the two numbers count": "दोनों संख्याएँ क्या गिनती हैं",
    "Tap Cut to cut the bar into equal parts.": "पट्टी को बराबर भागों में काटने के लिए काटो पर टैप करो।",
    "Tap the Cut key under the bar.": "पट्टी के नीचे काटो कुंजी पर टैप करो।",
    "Now tap one part of the bar to colour it.": "अब पट्टी के एक भाग पर टैप करके उसे रंगो।",
    "Tap any piece of the bar.": "पट्टी के किसी भी टुकड़े पर टैप करो।",
    "Tap another part to colour it too.": "एक और भाग पर टैप करके उसे भी रंगो।",
    "Tap a part that has no colour yet.": "ऐसे भाग पर टैप करो जिसमें अभी रंग नहीं है।",
    "Tap the upper number of the card to name it.": "कार्ड की ऊपर की संख्या पर टैप करके उसका नाम जानो।",
    "Tap the upper box of the card.": "कार्ड के ऊपर वाले खाने पर टैप करो।",
    "That is the numerator, so tap the lower number to see its name.": "यह अंश है, अब नीचे की संख्या पर टैप करके उसका नाम देखो।",
    "Tap the lower box of the card.": "कार्ड के नीचे वाले खाने पर टैप करो।",
    "How many parts are blue, and how many are there in all?": "कितने भाग नीले हैं और कुल कितने भाग हैं?",
    "All the equal parts go below the line, and the blue parts go above it.": "सभी बराबर भाग रेखा के नीचे और नीले भाग रेखा के ऊपर आते हैं।",
    "The lower number counts the equal parts and the upper counts the parts taken.": "नीचे की संख्या बराबर भाग गिनती है और ऊपर की संख्या लिए गए भाग।",
    "You learned: the denominator counts all parts, the numerator the taken.": "तुमने सीखा: हर सब भाग गिनता है, अंश लिए गए भाग।",
    "A bar of seven equal pieces has four blue, so what fraction is blue?": "सात बराबर टुकड़ों की पट्टी में चार नीले हैं, तो नीला भिन्न क्या है?",
    "What fraction is blue?": "कौन-सा भिन्न नीला है?",
    "Count every piece of the bar, not only the blue ones.": "पट्टी का हर टुकड़ा गिनो, सिर्फ़ नीले नहीं।",
    "Yes, the lower number counts all seven pieces.": "हाँ, नीचे की संख्या सातों टुकड़े गिनती है।",
    "A bar has nine equal pieces and five are blue, so what fraction is blue?": "पट्टी में नौ बराबर टुकड़े हैं और पाँच नीले हैं, तो नीला भिन्न क्या है?",
    "Does the lower number count all the pieces, or only the blue ones?": "क्या नीचे की संख्या सभी टुकड़े गिनती है या सिर्फ़ नीले?",
    "Yes, the upper number counts the blue pieces.": "हाँ, ऊपर की संख्या नीले टुकड़े गिनती है।",
    "Which number in this fraction counts the parts that were taken?": "इस भिन्न में कौन-सी संख्या लिए गए भाग गिनती है?",
    "Which number counts taken?": "कौन-सी संख्या लिए भाग गिनती है?",
    "Which of the two numbers counts all the beads in the row?": "दोनों में से कौन-सी संख्या पंक्ति के सभी मनके गिनती है?",
    "Yes, the upper number counts the parts taken.": "हाँ, ऊपर की संख्या लिए गए भाग गिनती है।",
    "7, upper number": "7, ऊपर की संख्या",
    "That is the denominator: it counts all the equal parts.": "यह हर है: यह सभी बराबर भाग गिनता है।",
    "7, upper": "7, ऊपर",
    "12, lower": "12, नीचे",
    "12, lower number": "12, नीचे की संख्या",
    "Equal parts, or no fraction at all": "बराबर भाग, वरना कोई भिन्न नहीं",
    "Tap Cut to cut the chocolate bar in two.": "चॉकलेट की पट्टी को दो भागों में काटने के लिए काटो पर टैप करो।",
    "Now tap Measure and compare the two pieces.": "अब नापो पर टैप करके दोनों टुकड़ों की तुलना करो।",
    "Tap the Measure key under the bar.": "पट्टी के नीचे नापो कुंजी पर टैप करो।",
    "What does a fraction name promise about the size of the pieces?": "भिन्न का नाम टुकड़ों के आकार के बारे में क्या वादा करता है?",
    "A quarter names one of four pieces that are all the same size.": "चौथाई चार टुकड़ों में से एक का नाम है, जो सब एक ही आकार के हैं।",
    "Unequal pieces have no fraction name because equal parts are the meaning.": "असमान टुकड़ों का भिन्न नाम नहीं होता, क्योंकि बराबर भाग ही अर्थ हैं।",
    "You learned: pieces that are not equal have no fraction name.": "तुमने सीखा: बराबर न हों तो भिन्न नाम नहीं।",
    "This chocolate bar has four pieces, so can a small piece be called a quarter?": "इस चॉकलेट पट्टी में चार टुकड़े हैं, तो क्या छोटे टुकड़े को चौथाई कह सकते हैं?",
    "Small piece a quarter?": "छोटा टुकड़ा चौथाई है?",
    "How many small pieces would the long piece cover?": "लंबा टुकड़ा कितने छोटे टुकड़ों को ढकेगा?",
    "Right, quarters must all be the same size.": "सही, चौथाई सब एक ही आकार की होनी चाहिए।",
    "This cake is cut into six slices, so is one slice a sixth?": "इस केक के छह टुकड़े हैं, तो क्या एक टुकड़ा छठा भाग है?",
    "Is one piece a sixth?": "क्या एक टुकड़ा छठा भाग है?",
    "Are the six slices all the same size?": "क्या छहों टुकड़े एक ही आकार के हैं?",
    "Right, unequal slices are not sixths.": "सही, असमान टुकड़े छठे भाग नहीं होते।",
    "Two bars are cut into four pieces each, so which one shows quarters?": "दो पट्टियाँ चार-चार टुकड़ों में कटी हैं, तो किसमें चौथाई हैं?",
    "Which bar has quarters?": "किस पट्टी में चौथाई हैं?",
    "On which bar do all four pieces match?": "किस पट्टी में चारों टुकड़े मिलते हैं?",
    "Right, only bar B has four equal pieces.": "सही, सिर्फ़ पट्टी B के चारों टुकड़े बराबर हैं।",
    "Yes": "हाँ",
    "No": "नहीं",
    "both": "दोनों",
    "neither": "कोई नहीं",
    "A": "A",
    "B": "B",
    "No: pieces not equal": "नहीं: टुकड़े बराबर नहीं",
    "B: all four match": "B: चारों मिलते हैं",
    "The five kinds, sorted by their two numbers": "पाँच प्रकार, दो संख्याओं से छाँटे गए",
    "Drag the card into a tray that suits it.": "कार्ड को उस ट्रे में खींचो जिसमें वह आता है।",
    "Drag the card onto one of the trays.": "कार्ड को किसी ट्रे पर खींचो।",
    "Drag the same card into a second tray.": "उसी कार्ड को दूसरी ट्रे में खींचो।",
    "Try a different tray for the card.": "कार्ड के लिए कोई और ट्रे आज़माओ।",
    "Is the upper number smaller than the lower one, or is it not?": "क्या ऊपर की संख्या नीचे की संख्या से छोटी है, या नहीं?",
    "What do you do with a card whose two numbers are the same?": "जिस कार्ड की दोनों संख्याएँ एक-सी हों, उसका क्या करोगे?",
    "Which cards have the same lower number as another card?": "किन कार्डों की नीचे की संख्या दूसरे कार्ड जैसी है?",
    "Cards with the same lower number belong together in one tray.": "नीचे की संख्या एक-सी हो तो कार्ड एक ही ट्रे में साथ आते हैं।",
    "Does the odd card out share its lower number with another card?": "क्या अकेले कार्ड की नीचे की संख्या किसी और कार्ड से मिलती है?",
    "A card with an upper number of 1 is a unit fraction.": "ऊपर की संख्या 1 वाला कार्ड इकाई भिन्न होता है।",
    "One fraction can belong to several kinds because each kind is its own test.": "एक भिन्न कई प्रकारों में आ सकता है, क्योंकि हर प्रकार की अपनी जाँच है।",
    "You learned: one fraction can pass several of the five tests at once.": "तुमने सीखा: एक भिन्न एक साथ कई जाँचों में पास हो सकता है।",
    "Sort these four cards into every tray that each one belongs in.": "इन चार कार्डों को हर उस ट्रे में रखो जिसमें वह आता है।",
    "Sort the cards": "कार्ड छाँटो",
    "Which trays does the card with equal numbers earn?": "जिस कार्ड की दोनों संख्याएँ बराबर हैं, वह किन ट्रे में जाएगा?",
    "Yes, one card can sit in several trays.": "हाँ, एक कार्ड कई ट्रे में रह सकता है।",
    "Drag each improper fraction into the tray.": "हर विषम भिन्न को ट्रे में खींचो।",
    "Which are improper?": "कौन-से विषम हैं?",
    "Which cards have an upper number that is not smaller than the lower?": "किन कार्डों की ऊपर की संख्या नीचे की संख्या से छोटी नहीं है?",
    "Yes, the upper number is not smaller.": "हाँ, ऊपर की संख्या छोटी नहीं है।",
    "Sort the cards into like, unlike and unit.": "कार्डों को समान, असमान और इकाई में छाँटो।",
    "Like, unlike, unit": "समान, असमान, इकाई",
    "Which two cards have the same lower number?": "किन दो कार्डों की नीचे की संख्या एक-सी है?",
    "Yes, like cards share a lower number.": "हाँ, समान कार्डों की नीचे की संख्या एक-सी होती है।",
    "proper": "उचित",
    "improper": "विषम",
    "like": "समान",
    "unlike": "असमान",
    "unit": "इकाई",
    "upper smaller": "ऊपर छोटी",
    "upper not smaller": "ऊपर छोटी नहीं",
    "same lower": "नीचे एक-सी",
    "lower not shared": "नीचे अकेली",
    "upper is 1": "ऊपर 1 है",
    "Halves and quarters in one field": "एक ही खेत में आधे और चौथाई",
    "Tap one half to choose it.": "एक आधे भाग पर टैप करके उसे चुनो।",
    "Tap one of the two halves.": "दोनों आधे भागों में से किसी एक पर टैप करो।",
    "Now tap Cut again to cut that half in two.": "अब फिर काटो पर टैप करके उस आधे को दो भागों में काटो।",
    "Tap the Cut again key under the cake.": "केक के नीचे फिर काटो कुंजी पर टैप करो।",
    "How many of them cover the piece that was never cut?": "उनमें से कितने कभी न कटे टुकड़े को ढकते हैं?",
    "The number of equal pieces that fill the whole goes below the line.": "पूर्ण को भरने वाले बराबर टुकड़ों की संख्या रेखा के नीचे आती है।",
    "Two quarters make a half, two halves make a whole and so do four quarters.": "दो चौथाई से आधा, दो आधे से पूर्ण और चार चौथाई से भी पूर्ण बनता है।",
    "You learned: two quarters make a half and four quarters make a whole.": "तुमने सीखा: दो चौथाई से आधा, चार चौथाई से पूर्ण बनता है।",
    "One half of this cake is cut again, so what is each small piece?": "इस केक का एक आधा फिर काटा गया, तो हर छोटा टुकड़ा क्या है?",
    "What is each small piece?": "हर छोटा टुकड़ा क्या है?",
    "How many pieces of this size would fill the whole cake?": "इस आकार के कितने टुकड़े पूरे केक को भरेंगे?",
    "Yes, each small piece is a quarter.": "हाँ, हर छोटा टुकड़ा एक चौथाई है।",
    "What fraction of the field do the two small pieces make?": "दोनों छोटे टुकड़े खेत का कितना भिन्न बनाते हैं?",
    "Two quarters together?": "दो चौथाई मिलकर?",
    "How do the two small pieces together compare with the big piece?": "दोनों छोटे टुकड़े मिलकर बड़े टुकड़े से कैसे तुलना करते हैं?",
    "Yes, two quarters make a half.": "हाँ, दो चौथाई से आधा बनता है।",
    "How many quarters are there in three halves?": "तीन आधे में कितने चौथाई होते हैं?",
    "Quarters in three halves?": "तीन आधे में चौथाई?",
    "Cut every half in two, then count the small pieces one at a time.": "हर आधे को दो भागों में काटो, फिर छोटे टुकड़े एक-एक करके गिनो।",
    "How many quarters are in one half?": "एक आधे में कितने चौथाई होते हैं?",
    "Each half is two quarters, so count them half by half.": "हर आधे में दो चौथाई हैं, इसलिए आधे-आधे करके गिनो।",
    "Yes, three halves are six quarters.": "हाँ, तीन आधे में छह चौथाई होते हैं।",
    "Cut": "काटो",
    "Measure": "नापो",
    "Cut again": "फिर काटो",
    "Bar": "पट्टी",
    "Round": "गोल",
    "cm": "सेमी",
    "taken": "लिए गए",
    "in all": "कुल",
    "numerator": "अंश",
    "denominator": "हर",
    "6 quarters": "6 चौथाई",
    "sorted": "छाँटे गए",
  },
  gu: {
    "Cut and Name": "કાપો અને નામ આપો",
    "How do we name one part of a whole?": "આખાના એક ભાગને આપણે શું નામ આપીએ?",
    "Free play. Cut a whole into parts and tap parts to colour them.": "મુક્ત રમત. આખાને ભાગમાં કાપો અને ભાગ પર ટેપ કરીને રંગો.",
    "What the two numbers count": "બંને સંખ્યાઓ શું ગણે છે",
    "Tap Cut to cut the bar into equal parts.": "પટ્ટીને સરખા ભાગમાં કાપવા કાપો પર ટેપ કરો.",
    "Tap the Cut key under the bar.": "પટ્ટીની નીચે કાપો કી પર ટેપ કરો.",
    "Now tap one part of the bar to colour it.": "હવે પટ્ટીના એક ભાગ પર ટેપ કરીને તેને રંગો.",
    "Tap any piece of the bar.": "પટ્ટીના કોઈ પણ ટુકડા પર ટેપ કરો.",
    "Tap another part to colour it too.": "બીજા એક ભાગ પર ટેપ કરીને તેને પણ રંગો.",
    "Tap a part that has no colour yet.": "જેમાં હજી રંગ નથી તેવા ભાગ પર ટેપ કરો.",
    "Tap the upper number of the card to name it.": "કાર્ડની ઉપરની સંખ્યા પર ટેપ કરીને તેનું નામ જાણો.",
    "Tap the upper box of the card.": "કાર્ડના ઉપરના ખાનામાં ટેપ કરો.",
    "That is the numerator, so tap the lower number to see its name.": "આ અંશ છે, હવે નીચેની સંખ્યા પર ટેપ કરીને તેનું નામ જુઓ.",
    "Tap the lower box of the card.": "કાર્ડના નીચેના ખાનામાં ટેપ કરો.",
    "How many parts are blue, and how many are there in all?": "કેટલા ભાગ વાદળી છે અને કુલ કેટલા ભાગ છે?",
    "All the equal parts go below the line, and the blue parts go above it.": "બધા સરખા ભાગ રેખાની નીચે અને વાદળી ભાગ રેખાની ઉપર આવે છે.",
    "The lower number counts the equal parts and the upper counts the parts taken.": "નીચેની સંખ્યા સરખા ભાગ ગણે છે અને ઉપરની સંખ્યા લીધેલા ભાગ.",
    "You learned: the denominator counts all parts, the numerator the taken.": "તમે શીખ્યા: છેદ બધા ભાગ ગણે છે, અંશ લીધેલા ભાગ.",
    "A bar of seven equal pieces has four blue, so what fraction is blue?": "સાત સરખા ટુકડાની પટ્ટીમાં ચાર વાદળી છે, તો વાદળી અપૂર્ણાંક કયો?",
    "What fraction is blue?": "કયો અપૂર્ણાંક વાદળી છે?",
    "Count every piece of the bar, not only the blue ones.": "પટ્ટીનો દરેક ટુકડો ગણો, ફક્ત વાદળી નહીં.",
    "Yes, the lower number counts all seven pieces.": "હા, નીચેની સંખ્યા બધા સાતે ટુકડા ગણે છે.",
    "A bar has nine equal pieces and five are blue, so what fraction is blue?": "પટ્ટીમાં નવ સરખા ટુકડા છે અને પાંચ વાદળી છે, તો વાદળી અપૂર્ણાંક કયો?",
    "Does the lower number count all the pieces, or only the blue ones?": "શું નીચેની સંખ્યા બધા ટુકડા ગણે છે કે ફક્ત વાદળી?",
    "Yes, the upper number counts the blue pieces.": "હા, ઉપરની સંખ્યા વાદળી ટુકડા ગણે છે.",
    "Which number in this fraction counts the parts that were taken?": "આ અપૂર્ણાંકમાં કઈ સંખ્યા લીધેલા ભાગ ગણે છે?",
    "Which number counts taken?": "કઈ સંખ્યા લીધેલા ભાગ ગણે છે?",
    "Which of the two numbers counts all the beads in the row?": "બે સંખ્યામાંથી કઈ હરોળના બધા મણકા ગણે છે?",
    "Yes, the upper number counts the parts taken.": "હા, ઉપરની સંખ્યા લીધેલા ભાગ ગણે છે.",
    "7, upper number": "7, ઉપરની સંખ્યા",
    "That is the denominator: it counts all the equal parts.": "આ છેદ છે: તે બધા સરખા ભાગ ગણે છે.",
    "7, upper": "7, ઉપર",
    "12, lower": "12, નીચે",
    "12, lower number": "12, નીચેની સંખ્યા",
    "Equal parts, or no fraction at all": "સરખા ભાગ, નહીં તો અપૂર્ણાંક નહીં",
    "Tap Cut to cut the chocolate bar in two.": "ચોકલેટની પટ્ટીને બે ભાગમાં કાપવા કાપો પર ટેપ કરો.",
    "Now tap Measure and compare the two pieces.": "હવે માપો પર ટેપ કરીને બંને ટુકડાની સરખામણી કરો.",
    "Tap the Measure key under the bar.": "પટ્ટીની નીચે માપો કી પર ટેપ કરો.",
    "What does a fraction name promise about the size of the pieces?": "અપૂર્ણાંકનું નામ ટુકડાના માપ વિશે શું વચન આપે છે?",
    "A quarter names one of four pieces that are all the same size.": "ચોથો ભાગ ચાર ટુકડામાંથી એકનું નામ છે, જે બધા એક જ માપના છે.",
    "Unequal pieces have no fraction name because equal parts are the meaning.": "અસમાન ટુકડાનું અપૂર્ણાંક નામ નથી હોતું, કારણ કે સરખા ભાગ જ અર્થ છે.",
    "You learned: pieces that are not equal have no fraction name.": "તમે શીખ્યા: સરખા ન હોય તો અપૂર્ણાંક નામ નથી.",
    "This chocolate bar has four pieces, so can a small piece be called a quarter?": "આ ચોકલેટની પટ્ટીમાં ચાર ટુકડા છે, તો શું નાના ટુકડાને ચોથો ભાગ કહેવાય?",
    "Small piece a quarter?": "નાનો ટુકડો ચોથો ભાગ છે?",
    "How many small pieces would the long piece cover?": "લાંબો ટુકડો કેટલા નાના ટુકડાને ઢાંકશે?",
    "Right, quarters must all be the same size.": "સાચું, ચોથા ભાગ બધા એક જ માપના હોવા જોઈએ.",
    "This cake is cut into six slices, so is one slice a sixth?": "આ કેકના છ ટુકડા છે, તો શું એક ટુકડો છઠ્ઠો ભાગ છે?",
    "Is one piece a sixth?": "શું એક ટુકડો છઠ્ઠો ભાગ છે?",
    "Are the six slices all the same size?": "શું છએ ટુકડા એક જ માપના છે?",
    "Right, unequal slices are not sixths.": "સાચું, અસમાન ટુકડા છઠ્ઠા ભાગ નથી હોતા.",
    "Two bars are cut into four pieces each, so which one shows quarters?": "બે પટ્ટીઓ ચાર-ચાર ટુકડામાં કપાઈ છે, તો કઈ પટ્ટીમાં ચોથા ભાગ છે?",
    "Which bar has quarters?": "કઈ પટ્ટીમાં ચોથા ભાગ છે?",
    "On which bar do all four pieces match?": "કઈ પટ્ટીમાં ચારે ટુકડા મળે છે?",
    "Right, only bar B has four equal pieces.": "સાચું, ફક્ત પટ્ટી B ના ચારે ટુકડા સરખા છે.",
    "Yes": "હા",
    "No": "ના",
    "both": "બંને",
    "neither": "એકેય નહીં",
    "A": "A",
    "B": "B",
    "No: pieces not equal": "ના: ટુકડા સરખા નથી",
    "B: all four match": "B: ચારે મળે છે",
    "The five kinds, sorted by their two numbers": "બે સંખ્યાથી અલગ પાડેલા પાંચ પ્રકાર",
    "Drag the card into a tray that suits it.": "કાર્ડને તેને માફક આવતી ટ્રેમાં ખેંચો.",
    "Drag the card onto one of the trays.": "કાર્ડને કોઈ ટ્રે પર ખેંચો.",
    "Drag the same card into a second tray.": "એ જ કાર્ડને બીજી ટ્રેમાં ખેંચો.",
    "Try a different tray for the card.": "કાર્ડ માટે બીજી ટ્રે અજમાવો.",
    "Is the upper number smaller than the lower one, or is it not?": "શું ઉપરની સંખ્યા નીચેની સંખ્યાથી નાની છે, કે નહીં?",
    "What do you do with a card whose two numbers are the same?": "જે કાર્ડની બંને સંખ્યા સરખી હોય તેનું શું કરશો?",
    "Which cards have the same lower number as another card?": "કયા કાર્ડની નીચેની સંખ્યા બીજા કાર્ડ જેટલી છે?",
    "Cards with the same lower number belong together in one tray.": "નીચેની સંખ્યા સરખી હોય તો કાર્ડ એક જ ટ્રેમાં સાથે આવે છે.",
    "Does the odd card out share its lower number with another card?": "શું એકલા કાર્ડની નીચેની સંખ્યા બીજા કાર્ડ સાથે મળે છે?",
    "A card with an upper number of 1 is a unit fraction.": "જે કાર્ડની ઉપરની સંખ્યા 1 હોય તે એકમ અપૂર્ણાંક છે.",
    "One fraction can belong to several kinds because each kind is its own test.": "એક અપૂર્ણાંક ઘણા પ્રકારમાં આવી શકે, કારણ કે દરેક પ્રકારની પોતાની ચકાસણી છે.",
    "You learned: one fraction can pass several of the five tests at once.": "તમે શીખ્યા: એક અપૂર્ણાંક એક સાથે ઘણી ચકાસણી પાસ કરી શકે.",
    "Sort these four cards into every tray that each one belongs in.": "આ ચાર કાર્ડને તે જે દરેક ટ્રેમાં આવે તેમાં મૂકો.",
    "Sort the cards": "કાર્ડ અલગ પાડો",
    "Which trays does the card with equal numbers earn?": "જે કાર્ડની બંને સંખ્યા સરખી છે તે કઈ ટ્રેમાં જશે?",
    "Yes, one card can sit in several trays.": "હા, એક કાર્ડ ઘણી ટ્રેમાં રહી શકે.",
    "Drag each improper fraction into the tray.": "દરેક અયોગ્ય અપૂર્ણાંકને ટ્રેમાં ખેંચો.",
    "Which are improper?": "કયા અયોગ્ય છે?",
    "Which cards have an upper number that is not smaller than the lower?": "કયા કાર્ડની ઉપરની સંખ્યા નીચેની કરતાં નાની નથી?",
    "Yes, the upper number is not smaller.": "હા, ઉપરની સંખ્યા નાની નથી.",
    "Sort the cards into like, unlike and unit.": "કાર્ડને સમાન, અસમાન અને એકમમાં અલગ પાડો.",
    "Like, unlike, unit": "સમાન, અસમાન, એકમ",
    "Which two cards have the same lower number?": "કયા બે કાર્ડની નીચેની સંખ્યા સરખી છે?",
    "Yes, like cards share a lower number.": "હા, સમાન કાર્ડની નીચેની સંખ્યા સરખી હોય છે.",
    "proper": "યોગ્ય",
    "improper": "અયોગ્ય",
    "like": "સમાન",
    "unlike": "અસમાન",
    "unit": "એકમ",
    "upper smaller": "ઉપર નાની",
    "upper not smaller": "ઉપર નાની નથી",
    "same lower": "નીચે સરખી",
    "lower not shared": "નીચે એકલી",
    "upper is 1": "ઉપર 1 છે",
    "Halves and quarters in one field": "એક ખેતરમાં અડધા અને ચોથા ભાગ",
    "Tap one half to choose it.": "એક અડધા ભાગ પર ટેપ કરીને તેને પસંદ કરો.",
    "Tap one of the two halves.": "બંને અડધા ભાગમાંથી કોઈ એક પર ટેપ કરો.",
    "Now tap Cut again to cut that half in two.": "હવે ફરી કાપો પર ટેપ કરીને તે અડધાને બે ભાગમાં કાપો.",
    "Tap the Cut again key under the cake.": "કેકની નીચે ફરી કાપો કી પર ટેપ કરો.",
    "How many of them cover the piece that was never cut?": "તેમાંથી કેટલા ક્યારેય ન કપાયેલા ટુકડાને ઢાંકે છે?",
    "The number of equal pieces that fill the whole goes below the line.": "આખાને ભરનારા સરખા ટુકડાની સંખ્યા રેખાની નીચે આવે છે.",
    "Two quarters make a half, two halves make a whole and so do four quarters.": "બે ચોથા ભાગથી અડધું, બે અડધાથી આખું અને ચાર ચોથા ભાગથી પણ આખું બને છે.",
    "You learned: two quarters make a half and four quarters make a whole.": "તમે શીખ્યા: બે ચોથા ભાગથી અડધું, ચારથી આખું બને.",
    "One half of this cake is cut again, so what is each small piece?": "આ કેકનો એક અડધો ભાગ ફરી કપાયો, તો દરેક નાનો ટુકડો શું છે?",
    "What is each small piece?": "દરેક નાનો ટુકડો શું છે?",
    "How many pieces of this size would fill the whole cake?": "આ માપના કેટલા ટુકડા આખી કેકને ભરશે?",
    "Yes, each small piece is a quarter.": "હા, દરેક નાનો ટુકડો ચોથો ભાગ છે.",
    "What fraction of the field do the two small pieces make?": "બંને નાના ટુકડા ખેતરનો કયો અપૂર્ણાંક બનાવે છે?",
    "Two quarters together?": "બે ચોથા ભાગ મળીને?",
    "How do the two small pieces together compare with the big piece?": "બંને નાના ટુકડા મળીને મોટા ટુકડા સાથે કેવી રીતે સરખાય છે?",
    "Yes, two quarters make a half.": "હા, બે ચોથા ભાગથી અડધું બને છે.",
    "How many quarters are there in three halves?": "ત્રણ અડધામાં કેટલા ચોથા ભાગ હોય?",
    "Quarters in three halves?": "ત્રણ અડધામાં ચોથા ભાગ?",
    "Cut every half in two, then count the small pieces one at a time.": "દરેક અડધાને બે ભાગમાં કાપો, પછી નાના ટુકડા એક એક કરીને ગણો.",
    "How many quarters are in one half?": "એક અડધામાં કેટલા ચોથા ભાગ હોય?",
    "Each half is two quarters, so count them half by half.": "દરેક અડધામાં બે ચોથા ભાગ છે, એટલે અડધા અડધા કરીને ગણો.",
    "Yes, three halves are six quarters.": "હા, ત્રણ અડધામાં છ ચોથા ભાગ હોય.",
    "Cut": "કાપો",
    "Measure": "માપો",
    "Cut again": "ફરી કાપો",
    "Bar": "પટ્ટી",
    "Round": "ગોળ",
    "cm": "સેમી",
    "taken": "લીધેલા",
    "in all": "કુલ",
    "numerator": "અંશ",
    "denominator": "છેદ",
    "6 quarters": "6 ચોથા ભાગ",
    "sorted": "અલગ પાડ્યા",
  },
};

/* the word keys a question offers; the tidy name each key leaves on the board */
const CN_YESNO = [{ id: "yes", label: "Yes" }, { id: "no", label: "No" }];
const CN_WHICH = [{ id: "top7", label: "7, upper" }, { id: "bottom12", label: "12, lower" }];
const CN_SHEET = [{ id: "A", label: "A" }, { id: "B", label: "B" }, { id: "both", label: "both" }, { id: "neither", label: "neither" }];
const CN_SAID: Record<string, string> = { top7: "7, upper number", bottom12: "12, lower number", yes: "Yes", no: "No", A: "A", B: "B", both: "both", neither: "neither" };
/* what each tray tests, printed over the tray when a card is refused and while the correction runs */
const CN_TEST: Record<string, string> = { proper: "upper smaller", improper: "upper not smaller", like: "same lower", unlike: "lower not shared", unit: "upper is 1" };
/* what the correction writes under the pieces of phase 2 once it has measured them */
const CN_CHIP: Record<string, string> = { no: "No: pieces not equal", B: "B: all four match" };

/* One entry per phase = one mount.
   steps   GUIDE STEPS: ONE click per step, a hint each, Work reports every act with api.did(name). The steps are a WARM-UP on a
           whole that none of the questions uses; the questions open on a fresh board.
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one sentence; the bubble shows it in place of the last win line
   learned the summary page's row: "You learned: ..." (at most 72 characters)
   items   three a phase; qid is the plan's question id; kind picks the picture in Work, judge and oracle */
const PHASES = [
  {
    n: 1,
    concept: "What the two numbers count",
    conceptId: "M1.S1.T2.C5", objectiveIds: ["O1"],
    says: ["Cut the bar first and then colour. Which number says how it was cut?"],
    steps: [
      { say: "Tap Cut to cut the bar into equal parts.", on: "cut", hint: "Tap the Cut key under the bar." },
      { say: "Now tap one part of the bar to colour it.", on: "shade", hint: "Tap any piece of the bar." },
      { say: "Tap another part to colour it too.", on: "shade", hint: "Tap a part that has no colour yet." },
      { say: "Tap the upper number of the card to name it.", on: "upper", hint: "Tap the upper box of the card." },
      { say: "That is the numerator, so tap the lower number to see its name.", on: "lower", hint: "Tap the lower box of the card." },
    ],
    stepHold: 3000,   /* the card keeps both names on show long enough to read before question 1 opens */
    ladder: ["How many parts are blue, and how many are there in all?", "All the equal parts go below the line, and the blue parts go above it."],
    closing: "The lower number counts the equal parts and the upper counts the parts taken.",
    learned: "You learned: the denominator counts all parts, the numerator the taken.",
    traceback: "A second bar is cut the same way beneath, every part is counted for the lower number, then the taken parts for the upper, ending on the whole fraction.",
    items: [
      /* learn ML1: answer in the plan = 4/7, where the seven counts the equal pieces and the four counts the pieces tied together */
      { qid: "M1.S1.T2.C5:ML1", kind: "bar", thing: "bar", n: 7, take: 4, parts: SLOT_FRACTION, answer: [4, 7], near: "7|4",
        say: "A bar of seven equal pieces has four blue, so what fraction is blue?",
        ask: "What fraction is blue?", miss: "Count every piece of the bar, not only the blue ones.",
        win: "Yes, the lower number counts all seven pieces." },
      /* practice 1: answer in the plan = 5/9, and the nine counts the equal bands the wall was divided into */
      { qid: "M1.S1.T2.C5:1", kind: "bar", thing: "bar", n: 9, take: 5, parts: SLOT_FRACTION, answer: [5, 9], near: "5|4",
        say: "A bar has nine equal pieces and five are blue, so what fraction is blue?",
        ask: "What fraction is blue?", miss: "Does the lower number count all the pieces, or only the blue ones?",
        win: "Yes, the upper number counts the blue pieces." },
      /* practice 2: answer in the plan = The seven, and it is written above the line */
      { qid: "M1.S1.T2.C5:2", kind: "which", frac: [7, 12], choices: CN_WHICH, answer: "top7", near: "bottom12",
        say: "Which number in this fraction counts the parts that were taken?",
        ask: "Which number counts taken?", miss: "Which of the two numbers counts all the beads in the row?",
        win: "Yes, the upper number counts the parts taken." },
    ],
  },
  {
    n: 2,
    concept: "Equal parts, or no fraction at all",
    conceptId: "M1.S1.T2.C6", objectiveIds: ["O1"],
    says: ["Cut the strip off centre. Now try to call one of the pieces a half."],
    steps: [
      { say: "Tap Cut to cut the chocolate bar in two.", on: "cut", hint: "Tap the Cut key under the bar." },
      { say: "Now tap Measure and compare the two pieces.", on: "measure", hint: "Tap the Measure key under the bar." },
    ],
    ladder: ["What does a fraction name promise about the size of the pieces?", "A quarter names one of four pieces that are all the same size."],
    closing: "Unequal pieces have no fraction name because equal parts are the meaning.",
    learned: "You learned: pieces that are not equal have no fraction name.",
    traceback: "The pieces are measured, the shortest and the longest are ringed, and the answer is written under them.",
    items: [
      /* learn ML2: answer in the plan = No, because a quarter has to be one of four pieces that are all the same size */
      { qid: "M1.S1.T2.C6:ML2", kind: "equal", way: "strip", thing: "chocolate bar", units: [2, 4, 2, 2], choices: CN_YESNO, answer: "no", near: "yes",
        say: "This chocolate bar has four pieces, so can a small piece be called a quarter?",
        ask: "Small piece a quarter?", miss: "How many small pieces would the long piece cover?",
        win: "Right, quarters must all be the same size." },
      /* practice 3: answer in the plan = No, because sixths have to be six pieces that are all the same size */
      { qid: "M1.S1.T2.C6:3", kind: "equal", way: "cake", thing: "cake", units: [5, 9, 6, 11, 7, 10], choices: CN_YESNO, answer: "no", near: "yes",
        say: "This cake is cut into six slices, so is one slice a sixth?",
        ask: "Is one piece a sixth?", miss: "Are the six slices all the same size?",
        win: "Right, unequal slices are not sixths." },
      /* practice 4: answer in the plan = Only the one with four equal pieces, because the other sheet has no piece that is one of four equal parts */
      { qid: "M1.S1.T2.C6:4", kind: "equal", way: "sheets", thing: "bar", sheets: [{ id: "A", units: [6, 3, 5, 2] }, { id: "B", units: [4, 4, 4, 4] }], choices: CN_SHEET, answer: "B", near: "both",
        say: "Two bars are cut into four pieces each, so which one shows quarters?",
        ask: "Which bar has quarters?", miss: "On which bar do all four pieces match?",
        win: "Right, only bar B has four equal pieces." },
    ],
  },
  {
    n: 3,
    concept: "The five kinds, sorted by their two numbers",
    conceptId: "M1.S1.T2.C7", objectiveIds: ["O2"],
    says: ["Look at the upper number and the lower one. Which trays does this card belong in?"],
    steps: [
      { say: "Drag the card into a tray that suits it.", on: "drop", hint: "Drag the card onto one of the trays." },
      { say: "Drag the same card into a second tray.", on: "drop", hint: "Try a different tray for the card." },
    ],
    ladder: ["Is the upper number smaller than the lower one, or is it not?", "What do you do with a card whose two numbers are the same?"],
    closing: "One fraction can belong to several kinds because each kind is its own test.",
    learned: "You learned: one fraction can pass several of the five tests at once.",
    traceback: "Each card is lifted in turn, every tray's test is run on it, and the trays it earns light up.",
    items: [
      /* learn ML3: answer in the plan = 5/9 and 1/9 are proper, 11/8 and 8/8 are improper, 5/9 and 1/9 are like fractions, and 1/9 is a unit fraction
         (11/8 and 8/8 share a bottom number too, so the like tray takes all four) */
      { qid: "M1.S1.T2.C7:ML3", kind: "sort", pad: "enter", cards: [[5, 9], [11, 8], [1, 9], [8, 8]], trays: ["proper", "improper", "like", "unlike", "unit"],
        answer: "proper:5/9,1/9;improper:11/8,8/8;like:5/9,11/8,1/9,8/8;unlike:;unit:1/9",
        near: "proper:5/9,1/9;improper:11/8;like:5/9,11/8,1/9,8/8;unlike:;unit:1/9",
        say: "Sort these four cards into every tray that each one belongs in.",
        ladder: ["Which cards have the same lower number as another card?", "Cards with the same lower number belong together in one tray."],
        ask: "Sort the cards", miss: "Which trays does the card with equal numbers earn?",
        win: "Yes, one card can sit in several trays." },
      /* practice 5: answer in the plan = 13/6 and 6/6, because in each the upper number is greater than or equal to the lower one */
      { qid: "M1.S1.T2.C7:5", kind: "sort", pad: "enter", cards: [[4, 11], [13, 6], [1, 11], [6, 6]], trays: ["improper"],
        answer: "improper:13/6,6/6", near: "improper:13/6",
        say: "Drag each improper fraction into the tray.",
        ask: "Which are improper?", miss: "Which cards have an upper number that is not smaller than the lower?",
        win: "Yes, the upper number is not smaller." },
      /* practice 6: answer in the plan = 2/15 and 9/15 are the like fractions, because both are written in fifteenths, and 1/8 is the unit fraction */
      { qid: "M1.S1.T2.C7:6", kind: "sort", pad: "enter", cards: [[2, 15], [1, 8], [9, 15]], trays: ["like", "unlike", "unit"],
        answer: "like:2/15,9/15;unlike:1/8;unit:1/8", near: "like:2/15,9/15;unlike:;unit:1/8",
        say: "Sort the cards into like, unlike and unit.",
        ladder: ["Does the odd card out share its lower number with another card?", "A card with an upper number of 1 is a unit fraction."],
        ask: "Like, unlike, unit", miss: "Which two cards have the same lower number?",
        win: "Yes, like cards share a lower number." },
    ],
  },
  {
    n: 4,
    concept: "Halves and quarters in one field",
    conceptId: "M1.S1.T2.C8", objectiveIds: ["O2"],
    says: ["Cut one half in two. What is each of the new pieces called?"],
    steps: [
      { say: "Tap one half to choose it.", on: "pick", hint: "Tap one of the two halves." },
      { say: "Now tap Cut again to cut that half in two.", on: "cut", hint: "Tap the Cut again key under the cake." },
    ],
    ladder: ["How many of them cover the piece that was never cut?", "The number of equal pieces that fill the whole goes below the line."],
    closing: "Two quarters make a half, two halves make a whole and so do four quarters.",
    learned: "You learned: two quarters make a half and four quarters make a whole.",
    traceback: "The small pieces are laid on the untouched half and then into a whole circle, counted one by one, and named under the pieces.",
    items: [
      /* learn ML4: answer in the plan = One half, one quarter and one quarter, and together they make one whole flatbread */
      { qid: "M1.S1.T2.C8:ML4", kind: "halves", parts: SLOT_FRACTION, answer: [1, 4], near: "1|2",
        say: "One half of this cake is cut again, so what is each small piece?",
        ask: "What is each small piece?", miss: "How many pieces of this size would fill the whole cake?",
        win: "Yes, each small piece is a quarter." },
      /* practice 7: answer in the plan = One half, one quarter and one quarter, and 1/4 + 1/4 = 1/2 */
      { qid: "M1.S1.T2.C8:7", kind: "field", parts: SLOT_FRACTION, answer: [1, 2], near: "2|8",
        say: "What fraction of the field do the two small pieces make?",
        ask: "Two quarters together?", miss: "How do the two small pieces together compare with the big piece?",
        win: "Yes, two quarters make a half." },
      /* practice 8: answer in the plan = Six quarters, because each half is two quarters and three halves is six of them */
      { qid: "M1.S1.T2.C8:8", kind: "three", halves: 3, answer: 6, near: 3, unit: "quarters",
        say: "How many quarters are there in three halves?",
        ladder: ["How many quarters are in one half?", "Each half is two quarters, so count them half by half."],
        ask: "Quarters in three halves?", miss: "Cut every half in two, then count the small pieces one at a time.",
        win: "Yes, three halves are six quarters." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  card: { w: 220, h: 340 },
  free: { bar: 12, disc: 8 },
  warm: { bar: 6, strip: [5, 7], card: [1, 7], quarterCut: [0, 0.5, 0.75, 1] },
  colours: { taken: CONTENT.hundred, left: CONTENT.ten, whole: CONTENT.one, copy: CONTENT.bead, cut: CONTENT.line },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* the shelf: a card is written "5/9"; a sort is written "proper:5/9,1/9;improper:11/8,8/8" */
const cnCardName = (c: any) => c[0] + "/" + c[1];
const cnEnc = (trays: string[], cards: any[], held: any) => trays.map((t: string) =>
  t + ":" + cards.filter((c: any, i: number) => ((held || {})[t] || []).indexOf(i) >= 0).map(cnCardName).join(",")).join(";");
const cnRead = (v: any) => {
  const out: any = {};
  String(v === null || v === undefined ? "" : v).split(";").forEach((part: string) => {
    const b = part.split(":");
    if (b.length === 2) out[b[0].trim()] = b[1].split(",").map((x: string) => x.trim()).filter(Boolean).sort().join(" ");
  });
  return out;
};
/* one tray's test, run on one card among the cards on the shelf (the picture and the correction use it; the oracle has its own) */
const cnTest = (c: any, tray: string, all: any[]) =>
  tray === "proper" ? c[0] < c[1] : tray === "improper" ? c[0] >= c[1] : tray === "unit" ? c[0] === 1
    : tray === "like" ? all.some((o: any) => o !== c && o[1] === c[1])
      : tray === "unlike" ? !all.some((o: any) => o !== c && o[1] === c[1]) : false;

/* judge: is this value right for this item? (numbers compare as numbers) */
const judge = (item: any, v: any) => {
  if (item.kind === "sort") { const got = cnRead(v), want = cnRead(item.answer); return item.trays.every((t: string) => (got[t] || "") === (want[t] || "")); }
  if (item.kind === "field") {   /* two quarters make 1 over 2, and 2 over 4 as it stands: no other name is taken */
    const p = slotPartsOf(v, 2);
    return [[1, 2], [2, 4]].some((a: number[]) => p[0] !== "" && p[1] !== "" && Number(p[0]) === a[0] && Number(p[1]) === a[1]);
  }
  if (item.parts) return judgeSlotParts(item, v);
  if (item.choices) return String(v).trim() === String(item.answer);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work */
const oracle = () => {
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
  const same = (x: any, y: any) => Array.isArray(x) && Array.isArray(y) && x.length === y.length && x.every((v: any, i: number) => v === y[i]);
  const tidy = (s: any) => String(s).split(";").map((part: string) => {
    const at = part.indexOf(":");
    return part.slice(0, at) + ":" + part.slice(at + 1).split(",").filter(Boolean).sort().join(",");
  }).sort().join("|");
  const allSame = (u: number[]) => u.every((x: number) => x === u[0]);
  return PHASES.every((p: any) => p.items.every((q: any) => {
    if (q.kind === "bar") return same(q.answer, [q.take, q.n]);
    if (q.kind === "which") return q.answer === "top" + q.frac[0] && q.frac[0] < q.frac[1];
    if (q.kind === "equal") {
      if (q.sheets) { const good = q.sheets.filter((s: any) => allSame(s.units)); return q.answer === (good.length === q.sheets.length ? "both" : good.length === 0 ? "neither" : good[0].id); }
      return q.answer === (allSame(q.units) ? "yes" : "no");
    }
    if (q.kind === "sort") {
      const test = (c: any, t: string) => t === "proper" ? c[1] > c[0] : t === "improper" ? !(c[0] < c[1]) : t === "unit" ? c[0] === 1
        : t === "like" ? q.cards.some((o: any) => o !== c && o[1] === c[1])
          : t === "unlike" ? !q.cards.some((o: any) => o !== c && o[1] === c[1]) : false;
      return tidy(q.trays.map((t: string) => t + ":" + q.cards.filter((c: any) => test(c, t)).map((c: any) => c[0] + "/" + c[1]).join(",")).join(";")) === tidy(q.answer);
    }
    if (q.kind === "halves") return same(q.answer, [1, 2 * 2]);                       /* half of a half */
    if (q.kind === "field") { const g = gcd(2, 4); return same(q.answer, [2 / g, 4 / g]); }   /* two of the four quarters */
    if (q.kind === "three") return q.answer === q.halves * 2;                          /* two quarters in every half */
    return false;
  }));
};
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.kind === "sort" || item.choices ? []
  : item.parts ? [item.answer[0] + "/" + item.answer[1]]
    : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;
/* what the slot prints once a word key or a sorted shelf has been given */
const format = (v: any) => (typeof v === "string" && v.indexOf(":") >= 0 ? "sorted" : CN_SAID[String(v)] || v);

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area (the shelf): set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter; in a guide-steps phase (stage "demo") it must return undefined so the check reaches api.onEnter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── drawing helpers (this tool's own; a fraction is always stacked, never "3/4") ─────────── */

const CN_INK = CONTENT.line;      /* every cut, score line and cell edge is near-black */
/* a point on a circle, the angle in degrees clockwise from the top */
const cnPol = (cx: number, cy: number, r: number, deg: number) => { const a = ((deg - 90) * Math.PI) / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; };
/* a wedge from the centre, from angle a0 to a1 (a full turn is a circle) */
const cnWedge = (cx: number, cy: number, r: number, a0: number, a1: number) => {
  if (a1 - a0 >= 359.9) return "M " + (cx - r) + " " + cy + " A " + r + " " + r + " 0 1 1 " + (cx + r) + " " + cy + " A " + r + " " + r + " 0 1 1 " + (cx - r) + " " + cy + " Z";
  const p0 = cnPol(cx, cy, r, a0), p1 = cnPol(cx, cy, r, a1);
  return "M " + cx + " " + cy + " L " + p0[0] + " " + p0[1] + " A " + r + " " + r + " 0 " + (a1 - a0 > 180 ? 1 : 0) + " 1 " + p1[0] + " " + p1[1] + " Z";
};
/* cut positions along a whole, 0 to 1: n equal parts, or parts in the ratio of the given units */
const cnEven = (n: number) => Array.from({ length: n + 1 }, (_, i) => i / n);
const cnUnits = (u: number[]) => { const t = u.reduce((a: number, c: number) => a + c, 0); let s = 0; return [0].concat(u.map((v: number) => (s += v) / t)); };
const cnSplit = (b: number[], i: number) => b.slice(0, i + 1).concat([(b[i] + b[i + 1]) / 2]).concat(b.slice(i + 1));
/* a whole is a bar { kind: "bar", x, y, w, h } or a round whole { kind: "disc", cx, cy, r, from, sweep } (a half disc has sweep 180) */
function cnPieces(G: any, b: number[], gap = 0) {
  return b.slice(0, -1).map((u0: number, i: number) => {
    const u1 = b[i + 1];
    if (G.kind === "bar") {
      const x = G.x + u0 * G.w, w = (u1 - u0) * G.w;
      return { i, u0, u1, x, y: G.y, w, h: G.h, cx: x + w / 2, cy: G.y + G.h / 2, d: "M " + x + " " + G.y + " h " + w + " v " + G.h + " h " + (-w) + " Z" };
    }
    const a0 = G.from + u0 * G.sweep, a1 = G.from + u1 * G.sweep, mid = (a0 + a1) / 2, o = gap ? cnPol(0, 0, gap, mid) : [0, 0];
    const cx = G.cx + o[0], cy = G.cy + o[1], m = cnPol(cx, cy, G.r * 0.6, mid);
    return { i, u0, u1, a0, a1, mid, ox: cx, oy: cy, cx: m[0], cy: m[1], d: cnWedge(cx, cy, G.r, a0, a1) };
  });
}
/* the lines a knife draws to cut a whole into b: where each one is, and the point the knife comes down on */
function cnLines(G: any, b: number[]) {
  const out: any[] = [];
  if (G.kind === "bar") {
    for (let k = 1; k < b.length - 1; k++) { const x = G.x + b[k] * G.w; out.push({ x1: x, y1: G.y, x2: x, y2: G.y + G.h, at: { x, y: G.y + G.h / 2 } }); }
  } else {
    for (let k = G.sweep >= 359.9 ? 0 : 1; k < b.length - 1; k++) {
      const deg = G.from + b[k] * G.sweep, p = cnPol(G.cx, G.cy, G.r, deg), m = cnPol(G.cx, G.cy, G.r * 0.58, deg);
      out.push({ x1: G.cx, y1: G.cy, x2: p[0], y2: p[1], at: { x: m[0], y: m[1] } });
    }
  }
  return out;
}
/* THE SKINS (images.tsx: bar = a milk-chocolate tile, disc = the whole golden cake, bead = a wooden bead; the plain shape is drawn first and
   stays the fallback). The chocolate is DARK (docs/IMAGES.md §7): a piece that is NOT counted wears a pale cream wash over it, a counted piece a
   deep blue, and every edge carries a light line under the near-black one so it reads on both. The cake and the bead take the usual 0.72 tint. */
const CN_DEEP = shade(CONTENT.hundred, 0.3);
const CN_WASH = "#FFF1D6";
const CN_DEEP_BEAD = shade(CONTENT.hundred, 0.45);   /* the light wooden bead needs a deeper blue and a fuller tint to stand 3:1 from a bead that is not counted */
/* a ring round something the correction points at: a white halo under the accent, so it reads on chocolate and on cake alike */
const cnRingRect = (k: any, x: number, y: number, w: number, h: number, C: any) => (
  <g key={k} pointerEvents="none">
    <rect x={x} y={y} width={w} height={h} rx={12} fill="none" stroke="#FFFFFF" strokeWidth={14} />
    <rect x={x} y={y} width={w} height={h} rx={12} fill="none" stroke={C.accent} strokeWidth={7} />
  </g>
);
const cnRingPath = (k: any, d: string, C: any) => (
  <g key={k} pointerEvents="none">
    <path d={d} fill="none" stroke="#FFFFFF" strokeWidth={14} strokeLinejoin="round" />
    <path d={d} fill="none" stroke={C.accent} strokeWidth={7} strokeLinejoin="round" />
  </g>
);
/* a whole, drawn: every piece its own shape and its own skin, the cut lines near-black, a counted piece blue.
   `lines` (while a knife is still cutting) draws one uncut shape and only the first lines. */
function cnWhole(o: any) {
  const { id, G, b, taken, C, gap = 0, sel = -1, lines } = o;
  const cutting = lines !== undefined;
  const ps = cnPieces(G, cutting ? [0, 1] : b, cutting ? 0 : gap);
  const bar = G.kind === "bar", count = !cutting && !!taken && ps.some((p: any) => taken(p.i));   /* the wash only tells counted from not counted once something is counted */
  const edge = (p: any) => bar
    ? <g key={"e" + p.i}><path d={p.d} fill="none" stroke={CN_WASH} strokeWidth={7} strokeLinejoin="round" /><path d={p.d} fill="none" stroke={CN_INK} strokeWidth={3.5} strokeLinejoin="round" /></g>
    : <path key={"e" + p.i} d={p.d} fill="none" stroke={CN_INK} strokeWidth={3} strokeLinejoin="round" />;
  return (
    <g data-role="whole" data-shape={G.kind}>
      <defs>
        {bar ? <clipPath id={"cn-" + id}><rect x={G.x} y={G.y} width={G.w} height={G.h} rx={RAD.piece} /></clipPath>
          : ps.map((p: any) => <clipPath key={p.i} id={"cn-" + id + "-" + p.i}><path d={p.d} /></clipPath>)}
      </defs>
      <g clipPath={bar ? "url(#cn-" + id + ")" : undefined}>
        {ps.map((p: any) => {
          const on = count && taken(p.i);
          return (
            <g key={p.i}>
              <path d={p.d} fill={on ? "url(#gHundred)" : "url(#gTen)"} />
              {bar ? <Skin name="bar" x={p.x} y={p.y} w={p.w} h={p.h} fit="stretch" />
                : <Skin name="disc" x={p.ox - G.r} y={p.oy - G.r} w={2 * G.r} h={2 * G.r} clip={"url(#cn-" + id + "-" + p.i + ")"} />}
              {count && bar && <path d={p.d} fill={on ? CN_DEEP : CN_WASH} fillOpacity={on ? 0.88 : 0.5} />}
              {count && !bar && on && <path d={p.d} fill={CN_DEEP} fillOpacity={0.88} />}
            </g>
          );
        })}
        {ps.map(edge)}
      </g>
      {bar && <rect x={G.x} y={G.y} width={G.w} height={G.h} rx={RAD.piece} fill="none" stroke={CN_WASH} strokeWidth={8} />}
      {bar && <rect x={G.x} y={G.y} width={G.w} height={G.h} rx={RAD.piece} fill="none" stroke={CN_INK} strokeWidth={4.5} />}
      {cutting && cnLines(G, o.b).slice(0, lines).map((l: any, k: number) => (
        <g key={k}>
          {bar && <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={CN_WASH} strokeWidth={8} strokeLinecap="round" />}
          <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={CN_INK} strokeWidth={4} strokeLinecap="round" />
        </g>
      ))}
      {!cutting && sel >= 0 && ps[sel] && cnRingPath("sel", ps[sel].d, C)}
    </g>
  );
}

/* a fraction written the way the book writes it: the top number over a rule over the bottom one */
function CnFrac({ x, y, a, b, size, ink }: any) {
  const sz = size || T.label;
  const w = Math.max(String(a === undefined || a === null ? "" : a).length, String(b === undefined || b === null ? "" : b).length, 1) * sz * 0.62 + 16;
  return (
    <g>
      {a !== "" && a !== null && a !== undefined && (
        <text x={x} y={y - sz * 0.24} textAnchor="middle" fontSize={sz} fontWeight={700} fill={ink}>{a}</text>)}
      <rect x={x - w / 2} y={y - 2} width={w} height={4} rx={2} fill={ink} />
      {b !== "" && b !== null && b !== undefined && (
        <text x={x} y={y + sz * 0.92} textAnchor="middle" fontSize={sz} fontWeight={700} fill={ink}>{b}</text>)}
    </g>
  );
}
/* the Fraction card: the numerator box over a bar over the denominator box (the answer is written on it) */
function cnCardDraw(o: any) {
  const { x, y, w, h, C, top, bottom, active = -1, size = T.display } = o;
  const bh = (h - 70) / 2, ty = y + 22, by = y + 22 + bh + 26;
  const cell = (yy: number, v: any, on: boolean) => {
    const s = String(v === undefined || v === null ? "" : v), nw = s.length * size * 0.58;
    return (
      <g>
        <rect x={x + 20} y={yy} width={w - 40} height={bh} rx={14} fill={mix(C.panel, "#FFFFFF", 0.3)} stroke={on ? C.accent : C.rule} strokeWidth={on ? 5 : 3} />
        <text x={x + w / 2} y={yy + bh / 2 + size * 0.36} textAnchor="middle" fontSize={size} fontWeight={700} fill={C.ink}>{s}</text>
        {on && <rect className="c4-caret" x={x + w / 2 + nw / 2 + 4} y={yy + (bh - size * 0.8) / 2} width={4} height={size * 0.8} rx={2} fill={C.accent} />}
      </g>
    );
  };
  return (
    <g data-role="fraction-card" pointerEvents="none">
      <rect x={x} y={y} width={w} height={h} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={3} filter="url(#fShadowSoft)" />
      {cell(ty, top, active === 0)}
      <rect x={x + 34} y={y + 22 + bh + 10} width={w - 68} height={6} rx={3} fill={C.ink} />
      {cell(by, bottom, active === 1)}
    </g>
  );
}
/* a small tap target shaped like a wedge (a round piece answers on its whole face); no control id of its own when `id` is empty */
function CnPieceTap({ id, d, label, onPress }: any) {
  const p = usePress(onPress, true);
  return id
    ? <path className="c4-hit" data-control={id} role="button" tabIndex={0} aria-label={label || id} d={d} fill="transparent" {...p.bind()} onKeyDown={p.keys} />
    : <path className="c4-hit" aria-hidden="true" d={d} fill="transparent" {...p.bind()} />;
}
/* a tap target with no control id: a lifted card is put down anywhere on the tray; the keyboard has the tray's header key */
function CnRectTap({ x, y, w, h, onPress }: any) {
  const p = usePress(onPress, true);
  return <rect className="c4-hit" aria-hidden="true" x={x} y={y} width={w} height={h} fill="transparent" {...p.bind()} />;
}
/* a chip with the answer, written once the correction has run */
function cnChip({ x, y, text, C, w }: any) {
  const cw = w || Math.max(190, String(text).length * 21 + 56);
  return (
    <g>
      <rect x={x - cw / 2} y={y} width={cw} height={64} rx={16} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={2.5} />
      <text x={x} y={y + 44} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{text}</text>
    </g>
  );
}
/* the wedges of a cut round whole hung from a ruler line, tip down, every rim chord on the line: widths read side by side */
function cnRowWedges(units: number[], x0: number, avail: number, rowY: number) {
  const tot = units.reduce((a: number, c: number) => a + c, 0), n = units.length, gapW = 26;
  const ang = units.map((u: number) => (u / tot) * 360), chord = ang.map((a: number) => 2 * Math.sin((a * Math.PI) / 360));
  const sum = chord.reduce((a: number, c: number) => a + c, 0), R = Math.min(170, (avail - gapW * (n - 1)) / sum);
  let x = x0 + (avail - (R * sum + gapW * (n - 1))) / 2;
  return ang.map((a: number, i: number) => {
    const half = (a * Math.PI) / 360, ch = R * chord[i], xc = x + ch / 2;
    x += ch + gapW;
    const lx = xc - R * Math.sin(half), rx = xc + R * Math.sin(half), tipY = rowY + R * Math.cos(half);
    return { i, a, R, xc, lx, rx, tipY, ch, d: "M " + xc + " " + tipY + " L " + lx + " " + rowY + " A " + R + " " + R + " 0 " + (a > 180 ? 1 : 0) + " 1 " + rx + " " + rowY + " Z" };
  });
}
/* what a fresh board holds, by kind */
const cnInit = (kind: string, it: any) => {
  const base: any = { b: [0, 1], taken: [], shown: undefined, cutDone: false, sel: -1, tb: null, touched: false, measured: false, hang: false,
    trays: {}, lifted: null, peek: null, cut: false, fw: "bar", fn: 6, ticks: 0, named: {} };
  if (kind === "bar") return { ...base, b: cnEven(it.n), taken: Array.from({ length: it.take }, (_, i) => i), cutDone: true };
  if (kind === "which") return { ...base, taken: Array.from({ length: it.frac[0] }, (_, i) => i) };
  if (kind === "halves") return { ...base, b: [0, 0.5, 0.75, 1], cutDone: true };
  if (kind === "warm4") return { ...base, b: [0, 0.5, 1] };
  return base;
};

/* ── the working area ────────────────────────────────────────────────────────────────────────
   box = { w, h, open, key }: 1472 wide with the answer panel shut, 900 with it open (bigPad), 520 tall; box.key is the key's corner
   (about x 1190, y 0, 282 x 88; wider on a question whose choice keys stand there): nothing of the picture runs under it.
   The question lives in the bubble only. Every act (a cut, a measure) is performed on screen with api.act; a tap that colours a
   piece is the piece itself changing (direct manipulation). A fraction is drawn stacked, never "3/4". */
function Work({ phase, n, item, index, stage, wrong, typed, part, api, step, stepOn, box, answerOn, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const warm = !free && !!(PHASES[n - 1] && PHASES[n - 1].steps) && (stage === "demo" || stage === "teach");
  const it: any = free || warm ? {} : item || {};
  const kind: string = free ? "free" : warm ? "warm" + n : it.kind || "";
  /* the board is keyed to the ENTRY: the warm-up, each question and Free play each get a fresh one, derived in render */
  const qk = free ? "free" : warm ? n + ":warm" : n + ":" + index;
  const [raw, setRaw] = useState<any>({ qk: "" });
  const qkRef = useRef(qk);
  qkRef.current = qk;
  const initS = () => ({ qk, ...cnInit(kind, it) });
  const S: any = raw.qk === qk ? raw : initS();
  const put = (p: any) => setRaw((prev: any) => {
    if (qkRef.current !== qk) return prev;                       /* an act that outlived its question writes nothing */
    const base = prev.qk === qk ? prev : initS();
    return { ...base, ...(typeof p === "function" ? p(base) : p) };
  });
  const tbPut = (p: any) => put((cur: any) => ({ tb: { ...(cur.tb || {}), ...p } }));
  const actBusy = useRef(false);
  const lastKey = useRef<any>({});
  const peekT = useRef<any>(null);
  const tbOn = useRef(false);
  const denomSaid = useRef(false);   /* the naming line was said during the hold: the question line is said again when question 1 opens */
  /* a 400 ms double-tap guard on the action keys (Cut, Measure, Cut again), one clock per key, so a second key never waits on the first */
  const guard = (id: string, fn: any) => { const t = Date.now(); if (t - (lastKey.current[id] || 0) < 400) return; lastKey.current[id] = t; fn(); };

  const W0 = box ? box.w : 1472, H0 = box ? box.h : 520;
  const ox = Math.max(0, Math.round((W0 - 900) * 0.22));
  const x0 = 40, CW = MODEL.card.w, CH = MODEL.card.h;
  const cardX = W0 - 40 - CW, cardY = 112;
  const L = Math.max(320, Math.min(940, cardX - 90 - x0));
  const INK = C.ink, TAKEN = shade(CONTENT.hundred, 0.25);
  const live = warm || free || stage === "ask";
  const solved = stage === "win" || stage === "idle";
  const tb = S.tb;
  const tp = slotPartsOf(typed, 2);
  const keyY = H0 - 82, KW = 260, KH = 72;
  const keyBtn = (id: string, label: string, cx: number, onClick: any, disabled?: boolean) => (
    <Key key={id} id={id} label={label} x={cx - KW / 2} y={keyY} w={KW} h={KH} C={C} tone="key" disabled={disabled} onClick={() => guard(id, onClick)}>
      <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={disabled ? mix(C.ink, C.panel, 0.45) : toneInk("key", C.ink)}>{tx(label)}</text>
    </Key>
  );

  /* a nudge said with api.say stays on the bubble until something replaces it (PATTERNS §18): when question 1 opens, say its line again */
  useEffect(() => { if (stage === "ask" && denomSaid.current && it.say) { denomSaid.current = false; api.say(it.say); } }, [stage]);

  /* a fresh entry ends whatever the last one left running */
  useEffect(() => () => {
    tl.stop();
    if (peekT.current) clearTimeout(peekT.current);
    if (tbOn.current) { tbOn.current = false; api.lock(false); }
  }, [qk]);

  /* ── the knife (or the scissors) cuts a whole: the lines come one by one, then the pieces stand ── */
  const doCut = async (G: any, bNew: number[], tool: string, progressive = true) => {
    if (actBusy.current) return false;
    actBusy.current = true;
    const lines = cnLines(G, bNew);
    const ok = await api.act({ tool, moves: tool === "scissors" ? "snip" : "slice", at: lines.map((l: any) => l.at), ms: 1100,
      onPoint: (i: number) => { if (progressive) put({ shown: i + 1, touched: true }); } });
    actBusy.current = false;
    if (!ok) { put({ shown: undefined }); return false; }
    put({ b: bNew, shown: undefined, cutDone: true, touched: true });
    api.sfx.settle();
    return true;
  };
  /* the ruler slides along the pieces and reads their lengths */
  const doMeasure = async (rulerY: number, xs: number[], xFrom: number, xTo: number, early?: () => void) => {
    if (actBusy.current) return false;
    actBusy.current = true;
    const ok = await api.act({ tool: "ruler", moves: "slide", ms: 1100, from: { x: xFrom, y: rulerY }, to: { x: xTo, y: rulerY },
      at: xs.map((x: number) => ({ x, y: rulerY })), onPoint: (i: number) => { if (i === 0 && early) early(); } });
    actBusy.current = false;
    if (!ok) return false;
    put({ measured: true, hang: S.hang || !!early, touched: true });
    api.sfx.settle();
    return true;
  };

  /* ── geometry of each scene ── */
  const G1 = { kind: "bar", x: x0, y: 150, w: L, h: 150 };                                   /* the warm-up bar */
  const G2 = { kind: "bar", x: x0 + 20, y: 160, w: Math.min(960, W0 - 120), h: 120 };         /* the warm-up strip */
  const GQ = { kind: "bar", x: x0, y: 112, w: L, h: 168 };                                    /* the bar of a naming question */
  const GM = { kind: "bar", x: x0 + 150, y: 330, w: Math.max(200, L - 150), h: 80 };          /* the bar redrawn under it after a miss */
  const GS = { kind: "bar", x: 60, y: 150, w: Math.min(960, W0 - 120), h: 150 };              /* the strip of a question */
  const CAKE = 195;   /* every cake is drawn at ONE size (about 400 across), the keypad open or shut, in the steps and in the questions */
  const GC = { kind: "disc", cx: 250, cy: 250, r: CAKE, from: 0, sweep: 360 };                /* the cake */
  const GH = { kind: "disc", cx: 243 + ox, cy: 265, r: CAKE, from: 0, sweep: 360 };           /* the cake that is cut again */
  const GR = { kind: "disc", cx: 543 + ox, cy: 245, r: 80, from: 0, sweep: 360 };             /* the whole it is laid into */
  const GW4 = { kind: "disc", cx: 330, cy: 255, r: CAKE, from: 0, sweep: 360 };               /* the warm-up cake */
  const GF = { kind: "disc", cx: 330, cy: 292, r: CAKE, from: 0, sweep: 360 };                /* Free play's round whole */
  const GFB = { kind: "bar", x: x0, y: 140, w: L, h: 150 };                                   /* Free play's bar */
  const F = { x: 60 + ox, y: 108, w: 260, h: 260 };                                           /* the field */
  const sheetsG = (sheets: any[]) => { const sw = Math.min(560, (W0 - 220) / 2); return sheets.map((s: any, k: number) => ({ id: s.id, kind: "bar", x: 60 + k * (sw + 100), y: 190, w: sw, h: 120, units: s.units })); };
  const halvesG = (i: number) => ({ kind: "disc", cx: 150 + ox + i * 270, cy: 300, r: 125, from: -90, sweep: 180 });
  const sheetList = it.sheets ? sheetsG(it.sheets) : [];
  const stripUnits = warm && n === 2 ? [5, 7] : it.units || [1];
  const cmOf = (u: number) => u;                                                               /* lengths are written in cm */

  /* ── the shelf (phase 3) ── */
  const cards: any[] = warm && n === 3 ? [MODEL.warm.card] : it.cards || [];
  const trayNames: string[] = warm && n === 3 ? ["proper", "improper", "unit"] : it.trays || [];
  const sCW = 150, sCH = 130, sGap = 20, sY = 100;
  const cardPos = (i: number) => ({ x: 24 + i * (sCW + sGap), y: sY });
  const tm = Math.max(1, trayNames.length), tw = Math.min(276, (W0 - 48 - (tm - 1) * 10) / tm), ttot = tm * tw + (tm - 1) * 10, tx0 = (W0 - ttot) / 2;
  const trayRect = (j: number) => ({ x: tx0 + j * (tw + 10), y: 244, w: tw, h: 268 });
  const trayAt = (pt: any) => { const j = trayNames.findIndex((_: any, k: number) => { const r = trayRect(k); return pt.x >= r.x && pt.x <= r.x + r.w && pt.y >= r.y - 30 && pt.y <= r.y + r.h; }); return j >= 0 ? trayNames[j] : null; };
  const cardsIn = (t: string) => ((S.trays || {})[t] || []).slice().sort((a: number, b: number) => cards[a][1] - cards[b][1] || cards[a][0] - cards[b][0]);
  const miniPos = (j: number, k: number) => { const r = trayRect(j); return { x: r.x + (r.w - 178) / 2 + (k % 2) * 94, y: r.y + 98 + Math.floor(k / 2) * 88 }; };
  const placedCount = Object.keys(S.trays || {}).reduce((a: number, t: string) => a + (S.trays[t] || []).length, 0);
  const dropCard = (ci: number, t: string) => {
    const held = (S.trays || {})[t] || [];
    if (!cnTest(cards[ci], t, cards) || held.indexOf(ci) >= 0) {
      /* a tray the card has not earned: it stays where it was and the two numbers that tray compares light up; nothing is marked */
      put({ peek: { ci, t }, lifted: null, touched: true });
      if (peekT.current) clearTimeout(peekT.current);
      peekT.current = setTimeout(() => put({ peek: null }), 1700);
      api.sfx.tick();
      if (warm) api.did("refuse");
      return false;
    }
    put((cur: any) => ({ trays: { ...(cur.trays || {}), [t]: (cur.trays[t] || []).concat([ci]) }, lifted: null, peek: null, touched: true }));
    api.sfx.tick();
    if (warm) {
      /* step 1 is done by any tray; step 2 only once the SAME card stands in a second tray (one card, two trays) */
      const inTrays = Object.keys(S.trays || {}).filter((x: string) => x !== t && ((S.trays || {})[x] || []).indexOf(ci) >= 0).length + 1;
      api.did(step === 0 || inTrays >= 2 ? "drop" : "one");
    }
    return true;
  };
  const trayPress = (t: string) => { if (!live || tl.busy) return; if (S.lifted !== null && S.lifted !== undefined) dropCard(S.lifted, t); else if (warm) api.did("tray"); };
  const takeOut = (t: string, ci: number) => { if (tl.busy) return; if (warm) { api.did("undo"); return; } put((cur: any) => ({ trays: { ...cur.trays, [t]: (cur.trays[t] || []).filter((k: number) => k !== ci) }, touched: true })); api.sfx.tick(); if (warm) api.did("undo"); };
  const drag = useDrag((p: any, pt: any, moved: boolean) => {
    if (tl.busy || !live || kind !== "sort" && kind !== "warm3") return;
    if (!moved) { put((cur: any) => ({ lifted: cur.lifted === p.i ? null : p.i, touched: true })); if (warm) api.did("lift"); return; }
    const t = trayAt(pt);
    if (t) dropCard(p.i, t);
  });
  const dragging = drag.drag;
  /* the agent's and the dev driver's drop of the warm-up card: a hand carries it to a tray it suits */
  const dropWarm = async () => {
    if (actBusy.current) return;
    const t = ["proper", "unit"].filter((x: string) => ((S.trays || {})[x] || []).indexOf(0) < 0)[0];
    if (!t) return;
    const j = trayNames.indexOf(t), r = trayRect(j), cp = cardPos(0), tgt = miniPos(j, ((S.trays || {})[t] || []).length);
    actBusy.current = true;
    const ok = await api.act({ tool: "hand", moves: "carry", ms: 1100, from: { x: cp.x + sCW / 2, y: cp.y + sCH / 2 }, at: [{ x: r.x + r.w / 2, y: r.y + 120 }], to: { x: tgt.x + 42, y: tgt.y + 41 },
      hold: <g><rect x={-42} y={-41} width={84} height={82} rx={10} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} /><CnFrac x={0} y={0} a={MODEL.warm.card[0]} b={MODEL.warm.card[1]} size={T.label} ink={C.ink} /></g> });
    actBusy.current = false;
    if (ok) dropCard(0, t);
  };
  const sortEnter = () => { if (!placedCount || tl.busy) return; api.submit(cnEnc(trayNames, cards, S.trays)); };
  HOOK.set = (v: any) => {
    const r = cnRead(v), trays: any = {};
    trayNames.forEach((t: string) => { trays[t] = (r[t] ? r[t].split(" ") : []).map((cs: string) => cards.map(cnCardName).indexOf(cs)).filter((i: number) => i >= 0); });
    put({ trays, touched: true });
    return true;
  };
  HOOK.check = () => undefined;
  useEffect(() => { if (kind === "sort" && stage === "ask") api.answerReady(placedCount > 0); }, [placedCount, qk, stage]);

  /* ── the guide steps' acts (the child's own tap calls the same function) ── */
  const shadePiece = (i: number) => {
    if (!live || tl.busy) return;
    if (warm && stepOn !== "shade") { if (stepOn) api.did("shade"); return; }   /* a colouring tap at any other step is a wrong act: the hint shows and nothing is coloured */
    if (warm && S.taken.indexOf(i) >= 0) { api.did("shaded"); return; }   /* in the warm-up a coloured part stays coloured: the tap is a wrong act, the step's hint shows */
    put((cur: any) => ({ taken: cur.taken.indexOf(i) >= 0 ? cur.taken.filter((k: number) => k !== i) : cur.taken.concat([i]), touched: true }));
    api.sfx.tick();
    if (warm) api.did("shade");
  };
  /* the card's two numbers are named once, in phase 1: a tap on a box writes its name beside it */
  const nameBox = (w: string) => {
    if (!live || tl.busy) return;
    if (warm && stepOn !== w) { if (stepOn) api.did(w); return; }   /* the other number first is a wrong act: the hint shows and no name is written */
    put((cur: any) => ({ named: { ...(cur.named || {}), [w]: true }, touched: true }));
    api.sfx.tick();
    if (warm) {
      api.did(w);
      if (w === "lower") { denomSaid.current = true; api.say("That is the denominator: it counts all the equal parts."); }
    }
  };
  const cutWarm1 = async () => { if (S.cutDone) return; if (await doCut(G1, cnEven(MODEL.warm.bar), "knife")) api.did("cut"); };
  const cutWarm2 = async () => { if (S.cutDone) return; if (await doCut(G2, cnUnits(MODEL.warm.strip), "scissors")) api.did("cut"); };
  const measureBars = async (list: any[]) => {
    const yR = list[0].G.y + list[0].G.h + 18, xs: number[] = [];
    list.forEach((s: any) => cnUnits(s.units).forEach((u: number) => xs.push(s.G.x + u * s.G.w)));
    return doMeasure(yR, xs, list[0].G.x - 10, list[list.length - 1].G.x + list[list.length - 1].G.w + 10);
  };
  const measureWarm = async () => { if (!S.cutDone || S.measured) return; if (await measureBars([{ G: G2, units: MODEL.warm.strip }])) api.did("measure"); };
  const pickHalf = (i: number) => { if (!live || tl.busy || S.cutDone) return; put({ sel: i, touched: true }); api.sfx.tick(); if (warm) api.did("pick"); };
  const cutAgain = async () => {
    if (S.sel < 0 || S.cutDone) return;
    const bNew = cnSplit(S.b, S.sel), line = cnPol(GW4.cx, GW4.cy, GW4.r * 0.58, ((bNew[S.sel + 1]) * 360));
    if (actBusy.current) return;
    actBusy.current = true;
    const ok = await api.act({ tool: "knife", moves: "slice", ms: 1100, at: [{ x: line[0], y: line[1] }] });
    actBusy.current = false;
    if (!ok) return;
    put({ b: bNew, cutDone: true, touched: true });
    api.sfx.settle();
    api.did("cut");
  };
  const act = (on: any) => {
    if (kind === "warm1") { if (on === "cut") cutWarm1(); else if (on === "upper" || on === "lower") nameBox(on); else { const i = Array.from({ length: S.b.length - 1 }, (_, k) => k).filter((k: number) => S.taken.indexOf(k) < 0)[0]; if (i !== undefined) shadePiece(i); } }
    else if (kind === "warm2") { if (on === "cut") cutWarm2(); else measureWarm(); }
    else if (kind === "warm3") dropWarm();
    else if (kind === "warm4") { if (on === "pick") pickHalf(1); else cutAgain(); }
  };
  api.onEnter(stage === "demo" && stepOn ? () => act(stepOn) : kind === "sort" && stage === "ask" ? sortEnter : null);

  /* Free play: any whole, any number of cuts, tap parts to colour them */
  const fmax = S.fw === "disc" ? MODEL.free.disc : MODEL.free.bar;
  const GFree: any = S.fw === "disc" ? GF : GFB;
  const freeCut = async () => { if (S.cutDone) return; await doCut(GFree, cnEven(S.fn), "knife"); };
  const freeSet = (p: any) => put({ ...p, b: [0, 1], taken: [], cutDone: false, shown: undefined, touched: true });

  /* ── what the correction (and, quicker, the win) redraws ── */
  const stepsFor = (sp: number, win?: boolean) => {
    const out: any[] = [];
    const wait = (ms: number, fn: any) => out.push([Math.max(20, Math.round(ms * sp)), fn]);
    if (kind === "bar") {
      wait(260, () => tbPut({ all: 0, take: 0, den: false, num: false }));
      for (let i = 1; i <= it.n; i++) { const j = i; wait(170, () => tbPut({ all: j })); }
      wait(320, () => tbPut({ den: true }));
      for (let i = 1; i <= it.take; i++) { const j = i; wait(200, () => tbPut({ take: j })); }
      wait(320, () => tbPut({ num: true }));
    } else if (kind === "which") {
      wait(260, () => tbPut({ take: 0, ring: false, lab: false, chip: false }));
      for (let i = 1; i <= it.frac[0]; i++) { const j = i; wait(200, () => tbPut({ take: j })); }
      wait(320, () => tbPut({ ring: true }));
      wait(400, () => tbPut({ lab: true }));
      wait(260, () => tbPut({ chip: true }));
    } else if (kind === "equal") {
      wait(220, () => put({ measured: true, hang: it.way === "cake" || S.hang }));
      wait(700, () => tbPut({ k: 1 }));
      wait(700, () => tbPut({ k: 2 }));
      wait(700, () => tbPut({ k: 3 }));
    } else if (kind === "sort") {
      wait(300, () => tbPut({ tests: true, card: -1, lit: null, ghost: {} }));
      cards.forEach((c: any, i: number) => {
        wait(360, () => tbPut({ card: i, lit: null }));
        trayNames.filter((t: string) => cnTest(c, t, cards)).forEach((t: string) => {
          wait(320, () => put((cur: any) => {
            const b = cur.tb || {}, g = { ...(b.ghost || {}) };
            g[t] = (g[t] || []).concat([i]);
            return { tb: { ...b, card: i, lit: t, ghost: g } };
          }));
        });
        wait(160, () => tbPut({ lit: null }));
      });
      wait(200, () => tbPut({ card: -1, lit: null }));
    } else if (kind === "halves") {
      wait(300, () => tbPut({ lay: 0, whole: -1, names: false }));
      if (!win) {
        wait(560, () => tbPut({ lay: 1 }));
        wait(560, () => tbPut({ lay: 2 }));
        wait(500, () => tbPut({ whole: 0 }));
        for (let i = 1; i <= 4; i++) { const j = i; wait(420, () => tbPut({ whole: j })); }
      }
      wait(win ? 700 : 360, () => tbPut({ names: true }));
    } else if (kind === "field") {
      wait(320, () => tbPut({ lay: 0, row: 0 }));
      if (!win) { wait(560, () => tbPut({ lay: 1 })); wait(560, () => tbPut({ lay: 2 })); }
      wait(520, () => tbPut({ row: 1 }));
      wait(520, () => tbPut({ row: 2 }));
    } else if (kind === "three") {
      wait(300, () => { put({ cut: true }); tbPut({ count: 0, total: false }); });
      for (let i = 1; i <= it.halves * 2; i++) { const j = i; wait(260, () => tbPut({ count: j })); }
      wait(320, () => tbPut({ total: true }));
    }
    return out;
  };
  useEffect(() => {
    if (!wrong || stage !== "ask" || free || warm) return;
    tbOn.current = true;
    api.lock(true);
    put({ tb: {}, lifted: null, peek: null });
    tl.run(stepsFor(1), () => { tbOn.current = false; api.lock(false); });
  }, [wrong]);
  useEffect(() => {
    if (stage !== "win" || free || warm) return;
    if (it.win) api.say(it.win);
    put({ tb: {}, lifted: null, peek: null });
    tl.run(stepsFor(0.4, true));
  }, [stage]);

  /* what the host and the agent read back (toolApi.getState) */
  const nPieces = (S.b || [0, 1]).length - 1, nCuts = Math.max(0, nPieces - 1);   /* cuts = the lines drawn, pieces = the parts the whole was cut into */
  api.share({ whole: kind === "sort" || kind === "warm3" ? "cards" : kind === "which" ? "things" : kind === "equal" ? it.way : kind === "free" ? S.fw : kind === "halves" || kind === "warm4" || kind === "three" ? "circle" : kind === "field" ? "field" : "bar",
    cuts: nCuts, pieces: nPieces, evenCuts: kind !== "equal", taken: (S.taken || []).length, numerator: it.parts ? tp[0] : null, denominator: it.parts ? tp[1] : null, sorted: placedCount, complete: stage === "idle" });

  const busy = tl.busy;
  /* ── the Fraction card: the question's answer is written on it ── */
  const cardVals = it.parts
    ? (solved ? (tp[0] || tp[1] ? tp : it.answer.map(String)) : tp)
    : kind === "which" ? [String(it.frac[0]), String(it.frac[1])]
      : warm && n === 1 ? [S.taken.length ? String(S.taken.length) : "", S.cutDone ? String(nPieces) : ""]
        : free ? [S.cutDone && S.taken.length ? String(S.taken.length) : "", S.cutDone ? String(S.fn) : ""] : ["", ""];
  const cardSize = Math.max(String(cardVals[0]).length, String(cardVals[1]).length) > 2 ? T.xl : T.display;
  const drawCard = () => (
    <g>
      {cnCardDraw({ x: cardX, y: cardY, w: CW, h: CH, C, top: cardVals[0], bottom: cardVals[1], size: cardSize,
        active: answerOn === "card" && box && box.open ? (part === 1 ? 1 : 0) : -1 })}
      {answerOn === "card" && it.parts && !busy && (!box || !box.open) && (
        <g>
          <SlotPartBox id="answer-open" label="Fraction card" x={cardX} y={cardY} w={CW} h={CH} on={false} enabled={true} onPick={api.openAnswer} />
          <BlinkRing x={cardX} y={cardY} w={CW} h={CH} rx={RAD.panel} C={C} />
        </g>
      )}
      {answerOn === "card" && it.parts && box && box.open && (
        <g>
          <SlotPartBox id="part-1" label="Numerator box" x={cardX + 20} y={cardY + 22} w={CW - 40} h={(CH - 70) / 2} on={part !== 1} enabled={!busy} onPick={() => api.pickPart(0)} />
          <SlotPartBox id="part-2" label="Denominator box" x={cardX + 20} y={cardY + 22 + (CH - 70) / 2 + 26} w={CW - 40} h={(CH - 70) / 2} on={part === 1} enabled={!busy} onPick={() => api.pickPart(1)} />
        </g>
      )}
    </g>
  );
  /* the taps that colour a piece: a bar answers in each part, a round whole on its whole face */
  const takeTaps = (G: any, b: number[], idp: string, small: boolean) => cnPieces(G, b, 0).map((p: any) => (
    G.kind === "bar"
      ? <Hit key={p.i} id={idp + p.i} x={p.x} y={p.y} w={p.w} h={p.h} onPress={() => shadePiece(p.i)} label={"Part " + (p.i + 1) + " of " + (b.length - 1)} />
      : small
        ? <g key={p.i}><CnPieceTap id="" d={p.d} onPress={() => shadePiece(p.i)} /><Hit id={idp + p.i} x={p.cx - 36} y={p.cy - 36} w={72} h={72} onPress={() => shadePiece(p.i)} label={"Part " + (p.i + 1) + " of " + (b.length - 1)} /></g>
        : <CnPieceTap key={p.i} id={idp + p.i} d={p.d} onPress={() => shadePiece(p.i)} label={"Part " + (p.i + 1)} />
  ));
  const numRow = (G: any, count: number, y: number, ink: string, from = 0) => cnPieces(G, cnEven(it.n), 0).slice(from, count).map((p: any) => (
    <text key={p.i} x={p.cx} y={y} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ink}>{p.i + 1}</text>
  ));

  /* ── the scenes ── */
  const sceneBar = () => {
    const ps = cnPieces(GQ, S.b, 0);
    const gm = GM, mp = cnPieces(gm, cnEven(it.n), 0);
    return (
      <g>
        {cnWhole({ id: "main", G: GQ, b: S.b, taken: (i: number) => S.taken.indexOf(i) >= 0, C })}
        {tb && (
          <g pointerEvents="none">
            {cnWhole({ id: "model", G: gm, b: cnEven(it.n), taken: (i: number) => i < (tb.take || 0), C })}
            {mp.slice(0, tb.all || 0).map((p: any) => <text key={"a" + p.i} x={p.cx} y={gm.y - 14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={INK}>{p.i + 1}</text>)}
            {mp.slice(0, tb.take || 0).map((p: any) => <text key={"t" + p.i} x={p.cx} y={gm.y + gm.h + 42} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={TAKEN}>{p.i + 1}</text>)}
            <CnFrac x={x0 + 62} y={gm.y + 40} a={tb.num ? it.take : ""} b={tb.den ? it.n : ""} size={T.xl} ink={INK} />
          </g>
        )}
      </g>
    );
  };
  const sceneWhich = () => {
    const nn = it.frac[1], per = Math.max(3, Math.min(6, Math.floor((cardX - 100 - x0) / 118))), r = 52, step2 = 118;
    const rows = Math.ceil(nn / per);
    const posOf = (i: number) => ({ x: x0 + r + 10 + (i % per) * step2, y: 160 + Math.floor(i / per) * 170 });
    return (
      <g>
        {Array.from({ length: nn }).map((_: any, i: number) => {
          const on = tb ? i < (tb.take || 0) : S.taken.indexOf(i) >= 0, q = posOf(i);
          return (
            <g key={i}>
              <Disc x={q.x} y={q.y} r={r} paint={on ? "gHundred" : "gTen"} />
              <Skin name="bead" x={q.x - r} y={q.y - r} w={2 * r} h={2 * r} fit="stretch" />
              {on && <circle cx={q.x} cy={q.y} r={r} fill={CN_DEEP_BEAD} fillOpacity={0.95} />}
            </g>
          );
        })}
        {tb && (
          <g pointerEvents="none">
            {Array.from({ length: tb.take || 0 }).map((_: any, i: number) => (
              <text key={i} x={posOf(i).x} y={posOf(i).y + r + 42} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={TAKEN}>{i + 1}</text>
            ))}
            {tb.ring && <rect x={cardX + 24} y={cardY + 18} width={CW - 48} height={(CH - 70) / 2 + 8} rx={16} fill="none" stroke={CONTENT.hundred} strokeWidth={7} />}
            {tb.lab && <text x={cardX - 16} y={cardY + 22 + (CH - 70) / 4 + 12} textAnchor="end" fontSize={T.label} fontWeight={600} fill={TAKEN}>{tx("taken")}</text>}
            {tb.lab && <text x={cardX - 16} y={cardY + CH - 22 - (CH - 70) / 4 + 12} textAnchor="end" fontSize={T.label} fontWeight={600} fill={INK}>{tx("in all")}</text>}
            {tb.chip && rows >= 1 && cnChip({ x: x0 + per * step2 + 157, y: 230, text: tx(CN_SAID.top7), C, w: 340 })}
          </g>
        )}
      </g>
    );
  };
  const sceneEqual = () => {
    const rows: any[] = [];
    const ringOf = (p: any) => cnRingRect("r" + p.i + p.x, p.x - 6, p.y - 6, p.w + 12, p.h + 12, C);
    let body: any = null, key: any = null;
    if (it.way === "strip") {
      const b = cnUnits(it.units), ps = cnPieces(GS, b, 0), lo = it.units.indexOf(Math.min(...it.units)), hi = it.units.indexOf(Math.max(...it.units));
      body = (
        <g>
          {cnWhole({ id: "strip", G: GS, b, C })}
          {S.measured && ps.map((p: any) => <text key={p.i} x={p.cx} y={GS.y + GS.h + 70} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={INK}>{cmOf(it.units[p.i]) + " " + tx("cm")}</text>)}
          {S.measured && <line x1={GS.x - 10} y1={GS.y + GS.h + 18} x2={GS.x + GS.w + 10} y2={GS.y + GS.h + 18} stroke={INK} strokeWidth={4} />}
          {tb && (tb.k || 0) >= 1 && ringOf(ps[lo])}
          {tb && (tb.k || 0) >= 2 && ringOf(ps[hi])}
          {tb && (tb.k || 0) >= 3 && cnChip({ x: GS.x + GS.w / 2, y: 410, text: tx(CN_CHIP[it.answer]), C })}
        </g>
      );
      if (!S.measured && live) key = keyBtn("measure", "Measure", GS.x + GS.w / 2, async () => { await measureBars([{ G: GS, units: it.units }]); });
    } else if (it.way === "sheets") {
      body = (
        <g>
          {sheetList.map((sg: any, k: number) => {
            const b = cnUnits(sg.units), ps = cnPieces(sg, b, 0), lo = sg.units.indexOf(Math.min(...sg.units)), hi = sg.units.indexOf(Math.max(...sg.units));
            return (
              <g key={sg.id}>
                <text x={sg.x + sg.w / 2} y={sg.y - 22} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={INK}>{sg.id}</text>
                {cnWhole({ id: "sheet" + k, G: sg, b, C })}
                {S.measured && ps.map((p: any) => <text key={p.i} x={p.cx} y={sg.y + sg.h + 70} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={INK}>{cmOf(sg.units[p.i]) + " " + tx("cm")}</text>)}
                {tb && (tb.k || 0) >= 1 && sg.units[lo] !== sg.units[hi] && ringOf(ps[lo])}
                {tb && (tb.k || 0) >= 2 && sg.units[lo] !== sg.units[hi] && ringOf(ps[hi])}
              </g>
            );
          })}
          {S.measured && <line x1={sheetList[0].x - 10} y1={sheetList[0].y + sheetList[0].h + 18} x2={sheetList[1].x + sheetList[1].w + 10} y2={sheetList[1].y + sheetList[1].h + 18} stroke={INK} strokeWidth={4} />}
          {tb && (tb.k || 0) >= 3 && cnChip({ x: W0 / 2 - 20, y: 410, text: tx(CN_CHIP[it.answer]), C })}
        </g>
      );
      if (!S.measured && live) key = keyBtn("measure", "Measure", (sheetList[0].x + sheetList[1].x + sheetList[1].w) / 2, async () => { await measureBars(sheetList.map((sg: any) => ({ G: sg, units: sg.units }))); });
    } else {
      /* the cake: a disc cut into six slices of different sizes; Measure hangs the slices from a ruler line, in one row, and they stay */
      const b = cnUnits(it.units), rowY = 170, wr = cnRowWedges(it.units, 40, Math.min(W0 - 80, 1100), rowY);
      const lo = it.units.indexOf(Math.min(...it.units)), hi = it.units.indexOf(Math.max(...it.units));
      body = S.hang ? (
        <g>
          <line x1={wr[0].lx - 18} y1={rowY} x2={wr[wr.length - 1].rx + 18} y2={rowY} stroke={INK} strokeWidth={4} strokeLinecap="round" />
          {wr.map((w: any) => (
            <g key={w.i}>
              <defs><clipPath id={"cn-row-" + w.i}><path d={w.d} /></clipPath></defs>
              <path d={w.d} fill="url(#gTen)" />
              <Skin name="disc" x={w.xc - w.R} y={w.tipY - w.R} w={2 * w.R} h={2 * w.R} clip={"url(#cn-row-" + w.i + ")"} />
              <path d={w.d} fill="none" stroke={CN_INK} strokeWidth={3} strokeLinejoin="round" />
              {S.measured && [w.lx, w.rx].map((xx: number, k: number) => <line key={k} x1={xx} y1={rowY - 24} x2={xx} y2={rowY + 24} stroke={INK} strokeWidth={5} strokeLinecap="round" />)}
              {tb && ((tb.k || 0) >= 1 && w.i === lo || (tb.k || 0) >= 2 && w.i === hi) && cnRingPath("ring", w.d, C)}
            </g>
          ))}
          {tb && (tb.k || 0) >= 3 && cnChip({ x: W0 / 2 - 20, y: 410, text: tx(CN_CHIP[it.answer]), C })}
        </g>
      ) : cnWhole({ id: "cake", G: GC, b, C });
      if (!S.measured && live) key = keyBtn("measure", "Measure", Math.round(W0 / 2), async () => {
        const xs: number[] = []; wr.forEach((w: any) => { xs.push(w.lx); xs.push(w.rx); });
        await doMeasure(rowY, xs, wr[0].lx - 24, wr[wr.length - 1].rx + 24, () => put({ hang: true }));
      });
    }
    return <g>{body}{key}{rows}</g>;
  };
  const sceneSort = () => {
    const lifted = S.lifted, peek = S.peek;
    const cardNode = (i: number, c: any, x: number, y: number, ghostly?: boolean, ink?: string) => (
      <g>
        <rect x={x} y={y} width={sCW} height={sCH} rx={16} fill="#FFFFFF" stroke={lifted === i || (tb && tb.card === i) || (peek && peek.ci === i) ? C.accent : C.rule}
          strokeWidth={lifted === i || (tb && tb.card === i) || (peek && peek.ci === i) ? 6 : 3} filter="url(#fShadowSoft)" />
        <CnFrac x={x + sCW / 2} y={y + sCH / 2 - 2} a={c[0]} b={c[1]} size={T.speech} ink={ink || INK} />
      </g>
    );
    return (
      <g>
        {cards.map((c: any, i: number) => {
          const p = cardPos(i), lit = peek && peek.ci === i;
          return (
            <g key={i} {...control("card-" + i, "Card " + c[0] + " over " + c[1])} {...drag.bind({ i })} {...drag.keys({ i })}>
              {cardNode(i, c, p.x, p.y - (lifted === i ? 8 : 0), false, lit ? C.accent : undefined)}
            </g>
          );
        })}
        {trayNames.map((t: string, j: number) => {
          const r = trayRect(j), isLit = (tb && tb.lit === t) || (peek && peek.t === t);
          const inside = cardsIn(t), ghost = ((tb && tb.ghost) || {})[t] || [];
          return (
            <g key={t}>
              <rect x={r.x} y={r.y} width={r.w} height={r.h} rx={18} fill={tint(C.panel, 0.45)} stroke={isLit ? C.accent : C.rule} strokeWidth={isLit ? 6 : 3} />
              <text x={r.x + r.w / 2} y={r.y + (lang === "en" ? 38 : 46)} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={INK} pointerEvents="none">{tx(t)}</text>
              {((tb && tb.tests) || isLit && peek) && <text x={r.x + r.w / 2} y={r.y + (lang === "en" ? 72 : 80)} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={INK} pointerEvents="none">{tx(CN_TEST[t])}</text>}
              <CnRectTap x={r.x} y={r.y + 72} w={r.w} h={r.h - 72} onPress={() => trayPress(t)} />
              <Hit id={"tray-" + t} x={r.x} y={r.y} w={r.w} h={72} label={"Tray " + t} onPress={() => trayPress(t)} />
              {inside.map((ci: number, k: number) => {
                const mp = miniPos(j, k);
                return (
                  <g key={ci}>
                    <rect x={mp.x} y={mp.y} width={84} height={82} rx={10} fill="#FFFFFF" stroke={C.rule} strokeWidth={2.5} />
                    <CnFrac x={mp.x + 42} y={mp.y + 40} a={cards[ci][0]} b={cards[ci][1]} size={T.label} ink={INK} />
                    {live && !busy && <Hit id={"out-" + t + "-" + ci} x={mp.x} y={mp.y} w={84} h={82} onPress={() => takeOut(t, ci)} label={"Take " + cards[ci][0] + " over " + cards[ci][1] + " out of " + t} />}
                  </g>
                );
              })}
              {ghost.filter((ci: number) => inside.indexOf(ci) < 0).map((ci: number, k: number) => {
                const mp = miniPos(j, inside.length + k);
                return (
                  <g key={"g" + ci} pointerEvents="none">
                    <rect x={mp.x} y={mp.y} width={84} height={82} rx={10} fill="none" stroke={C.accent} strokeWidth={3} strokeDasharray="10 8" />
                    <CnFrac x={mp.x + 42} y={mp.y + 40} a={cards[ci][0]} b={cards[ci][1]} size={T.label} ink={INK} />
                  </g>
                );
              })}
            </g>
          );
        })}
        {dragging && dragging.moved && dragging.payload && cards[dragging.payload.i] && (
          <g pointerEvents="none">
            <rect x={dragging.x - sCW / 2} y={dragging.y - sCH / 2} width={sCW} height={sCH} rx={16} fill="#FFFFFF" stroke={C.accent} strokeWidth={6} filter="url(#fLift)" />
            <CnFrac x={dragging.x} y={dragging.y - 2} a={cards[dragging.payload.i][0]} b={cards[dragging.payload.i][1]} size={T.speech} ink={INK} />
          </g>
        )}
      </g>
    );
  };
  /* phase 4 · a flatbread cut in half, one half cut again; the correction lays the small pieces on the half and into a whole */
  const nameOf = (p: any) => (p.u1 - p.u0 > 0.4 ? [1, 2] : [1, 4]);
  const sceneHalves = () => {
    const ps = cnPieces(GH, S.b, 8);
    const q = ps.filter((p: any) => p.u1 - p.u0 < 0.4), untouched = ps.filter((p: any) => p.u1 - p.u0 > 0.4)[0];
    const refB = cnEven(4), rp = cnPieces(GR, refB, 0);
    const laidWedge = (p: any, k: number) => <path key={k} d={cnWedge(untouched.ox, untouched.oy, GH.r, p.a0, p.a1)} fill={CONTENT.bead} fillOpacity={0.62} stroke={CN_INK} strokeWidth={3} strokeDasharray="10 8" />;
    return (
      <g>
        {cnWhole({ id: "flat", G: GH, b: S.b, taken: () => false, gap: 8, C })}
        {tb && (tb.lay || 0) >= 1 && untouched && q.length === 2 && (
          <g pointerEvents="none">{q.slice(0, tb.lay).map((p: any, k: number) => laidWedge({ a0: untouched.a0 + k * 90, a1: untouched.a0 + (k + 1) * 90 }, k))}</g>
        )}
        {tb && tb.whole !== undefined && tb.whole >= 0 && (
          <g pointerEvents="none">
            {rp.slice(0, tb.whole).map((p: any) => (
              <g key={p.i}>
                <defs><clipPath id={"cn-ref-" + p.i}><path d={p.d} /></clipPath></defs>
                <path d={p.d} fill="url(#gTen)" />
                <Skin name="disc" x={GR.cx - GR.r} y={GR.cy - GR.r} w={2 * GR.r} h={2 * GR.r} clip={"url(#cn-ref-" + p.i + ")"} />
                <path d={p.d} fill={CONTENT.bead} fillOpacity={0.5} stroke={CN_INK} strokeWidth={3} />
                <text x={p.cx} y={p.cy + 13} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={INK}>{p.i + 1}</text>
              </g>
            ))}
            <circle cx={GR.cx} cy={GR.cy} r={GR.r} fill="none" stroke={CONTENT.one} strokeWidth={5} strokeDasharray="14 10" />
          </g>
        )}
        {tb && tb.names && !solved && <CnFrac x={GR.cx} y={GR.cy + GR.r + 62} a={1} b={4} size={T.xl} ink={INK} />}
        {tb && tb.names && ps.map((p: any) => <CnFrac key={p.i} x={p.cx} y={p.cy - (p.u1 - p.u0 > 0.4 ? 58 : 2)} a={nameOf(p)[0]} b={nameOf(p)[1]} size={T.label} ink={INK} />)}
      </g>
    );
  };
  /* phase 4 · a field in halves, one half in two quarters: the two quarters lie on the half they came from */
  const sceneField = () => {
    const hw = F.w / 2, gp = 5;
    const lay = (k: number) => <rect key={k} x={F.x + gp + k * hw} y={F.y + gp} width={hw - 2 * gp} height={F.h / 2 - 2 * gp} rx={10} fill={CONTENT.bead} fillOpacity={0.62} stroke={CN_INK} strokeWidth={3} strokeDasharray="10 8" />;
    const rowY = 440;
    return (
      <g>
        <rect x={F.x} y={F.y} width={F.w} height={F.h / 2 - 3} rx={RAD.piece} fill="url(#gTen)" stroke={CN_INK} strokeWidth={4} />
        {[0, 1].map((k: number) => <rect key={k} x={F.x + k * (hw + 3)} y={F.y + F.h / 2 + 3} width={hw - 3} height={F.h / 2 - 3} rx={RAD.piece} fill="url(#gTen)" stroke={CN_INK} strokeWidth={4} />)}
        {tb && (tb.lay || 0) >= 1 && <g pointerEvents="none">{[0, 1].slice(0, tb.lay).map(lay)}</g>}
        {tb && (tb.row || 0) >= 1 && (
          <g pointerEvents="none">
            <CnFrac x={F.x + 40} y={rowY} a={1} b={4} size={T.xl} ink={INK} />
            <text x={F.x + 112} y={rowY + 18} textAnchor="middle" fontSize={T.xl} fontWeight={600} fill={INK}>+</text>
            <CnFrac x={F.x + 184} y={rowY} a={1} b={4} size={T.xl} ink={INK} />
            {(tb.row || 0) >= 2 && <text x={F.x + 256} y={rowY + 18} textAnchor="middle" fontSize={T.xl} fontWeight={600} fill={INK}>=</text>}
            {(tb.row || 0) >= 2 && <CnFrac x={F.x + 328} y={rowY} a={1} b={2} size={T.xl} ink={INK} />}
          </g>
        )}
      </g>
    );
  };
  /* phase 4 · three halves; Cut cuts each in two, the correction counts the pieces */
  const sceneThree = () => {
    const cut = S.cut || (tb && tb.count !== undefined);
    const b = cut ? [0, 0.5, 1] : [0, 1];
    const cnt = tb ? tb.count || 0 : 0;
    return (
      <g>
        {Array.from({ length: it.halves }).map((_: any, k: number) => {
          const g = halvesG(k), ps = cnPieces(g, b, cut ? 6 : 0);
          return (
            <g key={k}>
              {cnWhole({ id: "h" + k, G: g, b, gap: cut ? 6 : 0, C })}
              {!cut && <CnFrac x={g.cx} y={g.cy - 46} a={1} b={2} size={T.label} ink={INK} />}
              {cut && ps.map((p: any) => cnt > k * 2 + p.i && (
                <text key={p.i} x={p.cx} y={p.cy + 14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={TAKEN}>{k * 2 + p.i + 1}</text>
              ))}
            </g>
          );
        })}
        {tb && tb.total && cnChip({ x: halvesG(1).cx, y: 372, text: tx("6 quarters"), C, w: 250 })}
        {!cut && live && keyBtn("cut", "Cut", halvesG(1).cx, async () => {
          if (actBusy.current) return;
          const gs = [0, 1, 2].slice(0, it.halves).map((k: number) => { const p = cnPol(halvesG(k).cx, halvesG(k).cy, halvesG(k).r * 0.6, 0); return { x: p[0], y: p[1] }; });
          actBusy.current = true;
          const ok = await api.act({ tool: "knife", moves: "slice", ms: 1100, at: gs });
          actBusy.current = false;
          if (ok) { put({ cut: true, touched: true }); api.sfx.settle(); }
        })}
      </g>
    );
  };

  /* ── the warm-ups ── */
  const sceneWarm1 = () => {
    const lines = S.shown;
    const ps = cnPieces(G1, S.b, 0);
    return (
      <g>
        {cnWhole({ id: "w1", G: G1, b: S.b, taken: (i: number) => S.taken.indexOf(i) >= 0, C, lines })}
        {S.cutDone && live && lines === undefined && takeTaps(G1, S.b, "piece-", false)}
        {!S.cutDone && live && keyBtn("cut", "Cut", G1.x + G1.w / 2, cutWarm1)}
        {stepOn === "cut" && !S.cutDone && <Invite x={G1.x + G1.w / 2} y={keyY + KH / 2} w={KW} h={KH} rx={RAD.key} C={C} />}
        {stepOn === "shade" && S.cutDone && ps[0] && <Invite x={ps[0].cx} y={ps[0].cy} w={ps[0].w - 16} h={ps[0].h - 16} rx={10} C={C} />}
        {S.cutDone && S.taken.length > 0 && live && lines === undefined && (
          <g>
            <Hit id="upper" x={cardX + 20} y={cardY + 22} w={CW - 40} h={(CH - 70) / 2} onPress={() => nameBox("upper")} label="Upper number of the card" />
            <Hit id="lower" x={cardX + 20} y={cardY + 22 + (CH - 70) / 2 + 26} w={CW - 40} h={(CH - 70) / 2} onPress={() => nameBox("lower")} label="Lower number of the card" />
          </g>
        )}
        {S.named.upper && <text x={cardX - 16} y={cardY + 22 + (CH - 70) / 4 + 12} textAnchor="end" fontSize={T.label} fontWeight={700} fill={TAKEN}>{tx("numerator")}</text>}
        {S.named.lower && <text x={cardX - 16} y={cardY + 22 + (CH - 70) / 2 + 26 + (CH - 70) / 4 + 12} textAnchor="end" fontSize={T.label} fontWeight={700} fill={INK}>{tx("denominator")}</text>}
        {stepOn === "upper" && <Invite x={cardX + CW / 2} y={cardY + 22 + (CH - 70) / 4} w={CW - 40} h={(CH - 70) / 2} rx={14} C={C} />}
        {stepOn === "lower" && <Invite x={cardX + CW / 2} y={cardY + 22 + (CH - 70) / 2 + 26 + (CH - 70) / 4} w={CW - 40} h={(CH - 70) / 2} rx={14} C={C} />}
      </g>
    );
  };
  const sceneWarm2 = () => {
    const b = S.cutDone ? cnUnits(MODEL.warm.strip) : [0, 1], ps = cnPieces(G2, b, 0);
    const act2 = !S.cutDone ? "cut" : !S.measured ? "measure" : "";
    return (
      <g>
        {cnWhole({ id: "w2", G: G2, b, C, lines: S.shown })}
        {S.measured && ps.map((p: any, k: number) => <text key={k} x={p.cx} y={G2.y + G2.h + 70} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={INK}>{MODEL.warm.strip[k] + " " + tx("cm")}</text>)}
        {S.measured && <line x1={G2.x - 10} y1={G2.y + G2.h + 18} x2={G2.x + G2.w + 10} y2={G2.y + G2.h + 18} stroke={INK} strokeWidth={4} />}
        {act2 && live && keyBtn(act2, act2 === "cut" ? "Cut" : "Measure", G2.x + G2.w / 2, act2 === "cut" ? cutWarm2 : measureWarm)}
        {stepOn && act2 === stepOn && <Invite x={G2.x + G2.w / 2} y={keyY + KH / 2} w={KW} h={KH} rx={RAD.key} C={C} />}
      </g>
    );
  };
  const sceneWarm4 = () => {
    const ps = cnPieces(GW4, S.b, 8);
    return (
      <g>
        {cnWhole({ id: "w4", G: GW4, b: S.b, taken: () => false, gap: 8, sel: S.cutDone ? -1 : S.sel, C })}
        {!S.cutDone && live && ps.map((p: any) => <CnPieceTap key={p.i} id={"half-" + p.i} d={p.d} label={"Half " + (p.i + 1)} onPress={() => pickHalf(p.i)} />)}
        {!S.cutDone && live && keyBtn("cut", "Cut again", Math.round(W0 / 2), cutAgain, S.sel < 0)}
        {stepOn === "pick" && ps[1] && <Invite x={ps[1].cx} y={ps[1].cy} r={56} C={C} />}
        {stepOn === "cut" && !S.cutDone && <Invite x={Math.round(W0 / 2)} y={keyY + KH / 2} w={KW} h={KH} rx={RAD.key} C={C} />}
      </g>
    );
  };

  /* ── Free play ── */
  const sceneFree = () => {
    const nn = S.fn, cutting = S.shown;
    const taps = S.cutDone && cutting === undefined ? takeTaps(GFree, S.b, "take-", true) : null;
    return (
      <g>
        <Key id="free-bar" label="Bar" x={0} y={8} w={140} h={72} C={C} tone="key" primary={S.fw === "bar"} onClick={() => freeSet({ fw: "bar" })}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={S.fw === "bar" ? "#FFFFFF" : toneInk("key", C.ink)}>{tx("Bar")}</text>
        </Key>
        <Key id="free-round" label="Round" x={152} y={8} w={170} h={72} C={C} tone="key" primary={S.fw === "disc"} onClick={() => freeSet({ fw: "disc", fn: Math.min(S.fn, MODEL.free.disc) })}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={S.fw === "disc" ? "#FFFFFF" : toneInk("key", C.ink)}>{tx("Round")}</text>
        </Key>
        <Key id="free-fewer" label="Fewer parts" x={366} y={8} w={72} h={72} C={C} tone="key" disabled={nn <= 2} onClick={() => freeSet({ fn: nn - 1 })}>
          <text y={13} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={toneInk("key", C.ink)}>{"−"}</text>
        </Key>
        <rect x={450} y={8} width={110} height={72} rx={RAD.key} fill={mix(C.panel, "#FFFFFF", 0.3)} stroke={C.rule} strokeWidth={3} />
        <text x={505} y={8 + 36 + 14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={INK}>{nn}</text>
        <Key id="free-more" label="More parts" x={572} y={8} w={72} h={72} C={C} tone="key" disabled={nn >= fmax} onClick={() => freeSet({ fn: nn + 1 })}>
          <text y={13} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={toneInk("key", C.ink)}>+</text>
        </Key>
        {cnWhole({ id: "free", G: GFree, b: S.b, taken: (i: number) => S.taken.indexOf(i) >= 0, C, gap: 0, lines: cutting })}
        {taps}
        {!S.cutDone && keyBtn("cut", "Cut", S.fw === "disc" ? Math.round(W0 / 2) : GFB.x + GFB.w / 2, freeCut)}
        {!S.touched && !S.cutDone && <Invite x={(S.fw === "disc" ? Math.round(W0 / 2) : GFB.x + GFB.w / 2)} y={keyY + KH / 2} w={KW} h={KH} rx={RAD.key} C={C} />}
      </g>
    );
  };

  return (
    <g>
      {free ? sceneFree()
        : kind === "warm1" ? sceneWarm1()
          : kind === "warm2" ? sceneWarm2()
            : kind === "warm3" || kind === "sort" ? sceneSort()
              : kind === "warm4" ? sceneWarm4()
                : kind === "bar" ? sceneBar()
                  : kind === "which" ? sceneWhich()
                    : kind === "equal" ? sceneEqual()
                      : kind === "halves" ? sceneHalves()
                        : kind === "field" ? sceneField()
                          : kind === "three" ? sceneThree() : null}
      {(kind === "bar" || kind === "which" || kind === "halves" || kind === "field" || kind === "warm1" || free) && drawCard()}
      {kind === "sort" && stage === "ask" && !S.touched && cards[0] && <Invite x={cardPos(0).x + sCW / 2} y={cardPos(0).y + sCH / 2} w={sCW} h={sCH} rx={16} C={C} />}
      {kind === "warm3" && stepOn === "drop" && <Invite x={cardPos(0).x + sCW / 2} y={cardPos(0).y + sCH / 2} w={sCW} h={sCH} rx={16} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, it, shared } (item is the INDEX; it is the item itself from r24) */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last ? result.last : null;
  if (!last || last.value === null || last.value === undefined) return null;
  const q: any = it || (PHASES[(n || 1) - 1] && PHASES[(n || 1) - 1].items[last.item]) || {};
  const ink = C.ink;
  /* the thumbnail draws what the child made and writes no word: digits and signs only, so it reads in every language */
  const frame = <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />;
  if (q.kind === "sort") {
    const got = cnRead(last.value), t = (q.trays || []).filter((x: string) => got[x])[0];
    const cs = t && got[t] ? got[t].split(" ").slice(0, 4) : [];
    return (
      <g>
        {frame}
        <rect x={12} y={8} width={w - 24} height={h - 16} rx={10} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="8 6" />
        {cs.map((c: string, j: number) => <CnFrac key={j} x={40 + j * 52} y={h / 2} a={c.split("/")[0]} b={c.split("/")[1]} size={T.micro} ink={ink} />)}
      </g>
    );
  }
  if (q.kind === "which") {
    return (
      <g>
        {frame}
        <CnFrac x={w / 2} y={h / 2 + 4} a={q.frac[0]} b={q.frac[1]} size={T.micro} ink={ink} />
        <rect x={w / 2 - 26} y={h / 2 - 32} width={52} height={34} rx={8} fill="none" stroke={CONTENT.hundred} strokeWidth={3} />
      </g>
    );
  }
  if (q.sheets) {
    const sel = String(last.value), bw = 96;
    return (
      <g>
        {frame}
        {q.sheets.map((sh: any, k: number) => {
          const b = cnUnits(sh.units), x = 16 + k * (bw + 24), on = sel === sh.id || sel === "both";
          return (
            <g key={sh.id}>
              {b.slice(0, -1).map((u0: number, i: number) => (
                <rect key={i} x={x + u0 * bw} y={h / 2 - 15} width={(b[i + 1] - u0) * bw} height={30} fill={on ? CONTENT.hundred : CONTENT.ten} stroke={CN_INK} strokeWidth={1.5} />
              ))}
              {on && <rect x={x - 4} y={h / 2 - 19} width={bw + 8} height={38} rx={4} fill="none" stroke={C.accent} strokeWidth={3} />}
            </g>
          );
        })}
      </g>
    );
  }
  if (q.way === "strip" || q.way === "cake") {
    const b = cnUnits(q.units);
    const ps = q.way === "strip" ? cnPieces({ kind: "bar", x: 16, y: h / 2 - 15, w: 150, h: 30 }, b, 0) : cnPieces({ kind: "disc", cx: 56, cy: h / 2, r: 27, from: 0, sweep: 360 }, b, 0);
    return (
      <g>
        {frame}
        {ps.map((p: any) => <path key={p.i} d={p.d} fill={CONTENT.ten} stroke={CN_INK} strokeWidth={1.5} />)}
        <text x={w - 40} y={h / 2 + 12} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={ink}>{"\u2260"}</text>
      </g>
    );
  }
  if (q.kind === "three") {
    const r = 24, base = h / 2 + 14;
    return (
      <g>
        {frame}
        {Array.from({ length: q.halves }).map((_: any, j: number) => (
          <g key={j}>
            <path d={cnWedge(40 + j * 60 - 2, base, r, -90, 0)} fill={CONTENT.ten} stroke={CN_INK} strokeWidth={1.5} />
            <path d={cnWedge(40 + j * 60 + 2, base, r, 0, 90)} fill={CONTENT.ten} stroke={CN_INK} strokeWidth={1.5} />
          </g>
        ))}
        <text x={w - 30} y={h / 2 + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={ink}>{String(last.value)}</text>
      </g>
    );
  }
  if (q.parts) {
    const p = slotPartsOf(last.value, 2);
    const bw = 130, bx = 16, by = h / 2 - 15, nn = q.kind === "bar" ? q.n : 4;
    return (
      <g>
        {frame}
        {Array.from({ length: nn }).map((_: any, i: number) => (
          <rect key={i} x={bx + (i * bw) / nn} y={by} width={bw / nn} height={30} fill={i < (q.kind === "bar" ? q.take : q.kind === "field" ? 2 : 1) ? CONTENT.hundred : CONTENT.ten} stroke={CN_INK} strokeWidth={1.5} />
        ))}
        <CnFrac x={w - 46} y={h / 2} a={p[0]} b={p[1]} size={T.micro} ink={ink} />
      </g>
    );
  }
  return (
    <g>
      {frame}
      <text x={w / 2} y={h / 2 + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={ink}>{String(last.value)}</text>
    </g>
  );
}

function CutAndName(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b): the working area is the whole card until the child taps the card to answer */
      board: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d, PATTERNS.md §16): no question bar, the working area is 64,108, 1472 x 520 and the key's corner is
         props.box.key; the question lives only in the bubble. */
      keyOnly: true,
      /* the wide keypad (PATTERNS.md 9g): the picture fits x 64 to 964 while the panel is open */
      bigPad: true,
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself; after a right answer the win picture waits for the Next key */
      nextKey: true,
      /* ANSWERING ON THE CARD (PATTERNS.md 9e): a fraction answer is written on the Fraction card the picture holds */
      cardAnswer: true,
      /* NAV DOTS (LAYOUT.md §1d): the phase bar becomes one small clickable dot per phase */
      navDots: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key */
      StartArt, START_HOOK,
      }} />
  );
}

export default CutAndName;
