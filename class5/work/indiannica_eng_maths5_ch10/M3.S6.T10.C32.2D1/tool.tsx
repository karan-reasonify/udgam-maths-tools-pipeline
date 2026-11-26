/* ═══ M3.S6.T10.C32.2D1 · clock_cards · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build. SILENT runtime (r66), keyOnly + navDots, board, nextKey.
   Four phases: (1) the Earth's turn (starting lower, left ends aligned) slid up under a 24-hour day bar, the last hour drawn large (the 4 min gap); (2) a ladder
   days -> hours -> minutes, a pencil writes the set-up of each step; (3) sixteen face-down cards, a ringed clock card is
   turned and read on a big clock, its time card (minutes or seconds after 12 o'clock) is typed; (4) a time line with jumps,
   the end time typed as FOUR digits in one box "____ hours" (owner, 2026-11-16: judged as the typed string).
   bigPad: false (the two rows of eight 110-wide cards need x 16 to 994 with the panel open).
   Edit, never rewrite. Concepts are verbatim (check compares them). */

const TOOL_ID = "clock_cards";
const MEDIA_ID = "M3.S6.T10.C32.2D1";
const TOOL_NAME = "Clock Card Matcher";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (not shown: phase 1 has steps) */
const OPENING = ["A day, a ladder of time and sixteen cards face down."];
/* the whole-tool line (not shown from r44) */
const FINISH_LINE = "You matched clock cards, changed long lengths of time and wrote an end time.";
/* printed when the child opens Free play; its LAST piece stays on the bubble */
const FREE_LINE = "Free play. Turn any two cards and find the pairs.";

/* THE START PAGE: one question to wonder at, and the cards the lesson is about */
const START_HOOK = "Can a clock card match a time card?";

/* ── chapter colours and small helpers (every top-level name prefixed cc / CC_) ── */
const CC_BLUE = "#0072B2", CC_GREEN = "#009E73", CC_AMBER = "#E69F00", CC_VIOLET = "#7B52AE";
const CC_ROSE = "#F7CAD5", CC_AMW = "#FFF8EA", CC_INK = "#2B2B2B", CC_BACK = "#8A5A33", CC_PAPER = "#FFFDF7";
const ccDeep = (c: string) => shade(c, 0.25);
const ccPad2 = (k: number) => (k < 10 ? "0" : "") + k;
/* minutes after midnight -> "1:15 p.m." */
const cc12 = (t: number) => { const h = Math.floor(t / 60) % 24, m = t % 60; return (h % 12 || 12) + ":" + ccPad2(m) + (h < 12 ? " a.m." : " p.m."); };
const ccW = (s: string, size: number) => String(s).length * size * 0.56;
const ccZero = (c: number) => (c >= 0x900 && c <= 0x902) || c === 0x93c || (c >= 0x941 && c <= 0x948) || c === 0x94d || (c >= 0x951 && c <= 0x957) || (c >= 0x962 && c <= 0x963)
  || (c >= 0xa81 && c <= 0xa82) || c === 0xabc || (c >= 0xac1 && c <= 0xac8) || c === 0xacd || (c >= 0xae2 && c <= 0xae3);
const ccTW = (s: string, size: number) => Array.from(String(s)).reduce((a: number, ch: string) => {
  const c = ch.charCodeAt(0);
  return a + (ccZero(c) ? 0 : ch === " " ? 0.28 : c >= 0x900 && c <= 0xaff ? 0.62 : 0.58);
}, 0) * size;
/* Poppins 700 as drawn (measured on the tray: Latin ~0.66 em, Devanagari ~0.72 em, Gujarati ~0.55 em a letter) */
const ccTWb = (s: string, size: number) => Array.from(String(s)).reduce((a: number, ch: string) => {
  const c = ch.charCodeAt(0);
  return a + (ccZero(c) ? 0 : ch === " " ? 0.3 : c >= 0xa80 && c <= 0xaff ? 0.55 : c >= 0x900 && c <= 0x97f ? 0.72 : 0.66);
}, 0) * size;
/* lines broken at spaces so each fits `room` at `size` (a single word that cannot break stays whole) */
const ccWrap = (lines: string[], size: number, room: number) => lines.flatMap((l: string) => {
  const out: string[] = [];
  String(l).split(" ").forEach((w: string) => {
    const last = out.length ? out[out.length - 1] + " " + w : "";
    if (out.length && ccTWb(last, size) <= room) out[out.length - 1] = last; else out.push(w);
  });
  return out;
});
/* the biggest size up to `max` at which `s` fits `room` on one line (never under the 28 floor) */
const ccFit = (s: string, room: number, max: number) => Math.max(28, Math.min(max, Math.floor(room / Math.max(1, ccTW(s, 1)))));
/* an equation drawn as ONE text with no spaces in it (the gaps are dx), so the working area holds labels, not sentences */
function ccEq(k: any, x: number, y: number, s: string, size: number, fill: string, anchor: string = "start") {
  const parts = String(s).split(" ");
  return (
    <text key={k} x={x} y={y} fontSize={size} fontWeight={700} fill={fill} textAnchor={anchor as any}
      stroke={CC_PAPER} strokeWidth={6} paintOrder="stroke" strokeLinejoin="round">
      {parts.map((p, j) => <tspan key={j} dx={j ? size * 0.26 : 0}>{p}</tspan>)}
    </text>
  );
}

/* phase 3: sixteen cards, two rows of eight, 110 x 170 each */
const CC_CW = 110, CC_CH = 170, CC_GAP = 14, CC_X0 = 16, CC_ROWY = [8, 192];
const ccCardXY = (i: number) => ({ x: CC_X0 + (i % 8) * (CC_CW + CC_GAP), y: CC_ROWY[Math.floor(i / 8)] });
/* eight pairs: clock card index c, time card index t; pair 0 is the warm-up, 1-3 the three questions, 4-7 shown at the end */
const CC_PAIRS = [
  { c: 1, t: 11, h: 3, m: 20, unit: "min" },
  { c: 4, t: 8, h: 6, m: 25, unit: "min" },
  { c: 10, t: 2, h: 2, m: 5, unit: "min" },
  { c: 13, t: 5, h: 2, m: 35, unit: "s" },
  { c: 0, t: 14, h: 1, m: 10, unit: "min" },
  { c: 12, t: 3, h: 4, m: 45, unit: "min" },
  { c: 6, t: 9, h: 7, m: 5, unit: "min" },
  { c: 15, t: 7, h: 9, m: 30, unit: "min" },
];
const ccPairVal = (p: any) => (p.h * 60 + p.m) * (p.unit === "s" ? 60 : 1);
const ccPairOf = (i: number) => CC_PAIRS.findIndex((p: any) => p.c === i || p.t === i);

/* phase 1: the six word cards of the tray */
const CC_WORDS = [
  { id: "second", word: "second", means: ["60 s make", "1 min"] },
  { id: "minute", word: "minute", means: ["60 min", "make 1 h"] },
  { id: "hour", word: "hour", means: ["60 min"] },
  { id: "am", word: "a.m.", means: ["before", "noon"] },
  { id: "pm", word: "p.m.", means: ["after", "noon"] },
  { id: "calendar", word: "calendar", means: ["days and", "months"] },
];

/* what the slot shows is set by `format`, which is not told which question is up: Work sets this as it renders */
const CC_NOW: any = { item: null };
/* the answer gate: true once the child has touched a piece for real in user mode */
const CC_GATE: any = { touched: false };

/* the clock face: ticks, numerals on a big one only, the hour hand moved on for the minutes */
function ccClock(k: any, cx: number, cy: number, r: number, h: number, m: number, big: boolean, hl: boolean = false) {
  const ha = ((h % 12) + m / 60) * 30, ma = m * 6, h0 = (h % 12) * 30;
  const pt = (deg: number, len: number) => [cx + len * Math.sin((deg * Math.PI) / 180), cy - len * Math.cos((deg * Math.PI) / 180)];
  const ticks: any[] = [];
  for (let i = 0; i < 60; i += big ? 1 : 5) {
    const a = pt(i * 6, r - 5), b = pt(i * 6, r - 5 - (i % 5 === 0 ? (big ? 10 : 11) : big ? 5 : 7));
    ticks.push(<line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={CC_INK} strokeWidth={i % 5 === 0 ? (big ? 4 : 3) : 1.6} strokeLinecap="round" />);
  }
  const hp = pt(ha, big ? r * 0.38 : r * 0.5), mp = pt(ma, big ? r * 0.54 : r * 0.8);
  const ar = big ? r * 0.46 : r * 0.62, arcA = pt(h0, ar), arcB = pt(ha, ar);
  return (
    <g key={k}>
      <circle cx={cx} cy={cy} r={r} fill="url(#ccClockBg)" stroke={CC_INK} strokeWidth={big ? 5 : 3} filter={big ? "url(#ccShadowSoft)" : undefined} />
      <circle cx={cx} cy={cy} r={r - (big ? 6 : 4)} fill="none" stroke={tint(CC_INK, 0.9)} strokeWidth={1} />
      {ticks}
      {hl && <path d={`M ${arcA[0]} ${arcA[1]} A ${ar} ${ar} 0 0 1 ${arcB[0]} ${arcB[1]}`} fill="none" stroke={CC_AMBER} strokeWidth={big ? 9 : 5} strokeLinecap="round" opacity={0.95} />}
      <line x1={cx} y1={cy} x2={hp[0]} y2={hp[1]} stroke={hl ? ccDeep(CC_AMBER) : CC_INK} strokeWidth={big ? 10 : 6} strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={mp[0]} y2={mp[1]} stroke={hl ? CC_AMBER : CC_INK} strokeWidth={big ? 7 : 4} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={big ? 9 : 5} fill={CC_INK} stroke="#FFFFFF" strokeWidth={big ? 2 : 1} />
      {/* numerals over the hands, each on a paper halo, clear of the ticks */}
      {big && Array.from({ length: 12 }, (_, i) => {
        const p = pt((i + 1) * 30, r - 36);
        return <text key={"n" + i} x={p[0]} y={p[1] + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={CC_INK} stroke="#FFFFFF" strokeWidth={6} paintOrder="stroke">{i + 1}</text>;
      })}
    </g>
  );
}

/* a card lying face down: the plain card, the card-back picture over it */
function ccBack(k: any, x: number, y: number, w: number, h: number, skinned: boolean = true) {
  return (
    <g key={k}>
      <rect x={x} y={y} width={w} height={h} rx={12} fill={CC_BACK} stroke="#4A2C14" strokeWidth={3} filter="url(#ccShadowSoft)" />
      {skinned && <Skin name="card" x={x} y={y} w={w} h={h} />}
    </g>
  );
}

function StartArt({ box, C, lang, tx }: any) {
  const w = 180, h = 280, gap = 30, x0 = (box.w - (5 * w + 4 * gap)) / 2, y = 30;
  const xs = [0, 1, 2, 3, 4].map((k) => x0 + k * (w + gap));
  return (
    <g>
      <defs>
        <filter id="ccShadowSoft" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#2B2B2B" floodOpacity="0.16" />
        </filter>
        <radialGradient id="ccClockBg" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F4F6F8" />
        </radialGradient>
      </defs>
      {ccBack("b0", xs[0], y, w, h)}
      {ccBack("b1", xs[1], y, w, h)}
      <rect x={xs[2]} y={y} width={w} height={h} rx={14} fill="#FFFFFF" stroke={CC_INK} strokeWidth={4} filter="url(#ccShadowSoft)" />
      {ccClock("ck", xs[2] + w / 2, y + h / 2, 76, 3, 20, false)}
      <rect x={xs[3]} y={y} width={w} height={h} rx={14} fill="#FFFFFF" stroke={CC_INK} strokeWidth={4} filter="url(#ccShadowSoft)" />
      <text x={xs[3] + w / 2} y={y + h / 2 + 4} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={CC_INK}>200</text>
      <text x={xs[3] + w / 2} y={y + h / 2 + 52} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={CC_INK}>{tx("min")}</text>
      {ccBack("b4", xs[4], y, w, h)}
    </g>
  );
}

/* Hindi and Gujarati: filled in the language pass, once the English is final */
const TR: any = {
  hi: {
    "Clock Card Matcher": "घड़ी कार्ड मिलान",
    "A day, a ladder of time and sixteen cards face down.": "एक दिन, समय की सीढ़ी और उलटे रखे सोलह कार्ड।",
    "You matched clock cards, changed long lengths of time and wrote an end time.": "तुमने घड़ी कार्ड मिलाए, लंबे समय बदले और समाप्ति का समय लिखा।",
    "Free play. Turn any two cards and find the pairs.": "मुक्त खेल। कोई भी दो कार्ड पलटो और जोड़े ढूँढो।",
    "Can a clock card match a time card?": "क्या घड़ी कार्ड समय कार्ड से मिल सकता है?",
    "The Earth's turn": "पृथ्वी का चक्कर",
    "Long lengths of time": "लंबी अवधि",
    "Clock cards and time cards": "घड़ी कार्ड और समय कार्ड",
    "An end time on the 24-hour clock": "24 घंटे की घड़ी पर समाप्ति का समय",
    "Are the two bars exactly the same? Which one is a little shorter?": "क्या दोनों पट्टियाँ बिल्कुल बराबर हैं? कौन-सी थोड़ी छोटी है?",
    "One step at a time. Which unit comes next?": "एक बार में एक कदम। अगली इकाई कौन-सी है?",
    "Turn two cards. Do the hours and minutes match the time card?": "दो कार्ड पलटो। क्या घंटे और मिनट समय कार्ड से मिलते हैं?",
    "Jump the hours, then the minutes. Now write it on the twenty-four hour clock.": "पहले घंटों की छलाँग, फिर मिनटों की। अब इसे 24 घंटे की घड़ी पर लिखो।",
    "Tap the minute card to turn it over.": "मिनट वाला कार्ड पलटने के लिए उस पर टैप करो।",
    "The minute card is in the row of cards.": "मिनट वाला कार्ड कार्डों की पंक्ति में है।",
    "Now tap the hour card to see what it means.": "अब घंटा कार्ड पर टैप करके उसका अर्थ देखो।",
    "Find the card that says hour.": "वह कार्ड ढूँढो जिस पर घंटा लिखा है।",
    "Do the two bars end together in the last hour?": "क्या आखिरी घंटे में दोनों पट्टियाँ साथ खत्म होती हैं?",
    "Count the minutes between the two ends in the last hour.": "आखिरी घंटे में दोनों सिरों के बीच के मिनट गिनो।",
    "The Earth turns once in about 23 h 56 min, a little less than a clock day.": "पृथ्वी लगभग 23 घंटे 56 मिनट में घूमती है, घड़ी के दिन से कम।",
    "You learned: the Earth turns in about 23 h 56 min, less than a day.": "तुमने सीखा: पृथ्वी लगभग 23 घंटे 56 मिनट में घूमती है, एक दिन से कम।",
    "A pupil says the Earth turns in exactly 1 day; what is better to say?": "बच्चा कहता है पृथ्वी ठीक 1 दिन में घूमती है; बेहतर क्या कहें?",
    "Better to say?": "बेहतर क्या है?",
    "About 23 h 56 min": "लगभग 23 घंटे 56 मिनट",
    "Exactly 1 day": "ठीक 1 दिन",
    "Look at where the Earth's bar ends.": "देखो पृथ्वी का चक्कर कहाँ खत्म होता है।",
    "Yes, 4 min short of a day is about 23 h 56 min.": "हाँ, दिन से 4 मिनट कम यानी लगभग 23 घंटे 56 मिनट।",
    "How many hours make 1 day on a clock?": "घड़ी पर 1 दिन में कितने घंटे होते हैं?",
    "Hours in 1 day?": "1 दिन में घंटे?",
    "hours": "घंटे",
    "h": "घंटे",
    "Count the hour boxes on the day bar.": "दिन की पट्टी पर घंटों के खाने गिनो।",
    "One half of the day bar has 12 boxes.": "दिन की पट्टी के एक आधे भाग में 12 खाने हैं।",
    "Add the boxes of both halves of the day.": "दिन के दोनों आधे भागों के खाने जोड़ो।",
    "Yes, a clock day has 24 h.": "हाँ, घड़ी के एक दिन में 24 घंटे होते हैं।",
    "Is the Earth's turn a little more or a little less than 1 day?": "क्या पृथ्वी का चक्कर 1 दिन से थोड़ा ज़्यादा है या थोड़ा कम?",
    "More or less?": "ज़्यादा या कम?",
    "A little more": "थोड़ा ज़्यादा",
    "A little less": "थोड़ा कम",
    "Which bar ends first, the day or the Earth's turn?": "कौन-सी पट्टी पहले खत्म होती है, दिन की या पृथ्वी के चक्कर की?",
    "Look at the gap in the last hour.": "आखिरी घंटे में खाली जगह देखो।",
    "Which bar would need 4 more minutes to reach the end?": "किस पट्टी को अंत तक पहुँचने में 4 मिनट और चाहिए?",
    "Yes, the Earth's turn is a little less than a day.": "हाँ, पृथ्वी का चक्कर एक दिन से थोड़ा कम है।",
    "Tap the hours rung to change 1 day 2 h to hours.": "1 दिन 2 घंटे को घंटों में बदलने के लिए घंटे वाले पायदान पर टैप करो।",
    "The hours rung is just under the days.": "घंटे वाला पायदान दिन के ठीक नीचे है।",
    "Now tap the minutes rung for the next step.": "अगले कदम के लिए अब मिनट वाले पायदान पर टैप करो।",
    "Minutes come after hours on the ladder.": "सीढ़ी पर घंटों के बाद मिनट आते हैं।",
    "2 days are 2 × 24 hours, then add the 3 h.": "2 दिन यानी 2 × 24 घंटे, फिर 3 घंटे जोड़ो।",
    "Multiply all those hours by 60 to get minutes.": "मिनट पाने के लिए उन सब घंटों को 60 से गुणा करो।",
    "Multiply days by 24 for hours, then hours by 60 for minutes.": "दिन × 24 से घंटे बनते हैं, और घंटे × 60 से मिनट।",
    "You learned: to change days to minutes, go through the hours.": "तुमने सीखा: दिनों को मिनटों में बदलने के लिए घंटों से होकर जाओ।",
    "How many minutes are there in 2 days 3 h?": "2 दिन 3 घंटे में कितने मिनट होते हैं?",
    "Minutes in 2 days 3 h?": "2 दिन 3 घंटे में मिनट?",
    "minutes": "मिनट",
    "min": "मिनट",
    "Go down the ladder one rung at a time.": "सीढ़ी पर एक-एक पायदान नीचे उतरो।",
    "Yes, 2 days 3 h is 3,060 min.": "हाँ, 2 दिन 3 घंटे में 3,060 मिनट होते हैं।",
    "How many hours are there in 10 days?": "10 दिनों में कितने घंटे होते हैं?",
    "Hours in 10 days?": "10 दिनों में घंटे?",
    "Each day on the ladder is worth 24 h.": "सीढ़ी पर हर दिन 24 घंटे के बराबर है।",
    "Find 10 groups of 24 h.": "24 घंटे के 10 समूह ढूँढो।",
    "Multiplying by 10 puts a zero after the number.": "10 से गुणा करने पर संख्या के बाद एक शून्य लगता है।",
    "Yes, 10 days is 240 h.": "हाँ, 10 दिनों में 240 घंटे होते हैं।",
    "How many hours are there in a year of 365 days?": "365 दिनों के एक वर्ष में कितने घंटे होते हैं?",
    "Hours in 365 days?": "365 दिनों में घंटे?",
    "A year has 365 days of 24 h each.": "एक वर्ष में 365 दिन हैं, हर दिन 24 घंटे का।",
    "Find 365 × 24, one part at a time.": "365 × 24 एक-एक भाग करके निकालो।",
    "Work out 365 × 20 and 365 × 4, then add.": "365 × 20 और 365 × 4 निकालो, फिर जोड़ो।",
    "Yes, a year of 365 days is 8,760 h.": "हाँ, 365 दिनों के वर्ष में 8,760 घंटे होते हैं।",
    "Change the days to hours first.": "पहले दिनों को घंटों में बदलो।",
    "Tap the card with the ring to turn it over.": "घेरे वाले कार्ड को पलटने के लिए उस पर टैप करो।",
    "Look for the card that has a ring round it.": "वह कार्ड ढूँढो जिसके चारों ओर घेरा है।",
    "Now tap the next card with the ring for its match.": "अब उसका जोड़ा पाने के लिए अगले घेरे वाले कार्ड पर टैप करो।",
    "The ring shows which card to turn.": "घेरा बताता है कि कौन-सा कार्ड पलटना है।",
    "Count 60 min for each whole hour the short hand has passed.": "छोटी सुई जितने पूरे घंटे पार कर चुकी है, हर घंटे के 60 मिनट गिनो।",
    "Then add the minutes the long hand shows.": "फिर बड़ी सुई जो मिनट दिखाती है, वे जोड़ो।",
    "A clock card matches the time passed after 12 o'clock, in minutes or in seconds.": "घड़ी कार्ड 12 बजे के बाद बीता समय है, मिनटों या सेकंडों में।",
    "You learned: a clock card is the time passed after 12 o'clock.": "तुमने सीखा: घड़ी कार्ड 12 बजे के बाद बीता समय है।",
    "Turn the card with the ring; how many minutes after 12 o'clock is it?": "घेरे वाला कार्ड पलटो; यह 12 बजे के कितने मिनट बाद है?",
    "Its time card?": "इसका समय कार्ड?",
    "time card": "समय",
    "s": "सेकंड",
    "Read the hours, then the minutes on the clock.": "घड़ी पर पहले घंटे, फिर मिनट पढ़ो।",
    "Yes, 25 min past 6 is 385 min.": "हाँ, 6 बजकर 25 मिनट यानी 385 मिनट।",
    "What does the next card with the ring show, in minutes?": "अगला घेरे वाला कार्ड मिनटों में क्या दिखाता है?",
    "Time card in min?": "समय कार्ड मिनट में?",
    "Which number has the short hand just passed?": "छोटी सुई अभी कौन-सी संख्या पार कर चुकी है?",
    "Each hour the short hand has passed is 60 min.": "छोटी सुई ने जो हर घंटा पार किया, वह 60 मिनट है।",
    "Add on the minutes the long hand points to.": "बड़ी सुई जिन मिनटों पर है, उन्हें जोड़ो।",
    "Yes, 5 min past 2 is 125 min.": "हाँ, 2 बजकर 5 मिनट यानी 125 मिनट।",
    "Turn the last card with the ring and change its time into seconds.": "आखिरी घेरे वाला कार्ड पलटो और उसका समय सेकंडों में बदलो।",
    "Time card in s?": "समय कार्ड सेकंड में?",
    "Seconds are asked for this time, not minutes.": "इस बार सेकंड पूछे गए हैं, मिनट नहीं।",
    "Minutes first, then change them to seconds.": "पहले मिनट, फिर उन्हें सेकंडों में बदलो।",
    "Each minute is 60 s, so multiply the minutes by 60.": "हर मिनट 60 सेकंड का है, इसलिए मिनटों को 60 से गुणा करो।",
    "Yes, 35 min past 2 is 9,300 s.": "हाँ, 2 बजकर 35 मिनट यानी 9,300 सेकंड।",
    "Tap Jump to jump 6 h from 7:25 a.m.": "7:25 पूर्वाह्न से 6 घंटे की छलाँग के लिए छलाँग पर टैप करो।",
    "The Jump key is under the time line.": "छलाँग वाला बटन समय रेखा के नीचे है।",
    "Now tap Jump again for the 50 min.": "अब 50 मिनट के लिए फिर से छलाँग पर टैप करो।",
    "One more jump, this time for the minutes.": "एक छलाँग और, इस बार मिनटों के लिए।",
    "Is the end in the part marked a.m., or p.m.?": "अंत पूर्वाह्न वाले भाग में है या अपराह्न वाले में?",
    "After noon, the 24-hour hour is 12 more than the hour on the line.": "अपराह्न में, 24 घंटे वाला घंटा रेखा के घंटे से 12 ज़्यादा होता है।",
    "Jump the hours, then the minutes, and write four digits and the word hours.": "घंटों, फिर मिनटों की छलाँग लगाओ, फिर चार अंक और घंटे लिखो।",
    "You learned: a 24-hour end time is four digits and the word hours.": "तुमने सीखा: 24 घंटे वाला समाप्ति समय चार अंक और शब्द घंटे है।",
    "A machine runs 7 h 40 min from 5:35 a.m.; what is its 24-hour stop time?": "मशीन 5:35 पूर्वाह्न से 7 घंटे 40 मिनट चली; 24 घंटे में रुकने का समय क्या है?",
    "Stop time, 24-hour?": "रुकने का समय, 24 घंटे?",
    "Write four digits, and after noon add 12 to the hour.": "चार अंक लिखो, और अपराह्न में घंटे में 12 जोड़ो।",
    "Yes, it stops at 1315 hours.": "हाँ, यह 1315 घंटे पर रुकती है।",
    "On the 24-hour clock, how do you write 3:15 p.m.?": "24 घंटे की घड़ी पर 3:15 अपराह्न कैसे लिखोगे?",
    "3:15 p.m., 24-hour?": "3:15 अपराह्न, 24 घंटे?",
    "The 24-hour clock goes on counting past 12 after noon.": "अपराह्न में 24 घंटे की घड़ी 12 के आगे गिनती जारी रखती है।",
    "Find 3:15 on the line: which part is it in?": "रेखा पर 3:15 ढूँढो: यह किस भाग में है?",
    "Add 12 to an afternoon hour, then write the minutes.": "अपराह्न के घंटे में 12 जोड़ो, फिर मिनट लिखो।",
    "Yes, that is 1515 hours.": "हाँ, यह 1515 घंटे है।",
    "A lamp lit at 8:45 a.m., stays on 4 h 50 min; give its 24-hour off time.": "लैंप 8:45 पूर्वाह्न से 4 घंटे 50 मिनट जला; 24 घंटे वाला बंद होने का समय बताओ।",
    "Off time, 24-hour?": "बंद होने का समय, 24 घंटे?",
    "Four digits again: is the end time after noon?": "फिर से चार अंक: क्या समाप्ति समय अपराह्न में है?",
    "Yes, the lamp goes off at 1335 hours.": "हाँ, लैंप 1335 घंटे पर बंद होता है।",
    "Earth's turn": "पृथ्वी का चक्कर",
    "1 day": "1 दिन",
    "day": "दिन",
    "days": "दिन",
    "a.m.": "पूर्वाह्न",
    "p.m.": "अपराह्न",
    "last hour,": "आखिरी घंटा,",
    "close up": "बड़ा करके",
    "4 min": "4 मिनट",
    "less than a day": "एक दिन से कम",
    "second": "सेकंड",
    "minute": "मिनट",
    "hour": "घंटा",
    "calendar": "कैलेंडर",
    "60 s make 1 min": "60 सेकंड|= 1 मिनट",
    "60 min make 1 h": "60 मिनट|= 1 घंटा",
    "60 min": "60 मिनट",
    "before noon": "दोपहर से|पहले",
    "after noon": "दोपहर के|बाद",
    "days and months": "दिन और|महीने",
    "Given": "दिया है",
    "clock card": "घड़ी कार्ड",
    "24-hour clock": "24 घंटे की घड़ी",
    "Jump": "छलाँग",
    "Slide the Earth's bar under the day bar first.": "पहले पृथ्वी का चक्कर दिन की पट्टी के नीचे खिसकाओ।",
    "Tap the hours rung first.": "पहले घंटे वाले पायदान पर टैप करो।",
    "Now tap the minutes rung.": "अब मिनट वाले पायदान पर टैप करो।",
    "Turn the card with the ring first.": "पहले घेरे वाला कार्ड पलटो।",
    "Tap Jump first.": "पहले छलाँग पर टैप करो।",
    "Tap Jump again for the minutes.": "मिनटों के लिए फिर से छलाँग पर टैप करो।",
    "how long": "कितना समय",
  },
  gu: {
    "Clock Card Matcher": "ઘડિયાળ કાર્ડ મેળવો",
    "A day, a ladder of time and sixteen cards face down.": "એક દિવસ, સમયની સીડી અને ઊંધાં મૂકેલાં સોળ કાર્ડ.",
    "You matched clock cards, changed long lengths of time and wrote an end time.": "તમે ઘડિયાળ કાર્ડ મેળવ્યાં, લાંબો સમય બદલ્યો અને અંતનો સમય લખ્યો.",
    "Free play. Turn any two cards and find the pairs.": "મુક્ત રમત. કોઈ પણ બે કાર્ડ ફેરવો અને જોડી શોધો.",
    "Can a clock card match a time card?": "ઘડિયાળ કાર્ડ સમય કાર્ડ સાથે મળી શકે?",
    "The Earth's turn": "પૃથ્વીનું એક ચક્કર",
    "Long lengths of time": "લાંબો સમયગાળો",
    "Clock cards and time cards": "ઘડિયાળ કાર્ડ અને સમય કાર્ડ",
    "An end time on the 24-hour clock": "24 કલાકની ઘડિયાળ પર અંતનો સમય",
    "Are the two bars exactly the same? Which one is a little shorter?": "શું બંને પટ્ટીઓ બરાબર સરખી છે? કઈ થોડી ટૂંકી છે?",
    "One step at a time. Which unit comes next?": "એક વખતે એક પગલું. પછીનો એકમ કયો?",
    "Turn two cards. Do the hours and minutes match the time card?": "બે કાર્ડ ફેરવો. શું કલાક અને મિનિટ સમય કાર્ડ સાથે મળે છે?",
    "Jump the hours, then the minutes. Now write it on the twenty-four hour clock.": "પહેલાં કલાકનો કૂદકો, પછી મિનિટનો. હવે તેને 24 કલાકની ઘડિયાળ પર લખો.",
    "Tap the minute card to turn it over.": "મિનિટવાળું કાર્ડ ફેરવવા તેના પર ટૅપ કરો.",
    "The minute card is in the row of cards.": "મિનિટવાળું કાર્ડ કાર્ડની હારમાં છે.",
    "Now tap the hour card to see what it means.": "હવે કલાક કાર્ડ પર ટૅપ કરીને તેનો અર્થ જુઓ.",
    "Find the card that says hour.": "જેના પર કલાક લખ્યું છે તે કાર્ડ શોધો.",
    "Do the two bars end together in the last hour?": "છેલ્લા કલાકમાં બંને પટ્ટીઓ સાથે પૂરી થાય છે?",
    "Count the minutes between the two ends in the last hour.": "છેલ્લા કલાકમાં બંને છેડા વચ્ચેની મિનિટ ગણો.",
    "The Earth turns once in about 23 h 56 min, a little less than a clock day.": "પૃથ્વી લગભગ 23 કલાક 56 મિનિટમાં ફરે છે, ઘડિયાળના દિવસથી ઓછું.",
    "You learned: the Earth turns in about 23 h 56 min, less than a day.": "તમે શીખ્યા: પૃથ્વી લગભગ 23 કલાક 56 મિનિટમાં ફરે, દિવસથી ઓછું.",
    "A pupil says the Earth turns in exactly 1 day; what is better to say?": "બાળક કહે છે પૃથ્વી બરાબર 1 દિવસમાં ફરે છે; વધુ સારું શું?",
    "Better to say?": "વધુ સારું શું?",
    "About 23 h 56 min": "લગભગ 23 કલાક 56 મિનિટ",
    "Exactly 1 day": "બરાબર એક દિવસ",
    "Look at where the Earth's bar ends.": "જુઓ પૃથ્વીનું ચક્કર ક્યાં પૂરું થાય છે.",
    "Yes, 4 min short of a day is about 23 h 56 min.": "હા, દિવસથી 4 મિનિટ ઓછું એટલે લગભગ 23 કલાક 56 મિનિટ.",
    "How many hours make 1 day on a clock?": "ઘડિયાળ પર 1 દિવસમાં કેટલા કલાક હોય?",
    "Hours in 1 day?": "1 દિવસમાં કલાક?",
    "hours": "કલાક",
    "h": "કલાક",
    "Count the hour boxes on the day bar.": "દિવસની પટ્ટી પર કલાકનાં ખાનાં ગણો.",
    "One half of the day bar has 12 boxes.": "દિવસની પટ્ટીના અડધા ભાગમાં 12 ખાનાં છે.",
    "Add the boxes of both halves of the day.": "દિવસના બંને અડધા ભાગનાં ખાનાં ઉમેરો.",
    "Yes, a clock day has 24 h.": "હા, ઘડિયાળના એક દિવસમાં 24 કલાક હોય છે.",
    "Is the Earth's turn a little more or a little less than 1 day?": "પૃથ્વીનું એક ચક્કર 1 દિવસથી થોડું વધારે છે કે થોડું ઓછું?",
    "More or less?": "વધારે કે ઓછું?",
    "A little more": "થોડું વધારે",
    "A little less": "થોડું ઓછું",
    "Which bar ends first, the day or the Earth's turn?": "કઈ પટ્ટી પહેલાં પૂરી થાય છે, દિવસની કે પૃથ્વીના ચક્કરની?",
    "Look at the gap in the last hour.": "છેલ્લા કલાકમાં ખાલી જગ્યા જુઓ.",
    "Which bar would need 4 more minutes to reach the end?": "કઈ પટ્ટીને છેડે પહોંચવા 4 મિનિટ વધુ જોઈએ?",
    "Yes, the Earth's turn is a little less than a day.": "હા, પૃથ્વીનું એક ચક્કર એક દિવસથી થોડું ઓછું છે.",
    "Tap the hours rung to change 1 day 2 h to hours.": "1 દિવસ 2 કલાકને કલાકમાં બદલવા કલાકના પગથિયા પર ટૅપ કરો.",
    "The hours rung is just under the days.": "કલાકનું પગથિયું દિવસની બરાબર નીચે છે.",
    "Now tap the minutes rung for the next step.": "હવે આગલા પગલા માટે મિનિટના પગથિયા પર ટૅપ કરો.",
    "Minutes come after hours on the ladder.": "સીડી પર કલાક પછી મિનિટ આવે છે.",
    "2 days are 2 × 24 hours, then add the 3 h.": "2 દિવસ એટલે 2 × 24 કલાક, પછી 3 કલાક ઉમેરો.",
    "Multiply all those hours by 60 to get minutes.": "મિનિટ મેળવવા એ બધા કલાકને 60 વડે ગુણો.",
    "Multiply days by 24 for hours, then hours by 60 for minutes.": "દિવસ × 24 થી કલાક બને, અને કલાક × 60 થી મિનિટ.",
    "You learned: to change days to minutes, go through the hours.": "તમે શીખ્યા: દિવસને મિનિટમાં બદલવા કલાકમાંથી પસાર થાઓ.",
    "How many minutes are there in 2 days 3 h?": "2 દિવસ 3 કલાકમાં કેટલી મિનિટ હોય?",
    "Minutes in 2 days 3 h?": "2 દિવસ 3 કલાકમાં મિનિટ?",
    "minutes": "મિનિટ",
    "min": "મિનિટ",
    "Go down the ladder one rung at a time.": "સીડી પર એક-એક પગથિયું નીચે ઊતરો.",
    "Yes, 2 days 3 h is 3,060 min.": "હા, 2 દિવસ 3 કલાકમાં 3,060 મિનિટ થાય.",
    "How many hours are there in 10 days?": "10 દિવસમાં કેટલા કલાક હોય?",
    "Hours in 10 days?": "10 દિવસમાં કલાક?",
    "Each day on the ladder is worth 24 h.": "સીડી પર દરેક દિવસ 24 કલાક બરાબર છે.",
    "Find 10 groups of 24 h.": "24 કલાકનાં 10 જૂથ શોધો.",
    "Multiplying by 10 puts a zero after the number.": "10 વડે ગુણતાં સંખ્યા પછી એક શૂન્ય લાગે છે.",
    "Yes, 10 days is 240 h.": "હા, 10 દિવસમાં 240 કલાક થાય.",
    "How many hours are there in a year of 365 days?": "365 દિવસના એક વર્ષમાં કેટલા કલાક હોય?",
    "Hours in 365 days?": "365 દિવસમાં કલાક?",
    "A year has 365 days of 24 h each.": "એક વર્ષમાં 365 દિવસ છે, દરેક 24 કલાકનો.",
    "Find 365 × 24, one part at a time.": "365 × 24 એક-એક ભાગ કરીને શોધો.",
    "Work out 365 × 20 and 365 × 4, then add.": "365 × 20 અને 365 × 4 શોધો, પછી ઉમેરો.",
    "Yes, a year of 365 days is 8,760 h.": "હા, 365 દિવસના વર્ષમાં 8,760 કલાક થાય.",
    "Change the days to hours first.": "પહેલાં દિવસને કલાકમાં બદલો.",
    "Tap the card with the ring to turn it over.": "વર્તુળવાળું કાર્ડ ફેરવવા તેના પર ટૅપ કરો.",
    "Look for the card that has a ring round it.": "જેની આસપાસ વર્તુળ છે તે કાર્ડ શોધો.",
    "Now tap the next card with the ring for its match.": "હવે તેની જોડી માટે આગળના વર્તુળવાળા કાર્ડ પર ટૅપ કરો.",
    "The ring shows which card to turn.": "વર્તુળ બતાવે છે કે કયું કાર્ડ ફેરવવું.",
    "Count 60 min for each whole hour the short hand has passed.": "નાનો કાંટો જેટલા પૂરા કલાક વટાવી ગયો, દરેકની 60 મિનિટ ગણો.",
    "Then add the minutes the long hand shows.": "પછી મોટો કાંટો બતાવે તે મિનિટ ઉમેરો.",
    "A clock card matches the time passed after 12 o'clock, in minutes or in seconds.": "ઘડિયાળ કાર્ડ એટલે 12 વાગ્યા પછી વીતેલો સમય, મિનિટ કે સેકન્ડમાં.",
    "You learned: a clock card is the time passed after 12 o'clock.": "તમે શીખ્યા: ઘડિયાળ કાર્ડ એટલે 12 વાગ્યા પછી વીતેલો સમય.",
    "Turn the card with the ring; how many minutes after 12 o'clock is it?": "વર્તુળવાળું કાર્ડ ફેરવો; તે 12 વાગ્યા પછી કેટલી મિનિટ છે?",
    "Its time card?": "તેનું સમય કાર્ડ?",
    "time card": "સમય",
    "s": "સેકન્ડ",
    "Read the hours, then the minutes on the clock.": "ઘડિયાળ પર પહેલાં કલાક, પછી મિનિટ વાંચો.",
    "Yes, 25 min past 6 is 385 min.": "હા, 6 વાગીને 25 મિનિટ એટલે 385 મિનિટ.",
    "What does the next card with the ring show, in minutes?": "આગળનું વર્તુળવાળું કાર્ડ મિનિટમાં શું બતાવે છે?",
    "Time card in min?": "સમય કાર્ડ મિનિટમાં?",
    "Which number has the short hand just passed?": "નાનો કાંટો હમણાં કઈ સંખ્યા વટાવી ગયો?",
    "Each hour the short hand has passed is 60 min.": "નાના કાંટાએ વટાવેલો દરેક કલાક 60 મિનિટ છે.",
    "Add on the minutes the long hand points to.": "મોટો કાંટો જે મિનિટ પર છે તે ઉમેરો.",
    "Yes, 5 min past 2 is 125 min.": "હા, 2 વાગીને 5 મિનિટ એટલે 125 મિનિટ.",
    "Turn the last card with the ring and change its time into seconds.": "છેલ્લું વર્તુળવાળું કાર્ડ ફેરવો અને તેનો સમય સેકન્ડમાં બદલો.",
    "Time card in s?": "સમય કાર્ડ સેકન્ડમાં?",
    "Seconds are asked for this time, not minutes.": "આ વખતે સેકન્ડ પૂછી છે, મિનિટ નહીં.",
    "Minutes first, then change them to seconds.": "પહેલાં મિનિટ, પછી તેને સેકન્ડમાં બદલો.",
    "Each minute is 60 s, so multiply the minutes by 60.": "દરેક મિનિટ 60 સેકન્ડની છે, એટલે મિનિટને 60 વડે ગુણો.",
    "Yes, 35 min past 2 is 9,300 s.": "હા, 2 વાગીને 35 મિનિટ એટલે 9,300 સેકન્ડ.",
    "Tap Jump to jump 6 h from 7:25 a.m.": "7:25 પૂર્વાહ્નથી 6 કલાકના કૂદકા માટે કૂદકો પર ટૅપ કરો.",
    "The Jump key is under the time line.": "કૂદકાનું બટન સમયરેખા નીચે છે.",
    "Now tap Jump again for the 50 min.": "હવે 50 મિનિટ માટે ફરી કૂદકો પર ટૅપ કરો.",
    "One more jump, this time for the minutes.": "એક કૂદકો વધુ, આ વખતે મિનિટ માટે.",
    "Is the end in the part marked a.m., or p.m.?": "અંત પૂર્વાહ્નવાળા ભાગમાં છે કે અપરાહ્નવાળામાં?",
    "After noon, the 24-hour hour is 12 more than the hour on the line.": "અપરાહ્નમાં, 24 કલાકનો કલાક રેખા પરના કલાક કરતાં 12 વધારે હોય.",
    "Jump the hours, then the minutes, and write four digits and the word hours.": "કલાક, પછી મિનિટનો કૂદકો મારો, પછી ચાર અંક અને કલાક લખો.",
    "You learned: a 24-hour end time is four digits and the word hours.": "તમે શીખ્યા: 24 કલાકનો અંતનો સમય એટલે ચાર અંક અને શબ્દ કલાક.",
    "A machine runs 7 h 40 min from 5:35 a.m.; what is its 24-hour stop time?": "મશીન 5:35 પૂર્વાહ્નથી 7 કલાક 40 મિનિટ ચાલ્યું; 24 કલાકમાં અટકવાનો સમય કયો?",
    "Stop time, 24-hour?": "અટકવાનો સમય, 24 કલાક?",
    "Write four digits, and after noon add 12 to the hour.": "ચાર અંક લખો, અને અપરાહ્નમાં કલાકમાં 12 ઉમેરો.",
    "Yes, it stops at 1315 hours.": "હા, તે 1315 કલાકે અટકે છે.",
    "On the 24-hour clock, how do you write 3:15 p.m.?": "24 કલાકની ઘડિયાળ પર 3:15 અપરાહ્ન કેવી રીતે લખશો?",
    "3:15 p.m., 24-hour?": "3:15 અપરાહ્ન, 24 કલાક?",
    "The 24-hour clock goes on counting past 12 after noon.": "અપરાહ્નમાં 24 કલાકની ઘડિયાળ 12 પછી પણ ગણતી રહે છે.",
    "Find 3:15 on the line: which part is it in?": "રેખા પર 3:15 શોધો: તે કયા ભાગમાં છે?",
    "Add 12 to an afternoon hour, then write the minutes.": "અપરાહ્નના કલાકમાં 12 ઉમેરો, પછી મિનિટ લખો.",
    "Yes, that is 1515 hours.": "હા, તે 1515 કલાક છે.",
    "A lamp lit at 8:45 a.m., stays on 4 h 50 min; give its 24-hour off time.": "દીવો 8:45 પૂર્વાહ્નથી 4 કલાક 50 મિનિટ ચાલુ રહ્યો; 24 કલાકનો સમય લખો.",
    "Off time, 24-hour?": "બુઝાવાનો સમય, 24 કલાક?",
    "Four digits again: is the end time after noon?": "ફરી ચાર અંક: અંતનો સમય અપરાહ્નમાં છે?",
    "Yes, the lamp goes off at 1335 hours.": "હા, દીવો 1335 કલાકે બંધ થાય છે.",
    "Earth's turn": "પૃથ્વીનું ચક્કર",
    "1 day": "1 દિવસ",
    "day": "દિવસ",
    "days": "દિવસ",
    "a.m.": "પૂર્વાહ્ન",
    "p.m.": "અપરાહ્ન",
    "last hour,": "છેલ્લો કલાક,",
    "close up": "મોટું કરીને",
    "4 min": "4 મિનિટ",
    "less than a day": "એક દિવસથી ઓછું",
    "second": "સેકન્ડ",
    "minute": "મિનિટ",
    "hour": "કલાક",
    "calendar": "કૅલેન્ડર",
    "60 s make 1 min": "60 સેકન્ડ|= 1 મિનિટ",
    "60 min make 1 h": "60 મિનિટ|= 1 કલાક",
    "60 min": "60 મિનિટ",
    "before noon": "બપોર|પહેલાં",
    "after noon": "બપોર|પછી",
    "days and months": "દિવસ અને|મહિના",
    "Given": "આપેલું",
    "clock card": "ઘડિયાળ કાર્ડ",
    "24-hour clock": "24 કલાકની ઘડિયાળ",
    "Jump": "કૂદકો",
    "Slide the Earth's bar under the day bar first.": "પહેલાં પૃથ્વીનું ચક્કર દિવસની પટ્ટી નીચે ખસેડો.",
    "Tap the hours rung first.": "પહેલાં કલાકના પગથિયા પર ટૅપ કરો.",
    "Now tap the minutes rung.": "હવે મિનિટના પગથિયા પર ટૅપ કરો.",
    "Turn the card with the ring first.": "પહેલાં વર્તુળવાળું કાર્ડ ફેરવો.",
    "Tap Jump first.": "પહેલાં કૂદકો પર ટૅપ કરો.",
    "Tap Jump again for the minutes.": "મિનિટ માટે ફરી કૂદકો પર ટૅપ કરો.",
    "how long": "કેટલો સમય",
  },
};

const PHASES = [
  {
    n: 1,
    concept: "The Earth's turn",
    conceptId: "M3.S6.T10.C45", objectiveIds: ["O17"],
    says: ["Are the two bars exactly the same? Which one is a little shorter?"],
    steps: [
      { say: "Tap the minute card to turn it over.", on: "word-minute", hint: "The minute card is in the row of cards." },
      { say: "Now tap the hour card to see what it means.", on: "word-hour", hint: "Find the card that says hour." },
    ],
    ladder: ["Do the two bars end together in the last hour?", "Count the minutes between the two ends in the last hour."],
    closing: "The Earth turns once in about 23 h 56 min, a little less than a clock day.",
    learned: "You learned: the Earth turns in about 23 h 56 min, less than a day.",
    traceback: "the Earth's bar lies under the day bar, the last hour is drawn large with its 4 min gap lit amber, then 23 h 56 min and less than a day are written; for the hours, every hour box is numbered",
    items: [
      /* learn CC1: answer in the plan = The Earth turns once round in about 23 h 56 min, a little less than a day. A clock still counts 1 day as 24 h. */
      { qid: "M3.S6.T10.C45:CC1", kind: "slide", say: "A pupil says the Earth turns in exactly 1 day; what is better to say?", ask: "Better to say?",
        answer: "about", choices: [{ id: "about", label: "About 23 h 56 min" }, { id: "exact", label: "Exactly 1 day" }], near: "exact",
        miss: "Look at where the Earth's bar ends.", win: "Yes, 4 min short of a day is about 23 h 56 min." },
      /* practice 1: answer in the plan = 24 h, because 1 day is 24 h */
      { qid: "M3.S6.T10.C45:1", kind: "count", say: "How many hours make 1 day on a clock?", ask: "Hours in 1 day?",
        parts: [{ label: "1 day", unit: "h" }], answer: [24], near: "23",
        miss: "Count the hour boxes on the day bar.", ladder: ["One half of the day bar has 12 boxes.", "Add the boxes of both halves of the day."],
        win: "Yes, a clock day has 24 h." },
      /* practice 5: answer in the plan = A little less: it takes about 23 h 56 min, a little less than a day */
      { qid: "M3.S6.T10.C45:5", kind: "slide", say: "Is the Earth's turn a little more or a little less than 1 day?", ask: "More or less?",
        answer: "less", choices: [{ id: "more", label: "A little more" }, { id: "less", label: "A little less" }], near: "more",
        miss: "Which bar ends first, the day or the Earth's turn?", ladder: ["Look at the gap in the last hour.", "Which bar would need 4 more minutes to reach the end?"],
        win: "Yes, the Earth's turn is a little less than a day." },
    ],
  },
  {
    n: 2,
    concept: "Long lengths of time",
    conceptId: "M3.S6.T10.C46", objectiveIds: ["O17"],
    says: ["One step at a time. Which unit comes next?"],
    steps: [
      { say: "Tap the hours rung to change 1 day 2 h to hours.", on: "rung-h", hint: "The hours rung is just under the days." },
      { say: "Now tap the minutes rung for the next step.", on: "rung-min", hint: "Minutes come after hours on the ladder." },
    ],
    warm: { days: 1, hrs: 2, to: "min" },
    ladder: ["2 days are 2 × 24 hours, then add the 3 h.", "Multiply all those hours by 60 to get minutes."],
    closing: "Multiply days by 24 for hours, then hours by 60 for minutes.",
    learned: "You learned: to change days to minutes, go through the hours.",
    traceback: "the hours rung lights amber and the days are changed to hours with the working written beside it, then the hours to minutes, ending on the answer in green",
    items: [
      /* learn CC2: answer in the plan = 3060 min. */
      { qid: "M3.S6.T10.C46:CC2", kind: "ladder", days: 2, hrs: 3, to: "min", say: "How many minutes are there in 2 days 3 h?", ask: "Minutes in 2 days 3 h?",
        parts: [{ label: "how long", unit: "min" }], answer: [3060], near: "51",
        miss: "Go down the ladder one rung at a time.",
        win: "Yes, 2 days 3 h is 3,060 min." },
      /* practice 2: answer in the plan = 240 h, because 10 x 24 = 240 */
      { qid: "M3.S6.T10.C46:2", kind: "ladder", days: 10, hrs: 0, to: "h", say: "How many hours are there in 10 days?", ask: "Hours in 10 days?",
        parts: [{ label: "how long", unit: "h" }], answer: [240], near: "600",
        miss: "Each day on the ladder is worth 24 h.", ladder: ["Find 10 groups of 24 h.", "Multiplying by 10 puts a zero after the number."],
        win: "Yes, 10 days is 240 h." },
      /* practice 6: answer in the plan = 8760 h, because 365 x 24 = 8760 */
      { qid: "M3.S6.T10.C46:6", kind: "ladder", days: 365, hrs: 0, to: "h", say: "How many hours are there in a year of 365 days?", ask: "Hours in 365 days?",
        parts: [{ label: "how long", unit: "h" }], answer: [8760], near: "21900",
        miss: "A year has 365 days of 24 h each.", ladder: ["Find 365 × 24, one part at a time.", "Work out 365 × 20 and 365 × 4, then add."],
        win: "Yes, a year of 365 days is 8,760 h." },
    ],
  },
  {
    n: 3,
    concept: "Clock cards and time cards",
    conceptId: "M3.S6.T10.C47", objectiveIds: ["O18"],
    says: ["Turn two cards. Do the hours and minutes match the time card?"],
    steps: [
      { say: "Tap the card with the ring to turn it over.", on: "card", hint: "Look for the card that has a ring round it." },
      { say: "Now tap the next card with the ring for its match.", on: "card", hint: "The ring shows which card to turn." },
    ],
    stepHold: 2400,
    ladder: ["Count 60 min for each whole hour the short hand has passed.", "Then add the minutes the long hand shows."],
    closing: "A clock card matches the time passed after 12 o'clock, in minutes or in seconds.",
    learned: "You learned: a clock card is the time passed after 12 o'clock.",
    traceback: "the minute hand lights amber and the hour hand's step past its number is drawn, then the hours are changed to minutes and the minutes added, ending on the time card in green",
    items: [
      /* learn CC3: answer in the plan = 385 min. (the clock card shows 25 min past 6) */
      { qid: "M3.S6.T10.C47:CC3", kind: "card", pair: 1, say: "Turn the card with the ring; how many minutes after 12 o'clock is it?", ask: "Its time card?",
        parts: [{ label: "time card", unit: "min" }], answer: [385], near: "360",
        miss: "Read the hours, then the minutes on the clock.",
        win: "Yes, 25 min past 6 is 385 min." },
      /* practice 3: answer in the plan = 125 min, because 2 x 60 = 120 and 120 + 5 = 125 (5 min past 2) */
      { qid: "M3.S6.T10.C47:3", kind: "card", pair: 2, say: "What does the next card with the ring show, in minutes?", ask: "Time card in min?",
        parts: [{ label: "time card", unit: "min" }], answer: [125], near: "120",
        miss: "Which number has the short hand just passed?", ladder: ["Each hour the short hand has passed is 60 min.", "Add on the minutes the long hand points to."],
        win: "Yes, 5 min past 2 is 125 min." },
      /* practice 7: answer in the plan = 9300 s, because 2 h 35 min is 155 min and 155 x 60 = 9300 (35 min past 2) */
      { qid: "M3.S6.T10.C47:7", kind: "card", pair: 3, say: "Turn the last card with the ring and change its time into seconds.", ask: "Time card in s?",
        parts: [{ label: "time card", unit: "s" }], answer: [9300], near: "155",
        miss: "Seconds are asked for this time, not minutes.", ladder: ["Minutes first, then change them to seconds.", "Each minute is 60 s, so multiply the minutes by 60."],
        win: "Yes, 35 min past 2 is 9,300 s." },
    ],
  },
  {
    n: 4,
    concept: "An end time on the 24-hour clock",
    conceptId: "M3.S6.T10.C48", objectiveIds: ["O18"],
    says: ["Jump the hours, then the minutes. Now write it on the twenty-four hour clock."],
    steps: [
      { say: "Tap Jump to jump 6 h from 7:25 a.m.", on: "jump-h", hint: "The Jump key is under the time line." },
      { say: "Now tap Jump again for the 50 min.", on: "jump-min", hint: "One more jump, this time for the minutes." },
    ],
    warm: { start: [7, 25], len: [6, 50] },
    stepHold: 2400,
    ladder: ["Is the end in the part marked a.m., or p.m.?", "After noon, the 24-hour hour is 12 more than the hour on the line."],
    closing: "Jump the hours, then the minutes, and write four digits and the word hours.",
    learned: "You learned: a 24-hour end time is four digits and the word hours.",
    traceback: "the jumps are drawn to the 12-hour end time, which lights amber, the hour has 12 added to it, and the end time is written green in four digits and the word hours",
    items: [
      /* learn CC4: answer in the plan = 1315 hours. (5:35 a.m. + 7 h 40 min) */
      { qid: "M3.S6.T10.C48:CC4", kind: "jump", start: [5, 35], len: [7, 40], h24: true,
        say: "A machine runs 7 h 40 min from 5:35 a.m.; what is its 24-hour stop time?", ask: "Stop time, 24-hour?",
        answer: "1315", near: "115",
        miss: "Write four digits, and after noon add 12 to the hour.",
        win: "Yes, it stops at 1315 hours." },
      /* practice 4: answer in the plan = 1515 hours, because 3 + 12 = 15 */
      { qid: "M3.S6.T10.C48:4", kind: "read", at: [15, 15], h24: true,
        say: "On the 24-hour clock, how do you write 3:15 p.m.?", ask: "3:15 p.m., 24-hour?",
        answer: "1515", near: "315",
        miss: "The 24-hour clock goes on counting past 12 after noon.", ladder: ["Find 3:15 on the line: which part is it in?", "Add 12 to an afternoon hour, then write the minutes."],
        win: "Yes, that is 1515 hours." },
      /* practice 8: answer in the plan = 1335 hours, because 4 h 50 min after 8:45 a.m. is 1:35 p.m., and 1:35 p.m. is 1335 hours */
      { qid: "M3.S6.T10.C48:8", kind: "jump", start: [8, 45], len: [4, 50], h24: true,
        say: "A lamp lit at 8:45 a.m., stays on 4 h 50 min; give its 24-hour off time.", ask: "Off time, 24-hour?",
        answer: "1335", near: "135",
        miss: "Four digits again: is the end time after noon?",
        win: "Yes, the lamp goes off at 1335 hours." },
    ],
  },
];

/* The numbers the working area needs (they go into the sidecar too). */
const MODEL = { dayHours: 24, earthTurn: "23 h 56 min", pairs: CC_PAIRS, words: CC_WORDS.map((w: any) => w.word) };

/* ── the maths ──────────────────────────────────────────────────────────────────────────── */

/* judge: a 24-hour time is the typed STRING, four digits, leading zeros kept (owner, 2026-11-16) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (item.h24) { const s = String(v ?? "").trim(); return /^\d{4}$/.test(s) && s === item.answer; }
  if (item.choices) return String(v) === String(item.answer);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer again, by minutes counted in a loop (no code shared with judge or Work) */
const oracle = () => {
  const P = PHASES as any[];
  let dayMin = 0; for (let k = 0; k < 24 * 60; k++) dayMin++;
  const earthMin = 23 * 60 + 56;
  let boxes = 0; for (let half = 0; half < 2; half++) for (let k = 0; k < 12; k++) boxes++;
  const p1 = P[0].items[0].answer === (earthMin < dayMin ? "about" : "exact") && P[0].items[1].answer[0] === boxes
    && P[0].items[2].answer === (earthMin < dayMin ? "less" : "more");
  const p2 = P[1].items.every((it: any) => {
    let m = it.hrs * 60; for (let d = 0; d < it.days; d++) m += 1440;
    return it.answer[0] === (it.to === "min" ? m : m / 60);
  });
  const p3 = P[2].items.every((it: any) => {
    const p = CC_PAIRS[it.pair]; let s = 0;
    for (let k = 0; k < p.h * 60 + p.m; k++) s += 60;
    return it.answer[0] === (p.unit === "s" ? s : s / 60) && it.parts[0].unit === p.unit;
  });
  const p4 = P[3].items.every((it: any) => {
    const t = it.len ? (it.start[0] * 60 + it.start[1] + it.len[0] * 60 + it.len[1]) % 1440 : it.at[0] * 60 + it.at[1];
    return it.answer === ccPad2(Math.floor(t / 60)) + ccPad2(t % 60);
  });
  return p1 && p2 && p3 && p4;
};
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => (item.near !== undefined ? item.near : item.parts ? String(item.answer[0] + 1) : "~");
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.choices ? []
  : item.h24 ? [item.answer, item.answer.slice(0, 2) + ":" + item.answer.slice(2)]
  : item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : [String(item.answer)]);
/* the answer as the teacher agent gives it */
const agentKey = (item: any) => item.answer;
/* the slot: a choice shows its label; a 24-hour answer shows four places and the word hours ("13__ hours") */
const format = (v: any, j: any, o: any) => {
  const it = CC_NOW.item;
  if (it && it.choices) { const c = it.choices.find((x: any) => String(x.id) === String(v)); return c ? c.label : v; }
  if (it && it.h24 && j === undefined) {
    const d = String(v ?? "").replace(/\D/g, "").slice(0, 4);
    /* empty stays empty (a miss clears the slot); the four places and "hours" show from the first digit */
    if (!d) return "";
    return (d + "____").slice(0, 4) + " " + (o && o.tx ? o.tx("hours") : "hours");
  }
  return v;
};

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : (HOOK.force && HOOK.force(), T.submit(item.answer)));
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check(): at a question it performs the act at once (the agent is never gated), then Enter answers */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area ──────────────────────────────────────────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, api, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  /* a label made of numbers and unit words ("2 days 3 h", "5:35 a.m."): each word through TR, the digits as they are */
  const tu = (v: string) => String(v).split(" ").map((w: string) => tx(w)).join(" ");
  const free = stage === "free";
  const warm = !free && (stage === "demo" || stage === "teach");
  const P: any = PHASES[n - 1];
  const it: any = free ? {} : warm ? P.warm || {} : item;
  const stepNo = stage === "teach" ? 0 : step || 0;
  const W0 = box ? box.w : 1472, H0 = box ? box.h : 520;
  const kx = box && box.key ? box.key.x - 12 : W0;
  CC_NOW.item = free || warm ? null : item;

  /* the board belongs to the question ENTRY (PATTERNS §18): a fresh state each time a question key comes round */
  const qk = free ? "free" : n + "." + (warm ? "w" : index);
  const ent = useRef({ qk: "", k: 0 });
  /* when this question opened (a warm-up or free play holds nothing): every act press and the act nudge are held back 750 ms after it (a 600 ms double press stays quiet) */
  const opened = useRef(0);
  if (ent.current.qk !== qk) { ent.current = { qk, k: ent.current.k + 1 }; opened.current = warm || free ? 0 : Date.now(); }
  const held = () => Date.now() - opened.current < 750;
  /* one tap counts once: a second press within 400 ms (a double tap) is dropped */
  const lastTap = useRef(0);
  const once = () => { const t = Date.now(); if (t - lastTap.current < 400) return false; lastTap.current = t; return true; };
  const quiet = () => held() || Date.now() - lastTap.current < 400;
  const tag = qk + "#" + ent.current.k;
  const fresh = () => ({ tag, done: 0, moving: false, pen: 0, pc: 0, tb: 0, spin: 0, nudged: false, fup: [], fm: [], fread: -1 });
  const [raw, setRaw] = useState<any>(fresh);
  const S = raw.tag === tag ? raw : fresh();
  const put = (o: any) => setRaw((p: any) => ({ ...(p.tag === tag ? p : fresh()), ...o }));
  const busy = useRef(false);
  const [trayUp, setTrayUp] = useState<any>({});
  const [, setGateN] = useState(0);
  /* a restart or a phase dot mounts Work afresh: the gate starts unarmed again (PLAYBOOK) */
  useEffect(() => { CC_GATE.touched = false; }, []);
  /* the traceback holds the pad: the gate never unlocks under it */
  const tbRun = useRef(false);
  /* the question comes back by itself after a nudge has been read */
  const nudgeT = useRef<any>(0);
  useEffect(() => () => clearTimeout(nudgeT.current), []);
  useEffect(() => () => { tl.stop(); busy.current = false; }, [qk]);

  const prog = warm ? stepNo : S.done;
  /* how many acts the question needs before its answer (0 = ungated) */
  const need = free || warm ? 0 : n === 1 ? (it.kind === "slide" ? 1 : 0) : n === 2 ? (it.to === "min" ? 2 : 1) : n === 3 ? 1 : it.len ? 2 : 0;
  const actDone = prog >= need;
  const tbOn = !!wrong && stage === "ask";
  const won = !free && !warm && (stage === "win" || stage === "idle");

  const touch = () => {
    if (CC_GATE.touched) return;
    let m = "";
    try { m = (window as any).toolApi.getState().mode; } catch (e) { m = ""; }
    if (m === "user") { CC_GATE.touched = true; setGateN((g: number) => g + 1); }
  };
  /* the answer gate (PATTERNS §19): locked only in user mode, after a real touch, while the act waits */
  useEffect(() => {
    if (free || stage !== "ask" || tbRun.current) return;
    api.lock(need > 0 && !actDone && CC_GATE.touched);
  }, [tag, stage, actDone, CC_GATE.touched]);
  /* while the gate holds, a tap on the dim Answer key or a real Enter says which act comes first (one literal a case, for TR) */
  const gated = !free && stage === "ask" && need > 0 && !actDone && CC_GATE.touched;
  const sayQ = () => { clearTimeout(nudgeT.current); put({ nudged: false }); api.say(it.say); };
  const nudge = () => {
    put({ nudged: true });
    let len = 40;
    if (n === 1) { api.say("Slide the Earth's bar under the day bar first."); len = 47; }
    else if (n === 2 && prog === 0) { api.say("Tap the hours rung first."); len = 25; }
    else if (n === 2) { api.say("Now tap the minutes rung."); len = 25; }
    else if (n === 3) { api.say("Turn the card with the ring first."); len = 34; }
    else if (prog === 0) { api.say("Tap Jump first."); len = 15; }
    else { api.say("Tap Jump again for the minutes."); len = 31; }
    clearTimeout(nudgeT.current);
    nudgeT.current = setTimeout(() => sayQRef.current(), Math.max(2600, 68 * len));
  };
  const sayQRef = useRef(sayQ);
  sayQRef.current = sayQ;
  const quietRef = useRef(quiet);
  quietRef.current = quiet;
  const nudgeRef = useRef(nudge);
  nudgeRef.current = nudge;
  useEffect(() => {
    if (!gated) return;
    const onKey = (e: any) => {
      if (!e.isTrusted || e.repeat || (e.key !== "Enter" && e.key !== " ")) return;
      const onHint = e.target && e.target.closest && e.target.closest('[data-control="again"]');
      if (onHint) { setTimeout(() => sayQRef.current(), 0); return; }
      if (e.key === "Enter" && !quietRef.current()) nudgeRef.current();
    };
    const onDown = (e: any) => {
      const el = e.target && e.target.closest ? e.target : null;
      if (!e.isTrusted || !el) return;
      if (el.closest('[data-control="again"]')) { setTimeout(() => sayQRef.current(), 0); return; }
      if (quietRef.current()) return;
      if (el.closest('[data-control="answer-open"]')) nudgeRef.current();
      else if (n === 3 && el.closest('[data-zone="work"]') && !el.closest("[data-control]")) nudgeRef.current();
    };
    window.addEventListener("keydown", onKey, true);
    window.addEventListener("pointerdown", onDown, true);
    return () => { window.removeEventListener("keydown", onKey, true); window.removeEventListener("pointerdown", onDown, true); };
  }, [gated, tag]);

  /* an act performed on screen; done() runs only when it ends */
  const viaAct = (o: any, done: () => void, onStart?: () => void) => {
    if (busy.current) return;
    busy.current = true;
    if (onStart) onStart();
    api.act(o).then((ok: boolean) => { busy.current = false; if (ok) done(); else put({ moving: false, pen: 0 }); });
  };
  const sayBack = () => { if (S.nudged) { put({ nudged: false }); api.say(it.say); } };

  /* ── phase 1 geometry ── */
  const bx = 40, L1 = Math.max(600, Math.min(1100, W0 - 200)), dayY = 44, dayH = 60, eY = 126, eH = 50;
  const eLen = (L1 * 1436) / 1440, dockY = 214;
  const slid = n === 1 && (S.done >= 1 || tbOn || (won && it.kind === "slide"));
  const earthX = bx, earthY = slid ? eY : dockY;
  const trayOpen = W0 < 1300, trayY = trayOpen ? 328 : 340, trayH = trayOpen ? 184 : 164, trayG = 12, trayW = Math.min(210, (W0 - 50 - 5 * trayG) / 6);
  const wordX = (k: number) => 20 + k * (trayW + trayG);
  const trayBase = (id: string) => (!warm ? id === "minute" || id === "hour" : (id === "minute" && stepNo >= 1) || (id === "hour" && stepNo >= 2));
  const isUp = (id: string) => (trayUp[id] !== undefined ? trayUp[id] : trayBase(id));
  const earthBar = (x: number, y: number, lit: boolean) => (
    <g>
      <rect x={x} y={y} width={eLen} height={eH} rx={12} fill={lit ? "url(#ccAmberGrad)" : "url(#ccBlueGrad)"} stroke={ccDeep(lit ? CC_AMBER : CC_BLUE)} strokeWidth={3} filter="url(#ccShadowSoft)" />
      <rect x={x + 3} y={y + 3} width={eLen - 6} height={eH / 2 - 3} rx={9} fill="#FFFFFF" opacity={0.2} />
      <text x={x + 22} y={y + eH / 2 + 11} fontSize={T.micro} fontWeight={700} fill={lit ? CC_INK : "#FFFFFF"}>{tx("Earth's turn")}</text>
    </g>
  );
  const slide = (real: boolean) => {
    if (real && (held() || !once())) return;
    if (real) touch();
    if (stage === "demo") { api.did("slide"); return; }
    if (n !== 1 || it.kind !== "slide" || S.done >= 1 || stage !== "ask") return;
    viaAct({ tool: "hand", moves: "push", from: { x: bx + eLen / 2, y: dockY + eH / 2 }, at: [{ x: bx + eLen / 2, y: eY + eH / 2 }],
      to: { x: bx + eLen / 2, y: eY + eH / 2 }, hold: <g>{earthBar(-eLen / 2, -eH / 2, false)}</g> },
    () => { put({ done: 1, moving: false }); api.sfx.settle(); sayBack(); }, () => put({ moving: true }));
  };
  const tapWord = (w: any, real: boolean) => {
    if (real && (held() || !once())) return;
    if (real) touch();
    const on = "word-" + w.id;
    if (stage === "demo" && stepOn !== on) { api.did(on); return; }
    const k = CC_WORDS.indexOf(w);
    viaAct({ tool: "hand", moves: "tap", at: [{ x: wordX(k) + trayW / 2, y: trayY + trayH / 2 }] }, () => {
      api.sfx.tick();
      if (stage === "demo") api.did(on);
      else setTrayUp((p: any) => ({ ...p, [w.id]: !isUp(w.id) }));
    });
  };

  /* ── phase 2 geometry ── */
  const rx = 30, rw = 360, rh = 110, rys = [20, 200, 380], wx = 430;
  const hText = (q: any) => q.days + " × 24" + (q.hrs ? " + " + q.hrs : "");
  const hTot = (q: any) => q.days * 24 + (q.hrs || 0);
  const rung = (which: string, real: boolean) => {
    if (real && (held() || !once())) return;
    if (real) touch();
    if (stage === "demo" && stepOn !== which) { api.did(which); return; }
    if (stage !== "demo" && stage !== "ask") return;
    const k = which === "rung-h" ? 1 : 2;
    if (prog >= k) return;
    if (k === 2 && it.to !== "min") return;
    if (prog + 1 !== k) { if (stage === "ask") { put({ nudged: true }); api.say("Change the days to hours first."); } return; }
    const size = 56, y = rys[k] + rh / 2 + size * 0.36;
    viaAct({ tool: "pencil", moves: "write", text: k === 1 ? hText(it) : "× 60", at: [{ x: wx, y }], size, align: "start",
      onPoint: (j: number) => put({ pc: j + 1 }) },
    () => { put({ pen: 0, done: Math.max(S.done, k) }); if (stage === "demo") api.did(which); else sayBack(); },
    () => put({ pen: k, pc: 0 }));
  };

  /* ── phase 3 ── */
  const qPair = n === 3 && !free ? (warm ? CC_PAIRS[0] : CC_PAIRS[it.pair]) : null;
  const target = n === 3 && !free ? (warm ? (stepNo === 0 ? CC_PAIRS[0].c : stepNo === 1 ? CC_PAIRS[0].t : -1) : (!S.done && stage === "ask" ? qPair.c : -1)) : -1;
  const turn = (real: boolean) => {
    if (real && (held() || !once())) return;
    if (real) touch();
    if (stage === "demo" && stepOn !== "card") { api.did("card"); return; }
    if (target < 0) return;
    const p = ccCardXY(target);
    viaAct({ tool: "hand", moves: "tap", at: [{ x: p.x + CC_CW / 2, y: p.y + CC_CH / 2 }] }, () => {
      api.sfx.tick();
      if (stage === "demo") api.did("card"); else { put({ done: 1 }); sayBack(); }
    });
  };
  /* a wrong pair stays face up 1.3 s, also under reduced motion (a rule of the game, not an animation, so not on the timeline) */
  const flipBack = useRef<any>(0);
  useEffect(() => () => clearTimeout(flipBack.current), []);
  const freeTap = (i: number) => {
    if (S.fup.indexOf(i) >= 0 || S.fm.indexOf(ccPairOf(i)) >= 0 || S.fup.length >= 2) return;
    const p = ccCardXY(i);
    viaAct({ tool: "hand", moves: "tap", at: [{ x: p.x + CC_CW / 2, y: p.y + CC_CH / 2 }] }, () => {
      api.sfx.tick();
      const up = [...S.fup, i], isClock = CC_PAIRS.some((q: any) => q.c === i);
      const fread = isClock ? i : S.fread;
      if (up.length === 2) {
        if (ccPairOf(up[0]) === ccPairOf(up[1])) { api.sfx.trade(); put({ fup: [], fm: [...S.fm, ccPairOf(i)], fread }); }
        else { put({ fup: up, fread }); clearTimeout(flipBack.current); flipBack.current = setTimeout(() => put({ fup: [] }), 1300); }
      } else put({ fup: up, fread });
    });
  };

  /* ── phase 4 geometry ── */
  const startT = n === 4 && !free ? (it.len ? it.start[0] * 60 + it.start[1] : it.at[0] * 60 + it.at[1]) : 0;
  const land1 = it.len ? startT + it.len[0] * 60 : startT, endT = it.len ? land1 + it.len[1] : startT;
  const ws = it.len ? Math.floor(startT / 60) * 60 : 12 * 60, we = it.len ? Math.ceil(endT / 60) * 60 : 16 * 60;
  const lx0 = 60, lx1 = W0 - 60, bandY = 170, bandH = 60, lineY = bandY + bandH;
  const X = (t: number) => lx0 + ((t - ws) / (we - ws)) * (lx1 - lx0);
  const jumps = n === 4 ? (tbOn || won ? 2 : prog) : 0;
  const jumpKey = n === 4 && !free && it.len && prog < 2 && !tbOn && !won && (stage === "ask" || stage === "demo");
  const jumpId = prog === 0 ? "jump-h" : "jump-min";
  const jump = (real: boolean) => {
    if (real && (held() || !once())) return;
    if (real) touch();
    if (stage === "demo" && stepOn !== jumpId) { api.did(jumpId); return; }
    if (!it.len || prog >= 2) return;
    const k = prog + 1, a = k === 1 ? startT : land1, b = k === 1 ? land1 : endT;
    viaAct({ tool: "hand", moves: "carry", from: { x: X(a), y: lineY }, at: [{ x: X(b), y: lineY }], to: { x: X(b), y: lineY },
      hold: <circle cx={0} cy={0} r={14} fill={CC_VIOLET} stroke="#FFFFFF" strokeWidth={3} /> },
    () => { api.sfx.settle(); put({ done: Math.max(S.done, k) }); if (stage === "demo") api.did(k === 1 ? "jump-h" : "jump-min"); else sayBack(); });
  };

  /* a guide step's act from Enter, the agent's check() and the dev solve() */
  const act = (on: any) => {
    if (n === 1) { const w = CC_WORDS.find((x: any) => "word-" + x.id === on); if (w) tapWord(w, false); }
    else if (n === 2) rung(on, false);
    else if (n === 3) turn(false);
    else jump(false);
  };
  api.onEnter(stage === "demo" && stepOn ? () => { const ev: any = (window as any).event; if (ev && ev.isTrusted) { if (held() || !once()) return; touch(); } act(stepOn); } : null);
  /* the agent and the dev driver: the question's act at once, never gated */
  const force = () => { if (stage === "ask" && need > 0 && S.done < need) { put({ done: need, moving: false, pen: 0 }); api.lock(false); } };
  HOOK.force = force;
  HOOK.check = stage === "ask" ? () => { force(); return undefined; } : null;
  HOOK.demo = () => { if (stage === "demo" && stepOn) act(stepOn); };

  /* a 24-hour answer is four digits: the box never holds more */
  useEffect(() => {
    if (it.h24 && stage === "ask" && typed && String(typed).length > 4) api.setTyped(String(typed).slice(0, 4));
  }, [typed]);

  /* the traceback */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    tbRun.current = true;
    const steps = n === 1 ? 3 : n === 2 ? (it.to === "min" ? 2 : 1) : n === 3 ? 2 : 3;
    put({ tb: 0, done: Math.max(S.done, need) });
    tl.run(Array.from({ length: steps }, (_, k) => [750, () => put({ tb: k + 1 })]) as any, () => { tbRun.current = false; api.lock(false); });
  }, [wrong]);

  /* the win line (one sentence), and the last pair's delight: every card turns and the clocks tick round */
  useEffect(() => {
    if (stage !== "win" || free || warm) return;
    api.say(item.win);
    if (n === 3 && index === 2) tl.run(Array.from({ length: 9 }, (_, k) => [220, () => put({ spin: k + 1 })]) as any);
  }, [stage, tag]);

  api.share({
    phase: n,
    day_bar: n === 1 ? { slid } : null,
    ladder: n === 2 ? { steps: prog } : null,
    cards: n === 3 ? { turned: !free && !warm ? !!S.done : null } : null,
    pairs: n === 3 ? (free ? S.fm.length : null) : null,
    jumps: n === 4 ? jumps : null,
    complete: stage === "idle",
  });

  /* ── drawing ── */
  const tb = tbOn ? S.tb : 0;
  const lit = (k: number) => tbOn && tb >= k;

  const drawP1 = () => {
    const cw = L1 / 24, sx = bx + 196, sw = Math.min(600, W0 - sx - 140);
    const showInset = slid;
    const gapX = sx + (sw * 56) / 60;
    const earthLit = tbOn && tb >= 1;
    return (
      <g>
        {/* the day bar: 24 hour boxes, the first half a.m. (warm white), the second p.m. (rose) */}
        <text x={bx} y={dayY - 12} fontSize={T.label} fontWeight={700} fill={CC_INK}>{tx("1 day")}</text>
        <g filter="url(#ccShadowSoft)">
          {Array.from({ length: 24 }, (_, k) => (
            <rect key={k} x={bx + k * cw} y={dayY} width={cw} height={dayH} fill={k < 12 ? CC_AMW : CC_ROSE} stroke={CC_INK} strokeWidth={2.4} />
          ))}
          <rect x={bx} y={dayY} width={L1} height={dayH} rx={4} fill="none" stroke={CC_INK} strokeWidth={4.5} />
        </g>
        <rect x={bx + L1 / 4 - (ccTW(tx("a.m."), 28) + 20) / 2} y={dayY + (lang === "en" ? 8 : 5)} width={ccTW(tx("a.m."), 28) + 20} height={lang === "en" ? 44 : 50} rx={10} fill={CC_PAPER} stroke={CC_INK} strokeWidth={2} />
        <text x={bx + L1 / 4} y={dayY + dayH / 2 + (lang === "en" ? 9 : 10)} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={CC_INK} stroke={CC_PAPER} strokeWidth={6} paintOrder="stroke">{tx("a.m.")}</text>
        <rect x={bx + (3 * L1) / 4 - (ccTW(tx("p.m."), 28) + 20) / 2} y={dayY + (lang === "en" ? 8 : 5)} width={ccTW(tx("p.m."), 28) + 20} height={lang === "en" ? 44 : 50} rx={10} fill={CC_PAPER} stroke={CC_INK} strokeWidth={2} />
        <text x={bx + (3 * L1) / 4} y={dayY + dayH / 2 + (lang === "en" ? 9 : 10)} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={CC_INK} stroke={CC_PAPER} strokeWidth={6} paintOrder="stroke">{tx("p.m.")}</text>
        {it.kind === "count" && (tbOn || won) && Array.from({ length: 24 }, (_, k) => (tb >= (k < 12 ? 1 : 2) || won) && (
          <text key={"c" + k} x={bx + k * cw + cw / 2} y={dayY + dayH + 30} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={CC_INK}>{k + 1}</text>
        ))}
        {it.kind === "count" && (tb >= 3 || won) && ccEq("d24", Math.min(bx + L1, kx), dayY - 12, tu("1 day = 24 h"), 32, ccDeep(CC_GREEN), "end")}
        {/* the Earth's turn: a little shorter than the day bar */}
        {!S.moving && earthBar(earthX, earthY, earthLit)}
        {!S.moving && !slid && !free && (stage === "demo" || (stage === "ask" && it.kind === "slide")) && (
          <Hit id="slide" x={earthX} y={earthY} w={eLen} h={eH + 24} label="Slide the Earth's turn bar" onPress={() => slide(true)} />
        )}
        {!slid && stage === "ask" && need > 0 && !S.moving && <Invite x={earthX + eLen / 2} y={earthY + eH / 2} w={eLen} h={eH} rx={10} C={C} />}
        {/* the last hour, drawn large: the day's 60 min against the Earth's 56 */}
        {showInset && (
          <g>
            <text x={bx} y={218} fontSize={T.micro} fontWeight={700} fill={CC_INK}>{tx("last hour,")}</text>
            <text x={bx} y={254} fontSize={T.micro} fontWeight={700} fill={CC_INK}>{tx("close up")}</text>
            <g filter="url(#ccShadowSoft)">
              <rect x={sx} y={190} width={sw} height={34} fill={CC_ROSE} stroke={CC_INK} strokeWidth={3} />
              {[1, 2, 3, 4, 5].map((k) => <line key={k} x1={sx + (sw * k) / 6} y1={190} x2={sx + (sw * k) / 6} y2={224} stroke={CC_INK} strokeWidth={2} />)}
              <rect x={sx} y={230} width={gapX - sx} height={34} fill={earthLit ? "url(#ccAmberGrad)" : "url(#ccBlueGrad)"} stroke={ccDeep(CC_BLUE)} strokeWidth={3} />
              <rect x={gapX} y={230} width={sx + sw - gapX} height={34} fill={tint(CC_AMBER, 0.55)} stroke={ccDeep(CC_AMBER)} strokeWidth={3} strokeDasharray="6 5" />
            </g>
            <text x={sx + sw + 14} y={258} fontSize={T.micro} fontWeight={700} fill={ccDeep(CC_AMBER)}>{tx("4 min")}</text>
            {(lit(2) || (won && it.kind === "slide")) && <text x={sx} y={302} fontSize={T.micro} fontWeight={700} fill={it.answer === "about" ? ccDeep(CC_GREEN) : CC_INK}>{tu("23 h 56 min")}</text>}
            {(lit(3) || (won && it.kind === "slide")) && <text x={sx + 260} y={302} fontSize={T.micro} fontWeight={700} fill={it.answer === "less" ? ccDeep(CC_GREEN) : CC_INK}>{tx("less than a day")}</text>}
          </g>
        )}
        {/* the tray of six word cards: each turns over to its meaning */}
        {CC_WORDS.map((w: any, k: number) => {
          const x = wordX(k), up = isUp(w.id), on = "word-" + w.id;
          /* the meaning, two lines: English as drawn, Hindi and Gujarati one TR entry with "|" where the line breaks */
          const ml0 = lang === "en" ? w.means : String(tx(w.means.join(" "))).split("|");
          /* the meaning: the biggest size whose lines fit with >= 17 clear each side in two lines, else 28 in as many short lines as it needs */
          const dev = lang !== "en", room = trayW - 28, big = lang === "gu" ? 34 : T.label;
          /* ONE meaning size for the whole tray: the big size only if every card's meaning fits it in two lines */
          const mlOf = (v: any) => (lang === "en" ? v.means : String(tx(v.means.join(" "))).split("|"));
          const bigOk = CC_WORDS.every((v: any) => { const two = ccWrap(mlOf(v), big, room); return two.length <= 2 && two.every((l: string) => ccTWb(l, big) <= room); });
          const msz = bigOk ? big : T.micro;
          const ml = ccWrap(ml0, msz, room);
          const mp = Math.round(msz * (dev ? 1.38 : 1.18)), mTop = trayY + 60, mRoom = trayY + trayH - 8 - mTop;
          const my0 = mTop + (mRoom - (ml.length - 1) * mp) / 2 + msz * 0.36;
          const tsz = Math.min(T.label, ccFit(tx(w.word), trayW - 30, T.label));
          return (
            <g key={w.id}>
              <rect x={x} y={trayY} width={trayW} height={trayH} rx={14} fill={up ? "#FFFFFF" : tint(C.panel, 0.2)} stroke={CC_INK} strokeWidth={3} filter="url(#ccShadowSoft)" />
              {up && <rect x={x + 4} y={trayY + 4} width={trayW - 8} height={54} rx={10} fill={tint(C.panel, 0.25)} />}
              {!up && <text x={x + trayW / 2} y={trayY + trayH / 2 + 11} textAnchor="middle" fontSize={ccFit(tx(w.word), trayW - 30, lang === "gu" ? 37 : T.label)} fontWeight={700} fill={CC_INK}>{tx(w.word)}</text>}
              {up && <text x={x + trayW / 2} y={trayY + (dev ? 45 : 41)} textAnchor="middle" fontSize={tsz} fontWeight={700} fill={CC_INK}>{tx(w.word)}</text>}
              {up && ml.map((m: string, j: number) => (
                <text key={j} x={x + trayW / 2} y={my0 + j * mp} textAnchor="middle" fontSize={msz} fontWeight={700} fill={CC_INK}>{m}</text>
              ))}
              {(stage === "demo" || stage === "ask") && <Hit id={on} x={x} y={trayY} w={trayW} h={trayH} label={"Turn the " + w.word + " card"} onPress={() => tapWord(w, true)} />}
              {stage === "demo" && stepOn === on && <Invite x={x + trayW / 2} y={trayY + trayH / 2} w={trayW - 8} h={trayH - 8} rx={12} C={C} />}
            </g>
          );
        })}
      </g>
    );
  };

  const drawP2 = () => {
    const names = ["days", "hours", "minutes"];
    const given = it.days + (it.days === 1 ? " day" : " days") + (it.hrs ? " " + it.hrs + " h" : "");
    const minOn = it.to === "min";
    const nextOn = !actDone && stage === "ask" ? (prog === 0 ? 1 : 2) : stage === "demo" && stepOn ? (stepOn === "rung-h" ? 1 : 2) : -1;
    const showH = prog >= 1 || S.pen === 1 || lit(1) || won, showM = minOn && (prog >= 2 || S.pen === 2 || lit(2) || (won && minOn));
    const hFull = lit(1) || won, mFull = minOn && (lit(2) || won);
    const hy = rys[1] + rh / 2 + 56 * 0.36, my = rys[2] + rh / 2 + 56 * 0.36;
    return (
      <g>
        {names.map((nm, k) => {
          const quiet = k === 2 && !minOn;
          const hot = tbOn && tb >= 1 && k === 1;
          return (
            <g key={nm}>
              <rect x={rx} y={rys[k]} width={rw} height={rh} rx={16} fill={k === 0 ? tint(CC_BLUE, 0.8) : hot ? tint(CC_AMBER, 0.55) : quiet ? tint(C.panel, 0.6) : "#FFFFFF"}
                stroke={quiet ? tint(CC_INK, 0.6) : CC_INK} strokeWidth={4} filter="url(#ccShadowSoft)" />
              <text x={rx + rw / 2} y={rys[k] + rh / 2 + 19} textAnchor="middle" fontSize={ccFit(tx(nm), rw - 30, T.xl)} fontWeight={700} fill={quiet ? "#6B6B6B" : k === 0 ? ccDeep(CC_BLUE) : CC_INK}>{tx(nm)}</text>
              {k > 0 && !quiet && (stage === "demo" || stage === "ask") && (
                <Hit id={k === 1 ? "rung-h" : "rung-min"} x={rx} y={rys[k]} w={rw} h={rh} label={"The " + nm + " rung"} onPress={() => rung(k === 1 ? "rung-h" : "rung-min", true)} />
              )}
              {nextOn === k && <Invite x={rx + rw / 2} y={rys[k] + rh / 2} w={rw} h={rh} rx={16} C={C} />}
            </g>
          );
        })}
        {/* the given length, deep blue */}
        <g filter="url(#ccShadowSoft)">
          <rect x={wx} y={rys[0] + (lang === "en" ? 6 : 0)} width={Math.max(260, ccTW(tu(given), 44) + 54)} height={lang === "en" ? rh - 12 : rh} rx={14} fill={tint(CC_BLUE, 0.85)} stroke={CC_BLUE} strokeWidth={3} />
          <text x={wx + 20} y={rys[0] + (lang === "en" ? 38 : 40)} fontSize={T.micro} fontWeight={700} fill={ccDeep(CC_BLUE)}>{tx("Given")}</text>
          <text x={wx + 20} y={rys[0] + (lang === "en" ? 86 : lang === "hi" ? 92 : 89)} fontSize={T.speech} fontWeight={700} fill={ccDeep(CC_BLUE)}>{tu(given)}</text>
        </g>
        {/* the steps down the ladder */}
        {showH && (
          <g>
            <line x1={rx + rw / 2} y1={rys[0] + rh + 4} x2={rx + rw / 2} y2={rys[1] - 12} stroke={CC_INK} strokeWidth={4} />
            <path d={`M ${rx + rw / 2 - 10} ${rys[1] - 22} L ${rx + rw / 2} ${rys[1] - 6} L ${rx + rw / 2 + 10} ${rys[1] - 22} Z`} fill={CC_INK} />
            {ccEq("x24", rx + rw / 2 + 22, rys[1] - 22, "× 24", 32, CC_INK)}
          </g>
        )}
        {showM && (
          <g>
            <line x1={rx + rw / 2} y1={rys[1] + rh + 4} x2={rx + rw / 2} y2={rys[2] - 12} stroke={CC_INK} strokeWidth={4} />
            <path d={`M ${rx + rw / 2 - 10} ${rys[2] - 22} L ${rx + rw / 2} ${rys[2] - 6} L ${rx + rw / 2 + 10} ${rys[2] - 22} Z`} fill={CC_INK} />
            {ccEq("x60", rx + rw / 2 + 22, rys[2] - 22, "× 60", 32, CC_INK)}
          </g>
        )}
        {/* the working: written by the pencil as the child taps; the whole line after a miss or at the win */}
        {showH && !hFull && <PencilText text={hText(it)} x={wx} y={hy} size={56} align="start" chars={S.pen === 1 ? S.pc : undefined} />}
        {hFull && ccEq("hf", wx, hy, tu(hText(it) + " = " + indian(hTot(it)) + " h"), 56, minOn ? CC_INK : ccDeep(CC_GREEN))}
        {showM && !mFull && <PencilText text="× 60" x={wx} y={my} size={56} align="start" chars={S.pen === 2 ? S.pc : undefined} />}
        {mFull && ccEq("mf", wx, my, tu(indian(hTot(it)) + " × 60 = " + indian(hTot(it) * 60) + " min"), 56, ccDeep(CC_GREEN))}
      </g>
    );
  };

  const drawP3 = () => {
    const matched: number[] = [];
    if (free) matched.push(...S.fm);
    else {
      if (!warm || stepNo >= 2) matched.push(0);
      for (let j = 1; j <= 3; j++) if (!warm && (index > j - 1 || (index === j - 1 && won))) matched.push(j);
    }
    const allUp = !free && n === 3 && index === 2 && won;
    const upNow: number[] = free ? [...S.fup] : [];
    if (!free && warm && stepNo >= 1) upNow.push(CC_PAIRS[0].c);
    if (!free && !warm && qPair && (S.done || tbOn)) upNow.push(qPair.c);
    const readIdx = free ? S.fread : warm ? (stepNo >= 1 ? CC_PAIRS[0].c : -1) : qPair && (S.done || tbOn || won) ? qPair.c : -1;
    const narrow = W0 < 1300, rwid = 280, rhgt = 404;
    const readX = narrow ? CC_X0 + 6 * (CC_CW + CC_GAP) + 4 : Math.min(W0 - rwid - 30, 1142), readY = narrow ? 2 : 100;
    const order = CC_PAIRS.map((p: any) => p.c);
    const cards: any[] = [];
    for (let i = 0; i < 16; i++) {
      /* under the large card (panel open) the two right columns are not drawn at all: nothing peeks out */
      if (readIdx >= 0 && narrow && !free && i % 8 >= 6) continue;
      const { x, y } = ccCardXY(i), pi = ccPairOf(i), p = CC_PAIRS[pi], isClock = p.c === i;
      const isMatched = matched.indexOf(pi) >= 0, up = allUp || isMatched || upNow.indexOf(i) >= 0;
      if (!up) {
        cards.push(ccBack(i, x, y, CC_CW, CC_CH, true));
      } else {
        const sp = allUp ? order.indexOf(i) : -1;
        const showTime = !allUp || !isClock || S.spin > sp;
        cards.push(
          <g key={i}>
            <rect x={x} y={y} width={CC_CW} height={CC_CH} rx={12} fill={isMatched ? tint(CC_GREEN, 0.82) : "url(#ccCardFaceGrad)"} stroke={isMatched ? ccDeep(CC_GREEN) : CC_INK} strokeWidth={isMatched ? 5 : 3} filter="url(#ccShadowSoft)" />
            {isClock ? ccClock("k" + i, x + CC_CW / 2, y + CC_CH / 2, 46, showTime ? p.h : 12, showTime ? p.m : 0, false)
              : (
                <g>
                  <text x={x + CC_CW / 2} y={y + 84} textAnchor="middle" fontSize={ccPairVal(p) >= 1000 ? 32 : 40} fontWeight={700} fill={isMatched ? ccDeep(CC_GREEN) : CC_INK}>{indian(ccPairVal(p))}</text>
                  <rect x={x + 8} y={y + 98} width={CC_CW - 16} height={42} rx={14} fill={isMatched ? tint(CC_GREEN, 0.65) : tint(C.panel, 0.5)} stroke={isMatched ? ccDeep(CC_GREEN) : CC_INK} strokeWidth={1.5} />
                  <text x={x + CC_CW / 2} y={y + (lang === "en" ? 128 : 131)} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={isMatched ? ccDeep(CC_GREEN) : CC_INK}>{tx(p.unit)}</text>
                </g>
              )}
          </g>
        );
      }
      if (free && !up && !busy.current) cards.push(<Hit key={"h" + i} id={"card-" + i} x={x} y={y} w={CC_CW} h={CC_CH} label={"Card " + (i + 1)} onPress={() => freeTap(i)} />);
      if (!free && i === target && (stage === "demo" || stage === "ask")) {
        cards.push(<Hit key={"h" + i} id="card" x={x} y={y} w={CC_CW} h={CC_CH} label="Turn the card with the ring" onPress={() => turn(true)} />);
        cards.push(<Invite key={"v" + i} x={x + CC_CW / 2} y={y + CC_CH / 2} w={CC_CW} h={CC_CH} rx={12} C={C} />);
      }
    }
    const rp = readIdx >= 0 ? CC_PAIRS[ccPairOf(readIdx)] : null;
    const wh = rp ? rp.h * 60 + rp.m : 0;
    return (
      <g>
        {cards}
        {/* the clock card being read, lifted and drawn large */}
        {rp && (
          <g filter="url(#ccShadowSoft)">
            <rect x={readX} y={readY} width={rwid} height={rhgt} rx={18} fill="#FFFFFF" stroke={CC_INK} strokeWidth={4} />
            <text x={readX + rwid / 2} y={readY + 42} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={CC_INK}>{tx("clock card")}</text>
            {ccClock("big", readX + rwid / 2, readY + 210, 124, rp.h, rp.m, true, lit(1))}
          </g>
        )}
        {/* the correction: the hours changed to minutes, the minutes added, then seconds when asked */}
        {tbOn && rp && tb >= 1 && ccEq("t1", CC_X0, 430, tu(rp.unit === "s" ? rp.h + " h " + rp.m + " min = " + wh + " min" : rp.h + " h = " + rp.h + " × 60 = " + rp.h * 60 + " min"), 40, CC_INK)}
        {tbOn && rp && tb >= 2 && ccEq("t2", CC_X0, 490, tu(rp.unit === "s" ? wh + " × 60 = " + indian(wh * 60) + " s" : rp.h * 60 + " + " + rp.m + " = " + indian(wh) + " min"), 40, ccDeep(CC_GREEN))}
      </g>
    );
  };

  const drawP4 = () => {
    const noon = 12 * 60;
    const amEnd = Math.min(we, Math.max(ws, noon)), pmStart = Math.max(ws, Math.min(we, noon));
    const hours: number[] = [];
    for (let t = ws; t <= we; t += 60) hours.push(t);
    const lenTxt = it.len ? it.len[0] + " h " + it.len[1] + " min" : "";
    const endLit = tbOn && tb >= 1;
    const h12 = Math.floor(endT / 60) % 12 || 12, h24 = Math.floor(endT / 60);
    const lab = (t: number, y: number, fill: string, key: string) => {
      const s = cc12(t), w = ccW(s, 32);
      const x = Math.max(w / 2 + 4, Math.min(W0 - w / 2 - 4, X(t)));
      return <text key={key} x={x} y={y} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={fill} stroke={CC_PAPER} strokeWidth={6} paintOrder="stroke">{tu(s)}</text>;
    };
    const cardW = 360, cardX = 20, cardY = 392, cardH = 122;
    const shownAns = won || (tbOn && tb >= 3);
    const keyW = 300, keyX = Math.max(W0 / 2 - keyW / 2, cardX + cardW + 30), keyY = 412;
    return (
      <g>
        {/* the length of time, given */}
        {it.len && <text x={lx0} y={34} fontSize={T.micro} fontWeight={700} fill={ccDeep(CC_BLUE)}>{tx("Given")}</text>}
        {it.len && <text x={lx0} y={80} fontSize={T.prompt} fontWeight={700} fill={ccDeep(CC_BLUE)}>{tu(lenTxt)}</text>}
        {/* the a.m. part warm white, the p.m. part rose */}
        <g filter="url(#ccShadowSoft)">
          {amEnd > ws && <rect x={X(ws)} y={bandY} width={X(amEnd) - X(ws)} height={bandH} fill={CC_AMW} stroke={CC_INK} strokeWidth={2.4} />}
          {we > pmStart && <rect x={X(pmStart)} y={bandY} width={X(we) - X(pmStart)} height={bandH} fill={endLit && !it.len ? tint(CC_AMBER, 0.5) : CC_ROSE} stroke={CC_INK} strokeWidth={2.4} />}
        </g>
        {amEnd - ws >= 120 && <text x={(X(ws) + X(amEnd)) / 2} y={bandY + 40} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={CC_INK}>{tx("a.m.")}</text>}
        {we - pmStart >= 120 && <text x={(X(pmStart) + X(we)) / 2} y={bandY + 40} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={CC_INK}>{tx("p.m.")}</text>}
        <line x1={lx0} y1={lineY} x2={lx1} y2={lineY} stroke={CC_INK} strokeWidth={4} />
        {hours.map((t) => (
          <g key={t}>
            <line x1={X(t)} y1={lineY} x2={X(t)} y2={lineY + 16} stroke={CC_INK} strokeWidth={3} />
            <text x={X(t)} y={lineY + 46} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={CC_INK}>{(Math.floor(t / 60) % 12) || 12}</text>
          </g>
        ))}
        {/* the start (or the time given), deep blue */}
        <path d={`M ${X(startT)} ${lineY} l -13 -26 h 26 Z`} fill={CC_BLUE} stroke={ccDeep(CC_BLUE)} strokeWidth={2} />
        {lab(startT, lineY + 92, endLit && !it.len ? ccDeep(CC_AMBER) : ccDeep(CC_BLUE), "ls")}
        {/* the jumps, violet: the whole hours, then the minutes */}
        {jumps >= 1 && it.len && (
          <g>
            <path d={`M ${X(startT)} ${bandY} Q ${(X(startT) + X(land1)) / 2} ${bandY - 120} ${X(land1)} ${bandY}`} fill="none" stroke={CC_VIOLET} strokeWidth={5} />
            <text x={(X(startT) + X(land1)) / 2} y={bandY - 70} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ccDeep(CC_VIOLET)} stroke={CC_PAPER} strokeWidth={6} paintOrder="stroke">{tu(it.len[0] + " h")}</text>
            <circle cx={X(land1)} cy={lineY} r={10} fill={CC_VIOLET} stroke="#FFFFFF" strokeWidth={2} />
            {jumps < 2 && lab(land1, lineY + 92, ccDeep(CC_VIOLET), "l1")}
          </g>
        )}
        {jumps >= 2 && it.len && (
          <g>
            <path d={`M ${X(land1)} ${bandY} Q ${(X(land1) + X(endT)) / 2} ${bandY - 54} ${X(endT)} ${bandY}`} fill="none" stroke={CC_VIOLET} strokeWidth={5} />
            <text x={(X(land1) + X(endT)) / 2} y={bandY - 36} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={ccDeep(CC_VIOLET)} stroke={CC_PAPER} strokeWidth={6} paintOrder="stroke">{tu(it.len[1] + " min")}</text>
            <circle cx={X(endT)} cy={lineY} r={12} fill={endLit ? CC_AMBER : CC_VIOLET} stroke={CC_INK} strokeWidth={2} />
            {lab(endT, lineY + 134, endLit ? ccDeep(CC_AMBER) : CC_INK, "le")}
          </g>
        )}
        {/* the 24-hour clock: four digits and the word hours */}
        <g filter="url(#ccShadowSoft)">
          <rect x={cardX} y={cardY} width={cardW} height={cardH} rx={14} fill={shownAns ? tint(CC_GREEN, 0.85) : "#FFFFFF"} stroke={shownAns ? ccDeep(CC_GREEN) : CC_INK} strokeWidth={3} />
          <text x={cardX + 18} y={cardY + 34} fontSize={T.micro} fontWeight={700} fill={CC_INK}>{tx("24-hour clock")}</text>
          <text x={cardX + 18} y={cardY + 102} fontSize={T.speech} fontWeight={700} fill={shownAns ? ccDeep(CC_GREEN) : "#6B6B6B"}>{(shownAns ? it.answer : (String(typed || "").replace(/\D/g, "").slice(0, 4) + "____").slice(0, 4)) + " " + tx("hours")}</text>
        </g>
        {tbOn && tb >= 2 && ccEq("p12", cardX + cardW + 30, cardY + 80, h12 + " + 12 = " + h24, 40, CC_INK)}
        {/* one key for the two jumps: its label follows the act */}
        {jumpKey && (
          <g>
            <Key id={jumpId} label={prog === 0 ? "Jump " + it.len[0] + " h" : "Jump " + it.len[1] + " min"} x={keyX} y={keyY} w={keyW} h={84} C={C} tone="key"
              onClick={() => jump(true)}>
              <text y={12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", CC_INK)}>{tx("Jump") + " " + tu(prog === 0 ? it.len[0] + " h" : it.len[1] + " min")}</text>
            </Key>
            {(stage === "ask" || (stage === "demo" && stepOn === jumpId)) && <Invite x={keyX + keyW / 2} y={keyY + 42} w={keyW} h={84} C={C} />}
          </g>
        )}
      </g>
    );
  };

  return (
    <g>
      <defs>
        <filter id="ccShadowSoft" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#2B2B2B" floodOpacity="0.16" />
        </filter>
        <radialGradient id="ccClockBg" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F4F6F8" />
        </radialGradient>
        <linearGradient id="ccBlueGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2993D6" />
          <stop offset="100%" stopColor="#0072B2" />
        </linearGradient>
        <linearGradient id="ccAmberGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFB733" />
          <stop offset="100%" stopColor="#E69F00" />
        </linearGradient>
        <linearGradient id="ccCardFaceGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FAF8F5" />
        </linearGradient>
      </defs>
      {(n === 3 || free) && drawP3()}
      {!free && n === 1 && drawP1()}
      {!free && n === 2 && drawP2()}
      {!free && n === 4 && drawP4()}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: digits and shapes only */
function Thumb({ result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const item = it || last.it || {};
  const frame = <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />;
  if (item.choices) {
    const short = String(last.value) === "less" || String(last.value) === "about";
    return (
      <g>
        {frame}
        <rect x={14} y={h * 0.22} width={w - 120} height={h * 0.22} rx={4} fill={CC_ROSE} stroke={CC_INK} strokeWidth={2} />
        <rect x={14} y={h * 0.56} width={short ? (w - 120) * 0.84 : w - 120} height={h * 0.22} rx={4} fill={CC_BLUE} stroke={CC_INK} strokeWidth={2} />
        <text x={w - 12} y={h * 0.67 + 10} textAnchor="end" fontSize={ccFit(tx("4 min"), 96, T.label)} fontWeight={700} fill={ccDeep(CC_AMBER)}>{tx("4 min")}</text>
      </g>
    );
  }
  const v = item.parts ? slotPartsOf(last.value, 1)[0] : String(last.value);
  const unit = item.parts ? tx(item.parts[0].unit) : tx("hours");
  const txt = (item.parts ? indian(Number(v)) : String(v)) + " " + unit;
  const icon = ccTW(txt, T.label) <= w - h - 20;
  if (!icon) return (
    <g>
      {frame}
      <text x={w / 2} y={h / 2 + 11} textAnchor="middle" fontSize={ccFit(txt, w - 24, T.label)} fontWeight={700} fill={ccDeep(CC_GREEN)}>{txt}</text>
    </g>
  );
  return (
    <g>
      {frame}
      <circle cx={h / 2 + 4} cy={h / 2} r={h / 2 - 18} fill="#FFFFFF" stroke={CC_INK} strokeWidth={3} />
      <line x1={h / 2 + 4} y1={h / 2} x2={h / 2 + 4} y2={h / 2 - (h / 2 - 24)} stroke={CC_INK} strokeWidth={3} strokeLinecap="round" />
      <line x1={h / 2 + 4} y1={h / 2} x2={h / 2 + 4 + (h / 2 - 26) * 0.7} y2={h / 2 + 4} stroke={CC_INK} strokeWidth={4} strokeLinecap="round" />
      <text x={w - 14} y={h / 2 + 12} textAnchor="end" fontSize={T.label} fontWeight={700} fill={ccDeep(CC_GREEN)}>{txt}</text>
    </g>
  );
}

function ClockCards(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, format, fitHost: () => null,
      board: true,
      keyOnly: true,
      /* bigPad off: two rows of eight 110-wide cards need x 16 to 994 with the panel open (900 would cut the eighth column) */
      bigPad: false,
      nextKey: true,
      navDots: true,
      StartArt, START_HOOK,
      }} />
  );
}

export default ClockCards;