/* ═══ M1.S1.T3.C10.2D1 · pair_pen · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, answer panel, bubble + mascot,
   phase dots, window.toolApi, the sound effects, the printed bubble, scoring, the events, idle and restart.
   THE LESSON IS SILENT (runtime r30+): every line is printed on the bubble, which is the guide. The lesson is
   action-driven: nothing moves on unless the child acts. THE NEW LOOK (keyOnly + navDots + bigPad): no question
   bar, the question lives only in the bubble (one sentence a screen), every act goes through api.act.
   NO imports in this file; only the five host hooks. Every English line the tool prints has a Hindi and a
   Gujarati entry in TR once the English is final (check's tr-coverage lists what is missing).
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "pair_pen";
const MEDIA_ID = "M1.S1.T3.C10.2D1";
const TOOL_NAME = "Pair Pen";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (not shown when phase 1 has steps) */
const OPENING = ["Two posts go up first. One at this end, and the number itself at the other."];
const FINISH_LINE = "Shut at both ends, and every factor you found is standing inside.";
/* printed when the child opens Free play; its LAST piece stays on the bubble */
const FREE_LINE = "Free play. Pick any number, then try the rows one at a time.";
const START_HOOK = "Why does a list of factors always stop?";

/* Chapter colours (Okabe-Ito, content only): a number that divides exactly is deep blue, the number being broken up
   is amber, a leftover or a failed trial is vermilion, the posts are the line colour. Chrome never borrows them. */
const PP_BLUE = CONTENT.hundred;
const PP_AMBER = CONTENT.ten;
const PP_VERM = CONTENT.pointer;
const PP_POST = CONTENT.line;
const PP_BLUE_INK = shade(PP_BLUE, 0.25);
const PP_AMBER_INK = shade(PP_AMBER, 0.42);
const PP_VERM_INK = shade(PP_VERM, 0.25);

/* word keys (the pad shows them two across); the id is the word itself, so the slot shows what was tapped */
const ppChoices = (...ws: string[]) => ws.map((w) => ({ id: w, label: w }));
/* the right key is in a different place in each (4th, 1st, 3rd, 2nd, 2nd) */
const NAME_CHOICES = ppChoices("only 4", "only 17", "neither", "both");
const TRIAL_CHOICES = ppChoices("it fails", "it works");
const ENDS_CHOICES = ppChoices("1 and 29", "2 and 58", "1 and 58", "2 and 29");
const SELF_CHOICES = ppChoices("only 1", "both", "only 99", "neither");
const END_CHOICES = ppChoices("for ever", "it ends");

/* StartArt (1200 x 340): the pen with a post at each end, three empty card places inside it, and the ruled board under it with
   counters dealt in rows. No digit: the pen starts empty and no number is an answer. */
function StartArt({ box, C, lang, tx }: any) {
  const px = 150, pw = 900, rowsN = 3, perN = 9, cs = 52;
  const bx = px + (pw - perN * cs) / 2, by = 176;
  return (
    <g>
      <rect x={px} y={6} width={pw} height={128} rx={20} fill={tint(C.panel, 0.5)} stroke={C.rule} strokeWidth={2} />
      {[0, 1, 2].map((j) => (
        <rect key={"slot" + j} x={px + 200 + j * 170} y={22} width={96} height={96} rx={14} fill="none" stroke={PP_BLUE} strokeWidth={3} strokeDasharray="8 6" />
      ))}
      <rect x={px} y={10} width={64} height={120} rx={12} fill={PP_POST} />
      <rect x={px + pw - 64} y={10} width={64} height={120} rx={12} fill={PP_POST} />
      <rect x={px} y={150} width={pw} height={182} rx={20} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      {Array.from({ length: rowsN }).map((_, r) => (
        <rect key={"row" + r} x={bx - 10} y={by + r * 52 - 4} width={perN * cs + 20} height={cs} rx={14} fill={tint(C.panel, 0.4)} />
      ))}
      <g filter="url(#fShadowSoft)">
        {Array.from({ length: rowsN * perN }).map((_, i) => (
          <Disc key={i} x={bx + (i % perN) * cs + cs / 2} y={by + Math.floor(i / perN) * 52 + cs / 2 - 4} r={20} paint="gTen" flat />
        ))}
        {Array.from({ length: rowsN * perN }).map((_, i) => (
          <Skin key={"sk" + i} name="button" x={bx + (i % perN) * cs + cs / 2 - 22} y={by + Math.floor(i / perN) * 52 + cs / 2 - 4 - 22} w={44} h={44} />
        ))}
      </g>
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): keyed by the English, byte for byte. Filled AFTER the English is final.
   Empty = the tool runs in English only. */
/* Terms (NCERT class 4 words; one term per idea): factor गुणनखंड / અવયવ · pair जोड़ा / જોડ · row पंक्ति / હાર · counter गोटी / કૂકરી ·
   pen (the board's enclosure) बाड़ा / વાડો · post खंभा / થાંભલો · mirror light दर्पण बत्ती / અરીસાની બત्તી · strip पट्टी / પટ્ટી.
   Digits stay Latin digits; the runtime says them as words. Data-borne lines (every `win`, the choice keys, the word keys of the bottom
   key and the words Work draws through tx) are added by hand. A first draft that wants a native speaker's read. */
const TR: any = {
  hi: {
    "Pair Pen": "जोड़ों का बाड़ा",
    "Two posts go up first. One at this end, and the number itself at the other.": "पहले दो खंभे खड़े होते हैं। इस सिरे पर एक, और दूसरे सिरे पर खुद वह संख्या।",
    "Shut at both ends, and every factor you found is standing inside.": "दोनों सिरे बंद हैं, और तुम्हारा ढूँढा हर गुणनखंड अंदर खड़ा है।",
    "Free play. Pick any number, then try the rows one at a time.": "मुक्त खेल। कोई भी संख्या चुनो, फिर पंक्तियाँ एक एक करके आज़माओ।",
    "Why does a list of factors always stop?": "गुणनखंडों की सूची हमेशा क्यों रुक जाती है?",
    /* phase 1 */
    "Two numbers that make the number": "दो संख्याएँ जो संख्या बनाती हैं",
    "Count the rows, then count one row. What does that pair make?": "पंक्तियाँ गिनो, फिर एक पंक्ति गिनो। यह जोड़ा क्या बनाता है?",
    "Tap Count rows to count the rows on the board.": "बोर्ड की पंक्तियाँ गिनने के लिए पंक्तियाँ गिनो छुओ।",
    "Tap the key at the bottom.": "नीचे की कुंजी छुओ।",
    "Now tap Count a row to count what is in one row.": "अब एक पंक्ति गिनो छुओ, ताकि एक पंक्ति की गोटियाँ गिनी जाएँ।",
    "Tap the same key again.": "वही कुंजी फिर छुओ।",
    "Tap Pin to put the pair in the pen.": "जोड़ा बाड़े में रखने के लिए लगाओ छुओ।",
    "The pair is ready, so tap Pin.": "जोड़ा तैयार है, इसलिए लगाओ छुओ।",
    "A pair is right when the rows leave no counters over.": "जोड़ा तभी सही है जब पंक्तियों में कोई गोटी न बचे।",
    "Try 3 rows: counters are left over, so try the next number of rows.": "3 पंक्तियाँ आज़माओ: गोटियाँ बचती हैं, इसलिए अगली पंक्तियाँ आज़माओ।",
    "A factor pair multiplies to make the number, and both are factors.": "गुणनखंडों का जोड़ा गुणा करके वह संख्या बनाता है, और दोनों गुणनखंड हैं।",
    "You learned: rows times how many in each row makes a factor pair.": "तुमने सीखा: पंक्तियाँ और हर पंक्ति की संख्या, गुणनखंडों का जोड़ा हैं।",
    "How many in each row?": "हर पंक्ति में कितनी?",
    "65 counters stand in 5 rows: how many are in each row?": "65 गोटियाँ 5 पंक्तियों में हैं: हर पंक्ति में कितनी हैं?",
    "Count the counters along one row, from left to right.": "एक पंक्ति की गोटियाँ बाएँ से दाएँ गिनो।",
    "Each row is as long as the others, so counting one row is enough.": "हर पंक्ति बराबर लंबी है, इसलिए एक पंक्ति गिनना काफ़ी है।",
    "In 3 rows that make 12 counters, each row holds 4.": "12 गोटियों की 3 पंक्तियों में हर पंक्ति में 4 होती हैं।",
    "That is 13 in each row, and 5 times 13 makes 65.": "हर पंक्ति में 13 हैं, और 5 गुणा 13 से 65 बनता है।",
    "4 and 17: which are factors?": "4 और 17: कौन गुणनखंड हैं?",
    "4 rows of 17 counters make 68: which of 4 and 17 are factors of 68?": "17 गोटियों की 4 पंक्तियाँ 68 बनाती हैं: 4 और 17 में 68 के गुणनखंड कौन हैं?",
    "Look at the rows and at one row: which numbers multiply to make 68?": "पंक्तियाँ और एक पंक्ति देखो: कौन सी संख्याएँ गुणा करके 68 बनाती हैं?",
    "The number in each row is also one of the two numbers that make 68.": "हर पंक्ति की संख्या भी 68 बनाने वाली दो संख्याओं में से एक है।",
    "Try a small one: 3 rows of 4 make 12, so 3 and 4 are factors of 12.": "छोटी संख्या लो: 4 की 3 पंक्तियाँ 12 बनाती हैं, तो 3 और 4, 12 के गुणनखंड हैं।",
    "Right: 4 rows of 17 make 68, so 4 and 17 are both factors.": "सही: 17 की 4 पंक्तियाँ 68 बनाती हैं, इसलिए 4 और 17 दोनों गुणनखंड हैं।",
    "only 4": "सिर्फ़ 4", "only 17": "सिर्फ़ 17", "both": "दोनों", "neither": "कोई नहीं",
    "A pair for 22, not using 1": "22 का जोड़ा, 1 के बिना",
    "Find a factor pair of 22 that does not use 1, then tap Enter.": "22 के गुणनखंडों का ऐसा जोड़ा ढूँढो जिसमें 1 न हो, फिर दर्ज करें छुओ।",
    "One row of 22 works for every number, so try a different number of rows.": "एक पंक्ति तो हर संख्या के लिए बनती है, इसलिए पंक्तियों की कोई और संख्या आज़माओ।",
    "2 and 11 multiply to make 22, so they are a factor pair.": "2 और 11 का गुणा 22 है, इसलिए वे गुणनखंडों का जोड़ा हैं।",
    /* phase 2 */
    "Going up in order, and knowing when the pairs repeat": "क्रम से ऊपर बढ़ना, और जानना कि जोड़े कब वापस आने लगते हैं",
    "Try one more row each time. Tell me when a pair comes back.": "हर बार एक पंक्ति और आज़माओ। बताओ कोई जोड़ा कब वापस आता है।",
    "Tap Try to put the 6 counters in one row.": "6 गोटियाँ एक पंक्ति में रखने के लिए आज़माओ छुओ।",
    "Try the next number of rows: tap Try again.": "पंक्तियों की अगली संख्या आज़माओ: फिर आज़माओ छुओ।",
    "The same key tries the next one.": "वही कुंजी अगली संख्या आज़माती है।",
    "Tap Try once more: the mirror light shows a pair has come back.": "एक बार और आज़माओ छुओ: दर्पण बत्ती बताती है कि जोड़ा वापस आया।",
    "One more tap on the same key.": "उसी कुंजी पर एक बार और छुओ।",
    "Try the rows in order, so that no number of rows is left out.": "पंक्तियाँ क्रम से आज़माओ, ताकि कोई संख्या न छूटे।",
    "A pair has come back when the same two numbers show the other way round.": "जोड़ा तब वापस आता है जब वही दो संख्याएँ उलटी होकर दिखें।",
    "Try the rows in order from one, and stop when a pair repeats.": "एक से क्रम से पंक्तियाँ आज़माओ, और जोड़ा दोहराए तो रुको।",
    "You learned: go up from one, and stop when a pair comes back.": "तुमने सीखा: एक से ऊपर बढ़ो, और जोड़ा वापस आए तो रुको।",
    "Every factor of 21": "21 के सारे गुणनखंड",
    "Try 1 row, then 2 rows and so on, to find every factor of 21, then tap Enter.": "1 पंक्ति, फिर 2 पंक्तियाँ और आगे, 21 के सब गुणनखंड ढूँढो, फिर दर्ज करें छुओ।",
    "Has the mirror light come on yet, to say every factor is in the pen?": "क्या दर्पण बत्ती जल गई, जो बताए कि हर गुणनखंड बाड़े में है?",
    "Right: when the pair comes back, all of 1, 3, 7 and 21 are in the pen.": "सही: जोड़ा वापस आने पर 1, 3, 7 और 21 सब बाड़े में हैं।",
    "Where does a pair come back?": "जोड़ा कहाँ वापस आता है?",
    "Try 46 in more and more rows: at how many rows does a pair come back?": "46 को और ज़्यादा पंक्तियों में आज़माओ: कितनी पंक्तियों पर जोड़ा वापस आता है?",
    "Keep trying rows until the mirror light comes on.": "पंक्तियाँ आज़माते रहो, जब तक दर्पण बत्ती न जले।",
    "Most numbers of rows leave counters over, so do not stop at the first few.": "ज़्यादातर संख्याओं पर गोटियाँ बचती हैं, इसलिए शुरू में ही मत रुको।",
    "Look for the card that shows an earlier pair the other way round.": "वह कार्ड ढूँढो जो पहले का जोड़ा उलटा दिखाए।",
    "The pair comes back at 23, written the other way round.": "23 पर जोड़ा उलटा लिखा हुआ वापस आता है।",
    "Skipped rows: does it work?": "छूटी पंक्तियाँ: क्या वह सही है?",
    "A child wrote 1 and 27, then 3 and 9: does the skipped number of rows work?": "एक बच्चे ने 1 और 27, फिर 3 और 9 लिखा: क्या छूटी पंक्ति संख्या सही है?",
    "Fill in the lit box on the strip, and see what that many rows leaves.": "पट्टी का चमकता खाना भरो, और देखो उतनी पंक्तियों में क्या बचता है।",
    "Share the 27 counters into 2 equal rows: is anything left over?": "27 गोटियाँ 2 बराबर पंक्तियों में बाँटो: क्या कुछ बचता है?",
    "A number of rows only works when it leaves nothing over.": "पंक्तियों की संख्या तभी सही है जब कुछ न बचे।",
    "It fails: 2 rows of 13 leave 1 counter over.": "असफल: 13 की 2 पंक्तियों में 1 गोटी बच जाती है।",
    "it works": "सफल है", "it fails": "असफल है",
    /* phase 3 */
    "The two factors every number has": "वे दो गुणनखंड जो हर संख्या के होते हैं",
    "Name two of its factors before you do any work at all.": "कोई भी काम करने से पहले इसके दो गुणनखंड बताओ।",
    "Tap the left post to drop it through the board.": "बाएँ खंभे को छुओ, ताकि वह बोर्ड से गुज़रे।",
    "It is the post at the left end of the pen.": "यह बाड़े के बाएँ सिरे का खंभा है।",
    "Now do the same with the right post.": "अब दाएँ खंभे के साथ भी यही करो।",
    "Tap the post at the far end of the pen.": "बाड़े के दूर वाले सिरे का खंभा छुओ।",
    "A factor shares the number into equal rows with nothing left over.": "गुणनखंड संख्या को बराबर पंक्तियों में बाँटता है और कुछ नहीं बचता।",
    "Take 6: one row of 6 and 6 rows of one leave nothing over.": "6 लो: 6 की एक पंक्ति और 1 की 6 पंक्तियों में कुछ नहीं बचता।",
    "One is a factor of every number, and every number is a factor of itself.": "संख्या 1 हर संख्या का गुणनखंड है, और हर संख्या खुद अपना गुणनखंड है।",
    "You learned: one and the number itself are always factors.": "तुमने सीखा: 1 और खुद वह संख्या हमेशा गुणनखंड होते हैं।",
    "Factors of 57, no dividing": "57 के गुणनखंड, बिना भाग किए",
    "Tap the factors of 57 that you know without dividing, then tap Enter.": "57 के जो गुणनखंड बिना भाग किए पता हों, उन्हें छुओ, फिर दर्ज करें छुओ।",
    "What does the other post leave when it drops through the board?": "दूसरा खंभा बोर्ड से गुज़रे तो कितना बचता है?",
    "Yes, 1 and 57 are factors of 57 without any dividing.": "हाँ, 1 और 57 बिना भाग किए ही 57 के गुणनखंड हैं।",
    "Smallest and greatest of 58": "58 का सबसे छोटा और सबसे बड़ा",
    "Which pair names the smallest and the greatest factor of 58?": "कौन सा जोड़ा 58 का सबसे छोटा और सबसे बड़ा गुणनखंड बताता है?",
    "Share 58 into one row: is anything left over?": "58 को एक पंक्ति में बाँटो: क्या कुछ बचता है?",
    "The smallest factor of 58 is 1 and the greatest is 58.": "58 का सबसे छोटा गुणनखंड 1 है और सबसे बड़ा 58।",
    "1 and 29": "1 और 29", "2 and 58": "2 और 58", "1 and 58": "1 और 58", "2 and 29": "2 और 29",
    "1 and 99: factors of 99?": "1 और 99: 99 के गुणनखंड?",
    "Is 1 a factor of 99, and is 99 a factor of 99?": "क्या 1, 99 का गुणनखंड है, और क्या 99, 99 का गुणनखंड है?",
    "Lay 99 out as one row and as 99 rows: what stands on the shelf?": "99 को एक पंक्ति और 99 पंक्तियों में रखो: बची गोटियों की जगह पर क्या है?",
    "Yes to both: 99 makes 1 row of 99 and 99 rows of 1, with nothing over.": "दोनों हाँ: 99 की 1 पंक्ति और 1 की 99 पंक्तियाँ बनती हैं, कुछ नहीं बचता।",
    "only 1": "सिर्फ़ 1", "only 99": "सिर्फ़ 99",
    /* phase 4 */
    "Why a factor list always ends": "गुणनखंडों की सूची हमेशा खत्म क्यों होती है",
    "Could this list go on for ever? Look at where the factors are standing.": "क्या यह सूची हमेशा चल सकती है? देखो गुणनखंड कहाँ खड़े हैं।",
    "Tap Shade to colour the stretch between the posts.": "खंभों के बीच का हिस्सा रंगने के लिए रंग भरो छुओ।",
    "Tap Count to count the factors in the pen.": "बाड़े के गुणनखंड गिनने के लिए गिनो छुओ।",
    "The key has changed, so tap Count.": "कुंजी बदल गई है, इसलिए गिनो छुओ।",
    "Could a factor stand outside them?": "क्या कोई गुणनखंड खंभों के बाहर खड़ा हो सकता है?",
    "Take 9: its factors are 1, 3 and 9, all standing between the posts.": "9 लो: उसके गुणनखंड 1, 3 और 9 हैं, सब खंभों के बीच खड़े हैं।",
    "Every factor is between one and the number, so the list can be counted.": "हर गुणनखंड 1 और संख्या के बीच है, इसलिए सूची गिनी जा सकती है।",
    "You learned: every factor sits between the posts, so the list ends.": "तुमने सीखा: हर गुणनखंड खंभों के बीच है, इसलिए सूची खत्म होती है।",
    "34's factors: for ever?": "34 के गुणनखंड: हमेशा चलते हैं?",
    "Do the factors of 34 go on for ever, or do they end?": "क्या 34 के गुणनखंड हमेशा चलते हैं, या खत्म हो जाते हैं?",
    "Which two numbers are standing on the posts?": "खंभों पर कौन सी दो संख्याएँ खड़ी हैं?",
    "It ends: no factor of 34 can stand outside the two posts.": "खत्म होते हैं: 34 का कोई गुणनखंड दोनों खंभों के बाहर नहीं हो सकता।",
    "it ends": "खत्म होते", "for ever": "हमेशा चलते",
    "How many factors has 81?": "81 के कितने गुणनखंड हैं?",
    "How many factors has 81, with the pen full?": "बाड़ा भरा है: 81 के कितने गुणनखंड हैं?",
    "Count the different numbers on the cards, not the cards.": "कार्ड नहीं, कार्डों की अलग अलग संख्याएँ गिनो।",
    "The 9 card holds one number twice, so count that number only once.": "9 वाले कार्ड पर एक संख्या दो बार है, उसे एक ही बार गिनो।",
    "List the numbers card by card, skipping any you have listed: how many are there?": "कार्ड दर कार्ड संख्याएँ लिखो, जो लिख चुके उसे छोड़ दो: कुल कितनी हैं?",
    "81 has 5 factors, and the list stops at 81.": "81 के 5 गुणनखंड हैं, और सूची 81 पर रुक जाती है।",
    "How many ways for 78 counters?": "78 गोटियों के कितने तरीके?",
    "78 counters in equal rows, at least 2 rows and 2 in each: how many ways?": "78 गोटियाँ बराबर पंक्तियों में, कम से कम 2 पंक्तियाँ और हर में 2: कितने तरीके?",
    "Each card can be turned round, so it makes more than one way.": "हर कार्ड उलटा भी रखा जा सकता है, इसलिए एक से ज़्यादा तरीके बनते हैं।",
    "Leave out the card with 1 on it, because one row is not allowed.": "1 वाला कार्ड छोड़ दो, क्योंकि एक पंक्ति की अनुमति नहीं है।",
    "Count the cards that are left, and give each one two ways.": "बचे कार्ड गिनो, और हर एक को दो तरीके दो।",
    "That makes 6 ways, with each card laid out both ways round.": "इस तरह 6 तरीके बनते हैं, हर कार्ड दोनों तरह रखा गया।",
    /* the words the working area and its keys draw */
    "row": "पंक्ति", "rows": "पंक्तियाँ", "over": "बचा", "nothing over": "कुछ नहीं बचा", "mirror": "दर्पण",
    "factor": "गुणनखंड", "factors": "गुणनखंड", "way": "तरीका", "ways": "तरीके",
    "Count rows": "पंक्तियाँ गिनो", "Count a row": "एक पंक्ति गिनो", "Pin": "लगाओ", "Try": "आज़माओ", "Go on": "आगे बढ़ो", "Shade": "रंग भरो", "Count": "गिनो",
  },
  gu: {
    "Pair Pen": "જોડનો વાડો",
    "Two posts go up first. One at this end, and the number itself at the other.": "પહેલાં બે થાંભલા ઊભા થાય છે. આ છેડે એક, અને બીજા છેડે એ સંખ્યા પોતે.",
    "Shut at both ends, and every factor you found is standing inside.": "બંને છેડા બંધ છે, અને તમે શોધેલો દરેક અવયવ અંદર ઊભો છે.",
    "Free play. Pick any number, then try the rows one at a time.": "મુક્ત રમત. કોઈ પણ સંખ્યા પસંદ કરો, પછી હાર એક એક કરીને અજમાવો.",
    "Why does a list of factors always stop?": "અવયવની યાદી હંમેશાં કેમ અટકી જાય છે?",
    /* phase 1 */
    "Two numbers that make the number": "સંખ્યા બનાવતી બે સંખ્યાઓ",
    "Count the rows, then count one row. What does that pair make?": "હાર ગણો, પછી એક હાર ગણો. આ જોડ શું બનાવે છે?",
    "Tap Count rows to count the rows on the board.": "બોર્ડની હાર ગણવા માટે હાર ગણો પર અડકો.",
    "Tap the key at the bottom.": "નીચેની કી પર અડકો.",
    "Now tap Count a row to count what is in one row.": "હવે એક હાર ગણો પર અડકો, એક હારની કૂકરીઓ ગણવા.",
    "Tap the same key again.": "એ જ કી ફરી અડકો.",
    "Tap Pin to put the pair in the pen.": "જોડ વાડામાં મૂકવા લગાવો પર અડકો.",
    "The pair is ready, so tap Pin.": "જોડ તૈયાર છે, તેથી લગાવો પર અડકો.",
    "A pair is right when the rows leave no counters over.": "જોડ ત્યારે જ સાચી જ્યારે હારમાં કોઈ કૂકરી ન વધે.",
    "Try 3 rows: counters are left over, so try the next number of rows.": "3 હાર અજમાવો: કૂકરીઓ વધે છે, તેથી આગળની હાર અજમાવો.",
    "A factor pair multiplies to make the number, and both are factors.": "અવયવની જોડ ગુણાકારથી એ સંખ્યા બનાવે છે, અને બંને અવયવ છે.",
    "You learned: rows times how many in each row makes a factor pair.": "તમે શીખ્યા: હાર ગુણ્યા દરેક હારમાં કેટલી, એ અવયવની જોડ છે.",
    "How many in each row?": "દરેક હારમાં કેટલી?",
    "65 counters stand in 5 rows: how many are in each row?": "65 કૂકરીઓ 5 હારમાં છે: દરેક હારમાં કેટલી છે?",
    "Count the counters along one row, from left to right.": "એક હારની કૂકરીઓ ડાબેથી જમણે ગણો.",
    "Each row is as long as the others, so counting one row is enough.": "દરેક હાર સરખી લાંબી છે, તેથી એક હાર ગણવી પૂરતી છે.",
    "In 3 rows that make 12 counters, each row holds 4.": "12 કૂકરીઓની 3 હારમાં દરેક હારમાં 4 હોય છે.",
    "That is 13 in each row, and 5 times 13 makes 65.": "દરેક હારમાં 13 છે, અને 5 ગુણ્યા 13 બરાબર 65 થાય છે.",
    "4 and 17: which are factors?": "4 અને 17: કયા અવયવ છે?",
    "4 rows of 17 counters make 68: which of 4 and 17 are factors of 68?": "17 કૂકરીઓની 4 હાર 68 બનાવે છે: 4 અને 17 માંથી 68ના અવયવ કયા છે?",
    "Look at the rows and at one row: which numbers multiply to make 68?": "હાર અને એક હાર જુઓ: કઈ સંખ્યાઓ ગુણાતાં 68 બને છે?",
    "The number in each row is also one of the two numbers that make 68.": "દરેક હારની સંખ્યા પણ 68 બનાવતી બે સંખ્યાઓમાંની એક છે.",
    "Try a small one: 3 rows of 4 make 12, so 3 and 4 are factors of 12.": "નાની સંખ્યા લો: 4ની 3 હાર 12 બનાવે છે, તેથી 3 અને 4, 12ના અવયવ છે.",
    "Right: 4 rows of 17 make 68, so 4 and 17 are both factors.": "સાચું: 17ની 4 હાર 68 બનાવે છે, તેથી 4 અને 17 બંને અવયવ છે.",
    "only 4": "ફક્ત 4", "only 17": "ફક્ત 17", "both": "બંને", "neither": "એકેય નહીં",
    "A pair for 22, not using 1": "22ની જોડ, 1 વગર",
    "Find a factor pair of 22 that does not use 1, then tap Enter.": "22ના અવયવની એવી જોડ શોધો જેમાં 1 ન હોય, પછી દાખલ કરો પર અડકો.",
    "One row of 22 works for every number, so try a different number of rows.": "એક હાર તો દરેક સંખ્યા માટે બને છે, તેથી હારની બીજી સંખ્યા અજમાવો.",
    "2 and 11 multiply to make 22, so they are a factor pair.": "2 અને 11નો ગુણાકાર 22 છે, તેથી તે અવયવની જોડ છે.",
    /* phase 2 */
    "Going up in order, and knowing when the pairs repeat": "ક્રમમાં આગળ વધવું, અને જોડ ક્યારે ફરી આવે તે જાણવું",
    "Try one more row each time. Tell me when a pair comes back.": "દર વખતે એક હાર વધુ અજમાવો. કહો કોઈ જોડ ક્યારે પાછી આવે છે.",
    "Tap Try to put the 6 counters in one row.": "6 કૂકરીઓ એક હારમાં મૂકવા અજમાવો પર અડકો.",
    "Try the next number of rows: tap Try again.": "હારની આગળની સંખ્યા અજમાવો: ફરી અજમાવો પર અડકો.",
    "The same key tries the next one.": "એ જ કી આગળની સંખ્યા અજમાવે છે.",
    "Tap Try once more: the mirror light shows a pair has come back.": "એક વાર વધુ અજમાવો પર અડકો: અરીસાની બત્તી બતાવે છે કે જોડ પાછી આવી.",
    "One more tap on the same key.": "એ જ કી પર એક વાર વધુ અડકો.",
    "Try the rows in order, so that no number of rows is left out.": "હાર ક્રમમાં અજમાવો, જેથી કોઈ સંખ્યા ન છૂટે.",
    "A pair has come back when the same two numbers show the other way round.": "જોડ ત્યારે પાછી આવે જ્યારે એ જ બે સંખ્યા ઊલટી થઈને દેખાય.",
    "Try the rows in order from one, and stop when a pair repeats.": "એકથી ક્રમમાં હાર અજમાવો, અને જોડ ફરી આવે ત્યારે અટકો.",
    "You learned: go up from one, and stop when a pair comes back.": "તમે શીખ્યા: એકથી આગળ વધો, અને જોડ પાછી આવે ત્યારે અટકો.",
    "Every factor of 21": "21ના બધા અવયવ",
    "Try 1 row, then 2 rows and so on, to find every factor of 21, then tap Enter.": "1 હાર, પછી 2 હાર અને આગળ, 21ના બધા અવયવ શોધો, પછી દાખલ કરો પર અડકો.",
    "Has the mirror light come on yet, to say every factor is in the pen?": "શું અરીસાની બત્તી ચાલુ થઈ, જે કહે કે દરેક અવયવ વાડામાં છે?",
    "Right: when the pair comes back, all of 1, 3, 7 and 21 are in the pen.": "સાચું: જોડ પાછી આવે ત્યારે 1, 3, 7 અને 21 બધા વાડામાં છે.",
    "Where does a pair come back?": "જોડ ક્યાં પાછી આવે છે?",
    "Try 46 in more and more rows: at how many rows does a pair come back?": "46ને વધુ ને વધુ હારમાં અજમાવો: કેટલી હાર પર જોડ પાછી આવે છે?",
    "Keep trying rows until the mirror light comes on.": "અરીસાની બત્તી ચાલુ ન થાય ત્યાં સુધી હાર અજમાવતા રહો.",
    "Most numbers of rows leave counters over, so do not stop at the first few.": "મોટા ભાગની સંખ્યાએ કૂકરીઓ વધે છે, તેથી શરૂઆતમાં જ ન અટકો.",
    "Look for the card that shows an earlier pair the other way round.": "એ કાર્ડ શોધો જે પહેલાંની જોડ ઊલટી બતાવે.",
    "The pair comes back at 23, written the other way round.": "23 પર જોડ ઊલટી લખાયેલી પાછી આવે છે.",
    "Skipped rows: does it work?": "છૂટેલી હાર: શું તે સાચી છે?",
    "A child wrote 1 and 27, then 3 and 9: does the skipped number of rows work?": "એક બાળકે 1 અને 27, પછી 3 અને 9 લખ્યું: શું છૂટેલી હારની સંખ્યા સાચી છે?",
    "Fill in the lit box on the strip, and see what that many rows leaves.": "પટ્ટીનું ચમકતું ખાનું ભરો, અને જુઓ એટલી હારમાં શું વધે છે.",
    "Share the 27 counters into 2 equal rows: is anything left over?": "27 કૂકરીઓ 2 સરખી હારમાં વહેંચો: શું કંઈ વધે છે?",
    "A number of rows only works when it leaves nothing over.": "હારની સંખ્યા ત્યારે જ સાચી જ્યારે કંઈ ન વધે.",
    "It fails: 2 rows of 13 leave 1 counter over.": "નિષ્ફળ: 13ની 2 હારમાં 1 કૂકરી વધે છે.",
    "it works": "સફળ છે", "it fails": "નિષ્ફળ છે",
    /* phase 3 */
    "The two factors every number has": "દરેક સંખ્યાના હોય એવા બે અવયવ",
    "Name two of its factors before you do any work at all.": "કોઈ પણ કામ કરતાં પહેલાં તેના બે અવયવ કહો.",
    "Tap the left post to drop it through the board.": "ડાબા થાંભલાને અડકો, જેથી તે બોર્ડમાંથી પસાર થાય.",
    "It is the post at the left end of the pen.": "આ વાડાના ડાબા છેડાનો થાંભલો છે.",
    "Now do the same with the right post.": "હવે જમણા થાંભલા સાથે પણ એમ જ કરો.",
    "Tap the post at the far end of the pen.": "વાડાના દૂરના છેડાનો થાંભલો અડકો.",
    "A factor shares the number into equal rows with nothing left over.": "અવયવ સંખ્યાને સરખી હારમાં વહેંચે છે અને કંઈ વધતું નથી.",
    "Take 6: one row of 6 and 6 rows of one leave nothing over.": "6 લો: 6ની એક હાર અને 1ની 6 હારમાં કંઈ વધતું નથી.",
    "One is a factor of every number, and every number is a factor of itself.": "સંખ્યા 1 દરેક સંખ્યાનો અવયવ છે, અને દરેક સંખ્યા પોતે પોતાનો અવયવ છે.",
    "You learned: one and the number itself are always factors.": "તમે શીખ્યા: એક અને એ સંખ્યા પોતે હંમેશાં અવયવ હોય છે.",
    "Factors of 57, no dividing": "57ના અવયવ, ભાગાકાર વગર",
    "Tap the factors of 57 that you know without dividing, then tap Enter.": "57ના જે અવયવ ભાગાકાર વગર ખબર હોય તેને અડકો, પછી દાખલ કરો પર અડકો.",
    "What does the other post leave when it drops through the board?": "બીજો થાંભલો બોર્ડમાંથી પસાર થાય તો કેટલું વધે છે?",
    "Yes, 1 and 57 are factors of 57 without any dividing.": "હા, 1 અને 57 ભાગાકાર વગર જ 57ના અવયવ છે.",
    "Smallest and greatest of 58": "58નો સૌથી નાનો અને સૌથી મોટો",
    "Which pair names the smallest and the greatest factor of 58?": "કઈ જોડ 58નો સૌથી નાનો અને સૌથી મોટો અવયવ બતાવે છે?",
    "Share 58 into one row: is anything left over?": "58ને એક હારમાં વહેંચો: શું કંઈ વધે છે?",
    "The smallest factor of 58 is 1 and the greatest is 58.": "58નો સૌથી નાનો અવયવ 1 છે અને સૌથી મોટો 58.",
    "1 and 29": "1 અને 29", "2 and 58": "2 અને 58", "1 and 58": "1 અને 58", "2 and 29": "2 અને 29",
    "1 and 99: factors of 99?": "1 અને 99: 99ના અવયવ?",
    "Is 1 a factor of 99, and is 99 a factor of 99?": "શું 1, 99નો અવયવ છે, અને શું 99, 99નો અવયવ છે?",
    "Lay 99 out as one row and as 99 rows: what stands on the shelf?": "99ને એક હારમાં અને 99 હારમાં ગોઠવો: વધેલી કૂકરીઓની જગ્યાએ શું છે?",
    "Yes to both: 99 makes 1 row of 99 and 99 rows of 1, with nothing over.": "બંને હા: 99ની 1 હાર અને 1ની 99 હાર બને છે, કંઈ વધતું નથી.",
    "only 1": "ફક્ત 1", "only 99": "ફક્ત 99",
    /* phase 4 */
    "Why a factor list always ends": "અવયવની યાદી હંમેશાં કેમ પૂરી થાય છે",
    "Could this list go on for ever? Look at where the factors are standing.": "શું આ યાદી કાયમ ચાલી શકે? જુઓ અવયવ ક્યાં ઊભા છે.",
    "Tap Shade to colour the stretch between the posts.": "થાંભલા વચ્ચેનો ભાગ રંગવા રંગ ભરો પર અડકો.",
    "Tap Count to count the factors in the pen.": "વાડાના અવયવ ગણવા ગણો પર અડકો.",
    "The key has changed, so tap Count.": "કી બદલાઈ છે, તેથી ગણો પર અડકો.",
    "Could a factor stand outside them?": "શું કોઈ અવયવ થાંભલાની બહાર ઊભો રહી શકે?",
    "Take 9: its factors are 1, 3 and 9, all standing between the posts.": "9 લો: તેના અવયવ 1, 3 અને 9 છે, બધા થાંભલા વચ્ચે ઊભા છે.",
    "Every factor is between one and the number, so the list can be counted.": "દરેક અવયવ એક અને સંખ્યાની વચ્ચે છે, તેથી યાદી ગણી શકાય.",
    "You learned: every factor sits between the posts, so the list ends.": "તમે શીખ્યા: દરેક અવયવ થાંભલા વચ્ચે છે, તેથી યાદી પૂરી થાય છે.",
    "34's factors: for ever?": "34ના અવયવ: કાયમ ચાલે છે?",
    "Do the factors of 34 go on for ever, or do they end?": "શું 34ના અવયવ કાયમ ચાલે છે, કે પૂરા થાય છે?",
    "Which two numbers are standing on the posts?": "થાંભલા પર કઈ બે સંખ્યા ઊભી છે?",
    "It ends: no factor of 34 can stand outside the two posts.": "પૂરા થાય છે: 34નો કોઈ અવયવ બંને થાંભલાની બહાર ન હોઈ શકે.",
    "it ends": "પૂરા થાય", "for ever": "કાયમ ચાલે",
    "How many factors has 81?": "81ના કેટલા અવયવ છે?",
    "How many factors has 81, with the pen full?": "વાડો ભરેલો છે: 81ના કેટલા અવયવ છે?",
    "Count the different numbers on the cards, not the cards.": "કાર્ડ નહીં, કાર્ડ પરની જુદી જુદી સંખ્યાઓ ગણો.",
    "The 9 card holds one number twice, so count that number only once.": "9 વાળા કાર્ડ પર એક સંખ્યા બે વાર છે, તેને એક જ વાર ગણો.",
    "List the numbers card by card, skipping any you have listed: how many are there?": "કાર્ડ પછી કાર્ડ સંખ્યાઓ લખો, જે લખી ચૂક્યા તે છોડી દો: કુલ કેટલી છે?",
    "81 has 5 factors, and the list stops at 81.": "81ના 5 અવયવ છે, અને યાદી 81 પર અટકે છે.",
    "How many ways for 78 counters?": "78 કૂકરીઓની કેટલી રીત?",
    "78 counters in equal rows, at least 2 rows and 2 in each: how many ways?": "78 કૂકરીઓ સરખી હારમાં, ઓછામાં ઓછી 2 હાર અને દરેકમાં 2: કેટલી રીત?",
    "Each card can be turned round, so it makes more than one way.": "દરેક કાર્ડ ઊલટું પણ ગોઠવાય, તેથી એક કરતાં વધુ રીત બને છે.",
    "Leave out the card with 1 on it, because one row is not allowed.": "1 વાળું કાર્ડ છોડી દો, કારણ કે એક હારની છૂટ નથી.",
    "Count the cards that are left, and give each one two ways.": "બાકીના કાર્ડ ગણો, અને દરેકને બે રીત આપો.",
    "That makes 6 ways, with each card laid out both ways round.": "આમ 6 રીત બને છે, દરેક કાર્ડ બંને રીતે ગોઠવાયું.",
    /* the words the working area and its keys draw */
    "row": "હાર", "rows": "હાર", "over": "વધ્યું", "nothing over": "કંઈ ન વધ્યું", "mirror": "અરીસો",
    "factor": "અવયવ", "factors": "અવયવ", "way": "રીત", "ways": "રીત",
    "Count rows": "હાર ગણો", "Count a row": "એક હાર ગણો", "Pin": "લગાવો", "Try": "અજમાવો", "Go on": "આગળ વધો", "Shade": "રંગ ભરો", "Count": "ગણો",
  },
};

/* One entry per phase = one mount.
   warm   the warm-up board of the guide steps (a number that is none of the phase's answers)
   kinds  name (a laid-out pair, word keys) · partner (count one row, typed) · pair (try rows, Enter pins) · hunt (try rows
          up the run, Enter sends the pen's list) · comeback (typed: where a pair comes back) · skipped (word keys, a gap
          on the run) · posts (tap the posts, Enter sends them) · ends (two boxes) · self (word keys) · forever (word keys)
          · count and ways (typed, the pen full). n = the number between the posts; rows = rows already laid out.
   win    the one-sentence win line said at the right answer (data-borne lines are added to TR by hand) */
const PHASES = [
  {
    n: 1,
    concept: "Two numbers that make the number",
    conceptId: "M1.S1.T3.C10", objectiveIds: ["O3"],
    warm: { kind: "lay", n: 12, rows: 3 },
    says: ["Count the rows, then count one row. What does that pair make?"],
    /* count the rows, count one row, pin the pair: the same one key, its label following the act (Count rows, Count a row, Pin) */
    steps: [
      { say: "Tap Count rows to count the rows on the board.", on: "count", hint: "Tap the key at the bottom." },
      { say: "Now tap Count a row to count what is in one row.", on: "count", hint: "Tap the same key again." },
      { say: "Tap Pin to put the pair in the pen.", on: "pin", hint: "The pair is ready, so tap Pin." },
    ],
    /* tries (plan): rung 1 the item's own miss; rung 2 how many in one row and what the two come to; rung 3 a small pair worked */
    /* the pair question's rungs (the first two questions have their own) */
    ladder: ["A pair is right when the rows leave no counters over.",
      "Try 3 rows: counters are left over, so try the next number of rows."],
    closing: "A factor pair multiplies to make the number, and both are factors.",
    learned: "You learned: rows times how many in each row makes a factor pair.",
    traceback: "The board turns a quarter turn so the number in each row becomes the number of rows, the one row is counted along, and both numbers lift into one linked card that pins into the pen.",
    items: [
      /* practice 1: answer in the plan = 5 and 13 (asked as the partner of 5: the number in each row). It comes FIRST so that the
         phase opens on a typed question (check's pad-shape samples only a phase's first question, and a keyOnly tool has no other typed one up front) */
      { qid: "M1.S1.T3.C10:1", kind: "partner", n: 65, rows: 5, answer: 13, winMs: 2600,
        ask: "How many in each row?",
        say: "65 counters stand in 5 rows: how many are in each row?",
        miss: "Count the counters along one row, from left to right.",
        ladder: ["Each row is as long as the others, so counting one row is enough.",
          "In 3 rows that make 12 counters, each row holds 4."],
        win: "That is 13 in each row, and 5 times 13 makes 65." },
      /* learn ML1: answer in the plan = A factor pair of 68, so 4 and 17 are both factors of 68 */
      { qid: "M1.S1.T3.C10:ML1", kind: "name", n: 68, rows: 4, answer: "both", choices: NAME_CHOICES, winMs: 2600,
        ask: "4 and 17: which are factors?",
        say: "4 rows of 17 counters make 68: which of 4 and 17 are factors of 68?",
        miss: "Look at the rows and at one row: which numbers multiply to make 68?",
        ladder: ["The number in each row is also one of the two numbers that make 68.",
          "Try a small one: 3 rows of 4 make 12, so 3 and 4 are factors of 12."],
        win: "Right: 4 rows of 17 make 68, so 4 and 17 are both factors." },
      /* practice 2: answer in the plan = 2 and 11 (11 and 2 is the same pair and is accepted) */
      { qid: "M1.S1.T3.C10:2", kind: "pair", n: 22, answer: "2 × 11", pad: "enter", winMs: 2600,
        ask: "A pair for 22, not using 1",
        say: "Find a factor pair of 22 that does not use 1, then tap Enter.",
        miss: "One row of 22 works for every number, so try a different number of rows.",
        win: "2 and 11 multiply to make 22, so they are a factor pair." },
    ],
  },
  {
    n: 2,
    concept: "Going up in order, and knowing when the pairs repeat",
    conceptId: "M1.S1.T3.C11", objectiveIds: ["O3"],
    warm: { kind: "hunt", n: 6 },
    says: ["Try one more row each time. Tell me when a pair comes back."],
    steps: [
      { say: "Tap Try to put the 6 counters in one row.", on: "try", hint: "Tap the key at the bottom." },
      { say: "Try the next number of rows: tap Try again.", on: "try", hint: "The same key tries the next one." },
      { say: "Tap Try once more: the mirror light shows a pair has come back.", on: "try", hint: "One more tap on the same key." },
    ],
    /* tries (plan): rung 3 "the run is cut to six places" is the warm-up walk */
    ladder: ["Try the rows in order, so that no number of rows is left out.",
      "A pair has come back when the same two numbers show the other way round."],
    closing: "Try the rows in order from one, and stop when a pair repeats.",
    learned: "You learned: go up from one, and stop when a pair comes back.",
    traceback: "The strip carries on from where the key stopped: every number of rows is tried in turn and keeps its mark, pairs pin, the mirror light comes on when a pair comes back, and the pen is counted out; a skipped box on the strip is laid out and keeps its leftover.",
    items: [
      /* learn ML2: answer in the plan = 1 and 21, then 3 and 7, so the factors are 1, 3, 7 and 21; the trials at 2, 4, 5 and 6 all fail */
      { qid: "M1.S1.T3.C11:ML2", kind: "hunt", n: 21, answer: "1, 3, 7, 21", pad: "enter", winMs: 3200,
        ask: "Every factor of 21",
        say: "Try 1 row, then 2 rows and so on, to find every factor of 21, then tap Enter.",
        miss: "Has the mirror light come on yet, to say every factor is in the pen?",
        win: "Right: when the pair comes back, all of 1, 3, 7 and 21 are in the pen." },
      /* practice 4: answer in the plan = 1 and 46, then 2 and 23; every trial from 3 to 22 fails
         (asked as the stop: the pairs come back at 23, after the run of failures from 3 to 22) */
      { qid: "M1.S1.T3.C11:4", kind: "comeback", n: 46, answer: 23, winMs: 2600,
        ask: "Where does a pair come back?",
        say: "Try 46 in more and more rows: at how many rows does a pair come back?",
        miss: "Keep trying rows until the mirror light comes on.",
        ladder: ["Most numbers of rows leave counters over, so do not stop at the first few.",
          "Look for the card that shows an earlier pair the other way round."],
        win: "The pair comes back at 23, written the other way round." },
      /* practice 5: answer in the plan = 2 was skipped, and it fails, because 27 divided by 2 leaves 1 over */
      { qid: "M1.S1.T3.C11:5", kind: "skipped", n: 27, answer: "it fails", choices: TRIAL_CHOICES, winMs: 2600,
        ask: "Skipped rows: does it work?",
        say: "A child wrote 1 and 27, then 3 and 9: does the skipped number of rows work?",
        miss: "Fill in the lit box on the strip, and see what that many rows leaves.",
        ladder: ["Share the 27 counters into 2 equal rows: is anything left over?",
          "A number of rows only works when it leaves nothing over."],
        win: "It fails: 2 rows of 13 leave 1 counter over." },
    ],
  },
  {
    n: 3,
    concept: "The two factors every number has",
    conceptId: "M1.S1.T3.C12", objectiveIds: ["O4"],
    warm: { kind: "posts", n: 15 },
    says: ["Name two of its factors before you do any work at all."],
    steps: [
      { say: "Tap the left post to drop it through the board.", on: "post-left", hint: "It is the post at the left end of the pen." },
      { say: "Now do the same with the right post.", on: "post-right", hint: "Tap the post at the far end of the pen." },
    ],
    /* tries (plan): rung 3 "the pen is cut to a small number" is spoken as 6 laid out both ways */
    ladder: ["A factor shares the number into equal rows with nothing left over.",
      "Take 6: one row of 6 and 6 rows of one leave nothing over."],
    closing: "One is a factor of every number, and every number is a factor of itself.",
    learned: "You learned: one and the number itself are always factors.",
    traceback: "Both posts light and drop through the board: one row of the number, then that many rows of one, the leftover shelf empty each time; the card with 1 on it pins.",
    items: [
      /* learn ML3: answer in the plan = Yes: 1 and 57. The child taps the two posts (the act is the answer) and taps Enter */
      { qid: "M1.S1.T3.C12:ML3", kind: "posts", n: 57, answer: "1, 57", pad: "enter", winMs: 2600,
        ask: "Factors of 57, no dividing",
        say: "Tap the factors of 57 that you know without dividing, then tap Enter.",
        miss: "What does the other post leave when it drops through the board?",
        win: "Yes, 1 and 57 are factors of 57 without any dividing." },
      /* practice 3: answer in the plan = 1 is the smallest and 58 is the greatest (four word keys: the right one third) */
      { qid: "M1.S1.T3.C12:3", kind: "ends", n: 58, answer: "1 and 58", choices: ENDS_CHOICES, winMs: 2600,
        ask: "Smallest and greatest of 58",
        say: "Which pair names the smallest and the greatest factor of 58?",
        miss: "Share 58 into one row: is anything left over?",
        win: "The smallest factor of 58 is 1 and the greatest is 58." },
      /* practice 6: answer in the plan = Yes to both, because 1 is a factor of every number and every number is a factor of itself */
      { qid: "M1.S1.T3.C12:6", kind: "self", n: 99, answer: "both", choices: SELF_CHOICES, winMs: 2600,
        ask: "1 and 99: factors of 99?",
        say: "Is 1 a factor of 99, and is 99 a factor of 99?",
        miss: "Lay 99 out as one row and as 99 rows: what stands on the shelf?",
        win: "Yes to both: 99 makes 1 row of 99 and 99 rows of 1, with nothing over." },
    ],
  },
  {
    n: 4,
    concept: "Why a factor list always ends",
    conceptId: "M1.S1.T3.C13", objectiveIds: ["O4"],
    warm: { kind: "full", n: 10 },
    says: ["Could this list go on for ever? Look at where the factors are standing."],
    steps: [
      { say: "Tap Shade to colour the stretch between the posts.", on: "shade", hint: "Tap the key at the bottom." },
      { say: "Tap Count to count the factors in the pen.", on: "count", hint: "The key has changed, so tap Count." },
    ],
    /* tries (plan): rung 3 "the pen is cut to a small number and counted" is spoken as 9 */
    ladder: ["Could a factor stand outside them?",
      "Take 9: its factors are 1, 3 and 9, all standing between the posts."],
    closing: "Every factor is between one and the number, so the list can be counted.",
    learned: "You learned: every factor sits between the posts, so the list ends.",
    traceback: "The posts light and the stretch between them is shaded; the factors in the pen are counted out one at a time, the count climbing on the board.",
    items: [
      /* learn ML4: answer in the plan = No. The factors are 1, 2, 17 and 34, and the list stops because every factor lies between 1 and 34 */
      { qid: "M1.S1.T3.C13:ML4", kind: "forever", n: 34, answer: "it ends", choices: END_CHOICES, winMs: 2600,
        ask: "34's factors: for ever?",
        say: "Do the factors of 34 go on for ever, or do they end?",
        miss: "Which two numbers are standing on the posts?",
        win: "It ends: no factor of 34 can stand outside the two posts." },
      /* practice 7: answer in the plan = Five: 1, 3, 9, 27 and 81. The pairs repeat at 9 times 9, and no factor can be greater than 81 */
      { qid: "M1.S1.T3.C13:7", kind: "count", n: 81, answer: 5, winMs: 2600,
        ask: "How many factors has 81?",
        say: "How many factors has 81, with the pen full?",
        miss: "Count the different numbers on the cards, not the cards.",
        ladder: ["The 9 card holds one number twice, so count that number only once.",
          "List the numbers card by card, skipping any you have listed: how many are there?"],
        win: "81 has 5 factors, and the list stops at 81." },
      /* practice 8: answer in the plan = Six ways: 2 rows of 39, 3 rows of 26, 6 rows of 13, 13 rows of 6, 26 rows of 3 and 39 rows of 2
         (asked as how many ways; the correction lays all six out) */
      { qid: "M1.S1.T3.C13:8", kind: "ways", n: 78, answer: 6, winMs: 2600,
        ask: "How many ways for 78 counters?",
        say: "78 counters in equal rows, at least 2 rows and 2 in each: how many ways?",
        miss: "Each card can be turned round, so it makes more than one way.",
        ladder: ["Leave out the card with 1 on it, because one row is not allowed.",
          "Count the cards that are left, and give each one two ways."],
        win: "That makes 6 ways, with each card laid out both ways round." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  pen: "left post 1, right post the number; linked pair cards in dial order, then a mirror card for the pair that came back the other way round",
  board: "the number's counters dealt into as many rows as the key says; what cannot fill a row stands on the leftover shelf",
  run: "a strip with one box per number of rows, 14 in view; a box keeps its mark: a pair (blue bar) or a leftover (vermilion dot); the key tries only the lowest blank box and stays live after the mirror light",
  numbers: PHASES.map((p: any) => p.items.map((it: any) => it.n)),
  warmups: PHASES.map((p: any) => p.warm.n),
  freePlay: { from: 2, to: 40, start: 24 },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* the numbers written in a value: "2 × 11", "1, 3, 7, 21", [2, 11] */
const ppNums = (v: any): number[] => (Array.isArray(v) ? v.map(Number) : (String(v ?? "").match(/\d+/g) || []).map(Number)).filter((x: number) => isFinite(x));
const ppSorted = (xs: number[]) => Array.from(new Set(xs)).sort((a, b) => a - b);

/* judge: is this value right for this item? A pair is right when it multiplies to the number without
   using 1; a list is right in any order; numbers compare as numbers */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (item.kind === "pair") {
    const xs = ppNums(v);
    return xs.length === 2 && xs[0] * xs[1] === item.n && xs[0] !== 1 && xs[1] !== 1;
  }
  /* the pen's list (or the two posts tapped: one and the number itself), in any order */
  if (item.kind === "hunt" || item.kind === "posts") return ppSorted(ppNums(v)).join(",") === ppSorted(ppNums(item.answer)).join(",");
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work:
   the factor table is found by MULTIPLYING (a × b = n over a times table), never by dividing */
const oracle = () => {
  const table = (n: number) => { const out: number[] = []; for (let a = 1; a <= n; a++) for (let b = 1; b <= n; b++) if (a * b === n) { out.push(a); break; } return out; };
  const list = (s: any) => String(s).split(",").map((t) => parseInt(t, 10));
  return PHASES.every((p: any) => p.items.every((it: any) => {
    const fs = table(it.n), has = (x: number) => fs.indexOf(x) >= 0, lo = fs[0], hi = fs[fs.length - 1];
    switch (it.kind) {
      case "name": { const other = fs.find((b) => it.rows * b === it.n); return it.answer === (has(it.rows) && other !== undefined && has(other) ? "both" : "none"); }
      case "partner": return it.rows * it.answer === it.n && has(it.answer);
      case "pair": { const [a, b] = String(it.answer).split("×").map((t) => parseInt(t, 10)); return a * b === it.n && a !== 1 && b !== 1; }
      case "hunt": return list(it.answer).join(",") === fs.join(",");
      case "comeback": return fs.find((a) => a * a >= it.n) === it.answer;
      case "skipped": return it.answer === (has(2) ? "it works" : "it fails");
      case "posts": return list(it.answer).join(",") === [lo, hi].join(",") && lo === 1 && hi === it.n;
      case "ends": { const xs = String(it.answer).match(/\d+/g) || []; return Number(xs[0]) === lo && Number(xs[1]) === hi; }
      case "self": return it.answer === (has(1) && has(it.n) ? "both" : "none");
      case "forever": return it.answer === (fs.every((x) => x <= it.n) ? "it ends" : "for ever");
      case "count": return it.answer === fs.length;
      case "ways": return it.answer === fs.filter((x) => x !== 1 && x !== it.n).length;
    }
    return false;
  }));
};
/* the most likely wrong answer (the misconception); judge must reject it */
const NEAR: Record<string, any> = {
  name: "only 4",       /* only the rows are a factor */
  partner: 5,          /* names the rows, not the number in each row */
  pair: "1 × 22",      /* the pair that is always there: one row of 22 uses 1 */
  hunt: "1, 21",       /* stopped before the pair in the middle */
  comeback: 22,        /* stops on the last failure */
  skipped: "it works",   /* the skipped trial was never laid out */
  posts: "1",          /* only the left post: a number cannot be a factor of itself */
  ends: "1 and 29",    /* the greatest factor below the number */
  self: "only 1",       /* the same */
  forever: "for ever",  /* factors carry on, like multiples */
  count: 6,            /* 9 counted twice */
  ways: 3,             /* each card once, never turned */
};
const nearMiss = (item: any) => (item.kind in NEAR ? NEAR[item.kind] : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => {
  switch (item.kind) {
    case "partner": case "comeback": case "count": case "ways": return [String(item.answer), words(item.answer)];
    case "pair": return [String(item.answer), "11", words(11)];
    case "hunt": return [String(item.answer), "3", "7", words(3), words(7)];
    case "posts": return [String(item.answer), "1"];
    default: return [String(item.answer)];
  }
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
/* solve answers at once (the dev driver reads the result straight away): an answer made on the picture is set there first so the win shows it */
const solve = (item: any, T: any) => {
  if (T.state().stage === "demo") return HOOK.demo && HOOK.demo();
  if (item.pad === "enter" && HOOK.set) HOOK.set(item.answer);
  return T.submit(item.answer);
};
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" ? (HOOK.set ? HOOK.set(v) : false) : undefined);
/* the agent's check() before Enter: undefined = press Enter (so in a steps phase it reaches api.onEnter) */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── geometry: the picture is ONE column, WD wide, so it fits the 900 an open keypad leaves and stays clear of the key's corner ── */
const WD = 880;
/* the posts are 96 wide so their numerals read at 48 from the last bench */
const PEN = { h: 128, post: 96, x0: 108, span: 664, cardY: 12, cardH: 104, cardW: 88, pitch: 104 };
const PICT_X = 10;   /* the picture's place: the same with the keypad open or shut (the 900 an open keypad leaves, 10 clear each side) */
const BRD_Y = 140;
const ARR_X = 24, ARR_W = 600;
const SHELF = { x: 636, w: 240 };
const RUN = { y: 352, h: 68, pitch: 52, n: 14 };
const NMAX = 40;   /* free play's biggest number: its rows of one and its pen cards fit the board, and every counter can be a button */
const KEYB = { y: 440, w: 240, h: 72 };

/* what each kind of question draws: strip = the run of first numbers, key = the one bottom key, posts = tappable posts */
const KINDS: Record<string, any> = {
  name: {}, partner: {},
  lay: { key: true },
  pair: { key: true } /* no strip and no mirror yet: the first phase has not taught them */, hunt: { strip: true, key: true }, comeback: { strip: true, key: true }, skipped: { strip: true, key: true },
  posts: { posts: true }, ends: { posts: true }, self: { posts: true },
  full: { key: true }, forever: { key: true }, count: {}, ways: {},
  free: { strip: true, key: true },
};

const ppFactors = (N: number) => { const out: number[] = []; for (let k = 1; k <= N; k++) if (N % k === 0) out.push(k); return out; };
/* the first number at which a pair comes back (or reads the same both ways) */
const ppBack = (N: number) => ppFactors(N).find((k) => k * k >= N) || N;
const ppBlank = (N: number, kind: string): any => ({
  N, kind, A: 0, tried: {}, pairs: [], mirrors: [], mirrorOn: false, show: null, reveal: null, turned: false, spin: 0,
  picks: { L: false, R: false }, postLit: false, shade: 0, tally: null, counted: [], cnt: { rows: 0, per: 0 }, touched: false, bare: false,
  /* the correction's own layer: drawn instead of this state while it runs, and never the child's answer */
  demo: null,
});
/* try k rows: a place tried once keeps its mark; with `pin`, a pair that fits pins into the pen, or settles against its mirror when it comes back */
const ppTry = (s: any, k: number, pin: boolean) => {
  if (!(k >= 1 && k <= s.N)) return s;
  const n: any = { ...s, A: k, show: null, reveal: null, turned: false, tally: null };
  if (s.tried[k]) return n;
  n.tried = { ...s.tried, [k]: s.N % k === 0 ? "pass" : "fail" };
  if (pin && s.N % k === 0) {
    const b = s.N / k;
    if (b >= k) { if (!n.pairs.some((p: number[]) => p[0] === k)) n.pairs = [...n.pairs, [k, b]]; if (b === k) n.mirrorOn = true; }
    else if (n.pairs.some((p: number[]) => p[0] === b)) { if (!s.hide) n.mirrors = [...n.mirrors, [k, b]]; n.mirrorOn = true; }
    else n.pairs = [...n.pairs, [b, k]];
  }
  return n;
};
/* the lowest blank place: the one place the key will try */
const ppNext = (s: any) => { for (let k = 1; k <= s.N; k++) if (!s.tried[k]) return k; return 0; };
/* a blank place below one that was tried (a skipped trial) */
const ppGap = (s: any) => {
  const ks = Object.keys(s.tried).map(Number);
  if (!ks.length) return 0;
  const top = Math.max(...ks);
  for (let j = 1; j < top; j++) if (!s.tried[j]) return j;
  return 0;
};
/* how many failed places in a row end at the dial (a run of failures is driven on in one go) */
const ppStreak = (s: any) => { let c = 0; for (let k = s.A; k >= 1 && s.tried[k] === "fail"; k--) c++; return c; };
const ppList = (s: any) => ppSorted(s.pairs.flat());
const ppCards = (s: any) => [
  ...[...s.pairs].sort((p: number[], q: number[]) => p[0] - q[0]).map((p: number[]) => ({ a: p[0], b: p[1], mirror: false })),
  ...[...s.mirrors].sort((p: number[], q: number[]) => p[0] - q[0]).map((p: number[]) => ({ a: p[0], b: p[1], mirror: true })),
];
const ppPen = (count: number) => {
  const pitch = Math.min(PEN.pitch, PEN.span / Math.max(count, 1)), w = Math.min(PEN.cardW, pitch - 10);
  return { pitch, w, x: (j: number) => PEN.x0 + j * pitch + (pitch - w) / 2 };
};
/* counters in rows: a small gap after every fifth in a row, and a wall between rows */
const ppGrid = (rows: number, per: number, box: any) => {
  const cg = Math.floor((per - 1) / 5), gr = 0.45, gap = 28;
  /* the counter's size is the room allows (up to 72); many rows (57 rows of 1, 17 rows of 4) go in 2 to 4 blocks side by side,
     so every counter stays a round, countable disc instead of a squashed pill */
  const size = (nb: number) => Math.max(2.5, Math.min(72, (box.w - (nb - 1) * gap) / nb / (per + cg * gr), box.h / (Math.ceil(rows / nb) * 1.3)));
  let nb = 1, cs = size(1);
  for (let b = 2; b <= 4 && cs < 24; b++) { const c = size(b); if (c > cs) { nb = b; cs = c; } }
  const rb = Math.ceil(rows / nb), g = cs * gr, rg = cs * 0.3;
  const w = per * cs + cg * g, h = rb * cs + (rb - 1) * rg, W = nb * w + (nb - 1) * gap;
  const x0 = box.x + (box.w - W) / 2, y0 = box.y + (box.h - h) / 2;
  const bx = (r: number) => x0 + Math.floor(r / rb) * (w + gap);
  return { cs, cw: cs, rg, x0, y0, w, h, nb, rb, bx, x: (c: number, r = 0) => bx(r) + c * cs + Math.floor(c / 5) * g, y: (r: number) => y0 + (r % rb) * (cs + rg) };
};
/* m evenly spread indexes 0..len-1 (the hand taps a handful of rows or places, never two dozen) */
const ppPick = (len: number, m: number) => { const q = Math.min(len, m); return Array.from({ length: q }, (_, i) => (q === 1 ? 0 : Math.round((i * (len - 1)) / (q - 1)))); };
/* a loose heap of N counters (nothing arranged, no count printed): the same N every time, spread over jittered cells */
const ppHeap = (N: number, box: any) => {
  const wH = Math.min(box.w, box.h * 2.6);
  const cols = Math.max(2, Math.ceil(Math.sqrt((N * 1.35 * wH) / box.h))), rowsH = Math.ceil((N * 1.35) / cols);
  const cell = Math.min(wH / cols, box.h / rowsH, 64), total = cols * rowsH;
  let seed = N * 7919 + 13;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const cells = Array.from({ length: total }, (_, i) => i);
  for (let i = total - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); const t = cells[i]; cells[i] = cells[j]; cells[j] = t; }
  const hx = box.x + (box.w - cols * cell) / 2, hy = box.y + (box.h - rowsH * cell) / 2;
  return { cell, pts: cells.slice(0, N).map((c) => ({ x: hx + ((c % cols) + 0.5) * cell + (rnd() - 0.5) * cell * 0.3, y: hy + (Math.floor(c / cols) + 0.5) * cell + (rnd() - 0.5) * cell * 0.3 })) };
};
/* the pen full: every place tried up to the mirror, so every factor stands inside */
const ppFull = (N: number) => { let s = ppBlank(N, "full"); for (let k = 1; k <= N && !s.mirrorOn; k++) s = ppTry(s, k, true); return { ...s, bare: true }; };
/* the board a question (or the warm-up of a steps phase) opens on */
const ppSetup = (it: any, warm: boolean) => {
  if (warm) {
    if (it.kind === "lay") return { ...ppBlank(it.n, "lay"), show: { rows: it.rows, per: it.n / it.rows } };
    if (it.kind === "hunt") return ppBlank(it.n, "hunt");
    if (it.kind === "posts") return ppBlank(it.n, "posts");
    return ppFull(it.n);
  }
  const kind = it.kind || "free", N = it.n || 24;
  let s: any = ppBlank(N, kind);
  if (kind === "name" || kind === "partner") s = { ...s, show: { rows: it.rows, per: N / it.rows } };
  else if (kind === "skipped") s = ppTry(ppTry(s, 1, true), 3, true);   /* 1 and 3 tried, 2 jumped */
  else if (kind === "pair") s = { ...s, hide: true };   /* the mirror card is not taught yet in this phase */
  else if (kind === "ways") s = { ...ppFull(N), kind, mirrors: [] };   /* solid cards only: each one is laid out two ways round */
  else if (kind === "forever" || kind === "count") s = { ...ppFull(N), kind };
  return s;
};

const PP_CSS = `
.pp-pop{animation:ppPop 420ms cubic-bezier(.3,1.5,.5,1) both;transform-box:fill-box;transform-origin:center}
@keyframes ppPop{from{transform:scale(.55)}to{transform:none}}
.pp-spin{animation:ppSpin 650ms ease-out both;transform-box:fill-box;transform-origin:center}
@keyframes ppSpin{from{transform:rotate(-90deg)}to{transform:none}}
@media (prefers-reduced-motion:reduce){.pp-pop,.pp-spin{animation:none}}
`;

/* a linked pair card: the two numbers that multiply to the number, one above the other and joined by a drawn times sign
   (never a bar: a bar would read as a fraction), so the pair moves as one piece */
const ppTimes = (cx: number, cy: number, r: number, color: string, sw = 3.5) => (
  <path d={`M ${cx - r} ${cy - r} L ${cx + r} ${cy + r} M ${cx + r} ${cy - r} L ${cx - r} ${cy + r}`} stroke={color} strokeWidth={sw} strokeLinecap="round" fill="none" />
);
function PenCard({ x, y, w, a, b, mirror, lit }: any) {
  const cx = x + w / 2, h = PEN.cardH;
  /* a number the count has touched sits on a pill as wide as its digits (never a disc a two-digit number overflows), clear of the sign */
  const on = (v: any) => v !== "" && lit && lit.indexOf(v) >= 0;
  const pill = (v: any, ty: number) => {
    const pw = Math.min(w - 8, String(v).length * 26 + 16);
    return on(v) ? <rect x={cx - pw / 2} y={y + ty - 31} width={pw} height={34} rx={17} fill={tint(PP_AMBER, 0.55)} /> : null;
  };
  const half = (v: any, ty: number) => (v === "" ? (
    <rect x={x + 10} y={y + ty - 36} width={w - 20} height={40} rx={10} fill="none" stroke={PP_BLUE} strokeWidth={2} strokeDasharray="6 5" />
  ) : (
    <text x={cx} y={y + ty} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={PP_BLUE_INK}>{v}</text>
  ));
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={14} fill={mirror ? tint(PP_BLUE, 0.9) : "#FFFFFF"} stroke={PP_BLUE} strokeWidth={3} strokeDasharray={mirror ? "9 6" : undefined} />
      {pill(a, 42)}
      {pill(b, 98)}
      {half(a, 42)}
      {ppTimes(cx, y + 55, 5, a === "" || b === "" ? tint(PP_BLUE, 0.5) : PP_BLUE)}
      {half(b, 98)}
    </g>
  );
}

/* Nothing is written here that the bubble already says. `wrong` = { value, tries } after a miss:
   lock, redraw the mathematics in steps (the traceback) on a layer of its own, unlock; never mark it, never reset the child's work.
   stage === "free" is Free play: every control unlocked, nothing to get right. */
function Work({ phase, n, item, index, stage, wrong, api, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const pn = n || phase || 1;
  const P: any = PHASES[pn - 1] || PHASES[0];
  /* a steps phase opens on stage "teach" for a frame before "demo": both draw the warm-up number, never question 1's own */
  const warm = !free && !!P.steps && (stage === "demo" || stage === "teach");
  const qk = free ? "free" : pn + ":" + (warm ? "w" : index);
  /* the picture's size and place are the same with the keypad open or shut (LAYOUT section 3): it sits at PICT_X, never centred */
  const x0 = PICT_X;

  /* the board is derived in RENDER from the entry (the question, or the warm-up, or a phase entered afresh), never from an effect:
     an effect would draw the old board for a frame, or run late and wipe an act */
  const sRef = useRef<any>(null);
  const seen = useRef<any>({ qk: "", stage: "" });
  const lastSent = useRef("");           /* the list Enter last sent: the same one is never sent again unchanged after a miss */
  const lastPost = useRef({ side: "", t: 0 });
  if (!sRef.current || seen.current.qk !== qk || (stage === "teach" && seen.current.stage !== "teach")) {
    sRef.current = { ...ppSetup(free ? { kind: "free", n: 24 } : warm ? P.warm : item, warm), qk };
    lastSent.current = "";
  }
  seen.current = { qk, stage };
  const [, bump] = useState(0);
  const [acting, setActing] = useState(false);
  const playing = useRef(false);
  const acted = useRef(false);
  const lastKey = useRef(0);
  const up = (nx: any) => { sRef.current = nx; bump((v: number) => v + 1); };
  const cur = () => sRef.current;

  const s = cur(), N = s.N, kind = s.kind, K = KINDS[kind] || KINDS.free;
  const bh = K.strip ? 200 : K.key ? 288 : 360;
  /* the counting numerals (partner and the first warm-up) stand above the first row: leave them 84 under the board's top, clear of the caption */
  const aTop = kind === "partner" || kind === "lay" ? 100 : 44;
  const abox = { x: ARR_X, y: BRD_Y + aTop, w: ARR_W, h: bh - aTop - 14 };
  const capY = BRD_Y + (lang === "en" ? 36 : 48);   /* Devanagari and Gujarati carry marks above the line: the caption drops a little */
  const live = !acting && !tl.busy && (stage === "ask" || stage === "demo" || free);
  const off = (p: any) => ({ x: p.x + x0, y: p.y });

  /* ── the correction's layer ── */
  const D = () => cur().demo || cur();
  const dset = (f: any) => () => { const x = D(); up({ ...cur(), demo: { ...f(x), demo: null } }); };

  /* ── the child's acts: each is performed on screen by the hand (api.act), and counts only when it resolves true ── */
  const doAct = async (fn: any) => {
    if (playing.current) return false;
    playing.current = true; setActing(true);
    let ok = false;
    try { ok = await fn(); } finally { playing.current = false; setActing(false); }
    return !!ok;
  };
  const hand = (moves: string, at: any[], onPoint?: any, extra: any = {}) => api.act({ tool: "hand", moves, at: at.map(off), onPoint, ...extra });
  /* every act of the child clears what an agent gave (`given`) and the correction's layer */
  const touch = (x: any) => ({ ...x, touched: true, demo: null, given: null });

  /* Try: lay the number out in the next number of rows; a pair that fits pins into the pen, one that does not leaves its counters on the shelf */
  const tryOne = async (drive: boolean) => {
    const x = cur();
    if (!live) return;
    const first = ppNext(x);
    if (!first) return;   /* the key stays live past the mirror light: driving on keeps handing back mirrors */
    acted.current = true;
    if (!drive) {
      const k = first, per = Math.floor(N / k), g = ppGrid(k, per, abox), idx = ppPick(k, 10);
      up({ ...touch(x), show: { rows: k, per }, reveal: 0 });
      const ok = await doAct(() => hand("sweep", idx.map((r) => ({ x: g.bx(r) + Math.min(30, g.w / 2), y: g.y(r) + g.cs / 2 })), (i: number) => up({ ...cur(), reveal: idx[i] + 1 })));
      if (!ok) { up({ ...cur(), show: null, reveal: null }); return; }
      const was = cur().tried[k];
      const nx = ppTry(touch(cur()), k, true);
      up(nx);
      if (!was) { if (nx.tried[k] === "pass") api.sfx.settle(); else api.sfx.tick(); }
      api.did("try");
      return;
    }
    /* a run of failures: the hand pushes along the run and every place on the way is tried in turn, stopping at the next pair */
    const ks: number[] = [];
    for (let k = first; k <= N; k++) { ks.push(k); if (N % k === 0) break; }
    const idx = ppPick(ks.length, 12), last = ks[ks.length - 1], fw = last > RUN.n ? last - RUN.n + 1 : 1;
    let done = -1;
    const step1 = (upto: number) => { let nx: any = touch(cur()); for (let j = done + 1; j <= upto; j++) nx = ppTry(nx, ks[j], true); done = upto; up(nx); };
    const ok = await doAct(() => hand("sweep", idx.map((j) => ({ x: Math.max(20, (ks[j] - fw) * RUN.pitch + RUN.pitch / 2), y: RUN.y + RUN.h / 2 })), (i: number) => { step1(idx[i]); api.sfx.tick(); }));
    if (done < ks.length - 1) step1(ks.length - 1);
    if (!ok) return;
    if (cur().tried[last] === "pass") api.sfx.settle();
    api.did("try");
  };

  /* Count rows / Count a row (the first phase's warm-up): the hand taps down the rows, then along one row */
  const countLay = async () => {
    const x = cur();
    if (!live || !x.show) return;
    const g = ppGrid(x.show.rows, x.show.per, abox);
    acted.current = true;
    if (!x.cnt.rowsDone) {
      const at = Array.from({ length: x.show.rows }, (_, r) => ({ x: g.x0 + g.cs / 2, y: g.y(r) + g.cs / 2 }));
      const ok = await doAct(() => hand("tap", at, (i: number) => up({ ...touch(cur()), cnt: { ...cur().cnt, rows: i + 1 } })));
      if (!ok) return;
      up({ ...cur(), cnt: { ...cur().cnt, rows: x.show.rows, rowsDone: true } });
      api.sfx.settle(); api.did("count");
    } else if (!x.cnt.perDone) {
      const at = Array.from({ length: x.show.per }, (_, c) => ({ x: g.x(c) + g.cw / 2, y: g.y(0) + g.cs / 2 }));
      const ok = await doAct(() => hand("tap", at, (i: number) => up({ ...touch(cur()), cnt: { ...cur().cnt, per: i + 1 } })));
      if (!ok) return;
      up({ ...cur(), cnt: { ...cur().cnt, per: x.show.per, perDone: true } });
      api.sfx.settle(); api.did("count");
    }
  };
  /* Pin: the hand carries the pair, lifted into one linked card, into the pen */
  const pinOne = async () => {
    const x = cur();
    if (!live || !x.show || x.pairs.length) return;
    const a = x.show.rows, b = x.show.per, g = ppPen(1);
    const from = { x: abox.x + abox.w / 2, y: abox.y + abox.h / 2 }, to = { x: g.x(0) + g.w / 2, y: PEN.cardY + PEN.cardH / 2 };
    acted.current = true;
    const ok = await doAct(() => api.act({ tool: "hand", moves: "carry", from: off(from), at: [off(to)], to: off(to),
      hold: <g transform={`translate(${-g.w / 2},${-PEN.cardH / 2})`}><PenCard x={0} y={0} w={g.w} a={a} b={b} /></g> }));
    if (!ok) return;
    up({ ...touch(cur()), pairs: [[a, b]], counted: [a, b] });
    api.sfx.settle(); api.did("pin");
  };
  /* Shade: the hand sweeps along the pen and the stretch between the posts is coloured in */
  const shadeOne = async () => {
    const x = cur();
    if (!live || x.shade >= 1) return;
    acted.current = true;
    const at = Array.from({ length: 5 }, (_, i) => ({ x: PEN.x0 + (PEN.span * (i + 0.5)) / 5, y: PEN.h / 2 }));
    const ok = await doAct(() => hand("sweep", at, (i: number) => up({ ...touch(cur()), postLit: true, shade: (i + 1) / 5 })));
    if (!ok) return;
    up({ ...touch(cur()), postLit: true, shade: 1 });
    api.sfx.settle(); api.did("shade");
  };
  /* Count (the last phase's warm-up): the hand taps every factor in the pen, and the count climbs on the board */
  const countFull = async () => {
    const x = cur();
    if (!live || x.tally) return;
    const fs = ppFactors(N), cards = ppCards(x), pg = ppPen(cards.length);
    const where = (f: number) => {
      let j = cards.findIndex((c: any) => !c.mirror && c.a === f); if (j >= 0) return { x: pg.x(j) + pg.w / 2, y: PEN.cardY + 28 };
      j = cards.findIndex((c: any) => !c.mirror && c.b === f); return { x: pg.x(Math.max(0, j)) + pg.w / 2, y: PEN.cardY + 80 };
    };
    acted.current = true;
    up({ ...touch(x), tally: { items: [], unit: "factors" }, counted: [] });
    const ok = await doAct(() => hand("tap", fs.map(where), (i: number) => up({ ...cur(), tally: { items: fs.slice(0, i + 1).map(String), unit: "factors" }, counted: fs.slice(0, i + 1) })));
    if (!ok) return;
    api.sfx.settle(); api.did("count");
  };
  /* a post dropped through the board: one row of the number, or that many rows of one */
  const dropPost = (side: string) => {
    const x = cur(), name = side === "L" ? "post-left" : "post-right";
    if (!live || !K.posts) return;
    if (warm && stepOn && name !== stepOn) { api.did(name); return; }
    const now = Date.now();
    if (lastPost.current.side === side && now - lastPost.current.t < 400) return;   /* a double tap on one post is one tap, not on and off */
    lastPost.current = { side, t: now };
    acted.current = true;
    const picks = kind === "posts" ? { ...x.picks, [side]: !x.picks[side] } : x.picks;
    up({ ...touch(x), picks, A: 0, reveal: null, tally: null, show: side === "L" ? { rows: 1, per: x.N } : { rows: x.N, per: 1 } });
    api.sfx.tick(); api.did(name);
  };
  const setN = (v: number) => {
    if (!free || !live) return;
    const N1 = Math.max(2, Math.min(NMAX, v));
    if (N1 !== cur().N) up({ ...ppBlank(N1, "free"), qk: cur().qk });
  };

  /* the one bottom key: its label follows the act, its data-control is the act (a guide step's `on`) */
  const isDrive = (x: any) => ppStreak(x) >= 2 && !ppGap(x);
  const keyOf = (x: any) => {
    if (!K.key || !(stage === "ask" || stage === "demo" || free)) return null;
    if (stage === "demo" && !stepOn) return null;   /* every guide step is done: the last act's result holds, no key waits */
    if (kind === "lay") return !x.cnt.rowsDone ? { id: "count", label: "Count rows" } : !x.cnt.perDone ? { id: "count", label: "Count a row" } : !x.pairs.length ? { id: "pin", label: "Pin" } : null;
    if (kind === "full") return x.shade < 1 ? { id: "shade", label: "Shade" } : !x.tally ? { id: "count", label: "Count" } : null;
    if (kind === "forever") return x.shade < 1 ? { id: "shade", label: "Shade" } : null;
    const k = ppNext(x);
    if (!k) return null;
    return isDrive(x) ? { id: "try", label: "Go on" } : { id: "try", label: "Try", k };
  };
  const act = (on: string) => {
    if (on === "count") { if (cur().kind === "lay") countLay(); else countFull(); }
    else if (on === "pin") pinOne();
    else if (on === "try") tryOne(isDrive(cur()));
    else if (on === "shade") shadeOne();
    else if (on === "post-left") dropPost("L");
    else if (on === "post-right") dropPost("R");
  };
  const pressKey = (id: string) => {
    const t = Date.now();
    if (t - lastKey.current < 250) return;   /* one tap never also presses the key its label changes into (an act that is playing already blocks a second one) */
    lastKey.current = t;
    act(id);
  };

  /* an answer made on the working area: what Enter sends, and when the Enter key may blink */
  const valueOf = (x: any) => {
    if (x.given != null) return String(x.given);   /* an agent's answer goes as it was given: a wrong list is a miss, never quietly corrected */
    if (kind === "pair") { const p = x.pairs[x.pairs.length - 1]; return p ? `${p[0]} × ${p[1]}` : ""; }
    if (kind === "hunt") return ppList(x).join(", ");
    if (kind === "posts") return [x.picks.L ? 1 : 0, x.picks.R ? x.N : 0].filter((v) => v > 0).join(", ");
    return null;
  };
  const owns = !free && stage === "ask" && item && item.pad === "enter";
  /* the Enter key blinks once there is something to send; on the hunt only once the mirror light is on (the list is then whole, and the
     child sees why). Enter always works, so a child may send early and miss */
  const ready = kind === "pair" ? s.pairs.length > 0 : kind === "hunt" ? s.mirrorOn : kind === "posts" ? s.picks.L || s.picks.R : false;
  /* Enter (and the agent's check) go here for an answer made on the picture; in a steps phase they perform the CURRENT step */
  const enterFn: any = stage === "demo" && stepOn ? () => act(stepOn) : owns ? () => {
    if (tl.busy || playing.current) return;
    /* after a miss the correction's own work is on screen: nothing is sent until the child acts again */
    if (wrong && !acted.current) return;
    const v = valueOf(cur());
    if (!v) return;
    if (wrong && v === lastSent.current) return;   /* the unchanged answer that just missed is not sent again: no second try, the hint stays */
    lastSent.current = v;
    api.submit(v);
  } : null;
  api.onEnter(enterFn);
  HOOK.enter = () => enterFn && enterFn();
  HOOK.set = (v: any) => {
    const x = cur();
    if (stage !== "ask" || tl.busy || playing.current) return false;
    const xs = ppNums(v);
    /* what the agent gives is kept AS GIVEN (`given`, what Enter sends); the picture draws only what is true in it, so a wrong list is
       judged a miss. A value the picture cannot hold at all (one number for a pair, no number for a list) is refused */
    if (kind === "pair") {
      if (xs.length !== 2) return false;
      acted.current = true;
      const a = Math.min(...xs), b = Math.max(...xs);
      up(a * b === x.N ? { ...touch(x), A: a, tried: { ...x.tried, [a]: "pass" }, pairs: [[a, b]], given: v } : { ...touch(x), given: v });
      return true;
    }
    if (kind === "hunt") {
      if (!xs.length) return false;
      acted.current = true;
      const firsts = ppSorted(xs.filter((f) => f >= 1 && f <= x.N && x.N % f === 0).map((f) => Math.min(f, x.N / f)));
      let nx: any = ppBlank(x.N, kind);
      const top = firsts.length ? firsts[firsts.length - 1] : 0;
      for (let k = 1; k <= top; k++) nx = ppTry(nx, k, false);
      up({ ...nx, qk: x.qk, pairs: firsts.map((f) => [f, x.N / f]), mirrorOn: firsts.some((f) => f * f >= x.N), touched: true, given: v });
      return true;
    }
    if (kind === "posts") {
      if (!xs.length) return false;
      acted.current = true;
      up({ ...touch(x), picks: { L: xs.indexOf(1) >= 0, R: xs.indexOf(x.N) >= 0 }, given: v });
      return true;
    }
    return false;
  };
  /* the win line: ONE sentence, said at the right answer (the phase's closing replaces the last one on the bubble) */
  useEffect(() => {
    if (stage === "win" && !free && item && item.win) api.say(item.win);
  }, [stage, index]);

  /* ── the traceback: the maths redrawn on a layer of its own, ending on the whole right answer, unmarked ── */
  const tallyS = (items: string[], marks: number[][], unit: string) => {
    const S: any[] = [[300, dset((x: any) => ({ ...x, shade: 1, postLit: true, show: null, bare: true, tally: { items: [], unit }, counted: [] }))]];
    items.forEach((t, i) => S.push([430, () => { dset((x: any) => ({ ...x, tally: { items: [...x.tally.items, t], unit }, counted: [...x.counted, ...marks[i]] }))(); api.sfx.tick(); }]));
    S.push([500, null]);
    return S;
  };
  const driveS = (to: number, ms: number) => {
    const S: any[] = [];
    for (let k = 1; k <= to; k++) { const j = k; S.push([ms, () => { dset((x: any) => ppTry({ ...x, show: null, bare: false }, j, true))(); }]); }
    return S;
  };
  const dropS = (side: string) => dset((x: any) => ({ ...x, postLit: true, A: 0, show: side === "L" ? { rows: 1, per: x.N } : { rows: x.N, per: 1 } }));
  const tracebackSteps = (): any[] => {
    const N0 = N, k0 = item ? item.kind : kind, rows0 = item && item.rows ? item.rows : 1;
    const fs = ppFactors(N0);
    switch (k0) {
      case "name": return [[200, dset((x: any) => ({ ...x, turned: false }))], [1000, dset((x: any) => ({ ...x, turned: true, spin: x.spin + 1 }))],
        [1600, () => { dset((x: any) => ({ ...x, pairs: [[rows0, N0 / rows0]], counted: [rows0, N0 / rows0] }))(); api.sfx.settle(); }], [900, null]];
      case "partner": {
        const per = N0 / rows0, S: any[] = [[200, dset((x: any) => ({ ...x, cnt: { rows: 0, per: 0 } }))]];
        for (let j = 1; j <= per; j++) { const c = j; S.push([130, dset((x: any) => ({ ...x, cnt: { ...x.cnt, per: c } }))]); }
        S.push([700, () => { dset((x: any) => ({ ...x, pairs: [[rows0, per]], counted: [rows0, per] }))(); api.sfx.settle(); }], [900, null]);
        return S;
      }
      case "pair": return [[200, dset((x: any) => ppTry({ ...x, show: null }, 1, true))], [1300, dset((x: any) => ppTry(x, 2, true))], [1200, null]];
      case "hunt": return [...driveS(ppBack(N0), 260), [300, null], ...tallyS(fs.map(String), fs.map((f) => [f]), "factors")];
      case "comeback": return [...driveS(ppBack(N0), 110), [1600, null]];
      case "skipped": return [[300, dset((x: any) => ppTry(x, 2, true))], [1800, null]];
      case "posts": case "ends": case "self":
        return [[100, dset((x: any) => ({ ...x, postLit: true }))], [500, null], [100, dropS("L")], [1700, null], [100, dropS("R")], [1700, null],
          [100, () => { dset((x: any) => ({ ...x, pairs: [[1, N0]], counted: [1, N0] }))(); api.sfx.settle(); }], [800, null]];
      case "forever": case "count": return tallyS(fs.map(String), fs.map((f) => [f]), "factors");
      case "ways": {
        const items: string[] = [], marks: number[][] = [];
        fs.filter((a) => a > 1 && a * a <= N0).forEach((a) => {
          const b = N0 / a;
          items.push(`${a} × ${b}`); marks.push([a, b]);
          if (b !== a) { items.push(`${b} × ${a}`); marks.push([a, b]); }
        });
        return tallyS(items, marks, "ways");
      }
    }
    return [[600, null]];
  };
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    acted.current = false;
    api.lock(true);
    up({ ...cur(), demo: { ...cur(), demo: null } });
    tl.run(tracebackSteps(), () => api.lock(false));
  }, [wrong]);
  /* a correction (or an act) outlives its question: stop it, and give the pad back, whenever the entry changes */
  useEffect(() => () => { tl.stop(); api.lock(false); }, [qk]);
  /* Enter blinks only when there is something to send AND, after a miss, the child has acted since (Enter changes nothing until then).
     This effect comes AFTER the correction's, which resets `acted` for the new miss, so the key never blinks for a frame; the act itself
     is a dependency, so the first act after the miss brings the blink back */
  useEffect(() => {
    if (owns) api.answerReady(!!ready && !(wrong && !acted.current));
  }, [ready, stage, index, wrong, acted.current]);

  /* what the host and the agent read back (toolApi.getState) */
  api.share({
    number: N,
    dialA: s.A, dialB: s.A >= 1 ? Math.floor(N / s.A) : 0,
    triedFirsts: Object.keys(s.tried).map(Number).sort((p, q) => p - q),
    pinned: [...s.pairs].sort((p: number[], q: number[]) => p[0] - q[0]),
    mirrored: s.mirrorOn,
    factorCount: s.tally && s.tally.unit === "factors" ? s.tally.items.length : null,
    complete: stage === "idle",
  });

  /* ── drawing: the correction's layer while it is on show, else the child's own work ── */
  const v = s.demo || s;
  const cards = ppCards(v);
  /* a post the child has tapped is ringed; nothing in the pen shows how many posts the answer needs */
  const pg = ppPen(Math.max(1, cards.length));
  let mx: number | null = null;
  if (v.mirrorOn) {
    const sq = cards.findIndex((c: any) => c.a === c.b), mk = cards.findIndex((c: any) => c.mirror);
    if (sq >= 0) mx = pg.x(sq) + pg.w / 2; else if (mk > 0) mx = pg.x(mk) - (pg.pitch - pg.w) / 2;
  }
  const spec = v.tally || v.bare ? null : v.show ? (v.turned ? { rows: v.show.per, per: v.show.rows } : v.show) : v.A >= 1 ? { rows: v.A, per: Math.floor(N / v.A) } : null;
  const rv = spec ? (v.reveal == null ? spec.rows : Math.min(v.reveal, spec.rows)) : 0;
  const grid = spec ? ppGrid(spec.rows, spec.per, abox) : null;
  const spare = spec && rv >= spec.rows ? Math.max(0, N - spec.rows * spec.per) : 0;
  const quiet = mix(C.ink, C.panel, 0.5);
  const key = keyOf(s);
  const keyX = (WD - KEYB.w) / 2;
  const kLabel = key ? (key.k ? tx(key.label) + " " + key.k : tx(key.label)) : "";

  /* the buttons: a real button (<Skin name="button">) over every counter, the plain disc under it as the fallback. Past 40 counters on a
     screen (the check's cap) every counter is plain, so 46, 57, 65, 68, 78 and 99 are drawn plain and never half and half */
  const useSkin = N <= 40;
  /* counters: each is its own element with a clear box */
  const counters: any[] = [];
  if (spec && grid) {
    for (let r = 0; r < rv; r++) for (let c = 0; c < spec.per; c++) {
      const cx = grid.x(c, r) + grid.cs / 2, cy = grid.y(r) + grid.cs / 2, i = r * spec.per + c;
      counters.push(grid.cs >= 16
        ? <Disc key={i} x={cx} y={cy} r={grid.cs * 0.42} paint="gTen" flat />
        : <circle key={i} cx={cx} cy={cy} r={Math.max(1.2, grid.cs * 0.42)} fill={PP_AMBER} />);
      if (useSkin && grid.cs >= 16) counters.push(<Skin key={"sk" + i} name="button" x={cx - grid.cs * 0.46} y={cy - grid.cs * 0.46} w={grid.cs * 0.92} h={grid.cs * 0.92} />);
    }
  }
  /* a loose heap of the number's counters, before the first Try (the pair, the hunt and the comeback questions, and free play) */
  const heap = (kind === "pair" || kind === "hunt" || kind === "comeback" || kind === "free") && !spec && !v.tally && !v.bare ? ppHeap(N, abox) : null;
  const sc = Math.min(spare, 6), sr = Math.ceil(spare / 6);
  const shelfH = bh - 12 - 12, scs = spare ? Math.min(40, (SHELF.w - 24) / sc, (shelfH - 90) / sr) : 0;
  const Pn = Math.min(RUN.n, N), first = v.A > Pn ? v.A - Pn + 1 : 1, gap = K.strip ? ppGap(v) : 0;
  /* the one invite: in the guide steps, in free play and where the answer is made on the picture (Enter stays steady until it is ready);
     a typed or choice question has its own blinking key, so nothing else pulses beside it */
  const invite = !live || s.touched || !(warm || free || owns) ? null
    : K.posts ? (warm ? (stepOn === "post-right" ? "R" : "L") : null)   /* a post is a candidate answer: only the guide steps ring one */
      : key ? "key" : null;

  return (
    <g transform={`translate(${x0},0)`}>
      <style>{PP_CSS}</style>

      {/* ── the pen, shut by its two posts from the first frame ── */}
      <rect x={0} y={0} width={WD} height={PEN.h} rx={20} fill={tint(C.panel, 0.5)} stroke={C.rule} strokeWidth={2} />
      {v.shade > 0 && <rect x={PEN.post} y={5} width={(WD - 2 * PEN.post) * v.shade} height={PEN.h - 10} fill={PP_AMBER} fillOpacity={0.16} />}
      {v.shade >= 1 && <path d={`M ${PEN.post + 14} 14 H ${PEN.post + 4} V ${PEN.h - 14} H ${PEN.post + 14} M ${WD - PEN.post - 14} 14 H ${WD - PEN.post - 4} V ${PEN.h - 14} H ${WD - PEN.post - 14}`} fill="none" stroke={PP_AMBER_INK} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />}
      {[{ x: 0, t: 1 }, { x: WD - PEN.post, t: N }].map((p, i) => (
        <g key={"post" + i}>
          {(v.postLit || (kind === "posts" && (i === 0 ? v.picks.L : v.picks.R))) && <rect x={p.x - 3} y={1} width={PEN.post + 6} height={PEN.h - 2} rx={14} fill="none" stroke={PP_AMBER} strokeWidth={5} />}
          <rect x={p.x} y={4} width={PEN.post} height={PEN.h - 8} rx={12} fill={PP_POST} />
          <text x={p.x + PEN.post / 2} y={PEN.h / 2 + 17} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill="#FFFFFF">{p.t}</text>
        </g>
      ))}
      {mx !== null && <line x1={mx} y1={PEN.cardY - 6} x2={mx} y2={PEN.h - 8} stroke={PP_AMBER_INK} strokeWidth={4} strokeDasharray="10 7" />}
      {cards.map((c: any, j: number) => (
        <g key={`${c.a}-${c.b}-${c.mirror ? "m" : "p"}`} className="pp-pop">
          <PenCard x={pg.x(j)} y={PEN.cardY} w={pg.w} a={c.a} b={c.b} mirror={c.mirror} lit={c.mirror ? null : v.counted} />
        </g>
      ))}
      {K.posts && (
        <g>
          <Hit id="post-left" label="Left post" x={0} y={0} w={PEN.post} h={PEN.h} enabled={live} onPress={() => dropPost("L")} />
          <Hit id="post-right" label="Right post" x={WD - PEN.post} y={0} w={PEN.post} h={PEN.h} enabled={live} onPress={() => dropPost("R")} />
        </g>
      )}

      {/* ── the ruled board and the leftover shelf ── */}
      <rect x={0} y={BRD_Y} width={WD} height={bh} rx={20} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
      {spec && (
        <text x={24} y={capY} fontSize={T.label} fontWeight={700} fill={C.ink}>{spec.rows} {tx(spec.rows === 1 ? "row" : "rows")}</text>
      )}
      {heap && (
        <g data-role="heap" filter="url(#fShadowSoft)">
          {heap.pts.map((p: any, i: number) => (heap.cell >= 16
            ? <Disc key={"h" + i} x={p.x} y={p.y} r={heap.cell * 0.36} paint="gTen" flat />
            : <circle key={"h" + i} cx={p.x} cy={p.y} r={Math.max(1.5, heap.cell * 0.36)} fill={PP_AMBER} />))}
          {useSkin && heap.cell >= 16 && heap.pts.map((p: any, i: number) => (
            <Skin key={"hs" + i} name="button" x={p.x - heap.cell * 0.4} y={p.y - heap.cell * 0.4} w={heap.cell * 0.8} h={heap.cell * 0.8} />
          ))}
        </g>
      )}
      {spec && grid && (
        <g key={"arr" + v.spin} className={v.spin ? "pp-spin" : ""}>
          {grid.cs >= 10 && spec.rows <= 30 && Array.from({ length: rv }).map((_, r) => (
            <rect key={"w" + r} x={grid.bx(r) - 6} y={grid.y(r) - grid.rg / 2 + 1} width={grid.w + 12} height={grid.cs + grid.rg - 2} rx={Math.min(12, (grid.cs + grid.rg) / 2)} fill={tint(C.panel, 0.4)} />
          ))}
          <g filter="url(#fShadowSoft)">{counters}</g>
        </g>
      )}
      {spec && (
        <g>
          <rect x={SHELF.x} y={BRD_Y + 12} width={SHELF.w} height={shelfH} rx={16} fill="#FFFFFF" stroke={tint(PP_VERM, 0.35)} strokeWidth={2} strokeDasharray="8 6" />
          <text x={SHELF.x + SHELF.w / 2} y={BRD_Y + 56} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={PP_VERM_INK}>
            {rv >= spec.rows ? (spare ? <tspan>{spare} {tx("over")}</tspan> : tx("nothing over")) : ""}
          </text>
          {spare > 0 && Array.from({ length: spare }).map((_, i) => {
            const sx = SHELF.x + SHELF.w / 2 + ((i % 6) - (sc - 1) / 2) * scs, sy = BRD_Y + 86 + Math.floor(i / 6) * scs + scs / 2;
            return (
              <g key={"sp" + i}>
                <Disc x={sx} y={sy} r={scs * 0.42} paint="gPointer" />
                {useSkin && scs >= 16 && <Skin name="button" x={sx - scs * 0.46} y={sy - scs * 0.46} w={scs * 0.92} h={scs * 0.92} />}
                {useSkin && scs >= 16 && <circle cx={sx} cy={sy} r={scs * 0.5} fill="none" stroke={PP_VERM} strokeWidth={3} />}
              </g>
            );
          })}
        </g>
      )}
      {v.tally && (() => {
        const items = v.tally.items, cnt = items.length, big = v.tally.unit === "factors";
        const tp = Math.min(big ? 130 : 150, 800 / Math.max(cnt, 1)), cx0 = WD / 2 - (tp * (cnt - 1)) / 2, ty = BRD_Y + bh / 2 - 6;
        const unit = v.tally.unit === "ways" ? (cnt === 1 ? "way" : "ways") : cnt === 1 ? "factor" : "factors";
        return (
          <g data-role="tally">
            {items.map((t: string, i: number) => (
              <text key={i} x={cx0 + i * tp} y={ty} textAnchor="middle" fontSize={big ? T.xl : T.label} fontWeight={700} fill={PP_BLUE_INK}>{t}</text>
            ))}
            {cnt > 0 && <text x={WD / 2} y={ty + 74} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={PP_AMBER_INK}>{cnt} {tx(unit)}</text>}
          </g>
        );
      })()}

      {/* ── the run of first numbers: every place keeps its mark ── */}
      {K.strip && (
        <g>
          {Array.from({ length: Pn }).map((_, j) => {
            const k = first + j, t = v.tried[k], lit = gap === k, x = j * RUN.pitch, cx = x + RUN.pitch / 2;
            return (
              <g key={k}>
                <rect x={x + 3} y={RUN.y} width={RUN.pitch - 6} height={RUN.h} rx={10}
                  fill={lit ? tint(PP_AMBER, 0.6) : t === "pass" ? tint(PP_BLUE, 0.82) : "#FFFFFF"}
                  stroke={lit ? PP_AMBER_INK : t === "pass" ? PP_BLUE : t === "fail" ? tint(PP_VERM, 0.3) : C.rule}
                  strokeWidth={lit ? 4 : 2} strokeDasharray={!t && !lit ? "6 5" : undefined} />
                <text x={cx} y={RUN.y + 36} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={t === "pass" ? PP_BLUE_INK : C.ink}>{k}</text>
                {t === "fail" && <circle cx={cx} cy={RUN.y + 55} r={6} fill={PP_VERM} />}
                {t === "pass" && <rect x={cx - 10} y={RUN.y + 51} width={20} height={7} rx={3.5} fill={PP_BLUE} />}
              </g>
            );
          })}
          {v.A >= first && v.A < first + Pn && <path d={`M ${(v.A - first) * RUN.pitch + RUN.pitch / 2} ${RUN.y + RUN.h + 3} l 9 11 h -18 z`} fill={shade(C.accent, 0.1)} />}
          <g>
            <circle cx={Pn * RUN.pitch + 68} cy={RUN.y + 17} r={15} fill={v.mirrorOn ? PP_AMBER : "#FFFFFF"} stroke={v.mirrorOn ? PP_AMBER_INK : C.rule} strokeWidth={v.mirrorOn ? 4 : 3} />
            <text x={Pn * RUN.pitch + 68} y={RUN.y + 70} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("mirror")}</text>
          </g>
        </g>
      )}

      {/* ── the row counts of the first warm-up: the hand's taps leave their numbers ── */}
      {grid && spec && v.cnt && v.cnt.rows > 0 && Array.from({ length: Math.min(v.cnt.rows, spec.rows) }).map((_, r) => (
        <text key={"cr" + r} x={grid.x0 - 28} y={grid.y(r) + grid.cs / 2 + 14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={PP_AMBER_INK}>{r + 1}</text>
      ))}
      {grid && spec && v.cnt && v.cnt.per > 0 && Array.from({ length: Math.min(v.cnt.per, spec.per) }).map((_, c) => (
        <text key={"cc" + c} x={grid.x(c) + grid.cs / 2} y={grid.y0 - 12 - (c >= 9 && c % 2 === 0 ? 34 : 0)} textAnchor="middle" fontSize={spec.per <= 9 ? T.prompt : T.label} fontWeight={700} fill={PP_AMBER_INK}>{c + 1}</text>
      ))}

      {/* ── the bottom key (its label follows the act) and, in free play, the number dial ── */}
      {key && (
        <Key id={key.id} label={key.label} x={keyX} y={KEYB.y} w={KEYB.w} h={KEYB.h} C={C} tone="key" disabled={!live} onClick={() => pressKey(key.id)}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{kLabel}</text>
        </Key>
      )}
      {free && (
        <g>
          <Key id="number-down" label="Number down one" x={0} y={KEYB.y} w={72} h={72} C={C} disabled={!live || N <= 2} onClick={() => setN(cur().N - 1)}>
            <rect x={-15} y={-3.5} width={30} height={7} rx={3.5} fill={!live || N <= 2 ? quiet : C.ink} />
          </Key>
          <rect x={84} y={KEYB.y} width={104} height={72} rx={16} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
          <text x={136} y={KEYB.y + 52} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={PP_AMBER_INK}>{N}</text>
          <Key id="number-up" label="Number up one" x={200} y={KEYB.y} w={72} h={72} C={C} disabled={!live || N >= NMAX} onClick={() => setN(cur().N + 1)}>
            <rect x={-15} y={-3.5} width={30} height={7} rx={3.5} fill={!live || N >= NMAX ? quiet : C.ink} />
            <rect x={-3.5} y={-15} width={7} height={30} rx={3.5} fill={!live || N >= NMAX ? quiet : C.ink} />
          </Key>
        </g>
      )}

      {invite === "key" && <Invite x={keyX + KEYB.w / 2} y={KEYB.y + KEYB.h / 2} w={KEYB.w} h={KEYB.h} rx={RAD.key} C={C} />}
      {invite === "L" && <Invite x={PEN.post / 2} y={PEN.h / 2} w={PEN.post - 16} h={PEN.h - 16} rx={14} C={C} />}
      {invite === "R" && <Invite x={WD - PEN.post / 2} y={PEN.h / 2} w={PEN.post - 16} h={PEN.h - 16} rx={14} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: the pen with its two posts and the pair cards in it
   at that moment (digits and drawn signs only, so nothing is English in Hindi or Gujarati) */
function Thumb({ result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const L = (result && result.last) || {};
  const sh = L.shared || {};
  const N = sh.number;
  if (!N) return null;
  /* the last pair pinned: ONE card, so a two-digit number still fits at 28. With nothing pinned (a choice answer, or the pair the child's
     answer named) the card is that pair, or the outer pair 1 x the number that every number has */
  const pin: number[][] = sh.pinned || [];
  let last: number[] | null = pin.length ? pin[pin.length - 1] : null;
  if (!last) { const vs = ppNums(L.value); last = it && it.kind === "pair" && vs.length === 2 ? [vs[0], vs[1]] : [1, N]; }
  const pairs: number[][] = [last];
  const pw = 44, ph = h - 12, py = 6, cw = 104, gap = 4, ty = py + ph / 2 + 10;
  const cx0 = (w - cw) / 2;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <rect x={6} y={py} width={pw} height={ph} rx={8} fill={PP_POST} />
      <text x={6 + pw / 2} y={ty} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF">1</text>
      <rect x={w - 6 - pw} y={py} width={pw} height={ph} rx={8} fill={PP_POST} />
      <text x={w - 6 - pw / 2} y={ty} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF">{N}</text>
      {pairs.map((p, j) => {
        const x = cx0 + j * (cw + gap), mid = x + cw / 2;
        return (
          <g key={j}>
            <rect x={x} y={py} width={cw} height={ph} rx={8} fill="#FFFFFF" stroke={PP_BLUE} strokeWidth={2.5} />
            <text x={mid - 9} y={ty} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={PP_BLUE_INK}>{p[0]}</text>
            {ppTimes(mid, ty - 9, 4.5, PP_BLUE, 3)}
            <text x={mid + 9} y={ty} textAnchor="start" fontSize={T.micro} fontWeight={700} fill={PP_BLUE_INK}>{p[1]}</text>
          </g>
        );
      })}
    </g>
  );
}

function PairPen(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b) */
      board: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d, PATTERNS.md §16): no question bar, only its blinking key at the top right */
      keyOnly: true,
      /* the wide keypad: the answer panel is 556 wide and the picture has x 64 to 964 while it is open */
      bigPad: true,
      /* the Next key: nothing moves on by itself */
      nextKey: true,
      /* NAV DOTS: one small clickable dot per phase */
      navDots: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key */
      StartArt, START_HOOK,
      }} />
  );
}

export default PairPen;
