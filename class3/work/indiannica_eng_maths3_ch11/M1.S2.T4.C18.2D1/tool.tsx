/* ═══ M1.S2.T4.C18.2D1 · rupees_and_paise_converter · tool-specific part ═══════════════════════════════
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

const TOOL_ID = "rupees_and_paise_converter";
const MEDIA_ID = "M1.S2.T4.C18.2D1";
const TOOL_NAME = "Rupees and Paise Converter";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["A Rupees tray and a Paise tray, ready for money to change places."];
/* the whole-tool line: printed on the summary page */
const FINISH_LINE = "You changed every amount and kept the dot where it belongs.";
/* printed when the child opens Free play (the plan's free-play line); its LAST piece stays on the bubble */
const FREE_LINE = "Free play: open rupee coins and gather paise as you like.";

/* THE START PAGE (runtime r28; docs/LAYOUT.md §1c, docs/PATTERNS.md §14): the first thing a child sees in user mode.
   START_HOOK is ONE printed question to wonder at (it needs a TR entry, and never gives an answer away); StartArt is
   the object the lesson is about, drawn in a 1200 x 340 box ({ box, C, lang, tx }; plain shapes in the chrome and content
   colours, a <Skin> over them when the image agent made one). This stub is a dashed outline: draw the real object. */
const START_HOOK = "How many paise hide inside one rupee coin?";
function StartArt({ box, C, lang, tx }: any) {
  c18Units(lang, tx);
  return (
    <g>
      {c18Tray({ x: 150, y: 20, w: 360, h: 300 }, "Rupees", C18_RS, "sr", tx)}
      {c18Tray({ x: 690, y: 20, w: 360, h: 300 }, "Paise", C18_PSI, "sp", tx, true)}
      {[0, 1, 2].map((i) => c18Coin({ x: 190 + i * 100, y: 140, w: 88 }, "start-c" + i))}
      {c18Block({ x: 790, y: 90, w: 190, h: 210 }, "start-b")}
      <path d="M 540 170 H 650 M 628 148 L 652 170 L 628 192" fill="none" stroke={C.ink} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): every line above and below stays English, exactly as the checks
   read it; this table is keyed by that English, byte for byte, and the runtime looks each printed or drawn line
   up in it (Work draws its own words through tx("...")). Fill it AFTER the English is final and reviewed:
   `check` (tr-coverage) lists every printed line still missing. Nothing is baked: the lesson is silent.
   Empty = the tool runs in English only. */
const TR: any = {
  hi: {
    "First press Same unit, then choose.": "पहले एक जैसी इकाई दबाओ, फिर चुनो।",
    "Press Gather first, then write the rupees.": "पहले इकट्ठा करो दबाओ, फिर रुपये लिखो।",
    "Press Open all first, then count the paise.": "पहले सब खोलो दबाओ, फिर पैसे गिनो।",
    "Press Open first, then count the paise.": "पहले खोलो दबाओ, फिर पैसे गिनो।",
    "Write 0, then the dot, then the paise.": "पहले 0 लिखो, फिर बिंदु, फिर पैसे।",
    "With no full hundred, the rupees part is 0.": "एक भी पूरा सौ नहीं, तो रुपये वाला भाग 0 है।",
    "The last two digits are paise, so the dot sits just before them.": "आखिरी दो अंक पैसे हैं, इसलिए बिंदु उनसे ठीक पहले है।",
    "The gathered coins tell you the rupees, before the dot.": "इकट्ठे सिक्के बिंदु से पहले के रुपये बताते हैं।",
    "Rupees and Paise Converter": "रुपये और पैसे बदलो",
    "Rupees into paise: multiply by a hundred": "रुपये से पैसे: सौ से गुणा करो",
    "Rupees and paise into paise: the shortcut": "रुपये और पैसे को पैसों में: आसान तरीका",
    "Paise into rupees: two digits after the dot": "पैसे से रुपये: बिंदु के बाद दो अंक",
    "Which amount is more?": "कौन-सी रकम ज़्यादा है?",
    "A Rupees tray and a Paise tray, ready for money to change places.": "एक रुपये की ट्रे और एक पैसे की ट्रे, पैसे बदलने को तैयार।",
    "You changed every amount and kept the dot where it belongs.": "तुमने हर रकम बदली और बिंदु सही जगह रखा।",
    "Free play: open rupee coins and gather paise as you like.": "मुक्त खेल: जैसे चाहो सिक्के खोलो और पैसे इकट्ठा करो।",
    "How many paise hide inside one rupee coin?": "एक रुपये के सिक्के में कितने पैसे छिपे हैं?",
    "Open one rupee at a time. How many paise does each rupee hold?": "एक बार में एक रुपया खोलो। हर रुपये में कितने पैसे हैं?",
    "Break the rupees first. Then add the loose paise. What do you get?": "पहले रुपये खोलो। फिर छुट्टे पैसे जोड़ो। क्या मिला?",
    "Gather every hundred paise into a rupee. What is left over, and where does the dot go?": "हर सौ पैसे का एक रुपया बनाओ। क्या बचा, और बिंदु कहाँ जाएगा?",
    "Are both amounts in the same unit? Change one of them, then choose.": "क्या दोनों रकम एक जैसी इकाई में हैं? एक को बदलो, फिर चुनो।",
    "Tap Open to change one rupee coin into paise.": "एक रुपये का सिक्का पैसों में बदलने को खोलो दबाओ।",
    "The Open key is under the two trays.": "खोलो बटन दोनों ट्रे के नीचे है।",
    "Tap Open all to change the rupee coins into paise.": "सिक्कों को पैसों में बदलने को सब खोलो दबाओ।",
    "Find the Open all key under the trays.": "ट्रे के नीचे सब खोलो बटन ढूँढो।",
    "Tap Gather to turn each 100 paise into a rupee coin.": "इकट्ठा करो दबाओ: 100 पैसे मिलकर 1 रुपया बनते हैं।",
    "The Gather key sits below the trays.": "इकट्ठा करो बटन ट्रे के नीचे है।",
    "Tap Same unit to write both amounts in paise.": "दोनों रकम पैसों में लिखने को एक जैसी इकाई दबाओ।",
    "Look for the Same unit key below the tags.": "पर्चियों के नीचे एक जैसी इकाई बटन देखो।",
    "One coin opens into ten 10 p bars, and that is 100 paise.": "एक सिक्का 10 पैसे की दस पट्टियों में खुलता है, यानी 100 पैसे।",
    "Count the opened coins in hundreds: 100, 200, 300 and on.": "खुले सिक्के सौ-सौ करके गिनो: 100, 200, 300 और आगे।",
    "Each rupee coin is 100 paise, then add the loose paise.": "हर रुपये का सिक्का 100 पैसे है, फिर छुट्टे पैसे जोड़ो।",
    "Shortcut: take away Rs and the dot from the tag, keeping every digit.": "आसान तरीका: पर्ची से रुपये और बिंदु हटाओ, सारे अंक रखो।",
    "Count two digits from the right and put the dot there.": "दाईं ओर से दो अंक गिनो और वहाँ बिंदु लगाओ।",
    "Change the rupee amount into paise, then read both numbers.": "रुपये वाली रकम को पैसों में बदलो, फिर दोनों संख्याएँ पढ़ो।",
    "Now both are in paise: the longer bar is the bigger amount.": "अब दोनों पैसों में हैं: लंबी पट्टी बड़ी रकम है।",
    "One rupee is 100 paise, so multiply the rupees by 100.": "एक रुपया 100 पैसे है, इसलिए रुपयों को 100 से गुणा करो।",
    "Change the rupees to paise, then add the loose paise.": "रुपयों को पैसों में बदलो, फिर छुट्टे पैसे जोड़ो।",
    "Put the dot two digits from the right to write paise in rupees.": "पैसे से रुपये: दाईं ओर से दो अंक छोड़कर बिंदु लगाओ।",
    "Change both amounts to one unit before you compare them.": "तुलना से पहले दोनों रकम एक जैसी इकाई में बदलो।",
    "You learned: Rs 1 is 100 paise; rupees times 100 gives paise.": "तुमने सीखा: 1 रुपया = 100 पैसे; रुपये × 100।",
    "You learned: rupees to paise first, then add the loose paise.": "तुमने सीखा: पहले रुपये बदलो, फिर छुट्टे जोड़ो।",
    "You learned: gather 100 paise into Rs 1; dot two digits from the right.": "तुमने सीखा: 100 पैसे = 1 रुपया; बिंदु दाएँ से दो अंक पहले।",
    "You learned: put both amounts in one unit, then compare.": "तुमने सीखा: एक जैसी इकाई में लाकर तुलना करो।",
    "Open all 7 rupee coins from the money box: how many paise is that?": "गुल्लक के 1 रुपये वाले 7 सिक्के खोलो: कितने पैसे हुए?",
    "7 coins in paise?": "7 सिक्के, कितने पैसे?",
    "Count the 10 p bars in one opened coin first.": "पहले एक खुले सिक्के की 10 पैसे वाली पट्टियाँ गिनो।",
    "Yes, 7 rupees open into 700 paise.": "हाँ, 7 रुपये खुलकर 700 पैसे बने।",
    "A purse holds 6 Rs 1 coins; open them, then say how many paise they make.": "बटुए में 1 रुपये के 6 सिक्के हैं: खोलकर बताओ, कितने पैसे?",
    "6 coins in paise?": "6 सिक्के, कितने पैसे?",
    "Each coin opened into ten bars of 10 p.": "हर सिक्के से 10 पैसे वाली दस पट्टियाँ निकलीं।",
    "Yes, 6 rupees are 600 paise.": "हाँ, 6 रुपये 600 पैसे हैं।",
    "Open the 11 Rs 1 coins in the shopkeeper's bowl: how many paise are there?": "दुकानदार के कटोरे के 1 रुपये वाले 11 सिक्के खोलो: कितने पैसे हैं?",
    "11 coins in paise?": "11 सिक्के, कितने पैसे?",
    "How many paise does each opened block hold?": "हर खुली गड्डी में कितने पैसे हैं?",
    "Yes, 11 rupees are 1,100 paise.": "हाँ, 11 रुपये 1,100 पैसे हैं।",
    "A pencil box costs Rs 9.15: open the coins, then find how many paise that is.": "पेंसिल बॉक्स 9.15 रुपये का है: सिक्के खोलो, बताओ कितने पैसे हुए।",
    "Rs 9.15 in paise?": "9.15 रुपये, कितने पैसे?",
    "Change the 9 rupees into paise before you add the 15 paise.": "15 पैसे जोड़ने से पहले 9 रुपयों को पैसों में बदलो।",
    "Yes, Rs 9.15 is 915 paise.": "हाँ, 9.15 रुपये 915 पैसे हैं।",
    "A ruler costs Rs 8.30; open its rupees and write the cost in paise.": "पटरी 8.30 रुपये की है: रुपये खोलो, दाम पैसों में लिखो।",
    "Rs 8.30 in paise?": "8.30 रुपये, कितने पैसे?",
    "How many paise are the 8 opened coins, before the loose 30?": "छुट्टे 30 से पहले, 8 खुले सिक्के कितने पैसे हैं?",
    "Yes, Rs 8.30 is 830 paise.": "हाँ, 8.30 रुपये 830 पैसे हैं।",
    "A kite costs Rs 14.05: after Open all, how many paise does it cost?": "पतंग 14.05 रुपये की है: सब खोलने के बाद, यह कितने पैसे हैं?",
    "Rs 14.05 in paise?": "14.05 रुपये, कितने पैसे?",
    "Count the opened hundreds first, then add the loose piece.": "पहले खुले सैकड़े गिनो, फिर छुट्टा टुकड़ा जोड़ो।",
    "Yes, Rs 14.05 is 1,405 paise.": "हाँ, 14.05 रुपये 1,405 पैसे हैं।",
    "A notebook costs 960 paise: gather the hundreds, then write the cost in rupees.": "कॉपी 960 पैसे की है: सैकड़े इकट्ठा करो, दाम रुपयों में लिखो।",
    "960 paise in Rs?": "960 पैसे, कितने रुपये?",
    "Yes, 960 paise is Rs 9.60.": "हाँ, 960 पैसे 9.60 रुपये हैं।",
    "A sweet costs 45 paise: what is that in rupees?": "एक मिठाई 45 पैसे की है: रुपयों में यह कितना है?",
    "45 paise in Rs?": "45 पैसे, कितने रुपये?",
    "Paise always take two places after the dot.": "पैसे हमेशा बिंदु के बाद दो जगह लेते हैं।",
    "Yes, 45 paise is Rs 0.45.": "हाँ, 45 पैसे 0.45 रुपये हैं।",
    "A toy costs 705 paise: after Gather, what is that in rupees?": "खिलौना 705 पैसे का है: इकट्ठा करने के बाद, यह कितने रुपये हैं?",
    "705 paise in Rs?": "705 पैसे, कितने रुपये?",
    "Look at the loose pieces, then count two places after the dot.": "छुट्टे टुकड़े देखो, फिर बिंदु के बाद दो जगह गिनो।",
    "Yes, 705 paise is Rs 7.05.": "हाँ, 705 पैसे 7.05 रुपये हैं।",
    "Which is more: Rs 4.20 or 410 paise?": "कौन ज़्यादा है: 4.20 रुपये या 410 पैसे?",
    "Which is more?": "कौन ज़्यादा है?",
    "Is 410 in rupees or in paise?": "410 रुपयों में है या पैसों में?",
    "Yes, 420 paise is more than 410 paise.": "हाँ, 420 पैसे 410 पैसे से ज़्यादा हैं।",
    "Rs 4.20": "4.20 रुपये",
    "410 paise": "410 पैसे",
    "Put 480 paise and Rs 5 in the same unit: which is the bigger amount?": "480 पैसे और 5 रुपये एक जैसी इकाई में लाओ: कौन-सी रकम बड़ी है?",
    "Bigger amount?": "बड़ी रकम?",
    "Rs 5 is not 5 paise: change it to paise first.": "5 रुपये 5 पैसे नहीं हैं: पहले इसे पैसों में बदलो।",
    "Yes, Rs 5 is 500 paise, more than 480.": "हाँ, 5 रुपये 500 पैसे हैं, 480 से ज़्यादा।",
    "480 paise": "480 पैसे",
    "Rs 5": "5 रुपये",
    "A child has Rs 8 and a friend has 650 paise: who has more?": "एक बच्चे के पास 8 रुपये, दोस्त के पास 650 पैसे: किसके पास ज़्यादा?",
    "Who has more?": "किसके पास ज़्यादा है?",
    "Read the bars, not the bigger number on the tags.": "पर्ची की बड़ी संख्या नहीं, पट्टियाँ पढ़ो।",
    "Yes, Rs 8 is 800 paise, more than 650.": "हाँ, 8 रुपये 800 पैसे हैं, 650 से ज़्यादा।",
    "Rs 8": "8 रुपये",
    "650 paise": "650 पैसे",
    "Rupees": "रुपये",
    "Paise": "पैसे",
    "paise": "पैसे",
    "rupees": "रुपये",
    "p": "पै",
    "Open": "खोलो",
    "Open all": "सब खोलो",
    "Gather": "इकट्ठा करो",
    "Same unit": "एक जैसी इकाई",
  },
  gu: {
    "First press Same unit, then choose.": "પહેલાં સમાન એકમ દબાવો, પછી પસંદ કરો.",
    "Press Gather first, then write the rupees.": "પહેલાં ભેગા કરો દબાવો, પછી રૂપિયા લખો.",
    "Press Open all first, then count the paise.": "પહેલાં બધા ખોલો દબાવો, પછી પૈસા ગણો.",
    "Press Open first, then count the paise.": "પહેલાં ખોલો દબાવો, પછી પૈસા ગણો.",
    "Write 0, then the dot, then the paise.": "પહેલાં 0 લખો, પછી બિંદુ, પછી પૈસા.",
    "With no full hundred, the rupees part is 0.": "એક પણ પૂરા સો નથી, તો રૂપિયાનો ભાગ 0 છે.",
    "The last two digits are paise, so the dot sits just before them.": "છેલ્લા બે અંક પૈસા છે, તેથી બિંદુ તેમની બરાબર પહેલાં છે.",
    "The gathered coins tell you the rupees, before the dot.": "ભેગા થયેલા સિક્કા બિંદુ પહેલાંના રૂપિયા બતાવે છે.",
    "Rupees and Paise Converter": "રૂપિયા અને પૈસા બદલો",
    "Rupees into paise: multiply by a hundred": "રૂપિયાથી પૈસા: સોથી ગુણાકાર કરો",
    "Rupees and paise into paise: the shortcut": "રૂપિયા અને પૈસાને પૈસામાં: સહેલી રીત",
    "Paise into rupees: two digits after the dot": "પૈસાથી રૂપિયા: બિંદુ પછી બે અંક",
    "Which amount is more?": "કઈ રકમ વધારે છે?",
    "A Rupees tray and a Paise tray, ready for money to change places.": "એક રૂપિયાની ટ્રે અને એક પૈસાની ટ્રે, પૈસા બદલવા તૈયાર.",
    "You changed every amount and kept the dot where it belongs.": "તમે દરેક રકમ બદલી અને બિંદુ સાચી જગ્યાએ રાખ્યું.",
    "Free play: open rupee coins and gather paise as you like.": "મુક્ત રમત: ગમે તેમ સિક્કા ખોલો અને પૈસા ભેગા કરો.",
    "How many paise hide inside one rupee coin?": "એક રૂપિયાના સિક્કામાં કેટલા પૈસા છુપાયા છે?",
    "Open one rupee at a time. How many paise does each rupee hold?": "એક વખતે એક રૂપિયો ખોલો. દરેક રૂપિયામાં કેટલા પૈસા છે?",
    "Break the rupees first. Then add the loose paise. What do you get?": "પહેલાં રૂપિયા ખોલો. પછી છૂટા પૈસા ઉમેરો. શું મળ્યું?",
    "Gather every hundred paise into a rupee. What is left over, and where does the dot go?": "દર સો પૈસાનો એક રૂપિયો બનાવો. શું બચ્યું, અને બિંદુ ક્યાં જશે?",
    "Are both amounts in the same unit? Change one of them, then choose.": "શું બંને રકમ સમાન એકમમાં છે? એકને બદલો, પછી પસંદ કરો.",
    "Tap Open to change one rupee coin into paise.": "એક રૂપિયાનો સિક્કો પૈસામાં બદલવા ખોલો દબાવો.",
    "The Open key is under the two trays.": "ખોલો બટન બંને ટ્રેની નીચે છે.",
    "Tap Open all to change the rupee coins into paise.": "સિક્કા પૈસામાં બદલવા બધા ખોલો દબાવો.",
    "Find the Open all key under the trays.": "ટ્રેની નીચે બધા ખોલો બટન શોધો.",
    "Tap Gather to turn each 100 paise into a rupee coin.": "ભેગા કરો દબાવો: દર 100 પૈસાનો એક રૂપિયો બનશે.",
    "The Gather key sits below the trays.": "ભેગા કરો બટન ટ્રેની નીચે છે.",
    "Tap Same unit to write both amounts in paise.": "બંને રકમ પૈસામાં લખવા સમાન એકમ દબાવો.",
    "Look for the Same unit key below the tags.": "ચિઠ્ઠીઓની નીચે સમાન એકમ બટન જુઓ.",
    "One coin opens into ten 10 p bars, and that is 100 paise.": "એક સિક્કો 10 પૈસાની દસ પટ્ટીમાં ખૂલે છે, એટલે 100 પૈસા.",
    "Count the opened coins in hundreds: 100, 200, 300 and on.": "ખૂલેલા સિક્કા સો-સો કરીને ગણો: 100, 200, 300 અને આગળ.",
    "Each rupee coin is 100 paise, then add the loose paise.": "દરેક રૂપિયાનો સિક્કો 100 પૈસા છે, પછી છૂટા પૈસા ઉમેરો.",
    "Shortcut: take away Rs and the dot from the tag, keeping every digit.": "સહેલી રીત: ચિઠ્ઠીમાંથી રૂપિયા અને બિંદુ કાઢો, બધા અંક રાખો.",
    "Count two digits from the right and put the dot there.": "જમણી બાજુથી બે અંક ગણો અને ત્યાં બિંદુ મૂકો.",
    "Change the rupee amount into paise, then read both numbers.": "રૂપિયાવાળી રકમને પૈસામાં બદલો, પછી બંને સંખ્યા વાંચો.",
    "Now both are in paise: the longer bar is the bigger amount.": "હવે બંને પૈસામાં છે: લાંબી પટ્ટી મોટી રકમ છે.",
    "One rupee is 100 paise, so multiply the rupees by 100.": "એક રૂપિયો 100 પૈસા છે, તેથી રૂપિયાને 100 વડે ગુણો.",
    "Change the rupees to paise, then add the loose paise.": "રૂપિયાને પૈસામાં બદલો, પછી છૂટા પૈસા ઉમેરો.",
    "Put the dot two digits from the right to write paise in rupees.": "પૈસાથી રૂપિયા: જમણેથી બે અંક છોડીને બિંદુ મૂકો.",
    "Change both amounts to one unit before you compare them.": "સરખામણી પહેલાં બંને રકમ સમાન એકમમાં બદલો.",
    "You learned: Rs 1 is 100 paise; rupees times 100 gives paise.": "તમે શીખ્યા: 1 રૂપિયો = 100 પૈસા; રૂપિયા × 100.",
    "You learned: rupees to paise first, then add the loose paise.": "તમે શીખ્યા: પહેલાં રૂપિયા બદલો, પછી છૂટા ઉમેરો.",
    "You learned: gather 100 paise into Rs 1; dot two digits from the right.": "તમે શીખ્યા: 100 પૈસા = 1 રૂપિયો; બિંદુ જમણેથી બે અંક પહેલાં.",
    "You learned: put both amounts in one unit, then compare.": "તમે શીખ્યા: સમાન એકમમાં લાવી સરખામણી કરો.",
    "Open all 7 rupee coins from the money box: how many paise is that?": "7 રૂપિયાના સિક્કા બધા ખોલો: કેટલા પૈસા થયા?",
    "7 coins in paise?": "7 સિક્કા, કેટલા પૈસા?",
    "Count the 10 p bars in one opened coin first.": "પહેલાં એક ખૂલેલા સિક્કાની 10 પૈસાની પટ્ટીઓ ગણો.",
    "Yes, 7 rupees open into 700 paise.": "હા, 7 રૂપિયા ખૂલીને 700 પૈસા થયા.",
    "A purse holds 6 Rs 1 coins; open them, then say how many paise they make.": "પાકીટમાં 1 રૂપિયાના 6 સિક્કા છે: ખોલીને કહો, કેટલા પૈસા?",
    "6 coins in paise?": "6 સિક્કા, કેટલા પૈસા?",
    "Each coin opened into ten bars of 10 p.": "દરેક સિક્કામાંથી 10 પૈસાની દસ પટ્ટી નીકળી.",
    "Yes, 6 rupees are 600 paise.": "હા, 6 રૂપિયા 600 પૈસા છે.",
    "Open the 11 Rs 1 coins in the shopkeeper's bowl: how many paise are there?": "દુકાનદારના વાટકાના 1 રૂપિયાના 11 સિક્કા ખોલો: કેટલા પૈસા છે?",
    "11 coins in paise?": "11 સિક્કા, કેટલા પૈસા?",
    "How many paise does each opened block hold?": "દરેક ખૂલેલા જૂથમાં કેટલા પૈસા છે?",
    "Yes, 11 rupees are 1,100 paise.": "હા, 11 રૂપિયા 1,100 પૈસા છે.",
    "A pencil box costs Rs 9.15: open the coins, then find how many paise that is.": "પેન્સિલ બોક્સ 9.15 રૂપિયાનું છે: સિક્કા ખોલો, કહો કેટલા પૈસા થયા.",
    "Rs 9.15 in paise?": "9.15 રૂપિયા, કેટલા પૈસા?",
    "Change the 9 rupees into paise before you add the 15 paise.": "15 પૈસા ઉમેરતાં પહેલાં 9 રૂપિયાને પૈસામાં બદલો.",
    "Yes, Rs 9.15 is 915 paise.": "હા, 9.15 રૂપિયા 915 પૈસા છે.",
    "A ruler costs Rs 8.30; open its rupees and write the cost in paise.": "ફૂટપટ્ટી 8.30 રૂપિયાની છે: રૂપિયા ખોલો, કિંમત પૈસામાં લખો.",
    "Rs 8.30 in paise?": "8.30 રૂપિયા, કેટલા પૈસા?",
    "How many paise are the 8 opened coins, before the loose 30?": "છૂટા 30 પહેલાં, 8 ખૂલેલા સિક્કા કેટલા પૈસા છે?",
    "Yes, Rs 8.30 is 830 paise.": "હા, 8.30 રૂપિયા 830 પૈસા છે.",
    "A kite costs Rs 14.05: after Open all, how many paise does it cost?": "પતંગ 14.05 રૂપિયાનો છે: બધા ખોલ્યા પછી, તે કેટલા પૈસા છે?",
    "Rs 14.05 in paise?": "14.05 રૂપિયા, કેટલા પૈસા?",
    "Count the opened hundreds first, then add the loose piece.": "પહેલાં ખૂલેલા સો ગણો, પછી છૂટો ટુકડો ઉમેરો.",
    "Yes, Rs 14.05 is 1,405 paise.": "હા, 14.05 રૂપિયા 1,405 પૈસા છે.",
    "A notebook costs 960 paise: gather the hundreds, then write the cost in rupees.": "નોટબુક 960 પૈસાની છે: સો ભેગા કરો, કિંમત રૂપિયામાં લખો.",
    "960 paise in Rs?": "960 પૈસા, કેટલા રૂપિયા?",
    "Yes, 960 paise is Rs 9.60.": "હા, 960 પૈસા 9.60 રૂપિયા છે.",
    "A sweet costs 45 paise: what is that in rupees?": "એક મીઠાઈ 45 પૈસાની છે: રૂપિયામાં તે કેટલું છે?",
    "45 paise in Rs?": "45 પૈસા, કેટલા રૂપિયા?",
    "Paise always take two places after the dot.": "પૈસા હંમેશાં બિંદુ પછી બે જગ્યા લે છે.",
    "Yes, 45 paise is Rs 0.45.": "હા, 45 પૈસા 0.45 રૂપિયા છે.",
    "A toy costs 705 paise: after Gather, what is that in rupees?": "રમકડું 705 પૈસાનું છે: ભેગા કર્યા પછી, તે કેટલા રૂપિયા છે?",
    "705 paise in Rs?": "705 પૈસા, કેટલા રૂપિયા?",
    "Look at the loose pieces, then count two places after the dot.": "છૂટા ટુકડા જુઓ, પછી બિંદુ પછી બે જગ્યા ગણો.",
    "Yes, 705 paise is Rs 7.05.": "હા, 705 પૈસા 7.05 રૂપિયા છે.",
    "Which is more: Rs 4.20 or 410 paise?": "કયું વધારે છે: 4.20 રૂપિયા કે 410 પૈસા?",
    "Which is more?": "કયું વધારે છે?",
    "Is 410 in rupees or in paise?": "410 રૂપિયામાં છે કે પૈસામાં?",
    "Yes, 420 paise is more than 410 paise.": "હા, 420 પૈસા 410 પૈસા કરતાં વધારે છે.",
    "Rs 4.20": "4.20 રૂપિયા",
    "410 paise": "410 પૈસા",
    "Put 480 paise and Rs 5 in the same unit: which is the bigger amount?": "480 પૈસા અને 5 રૂપિયા સમાન એકમમાં લાવો: કઈ રકમ મોટી છે?",
    "Bigger amount?": "મોટી રકમ?",
    "Rs 5 is not 5 paise: change it to paise first.": "5 રૂપિયા 5 પૈસા નથી: પહેલાં તેને પૈસામાં બદલો.",
    "Yes, Rs 5 is 500 paise, more than 480.": "હા, 5 રૂપિયા 500 પૈસા છે, 480 કરતાં વધારે.",
    "480 paise": "480 પૈસા",
    "Rs 5": "5 રૂપિયા",
    "A child has Rs 8 and a friend has 650 paise: who has more?": "એક બાળક પાસે 8 રૂપિયા, મિત્ર પાસે 650 પૈસા: કોની પાસે વધારે?",
    "Who has more?": "કોની પાસે વધારે છે?",
    "Read the bars, not the bigger number on the tags.": "ચિઠ્ઠીની મોટી સંખ્યા નહીં, પટ્ટીઓ વાંચો.",
    "Yes, Rs 8 is 800 paise, more than 650.": "હા, 8 રૂપિયા 800 પૈસા છે, 650 કરતાં વધારે.",
    "Rs 8": "8 રૂપિયા",
    "650 paise": "650 પૈસા",
    "Rupees": "રૂપિયા",
    "Paise": "પૈસા",
    "paise": "પૈસા",
    "rupees": "રૂપિયા",
    "p": "પૈ",
    "Open": "ખોલો",
    "Open all": "બધા ખોલો",
    "Gather": "ભેગા કરો",
    "Same unit": "સમાન એકમ",
  },
};

/* One entry per phase = one mount. */
const PHASES = [
  {
    n: 1,
    concept: "Rupees into paise: multiply by a hundred",
    conceptId: "M1.S2.T4.C15", objectiveIds: ["O5"],
    says: ["Open one rupee at a time. How many paise does each rupee hold?"],
    /* the warm-up the guide step works (never question 1's own coins): one coin */
    warm: { kind: "open", r: 1, p: 0 },
    steps: [{ say: "Tap Open to change one rupee coin into paise.", on: "open", hint: "The Open key is under the two trays." }],
    ladder: ["One coin opens into ten 10 p bars, and that is 100 paise.", "Count the opened coins in hundreds: 100, 200, 300 and on."],
    closing: "One rupee is 100 paise, so multiply the rupees by 100.",
    learned: "You learned: Rs 1 is 100 paise; rupees times 100 gives paise.",
    traceback: "the opened coins light one by one and the working line shows the rupees times 100 paise; the child writes the product",
    items: [
      /* learn CP1: answer in the plan = 700 paise. Plan: A child keeps seven Rs 1 coins in a money box. How many paise is that in all? Open one rupee at a time. */
      { qid: "M1.S2.T4.C15:CP1", kind: "open", r: 7, p: 0, say: "Open all 7 rupee coins from the money box: how many paise is that?", ask: "7 coins in paise?", answer: 700,
        miss: "Count the 10 p bars in one opened coin first.", win: "Yes, 7 rupees open into 700 paise." },
      /* practice 1: answer in the plan = 600 paise. Plan: A purse has six Rs 1 coins in it. How many paise is that? */
      { qid: "M1.S2.T4.C15:1", kind: "open", r: 6, p: 0, say: "A purse holds 6 Rs 1 coins; open them, then say how many paise they make.", ask: "6 coins in paise?", answer: 600,
        miss: "Each coin opened into ten bars of 10 p.", win: "Yes, 6 rupees are 600 paise." },
      /* practice 5: answer in the plan = 1100 paise. Plan: A shopkeeper keeps eleven Rs 1 coins in a bowl. How many paise are in the bowl? */
      { qid: "M1.S2.T4.C15:5", kind: "open", r: 11, p: 0, say: "Open the 11 Rs 1 coins in the shopkeeper's bowl: how many paise are there?", ask: "11 coins in paise?", answer: 1100,
        miss: "How many paise does each opened block hold?", win: "Yes, 11 rupees are 1,100 paise." },
    ],
  },
  {
    n: 2,
    concept: "Rupees and paise into paise: the shortcut",
    conceptId: "M1.S2.T4.C16", objectiveIds: ["O5"],
    says: ["Break the rupees first. Then add the loose paise. What do you get?"],
    warm: { kind: "openall", r: 2, p: 30 },
    steps: [{ say: "Tap Open all to change the rupee coins into paise.", on: "openall", hint: "Find the Open all key under the trays." }],
    ladder: ["Each rupee coin is 100 paise, then add the loose paise.", "Shortcut: take away Rs and the dot from the tag, keeping every digit."],
    closing: "Change the rupees to paise, then add the loose paise.",
    learned: "You learned: rupees to paise first, then add the loose paise.",
    traceback: "the opened hundreds light one by one and the working line shows the rupees times 100 plus the loose paise; the child adds them",
    items: [
      /* learn CP2: answer in the plan = 915 paise. Plan: A pencil box costs Rs 9.15. How many paise is that? Break the rupees first, then add the loose paise. */
      { qid: "M1.S2.T4.C16:CP2", kind: "openall", r: 9, p: 15, say: "A pencil box costs Rs 9.15: open the coins, then find how many paise that is.", ask: "Rs 9.15 in paise?", answer: 915,
        miss: "Change the 9 rupees into paise before you add the 15 paise.", win: "Yes, Rs 9.15 is 915 paise." },
      /* practice 2: answer in the plan = 830 paise */
      { qid: "M1.S2.T4.C16:2", kind: "openall", r: 8, p: 30, say: "A ruler costs Rs 8.30; open its rupees and write the cost in paise.", ask: "Rs 8.30 in paise?", answer: 830,
        miss: "How many paise are the 8 opened coins, before the loose 30?", win: "Yes, Rs 8.30 is 830 paise." },
      /* practice 6: answer in the plan = 1405 paise. Plan: A kite costs Rs 14.05. How many paise is that? Mind the paise: 5 paise is written 05. */
      { qid: "M1.S2.T4.C16:6", kind: "openall", r: 14, p: 5, say: "A kite costs Rs 14.05: after Open all, how many paise does it cost?", ask: "Rs 14.05 in paise?", answer: 1405,
        miss: "Count the opened hundreds first, then add the loose piece.", win: "Yes, Rs 14.05 is 1,405 paise." },
    ],
  },
  {
    n: 3,
    concept: "Paise into rupees: two digits after the dot",
    conceptId: "M1.S2.T4.C17", objectiveIds: ["O6"],
    says: ["Gather every hundred paise into a rupee. What is left over, and where does the dot go?"],
    warm: { kind: "gather", tp: 130 },
    steps: [{ say: "Tap Gather to turn each 100 paise into a rupee coin.", on: "gather", hint: "The Gather key sits below the trays." }],
    ladder: ["The gathered coins tell you the rupees, before the dot.", "Count two digits from the right and put the dot there."],
    closing: "Put the dot two digits from the right to write paise in rupees.",
    learned: "You learned: gather 100 paise into Rs 1; dot two digits from the right.",
    traceback: "the gathered coins light one by one and the tag marks its last two digits in vermilion as the paise; the child places the dot",
    items: [
      /* learn CP3: answer in the plan = Rs 9.60. Plan: A notebook costs 960 paise. Write its cost in rupees. */
      { qid: "M1.S2.T4.C17:CP3", kind: "gather", tp: 960, say: "A notebook costs 960 paise: gather the hundreds, then write the cost in rupees.", ask: "960 paise in Rs?", answer: "9.60",
        miss: "The last two digits are paise, so the dot sits just before them.", win: "Yes, 960 paise is Rs 9.60." },
      /* practice 3: the plan's 275 paise (Rs 2.75) is swapped, on the maths review, for the zero-rupees case: 45 paise = Rs 0.45.
         No full hundred, so nothing to gather: this question is UNGATED */
      { qid: "M1.S2.T4.C17:3", kind: "gather", tp: 45, say: "A sweet costs 45 paise: what is that in rupees?", ask: "45 paise in Rs?", answer: "0.45",
        miss: "With no full hundred, the rupees part is 0.", ladder: ["Write 0, then the dot, then the paise.", "Paise always take two places after the dot."],
        win: "Yes, 45 paise is Rs 0.45." },
      /* practice 7: answer in the plan = Rs 7.05 (and the sticker Rs 0.09); cut to the toy, so one amount is asked. Plan: A toy costs 705 paise and a sticker costs 9 paise. Write each cost in rupees. */
      { qid: "M1.S2.T4.C17:7", kind: "gather", tp: 705, say: "A toy costs 705 paise: after Gather, what is that in rupees?", ask: "705 paise in Rs?", answer: "7.05",
        miss: "Look at the loose pieces, then count two places after the dot.", win: "Yes, 705 paise is Rs 7.05." },
    ],
  },
  {
    n: 4,
    concept: "Which amount is more?",
    conceptId: "M1.S2.T4.C18", objectiveIds: ["O6"],
    says: ["Are both amounts in the same unit? Change one of them, then choose."],
    warm: { kind: "same", a: { u: "rs", v: 300 }, b: { u: "p", v: 290 } },
    steps: [{ say: "Tap Same unit to write both amounts in paise.", on: "same", hint: "Look for the Same unit key below the tags." }],
    ladder: ["Change the rupee amount into paise, then read both numbers.", "Now both are in paise: the longer bar is the bigger amount."],
    closing: "Change both amounts to one unit before you compare them.",
    learned: "You learned: put both amounts in one unit, then compare.",
    traceback: "both bars light in turn from the same start line, each with its amount in paise; nothing is ringed",
    items: [
      /* learn CP4: answer in the plan = Rs 4.20 is more, because 420 paise is more than 410 paise */
      { qid: "M1.S2.T4.C18:CP4", kind: "same", a: { u: "rs", v: 420 }, b: { u: "p", v: 410 }, say: "Which is more: Rs 4.20 or 410 paise?", ask: "Which is more?",
        choices: [{ id: "tagA", label: "Rs 4.20" }, { id: "tagB", label: "410 paise" }], answer: "tagA",
        miss: "Is 410 in rupees or in paise?", win: "Yes, 420 paise is more than 410 paise." },
      /* practice 4: answer in the plan = Rs 5 is more, because Rs 5 is 500 paise and 500 is more than 480 (order swapped so the answer is not always first) */
      { qid: "M1.S2.T4.C18:4", kind: "same", a: { u: "p", v: 480 }, b: { u: "rs", v: 500 }, say: "Put 480 paise and Rs 5 in the same unit: which is the bigger amount?", ask: "Bigger amount?",
        choices: [{ id: "tagA", label: "480 paise" }, { id: "tagB", label: "Rs 5" }], answer: "tagB",
        miss: "Rs 5 is not 5 paise: change it to paise first.", win: "Yes, Rs 5 is 500 paise, more than 480." },
      /* practice 8: the plan's 4600 paise vs Rs 45.50 (46 blocks cannot be drawn, and its raw numbers point the right way) is swapped, on
         the maths review, for a pair of at most 10 blocks whose raw numbers point the WRONG way: Rs 8 vs 650 paise (answer Rs 8) */
      { qid: "M1.S2.T4.C18:8", kind: "same", a: { u: "rs", v: 800 }, b: { u: "p", v: 650 }, say: "A child has Rs 8 and a friend has 650 paise: who has more?", ask: "Who has more?",
        choices: [{ id: "tagA", label: "Rs 8" }, { id: "tagB", label: "650 paise" }], answer: "tagA",
        miss: "Read the bars, not the bigger number on the tags.", win: "Yes, Rs 8 is 800 paise, more than 650." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  colours: { rupees: "deep blue", paise: "vermilion", value: "amber", total: "green" },
  pieces: { coin: "Rs 1 coin (photo skin, deep-blue ring)", block: "100 p = ten 10 p bars", bar: "10 p", five: "5 p" },
  acts: { 1: "Open (one coin), then Open all", 2: "Open all", 3: "Gather", 4: "Same unit" },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item? */
const judge = (item: any, v: any) => {
  const s = String(v ?? "").trim();
  if (item.choices) return s.toLowerCase() === String(item.answer).toLowerCase();
  if (typeof item.answer === "number") return /^[1-9]\d*$/.test(s) && Number(s) === item.answer;
  return s === item.answer;
};
/* oracle: every answer re-derived by a second route */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "open") return String(it.answer) === String(it.r) + "00";
  if (it.kind === "openall") return String(it.answer) === String(it.r) + (it.p < 10 ? "0" : "") + String(it.p);
  if (it.kind === "gather") { const s = String(it.tp); return it.answer === (s.slice(0, -2) || "0") + "." + s.slice(-2); }
  const ra = it.a.v / 100, rb = it.b.v / 100;
  return it.answer === (ra > rb ? "tagA" : "tagB") && ra !== rb;
}));
/* the most likely wrong answer (the misconception) */
const nearMiss = (item: any) => {
  if (item.choices) return item.answer === "tagA" ? "tagB" : "tagA";          /* the bigger number in the other unit */
  if (item.kind === "open") return item.r;                                    /* the rupees copied as paise */
  if (item.kind === "openall") return item.r + item.p;                        /* rupees added to paise, unchanged */
  const s = String(item.tp); return s.slice(0, -1) + "." + s.slice(-1);       /* the dot one digit from the right */
};
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.choices ? []
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
  : [String(item.answer), speakable(item.answer)]);
/* the answer as the teacher agent gives it */
const agentKey = (item: any) => item.answer;

/* the dev driver and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() */
const answer = (item: any, v: any) => (typeof item.answer === "string" && !item.choices && HOOK.type ? HOOK.type(v) : undefined);
/* the agent's check() before Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the picture's pieces (module scope: called, never mounted inside Work) ─────────────────── */
const C18_RS = "#1D4F91";          /* rupees: deep blue */
const C18_PS = "#D24A14";          /* paise: vermilion */
const C18_PSI = "#A33C0E";         /* paise: vermilion ink for words */
const C18_GR = "#17784A";          /* a converted amount, the answer: green */
const C18_AM = "#B87700";          /* the price of one thing: amber edge */
let C18_TOUCH = false;              /* a real child input reached the board (a tap, a key's press, Enter on a guide step): the gate is user input only */
let C18_KEYAT = 0;                 /* when a real Enter / Space key last went down (an Enter on a guide step is the child's, a toolApi check() is not) */
let C18_PU = "p", C18_RU = "", C18_DY = 0;   /* the paise mark, the rupee word and a baseline drop for Devanagari / Gujarati (set by Work, StartArt, Thumb) */
const c18Units = (lang: any, tx: any) => {
  const ind = lang === "hi" || lang === "gu";
  C18_PU = ind ? tx("p") : "p"; C18_RU = ind ? tx("rupees") : ""; C18_DY = ind ? 5 : 0;
};
/* the width of a line of bold text, by character (Poppins-like advance widths) */
const c18W = (t: string, fs: number) => [...String(t)].reduce((m, ch) => m + fs * (/[0-9]/.test(ch) ? 0.62 : /[ ,.]/.test(ch) ? 0.3 : /[×+=]/.test(ch) ? 0.62 : 0.6), 0);

/* square-ish pieces in a box, as big as they fit (ar = height / width) */
function c18Grid(n: number, x: number, y: number, w: number, h: number, gap: number, maxS: number, ar = 1) {
  if (n <= 0) return [] as any[];
  let s = 0, cols = 1;
  for (let c = 1; c <= n; c++) {
    const r = Math.ceil(n / c);
    const t = Math.min((w - (c - 1) * gap) / c, (h - (r - 1) * gap) / r / ar, maxS);
    if (t > s) { s = t; cols = c; }
  }
  const rows = Math.ceil(n / cols), gw = cols * s + (cols - 1) * gap, gh = rows * s * ar + (rows - 1) * gap;
  const ox = x + (w - gw) / 2, oy = y + (h - gh) / 2;
  return Array.from({ length: n }, (_, i) => ({ x: ox + (i % cols) * (s + gap), y: oy + Math.floor(i / cols) * (s * ar + gap), w: s, h: s * ar }));
}

/* a hundred is ALWAYS a block of ten bare strips, two across and five down (the owner, 2026-11-16: never a "100 p" brick, no text on
   a piece); a loose 10 p is one of those strips at the same size and a 5 p half of one. One function gives the strip of a block */
const c18StripOf = (b: any) => { const g = b.w < 90 ? 3 : 4; return { g, cw: (b.w - 3 * g) / 2, ch: (b.h - 6 * g) / 5 }; };
/* loose paise in balanced rows (never a lone orphan): 10 p pieces, then 5 p pieces, each 5 p half as long as a 10 p */
function c18Lane(tens: number, fives: number, x: number, w: number, sw: number, sh: number, fiveW = sw / 2) {
  const n = tens + fives, gap = 10;
  if (!n) return { pieces: [] as any[], rows: 0, h: 0 };
  const widthOf = (i: number) => sw;          /* a 5 p takes a 10 p's place: its own half filled, the other half a dashed outline */
  let rows = 1;
  for (;;) {
    const per = Math.ceil(n / rows);
    let ok = true;
    for (let r = 0; r < rows && ok; r++) {
      let tw = 0;
      for (let i = r * per; i < Math.min(n, (r + 1) * per); i++) tw += widthOf(i) + (i > r * per ? gap : 0);
      if (tw > w) ok = false;
    }
    if (ok || rows >= n) break;
    rows++;
  }
  const per = Math.ceil(n / rows), out: any[] = [];
  for (let r = 0; r < rows; r++) {
    let cx = 0;
    for (let i = r * per; i < Math.min(n, (r + 1) * per); i++) {
      out.push({ kind: i < tens ? "ten" : "five", x: x + cx, row: r, w: i < tens ? sw : fiveW, full: sw, h: sh });
      cx += widthOf(i) + gap;
    }
  }
  return { pieces: out, rows, h: rows * sh + (rows - 1) * gap };
}

/* an amount as printed: "Rs 4.20", "Rs 5", "410 paise", "4,600 paise" */
const c18Rs = (v: number) => "Rs " + (v % 100 ? (Math.floor(v / 100) + "." + String(v % 100).padStart(2, "0")) : String(v / 100));
/* an amount in rupees as printed: "Rs 9.60" in English, "9.60 रुपये" / "9.60 રૂપિયા" in Hindi and Gujarati */
const c18RsT = (v: number) => (C18_RU ? c18Rs(v).slice(3) + " " + C18_RU : c18Rs(v));
/* the same, coloured for a tag: rupees deep blue, the dot near-black, the paise vermilion */
const c18RsParts = (whole: string, pp: string | null) => {
  const tail = pp !== null ? [[".", "#2B2B2B"], [pp, C18_PSI]] : [];
  return C18_RU ? [[whole, C18_RS], ...tail, [" " + C18_RU, C18_RS]] : [["Rs " + whole, C18_RS], ...tail];
};
const c18Amt = (a: any) => (a.u === "rs" ? c18Rs(a.v) : indian(a.v) + " paise");

/* what a question puts on the board */
function c18Board(it: any) {
  if (it.kind === "gather") return { coins: Math.floor(it.tp / 100), tens: Math.floor((it.tp % 100) / 10), fives: (it.tp % 10) / 5 };
  if (it.kind === "same") return { coins: 0, tens: 0, fives: 0 };
  return { coins: it.r, tens: Math.floor(it.p / 10), fives: (it.p % 10) / 5 };
}

/* the layout, from the room the working area has (box.w), never from constants */
function c18Layout(W: number, it: any, free: boolean) {
  const CW = Math.min(W - 32, 1240), x0 = (W - CW) / 2;
  const rw = Math.round(CW * (W < 1100 ? 0.32 : 0.34)), gap = 24, pw = CW - rw - gap;   /* the paise tray gets a little more room with the panel open */
  const ty = 100, th = 322;
  const R = { x: x0, y: ty, w: rw, h: th }, P = { x: x0 + rw + gap, y: ty, w: pw, h: th };
  const inR = { x: R.x + 22, y: ty + 64, w: rw - 44, h: th - 88 }, inP = { x: P.x + 22, y: ty + 64, w: pw - 44, h: th - 88 };
  const b = free ? { coins: 4, tens: 0, fives: 0 } : c18Board(it);
  const coins = c18Grid(b.coins, inR.x, inR.y, inR.w, inR.h, 10, 118);
  /* every hundred a block of ten strips, as big as the tray allows (re-flowed into rows); the loose strips copy that block's strip */
  const gridOf = (laneH: number) => c18Grid(b.coins, inP.x, inP.y, inP.w, inP.h - (laneH ? laneH + 14 : 0), 8, 224, 1);
  const sizeOf = (bk: any) => { if (!bk) return { sw: 100, sh: 36 }; const st = c18StripOf(bk); return { sw: st.cw, sh: st.ch }; };
  let lane = c18Lane(b.tens, b.fives, inP.x, inP.w, 60, 16);
  let blocks = gridOf(lane.h);
  let sz = sizeOf(blocks[0]);
  for (let pass = 0; pass < 2; pass++) {
    lane = c18Lane(b.tens, b.fives, inP.x, inP.w, sz.sw, sz.sh);
    blocks = gridOf(lane.h);
    sz = sizeOf(blocks[0]);
  }
  lane = c18Lane(b.tens, b.fives, inP.x, inP.w, sz.sw, sz.sh);
  const brick = false, lab = false;
  const laneY = inP.y + inP.h - lane.h;
  const loose = lane.pieces.map((q: any) => ({ ...q, y: laneY + q.row * (sz.sh + 10), brick, lab }));
  const key = { w: 260, h: 76, x: W / 2 - 130, y: 436 };
  return { CW, x0, R, P, inR, inP, coins, blocks, loose, key, brick, ratio: sz.sw / sz.sh, tag: { x: x0, y: 4, w: 340, h: 84 } };
}

/* a kraft price tag with an amount on it: parts = [[text, colour], ...]. A tag shape (the left end cut to a point, a hole with its string
   loop), the kraft photo as its paper grain, and a cream label panel the amount is printed on */
function c18Tag(x: number, y: number, w: number, h: number, parts: any[], id: string, extra: any = {}, fs = 44) {
  const clipId = "c18t-" + id, n = 26;
  const body = `M ${x + n} ${y} H ${x + w - 12} Q ${x + w} ${y} ${x + w} ${y + 12} V ${y + h - 12} Q ${x + w} ${y + h} ${x + w - 12} ${y + h} H ${x + n} L ${x} ${y + h - n} V ${y + n} Z`;
  const txt = parts.map((p: any) => String(p[0])).join("");
  const size = Math.max(32, Math.min(C18_DY ? Math.min(fs, 52) : fs, (w - 74) / Math.max(1, c18W(txt, 1))));
  const dy = C18_DY ? Math.round(size * 0.12) : 0;
  return (
    <g key={id} {...extra}>
      <defs><clipPath id={clipId}><path d={body} /></clipPath></defs>
      <path d={body} transform="translate(0,4)" fill="#000000" fillOpacity={0.15} />
      <path d={body} fill="#E4C994" />
      <Skin name="pricetag" x={x} y={y} w={w} h={h} clip={`url(#${clipId})`} />
      <path d={body} fill="none" stroke={C18_AM} strokeWidth={4} strokeLinejoin="round" />
      <rect x={x + 46} y={y + 9} width={w - 58} height={h - 18} rx={10} fill="#FFF8EA" fillOpacity={0.92} />
      <circle cx={x + 22} cy={y + h / 2} r={7} fill="#FFF8EA" stroke="#7A5530" strokeWidth={3} />
      <path d={`M ${x + 22} ${y + h / 2 - 7} C ${x + 14} ${y + 4}, ${x + 30} ${y - 2}, ${x + 40} ${y + 6}`} fill="none" stroke="#8A6A3A" strokeWidth={3} strokeLinecap="round" />
      <text x={x + 46 + (w - 58) / 2} y={y + h / 2 + 1 + dy} textAnchor="middle" dominantBaseline="central" fontSize={size} fontWeight={700}>
        {parts.map((p: any, i: number) => <tspan key={i} fill={p[1]}>{p[0]}</tspan>)}
      </text>
    </g>
  );
}

/* a Rs 1 coin: the owner's photo over a plain silver disc, ringed deep blue so it reads as rupees */
function c18Coin(c: any, id: string, lit = false) {
  const r = c.w / 2, cx = c.x + r, cy = c.y + r;
  const clipId = "c18c-" + id;
  return (
    <g key={id}>
      <defs>
        <clipPath id={clipId}><circle cx={cx} cy={cy} r={r - 3} /></clipPath>
      </defs>
      <circle cx={cx} cy={cy + 4} r={r - 1} fill="#000000" fillOpacity={0.18} />
      <circle cx={cx} cy={cy} r={r - 3} fill="#DCE1E6" />
      <Skin name="coin1" x={cx - r} y={cy - r} w={2 * r} h={2 * r} clip={`url(#${clipId})`} />
      <circle cx={cx} cy={cy} r={r - 5} fill="none" stroke="#FFFFFF" strokeWidth={1.5} strokeOpacity={0.6} />
      <circle cx={cx} cy={cy} r={r - 3} fill="none" stroke={lit ? C18_GR : C18_RS} strokeWidth={lit ? 8 : 4.5} />
    </g>
  );
}

/* an empty place where a coin was (or will be) */
const c18Slot = (c: any, id: string) => (
  <circle key={id} cx={c.x + c.w / 2} cy={c.y + c.w / 2} r={c.w / 2 - 4} fill="none" stroke={C18_RS} strokeOpacity={0.45} strokeWidth={3} strokeDasharray="8 7" />
);

/* one hundred paise: ten bare 10 p strips, two across and five down */
function c18Block(b: any, id: string, lit = false, plain = false) {
  const { g, cw, ch } = c18StripOf(b);
  if (plain) {   /* phase 4's bars only: a flat "100 p" brick (what the educator accepted there) */
    const lab = "100 " + C18_PU, fs = Math.max(T.micro, Math.min(T.label, (b.w - 8) / Math.max(1, c18W(lab, 1))));
    return (
      <g key={id}>
        <rect x={b.x} y={b.y + 4} width={b.w} height={b.h} rx={8} fill="#000000" fillOpacity={0.16} />
        <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={8} fill={C18_PS} stroke={lit ? C18_GR : "#7A2204"} strokeWidth={lit ? 6 : 2.5} />
        <rect x={b.x + 3} y={b.y + 3} width={b.w - 6} height={3} rx={1.5} fill="#FFFFFF" opacity={0.35} />
        <text x={b.x + b.w / 2} y={b.y + b.h / 2 + C18_DY} textAnchor="middle" dominantBaseline="central" fontSize={fs} fontWeight={700} fill="#FFFFFF">{lab}</text>
      </g>
    );
  }
  return (
    <g key={id}>
      <rect x={b.x} y={b.y + 4} width={b.w} height={b.h} rx={10} fill="#000000" fillOpacity={0.16} />
      <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={10} fill="#FFF4EE" stroke={lit ? C18_GR : C18_PSI} strokeWidth={lit ? 6 : 3} />
      {Array.from({ length: 10 }, (_, j) => {
        const x = b.x + g + (j % 2) * (cw + g), y = b.y + g + Math.floor(j / 2) * (ch + g);
        return (
          <g key={j}>
            <rect x={x} y={y} width={cw} height={ch} rx={Math.min(6, ch / 3)} fill={C18_PS} stroke="#7A2204" strokeWidth={1.5} />
            <rect x={x + 2} y={y + 1} width={cw - 4} height={Math.min(2, ch / 4)} rx={1} fill="#FFFFFF" opacity={0.35} />
          </g>
        );
      })}
    </g>
  );
}

/* a loose 10 p bar or 5 p piece */
function c18Loose(q: any, id: string) {
  const full = q.kind === "five" ? (q.full || q.w * 2) : q.w, rx = q.brick ? 8 : Math.min(6, q.h / 3), t = (q.kind === "ten" ? "10 " : "5 ") + C18_PU;
  const fs = q.brick && q.kind === "ten" ? Math.max(T.micro, Math.min(T.label, (q.w - 8) / Math.max(1, c18W(t, 1)))) : T.micro;
  return (
    <g key={id}>
      {q.kind === "five" && <rect x={q.x} y={q.y} width={full} height={q.h} rx={rx} fill="none" stroke="#7A2204" strokeOpacity={0.4} strokeWidth={1.5} strokeDasharray="5 4" />}
      <rect x={q.x} y={q.y + (q.brick ? 4 : 2)} width={q.w} height={q.h} rx={rx} fill="#000000" fillOpacity={0.16} />
      <rect x={q.x} y={q.y} width={q.w} height={q.h} rx={rx} fill={C18_PS} stroke="#7A2204" strokeWidth={q.brick ? 2.5 : 1.5} />
      <rect x={q.x + 2} y={q.y + (q.brick ? 3 : 1)} width={q.w - 4} height={q.brick ? 3 : Math.min(2, q.h / 4)} rx={1} fill="#FFFFFF" opacity={0.35} />
      {q.lab && <text x={q.x + q.w / 2} y={q.y + q.h / 2 + C18_DY} textAnchor="middle" dominantBaseline="central" fontSize={fs} fontWeight={700} fill="#FFFFFF">{t}</text>}
    </g>
  );
}

/* a wooden tray with its heading drawn in code over the wood */
function c18Tray(T0: any, label: string, ink: string, id: string, tx: any, legend?: any) {
  const clipId = "c18w-" + id;
  const labelText = tx(label);
  const labelW = Math.max(160, labelText.length * 20 + 36);
  return (
    <g key={id}>
      <defs>
        <clipPath id={clipId}><rect x={T0.x} y={T0.y} width={T0.w} height={T0.h} rx={18} /></clipPath>
      </defs>
      <rect x={T0.x} y={T0.y + 6} width={T0.w} height={T0.h} rx={18} fill="#000000" fillOpacity={0.15} />
      <rect x={T0.x} y={T0.y} width={T0.w} height={T0.h} rx={18} fill="#F1DDB8" />
      <g style={{ mixBlendMode: "multiply" } as any}><Skin name="tray" x={T0.x} y={T0.y} w={T0.w} h={T0.h} fit="stretch" clip={`url(#${clipId})`} /></g>
      <rect x={T0.x} y={T0.y} width={T0.w} height={T0.h} rx={18} fill="none" stroke="#8A6A3A" strokeWidth={4} />
      <rect x={T0.x + 4} y={T0.y + 4} width={T0.w - 8} height={T0.h - 8} rx={14} fill="none" stroke="#5E431E" strokeWidth={2} strokeOpacity={0.3} />
      <g>
        <rect x={T0.x + 14} y={T0.y + 10} width={labelW} height={44} rx={12} fill="#FFFDF7" stroke={ink} strokeWidth={3} />
        <text x={T0.x + 14 + labelW / 2} y={T0.y + 32 + C18_DY} textAnchor="middle" dominantBaseline="central" fontSize={T.label} fontWeight={700} fill={ink}>{labelText}</text>
      </g>
      {legend && (
        <g>
          <rect x={T0.x + T0.w - 172} y={T0.y + 10} width={158} height={44} rx={12} fill="#FFFDF7" stroke={ink} strokeWidth={2.5} />
          {(() => { const r = typeof legend === "number" ? legend : 5, lw = 46, lh = Math.max(10, Math.min(24, lw / r));
            return <rect x={T0.x + T0.w - 164} y={T0.y + 32 - lh / 2} width={lw} height={lh} rx={Math.min(5, lh / 3)} fill={C18_PS} stroke="#7A2204" strokeWidth={1.5} />; })()}
          <text x={T0.x + T0.w - 112} y={T0.y + 32 + C18_DY} dominantBaseline="central" fontSize={T.micro} fontWeight={700} fill={ink}>{"= 10 " + C18_PU}</text>
        </g>
      )}
    </g>
  );
}

/* ── the working area ──────────────────────────────────────────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  c18Units(lang, tx);
  const tl = useTimeline();
  const ta = useTimeline();
  const free = stage === "free";
  const warmUp = !free && (stage === "demo" || stage === "teach") && phase.warm;
  const it = free ? { kind: "free" } : warmUp ? phase.warm : item;
  const W = box ? box.w : 1472;
  const kx = box && box.key ? box.key.x - 12 : W;
  const won = !free && !warmUp && (stage === "win" || stage === "idle");

  /* the board is keyed to the ENTRY of a question (PATTERNS 18) */
  const qk = free ? "free" : n + "." + (warmUp ? "w" : index);
  const entry = useRef({ qk: "", n: 0 });
  if (entry.current.qk !== qk) entry.current = { qk, n: entry.current.n + 1 };
  const ek = qk + "#" + entry.current.n;
  const fresh = () => ({ ek, k: 0, fc: 2 });
  const [raw, setRaw] = useState(fresh);
  const S = raw.ek === ek ? raw : fresh();
  const put = (f: any) => setRaw((p: any) => { const b = p.ek === ek ? p : fresh(); return { ...b, ...f(b) }; });
  const [touched, setTouched] = useState(C18_TOUCH);
  const [tb, setTb] = useState(-1);                    /* the traceback: which piece is lit, -1 none */
  const playing = useRef(false);
  const lastKey = useRef(0);

  const L = c18Layout(W, it, free);
  const total = it.kind === "same" ? 1 : free ? 0 : (c18Board(it).coins);
  const done = free ? false : won ? true : S.k >= total;
  const k = won ? total : S.k;

  /* the act: the drawn hand taps each coin (open), each hundred (gather) or the rupee tag (same unit) */
  const keyId = free ? "" : it.kind === "open" ? (k === 0 ? "open" : "openall") : it.kind;
  const keyLabel: any = { open: "Open", openall: "Open all", gather: "Gather", same: "Same unit" };
  const tagW = (a: any) => Math.min(Math.round(L.CW * 0.5), Math.round(c18W(a.u === "rs" ? c18RsT(a.v) : indian(a.v) + " " + tx("paise"), 60) + 90));
  const tagsFor = (a: any, b: any) => ({ A: { x: L.x0, y: 94, w: tagW(a), h: 84 }, B: { x: L.x0, y: 296, w: tagW(b), h: 84 } });
  const doAct = (on: string) => {
    if (playing.current || stage === "win" || stage === "idle") return;
    if (warmUp && on !== stepOn) { api.did(on); return; }
    if (done) return;
    let from = S.k, to = total, at: any[] = [];
    if (it.kind === "open" && on === "open") to = from + 1;
    if (it.kind === "gather") at = L.blocks.slice(from, to).map((b: any) => ({ x: b.x + b.w / 2, y: b.y + b.h / 2 }));
    else if (it.kind === "same") { const tg = tagsFor(it.a, it.b); const r = it.a.u === "rs" ? tg.A : tg.B; at = [{ x: r.x + r.w / 2, y: r.y + r.h / 2 }]; }
    else at = L.coins.slice(from, to).map((c: any) => ({ x: c.x + c.w / 2, y: c.y + c.w / 2 }));

    playing.current = true;
    const m = Math.max(1, at.length), ms = Math.max(140, Math.min(320, 1500 / m));
    ta.run([...at.map((_: any, i: number) => [ms, () => { put(() => ({ k: from + i + 1 })); api.sfx.tick(); }] as any), [200, () => {}]], () => {
      playing.current = false;
      put(() => ({ k: to }));
      if (it.kind === "gather") api.sfx.trade(); else api.sfx.settle();
      if (warmUp) api.did(on);
    });
  };
  const freeAct = (on: string) => {
    if (playing.current) return;
    const fc = S.fc;
    if ((on === "open" && fc <= 0) || (on === "gather" && fc >= 4)) return;
    const p = on === "open" ? L.coins[fc - 1] : L.blocks[3 - fc];
    void p;
    playing.current = true;
    ta.run([[260, () => {}]], () => {
      playing.current = false;
      put((b: any) => ({ fc: b.fc + (on === "open" ? -1 : 1) }));
      if (on === "gather") api.sfx.trade(); else api.sfx.settle();
    });
  };
  const touch = () => { C18_TOUCH = true; if (!touched) setTouched(true); };
  const press = (on: string) => {
    touch();
    const t = Date.now();
    if (t - lastKey.current < 400) return;
    lastKey.current = t;
    if (free) freeAct(on); else doAct(on);
  };
  /* Enter, the agent's check() and the dev solve() perform the CURRENT step */
  api.onEnter(stage === "demo" && stepOn ? () => { if (Date.now() - C18_KEYAT < 400) touch(); doAct(stepOn); } : null);
  HOOK.demo = () => { if (stage === "demo" && stepOn) doAct(stepOn); };
  HOOK.check = stage === "ask" ? () => { if (!done) { ta.stop(); playing.current = false; put(() => ({ k: total })); } return undefined; } : null;
  HOOK.type = (v: any) => { api.setTyped(String(v)); return true; };

  /* ANSWER GATED BY THE ACT (PATTERNS 19): locked while the act waits, once a REAL input (mouse, finger or keyboard) has reached the
     tool; toolApi / AI mode (no real input) stay ungated. Once locked the Answer key is flat and quiet, so the pulsing act key is the one cue */
  const aiMode = typeof document !== "undefined" && (document.querySelector('[data-zone="bar"]') || { getAttribute: () => "" }).getAttribute("data-mode") === "ai";
  const gated = stage === "ask" && !done && touched && !aiMode;
  const wantAct = stage === "ask" && !done && !free;
  /* real keys and taps: Enter or Space (a guide step by keyboard), a tap anywhere on the board; a tap on the board that is not a
     control, while the act still waits, gets a nudge naming the act (then the question comes back once it is done) */
  const nudged = useRef(false);
  const live = useRef({} as any);
  live.current = { wantAct, gated, kind: it.kind === "open" && S.k > 0 ? "openall" : it.kind, touch };
  useEffect(() => {
    /* the nudge naming the act (said after the runtime has handled the refused press, so it is not overwritten) */
    const nudge = () => {
      const kd2 = live.current.kind;
      nudged.current = true;
      setTimeout(() => {
        if (!live.current.wantAct) return;
        if (kd2 === "open") api.say("Press Open first, then count the paise.");
        else if (kd2 === "openall") api.say("Press Open all first, then count the paise.");
        else if (kd2 === "gather") api.say("Press Gather first, then write the rupees.");
        else if (kd2 === "same") api.say("First press Same unit, then choose.");
      }, 30);
    };
    /* a digit, a point or Enter while the gate holds (the keys are refused): the nudge; Enter on a focused control of the board is
       that control's own press (the act key), never a nudge */
    const kd = (e: any) => {
      if (!e.isTrusted) return;
      if (e.key === "Enter" || e.key === " ") C18_KEYAT = Date.now();
      if (!live.current.gated) return;
      const t = e.target as any;
      if ((e.key === "Enter" || e.key === " ") && t && t.closest && t.closest('[data-zone="work"] [data-control]')) return;
      if (/^[0-9.]$/.test(e.key) || e.key === "Enter") nudge();
    };
    /* a tap on the board that is not a control while the act waits, or on the dimmed Answer key (or a pad key) while the gate holds */
    const pd = (e: any) => {
      const t = e.target as any;
      if (!e.isTrusted || !t || !t.closest) return;
      if (t.closest('[data-zone="work"]')) {
        live.current.touch();
        if (!live.current.wantAct || t.closest("[data-control]")) return;
        nudge();
        return;
      }
      if (live.current.gated && t.closest('[data-control="answer-open"], [data-control^="key-"], [data-zone="ask"]')) nudge();
    };
    window.addEventListener("keydown", kd, true);
    window.addEventListener("pointerdown", pd, true);
    return () => { window.removeEventListener("keydown", kd, true); window.removeEventListener("pointerdown", pd, true); };
  }, []);
  useEffect(() => { if (!wantAct && nudged.current && stage === "ask") { nudged.current = false; api.say(item.say); } if (!wantAct) nudged.current = false; }, [wantAct]);
  const gateOn = useRef(false);
  useEffect(() => {
    if (gated && !gateOn.current) { gateOn.current = true; api.lock(true); }
    else if (!gated && gateOn.current) { gateOn.current = false; api.lock(false); }
  }, [gated]);

  /* the traceback */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    if (!done) { ta.stop(); playing.current = false; put(() => ({ k: total })); }
    api.lock(true);
    const m = it.kind === "same" ? 2 : total;
    tl.run([...Array.from({ length: m }, (_, j) => [Math.max(160, 1200 / m), () => setTb(j)] as any), [500, () => setTb(-1)]], () => api.lock(false));
  }, [wrong]);
  useEffect(() => () => { tl.stop(); ta.stop(); playing.current = false; }, [ek]);

  /* the win line */
  useEffect(() => { if (stage === "win" && !free && item.win) api.say(item.win); }, [stage]);

  api.share({ complete: stage === "idle", phase: n, act: free ? null : keyId || null, actDone: done, unit: it.kind === "same" ? (done ? "paise" : "mixed") : null });

  /* ── the drawing ── */
  const shelf = (
    <g>
      <defs>
        <clipPath id="c18-shelf"><rect x={L.x0 - 12} y={392} width={L.CW + 24} height={40} rx={8} /></clipPath>
      </defs>
      <rect x={L.x0 - 12} y={396} width={L.CW + 24} height={40} rx={8} fill="#000000" fillOpacity={0.15} />
      <rect x={L.x0 - 12} y={392} width={L.CW + 24} height={40} rx={8} fill="#C79A5E" />
      <Skin name="shelf" x={L.x0 - 12} y={392} w={L.CW + 24} h={40} clip="url(#c18-shelf)" />
      <rect x={L.x0 - 12} y={428} width={L.CW + 24} height={6} rx={3} fill="#7A5530" />
    </g>
  );
  const keyIds: string[] = free ? ["open", "gather"] : (done || won || (stage !== "ask" && !warmUp)) ? [] : [keyId];
  const keys = keyIds.map((id, j) => {
    const w = 260, x = keyIds.length === 1 ? L.key.x : W / 2 - w - 12 + j * (w + 24);
    const off = free && ((id === "open" && S.fc <= 0) || (id === "gather" && S.fc >= 4));
    const inv = !off && (warmUp ? stepOn === id : !free);
    return (
      <g key={"k" + j}>
        <Key id={id} label={tx(keyLabel[id])} x={x} y={L.key.y} w={w} h={L.key.h} C={C} tone="key" disabled={off} onClick={() => press(id)}>
          <text y={1} textAnchor="middle" dominantBaseline="central" fontSize={T.label} fontWeight={700} fill={off ? C.dim : toneInk("key", C.ink)}>{tx(keyLabel[id])}</text>
        </Key>
        {inv && <Invite x={x + w / 2} y={L.key.y + L.key.h / 2} w={w} h={L.key.h} rx={RAD.key} C={C} />}
      </g>
    );
  });

  /* the working line */
  const line = (s: string, green: boolean) => {
    const fs = W < 1100 ? 34 : T.prompt;
    let x = L.x0 + (it.kind === "open" ? 0 : L.tag.w + 24);
    return s.split(/ (?=[+=] )|(?<=[+=]) /).map((term, j) => {
      const el = <text key={j} x={x} y={58 + C18_DY} fontSize={fs} fontWeight={700} fill={green ? C18_GR : C.ink}>{term}</text>;
      x += c18W(term, fs) + 16;
      return el;
    });
  };

  if (it.kind === "same") {
    const tg = tagsFor(it.a, it.b);
    /* one scale per question, the SAME for both of its bars, the larger amount filling the room (bars appear only once the act is done,
       when the key below has gone, so the second bar may use the bottom of the area) */
    /* the leftover end piece of each bar is labelled with its paise just past the bar's end (educator, 2026-11-16), so the scale keeps
       room for that label after the longer bar; both labels look the same (no emphasis on the longer one) */
    const remW = (it.a.v % 100 || it.b.v % 100) ? 128 : 0;
    const sx = L.x0 + 8, bh = 76, u = (L.CW - 16 - remW) / Math.max(it.a.v, it.b.v);
    const lenOf = (v: number) => Math.round(v * u);
    const bigJ = it.answer === "tagA" ? 0 : 1;
    const rows = [it.a, it.b].map((a: any, j: number) => {
      const r = j ? tg.B : tg.A, y = r.y + r.h + 10, nb = Math.floor(a.v / 100), rem = a.v % 100, len = lenOf(a.v);
      const winInk = won && j === bigJ;
      return (
        <g key={j}>
          {done && <text x={r.x + r.w + 24} y={r.y + r.h / 2 + C18_DY} dominantBaseline="central" fontSize={T.xl} fontWeight={700} fill={winInk ? C18_GR : C18_PSI}>{"= " + indian(a.v) + " " + tx("paise")}</text>}
          {done && Array.from({ length: nb }, (_, i) => c18Block({ x: sx + i * 100 * u + 2, y, w: 100 * u - 4, h: bh }, "pb" + j + "-" + i, false, true))}
          {done && rem > 0 && <rect x={sx + nb * 100 * u + 2} y={y} width={Math.max(6, rem * u - 4)} height={bh} rx={4} fill={C18_PS} stroke="#7A2204" strokeWidth={2} />}
          {done && rem > 0 && <text x={sx + len + 30} y={y + bh / 2 + C18_DY} dominantBaseline="central" fontSize={T.label} fontWeight={700} fill={C18_PSI}>{rem + " " + C18_PU}</text>}
          {done && <line x1={sx - 4} y1={y - 8} x2={sx - 4} y2={y + bh + 8} stroke={C.ink} strokeWidth={5} strokeLinecap="round" />}
          {tb === j && <rect x={sx - 8} y={y - 6} width={len + 16} height={bh + 12} rx={12} fill="none" stroke={C.ink} strokeWidth={5} pointerEvents="none" />}
        </g>
      );
    });
    const amtParts = (a: any) => (a.u === "rs"
      ? c18RsParts(String(Math.floor(a.v / 100)), a.v % 100 ? String(a.v % 100).padStart(2, "0") : null)
      : [[indian(a.v) + " " + tx("paise"), C18_PSI]]);
    const br = bigJ ? tg.B : tg.A;
    return (
      <g>
        {c18Tag(tg.A.x, tg.A.y, tg.A.w, tg.A.h, amtParts(it.a), "a", {}, 64)}
        {c18Tag(tg.B.x, tg.B.y, tg.B.w, tg.B.h, amtParts(it.b), "b", {}, 64)}
        {rows}
        {won && !warmUp && (
          <rect data-reveals="answer" x={sx - 12} y={br.y + br.h + 2} width={lenOf(Math.max(it.a.v, it.b.v)) + 24} height={bh + 16} rx={14} fill="none" stroke={C18_GR} strokeWidth={6} pointerEvents="none" />
        )}
        {keys}
      </g>
    );
  }

  /* trays */
  const isGather = it.kind === "gather";
  const coinOn = (i: number) => (free ? i < S.fc : isGather ? i < k : i >= k);
  const blockOn = (i: number) => (free ? i < 4 - S.fc : isGather ? i >= k : i < k);
  let tag: any = null, work: any = null;
  if (it.kind === "openall") {
    const pp = String(it.p).padStart(2, "0");
    tag = won
      ? <g data-reveals="answer">{c18Tag(L.tag.x, L.tag.y, L.tag.w, L.tag.h, [[indian(item.answer) + " " + tx("paise"), C18_GR]], "t")}</g>
      : c18Tag(L.tag.x, L.tag.y, L.tag.w, L.tag.h, c18RsParts(String(it.r), pp), "t");
    if (won) work = <g data-reveals="answer">{line(it.r + " × 100 " + C18_PU + " + " + it.p + " " + C18_PU + " = " + indian(item.answer) + " " + C18_PU, true)}</g>;
    else if (wrong && stage === "ask") work = line(it.r + " × 100 " + C18_PU + " + " + it.p + " " + C18_PU, false);
  } else if (isGather) {
    const s = String(it.tp), hd = s.slice(0, -2), lo = s.slice(-2);
    tag = won
      ? <g data-reveals="answer">{c18Tag(L.tag.x, L.tag.y, L.tag.w, L.tag.h, c18RsParts(hd || "0", lo), "t")}</g>
      : c18Tag(L.tag.x, L.tag.y, L.tag.w, L.tag.h, [[s + " " + tx("paise"), C18_PSI]], "t");
    if (won) work = <g data-reveals="answer">{line(s + " " + C18_PU + " = " + c18RsT(it.tp), true)}</g>;
    else if (wrong && stage === "ask") work = line(s + " " + C18_PU + " = " + Math.floor(it.tp / 100) + " × 100 " + C18_PU + " + " + (it.tp % 100) + " " + C18_PU, false);
  } else if (it.kind === "open" && !warmUp) {
    if (won) work = <g data-reveals="answer">{line(it.r + " × 100 " + C18_PU + " = " + indian(item.answer) + " " + C18_PU, true)}</g>;
    else if (wrong && stage === "ask") work = line(it.r + " × 100 " + C18_PU, false);
  }

  return (
    <g>
      {shelf}
      {free && c18Tag(L.R.x, L.tag.y, Math.min(L.R.w, 300), L.tag.h, c18RsParts(String(S.fc), null), "fr")}
      {free && c18Tag(L.P.x, L.tag.y, Math.min(L.P.w, 340), L.tag.h, [[(4 - S.fc) * 100 + " " + tx("paise"), C18_PSI]], "fp")}
      {c18Tray(L.R, "Rupees", C18_RS, "r", tx)}
      {c18Tray(L.P, "Paise", C18_PSI, "p", tx, L.ratio)}
      {L.coins.map((c: any, i: number) => (coinOn(i) ? c18Coin(c, "c" + i, isGather && tb === i) : !isGather ? c18Slot(c, "s" + i) : null))}
      {L.blocks.map((bk: any, i: number) => (blockOn(i) ? c18Block(bk, "b" + i, !isGather && tb === i, L.brick) : null))}
      {L.loose.map((q: any, i: number) => c18Loose(q, "l" + i + (q.kind === "five" ? "f" : "")))}
      {tag}
      {work}
      {keys}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const v = result && result.last ? result.last.value : null;
  if (v === null || v === undefined) return null;
  c18Units(lang, tx);
  const q = it || (result.last.it) || (n && PHASES[n - 1] ? PHASES[n - 1].items[result.last.item] : null) || {};
  const ch = q.choices ? q.choices.find((c: any) => c.id === String(v)) : null;
  const amt = ch ? (ch.id === "tagA" ? q.a : q.b) : null;
  const rs = amt ? amt.u === "rs" : typeof q.answer !== "number";
  const pv = amt ? amt.v : typeof q.answer === "number" ? Number(v) : Math.round(parseFloat(String(v)) * 100);
  const pWord = C18_RU ? tx("paise") : "p";
  const s = rs ? c18RsT(pv) : indian(pv) + " " + pWord;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {rs ? c18Coin({ x: 8, y: h / 2 - 22, w: 44 }, "th" + (n || 0)) : <rect x={8} y={h / 2 - 16} width={48} height={32} rx={6} fill={C18_PS} stroke="#7A2204" strokeWidth={1.5} />}
      <text x={w - 14} y={h / 2 + C18_DY} textAnchor="end" dominantBaseline="central" fontSize={T.micro} fontWeight={700} fill={C18_GR}>{s}</text>
    </g>
  );
}

function RupeesAndPaiseConverter(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b): the question and an Answer key on a bar across the top, the working area the
         whole card until the child taps Answer, the answer box and keypad in a panel that slides in from the right */
      board: true,
      /* a decimal: phase 3 types Rs as rupees, a dot and two paise digits (the dot's place IS the lesson) */
      pointKey: true,
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

export default RupeesAndPaiseConverter;