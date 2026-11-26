/* ═══ M2.S3.T6.C28.2D1 · time_columns · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build. THE LESSON IS SILENT (runtime r30): every line is
   printed on the bubble, which is the guide; nothing moves on unless the child acts. THE NEW LOOK (keyOnly, navDots):
   no question bar, the question lives only in the bubble, every act performed on screen (api.act).
   The picture: a column frame headed Hours, Minutes, Seconds, a sixty gate between each pair of columns, carry
   circles over the hours and minutes, a panel of sixty cells at the right and ONE act key under it (Carry, Break,
   Break an hour, Break a minute, Check). The child places the parts (phase 1), carries sixty (phase 2), breaks an hour
   (phase 3) or an hour twice (phase 4); then the Answer key opens the Hours / Minutes / Seconds boxes. The answer
   line is written only at the win or by the correction (right to left, the smallest unit first).
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "time_columns";
const MEDIA_ID = "M2.S3.T6.C28.2D1";
const TOOL_NAME = "Time Columns";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (phase 1 has steps, so it is not shown) */
const OPENING = ["A frame with three columns, hours, minutes and seconds. Where does each part go?"];
/* kept for the tool object's shape; the summary page does not show it (r44) */
const FINISH_LINE = "Each part under its heading, each sixty carried, and each broken hour opened into sixty minutes.";
/* printed when the child opens Free play; every control it names is in the free branch of Work */
const FREE_LINE = "Free play: tap New sum, then Carry or Break, then Show, and Check a take-away.";

/* ── the tool's own names (tc*): colours, units, the column arithmetic ─────────────────────── */
const TC_COL: any = { h: "#D55E00", m: "#0072B2", s: "#CC79A7" };     /* hours vermilion, minutes deep blue, seconds reddish purple */
const TC_NAME: any = { h: "Hours", m: "Minutes", s: "Seconds" };
const TC_SHORT: any = { h: "h", m: "min", s: "s" };
/* the unit words of the worked line on the board (one / many) */
const TC_ONE: any = { h: "hour", m: "minute", s: "second" };
const TC_MANY: any = { h: "hours", m: "minutes", s: "seconds" };
/* no drawn hand (the owner, 2026-11-16): a card or the 60 tile glides by itself (CSS keyframes, none under reduced motion) */
const TC_FLY = 1200;
const tcWait = (ms: number) => new Promise<void>((res) => setTimeout(res, reducedMotion() ? 0 : ms));
const TC_WINE = "#8E2043";                                             /* a carried or broken unit, and the figures it rewrites */
const TC_DARK = "#1F1F1F";                                             /* rules, gates, outlines */
const TC_ZERO = "#767676";                                             /* a zero holding a place */
const TC_BRASS = "#D9A93E";
const tcParts = (u: string[]) => u.map((k) => ({ label: TC_NAME[k] }));
const tcPad = (v: any, k: string) => (v === null || v === undefined ? "" : k === "h" ? String(v) : String(v).padStart(2, "0"));
const tcTime = (u: string[], v: any[]) => u.map((k, i) => (v[i] === null || v[i] === undefined ? "" : v[i] + " " + TC_SHORT[k])).filter(Boolean).join(" ");

/* the column route (the picture's own): carries at sixty, breaks one of the next unit into sixty, from the right */
function tcColumns(b: any) {
  const u: string[] = b.units, nc = u.length;
  const top = b.top.map((x: any) => x || 0), bot = (b.bot || u.map(() => 0)).map((x: any) => x || 0);
  if (b.op !== "-") {
    const res = u.map(() => 0), carryIn = u.map(() => 0), carries: number[] = [];
    let c = 0;
    for (let i = nc - 1; i >= 0; i--) {
      const sum = top[i] + bot[i] + c;
      carryIn[i] = c;
      if (i > 0) { c = Math.floor(sum / 60); res[i] = sum % 60; for (let k = 0; k < c; k++) carries.push(i); }
      else { c = 0; res[i] = sum; }
    }
    return { res, carryIn, carries, links: [] as any[] };
  }
  const t = top.slice(), links: any[] = [];
  for (let i = nc - 1; i > 0; i--) {
    if (t[i] >= bot[i]) continue;
    let j = i - 1;
    while (j > 0 && t[j] === 0) j--;
    for (let k = j; k < i; k++) { t[k] -= 1; t[k + 1] += 60; links.push({ from: k, to: k + 1, a: t[k], b: t[k + 1] }); }
  }
  return { res: t.map((x: number, i: number) => x - bot[i]), carryIn: u.map(() => 0), carries: [] as number[], links };
}

/* a stopwatch's face drawn in code over its blank skin: crown, side button, a ring of ticks and one hand (no digits) */
function tcDial(cx: number, cy: number, r: number, big = false) {
  const at = (deg: number, k: number) => ({ x: cx + Math.sin((deg * Math.PI) / 180) * r * k, y: cy - Math.cos((deg * Math.PI) / 180) * r * k });
  const sw = Math.max(1.6, r * 0.05), hand = at(55, 0.6), b = at(42, 1.04);
  return (
    <g pointerEvents="none">
      {!big && <rect x={cx - r * 0.18} y={cy - r - r * 0.3} width={r * 0.36} height={r * 0.32} rx={r * 0.08} fill="url(#tc-brass-grad)" stroke={TC_DARK} strokeWidth={sw * 0.8} />}
      <circle cx={b.x} cy={b.y} r={r * 0.11} fill="url(#tc-brass-grad)" stroke={TC_DARK} strokeWidth={sw * 0.8} />
      {Array.from({ length: 12 }, (_, i) => { const p = at(i * 30, i % 3 ? 0.6 : 0.54), q = at(i * 30, 0.68);
        return <line key={i} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke={TC_DARK} strokeWidth={i % 3 ? sw : sw * 1.5} strokeLinecap="round" />; })}
      <line x1={cx} y1={cy} x2={hand.x} y2={hand.y} stroke={TC_WINE} strokeWidth={sw * 1.3} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={r * 0.07} fill={TC_DARK} />
    </g>
  );
}

/* free play: sums to try, adding and taking away (two carries, a double break, exactly sixty, one break) */
const TC_FREE = [
  { op: "+", units: ["h", "m", "s"], top: [1, 45, 50], bot: [2, 30, 25] },
  { op: "-", units: ["h", "m", "s"], top: [5, 0, 0], bot: [1, 20, 45] },
  { op: "+", units: ["h", "m"], top: [3, 35], bot: [2, 25] },
  { op: "-", units: ["h", "m"], top: [4, 15], bot: [1, 50] },
];

/* THE START PAGE: a stopwatch and an empty column frame with its two sixty gates */
const START_HOOK = "Why does time carry at sixty and not at ten?";
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  const cx0 = 190, cy0 = 170, r0 = 140, fx = 420, cw = 220, gp = 60;
  return (
    <g>
      <defs>
        <linearGradient id="tc-start-brass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F7E2A9" />
          <stop offset="50%" stopColor="#D9A93E" />
          <stop offset="100%" stopColor="#9C731A" />
        </linearGradient>
        <filter id="tc-start-shadow" x="-10%" y="-10%" width="125%" height="125%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000000" floodOpacity="0.14" />
        </filter>
      </defs>
      <g filter="url(#tc-start-shadow)">
        <circle cx={cx0} cy={cy0} r={r0} fill="url(#tc-start-brass)" stroke={TC_DARK} strokeWidth={4} />
        <circle cx={cx0} cy={cy0} r={r0 * 0.78} fill="#FFF8E6" stroke={TC_DARK} strokeWidth={3} />
        <rect x={cx0 - 16} y={cy0 - r0 - 26} width={32} height={30} rx={8} fill="url(#tc-start-brass)" stroke={TC_DARK} strokeWidth={3} />
        <Skin name="stopwatch" x={cx0 - r0} y={cy0 - r0} w={2 * r0} h={2 * r0} />
        {tcDial(cx0, cy0, r0, true)}
      </g>
      {["h", "m", "s"].map((k, i) => {
        const x = fx + i * (cw + gp);
        return (
          <g key={k} filter="url(#tc-start-shadow)">
            <rect x={x} y={20} width={cw} height={300} rx={18} fill={tint(TC_COL[k], 0.88)} stroke={TC_COL[k]} strokeWidth={3} />
            <rect x={x + 12} y={20} width={cw - 24} height={56} rx={10} fill={tint(TC_COL[k], 0.65)} stroke={TC_COL[k]} strokeWidth={2} />
            <text x={x + cw / 2} y={lang && lang !== "en" ? 69 : 60} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={shade(TC_COL[k], 0.3)}>{tx(TC_NAME[k])}</text>
            {[110, 210].map((y) => (k === "h"
              ? <g key={y}>
                  <rect x={x + cw / 2 - 56} y={y} width={112} height={78} rx={12} fill="#FFFFFF" stroke={TC_DARK} strokeWidth={2.4} />
                  <rect x={x + cw / 2 - 54} y={y + 3} width={108} height={6} rx={3} fill="#FFFFFF" fillOpacity={0.6} />
                </g>
              : [0, 1].map((j) => (
                  <g key={y + "-" + j}>
                    <rect x={x + cw / 2 - 84 + j * 92} y={y} width={76} height={78} rx={12} fill="#FFFFFF" stroke={TC_DARK} strokeWidth={2.4} />
                    <rect x={x + cw / 2 - 82 + j * 92} y={y + 3} width={72} height={6} rx={3} fill="#FFFFFF" fillOpacity={0.6} />
                  </g>
                ))))}
            {i < 2 && (
              <g>
                <rect x={x + cw + gp / 2 - 7} y={100} width={14} height={200} rx={7} fill={TC_DARK} />
                <rect x={x + cw + gp / 2 - 27} y={180} width={54} height={44} rx={10} fill={TC_DARK} stroke="#444444" strokeWidth={2} />
                <rect x={x + cw + gp / 2 - 25} y={182} width={50} height={4} rx={2} fill="#FFFFFF" fillOpacity={0.25} />
                <text x={x + cw + gp / 2} y={207} textAnchor="middle" fontSize={T.label} fontWeight={700} fill="#FFFFFF">60</text>
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): filled in the language pass, once the English is final. */
const TR: any = {
  hi: {
    "Time Columns": "समय के खाने",
    "Free play: tap New sum, then Carry or Break, then Show, and Check a take-away.": "मुक्त खेल: नया सवाल, फिर हासिल या उधार लो, फिर दिखाओ, और घटाव जाँचो।",
    "Why does time carry at sixty and not at ten?": "समय में हासिल दस पर नहीं, साठ पर क्यों?",
    "A column for each unit": "हर मात्रक का एक खाना",
    "Drag the 1 h card down under the Hours heading.": "1 घंटे वाला कार्ड घंटे के खाने में खींचो।",
    "The card that says h goes in the Hours column.": "घंटे वाला कार्ड घंटे के खाने में जाता है।",
    "Now put the 5 min card under Minutes.": "अब 5 मिनट वाला कार्ड मिनट के नीचे रखो।",
    "Find the card that says min.": "मिनट वाला कार्ड ढूँढो।",
    "Put the 20 s card under Seconds, the column on the right.": "20 सेकंड वाला कार्ड दाएँ खाने, सेकंड के नीचे रखो।",
    "The s card goes in the last column.": "सेकंड वाला कार्ड आखिरी खाने में जाता है।",
    "Start with the column on the right, the smallest unit.": "दाएँ खाने से शुरू करो, सबसे छोटा मात्रक।",
    "Write each column's own total under it, seconds first.": "हर खाने का जोड़ उसके नीचे लिखो, पहले सेकंड।",
    "Each unit has its own column, and the smallest is added first.": "हर मात्रक का अपना खाना है, सबसे छोटा पहले जुड़ता है।",
    "You learned: each unit has a column; add the column on the right first.": "तुमने सीखा: हर मात्रक का खाना, दायाँ पहले जोड़ो।",
    "Put each card in its column, then add the two times.": "हर कार्ड उसके खाने में रखो, फिर दोनों समय जोड़ो।",
    "Add the times": "समय जोड़ो",
    "Each card goes under the heading of its own unit.": "हर कार्ड अपने मात्रक के खाने में जाता है।",
    "Hours": "घंटे", "Minutes": "मिनट", "Seconds": "सेकंड",
    "h": "घं.", "min": "मि.", "s": "से.",
    "Place these cards too and find the total time.": "ये कार्ड भी रखो और कुल समय निकालो।",
    "Total time?": "कुल समय?",
    "Add the minutes first, then the hours.": "पहले मिनट जोड़ो, फिर घंटे।",
    "What goes under each heading for 5 hours 7 minutes 42 seconds?": "5 घंटे 7 मिनट 42 सेकंड में हर खाने में क्या आएगा?",
    "Under each heading?": "हर खाने में?",
    "Minutes take two places, so a small number gets a 0 in front.": "मिनट के दो स्थान हैं, तो छोटी संख्या के आगे 0 लगता है।",
    "Sixty or more carries": "साठ या ज़्यादा पर हासिल",
    "40 and 35 minutes make 75, so tap Carry to send 60 through the gate.": "40 और 35 मिनट 75 हुए, तो 60 आगे भेजने को हासिल दबाओ।",
    "The Carry key is under the cells.": "हासिल बटन डिब्बों के नीचे है।",
    "Is the column sixty or more?": "क्या खाने का जोड़ साठ या ज़्यादा है?",
    "Take out sixty as one of the next unit, keep the rest and add the carry.": "साठ को अगले मात्रक का 1 बनाओ, बाकी रखो, हासिल जोड़ो।",
    "Sixty or more in a column carries one to the next column.": "खाने में साठ या ज़्यादा हो तो अगले खाने में 1 हासिल जाता है।",
    "You learned: a column of sixty or more carries one to the left.": "तुमने सीखा: साठ या ज़्यादा पर 1 हासिल जाता है।",
    "Tap Carry, then add the two times in the frame.": "हासिल दबाओ, फिर खानों में लिखे दोनों समय जोड़ो।",
    "Add and carry": "जोड़ो, हासिल लो",
    "Add 1 hour 30 minutes and 2 hours 30 minutes the same way.": "इसी तरह 1 घंटा 30 मिनट और 2 घंटे 30 मिनट जोड़ो।",
    "Sum of times?": "समय का जोड़?",
    "Exactly sixty minutes is one whole hour too.": "ठीक साठ मिनट भी पूरा एक घंटा है।",
    "Add 45 seconds and 38 seconds, and give minutes and seconds.": "45 सेकंड और 38 सेकंड जोड़ो, मिनट और सेकंड में बताओ।",
    "In min and s?": "मिनट और सेकंड में?",
    "Sixty seconds make one minute.": "साठ सेकंड का एक मिनट होता है।",
    "Borrowing an hour": "एक घंटा उधार लेना",
    "10 minutes is too few to take 40 from, so tap Break.": "10 मिनट में से 40 नहीं घटते, तो उधार लो दबाओ।",
    "The Break key is under the cells.": "उधार लो बटन डिब्बों के नीचे है।",
    "One hour gives sixty minutes, and the hours go down by one.": "एक घंटा साठ मिनट देता है, और घंटे एक कम होते हैं।",
    "Add sixty to the top minutes, take away, then do the hours.": "ऊपर के मिनट में साठ जोड़ो, घटाओ, फिर घंटे करो।",
    "When the top is too small, break one from the left into sixty.": "ऊपर की संख्या छोटी हो तो बाएँ से 1 उधार लेकर साठ बनाओ।",
    "You learned: too few on top? Break one into sixty and take one off.": "तुमने सीखा: ऊपर कम हो तो 1 उधार, वह साठ बने।",
    "Use Break, then take 3 hours 50 minutes away from 8 hours 25 minutes.": "उधार लो दबाओ, फिर 8 घंटे 25 मिनट में से 3 घंटे 50 मिनट घटाओ।",
    "Take away": "घटाओ",
    "Take 1 hour 47 minutes away from 5 hours 20 minutes the same way.": "इसी तरह 5 घंटे 20 मिनट में से 1 घंटा 47 मिनट घटाओ।",
    "Difference?": "अंतर?",
    "By how much does a run of 1 h 11 min 38 s beat 1 h 12 min 5 s?": "1 घंटा 11 मिनट 38 सेकंड की दौड़, 1 घंटा 12 मिनट 5 सेकंड से कितनी जल्दी है?",
    "How much faster?": "कितनी जल्दी?",
    "Borrowing across an empty column": "खाली खाने के पार उधार",
    "Tap Break an hour to open one hour.": "एक घंटा खोलने को 1 घंटा उधार लो दबाओ।",
    "The key is under the cells.": "बटन डिब्बों के नीचे है।",
    "Now tap Break a minute to open one of those 60 minutes.": "अब उन 60 मिनट में से एक खोलने को 1 मिनट उधार लो दबाओ।",
    "One minute gives sixty seconds.": "एक मिनट साठ सेकंड देता है।",
    "What does one hour give when both columns need filling?": "दोनों खाने भरने हों तो एक घंटा क्या देगा?",
    "After both breaks, take away from the right, one column at a time.": "दोनों बार उधार के बाद दाएँ से एक-एक खाना घटाओ।",
    "One hour fills both empty columns as 59 minutes and 60 seconds.": "दोनों खाली खाने भरने को 1 घंटा 59 मिनट और 60 सेकंड बनता है।",
    "You learned: one hour can break into 59 minutes and 60 seconds.": "तुमने सीखा: 1 घंटा 59 मिनट 60 सेकंड बन सकता है।",
    "Break twice, then take 2 hours 36 minutes 45 seconds away from 6 hours.": "दो बार उधार लो, फिर 6 घंटे में से 2 घंटे 36 मिनट 45 सेकंड घटाओ।",
    "Take away twice": "दो बार उधार, घटाओ",
    "Take 4 hours 18 minutes 50 seconds away from 9 hours in the same way.": "इसी तरह 9 घंटे में से 4 घंटे 18 मिनट 50 सेकंड घटाओ।",
    "Time left?": "कितना समय बचा?",
    "Both empty columns need filling before you take away.": "घटाने से पहले दोनों खाली खाने भरने होंगे।",
    "Now take 1 hour 42 minutes 25 seconds away from 3 hours.": "अब 3 घंटे में से 1 घंटा 42 मिनट 25 सेकंड घटाओ।",
    "What is left?": "क्या बचा?",
    "Take the seconds away first, then the minutes, then the hours.": "पहले सेकंड घटाओ, फिर मिनट, फिर घंटे।",
    /* win lines (item data, said at the win) */
    "Yes, 7 hours 39 minutes 48 seconds.": "हाँ, 7 घंटे 39 मिनट 48 सेकंड।",
    "Yes, 8 hours 36 minutes.": "हाँ, 8 घंटे 36 मिनट।",
    "Yes, 5 under hours, 07 under minutes, 42 under seconds.": "हाँ, घंटे में 5, मिनट में 07, सेकंड में 42।",
    "Yes, 9 hours 25 minutes.": "हाँ, 9 घंटे 25 मिनट।",
    "Yes, 4 hours and no minutes.": "हाँ, 4 घंटे और 0 मिनट।",
    "Yes, 1 minute 23 seconds.": "हाँ, 1 मिनट 23 सेकंड।",
    "Yes, 4 hours 35 minutes.": "हाँ, 4 घंटे 35 मिनट।",
    "Yes, 3 hours 33 minutes.": "हाँ, 3 घंटे 33 मिनट।",
    "Yes, 27 seconds faster.": "हाँ, 27 सेकंड जल्दी।",
    "Yes, 3 hours 23 minutes 15 seconds.": "हाँ, 3 घंटे 23 मिनट 15 सेकंड।",
    "Yes, 4 hours 41 minutes 10 seconds.": "हाँ, 4 घंटे 41 मिनट 10 सेकंड।",
    "Yes, 1 hour 17 minutes 35 seconds.": "हाँ, 1 घंटा 17 मिनट 35 सेकंड।",
    /* keys and board words */
    "Carry": "हासिल", "Break": "उधार लो", "Break an hour": "1 घंटा उधार लो", "Break a minute": "1 मिनट उधार लो",
    "Show": "दिखाओ", "Check": "जाँचो", "New sum": "नया सवाल",
    "60 cells": "60 डिब्बे", "60 min = 1 h": "60 मिनट = 1 घंटा", "60 s = 1 min": "60 सेकंड = 1 मिनट",
    "1 h = 60 min": "1 घंटा = 60 मिनट", "1 min = 60 s": "1 मिनट = 60 सेकंड",
    "Add back": "वापस जोड़ो", "Count in seconds": "सेकंड में गिनो", "too many": "ज़्यादा",
    /* educator round 2026-11-16: the sixty in plain words (rungs) and the worked line's unit words */
    "60 minutes make 1 hour, so minutes past 60 go over to the hours.": "60 मिनट का 1 घंटा होता है, तो 60 से ऊपर के मिनट घंटों में जाते हैं।",
    "Like 40 + 35 = 75 minutes: 60 make 1 hour, 15 are left.": "जैसे 40 + 35 = 75 मिनट: 60 से 1 घंटा बना, 15 बचे।",
    "Minutes stop at 59, so take out 60 as 1 more hour and keep the rest.": "मिनट 59 तक ही होते हैं, तो 60 को 1 घंटा बनाओ, बाकी रखो।",
    "Like 40 + 20 = 60 minutes: that is 1 whole hour, no minutes left.": "जैसे 40 + 20 = 60 मिनट: यह पूरा 1 घंटा है, कोई मिनट नहीं बचा।",
    "Add the hours, then add 1 more hour for the 60 minutes.": "घंटे जोड़ो, फिर 60 मिनट का 1 घंटा और जोड़ो।",
    "Like 50 + 25 = 75 seconds: 60 make 1 minute, 15 are left.": "जैसे 50 + 25 = 75 सेकंड: 60 से 1 मिनट बना, 15 बचे।",
    "Seconds stop at 59, so the 60 become 1 minute and the rest stay.": "सेकंड 59 तक ही होते हैं, तो 60 का 1 मिनट बने, बाकी रहें।",
    "Too few minutes on top: take 1 hour = 60 minutes first.": "ऊपर मिनट कम हैं: पहले 1 घंटा = 60 मिनट लो।",
    "Like 3 hours 10 minutes: it is 2 hours and 10 + 60 = 70 minutes.": "जैसे 3 घंटे 10 मिनट: यह 2 घंटे और 10 + 60 = 70 मिनट है।",
    "Then 70 minutes take away 40 is 30 minutes, with 1 hour less.": "फिर 70 मिनट में से 40 घटाओ तो 30 मिनट, और 1 घंटा कम।",
    "Take 1 hour = 60 minutes first, and add it to the top minutes.": "पहले 1 घंटा = 60 मिनट लो, और उसे ऊपर के मिनट में जोड़ो।",
    "Like 4 hours 15 minutes: it is 3 hours and 15 + 60 = 75 minutes.": "जैसे 4 घंटे 15 मिनट: यह 3 घंटे और 15 + 60 = 75 मिनट है।",
    "Take away the minutes from that bigger number, then do the hours.": "उस बड़ी संख्या में से मिनट घटाओ, फिर घंटे करो।",
    "Too few seconds on top: take 1 minute = 60 seconds first.": "ऊपर सेकंड कम हैं: पहले 1 मिनट = 60 सेकंड लो।",
    "Like 4 minutes 10 seconds: it is 3 minutes and 10 + 60 = 70 seconds.": "जैसे 4 मिनट 10 सेकंड: यह 3 मिनट और 10 + 60 = 70 सेकंड है।",
    "Then take away the seconds from that bigger number, then the minutes.": "फिर उस बड़ी संख्या में से सेकंड घटाओ, फिर मिनट।",
    "Take 1 hour = 60 minutes first, then 1 minute = 60 seconds.": "पहले 1 घंटा = 60 मिनट लो, फिर 1 मिनट = 60 सेकंड।",
    "Like 2 hours: it is 1 hour 59 minutes 60 seconds after both breaks.": "जैसे 2 घंटे: दोनों बार उधार के बाद यह 1 घंटा 59 मिनट 60 सेकंड है।",
    "Then take away from the right: seconds, then minutes, then hours.": "फिर दाएँ से घटाओ: सेकंड, फिर मिनट, फिर घंटे।",
    "1 hour = 60 minutes, then 1 of those minutes = 60 seconds.": "1 घंटा = 60 मिनट, फिर उनमें से 1 मिनट = 60 सेकंड।",
    "Like 4 hours: it is 3 hours 59 minutes 60 seconds before you take away.": "जैसे 4 घंटे: घटाने से पहले यह 3 घंटे 59 मिनट 60 सेकंड है।",
    "Break 1 hour into 60 minutes, then 1 minute into 60 seconds.": "1 घंटे को 60 मिनट बनाओ, फिर 1 मिनट को 60 सेकंड।",
    "Like 5 hours: it is 4 hours 59 minutes 60 seconds, then take away.": "जैसे 5 घंटे: यह 4 घंटे 59 मिनट 60 सेकंड है, फिर घटाओ।",
    "hour": "घंटा",
    "hours": "घंटे",
    "minute": "मिनट",
    "minutes": "मिनट",
    "second": "सेकंड",
    "seconds": "सेकंड",
  },
  gu: {
    "Time Columns": "સમયનાં ખાનાં",
    "Free play: tap New sum, then Carry or Break, then Show, and Check a take-away.": "મુક્ત રમત: નવો દાખલો, પછી વદી કે ઉછીના લો, પછી બતાવો, અને બાદબાકી ચકાસો.",
    "Why does time carry at sixty and not at ten?": "સમયમાં વદી દસે નહીં, સાઠે કેમ?",
    "A column for each unit": "દરેક એકમનું એક ખાનું",
    "Drag the 1 h card down under the Hours heading.": "1 કલાકવાળું કાર્ડ કલાકના ખાનામાં ખેંચો.",
    "The card that says h goes in the Hours column.": "કલાકવાળું કાર્ડ કલાકના ખાનામાં જાય.",
    "Now put the 5 min card under Minutes.": "હવે 5 મિનિટવાળું કાર્ડ મિનિટ નીચે મૂકો.",
    "Find the card that says min.": "મિનિટવાળું કાર્ડ શોધો.",
    "Put the 20 s card under Seconds, the column on the right.": "20 સેકન્ડવાળું કાર્ડ જમણા ખાના, સેકન્ડ નીચે મૂકો.",
    "The s card goes in the last column.": "સેકન્ડવાળું કાર્ડ છેલ્લા ખાનામાં જાય.",
    "Start with the column on the right, the smallest unit.": "જમણા ખાનાથી શરૂ કરો, સૌથી નાનો એકમ.",
    "Write each column's own total under it, seconds first.": "દરેક ખાનાનો સરવાળો તેની નીચે લખો, પહેલાં સેકન્ડ.",
    "Each unit has its own column, and the smallest is added first.": "દરેક એકમનું પોતાનું ખાનું છે, સૌથી નાનો પહેલાં ઉમેરાય.",
    "You learned: each unit has a column; add the column on the right first.": "તમે શીખ્યા: દરેક એકમનું ખાનું, જમણું પહેલાં.",
    "Put each card in its column, then add the two times.": "દરેક કાર્ડ તેના ખાનામાં મૂકો, પછી બંને સમય ઉમેરો.",
    "Add the times": "સમય ઉમેરો",
    "Each card goes under the heading of its own unit.": "દરેક કાર્ડ પોતાના એકમના ખાનામાં જાય.",
    "Hours": "કલાક", "Minutes": "મિનિટ", "Seconds": "સેકન્ડ",
    "h": "ક.", "min": "મિ.", "s": "સે.",
    "Place these cards too and find the total time.": "આ કાર્ડ પણ મૂકો અને કુલ સમય શોધો.",
    "Total time?": "કુલ સમય?",
    "Add the minutes first, then the hours.": "પહેલાં મિનિટ ઉમેરો, પછી કલાક.",
    "What goes under each heading for 5 hours 7 minutes 42 seconds?": "5 કલાક 7 મિનિટ 42 સેકન્ડમાં દરેક ખાનામાં શું આવશે?",
    "Under each heading?": "દરેક ખાનામાં?",
    "Minutes take two places, so a small number gets a 0 in front.": "મિનિટનાં બે સ્થાન છે, તેથી નાની સંખ્યા આગળ 0 લાગે.",
    "Sixty or more carries": "સાઠ કે વધુ પર વદી",
    "40 and 35 minutes make 75, so tap Carry to send 60 through the gate.": "40 અને 35 મિનિટ 75 થઈ, તો 60 આગળ મોકલવા વદી દબાવો.",
    "The Carry key is under the cells.": "વદી બટન ચોરસની નીચે છે.",
    "Is the column sixty or more?": "શું ખાનાનો સરવાળો સાઠ કે વધુ છે?",
    "Take out sixty as one of the next unit, keep the rest and add the carry.": "સાઠને આગળના એકમનો 1 બનાવો, બાકી રાખો, વદી ઉમેરો.",
    "Sixty or more in a column carries one to the next column.": "ખાનામાં સાઠ કે વધુ હોય તો આગળના ખાનામાં 1 વદી જાય.",
    "You learned: a column of sixty or more carries one to the left.": "તમે શીખ્યા: સાઠ કે વધુ પર 1 વદી જાય.",
    "Tap Carry, then add the two times in the frame.": "વદી દબાવો, પછી ખાનાંમાં લખેલા બંને સમય ઉમેરો.",
    "Add and carry": "ઉમેરો, વદી લો",
    "Add 1 hour 30 minutes and 2 hours 30 minutes the same way.": "આ રીતે 1 કલાક 30 મિનિટ અને 2 કલાક 30 મિનિટ ઉમેરો.",
    "Sum of times?": "સમયનો સરવાળો?",
    "Exactly sixty minutes is one whole hour too.": "બરાબર સાઠ મિનિટ પણ આખો એક કલાક છે.",
    "Add 45 seconds and 38 seconds, and give minutes and seconds.": "45 સેકન્ડ અને 38 સેકન્ડ ઉમેરો, મિનિટ અને સેકન્ડમાં કહો.",
    "In min and s?": "મિનિટ અને સેકન્ડમાં?",
    "Sixty seconds make one minute.": "સાઠ સેકન્ડની એક મિનિટ થાય.",
    "Borrowing an hour": "એક કલાક ઉછીનો લેવો",
    "10 minutes is too few to take 40 from, so tap Break.": "10 મિનિટમાંથી 40 બાદ ન થાય, તો ઉછીના લો દબાવો.",
    "The Break key is under the cells.": "ઉછીના લો બટન ચોરસની નીચે છે.",
    "One hour gives sixty minutes, and the hours go down by one.": "એક કલાક સાઠ મિનિટ આપે, અને કલાક એક ઓછો થાય.",
    "Add sixty to the top minutes, take away, then do the hours.": "ઉપરની મિનિટમાં સાઠ ઉમેરો, બાદ કરો, પછી કલાક કરો.",
    "When the top is too small, break one from the left into sixty.": "ઉપરની સંખ્યા નાની હોય તો ડાબેથી 1 ઉછીનો લઈ સાઠ બનાવો.",
    "You learned: too few on top? Break one into sixty and take one off.": "તમે શીખ્યા: ઉપર ઓછું તો 1 ઉછીનો, તે સાઠ બને.",
    "Use Break, then take 3 hours 50 minutes away from 8 hours 25 minutes.": "ઉછીના લો દબાવો, પછી 8 કલાક 25 મિનિટમાંથી 3 કલાક 50 મિનિટ બાદ કરો.",
    "Take away": "બાદ કરો",
    "Take 1 hour 47 minutes away from 5 hours 20 minutes the same way.": "આ રીતે 5 કલાક 20 મિનિટમાંથી 1 કલાક 47 મિનિટ બાદ કરો.",
    "Difference?": "તફાવત?",
    "By how much does a run of 1 h 11 min 38 s beat 1 h 12 min 5 s?": "1 કલાક 11 મિનિટ 38 સેકન્ડની દોડ, 1 કલાક 12 મિનિટ 5 સેકન્ડ કરતાં કેટલી વહેલી?",
    "How much faster?": "કેટલી વહેલી?",
    "Borrowing across an empty column": "ખાલી ખાનાની પાર ઉછીના",
    "Tap Break an hour to open one hour.": "એક કલાક ખોલવા 1 કલાક ઉછીના લો દબાવો.",
    "The key is under the cells.": "બટન ચોરસની નીચે છે.",
    "Now tap Break a minute to open one of those 60 minutes.": "હવે તે 60 મિનિટમાંથી એક ખોલવા 1 મિનિટ ઉછીની લો દબાવો.",
    "One minute gives sixty seconds.": "એક મિનિટ સાઠ સેકન્ડ આપે.",
    "What does one hour give when both columns need filling?": "બંને ખાનાં ભરવાનાં હોય તો એક કલાક શું આપે?",
    "After both breaks, take away from the right, one column at a time.": "બંને વાર ઉછીના પછી જમણેથી એક એક ખાનું બાદ કરો.",
    "One hour fills both empty columns as 59 minutes and 60 seconds.": "એક કલાક 59 મિનિટ અને 60 સેકન્ડ બનીને બંને ખાલી ખાનાં ભરે.",
    "You learned: one hour can break into 59 minutes and 60 seconds.": "તમે શીખ્યા: 1 કલાક 59 મિનિટ 60 સેકન્ડ બને.",
    "Break twice, then take 2 hours 36 minutes 45 seconds away from 6 hours.": "બે વાર ઉછીના લો, પછી 6 કલાકમાંથી 2 કલાક 36 મિનિટ 45 સેકન્ડ બાદ કરો.",
    "Take away twice": "બે વાર ઉછીના, બાદ કરો",
    "Take 4 hours 18 minutes 50 seconds away from 9 hours in the same way.": "આ રીતે 9 કલાકમાંથી 4 કલાક 18 મિનિટ 50 સેકન્ડ બાદ કરો.",
    "Time left?": "કેટલો સમય બાકી?",
    "Both empty columns need filling before you take away.": "બાદ કરતાં પહેલાં બંને ખાલી ખાનાં ભરવાં પડશે.",
    "Now take 1 hour 42 minutes 25 seconds away from 3 hours.": "હવે 3 કલાકમાંથી 1 કલાક 42 મિનિટ 25 સેકન્ડ બાદ કરો.",
    "What is left?": "શું બાકી રહ્યું?",
    "Take the seconds away first, then the minutes, then the hours.": "પહેલાં સેકન્ડ બાદ કરો, પછી મિનિટ, પછી કલાક.",
    /* win lines (item data, said at the win) */
    "Yes, 7 hours 39 minutes 48 seconds.": "હા, 7 કલાક 39 મિનિટ 48 સેકન્ડ.",
    "Yes, 8 hours 36 minutes.": "હા, 8 કલાક 36 મિનિટ.",
    "Yes, 5 under hours, 07 under minutes, 42 under seconds.": "હા, કલાકમાં 5, મિનિટમાં 07, સેકન્ડમાં 42.",
    "Yes, 9 hours 25 minutes.": "હા, 9 કલાક 25 મિનિટ.",
    "Yes, 4 hours and no minutes.": "હા, 4 કલાક અને 0 મિનિટ.",
    "Yes, 1 minute 23 seconds.": "હા, 1 મિનિટ 23 સેકન્ડ.",
    "Yes, 4 hours 35 minutes.": "હા, 4 કલાક 35 મિનિટ.",
    "Yes, 3 hours 33 minutes.": "હા, 3 કલાક 33 મિનિટ.",
    "Yes, 27 seconds faster.": "હા, 27 સેકન્ડ વહેલી.",
    "Yes, 3 hours 23 minutes 15 seconds.": "હા, 3 કલાક 23 મિનિટ 15 સેકન્ડ.",
    "Yes, 4 hours 41 minutes 10 seconds.": "હા, 4 કલાક 41 મિનિટ 10 સેકન્ડ.",
    "Yes, 1 hour 17 minutes 35 seconds.": "હા, 1 કલાક 17 મિનિટ 35 સેકન્ડ.",
    /* keys and board words */
    "Carry": "વદી", "Break": "ઉછીના લો", "Break an hour": "1 કલાક ઉછીના લો", "Break a minute": "1 મિનિટ ઉછીની લો",
    "Show": "બતાવો", "Check": "ચકાસો", "New sum": "નવો દાખલો",
    "60 cells": "60 ચોરસ", "60 min = 1 h": "60 મિનિટ = 1 કલાક", "60 s = 1 min": "60 સેકન્ડ = 1 મિનિટ",
    "1 h = 60 min": "1 કલાક = 60 મિનિટ", "1 min = 60 s": "1 મિનિટ = 60 સેકન્ડ",
    "Add back": "પાછું ઉમેરો", "Count in seconds": "સેકન્ડમાં ગણો", "too many": "વધારે",
    /* educator round 2026-11-16: the sixty in plain words (rungs) and the worked line's unit words */
    "60 minutes make 1 hour, so minutes past 60 go over to the hours.": "60 મિનિટનો 1 કલાક થાય, તેથી 60 ઉપરની મિનિટ કલાકમાં જાય.",
    "Like 40 + 35 = 75 minutes: 60 make 1 hour, 15 are left.": "જેમ કે 40 + 35 = 75 મિનિટ: 60નો 1 કલાક થયો, 15 બાકી.",
    "Minutes stop at 59, so take out 60 as 1 more hour and keep the rest.": "મિનિટ 59 સુધી જ હોય, તો 60નો 1 કલાક બનાવો, બાકી રાખો.",
    "Like 40 + 20 = 60 minutes: that is 1 whole hour, no minutes left.": "જેમ કે 40 + 20 = 60 મિનિટ: તે આખો 1 કલાક છે, કોઈ મિનિટ બાકી નહીં.",
    "Add the hours, then add 1 more hour for the 60 minutes.": "કલાક ઉમેરો, પછી 60 મિનિટનો 1 કલાક વધુ ઉમેરો.",
    "Like 50 + 25 = 75 seconds: 60 make 1 minute, 15 are left.": "જેમ કે 50 + 25 = 75 સેકન્ડ: 60ની 1 મિનિટ થઈ, 15 બાકી.",
    "Seconds stop at 59, so the 60 become 1 minute and the rest stay.": "સેકન્ડ 59 સુધી જ હોય, તો 60ની 1 મિનિટ બને, બાકી રહે.",
    "Too few minutes on top: take 1 hour = 60 minutes first.": "ઉપર મિનિટ ઓછી છે: પહેલાં 1 કલાક = 60 મિનિટ લો.",
    "Like 3 hours 10 minutes: it is 2 hours and 10 + 60 = 70 minutes.": "જેમ કે 3 કલાક 10 મિનિટ: તે 2 કલાક અને 10 + 60 = 70 મિનિટ છે.",
    "Then 70 minutes take away 40 is 30 minutes, with 1 hour less.": "પછી 70 મિનિટમાંથી 40 બાદ કરો તો 30 મિનિટ, અને 1 કલાક ઓછો.",
    "Take 1 hour = 60 minutes first, and add it to the top minutes.": "પહેલાં 1 કલાક = 60 મિનિટ લો, અને તેને ઉપરની મિનિટમાં ઉમેરો.",
    "Like 4 hours 15 minutes: it is 3 hours and 15 + 60 = 75 minutes.": "જેમ કે 4 કલાક 15 મિનિટ: તે 3 કલાક અને 15 + 60 = 75 મિનિટ છે.",
    "Take away the minutes from that bigger number, then do the hours.": "તે મોટી સંખ્યામાંથી મિનિટ બાદ કરો, પછી કલાક કરો.",
    "Too few seconds on top: take 1 minute = 60 seconds first.": "ઉપર સેકન્ડ ઓછી છે: પહેલાં 1 મિનિટ = 60 સેકન્ડ લો.",
    "Like 4 minutes 10 seconds: it is 3 minutes and 10 + 60 = 70 seconds.": "જેમ કે 4 મિનિટ 10 સેકન્ડ: તે 3 મિનિટ અને 10 + 60 = 70 સેકન્ડ છે.",
    "Then take away the seconds from that bigger number, then the minutes.": "પછી તે મોટી સંખ્યામાંથી સેકન્ડ બાદ કરો, પછી મિનિટ.",
    "Take 1 hour = 60 minutes first, then 1 minute = 60 seconds.": "પહેલાં 1 કલાક = 60 મિનિટ લો, પછી 1 મિનિટ = 60 સેકન્ડ.",
    "Like 2 hours: it is 1 hour 59 minutes 60 seconds after both breaks.": "જેમ કે 2 કલાક: બંને વાર ઉછીના પછી તે 1 કલાક 59 મિનિટ 60 સેકન્ડ છે.",
    "Then take away from the right: seconds, then minutes, then hours.": "પછી જમણેથી બાદ કરો: સેકન્ડ, પછી મિનિટ, પછી કલાક.",
    "1 hour = 60 minutes, then 1 of those minutes = 60 seconds.": "1 કલાક = 60 મિનિટ, પછી તેમાંથી 1 મિનિટ = 60 સેકન્ડ.",
    "Like 4 hours: it is 3 hours 59 minutes 60 seconds before you take away.": "જેમ કે 4 કલાક: બાદ કરતાં પહેલાં તે 3 કલાક 59 મિનિટ 60 સેકન્ડ છે.",
    "Break 1 hour into 60 minutes, then 1 minute into 60 seconds.": "1 કલાકની 60 મિનિટ બનાવો, પછી 1 મિનિટની 60 સેકન્ડ.",
    "Like 5 hours: it is 4 hours 59 minutes 60 seconds, then take away.": "જેમ કે 5 કલાક: તે 4 કલાક 59 મિનિટ 60 સેકન્ડ છે, પછી બાદ કરો.",
    "hour": "કલાક",
    "hours": "કલાક",
    "minute": "મિનિટ",
    "minutes": "મિનિટ",
    "second": "સેકન્ડ",
    "seconds": "સેકન્ડ",
  },
};

/* One entry per phase = one mount. Each phase's guide steps work a WARM-UP (`warm`), never question 1's own sum.
   Item fields of this tool: units (the columns used), op (+ or -), top / bot (each time, by column; null = nothing in
   that place), place (phase 1: the child drags the cards into the frame), target (the number IS the question: no
   act, answerForms exempt), near (the misconception's answer), win (the win line). */
const PHASES = [
  {
    n: 1,
    concept: "A column for each unit",
    conceptId: "M2.S3.T6.C25", objectiveIds: ["O9"],
    says: ["Put each part under its own heading. Which column do you add first?"],
    warm: { op: "+", units: ["h", "m", "s"], top: [1, 5, 20], bot: null, place: true },
    steps: [
      { say: "Drag the 1 h card down under the Hours heading.", on: "hours", hint: "The card that says h goes in the Hours column." },
      { say: "Now put the 5 min card under Minutes.", on: "minutes", hint: "Find the card that says min." },
      { say: "Put the 20 s card under Seconds, the column on the right.", on: "seconds", hint: "The s card goes in the last column." },
    ],
    ladder: ["Start with the column on the right, the smallest unit.", "Write each column's own total under it, seconds first."],
    closing: "Each unit has its own column, and the smallest is added first.",
    learned: "You learned: each unit has a column; add the column on the right first.",
    traceback: "Every card settles under its own heading, then the answer line is written column by column from the seconds.",
    items: [
      /* learn ML1: answer in the plan = 7 hours 39 minutes 48 seconds */
      { qid: "M2.S3.T6.C25:ML1", kind: "place", op: "+", units: ["h", "m", "s"], top: [2, 25, 10], bot: [5, 14, 38], place: true,
        parts: tcParts(["h", "m", "s"]), answer: [7, 39, 48], near: [8, 39, 48],
        say: "Put each card in its column, then add the two times.", ask: "Add the times",
        miss: "Each card goes under the heading of its own unit.", win: "Yes, 7 hours 39 minutes 48 seconds." },
      /* practice 1: answer in the plan = 8 hours 36 minutes */
      { qid: "M2.S3.T6.C25:1", kind: "place", op: "+", units: ["h", "m"], top: [3, 20], bot: [5, 16], place: true,
        parts: tcParts(["h", "m"]), answer: [8, 36], near: [8, 63],
        say: "Place these cards too and find the total time.", ask: "Total time?",
        miss: "Add the minutes first, then the hours.", win: "Yes, 8 hours 36 minutes." },
      /* practice 2: answer in the plan = 5 under hours, 07 under minutes and 42 under seconds.
         plan question: The time 5 hours 7 minutes 42 seconds is written in the frame. What goes under each heading?
         The number IS the question (target): no act, typed straight into the three boxes. */
      { qid: "M2.S3.T6.C25:2", kind: "write", op: "+", units: ["h", "m", "s"], top: [5, 7, 42], bot: null, target: true,
        parts: tcParts(["h", "m", "s"]), answer: [5, 7, 42], near: [5, 70, 42],
        say: "What goes under each heading for 5 hours 7 minutes 42 seconds?", ask: "Under each heading?",
        miss: "Minutes take two places, so a small number gets a 0 in front.", win: "Yes, 5 under hours, 07 under minutes, 42 under seconds." },
    ],
  },
  {
    n: 2,
    concept: "Sixty or more carries",
    conceptId: "M2.S3.T6.C26", objectiveIds: ["O9"],
    says: ["The minutes make sixty or more. What goes over to the hours, and what is left?"],
    warm: { op: "+", units: ["h", "m"], top: [1, 40], bot: [2, 35] },
    steps: [
      { say: "40 and 35 minutes make 75, so tap Carry to send 60 through the gate.", on: "carry", hint: "The Carry key is under the cells." },
    ],
    ladder: ["Is the column sixty or more?", "Take out sixty as one of the next unit, keep the rest and add the carry."],
    closing: "Sixty or more in a column carries one to the next column.",
    learned: "You learned: a column of sixty or more carries one to the left.",
    traceback: "Sixty cells pass through the gate into the carry circle, then the answer line is written from the right.",
    items: [
      /* learn ML2: answer in the plan = 9 hours 25 minutes */
      { qid: "M2.S3.T6.C26:ML2", kind: "carry", op: "+", units: ["h", "m"], top: [6, 48], bot: [2, 37],
        parts: tcParts(["h", "m"]), answer: [9, 25], near: [8, 85],
        say: "Tap Carry, then add the two times in the frame.", ask: "Add and carry",
        miss: "60 minutes make 1 hour, so minutes past 60 go over to the hours.",
        ladder: ["Like 40 + 35 = 75 minutes: 60 make 1 hour, 15 are left.", "Minutes stop at 59, so take out 60 as 1 more hour and keep the rest."],
        win: "Yes, 9 hours 25 minutes." },
      /* practice 3: answer in the plan = 4 hours. The minutes make exactly 60, which carries one hour and leaves 00 minutes */
      { qid: "M2.S3.T6.C26:3", kind: "carry", op: "+", units: ["h", "m"], top: [1, 30], bot: [2, 30], asks: ["h"],
        parts: tcParts(["h"]), answer: [4], near: [3],
        say: "Add 1 hour 30 minutes and 2 hours 30 minutes the same way.", ask: "Sum of times?",
        miss: "Exactly sixty minutes is one whole hour too.",
        ladder: ["Like 40 + 20 = 60 minutes: that is 1 whole hour, no minutes left.", "Add the hours, then add 1 more hour for the 60 minutes."],
        win: "Yes, 4 hours and no minutes." },
      /* practice 4: answer in the plan = 1 minute 23 seconds, because 83 seconds is 60 seconds and 23 more.
         plan question: Add 45 seconds and 38 seconds. Give the answer in minutes and seconds. */
      { qid: "M2.S3.T6.C26:4", kind: "carry", op: "+", units: ["m", "s"], top: [null, 45], bot: [null, 38],
        parts: tcParts(["m", "s"]), answer: [1, 23], near: [0, 83],
        say: "Add 45 seconds and 38 seconds, and give minutes and seconds.", ask: "In min and s?",
        miss: "Sixty seconds make one minute.",
        ladder: ["Like 50 + 25 = 75 seconds: 60 make 1 minute, 15 are left.", "Seconds stop at 59, so the 60 become 1 minute and the rest stay."],
        win: "Yes, 1 minute 23 seconds." },
      /* practice 5 (M2.S3.T6.C26:5, three readings adding to 120 minutes) is left out: three questions a phase. */
    ],
  },
  {
    n: 3,
    concept: "Borrowing an hour",
    conceptId: "M2.S3.T6.C27", objectiveIds: ["O10"],
    says: ["There are not enough minutes on top. What can one hour give you?"],
    warm: { op: "-", units: ["h", "m"], top: [3, 10], bot: [1, 40] },
    steps: [
      { say: "10 minutes is too few to take 40 from, so tap Break.", on: "break", hint: "The Break key is under the cells." },
    ],
    ladder: ["One hour gives sixty minutes, and the hours go down by one.", "Add sixty to the top minutes, take away, then do the hours."],
    closing: "When the top is too small, break one from the left into sixty.",
    learned: "You learned: too few on top? Break one into sixty and take one off.",
    traceback: "The pencil strikes the top hours, writes one less and sixty more minutes, then the answer line is written from the right.",
    items: [
      /* learn ML3: answer in the plan = 4 hours 35 minutes */
      { qid: "M2.S3.T6.C27:ML3", kind: "break", op: "-", units: ["h", "m"], top: [8, 25], bot: [3, 50],
        parts: tcParts(["h", "m"]), answer: [4, 35], near: [5, 25],
        say: "Use Break, then take 3 hours 50 minutes away from 8 hours 25 minutes.", ask: "Take away",
        miss: "Too few minutes on top: take 1 hour = 60 minutes first.",
        ladder: ["Like 3 hours 10 minutes: it is 2 hours and 10 + 60 = 70 minutes.", "Then 70 minutes take away 40 is 30 minutes, with 1 hour less."],
        win: "Yes, 4 hours 35 minutes." },
      /* practice 6: answer in the plan = 3 hours 33 minutes */
      { qid: "M2.S3.T6.C27:6", kind: "break", op: "-", units: ["h", "m"], top: [5, 20], bot: [1, 47],
        parts: tcParts(["h", "m"]), answer: [3, 33], near: [4, 27],
        say: "Take 1 hour 47 minutes away from 5 hours 20 minutes the same way.", ask: "Difference?",
        miss: "Take 1 hour = 60 minutes first, and add it to the top minutes.",
        ladder: ["Like 4 hours 15 minutes: it is 3 hours and 15 + 60 = 75 minutes.", "Take away the minutes from that bigger number, then do the hours."],
        win: "Yes, 3 hours 33 minutes." },
      /* practice 7: answer in the plan = 27 seconds. Break one minute into 60 seconds: 65 less 38 is 27 seconds.
         plan question: A runner's best time was 1 hour 12 minutes 5 seconds. A new run takes 1 hour 11 minutes 38 seconds. By how much is the best time beaten? */
      { qid: "M2.S3.T6.C27:7", kind: "break", op: "-", units: ["h", "m", "s"], top: [1, 12, 5], bot: [1, 11, 38],
        asks: ["s"], parts: tcParts(["s"]), answer: [27], near: [33],
        say: "By how much does a run of 1 h 11 min 38 s beat 1 h 12 min 5 s?", ask: "How much faster?",
        miss: "Too few seconds on top: take 1 minute = 60 seconds first.",
        ladder: ["Like 4 minutes 10 seconds: it is 3 minutes and 10 + 60 = 70 seconds.", "Then take away the seconds from that bigger number, then the minutes."],
        win: "Yes, 27 seconds faster." },
    ],
  },
  {
    n: 4,
    concept: "Borrowing across an empty column",
    conceptId: "M2.S3.T6.C28", objectiveIds: ["O10"],
    says: ["The minutes and seconds on top are empty. How can one hour fill both?"],
    warm: { op: "-", units: ["h", "m", "s"], top: [2, 0, 0], bot: [0, 30, 20] },
    steps: [
      { say: "Tap Break an hour to open one hour.", on: "break", hint: "The key is under the cells." },
      { say: "Now tap Break a minute to open one of those 60 minutes.", on: "break2", hint: "One minute gives sixty seconds." },
    ],
    ladder: ["What does one hour give when both columns need filling?", "After both breaks, take away from the right, one column at a time."],
    closing: "One hour fills both empty columns as 59 minutes and 60 seconds.",
    learned: "You learned: one hour can break into 59 minutes and 60 seconds.",
    traceback: "Both breaks are written in wine, the top reads one hour less, 59 minutes and 60 seconds, then the answer line from the right.",
    items: [
      /* learn ML4: answer in the plan = 3 hours 23 minutes 15 seconds */
      { qid: "M2.S3.T6.C28:ML4", kind: "break2", op: "-", units: ["h", "m", "s"], top: [6, 0, 0], bot: [2, 36, 45],
        parts: tcParts(["h", "m", "s"]), answer: [3, 23, 15], near: [3, 24, 15],
        say: "Break twice, then take 2 hours 36 minutes 45 seconds away from 6 hours.", ask: "Take away twice",
        miss: "Take 1 hour = 60 minutes first, then 1 minute = 60 seconds.",
        ladder: ["Like 2 hours: it is 1 hour 59 minutes 60 seconds after both breaks.", "Then take away from the right: seconds, then minutes, then hours."],
        win: "Yes, 3 hours 23 minutes 15 seconds." },
      /* practice 8: answer in the plan = 4 hours 41 minutes 10 seconds, because 9 hours is 8 hours 59 minutes 60 seconds */
      { qid: "M2.S3.T6.C28:8", kind: "break2", op: "-", units: ["h", "m", "s"], top: [9, 0, 0], bot: [4, 18, 50],
        parts: tcParts(["h", "m", "s"]), answer: [4, 41, 10], near: [5, 18, 50],
        say: "Take 4 hours 18 minutes 50 seconds away from 9 hours in the same way.", ask: "Time left?",
        miss: "Both empty columns need filling before you take away.",
        ladder: ["1 hour = 60 minutes, then 1 of those minutes = 60 seconds.", "Like 4 hours: it is 3 hours 59 minutes 60 seconds before you take away."],
        win: "Yes, 4 hours 41 minutes 10 seconds." },
      /* authored: the plan has two questions for this concept and a phase has three. 3 hours less 1 hour 42 minutes 25 seconds
         = 1 hour 17 minutes 35 seconds (3 hours is 2 hours 59 minutes 60 seconds). */
      { qid: null, kind: "break2", op: "-", units: ["h", "m", "s"], top: [3, 0, 0], bot: [1, 42, 25],
        parts: tcParts(["h", "m", "s"]), answer: [1, 17, 35], near: [1, 18, 35],
        say: "Now take 1 hour 42 minutes 25 seconds away from 3 hours.", ask: "What is left?",
        miss: "Take the seconds away first, then the minutes, then the hours.",
        ladder: ["Break 1 hour into 60 minutes, then 1 minute into 60 seconds.", "Like 5 hours: it is 4 hours 59 minutes 60 seconds, then take away."],
        win: "Yes, 1 hour 17 minutes 35 seconds." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  columns: ["Hours", "Minutes", "Seconds"], gate: 60, cells: { rows: 6, cols: 10 },
  acts: { place: "drag each card under its heading", carry: "sixty cells through the gate into the carry circle",
    break: "strike the digit on the left, write one less, write sixty more on the right", check: "add the answer back to the smaller time" },
  unusedQuestionIds: ["M2.S3.T6.C26:5"],
  /* the answer gate (PATTERNS §20): the Answer key and pad are locked, after the child's first real touch, until the act is done */
  answerGate: { "1.1": "place all six cards", "1.2": "place all four cards", "1.3": "ungated (the time is the question; typed)",
    "2.1": "Carry", "2.2": "Carry", "2.3": "Carry", "3.1": "Break", "3.2": "Break", "3.3": "Break (a minute)",
    "4.1": "Break an hour, then Break a minute", "4.2": "Break an hour, then Break a minute", "4.3": "Break an hour, then Break a minute" },
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: every box by value (07 and 7 are the same minutes; an empty box is never right, so a 0 is typed) */
const judge = (item: any, v: any) => {
  if (item.parts && item.units) {
    const u: string[] = item.asks || item.units, got = slotPartsOf(v, u.length);
    if (u.some((k: string, i: number) => k !== "h" && got[i].length > 2)) return false;
  }
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: a second route that shares no code with the columns: everything in seconds, then split back */
const tcSize = (k: string) => (k === "h" ? 3600 : k === "m" ? 60 : 1);
const tcSecs = (u: string[], v: any[]) => u.reduce((a: number, k: string, i: number) => a + (v && v[i] ? v[i] : 0) * tcSize(k), 0);
const tcSplit = (u: string[], s: number) => { let r = s; return u.map((k) => { const q = Math.floor(r / tcSize(k)); r -= q * tcSize(k); return q; }); };
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const want = it.target ? it.top : tcSplit(it.units, it.op === "-" ? tcSecs(it.units, it.top) - tcSecs(it.units, it.bot) : tcSecs(it.units, it.top) + tcSecs(it.units, it.bot));
  const asked: string[] = it.asks || it.units;
  return asked.every((k: string, j: number) => want[it.units.indexOf(k)] === it.answer[j]) && (it.target || tcColumns(it).res.every((x: number, i: number) => x === want[i]));
}));
/* the most likely wrong answer (the item's misconception); judge must reject it */
const nearMiss = (item: any) => (item.near ? item.near.join("|") : item.parts ? item.answer.map((x: any) => x + 1).join("|") : "~");
/* the forms of an answer that no question, hint or ladder line may print (a target's number IS the question) */
const answerForms = (item: any) => (item.target ? [] : item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: does the question's act at once (place, carry, break) and lets Enter answer.
   Set only while a question is open, so a guide step (stage "demo") reaches api.onEnter. */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area ────────────────────────────────────────────────────────────────────────
   keyOnly + bigPad: 1472 x 520 with the panel shut, 900 x 520 open; box.key is the key's corner (top right).
   The frame (x 132 to 806) always fits the open width; the cell panel and the act key stand right of it, drawn only
   while the panel is shut (every act is done with it shut: the Answer key is gated until the act). */
/* the frame starts at y 100 (10 clear of the worked box above it, which ends at 90) */
const TC_ROW = { head: 142, lv1: 247, top: 256, bot: 338, rule: 422, ans: 432, h: 74 };
const tcPenInk = (k: string) => shade(TC_COL[k], 0.42);
const TC_PEN_W = 8.5;
const TC_COLW = 220, TC_GAP = 56, TC_X0 = 112, TC_CIRC = 214, TC_PEN = 52;

/* a row of short text chunks (each its own <text>, at most 4 words) set side by side by their measured widths, centred on cx;
   re-measured once the fonts are ready (an estimate draws the first frame) */
function TcFlow({ chunks, cx, y, size }: any) {
  const refs = useRef<any[]>([]);
  const [ws, setWs] = useState<any>(null);
  const est = (t: string) => t.length * size * 0.58;
  const key = chunks.map((c: any) => c.t).join("|");
  useEffect(() => {
    let live = true;
    const m = () => { if (!live) return;
      const w = chunks.map((c: any, i: number) => { try { const el = refs.current[i]; return el ? el.getComputedTextLength() : est(c.t); } catch (e) { return est(c.t); } });
      setWs((p: any) => (p && p.key === key && p.w.join() === w.join() ? p : { key, w })); };
    m();
    try { (document as any).fonts.ready.then(m); } catch (e) { /* no font API: the first measure stands */ }
    return () => { live = false; };
  }, [key]);
  const w = chunks.map((c: any, i: number) => (ws && ws.key === key ? ws.w[i] : est(c.t)));
  const gap = size * 0.3, tot = w.reduce((a: number, b: number) => a + b, 0) + gap * (chunks.length - 1);
  let x = cx - tot / 2;
  return (
    <g>
      {chunks.map((c: any, i: number) => { const x0 = x; x += w[i] + gap;
        return <text key={i} ref={(el: any) => { refs.current[i] = el; }} x={x0} y={y} fontSize={size} fontWeight={700} fill={c.fill}>{c.t}</text>; })}
    </g>
  );
}

function Work({ n, item, index, stage, wrong, typed, api, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const P: any = PHASES[n - 1];
  const free = stage === "free";
  const warm = !free && (stage === "demo" || stage === "teach") && P.warm;
  const [freeI, setFreeI] = useState(0);
  const B: any = free ? TC_FREE[freeI % TC_FREE.length] : warm ? P.warm : (item || P.items[0]);
  const won = !free && !warm && (stage === "win" || stage === "idle");

  /* the board belongs to the ENTRY of a question (PATTERNS §18): rebuilt whenever the question key changes */
  const qkey = n + ":" + (free ? "f" + freeI : warm ? "w" : index);
  const ent = useRef({ q: "", k: 0 });
  if (ent.current.q !== qkey) ent.current = { q: qkey, k: ent.current.k + 1 };
  const tag = qkey + "#" + ent.current.k;
  const tagRef = useRef(tag);
  tagRef.current = tag;
  const fresh = (): any => ({ tag, placed: {}, carried: 0, links: 0, pc: 0, lift: -1, moving: "", flash: "", tb: -1, tb2: 0, tb3: 0, shown: false, check: 0, fly: null });
  const [raw, setRaw] = useState<any>(fresh);
  let S: any = raw.tag === tag ? raw : fresh();
  const put = (o: any) => { const t = tag; if (t !== tagRef.current) return;
    setRaw((p: any) => { const b = p.tag === t ? p : { ...fresh(), tag: t }; return { ...b, ...(typeof o === "function" ? o(b) : o) }; }); };
  const [touched, setTouched] = useState(false);
  const touch = () => { if (!touched) setTouched(true); };
  const acting = useRef(false);
  const [busy, setBusy] = useState(false);
  const dv = lang !== "en";
  const tbOn = useRef(false);

  /* geometry */
  const u: string[] = B.units, nc = u.length;
  const cols = tcColumns(B);
  const colX = (i: number) => TC_X0 + i * (TC_COLW + TC_GAP);
  const cx = (i: number) => colX(i) + TC_COLW / 2;
  const gateX = (i: number) => colX(i) + TC_COLW + TC_GAP / 2;
  const base = (y: number) => y + TC_ROW.h / 2 + 21;
  /* two breaks stack a second rewrite (59 over the struck 60) under the heading chip: those questions write every rewrite
     smaller, so the 59 clears the 60 by about 9 and the chip by about 13 (ink, the pen's width included) */
  const penS = cols.links.length > 1 ? 40 : TC_PEN, penW = cols.links.length > 1 ? 7 : TC_PEN_W, pk = penS / TC_PEN;
  const lvBase = (lv: number) => (lv <= 0 ? base(TC_ROW.top) : TC_ROW.lv1 - (lv - 1) * Math.round(penS * 0.72 + penW + 9));
  const right = colX(nc - 1) + TC_COLW;
  const kx = box && box.key ? box.key.x - 12 : (box ? box.w : 1472);
  const wide = !!box && box.w > 1350;
  const PX = Math.min(920, right + 48), PY = 100, PW = 520, PH = 310;
  const panelC = { x: PX + PW / 2, y: PY + 190 };
  const hasBot = !!B.bot;

  /* phase 1: the cards on the line of times */
  const cardMode = !!B.place || !!B.target;
  const rowsOfCards = hasBot ? [0, 1] : [0];
  const cards: any[] = [];
  if (cardMode) for (const r of rowsOfCards) u.forEach((k, i) => {
    const v = r === 0 ? B.top[i] : B.bot[i];
    if (v !== null && v !== undefined) cards.push({ id: warm ? (k === "h" ? "hours" : k === "m" ? "minutes" : "seconds") : "card-" + r + "-" + k, on: k === "h" ? "hours" : k === "m" ? "minutes" : "seconds", r, i, k, v });
  });
  const avail = Math.min(box ? box.w : 1472, kx) - 16;
  const nCards = Math.max(1, cards.length);
  const iconW = box && box.open ? 0 : 80;
  const cardW = Math.max(112, Math.min(176, Math.floor((avail - rowsOfCards.length * iconW - nCards * 12) / nCards)));
  const cardFs = Math.max(32, Math.min(40, Math.floor((cardW - 16) / 3.4)));
  const cardBox = (c: any) => {
    let x = 8;
    for (const r of rowsOfCards) {
      x += iconW;
      for (const d of cards) { if (d.r !== r) continue; if (d === c) return { x, y: 6, w: cardW, h: 76 }; x += cardW + 12; }
      x += 0;
    }
    return { x, y: 6, w: cardW, h: 76 };
  };
  const iconX = (r: number) => { let x = 8; for (const rr of rowsOfCards) { if (rr === r) return x; x += iconW + cards.filter((d) => d.r === rr).length * (cardW + 12); } return x; };
  const allPlaced = cards.reduce((a: any, c: any) => ({ ...a, [c.id]: true }), {});
  /* a won question keeps its whole picture (the carried 1, the strikes and rewrites, the filled sixty cells) even when it
     was answered with no act, so the rows above it can be followed at the phase end too */
  if (won && (S.carried < cols.carries.length || S.links < cols.links.length || (B.place && cards.some((c: any) => !S.placed[c.id]))))
    S = { ...S, placed: allPlaced, carried: cols.carries.length, links: cols.links.length, pc: 0, fly: null, moving: "",
      lift: cols.links.length ? cols.links[cols.links.length - 1].to : cols.carries.length ? cols.carries[cols.carries.length - 1] : -1 };
  const isPlaced = (r: number, i: number) => !B.place || !!S.placed[cards.find((c) => c.r === r && c.i === i)?.id || "-"];
  const placedAll = !B.place || cards.every((c) => S.placed[c.id]);
  const cellC = (r: number, i: number) => ({ x: cx(i), y: (r === 0 ? TC_ROW.top : TC_ROW.bot) + TC_ROW.h / 2 });

  /* what this question still needs before its answer (the act that gates the Answer key) */
  const nCarry = cols.carries.length, nLink = cols.links.length;
  const actDone = placedAll && S.carried >= nCarry && S.links >= nLink;
  const gateLock = !free && stage === "ask" && !B.target && !actDone && touched;
  const gl = useRef(false);
  useEffect(() => {
    if (tbOn.current) return;
    if (stage === "ask" || gl.current) { gl.current = gateLock; api.lock(gateLock); }
  }, [gateLock, tag, stage]);

  /* the stacks of top figures: the original and every rewrite above it (each rewrite strikes the one below) */
  const stk: any[] = u.map((k, i) => [{ v: B.top[i], lv: 0 }]);
  cols.links.slice(0, S.links).forEach((L: any) => { stk[L.from].push({ v: L.a, lv: stk[L.from].length }); stk[L.to].push({ v: L.b, lv: stk[L.to].length }); });
  const strikeOf = (i: number, e: any) => {
    if (e.lv === 0) { const h = u[i] === "h" ? 64 : 100, y = base(TC_ROW.top); return [cx(i) - h, y - 14, cx(i) + h, y - 32]; }
    const half = (tcPad(e.v, u[i]).length * 16 + 10) * pk, y = lvBase(e.lv);
    return [cx(i) - half, y - 10 * pk, cx(i) + half, y - 28 * pk];
  };

  function nextRegroupOf() { return S.carried < nCarry ? (S.carried ? "carry2" : "carry") : S.links < nLink ? (S.links ? "break2" : "break") : ""; }

  /* ── the acts ─────────────────────────────────────────────────────────────────────────── */
  /* the card / the 60 tile glides by itself (no hand); the act counts only when it lands, so the answer gate
     (gateLock: !actDone && touched) stays shut for the whole glide */
  /* a card tapped while another glides waits its turn (the play tester, 2026-11-16): it glides as soon as the one before lands */
  const cardQ = useRef<any>({ tag: "", list: [] as any[] });
  if (cardQ.current.tag !== tag) cardQ.current = { tag, list: [] };
  const Snow = useRef<any>(S);
  Snow.current = S;
  const placeCard = async (c: any, fromStep: boolean) => {
    if (Snow.current.placed[c.id]) return;
    if (acting.current) {
      if (!fromStep && S.moving !== c.id && !cardQ.current.list.some((d: any) => d.id === c.id)) cardQ.current.list.push(c);
      return;
    }
    acting.current = true; setBusy(true);
    const t = tag, b = cardBox(c), to = cellC(c.r, c.i);
    put({ moving: c.id, fly: { id: c.id, k: c.k, v: c.v, w: b.w, x: to.x, y: to.y, dx: b.x + b.w / 2 - to.x, dy: b.y + b.h / 2 - to.y } });
    await tcWait(TC_FLY);
    acting.current = false; setBusy(false);
    if (t !== tagRef.current) return;
    put((p: any) => ({ placed: { ...p.placed, [c.id]: true }, moving: "", fly: null }));
    api.sfx.tick();
    if (fromStep) api.did(c.on);
    const q = cardQ.current.tag === t ? cardQ.current.list.shift() : null;
    if (q) placeCard(q, false);
  };
  const doCarry = async (fromStep: boolean, on: string) => {
    if (acting.current || S.carried >= nCarry) return;
    acting.current = true; setBusy(true);
    const t = tag, src = cols.carries[S.carried];
    const from = wide ? panelC : { x: gateX(src - 1), y: TC_ROW.top + 40 }, to = { x: cx(src - 1), y: TC_CIRC };
    put({ lift: src, fly: { id: "sixty", k: u[src], x: to.x, y: to.y, dx: from.x - to.x, dy: from.y - to.y } });
    await tcWait(TC_FLY);
    acting.current = false; setBusy(false);
    if (t !== tagRef.current) return;
    put((p: any) => ({ carried: p.carried + 1, fly: null }));
    api.sfx.trade();
    if (fromStep) api.did(on);
  };
  const doBreak = async (fromStep: boolean, on: string) => {
    if (acting.current || S.links >= nLink) return;
    acting.current = true; setBusy(true);
    const L = cols.links[S.links];
    const ef = stk[L.from][stk[L.from].length - 1], et = stk[L.to][stk[L.to].length - 1];
    const t1 = tcPad(L.a, u[L.from]), t2 = tcPad(L.b, u[L.to]);
    put({ lift: L.to, pc: 0 });
    const ok = await api.act({ tool: "pencil", moves: "write", color: [TC_DARK, tcPenInk(u[L.from]), TC_DARK, tcPenInk(u[L.to])], size: penS, align: "middle",
      text: [{ line: strikeOf(L.from, ef), size: penS }, t1, { line: strikeOf(L.to, et), size: penS }, t2],
      at: [null, { x: cx(L.from), y: lvBase(ef.lv + 1) }, null, { x: cx(L.to), y: lvBase(et.lv + 1) }],
      onPoint: (j: number) => put({ pc: j + 1 }) });
    acting.current = false; setBusy(false);
    if (!ok) { put({ pc: 0 }); return; }
    put((p: any) => ({ links: p.links + 1, pc: 0 }));
    api.sfx.settle();
    if (fromStep) api.did(on);
  };
  /* Check: the add-back strip fades in over the cells by itself (no hand) */
  const doCheck = () => {
    if (acting.current || S.check) return;
    put({ check: 1 }); api.sfx.settle();
  };
  const actOf = (on: string, fromStep: boolean) => {
    if (on === "carry" || on === "carry2") return doCarry(fromStep, on);
    if (on === "break" || on === "break2") return doBreak(fromStep, on);
    if (on === "show") { put({ shown: true }); api.sfx.settle(); return; }
    if (on === "check-sum") return doCheck();
    if (on === "new-sum") { setFreeI((i) => i + 1); return; }
    const c = cards.find((d) => d.on === on && !S.placed[d.id]);
    if (c) return placeCard(c, fromStep);
  };
  /* one key whose label follows the act; a 400 ms double-tap guard; in a step a press of another act is a wrong act */
  const lastKey = useRef(0);
  /* after the win the Check key stays, flat and quiet (disabled, taps ignored), so only the Next key reads as the thing to press */
  const quietCheck = (on: string) => won && on === "check-sum";
  const pressKey = (on: string) => {
    const t = Date.now();
    if (t - lastKey.current < 400) return;
    lastKey.current = t;
    if (quietCheck(on)) return;
    touch();
    if (stage === "demo") { if (stepOn !== on) { api.did(on); return; } actOf(on, true); return; }
    actOf(on, false);
  };
  /* a REAL key (trusted) counts as a touch, so the answer gate arms for a keyboard child too; the agent's check() is no key */
  const keyAt = useRef(0);
  useEffect(() => { const f = (e: any) => { if (e.isTrusted && (e.key === "Enter" || e.key === " ")) keyAt.current = Date.now(); };
    window.addEventListener("keydown", f, true); return () => window.removeEventListener("keydown", f, true); }, []);
  const byKey = () => { if (Date.now() - keyAt.current < 400) touch(); };
  const askAct = !free && stage === "ask" && !(box && box.open) && !!nextRegroupOf() && S.tb < 0 && !S.tb3;
  api.onEnter(stage === "demo" && stepOn ? () => { byKey(); actOf(stepOn, true); } : askAct ? () => { byKey(); actOf(nextRegroupOf(), false); } : null);

  /* dragging a card: dropped under its own heading it settles; anywhere else it slides back, its unit lit */
  const drag = useDrag((pl: any, at: any, moved: boolean) => {
    if (!pl || S.placed[pl.id] || S.moving === pl.id || (stage === "demo" && acting.current)) return;   /* at a question a tap while another card glides is queued by placeCard */
    touch();
    if (stage === "demo" && stepOn !== pl.on) { api.did(pl.on); return; }
    if (!moved || !isFinite(at.x)) { placeCard(pl, stage === "demo"); return; }
    let col = -1;
    if (at.y > 100) for (let i = 0; i < nc; i++) if (at.x >= colX(i) - TC_GAP / 2 && at.x <= colX(i) + TC_COLW + TC_GAP / 2) col = i;
    if (col === pl.i) {
      put((p: any) => ({ placed: { ...p.placed, [pl.id]: true } }));
      api.sfx.tick();
      if (stage === "demo") api.did(pl.on);
      return;
    }
    if (stage === "demo") api.did("misplace");
    put({ flash: pl.id });
    setTimeout(() => put((p: any) => (p.flash === pl.id ? { flash: "" } : {})), 1100);
  });

  /* the agent's check(): the act at once, then Enter answers */
  HOOK.check = !free && stage === "ask" && !actDone ? () => { put({ placed: allPlaced, carried: nCarry, links: nLink, pc: 0, fly: null, moving: "", lift: nLink ? cols.links[nLink - 1].to : nCarry ? cols.carries[nCarry - 1] : -1 }); return undefined; } : null;

  /* a Minutes or Seconds box holds two places: a third digit is dropped (the runtime pad has no cap per box) */
  useEffect(() => {
    if (free || stage !== "ask" || tbOn.current || !B.parts || typeof typed !== "string" || !typed) return;
    const ks: string[] = B.asks || B.units, ps = typed.split("|");
    const fixed = ps.map((x: string, i: number) => (ks[i] && ks[i] !== "h" && x.length > 2 ? x.slice(0, 2) : x)).join("|");
    if (fixed !== typed) api.setTyped(fixed);
  }, [typed]);

  /* the win line */
  useEffect(() => { if (stage === "win" && B.win) api.say(B.win); }, [stage === "win", tag]);

  /* the traceback: the act done (cards settle, sixty carried, the hour broken), then the answer line from the right */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    tbOn.current = true;
    const lift = nLink ? cols.links[nLink - 1].to : nCarry ? cols.carries[nCarry - 1] : -1;
    /* "one minute too many" (5 h 60 min 60 s for 6 h): the child's answer is 60 s over. Count both tops in seconds, then open 59 | 60 */
    const got = slotPartsOf(wrong.value, (B.asks || u).length).map((x: string) => Number(x) || 0);
    const tooMany = !free && nLink > 1 && !B.asks && tcSecs(u, got) - tcSecs(u, cols.res) === 60;
    const steps: any[] = tooMany
      ? [[400, () => put({ placed: allPlaced, carried: nCarry, links: 0, pc: 0, lift: -1, tb: 0, tb2: 0, tb3: 1 })], [1600, () => put({ tb3: 2 })],
        [2600, () => put({ tb3: 0, links: 1, lift: cols.links[0].to })], [900, () => put({ links: nLink, lift })]]
      : [[400, () => put({ placed: allPlaced, carried: nCarry, links: nLink, pc: 0, lift, tb: 0, tb2: 0 })]];
    if (B.target) {
      steps.push([700, () => put({ tb: 1 })], [900, () => put({ tb2: 1 })], [1400, () => put({ tb2: 0, tb: 2 })], [800, () => put({ tb: 3 })]);
    } else for (let k = 1; k <= nc; k++) steps.push([750, () => put({ tb: k })]);
    tl.run(steps, () => { tbOn.current = false; api.lock(false); gl.current = false; });
  }, [wrong]);
  useEffect(() => () => { tl.stop(); if (tbOn.current) { tbOn.current = false; api.lock(false); } }, [tag]);

  /* what the host and the agent read back (toolApi.getState): never the answer before it is given */
  api.share({ complete: stage === "idle", operation: B.op === "-" ? "take away" : "add", rows: [tcTime(u, B.top), hasBot ? tcTime(u, B.bot) : ""],
    placed: Object.keys(S.placed).length, carries: S.carried, breaks: S.links, checked: !!S.check });

  /* ── drawing ──────────────────────────────────────────────────────────────────────────── */
  const ink = (k: string) => shade(TC_COL[k], 0.3);
  const charsOf = (v: any, k: string) => (v === null || v === undefined ? null : k === "h" ? [String(v)] : tcPad(v, k).split(""));
  const cell = (i: number, y: number, chars: any, opts: any = {}) => {
    const k = u[i], two = k !== "h", bw = two ? 84 : 140;
    const xs = two ? [cx(i) - 92, cx(i) + 8] : [cx(i) - 70];
    return (
      <g key={"c" + i + "-" + y}>
        {xs.map((bx, j) => (
          <g key={j}>
            <rect x={bx} y={y} width={bw} height={TC_ROW.h} rx={10} fill={opts.dash ? "#FFFFFF" : "#FFFFFF"} fillOpacity={opts.dash ? 0.5 : 0.96}
              stroke={opts.dash ? tint(TC_DARK, 0.45) : TC_DARK} strokeWidth={opts.dash ? 2 : 2.4} strokeDasharray={opts.dash ? "8 7" : undefined} />
            {!opts.dash && <rect x={bx + 3} y={y + 3} width={bw - 6} height={5} rx={2} fill="#FFFFFF" fillOpacity={0.6} />}
          </g>
        ))}
        {/* one text a cell (the value reads whole), one tspan a place */}
        {chars && <text y={base(y)} textAnchor="middle" fontSize={T.xl} fontWeight={700}
          fill={opts.lit ? TC_WINE : chars.join("") !== "" && Number(chars.join("")) === 0 && two ? TC_ZERO : opts.inkc || ink(k)}>
          {xs.map((bx, j) => (chars[j] ? <tspan key={j} x={bx + bw / 2}>{chars[j]}</tspan> : null))}</text>}
      </g>
    );
  };
  const stopwatch = (x: number, y: number, s: number, key: string) => {
    const r = (s - 10) / 2, c = { x: x + s / 2, y: y + 10 + r };
    return (
      <g key={key} filter="url(#tc-drop-shadow)" pointerEvents="none">
        <circle cx={c.x} cy={c.y} r={r} fill="url(#tc-brass-grad)" stroke={TC_DARK} strokeWidth={2.4} />
        <circle cx={c.x} cy={c.y} r={r * 0.74} fill="#FFF8E6" stroke={TC_DARK} strokeWidth={1.6} />
        <Skin name="stopwatch" x={c.x - r} y={c.y - r} w={2 * r} h={2 * r} />
        {tcDial(c.x, c.y, r)}
      </g>
    );
  };

  const ansOn = (i: number) => won || (S.tb >= 0 && S.tb >= nc - i);
  const gateLit = (i: number) => (S.tb2 === 1 && i === 0) || (cols.carries.slice(0, S.carried).some((src: number) => src - 1 === i))
    || cols.links.slice(0, S.links + (S.pc > 0 ? 1 : 0)).some((L: any) => L.from === i);

  /* the active break, drawn as the pencil writes it */
  const live = S.pc > 0 && S.links < nLink ? cols.links[S.links] : null;
  const liveEls: any[] = [];
  if (live) {
    const ef = stk[live.from][stk[live.from].length - 1], et = stk[live.to][stk[live.to].length - 1];
    const t1 = tcPad(live.a, u[live.from]), t2 = tcPad(live.b, u[live.to]);
    const s1 = strikeOf(live.from, ef), s2 = strikeOf(live.to, et);
    if (S.pc >= 1) liveEls.push(<PencilLine key="ls1" x1={s1[0]} y1={s1[1]} x2={s1[2]} y2={s1[3]} size={penS} color={TC_DARK} />);
    if (S.pc >= 2) liveEls.push(<PencilText key="lt1" text={t1} x={cx(live.from)} y={lvBase(ef.lv + 1)} size={penS} align="middle" color={tcPenInk(u[live.from])} width={penW} chars={Math.min(t1.length, S.pc - 1)} />);
    if (S.pc >= 2 + t1.length) liveEls.push(<PencilLine key="ls2" x1={s2[0]} y1={s2[1]} x2={s2[2]} y2={s2[3]} size={penS} color={TC_DARK} />);
    if (S.pc >= 3 + t1.length) liveEls.push(<PencilText key="lt2" text={t2} x={cx(live.to)} y={lvBase(et.lv + 1)} size={penS} align="middle" color={tcPenInk(u[live.to])} width={penW} chars={Math.min(t2.length, S.pc - 2 - t1.length)} />);
  }

  /* the act key under the cell panel (one key; its label follows the act) */
  const nextRegroup = nextRegroupOf();
  const LABEL: any = { carry: "Carry", carry2: "Carry", break: nLink > 1 ? (u[cols.links[0] ? cols.links[0].from : 0] === "h" ? "Break an hour" : "Break a minute") : "Break",
    break2: "Break a minute", show: "Show", "check-sum": "Check", "new-sum": "New sum" };
  if (nLink > 1 && S.links === 1) LABEL.break2 = "Break a minute";
  let keys: string[] = [];
  if (free) keys = ["new-sum", nextRegroup || (!S.shown ? "show" : B.op === "-" && !S.check ? "check-sum" : "")].filter(Boolean);
  else if (warm) keys = stepOn && /^(carry|break)/.test(stepOn) ? [stepOn] : [];
  else if (stage === "ask") keys = nextRegroup && !S.tb3 && S.tb < 0 ? [nextRegroup] : [];   /* never live during a correction */
  else if (won && B.op === "-" && !S.check) keys = ["check-sum"];
  const showPanel = wide && (free || nCarry + nLink > 0);
  const keyW = keys.length > 1 ? 248 : 300;
  const keyFs = (t: string) => Math.max(T.label, Math.min(T.prompt, Math.floor((keyW - 28) / (Math.max(1, t.length) * 0.56))));
  const keyX = (j: number) => PX + (PW - (keys.length * keyW + (keys.length - 1) * 20)) / 2 + j * (keyW + 20);

  /* the check strip: the answer added back to the smaller time rebuilds the larger one */
  const checkStrip = () => {
    const ans = cols.res;
    const back = tcColumns({ op: "+", units: u, top: ans, bot: B.bot });
    const w = 130, g = 22, x0 = PX + (PW - (nc * w + (nc - 1) * g)) / 2 + 20, X = (i: number) => x0 + i * (w + g) + w / 2;
    return (
      <g data-role="check-strip" pointerEvents="none" style={{ animation: reducedMotion() ? "none" : "tc-fade 600ms ease-out both" } as any}>
        <text x={PX + 26} y={PY + 40} fontSize={T.label} fontWeight={700} fill={TC_DARK}>{tx("Add back")}</text>
        {u.map((k, i) => (
          <g key={k}>
            {back.carryIn[i] > 0 && <text x={X(i) + 40} y={PY + 74} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={TC_WINE}>{"+" + back.carryIn[i]}</text>}
            <text x={X(i)} y={PY + 118} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={ink(k)}>{tcPad(ans[i], k)}</text>
            <text x={X(i)} y={PY + 172} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={ink(k)}>{tcPad(B.bot[i] || 0, k)}</text>
            <text x={X(i)} y={PY + 252} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={ink(k)}>{tcPad(back.res[i], k)}</text>
            <text x={X(i)} y={PY + 296} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={TC_DARK}>{tx(TC_SHORT[k])}</text>
          </g>
        ))}
        <text x={x0 - 26} y={PY + 172} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={TC_DARK}>+</text>
        <line x1={x0 - 40} y1={PY + 196} x2={X(nc - 1) + w / 2} y2={PY + 196} stroke={TC_DARK} strokeWidth={4} />
      </g>
    );
  };

  /* the "one minute too many" replay: the top in seconds, and the child's opening of it, 60 s over */
  const countPanel = () => {
    const H = B.top[0] || 0, sec = (s: string) => " " + tx(s);
    const rows = [
      { t: H + sec("h") + " = " + indian(H * 3600) + sec("s"), c: TC_DARK },
      { t: (H - 1) + sec("h") + " 60" + sec("min") + " 60" + sec("s") + " = " + indian(H * 3600 + 60) + sec("s"), c: TC_DARK },
    ];
    return (
      <g pointerEvents="none" data-role="count-seconds">
        <text x={PX + PW / 2} y={PY + 46} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={TC_DARK}>{tx("Count in seconds")}</text>
        {rows.map((r, j) => <text key={j} x={PX + PW / 2} y={PY + 120 + j * 70} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={r.c}>{r.t}</text>)}
        {S.tb3 >= 2 && <text x={PX + PW / 2} y={PY + 270} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={TC_WINE}>{"60" + sec("s") + " " + tx("too many")}</text>}
      </g>
    );
  };
  const cellsPanel = () => {
    const unit = S.lift >= 0 ? u[S.lift] : "";
    const cap = !unit ? "60 cells" : B.op === "-" ? (unit === "m" ? "1 h = 60 min" : "1 min = 60 s") : (unit === "m" ? "60 min = 1 h" : "60 s = 1 min");
    return (
      <g pointerEvents="none">
        {/* the caption clears the first row of cells by about 10 even with a Devanagari or Gujarati hook under it */}
        <text x={PX + PW / 2} y={PY + 44} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={unit ? shade(TC_COL[unit], 0.3) : TC_DARK}>{tx(cap)}</text>
        {Array.from({ length: 60 }, (_, c) => {
          const x = PX + 51 + (c % 10) * 42, y = PY + 62 + Math.floor(c / 10) * 41;
          return (
            <g key={c}>
              <rect x={x} y={y} width={36} height={36} rx={6} fill={unit ? tint(TC_COL[unit], 0.3) : "#FFFFFF"} stroke={TC_DARK} strokeWidth={2.4} />
              <rect x={x + 2} y={y + 2} width={32} height={4} rx={2} fill="#FFFFFF" fillOpacity={0.6} />
            </g>
          );
        })}
      </g>
    );
  };

  /* the gliding card or 60 tile (no hand): drawn at its landing place, the keyframes start it at its source */
  const rm = reducedMotion();
  const flyEl = S.fly ? (
    <g key={"fly-" + S.fly.id} transform={"translate(" + S.fly.x + " " + S.fly.y + ")"} pointerEvents="none" data-role="fly">
      <g style={{ animation: rm ? "none" : "tc-fly " + TC_FLY + "ms ease-in-out both", ["--tc-dx" as any]: S.fly.dx + "px", ["--tc-dy" as any]: S.fly.dy + "px" } as any}>
        {S.fly.id === "sixty"
          ? <g filter="url(#tc-drop-shadow)"><rect x={-46} y={-30} width={92} height={60} rx={10} fill={tint(TC_COL[S.fly.k], 0.55)} stroke={TC_DARK} strokeWidth={2.4} />
              <text x={0} y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={TC_DARK}>60</text></g>
          : <g filter="url(#tc-drop-shadow)"><rect x={-S.fly.w / 2} y={-38} width={S.fly.w} height={76} rx={14} fill={tint(TC_COL[S.fly.k], 0.8)} stroke={TC_COL[S.fly.k]} strokeWidth={3} />
              <text x={0} y={13} textAnchor="middle" fontSize={cardFs} fontWeight={700} fill={shade(TC_COL[S.fly.k], 0.3)}>{S.fly.v + " " + tx(TC_SHORT[S.fly.k])}</text></g>}
      </g>
    </g>
  ) : null;

  /* the worked line (the owner, 2026-11-16): after the correction or at the win, the question's OWN sixty in words and numbers
     above the frame ("48 + 37 = 85 minutes = 1 hour 25 minutes" / "6 + 2 + 1 = 9 hours"; a break: "1 hour = 60 minutes" /
     "8 hours 25 minutes = 7 hours 85 minutes"). Never before the child answers. */
  const tcQ = (v: number, k: string) => v + " " + tx(v === 1 ? TC_ONE[k] : TC_MANY[k]);
  /* each row is a run of chunks of at most 4 words (labels-short), laid out by their measured widths (TcFlow) */
  const workedRows = (): any[][] => {
    const top = B.top.map((x: any) => x || 0), bot = (B.bot || u.map(() => 0)).map((x: any) => x || 0);
    const W = TC_WINE, D = TC_DARK, ch = (t: string, fill: string) => ({ t, fill });
    if (nCarry) {
      const i = cols.carries[0], cin = cols.carryIn[i], sum = top[i] + bot[i] + cin;
      /* "48 + 37 = 85 minutes = 60 + 25 = 1 hour 25 minutes": the 60 that makes the hour, shown (the play tester, 2026-11-16) */
      const r1 = [ch(top[i] + " + " + bot[i], W), ...(cin ? [ch("+ " + cin, W)] : []), ch("=", W), ch(tcQ(sum, u[i]), W), ch("=", W),
        ...(cols.res[i] ? [ch("60 + " + cols.res[i], W), ch("=", W)] : []),
        ch(tcQ(1, u[i - 1]) + (cols.res[i] ? " " + tcQ(cols.res[i], u[i]) : ""), W)];
      const r2 = B.top[i - 1] === null || B.top[i - 1] === undefined ? null
        : [ch(top[i - 1] + " + " + bot[i - 1], D), ch("+ 1", W), ch("=", D), ch(tcQ(cols.res[i - 1], u[i - 1]), D)];
      return r2 ? [r1, r2] : [r1];
    }
    if (nLink) {
      const r1: any[] = [], seen: string[] = [];
      cols.links.forEach((L: any) => { const key = u[L.from] + u[L.to]; if (seen.includes(key)) return; seen.push(key);
        if (r1.length) r1[r1.length - 1].t += ",";
        r1.push(ch(tcQ(1, u[L.from]), W), ch("=", W), ch(tcQ(60, u[L.to]), W)); });
      const k0 = cols.links[0].from, ks = u.map((k, i) => i).filter((i) => i >= k0);
      const r2 = [...ks.filter((i) => top[i] > 0).map((i) => ch(tcQ(top[i], u[i]), D)), ch("=", D), ...ks.map((i) => ch(tcQ(cols.res[i] + bot[i], u[i]), D))];
      return [r1, r2];
    }
    return [];
  };
  const workedOn = !free && !warm && (nCarry + nLink > 0) && (won || S.tb >= nc);
  const workedEl = workedOn ? (
    <g pointerEvents="none" data-role="worked-line">
      <rect x={16} y={0} width={880} height={90} rx={14} fill="#FFFFFF" stroke={TC_WINE} strokeWidth={3} />
      {workedRows().map((r, j, all) => <TcFlow key={j + ":" + lang} chunks={r} cx={456} y={all.length > 1 ? 37 + j * 39 : 57} size={T.label} />)}
    </g>
  ) : null;

  return (
    <g>
      <defs>
        <style>{"@keyframes tc-fly { from { transform: translate(var(--tc-dx), var(--tc-dy)); } to { transform: translate(0px, 0px); } } @keyframes tc-fade { from { opacity: 0; } to { opacity: 1; } }"}</style>
        <filter id="tc-drop-shadow" x="-10%" y="-10%" width="125%" height="125%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.12" />
        </filter>
        <linearGradient id="tc-brass-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F5D77F" />
          <stop offset="50%" stopColor="#D9A93E" />
          <stop offset="100%" stopColor="#B3821B" />
        </linearGradient>
      </defs>

      {/* the line of times (phase 1): each part on a card of its own, a stopwatch at the head of each time */}
      {cardMode && iconW > 0 && rowsOfCards.map((r) => (!B.place || cards.some((c) => c.r === r && !S.placed[c.id]) ? stopwatch(iconX(r), 5, 72, "lw" + r) : null))}
      {cardMode && cards.map((c) => {
        const b = cardBox(c), gone = (B.place && S.placed[c.id]) || S.moving === c.id;
        if (gone) return null;
        const dd = drag.drag && drag.drag.payload && drag.drag.payload.id === c.id && drag.drag.moved ? drag.drag : null;
        const x = dd ? dd.x - b.w / 2 : b.x, y = dd ? dd.y - b.h / 2 : b.y;
        const lit = S.flash === c.id;
        const face = (
          <g filter="url(#tc-drop-shadow)">
            <rect x={x} y={y} width={b.w} height={b.h} rx={14} fill={tint(TC_COL[c.k], 0.8)} stroke={lit ? TC_WINE : TC_COL[c.k]} strokeWidth={lit ? 6 : 3} />
            <rect x={x + 3} y={y + 3} width={b.w - 6} height={6} rx={3} fill="#FFFFFF" fillOpacity={0.5} />
            <text x={x + b.w / 2} y={y + b.h / 2 + cardFs * 0.36} textAnchor="middle" fontSize={cardFs} fontWeight={700} fill={lit ? TC_WINE : shade(TC_COL[c.k], 0.3)}>{c.v + " " + tx(TC_SHORT[c.k])}</text>
          </g>
        );
        if (!B.place) return <g key={c.id} pointerEvents="none">{face}</g>;
        return (
          <g key={c.id} {...control(c.id, c.v + " " + TC_SHORT[c.k])} {...drag.bind(c)} {...drag.keys(c)} style={{ cursor: "grab" } as any}>
            {face}
            {stage === "demo" && stepOn === c.on && <Invite x={b.x + b.w / 2} y={b.y + b.h / 2} w={b.w} h={b.h} rx={14} C={C} />}
          </g>
        );
      })}

      {/* the column frame: three columns under their headings, a sixty gate between each pair */}
      <g pointerEvents="none">
        {u.map((k, i) => (
          <g key={k} filter="url(#tc-drop-shadow)">
            <rect x={colX(i)} y={100} width={TC_COLW} height={hasBot ? 414 : 240} rx={16} fill={tint(TC_COL[k], 0.88)} stroke={TC_COL[k]} strokeWidth={3} />
            <rect x={colX(i) + 12} y={102} width={TC_COLW - 24} height={54} rx={10} fill={tint(TC_COL[k], 0.65)} stroke={TC_COL[k]} strokeWidth={2} />
            <text x={cx(i)} y={TC_ROW.head + (dv ? 11 : 0)} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={ink(k)}>{tx(TC_NAME[k])}</text>
          </g>
        ))}
        {u.slice(0, -1).map((k, i) => {
          const lit = gateLit(i);
          return (
            <g key={"g" + i} data-role="gate">
              <rect x={gateX(i) - 7} y={TC_ROW.top} width={14} height={hasBot ? TC_ROW.rule - TC_ROW.top : TC_ROW.h} rx={7} fill={lit ? "#E69F00" : TC_DARK} />
              <g filter="url(#tc-drop-shadow)">
                <rect x={gateX(i) - 32} y={(hasBot ? TC_ROW.bot : TC_ROW.top + 12) - 6} width={64} height={54} rx={12} fill={lit ? TC_WINE : TC_DARK} stroke={lit ? "#E69F00" : TC_DARK} strokeWidth={3} />
                <rect x={gateX(i) - 30} y={(hasBot ? TC_ROW.bot : TC_ROW.top + 12) - 4} width={60} height={4} rx={2} fill="#FFFFFF" fillOpacity={0.25} />
                <text x={gateX(i)} y={(hasBot ? TC_ROW.bot : TC_ROW.top + 12) + 35} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill="#FFFFFF">60</text>
              </g>
            </g>
          );
        })}
        {/* carry circles over the hours and minutes (adding) */}
        {B.op !== "-" && hasBot && u.slice(0, -1).map((k, i) => (
          <g key={"cc" + i} filter="url(#tc-drop-shadow)">
            <circle cx={cx(i)} cy={TC_CIRC} r={32} fill="#FFFFFF" stroke={TC_DARK} strokeWidth={2.4} />
            <circle cx={cx(i)} cy={TC_CIRC} r={28} fill="none" stroke={tint(TC_DARK, 0.2)} strokeWidth={1} />
            {cols.carries.slice(0, S.carried).filter((src: number) => src - 1 === i).length > 0 &&
              <text x={cx(i)} y={TC_CIRC + 16} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={TC_WINE}>{String(cols.carries.slice(0, S.carried).filter((src: number) => src - 1 === i).length)}</text>}
          </g>
        ))}
        {/* the two times, a stopwatch at the head of each */}
        {stopwatch(10, TC_ROW.top + 2, 66, "sw0")}
        {hasBot && stopwatch(10, TC_ROW.bot + 2, 66, "sw1")}
        {u.map((k, i) => {
          const top = B.target ? null : isPlaced(0, i) ? charsOf(B.top[i], k) : null;
          return cell(i, TC_ROW.top, top);
        })}
        {hasBot && u.map((k, i) => cell(i, TC_ROW.bot, isPlaced(1, i) ? charsOf(B.bot[i], k) : null))}
        {hasBot && <text x={110} y={base(TC_ROW.bot)} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={TC_DARK}>{B.op === "-" ? "−" : "+"}</text>}
        {hasBot && <line x1={94} y1={TC_ROW.rule} x2={right} y2={TC_ROW.rule} stroke={TC_DARK} strokeWidth={5} strokeLinecap="round" />}
        {/* every rewrite of a top figure, in wine; each strikes the one below it */}
        {stk.map((st: any[], i: number) => st.map((e: any, j: number) => (
          <g key={"st" + i + "-" + j}>
            {j < st.length - 1 && (() => { const s = strikeOf(i, e); return <PencilLine x1={s[0]} y1={s[1]} x2={s[2]} y2={s[3]} size={penS} color={TC_DARK} />; })()}
            {e.lv > 0 && <PencilText text={tcPad(e.v, u[i])} x={cx(i)} y={lvBase(e.lv)} size={penS} align="middle" color={tcPenInk(u[i])} width={penW} />}
          </g>
        )))}
        {liveEls}
      </g>

      {/* the answer line: empty before the answer, written at the win or by the correction, from the right */}
      <g pointerEvents="none">
        {hasBot && u.map((k, i) => cell(i, TC_ROW.ans, ansOn(i) ? charsOf(cols.res[i], k) : null, { dash: !ansOn(i) }))}
        {hasBot && free && S.shown && u.map((k, i) => cell(i, TC_ROW.ans, charsOf(cols.res[i], k)))}
        {B.target && u.map((k, i) => {
          const done = won || S.tb >= nc - i;
          if (k === "m" && S.tb2 === 1) return cell(i, TC_ROW.top, [String(B.top[i]), ""], { lit: true });
          return done ? cell(i, TC_ROW.top, charsOf(B.top[i], k)) : null;
        })}
      </g>
      {workedEl}

      {/* the cell panel and the act key (the panel shut only; every act is done before the Answer key opens) */}
      {showPanel && (
        <g filter="url(#tc-drop-shadow)">
          <rect x={PX} y={PY} width={PW} height={PH} rx={18} fill="#FFFFFF" stroke={TC_DARK} strokeWidth={3} pointerEvents="none" />
          {S.tb3 ? countPanel() : S.check ? checkStrip() : cellsPanel()}
          {keys.map((on, j) => (
            <g key={"k" + j}>
              <Key id={on} label={tx(LABEL[on])} x={keyX(j)} y={PY + PH + 18} w={keyW} h={76} C={C} tone="key" disabled={(on === "new-sum" && busy) || quietCheck(on)} onClick={() => pressKey(on)}>
                <text y={dv ? 15 : 13} textAnchor="middle" fontSize={keyFs(tx(LABEL[on]))} fontWeight={700} fill={toneInk("key", C.ink)}>{tx(LABEL[on])}</text>
              </Key>
              {stage === "demo" && stepOn === on && <Invite x={keyX(j) + keyW / 2} y={PY + PH + 56} w={keyW} h={76} rx={RAD.key} C={C} />}
            </g>
          ))}
        </g>
      )}
      {flyEl}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer: the three boxes with their units */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  /* a unit is printed in hi / gu only once TR carries it (until the language pass the column colour names it) */
  const unitOf = (k: string) => { const s = tx(TC_SHORT[k]); return lang === "en" || s !== TC_SHORT[k] ? s : ""; };
  const last = result && result.last;
  const item = it || (last && PHASES[n - 1] && PHASES[n - 1].items[last.item]) || null;
  if (!last || !item || !item.units) return null;
  const u: string[] = item.asks || item.units, v = slotPartsOf(last.value, u.length);
  const cw = Math.min(70, (w - 24) / u.length - 8);
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {u.map((k, i) => {
        const x = 12 + i * (cw + 8) + cw / 2;
        return (
          <g key={k}>
            <rect x={x - cw / 2} y={0} width={cw} height={36} rx={8} fill="#FFFFFF" stroke={TC_DARK} strokeWidth={1.6} />
            <rect x={x - cw / 2 + 4} y={1.5} width={cw - 8} height={3} rx={1.5} fill={tint(TC_COL[k], 0.3)} />
            <text x={x} y={30} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(TC_COL[k], 0.3)}>{tcPad(Number(v[i]) || 0, k)}</text>
            <text x={x} y={lang === "en" ? h - 6 : h - 3} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{unitOf(k)}</text>
          </g>
        );
      })}
    </g>
  );
}

function TimeColumns(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      board: true,
      keyOnly: true,
      bigPad: true,
      nextKey: true,
      navDots: true,
      StartArt, START_HOOK,
      }} />
  );
}

export default TimeColumns;