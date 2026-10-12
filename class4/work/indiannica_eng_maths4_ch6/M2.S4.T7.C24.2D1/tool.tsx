/* ═══ M2.S4.T7.C24.2D1 · digit_tester · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "digit_tester";
const MEDIA_ID = "M2.S4.T7.C24.2D1";
const TOOL_NAME = "Digit Tester";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line) */
const OPENING = ["A number laid out, one digit to a cell, and four lamps underneath it."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Four tests run, every cell counted in, and one slot that stayed dark.";
/* said when the child opens Free play from the summary page (the plan's line said "the sharing bay
   beside them"; free play here is the cells and the lamps, so the line says what is really there) */
const FREE_LINE = "Free play. Tap a cell to change its digit, then press any lamp to test the number.";

/* the chapter's answer keys and the two boxes of a sharing answer */
const DT_YESNO = [{ id: "yes", label: "yes" }, { id: "no", label: "no" }];
const DT_KNOWN = [{ id: "yes", label: "yes" }, { id: "no", label: "no" }, { id: "not known", label: "not known" }];
const DT_PROVED = [{ id: "by 3 only", label: "by 3 only" }, { id: "by 3 and 6", label: "by 3 and 6" }];
const DT_SHARE = [{ label: "sharing" }, { label: "left over" }];
const DT_ASK_SHARE = "How many share? How many left?";

/* One entry per phase = one mount. Items carry what the working area draws:
   verdict  num, d      (a yes / no test for 2, 5 or 10 from the ones cell)
   total    num         (every cell down onto the rail; the digit total is typed; the lamp for 3 tests it)
   mystery  d           (a number that passed all four lamps; what is known about d?)
   list     ones, sum   (the lamps the child marks on a number known only by its clues)
   proof    num, d      (what did the test for 3 prove?)
   share    friends, things, host, thing (count everyone sharing, then what is left over) */
const PHASES = [
  {
    n: 1,
    concept: "Reading the last digit",
    conceptId: "M2.S4.T7.C24", objectiveIds: ["O11"],
    says: ["Cover everything but the end. Can you still answer? Which digit did it?",
      "Press the lamp for a test, and the shutter covers all but the last cell."],
    ladder: ["What is standing in the ones cell?", "Read only the digit that is still showing, then decide."],
    closing: "The ones digit alone settles the tests for two, for five and for ten.",
    learned: "You learned: only the last digit matters for 2, 5 and 10.",
    traceback: "The shutter opens and the cells are named from the right, ones first; the shutter covers all but the ones cell, its digit is laid against the digits that pass, the lamp gives its verdict and the number is divided out on the board.",
    items: [
      /* learn ML1: answer in the plan = Yes, because its ones digit is 6 */
      { qid: "M2.S4.T7.C24:ML1", kind: "verdict", num: 4386, d: 2, answer: "yes", choices: DT_YESNO, winMs: 3400, ask: "Divisible by 2?",
        say: "Is 4,386 divisible by 2? Look only at the end of it.", miss: "Which cell is the ones cell?" },
      /* practice 1: answer in the plan = No. Its ones digit is 4, and a number divisible by 5 ends in 5 or 0 */
      { qid: "M2.S4.T7.C24:1", kind: "verdict", num: 7314, d: 5, answer: "no", choices: DT_YESNO, winMs: 3400, ask: "Divisible by 5?",
        say: "Is 7,314 divisible by 5?", miss: "Which ones digits pass the test for five?" },
      /* practice 2: answer in the plan = Yes. Its ones digit is 0, and 6470 divided by 10 is 647 */
      { qid: "M2.S4.T7.C24:2", kind: "verdict", num: 6470, d: 10, answer: "yes", choices: DT_YESNO, winMs: 3400, ask: "Divisible by 10?",
        say: "Is 6,470 divisible by 10?", miss: "For ten, what must stand in the last cell?" },
      /* practice 5 (2,946 and 2,945) is left out: a phase has exactly three questions, and these three
         cover all three last-digit tests (2, 5 and 10) */
    ],
  },
  {
    n: 2,
    concept: "Adding every digit for three",
    conceptId: "M2.S4.T7.C25", objectiveIds: ["O11"],
    says: ["Take every cell down, even the empty looking ones. Leave none out.", "Drag each cell of this number onto the rail below it."],
    /* the phase opens on the child's act: every cell of the first number comes down onto the rail while the
       pad waits; later questions judge nothing while a cell is still up (a gate at Enter) */
    demo: { rail: true },
    demoLines: ["Every cell is on the rail, zeros and all."],
    ladder: ["How many cells does this number have altogether?", "Say the total out loud as you touch each digit on the rail."],
    closing: "Every digit goes into the total for the test for three, zeros included.",
    learned: "You learned: add every digit, zeros too, then test the total.",
    traceback: "Every cell still up is lit and brought down onto the rail in order, zeros included; each digit on the rail lights as it is added, the rail closes, the total is written and runs up through the lamp for three.",
    items: [
      /* learn ML2: answer in the plan = Yes, because the digits add to 18 and 3 divides 18 (asked: the digit total) */
      { qid: "M2.S4.T7.C25:ML2", kind: "total", num: 40608, answer: 18, winMs: 4000, ask: "Digit total?",
        say: "To test 40,608 for three, add every digit on the rail. What is the total?", miss: "Count the cells on the rail. Did every one go into your total?" },
      /* practice 3: answer in the plan = The digits add to 9, so yes; 3105 divided by 3 is 1035 (asked: the digit total) */
      { qid: "M2.S4.T7.C25:3", kind: "total", num: 3105, answer: 9, winMs: 4000, ask: "Digit total?",
        say: "Add every digit of 3,105. Bring each cell down first, then type the total.", miss: "Point at each digit on the rail as you add it." },
      /* practice 4: answer in the plan = Yes. Every digit counts, so 5 and 0 and 0 and 7 and 3 add to 15, which 3 divides.
         Asked as the verdict: the total shows once the rail closes, and the child tests it (the phase's named
         mistake is stopping at the total) */
      { qid: "M2.S4.T7.C25:4", kind: "three", num: 50073, answer: "yes", choices: DT_YESNO, winMs: 3600, ask: "Does 3 divide 50,073?",
        say: "Test 50,073 for divisibility by 3. Bring every cell down, then decide.", miss: "Does three go into the total exactly?" },
    ],
  },
  {
    n: 3,
    concept: "What the tests do not cover",
    conceptId: "M2.S4.T7.C26", objectiveIds: ["O12"],
    says: ["It passed every test here. The dark slot is a test this chapter never taught."],
    ladder: ["Is the number you are being asked about one of them?", "Count the lamps, then look for a lamp with that number on it."],
    closing: "A test answers for the number you tested by, and for no other. So these four tests settle four things and nothing else.",
    learned: "You learned: four tests are taught here, and they settle nothing else.",
    traceback: "The dark slot flickers and stays dark. Two numbers that pass all four lamps are divided by four side by side, one with nothing left and one with two left; or each lamp is run in turn on the clues; or 7,005 is divided by six with three left and the lamp for two stays empty.",
    items: [
      /* learn ML3: answer in the plan = Nothing at all */
      { qid: "M2.S4.T7.C26:ML3", kind: "mystery", d: 4, answer: "not known", choices: DT_KNOWN, winMs: 2600, ask: "Does it divide by 4?",
        say: "A number passes the tests for 2, for 3, for 5 and for 10. What do you now know about 4?", miss: "Which tests has this chapter taught you?" },
      /* practice 6: answer in the plan = All four: by 2, by 5 and by 10 from its ones digit, and by 3 because 3 divides 12 */
      { qid: "M2.S4.T7.C26:6", kind: "list", ones: 0, sum: 12, answer: [2, 3, 5, 10], pad: "enter", winMs: 3800, ask: "Which tests does it pass?",
        say: "A number ends in 0 and its digits add to 12. Which of this chapter's four tests does it pass? Tap each lamp it passes, then press enter.",
        miss: "Take the lamps one at a time. What does each one look at?" },
      /* practice 7: answer in the plan = The chapter has no test for 6, and 7005 does not divide by 6 at all, because it is odd.
         A test answers for the number tested by and no other. Asked as: what did her test prove? */
      { qid: "M2.S4.T7.C26:7", kind: "proof", num: 7005, d: 6, answer: "by 3 only", choices: DT_PROVED, winMs: 3600, ask: "What did the test prove?",
        say: "A child shows that 7,005 divides by 3. Then she says it must divide by 6 as well. What did her test prove?", miss: "Which lamp did she really run?" },
    ],
  },
  {
    n: 4,
    concept: "Testing for the right number of people",
    conceptId: "M2.S4.T7.C27", objectiveIds: ["O12"],
    says: ["Count everyone who is sharing. Have you counted the one handing them out?"],
    ladder: ["Is anybody sharing who has not been counted yet?", "Count the figures one by one, tick the box, then share out by the new count."],
    closing: "Before you choose a divisor, count every person who is sharing, the one handing out too.",
    learned: "You learned: the person handing things out is sharing as well.",
    traceback: "The child's own count is shared out on a board, a row for each person and the leftover on its shelf; the host's box is ticked, the figures are counted one at a time, and the true count is shared out round by round on a second board beside it.",
    items: [
      /* learn ML4: answer in the plan = Five people are sharing, counting the boy, and none will be left */
      { qid: "M2.S4.T7.C27:ML4", kind: "share", friends: 4, things: 35, host: "boy", pron: "him", thing: "laddoos", answer: [5, 0], parts: DT_SHARE, winMs: 5600, ask: DT_ASK_SHARE,
        say: "A boy asks 4 friends to his party and has 35 laddoos to share out equally. Who is sharing, and will any be left?", miss: "How many friends were asked?" },
      /* authored: the plan gives this phase two questions; this is the book's own example ("Six people
         leave two over"), fifty shared by five friends and the one handing them out */
      { qid: null, kind: "share", friends: 5, things: 50, host: "girl", pron: "her", thing: "sweets", answer: [6, 2], parts: DT_SHARE, winMs: 5600, ask: DT_ASK_SHARE,
        say: "A girl shares 50 sweets with her 5 friends, and keeps one share for herself. She tests 50 by 5, and is sure none will be left over.",
        miss: "Is the girl in your count, or only her friends?" },
      /* practice 8: answer in the plan = Himself. With him there are 8 sharing, and 70 divided by 8 is 8 with 6 left over */
      { qid: "M2.S4.T7.C27:8", kind: "share", friends: 7, things: 70, host: "cook", pron: "him", thing: "rolls", answer: [8, 6], parts: DT_SHARE, winMs: 6000, ask: DT_ASK_SHARE,
        say: "A cook has 70 rolls and asks 7 friends to share them, taking a share himself. He tests 70 by 7 and says none will be left. What has he missed?",
        miss: "Who is holding the tray of rolls?" },
    ],
  },
];

/* Hindi and Gujarati, keyed by the exact English (docs/PATTERNS.md §11): every line the runtime prints or
   speaks for the tool, the working area's own words, and the literal api.say lines. Digits stay digits. */
const TR: any = {
  hi: {
    "Digit Tester": "अंक जाँच",
    "A number laid out, one digit to a cell, and four lamps underneath it.": "एक संख्या, हर खाने में एक अंक, और उसके नीचे चार बत्तियाँ।",
    "Four tests run, every cell counted in, and one slot that stayed dark.": "चार जाँचें हुईं, हर खाना गिना गया, और एक बत्ती बुझी ही रही।",
    "Free play. Tap a cell to change its digit, then press any lamp to test the number.": "मुक्त खेल। किसी खाने को छूकर उसका अंक बदलो। फिर कोई भी बत्ती दबाकर संख्या जाँचो।",
    "yes": "हाँ", "no": "नहीं", "not known": "पता नहीं", "by 3 only": "बस 3 से", "by 3 and 6": "3 और 6 से",
    "sharing": "भागीदार", "left over": "बचे हुए", "How many share? How many left?": "कितने भागीदार? कितने बचे?",
    /* phase 1 */
    "Reading the last digit": "आख़िरी अंक पढ़ना",
    "Cover everything but the end. Can you still answer? Which digit did it?": "अंत छोड़कर सब ढक दो। अब भी उत्तर दे सकते हो? किस अंक से पता चला?",
    "Press the lamp for a test, and the shutter covers all but the last cell.": "किसी जाँच की बत्ती दबाओ। पर्दा आख़िरी खाने के सिवा सब ढक देता है।",
    "What is standing in the ones cell?": "इकाई के खाने में कौन-सा अंक है?",
    "Read only the digit that is still showing, then decide.": "सिर्फ़ वही अंक पढ़ो जो अभी दिख रहा है, फिर तय करो।",
    "The ones digit alone settles the tests for two, for five and for ten.": "2, 5 और 10 की जाँच अकेला इकाई का अंक ही तय कर देता है।",
    "You learned: only the last digit matters for 2, 5 and 10.": "तुमने सीखा: 2, 5 और 10 में सिर्फ़ आख़िरी अंक काम आता है।",
    "Divisible by 2?": "2 से विभाज्य?",
    "Is 4,386 divisible by 2? Look only at the end of it.": "क्या 4,386 संख्या 2 से विभाज्य है? सिर्फ़ आख़िरी सिरा देखो।",
    "Which cell is the ones cell?": "इकाई का खाना कौन-सा है?",
    "Divisible by 5?": "5 से विभाज्य?",
    "Is 7,314 divisible by 5?": "क्या 7,314 संख्या 5 से विभाज्य है?",
    "Which ones digits pass the test for five?": "5 की जाँच में इकाई के कौन-से अंक पास होते हैं?",
    "Divisible by 10?": "10 से विभाज्य?",
    "Is 6,470 divisible by 10?": "क्या 6,470 संख्या 10 से विभाज्य है?",
    "For ten, what must stand in the last cell?": "10 के लिए आख़िरी खाने में क्या होना चाहिए?",
    /* phase 2 */
    "Adding every digit for three": "3 के लिए हर अंक जोड़ना",
    "Take every cell down, even the empty looking ones. Leave none out.": "हर खाना नीचे लाओ, खाली दिखने वाले भी। कोई खाना न छूटे।",
    "Drag each cell of this number onto the rail below it.": "इस संख्या का हर खाना खींचकर नीचे की पट्टी पर रखो।",
    "Every cell is on the rail, zeros and all.": "हर खाना पट्टी पर है, शून्य भी।",
    "How many cells does this number have altogether?": "इस संख्या में कुल कितने खाने हैं?",
    "Say the total out loud as you touch each digit on the rail.": "पट्टी का हर अंक छूते हुए योग ज़ोर से बोलो।",
    "Every digit goes into the total for the test for three, zeros included.": "3 की जाँच के योग में हर अंक जुड़ता है, शून्य भी।",
    "You learned: add every digit, zeros too, then test the total.": "तुमने सीखा: हर अंक जोड़ो, शून्य भी, फिर योग को जाँचो।",
    "Digit total?": "अंकों का योग?",
    "To test 40,608 for three, add every digit on the rail. What is the total?": "40,608 को 3 के लिए जाँचना है। पट्टी का हर अंक जोड़ो। योग कितना है?",
    "Count the cells on the rail. Did every one go into your total?": "पट्टी के खाने गिनो। क्या हर एक तुम्हारे योग में जुड़ा?",
    "Add every digit of 3,105. Bring each cell down first, then type the total.": "3,105 के सारे अंक जोड़ो। पहले हर खाना नीचे लाओ, फिर योग लिखो।",
    "Point at each digit on the rail as you add it.": "जोड़ते समय पट्टी के हर अंक पर उँगली रखो।",
    "Does 3 divide 50,073?": "50,073 संख्या 3 से विभाज्य?",
    "Test 50,073 for divisibility by 3. Bring every cell down, then decide.": "50,073 की 3 से विभाज्यता जाँचो। सारे खाने नीचे उतारो, फिर तय करो।",
    "Does three go into the total exactly?": "क्या योग 3 से पूरा-पूरा बँट जाता है?",
    "Not yet. The rail stays open while a cell is still up.": "अभी नहीं। जब तक कोई खाना ऊपर है, पट्टी खुली रहती है।",
    /* phase 3 */
    "What the tests do not cover": "जाँचें क्या नहीं बतातीं",
    "It passed every test here. The dark slot is a test this chapter never taught.": "यह संख्या यहाँ की हर जाँच में पास हुई। बुझी बत्ती वह जाँच है जो इस अध्याय में नहीं सिखाई गई।",
    "Is the number you are being asked about one of them?": "जिस संख्या के बारे में पूछा है, क्या वह इनमें से एक है?",
    "Count the lamps, then look for a lamp with that number on it.": "बत्तियाँ गिनो, फिर उस संख्या वाली बत्ती ढूँढो।",
    "A test answers for the number you tested by, and for no other. So these four tests settle four things and nothing else.":
      "जाँच उसी संख्या का उत्तर देती है जिससे जाँचा, किसी और का नहीं। इसलिए ये चार जाँचें चार बातें तय करती हैं, और कुछ नहीं।",
    "You learned: four tests are taught here, and they settle nothing else.": "तुमने सीखा: यहाँ की चार जाँचें और कुछ तय नहीं करतीं।",
    "Does it divide by 4?": "क्या यह 4 से विभाज्य है?",
    "A number passes the tests for 2, for 3, for 5 and for 10. What do you now know about 4?": "एक संख्या 2, 3, 5 और 10 की जाँच में पास होती है। अब तुम 4 के बारे में क्या जानते हो?",
    "Which tests has this chapter taught you?": "इस अध्याय ने तुम्हें कौन-सी जाँचें सिखाई हैं?",
    "Which tests does it pass?": "यह किन जाँचों में पास है?",
    "A number ends in 0 and its digits add to 12. Which of this chapter's four tests does it pass? Tap each lamp it passes, then press enter.":
      "एक संख्या के अंत में 0 है, और उसके अंकों का योग 12 है। इस अध्याय की चार जाँचों में से यह किनमें पास है? जिन जाँचों में यह पास है, उनकी बत्तियाँ छुओ। फिर एंटर दबाओ।",
    "Take the lamps one at a time. What does each one look at?": "एक-एक करके बत्तियाँ लो। हर बत्ती क्या देखती है?",
    "What did the test prove?": "जाँच ने क्या साबित किया?",
    "A child shows that 7,005 divides by 3. Then she says it must divide by 6 as well. What did her test prove?":
      "एक बच्ची दिखाती है कि 7,005 संख्या 3 से विभाज्य है। फिर वह कहती है कि यह संख्या 6 से भी विभाज्य होगी। जाँच ने क्या साबित किया?",
    "Which lamp did she really run?": "उसने असल में कौन-सी जाँच की?",
    /* phase 4 */
    "Testing for the right number of people": "भागीदारों की सही गिनती",
    "Count everyone who is sharing. Have you counted the one handing them out?": "हर भागीदार को गिनो। क्या तुमने बाँटने वाले को भी गिना?",
    "Is anybody sharing who has not been counted yet?": "क्या कोई भागीदार अभी गिना नहीं गया?",
    "Count the figures one by one, tick the box, then share out by the new count.": "लोगों को एक-एक करके गिनो, डिब्बे में सही का निशान लगाओ। फिर नई गिनती से बाँटो।",
    "Before you choose a divisor, count every person who is sharing, the one handing out too.": "भाजक चुनने से पहले हर भागीदार को गिनो, बाँटने वाले को भी।",
    "You learned: the person handing things out is sharing as well.": "तुमने सीखा: बाँटने वाला भी भागीदार होता है।",
    "A boy asks 4 friends to his party and has 35 laddoos to share out equally. Who is sharing, and will any be left?":
      "एक लड़का अपनी पार्टी में 4 दोस्तों को बुलाता है। उसके पास बराबर बाँटने को 35 लड्डू हैं। कौन-कौन भागीदार हैं, और क्या कुछ बचेगा?",
    "How many friends were asked?": "कितने दोस्त बुलाए गए थे?",
    "A girl shares 50 sweets with her 5 friends, and keeps one share for herself. She tests 50 by 5, and is sure none will be left over.":
      "एक लड़की 50 मिठाइयाँ अपने 5 दोस्तों के साथ बाँटती है। अपना हिस्सा भी रखती है। वह 50 को 5 से जाँचकर पक्का मानती है कि कुछ नहीं बचेगा।",
    "Is the girl in your count, or only her friends?": "क्या लड़की तुम्हारी गिनती में है, या सिर्फ़ उसके दोस्त?",
    "A cook has 70 rolls and asks 7 friends to share them, taking a share himself. He tests 70 by 7 and says none will be left. What has he missed?":
      "एक रसोइए के पास 70 रोल हैं। वह 7 दोस्तों को बाँटता है, और एक हिस्सा ख़ुद लेता है। वह 70 को 7 से जाँचकर कहता है कि एक भी रोल नहीं बचेगा। उससे क्या छूट गया?",
    "Who is holding the tray of rolls?": "रोल की थाली किसके हाथ में है?",
    "Tick the boy in, so the bay counts him too.": "लड़के के डिब्बे में सही का निशान लगाओ, ताकि वह भी गिना जाए।",
    "Tick the girl in, so the bay counts her too.": "लड़की के डिब्बे में सही का निशान लगाओ, ताकि वह भी गिनी जाए।",
    "Tick the cook in, so the bay counts him too.": "रसोइए के डिब्बे में सही का निशान लगाओ, ताकि वह भी गिना जाए।",
    /* the working area's own words */
    "tests run": "हुई जाँचें", "{n} of 4": "4 में से {n}", "digit total": "अंकों का योग", "ends in": "अंत में",
    "O": "इ", "T": "द", "H": "स", "Th": "ह", "TTh": "दह", "L": "ला",
    "not taught": "नहीं सिखाई", "passes all four": "चारों में पास", "{r} left": "{r} बचे", "the test proved": "जाँच ने साबित किया",
    "{n} sharing": "{n} भागीदार", "{q} each, {r} left": "हर एक को {q}, {r} बचे",
    "boy": "लड़का", "girl": "लड़की", "cook": "रसोइया", "laddoos": "लड्डू", "sweets": "मिठाइयाँ", "rolls": "रोल",
    "passes": "इनमें पास", "proved": "साबित हुआ",
  },
  gu: {
    "Digit Tester": "અંક ચકાસણી",
    "A number laid out, one digit to a cell, and four lamps underneath it.": "એક સંખ્યા, દરેક ખાનામાં એક અંક, અને તેની નીચે ચાર બત્તીઓ.",
    "Four tests run, every cell counted in, and one slot that stayed dark.": "ચાર ચકાસણી થઈ, દરેક ખાનું ગણાયું, અને એક બત્તી બંધ જ રહી.",
    "Free play. Tap a cell to change its digit, then press any lamp to test the number.": "મુક્ત રમત. કોઈ ખાનાને અડકીને તેનો અંક બદલો. પછી કોઈ પણ બત્તી દબાવી સંખ્યા ચકાસો.",
    "yes": "હા", "no": "ના", "not known": "ખબર નથી", "by 3 only": "ફક્ત 3 વડે", "by 3 and 6": "6 વડે પણ",
    "sharing": "ભાગીદાર", "left over": "વધેલા", "How many share? How many left?": "કેટલા ભાગીદાર? કેટલા વધ્યા?",
    /* phase 1 */
    "Reading the last digit": "છેલ્લો અંક વાંચવો",
    "Cover everything but the end. Can you still answer? Which digit did it?": "છેલ્લું ખાનું છોડી બધું ઢાંકી દો. શું હજી જવાબ આપી શકો? કયા અંકથી ખબર પડી?",
    "Press the lamp for a test, and the shutter covers all but the last cell.": "ચકાસણીની બત્તી દબાવો. પડદો છેલ્લા ખાના સિવાય બધું ઢાંકી દે છે.",
    "What is standing in the ones cell?": "એકમના ખાનામાં કયો અંક?",
    "Read only the digit that is still showing, then decide.": "જે અંક હજી દેખાય છે ફક્ત તે જ વાંચો, પછી નક્કી કરો.",
    "The ones digit alone settles the tests for two, for five and for ten.": "2, 5 અને 10ની ચકાસણી એકલો એકમનો અંક જ નક્કી કરી દે છે.",
    "You learned: only the last digit matters for 2, 5 and 10.": "તમે શીખ્યા: 2, 5 અને 10 માટે ફક્ત છેલ્લો અંક જ કામનો છે.",
    "Divisible by 2?": "2 વડે વિભાજ્ય?",
    "Is 4,386 divisible by 2? Look only at the end of it.": "શું 4,386 એ 2 વડે વિભાજ્ય છે? ફક્ત તેનો છેડો જુઓ.",
    "Which cell is the ones cell?": "એકમનું ખાનું કયું છે?",
    "Divisible by 5?": "5 વડે વિભાજ્ય?",
    "Is 7,314 divisible by 5?": "શું 7,314 એ 5 વડે વિભાજ્ય છે?",
    "Which ones digits pass the test for five?": "5ની ચકાસણીમાં એકમના કયા અંક પાસ થાય છે?",
    "Divisible by 10?": "10 વડે વિભાજ્ય?",
    "Is 6,470 divisible by 10?": "શું 6,470 એ 10 વડે વિભાજ્ય છે?",
    "For ten, what must stand in the last cell?": "10 માટે છેલ્લા ખાનામાં શું હોવું જોઈએ?",
    /* phase 2 */
    "Adding every digit for three": "3 માટે દરેક અંક ઉમેરવો",
    "Take every cell down, even the empty looking ones. Leave none out.": "દરેક ખાનું નીચે લાવો, ખાલી દેખાતાં પણ. એક પણ ખાનું છોડશો નહીં.",
    "Drag each cell of this number onto the rail below it.": "આ સંખ્યાનું દરેક ખાનું ખેંચીને નીચેની પટ્ટી પર મૂકો.",
    "Every cell is on the rail, zeros and all.": "દરેક ખાનું પટ્ટી પર છે, શૂન્ય પણ.",
    "How many cells does this number have altogether?": "આ સંખ્યામાં કુલ કેટલાં ખાનાં છે?",
    "Say the total out loud as you touch each digit on the rail.": "પટ્ટી પરના દરેક અંકને અડકતાં સરવાળો મોટેથી બોલો.",
    "Every digit goes into the total for the test for three, zeros included.": "3ની ચકાસણીના સરવાળામાં દરેક અંક ઉમેરાય છે, શૂન્ય પણ.",
    "You learned: add every digit, zeros too, then test the total.": "તમે શીખ્યા: દરેક અંક ઉમેરો, શૂન્ય પણ, પછી સરવાળો ચકાસો.",
    "Digit total?": "અંકોનો સરવાળો?",
    "To test 40,608 for three, add every digit on the rail. What is the total?": "40,608ને 3 માટે ચકાસવાનું છે. પટ્ટીનો દરેક અંક ઉમેરો. સરવાળો કેટલો છે?",
    "Count the cells on the rail. Did every one go into your total?": "પટ્ટી પરનાં ખાનાં ગણો. શું દરેક તમારા સરવાળામાં ઉમેરાયું?",
    "Add every digit of 3,105. Bring each cell down first, then type the total.": "3,105ના બધા અંક ઉમેરો. પહેલાં દરેક ખાનું નીચે લાવો, પછી સરવાળો લખો.",
    "Point at each digit on the rail as you add it.": "ઉમેરતી વખતે પટ્ટી પરના દરેક અંક પર આંગળી મૂકો.",
    "Does 3 divide 50,073?": "શું 50,073 એ 3 વડે વિભાજ્ય છે?",
    "Test 50,073 for divisibility by 3. Bring every cell down, then decide.": "ચકાસો કે 50,073 એ 3 વડે વિભાજ્ય છે કે નહીં. બધાં ખાનાં નીચે ઉતારો, પછી નક્કી કરો.",
    "Does three go into the total exactly?": "શું સરવાળો 3 વડે પૂરેપૂરો ભાગી શકાય છે?",
    "Not yet. The rail stays open while a cell is still up.": "હજી નહીં. કોઈ ખાનું ઉપર હોય ત્યાં સુધી પટ્ટી ખુલ્લી રહે છે.",
    /* phase 3 */
    "What the tests do not cover": "ચકાસણી શું નથી કહેતી",
    "It passed every test here. The dark slot is a test this chapter never taught.": "આ સંખ્યા અહીંની દરેક ચકાસણીમાં પાસ થઈ. બંધ બત્તી એવી ચકાસણી છે જે આ પ્રકરણમાં શીખવી નથી.",
    "Is the number you are being asked about one of them?": "જે સંખ્યા વિશે પૂછ્યું છે, શું તે આમાંની એક છે?",
    "Count the lamps, then look for a lamp with that number on it.": "બત્તીઓ ગણો, પછી તે સંખ્યાવાળી બત્તી શોધો.",
    "A test answers for the number you tested by, and for no other. So these four tests settle four things and nothing else.":
      "ચકાસણી એ જ સંખ્યાનો જવાબ આપે છે જેનાથી ચકાસ્યું. બીજી કોઈ સંખ્યાનો નહીં. તેથી આ ચાર ચકાસણી ચાર વાત નક્કી કરે છે, બીજું કંઈ નહીં.",
    "You learned: four tests are taught here, and they settle nothing else.": "તમે શીખ્યા: અહીંની ચાર ચકાસણી બીજું કંઈ નક્કી કરતી નથી.",
    "Does it divide by 4?": "શું તે 4 વડે વિભાજ્ય છે?",
    "A number passes the tests for 2, for 3, for 5 and for 10. What do you now know about 4?": "એક સંખ્યા 2, 3, 5 અને 10ની ચકાસણીમાં પાસ થાય છે. હવે તમે 4 વિશે શું જાણો છો?",
    "Which tests has this chapter taught you?": "આ પ્રકરણે તમને કઈ ચકાસણી શીખવી છે?",
    "Which tests does it pass?": "તે કઈ ચકાસણીમાં પાસ છે?",
    "A number ends in 0 and its digits add to 12. Which of this chapter's four tests does it pass? Tap each lamp it passes, then press enter.":
      "એક સંખ્યાનો છેલ્લો અંક 0 છે, અને તેના અંકોનો સરવાળો 12 છે. આ પ્રકરણની ચાર ચકાસણીમાંથી તે કઈમાં પાસ થાય છે? જેમાં પાસ થાય તે બત્તીઓને અડકો. પછી એન્ટર દબાવો.",
    "Take the lamps one at a time. What does each one look at?": "એક પછી એક બત્તી લો. દરેક બત્તી શું જુએ છે?",
    "What did the test prove?": "ચકાસણીએ શું સાબિત કર્યું?",
    "A child shows that 7,005 divides by 3. Then she says it must divide by 6 as well. What did her test prove?":
      "એક બાળકી બતાવે છે કે 7,005 એ 3 વડે વિભાજ્ય છે. પછી તે કહે છે કે આ સંખ્યા 6 વડે પણ વિભાજ્ય હશે. તેની ચકાસણીએ શું સાબિત કર્યું?",
    "Which lamp did she really run?": "તેણે ખરેખર કઈ બત્તીથી ચકાસ્યું?",
    /* phase 4 */
    "Testing for the right number of people": "ભાગીદારોની સાચી ગણતરી",
    "Count everyone who is sharing. Have you counted the one handing them out?": "દરેક ભાગીદારને ગણો. વહેંચનારને પણ ગણ્યા?",
    "Is anybody sharing who has not been counted yet?": "શું કોઈ ભાગીદાર હજી ગણાયો નથી?",
    "Count the figures one by one, tick the box, then share out by the new count.": "લોકોને એક પછી એક ગણો, ચોકઠામાં ખરાની નિશાની કરો. પછી નવી ગણતરીથી વહેંચો.",
    "Before you choose a divisor, count every person who is sharing, the one handing out too.": "ભાજક પસંદ કરતાં પહેલાં દરેક ભાગીદારને ગણો, વહેંચનારને પણ.",
    "You learned: the person handing things out is sharing as well.": "તમે શીખ્યા: વહેંચનાર પણ ભાગીદાર હોય છે.",
    "A boy asks 4 friends to his party and has 35 laddoos to share out equally. Who is sharing, and will any be left?":
      "એક છોકરો પોતાની પાર્ટીમાં 4 મિત્રોને બોલાવે છે. તેની પાસે સરખા વહેંચવા 35 લાડુ છે. કોણ કોણ ભાગીદાર છે, અને શું કંઈ વધશે?",
    "How many friends were asked?": "કેટલા મિત્રોને બોલાવ્યા?",
    "A girl shares 50 sweets with her 5 friends, and keeps one share for herself. She tests 50 by 5, and is sure none will be left over.":
      "એક છોકરી 50 મીઠાઈ પોતાના 5 મિત્રો સાથે વહેંચે છે. એક હિસ્સો પોતે રાખે છે. તે 50ને 5 વડે ચકાસીને પાકું માને છે કે કંઈ નહીં વધે.",
    "Is the girl in your count, or only her friends?": "શું છોકરી તમારી ગણતરીમાં છે, કે ફક્ત તેના મિત્રો?",
    "A cook has 70 rolls and asks 7 friends to share them, taking a share himself. He tests 70 by 7 and says none will be left. What has he missed?":
      "એક રસોઇયા પાસે 70 રોલ છે. તે 7 મિત્રોને વહેંચે છે, અને એક હિસ્સો પોતે લે છે. તે 70ને 7 વડે ચકાસી કહે છે કે એક પણ રોલ નહીં વધે. તેનાથી શું રહી ગયું?",
    "Who is holding the tray of rolls?": "રોલની થાળી કોના હાથમાં?",
    "Tick the boy in, so the bay counts him too.": "છોકરાના ચોકઠામાં ખરાની નિશાની કરો, જેથી તે પણ ગણાય.",
    "Tick the girl in, so the bay counts her too.": "છોકરીના ચોકઠામાં ખરાની નિશાની કરો, જેથી તે પણ ગણાય.",
    "Tick the cook in, so the bay counts him too.": "રસોઇયાના ચોકઠામાં ખરાની નિશાની કરો, જેથી તે પણ ગણાય.",
    /* the working area's own words */
    "tests run": "ચકાસણી", "{n} of 4": "4 માંથી {n}", "digit total": "અંકોનો સરવાળો", "ends in": "છેલ્લે",
    "O": "એ", "T": "દ", "H": "શ", "Th": "હ", "TTh": "દહ", "L": "લા",
    "not taught": "શીખવી નથી", "passes all four": "ચારેયમાં પાસ", "{r} left": "{r} વધ્યા", "the test proved": "ચકાસણીએ સાબિત કર્યું",
    "{n} sharing": "{n} ભાગીદાર", "{q} each, {r} left": "દરેકને {q}, {r} વધ્યા",
    "boy": "છોકરો", "girl": "છોકરી", "cook": "રસોઇયો", "laddoos": "લાડુ", "sweets": "મીઠાઈ", "rolls": "રોલ",
    "passes": "આમાં પાસ", "proved": "સાબિત થયું",
  },
};

/* ── geometry and the picture's own rules ─────────────────────────────────────────────────── */
const DT = { cw: 108, ch: 124, gap: 12, cgap: 30, x0: 96, cy: 8, stow: 84, lw: 156, lh: 108, ly: 176, lgap: 40, fw: 176, ry: 262, rh: 96 };
const DT_TESTS = [2, 3, 5, 10];
const DT_ENDS: Record<number, number[]> = { 2: [0, 2, 4, 6, 8], 5: [0, 5], 10: [0] };
const DT_AMBER = CONTENT.ten, DT_BLUE = CONTENT.hundred, DT_VERM = CONTENT.pointer, DT_SKY = "#56B4E9";
const DT_PLACE = ["O", "T", "H", "Th", "TTh", "L"];
const DT_FIFTH = [4, 6, 8, 9];
/* two numbers that pass all four lamps: one divides by 4, one leaves 2 (why "not known" is the truth) */
const DT_PAIR = [1020, 1050];
const dtInk = (c: string) => shade(c, 0.25);
const dtSkyInk = shade(DT_SKY, 0.5);
const dtDigits = (v: number) => String(v).split("").map(Number);
/* the cells' left edges; an Indian comma widens the gap it sits in (none for a number known only by clues) */
const dtCellXs = (nd: number, commas = true) => {
  const xs: number[] = [];
  let x = DT.x0;
  for (let i = 0; i < nd; i++) { xs.push(x); x += DT.cw + (commas && [3, 5, 7].includes(nd - 1 - i) ? DT.cgap : DT.gap); }
  return xs;
};
const dtLampX = (k: number) => DT.x0 + k * (DT.lw + DT.lgap);
/* the picture's test: the ones digit for 2, 5 and 10; the digit total for 3 */
const dtPasses = (v: number, d: number) => {
  const ds = dtDigits(v);
  return d === 3 ? ds.reduce((a, b) => a + b, 0) % 3 === 0 : DT_ENDS[d].includes(ds[ds.length - 1]);
};
const dtCellsOf = (x: any): (number | null)[] =>
  x.kind === "mystery" ? [null, null, null, null] : x.kind === "list" ? [null, null, null, x.ones] : x.kind === "share" ? [] : dtDigits(x.num || 0);
/* a label with a number in it, through the TR table: tx("{r} left") -> "{r} बचे", then the number put in
   (English: the key is the English with the number's place marked, so it prints exactly as before) */
const dtFill = (tx: any, key: string, vals: any) => Object.keys(vals).reduce((s: string, k) => s.split("{" + k + "}").join(String(vals[k])), String(tx(key)));

const MODEL = {
  cell: { w: DT.cw, h: DT.ch, gap: DT.gap }, lamps: DT_TESTS, notTaught: DT_FIFTH,
  onesDigitsThatPass: DT_ENDS, placeNames: DT_PLACE, notKnownPair: DT_PAIR,
  colours: { divides: DT_BLUE, leftover: DT_VERM, number: DT_AMBER, digitRead: DT_SKY },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* a list answer (the tests a number passes) in any order: "2, 3, 5, 10", [2, 3, 5, 10] */
const dtListOf = (v: any): number[] => (Array.isArray(v) ? v.map(Number) : (String(v ?? "").match(/\d+/g) || []).map(Number));
const dtSameSet = (a: number[], b: number[]) => {
  const x = Array.from(new Set(a)).sort((p, q) => p - q), y = Array.from(new Set(b)).sort((p, q) => p - q);
  return x.length === y.length && x.every((v, k) => v === y[k]);
};

/* judge: is this value right for this item? (numbers compare as numbers; a list in any order) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (item.kind === "list") return dtSameSet(dtListOf(v), item.answer);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by long division done digit by digit, and by sharing out one at a time;
   it never looks at a ones digit or a digit total (the picture's route) */
const oracle = () => {
  const rem = (v: number, d: number) => { let r = 0; for (const ch of String(v)) r = (r * 10 + Number(ch)) % d; return r; };
  const divides = (v: number, d: number) => rem(v, d) === 0;
  return PHASES.every((p: any) => p.items.every((it: any) => {
    if (it.kind === "verdict") return it.answer === (divides(it.num, it.d) ? "yes" : "no");
    if (it.kind === "three") return it.answer === (divides(it.num, 3) ? "yes" : "no");
    if (it.kind === "total") { let s = 0, v = it.num; while (v > 0) { s += v % 10; v = Math.floor(v / 10); } return s === it.answer && divides(s, 3) === divides(it.num, 3); }
    if (it.kind === "mystery") {
      const passing: number[] = [];
      for (let v = 1; v <= 300; v++) if (DT_TESTS.every((d) => divides(v, d))) passing.push(v);
      const answers = new Set(passing.map((v) => divides(v, it.d)));
      return it.answer === (answers.size > 1 ? "not known" : answers.has(true) ? "yes" : "no");
    }
    if (it.kind === "list") {
      const sets: string[] = [];
      for (let v = 10; v < 100000; v += 10) {
        let s = 0, t = v; while (t > 0) { s += t % 10; t = Math.floor(t / 10); }
        if (v % 10 === it.ones && s === it.sum) sets.push(DT_TESTS.filter((d) => divides(v, d)).join(","));
      }
      return sets.length > 0 && new Set(sets).size === 1 && sets[0] === it.answer.join(",");
    }
    if (it.kind === "proof") return divides(it.num, 3) && !divides(it.num, it.d) && it.answer === "by 3 only";
    if (it.kind === "share") {
      const people = it.friends + 1;
      let left = it.things; while (left >= people) left -= people;
      return it.answer[0] === people && it.answer[1] === left;
    }
    return false;
  }));
};
/* the item's misconception, which judge must reject */
const nearMiss = (item: any) => {
  if (item.kind === "verdict") return item.answer === "yes" ? "no" : "yes";   /* digits added, or the first digit read */
  if (item.kind === "total") {
    /* a finger that skips a zero takes the cell after it too */
    const ds = dtDigits(item.num), z = ds.indexOf(0);
    const s = ds.reduce((a, b) => a + b, 0) - (z >= 0 && z + 1 < ds.length ? ds[z + 1] : 0);
    return s === item.answer ? item.answer + 1 : s;
  }
  if (item.kind === "three") return item.answer === "yes" ? "no" : "yes";   /* stopped at the total, or a cell skipped */
  if (item.kind === "mystery") return "yes";          /* passed every lamp, so it must divide by 4 as well */
  if (item.kind === "list") return "2, 5, 10";         /* the three last-digit tests only */
  if (item.kind === "proof") return "by 3 and 6";      /* six is made of two and three */
  if (item.kind === "share") return [item.friends, item.things % item.friends];   /* the host left out */
  return "~";
};
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => {
  if (item.kind === "total") return [String(item.answer), words(item.answer)];
  if (item.kind === "list") return ["2, 3, 5, 10", "all four"];
  if (item.kind === "share") return [`${item.answer[0]} people`, `${item.answer[0]} sharing`, `${item.answer[1]} left`];
  return [String(item.answer)];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => (item.kind === "list" ? item.answer.join(", ") : item.answer);

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (T.state().stage === "demo") return HOOK.demo && HOOK.demo();
  if ((item.kind === "total" || item.kind === "three") && HOOK.check) HOOK.check(item);   /* every cell down first */
  if (item.kind === "list") { if (HOOK.set) HOOK.set(item.answer); setTimeout(() => HOOK.enter && HOOK.enter(), 40); return; }
  return T.submit(item.answer);
};
/* the agent's answer() for the list: it marks the lamps as a child would; undefined = type it or pick a key */
const answer = (item: any, v: any) => (item.kind === "list" && HOOK.set ? HOOK.set(dtListOf(v)) : undefined);
/* the agent's check() before Enter: in a gate it does the child's act first (every cell down onto the rail,
   or the host ticked in when the typed count includes the host) and returns true; undefined = press Enter */
const check = (item?: any) => (HOOK.check ? HOOK.check(item) : undefined);

/* ── pieces ───────────────────────────────────────────────────────────────────────────── */

const DT_CSS = `
.dt-move{transition:transform 480ms cubic-bezier(.3,.7,.25,1)}
.dt-in{animation:dtIn 380ms ease-out both}
@keyframes dtIn{from{opacity:0}to{opacity:1}}
.dt-catch{animation:dtCatch 760ms ease-out 1 both}
@keyframes dtCatch{0%{transform:translateY(0)}35%{transform:translateY(-18px)}100%{transform:translateY(-8px)}}
.dt-grab{cursor:grab}
.dt-tap{cursor:pointer}
@media (prefers-reduced-motion:reduce){.dt-move{transition:none}.dt-in,.dt-catch{animation:none}}
`;

/* a comma 40 tall: a round head at (x, y) and a tail curling down to the left */
const DtComma = ({ x, y, color }: any) => (
  <path d={`M ${x + 8} ${y} A 8 8 0 1 0 ${x - 2} ${y + 7.7} C ${x} ${y + 14} ${x - 3} ${y + 23} ${x - 10} ${y + 30} C ${x + 3} ${y + 25} ${x + 9} ${y + 14} ${x + 8} ${y} Z`} fill={color} />
);

/* a test lamp: the bulb fills blue when the number passes, rings vermilion when it does not */
function DtLamp({ x, y, d, state, ring, mark, quiet, C, tx = (v: any) => v }: any) {
  const pass = state === "pass", fail = state === "fail";
  const edge = ring || mark ? C.accent : pass ? DT_BLUE : C.rule;
  return (
    <g>
      <rect x={x} y={y} width={DT.lw} height={DT.lh} rx={18} fill={quiet ? tint(C.panel, 0.45) : pass ? tint(DT_BLUE, 0.82) : "#FFFFFF"}
        stroke={edge} strokeWidth={ring || mark ? 5 : pass ? 3 : 2} filter={quiet ? undefined : "url(#fShadowSoft)"} />
      <circle cx={x + 30} cy={y + 34} r={15} fill={pass ? "url(#gHundred)" : "#FFFFFF"} stroke={fail ? DT_VERM : pass ? shade(DT_BLUE, 0.2) : C.rule} strokeWidth={fail ? 4 : 2} />
      <text x={x + 96} y={y + 60} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={pass ? dtInk(DT_BLUE) : C.ink}>{d}</text>
      {(pass || fail) && (
        <text x={x + 96} y={y + 98} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={pass ? dtInk(DT_BLUE) : dtInk(DT_VERM)}>{tx(pass ? "yes" : "no")}</text>
      )}
      {mark && (
        <g>
          <circle cx={x + DT.lw - 8} cy={y + 8} r={19} fill={C.accent} stroke="#FFFFFF" strokeWidth={3} />
          <path d={`M ${x + DT.lw - 17} ${y + 8} l 6 7 l 12 -13`} fill="none" stroke="#FFFFFF" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
    </g>
  );
}

/* the fifth slot: a test this chapter never taught. It can be pressed; it stays dark */
function DtFifth({ x, y, d, caption, flick, C }: any) {
  return (
    <g>
      <rect x={x} y={y} width={DT.fw} height={DT.lh} rx={18} fill={tint(C.panel, 0.35)} stroke={shade(C.rule, 0.25)} strokeWidth={2.5} strokeDasharray="10 8" />
      <circle cx={x + 30} cy={y + 34} r={15} fill={flick ? "#B9C0C6" : "#6E7780"} stroke={shade(C.rule, 0.3)} strokeWidth={2} />
      <text x={x + 104} y={y + 58} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>{d}</text>
      <text x={x + DT.fw / 2} y={y + 98} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{caption}</text>
    </g>
  );
}

/* a person sharing: solid once counted in, a dashed outline while left out */
function DtPerson({ cx, solid, num, C }: any) {
  const body = `M ${cx - 32} 128 L ${cx - 32} 96 Q ${cx - 32} 64 ${cx} 64 Q ${cx + 32} 64 ${cx + 32} 96 L ${cx + 32} 128 Z`;
  return (
    <g>
      <circle cx={cx} cy={34} r={21} fill={solid ? "url(#gHundred)" : "#FFFFFF"} stroke={shade(DT_BLUE, 0.2)} strokeWidth={solid ? 2 : 3} strokeDasharray={solid ? undefined : "6 5"} />
      <path d={body} fill={solid ? "url(#gHundred)" : "#FFFFFF"} stroke={shade(DT_BLUE, 0.2)} strokeWidth={solid ? 2 : 3} strokeDasharray={solid ? undefined : "6 5"} />
      {num ? <text x={cx} y={114} textAnchor="middle" fontSize={T.label} fontWeight={700} fill="#FFFFFF" stroke={shade(DT_BLUE, 0.35)} strokeWidth={3} paintOrder="stroke">{num}</text> : null}
    </g>
  );
}

/* the ruled board: the number divided out in full, the leftover on its shelf, countable */
function DtBoard({ x, y, w, num, d, caption, C, tx = (v: any) => v }: any) {
  const q = Math.floor(num / d), r = num - q * d;
  return (
    <g className="dt-in">
      <rect x={x} y={y} width={w} height={204} rx={RAD.panel} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} filter="url(#fShadowSoft)" />
      {caption && <text x={x + w - 18} y={y + 34} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={dtInk(DT_BLUE)}>{caption}</text>}
      <text x={x + 22} y={y + (caption ? 76 : 60)} fontSize={T.speech} fontWeight={700} fill={C.ink}>{`${indian(num)} ÷ ${d}`}</text>
      <text x={x + 22} y={y + (caption ? 126 : 116)} fontSize={T.speech} fontWeight={700} fill={C.ink}>{`= ${indian(q)}`}</text>
      <line x1={x + 18} y1={y + 150} x2={x + w - 18} y2={y + 150} stroke={C.rule} strokeWidth={2} />
      {Array.from({ length: Math.min(r, 9) }).map((_, k) => <Disc key={k} x={x + 38 + k * 30} y={y + 176} r={12} paint="gPointer" />)}
      <text x={x + (r ? 38 + Math.min(r, 9) * 30 : 22)} y={y + 187} fontSize={T.label} fontWeight={700} fill={r ? dtInk(DT_VERM) : C.ink}>{dtFill(tx, "{r} left", { r })}</text>
    </g>
  );
}

/* a share-out board: a row for each person, filled a round at a time, and what is left on its shelf,
   outside the rows and countable */
function DtShareBoard({ x, y, b, C, tx = (v: any) => v }: any) {
  const pitch = Math.min(26, 196 / b.s);
  return (
    <g className="dt-in">
      <rect x={x} y={y} width={530} height={312} rx={RAD.panel} fill="#FFFFFF" stroke={b.mine ? C.rule : DT_BLUE} strokeWidth={b.mine ? 2 : 3} filter="url(#fShadowSoft)" />
      <text x={x + 20} y={y + 38} fontSize={T.label} fontWeight={700} fill={b.mine ? C.ink : dtInk(DT_BLUE)}>{dtFill(tx, "{n} sharing", { n: b.s })}</text>
      {Array.from({ length: b.s }).map((_, k) => {
        const yy = y + 70 + k * pitch;
        return (
          <g key={k}>
            <circle cx={x + 26} cy={yy} r={7} fill="url(#gHundred)" />
            {Array.from({ length: b.rounds }).map((__, j) => <Disc key={j} x={x + 52 + j * 22} y={yy} r={9} paint="gTen" flat />)}
          </g>
        );
      })}
      <line x1={x + 300} y1={y + 56} x2={x + 300} y2={y + 262} stroke={C.rule} strokeWidth={2} strokeDasharray="6 6" />
      <rect x={x + 318} y={y + 56} width={192} height={72} rx={14} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={2} />
      {b.shelf && Array.from({ length: b.r }).map((_, j) => <Disc key={j} x={x + 340 + (j % 7) * 25} y={y + 78 + Math.floor(j / 7) * 28} r={10} paint="gPointer" />)}
      {b.shelf && <text x={x + 20} y={y + 296} fontSize={T.label} fontWeight={700} fill={b.r ? dtInk(DT_VERM) : C.ink}>{dtFill(tx, "{q} each, {r} left", { q: b.q, r: b.r })}</text>}
    </g>
  );
}

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const slide = useTimeline();
  const free = stage === "free";
  const [freeNum, setFreeNum] = useState(24630);
  const [fifthAt, setFifthAt] = useState(0);
  const it: any = free ? { kind: "free", num: freeNum, d: DT_FIFTH[fifthAt] } : item;
  const kind = it.kind;
  const railKind = kind === "total" || kind === "three";
  const cells = dtCellsOf(it);
  const nd = cells.length;
  const xs = dtCellXs(nd, !cells.includes(null));
  const onesEdge = nd ? xs[nd - 1] - 8 : DT.stow;
  const allEdge = nd ? xs[nd - 1] + DT.cw + 8 : DT.stow;

  const [edgeX, setEdgeX] = useState(DT.stow);
  const edgeRef = useRef(DT.stow);
  const [asking, setAsking] = useState<number | null>(null);
  const [lamps, setLamps] = useState<any>({});
  const [marks, setMarks] = useState<number[]>([]);
  const marksRef = useRef<number[]>([]);
  const actedRef = useRef(false);                     /* a lamp marked or unmarked since the last answer */
  const [down, setDown] = useState<boolean[]>([]);
  const downRef = useRef<boolean[]>([]);
  const [railOn, setRailOn] = useState(false);
  const [total, setTotal] = useState<number | null>(null);
  const [lit, setLit] = useState<any>(null);          /* what is being read: "ones", "tag", or a rail slot */
  const [names, setNames] = useState(0);              /* place names written from the right */
  const [rule, setRule] = useState<number | null>(null);
  const [chip, setChip] = useState<any>(null);        /* the ones digit in flight to the rule row */
  const [fly, setFly] = useState<any>(null);          /* the total in flight to the lamp */
  const [board, setBoard] = useState<any>(null);
  const [fifth, setFifth] = useState({ flick: false, caption: "not taught" });
  const [proved, setProved] = useState(false);
  const [ticked, setTicked] = useState(false);
  const tickedRef = useRef(false);
  const [tickGlow, setTickGlow] = useState(false);
  const [counted, setCounted] = useState(0);
  const [boards, setBoards] = useState<any[]>([]);   /* share-out boards: { s, q, r, rounds, shelf, mine } */
  const [gateLit, setGateLit] = useState(false);      /* the cells still up, lit by an early Enter */
  const typedRef = useRef(typed);
  typedRef.current = typed;
  const [touched, setTouched] = useState(false);
  const shown = useRef(false);                        /* the whole answer is already on the area */
  const busy = tl.busy;

  const moveEdge = (v: number) => { edgeRef.current = v; setEdgeX(v); };
  const slideTo = (to: number) => {
    const from = edgeRef.current, S: any[] = [];
    for (let k = 1; k <= 8; k++) { const v = from + (to - from) * (1 - Math.pow(1 - k / 8, 2)); S.push([45, () => moveEdge(v)]); }
    slide.run(S);
  };

  const setup = (x: any) => {
    tl.stop(); slide.stop();
    const cs = dtCellsOf(x), xx = dtCellXs(cs.length, !cs.includes(null));
    moveEdge(x.kind === "mystery" ? xx[cs.length - 1] + DT.cw + 8 : x.kind === "list" ? xx[cs.length - 1] - 8 : DT.stow);
    setAsking(null);
    setLamps(x.kind === "mystery" ? { 2: "pass", 3: "pass", 5: "pass", 10: "pass" } : x.kind === "proof" ? { 3: "pass" } : {});
    marksRef.current = []; setMarks([]);
    downRef.current = cs.map(() => false); setDown(downRef.current);
    setRailOn(x.kind === "total" || x.kind === "three"); setTotal(null); setLit(null); setNames(x.kind === "mystery" ? cs.length : 0); setRule(null); setChip(null); setFly(null); setBoard(null);
    setFifth({ flick: false, caption: "not taught" }); setProved(false);
    tickedRef.current = false; setTicked(false); setTickGlow(false); setCounted(0); setBoards([]); setGateLit(false);
    setTouched(false); shown.current = false; actedRef.current = false;
    api.lock(false);
  };
  const key = free ? "free" : `${n}:${index}`;
  const setFor = useRef("");
  useEffect(() => { if (setFor.current !== key) { setFor.current = key; setup(it); } }, [key]);

  /* ── the tests, as the picture runs them ── */
  const onesXY = () => ({ x: xs[nd - 1] + DT.cw / 2, y: DT.cy + DT.ch / 2 });
  const ruleXY = (d: number, v: number) => {
    const ends = DT_ENDS[d], j = ends.indexOf(v);
    return { x: 248 + (j >= 0 ? j : ends.length + 0.6) * 78, y: 364, hit: j >= 0 };
  };
  /* for 2, 5 and 10: the shutter covers all but the ones cell, its digit is laid against the digits that pass */
  const onesSteps = (v: number, d: number, slow: number, withBoard: boolean) => {
    const ds = dtDigits(v), last = ds[ds.length - 1], o = onesXY(), to = ruleXY(d, last), pass = dtPasses(v, d);
    const S: any[] = [
      [60, () => { slideTo(onesEdge); setAsking(d); setRailOn(false); setRule(null); setChip(null); }],
      [520 * slow, () => setLit("ones")],
      [420 * slow, () => { setRule(d); setChip({ x: o.x, y: o.y, v: last, landed: false, hit: to.hit }); }],
      [60, () => setChip((c: any) => c && { ...c, x: to.x, y: to.y })],
      [560 * slow, () => { setChip((c: any) => c && { ...c, landed: true }); if (to.hit) api.sfx.tick(); }],
      [380 * slow, () => setLamps((L: any) => ({ ...L, [d]: pass ? "pass" : "fail" }))],
    ];
    if (withBoard) S.push([420 * slow, () => setBoard({ num: v, d })]);
    S.push([300, () => {}]);
    return S;
  };
  /* for 3: every cell comes down onto the rail in order, the total is written and runs through the lamp */
  const railSteps = (v: number, slow: number, lampAt: any, lightEach = false) => {
    const ds = dtDigits(v), sum = ds.reduce((a, b) => a + b, 0), S: any[] = [[60, () => { setRailOn(true); setRule(null); setChip(null); }]];
    ds.forEach((_, i) => {
      if (downRef.current[i]) return;
      S.push([360 * slow, () => { const nx = downRef.current.slice(); nx[i] = true; downRef.current = nx; setDown(nx); api.sfx.tick(); }]);
    });
    if (lightEach) ds.forEach((_, i) => S.push([300 * slow, () => setLit(i)]));
    S.push([360 * slow, () => { setLit(null); setTotal(sum); }]);
    S.push([60, () => setFly({ ...railTotalXY(ds.length), v: sum })]);
    S.push([80, () => setFly({ x: lampAt.x, y: lampAt.y, v: sum })]);
    S.push([560 * slow, () => { setFly(null); setLamps((L: any) => ({ ...L, 3: sum % 3 === 0 ? "pass" : "fail" })); api.sfx.tick(); }]);
    S.push([300, () => {}]);
    return S;
  };
  const railY = railKind ? DT.ry : 330;
  const slotCx = (i: number) => xs[i] + DT.cw / 2;
  const railTotalXY = (k: number) => ({ x: xs[k - 1] + DT.cw / 2 + 42 + 60 + 52, y: railY + 48 });
  const lamp3At = railKind ? { x: 880 + DT.lw / 2 + 18, y: DT.cy + 54 } : { x: dtLampX(1) + DT.lw / 2 + 18, y: DT.ly + 54 };

  /* ── what the child does ── */
  const ask = stage === "ask" && !busy;
  const demo = stage === "demo" && !busy;
  const pressLamp = (d: number) => {
    if (kind === "verdict") {
      if (!ask || d === 3) return;
      setTouched(true); setAsking(d); setLit("ones"); slideTo(onesEdge); api.sfx.tick();
    } else if (kind === "list") {
      if (!ask) return;
      setTouched(true);
      const m = marksRef.current.includes(d) ? marksRef.current.filter((x) => x !== d) : [...marksRef.current, d].sort((a, b) => a - b);
      marksRef.current = m; setMarks(m); actedRef.current = true; api.setTyped(m.join(", ")); api.sfx.tick();
    } else if (free && !busy) {
      setTouched(true); setBoard(null); setLit(null);
      downRef.current = cells.map(() => false); setDown(downRef.current); setTotal(null);
      setLamps((L: any) => { const o = { ...L }; delete o[d]; return o; });
      tl.run(d === 3 ? [[60, () => { slideTo(DT.stow); setAsking(3); }], ...railSteps(freeNum, 0.7, lamp3At)] : onesSteps(freeNum, d, 0.7, false));
    }
  };
  const pressFifth = () => {
    if (!(ask && (kind === "mystery" || kind === "proof")) && !(free && !busy)) return;
    setTouched(true);
    if (free) setFifthAt((k) => (k + 1) % DT_FIFTH.length);
    api.sfx.tick();
    tl.run([[40, () => setFifth((f) => ({ ...f, flick: true }))], [140, () => setFifth((f) => ({ ...f, flick: false }))],
      [140, () => setFifth((f) => ({ ...f, flick: true }))], [160, () => setFifth((f) => ({ ...f, flick: false }))]]);
  };
  const allDown = (nx: boolean[]) => nx.length > 0 && nx.every(Boolean);
  /* the rail closes: the gate lifts, the verdict question shows its total, a demo hands on to the first question */
  const railClosed = () => {
    setGateLit(false);
    if (kind === "three") setTotal(dtDigits(it.num).reduce((a, b) => a + b, 0));
    if (stage === "demo") api.demoDone(phase.demoLines);
  };
  const bringDown = (i: number) => {
    if (!((ask || demo) && railKind) || downRef.current[i]) return;
    const nx = downRef.current.slice(); nx[i] = true; downRef.current = nx; setDown(nx);
    setTouched(true); api.sfx.tick();
    if (allDown(nx)) railClosed();
  };
  const dropAll = () => { const nx = downRef.current.map(() => true); downRef.current = nx; setDown(nx); api.sfx.tick(); railClosed(); };
  const toggleTick = () => {
    if (!(ask && kind === "share")) return;
    setTouched(true); tickedRef.current = !tickedRef.current; setTicked(tickedRef.current); setTickGlow(false); api.sfx.tick();
  };
  const changeCell = (i: number) => {
    if (!free || busy) return;
    const ds = dtDigits(freeNum);
    ds[i] = i === 0 ? (ds[i] % 9) + 1 : (ds[i] + 1) % 10;
    setFreeNum(Number(ds.join(""))); setTouched(true);
    setLamps({}); setBoard(null); setRule(null); setChip(null); setLit(null); setAsking(null); setTotal(null); setRailOn(false);
    downRef.current = ds.map(() => false); setDown(downRef.current); slideTo(DT.stow);
    api.sfx.tick();
  };

  const drag = useDrag((payload: any, p: any, moved: boolean) => {
    if (payload.src === "shutter") {
      if (!(ask && kind === "verdict")) return;
      setTouched(true);
      const shut = moved ? p.x > (DT.stow + onesEdge) / 2 : edgeRef.current < onesEdge - 4;
      if (shut) api.sfx.tick();
      slideTo(shut ? onesEdge : DT.stow);
      if (!shut) { setAsking(null); setLit(null); }
    } else if (payload.src === "cell") {
      if (moved && p.y < DT.ry - 40) return;   /* let go above the rail: it goes back up */
      bringDown(payload.i);
    }
  });

  /* Enter: a list sends the lamps the child marked. The gates judge nothing while a cell is still up, or while
     the count typed takes in the host and the bay still leaves the host out; each lights what is missing */
  const hostLeftOut = (v: any) => kind === "share" && Number(slotPartsOf(v, 2)[0]) === it.friends + 1 && !tickedRef.current;
  const enterFn = stage !== "ask" ? null
    : kind === "list" ? () => {
      /* only a fresh set of marks is sent: after a miss a bare Enter does nothing until a lamp is marked or unmarked */
      const m = marksRef.current;
      if (busy || !m.length || !actedRef.current) return;
      actedRef.current = false;
      api.submit(m.join(", "));
    }
      : railKind ? (v: any) => {
        if (busy) return;
        if (!allDown(downRef.current)) { setGateLit(true); api.sfx.tick(); api.say("Not yet. The rail stays open while a cell is still up."); return; }
        api.submit(v);
      }
        : kind === "share" ? (v: any) => {
          if (busy) return;
          if (hostLeftOut(v)) {
            setTickGlow(true);
            /* one literal line per host (the voice baker reads literal calls only) */
            if (it.host === "boy") api.say("Tick the boy in, so the bay counts him too.");
            else if (it.host === "girl") api.say("Tick the girl in, so the bay counts her too.");
            else api.say("Tick the cook in, so the bay counts him too.");
            return;
          }
          api.submit(v);
        }
          : null;
  api.onEnter(enterFn);
  HOOK.enter = () => enterFn && enterFn();
  HOOK.set = (v: number[]) => {
    const m = DT_TESTS.filter((d) => v.includes(d));
    marksRef.current = m; setMarks(m); actedRef.current = true; api.setTyped(m.join(", "));
    return true;
  };
  /* the agent's check(): the child's act the gate is waiting for, done once; undefined = press Enter */
  HOOK.check = () => {
    if ((stage === "demo" || stage === "ask") && railKind && !allDown(downRef.current)) { dropAll(); return true; }
    if (stage === "ask" && hostLeftOut(typedRef.current)) { tickedRef.current = true; setTicked(true); setTickGlow(false); api.sfx.tick(); return true; }
    return undefined;
  };
  HOOK.demo = () => { if (stage === "demo" && railKind && !allDown(downRef.current)) dropAll(); };

  /* ── the share-out: the host counted in, every figure counted, a round at a time, the rest on the shelf ── */
  const shareSteps = (x: any, slow: number, childN: number | null) => {
    const N = x.friends + 1, q = Math.floor(x.things / N), r = x.things - q * N;
    const S: any[] = [[60, () => { setCounted(0); setBoards([]); }]];
    /* the child's own count, shared out first on a board of its own (a row for each person it counts) */
    const cq = childN ? Math.floor(x.things / childN) : 0;
    if (childN && childN !== N && childN >= 2 && childN <= 10 && cq <= 11) {
      const cr = x.things - cq * childN;
      S.push([300 * slow, () => setBoards([{ s: childN, q: cq, r: cr, rounds: 0, shelf: false, mine: true }])]);
      for (let j = 1; j <= cq; j++) S.push([120 * slow, () => setBoards((B: any[]) => B.map((b) => (b.mine ? { ...b, rounds: j } : b)))]);
      S.push([320 * slow, () => setBoards((B: any[]) => B.map((b) => (b.mine ? { ...b, shelf: true } : b)))]);
      S.push([500 * slow, () => {}]);
    }
    if (!tickedRef.current) {
      S.push([420 * slow, () => setTickGlow(true)]);
      S.push([420 * slow, () => { tickedRef.current = true; setTicked(true); setTickGlow(false); api.sfx.tick(); }]);
    }
    for (let k = 1; k <= N; k++) S.push([230 * slow, () => setCounted(k)]);
    S.push([300 * slow, () => setBoards((B: any[]) => [...B.filter((b) => b.mine), { s: N, q, r, rounds: 0, shelf: false, mine: false }])]);
    for (let j = 1; j <= q; j++) S.push([190 * slow, () => { setBoards((B: any[]) => B.map((b) => (b.mine ? b : { ...b, rounds: j }))); api.sfx.tick(); }]);
    S.push([380 * slow, () => setBoards((B: any[]) => B.map((b) => (b.mine ? b : { ...b, shelf: true })))]);
    S.push([300, () => {}]);
    return S;
  };

  /* the list: each lamp run in turn on the clues (the ones cell for 2, 5 and 10; the digit total for 3) */
  const listSteps = (x: any, slow: number) => {
    const S: any[] = [[60, () => setLamps({})]];
    DT_TESTS.forEach((d) => {
      S.push([380 * slow, () => { setAsking(d); setLit(d === 3 ? "tag" : "ones"); }]);
      const pass = d === 3 ? x.sum % 3 === 0 : DT_ENDS[d].includes(x.ones);
      S.push([420 * slow, () => { setLamps((L: any) => ({ ...L, [d]: pass ? "pass" : "fail" })); api.sfx.tick(); }]);
    });
    S.push([300, () => { setAsking(null); setLit(null); }]);
    return S;
  };
  const flickSteps = (slow: number) => [
    [60, () => setFifth((f) => ({ ...f, flick: true }))], [160 * slow, () => setFifth((f) => ({ ...f, flick: false }))],
    [160 * slow, () => setFifth((f) => ({ ...f, flick: true }))], [220 * slow, () => setFifth((f) => ({ ...f, flick: false }))],
  ];
  const proofSteps = (x: any, slow: number) => [
    ...flickSteps(slow),
    [300 * slow, () => {}],
    ...onesSteps(x.num, 2, slow, false),
    [300 * slow, () => setBoard({ num: x.num, d: x.d })],
    [520 * slow, () => setProved(true)],
    [300, () => {}],
  ];
  const mysterySteps = (slow: number) => [
    ...flickSteps(slow),
    [360 * slow, () => setBoard({ pair: true, step: 1 })],
    [700 * slow, () => setBoard({ pair: true, step: 2 })],
    [520 * slow, () => setFifth({ flick: false, caption: "not known" })],
    [300, () => {}],
  ];

  /* ── the win: the maths moves ── */
  useEffect(() => {
    if (stage !== "win") return;
    if (shown.current) { tl.run([[400, () => {}]]); return; }
    shown.current = true;
    if (kind === "verdict") tl.run(onesSteps(it.num, it.d, 1, true));
    else if (railKind) tl.run(railSteps(it.num, 0.8, lamp3At));
    else if (kind === "mystery") tl.run([...flickSteps(1), [360, () => setFifth({ flick: false, caption: "not known" })], [300, () => {}]]);
    else if (kind === "list") tl.run(listSteps(it, 0.9));
    else if (kind === "proof") tl.run([[300, () => setProved(true)], ...onesSteps(it.num, 2, 0.8, false), [300, () => setBoard({ num: it.num, d: it.d })], [300, () => {}]]);
    else if (kind === "share") tl.run(shareSteps(it, 0.9, null));
  }, [stage]);

  /* ── the traceback: the mathematics redrawn in steps, ending on the whole right answer; nothing marked ── */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    setTouched(true);
    shown.current = true;
    const done = () => api.lock(false);
    if (kind === "verdict") {
      const S: any[] = [[60, () => { slideTo(DT.stow); setAsking(null); setLit(null); setRule(null); setChip(null); setBoard(null); setLamps({}); setNames(0); }], [520, () => {}]];
      for (let k = 1; k <= nd; k++) S.push([380, () => setNames(k)]);
      tl.run([...S, [300, () => {}], ...onesSteps(it.num, it.d, 1.3, true)], done);
    } else if (railKind) {
      tl.run([[60, () => { setLit(null); setTotal(null); setLamps({}); setGateLit(false); }], [700, () => {}], ...railSteps(it.num, 1.3, lamp3At, true)], done);
    } else if (kind === "mystery") {
      tl.run([[60, () => { setBoard(null); setFifth({ flick: false, caption: "not taught" }); }], ...mysterySteps(1.2)], done);
    } else if (kind === "list") {
      tl.run(listSteps(it, 1.3), done);
    } else if (kind === "proof") {
      tl.run([[60, () => { setBoard(null); setProved(false); setLamps({ 3: "pass" }); slideTo(DT.stow); }], ...proofSteps(it, 1.2)], done);
    } else if (kind === "share") {
      const mine = slotPartsOf(wrong.value, 2)[0];
      tl.run(shareSteps(it, 1.2, mine === "" ? null : Number(mine)), done);
    } else done();
  }, [wrong]);

  /* ── what the host and the agent read back (toolApi.getState); no total or count before it is given ── */
  const caught = railKind ? cells.map((_, i) => i).filter((i) => !down[i] && down.some((dn, k) => dn && k > i)) : [];
  const litUp = railKind ? cells.map((_, i) => i).filter((i) => !down[i] && (gateLit || caught.includes(i))) : [];
  const mainBoard = boards.find((b) => !b.mine && b.shelf);
  const ran = Object.keys(lamps).length;
  api.share({
    number: typeof it.num === "number" ? it.num : null, divisor: it.d ?? null,
    digitCells: cells.map((c) => (c === null ? "?" : String(c))),
    lamp: asking, shutter: edgeX >= allEdge - 2 ? "all" : edgeX >= onesEdge - 2 ? "ones" : "open", testsRun: ran, lampsLit: lamps, marked: marks,
    railDown: down.filter(Boolean).length, skippedCell: caught.length ? caught[0] : null, railTotal: total,
    railClosed: allDown(down), gate: gateLit || tickGlow,
    hostTicked: ticked, sharers: counted || null, leftover: mainBoard ? mainBoard.r : null,
    complete: stage === "idle",
  });

  /* ── drawing ── */
  const dragging = drag.drag && drag.drag.moved ? drag.drag : null;
  const shownEdge = dragging && dragging.payload.src === "shutter" ? Math.max(DT.stow, Math.min(onesEdge, dragging.x)) : edgeX;
  const hasShutter = kind === "verdict" || kind === "mystery" || kind === "list" || kind === "proof" || kind === "free";
  const covered = (i: number) => hasShutter && xs[i] + DT.cw <= shownEdge + 1;
  const showLamps = !railKind && kind !== "share";
  const showFifth = kind === "mystery" || kind === "proof" || kind === "free";
  const shutterLive = ask && kind === "verdict";
  const lampLive = (d: number) => (ask && ((kind === "verdict" && d !== 3) || kind === "list")) || (free && !busy);
  const fifthLive = (ask && (kind === "mystery" || kind === "proof")) || (free && !busy);
  const ringOnes = lit === "ones";

  const firstUp = down.findIndex((dn) => !dn);
  const invite =
    busy ? null
      : stage === "demo" && railKind && firstUp >= 0 ? { x: xs[firstUp] + DT.cw / 2, y: DT.cy + DT.ch / 2, r: 70 }
      : stage !== "ask" || touched ? null
      : kind === "verdict" ? { x: dtLampX(DT_TESTS.indexOf(it.d)) + DT.lw / 2, y: DT.ly + DT.lh / 2, r: 88 }
        : railKind && firstUp >= 0 ? { x: xs[firstUp] + DT.cw / 2, y: DT.cy + DT.ch / 2, r: 70 }
          : kind === "mystery" ? { x: dtLampX(4) + DT.fw / 2, y: DT.ly + DT.lh / 2, r: 96 }
            : kind === "list" ? { x: dtLampX(0) + DT.lw / 2, y: DT.ly + DT.lh / 2, r: 88 }
              : kind === "share" ? { x: 48, y: 80, r: 42 }
                : null;

  const ds = cells;
  return (
    <g>
      <style>{DT_CSS}</style>

      {/* the running count: tests run on this number, out of the four this chapter teaches */}
      {kind !== "share" && (
        <g data-zone="runs">
          <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          <text x={20} y={-46} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("tests run")}</text>
          <text x={312} y={-40} textAnchor="end" fontSize={T.speech} fontWeight={700} fill={C.ink}>{dtFill(tx, "{n} of 4", { n: ran })}</text>
        </g>
      )}

      {/* the digit cells: one digit to a cell, a zero drawn exactly like the rest */}
      {nd > 0 && ds.map((dg, i) => {
        const x = xs[i], hid = covered(i), isDown = railKind || railOn ? down[i] : false;
        const lifted = dragging && dragging.payload.src === "cell" && dragging.payload.i === i;
        const isCaught = litUp.includes(i);
        const pay = { src: "cell", i };
        const cellLive = (ask || demo) && railKind && !isDown;
        const faceOn = !isDown && !lifted;
        return (
          <g key={"c" + i}>
            {!faceOn && <rect x={x} y={DT.cy} width={DT.cw} height={DT.ch} rx={16} fill="none" stroke={C.rule} strokeWidth={2.5} strokeDasharray="9 8" />}
            {faceOn && (
              <g className={(isCaught ? "dt-catch" : "") + (cellLive ? " dt-grab c4-piece" : "")} key={isCaught ? "caught" + (gateLit ? "g" : "") : "still"}
                {...(cellLive ? { ...control("cell-" + i, "Bring the digit " + dg + " down"), ...drag.bind(pay), ...drag.keys(pay) } : {})}>
                <rect x={x} y={DT.cy} width={DT.cw} height={DT.ch} rx={16} fill={tint(DT_AMBER, 0.78)} stroke={shade(DT_AMBER, 0.12)} strokeWidth={2.5} filter="url(#fShadowSoft)" />
                {isCaught && <rect x={x - 7} y={DT.cy - 7} width={DT.cw + 14} height={DT.ch + 14} rx={20} fill="none" stroke={DT_SKY} strokeWidth={7} />}
                {!hid && dg !== null && <text x={x + DT.cw / 2} y={DT.cy + 88} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>{dg}</text>}
              </g>
            )}
            {free && !hid && !busy && <Hit id={"cell-" + i} label={"Change the digit " + dg} x={x} y={DT.cy} w={DT.cw} h={DT.ch} onPress={() => changeCell(i)} />}
            {i < nd - 1 && !cells.includes(null) && [3, 5, 7].includes(nd - 1 - i) && !(hasShutter && xs[i + 1] <= shownEdge) && (
              <DtComma x={x + DT.cw + DT.cgap / 2} y={DT.cy + 96} color={C.ink} />
            )}
            {names > nd - 1 - i && lang === "en" && (
              <text x={x + DT.cw / 2} y={DT.cy + DT.ch + 32} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}>{tx(DT_PLACE[nd - 1 - i])}</text>
            )}
          </g>
        );
      })}
      {ringOnes && nd > 0 && !covered(nd - 1) && (
        <rect x={xs[nd - 1] - 7} y={DT.cy - 7} width={DT.cw + 14} height={DT.ch + 14} rx={20} fill="none" stroke={DT_SKY} strokeWidth={7} pointerEvents="none" />
      )}
      {/* Hindi and Gujarati place heads carry a mark above the letter: a little lower, and drawn over the ones ring */}
      {lang !== "en" && nd > 0 && ds.map((_, i) => names > nd - 1 - i && (
        <text key={"pn" + i} x={xs[i] + DT.cw / 2} y={DT.cy + DT.ch + 37} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink}
          stroke={C.paper} strokeWidth={4} paintOrder="stroke" pointerEvents="none">{tx(DT_PLACE[nd - 1 - i])}</text>
      ))}

      {/* the ones shutter: slides in from the left and leaves only the ones cell showing */}
      {hasShutter && nd > 0 && (() => {
        /* a number known only by its tests keeps its cells in view: the closed shutter is a band over the digits */
        const band = kind === "mystery", sy = band ? DT.cy + 30 : DT.cy - 4, sh = band ? DT.ch - 60 : DT.ch + 8, sw = Math.max(DT.stow, shownEdge);
        return (
          <g className={shutterLive ? "dt-grab c4-piece" : ""}
            {...(shutterLive ? { ...control("shutter", "Slide the shutter over the number"), ...drag.bind({ src: "shutter" }), ...drag.keys({ src: "shutter" }) } : {})}>
            <rect x={0} y={sy} width={sw} height={sh} rx={16} fill="url(#gPanel)" stroke={shade(C.rule, 0.2)} strokeWidth={2.5} />
            {(band ? [22, 42] : [34, 66, 98]).map((yy) => <line key={yy} x1={14} y1={(band ? sy : DT.cy) + yy} x2={sw - 30} y2={(band ? sy : DT.cy) + yy} stroke={C.rule} strokeWidth={2} />)}
            <rect x={sw - 22} y={band ? sy + 12 : DT.cy + 20} width={12} height={band ? sh - 24 : DT.ch - 40} rx={6} fill={shade(C.rule, 0.2)} />
          </g>
        );
      })()}

      {/* the list's second clue: the digit total */}
      {kind === "list" && (
        <g>
          <rect x={640} y={DT.cy} width={220} height={DT.ch} rx={16} fill="#FFFFFF" stroke={lit === "tag" ? DT_SKY : shade(DT_AMBER, 0.12)} strokeWidth={lit === "tag" ? 7 : 2.5} filter="url(#fShadowSoft)" />
          <text x={750} y={DT.cy + 40} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("digit total")}</text>
          <text x={750} y={DT.cy + 104} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={dtInk(DT_AMBER)}>{it.sum}</text>
        </g>
      )}

      {/* the four test lamps, and the slot for a test this chapter never taught */}
      {showLamps && DT_TESTS.map((d, k) => (
        <g key={"l" + d}>
          <DtLamp x={dtLampX(k)} y={DT.ly} d={d} state={lamps[d]} ring={asking === d} mark={marks.includes(d)} quiet={kind === "verdict" && d === 3} C={C} tx={tx} />
          {lampLive(d) && <Hit id={"lamp-" + d} label={kind === "list" ? "Mark the test for " + d : "Run the test for " + d} x={dtLampX(k)} y={DT.ly} w={DT.lw} h={DT.lh} onPress={() => pressLamp(d)} />}
        </g>
      ))}
      {showFifth && (
        <g>
          <DtFifth x={dtLampX(4)} y={DT.ly} d={kind === "mystery" || kind === "proof" ? it.d : DT_FIFTH[fifthAt]} caption={tx(fifth.caption)} flick={fifth.flick} C={C} />
          {fifthLive && <Hit id="fifth" label="Ask the slot that was never taught" x={dtLampX(4)} y={DT.ly} w={DT.fw} h={DT.lh} onPress={pressFifth} />}
        </g>
      )}
      {railKind && <DtLamp x={880} y={DT.cy} d={3} state={lamps[3]} ring={false} C={C} tx={tx} />}

      {/* the sum rail: a slot under every cell, a plus between, and the total at the end */}
      {railOn && nd > 0 && (() => {
        const lastCx = slotCx(nd - 1), eqX = lastCx + 42 + 30, boxX = lastCx + 42 + 60, closed = down.every(Boolean);
        return (
          <g>
            <rect x={xs[0] - 14} y={railY} width={boxX + 104 + 14 - (xs[0] - 14)} height={DT.rh} rx={22} fill={tint(C.panel, 0.4)}
              stroke={closed ? shade(DT_AMBER, 0.12) : C.rule} strokeWidth={closed ? 4 : 2} strokeDasharray={closed ? undefined : "12 9"} />
            {ds.map((dg, i) => (
              <g key={"r" + i}>
                <rect x={slotCx(i) - 42} y={railY + 10} width={84} height={76} rx={14} fill={down[i] ? "#FFFFFF" : "none"}
                  stroke={down[i] ? (lit === i ? DT_SKY : shade(DT_SKY, 0.2)) : C.rule} strokeWidth={down[i] ? (lit === i ? 6 : 3) : 2} strokeDasharray={down[i] ? undefined : "8 7"} />
                {down[i] && <text x={slotCx(i)} y={railY + 68} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={dtSkyInk}>{dg}</text>}
                {i < nd - 1 && <text x={(slotCx(i) + slotCx(i + 1)) / 2} y={railY + 60} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>+</text>}
              </g>
            ))}
            <text x={eqX} y={railY + 60} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>=</text>
            <rect x={boxX} y={railY + 10} width={104} height={76} rx={14} fill="#FFFFFF" stroke={closed ? shade(DT_AMBER, 0.12) : C.rule} strokeWidth={closed ? 3 : 2} />
            <text x={boxX + 52} y={railY + 68} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={total === null ? C.ink : dtInk(DT_AMBER)}>{total === null ? "?" : total}</text>
          </g>
        );
      })()}

      {/* the digits that pass a last-digit test, and the ones digit laid against them */}
      {rule !== null && DT_ENDS[rule] && (
        <g className="dt-in">
          <text x={DT.x0} y={374} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("ends in")}</text>
          {DT_ENDS[rule].map((v, j) => {
            const on = chip && chip.landed && chip.hit && chip.v === v;
            return (
              <g key={"e" + v}>
                <rect x={214 + j * 78} y={330} width={68} height={68} rx={14} fill={on ? tint(DT_SKY, 0.7) : "#FFFFFF"} stroke={on ? DT_SKY : C.rule} strokeWidth={on ? 6 : 2} />
                <text x={248 + j * 78} y={380} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={C.ink}>{v}</text>
              </g>
            );
          })}
        </g>
      )}
      {chip && !(chip.landed && chip.hit) && (
        <g className="dt-move" style={{ transform: `translate(${chip.x}px, ${chip.y}px)` } as any} pointerEvents="none">
          <rect x={-34} y={-34} width={68} height={68} rx={14} fill={tint(DT_SKY, 0.7)} stroke={DT_SKY} strokeWidth={5} />
          <text x={0} y={16} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={dtSkyInk}>{chip.v}</text>
        </g>
      )}

      {/* the total on its way up to the lamp for three */}
      {fly && (
        <g className="dt-move" style={{ transform: `translate(${fly.x}px, ${fly.y}px)` } as any} pointerEvents="none">
          <rect x={-40} y={-30} width={80} height={60} rx={14} fill="#FFFFFF" stroke={DT_AMBER} strokeWidth={4} filter="url(#fLift)" />
          <text x={0} y={14} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={dtInk(DT_AMBER)}>{fly.v}</text>
        </g>
      )}

      {/* the ruled board: a division done in full */}
      {board && !board.pair && <DtBoard x={620} y={316} w={456} num={board.num} d={board.d} C={C} tx={tx} />}
      {board && board.pair && (
        <g>
          <DtBoard x={96} y={316} w={470} num={DT_PAIR[0]} d={it.d} caption={tx("passes all four")} C={C} tx={tx} />
          {board.step >= 2 && <DtBoard x={606} y={316} w={470} num={DT_PAIR[1]} d={it.d} caption={tx("passes all four")} C={C} tx={tx} />}
        </g>
      )}
      {proved && (
        <g className="dt-in">
          <text x={DT.x0} y={460} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("the test proved")}</text>
          <text x={DT.x0} y={506} fontSize={T.label} fontWeight={700} fill={dtInk(DT_BLUE)}>{tx("by 3 only")}</text>
        </g>
      )}

      {/* the sharing bay: the one handing out, the friends, the things; the boards come with the answer */}
      {kind === "share" && (() => {
        const N = it.friends + 1, main = boards.find((b) => !b.mine), two = boards.length > 1;
        const inPile = it.things - (main ? main.rounds * main.s + (main.shelf ? main.r : 0) : 0);
        const cx = (k: number) => 150 + k * 92;
        return (
          <g>
            <rect x={20} y={52} width={56} height={56} rx={12} fill="#FFFFFF" stroke={tickGlow ? DT_SKY : C.ink} strokeWidth={tickGlow ? 6 : 3} />
            {ticked && <path d="M 32 80 l 12 13 l 22 -26" fill="none" stroke={DT_BLUE} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />}
            {ask && <Hit id="tick-host" label={"Count the " + it.host + " in too"} x={12} y={44} w={72} h={72} onPress={toggleTick} />}
            {Array.from({ length: N }).map((_, k) => (
              <g key={"p" + k}>
                <DtPerson cx={cx(k)} solid={k > 0 || ticked} num={counted > k ? k + 1 : null} C={C} />
              </g>
            ))}
            <text x={cx(0)} y={160} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(it.host)}</text>
            <text x={866} y={30} fontSize={T.micro} fontWeight={600} fill={C.ink}>{`${it.things} ${tx(it.thing)}`}</text>
            <g filter="url(#fShadowSoft)">
              {Array.from({ length: Math.max(0, inPile) }).map((_, j) => <Disc key={j} x={878 + (j % 10) * 22} y={62 + Math.floor(j / 10) * 22} r={10} paint="gTen" flat />)}
            </g>
            {boards.map((b) => <DtShareBoard key={b.mine ? "mine" : "true"} x={two ? (b.mine ? 0 : 556) : 278} y={214} b={b} C={C} tx={tx} />)}
          </g>
        );
      })()}

      {/* a cell under the finger */}
      {dragging && dragging.payload.src === "cell" && (() => {
        const dg = ds[dragging.payload.i];
        return (
          <g pointerEvents="none" filter="url(#fLift)">
            <rect x={dragging.x - DT.cw / 2} y={dragging.y - DT.ch / 2} width={DT.cw} height={DT.ch} rx={16} fill={tint(DT_AMBER, 0.78)} stroke={shade(DT_AMBER, 0.12)} strokeWidth={2.5} />
            <text x={dragging.x} y={dragging.y + 26} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={C.ink}>{dg}</text>
          </g>
        );
      })()}

      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ result, C, w, h, tx = (v: any) => v }: any) {
  const L = (result && result.last) || {};
  const S = L.shared || {};
  const k = L.kind;
  if (L.value === null || L.value === undefined) return null;
  const parts = k === "share" ? slotPartsOf(L.value, 2) : [];
  const tt = tx;
  const top = k === "verdict" ? `${indian(S.number)} ÷ ${S.divisor}` : k === "three" ? `${indian(S.number)} ÷ 3` : k === "total" ? (S.digitCells || []).join("+")
    : k === "mystery" ? `÷ ${S.divisor}` : k === "list" ? tt("passes") : k === "proof" ? tt("proved") : k === "share" ? dtFill(tt, "{n} sharing", { n: parts[0] }) : "";
  const bottom = k === "share" ? dtFill(tt, "{r} left", { r: parts[1] }) : k === "total" ? `= ${L.value}` : tt(String(L.value));
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <text x={16} y={32} fontSize={T.micro} fontWeight={600} fill={C.ink}>{top}</text>
      <text x={w - 16} y={h - 12} textAnchor="end" fontSize={T.label} fontWeight={700} fill={k === "share" && Number(parts[1]) ? dtInk(DT_VERM) : dtInk(DT_BLUE)}>{bottom}</text>
    </g>
  );
}

function DigitTester(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default DigitTester;
