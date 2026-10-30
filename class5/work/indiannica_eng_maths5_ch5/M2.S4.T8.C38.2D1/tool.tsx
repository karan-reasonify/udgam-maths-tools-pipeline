/* ═══ M2.S4.T8.C38.2D1 · like_maker · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, the sound effects, the printed bubble, scoring, the
   events, idle and restart. THE LESSON IS SILENT (runtime r30): every line is printed on the bubble.
   THE NEW LOOK (keyOnly, navDots, one sentence a screen, every act through api.act; LAYOUT §1d-§1e,
   PATTERNS §15-§17). NO imports in this file; only the five host hooks.

   The tool: decimal cards with their points on one line. Phases 1-2: Count (the hand taps every digit
   after each point) and the Like / Unlike trays (drag a card, or tap it and the hand carries it).
   Phases 3-4: violet zero chips (drag one to a spot on a card, or tap the chip and the hand carries it
   to the chosen card's end), a hundred grid under the chosen card (phase 3), Point first (phase 4, the
   pencil writes the point). A zero dropped inside a decimal, or straight onto a whole number, shows what
   it would do and slides away; a card that already has the places it needs refuses it. Two questions
   (4.7 with two places, 12 with three) are written on a Decimal card. */

const TOOL_ID = "like_maker";
const MEDIA_ID = "M2.S4.T8.C38.2D1";
const TOOL_NAME = "Like Decimal Maker";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (not shown: phase 1 has steps) */
const OPENING = ["Some decimals, their points all in one line."];
/* the whole-tool line (not shown from r44; kept for the sidecar) */
const FINISH_LINE = "The zeros lined them up, and nothing changed its value.";
/* printed when the child opens Free play */
const FREE_LINE = "Free play. Make any set of decimals like.";

/* THE START PAGE (LAYOUT §1c): two cards with their points on one line, and the zero chips */
const START_HOOK = "Can 3.8 have as many places as 3.456?";
function StartArt({ box, C, tx = (v: any) => v }: any) {
  const blueInk = shade(CONTENT.hundred, 0.25), violet = CONTENT.bead, violetInk = shade(violet, 0.4), violetTint = tint(violet, 0.72);
  const cw = 58, px = 430, cx = 210, w = 560, h = 112;
  const card = (y: number, s: string) => {
    const sp = lmSplit(s);
    return (
      <g>
        <rect x={cx} y={y} width={w} height={h} rx={18} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />
        {sp.w.split("").map((d: string, k: number) => (
          <text key={"w" + k} x={px - 16 - (sp.w.length - k - 0.5) * cw} y={y + 82} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={blueInk}>{d}</text>
        ))}
        <text x={px} y={y + 82} textAnchor="middle" fontSize={T.display} fontWeight={800} fill={C.ink}>.</text>
        {sp.d.split("").map((d: string, k: number) => (
          <text key={"d" + k} x={px + 16 + (k + 0.5) * cw} y={y + 82} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={blueInk}>{d}</text>
        ))}
      </g>
    );
  };
  return (
    <g>
      <line x1={px} y1={10} x2={px} y2={box.h - 10} stroke={C.rule} strokeWidth={3} strokeDasharray="6 8" />
      {card(36, "3.8")}
      {card(190, "3.456")}
      <g>
        {[16, 8, 0].map((o: number) => (
          <g key={"c" + o}>
            <rect x={880} y={90 + o} width={128} height={110} rx={20} fill={violetTint} stroke={violetInk} strokeWidth={3} filter="url(#fShadowSoft)" />
            {o === 0 && <text x={944} y={170} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={violetInk}>0</text>}
          </g>
        ))}
        <text x={944} y={262} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("Added zero")}</text>
      </g>
    </g>
  );
}

/* Hindi and Gujarati (PATTERNS §11), keyed by the English byte for byte. Terms (NCERT Class 5): decimal दशमलव / દશાંશ,
   decimal places दशमलव स्थान / દશાંશ સ્થાન (short: स्थान / સ્થાન), like / unlike decimals समान / असमान दशमलव and
   સમાન / અસમાન દશાંશ, point बिंदु / બિંદુ, whole number पूर्ण संख्या / પૂર્ણ સંખ્યા, zero शून्य / શૂન્ય, value मान / કિંમત.
   The last block holds what tr-coverage cannot list: the win lines, the reaction lines, the words Work and Thumb draw,
   the run-time keys (lmPlacesText, lmTimes) and the aria words. */
const TR: any = {
  hi: {
    "Like Decimal Maker": "समान दशमलव बनाओ",
    "Like decimals": "समान दशमलव",
    "Unlike decimals": "असमान दशमलव",
    "Zeros after the point": "बिंदु के बाद शून्य",
    "Whole numbers get a point first": "पूर्ण संख्या को पहले बिंदु",
    "Can 3.8 have as many places as 3.456?": "क्या 3.8 में 3.456 जितने दशमलव स्थान हो सकते हैं?",
    "Free play. Make any set of decimals like.": "खुला खेल। कोई भी दशमलव समूह समान बनाओ।",
    "The zeros lined them up, and nothing changed its value.": "शून्यों ने उन्हें बराबर किया, और मान नहीं बदला।",
    "Some decimals, their points all in one line.": "कुछ दशमलव, सबके बिंदु एक सीध में।",
    /* phase 1 */
    "Tap Count to count the digits after each point.": "हर बिंदु के बाद के अंक गिनने के लिए गिनो दबाओ।",
    "Tap the Count key under the cards.": "कार्डों के नीचे गिनो बटन दबाओ।",
    "Tap Count, then compare the number of places on the cards.": "गिनो दबाओ, फिर कार्डों के दशमलव स्थानों की तुलना करो।",
    "Count each card's places before you drag.": "खींचने से पहले हर कार्ड के स्थान गिनो।",
    "Same number of places makes like decimals.": "बराबर दशमलव स्थान हों तो दशमलव समान होते हैं।",
    "You learned: the same count of decimal places makes like decimals": "तुमने सीखा: बराबर दशमलव स्थान वाले दशमलव समान होते हैं",
    "How many decimal places does 14.306 have?": "14.306 में कितने दशमलव स्थान हैं?",
    "How many places?": "कितने स्थान?",
    "The 1 and the 4 sit before the point, so leave them out.": "1 और 4 बिंदु से पहले हैं, इसलिए उन्हें मत गिनो।",
    "Start at the point and move right, one digit at a time.": "बिंदु से शुरू करके दाईं ओर एक-एक अंक आगे बढ़ो।",
    "Touch each digit after the point in turn and say a number for each.": "बिंदु के बाद हर अंक को छूकर एक-एक संख्या बोलो।",
    "Drag 6.02, 13.47 and 0.93 to Like if their places match, or to Unlike.": "6.02, 13.47 और 0.93 के स्थान बराबर हों तो समान में, नहीं तो असमान में खींचो।",
    "Like or unlike?": "समान या असमान?",
    "Look only at the digits to the right of each point.": "हर बिंदु के दाईं ओर के अंक ही देखो।",
    "Drag the two like decimals of 3.14, 31.4 and 0.72 onto the Like tray.": "3.14, 31.4 और 0.72 में से दो समान दशमलव समान ट्रे पर खींचो।",
    "Which two are like?": "कौन-से दो समान हैं?",
    "The same digits do not make decimals like.": "एक जैसे अंक होने से दशमलव समान नहीं होते।",
    /* phase 2 */
    "Tap Count to see how many places each card has.": "हर कार्ड में कितने स्थान हैं, देखने के लिए गिनो दबाओ।",
    "The Count key is under the two cards.": "गिनो बटन दोनों कार्डों के नीचे है।",
    "Tap Count, then compare the places of the cards.": "गिनो दबाओ, फिर कार्डों के स्थानों की तुलना करो।",
    "When the numbers of places differ, the decimals are unlike.": "स्थानों की संख्या अलग हो तो दशमलव असमान होते हैं।",
    "Different numbers of places make unlike decimals.": "अलग-अलग दशमलव स्थान हों तो दशमलव असमान होते हैं।",
    "You learned: different counts of decimal places make unlike decimals": "तुमने सीखा: अलग दशमलव स्थान वाले दशमलव असमान होते हैं",
    "Put 7.1 and 7.105 on the Like tray or the Unlike tray.": "7.1 और 7.105 को समान ट्रे या असमान ट्रे पर रखो।",
    "Starting with 7.1 does not make them like.": "7.1 से शुरू होने से वे समान नहीं बनते।",
    "Which tray do 0.6 and 0.66 belong on?": "0.6 और 0.66 किस ट्रे पर जाएँगे?",
    "Which tray?": "कौन-सी ट्रे?",
    "Which card has more digits after its point?": "किस कार्ड में बिंदु के बाद ज़्यादा अंक हैं?",
    "5.20, 5.2 and 5.200 have the same value; are they like decimals?": "5.20, 5.2 और 5.200 का मान बराबर है; क्या वे समान दशमलव हैं?",
    "Same value, like?": "मान बराबर, समान?",
    "The same value does not make them like.": "बराबर मान होने से वे समान नहीं बनते।",
    /* phase 3 */
    "Tap the zero chip to add a zero at the end of 3.8.": "3.8 के अंत में शून्य जोड़ने के लिए शून्य चिप दबाओ।",
    "Tap the violet zero chip.": "बैंगनी शून्य चिप दबाओ।",
    "Add one more zero and watch the shading stay put.": "एक और शून्य जोड़ो और देखो, रंगा भाग वहीं रहता है।",
    "Tap the zero chip once more.": "शून्य चिप एक बार और दबाओ।",
    "Add zeros at the end of each shorter card.": "कम स्थान वाले हर कार्ड के अंत में शून्य जोड़ो।",
    "Add zeros after the last digit until the counts are equal.": "गिनती बराबर होने तक अंतिम अंक के बाद शून्य जोड़ो।",
    "Zeros at the end, after the point, keep the value.": "बिंदु के बाद अंत में शून्य लगाने से मान नहीं बदलता।",
    "You learned: zeros added at the end, after the point, keep the value": "तुमने सीखा: बिंदु के बाद अंत में जोड़े शून्य मान नहीं बदलते",
    "Now make 2.4 and 5.136 like decimals with zero chips.": "अब शून्य चिपों से 2.4 और 5.136 को समान दशमलव बनाओ।",
    "Make them like": "उन्हें समान बनाओ",
    "2.4 had fewer places than 5.136.": "2.4 में 5.136 से कम स्थान थे।",
    "Write 4.7 with two decimal places.": "4.7 को दो दशमलव स्थानों के साथ लिखो।",
    "4.7, two places": "4.7, दो स्थान",
    "Two places means two digits after the point.": "दो स्थान का अर्थ है बिंदु के बाद दो अंक।",
    "4.7 has one place, so it needs one more digit.": "4.7 में एक स्थान है, इसलिए एक और अंक चाहिए।",
    "Which digit after the 7 keeps the grid's shading where it is?": "7 के बाद कौन-सा अंक ग्रिड का रंगा भाग वहीं रखता है?",
    "Give 0.3, 0.46 and 0.127 the same number of places.": "0.3, 0.46 और 0.127 को बराबर स्थान दो।",
    "Make all three like": "तीनों को समान बनाओ",
    "0.3 and 0.46 had fewer places than 0.127.": "0.3 और 0.46 में 0.127 से कम स्थान थे।",
    /* phase 4 */
    "Tap the zero chip to put a zero straight onto 5.": "5 पर सीधे शून्य लगाने के लिए शून्य चिप दबाओ।",
    "That made 50, so tap Point first to give 5 its point.": "इससे 50 बना, इसलिए 5 को बिंदु देने के लिए पहले बिंदु दबाओ।",
    "Tap the Point first key.": "पहले बिंदु बटन दबाओ।",
    "Now tap the zero chip to add a zero after the point.": "अब बिंदु के बाद शून्य जोड़ने के लिए शून्य चिप दबाओ।",
    "The zero goes after the new point.": "शून्य नए बिंदु के बाद जाता है।",
    "One more zero makes 5 as long as 2.64.": "एक और शून्य से 5 में 2.64 जितने स्थान होंगे।",
    "Tap the zero chip again.": "शून्य चिप फिर से दबाओ।",
    "Tap Point first on the whole number, then add zeros.": "पूर्ण संख्या पर पहले बिंदु दबाओ, फिर शून्य जोड़ो।",
    "Give every card as many places as the longest one.": "हर कार्ड को सबसे लंबे कार्ड जितने स्थान दो।",
    "A whole number gets its point first, then the zeros.": "पूर्ण संख्या को पहले बिंदु मिलता है, फिर शून्य।",
    "You learned: a whole number gets its point first, then the zeros": "तुमने सीखा: पूर्ण संख्या को पहले बिंदु, फिर शून्य मिलते हैं",
    "Make 8 and 3.25 like decimals.": "8 और 3.25 को समान दशमलव बनाओ।",
    "Make 8 like 3.25": "8 को 3.25 जैसा बनाओ",
    "8 had fewer places than 3.25.": "8 में 3.25 से कम स्थान थे।",
    "Give 8 a point, then count the places of 3.25.": "8 को बिंदु दो, फिर 3.25 के स्थान गिनो।",
    "Add zeros after the point of 8 until both counts are equal.": "दोनों गिनती बराबर होने तक 8 के बिंदु के बाद शून्य जोड़ो।",
    "Write the whole number 12 with three decimal places.": "पूर्ण संख्या 12 को तीन दशमलव स्थानों के साथ लिखो।",
    "12, three places": "12, तीन स्थान",
    "The 12 stays whole, before the point.": "12 पूरा रहता है, बिंदु से पहले।",
    "Which digits can go after the point and leave 12 the same?": "बिंदु के बाद कौन-से अंक 12 को वैसा ही रखते हैं?",
    "Three places means three digits after the point.": "तीन स्थान का अर्थ है बिंदु के बाद तीन अंक।",
    "Now give 6, 2.8 and 0.315 the same number of places.": "अब 6, 2.8 और 0.315 को बराबर स्थान दो।",
    "6 and 2.8 had fewer places than 0.315.": "6 और 2.8 में 0.315 से कम स्थान थे।",
    "Give 6 a point, then count the places of 0.315.": "6 को बिंदु दो, फिर 0.315 के स्थान गिनो।",
    "Give 6 and 2.8 zeros after the point until all counts are equal.": "सब गिनती बराबर होने तक 6 और 2.8 को बिंदु के बाद शून्य दो।",
    /* not listed by tr-coverage: win lines, reaction lines, Work / Thumb words, run-time keys, aria words */
    "Yes, three digits after the point.": "हाँ, बिंदु के बाद तीन अंक।",
    "Yes, two places each.": "हाँ, हर एक में दो स्थान।",
    "Yes, 3.14 and 0.72 have two places.": "हाँ, 3.14 और 0.72 में दो स्थान हैं।",
    "Yes, one place and three: unlike.": "हाँ, एक स्थान और तीन: असमान।",
    "Yes, one place and two: unlike.": "हाँ, एक स्थान और दो: असमान।",
    "Same value, but unlike decimals.": "मान बराबर, पर असमान दशमलव।",
    "Yes, both have three places now.": "हाँ, अब दोनों में तीन स्थान हैं।",
    "Yes, 4.70 has two places.": "हाँ, 4.70 में दो स्थान हैं।",
    "Yes, all three have three places.": "हाँ, तीनों में तीन स्थान हैं।",
    "Yes, 8.00 and 3.25 are like decimals.": "हाँ, 8.00 और 3.25 समान दशमलव हैं।",
    "Yes, 12.000 is still twelve.": "हाँ, 12.000 अब भी बारह है।",
    "Yes, now all three have three places.": "हाँ, अब तीनों में तीन स्थान हैं।",
    "A zero inside the decimal moves its digits.": "दशमलव के अंदर शून्य रखने से उसके अंक खिसक जाते हैं।",
    "A zero goes after the last digit, not before the point.": "शून्य अंतिम अंक के बाद जाता है, बिंदु से पहले नहीं।",
    "This card already has enough places.": "इस कार्ड में पहले से पूरे स्थान हैं।",
    "Drag the cards to the trays first.": "पहले कार्डों को ट्रे पर खींचो।",
    "Add zeros first.": "पहले शून्य जोड़ो।",
    "Write the point and the zeros first.": "पहले बिंदु और शून्य लिखो।",
    "Count": "गिनो",
    "Point first": "पहले बिंदु",
    "New set": "नया सेट",
    "Added zero": "जोड़ा गया शून्य",
    "after the point": "बिंदु के बाद",
    "card": "कार्ड",
    "whole part": "पूर्ण भाग",
    "decimal part": "दशमलव भाग",
    "Decimal card": "दशमलव कार्ड",
    "0 places": "0 स्थान",
    "1 place": "1 स्थान",
    "2 places": "2 स्थान",
    "3 places": "3 स्थान",
    "10 times as big": "10 गुना बड़ा",
    "100 times as big": "100 गुना बड़ा",
    "1,000 times as big": "1,000 गुना बड़ा",
  },
  gu: {
    "Like Decimal Maker": "સમાન દશાંશ બનાવો",
    "Like decimals": "સમાન દશાંશ",
    "Unlike decimals": "અસમાન દશાંશ",
    "Zeros after the point": "બિંદુ પછી શૂન્ય",
    "Whole numbers get a point first": "પૂર્ણ સંખ્યાને પહેલાં બિંદુ",
    "Can 3.8 have as many places as 3.456?": "શું 3.8 માં 3.456 જેટલાં દશાંશ સ્થાન હોઈ શકે?",
    "Free play. Make any set of decimals like.": "મુક્ત રમત. કોઈ પણ દશાંશ સમૂહને સમાન બનાવો.",
    "The zeros lined them up, and nothing changed its value.": "શૂન્યોએ તેમને સરખા કર્યા, અને કિંમત ન બદલાઈ.",
    "Some decimals, their points all in one line.": "થોડા દશાંશ, બધાનાં બિંદુ એક લીટીમાં.",
    /* phase 1 */
    "Tap Count to count the digits after each point.": "દરેક બિંદુ પછીના અંકો ગણવા ગણો દબાવો.",
    "Tap the Count key under the cards.": "કાર્ડ નીચે ગણો બટન દબાવો.",
    "Tap Count, then compare the number of places on the cards.": "ગણો દબાવો, પછી કાર્ડ પરનાં દશાંશ સ્થાનોની સરખામણી કરો.",
    "Count each card's places before you drag.": "ખેંચતા પહેલાં દરેક કાર્ડનાં સ્થાન ગણો.",
    "Same number of places makes like decimals.": "સરખાં દશાંશ સ્થાન હોય તો દશાંશ સમાન બને છે.",
    "You learned: the same count of decimal places makes like decimals": "તમે શીખ્યા: સરખાં દશાંશ સ્થાનવાળા દશાંશ સમાન હોય છે",
    "How many decimal places does 14.306 have?": "14.306 માં કેટલાં દશાંશ સ્થાન છે?",
    "How many places?": "કેટલાં સ્થાન?",
    "The 1 and the 4 sit before the point, so leave them out.": "1 અને 4 બિંદુ પહેલાં છે, તેથી તેમને ન ગણો.",
    "Start at the point and move right, one digit at a time.": "બિંદુથી શરૂ કરી જમણી બાજુ એક-એક અંક આગળ વધો.",
    "Touch each digit after the point in turn and say a number for each.": "બિંદુ પછીના દરેક અંકને અડીને એક-એક સંખ્યા બોલો.",
    "Drag 6.02, 13.47 and 0.93 to Like if their places match, or to Unlike.": "6.02, 13.47 અને 0.93 નાં સ્થાન સરખાં હોય તો સમાનમાં, નહીં તો અસમાનમાં ખેંચો.",
    "Like or unlike?": "સમાન કે અસમાન?",
    "Look only at the digits to the right of each point.": "દરેક બિંદુની જમણી બાજુના અંકો જ જુઓ.",
    "Drag the two like decimals of 3.14, 31.4 and 0.72 onto the Like tray.": "3.14, 31.4 અને 0.72 માંથી બે સમાન દશાંશ સમાન ટ્રે પર ખેંચો.",
    "Which two are like?": "કયા બે સમાન છે?",
    "The same digits do not make decimals like.": "સરખા અંકોથી દશાંશ સમાન બનતા નથી.",
    /* phase 2 */
    "Tap Count to see how many places each card has.": "દરેક કાર્ડમાં કેટલાં સ્થાન છે તે જોવા ગણો દબાવો.",
    "The Count key is under the two cards.": "ગણો બટન બંને કાર્ડ નીચે છે.",
    "Tap Count, then compare the places of the cards.": "ગણો દબાવો, પછી કાર્ડનાં સ્થાનોની સરખામણી કરો.",
    "When the numbers of places differ, the decimals are unlike.": "સ્થાનોની સંખ્યા જુદી હોય તો દશાંશ અસમાન હોય છે.",
    "Different numbers of places make unlike decimals.": "જુદાં જુદાં દશાંશ સ્થાન હોય તો દશાંશ અસમાન બને છે.",
    "You learned: different counts of decimal places make unlike decimals": "તમે શીખ્યા: જુદાં દશાંશ સ્થાનવાળા દશાંશ અસમાન હોય છે",
    "Put 7.1 and 7.105 on the Like tray or the Unlike tray.": "7.1 અને 7.105 ને સમાન ટ્રે કે અસમાન ટ્રે પર મૂકો.",
    "Starting with 7.1 does not make them like.": "7.1 થી શરૂ થવાથી તે સમાન બનતા નથી.",
    "Which tray do 0.6 and 0.66 belong on?": "0.6 અને 0.66 કઈ ટ્રે પર જશે?",
    "Which tray?": "કઈ ટ્રે?",
    "Which card has more digits after its point?": "કયા કાર્ડમાં બિંદુ પછી વધુ અંક છે?",
    "5.20, 5.2 and 5.200 have the same value; are they like decimals?": "5.20, 5.2 અને 5.200 ની કિંમત સરખી છે; શું તે સમાન દશાંશ છે?",
    "Same value, like?": "કિંમત સરખી, સમાન?",
    "The same value does not make them like.": "સરખી કિંમતથી તે સમાન બનતા નથી.",
    /* phase 3 */
    "Tap the zero chip to add a zero at the end of 3.8.": "3.8 ના અંતે શૂન્ય ઉમેરવા શૂન્ય ચિપ દબાવો.",
    "Tap the violet zero chip.": "જાંબલી શૂન્ય ચિપ દબાવો.",
    "Add one more zero and watch the shading stay put.": "એક વધુ શૂન્ય ઉમેરો અને જુઓ, રંગેલો ભાગ ત્યાં જ રહે છે.",
    "Tap the zero chip once more.": "શૂન્ય ચિપ ફરી એક વાર દબાવો.",
    "Add zeros at the end of each shorter card.": "ઓછાં સ્થાનવાળા દરેક કાર્ડના અંતે શૂન્ય ઉમેરો.",
    "Add zeros after the last digit until the counts are equal.": "ગણતરી સરખી થાય ત્યાં સુધી છેલ્લા અંક પછી શૂન્ય ઉમેરો.",
    "Zeros at the end, after the point, keep the value.": "બિંદુ પછી અંતે શૂન્ય મૂકવાથી કિંમત બદલાતી નથી.",
    "You learned: zeros added at the end, after the point, keep the value": "તમે શીખ્યા: બિંદુ પછી અંતે ઉમેરેલા શૂન્ય કિંમત બદલતા નથી",
    "Now make 2.4 and 5.136 like decimals with zero chips.": "હવે શૂન્ય ચિપથી 2.4 અને 5.136 ને સમાન દશાંશ બનાવો.",
    "Make them like": "તેમને સમાન બનાવો",
    "2.4 had fewer places than 5.136.": "2.4 માં 5.136 કરતાં ઓછાં સ્થાન હતાં.",
    "Write 4.7 with two decimal places.": "4.7 ને બે દશાંશ સ્થાન સાથે લખો.",
    "4.7, two places": "4.7, બે સ્થાન",
    "Two places means two digits after the point.": "બે સ્થાન એટલે બિંદુ પછી બે અંક.",
    "4.7 has one place, so it needs one more digit.": "4.7 માં એક સ્થાન છે, તેથી એક વધુ અંક જોઈએ.",
    "Which digit after the 7 keeps the grid's shading where it is?": "7 પછી કયો અંક ગ્રિડનો રંગેલો ભાગ ત્યાં જ રાખે છે?",
    "Give 0.3, 0.46 and 0.127 the same number of places.": "0.3, 0.46 અને 0.127 ને સરખાં સ્થાન આપો.",
    "Make all three like": "ત્રણેયને સમાન બનાવો",
    "0.3 and 0.46 had fewer places than 0.127.": "0.3 અને 0.46 માં 0.127 કરતાં ઓછાં સ્થાન હતાં.",
    /* phase 4 */
    "Tap the zero chip to put a zero straight onto 5.": "5 પર સીધો શૂન્ય મૂકવા શૂન્ય ચિપ દબાવો.",
    "That made 50, so tap Point first to give 5 its point.": "આથી 50 બન્યા, તેથી 5 ને બિંદુ આપવા પહેલાં બિંદુ દબાવો.",
    "Tap the Point first key.": "પહેલાં બિંદુ બટન દબાવો.",
    "Now tap the zero chip to add a zero after the point.": "હવે બિંદુ પછી શૂન્ય ઉમેરવા શૂન્ય ચિપ દબાવો.",
    "The zero goes after the new point.": "શૂન્ય નવા બિંદુ પછી જાય છે.",
    "One more zero makes 5 as long as 2.64.": "એક વધુ શૂન્યથી 5 માં 2.64 જેટલાં સ્થાન થશે.",
    "Tap the zero chip again.": "શૂન્ય ચિપ ફરીથી દબાવો.",
    "Tap Point first on the whole number, then add zeros.": "પૂર્ણ સંખ્યા પર પહેલાં બિંદુ દબાવો, પછી શૂન્ય ઉમેરો.",
    "Give every card as many places as the longest one.": "દરેક કાર્ડને સૌથી લાંબા કાર્ડ જેટલાં સ્થાન આપો.",
    "A whole number gets its point first, then the zeros.": "પૂર્ણ સંખ્યાને પહેલાં બિંદુ મળે છે, પછી શૂન્ય.",
    "You learned: a whole number gets its point first, then the zeros": "તમે શીખ્યા: પૂર્ણ સંખ્યાને પહેલાં બિંદુ, પછી શૂન્ય મળે છે",
    "Make 8 and 3.25 like decimals.": "8 અને 3.25 ને સમાન દશાંશ બનાવો.",
    "Make 8 like 3.25": "8 ને 3.25 જેવો બનાવો",
    "8 had fewer places than 3.25.": "8 માં 3.25 કરતાં ઓછાં સ્થાન હતાં.",
    "Give 8 a point, then count the places of 3.25.": "8 ને બિંદુ આપો, પછી 3.25 નાં સ્થાન ગણો.",
    "Add zeros after the point of 8 until both counts are equal.": "બંને ગણતરી સરખી થાય ત્યાં સુધી 8 ના બિંદુ પછી શૂન્ય ઉમેરો.",
    "Write the whole number 12 with three decimal places.": "પૂર્ણ સંખ્યા 12 ને ત્રણ દશાંશ સ્થાન સાથે લખો.",
    "12, three places": "12, ત્રણ સ્થાન",
    "The 12 stays whole, before the point.": "12 આખો રહે છે, બિંદુ પહેલાં.",
    "Which digits can go after the point and leave 12 the same?": "બિંદુ પછી કયા અંક 12 ને એવો જ રાખે છે?",
    "Three places means three digits after the point.": "ત્રણ સ્થાન એટલે બિંદુ પછી ત્રણ અંક.",
    "Now give 6, 2.8 and 0.315 the same number of places.": "હવે 6, 2.8 અને 0.315 ને સરખાં સ્થાન આપો.",
    "6 and 2.8 had fewer places than 0.315.": "6 અને 2.8 માં 0.315 કરતાં ઓછાં સ્થાન હતાં.",
    "Give 6 a point, then count the places of 0.315.": "6 ને બિંદુ આપો, પછી 0.315 નાં સ્થાન ગણો.",
    "Give 6 and 2.8 zeros after the point until all counts are equal.": "બધી ગણતરી સરખી થાય ત્યાં સુધી 6 અને 2.8 ને બિંદુ પછી શૂન્ય આપો.",
    /* not listed by tr-coverage: win lines, reaction lines, Work / Thumb words, run-time keys, aria words */
    "Yes, three digits after the point.": "હા, બિંદુ પછી ત્રણ અંક.",
    "Yes, two places each.": "હા, દરેકમાં બે સ્થાન.",
    "Yes, 3.14 and 0.72 have two places.": "હા, 3.14 અને 0.72 માં બે સ્થાન છે.",
    "Yes, one place and three: unlike.": "હા, એક સ્થાન અને ત્રણ: અસમાન.",
    "Yes, one place and two: unlike.": "હા, એક સ્થાન અને બે: અસમાન.",
    "Same value, but unlike decimals.": "કિંમત સરખી, પણ અસમાન દશાંશ.",
    "Yes, both have three places now.": "હા, હવે બંનેમાં ત્રણ સ્થાન છે.",
    "Yes, 4.70 has two places.": "હા, 4.70 માં બે સ્થાન છે.",
    "Yes, all three have three places.": "હા, ત્રણેયમાં ત્રણ સ્થાન છે.",
    "Yes, 8.00 and 3.25 are like decimals.": "હા, 8.00 અને 3.25 સમાન દશાંશ છે.",
    "Yes, 12.000 is still twelve.": "હા, 12.000 હજી બાર જ છે.",
    "Yes, now all three have three places.": "હા, હવે ત્રણેયમાં ત્રણ સ્થાન છે.",
    "A zero inside the decimal moves its digits.": "દશાંશની અંદર શૂન્ય મૂકવાથી તેના અંક ખસી જાય છે.",
    "A zero goes after the last digit, not before the point.": "શૂન્ય છેલ્લા અંક પછી જાય છે, બિંદુ પહેલાં નહીં.",
    "This card already has enough places.": "આ કાર્ડમાં પહેલેથી પૂરતાં સ્થાન છે.",
    "Drag the cards to the trays first.": "પહેલાં કાર્ડ ટ્રે પર ખેંચો.",
    "Add zeros first.": "પહેલાં શૂન્ય ઉમેરો.",
    "Write the point and the zeros first.": "પહેલાં બિંદુ અને શૂન્ય લખો.",
    "Count": "ગણો",
    "Point first": "પહેલાં બિંદુ",
    "New set": "નવો સેટ",
    "Added zero": "ઉમેરેલો શૂન્ય",
    "after the point": "બિંદુ પછી",
    "card": "કાર્ડ",
    "whole part": "પૂર્ણ ભાગ",
    "decimal part": "દશાંશ ભાગ",
    "Decimal card": "દશાંશ કાર્ડ",
    "0 places": "0 સ્થાન",
    "1 place": "1 સ્થાન",
    "2 places": "2 સ્થાન",
    "3 places": "3 સ્થાન",
    "10 times as big": "10 ગણું મોટું",
    "100 times as big": "100 ગણું મોટું",
    "1,000 times as big": "1,000 ગણું મોટું",
  },
};

/* One entry per phase = one mount. Item fields of this tool:
   kind   set    the whole set of cards goes on the Like or the Unlike tray (drag or tap), Enter answers
          pick   the like cards go on the Like tray (drag or tap), Enter answers
          count  the number of decimal places of one card, typed on the keypad
          zeros  violet zero chips (and, on phase 4, Point first) make the cards like, Enter answers
          write  a decimal written on the Decimal card (SLOT_DECIMAL); the say names the places
   cards  the decimals on the working area, in order; near = the misconception, which judge rejects
   places (write) the number of decimal places the question asks for
   The warm-up of each phase (its guide steps) runs on the brief's own cards (LM_WARM), never on question 1's. */
const PHASES = [
  {
    n: 1,
    concept: "Like decimals",
    conceptId: "M2.S4.T8.C35", objectiveIds: ["O13"],
    says: ["Count only the digits after the point. Do the counts match?"],
    steps: [{ say: "Tap Count to count the digits after each point.", on: "count", hint: "Tap the Count key under the cards." }],
    /* the plan's rungs were stage directions: rewritten as lines for the child */
    ladder: ["Tap Count, then compare the number of places on the cards.", "Count each card's places before you drag."],
    closing: "Same number of places makes like decimals.",
    learned: "You learned: the same count of decimal places makes like decimals",
    traceback: "The digits before each point fade, the digits after it light and are counted, and the right cards are shown on the Like tray.",
    /* the order: count one card yourself (the warm-up counted with the key), then sort a set, then pick two */
    items: [
      /* practice 1: answer in the plan = 3, because three digits come after the point */
      { qid: "M2.S4.T8.C35:1", kind: "count", cards: ["14.306"], near: 5,
        say: "How many decimal places does 14.306 have?", ask: "How many places?",
        answer: 3, miss: "The 1 and the 4 sit before the point, so leave them out.",
        ladder: ["Start at the point and move right, one digit at a time.", "Touch each digit after the point in turn and say a number for each."],
        win: "Yes, three digits after the point." },
      /* learn LM1: answer in the plan = Each has two decimal places, so they are like decimals */
      { qid: "M2.S4.T8.C35:LM1", kind: "set", cards: ["6.02", "13.47", "0.93"], near: "unlike", pad: "enter",
        say: "Drag 6.02, 13.47 and 0.93 to Like if their places match, or to Unlike.", ask: "Like or unlike?",
        answer: "like", miss: "Look only at the digits to the right of each point.",
        win: "Yes, two places each." },
      /* practice 4: answer in the plan = 3.14 and 0.72. Each has two decimal places, and 31.4 has one */
      { qid: "M2.S4.T8.C35:4", kind: "pick", cards: ["3.14", "31.4", "0.72"], near: "3.14, 31.4", pad: "enter",
        say: "Drag the two like decimals of 3.14, 31.4 and 0.72 onto the Like tray.", ask: "Which two are like?",
        answer: "3.14, 0.72", miss: "The same digits do not make decimals like.",
        win: "Yes, 3.14 and 0.72 have two places." },
    ],
  },
  {
    n: 2,
    concept: "Unlike decimals",
    conceptId: "M2.S4.T8.C36", objectiveIds: ["O13"],
    says: ["One place here, three places there. Which tray?"],
    steps: [{ say: "Tap Count to see how many places each card has.", on: "count", hint: "The Count key is under the two cards." }],
    ladder: ["Tap Count, then compare the places of the cards.", "When the numbers of places differ, the decimals are unlike."],
    closing: "Different numbers of places make unlike decimals.",
    learned: "You learned: different counts of decimal places make unlike decimals",
    traceback: "The digits after each point light and are counted, the counts stand side by side, and the cards are shown on the right tray.",
    items: [
      /* learn LM2: answer in the plan = No. 7.1 has one decimal place and 7.105 has three, so they are unlike decimals */
      { qid: "M2.S4.T8.C36:LM2", kind: "set", cards: ["7.1", "7.105"], near: "like", pad: "enter",
        say: "Put 7.1 and 7.105 on the Like tray or the Unlike tray.", ask: "Like or unlike?",
        answer: "unlike", miss: "Starting with 7.1 does not make them like.",
        win: "Yes, one place and three: unlike." },
      /* practice 2: answer in the plan = Unlike. 0.6 has one decimal place and 0.66 has two */
      { qid: "M2.S4.T8.C36:2", kind: "set", cards: ["0.6", "0.66"], near: "like", pad: "enter",
        say: "Which tray do 0.6 and 0.66 belong on?", ask: "Which tray?",
        answer: "unlike", miss: "Which card has more digits after its point?",
        win: "Yes, one place and two: unlike." },
      /* practice 8: answer in the plan = They have the same value, because zeros at the end after the point change nothing.
         They are unlike decimals, with two, one and three decimal places. (The value half is given in the say; the tray
         answers the like / unlike half, the misconception being "same value, so like".) */
      { qid: "M2.S4.T8.C36:8", kind: "set", cards: ["5.20", "5.2", "5.200"], near: "like", pad: "enter",
        say: "5.20, 5.2 and 5.200 have the same value; are they like decimals?", ask: "Same value, like?",
        answer: "unlike", miss: "The same value does not make them like.",
        win: "Same value, but unlike decimals." },
    ],
  },
  {
    n: 3,
    concept: "Zeros after the point",
    conceptId: "M2.S4.T8.C37", objectiveIds: ["O14"],
    says: ["Add zeros after the last digit. Did the shading move?"],
    steps: [
      { say: "Tap the zero chip to add a zero at the end of 3.8.", on: "zero", hint: "Tap the violet zero chip." },
      { say: "Add one more zero and watch the shading stay put.", on: "zero", hint: "Tap the zero chip once more." },
    ],
    ladder: ["Add zeros at the end of each shorter card.", "Add zeros after the last digit until the counts are equal."],
    closing: "Zeros at the end, after the point, keep the value.",
    learned: "You learned: zeros added at the end, after the point, keep the value",
    traceback: "Missing zeros settle after the last digit of each shorter card, and the grid keeps its shading.",
    items: [
      /* learn LM3: answer in the plan = 2.400 and 5.136 */
      { qid: "M2.S4.T8.C37:LM3", kind: "zeros", cards: ["2.4", "5.136"], near: "2.004, 5.136", pad: "enter",
        say: "Now make 2.4 and 5.136 like decimals with zero chips.", ask: "Make them like",
        answer: "2.400, 5.136", miss: "2.4 had fewer places than 5.136.",
        win: "Yes, both have three places now." },
      /* practice 3: answer in the plan = 4.70 */
      { qid: "M2.S4.T8.C37:3", kind: "write", cards: ["4.7"], places: 2, parts: SLOT_DECIMAL, near: "4|07",
        say: "Write 4.7 with two decimal places.", ask: "4.7, two places",
        answer: ["4", "70"], miss: "Two places means two digits after the point.",
        ladder: ["4.7 has one place, so it needs one more digit.", "Which digit after the 7 keeps the grid's shading where it is?"],
        win: "Yes, 4.70 has two places." },
      /* practice 5: answer in the plan = 0.300, 0.460 and 0.127 */
      { qid: "M2.S4.T8.C37:5", kind: "zeros", cards: ["0.3", "0.46", "0.127"], near: "0.003, 0.406, 0.127", pad: "enter",
        say: "Give 0.3, 0.46 and 0.127 the same number of places.", ask: "Make all three like",
        answer: "0.300, 0.460, 0.127", miss: "0.3 and 0.46 had fewer places than 0.127.",
        win: "Yes, all three have three places." },
    ],
  },
  {
    n: 4,
    concept: "Whole numbers get a point first",
    conceptId: "M2.S4.T8.C38", objectiveIds: ["O14"],
    says: ["A zero straight onto five makes a new number. What comes first?"],
    steps: [
      { say: "Tap the zero chip to put a zero straight onto 5.", on: "zero", hint: "Tap the violet zero chip." },
      { say: "That made 50, so tap Point first to give 5 its point.", on: "point", hint: "Tap the Point first key." },
      { say: "Now tap the zero chip to add a zero after the point.", on: "zero", hint: "The zero goes after the new point." },
      { say: "One more zero makes 5 as long as 2.64.", on: "zero", hint: "Tap the zero chip again." },
    ],
    ladder: ["Tap Point first on the whole number, then add zeros.", "Give every card as many places as the longest one."],
    closing: "A whole number gets its point first, then the zeros.",
    learned: "You learned: a whole number gets its point first, then the zeros",
    traceback: "Zeros stuck straight onto a whole number slide off, the point is written after the ones digit, then the zeros settle.",
    items: [
      /* learn LM4: answer in the plan = 8.00 and 3.25 */
      { qid: "M2.S4.T8.C38:LM4", kind: "zeros", cards: ["8", "3.25"], near: "800, 3.25", pad: "enter",
        say: "Make 8 and 3.25 like decimals.", ask: "Make 8 like 3.25",
        answer: "8.00, 3.25", miss: "8 had fewer places than 3.25.",
        ladder: ["Give 8 a point, then count the places of 3.25.", "Add zeros after the point of 8 until both counts are equal."],
        win: "Yes, 8.00 and 3.25 are like decimals." },
      /* practice 6: answer in the plan = 12.000. Write the point first, then three zeros after it */
      { qid: "M2.S4.T8.C38:6", kind: "write", cards: ["12"], places: 3, parts: SLOT_DECIMAL, near: "12|00",
        say: "Write the whole number 12 with three decimal places.", ask: "12, three places",
        answer: ["12", "000"], miss: "The 12 stays whole, before the point.",
        ladder: ["Which digits can go after the point and leave 12 the same?", "Three places means three digits after the point."],
        win: "Yes, 12.000 is still twelve." },
      /* practice 7: answer in the plan = 6.000, 2.800 and 0.315 */
      { qid: "M2.S4.T8.C38:7", kind: "zeros", cards: ["6", "2.8", "0.315"], near: "6000, 2.800, 0.315", pad: "enter",
        say: "Now give 6, 2.8 and 0.315 the same number of places.", ask: "Make all three like",
        answer: "6.000, 2.800, 0.315", miss: "6 and 2.8 had fewer places than 0.315.",
        ladder: ["Give 6 a point, then count the places of 0.315.", "Give 6 and 2.8 zeros after the point until all counts are equal."],
        win: "Yes, now all three have three places." },
    ],
  },
];

/* ── the cards: the written form of a decimal ───────────────────────────────────────────── */
const lmSplit = (s: any) => { const t = String(s ?? ""); const i = t.indexOf("."); return i < 0 ? { w: t, d: "", pt: false } : { w: t.slice(0, i), d: t.slice(i + 1), pt: true }; };
const lmPlaces = (s: any) => lmSplit(s).d.length;
const lmPlacesText = (k: number) => (k === 1 ? "1 place" : k + " places");
const lmNorm = (v: any) => (Array.isArray(v) ? v.map(String) : String(v ?? "").split(/\s*,\s*/)).map((s: string) => s.trim()).filter(Boolean).join(", ");
/* which digits of a form were given and which were added (zeros, a point) */
function lmView(given: string, form: string) {
  const g = lmSplit(given), f = lmSplit(form);
  let j = 0;
  const dec = f.d.split("").map((c: string) => { if (j < g.d.length && c === g.d[j]) { j++; return { c, added: false }; } return { c, added: true }; });
  return { whole: f.w.split("").map((c: string, i: number) => ({ c, added: i >= g.w.length })), point: f.pt ? (g.pt ? "given" : "added") : null, dec, matched: j === g.d.length };
}
/* is the form the given number with nothing but zeros (and a point) added? */
function lmZerosOnly(given: string, form: string) {
  if (!/^\d+(\.\d*)?$/.test(String(form))) return false;
  const g = lmSplit(given), f = lmSplit(form);
  if (g.pt && !f.pt) return false;
  if (!f.w.startsWith(g.w) || /[^0]/.test(f.w.slice(g.w.length))) return false;
  const v = lmView(given, form);
  return v.matched && v.dec.every((d: any) => !d.added || d.c === "0");
}
/* a correction's path for one card: from what the child made to the right form, one step at a time */
function lmPath(given: string, from: string, to: string) {
  /* a zero stuck onto the whole part (800 for 8) is never redrawn: the correction starts from the given number */
  let cur = lmZerosOnly(given, from) && lmSplit(from).w === lmSplit(given).w ? from : given;
  const seq = [cur];
  if (!to.startsWith(cur)) {
    if (cur.startsWith(to)) { while (cur.length > to.length) { cur = cur.slice(0, -1); seq.push(cur); } return seq; }
    cur = given; seq.push(cur);
  }
  if (!lmSplit(cur).pt && lmSplit(to).pt) { cur += "."; seq.push(cur); }
  while (cur.length < to.length) { cur = to.slice(0, cur.length + 1); seq.push(cur); }
  return seq;
}
/* how many times as big a zero stuck onto a WHOLE number made it ("" when nothing was stuck on, and on a decimal card,
   where a zero before the point does not make it ten times as big: 2.4 to 20.4) */
const lmTimes = (given: string, form: string) => {
  if (lmSplit(given).pt) return "";
  const k = lmSplit(form).w.length - lmSplit(given).w.length;
  return k <= 0 ? "" : k === 1 ? "10 times as big" : k === 2 ? "100 times as big" : "1,000 times as big";
};

/* the warm-up cards of each phase (the brief's screens), Free play's sets, and the geometry */
const LM_WARM: any = { 1: ["4.17", "0.36", "12.05"], 2: ["3.8", "3.456"], 3: ["3.8", "3.456"], 4: ["5", "2.64"] };
const LM_FREE_SETS = [["2.5", "0.75", "6"], ["1.2", "3.45", "0.678"], ["9", "4.5", "12.05"], ["0.7", "15", "2.36"]];
/* cw a digit cell, pw the point's cell, ch a card's height, cnt the room for "3 places", room the width laid out for
   (the open keypad's 900, so nothing moves when it opens) */
const LM_G = { cw: 52, pw: 28, ch: 100, gap: 16, pad: 18, cnt: 150, room: 900, chipW: 110, chipH: 96 };

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = { warm: LM_WARM, freeSets: LM_FREE_SETS, geometry: LM_G, maxPlaces: 3 };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a count is digits only; a Decimal card is judged digit for digit after the point ("4.7" is not
   "4.70"); a set of cards is compared card by card, in order */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotDecimal(item, v);
  if (item.kind === "count") return /^\d+$/.test(String(v ?? "").trim()) && Number(v) === item.answer;
  if (item.kind === "set") return String(v ?? "").trim().toLowerCase() === item.answer;
  return lmNorm(v) === item.answer;
};
/* oracle: every answer re-derived from the cards by another route (a regex count, Number().toFixed) that
   shares no code with judge or Work */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const pl = (s: string) => ((/\.(\d*)$/.exec(s) || [])[1] || "").length;
  const c: string[] = it.cards;
  const alike = (xs: string[]) => xs.every((s) => pl(s) === pl(xs[0]));
  if (it.kind === "count") return pl(c[0]) === it.answer;
  if (it.kind === "set") return (alike(c) ? "like" : "unlike") === it.answer;
  if (it.kind === "pick") {
    for (let a = 0; a < c.length; a++) for (let b = a + 1; b < c.length; b++)
      if (pl(c[a]) === pl(c[b]) && c.every((s, k) => k === a || k === b || pl(s) !== pl(c[a]))) return c[a] + ", " + c[b] === it.answer;
    return false;
  }
  if (it.kind === "zeros") { const t = Math.max(...c.map(pl)); return c.map((s) => Number(s).toFixed(t)).join(", ") === it.answer; }
  if (it.kind === "write") return Number(c[0]).toFixed(it.places) === it.answer.join(".");
  return false;
}));
/* the misconception of each item (judge must reject it) */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print (cards already on the screen are
   not answers; "like" is a word every question needs) */
const answerForms = (item: any) => {
  if (item.kind === "count") return [String(item.answer), words(item.answer)];
  if (item.kind === "write") { const f = item.answer.join("."); return [f, speakable(f)]; }
  if (item.kind === "zeros") {
    const f = String(item.answer).split(", ").filter((x: string, i: number) => x !== item.cards[i]);
    return f.flatMap((x: string) => [x, speakable(x)]);
  }
  return [];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (T.state().stage === "demo") return HOOK.demo && HOOK.demo();
  if (item.pad === "enter" && HOOK.set) HOOK.set(item.answer);
  return T.submit(item.answer);
};
/* the agent's answer(): a working-area answer is set as a child would make it; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" ? (HOOK.set ? HOOK.set(v) : false) : undefined);
/* the agent's check() before Enter: nothing waits on this tool's board; undefined = press Enter (or the step) */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area ───────────────────────────────────────────────────────────────────────
   keyOnly: 64,108, 1472 x 520 shut, 900 x 520 with the keypad open (bigPad). Everything is laid out for the
   900-wide room (LM_G.room) at the left, on every question, and never moves when the keypad opens; the key's
   corner (box.key, x 1190 on) is never reached.
   A correction draws on S.demo inside pointerEvents="none", never on the child's own cards or trays, and the
   child's next act clears it. */
function Work({ phase, n, item, index, stage, wrong, typed, part, api, step, stepOn, box, answerOn, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  let G: any = LM_G;
  const blue = CONTENT.hundred, blueInk = shade(blue, 0.25), blueFade = mix(blueInk, "#FFFFFF", 0.5);
  const greyZero = "#767676", greyFade = mix(greyZero, "#FFFFFF", 0.5);
  const amber = CONTENT.ten, amberInk = shade(amber, 0.45), amberTint = tint(amber, 0.7);
  const violet = CONTENT.bead, violetInk = shade(violet, 0.4), violetTint = tint(violet, 0.72);
  const greenInk = shade(CONTENT.one, 0.35);
  const tlTrace = useTimeline(), tlFx = useTimeline(), tlShake = useTimeline();
  const [, bump] = useState(0);
  const S = useRef<any>({ key: "" });
  const prev = useRef<any>({});
  const playing = useRef(false);
  const lastKey = useRef(0);
  const dragFrom = useRef<any>(null);
  /* the release of a chip dropped INSIDE a decimal is not a tap on the board: its act is reported when the zero has
     slid to the end, so that one click must not reach the runtime's empty-board handler (it would flash a step hint) */
  const quietClick = useRef(0);
  const put =(o: any) => { S.current = { ...S.current, ...o }; bump((k: number) => k + 1); };

  /* which board: a phase's warm-up (its guide steps), Free play, or the question's own cards */
  const free = stage === "free";
  const warm = !free && stage === "demo" && !!LM_WARM[n];
  const kind = free ? "zeros" : warm ? (n <= 2 ? "set" : "zeros") : item.kind;
  const setNo = S.current.set || 0;
  const given: string[] = free ? LM_FREE_SETS[setNo] : warm ? LM_WARM[n] : item.cards;
  const boardKey = free ? "free" + setNo : warm ? "w" + n : "i" + n + "." + index;
  /* a restart of the same warm-up (a phase dot, the header's restart) starts it clean */
  const p0 = prev.current;
  const rewarm = warm && (p0.stage !== "demo" || (step || 0) < (p0.step || 0) || (p0.on == null && stepOn != null));
  if (S.current.key !== boardKey || rewarm) {
    const cs = given.map((g: string, i: number) => ({ id: "c" + i, given: g, form: g }));
    const t0 = kind === "write" ? item.places : Math.max(...given.map(lmPlaces));
    const place: any = {};
    cs.forEach((c: any) => { place[c.id] = "col"; });
    S.current = { key: boardKey, set: setNo, gen: (S.current.gen || 0) + 1, cards: cs, place, sel: (cs.find((c: any) => lmPlaces(c.given) < t0) || cs[0]).id,
      counted: false, lit: [], fade: false, demo: null, temp: null, full: null, pulse: null, sh: 0, missVal: null, missTyped: null, touched: false, travel: null };
  }
  prev.current = { stage, step, on: stepOn };
  const gen = S.current.gen;
  useEffect(() => { tlTrace.stop(); tlFx.stop(); tlShake.stop(); }, [gen]);

  const st = S.current;
  const cards: any[] = st.cards;
  const count = cards.length;
  /* the cards' scale: the tray questions and phase 4 fill the 900-wide room (digits 90); phase 3 and Free play share it
     with the grid, and a card counted alone has its own 1.5 */
  const p4 = kind === "zeros" && n === 4 && !free;
  const K = !free && (kind === "set" || kind === "pick" || p4) ? 1.25 : 1;
  if (K !== 1) G = { ...LM_G, cw: LM_G.cw * K, ch: LM_G.ch * K, pw: LM_G.pw * K, pad: LM_G.pad * K, cnt: LM_G.cnt * K, gap: 12 };
  const FD = T.display * K, FC = T.label * K;
  const target = kind === "write" ? item.places : Math.max(...cards.map((c: any) => lmPlaces(c.given)));
  const trayK = kind === "set" || kind === "pick";
  const zerosK = kind === "zeros";
  const ended = !free && !warm && (stage === "win" || stage === "idle");
  const tracing = !!tlTrace.busy;
  const live = (stage === "demo" || stage === "ask" || free) && !tracing;
  /* Count is a helper (its act counts the very places that decide the tray): at a question it comes only after the
     first miss or a press of the header's Hint key, and then stays for that question; in the warm-up it is the step */
  if (stage === "ask" && trayK && !st.helper) {
    let hinted = false;
    try {
      const g: any = (window as any).toolApi && (window as any).toolApi.getState();
      const rungs = [item.miss, ...((item.ladder || phase.ladder) || [])].filter(Boolean);
      hinted = !!(g && g.hint && g.hintKind === "hint" && rungs.some((r: string) => g.hint === r || g.hint === tx(r)));
    } catch (e) { hinted = false; }
    if (wrong || hinted) st.helper = true;
  }
  const countUI = trayK && !ended && (stage !== "ask" || !!st.helper);

  /* ── layout: the 900-wide room, placed once for this question ── */
  /* laid out for the open keypad on every question, so nothing moves when it opens (or is held open by the host) */
  const ox = 0;
  const nW = Math.max(...cards.map((c: any) => lmSplit(c.given).w.length)) + (zerosK ? 1 : 0);
  const nD = Math.max(1, zerosK || kind === "write" ? target : Math.max(...cards.map((c: any) => lmPlaces(c.given))));
  const cardW = G.pad + nW * G.cw + G.pw + nD * G.cw + 14 * K + G.cnt + 10 * K;
  /* a card counted alone (no controls, no acts on it) is drawn 1.5 times as big, centred: it is the whole picture */
  const CS = kind === "count" ? 1.5 : 1;
  const csAt = kind === "count" ? "translate(" + Math.round(ox + (G.room - cardW * CS) / 2) + ",96) scale(" + CS + ")" : undefined;
  const cardX = kind === "count" ? 0 : ox + 20;
  const top = kind === "count" ? 0 : kind === "write" ? 30 : p4 ? (count >= 3 ? 40 : 110) : count >= 3 ? (trayK ? 6 : 10) : count === 2 ? (trayK ? 30 : 40) : 60;
  const cardsY = cards.map((c: any, i: number) => top + i * (G.ch + G.gap));
  const cardsBottom = cardsY[count - 1] + G.ch;
  const pX = cardX + G.pad + nW * G.cw + G.pw / 2;            /* every point stands on this line */
  const wX = (j: number) => pX - G.pw / 2 - (j + 0.5) * G.cw;  /* the j-th digit left of the point (0 = ones) */
  const dX = (k: number) => pX + G.pw / 2 + (k + 0.5) * G.cw;  /* the k-th digit after the point */
  const cntX = pX + G.pw / 2 + nD * G.cw + 14 * K;
  /* the trays (phases 1-2), right of the cards */
  const trX = cardX + cardW + 24, trW = ox + 880 - trX;
  /* the trays: a label row with room for Devanagari, then one small card a row (three fit), 8 clear of the bottom */
  const TRAY: any = { like: { x: trX, y: 4, w: trW, h: 252, label: "Like decimals" }, unlike: { x: trX, y: 264, w: trW, h: 252, label: "Unlike decimals" } };
  const mW = trW - 24, mH = 58;
  /* the keys, the zero chips and the grid */
  const CB = { x: cardX + Math.round((cardW - 260) / 2), y: cardsBottom + 34, w: 260, h: 84 };
  /* the keys stand right of the "Added zero" caption, with room for a longer Hindi or Gujarati caption */
  /* phase 4: the chips, their caption and Point first stand in a column right of the cards; elsewhere along the foot */
  const p4W = G.pad + 2 * G.cw + G.pw + 3 * G.cw + 14 * K + G.cnt + 10 * K;
  const rcX = cardX + Math.max(cardW, p4W) + 24, rcW = ox + 880 - rcX;
  const PB = p4 ? { x: rcX + Math.round((rcW - 220) / 2), y: 370, w: 220, h: 84 } : { x: ox + 440, y: 420, w: 220, h: 84 };
  const NB = { x: ox + 672, y: 420, w: 208, h: 84 };
  const CHIP = p4 ? { x: rcX + Math.round((rcW - G.chipW) / 2), y: 90, w: G.chipW, h: G.chipH } : { x: cardX, y: 400, w: G.chipW, h: G.chipH };
  const chipC = { x: CHIP.x + CHIP.w / 2, y: CHIP.y + CHIP.h / 2 };
  const pointUI = zerosK && (n === 4 || free);
  const gridOn = (zerosK || kind === "write") && (n === 3 || free);
  const decW = Math.max(cardW, 380);
  const gs = Math.max(240, Math.min(free ? 340 : 380, ox + 880 - Math.max(cardX + cardW, kind === "write" ? cardX + decW : 0) - 36));
  const gx = ox + 880 - gs, gy = 16;

  /* what is drawn over the child's own work: a correction (st.demo) or, once answered, the answer worked */
  let won: any = null;
  if (ended) {
    if (kind === "count") won = { reveal: 9, tags: true, counts: true };
    else if (trayK) {
      const want = String(item.answer).split(", "), place: any = {};
      cards.forEach((c: any) => { place[c.id] = kind === "set" ? item.answer : want.includes(c.given) ? "like" : st.place[c.id] === "like" ? "col" : st.place[c.id]; });
      won = { place, solid: true, counts: true };
    } else if (zerosK) won = { forms: String(item.answer).split(", ") };
    else if (kind === "write") won = { forms: [item.answer.join(".")], digits: item.answer };
  }
  const writeDemo = kind === "write" && st.demo && typed !== st.missTyped && !tracing ? null : st.demo;
  const D: any = won || writeDemo;
  const formOf = (c: any, i: number) => (D && D.forms ? D.forms[i] : st.temp && st.temp.id === c.id ? st.temp.form : c.form);
  const placeOf = (c: any) => (D && D.solid ? D.place[c.id] : st.place[c.id]);
  const ghostTo = (c: any) => (D && D.place && !D.solid && D.place[c.id] !== st.place[c.id] ? D.place[c.id] : null);
  const slotIn = (t: string) => cards.filter((c: any) => placeOf(c) === t || ghostTo(c) === t);
  const slotXY = (t: string, j: number) => ({ x: TRAY[t].x + 12, y: TRAY[t].y + 56 + j * (mH + 4) });
  const miniAt = (t: string, c: any) => slotXY(t, Math.max(0, slotIn(t).indexOf(c)));
  const miniC = (t: string, c: any) => { const m = miniAt(t, c); return { x: m.x + mW / 2, y: m.y + mH / 2 }; };
  const countsOn = zerosK || kind === "write" || !!(D && D.counts) || st.counted;
  const litOf = (i: number, k: number) => (D && D.reveal !== undefined ? k < D.reveal : st.counted || st.lit.includes(i + ":" + k));
  const fadeNow = D && D.fade !== undefined ? D.fade : st.fade;

  /* ── the acts (each clears a correction that stands) ── */
  const report = (name: string) => { if (stage === "demo") api.did(name); };
  /* during a guide step only the awaited act is performed; any other is reported, so its hint shows */
  const demoGate = (on: string) => { if (stage === "demo" && on !== stepOn) { api.did(on); return true; } return false; };
  const runAct = async (o: any) => {
    playing.current = true; bump((k: number) => k + 1);
    let ok = false;
    try { ok = await api.act(o); } finally { playing.current = false; bump((k: number) => k + 1); }
    return ok;
  };
  const shake = () => tlShake.run([[70, () => put({ sh: 1 })], [70, () => put({ sh: -1 })], [70, () => put({ sh: 1 })], [10, () => put({ sh: 0 })]]);
  const short = (q: any) => !lmSplit(q.form).pt || lmPlaces(q.form) < target;
  const addEnd = (id: string) => {
    const s = S.current;
    const cs = s.cards.map((q: any) => (q.id === id && lmSplit(q.form).pt ? { ...q, form: q.form + "0" } : q));
    const k = cs.findIndex((q: any) => q.id === id);
    let sel = s.sel;
    if (k >= 0 && !short(cs[k])) {
      const next = [...cs.slice(k + 1), ...cs.slice(0, k)].find((q: any) => short(q));
      if (next) sel = next.id;
    }
    put({ temp: null, cards: cs, sel });
    api.sfx.settle();
    shake();
  };
  /* the board is plainly done when every card has its places (Enter may then answer from a piece) */
  const allDone = () => S.current.cards.every((q: any) => !short(q));
  /* the 1.3 s an inside drop shows what it did, and the slide after it: nothing else acts */
  const sliding = () => !!(S.current.temp && S.current.temp.inside);
  const commitTemp = () => {
    const t = S.current.temp;
    if (!t) return;
    tlFx.stop();
    if (t.inside) { addEnd(t.id); report("zero"); } else put({ temp: null });
  };
  /* the zero dropped inside: the digits close up again and the hand slides the zero to the end, where it settles */
  const slideEnd = async () => {
    const t = S.current.temp;
    if (!t || !t.inside) return;
    put({ temp: null });
    const c = S.current.cards[t.i];
    if (!c) return;
    const cell = (
      <g>
        <rect x={-G.cw / 2 + 2} y={-G.ch / 2 + 10 * K} width={G.cw - 4} height={G.ch - 20 * K} rx={8} fill={violetTint} stroke={violet} strokeWidth={2} />
        <text y={26 * K} textAnchor="middle" fontSize={FD} fontWeight={700} fill={violetInk}>0</text>
      </g>
    );
    const ok = await runAct({ tool: "hand", moves: "push", from: { x: t.gx, y: cardsY[t.i] + G.ch / 2 }, at: [endOf(c, t.i)], hold: cell });
    if (!ok) return;
    addEnd(t.id);
    report("zero");
  };
  /* a wrong act's one sentence at a question, printed on the bubble in the question's place; the child's next act puts
     the question back (the runtime has no hook for a tool's own hint during a question, so this is a printed line) */
  const tells = stage === "ask" || stage === "demo" || free;
  const tellInside = () => { if (!tells) return; api.say("A zero inside the decimal moves its digits."); S.current.told = true; };
  const tellFull = () => { if (!tells) return; api.say("This card already has enough places."); S.current.told = true; };
  const tellWhole = () => { if (!tells) return; api.say("A zero goes after the last digit, not before the point."); S.current.told = true; };
  const tellCards = () => { api.say("Drag the cards to the trays first."); S.current.told = true; };
  const tellZeros = () => { api.say("Add zeros first."); S.current.told = true; };
  const tellPoint = () => { api.say("Write the point and the zeros first."); S.current.told = true; };
  const untell = () => {
    if (!S.current.told) return;
    S.current.told = false;
    if (stage === "ask") api.say(item.say);
    else if (stage === "demo" && phase.steps && phase.steps[step || 0]) api.say(phase.steps[step || 0].say);
    else if (free) api.say(FREE_LINE);
  };
  const endOf = (c: any, i: number) => ({ x: lmSplit(c.form).pt ? dX(lmPlaces(c.form)) : pX, y: cardsY[i] + G.ch / 2 });

  const doCount = async () => {
    if (demoGate("count") || !live || playing.current) return;
    const s = S.current;
    if (s.counted) { report("count"); return; }
    untell();
    const pts: any[] = [];
    s.cards.forEach((c: any, i: number) => {
      const where = s.place[c.id];
      for (let k = 0; k < lmPlaces(c.form); k++) {
        const q = where === "col" ? { x: dX(k), y: cardsY[i] + G.ch / 2 } : miniC(where, c);
        pts.push({ x: q.x, y: q.y, key: i + ":" + k });
      }
    });
    put({ fade: true, lit: [], demo: null, touched: true });
    const ok = await runAct({ tool: "hand", moves: "tap", at: pts.map((q: any) => ({ x: q.x, y: q.y })),
      onPoint: (j: number) => { if (pts[j]) put({ lit: [...S.current.lit, pts[j].key] }); } });
    if (!ok) { put({ fade: false, lit: [] }); return; }
    put({ counted: true, fade: false });
    api.sfx.settle();
    report("count");
    if (stage !== "demo") refocus(["card-1"]);
  };
  const movePlace = (id: string, to: string) => {
    const place = { ...S.current.place };
    if (kind === "set") Object.keys(place).forEach((k) => { place[k] = to; }); else place[id] = to;
    put({ place, demo: null, touched: true });
    api.sfx.tick();
  };
  const tapCard = async (i: number) => {
    const c = S.current.cards[i];
    if (!c) return;
    if (stage === "demo") { api.did("card-" + (i + 1)); return; }
    if (!live || playing.current) return;
    untell();
    const cur = S.current.place[c.id];
    const to = cur === "like" ? "unlike" : "like";
    const from = cur === "col" ? { x: cardX + cardW / 2, y: cardsY[i] + G.ch / 2 } : miniC(cur, c);
    const lands = cards.filter((q: any) => q === c || (kind === "set" ? true : st.place[q.id] === to));
    const j = Math.max(0, lands.indexOf(c));
    const sl = slotXY(to, j), dest = { x: sl.x + mW / 2, y: sl.y + mH / 2 };
    put({ travel: kind === "set" ? "all" : c.id, demo: null, touched: true });
    const ok = await runAct({ tool: "hand", moves: "carry", from, at: [dest], hold: <g>{mini(-mW / 2, -mH / 2, c, false)}</g> });
    put({ travel: null });
    if (!ok) return;
    movePlace(c.id, to);
    refocus(["card-" + (i + 1)]);
  };
  const dropZero = (id: string, gap: any) => {
    const s = S.current, c = s.cards.find((q: any) => q.id === id);
    if (!c) return;
    const sp = lmSplit(c.form);
    put({ demo: null, touched: true });
    if (!sp.pt) {
      /* straight onto a whole number: the card jumps to ten times as big (5 to 50), and the chip slides off */
      put({ temp: { id, form: sp.w + "0", jump: true } });
      api.sfx.tick();
      tlFx.run([[1500, null], [10, () => put({ temp: null, pulse: pointUI ? "point" : null })], [1600, null], [10, () => put({ pulse: null })]]);
      report("zero");
      return;
    }
    if (gap === "whole") {
      /* before the point of a decimal: no claim about its size, the chip goes straight back */
      quietClick.current = Date.now();
      tellWhole();
      return;
    }
    if (lmPlaces(c.form) >= target) {
      /* this card already has the places it needs: its count lights and the chip goes back */
      put({ full: id });
      tlFx.run([[1300, null], [10, () => put({ full: null })]]);
      quietClick.current = Date.now();
      tellFull();
      return;
    }
    if (gap !== "end" && gap < sp.d.length && !/^0*$/.test(sp.d.slice(gap))) {
      /* inside the decimal (before a digit that is not an added zero): it shows what that spot does to the digits and
         the shading for 1.3 s, then the hand slides the zero to the end, where it settles (the brief) */
      const i = s.cards.indexOf(c);
      quietClick.current = Date.now();
      put({ temp: { id, i, form: sp.w + "." + sp.d.slice(0, gap) + "0" + sp.d.slice(gap), inside: true, gx: pX + G.pw / 2 + gap * G.cw }, sel: id });
      api.sfx.tick();
      shake();
      tlFx.run([[1300, null], [10, () => { slideEnd(); }]]);
      tellInside();
      return;
    }
    /* at the end, or between the last digit and a zero already added (3.80 to 3.800): the same zero at the end */
    put({ sel: id });   /* only a zero that lands makes its card the chosen one */
    addEnd(id);
    report("zero");
  };
  const chipTap = async () => {
    if (demoGate("zero") || !live || playing.current || sliding()) return;
    commitTemp(); untell();
    const s = S.current;
    const i = Math.max(0, s.cards.findIndex((q: any) => q.id === s.sel));
    const c = s.cards[i];
    const ok = await runAct({ tool: "hand", moves: "carry", from: chipC, at: [endOf(c, i)], hold: <g>{chipFace(-G.chipW / 2, -G.chipH / 2, true)}</g> });
    if (!ok) return;
    dropZero(c.id, "end");
    const sc = S.current.cards.find((q: any) => q.id === S.current.sel);
    refocus(pointUI && sc && !lmSplit(sc.form).pt ? ["point", "zero"] : ["zero"]);
  };
  const pointFirst = async () => {
    if (demoGate("point") || !live || playing.current || sliding()) return;
    commitTemp(); untell();
    const s = S.current;
    let i = s.cards.findIndex((q: any) => q.id === s.sel && !lmSplit(q.form).pt);
    if (i < 0) i = s.cards.findIndex((q: any) => !lmSplit(q.form).pt);
    if (i < 0) return;
    const c = s.cards[i], y = cardsY[i] + G.ch * 0.62;
    const ok = await runAct({ tool: "pencil", moves: "draw", from: { x: pX - 22, y: y - 40 }, at: [{ x: pX, y }], to: { x: pX + 10, y: y + 6 } });
    if (!ok) return;
    const s2 = S.current;
    put({ cards: s2.cards.map((q: any) => (q.id === c.id ? { ...q, form: q.form + "." } : q)), sel: c.id, pulse: null, demo: null, touched: true });
    api.sfx.tick();
    report("point");
    refocus(["point", "zero"]);
  };
  const newSet = () => { if (!free) return; put({ set: (setNo + 1) % LM_FREE_SETS.length }); api.sfx.tick(); };
  const selectCard = (i: number) => {
    if (stage === "demo") { api.did("card-" + (i + 1)); return; }
    if (!live || sliding()) return;
    commitTemp(); untell();
    put({ sel: S.current.cards[i].id, demo: null });
  };
  const act = (on: any) => { if (on === "count") doCount(); else if (on === "zero") chipTap(); else if (on === "point") pointFirst(); };
  /* 400 ms: one tap or one Enter never also does the next act */
  const pressKey = (fn: () => void) => { const t = Date.now(); if (t - lastKey.current < 400) return; lastKey.current = t; fn(); };
  /* when an act resolves, keyboard focus goes back to the control that started it, else the next live one */
  const refocus = (ids: string[]) => {
    setTimeout(() => {
      try {
        for (const id of ids) {
          const el: any = document.querySelector('[data-zone="work"] [data-control="' + id + '"]');
          if (el && el.getAttribute("aria-disabled") !== "true" && el.tabIndex >= 0) { el.focus({ preventScroll: true }); return; }
        }
      } catch (e) { /* no page to focus in */ }
    }, 40);
  };

  const trayAt = (p: any) => {
    for (const t of ["like", "unlike"]) {
      const b = TRAY[t];
      if (p.x >= b.x - 10 && p.x <= b.x + b.w + 10 && p.y >= b.y - 10 && p.y <= b.y + b.h + 10) return t;
    }
    return "col";
  };
  const cardUnder = (p: any) => {
    const k = cardsY.findIndex((y: number) => p.x >= cardX - 20 && p.x <= cardX + cardW + 20 && p.y >= y - 16 && p.y <= y + G.ch + 16);
    return k < 0 ? null : cards[k].id;
  };
  const gapAt = (id: string, x: number) => {
    const c = S.current.cards.find((q: any) => q.id === id), sp = lmSplit(c.form);
    if (x < pX - G.pw / 2 - 4) return "whole";
    if (!sp.pt) return "end";
    return Math.max(0, Math.min(sp.d.length, Math.round((x - pX - G.pw / 2) / G.cw)));
  };

  const lastTap = useRef<any>({ id: "", t: 0 });
  const drag = useDrag((p: any, at: any, moved: boolean) => {
    if (!moved) {
      /* a second tap on the same piece within 350 ms is one tap */
      const id = p.t + (p.id || ""), t = Date.now();
      if (lastTap.current.id === id && t - lastTap.current.t < 350) return;
      lastTap.current = { id, t };
    }
    if (p.t === "chip") {
      if (!moved) { chipTap(); return; }
      if (demoGate("zero") || !live || playing.current || sliding()) return;
      commitTemp(); untell();
      const id = cardUnder(at);
      if (!id) { report("zero-off"); return; }
      dropZero(id, gapAt(id, at.x));
      return;
    }
    if (p.t === "card") {
      const i = S.current.cards.findIndex((q: any) => q.id === p.id);
      if (!moved) { tapCard(i); return; }
      if (stage === "demo") { api.did("card-" + (i + 1)); return; }
      if (!live || playing.current) return;
      untell();
      movePlace(p.id, trayAt(at));
    }
  });
  /* Enter or Space on a focused piece is a tap (the act gives the focus back to it when it ends). A card always taps: it
     goes to the other tray (first Like, then Unlike, then Like), so the keyboard reaches both. The chip lets Enter pass to
     the window, to answer, only once every card has its places (PATTERNS §5b); before that Enter adds a zero */
  const keysOf = (p: any) => {
    const k: any = drag.keys(p);
    return { ...k, onKeyDown: (e: any) => {
      if (e.key === "Enter" && p.t === "chip" && stage === "ask" && !free && item.pad === "enter" && allDone() && !sliding()) return;
      k.onKeyDown(e);
    } };
  };

  /* the answer made on the working area; null = nothing to send yet */
  const workValue = () => {
    const s = S.current;
    if (kind === "set") { const ps = s.cards.map((c: any) => s.place[c.id]); return ps.every((q: string) => q === ps[0]) && ps[0] !== "col" ? ps[0] : null; }
    if (kind === "pick") { const l = s.cards.filter((c: any) => s.place[c.id] === "like").map((c: any) => c.given); return l.length >= 2 ? l.join(", ") : null; }
    if (kind === "zeros") return s.cards.some((c: any) => c.form !== c.given) ? s.cards.map((c: any) => c.form).join(", ") : null;
    return null;
  };
  const boardAnswer = stage === "ask" && !free && item.pad === "enter";
  const wv = boardAnswer ? workValue() : null;
  const ready = wv !== null && wv !== st.missVal && !st.temp;
  /* Enter sends the work, never the work that has just been judged (a bare Enter after a miss does nothing) */
  const sendWork = () => {
    if (!boardAnswer || tracing || playing.current || sliding()) return;
    commitTemp();
    const v = workValue();
    if (v === null) {
      if (trayK) tellCards();
      else if (n === 4) tellPoint();
      else tellZeros();
      return;
    }
    if (v === S.current.missVal) return;
    S.current.told = false;   /* the answer's own line (a hint or the win) follows */
    api.submit(v);
  };
  useEffect(() => { if (boardAnswer) api.answerReady(ready); }, [ready, boardAnswer, boardKey]);
  /* Enter (and the agent's check, the dev solve) performs the current step, or sends the board's answer; two Enters
     within 400 ms are one */
  api.onEnter(stage === "demo" && stepOn ? () => pressKey(() => act(stepOn)) : boardAnswer ? () => pressKey(() => sendWork()) : null);
  /* a right answer's own line (the runtime puts the phase's closing in its place at the phase's last question) */
  useEffect(() => { if (stage === "win" && !free && item && item.win) api.say(item.win); }, [stage, n, index]);

  HOOK.set = (v: any) => {
    const s = S.current;
    if (kind === "set") {
      const t = String(v ?? "").toLowerCase();
      if (t !== "like" && t !== "unlike") return false;
      const place: any = {};
      s.cards.forEach((c: any) => { place[c.id] = t; });
      put({ place, demo: null, touched: true });
      return true;
    }
    if (kind === "pick") {
      const want = lmNorm(v).split(", ");
      if (!want.every((w: string) => s.cards.some((c: any) => c.given === w))) return false;
      const place: any = {};
      s.cards.forEach((c: any) => { place[c.id] = want.includes(c.given) ? "like" : "col"; });
      put({ place, demo: null, touched: true });
      return true;
    }
    if (kind === "zeros") {
      /* only a form a child can make here: the same whole part, a point added to a whole number, zeros after the
         given digits, up to the places the longest card has */
      const fs = lmNorm(v).split(", ");
      const reach = (g: string, f: string) => {
        const a = lmSplit(g), b = lmSplit(f);
        return /^\d+(\.\d*)?$/.test(f) && b.w === a.w && (b.pt || !a.pt) && b.d.startsWith(a.d) && !/[^0]/.test(b.d.slice(a.d.length)) && b.d.length <= Math.max(target, a.d.length);
      };
      if (fs.length !== s.cards.length || !fs.every((f: string, i: number) => reach(s.cards[i].given, f))) return false;
      put({ cards: s.cards.map((c: any, i: number) => ({ ...c, form: fs[i] })), demo: null, temp: null, touched: true });
      return true;
    }
    return false;
  };
  HOOK.demo = () => act(stepOn);

  /* the traceback: lock, redraw the maths in steps on S.demo, end on the whole right answer, unlock */
  const traceSteps = (v: string) => {
    const s = S.current, steps: any[] = [];
    const setD = (o: any) => () => put({ demo: { ...(S.current.demo || {}), ...o } });
    if (trayK || kind === "count") {
      const maxP = Math.max(...s.cards.map((c: any) => lmPlaces(c.given)));
      steps.push([300, setD({ fade: true, reveal: 0, tags: kind === "count" })]);
      for (let k = 1; k <= maxP; k++) steps.push([420, setD({ reveal: k })]);
      steps.push([300, setD({ counts: true })]);
      if (trayK) {
        const want = String(item.answer).split(", "), place: any = {};
        s.cards.forEach((c: any) => { place[c.id] = kind === "set" ? item.answer : want.includes(c.given) ? "like" : "col"; });
        steps.push([700, setD({ place })]);
      }
    } else {
      const to = kind === "write" ? [item.answer.join(".")] : String(item.answer).split(", ");
      const got = String(v).split(/\s*,\s*/);
      const from = kind !== "write" && got.length === s.cards.length ? got : s.cards.map((c: any) => c.form);
      const paths = s.cards.map((c: any, i: number) => lmPath(c.given, from[i], to[i]));
      const L = Math.max(...paths.map((q: string[]) => q.length));
      const focus = Math.max(0, s.cards.findIndex((c: any, i: number) => to[i] !== c.given));
      for (let k = 0; k < L; k++) {
        steps.push([k === 0 ? 700 : 520, () => {
          put({ demo: { forms: paths.map((q: string[]) => q[Math.min(k, q.length - 1)]), sel: s.cards[focus].id, digits: kind === "write" && k === L - 1 ? item.answer : null } });
          if (k > 0) shake();
        }]);
      }
    }
    steps.push([200, null]);
    return steps;
  };
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    S.current.missVal = String(wrong.value);
    S.current.missTyped = typed;
    commitTemp(); S.current.told = false;   /* never print over the miss's hint */
    api.lock(true);
    tlTrace.run(traceSteps(String(wrong.value)), () => api.lock(false));
  }, [wrong]);

  /* what the host and the agent read back (toolApi.getState); no count before it is the child's */
  api.share({
    phase: n,
    cards: cards.map((c: any) => c.form),
    places: (kind === "count" && !ended) || (trayK && !st.counted && !ended) ? null : cards.map((c: any) => lmPlaces(c.form)),
    trays: trayK ? { ...st.place } : null,
    zeros: cards.reduce((a: number, c: any) => a + lmView(c.given, c.form).dec.filter((d: any) => d.added).length, 0),
    point: cards.some((c: any) => !lmSplit(c.given).pt && lmSplit(c.form).pt),
    answer: ended ? item.answer : null,
    complete: stage === "idle",
  });

  /* ── drawing (helpers are called, never mounted) ── */
  const dragging = drag.drag;
  if (!dragging) dragFrom.current = null; else if (!dragFrom.current) dragFrom.current = { x: dragging.x, y: dragging.y };
  const ddx = dragging ? dragging.x - dragFrom.current.x : 0, ddy = dragging ? dragging.y - dragFrom.current.y : 0;
  const movingCard = (c: any) => !!(dragging && dragging.payload.t === "card" && (kind === "set" || dragging.payload.id === c.id));
  const chipDrag = !!(dragging && dragging.payload.t === "chip");
  const travelling = (c: any) => st.travel === "all" || st.travel === c.id;

  function face(x: number, y: number, c: any, i: number, o: any) {
    const v = lmView(c.given, o.form);
    const by = y + G.ch * 0.74, nWh = v.whole.length, m = 10 * K;
    const times = lmTimes(c.given, o.form);
    let lastNZ = -1;
    v.dec.forEach((d: any, k: number) => { if (!d.added && d.c !== "0") lastNZ = k; });
    const plc = v.dec.length;
    return (
      <g>
        <rect x={x} y={y} width={cardW} height={G.ch} rx={16} fill="#FFFFFF" stroke={o.edge || C.rule} strokeWidth={o.edge ? 4 : 2} filter="url(#fShadowSoft)" />
        {v.dec.map((d: any, k: number) => (o.lit(k) ? <rect key={"l" + k} x={dX(k) - G.cw / 2 + 2} y={y + m} width={G.cw - 4} height={G.ch - 2 * m} rx={8} fill={amberTint} />
          : d.added ? <rect key={"z" + k} x={dX(k) - G.cw / 2 + 2} y={y + m} width={G.cw - 4} height={G.ch - 2 * m} rx={8} fill={violetTint} stroke={violet} strokeWidth={2} strokeDasharray={o.ghost ? "6 5" : undefined} /> : null))}
        {v.whole.map((d: any, k: number) => (d.added ? <rect key={"wz" + k} x={wX(nWh - 1 - k) - G.cw / 2 + 2} y={y + m} width={G.cw - 4} height={G.ch - 2 * m} rx={8} fill={violetTint} stroke={violet} strokeWidth={2} /> : null))}
        {v.whole.map((d: any, k: number) => (
          <text key={"w" + k} x={wX(nWh - 1 - k)} y={by} textAnchor="middle" fontSize={FD} fontWeight={700}
            fill={d.added ? violetInk : d.c === "0" && nWh === 1 ? (o.fade ? greyFade : greyZero) : o.fade ? blueFade : blueInk}>{d.c}</text>
        ))}
        {v.point && <text x={pX} y={by} textAnchor="middle" fontSize={FD} fontWeight={800} fill={v.point === "added" ? violetInk : C.ink}>.</text>}
        {v.dec.map((d: any, k: number) => (
          <text key={"d" + k} x={dX(k)} y={by} textAnchor="middle" fontSize={FD} fontWeight={700}
            fill={d.added ? violetInk : d.c === "0" && k < lastNZ ? greyZero : blueInk}>{d.c}</text>
        ))}
        {o.count && !times && (
          <g>
            {o.full && <rect x={cntX - 8} y={y + G.ch / 2 - 24 * K} width={G.cnt - 2} height={48 * K} rx={10} fill={amberTint} />}
            <text x={cntX} y={y + G.ch * 0.62} fontSize={FC} fontWeight={700} fill={o.countInk}>{tx(lmPlacesText(plc))}</text>
          </g>
        )}
        {/* a zero stuck onto a whole number: in this card's own row, right of the number, what it became and how big */}
        {times && (() => {
          const wd = wordsIn(Number(o.form), lang), room = x + cardW - (pX + 22) - 12;
          const fs = Math.max(28, Math.min(T.label, room / (Math.max(wd.length, 8) * 0.56)));
          return (
            <g pointerEvents="none">
              <text x={pX + 22} y={y + G.ch * 0.42} fontSize={fs} fontWeight={700} fill={violetInk}>{wd}</text>
              <text x={pX + 22} y={y + G.ch * 0.8} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(times)}</text>
            </g>
          );
        })()}
        {o.tags && v.dec.map((d: any, k: number) => (o.lit(k) ? (
          <text key={"g" + k} x={dX(k)} y={y + G.ch + 42} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={amberInk}>{String(k + 1)}</text>
        ) : null))}
      </g>
    );
  }
  function mini(x: number, y: number, c: any, ghost: boolean) {
    return (
      <g>
        <rect x={x} y={y} width={mW} height={mH} rx={12} fill="#FFFFFF" stroke={ghost ? greenInk : C.rule} strokeWidth={ghost ? 3 : 2}
          strokeDasharray={ghost ? "8 6" : undefined} filter={ghost ? undefined : "url(#fShadowSoft)"} />
        <text x={x + (countsOn ? (mW - 60) / 2 + 4 : mW / 2)} y={y + mH / 2 + 19} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={blueInk}>{c.given}</text>
        {/* its count of places, as a badge: the number is the label */}
        {countsOn && (
          <g>
            <circle cx={x + mW - 34} cy={y + mH / 2} r={23} fill={amberTint} stroke={amberInk} strokeWidth={2} />
            <text x={x + mW - 34} y={y + mH / 2 + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={amberInk}>{String(lmPlaces(c.given))}</text>
          </g>
        )}
      </g>
    );
  }
  function chipFace(x: number, y: number, lifted: boolean, blank?: boolean) {
    return (
      <g>
        <rect x={x} y={y} width={G.chipW} height={G.chipH} rx={18} fill={violetTint} stroke={violetInk} strokeWidth={3} filter={lifted ? "url(#fLift)" : "url(#fShadowSoft)"} />
        {!blank && <text x={x + G.chipW / 2} y={y + 72} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={violetInk}>0</text>}
      </g>
    );
  }
  /* the grid of the digits after the point: tenths as 10 columns, hundredths as 100 boxes (each with a dark
     outline), thousandths as finer lines inside them; the shaded part never moves as zeros are added */
  function grid(form: string) {
    const sp = lmSplit(form), lv = Math.max(1, Math.min(3, sp.d.length));
    const dg = (sp.d + "000").split("").map(Number), col = gs / 10, x = gx, y = gy;
    const t1 = dg[0], h1 = lv >= 2 ? dg[1] : 0, th = lv >= 3 ? dg[2] : 0;
    const deep = mix(blue, "#FFFFFF", 0.35);
    let lines = "";
    for (let k = 1; k < 10; k++) lines += "M" + (x + k * col) + " " + y + "V" + (y + gs);
    if (lv >= 2) for (let k = 1; k < 10; k++) lines += "M" + x + " " + (y + k * col) + "H" + (x + gs);
    let fine = "";
    if (lv >= 3) for (let a = 0; a < 10; a++) for (let k = 1; k < 10; k++) fine += "M" + (x + a * col + (k * col) / 10) + " " + y + "V" + (y + gs);
    const cx = x + gs / 2, cy = y + gs / 2;
    return (
      <g pointerEvents="none" transform={st.sh ? "rotate(" + st.sh * 1.2 + "," + cx + "," + cy + ")" : undefined}>
        <rect x={x} y={y} width={gs} height={gs} fill="#FFFFFF" />
        {t1 > 0 && <rect x={x} y={y} width={t1 * col} height={gs} fill={deep} />}
        {h1 > 0 && <rect x={x + t1 * col} y={y} width={col} height={h1 * col} fill={deep} />}
        {th > 0 && <rect x={x + t1 * col} y={y + h1 * col} width={(th * col) / 10} height={col} fill={deep} />}
        {fine && st.sh !== 0 && <path d={fine} stroke={mix(C.ink, "#FFFFFF", 0.82)} strokeWidth={0.7} fill="none" />}
        <path d={lines} stroke={C.ink} strokeWidth={2.4} fill="none" />
        <rect x={x} y={y} width={gs} height={gs} fill="none" stroke={C.ink} strokeWidth={4.5} />
        <text x={cx} y={y + gs + 50} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("after the point")}</text>
      </g>
    );
  }
  function decCard() {
    const x = cardX, y = 176, w = decW, h = 132;
    const ww = Math.round((w - 36 - 44) * 0.42);
    const wb = { x: x + 18, y: y + 16, w: ww, h: h - 32 }, db = { x: wb.x + ww + 44, y: y + 16, w: x + w - 18 - (wb.x + ww + 44), h: h - 32 };
    const open = !!(box && box.open);
    const demoOn = !!(D && D.digits);
    const ps: string[] = demoOn ? D.digits.map(String) : slotPartsOf(typed, 2).map((q: any) => (q === null || q === undefined ? "" : String(q)));
    const fs = Math.min(T.display, Math.floor(Math.min(wb.w / Math.max(1, ps[0].length), db.w / Math.max(1, ps[1].length)) / 0.66));
    const asking = stage === "ask" && answerOn === "card" && !tracing;
    const activeJ = open && asking && !demoOn ? (part || 0) : -1;
    const boxEl = (b: any, j: number, s: string) => (
      <g key={"db" + j}>
        <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={12} fill="#FFFFFF" stroke={j === activeJ ? C.accent : C.ink} strokeWidth={j === activeJ ? 4.5 : 2.5} />
        {s && <text x={b.x + b.w / 2} y={b.y + b.h / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill={demoOn ? greenInk : blueInk}>{s}</text>}
        {j === activeJ && <rect x={b.x + b.w / 2 + s.length * fs * 0.31 + 6} y={b.y + 18} width={4} height={b.h - 36} fill={C.accent} />}
      </g>
    );
    return (
      <g>
        <rect x={x} y={y} width={w} height={h} rx={18} fill={tint(C.panel, 0.4)} stroke={C.ink} strokeWidth={3} filter="url(#fShadowSoft)" />
        {boxEl(wb, 0, ps[0])}
        <circle cx={wb.x + ww + 22} cy={wb.y + wb.h - 22} r={8} fill={C.ink} />
        {boxEl(db, 1, ps[1])}
        {asking && !open && (
          <g>
            <BlinkRing x={x} y={y} w={w} h={h} rx={18} C={C} />
            <SlotPartBox id="answer-open" label={tx("Decimal card")} x={x} y={y} w={w} h={h} enabled onPick={api.openAnswer} />
          </g>
        )}
        {asking && open && [wb, db].map((b: any, j: number) => (
          <SlotPartBox key={"pp" + j} id={"part-" + (j + 1)} label={tx(j ? "decimal part" : "whole part")} x={b.x} y={b.y} w={b.w} h={b.h} on={part === j} enabled onPick={() => api.pickPart(j)} />
        ))}
      </g>
    );
  }
  function keyBtn(id: string, label: string, b: any, onTap: () => void, enabled: boolean) {
    return (
      <Key key={"key-" + id} id={id} label={tx(label)} x={b.x} y={b.y} w={b.w} h={b.h} C={C} tone="key" disabled={!enabled} onClick={() => pressKey(onTap)}>
        <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={enabled ? toneInk("key", C.ink) : mix(C.ink, C.panel, 0.3)}>{tx(label)}</text>
      </Key>
    );
  }

  /* the card a zero would change: the grid follows it */
  const selId = D && D.sel ? D.sel : st.sel;
  const selIdx = Math.max(0, cards.findIndex((c: any) => c.id === selId));
  /* a card that a zero stuck onto its whole part (or the correction) has made ten times as big */
  const jumpIdx = cards.findIndex((c: any, i: number) => !!lmTimes(c.given, formOf(c, i)));
  const noPoint = cards.some((c: any) => !lmSplit(c.form).pt);
  const showChips = zerosK && !ended;
  const chipLive = live && showChips;

  /* the one invite */
  let inv: any = null;
  const ctr = (b: any, rx: number = RAD.key) => ({ x: b.x + b.w / 2, y: b.y + b.h / 2, w: b.w, h: b.h, rx });
  if (st.pulse === "point" && pointUI) inv = ctr(PB);
  else if (stage === "demo" && stepOn && !playing.current) inv = stepOn === "count" ? ctr(CB) : stepOn === "zero" ? ctr(CHIP, 18) : stepOn === "point" ? ctr(PB) : null;
  else if (stage === "ask" && !free && live && !st.demo && !playing.current) {
    if (countUI && !st.counted) inv = ctr(CB);
    else if (!st.touched) inv = trayK ? ctr({ x: cardX, y: cardsY[0], w: cardW, h: G.ch }, 16) : zerosK ? ctr(CHIP, 18) : null;
  }

  const hotTray = dragging && dragging.payload.t === "card" && dragging.moved ? trayAt(dragging) : null;
  const okTray = (t: string) => (ended && slotIn(t).length > 0 && (kind === "set" ? D.place[cards[0].id] === t : t === "like")) || !!(D && D.place && !D.solid && cards.some((c: any) => ghostTo(c) === t));

  return (
    <g onClickCapture={(e: any) => { if (Date.now() - quietClick.current < 400) e.stopPropagation(); }}>
      {/* the trays (phases 1-2) */}
      {trayK && ["like", "unlike"].map((t: string) => {
        const b = TRAY[t];
        return (
          <g key={"tray-" + t}>
            <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={18} fill={tint(C.panel, 0.45)} stroke={hotTray === t ? C.accent : okTray(t) ? greenInk : C.rule} strokeWidth={hotTray === t || okTray(t) ? 4 : 2} />
            <text x={b.x + 18} y={b.y + 42} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(b.label)}</text>
          </g>
        );
      })}
      {/* homes of cards that are on a tray, and the dashed line that keeps the points in one line */}
      {trayK && cards.map((c: any, i: number) => (placeOf(c) !== "col" ? (
        <rect key={"home" + c.id} x={cardX} y={cardsY[i]} width={cardW} height={G.ch} rx={16} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="10 8" />
      ) : null))}
      {!trayK && count > 1 && <line x1={pX} y1={cardsY[0] - 8} x2={pX} y2={cardsBottom + 8} stroke={C.rule} strokeWidth={2} strokeDasharray="4 6" pointerEvents="none" />}

      {/* the cards: in phases 1-2 the drag pieces (a small card on a tray) */}
      <g transform={csAt}>
      {cards.map((c: any, i: number) => {
        const where = placeOf(c);
        const at = where === "col" ? { x: cardX, y: cardsY[i] } : miniAt(where, c);
        const grab = trayK && !ended && (stage === "demo" || live);
        const props = grab ? { ...control("card-" + (i + 1), tx("card") + " " + c.given), ...drag.bind({ t: "card", id: c.id }), ...keysOf({ t: "card", id: c.id }) } : {};
        const quiet = movingCard(c) || travelling(c);
        const full = st.full === c.id;
        const edge = full ? amberInk : !trayK && !ended && count > 1 && c.id === selId ? amber : null;
        const countInk = ended ? greenInk : amberInk;
        return (
          <g key={c.id} {...props}>
            {quiet ? (where === "col" ? <rect x={at.x} y={at.y} width={cardW} height={G.ch} rx={16} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="10 8" />
              : <rect x={at.x} y={at.y} width={mW} height={mH} rx={12} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="8 6" />)
              : where === "col" ? face(at.x, at.y, c, i, { form: formOf(c, i), count: countsOn, countInk, full, fade: fadeNow, lit: (k: number) => (trayK || kind === "count") && litOf(i, k), tags: !!(D && D.tags), edge, ghost: !!(D && D.forms && !ended) })
              : mini(at.x, at.y, c, false)}
          </g>
        );
      })}
      </g>

      {/* phase 3 and Free play: the grid of the chosen card's digits after the point */}
      {gridOn && jumpIdx < 0 && (
        <g pointerEvents="none">
          <line x1={(kind === "write" ? cardX + cardW : cardX + cardW) + 4} y1={cardsY[selIdx] + G.ch / 2} x2={gx - 4} y2={gy + 40} stroke={amber} strokeWidth={3} />
          {grid(formOf(cards[selIdx], selIdx))}
        </g>
      )}

      {/* a question written on the Decimal card */}
      {kind === "write" && decCard()}

      {/* the zero chips, Point first, New set */}
      {showChips && (
        <g>
          {/* the whole pile is the one control: no inert edge of it hides under the top chip */}
          <g {...(chipLive || stage === "demo" ? { ...control("zero", tx("Added zero")), ...drag.bind({ t: "chip" }), ...keysOf({ t: "chip" }) } : {})}>
            {chipFace(CHIP.x, CHIP.y + 16, false, true)}
            {chipFace(CHIP.x, CHIP.y + 8, false, true)}
            {chipFace(CHIP.x, CHIP.y, false)}
          </g>
          {p4 ? <text x={CHIP.x + G.chipW / 2} y={CHIP.y + G.chipH + 66} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("Added zero")}</text>
            : <text x={CHIP.x + G.chipW + 34} y={CHIP.y + 60} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("Added zero")}</text>}
        </g>
      )}
      {countUI && keyBtn("count", "Count", CB, doCount, (live || stage === "demo") && !st.counted && !playing.current)}
      {pointUI && !ended && keyBtn("point", "Point first", PB, pointFirst, (live || stage === "demo") && noPoint && !playing.current)}
      {free && keyBtn("new-set", "New set", NB, newSet, live && !playing.current)}

      {/* a card chosen by a tap (the grid follows it, a tapped chip goes to its end) */}
      {zerosK && count > 1 && !ended && (live || stage === "demo") && cards.map((c: any, i: number) => (
        <Hit key={"pick" + c.id} id={"card-" + (i + 1)} x={cardX} y={cardsY[i]} w={cardW} h={G.ch} onPress={() => selectCard(i)} label={tx("card") + " " + c.form} />
      ))}

      {/* a correction that points at a tray: the right cards, dashed, where they belong */}
      {trayK && D && D.place && !D.solid && (
        <g pointerEvents="none">
          {cards.map((c: any, i: number) => {
            const t = ghostTo(c);
            if (!t) return null;
            if (t === "col") return <rect key={"ghost" + c.id} x={cardX} y={cardsY[i]} width={cardW} height={G.ch} rx={16} fill="none" stroke={greenInk} strokeWidth={3} strokeDasharray="8 6" />;
            const m = miniAt(t, c);
            return <g key={"ghost" + c.id}>{mini(m.x, m.y, c, true)}</g>;
          })}
        </g>
      )}

      {/* what is being dragged, on top */}
      {dragging && dragging.payload.t === "card" && (
        <g pointerEvents="none" filter="url(#fLift)">
          {cards.map((c: any, i: number) => {
            if (!movingCard(c)) return null;
            const where = placeOf(c);
            if (where === "col") return <g key={"drag" + c.id}>{face(cardX + ddx, cardsY[i] + ddy, c, i, { form: c.form, count: countsOn, countInk: amberInk, fade: false, lit: (k: number) => litOf(i, k), tags: false })}</g>;
            const m = miniAt(where, c);
            return <g key={"drag" + c.id}>{mini(m.x + ddx, m.y + ddy, c, false)}</g>;
          })}
        </g>
      )}
      {chipDrag && (() => {
        const id = cardUnder(dragging);
        const k = id ? cards.findIndex((c: any) => c.id === id) : -1;
        const gap = id ? gapAt(id, dragging.x) : null;
        const sp = k >= 0 ? lmSplit(cards[k].form) : null;
        const gxp = k < 0 ? 0 : gap === "whole" || !(sp as any).pt ? pX - G.pw / 2 : pX + G.pw / 2 + (gap as number) * G.cw;
        return (
          <g pointerEvents="none">
            {k >= 0 && <rect x={gxp - 3} y={cardsY[k] + 8} width={6} height={G.ch - 16} rx={3} fill={violetInk} />}
            {chipFace(CHIP.x + ddx, CHIP.y + ddy, true)}
          </g>
        );
      })()}

      {inv && <Invite x={inv.x} y={inv.y} w={inv.w} h={inv.h} rx={inv.rx} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase, scaled to the card */
function Thumb({ result, it, n, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const item: any = it || last.it || (((PHASES[(n || 1) - 1] || {}) as any).items || [])[last.item] || {};
  const v = last.value;
  if (item.kind === "set") {
    /* the set the child sorted: its decimals in one row, as big as the card's width allows (a digit about 0.6 em, a
       point 0.3), each with its count of places small under it */
    const cs: string[] = item.cards || [], gap = 14;
    const ems = cs.map((q: string) => q.replace(".", "").length * 0.6 + (q.includes(".") ? 0.3 : 0));
    const sum = ems.reduce((a: number, b: number) => a + b, 0) || 1;
    const fs = Math.max(16, Math.min(34, (w - 16 - (cs.length - 1) * gap) / sum, h * 0.5));
    const fc = Math.max(14, Math.min(20, h * 0.3));
    let xx = (w - (sum * fs + (cs.length - 1) * gap)) / 2;
    const xs = ems.map((e: number) => { const c = xx + (e * fs) / 2; xx += e * fs + gap; return c; });
    return (
      <g>
        <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
        {cs.map((q: string, j: number) => (
          <g key={"t" + j}>
            <text x={xs[j]} y={h * 0.54} textAnchor="middle" fontSize={fs} fontWeight={700} fill={shade(CONTENT.hundred, 0.25)}>{q}</text>
            <text x={xs[j]} y={h - 7} textAnchor="middle" fontSize={fc} fontWeight={700} fill={shade(CONTENT.ten, 0.45)}>{String(lmPlaces(q))}</text>
          </g>
        ))}
      </g>
    );
  }
  let text = "";
  let digits = true;
  if (item.kind === "count") { text = tx(lmPlacesText(Number(v))); digits = false; }
  else if (item.kind === "write") { const ps = slotPartsOf(v, 2); text = ps[0] + "." + ps[1]; }
  else if (item.kind === "pick") text = String(v);
  else { const f = String(v).split(/\s*,\s*/), ch = f.filter((x: string, i: number) => x !== (item.cards || [])[i]); text = (ch.length ? ch : f).join(", "); }
  const fs = Math.max(16, Math.min(T.label, (h - 16) * 0.62, (w - 24) / (Math.max(1, text.length) * 0.6)));
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <text x={w / 2} y={h / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill={digits ? shade(CONTENT.one, 0.35) : C.ink}>{text}</text>
    </g>
  );
}

function LikeMaker(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b) */
      board: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d, PATTERNS.md §16) */
      keyOnly: true,
      /* the wide keypad: the picture is laid out for x 64 to 964 (the 900-wide room) on every question */
      bigPad: true,
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself */
      nextKey: true,
      /* NAV DOTS (the new look; LAYOUT.md §1d) */
      navDots: true,
      /* the two Decimal-card questions (4.70, 12.000) are answered on the card (PATTERNS.md 9e) */
      cardAnswer: true,
      /* the start page */
      StartArt, START_HOOK,
      }} />
  );
}

export default LikeMaker;
