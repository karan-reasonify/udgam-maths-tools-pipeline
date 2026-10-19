/* ═══ M2.S3.T6.C25.2D1 · whole_ones_tray · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, the sound effects, the printed bubble, scoring, the
   events, idle and restart. THE LESSON IS SILENT (runtime r30): nothing is spoken; every line is
   printed on the bubble, which is the guide. Built in the new look (keyOnly, navDots, cardAnswer, nextKey):
   one sentence a screen, every act performed on screen with api.act. */

const TOOL_ID = "whole_ones_tray";
const MEDIA_ID = "M2.S3.T6.C25.2D1";
const TOOL_NAME = "Whole Ones Tray";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["Whole ones on the left, loose parts on the right, and every part the same size."];
/* the whole-tool line: printed on the summary page */
const FINISH_LINE = "Every heap counted both ways, and the lower number never moved once.";
/* printed when the child opens Free play (the plan's free-play line); its LAST piece stays on the bubble */
const FREE_LINE = "Free play. Change the heap or the part size, then Pour and Break to see both readings.";

/* THE START PAGE: the object the lesson is about, whole ones and loose parts, and one question to wonder at */
const START_HOOK = "How many whole cakes do these loose slices make?";

/* ── the chapter's own colours: a part a fraction counts is the cake (golden, with its skin), an empty whole one a pale cream wash,
   a whole one wears a green ring outside the disc, a second writing of an amount already on the stage is rose, the numbers a fraction
   counts are written in deep blue; every cut is near-black ── */
const WO_BLUE = CONTENT.hundred, WO_GREEN = CONTENT.one, WO_ROSE = CONTENT.bead, WO_VERM = CONTENT.pointer;
const WO_CUT = CONTENT.line;
const woInk = (c: string) => shade(c, 0.25);
/* the cake: the plain stand-in under its skin is golden (the cake's own family), an empty whole one a pale cream wash */
const WO_CAKE = "#E0A93A", WO_EMPTY = "#FFF8EA", WO_SHADE = "#C0731F";   /* WO_SHADE at 0.28 over the cake face: about 2:1 against the empty wash */
/* the part size in words, the book's names (a quarter, not a fourth) */
const WO_PART = ["", "wholes", "halves", "thirds", "quarters", "fifths", "sixths", "sevenths", "eighths",
  "ninths", "tenths", "elevenths", "twelfths"];
const WO_CUTIN = ["", "", "cut in halves", "cut in thirds", "cut in quarters", "cut in fifths", "cut in sixths", "cut in sevenths",
  "cut in eighths", "cut in ninths", "cut in tenths", "cut in elevenths", "cut in twelfths"];

/* the word answers: is it improper, and what is it worth · which kind of number is written */
const WO_WORTH = [
  { id: "yesmore", label: "Yes, more" },
  { id: "yes1", label: "Yes, 1 whole" },
  { id: "noless", label: "No, less" },
  { id: "no1", label: "No, 1 whole" },
];
const WO_KINDS = [{ id: "improper", label: "Improper" }, { id: "mixed", label: "Mixed number" }];
const WO_KINDS_MIXED_FIRST = [{ id: "mixed", label: "Mixed number" }, { id: "improper", label: "Improper" }];
const WO_SHOWN: Record<string, string> = { yes1: "yes, 1 whole", yesmore: "yes, more", no1: "no, 1 whole", noless: "no, less",
  improper: "improper fraction", mixed: "mixed number" };

/* StartArt: two empty whole cakes cut in six and nine loose slices (more than a whole), in the 1200 x 340 box */
function StartArt({ box, C, lang, tx }: any) {
  const cy = box.h / 2 + 4;
  const sl = woWedge(86, 6);
  return (
    <g>
      <WoPie x={150} y={cy} r={100} d={6} blue={0} />
      <WoPie x={370} y={cy} r={100} d={6} blue={0} />
      <clipPath id="wo-st-wedge"><path d={sl} /></clipPath>
      {Array.from({ length: 9 }).map((_, i) => {
        const row = i < 5 ? 0 : 1, col = row ? i - 5 : i;
        return (
          <g key={i} transform={`translate(${664 + col * 100 + (row ? 50 : 0)}, ${cy - 6 + row * 100})`}>
            <path d={sl} fill={WO_CAKE} />
            <Skin name="disc" x={-86} y={-86} w={172} h={172} clip="url(#wo-st-wedge)" />
            <path d={sl} fill={WO_SHADE} fillOpacity={0.28} />
            <path d={sl} fill="none" stroke={WO_CUT} strokeWidth={3} strokeLinejoin="round" />
          </g>
        );
      })}
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11), keyed by the English line byte for byte. Chapter terms: fraction भिन्न / અપૂર્ણાંક, upper number ऊपर की संख्या / ઉપરની સંખ્યા,
   lower number नीचे की संख्या / નીચેની સંખ્યા (अंश/हर and અંશ/છેદ only where the English says numerator/denominator), improper fraction विषम भिन्न / અયોગ્ય અપૂર્ણાંક, proper fraction उचित भिन्न / યોગ્ય અપૂર્ણાંક, mixed number मिश्र भिन्न / મિશ્ર અપૂર્ણાંક.
   Digits stay Latin; a fraction in a line is written in words ("5 में से 2 भाग" / "5માંથી 2 ભાગ"), never "2/5". A first draft: it wants a native speaker's read. */
const TR: any = {
  hi: {
    "Whole Ones Tray": "पूर्ण की ट्रे",
    "Whole ones on the left, loose parts on the right, and every part the same size.": "बाईं ओर पूर्ण वृत्त, दाईं ओर खुले भाग, और हर भाग एक-सा।",
    "Free play. Change the heap or the part size, then Pour and Break to see both readings.": "मुक्त खेल। ढेर या भाग का आकार बदलो, फिर डालो और तोड़ो, और दोनों रूप देखो।",
    "How many whole cakes do these loose slices make?": "ये खुले टुकड़े कितने पूरे केक बनाते हैं?",
    "When the top is not the smaller one": "जब ऊपर की संख्या छोटी न हो",
    "Look at the two numbers on a card: the upper one and the lower one.": "कार्ड की दोनों संख्याएँ देखो: ऊपर की और नीचे की।",
    "Tap Pour to drop each card's parts into its circles.": "'डालो' दबाओ और हर कार्ड के भाग उसके वृत्तों में डालो।",
    "Tap the Pour key below the circles.": "वृत्तों के नीचे 'डालो' कुंजी दबाओ।",
    "Is the upper number smaller than the lower one, or is it not?": "क्या ऊपर की संख्या नीचे की संख्या से छोटी है, या नहीं?",
    "Tap Pour and see which circles fill right round.": "'डालो' दबाओ और देखो कि कौन से वृत्त पूरे भरते हैं।",
    "Improper: the upper number is not smaller than the lower one.": "विषम भिन्न: ऊपर की संख्या नीचे की संख्या से छोटी नहीं होती।",
    "You learned: improper means the upper number is not smaller.": "तुमने सीखा: विषम भिन्न में ऊपर की संख्या छोटी नहीं होती।",
    "Which are improper?": "कौन से विषम हैं?",
    "Tap every improper fraction among these three cards.": "इन तीन कार्डों में हर विषम भिन्न को छुओ।",
    "On each card, which number is the upper one?": "हर कार्ड पर ऊपर की संख्या कौन सी है?",
    "Twelve fifths and seven sevenths are improper.": "पाँच में से बारह भाग और सात में से सात भाग विषम हैं।",
    "Sort these three": "इन तीनों को छाँटो",
    "New cards: which of these three are improper?": "नए कार्ड: इन तीनों में कौन से विषम हैं?",
    "Check every card, one at a time, upper number first.": "हर कार्ड को एक-एक करके जाँचो, पहले ऊपर की संख्या।",
    "5 is not smaller than 5, so five fifths is improper.": "5, 5 से छोटा नहीं है, इसलिए पाँच में से पाँच भाग विषम है।",
    "Improper? Worth how much?": "विषम? कितने के बराबर?",
    "Is this fraction improper, and how much is it worth?": "क्या यह भिन्न विषम है, और कितने के बराबर है?",
    "Ten parts go into a circle cut in tens: how full is it?": "दस भागों में कटे वृत्त में दस भाग डालो: वह कितना भरा?",
    "Ten tenths fill one circle: improper, and one whole.": "दस में से दस भाग एक वृत्त भरते हैं: विषम, और एक पूर्ण।",
    "Yes, more": "हाँ, ज़्यादा",
    "Yes, 1 whole": "हाँ, 1 पूर्ण",
    "No, less": "नहीं, कम",
    "No, 1 whole": "नहीं, 1 पूर्ण",
    "A whole number with a part beside it": "पूर्ण संख्या और उसके साथ एक भाग",
    "Count the full ones first. Now say what is left over beside them.": "पहले पूरे वृत्त गिनो। फिर बताओ कि उनके साथ कितना बचा है।",
    "Tap Count to count the full circles first.": "पहले पूरे वृत्त गिनने के लिए 'गिनो' दबाओ।",
    "Tap the Count key below the heap.": "ढेर के नीचे 'गिनो' कुंजी दबाओ।",
    "Tap Count again to count the loose parts.": "खुले भाग गिनने के लिए फिर 'गिनो' दबाओ।",
    "Tap the Count key once more.": "'गिनो' कुंजी एक बार और दबाओ।",
    "How many loose parts are lying beside them?": "उनके पास कितने खुले भाग पड़े हैं?",
    "Point to the full circles, then to the loose parts: each has its own place.": "पूरे वृत्तों पर उँगली रखो, फिर खुले भागों पर: हर एक की अपनी जगह है।",
    "A mixed number is a whole number standing beside a proper fraction.": "मिश्र भिन्न: एक पूर्ण संख्या के साथ एक उचित भिन्न।",
    "You learned: a mixed number is a whole number beside a proper fraction.": "तुमने सीखा: पूर्ण संख्या के साथ उचित भिन्न मिश्र भिन्न है।",
    "Write what it holds": "लिखो इसमें कितना है",
    "Read the tray and write how much it holds.": "ट्रे पढ़ो और लिखो कि उसमें कितना है।",
    "Which number counts the full circles, and which counts the loose parts?": "कौन सी संख्या पूरे वृत्त गिनती है, और कौन सी खुले भाग?",
    "3 full circles, 2 loose fifths: three and two fifths.": "3 पूरे वृत्त और 2 खुले पाँचवें भाग: 3 पूर्ण और 5 में से 2 भाग।",
    "Which kind is it?": "यह किस प्रकार की है?",
    "Is this number an improper fraction or a mixed number?": "क्या यह संख्या विषम भिन्न है या मिश्र भिन्न?",
    "How many whole ones are full on the tray?": "ट्रे पर कितने पूरे वृत्त भरे हैं?",
    "It is made of whole ones with a part beside them.": "यह पूरे वृत्तों और उनके साथ एक भाग से बनी है।",
    "And this one?": "और यह?",
    "And this one: a mixed number or an improper fraction?": "और यह: मिश्र भिन्न या विषम भिन्न?",
    "Is a whole number standing beside the fraction here?": "क्या यहाँ भिन्न के साथ एक पूर्ण संख्या खड़ी है?",
    "Two full circles stand beside three eighths.": "दो पूरे वृत्त और तीन आठवें भाग साथ-साथ हैं।",
    "Improper": "विषम",
    "Mixed number": "मिश्र भिन्न",
    "Dividing to find the whole part": "भाग देकर पूर्ण संख्या ढूँढना",
    "How many whole ones did you fill, and how many parts were left over?": "तुमने कितने पूर्ण भरे, और कितने भाग बच गए?",
    "Tap Pour to fill one whole one from the heap.": "ढेर से एक पूर्ण वृत्त भरने के लिए 'डालो' दबाओ।",
    "Tap the Pour key below the heap.": "ढेर के नीचे 'डालो' कुंजी दबाओ।",
    "Tap Pour again to fill the next whole one.": "अगला पूर्ण वृत्त भरने के लिए फिर 'डालो' दबाओ।",
    "Tap the Pour key once more.": "'डालो' कुंजी एक बार और दबाओ।",
    "Pour until no whole one will fill; what stays in the heap?": "तब तक डालो जब तक कोई पूर्ण न भरे; ढेर में क्या बचता है?",
    "Count the pours: each full circle is one whole, and the rest stays loose.": "डालने की गिनती करो: हर पूरा वृत्त एक पूर्ण, बाकी खुले रहते हैं।",
    "The quotient is the whole part; the remainder is what is left.": "भागफल पूर्ण भाग है; शेषफल जो बच जाता है।",
    "You learned: divide upper by lower; the remainder is the new upper.": "तुमने सीखा: ऊपर को नीचे से भाग दो; शेषफल नई ऊपर की संख्या।",
    "Write it as a mixed number": "मिश्र भिन्न में लिखो",
    "Write the fraction on the tray as a mixed number.": "ट्रे वाले भिन्न को मिश्र भिन्न में लिखो।",
    "Count the circles that filled right round.": "जो वृत्त पूरे भर गए, उन्हें गिनो।",
    "23 ÷ 6 = 3, 5 left over, so three and five sixths.": "23 ÷ 6 = 3, 5 बचे, इसलिए 3 पूर्ण और 6 में से 5 भाग।",
    "What does it make?": "यह क्या बनता है?",
    "Now pour this heap and write what it makes.": "अब इस ढेर को डालो और लिखो कि क्या बनता है।",
    "Each circle takes nine parts: watch how the heap runs down.": "हर वृत्त में नौ भाग आते हैं: देखो ढेर कैसे घटता है।",
    "No parts are left over, so it is just 5.": "कोई भाग नहीं बचा, इसलिए यह सिर्फ़ 5 है।",
    "Pour, then write it": "डालो, फिर लिखो",
    "Last one: pour this heap the same way and write it.": "आखिरी: इस ढेर को उसी तरह डालो और लिखो।",
    "Eight parts fill a circle: how many circles can you fill?": "आठ भागों से एक वृत्त भरता है: कितने वृत्त भर सकते हो?",
    "8 goes into 29 three times, 5 over: three and five eighths.": "29 में 8 तीन बार आता है, 5 बचे: 3 पूर्ण और 8 में से 5 भाग।",
    "Going back the other way": "उलटी तरफ़ वापस जाना",
    "Break every whole one into parts. Now count every part you are holding.": "हर पूर्ण वृत्त को तोड़ो। अब तुम्हारे पास जितने भाग हैं, सब गिनो।",
    "Tap Break to cut every whole one along its lines.": "हर पूर्ण वृत्त को उसकी रेखाओं पर काटने के लिए 'तोड़ो' दबाओ।",
    "Tap the Break key below the heap.": "ढेर के नीचे 'तोड़ो' कुंजी दबाओ।",
    "Tap Break, then count the pieces in the heap.": "'तोड़ो' दबाओ, फिर ढेर के टुकड़े गिनो।",
    "Count on by the part size for each whole one, then add the loose parts.": "हर पूर्ण पर उसके भागों की गिनती जोड़ते जाओ, फिर खुले भाग जोड़ो।",
    "Multiply the whole by the lower, add the upper, keep the lower.": "पूर्ण को नीचे की संख्या से गुणा करो, ऊपर की संख्या जोड़ो, नीचे की वही रखो।",
    "You learned: multiply, add the upper number, keep the lower one.": "तुमने सीखा: गुणा करो, ऊपर की संख्या जोड़ो, नीचे की वही रखो।",
    "Write one fraction": "एक भिन्न लिखो",
    "Write the mixed number on the tray as one fraction.": "ट्रे वाले मिश्र भिन्न को एक भिन्न में लिखो।",
    "How many pieces does one whole one break into?": "एक पूर्ण वृत्त कितने टुकड़ों में टूटता है?",
    "28 sevenths plus 3 more: thirty-one sevenths.": "28 सातवें भाग और 3 सातवें भाग: कुल 31 सातवें भाग।",
    "One fraction again": "फिर से एक भिन्न",
    "Now break this one back and write it as one fraction.": "अब इसे वापस तोड़ो और एक भिन्न में लिखो।",
    "Six wholes make how many ninths altogether?": "छह पूर्ण मिलकर कुल कितने नौवें भाग बनाते हैं?",
    "6 × 9 = 54, and 2 more make fifty-six ninths.": "6 × 9 = 54, और 2 और: कुल 56 नौवें भाग।",
    "Last one: what single fraction is this mixed number?": "आखिरी: यह मिश्र भिन्न एक भिन्न में क्या है?",
    "How many sixths do five whole ones make?": "पाँच पूर्ण कितने छठे भाग बनाते हैं?",
    "Thirty-four sixths is also seventeen thirds.": "छह में से 34 भाग, तीन में से 17 भाग के बराबर भी है।",
    "improper": "विषम",
    "proper": "उचित",
    "one whole": "एक पूर्ण",
    "whole number": "पूर्ण संख्या",
    "proper fraction": "उचित भिन्न",
    "mixed number": "मिश्र भिन्न",
    "quotient": "भागफल",
    "remainder": "शेषफल",
    "parts": "भाग",
    "part": "भाग",
    "Three quarters is proper; nine quarters is improper.": "चार में से तीन भाग उचित है; चार में से नौ भाग विषम है।",
    "2 full circles and 1 loose third: two and one third.": "2 पूरे वृत्त और 1 खुला तिहाई भाग: 2 पूर्ण और तीन में से 1 भाग।",
    "8 ÷ 3 = 2, 2 left over: two and two thirds.": "8 ÷ 3 = 2, 2 बचे: 2 पूर्ण और तीन में से 2 भाग।",
    "2 × 3 = 6, 6 + 1 = 7: seven thirds.": "2 × 3 = 6, 6 + 1 = 7: तीन में से 7 भाग।",
    "exactly full": "ठीक भरा",
    "left over": "बचे",
    "none left over": "कुछ नहीं बचा",
    "Pour": "डालो",
    "Break": "तोड़ो",
    "Count": "गिनो",
    "cut in halves": "दो बराबर भाग",
    "cut in thirds": "तीन बराबर भाग",
    "cut in quarters": "चार बराबर भाग",
    "cut in fifths": "पाँच बराबर भाग",
    "cut in sixths": "छह बराबर भाग",
    "cut in sevenths": "सात बराबर भाग",
    "cut in eighths": "आठ बराबर भाग",
    "cut in ninths": "नौ बराबर भाग",
    "cut in tenths": "दस बराबर भाग",
    "cut in elevenths": "ग्यारह बराबर भाग",
    "cut in twelfths": "बारह बराबर भाग",
    "halves": "आधे",
    "thirds": "तिहाई",
    "quarters": "चौथाई",
    "fifths": "पाँचवें",
    "sixths": "छठे",
    "sevenths": "सातवें",
    "eighths": "आठवें",
    "ninths": "नौवें",
    "tenths": "दसवें",
    "elevenths": "ग्यारहवें",
    "twelfths": "बारहवें",
  },
  gu: {
    "Whole Ones Tray": "આખાંની ટ્રે",
    "Whole ones on the left, loose parts on the right, and every part the same size.": "ડાબી બાજુ આખાં વર્તુળ, જમણી બાજુ છૂટા ભાગ, અને દરેક ભાગ સરખો.",
    "Free play. Change the heap or the part size, then Pour and Break to see both readings.": "મુક્ત રમત. ઢગલો કે ભાગનું માપ બદલો, પછી નાખો અને તોડો, અને બંને રૂપ જુઓ.",
    "How many whole cakes do these loose slices make?": "આ છૂટા ટુકડા કેટલી આખી કેક બનાવે છે?",
    "When the top is not the smaller one": "જ્યારે ઉપરની સંખ્યા નાની ન હોય",
    "Look at the two numbers on a card: the upper one and the lower one.": "કાર્ડની બંને સંખ્યાઓ જુઓ: ઉપરની અને નીચેની.",
    "Tap Pour to drop each card's parts into its circles.": "'નાખો' દબાવો અને દરેક કાર્ડના ભાગ તેનાં વર્તુળમાં નાખો.",
    "Tap the Pour key below the circles.": "વર્તુળની નીચે 'નાખો' કી દબાવો.",
    "Is the upper number smaller than the lower one, or is it not?": "શું ઉપરની સંખ્યા નીચેની સંખ્યાથી નાની છે, કે નથી?",
    "Tap Pour and see which circles fill right round.": "'નાખો' દબાવો અને જુઓ કે કયાં વર્તુળ પૂરેપૂરાં ભરાય છે.",
    "Improper: the upper number is not smaller than the lower one.": "અયોગ્ય અપૂર્ણાંક: ઉપરની સંખ્યા નીચેની સંખ્યાથી નાની હોતી નથી.",
    "You learned: improper means the upper number is not smaller.": "તમે શીખ્યા: અયોગ્ય અપૂર્ણાંકમાં ઉપરની સંખ્યા નાની હોતી નથી.",
    "Which are improper?": "કયા અયોગ્ય છે?",
    "Tap every improper fraction among these three cards.": "આ ત્રણ કાર્ડમાંથી દરેક અયોગ્ય અપૂર્ણાંકને અડો.",
    "On each card, which number is the upper one?": "દરેક કાર્ડ પર ઉપરની સંખ્યા કઈ છે?",
    "Twelve fifths and seven sevenths are improper.": "પાંચમાંથી બાર ભાગ અને સાતમાંથી સાત ભાગ અયોગ્ય છે.",
    "Sort these three": "આ ત્રણને અલગ પાડો",
    "New cards: which of these three are improper?": "નવાં કાર્ડ: આ ત્રણમાંથી કયા અયોગ્ય છે?",
    "Check every card, one at a time, upper number first.": "દરેક કાર્ડ એક પછી એક તપાસો, પહેલાં ઉપરની સંખ્યા.",
    "5 is not smaller than 5, so five fifths is improper.": "5, 5 કરતાં નાનો નથી, તેથી પાંચમાંથી પાંચ ભાગ અયોગ્ય છે.",
    "Improper? Worth how much?": "અયોગ્ય? કેટલાની બરાબર?",
    "Is this fraction improper, and how much is it worth?": "શું આ અપૂર્ણાંક અયોગ્ય છે, અને કેટલાની બરાબર છે?",
    "Ten parts go into a circle cut in tens: how full is it?": "દસ ભાગમાં કાપેલા વર્તુળમાં દસ ભાગ નાખો: તે કેટલું ભરાયું?",
    "Ten tenths fill one circle: improper, and one whole.": "દસમાંથી દસ ભાગ એક વર્તુળ ભરે છે: અયોગ્ય, અને એક આખું.",
    "Yes, more": "હા, વધુ",
    "Yes, 1 whole": "હા, 1 આખું",
    "No, less": "ના, ઓછું",
    "No, 1 whole": "ના, 1 આખું",
    "A whole number with a part beside it": "પૂર્ણ સંખ્યા અને તેની બાજુમાં એક ભાગ",
    "Count the full ones first. Now say what is left over beside them.": "પહેલાં પૂરાં વર્તુળ ગણો. પછી કહો કે તેમની બાજુમાં શું બચ્યું છે.",
    "Tap Count to count the full circles first.": "પહેલાં પૂરાં વર્તુળ ગણવા માટે 'ગણો' દબાવો.",
    "Tap the Count key below the heap.": "ઢગલાની નીચે 'ગણો' કી દબાવો.",
    "Tap Count again to count the loose parts.": "છૂટા ભાગ ગણવા માટે ફરી 'ગણો' દબાવો.",
    "Tap the Count key once more.": "'ગણો' કી ફરી એક વાર દબાવો.",
    "How many loose parts are lying beside them?": "તેમની બાજુમાં કેટલા છૂટા ભાગ પડ્યા છે?",
    "Point to the full circles, then to the loose parts: each has its own place.": "પૂરાં વર્તુળ પર આંગળી મૂકો, પછી છૂટા ભાગ પર: દરેકની પોતાની જગ્યા છે.",
    "A mixed number is a whole number standing beside a proper fraction.": "મિશ્ર અપૂર્ણાંક: પૂર્ણ સંખ્યાની બાજુમાં યોગ્ય અપૂર્ણાંક.",
    "You learned: a mixed number is a whole number beside a proper fraction.": "તમે શીખ્યા: પૂર્ણ સંખ્યા સાથે યોગ્ય અપૂર્ણાંક એટલે મિશ્ર અપૂર્ણાંક.",
    "Write what it holds": "તેમાં કેટલું છે તે લખો",
    "Read the tray and write how much it holds.": "ટ્રે વાંચો અને લખો કે તેમાં કેટલું છે.",
    "Which number counts the full circles, and which counts the loose parts?": "કઈ સંખ્યા પૂરાં વર્તુળ ગણે છે, અને કઈ છૂટા ભાગ?",
    "3 full circles, 2 loose fifths: three and two fifths.": "3 પૂરાં વર્તુળ અને 2 છૂટા પાંચમા ભાગ: 3 આખાં અને 5માંથી 2 ભાગ.",
    "Which kind is it?": "આ કયા પ્રકારની છે?",
    "Is this number an improper fraction or a mixed number?": "શું આ સંખ્યા અયોગ્ય અપૂર્ણાંક છે કે મિશ્ર અપૂર્ણાંક?",
    "How many whole ones are full on the tray?": "ટ્રે પર કેટલાં પૂરાં વર્તુળ ભરેલાં છે?",
    "It is made of whole ones with a part beside them.": "તે પૂરાં વર્તુળ અને તેમની બાજુના એક ભાગથી બનેલી છે.",
    "And this one?": "અને આ?",
    "And this one: a mixed number or an improper fraction?": "અને આ: મિશ્ર અપૂર્ણાંક કે અયોગ્ય અપૂર્ણાંક?",
    "Is a whole number standing beside the fraction here?": "શું અહીં અપૂર્ણાંકની બાજુમાં પૂર્ણ સંખ્યા છે?",
    "Two full circles stand beside three eighths.": "બે પૂરાં વર્તુળ અને ત્રણ આઠમા ભાગ સાથે છે.",
    "Improper": "અયોગ્ય",
    "Mixed number": "મિશ્ર અપૂર્ણાંક",
    "Dividing to find the whole part": "ભાગાકાર કરીને પૂર્ણ સંખ્યા શોધવી",
    "How many whole ones did you fill, and how many parts were left over?": "તમે કેટલાં આખાં ભર્યાં, અને કેટલા ભાગ બચ્યા?",
    "Tap Pour to fill one whole one from the heap.": "ઢગલામાંથી એક આખું વર્તુળ ભરવા માટે 'નાખો' દબાવો.",
    "Tap the Pour key below the heap.": "ઢગલાની નીચે 'નાખો' કી દબાવો.",
    "Tap Pour again to fill the next whole one.": "આગલું આખું વર્તુળ ભરવા માટે ફરી 'નાખો' દબાવો.",
    "Tap the Pour key once more.": "'નાખો' કી ફરી એક વાર દબાવો.",
    "Pour until no whole one will fill; what stays in the heap?": "જ્યાં સુધી કોઈ આખું ન ભરાય ત્યાં સુધી નાખો; ઢગલામાં શું બચે છે?",
    "Count the pours: each full circle is one whole, and the rest stays loose.": "નાખવાની ગણતરી કરો: દરેક પૂરું વર્તુળ એક આખું, બાકીના છૂટા રહે છે.",
    "The quotient is the whole part; the remainder is what is left.": "ભાગફળ પૂર્ણ ભાગ છે; શેષ જે બચે છે તે.",
    "You learned: divide upper by lower; the remainder is the new upper.": "તમે શીખ્યા: ઉપરનીને નીચેનીથી ભાગો; શેષ નવી ઉપરની સંખ્યા.",
    "Write it as a mixed number": "મિશ્ર અપૂર્ણાંકમાં લખો",
    "Write the fraction on the tray as a mixed number.": "ટ્રે પરના અપૂર્ણાંકને મિશ્ર અપૂર્ણાંકમાં લખો.",
    "Count the circles that filled right round.": "જે વર્તુળ પૂરેપૂરાં ભરાયાં, તેમને ગણો.",
    "23 ÷ 6 = 3, 5 left over, so three and five sixths.": "23 ÷ 6 = 3, 5 બચ્યા, તેથી 3 આખાં અને 6માંથી 5 ભાગ.",
    "What does it make?": "આનાથી શું બને છે?",
    "Now pour this heap and write what it makes.": "હવે આ ઢગલો નાખો અને લખો કે શું બને છે.",
    "Each circle takes nine parts: watch how the heap runs down.": "દરેક વર્તુળમાં નવ ભાગ સમાય છે: જુઓ ઢગલો કેમ ઘટે છે.",
    "No parts are left over, so it is just 5.": "કોઈ ભાગ બચ્યો નથી, તેથી તે ફક્ત 5 છે.",
    "Pour, then write it": "નાખો, પછી લખો",
    "Last one: pour this heap the same way and write it.": "છેલ્લું: આ ઢગલો એ જ રીતે નાખો અને લખો.",
    "Eight parts fill a circle: how many circles can you fill?": "આઠ ભાગથી એક વર્તુળ ભરાય છે: તમે કેટલાં વર્તુળ ભરી શકો?",
    "8 goes into 29 three times, 5 over: three and five eighths.": "29માં 8 ત્રણ વાર આવે છે, 5 બચે: 3 આખાં અને 8માંથી 5 ભાગ.",
    "Going back the other way": "ઊલટી બાજુ પાછા જવું",
    "Break every whole one into parts. Now count every part you are holding.": "દરેક આખા વર્તુળને તોડો. હવે તમારી પાસેના બધા ભાગ ગણો.",
    "Tap Break to cut every whole one along its lines.": "દરેક આખા વર્તુળને તેની રેખાઓ પર કાપવા માટે 'તોડો' દબાવો.",
    "Tap the Break key below the heap.": "ઢગલાની નીચે 'તોડો' કી દબાવો.",
    "Tap Break, then count the pieces in the heap.": "'તોડો' દબાવો, પછી ઢગલાના ટુકડા ગણો.",
    "Count on by the part size for each whole one, then add the loose parts.": "દરેક આખા માટે તેના ભાગની ગણતરી ઉમેરતા જાઓ, પછી છૂટા ભાગ ઉમેરો.",
    "Multiply the whole by the lower, add the upper, keep the lower.": "આખાને નીચેની સંખ્યાથી ગુણો, ઉપરની સંખ્યા ઉમેરો, નીચેની એ જ રાખો.",
    "You learned: multiply, add the upper number, keep the lower one.": "તમે શીખ્યા: ગુણો, ઉપરની સંખ્યા ઉમેરો, નીચેની એ જ રાખો.",
    "Write one fraction": "એક અપૂર્ણાંક લખો",
    "Write the mixed number on the tray as one fraction.": "ટ્રે પરના મિશ્ર અપૂર્ણાંકને એક અપૂર્ણાંકમાં લખો.",
    "How many pieces does one whole one break into?": "એક આખું વર્તુળ કેટલા ટુકડામાં તૂટે છે?",
    "28 sevenths plus 3 more: thirty-one sevenths.": "28 સાતમા ભાગ અને 3 સાતમા ભાગ: કુલ 31 સાતમા ભાગ.",
    "One fraction again": "ફરી એક અપૂર્ણાંક",
    "Now break this one back and write it as one fraction.": "હવે આને પાછું તોડો અને એક અપૂર્ણાંકમાં લખો.",
    "Six wholes make how many ninths altogether?": "છ આખાં મળીને કુલ કેટલા નવમા ભાગ બને છે?",
    "6 × 9 = 54, and 2 more make fifty-six ninths.": "6 × 9 = 54, અને 2 વધુ: કુલ 56 નવમા ભાગ.",
    "Last one: what single fraction is this mixed number?": "છેલ્લું: આ મિશ્ર અપૂર્ણાંક એક અપૂર્ણાંકમાં શું છે?",
    "How many sixths do five whole ones make?": "પાંચ આખાં કેટલા છઠ્ઠા ભાગ બનાવે છે?",
    "Thirty-four sixths is also seventeen thirds.": "છમાંથી 34 ભાગ, ત્રણમાંથી 17 ભાગ બરાબર પણ છે.",
    "improper": "અયોગ્ય",
    "proper": "યોગ્ય",
    "one whole": "એક આખું",
    "whole number": "પૂર્ણ સંખ્યા",
    "proper fraction": "યોગ્ય અપૂર્ણાંક",
    "mixed number": "મિશ્ર અપૂર્ણાંક",
    "quotient": "ભાગફળ",
    "remainder": "શેષ",
    "parts": "ભાગ",
    "part": "ભાગ",
    "Three quarters is proper; nine quarters is improper.": "ચારમાંથી ત્રણ ભાગ યોગ્ય છે; ચારમાંથી નવ ભાગ અયોગ્ય છે.",
    "2 full circles and 1 loose third: two and one third.": "2 પૂરાં વર્તુળ અને 1 છૂટો ત્રીજો ભાગ: 2 આખાં અને ત્રણમાંથી 1 ભાગ.",
    "8 ÷ 3 = 2, 2 left over: two and two thirds.": "8 ÷ 3 = 2, 2 બચ્યા: 2 આખાં અને ત્રણમાંથી 2 ભાગ.",
    "2 × 3 = 6, 6 + 1 = 7: seven thirds.": "2 × 3 = 6, 6 + 1 = 7: ત્રણમાંથી 7 ભાગ.",
    "exactly full": "બરાબર ભરેલું",
    "left over": "બચ્યા",
    "none left over": "કંઈ બચ્યું નથી",
    "Pour": "નાખો",
    "Break": "તોડો",
    "Count": "ગણો",
    "cut in halves": "બે સરખા ભાગ",
    "cut in thirds": "ત્રણ સરખા ભાગ",
    "cut in quarters": "ચાર સરખા ભાગ",
    "cut in fifths": "પાંચ સરખા ભાગ",
    "cut in sixths": "છ સરખા ભાગ",
    "cut in sevenths": "સાત સરખા ભાગ",
    "cut in eighths": "આઠ સરખા ભાગ",
    "cut in ninths": "નવ સરખા ભાગ",
    "cut in tenths": "દસ સરખા ભાગ",
    "cut in elevenths": "અગિયાર સરખા ભાગ",
    "cut in twelfths": "બાર સરખા ભાગ",
    "halves": "અડધા",
    "thirds": "ત્રીજા",
    "quarters": "ચોથા",
    "fifths": "પાંચમા",
    "sixths": "છઠ્ઠા",
    "sevenths": "સાતમા",
    "eighths": "આઠમા",
    "ninths": "નવમા",
    "tenths": "દસમા",
    "elevenths": "અગિયારમા",
    "twelfths": "બારમા",
  },
};

/* One entry per phase = one mount. */
const PHASES = [
  {
    n: 1,
    concept: "When the top is not the smaller one",
    conceptId: "M2.S3.T6.C25", objectiveIds: ["O9"],
    says: ["Look at the two numbers on a card: the upper one and the lower one."],
    stepHold: 3400,
    steps: [{ say: "Tap Pour to drop each card's parts into its circles.", on: "pour", hint: "Tap the Pour key below the circles." }],
    ladder: ["Is the upper number smaller than the lower one, or is it not?",
      "Tap Pour and see which circles fill right round."],
    closing: "Improper: the upper number is not smaller than the lower one.",
    learned: "You learned: improper means the upper number is not smaller.",
    traceback: "Each card pours into circles cut to its own lower number and is tagged improper or proper, with its test written as signs; the child's marks stay where they were put.",
    items: [
      /* learn ML1: answer in the plan = 12/5 and 7/7 are improper, and 7/7 is exactly one whole */
      { qid: "M2.S3.T6.C25:ML1", kind: "sort", cards: [[5, 12], [12, 5], [7, 7]], answer: "12/5 7/7", pad: "enter",
        ask: "Which are improper?", say: "Tap every improper fraction among these three cards.",
        miss: "On each card, which number is the upper one?",
        win: "Twelve fifths and seven sevenths are improper." },
      /* practice 1: answer in the plan = 11/6 and 5/5 */
      { qid: "M2.S3.T6.C25:1", kind: "sort", cards: [[11, 6], [4, 13], [5, 5]], answer: "11/6 5/5", pad: "enter",
        ask: "Sort these three", say: "New cards: which of these three are improper?",
        miss: "Check every card, one at a time, upper number first.",
        win: "5 is not smaller than 5, so five fifths is improper." },
      /* practice 2: answer in the plan = Yes, it is improper, and it is worth exactly one whole */
      { qid: "M2.S3.T6.C25:2", kind: "worth", cards: [[10, 10]], answer: "yes1", choices: WO_WORTH,
        ask: "Improper? Worth how much?", say: "Is this fraction improper, and how much is it worth?",
        miss: "Ten parts go into a circle cut in tens: how full is it?",
        win: "Ten tenths fill one circle: improper, and one whole." },
    ],
  },
  {
    n: 2,
    concept: "A whole number with a part beside it",
    conceptId: "M2.S3.T6.C26", objectiveIds: ["O9"],
    says: ["Count the full ones first. Now say what is left over beside them."],
    stepHold: 3400,
    steps: [{ say: "Tap Count to count the full circles first.", on: "count", hint: "Tap the Count key below the heap." },
      { say: "Tap Count again to count the loose parts.", on: "count", hint: "Tap the Count key once more." }],
    ladder: ["How many loose parts are lying beside them?",
      "Point to the full circles, then to the loose parts: each has its own place."],
    closing: "A mixed number is a whole number standing beside a proper fraction.",
    learned: "You learned: a mixed number is a whole number beside a proper fraction.",
    traceback: "A leader runs from the whole number to the full circles and another from the fraction to the loose parts, and the two together are named a mixed number.",
    items: [
      /* practice 4: answer in the plan = 3 2/5, and 2/5 is the proper fraction */
      { qid: "M2.S3.T6.C26:4", kind: "write", show: [3, 2, 5], parts: SLOT_MIXED, answer: [3, 2, 5],
        ask: "Write what it holds", say: "Read the tray and write how much it holds.",
        miss: "Which number counts the full circles, and which counts the loose parts?",
        win: "3 full circles, 2 loose fifths: three and two fifths." },
      /* learn ML2: answer in the plan = A mixed number, made of the whole number 3 standing beside the proper fraction 2/5 */
      { qid: "M2.S3.T6.C26:ML2", kind: "kind", show: [3, 2, 5], answer: "mixed", choices: WO_KINDS, named: true,
        ask: "Which kind is it?", say: "Is this number an improper fraction or a mixed number?",
        miss: "How many whole ones are full on the tray?",
        win: "It is made of whole ones with a part beside them." },
      /* practice 3: answer in the plan = A mixed number, because it is a whole number standing beside a proper fraction */
      { qid: "M2.S3.T6.C26:3", kind: "kind", show: [2, 3, 8], answer: "mixed", choices: WO_KINDS_MIXED_FIRST, named: true,
        ask: "And this one?", say: "And this one: a mixed number or an improper fraction?",
        miss: "Is a whole number standing beside the fraction here?",
        win: "Two full circles stand beside three eighths." },
    ],
  },
  {
    n: 3,
    concept: "Dividing to find the whole part",
    conceptId: "M2.S3.T6.C27", objectiveIds: ["O10"],
    says: ["How many whole ones did you fill, and how many parts were left over?"],
    stepHold: 3400,
    steps: [{ say: "Tap Pour to fill one whole one from the heap.", on: "pour", hint: "Tap the Pour key below the heap." },
      { say: "Tap Pour again to fill the next whole one.", on: "pour", hint: "Tap the Pour key once more." }],
    ladder: ["Pour until no whole one will fill; what stays in the heap?",
      "Count the pours: each full circle is one whole, and the rest stays loose."],
    closing: "The quotient is the whole part; the remainder is what is left.",
    learned: "You learned: divide upper by lower; the remainder is the new upper.",
    traceback: "The heap pours one whole at a time, the quotient points at the full circles, the remainder at the loose parts, and the division is written out beside the mixed number.",
    items: [
      /* learn ML3: answer in the plan = 3 5/6 */
      { qid: "M2.S3.T6.C27:ML3", kind: "divide", from: [23, 6], parts: SLOT_MIXED, answer: [3, 5, 6],
        ask: "Write it as a mixed number", say: "Write the fraction on the tray as a mixed number.",
        miss: "Count the circles that filled right round.",
        win: "23 ÷ 6 = 3, 5 left over, so three and five sixths." },
      /* practice 5: answer in the plan = 5, because nine goes into forty-five five times with nothing left over */
      { qid: "M2.S3.T6.C27:5", kind: "divide", from: [45, 9], parts: SLOT_MIXED, answer: [5, null, null], alsoOk: [[5, 0, 9]],
        ask: "What does it make?", say: "Now pour this heap and write what it makes.",
        miss: "Each circle takes nine parts: watch how the heap runs down.",
        win: "No parts are left over, so it is just 5." },
      /* practice 6: answer in the plan = 3 5/8 */
      { qid: "M2.S3.T6.C27:6", kind: "divide", from: [29, 8], parts: SLOT_MIXED, answer: [3, 5, 8],
        ask: "Pour, then write it", say: "Last one: pour this heap the same way and write it.",
        miss: "Eight parts fill a circle: how many circles can you fill?",
        win: "8 goes into 29 three times, 5 over: three and five eighths." },
    ],
  },
  {
    n: 4,
    concept: "Going back the other way",
    conceptId: "M2.S3.T6.C28", objectiveIds: ["O10"],
    says: ["Break every whole one into parts. Now count every part you are holding."],
    stepHold: 3400,
    steps: [{ say: "Tap Break to cut every whole one along its lines.", on: "break", hint: "Tap the Break key below the heap." }],
    ladder: ["Tap Break, then count the pieces in the heap.",
      "Count on by the part size for each whole one, then add the loose parts."],
    closing: "Multiply the whole by the lower, add the upper, keep the lower.",
    learned: "You learned: multiply, add the upper number, keep the lower one.",
    traceback: "Every whole one breaks along its own lines and is counted on by the part size, the loose parts are counted in after them, and the multiplying and adding are written out over the same lower number.",
    items: [
      /* learn ML4: answer in the plan = 31/7 */
      { qid: "M2.S3.T6.C28:ML4", kind: "build", mixed: [4, 3, 7], parts: SLOT_FRACTION, answer: [31, 7],
        ask: "Write one fraction", say: "Write the mixed number on the tray as one fraction.",
        miss: "How many pieces does one whole one break into?",
        win: "28 sevenths plus 3 more: thirty-one sevenths." },
      /* practice 7: answer in the plan = 56/9 */
      { qid: "M2.S3.T6.C28:7", kind: "build", mixed: [6, 2, 9], parts: SLOT_FRACTION, answer: [56, 9],
        ask: "One fraction again", say: "Now break this one back and write it as one fraction.",
        miss: "Six wholes make how many ninths altogether?",
        win: "6 × 9 = 54, and 2 more make fifty-six ninths." },
      /* practice 8: answer in the plan = 34/6, and once reduced it is 5 2/3, which is 17/3 */
      { qid: "M2.S3.T6.C28:8", kind: "build", mixed: [5, 4, 6], parts: SLOT_FRACTION, answer: [34, 6], alsoOk: [[17, 3]],
        ask: "And this one?", say: "Last one: what single fraction is this mixed number?",
        miss: "How many sixths do five whole ones make?",
        win: "Thirty-four sixths is also seventeen thirds." },
    ],
  },
];

/* the warm-up of each phase (guide steps): a tray whose result is none of the phase's answers */
const WO_WARM: any = {
  1: { kind: "sort", cards: [[3, 4], [9, 4]] },
  2: { kind: "count", show: [2, 1, 3], answer: [2, 1, 3] },
  3: { kind: "divide", from: [8, 3], answer: [2, 2, 3] },
  4: { kind: "build", mixed: [2, 1, 3], answer: [7, 3] },
};
/* free play: any heap, any part size */
const WO_FREE: any = { kind: "free" };

/* the tray (up to six whole ones, two rows of three), the heap and the strip under them */
const WO_K = 6, WO_W = 880;
/* where the whole ones stand: one row of up to three big ones, 2 x 2 for four, two rows of three for five or six; the gap leaves room for the green ring outside a full one */
const woLay = (K: number) => (K <= 3 ? { R: 70, cx: (k: number) => 258 + (k - (K - 1) / 2) * 170, cy: (_k: number) => 202 }
  : K === 4 ? { R: 54, cx: (k: number) => 140 + 236 * (k % 2), cy: (k: number) => 134 + 134 * Math.floor(k / 2) }
    : { R: 54, cx: (k: number) => 70 + 180 * (k % 3), cy: (k: number) => 134 + 134 * Math.floor(k / 3) });
const WO_HEAP = { x: 552, w: 328, bottom: 424 };

const MODEL = {
  tray: { wholes: WO_K, radius: 62, rows: 2 },
  heap: { cell: [44, 44], most: 56 },
  sorter: { cards: 3, cardSize: [170, 230] },
  partNames: WO_PART.slice(2),
  readings: ["single fraction", "mixed number"],
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* every fraction written in an answer, in one order, so a sort can be compared as a set */
const woSet = (v: any) => (String(v ?? "").match(/\d+\s*\/\s*\d+/g) || []).map((s) => s.replace(/\s/g, "")).sort().join(" ");

/* judge: is this value right for this item? (a tidied answer may come two ways: 34/6 or 17/3) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v)
    || (item.alsoOk || []).some((alt: any) => judgeSlotParts({ answer: alt, parts: item.parts }, v));
  if (item.kind === "sort") return woSet(v) !== "" && woSet(v) === woSet(item.answer);
  return String(v ?? "").trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};

/* oracle: every answer re-derived by a second route that shares no code with judge or the picture
   (improper by subtraction, the whole part by taking the bottom away again and again, the single
   fraction by adding the bottom on once per whole) */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "sort") return it.cards.filter((c: number[]) => c[0] - c[1] >= 0).map((c: number[]) => c[0] + "/" + c[1]).join(" ") === it.answer;
  if (it.kind === "worth") {
    const a = it.cards[0][0], b = it.cards[0][1];
    return it.answer === (a - b >= 0 ? "yes" : "no") + (a === b ? "1" : a - b > 0 ? "more" : "less");
  }
  if (it.kind === "kind") return it.answer === (it.show[0] > 0 && it.show[1] > 0 && it.show[1] < it.show[2] ? "mixed" : "improper");
  if (it.kind === "write") return it.show[1] < it.show[2] && it.show.join() === it.answer.join();
  if (it.kind === "divide") {
    let left = it.from[0], q = 0;
    while (left >= it.from[1]) { left -= it.from[1]; q += 1; }
    return JSON.stringify(left === 0 ? [q, null, null] : [q, left, it.from[1]]) === JSON.stringify(it.answer);
  }
  if (it.kind === "build") {
    let all = it.mixed[1];
    for (let k = 0; k < it.mixed[0]; k++) all += it.mixed[2];
    return it.answer[0] === all && it.answer[1] === it.mixed[2]
      && (it.alsoOk || []).every((alt: number[]) => alt[0] * it.answer[1] === all * alt[1]);
  }
  return false;
}));

/* the most likely wrong answer (the misconception of that question); judge must reject it */
const nearMiss = (item: any) => {
  if (item.kind === "sort") return item.cards.filter((c: number[]) => c[0] > c[1]).map((c: number[]) => c[0] + "/" + c[1]).join(" ");
  if (item.kind === "worth") return "no1";                       /* equal numbers taken for proper */
  if (item.kind === "kind") return "improper";                   /* more than one whole, so called improper */
  if (item.kind === "write") return [item.answer[1], item.answer[0], item.answer[2]].join("|"); /* places swapped */
  if (item.kind === "divide") {
    const q = Math.floor(item.from[0] / item.from[1]), r = item.from[0] % item.from[1];
    return (r ? [r, q, item.from[1]] : [0, q, item.from[1]]).join("|"); /* remainder written as the whole part; an exact division: the quotient as the upper number */
  }
  if (item.kind === "build") return [item.mixed[0] + item.mixed[1], item.mixed[2]].join("|"); /* whole added to the top */
  return "~";
};

/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => {
  if (item.kind === "sort") return [];                           /* the cards are the question */
  if (item.choices) return item.named ? [] : [WO_SHOWN[item.answer]]; /* named: both kinds are in the question */
  const a = item.answer;
  if (a.length === 2) return [a[0] + "/" + a[1], fractionWords(a[0], a[1]), String(a[0]), words(a[0])];
  if (a[1] === null) return a[0] >= 10 ? [String(a[0]), words(a[0])] : [];
  return [a[0] + " " + a[1] + "/" + a[2], words(a[0]) + " and " + fractionWords(a[1], a[2])];
};

/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (T.state().stage === "demo") return HOOK.demo && HOOK.demo();
  if (item.kind === "sort" && HOOK.set) { HOOK.set(item.answer); setTimeout(() => HOOK.enter && HOOK.enter(), 40); return; }
  return T.submit(item.answer);
};
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.kind === "sort" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter; in a guide-steps phase it must return undefined so check() reaches api.onEnter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the pieces this tool draws ─────────────────────────────────────────────────────────── */

const WO_CSS = `
.wo-fly{transition:transform 360ms cubic-bezier(.3,.7,.25,1)}
.wo-in{animation:woIn 420ms ease-out both}
@keyframes woIn{from{opacity:0}to{opacity:1}}
@media (prefers-reduced-motion:reduce){.wo-fly{transition:none}.wo-in{animation:none}}
`;

/* one loose part: a wedge with its tip at the origin, pointing up, cut from a whole of radius r in d equal parts */
const woWedge = (r: number, d: number) => {
  const h = Math.PI / d, a1 = -Math.PI / 2 - h, a2 = -Math.PI / 2 + h;
  return `M 0 0 L ${(r * Math.cos(a1)).toFixed(2)} ${(r * Math.sin(a1)).toFixed(2)} A ${r} ${r} 0 0 1 `
    + `${(r * Math.cos(a2)).toFixed(2)} ${(r * Math.sin(a2)).toFixed(2)} Z`;
};
/* sector j (clockwise from the top) of a whole at (cx, cy): the shape a poured part settles into */
const woSec = (cx: number, cy: number, r: number, j: number, d: number) => {
  const a0 = -Math.PI / 2 + (j * 2 * Math.PI) / d, a1 = -Math.PI / 2 + ((j + 1) * 2 * Math.PI) / d;
  return `M ${cx} ${cy} L ${(cx + r * Math.cos(a0)).toFixed(2)} ${(cy + r * Math.sin(a0)).toFixed(2)} `
    + `A ${r} ${r} 0 0 1 ${(cx + r * Math.cos(a1)).toFixed(2)} ${(cy + r * Math.sin(a1)).toFixed(2)} Z`;
};

/* a whole one, cut into d equal parts, with `blue` of them filled with cake (the plain stand-in is golden; a <Skin> over the filled parts
   when `skin` is set, the plain shape always under it). An empty whole one is a pale cream wash with near-black cuts and no crust; a full
   one gets a green ring OUTSIDE the disc. Every cut is near-black, so it reads with the colour taken away. */
function WoPie({ x, y, r, d, blue = 0, skin, sid, ringW = 5 }: any) {
  const ang = (j: number) => -Math.PI / 2 + (j * 2 * Math.PI) / d;
  const w = r > 40 ? 2.5 : 1.8;
  const secs = Array.from({ length: Math.min(d, blue) }, (_, j) => j);
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={WO_EMPTY} />
      {secs.map((j) => <path key={"s" + j} d={woSec(x, y, r, j, d)} fill={WO_CAKE} />)}
      {skin && secs.length > 0 && <clipPath id={sid}>{secs.map((j) => <path key={j} d={woSec(x, y, r, j, d)} />)}</clipPath>}
      {skin && secs.length > 0 && <Skin name="disc" x={x - r} y={y - r} w={2 * r} h={2 * r} clip={"url(#" + sid + ")"} />}
      {secs.map((j) => <path key={"o" + j} d={woSec(x, y, r, j, d)} fill={WO_SHADE} fillOpacity={0.28} />)}
      {Array.from({ length: d }).map((_, j) => (
        <line key={"l" + j} x1={x} y1={y} x2={x + r * Math.cos(ang(j))} y2={y + r * Math.sin(ang(j))} stroke={WO_CUT} strokeWidth={w} />
      ))}
      <circle cx={x} cy={y} r={r} fill="none" stroke={WO_CUT} strokeWidth={w + 0.5} />
      {blue >= d && <circle cx={x} cy={y} r={r + 5} fill="none" stroke={woInk(WO_GREEN)} strokeWidth={ringW} />}
    </g>
  );
}

/* a fraction is drawn everywhere with its top number above a level line and its bottom number below, both upright and
   centred: never "3/4" written along a line. (x, y) is the middle of the bar. */
function WoFrac({ x, y, a, b, size, C, topInk, barInk }: any) {
  const w = Math.max(String(a).length, String(b).length) * size * 0.62 + size * 0.28;
  return (
    <g>
      <text x={x} y={y - size * 0.22} textAnchor="middle" fontSize={size} fontWeight={700} fill={topInk || C.ink}>{a}</text>
      <rect x={x - w / 2} y={y - size * 0.05} width={w} height={Math.max(4, size * 0.09)} rx={2} fill={barInk || C.ink} />
      <text x={x} y={y + size * 0.94} textAnchor="middle" fontSize={size} fontWeight={700} fill={C.ink}>{b}</text>
    </g>
  );
}
/* a mixed number: an upright whole number standing beside a stacked fraction */
function WoMixed({ x, y, w, a, b, size, big, C, wholeInk, topInk }: any) {
  const has = (v: any) => v !== null && v !== undefined && v !== "";
  const half = Math.max(String(a).length, String(b).length) * size * 0.31 + size * 0.14;
  return (
    <g>
      {has(w) && <text x={has(a) ? x - half - big * 0.14 : x} y={y + big * 0.36} textAnchor={has(a) ? "end" : "middle"} fontSize={big} fontWeight={700} fill={wholeInk || C.ink}>{w}</text>}
      {has(a) && <WoFrac x={x} y={y} a={a} b={b} size={size} C={C} topInk={topInk} />}
    </g>
  );
}

/* the mark on a sorter card is a berry dot and a berry edge (the Enter key's colours, from TOOL_THEME), never a tick: a tick reads "correct"; green belongs to a full whole one only */
const WO_MARK: any = (typeof TOOL_THEME !== "undefined" && TOOL_THEME && TOOL_THEME.enter) ? TOOL_THEME.enter : ["#DD408A", "#C3226D", "#861349", "#FFFFFF"];
/* a written fraction card for the sorter */
function WoCard({ a, b, C, marked }: any) {
  return (
    <g>
      <rect x={0} y={0} width={170} height={230} rx={18} fill={marked ? tint(WO_MARK[1], 0.88) : "#FFFFFF"} stroke={marked ? WO_MARK[1] : C.rule}
        strokeWidth={marked ? 7 : 2.5} filter="url(#fShadowSoft)" />
      <text x={85} y={92} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>{a}</text>
      <rect x={30} y={110} width={110} height={8} rx={4} fill={C.ink} />
      <text x={85} y={204} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>{b}</text>
      {marked && (
        <circle cx={152} cy={22} r={17} fill={WO_MARK[1]} stroke="#FFFFFF" strokeWidth={4} />
      )}
    </g>
  );
}

/* the answer card: a whole-number box (mixed) beside a numerator box over a bar over a denominator box, 160 tall.
   The cells and their digits are drawn here; the finger boxes are the runtime's (SlotPartBox) and live in Work. */
const WO_CARD_H = 160;
const woCardGeom = (nP: number, x0: number, y0: number) => {
  const fx = nP === 3 ? x0 + 126 : x0;
  return {
    w: nP === 3 ? 226 : 100, fx,
    whole: { x: x0, y: y0 + 28, w: 108, h: 104 },
    num: { x: fx, y: y0, w: 100, h: 72 },
    den: { x: fx, y: y0 + 88, w: 100, h: 72 },
    bar: { x: fx, y: y0 + 76, w: 100, h: 8 },
  };
};
function WoAnsCard({ nP, x0, y0, vals, active, open, C, inkOf }: any) {
  const g = woCardGeom(nP, x0, y0);
  const cell = (r: any, v: any, j: number, ink: string) => (
    <g key={j}>
      <rect x={r.x} y={r.y} width={r.w} height={r.h} rx={14} fill="#FFFFFF" stroke={open && active === j ? C.accent : C.rule} strokeWidth={open && active === j ? 5 : 3} />
      {v !== "" && v !== null && v !== undefined && (
        <text x={r.x + r.w / 2} y={r.y + r.h / 2 + 22} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={ink}>{v}</text>
      )}
      {(v === "" || v === null || v === undefined) && open && active === j && (
        <rect x={r.x + r.w / 2 - 2} y={r.y + 14} width={4} height={r.h - 28} rx={2} fill={C.accent} className="wo-in" />
      )}
    </g>
  );
  return (
    <g>
      {nP === 3 && cell(g.whole, vals[0], 0, inkOf.whole)}
      {cell(g.num, vals[nP === 3 ? 1 : 0], nP === 3 ? 1 : 0, inkOf.num)}
      <rect x={g.bar.x} y={g.bar.y} width={g.bar.w} height={g.bar.h} rx={4} fill={C.ink} />
      {cell(g.den, vals[nP === 3 ? 2 : 1], nP === 3 ? 2 : 1, inkOf.den)}
    </g>
  );
}

/* the heap grid: the biggest cell that holds n loose parts in the room the heap has */
const woGrid = (n: number, d: number, top: number, R: number) => {
  const H = WO_HEAP.bottom - 8 - top;
  let s = 130;
  while (s > 30 && Math.floor((WO_HEAP.w - 16) / s) * Math.floor(H / s) < n) s -= 2;
  const cols = Math.max(1, Math.floor((WO_HEAP.w - 16) / s));
  const rh = Math.max(14, Math.min(R, s - 6, (s - 6) / (2 * Math.sin(Math.PI / d))));   /* a small heap's wedge is as big as the wedge of a whole one */
  return { s, cols, rh };
};
const woHeapAt = (g: any, i: number, top: number) => ({
  x: WO_HEAP.x + 8 + (i % g.cols) * g.s + g.s / 2 + ((WO_HEAP.w - 16) - g.cols * g.s) / 2,
  y: top + Math.floor(i / g.cols) * g.s + g.s - 3,
});

/* the tray as the child holds it: which loose parts are in the heap, and which part sits in which sector of which whole one
   (-1 = that sector is still empty); `air` = parts still flying (drawn as pieces), `crack` = wholes that are splitting */
const woCfgOf = (d: any) => (d.kind === "free" ? { d: 4, total: 9, whole: 0 }
  : d.show ? { d: d.show[2], total: d.show[0] * d.show[2] + d.show[1], whole: d.show[0] }
    : d.from ? { d: d.from[1], total: d.from[0], whole: 0 }
      : { d: d.mixed[2], total: d.mixed[0] * d.mixed[2] + d.mixed[1], whole: d.mixed[0] });
const woFresh = (c: any) => ({
  heap: Array.from({ length: c.total - c.whole * c.d }, (_, i) => c.whole * c.d + i),
  circ: Array.from({ length: WO_K }, (_, k) => Array.from({ length: c.d }, (_, j) => (k < c.whole ? k * c.d + j : -1))),
  air: [] as number[], crack: [] as number[],
});
const woBoard = (k: string, d: any) => {
  const base: any = { k, deco: {}, touched: false };
  if (d.kind === "sort" || d.kind === "worth") return { ...base, cards: d.cards.map((c: number[]) => ({ a: c[0], b: c[1], down: false, poured: false })) };
  const cfg = woCfgOf(d);
  return { ...base, cfg, tray: woFresh(cfg) };
};
const woFull = (xs: number[]) => xs.length > 0 && xs.every((x) => x >= 0);
const woBare = (xs: number[]) => xs.every((x) => x < 0);
const woWholes = (t: any) => t.circ.filter(woFull).length;
const woPut = (t: any, id: number, c: number, j: number) => ({
  ...t, heap: t.heap.filter((x: number) => x !== id),
  circ: t.circ.map((xs: number[], k: number) => (k === c ? xs.map((x, jj) => (jj === j ? id : x)) : xs)),
  air: [...t.air, id],
});
const woCrack = (t: any, c: number) => ({ ...t, air: [...t.air, ...t.circ[c].filter((id: number) => id >= 0 && t.air.indexOf(id) < 0)], crack: t.crack.indexOf(c) < 0 ? [...t.crack, c] : t.crack });
const woSplit = (t: any, c: number) => ({ ...t, heap: [...t.heap, ...t.circ[c].filter((id: number) => id >= 0)],
  circ: t.circ.map((xs: number[], k: number) => (k === c ? xs.map(() => -1) : xs)), crack: t.crack.filter((x: number) => x !== c) });
const woLand = (t: any, ids: number[]) => ({ ...t, air: t.air.filter((x: number) => ids.indexOf(x) < 0) });
const woValue = (cs: any[]) => cs.filter((c) => c.down).map((c) => c.a + "/" + c.b).join(" ");
const woCards = (v: any) => (String(v ?? "").match(/\d+\s*\/\s*\d+/g) || []).map((s: string) => s.replace(/\s/g, "").split("/"));

/* ── the working area: the picture is 880 wide and 520 tall, centred in box.w ──────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, part, api, MODEL, step, stepOn, box, answerOn, cardKind, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const warm = !free && (stage === "demo" || stage === "teach");
  const desc = free ? WO_FREE : warm ? WO_WARM[n] : item;
  const bk = free ? "free" : warm ? n + ":warm" : n + ":" + index;
  const [st, setSt] = useState<any>(() => woBoard(bk, desc));
  /* the board is derived from the question's key during render, so a new question never draws the old one for a frame */
  const S = st.k === bk ? st : woBoard(bk, desc);
  const SR = useRef<any>(S); SR.current = S;
  const busyRef = useRef(false);
  const lastKey = useRef(0);
  const [busy, setBusy] = useState(false);
  const timers = useRef<any[]>([]);
  const later = (ms: number, fn: () => void) => { const id = setTimeout(fn, ms); timers.current.push(id); return id; };
  const clearTimers = () => { timers.current.forEach((i: any) => clearTimeout(i)); timers.current = []; };
  const nudged = useRef(false);
  useEffect(() => {
    if (st.k !== bk) { tl.stop(); clearTimers(); nudged.current = false; api.lock(false); busyRef.current = false; setBusy(false); setSt(S); }
  }, [bk]);
  useEffect(() => () => { tl.stop(); clearTimers(); }, [bk]);
  const put = (p: any) => { const nx = { ...SR.current, ...p, deco: p.deco ? { ...SR.current.deco, ...p.deco } : SR.current.deco }; SR.current = nx; setSt(nx); };
  const upTray = (t: any) => put({ tray: t });
  const upd = (f: any) => upTray(f(SR.current.tray));     /* change the CURRENT tray, never a snapshot taken earlier */
  const setDeco = (p: any) => put({ deco: p });

  const kind = desc.kind;
  const isCards = !!S.cards;
  const isSort = kind === "sort" && stage === "ask";
  const cfg = S.cfg, T0 = S.tray, deco = S.deco;
  const d = isCards ? 0 : cfg.d;
  const ox = Math.max(0, Math.round((box.w - WO_W) / 2));
  const kx = box.key ? box.key.x - 12 : box.w;
  const reveal = free || warm || stage === "win" || stage === "idle" || !!deco.tb;   /* counts and readings may show */
  const wholes = isCards ? 0 : woWholes(T0);
  const loose = isCards ? 0 : T0.heap.length;
  const atEnd = stage === "win" || stage === "idle";

  /* the heap grid is laid out once for the biggest heap this board will hold */
  const heapTop = free ? 270 : 96;
  /* a board whose heap never grows (the tray is only read) lays the heap out for the parts that are really loose, so they are as big as the wholes' wedges */
  const nMax = isCards ? 0 : free ? Math.max(cfg.total, 12) : kind === "write" || kind === "kind" || kind === "count" ? Math.max(1, cfg.total - cfg.whole * cfg.d) : cfg.total;
  const K = isCards ? 0 : kind === "divide" || free ? WO_K : Math.max(1, cfg.whole);
  const lay = woLay(K), WR = lay.R;
  const grid = isCards ? null : woGrid(nMax, d, heapTop, WR);
  const rh = grid ? grid.rh : 40;
  const gf = lang === "gu" ? 1.2 : 1;          /* Gujarati tags are drawn 1.2 times as big */
  const TG = T.label * gf;

  /* ── acts: each one is performed on screen with api.act, and reported with api.did ── */
  const didIf = (on: string) => { if (stage === "demo") api.did(on); };
  const finishAct = (ok: boolean, on: string) => { busyRef.current = false; setBusy(false); if (!ok) return false; api.sfx.settle(); didIf(on); return true; };
  const guard = () => { if (busyRef.current) return false; busyRef.current = true; setBusy(true); return true; };
  const wait = (p: Promise<any> | null) => Promise.race([p || Promise.resolve(), new Promise((r) => setTimeout(r, 1400))]);

  const warmDone = warm && stepOn === null && stage === "demo";
  /* the line that reads the warm-up's end picture (one sentence each; a literal per phase so its Hindi and Gujarati are listed) */
  const sayWarm = () => {
    if (n === 1) api.say("Three quarters is proper; nine quarters is improper.");
    else if (n === 2) api.say("2 full circles and 1 loose third: two and one third.");
    else if (n === 3) api.say("8 ÷ 3 = 2, 2 left over: two and two thirds.");
    else api.say("2 × 3 = 6, 6 + 1 = 7: seven thirds.");
  };

  /* phase 1: the hand pours every card's parts into its circles */
  const colsX = (N: number) => (N === 1 ? [330] : N === 2 ? [250, 570] : [145, 435, 725]);
  const pourCards = async () => {
    const un = SR.current.cards.map((_: any, i: number) => i).filter((i: number) => !SR.current.cards[i].poured);
    if (!un.length || !guard()) return false;
    put({ touched: true });
    const xs = colsX(SR.current.cards.length);
    const ok = await api.act({ tool: "hand", moves: "push", at: un.map((i: number) => ({ x: ox + xs[i], y: kind === "worth" ? 482 : 388 })),
      onPoint: (k: number) => { put({ cards: SR.current.cards.map((c: any, i: number) => (i === un[k] ? { ...c, poured: true } : c)) }); api.sfx.tick(); } });
    return finishAct(ok, "pour");
  };
  /* phase 3 and free play: the hand pours one whole one from the heap into the next bare circle */
  const flyIn = (c: number) => new Promise<void>((res) => {
    const t0 = SR.current.tray, dd = SR.current.cfg.d;
    const take = t0.heap.slice(-dd);
    let t = t0; const Q: any[] = [];
    take.forEach((id: number, j: number) => { t = woPut(t, id, c, j); const sn = t; Q.push([55, () => upTray(sn)]); });
    const done = woLand(t, take);
    Q.push([380, () => { upTray(done); api.sfx.tick(); }]);
    tl.run(Q, () => res());
  });
  const pourOne = async () => {
    const t = SR.current.tray, dd = SR.current.cfg.d;
    const c = t.circ.findIndex(woBare);
    if (c < 0 || t.heap.length < dd || !guard()) return false;
    put({ touched: true });
    const last = woHeapAt(grid, t.heap.length - 1, heapTop);
    let landed: Promise<void> | null = null;
    const ok = await api.act({ tool: "hand", moves: "push", from: { x: ox + last.x, y: last.y - 24 }, at: [{ x: ox + lay.cx(c), y: lay.cy(c) }],
      onPoint: () => { landed = flyIn(c); } });
    await wait(landed);
    return finishAct(ok, "pour");
  };
  /* phase 4 and free play: the knife cuts every whole one along its lines and its parts slide into the heap. Each whole splits from the
     moment the knife passes it, from the CURRENT tray; the keys stay locked until the last one has landed */
  const splitOne = (c: number) => new Promise<void>((res) => {
    const ids0 = SR.current.tray.circ[c].filter((x: number) => x >= 0);
    upd((t: any) => woCrack(t, c));
    later(240, () => upd((t: any) => woSplit(t, c)));
    later(620, () => { upd((t: any) => woLand(t, ids0)); api.sfx.tick(); res(); });
  });
  const breakAll = async () => {
    const t = SR.current.tray; const cs: number[] = [];
    t.circ.forEach((r: number[], k: number) => { if (woFull(r)) cs.push(k); });
    if (!cs.length || !guard()) return false;
    put({ touched: true });
    const pend: Promise<void>[] = [];
    const ok = await api.act({ tool: "knife", moves: "slice", ms: Math.min(3400, 800 + 420 * cs.length), at: cs.map((k) => ({ x: ox + lay.cx(k), y: lay.cy(k) })),
      onPoint: (i: number) => { api.sfx.cut(); if (woFull(SR.current.tray.circ[cs[i]])) pend.push(splitOne(cs[i])); } });
    await Promise.race([Promise.all(pend), new Promise((r) => setTimeout(r, 6000))]);
    return finishAct(ok, "break");
  };
  /* phase 2: the hand counts the full circles, then the loose parts */
  const countNext = async () => {
    const dc = SR.current.deco.cnt || 0;
    if (dc >= 2 || !guard()) return false;
    const t = SR.current.tray;
    const full: number[] = []; t.circ.forEach((r: number[], k: number) => { if (woFull(r)) full.push(k); });
    const at = dc === 0 ? full.map((k) => ({ x: ox + lay.cx(k), y: lay.cy(k) }))
      : t.heap.map((_: any, i: number) => { const p = woHeapAt(grid, i, heapTop); return { x: ox + p.x, y: p.y - 22 }; });
    const ok = await api.act({ tool: "hand", moves: "tap", at,
      onPoint: (i: number) => { setDeco(dc === 0 ? { cw: i + 1 } : { cl: i + 1 }); api.sfx.tick(); } });
    if (ok) setDeco({ cnt: dc + 1 });
    return finishAct(ok, "count");
  };
  const doAct = (on: string) => {
    if (on === "pour") return isCards ? pourCards() : pourOne();
    if (on === "break") return breakAll();
    if (on === "count") return countNext();
    return Promise.resolve(false);
  };
  /* a tap on the action key: a wrong key during a step is a wrong act; 400 ms: one tap never also presses the next label */
  const press = (on: string) => {
    const t = Date.now();
    if (t - lastKey.current < 400) return;
    lastKey.current = t;
    if (warmDone) { sayWarm(); return; }
    if (stage === "demo" && stepOn && stepOn !== on) { api.did(on); return; }
    void doAct(on);
  };
  /* Enter, the agent's check() and the dev solve() perform the current step */
  const stepAct = () => { if (stepOn) void doAct(stepOn); };
  HOOK.demo = stage === "demo" && stepOn ? stepAct : null;

  /* the sorter: a tap on a card marks it improper, a second tap takes the mark back */
  const tapCard = (i: number) => {
    if (stage === "demo") { api.did("card"); return; }
    if (!isSort || busyRef.current) return;
    api.sfx.tick();
    if (nudged.current) { nudged.current = false; api.say(item.say); }     /* the question comes back after a nudge */
    const cards = SR.current.cards.map((c: any, k: number) => (k === i ? { ...c, down: !c.down } : c));
    put({ cards, touched: true });
    api.setTyped(woValue(cards));
  };
  const marked = isCards ? S.cards.filter((c: any) => c.down).length : 0;
  useEffect(() => { if (isSort) api.answerReady(marked > 0); }, [marked, isSort, bk]);
  /* Enter: nothing marked shows the question's own hint (no miss); the very marks that just missed are not judged again */
  const enterFn = isSort && !busy ? () => {
    const v = woValue(SR.current.cards);
    if (!v) { nudged.current = true; api.say(item.miss); return; }
    if (v === SR.current.missedV) return;
    api.submit(v);
  } : null;
  api.onEnter(stage === "demo" && stepOn ? stepAct : enterFn);
  HOOK.enter = () => enterFn && enterFn();
  HOOK.set = (v: any) => {
    const want = woCards(v).map((p: string[]) => p[0] + "/" + p[1]);
    if (!SR.current.cards.some((c: any) => want.indexOf(c.a + "/" + c.b) >= 0)) return false;     /* "hello" is no answer: the marks stay */
    const cards = SR.current.cards.map((c: any) => ({ ...c, down: want.indexOf(c.a + "/" + c.b) >= 0 }));
    put({ cards, touched: true });
    api.setTyped(woValue(cards));
    return true;
  };

  /* ── the mathematics redrawn: the same motion runs the win (quick) and the traceback (slow) ── */
  const revealSteps = (slow: number) => {
    const Q: any[] = [];
    if (isCards) {
      SR.current.cards.forEach((c: any, i: number) => {
        if (!c.poured) Q.push([360 * slow, () => { put({ cards: SR.current.cards.map((x: any, k: number) => (k === i ? { ...x, poured: true } : x)) }); api.sfx.tick(); }]);
      });
      Q.push([420 * slow, () => setDeco({ tags: true })]);
      Q.push([300, () => {}]);
      return Q;
    }
    const dd = SR.current.cfg.d;
    if (kind === "divide") {
      let t = SR.current.tray;
      for (;;) {
        const c = t.circ.findIndex(woBare);
        if (c < 0 || t.heap.length < dd) break;
        const take = t.heap.slice(-dd);
        take.forEach((id: number, j: number) => { t = woPut(t, id, c, j); const sn = t; Q.push([50 * slow + 10, () => upTray(sn)]); });
        t = woLand(t, take); const fin = t;
        Q.push([380, () => { upTray(fin); api.sfx.tick(); }]);
      }
      Q.push([300 * slow, () => setDeco({ fin: true, lw: true })]);
      Q.push([520 * slow, () => setDeco({ lf: true })]);
    } else if (kind === "build") {
      let t = SR.current.tray;
      t.circ.forEach((r: number[], c: number) => {
        if (!woFull(r)) return;
        const ids = r.slice();
        const cracked = { ...t, air: [...t.air, ...ids], crack: [...t.crack, c] };
        const moved = { ...cracked, heap: [...t.heap, ...ids], circ: t.circ.map((xs: number[], k: number) => (k === c ? xs.map(() => -1) : xs)), crack: t.crack };
        const settled = woLand(moved, ids);
        Q.push([300 * slow + 40, () => { upTray(cracked); api.sfx.cut(); }]);
        Q.push([240, () => upTray(moved)]);
        Q.push([380, () => { upTray(settled); api.sfx.tick(); }]);
        t = settled;
      });
      Q.push([300 * slow, () => setDeco({ fin: true })]);
      Q.push([520 * slow, () => setDeco({ meth: true })]);
    } else {
      Q.push([300 * slow, () => setDeco({ fin: true, lw: true })]);
      Q.push([520 * slow, () => setDeco({ lf: true })]);
      if (kind !== "write") Q.push([520 * slow, () => setDeco({ lm: true })]);
    }
    Q.push([300, () => {}]);
    return Q;
  };
  /* the win: the maths moves, then the next question waits for the Next key */
  useEffect(() => {
    if (stage !== "win") return;
    if (item.win) api.say(item.win);
    setDeco({ tb: true });
    tl.run(revealSteps(0.5));
  }, [stage]);
  /* the traceback: the mathematics redrawn in steps, ending on the whole right answer; nothing is marked or cleared */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    if (isCards) put({ missedV: woValue(SR.current.cards) });
    setDeco({ tb: true, typedAt: typed });
    tl.run(revealSteps(1), () => api.lock(false));
  }, [wrong]);

  /* the warm-up shows its result once the last step is done, holds it (stepHold) and reads it on the bubble */
  useEffect(() => {
    if (!warmDone) return;
    setDeco({ tb: true });
    sayWarm();
    tl.run(revealSteps(0.6));
  }, [warmDone]);

  /* a restart (or a tap on the phase's own dot) sends the guide back to its first step: the warm-up board starts afresh too */
  useEffect(() => {
    if (warm && stage === "demo" && step === 0 && (SR.current.touched || SR.current.deco.cnt)) {
      tl.stop(); api.lock(false); busyRef.current = false; setBusy(false);
      const nb = woBoard(bk, desc); SR.current = nb; setSt(nb);
    }
  }, [step, stage]);

  /* the card is ready unless an act is playing */
  useEffect(() => { if (api.cardReady) api.cardReady(!busy); }, [busy, bk]);

  /* ── free play: recut the parts, or change the heap ── */
  const grow = (dn: number) => {
    const c0 = SR.current.cfg, t = SR.current.tray;
    const total = c0.total + dn;
    if (total < 1 || total > Math.min(48, WO_K * c0.d + c0.d - 1) || (dn < 0 && t.heap.length < 1) || busyRef.current) return;
    api.sfx.tick();
    const top = Math.max(-1, ...t.heap, ...t.circ.map((r: number[]) => Math.max(-1, ...r)));
    put({ cfg: { ...c0, total }, tray: dn > 0 ? { ...t, heap: [...t.heap, top + 1] } : { ...t, heap: t.heap.slice(0, -1) } });
  };
  const recut = (dn: number) => {
    const c0 = SR.current.cfg;
    const nd = c0.d + dn;
    if (nd < 2 || nd > 12 || SR.current.tray.circ.some(woFull) || busyRef.current) return;
    api.sfx.tick();
    const cfg2 = { ...c0, d: nd, whole: 0, total: Math.min(c0.total, 48, WO_K * nd + nd - 1) };
    put({ cfg: cfg2, tray: woFresh(cfg2) });
  };

  /* what the host and the teacher agent can read back; nothing here is an answer the child has not given */
  const known = free || atEnd || !!deco.tb;
  const hidden = (kind === "write" || kind === "kind") && !known;      /* the field names would name the kind (or hold the tray's reading): null until answered */
  api.share({
    complete: stage === "idle",
    partSize: kind === "write" && !known ? null : d || null, looseParts: isCards || hidden ? null : loose,
    wholesFilled: isCards || hidden ? null : wholes,
    improperFraction: isCards ? null : kind === "divide" || free ? cfg.total + "/" + d : known && kind === "build" ? cfg.total + "/" + d : null,
    mixedNumber: isCards ? null : kind === "build" ? desc.mixed.join(" ")
      : free ? (wholes > 0 && loose < d ? [wholes, loose, d].join(" ") : null)
        : known && (kind === "write" || kind === "kind") ? desc.show.join(" ") : null,
    direction: kind === "build" ? "to one fraction" : kind === "divide" ? "to a mixed number" : null,
    onTray: isCards ? S.cards.filter((c: any) => c.down).map((c: any) => c.a + "/" + c.b) : null,
  });

  /* ── drawing ── */
  const parts: any[] = [];
  const air = isCards ? [] : T0.air;
  const where: any = {};
  if (!isCards) {
    T0.heap.forEach((id: number, i: number) => { where[id] = { h: i }; });
    T0.circ.forEach((xs: number[], c: number) => xs.forEach((id: number, j: number) => { if (id >= 0) where[id] = { c, j }; }));
    Object.keys(where).forEach((key) => { const id = Number(key); const w = where[id]; if (w.h !== undefined || air.indexOf(id) >= 0) parts.push(id); });
    parts.sort((a, b) => a - b);
  }
  const wedge = isCards ? "" : woWedge(rh, d);
  let skinBudget = 40;
  const settledOf: any = {};
  const partSkin: any = {};
  if (!isCards) {
    for (let k = 0; k < K; k++) {
      const ids = T0.circ[k].map((id: number, j: number) => (id >= 0 && air.indexOf(id) < 0 ? j : -1)).filter((j: number) => j >= 0);
      settledOf[k] = ids;
      if (ids.length) skinBudget -= 1;
    }
    const nearest = parts.filter((id) => air.indexOf(id) >= 0).concat(parts.filter((id) => air.indexOf(id) < 0).sort((a, b) => where[a].h - where[b].h));
    nearest.forEach((id) => { if (skinBudget > 0) { partSkin[id] = true; skinBudget -= 1; } });
  }
  const tf = (id: number) => {
    const loc = where[id];
    if (loc.c !== undefined) {
      let a = ((loc.j + 0.5) * 360) / d; if (a > 180) a -= 360;
      const crk = T0.crack.indexOf(loc.c) >= 0 ? 16 : 0;
      const rad = ((loc.j + 0.5) * 2 * Math.PI) / d;
      return `translate(${lay.cx(loc.c) + crk * Math.sin(rad)}px, ${lay.cy(loc.c) - crk * Math.cos(rad)}px) rotate(${a.toFixed(1)}deg) scale(${(WR / rh).toFixed(3)})`;
    }
    const p = woHeapAt(grid, loc.h, heapTop);
    return `translate(${p.x}px, ${p.y}px) rotate(0deg) scale(1)`;
  };

  /* the answer card (phases 2 to 4): where it stands in the strip, and what it shows */
  const nP = item && item.parts && !free && !warm ? item.parts.length : 0;
  const cardX = kind === "divide" ? 124 : kind === "build" ? 236 : 250;
  const cardY = kind === "divide" ? 338 : 352;      /* the phase 3 equation row stands 14 higher, so "quotient" clears its box */
  const ans: any[] = nP ? item.answer.map((v: any) => (v === null ? "" : String(v))) : [];
  const typedVals = nP ? slotPartsOf(typed, nP) : [];
  const typedHas = typedVals.some((v: string) => v !== "");
  /* at the win the card keeps what the child wrote (34/6 or 17/3 both count); the correction's answer shows only until the child types */
  const showAns = nP && (atEnd ? !typedHas : (deco.fin && (!typed || typed === deco.typedAt)));
  const vals = nP ? (showAns ? ans : typedVals) : [];
  const live = stage === "ask" && !!nP && !busy;
  const cg = nP ? woCardGeom(nP, cardX, cardY) : null;

  /* the action key of this board (one key at the bottom of the heap column; free play puts two side by side) */
  const keyRect = { x: 620, y: 436, w: 240, h: 80 };
  const KEYS: any = { pour: "Pour", break: "Break", count: "Count" };
  const canPour = !isCards && T0.circ.some(woBare) && T0.heap.length >= d;
  const canBreak = !isCards && T0.circ.some(woFull);
  const keyOn = (id: string) => (id === "pour" ? (isCards ? S.cards.some((c: any) => !c.poured) : canPour)
    : id === "break" ? canBreak : id === "count" ? (deco.cnt || 0) < 2 : false);
  let keyIds: string[] = [];
  if (free) keyIds = ["pour", "break"];
  else if (isCards && (stage === "ask" || stage === "demo")) keyIds = ["pour"];
  else if (kind === "count" && stage === "demo") keyIds = ["count"];
  else if (kind === "divide" && (stage === "ask" || stage === "demo")) keyIds = ["pour"];
  else if (kind === "build" && (stage === "ask" || stage === "demo")) keyIds = ["break"];
  const keyPos = (j: number) => (keyIds.length === 2 ? { x: 556 + j * 166, y: keyRect.y, w: 150, h: keyRect.h } : keyRect);
  const invId = stage === "demo" && stepOn ? stepOn : null;

  const circles = K;

  return (
    <g>
      <style>{WO_CSS}</style>
      <g transform={`translate(${ox} 0)`}>

        {/* ── phase 1 (and the warm-up of phase 1): the sorter, every card with the SAME number of empty circles under it ── */}
        {isCards && (() => {
          const N = S.cards.length;
          const xs = colsX(N);
          const dy = kind === "worth" ? 96 : 0;      /* the choice keys stand along the top: the card stands under them */
          const M = Math.max(1, ...S.cards.map((c: any) => Math.ceil(c.a / c.b)));   /* the most circles any card needs: every card gets that many */
          const cyC = dy ? 482 : 388, rC = 34;
          let skinsLeft = 40;
          return (
            <g>
              {S.cards.map((c: any, i: number) => {
                const cx = xs[i];
                const tagged = !!deco.tags || (reveal && c.poured && atEnd);
                const sign = c.a > c.b ? ">" : c.a < c.b ? "<" : "=";
                const spare = N <= 2, fs = (spare ? T.prompt : T.label) * gf;     /* a sparse frame: the tags at 40 */
                const ty = 266 + dy;
                return (
                  <g key={S.k + ":" + i}>
                    <g transform={`translate(${cx - 85} ${dy})`}><WoCard a={c.a} b={c.b} C={C} marked={c.down} /></g>
                    {tagged && (
                      <g className="wo-in">
                        <text x={cx - 14} y={ty} textAnchor="end" fontSize={fs} fontWeight={700} fill={C.ink}>{c.a + " " + sign + " " + c.b}</text>
                        <text x={cx} y={ty} textAnchor="middle" fontSize={fs} fontWeight={700} fill={C.ink}>·</text>
                        <text x={cx + 14} y={ty} textAnchor="start" fontSize={fs} fontWeight={700} fill={C.ink}>{tx(c.a >= c.b ? "improper" : "proper")}</text>
                        {c.a === c.b && <text x={cx} y={(spare ? 308 : 304) + dy} textAnchor="middle" fontSize={fs} fontWeight={700} fill={woInk(WO_GREEN)}>{tx("one whole")}</text>}
                      </g>
                    )}
                    {Array.from({ length: M }).map((_, t) => {
                      const blue = c.poured ? Math.max(0, Math.min(c.b, c.a - t * c.b)) : 0;
                      const sk = blue > 0 && skinsLeft > 0;
                      if (sk) skinsLeft -= 1;
                      return <WoPie key={t} x={cx + (t - (M - 1) / 2) * 94} y={cyC} r={rC} d={c.b} blue={blue} skin={sk} sid={"wo-c" + i + "-" + t} ringW={tagged ? 8 : 5} />;
                    })}
                    {(isSort || stage === "demo") && (
                      <Hit id={"card-" + (i + 1)} x={cx - 85} y={dy} w={170} h={230} label={"Card " + c.a + " over " + c.b} onPress={() => tapCard(i)} enabled />
                    )}
                  </g>
                );
              })}
            </g>
          );
        })()}

        {/* ── phases 2 to 4 and free play: the tray of whole ones, the heap of loose parts and the strip under them ── */}
        {!isCards && (
          <g>
            {d >= 2 && (
              <g>
                <rect x={0} y={0} width={290} height={56} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
                <text x={145} y={39} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(WO_CUTIN[d])}</text>
              </g>
            )}
            <rect x={0} y={64} width={516} height={270} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
            <rect x={WO_HEAP.x - 4} y={free ? 252 : 80} width={WO_HEAP.w + 8} height={WO_HEAP.bottom - (free ? 252 : 80)} rx={RAD.panel} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={2} />

            {/* the whole ones: a pale cream disc, the cake sectors that have landed (ONE skin clipped to them) */}
            {Array.from({ length: circles }).map((_, k) => {
              const cx = lay.cx(k), cy = lay.cy(k), ids = settledOf[k];
              return (
                <g key={"w" + k}>
                  <circle cx={cx} cy={cy} r={WR} fill={WO_EMPTY} />
                  {ids.map((j: number) => <path key={j} d={woSec(cx, cy, WR, j, d)} fill={WO_CAKE} />)}
                  {ids.length > 0 && <clipPath id={"wo-w" + k}>{ids.map((j: number) => <path key={j} d={woSec(cx, cy, WR, j, d)} />)}</clipPath>}
                  {ids.length > 0 && <Skin name="disc" x={cx - WR} y={cy - WR} w={2 * WR} h={2 * WR} clip={"url(#wo-w" + k + ")"} />}
                  {ids.map((j: number) => <path key={"o" + j} d={woSec(cx, cy, WR, j, d)} fill={WO_SHADE} fillOpacity={0.28} />)}
                </g>
              );
            })}
            {/* the loose parts, and the ones in flight: the plain wedge, the cake skin at its home position clipped to the wedge, then the outline */}
            <clipPath id="wo-wedge"><path d={wedge} /></clipPath>
            <g>
              {parts.map((id) => (
                <g key={S.k + ":" + id} className="wo-fly" style={{ transform: tf(id) } as any}>
                  <path d={wedge} fill={WO_CAKE} />
                  {partSkin[id] && <Skin name="disc" x={-rh} y={-rh} w={2 * rh} h={2 * rh} clip="url(#wo-wedge)" />}
                  <path d={wedge} fill={WO_SHADE} fillOpacity={0.28} />
                  <path d={wedge} fill="none" stroke={WO_CUT} strokeWidth={2} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                </g>
              ))}
            </g>
            {/* the cuts of every whole one, near-black, drawn over the parts; a full one wears a green ring outside the disc */}
            {Array.from({ length: circles }).map((_, k) => {
              const cx = lay.cx(k), cy = lay.cy(k);
              const full = T0.circ[k].every((id: number) => id >= 0 && air.indexOf(id) < 0);
              return (
                <g key={"r" + k}>
                  {Array.from({ length: d }).map((__, j) => {
                    const a = -Math.PI / 2 + (j * 2 * Math.PI) / d;
                    return <line key={j} x1={cx} y1={cy} x2={cx + WR * Math.cos(a)} y2={cy + WR * Math.sin(a)} stroke={WO_CUT} strokeWidth={2.5} />;
                  })}
                  <circle cx={cx} cy={cy} r={WR} fill="none" stroke={WO_CUT} strokeWidth={3.5} />
                  {full && <circle cx={cx} cy={cy} r={WR + 7} fill="none" stroke={woInk(WO_GREEN)} strokeWidth={deco.lw ? 8 : 5} />}
                  {reveal && deco.cw && k < deco.cw && woFull(T0.circ[k]) && (
                    <text x={cx} y={cy + 24} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={woInk(WO_GREEN)} stroke="#FFFFFF" strokeWidth={6} paintOrder="stroke">{k + 1}</text>
                  )}
                </g>
              );
            })}
            {/* the loose parts counted one by one (the warm-up of phase 2) */}
            {reveal && deco.cl && T0.heap.slice(0, deco.cl).map((id: number, i: number) => {
              const p = woHeapAt(grid, i, heapTop);
              return <text key={i} x={p.x} y={p.y - rh - 4} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={woInk(WO_BLUE)}>{i + 1}</text>;
            })}
            {/* the remainder ringed: the loose parts that are left */}
            {deco.lf && loose > 0 && grid && (
              <rect className="wo-in" x={WO_HEAP.x + 2} y={heapTop - 4} width={WO_HEAP.w - 4}
                height={Math.ceil(loose / grid.cols) * grid.s + 8} rx={16} fill="none" stroke={woInk(WO_BLUE)} strokeWidth={5} />
            )}
            {/* the running count of the heap, once the maths may show (never while a question is open) */}
            {reveal && kind === "build" && grid && (
              <text x={WO_HEAP.x + WO_HEAP.w / 2} y={68} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={woInk(WO_BLUE)}>{loose + " " + tx(loose === 1 ? "part" : "parts")}</text>
            )}

            {/* ── the strip under the tray: what is given, and the card the answer is written on ── */}
            {kind === "divide" && !free && <WoFrac x={38} y={cardY + 80} a={desc.from[0]} b={desc.from[1]} size={T.speech} C={C} topInk={woInk(WO_BLUE)} />}
            {kind === "divide" && !free && <text x={100} y={cardY + 96} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={woInk(WO_ROSE)}>=</text>}
            {kind === "build" && !free && <WoMixed x={112} y={432} w={desc.mixed[0]} a={desc.mixed[1]} b={desc.mixed[2]} size={T.xl} big={T.display} C={C} wholeInk={woInk(WO_GREEN)} />}
            {kind === "build" && !free && <text x={206} y={452} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={woInk(WO_ROSE)}>=</text>}
            {(kind === "kind" || kind === "count") && !free && (
              <g>
                <WoMixed x={360} y={432} w={desc.show[0]} a={desc.show[1]} b={desc.show[2]} size={T.xl} big={T.display} C={C}
                  wholeInk={deco.lw ? woInk(WO_GREEN) : C.ink} topInk={deco.lf ? woInk(WO_BLUE) : C.ink} />
              </g>
            )}
            {free && (
              <g>
                <WoFrac x={86} y={432} a={cfg.total} b={d} size={T.xl} C={C} topInk={woInk(WO_BLUE)} />
                {wholes > 0 && loose < d && <text x={176} y={452} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={woInk(WO_ROSE)}>=</text>}
                {wholes > 0 && loose < d && <WoMixed x={340} y={432} w={wholes} a={loose > 0 ? loose : ""} b={d} size={T.xl} big={T.display} C={C} wholeInk={woInk(WO_GREEN)} topInk={woInk(WO_BLUE)} />}
                {loose === 0 && wholes > 0 && <text x={258} y={510} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={woInk(WO_GREEN)}>{tx("exactly full")}</text>}
              </g>
            )}
            {/* phase 3: the division written out once the heap is poured (a separate label each: three short ones) */}
            {kind === "divide" && !free && deco.fin && (() => {
              const f = desc.from, q = Math.floor(f[0] / f[1]), r = f[0] % f[1];
              return (
                <g className="wo-in">
                  <text x={392} y={430} fontSize={TG} fontWeight={700} fill={C.ink}>{f[0] + " ÷ " + f[1]}</text>
                  <text x={392} y={468} fontSize={TG} fontWeight={700} fill={C.ink}>{"= " + q}</text>
                  <text x={392} y={506} fontSize={TG} fontWeight={700} fill={C.ink}>{r > 0 ? r + " " + tx("left over") : tx("none left over")}</text>
                </g>
              );
            })()}
            {/* warm-up: the finished reading */}
            {warm && kind === "divide" && deco.fin && (
              <g className="wo-in">
                <WoMixed x={250} y={cardY + 80} w={desc.answer[0]} a={desc.answer[1]} b={desc.answer[2]} size={T.xl} big={T.display} C={C} wholeInk={woInk(WO_GREEN)} topInk={woInk(WO_BLUE)} />
              </g>
            )}
            {warm && kind === "build" && deco.fin && (
              <g className="wo-in">
                <WoMixed x={112} y={432} w={desc.mixed[0]} a={desc.mixed[1]} b={desc.mixed[2]} size={T.xl} big={T.display} C={C} wholeInk={woInk(WO_GREEN)} />
                <text x={206} y={452} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={woInk(WO_ROSE)}>=</text>
                <WoFrac x={290} y={432} a={desc.answer[0]} b={desc.answer[1]} size={T.xl} C={C} topInk={woInk(WO_BLUE)} />
              </g>
            )}

            {/* the answer card: a tap target while the keypad is shut, finger boxes while it is open */}
            {nP > 0 && cg && (
              <g>
                <WoAnsCard nP={nP} x0={cardX} y0={cardY} vals={vals} active={part} open={!!box.open && stage === "ask"} C={C}
                  inkOf={{ whole: woInk(WO_GREEN), num: woInk(WO_BLUE), den: C.ink }} />
                {live && !box.open && answerOn === "card" && (
                  <g>
                    <SlotPartBox id="answer-open" label="Answer" x={cardX - 4} y={cardY - 4} w={cg.w + 8} h={WO_CARD_H + 8} onPick={api.openAnswer} />
                    <BlinkRing x={cardX - 4} y={cardY - 4} w={cg.w + 8} h={WO_CARD_H + 8} rx={20} C={C} />
                  </g>
                )}
                {live && box.open && (
                  <g>
                    {nP === 3 && <SlotPartBox id="part-1" label="Whole number" x={cg.whole.x} y={cg.whole.y - 8} w={cg.whole.w} h={cg.whole.h + 16} on={part === 0} onPick={() => api.pickPart(0)} />}
                    <SlotPartBox id={nP === 3 ? "part-2" : "part-1"} label="Top number" x={cg.fx} y={cardY - 4} w={cg.num.w} h={84} on={part === (nP === 3 ? 1 : 0)} onPick={() => api.pickPart(nP === 3 ? 1 : 0)} />
                    <SlotPartBox id={nP === 3 ? "part-3" : "part-2"} label="Bottom number" x={cg.fx} y={cardY + 80} w={cg.den.w} h={84} on={part === (nP === 3 ? 2 : 1)} onPick={() => api.pickPart(nP === 3 ? 2 : 1)} />
                  </g>
                )}
              </g>
            )}

            {/* the two places of a mixed number, each tied to what it counts */}
            {(kind === "write" || kind === "kind" || kind === "count" || kind === "divide") && deco.lw && !free && (
              <g className="wo-in">
                {kind !== "divide" && <text x={258} y={326} textAnchor="middle" fontSize={TG} fontWeight={700} fill={woInk(WO_GREEN)}>{tx("whole number")}</text>}
                {kind === "divide" && cg && <text x={cardX + 54} y={cardY + WO_CARD_H + 8} textAnchor="middle" fontSize={TG} fontWeight={700} fill={woInk(WO_GREEN)}>{tx("quotient")}</text>}
                {kind === "divide" && cg && <path d={`M ${cardX + 54} ${cardY + 28} L ${cardX + 54} ${cardY - 6}`} stroke={woInk(WO_GREEN)} strokeWidth={5} strokeLinecap="round" />}
                {kind !== "divide" && cg && <path d={`M ${cardX + 54} ${cardY + 28} L ${cardX + 54} ${cardY - 6}`} stroke={woInk(WO_GREEN)} strokeWidth={5} strokeLinecap="round" />}
              </g>
            )}
            {(kind === "write" || kind === "kind" || kind === "count" || kind === "divide") && deco.lf && !free && (
              <g className="wo-in">
                {kind === "divide" && cg && item.answer[1] !== null && <text x={cardX + 126 + 100 + 12} y={cardY + 44} fontSize={TG} fontWeight={700} fill={woInk(WO_BLUE)}>{tx("remainder")}</text>}
                {kind !== "divide" && <text x={WO_HEAP.x + WO_HEAP.w / 2} y={heapTop + Math.ceil(Math.max(1, loose) / grid.cols) * grid.s + 36} textAnchor="middle" fontSize={TG} fontWeight={700} fill={woInk(WO_BLUE)}>{tx("proper fraction")}</text>}
              </g>
            )}
            {deco.lm && !free && (
              <g className="wo-in">
                <text x={16} y={440} fontSize={TG} fontWeight={700} fill={C.ink}>{tx("mixed number")}</text>
              </g>
            )}
            {deco.meth && kind === "build" && !free && (() => {
              const m = warm ? desc.mixed : item.mixed, prod = m[0] * m[2];
              return (
                <g className="wo-in">
                  <text x={372} y={392} fontSize={TG} fontWeight={700} fill={C.ink}>{m[0] + " × " + m[2]}</text>
                  <text x={372} y={430} fontSize={TG} fontWeight={700} fill={C.ink}>{"= " + prod}</text>
                  <text x={372} y={468} fontSize={TG} fontWeight={700} fill={C.ink}>{prod + " + " + m[1]}</text>
                  <text x={372} y={506} fontSize={TG} fontWeight={700} fill={C.ink}>{"= " + (prod + m[1])}</text>
                </g>
              );
            })()}

            {/* free play: recut the parts, or change the heap */}
            {free && (
              <g>
                <Key id="cut-less" label="Fewer parts in a whole" x={WO_HEAP.x} y={92} w={76} h={72} C={C} disabled={d <= 2 || T0.circ.some(woFull) || busy} onClick={() => recut(-1)}>
                  <text y={14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>−</text>
                </Key>
                <text x={WO_HEAP.x + WO_HEAP.w / 2} y={138} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(WO_PART[d])}</text>
                <Key id="cut-more" label="More parts in a whole" x={WO_HEAP.x + WO_HEAP.w - 76} y={92} w={76} h={72} C={C} disabled={d >= 12 || T0.circ.some(woFull) || busy} onClick={() => recut(1)}>
                  <text y={14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>+</text>
                </Key>
                <Key id="heap-less" label="One loose part fewer" x={WO_HEAP.x} y={172} w={76} h={72} C={C} disabled={cfg.total <= 1 || loose < 1 || busy} onClick={() => grow(-1)}>
                  <text y={14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>−</text>
                </Key>
                <text x={WO_HEAP.x + WO_HEAP.w / 2} y={218} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{cfg.total + " " + tx(cfg.total === 1 ? "part" : "parts")}</text>
                <Key id="heap-more" label="One loose part more" x={WO_HEAP.x + WO_HEAP.w - 76} y={172} w={76} h={72} C={C} disabled={cfg.total >= Math.min(48, WO_K * d + d - 1) || busy} onClick={() => grow(1)}>
                  <text y={14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>+</text>
                </Key>
              </g>
            )}
          </g>
        )}

        {/* the one action key of this board (Pour, Break or Count), at the foot of the picture */}
        {keyIds.map((id, j) => {
          const r = keyPos(j);
          return (
            <Key key={id} id={id} label={tx(KEYS[id])} x={r.x} y={r.y} w={r.w} h={r.h} C={C} disabled={(!keyOn(id) && !warmDone) || busy} onClick={() => press(id)}>
              <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(KEYS[id])}</text>
            </Key>
          );
        })}
        {invId && keyIds.indexOf(invId) >= 0 && !busy && (() => { const r = keyPos(keyIds.indexOf(invId)); return <Invite x={r.x + r.w / 2} y={r.y + r.h / 2} w={r.w} h={r.h} rx={22} C={C} />; })()}
      </g>
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: a fraction or a mixed number is
   drawn stacked here too, beside the whole ones it fills */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const L = (result && result.last) || {};
  const P = PHASES[(n || 1) - 1];
  const q = it || (P && P.items[L.item]);
  if (!q) return null;
  const mid = h / 2;
  const box = <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />;
  const pies = (count: number, dd: number, blue: number) => Array.from({ length: Math.min(count, 3) }).map((_, k) => (
    <WoPie key={k} x={32 + k * 50} y={mid} r={22} d={dd} blue={blue} />
  ));
  if (q.kind === "sort" || q.kind === "worth") {
    const fr = q.kind === "worth" ? q.cards.map((c: number[]) => [String(c[0]), String(c[1])]) : woCards(L.value);
    if (!fr.length) return null;
    return (
      <g>{box}
        {fr.slice(0, 2).map((f: string[], k: number) => (
          <WoFrac key={k} x={w - 60 - k * 80} y={mid} a={f[0]} b={f[1]} size={T.micro} C={C} topInk={woInk(WO_BLUE)} />
        ))}
        {q.kind === "worth" && <WoPie x={40} y={mid} r={22} d={Number(fr[0][1])} blue={Number(fr[0][1])} />}
      </g>
    );
  }
  if (q.kind === "kind" || q.kind === "write") {
    return (
      <g>{box}{pies(q.show[0], q.show[2], q.show[2])}
        <WoMixed x={w - 50} y={mid} w={q.show[0]} a={q.show[1]} b={q.show[2]} size={T.micro} big={T.label} C={C} />
      </g>
    );
  }
  const ps = slotPartsOf(L.value, q.parts ? q.parts.length : 2);
  const tie = (x: number) => <text x={x} y={mid + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={woInk(WO_ROSE)}>=</text>;
  if (q.kind === "divide") {
    return (
      <g>{box}
        <WoFrac x={46} y={mid} a={q.from[0]} b={q.from[1]} size={T.micro} C={C} topInk={woInk(WO_BLUE)} />
        {tie(100)}
        <WoMixed x={176} y={mid} w={ps[0]} a={ps[1]} b={ps[2]} size={T.micro} big={T.label} C={C} wholeInk={woInk(WO_GREEN)} topInk={woInk(WO_BLUE)} />
      </g>
    );
  }
  return (
    <g>{box}
      <WoMixed x={66} y={mid} w={q.mixed[0]} a={q.mixed[1]} b={q.mixed[2]} size={T.micro} big={T.label} C={C} wholeInk={woInk(WO_GREEN)} />
      {tie(116)}
      <WoFrac x={176} y={mid} a={ps[0]} b={ps[1]} size={T.micro} C={C} topInk={woInk(WO_BLUE)} />
    </g>
  );
}

function WholeOnesTray(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b): the working area is the whole card until the child taps the answer card, then the keypad
         panel slides in from the right */
      board: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d): no question bar, only its blinking key at the top right; the question lives only in the bubble */
      keyOnly: true,
      /* the wide keypad: the picture is 880 wide and fits x 64 to 964 while the panel is open */
      bigPad: true,
      /* the Next key: nothing moves on by itself; the win picture waits for the child's tap */
      nextKey: true,
      /* a fraction or a mixed number is answered ON the card the picture draws (docs/PATTERNS.md 9e) */
      cardAnswer: true,
      /* four small clickable phase dots */
      navDots: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key */
      StartArt, START_HOOK,
      }} />
  );
}

export default WholeOnesTray;
