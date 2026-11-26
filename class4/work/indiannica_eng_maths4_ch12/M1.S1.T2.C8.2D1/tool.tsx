/* ═══ M1.S1.T2.C8.2D1 · minute_clock · tool-specific part ═══════════════════════════════
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

const TOOL_ID = "minute_clock";
const MEDIA_ID = "M1.S1.T2.C8.2D1";
const TOOL_NAME = "Minute Clock";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["A clock with two hands, and a clock with figures. Where is each hand pointing?"];
/* the whole-tool line: not shown from r44 (kept for the tool object's shape) */
const FINISH_LINE = "Minutes counted in fives and then marks, and the hour read from the number the hand has passed.";
/* printed when the child opens Free play (the plan's free-play line); its LAST piece stays on the bubble */
const FREE_LINE = "Free play: drag the hands, show the fives and count the minutes.";

/* ── the clock (drawn in code; the wooden case is the wall_clock skin) ── */
const MC = { cx: 258, cy: 260, R: 190, x0: 540, cw: 356 };
const MC_MIN = "#0072B2";     /* minute hand, minutes: deep blue */
const MC_HR = "#D55E00";      /* hour hand, hours: vermilion */
const MC_INK = "#2B2B2B";
const MC_LEN = { min: 0.9, hr: 0.58, minHit: 0.9, hrHit: 0.36 };
const mcPol = (cx: number, cy: number, r: number, deg: number) => { const a = ((deg - 90) * Math.PI) / 180; return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }; };
const mcAng = (cx: number, cy: number, x: number, y: number) => ((Math.atan2(x - cx, cy - y) * 180) / Math.PI + 360) % 360;
const mcHr = (h: number) => (((h % 12) + 12) % 12) || 12;
const mcTime = (h: number, m: number) => mcHr(h) + ":" + String(m).padStart(2, "0");
/* the words card: a template a language can reorder ({h} and {m} are filled in after tx) */
const mcWords = (h: number, m: number, tx: any) => {
  const H = mcHr(h), N = mcHr(h + 1);
  const t = m === 0 ? tx("{h} o'clock") : m === 15 ? tx("quarter past {h}") : m === 30 ? tx("half past {h}") : m === 45 ? tx("quarter to {h}")
    : m < 30 ? (m === 1 ? tx("{m} minute past {h}") : tx("{m} minutes past {h}")) : (60 - m === 1 ? tx("{m} minute to {h}") : tx("{m} minutes to {h}"));
  return String(t).replace("{h}", String(m > 30 ? N : H)).replace("{m}", String(m > 30 ? 60 - m : m));
};
const mcCount = (n: number, tx: any) => String(n === 1 ? tx("{n} minute") : tx("{n} minutes")).replace("{n}", String(n));

/* the clock face: case, 60 marks, 12 numbers (no hands); `skin` draws the wooden case over the plain disc */
function mcFace(cx: number, cy: number, R: number, opt: any = {}) {
  const fs = opt.fs || 42, id = "mcclip-" + (opt.id || "w");
  const gradId = "mcface-grad-" + (opt.id || "w");
  const rimId = "mcrim-grad-" + (opt.id || "w");
  return (
    <g pointerEvents="none">
      <defs>
        <radialGradient id={gradId} cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#FFFBF2" />
          <stop offset="100%" stopColor="#F5ECE0" />
        </radialGradient>
        <linearGradient id={rimId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A67347" />
          <stop offset="50%" stopColor="#8A5A34" />
          <stop offset="100%" stopColor="#633C1D" />
        </linearGradient>
        <clipPath id={id}><circle cx={cx} cy={cy} r={R + 26} /></clipPath>
      </defs>
      {/* Outer soft shadow */}
      {/* Outer wooden bezel ring */}
      <circle cx={cx} cy={cy} r={R + 24} fill={`url(#${rimId})`} stroke={MC_INK} strokeWidth={4} filter="url(#fShadowSoft)" />
      <circle cx={cx} cy={cy} r={R + 21} fill="none" stroke="#FFFFFF" strokeOpacity={0.25} strokeWidth={2} />
      {/* Dial background plate */}
      <circle cx={cx} cy={cy} r={R} fill={`url(#${gradId})`} stroke={MC_INK} strokeWidth={3} />
      <circle cx={cx} cy={cy} r={R - 2} fill="none" stroke="#D5C5B0" strokeWidth={1.5} />
      {opt.skin !== false && <Skin name="wall_clock" x={cx - R - 26} y={cy - R - 26} w={2 * R + 52} h={2 * R + 52} clip={"url(#" + id + ")"} />}
      {opt.under}
      {/* 60 minute marks */}
      {Array.from({ length: 60 }).map((_, i) => {
        const big = i % 5 === 0, a = mcPol(cx, cy, R - 6, i * 6), b = mcPol(cx, cy, R - (big ? 30 : 18), i * 6);
        return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={MC_INK} strokeWidth={big ? 5 : 2.6} strokeLinecap="round" />;
      })}
      {opt.nums !== false && mcNums(cx, cy, R, fs)}
    </g>
  );
}
/* the 12 numbers with their ivory halo: drawn ABOVE the hands, so a hand never hides the number the bubble names */
function mcNums(cx: number, cy: number, R: number, fs: number) {
  return (
    <g pointerEvents="none">
      {Array.from({ length: 12 }).map((_, i) => {
        const p = mcPol(cx, cy, R - 56, (i + 1) * 30);
        return <text key={i} x={p.x} y={p.y + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill={MC_INK} stroke="#FFF8EA" strokeWidth={7} paintOrder="stroke">{i + 1}</text>;
      })}
    </g>
  );
}

function mcHand(cx: number, cy: number, len: number, deg: number, kind: string, ghost?: boolean, thin?: boolean) {
  const t = mcPol(cx, cy, len, deg), back = mcPol(cx, cy, len * 0.14, deg + 180);
  const col = kind === "min" ? MC_MIN : MC_HR, sw = thin ? (kind === "min" ? 3 : 5) : kind === "min" ? 10 : 18;
  if (thin) return <line x1={cx} y1={cy} x2={t.x} y2={t.y} stroke={col} strokeWidth={sw} strokeLinecap="round" pointerEvents="none" />;
  return (
    <g pointerEvents="none" opacity={ghost ? 0.38 : 1}>
      {/* Drop shadow for active hands */}
      {!ghost && (
        <line x1={back.x + 2} y1={back.y + 3} x2={t.x + 2} y2={t.y + 3} stroke="#000000" strokeOpacity={0.2} strokeWidth={sw + 4} strokeLinecap="round" />
      )}
      {/* Outer dark stroke / shadow rim */}
      <line x1={back.x} y1={back.y} x2={t.x} y2={t.y} stroke={ghost ? col : shade(col, 0.25)} strokeWidth={sw + (ghost ? 0 : 4)} strokeLinecap="round" strokeDasharray={ghost ? "14 10" : undefined} />
      {/* Inner body line */}
      {!ghost && <line x1={back.x} y1={back.y} x2={t.x} y2={t.y} stroke={col} strokeWidth={sw} strokeLinecap="round" />}
      {/* Top light highlight line */}
      {!ghost && <line x1={back.x} y1={back.y} x2={t.x} y2={t.y} stroke="#FFFFFF" strokeOpacity={0.3} strokeWidth={Math.max(2, sw - 6)} strokeLinecap="round" />}
      {/* Tip accent circle */}
      {!ghost && <circle cx={t.x} cy={t.y} r={kind === "min" ? 9 : 12} fill={col} stroke={shade(col, 0.3)} strokeWidth={3} />}
    </g>
  );
}

/* THE START PAGE (runtime r28; docs/LAYOUT.md §1c, docs/PATTERNS.md §14): the first thing a child sees in user mode.
   START_HOOK is ONE printed question to wonder at (it needs a TR entry, and never gives an answer away); StartArt is
   the object the lesson is about, drawn in a 1200 x 340 box ({ box, C, lang, tx }; plain shapes in the chrome and content
   colours, a <Skin> over them when the image agent made one). This stub is a dashed outline: draw the real object. */
const START_HOOK = "Where is each hand pointing?";
function StartArt({ box, C, lang, tx }: any) {
  const cx = box.w / 2 - 170, cy = box.h / 2, R = 136;
  return (
    <g>
      {mcFace(cx, cy, R, { fs: 34, id: "start", nums: false })}
      {mcHand(cx, cy, R * 0.42, 10 * 30 + 10 * 0.5, "hr")}
      {mcHand(cx, cy, R * MC_LEN.min, 60, "min")}
      {mcNums(cx, cy, R, 34)}
      <g pointerEvents="none">
        <circle cx={cx} cy={cy} r={12} fill={MC_INK} stroke={shade(MC_INK, 0.3)} strokeWidth={2} />
        <circle cx={cx} cy={cy} r={6} fill="#6B6B6B" stroke="#1A1A1A" strokeWidth={1.5} />
      </g>
      <g transform={`translate(${cx + R + 90},${cy - 70})`}>
        <rect x={2} y={4} width={300} height={140} rx={24} fill="#000000" fillOpacity={0.15} />
        <rect x={0} y={0} width={300} height={140} rx={24} fill="#2A2E33" stroke={MC_INK} strokeWidth={4} />
        <rect x={16} y={16} width={268} height={108} rx={14} fill="#F4F8F2" stroke="#1A1C1F" strokeWidth={2} />
        <text x={150} y={92} textAnchor="middle" fontSize={T.display} fontWeight={700}>
          <tspan fill={shade(MC_HR, 0.25)}>10</tspan><tspan fill={MC_INK}>:</tspan><tspan fill={shade(MC_MIN, 0.25)}>10</tspan>
        </text>
      </g>
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
    "Digital and analog": "डिजिटल और सुइयों वाली घड़ी",
    "The digital clock says 4:10, so drag the analog minute hand to the 2.": "डिजिटल घड़ी 4:10 दिखाती है, तो मिनट की सुई को 2 तक खींचो।",
    "Pull the long blue hand round to the 2.": "लंबी नीली सुई को घुमाकर 2 तक लाओ।",
    "Now drag the hour hand to just past the 4.": "अब घंटे की सुई को 4 से थोड़ा आगे खींचो।",
    "Move the short hand this time.": "इस बार छोटी सुई घुमाओ।",
    "Tap the words card to read the same time in words.": "वही समय शब्दों में पढ़ने के लिए शब्द कार्ड दबाओ।",
    "Tap the card under the figures.": "अंकों के नीचे वाला कार्ड दबाओ।",
    "Both clocks can show the same time, to the exact minute.": "दोनों घड़ियाँ ठीक मिनट तक एक जैसा समय दिखा सकती हैं।",
    "You learned: figures and hands can show the same time.": "तुमने सीखा: अंक और सुइयाँ एक ही समय दिखा सकते हैं।",
    "Set the hands of the clock to show 9:05, the time in the figures.": "घड़ी की सुइयों से 9:05 दिखाओ, जो अंकों में लिखा है।",
    "Show 9:05": "9:05 दिखाओ",
    "Which figures are the hour, and which are the minutes?": "कौन से अंक घंटे हैं और कौन से मिनट?",
    "Yes, the minute hand points at the 1.": "हाँ, मिनट की सुई 1 पर है।",
    "Hours": "घंटे",
    "Minutes": "मिनट",
    "The clock with hands shows a time, so what would the clock in figures show?": "सुइयों वाली घड़ी एक समय दिखा रही है, अंकों वाली घड़ी क्या दिखाएगी?",
    "In figures?": "अंकों में?",
    "Count in fives from the 12 up to the minute hand.": "12 से मिनट की सुई तक पाँच-पाँच गिनो।",
    "Yes, the hands and the figures agree.": "हाँ, सुइयाँ और अंक एक ही समय बताते हैं।",
    "Now make the clock with hands show 12:56.": "अब सुइयों वाली घड़ी पर 12:56 बनाओ।",
    "Show 12:56": "12:56 दिखाओ",
    "Before one o'clock, which number has the hour hand passed?": "1 बजने से पहले घंटे की सुई कौन सी संख्या पार कर चुकी है?",
    "Yes, nearly at the 1, but not there yet.": "हाँ, लगभग 1 पर, पर अभी पहुँची नहीं।",
    "Each small mark is a minute": "हर छोटा निशान एक मिनट",
    "The minute hand is on the 1, so tap Step to move it one small mark on.": "मिनट की सुई 1 पर है, उसे एक निशान आगे ले जाने के लिए आगे दबाओ।",
    "Tap the Step key under the glass.": "लेंस के नीचे आगे बटन दबाओ।",
    "That took one minute, so tap Step for one more mark.": "इसमें एक मिनट लगा, एक और निशान के लिए आगे दबाओ।",
    "Tap Step once more.": "एक बार और आगे दबाओ।",
    "Tap Count to light every space from the 1 to the 2.": "1 से 2 तक हर खाना जलाने के लिए गिनो दबाओ।",
    "Tap the Count key now.": "अब गिनो बटन दबाओ।",
    "Each small mark is one minute, and there are five from one number to the next.": "हर छोटा निशान एक मिनट है, और एक संख्या से अगली तक पाँच हैं।",
    "You learned: each small mark is a minute, five between two numbers.": "तुमने सीखा: हर निशान एक मिनट, दो संख्याओं के बीच पाँच।",
    "How many minutes does the minute hand take to move from the 4 to the 7?": "मिनट की सुई को 4 से 7 तक जाने में कितने मिनट लगते हैं?",
    "4 to 7?": "4 से 7?",
    "How many spaces are there between two numbers?": "दो संख्याओं के बीच कितने खाने हैं?",
    "Yes, three stretches of five small marks.": "हाँ, पाँच-पाँच निशानों के तीन हिस्से।",
    "How many minutes does the minute hand take to go once all the way round?": "मिनट की सुई को एक पूरा चक्कर लगाने में कितने मिनट लगते हैं?",
    "Once round?": "एक चक्कर?",
    "How many marks lie between the 12 and the 1?": "12 और 1 के बीच कितने निशान हैं?",
    "Yes, once round the face is one hour.": "हाँ, एक पूरा चक्कर एक घंटा है।",
    "The minute hand moves from the 2 to the 9, so how many minutes pass?": "मिनट की सुई 2 से 9 तक जाती है, तो कितने मिनट बीतते हैं?",
    "2 to 9?": "2 से 9?",
    "Count the stretches from the 2 to the 9 first.": "पहले 2 से 9 तक के हिस्से गिनो।",
    "Yes, seven stretches, five marks in each.": "हाँ, सात हिस्से, हर एक में पाँच निशान।",
    "Counting on from the last number": "आखिरी संख्या से आगे गिनना",
    "Tap Fives to show the fives round the clock.": "घड़ी के चारों ओर पाँच-पाँच दिखाने के लिए पाँच-पाँच दबाओ।",
    "Tap the Fives key.": "पाँच-पाँच बटन दबाओ।",
    "Tap Count to count in fives to the 3, then the marks after it.": "3 तक पाँच-पाँच, फिर बाद के निशान गिनने के लिए गिनो दबाओ।",
    "Now tap the Count key.": "अब गिनो बटन को दबाओ।",
    "Fives up to the last number passed, then one minute for each mark after it.": "पार की गई आखिरी संख्या तक पाँच-पाँच, फिर हर निशान का एक मिनट।",
    "You learned: count fives to the last number, then the marks.": "तुमने सीखा: आखिरी संख्या तक पाँच-पाँच, फिर निशान गिनो।",
    "How many minutes past the hour does this clock show?": "यह घड़ी घंटे के बाद कितने मिनट दिखाती है?",
    "Minutes past?": "कितने मिनट?",
    "Which number has the minute hand just passed?": "मिनट की सुई अभी कौन सी संख्या पार कर चुकी है?",
    "Yes, the 6 stands for thirty minutes.": "हाँ, 6 का मतलब 30 मिनट है।",
    "Count the minutes on this clock, past the hour.": "इस घड़ी पर घंटे के बाद के मिनट गिनो।",
    "Minutes?": "मिनट?",
    "How many minutes does the 10 stand for?": "10 कितने मिनट बताता है?",
    "Yes, fifty at the 10, then two marks.": "हाँ, 10 पर 50, फिर दो निशान।",
    "Drag the minute hand to show 6:18.": "6:18 दिखाने के लिए मिनट की सुई खींचो।",
    "Show 6:18": "6:18 दिखाओ",
    "How many minutes does the 3 stand for?": "3 कितने मिनट बताता है?",
    "Yes, three marks after the 3.": "हाँ, 3 के बाद तीन निशान।",
    "The hour the hand has passed": "सुई जिस घंटे को पार कर चुकी है",
    "The hour hand is nearly at the 8, so tap it to see which number it has passed.": "घंटे की सुई लगभग 8 पर है, उसे दबाकर देखो कि उसने कौन सी संख्या पार की।",
    "Tap the short hand.": "छोटी सुई दबाओ।",
    "Now drag the minute hand on to the 12 and watch the hour hand.": "अब मिनट की सुई को 12 तक खींचो और घंटे की सुई देखो।",
    "Move the long blue hand to the 12.": "लंबी नीली सुई को 12 तक ले जाओ।",
    "The hour is the number the hour hand has passed, not the one it is nearly at.": "घंटा वह संख्या है जिसे सुई पार कर चुकी, न कि जिसके पास है।",
    "You learned: read the hour the hour hand has passed.": "तुमने सीखा: घंटे की सुई जिसे पार कर चुकी, वही घंटा।",
    "What time does this clock show?": "यह घड़ी क्या समय दिखाती है?",
    "What time?": "क्या समय?",
    "Which number has the hour hand passed?": "घंटे की सुई कौन सी संख्या पार कर चुकी है?",
    "Yes, the hour hand has not reached the 4.": "हाँ, घंटे की सुई अभी 4 तक नहीं पहुँची।",
    "Write the time on this clock in figures.": "इस घड़ी का समय अंकों में लिखो।",
    "Has the minute hand reached the 12 yet?": "क्या मिनट की सुई 12 तक पहुँच गई?",
    "Yes, the hour hand has passed the ten.": "हाँ, घंटे की सुई 10 पार कर चुकी है।",
    "The clock shows a quarter to six, so write the time in figures.": "घड़ी पौने छह दिखाती है, समय अंकों में लिखो।",
    "Quarter to six?": "पौने छह?",
    "A quarter to six comes before six o'clock.": "पौने छह, छह बजने से पहले आता है।",
    "Yes, a quarter to six comes before six.": "हाँ, पौने छह छह बजे से पहले होता है।",
    "This clock shows the time in figures. Can you make the clock with hands show it too?": "यह घड़ी अंकों में समय दिखाती है। क्या तुम सुइयों वाली घड़ी पर भी इसे दिखा सकते हो?",
    "The minute hand counts in fives from the 12.": "मिनट की सुई 12 से पाँच-पाँच करके गिनती है।",
    "The hour hand shows the hour it has just passed.": "घंटे की सुई वह घंटा बताती है जो अभी पार हुआ।",
    "Count the spaces from one number to the next. How long does the hand take to cross one space?": "एक संख्या से अगली तक खाने गिनो। सुई को एक खाना पार करने में कितना समय लगता है?",
    "Each small space is one minute, so count every space.": "हर छोटा खाना एक मिनट है, तो हर खाना गिनो।",
    "Five minutes go by for each number the hand passes.": "सुई जो भी संख्या पार करे, उसके पाँच मिनट होते हैं।",
    "Count in fives to the last number the hand has passed. Now count the marks after it.": "सुई ने जो आखिरी संख्या पार की, वहाँ तक पाँच-पाँच गिनो। अब उसके बाद के निशान गिनो।",
    "Say the fives up to that number, then count the marks.": "उस संख्या तक पाँच-पाँच बोलो, फिर निशान गिनो।",
    "Only the marks after the last number count in ones.": "आखिरी संख्या के बाद के निशान ही एक-एक गिने जाते हैं।",
    "The hour hand is nearly at the next number. Which number has it passed?": "घंटे की सुई लगभग अगली संख्या पर है। उसने कौन सी संख्या पार की है?",
    "Late in the hour, the hour hand is nearly at the next number.": "घंटे के आखिर में घंटे की सुई अगली संख्या के पास होती है।",
    "Look behind the hour hand, not in front of it.": "घंटे की सुई के पीछे देखो, आगे नहीं।",
    "Minute Clock": "मिनट घड़ी",
    "Free play: drag the hands, show the fives and count the minutes.": "खुला खेल: सुइयाँ खींचो, पाँच-पाँच दिखाओ और मिनट गिनो।",
    "Where is each hand pointing?": "हर सुई कहाँ इशारा कर रही है?",
    "A clock with two hands, and a clock with figures. Where is each hand pointing?": "दो सुइयों वाली घड़ी, और अंकों वाली घड़ी। हर सुई कहाँ इशारा कर रही है?",
    "{h} o'clock": "{h} बजे",
    "quarter past {h}": "सवा {h}",
    "half past {h}": "{h} बजकर 30 मिनट",
    "quarter to {h}": "पौने {h}",
    "{m} minute past {h}": "{h} बजकर {m} मिनट",
    "{m} minutes past {h}": "{h} बजकर {m} मिनट",
    "{m} minute to {h}": "{h} बजने में {m} मिनट",
    "{m} minutes to {h}": "{h} बजने में {m} मिनट",
    "{n} minute": "{n} मिनट",
    "{n} minutes": "{n} मिनट",
    "Step": "आगे",
    "Count": "गिनो",
    "Fives": "पाँच-पाँच"
},
  gu: {
    "Digital and analog": "ડિજિટલ અને કાંટાવાળી ઘડિયાળ",
    "The digital clock says 4:10, so drag the analog minute hand to the 2.": "ડિજિટલ ઘડિયાળ 4:10 બતાવે છે, તો મિનિટ કાંટો 2 સુધી ખેંચો.",
    "Pull the long blue hand round to the 2.": "લાંબો વાદળી કાંટો ફેરવીને 2 સુધી લાવો.",
    "Now drag the hour hand to just past the 4.": "હવે કલાક કાંટો 4 થી થોડો આગળ ખેંચો.",
    "Move the short hand this time.": "આ વખતે નાનો કાંટો ફેરવો.",
    "Tap the words card to read the same time in words.": "એ જ સમય શબ્દોમાં વાંચવા શબ્દ કાર્ડ દબાવો.",
    "Tap the card under the figures.": "આંકડાની નીચેનું કાર્ડ દબાવો.",
    "Both clocks can show the same time, to the exact minute.": "બંને ઘડિયાળ ચોક્કસ મિનિટ સુધી એક જ સમય બતાવી શકે છે.",
    "You learned: figures and hands can show the same time.": "તમે શીખ્યા: આંકડા અને કાંટા એક જ સમય બતાવી શકે છે.",
    "Set the hands of the clock to show 9:05, the time in the figures.": "ઘડિયાળના કાંટાથી 9:05 બતાવો, જે આંકડામાં લખ્યું છે.",
    "Show 9:05": "9:05 બતાવો",
    "Which figures are the hour, and which are the minutes?": "કયા આંકડા કલાક છે અને કયા મિનિટ?",
    "Yes, the minute hand points at the 1.": "હા, મિનિટ કાંટો 1 પર છે.",
    "Hours": "કલાક",
    "Minutes": "મિનિટ",
    "The clock with hands shows a time, so what would the clock in figures show?": "કાંટાવાળી ઘડિયાળ એક સમય બતાવે છે, આંકડાવાળી ઘડિયાળ શું બતાવશે?",
    "In figures?": "આંકડામાં?",
    "Count in fives from the 12 up to the minute hand.": "12 થી મિનિટ કાંટા સુધી પાંચ-પાંચ ગણો.",
    "Yes, the hands and the figures agree.": "હા, કાંટા અને આંકડા એક જ સમય બતાવે છે.",
    "Now make the clock with hands show 12:56.": "હવે કાંટાવાળી ઘડિયાળ પર 12:56 બનાવો.",
    "Show 12:56": "12:56 બતાવો",
    "Before one o'clock, which number has the hour hand passed?": "1 વાગ્યા પહેલાં કલાક કાંટો કયો આંકડો વટાવી ગયો છે?",
    "Yes, nearly at the 1, but not there yet.": "હા, લગભગ 1 પર, પણ હજી પહોંચ્યો નથી.",
    "Each small mark is a minute": "દરેક નાનો કાપો એક મિનિટ",
    "The minute hand is on the 1, so tap Step to move it one small mark on.": "મિનિટ કાંટો 1 પર છે, તેને એક કાપો આગળ લઈ જવા આગળ દબાવો.",
    "Tap the Step key under the glass.": "કાચ નીચે આગળ બટન દબાવો.",
    "That took one minute, so tap Step for one more mark.": "એમાં એક મિનિટ લાગી, બીજા એક કાપા માટે આગળ દબાવો.",
    "Tap Step once more.": "ફરી એક વાર આગળ દબાવો.",
    "Tap Count to light every space from the 1 to the 2.": "1 થી 2 સુધી દરેક ખાનું પ્રગટાવવા ગણો દબાવો.",
    "Tap the Count key now.": "હવે ગણો બટન દબાવો.",
    "Each small mark is one minute, and there are five from one number to the next.": "દરેક નાનો કાપો એક મિનિટ છે, અને એક આંકડાથી બીજા સુધી પાંચ છે.",
    "You learned: each small mark is a minute, five between two numbers.": "તમે શીખ્યા: દરેક કાપો એક મિનિટ, બે આંકડા વચ્ચે પાંચ.",
    "How many minutes does the minute hand take to move from the 4 to the 7?": "મિનિટ કાંટાને 4 થી 7 સુધી જતાં કેટલી મિનિટ લાગે?",
    "4 to 7?": "4 થી 7?",
    "How many spaces are there between two numbers?": "બે આંકડા વચ્ચે કેટલાં ખાનાં છે?",
    "Yes, three stretches of five small marks.": "હા, પાંચ-પાંચ કાપાના ત્રણ ભાગ.",
    "How many minutes does the minute hand take to go once all the way round?": "મિનિટ કાંટાને એક આખો આંટો ફરતાં કેટલી મિનિટ લાગે?",
    "Once round?": "એક આંટો?",
    "How many marks lie between the 12 and the 1?": "12 અને 1 વચ્ચે કેટલા કાપા છે?",
    "Yes, once round the face is one hour.": "હા, એક આખો આંટો એક કલાક છે.",
    "The minute hand moves from the 2 to the 9, so how many minutes pass?": "મિનિટ કાંટો 2 થી 9 સુધી જાય છે, તો કેટલી મિનિટ વીતે?",
    "2 to 9?": "2 થી 9?",
    "Count the stretches from the 2 to the 9 first.": "પહેલાં 2 થી 9 સુધીના ભાગ ગણો.",
    "Yes, seven stretches, five marks in each.": "હા, સાત ભાગ, દરેકમાં પાંચ કાપા.",
    "Counting on from the last number": "છેલ્લા આંકડાથી આગળ ગણવું",
    "Tap Fives to show the fives round the clock.": "ઘડિયાળની ફરતે પાંચ-પાંચ બતાવવા પાંચ-પાંચ દબાવો.",
    "Tap the Fives key.": "પાંચ-પાંચ બટન દબાવો.",
    "Tap Count to count in fives to the 3, then the marks after it.": "3 સુધી પાંચ-પાંચ, પછી પછીના કાપા ગણવા ગણો દબાવો.",
    "Now tap the Count key.": "હવે ગણો બટનને દબાવો.",
    "Fives up to the last number passed, then one minute for each mark after it.": "વટાવેલા છેલ્લા આંકડા સુધી પાંચ-પાંચ, પછી દરેક કાપાની એક મિનિટ.",
    "You learned: count fives to the last number, then the marks.": "તમે શીખ્યા: છેલ્લા આંકડા સુધી પાંચ-પાંચ, પછી કાપા ગણો.",
    "How many minutes past the hour does this clock show?": "આ ઘડિયાળ કલાક પછી કેટલી મિનિટ બતાવે છે?",
    "Minutes past?": "કેટલી મિનિટ?",
    "Which number has the minute hand just passed?": "મિનિટ કાંટો હમણાં કયો આંકડો વટાવી ગયો છે?",
    "Yes, the 6 stands for thirty minutes.": "હા, 6 એટલે 30 મિનિટ.",
    "Count the minutes on this clock, past the hour.": "આ ઘડિયાળ પર કલાક પછીની મિનિટ ગણો.",
    "Minutes?": "મિનિટ?",
    "How many minutes does the 10 stand for?": "10 કેટલી મિનિટ બતાવે છે?",
    "Yes, fifty at the 10, then two marks.": "હા, 10 પર 50, પછી બે કાપા.",
    "Drag the minute hand to show 6:18.": "6:18 બતાવવા મિનિટ કાંટો ખેંચો.",
    "Show 6:18": "6:18 બતાવો",
    "How many minutes does the 3 stand for?": "3 કેટલી મિનિટ બતાવે છે?",
    "Yes, three marks after the 3.": "હા, 3 પછી ત્રણ કાપા.",
    "The hour the hand has passed": "કાંટો જે કલાક વટાવી ગયો છે",
    "The hour hand is nearly at the 8, so tap it to see which number it has passed.": "કલાક કાંટો લગભગ 8 પર છે, તેને દબાવીને જુઓ કે તે કયો આંકડો વટાવી ગયો.",
    "Tap the short hand.": "નાનો કાંટો દબાવો.",
    "Now drag the minute hand on to the 12 and watch the hour hand.": "હવે મિનિટ કાંટો 12 સુધી ખેંચો અને કલાક કાંટો જુઓ.",
    "Move the long blue hand to the 12.": "લાંબો વાદળી કાંટો 12 સુધી લઈ જાઓ.",
    "The hour is the number the hour hand has passed, not the one it is nearly at.": "કલાક એ આંકડો છે જે કાંટો વટાવી ગયો, જેની પાસે છે તે નહીં.",
    "You learned: read the hour the hour hand has passed.": "તમે શીખ્યા: કલાક કાંટો જે વટાવી ગયો, તે જ કલાક.",
    "What time does this clock show?": "આ ઘડિયાળ કેટલો સમય બતાવે છે?",
    "What time?": "કેટલો સમય?",
    "Which number has the hour hand passed?": "કલાક કાંટો કયો આંકડો વટાવી ગયો છે?",
    "Yes, the hour hand has not reached the 4.": "હા, કલાક કાંટો હજી 4 સુધી પહોંચ્યો નથી.",
    "Write the time on this clock in figures.": "આ ઘડિયાળનો સમય આંકડામાં લખો.",
    "Has the minute hand reached the 12 yet?": "શું મિનિટ કાંટો 12 સુધી પહોંચ્યો?",
    "Yes, the hour hand has passed the ten.": "હા, કલાક કાંટો 10 વટાવી ગયો છે.",
    "The clock shows a quarter to six, so write the time in figures.": "ઘડિયાળ પોણા છ બતાવે છે, સમય આંકડામાં લખો.",
    "Quarter to six?": "પોણા છ?",
    "A quarter to six comes before six o'clock.": "પોણા છ, છ વાગ્યા પહેલાં આવે છે.",
    "Yes, a quarter to six comes before six.": "હા, પોણા છ એ છ વાગ્યા પહેલાં હોય છે.",
    "This clock shows the time in figures. Can you make the clock with hands show it too?": "આ ઘડિયાળ આંકડામાં સમય બતાવે છે. શું તમે કાંટાવાળી ઘડિયાળ પર પણ તે બતાવી શકો?",
    "The minute hand counts in fives from the 12.": "મિનિટ કાંટો 12 થી પાંચ-પાંચ ગણે છે.",
    "The hour hand shows the hour it has just passed.": "કલાક કાંટો હમણાં વટાવેલો કલાક બતાવે છે.",
    "Count the spaces from one number to the next. How long does the hand take to cross one space?": "એક આંકડાથી બીજા સુધી ખાનાં ગણો. કાંટાને એક ખાનું પાર કરતાં કેટલો સમય લાગે?",
    "Each small space is one minute, so count every space.": "દરેક નાનું ખાનું એક મિનિટ છે, તો દરેક ખાનું ગણો.",
    "Five minutes go by for each number the hand passes.": "કાંટો દરેક આંકડો વટાવે ત્યારે પાંચ મિનિટ જાય છે.",
    "Count in fives to the last number the hand has passed. Now count the marks after it.": "કાંટાએ વટાવેલા છેલ્લા આંકડા સુધી પાંચ-પાંચ ગણો. હવે પછીના કાપા ગણો.",
    "Say the fives up to that number, then count the marks.": "તે આંકડા સુધી પાંચ-પાંચ બોલો, પછી કાપા ગણો.",
    "Only the marks after the last number count in ones.": "છેલ્લા આંકડા પછીના કાપા જ એક-એક ગણાય છે.",
    "The hour hand is nearly at the next number. Which number has it passed?": "કલાક કાંટો લગભગ આગલા આંકડા પર છે. તે કયો આંકડો વટાવી ગયો છે?",
    "Late in the hour, the hour hand is nearly at the next number.": "કલાકના અંતે કલાક કાંટો આગલા આંકડાની પાસે હોય છે.",
    "Look behind the hour hand, not in front of it.": "કલાક કાંટાની પાછળ જુઓ, આગળ નહીં.",
    "Minute Clock": "મિનિટ ઘડિયાળ",
    "Free play: drag the hands, show the fives and count the minutes.": "મુક્ત રમત: કાંટા ખેંચો, પાંચ-પાંચ બતાવો અને મિનિટ ગણો.",
    "Where is each hand pointing?": "દરેક કાંટો ક્યાં બતાવે છે?",
    "A clock with two hands, and a clock with figures. Where is each hand pointing?": "બે કાંટાવાળી ઘડિયાળ, અને આંકડાવાળી ઘડિયાળ. દરેક કાંટો ક્યાં બતાવે છે?",
    "{h} o'clock": "{h} વાગ્યા",
    "quarter past {h}": "સવા {h}",
    "half past {h}": "{h} વાગીને 30 મિનિટ",
    "quarter to {h}": "પોણા {h}",
    "{m} minute past {h}": "{h} વાગીને {m} મિનિટ",
    "{m} minutes past {h}": "{h} વાગીને {m} મિનિટ",
    "{m} minute to {h}": "{h} વાગવામાં {m} મિનિટ",
    "{m} minutes to {h}": "{h} વાગવામાં {m} મિનિટ",
    "{n} minute": "{n} મિનિટ",
    "{n} minutes": "{n} મિનિટ",
    "Step": "આગળ",
    "Count": "ગણો",
    "Fives": "પાંચ-પાંચ"
},
};

/* One entry per phase = one mount.
   says    the teach run, printed on the bubble a piece at a time before anything is asked (numbers are printed as words)
           keyOnly: digits print as written; a bubble line may name its number unless that gives the answer away
   steps   GUIDE STEPS (runtime r30; `hint` r34), when the plan's teach lines describe acts:
             steps: [{ say: "Tap Cut to cut the bar into ten equal parts.", on: "cut", hint: "Tap the Cut key first." },
                     { say: "Now tap one part to shade it.", on: "shade", hint: "Tap one piece of the bar." }],
           The phase then opens on steps[0].say with the question and the Answer key waiting (stage "demo"; `says` and
           OPENING are not shown). Work does the act when the CHILD does it and reports it: api.did("cut"). Only then does
           the bubble move to the next step (never on a timer); the last act opens the first question with its say.
           ONE CLICK PER STEP (2026-10-08): a step completes on one click of one control (a button such as Cut, or one
           piece of the picture), never on a count; if the idea needs more clicks, write more steps, each with the next
           instruction (the same `on` may repeat). The keypad's Enter is not a step act. Name a step's button after its
           act (data-control "cut") so the check can click it.
           Report EVERY click Work gets with api.did(name) at the moment of the click, awaited or not: a wrong act shows
           that step's `hint` UNDER the pinned instruction, unchanged until the child acts again (the header's Hint key
           shows it on demand as well). Work must also register api.onEnter so that Enter, the agent's check() and the dev
           solve() perform the CURRENT step (see Work below); props.stepOn names the act waited for: put the one <Invite/>
           on that control. ONE PAGE (r35): each `say`, each `hint`, each question's `say`, each `miss` and ladder rung is
           ONE sentence that fits the bubble (no timer ever pages it); a hint at most about 40 characters when its
           instruction runs to two lines, never over 80, never the answer; each hint unique in the phase.
           The scaffold writes ONE stub step per phase from its teach line: make it real, or delete the `steps` array of a
           phase whose teach describes no act (then `says` is the teach run and the phase opens on its first question).
   ladder  rungs 2 and 3 of the hint ladder (rung 1 is each item's own miss line); never the answer
   closing one closing line for this phase, printed once when it goes idle
           keyOnly: ONE sentence; the bubble shows it in place of the last win line
   learned the summary page's row for this phase: "You learned: ..." (at most 72 characters)
   traceback what the working area redraws after a miss, in one line (for the sidecar)
   demo?   { ... } when the phase opens on the child's one physical act (see api.demoDone); steps are the newer way
   items   the authored fallback: three a phase, the third tests whether the phase landed.
           qid   the plan's question id (<conceptId>:ML<n> or <conceptId>:<q_no>); null for an item you author
           kind  your name for the item type (the Work, judge and oracle switch on it)
           say   the question's line on the bubble (one sentence: one page); ask = the short prompt above the slot
                 (<= 3 lines of ~15 chars)
                 keyOnly: there is no question bar, so the bubble is the only place the question shows: `say` is the WHOLE question in ONE
                 sentence (the plan's question cut to one: put its setup back in when the child needs it). `ask` stays, because the checks and
                 the sidecar read it, but it is never drawn. A hint (miss, ladder rung) shows in place of the question: ONE sentence each
           answer what the slot or the working area must produce; miss = rung 1, shown at once UNDER the pinned
                  instruction after a miss (one sentence, never the answer; a second miss shows ladder[0], a third
                  ladder[1]), and kept there until the child acts again
           choices? [{ id, label }] for a word answer; pad?: "enter" when it is made on the working area
           parts?  [{ label, unit? }, …] with answer [a, b]: two boxes in the slot (quotient · remainder;
                   label at most 10 characters, e.g. { label: "each bowl", unit: "mL" }); typed reads "16|1".
                   A fraction: parts: SLOT_FRACTION, answer [3, 4] (drawn stacked). A mixed number or a
                   tidied answer: parts: SLOT_MIXED, answer [1, 2, 3] · [5, null, null] · [null, 7, 10]
                   (null = that box stays empty; the slot never says which kind the answer is)
                   A decimal: answer "0.09", a string in its written form (so "0.30" is not "0.3" and ".3"
                   is not "0.3"), with pointKey: true in the tool object below (the pad's point key) */
const PHASES = [
  {
    n: 1,
    concept: "Digital and analog",
    conceptId: "M1.S1.T2.C5", objectiveIds: ["O1"],
    says: ["This clock shows the time in figures. Can you make the clock with hands show it too?"],
    /* warm-up 4:10: the clock in figures shows it, the hands wait at the 12 */
    warm: { h: 12, m: 0, show: [4, 10] },
    steps: [
      { say: "The digital clock says 4:10, so drag the analog minute hand to the 2.", on: "minute", hint: "Pull the long blue hand round to the 2." },
      { say: "Now drag the hour hand to just past the 4.", on: "hour", hint: "Move the short hand this time." },
      { say: "Tap the words card to read the same time in words.", on: "words", hint: "Tap the card under the figures." },
    ],
    stepHold: 2200,
    ladder: ["The minute hand counts in fives from the 12.", "The hour hand shows the hour it has just passed."],
    closing: "Both clocks can show the same time, to the exact minute.",
    learned: "You learned: figures and hands can show the same time.",
    traceback: "Pale ghost hands settle where the hands belong, the fives ring shows, and the words card reads the time.",
    items: [
      /* learn ML1: answer in the plan = It is a digital clock. On an analog clock the minute hand points at the one, and the hour hand is just past the nine.
         Plan: A clock with no hands shows 9:05 in figures. What kind of clock is it, and where do the hands of an analog clock point at the same time?
         The child SETS the hands (the "where do the hands point" half); the warm-up's steps name the digital clock. */
      { qid: "M1.S1.T2.C5:ML1", kind: "set", pad: "enter", h: 12, m: 0, show: [9, 5], answer: [9, 5],
        say: "Set the hands of the clock to show 9:05, the time in the figures.", ask: "Show 9:05",
        miss: "Which figures are the hour, and which are the minutes?",
        win: "Yes, the minute hand points at the 1." },
      /* practice 1: answer in the plan = 11:20. Plan: An analog clock and a digital clock both show twenty past eleven. What does the digital clock show? */
      { qid: "M1.S1.T2.C5:1", kind: "read", h: 11, m: 20, near: "11|4", cover: true, parts: [{ label: "Hours" }, { label: "Minutes" }], answer: [11, 20],
        say: "The clock with hands shows a time, so what would the clock in figures show?", ask: "In figures?",
        miss: "Count in fives from the 12 up to the minute hand.",
        win: "Yes, the hands and the figures agree." },
      /* practice 7 (moved here from phase 4, which had four): answer in the plan = The minute hand points at the first small mark after the eleven.
         The hour hand is between the twelve and the one, almost at the one, because one o'clock has not yet come. Plan: Set a clock to 12:56. Where do the two hands point? */
      { qid: "M1.S1.T2.C8:7", kind: "set", pad: "enter", h: 3, m: 0, near: "1|56", show: [12, 56], answer: [12, 56],
        say: "Now make the clock with hands show 12:56.", ask: "Show 12:56",
        miss: "Before one o'clock, which number has the hour hand passed?",
        win: "Yes, nearly at the 1, but not there yet." },
    ],
  },
  {
    n: 2,
    concept: "Each small mark is a minute",
    conceptId: "M1.S1.T2.C6", objectiveIds: ["O1"],
    says: ["Count the spaces from one number to the next. How long does the hand take to cross one space?"],
    /* warm-up: the glass over the 1 to the 2, the minute hand on the 1 */
    warm: { h: 12, m: 5, mag: 1 },
    steps: [
      { say: "The minute hand is on the 1, so tap Step to move it one small mark on.", on: "step", hint: "Tap the Step key under the glass." },
      { say: "That took one minute, so tap Step for one more mark.", on: "step", hint: "Tap Step once more." },
      { say: "Tap Count to light every space from the 1 to the 2.", on: "count", hint: "Tap the Count key now." },
    ],
    stepHold: 2400,
    ladder: ["Each small space is one minute, so count every space.", "Five minutes go by for each number the hand passes."],
    closing: "Each small mark is one minute, and there are five from one number to the next.",
    learned: "You learned: each small mark is a minute, five between two numbers.",
    traceback: "The arc lights mark by mark from the start number to the end number while the count of minutes climbs.",
    items: [
      /* learn ML2: answer in the plan = Fifteen minutes */
      { qid: "M1.S1.T2.C6:ML2", kind: "span", from: 4, to: 7, h: 12, m: 20, mag: 4, answer: 15,
        say: "How many minutes does the minute hand take to move from the 4 to the 7?", ask: "4 to 7?",
        miss: "How many spaces are there between two numbers?",
        win: "Yes, three stretches of five small marks." },
      /* practice 2: answer in the plan = Sixty marks, which take sixty minutes, or one hour (one number: the minutes) */
      { qid: "M1.S1.T2.C6:2", kind: "round", h: 12, m: 0, near: 12, mag: 12, answer: 60,
        say: "How many minutes does the minute hand take to go once all the way round?", ask: "Once round?",
        miss: "How many marks lie between the 12 and the 1?",
        win: "Yes, once round the face is one hour." },
      /* practice 3: answer in the plan = Thirty-five minutes, because seven stretches of five marks are thirty-five marks */
      { qid: "M1.S1.T2.C6:3", kind: "span", from: 2, to: 9, h: 12, m: 10, mag: 2, answer: 35,
        say: "The minute hand moves from the 2 to the 9, so how many minutes pass?", ask: "2 to 9?",
        miss: "Count the stretches from the 2 to the 9 first.",
        win: "Yes, seven stretches, five marks in each." },
    ],
  },
  {
    n: 3,
    concept: "Counting on from the last number",
    conceptId: "M1.S1.T2.C7", objectiveIds: ["O2"],
    says: ["Count in fives to the last number the hand has passed. Now count the marks after it."],
    /* warm-up 2:17, the figures covered, the fives ring hidden */
    warm: { h: 2, m: 17, cover: true },
    steps: [
      { say: "Tap Fives to show the fives round the clock.", on: "fives", hint: "Tap the Fives key." },
      { say: "Tap Count to count in fives to the 3, then the marks after it.", on: "count", hint: "Now tap the Count key." },
    ],
    stepHold: 2400,
    ladder: ["Say the fives up to that number, then count the marks.", "Only the marks after the last number count in ones."],
    closing: "Fives up to the last number passed, then one minute for each mark after it.",
    learned: "You learned: count fives to the last number, then the marks.",
    traceback: "The fives ring shows, the arc runs in blocks of five to the last number passed, then lights the marks after it one at a time.",
    items: [
      /* learn ML3: answer in the plan = Thirty-four minutes past the hour. Plan: The minute hand points at the fourth small mark after the six. */
      { qid: "M1.S1.T2.C7:ML3", kind: "min", h: 9, m: 34, near: 10, cover: true, answer: 34,
        say: "How many minutes past the hour does this clock show?", ask: "Minutes past?",
        miss: "Which number has the minute hand just passed?",
        win: "Yes, the 6 stands for thirty minutes." },
      /* practice 4: answer in the plan = Fifty-two minutes: the ten stands for fifty, and two marks more make fifty-two */
      { qid: "M1.S1.T2.C7:4", kind: "min", h: 8, m: 52, near: 12, cover: true, answer: 52,
        say: "Count the minutes on this clock, past the hour.", ask: "Minutes?",
        miss: "How many minutes does the 10 stand for?",
        win: "Yes, fifty at the 10, then two marks." },
      /* practice 5: answer in the plan = At the third small mark after the three, because the three stands for fifteen minutes and three marks more make eighteen */
      { qid: "M1.S1.T2.C7:5", kind: "setmin", pad: "enter", h: 6, m: 0, show: [6, 18], answer: [6, 18],
        say: "Drag the minute hand to show 6:18.", ask: "Show 6:18",
        miss: "How many minutes does the 3 stand for?",
        win: "Yes, three marks after the 3." },
    ],
  },
  {
    n: 4,
    concept: "The hour the hand has passed",
    conceptId: "M1.S1.T2.C8", objectiveIds: ["O2"],
    says: ["The hour hand is nearly at the next number. Which number has it passed?"],
    /* warm-up 7:55: the hour hand nearly at the 8 */
    warm: { h: 7, m: 55, cover: true },
    steps: [
      { say: "The hour hand is nearly at the 8, so tap it to see which number it has passed.", on: "hour", hint: "Tap the short hand." },
      { say: "Now drag the minute hand on to the 12 and watch the hour hand.", on: "minute", hint: "Move the long blue hand to the 12." },
    ],
    stepHold: 2400,
    ladder: ["Late in the hour, the hour hand is nearly at the next number.", "Look behind the hour hand, not in front of it."],
    closing: "The hour is the number the hour hand has passed, not the one it is nearly at.",
    learned: "You learned: read the hour the hour hand has passed.",
    traceback: "The hour finder rings the number passed and outlines the next, the arc counts the minutes, and the figures show the time.",
    items: [
      /* learn ML4: answer in the plan = 3:58, which is two minutes to four */
      { qid: "M1.S1.T2.C8:ML4", kind: "read", h: 3, m: 58, cover: true, parts: [{ label: "Hours" }, { label: "Minutes" }], answer: [3, 58],
        say: "What time does this clock show?", ask: "What time?",
        miss: "Which number has the hour hand passed?",
        win: "Yes, the hour hand has not reached the 4." },
      /* practice 6: answer in the plan = 10:41, because the hour hand has passed the ten and not yet reached the eleven */
      { qid: "M1.S1.T2.C8:6", kind: "read", h: 10, m: 41, cover: true, parts: [{ label: "Hours" }, { label: "Minutes" }], answer: [10, 41],
        say: "Write the time on this clock in figures.", ask: "In figures?",
        miss: "Has the minute hand reached the 12 yet?",
        win: "Yes, the hour hand has passed the ten." },
      /* practice 8: answer in the plan = 5:45. A quarter to six is fifteen minutes before six o'clock, so the hour hand has passed the five and not yet reached the six */
      { qid: "M1.S1.T2.C8:8", kind: "read", h: 5, m: 45, cover: true, words: true, parts: [{ label: "Hours" }, { label: "Minutes" }], answer: [5, 45],
        say: "The clock shows a quarter to six, so write the time in figures.", ask: "Quarter to six?",
        miss: "A quarter to six comes before six o'clock.",
        win: "Yes, a quarter to six comes before six." },
    ],
  },
];

/* THE MODEL: held back, put back unchanged */
const MODEL = { clock: MC, marks: 60, minuteDegPerMinute: 6, hourDegPerMinute: 0.5, hourDegPerHour: 30,
  hands: "minute hand snaps to a mark; the hour hand is set to an hour and stands where it belongs for the minutes set" };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

const mcSet = (k: any) => k === "set" || k === "setmin";
/* judge: a set clock compares the hands (setmin: the minute hand only); a time compares both boxes; a count as a number */
const judge = (item: any, v: any) => {
  if (mcSet(item.kind)) {
    const [a, b] = mcHM(v);
    return (item.kind === "setmin" || mcHr(a) === item.answer[0]) && b === item.answer[1];
  }
  if (item.parts) return judgeSlotParts(item, v);
  return leadNumber(v) === item.answer;
};
/* oracle: a second route, from the hands' angles and the marks counted one by one */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "read" || it.kind === "min") {
    const hourDeg = (it.h % 12) * 30 + it.m / 2, minDeg = it.m * 6;
    const hr = Math.floor(hourDeg / 30) || 12, mn = Math.round(minDeg / 6);
    return it.kind === "min" ? it.answer === mn : it.answer[0] === hr && it.answer[1] === mn;
  }
  if (it.kind === "span" || it.kind === "round") {
    let marks = 0;
    for (let d = (it.kind === "round" ? 0 : it.from * 30); d < (it.kind === "round" ? 360 : it.to * 30); d += 6) marks++;
    return it.answer === marks;
  }
  if (mcSet(it.kind)) return it.answer[0] === it.show[0] && it.answer[1] === it.show[1];
  return false;
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => item.near !== undefined ? item.near : item.kind === "set" ? item.answer[0] + "|" + ((item.answer[1] * 5) % 60)
  : item.kind === "setmin" ? item.answer[0] + "|" + (item.answer[1] + 5)
  : item.parts ? mcHr(item.answer[0] + 1) + "|" + item.answer[1]
  : item.kind === "span" ? item.to - item.from + 0 === item.answer ? item.answer + 1 : item.to - item.from
  : item.answer + 1;
/* the forms of an answer that no question, hint or ladder line may print (a set clock's answer is where the hands point) */
const answerForms = (item: any) => mcSet(item.kind) ? [] : item.parts ? [mcTime(item.answer[0], item.answer[1]), ...item.answer.filter((x: number) => x >= 10).map(String)]
  : [String(item.answer), words(item.answer)];
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
/* a set clock is given to the agent as its time ("9:05"), so no keyboard run types it on the digit keys: it is set on the face */
const agentKey = (item: any) => (mcSet(item.kind) ? mcTime(item.answer[0], item.answer[1]) : item.answer);
const mcHM = (v: any) => (Array.isArray(v) ? v : String(v).match(/\d+/g) || []).map((x: any) => Number(x));

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer() for an item made on the working area: set it as a child would; undefined = type it */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: nothing waits on this board (undefined = press Enter) */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area ────────────────────────────────────────────────────────────────────────
   keyOnly: 64,108, 1472 x 520 (900 x 520 open, bigPad). The clock stands at the left and the right column (figures, words
   card, glass, count, key) ends at x 890, so the picture keeps ONE place and size whether the panel is open or shut and
   nothing ever reaches box.key. */
const MC_ROWS: any = {
  1: { readout: 16, words: 150 },
  2: { mag: 12, lensR: 118, count: 330 },
  3: { readout: 16, count: 150 },
  4: { readout: 16, words: 150 },
  free: { readout: 16, words: 142, mag: 246, lensR: 84 },
};
const MC_KEY: any = { step: "Step", count: "Count", fives: "Fives" };
const MC_KEY_Y = 432;
const mcArcPath = (cx: number, cy: number, r: number, d0: number, d1: number) => {
  const a = mcPol(cx, cy, r, d0), b = mcPol(cx, cy, r, d1);
  return `M ${a.x} ${a.y} A ${r} ${r} 0 ${d1 - d0 > 180 ? 1 : 0} 1 ${b.x} ${b.y}`;
};

function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const { cx, cy, R, x0, cw } = MC;
  const free = stage === "free";
  const demo = !free && (stage === "demo" || stage === "teach") && !!phase.warm;
  const it: any = free ? { kind: "free", h: 10, m: 10 } : demo ? { kind: "warm", ...phase.warm } : item || {};
  const k = it.kind;
  const won = !free && !demo && (stage === "win" || stage === "idle");
  const qk = free ? "free" : n + "|" + (demo ? "w" : "q" + index);
  /* the board is keyed to the ENTRY, not only the question: an away-and-back opens a fresh board */
  const qkRef = useRef(qk), entryRef = useRef(0);
  if (qkRef.current !== qk) { qkRef.current = qk; entryRef.current++; }
  const key = qk + "#" + entryRef.current;
  const fresh = () => ({ key, h: it.h ?? 10, m: it.m ?? 10, cover: !!it.cover, words: !!it.words, fives: free, arc: null as any,
    count: demo && n === 2 ? 0 : null as any, lit: 0, mag: it.mag || 0, finder: false, ghost: null as any, moved: false, fix: false });
  const [raw, setRaw] = useState<any>(fresh);
  const s = raw.key === key ? raw : fresh();
  const keyRef = useRef(key);
  keyRef.current = key;
  const put = (patch: any) => {
    const at = key;
    setRaw((p: any) => {
      if (keyRef.current !== at) return p;
      const b = p.key === at ? p : fresh();
      return { ...b, ...(typeof patch === "function" ? patch(b) : patch) };
    });
  };
  const handsRef = useRef<any>(null);
  handsRef.current = { h: s.h, m: s.m, moved: !!s.moved };

  /* which hand the child may move now */
  const handLive = (pay: string) => free || (demo ? n === 1 || n === 4 : !won && stage === "ask" && (k === "set" || (k === "setmin" && pay === "minute")));

  /* ── acts: the pieces move by themselves (no hand is drawn, the owner 2026-11-16): the clock's own hands step to the target,
     the marks light, the fives ring and the finder appear, point by point in about 1.2 s (0.45 s for one point). `playing`
     is the move in flight: it holds api.lock(true) until the move lands, as api.act did; reduced motion lands at once.
     `mv` is the moves' own timeline (the traceback's `tl` would cancel it without its end) ── */
  const mv = useTimeline();
  const playing = useRef(false);
  const viaAct = (o: any, done: () => void) => {
    if (playing.current) return;
    playing.current = true;
    api.lock(true);
    const at: any[] = o.at || [];
    const end = () => { playing.current = false; api.lock(false); done(); };
    if (reducedMotion()) { at.forEach((_q: any, i: number) => o.onPoint && o.onPoint(i)); end(); return; }
    const gap = Math.round((at.length > 1 ? 1200 : 450) / Math.max(1, at.length));
    /* the first point changes at the press (no dead pause, play tester S4); a trailing gap keeps the move's end, and so the lock, where it was */
    mv.run([...at.map((_q: any, i: number) => [i ? gap : 0, () => { if (o.onPoint) o.onPoint(i); }]), [gap, () => {}]], end);
  };
  /* a new question, and the agent's check(), stop a move in flight (its end never runs) */
  const stopMove = () => { mv.stop(); if (playing.current) { playing.current = false; api.lock(false); } };
  const tip = (m: number) => mcPol(cx, cy, R * MC_LEN.min, m * 6);
  const hrTip = (h: number, m: number) => mcPol(cx, cy, R * MC_LEN.hr, (mcHr(h) % 12) * 30 + m * 0.5);
  const L = MC_ROWS[free ? "free" : n] || {};
  const magBox = { x: x0, y: L.mag || 0, w: cw, h: 180 };
  const spaceAt = (i: number) => ({ x: magBox.x + 40 + ((cw - 80) / 5) * (i + 0.5), y: magBox.y + 100 });
  const nudge = (pay: string, d: number) => {
    if (pay === "minute") put((p: any) => {
      let m = p.m + d, h = p.h;
      if (m >= 60) { m -= 60; h = mcHr(h + 1); }
      if (m < 0) { m += 60; h = mcHr(h - 1); }
      return { m, h, moved: true, ghost: null, fix: false, finder: false, finderH: null, arc: free ? null : p.arc };
    });
    else put((p: any) => ({ h: mcHr(p.h + d), moved: true, ghost: null, fix: false, finder: false, finderH: null }));
    api.sfx.tick();
  };
  const countTo = (a: number, z: number) => {
    const marks: number[] = [];
    for (let b = a + 5 - (a % 5); b <= z; b += 5) if (b - a >= 5 || a % 5 === 0) marks.push(b);
    const last = marks.length ? marks[marks.length - 1] : a;
    for (let q = last + 1; q <= z; q++) marks.push(q);
    return marks;
  };
  const act = (on: string) => {
    if (playing.current) return;   /* a tap while a piece moves is swallowed, as it was under api.act */
    if (demo && on !== stepOn) { api.did(on); return; }
    if (demo) {
      if (n === 1 && on === "minute") {
        const pts: number[] = []; for (let q = s.m + 1; q <= phase.warm.show[1]; q++) pts.push(q);
        viaAct({ at: pts.map(tip), onPoint: (i: number) => put({ m: pts[i] }) }, () => { put({ m: phase.warm.show[1] }); api.sfx.settle(); api.did("minute"); });
      } else if (n === 1 && on === "hour") {
        const pts: number[] = []; for (let q = 1; q <= phase.warm.show[0]; q++) pts.push(q);
        viaAct({ at: pts.map((q) => hrTip(q, s.m)), onPoint: (i: number) => put({ h: pts[i] }) }, () => { put({ h: phase.warm.show[0] }); api.sfx.settle(); api.did("hour"); });
      } else if (n === 1 && on === "words") {
        viaAct({ at: [{ x: x0 + cw / 2, y: (L.words || 0) + 48 }], onPoint: () => put({ words: true }) }, () => api.did("words"));
      } else if (n === 2 && on === "step") {
        viaAct({ at: [tip(s.m + 1)], onPoint: () => { put((p: any) => ({ m: p.m + 1, lit: p.lit + 1, count: (p.count || 0) + 1 })); api.sfx.tick(); } }, () => api.did("step"));
      } else if (n === 2 && on === "count") {
        const left: number[] = []; for (let i = s.lit; i < 5; i++) left.push(i);
        viaAct({ at: left.map(spaceAt), onPoint: () => put((p: any) => ({ lit: Math.min(5, p.lit + 1), m: p.m + 1, count: (p.count || 0) + 1 })) },
          () => { put({ lit: 5, m: 10, count: 5 }); api.sfx.settle(); api.did("count"); });
      } else if (n === 3 && on === "fives") {
        viaAct({ at: [mcPol(cx, cy, R + 38, 30)], onPoint: () => put({ fives: true }) }, () => api.did("fives"));
      } else if (n === 3 && on === "count") {
        const marks = countTo(0, s.m);
        viaAct({ at: marks.map((q) => mcPol(cx, cy, R - 17, q * 6 - 3)), onPoint: (i: number) => put({ arc: [0, marks[i]], count: marks[i] }) },
          () => { put({ arc: [0, s.m], count: s.m, cover: false }); api.sfx.settle(); api.did("count"); });
      } else if (n === 4 && on === "hour") {
        viaAct({ at: [mcPol(cx, cy, R - 56, mcHr(s.h) * 30)], onPoint: () => put({ finder: true }) }, () => api.did("hour"));
      } else if (n === 4 && on === "minute") {
        const pts: number[] = []; for (let q = s.m + 1; q <= 60; q++) pts.push(q);
        viaAct({ at: pts.map(tip), onPoint: (i: number) => put(pts[i] >= 60 ? { m: 0, h: mcHr(s.h + 1) } : { m: pts[i] }) },
          () => { put({ m: 0, h: mcHr(phase.warm.h + 1), cover: false }); api.sfx.settle(); api.did("minute"); });
      }
      return;
    }
    if (free) {
      if (on === "minute" || on === "hour") nudge(on, 1);
      else if (on === "fives") viaAct({ at: [mcPol(cx, cy, R + 38, 30)], onPoint: () => put((p: any) => ({ fives: !p.fives })) }, () => {});
      else if (on === "words") viaAct({ at: [{ x: x0 + cw / 2, y: (L.words || 0) + 46 }], onPoint: () => put((p: any) => ({ words: !p.words })) }, () => {});
      else if (on === "readout") viaAct({ at: [{ x: x0 + cw / 2, y: (L.readout || 0) + 56 }], onPoint: () => put((p: any) => ({ cover: !p.cover })) }, () => {});
      else if (on === "count") {
        const marks = countTo(0, s.m).slice(-16);
        if (!marks.length) { put({ arc: null }); return; }
        viaAct({ at: marks.map((q) => mcPol(cx, cy, R - 17, q * 6 - 3)), onPoint: (i: number) => put({ arc: [0, marks[i]] }) }, () => api.sfx.settle());
      }
      return;
    }
    if (handLive(on)) nudge(on, 1);
  };
  /* a key used one after another: one key, its label following the act; a 400 ms guard against a double tap */
  const lastKey = useRef(0);
  const pressKey = (on: string) => { const t = Date.now(); if (t - lastKey.current < 400) return; lastKey.current = t; act(on); };

  /* the hands: dragged by the child (the minute hand snaps to a mark and carries the hour hand with it; the hour hand is set to an hour) */
  const liveRef = useRef<any>(null);
  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    const lv = liveRef.current;
    liveRef.current = null;
    if (demo) { act(pay); return; }
    if (!moved || !p || isNaN(p.x)) return;   /* a tap, or a slide under 10 px, moves nothing */
    if (!handLive(pay)) return;
    if (pay === "minute" && lv) put({ m: lv.m, h: lv.h, moved: true, ghost: null, fix: false, finder: false, finderH: null, arc: free ? null : s.arc });
    /* the hour whose exact place (30 a hour + half a degree a minute) is nearest the drop */
    if (pay === "hour") put({ h: mcHr(Math.round((mcAng(cx, cy, p.x, p.y) - s.m / 2) / 30)), moved: true, ghost: null, fix: false, finder: false, finderH: null });
    api.sfx.tick();
  });
  const handKeys = (pay: string) => (e: any) => {
    const d = e.key === "ArrowRight" || e.key === "ArrowUp" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowDown" ? -1 : 0;
    if (d) { e.preventDefault(); e.stopPropagation(); if (demo) act(pay); else if (handLive(pay)) nudge(pay, d); }
    /* Enter and Space are not taken by a hand: they reach the window, where Enter answers (or does the guide step) */
  };
  let dh = s.h, dm = s.m, hourDeg: any = null;
  const dd = drag.drag;
  if (dd && !demo && handLive(dd.payload) && dd.moved && !isNaN(dd.x)) {
    const a = mcAng(cx, cy, dd.x, dd.y);
    if (dd.payload === "minute") {
      const nm = Math.round(a / 6) % 60, prev = liveRef.current || { m: s.m, h: s.h };
      let nh = prev.h;
      if (prev.m >= 45 && nm < 15) nh = mcHr(nh + 1); else if (prev.m < 15 && nm >= 45) nh = mcHr(nh - 1);
      liveRef.current = { m: nm, h: nh };
      dm = nm; dh = nh;
    } else hourDeg = a;
  }
  if (won && item && mcSet(k)) { dh = it.answer[0]; dm = it.answer[1]; hourDeg = null; }

  /* the win picture: the figures uncovered, the words card read, the count shown */
  const won2 = won && item;
  const v: any = { ...s };
  if (won2) {
    if (k === "read" || k === "min") Object.assign(v, { cover: false, words: n !== 3, arc: [0, it.m], count: k === "min" ? it.m : null, finder: n === 4, fives: true });
    if (k === "span" || k === "round") { const a = k === "round" ? 0 : it.from * 5, z = k === "round" ? 60 : it.to * 5; Object.assign(v, { arc: [a, z], count: z - a, lit: 5 }); }
    if (mcSet(k)) Object.assign(v, { words: true, cover: false, ghost: null, finder: false, finderH: null });
  }
  const readT = free ? [dh, dm] : it.show || [s.h, s.m];

  /* Enter: in a guide step it performs the step; on a set clock it sends the hands */
  api.onEnter(demo && stepOn ? () => act(stepOn) : !won && !free && stage === "ask" && mcSet(k)
    ? () => { const hd = handsRef.current; if (!hd.moved) return; /* an untouched clock sends nothing: no try, no hint */ api.submit(mcHr(hd.h) + "|" + hd.m); } : null);
  HOOK.demo = demo && stepOn ? () => act(stepOn) : null;
  HOOK.set = stage === "ask" && mcSet(k) ? (val: any) => {
    const [a, b] = mcHM(val);
    const h = mcHr(a || s.h), m = (b || 0) % 60;
    handsRef.current = { h, m, moved: true };
    put({ h, m, moved: true, ghost: null, fix: false, finder: false, finderH: null });
    return true;
  } : null;
  /* the agent's check(): a move in flight stops first; nothing else waits on this board (undefined = press Enter) */
  HOOK.check = () => { stopMove(); return undefined; };

  /* the Enter key of a set clock blinks once the child has moved a hand */
  useEffect(() => { if (stage === "ask" && mcSet(k)) api.answerReady(!!s.moved); }, [stage, key, s.moved]);
  /* a win line for every question (the phase's closing replaces the last) */
  useEffect(() => { if (stage === "win" && item && item.win) api.say(item.win); }, [stage, key]);
  /* a correction never outlives its question */
  useEffect(() => () => { tl.stop(); stopMove(); }, [key]);

  /* the traceback: the maths redrawn, ending on the whole right answer, nothing marked */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    const steps: any[] = [];
    if (k === "read" || k === "min") {
      const M = it.m, b5 = Math.floor(M / 5) * 5;
      steps.push([350, () => put({ fives: true, arc: [0, 0], fix: true, finder: false, count: null })]);
      for (let b = 5; b <= b5; b += 5) { const bb = b; steps.push([170, () => put({ arc: [0, bb] })]); }
      for (let q = b5 + 1; q <= M; q++) { const qq = q; steps.push([320, () => put({ arc: [0, qq] })]); }
      steps.push([500, () => put({ count: k === "min" ? M : null, finder: true })]);
      steps.push([600, () => put({ cover: false, words: n !== 3 })]);
    } else if (k === "span" || k === "round") {
      const a = k === "round" ? 0 : it.from * 5, z = k === "round" ? 60 : it.to * 5;
      steps.push([350, () => put({ arc: [a, a], count: 0, fix: true, lit: 0 })]);
      for (let q = a + 1; q <= z; q++) { const qq = q; steps.push([k === "round" ? 70 : 130, () => put({ arc: [a, qq], count: qq - a, lit: Math.min(5, qq - a) })]); }
    } else if (mcSet(k)) {
      steps.push([400, () => put({ fives: true, fix: true })]);
      steps.push([700, () => put({ ghost: { h: it.answer[0], m: it.answer[1] } })]);
      steps.push([600, () => put({ finder: true, finderH: it.answer[0] })]);
      steps.push([600, () => put({ words: true })]);
    }
    tl.run(steps, () => api.lock(false));
  }, [wrong]);

  /* what the host and the agent read back: never the time of a clock the child is reading before the answer */
  const reading = !free && !won && (k === "read" || k === "min");
  api.share({ phase: n, hour: reading ? null : mcHr(dh), minute: reading ? null : dm, readoutCovered: !!v.cover, fivesRing: !!v.fives,
    arcCount: v.arc ? v.arc[1] - v.arc[0] : 0, hourPassed: v.finder && !reading ? mcHr(v.finderH || dh) : null,
    drawnHands: mcSet(k) || free ? mcHr(s.h) + "|" + s.m : null, complete: stage === "idle" });

  /* ── drawing ── */
  const hAng = hourDeg !== null ? hourDeg : (mcHr(dh) % 12) * 30 + dm * 0.5;
  const arcEls = v.arc ? (() => {
    const out: any[] = [];
    for (let i = v.arc[0]; i < v.arc[1]; i++) {
      const g0 = i % 5 === 0 ? 1.4 : 0.5, g1 = (i + 1) % 5 === 0 ? 1.4 : 0.5;
      out.push(<path key={"a" + i} d={mcArcPath(cx, cy, R - 17, i * 6 + g0, (i + 1) * 6 - g1)} fill="none" stroke={MC_MIN} strokeOpacity={0.85} strokeWidth={18} />);
    }
    return <g>{out}</g>;
  })() : null;
  const hitM = mcPol(cx, cy, R * MC_LEN.minHit, dm * 6), hitH = mcPol(cx, cy, R * MC_LEN.hrHit, hAng);
  const passedN = mcHr(v.finderH || dh), nextN = mcHr(passedN + 1);
  const numAt = (q: number) => mcPol(cx, cy, R - 56, q * 30);
  /* width by SPACING characters: the zero-advance Devanagari / Gujarati marks (PATTERNS §18) take no width */
  const fitSize = (str: string, w: number, max: number) => {
    const n = str.replace(/[ऀ-ं़ु-ै्॑-ॗॢॣઁં઼ુ-ૈ્ૢૣ]/g, "").length;
    return Math.max(28, Math.min(max, Math.floor(w / (Math.max(1, n) * 0.56))));
  };

  const readout = (y: number) => {
    const covered = v.cover;
    const tH = String(mcHr(readT[0])), tM = String(readT[1]).padStart(2, "0");
    return (
      <g>
        {/* Soft shadow */}
        <rect x={x0 + 2} y={y + 4} width={cw} height={112} rx={20} fill="#000000" fillOpacity={0.15} />
        {/* Bezel frame */}
        <rect x={x0} y={y} width={cw} height={112} rx={20} fill="#2A2E33" stroke={MC_INK} strokeWidth={4} />
        <rect x={x0 + 14} y={y + 12} width={cw - 28} height={88} rx={12} fill="#F4F8F2" stroke="#1A1C1F" strokeWidth={2} />
        {covered ? (
          <g pointerEvents="none">
            <rect x={x0 + 14} y={y + 12} width={cw - 28} height={88} rx={12} fill="#D9BE8C" stroke={shade("#D9BE8C", 0.3)} strokeWidth={3} />
            {[0, 1, 2, 3, 4, 5].map((i) => <line key={i} x1={x0 + 40 + i * 48} y1={y + 22} x2={x0 + 20 + i * 48} y2={y + 90} stroke={shade("#D9BE8C", 0.18)} strokeWidth={6} />)}
            <rect x={x0 + cw / 2 - 30} y={y + 48} width={60} height={16} rx={8} fill={shade("#D9BE8C", 0.35)} />
          </g>
        ) : (
          <text x={x0 + cw / 2} y={y + 78} textAnchor="middle" fontSize={T.display} fontWeight={700} pointerEvents="none">
            <tspan fill={shade(MC_HR, 0.25)}>{tH}</tspan><tspan fill={MC_INK}>:</tspan><tspan fill={shade(MC_MIN, 0.25)}>{tM}</tspan>
          </text>
        )}
        {free && <Hit id="readout" x={x0} y={y} w={cw} h={112} onPress={() => act("readout")} label="Cover or show the figures" />}
      </g>
    );
  };
  const wordsCard = (y: number) => {
    const str = mcWords(readT[0], readT[1], tx), fs = fitSize(str, cw - 64, 36);
    const live = free || (demo && n === 1);
    return (
      <g>
        <rect x={x0 + 2} y={y + 3} width={cw} height={92} rx={18} fill="#000000" fillOpacity={0.1} />
        {v.words ? (
          <g pointerEvents="none">
            <rect x={x0} y={y} width={cw} height={92} rx={18} fill="#FFFDF7" stroke={MC_INK} strokeWidth={3} />
            <rect x={x0 + 6} y={y + 6} width={cw - 12} height={80} rx={14} fill="none" stroke={shade("#FFFDF7", 0.05)} strokeWidth={2} />
            <text x={x0 + cw / 2} y={y + 46 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill={MC_INK}>{str}</text>
          </g>
        ) : (
          <g pointerEvents="none">
            <rect x={x0} y={y} width={cw} height={92} rx={18} fill="#B98A5A" stroke={MC_INK} strokeWidth={3} />
            <rect x={x0 + 12} y={y + 12} width={cw - 24} height={68} rx={12} fill="none" stroke="#E8CFA6" strokeWidth={3} strokeDasharray="12 9" />
          </g>
        )}
        {live && <Hit id="words" x={x0} y={y} w={cw} h={92} onPress={() => act("words")} label="Words card" />}
      </g>
    );
  };
  /* the glass: a round lens with a ring and a handle; thin lines join it to the stretch of the clock it shows */
  const lensR = L.lensR || 100;
  const lensC = { x: x0 + cw / 2 - 24, y: (L.mag || 0) + lensR };
  const magA = free ? (Math.floor(dm / 5) || 12) : v.mag || 12, magB = mcHr(magA + 1);
  const leaders = () => {
    if (L.mag === undefined) return null;
    const pts = [magA * 30, magB * 30].map((d) => {
      const p = mcPol(cx, cy, R + 6, d), dx = p.x - lensC.x, dy = p.y - lensC.y, l = Math.hypot(dx, dy) || 1;
      return { p, q: { x: lensC.x + (dx / l) * lensR, y: lensC.y + (dy / l) * lensR } };
    });
    return <g pointerEvents="none">{pts.map((o, i) => <line key={"ld" + i} x1={o.p.x} y1={o.p.y} x2={o.q.x} y2={o.q.y} stroke={MC_INK} strokeOpacity={0.55} strokeWidth={2.5} strokeDasharray="8 7" />)}</g>;
  };
  const magnifier = () => {
    const r = lensR, big = r > 100, lx = lensC.x, cyl = lensC.y;
    const lit = free ? dm % 5 : v.lit;
    const xl = lx - r * (big ? 0.74 : 0.7), xr = lx + r * (big ? 0.74 : 0.7), sw = (xr - xl) / 5, ly = cyl + 4, tk = big ? 26 : 19;
    const h0 = mcPol(lx, cyl, r + 2, 135), h1 = mcPol(lx, cyl, r + (big ? 70 : 30), 135);
    return (
      <g pointerEvents="none">
        <line x1={h0.x} y1={h0.y} x2={h1.x} y2={h1.y} stroke={MC_INK} strokeWidth={big ? 28 : 22} strokeLinecap="round" />
        <line x1={h0.x} y1={h0.y} x2={h1.x} y2={h1.y} stroke="#8A5A34" strokeWidth={big ? 22 : 16} strokeLinecap="round" />
        <circle cx={lx} cy={cyl} r={r + 8} fill="#3A3F44" stroke={MC_INK} strokeWidth={3} filter="url(#fShadowSoft)" />
        <circle cx={lx} cy={cyl} r={r} fill="#F0F7FF" />
        <path d={mcArcPath(lx, cyl, r - 12, 290, 340)} fill="none" stroke="#FFFFFF" strokeWidth={8} strokeLinecap="round" />
        {Array.from({ length: 5 }).map((_, i) => i < lit && (
          <g key={"s" + i}>
            <rect x={xl + i * sw + 3} y={ly - 12} width={sw - 6} height={24} rx={6} fill={MC_MIN} fillOpacity={0.88} stroke={shade(MC_MIN, 0.25)} strokeWidth={1.5} />
            <text x={xl + (i + 0.5) * sw} y={ly + (big ? 50 : 42)} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(MC_MIN, 0.25)}>{i + 1}</text>
          </g>
        ))}
        <line x1={xl} y1={ly} x2={xr} y2={ly} stroke={MC_INK} strokeWidth={3.5} strokeLinecap="round" />
        {Array.from({ length: 6 }).map((_, i) => <line key={"m" + i} x1={xl + i * sw} y1={ly - (i % 5 === 0 ? tk : tk * 0.62)} x2={xl + i * sw} y2={ly + (i % 5 === 0 ? tk : tk * 0.62)} stroke={MC_INK} strokeWidth={i % 5 === 0 ? 6 : 3.5} strokeLinecap="round" />)}
        <text x={xl} y={ly - (big ? 38 : 24)} textAnchor="middle" fontSize={big ? T.prompt : T.label} fontWeight={700} fill={MC_INK}>{magA}</text>
        <text x={xr} y={ly - (big ? 38 : 24)} textAnchor="middle" fontSize={big ? T.prompt : T.label} fontWeight={700} fill={MC_INK}>{magB}</text>
      </g>
    );
  };
  const countChip = (y: number) => v.count === null || v.count === undefined ? null : (
    <g pointerEvents="none">
      <rect x={x0 + 2} y={y + 3} width={cw} height={76} rx={18} fill="#000000" fillOpacity={0.08} />
      <rect x={x0} y={y} width={cw} height={76} rx={18} fill="#FFFDF7" stroke={C.rule} strokeWidth={3} />
      <text x={x0 + cw / 2} y={y + 38 + 14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={shade(MC_MIN, 0.25)}>{mcCount(v.count, tx)}</text>
    </g>
  );
  const keyIds: string[] = free ? ["fives", "count"] : demo && (n === 2 || n === 3) && stepOn && MC_KEY[stepOn] ? [stepOn] : [];
  const kw = keyIds.length > 1 ? 160 : 240;
  const keyBox = (j: number) => ({ x: x0 + cw / 2 - (keyIds.length * kw + (keyIds.length - 1) * 14) / 2 + j * (kw + 14), y: MC_KEY_Y, w: kw, h: 72 });

  return (
    <g>
      {/* the clock: the wooden case (skin), the face, the counting arc under the marks */}
      {leaders()}
      {mcFace(cx, cy, R, { under: arcEls, id: "work", nums: false })}
      {L.mag !== undefined && <path d={mcArcPath(cx, cy, R + 10, magA * 30, magA * 30 + 30)} fill="none" stroke={MC_MIN} strokeWidth={6} strokeLinecap="round" pointerEvents="none" />}
      {v.fives && Array.from({ length: 12 }).map((_, i) => {
        const p = mcPol(cx, cy, R + 40, (i + 1) * 30);
        return (
          <g key={"f" + i} pointerEvents="none">
            <circle cx={p.x} cy={p.y} r={27} fill="#FFFDF7" stroke={tint(MC_MIN, 0.3)} strokeWidth={2} />
            <text x={p.x} y={p.y + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(MC_MIN, 0.25)}>{(i + 1) * 5}</text>
          </g>
        );
      })}
      {v.finder && (
        <g pointerEvents="none">
          <circle cx={numAt(passedN).x} cy={numAt(passedN).y} r={32} fill={MC_HR} fillOpacity={0.28} stroke={MC_HR} strokeWidth={5} />
          <circle cx={numAt(nextN).x} cy={numAt(nextN).y} r={32} fill="none" stroke={MC_INK} strokeWidth={3} strokeDasharray="8 7" />
        </g>
      )}
      {k === "span" && !won && mcHand(cx, cy, R * MC_LEN.min, it.to * 30, "min", true)}
      {v.ghost && <g>{mcHand(cx, cy, R * MC_LEN.hr, (mcHr(v.ghost.h) % 12) * 30 + v.ghost.m * 0.5, "hr", true)}{mcHand(cx, cy, R * MC_LEN.min, v.ghost.m * 6, "min", true)}</g>}
      {mcHand(cx, cy, R * MC_LEN.hr, hAng, "hr")}
      {mcHand(cx, cy, R * MC_LEN.min, dm * 6, "min")}
      {demo && stepOn === "minute" && <Invite x={hitM.x} y={hitM.y} r={34} C={C} />}
      {demo && stepOn === "hour" && <Invite x={hitH.x} y={hitH.y} r={34} C={C} />}
      {mcNums(cx, cy, R, 42)}

      {/* Crafted 3D center pin */}
      <g pointerEvents="none">
        <circle cx={cx + 1} cy={cy + 2} r={14} fill="#000000" fillOpacity={0.25} />
        <circle cx={cx} cy={cy} r={14} fill={MC_INK} stroke={shade(MC_INK, 0.3)} strokeWidth={2} />
        <circle cx={cx} cy={cy} r={8} fill="#6B6B6B" stroke="#1A1A1A" strokeWidth={2} />
        <circle cx={cx - 2} cy={cy - 2} r={3} fill="#FFFFFF" fillOpacity={0.6} />
      </g>

      {/* the hands as controls, only while they can be moved */}
      {handLive("hour") && <circle cx={hitH.x} cy={hitH.y} r={36} fill="transparent" style={{ cursor: "grab" } as any} {...control("hour", "Hour hand")} {...drag.bind("hour")} onKeyDown={handKeys("hour")} />}
      {handLive("minute") && <circle cx={hitM.x} cy={hitM.y} r={36} fill="transparent" style={{ cursor: "grab" } as any} {...control("minute", "Minute hand")} {...drag.bind("minute")} onKeyDown={handKeys("minute")} />}

      {/* the right column */}
      {L.readout !== undefined && readout(L.readout)}
      {L.words !== undefined && wordsCard(L.words)}
      {L.mag !== undefined && magnifier()}
      {L.count !== undefined && countChip(L.count)}
      {keyIds.map((id, j) => {
        const b = keyBox(j);
        return (
          <Key key={"act" + j} id={id} label={tx(MC_KEY[id])} x={b.x} y={b.y} w={b.w} h={b.h} C={C} tone="key" onClick={() => pressKey(id)}>
            <text y={lang === "en" ? 11 : 15} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{tx(MC_KEY[id])}</text>
          </Key>
        );
      })}

      {/* the one invite: on the control the guide step waits for */}
      {demo && stepOn === "words" && <Invite x={x0 + cw / 2} y={(L.words || 0) + 46} w={cw} h={92} rx={18} C={C} />}
      {keyIds.length === 1 && demo && <Invite x={keyBox(0).x + kw / 2} y={MC_KEY_Y + 36} w={kw} h={72} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const item = it || last.it || {};
  const timeLike = Array.isArray(item.answer);
  const [a, b] = timeLike ? slotPartsOf(last.value, 2).map((x: any) => Number(x)) : [0, 0];
  const r = Math.max(20, h / 2 - 8), cx = r + 12, cy = h / 2;
  const txt = timeLike ? (item.kind === "setmin" ? mcTime(item.answer[0], b) : mcTime(a, b)) : String(last.value);
  const hh = item.kind === "setmin" ? item.answer[0] : a;
  /* a counted answer shows the clock it was counted on: the span's end, or the clock the child read */
  const counted = item.kind === "span" || item.kind === "round";
  const th = timeLike ? hh : item.h || 12, tm = timeLike ? b : item.kind === "span" ? item.to * 5 : item.m || 0;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <circle cx={cx} cy={cy} r={r} fill="#FFF8EA" stroke={MC_INK} strokeWidth={3} />
      {Array.from({ length: 12 }).map((_, i) => { const p = mcPol(cx, cy, r - 3, i * 30), q = mcPol(cx, cy, r - 9, i * 30); return <line key={i} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke={MC_INK} strokeWidth={2} />; })}
      {counted && <path d={item.kind === "round" ? `M ${cx} ${cy - r + 6} A ${r - 6} ${r - 6} 0 1 1 ${cx - 0.01} ${cy - r + 6}` : mcArcPath(cx, cy, r - 6, item.from * 30, item.to * 30)} fill="none" stroke={MC_MIN} strokeOpacity={0.8} strokeWidth={7} />}
      {!counted && mcHand(cx, cy, r * 0.5, (mcHr(th) % 12) * 30 + tm * 0.5, "hr", false, true)}
      {mcHand(cx, cy, r * 0.82, tm * 6, "min", false, true)}
      <circle cx={cx} cy={cy} r={4} fill={MC_INK} />
      <text x={w - 16} y={h / 2 + 12} textAnchor="end" fontSize={T.label} fontWeight={700} fill={MC_INK}>{txt}</text>
    </g>
  );
}

function MinuteClock(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b): the question and an Answer key on a bar across the top, the working area the
         whole card until the child taps Answer, the answer box and keypad in a panel that slides in from the right */
      board: true,
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

export default MinuteClock;