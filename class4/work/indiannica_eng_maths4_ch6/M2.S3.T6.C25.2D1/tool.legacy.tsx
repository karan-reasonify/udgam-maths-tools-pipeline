/* ═══ M2.S3.T6.C20.2D1 · overlap_rings · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them).

   The picture: two rings of cord whose factor lists stop at both ends (phase 1), the same two lists of
   multiples laid as open tracks that run off the edge (phase 2), and the divide gate that shares the
   bigger number into rows of the smaller with a leftover shelf (phases 3 and 4). */

const TOOL_ID = "overlap_rings";
const MEDIA_ID = "M2.S3.T6.C20.2D1";
const TOOL_NAME = "Overlap Rings";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["Two rings, overlapping in the middle. Something is going to end up in there."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "One overlap you could count, and one that kept on catching new numbers.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Any numbers in the rings, either mode, the gate open beside them.";

/* One entry per phase = one mount. Items carry the numbers their picture needs:
   rings a, b · tracks p, q (given = meetings the question already names) · gate big, small.
   near = the item's misconception, the wrong answer judge must reject. */
const PHASES = [
  {
    n: 1,
    concept: "Numbers that divide both",
    conceptId: "M2.S3.T6.C20", objectiveIds: ["O9"],
    says: ["Each ring holds the factors of its number. Tap a card to lift it into the middle."],
    /* tries, as the plan writes it: first rung the item's own miss (does that card divide the first
       number exactly?), second: does it divide the other as well?, third: fill both and lift by hand */
    ladder: ["Divide the number in each ring by the card. Nothing left over in both means it belongs in the middle.",
      "Keep only the cards that stand in both rings, and leave the rest where they are."],
    closing: "A common factor divides both numbers. 1 is a common factor of every pair of numbers.",
    learned: "You learned: the middle of two factor lists holds what goes into both.",
    traceback: "The divide gate opens beside the rings and tests each card the child moved wrongly on both numbers; a card that divides only one goes back to its ring, a shared card left out travels into the middle, and the gate reads out the whole shared list.",
    items: [
      /* learn ML1: answer in the plan = 1, 2, 7 and 14 */
      { qid: "M2.S3.T6.C20:ML1", kind: "common", a: 42, b: 70, answer: "1, 2, 7, 14", near: "1, 2, 3, 5, 6, 7, 10, 14, 21, 35, 42, 70", pad: "enter", winMs: 2200,
        say: "Write the factors of 42 and the factors of 70, and say which numbers turn up in both.",
        ask: "Factors of both 42 and 70?",
        miss: "Test each card in the middle. Does it go into 42 exactly, and into 70 as well?" },
      /* practice 1: answer in the plan = 1 and 2 */
      { qid: "M2.S3.T6.C20:1", kind: "common", a: 20, b: 34, answer: "1, 2", near: "2", pad: "enter", winMs: 2200,
        say: "Find the common factors of 20 and 34.",
        ask: "Factors of both 20 and 34?",
        miss: "Did every card in the middle go into 20 and into 34? Did a card that goes into both stay behind?" },
      /* practice 2: answer in the plan = Because 1 is a factor of every number, so it has to appear in
         both lists. Asked as the card that is in both lists for any pair; the win says why. */
      { qid: "M2.S3.T6.C20:2", kind: "always", a: 9, b: 16, answer: 1, near: 2, winMs: 2800,
        say: "Tap the number on a ring to change it. Which card turns up in both lists, whatever the two numbers are?",
        ask: "In both lists, every time?",
        miss: "Which card goes into every number exactly, whatever the number is?" },
      /* practice 6 (common factors of 30, 45 and 75) is left out: exactly three questions a phase */
    ],
  },
  {
    n: 2,
    concept: "Meeting points that never stop",
    conceptId: "M2.S3.T6.C21", objectiveIds: ["O9"],
    says: ["The rings are now tracks of multiples, and the tracks run on past the edge. Tap a flag to drop its number into the band."],
    ladder: ["Take a step on each track. Do the two tracks land on the same number again?",
      "A common multiple has a flag on the top track and on the bottom track. Look further along for the next meeting."],
    closing: "Common multiples never run out, because both of the lists they come from never run out.",
    learned: "You learned: multiples keep meeting for ever; factors come to an end.",
    traceback: "The tracks run on step by step; a number with a flag on only one track goes back up to it, each missing meeting is caught as two flags slide together into the band, and the band's list is read out; for the factor question the rings fill and their middle shuts while the band keeps catching.",
    items: [
      /* learn ML2: answer in the plan = No. There are infinitely many, and 48, 60 and 72 come next */
      { qid: "M2.S3.T6.C21:ML2", kind: "next3", p: 4, q: 6, given: [12, 24, 36], answer: "48, 60, 72", near: "42, 48, 54", pad: "enter", winMs: 2200,
        say: "The multiples of 4 and 6 meet at 12, 24 and 36. Is that all of them?",
        ask: "The next three meetings?",
        miss: "Run the tracks on past 36. Look for a number with a flag above and a flag below." },
      /* practice 4: answer in the plan = 20, 40, 60 and 80 */
      { qid: "M2.S3.T6.C21:4", kind: "first4", p: 4, q: 10, given: [], answer: "20, 40, 60, 80", near: "10, 20, 30, 40", pad: "enter", winMs: 2200,
        say: "Write the first four common multiples of 4 and 10.",
        ask: "First four meetings of 4 and 10?",
        miss: "Does each number in the band have a flag on the 4 track and on the 10 track?" },
      /* authored: the plan has two questions for this phase. This is the phase's second misconception
         (common factors must go on for ever too), with the rings on the same two numbers. */
      { qid: null, kind: "stops", p: 4, q: 10, answer: "stop", near: "never", winMs: 2600,
        choices: [{ id: "stop", label: "they stop" }, { id: "never", label: "never stop" }],
        say: "The common multiples of 4 and 10 never run out. What about the common factors of 4 and 10?",
        ask: "Common factors of 4 and 10?",
        miss: "The rings above hold the same two numbers. Could their middle keep on filling?" },
    ],
  },
  {
    n: 3,
    concept: "One division instead of two lists",
    conceptId: "M2.S3.T6.C22", objectiveIds: ["O10"],
    says: ["Must you write both lists to find out? Try one division instead.",
      "Tap divide, and the gate shares the bigger number into equal rows."],
    ladder: ["Put the bigger number into the gate and divide it by the smaller.",
      "The quotient is the number of full rows. The remainder is whatever sits on the shelf."],
    closing: "One division settles it. Divide the bigger number by the smaller, and look at what is left.",
    learned: "You learned: one division shows if a number is a multiple of another.",
    traceback: "The gate deals the bigger number into rows of the smaller again, counting each row, and sets what is left on the shelf; if the child divided the smaller by the bigger, that board is drawn first (no full row, all of it on the shelf) and both stay written; it ends on the quotient and the remainder.",
    items: [
      /* learn ML3: answer in the plan = Yes, because 112 divided by 8 is 14 with nothing over */
      { qid: "M2.S3.T6.C22:ML3", kind: "gate", big: 112, small: 8, answer: [14, 0], near: [0, 8], winMs: 5200,
        parts: [{ label: "quotient" }, { label: "remainder" }],
        say: "Is 112 a multiple of 8? Find out without writing either list. Divide, and give the quotient and the remainder.",
        ask: "112 ÷ 8: quotient and remainder?",
        miss: "Share 112 into rows of 8. How many full rows are there, and what is left?" },
      /* practice 3: answer in the plan = Yes, because 45 divided by 5 is 9 with nothing over */
      { qid: "M2.S3.T6.C22:3", kind: "gate", big: 45, small: 5, answer: [9, 0], near: [0, 5], winMs: 5200,
        parts: [{ label: "quotient" }, { label: "remainder" }],
        say: "Is 45 a multiple of 5? Divide it, then give both numbers.",
        ask: "45 ÷ 5: quotient and remainder?",
        miss: "Count the full rows of 5 on the board, then count what sits on the shelf." },
      /* practice 5: answer in the plan = Yes, because 126 divided by 7 is 18 with nothing over */
      { qid: "M2.S3.T6.C22:5", kind: "gate", big: 126, small: 7, answer: [18, 0], near: [0, 7], winMs: 5200,
        parts: [{ label: "quotient" }, { label: "remainder" }],
        say: "Is 126 a multiple of 7? Divide, and say how many rows there are and what is left.",
        ask: "126 ÷ 7: quotient and remainder?",
        miss: "Which number is shared out, 126 or 7? Share the bigger number into rows of the smaller." },
    ],
  },
  {
    n: 4,
    concept: "What a remainder rules out",
    conceptId: "M2.S3.T6.C23", objectiveIds: ["O10"],
    says: ["Something is left over. Say the two things that tells you.", "Tap divide to run the gate, then read the shelf."],
    ladder: ["What does anything on the shelf say about these two numbers?",
      "With nothing on the shelf, the bigger is a multiple and the smaller is a factor."],
    closing: "A remainder says the bigger number is not a multiple of the smaller. It also says the smaller is not a factor of the bigger.",
    learned: "You learned: a remainder rules out the multiple and the factor at once.",
    traceback: "The gate deals the rows again, counting each, and drops the leftover onto the shelf one at a time; the quotient and remainder are written beside the shelf, then the multiple statement and the factor statement are written under it, one after the other.",
    items: [
      /* learn ML4: the plan's answer names what the division rules OUT = that 74 is a multiple of 9,
         and that 9 is a factor of 74 (the remainder of 2 rules both of them out) */
      { qid: "M2.S3.T6.C23:ML4", kind: "rule", big: 74, small: 9, answer: "both", near: "multiple", winMs: 5600,
        choices: [{ id: "factor", label: "that 9 is a factor" }, { id: "multiple", label: "that 74 is a multiple" }, { id: "both", label: "both of these" }],
        say: "Divide 74 by 9. What does the answer rule out?",
        ask: "What does 74 ÷ 9 rule out?",
        miss: "A leftover settles more than the multiple question. What else does it settle?" },
      /* practice 7: answer in the plan = 135 divided by 8 is 16 with 7 left over, so 135 is not a
         multiple of 8 and 8 is not a factor of 135 (the two statements are written on the win) */
      { qid: "M2.S3.T6.C23:7", kind: "gate", big: 135, small: 8, answer: [16, 7], near: [17, 0], winMs: 5600,
        parts: [{ label: "quotient" }, { label: "remainder" }],
        say: "Divide 135 by 8 and say what that rules out.",
        ask: "135 ÷ 8: quotient and remainder?",
        miss: "Count the full rows of 8, then count the counters left on the shelf." },
      /* practice 8: answer in the plan = No. 57 divided by 4 is 14 with 1 left over, so 57 is not a multiple of 4 */
      { qid: "M2.S3.T6.C23:8", kind: "game", big: 57, small: 4, answer: "no", near: "yes", winMs: 5600,
        choices: [{ id: "yes", label: "yes, I may" }, { id: "no", label: "no, I may not" }],
        say: "In the board game you throw a 4 and want to move onto 57. You may land only on a multiple of 4. Divide to find out whether you may.",
        ask: "May you move onto 57?",
        miss: "How many counters sit on the shelf? Does a leftover of any size still count?" },
    ],
  },
];

/* Hindi and Gujarati, keyed by the exact English (docs/PATTERNS.md §11): the runtime reads it for
   every line it prints or speaks, and Work's tx() for the words it draws. Digits stay digits. */
const TR: any = {
  hi: {
    "Overlap Rings": "साझा घेरे",
    "Two rings, overlapping in the middle. Something is going to end up in there.": "दो घेरे, जो बीच में एक दूसरे पर चढ़े हैं। उस बीच वाली जगह में कुछ आने वाला है।",
    "One overlap you could count, and one that kept on catching new numbers.": "एक साझा हिस्सा तुम गिन सके। दूसरा नई संख्याएँ पकड़ता ही रहा।",
    "Free play. Any numbers in the rings, either mode, the gate open beside them.": "मुक्त खेल। घेरों में कोई भी संख्याएँ, गुणनखंड या गुणज, और बगल में भाग का द्वार खुला है।",
    /* phase 1 */
    "Numbers that divide both": "दोनों को भाग देने वाली संख्याएँ",
    "Each ring holds the factors of its number. Tap a card to lift it into the middle.": "हर घेरे में उसकी संख्या के गुणनखंड हैं। किसी कार्ड को बीच में लाने के लिए उस पर टैप करो।",
    "Divide the number in each ring by the card. Nothing left over in both means it belongs in the middle.": "हर घेरे की संख्या को कार्ड से भाग दो। दोनों में कुछ न बचे, तो कार्ड बीच में जाएगा।",
    "Keep only the cards that stand in both rings, and leave the rest where they are.": "बीच में सिर्फ़ वे कार्ड रखो जो दोनों घेरों में हैं। बाकी कार्ड जहाँ हैं, वहीं रहने दो।",
    "A common factor divides both numbers. 1 is a common factor of every pair of numbers.": "सार्व गुणनखंड दोनों संख्याओं को पूरा भाग देता है। 1 हर दो संख्याओं का सार्व गुणनखंड है।",
    "You learned: the middle of two factor lists holds what goes into both.": "तुमने सीखा: दो गुणनखंड सूचियों के बीच वे हैं जो दोनों को भाग देते हैं।",
    "Write the factors of 42 and the factors of 70, and say which numbers turn up in both.": "42 के गुणनखंड और 70 के गुणनखंड लिखो। बताओ कौन सी संख्याएँ दोनों में आती हैं।",
    "Factors of both 42 and 70?": "42 और 70 दोनों के गुणनखंड?",
    "Test each card in the middle. Does it go into 42 exactly, and into 70 as well?": "बीच के हर कार्ड को जाँचो। क्या वह 42 को पूरा भाग देता है, और 70 को भी?",
    "Find the common factors of 20 and 34.": "20 और 34 के सार्व गुणनखंड ढूँढो।",
    "Factors of both 20 and 34?": "20 और 34 दोनों के गुणनखंड?",
    "Did every card in the middle go into 20 and into 34? Did a card that goes into both stay behind?": "क्या बीच का हर कार्ड 20 और 34 दोनों को भाग देता है? क्या दोनों को भाग देने वाला कोई कार्ड पीछे रह गया?",
    "Tap the number on a ring to change it. Which card turns up in both lists, whatever the two numbers are?": "घेरे की संख्या बदलने के लिए उस पर टैप करो। संख्याएँ कोई भी हों, कौन सा कार्ड दोनों सूचियों में आता है?",
    "In both lists, every time?": "हर बार दोनों सूचियों में?",
    "Which card goes into every number exactly, whatever the number is?": "कौन सा कार्ड हर संख्या को पूरा भाग देता है, संख्या चाहे जो हो?",
    "1 goes into every number exactly.": "1 हर संख्या को पूरा भाग देता है।",
    /* phase 2 */
    "Meeting points that never stop": "कभी न रुकने वाले मिलन बिंदु",
    "The rings are now tracks of multiples, and the tracks run on past the edge. Tap a flag to drop its number into the band.": "अब घेरे गुणजों की पटरियाँ बन गए हैं। पटरियाँ किनारे से आगे भी चलती हैं। किसी झंडे पर टैप करो, उसकी संख्या साझा पट्टी में आ जाएगी।",
    "Take a step on each track. Do the two tracks land on the same number again?": "हर पटरी पर एक कदम आगे बढ़ो। क्या दोनों पटरियाँ फिर से एक ही संख्या पर पहुँचती हैं?",
    "A common multiple has a flag on the top track and on the bottom track. Look further along for the next meeting.": "सार्व गुणज का झंडा ऊपर की पटरी पर भी होता है और नीचे की पटरी पर भी। अगला मिलन और आगे जाकर ढूँढो।",
    "Common multiples never run out, because both of the lists they come from never run out.": "सार्व गुणज कभी ख़त्म नहीं होते। वे जिन दो सूचियों से आते हैं, वे भी कभी ख़त्म नहीं होतीं।",
    "You learned: multiples keep meeting for ever; factors come to an end.": "तुमने सीखा: गुणज हमेशा मिलते रहते हैं; गुणनखंड ख़त्म हो जाते हैं।",
    "The multiples of 4 and 6 meet at 12, 24 and 36. Is that all of them?": "4 और 6 के गुणज 12, 24 और 36 पर मिलते हैं। क्या बस इतने ही हैं?",
    "The next three meetings?": "अगले तीन मिलन?",
    "Run the tracks on past 36. Look for a number with a flag above and a flag below.": "पटरियों को 36 के आगे चलाओ। ऐसी संख्या ढूँढो जिसका झंडा ऊपर भी हो और नीचे भी।",
    "Write the first four common multiples of 4 and 10.": "4 और 10 के पहले चार सार्व गुणज लिखो।",
    "First four meetings of 4 and 10?": "4 और 10 के पहले चार मिलन?",
    "Does each number in the band have a flag on the 4 track and on the 10 track?": "साझा पट्टी की हर संख्या देखो। क्या उसका झंडा 4 और 10, दोनों पटरियों पर है?",
    "they stop": "रुकते हैं",
    "never stop": "नहीं रुकते",
    "The common multiples of 4 and 10 never run out. What about the common factors of 4 and 10?": "4 और 10 के सार्व गुणज कभी ख़त्म नहीं होते। 4 और 10 के सार्व गुणनखंडों का क्या?",
    "Common factors of 4 and 10?": "4 और 10 के सार्व गुणनखंड?",
    "The rings above hold the same two numbers. Could their middle keep on filling?": "ऊपर के घेरों में यही दो संख्याएँ हैं। क्या उनका बीच का हिस्सा हमेशा भरता रह सकता है?",
    /* phase 3 */
    "One division instead of two lists": "दो सूचियों की जगह एक भाग करना",
    "Must you write both lists to find out? Try one division instead.": "क्या पता करने के लिए दोनों सूचियाँ लिखनी ज़रूरी हैं? उसकी जगह एक भाग करके देखो।",
    "Tap divide, and the gate shares the bigger number into equal rows.": "भाग दो बटन पर टैप करो। द्वार बड़ी संख्या को बराबर पंक्तियों में बाँट देगा।",
    "Put the bigger number into the gate and divide it by the smaller.": "बड़ी संख्या को द्वार में डालो और उसे छोटी संख्या से भाग दो।",
    "The quotient is the number of full rows. The remainder is whatever sits on the shelf.": "भागफल पूरी पंक्तियों की गिनती है। शेषफल वह है जो शेल्फ़ पर बचा है।",
    "One division settles it. Divide the bigger number by the smaller, and look at what is left.": "एक बार भाग करने से ही बात तय हो जाती है। बड़ी संख्या को छोटी से भाग दो, और देखो कितना बचा।",
    "You learned: one division shows if a number is a multiple of another.": "तुमने सीखा: एक भाग से पता चलता है कि संख्या दूसरी का गुणज है या नहीं।",
    "Is 112 a multiple of 8? Find out without writing either list. Divide, and give the quotient and the remainder.": "क्या 112, 8 का गुणज है? कोई सूची लिखे बिना पता करो। भाग दो, और भागफल और शेषफल बताओ।",
    "112 ÷ 8: quotient and remainder?": "112 ÷ 8: भागफल और शेषफल?",
    "Share 112 into rows of 8. How many full rows are there, and what is left?": "112 को पंक्तियों में बाँटो, हर पंक्ति में 8। कितनी पूरी पंक्तियाँ बनीं, और कितना बचा?",
    "Is 45 a multiple of 5? Divide it, then give both numbers.": "क्या 45, 5 का गुणज है? भाग दो, फिर दोनों संख्याएँ बताओ।",
    "45 ÷ 5: quotient and remainder?": "45 ÷ 5: भागफल और शेषफल?",
    "Count the full rows of 5 on the board, then count what sits on the shelf.": "बोर्ड पर 5 की पूरी पंक्तियाँ गिनो। फिर शेल्फ़ पर जो रखा है, उसे गिनो।",
    "Is 126 a multiple of 7? Divide, and say how many rows there are and what is left.": "क्या 126, 7 का गुणज है? भाग दो, और बताओ कितनी पंक्तियाँ हैं और कितना बचा।",
    "126 ÷ 7: quotient and remainder?": "126 ÷ 7: भागफल और शेषफल?",
    "Which number is shared out, 126 or 7? Share the bigger number into rows of the smaller.": "कौन सी संख्या बाँटी जाती है, 126 या 7? बड़ी संख्या को पंक्तियों में बाँटो, हर पंक्ति में छोटी संख्या जितने।",
    "Nothing left over, so 112 is a multiple of 8.": "कुछ नहीं बचा, इसलिए 112, 8 का गुणज है।",
    "Nothing left over, so 45 is a multiple of 5.": "कुछ नहीं बचा, इसलिए 45, 5 का गुणज है।",
    "Nothing left over, so 126 is a multiple of 7.": "कुछ नहीं बचा, इसलिए 126, 7 का गुणज है।",
    /* phase 4 */
    "What a remainder rules out": "शेषफल क्या ग़लत साबित करता है",
    "Something is left over. Say the two things that tells you.": "कुछ बच गया है। बताओ, इससे कौन सी दो बातें पता चलती हैं।",
    "Tap divide to run the gate, then read the shelf.": "द्वार चलाने के लिए भाग दो बटन पर टैप करो, फिर शेल्फ़ देखो।",
    "What does anything on the shelf say about these two numbers?": "शेल्फ़ पर कुछ भी हो, तो वह इन दो संख्याओं के बारे में क्या बताता है?",
    "With nothing on the shelf, the bigger is a multiple and the smaller is a factor.": "शेल्फ़ पर कुछ न हो, तो बड़ी संख्या गुणज है और छोटी संख्या गुणनखंड।",
    "A remainder says the bigger number is not a multiple of the smaller. It also says the smaller is not a factor of the bigger.": "शेषफल बताता है कि बड़ी संख्या छोटी संख्या का गुणज नहीं है। यह भी बताता है कि छोटी संख्या बड़ी संख्या का गुणनखंड नहीं है।",
    "You learned: a remainder rules out the multiple and the factor at once.": "तुमने सीखा: शेषफल गुणज और गुणनखंड, दोनों को एक साथ ग़लत साबित करता है।",
    /* both keys break after एक (a zero-width space gives the second the same break), so no vowel sign
       under line 1 meets है on line 2 */
    "that 9 is a factor": "9 एक गुणनखंड है",
    "that 74 is a multiple": "74 एक ​गुणज है",
    "both of these": "ये दोनों",
    "Divide 74 by 9. What does the answer rule out?": "74 को 9 से भाग दो। उत्तर से क्या ग़लत साबित होता है?",
    "What does 74 ÷ 9 rule out?": "74 ÷ 9 से क्या ग़लत साबित होता है?",
    "A leftover settles more than the multiple question. What else does it settle?": "बचा हुआ हिस्सा सिर्फ़ गुणज वाला सवाल हल नहीं करता। वह और क्या तय करता है?",
    "Divide 135 by 8 and say what that rules out.": "135 को 8 से भाग दो। बताओ, इससे क्या ग़लत साबित होता है।",
    "135 ÷ 8: quotient and remainder?": "135 ÷ 8: भागफल और शेषफल?",
    "Count the full rows of 8, then count the counters left on the shelf.": "8 की पूरी पंक्तियाँ गिनो, फिर शेल्फ़ पर बची गोटियाँ गिनो।",
    "yes, I may": "हाँ",
    "no, I may not": "नहीं",
    "In the board game you throw a 4 and want to move onto 57. You may land only on a multiple of 4. Divide to find out whether you may.": "बोर्ड के खेल में तुम्हारा पासा 4 आया। तुम 57 पर जाना चाहते हो। तुम सिर्फ़ 4 के गुणज पर रुक सकते हो। भाग देकर पता करो कि जा सकते हो या नहीं।",
    "May you move onto 57?": "क्या तुम 57 पर जा सकते हो?",
    "How many counters sit on the shelf? Does a leftover of any size still count?": "शेल्फ़ पर कितनी गोटियाँ हैं? बचा हुआ कितना भी हो, क्या वह फिर भी मायने रखता है?",
    "57 is not a multiple of 4, so you may not move there.": "57, 4 का गुणज नहीं है, इसलिए तुम वहाँ नहीं जा सकते।",
    "74 is not a multiple of 9.": "74, 9 का गुणज नहीं है।",
    "And 9 is not a factor of 74.": "और 9, 74 का गुणनखंड नहीं है।",
    "135 is not a multiple of 8.": "135, 8 का गुणज नहीं है।",
    "And 8 is not a factor of 135.": "और 8, 135 का गुणनखंड नहीं है।",
    /* the working area's own words */
    "in the middle": "बीच में", "in the band": "साझा पट्टी में", "out of": "में से", "in both": "साझा पट्टी", "no end": "अंत नहीं",
    "multiples": "गुणज", "factors": "गुणनखंड", "of": "के", "go back": "पीछे जाओ", "run on": "आगे चलाओ",
    "the divide gate": "भाग का द्वार", "divide": "भाग दो", "left": "बचे", "share out": "बाँटो", "rows of": "हर पंक्ति में",
    "no lists": "सूची नहीं", "left over": "बचे हुए", "quotient": "भागफल", "remainder": "शेषफल", "no full row": "पूरी पंक्ति नहीं",
    "is a multiple of": "का गुणज है", "isn't a multiple of": "का गुणज नहीं है", "is a factor of": "का गुणनखंड है", "isn't a factor of": "का गुणनखंड नहीं है",
    "so you may": "इसलिए जा सकते हो", "so you may not": "इसलिए नहीं जा सकते", "and": "और", "multiples of": "के गुणज",
    /* a chosen answer as the slot echoes it (the choice id) */
    "stop": "रुकते हैं", "never": "नहीं रुकते", "yes": "हाँ", "no": "नहीं", "factor": "9 गुणनखंड है", "multiple": "74 गुणज है", "both": "ये दोनों",
  },
  gu: {
    "Overlap Rings": "સહિયારાં વર્તુળ",
    "Two rings, overlapping in the middle. Something is going to end up in there.": "બે વર્તુળ, જે વચ્ચે એકબીજા પર ચડેલાં છે. એ વચ્ચેની જગ્યામાં કંઈક આવવાનું છે.",
    "One overlap you could count, and one that kept on catching new numbers.": "એક સહિયારો ભાગ તમે ગણી શક્યા. બીજો નવી સંખ્યાઓ પકડતો જ રહ્યો.",
    "Free play. Any numbers in the rings, either mode, the gate open beside them.": "મુક્ત રમત. વર્તુળોમાં કોઈ પણ સંખ્યાઓ, કોઈ પણ રીત, અને બાજુમાં ખુલ્લો ભાગાકારનો દરવાજો.",
    /* phase 1 */
    "Numbers that divide both": "બંનેને ભાગતી સંખ્યાઓ",
    "Each ring holds the factors of its number. Tap a card to lift it into the middle.": "દરેક વર્તુળમાં તેની સંખ્યાના અવયવ છે. કોઈ કાર્ડને વચ્ચે લાવવા તેના પર ટૅપ કરો.",
    "Divide the number in each ring by the card. Nothing left over in both means it belongs in the middle.": "દરેક વર્તુળની સંખ્યાને કાર્ડથી ભાગો. બંનેમાં કંઈ ન વધે, તો કાર્ડ વચ્ચે જશે.",
    "Keep only the cards that stand in both rings, and leave the rest where they are.": "વચ્ચે ફક્ત એ જ કાર્ડ રાખો જે બંને વર્તુળમાં છે. બાકીનાં કાર્ડ જ્યાં છે ત્યાં જ રહેવા દો.",
    "A common factor divides both numbers. 1 is a common factor of every pair of numbers.": "સામાન્ય અવયવ બંને સંખ્યાઓને પૂરેપૂરી ભાગે છે. 1 દરેક બે સંખ્યાઓનો સામાન્ય અવયવ છે.",
    "You learned: the middle of two factor lists holds what goes into both.": "તમે શીખ્યા: બે અવયવ યાદીની વચ્ચે એ છે જે બંનેને ભાગે છે.",
    "Write the factors of 42 and the factors of 70, and say which numbers turn up in both.": "42 ના અવયવ અને 70 ના અવયવ લખો. કહો કઈ સંખ્યાઓ બંનેમાં આવે છે.",
    "Factors of both 42 and 70?": "42 અને 70 બંનેના અવયવ?",
    "Test each card in the middle. Does it go into 42 exactly, and into 70 as well?": "વચ્ચેના દરેક કાર્ડને તપાસો. શું તે 42 ને પૂરેપૂરી ભાગે છે, અને 70 ને પણ?",
    "Find the common factors of 20 and 34.": "20 અને 34 ના સામાન્ય અવયવ શોધો.",
    "Factors of both 20 and 34?": "20 અને 34 બંનેના અવયવ?",
    "Did every card in the middle go into 20 and into 34? Did a card that goes into both stay behind?": "શું વચ્ચેનું દરેક કાર્ડ 20 અને 34 બંનેને ભાગે છે? શું બંનેને ભાગતું કોઈ કાર્ડ પાછળ રહી ગયું?",
    "Tap the number on a ring to change it. Which card turns up in both lists, whatever the two numbers are?": "વર્તુળની સંખ્યા બદલવા તેના પર ટૅપ કરો. સંખ્યાઓ ગમે તે હોય, કયું કાર્ડ બંને યાદીમાં આવે છે?",
    "In both lists, every time?": "દર વખતે બંને યાદીમાં?",
    "Which card goes into every number exactly, whatever the number is?": "કયું કાર્ડ દરેક સંખ્યાને પૂરેપૂરી ભાગે છે, સંખ્યા ગમે તે હોય?",
    "1 goes into every number exactly.": "1 દરેક સંખ્યાને પૂરેપૂરી ભાગે છે.",
    /* phase 2 */
    "Meeting points that never stop": "ક્યારેય ન અટકતાં મિલન બિંદુ",
    "The rings are now tracks of multiples, and the tracks run on past the edge. Tap a flag to drop its number into the band.": "હવે વર્તુળો અવયવીના પાટા બની ગયાં છે. પાટા કિનારાની પેલે પાર પણ ચાલે છે. કોઈ ઝંડા પર ટૅપ કરો, તેની સંખ્યા પટ્ટીમાં આવી જશે.",
    "Take a step on each track. Do the two tracks land on the same number again?": "દરેક પાટા પર એક પગલું આગળ વધો. શું બંને પાટા ફરી એક જ સંખ્યા પર પહોંચે છે?",
    "A common multiple has a flag on the top track and on the bottom track. Look further along for the next meeting.": "સામાન્ય અવયવીનો ઝંડો ઉપરના પાટા પર પણ હોય અને નીચેના પાટા પર પણ. પછીનું મિલન હજી આગળ જઈને શોધો.",
    "Common multiples never run out, because both of the lists they come from never run out.": "સામાન્ય અવયવી ક્યારેય ખૂટતા નથી. તે જે બે યાદીમાંથી આવે છે, તે પણ ક્યારેય ખૂટતી નથી.",
    "You learned: multiples keep meeting for ever; factors come to an end.": "તમે શીખ્યા: અવયવી હંમેશાં મળતા રહે છે; અવયવ ખૂટી જાય છે.",
    "The multiples of 4 and 6 meet at 12, 24 and 36. Is that all of them?": "4 અને 6 ના અવયવી 12, 24 અને 36 પર મળે છે. શું બસ આટલા જ છે?",
    "The next three meetings?": "પછીનાં ત્રણ મિલન?",
    "Run the tracks on past 36. Look for a number with a flag above and a flag below.": "પાટાને 36 પછી આગળ ચલાવો. એવી સંખ્યા શોધો જેનો ઝંડો ઉપર પણ હોય અને નીચે પણ.",
    "Write the first four common multiples of 4 and 10.": "4 અને 10 ના પહેલા ચાર સામાન્ય અવયવી લખો.",
    "First four meetings of 4 and 10?": "4 અને 10 ના પહેલાં ચાર મિલન?",
    "Does each number in the band have a flag on the 4 track and on the 10 track?": "પટ્ટીની દરેક સંખ્યા જુઓ. શું તેનો ઝંડો 4 અને 10, બંને પાટા પર છે?",
    "they stop": "અટકી જાય છે",
    "never stop": "અટકતા નથી",
    "The common multiples of 4 and 10 never run out. What about the common factors of 4 and 10?": "4 અને 10 ના સામાન્ય અવયવી ક્યારેય ખૂટતા નથી. 4 અને 10 ના સામાન્ય અવયવનું શું?",
    "Common factors of 4 and 10?": "4 અને 10 ના સામાન્ય અવયવ?",
    "The rings above hold the same two numbers. Could their middle keep on filling?": "ઉપરનાં વર્તુળોમાં આ જ બે સંખ્યાઓ છે. શું તેમનો વચ્ચેનો ભાગ ભરાતો જ રહી શકે?",
    /* phase 3 */
    "One division instead of two lists": "બે યાદીને બદલે એક ભાગાકાર",
    "Must you write both lists to find out? Try one division instead.": "શું જાણવા માટે બંને યાદી લખવી જરૂરી છે? તેને બદલે એક ભાગાકાર કરી જુઓ.",
    "Tap divide, and the gate shares the bigger number into equal rows.": "ભાગો બટન પર ટૅપ કરો. દરવાજો મોટી સંખ્યાને સરખી હારમાં વહેંચી દેશે.",
    "Put the bigger number into the gate and divide it by the smaller.": "મોટી સંખ્યાને દરવાજામાં મૂકો અને તેને નાની સંખ્યાથી ભાગો.",
    "The quotient is the number of full rows. The remainder is whatever sits on the shelf.": "ભાગફળ એટલે પૂરી હારની ગણતરી. શેષ એટલે છાજલી પર જે વધ્યું તે.",
    "One division settles it. Divide the bigger number by the smaller, and look at what is left.": "એક ભાગાકારથી જ વાત નક્કી થઈ જાય છે. મોટી સંખ્યાને નાનીથી ભાગો, અને જુઓ કેટલું વધ્યું.",
    "You learned: one division shows if a number is a multiple of another.": "તમે શીખ્યા: એક ભાગાકારથી ખબર પડે કે કોઈ સંખ્યા બીજીનો અવયવી છે કે નહીં.",
    "Is 112 a multiple of 8? Find out without writing either list. Divide, and give the quotient and the remainder.": "શું 112 એ 8 નો અવયવી છે? કોઈ યાદી લખ્યા વગર શોધો. ભાગો, અને ભાગફળ અને શેષ કહો.",
    "112 ÷ 8: quotient and remainder?": "112 ÷ 8: ભાગફળ અને શેષ?",
    "Share 112 into rows of 8. How many full rows are there, and what is left?": "112 ને હારમાં વહેંચો, દરેક હારમાં 8. કેટલી પૂરી હાર બની, અને કેટલું વધ્યું?",
    "Is 45 a multiple of 5? Divide it, then give both numbers.": "શું 45 એ 5 નો અવયવી છે? ભાગો, પછી બંને સંખ્યાઓ કહો.",
    "45 ÷ 5: quotient and remainder?": "45 ÷ 5: ભાગફળ અને શેષ?",
    "Count the full rows of 5 on the board, then count what sits on the shelf.": "બોર્ડ પર 5 ની પૂરી હાર ગણો. પછી છાજલી પર જે પડ્યું છે તે ગણો.",
    "Is 126 a multiple of 7? Divide, and say how many rows there are and what is left.": "શું 126 એ 7 નો અવયવી છે? ભાગો, અને કહો કેટલી હાર છે અને કેટલું વધ્યું.",
    "126 ÷ 7: quotient and remainder?": "126 ÷ 7: ભાગફળ અને શેષ?",
    "Which number is shared out, 126 or 7? Share the bigger number into rows of the smaller.": "કઈ સંખ્યા વહેંચાય છે, 126 કે 7? મોટી સંખ્યાને હારમાં વહેંચો, દરેક હારમાં નાની સંખ્યા જેટલા.",
    "Nothing left over, so 112 is a multiple of 8.": "કંઈ વધ્યું નહીં, એટલે 112 એ 8 નો અવયવી છે.",
    "Nothing left over, so 45 is a multiple of 5.": "કંઈ વધ્યું નહીં, એટલે 45 એ 5 નો અવયવી છે.",
    "Nothing left over, so 126 is a multiple of 7.": "કંઈ વધ્યું નહીં, એટલે 126 એ 7 નો અવયવી છે.",
    /* phase 4 */
    "What a remainder rules out": "શેષ શું ખોટું સાબિત કરે છે",
    "Something is left over. Say the two things that tells you.": "કંઈક વધ્યું છે. કહો, તેનાથી કઈ બે વાત ખબર પડે છે.",
    "Tap divide to run the gate, then read the shelf.": "દરવાજો ચલાવવા ભાગો બટન પર ટૅપ કરો, પછી છાજલી જુઓ.",
    "What does anything on the shelf say about these two numbers?": "છાજલી પર કંઈ પણ હોય, તો તે આ બે સંખ્યાઓ વિશે શું કહે છે?",
    "With nothing on the shelf, the bigger is a multiple and the smaller is a factor.": "છાજલી પર કંઈ ન હોય, તો મોટી સંખ્યા અવયવી છે અને નાની સંખ્યા અવયવ.",
    "A remainder says the bigger number is not a multiple of the smaller. It also says the smaller is not a factor of the bigger.": "શેષ કહે છે કે મોટી સંખ્યા નાની સંખ્યાનો અવયવી નથી. તે એ પણ કહે છે કે નાની સંખ્યા મોટી સંખ્યાનો અવયવ નથી.",
    "You learned: a remainder rules out the multiple and the factor at once.": "તમે શીખ્યા: શેષ અવયવી અને અવયવ, બંનેને એકસાથે ખોટા સાબિત કરે છે.",
    "that 9 is a factor": "9 એક અવયવ છે",
    "that 74 is a multiple": "74 અવયવી છે",
    "both of these": "આ બંને",
    "Divide 74 by 9. What does the answer rule out?": "74 ને 9 થી ભાગો. જવાબથી શું ખોટું સાબિત થાય છે?",
    "What does 74 ÷ 9 rule out?": "74 ÷ 9 થી શું ખોટું સાબિત થાય છે?",
    "A leftover settles more than the multiple question. What else does it settle?": "વધેલો ભાગ ફક્ત અવયવીનો સવાલ નથી ઉકેલતો. તે બીજું શું નક્કી કરે છે?",
    "Divide 135 by 8 and say what that rules out.": "135 ને 8 થી ભાગો. કહો, તેનાથી શું ખોટું સાબિત થાય છે.",
    "135 ÷ 8: quotient and remainder?": "135 ÷ 8: ભાગફળ અને શેષ?",
    "Count the full rows of 8, then count the counters left on the shelf.": "8 ની પૂરી હાર ગણો, પછી છાજલી પર વધેલી કૂકરીઓ ગણો.",
    "yes, I may": "હા",
    "no, I may not": "ના",
    "In the board game you throw a 4 and want to move onto 57. You may land only on a multiple of 4. Divide to find out whether you may.": "બોર્ડની રમતમાં તમારા પાસામાં 4 આવ્યા. તમે 57 પર જવા માંગો છો. તમે ફક્ત 4 ના અવયવી પર જ ઊતરી શકો. ભાગીને શોધો કે તમે જઈ શકો કે નહીં.",
    "May you move onto 57?": "શું તમે 57 પર જઈ શકો?",
    "How many counters sit on the shelf? Does a leftover of any size still count?": "છાજલી પર કેટલી કૂકરીઓ છે? વધેલું ગમે તેટલું હોય, શું તે છતાં ગણતરીમાં આવે?",
    "57 is not a multiple of 4, so you may not move there.": "57 એ 4 નો અવયવી નથી, એટલે તમે ત્યાં ન જઈ શકો.",
    "74 is not a multiple of 9.": "74 એ 9 નો અવયવી નથી.",
    "And 9 is not a factor of 74.": "અને 9 એ 74 નો અવયવ નથી.",
    "135 is not a multiple of 8.": "135 એ 8 નો અવયવી નથી.",
    "And 8 is not a factor of 135.": "અને 8 એ 135 નો અવયવ નથી.",
    /* the working area's own words */
    "in the middle": "વચ્ચે", "in the band": "પટ્ટીમાં", "out of": "માંથી", "in both": "બંનેમાં", "no end": "અંત નથી",
    "multiples": "અવયવી", "factors": "અવયવ", "of": "ના", "go back": "પાછળ જાઓ", "run on": "આગળ ચલાવો",
    "the divide gate": "ભાગાકારનો દરવાજો", "divide": "ભાગો", "left": "વધ્યા", "share out": "વહેંચો", "rows of": "દરેક હારમાં",
    "no lists": "યાદી નહીં", "left over": "વધેલા", "quotient": "ભાગફળ", "remainder": "શેષ", "no full row": "કોઈ હાર પૂરી નથી",
    "is a multiple of": "નો અવયવી છે", "isn't a multiple of": "નો અવયવી નથી", "is a factor of": "નો અવયવ છે", "isn't a factor of": "નો અવયવ નથી",
    "so you may": "એટલે જઈ શકાય", "so you may not": "એટલે ન જઈ શકાય", "and": "અને", "multiples of": "ના અવયવી",
    /* a chosen answer as the slot echoes it (the choice id) */
    "between two numbers": "એ",
    "stop": "અટકી જાય છે", "never": "અટકતા નથી", "yes": "હા", "no": "ના", "factor": "9 અવયવ છે", "multiple": "74 અવયવી છે", "both": "આ બંને",
  },
};

/* ── the picture's numbers (division: a card goes into a number with nothing left over) ── */
const orFactors = (n: number) => { const out: number[] = []; for (let d = 1; d <= n; d++) if (n % d === 0) out.push(d); return out; };
const orNums = (v: any): number[] => (Array.isArray(v) ? v.map(Number) : (String(v ?? "").match(/\d+/g) || []).map(Number)).filter((x: number) => isFinite(x));
const orSet = (xs: number[]) => Array.from(new Set(xs)).sort((a, b) => a - b);
const orJoin = (xs: number[]) => orSet(xs).join(", ");
const orAnd = (xs: number[]) => { const s = orSet(xs); return s.length > 1 ? s.slice(0, -1).join(", ") + " and " + s[s.length - 1] : String(s[0] ?? ""); };
const orLcm = (p: number, q: number) => { let m = Math.max(p, q); while (m % p || m % q) m += Math.max(p, q); return m; };

/* layout (working-area units) */
/* two rings of cord: circles that really overlap, so "in both" is the lens they share. Each row of
   cards is as wide as the ring is at that height, so the lists curve with the cord. */
const OR_RING = { R: 258, d: 190, cy: 264, cs: 72, gap: 10, rows: [-164, -82, 0, 82, 164], capM: 12,
  tag: { w: 100, h: 56, cy: 30, off: 60 } };
const OR_RING_MINI = { R: 108, d: 86, cy: 116, cs: 56, gap: 8, rows: [-32, 32], capM: 2, x0: 392,
  tag: { w: 56, h: 36, cy: 24, off: 28 } };
const OR_SHIFT = 190; /* the rings stand centred while the gate beside them is shut */
const OR_BOARD = { x: 766, y: 84, w: 314, h: 398 };
const OR_TR = { x0: 170, xMax: 1048, pitch: 72.8 }; /* the smaller step's flags stand one finger box apart */
const OR_GATE = { cols: [280, 640], top: 8, pitch: 34, dot: 30, r: 11, shelfY: 326, shelfDot: 400, boardX: 230, boardW: 850 };
const OR_FREE_A = [12, 4, 6, 8, 9, 10, 14, 15, 16, 20, 21];
const OR_FREE_B = [18, 6, 10, 12, 15, 16, 20, 25, 27, 28, 35];
const OR_BLUE = CONTENT.hundred, OR_ROSE = CONTENT.bead, OR_GREEN = CONTENT.one, OR_AMBER = CONTENT.ten, OR_VERM = CONTENT.pointer;

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  rings: { big: OR_RING, mini: OR_RING_MINI, board: OR_BOARD },
  tracks: { plotFrom: OR_TR.x0, plotTo: OR_TR.xMax, flagPitch: OR_TR.pitch, runStep: "the lowest common multiple, so meetings keep their places" },
  gate: { rowsPerColumn: 9, columns: 2, shelf: "outside the rows, full strength" },
  freePlay: { ringA: OR_FREE_A, ringB: OR_FREE_B },
  colours: { divides: "hundred (blue)", multiple: "one (green)", inBoth: "bead (rose)", leftover: "pointer (vermilion)", shared: "ten (amber)" },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a list is right in any order; two parts compare box by box; a word by its id */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (item.pad === "enter") return orJoin(orNums(v)) === orJoin(orNums(item.answer));
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by a second route that shares no code with judge or Work:
   factors by MULTIPLYING (a × b = n), meetings by walking two lists of multiples upwards,
   quotient and remainder by taking the smaller away again and again */
const oracle = () => {
  const mul = (n: number) => { const f: number[] = []; for (let a = 1; a <= n; a++) for (let b = n; b >= 1; b--) if (a * b === n) { f.push(a); break; } return f; };
  const list = (s: any) => String(s).split(",").map((t) => parseInt(t, 10));
  const sub = (big: number, small: number) => { let r = big, q = 0; while (r >= small) { r -= small; q++; } return [q, r]; };
  const walk = (p: number, q: number, above: number, count: number) => {
    const out: number[] = []; let a = p, b = q;
    while (out.length < count) { if (a === b) { if (a > above) out.push(a); a += p; b += q; } else if (a < b) a += p; else b += q; }
    return out;
  };
  return PHASES.every((p: any) => p.items.every((it: any) => {
    switch (it.kind) {
      case "common": { const fb = mul(it.b); return list(it.answer).join(",") === mul(it.a).filter((x) => fb.indexOf(x) >= 0).join(","); }
      case "always": {
        let keep = mul(2);
        for (let n = 3; n <= 100; n++) { const f = mul(n); keep = keep.filter((x) => f.indexOf(x) >= 0); }
        return keep.length === 1 && keep[0] === it.answer && mul(it.a).indexOf(it.answer) >= 0 && mul(it.b).indexOf(it.answer) >= 0;
      }
      case "next3": return walk(it.p, it.q, 0, 3).join(",") === it.given.join(",") && list(it.answer).join(",") === walk(it.p, it.q, it.given[it.given.length - 1], 3).join(",");
      case "first4": return list(it.answer).join(",") === walk(it.p, it.q, 0, 4).join(",");
      case "stops": { const fb = mul(it.q), c = mul(it.p).filter((x) => fb.indexOf(x) >= 0); return it.answer === (c.length > 0 && c.every((x) => x <= Math.min(it.p, it.q)) ? "stop" : "never"); }
      case "gate": { const [q, r] = sub(it.big, it.small); return it.answer[0] === q && it.answer[1] === r; }
      case "rule": { const r = sub(it.big, it.small)[1]; return it.answer === (r > 0 ? "both" : "factor"); }
      case "game": { const r = sub(it.big, it.small)[1]; return it.answer === (r === 0 ? "yes" : "no"); }
    }
    return false;
  }));
};
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => {
  if (item.parts) return item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), words(x)]);
  if (item.pad === "enter") { const xs = orNums(item.answer); return [orJoin(xs), orAnd(xs)]; }
  if (item.choices) { const c = item.choices.find((x: any) => x.id === item.answer); return [c ? c.label : String(item.answer), String(item.answer)]; }
  if (typeof item.answer === "number") return [String(item.answer), words(item.answer)];
  return [String(item.answer)];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;
/* the slot shows a list the child made; one too long for the slot (and its caret) keeps its first
   numbers and its last, at most 14 characters */
const format = (v: any) => {
  const s = String(v ?? "");
  if (s.length <= 14 || !/^\d+(, \d+)+$/.test(s)) return s;
  const xs = s.split(", ");
  for (let k = xs.length - 2; k >= 1; k--) { const t = `${xs.slice(0, k).join(", ")}, …, ${xs[xs.length - 1]}`; if (t.length <= 14) return t; }
  return `${xs[0]}, …`;
};

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (item.pad === "enter") { if (HOOK.set) HOOK.set(item.answer); setTimeout(() => HOOK.enter && HOOK.enter(), 40); return; }
  return T.submit(item.answer);
};
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" ? (HOOK.set ? HOOK.set(v) : false) : undefined);
/* the agent's check() before Enter: nothing waits on this working area, so Enter answers */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* the gate's win line, one literal call per item: the voice baker reads only literal api.say calls,
   so a line built from a template would be silent in Hindi and Gujarati */
const orWinSay = (api: any, big: number, small: number) => {
  switch (`${big}/${small}`) {
    case "57/4": return api.say("57 is not a multiple of 4, so you may not move there.");
    case "74/9": return api.say(["74 is not a multiple of 9.", "And 9 is not a factor of 74."]);
    case "135/8": return api.say(["135 is not a multiple of 8.", "And 8 is not a factor of 135."]);
    case "112/8": return api.say(["Nothing left over, so 112 is a multiple of 8."]);
    case "45/5": return api.say(["Nothing left over, so 45 is a multiple of 5."]);
    case "126/7": return api.say(["Nothing left over, so 126 is a multiple of 7."]);
  }
};

/* ── state ───────────────────────────────────────────────────────────────────────────────── */

const orSetup = (it: any) => {
  const base = { mid: [], caught: [], given: [], lit: [], view: 0, touched: false, glow: false, board: false, test: null, readout: null, frame: null, cap: false,
    demoMid: null, demoCaught: null, needAct: false };
  if (it.kind === "common" || it.kind === "always") return { ...base, mode: "rings", a: it.a, b: it.b };
  if (it.kind === "next3" || it.kind === "first4") return { ...base, mode: "tracks", p: it.p, q: it.q, given: (it.given || []).slice() };
  if (it.kind === "stops") return { ...base, mode: "both", a: it.p, b: it.q, p: it.p, q: it.q, ringNote: false, bandNote: false };
  return { ...base, mode: "gate", big: it.big, small: it.small, tray: it.big, per: it.small, dealt: 0, shelf: 0, ran: false, count: false, rev: null };
};
const orFreeSetup = () => ({ mid: [], caught: [], given: [], lit: [], view: 0, touched: false, glow: false, board: true, test: null, readout: null,
  demoMid: null, demoCaught: null, needAct: false,
  frame: null, cap: false, mode: "rings", free: true, a: 12, b: 18, p: 12, q: 18, fres: null });

/* the run of the tracks: one lowest common multiple, so the meetings keep their places as they run */
const orSpan = (p: number, q: number) => (OR_TR.xMax - OR_TR.x0) / (OR_TR.pitch / Math.min(p, q));
const orRunStep = (p: number, q: number) => {
  const L = orLcm(p, q), m = Math.min(p, q);
  return L <= orSpan(p, q) * 0.8 ? L : m * Math.max(1, Math.floor((orSpan(p, q) * 0.5) / m));
};
/* the view that shows v, keeping the view on a whole run step */
const orViewFor = (x: any, v: number) => {
  const st = orRunStep(x.p, x.q), span = orSpan(x.p, x.q) - 1;
  if (v >= x.view + 0.01 && v <= x.view + span) return x.view;
  if (v < x.view) return Math.max(0, Math.floor(v / st) * st);
  return Math.max(0, Math.ceil((v - span) / st) * st);
};

/* ── pieces ──────────────────────────────────────────────────────────────────────────────── */

/* a factor card: blue in its ring, rose once it stands in the middle */
function OrCard({ id, x, y, s, v, mid, lit, glow, live, onPress, fast, C, label }: any) {
  const p = usePress(onPress, !!live);
  const col = mid ? OR_ROSE : OR_BLUE;
  return (
    <g style={{ transform: `translate(${x}px,${y}px)`, transition: fast ? "none" : "transform 420ms ease" } as any}>
      <g transform={p.down ? "translate(0,3)" : undefined}>
        {(lit || glow) && <rect x={-4} y={-4} width={s + 8} height={s + 8} rx={19} fill="none" stroke={lit ? C.accent : shade(col, 0.1)} strokeWidth={4} />}
        <rect width={s} height={s} rx={16} fill={tint(col, mid ? 0.64 : 0.8)} stroke={shade(col, 0.08)} strokeWidth={3} filter="url(#fShadowSoft)" />
        <rect x={7} y={5} width={s - 14} height={s * 0.28} rx={10} fill="#FFFFFF" fillOpacity={0.4} />
        <text x={s / 2} y={s / 2 + 14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{v}</text>
      </g>
      {live && <rect className="c4-hit" data-control={id} role="button" tabIndex={0} aria-label={label}
        width={s} height={s} fill="transparent" {...p.bind()} onKeyDown={p.keys} />}
    </g>
  );
}

/* a flag on a track (or, once caught, its card in the band) */
function OrFlag({ x, y, v, rose, fast, C }: any) {
  const col = rose ? OR_ROSE : OR_GREEN;
  return (
    <g style={{ transform: `translate(${x}px,${y}px)`, transition: fast ? "none" : "transform 460ms ease" } as any}>
      <rect x={-30} y={-22} width={60} height={44} rx={10} fill={tint(col, rose ? 0.62 : 0.78)} stroke={shade(col, 0.08)} strokeWidth={2.5} />
      <text y={10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{v}</text>
    </g>
  );
}

/* a number chip in a statement: amber for the number shared out, blue for the one it is divided by */
function OrChip({ x, y, v, big }: any) {
  const w = 30 + String(v).length * 20, col = big ? OR_AMBER : OR_BLUE;
  return (
    <g>
      <rect x={x} y={y - 34} width={w} height={44} rx={10} fill={tint(col, 0.8)} stroke={shade(col, 0.1)} strokeWidth={2.5} />
      <text x={x + w / 2} y={y} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={"#2B2B2B"}>{v}</text>
    </g>
  );
}

/* ── the working area: 1086 x 528, origin at its top-left ────────────────────────────────── */
function Work({ n, item, index, stage, wrong, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const en = lang === "en";
  const tl = useTimeline();
  const free = stage === "free";
  const fast = reducedMotion();
  const [st, setSt] = useState<any>(() => orSetup(item));
  const sRef = useRef<any>(st);
  const up = (nx: any) => { sRef.current = nx; setSt(nx); };
  const cur = () => sRef.current;
  const setupFor = useRef<any>(index);

  useEffect(() => {
    if ((stage === "ask" || stage === "teach") && setupFor.current !== index) { setupFor.current = index; tl.stop(); up(orSetup(item)); api.lock(false); }
  }, [stage, index]);
  useEffect(() => {
    if (!free) return;
    setupFor.current = -2; tl.stop(); up(orFreeSetup());
  }, [free]);

  const s = st;
  const busy = tl.busy;
  const live = !busy && (stage === "ask" || free);
  const listItem = stage === "ask" && item.pad === "enter";

  /* what Enter sends for a list made here (and the slot shows it as it is made) */
  const valueOf = (x: any) => (x.mode === "rings" ? orJoin(x.mid) : orJoin(x.caught));
  const echo = (x: any) => { if (listItem) api.setTyped(valueOf(x)); };

  /* ── the child's controls ──
     A correction stands on a layer of its own (demoMid / demoCaught): the child's next act clears it
     and works on the child's own picture, never on the correction's. Each control says what the
     child means by where it is drawn (a card in a ring: "put it in"; in the middle: "send it back"). */
  const unDemo = (x: any) => (x.demoMid || x.demoCaught ? { ...x, demoMid: null, demoCaught: null, readout: null, lit: [], glow: false } : x);
  const lift = (v: number, wantIn: boolean) => {
    const x0 = cur();
    if (!live) return;
    const x = unDemo(x0);
    const has = x.mid.indexOf(v) >= 0, cap = x.mode === "both" ? OR_RING_MINI.capM : OR_RING.capM;
    /* where a card is drawn during a standing correction is the correction's picture, not the child's:
       the tap then toggles the child's own answer (a card the correction shows in the middle comes in) */
    if (x0.demoMid) wantIn = !has;
    if (has === wantIn || (wantIn && x.mid.length >= cap)) { if (x !== x0) { up(x); api.sfx.tick(); } return; }
    const nx = { ...x, mid: wantIn ? [...x.mid, v] : x.mid.filter((m: number) => m !== v), touched: true, needAct: false };
    up(nx); api.sfx.tick(); echo(nx);
  };
  const cycle = (side: string) => {
    const x = cur();
    if (!live || !(free || item.kind === "always")) return;
    const list = side === "a" ? OR_FREE_A : OR_FREE_B;
    const nxt = list[(list.indexOf(x[side]) + 1) % list.length];
    const nx: any = { ...unDemo(x), [side]: nxt, mid: [], caught: [], view: 0, fres: null, touched: true };
    nx.p = nx.a; nx.q = nx.b;
    up(nx); api.sfx.tick();
    if (free && nx.mode === "tracks") autoCatch(nx);
  };
  const catchV = (v: number, wantIn: boolean) => {
    const x0 = cur();
    if (!live || x0.given.indexOf(v) >= 0) return;
    const x = unDemo(x0);
    const has = x.caught.indexOf(v) >= 0;
    /* as with the cards: during a standing correction the band is the correction's, the tap is the child's */
    if (x0.demoCaught) wantIn = !has;
    if (has === wantIn) { if (x !== x0) { up(x); api.sfx.tick(); } return; }
    const nx = { ...x, caught: wantIn ? [...x.caught, v] : x.caught.filter((c: number) => c !== v), touched: true, needAct: false };
    up(nx); api.sfx.tick(); echo(nx);
  };
  /* free play: the band catches every meeting in view, flags sliding together one at a time */
  const autoCatch = (x: any) => {
    const L = orLcm(x.p, x.q), end = x.view + orSpan(x.p, x.q) + 0.001, S: any[] = [];
    for (let v = L; v <= end; v += L) {
      if (v < x.view || x.caught.indexOf(v) >= 0) continue;
      const j = v;
      S.push([280, () => { const y = cur(); if (y.caught.indexOf(j) < 0) { up({ ...y, caught: [...y.caught, j] }); api.sfx.tick(); } }]);
    }
    if (S.length) tl.run(S);
  };
  const runOn = (dir: number) => {
    const x = cur();
    if (!live) return;
    const view = Math.max(0, x.view + dir * orRunStep(x.p, x.q));
    if (view === x.view) return;
    /* running the tracks (either way) clears a standing correction too: the child then sees their own band */
    const nx = { ...unDemo(x), view, touched: true };
    up(nx); api.sfx.tick();
    if (free) autoCatch(nx);
  };
  const flipMode = () => {
    const x = cur();
    if (!live || !free) return;
    const nx = { ...unDemo(x), mode: x.mode === "rings" ? "tracks" : "rings", p: x.a, q: x.b, view: 0, caught: [], mid: [], fres: null };
    up(nx); api.sfx.tick();
    if (nx.mode === "tracks") autoCatch(nx);
  };
  const freeDivide = () => {
    const x = cur();
    if (!live || !free) return;
    const big = Math.max(x.a, x.b), small = Math.min(x.a, x.b);
    up({ ...x, fres: { big, small, q: Math.floor(big / small), r: big % small } }); api.sfx.tick();
  };
  /* the gate: deal the number shared out into rows, then set what will not fit on the shelf */
  const runGate = (after?: () => void, speed = 70, counted = false) => {
    const x = cur();
    const q = Math.floor(x.tray / x.per), r = x.tray % x.per;
    up({ ...x, dealt: 0, shelf: 0, ran: false, count: counted, cap: false });
    const S: any[] = [];
    for (let i = 1; i <= Math.min(q, 18); i++) { const j = i; S.push([speed, () => { up({ ...cur(), dealt: j }); if (counted) api.sfx.tick(); }]); }
    if (counted) for (let k = 1; k <= r; k++) { const j = k; S.push([k === 1 ? 420 : 300, () => { up({ ...cur(), shelf: j }); api.sfx.tick(); }]); }
    S.push([260, () => { up({ ...cur(), shelf: r, ran: true }); if (!counted) api.sfx.tick(); }]);
    tl.run(S, after);
  };
  const tapDivide = () => { if (!live) return; up({ ...cur(), touched: true, frame: null, cap: false, rev: null }); runGate(); };

  /* Enter (and the agent's check) go here for a list made on the working area */
  /* after a miss a bare Enter does nothing: the corrected picture is not the child's answer until the
     child has lifted, caught or sent back something themselves (as a typed answer must be typed again) */
  const enterFn: any = listItem ? () => { const x = cur(); if (tl.busy || x.needAct) return; const v = valueOf(x); if (v) api.submit(v); } : null;
  api.onEnter(enterFn);
  HOOK.enter = () => enterFn && enterFn();
  HOOK.set = (v: any) => {
    const x = cur();
    if (stage !== "ask" || tl.busy) return false;
    const xs = orSet(orNums(v));
    if (x.mode === "rings") {
      const all = orSet([...orFactors(x.a), ...orFactors(x.b)]);
      const mid = xs.filter((m) => all.indexOf(m) >= 0).slice(0, 12);
      if (!mid.length) return false;
      const nx = { ...unDemo(x), mid, touched: true, needAct: false }; up(nx); echo(nx); return true;
    }
    if (x.mode === "tracks") {
      const caught = xs.filter((c) => c > 0 && (c % x.p === 0 || c % x.q === 0) && x.given.indexOf(c) < 0);
      if (!caught.length) return false;
      const nx = { ...unDemo(x), caught, touched: true, needAct: false }; up(nx); echo(nx); return true;
    }
    return false;
  };

  /* ── the traceback: the mathematics redrawn, ending on the whole right answer ── */
  const tracebackSteps = (w: any) => {
    const x = cur(), kind = item.kind, S: any[] = [];
    if (kind === "common" || kind === "always") {
      const lA = orFactors(x.a), lB = orFactors(x.b);
      const shared = lA.filter((v) => lB.indexOf(v) >= 0);
      const todo = kind === "always" ? [1] : orSet([...x.mid, ...shared]).filter((v) => (x.mid.indexOf(v) >= 0) !== (shared.indexOf(v) >= 0));
      S.push([600, () => up({ ...cur(), board: true, readout: null, test: null, lit: [], glow: false, demoMid: x.mid.slice(), needAct: item.pad === "enter" })]);
      todo.forEach((v) => {
        S.push([1300, () => up({ ...cur(), lit: [v], test: v })]);
        S.push([600, () => {
          const y = cur(), dm = y.demoMid || y.mid, both = y.a % v === 0 && y.b % v === 0;
          up({ ...y, demoMid: both ? orSet([...dm, v]) : dm.filter((m: number) => m !== v) }); api.sfx.tick();
        }]);
      });
      S.push([400, () => { const y = cur(); up({ ...y, lit: [], glow: true }); }]);
      return S;
    }
    if (kind === "next3" || kind === "first4") {
      const right = orNums(item.answer);
      const extra = x.caught.filter((v: number) => right.indexOf(v) < 0).sort((a: number, b: number) => a - b);
      const missing = right.filter((v) => x.caught.indexOf(v) < 0);
      S.push([300, () => up({ ...cur(), readout: null, lit: [], demoCaught: x.caught.slice(), needAct: true })]);
      extra.forEach((v: number) => {
        S.push([700, () => { const y = cur(); up({ ...y, view: orViewFor(y, v), lit: [v] }); }]);
        S.push([700, () => { const y = cur(); up({ ...y, demoCaught: (y.demoCaught || y.caught).filter((c: number) => c !== v), lit: [] }); api.sfx.tick(); }]);
      });
      missing.forEach((v) => {
        S.push([700, () => { const y = cur(); up({ ...y, view: orViewFor(y, v), lit: [v] }); }]);
        S.push([700, () => { const y = cur(); up({ ...y, demoCaught: orSet([...(y.demoCaught || y.caught), v]), lit: [] }); api.sfx.tick(); }]);
      });
      S.push([400, () => { const y = cur(); up({ ...y, view: orViewFor(y, right[right.length - 1]), lit: right, readout: orJoin(right) }); }]);
      return S;
    }
    if (kind === "stops") {
      const lB = orFactors(x.q), shared = orFactors(x.p).filter((v) => lB.indexOf(v) >= 0);
      S.push([300, () => up({ ...cur(), demoMid: x.mid.filter((m: number) => shared.indexOf(m) >= 0), demoCaught: x.caught.slice(), ringNote: false, bandNote: false })]);
      shared.forEach((v) => S.push([700, () => { const y = cur(), dm = y.demoMid || []; if (dm.indexOf(v) < 0) { up({ ...y, demoMid: orSet([...dm, v]) }); api.sfx.tick(); } }]));
      S.push([800, () => up({ ...cur(), ringNote: true })]);
      const L = orLcm(x.p, x.q), st2 = orRunStep(x.p, x.q);
      [0, 1, 2].forEach((k) => {
        S.push([900, () => {
          const y = cur(), view = k * st2, end = view + orSpan(y.p, y.q) + 0.001, got: number[] = [];
          for (let v = L; v <= end; v += L) got.push(v);
          up({ ...y, view, demoCaught: orSet([...(y.demoCaught || y.caught), ...got]) }); api.sfx.tick();
        }]);
      });
      S.push([300, () => up({ ...cur(), bandNote: true })]);
      return S;
    }
    /* the gate (phases 3 and 4) */
    const parts = item.parts ? slotPartsOf(w && w.value, 2).map((t: string) => parseInt(t, 10)) : [NaN, NaN];
    const reversed = !!item.parts && parts[0] === 0 && parts[1] === x.small;
    const q = Math.floor(x.big / x.small), r = x.big % x.small;
    S.push([300, () => up({ ...cur(), tray: x.big, per: x.small, dealt: 0, shelf: 0, ran: false, count: false, cap: false, frame: null, rev: null })]);
    if (reversed) {
      /* the smaller divided by the bigger: no full row at all, the whole of it on the shelf */
      S.push([500, () => up({ ...cur(), tray: x.small, per: x.big })]);
      S.push([900, () => { up({ ...cur(), shelf: x.small, ran: true }); api.sfx.tick(); }]);
      S.push([1300, () => up({ ...cur(), rev: { a: x.small, b: x.big, r: x.small } })]);
      S.push([500, () => up({ ...cur(), tray: x.big, per: x.small, shelf: 0, ran: false })]);
    }
    for (let i = 1; i <= Math.min(q, 18); i++) { const j = i; S.push([i === 1 ? 500 : 260, () => { up({ ...cur(), dealt: j, count: true }); api.sfx.tick(); }]); }
    for (let k = 1; k <= r; k++) { const j = k; S.push([k === 1 ? 500 : 340, () => { up({ ...cur(), shelf: j }); api.sfx.tick(); }]); }
    S.push([700, () => { up({ ...cur(), ran: true, cap: true }); if (!r) api.sfx.tick(); }]);
    if (kind === "game") {
      S.push([900, () => up({ ...cur(), frame: [{ t: "calc", q, per: x.small, r, big: x.big }] })]);
      S.push([1100, () => up({ ...cur(), frame: [{ t: "calc", q, per: x.small, r, big: x.big }, { t: "stmt", a: x.big, b: x.small, rel: "multiple", neg: r > 0, tail: r > 0 ? "so you may not" : "so you may" }] })]);
    } else if (r > 0) {
      S.push([900, () => up({ ...cur(), frame: [{ t: "stmt", a: x.big, b: x.small, rel: "multiple", neg: true }] })]);
      S.push([1100, () => up({ ...cur(), frame: [{ t: "stmt", a: x.big, b: x.small, rel: "multiple", neg: true }, { t: "stmt", a: x.small, b: x.big, rel: "factor", neg: true }] })]);
    }
    return S;
  };
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    tl.run(tracebackSteps(wrong), () => api.lock(false));
  }, [wrong]);

  /* ── the win: the maths moves once more ── */
  useEffect(() => {
    if (stage !== "win") return;
    const x = cur();
    if (x.mode === "gate") {
      const fin = () => {
        const y = cur(), r = y.big % y.small, neg = r > 0;
        if (item.kind === "game") {
          up({ ...y, cap: true, rev: null, frame: [{ t: "stmt", a: y.big, b: y.small, rel: "multiple", neg, tail: neg ? "so you may not" : "so you may" }, { t: "stmt", a: y.small, b: y.big, rel: "factor", neg }] });
          orWinSay(api, y.big, y.small);
          return;
        }
        up({ ...y, cap: true, rev: null, frame: [{ t: "stmt", a: y.big, b: y.small, rel: "multiple", neg }, { t: "stmt", a: y.small, b: y.big, rel: "factor", neg }] });
        orWinSay(api, y.big, y.small);
      };
      if (!x.ran || x.tray !== x.big) { up({ ...x, tray: x.big, per: x.small }); runGate(fin, 45); } else fin();
    } else if (x.mode === "rings") {
      up({ ...x, glow: true, lit: [] });
      if (item.kind === "always") api.say("1 goes into every number exactly.");
    } else if (x.mode === "tracks") up({ ...x, glow: true, lit: [] });
    else if (x.mode === "both") {
      const lB = orFactors(x.q), shared = orFactors(x.p).filter((v) => lB.indexOf(v) >= 0);
      up({ ...x, demoMid: shared, ringNote: true, glow: true });
    }
  }, [stage]);

  /* ── what the host and the agent read back (toolApi.getState) ── */
  const ringsOn = s.mode === "rings" || s.mode === "both";
  const vMid = s.demoMid || s.mid, vCaught = s.demoCaught || s.caught;
  api.share({
    phase: n, picture: s.mode,
    numbers: s.mode === "gate" ? [s.big, s.small] : s.mode === "tracks" ? [s.p, s.q] : [s.a, s.b],
    ringA: ringsOn ? orFactors(s.a) : null, ringB: ringsOn ? orFactors(s.b) : null, ringC: null,
    overlap: ringsOn ? orSet(vMid) : null,
    band: s.mode === "tracks" || s.mode === "both" ? orSet([...s.given, ...vCaught]) : null,
    trackStart: s.mode === "tracks" || s.mode === "both" ? s.view : null,
    gateRemainder: s.mode === "gate" && s.ran ? s.shelf : null,
    complete: stage === "idle",
  });

  const invite = stage === "ask" && !wrong && !s.touched;
  const cord = shade(C.rule, 0.38);

  /* ── the rings (factor mode): two circles of cord, the lists curving inside them ── */
  const drawRings = (G: any, x0: number, tagsLive: boolean, cardsLive: boolean) => {
    const pitch = G.cs + G.gap, cxA = G.R, cxB = cxA + G.d, half = G.cs / 2;
    const sAt = (dy: number) => Math.sqrt(Math.max(0, G.R * G.R - dy * dy));
    /* how far a row of cards may run: the ring's own width at that height, so no card leaves the cord */
    const box = (r: number, which: string) => {
      const off = G.rows[r], smin = sAt(Math.abs(off) + half), smax = sAt(Math.max(0, Math.abs(off) - half)), y = G.cy + off - half;
      return which === "M" ? { y, left: cxB - smin, right: cxA + smin }
        : which === "A" ? { y, left: cxA - smin, right: cxB - smax }
          : { y, left: cxA + smax, right: cxB + smin };
    };
    const place = (count: number, which: string) => {
      const boxes = G.rows.map((_: any, r: number) => box(r, which));
      const caps = boxes.map((b: any) => Math.max(0, Math.floor((b.right - b.left + G.gap) / pitch)));
      const order = G.rows.length === 5 ? [[2], [1, 2], [1, 2, 3], [0, 1, 2, 3], [0, 1, 2, 3, 4]] : [[0], [0, 1]];
      let use = order[order.length - 1];
      for (let i = 0; i < order.length; i++) if (order[i].reduce((a: number, r: number) => a + caps[r], 0) >= count) { use = order[i]; break; }
      const out: any[] = [];
      let k = 0;
      use.forEach((r: number) => {
        const n = Math.min(caps[r], count - k);
        if (n <= 0) return;
        const b = boxes[r], w = n * pitch - G.gap, sx = (b.left + b.right) / 2 - w / 2;
        for (let j = 0; j < n; j++) out.push({ x: sx + j * pitch, y: b.y });
        k += n;
      });
      return out;
    };
    const lA = orFactors(s.a), lB = orFactors(s.b), mids = orSet(vMid);
    const pA = place(lA.length, "A"), pB = place(lB.length, "B"), pM = place(mids.length, "M");
    const hL = Math.sqrt(G.R * G.R - (G.d / 2) * (G.d / 2)), xm = (cxA + cxB) / 2;
    const lens = `M ${xm} ${G.cy - hL} A ${G.R} ${G.R} 0 0 1 ${xm} ${G.cy + hL} A ${G.R} ${G.R} 0 0 1 ${xm} ${G.cy - hL} Z`;
    const cards: any[] = [];
    lA.forEach((v, k) => { if (mids.indexOf(v) < 0 && pA[k]) cards.push({ key: "A-" + v, v, x: pA[k].x, y: pA[k].y, mid: false }); });
    lB.forEach((v, k) => { if (mids.indexOf(v) < 0 && pB[k]) cards.push({ key: "B-" + v, v, x: pB[k].x, y: pB[k].y, mid: false }); });
    mids.forEach((v, j) => { if (pM[j]) cards.push({ key: (lA.indexOf(v) >= 0 ? "A-" : "B-") + v, v, x: pM[j].x, y: pM[j].y, mid: true }); });
    cards.sort((p: any, q: any) => (p.key < q.key ? -1 : 1));
    const tg = G.tag, big = G.cs >= 72;
    const tag = (side: string, cx: number, v: number) => (
      <g key={"tag" + side}>
        <rect x={cx - tg.w / 2} y={tg.cy - tg.h / 2} width={tg.w} height={tg.h} rx={14} fill="#FFFFFF" stroke={cord} strokeWidth={3} />
        <text x={cx - (tagsLive ? 12 : 0)} y={tg.cy + (big ? 11 : 10)} textAnchor="middle" fontSize={big ? T.label : T.micro} fontWeight={700} fill={C.ink}>{v}</text>
        {tagsLive && <path d={`M ${cx + 22} ${tg.cy - 11} l 10 11 l -10 11`} fill="none" stroke={C.accent} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />}
        {tagsLive && <Hit id={"ring-" + side} x={cx - 50} y={0} w={100} h={72} onPress={() => cycle(side)} label={`change the number ${v}`} />}
      </g>
    );
    return (
      <g style={{ transform: `translate(${x0}px,0px)`, transition: fast ? "none" : "transform 450ms ease" } as any}>
        <g>
          <path d={lens} fill={tint(OR_ROSE, 0.86)} />
          <circle cx={cxA} cy={G.cy} r={G.R} fill="none" stroke={cord} strokeWidth={6} />
          <circle cx={cxB} cy={G.cy} r={G.R} fill="none" stroke={cord} strokeWidth={6} />
          {tag("a", cxA - tg.off, s.a)}
          {tag("b", cxB + tg.off, s.b)}
          {cards.map((c: any) => (
            <OrCard key={c.key} id={"card-" + c.key} x={c.x} y={c.y} s={G.cs} v={c.v} mid={c.mid} C={C} fast={fast}
              lit={s.lit.indexOf(c.v) >= 0} glow={s.glow && c.mid} live={cardsLive} onPress={() => lift(c.v, !c.mid)}
              label={c.mid ? `send ${c.v} back` : `lift ${c.v} into the middle`} />
          ))}
        </g>
      </g>
    );
  };

  /* the gate beside the rings: each card tested on both numbers (phase 1), or free play's division */
  const drawBoard = () => {
    const B = OR_BOARD, cx = B.x + B.w / 2;
    const t = s.test;
    return (
      <g>
        <rect x={B.x} y={B.y} width={B.w} height={B.h} rx={RAD.panel} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={2} />
        {t !== null && (
          <g>
            <rect x={cx - 42} y={B.y + 20} width={84} height={84} rx={16} fill={tint(OR_BLUE, 0.8)} stroke={shade(OR_BLUE, 0.08)} strokeWidth={3} />
            <text x={cx} y={B.y + 76} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{t}</text>
            {[s.a, s.b].map((N: number, k: number) => (
              <g key={k}>
                <text x={B.x + 28} y={B.y + 170 + k * 110} fontSize={T.label} fontWeight={600} fill={C.ink}>{`${N} ÷ ${t}`}</text>
                <text x={B.x + 28} y={B.y + 214 + k * 110} fontSize={T.label} fontWeight={700} fill={C.ink}>{en ? `${N % t} left` : `${N % t} ${tx("left")}`}</text>
              </g>
            ))}
          </g>
        )}
        {t === null && !s.free && (
          <text x={cx} y={B.y + 210} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("the divide gate")}</text>
        )}
        {s.free && (
          <g>
            <Key id="divide" label="divide" x={B.x + 22} y={B.y + 14} w={B.w - 44} h={80} C={C} onClick={freeDivide} disabled={!live}>
              <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("divide")}</text>
            </Key>
            {s.fres && (
              <g>
                <text x={cx} y={B.y + 146} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{`${s.fres.big} ÷ ${s.fres.small} =`}</text>
                <text x={cx} y={B.y + 190} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{en ? `${s.fres.q}, ${s.fres.r} left` : `${s.fres.q}, ${tx("remainder")} ${s.fres.r}`}</text>
                <text x={cx} y={B.y + 236} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{en ? `${s.fres.big} ${s.fres.r ? "isn't" : "is"} a` : (lang === "hi" ? `${s.fres.big}, ${s.fres.small}` : `${s.fres.big} ${tx("between two numbers")} ${s.fres.small}`)}</text>
                <text x={cx} y={B.y + 270} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{en ? `multiple of ${s.fres.small}` : tx(s.fres.r ? "isn't a multiple of" : "is a multiple of")}</text>
              </g>
            )}
            <Key id="mode" label="switch to multiples" x={B.x + 22} y={B.y + B.h - 94} w={B.w - 44} h={80} C={C} onClick={flipMode} disabled={!live}>
              <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("multiples")}</text>
            </Key>
          </g>
        )}
      </g>
    );
  };

  /* ── the tracks (multiple mode): lists of multiples that run out through the right-hand edge ── */
  const drawTracks = (top: number, keysAt: any) => {
    const u = OR_TR.pitch / Math.min(s.p, s.q), xOf = (v: number) => OR_TR.x0 + (v - s.view) * u;
    const inView = (v: number) => { const X = xOf(v); return X >= OR_TR.x0 - 0.5 && X <= OR_TR.xMax; };
    const listIn = (step: number) => { const out: number[] = []; for (let v = Math.max(step, Math.ceil(s.view / step) * step); inView(v) || v < s.view; v += step) if (inView(v)) out.push(v); return out; };
    const fa = listIn(s.p), fb = listIn(s.q);
    const band = orSet([...s.given, ...vCaught]);
    const yA = top + 80, yB = top + 196, spotA = top + 36, spotB = top + 240;
    const lanes = [top + 138, top + 112, top + 164], last = [-1e9, -1e9, -1e9];
    const at: Record<number, number> = {};
    band.filter(inView).forEach((v) => {
      const X = xOf(v); let k = [0, 1, 2].find((j) => X - last[j] >= 66);
      if (k === undefined) k = 0;
      last[k] = X; at[v] = lanes[k];
    });
    const flagsLive = live;
    /* the card in the band is what sends a number back, and it takes the finger box only where its
       neighbours leave room for one */
    const seen = band.filter(inView);
    const roomy = seen.filter((v) => s.given.indexOf(v) < 0 && seen.every((w) => w === v || Math.abs(xOf(w) - xOf(v)) >= 72));
    const onA = (v: number) => v % s.p === 0, onB = (v: number) => v % s.q === 0;
    const trackStart = s.view === 0 ? OR_TR.x0 - 18 : 150;
    const head = (y: number, step: number, side: string) => (
      <g key={"head" + side}>
        {/* Hindi and Gujarati say the number first ("4 के गुणज"), so the two lines swap there */}
        {en ? <text x={12} y={y + 30} fontSize={T.micro} fontWeight={600} fill={C.ink}>multiples</text>
          : <text x={12} y={y + 66} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("multiples")}</text>}
        {en ? <text x={12} y={y + 64} fontSize={T.label} fontWeight={700} fill={shade(OR_GREEN, 0.3)}>{`of ${step}`}</text>
          : <text x={12} y={y + 32} fontSize={T.label} fontWeight={700} fill={shade(OR_GREEN, 0.3)}>{`${step} ${tx("of")}`}</text>}
        {free && flagsLive && <Hit id={"track-" + side} x={0} y={y} w={140} h={72} onPress={() => cycle(side)} label={`change the steps of ${step}`} />}
      </g>
    );
    const cards: any[] = [];
    fa.forEach((v) => { if (band.indexOf(v) < 0) cards.push({ key: "fA-" + v, v, x: xOf(v), y: spotA, rose: false }); });
    fb.forEach((v) => { if (band.indexOf(v) < 0) cards.push({ key: "fB-" + v, v, x: xOf(v), y: spotB, rose: false }); });
    band.filter(inView).forEach((v) => cards.push({ key: (onA(v) ? "fA-" : "fB-") + v, v, x: xOf(v), y: at[v], rose: true }));
    cards.sort((p: any, q: any) => (p.key < q.key ? -1 : 1));
    /* Hindi and Gujarati labels run longer ("આગળ ચલાવો"): the two keys are wider there */
    const kw = en ? 186 : 230;
    const runKey = (id: string, label: string, x: number, y: number, dir: number, off: boolean) => (
      <Key id={id} label={label} x={x} y={y} w={kw} h={76} C={C} onClick={() => runOn(dir)} disabled={off}>
        <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={off ? mix(C.ink, C.panel, 0.5) : C.ink}>{tx(label)}</text>
      </Key>
    );
    return (
      <g>
        {/* the band between the tracks: open at the right, like the tracks */}
        <rect x={150} y={top + 88} width={936} height={100} fill={tint(OR_ROSE, 0.86)} />
        <path d={`M 150 ${top + 88} H 1086 M 150 ${top + 188} H 1086`} stroke={tint(OR_ROSE, 0.4)} strokeWidth={2} />
        {en || tx("in both").indexOf(" ") < 0
          ? <text x={12} y={top + 146} fontSize={T.micro} fontWeight={600} fill={shade(OR_ROSE, 0.35)}>{tx("in both")}</text>
          : /* a two-word label (साझा पट्टी) takes two lines, so it stops short of the band's first card */
          <text x={12} y={top + (s.bandNote ? 112 : 124)} fontSize={T.micro} fontWeight={600} fill={shade(OR_ROSE, 0.35)}>
            <tspan x={12}>{tx("in both").split(" ")[0]}</tspan>
            <tspan x={12} dy={28}>{tx("in both").split(" ").slice(1).join(" ")}</tspan>
          </text>}
        {s.bandNote && <text x={12} y={top + 180} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("no end")}</text>}
        <path d={`M ${trackStart} ${yA} H 1086 M ${trackStart} ${yB} H 1086`} stroke={cord} strokeWidth={8} strokeLinecap="butt" />
        {s.view === 0 && <path d={`M ${trackStart} ${yA - 16} V ${yA + 16} M ${trackStart} ${yB - 16} V ${yB + 16}`} stroke={cord} strokeWidth={6} strokeLinecap="round" />}
        {head(top, s.p, "a")}
        {head(top + 204, s.q, "b")}
        {/* poles: the steps stay drawn behind a caught number */}
        {fa.map((v) => <path key={"pa" + v} d={`M ${xOf(v)} ${top + 58} V ${yA}`} stroke={shade(OR_GREEN, 0.1)} strokeWidth={3} />)}
        {fb.map((v) => <path key={"pb" + v} d={`M ${xOf(v)} ${yB} V ${top + 218}`} stroke={shade(OR_GREEN, 0.1)} strokeWidth={3} />)}
        {fa.filter((v) => band.indexOf(v) >= 0).map((v) => <rect key={"ea" + v} x={xOf(v) - 30} y={spotA - 22} width={60} height={44} rx={10} fill="none" stroke={tint(OR_GREEN, 0.3)} strokeWidth={2} strokeDasharray="6 5" />)}
        {fb.filter((v) => band.indexOf(v) >= 0).map((v) => <rect key={"eb" + v} x={xOf(v) - 30} y={spotB - 22} width={60} height={44} rx={10} fill="none" stroke={tint(OR_GREEN, 0.3)} strokeWidth={2} strokeDasharray="6 5" />)}
        {s.lit.filter(inView).map((v: number) => <rect key={"lt" + v} x={xOf(v) - 38} y={top + 6} width={76} height={264} rx={16} fill="none" stroke={C.accent} strokeWidth={4} />)}
        {cards.map((c: any) => <OrFlag key={c.key} x={c.x} y={c.y} v={c.v} rose={c.rose} fast={fast} C={C} />)}
        {s.glow && band.filter(inView).map((v) => <rect key={"gl" + v} x={xOf(v) - 36} y={at[v] - 28} width={72} height={56} rx={14} fill="none" stroke={shade(OR_ROSE, 0.1)} strokeWidth={4} />)}
        {flagsLive && fa.filter((v) => s.given.indexOf(v) < 0 && band.indexOf(v) < 0).map((v) => <Hit key={"ha" + v} id={"flag-a-" + v} x={xOf(v) - 36} y={top} w={72} h={72} onPress={() => catchV(v, true)} label={`${v} on the track of ${s.p}`} />)}
        {flagsLive && fb.filter((v) => s.given.indexOf(v) < 0 && band.indexOf(v) < 0).map((v) => <Hit key={"hb" + v} id={"flag-b-" + v} x={xOf(v) - 36} y={top + 204} w={72} h={72} onPress={() => catchV(v, true)} label={`${v} on the track of ${s.q}`} />)}
        {flagsLive && roomy.map((v: number) => <Hit key={"hc" + v} id={"band-" + v} x={xOf(v) - 36} y={at[v] - 36} w={72} h={72} onPress={() => catchV(v, false)} label={`send ${v} back to its track`} />)}
        {s.readout && orNums(s.readout).some((v: number) => !inView(v)) && (
          <g>
            <rect x={170} y={top + 290} width={30 + s.readout.length * 19} height={52} rx={14} fill="#FFFFFF" stroke={shade(OR_ROSE, 0.1)} strokeWidth={3} />
            <text x={185} y={top + 328} fontSize={T.label} fontWeight={700} fill={shade(OR_ROSE, 0.35)}>{s.readout}</text>
          </g>
        )}
        {runKey("go-back", "go back", keysAt.x, keysAt.yBack, -1, !live || s.view === 0)}
        {runKey("run-on", "run on", keysAt.xOn, keysAt.yOn, 1, !live)}
        {invite && (item.kind === "next3" || item.kind === "first4") && (en ? <Invite x={keysAt.xOn + 93} y={keysAt.yOn + 38} r={58} C={C} />
          : <rect className="c4-pulse" x={keysAt.xOn - 8} y={keysAt.yOn - 8} width={kw + 16} height={92} rx={24} fill="none" stroke={C.accent} strokeWidth={5} pointerEvents="none" />)}
      </g>
    );
  };

  /* ── the divide gate: the number shared out, the row size, rows with walls, the leftover shelf ── */
  const drawGate = () => {
    const G = OR_GATE;
    const q = s.dealt, per = s.per;
    const rowsDrawn: any[] = [];
    for (let r = 0; r < Math.min(q, 18); r++) {
      const col = r < 9 ? 0 : 1, y = G.top + (r % 9) * G.pitch, x0 = G.cols[col];
      rowsDrawn.push(
        <g key={"r" + r}>
          <rect x={x0 - 5} y={y - 1} width={per * G.dot + 10} height={30} rx={8} fill={tint(OR_AMBER, 0.85)} />
          {Array.from({ length: per }, (_: any, k: number) => (
            <circle key={k} cx={x0 + 15 + k * G.dot} cy={y + 14} r={G.r} fill="url(#gTen)" stroke="#00000022" strokeWidth={1.5} />
          ))}
          {s.count && <text x={x0 - 14} y={y + 24} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{r + 1}</text>}
        </g>
      );
    }
    const cellY = (r: number) => G.top + r * G.pitch;
    const frameRow = (row: any, y: number, k: number) => {
      if (row.t === "calc") {
        const t1 = `${row.q} × ${row.per} =`, t2 = `${row.q * row.per} + ${row.r} =`;
        const x1 = 282 + t1.length * 15 + 12, x2 = x1 + String(row.q * row.per).length * 20 + 56, x3 = x2 + t2.length * 15 + 12;
        return (
          <g key={k}>
            <text x={282} y={y} fontSize={T.label} fontWeight={600} fill={C.ink}>{t1}</text>
            <text x={x1} y={y} fontSize={T.label} fontWeight={700} fill={C.ink}>{row.q * row.per}</text>
            <text x={x2} y={y} fontSize={T.label} fontWeight={600} fill={C.ink}>{t2}</text>
            <text x={x3} y={y} fontSize={T.label} fontWeight={700} fill={C.ink}>{row.big}</text>
          </g>
        );
      }
      const rel = `${row.neg ? "isn't" : "is"} a ${row.rel} of`;
      const w1 = 30 + String(row.a).length * 20, relX = 282 + w1 + 16, x2 = relX + rel.length * 13.8 + 14;
      if (!en) {
        /* Hindi and Gujarati put both numbers first: 74, 9 का गुणज नहीं है / 74 એ 9 નો અવયવી નથી
           (every number here is below 1,000, so Hindi needs no word between them, only the comma) */
        const hi = lang === "hi", jn = hi ? "," : tx("between two numbers"), jx = 282 + w1 + (hi ? 4 : 12);
        const bx = jx + (hi ? 14 : Math.max(34, jn.length * 13)) + 12, tX = bx + 30 + String(row.b).length * 20 + 16;
        return (
          <g key={k}>
            <OrChip x={282} y={y} v={row.a} big={row.a === s.big} />
            <text x={jx} y={y} fontSize={T.label} fontWeight={600} fill={C.ink}>{jn}</text>
            <OrChip x={bx} y={y} v={row.b} big={row.b === s.big} />
            <text x={tX} y={y} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx(rel)}{row.tail && <tspan fontWeight={700}>{", " + tx(row.tail)}</tspan>}</text>
          </g>
        );
      }
      return (
        <g key={k}>
          <OrChip x={282} y={y} v={row.a} big={row.a === s.big} />
          <text x={relX} y={y} fontSize={T.label} fontWeight={600} fill={C.ink}>{rel}</text>
          <OrChip x={x2} y={y} v={row.b} big={row.b === s.big} />
          {row.tail && <text x={x2 + 30 + String(row.b).length * 20 + 20} y={y} fontSize={T.label} fontWeight={700} fill={C.ink}>{row.tail}</text>}
        </g>
      );
    };
    const quiet = mix(C.ink, C.panel, 0.5), dim = mix(C.ink, C.paper, 0.6);
    return (
      <g>
        {/* the mouth: what is shared out, and the size of each row */}
        <rect x={8} y={4} width={188} height={124} rx={RAD.panel} fill={tint(OR_AMBER, 0.82)} stroke={shade(OR_AMBER, 0.1)} strokeWidth={3} />
        <text x={102} y={38} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("share out")}</text>
        <text x={102} y={108} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{s.tray}</text>
        <text x={102} y={160} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>÷</text>
        <rect x={8} y={168} width={188} height={124} rx={RAD.panel} fill={tint(OR_BLUE, 0.82)} stroke={shade(OR_BLUE, 0.1)} strokeWidth={3} />
        <text x={102} y={202} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("rows of")}</text>
        <text x={102} y={272} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{s.per}</text>
        <Key id="divide" label="divide" x={14} y={316} w={176} h={90} C={C} onClick={tapDivide} disabled={!live}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={live ? C.ink : quiet}>{tx("divide")}</text>
        </Key>
        {invite && <Invite x={102} y={361} r={64} C={C} />}
        {/* the two rings of phases 1 and 2, dimmed right back: this one is settled without a list */}
        <g>
          {/* Hindi and Gujarati vowel signs rise above the label's line: the rings sit higher there */}
          <circle cx={en ? 79 : 81} cy={en ? 462 : 450} r={en ? 40 : 36} fill="none" stroke={dim} strokeWidth={4} />
          <circle cx={en ? 125 : 123} cy={en ? 462 : 450} r={en ? 40 : 36} fill="none" stroke={dim} strokeWidth={4} />
          <text x={102} y={522} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={mix(C.ink, C.paper, 0.3)}>{tx("no lists")}</text>
        </g>
        {/* the ruled board: nine row places in each of two columns, a wall between every two */}
        <rect x={G.boardX} y={0} width={G.boardW} height={316} rx={RAD.panel} fill={tint(C.panel, 0.6)} stroke={C.rule} strokeWidth={2} />
        {G.cols.map((x0, c) => Array.from({ length: 8 }, (_: any, r: number) => (
          <path key={c + "-" + r} d={`M ${x0 - 10} ${cellY(r + 1) - 3} H ${x0 + 280}`} stroke={C.rule} strokeWidth={2} />
        )))}
        {rowsDrawn}
        {/* the leftover shelf: outside the rows, at full strength */}
        <rect x={G.boardX} y={G.shelfY} width={G.boardW} height={84} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} />
        <text x={246} y={G.shelfY + 52} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("left over")}</text>
        {Array.from({ length: Math.min(s.shelf, 9) }, (_: any, k: number) => (
          <circle key={"s" + k} cx={G.shelfDot + k * 34} cy={G.shelfY + 42} r={13} fill="url(#gPointer)" stroke="#00000022" strokeWidth={1.5} />
        ))}
        {s.cap && (
          <g>
            <text x={880} y={G.shelfY + 34} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("quotient")}</text>
            <text x={900} y={G.shelfY + 36} fontSize={T.label} fontWeight={700} fill={C.ink}>{s.dealt}</text>
            <text x={880} y={G.shelfY + 72} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("remainder")}</text>
            <text x={900} y={G.shelfY + 74} fontSize={T.label} fontWeight={700} fill={C.ink}>{s.shelf}</text>
          </g>
        )}
        {(s.frame || []).map((row: any, k: number) => frameRow(row, k === 0 ? 462 : 514, k))}
        {/* the way round that would not come out, on its own small board beside the right one */}
        {s.rev && (
          <g>
            <rect x={230} y={424} width={392} height={100} rx={RAD.panel} fill={tint(C.panel, 0.45)} stroke={C.rule} strokeWidth={2} />
            <text x={248} y={456} fontSize={T.micro} fontWeight={700} fill={C.ink}>{`${s.rev.a} ÷ ${s.rev.b}`}</text>
            <rect x={248} y={468} width={176} height={40} rx={8} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="8 6" />
            <text x={258} y={496} fontSize={T.micro} fontWeight={500} fill={quiet}>{tx("no full row")}</text>
            <text x={444} y={456} fontSize={T.micro} fontWeight={600} fill={C.ink}>{en ? `${s.rev.r} left` : `${s.rev.r} ${tx("left")}`}</text>
            {Array.from({ length: Math.min(s.rev.r, 9) }, (_: any, k: number) => (
              <circle key={"v" + k} cx={452 + k * 20} cy={492} r={9} fill="url(#gPointer)" stroke="#00000022" strokeWidth={1.5} />
            ))}
          </g>
        )}
      </g>
    );
  };

  /* the running count (runs zone): cards lifted into the middle against the cards laid out;
     in multiple mode the band's count against an open dash, since that list has no length */
  /* Hindi and Gujarati count the other way round: "14 में से 3" / "14 માંથી 3" */
  const ofL = (a: any, b: any) => (en ? `${a} of ${b}` : `${b} ${tx("out of")} ${a}`);
  const runs = s.mode === "rings" ? [ofL(orSet(vMid).length, orSet([...orFactors(s.a), ...orFactors(s.b)]).length), "in the middle"]
    : s.mode === "tracks" || s.mode === "both" ? [ofL(orSet([...s.given, ...vCaught]).length, "—"), "in the band"] : null;

  return (
    <g>
      {runs && (
        <g data-zone="runs">
          <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          <text x={18} y={-60} fontSize={T.micro} fontWeight={500} fill={C.ink}>{tx(runs[1])}</text>
          <text x={18} y={-26} fontSize={T.label} fontWeight={700} fill={C.ink}>{runs[0]}</text>
        </g>
      )}
      {s.mode === "rings" && drawRings(OR_RING, s.board ? 0 : OR_SHIFT, live && (free || item.kind === "always"), live)}
      {s.mode === "rings" && s.board && drawBoard()}
      {s.mode === "tracks" && drawTracks(70, en ? { x: 690, yBack: 418, xOn: 894, yOn: 418 } : { x: 610, yBack: 418, xOn: 856, yOn: 418 })}
      {s.mode === "tracks" && free && (
        <Key id="mode" label="switch to factors" x={170} y={418} w={220} h={76} C={C} onClick={flipMode} disabled={!live}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("factors")}</text>
        </Key>
      )}
      {s.mode === "both" && drawRings(OR_RING_MINI, OR_RING_MINI.x0, false, false)}
      {s.mode === "both" && drawTracks(236, en ? { x: 880, yBack: 150, xOn: 880, yOn: 60 } : { x: 856, yBack: 150, xOn: 856, yOn: 60 })}
      {s.mode === "both" && s.ringNote && (
        <g>
          <text x={24} y={124} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("factors")}</text>
          <text x={24} y={166} fontSize={T.label} fontWeight={700} fill={shade(OR_ROSE, 0.35)}>{tx("they stop")}</text>
        </g>
      )}
      {s.mode === "gate" && drawGate()}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ n, result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const L = result && result.last;
  if (!L) return null;
  const P = PHASES[(n || 1) - 1];
  const it: any = P && P.items[L.item];
  if (!it) return null;
  let top = "", bottom = "";
  if (it.kind === "common" || it.kind === "always") { top = `${it.a} and ${it.b}`; bottom = String(L.value); }
  else if (it.kind === "next3" || it.kind === "first4") { top = `${it.p}s and ${it.q}s`; bottom = String(L.value); }
  else if (it.kind === "stops") { top = "factors"; bottom = "they stop"; }
  else {
    const q = Math.floor(it.big / it.small), r = it.big % it.small;
    top = `${it.big} ÷ ${it.small}`; bottom = r ? `${q}, ${r} left` : `${q}, 0 left`;
  }
  /* Hindi and Gujarati: the same words through the tool's table; a word stands between the quotient
     and the remainder, never a bare comma between two numbers */
  if (lang !== "en") {
    if (it.kind === "common" || it.kind === "always") top = `${it.a} ${tx("and")} ${it.b}`;
    else if (it.kind === "next3" || it.kind === "first4") top = `${it.p} ${tx("and")} ${it.q} ${tx("multiples of")}`;
    else if (it.kind === "stops") { top = tx("factors"); bottom = tx("they stop"); }
    else bottom = `${Math.floor(it.big / it.small)}, ${tx("remainder")} ${it.big % it.small}`;
  }
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {/* Hindi and Gujarati: more leading, so the signs under line 1 clear the headline of line 2 */}
      <text x={14} y={lang === "en" ? h / 2 - 4 : h / 2 - 10} fontSize={T.micro} fontWeight={600} fill={C.ink}>{top}</text>
      <text x={14} y={lang === "en" ? h / 2 + 28 : h / 2 + 32} fontSize={T.micro} fontWeight={700} fill={shade(OR_ROSE, 0.35)}>{bottom}</text>
    </g>
  );
}

function OverlapRings(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null }} />
  );
}

export default OverlapRings;
