/* ═══ M1.S1.T2.C4.2D1 · divide_ladder · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, sounds, the synced voice, scoring, the events,
   idle and restart. NO imports in this file; only the five host hooks. Follow docs/LAYOUT.md;
   the reference tool is work/indiannica_eng_maths4_ch1/M1.S1.T2.C4.2D1/tool.tsx.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "divide_ladder";
const MEDIA_ID = "M1.S1.T2.C4.2D1";
const TOOL_NAME = "Divide Ladder";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
const VOICE = {"rate":0.92,"pitch":1.06};

/* spoken before phase 1's teach lines only (the plan's opening voice line; the ladder stands beside the tray here) */
const OPENING = ["A tray of things to share, and a ladder of trials beside it."];
/* the whole-tool line: spoken on the summary page */
const FINISH_LINE = "Every rung tried in order, every failure still showing, and the pen full.";
/* said when the child opens Free play from the summary page (the plan's free-play voice line) */
const FREE_LINE = "Free play. Any number in the tray, with the pen, the shelf and the repeat light as you like.";

/* ── the ladder, the board and the pen (working-area units, 1086 x 528) ─────────────────────
   Left: the ladder, rungs numbered from 1 at the foot; a tried rung keeps its record ("0 over" lit
   blue, "3 over" in vermilion) and is never cleared. Right: the board. The tray (top strip) holds the
   number as amber counters, tens tied into rods; stepping on rung d deals it into d walled rows, one
   round at a time, and what will not fit goes to the leftover shelf. Bottom: the factor pen, walled
   at both ends, cards in order; a card that is already there lands on its twin (rose), never beside it. */
const DL_BLUE = CONTENT.hundred;   /* a number that divides exactly: a lit rung, a factor card */
const DL_AMBER = CONTENT.ten;      /* the number in hand: the tray's counters */
const DL_VERM = CONTENT.pointer;   /* what is left over, and a trial that fails */
const DL_ROSE = CONTENT.bead;      /* a number standing twice: the repeat */
const DL_INK: Record<string, string> = { blue: shade(DL_BLUE, 0.25), verm: shade(DL_VERM, 0.25), rose: shade(DL_ROSE, 0.25) };
const DL_WOOD = "#A08C70";
const LAD = { w: 240, railL: 12, railR: 106, plate: 59, rec: 122, foot: 524, K: 10 };
const BRD = { x: 262, x1: 1076, trayY: 30, count0: 452, rows0: 70, rows1: 332, shelf0: 344, shelfH: 70 };
const PEN = { x: 262, x1: 1086, y: 432, h: 96, cx: 284, pitch: 66, cw: 62, ch: 76 };
const WAITC = { x: 966, y: [74, 208], w: 76, h: 84 };
const YES_NO = [{ id: "yes", label: "yes" }, { id: "no", label: "no" }];
const SKIP_CHOICES = [{ id: "3 only", label: "3 only" }, { id: "4 only", label: "4 only" }, { id: "both", label: "both" }, { id: "neither", label: "neither" }];

/* how a tray of n shares into d rows: q in each row and r left over (the picture's own route) */
const dlShare = (n: number, d: number) => { const q = Math.floor(n / d); return { q, r: n - q * d }; };
/* a line of c counters drawn as tens rods and loose ones, measured in counter widths */
const dlUnits = (c: number) => Math.floor(c / 10) * 10.5 + (c % 10);
/* dealing q rounds: the tens first (a rod at a time), then one round at a time */
const dlFrames = (q: number) => { const out: number[] = []; for (let f = 10; f <= q; f += 10) out.push(f); for (let f = Math.floor(q / 10) * 10 + 1; f <= q; f++) out.push(f); return out; };
const dlRange = (a: number, b: number) => { const out: number[] = []; for (let k = a; k <= b; k++) out.push(k); return out; };
const dlNums = (v: any): number[] => (Array.isArray(v) ? v.map(Number) : (String(v ?? "").match(/\d+/g) || []).map(Number));
/* a card into the pen, in order; a number already there lands on its twin */
const dlAdd = (pen: any[], v: number, hide: boolean) => {
  const i = pen.findIndex((c: any) => c.v === v);
  if (i >= 0) return pen.map((c: any, j: number) => (j === i ? { ...c, twins: c.twins + 1, hidTw: c.hidTw + (hide ? 1 : 0) } : c));
  return [...pen, { v, twins: 0, hid: hide, hidTw: 0 }].sort((a: any, b: any) => a.v - b.v);
};

/* One entry per phase = one mount.
   says    the teach run, said before anything is asked (numbers are turned into words for the voice)
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, said once when it goes idle
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   cards   what an exact rung does with its two cards: "none" (phase 1 has no pen), "auto" (they travel
           into the pen), "wait" (they wait on the board for the child to drop them in); lamp = the repeat light
   items   three a phase. kind: pick (type the offered rung that is a factor) · judge (yes or no) ·
           first (the first rung that fails) · list (climb, then Enter sends the pen) · skip (the rungs a
           child skipped) · new (how many factors one division gives) · pair (drop both cards, Enter) ·
           count (how many factors in all) · repeat (the rung where the answers begin to repeat).
           n = the tray; offer = the rungs offered (phase 1, 3), else top = the ladder's height;
           done = rungs already tried when it opens; waitRung = the rung whose two cards wait;
           stop = where a count's climb ends; near = the misconception; verdict + tone = the label that
           ends the correction (and the win), never shown before the first answer. */
const PHASES = [
  {
    n: 1,
    concept: "What makes a number a factor",
    conceptId: "M1.S1.T2.C4", objectiveIds: ["O1"],
    cards: "none", lamp: false,
    says: ["Share them out. Which try left nothing over? That one is a factor."],
    ladder: ["What does anything standing outside the rows say about this trial?", "Count what sits on the shelf. A factor leaves the shelf empty."],
    closing: "A factor divides the number and leaves nothing over. Anything standing outside the rows says it is not one.",
    learned: "You learned: a factor is a trial with an empty shelf.",
    traceback: "The tray is shared again at walking pace on each rung; what will not fit goes to the shelf and stays, the rows are counted, and the rung that leaves nothing over is named.",
    items: [
      /* learn ML1: answer in the plan = 4 is a factor of 20 and 6 is not (the spoken line leaves the numbers to the rungs, so it never says the answer) */
      { qid: "M1.S1.T2.C4:ML1", kind: "pick", n: 20, offer: [4, 6], answer: 4, near: 6, verdict: "4 is a factor", tone: "blue", winMs: 2200,
        say: "Share 20 on each of the two rungs. Which of them is a factor of 20?", ask: "Which is a factor of 20?",
        miss: "Which of the two rungs sent something to the shelf?" },
      /* practice 1: answer in the plan = No, because 68 divided by 8 is 8 with 4 left over */
      { qid: "M1.S1.T2.C4:1", kind: "judge", n: 68, offer: [8], answer: "no", near: "yes", choices: YES_NO, verdict: "not a factor", tone: "verm", winMs: 2200,
        say: "Is 8 a factor of 68? Step on the rung to find out.", ask: "Is 8 a factor of 68?",
        miss: "After 8 rows, how many are sitting on the shelf?" },
      /* practice 2: answer in the plan = Yes, because 78 divided by 6 is 13 with nothing over */
      { qid: "M1.S1.T2.C4:2", kind: "judge", n: 78, offer: [6], answer: "yes", near: "no", choices: YES_NO, verdict: "6 is a factor", tone: "blue", winMs: 2200,
        say: "Now the tray holds 78. Is 6 a factor of 78?", ask: "Is 6 a factor of 78?",
        miss: "Did every one of the 78 find a place in a row?" },
    ],
  },
  {
    n: 2,
    concept: "Working up through the numbers in order",
    conceptId: "M1.S1.T2.C5", objectiveIds: ["O1","O2"],
    cards: "auto", lamp: false,
    says: ["Start at the bottom and take every rung. Try to jump one and see what happens."],
    ladder: ["Can a number you never tried be ruled out?", "Go back to the lowest blank rung before any other."],
    closing: "Work up from one and try every whole number in turn. Write down the trials that fail, as well as the ones that come out.",
    learned: "You learned: climb every rung in order, and keep the failures.",
    traceback: "The ladder climbs itself from the lowest blank rung, each trial keeping its rows or its leftover, and the rung the question asks about is named.",
    items: [
      /* learn ML2: answer in the plan = 1, 2, 4, 5, 8, 10, 20 and 40, and the first trial that fails is 3 (the factors fill the pen as the child climbs; the checked answer is the first failure) */
      { qid: "M1.S1.T2.C5:ML2", kind: "first", n: 40, top: 6, answer: 3, near: 6, verdict: "3 fails first", tone: "verm", winMs: 2200,
        say: "Find the factors of 40, one rung at a time from the foot. Which is the first rung that fails?", ask: "First rung that fails?",
        miss: "Look for the lowest rung that sent something to the shelf." },
      /* practice 4: answer in the plan = 1, 2, 4, 23, 46 and 92 (climbed on the ladder; Enter sends the pen) */
      { qid: "M1.S1.T2.C5:4", kind: "list", n: 92, top: 9, answer: [1, 2, 4, 23, 46, 92], near: "1,2,46,92", pad: "enter", verdict: "every factor of 92", tone: "blue", winMs: 2400,
        say: "Now find every factor of 92 by dividing in turn. Press enter when every rung is done.", ask: "Every factor of 92",
        miss: "Is any rung on the ladder still blank?" },
      /* practice 5: answer in the plan = 3 and 4 were skipped. 70 divided by 3 leaves 1 over and 70 divided by 4 leaves 2 over, so neither is a factor */
      { qid: "M1.S1.T2.C5:5", kind: "skip", n: 70, top: 5, done: [1, 2, 5], answer: "neither", near: "both", choices: SKIP_CHOICES, verdict: "neither is a factor", tone: "verm", winMs: 2400,
        say: "A child finding the factors of 70 jumped from 2 straight to 5. Step on the rungs that were skipped. Were any of them factors?", ask: "Which skipped rung is a factor?",
        miss: "What did each skipped rung leave on the shelf?" },
    ],
  },
  {
    n: 3,
    concept: "Every exact division hands you two",
    conceptId: "M1.S1.T2.C6", objectiveIds: ["O2"],
    cards: "wait", lamp: false,
    says: ["One rung has just come out. Look at the number you stepped on, and at the number in each row."],
    ladder: ["How many are in each row, and is that a factor too?", "Multiply the rows by the number in each. Do you get the whole tray back?"],
    closing: "Every division that comes out exactly gives you the number you divided by and the answer. Both of them are factors.",
    learned: "You learned: one exact division puts two cards in the pen.",
    traceback: "The cards still waiting travel into the pen one at a time, the rest of the ladder is climbed, and the pen is counted card by card.",
    items: [
      /* learn ML3: answer in the plan = Two of them, 3 and 9 */
      { qid: "M1.S1.T2.C6:ML3", kind: "new", n: 27, offer: [3], done: [3], waitRung: 3, rowCard: true, answer: 2, near: 1, verdict: "2 new factors", tone: "blue", winMs: 2200,
        say: "27 divided by 3 is 9. How many factors of 27 has that one division handed you?", ask: "How many new factors?",
        miss: "The rung has given one card. What else came out of that division?" },
      /* practice 3: answer in the plan = 3 and 17 (both cards into the pen; Enter sends it) */
      { qid: "M1.S1.T2.C6:3", kind: "pair", n: 51, offer: [3], done: [3], waitRung: 3, answer: [3, 17], near: "3", pad: "enter", verdict: "both are factors", tone: "blue", winMs: 2200,
        say: "51 divided by 3 is 17. Drop the factors this one division gives into the pen, then press enter.", ask: "Both factors in the pen",
        miss: "Is the answer to the division a factor as well?" },
      /* practice 6: answer in the plan = 2 and 31, and 62 has four factors: 1, 2, 31 and 62 (the two cards wait on the board; the checked answer is the count) */
      { qid: "M1.S1.T2.C6:6", kind: "count", n: 62, top: 7, done: [1, 2], waitRung: 2, stop: 7, answer: 4, near: 3, verdict: "4 factors in all", tone: "ink", winMs: 2400,
        say: "62 divided by 2 is 31. How many factors has 62 altogether?", ask: "How many factors of 62?",
        miss: "Did both cards from rung 2 reach the pen?" },
    ],
  },
  {
    n: 4,
    concept: "Knowing when to stop dividing",
    conceptId: "M1.S1.T2.C7", objectiveIds: ["O1","O2"],
    cards: "auto", lamp: true,
    says: ["Keep going. Tell me the moment an answer is one you have already written."],
    ladder: ["Is that number already standing in the pen?", "Look at the pairs on the lit rungs. When does a pair turn round?"],
    closing: "Stop when the answers begin to repeat what is already in the pen. Do not stop just because the failures made you tired.",
    learned: "You learned: a list is finished once its answers start repeating.",
    traceback: "The ladder climbs on rung by rung until a card lands on its twin in the pen; the repeat light comes on and the pen is read as finished.",
    items: [
      /* learn ML4: answer in the plan = At 9, because its answer 5 is already in the pen, and the factors are 1, 3, 5, 9, 15 and 45 */
      { qid: "M1.S1.T2.C7:ML4", kind: "repeat", n: 45, top: 24, done: [1, 2, 3], answer: 9, near: 45, verdict: "repeat at 9", tone: "rose", winMs: 2600,
        say: "Climb on for 45. At which rung do the cards begin to repeat?", ask: "Rung where answers repeat?",
        miss: "Which answer has just come out of the division?" },
      /* practice 7: answer in the plan = 1, 2, 4, 19, 38 and 76, and they begin to repeat at 19, whose answer 4 is already on the list */
      { qid: "M1.S1.T2.C7:7", kind: "repeat", n: 76, top: 24, done: [1, 2, 3], answer: 19, near: 8, verdict: "repeat at 19", tone: "rose", winMs: 3600,
        say: "Now the tray holds 76. Which rung is the first to send a card that is already in the pen?", ask: "Rung where answers repeat?",
        miss: "Look at the pen. Which of those cards is also a rung you have not tried?" },
      /* practice 8: answer in the plan = Yes. 100 has nine factors, 1, 2, 4, 5, 10, 20, 25, 50 and 100, and the run stops at 10 because 10 tens make 100 (the checked answer is the count, which settles the claim) */
      { qid: "M1.S1.T2.C7:8", kind: "count", n: 100, top: 24, done: [1, 2, 3, 4], stop: 10, answer: 9, near: 10, verdict: "9 factors in all", tone: "ink", winMs: 2800,
        say: "A child says 100 has an odd number of factors. Climb on and count them. How many does 100 have?", ask: "How many factors of 100?",
        miss: "What happens at the rung where the rows and the number in each are the same?" },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  ladder: { rungsInView: LAD.K, numberedFrom: 1, record: "each tried rung keeps its leftover, 0 over lit blue" },
  tray: "the number as counters, tens tied into rods", pen: { maxCards: 12, order: "ascending", twins: "a repeat lands on its twin" },
  colours: { factor: DL_BLUE, tray: DL_AMBER, leftover: DL_VERM, repeat: DL_ROSE },
};

/* Hindi and Gujarati, keyed by the exact English (docs/PATTERNS.md §11). Digits stay digits; the runtime
   speaks them in the language. Terms: गुणनखंड / અવયવ, पंक्ति / હાર, भाजक भागफल / ભાજક ભાગફળ; the ladder's
   rung पायदान / પગથિયું, the tray थाली / થાળી, the shelf शेल्फ़ / છાજલી, the pen बाड़ा / વાડો. */
const TR: any = {
  hi: {
    "Divide Ladder": "भाग की सीढ़ी",
    "A tray of things to share, and a ladder of trials beside it.": "बाँटने के लिए चीज़ों की एक थाली, और उसके पास कोशिशों की एक सीढ़ी।",
    "Every rung tried in order, every failure still showing, and the pen full.": "हर पायदान क्रम से आज़माया, हर असफल कोशिश अब भी दिख रही है, और बाड़ा भरा है।",
    "Free play. Any number in the tray, with the pen, the shelf and the repeat light as you like.": "मुक्त खेल। थाली में कोई भी संख्या लो, साथ में बाड़ा, शेल्फ़ और दोहराव की बत्ती, जैसे चाहो।",
    /* phase 1 */
    "What makes a number a factor": "कोई संख्या गुणनखंड कब होती है",
    "Share them out. Which try left nothing over? That one is a factor.": "इन्हें बाँटो। किस कोशिश में कुछ नहीं बचा? वही गुणनखंड है।",
    "What does anything standing outside the rows say about this trial?": "पंक्तियों के बाहर जो खड़ा है, वह इस कोशिश के बारे में क्या बताता है?",
    "Count what sits on the shelf. A factor leaves the shelf empty.": "शेल्फ़ पर जो रखा है, उसे गिनो। गुणनखंड शेल्फ़ को खाली छोड़ता है।",
    "A factor divides the number and leaves nothing over. Anything standing outside the rows says it is not one.": "गुणनखंड से संख्या को भाग दो, तो कुछ नहीं बचता। पंक्तियों के बाहर कुछ खड़ा हो, तो वह गुणनखंड नहीं है।",
    "You learned: a factor is a trial with an empty shelf.": "तुमने सीखा: गुणनखंड वह कोशिश है जिसमें शेल्फ़ खाली रहे।",
    "Share 20 on each of the two rungs. Which of them is a factor of 20?": "दोनों पायदानों पर 20 को बाँटो। इनमें से कौन-सा 20 का गुणनखंड है?",
    "Which is a factor of 20?": "20 का गुणनखंड कौन-सा है?",
    "Which of the two rungs sent something to the shelf?": "दोनों में से किस पायदान ने शेल्फ़ पर कुछ भेजा?",
    "Is 8 a factor of 68? Step on the rung to find out.": "क्या 68 का गुणनखंड 8 है? पता करने के लिए पायदान पर कदम रखो।",
    "Is 8 a factor of 68?": "क्या 68 का गुणनखंड 8 है?",
    "After 8 rows, how many are sitting on the shelf?": "8 पंक्तियों के बाद शेल्फ़ पर कितने बैठे हैं?",
    "Now the tray holds 78. Is 6 a factor of 78?": "अब थाली में 78 हैं। क्या 78 का गुणनखंड 6 है?",
    "Is 6 a factor of 78?": "क्या 78 का गुणनखंड 6 है?",
    "Did every one of the 78 find a place in a row?": "क्या 78 में से हर एक को किसी पंक्ति में जगह मिली?",
    "yes": "हाँ", "no": "नहीं",
    "4 is a factor": "4 गुणनखंड है", "not a factor": "गुणनखंड नहीं", "6 is a factor": "6 गुणनखंड है",
    /* phase 2 */
    "Working up through the numbers in order": "संख्याओं में क्रम से ऊपर चढ़ना",
    "Start at the bottom and take every rung. Try to jump one and see what happens.": "नीचे से शुरू करो और हर पायदान पर चढ़ो। एक पायदान छोड़कर चढ़ने की कोशिश करो, और देखो क्या होता है।",
    "Can a number you never tried be ruled out?": "जिस संख्या को तुमने आज़माया ही नहीं, क्या उसे छोड़ सकते हैं?",
    "Go back to the lowest blank rung before any other.": "किसी और पायदान से पहले सबसे नीचे के खाली पायदान पर लौटो।",
    "Work up from one and try every whole number in turn. Write down the trials that fail, as well as the ones that come out.": "एक से ऊपर चलो और हर संख्या बारी-बारी से आज़माओ। जो कोशिशें असफल हों, उन्हें भी लिखो, और जो सफल हों, उन्हें भी।",
    "You learned: climb every rung in order, and keep the failures.": "तुमने सीखा: हर पायदान क्रम से चढ़ो, और असफल कोशिशें भी रखो।",
    "Find the factors of 40, one rung at a time from the foot. Which is the first rung that fails?": "नीचे से एक-एक पायदान चढ़कर 40 के गुणनखंड ढूँढो। पहला असफल पायदान कौन-सा है?",
    "First rung that fails?": "पहला असफल पायदान?",
    "Look for the lowest rung that sent something to the shelf.": "वह सबसे नीचे का पायदान ढूँढो जिसने शेल्फ़ पर कुछ भेजा।",
    "Now find every factor of 92 by dividing in turn. Press enter when every rung is done.": "अब बारी-बारी से भाग देकर 92 के सारे गुणनखंड ढूँढो। हर पायदान पूरा हो जाए, तब एंटर दबाओ।",
    "Every factor of 92": "92 के सारे गुणनखंड",
    "Is any rung on the ladder still blank?": "क्या सीढ़ी का कोई पायदान अभी भी खाली है?",
    "A child finding the factors of 70 jumped from 2 straight to 5. Step on the rungs that were skipped. Were any of them factors?": "70 के गुणनखंड ढूँढते हुए एक बच्चा 2 से सीधे 5 पर कूद गया। छूटे हुए पायदानों पर चढ़ो। क्या उनमें कोई गुणनखंड था?",
    "Which skipped rung is a factor?": "कौन-सा छूटा पायदान गुणनखंड है?",
    "What did each skipped rung leave on the shelf?": "हर छूटे पायदान ने शेल्फ़ पर क्या छोड़ा?",
    "3 only": "सिर्फ़ 3", "4 only": "सिर्फ़ 4", "both": "दोनों", "neither": "कोई नहीं",
    "3 fails first": "3 सबसे पहले असफल", "every factor of 92": "92 के सारे गुणनखंड", "neither is a factor": "इनमें से कोई गुणनखंड नहीं",
    /* phase 3 */
    "Every exact division hands you two": "बिना शेष के भाग देने पर तुम्हें दो मिलते हैं",
    "One rung has just come out. Look at the number you stepped on, and at the number in each row.": "अभी एक पायदान पर कुछ नहीं बचा। जिस संख्या पर तुम चढ़े, उसे देखो। और हर पंक्ति में जो संख्या है, उसे भी देखो।",
    "How many are in each row, and is that a factor too?": "हर पंक्ति में कितने हैं? क्या वह भी गुणनखंड है?",
    "Multiply the rows by the number in each. Do you get the whole tray back?": "पंक्तियों की संख्या को हर पंक्ति वाली संख्या से गुणा करो। क्या पूरी थाली वापस मिलती है?",
    "Every division that comes out exactly gives you the number you divided by and the answer. Both of them are factors.": "बिना शेष के भाग देने पर तुम्हें भाजक और भागफल मिलते हैं। ये दोनों गुणनखंड हैं।",
    "You learned: one exact division puts two cards in the pen.": "तुमने सीखा: बिना शेष के भाग देने पर बाड़े में दो कार्ड जाते हैं।",
    "27 divided by 3 is 9. How many factors of 27 has that one division handed you?": "27 को 3 से भाग देने पर 9 आता है। उस एक बार भाग देने से तुम्हें 27 के कितने गुणनखंड मिले?",
    "How many new factors?": "कितने नए गुणनखंड?",
    "The rung has given one card. What else came out of that division?": "पायदान ने एक कार्ड दिया है। उस भाग से और क्या निकला?",
    "51 divided by 3 is 17. Drop the factors this one division gives into the pen, then press enter.": "51 को 3 से भाग देने पर 17 आता है। इस एक बार भाग देने से मिले गुणनखंड बाड़े में डालो, फिर एंटर दबाओ।",
    "Both factors in the pen": "दोनों गुणनखंड बाड़े में",
    "Is the answer to the division a factor as well?": "क्या भाग का उत्तर भी गुणनखंड है?",
    "62 divided by 2 is 31. How many factors has 62 altogether?": "62 को 2 से भाग देने पर 31 आता है। 62 के कुल कितने गुणनखंड हैं?",
    "How many factors of 62?": "62 के कितने गुणनखंड?",
    "Did both cards from rung 2 reach the pen?": "क्या पायदान 2 के दोनों कार्ड बाड़े में पहुँचे?",
    "2 new factors": "2 नए गुणनखंड", "both are factors": "दोनों गुणनखंड हैं", "4 factors in all": "कुल 4 गुणनखंड",
    /* phase 4 */
    "Knowing when to stop dividing": "भाग देना कब रोकना है, यह जानना",
    "Keep going. Tell me the moment an answer is one you have already written.": "आगे बढ़ते रहो। जैसे ही कोई उत्तर ऐसा आए जो तुम पहले लिख चुके हो, मुझे बताना।",
    "Is that number already standing in the pen?": "क्या वह संख्या पहले से बाड़े में खड़ी है?",
    "Look at the pairs on the lit rungs. When does a pair turn round?": "चमकते पायदानों के जोड़े देखो। कोई जोड़ा उलटा कब हो जाता है?",
    "Stop when the answers begin to repeat what is already in the pen. Do not stop just because the failures made you tired.": "जब उत्तर वही दोहराने लगें जो बाड़े में पहले से है, तब रुक जाओ। असफल कोशिशों से थककर मत रुको।",
    "You learned: a list is finished once its answers start repeating.": "तुमने सीखा: उत्तर दोहराने लगें, तो सूची पूरी हो जाती है।",
    "Climb on for 45. At which rung do the cards begin to repeat?": "45 के लिए ऊपर चढ़ो। किस पायदान पर कार्ड दोहराने लगते हैं?",
    "Rung where answers repeat?": "किस पायदान पर उत्तर दोहराते हैं?",
    "Which answer has just come out of the division?": "भाग से अभी कौन-सा उत्तर निकला है?",
    "Now the tray holds 76. Which rung is the first to send a card that is already in the pen?": "अब थाली में 76 हैं। कौन-सा पायदान सबसे पहले ऐसा कार्ड भेजता है जो पहले से बाड़े में है?",
    "Look at the pen. Which of those cards is also a rung you have not tried?": "बाड़े को देखो। उनमें से कौन-सा कार्ड ऐसा पायदान भी है जिसे तुमने अभी नहीं आज़माया?",
    "A child says 100 has an odd number of factors. Climb on and count them. How many does 100 have?": "एक बच्चा कहता है कि 100 के गुणनखंडों की गिनती विषम है। चढ़ते जाओ और उन्हें गिनो। 100 के कितने गुणनखंड हैं?",
    "How many factors of 100?": "100 के कितने गुणनखंड?",
    "What happens at the rung where the rows and the number in each are the same?": "जिस पायदान पर पंक्तियों की और हर पंक्ति की संख्या बराबर हो, वहाँ क्या होता है?",
    "repeat at 9": "9 पर दोहराव", "repeat at 19": "19 पर दोहराव", "9 factors in all": "कुल 9 गुणनखंड",
    /* the working area's own words, and the summary drawing's */
    "tried": "आज़माए", "repeat": "फिर", "over": "बचे", "try": "पहले", "rows": "पंक्तियाँ", "in each": "हर पंक्ति में",
    "factor pen": "गुणनखंड बाड़ा", "cards": "कार्ड", "factors": "गुणनखंड", "rung": "पायदान", "new": "नए",
  },
  gu: {
    "Divide Ladder": "ભાગાકારની સીડી",
    "A tray of things to share, and a ladder of trials beside it.": "વહેંચવા માટે વસ્તુઓની એક થાળી, અને તેની પાસે પ્રયત્નોની એક સીડી.",
    "Every rung tried in order, every failure still showing, and the pen full.": "દરેક પગથિયું ક્રમથી અજમાવ્યું. દરેક નિષ્ફળ પ્રયત્ન હજી દેખાય છે, અને વાડો ભરેલો છે.",
    "Free play. Any number in the tray, with the pen, the shelf and the repeat light as you like.": "મુક્ત રમત. થાળીમાં કોઈ પણ સંખ્યા લો, સાથે વાડો, છાજલી અને ફરી આવ્યાની બત્તી, જેમ ગમે તેમ.",
    /* phase 1 */
    "What makes a number a factor": "કોઈ સંખ્યા અવયવ ક્યારે બને છે",
    "Share them out. Which try left nothing over? That one is a factor.": "આને વહેંચો. કયા પ્રયત્નમાં કંઈ વધ્યું નહીં? એ જ અવયવ છે.",
    "What does anything standing outside the rows say about this trial?": "હારની બહાર જે ઊભું છે, તે આ પ્રયત્ન વિશે શું કહે છે?",
    "Count what sits on the shelf. A factor leaves the shelf empty.": "છાજલી પર જે છે તે ગણો. અવયવ છાજલીને ખાલી રાખે છે.",
    "A factor divides the number and leaves nothing over. Anything standing outside the rows says it is not one.": "અવયવ વડે સંખ્યાને ભાગતાં કંઈ વધતું નથી. હારની બહાર કંઈ ઊભું હોય, તો તે અવયવ નથી.",
    "You learned: a factor is a trial with an empty shelf.": "તમે શીખ્યા: અવયવ એ એવો પ્રયત્ન છે જેમાં છાજલી ખાલી રહે.",
    "Share 20 on each of the two rungs. Which of them is a factor of 20?": "બંને પગથિયાં પર 20 ને વહેંચો. આમાંથી કયો 20 નો અવયવ છે?",
    "Which is a factor of 20?": "20 નો અવયવ કયો છે?",
    "Which of the two rungs sent something to the shelf?": "બેમાંથી કયા પગથિયાએ છાજલી પર કંઈ મોકલ્યું?",
    "Is 8 a factor of 68? Step on the rung to find out.": "શું 8 એ 68 નો અવયવ છે? જાણવા માટે પગથિયા પર પગ મૂકો.",
    "Is 8 a factor of 68?": "શું 8 એ 68 નો અવયવ છે?",
    "After 8 rows, how many are sitting on the shelf?": "8 હાર પછી છાજલી પર કેટલા બેઠા છે?",
    "Now the tray holds 78. Is 6 a factor of 78?": "હવે થાળીમાં 78 છે. શું 6 એ 78 નો અવયવ છે?",
    "Is 6 a factor of 78?": "શું 6 એ 78 નો અવયવ છે?",
    "Did every one of the 78 find a place in a row?": "શું 78 માંથી દરેકને કોઈ હારમાં જગ્યા મળી?",
    "yes": "હા", "no": "ના",
    "4 is a factor": "4 અવયવ છે", "not a factor": "અવયવ નથી", "6 is a factor": "6 અવયવ છે",
    /* phase 2 */
    "Working up through the numbers in order": "સંખ્યાઓમાં ક્રમથી ઉપર ચડવું",
    "Start at the bottom and take every rung. Try to jump one and see what happens.": "નીચેથી શરૂ કરો અને દરેક પગથિયે ચડો. એક પગથિયું છોડીને ચડવાનો પ્રયત્ન કરો, અને જુઓ શું થાય છે.",
    "Can a number you never tried be ruled out?": "જે સંખ્યા તમે અજમાવી જ નથી, શું તેને છોડી શકાય?",
    "Go back to the lowest blank rung before any other.": "બીજા કોઈ પગથિયા પહેલાં સૌથી નીચેના ખાલી પગથિયે પાછા જાઓ.",
    "Work up from one and try every whole number in turn. Write down the trials that fail, as well as the ones that come out.": "એકથી ઉપર જાઓ અને દરેક સંખ્યા વારાફરતી અજમાવો. નિષ્ફળ પ્રયત્નો પણ લખો, અને સફળ પ્રયત્નો પણ.",
    "You learned: climb every rung in order, and keep the failures.": "તમે શીખ્યા: દરેક પગથિયું ક્રમથી ચડો, અને નિષ્ફળ પ્રયત્નો પણ રાખો.",
    "Find the factors of 40, one rung at a time from the foot. Which is the first rung that fails?": "નીચેથી એક એક પગથિયું ચડીને 40 ના અવયવ શોધો. પહેલું નિષ્ફળ પગથિયું કયું છે?",
    "First rung that fails?": "પહેલું નિષ્ફળ પગથિયું?",
    "Look for the lowest rung that sent something to the shelf.": "એ સૌથી નીચેનું પગથિયું શોધો જેણે છાજલી પર કંઈ મોકલ્યું.",
    "Now find every factor of 92 by dividing in turn. Press enter when every rung is done.": "હવે વારાફરતી ભાગાકાર કરીને 92 ના બધા અવયવ શોધો. દરેક પગથિયું પૂરું થાય ત્યારે એન્ટર દબાવો.",
    "Every factor of 92": "92 ના બધા અવયવ",
    "Is any rung on the ladder still blank?": "શું સીડીનું કોઈ પગથિયું હજી ખાલી છે?",
    "A child finding the factors of 70 jumped from 2 straight to 5. Step on the rungs that were skipped. Were any of them factors?": "70 ના અવયવ શોધતાં એક બાળક 2 થી સીધું 5 પર કૂદી ગયું. છૂટેલાં પગથિયાં પર ચડો. શું તેમાંથી કોઈ અવયવ હતો?",
    "Which skipped rung is a factor?": "કયું છૂટેલું પગથિયું અવયવ છે?",
    "What did each skipped rung leave on the shelf?": "દરેક છૂટેલા પગથિયાએ છાજલી પર શું છોડ્યું?",
    "3 only": "ફક્ત 3", "4 only": "ફક્ત 4", "both": "બંને", "neither": "કોઈ નહીં",
    "3 fails first": "3 સૌથી પહેલાં નિષ્ફળ", "every factor of 92": "92 ના બધા અવયવ", "neither is a factor": "બેમાંથી એક પણ અવયવ નથી",
    /* phase 3 */
    "Every exact division hands you two": "શેષ વગરનો દરેક ભાગાકાર તમને બે આપે છે",
    "One rung has just come out. Look at the number you stepped on, and at the number in each row.": "હમણાં એક પગથિયા પર કંઈ વધ્યું નહીં. જે સંખ્યા પર તમે ચડ્યા, તે જુઓ. અને દરેક હારમાં જે સંખ્યા છે, તે પણ જુઓ.",
    "How many are in each row, and is that a factor too?": "દરેક હારમાં કેટલા છે? શું તે પણ અવયવ છે?",
    "Multiply the rows by the number in each. Do you get the whole tray back?": "હારની સંખ્યાને દરેક હારમાં રહેલી સંખ્યા વડે ગુણો. શું આખી થાળી પાછી મળે છે?",
    "Every division that comes out exactly gives you the number you divided by and the answer. Both of them are factors.": "શેષ વગરના દરેક ભાગાકારથી તમને ભાજક અને ભાગફળ મળે છે. એ બંને અવયવ છે.",
    "You learned: one exact division puts two cards in the pen.": "તમે શીખ્યા: શેષ વગરનો એક ભાગાકાર વાડામાં બે કાર્ડ મૂકે છે.",
    "27 divided by 3 is 9. How many factors of 27 has that one division handed you?": "27 ને 3 વડે ભાગતાં 9 આવે છે. એ એક ભાગાકારથી તમને 27 ના કેટલા અવયવ મળ્યા?",
    "How many new factors?": "કેટલા નવા અવયવ?",
    "The rung has given one card. What else came out of that division?": "પગથિયાએ એક કાર્ડ આપ્યું છે. એ ભાગાકારમાંથી બીજું શું નીકળ્યું?",
    "51 divided by 3 is 17. Drop the factors this one division gives into the pen, then press enter.": "51 ને 3 વડે ભાગતાં 17 આવે છે. આ એક ભાગાકારથી મળેલા અવયવ વાડામાં મૂકો, પછી એન્ટર દબાવો.",
    "Both factors in the pen": "બંને અવયવ વાડામાં",
    "Is the answer to the division a factor as well?": "શું ભાગાકારનો જવાબ પણ અવયવ છે?",
    "62 divided by 2 is 31. How many factors has 62 altogether?": "62 ને 2 વડે ભાગતાં 31 આવે છે. 62 ના કુલ કેટલા અવયવ છે?",
    "How many factors of 62?": "62 ના કેટલા અવયવ?",
    "Did both cards from rung 2 reach the pen?": "શું પગથિયા 2 નાં બંને કાર્ડ વાડામાં પહોંચ્યાં?",
    "2 new factors": "2 નવા અવયવ", "both are factors": "બંને અવયવ છે", "4 factors in all": "કુલ 4 અવયવ",
    /* phase 4 */
    "Knowing when to stop dividing": "ભાગાકાર ક્યારે અટકાવવો, તે જાણવું",
    "Keep going. Tell me the moment an answer is one you have already written.": "આગળ વધતા રહો. પહેલાં લખેલો કોઈ જવાબ ફરી આવે, એટલે તરત મને કહેજો.",
    "Is that number already standing in the pen?": "શું એ સંખ્યા પહેલેથી વાડામાં ઊભી છે?",
    "Look at the pairs on the lit rungs. When does a pair turn round?": "ચમકતાં પગથિયાંની જોડ જુઓ. કોઈ જોડ ક્યારે ઊલટી થઈ જાય છે?",
    "Stop when the answers begin to repeat what is already in the pen. Do not stop just because the failures made you tired.": "જવાબો વાડામાં પહેલેથી છે તે જ ફરી આવવા લાગે, ત્યારે અટકો. નિષ્ફળ પ્રયત્નોથી થાકીને ન અટકો.",
    "You learned: a list is finished once its answers start repeating.": "તમે શીખ્યા: જવાબો ફરી આવવા લાગે, એટલે યાદી પૂરી થાય છે.",
    "Climb on for 45. At which rung do the cards begin to repeat?": "45 માટે ઉપર ચડો. કયા પગથિયે કાર્ડ ફરી આવવા લાગે છે?",
    "Rung where answers repeat?": "કયા પગથિયે જવાબ ફરી આવે?",
    "Which answer has just come out of the division?": "ભાગાકારમાંથી હમણાં કયો જવાબ નીકળ્યો છે?",
    "Now the tray holds 76. Which rung is the first to send a card that is already in the pen?": "હવે થાળીમાં 76 છે. કયું પગથિયું સૌથી પહેલાં એવું કાર્ડ મોકલે છે જે પહેલેથી વાડામાં છે?",
    "Look at the pen. Which of those cards is also a rung you have not tried?": "વાડો જુઓ. એમાંથી કયું કાર્ડ એવું પગથિયું પણ છે જે તમે હજી અજમાવ્યું નથી?",
    "A child says 100 has an odd number of factors. Climb on and count them. How many does 100 have?": "એક બાળક કહે છે કે 100 ના અવયવોની સંખ્યા એકી છે. ચડતા જાઓ અને તેમને ગણો. 100 ના કેટલા અવયવ છે?",
    "How many factors of 100?": "100 ના કેટલા અવયવ?",
    "What happens at the rung where the rows and the number in each are the same?": "જે પગથિયે હારની અને દરેક હારની સંખ્યા સરખી હોય, ત્યાં શું થાય છે?",
    "repeat at 9": "9 પર ફરી આવ્યું", "repeat at 19": "19 પર ફરી આવ્યું", "9 factors in all": "કુલ 9 અવયવ",
    /* the working area's own words, and the summary drawing's */
    "tried": "પ્રયત્ન", "repeat": "ફરી", "over": "વધ્યા", "try": "અજમાવો", "rows": "હાર", "in each": "દરેક હારમાં",
    "factor pen": "અવયવ વાડો", "cards": "કાર્ડ", "factors": "અવયવ", "rung": "પગથિયું", "new": "નવા",
  },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a list is judged in any order; numbers compare as numbers; words as words */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (Array.isArray(item.answer)) {
    const got = Array.from(new Set(dlNums(v))).sort((a, b) => a - b), want = item.answer.slice().sort((a: number, b: number) => a - b);
    return got.length === want.length && got.every((x, i) => x === want[i]);
  }
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by multiplying (k × d = n), sharing no code with judge or the sharing picture */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const n = it.n;
  const partner = (d: number) => { for (let k = 1; k * d <= n; k++) if (k * d === n) return k; return 0; };
  const all: number[] = [];
  for (let d = 1; d <= n; d++) if (partner(d)) all.push(d);
  const same = (a: number[], b: number[]) => a.length === b.length && a.slice().sort((x, y) => x - y).every((x, i) => x === b.slice().sort((x2, y2) => x2 - y2)[i]);
  if (it.kind === "pick") return it.offer.filter((d: number) => partner(d)).length === 1 && it.offer.includes(it.answer) && partner(it.answer) > 0;
  if (it.kind === "judge") return (partner(it.offer[0]) ? "yes" : "no") === it.answer;
  if (it.kind === "first") { let d = 1; while (partner(d)) d++; return d === it.answer; }
  if (it.kind === "list") return same(it.answer, all);
  if (it.kind === "skip") {
    const skipped: number[] = [];
    for (let d = 1; d <= it.top; d++) if (!it.done.includes(d)) skipped.push(d);
    const f = skipped.filter((d) => partner(d));
    return it.answer === (f.length === 0 ? "neither" : f.length === skipped.length ? "both" : f[0] + " only");
  }
  if (it.kind === "new") { const d = it.offer[0], k = partner(d); return k > 0 && it.answer === (k === d ? 1 : 2); }
  if (it.kind === "pair") { const d = it.offer[0], k = partner(d); return k > 0 && same(it.answer, [d, k]); }
  if (it.kind === "count") return it.answer === all.length;
  if (it.kind === "repeat") { let d = 1; while (d <= n && !(partner(d) && partner(d) <= d)) d++; return d === it.answer; }
  return false;
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print. A pair's numbers ARE its
   question ("51 divided by 3 is 17"); a list keeps its inner members out of the lines */
const answerForms = (item: any) => {
  if (item.kind === "pair") return [];
  if (Array.isArray(item.answer)) return item.answer.filter((x: number) => x !== 1 && x !== item.n && x >= 10).flatMap((x: number) => [String(x), words(x)]);
  if (typeof item.answer === "number") return [String(item.answer), indian(item.answer), words(item.answer)];
  return [String(item.answer)];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => (Array.isArray(item.answer) ? item.answer.join(",") : item.answer);

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (T.state().stage === "demo") return HOOK.demo && HOOK.demo();
  if (item.pad === "enter") { if (HOOK.set) HOOK.set(agentKey(item)); setTimeout(() => HOOK.enter && HOOK.enter(), 40); return; }
  return T.submit(item.answer);
};
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: nothing waits to drop here, so Enter */
const check = () => undefined;

/* ── the working area's pieces ─────────────────────────────────────────────────────────── */

const DL_CSS = `
.dl-move{transition:transform 500ms cubic-bezier(.3,.7,.25,1)}
.dl-slide{transition:transform 320ms ease}
.dl-tap{cursor:pointer}
.dl-grab{cursor:grab}
@media (prefers-reduced-motion:reduce){.dl-move,.dl-slide{transition:none}}
`;

/* the state an item opens on: its tray, the rungs already tried, the pen they filled, the cards that wait */
const dlInit = (ph: any, it: any) => {
  const n = it.n || 36, offer = it.offer || null;
  const top = offer ? null : Math.min(it.top || 24, n);
  const cards = ph.cards || "none", done = it.done || [];
  const tried: any = {};
  done.forEach((k: number) => { tried[k] = dlShare(n, k); });
  let pen: any[] = [];
  if (cards !== "none") done.forEach((k: number) => { if (tried[k].r === 0 && k !== it.waitRung) { pen = dlAdd(pen, k, false); pen = dlAdd(pen, tried[k].q, false); } });
  /* rowCard: only the rung's own card waits; the number in each row is pulled off the end of a row */
  const waiting = it.waitRung ? (it.rowCard ? [{ v: it.waitRung, role: 0 }] : [{ v: it.waitRung, role: 0 }, { v: n / it.waitRung, role: 1 }]) : [];
  const shown = it.show !== undefined ? it.show : done.length ? done[done.length - 1] : null;
  const sh = shown ? dlShare(n, shown) : null;
  return { n, offer, top, mode: offer ? "offer" : "run", cards, lamp: !!ph.lamp, tried, pen, waiting, rowLift: !!it.rowCard, ghost: [], gtried: {}, shown, dealt: sh ? sh.q : 0, shelf: !!sh,
    fly: [], refused: null, verdict: null, tone: "ink", repeatOn: false, hlRow: null, hlShelf: false, hlCards: [], touched: false, draft: null };
};
/* the lowest rung not tried yet (on an offered ladder, the lowest offered one) */
const dlNext = (st: any) => {
  if (st.mode === "offer") { const ks = st.offer.slice().sort((a: number, b: number) => a - b); const k = ks.find((x: number) => !st.tried[x]); return k === undefined ? null : k; }
  for (let k = 1; k <= st.top; k++) if (!st.tried[k]) return k;
  return null;
};
/* where each rung stands: a tall ladder shows ten rungs and follows the climb */
const dlGeo = (st: any) => {
  if (st.mode === "offer") {
    const ks = st.offer.slice().sort((a: number, b: number) => a - b);
    const y = (k: number) => LAD.foot - 80 - ks.indexOf(k) * 150;
    return { ks, y, railTop: y(ks[ks.length - 1]) - 80, pitch: 150, more: false };
  }
  const cnt = Math.min(st.top, LAD.K), pitch = Math.min(64, (LAD.foot - 34) / cnt);
  const f = st.refused || dlNext(st) || st.top;
  const ws = Math.max(1, Math.min(f - (LAD.K - 2), st.top - cnt + 1));
  const ks = dlRange(ws, ws + cnt - 1);
  const y = (k: number) => LAD.foot - 38 - (k - ws) * pitch;
  const more = ws + cnt - 1 < st.top;
  return { ks, y, railTop: more ? 0 : y(ws + cnt - 1) - 44, pitch, more };
};
const dlRungAt = (st: any, py: number) => {
  const g = dlGeo(st);
  let best: number | null = null, bd = 1e9;
  g.ks.forEach((k: number) => { const dd = Math.abs(g.y(k) - py); if (dd < bd) { bd = dd; best = k; } });
  return bd <= Math.max(g.pitch / 2, 30) + 4 ? best : null;
};
/* the board's rows for rung d: more than ten short rows stand in two or three blocks side by side,
   so every row stays countable; row pitch, counter size, and where row k sits */
const dlRows = (st: any, d: number) => {
  const x1 = st.cards === "wait" ? 944 : BRD.x1, gap = 16;
  const cols = d > 10 ? Math.ceil(d / 10) : 1, per = Math.ceil(d / cols);
  const rp = Math.min(52, (BRD.rows1 - BRD.rows0) / per), colW = (x1 - BRD.x - gap * (cols - 1)) / cols;
  const { q } = dlShare(st.n, d);
  const cell = Math.min(34, (colW - 28) / Math.max(dlUnits(q), 1), rp * 0.8);
  const x = (k: number) => BRD.x + Math.floor(k / per) * (colW + gap);
  return { x1, rp, cell, q, colW, x, top: (k: number) => BRD.rows0 + (k % per) * rp, y: (k: number) => BRD.rows0 + (k % per) * rp + rp / 2 };
};
/* the pen, read left to right: the child's own cards and, after a miss on an answer made in the pen,
   the correction's ghost cards, which are drawn only and clear the moment the child acts */
const dlOrder = (pen: any[], ghost: number[]) => {
  const vals = pen.map((c: any) => c.v);
  return [...vals, ...(ghost || []).filter((v: number) => !vals.includes(v))].sort((a: number, b: number) => a - b);
};
const dlSlot = (pen: any[], ghost: number[], v: number, twin: boolean) => {
  const i = Math.max(0, dlOrder(pen, ghost).indexOf(v));
  return { x: PEN.cx + i * PEN.pitch + (twin ? 5 : 0), y: PEN.y + 10 - (twin ? 5 : 0) };
};

/* counters: whole tens tied into a rod of ten cells, the rest loose */
function DlCounters({ c, x, y, cell, paint, base }: any) {
  const t = Math.floor(c / 10), o = c % 10, out: any[] = [], edge = shade(base, 0.25);
  let cx = x;
  const h = Math.max(cell * 0.8, 4);
  for (let i = 0; i < t; i++) {
    const x0 = cx;
    out.push(
      <g key={"t" + i}>
        <rect x={x0} y={y - h / 2} width={cell * 10} height={h} rx={Math.min(h / 2, 6)} fill={`url(#${paint})`} stroke={edge} strokeWidth={1.2} />
        {cell >= 5 && dlRange(1, 9).map((j) => <line key={j} x1={x0 + cell * j} y1={y - h / 2 + 1.5} x2={x0 + cell * j} y2={y + h / 2 - 1.5} stroke={tint(base, 0.5)} strokeWidth={1} />)}
      </g>,
    );
    cx += cell * 10.5;
  }
  for (let i = 0; i < o; i++) { out.push(<circle key={"o" + i} cx={cx + cell / 2} cy={y} r={cell * 0.42} fill={`url(#${paint})`} stroke={edge} strokeWidth={1.2} />); cx += cell; }
  return <g>{out}</g>;
}

/* a factor card: white face, blue edge, the number in deep blue (null = a card under its twin, no label) */
function DlCard({ x, y, v, w = PEN.cw, h = PEN.ch, edge, ring, ghost }: any) {
  return (
    <g data-role={ghost ? "ghost-card" : undefined}>
      {ring && <rect x={x - 6} y={y - 6} width={w + 12} height={h + 12} rx={14} fill="none" stroke={ring} strokeWidth={4} />}
      <rect x={x} y={y} width={w} height={h} rx={10} fill="#FFFFFF" stroke={edge || DL_BLUE} strokeWidth={3}
        strokeDasharray={ghost ? "8 6" : undefined} filter={ghost ? undefined : "url(#fShadowSoft)"} />
      {v !== null && v !== undefined && (
        <text x={x + w / 2} y={y + h / 2 + 11} textAnchor="middle" fontSize={String(v).length >= 3 ? T.micro : T.label} fontWeight={700} fill={DL_INK.blue}>{v}</text>
      )}
    </g>
  );
}

/* ── the working area: 1086 x 528, origin at its top-left ──────────────────────────────── */
function Work({ phase, item, index, stage, wrong, typed, api, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const busy = tl.busy;
  const free = stage === "free";
  const key = phase.n + ":" + index;
  const [S, setS] = useState<any>(() => dlInit(phase, item));
  const SR = useRef<any>(S);
  const put = (p: any) => {
    SR.current = { ...SR.current, ...p };
    if ("pen" in p) sent.current = null;    /* a card has moved: Enter may send the pen again */
    setS(SR.current);
  };
  const setupFor = useRef(key);
  const seq = useRef(0);
  const sent = useRef<string | null>(null);   /* the pen as it was last sent, so a miss is not re-sent unchanged */
  const acted = useRef(true);                /* has the child moved a card since the miss? Enter waits for that */

  /* a new question (or a jump to another phase) opens on its own tray, ladder and pen */
  useEffect(() => {
    if (free) return;
    if ((stage === "teach" || stage === "ask" || stage === "demo") && setupFor.current !== key) {
      setupFor.current = key; tl.stop(); sent.current = null; acted.current = true; put(dlInit(phase, item)); api.lock(false);
    }
  }, [stage, key]);

  /* free play (the plan's freePlay): any number from 2 to 100 in the tray, the whole ladder, the pen and the repeat light */
  useEffect(() => {
    if (!free) return;
    setupFor.current = "free"; tl.stop();
    put(dlInit({ cards: "auto", lamp: true }, { n: 36, top: 24 }));
  }, [free]);

  /* ── the motions, as timeline steps ── */
  const pace = (ms: number, p: number) => Math.max(20, Math.round(ms * p));
  const plateOf = (k: number) => { const g = dlGeo(SR.current); return { x: LAD.plate - PEN.cw / 2, y: g.y(k) - PEN.ch / 2 }; };
  const rowEndOf = (k: number) => {
    const R = dlRows(SR.current, k);
    return { x: Math.min(BRD.x + 14 + dlUnits(R.q) * R.cell + 6, BRD.x + R.colW - PEN.cw - 6), y: R.y(0) - PEN.ch / 2 };
  };
  /* the tray dealt onto rung k, one round at a time; what will not fit goes to the shelf */
  const dealSteps = (k: number, p: number, record: boolean, ghostly?: boolean) => {
    const n = SR.current.n, sh = dlShare(n, k);
    const out: any[] = [[pace(90, p), () => put({ shown: k, dealt: 0, shelf: false, refused: null, hlShelf: false, hlRow: null })]];
    dlFrames(sh.q).forEach((f) => out.push([pace(120, p), () => put({ dealt: f })]));
    out.push([pace(320, p), () => {
      put({ shelf: true, ...(record ? (ghostly ? { gtried: { ...SR.current.gtried, [k]: sh } } : { tried: { ...SR.current.tried, [k]: sh } }) : {}) });
      if (sh.r > 0) api.sfx.tick();
    }]);
    return out;
  };
  /* cards flying into the pen; a card whose number is already there lands on its twin */
  const flySteps = (list: any[], p: number, light: boolean, ghostly?: boolean) => {
    let ids: number[] = [], twins: boolean[] = [];
    return [
      [30, () => {
        let pen = SR.current.pen;
        const out = list.map((c: any) => {
          const had = pen.some((e: any) => e.v === c.v);
          if (!ghostly) pen = dlAdd(pen, c.v, true);
          return { v: c.v, twin: !ghostly && had, ...c.from() };
        });
        ids = out.map(() => ++seq.current);
        twins = out.map((o: any) => o.twin);
        put({ ...(ghostly ? {} : { pen }), fly: [...SR.current.fly, ...out.map((o: any, i: number) => ({ id: ids[i], v: o.v, x: o.x, y: o.y, ghost: !!ghostly }))] });
      }],
      [pace(540, p), () => {
        const st = SR.current, ahead = ghostly ? [...st.ghost, ...list.map((c: any) => c.v)] : st.ghost;
        put({ fly: st.fly.map((f: any) => { const j = ids.indexOf(f.id); return j < 0 ? f : { ...f, ...dlSlot(st.pen, ahead, f.v, twins[j]) }; }) });
      }],
      [pace(120, p), () => {
        const vs = list.map((c: any) => c.v), st = SR.current;
        put({ fly: st.fly.filter((f: any) => !ids.includes(f.id)),
          ...(ghostly ? { ghost: [...st.ghost, ...vs.filter((v: number) => !st.ghost.includes(v))] }
            : { pen: st.pen.map((c: any) => (vs.includes(c.v) ? { ...c, hid: false, hidTw: 0 } : c)) }),
          repeatOn: st.repeatOn || (light && twins.some(Boolean)) });
        api.sfx.tick();
      }],
    ];
  };
  /* what an exact rung does with its two numbers: send them to the pen, or leave them waiting */
  const cardSteps = (k: number, p: number, light: boolean, ghostly?: boolean) => {
    const st = SR.current, sh = dlShare(st.n, k);
    if (sh.r !== 0 || st.cards === "none") return [];
    if (st.cards === "wait") return ghostly ? [] : [[pace(200, p), () => put({ waiting: [{ v: k, role: 0 }, { v: sh.q, role: 1 }] })]];
    return flySteps([{ v: k, from: () => plateOf(k) }, { v: sh.q, from: () => rowEndOf(k) }], p, light, ghostly);
  };
  /* the child steps on rung k: a tried rung is shown again; a rung above a blank one is refused */
  const climb = (k: number) => {
    const st = SR.current;
    if (st.draft !== null) { api.capture(null); put({ draft: null }); }
    const nx = dlNext(st);
    acted.current = true;
    put({ touched: true, ghost: [], gtried: {} });
    if (st.tried[k]) { if (st.shown !== k) tl.run(dealSteps(k, 0.5, false)); return; }
    if (st.mode === "offer" && !st.offer.includes(k)) return;
    if (st.mode === "run" && nx !== null && k > nx) { put({ refused: nx }); return; }
    if (!free) api.lock(true);
    tl.run([...dealSteps(k, 1, true), ...cardSteps(k, 1, free)], () => { if (!free) api.lock(false); });
  };
  const dropWaiting = (role: number, at: any) => {
    const w = SR.current.waiting.find((x: any) => x.role === role);
    if (!w) return;
    const from = at ? { x: at.x - WAITC.w / 2, y: at.y - WAITC.h / 2 } : { x: WAITC.x, y: WAITC.y[role] };
    acted.current = true;
    put({ waiting: SR.current.waiting.filter((x: any) => x.role !== role), touched: true, ghost: [], gtried: {} });
    api.lock(true);
    tl.run(flySteps([{ v: w.v, from: () => from }], 0.8, false), () => api.lock(false));
  };

  /* the controls stay controls while a motion runs (so the keyboard keeps its place); they act only when still */
  /* the number in each row, pulled off the end of a row and dropped into the pen */
  const dropRow = (at: any) => {
    const st = SR.current;
    if (!st.rowLift || !st.shown) return;
    const q = dlShare(st.n, st.shown).q;
    const from = at ? { x: at.x - PEN.cw / 2, y: at.y - PEN.ch / 2 } : rowEndOf(st.shown);
    acted.current = true;
    put({ rowLift: false, touched: true, ghost: [], gtried: {} });
    api.lock(true);
    tl.run(flySteps([{ v: q, from: () => from }], 0.8, false), () => api.lock(false));
  };

  const ladderCtl = (stage === "ask" || free) && (dlNext(S) !== null || Object.keys(S.tried).length > 1);
  const waitCtl = stage === "ask" && S.waiting.length > 0;
  const rowCtl = stage === "ask" && S.rowLift && !!S.shown;
  const ladderLive = ladderCtl && !busy, waitLive = waitCtl && !busy, rowLive = rowCtl && !busy;
  /* the keyboard: the ladder answers Enter only while a rung is still to be stepped on and the slot is
     empty. With nothing left to climb, or an answer written, Enter goes past it to the pad's Enter */
  const ladderKeys = ladderLive && dlNext(S) !== null && (item.pad === "enter" || free || String(typed || "") === "");
  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (pay.src === "ladder") {
      if (!ladderLive) return;
      if (isNaN(p.x)) { const nx = dlNext(SR.current); if (nx !== null) climb(nx); return; }
      if (moved && (p.x < -10 || p.x > LAD.w + 20)) return;
      const k = dlRungAt(SR.current, p.y);
      if (k !== null) climb(k);
    } else if (pay.src === "wait") {
      if (!waitLive) return;
      if (moved && !(p.y > PEN.y - 30 && p.x > PEN.x - 20)) return; /* let go off the pen: it goes back */
      dropWaiting(pay.role, moved ? p : null);
    } else if (pay.src === "row") {
      if (!rowLive) return;
      if (moved && !(p.y > PEN.y - 30 && p.x > PEN.x - 20)) return;
      dropRow(moved ? p : null);
    }
  });

  /* free play: tap the tray's number, type a new one on the pad, Enter */
  const startDraft = () => {
    if (busy) return;
    put({ draft: "", touched: true });
    api.capture((k: string) => {
      const d = SR.current.draft === null ? "" : SR.current.draft;
      if (k === "back") put({ draft: d.slice(0, -1) });
      else if (k === "clear") put({ draft: "" });
      else if (k === "enter") {
        const v = Number(d);
        api.capture(null);
        if (v >= 2) { tl.stop(); put({ ...dlInit({ cards: "auto", lamp: true }, { n: Math.min(v, 100), top: 24 }), touched: true }); }
        else put({ draft: null });
      } else if (/^\d$/.test(k) && d.length < 3) put({ draft: d === "" && k === "0" ? d : d + k });
    });
  };

  /* ── the correction: the maths redrawn in steps, ending on the whole right answer ── */
  const finishSteps = (it: any, p: number, replay: boolean) => {
    const st = SR.current, out: any[] = [];
    /* a correction of an answer the child makes in the pen never writes into the pen (PATTERNS 7) */
    const gh = replay && it.pad === "enter";
    /* the rung the board will be standing on when these steps have run: the picture must end on the
       rung the answer is about, whichever rungs the child tried on the way, and in whatever order */
    let cur = st.shown;
    const show = (k: number) => {
      const done = !!st.tried[k];
      if (done && !replay && cur === k) return [];
      const steps = done ? dealSteps(k, done && !replay ? p * 0.6 : p, false) : [...dealSteps(k, p, true, gh), ...cardSteps(k, p, true, gh)];
      cur = k;
      return steps;
    };
    /* the ladder climbs itself from the lowest blank rung. A long run of failures is written onto the
       ladder rung by rung (each keeps its leftover) instead of being shared out again on the board, so
       the climb always reaches the rung the answer is about, with its pair and its verdict, in time. */
    const climbTo = (to: number) => {
      const s: any[] = [];
      const todo = dlRange(1, to).filter((k) => !st.tried[k] && (st.mode !== "offer" || st.offer.includes(k)));
      const sweep = todo.filter((k) => st.n % k !== 0).length > 3;
      const ep = sweep ? p * 0.6 : p;
      todo.forEach((k) => {
        if (st.n % k === 0) { s.push(...dealSteps(k, ep, true, gh), ...cardSteps(k, ep, true, gh)); cur = k; }
        else if (sweep) s.push([replay ? 150 : 70, () => put({ refused: null,
          ...(gh ? { gtried: { ...SR.current.gtried, [k]: dlShare(SR.current.n, k) } } : { tried: { ...SR.current.tried, [k]: dlShare(SR.current.n, k) } }) })]);
        else { s.push(...dealSteps(k, p * 0.35, true, gh)); cur = k; }
      });
      return s;
    };
    const shelfBeat = replay ? [[pace(450, p), () => put({ hlShelf: true })], [pace(450, p), () => put({ hlShelf: false })]] : [];
    const rowSweep = (d: number) => (replay ? [...dlRange(0, d - 1).map((j) => [pace(190, p), () => put({ hlRow: j })]), [pace(240, p), () => put({ hlRow: null })]] : []);
    const cardSweep = (cnt: number) => (replay ? [...dlRange(0, cnt - 1).map((j) => [pace(260, p), () => {
      const vs = SR.current.pen.filter((c: any) => !c.hid).map((c: any) => c.v);
      const mine = it.kind === "count" ? vs : SR.current.pen.filter((c: any) => it.waitRung && (c.v === it.waitRung || c.v === it.n / it.waitRung)).map((c: any) => c.v);
      put({ hlCards: j < mine.length ? [mine[j]] : [] });
    }]), [pace(300, p), () => put({ hlCards: [] })]] : []);
    /* gh: the answer is made in the pen, so the correction draws its cards as ghosts and leaves the
       child's own cards, waiting cards and ladder exactly as they were */
    const flyWaiting = () => st.waiting.flatMap((w: any) => (gh
      ? flySteps([{ v: w.v, from: () => ({ x: WAITC.x, y: WAITC.y[w.role] }) }], p, false, true)
      : [[pace(80, p), () => put({ waiting: SR.current.waiting.filter((x: any) => x.role !== w.role) })],
        ...flySteps([{ v: w.v, from: () => ({ x: WAITC.x, y: WAITC.y[w.role] }) }], p, false)]));
    /* the number in each row, lifted off the end of the row and carried into the pen */
    const flyRow = () => (st.rowLift && st.shown
      ? gh ? flySteps([{ v: dlShare(st.n, st.shown).q, from: () => rowEndOf(st.shown) }], p, false, true)
        : [[pace(80, p), () => put({ rowLift: false })], ...flySteps([{ v: dlShare(st.n, st.shown).q, from: () => rowEndOf(st.shown) }], p, false)]
      : []);
    if (it.kind === "pick") {
      /* the correction walks both trials again; a win simply stands on the rung the child named */
      if (replay) it.offer.filter((k: number) => k !== it.answer).forEach((k: number) => out.push(...show(k), ...shelfBeat));
      out.push(...show(it.answer), ...rowSweep(it.answer), ...shelfBeat);
    } else if (it.kind === "judge") out.push(...show(it.offer[0]), ...rowSweep(it.offer[0]), ...shelfBeat);
    else if (it.kind === "first" || it.kind === "repeat") {
      out.push(...climbTo(it.answer));
      if (cur !== it.answer) out.push(...show(it.answer));
      if (it.kind === "first") out.push(...shelfBeat);
      else out.push([pace(200, p), () => put({ repeatOn: true })]);
    } else if (it.kind === "list") out.push(...climbTo(st.top));
    else if (it.kind === "skip") dlRange(1, st.top).filter((k) => !(it.done || []).includes(k)).forEach((k) => out.push(...show(k), ...shelfBeat));
    else if (it.kind === "new" || it.kind === "pair") out.push(...flyWaiting(), ...flyRow(), ...(gh ? [] : cardSweep(2)));
    else if (it.kind === "count") out.push(...flyWaiting(), ...flyRow(), ...climbTo(it.stop), ...cardSweep(it.answer));
    return out;
  };

  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    api.lock(true);
    acted.current = false;
    if (SR.current.draft !== null) put({ draft: null });
    put({ refused: null, touched: true, verdict: null });
    const it = item;
    tl.run([[350, () => {}], ...finishSteps(it, 1.2, true), [250, () => put({ verdict: it.verdict, tone: it.tone })], [500, () => {}]], () => api.lock(false));
  }, [wrong]);

  /* the win: the picture is completed quickly and named */
  useEffect(() => {
    if (stage !== "win" || free) return;
    const it = item;
    put({ refused: null, touched: true, ghost: [], gtried: {} });
    tl.run([...finishSteps(it, 0.25, false), [60, () => put({ verdict: it.verdict, tone: it.tone, ...(it.kind === "repeat" ? { repeatOn: true } : {}) })], [300, () => {}]]);
  }, [stage]);

  /* Enter sends the pen when the answer is made on the working area. A pen that has just missed is
     never sent again unchanged: Enter waits until a card moves (the runtime's rule for a typed answer) */
  const penList = () => SR.current.pen.filter((c: any) => !c.hid).map((c: any) => c.v).join(",");
  const enterFn: any = !free && stage === "ask" && item.pad === "enter" ? () => {
    const v = penList();
    if (!v || !acted.current || v === sent.current) return;
    sent.current = v;
    api.submit(v);
  } : null;
  api.onEnter(enterFn);
  HOOK.enter = () => enterFn && enterFn();
  HOOK.set = (v: any) => {
    const nums = Array.from(new Set(dlNums(v))).filter((x) => x > 0 && x <= 1000);
    if (!nums.length) return false;
    let pen: any[] = [];
    nums.forEach((x) => { pen = dlAdd(pen, x, false); });
    acted.current = true;
    put({ pen, touched: true, ghost: [], gtried: {}, waiting: SR.current.waiting.filter((w: any) => !nums.includes(w.v)) });
    return true;
  };

  /* ── what the host and the agent read back (toolApi.getState) ── */
  const share = S.shown ? dlShare(S.n, S.shown) : null;
  api.share({ number: S.n, rung: S.shown, offered: S.offer, triedRungs: Object.keys(S.tried).map(Number).sort((a, b) => a - b), leftover: share && S.shelf ? share.r : null,
    penCards: S.pen.filter((c: any) => !c.hid).map((c: any) => c.v),
    cardsWaiting: [...S.waiting.map((w: any) => w.v), ...(S.rowLift && S.shown ? [dlShare(S.n, S.shown).q] : [])], repeated: S.repeatOn, verdict: S.verdict });

  /* ── drawing ── */
  const g = dlGeo(S);
  const nx = dlNext(S);
  const d = S.shown || 0;
  const R = d ? dlRows(S, d) : null;
  const rowsX1 = S.cards === "wait" ? 944 : BRD.x1;
  const trayCell = Math.min(30, (BRD.x1 - BRD.count0) / Math.max(dlUnits(S.n), 1));
  const inTray = S.n - (share ? S.dealt * d + (S.shelf ? share.r : 0) : 0);
  const hoverK = drag.drag && drag.drag.payload.src === "ladder" && ladderLive ? dlRungAt(S, drag.drag.y) : null;
  const dragWait = drag.drag && drag.drag.moved && drag.drag.payload.src === "wait" ? drag.drag.payload.role : null;
  const tried = Object.keys(S.tried).length;
  const trayText = S.draft !== null ? S.draft : S.shown ? `${S.n} ÷ ${S.shown}` : String(S.n);
  const toneInk = S.tone === "ink" ? C.ink : DL_INK[S.tone] || C.ink;

  /* Hindi and Gujarati: the count's word runs longer than "tried", so the repeat light is measured into
     place after it, and its word shrinks (to 20 at least) to stay inside the 330-wide panel. English
     keeps its fixed places (lf is null in English). */
  const cntRef = useRef<any>(null), lampRef = useRef<any>(null);
  const [lampFit, setLampFit] = useState<any>(null);
  const lf = lang === "en" ? null : lampFit;
  useEffect(() => {
    if (lang === "en" || !S.lamp || !cntRef.current || !lampRef.current || !cntRef.current.getComputedTextLength) return;
    const end = Number(cntRef.current.getAttribute("x")) + cntRef.current.getComputedTextLength();
    const lw = (lampRef.current.getComputedTextLength() / Number(lampRef.current.getAttribute("font-size") || T.micro)) * T.micro;
    const cx = Math.round(end + 26), tx0 = cx + 26;
    const fs = Math.max(20, Math.min(T.micro, Math.floor((T.micro * (314 - tx0)) / Math.max(lw, 1))));
    if (!lampFit || lampFit.cx !== cx || lampFit.fs !== fs) setLampFit({ cx, tx: tx0, fs });
  });

  const invite = S.touched || busy ? null
    : free ? { x: BRD.x + 86, y: BRD.trayY, r: 44 }
      : stage !== "ask" ? null
        : S.waiting.length ? { x: WAITC.x + WAITC.w / 2, y: WAITC.y[S.waiting[0].role] + WAITC.h / 2, r: 50 }
          : S.rowLift && R ? { x: Math.min(BRD.x + 37 + dlUnits(R.q) * R.cell, BRD.x + R.colW - 29), y: R.y(0), r: 40 }
          : nx !== null ? { x: LAD.plate, y: g.y(nx), r: Math.min(40, g.pitch * 0.7) } : null;

  return (
    <g>
      <style>{DL_CSS}</style>

      {/* the running count: rungs tried (it only ever climbs), and the repeat light when this phase has one */}
      <g data-zone="runs">
        <rect x={0} y={-94} width={330} height={76} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
        <text x={22} y={-40} fontSize={T.speech} fontWeight={700} fill={C.ink}>{tried}</text>
        <text ref={cntRef} x={22 + String(tried).length * 27 + 12} y={-45} fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("tried")}</text>
        {S.lamp && (
          <g data-role="repeat-light">
            <circle cx={lf ? lf.cx : 206} cy={-56} r={17} fill={S.repeatOn ? "url(#gBead)" : "#FFFFFF"} stroke={S.repeatOn ? DL_INK.rose : C.dim} strokeWidth={3} />
            <text ref={lampRef} x={lf ? lf.tx : 232} y={-46} fontSize={lf ? lf.fs : T.micro} fontWeight={600} fill={S.repeatOn ? DL_INK.rose : C.ink}>{tx("repeat")}</text>
          </g>
        )}
      </g>

      {/* the ladder: one control; a tap picks the rung under the finger, Enter steps on the next one */}
      <g className={ladderCtl ? "dl-tap c4-piece" : undefined}
        {...(ladderCtl ? { ...control("ladder", "The ladder: step on the next rung"), ...drag.bind({ src: "ladder" }),
          ...(ladderKeys ? drag.keys({ src: "ladder" }) : {}) } : {})}>
        <rect x={0} y={0} width={LAD.w} height={W.h} fill="transparent" />
        <rect x={LAD.railL} y={g.railTop} width={12} height={LAD.foot - g.railTop} rx={6} fill={DL_WOOD} />
        <rect x={LAD.railR - 12} y={g.railTop} width={12} height={LAD.foot - g.railTop} rx={6} fill={DL_WOOD} />
        <line x1={2} y1={LAD.foot + 2} x2={LAD.w - 2} y2={LAD.foot + 2} stroke={C.rule} strokeWidth={3} strokeLinecap="round" />
        {g.ks.map((k: number) => {
          const y = g.y(k), own = S.tried[k], gt = own ? null : S.gtried[k], t = own || gt, lit = !!own && own.r === 0;
          const ring = S.shown === k || S.refused === k || hoverK === k;
          return (
            <g key={k}>
              {gt ? <rect x={LAD.railL + 2} y={y - 6} width={LAD.railR - LAD.railL - 4} height={12} rx={6} fill="#FFFFFF" stroke={gt.r ? DL_WOOD : DL_BLUE} strokeWidth={2.5} strokeDasharray="7 5" />
                : <rect x={LAD.railL} y={y - 6} width={LAD.railR - LAD.railL} height={12} rx={6} fill={lit ? DL_BLUE : DL_WOOD} />}
              <rect x={LAD.plate - 30} y={y - 18} width={60} height={36} rx={12} fill={lit ? shade(DL_BLUE, 0.1) : "#FFFFFF"}
                stroke={ring ? C.accent : lit ? shade(DL_BLUE, 0.2) : gt && !gt.r ? DL_BLUE : DL_WOOD} strokeWidth={ring ? 4 : 2}
                strokeDasharray={gt && !ring ? "7 5" : undefined} />
              <text x={LAD.plate} y={y + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={lit ? "#FFFFFF" : C.ink}>{k}</text>
              {t && <text x={LAD.rec} y={y + 10} fontSize={T.micro} fontWeight={600} fill={t.r ? DL_INK.verm : DL_INK.blue}>{t.r + " " + tx("over")}</text>}
              {!t && S.refused === k && <text x={LAD.rec} y={y + 10} fontSize={T.micro} fontWeight={700} fill={shade(C.accent, 0.3)}>{tx("try") + " " + k}</text>}
            </g>
          );
        })}
      </g>

      {/* the tray: the number in hand, tens tied into rods */}
      <rect x={BRD.x} y={2} width={PEN.x1 - BRD.x} height={56} rx={16} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
      <text x={BRD.x + 18} y={BRD.trayY + 12} fontSize={T.label} fontWeight={700} fill={C.ink}>{trayText}</text>
      {S.draft !== null && <rect className="c4-caret" x={BRD.x + 22 + trayText.length * 19} y={BRD.trayY - 16} width={4} height={34} rx={2} fill={C.accent} />}
      {inTray > 0 && <DlCounters c={inTray} x={BRD.count0} y={BRD.trayY} cell={trayCell} paint="gTen" base={DL_AMBER} />}
      {S.verdict && <text x={BRD.x1 - 4} y={BRD.trayY + 12} textAnchor="end" fontSize={T.label} fontWeight={700} fill={toneInk}>{tx(S.verdict)}</text>}
      {free && S.draft === null && <Hit id="tray-number" label="Change the number in the tray" x={BRD.x} y={0} w={180} h={72} onPress={startDraft} />}

      {/* the board: one walled row per rung number, filled a round at a time */}
      {!R && <rect x={BRD.x} y={BRD.rows0} width={rowsX1 - BRD.x} height={BRD.rows1 - BRD.rows0} rx={18} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="10 12" />}
      {R && dlRange(0, d - 1).map((k) => {
        const y0 = R.top(k), x0 = R.x(k), hl = S.hlRow === k;
        return (
          <g key={"row" + k}>
            <rect x={x0} y={y0 + 1.5} width={R.colW} height={Math.max(R.rp - 3, 4)} rx={Math.min(10, (R.rp - 3) / 2)} fill="#FFFFFF" stroke={hl ? C.accent : C.rule} strokeWidth={hl ? 4 : 1.5} />
            <DlCounters c={Math.min(S.dealt, R.q)} x={x0 + 14} y={R.y(k)} cell={R.cell} paint="gTen" base={DL_AMBER} />
          </g>
        );
      })}

      {/* the leftover shelf: outside the rows, at full strength, countable */}
      <rect x={BRD.x} y={BRD.shelf0} width={rowsX1 - BRD.x} height={BRD.shelfH} rx={16} fill={tint(C.panel, 0.5)} stroke={S.hlShelf ? C.accent : C.rule} strokeWidth={S.hlShelf ? 4 : 2} />
      <line x1={BRD.count0 - 10} y1={BRD.shelf0 + BRD.shelfH - 14} x2={rowsX1 - 16} y2={BRD.shelf0 + BRD.shelfH - 14} stroke={C.rule} strokeWidth={2} />
      {share && S.shelf && (
        <g>
          <text x={BRD.x + 18} y={BRD.shelf0 + 46} fontSize={T.label} fontWeight={700} fill={share.r ? DL_INK.verm : DL_INK.blue}>{share.r + " " + tx("over")}</text>
          {dlRange(1, share.r).map((j) => {
            const pitch = Math.min(36, (rowsX1 - 24 - BRD.count0) / Math.max(share.r, 1));
            return <circle key={"lo" + j} cx={BRD.count0 + (j - 0.5) * pitch} cy={BRD.shelf0 + 32} r={Math.min(14, pitch * 0.42)} fill="url(#gPointer)" stroke={DL_INK.verm} strokeWidth={1.2} />;
          })}
        </g>
      )}

      {/* the number in each row: the first row can be lifted off the board and dropped into the pen */}
      {R && S.rowLift && (() => {
        const y0 = R.top(0), h0 = Math.max(R.rp - 3, 4);
        const gx = Math.min(BRD.x + 20 + dlUnits(R.q) * R.cell, BRD.x + R.colW - 46);
        const pay = { src: "row" };
        return (
          <g className={rowCtl ? "dl-grab c4-piece" : undefined}
            {...(rowCtl ? { ...control("row-lift", "Lift the number in each row into the pen"), ...drag.bind(pay), ...drag.keys(pay) } : {})}>
            <rect x={gx - 26} y={R.y(0) - 36} width={98} height={72} fill="transparent" />
            <rect x={BRD.x} y={y0 + 1.5} width={R.colW} height={h0} rx={Math.min(10, (R.rp - 3) / 2)} fill="none" stroke={DL_BLUE} strokeWidth={3} />
            <rect x={gx} y={R.y(0) - 19} width={34} height={38} rx={9} fill="#FFFFFF" stroke={DL_BLUE} strokeWidth={3} />
            {[13, 20, 27].map((dy) => <line key={dy} x1={gx + 9} y1={R.y(0) - 19 + dy} x2={gx + 25} y2={R.y(0) - 19 + dy} stroke={DL_BLUE} strokeWidth={2.5} strokeLinecap="round" />)}
          </g>
        );
      })()}

      {/* the two cards of an exact division, waiting to be dropped into the pen (phase 3) */}
      {S.waiting.map((w: any) => {
        const x = WAITC.x, y = WAITC.y[w.role], pay = { src: "wait", role: w.role };
        return (
          <g key={"wait" + w.role}>
            {dragWait !== w.role && (
              <g className={waitCtl ? "dl-grab c4-piece" : undefined}
                {...(waitCtl ? { ...control("card-" + (w.role ? "each" : "rows"), "Drop the " + w.v + " card into the pen"), ...drag.bind(pay), ...drag.keys(pay) } : {})}>
                <rect x={x - 6} y={y - 2} width={88} height={88} fill="transparent" />
                <DlCard x={x} y={y} v={w.v} w={WAITC.w} h={WAITC.h} />
              </g>
            )}
            <text x={x + WAITC.w / 2} y={y + WAITC.h + 36 + (lang !== "en" ? 6 : 0)} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx(w.role ? "in each" : "rows")}</text>
          </g>
        );
      })}

      {/* the factor pen: a wall at each end, the cards in order between them */}
      {S.cards !== "none" && (
        <g>
          <rect x={PEN.x} y={PEN.y} width={PEN.x1 - PEN.x} height={PEN.h} rx={18} fill={tint(C.panel, 0.35)} stroke={C.rule} strokeWidth={2} />
          <rect x={PEN.x} y={PEN.y} width={12} height={PEN.h} rx={6} fill={DL_WOOD} />
          <rect x={PEN.x1 - 12} y={PEN.y} width={12} height={PEN.h} rx={6} fill={DL_WOOD} />
          {dlOrder(S.pen, S.ghost).length <= (lang === "en" ? 9 : 7) && <text x={PEN.x1 - 26} y={PEN.y + PEN.h / 2 + 10} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("factor pen")}</text>}
          {S.ghost.filter((v: number) => !S.pen.some((c: any) => c.v === v)).map((v: number) => {
            const i = dlOrder(S.pen, S.ghost).indexOf(v);
            return (
              <g key={"ghost" + v} className="dl-slide" style={{ transform: `translate(${PEN.cx + i * PEN.pitch}px,${PEN.y + 10}px)` } as any}>
                <DlCard x={0} y={0} v={v} ghost />
              </g>
            );
          })}
          {S.pen.map((c: any) => {
            if (c.hid) return null;
            const i = dlOrder(S.pen, S.ghost).indexOf(c.v);
            const tw = c.twins - c.hidTw, ring = S.hlCards.includes(c.v) ? C.accent : null;
            return (
              <g key={"pen" + c.v} className="dl-slide" style={{ transform: `translate(${PEN.cx + i * PEN.pitch}px,${PEN.y + 10}px)` } as any}>
                {tw > 0 ? (
                  <g>
                    <DlCard x={0} y={0} v={null} />
                    <DlCard x={5} y={-5} v={c.v} edge={DL_ROSE} ring={ring} />
                  </g>
                ) : <DlCard x={0} y={0} v={c.v} ring={ring} />}
              </g>
            );
          })}
        </g>
      )}

      {/* cards on their way */}
      {S.fly.map((f: any) => (
        <g key={"fly" + f.id} className="dl-move" style={{ transform: `translate(${f.x}px,${f.y}px)` } as any} pointerEvents="none">
          <DlCard x={0} y={0} v={f.v} ghost={f.ghost} />
        </g>
      ))}
      {dragWait !== null && (() => {
        const w = S.waiting.find((x: any) => x.role === dragWait);
        return w ? <g pointerEvents="none"><DlCard x={drag.drag.x - WAITC.w / 2} y={drag.drag.y - WAITC.h / 2} v={w.v} w={WAITC.w} h={WAITC.h} /></g> : null;
      })()}

      {invite && <Invite x={invite.x} y={invite.y} r={invite.r} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { value, answer, kind, item, shared } (shared = what api.share held at that moment) */
function Thumb({ result, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const L = (result && result.last) || {};
  if (L.value === null || L.value === undefined || L.value === "") return null;
  const sh = L.shared || {};
  const mid = h / 2;
  const box = <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />;
  /* an answer that counts the list: the number, and the pen it stands for, card for card */
  if (L.kind === "count" || L.kind === "list") {
    const cards = L.kind === "count" ? Number(L.answer) : (L.answer || []).length;
    const pitch = Math.min(18, (w - 86) / Math.max(cards, 1));
    return (
      <g>
        {box}
        <text x={16} y={mid + 13} fontSize={T.label} fontWeight={700} fill={DL_INK.blue}>{cards}</text>
        <rect x={64} y={mid - 24} width={6} height={48} rx={3} fill={DL_WOOD} />
        {dlRange(0, cards - 1).map((i) => (
          <rect key={i} x={74 + i * pitch} y={mid - 18} width={Math.max(pitch - 4, 8)} height={36} rx={4} fill="#FFFFFF" stroke={DL_BLUE} strokeWidth={2} />
        ))}
      </g>
    );
  }
  /* the rung the child's answer is about: the rung itself where the answer names one (a factor, the
     first failure, the repeat), else the rung whose division the question was about. It is drawn with
     the two cards it handed over, or with what it left standing outside the rows. */
  const rung = ["pick", "repeat", "first"].includes(L.kind) ? Number(L.answer)
    : ["new", "pair", "judge"].includes(L.kind) ? Number(sh.rung || (sh.offered || [])[0]) : 0;
  if (rung > 0 && sh.number > 0) {
    const left = sh.number - Math.floor(sh.number / rung) * rung, lit = left === 0, q = Math.floor(sh.number / rung);
    const card = (x: number, v: number) => (
      <g>
        <rect x={x} y={mid - 30} width={58} height={60} rx={9} fill="#FFFFFF" stroke={DL_BLUE} strokeWidth={2.5} />
        <text x={x + 29} y={mid + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={DL_INK.blue}>{v}</text>
      </g>
    );
    return (
      <g>
        {box}
        <rect x={10} y={mid - 4} width={52} height={8} rx={4} fill={lit ? DL_BLUE : DL_WOOD} />
        <rect x={10} y={mid - 17} width={52} height={34} rx={11} fill={lit ? shade(DL_BLUE, 0.1) : "#FFFFFF"} stroke={lit ? shade(DL_BLUE, 0.2) : DL_WOOD} strokeWidth={2.5} />
        <text x={36} y={mid + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={lit ? "#FFFFFF" : C.ink}>{rung}</text>
        {lit ? <g>{card(76, rung)}{card(142, q)}</g>
          : <text x={78} y={mid + 10} fontSize={T.micro} fontWeight={700} fill={DL_INK.verm}>{left + " " + tx("over")}</text>}
      </g>
    );
  }
  let v = String(L.value);
  const list = v.includes(",");
  if (list) { const parts = v.split(","); v = parts.join(" "); if (v.length > 12) v = parts.length + " " + tx("cards"); }
  else if (L.kind === "count") v = v + " " + tx("factors");
  else if (L.kind === "repeat" || L.kind === "first") v = tx("rung") + " " + v;
  else if (L.kind === "new") v = v + " " + tx("new");
  else v = tx(v);
  const left = sh.number ? String(sh.number) : "";
  return (
    <g>
      {box}
      {left && <text x={16} y={h / 2 + 10} fontSize={T.micro} fontWeight={600} fill={C.ink}>{left}</text>}
      <text x={w - 16} y={h / 2 + 11} textAnchor="end" fontSize={T.label} fontWeight={700} fill={list || /\d/.test(v) ? DL_INK.blue : C.ink}>{v}</text>
    </g>
  );
}

function DivideLadder(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null }} />
  );
}

export default DivideLadder;
