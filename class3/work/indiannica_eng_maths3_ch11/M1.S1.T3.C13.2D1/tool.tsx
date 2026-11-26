/* ═══ M1.S1.T3.C13.2D1 · write_the_money · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists. THE LESSON IS SILENT (runtime r30): every line is printed on the bubble.
   THE NEW LOOK (keyOnly, navDots; docs/LAYOUT.md §1d-§1e, docs/PATTERNS.md §15-§16).
   NO imports in this file; only the five host hooks. Edit, never rewrite.

   The picture: a kraft price tag (the `pricetag` skin; its own jute string runs left, tied up to a thing on the
   shop shelf above it) holding Rs, a deep blue Rupees box, a fixed dot and a vermilion Paise box of two cells.
   P1  tap the box that holds the rupees / the paise (warm-up steps: the Rs 1 coin fills with ten 10 p tiles)
   P2  type the rupees and the paise ON the tag (cardAnswer, SLOT_DECIMAL-style parts, judged digit for digit)
   P3  the same, the paise always two digits (8.05, 3.40, 5.50)
   P4  words -> figures on the tag; figures -> words by tapping WORD TILES onto the shop board */

const TOOL_ID = "write_the_money";
const MEDIA_ID = "M1.S1.T3.C13.2D1";
const TOOL_NAME = "Write the Money";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

const OPENING = ["A price tag with two boxes and a dot between them, waiting to be filled."];
/* r44: not shown; kept for the sidecar */
const FINISH_LINE = "You wrote every amount with the dot in the right place.";
const FREE_LINE = "Free play: tap a box and type any price you like.";

const START_HOOK = "Where does the dot go when you write a price?";

/* colours of the chapter (NOTES.md 2026-11-12): deep blue = rupees, vermilion = paise, green = the answer */
const WM_BLUE = "#1D4E89", WM_BLUE_T = "#DCE7F5";
const WM_VERM = "#D2541E", WM_VERM_INK = "#A8441A", WM_VERM_T = "#FBE1D8";
const WM_GREEN = "#2E7D32";
const WM_KRAFT = "#DCC59A", WM_KRAFT_EDGE = "#A8875A", WM_JUTE = "#A98A5C";
const WM_PLAIN = "#6B5B45";            /* a box not yet named (phase 1 questions) */
const WM_SLATE = "#2F3B45", WM_CHALK = "#FFF6DD", WM_WOOD = "#B98A55";
/* the paise box's two cells, the rupees box, the dot: one geometry for Work, StartArt and the acts */
/* the tag is drawn in its own units (origin: the body's left, the skin's top; the skin 760 x 270, its string to x -255)
   and set on the board at scale k; G.r, G.p, G.body, G.end are in Work units (hits, acts), G.L in the tag's own */
const WM_L = { sx: -255, end: { x: -240, y: 113 }, rs: { x: 84, y: 172 }, dot: { x: 307, y: 172 },
  r: { x: 155, y: 86, w: 133, h: 124 }, p: { x: 326, y: 86, w: 156, h: 124 }, body: { x: 0, y: 8, w: 505, h: 254 } };
function wmGeo(W: number, kx: number, kMax: number, ty = 4) {
  const room = Math.min(W, kx);
  const k = Math.min(kMax, (room - 8) / 760), iw = 760 * k, ih = 270 * k;
  const ix = Math.max(4, Math.round((room - iw) / 2)), bl = ix + 255 * k;
  const X = (x: number) => bl + k * x, Y = (y: number) => ty + k * y;
  const R = (b: any) => ({ x: X(b.x), y: Y(b.y), w: b.w * k, h: b.h * k });
  /* the thing the tag is tied to stands on a shelf under the tag's own string (the skin's left third is only string) */
  const strY = ty + 0.42 * ih, shelfY = ty + ih - 4;
  return { bl, ty, k, X, Y, L: WM_L, tf: `translate(${bl} ${ty}) scale(${k})`, sx: X(WM_L.sx), end: { x: ix + 0.02 * iw, y: strY },
    r: R(WM_L.r), p: R(WM_L.p), body: R(WM_L.body), bottom: ty + ih, mid: X(252),
    zone: { x: ix + 6, w: 0.3 * iw, y: strY + 24, h: shelfY - strY - 24 }, shelfY, shelfR: bl - 14 };
}
const wmP2 = (p: number) => (p < 10 ? "0" + p : String(p));
const wmFig = (it: any) => it.amt[0] + "." + wmP2(it.amt[1]);
const wmWords = (v: any) => (Array.isArray(v) ? v.join(" ") : String(v ?? "")).trim().toLowerCase().replace(/\s+/g, " ");
/* the number words a word tile can carry (ids stay English; the label is wordsIn in the language in use) */
const WM_NUMV: any = { thirty: 30, sixty: 60, six: 6, "thirty-six": 36, three: 3 };
/* the shop-shelf things a tag hangs from: shown box w x h, plain colour */
const WM_OBJ: any = { ruler: [220, 44, "#E3C79A"], gluestick: [142, 120, "#E7B83A"], notebook: [114, 150, "#A27A4E"],
  marker: [200, 34, "#2B2B2B"], pencilbox: [200, 127, "#D9A93A"] };
const WM_PARTS = [{ label: "rupees", at: "dwhole" }, { label: "paise", at: "dpart" }];
const WM_FREE = { kind: "free", amt: [0, 0], obj: "ruler" };

/* Hindi and Gujarati (PATTERNS 11): keyed by the English, byte for byte; win lines, part labels and the card name are listed by hand */
const TR: any = {
  hi: {
    "Write the Money": "पैसे लिखो",
    "A price tag with two boxes and a dot between them, waiting to be filled.": "दाम की पर्ची पर दो खाने हैं और बीच में एक बिंदु है।",
    "Free play: tap a box and type any price you like.": "मुक्त खेल: एक खाना छुओ और कोई भी दाम लिखो।",
    "Where does the dot go when you write a price?": "दाम लिखते समय बिंदु कहाँ आता है?",
    "Rupees and paise: a hundred paise make a rupee": "रुपये और पैसे: सौ पैसे से एक रुपया बनता है",
    "The dot between the rupees and the paise": "रुपये और पैसे के बीच का बिंदु",
    "Two digits for paise": "पैसे के लिए दो अंक",
    "Saying and writing an amount in words and in figures": "रकम को शब्दों और अंकों में बोलना और लिखना",
    "A price has a rupees part and a paise part.": "दाम में एक रुपये वाला भाग और एक पैसे वाला भाग होता है।",
    "Tap the Rs 1 coin to see how many paise make one rupee.": "1 रुपये का सिक्का छुओ और देखो, कितने पैसे लगते हैं।",
    "Tap the round coin at the end of the row.": "सबसे आखिरी गोल सिक्का छुओ।",
    "Tap the deep blue box: it holds the rupees of the price.": "गहरा नीला खाना छुओ: इसमें दाम के रुपये हैं।",
    "Tap the box before the dot.": "बिंदु से पहले वाला खाना छुओ।",
    "Tap the orange-red box: it holds the paise of the price.": "नारंगी-लाल खाना छुओ: इसमें दाम के पैसे हैं।",
    "Tap the box with two cells.": "दो घरों वाला खाना छुओ।",
    "Look at the dot: it keeps the two parts apart.": "बिंदु को देखो: यह दोनों भागों को अलग रखता है।",
    "Rupees are whole coins and paise are small pieces, less than one coin.": "रुपये पूरे सिक्के हैं और पैसे छोटे भाग हैं, एक सिक्के से कम।",
    "A price has a rupees part and a paise part, and a hundred paise make one rupee.": "दाम में रुपये और पैसे होते हैं, और सौ पैसे से एक रुपया बनता है।",
    "You learned: a price has a rupees part and a paise part.": "तुमने सीखा: दाम में रुपये और पैसे के भाग होते हैं।",
    "Tap the box that shows the rupees of this ruler's price.": "इस स्केल के दाम में रुपये वाला खाना छुओ।",
    "Which box is the rupees?": "रुपये किस खाने में हैं?",
    "The rupees are the whole coins of the price.": "रुपये पूरे सिक्के होते हैं।",
    "Yes, 7 is the rupees part of the price.": "हाँ, 7 रुपये वाला भाग है।",
    "Now tap the box that shows the paise of the pencil box's price.": "अब पेंसिल बॉक्स के दाम में पैसे वाला खाना छुओ।",
    "Which box is the paise?": "पैसे किस खाने में हैं?",
    "The paise are the small part of the price.": "पैसे दाम का छोटा भाग होते हैं।",
    "Yes, 50 is the paise part.": "हाँ, 50 पैसे वाला भाग है।",
    "This notebook costs only 85 paise, so tap the box that shows its rupees.": "यह कॉपी सिर्फ 85 पैसे की है, इसके रुपये वाला खाना छुओ।",
    "How many rupees?": "कितने रुपये?",
    "85 paise is less than one whole rupee.": "85 पैसे एक पूरे रुपये से कम हैं।",
    "Yes, no whole rupee, only 85 paise.": "हाँ, कोई पूरा रुपया नहीं, सिर्फ 85 पैसे।",
    "The deep blue box holds the rupees and the orange-red box holds the paise.": "गहरे नीले खाने में रुपये और नारंगी-लाल खाने में पैसे हैं।",
    "Type the rupees, then tap the paise box and type the paise.": "पहले रुपये लिखो, फिर पैसे का खाना छूकर पैसे लिखो।",
    "Read the price as rupees first, then paise.": "दाम में पहले रुपये पढ़ो, फिर पैसे।",
    "The dot sits between the rupees and the paise.": "बिंदु रुपये और पैसे के बीच आता है।",
    "You learned: a dot sits between the rupees and the paise.": "तुमने सीखा: रुपये और पैसे के बीच बिंदु आता है।",
    "The board shows the glue stick's price in words, so write it on the tag.": "बोर्ड पर ग्लू स्टिक का दाम शब्दों में है, उसे पर्ची पर लिखो।",
    "Glue stick price?": "ग्लू स्टिक का दाम?",
    "Write all of the paise in the orange-red box.": "सारे पैसे नारंगी-लाल खाने में लिखो।",
    "Yes, Rs 16.80 has its dot between the boxes.": "हाँ, 16.80 रुपये में बिंदु दोनों खानों के बीच है।",
    "A marker costs 11 rupees and 40 paise, so write it in figures.": "एक मार्कर 11 रुपये 40 पैसे का है, इसे अंकों में लिखो।",
    "Marker price?": "मार्कर का दाम?",
    "The rupees go in the deep blue box.": "रुपये गहरे नीले खाने में जाते हैं।",
    "Yes, the marker costs Rs 11.40.": "हाँ, मार्कर 11.40 रुपये का है।",
    "A child wrote 9 rupees 20 paise as 920, so write it again with the dot.": "एक बच्चे ने 9 रुपये 20 पैसे को 920 लिखा, इसे बिंदु के साथ लिखो।",
    "9 rupees 20 paise?": "9 रुपये 20 पैसे?",
    "The dot keeps the 9 rupees apart from the paise.": "बिंदु 9 रुपये को पैसे से अलग रखता है।",
    "Yes, the dot is back in its place.": "हाँ, बिंदु अपनी जगह पर आ गया।",
    "The paise box has two cells, one for each digit.": "पैसे के खाने में दो घर हैं, हर अंक के लिए एक।",
    "Type the paise and look at both cells.": "पैसे लिखो और दोनों घर देखो।",
    "Each paise cell needs a digit, even a 0.": "पैसे के हर घर में एक अंक चाहिए, चाहे 0 हो।",
    "Paise always take two digits, so fifty paise is written 50, never just 5.": "पैसे हमेशा दो अंकों में लिखते हैं, पचास पैसे को 50 लिखते हैं, सिर्फ 5 नहीं।",
    "You learned: paise always take two digits, so 5 paise is 05.": "तुमने सीखा: पैसे हमेशा दो अंकों में, 5 पैसे यानी 05।",
    "A pencil box costs 8 rupees and 5 paise, so write its price on the tag.": "पेंसिल बॉक्स 8 रुपये 5 पैसे का है, इसका दाम पर्ची पर लिखो।",
    "8 rupees 5 paise?": "8 रुपये 5 पैसे?",
    "Count the cells: the paise always fill both.": "घर गिनो: पैसे हमेशा दोनों घर भरते हैं।",
    "Yes, Rs 8.05: both paise cells are full.": "हाँ, 8.05 रुपये: पैसे के दोनों घर भरे हैं।",
    "A ruler costs 6 rupees and 5 paise, so fill both paise cells.": "एक स्केल 6 रुपये 5 पैसे का है, पैसे के दोनों घर भरो।",
    "6 rupees 5 paise?": "6 रुपये 5 पैसे?",
    "Five paise is far less than fifty paise.": "पाँच पैसे पचास पैसे से बहुत कम हैं।",
    "Yes, Rs 6.05 has a 0 before the 5.": "हाँ, 6.05 रुपये में 5 से पहले 0 है।",
    "A child wrote 5 rupees 50 paise as Rs 5.5, so write it correctly.": "एक बच्चे ने 5 रुपये 50 पैसे को 5.5 लिखा, इसे सही लिखो।",
    "Write it right": "सही लिखो",
    "Look at the paise cells: 50 paise is five tens.": "पैसे के घर देखो: 50 पैसे यानी पाँच दहाई।",
    "Yes, Rs 5.50 has two digits of paise.": "हाँ, 5.50 रुपये में पैसे के दो अंक हैं।",
    "An amount can be said in words and written in figures.": "रकम को शब्दों में बोल सकते हैं और अंकों में लिख सकते हैं।",
    "Look at the colours: rupees in deep blue, paise in orange-red.": "रंग देखो: रुपये गहरे नीले में, पैसे नारंगी-लाल में।",
    "Read the deep blue box first, then the orange-red box.": "पहले गहरा नीला खाना पढ़ो, फिर नारंगी-लाल खाना।",
    "Words and figures name the same amount.": "शब्द और अंक, रकम एक ही।",
    "You learned: an amount in words and in figures is one amount.": "तुमने सीखा: शब्दों और अंकों में रकम एक ही है।",
    "The board says the notebook's price in words, so write it on the tag.": "बोर्ड पर कॉपी का दाम शब्दों में है, उसे पर्ची पर लिखो।",
    "Notebook price?": "कॉपी का दाम?",
    "Ten paise is written with two digits.": "दस पैसे दो अंकों में लिखे जाते हैं।",
    "Yes, the board and the tag both say Rs 48.10.": "हाँ, बोर्ड और पर्ची दोनों पर 48.10 रुपये है।",
    "Tap the word tiles in order to say the marker's price.": "मार्कर का दाम बोलने के लिए शब्द कार्ड क्रम से छुओ।",
    "Say it in words": "शब्दों में बोलो",
    "Say the rupees first, then the paise.": "पहले रुपये बोलो, फिर पैसे।",
    "Yes, thirty rupees sixty paise.": "हाँ, तीस रुपये साठ पैसे।",
    "Now say this whole rupee price with the tiles.": "अब पूरे रुपयों वाला यह दाम कार्डों से बोलो।",
    "Whole rupees in words": "पूरे रुपये शब्दों में",
    "Two zeros after the dot mean no paise at all.": "बिंदु के बाद दो शून्य का मतलब कोई पैसा नहीं।",
    "Yes, thirty-six rupees and no paise.": "हाँ, छत्तीस रुपये और कोई पैसा नहीं।",
    "Rupees": "रुपये",
    "Paise": "पैसे",
    "rupees": "रुपये",
    "paise": "पैसे",
    "100 paise": "100 पैसे",
    "price tag": "दाम की पर्ची",
    "Rs": "रु.",
    "less than 1 rupee": "1 रुपये से कम",
    "a child wrote": "बच्चे ने लिखा",
    "Now the paise box.": "अब पैसे का खाना।",
    "Now the rupees box.": "अब रुपये का खाना।",
    "Tap a placed word to take it back.": "रखा हुआ शब्द छूकर वापस लो।",
    "6 paise and 60 paise are different: which tile says 60?": "6 पैसे और 60 पैसे अलग हैं: कौन-सा कार्ड 60 कहता है?",
    "Read both digits of the paise together, a 6 and a 0.": "पैसे के दोनों अंक साथ पढ़ो, 6 और 0।",
    "10 p": "10 पै",
    "5 p": "5 पै",
    "Write 16, with no zero in front.": "16 लिखो, आगे शून्य नहीं।",
    "Write 11, with no zero in front.": "11 लिखो, आगे शून्य नहीं।",
    "Write 9, with no zero in front.": "9 लिखो, आगे शून्य नहीं।",
    "Write 8, with no zero in front.": "8 लिखो, आगे शून्य नहीं।",
    "Write 6, with no zero in front.": "6 लिखो, आगे शून्य नहीं।",
    "Write 5, with no zero in front.": "5 लिखो, आगे शून्य नहीं।",
    "Write 48, with no zero in front.": "48 लिखो, आगे शून्य नहीं।",
  },
  gu: {
    "Write the Money": "પૈસા લખો",
    "A price tag with two boxes and a dot between them, waiting to be filled.": "કિંમતની ચિઠ્ઠી પર બે ખાનાં છે અને વચ્ચે એક ટપકું છે.",
    "Free play: tap a box and type any price you like.": "મુક્ત રમત: એક ખાનું દબાવો અને કોઈ પણ કિંમત લખો.",
    "Where does the dot go when you write a price?": "કિંમત લખતી વખતે ટપકું ક્યાં આવે?",
    "Rupees and paise: a hundred paise make a rupee": "રૂપિયા અને પૈસા: સો પૈસાનો એક રૂપિયો થાય",
    "The dot between the rupees and the paise": "રૂપિયા અને પૈસા વચ્ચેનું ટપકું",
    "Two digits for paise": "પૈસા માટે બે અંક",
    "Saying and writing an amount in words and in figures": "રકમને શબ્દોમાં અને અંકોમાં બોલવી અને લખવી",
    "A price has a rupees part and a paise part.": "કિંમતમાં રૂપિયાનો ભાગ અને પૈસાનો ભાગ હોય છે.",
    "Tap the Rs 1 coin to see how many paise make one rupee.": "1 રૂપિયાનો સિક્કો દબાવો અને જુઓ કેટલા પૈસાનો એક રૂપિયો થાય.",
    "Tap the round coin at the end of the row.": "હારના છેડે આવેલો ગોળ સિક્કો દબાવો.",
    "Tap the deep blue box: it holds the rupees of the price.": "ઘેરું વાદળી ખાનું દબાવો: તેમાં કિંમતના રૂપિયા છે.",
    "Tap the box before the dot.": "ટપકા પહેલાંનું ખાનું દબાવો.",
    "Tap the orange-red box: it holds the paise of the price.": "નારંગી-લાલ ખાનું દબાવો: તેમાં કિંમતના પૈસા છે.",
    "Tap the box with two cells.": "બે ઘરવાળું ખાનું દબાવો.",
    "Look at the dot: it keeps the two parts apart.": "ટપકું જુઓ: તે બંને ભાગને અલગ રાખે છે.",
    "Rupees are whole coins and paise are small pieces, less than one coin.": "રૂપિયા આખા સિક્કા છે અને પૈસા નાના ભાગ છે, એક સિક્કાથી ઓછા.",
    "A price has a rupees part and a paise part, and a hundred paise make one rupee.": "કિંમતમાં રૂપિયા અને પૈસા હોય છે, અને સો પૈસાનો એક રૂપિયો થાય.",
    "You learned: a price has a rupees part and a paise part.": "તમે શીખ્યા: કિંમતમાં રૂપિયા અને પૈસાના ભાગ હોય છે.",
    "Tap the box that shows the rupees of this ruler's price.": "આ ફૂટપટ્ટીની કિંમતમાં રૂપિયાવાળું ખાનું દબાવો.",
    "Which box is the rupees?": "રૂપિયા કયું ખાનું છે?",
    "The rupees are the whole coins of the price.": "રૂપિયા એટલે આખા સિક્કા.",
    "Yes, 7 is the rupees part of the price.": "હા, 7 એ કિંમતનો રૂપિયાવાળો ભાગ છે.",
    "Now tap the box that shows the paise of the pencil box's price.": "હવે પેન્સિલ બોક્સની કિંમતમાં પૈસાવાળું ખાનું દબાવો.",
    "Which box is the paise?": "પૈસા કયું ખાનું છે?",
    "The paise are the small part of the price.": "પૈસા કિંમતનો નાનો ભાગ છે.",
    "Yes, 50 is the paise part.": "હા, 50 પૈસાનો ભાગ છે.",
    "This notebook costs only 85 paise, so tap the box that shows its rupees.": "આ નોટબુક માત્ર 85 પૈસાની છે, તેના રૂપિયાવાળું ખાનું દબાવો.",
    "How many rupees?": "કેટલા રૂપિયા?",
    "85 paise is less than one whole rupee.": "85 પૈસા એક આખા રૂપિયાથી ઓછા છે.",
    "Yes, no whole rupee, only 85 paise.": "હા, આખો રૂપિયો નથી, માત્ર 85 પૈસા.",
    "The deep blue box holds the rupees and the orange-red box holds the paise.": "ઘેરા વાદળી ખાનામાં રૂપિયા અને નારંગી-લાલ ખાનામાં પૈસા છે.",
    "Type the rupees, then tap the paise box and type the paise.": "પહેલાં રૂપિયા લખો, પછી પૈસાનું ખાનું દબાવી પૈસા લખો.",
    "Read the price as rupees first, then paise.": "કિંમતમાં પહેલાં રૂપિયા વાંચો, પછી પૈસા.",
    "The dot sits between the rupees and the paise.": "ટપકું રૂપિયા અને પૈસાની વચ્ચે આવે છે.",
    "You learned: a dot sits between the rupees and the paise.": "તમે શીખ્યા: રૂપિયા અને પૈસા વચ્ચે ટપકું આવે છે.",
    "The board shows the glue stick's price in words, so write it on the tag.": "બોર્ડ પર ગ્લુ સ્ટિકની કિંમત શબ્દોમાં છે, તેને ચિઠ્ઠી પર લખો.",
    "Glue stick price?": "ગ્લુ સ્ટિકની કિંમત?",
    "Write all of the paise in the orange-red box.": "પૈસા નારંગી-લાલ ખાનામાં લખો.",
    "Yes, Rs 16.80 has its dot between the boxes.": "હા, 16.80 રૂપિયામાં ટપકું બંને ખાનાં વચ્ચે છે.",
    "A marker costs 11 rupees and 40 paise, so write it in figures.": "એક માર્કર 11 રૂપિયા 40 પૈસાનું છે, તેને અંકોમાં લખો.",
    "Marker price?": "માર્કરની કિંમત?",
    "The rupees go in the deep blue box.": "રૂપિયા ઘેરા વાદળી ખાનામાં જાય છે.",
    "Yes, the marker costs Rs 11.40.": "હા, માર્કર 11.40 રૂપિયાનું છે.",
    "A child wrote 9 rupees 20 paise as 920, so write it again with the dot.": "એક બાળકે 9 રૂપિયા 20 પૈસાને 920 લખ્યું, તેને ટપકા સાથે લખો.",
    "9 rupees 20 paise?": "9 રૂપિયા 20 પૈસા?",
    "The dot keeps the 9 rupees apart from the paise.": "ટપકું 9 રૂપિયાને પૈસાથી અલગ રાખે છે.",
    "Yes, the dot is back in its place.": "હા, ટપકું પોતાની જગ્યાએ આવી ગયું.",
    "The paise box has two cells, one for each digit.": "પૈસાના ખાનામાં બે ઘર છે, દરેક અંક માટે એક.",
    "Type the paise and look at both cells.": "પૈસા લખો અને બંને ઘર જુઓ.",
    "Each paise cell needs a digit, even a 0.": "પૈસાના દરેક ઘરમાં એક અંક જોઈએ, ભલે 0 હોય.",
    "Paise always take two digits, so fifty paise is written 50, never just 5.": "પૈસા હંમેશાં બે અંકમાં લખાય, પચાસ પૈસાને 50 લખાય, માત્ર 5 નહીં.",
    "You learned: paise always take two digits, so 5 paise is 05.": "તમે શીખ્યા: પૈસા હંમેશાં બે અંકમાં, 5 પૈસા એટલે 05.",
    "A pencil box costs 8 rupees and 5 paise, so write its price on the tag.": "પેન્સિલ બોક્સ 8 રૂપિયા 5 પૈસાનું છે, તેની કિંમત ચિઠ્ઠી પર લખો.",
    "8 rupees 5 paise?": "8 રૂપિયા 5 પૈસા?",
    "Count the cells: the paise always fill both.": "ઘર ગણો: પૈસા હંમેશાં બંને ઘર ભરે છે.",
    "Yes, Rs 8.05: both paise cells are full.": "હા, 8.05 રૂપિયા: પૈસાનાં બંને ઘર ભરેલાં છે.",
    "A ruler costs 6 rupees and 5 paise, so fill both paise cells.": "એક ફૂટપટ્ટી 6 રૂપિયા 5 પૈસાની છે, પૈસાનાં બંને ઘર ભરો.",
    "6 rupees 5 paise?": "6 રૂપિયા 5 પૈસા?",
    "Five paise is far less than fifty paise.": "પાંચ પૈસા પચાસ પૈસાથી ઘણા ઓછા છે.",
    "Yes, Rs 6.05 has a 0 before the 5.": "હા, 6.05 રૂપિયામાં 5 પહેલાં 0 છે.",
    "A child wrote 5 rupees 50 paise as Rs 5.5, so write it correctly.": "એક બાળકે 5 રૂપિયા 50 પૈસાને 5.5 લખ્યું, તેને સાચું લખો.",
    "Write it right": "સાચું લખો",
    "Look at the paise cells: 50 paise is five tens.": "પૈસાનાં ઘર જુઓ: 50 પૈસા એટલે પાંચ દશક.",
    "Yes, Rs 5.50 has two digits of paise.": "હા, 5.50 રૂપિયામાં પૈસાના બે અંક છે.",
    "An amount can be said in words and written in figures.": "રકમને શબ્દોમાં બોલી શકાય અને અંકોમાં લખી શકાય.",
    "Look at the colours: rupees in deep blue, paise in orange-red.": "રંગ જુઓ: રૂપિયા ઘેરા વાદળીમાં, પૈસા નારંગી-લાલમાં.",
    "Read the deep blue box first, then the orange-red box.": "પહેલાં ઘેરું વાદળી ખાનું વાંચો, પછી નારંગી-લાલ ખાનું.",
    "Words and figures name the same amount.": "શબ્દો અને અંકો એક જ રકમ બતાવે છે.",
    "You learned: an amount in words and in figures is one amount.": "તમે શીખ્યા: શબ્દોમાં અને અંકોમાં રકમ એક જ છે.",
    "The board says the notebook's price in words, so write it on the tag.": "બોર્ડ પર નોટબુકની કિંમત શબ્દોમાં છે, તેને ચિઠ્ઠી પર લખો.",
    "Notebook price?": "નોટબુકની કિંમત?",
    "Ten paise is written with two digits.": "દસ પૈસા બે અંકમાં લખાય છે.",
    "Yes, the board and the tag both say Rs 48.10.": "હા, બોર્ડ અને ચિઠ્ઠી બંને પર 48.10 રૂપિયા છે.",
    "Tap the word tiles in order to say the marker's price.": "માર્કરની કિંમત બોલવા શબ્દ કાર્ડ ક્રમમાં દબાવો.",
    "Say it in words": "શબ્દોમાં બોલો",
    "Say the rupees first, then the paise.": "પહેલાં રૂપિયા બોલો, પછી પૈસા.",
    "Yes, thirty rupees sixty paise.": "હા, ત્રીસ રૂપિયા સાઠ પૈસા.",
    "Now say this whole rupee price with the tiles.": "હવે આખા રૂપિયાવાળી આ કિંમત કાર્ડથી બોલો.",
    "Whole rupees in words": "આખા રૂપિયા શબ્દોમાં",
    "Two zeros after the dot mean no paise at all.": "ટપકા પછી બે શૂન્ય એટલે કોઈ પૈસા નહીં.",
    "Yes, thirty-six rupees and no paise.": "હા, છત્રીસ રૂપિયા અને કોઈ પૈસા નહીં.",
    "Rupees": "રૂપિયા",
    "Paise": "પૈસા",
    "rupees": "રૂપિયા",
    "paise": "પૈસા",
    "100 paise": "100 પૈસા",
    "price tag": "કિંમતની ચિઠ્ઠી",
    "Rs": "રૂ.",
    "less than 1 rupee": "1 રૂપિયાથી ઓછા",
    "a child wrote": "બાળકે લખ્યું",
    "Now the paise box.": "હવે પૈસાનું ખાનું.",
    "Now the rupees box.": "હવે રૂપિયાનું ખાનું.",
    "Tap a placed word to take it back.": "મૂકેલો શબ્દ દબાવી પાછો લો.",
    "6 paise and 60 paise are different: which tile says 60?": "6 પૈસા અને 60 પૈસા જુદા છે: કયું કાર્ડ 60 કહે છે?",
    "Read both digits of the paise together, a 6 and a 0.": "પૈસાના બંને અંક સાથે વાંચો, 6 અને 0.",
    "10 p": "10 પૈ",
    "5 p": "5 પૈ",
    "Write 16, with no zero in front.": "16 લખો, આગળ શૂન્ય નહીં.",
    "Write 11, with no zero in front.": "11 લખો, આગળ શૂન્ય નહીં.",
    "Write 9, with no zero in front.": "9 લખો, આગળ શૂન્ય નહીં.",
    "Write 8, with no zero in front.": "8 લખો, આગળ શૂન્ય નહીં.",
    "Write 6, with no zero in front.": "6 લખો, આગળ શૂન્ય નહીં.",
    "Write 5, with no zero in front.": "5 લખો, આગળ શૂન્ય નહીં.",
    "Write 48, with no zero in front.": "48 લખો, આગળ શૂન્ય નહીં.",
  },
};

const PHASES = [
  {
    n: 1,
    concept: "Rupees and paise: a hundred paise make a rupee",
    conceptId: "M1.S1.T3.C10", objectiveIds: ["O3"],
    says: ["A price has a rupees part and a paise part."],
    /* the warm-up tag (none of the phase's answers) */
    warm: { kind: "warm", amt: [12, 60], obj: "ruler" },
    steps: [
      { say: "Tap the Rs 1 coin to see how many paise make one rupee.", on: "coin", hint: "Tap the round coin at the end of the row." },
      { say: "Tap the deep blue box: it holds the rupees of the price.", on: "rupees", hint: "Tap the box before the dot." },
      { say: "Tap the orange-red box: it holds the paise of the price.", on: "paise", hint: "Tap the box with two cells." },
    ],
    ladder: ["Look at the dot: it keeps the two parts apart.", "Rupees are whole coins and paise are small pieces, less than one coin."],
    closing: "A price has a rupees part and a paise part, and a hundred paise make one rupee.",
    learned: "You learned: a price has a rupees part and a paise part.",
    traceback: "The paise of the price fill the row of 10 p tiles, less than the Rs 1 coin, and the dot pulses; no box is lit.",
    items: [
      /* learn WM1: answer in the plan = 7 is the rupees and 35 is the paise. 100 paise make 1 rupee. (the tap names the rupees box: 7) */
      { qid: "M1.S1.T3.C10:WM1", kind: "tap", side: "r", amt: [7, 35], obj: "ruler", pad: "enter", answer: 7, near: 35,
        say: "Tap the box that shows the rupees of this ruler's price.", ask: "Which box is the rupees?",
        miss: "The rupees are the whole coins of the price.", win: "Yes, 7 is the rupees part of the price." },
      /* practice 1: answer in the plan = 23 is the rupees and 50 is the paise (asked: the paise, 50) */
      { qid: "M1.S1.T3.C10:1", kind: "tap", side: "p", amt: [23, 50], obj: "pencilbox", pad: "enter", answer: 50, near: 23,
        say: "Now tap the box that shows the paise of the pencil box's price.", ask: "Which box is the paise?",
        miss: "The paise are the small part of the price.", win: "Yes, 50 is the paise part." },
      /* practice 7 (moved here from phase 4): answer in the plan = Rs 0.85, because 85 paise is Rs 0.85. There are 0 rupees */
      { qid: "M1.S1.T3.C13:7", kind: "tap", side: "r", amt: [0, 85], obj: "notebook", pad: "enter", answer: 0, near: 85,
        say: "This notebook costs only 85 paise, so tap the box that shows its rupees.", ask: "How many rupees?",
        miss: "85 paise is less than one whole rupee.", win: "Yes, no whole rupee, only 85 paise." },
    ],
  },
  {
    n: 2,
    concept: "The dot between the rupees and the paise",
    conceptId: "M1.S1.T3.C11", objectiveIds: ["O3"],
    says: ["The deep blue box holds the rupees and the orange-red box holds the paise."],
    ladder: ["Type the rupees, then tap the paise box and type the paise.", "Read the price as rupees first, then paise."],
    closing: "The dot sits between the rupees and the paise.",
    learned: "You learned: a dot sits between the rupees and the paise.",
    traceback: "The deep blue box glows, the dot pulses, then both paise cells light, empty, for the child to fill.",
    items: [
      /* learn WM2: answer in the plan = Rs 16.80 */
      { qid: "M1.S1.T3.C11:WM2", kind: "type", amt: [16, 80], obj: "gluestick", parts: WM_PARTS, cardName: "price tag", zero: "Write 16, with no zero in front.", answer: ["16", "80"], near: "16|8", given: "board",
        say: "The board shows the glue stick's price in words, so write it on the tag.", ask: "Glue stick price?",
        miss: "Write all of the paise in the orange-red box.", win: "Yes, Rs 16.80 has its dot between the boxes." },
      /* practice 2: answer in the plan = Rs 11.40, because Rs 11 and 40 paise is Rs 11.40 */
      { qid: "M1.S1.T3.C11:2", kind: "type", amt: [11, 40], obj: "marker", parts: WM_PARTS, cardName: "price tag", zero: "Write 11, with no zero in front.", answer: ["11", "40"], near: "40|11",
        say: "A marker costs 11 rupees and 40 paise, so write it in figures.", ask: "Marker price?",
        miss: "The rupees go in the deep blue box.", win: "Yes, the marker costs Rs 11.40." },
      /* practice 5: answer in the plan = The dot is missing. The price is Rs 9.20, because Rs 9 and 20 paise is Rs 9.20 */
      { qid: "M1.S1.T3.C11:5", kind: "type", amt: [9, 20], obj: "notebook", parts: WM_PARTS, cardName: "price tag", zero: "Write 9, with no zero in front.", answer: ["9", "20"], near: "92|0", given: "slip", slip: "920",
        say: "A child wrote 9 rupees 20 paise as 920, so write it again with the dot.", ask: "9 rupees 20 paise?",
        miss: "The dot keeps the 9 rupees apart from the paise.", win: "Yes, the dot is back in its place." },
    ],
  },
  {
    n: 3,
    concept: "Two digits for paise",
    conceptId: "M1.S1.T3.C12", objectiveIds: ["O4"],
    says: ["The paise box has two cells, one for each digit."],
    ladder: ["Type the paise and look at both cells.", "Each paise cell needs a digit, even a 0."],
    closing: "Paise always take two digits, so fifty paise is written 50, never just 5.",
    learned: "You learned: paise always take two digits, so 5 paise is 05.",
    traceback: "The deep blue box glows, the dot pulses, then both paise cells light: the paise always fill two cells.",
    items: [
      /* learn WM3: answer in the plan = Rs 4.09 (the owner, 2026-11-12: paise in fives, his example Rs 8.05) */
      { qid: "M1.S1.T3.C12:WM3", kind: "type", amt: [8, 5], obj: "pencilbox", parts: WM_PARTS, cardName: "price tag", zero: "Write 8, with no zero in front.", answer: ["8", "05"], near: "8|5",
        say: "A pencil box costs 8 rupees and 5 paise, so write its price on the tag.", ask: "8 rupees 5 paise?",
        miss: "Count the cells: the paise always fill both.", win: "Yes, Rs 8.05: both paise cells are full." },
      /* practice 3: answer in the plan = Rs 2.07, because 7 paise is written 07 (owner's ranges, paise in fives: Rs 6.05) */
      { qid: "M1.S1.T3.C12:3", kind: "type", amt: [6, 5], obj: "ruler", parts: WM_PARTS, cardName: "price tag", zero: "Write 6, with no zero in front.", answer: ["6", "05"], near: "6|5",
        say: "A ruler costs 6 rupees and 5 paise, so fill both paise cells.", ask: "6 rupees 5 paise?",
        miss: "Five paise is far less than fifty paise.", win: "Yes, Rs 6.05 has a 0 before the 5." },
      /* practice 6: answer in the plan = 6 paise is written 06, so the price is Rs 13.06 (the owner's example instead: Rs 5.5 -> Rs 5.50) */
      { qid: "M1.S1.T3.C12:6", kind: "type", amt: [5, 50], obj: "gluestick", parts: WM_PARTS, cardName: "price tag", zero: "Write 5, with no zero in front.", answer: ["5", "50"], near: "5|5", given: "slip", slip: "Rs 5.5",
        say: "A child wrote 5 rupees 50 paise as Rs 5.5, so write it correctly.", ask: "Write it right",
        miss: "Look at the paise cells: 50 paise is five tens.", win: "Yes, Rs 5.50 has two digits of paise." },
    ],
  },
  {
    n: 4,
    concept: "Saying and writing an amount in words and in figures",
    conceptId: "M1.S1.T3.C13", objectiveIds: ["O4"],
    says: ["An amount can be said in words and written in figures."],
    ladder: ["Look at the colours: rupees in deep blue, paise in orange-red.", "Read the deep blue box first, then the orange-red box."],
    closing: "Words and figures name the same amount.",
    learned: "You learned: an amount in words and in figures is one amount.",
    traceback: "The deep blue box glows, then the vermilion box: the rupees are read first, then the paise; the child's own tiles stay.",
    items: [
      /* learn WM4: answer in the plan = Rs 48.10 */
      { qid: "M1.S1.T3.C13:WM4", kind: "type", amt: [48, 10], obj: "notebook", parts: WM_PARTS, cardName: "price tag", zero: "Write 48, with no zero in front.", answer: ["48", "10"], near: "48|1", given: "board",
        say: "The board says the notebook's price in words, so write it on the tag.", ask: "Notebook price?",
        miss: "Ten paise is written with two digits.", win: "Yes, the board and the tag both say Rs 48.10." },
      /* practice 4: answer in the plan = Rs 30.60 (the owner: figures -> words by word tiles; turned round, the tag shows Rs 30.60) */
      { qid: "M1.S1.T3.C13:4", kind: "tiles", amt: [30, 60], obj: "marker", pad: "enter", answer: "thirty rupees sixty paise", near: "thirty rupees six paise",
        tiles: ["sixty", "rupees", "six", "thirty", "paise"],
        ladder: ["6 paise and 60 paise are different: which tile says 60?", "Read both digits of the paise together, a 6 and a 0."],
        say: "Tap the word tiles in order to say the marker's price.", ask: "Say it in words",
        miss: "Say the rupees first, then the paise.", win: "Yes, thirty rupees sixty paise." },
      /* practice 8: answer in the plan = There are no paise. The price is Rs 36, because Rs 36.00 is Rs 36 (said in word tiles) */
      { qid: "M1.S1.T3.C13:8", kind: "tiles", amt: [36, 0], obj: "pencilbox", pad: "enter", answer: "thirty-six rupees", near: "thirty-six paise",
        tiles: ["rupees", "six", "paise", "thirty-six", "three"],
        say: "Now say this whole rupee price with the tiles.", ask: "Whole rupees in words",
        miss: "Two zeros after the dot mean no paise at all.", win: "Yes, thirty-six rupees and no paise." },
    ],
  },
];

const MODEL = { tag: "Rs [rupees] . [paise, two cells]", colours: { rupees: WM_BLUE, paise: WM_VERM, answer: WM_GREEN }, paiseTile: "10 p" };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: P1 the box's number, P2-P4 the rupees by value and the paise digit for digit, P4 tiles the words in order */
const judge = (item: any, v: any) => {
  if (item.kind === "tiles") return wmWords(v) === item.answer;
  if (item.parts) { const r = slotPartsOf(v, 2)[0]; return !(r.length > 1 && r[0] === "0") && judgeSlotDecimal(item, v); }
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived from the item's amount by another route */
const WM_SAY: any = { 30: "thirty", 60: "sixty", 36: "thirty-six" };
const oracle = () => PHASES.every((p: any) => p.items.length === 3 && p.items.every((it: any) => {
  const [r, q] = it.amt;
  if (it.kind === "tap") return it.answer === (it.side === "r" ? r : q);
  if (it.kind === "type") return String(it.answer[0]) === String(r) && it.answer[1] === (q < 10 ? "0" + q : String(q)) && q % 5 === 0;
  if (it.kind === "tiles") return it.answer === [WM_SAY[r], "rupees"].concat(q ? [WM_SAY[q], "paise"] : []).join(" ");
  return false;
}));
const nearMiss = (item: any) => item.near;
const answerForms = (item: any) => (item.kind === "type" ? [wmFig(item), "Rs " + wmFig(item)]
  : item.kind === "tiles" ? [item.answer] : [String(item.answer)]);
/* a tap question's key names the box (so it is never typed on the digit keys); answer() reads its number */
const agentKey = (item: any) => (item.kind === "tap" ? (item.side === "r" ? "rupees box (" : "paise box (") + item.answer + ")" : item.answer);

const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── drawing helpers (called, never mounted) ─────────────────────────────────────────────── */

/* a thing on the shop shelf (its own photo, at its own aspect, as big as the zone allows), standing on the plank */
function wmObjBox(name: string, G: any) {
  const o = WM_OBJ[name] || WM_OBJ.ruler, z = G.zone, s = Math.min(z.w / o[0], z.h / o[1], 2.4);
  const w = o[0] * s, h = o[1] * s;
  return { x: z.x + (z.w - w) / 2, y: G.shelfY + 6 - h, w, h, c: o[2] };
}
function wmObject(name: string, G: any) {
  const b = wmObjBox(name, G), x = b.x, y = b.y, w = b.w, h = b.h;
  return (
    <g data-role="shelf-thing" filter="url(#wm-shadow-sm)">
      {/* the plain fallback sits inside the photo's outline (a photo has transparent corners), so it never shows round it */}
      {name === "gluestick"
        ? <rect x={x + w * 0.08} y={y + h * 0.36} width={w * 0.84} height={h * 0.28} rx={h * 0.14} transform={`rotate(38 ${x + w / 2} ${y + h / 2})`} fill={b.c} />
        : <rect x={x + w * (name === "pencilbox" ? 0.22 : 0.1)} y={y + h * (name === "pencilbox" ? 0.3 : 0.12)} width={w * (name === "pencilbox" ? 0.56 : 0.8)} height={h * (name === "pencilbox" ? 0.45 : 0.76)} rx={name === "marker" || name === "ruler" ? h * 0.3 : 8} fill={b.c} />}
      <Skin name={name} x={x} y={y} w={w} h={h} fit="stretch" />
      {name === "ruler" && Array.from({ length: 19 }, (_, i) => (
        <line key={i} x1={x + 8 + (i + 1) * ((w - 16) / 20)} y1={y + 6} x2={x + 8 + (i + 1) * ((w - 16) / 20)} y2={y + 6 + (i % 5 === 4 ? 22 : 12)}
          stroke="#4A3828" strokeWidth={2.5} strokeLinecap="round" />
      ))}
    </g>
  );
}
/* the shop shelf: a wooden plank with a top and a front edge, under the thing */
function wmShelf(G: any) {
  const y = G.shelfY, w = G.shelfR;
  return (
    <g data-role="shelf" filter="url(#wm-shadow-sm)">
      <rect x={0} y={y} width={w} height={20} fill="#C99A62" />
      <Skin name="shelf" x={0} y={y} w={w} h={20} fit="stretch" />
      <rect x={0} y={y + 20} width={w} height={16} fill="#8C6239" />
      <rect x={0} y={y + 20} width={w} height={3} fill="#000000" opacity={0.18} />
      <rect x={0} y={y} width={w} height={2} fill="#FFFFFF" opacity={0.35} />
    </g>
  );
}

/* the price tag: o = { r, p (strings), colour, heads, lit: { r, p }, neutral, C, tx, rInk?, pInk? } */
function wmTag(G: any, o: any) {
  const L = G.L, bl = 0, ty = 0, sx = L.sx, r = L.r, p = L.p, dot = L.dot, C = o.C, tx = o.tx;
  const blueEdge = o.neutral ? WM_PLAIN : WM_BLUE, vermEdge = o.neutral ? WM_PLAIN : WM_VERM;
  const dig = (s: string, k: number) => (s.length > 2 ? Math.min(T.display, Math.floor(118 / (s.length * 0.6))) : T.display);
  const rInk = o.rInk || (o.neutral ? C.ink : WM_BLUE), pInk = o.pInk || (o.neutral ? C.ink : WM_VERM_INK);
  const cw = p.w / 2;
  return (
    <g data-role="price-tag" transform={G.tf} filter="url(#wm-shadow)">
      {/* plain fallback: a kraft tag with its hole and a jute string */}
      <path d={`M ${bl + 2} ${ty + 70} L ${bl + 50} ${ty + 12} L ${bl + 497} ${ty + 12} Q ${bl + 505} ${ty + 12} ${bl + 505} ${ty + 20} L ${bl + 505} ${ty + 252} Q ${bl + 505} ${ty + 260} ${bl + 497} ${ty + 260} L ${bl + 50} ${ty + 260} L ${bl + 2} ${ty + 202} Z`}
        fill={WM_KRAFT} stroke={WM_KRAFT_EDGE} strokeWidth={3} />
      <path d={`M ${bl + 53} ${ty + 130} Q ${sx + 120} ${ty + 150} ${sx + 15} ${ty + 113}`} fill="none" stroke={WM_JUTE} strokeWidth={4} strokeLinecap="round" />
      <circle cx={bl + 53} cy={ty + 130} r={12} fill={C.paper} stroke={WM_KRAFT_EDGE} strokeWidth={3} />
      <Skin name="pricetag" x={sx} y={ty} w={760} h={270} fit="stretch" />
      
      {/* Rs label */}
      <text x={L.rs.x} y={L.rs.y} fontSize={T.xl} fontWeight={700} fill={C.ink} stroke="#FFFDF7" strokeWidth={2} paintOrder="stroke fill">Rs</text>
      
      {/* the Rupees box */}
      <rect x={r.x} y={r.y} width={r.w} height={r.h} rx={14} fill={o.lit && o.lit.r ? "#C9DAF0" : o.neutral ? "#FFFFFF" : WM_BLUE_T} stroke={blueEdge} strokeWidth={o.lit && o.lit.r ? 7 : 5} />
      <rect x={r.x + 2} y={r.y + 2} width={r.w - 4} height={r.h - 4} rx={12} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth={2} pointerEvents="none" />

      {/* the Paise box: two cells */}
      <rect x={p.x} y={p.y} width={p.w} height={p.h} rx={14} fill={o.lit && o.lit.p ? "#F8D3C5" : o.neutral ? "#FFFFFF" : WM_VERM_T} stroke={vermEdge} strokeWidth={o.lit && o.lit.p ? 7 : 5} />
      <rect x={p.x + 2} y={p.y + 2} width={p.w - 4} height={p.h - 4} rx={12} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth={2} pointerEvents="none" />
      <line x1={p.x + cw} y1={p.y + 10} x2={p.x + cw} y2={p.y + p.h - 10} stroke={vermEdge} strokeWidth={3} strokeDasharray="8 7" />
      {o.cellsLit && o.cellsLit.map((on: boolean, j: number) => on && (
        <rect key={"cl" + j} x={p.x + j * cw + 8} y={p.y + 8} width={cw - 16} height={p.h - 16} rx={10} fill="#F9C9B6" />
      ))}
      
      {/* the dot: fixed */}
      <circle cx={dot.x} cy={dot.y} r={o.dotGlow ? 13 : 10} fill={C.ink} />
      
      {o.heads && (
        <g pointerEvents="none">
          <text x={r.x + r.w / 2} y={ty + 74} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={WM_BLUE} stroke="#FFFDF7" strokeWidth={3} paintOrder="stroke fill">{tx("Rupees")}</text>
          <text x={p.x + p.w / 2} y={ty + 74} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={WM_VERM_INK} stroke="#FFFDF7" strokeWidth={3} paintOrder="stroke fill">{tx("Paise")}</text>
        </g>
      )}
      
      {o.r !== "" && <text x={r.x + r.w / 2} y={r.y + r.h / 2 + dig(o.r, 0) * 0.36} textAnchor="middle" fontSize={dig(o.r, 0)} fontWeight={700} fill={rInk} opacity={o.rGhost ? 0.45 : 1}>{o.r}</text>}
      {o.p !== "" && (
        <text y={p.y + p.h / 2 + T.display * 0.36} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={pInk}>
          {o.p.slice(0, 2).split("").map((ch: string, j: number) => <tspan key={"pd" + j} x={p.x + j * cw + cw / 2}>{ch}</tspan>)}
        </text>
      )}
      {o.nudge && <text x={330} y={248} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink} stroke="#FFFDF7" strokeWidth={3} paintOrder="stroke fill">{o.nudge}</text>}
      {o.cue && <path className="c4-nextblink" d="M -6 69 L 47 4 L 499 4 Q 513 4 513 18 L 513 254 Q 513 268 499 268 L 47 268 L -6 203 Z" fill="none"
        stroke={(typeof THEME !== "undefined" && THEME && THEME.enter && THEME.enter[1]) || C.accent} strokeWidth={5 / G.k} pointerEvents="none" />}
      {o.caret === 0 && <rect className="c4-caret" x={r.x + r.w / 2 + (o.r.length * 0.6 * T.display) / 2 + 4} y={r.y + 26} width={5} height={72} fill={C.ink} rx={2.5} />}
      {o.caret === 1 && o.p.length < 2 && <rect className="c4-caret" x={p.x + o.p.length * cw + cw / 2 - 2} y={p.y + 26} width={5} height={72} fill={C.ink} rx={2.5} />}
    </g>
  );
}

/* the Rs 1 coin (the owner's real photo) and the row of ten 10 p tiles beside it */
function wmBarGeo(W: number) {
  const left = Math.round(W / 2 - 480);
  return { tile: (i: number) => ({ x: left + i * 83, y: 430, w: 78, h: 72 }), coin: { cx: left + 830 + 30 + 52, cy: 466, r: 52 }, left };
}
function wmBar(W: number, fill: number, half: boolean, C: any, tx: any, label: boolean, less: boolean) {
  const B = wmBarGeo(W);
  return (
    <g data-scale="paise-row">
      {Array.from({ length: 10 }, (_, i) => {
        const t = B.tile(i), on = i < fill, hf = !on && half && i === fill;
        return (
          <g key={"t" + i} filter="url(#wm-shadow-sm)">
            <rect x={t.x} y={t.y} width={t.w} height={t.h} rx={10} fill={on ? "url(#wm-verm-grad)" : "#FFFFFF"} stroke={on ? "#8A3A12" : WM_VERM} strokeWidth={3} strokeDasharray={on ? undefined : "8 6"} strokeOpacity={on ? 1 : 0.7} />
            {on && <rect x={t.x + 3} y={t.y + 3} width={t.w - 6} height={(t.h - 6) / 2} rx={7} fill="#FFFFFF" opacity={0.25} pointerEvents="none" />}
            {hf && <rect x={t.x} y={t.y} width={t.w / 2} height={t.h} rx={10} fill="url(#wm-verm-grad)" stroke="#8A3A12" strokeWidth={3} />}
            {hf && <text x={t.x + t.w / 2} y={t.y + t.h / 2 + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C_INK_DARK} stroke="#FFFDF7" strokeWidth={4} paintOrder="stroke fill">{tx("5 p")}</text>}
            {on && <text x={t.x + t.w / 2} y={t.y + t.h / 2 + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF">{tx("10 p")}</text>}
          </g>
        );
      })}
      {label && <text x={B.tile(0).x + (B.tile(9).x + 78 - B.tile(0).x) / 2} y={420} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={WM_GREEN} stroke="#FFFDF7" strokeWidth={3} paintOrder="stroke fill">{tx("100 paise")}</text>}
      {less && <text x={B.tile(0).x + (B.tile(9).x + 78 - B.tile(0).x) / 2} y={420} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink} stroke="#FFFDF7" strokeWidth={3} paintOrder="stroke fill">{tx("less than 1 rupee")}</text>}
      {label && <text x={B.coin.cx - 70} y={480} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={WM_GREEN} stroke="#FFFDF7" strokeWidth={3} paintOrder="stroke fill">=</text>}
    </g>
  );
}
function wmCoin(W: number) {
  const k = wmBarGeo(W).coin;
  return (
    <g data-role="rupee-coin" filter="url(#wm-shadow)">
      <circle cx={k.cx} cy={k.cy} r={k.r} fill="#C9B37E" stroke="#8C7A4E" strokeWidth={3} />
      <text x={k.cx} y={k.cy + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C_INK_DARK}>Rs 1</text>
      <Skin name="coin1" x={k.cx - k.r} y={k.cy - k.r} w={2 * k.r} h={2 * k.r} />
    </g>
  );
}
const C_INK_DARK = "#2B2B2B";
/* the shop board: an amount in words */
function wmBoard(cx: number, bwMax: number, text: string, y: number) {
  const bw = Math.min(780, bwMax), x = Math.round(cx - bw / 2), W = cx * 2, fs = Math.max(T.micro + 2, Math.min(T.speech, Math.floor((bw - 48) / (text.length * 0.56))));
  return (
    <g data-role="shop-board" filter="url(#wm-shadow)">
      <rect x={x} y={y} width={bw} height={92} rx={16} fill="url(#wm-board-grad)" stroke="#1E262D" strokeWidth={4} />
      <rect x={x + 4} y={y + 4} width={bw - 8} height={84} rx={12} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={2} pointerEvents="none" />
      <text x={W / 2} y={y + 46 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={600} fill={WM_CHALK}>{text}</text>
    </g>
  );
}
/* a paper slip with a child's own writing */
function wmSlip(cx: number, text: string, y: number, cap: string) {
  const x = Math.round(cx - 110), W = (cx + 60) * 2;
  return (
    <g>
    <text x={x - 16} y={y + 60} textAnchor="end" fontSize={T.prompt} fontWeight={600} fill={C_INK_DARK}>{cap}</text>
    <g data-role="slip" transform={`rotate(-2 ${W / 2} ${y + 48})`} filter="url(#wm-shadow-sm)">
      <rect x={x} y={y} width={340} height={96} rx={8} fill="#FFFDF7" stroke="#B9B2A5" strokeWidth={2} />
      <line x1={x + 16} y1={y + 78} x2={x + 324} y2={y + 78} stroke="#BFD3E6" strokeWidth={2.5} strokeDasharray="6 4" />
      <rect x={W / 2 - 24} y={y - 8} width={48} height={18} rx={2} fill="rgba(225, 215, 185, 0.7)" stroke="rgba(180, 170, 140, 0.5)" strokeWidth={1} />
      <text x={W / 2} y={y + 64} textAnchor="middle" fontSize={T.xl} fontWeight={600} fill="#2F2F2F">{text}</text>
    </g>
    </g>
  );
}
/* the word on a tile: a number in the language in use, rupees and paise through tx */
function wmTileLabel(id: string, lang: string, tx: any) {
  if (id === "rupees") return tx("rupees");
  if (id === "paise") return tx("paise");
  return lang === "en" ? id : wordsIn(WM_NUMV[id], lang);
}
/* an amount said in words (the board): rupees, then paise; the paise as written (one digit = tenths of a rupee) */
function wmSayAmount(r: number, q: number, lang: string, tx: any) {
  return wordsIn(r, lang) + " " + tx("rupees") + (q ? " " + wordsIn(q, lang) + " " + tx("paise") : "");
}

function Work({ phase, n, item, index, stage, wrong, typed, part, captured, api, step, stepOn, box, answerOn, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const W = box ? box.w : 1472;
  const kx = box && box.key ? box.key.x - 12 : W;
  const free = stage === "free";
  const warm = !free && (stage === "demo" || stage === "teach") && !!phase.steps;
  const it: any = free ? WM_FREE : warm ? phase.warm : item;
  const kind = it.kind;
  const amt = it.amt || [0, 0];

  /* the board belongs to the ENTRY of a question, never to the question alone (PATTERNS 18) */
  const valRef = useRef<any>(null), newRef = useRef(false), busyRef = useRef(false), touchedRef = useRef(false), nudgedRef = useRef(false);
  const freeRef = useRef<any>({ r: "", p: "", t: null });
  const base = free ? "free" : n + ":" + index + ":" + (warm ? "w" : "q");
  const lastBase = useRef(""), entry = useRef(0);
  if (lastBase.current !== base) {
    lastBase.current = base; entry.current++;
    valRef.current = null; newRef.current = false; busyRef.current = false; freeRef.current = { r: "", p: "", t: null };
    touchedRef.current = false; nudgedRef.current = false;
  }
  const qk = base + "#" + entry.current;
  const fresh = () => ({ k: qk, fill: 0, lit: {} as any, pick: null as any, placed: [] as number[], fix: null as any, tick: 0 });
  const [raw, setRaw] = useState<any>(fresh);
  const S = raw.k === qk ? raw : fresh();
  const put = (o: any) => setRaw((p: any) => {
    const b = p.k === qk ? p : fresh();
    return { ...b, ...(typeof o === "function" ? o(b) : o) };
  });
  useEffect(() => () => { tl.stop(); busyRef.current = false; }, [qk]);

  const G = wmGeo(W, kx, kind === "tiles" ? 1.16 : 1.4);
  const B = wmBarGeo(W);

  /* ── phase 1 warm-up acts: one click each; the pieces move by themselves (the chapter shows no hand), the pad locked
     while a sequence runs, a 400 ms guard against a double press ── */
  const lastPress = useRef(0);
  const act = (on: any) => {
    if (stage !== "demo" || !stepOn) return;
    if (busyRef.current) return;
    if (on !== stepOn) { api.did(on); return; }
    const now = Date.now();
    if (now - lastPress.current < 400) return;
    lastPress.current = now;
    busyRef.current = true; api.lock(true);
    const done = (fn: any) => () => { busyRef.current = false; api.lock(false); fn(); };
    if (on === "coin") {
      tl.run([...Array.from({ length: 10 }, (_, i) => [110, () => { put({ fill: i + 1 }); api.sfx.tick(); }]), [300, null]],
        done(() => { put({ fill: 10 }); api.sfx.settle(); api.did("coin"); }));
      return;
    }
    tl.run([[450, () => { put((b: any) => ({ lit: { ...b.lit, [on === "rupees" ? "r" : "p"]: true } })); api.sfx.tick(); }]], done(() => api.did(on)));
  };
  HOOK.demo = () => act(stepOn);

  /* ── phase 1 questions: the tap on a box IS the answer (Enter sends it) ── */
  const tapBox = (side: string) => {
    if (stage === "demo") { act(side === "r" ? "rupees" : "paise"); return; }
    if (stage !== "ask" || kind !== "tap") return;   /* a pick is taken during the correction too (it shows at once) */
    valRef.current = side === "r" ? amt[0] : amt[1]; newRef.current = true;
    put({ pick: side, fix: null }); api.sfx.tick(); api.answerReady(true);
  };
  /* ── phase 4 word tiles: a tap puts a tile on the board's next gap, a tap on the board sends it back ── */
  const tiles: string[] = it.tiles || [];
  const setPlaced = (pl: number[]) => {
    valRef.current = pl.length ? pl.map((j) => tiles[j]).join(" ") : null; newRef.current = true; touchedRef.current = true;
    put({ placed: pl, fix: null }); api.sfx.tick(); api.answerReady(pl.length >= 2);
    if (nudgedRef.current) { nudgedRef.current = false; api.say(item.say); }   /* the nudge is answered: the question comes back */
  };
  const tapTile = (i: number) => {
    if (stage !== "ask" || kind !== "tiles") return;   /* tiles move during the correction too */
    const pl = S.placed;
    if (pl.includes(i)) setPlaced(pl.filter((x: number) => x !== i));
    else if (pl.length < 4) setPlaced([...pl, i]);
    else { nudgedRef.current = true; api.say("Tap a placed word to take it back."); }
  };
  /* the Enter key is quiet (locked) while fewer than two words are placed, once the child has started (user mode only) */
  const tilesWait = kind === "tiles" && stage === "ask" && touchedRef.current && S.placed.length < 2;
  useEffect(() => {
    if (kind !== "tiles" || stage !== "ask" || busyRef.current) return;
    let user = false;
    try { user = (window as any).toolApi.getState().mode === "user"; } catch (e) { user = false; }
    api.lock(tilesWait && user);
  }, [tilesWait, stage]);
  /* the agent's answer() on a working-area question: set it as a child would */
  HOOK.set = (v: any) => {
    if (kind === "tap") {
      const x = leadNumber(v);
      valRef.current = x; newRef.current = true;
      put({ pick: x === amt[0] ? "r" : x === amt[1] ? "p" : null });
      return true;
    }
    if (kind === "tiles") {
      const used: number[] = [];
      const pl = wmWords(v).split(" ").map((w) => { const j = tiles.findIndex((t, k) => t === w && !used.includes(k)); if (j >= 0) used.push(j); return j; }).filter((j) => j >= 0);
      valRef.current = wmWords(v); newRef.current = true;
      put({ placed: pl });
      return true;
    }
    return undefined;
  };
  /* Enter on a working-area question sends what the child made, once per fresh act (never a stale one after a miss) */
  const enterAsk = () => {
    if (busyRef.current || valRef.current === null || !newRef.current) return;
    if (kind === "tiles" && S.placed.length < 2) return;   /* the same rule as the Enter key's blink: two words at least */
    newRef.current = false;
    api.submit(valRef.current);
  };
  api.onEnter(stage === "demo" && stepOn ? () => act(stepOn) : stage === "ask" && item.pad === "enter" ? enterAsk : null);

  /* ── typed questions: the rupees box takes at most 3 digits and the paise box 2 ── */
  const [tr, tp] = kind === "type" ? slotPartsOf(typed || "", 2) : ["", ""];
  /* a rupees entry with a zero in front gets its own first rung (the item's literal `zero`, with its TR): the rung is set
     from what is typed, before Enter sends it (PATTERNS 9f: a rung may be set from Work) */
  if (kind === "type" && item && item.zero) {
    if (item.missBase === undefined) item.missBase = item.miss;
    if (typed) item.miss = tr.length > 1 && tr[0] === "0" ? item.zero : item.missBase;
  }
  useEffect(() => {
    if (stage !== "ask" || kind !== "type" || !typed) return;
    if (tr.length > 3 || tp.length > 2) api.setTyped(tr.slice(0, 3) + "|" + tp.slice(0, 2));
  }, [typed]);

  /* ── the traceback: replay the working, stop one step before the answer (no box ringed, nothing marked) ── */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true); busyRef.current = true;
    if (kind === "tap") valRef.current = null;
    newRef.current = false;
    put({ pick: null, fix: { v: wrong.value, s: 1 } });
    tl.run([[700, () => put({ fix: { v: wrong.value, s: 2 } })], [700, null]], () => { busyRef.current = false; api.lock(false); });
  }, [wrong]);

  /* ── the win line (the phase's last one is replaced by its closing) ── */
  useEffect(() => { if (stage === "win" && item && item.win) api.say(item.win); }, [stage]);
  useEffect(() => { if (stage === "summary" && typed) api.setTyped(""); }, [stage]);

  /* ── free play: tap a box of the tag, the pad types into it ── */
  const freeKey = (k: any) => {
    const f = freeRef.current;
    if (!f.t) return;
    const cap = f.t === "r" ? 2 : 2;
    let v = f.t === "r" ? f.r : f.p;
    if (k === "back") v = v.slice(0, -1);
    else if (k === "clear") v = "";
    else if (/^\d$/.test(String(k))) v = v.length < cap ? v + k : v;
    else if (k === "enter" || k === "point") {
      if (f.t === "r") { freeRef.current = { ...f, t: "p" }; put({ tick: Date.now() }); return; }
      freeRef.current = { ...f, t: null }; api.capture(null); put({ tick: Date.now() }); return;
    }
    freeRef.current = { ...f, [f.t]: v };
    api.sfx.tick(); put({ tick: Date.now() });
  };
  const openFree = (t: string) => {
    if (!free) return;
    freeRef.current = { ...freeRef.current, t }; api.capture(freeKey); put({ tick: Date.now() });
  };

  /* what the host and the agent read back (toolApi.getState) */
  const shown = stage === "win" || stage === "idle";
  api.share({ complete: stage === "idle", rupees: kind === "type" ? tr : kind === "free" ? freeRef.current.r : null,
    paise: kind === "type" ? tp : kind === "free" ? freeRef.current.p : null, dotLit: true,
    picked: kind === "tap" ? S.pick : null, words: kind === "tiles" ? S.placed.map((j: number) => tiles[j]).join(" ") : null,
    barBlocks: S.fill, answer: shown && it.amt ? wmFig(it) : null });

  /* ── what the tag shows ── */
  const fix = stage === "ask" && S.fix && (kind !== "type" || !typed) ? S.fix : null;
  let tagO: any = { C, tx, r: "", p: "", heads: true, neutral: false, lit: {} };
  if (kind === "warm") tagO = { ...tagO, r: String(amt[0]), p: wmP2(amt[1]), heads: !!(S.lit.r && S.lit.p), lit: S.lit };
  if (kind === "warm" && (S.lit.r || S.lit.p)) tagO.headsOne = true;
  if (kind === "tap") tagO = { ...tagO, r: String(amt[0]), p: wmP2(amt[1]), heads: false, neutral: !(stage === "win" || stage === "idle") };
  if (kind === "tiles") tagO = { ...tagO, r: String(amt[0]), p: wmP2(amt[1]) };
  if (kind === "type") {
    /* the answer just sent stays the child's: never drawn again over the correction (the miss empties it at once) */
    const stale = !!wrong && !!typed && slotPartsOf(typed, 2).join("|") === slotPartsOf(wrong.value, 2).join("|");
    const open = !!(box && box.open) && stage === "ask";
    tagO = { ...tagO, r: stale ? "" : tr, p: stale ? "" : tp, caret: open ? (part === 1 ? 1 : 0) : -1,
      nudge: open && !fix && part === 1 && tr !== "" && tp === "" ? tx("Now the paise box.") : open && !fix && part !== 1 && tr === "" && tp !== "" ? tx("Now the rupees box.") : "",
      cue: stage === "ask" && answerOn === "card" && !open && !busyRef.current };
    if (fix) {
      tagO = { ...tagO, r: "", p: "", lit: fix.s === 1 ? { r: true } : { r: true, p: true }, cellsLit: [true, true], dotGlow: true };
    }
  }
  if (kind === "free") tagO = { ...tagO, r: freeRef.current.r, p: freeRef.current.p, caret: freeRef.current.t === "r" ? 0 : freeRef.current.t === "p" ? 1 : -1 };
  if (kind === "tap" && fix) tagO.dotGlow = true;
  if (kind === "tiles" && fix) tagO.lit = fix.s === 1 ? { r: true } : { p: true };

  const obj = it.obj || "ruler", OB = wmObjBox(obj, G);
  const pfill = kind === "tap" && fix ? Math.floor(amt[1] / 10) : S.fill;
  const phalf = kind === "tap" && !!fix && amt[1] % 10 >= 5;
  const showBar = kind === "warm" || (kind === "tap" && !!fix);
  const winNow = stage === "win" || (stage === "idle" && !!item);

  return (
    <g>
      <defs>
        <filter id="wm-shadow" x="-10%" y="-10%" width="125%" height="125%">
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#000000" floodOpacity="0.18" />
        </filter>
        <filter id="wm-shadow-sm" x="-10%" y="-10%" width="125%" height="125%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.14" />
        </filter>
        <linearGradient id="wm-shelf-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D8AC73" />
          <stop offset="100%" stopColor="#966B38" />
        </linearGradient>
        <linearGradient id="wm-board-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3C4A57" />
          <stop offset="100%" stopColor="#222B33" />
        </linearGradient>
        <linearGradient id="wm-tile-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFBF2" />
          <stop offset="100%" stopColor="#F4E6CB" />
        </linearGradient>
        <linearGradient id="wm-verm-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E5632D" />
          <stop offset="100%" stopColor="#BD4515" />
        </linearGradient>
      </defs>

      {/* the shop shelf, the thing standing on it, and the tag's string tied round it */}
      {wmShelf(G)}
      {wmObject(obj, G)}
      <path d={`M ${G.end.x} ${G.end.y} Q ${(G.end.x + OB.x + OB.w * 0.3) / 2} ${G.end.y + 6} ${OB.x + OB.w * 0.3} ${OB.y + 10}`} fill="none" stroke={WM_JUTE} strokeWidth={4.5} strokeLinecap="round" />
      <circle cx={OB.x + OB.w * 0.3} cy={OB.y + 12} r={7} fill="none" stroke={WM_JUTE} strokeWidth={4} />
      {wmTag(G, tagO)}

      {/* phase 1: the Rs 1 coin and the ten 10 p tiles */}
      {showBar && wmBar(W, pfill, phalf, C, tx, kind === "warm" && S.fill >= 10, kind === "tap")}
      {showBar && wmCoin(W)}
      {kind === "warm" && stage === "demo" && (
        <Hit id="coin" x={B.coin.cx - 56} y={B.coin.cy - 56} w={112} h={112} onPress={() => act("coin")} label="Rs 1 coin" />
      )}
      {(kind === "warm" && stage === "demo") || (kind === "tap" && stage === "ask") ? (
        <g>
          <Hit id="rupees" x={G.r.x} y={G.r.y} w={G.r.w} h={G.r.h} onPress={() => tapBox("r")} label="rupees box" />
          <Hit id="paise" x={G.p.x} y={G.p.y} w={G.p.w} h={G.p.h} onPress={() => tapBox("p")} label="paise box" />
        </g>
      ) : null}
      {kind === "warm" && stage === "demo" && stepOn === "coin" && <Invite x={B.coin.cx} y={B.coin.cy} r={64} C={C} />}
      {kind === "warm" && stage === "demo" && stepOn === "rupees" && <Invite x={G.r.x + G.r.w / 2} y={G.r.y + G.r.h / 2} w={G.r.w} h={G.r.h} rx={14} C={C} />}
      {kind === "warm" && stage === "demo" && stepOn === "paise" && <Invite x={G.p.x + G.p.w / 2} y={G.p.y + G.p.h / 2} w={G.p.w} h={G.p.h} rx={14} C={C} />}
      {kind === "tap" && S.pick && stage === "ask" && (() => { const b = S.pick === "r" ? G.r : G.p; return <rect x={b.x - 10} y={b.y - 10} width={b.w + 20} height={b.h + 20} rx={20} fill="none" stroke={C.ink} strokeWidth={6} pointerEvents="none" />; })()}

      {/* the given: an amount in words on the shop board, or a child's own writing on a slip */}
      {kind === "type" && it.given === "board" && wmBoard(G.mid, G.body.w, wmSayAmount(amt[0], amt[1], lang, tx), Math.round(G.bottom + 10))}
      {kind === "type" && it.given === "slip" && wmSlip(G.mid, it.slip, Math.round(G.bottom + 12), tx("a child wrote"))}

      {/* phase 4 word tiles: the shop board's four gaps, then the tiles */}
      {kind === "tiles" && (() => {
        const bx = Math.round(Math.max(W / 2 - 440, G.shelfR + 16)), sx0 = bx + 19, px0 = Math.round(W / 2 - 528), by = Math.round(G.bottom + 6), ty2 = by + 116;
        const fs = (s: string) => Math.max(T.label, Math.min(T.label + 4, Math.floor(180 / (Math.max(4, s.length) * 0.56))));
        return (
          <g>
            <rect x={bx} y={by} width={880} height={88} rx={16} fill="url(#wm-board-grad)" stroke="#1E262D" strokeWidth={4} filter="url(#wm-shadow)" />
            <rect x={bx + 4} y={by + 4} width={872} height={80} rx={12} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={2} pointerEvents="none" />
            {[0, 1, 2, 3].map((j) => {
              const x = sx0 + j * 214, ti = S.placed[j];
              if (ti === undefined) return <rect key={"g" + j} x={x} y={by + 8} width={200} height={72} rx={12} fill="none" stroke={WM_CHALK} strokeWidth={3} strokeDasharray="10 8" opacity={0.8} />;
              const lab = wmTileLabel(tiles[ti], lang, tx);
              return (
                <g key={"g" + j} filter="url(#wm-shadow-sm)">
                  <rect x={x} y={by + 8} width={200} height={72} rx={12} fill={WM_CHALK} stroke="#C9B48A" strokeWidth={3} />
                  <text x={x + 100} y={by + 44 + fs(lab) * 0.36} textAnchor="middle" fontSize={fs(lab)} fontWeight={700} fill={C.ink}>{lab}</text>
                  {stage === "ask" && <Hit id={"gap-" + (j + 1)} x={x} y={by + 8} w={200} h={72} onPress={() => tapTile(ti)} label={"take back " + tiles[ti]} />}
                </g>
              );
            })}
            {tiles.map((id, i) => {
              const x = px0 + i * 214, on = S.placed.includes(i), lab = wmTileLabel(id, lang, tx);
              if (on) return <rect key={"p" + i} x={x} y={ty2} width={200} height={72} rx={12} fill="none" stroke={WM_KRAFT_EDGE} strokeWidth={3} strokeDasharray="10 8" opacity={0.5} />;
              return (
                <g key={"p" + i} filter="url(#wm-shadow-sm)">
                  <rect x={x} y={ty2} width={200} height={72} rx={12} fill="url(#wm-tile-grad)" stroke={WM_KRAFT_EDGE} strokeWidth={3} />
                  <rect x={x + 3} y={ty2 + 3} width={194} height={32} rx={9} fill="#FFFFFF" opacity={0.35} pointerEvents="none" />
                  <text x={x + 100} y={ty2 + 36 + fs(lab) * 0.36} textAnchor="middle" fontSize={fs(lab)} fontWeight={700} fill={C.ink}>{lab}</text>
                  {stage === "ask" && <Hit id={"tile-" + id} x={x} y={ty2} w={200} h={72} onPress={() => tapTile(i)} label={"word " + id} />}
                </g>
              );
            })}
          </g>
        );
      })()}

      {/* the answer on the card: a tap on the tag opens the keypad; with it open, a tap on a box puts the caret there */}
      {kind === "type" && stage === "ask" && answerOn === "card" && !(box && box.open) && !busyRef.current && (
        <g>
          <SlotPartBox id="answer-open" label="price tag" x={G.body.x} y={G.body.y} w={G.body.w} h={G.body.h} enabled={true} onPick={() => api.openAnswer()} />
        </g>
      )}
      {kind === "type" && stage === "ask" && box && box.open && (
        <g>
          <SlotPartBox id="part-1" label="rupees box" x={G.r.x} y={G.r.y} w={G.r.w} h={G.r.h} on={part !== 1} enabled={true} onPick={() => api.pickPart(0)} />
          <SlotPartBox id="part-2" label="paise box" x={G.p.x} y={G.p.y} w={G.p.w} h={G.p.h} on={part === 1} enabled={true} onPick={() => api.pickPart(1)} />
        </g>
      )}

      {/* free play: tap a box and type; the board says the amount as written */}
      {kind === "free" && (
        <g>
          {!captured && freeRef.current.r === "" && freeRef.current.p === "" && <Invite x={G.r.x + G.r.w / 2} y={G.r.y + G.r.h / 2} w={G.r.w} h={G.r.h} rx={14} C={C} />}
          <Hit id="free-rupees" x={G.r.x} y={G.r.y} w={G.r.w} h={G.r.h} onPress={() => openFree("r")} label="rupees box" enabled={!captured} />
          <Hit id="free-paise" x={G.p.x} y={G.p.y} w={G.p.w} h={G.p.h} onPress={() => openFree("p")} label="paise box" enabled={!captured} />
          {(freeRef.current.r !== "" || freeRef.current.p !== "") && wmBoard(W, wmSayAmount(Number(freeRef.current.r || 0),
            freeRef.current.p.length === 1 ? Number(freeRef.current.p) * 10 : Number(freeRef.current.p || 0), lang, tx), Math.round(G.bottom + 10))}
        </g>
      )}

      {/* the win: both boxes in their colours, the amount in green on the tag */}
      {winNow && it.amt && kind !== "free" && (
        <g data-reveals="answer" pointerEvents="none">
          {kind === "tap" && (
            <g>
              <rect x={G.r.x} y={G.r.y} width={G.r.w} height={G.r.h} rx={14} fill="none" stroke={WM_BLUE} strokeWidth={8} />
              <rect x={G.p.x} y={G.p.y} width={G.p.w} height={G.p.h} rx={14} fill="none" stroke={WM_VERM} strokeWidth={8} />
              <text x={G.r.x + G.r.w / 2} y={G.Y(74)} textAnchor="middle" fontSize={Math.round(T.prompt * G.k)} fontWeight={700} fill={WM_BLUE} stroke="#FFFDF7" strokeWidth={3} paintOrder="stroke fill">{tx("Rupees")}</text>
              <text x={G.p.x + G.p.w / 2} y={G.Y(74)} textAnchor="middle" fontSize={Math.round(T.prompt * G.k)} fontWeight={700} fill={WM_VERM_INK} stroke="#FFFDF7" strokeWidth={3} paintOrder="stroke fill">{tx("Paise")}</text>
            </g>
          )}
          <text x={G.X(318)} y={G.Y(250)} textAnchor="middle" fontSize={Math.round(T.label * 1.1 * G.k)} fontWeight={700} fill={WM_GREEN} stroke="#FFFDF7" strokeWidth={3} paintOrder="stroke fill">{"Rs " + wmFig(it)}</text>
        </g>
      )}
    </g>
  );
}

/* the summary page's drawing: the price as the child wrote it, rupees in deep blue, paise in vermilion */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const item = it || (result && result.last && PHASES[(n || 1) - 1] && PHASES[(n || 1) - 1].items[result.last.item]) || null;
  if (!result || !result.last || !item || !item.amt) return null;
  const bw = Math.min(64, w * 0.3), ph = h - 20, y = 10, x0 = w / 2 - (bw * 2 + 30) / 2 + 26;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={WM_KRAFT} stroke={WM_KRAFT_EDGE} strokeWidth={2} />
      <text x={x0 - 8} y={y + ph / 2 + 10} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx("Rs")}</text>
      <rect x={x0} y={y} width={bw} height={ph} rx={8} fill="#FFFFFF" stroke={WM_BLUE} strokeWidth={3} />
      <text x={x0 + bw / 2} y={y + ph / 2 + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={WM_BLUE}>{String(item.amt[0])}</text>
      <circle cx={x0 + bw + 15} cy={y + ph - 12} r={5} fill={C.ink} />
      <rect x={x0 + bw + 30} y={y} width={bw} height={ph} rx={8} fill="#FFFFFF" stroke={WM_VERM} strokeWidth={3} />
      <text x={x0 + bw + 30 + bw / 2} y={y + ph / 2 + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={WM_VERM_INK}>{wmP2(item.amt[1])}</text>
    </g>
  );
}

/* the start page: the price tag, its boxes named, a price already written */
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  const G = wmGeo(box.w, box.w, 1.2, 8);
  return (
    <g>
      <defs>
        <filter id="wm-shadow" x="-10%" y="-10%" width="125%" height="125%">
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#000000" floodOpacity="0.18" />
        </filter>
      </defs>
      {wmTag(G, { C, tx, r: "12", p: "60", heads: true, neutral: false, lit: { r: true, p: true } })}
    </g>
  );
}

function WriteTheMoney(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      board: true,
      keyOnly: true,
      bigPad: true,
      nextKey: true,
      navDots: true,
      /* the money questions of phases 2 to 4 are answered ON the price tag (PATTERNS 9e) */
      cardAnswer: true,
      StartArt, START_HOOK,
      }} />
  );
}

export default WriteTheMoney;
