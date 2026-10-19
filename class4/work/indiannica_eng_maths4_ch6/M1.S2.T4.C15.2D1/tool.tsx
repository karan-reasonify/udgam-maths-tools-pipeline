/* ═══ M1.S2.T4.C15.2D1 · multiple_track · tool-specific part ═══════════════════════════════
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

const TOOL_ID = "multiple_track";
const MEDIA_ID = "M1.S2.T4.C15.2D1";
const TOOL_NAME = "Multiple Track";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["A track, one step block, and no end mark anywhere along it."];
/* the whole-tool line: printed on the summary page */
const FINISH_LINE = "Still running off the edge, and you never did find a last one.";
/* printed when the child opens Free play (the plan's free-play line); its LAST piece stays on the bubble */
const FREE_LINE = "Free play. Any step size, any track length, band on or off.";

/* ── the track ──────────────────────────────────────────────────────────────────────────────
   Phase 1 is a chart of stepping stones, 1 to 66 wrapped in rows: the child plants a flag on each stone where a step lands
   and the table strip beside it writes the same list as lines. Phases 2-4 and free play are the track itself: a rule from a start post
   that runs out through the right edge of the frame with nothing drawn there to end it, each step an arc as long as every other,
   a numbered flag where it lands. The chapter's colours: a multiple (built by multiplying) is green, a factor (divides exactly)
   deep blue, the number in hand (the step block, each step laid, the band's count) amber. */
const MTG = CONTENT.one;
const MTB = CONTENT.hundred;
const MTA = CONTENT.ten;
const MTL = CONTENT.line;
const MTG_INK = shade(MTG, 0.25);
const MTB_INK = shade(MTB, 0.25);
const MTA_INK = shade(MTA, 0.25);
const MT_TW = 900;                 /* the width every picture is laid out for: the keypad open with bigPad (LAYOUT §1b) */
const MT_RULE = 330;               /* the rule the steps are laid on (working-area units) */
const MT_X0 = 64;                  /* the start post */
const MT_FTOP = MT_RULE - 130;     /* the top of a flag's cloth (the flag skin starts 6 above it), on a pole down to the rule */
const MT_KEYY = 430;               /* the row of action keys, bottom centre */
const MT_BLK = 168;                /* the step block */
/* phase 1's chart of stepping stones, past the last answer (66): 17 stones a row and 67 of them when the room is wide (a stone 68 would
   stand under the open drawer's Enter key); 10 a row and 70 of them when a host keeps the keypad open (10, 17 share no factor with 9, 11 or 13,
   so no list of multiples stands in one column). A start post "0" stands left of stone 1. */
const MT_COLS = 17;
const MT_N = 67;
const MT_CW = 75;
const MT_CH = 80;
const MT_Y0 = 190;
const MT_CX0 = 66;                 /* the chart's left edge, room left of it for the start post and its "0" */
const MT_WOOD = "#B98B5A";         /* a plain pole, the colour of the flag skin's stick */
const MT_STONE = "#F0E4CF";        /* a stepping stone: warm stone, a dark ink outline on every box (LAYOUT §3) */
const MT_XS = 240;                 /* a scrolled track's left-most flag stands here, clear of the step block */

/* a list answer arrives as "9,18,27", "9, 18 and 27" or [9, 18, 27] */
const mtNums = (v: any): number[] => {
  const raw: any[] = Array.isArray(v) ? v : String(v ?? "").match(/\d+/g) || [];
  return raw.map((x: any) => Number(x)).filter((x: number) => isFinite(x));
};
const mtSet = (xs: number[]) => Array.from(new Set(xs)).sort((a, b) => a - b);
const mtSame = (a: number[], b: number[]) => {
  const x = mtSet(a), y = mtSet(b);
  return x.length === y.length && x.every((e, i) => e === y[i]);
};
/* the slot holds the list the child made on the picture; a single flag keeps a comma so it reads as a list */
const mtListText = (xs: number[]) => xs.join(",") + (xs.length === 1 ? "," : "");
const mtIsList = (it: any) => Array.isArray(it.answer) && !it.parts;
/* a flag's digits: 72 on the widest steps (a sparse scene), 56 on wide ones, 40 where the pitch allows; an item packed with 3-digit flags names its own 32 */
const mtFs = (it: any) => it.fs || ((it.sp || 0) >= 200 ? T.display : (it.sp || 0) >= 150 ? T.xl : 40);
/* a flag's cloth is as wide as its number needs; the flag skin (a tile, 90 x 144) is stretched over the whole flag with its cloth in the top
   left (x .14 to .98, y .045 to .525 of the tile), so the tile is cw / .84 wide and runs from 6 above the cloth top down to the rule */
const mtFlagW = (v: number, fs: number) => Math.max(52, indian(v).length * fs * 0.6 + 18);
const mtFlagGeo = (x: number, v: number, fs: number, ftop: number, rule: number) => {
  const cw = mtFlagW(v, fs), sw = cw / 0.84, H = rule - ftop + 6, sx = x - 0.06 * sw, sy = ftop - 6;
  const cl = { x: sx + 0.14 * sw, y: sy + 0.045 * H, w: cw, h: 0.48 * H };
  return { cw, sw, H, sx, sy, cl, cx: cl.x + cl.w / 2, cy: cl.y + cl.h / 2 };
};
/* the pitch of a track: the item's own, or wider when its widest flag needs it (a flag spans 1.17 times its cloth, and 12 stays clear),
   so flags never touch however long the child asks ("1,001" is five characters wide) */
const mtPitch = (sp0: number, fs: number, maxV: number) => Math.max(sp0, Math.ceil(mtFlagW(maxV, fs) * 1.17 + 12));
/* where a track of topK flags sits in a frame w wide: from the start post when it fits, else scrolled so the left-most flag stands at x 240 */
const mtTrack = (w: number, sp: number, topK: number) => {
  const s0 = Math.max(1, Math.floor((w - 100 - MT_X0) / sp));
  if (topK <= s0) return { shift: 0, off: 0, slots: s0 };
  const sl = Math.max(1, Math.floor((w - 100 - MT_XS) / sp)), sh = Math.max(0, topK - sl);
  return { shift: sh, off: sh * sp - (MT_XS - MT_X0), slots: sl };
};

/* THE START PAGE (runtime r28; docs/LAYOUT.md §1c, docs/PATTERNS.md §14): the first thing a child sees in user mode.
   START_HOOK is ONE printed question to wonder at (it needs a TR entry, and never gives an answer away); StartArt is
   the object the lesson is about, drawn in a 1200 x 340 box ({ box, C, lang, tx }). */
const START_HOOK = "What happens when you keep taking the same step?";
function StartArt({ box, C, lang, tx }: any) {
  const y = 270, x0 = 70, sp = 190;
  const vals = [7, 14, 21, 28, 35];
  return (
    <g>
      <rect x={x0} y={y - 4} width={box.w - x0} height={8} fill={MTL} />
      <rect x={x0 - 6} y={y - 120} width={12} height={140} rx={5} fill={MTL} />
      <circle cx={x0} cy={y - 120} r={11} fill={MTL} />
      {vals.map((v, i) => {
        const a = x0 + i * sp, b = x0 + (i + 1) * sp;
        const g = mtFlagGeo(b, v, T.label, y - 170, y);
        return (
          <g key={"s" + v}>
            <path d={`M ${a} ${y - 6} Q ${(a + b) / 2} ${y - 150} ${b} ${y - 6}`} fill="none" stroke={MTA} strokeWidth={7} strokeLinecap="round" />
            <rect x={b - 2} y={g.sy + 0.03 * g.H} width={4} height={y - g.sy - 0.03 * g.H} fill={MT_WOOD} />
            <rect x={g.cl.x} y={g.cl.y} width={g.cl.w} height={g.cl.h} rx={6} fill={tint(MTG, 0.86)} stroke={MTG} strokeWidth={2.5} />
            <Skin name="flag" x={g.sx} y={g.sy} w={g.sw} h={g.H} fit="stretch" />
            <rect x={g.cl.x} y={g.cl.y} width={g.cl.w} height={g.cl.h} rx={6} fill={MTG} fillOpacity={0.2} />
            <rect x={g.cx - g.cw / 2 + 3} y={g.cy - T.label * 0.62} width={g.cw - 6} height={T.label * 1.24} rx={7} fill={tint(MTG, 0.9)} fillOpacity={0.94} />
            <text x={g.cx} y={g.cy + T.label * 0.35} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={MTG_INK}>{v}</text>
          </g>
        );
      })}
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
    "Multiple Track": "गुणजों का रास्ता",
    "A track, one step block, and no end mark anywhere along it.": "एक रास्ता, एक कदम का डिब्बा, और रास्ते में कहीं अंत का निशान नहीं।",
    "Still running off the edge, and you never did find a last one.": "रास्ता अब भी किनारे के पार जा रहा है, और तुम्हें आखिरी झंडा कभी नहीं मिला।",
    "Free play. Any step size, any track length, band on or off.": "मुक्त खेल। कोई भी कदम, कोई भी लंबाई, पट्टी चालू या बंद।",
    "What happens when you keep taking the same step?": "जब तुम एक ही कदम बार-बार रखते जाओ, तो क्या होता है?",
    /* phase 1 */
    "A times table read as a list": "सूची की तरह पढ़ा गया पहाड़ा",
    "Tap the stone where the first step of 4 lands.": "जहाँ 4 का पहला कदम पड़ता है, वह पत्थर छुओ।",
    "Count four stones on from the start.": "शुरू से चार पत्थर आगे गिनो।",
    "Now count on another 4 and tap the stone you reach.": "अब 4 और आगे गिनो और जिस पत्थर पर पहुँचो उसे छुओ।",
    "Count four more stones from your flag.": "अपने झंडे से चार पत्थर और गिनो।",
    "Which line of the table does each flag answer?": "हर झंडा पहाड़े की किस पंक्ति का उत्तर है?",
    "Count the stones of one step, then count the same again from the last flag.": "एक कदम के पत्थर गिनो, फिर आखिरी झंडे से उतने ही गिनो।",
    "Three more multiples of 11 are in place: a table is a list of multiples.": "11 के तीन और गुणज लग गए: पहाड़ा गुणजों की सूची है।",
    "You learned: a times table lists the multiples of its number.": "तुमने सीखा: पहाड़ा अपनी संख्या के गुणजों की सूची है।",
    "First six in the table of 9": "9 के पहाड़े के पहले छह",
    "Plant a flag on each of the first six answers in the table of 9.": "9 के पहाड़े के पहले छह उत्तरों पर एक-एक झंडा लगाओ।",
    "Say the table of 9 aloud, and check every flag sits on one of its answers.": "9 का पहाड़ा ज़ोर से बोलो और देखो हर झंडा उसके किसी उत्तर पर है।",
    "Those six answers are the multiples of 9.": "ये छह उत्तर 9 के गुणज हैं।",
    "First five multiples of 13": "13 के पहले पाँच गुणज",
    "Flag the first five multiples of 13.": "13 के पहले पाँच गुणजों पर झंडे लगाओ।",
    "How many stones long is one step of 13?": "13 का एक कदम कितने पत्थर लंबा है?",
    "Each flag sits one more step of 13 along.": "हर झंडा पिछले झंडे से 13 आगे लगा है।",
    "Next three after 33": "33 के बाद के तीन",
    "Flags already stand on 11, 22 and 33, so plant the next three multiples of 11.": "11, 22 और 33 पर झंडे पहले से हैं, इसलिए 11 के अगले तीन गुणजों पर झंडे लगाओ।",
    "How far apart are the flags that stand there already?": "पहले से लगे झंडे कितनी दूरी पर हैं?",
    "Yes, 44, 55 and 66 are the next three.": "हाँ, 44, 55 और 66 अगले तीन हैं।",
    /* phase 2 */
    "The first multiple of a number": "किसी संख्या का पहला गुणज",
    "Lay one step of 5 and see where the flag lands.": "5 का एक कदम रखो और देखो झंडा कहाँ लगता है।",
    "Press the Lay a step key at the bottom.": "नीचे वाला कदम रखो बटन दबाओ।",
    "Where does one step from the start post land?": "शुरू के खंभे से एक कदम कहाँ पड़ता है?",
    "Say it as a table line: one times the number is what?": "इसे पहाड़े की पंक्ति की तरह बोलो: एक गुणा वह संख्या क्या होता है?",
    "The first multiple is the number itself, and three steps reach the third.": "पहला गुणज वह संख्या खुद है, और तीन कदम में तीसरा मिलता है।",
    "You learned: one times a number gives its first and lowest multiple.": "तुमने सीखा: एक गुणा संख्या ही उसका पहला और सबसे छोटा गुणज है।",
    "First multiple of 23?": "23 का पहला गुणज?",
    "What is the first multiple of 23?": "23 का पहला गुणज क्या है?",
    "How many steps does it take to reach the first flag?": "पहले झंडे तक पहुँचने में कितने कदम लगते हैं?",
    "One step of 23 from the start lands on 23 itself.": "शुरू से 23 का एक कदम 23 पर ही पड़ता है।",
    "First multiple of 37?": "37 का पहला गुणज?",
    "The step block holds 37, so what is its first multiple?": "कदम के डिब्बे में 37 है, तो उसका पहला गुणज क्या है?",
    "Does the first step start at the post, or somewhere further on?": "पहला कदम खंभे से शुरू होता है, या कहीं और आगे से?",
    "Again the first flag lands on the number you started with.": "फिर पहला झंडा उसी संख्या पर लगा, जिससे तुमने शुरू किया।",
    "Lowest and third of 23": "23 का सबसे छोटा और तीसरा",
    "Which is the lowest multiple of 23, and which is its third?": "23 का सबसे छोटा गुणज कौन सा है, और तीसरा कौन सा?",
    "The lowest is one step from the start, so how many steps reach the third?": "सबसे छोटा शुरू से एक कदम पर है, तो तीसरे तक कितने कदम?",
    "Yes, 23 is the lowest and 69 is the third.": "हाँ, 23 सबसे छोटा और 69 तीसरा है।",
    "lowest": "सबसे छोटा",
    "third": "तीसरा",
    /* phase 3 */
    "Multiples that never run out": "गुणज जो कभी खत्म नहीं होते",
    "Ask the track for its last flag.": "रास्ते से उसका आखिरी झंडा माँगो।",
    "Press the Last flag key at the bottom.": "नीचे वाला आखिरी झंडा बटन दबाओ।",
    "Ask again, and watch what the track hands you.": "फिर माँगो और देखो रास्ता तुम्हें क्या देता है।",
    "Press the same key one more time.": "वही बटन एक बार और दबाओ।",
    "Lay one more step from the last flag and see what happens.": "आखिरी झंडे से एक और कदम रखो और देखो क्या होता है।",
    "Pick any flag at all and ask whether a step comes after it.": "कोई भी झंडा चुनो और पूछो कि उसके बाद कदम आता है या नहीं।",
    "Factors fit in a pen, but multiples never end, and we call them infinite.": "गुणनखंड बाड़े में आते हैं, गुणज कभी खत्म नहीं होते, यानी अनंत।",
    "You learned: after every multiple comes another; the list never ends.": "तुमने सीखा: हर गुणज के बाद एक और आता है; सूची कभी खत्म नहीं होती।",
    "Is there a last one?": "क्या कोई आखिरी है?",
    "Is there a last multiple of 11, one that nothing comes after?": "क्या 11 का कोई आखिरी गुणज है, जिसके बाद कुछ न आए?",
    "What would come after the flag at the end of the track?": "रास्ते के आखिरी झंडे के बाद क्या आएगा?",
    "Whichever flag you stop at, one more always follows it.": "तुम जिस भी झंडे पर रुको, उसके बाद एक और झंडा आता है।",
    "Yes": "हाँ",
    "No": "नहीं",
    "yes": "हाँ",
    "no": "नहीं",
    "Next multiple after 100?": "100 के बाद अगला गुणज?",
    "A child says multiples of 20 stop at 100, so which one comes next?": "एक बच्चा कहता है 20 के गुणज 100 पर रुकते हैं, तो अगला कौन सा है?",
    "Which line of the table comes after 5 times 20?": "पहाड़े में 5 गुणा 20 के बाद कौन सी पंक्ति आती है?",
    "How far apart are the flags, and where would the next one stand?": "झंडे कितनी दूर-दूर हैं, और अगला झंडा कहाँ खड़ा होगा?",
    "Say the table of 20 aloud and carry on past 100.": "20 का पहाड़ा ज़ोर से बोलो और 100 के आगे भी चलते रहो।",
    "After 100 comes another, and the track carries on past it.": "100 के बाद भी एक और आता है, और रास्ता आगे चलता रहता है।",
    "How many multiples of 51?": "51 के कितने गुणज?",
    "The pen holds the factors of 51, so how many multiples does 51 have?": "बाड़े में 51 के गुणनखंड हैं, तो 51 के कितने गुणज हैं?",
    "The pen is shut at both ends, so is the track shut anywhere?": "बाड़ा दोनों सिरों पर बंद है, तो क्या रास्ता कहीं बंद है?",
    "Yes, the multiples of 51 have no end.": "हाँ, 51 के गुणजों का कोई अंत नहीं।",
    "infinite": "अनंत",
    "no end": "कोई अंत नहीं",
    "4": "4",
    "10": "10",
    /* phase 4 */
    "Between leaves out both ends": "बीच में गिनो, दोनों सिरे छोड़ो",
    "Shade only the stretch between the two posts.": "सिर्फ़ दोनों खंभों के बीच के हिस्से में रंग भरो।",
    "Press the Shade key at the bottom.": "नीचे वाला रंग भरो बटन दबाओ।",
    "Now count the flags that stand inside the shading.": "अब रंगे हिस्से के अंदर खड़े झंडे गिनो।",
    "Tap the key that now says Count.": "जिस बटन पर अब गिनो लिखा है, उसे दबाओ।",
    "Is a flag on a post inside the band, or outside it?": "खंभे पर लगा झंडा पट्टी के अंदर है या बाहर?",
    "Touch each flag between the posts and count aloud.": "खंभों के बीच हर झंडे को छुओ और ज़ोर से गिनो।",
    "Between leaves out both ends: five of them, 33, 44, 55, 66 and 77.": "बीच में दोनों सिरे छूटते हैं: पाँच हैं, 33, 44, 55, 66 और 77।",
    "You learned: a flag on a post stays out; count what is strictly inside.": "तुमने सीखा: खंभे पर लगा झंडा बाहर रहता है; सिर्फ़ अंदर वाले गिनो।",
    "How many between 18 and 63?": "18 और 63 के बीच कितने?",
    "How many multiples of 9 lie between 18 and 63?": "18 और 63 के बीच 9 के कितने गुणज हैं?",
    "Which flags are standing on the two posts?": "दोनों खंभों पर कौन से झंडे खड़े हैं?",
    "Four of them: 27, 36, 45 and 54, and the two on the posts stay out.": "चार हैं: 27, 36, 45 और 54, और खंभों वाले दोनों बाहर रहते हैं।",
    "Multiples of 6 between 25 and 55": "25 और 55 के बीच 6 के गुणज",
    "Tap every multiple of 6 that lies between 25 and 55.": "25 और 55 के बीच 6 का हर गुणज छुओ।",
    "Which flag is the first one past the post at 25?": "25 वाले खंभे के बाद पहला झंडा कौन सा है?",
    "Neither post stands on a flag, so look at the flags between them.": "कोई भी खंभा झंडे पर नहीं है, इसलिए उनके बीच के झंडे देखो।",
    "Say each flag between the posts aloud, and tap it as you go.": "खंभों के बीच हर झंडा बोलो और साथ-साथ छूते जाओ।",
    "Those five flags are the whole list between the posts.": "ये पाँच झंडे खंभों के बीच की पूरी सूची हैं।",
    "How many between 22 and 88?": "22 और 88 के बीच कितने?",
    "Between 22 and 88, how many multiples of 11 are there?": "22 और 88 के बीच 11 के कितने गुणज हैं?",
    "Point to the first flag past 22 and the last flag before 88.": "22 के बाद का पहला और 88 से पहले का आखिरी झंडा दिखाओ।",
    "Yes, five flags stand between the posts.": "हाँ, खंभों के बीच पाँच झंडे हैं।",
    "Type a step from 1 to 60, then press Enter.": "1 से 60 तक का कदम लिखो, फिर दर्ज करें दबाओ।",
    "That is not from 1 to 60, so type a step again.": "यह 1 से 60 के बीच नहीं है, इसलिए कदम फिर से लिखो।",
    /* the working area */
    "step": "कदम",
    "inside": "अंदर",
    "no last one": "कोई आखिरी नहीं",
    "multiples of 9": "9 के गुणज",
    "multiples of 13": "13 के गुणज",
    "multiples of 11": "11 के गुणज",
    "factors of 51": "51 के गुणनखंड",
    "4 factors": "4 गुणनखंड",
    "Lay a step": "कदम रखो",
    "Last flag?": "आखिरी झंडा?",
    "Shade": "रंग भरो",
    "Count": "गिनो",
    "Step": "कदम",
    "Keep going": "आगे बढ़ो",
    "Band": "पट्टी",
    "Clear band": "पट्टी हटाओ",
  },
  gu: {
    "Multiple Track": "ગુણિતનો રસ્તો",
    "A track, one step block, and no end mark anywhere along it.": "એક રસ્તો, એક પગલાનો ડબ્બો, અને રસ્તા પર ક્યાંય અંતનું નિશાન નથી.",
    "Still running off the edge, and you never did find a last one.": "રસ્તો હજી ધારની પાર જાય છે, અને તમને છેલ્લો ઝંડો ક્યારેય ન મળ્યો.",
    "Free play. Any step size, any track length, band on or off.": "મુક્ત રમત. કોઈ પણ પગલું, કોઈ પણ લંબાઈ, પટ્ટી ચાલુ કે બંધ.",
    "What happens when you keep taking the same step?": "જ્યારે તમે એક જ પગલું ભરતા જાઓ, ત્યારે શું થાય?",
    /* phase 1 */
    "A times table read as a list": "યાદી તરીકે વાંચેલો ઘડિયો",
    "Tap the stone where the first step of 4 lands.": "જ્યાં 4 નું પહેલું પગલું પડે, તે પથ્થર અડો.",
    "Count four stones on from the start.": "શરૂઆતથી ચાર પથ્થર આગળ ગણો.",
    "Now count on another 4 and tap the stone you reach.": "હવે 4 વધુ આગળ ગણો અને જે પથ્થર પર પહોંચો તેને અડો.",
    "Count four more stones from your flag.": "તમારા ઝંડાથી ચાર પથ્થર વધુ ગણો.",
    "Which line of the table does each flag answer?": "દરેક ઝંડો ઘડિયાની કઈ લીટીનો જવાબ છે?",
    "Count the stones of one step, then count the same again from the last flag.": "એક પગલાના પથ્થર ગણો, પછી છેલ્લા ઝંડાથી એટલા જ ગણો.",
    "Three more multiples of 11 are in place: a table is a list of multiples.": "11 ના ત્રણ વધુ ગુણિત લાગ્યા: ઘડિયો ગુણિતની યાદી છે.",
    "You learned: a times table lists the multiples of its number.": "તમે શીખ્યા: ઘડિયો તેની સંખ્યાના ગુણિતની યાદી છે.",
    "First six in the table of 9": "9 ના ઘડિયાના પહેલા છ",
    "Plant a flag on each of the first six answers in the table of 9.": "9 ના ઘડિયાના પહેલા છ જવાબો પર એક-એક ઝંડો લગાવો.",
    "Say the table of 9 aloud, and check every flag sits on one of its answers.": "9 નો ઘડિયો મોટેથી બોલો અને જુઓ દરેક ઝંડો તેના કોઈ જવાબ પર છે.",
    "Those six answers are the multiples of 9.": "આ છ જવાબ 9 ના ગુણિત છે.",
    "First five multiples of 13": "13 ના પહેલા પાંચ ગુણિત",
    "Flag the first five multiples of 13.": "13 ના પહેલા પાંચ ગુણિત પર ઝંડા લગાવો.",
    "How many stones long is one step of 13?": "13 નું એક પગલું કેટલા પથ્થર લાંબું છે?",
    "Each flag sits one more step of 13 along.": "દરેક ઝંડો પાછલા ઝંડાથી 13 આગળ લાગ્યો છે.",
    "Next three after 33": "33 પછીના ત્રણ",
    "Flags already stand on 11, 22 and 33, so plant the next three multiples of 11.": "11, 22 અને 33 પર ઝંડા પહેલેથી છે, એટલે 11 ના પછીના ત્રણ ગુણિત પર ઝંડા લગાવો.",
    "How far apart are the flags that stand there already?": "પહેલેથી લાગેલા ઝંડા કેટલા અંતરે છે?",
    "Yes, 44, 55 and 66 are the next three.": "હા, 44, 55 અને 66 પછીના ત્રણ છે.",
    /* phase 2 */
    "The first multiple of a number": "કોઈ સંખ્યાનો પહેલો ગુણિત",
    "Lay one step of 5 and see where the flag lands.": "5 નું એક પગલું મૂકો અને જુઓ ઝંડો ક્યાં લાગે છે.",
    "Press the Lay a step key at the bottom.": "નીચેનું પગલું મૂકો બટન દબાવો.",
    "Where does one step from the start post land?": "શરૂઆતના થાંભલાથી એક પગલું ક્યાં પડે છે?",
    "Say it as a table line: one times the number is what?": "તેને ઘડિયાની લીટીની જેમ બોલો: એક ગુણ્યા તે સંખ્યા કેટલા થાય?",
    "The first multiple is the number itself, and three steps reach the third.": "પહેલો ગુણિત તે સંખ્યા પોતે છે, અને ત્રણ પગલે ત્રીજો મળે છે.",
    "You learned: one times a number gives its first and lowest multiple.": "તમે શીખ્યા: એક ગુણ્યા સંખ્યા તેનો પહેલો અને સૌથી નાનો ગુણિત છે.",
    "First multiple of 23?": "23 નો પહેલો ગુણિત?",
    "What is the first multiple of 23?": "23 નો પહેલો ગુણિત કયો છે?",
    "How many steps does it take to reach the first flag?": "પહેલા ઝંડા સુધી પહોંચવા કેટલાં પગલાં લાગે છે?",
    "One step of 23 from the start lands on 23 itself.": "શરૂઆતથી 23 નું એક પગલું 23 પર જ પડે છે.",
    "First multiple of 37?": "37 નો પહેલો ગુણિત?",
    "The step block holds 37, so what is its first multiple?": "પગલાના ડબ્બામાં 37 છે, તો તેનો પહેલો ગુણિત કયો છે?",
    "Does the first step start at the post, or somewhere further on?": "પહેલું પગલું થાંભલાથી શરૂ થાય છે, કે ક્યાંક આગળથી?",
    "Again the first flag lands on the number you started with.": "ફરી પહેલો ઝંડો એ જ સંખ્યા પર લાગ્યો, જેનાથી તમે શરૂ કર્યું.",
    "Lowest and third of 23": "23 નો સૌથી નાનો અને ત્રીજો",
    "Which is the lowest multiple of 23, and which is its third?": "23 નો સૌથી નાનો ગુણિત કયો છે, અને ત્રીજો કયો?",
    "The lowest is one step from the start, so how many steps reach the third?": "સૌથી નાનો શરૂઆતથી એક પગલે છે, તો ત્રીજા સુધી કેટલાં પગલાં?",
    "Yes, 23 is the lowest and 69 is the third.": "હા, 23 સૌથી નાનો અને 69 ત્રીજો છે.",
    "lowest": "સૌથી નાનો",
    "third": "ત્રીજો",
    /* phase 3 */
    "Multiples that never run out": "ગુણિત જે ક્યારેય ખૂટતા નથી",
    "Ask the track for its last flag.": "રસ્તા પાસે તેનો છેલ્લો ઝંડો માગો.",
    "Press the Last flag key at the bottom.": "નીચેનું છેલ્લો ઝંડો બટન દબાવો.",
    "Ask again, and watch what the track hands you.": "ફરી માગો અને જુઓ રસ્તો તમને શું આપે છે.",
    "Press the same key one more time.": "એ જ બટન ફરી એક વાર દબાવો.",
    "Lay one more step from the last flag and see what happens.": "છેલ્લા ઝંડાથી એક વધુ પગલું મૂકો અને જુઓ શું થાય છે.",
    "Pick any flag at all and ask whether a step comes after it.": "કોઈ પણ ઝંડો પસંદ કરો અને પૂછો કે તેના પછી પગલું આવે છે કે નહીં.",
    "Factors fit in a pen, but multiples never end, and we call them infinite.": "અવયવ વાડામાં સમાય છે, ગુણિત ક્યારેય પૂરા થતા નથી, એટલે અનંત.",
    "You learned: after every multiple comes another; the list never ends.": "તમે શીખ્યા: દરેક ગુણિત પછી બીજો આવે છે; યાદી ક્યારેય પૂરી થતી નથી.",
    "Is there a last one?": "શું કોઈ છેલ્લો છે?",
    "Is there a last multiple of 11, one that nothing comes after?": "શું 11 નો કોઈ છેલ્લો ગુણિત છે, જેના પછી કંઈ ન આવે?",
    "What would come after the flag at the end of the track?": "રસ્તાના છેલ્લા ઝંડા પછી શું આવશે?",
    "Whichever flag you stop at, one more always follows it.": "તમે જે પણ ઝંડા પર અટકો, તેના પછી એક વધુ ઝંડો આવે છે.",
    "Yes": "હા",
    "No": "ના",
    "yes": "હા",
    "no": "ના",
    "Next multiple after 100?": "100 પછીનો ગુણિત?",
    "A child says multiples of 20 stop at 100, so which one comes next?": "એક બાળક કહે છે 20 ના ગુણિત 100 પર અટકે છે, તો પછીનો કયો છે?",
    "Which line of the table comes after 5 times 20?": "ઘડિયામાં 5 ગુણ્યા 20 પછી કઈ લીટી આવે છે?",
    "How far apart are the flags, and where would the next one stand?": "ઝંડા કેટલા દૂર-દૂર છે, અને પછીનો ઝંડો ક્યાં ઊભો રહેશે?",
    "Say the table of 20 aloud and carry on past 100.": "20 નો ઘડિયો મોટેથી બોલો અને 100 થી આગળ પણ ચાલુ રાખો.",
    "After 100 comes another, and the track carries on past it.": "100 પછી પણ એક વધુ આવે છે, અને રસ્તો આગળ ચાલતો રહે છે.",
    "How many multiples of 51?": "51 ના કેટલા ગુણિત?",
    "The pen holds the factors of 51, so how many multiples does 51 have?": "વાડામાં 51 ના અવયવ છે, તો 51 ના કેટલા ગુણિત છે?",
    "The pen is shut at both ends, so is the track shut anywhere?": "વાડો બંને છેડે બંધ છે, તો શું રસ્તો ક્યાંય બંધ છે?",
    "Yes, the multiples of 51 have no end.": "હા, 51 ના ગુણિતનો કોઈ અંત નથી.",
    "infinite": "અનંત",
    "no end": "કોઈ અંત નથી",
    "4": "4",
    "10": "10",
    /* phase 4 */
    "Between leaves out both ends": "વચ્ચેના ગણો, બંને છેડા છોડો",
    "Shade only the stretch between the two posts.": "ફક્ત બંને થાંભલા વચ્ચેના ભાગમાં રંગ પૂરો.",
    "Press the Shade key at the bottom.": "નીચેનું રંગ પૂરો બટન દબાવો.",
    "Now count the flags that stand inside the shading.": "હવે રંગેલા ભાગની અંદર ઊભેલા ઝંડા ગણો.",
    "Tap the key that now says Count.": "જે બટન પર હવે ગણો લખ્યું છે, તે દબાવો.",
    "Is a flag on a post inside the band, or outside it?": "થાંભલા પરનો ઝંડો પટ્ટીની અંદર છે કે બહાર?",
    "Touch each flag between the posts and count aloud.": "થાંભલા વચ્ચેના દરેક ઝંડાને અડો અને મોટેથી ગણો.",
    "Between leaves out both ends: five of them, 33, 44, 55, 66 and 77.": "વચ્ચે છેડા છૂટે છે: પાંચ છે, 33, 44, 55, 66 અને 77.",
    "You learned: a flag on a post stays out; count what is strictly inside.": "તમે શીખ્યા: થાંભલા પરનો ઝંડો બહાર રહે છે; ફક્ત અંદરના જ ગણો.",
    "How many between 18 and 63?": "18 અને 63 વચ્ચે કેટલા?",
    "How many multiples of 9 lie between 18 and 63?": "18 અને 63 વચ્ચે 9 ના કેટલા ગુણિત છે?",
    "Which flags are standing on the two posts?": "બંને થાંભલા પર કયા ઝંડા ઊભા છે?",
    "Four of them: 27, 36, 45 and 54, and the two on the posts stay out.": "ચાર છે: 27, 36, 45 અને 54, અને થાંભલા પરના બંને બહાર રહે છે.",
    "Multiples of 6 between 25 and 55": "25 અને 55 વચ્ચે 6 ના ગુણિત",
    "Tap every multiple of 6 that lies between 25 and 55.": "25 અને 55 વચ્ચેનો 6 નો દરેક ગુણિત અડો.",
    "Which flag is the first one past the post at 25?": "25 વાળા થાંભલા પછી પહેલો ઝંડો કયો છે?",
    "Neither post stands on a flag, so look at the flags between them.": "કોઈ થાંભલો ઝંડા પર નથી, એટલે તેમની વચ્ચેના ઝંડા જુઓ.",
    "Say each flag between the posts aloud, and tap it as you go.": "થાંભલા વચ્ચેનો દરેક ઝંડો બોલો અને સાથે સાથે અડતા જાઓ.",
    "Those five flags are the whole list between the posts.": "આ પાંચ ઝંડા થાંભલા વચ્ચેની આખી યાદી છે.",
    "How many between 22 and 88?": "22 અને 88 વચ્ચે કેટલા?",
    "Between 22 and 88, how many multiples of 11 are there?": "22 અને 88 વચ્ચે 11 ના કેટલા ગુણિત છે?",
    "Point to the first flag past 22 and the last flag before 88.": "22 પછીનો પહેલો અને 88 પહેલાંનો છેલ્લો ઝંડો બતાવો.",
    "Yes, five flags stand between the posts.": "હા, થાંભલા વચ્ચે પાંચ ઝંડા છે.",
    "Type a step from 1 to 60, then press Enter.": "1 થી 60 સુધીનું પગલું લખો, પછી દાખલ કરો દબાવો.",
    "That is not from 1 to 60, so type a step again.": "આ 1 થી 60 વચ્ચે નથી, એટલે પગલું ફરી લખો.",
    /* the working area */
    "step": "પગલું",
    "inside": "અંદર",
    "no last one": "કોઈ છેલ્લો નથી",
    "multiples of 9": "9 ના ગુણિત",
    "multiples of 13": "13 ના ગુણિત",
    "multiples of 11": "11 ના ગુણિત",
    "factors of 51": "51 ના અવયવ",
    "4 factors": "4 અવયવ",
    "Lay a step": "પગલું મૂકો",
    "Last flag?": "છેલ્લો ઝંડો?",
    "Shade": "રંગ પૂરો",
    "Count": "ગણો",
    "Step": "પગલું",
    "Keep going": "આગળ વધો",
    "Band": "પટ્ટી",
    "Clear band": "પટ્ટી હટાવો",
  },
};

/* One entry per phase = one mount. Every phase opens on a warm-up of guide steps (a number of its own that no question uses),
   then three questions.
   Item kinds (the Work, judge and oracle switch on them):
     plant       tap the stones where the steps land (a list, Enter sends it)      s, n, given
     first       type where the first step lands                                  s, sp
     lowthird    two boxes: the lowest and the third multiple                     s, sp
     last        yes or no: is there a last flag? (the "Last flag?" key lays the next)   s, sp, laid
     next        type the multiple after the last flag                            s, sp, laid
     howmany     the pen of factors beside the track: how many multiples?         s, sp, laid, pen
     between     type how many flags stand strictly inside the band               s, sp, laid, lo, hi
     betweenList tap every flag strictly inside the band (a list, Enter sends it)
   near = the item's misconception (judge rejects it); win = the one sentence said at the right answer. */
const PHASES = [
  {
    n: 1,
    concept: "A times table read as a list",
    conceptId: "M1.S2.T4.C15", objectiveIds: ["O5"],
    says: ["Look at the answers in the table. What are you really looking at?"],
    steps: [
      { say: "Tap the stone where the first step of 4 lands.", on: "stone", hint: "Count four stones on from the start." },
      { say: "Now count on another 4 and tap the stone you reach.", on: "stone", hint: "Count four more stones from your flag." },
    ],
    stepHold: 2000,
    ladder: ["Which line of the table does each flag answer?", "Count the stones of one step, then count the same again from the last flag."],
    closing: "Three more multiples of 11 are in place: a table is a list of multiples.",
    learned: "You learned: a times table lists the multiples of its number.",
    traceback: "The steps are laid again from the start, one table line at a time: each landing lights, and the table strip fills with the right answers.",
    items: [
      /* learn ML1: answer in the plan = 9, 18, 27, 36, 45 and 54, and they are the multiples of 9 ("What is that list called?" is named by the win) */
      { qid: "M1.S2.T4.C15:ML1", kind: "plant", s: 9, n: 6, given: 0, answer: [9, 18, 27, 36, 45, 54], near: [1, 9, 18, 27, 36, 45], pad: "enter", winMs: 3000,
        ask: "First six in the table of 9", say: "Plant a flag on each of the first six answers in the table of 9.",
        miss: "Say the table of 9 aloud, and check every flag sits on one of its answers.",
        win: "Those six answers are the multiples of 9." },
      /* practice 1: answer in the plan = 13, 26, 39, 52 and 65 */
      { qid: "M1.S2.T4.C15:1", kind: "plant", s: 13, n: 5, given: 0, answer: [13, 26, 39, 52, 65], near: [1, 13], pad: "enter", winMs: 2800,
        ask: "First five multiples of 13", say: "Flag the first five multiples of 13.",
        miss: "How many stones long is one step of 13?",
        win: "Each flag sits one more step of 13 along." },
      /* practice 3: answer in the plan = 44, 55 and 66 (11, 22 and 33 stand on the chart already) */
      { qid: "M1.S2.T4.C15:3", kind: "plant", s: 11, n: 6, given: 3, answer: [44, 55, 66], near: [1], pad: "enter", winMs: 3000,
        ask: "Next three after 33", say: "Flags already stand on 11, 22 and 33, so plant the next three multiples of 11.",
        miss: "How far apart are the flags that stand there already?",
        win: "Yes, 44, 55 and 66 are the next three." },
    ],
  },
  {
    n: 2,
    concept: "The first multiple of a number",
    conceptId: "M1.S2.T4.C16", objectiveIds: ["O5"],
    says: ["Lay one step only. Which number are you standing on now?"],
    steps: [
      { say: "Lay one step of 5 and see where the flag lands.", on: "lay", hint: "Press the Lay a step key at the bottom." },
    ],
    stepHold: 2200,
    ladder: ["Where does one step from the start post land?", "Say it as a table line: one times the number is what?"],
    closing: "The first multiple is the number itself, and three steps reach the third.",
    learned: "You learned: one times a number gives its first and lowest multiple.",
    traceback: "The child's number stays marked under the track; one step is laid from the start post and its flag lands on the number itself, with 1 × the number written above it.",
    items: [
      /* learn ML2: answer in the plan = 23 itself, because 1 times 23 is 23 */
      { qid: "M1.S2.T4.C16:ML2", kind: "first", s: 23, sp: 230, answer: 23, near: 46, winMs: 2400,
        ask: "First multiple of 23?", say: "What is the first multiple of 23?",
        miss: "How many steps does it take to reach the first flag?",
        win: "One step of 23 from the start lands on 23 itself." },
      /* practice 2: answer in the plan = 37 itself */
      { qid: "M1.S2.T4.C16:2", kind: "first", s: 37, sp: 230, answer: 37, near: 74, winMs: 2400,
        ask: "First multiple of 37?", say: "The step block holds 37, so what is its first multiple?",
        miss: "Does the first step start at the post, or somewhere further on?",
        win: "Again the first flag lands on the number you started with." },
      /* practice 4: answer in the plan = 23 is the lowest, and the third is 69 (two boxes) */
      { qid: "M1.S2.T4.C16:4", kind: "lowthird", s: 23, sp: 230, answer: [23, 69], near: [1, 69],
        parts: [{ label: "lowest" }, { label: "third" }], winMs: 3000,
        ask: "Lowest and third of 23", say: "Which is the lowest multiple of 23, and which is its third?",
        miss: "The lowest is one step from the start, so how many steps reach the third?",
        win: "Yes, 23 is the lowest and 69 is the third." },
    ],
  },
  {
    n: 3,
    concept: "Multiples that never run out",
    conceptId: "M1.S2.T4.C17", objectiveIds: ["O6"],
    says: ["Show me the last one. Can you? What happens every time you try?"],
    steps: [
      { say: "Ask the track for its last flag.", on: "last", hint: "Press the Last flag key at the bottom." },
      { say: "Ask again, and watch what the track hands you.", on: "last", hint: "Press the same key one more time." },
    ],
    stepHold: 2400,
    ladder: ["Lay one more step from the last flag and see what happens.", "Pick any flag at all and ask whether a step comes after it."],
    closing: "Factors fit in a pen, but multiples never end, and we call them infinite.",
    learned: "You learned: after every multiple comes another; the list never ends.",
    traceback: "The flag where the child stopped keeps its ring while the track lays step after step past it, each as long as the first, and scrolls on with the edge still empty.",
    items: [
      /* learn ML3: answer in the plan = No. There is no last one */
      { qid: "M1.S2.T4.C17:ML3", kind: "last", s: 11, sp: 92, laid: 8, answer: "no", near: "yes", winMs: 3400,
        choices: [{ id: "yes", label: "Yes" }, { id: "no", label: "No" }], ask: "Is there a last one?",
        say: "Is there a last multiple of 11, one that nothing comes after?",
        miss: "What would come after the flag at the end of the track?",
        win: "Whichever flag you stop at, one more always follows it." },
      /* practice 5: answer in the plan = They do not stop. 20 times 6 is 120, and there is always a next one.
         A "what would you tell" question, made checkable: the multiple after 100 is the reply. */
      { qid: "M1.S2.T4.C17:5", kind: "next", s: 20, sp: 150, laid: 5, answer: 120, near: 100, winMs: 3200, ask: "Next multiple after 100?",
        say: "A child says multiples of 20 stop at 100, so which one comes next?",
        miss: "Which line of the table comes after 5 times 20?",
        ladder: ["How far apart are the flags, and where would the next one stand?", "Say the table of 20 aloud and carry on past 100."],
        win: "After 100 comes another, and the track carries on past it." },
      /* practice 7: answer in the plan = Four factors, 1, 3, 17 and 51, and its multiples never run out.
         The pen shows the four factors; the question asks the multiples' half, in the book's word (infinite). */
      { qid: "M1.S2.T4.C17:7", kind: "howmany", s: 51, sp: 170, laid: 4, pen: [1, 3, 17, 51], answer: "infinite", near: "4", winMs: 3400,
        choices: [{ id: "4", label: "4" }, { id: "10", label: "10" }, { id: "infinite", label: "no end" }], ask: "How many multiples of 51?",
        say: "The pen holds the factors of 51, so how many multiples does 51 have?",
        miss: "The pen is shut at both ends, so is the track shut anywhere?",
        win: "Yes, the multiples of 51 have no end." },
    ],
  },
  {
    n: 4,
    concept: "Between leaves out both ends",
    conceptId: "M1.S2.T4.C18", objectiveIds: ["O6"],
    says: ["Count only what is inside the band. What about the two on the posts?"],
    steps: [
      { say: "Shade only the stretch between the two posts.", on: "shade", hint: "Press the Shade key at the bottom." },
      { say: "Now count the flags that stand inside the shading.", on: "count", hint: "Tap the key that now says Count." },
    ],
    stepHold: 2400,
    ladder: ["Is a flag on a post inside the band, or outside it?", "Touch each flag between the posts and count aloud."],
    closing: "Between leaves out both ends: five of them, 33, 44, 55, 66 and 77.",
    learned: "You learned: a flag on a post stays out; count what is strictly inside.",
    traceback: "Only the stretch strictly inside the posts is shaded, stopping short of each post; the flags on the posts stay at full strength outside it, and the flags inside are counted one by one.",
    items: [
      /* learn ML4: answer in the plan = Four of them: 27, 36, 45 and 54. The count first (the plan's teaching note) */
      { qid: "M1.S2.T4.C18:ML4", kind: "between", s: 9, sp: 92, laid: 8, lo: 18, hi: 63, answer: 4, near: 6, winMs: 3000,
        ask: "How many between 18 and 63?", say: "How many multiples of 9 lie between 18 and 63?",
        miss: "Which flags are standing on the two posts?",
        win: "Four of them: 27, 36, 45 and 54, and the two on the posts stay out." },
      /* practice 6: answer in the plan = 30, 36, 42, 48 and 54 (a list: tap the flags, then Enter) */
      { qid: "M1.S2.T4.C18:6", kind: "betweenList", s: 6, sp: 90, laid: 10, lo: 25, hi: 55, answer: [30, 36, 42, 48, 54],
        near: [24, 30, 36, 42, 48, 54, 60], pad: "enter", winMs: 3000,
        ask: "Multiples of 6 between 25 and 55", say: "Tap every multiple of 6 that lies between 25 and 55.",
        miss: "Which flag is the first one past the post at 25?",
        ladder: ["Neither post stands on a flag, so look at the flags between them.", "Say each flag between the posts aloud, and tap it as you go."],
        win: "Those five flags are the whole list between the posts." },
      /* practice 8: answer in the plan = Five of them: 33, 44, 55, 66 and 77; the two ends are left out */
      { qid: "M1.S2.T4.C18:8", kind: "between", s: 11, sp: 90, laid: 8, lo: 22, hi: 88, answer: 5, near: 7, winMs: 3000,
        ask: "How many between 22 and 88?", say: "Between 22 and 88, how many multiples of 11 are there?",
        miss: "Point to the first flag past 22 and the last flag before 88.",
        win: "Yes, five flags stand between the posts." },
    ],
  },
];

/* each phase opens on a warm-up (its guide steps): a number of its own that no question of the phase uses */
const MT_WARM: any = {
  1: { kind: "plant", s: 4, n: 3, given: 0, warm: true },
  2: { kind: "first", s: 5, sp: 230, warm: true },
  3: { kind: "last", s: 3, sp: 150, laid: 2, warm: true },
  4: { kind: "between", s: 3, sp: 120, laid: 6, lo: 6, hi: 18, warm: true },
};
/* free play: any step, laid as far as the child likes, the band on or off */
const MT_FREE = { kind: "free", s: 7, sp: 140 };

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  track: { ruleY: MT_RULE, startPost: MT_X0, chart: { cols: MT_COLS, rows: 4 }, runsOffTheRightEdge: true },
  colours: { multiple: MTG, factor: MTB, step: MTA },
  items: PHASES.map((p: any) => p.items.map((it: any) => ({ qid: it.qid, kind: it.kind, step: it.s, laid: it.laid || 0,
    band: it.lo !== undefined ? [it.lo, it.hi] : null, pen: it.pen || null }))),
};

/* each entry opens on its own scene */
const mtScene = (it: any) => {
  const base: any = {
    s: it.s || 1, sp: it.sp || 140, laid: 0, ghostTo: 0, labels: false, given: [] as number[], list: [] as number[], rows: 0,
    lit: [] as number[], ringed: [] as number[], pins: [] as number[], band: null as any, shaded: false, shadeF: 0, counted: 0,
    note: null as any, penLit: 0, penDone: false, touched: false, typing: null as any,
  };
  const k = it.kind;
  if (k === "plant") return { ...base, given: Array.from({ length: it.given || 0 }, (_: any, i: number) => (i + 1) * it.s) };
  if (k === "first") return { ...base, ghostTo: 1, labels: !!it.warm };
  if (k === "lowthird") return { ...base, ghostTo: 3 };
  if (k === "last" || k === "howmany") return { ...base, laid: it.laid, labels: !!it.warm };
  if (k === "next") return { ...base, laid: it.laid, ghostTo: it.laid + 1, labels: true };
  if (k === "between" || k === "betweenList") return { ...base, laid: it.laid, band: { lo: it.lo, hi: it.hi }, labels: !!it.warm };
  if (k === "free") return { ...base, labels: true };
  return base;
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a list is right in any order; two boxes by the runtime; a word choice by its id or label */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (mtIsList(item)) return mtSame(mtNums(v), item.answer);
  if (item.choices) {
    const s = String(v ?? "").trim().toLowerCase();
    const c = item.choices.find((x: any) => x.id === String(item.answer));
    return s === String(item.answer).toLowerCase() || (!!c && s === String(c.label).toLowerCase());
  }
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer counted out again (search and repeated adding), sharing no code with judge or Work */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const s = it.s;
  if (it.kind === "plant") {
    const out: number[] = [];
    let at = 0;
    for (let k = 0; k < it.n; k++) { at += s; if (k >= (it.given || 0)) out.push(at); }
    return JSON.stringify(out) === JSON.stringify(it.answer);
  }
  if (it.kind === "first") { let m = 1; while (m % s !== 0) m++; return m === it.answer; }
  if (it.kind === "lowthird") {
    const found: number[] = [];
    for (let m = 1; found.length < 3; m++) if (m % s === 0) found.push(m);
    return found[0] === it.answer[0] && found[2] === it.answer[1];
  }
  if (it.kind === "last") { const top = s * it.laid; return it.answer === "no" && (top + s) % s === 0 && top + s > top; }
  if (it.kind === "next") { let m = s * it.laid + 1; while (m % s !== 0) m++; return m === it.answer; }
  if (it.kind === "howmany") {
    const f: number[] = [];
    for (let d = 1; d <= s; d++) if (s % d === 0) f.push(d);
    return JSON.stringify(f) === JSON.stringify(it.pen) && it.answer === "infinite" && String(f.length) === it.near;
  }
  if (it.kind === "between" || it.kind === "betweenList") {
    const f: number[] = [];
    for (let m = it.lo + 1; m < it.hi; m++) if (m % s === 0) f.push(m);
    return it.kind === "between" ? f.length === it.answer : JSON.stringify(f) === JSON.stringify(it.answer);
  }
  return false;
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => (item.parts ? item.near.join("|") : item.near);
/* the forms of an answer that no question, hint or ladder line may print */
const mtForms = (x: number) => [String(x), indian(x), words(x)];
const answerForms = (item: any) => {
  if (item.kind === "first") return []; /* the answer IS the question's own number: that is the book's point */
  if (item.kind === "plant") return item.answer.filter((x: number) => x !== item.s).flatMap(mtForms); /* the step is named in the question */
  if (item.kind === "lowthird") return mtForms(item.answer[1]); /* the lowest is the question's own number */
  if (mtIsList(item)) return item.answer.flatMap(mtForms);
  if (typeof item.answer === "number") return mtForms(item.answer);
  return [String(item.answer)];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it; a list is written out
   with commas and spaces, so the keyboard drive never mistakes it for two boxes to type */
const agentKey = (item: any) => (mtIsList(item) ? item.answer.join(", ") : item.answer);

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (T.state().stage === "demo") return HOOK.demo && HOOK.demo();
  if (mtIsList(item)) { if (HOOK.set) HOOK.set(item.answer); return T.submit(mtListText(item.answer)); }
  return T.submit(item.answer);
};
/* the agent's answer() for a list: plant (or mark) those flags as a child would; Enter then sends them */
const answer = (item: any, v: any) => {
  if (!mtIsList(item)) return undefined;
  const xs = mtNums(v);
  if (!xs.length || !HOOK.set) return false;
  HOOK.set(xs);
  return true;
};
/* the agent's check(): in a guide step it must return undefined so the agent's check() reaches api.onEnter; Enter sends what is on the picture */
const check = () => undefined;

const MT_CSS = `
.mt-slide{transition:transform 440ms cubic-bezier(.3,.7,.25,1)}
.mt-draw{stroke-dasharray:1;stroke-dashoffset:1;animation:mtDraw 460ms ease-out forwards}
@keyframes mtDraw{to{stroke-dashoffset:0}}
.mt-pop{animation:mtPop 320ms ease-out both}
@keyframes mtPop{from{opacity:0;transform:translateY(-14px)}to{opacity:1;transform:none}}
.mt-grab{cursor:grab}
@media (prefers-reduced-motion:reduce){.mt-slide{transition:none}.mt-draw,.mt-pop{animation:none}.mt-draw{stroke-dashoffset:0}}
`;

/* ── the working area: 1472 x 520 with the answer panel shut, 900 x 520 with it open (bigPad), origin at its top-left ──
   keyOnly: nothing under box.key (the key's corner, top right). A track is laid out for the narrow width and the rule runs on to the
   frame's right edge, so the picture only slides along when the panel arrives. Every act is performed on screen (api.act). */
function Work({ phase, n, item, index, stage, wrong, typed, captured, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const bw: number = box && box.w ? box.w : MT_TW;
  const free = stage === "free";
  const demo = !free && (stage === "demo" || stage === "teach") && !!MT_WARM[n];
  const it: any = free ? MT_FREE : demo ? MT_WARM[n] : item || {};
  const kind: string = it.kind;
  /* a sparse scene (a few wide steps) is drawn bigger, and a scene with no band sits lower on the area (these shadow the module constants) */
  const big = (it.sp || 0) >= 150;
  const huge = (it.sp || 0) >= 200;
  const MT_RULE = kind === "between" || kind === "betweenList" || free ? 315 : 376;
  const MT_FTOP = MT_RULE - (huge ? 200 : big ? 154 : 130);
  const fs = mtFs(it);
  const qk = free ? "free" : demo ? "w" + n : "q" + n + "." + index;
  /* the board is keyed to the ENTRY (PATTERNS §18): a fresh one on every new question, never on a keypad opening */
  const entry = useRef<any>({ qk: "", n: 0, acted: false });
  if (entry.current.qk !== qk) entry.current = { qk, n: entry.current.n + 1, acted: false };
  const ek = qk + "#" + entry.current.n;
  const curEk = useRef(ek);
  curEk.current = ek;
  const [raw, setRaw] = useState<any>(() => ({ ek, ...mtScene(it) }));
  const S: any = raw.ek === ek ? raw : { ek, ...mtScene(it) };
  const SR = useRef<any>(S);
  SR.current = S;
  const bwRef = useRef(bw);
  bwRef.current = bw;
  const up = (p: any) => setRaw((o: any) => {
    if (curEk.current !== ek) return o;
    const b = o.ek === ek ? o : { ek, ...mtScene(it) };
    return { ...b, ...(typeof p === "function" ? p(b) : p) };
  });
  const playRef = useRef(false);
  const [acting, setActing] = useState(false);
  const lastKey = useRef(0);
  const lockedRef = useRef(false);
  const lock = (b: boolean) => { lockedRef.current = b; api.lock(b); };
  const typedRef = useRef<string | null>(null);
  typedRef.current = S.typing;
  /* a new entry stops whatever the old one was doing, and gives the pad back */
  useEffect(() => () => {
    tl.stop(); playRef.current = false;
    if (lockedRef.current) { lockedRef.current = false; api.lock(false); }
  }, [ek]);
  useEffect(() => { if (!captured && typedRef.current !== null) { up({ typing: null }); api.say(FREE_LINE); } }, [captured]);

  /* ── the geometry of the track ── */
  const s: number = S.s;
  const top = Math.max(S.laid, S.ghostTo);
  /* the pitch widens for a long number (flags never touch), and a track that outgrows the frame scrolls to start right of the step block */
  const geoFor = (o: any, kk?: number) => {
    const t = Math.max(kk === undefined ? o.laid : kk, o.ghostTo);
    const p = mtPitch(o.sp, fs, Math.max(t, 1) * o.s);
    return { p, ...mtTrack(free ? Math.min(bwRef.current, MT_TW) : bwRef.current, p, t) };
  };
  const sp: number = mtPitch(S.sp, fs, Math.max(top, 1) * s);
  /* free play lays its track out for the keypad-open width always, so opening the keypad never scrolls it or moves a post */
  const { shift, off, slots } = mtTrack(free ? Math.min(bw, MT_TW) : bw, sp, top);
  const X = (k: number) => MT_X0 + k * sp;                  /* the k-th flag, before the track scrolls */
  const vx = (v: number) => MT_X0 + (v / s) * sp;           /* any number on the track */
  /* free play: a post rests only on a flag that is laid and in the frame, so "n inside" is always true to the picture */
  const clampBand = (b: any, sh: number, L: number, ss: number) => {
    const lo = Math.max(Math.max(1, sh) * ss, Math.min(b.lo, (L - 1) * ss));
    return { lo, hi: Math.max(lo + ss, Math.min(b.hi, L * ss)) };
  };
  const bandE: any = S.band && free ? clampBand(S.band, shift, S.laid, s) : S.band;
  const insideKs: number[] = [];
  if (bandE) for (let k = 1; k <= S.laid; k++) if (k * s > bandE.lo && k * s < bandE.hi) insideKs.push(k);
  const countedKs: number[] = S.shaded ? insideKs.slice(0, S.counted) : free && bandE ? insideKs : [];
  const busy = tl.busy || acting;
  /* phase 1's chart of stones: 17 a row (67 stones) when the room is wide; 10 a row (70 stones, the step block beside them) when a host keeps the
     keypad open and the table strip is given up. A start post "0" stands left of stone 1 in both. */
  const narrow = !!(box && box.open);
  const G = narrow ? { cols: 10, n: 70, x0: 60, pw: 74, ph: 74, cw: 72, chh: 72, y0: 4 } : { cols: MT_COLS, n: MT_N, x0: MT_CX0, pw: MT_CW, ph: MT_CH, cw: MT_CW - 2, chh: MT_CH - 6, y0: MT_Y0 };
  const gpos = (v: number) => ({ x: G.x0 + ((v - 1) % G.cols) * G.pw, y: G.y0 + Math.floor((v - 1) / G.cols) * G.ph });
  const listKind = kind === "plant" || kind === "betweenList";

  /* ── acts: each is done on screen by a real tool (api.act), then the picture changes ── */
  const finish = (name: string | null) => { playRef.current = false; setActing(false); if (name && stepOn) api.did(name); };
  /* lay `cnt` steps: the hand pushes along the rule and each flag goes down as it passes */
  const lay = (cnt: number, name: string | null) => {
    if (playRef.current || tl.busy) return;
    const o = SR.current;
    const k0 = o.laid, kN = k0 + cnt;
    const g = geoFor(o, kN);
    const xAt = (k: number) => MT_X0 + k * g.p - g.off;
    const y = MT_RULE - 40;
    playRef.current = true; setActing(true);
    up({ touched: true });
    const pts = cnt === 1 ? [{ x: Math.max(40, xAt(kN)), y }]
      : Array.from({ length: cnt }, (_: any, i: number) => ({ x: MT_X0 + 120 + i * ((Math.min(bwRef.current, MT_TW) - MT_X0 - 280) / Math.max(1, cnt - 1)), y }));
    const o2: any = { tool: "hand", moves: cnt === 1 ? "push" : "sweep", at: pts, onPoint: (i: number) => { up((q: any) => ({ laid: Math.max(q.laid, k0 + (cnt === 1 ? 1 : i + 1)) })); api.sfx.tick(); } };
    if (cnt === 1) o2.from = { x: Math.max(24, xAt(k0)), y };
    api.act(o2).then((ok: boolean) => { if (ok) { api.sfx.settle(); finish(name); } else { playRef.current = false; setActing(false); } });
  };
  /* shade only the stretch strictly inside the posts, the pencil moving along it */
  const shadeSpan = () => {
    const o = SR.current;
    if (!o.band) return null;
    const gap = (pv: number) => (pv % o.s === 0 ? 30 : 6);
    const a = vx(o.band.lo) + gap(o.band.lo) - off, b = vx(o.band.hi) - gap(o.band.hi) - off;
    return { a, b };
  };
  const shadeAct = () => {
    if (playRef.current || tl.busy) return;
    const sh = shadeSpan();
    if (!sh || SR.current.shaded) return;
    const y = MT_RULE + 72, N = 6;
    const pts = Array.from({ length: N }, (_: any, i: number) => ({ x: sh.a + ((sh.b - sh.a) * (i + 0.5)) / N, y }));
    playRef.current = true; setActing(true);
    up({ touched: true });
    api.act({ tool: "pencil", moves: "draw", from: { x: sh.a, y }, at: pts, to: { x: sh.b, y }, onPoint: (i: number) => up({ shadeF: (i + 1) / N }) })
      .then((ok: boolean) => { if (ok) { up({ shaded: true, shadeF: 1, counted: 0 }); api.sfx.settle(); finish("shade"); } else { playRef.current = false; setActing(false); } });
  };
  /* count the flags inside: the hand taps each one in turn and the number climbs */
  const countAct = () => {
    if (playRef.current || tl.busy) return;
    const o = SR.current;
    const ks = insideKs;
    if (!o.shaded || !ks.length) return;
    const pts = ks.map((k) => { const g = mtFlagGeo(X(k) - off, k * o.s, fs, MT_FTOP, MT_RULE); return { x: g.cx, y: g.cy }; });
    playRef.current = true; setActing(true);
    up({ touched: true, counted: 0 });
    api.act({ tool: "hand", moves: "tap", at: pts, onPoint: (i: number) => { up({ counted: i + 1 }); api.sfx.tick(); } })
      .then((ok: boolean) => { if (ok) { api.sfx.settle(); finish("count"); } else { playRef.current = false; setActing(false); } });
  };
  /* free play: the band goes on (the hand drops the two posts) or off (the eraser rubs it out) */
  const bandAct = () => {
    if (playRef.current || tl.busy) return;
    const o = SR.current;
    const g = geoFor(o);
    const px = (v: number) => MT_X0 + (v / o.s) * g.p - g.off;
    const y = MT_RULE + 70;
    if (!o.band && o.laid < 2) return;                       /* a post rests on a laid flag: two flags are needed */
    playRef.current = true; setActing(true);
    up({ touched: true });
    if (o.band) {
      const B = clampBand(o.band, g.shift, o.laid, o.s), a = px(B.lo), b = px(B.hi);
      api.act({ tool: "eraser", moves: "rub", at: [{ x: a, y }, { x: (a + b) / 2, y }, { x: b, y }] })
        .then((ok: boolean) => { if (ok) { up({ band: null }); api.sfx.settle(); } playRef.current = false; setActing(false); });
    } else {
      const km = Math.max(1, g.shift), lo = km * o.s, hi = Math.min(o.laid, km + 3) * o.s;
      const pts = [{ x: px(lo), y }, { x: px(hi), y }];
      api.act({ tool: "hand", moves: "tap", at: pts, onPoint: () => { up({ band: { lo, hi } }); api.sfx.tick(); } })
        .then((ok: boolean) => { if (ok) { up({ band: { lo, hi } }); api.sfx.settle(); } playRef.current = false; setActing(false); });
    }
  };
  /* the act a guide step waits for, performed the one way whoever asks (the child's key, Enter, the agent's check, the dev solve) */
  const act = (on: any) => {
    if (on === "stone") {
      const o = SR.current;
      tapStone((o.list.length + 1) * o.s);
    } else if (on === "lay") lay(1, "lay");
    else if (on === "last") lay(1, "last");
    else if (on === "shade") shadeAct();
    else if (on === "count") countAct();
  };
  /* a key under the picture: one tap is one press (400 ms double-tap guard); a key that is not what the step waits for is a wrong act */
  const pressKey = (on: string) => {
    const t = Date.now();
    if (t - lastKey.current < 400) return;
    lastKey.current = t;
    if (demo && stepOn && on !== stepOn) { api.did(on); return; }
    if (on === "lay" || on === "last") lay(1, on);
    else if (on === "more") lay(5, null);
    else if (on === "shade") shadeAct();
    else if (on === "count") countAct();
    else if (on === "band") bandAct();
  };

  /* ── phase 1: the stones (a flag goes down where a step lands) ── */
  const canPlant = (demo && stepOn === "stone" && kind === "plant" && !busy) || (!free && stage === "ask" && kind === "plant" && !busy);
  /* a double tap on one stone or flag is one tap: a second tap on the same one within 400 ms is ignored (it would pull the flag straight up again) */
  const lastTap = useRef<any>({ v: -1, t: 0 });
  const twice = (v: number) => {
    const t = Date.now();
    if (lastTap.current.v === v && t - lastTap.current.t < 400) return true;
    lastTap.current = { v, t };
    return false;
  };
  const tapStone = (v: number) => {
    if (!canPlant) return;
    if (twice(v)) return;
    const o = SR.current;
    if (demo) {
      if (v === (o.list.length + 1) * o.s) { up({ list: [...o.list, v], touched: true }); api.sfx.tick(); api.did("stone"); }
      else api.did("stone-off");
      return;
    }
    if (o.given.includes(v)) return;
    const next = o.list.includes(v) ? o.list.filter((x: number) => x !== v) : mtSet([...o.list, v]);
    entry.current.acted = true;
    api.setTyped(mtListText(next)); api.sfx.tick();
    up({ list: next, touched: true });
  };
  /* phase 4: a flag tapped is marked (a list answer) */
  const canMark = !free && stage === "ask" && kind === "betweenList" && !busy;
  const tapFlag = (v: number) => {
    if (!canMark) return;
    if (twice(v)) return;
    const o = SR.current;
    const next = o.list.includes(v) ? o.list.filter((x: number) => x !== v) : mtSet([...o.list, v]);
    entry.current.acted = true;
    api.setTyped(mtListText(next)); api.sfx.tick();
    up({ list: next, touched: true });
  };
  /* the agent (and the dev driver) plant or mark a list as a child would */
  HOOK.set = (xs: number[]) => {
    const o = SR.current;
    const mine = kind === "plant" ? mtSet(xs.filter((x) => !o.given.includes(x))) : mtSet(xs);
    entry.current.acted = true;
    api.setTyped(mtListText(mine));
    up({ list: mine });
  };
  HOOK.demo = () => { if (demo && stepOn) act(stepOn); };
  /* Enter in a guide step performs the CURRENT step; on a list question it sends the list, and only when there is a fresh act to
     send (after a miss the child's flags stay, so a bare Enter would otherwise send that same list again and cost another try) */
  api.onEnter(demo && stepOn ? () => act(stepOn)
    : !free && stage === "ask" && listKind && !busy ? () => {
      const xs = SR.current.list;
      if (!entry.current.acted || !xs.length) return;
      entry.current.acted = false;
      api.submit(mtListText(xs));
    } : null);
  /* the Enter key blinks once the list is complete */
  const ready = listKind && !free && stage === "ask" && (kind === "plant" ? S.list.length === it.n - (it.given || 0) : S.list.length > 0);
  /* the runtime puts the key back to steady after a miss: a change to the list after the miss blinks it again */
  useEffect(() => { if (listKind && !free) api.answerReady(!!ready); }, [ready, ek, S.list.join(",")]);

  /* free play: type a new step size into the step block (the pad is lent to the block) */
  /* a way out: Escape and a second tap on the block leave it with the old step, and a line says what to type
     (the runtime draws its Close key "off" outside the ask stage, so Close cannot leave it: a runtime gap) */
  const leaveTyping = () => { api.capture(null); up({ typing: null }); api.say(FREE_LINE); };
  const typeStep = () => {
    if (!free || busy) return;
    if (typedRef.current !== null) { leaveTyping(); return; }
    up({ touched: true, typing: "" });
    api.say("Type a step from 1 to 60, then press Enter.");
    api.capture((k: string) => {
      if (/^\d$/.test(k)) up((q: any) => ({ typing: ((q.typing || "") + k).slice(0, 2) }));
      else if (k === "back") up((q: any) => ({ typing: (q.typing || "").slice(0, -1) }));
      else if (k === "clear") leaveTyping();
      else if (k === "enter") {
        const v = Number(typedRef.current || "");
        if (v >= 1 && v <= 60) { tl.stop(); setRaw({ ek, ...mtScene(MT_FREE), s: v, touched: true }); api.capture(null); api.say(FREE_LINE); }
        else { up({ typing: "" }); api.say("That is not from 1 to 60, so type a step again."); }
      }
    });
  };
  /* a band post dragged along the track snaps to a whole number; a tap (or Enter) moves it one step on */
  const drag = useDrag((payload: any, p: any, moved: boolean) => {
    if (!free) return;
    const o = SR.current;
    if (!o.band) return;
    /* a post snaps to a LAID flag in the frame, never past the last one and never round to the start; the posts keep one flag apart */
    const g = geoFor(o), km = Math.max(1, g.shift), L = o.laid;
    const B = clampBand(o.band, g.shift, L, o.s);
    let lk = Math.round(B.lo / o.s), hk = Math.round(B.hi / o.s);
    const first = payload.post === 0;
    let m = moved && isFinite(p.x) ? Math.round((p.x + g.off - MT_X0) / g.p) : (first ? lk : hk) + 1;
    if (!moved && m > (first ? hk - 1 : L)) return;          /* a tap at the end of its room moves nothing */
    m = Math.max(km, Math.min(L, m));
    if (first) lk = Math.min(m, hk - 1); else hk = Math.max(m, lk + 1);
    up({ band: { lo: lk * o.s, hi: hk * o.s }, touched: true });
    api.sfx.tick();
  });

  /* ── the win: the maths moving; it stays on the board until the child presses Next ── */
  const layTo = (R: any[], a: number, b: number, per: number) => {
    for (let k = a; k <= b; k++) { const kk = k; R.push([per, () => { up((q: any) => ({ laid: Math.max(q.laid, kk) })); api.sfx.tick(); }]); }
  };
  useEffect(() => {
    if (stage !== "win" || free) return;
    const o = SR.current, R: any[] = [];
    if (it.win) api.say(it.win);
    if (kind === "plant") {
      for (let r = 1; r <= it.n; r++) { const rr = r; R.push([300, () => { up({ rows: rr }); api.sfx.tick(); }]); }
      R.push([200, () => up({ note: "multiples of " + o.s })]);
    } else if (kind === "first") {
      R.push([60, () => up({ pins: [], labels: true })]);
      if (o.laid < 1) layTo(R, 1, 1, 500);
    } else if (kind === "lowthird") {
      R.push([60, () => up({ pins: [], labels: true })]);
      layTo(R, o.laid + 1, 3, 360);
      R.push([400, () => up({ ringed: [1, 3] })]);
    } else if (kind === "last") {
      layTo(R, o.laid + 1, o.laid + 3, 420);
      R.push([200, () => up({ note: "no last one" })]);
    } else if (kind === "next") {
      R.push([60, () => up({ pins: [] })]);
      layTo(R, o.laid + 1, Math.max(o.laid + 1, it.laid + 3), 420);
      R.push([300, () => up({ ringed: [o.laid + 1] })]);
    } else if (kind === "howmany") {
      R.push([60, () => up({ penLit: it.pen.length, penDone: true })]);
      layTo(R, o.laid + 1, o.laid + 3, 420);
      R.push([200, () => up({ note: "no end" })]);
    } else if (kind === "between" || kind === "betweenList") {
      R.push([60, () => up({ shaded: true, shadeF: 1, counted: 0 })]);
      for (let i = 1; i <= insideKs.length; i++) { const j = i; R.push([380, () => { up({ counted: j }); api.sfx.tick(); }]); }
    }
    tl.run(R);
  }, [stage]);

  /* ── the traceback: the mathematics redrawn in steps, ending on the whole right answer;
     the child's own answer stays (on the picture and in the slot), nothing is marked ── */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    lock(true);
    const done = () => lock(false);
    const o = SR.current, v = wrong.value, R: any[] = [];
    up({ touched: true });
    if (kind === "plant") {
      /* the child's flags as sent stay planted through the correction (also when the answer came from the slot, not the chart) */
      up({ lit: [], rows: 0, list: mtSet(mtNums(v).filter((x: number) => !o.given.includes(x))) });
      R.push([500, () => {}]);
      for (let k = 1; k <= it.n; k++) {
        const kk = k, val = k * o.s;
        R.push([560, () => { up((q: any) => ({ lit: k > (it.given || 0) ? [...q.lit, val] : q.lit, rows: kk })); api.sfx.tick(); }]);
      }
      R.push([300, () => {}]);
    } else if (kind === "first") {
      const x = leadNumber(v), maxV = geoFor(o).slots * o.s;
      up({ pins: x !== null && x > 0 && x <= maxV ? [x] : [], labels: true });
      R.push([900, () => {}]);
      layTo(R, 1, 1, 800);
      R.push([300, () => {}]);
    } else if (kind === "lowthird") {
      const maxV = geoFor(o).slots * o.s;
      const xs = slotPartsOf(v, 2).map((q: any) => Number(q)).filter((q: number) => isFinite(q) && q > 0 && q <= maxV);
      up({ pins: mtSet(xs), labels: true, ringed: [] });
      R.push([900, () => {}]);
      layTo(R, 1, 1, 600);
      R.push([400, () => up({ ringed: [1] })]);
      layTo(R, 2, 3, 600);
      R.push([400, () => up({ ringed: [1, 3] })]);
    } else if (kind === "last") {
      up({ ringed: [o.laid] });
      R.push([900, () => {}]);
      layTo(R, o.laid + 1, o.laid + 4, 650);
      R.push([300, () => up({ note: "no last one" })], [300, () => {}]);
    } else if (kind === "next") {
      const x = leadNumber(v), topV = (o.laid + 1) * o.s;
      const onFlag = x !== null && x > 0 && x % o.s === 0 && x / o.s <= o.laid;
      up({ pins: x !== null && x > 0 && x <= topV && !onFlag ? [x] : [], ringed: onFlag ? [(x as number) / o.s] : [] });
      R.push([900, () => {}]);
      layTo(R, o.laid + 1, o.laid + 3, 700);
      R.push([300, () => up((q: any) => ({ ringed: [...q.ringed, o.laid + 1] }))], [300, () => {}]);
    } else if (kind === "howmany") {
      up({ penLit: 0, penDone: false });
      for (let i = 1; i <= it.pen.length; i++) { const j = i; R.push([500, () => { up({ penLit: j }); api.sfx.tick(); }]); }
      R.push([400, () => up({ penDone: true })]);
      layTo(R, o.laid + 1, o.laid + 4, 600);
      R.push([300, () => up({ note: "no end" })], [300, () => {}]);
    } else if (kind === "between" || kind === "betweenList") {
      up(kind === "betweenList" ? { shaded: false, shadeF: 0, counted: 0, list: mtSet(mtNums(v)) } : { shaded: false, shadeF: 0, counted: 0 });
      R.push([800, () => {}], [700, () => up({ shaded: true, shadeF: 1 })]);
      for (let i = 1; i <= insideKs.length; i++) { const j = i; R.push([600, () => { up({ counted: j }); api.sfx.tick(); }]); }
      R.push([300, () => {}]);
    }
    tl.run(R, done);
  }, [wrong]);

  /* ── what the host and the agent read back (toolApi.getState) ── */
  const onTrack: number[] = kind === "plant" ? [...S.given, ...S.list] : Array.from({ length: S.laid }, (_: any, i: number) => (i + 1) * s);
  api.share({
    complete: stage === "idle",
    stepSize: s, flags: onTrack,
    tableRows: kind === "plant" ? Math.max(S.rows, S.given.length + S.list.length) : (S.labels ? S.laid : 0),
    marked: kind === "betweenList" ? S.list : null,
    bandLow: bandE ? bandE.lo : null, bandHigh: bandE ? bandE.hi : null,
    inBand: bandE && (S.shaded || free) ? countedKs.map((k) => k * s) : null,
    bandCount: bandE && (S.shaded || free) ? countedKs.length : null,
  });

  /* ── drawing ── */
  const renderBlock = () => {
    const typing = free && S.typing !== null;
    const shown = typing ? String(S.typing) : String(s);
    const t10 = Math.floor(s / 10), u1 = s % 10;
    const bx = 16 + t10 * 20 + (t10 ? 10 : 0);
    /* the ones are wooden beads, as big as the room under the number allows (56 high, to the block's right edge) */
    let bp = 18, bcols = 1;
    for (let p = 26; p >= 18; p -= 2) { bp = p; bcols = Math.max(1, Math.floor((MT_BLK - 8 - bx) / p)); if (Math.ceil(u1 / bcols) * p <= 56) break; }
    const bs = bp - 2;
    if (narrow && kind === "plant") {
      /* the block beside the chart when a host keeps the keypad open: a tall chip, the beads in columns under the number */
      const bxn = 8 + t10 * 16 + (t10 ? 6 : 0);
      let bpn = 26, cn = 2;
      for (let p = 26; p >= 18; p -= 2) { bpn = p; cn = Math.max(1, Math.floor((92 - 8 - bxn) / p)); if (Math.ceil(u1 / cn) * p <= 140) break; }
      const bsn = bpn - 2;
      return (
        <g transform="translate(804 4)">
          <rect x={0} y={0} width={92} height={262} rx={RAD.panel} fill="url(#gPanel)" stroke={C.rule} strokeWidth={2} />
          <text x={46} y={42} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("step")}</text>
          <text x={46} y={94} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={MTA_INK}>{shown}</text>
          <g filter="url(#fShadowSoft)">
            {Array.from({ length: t10 }).map((_, i) => (
              <rect key={"t" + i} x={8 + i * 16} y={110} width={12} height={56} rx={4} fill="url(#gTen)" stroke={shade(MTA, 0.2)} strokeWidth={1.2} />
            ))}
            {Array.from({ length: u1 }).map((_, i) => {
              const cx = bxn + (i % cn) * bpn + bpn / 2, cy = 120 + Math.floor(i / cn) * bpn + bpn / 2;
              return (
                <g key={"o" + i}>
                  <circle cx={cx} cy={cy} r={bsn / 2 - 1.5} fill="url(#gTen)" stroke={shade(MTA, 0.2)} strokeWidth={1.2} />
                  <Skin name="bead" x={cx - bsn / 2} y={cy - bsn / 2} w={bsn} h={bsn} fit="stretch" />
                </g>
              );
            })}
          </g>
        </g>
      );
    }
    return (
      <g transform="translate(0 8)">
        <rect x={0} y={0} width={MT_BLK} height={MT_BLK} rx={RAD.panel} fill="url(#gPanel)" stroke={typing ? C.accent : C.rule} strokeWidth={typing ? 4 : 2} />
        <text x={MT_BLK / 2} y={40} textAnchor="middle" fontSize={T.micro} fontWeight={600} fill={C.ink}>{tx("step")}</text>
        <text x={MT_BLK / 2} y={96} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={MTA_INK}>{shown}</text>
        {typing && <rect className="c4-caret" x={MT_BLK / 2 + shown.length * 17 + 4} y={52} width={4} height={48} rx={2} fill={C.accent} />}
        {!typing && (
          <g filter="url(#fShadowSoft)">
            {Array.from({ length: t10 }).map((_, i) => (
              <rect key={"t" + i} x={16 + i * 20} y={110} width={14} height={54} rx={4} fill="url(#gTen)" stroke={shade(MTA, 0.2)} strokeWidth={1.2} />
            ))}
            {Array.from({ length: u1 }).map((_, i) => {
              const cx = bx + (i % bcols) * bp + bp / 2, cy = 108 + Math.floor(i / bcols) * bp + bp / 2;
              return (
                <g key={"o" + i}>
                  <circle cx={cx} cy={cy} r={bs / 2 - 1.5} fill="url(#gTen)" stroke={shade(MTA, 0.2)} strokeWidth={1.2} />
                  <Skin name="bead" x={cx - bs / 2} y={cy - bs / 2} w={bs} h={bs} fit="stretch" />
                </g>
              );
            })}
          </g>
        )}
        {free && <Hit id="step-block" label="Type a new step size" x={0} y={0} w={MT_BLK} h={MT_BLK} onPress={typeStep} />}
      </g>
    );
  };

  /* phase 1: the table strip, one ruled line per step, filling as the flags go down */
  const renderTable = () => {
    const nRows = it.n || 0;
    return (
      <g>
        {Array.from({ length: nRows }).map((_, r) => {
          const col = r < 3 ? 0 : 1, row = r % 3, x = 212 + col * 470, y = 52 + row * 52;
          const right = r < S.rows, given = r < S.given.length;
          /* the right side is written by the table itself (the win, the correction), never from what the child planted: only the warm-up, which takes right stones only, shows its own */
          const val = right ? (r + 1) * s : given ? S.given[r] : demo ? S.list[r - S.given.length] : undefined;
          return (
            <g key={"row" + r}>
              <line x1={x - 10} y1={y + 14} x2={x + 400} y2={y + 14} stroke={C.rule} strokeWidth={2} />
              <text x={x} y={y} fontSize={T.label} fontWeight={600} fill={C.ink}>{`${r + 1} × ${s} =`}</text>
              {val !== undefined && <text x={x + 172} y={y} fontSize={T.label} fontWeight={700} fill={right || given ? MTG_INK : C.ink}>{val}</text>}
            </g>
          );
        })}
      </g>
    );
  };

  /* phase 1: the chart of stepping stones, a flag where the child plants one */
  const renderChart = () => {
    const planted = [...S.given, ...S.list];
    const cells: any[] = [];
    for (let v = 1; v <= G.n; v++) {
      const { x, y } = gpos(v);
      const isP = planted.includes(v), isLit = S.lit.includes(v);
      cells.push(
        <g key={"c" + v}>
          <rect x={x} y={y} width={G.cw} height={G.chh} rx={14} fill={isP ? tint(MTG, 0.82) : MT_STONE} stroke={isP ? MTG_INK : C.ink} strokeWidth={isP ? 3.2 : 2.4} />
          {isLit && !isP && <rect x={x - 3} y={y - 3} width={G.cw + 6} height={G.chh + 6} rx={17} fill="none" stroke={MTG} strokeWidth={5} strokeDasharray="9 7" />}
          {isLit && isP && <rect x={x - 3} y={y - 3} width={G.cw + 6} height={G.chh + 6} rx={17} fill="none" stroke={MTG} strokeWidth={5} />}
          {isP && (
            <g className="mt-pop">
              <rect x={x + 5} y={y + 3} width={3} height={44} fill={MT_WOOD} />
              <rect x={x + 8} y={y + 4} width={26} height={21} rx={3} fill={tint(MTG, 0.7)} stroke={MTG} strokeWidth={1.5} />
              <Skin name="flag" x={x + 3} y={y + 1} w={32} h={48} fit="stretch" />
              <rect x={x + 8} y={y + 4} width={26} height={21} rx={3} fill={MTG} fillOpacity={0.35} />
            </g>
          )}
          <text x={x + G.cw / 2} y={y + G.chh - 14} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={isP ? MTG_INK : C.ink}>{v}</text>
        </g>
      );
    }
    const p0 = gpos(1);
    return (
      <g>
        <g pointerEvents="none">
          {cells}
          <rect x={p0.x - 54} y={p0.y + 8} width={9} height={G.chh - 12} rx={4} fill={MTL} />
          <circle cx={p0.x - 49.5} cy={p0.y + 8} r={9} fill={MTL} />
          <text x={p0.x - 24} y={p0.y + G.chh - 14} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>0</text>
        </g>
        {canPlant && Array.from({ length: G.n }).map((_, i) => {
          const v = i + 1, { x, y } = gpos(v);
          if (S.given.includes(v)) return null;
          return <Hit key={"h" + v} id={"stone-" + v} label={(S.list.includes(v) ? "Pull up the flag on " : "Plant a flag on ") + v}
            x={x} y={y} w={G.cw} h={G.chh} onPress={() => tapStone(v)} />;
        })}
      </g>
    );
  };

  /* phases 2-4 and free play: the track at the size of a step */
  const renderTrack = () => {
    const kFrom = Math.max(1, shift); /* the flag at the left edge stands whole: nothing is drawn half cut off */
    const kTo = Math.min(top, shift + slots + 12);
    const counted = new Set(countedKs);
    const labelsOn = (k: number) => sp >= 120 && S.labels && k <= S.laid;
    /* a caption is as big as its pitch allows: 40 down to the 28 floor */
    const capFor = (txt: string) => [T.prompt, T.label, T.micro].find((f) => txt.length * f * 0.62 <= sp - 8) || T.micro;
    const minX = off + 6, maxX = off + bw - 6; /* what is in the frame, in track units */
    const ks: number[] = [];
    for (let k = kFrom; k <= kTo; k++) ks.push(k);
    const post = (pv: number, i: number) => {
      const x = vx(pv), tw = indian(pv).length * 24 + 34;
      if (x < minX + 10 || x > maxX - 10) return null;
      return (
        <g key={"post" + i} className={free ? "mt-grab c4-piece" : undefined}
          {...(free ? { ...control("post-" + (i + 1), "Band post on " + pv), ...drag.bind({ post: i }), ...drag.keys({ post: i }) } : {})}>
          <rect x={x - 6} y={MT_RULE + 6} width={12} height={60} rx={5} fill={MTL} />
          <rect x={x - tw / 2} y={MT_RULE + 46} width={tw} height={52} rx={11} fill="#FFFFFF" stroke={MTL} strokeWidth={2.5} />
          <text x={x} y={MT_RULE + 84} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{indian(pv)}</text>
          {free && <rect x={x - 36} y={MT_RULE + 6} width={72} height={100} fill="transparent" />}
        </g>
      );
    };
    return (
      <g>
        {bandE && <rect x={0} y={MT_RULE + 34} width={bw} height={76} rx={18} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={2} />}
        <rect x={shift > 0 ? 0 : MT_X0} y={MT_RULE - 4} width={bw - (shift > 0 ? 0 : MT_X0)} height={8} fill={MTL} />
        <g clipPath="url(#mt-clip)">
          <g className="mt-slide" style={{ transform: `translateX(${-off}px)` } as any}>
            {shift === 0 && (
              <g>
                <rect x={MT_X0 - 6} y={MT_RULE - 90} width={12} height={110} rx={5} fill={MTL} />
                <circle cx={MT_X0} cy={MT_RULE - 90} r={10} fill={MTL} />
                <text x={MT_X0 - 24} y={MT_RULE - 14} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>0</text>
              </g>
            )}
            {bandE && (() => {
              /* the shading stops short of a post that stands on a flag, so that flag stands plainly outside it */
              const gap = (pv: number) => (pv % s === 0 ? 30 : 6);
              const a = Math.max(vx(bandE.lo) + gap(bandE.lo), minX), b = Math.min(vx(bandE.hi) - gap(bandE.hi), maxX);
              const f = free ? 1 : S.shaded ? 1 : S.shadeF;
              return f > 0 && b - a > 4 ? <rect x={a} y={MT_RULE + 42} width={(b - a) * f} height={56} rx={12} fill={tint(MTA, 0.5)} /> : null;
            })()}
            {bandE && [bandE.lo, bandE.hi].map((pv: number, i: number) => post(pv, i))}
            {countedKs.map((k: number, i: number) => (
              <text key={"c" + k} x={mtFlagGeo(X(k), k * s, fs, MT_FTOP, MT_RULE).cx} y={MT_FTOP - 18} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{i + 1}</text>
            ))}
            {ks.filter((k) => k - 1 >= shift).map((k) => {
              const a = X(k - 1), b = X(k), ghost = k > S.laid;
              const d = `M ${a} ${MT_RULE - 6} Q ${(a + b) / 2} ${MT_RULE - (huge ? 190 : big ? 140 : 110)} ${b} ${MT_RULE - 6}`;
              return ghost
                ? <path key={"g" + k} d={d} fill="none" stroke={tint(MTA, 0.35)} strokeWidth={5} strokeDasharray="12 10" strokeLinecap="round" />
                : <path key={"a" + k} className="mt-draw" pathLength={1} d={d} fill="none" stroke={MTA} strokeWidth={huge ? 8 : 6} strokeLinecap="round" />;
            })}
            {ks.map((k) => {
              const v = k * s, x = X(k), blank = k > S.laid, g = mtFlagGeo(x, v, fs, MT_FTOP, MT_RULE);
              const ring = S.ringed.includes(k) || (kind === "betweenList" && S.list.includes(v));
              return (
                <g key={"f" + k} className={blank ? undefined : "mt-pop"}>
                  {counted.has(k) && <rect x={g.cl.x - 10} y={g.cl.y - 8} width={g.cl.w + 20} height={g.cl.h + 16} rx={14} fill={tint(MTA, 0.55)} />}
                  <rect x={x - 2} y={g.sy + 0.03 * g.H} width={4} height={MT_RULE - g.sy - 0.03 * g.H} fill={MT_WOOD} />
                  <rect x={g.cl.x} y={g.cl.y} width={g.cl.w} height={g.cl.h} rx={8} fill={blank ? "#FFFFFF" : tint(MTG, 0.86)}
                    stroke={MTG} strokeWidth={3} strokeDasharray={blank ? "8 6" : undefined} />
                  {!blank && <Skin name="flag" x={g.sx} y={g.sy} w={g.sw} h={g.H} fit="stretch" />}
                  {!blank && <rect x={g.cl.x} y={g.cl.y} width={g.cl.w} height={g.cl.h} rx={8} fill={MTG} fillOpacity={0.2} />}
                  {!blank && <rect x={g.cx - g.cw / 2 + 3} y={g.cy - fs * 0.62} width={g.cw - 6} height={fs * 1.24} rx={7} fill={tint(MTG, 0.9)} fillOpacity={0.94} />}
                  {!blank && <text x={g.cx} y={g.cy + fs * 0.35} textAnchor="middle" fontSize={fs} fontWeight={700} fill={MTG_INK}>{indian(v)}</text>}
                  {ring && <rect x={g.cl.x - 12} y={g.cl.y - 12} width={g.cl.w + 24} height={g.cl.h + 24} rx={16} fill="none" stroke={C.accent} strokeWidth={4} />}
                  {labelsOn(k) && !counted.has(k) && <text x={g.cx} y={MT_FTOP - 16} textAnchor="middle" fontSize={capFor(`${k} × ${s}`)} fontWeight={600} fill={C.ink}>{`${k} × ${s}`}</text>}
                </g>
              );
            })}
            {S.pins.map((v: number) => {
              const x = vx(v);
              if (x < minX + 20 || x > maxX - 30) return null;
              return (
                <g key={"p" + v}>
                  <path d={`M ${x} ${MT_RULE + 8} L ${x - 11} ${MT_RULE + 28} L ${x + 11} ${MT_RULE + 28} Z`} fill={C.ink} />
                  <text x={x} y={MT_RULE + 64} textAnchor="middle" fontSize={T.label} fontWeight={600} fill={C.ink}>{indian(v)}</text>
                </g>
              );
            })}
            {canMark && ks.filter((k) => k <= S.laid).map((k) => {
              const v = k * s;
              return <Hit key={"hf" + k} id={"flag-" + v} label={(S.list.includes(v) ? "Unmark " : "Mark ") + v}
                x={X(k) - 12} y={MT_FTOP - 14} w={72} h={MT_RULE - MT_FTOP + 22} onPress={() => tapFlag(v)} />;
            })}
          </g>
        </g>
        {free && drag.drag && drag.drag.moved && (
          <rect x={drag.drag.x - 6} y={MT_RULE + 6} width={12} height={100} rx={5} fill={MTL} filter="url(#fLift)" pointerEvents="none" />
        )}
      </g>
    );
  };

  /* phase 3: the pen of factors from the topic before, shut at both ends */
  const renderPen = () => {
    const cards: number[] = it.pen || [], x0 = 232, cw = 84, gap = 12, left = 212;
    const right = x0 + cards.length * (cw + gap) - gap + 12;
    return (
      <g>
        <text x={left + 12} y={36} fontSize={T.label} fontWeight={600} fill={C.ink}>{tx("factors of " + s)}</text>
        <rect x={left} y={56} width={12} height={112} rx={4} fill={MTL} />
        <rect x={right} y={56} width={12} height={112} rx={4} fill={MTL} />
        <rect x={left} y={162} width={right - left + 12} height={6} rx={3} fill={MTL} />
        {cards.map((f, i) => {
          const x = x0 + i * (cw + gap);
          return (
            <g key={"pen" + f}>
              <rect x={x} y={78} width={cw} height={70} rx={12} fill={tint(MTB, 0.85)} stroke={MTB} strokeWidth={i < S.penLit ? 6 : 3} />
              <text x={x + cw / 2} y={125} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={MTB_INK}>{f}</text>
            </g>
          );
        })}
        {S.penDone && <text x={right + 34} y={125} fontSize={T.label} fontWeight={700} fill={MTB_INK}>{tx(cards.length + " factors")}</text>}
      </g>
    );
  };

  /* the one row of keys under the picture: a sequence is ONE key whose label follows the act (Shade, then Count) */
  const keyList = () => {
    let ks: any[] = [];
    if (free) ks = [{ id: "lay", label: "Step", w: 190 }, { id: "more", label: "Keep going", w: 270 }, { id: "band", label: S.band ? "Clear band" : "Band", w: 270 }];
    else if (demo) {
      if (kind === "first") ks = [{ id: "lay", label: "Lay a step", w: 300 }];
      else if (kind === "last") ks = [{ id: "last", label: "Last flag?", w: 300 }];
      else if (kind === "between") ks = !S.shaded ? [{ id: "shade", label: "Shade", w: 300 }] : S.counted > 0 && !acting && countedKs.length === insideKs.length ? [] : [{ id: "count", label: "Count", w: 300 }];
    } else if (kind === "last" || kind === "howmany") ks = [{ id: "last", label: "Last flag?", w: 300 }];
    const gap = 24, tot = ks.reduce((a, k) => a + k.w, 0) + gap * Math.max(0, ks.length - 1);
    let x = Math.round((bw - tot) / 2);
    return ks.map((k, j) => { const r = { ...k, j, x, y: MT_KEYY, h: 72 }; x += k.w + gap; return r; });
  };
  const keys = keyList();
  const keyOn = (id: string) => {
    if (busy || captured) return false;
    if (free) return id === "band" && !S.band ? S.laid >= 2 : true;       /* a post rests on a laid flag: the band needs two */
    if (demo) return !!stepOn;
    return stage === "ask" && id === "last";
  };

  /* the one invite: the stone or key a guide step waits for, the step block in free play */
  const invite: any = (() => {
    if (busy || wrong || S.touched && !demo) return null;
    if (free) return S.touched || S.typing !== null ? null : { x: MT_BLK / 2, y: 8 + MT_BLK / 2, w: MT_BLK, h: MT_BLK, rx: RAD.panel };
    /* the stone warm-up has no pulse: the step line names the act, and the stone that answers it must never be the one that blinks */
    if (demo && stepOn === "stone" && kind === "plant") return null;
    if (demo && stepOn && keys.length) { const k = keys[0]; return { x: k.x + k.w / 2, y: k.y + k.h / 2, w: k.w, h: k.h, rx: 18 }; }
    return null;
  })();

  return (
    <g>
      <style>{MT_CSS}</style>
      <defs><clipPath id="mt-clip"><rect x={0} y={-10} width={bw} height={540} /></clipPath></defs>
      {renderBlock()}
      {kind === "plant" ? <g>{!narrow && renderTable()}{renderChart()}</g> : renderTrack()}
      {kind === "howmany" && renderPen()}
      {S.note && <text x={kind === "howmany" ? 212 : kind === "plant" && !narrow ? 1450 : Math.min(bw, 900) - 12} y={kind === "howmany" ? 204 : kind === "plant" ? (narrow ? 50 : 150) : big ? 110 : 160} textAnchor={kind === "howmany" ? "start" : "end"} fontSize={T.label} fontWeight={700} fill={MTG_INK}>{tx(S.note)}</text>}
      {free && bandE && <text x={212} y={86} fontSize={T.xl} fontWeight={700} fill={C.ink}>{`${insideKs.length} ${tx("inside")}`}</text>}
      {keys.map((k) => (
        <Key key={"act" + k.j} id={k.id} label={tx(k.label)} x={k.x} y={k.y} w={k.w} h={k.h} C={C} tone="key" disabled={!keyOn(k.id)} onClick={() => pressKey(k.id)}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={keyOn(k.id) ? toneInk("key", C.ink) : mix(C.ink, C.panel, 0.5)}>{tx(k.label)}</text>
        </Key>
      ))}
      {invite && <Invite x={invite.x} y={invite.y} w={invite.w} h={invite.h} rx={invite.rx} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase:
   result.last = { item, it, value, answer, kind, shared } (shared = what api.share held at that moment) */
function Thumb({ result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const L = (result && result.last) || {};
  if (L.value === undefined || L.value === null) return null;
  const k = L.kind, st = (it && it.s) || 1;
  const base = h - 14;
  /* no words here: a thumbnail in Hindi or Gujarati carries no Latin letter (flags with their numbers, an arrow, the infinity sign) */
  const flagAt = (x: number, v: any, i: number) => {
    const fw = Math.max(44, String(v).length * 17 + 16);
    return (
      <g key={i}>
        <rect x={x - 2} y={8} width={4} height={base - 8} fill={MTL} />
        <rect x={x + 2} y={8} width={fw} height={38} rx={6} fill={tint(MTG, 0.86)} stroke={MTG} strokeWidth={2} />
        <text x={x + 2 + fw / 2} y={37} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={MTG_INK}>{v}</text>
      </g>
    );
  };
  let body: any;
  if (k === "howmany") body = <text x={w / 2} y={base - 8} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={MTG_INK}>∞</text>;
  else if (k === "last") body = [1, 2, 3].map((i) => flagAt(22 + (i - 1) * 62, st * i, i)).concat([<path key="ar" d={`M ${w - 62} ${base - 22} L ${w - 22} ${base - 22} M ${w - 36} ${base - 36} L ${w - 22} ${base - 22} L ${w - 36} ${base - 8}`} fill="none" stroke={MTL} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />]);
  else if (k === "between") {
    const c = Number(leadNumber(L.value)) || 0;
    body = Array.from({ length: Math.min(c, 5) }).map((_, i) => (
      <g key={i}>
        <rect x={20 + i * 32} y={18} width={4} height={base - 18} fill={MTL} />
        <rect x={24 + i * 32} y={18} width={20} height={14} rx={3} fill="url(#gOne)" />
      </g>
    )).concat([<text key="n" x={w - 18} y={base - 8} textAnchor="end" fontSize={T.xl} fontWeight={700} fill={MTA_INK}>{c}</text>]);
  } else {
    const vals = k === "lowthird" ? slotPartsOf(L.value, 2).map((q: any) => Number(q)) : mtNums(L.value).slice(-3);
    body = vals.map((v: number, i: number) => flagAt(22 + i * 72, v, i));
  }
  return (
    <g data-role="thumb-art">
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <rect x={10} y={base} width={w - 20} height={5} fill={MTL} />
      {body}
    </g>
  );
}

function MultipleTrack(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b): the working area the whole card until the child taps Answer,
         the answer box and keypad in a panel that slides in from the right */
      board: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d, PATTERNS.md §16; needs board: true): no question bar, only its blinking key at the top right;
         the working area is 64,108, 1472 x 520 and the key's corner is props.box.key (keep every element out of it); the question lives
         only in the bubble. */
      keyOnly: true,
      /* the wide keypad (LAYOUT.md §1b, PATTERNS.md 9g): the answer panel is 556 wide and the picture has x 64 to 964 while it is open;
         every picture here is laid out for that width, and the rule runs on to the frame's edge. */
      bigPad: true,
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself; after a right answer the win picture waits for the child's tap on
         the blinking Next key. */
      nextKey: true,
      /* NAV DOTS (the new look; LAYOUT.md §1d; stands alone): the phase bar becomes one small clickable dot per phase, no text; a tap starts
         THAT phase, in user and AI mode. */
      navDots: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key (above) */
      StartArt, START_HOOK,
      /* the keypad colours: leave THEME unset and the image agent's TOOL_THEME (the slot's images.tsx) is picked up by the
         runtime by itself; set THEME here only to override it (docs/IMAGES.md) */
      }} />
  );
}

export default MultipleTrack;
