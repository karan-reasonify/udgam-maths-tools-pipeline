/* ═══ M3.S5.T11.C53.2D1 · column_subtractor · tool-specific part ═══════════════════════════════
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

const TOOL_ID = "column_subtractor";
const MEDIA_ID = "M3.S5.T11.C53.2D1";
const TOOL_NAME = "Column Subtractor";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["A column frame, waiting for the greater number on top."];
/* the whole-tool line: printed on the summary page */
const FINISH_LINE = "Every trade was shown, and every difference checked.";
/* printed when the child opens Free play (the plan's free-play line); its LAST piece stays on the bubble */
const FREE_LINE = "Free play: put the greater number on top, trade, take away, then try a new pair.";

/* THE START PAGE (runtime r28; docs/LAYOUT.md §1c, docs/PATTERNS.md §14): the first thing a child sees in user mode.
   START_HOOK is ONE printed question to wonder at (it needs a TR entry, and never gives an answer away); StartArt is
   the object the lesson is about, drawn in a 1200 x 340 box ({ box, C, lang, tx }; plain shapes in the chrome and content
   colours, a <Skin> over them when the image agent made one). This stub is a dashed outline: draw the real object. */
const START_HOOK = "Which number goes on top when you take away decimals?";
/* the column frame itself: three places, the point line, 8.1 over 2.5 and the rule, the difference row still empty */
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  const cw = 190, fw = 3 * cw, x0 = Math.round((box.w - fw) / 2), rh = 74, blue = CONTENT.hundred;
  const card = (v: string, y: number) => (
    <g>
      <rect x={x0 + 4} y={y} width={(v.length - 1) * cw - 8} height={rh} rx={16} fill={tint(blue, 0.86)} stroke={blue} strokeWidth={3} />
      {v.replace(".", "").split("").map((ch, q) => <text key={q} x={x0 + q * cw + cw / 2} y={y + 55} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={shade(blue, 0.25)}>{ch}</text>)}
      <text x={x0 + cw} y={y + 55} textAnchor="middle" fontSize={T.xl} fontWeight={800} fill={C.ink} stroke="#FFFFFF" strokeWidth={6} paintOrder="stroke">.</text>
    </g>
  );
  return (
    <g>
      <rect x={x0 - 10} y={52} width={fw + 20} height={280} rx={18} fill={tint(C.panel, 0.72)} stroke={C.rule} strokeWidth={2} />
      {["Ones", "Tenths", "Hundredths"].map((p, c) => <text key={p} x={x0 + c * cw + cw / 2} y={36} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(p)}</text>)}
      <line x1={x0 + 2 * cw} x2={x0 + 2 * cw} y1={52} y2={332} stroke={C.rule} strokeWidth={2} />
      <line x1={x0 + cw} x2={x0 + cw} y1={46} y2={338} stroke={CONTENT.line} strokeWidth={5} strokeLinecap="round" />
      {card("8.1", 66)}
      {card("2.5", 150)}
      <text x={x0 - 44} y={150 + 55} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>−</text>
      <line x1={x0 + 8} x2={x0 + fw - 8} y1={238} y2={238} stroke={CONTENT.line} strokeWidth={4} strokeLinecap="round" />
      <rect x={x0 + 10} y={250} width={fw - 20} height={rh - 8} rx={RAD.piece} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} strokeDasharray="9 8" />
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
      "Column Subtractor": "स्तंभ घटाव",
      "Free play: put the greater number on top, trade, take away, then try a new pair.": "खुला खेल: बड़ी संख्या ऊपर रखो, उधार लो, घटाओ, फिर नई जोड़ी लो।",
      "Which number goes on top when you take away decimals?": "दशमलव संख्याएँ घटाते समय कौन-सी संख्या ऊपर जाती है?",
      "Greater number on top": "बड़ी संख्या ऊपर",
      "Tap 7.4, the greater number, to put it on top.": "बड़ी संख्या 7.4 को ऊपर रखने के लिए उस पर टैप करो।",
      "Tap the card with the bigger number.": "बड़ी संख्या वाले कार्ड पर टैप करो।",
      "7.4 has no hundredths, so tap Add zeros to write 7.40.": "7.4 में शतांश नहीं है, इसलिए 7.40 लिखने को शून्य लगाओ पर टैप करो।",
      "Tap the Add zeros key under the frame.": "फ्रेम के नीचे शून्य लगाओ बटन पर टैप करो।",
      "You cannot take 3 hundredths from 0, so tap the tenths to trade.": "0 में से 3 शतांश नहीं घट सकते, इसलिए उधार के लिए दशांश पर टैप करो।",
      "Tap the 4 in the tenths column.": "दशांश के खाने में 4 पर टैप करो।",
      "You cannot take 6 tenths from 3, so tap the ones to trade.": "3 में से 6 दशांश नहीं घट सकते, इसलिए उधार के लिए इकाई पर टैप करो।",
      "Tap the 7 in the ones column.": "इकाई के खाने में 7 पर टैप करो।",
      "No place is short now, so tap Take away to write the difference.": "अब कोई खाना कम नहीं, इसलिए अंतर लिखने को घटाओ पर टैप करो।",
      "Tap the Take away key.": "घटाओ बटन पर टैप करो।",
      "Start at the right and ask if each top digit is big enough.": "दाईं ओर से शुरू करो और देखो कि ऊपर का हर अंक काफ़ी बड़ा है या नहीं।",
      "Where a top digit is too small, trade one from its left for ten.": "जहाँ ऊपर का अंक छोटा हो, वहाँ बाईं ओर से एक लेकर दस बनाओ।",
      "Greater number on top, points in one line, and trade where a place is short.": "बड़ी संख्या ऊपर, दशमलव एक सीध में, और खाना कम पड़े तो उधार लो।",
      "You learned: greater number on top, points in line, trade when short": "तुमने सीखा: बड़ी संख्या ऊपर, दशमलव एक सीध में, कम पड़े तो उधार",
      "What is 8.3 - 4.56?": "8.3 - 4.56 कितना है?",
      "8.3 − 4.56 = ?": "8.3 − 4.56 = ?",
      "Write 8.3 as 8.30 first, then trade a tenth for the hundredths.": "पहले 8.3 को 8.30 लिखो, फिर शतांश के लिए एक दशांश उधार लो।",
      "After that trade the tenths hold 2, too few for 5, so trade a one.": "उस उधार के बाद दशांश में 2 बचे, 5 के लिए कम, इसलिए एक इकाई उधार लो।",
      "Take away: 10 take away 6 hundredths, then 12 take away 5 tenths.": "अब घटाओ: 10 में से 6 शतांश, फिर 12 में से 5 दशांश।",
      "Yes, 8.30 take away 4.56 leaves 3.74.": "हाँ, 8.30 में से 4.56 घटाने पर 3.74 बचता है।",
      "What is 6.4 - 2.15?": "6.4 - 2.15 कितना है?",
      "6.4 − 2.15 = ?": "6.4 − 2.15 = ?",
      "6.4 needs a zero first, and its hundredths are short.": "6.4 को पहले एक शून्य चाहिए, और उसके शतांश कम पड़ते हैं।",
      "Trade one tenth of 6.40 for ten hundredths, and the tenths keep 3.": "6.40 के एक दशांश के बदले दस शतांश लो, दशांश में 3 बचेंगे।",
      "Now find 10 minus 5 hundredths and 3 minus 1 tenth, then the ones.": "अब 10 घटा 5 शतांश और 3 घटा 1 दशांश निकालो, फिर इकाई।",
      "Right, 6.40 minus 2.15 is 4.25.": "सही, 6.40 घटा 2.15 बराबर 4.25 है।",
      "What is 9.2 - 4.608?": "9.2 - 4.608 कितना है?",
      "9.2 − 4.608 = ?": "9.2 − 4.608 = ?",
      "9.2 is 9.200, so trade down from the tenths, one place at a time.": "9.2 यानी 9.200, इसलिए दशांश से शुरू करके एक-एक खाना उधार लो।",
      "Trade a tenth, then a hundredth, then a one, each for ten of the next.": "पहले एक दशांश, फिर एक शतांश, फिर एक इकाई को अगले के दस में बदलो।",
      "From the right: 10 minus 8 thousandths, then 9 minus 0 hundredths.": "दाईं ओर से: 10 घटा 8 सहस्रांश, फिर 9 घटा 0 शतांश।",
      "Yes, three places each, and 4.592 is left.": "हाँ, दोनों में तीन-तीन स्थान, और 4.592 बचता है।",
      "Taking a decimal from a whole number": "पूर्ण संख्या में से दशमलव संख्या घटाना",
      "5 is greater than 1.28, so tap 5 to put it on top.": "5 तो 1.28 से बड़ा है, इसलिए उसे ऊपर रखने को 5 पर टैप करो।",
      "Tap the whole number 5.": "पूर्ण संख्या 5 पर टैप करो।",
      "5 has no point yet, so tap Point first to write it as 5.00.": "5 में अभी दशमलव नहीं, इसलिए 5.00 लिखने को पहले दशमलव पर टैप करो।",
      "Tap the Point first key.": "पहले दशमलव बटन पर टैप करो।",
      "There are no tenths to give, so tap the ones to trade one one.": "देने को दशांश नहीं हैं, इसलिए एक इकाई उधार लेने को इकाई पर टैप करो।",
      "Tap the 5 in the ones column.": "इकाई के खाने में 5 पर टैप करो।",
      "Now tap the tenths to trade one tenth for ten hundredths.": "अब एक दशांश के बदले दस शतांश लेने को दशांश पर टैप करो।",
      "Tap the tenths column next.": "अब दशांश के खाने पर टैप करो।",
      "Tap Take away to see what is left.": "क्या बचता है देखने को घटाओ पर टैप करो।",
      "Trade from the left, one place at a time, until no place is short.": "बाईं ओर से एक-एक खाना उधार लो, जब तक कोई खाना कम न रहे।",
      "Once every top digit is big enough, take away from the right.": "जब ऊपर का हर अंक काफ़ी बड़ा हो, तब दाईं ओर से घटाओ।",
      "Before taking away, give a whole number zeros in its empty places.": "घटाने से पहले पूर्ण संख्या के खाली स्थानों में शून्य लिखो।",
      "You learned: a whole number gets its point and zeros first": "तुमने सीखा: पूर्ण संख्या को पहले दशमलव और शून्य मिलते हैं",
      "What is 7 - 2.45?": "7 - 2.45 कितना है?",
      "7 − 2.45 = ?": "7 − 2.45 = ?",
      "The 4 and 5 cannot just drop down, the 7 has empty places above them.": "4 और 5 सीधे नीचे नहीं आ सकते, उनके ऊपर 7 के खाली स्थान हैं।",
      "Break a one into ten tenths, then one of those tenths into ten hundredths.": "एक इकाई तोड़कर दस दशांश बनाओ, फिर उनमें से एक दशांश के दस शतांश।",
      "Now 10 hundredths less 5, and 9 tenths less 4, then the ones.": "अब 10 शतांश घटा 5, और 9 दशांश घटा 4, फिर इकाई।",
      "Yes, 7.00 take away 2.45 leaves 4.55.": "हाँ, 7.00 में से 2.45 घटाने पर 4.55 बचता है।",
      "What is 4 - 1.37?": "4 - 1.37 कितना है?",
      "4 − 1.37 = ?": "4 − 1.37 = ?",
      "Look at the empty places above 3 and 7: can you take from nothing?": "3 और 7 के ऊपर खाली स्थान देखो: क्या खाली में से घट सकता है?",
      "The hundredths need 7 and have none, so trade down from the ones.": "शतांश को 7 चाहिए और वहाँ कुछ नहीं, इसलिए इकाई से उधार शुरू करो।",
      "Take 7 from 10 hundredths and 3 from 9 tenths, then the ones.": "10 शतांश में से 7 और 9 दशांश में से 3 घटाओ, फिर इकाई।",
      "Right, 4.00 minus 1.37 is 2.63.": "सही, 4.00 घटा 1.37 बराबर 2.63 है।",
      "Subtract 0.85 from 3.": "3 में से 0.85 घटाओ।",
      "Subtract 0.85 from 3": "3 में से 0.85 घटाओ",
      "Which column does the 3 stand in, and what is above the 8 and 5?": "3 किस खाने में है, और 8 और 5 के ऊपर क्या है?",
      "0.85 needs tenths and hundredths, so open a one and then a tenth of 3.00.": "0.85 को दशांश और शतांश चाहिए, इसलिए 3.00 की एक इकाई, फिर एक दशांश खोलो।",
      "Find 10 minus 5 hundredths and 9 minus 8 tenths, then the ones.": "10 घटा 5 शतांश और 9 घटा 8 दशांश निकालो, फिर इकाई।",
      "Yes, 3.00 less 0.85 is 2.15.": "हाँ, 3.00 घटा 0.85 बराबर 2.15 है।",
      "Three ways to ask for a difference": "अंतर पूछने के तीन तरीके",
      "Tap the first wording to light the number all three start from.": "पहले वाक्य पर टैप करो, जिस संख्या से तीनों शुरू होते हैं वह चमकेगी।",
      "Tap Subtract 2.5 from 8.1.": "8.1 में से 2.5 घटाओ पर टैप करो।",
      "All three start at 8.1, so tap 8.1 to put it on top.": "तीनों 8.1 से शुरू होते हैं, इसलिए उसे ऊपर रखने को 8.1 पर टैप करो।",
      "Tap the number they all start from.": "जिस संख्या से तीनों शुरू होते हैं, उस पर टैप करो।",
      "You cannot take 5 tenths from 1, so tap the ones to trade.": "1 में से 5 दशांश नहीं घट सकते, इसलिए उधार के लिए इकाई पर टैप करो।",
      "Tap the 8 in the ones column.": "इकाई के खाने में 8 पर टैप करो।",
      "Tap Take away to write the difference.": "अंतर लिखने को घटाओ पर टैप करो।",
      "Put the number you take away from on top, points in one line.": "जिसमें से घटाते हो वह संख्या ऊपर रखो, दशमलव एक सीध में।",
      "Give the shorter number its zeros, then trade where a place is short.": "कम अंकों वाली संख्या में शून्य लगाओ, फिर खाना कम पड़े तो उधार लो।",
      "All three wordings ask the same difference, and a number minus itself is 0.": "तीनों वाक्य एक ही अंतर पूछते हैं, और संख्या घटा वही संख्या 0 होती है।",
      "You learned: three wordings, one difference; a number minus itself is 0": "तुमने सीखा: तीन वाक्य, एक अंतर; संख्या घटा वही संख्या 0",
      "Take away 1.8 from 6.25.": "6.25 में से 1.8 निकालो।",
      "Take away 1.8 from 6.25": "6.25 में से 1.8 निकालो",
      "You take away from 6.25, so that number starts on top.": "तुम 6.25 में से निकालते हो, इसलिए वही संख्या ऊपर आती है।",
      "Write 1.8 as 1.80 under 6.25, then trade a one, since 2 tenths are too few.": "6.25 के नीचे 1.8 को 1.80 लिखो, फिर एक इकाई उधार लो, 2 दशांश कम हैं।",
      "Take away: 5 take away 0 hundredths, then 12 take away 8 tenths.": "अब घटाओ: 5 में से 0 शतांश, फिर 12 में से 8 दशांश।",
      "Yes, 6.25 take away 1.80 leaves 4.45.": "हाँ, 6.25 में से 1.80 निकालने पर 4.45 बचता है।",
      "What is 9.16 - 9.16?": "9.16 - 9.16 कितना है?",
      "9.16 − 9.16 = ?": "9.16 − 9.16 = ?",
      "The same number is taken from itself, so what is left?": "वही संख्या खुद में से घटी है, तो क्या बचा?",
      "Take away place by place: 6 hundredths take away 6, 1 tenth take away 1.": "हर खाने में घटाओ: 6 शतांश में से 6, 1 दशांश में से 1।",
      "Do the ones too, 9 take away 9, then write what is left in each place.": "इकाई में भी 9 में से 9 घटाओ, फिर हर खाने में जो बचा वह लिखो।",
      "Nothing is left: 9.16 take away 9.16 is 0.": "कुछ नहीं बचा: 9.16 में से 9.16 घटाने पर 0 है।",
      "How much less is 2.9 than 5.14?": "5.14 से 2.9 कितना कम है?",
      "How much less also asks for a difference, so the greater starts.": "कितना कम भी अंतर ही पूछता है, इसलिए बड़ी संख्या ऊपर आती है।",
      "Put 5.14 on top and 2.90 under it, then trade a one for the tenths.": "5.14 ऊपर और 2.90 नीचे रखो, फिर दशांश के लिए एक इकाई उधार लो।",
      "Now 4 hundredths less 0, and 11 tenths less 9, then the ones.": "अब 4 शतांश घटा 0, और 11 दशांश घटा 9, फिर इकाई।",
      "Right, 2.9 is 2.24 less than 5.14.": "सही, 5.14 से 2.9 ठीक 2.24 कम है।",
      "Undoing a mistaken addition": "गलत जोड़ को पलटना",
      "2.5 was added by mistake to give 9.1, so tap Take away 2.5.": "गलती से 2.5 जुड़ा और 9.1 बना, इसलिए 2.5 घटाओ पर टैप करो।",
      "Tap the Take away 2.5 key.": "2.5 घटाओ बटन पर टैप करो।",
      "6.6 is the start, so tap Start on top to take 2.5 away again.": "6.6 शुरुआत है, इसलिए 2.5 फिर घटाने को शुरुआत ऊपर पर टैप करो।",
      "Tap the Start on top key.": "शुरुआत ऊपर बटन पर टैप करो।",
      "Tap Take away to write the right answer.": "सही उत्तर लिखने को घटाओ पर टैप करो।",
      "Tap the Take away key under the frame.": "फ्रेम के नीचे घटाओ बटन पर टैप करो।",
      "Taking the added number away once only gets you back to the start.": "जोड़ी गई संख्या एक बार घटाने से तुम बस शुरुआत पर लौटते हो।",
      "Take the added number away from the start one more time.": "जोड़ी गई संख्या को शुरुआत में से एक बार और घटाओ।",
      "A mistaken addition is undone by taking that number away twice.": "गलत जोड़ उसी संख्या को दो बार घटाकर पलटता है।",
      "You learned: undo a wrong addition by taking the number away twice": "तुमने सीखा: गलत जोड़ पलटने को वह संख्या दो बार घटाओ",
      "1.6 was added instead of taken away, giving 7.9, so what is the right answer?": "1.6 घटाने के बजाय जोड़ दिया और 7.9 आया, तो सही उत्तर क्या है?",
      "Added 1.6, got 7.9. Right answer?": "1.6 जोड़ा, 7.9 आया। सही उत्तर?",
      "Read what the question asks for: the start, or the right answer?": "पढ़ो कि प्रश्न क्या पूछता है: शुरुआत, या सही उत्तर?",
      "7.9 take away 1.6 is 6.3, the start, so take 1.6 away from 6.3 now.": "7.9 में से 1.6 घटाने पर शुरुआत 6.3 है, अब 6.3 में से 1.6 घटाओ।",
      "6.3 has 3 tenths, too few for 6, so trade a one before taking 1.6.": "6.3 में 3 दशांश हैं जो 6 के लिए कम हैं, इसलिए पहले एक इकाई उधार लो।",
      "Yes, the start was 6.3 and the answer is 4.7.": "हाँ, शुरुआत 6.3 थी और उत्तर 4.7 है।",
      "Someone added 2.3 by mistake and got 8.05, so find the wanted answer.": "किसी ने गलती से 2.3 जोड़ा और 8.05 पाया, तो चाहा गया उत्तर निकालो।",
      "Added 2.3, got 8.05. Right answer?": "2.3 जोड़ा, 8.05 आया। सही उत्तर?",
      "8.05 already has the 2.3 inside it: what number was there before?": "8.05 में 2.3 पहले से जुड़ा है: उससे पहले कौन-सी संख्या थी?",
      "8.05 take away 2.30 gives the start, 5.75, so take 2.30 away again.": "8.05 में से 2.30 घटाने पर शुरुआत 5.75 मिलती है, अब 2.30 फिर घटाओ।",
      "No trade is needed: 5 take away 0 hundredths, then 7 take away 3 tenths.": "उधार नहीं चाहिए: 5 में से 0 शतांश, फिर 7 में से 3 दशांश घटाओ।",
      "Right, back to 5.75, then on to 3.45.": "सही, पहले 5.75 पर लौटे, फिर 3.45 पर पहुँचे।",
      "Adding 1.24 by mistake gave 7.3, so what should the answer be?": "गलती से 1.24 जोड़ने पर 7.3 आया, तो उत्तर क्या होना चाहिए?",
      "Added 1.24, got 7.3. Right answer?": "1.24 जोड़ा, 7.3 आया। सही उत्तर?",
      "What was the number before 1.24 was added to it?": "1.24 जुड़ने से पहले संख्या क्या थी?",
      "Undoing gives 6.06, the start, and 1.24 must come off that too.": "पलटने पर शुरुआत 6.06 मिलती है, और उसमें से भी 1.24 घटाना है।",
      "6.06 has no tenths, so trade a one before you take away 2 tenths.": "6.06 में दशांश नहीं हैं, इसलिए 2 दशांश घटाने से पहले एक इकाई उधार लो।",
      "Yes, back to 6.06, then on to 4.82.": "हाँ, पहले 6.06 पर लौटे, फिर 4.82 पर पहुँचे।",
      "Ones": "इकाई",
      "Tenths": "दशांश",
      "Hundredths": "शतांश",
      "Thousandths": "सहस्रांश",
      "Trade": "उधार",
      "Trade from the next column that has some.": "बाईं ओर के उस खाने से उधार लो जिसमें कुछ हो।",
      "Smaller on top": "छोटी संख्या ऊपर",
      "Check": "जाँच",
      "start": "शुरुआत",
      "answer": "उत्तर",
      "start + {x}": "शुरुआत + {x}",
      "Add zeros": "शून्य लगाओ",
      "Point first": "पहले दशमलव",
      "Take away": "घटाओ",
      "Start on top": "शुरुआत ऊपर",
      "New pair": "नई जोड़ी",
      "Take away {x}": "{x} घटाओ",
      "Card {x}": "कार्ड {x}",
      "Wording {x}": "वाक्य {x}",
      "Trade at the ones": "इकाई से उधार",
      "Trade at the tenths": "दशांश से उधार",
      "Trade at the hundredths": "शतांश से उधार",
      "Trade at the thousandths": "सहस्रांश से उधार",
      "Subtract {b} from {a}": "{a} में से|{b} घटाओ",
      "Take away {b} from {a}": "{a} में से|{b} निकालो",
      "How much less is {b} than {a}?": "{a} से {b}|कितना कम है?"
  },
  gu: {
      "Column Subtractor": "સ્તંભ બાદબાકી",
      "Free play: put the greater number on top, trade, take away, then try a new pair.": "મુક્ત રમત: મોટી સંખ્યા ઉપર મૂકો, ઉછીનું લો, બાદ કરો, પછી નવી જોડી લો.",
      "Which number goes on top when you take away decimals?": "દશાંશ સંખ્યા બાદ કરતી વખતે કઈ સંખ્યા ઉપર જાય?",
      "Greater number on top": "મોટી સંખ્યા ઉપર",
      "Tap 7.4, the greater number, to put it on top.": "મોટી સંખ્યા 7.4 ને ઉપર મૂકવા તેના પર ટૅપ કરો.",
      "Tap the card with the bigger number.": "મોટી સંખ્યાવાળા કાર્ડ પર ટૅપ કરો.",
      "7.4 has no hundredths, so tap Add zeros to write 7.40.": "7.4 માં શતાંશ નથી, તેથી 7.40 લખવા શૂન્ય ઉમેરો પર ટૅપ કરો.",
      "Tap the Add zeros key under the frame.": "ફ્રેમની નીચે શૂન્ય ઉમેરો બટન પર ટૅપ કરો.",
      "You cannot take 3 hundredths from 0, so tap the tenths to trade.": "0 માંથી 3 શતાંશ બાદ ન થાય, તેથી ઉછીનું લેવા દશાંશ પર ટૅપ કરો.",
      "Tap the 4 in the tenths column.": "દશાંશના ખાનામાં 4 પર ટૅપ કરો.",
      "You cannot take 6 tenths from 3, so tap the ones to trade.": "3 માંથી 6 દશાંશ બાદ ન થાય, તેથી ઉછીનું લેવા એકમ પર ટૅપ કરો.",
      "Tap the 7 in the ones column.": "એકમના ખાનામાં 7 પર ટૅપ કરો.",
      "No place is short now, so tap Take away to write the difference.": "હવે કોઈ ખાનું ઓછું નથી, તેથી તફાવત લખવા બાદ કરો પર ટૅપ કરો.",
      "Tap the Take away key.": "બાદ કરો બટન પર ટૅપ કરો.",
      "Start at the right and ask if each top digit is big enough.": "જમણેથી શરૂ કરો અને જુઓ કે ઉપરનો દરેક અંક પૂરતો મોટો છે કે નહીં.",
      "Where a top digit is too small, trade one from its left for ten.": "જ્યાં ઉપરનો અંક નાનો હોય, ત્યાં ડાબેથી એક લઈને દસ બનાવો.",
      "Greater number on top, points in one line, and trade where a place is short.": "મોટી સંખ્યા ઉપર, દશાંશ ચિહ્ન એક લીટીમાં, અને ખાનું ઓછું પડે ત્યાં ઉછીનું લો.",
      "You learned: greater number on top, points in line, trade when short": "તમે શીખ્યા: મોટી સંખ્યા ઉપર, દશાંશ એક લીટીમાં, ઓછું પડે તો ઉછીનું",
      "What is 8.3 - 4.56?": "8.3 - 4.56 કેટલા થાય?",
      "8.3 − 4.56 = ?": "8.3 − 4.56 = ?",
      "Write 8.3 as 8.30 first, then trade a tenth for the hundredths.": "પહેલાં 8.3 ને 8.30 લખો, પછી શતાંશ માટે એક દશાંશ ઉછીનો લો.",
      "After that trade the tenths hold 2, too few for 5, so trade a one.": "તે ઉછીના પછી દશાંશમાં 2 બચ્યા, 5 માટે ઓછા, તેથી એક એકમ ઉછીનો લો.",
      "Take away: 10 take away 6 hundredths, then 12 take away 5 tenths.": "હવે બાદ કરો: 10 માંથી 6 શતાંશ, પછી 12 માંથી 5 દશાંશ.",
      "Yes, 8.30 take away 4.56 leaves 3.74.": "હા, 8.30 માંથી 4.56 બાદ કરતાં 3.74 બચે છે.",
      "What is 6.4 - 2.15?": "6.4 - 2.15 કેટલા થાય?",
      "6.4 − 2.15 = ?": "6.4 − 2.15 = ?",
      "6.4 needs a zero first, and its hundredths are short.": "6.4 ને પહેલાં એક શૂન્ય જોઈએ, અને તેના શતાંશ ઓછા પડે છે.",
      "Trade one tenth of 6.40 for ten hundredths, and the tenths keep 3.": "6.40 ના એક દશાંશના બદલે દસ શતાંશ લો, દશાંશમાં 3 બચશે.",
      "Now find 10 minus 5 hundredths and 3 minus 1 tenth, then the ones.": "હવે 10 ઓછા 5 શતાંશ અને 3 ઓછા 1 દશાંશ શોધો, પછી એકમ.",
      "Right, 6.40 minus 2.15 is 4.25.": "સાચું, 6.40 ઓછા 2.15 બરાબર 4.25 છે.",
      "What is 9.2 - 4.608?": "9.2 - 4.608 કેટલા થાય?",
      "9.2 − 4.608 = ?": "9.2 − 4.608 = ?",
      "9.2 is 9.200, so trade down from the tenths, one place at a time.": "9.2 એટલે 9.200, તેથી દશાંશથી શરૂ કરી એક-એક ખાનું ઉછીનું લો.",
      "Trade a tenth, then a hundredth, then a one, each for ten of the next.": "પહેલાં એક દશાંશ, પછી એક શતાંશ, પછી એક એકમને આગળના દસમાં બદલો.",
      "From the right: 10 minus 8 thousandths, then 9 minus 0 hundredths.": "જમણેથી: 10 ઓછા 8 સહસ્રાંશ, પછી 9 ઓછા 0 શતાંશ.",
      "Yes, three places each, and 4.592 is left.": "હા, બંનેમાં ત્રણ-ત્રણ સ્થાન, અને 4.592 બચે છે.",
      "Taking a decimal from a whole number": "પૂર્ણ સંખ્યામાંથી દશાંશ સંખ્યા બાદ કરવી",
      "5 is greater than 1.28, so tap 5 to put it on top.": "5 એ 1.28 કરતાં મોટું છે, તેથી તેને ઉપર મૂકવા 5 પર ટૅપ કરો.",
      "Tap the whole number 5.": "પૂર્ણ સંખ્યા 5 પર ટૅપ કરો.",
      "5 has no point yet, so tap Point first to write it as 5.00.": "5 માં હજી દશાંશ ચિહ્ન નથી, તેથી 5.00 લખવા પહેલાં દશાંશ પર ટૅપ કરો.",
      "Tap the Point first key.": "પહેલાં દશાંશ બટન પર ટૅપ કરો.",
      "There are no tenths to give, so tap the ones to trade one one.": "આપવા માટે દશાંશ નથી, તેથી એક એકમ ઉછીનો લેવા એકમ પર ટૅપ કરો.",
      "Tap the 5 in the ones column.": "એકમના ખાનામાં 5 પર ટૅપ કરો.",
      "Now tap the tenths to trade one tenth for ten hundredths.": "હવે એક દશાંશના બદલે દસ શતાંશ લેવા દશાંશ પર ટૅપ કરો.",
      "Tap the tenths column next.": "હવે દશાંશના ખાના પર ટૅપ કરો.",
      "Tap Take away to see what is left.": "શું બચે છે તે જોવા બાદ કરો પર ટૅપ કરો.",
      "Trade from the left, one place at a time, until no place is short.": "ડાબેથી એક-એક ખાનું ઉછીનું લો, જ્યાં સુધી કોઈ ખાનું ઓછું ન રહે.",
      "Once every top digit is big enough, take away from the right.": "ઉપરનો દરેક અંક પૂરતો મોટો થાય, પછી જમણેથી બાદ કરો.",
      "Before taking away, give a whole number zeros in its empty places.": "બાદ કરતાં પહેલાં પૂર્ણ સંખ્યાનાં ખાલી સ્થાનોમાં શૂન્ય લખો.",
      "You learned: a whole number gets its point and zeros first": "તમે શીખ્યા: પૂર્ણ સંખ્યાને પહેલાં દશાંશ ચિહ્ન અને શૂન્ય મળે",
      "What is 7 - 2.45?": "7 - 2.45 કેટલા થાય?",
      "7 − 2.45 = ?": "7 − 2.45 = ?",
      "The 4 and 5 cannot just drop down, the 7 has empty places above them.": "4 અને 5 સીધા નીચે ન ઊતરે, તેમની ઉપર 7 નાં ખાલી સ્થાન છે.",
      "Break a one into ten tenths, then one of those tenths into ten hundredths.": "એક એકમ તોડીને દસ દશાંશ બનાવો, પછી તેમાંના એક દશાંશના દસ શતાંશ.",
      "Now 10 hundredths less 5, and 9 tenths less 4, then the ones.": "હવે 10 શતાંશ ઓછા 5, અને 9 દશાંશ ઓછા 4, પછી એકમ.",
      "Yes, 7.00 take away 2.45 leaves 4.55.": "હા, 7.00 માંથી 2.45 બાદ કરતાં 4.55 બચે છે.",
      "What is 4 - 1.37?": "4 - 1.37 કેટલા થાય?",
      "4 − 1.37 = ?": "4 − 1.37 = ?",
      "Look at the empty places above 3 and 7: can you take from nothing?": "3 અને 7 ઉપરનાં ખાલી સ્થાન જુઓ: શું ખાલીમાંથી બાદ થાય?",
      "The hundredths need 7 and have none, so trade down from the ones.": "શતાંશને 7 જોઈએ અને ત્યાં કંઈ નથી, તેથી એકમથી ઉછીનું શરૂ કરો.",
      "Take 7 from 10 hundredths and 3 from 9 tenths, then the ones.": "10 શતાંશમાંથી 7 અને 9 દશાંશમાંથી 3 બાદ કરો, પછી એકમ.",
      "Right, 4.00 minus 1.37 is 2.63.": "સાચું, 4.00 ઓછા 1.37 બરાબર 2.63 છે.",
      "Subtract 0.85 from 3.": "3 માંથી 0.85 બાદ કરો.",
      "Subtract 0.85 from 3": "3 માંથી 0.85 બાદ કરો",
      "Which column does the 3 stand in, and what is above the 8 and 5?": "3 કયા ખાનામાં છે, અને 8 અને 5 ની ઉપર શું છે?",
      "0.85 needs tenths and hundredths, so open a one and then a tenth of 3.00.": "0.85 ને દશાંશ અને શતાંશ જોઈએ, તેથી 3.00 નો એક એકમ, પછી એક દશાંશ ખોલો.",
      "Find 10 minus 5 hundredths and 9 minus 8 tenths, then the ones.": "10 ઓછા 5 શતાંશ અને 9 ઓછા 8 દશાંશ શોધો, પછી એકમ.",
      "Yes, 3.00 less 0.85 is 2.15.": "હા, 3.00 ઓછા 0.85 બરાબર 2.15 છે.",
      "Three ways to ask for a difference": "તફાવત પૂછવાની ત્રણ રીત",
      "Tap the first wording to light the number all three start from.": "પહેલા વાક્ય પર ટૅપ કરો, ત્રણેય જેનાથી શરૂ થાય તે સંખ્યા ચમકશે.",
      "Tap Subtract 2.5 from 8.1.": "8.1 માંથી 2.5 બાદ કરો પર ટૅપ કરો.",
      "All three start at 8.1, so tap 8.1 to put it on top.": "ત્રણેય 8.1 થી શરૂ થાય છે, તેથી તેને ઉપર મૂકવા 8.1 પર ટૅપ કરો.",
      "Tap the number they all start from.": "જે સંખ્યાથી ત્રણેય શરૂ થાય, તેના પર ટૅપ કરો.",
      "You cannot take 5 tenths from 1, so tap the ones to trade.": "1 માંથી 5 દશાંશ બાદ ન થાય, તેથી ઉછીનું લેવા એકમ પર ટૅપ કરો.",
      "Tap the 8 in the ones column.": "એકમના ખાનામાં 8 પર ટૅપ કરો.",
      "Tap Take away to write the difference.": "તફાવત લખવા બાદ કરો પર ટૅપ કરો.",
      "Put the number you take away from on top, points in one line.": "જેમાંથી બાદ કરો તે સંખ્યા ઉપર મૂકો, દશાંશ ચિહ્ન એક લીટીમાં.",
      "Give the shorter number its zeros, then trade where a place is short.": "ઓછા અંકવાળી સંખ્યાને શૂન્ય આપો, પછી ખાનું ઓછું પડે ત્યાં ઉછીનું લો.",
      "All three wordings ask the same difference, and a number minus itself is 0.": "ત્રણેય વાક્ય એક જ તફાવત પૂછે છે, અને સંખ્યા ઓછા એ જ સંખ્યા 0 થાય.",
      "You learned: three wordings, one difference; a number minus itself is 0": "તમે શીખ્યા: ત્રણ વાક્ય, એક તફાવત; સંખ્યા ઓછા એ જ સંખ્યા 0",
      "Take away 1.8 from 6.25.": "6.25 માંથી 1.8 કાઢી લો.",
      "Take away 1.8 from 6.25": "6.25 માંથી 1.8 કાઢી લો",
      "You take away from 6.25, so that number starts on top.": "તમે 6.25 માંથી કાઢો છો, તેથી એ જ સંખ્યા ઉપર આવે.",
      "Write 1.8 as 1.80 under 6.25, then trade a one, since 2 tenths are too few.": "6.25 નીચે 1.8 ને 1.80 લખો, પછી એક એકમ ઉછીનો લો, 2 દશાંશ ઓછા છે.",
      "Take away: 5 take away 0 hundredths, then 12 take away 8 tenths.": "હવે બાદ કરો: 5 માંથી 0 શતાંશ, પછી 12 માંથી 8 દશાંશ.",
      "Yes, 6.25 take away 1.80 leaves 4.45.": "હા, 6.25 માંથી 1.80 કાઢતાં 4.45 બચે છે.",
      "What is 9.16 - 9.16?": "9.16 - 9.16 કેટલા થાય?",
      "9.16 − 9.16 = ?": "9.16 − 9.16 = ?",
      "The same number is taken from itself, so what is left?": "એ જ સંખ્યા પોતાનામાંથી બાદ થઈ, તો શું બચ્યું?",
      "Take away place by place: 6 hundredths take away 6, 1 tenth take away 1.": "દરેક ખાનામાં બાદ કરો: 6 શતાંશમાંથી 6, 1 દશાંશમાંથી 1.",
      "Do the ones too, 9 take away 9, then write what is left in each place.": "એકમમાં પણ 9 માંથી 9 બાદ કરો, પછી દરેક ખાનામાં બચે તે લખો.",
      "Nothing is left: 9.16 take away 9.16 is 0.": "કંઈ ન બચ્યું: 9.16 માંથી 9.16 બાદ કરતાં 0 છે.",
      "How much less is 2.9 than 5.14?": "5.14 કરતાં 2.9 કેટલું ઓછું છે?",
      "How much less also asks for a difference, so the greater starts.": "કેટલું ઓછું પણ તફાવત જ પૂછે છે, તેથી મોટી સંખ્યા ઉપર આવે.",
      "Put 5.14 on top and 2.90 under it, then trade a one for the tenths.": "5.14 ઉપર અને 2.90 નીચે મૂકો, પછી દશાંશ માટે એક એકમ ઉછીનો લો.",
      "Now 4 hundredths less 0, and 11 tenths less 9, then the ones.": "હવે 4 શતાંશ ઓછા 0, અને 11 દશાંશ ઓછા 9, પછી એકમ.",
      "Right, 2.9 is 2.24 less than 5.14.": "સાચું, 5.14 કરતાં 2.9 બરાબર 2.24 ઓછું છે.",
      "Undoing a mistaken addition": "ભૂલનો સરવાળો ઉલટાવવો",
      "2.5 was added by mistake to give 9.1, so tap Take away 2.5.": "ભૂલથી 2.5 ઉમેરાયા અને 9.1 થયા, તેથી 2.5 બાદ કરો પર ટૅપ કરો.",
      "Tap the Take away 2.5 key.": "2.5 બાદ કરો બટન પર ટૅપ કરો.",
      "6.6 is the start, so tap Start on top to take 2.5 away again.": "6.6 શરૂઆત છે, તેથી 2.5 ફરી બાદ કરવા શરૂઆત ઉપર પર ટૅપ કરો.",
      "Tap the Start on top key.": "શરૂઆત ઉપર બટન પર ટૅપ કરો.",
      "Tap Take away to write the right answer.": "સાચો જવાબ લખવા બાદ કરો પર ટૅપ કરો.",
      "Tap the Take away key under the frame.": "ફ્રેમની નીચે બાદ કરો બટન પર ટૅપ કરો.",
      "Taking the added number away once only gets you back to the start.": "ઉમેરેલી સંખ્યા એક વાર બાદ કરવાથી તમે ફક્ત શરૂઆત પર પાછા આવો.",
      "Take the added number away from the start one more time.": "ઉમેરેલી સંખ્યા શરૂઆતમાંથી વધુ એક વાર બાદ કરો.",
      "A mistaken addition is undone by taking that number away twice.": "ભૂલનો સરવાળો એ જ સંખ્યા બે વાર બાદ કરવાથી ઉલટાય છે.",
      "You learned: undo a wrong addition by taking the number away twice": "તમે શીખ્યા: ખોટો સરવાળો ઉલટાવવા એ સંખ્યા બે વાર બાદ કરો",
      "1.6 was added instead of taken away, giving 7.9, so what is the right answer?": "1.6 બાદ કરવાને બદલે ઉમેર્યા અને 7.9 આવ્યા, તો સાચો જવાબ શું?",
      "Added 1.6, got 7.9. Right answer?": "1.6 ઉમેર્યા, 7.9 આવ્યા. સાચો જવાબ?",
      "Read what the question asks for: the start, or the right answer?": "પ્રશ્ન શું પૂછે છે તે વાંચો: શરૂઆત, કે સાચો જવાબ?",
      "7.9 take away 1.6 is 6.3, the start, so take 1.6 away from 6.3 now.": "7.9 માંથી 1.6 બાદ કરતાં શરૂઆત 6.3 છે, હવે 6.3 માંથી 1.6 બાદ કરો.",
      "6.3 has 3 tenths, too few for 6, so trade a one before taking 1.6.": "6.3 માં 3 દશાંશ છે જે 6 માટે ઓછા છે, તેથી પહેલાં એક એકમ ઉછીનો લો.",
      "Yes, the start was 6.3 and the answer is 4.7.": "હા, શરૂઆત 6.3 હતી અને જવાબ 4.7 છે.",
      "Someone added 2.3 by mistake and got 8.05, so find the wanted answer.": "કોઈએ ભૂલથી 2.3 ઉમેર્યા અને 8.05 મળ્યા, તો જોઈતો જવાબ શોધો.",
      "Added 2.3, got 8.05. Right answer?": "2.3 ઉમેર્યા, 8.05 આવ્યા. સાચો જવાબ?",
      "8.05 already has the 2.3 inside it: what number was there before?": "8.05 માં 2.3 પહેલેથી ઉમેરાયેલા છે: તે પહેલાં કઈ સંખ્યા હતી?",
      "8.05 take away 2.30 gives the start, 5.75, so take 2.30 away again.": "8.05 માંથી 2.30 બાદ કરતાં શરૂઆત 5.75 મળે, હવે 2.30 ફરી બાદ કરો.",
      "No trade is needed: 5 take away 0 hundredths, then 7 take away 3 tenths.": "ઉછીનું નથી જોઈતું: 5 માંથી 0 શતાંશ, પછી 7 માંથી 3 દશાંશ બાદ કરો.",
      "Right, back to 5.75, then on to 3.45.": "સાચું, પહેલાં 5.75 પર પાછા, પછી 3.45 સુધી.",
      "Adding 1.24 by mistake gave 7.3, so what should the answer be?": "ભૂલથી 1.24 ઉમેરતાં 7.3 આવ્યા, તો જવાબ શું હોવો જોઈએ?",
      "Added 1.24, got 7.3. Right answer?": "1.24 ઉમેર્યા, 7.3 આવ્યા. સાચો જવાબ?",
      "What was the number before 1.24 was added to it?": "1.24 ઉમેરાયા પહેલાં સંખ્યા કઈ હતી?",
      "Undoing gives 6.06, the start, and 1.24 must come off that too.": "ઉલટાવતાં શરૂઆત 6.06 મળે, અને તેમાંથી પણ 1.24 બાદ કરવાના છે.",
      "6.06 has no tenths, so trade a one before you take away 2 tenths.": "6.06 માં દશાંશ નથી, તેથી 2 દશાંશ બાદ કરતાં પહેલાં એક એકમ ઉછીનો લો.",
      "Yes, back to 6.06, then on to 4.82.": "હા, પહેલાં 6.06 પર પાછા, પછી 4.82 સુધી.",
      "Ones": "એકમ",
      "Tenths": "દશાંશ",
      "Hundredths": "શતાંશ",
      "Thousandths": "સહસ્રાંશ",
      "Trade": "ઉછીનું",
      "Trade from the next column that has some.": "ડાબી બાજુના જે ખાનામાં કંઈ હોય ત્યાંથી ઉછીનું લો.",
      "Smaller on top": "નાની સંખ્યા ઉપર",
      "Check": "ચકાસણી",
      "start": "શરૂઆત",
      "answer": "જવાબ",
      "start + {x}": "શરૂઆત + {x}",
      "Add zeros": "શૂન્ય ઉમેરો",
      "Point first": "પહેલાં દશાંશ",
      "Take away": "બાદ કરો",
      "Start on top": "શરૂઆત ઉપર",
      "New pair": "નવી જોડી",
      "Take away {x}": "{x} બાદ કરો",
      "Card {x}": "કાર્ડ {x}",
      "Wording {x}": "વાક્ય {x}",
      "Trade at the ones": "એકમમાંથી ઉછીનું",
      "Trade at the tenths": "દશાંશમાંથી ઉછીનું",
      "Trade at the hundredths": "શતાંશમાંથી ઉછીનું",
      "Trade at the thousandths": "સહસ્રાંશમાંથી ઉછીનું",
      "Subtract {b} from {a}": "{a} માંથી|{b} બાદ કરો",
      "Take away {b} from {a}": "{a} માંથી|{b} કાઢી લો",
      "How much less is {b} than {a}?": "{a} કરતાં {b}|કેટલું ઓછું છે?"
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
    concept: "Greater number on top",
    conceptId: "M3.S5.T11.C50", objectiveIds: ["O19"],
    says: ["Greater number on top. When a place is short, trade from the left."],
    /* the guide: the textbook's own example, 7.40 - 2.63 = 4.77 (CS_GUIDE[1]); one tap a step, each on the control it names */
    steps: [
      { say: "Tap 7.4, the greater number, to put it on top.", on: "card-2", hint: "Tap the card with the bigger number." },
      { say: "7.4 has no hundredths, so tap Add zeros to write 7.40.", on: "zeros", hint: "Tap the Add zeros key under the frame." },
      { say: "You cannot take 3 hundredths from 0, so tap the tenths to trade.", on: "col-1", hint: "Tap the 4 in the tenths column." },
      { say: "You cannot take 6 tenths from 3, so tap the ones to trade.", on: "col-0", hint: "Tap the 7 in the ones column." },
      { say: "No place is short now, so tap Take away to write the difference.", on: "take", hint: "Tap the Take away key." },
    ],
    stepHold: 2600,
    /* tries, as the plan writes it: First rung: put the greater number on top. Second rung: take away the rightmost column. Third rung: the same task with no trade, before trades return. */
    ladder: ["Start at the right and ask if each top digit is big enough.", "Where a top digit is too small, trade one from its left for ten."],
    closing: "Greater number on top, points in one line, and trade where a place is short.",
    learned: "You learned: greater number on top, points in line, trade when short",
    traceback: "The greater number goes on top with the points in one line and its zeros written in violet; each short place takes one block of its left neighbour, broken into ten (the old digit struck through in ink, the new one written above in vermilion); the difference is written green from the right, ending on the whole answer.",
    /* unused plan question: M3.S5.T11.C50:1 (5.87 - 2.43 = 3.44) has no trade, so its misconception (the smaller digit
       from the larger in every column) gives the right answer; the phase keeps three questions that trade */
    items: [
      /* learn CS1: answer in the plan = 3.74 */
      { qid: "M3.S5.T11.C50:CS1", kind: "column", top: "8.3", bot: "4.56", tray: ["4.56", "8.3"], near: "4.26",
        say: "What is 8.3 - 4.56?", ask: "8.3 − 4.56 = ?", answer: "3.74",
        miss: "Write 8.3 as 8.30 first, then trade a tenth for the hundredths.",
        ladder: ["After that trade the tenths hold 2, too few for 5, so trade a one.", "Take away: 10 take away 6 hundredths, then 12 take away 5 tenths."], win: "Yes, 8.30 take away 4.56 leaves 3.74." },
      /* practice 3: answer in the plan = 4.25. Write 6.4 as 6.40, and trade 1 tenth for 10 hundredths */
      { qid: "M3.S5.T11.C50:3", kind: "column", top: "6.4", bot: "2.15", tray: ["6.4", "2.15"], near: "4.35",
        say: "What is 6.4 - 2.15?", ask: "6.4 − 2.15 = ?", answer: "4.25",
        miss: "6.4 needs a zero first, and its hundredths are short.",
        ladder: ["Trade one tenth of 6.40 for ten hundredths, and the tenths keep 3.", "Now find 10 minus 5 hundredths and 3 minus 1 tenth, then the ones."], win: "Right, 6.40 minus 2.15 is 4.25." },
      /* practice 8: answer in the plan = 4.592, because 9.200 - 4.608 = 4.592 */
      { qid: "M3.S5.T11.C50:8", kind: "column", top: "9.2", bot: "4.608", tray: ["4.608", "9.2"], near: "5.408",
        say: "What is 9.2 - 4.608?", ask: "9.2 − 4.608 = ?", answer: "4.592",
        miss: "9.2 is 9.200, so trade down from the tenths, one place at a time.",
        ladder: ["Trade a tenth, then a hundredth, then a one, each for ten of the next.", "From the right: 10 minus 8 thousandths, then 9 minus 0 hundredths."], win: "Yes, three places each, and 4.592 is left." },
    ],
  },
  {
    n: 2,
    concept: "Taking a decimal from a whole number",
    conceptId: "M3.S5.T11.C51", objectiveIds: ["O19"],
    says: ["Five has no tenths and no hundredths yet. What do you trade?"],
    /* the guide: the textbook's 5.00 - 1.28 = 3.72 (CS_GUIDE[2]) */
    steps: [
      { say: "5 is greater than 1.28, so tap 5 to put it on top.", on: "card-2", hint: "Tap the whole number 5." },
      { say: "5 has no point yet, so tap Point first to write it as 5.00.", on: "zeros", hint: "Tap the Point first key." },
      { say: "There are no tenths to give, so tap the ones to trade one one.", on: "col-0", hint: "Tap the 5 in the ones column." },
      { say: "Now tap the tenths to trade one tenth for ten hundredths.", on: "col-1", hint: "Tap the tenths column next." },
      { say: "Tap Take away to see what is left.", on: "take", hint: "Tap the Take away key." },
    ],
    stepHold: 2600,
    /* tries, as the plan writes it: First rung: write the whole number's point and zeros. Second rung: make the first trade. Third rung: the same task with one place after the point, before two return. */
    ladder: ["Trade from the left, one place at a time, until no place is short.", "Once every top digit is big enough, take away from the right."],
    closing: "Before taking away, give a whole number zeros in its empty places.",
    learned: "You learned: a whole number gets its point and zeros first",
    traceback: "The whole number goes on top in the ones column and gets its point and zeros in violet; the trades run one place at a time, one one into ten tenths, then one tenth into ten hundredths (struck in ink, rewritten in vermilion); the difference is written green.",
    items: [
      /* learn CS2: answer in the plan = 4.55 */
      { qid: "M3.S5.T11.C51:CS2", kind: "whole", top: "7", bot: "2.45", tray: ["7", "2.45"], near: "5.45",
        say: "What is 7 - 2.45?", ask: "7 − 2.45 = ?", answer: "4.55",
        miss: "The 4 and 5 cannot just drop down, the 7 has empty places above them.",
        ladder: ["Break a one into ten tenths, then one of those tenths into ten hundredths.", "Now 10 hundredths less 5, and 9 tenths less 4, then the ones."], win: "Yes, 7.00 take away 2.45 leaves 4.55." },
      /* practice 4: answer in the plan = 2.63. Write 4 as 4.00 before taking away */
      { qid: "M3.S5.T11.C51:4", kind: "whole", top: "4", bot: "1.37", tray: ["1.37", "4"], near: "3.37",
        say: "What is 4 - 1.37?", ask: "4 − 1.37 = ?", answer: "2.63",
        miss: "Look at the empty places above 3 and 7: can you take from nothing?",
        ladder: ["The hundredths need 7 and have none, so trade down from the ones.", "Take 7 from 10 hundredths and 3 from 9 tenths, then the ones."], win: "Right, 4.00 minus 1.37 is 2.63." },
      /* practice 6: answer in the plan = 2.15, because 3.00 - 0.85 = 2.15 */
      { qid: "M3.S5.T11.C51:6", kind: "whole", top: "3", bot: "0.85", tray: ["0.85", "3"], near: "3.85",
        say: "Subtract 0.85 from 3.", ask: "Subtract 0.85 from 3", answer: "2.15",
        miss: "Which column does the 3 stand in, and what is above the 8 and 5?",
        ladder: ["0.85 needs tenths and hundredths, so open a one and then a tenth of 3.00.", "Find 10 minus 5 hundredths and 9 minus 8 tenths, then the ones."], win: "Yes, 3.00 less 0.85 is 2.15." },
    ],
  },
  {
    n: 3,
    concept: "Three ways to ask for a difference",
    conceptId: "M3.S5.T11.C52", objectiveIds: ["O20"],
    says: ["Three ways to say it. Which number starts on top each time?"],
    /* the guide: the textbook's 8.1 - 2.5 = 5.6 in its three wordings (CS_GUIDE[3]) */
    steps: [
      { say: "Tap the first wording to light the number all three start from.", on: "word-1", hint: "Tap Subtract 2.5 from 8.1." },
      { say: "All three start at 8.1, so tap 8.1 to put it on top.", on: "card-2", hint: "Tap the number they all start from." },
      { say: "You cannot take 5 tenths from 1, so tap the ones to trade.", on: "col-0", hint: "Tap the 8 in the ones column." },
      { say: "Tap Take away to write the difference.", on: "take", hint: "Tap the Take away key." },
    ],
    stepHold: 2600,
    /* tries, as the plan writes it: First rung: find the number that starts. Second rung: put it on top. Third rung: the same task with one wording, before all three return. */
    ladder: ["Put the number you take away from on top, points in one line.", "Give the shorter number its zeros, then trade where a place is short."],
    closing: "All three wordings ask the same difference, and a number minus itself is 0.",
    learned: "You learned: three wordings, one difference; a number minus itself is 0",
    traceback: "The Wording card lights the number every wording starts from; the frame puts it on top, writes the zeros, trades where a place is short and writes the difference green, the same difference for all three wordings.",
    items: [
      /* learn CS3: answer in the plan = 4.45 */
      { qid: "M3.S5.T11.C52:CS3", kind: "wording", top: "6.25", bot: "1.8", tray: ["1.8", "6.25"], word: 1, near: "5.65",
        say: "Take away 1.8 from 6.25.", ask: "Take away 1.8 from 6.25", answer: "4.45",
        miss: "You take away from 6.25, so that number starts on top.",
        ladder: ["Write 1.8 as 1.80 under 6.25, then trade a one, since 2 tenths are too few.", "Take away: 5 take away 0 hundredths, then 12 take away 8 tenths."], win: "Yes, 6.25 take away 1.80 leaves 4.45." },
      /* practice 2: answer in the plan = 0. A number minus itself is 0 */
      { qid: "M3.S5.T11.C52:2", kind: "wording", top: "9.16", bot: "9.16", tray: ["9.16", "9.16"], word: null, near: "18.32",
        say: "What is 9.16 - 9.16?", ask: "9.16 − 9.16 = ?", answer: 0,
        miss: "The same number is taken from itself, so what is left?",
        ladder: ["Take away place by place: 6 hundredths take away 6, 1 tenth take away 1.", "Do the ones too, 9 take away 9, then write what is left in each place."], win: "Nothing is left: 9.16 take away 9.16 is 0." },
      /* practice 5: answer in the plan = 2.24, because 5.14 - 2.90 = 2.24 */
      { qid: "M3.S5.T11.C52:5", kind: "wording", top: "5.14", bot: "2.9", tray: ["2.9", "5.14"], word: 2, near: "3.84",
        say: "How much less is 2.9 than 5.14?", ask: "How much less is 2.9 than 5.14?", answer: "2.24",
        miss: "How much less also asks for a difference, so the greater starts.",
        ladder: ["Put 5.14 on top and 2.90 under it, then trade a one for the tenths.", "Now 4 hundredths less 0, and 11 tenths less 9, then the ones."], win: "Right, 2.9 is 2.24 less than 5.14." },
    ],
  },
  {
    n: 4,
    concept: "Undoing a mistaken addition",
    conceptId: "M3.S5.T11.C53", objectiveIds: ["O20"],
    says: ["First get back to the start. Then do the subtraction that was wanted."],
    /* the guide: the textbook's 9.1 - 2.5 = 6.6, the start, then 6.6 - 2.5 = 4.1 (CS_GUIDE[4]) */
    steps: [
      { say: "2.5 was added by mistake to give 9.1, so tap Take away 2.5.", on: "undo", hint: "Tap the Take away 2.5 key." },
      { say: "6.6 is the start, so tap Start on top to take 2.5 away again.", on: "ontop", hint: "Tap the Start on top key." },
      { say: "Tap Take away to write the right answer.", on: "take", hint: "Tap the Take away key under the frame." },
    ],
    stepHold: 2600,
    /* tries, as the plan writes it: First rung: take the added number away once. Second rung: check that is the starting number. Third rung: the same task with whole numbers, before decimals return. */
    ladder: ["Taking the added number away once only gets you back to the start.", "Take the added number away from the start one more time."],
    closing: "A mistaken addition is undone by taking that number away twice.",
    learned: "You learned: undo a wrong addition by taking the number away twice",
    traceback: "The frame takes the added number away from the wrong result once and the start appears green; the start goes on top, the added number is taken away again, trading where short, and the right answer lands green.",
    items: [
      /* learn CS4: answer in the plan = 4.7. Plan: Someone added 1.6 to a number instead of subtracting it, and got 7.9. What is the right answer? */
      { qid: "M3.S5.T11.C53:CS4", kind: "undo", got: "7.9", added: "1.6", start: "6.3", near: "6.3",
        say: "1.6 was added instead of taken away, giving 7.9, so what is the right answer?",
        ask: "Added 1.6, got 7.9. Right answer?", answer: "4.7",
        miss: "Read what the question asks for: the start, or the right answer?",
        ladder: ["7.9 take away 1.6 is 6.3, the start, so take 1.6 away from 6.3 now.", "6.3 has 3 tenths, too few for 6, so trade a one before taking 1.6."], win: "Yes, the start was 6.3 and the answer is 4.7." },
      /* practice 7: answer in the plan = 3.45. First 8.05 - 2.30 = 5.75, the starting number. Then 5.75 - 2.30 = 3.45.
         Plan: Someone added 2.3 to a number instead of subtracting it, and got 8.05. What is the right answer? */
      { qid: "M3.S5.T11.C53:7", kind: "undo", got: "8.05", added: "2.3", start: "5.75", near: "5.75",
        say: "Someone added 2.3 by mistake and got 8.05, so find the wanted answer.",
        ask: "Added 2.3, got 8.05. Right answer?", answer: "3.45",
        miss: "8.05 already has the 2.3 inside it: what number was there before?",
        ladder: ["8.05 take away 2.30 gives the start, 5.75, so take 2.30 away again.", "No trade is needed: 5 take away 0 hundredths, then 7 take away 3 tenths."], win: "Right, back to 5.75, then on to 3.45." },
      /* authored: the plan gives this concept two questions and the textbook's own 9.1 - 2.5 is the guide's example;
         7.30 - 1.24 = 6.06 (a place-holding zero in the start), then 6.06 - 1.24 = 4.82 */
      { qid: null, kind: "undo", got: "7.3", added: "1.24", start: "6.06", near: "6.06",
        say: "Adding 1.24 by mistake gave 7.3, so what should the answer be?",
        ask: "Added 1.24, got 7.3. Right answer?", answer: "4.82",
        miss: "What was the number before 1.24 was added to it?",
        ladder: ["Undoing gives 6.06, the start, and 1.24 must come off that too.", "6.06 has no tenths, so trade a one before you take away 2 tenths."], win: "Yes, back to 6.06, then on to 4.82." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
/* item fields of this tool: top / bot = the two numbers (top is the greater); tray = the order the two cards wait in
   (the smaller one often first, as the question names it); near = the item's misconception; word = which of the three
   wordings the question uses (phase 3); got / added / start = the mistaken result, the number added by mistake and the
   starting number (phase 4). */
/* the frame (working-area units). It is laid out from the width the working area has with the keypad OPEN (1086) and
   stays at that size and place open or shut, so nothing moves under the child's finger while they type */
/* column widths: Ones narrower, the places after the point wider (four columns: "Hundredths" and "Thousandths" side by side at 32) */
const CS = { cols3: [160, 200, 200], cols4: [160, 240, 240, 240], rh: 84, lm: 112, sw: 380, gap: 20, tc: 110, openW: 1086,
  y: { head: 36, trade: 52, top: 114, bot: 206, rule: 302, diff: 312, tray: 420, key: 426 } };
const CS_PLACES = ["Ones", "Tenths", "Hundredths", "Thousandths"];
/* the chapter's colours: given deep blue, result green, a trade vermilion, an added zero violet, taken away rose,
   the place being worked on amber, a place-holding zero grey; every strike-through is ink */
const CS_INK = { given: CONTENT.hundred, result: CONTENT.one, trade: CONTENT.pointer, zero: "#7B4FB8", taken: CONTENT.bead, now: CONTENT.ten, hold: "#767676" };
/* each phase's guide: the textbook's own worked example (never a question of the phase) */
const CS_GUIDE: any = {
  1: { top: "7.4", bot: "2.63", tray: ["2.63", "7.4"] },
  2: { top: "5", bot: "1.28", tray: ["1.28", "5"] },
  3: { top: "8.1", bot: "2.5", tray: ["2.5", "8.1"], word: null },
  4: { got: "9.1", added: "2.5", start: "6.6", answer: "4.1" },
};
/* Free play: a pair at a time, the next one on New pair */
const CS_FREE = [["3.5", "6.12"], ["0.48", "2"], ["4.075", "9.3"], ["1.9", "5.06"], ["7", "3.25"]];
const CS_WORDS = [["Subtract {b}", "from {a}"], ["Take away {b}", "from {a}"], ["How much less", "is {b} than {a}?"]];
const MODEL = { columns: CS_PLACES, frame: { columnWidths: { three: CS.cols3, four: CS.cols4 }, rowHeight: CS.rh, rows: CS.y, layoutWidth: CS.openW },
  guide: CS_GUIDE, freePairs: CS_FREE, wordings: CS_WORDS.map((w) => w.join(" ")) };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a decimal is judged in its written form, exactly ("4.25", not "4.250" or "4.2500"); the one whole-number
   answer (9.16 - 9.16) takes 0 and the column's own 0.00 */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return item.answer === 0 ? /^0(\.0{1,3})?$/.test(String(v).trim()) : leadNumber(v) === item.answer;
  return String(v).trim() === String(item.answer);
};
/* oracle: every answer re-derived in whole thousandths (no column, no digit, no floating point), written with as many
   places as the longer number has; a phase 4 answer also checks the starting number, and every guide example its own */
const csMilli = (s: any) => { const t = String(s).split("."); return Number(t[0]) * 1000 + Number(((t[1] || "") + "000").slice(0, 3)); };
const csWrite = (m: number, pl: number) => String(Math.floor(m / 1000)) + (pl ? "." + String(m % 1000).padStart(3, "0").slice(0, pl) : "");
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const nums = [it.top, it.bot, it.got, it.added].filter((x: any) => x !== undefined);
  const pl = Math.max(...nums.map((x: any) => (String(x).split(".")[1] || "").length));
  if (it.got !== undefined && csWrite(csMilli(it.got) - csMilli(it.added), pl) !== String(it.start)) return false;
  const m = it.got !== undefined ? csMilli(it.got) - 2 * csMilli(it.added) : csMilli(it.top) - csMilli(it.bot);
  if (m < 0 || (it.top !== undefined && (csMilli(it.top) < csMilli(it.bot) || it.tray.slice().sort().join() !== [it.top, it.bot].sort().join()))) return false;
  return typeof it.answer === "number" ? m === it.answer * 1000 : csWrite(m, pl) === it.answer;
}));
/* the most likely wrong answer (the misconception); judge must reject it */
const nearMiss = (item: any) => (item.near !== undefined ? item.near : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
  : /^\d*\.\d+$/.test(String(item.answer)) ? [String(item.answer), speakable(item.answer)] : [String(item.answer)]);
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer(): toolApi.answer strips the point, so a decimal is typed whole through the tool (PATTERNS §4) */
const answer = (item: any, v: any) => (HOOK.type ? (HOOK.type(String(v)), true) : undefined);
/* the agent's check() before Enter: e.g. drop a token that waits; undefined = press Enter. In a guide-steps phase
   (stage "demo") it must return undefined, so the agent's check() reaches api.onEnter and performs the current step:
   set HOOK.check only while a question is open */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area ────────────────────────────────────────────────────────────────────────
   Its size is `box` ({ w, h, open }): the whole card (1472 x 528) with the answer panel shut and 1086 x 528 with it
   open, easing between (the board layout, docs/LAYOUT.md §1b, docs/PATTERNS.md §14): lay everything out from box.w
   with plain arithmetic in render, never from constants or api.W. Origin at the area's top-left.
   keyOnly (LAYOUT.md §1d): the question bar is gone, so the working area is 64,108, 1472 x 520 (NOT 64,202 x 528) with the panel shut, 1086 (900
   with bigPad) x 520 open. box.key = { x, y, w, h } is the key's corner in THIS area's coordinates (about x 1190, y 0, 282 x 88; wider on a
   Yes/No question): keep every element out of it, e.g. const kx = box.key ? box.key.x - 12 : box.w; (board-fit). There is no runs zone.
   Every act (cut, measure, count, tidy ...) is performed on screen: await api.act({ tool, moves, at, onPoint }) from the child's tap and
   react only when it resolves true (PATTERNS.md §15).
   Countable things use CONTENT colours (url(#gHundred|gTen|gOne|gBead|gPointer)); coloured numerals
   and words use a deeper ink, shade(colour, 0.25), so they read at 4.5:1. Type uses T.* only.
   Pieces: drag = useDrag(onDrop) then {...control(id, label), ...drag.bind(pay), ...drag.keys(pay)};
   taps = <Hit id x y w h onPress label />. One <Invite/> marks the one thing to touch.
   Nothing is written here that the bubble already says. `wrong` = { value, tries } after a miss:
   lock, redraw the mathematics in steps (the traceback), unlock; never mark it, never reset it.
   stage === "free" is Free play (the plan's writeup.freePlay): no target, every control unlocked.
   Sound effects where the picture moves: api.sfx.cut() (a knife), settle() (pieces come to rest),
   trade() (pieces close into one), tick() (a snap); correct, wrong, win and cheer are the runtime's.
   step / stepOn: the guide step the child is on and the act it waits for (null outside a steps phase).
   nextKey: true (the ToolFrame below, runtime r48+): nothing moves on by itself. After a right answer the win picture
   stays on the board until the child presses the blinking Next key, so never reset it on a timer (PATTERNS.md 9d).
   A SKIN (docs/IMAGES.md, docs/PATTERNS.md §14): when the slot has an images.tsx, draw <Skin name x y w h clip /> over
   the plain shape the tool already draws for the object (the plain shape stays the fallback); never a raster tag of your own here (no-raster-in-tool).
   */
/* ── the frame's own arithmetic (the picture; the oracle above shares none of it) ── */
const csParts = (s: any) => { const t = String(s), k = t.indexOf("."); return k < 0 ? { i: t, d: "", whole: true } : { i: t.slice(0, k) || "0", d: t.slice(k + 1), whole: false }; };
const csPl = (s: any) => csParts(s).d.length;
const csN = (x: any) => x || 0;
const csCard = (v: any, row: string) => ({ v: String(v), row, z: false });
/* a fresh frame: the two cards in the tray, or, on phase 4, the mistaken result and the added number already in the frame */
function csInit(g: any, n: number, free: boolean, fi = 0, open = false) {
  const base = { trades: [] as number[], diffN: 0, zN: 0, lit: false, check: false, undo: 0, flash: null, carry: null, sx: 0, gap: false, refuse: null, rest: null, fi };
  if (free) { const p = CS_FREE[fi % CS_FREE.length]; return { ...base, cards: { a: csCard(p[0], "tray"), b: csCard(p[1], "tray") } }; }
  if (n === 4) return { ...base, cards: { a: csCard(g.got, open ? "top" : "tray"), b: csCard(g.added, open ? "bot" : "tray") } };
  return { ...base, cards: { a: csCard(g.tray[0], "tray"), b: csCard(g.tray[1], "tray") } };
}
/* what the frame holds: which card is on top, whether it may start (greater on top, the zeros and a whole number's
   point written), the top digits after the trades, which place is short, and the difference */
function csFrame(S: any) {
  const at = (r: string) => (S.cards.a.row === r ? "a" : S.cards.b.row === r ? "b" : null);
  const top = at("top"), bot = at("bot");
  const maxP = Math.max(csPl(S.cards.a.v), csPl(S.cards.b.v));
  const lit = !!top && !!bot && +S.cards[top].v < +S.cards[bot].v;
  const ready = !!top && !!bot && !lit;
  const owes = (k: string) => !S.cards[k].z && (csParts(S.cards[k].v).whole || csPl(S.cards[k].v) < maxP);
  const owed = ready && (owes("a") || owes("b"));
  const started = ready && !owed;
  const digits = (k: string | null) => {
    const out: any[] = [null, null, null, null];
    if (!k) return out;
    const c = S.cards[k], p = csParts(c.v);
    out[0] = +p.i;
    p.d.split("").forEach((ch: string, q: number) => { out[q + 1] = +ch; });
    if (c.z) for (let col = p.d.length + 1; col <= maxP; col++) out[col] = 0;
    return out;
  };
  const T0 = digits(top), bd = digits(bot);
  const tin = [0, 0, 0, 0], tout = [0, 0, 0, 0];
  (S.trades || []).forEach((m: number) => { tout[m]++; tin[m + 1]++; });
  const cur = T0.map((d: any, c: number) => (d === null && !tin[c] ? null : csN(d) + 10 * tin[c] - tout[c]));
  const needs = (j: number): boolean => j <= maxP && (csN(cur[j]) < csN(bd[j]) || (csN(cur[j]) === 0 && needs(j + 1)));
  const can = (k: number) => started && k >= 0 && k < maxP && csN(cur[k]) >= 1 && needs(k + 1);
  /* a tap on a column trades from it, or, on a short place, from the place to its left */
  const pick = (c: number) => (can(c) ? c : c >= 1 && needs(c) && can(c - 1) ? c - 1 : null);
  const short = [0, 1, 2, 3].filter((c) => started && c <= maxP && csN(cur[c]) < csN(bd[c]));
  const diff = [0, 1, 2, 3].map((c) => (c <= maxP ? csN(cur[c]) - csN(bd[c]) : null));
  const diffStr = String(diff[0]) + (maxP ? "." + diff.slice(1, maxP + 1).join("") : "");
  const written = (k: string | null) => { if (!k) return ""; const p = csParts(S.cards[k].v); return p.i + (maxP ? "." + (p.d + "000").slice(0, maxP) : ""); };
  return { top, bot, maxP, lit, ready, owes, owed, started, cur, bd, tin, tout, needs, can, pick, short, diff, diffStr, written };
}
/* the book's order of trades: from the right, a short place takes one from the nearest place to its left that has one,
   through the zeros between (5.00 - 1.28: one one into tenths, then one tenth into hundredths) */
function csPlan(cur: any[], bd: any[], maxP: number) {
  const c2 = cur.map(csN), b = bd.map(csN), out: number[] = [];
  for (let c = maxP; c >= 1; c--) {
    if (c2[c] >= b[c]) continue;
    let k = c - 1;
    while (k >= 0 && c2[k] === 0) k--;
    if (k < 0) break;
    for (let m = k; m < c; m++) { c2[m] -= 1; c2[m + 1] += 10; out.push(m); }
  }
  return out;
}
/* a wording template ("from {a}") with its numbers, the starting one lit */
const csFill = (tpl: string, a: string, b: string, litA: boolean, litInk: string) =>
  tpl.split(/(\{a\}|\{b\})/).filter(Boolean).map((p: string, q: number) => (p === "{a}" ? <tspan key={q} fill={litA ? litInk : undefined} fontWeight={litA ? 800 : undefined}>{a}</tspan> : p === "{b}" ? <tspan key={q}>{b}</tspan> : <tspan key={q}>{p}</tspan>));
/* key ids: never "again" (the header's Hint key is data-control "again") */
/* the add-back check under the frame */
const CS_CHECK = 48;
const CS_KEY: any = { take: "Take away", ontop: "Start on top", new: "New pair" };

function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const stepOnR = useRef<any>(null);
  stepOnR.current = stepOn;   /* the guide's awaited act, read after an act ends (the closure's stepOn is stale) */
  const reduced = reducedMotion();
  const free = stage === "free";
  const demo = stage === "demo";
  const warm = demo || stage === "teach";   /* a phase opens on "teach" for one frame before "demo": draw the guide then too */
  const k4 = n === 4 && !free;
  /* the example in play: the phase's guide during the steps, the question after (free play reads no item) */
  const ex: any = free ? {} : warm ? CS_GUIDE[n] : item || {};
  const sk = free ? "free" : n + ":" + (warm ? "d" : index);
  const fresh = (fi = 0) => ({ ...csInit(ex, n, free, fi, warm), key: sk });
  const [S0, setS] = useState<any>(() => fresh());
  const S: any = S0.key === sk ? S0 : fresh();
  const SR = useRef<any>(S);
  SR.current = S;
  const skR = useRef(sk);
  skR.current = sk;
  const still = (mine: string) => skR.current === mine;
  const upd = (fn: (s: any) => any) => setS((p: any) => ({ ...fn(p.key === sk ? p : fresh()), key: sk }));
  /* a new question: a fresh frame, unless an act of the new question already wrote its own (the effect can land late) */
  useEffect(() => { if (S0.key !== sk) { tl.stop(); setS((p: any) => (p.key === sk ? p : fresh())); } }, [sk]);
  const flashT = useRef<any>(null);
  const shakeT = useRef<any[]>([]);
  useEffect(() => () => { if (flashT.current) clearTimeout(flashT.current); shakeT.current.forEach(clearTimeout); }, []);
  /* is help showing? Work gets no hint prop, so the Hint key (or a miss's rung) is read from getState() and latched for
     the question (PATTERNS §18); phase 4's helper keys and Undo-panel rows wait for it */
  const [helped, setHelped] = useState("");
  useEffect(() => {
    if (n !== 4 || free || stage !== "ask" || helped === sk) return;
    const id = setInterval(() => {
      try { const g = (window as any).toolApi && (window as any).toolApi.getState(); if (g && g.hint && g.hintKind !== "type") setHelped(skR.current); } catch (e) { /* no api yet */ }
    }, 250);
    return () => clearInterval(id);
  }, [n, free, stage, sk, helped]);

  const f = csFrame(S);
  /* the layout: laid out for the open keypad (1086 wide) and kept there, open or shut */
  const nc = free || n === 1 ? 4 : 3;
  const side = !free && (n === 3 || n === 4);
  const CWS = nc === 4 ? CS.cols4 : CS.cols3;
  const FW = CWS.reduce((a: number, b: number) => a + b, 0);
  const groupW = CS.lm + FW + (side ? CS.gap + CS.sw : 0);
  const GX = Math.max(4, Math.round((CS.openW - groupW) / 2));
  const FX = GX + CS.lm, SX = FX + FW + CS.gap;
  const Y = CS.y, RH = CS.rh;
  const colX = (c: number) => FX + CWS.slice(0, c).reduce((a: number, b: number) => a + b, 0);
  const cwOf = (c: number) => CWS[Math.min(c, CWS.length - 1)];
  const cxOf = (c: number) => colX(c) + cwOf(c) / 2;
  /* a card's cells, from its own left edge: the frame's columns, or equal cells in the tray */
  const frameCols = (c: number) => ({ x: colX(c) - FX, w: cwOf(c) });
  const trayCols = (c: number) => ({ x: c * CS.tc, w: CS.tc });
  const rowY = (r: string) => (r === "top" ? Y.top : Y.bot);
  /* the side cards start level with the frame's top; Wording rows hold two lines at a 1.6 em pitch (Devanagari and Gujarati
     rise about 1.1 em and fall 0.4 em), with room above the first and below the second */
  const WC = { y0: Y.trade - 4, rh: 120, gap: 8, b1: 50, b2: 101, row: (k: number) => Y.trade + 4 + k * 128, h: 3 * 128 + 12 };
  const UP = { y0: Y.trade - 4, a1: Y.trade + 56, a2: Y.trade + 122, d1: Y.trade + 144, b: Y.trade + 206, d2: Y.trade + 228, c: Y.trade + 290, hA: 152, h: 316 };
  const ink = (hex: string, t = 0.25) => shade(hex, t);
  const fullDiff = f.started && S.diffN > f.maxP;
  const missed = !!(wrong && wrong.tries >= 1);
  /* help has been given on this question: a miss or the Hint key (the guide counts as help) */
  const help = demo || missed || helped === sk;
  /* phase 4 opens with the cards in the tray; help sets the frame up (the mistaken result on top, the added number below) */
  useEffect(() => {
    if (k4 && help && S.undo === 0 && S.cards.a.row === "tray") upd((s) => (s.cards.a.row !== "tray" ? s : { ...s, cards: { a: { ...s.cards.a, row: "top" }, b: { ...s.cards.b, row: "bot" } } }));
  }, [k4, help, S.undo, S.cards.a.row]);
  const live = (demo || stage === "ask" || free) && !tl.busy;

  /* the teacher agent types a decimal whole (PATTERNS §4) */
  HOOK.type = (s: string) => api.setTyped(s);

  /* ── where each card sits: the tray (compact cells) or its row of the frame ── */
  const tw = (k: string) => (1 + csPl(S.cards[k].v)) * CS.tc;
  const trayX0 = FX + Math.round((FW - (tw("a") + 48 + tw("b"))) / 2);
  const trayX: any = { a: trayX0, b: trayX0 + tw("a") + 48 };
  const cardAt = (k: string) => {
    const c = S.cards[k];
    if (c.row === "tray") return { x: trayX[k], y: Y.tray, w: tw(k), cols: trayCols };
    return { x: FX, y: rowY(c.row), w: colX(1 + csPl(c.v)) - FX, cols: frameCols };
  };
  /* one card, drawn from its own top-left corner: the given digits in blue (a place-holding 0 grey), the zeros and a
     whole number's point written after it in violet, the point on the point line */
  const cardBody = (v: string, zVis: number, pt: boolean, cols: (c: number) => any, hue: string, lift = false) => {
    const p = csParts(v), nG = 1 + p.d.length, by = 62, mid = (c: number) => cols(c).x + cols(c).w / 2;
    return (
      <g>
        <rect x={4} y={0} width={cols(nG - 1).x + cols(nG - 1).w - 8} height={RH} rx={16} fill={tint(hue, 0.86)} stroke={hue} strokeWidth={3} filter={lift ? "url(#fLift)" : "url(#fShadowSoft)"} />
        {Array.from({ length: zVis }).map((_, j) => (
          <g key={"z" + j}>
            <rect x={cols(nG + j).x + 4} y={0} width={cols(nG + j).w - 8} height={RH} rx={16} fill={tint(CS_INK.zero, 0.88)} stroke={CS_INK.zero} strokeWidth={3} strokeDasharray="10 7" />
            <text x={mid(nG + j)} y={by} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={ink(CS_INK.zero)}>0</text>
          </g>
        ))}
        {(p.i + p.d).split("").map((ch: string, q: number) => (
          <text key={q} x={mid(q)} y={by} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={ch === "0" ? CS_INK.hold : ink(hue)}>{ch}</text>
        ))}
        {/* the point: a drawn dot on the line between the ones and the tenths (a "." glyph is a speck from the back row) */}
        {pt && <circle cx={cols(1).x} cy={by - 5} r={8} fill={p.whole ? ink(CS_INK.zero) : C.ink} stroke="#FFFFFF" strokeWidth={3} />}
      </g>
    );
  };
  /* how much of a card's zeros show: all once written, one by one while the pencil writes them */
  const zerosOf = (k: string) => {
    const c = S.cards[k], p = csParts(c.v), all = Math.max(0, f.maxP - p.d.length);
    if (c.row === "tray") return { z: 0, pt: !p.whole };
    if (c.z) return { z: all, pt: true };
    const w = S.zN > 0 && f.owes(k) ? S.zN : 0;
    return { z: Math.max(0, Math.min(all, w - (p.whole ? 1 : 0))), pt: !p.whole || w >= 1 };
  };
  const holdCard = (k: string) => {
    const g = cardAt(k), zs = zerosOf(k);
    return <g transform={`translate(${-g.w / 2}, ${-RH / 2})`}>{cardBody(S.cards[k].v, zs.z, zs.pt, g.cols, CS_INK.given, true)}</g>;
  };

  /* ── the acts, each performed on screen (api.act) and done only when it resolves true ── */
  const playing = useRef(false);
  const run = async (name: string, fn: () => Promise<boolean>) => {
    if (playing.current) return;
    playing.current = true;
    const mine = skR.current, inDemo = demo;
    /* only a child whose focus was on a control of the picture gets it back (no ring for a tap that never focused one) */
    let focused = false;
    try { const a0: any = document.activeElement; focused = !!(a0 && a0.closest && a0.closest('[data-zone="work"] [data-control]')); } catch (e) { focused = false; }
    let ok = false;
    try { ok = await fn(); } finally { playing.current = false; }
    if (!ok || !still(mine)) return;
    if (inDemo) api.did(name);
    /* keyboard focus goes back to the control that started the act, or to the next live one in the picture */
    /* after a card goes on top: the next step's key (Add zeros / Point first) or nothing, never the other card (a second
       Enter there would put the smaller number on top) */
    if (focused) setTimeout(() => {
      try {
        const ae: any = document.activeElement;
        const z = document.querySelector('[data-zone="work"]');
        const isCard = name.indexOf("card-") === 0;
        if (!isCard && ae && ae !== document.body && ae.closest && ae.closest("[data-control]")) return;
        const want = inDemo && stepOnR.current ? z && z.querySelector('[data-control="' + stepOnR.current + '"]') : null;   /* a guide step: its own control */
        const el: any = z && (isCard ? z.querySelector('[data-control="zeros"]')
          : want || z.querySelector('[data-control="' + name + '"]') || z.querySelector('[data-control]:not([aria-disabled="true"]):not([data-control^="card-"])'));
        if (el && el.focus) el.focus(); else if (ae && ae.blur) ae.blur();
      } catch (e) { /* focus is a convenience */ }
    }, 60);
  };
  const flash = (c: number) => {
    upd((s) => ({ ...s, flash: c }));
    if (flashT.current) clearTimeout(flashT.current);
    flashT.current = setTimeout(() => upd((s) => ({ ...s, flash: null })), 900);
  };
  /* a column that need not trade: the top card gives a short neutral shake (no amber, no hint) */
  const shake = (c: number) => {
    if (reduced) {   /* reduced motion: a brief static grey outline round the column instead */
      upd((s) => ({ ...s, refuse: c }));
      shakeT.current.push(setTimeout(() => upd((s) => ({ ...s, refuse: null })), 300));
      return;
    }
    shakeT.current.forEach(clearTimeout);
    shakeT.current = [8, -8, 5, -5, 0].map((dx, i) => setTimeout(() => upd((s) => ({ ...s, sx: dx })), i * 60));
  };
  /* a tap on a card puts it on top: the hand carries it there, and the other card goes below */
  const placeTop = async (k: string) => {
    const s = SR.current, c = s.cards[k], o = k === "a" ? "b" : "a", oc = s.cards[o], mine = skR.current;
    if (c.row === "top" || csFrame(s).started) return false;
    const g = cardAt(k), w = colX(1 + csPl(c.v)) - FX;
    const hold = holdCard(k);
    upd((p) => ({ ...p, carry: k }));
    const ok = await api.act({ tool: "hand", moves: "carry", from: { x: g.x + g.w / 2, y: g.y + RH / 2 }, at: [{ x: FX + w / 2, y: Y.top + RH / 2 }], hold });
    if (!still(mine)) return false;
    upd((p) => ({ ...p, carry: null, ...(ok ? { cards: { ...p.cards, [k]: { ...c, row: "top" }, [o]: { ...oc, row: "bot" } }, trades: [], diffN: 0, check: false } : {}) }));
    return !!ok;
  };
  /* Add zeros (Point first for a whole number): the pencil writes the point and the zeros, one by one */
  const writeZeros = async () => {
    const s = SR.current, f0 = csFrame(s), mine = skR.current;
    if (!f0.owed) return false;
    const pts: any[] = [];
    [f0.top, f0.bot].forEach((k: any) => {
      if (!k || !f0.owes(k)) return;
      const p = csParts(s.cards[k].v), y = rowY(s.cards[k].row) + RH / 2;
      if (p.whole) pts.push({ x: colX(1), y: y + 16 });
      for (let col = p.d.length + 1; col <= f0.maxP; col++) pts.push({ x: cxOf(col), y });
    });
    const ok = await api.act({ tool: "pencil", moves: "draw", at: pts, onPoint: (i: number) => { if (still(mine)) upd((p) => ({ ...p, zN: i + 1 })); } });
    if (!still(mine)) return false;
    upd((p) => ({ ...p, zN: 0, ...(ok ? { cards: { a: f0.owes("a") ? { ...p.cards.a, z: true } : p.cards.a, b: f0.owes("b") ? { ...p.cards.b, z: true } : p.cards.b } } : {}) }));
    return !!ok;
  };
  /* a trade: the hand breaks one block of the place into ten and carries them into the place to its right */
  /* ten blocks of 28, two rows of five; dx, dy place them round the hand (the hand's fist covers the point it carries at) */
  const tenBlocks = (dx: number, dy: number) => (
    <g>{Array.from({ length: 10 }).map((_, q) => <rect key={q} x={dx + (q % 5) * 30} y={dy + Math.floor(q / 5) * 30} width={28} height={28} rx={5} fill={CS_INK.trade} stroke={ink(CS_INK.trade)} strokeWidth={2} />)}</g>
  );
  const tenNode = tenBlocks(52, -29);   /* beside the fist, on its right, never over the headings */
  const restT = useRef<any>(null);
  useEffect(() => () => { if (restT.current) clearTimeout(restT.current); }, []);
  const trade = async (c: number) => {
    const s = SR.current, f0 = csFrame(s), mine = skR.current;
    const m = f0.pick(c);
    if (m === null) {
      /* a short place whose left neighbour holds 0: say where to trade from; any other refused column: a neutral shake */
      if (!demo && c >= 1 && f0.needs(c) && csN(f0.cur[c - 1]) === 0) api.say("Trade from the next column that has some.");
      else shake(c);
      return false;
    }
    const y = Y.top + RH / 2;
    const ok = await api.act({ tool: "hand", moves: "carry", from: { x: cxOf(m), y }, at: [{ x: cxOf(m + 1), y }], hold: tenNode });
    if (!ok || !still(mine)) return false;
    upd((p) => ({ ...p, trades: [...p.trades, m], rest: m + 1 }));
    if (restT.current) clearTimeout(restT.current);
    restT.current = setTimeout(() => { if (still(mine)) upd((p) => ({ ...p, rest: null })); }, 800);
    return true;
  };
  /* Take away (the guide and Free play only: in a question the child works it out): the pencil writes the difference
     from the right, place by place */
  const takeAway = async () => {
    const s = SR.current, f0 = csFrame(s), mine = skR.current;
    if (!f0.started) return false;
    if (f0.short.length) { flash(f0.short[f0.short.length - 1]); return false; }
    const pts: any[] = [];
    for (let c = f0.maxP; c >= 0; c--) pts.push({ x: cxOf(c), y: Y.diff + RH / 2 });
    const ok = await api.act({ tool: "pencil", moves: "draw", at: pts, onPoint: (i: number) => { if (still(mine)) upd((p) => ({ ...p, diffN: i + 1 })); } });
    if (!still(mine)) return false;
    if (!ok) { upd((p) => ({ ...p, diffN: 0 })); return false; }
    upd((p) => ({ ...p, diffN: f0.maxP + 1, check: !k4, undo: k4 ? 3 : p.undo }));
    return true;
  };
  /* phase 4, Take away <added>: the frame takes the added number away from the mistaken result once (its zeros and
     trades written as the pencil passes) and the start appears under the rule */
  const undoAct = async () => {
    const s = SR.current, mine = skR.current;
    if (s.undo !== 0) return false;
    const f0 = csFrame(s);
    const cards = { a: f0.owes("a") ? { ...s.cards.a, z: true } : s.cards.a, b: f0.owes("b") ? { ...s.cards.b, z: true } : s.cards.b };
    const f1 = csFrame({ ...s, cards, trades: [] });
    const plan = csPlan(f1.cur, f1.bd, f1.maxP);
    const pts: any[] = [];
    for (let c = f1.maxP; c >= 0; c--) pts.push({ x: cxOf(c), y: Y.diff + RH / 2 });
    const ok = await api.act({ tool: "pencil", moves: "draw", at: pts, onPoint: (i: number) => { if (still(mine)) upd((p) => ({ ...p, cards, trades: plan, diffN: i + 1 })); } });
    if (!still(mine)) return false;
    if (!ok) { upd((p) => ({ ...p, cards: s.cards, trades: [], diffN: 0 })); return false; }
    upd((p) => ({ ...p, cards, trades: plan, diffN: f1.maxP + 1, undo: 1 }));
    return true;
  };
  /* phase 4, Start on top: the hand carries the start up onto the top row, for the subtraction that was wanted */
  const againAct = async () => {
    const s = SR.current, mine = skR.current;
    if (s.undo !== 1) return false;
    const st = String(ex.start), w = colX(1 + csPl(st)) - FX;
    const hold = <g transform={`translate(${-w / 2}, ${-RH / 2})`}>{cardBody(st, 0, true, frameCols, CS_INK.result, true)}</g>;
    upd((p) => ({ ...p, carry: "diff" }));
    const ok = await api.act({ tool: "hand", moves: "carry", from: { x: FX + w / 2, y: Y.diff + RH / 2 }, at: [{ x: FX + w / 2, y: Y.top + RH / 2 }], hold });
    if (!still(mine)) return false;
    upd((p) => ({ ...p, carry: null, ...(ok ? { cards: { a: { v: st, row: "top", z: false }, b: p.cards.b }, trades: [], diffN: 0, undo: 2 } : {}) }));
    return !!ok;
  };
  const act = (name: string) => {
    if (name === "card-1" || name === "card-2") return run(name, () => placeTop(name === "card-1" ? "a" : "b"));
    if (name === "zeros") return run(name, writeZeros);
    if (name.indexOf("col-") === 0) return run(name, () => trade(+name.slice(4)));
    if (name === "take") return run(name, takeAway);
    if (name === "undo") return run(name, undoAct);
    if (name === "ontop") return run(name, againAct);
    /* a plain tap needs no tool: a wording lights the number all three start from; New pair sets the next pair */
    if (name.indexOf("word-") === 0) { upd((s) => ({ ...s, lit: true })); api.sfx.tick(); if (demo) api.did(name); return; }
    if (name === "new") { tl.stop(); newAt.current = Date.now(); setS({ ...csInit(ex, n, true, (SR.current.fi || 0) + 1), key: sk }); api.sfx.tick(); }
  };
  /* every tap: in the guide a tap on any control but the awaited one is a wrong act (its hint shows, nothing changes);
     a second tap on the same control within 350 ms is the same tap */
  const lastTap = useRef<any>({ name: "", t: 0 });
  const newAt = useRef(0);   /* free play: a double tap on New pair must not land on the new pair's tray card */
  const press = (name: string) => {
    if (!live) return;
    const t = Date.now();
    if (lastTap.current.name === name && t - lastTap.current.t < 350) return;
    if (name.indexOf("card-") === 0 && t - newAt.current < 400) return;
    lastTap.current = { name, t };
    if (demo && name !== stepOn) {
      /* a wrong act in a guide step: the hint shows and a keyboard child keeps their place */
      let had = false;
      try { const a0: any = document.activeElement; had = !!(a0 && a0.closest && a0.closest('[data-control="' + name + '"]')); } catch (e) { had = false; }
      api.did(name);
      if (had) setTimeout(() => { try { const el: any = document.querySelector('[data-zone="work"] [data-control="' + name + '"]'); if (el && el.focus) el.focus(); } catch (e) { /* focus is a convenience */ } }, 60);
      return;
    }
    act(name);
  };
  /* Enter, the agent's check() and the dev solve() perform the current guide step (400 ms apart: two Enters never
     finish two steps) */
  const lastEnter = useRef(0);
  const stepAct = () => {
    const t = Date.now();
    if (!stepOn || t - lastEnter.current < 400) return;
    lastEnter.current = t;
    act(stepOn);
  };
  api.onEnter(demo && stepOn ? stepAct : null);
  HOOK.demo = demo && stepOn ? () => act(stepOn) : null;

  /* ── the working, played out: the setup, every trade the book makes, then the difference place by place.
     slow = the traceback after a miss; fast = the win. Each step sets a whole snapshot of the frame. ── */
  const playOut = (slow: boolean, win: boolean) => {
    const t = slow ? { place: 700, point: 650, now: 420, trade: 520, digit: 300, end: 200 } : { place: 260, point: 220, now: 0, trade: 200, digit: 120, end: 0 };
    const steps: any[] = [];
    let sim: any = { ...SR.current, flash: null, carry: null, zN: 0, sx: 0, gap: false, refuse: null, rest: null, key: sk };
    const put = (ms: number, patch: any) => { sim = { ...sim, ...patch }; const snap = sim; steps.push([ms, () => setS(snap)]); };
    const zeroAll = () => {
      const f0 = csFrame(sim);
      if (f0.owed) put(t.point, { cards: { a: f0.owes("a") ? { ...sim.cards.a, z: true } : sim.cards.a, b: f0.owes("b") ? { ...sim.cards.b, z: true } : sim.cards.b } });
    };
    const work = () => {
      const f0 = csFrame(sim);
      csPlan(f0.cur, f0.bd, f0.maxP).forEach((m) => { if (t.now) put(t.now, { flash: m + 1 }); put(t.trade, { flash: null, trades: [...sim.trades, m] }); });
      const f1 = csFrame(sim);
      for (let k = 1; k <= f1.maxP + 1; k++) put(t.digit, { diffN: k });
    };
    if (k4) {
      if (sim.undo < 1) { put(t.place, { cards: { a: csCard(ex.got, "top"), b: csCard(ex.added, "bot") }, trades: [], diffN: 0 }); zeroAll(); work(); put(t.place, { undo: 1 }); }
      if (sim.undo < 2) put(t.place, { cards: { a: { v: String(ex.start), row: "top", z: false }, b: sim.cards.b }, trades: [], diffN: 0, undo: 2 });
      work();
      put(t.end, { undo: 3 });
    } else {
      put(0, { lit: n === 3 ? true : sim.lit, diffN: 0, check: false });
      const g = +sim.cards.a.v >= +sim.cards.b.v ? "a" : "b", o = g === "a" ? "b" : "a";
      /* phase 2, the plan's wrong #1 typed (the near-miss: the decimal's digits brought down under nothing): first the whole
         number's EMPTY tenths and hundredths light amber for about 1.5 s, then its violet zeros come and the column is worked */
      if (slow && n === 2 && wrong && String(wrong.value).trim() === String(ex.near)) {
        /* a timeline step's ms is how long its picture stands before the next step */
        put(1500, { cards: { [g]: { ...sim.cards[g], row: "top", z: false }, [o]: { ...sim.cards[o], row: "bot" } }, trades: [], gap: true });
        put(0, { gap: false });
      } else if (!csFrame(sim).ready) {
        put(t.place, { cards: { ...sim.cards, [g]: { ...sim.cards[g], row: "top" }, [o]: { ...sim.cards[o], row: "bot" } }, trades: [] });
      }
      zeroAll();
      work();
      put(t.end, { check: win });
    }
    return steps;
  };
  /* the win: the working plays out fast and ends on the difference, then the adding back */
  useEffect(() => {
    if (stage !== "win" || free) return;
    tl.run(playOut(false, true));
    if (ex.win) api.say(ex.win);   /* one sentence; at a phase's last answer the runtime shows the closing in its place */
  }, [stage]);
  /* the traceback: the same working, slowly, ending on the whole right answer; the child's answer stays in the slot */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    tl.run(playOut(true, false), () => api.lock(false));
  }, [wrong]);

  /* ── what the host and the agent read back (toolApi.getState); the difference only once it is shown ── */
  api.share({
    cards: ["a", "b"].map((k) => S.cards[k].v + "@" + S.cards[k].row).join(" "),
    top: f.top ? S.cards[f.top].v : null,
    columns: f.started ? f.cur.slice(0, f.maxP + 1).map((x: any) => (x === null ? "" : x)).join(",") : "",
    trades: S.trades.length,
    difference: fullDiff && (!k4 || S.undo === 3) ? f.diffStr : null,
    undo: k4 ? S.undo : null,
    complete: stage === "idle",
  });

  /* ── drawing (helpers are called, never mounted) ── */
  const frame = () => (
    <g pointerEvents="none">
      <rect x={FX - 8} y={Y.trade - 4} width={FW + 16} height={Y.diff + RH + 8 - Y.trade} rx={16} fill={tint(C.panel, 0.72)} stroke={C.rule} strokeWidth={2} />
      {["top", "bot"].map((r) => (r === "top" ? !f.top : !f.bot) && (
        <rect key={r} x={FX + 10} y={rowY(r) + 6} width={FW - 20} height={RH - 12} rx={RAD.piece} fill="#FFFFFF" stroke={C.rule} strokeWidth={2} strokeDasharray="9 8" />
      ))}
      {Array.from({ length: nc - 2 }).map((_, q) => <line key={q} x1={colX(q + 2)} x2={colX(q + 2)} y1={Y.trade} y2={Y.diff + RH} stroke={C.rule} strokeWidth={2} />)}
      <line x1={colX(1)} x2={colX(1)} y1={Y.trade - 8} y2={Y.diff + RH + 8} stroke={CONTENT.line} strokeWidth={5} strokeLinecap="round" />
      {CS_PLACES.slice(0, nc).map((p, c) => <text key={p} x={cxOf(c)} y={Y.head} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(p)}</text>)}
      <line x1={FX + 8} x2={FX + FW - 8} y1={Y.rule} y2={Y.rule} stroke={CONTENT.line} strokeWidth={4} strokeLinecap="round" />
      {f.bot && <text x={FX - 44} y={Y.bot + 62} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>−</text>}
    </g>
  );
  const cardEl = (k: string) => {
    const c = S.cards[k];
    if (S.carry === k) return null;
    const g = cardAt(k), zs = zerosOf(k), taken = fullDiff && c.row === "bot", top = c.row === "top", dx = top ? S.sx || 0 : 0;
    return (
      <g key={"card-" + k} pointerEvents="none" style={{ transform: `translate(${g.x + dx}px, ${g.y}px)`, transition: reduced || dx ? "none" : "transform 320ms ease" } as any}>
        {cardBody(c.v, zs.z, zs.pt, g.cols, taken ? CS_INK.taken : CS_INK.given)}
      </g>
    );
  };
  /* the trades: the old top digit struck through in ink, the new one written above it in vermilion */
  const working = () => {
    if (!f.started) return null;
    const changed = [0, 1, 2, 3].filter((c) => c <= f.maxP && (f.tin[c] || f.tout[c]));
    return (
      <g pointerEvents="none">
        {changed.map((c) => (
          <g key={"t" + c}>
            <line x1={cxOf(c) - 34} y1={Y.top + 41} x2={cxOf(c) + 34} y2={Y.top + 41} stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
            {S.rest === c ? tenBlocks(cxOf(c) - 74, Y.trade + 2) : <text x={cxOf(c)} y={Y.trade + 52} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={ink(CS_INK.trade)}>{f.cur[c]}</text>}
          </g>
        ))}
        {changed.length > 0 && <text x={FX - 24} y={Y.trade + 42} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={ink(CS_INK.trade)}>{tx("Trade")}</text>}
      </g>
    );
  };
  /* the difference, green, under the rule; the bottom card then reads as taken away (rose) */
  const difference = () => {
    if (!f.started || S.diffN <= 0 || S.carry === "diff") return null;
    const by = Y.diff + 62;
    return (
      <g pointerEvents="none">
        {[0, 1, 2, 3].filter((c) => c <= f.maxP && c > f.maxP - S.diffN).map((c) => (
          <text key={c} x={cxOf(c)} y={by} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={ink(CS_INK.result)}>{f.diff[c]}</text>
        ))}
        {/* the difference's point stays a written "." (72, a 14 px dot) so the row reads as the number it is */}
        {f.maxP > 0 && S.diffN >= f.maxP && <text x={colX(1)} y={by} textAnchor="middle" fontSize={T.display} fontWeight={800} fill={ink(CS_INK.result)} stroke="#FFFFFF" strokeWidth={7} paintOrder="stroke">.</text>}
      </g>
    );
  };
  /* the place being worked on (amber), a refused tap, and the Top check while the smaller number is on top */
  const lights = () => {
    const tg = f.top ? cardAt(f.top) : null;
    return (
      <g pointerEvents="none">
        {S.gap && f.top && [1, 2, 3].filter((c) => c <= f.maxP && c > csPl(S.cards[f.top as string].v)).map((c) => (
          <rect key={"gap" + c} x={colX(c) + 7} y={Y.top} width={cwOf(c) - 14} height={RH} rx={16} fill={tint(CS_INK.now, 0.8)} stroke={CS_INK.now} strokeWidth={5} />
        ))}
        {S.refuse !== null && S.refuse <= f.maxP && <rect x={colX(S.refuse) + 5} y={Y.trade + 2} width={cwOf(S.refuse) - 10} height={Y.top + RH - Y.trade} rx={12} fill="none" stroke={CS_INK.hold} strokeWidth={4} />}
        {S.flash !== null && S.flash <= f.maxP && <rect x={colX(S.flash) + 5} y={Y.trade + 2} width={cwOf(S.flash) - 10} height={Y.top + RH - Y.trade} rx={12} fill="none" stroke={CS_INK.now} strokeWidth={6} />}
        {f.lit && tg && (
          <g>
            <rect x={tg.x - 4} y={tg.y - 6} width={tg.w + 8} height={RH + 12} rx={20} fill="none" stroke={CS_INK.now} strokeWidth={6} />
            {/* under the frame, in the band the empty tray leaves: clear of the point line and the column rules */}
            <text x={FX + FW / 2} y={Y.key + 52} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={ink(CS_INK.now, 0.45)}>{tx("Smaller on top")}</text>
          </g>
        )}
      </g>
    );
  };
  /* the check is adding back: the difference + the number taken away gives the top again */
  const addBack = () => {
    if (!S.check || !fullDiff || !f.top || k4) return null;
    const y = Y.tray + 76;
    return (
      <g pointerEvents="none">
        <text x={FX} y={y} fontSize={CS_CHECK} fontWeight={700} fill={C.ink}>
          <tspan fontSize={T.label}>{tx("Check")}</tspan><tspan>{"  "}</tspan>
          <tspan fill={ink(CS_INK.result)}>{f.diffStr}</tspan><tspan>{" + "}</tspan><tspan fill={ink(CS_INK.taken)}>{f.written(f.bot)}</tspan>
          <tspan fill={ink(CS_INK.given)}>{" = " + f.written(f.top)}</tspan>
        </text>
      </g>
    );
  };
  /* phase 3: the Wording card, one subtraction worded three ways; the question's own wording has the dark edge */
  const wordingCard = () => {
    /* one TR key per whole wording ("Subtract {b} from {a}"); a translation marks where its two lines break with "|" */
    const wl = (k: number) => { const en = CS_WORDS[k], key = en.join(" "), t = String(tx(key)); return t === key ? en : t.split("|"); };
    const litInk = ink(CS_INK.now, 0.45), asked = demo ? null : ex.word;
    /* in a question only the asked wording carries its numbers; all three fill (and light the start) on a miss or the win */
    const fillAll = stage !== "ask" || missed;
    return (
      <g pointerEvents="none">
        <rect x={SX} y={WC.y0} width={CS.sw} height={WC.h} rx={18} fill={tint(C.panel, 0.5)} stroke={C.rule} strokeWidth={2} />
        {CS_WORDS.map((_, k) => {
          const y = WC.row(k), isAsked = asked === k, full = fillAll || isAsked;
          const a = full ? String(ex.top) : "…", b = full ? String(ex.bot) : "…";
          return (
            <g key={k}>
              <rect x={SX + 8} y={y} width={CS.sw - 16} height={WC.rh} rx={14} fill={S.lit ? tint(CS_INK.now, 0.82) : "#FFFFFF"} stroke={isAsked ? C.ink : C.rule} strokeWidth={isAsked ? 4 : 2} />
              <text x={SX + 22} y={y + WC.b1} fontSize={T.label} fontWeight={600} fill={C.ink}>{csFill(wl(k)[0], a, b, S.lit, litInk)}</text>
              <text x={SX + 22} y={y + WC.b2} fontSize={T.label} fontWeight={600} fill={C.ink}>{csFill(wl(k)[1], a, b, S.lit, litInk)}</text>
            </g>
          );
        })}
      </g>
    );
  };
  /* phase 4: the Undo panel: the mistaken sum, then the start, then the answer */
  const undoPanel = () => {
    const green = ink(CS_INK.result), x = SX + 22, xr = SX + CS.sw - 22;
    /* in a question only the mistaken sum shows; the start and answer rows come with help, the correction or the win */
    const rows = help || stage !== "ask" || S.undo >= 1;
    return (
      <g pointerEvents="none">
        <rect x={SX} y={UP.y0} width={CS.sw} height={rows ? UP.h : UP.hA} rx={18} fill={tint(C.panel, 0.5)} stroke={C.rule} strokeWidth={2} />
        <text x={x} y={UP.a1} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("start")}</text>
        <text x={xr} y={UP.a1} textAnchor="end" fontSize={T.xl} fontWeight={700} fill={ink(CS_INK.given)}>{"+ " + ex.added}</text>
        <text x={xr} y={UP.a2} textAnchor="end" fontSize={T.xl} fontWeight={700} fill={ink(CS_INK.given)}>{"= " + ex.got}</text>
        {rows && <g>
        <line x1={SX + 16} x2={SX + CS.sw - 16} y1={UP.d1} y2={UP.d1} stroke={C.rule} strokeWidth={2} />
        <text x={x} y={UP.b} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("start")}</text>
        <text x={xr} y={UP.b} textAnchor="end" fontSize={T.xl} fontWeight={700} fill={S.undo >= 1 ? green : C.ink}>{"= " + (S.undo >= 1 ? ex.start : "?")}</text>
        <line x1={SX + 16} x2={SX + CS.sw - 16} y1={UP.d2} y2={UP.d2} stroke={C.rule} strokeWidth={2} />
        <text x={x} y={UP.c} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("answer")}</text>
        <text x={xr} y={UP.c} textAnchor="end" fontSize={T.xl} fontWeight={700} fill={S.undo >= 3 ? green : C.ink}>{"= " + (S.undo >= 3 ? String(ex.answer) : "?")}</text>
        </g>}
      </g>
    );
  };

  /* ── the controls (drawn last, over every overlay) ── */
  /* the ONE key at the frame's foot: its label follows the act (Add zeros or Point first; Take away in the guide and
     Free play; phase 4: Take away <added>, then Start on top); a 400 ms guard so one tap never presses the next label */
  let kid: string | null = null;
  if (live && S.carry === null) {
    /* phase 4: Take away <added> prints the start, part of the way to the answer, so in a question no key shows (and none
       is invited) until help: a miss or the Hint key (the guide and the correction show them) */
    if (k4) kid = !help ? null : S.undo === 0 ? "undo" : S.undo === 1 ? "ontop" : f.owed ? "zeros" : demo && f.started && !f.short.length && !fullDiff ? "take" : null;
    else if (f.owed) kid = "zeros";
    else if (f.started && !f.short.length && !fullDiff && (demo || free)) kid = "take";
    else if (free && fullDiff) kid = "new";
  }
  const wholeOwes = !!kid && kid === "zeros" && ["a", "b"].some((k) => f.owes(k) && csParts(S.cards[k].v).whole);
  const keyEn = kid === "zeros" ? (wholeOwes ? "Point first" : "Add zeros") : kid === "undo" ? "Take away " + ex.added : kid ? CS_KEY[kid] : "";
  const keyShown = kid === "undo" ? tx("Take away {x}").replace("{x}", ex.added) : tx(keyEn);
  /* New pair has its own place (the band's right end), so a late second tap on Take away never lands on it */
  const kw = kid === "new" ? 230 : 320, kx0 = kid === "new" ? FX + FW - kw : FX + Math.round(FW / 2 - kw / 2);
  const lastKey = useRef(0);
  const kidR = useRef<any>({ id: null, t: 0 });
  if (kidR.current.id !== kid) kidR.current = { id: kid, t: Date.now() };
  const pressKey = (id: string) => {
    const t = Date.now();
    if (t - lastKey.current < 250) return;   /* a double tap; the act itself (about 1.3 s) refuses a second start */
    if (id === "new" && t - kidR.current.t < 600) return;   /* New pair ignores taps for 600 ms after it appears */
    lastKey.current = t;
    press(id);
  };
  const cardCtl = (k: string) => live && !k4 && !f.started && S.carry === null && S.cards[k].row !== "top";
  const colCtl = live && f.started && S.carry === null && !fullDiff && !(k4 && S.undo !== 2);

  /* the one invite: the control the guide step waits for, or the key in a question */
  let inv: any = null;
  if (live && S.carry === null) {
    const on = demo ? stepOn : kid;
    if (on && on === kid) inv = { x: kx0 + kw / 2, y: Y.key + 38, w: kw, h: 76, rx: 18 };
    else if (demo && on && on.indexOf("card-") === 0) { const g = cardAt(on === "card-1" ? "a" : "b"); inv = { x: g.x + g.w / 2, y: g.y + RH / 2, w: g.w - 8, h: RH, rx: 16 }; }
    else if (demo && on && on.indexOf("col-") === 0) { const c = +on.slice(4); inv = { x: cxOf(c), y: Y.top + RH / 2, w: cwOf(c) - 8, h: RH, rx: 14 }; }   /* the top digit's cell, clear of the headings */
    else if (demo && on && on.indexOf("word-") === 0) inv = { x: SX + CS.sw / 2, y: WC.row(+on.slice(5) - 1) + WC.rh / 2, w: CS.sw - 16, h: WC.rh, rx: 14 };
  }

  return (
    <g>
      {frame()}
      {n === 3 && !free && !(stage === "ask" && ex.word == null && !missed) && wordingCard()}
      {k4 && undoPanel()}
      {cardEl("a")}
      {cardEl("b")}
      {working()}
      {difference()}
      {lights()}
      {addBack()}
      {["a", "b"].map((k) => {
        if (!cardCtl(k)) return null;
        const g = cardAt(k), id = k === "a" ? "card-1" : "card-2";
        return <Hit key={id} id={id} x={g.x} y={g.y} w={g.w} h={RH} onPress={() => press(id)} label={tx("Card {x}").replace("{x}", S.cards[k].v)} />;
      })}
      {colCtl && Array.from({ length: f.maxP + 1 }).map((_, c) => (
        <Hit key={"col" + c} id={"col-" + c} x={colX(c) + 3} y={Y.trade} w={cwOf(c) - 6} h={Y.top + RH - Y.trade} onPress={() => press("col-" + c)} label={tx("Trade at the " + CS_PLACES[c].toLowerCase())} />
      ))}
      {n === 3 && demo && !S.lit && live && CS_WORDS.map((_, k) => (
        <Hit key={"w" + k} id={"word-" + (k + 1)} x={SX + 8} y={WC.row(k)} w={CS.sw - 16} h={WC.rh} onPress={() => press("word-" + (k + 1))} label={tx("Wording {x}").replace("{x}", String(k + 1))} />
      ))}
      {kid && (
        <Key key="act-key" id={kid} label={keyShown} x={kx0} y={Y.key} w={kw} h={76} C={C} tone="key" onClick={() => pressKey(kid as string)}>
          <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{keyShown}</text>
        </Key>
      )}
      {inv && <Invite x={inv.x} y={inv.y} w={inv.w} h={inv.h} rx={inv.rx} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: the subtraction (a drawn minus bar, never a
   hyphen) over the child's answer, each as big as the thumbnail allows */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const ph: any = PHASES[(n || 1) - 1];
  const q: any = it || last.it || (ph && ph.items[last.item]) || {};
  const a = String(q.got !== undefined ? q.start : q.top !== undefined ? q.top : ""), b = String(q.got !== undefined ? q.added : q.bot !== undefined ? q.bot : "");
  const v = "= " + String(last.value), cx = w / 2;
  const f1 = Math.max(T.micro, Math.min(h * 0.4, (cx - 30) / (Math.max(a.length, b.length, 1) * 0.6)));
  const f2 = Math.max(T.micro, Math.min(h * 0.46, (w - 24) / (v.length * 0.62)));
  const y1 = h * 0.42, y2 = h * 0.88;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <text x={cx - 22} y={y1} textAnchor="end" fontSize={f1} fontWeight={700} fill={shade(CS_INK.given, 0.25)}>{a}</text>
      <rect x={cx - 11} y={y1 - f1 * 0.34 - 2} width={22} height={4} rx={2} fill={C.ink} />
      <text x={cx + 22} y={y1} fontSize={f1} fontWeight={700} fill={shade(CS_INK.given, 0.25)}>{b}</text>
      <text x={cx} y={y2} textAnchor="middle" fontSize={f2} fontWeight={800} fill={shade(CS_INK.result, 0.25)}>{v}</text>
    </g>
  );
}

function ColumnSubtractor(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, pointKey: true, winMs: 3200, fitHost: () => null,
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
      bigPad: false,   /* the frame (3 columns of 200) and the Wording card / Undo panel beside it need 1,072 of the 1,086 */
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

export default ColumnSubtractor;
