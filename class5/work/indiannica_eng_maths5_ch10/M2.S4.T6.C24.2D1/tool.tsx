/* ═══ M2.S4.T6.C24.2D1 · time_columns · tool-specific part ═══════════════════════════════
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

const TOOL_ID = "time_columns";
const MEDIA_ID = "M2.S4.T6.C24.2D1";
const TOOL_NAME = "Time Column Adder";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["Columns of hours, minutes and seconds, ready to be added."];
/* the whole-tool line: printed on the summary page */
const FINISH_LINE = "You added and took away lengths of time and carried at sixty.";
/* printed when the child opens Free play (the plan's free-play line); its LAST piece stays on the bubble */
const FREE_LINE = "Free play: work any sum column by column, then tap New sum.";

/* THE START PAGE (runtime r28; docs/LAYOUT.md §1c, docs/PATTERNS.md §14): the first thing a child sees in user mode.
   START_HOOK is ONE printed question to wonder at (it needs a TR entry, and never gives an answer away); StartArt is
   the object the lesson is about, drawn in a 1200 x 340 box ({ box, C, lang, tx }; plain shapes in the chrome and content
   colours, a <Skin> over them when the image agent made one). This stub is a dashed outline: draw the real object. */
const START_HOOK = "Can minutes add up to more than an hour?";
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  const x0 = Math.round(box.w / 2 - 300);
  const num = (x: number, y: number, t: string, f: string) => <text x={x} y={y} textAnchor="middle" fontSize={T.display} fontWeight={700} fill={f}>{t}</text>;
  return (
    <g>
      <defs>
        <filter id="saShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#2B2B2B" floodOpacity="0.1" />
        </filter>
        <linearGradient id="saVioletTile" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7E47B8" />
          <stop offset="100%" stopColor="#5B2E8A" />
        </linearGradient>
      </defs>
      <rect x={x0} y={6} width={600} height={328} rx={22} fill="#FFFFFF" stroke={C.rule} strokeWidth={3} filter="url(#saShadow)" />
      <path d={`M ${x0 + 1.5} 52 L ${x0 + 1.5} 28 Q ${x0 + 1.5} 7.5 ${x0 + 22} 7.5 L ${x0 + 578} 7.5 Q ${x0 + 598.5} 7.5 ${x0 + 598.5} 28 L ${x0 + 598.5} 52 Z`} fill="#F7EFE2" />
      <line x1={x0 + 360} y1={20} x2={x0 + 360} y2={318} stroke={C.rule} strokeWidth={2} />
      <text x={x0 + 240} y={lang === "en" || !lang ? 42 : 46} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={TC_INK}>{tx("hours")}</text>
      <text x={x0 + 480} y={lang === "en" || !lang ? 42 : 46} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={TC_INK}>{tx("minutes")}</text>
      <g transform={`translate(${x0 + 480},104)`}>
        <rect x={-66} y={-28} width={132} height={56} rx={14} fill="url(#saVioletTile)" stroke={shade(TC_VIOLET, 0.4)} strokeWidth={2} />
        <path d="M -54 -20 Q 0 -24 54 -20" stroke="rgba(255,255,255,0.35)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <text x={0} y={tcBase(lang)} textAnchor="middle" fontSize={T.label} fontWeight={700} fill="#FFFFFF">{tx("1 h")}</text>
      </g>
      <path d={`M ${x0 + 400} 104 L ${x0 + 300} 104 M ${x0 + 318} 90 L ${x0 + 300} 104 L ${x0 + 318} 118`} fill="none" stroke={TC_VIOLET} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
      {num(x0 + 240, 200, "1", TC_BLUE)}{num(x0 + 480, 200, "45", TC_BLUE)}
      {num(x0 + 60, 282, "+", TC_INK)}{num(x0 + 240, 282, "2", TC_BLUE)}{num(x0 + 480, 282, "30", TC_BLUE)}
      <line x1={x0 + 20} y1={308} x2={x0 + 580} y2={308} stroke={TC_INK} strokeWidth={5} strokeLinecap="round" />
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
    "Time Column Adder": "समय स्तंभ जोड़",
    "Columns of hours, minutes and seconds, ready to be added.": "घंटे, मिनट और सेकंड के स्तंभ, जोड़ने को तैयार।",
    "You added and took away lengths of time and carried at sixty.": "तुमने समय जोड़ा, घटाया और 60 पर हासिल लिया।",
    "Free play: work any sum column by column, then tap New sum.": "मुक्त खेल: हर सवाल स्तंभ-दर-स्तंभ करो, फिर नया सवाल दबाओ।",
    "Can minutes add up to more than an hour?": "क्या मिनट जुड़कर एक घंटे से ज़्यादा होंगे?",
    "Hours with hours, minutes with minutes": "घंटे के साथ घंटे, मिनट के साथ मिनट",
    "Minutes with minutes, hours with hours. Which column goes first?": "मिनट के साथ मिनट, घंटे के साथ घंटे। पहले कौन सा स्तंभ?",
    "Tap Line up to put minutes under minutes and hours under hours.": "मिनट को मिनट के नीचे, घंटे को घंटे के नीचे रखने को सीध में करो दबाओ।",
    "The Line up key is under the frame.": "सीध में करो बटन ढाँचे के नीचे है।",
    "Tap the minutes column first, because we start at the right.": "पहले मिनट का स्तंभ दबाओ, हम दाईं ओर से शुरू करते हैं।",
    "Tap the column headed minutes.": "जिस स्तंभ पर मिनट लिखा है, उसे दबाओ।",
    "Now tap the hours column to add the hours.": "अब घंटे जोड़ने के लिए घंटे का स्तंभ दबाओ।",
    "The hours column is on the left.": "घंटे का स्तंभ बाईं ओर है।",
    "Add each column as its own sum.": "हर स्तंभ को अलग जोड़ की तरह जोड़ो।",
    "Type each column's total in its own box.": "हर स्तंभ का जोड़ उसके अपने खाने में लिखो।",
    "Hours go with hours and minutes with minutes, right-hand column first.": "घंटे घंटों के साथ, मिनट मिनटों के साथ, पहले दायाँ स्तंभ।",
    "You learned: add each unit in its own column, right column first.": "तुमने सीखा: हर इकाई अपने स्तंभ में, पहले दायाँ स्तंभ।",
    "What is 4 h 10 min + 3 h 25 min?": "4 घंटे 10 मिनट + 3 घंटे 25 मिनट कितना है?",
    "4 h 10 min + 3 h 25 min": "4 घंटे 10 मिनट + 3 घंटे 25 मिनट",
    "Minutes add only to minutes here.": "यहाँ मिनट सिर्फ़ मिनट से जुड़ते हैं।",
    "Yes, 7 h 35 min, each column added on its own.": "हाँ, 7 घंटे 35 मिनट, हर स्तंभ अलग जोड़ा।",
    "Add 2 h 10 min and 4 h 20 min.": "2 घंटे 10 मिनट और 4 घंटे 20 मिनट जोड़ो।",
    "2 h 10 min + 4 h 20 min": "2 घंटे 10 मिनट + 4 घंटे 20 मिनट",
    "Hours go with hours, never with minutes.": "घंटे घंटों के साथ जाते हैं, मिनट के साथ नहीं।",
    "Yes, 6 h 30 min, hours with hours.": "हाँ, 6 घंटे 30 मिनट, घंटे के साथ घंटे।",
    "Add 5 h 15 min 20 s and 2 h 10 min 30 s.": "5 घंटे 15 मिनट 20 सेकंड और 2 घंटे 10 मिनट 30 सेकंड जोड़ो।",
    "5 h 15 min 20 s + 2 h 10 min 30 s": "5 घं 15 मि 20 सेक. + 2 घं 10 मि 30 से",
    "Hours, minutes and seconds each add on their own.": "घंटे, मिनट और सेकंड, हर एक अलग जुड़ता है।",
    "Yes, 7 h 25 min 50 s, three columns.": "हाँ, 7 घंटे 25 मिनट 50 सेकंड, तीन स्तंभ।",
    "Carrying an hour": "एक घंटा हासिल",
    "Is there a whole hour in the minutes? Wrap it and carry it.": "क्या मिनटों में पूरा घंटा है? उसे बाँधकर हासिल ले जाओ।",
    "Tap the minutes column to add the minutes.": "मिनट जोड़ने के लिए मिनट का स्तंभ दबाओ।",
    "The minutes column is the one on the right.": "मिनट का स्तंभ दाईं ओर वाला है।",
    "70 min is more than 60, so tap Regroup.": "70 मिनट 60 से ज़्यादा है, तो हासिल बनाओ दबाओ।",
    "Tap the Regroup key under the frame.": "ढाँचे के नीचे हासिल बनाओ बटन दबाओ।",
    "Drag the 1 h tile to the hours column.": "1 घंटा वाली टाइल को घंटे के स्तंभ में खींचो।",
    "Move the violet tile to the left.": "बैंगनी टाइल को बाईं ओर ले जाओ।",
    "Tap the hours column to add the hours and the carry.": "घंटे और हासिल जोड़ने के लिए घंटे का स्तंभ दबाओ।",
    "Count the carried hour as well.": "हासिल वाला घंटा भी गिनो।",
    "Take 60 away from any column that reached 60 or more, to find what stays.": "जो स्तंभ 60 या ज़्यादा हुआ, उसमें से 60 घटाकर बचा देखो।",
    "The carry tile joins the next column, then add that column.": "हासिल टाइल अगले स्तंभ में जाती है, फिर वह स्तंभ जोड़ो।",
    "60 min make 1 h and 60 s make 1 min, so carry at sixty.": "60 मिनट का 1 घंटा, 60 सेकंड का 1 मिनट, तो 60 पर हासिल।",
    "You learned: a column of 60 or more gives 1 to the column on its left.": "तुमने सीखा: 60 या ज़्यादा वाला स्तंभ बाएँ स्तंभ को 1 देता है।",
    "What is 2 h 50 min + 2 h 35 min?": "2 घंटे 50 मिनट + 2 घंटे 35 मिनट कितना है?",
    "2 h 50 min + 2 h 35 min": "2 घंटे 50 मिनट + 2 घंटे 35 मिनट",
    "What is left in the minutes after the carry?": "हासिल के बाद मिनटों में कितना बचा?",
    "Yes, 5 h 25 min, with 1 h carried.": "हाँ, 5 घंटे 25 मिनट, 1 घंटा हासिल के साथ।",
    "Add 35 min and 50 min and write it in hours and minutes.": "35 मिनट और 50 मिनट जोड़कर घंटे और मिनट में लिखो।",
    "35 min + 50 min": "35 मिनट + 50 मिनट",
    "Write the minutes that stay, then count the hours.": "बचे मिनट लिखो, फिर घंटे गिनो।",
    "Yes, 1 h 25 min, not 85 min.": "हाँ, 1 घंटा 25 मिनट, 85 मिनट नहीं।",
    "Add 3 h 45 min 50 s and 2 h 30 min 40 s.": "3 घंटे 45 मिनट 50 सेकंड और 2 घंटे 30 मिनट 40 सेकंड जोड़ो।",
    "3 h 45 min 50 s + 2 h 30 min 40 s": "3 घं 45 मि 50 सेक. + 2 घं 30 मि 40 सेक.",
    "Check both columns that reached 60: each needs its carry tile.": "60 तक पहुँचे दोनों स्तंभ देखो, हर एक को हासिल टाइल चाहिए।",
    "Yes, 6 h 16 min 30 s, two carries.": "हाँ, 6 घंटे 16 मिनट 30 सेकंड, दो हासिल।",
    "Borrowing an hour": "एक घंटा उधार",
    "Not enough minutes on top. What can you break to get more?": "ऊपर मिनट कम हैं। ज़्यादा पाने के लिए क्या तोड़ सकते हो?",
    "10 min is too few to take 40 from, so tap Break.": "10 मिनट में से 40 नहीं घटते, तो तोड़ो दबाओ।",
    "Tap the Break key under the frame.": "ढाँचे के नीचे तोड़ो बटन दबाओ।",
    "Drag the violet tile to the minutes column.": "बैंगनी टाइल को मिनट के स्तंभ में खींचो।",
    "Move the tile to the column on the right.": "टाइल को दाईं ओर के स्तंभ में ले जाओ।",
    "Tap the minutes column to take away the minutes.": "मिनट घटाने के लिए मिनट का स्तंभ दबाओ।",
    "The minutes column is at the right.": "मिनट का स्तंभ दाईं ओर है।",
    "Now tap the hours column to take away the hours.": "अब घंटे घटाने के लिए घंटे का स्तंभ दबाओ।",
    "Take the bottom hours from the top hours.": "ऊपर के घंटों में से नीचे के घंटे घटाओ।",
    "Is the new top now bigger than the minutes you take away?": "क्या नई ऊपर वाली संख्या घटाए जाने वाले मिनट से बड़ी है?",
    "Then take away the hours, using the hours left after the break.": "फिर तोड़ने के बाद बचे घंटों से घंटे घटाओ।",
    "When the top is too small, break 1 h into minutes first.": "जब ऊपर कम हो, पहले 1 घंटे को मिनटों में तोड़ो।",
    "You learned: break 1 h into minutes when the top is too small.": "तुमने सीखा: ऊपर कम हो तो 1 घंटे को मिनटों में तोड़ो।",
    "What is 8 h 5 min - 3 h 30 min?": "8 घंटे 5 मिनट - 3 घंटे 30 मिनट कितना है?",
    "8 h 5 min - 3 h 30 min": "8 घंटे 5 मिनट - 3 घंटे 30 मिनट",
    "Take the minutes from the new top in the minutes column.": "मिनट के स्तंभ में नई ऊपर वाली संख्या से मिनट घटाओ।",
    "Yes, 4 h 35 min, after breaking 1 h.": "हाँ, 4 घंटे 35 मिनट, 1 घंटा तोड़कर।",
    "To take 25 min from 2 h 10 min, 1 h is regrouped as how many minutes?": "2 घंटे 10 मिनट से 25 मिनट घटाने में 1 घंटा कितने मिनट बनता है?",
    "1 h is how many min?": "1 घंटा = कितने मिनट?",
    "How many minutes make 1 h?": "कितने मिनट का 1 घंटा होता है?",
    "Think how far the minute hand goes round in 1 h.": "सोचो, 1 घंटे में मिनट की सुई कितना घूमती है।",
    "Count the minute marks once round a clock face.": "घड़ी पर एक चक्कर के मिनट के निशान गिनो।",
    "Yes, 1 h is regrouped as 60 min.": "हाँ, 1 घंटा 60 मिनट बनता है।",
    "Take 2 h 55 min from 6 h 20 min.": "6 घंटे 20 मिनट से 2 घंटे 55 मिनट घटाओ।",
    "6 h 20 min - 2 h 55 min": "6 घंटे 20 मिनट - 2 घंटे 55 मिनट",
    "Use the new tops the pencil wrote, then take away.": "पेंसिल से लिखी नई ऊपर वाली संख्याएँ लो, फिर घटाओ।",
    "Yes, 3 h 25 min left.": "हाँ, 3 घंटे 25 मिनट बचे।",
    "Seconds and hundredths": "सेकंड और सौवाँ भाग",
    "Points in a line. Would every runner take the same time?": "बिंदु एक सीध में। क्या हर धावक बराबर समय लेगा?",
    "Tap Line up to put the two points in one line.": "दोनों दशमलव बिंदु एक सीध में लाने को सीध में करो दबाओ।",
    "Tap the seconds column to add the hundredths and the seconds.": "सौवें भाग और सेकंड जोड़ने के लिए सेकंड का स्तंभ दबाओ।",
    "The seconds column is at the right.": "सेकंड का स्तंभ दाईं ओर है।",
    "Take away the hundredths first, then the whole seconds.": "पहले सौवें भाग घटाओ, फिर पूरे सेकंड।",
    "The two minutes match now, so the answer is only seconds.": "अब दोनों मिनट बराबर हैं, तो उत्तर सिर्फ़ सेकंड में है।",
    "Line up the points, and share a team time only if all ran the same.": "बिंदु सीध में रखो, और टीम का समय तभी बाँटो जब सब बराबर दौड़ें।",
    "You learned: line up the points, and share only if all ran the same.": "तुमने सीखा: बिंदु सीध में रखो, बाँटो तभी जब सब बराबर दौड़ें।",
    "What is 3 min 4.20 s - 2 min 51.75 s?": "3 मिनट 4.20 सेकंड - 2 मिनट 51.75 सेकंड कितना है?",
    "3 min 4.20 s - 2 min 51.75 s": "3 मि 4.20 सेक. - 2 मि 51.75 सेक.",
    "Use the new top that the pencil wrote in the seconds column.": "सेकंड के स्तंभ में पेंसिल से लिखी नई ऊपर वाली संख्या लो।",
    "Yes, 12.45 s, after borrowing 1 min.": "हाँ, 12.45 सेकंड, 1 मिनट उधार लेकर।",
    "Add 3.25 s and 4.50 s.": "3.25 सेकंड और 4.50 सेकंड जोड़ो।",
    "3.25 s + 4.50 s": "3.25 सेकंड + 4.50 सेकंड",
    "Add the hundredths first, then the seconds.": "पहले सौवें भाग जोड़ो, फिर सेकंड।",
    "Keep the point of the answer under the two points.": "उत्तर का बिंदु दोनों बिंदुओं के नीचे रखो।",
    "Read 4.50 as 4 s and 50 hundredths.": "4.50 को 4 सेकंड और 50 सौवें भाग पढ़ो।",
    "Yes, 7.75 s, hundredths under hundredths.": "हाँ, 7.75 सेकंड, सौवें के नीचे सौवें।",
    "If 4 runners shared 4 min 20 s equally, how long did each run?": "4 धावकों ने 4 मिनट 20 सेकंड बराबर बाँटे, तो हर एक कितना दौड़ा?",
    "4 min 20 s shared by 4": "4 मिनट 20 सेकंड, 4 में बाँटो",
    "Sixty seconds make a minute: write the whole minutes in the minutes box.": "60 सेकंड का एक मिनट: पूरे मिनट मिनट वाले खाने में लिखो।",
    "Equally means every runner gets a pile the same size.": "बराबर का मतलब, हर धावक को एक जैसा ढेर मिले।",
    "Think: 4 times what number makes 20?": "सोचो: 4 गुना कौन सी संख्या 20 बनाती है?",
    "Yes, 1 min 5 s each, but only if all ran the same.": "हाँ, हर एक 1 मिनट 5 सेकंड, अगर सब बराबर दौड़े।",
    "Tap Line up first.": "पहले सीध में करो दबाओ।",
    "Tap Regroup first.": "पहले हासिल बनाओ दबाओ।",
    "Move the violet tile first.": "पहले बैंगनी टाइल ले जाओ।",
    "Tap Break first.": "पहले तोड़ो दबाओ।",
    "Tap Share first.": "पहले बाँटो दबाओ।",
    "hours": "घंटे",
    "minutes": "मिनट",
    "seconds": "सेकंड",
    "h": "घं",
    "min": "मि",
    "s": "सेक.",
    "1 h": "1 घंटा",
    "1 min": "1 मिनट",
    "60 min": "60 मिनट",
    "60 s": "60 सेकंड",
    "20 s": "20 सेकंड",
    "Given": "दिया है",
    "Answer": "उत्तर",
    "Place holder": "स्थानधारक",
    "seconds box": "सेकंड का खाना",
    "minutes box": "मिनट का खाना",
    "hours box": "घंटे का खाना",
    "Each": "हर एक",
    "Borrow": "उधार",
    "Drop the tile on the column to its right.": "टाइल को उसके दाईं ओर के स्तंभ पर छोड़ो।",
    "Drop the tile on the column to its left.": "टाइल को उसके बाईं ओर के स्तंभ पर छोड़ो।",
    "Team time": "टीम का समय",
    "same time?": "बराबर समय?",
    "Runner": "धावक",
    "Move the tile": "टाइल ले जाओ",
    "Line up": "सीध में करो",
    "Regroup": "हासिल बनाओ",
    "Carry": "हासिल",
    "Break": "तोड़ो",
    "Move": "खिसकाओ",
    "Share": "बाँटो",
    "New sum": "नया सवाल",
    "1 min 5 s": "1 मिनट 5 सेकंड"
  },
  gu: {
    "Time Column Adder": "સમય સ્તંભ સરવાળો",
    "Columns of hours, minutes and seconds, ready to be added.": "કલાક, મિનિટ અને સેકન્ડના સ્તંભ, ઉમેરવા તૈયાર.",
    "You added and took away lengths of time and carried at sixty.": "તમે સમય ઉમેર્યો, બાદ કર્યો અને 60 પર વદી લીધી.",
    "Free play: work any sum column by column, then tap New sum.": "મુક્ત રમત: દરેક દાખલો સ્તંભ પ્રમાણે કરો, પછી નવો દાખલો દબાવો.",
    "Can minutes add up to more than an hour?": "શું મિનિટ ઉમેરાઈને એક કલાકથી વધુ થઈ શકે?",
    "Hours with hours, minutes with minutes": "કલાક સાથે કલાક, મિનિટ સાથે મિનિટ",
    "Minutes with minutes, hours with hours. Which column goes first?": "મિનિટ સાથે મિનિટ, કલાક સાથે કલાક. પહેલાં કયો સ્તંભ?",
    "Tap Line up to put minutes under minutes and hours under hours.": "મિનિટ નીચે મિનિટ, કલાક નીચે કલાક મૂકવા સીધમાં ગોઠવો દબાવો.",
    "The Line up key is under the frame.": "સીધમાં ગોઠવો બટન ચોકઠાની નીચે છે.",
    "Tap the minutes column first, because we start at the right.": "પહેલાં મિનિટનો સ્તંભ દબાવો, આપણે જમણેથી શરૂ કરીએ.",
    "Tap the column headed minutes.": "જે સ્તંભ પર મિનિટ લખ્યું છે તે દબાવો.",
    "Now tap the hours column to add the hours.": "હવે કલાક ઉમેરવા કલાકનો સ્તંભ દબાવો.",
    "The hours column is on the left.": "કલાકનો સ્તંભ ડાબી બાજુ છે.",
    "Add each column as its own sum.": "દરેક સ્તંભને અલગ સરવાળા તરીકે ઉમેરો.",
    "Type each column's total in its own box.": "દરેક સ્તંભનો સરવાળો તેના પોતાના ખાનામાં લખો.",
    "Hours go with hours and minutes with minutes, right-hand column first.": "કલાક કલાક સાથે, મિનિટ મિનિટ સાથે, પહેલાં જમણો સ્તંભ.",
    "You learned: add each unit in its own column, right column first.": "તમે શીખ્યા: દરેક એકમ પોતાના સ્તંભમાં, પહેલાં જમણો.",
    "What is 4 h 10 min + 3 h 25 min?": "4 કલાક 10 મિનિટ + 3 કલાક 25 મિનિટ કેટલું?",
    "4 h 10 min + 3 h 25 min": "4 કલાક 10 મિનિટ + 3 કલાક 25 મિનિટ",
    "Minutes add only to minutes here.": "અહીં મિનિટ ફક્ત મિનિટ સાથે ઉમેરાય.",
    "Yes, 7 h 35 min, each column added on its own.": "હા, 7 કલાક 35 મિનિટ, દરેક સ્તંભ અલગ ઉમેર્યો.",
    "Add 2 h 10 min and 4 h 20 min.": "2 કલાક 10 મિનિટ અને 4 કલાક 20 મિનિટ ઉમેરો.",
    "2 h 10 min + 4 h 20 min": "2 કલાક 10 મિનિટ + 4 કલાક 20 મિનિટ",
    "Hours go with hours, never with minutes.": "કલાક કલાક સાથે જાય, મિનિટ સાથે નહીં.",
    "Yes, 6 h 30 min, hours with hours.": "હા, 6 કલાક 30 મિનિટ, કલાક સાથે કલાક.",
    "Add 5 h 15 min 20 s and 2 h 10 min 30 s.": "5 કલાક 15 મિનિટ 20 સેકન્ડ અને 2 કલાક 10 મિનિટ 30 સેકન્ડ ઉમેરો.",
    "5 h 15 min 20 s + 2 h 10 min 30 s": "5 ક 15 મિ 20 સે + 2 ક 10 મિ 30 સે",
    "Hours, minutes and seconds each add on their own.": "કલાક, મિનિટ અને સેકન્ડ દરેક અલગ ઉમેરાય.",
    "Yes, 7 h 25 min 50 s, three columns.": "હા, 7 કલાક 25 મિનિટ 50 સેકન્ડ, ત્રણ સ્તંભ.",
    "Carrying an hour": "એક કલાકની વદી",
    "Is there a whole hour in the minutes? Wrap it and carry it.": "મિનિટમાં આખો કલાક છે? તેને બાંધીને વદી લઈ જાઓ.",
    "Tap the minutes column to add the minutes.": "મિનિટ ઉમેરવા મિનિટનો સ્તંભ દબાવો.",
    "The minutes column is the one on the right.": "મિનિટનો સ્તંભ જમણી બાજુનો છે.",
    "70 min is more than 60, so tap Regroup.": "70 મિનિટ 60 થી વધુ છે, તો પુનઃસમૂહન દબાવો.",
    "Tap the Regroup key under the frame.": "ચોકઠાની નીચે પુનઃસમૂહન બટન દબાવો.",
    "Drag the 1 h tile to the hours column.": "1 કલાકની ટાઇલને કલાકના સ્તંભમાં ખેંચો.",
    "Move the violet tile to the left.": "જાંબલી ટાઇલને ડાબી બાજુ ખસેડો.",
    "Tap the hours column to add the hours and the carry.": "કલાક અને વદી ઉમેરવા કલાકનો સ્તંભ દબાવો.",
    "Count the carried hour as well.": "વદીનો કલાક પણ ગણો.",
    "Take 60 away from any column that reached 60 or more, to find what stays.": "જે સ્તંભ 60 કે વધુ થયો, તેમાંથી 60 બાદ કરી બાકી જુઓ.",
    "The carry tile joins the next column, then add that column.": "વદીની ટાઇલ આગલા સ્તંભમાં જાય, પછી તે સ્તંભ ઉમેરો.",
    "60 min make 1 h and 60 s make 1 min, so carry at sixty.": "60 મિનિટનો 1 કલાક, 60 સેકન્ડની 1 મિનિટ, તો 60 પર વદી.",
    "You learned: a column of 60 or more gives 1 to the column on its left.": "તમે શીખ્યા: 60 કે વધુનો સ્તંભ ડાબા સ્તંભને 1 આપે.",
    "What is 2 h 50 min + 2 h 35 min?": "2 કલાક 50 મિનિટ + 2 કલાક 35 મિનિટ કેટલું?",
    "2 h 50 min + 2 h 35 min": "2 કલાક 50 મિનિટ + 2 કલાક 35 મિનિટ",
    "What is left in the minutes after the carry?": "વદી પછી મિનિટમાં કેટલું બાકી રહ્યું?",
    "Yes, 5 h 25 min, with 1 h carried.": "હા, 5 કલાક 25 મિનિટ, 1 કલાકની વદી સાથે.",
    "Add 35 min and 50 min and write it in hours and minutes.": "35 મિનિટ અને 50 મિનિટ ઉમેરી કલાક અને મિનિટમાં લખો.",
    "35 min + 50 min": "35 મિનિટ + 50 મિનિટ",
    "Write the minutes that stay, then count the hours.": "બાકી મિનિટ લખો, પછી કલાક ગણો.",
    "Yes, 1 h 25 min, not 85 min.": "હા, 1 કલાક 25 મિનિટ, 85 મિનિટ નહીં.",
    "Add 3 h 45 min 50 s and 2 h 30 min 40 s.": "3 કલાક 45 મિનિટ 50 સેકન્ડ અને 2 કલાક 30 મિનિટ 40 સેકન્ડ ઉમેરો.",
    "3 h 45 min 50 s + 2 h 30 min 40 s": "3 ક 45 મિ 50 સે + 2 ક 30 મિ 40 સે",
    "Check both columns that reached 60: each needs its carry tile.": "60 સુધી પહોંચેલા બંને સ્તંભ જુઓ, દરેકને વદીની ટાઇલ જોઈએ.",
    "Yes, 6 h 16 min 30 s, two carries.": "હા, 6 કલાક 16 મિનિટ 30 સેકન્ડ, બે વદી.",
    "Borrowing an hour": "એક કલાક ઉછીનો",
    "Not enough minutes on top. What can you break to get more?": "ઉપર મિનિટ ઓછી છે. વધુ મેળવવા શું તોડી શકો?",
    "10 min is too few to take 40 from, so tap Break.": "10 મિનિટમાંથી 40 બાદ ન થાય, તો તોડો દબાવો.",
    "Tap the Break key under the frame.": "ચોકઠાની નીચે તોડો બટન દબાવો.",
    "Drag the violet tile to the minutes column.": "જાંબલી ટાઇલને મિનિટના સ્તંભમાં ખેંચો.",
    "Move the tile to the column on the right.": "ટાઇલને જમણી બાજુના સ્તંભમાં ખસેડો.",
    "Tap the minutes column to take away the minutes.": "મિનિટ બાદ કરવા મિનિટનો સ્તંભ દબાવો.",
    "The minutes column is at the right.": "મિનિટનો સ્તંભ જમણી બાજુ છે.",
    "Now tap the hours column to take away the hours.": "હવે કલાક બાદ કરવા કલાકનો સ્તંભ દબાવો.",
    "Take the bottom hours from the top hours.": "ઉપરના કલાકમાંથી નીચેના કલાક બાદ કરો.",
    "Is the new top now bigger than the minutes you take away?": "શું નવી ઉપરની સંખ્યા બાદ કરવાની મિનિટથી મોટી છે?",
    "Then take away the hours, using the hours left after the break.": "પછી તોડ્યા પછી બચેલા કલાકમાંથી કલાક બાદ કરો.",
    "When the top is too small, break 1 h into minutes first.": "ઉપર ઓછું હોય તો પહેલાં 1 કલાકને મિનિટમાં તોડો.",
    "You learned: break 1 h into minutes when the top is too small.": "તમે શીખ્યા: ઉપર ઓછું હોય તો 1 કલાક મિનિટમાં તોડો.",
    "What is 8 h 5 min - 3 h 30 min?": "8 કલાક 5 મિનિટ - 3 કલાક 30 મિનિટ કેટલું?",
    "8 h 5 min - 3 h 30 min": "8 કલાક 5 મિનિટ - 3 કલાક 30 મિનિટ",
    "Take the minutes from the new top in the minutes column.": "મિનિટના સ્તંભમાં નવી ઉપરની સંખ્યામાંથી મિનિટ બાદ કરો.",
    "Yes, 4 h 35 min, after breaking 1 h.": "હા, 4 કલાક 35 મિનિટ, 1 કલાક તોડીને.",
    "To take 25 min from 2 h 10 min, 1 h is regrouped as how many minutes?": "2 કલાક 10 મિનિટમાંથી 25 મિનિટ બાદ કરવા 1 કલાક કેટલી મિનિટ બને?",
    "1 h is how many min?": "1 કલાક = કેટલી મિનિટ?",
    "How many minutes make 1 h?": "કેટલી મિનિટનો 1 કલાક થાય?",
    "Think how far the minute hand goes round in 1 h.": "વિચારો, 1 કલાકમાં મિનિટ કાંટો કેટલું ફરે.",
    "Count the minute marks once round a clock face.": "ઘડિયાળના એક ચક્કરના મિનિટના કાપા ગણો.",
    "Yes, 1 h is regrouped as 60 min.": "હા, 1 કલાક 60 મિનિટ બને.",
    "Take 2 h 55 min from 6 h 20 min.": "6 કલાક 20 મિનિટમાંથી 2 કલાક 55 મિનિટ બાદ કરો.",
    "6 h 20 min - 2 h 55 min": "6 કલાક 20 મિનિટ - 2 કલાક 55 મિનિટ",
    "Use the new tops the pencil wrote, then take away.": "પેન્સિલે લખેલી નવી ઉપરની સંખ્યાઓ લો, પછી બાદ કરો.",
    "Yes, 3 h 25 min left.": "હા, 3 કલાક 25 મિનિટ બાકી.",
    "Seconds and hundredths": "સેકન્ડ અને શતાંશ",
    "Points in a line. Would every runner take the same time?": "ચિહ્ન એક સીધમાં. શું દરેક દોડવીર સરખો સમય લેશે?",
    "Tap Line up to put the two points in one line.": "બંને દશાંશ ચિહ્ન એક સીધમાં લાવવા સીધમાં ગોઠવો દબાવો.",
    "Tap the seconds column to add the hundredths and the seconds.": "શતાંશ અને સેકન્ડ ઉમેરવા સેકન્ડનો સ્તંભ દબાવો.",
    "The seconds column is at the right.": "સેકન્ડનો સ્તંભ જમણી બાજુ છે.",
    "Take away the hundredths first, then the whole seconds.": "પહેલાં શતાંશ બાદ કરો, પછી આખી સેકન્ડ.",
    "The two minutes match now, so the answer is only seconds.": "હવે બંને મિનિટ સરખી છે, તો જવાબ ફક્ત સેકન્ડમાં.",
    "Line up the points, and share a team time only if all ran the same.": "ચિહ્ન સીધમાં રાખો, ટીમનો સમય ત્યારે જ વહેંચો જ્યારે બધા સરખું દોડે.",
    "You learned: line up the points, and share only if all ran the same.": "તમે શીખ્યા: ચિહ્ન સીધમાં રાખો, બધા સરખું દોડે તો જ વહેંચો.",
    "What is 3 min 4.20 s - 2 min 51.75 s?": "3 મિનિટ 4.20 સેકન્ડ - 2 મિનિટ 51.75 સેકન્ડ કેટલું?",
    "3 min 4.20 s - 2 min 51.75 s": "3 મિ 4.20 સે - 2 મિ 51.75 સે",
    "Use the new top that the pencil wrote in the seconds column.": "સેકન્ડના સ્તંભમાં પેન્સિલે લખેલી નવી ઉપરની સંખ્યા લો.",
    "Yes, 12.45 s, after borrowing 1 min.": "હા, 12.45 સેકન્ડ, 1 મિનિટ ઉછીની લઈને.",
    "Add 3.25 s and 4.50 s.": "3.25 સેકન્ડ અને 4.50 સેકન્ડ ઉમેરો.",
    "3.25 s + 4.50 s": "3.25 સેકન્ડ + 4.50 સેકન્ડ",
    "Add the hundredths first, then the seconds.": "પહેલાં શતાંશ ઉમેરો, પછી સેકન્ડ.",
    "Keep the point of the answer under the two points.": "જવાબનું ચિહ્ન બંને ચિહ્નની નીચે રાખો.",
    "Read 4.50 as 4 s and 50 hundredths.": "4.50 ને 4 સેકન્ડ અને 50 શતાંશ વાંચો.",
    "Yes, 7.75 s, hundredths under hundredths.": "હા, 7.75 સેકન્ડ, શતાંશ નીચે શતાંશ.",
    "If 4 runners shared 4 min 20 s equally, how long did each run?": "4 દોડવીરોએ 4 મિનિટ 20 સેકન્ડ સરખી વહેંચી, તો દરેક કેટલું દોડ્યો?",
    "4 min 20 s shared by 4": "4 મિનિટ 20 સેકન્ડ, 4 માં વહેંચો",
    "Sixty seconds make a minute: write the whole minutes in the minutes box.": "60 સેકન્ડની એક મિનિટ: આખી મિનિટ મિનિટના ખાનામાં લખો.",
    "Equally means every runner gets a pile the same size.": "સરખું એટલે દરેક દોડવીરને સરખો ઢગલો મળે.",
    "Think: 4 times what number makes 20?": "વિચારો: 4 ગુણ્યા કઈ સંખ્યા 20 થાય?",
    "Yes, 1 min 5 s each, but only if all ran the same.": "હા, દરેક 1 મિનિટ 5 સેકન્ડ, જો બધા સરખું દોડ્યા હોય.",
    "Tap Line up first.": "પહેલાં સીધમાં ગોઠવો દબાવો.",
    "Tap Regroup first.": "પહેલાં પુનઃસમૂહન દબાવો.",
    "Move the violet tile first.": "પહેલાં જાંબલી ટાઇલ ખસેડો.",
    "Tap Break first.": "પહેલાં તોડો દબાવો.",
    "Tap Share first.": "પહેલાં વહેંચો દબાવો.",
    "hours": "કલાક",
    "minutes": "મિનિટ",
    "seconds": "સેકન્ડ",
    "h": "ક",
    "min": "મિ",
    "s": "સે",
    "1 h": "1 કલાક",
    "1 min": "1 મિનિટ",
    "60 min": "60 મિનિટ",
    "60 s": "60 સેકન્ડ",
    "20 s": "20 સેકન્ડ",
    "Given": "આપેલ",
    "Answer": "જવાબ",
    "Place holder": "સ્થાનધારક",
    "seconds box": "સેકન્ડનું ખાનું",
    "minutes box": "મિનિટનું ખાનું",
    "hours box": "કલાકનું ખાનું",
    "Each": "દરેક",
    "Borrow": "ઉછીનું",
    "Drop the tile on the column to its right.": "ટાઇલને તેની જમણી બાજુના સ્તંભ પર મૂકો.",
    "Drop the tile on the column to its left.": "ટાઇલને તેની ડાબી બાજુના સ્તંભ પર મૂકો.",
    "Team time": "ટીમનો સમય",
    "same time?": "સરખો સમય?",
    "Runner": "દોડવીર",
    "Move the tile": "ટાઇલ ખસેડો",
    "Line up": "સીધમાં ગોઠવો",
    "Regroup": "પુનઃસમૂહન",
    "Carry": "વદી",
    "Break": "તોડો",
    "Move": "ખસેડો",
    "Share": "વહેંચો",
    "New sum": "નવો દાખલો",
    "1 min 5 s": "1 મિનિટ 5 સેકન્ડ"
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
/* The column frame (MODEL): a problem is { op, cols, a, b, dec?, line? }; a and b hold each column's value (in a decimal
   seconds column, hundredths). Columns run big to small (h, min, s); 60 of one make 1 of the next, never 10. */
const TC_SYM: any = { h: "h", min: "min", s: "s" };
const TC_NAME: any = { h: "hours", min: "minutes", s: "seconds" };
const TC_KEY: any = { line: "Line up", wrap: "Regroup", carry: "Carry", break: "Break", move: "Move", share: "Share", new: "New sum" };
const TC_BLUE = "#0B4F8A", TC_GREEN = "#17703F", TC_VIOLET = "#6A3D9A", TC_AMBER = "#E69F00", TC_GREY = "#767676", TC_INK = "#2B2B2B";
const P_ = (op: string, cols: string[], a: any, b: any, more?: any) => ({ op, cols, a, b, ...(more || {}) });
const TC_FREE = [
  P_("+", ["h", "min"], { h: 1, min: 45 }, { h: 2, min: 30 }),
  P_("-", ["h", "min"], { h: 5, min: 15 }, { h: 2, min: 40 }),
  P_("+", ["h", "min", "s"], { h: 2, min: 35, s: 40 }, { h: 1, min: 20, s: 35 }),
  P_("-", ["min", "s"], { min: 4, s: 10 }, { min: 1, s: 45 }),
];

const PHASES = [
  {
    n: 1,
    concept: "Hours with hours, minutes with minutes",
    conceptId: "M2.S4.T6.C25", objectiveIds: ["O9"],
    says: ["Minutes with minutes, hours with hours. Which column goes first?"],
    /* warm-up 1 h 20 min + 2 h 15 min (3 h 35 min, none of the answers): line up, then the right-hand column first */
    warm: P_("+", ["h", "min"], { h: 1, min: 20 }, { h: 2, min: 15 }, { line: true }),
    steps: [
      { say: "Tap Line up to put minutes under minutes and hours under hours.", on: "line", hint: "The Line up key is under the frame." },
      { say: "Tap the minutes column first, because we start at the right.", on: "col-min", hint: "Tap the column headed minutes." },
      { say: "Now tap the hours column to add the hours.", on: "col-h", hint: "The hours column is on the left." },
    ],
    ladder: ["Add each column as its own sum.", "Type each column's total in its own box."],
    closing: "Hours go with hours and minutes with minutes, right-hand column first.",
    learned: "You learned: add each unit in its own column, right column first.",
    traceback: "each column is lit amber in turn from the right and its total is written in green under it, ending on the whole answer with its units",
    items: [
      /* learn TC1: answer in the plan = 7 h 35 min. */
      { qid: "M2.S4.T6.C25:TC1", kind: "add", say: "What is 4 h 10 min + 3 h 25 min?", ask: "4 h 10 min + 3 h 25 min",
        prob: P_("+", ["h", "min"], { h: 4, min: 10 }, { h: 3, min: 25 }),
        parts: [{ label: "hours" }, { label: "minutes" }], answer: [7, 35], near: "0|42",
        miss: "Minutes add only to minutes here.", win: "Yes, 7 h 35 min, each column added on its own." },
      /* practice 1: answer in the plan = 6 h 30 min */
      { qid: "M2.S4.T6.C25:1", kind: "add", say: "Add 2 h 10 min and 4 h 20 min.", ask: "2 h 10 min + 4 h 20 min",
        prob: P_("+", ["h", "min"], { h: 2, min: 10 }, { h: 4, min: 20 }),
        parts: [{ label: "hours" }, { label: "minutes" }], answer: [6, 30], near: "0|36",
        miss: "Hours go with hours, never with minutes.", win: "Yes, 6 h 30 min, hours with hours." },
      /* practice 5: answer in the plan = 7 h 25 min 50 s */
      { qid: "M2.S4.T6.C25:5", kind: "add", say: "Add 5 h 15 min 20 s and 2 h 10 min 30 s.", ask: "5 h 15 min 20 s + 2 h 10 min 30 s",
        prob: P_("+", ["h", "min", "s"], { h: 5, min: 15, s: 20 }, { h: 2, min: 10, s: 30 }),
        parts: [{ label: "hours" }, { label: "minutes" }, { label: "seconds" }], answer: [7, 25, 50], near: "0|32|50",
        miss: "Hours, minutes and seconds each add on their own.", win: "Yes, 7 h 25 min 50 s, three columns." },
    ],
  },
  {
    n: 2,
    concept: "Carrying an hour",
    conceptId: "M2.S4.T6.C26", objectiveIds: ["O9"],
    says: ["Is there a whole hour in the minutes? Wrap it and carry it."],
    /* warm-up 1 h 40 min + 1 h 30 min (3 h 10 min, none of the answers) */
    warm: P_("+", ["h", "min"], { h: 1, min: 40 }, { h: 1, min: 30 }),
    steps: [
      { say: "Tap the minutes column to add the minutes.", on: "col-min", hint: "The minutes column is the one on the right." },
      { say: "70 min is more than 60, so tap Regroup.", on: "wrap", hint: "Tap the Regroup key under the frame." },
      { say: "Drag the 1 h tile to the hours column.", on: "carry", hint: "Move the violet tile to the left." },
      { say: "Tap the hours column to add the hours and the carry.", on: "col-h", hint: "Count the carried hour as well." },
    ],
    ladder: ["Take 60 away from any column that reached 60 or more, to find what stays.", "The carry tile joins the next column, then add that column."],
    closing: "60 min make 1 h and 60 s make 1 min, so carry at sixty.",
    learned: "You learned: a column of 60 or more gives 1 to the column on its left.",
    traceback: "each column is lit amber in turn from the right, the carried tile stays in the next column, and the totals are written in green, ending on the whole answer",
    items: [
      /* learn TC2: answer in the plan = 5 h 25 min. */
      { qid: "M2.S4.T6.C26:TC2", kind: "add", say: "What is 2 h 50 min + 2 h 35 min?", ask: "2 h 50 min + 2 h 35 min",
        prob: P_("+", ["h", "min"], { h: 2, min: 50 }, { h: 2, min: 35 }),
        parts: [{ label: "hours" }, { label: "minutes" }], answer: [5, 25], near: "4|85",
        miss: "What is left in the minutes after the carry?", win: "Yes, 5 h 25 min, with 1 h carried." },
      /* practice 2: answer in the plan = 1 h 25 min, because 35 + 50 = 85 and 85 min is 1 h 25 min */
      { qid: "M2.S4.T6.C26:2", kind: "add", say: "Add 35 min and 50 min and write it in hours and minutes.", ask: "35 min + 50 min",
        prob: P_("+", ["h", "min"], { min: 35 }, { min: 50 }),
        parts: [{ label: "hours" }, { label: "minutes" }], answer: [1, 25], near: "0|85",
        miss: "Write the minutes that stay, then count the hours.", win: "Yes, 1 h 25 min, not 85 min." },
      /* practice 6: answer in the plan = 6 h 16 min 30 s */
      { qid: "M2.S4.T6.C26:6", kind: "add", say: "Add 3 h 45 min 50 s and 2 h 30 min 40 s.", ask: "3 h 45 min 50 s + 2 h 30 min 40 s",
        prob: P_("+", ["h", "min", "s"], { h: 3, min: 45, s: 50 }, { h: 2, min: 30, s: 40 }),
        parts: [{ label: "hours" }, { label: "minutes" }, { label: "seconds" }], answer: [6, 16, 30], near: "5|75|90",
        miss: "Check both columns that reached 60: each needs its carry tile.", win: "Yes, 6 h 16 min 30 s, two carries." },
    ],
  },
  {
    n: 3,
    concept: "Borrowing an hour",
    conceptId: "M2.S4.T6.C27", objectiveIds: ["O10"],
    says: ["Not enough minutes on top. What can you break to get more?"],
    /* warm-up 5 h 10 min - 2 h 40 min (2 h 30 min, none of the answers) */
    warm: P_("-", ["h", "min"], { h: 5, min: 10 }, { h: 2, min: 40 }),
    steps: [
      { say: "10 min is too few to take 40 from, so tap Break.", on: "break", hint: "Tap the Break key under the frame." },
      { say: "Drag the violet tile to the minutes column.", on: "move", hint: "Move the tile to the column on the right." },
      { say: "Tap the minutes column to take away the minutes.", on: "col-min", hint: "The minutes column is at the right." },
      { say: "Now tap the hours column to take away the hours.", on: "col-h", hint: "Take the bottom hours from the top hours." },
    ],
    ladder: ["Is the new top now bigger than the minutes you take away?", "Then take away the hours, using the hours left after the break."],
    closing: "When the top is too small, break 1 h into minutes first.",
    learned: "You learned: break 1 h into minutes when the top is too small.",
    traceback: "the broken hour and its 60 minutes stay in place, each column is lit amber in turn from the right and what is left is written in green, ending on the whole answer",
    items: [
      /* learn TC3: answer in the plan = 4 h 35 min. */
      { qid: "M2.S4.T6.C27:TC3", kind: "sub", say: "What is 8 h 5 min - 3 h 30 min?", ask: "8 h 5 min - 3 h 30 min",
        prob: P_("-", ["h", "min"], { h: 8, min: 5 }, { h: 3, min: 30 }),
        parts: [{ label: "hours" }, { label: "minutes" }], answer: [4, 35], near: "5|25",
        miss: "Take the minutes from the new top in the minutes column.", win: "Yes, 4 h 35 min, after breaking 1 h." },
      /* practice 3: answer in the plan = 60 min, so 2 h 10 min becomes 1 h 70 min (a recall: no act gates it) */
      { qid: "M2.S4.T6.C27:3", kind: "sub", say: "To take 25 min from 2 h 10 min, 1 h is regrouped as how many minutes?", ask: "1 h is how many min?",
        prob: P_("-", ["h", "min"], { h: 2, min: 10 }, { min: 25 }), noGate: true,
        parts: [{ label: "minutes" }], answer: [60], near: "100",
        miss: "How many minutes make 1 h?", win: "Yes, 1 h is regrouped as 60 min.",
        ladder: ["Think how far the minute hand goes round in 1 h.", "Count the minute marks once round a clock face."] },
      /* practice 7: answer in the plan = 3 h 25 min */
      { qid: "M2.S4.T6.C27:7", kind: "sub", say: "Take 2 h 55 min from 6 h 20 min.", ask: "6 h 20 min - 2 h 55 min",
        prob: P_("-", ["h", "min"], { h: 6, min: 20 }, { h: 2, min: 55 }),
        parts: [{ label: "hours" }, { label: "minutes" }], answer: [3, 25], near: "4|35",
        miss: "Use the new tops the pencil wrote, then take away.", win: "Yes, 3 h 25 min left." },
    ],
  },
  {
    n: 4,
    concept: "Seconds and hundredths",
    conceptId: "M2.S4.T6.C28", objectiveIds: ["O10"],
    says: ["Points in a line. Would every runner take the same time?"],
    /* warm-up 1.05 s + 12.30 s (13.35 s, none of the answers) */
    warm: P_("+", ["min", "s"], { s: 105 }, { s: 1230 }, { dec: true, line: true }),
    steps: [
      { say: "Tap Line up to put the two points in one line.", on: "line", hint: "The Line up key is under the frame." },
      { say: "Tap the seconds column to add the hundredths and the seconds.", on: "col-s", hint: "The seconds column is at the right." },
    ],
    ladder: ["Take away the hundredths first, then the whole seconds.", "The two minutes match now, so the answer is only seconds."],
    closing: "Line up the points, and share a team time only if all ran the same.",
    learned: "You learned: line up the points, and share only if all ran the same.",
    traceback: "the two points are locked in a line, each column is lit amber in turn from the right and the answer is written in green with its point in line; a shared time is dealt lane by lane",
    items: [
      /* learn TC4: answer in the plan = 12.45 s. */
      { qid: "M2.S4.T6.C28:TC4", kind: "sub", say: "What is 3 min 4.20 s - 2 min 51.75 s?", ask: "3 min 4.20 s - 2 min 51.75 s",
        prob: P_("-", ["min", "s"], { min: 3, s: 420 }, { min: 2, s: 5175 }, { dec: true, line: true }),
        answer: "12.45", near: "52.45",
        miss: "Use the new top that the pencil wrote in the seconds column.", win: "Yes, 12.45 s, after borrowing 1 min." },
      /* practice 4: answer in the plan = 7.75 s */
      { qid: "M2.S4.T6.C28:4", kind: "add", say: "Add 3.25 s and 4.50 s.", ask: "3.25 s + 4.50 s",
        prob: P_("+", ["min", "s"], { s: 325 }, { s: 450 }, { dec: true, line: true }),
        answer: "7.75", near: "7.30",
        miss: "Add the hundredths first, then the seconds.",
        ladder: ["Keep the point of the answer under the two points.", "Read 4.50 as 4 s and 50 hundredths."], win: "Yes, 7.75 s, hundredths under hundredths." },
      /* practice 8: answer in the plan = 1 min 5 s each, if each runner took the same time, because 4 min 20 s is 260 s and 260 divided by 4 is 65 s */
      { qid: "M2.S4.T6.C28:8", kind: "share", say: "If 4 runners shared 4 min 20 s equally, how long did each run?", ask: "4 min 20 s shared by 4",
        parts: [{ label: "minutes" }, { label: "seconds" }], answer: [1, 5], near: "0|65",
        miss: "Sixty seconds make a minute: write the whole minutes in the minutes box.",
        ladder: ["Equally means every runner gets a pile the same size.", "Think: 4 times what number makes 20?"],
        win: "Yes, 1 min 5 s each, but only if all ran the same." },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  radix: 60,
  columns: ["h", "min", "s"],
  frame: { left: 20, op: 64, col: 176, decCol: 300, rows: { head: 40, lane: 86, carry: 156, given1: 218, given2: 300, rule: 346, answer: 392 } },
  share: { runners: 4, team: { min: 4, s: 20 } },
  free: TC_FREE,
};

/* ── the maths ─────────────────────────────────────────────────────────────────────────────── */
/* tcPlan: the acts a problem needs, in order, and each column's result. `full` adds the column taps (warm-ups and free play);
   a question keeps only the acts that set the frame up (line up, regroup, carry, break, move), never a column's total. */
function tcPlan(p: any, full: boolean) {
  const cols = p.cols, L = cols.length, acts: any[] = [], res: any = {}, top: any = {};
  const R = (c: string) => (p.dec && c === "s" ? 6000 : 60);
  cols.forEach((c: string) => (top[c] = p.a[c] || 0));
  if (p.line) acts.push({ id: "line", kind: "line" });
  let carry = 0;
  for (let i = L - 1; i >= 0; i--) {
    const c = cols[i], bv = p.b[c] || 0;
    if (p.op === "+") {
      const sum = top[c] + bv + carry, empty = !top[c] && !bv && !carry, wrap = sum >= R(c) && i > 0;
      if (full && !empty) acts.push({ id: "col-" + c, kind: "col", col: c, v: sum, wrapAfter: wrap });
      if (wrap) {
        acts.push({ id: "wrap", kind: "wrap", col: c, to: cols[i - 1], v: sum - R(c) });
        acts.push({ id: "carry", kind: "carry", col: c, to: cols[i - 1] });
      }
      carry = wrap ? 1 : 0;
      res[c] = { v: wrap ? sum - R(c) : sum, empty };
    } else {
      if (top[c] < bv && i > 0) {
        const up = cols[i - 1];
        acts.push({ id: "break", kind: "break", col: up, to: c, v: top[up] - 1 });
        top[up] -= 1;
        acts.push({ id: "move", kind: "move", col: up, to: c, v: top[c] + R(c) });
        top[c] += R(c);
      }
      const empty = !(p.a[c] || 0) && !bv;
      res[c] = { v: top[c] - bv, empty };
      if (full && !empty) acts.push({ id: "col-" + c, kind: "col", col: c, v: top[c] - bv });
    }
  }
  return { acts, res };
}
const tcDec = (v: number) => (v / 100).toFixed(2);
const tcVal = (p: any, c: string, v: number) => (p.dec && c === "s" ? tcDec(v) : String(v));
/* an item's answer as written ("7 h 35 min", "12.45 s") */
const TC_UNIT_OF: any = { hours: "h", minutes: "min", seconds: "s" };
const tcWritten = (it: any) => (it.parts ? it.answer.map((x: any, j: number) => x + " " + TC_UNIT_OF[it.parts[j].label]).join(" ") : it.answer + " s");

/* judge: is this value right for this item? (numbers compare as numbers; a decimal in its written form) */
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  return String(v).trim().replace(/^0+(?=\d)/, "") === String(item.answer);
};
/* oracle: every answer again by a second route, through total seconds (or hundredths), sharing no code with judge or tcPlan */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.kind === "share") { const each = (MODEL.share.team.min * 60 + MODEL.share.team.s) / MODEL.share.runners; return it.answer[0] === Math.floor(each / 60) && it.answer[1] === each % 60; }
  const q = it.prob;
  if (it.noGate) return it.answer[0] === 3600 / 60;
  if (q.dec) { const t = (o: any) => (o.min || 0) * 6000 + (o.s || 0); const d = q.op === "+" ? t(q.a) + t(q.b) : t(q.a) - t(q.b); return d < 6000 && (d / 100).toFixed(2) === it.answer; }
  const sec = (o: any) => (o.h || 0) * 3600 + (o.min || 0) * 60 + (o.s || 0);
  const tot = q.op === "+" ? sec(q.a) + sec(q.b) : sec(q.a) - sec(q.b);
  const want = q.cols.length === 3 ? [Math.floor(tot / 3600), Math.floor(tot / 60) % 60, tot % 60] : [Math.floor(tot / 3600), Math.floor(tot / 60) % 60];
  return want.length === it.answer.length && want.every((x: number, j: number) => x === it.answer[j]);
}));
/* the most likely wrong answer (the misconception: no carry, a carry at ten, digits lined up from the right); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => {
  const f = [tcWritten(item)];
  if (!item.parts) return [String(item.answer), ...f];
  item.answer.forEach((x: number) => { if (x >= 10 && !new RegExp("\\b" + x + "\\b").test(item.say)) f.push(String(x)); });
  return f;
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (T.state().stage === "demo") return HOOK.demo && HOOK.demo();
  if (HOOK.finish) HOOK.finish();
  return T.submit(item.parts ? item.answer.join("|") : item.answer);
};
/* the agent's answer(): it does any act the question still waits for, then a decimal is typed with its point
   (toolApi.answer strips the point) and a parts answer falls back to the runtime's typing */
const answer = (item: any, v: any) => {
  if (HOOK.finish) HOOK.finish();
  if (!item.parts && HOOK.type) { HOOK.type(String(v)); return true; }
  return undefined;
};
/* the agent's check() before Enter: it does the acts the question still waits for at once (undefined = press Enter);
   in a guide-steps phase (stage "demo") it returns undefined, so the agent's check() reaches api.onEnter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* the frame's geometry, in Work coordinates */
const TC_F = { x: 20, op: 64, col: 190, dec: 300, head: 40, lane: 90, carry: 154, g1: 214, g2: 292, rule: 336, ans: 376, top: 124, bot: 420, key: 440, keyCx: 440 };
function tcGeo(p: any) {
  let x = TC_F.x + TC_F.op;
  const cols = p.cols.map((c: string) => { const w = p.dec && c === "s" ? TC_F.dec : TC_F.col; const o = { c, x, w, cx: x + w / 2 }; x += w; return o; });
  const at: any = {};
  cols.forEach((o: any) => (at[o.c] = o));
  return { cols, at, right: x };
}
/* a decimal seconds column draws "dd.dd" in equal cells, so the points of every row stand in one line */
const TC_CELL = 0.6;
/* the baseline, below a box's centre, that centres a 32-unit label by its INK (hi matras rise higher than Latin capitals) */
const tcBase = (lang: string) => (lang === "hi" ? 17 : lang === "gu" ? 13 : 11);
/* the width of a label in em: Latin 0.6 (space 0.3); Devanagari/Gujarati base letters 0.62, spacing vowel signs 0.3,
   zero-advance marks 0 (PATTERNS §18's list) */
const TC_ZERO = /[\u0900-\u0902\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962\u0963\u0A81\u0A82\u0ABC\u0AC1-\u0AC8\u0ACD\u0AE2\u0AE3]/;
const TC_SPACING = /[\u093E-\u0940\u0949-\u094C\u0ABE-\u0AC0\u0AC9\u0ACB\u0ACC\u0903\u0A83]/;
const tcEm = (label: string) => Array.from(String(label)).reduce((w: number, ch: string) => w + (TC_ZERO.test(ch) ? 0 : TC_SPACING.test(ch) ? 0.3 : ch === " " ? 0.3 : /[\u0900-\u0AFF]/.test(ch) ? 0.62 : 0.6), 0);
/* a label's width: measured on a canvas in the tool's own font, never under a safe estimate (Devanagari 0.72 em, Gujarati
   0.55 em a non-combining character); cached only once the fonts have loaded */
const TC_MW: any = {};
let TC_CV: any = null;
const tcTextW = (label: string, size: number, weight = 700) => {
  const s = String(label), k = weight + "|" + size + "|" + s;
  if (TC_MW[k]) return TC_MW[k];
  let w = 0;
  const fnt = weight + " " + size + "px " + FONT;
  try { TC_CV = TC_CV || document.createElement("canvas"); const ctx = TC_CV.getContext("2d"); ctx.font = fnt; w = ctx.measureText(s).width; } catch (e) { w = 0; }
  const est = Array.from(s).reduce((a: number, ch: string) => a + (TC_ZERO.test(ch) ? 0 : /[\u0900-\u097F]/.test(ch) ? 0.72 : /[\u0A80-\u0AFF]/.test(ch) ? 0.55 : ch === " " ? 0.28 : 0.5), 0) * size;
  const r = Math.max(w, est);
  /* cached only once the font that draws it has loaded: a direct mount measures the fallback face first */
  try { if (document.fonts && document.fonts.status === "loaded" && document.fonts.check(fnt, s)) TC_MW[k] = r; } catch (e) { /* keep measuring */ }
  return r;
};
/* the baseline offset, from a box's centre, that centres THIS label's own ink (falls back to tcBase) */
const TC_MI: any = {};
const tcInkBase = (label: string, size: number, lang: string, weight = 600) => {
  const s = String(label), fnt = weight + " " + size + "px " + FONT, k = fnt + "|" + s;
  if (TC_MI[k] !== undefined) return TC_MI[k];
  let r = tcBase(lang);
  try {
    TC_CV = TC_CV || document.createElement("canvas"); const ctx = TC_CV.getContext("2d"); ctx.font = fnt;
    const m = ctx.measureText(s);
    if (m.actualBoundingBoxAscent > 0) r = Math.round((m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2);
    if (document.fonts && document.fonts.status === "loaded" && document.fonts.check(fnt, s)) TC_MI[k] = r;
  } catch (e) { /* the fixed offset stays */ }
  return r;
};
/* a violet tile is as wide as its measured label + 24 (at least 96, at most a column) */
const tcTileW = (label: string) => Math.max(96, Math.min(184, tcTextW(label, T.label) + 24));
const tcDecX0 = (o: any, size: number) => o.cx - 2.5 * size * TC_CELL;
let TC_KEYT = 0;
let TC_REAL = false;

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
   The slot is the runtime's: a miss empties it (MISS CLEARS THE SLOT), so `typed` is "" from the miss on and
   wrong.value is what the child sent; never write the slot (api.setTyped) during the traceback.
   stage === "free" is Free play (the plan's writeup.freePlay): no target, every control unlocked.
   Sound effects where the picture moves: api.sfx.cut() (a knife), settle() (pieces come to rest),
   trade() (pieces close into one), tick() (a snap); correct, wrong, win and cheer are the runtime's.
   step / stepOn: the guide step the child is on and the act it waits for (null outside a steps phase).
   nextKey: true (the ToolFrame below, runtime r48+): nothing moves on by itself. After a right answer the win picture
   stays on the board until the child presses the blinking Next key, so never reset it on a timer (PATTERNS.md 9d).
   A SKIN (docs/IMAGES.md, docs/PATTERNS.md §14): when the slot has an images.tsx, draw <Skin name x y w h clip /> over
   the plain shape the tool already draws for the object (the plain shape stays the fallback); never a raster tag of your own here (no-raster-in-tool).
   */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const tw = useTimeline();
  const free = stage === "free";
  const demo = !free && (stage === "demo" || (stage === "teach" && !!phase.steps));
  const share = !free && !demo && item && item.kind === "share";

  /* the board belongs to an ENTRY of a question (PATTERNS §18): rebuilt whenever the question key changes */
  const qk = free ? "free" : demo ? "d" + n : "q" + n + "." + index;
  const ent = useRef<any>({ qk: "", e: 0 });
  if (ent.current.qk !== qk) ent.current = { qk, e: ent.current.e + 1 };
  const fresh = (e: number, fi = 0) => ({ e, k: 0, w: null, fold: null, travel: false, deal: 0, tb: 0, fi });
  const [raw, setRaw] = useState<any>(null);
  const S = raw && raw.e === ent.current.e ? raw : fresh(ent.current.e, raw ? raw.fi : 0);
  /* an update belongs to the entry it was made in: one that lands after the question changed (the last guide step's act
     resolving as the question opens) is dropped, never applied to the new board */
  const put = (f: any) => { const e0 = ent.current.e; setRaw((p: any) => {
    if (e0 !== ent.current.e) return p;
    const b = p && p.e === ent.current.e ? p : fresh(ent.current.e, p ? p.fi : 0);
    return { ...b, ...(typeof f === "function" ? f(b) : f) };
  }); };

  const prob = free ? TC_FREE[S.fi % TC_FREE.length] : demo ? phase.warm : share ? null : item.prob;
  const plan = prob ? tcPlan(prob, free || demo) : { acts: [{ id: "share", kind: "share" }], res: {} };
  const acts = plan.acts;
  const won = !free && !demo && (stage === "win" || stage === "idle");
  const tbOn = !free && !demo && !!wrong;
  const showAll = won || tbOn;
  /* a recall question with no act (phase 3 question 2) shows only the broken hour and its 60-minute tile at the win and after a miss */
  const recall = !free && !demo && item && item.noGate;
  const kk = showAll ? (recall ? 1 : acts.length) : Math.min(acts.length, S.k + (S.w ? 1 : 0));
  const next = !showAll && S.k < acts.length ? acts[S.k] : null;
  const pending = stage === "ask" && item && !item.noGate ? acts.length - S.k : 0;
  const [real, setReal] = useState(TC_REAL);
  /* redraw once the fonts have loaded, so every measured tile and chip is re-measured in the real face */
  const [, setFontsV] = useState(0);
  useEffect(() => {
    const fs: any = typeof document !== "undefined" ? (document as any).fonts : null;
    if (!fs) return;
    let live = true;
    const bump = () => { if (live) setFontsV((v: number) => v + 1); };
    try { fs.ready.then(bump); if (fs.addEventListener) fs.addEventListener("loadingdone", bump); } catch (e) { /* no FontFaceSet */ }
    return () => { live = false; try { if (fs.removeEventListener) fs.removeEventListener("loadingdone", bump); } catch (e) { /* nothing */ } };
  }, []);
  /* the gate is for a child's own mount only (user mode): the teacher agent (AI mode) is never locked out */
  const userMode = () => { try { const b: any = document.querySelector('[data-zone="bar"]'); return !b || b.getAttribute("data-mode") !== "ai"; } catch (e) { return true; } };
  const touch = () => { if (!TC_REAL) TC_REAL = true; if (!real) setReal(true); };
  /* the act nudge (sibling rule): a digit, a plain Enter or a tap on the dimmed Answer key while the act still waits shows ONE
     line naming the act that waits now; the question comes back by itself after max(2.6 s, 68 ms a character), and the
     Hint key shows the question at once while a nudge is up */
  const sayRef = useRef<any>(null);
  sayRef.current = item ? item.say : null;
  const nudgeT = useRef<any>(null);
  const nudge = (line: string) => {
    nudged.current = true;
    if (nudgeT.current) clearTimeout(nudgeT.current);
    const q = sayRef.current, e0 = ent.current.e;
    nudgeT.current = setTimeout(() => { nudgeT.current = null; if (nudged.current && ent.current.e === e0 && q) { nudged.current = false; api.say(q); } }, Math.max(2600, 68 * line.length));
  };
  /* the act nudge holds 1.2 s after a question opens (stamped per entry), so a double Enter on the last guide step ends on
     the question, not on a nudge; nothing else is held */
  const openAt = useRef(0);
  useEffect(() => { if (stage === "ask") openAt.current = Date.now(); }, [qk, stage === "ask"]);
  const actNudge = (g: string) => {
    if (Date.now() - openAt.current < 1200) return;
    if (g === "line") { nudge("Tap Line up first."); api.say("Tap Line up first."); }
    else if (g === "wrap") { nudge("Tap Regroup first."); api.say("Tap Regroup first."); }
    else if (g === "carry" || g === "move") { nudge("Move the violet tile first."); api.say("Move the violet tile first."); }
    else if (g === "break") { nudge("Tap Break first."); api.say("Tap Break first."); }
    else if (g === "share") { nudge("Tap Share first."); api.say("Tap Share first."); }
  };
  useEffect(() => {
    const kd = (e: any) => {
      /* a real Enter on the board (not one a focused control keeps, such as the header's Hint key) */
      const tg: any = e.target, ctl = tg && tg.closest ? tg.closest("[data-control]") : null;
      if (e.key === "Enter" && !ctl) TC_KEYT = Date.now();
      if (ctl && ctl.getAttribute("data-control") === "again" && (e.key === "Enter" || e.key === " ") && nudged.current && sayRef.current) { nudged.current = false; api.say(sayRef.current); return; }
      const g = gateRef.current;
      const onAnswer = ctl && ctl.getAttribute("data-control") === "answer-open" && (e.key === "Enter" || e.key === " ");
      if (g && (/^[0-9.]$/.test(e.key) || (e.key === "Enter" && !ctl) || onAnswer)) actNudge(g);
    };
    const pd = (e: any) => {
      const tg: any = e.target, ctl = tg && tg.closest ? tg.closest("[data-control]") : null;
      const id = ctl ? ctl.getAttribute("data-control") : null;
      if (id === "again" && nudged.current && sayRef.current) { nudged.current = false; api.say(sayRef.current); return; }
      if (id === "answer-open" && gateRef.current) actNudge(gateRef.current);
    };
    window.addEventListener("keydown", kd, true);
    window.addEventListener("pointerdown", pd, true);
    return () => { window.removeEventListener("keydown", kd, true); window.removeEventListener("pointerdown", pd, true); if (nudgeT.current) clearTimeout(nudgeT.current); };
  }, []);

  /* the state of the frame after the acts done so far */
  const st: any = { lined: !prob || !prob.line, tiles: [], chips: {}, tops: {}, struck: {}, res: {}, resNew: {} };
  acts.slice(0, kk).forEach((a: any, ai: number) => {
    if (a.kind === "line") st.lined = true;
    else if (a.kind === "col") st.res[a.col] = { v: a.v, ai, shift: a.wrapAfter };
    else if (a.kind === "wrap") { st.tiles.push({ col: a.col, to: a.to, label: tx("1 " + TC_SYM[a.to]), ai }); if (st.res[a.col]) st.resNew[a.col] = { v: a.v, ai }; }
    else if (a.kind === "carry") { st.tiles = st.tiles.filter((t: any) => t.col !== a.col); st.chips[a.to] = { label: tx("1 " + TC_SYM[a.to]), ai }; }
    else if (a.kind === "break") { st.struck[a.col] = { ai }; st.tops[a.col] = { v: a.v, ai }; st.tiles.push({ col: a.col, to: a.to, label: tx("60 " + TC_SYM[a.to]), ai, borrow: true }); }
    else if (a.kind === "move") { st.tiles = st.tiles.filter((t: any) => t.col !== a.col); st.struck[a.to] = { ai }; st.tops[a.to] = { v: a.v, ai }; }
  });
  const G = prob ? tcGeo(prob) : null;
  /* the lit column's ring, the invite on it and the column's tap box share ONE rect: 6 inside the dividers and the frame,
     14+ over the carry chips and written tops, under a lane tile or tile word in that column, under the waiting card */
  const ring = (o: any) => {
    const y = prob && prob.line && !st.lined ? 170 : st.tiles.some((t: any) => t.col === o.c || t.to === o.c) ? 132 : prob && prob.dec && o.c === "s" ? 115 : 105;
    return { x: o.x + 6, y, w: o.w - 12, h: TC_F.bot - y - 8 };
  };
  const wAi = S.w ? S.k : -1;
  const chars = (ai: number) => (ai === wAi ? S.w.pc : undefined);

  /* geometry shared by the acts and the drawing */
  const ROWY = (r: string) => (TC_F as any)[r];
  const cellPt = (c: string, row: string, size: number, dx = 0) => ({ x: G.at[c].cx + dx, y: ROWY(row) + size * 0.36 });
  const textW = (s: string, size: number) => s.length * size * 0.6;
  const strikeOf = (c: string, row: string, s: string, size: number, dx = 0) => {
    const o = G.at[c], w = prob.dec && c === "s" ? 5 * size * TC_CELL : textW(s, size);
    const cx = prob.dec && c === "s" ? o.cx : o.cx + dx;
    return [cx - w / 2 - 6, ROWY(row), cx + w / 2 + 6, ROWY(row)];
  };
  /* where a value written by the pencil goes: a decimal on the cell grid (align start, step), a whole number centred */
  const penAt = (c: string, row: string, s: string, size: number, dx = 0) => (prob.dec && c === "s"
    ? { at: { x: tcDecX0(G.at[c], size) + (5 - s.length) * size * TC_CELL, y: ROWY(row) + size * 0.36 }, align: "start", step: size * TC_CELL }
    : { at: cellPt(c, row, size, dx), align: "middle", step: 0 });
  const RES = T.speech, TOPS = T.xl, GS = T.display;
  /* Gujarati script reads small at the same size: its working-area labels are drawn 1.15 times bigger */
  const LS = lang === "gu" ? 1.15 : 1;
  const resDx = (r: any) => (r && r.shift ? -42 : 0);
  const tileC = (c: string) => ({ x: G.at[c].cx, y: TC_F.lane });
  const cardC = () => ({ x: (TC_F.x + TC_F.op + G.right) / 2, y: 112 });
  const lanes = [0, 1, 2, 3].map((i) => 150 + i * 64);
  /* the second length on a card, drawn round 0,0 (it waits above the frame, and the hand carries it in) */
  const cardNode = () => {
    const s = G.cols.filter((o: any) => prob.b[o.c]).map((o: any) => tcVal(prob, o.c, prob.b[o.c]) + " " + tx(TC_SYM[o.c])).join(" ");
    const w = Math.max(240, s.length * 46 * 0.58 + 48);
    return (
      <g filter="url(#fLift)">
        <rect x={-w / 2} y={-40} width={w} height={80} rx={16} fill="url(#gBlueCard)" stroke={TC_BLUE} strokeWidth={3} />
        <text x={0} y={16} textAnchor="middle" fontSize={T.speech} fontWeight={700} fill={TC_BLUE}>{s}</text>
      </g>
    );
  };
  const keyW = 260, keyH = 72;
  /* one fixed place, panel shut or open: under the frame */
  const keyX = (j: number, m: number) => Math.round(TC_F.keyCx - (m * keyW + (m - 1) * 24) / 2 + j * (keyW + 24));

  /* ── the acts ─────────────────────────────────────────────────────────────────────────────── */
  const busy = useRef(false);
  const nudged = useRef(false);
  const gateRef = useRef<any>(null);
  const write = (o: any, ai: number) => {
    put({ w: { ai, pc: 0 } });
    return api.act({ tool: "pencil", moves: "write", ...o, onPoint: (j: number) => put((b: any) => ({ w: { ai, pc: j + 1 } })) });
  };
  const nap = (ms: number) => new Promise((r: any) => tw.run([[ms, () => {}]], r));
  const holdTile = (label: string) => (
    <g filter="url(#tcTileShadow)">
      <rect x={-tcTileW(label) / 2} y={-26} width={tcTileW(label)} height={52} rx={14} fill="url(#gVioletTile)" stroke={shade(TC_VIOLET, 0.4)} strokeWidth={2} />
      <path d="M -54 -20 Q 0 -24 54 -20" stroke="rgba(255,255,255,0.35)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <text x={0} y={tcBase(lang)} textAnchor="middle" fontSize={T.label} fontWeight={700} fill="#FFFFFF">{label}</text>
    </g>
  );
  const perform = async (a: any, how: string) => {
    const ai = S.k;
    if (a.kind === "line") {
      put({ travel: true });
      const c = cardC();
      return api.act({ tool: "hand", moves: "carry", from: c, at: [{ x: c.x, y: TC_F.g2 }], hold: cardNode() });
    }
    if (a.kind === "share") {
      return api.act({ tool: "hand", moves: "carry", from: { x: 300, y: 88 }, at: lanes.map((y) => ({ x: 302, y: y + 28 })), hold: <g><rect x={-68} y={-25} width={136} height={50} rx={14} fill="url(#gBlueTile)" stroke={shade(TC_BLUE, 0.4)} strokeWidth={2} /></g>,
        onPoint: (i: number) => { put({ deal: i + 1 }); api.sfx.tick(); } });
    }
    if (a.kind === "col") {
      const s = tcVal(prob, a.col, a.v), q = penAt(a.col, "ans", s, RES, a.wrapAfter ? -42 : 0);
      return write({ text: s, at: [q.at], size: RES, align: q.align, step: q.step, color: TC_GREEN }, ai);
    }
    if (a.kind === "wrap") {
      const ok = await api.act({ tool: "hand", moves: "tap", at: [{ x: G.at[a.col].cx, y: (TC_F.g1 + TC_F.g2) / 2 }] });
      if (!ok) return false;
      put({ fold: a.col });
      api.sfx.trade();
      await nap(650);
      put({ fold: null });
      const r = st.res[a.col];
      if (!r) return true;
      const s = String(a.v), q = penAt(a.col, "ans", s, RES, 42);
      return write({ text: [{ line: strikeOf(a.col, "ans", String(r.v), RES, -42), size: RES }, s], at: [null, q.at], size: [RES, RES], align: [q.align, q.align], color: [TC_INK, TC_GREEN] }, ai);
    }
    if (a.kind === "carry" || a.kind === "move") {
      if (how !== "drag") {
        put({ travel: true });
        const ok = await api.act({ tool: "hand", moves: "carry", from: tileC(a.col), at: [a.kind === "carry" ? { x: G.at[a.to].cx, y: TC_F.carry } : tileC(a.to)],
          hold: holdTile(tx((a.kind === "carry" ? "1 " : "60 ") + TC_SYM[a.to])) });
        if (!ok) return false;
      }
      api.sfx.settle();
      if (a.kind === "carry") return true;
      const old = tcVal(prob, a.to, prob.a[a.to] || 0), s = tcVal(prob, a.to, a.v), q = penAt(a.to, "carry", s, TOPS);
      return write({ text: [{ line: strikeOf(a.to, "g1", old, GS), size: GS }, s], at: [null, q.at], size: [GS, TOPS], align: [q.align, q.align], step: [0, q.step], color: [TC_INK, shade(TC_VIOLET, 0.25)] }, ai);
    }
    if (a.kind === "break") {
      const old = tcVal(prob, a.col, prob.a[a.col] || 0), s = String(a.v), q = penAt(a.col, "carry", s, TOPS);
      const ok = await write({ text: [{ line: strikeOf(a.col, "g1", old, GS), size: GS }, s], at: [null, q.at], size: [GS, TOPS], align: [q.align, q.align], color: [TC_INK, shade(TC_VIOLET, 0.25)] }, ai);
      if (ok) api.sfx.trade();
      return ok;
    }
    return true;
  };
  const run = async (id: string, how: string) => {
    if (busy.current) return;
    const a = next;
    if (!a || a.id !== id) { api.did(id); return; }
    busy.current = true;
    let ok = false;
    try { ok = await perform(a, how); } finally { busy.current = false; }
    if (!ok) { put({ w: null, travel: false, fold: null }); return; }
    put((b: any) => ({ k: b.k + 1, w: null, travel: false, fold: null }));
    if (nudged.current && stage === "ask") { nudged.current = false; api.say(item.say); }
    api.did(id);
  };
  const lastPress = useRef(0);
  const press = (id: string, how = "key") => {
    const t = Date.now();
    if (t - lastPress.current < 400) return;
    lastPress.current = t;
    touch(); run(id, how);
  };
  const lastNew = useRef(0);
  const pressNew = () => {
    const t = Date.now();
    if (t - lastNew.current < 400 || busy.current) return;
    lastNew.current = t;
    touch();
    setRaw((p: any) => fresh(ent.current.e, ((p && p.fi) || 0) + 1));
  };
  const drag = useDrag((pay: any, at: any, moved: boolean) => {
    touch();
    if (!next || (next.kind !== "carry" && next.kind !== "move")) { api.did("tile"); return; }
    if (!moved) { run(next.id, "key"); return; }
    const o = G.at[next.to];
    if (at.x >= o.x - 20 && at.x <= o.x + o.w + 20 && at.y < TC_F.bot) run(next.id, "drag");
    else {
      api.sfx.tick(); api.did("tile");
      if (stage === "ask") { if (next.kind === "carry") { nudge("Drop the tile on the column to its left."); api.say("Drop the tile on the column to its left."); } else { nudge("Drop the tile on the column to its right."); api.say("Drop the tile on the column to its right."); } }
    }
  });

  /* Enter, the agent's check() and the dev solve() perform the CURRENT guide step */
  api.onEnter(demo && stepOn ? () => { if (Date.now() - TC_KEYT < 400) touch(); run(stepOn, "key"); } : null);
  const finishAll = () => {
    HOOK.check = null; HOOK.finish = null;
    put({ k: acts.length, w: null, travel: false, fold: null, deal: 4 });
    if (lockOn.current) { lockOn.current = false; api.lock(false); }
  };
  HOOK.demo = () => { if (demo && stepOn) run(stepOn, "key"); };
  HOOK.check = stage === "ask" && pending > 0 ? () => { finishAll(); return true; } : null;
  HOOK.finish = stage === "ask" && pending > 0 ? finishAll : null;
  HOOK.type = (v: string) => api.setTyped(v);

  /* the answer is gated by the act (PATTERNS §19): keys stay off until the frame is set up, only after a real touch */
  const lockOn = useRef(false);
  const gate = stage === "ask" && pending > 0 && real && !wrong && userMode();
  gateRef.current = gate && next ? next.id : null;
  useEffect(() => { if (gate !== lockOn.current) { lockOn.current = gate; api.lock(gate); } }, [gate, qk]);
  useEffect(() => () => { if (lockOn.current) api.lock(false); }, []);

  /* the traceback: every act done, each column lit amber from the right, its result written in green, ending on the whole answer */
  const tbSeq: any[] = [];
  if (prob && !recall && !free && !demo) {
    const fp = tcPlan(prob, true);
    for (let i = prob.cols.length - 1; i >= 0; i--) {
      const c = prob.cols[i], ca = fp.acts.find((x: any) => x.kind === "col" && x.col === c);
      if (!ca) continue;
      if (ca.wrapAfter) tbSeq.push({ c, raw: ca.v, fin: false });
      tbSeq.push({ c, raw: ca.wrapAfter ? ca.v : null, fin: true });
    }
  }
  const nTb = share ? 4 : tbSeq.length;
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    put({ k: recall ? 1 : acts.length, w: null, travel: false, fold: null, deal: 4, tb: 0 });
    const seq: any[] = [];
    for (let j = 1; j <= nTb; j++) seq.push([800, () => put({ tb: j })]);
    seq.push([800, () => put({ tb: nTb + 1 })]);
    tl.run(seq, () => api.lock(false));
  }, [wrong]);
  useEffect(() => () => { tl.stop(); tw.stop(); busy.current = false; nudged.current = false; if (nudgeT.current) { clearTimeout(nudgeT.current); nudgeT.current = null; } lockOn.current = false; api.lock(false); }, [qk]);

  /* the win line (one sentence; the phase's closing replaces the last one) */
  useEffect(() => { if (stage === "win" && item && item.win) api.say(item.win); }, [stage]);

  /* what the host and the agent read back (toolApi.getState): no column total before the answer is given */
  api.share({ phase: n, stack: prob ? [prob.a, prob.b] : null, columns: prob ? prob.cols : null, actsDone: Math.min(S.k, acts.length), acts: acts.length,
    carry: Object.keys(st.chips), borrow: Object.keys(st.struck), points: prob && prob.dec ? st.lined : null, complete: stage === "idle" });

  /* ── drawing ──────────────────────────────────────────────────────────────────────────────── */
  const numText = (key: any, x: number, y: number, s: string, size: number, fill: string, anchor = "middle") => (
    <text key={key} x={x} y={y + size * 0.36} textAnchor={anchor} fontSize={size} fontWeight={700} fill={fill}>{s}</text>
  );
  /* a value in a cell: a decimal on the cell grid (a grey zero holds an empty tens place once the points are lined up) */
  const valCell = (c: string, row: string, v: number, fill: string, size: number, key: string) => {
    const o = G.at[c];
    if (!(prob.dec && c === "s")) return numText(key, o.cx, ROWY(row), String(v), size, fill);
    const s = tcDec(v), pad = s.length < 5, str = (pad ? "0" : "") + s, x0 = tcDecX0(o, size);
    const cx = (i: number) => x0 + (i + 0.5) * size * TC_CELL, y = ROWY(row) + size * 0.36;
    /* the digits are ONE text (each in its own cell through a tspan), so the number reads whole; a grey zero holds an empty tens place */
    return (
      <g key={key}>
        {pad && st.lined && numText("z", cx(0), ROWY(row), "0", size, TC_GREY)}
        <text y={y} textAnchor="middle" fontSize={size} fontWeight={700} fill={fill}>
          {s.split("").map((ch: string, i: number) => <tspan key={i} x={cx(i + (pad ? 1 : 0))}>{ch}</tspan>)}
        </text>
      </g>
    );
  };
  /* off: the tokens the act wrote before this text (a strike line counts one) */
  const penVal = (c: string, row: string, s: string, size: number, ai: number, color: string, dx = 0, off = 0, width?: number) => {
    const q = penAt(c, row, s, size, dx);
    return <PencilText text={s} x={q.at.x} y={q.at.y} size={size} align={q.align} step={q.step || undefined} color={color} width={width} chars={ai === wAi ? Math.max(0, chars(ai) - off) : undefined} />;
  };

  const frame = () => {
    const p = prob, cols = G.cols, L = cols.length, right = G.right;
    const litCol = tbOn ? (S.tb >= 1 && S.tb <= nTb ? tbSeq[S.tb - 1].c : null)
      : (demo || free) ? (next && next.kind === "col" ? next.col : null)
      : !showAll && stage === "ask" ? cols[L - 1].c : null;
    const g2 = (o: any) => (st.lined && !S.travel) || !p.line;
    return (
      <g>
        {/* the frame: columns of hours, minutes and seconds */}
        <rect x={TC_F.x} y={4} width={right - TC_F.x} height={TC_F.bot - 4} rx={18} fill="#FFFFFF" stroke={C.rule} strokeWidth={3} filter="url(#tcCardShadow)" />
        <path d={`M ${TC_F.x + 1.5} 52 L ${TC_F.x + 1.5} 22 Q ${TC_F.x + 1.5} 5.5 ${TC_F.x + 18} 5.5 L ${right - 18} 5.5 Q ${right - 1.5} 5.5 ${right - 1.5} 22 L ${right - 1.5} 52 Z`} fill="url(#gHeaderBg)" />
        {cols.map((o: any) => { if (o.c !== litCol) return null; const R = ring(o); return <rect key={"lit" + o.c} x={R.x} y={R.y} width={R.w} height={R.h} rx={12} fill="url(#gAmberCol)" stroke={TC_AMBER} strokeWidth={3.5} />; })}
        {cols.map((o: any, j: number) => (
          <g key={"h" + o.c}>
            {j > 0 && <line x1={o.x} y1={14} x2={o.x} y2={TC_F.bot - 10} stroke={C.rule} strokeWidth={2} />}
            <text x={o.cx} y={lang === "en" ? 40 : 44} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={TC_INK}>{tx(TC_NAME[o.c])}</text>
          </g>
        ))}
        <line x1={TC_F.x + 10} y1={52} x2={right - 10} y2={52} stroke={C.rule} strokeWidth={2} />
        {/* the givens, deep blue */}
        {cols.map((o: any) => (p.a[o.c] || p.b[o.c] || (p.dec && o.c === "s")) ? valCell(o.c, "g1", p.a[o.c] || 0, p.a[o.c] ? TC_BLUE : TC_GREY, GS, "a" + o.c) : null)}
        {g2(null) && cols.map((o: any) => (p.a[o.c] || p.b[o.c] || (p.dec && o.c === "s")) ? valCell(o.c, "g2", p.b[o.c] || 0, p.b[o.c] ? TC_BLUE : TC_GREY, GS, "b" + o.c) : null)}
        {numText("op", TC_F.x + TC_F.op / 2, TC_F.g2, p.op === "+" ? "+" : "−", GS, TC_INK)}
        <line x1={TC_F.x + 12} y1={TC_F.rule} x2={right - 12} y2={TC_F.rule} stroke={TC_INK} strokeWidth={5} strokeLinecap="round" />
        {/* the points, locked in one line */}
        {/* "Place holder": one chip beside the grey zeros it names, a leader line to each */}
        {(() => {
          const zs: any[] = [];
          const ansOn = won || (tbOn && S.tb > nTb);
          cols.forEach((o: any) => {
            if (p.dec && o.c === "s") {
              if (!st.lined) return;
              const zx = tcDecX0(o, GS) + 0.5 * GS * TC_CELL;
              if (tcDec(p.a.s || 0).length < 5) zs.push({ x: zx, y: TC_F.g1 });
              if (g2(null) && tcDec(p.b.s || 0).length < 5) zs.push({ x: zx, y: TC_F.g2 });
              if (ansOn && !recall && plan.res.s && tcDec(plan.res.s.v).length < 5) zs.push({ x: zx, y: TC_F.ans });
            } else {
              if (!p.a[o.c] && p.b[o.c]) zs.push({ x: o.cx, y: TC_F.g1 });
              if (g2(null) && !p.b[o.c] && p.a[o.c]) zs.push({ x: o.cx, y: TC_F.g2 });
              const r = plan.res[o.c];
              if (ansOn && !recall && r && !r.empty && r.v === 0) zs.push({ x: o.cx, y: TC_F.ans });
            }
          });
          if (!zs.length || (p.dec && (st.tiles.length || S.travel))) return null;
          const label = tx("Place holder"), fs = T.label * LS, cw = tcTextW(label, fs, 600) + 24;
          const lead = shade(TC_GREY, 0.1);
          if (p.dec) {
            /* above the seconds column, in its lane; the leader runs down its left margin */
            /* 4: the leader 25 inside the divider (8 clear of the strike's cap), broken where it meets the ring strokes */
            const o = G.at.s, lx = o.x + 25, PHY = 81, R = ring(o), pk = pinkCol === "s";
            const ys = zs.map((z: any) => z.y + 17);
            return (
              <g pointerEvents="none">
                <line x1={right + 16} y1={PHY} x2={lx} y2={PHY} stroke={lead} strokeWidth={1.5} strokeDasharray="6 5" />
                <line x1={lx} y1={PHY} x2={lx} y2={R.y - 5} stroke={lead} strokeWidth={1.5} strokeDasharray="6 5" />
                <line x1={lx} y1={R.y + (pk ? 18 : 8)} x2={lx} y2={Math.max(...ys)} stroke={lead} strokeWidth={1.5} strokeDasharray="6 5" />
                {zs.map((z: any, i: number) => { const d = z.x > lx ? 1 : -1, ex = z.x - d * (GS * 0.3 + 6), y = z.y + 17; return (
                  <g key={i}><line x1={lx} y1={y} x2={ex} y2={y} stroke={lead} strokeWidth={1.5} strokeDasharray="6 5" />
                    <polyline points={`${ex - d * 8},${y - 6} ${ex},${y} ${ex - d * 8},${y + 6}`} fill="none" stroke={lead} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></g>); })}
                <rect x={right + 16} y={PHY - 23} width={cw} height={46} rx={10} fill="#FFFFFF" stroke={lead} strokeWidth={2.5} />
                <text x={right + 16 + cw / 2} y={81 + tcInkBase(label, fs, lang)} textAnchor="middle" fontSize={fs} fontWeight={600} fill={TC_GREY}>{label}</text>
              </g>
            );
          }
          /* a whole-number column: under the zero, in the empty answer row */
          /* inside the frame's left edge and short of the first divider (8 clear of each) */
          const z = zs[0], top = TC_F.rule + 12, zc = cols.find((o: any) => Math.abs(o.cx - z.x) < 1) || cols[0];
          const room = zc.x + zc.w - TC_F.x, w2 = Math.min(cw, room - 20), left = TC_F.x + (room - w2) / 2;
          return (
            <g pointerEvents="none">
              <line x1={z.x} y1={z.y + GS * 0.4} x2={z.x} y2={top} stroke={lead} strokeWidth={1.5} strokeDasharray="6 5" />
              <rect x={left} y={top} width={w2} height={52} rx={10} fill="#FFFFFF" stroke={lead} strokeWidth={2.5} />
              <text x={left + w2 / 2} y={top + 26 + tcInkBase(label, fs, lang)} textAnchor="middle" fontSize={fs} fontWeight={600} fill={TC_GREY}>{label}</text>
            </g>
          );
        })()}
        {p.dec && st.lined && <line x1={G.at.s.cx} y1={ring(G.at.s).y + (pinkCol === "s" ? 22 : 8)} x2={G.at.s.cx} y2={ring(G.at.s).y + ring(G.at.s).h - (pinkCol === "s" ? 22 : 8)} stroke={TC_INK} strokeWidth={2.5} strokeDasharray="8 7" />}
        {/* the struck tops and what the pencil wrote over them (a break, a borrow) */}
        {cols.map((o: any) => {
          const sk = st.struck[o.c];
          if (!sk) return null;
          const old = tcVal(p, o.c, p.a[o.c] || 0), ln = strikeOf(o.c, "g1", old, GS), done = sk.ai !== wAi || chars(sk.ai) >= 1;
          const tp = st.tops[o.c];
          return (
            <g key={"st" + o.c}>
              {done && <PencilLine x1={ln[0]} y1={ln[1]} x2={ln[2]} y2={ln[3]} size={GS} />}
              {tp && penVal(o.c, "carry", tcVal(p, o.c, tp.v), TOPS, tp.ai, shade(TC_VIOLET, 0.25), 0, 1, TOPS * 0.1)}
              {tp && p.dec && o.c === "s" && tp.ai !== wAi && <circle cx={o.cx} cy={TC_F.carry + TOPS * 0.36 - 4} r={5} fill={shade(TC_VIOLET, 0.25)} />}
            </g>
          );
        })}
        {/* carried chips, violet, in the carry row of the column they joined */}
        {cols.map((o: any) => { if (!st.chips[o.c]) return null; const cw = Math.min(o.w - 8, Math.max(96, tcTextW(st.chips[o.c].label, T.label) + 24)); return (
          <g key={"ch" + o.c} filter="url(#tcTileShadow)">
            <rect x={o.cx - cw / 2} y={TC_F.carry - 28} width={cw} height={52} rx={12} fill="url(#gVioletTile)" stroke={shade(TC_VIOLET, 0.4)} strokeWidth={2} />
            <text x={o.cx} y={TC_F.carry - 2 + tcBase(lang)} textAnchor="middle" fontSize={T.label} fontWeight={700} fill="#FFFFFF">{st.chips[o.c].label}</text>
          </g>); })}
        {/* the carry row says what it holds */}
        {(Object.keys(st.chips).length > 0 || (Object.keys(st.tops).length > 0 && st.tiles.length === 0)) && <text x={right + 16} y={TC_F.carry + 4} fontSize={T.prompt * LS} fontWeight={700} fill={shade(TC_VIOLET, 0.25)}>{Object.keys(st.chips).length ? tx("Carry") : tx("Borrow")}</text>}
        {/* the answer row */}
        {recall ? null : won ? cols.map((o: any) => {
          const r = plan.res[o.c];
          if (!r || r.empty) return null;
          return valCell(o.c, "ans", r.v, r.v === 0 && !(p.dec && o.c === "s") ? TC_GREY : TC_GREEN, GS, "r" + o.c);
        }) : tbOn ? cols.map((o: any) => {
          /* the correction: the last stage reached for this column */
          let e: any = null;
          tbSeq.slice(0, S.tb).forEach((x: any) => { if (x.c === o.c) e = x; });
          const r = plan.res[o.c];
          if (!e || !r) return null;
          const fill = r.v === 0 && !(p.dec && o.c === "s") ? TC_GREY : TC_GREEN;
          if (e.raw === null) return valCell(o.c, "ans", r.v, fill, GS, "r" + o.c);
          const rs = String(e.raw), ln = strikeOf(o.c, "ans", rs, T.speech, -42), cx = G.at[o.c].cx;
          return (
            <g key={"r" + o.c}>
              {numText("raw", cx - 42, TC_F.ans, rs, T.speech, e.fin ? TC_INK : TC_GREEN)}
              {!e.fin && <g>{Array.from({ length: 60 }).map((_, i) => <rect key={i} x={cx + 6 + (i % 12) * 6.5} y={TC_F.ans - 17 + Math.floor(i / 12) * 6.5} width={5} height={5} fill={tint(TC_VIOLET, 0.3)} stroke={TC_VIOLET} strokeWidth={1.2} rx={1} />)}
                <rect x={cx + 3} y={TC_F.ans - 20} width={84} height={39} rx={6} fill="none" stroke={TC_VIOLET} strokeWidth={3} /></g>}
              {e.fin && <line x1={ln[0]} y1={ln[1]} x2={ln[2]} y2={ln[3]} stroke={TC_INK} strokeWidth={4} strokeLinecap="round" />}
              {e.fin && numText("fin", cx + 42, TC_F.ans, String(r.v), T.speech, TC_GREEN)}
            </g>
          );
        }) : cols.map((o: any) => {
          const r = st.res[o.c];
          if (!r) return null;
          const s = tcVal(p, o.c, r.v), nw = st.resNew[o.c];
          if (!nw) return <g key={"w" + o.c}>{penVal(o.c, "ans", s, RES, r.ai, TC_GREEN, resDx(r))}</g>;
          const ln = strikeOf(o.c, "ans", s, RES, -42), done = nw.ai !== wAi || chars(nw.ai) >= 1;
          return (
            <g key={"w" + o.c}>
              <PencilText text={s} x={penAt(o.c, "ans", s, RES, -42).at.x} y={ROWY("ans") + RES * 0.36} size={RES} align="middle" color={TC_GREEN} />
              {done && <PencilLine x1={ln[0]} y1={ln[1]} x2={ln[2]} y2={ln[3]} size={RES} />}
              {penVal(o.c, "ans", String(nw.v), RES, nw.ai, TC_GREEN, 42, 1)}
            </g>
          );
        })}
        {/* row labels */}
        <text x={right + 16} y={TC_F.g1 + 6} fontSize={T.prompt * LS} fontWeight={700} fill={shade(TC_BLUE, 0.1)}>{tx("Given")}</text>
        {g2(null) && <text x={right + 16} y={TC_F.g2 + 6} fontSize={T.prompt * LS} fontWeight={700} fill={shade(TC_BLUE, 0.1)}>{tx("Given")}</text>}
        {!recall && (won || (tbOn && S.tb > nTb) || (free && S.k >= acts.length)) && <text x={right + 16} y={TC_F.ans + 6} fontSize={T.prompt * LS} fontWeight={700} fill={TC_GREEN}>{tx("Answer")}</text>}
        {/* the second length, waiting above the frame until Line up */}
        {p.line && !st.lined && !S.travel && <g transform={`translate(${cardC().x},${cardC().y})`}>{cardNode()}</g>}
        {/* the tiles of a regroup or a break, in the lane above the columns */}
        {st.tiles.map((t: any) => {
          const live = next && (next.kind === "carry" || next.kind === "move") && next.col === t.col && !S.travel;
          if (S.travel && next && next.col === t.col) return null;
          const dragging = drag.drag && drag.drag.payload === "tile" && drag.drag.moved;
          const c = dragging && live ? { x: drag.drag.x, y: drag.drag.y } : tileC(t.col);
          const body = (
            <g transform={`translate(${c.x},${c.y})`}>
              <rect x={-tcTileW(t.label) / 2 - 9} y={-36} width={tcTileW(t.label) + 18} height={72} fill="transparent" />
              <rect x={-tcTileW(t.label) / 2} y={-26} width={tcTileW(t.label)} height={52} rx={14} fill="url(#gVioletTile)" stroke={shade(TC_VIOLET, 0.4)} strokeWidth={2} filter={dragging && live ? "url(#fLift)" : "url(#tcTileShadow)"} />
              <path d="M -54 -20 Q 0 -24 54 -20" stroke="rgba(255,255,255,0.35)" strokeWidth="2" fill="none" strokeLinecap="round" />
              <text x={0} y={tcBase(lang)} textAnchor="middle" fontSize={T.label} fontWeight={700} fill="#FFFFFF">{t.label}</text>
            </g>
          );
          const j = G.cols.findIndex((q: any) => q.c === t.col), side = G.cols[j > 0 && G.cols[j - 1].c === t.to ? j - 1 : j + 1];
          const word = side && !(dragging && live) ? <text x={side.cx} y={TC_F.lane + 12} textAnchor="middle" fontSize={T.label * LS} fontWeight={700} fill={shade(TC_VIOLET, 0.25)}>{tx(t.borrow ? "Borrow" : "Carry")}</text> : null;
          return live && (stage === "ask" || demo || free)
            ? <g key={"t" + t.col}>{word}<g {...control("tile", tx("Move the tile"))} {...drag.bind("tile")} {...drag.keys("tile")}>{body}</g></g>
            : <g key={"t" + t.col}>{word}{body}</g>;
        })}
        {/* sixty small cells folding into one tile */}
        {S.fold && (() => {
          const o = G.at[S.fold];
          return <g>{Array.from({ length: 60 }).map((_, i) => <rect key={i} x={o.cx - 78 + (i % 12) * 13} y={TC_F.g1 - 10 + Math.floor(i / 12) * 13} width={11} height={11} rx={3} fill="url(#gVioletTile)" stroke={shade(TC_VIOLET, 0.3)} strokeWidth={1} />)}</g>;
        })()}
        {/* the columns the child taps (warm-ups and free play) */}
        {(demo || free) && cols.map((o: any) => (
          <Hit key={"hit" + o.c} id={"col-" + o.c} x={ring(o).x} y={ring(o).y} w={ring(o).w} h={ring(o).h} label={tx(TC_NAME[o.c])} onPress={() => press("col-" + o.c, "col")} />
        ))}
      </g>
    );
  };

  const shareBoard = () => {
    /* Share deals the four minute tiles only; the 20 one-second cells stay one pile until the correction (lane by lane) or the win */
    const dealt = showAll ? 4 : S.deal;
    const sec = won ? 4 : tbOn ? Math.min(4, S.tb) : 0;
    const litLane = tbOn && S.tb >= 1 && S.tb <= 4 ? S.tb - 1 : -1;
    const cells = (x: number, y: number, nC: number, cols: number, key: string) => Array.from({ length: nC }).map((_, i) => (
      <g key={key + i}>
        <rect x={x + (i % cols) * 30} y={y + Math.floor(i / cols) * 30} width={28} height={28} rx={6} fill="url(#gBlueTile)" stroke={shade(TC_BLUE, 0.4)} strokeWidth={1.5} />
        <path d={`M ${x + (i % cols) * 30 + 4} ${y + Math.floor(i / cols) * 30 + 5} L ${x + (i % cols) * 30 + 24} ${y + Math.floor(i / cols) * 30 + 5}`} stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      </g>
    ));
    const minTile = (x: number, y: number, key: string, h = 60) => (
      <g key={key} filter="url(#tcTileShadow)">
        <rect x={x} y={y} width={136} height={h} rx={14} fill="url(#gBlueTile)" stroke={shade(TC_BLUE, 0.4)} strokeWidth={2} />
        {h >= 56 && <path d={`M ${x + 16} ${y + 5} Q ${x + 68} ${y + 2} ${x + 120} ${y + 5}`} stroke="rgba(255,255,255,0.22)" strokeWidth="2" fill="none" strokeLinecap="round" />}
        <text x={x + 68} y={y + h / 2 + tcBase(lang)} textAnchor="middle" fontSize={T.label} fontWeight={700} fill="#FFFFFF">{tx("1 min")}</text>
      </g>
    );
    return (
      <g>
        <text x={20} y={42} fontSize={T.prompt * LS} fontWeight={700} fill={TC_INK}>{tx("Team time")}</text>
        {[0, 1, 2, 3].map((i) => i >= dealt ? minTile(20 + i * 144, 58, "bm" + i) : null)}
        {sec < 4 && <g>{cells(598, 58, 20 - 5 * sec, 10, "bc")}</g>}
        {sec === 0 && <text x={598 + 150} y={42} textAnchor="middle" fontSize={T.prompt * LS} fontWeight={700} fill={TC_BLUE}>{tx("20 s")}</text>}
        {(won || (tbOn && S.tb >= 1)) && <text x={860} y={lanes[0] - 16} textAnchor="end" fontSize={T.label * LS} fontWeight={700} fill={TC_GREEN}>{tx("Each")}</text>}
        {/* the plan's cue: shared equally only if every runner took the same time */}
        {(won || tbOn) && <g filter="url(#tcTileShadow)">
          <rect x={20} y={60} width={300} height={56} rx={14} fill={tint(TC_AMBER, 0.75)} stroke={TC_AMBER} strokeWidth={4} />
          <text x={170} y={99} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={TC_INK}>{tx("same time?")}</text>
        </g>}
        {lanes.map((y, i) => (
          <g key={"ln" + i}>
            <rect x={222} y={y} width={658} height={60} rx={14} fill={i === litLane ? "url(#gAmberCol)" : tint(C.panel, 0.4)} stroke={i === litLane ? TC_AMBER : C.rule} strokeWidth={i === litLane ? 4 : 2} filter="url(#tcCardShadow)" />
            <text x={20} y={y + 44} fontSize={T.prompt * LS} fontWeight={700} fill={TC_INK}>{tx("Runner") + " " + (i + 1)}</text>
            {i < dealt && minTile(234, y + 6, "lm" + i, 48)}
            {i < sec && <g>{cells(388, y + 16, 5, 5, "lc" + i)}</g>}
            {(won || (tbOn && S.tb > i)) && <text x={860} y={y + 42} textAnchor="end" fontSize={T.label} fontWeight={700} fill={TC_GREEN}>{tx("1 min 5 s")}</text>}
          </g>
        ))}
      </g>
    );
  };

  /* the one key at the bottom centre: its label follows the act the frame waits for (free play adds New sum) */
  const keyIds: string[] = [];
  if (next && TC_KEY[next.id] && (demo || free || (stage === "ask" && !item.noGate))) keyIds.push(next.id);
  if (free) keyIds.push("new");
  const inviteOn = next && (demo ? stepOn === next.id : (free || (stage === "ask" && pending > 0)));
  const pinkCol = inviteOn && next && next.kind === "col" && !S.w ? next.col : null;

  return (
    <g>
      <defs>
        <filter id="fLift" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#2B2B2B" floodOpacity="0.25" />
        </filter>
        <filter id="tcCardShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#2B2B2B" floodOpacity="0.08" />
        </filter>
        <filter id="tcTileShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#2B2B2B" floodOpacity="0.18" />
        </filter>
        <linearGradient id="gVioletTile" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7E47B8" />
          <stop offset="100%" stopColor="#5B2E8A" />
        </linearGradient>
        <linearGradient id="gBlueTile" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1565B0" />
          <stop offset="100%" stopColor="#0B4F8A" />
        </linearGradient>
        <linearGradient id="gBlueCard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F0F6FC" />
          <stop offset="100%" stopColor="#E1EEFA" />
        </linearGradient>
        <linearGradient id="gAmberCol" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF8E7" />
          <stop offset="100%" stopColor="#FFECC2" />
        </linearGradient>
        <linearGradient id="gHeaderBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F7EFE2" />
          <stop offset="100%" stopColor="#ECE1D0" />
        </linearGradient>
      </defs>
      <g pointerEvents={tbOn ? "none" : undefined}>{share ? shareBoard() : frame()}</g>
      {keyIds.map((id, j) => {
        const x = keyX(j, keyIds.length);
        return (
          <Key key={"k" + j} id={id} label={tx(TC_KEY[id])} x={x} y={TC_F.key} w={keyW} h={keyH} C={C} tone="key" onClick={() => (id === "new" ? pressNew() : press(id))}>
            <text y={12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{tx(TC_KEY[id])}</text>
          </Key>
        );
      })}
      {inviteOn && !S.w && !busy.current && (() => {
        if (TC_KEY[next.id] && keyIds[0] === next.id) return <Invite x={keyX(0, keyIds.length) + keyW / 2} y={TC_F.key + keyH / 2} w={keyW} h={keyH} rx={RAD.key} C={C} />;
        if ((next.kind === "carry" || next.kind === "move") && G) { const c = tileC(next.col); return <Invite x={c.x} y={c.y} w={132} h={56} rx={14} C={C} />; }
        if (next.kind === "col" && G) { const R = ring(G.at[next.col]); return <Invite x={R.x + R.w / 2} y={R.y + R.h / 2} w={R.w - 24} h={R.h - 24} rx={1} C={C} />; }
        return null;
      })()}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  if (!result || !result.last) return null;
  const item = it || result.last.it || (PHASES[n - 1] && PHASES[n - 1].items[result.last.item]) || {};
  const v = result.last.value;
  if (v === null || v === undefined) return null;
  /* units through tx() (TR) */
  const u = (k: string) => tx(k);
  const s = item.parts
    ? slotPartsOf(v, item.parts.length).map((x: any, j: number) => x + " " + u(TC_UNIT_OF[item.parts[j].label])).join(" ")
    : String(v) + " " + u("s");
  /* ONE line, at the biggest size that fits the box (never under 28) */
  const lines = [s];
  const size = Math.max(T.micro, Math.min(T.label, Math.floor((w - 28) / (s.length * 0.5))));
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {lines.map((ln: string, j: number) => (
        <text key={j} x={w / 2} y={h / 2 + size * 0.36 + (j - (lines.length - 1) / 2) * (size + 4)} textAnchor="middle" fontSize={size} fontWeight={700} fill={TC_GREEN}
          {...(ln.length * 0.5 * size > w - 28 ? { textLength: w - 28, lengthAdjust: "spacingAndGlyphs" } : {})}>{ln}</text>
      ))}
    </g>
  );
}

function TimeColumns(props: any) {
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
      /* the point key (owner, 2026-11-16): phase 4 types seconds with hundredths, lining up the points is the lesson */
      pointKey: true,
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

export default TimeColumns;