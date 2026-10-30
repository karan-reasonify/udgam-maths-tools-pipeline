/* ═══ M1.S2.T5.C25.2D1 · write_the_date · tool-specific part ═══════════════════════════════
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

const TOOL_ID = "write_the_date";
const MEDIA_ID = "M1.S2.T5.C25.2D1";
const TOOL_NAME = "Write the Date";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (the plan's opening line; not shown when phase 1 has steps) */
const OPENING = ["Dates are written on cards, tickets and notices."];   /* not shown: phase 1 opens on its guide steps */
/* the whole-tool line: printed on the summary page */
const FINISH_LINE = "You wrote the date in words and in numbers, and both said the same day.";
/* printed when the child opens Free play (the plan's free-play line); its LAST piece stays on the bubble */
const FREE_LINE = "Free play: pick a month, tap Day or Year to type, see the date both ways.";

/* ── Write the Date: the calendar facts and the drawing helpers (module level: CALLED from Work, Thumb and StartArt,
   never mounted inside Work, BUILD_CARD §6) ───────────────────────────────────────────────────────────────────── */
const WD_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
/* the three made pictures, each drawn at its OWN proportion (a Skin slices to its box) */
const WD_ASPECT: any = { card: 458 / 300, invitation: 514 / 300, notice: 540 / 300 };
const WD_STOCK: any = { card: "#F3C64E", invitation: "#F7D7C2", notice: "#E8D6AC" };
const WD_EDGE: any = { card: "#B5852A", invitation: "#C49A55", notice: "#A88F5E" };
const WD_INK = "#2B2B2B";
const WD_GREEN = "#009E73";                 /* the chapter's "answer" green: a right box */
const WD_GREEN_INK = "#007656";             /* shade(#009E73, 0.25): green text at 4.5:1 */
const WD_GHOST = "#474747";                 /* what fits in a box, after a miss (never the answer) */
const WD_LIT = "#B35900";                   /* a label lit by the correction (deep orange ink) */
const wdPad = (x: any) => String(x).padStart(2, "0");
/* a month's length in words, in the language in use (built at run time: one template a language, the month through TR) */
const wdDaysLine = (m: number, n: number, lang: string, tx: any) => (lang === "hi" ? `${tx(WD_MONTHS[m - 1])} में ${n} दिन`
  : lang === "gu" ? `${tx(WD_MONTHS[m - 1])}માં ${n} દિવસ` : `${WD_MONTHS[m - 1]} has ${n} days`);
const wdLeap = (y: number) => y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0);
const wdDays = (m: number, y: number) => (m === 2 ? (wdLeap(y) ? 29 : 28) : [4, 6, 9, 11].includes(m) ? 30 : 31);
/* a size that fits a word in a width (0.6 em a character: Poppins is narrower, so it never spills) */
const wdFit = (s: any, w: number, max: number) => Math.max(28, Math.min(max, Math.floor(w / Math.max(1, String(s).length * 0.6))));
/* the card a question's date is written on, at its own proportion, centred on cx */
const wdCardBox = (obj: string, cx: number, y: number, h: number) => { const w = Math.round(h * (WD_ASPECT[obj] || 1.7)); return { x: Math.round(cx - w / 2), y, w, h }; };
/* the card itself: the plain stock (the fallback), the photo skin over it, then its event line drawn in code */
function wdCard(obj: string, b: any, title: string, tx: any, key: string) {
  const tcx = b.x + b.w * (obj === "card" ? 0.4 : 0.5), ty = b.y + b.h * (obj === "notice" ? 0.3 : 0.25);
  return (
    <g key={key}>
      <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={16} fill={WD_STOCK[obj] || "#F2E4CE"} stroke={WD_EDGE[obj] || "#A88F5E"} strokeWidth={3} filter="url(#fShadowSoft)" />
      <rect x={b.x + 12} y={b.y + 12} width={b.w - 24} height={b.h - 24} rx={10} fill="none" stroke={WD_EDGE[obj] || "#A88F5E"} strokeWidth={2} />
      <Skin name={obj} x={b.x} y={b.y} w={b.w} h={b.h} />
      {title ? <text x={tcx} y={ty + 11} textAnchor="middle" fontSize={wdFit(tx(title), b.w * 0.74, 34)} fontWeight={700} fill={WD_INK}>{tx(title)}</text> : null}
    </g>
  );
}
/* one labelled date box (Day, Month or Year): its frame, its label under it */
function wdBox(b: any, label: string, labelY: number, labelSize: number, o: any, tx: any) {
  const stroke = o.ok ? WD_GREEN : o.active ? (THEME && THEME.enter ? THEME.enter[1] : "#5B6770") : o.lit ? WD_LIT : "#6F6553";
  const sw = o.ok || o.active || o.lit ? 6 : 3;
  return (
    <g>
      <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={16} fill={o.ok ? "url(#wdBoxBgOk)" : "#FFFFFF"} stroke={stroke} strokeWidth={sw} filter="url(#fShadowSoft)" />
      <rect x={b.x + 2} y={b.y + 2} width={b.w - 4} height={Math.min(24, Math.floor(b.h / 3))} rx={14} fill="#FFFFFF" fillOpacity={0.35} pointerEvents="none" />
      {o.ok && o.tick ? (
        <g>
          <circle cx={b.x + b.w - 4} cy={b.y + 4} r={17} fill={WD_GREEN} stroke="#FFFFFF" strokeWidth={3} filter="url(#fShadowSoft)" />
          <path d={`M ${b.x + b.w - 13} ${b.y + 4} l 6 7 l 12 -13`} fill="none" stroke="#FFFFFF" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ) : null}
      <text x={b.x + b.w / 2} y={labelY} textAnchor="middle" fontSize={labelSize} fontWeight={700} fill={o.lit ? WD_LIT : WD_INK}>{tx(label)}</text>
      {o.lit ? <rect x={b.x + b.w / 2 - 34} y={labelY + 7} width={68} height={5} rx={2.5} fill={WD_LIT} /> : null}
    </g>
  );
}

/* THE START PAGE (runtime r28; docs/LAYOUT.md §1c, docs/PATTERNS.md §14): the first thing a child sees in user mode.
   START_HOOK is ONE printed question to wonder at (it needs a TR entry, and never gives an answer away); StartArt is
   the object the lesson is about: a birthday card and the three empty boxes a date splits into (no date: nothing answered). */
const START_HOOK = "Which part of a date is the day, which the month, which the year?";
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  const card = wdCardBox("card", 330, 20, 300);
  const bs = [{ x: 640, y: 96, w: 130, h: 104 }, { x: 790, y: 96, w: 220, h: 104 }, { x: 1030, y: 96, w: 150, h: 104 }];
  return (
    <g>
      {wdCard("card", card, "Happy Birthday!", tx, "c")}
      {bs.map((b, j) => <g key={j}>{wdBox(b, ["Day", "Month", "Year"][j], 252, 38, {}, tx)}</g>)}
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
    "Write the Date": "तारीख लिखो",
    "Free play: pick a month, tap Day or Year to type, see the date both ways.": "मुक्त खेल: महीना चुनो, दिन या वर्ष छूकर लिखो, तारीख दोनों तरह देखो।",
    "Which part of a date is the day, which the month, which the year?": "तारीख में दिन, महीना और वर्ष कौन-कौन से हैं?",
    "Dates are written on cards, tickets and notices.": "तारीखें कार्ड, टिकट और सूचनाओं पर लिखी होती हैं।",
    "You wrote the date in words and in numbers, and both said the same day.": "तुमने तारीख शब्दों और अंकों में लिखी, दोनों ने एक ही दिन बताया।",
    "A date has a day, a month and a year": "तारीख में दिन, महीना और वर्ष होते हैं",
    "A date tells three things: which day, which month and which year.": "तारीख तीन बातें बताती है: कौन-सा दिन, कौन-सा महीना, कौन-सा वर्ष।",
    "Tap the day on this card.": "इस कार्ड पर दिन को छुओ।",
    "The day is a number from 1 to 31.": "दिन 1 से 31 तक की एक संख्या है।",
    "Now tap the month.": "अब महीने को छुओ।",
    "The month has a name.": "महीने का एक नाम होता है।",
    "Last, tap the year.": "आखिर में वर्ष को छुओ।",
    "The year has four digits.": "वर्ष में चार अंक होते हैं।",
    "Find the word on the card that names a month.": "कार्ड पर वह शब्द ढूँढो जो महीने का नाम है।",
    "The day is the small number, and the long number is the year.": "दिन छोटी संख्या है, और लंबी संख्या वर्ष है।",
    "All three parts make the date: the day, the month and the year.": "तीनों भाग मिलकर तारीख बनाते हैं: दिन, महीना और वर्ष।",
    "You learned: a date has a day, a month and a year; all three are needed": "तुमने सीखा: तारीख में दिन, महीना और वर्ष, तीनों ज़रूरी हैं",
    "Drag the day, the month and the year from this birthday card into their boxes.": "इस जन्मदिन कार्ड से दिन, महीना और वर्ष उनके खानों में खींचो।",
    "Day, month, year?": "दिन, महीना, वर्ष?",
    "Read the label under each box, then try again.": "हर खाने के नीचे का नाम पढ़ो, फिर कोशिश करो।",
    "Now fill the three boxes from the date on this invitation.": "अब इस निमंत्रण की तारीख से तीनों खाने भरो।",
    "Fill the boxes": "खाने भरो",
    "A date needs all three parts, so no box stays empty.": "तारीख में तीनों भाग चाहिए, कोई खाना खाली न रहे।",
    "Put each part of the date on this school notice in its own box.": "इस स्कूल सूचना की तारीख का हर भाग उसके खाने में रखो।",
    "Each part, its box": "हर भाग, उसका खाना",
    "Look at each part: which one is a month, and which is a year?": "हर भाग देखो: कौन-सा महीना है और कौन-सा वर्ष?",
    "Day-Month-Year: the month in words": "दिन-महीना-वर्ष: महीना शब्दों में",
    "Write the day first, then the month in words, then the year.": "पहले दिन, फिर शब्दों में महीना, फिर वर्ष लिखो।",
    "Tap October on the ladder to send its name to the Month box.": "सूची में अक्टूबर छुओ, उसका नाम महीने के खाने में जाएगा।",
    "October is the tenth month in the list.": "अक्टूबर साल का दसवाँ महीना है।",
    "Read the card again: which month does it say?": "कार्ड फिर से पढ़ो: उस पर कौन-सा महीना है?",
    "Read your date aloud: the day, then the month, then the year.": "अपनी तारीख ज़ोर से पढ़ो: पहले दिन, फिर महीना, फिर वर्ष।",
    "Day-Month-Year writes the day, then the month in words, then the year.": "दिन-महीना-वर्ष में पहले दिन, फिर महीना शब्दों में, फिर वर्ष।",
    "You learned: Day-Month-Year puts the day, the month in words, the year": "तुमने सीखा: दिन-महीना-वर्ष में दिन, शब्दों में महीना, फिर वर्ष",
    "Write this date the Day-Month-Year way: tap the month, then type the rest.": "यह तारीख दिन-महीना-वर्ष में लिखो: महीना छुओ, बाकी लिखो।",
    "Day-Month-Year": "दिन-महीना-वर्ष",
    "Look at the labels: which box comes first?": "नाम देखो: पहले कौन-सा खाना?",
    "Write the date on this library notice with the month in words.": "इस पुस्तकालय सूचना की तारीख में महीना शब्दों में लिखो।",
    "Month in words": "महीना शब्दों में",
    "The day goes first and the four-digit year goes last.": "दिन पहले आता है और चार अंकों वाला वर्ष आखिर में।",
    "The month here is a number: write this date with that month's name.": "यहाँ महीना एक संख्या है: यह तारीख उस महीने के नाम से लिखो।",
    "Number to name": "संख्या से नाम",
    "Month 11 on the ladder has a name: use that name.": "सूची में महीना 11 का एक नाम है: वही नाम लो।",
    "DD-MM-YYYY: the month in numbers": "DD-MM-YYYY: महीना अंकों में",
    "Find the month on the ladder: its number goes in the middle box.": "सूची में महीना ढूँढो: उसकी संख्या बीच वाले खाने में जाती है।",
    "Tap the toggle to write this month as a number: DD-MM-YYYY.": "बटन छुओ: DD-MM-YYYY में यह महीना अंकों में लिखा जाएगा।",
    "The toggle is under the three boxes.": "बटन तीनों खानों के नीचे है।",
    "Tap it once more to turn the number back into the month's name.": "एक बार और छुओ, संख्या फिर से महीने का नाम बनेगी।",
    "Tap the same toggle again.": "वही बटन फिर से छुओ।",
    "Read the card again, then check the month's number on the ladder.": "कार्ड फिर से पढ़ो, फिर सूची में महीने की संख्या मिलाओ।",
    "A day or a month with one digit starts with a 0, like 07.": "जैसे 07 में, एक अंक वाले दिन या महीने के आगे 0 लगता है।",
    "DD-MM-YYYY writes 2 digits for the day, 2 for the month and 4 for the year.": "DD-MM-YYYY में दिन के 2, महीने के 2 और वर्ष के 4 अंक होते हैं।",
    "You learned: DD-MM-YYYY is 2, 2 and 4 digits; both ways name one date": "तुमने सीखा: DD-MM-YYYY में 2, 2 और 4 अंक; दोनों तरीके एक ही तारीख",
    "This notice is in numbers: write its date with the month in words.": "यह सूचना अंकों में है: इसकी तारीख में महीना शब्दों में लिखो।",
    "Back to words": "फिर से शब्दों में",
    "The first number is the day and the second is the month.": "पहली संख्या दिन है और दूसरी महीना।",
    "The middle number is the month: which name has that number?": "बीच की संख्या महीना है: किस नाम की यह संख्या है?",
    "Tap that name on the ladder, then type the day and the year from the card.": "सूची में वह नाम छुओ, फिर कार्ड से दिन और वर्ष लिखो।",
    "Write the date on this school notice in numbers, as DD-MM-YYYY.": "इस स्कूल सूचना की तारीख अंकों में लिखो, DD-MM-YYYY की तरह।",
    "DD-MM-YYYY": "DD-MM-YYYY",
    "Check the day, the month and the year against the card.": "दिन, महीना और वर्ष कार्ड से मिलाकर देखो।",
    "Write the day first; the month's number goes in the middle.": "पहले दिन लिखो; महीने की संख्या बीच में जाती है।",
    "Your boxes must read day, month, year, like the card.": "खानों में कार्ड की तरह दिन, महीना, वर्ष का क्रम रखो।",
    "Now write this Result Day date in numbers too.": "अब इस परिणाम दिवस की तारीख भी अंकों में लिखो।",
    "In numbers again": "फिर से अंकों में",
    "Count the digits you wrote in each of the three boxes.": "तीनों खानों में लिखे अंक गिनो।",
    "First tap this card's month on the ladder.": "पहले सूची में इस कार्ड का महीना छुओ।",
    "Drag a tile into a box first.": "पहले एक टुकड़ा किसी खाने में खींचो।",
    "Yes: 23 is the day, March is the month and 2017 is the year.": "हाँ, 23 दिन है, मार्च महीना है और 2017 वर्ष है।",
    "Right, 30 April 2015 has its day, its month and its year in place.": "सही, 30 अप्रैल 2015 के दिन, महीना और वर्ष सही जगह पर हैं।",
    "Well done: 8 December 2022 splits into its three parts.": "शाबाश, 8 दिसंबर 2022 अपने तीन भागों में बँट गई।",
    "Yes, 9 August 2013 is written the Day-Month-Year way.": "हाँ, 9 अगस्त 2013 दिन-महीना-वर्ष तरीके से लिखी गई।",
    "Right, 17 June 2012, with June written as a word.": "सही, 17 जून 2012, जून शब्द में लिखा है।",
    "Yes, month 11 is November, so the date is 25 November 2018.": "हाँ, महीना 11 नवंबर है, तो तारीख 25 नवंबर 2018 है।",
    "Yes, 06-11-2023 is 6 November 2023.": "हाँ, 6 नवंबर 2023 और 06-11-2023 एक ही दिन है।",
    "Yes, 14 October 2019 is 14-10-2019.": "हाँ, 14 अक्टूबर 2019 और 14-10-2019 एक ही तारीख हैं।",
    "Right, 05-03-2016: a 0 goes in front of the 5 and the 3.": "सही, 05-03-2016: 5 और 3 के आगे 0 लगता है।",
    "Date": "तारीख",
    "Day": "दिन",
    "Month": "महीना",
    "Year": "वर्ष",
    "in words": "शब्दों में",
    "in numbers": "अंकों में",
    "January": "जनवरी",
    "February": "फ़रवरी",
    "March": "मार्च",
    "April": "अप्रैल",
    "May": "मई",
    "June": "जून",
    "July": "जुलाई",
    "August": "अगस्त",
    "September": "सितंबर",
    "October": "अक्टूबर",
    "November": "नवंबर",
    "December": "दिसंबर",
    "Happy Birthday!": "जन्मदिन मुबारक!",
    "Wedding Invitation": "शादी का निमंत्रण",
    "Sports Day": "खेल दिवस",
    "Summer Camp": "समर कैंप",
    "School Holiday": "स्कूल की छुट्टी",
    "Party Invitation": "पार्टी का निमंत्रण",
    "Library Notice": "पुस्तकालय सूचना",
    "Birthday Party": "जन्मदिन पार्टी",
    "Republic Day": "गणतंत्र दिवस",
    "Science Fair": "विज्ञान मेला",
    "Annual Day": "वार्षिक दिवस",
    "Result Day": "परिणाम दिवस",
    "My Date": "मेरी तारीख",
    "2 October 2024": "2 अक्टूबर 2024",
    "Year: 2013": "वर्ष: 2013",
    "Month: August": "महीना: अगस्त",
    "Day: 9": "दिन: 9",
    "New books came on": "नई किताबें आईं:",
    "the 17th of June, 2012": "17 जून, 2012",
    "Month: 11": "महीना: 11",
    "Day: 25": "दिन: 25",
    "Year: 2018": "वर्ष: 2018",
    "26 January 2025": "26 जनवरी 2025",
    "06-11-2023": "06-11-2023",
    "14 October 2019": "14 अक्टूबर 2019",
    "5 March 2016": "5 मार्च 2016",
    "Fill all 3 boxes": "तीनों खाने भरो",
    "Month: a month name": "महीना: महीने का नाम",
    "Day: 1 to 31": "दिन: 1 से 31",
    "Year: 4 digits": "वर्ष: 4 अंक",
    "Only 12 months": "केवल 12 महीने",
    "Put 0 in front": "आगे 0 लगाओ",
    "Day, then month": "पहले दिन, फिर महीना",
    "1 to 31": "1 से 31",
    "a month": "महीने का नाम",
    "4 digits": "4 अंक",
    "DD": "DD",
    "MM": "MM",
    "YYYY": "YYYY",
    "Not a real date": "ऐसी तारीख नहीं होती",
    "Type a day": "दिन लिखो",
    "OK": "सही",
    "Change a tile first.": "पहले कोई एक टुकड़ा बदलो।",
    "Type the date first.": "पहले तारीख लिखो।",
    "The toggle works after you answer.": "बटन उत्तर देने के बाद चलता है।",
    "This box is full.": "यह खाना भर गया है।",
    "Day first, year last": "पहले दिन, आखिर में वर्ष",
  },
  gu: {
    "Write the Date": "તારીખ લખો",
    "Free play: pick a month, tap Day or Year to type, see the date both ways.": "મુક્ત રમત: મહિનો પસંદ કરો, દિવસ-વર્ષ લખો, તારીખ બંને રીતે જુઓ.",
    "Which part of a date is the day, which the month, which the year?": "તારીખમાં દિવસ કયો, મહિનો કયો અને વર્ષ કયું?",
    "Dates are written on cards, tickets and notices.": "તારીખો કાર્ડ, ટિકિટ અને સૂચનાઓ પર લખેલી હોય છે.",
    "You wrote the date in words and in numbers, and both said the same day.": "તમે તારીખ શબ્દોમાં અને અંકોમાં લખી, બંનેએ એક જ દિવસ કહ્યો.",
    "A date has a day, a month and a year": "તારીખમાં દિવસ, મહિનો અને વર્ષ હોય છે",
    "A date tells three things: which day, which month and which year.": "તારીખ ત્રણ વાત કહે છે: કયો દિવસ, કયો મહિનો, કયું વર્ષ.",
    "Tap the day on this card.": "આ કાર્ડ પર દિવસને સ્પર્શ કરો.",
    "The day is a number from 1 to 31.": "દિવસ 1 થી 31 સુધીની સંખ્યા છે.",
    "Now tap the month.": "હવે મહિનાને સ્પર્શ કરો.",
    "The month has a name.": "મહિનાનું એક નામ હોય છે.",
    "Last, tap the year.": "છેલ્લે વર્ષને સ્પર્શ કરો.",
    "The year has four digits.": "વર્ષમાં ચાર અંક હોય છે.",
    "Find the word on the card that names a month.": "કાર્ડ પર મહિનાનું નામ હોય તે શબ્દ શોધો.",
    "The day is the small number, and the long number is the year.": "દિવસ નાની સંખ્યા છે અને લાંબી સંખ્યા વર્ષ છે.",
    "All three parts make the date: the day, the month and the year.": "ત્રણેય ભાગ મળીને તારીખ બને છે: દિવસ, મહિનો અને વર્ષ.",
    "You learned: a date has a day, a month and a year; all three are needed": "તમે શીખ્યા: તારીખમાં દિવસ, મહિનો અને વર્ષ, ત્રણેય જરૂરી છે",
    "Drag the day, the month and the year from this birthday card into their boxes.": "આ જન્મદિવસ કાર્ડમાંથી દિવસ, મહિનો અને વર્ષ તેમના ખાનામાં ખેંચો.",
    "Day, month, year?": "દિવસ, મહિનો, વર્ષ?",
    "Read the label under each box, then try again.": "દરેક ખાના નીચેનું નામ વાંચો, ફરી પ્રયત્ન કરો.",
    "Now fill the three boxes from the date on this invitation.": "હવે આ નિમંત્રણની તારીખથી ત્રણેય ખાના ભરો.",
    "Fill the boxes": "ખાના ભરો",
    "A date needs all three parts, so no box stays empty.": "તારીખમાં ત્રણેય ભાગ જોઈએ, કોઈ ખાનું ખાલી ન રહે.",
    "Put each part of the date on this school notice in its own box.": "આ શાળાની સૂચનાની તારીખનો દરેક ભાગ તેના ખાનામાં મૂકો.",
    "Each part, its box": "દરેક ભાગ, તેનું ખાનું",
    "Look at each part: which one is a month, and which is a year?": "દરેક ભાગ જુઓ: કયો મહિનો છે અને કયું વર્ષ?",
    "Day-Month-Year: the month in words": "દિવસ-મહિનો-વર્ષ: મહિનો શબ્દોમાં",
    "Write the day first, then the month in words, then the year.": "પહેલાં દિવસ, પછી શબ્દોમાં મહિનો, પછી વર્ષ લખો.",
    "Tap October on the ladder to send its name to the Month box.": "યાદીમાં ઑક્ટોબર સ્પર્શો, તેનું નામ મહિનાના ખાનામાં જશે.",
    "October is the tenth month in the list.": "ઑક્ટોબર વર્ષનો દસમો મહિનો છે.",
    "Read the card again: which month does it say?": "કાર્ડ ફરી વાંચો: તેમાં કયો મહિનો છે?",
    "Read your date aloud: the day, then the month, then the year.": "તમારી તારીખ મોટેથી વાંચો: પહેલાં દિવસ, પછી મહિનો, પછી વર્ષ.",
    "Day-Month-Year writes the day, then the month in words, then the year.": "દિવસ-મહિનો-વર્ષમાં પહેલાં દિવસ, પછી મહિનો શબ્દોમાં, પછી વર્ષ.",
    "You learned: Day-Month-Year puts the day, the month in words, the year": "તમે શીખ્યા: દિવસ-મહિનો-વર્ષમાં દિવસ, શબ્દોમાં મહિનો, પછી વર્ષ",
    "Write this date the Day-Month-Year way: tap the month, then type the rest.": "આ તારીખ દિવસ-મહિનો-વર્ષ રીતે લખો: મહિનો સ્પર્શો, બાકી લખો.",
    "Day-Month-Year": "દિવસ-મહિનો-વર્ષ",
    "Look at the labels: which box comes first?": "નામ જુઓ: પહેલું ખાનું કયું?",
    "Write the date on this library notice with the month in words.": "આ પુસ્તકાલય નોટિસની તારીખમાં મહિનો શબ્દોમાં લખો.",
    "Month in words": "મહિનો શબ્દોમાં",
    "The day goes first and the four-digit year goes last.": "દિવસ પહેલાં આવે અને ચાર અંકનું વર્ષ છેલ્લે.",
    "The month here is a number: write this date with that month's name.": "અહીં મહિનો એક સંખ્યા છે: આ તારીખ તે મહિનાના નામથી લખો.",
    "Number to name": "સંખ્યાથી નામ",
    "Month 11 on the ladder has a name: use that name.": "યાદીમાં મહિનો 11 નું એક નામ છે: તે જ નામ લો.",
    "DD-MM-YYYY: the month in numbers": "DD-MM-YYYY: મહિનો અંકોમાં",
    "Find the month on the ladder: its number goes in the middle box.": "યાદીમાં મહિનો શોધો: તેની સંખ્યા વચ્ચેના ખાનામાં જાય છે.",
    "Tap the toggle to write this month as a number: DD-MM-YYYY.": "બટન સ્પર્શો: DD-MM-YYYY માં આ મહિનો અંકોમાં લખાશે.",
    "The toggle is under the three boxes.": "બટન ત્રણેય ખાનાની નીચે છે.",
    "Tap it once more to turn the number back into the month's name.": "ફરી એક વાર સ્પર્શો, સંખ્યા ફરી મહિનાનું નામ બનશે.",
    "Tap the same toggle again.": "એ જ બટન ફરી સ્પર્શો.",
    "Read the card again, then check the month's number on the ladder.": "કાર્ડ ફરી વાંચો, પછી યાદીમાં મહિનાની સંખ્યા સરખાવો.",
    "A day or a month with one digit starts with a 0, like 07.": "જેમ કે 07 માં, એક અંકવાળા દિવસ કે મહિનાની આગળ 0 આવે છે.",
    "DD-MM-YYYY writes 2 digits for the day, 2 for the month and 4 for the year.": "DD-MM-YYYY માં દિવસના 2, મહિનાના 2 અને વર્ષના 4 અંક હોય છે.",
    "You learned: DD-MM-YYYY is 2, 2 and 4 digits; both ways name one date": "તમે શીખ્યા: DD-MM-YYYY માં 2, 2 અને 4 અંક; બંને રીતે એક જ તારીખ",
    "This notice is in numbers: write its date with the month in words.": "આ સૂચના અંકોમાં છે: તેની તારીખમાં મહિનો શબ્દોમાં લખો.",
    "Back to words": "ફરી શબ્દોમાં",
    "The first number is the day and the second is the month.": "પહેલી સંખ્યા દિવસ છે અને બીજી મહિનો.",
    "The middle number is the month: which name has that number?": "વચ્ચેની સંખ્યા મહિનો છે: કયા નામની આ સંખ્યા છે?",
    "Tap that name on the ladder, then type the day and the year from the card.": "યાદીમાં તે નામ સ્પર્શો, પછી કાર્ડમાંથી દિવસ અને વર્ષ લખો.",
    "Write the date on this school notice in numbers, as DD-MM-YYYY.": "આ શાળાની સૂચનાની તારીખ અંકોમાં લખો, DD-MM-YYYY રીતે.",
    "DD-MM-YYYY": "DD-MM-YYYY",
    "Check the day, the month and the year against the card.": "દિવસ, મહિનો અને વર્ષ કાર્ડ સાથે સરખાવો.",
    "Write the day first; the month's number goes in the middle.": "પહેલાં દિવસ લખો; મહિનાની સંખ્યા વચ્ચે જાય છે.",
    "Your boxes must read day, month, year, like the card.": "તમારા ખાના કાર્ડની જેમ દિવસ, મહિનો, વર્ષ વંચાય.",
    "Now write this Result Day date in numbers too.": "હવે આ પરિણામ દિવસની તારીખ પણ અંકોમાં લખો.",
    "In numbers again": "ફરી અંકોમાં",
    "Count the digits you wrote in each of the three boxes.": "ત્રણેય ખાનામાં લખેલા અંક ગણો.",
    "First tap this card's month on the ladder.": "પહેલાં યાદીમાં આ કાર્ડનો મહિનો સ્પર્શો.",
    "Drag a tile into a box first.": "પહેલાં એક ટુકડો કોઈ ખાનામાં ખેંચો.",
    "Yes: 23 is the day, March is the month and 2017 is the year.": "હા, દિવસ 23 છે, મહિનો માર્ચ છે અને વર્ષ 2017 છે.",
    "Right, 30 April 2015 has its day, its month and its year in place.": "સાચું, 30 એપ્રિલ 2015 નાં દિવસ, મહિનો અને વર્ષ સાચી જગ્યાએ છે.",
    "Well done: 8 December 2022 splits into its three parts.": "શાબાશ, 8 ડિસેમ્બર 2022 તેના ત્રણ ભાગમાં વહેંચાઈ ગઈ.",
    "Yes, 9 August 2013 is written the Day-Month-Year way.": "હા, આ તારીખ દિવસ-મહિનો-વર્ષ રીતે લખાઈ: 9 ઑગસ્ટ 2013",
    "Right, 17 June 2012, with June written as a word.": "સાચું, 17 જૂન 2012, જૂન શબ્દમાં લખ્યો છે.",
    "Yes, month 11 is November, so the date is 25 November 2018.": "હા, 11મો મહિનો નવેમ્બર છે, તો તારીખ 25 નવેમ્બર 2018 છે.",
    "Yes, 06-11-2023 is 6 November 2023.": "હા, 6 નવેમ્બર 2023 એ જ 06-11-2023 છે.",
    "Yes, 14 October 2019 is 14-10-2019.": "હા, 14 ઑક્ટોબર 2019 એ જ 14-10-2019 છે.",
    "Right, 05-03-2016: a 0 goes in front of the 5 and the 3.": "સાચું, 05-03-2016: 5 અને 3 ની આગળ 0 આવે છે.",
    "Date": "તારીખ",
    "Day": "દિવસ",
    "Month": "મહિનો",
    "Year": "વર્ષ",
    "in words": "શબ્દોમાં",
    "in numbers": "અંકોમાં",
    "January": "જાન્યુઆરી",
    "February": "ફેબ્રુઆરી",
    "March": "માર્ચ",
    "April": "એપ્રિલ",
    "May": "મે",
    "June": "જૂન",
    "July": "જુલાઈ",
    "August": "ઑગસ્ટ",
    "September": "સપ્ટેમ્બર",
    "October": "ઑક્ટોબર",
    "November": "નવેમ્બર",
    "December": "ડિસેમ્બર",
    "Happy Birthday!": "જન્મદિવસ મુબારક!",
    "Wedding Invitation": "લગ્નનું નિમંત્રણ",
    "Sports Day": "રમતગમત દિવસ",
    "Summer Camp": "સમર કૅમ્પ",
    "School Holiday": "શાળામાં રજા",
    "Party Invitation": "પાર્ટીનું નિમંત્રણ",
    "Library Notice": "પુસ્તકાલય નોટિસ",
    "Birthday Party": "જન્મદિવસ પાર્ટી",
    "Republic Day": "પ્રજાસત્તાક દિન",
    "Science Fair": "વિજ્ઞાન મેળો",
    "Annual Day": "વાર્ષિક દિન",
    "Result Day": "પરિણામ દિવસ",
    "My Date": "મારી તારીખ",
    "2 October 2024": "2 ઑક્ટોબર 2024",
    "Year: 2013": "વર્ષ: 2013",
    "Month: August": "મહિનો: ઑગસ્ટ",
    "Day: 9": "દિવસ: 9",
    "New books came on": "નવાં પુસ્તકો આવ્યાં:",
    "the 17th of June, 2012": "17 જૂન, 2012",
    "Month: 11": "મહિનો: 11",
    "Day: 25": "દિવસ: 25",
    "Year: 2018": "વર્ષ: 2018",
    "26 January 2025": "26 જાન્યુઆરી 2025",
    "06-11-2023": "06-11-2023",
    "14 October 2019": "14 ઑક્ટોબર 2019",
    "5 March 2016": "5 માર્ચ 2016",
    "Fill all 3 boxes": "ત્રણેય ખાના ભરો",
    "Month: a month name": "મહિનો: મહિનાનું નામ",
    "Day: 1 to 31": "દિવસ: 1 થી 31",
    "Year: 4 digits": "વર્ષ: 4 અંક",
    "Only 12 months": "ફક્ત 12 મહિના",
    "Put 0 in front": "આગળ 0 મૂકો",
    "Day, then month": "પહેલાં દિવસ, પછી મહિનો",
    "1 to 31": "1 થી 31",
    "a month": "મહિનાનું નામ",
    "4 digits": "4 અંક",
    "DD": "DD",
    "MM": "MM",
    "YYYY": "YYYY",
    "Not a real date": "આવી તારીખ હોતી નથી",
    "Type a day": "દિવસ લખો",
    "OK": "સાચું",
    "Change a tile first.": "પહેલાં કોઈ એક ટુકડો બદલો.",
    "Type the date first.": "પહેલાં તારીખ લખો.",
    "The toggle works after you answer.": "બટન જવાબ આપ્યા પછી ચાલે છે.",
    "This box is full.": "આ ખાનું ભરાઈ ગયું છે.",
    "Day first, year last": "પહેલાં દિવસ, છેલ્લે વર્ષ",
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
/* THREE phases (the owner, 2026-10-28; NOTES.md decision 2): 1 = the plan's phase 1, 2 = the plan's phase 2, 3 = the plan's phases 3
   (DD-MM-YYYY) and 4 (words to numbers and back) folded into one: its concept id is the plan's phase-3 id and its objectives the union
   of the plan's phase 3 and 4 objectives. A question id only for a question of its own phase; the rest are authored fresh.
   Every date is a real date (oracle checks it). Item fields of this tool: kind "place" (phase 1: the card's three parts dragged into
   the boxes, judged on the berry Enter key), "nums" (three typed boxes DD | MM | YYYY, the leading zero kept) or "words" (the month
   tapped on the ladder, which writes its two digits into the middle box and draws its NAME there; the day and the year typed);
   d, m, y the date; obj the made picture it is written on; title its event line; lines what the card says; near the misconception;
   win the right answer's line. A phase's `warm` is the warm-up its guide steps work (never question 1's date). */
const WD_DMY = [{ label: "Day", at: "dd" }, { label: "Month", at: "mm" }, { label: "Year", at: "yyyy" }];
const PHASES = [
  {
    n: 1,
    concept: "A date has a day, a month and a year",
    conceptId: "M1.S2.T5.C22", objectiveIds: ["O7"],
    says: ["A date tells three things: which day, which month and which year."],
    /* the warm-up the guide steps work (a summer camp invitation; not a question's date): each tap names a part of the date */
    warm: { kind: "warmp", d: 20, m: 5, y: 2024, obj: "invitation", title: "Summer Camp" },
    steps: [
      { say: "Tap the day on this card.", on: "warm-day", hint: "The day is a number from 1 to 31." },
      { say: "Now tap the month.", on: "warm-month", hint: "The month has a name." },
      { say: "Last, tap the year.", on: "warm-year", hint: "The year has four digits." },
    ],
    /* tries, as the plan writes it: First rung: read the label under each box. Second rung: find the word on the card that is a month. */
    ladder: ["Find the word on the card that names a month.", "The day is the small number, and the long number is the year."],
    closing: "All three parts make the date: the day, the month and the year.",
    learned: "You learned: a date has a day, a month and a year; all three are needed",
    traceback: "the tiles in a wrong box go back to the card, a right box stays green with a tick, and each box lights in turn with what fits in it (1 to 31, a month, 4 digits)",
    items: [
      /* learn WD1: answer in the plan = The day is 23, the month is March and the year is 2017 */
      { qid: "M1.S2.T5.C22:WD1", kind: "place", pad: "enter", d: 23, m: 3, y: 2017, obj: "card", title: "Happy Birthday!",
        order: [0, 1, 2], answer: "23|March|2017", near: "2017|March|23",
        say: "Drag the day, the month and the year from this birthday card into their boxes.", ask: "Day, month, year?",
        miss: "Read the label under each box, then try again.",
        win: "Yes: 23 is the day, March is the month and 2017 is the year.", winMs: 6200 },
      /* practice 1: answer in the plan = 2015 is the year (the plan's train ticket is drawn as an invitation: the made pictures) */
      { qid: "M1.S2.T5.C22:1", kind: "place", pad: "enter", d: 30, m: 4, y: 2015, obj: "invitation", title: "Wedding Invitation",
        order: [2, 0, 1], answer: "30|April|2015", near: "30||2015",
        say: "Now fill the three boxes from the date on this invitation.", ask: "Fill the boxes",
        miss: "A date needs all three parts, so no box stays empty.",
        win: "Right, 30 April 2015 has its day, its month and its year in place.", winMs: 6600 },
      /* authored (the plan's practice 5 asks about 31 November, a date that is not real: the owner wants real dates only) */
      { qid: null, kind: "place", pad: "enter", d: 8, m: 12, y: 2022, obj: "notice", title: "Sports Day",
        order: [1, 2, 0], answer: "8|December|2022", near: "8|2022|December",
        say: "Put each part of the date on this school notice in its own box.", ask: "Each part, its box",
        miss: "Look at each part: which one is a month, and which is a year?",
        win: "Well done: 8 December 2022 splits into its three parts.", winMs: 4600 },
    ],
  },
  {
    n: 2,
    concept: "Day-Month-Year: the month in words",
    conceptId: "M1.S2.T5.C23", objectiveIds: ["O7"],
    says: ["Write the day first, then the month in words, then the year."],
    /* the warm-up the guide step works (a school holiday notice; not a question's date) */
    warm: { kind: "warmw", d: 2, m: 10, y: 2024, obj: "notice", title: "School Holiday", lines: ["2 October 2024"] },
    steps: [
      { say: "Tap October on the ladder to send its name to the Month box.", on: "month-10", hint: "October is the tenth month in the list." },
    ],
    /* tries, as the plan writes it: First rung: which box comes first. Second rung: tap the month on the ladder and read its name. */
    ladder: ["Read the card again: which month does it say?", "Read your date aloud: the day, then the month, then the year."],
    closing: "Day-Month-Year writes the day, then the month in words, then the year.",
    learned: "You learned: Day-Month-Year puts the day, the month in words, the year",
    traceback: "the typed boxes empty, a right box stays green with a tick, and the labels Day, Month, Year light in order with what fits in each",
    items: [
      /* learn WD2: answer in the plan = 9 August 2013 */
      { qid: "M1.S2.T5.C23:WD2", kind: "words", parts: WD_DMY, cardName: "Date", d: 9, m: 8, y: 2013, obj: "invitation", title: "Party Invitation",
        lines: ["Year: 2013", "Month: August", "Day: 9"], answer: ["9", "08", "2013"], near: "20|08|9",
        say: "Write this date the Day-Month-Year way: tap the month, then type the rest.", ask: "Day-Month-Year",
        miss: "Look at the labels: which box comes first?",
        win: "Yes, 9 August 2013 is written the Day-Month-Year way.", winMs: 4600 },
      /* practice 2: answer in the plan = 17 June 2012 */
      { qid: "M1.S2.T5.C23:2", kind: "words", parts: WD_DMY, cardName: "Date", d: 17, m: 6, y: 2012, obj: "notice", title: "Library Notice",
        lines: ["New books came on", "the 17th of June, 2012"], answer: ["17", "06", "2012"], near: "17|06|12",
        say: "Write the date on this library notice with the month in words.", ask: "Month in words",
        miss: "The day goes first and the four-digit year goes last.",
        win: "Right, 17 June 2012, with June written as a word.", winMs: 4600 },
      /* authored: the month given as a number, so the ladder turns it into its name */
      { qid: null, kind: "words", parts: WD_DMY, cardName: "Date", d: 25, m: 11, y: 2018, obj: "invitation", title: "Birthday Party",
        lines: ["Month: 11", "Day: 25", "Year: 2018"], answer: ["25", "11", "2018"], near: "25|10|2018",
        say: "The month here is a number: write this date with that month's name.", ask: "Number to name",
        miss: "Month 11 on the ladder has a name: use that name.",
        win: "Yes, month 11 is November, so the date is 25 November 2018.", winMs: 5400 },
    ],
  },
  {
    n: 3,
    concept: "DD-MM-YYYY: the month in numbers",
    /* the folded phase: the plan's phase-3 concept id; objectives = the union of the plan's phase 3 (O8) and phase 4 (O8) */
    conceptId: "M1.S2.T5.C24", objectiveIds: ["O8"],
    says: ["Find the month on the ladder: its number goes in the middle box."],
    /* the warm-up the guide steps work: one date turned from words to numbers and back (not a question's date) */
    warm: { kind: "warmt", d: 26, m: 1, y: 2025, obj: "notice", title: "Republic Day", lines: ["26 January 2025"] },
    steps: [
      { say: "Tap the toggle to write this month as a number: DD-MM-YYYY.", on: "toggle", hint: "The toggle is under the three boxes." },
      { say: "Tap it once more to turn the number back into the month's name.", on: "toggle", hint: "Tap the same toggle again." },
    ],
    /* tries, as the plan writes it: First rung: find the month on the ladder and read its number. Second rung: write it with two digits. */
    /* the rungs of question 3 (questions 1 and 2 carry their own) */
    ladder: ["Read the card again, then check the month's number on the ladder.", "A day or a month with one digit starts with a 0, like 07."],
    closing: "DD-MM-YYYY writes 2 digits for the day, 2 for the month and 4 for the year.",
    learned: "You learned: DD-MM-YYYY is 2, 2 and 4 digits; both ways name one date",
    traceback: "the typed boxes empty, a right box stays green with a tick, the labels light in order and each wrong box shows DD, MM or YYYY (or 1 to 31, a month, 4 digits); a note says when a date is not real (no month 13, April has 30 days) or a 0 goes in front",
    items: [
      /* authored (the plan's phase 4, numbers back to words; the plan's C25 questions stay with that dropped phase) */
      { qid: null, kind: "words", parts: WD_DMY, cardName: "Date", d: 6, m: 11, y: 2023, obj: "notice", title: "Science Fair",
        lines: ["06-11-2023"], answer: ["6", "11", "2023"], near: "11|06|2023",
        say: "This notice is in numbers: write its date with the month in words.", ask: "Back to words",
        miss: "The first number is the day and the second is the month.",
        ladder: ["The middle number is the month: which name has that number?", "Tap that name on the ladder, then type the day and the year from the card."],
        win: "Yes, 06-11-2023 is 6 November 2023.", winMs: 3400 },
      /* learn WD3: answer in the plan = 14-10-2019 */
      { qid: "M1.S2.T5.C24:WD3", kind: "nums", parts: WD_DMY, cardName: "Date", d: 14, m: 10, y: 2019, obj: "notice", title: "Annual Day",
        lines: ["14 October 2019"], answer: ["14", "10", "2019"], near: "10|14|2019",
        say: "Write the date on this school notice in numbers, as DD-MM-YYYY.", ask: "DD-MM-YYYY",
        miss: "Check the day, the month and the year against the card.",
        ladder: ["Write the day first; the month's number goes in the middle.", "Your boxes must read day, month, year, like the card."],
        win: "Yes, 14 October 2019 is 14-10-2019.", winMs: 3400 },
      /* practice 6: answer in the plan = 05-03-2016, because the day and the month each need two digits */
      { qid: "M1.S2.T5.C24:6", kind: "nums", parts: WD_DMY, cardName: "Date", d: 5, m: 3, y: 2016, obj: "notice", title: "Result Day",
        lines: ["5 March 2016"], answer: ["05", "03", "2016"], near: "5|3|2016",
        say: "Now write this Result Day date in numbers too.", ask: "In numbers again",
        miss: "Count the digits you wrote in each of the three boxes.",
        win: "Right, 05-03-2016: a 0 goes in front of the 5 and the 3.", winMs: 6200 },
    ],
  },
];

/* The numbers, rows, sizes and targets the working area needs (they go into the sidecar too). */
const MODEL = {
  months: WD_MONTHS.map((name, k) => ({ name, number: wdPad(k + 1) })),
  monthDays: "30 days: April, June, September, November; 31: the rest; February 28, or 29 in a leap year (every fourth year)",
  forms: { words: "Day-Month-Year: 7 November 2019", numbers: "DD-MM-YYYY: 07-11-2019 (2, 2 and 4 digits, the zero in front kept)" },
  boxes: ["Day", "Month", "Year"],
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: is this value right for this item?
   place: the three boxes hold the card's day, month and year tiles, in that order ("23|March|2017").
   nums:  DD | MM | YYYY digit for digit, so "7" is not "07" (the leading zero is the lesson).
   words: the day by value (9 or 09), the month tapped on the ladder (its two digits in the middle box), the year in four digits. */
/* the three boxes of a typed answer, as digit strings ("05"), from "5|03|2016", ["5", 3, 2016] or a written date ("6|November|2023",
   "6 November 2023", "06-11-2023"): a month written as its name is read as its two digits */
const wdPartsOf = (v: any) => {
  const s = String(v ?? "").trim();
  const a: any[] = Array.isArray(v) ? v : s.includes("|") ? s.split("|") : s.split(/[\s-]+/);
  return [0, 1, 2].map((j) => {
    const x = String(a[j] ?? "").trim(), k = WD_MONTHS.findIndex((nm) => nm.toLowerCase() === x.toLowerCase());
    return k >= 0 ? wdPad(k + 1) : x.replace(/[^0-9]/g, "");
  });
};
const judge = (item: any, v: any) => {
  if (item.kind === "place") {
    const g = Array.isArray(v) ? v.map(String) : String(v ?? "").split("|"), a = String(item.answer).split("|");
    return a.length === 3 && a.every((x: string, j: number) => String(g[j] ?? "").trim() === x);
  }
  const g = wdPartsOf(v), a = item.answer.map(String);
  if (item.kind === "nums") return a.every((x: string, j: number) => g[j] === x);
  return g[0] !== "" && Number(g[0]) === Number(a[0]) && g[1] !== "" && Number(g[1]) === Number(a[1]) && g[2] === a[2];
};
/* oracle: a second route that shares no code with judge or Work: the browser's own calendar says each date is real
   (no 31 November, no 29 February outside a leap year) and the answer is rebuilt from the date with its own padding */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const t = new Date(Date.UTC(it.y, it.m - 1, it.d));
  if (t.getUTCFullYear() !== it.y || t.getUTCMonth() !== it.m - 1 || t.getUTCDate() !== it.d) return false;
  const two = (x: number) => (x < 10 ? "0" + x : "" + x);
  let name = "";
  try { name = t.toLocaleString("en-GB", { month: "long", timeZone: "UTC" }); } catch (e) { name = ""; }
  if (it.kind === "place") return /^[A-Z][a-z]+$/.test(name) ? it.answer === [it.d, name, it.y].join("|") : String(it.answer).split("|")[0] === String(it.d);
  const want = [it.kind === "nums" ? two(it.d) : String(it.d), two(it.m), String(it.y)];
  return Array.isArray(it.answer) && want.every((x, j) => String(it.answer[j]) === x) && !judge(it, it.near) && judge(it, it.answer);
}));
/* the most likely wrong answer (the item's misconception); judge must reject it */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => {
  const name = WD_MONTHS[item.m - 1], f = [`${item.d} ${name} ${item.y}`, `${wdPad(item.d)}-${wdPad(item.m)}-${item.y}`, String(item.y)];
  if (item.d >= 10) f.push(String(item.d));
  if (item.kind === "nums") f.push(wdPad(item.d), wdPad(item.m));
  else f.push(name);
  return [...new Set(f)];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it:
   place "23|March|2017" (the tool's answer() places the tiles); nums and words the three boxes ["05", "03", "2016"] */
const agentKey = (item: any) => (item.kind === "words" ? [item.d, WD_MONTHS[item.m - 1], item.y].join("|") : item.answer);

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer(): phase 1 places the tiles as a child would; a words question fills its three boxes (the month as the ladder
   would: its two digits in the middle box, its name drawn there); undefined = the runtime types it (a DD-MM-YYYY question) */
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : item.kind === "words" && HOOK.fill ? HOOK.fill(v) : undefined);
/* the agent's check() before Enter: a words question's act (the month tapped on the ladder) is done here when it still waits;
   undefined = press Enter. In a guide-steps phase (stage "demo") the runtime never calls it (the step goes to api.onEnter) */
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
   MISS HIDES THE ANSWER (a chapter whose runtime.json has rules.missHidesAnswer "strict", PATTERNS.md 7): the traceback replays the
   working and stops ONE step before the answer; whatever shows the answer carries data-reveals="answer" and is drawn only at
   stage "win"; an always-printed scale (a ruler's 0 to 16) carries data-scale (check miss-hides-answer).
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
/* THE TWO LAYOUTS (Work coordinates). G1: phase 1, the card and the three boxes centred (a working-area answer: the panel never
   opens). G2: phases 2 and 3 and free play, laid out ONCE inside the open width (1086, bigPad false) so nothing moves when the keypad
   slides in: the card and the boxes on the left, the month ladder (2 columns of 6, January 01 to December 12) on the right, the
   toggle under the boxes. Nothing reaches the key's corner (x 1190 on, y 0 to 88). */
const WD_G1: any = { card: { cx: 736, y: 0, h: 280 }, boxes: [{ x: 306, y: 304, w: 200, h: 100 }, { x: 546, y: 304, w: 340, h: 100 }, { x: 926, y: 304, w: 240, h: 100 }],
  labelY: 448, labelSize: 40, note: { x: 306, y: 466, w: 860, h: 50 }, digits: 60, row: 0.68, tile: 42 };
const WD_G2: any = { card: { cx: 284, y: 0, h: 210 }, boxes: [{ x: 0, y: 224, w: 120, h: 88 }, { x: 164, y: 224, w: 210, h: 88 }, { x: 418, y: 224, w: 150, h: 88 }],
  labelY: 364, labelSize: 40, note: { x: 0, y: 382, w: 568, h: 50 }, digits: 60, toggle: { x: 130, y: 442, w: 438, h: 72 },
  ladder: { x: 588, y: 23, w: 245, h: 72, gx: 8, gy: 8 } };
const wdTile = (m: number) => { const L = WD_G2.ladder, c = m <= 6 ? 0 : 1, r = (m - 1) % 6; return { x: L.x + c * (L.w + L.gx), y: L.y + r * (L.h + L.gy), w: L.w, h: L.h }; };
const WD_PART = ["day", "month", "year"];
/* what a miss shows: which boxes were right (a green frame and a tick, never their digits: MISS HIDES THE ANSWER), what fits in a
   wrong box (DD, MM, YYYY or 1 to 31, a month, 4 digits) and one note in words: a part missing, no such month, a month's length
   when the date is not real, or the 0 in front. Never the right value. */
function wdReview(it: any, v: any) {
  const name = WD_MONTHS[it.m - 1];
  if (it.kind === "place") {
    const g = String(v ?? "").split("|").map((x: string) => x.trim()), a = [String(it.d), name, String(it.y)];
    const isNum = (x: string) => /^\d+$/.test(x || "");
    const note = [0, 1, 2].some((j) => !g[j]) ? "Fill all 3 boxes" : !WD_MONTHS.includes(g[1]) ? "Month: a month name"
      : !(isNum(g[0]) && +g[0] >= 1 && +g[0] <= 31) ? "Day: 1 to 31" : !/^\d{4}$/.test(g[2]) ? "Year: 4 digits" : "";
    const noteAt = ({ "Month: a month name": 1, "Day: 1 to 31": 0, "Year: 4 digits": 2 } as any)[note] ?? -1;
    return { ok: a.map((x, j) => g[j] === x), note, noteAt, ghost: ["1 to 31", "a month", "4 digits"] };
  }
  const g = wdPartsOf(v), d = Number(g[0]), m = Number(g[1]), y = Number(g[2]);
  const ok = it.kind === "nums" ? [g[0] === wdPad(it.d), g[1] === wdPad(it.m), g[2] === String(it.y)]
    : [g[0] !== "" && d === it.d, g[1] !== "" && m === it.m, g[2] === String(it.y)];
  let note = "";
  let noteAt = -1;
  if (g.some((x: string) => x === "")) note = "Fill all 3 boxes";
  else if (/^(19|20)$/.test(g[0]) && g[2].length <= 2) note = "Day first, year last";   /* the year begun in the Day box */
  else if (m < 1 || m > 12) { note = "Only 12 months"; noteAt = 1; }
  else if (d < 1 || d > 31) { note = "Day: 1 to 31"; noteAt = 0; }
  else if (g[2].length !== 4) { note = "Year: 4 digits"; noteAt = 2; }
  else if (d > wdDays(m, y)) { note = `days:${m}:${wdDays(m, y)}`; noteAt = 0; }   /* drawn by wdDaysLine in the language in use */
  else if (it.kind === "nums" && ((g[0].length < 2 && it.d < 10) || (g[1].length < 2 && it.m < 10))) { note = "Put 0 in front"; noteAt = g[0].length < 2 && it.d < 10 ? 0 : 1; }
  /* the day and the month both wrong (a swap, or 06-11 read as 11 June): one general note, never the right month by name */
  if (!note && !ok[0] && !ok[1]) { note = "Day, then month"; noteAt = 0.5; }
  return { ok, note, noteAt, ghost: it.kind === "nums" ? ["DD", "MM", "YYYY"] : ["1 to 31", "a month", "4 digits"] };
}

function Work({ phase, n, item, index, stage, wrong, typed, part, captured, api, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  /* every English word the picture draws goes through tx("...") (its key is added to TR in the language pass) */
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const warmIt = phase && phase.warm;
  /* a phase with guide steps works its warm-up (never question 1's date); "teach" is drawn like "demo" (PATTERNS §18) */
  const warm = !free && !!warmIt && (stage === "demo" || stage === "teach");
  const it: any = free ? {} : warm ? warmIt : item || {};
  const k = free ? "free" : it.kind;                                     /* place | nums | words | warmw | warmt | free */
  const G: any = k === "place" || k === "warmp" ? WD_G1 : WD_G2;
  const won = !free && !warm && (stage === "win" || stage === "idle");
  const asking = stage === "ask" && !free && !warm;
  const card = k === "nums" || k === "words";                             /* answered on the date boxes (cardAnswer) */

  /* the board belongs to an ENTRY of a question (PATTERNS §18): a new question, a restart or Free play builds it fresh */
  const qk = n + ":" + (free ? "free" : warm ? "warm" : index);
  const ent = useRef<any>({ qk: "", n: 0, st: "" });
  if (ent.current.qk !== qk || (stage === "teach" && ent.current.st !== "teach")) ent.current = { qk, n: ent.current.n + 1, st: stage };
  else ent.current.st = stage;
  const ek = qk + "#" + ent.current.n;
  const ekRef = useRef(ek);
  ekRef.current = ek;
  const fresh = () => ({ ek, at: [null, null, null], sel: -1, tr: false, rv: null, kept: null, lit: -1, touched: false, user: false,
    form: k === "nums" ? "numbers" : "words", wk: [false, false, false], wf: 0, wm: 0, light: 0, fly: 0, cap: "", fp: { d: "14", m: 11, y: "2024", form: "words" } });
  const [raw, setRaw] = useState<any>({ ek: "" });
  const S: any = raw.ek === ek ? raw : fresh();
  const put = (o: any) => {
    if (ek !== ekRef.current) return;                                    /* a callback of an older entry writes nothing */
    setRaw((p: any) => { const b = p.ek === ek ? p : fresh(); return { ...b, ...(typeof o === "function" ? o(b) : o) }; });
  };
  const atRef = useRef<any>({ ek: "", at: [null, null, null] });
  const atNow = () => (atRef.current.ek === ek ? atRef.current.at : S.at);
  const setAt = (at: any[]) => { atRef.current = { ek, at }; put({ at }); };

  const tp = card ? slotPartsOf(typed, 3) : ["", "", ""];
  const mPick = k === "words" ? Number(tp[1]) || 0 : 0;                  /* the month tapped on the ladder (its digits in box 2) */
  const tiles = k === "place" || k === "warmp" ? [String(it.d), WD_MONTHS[it.m - 1], String(it.y)] : [];
  const inBox = (j: number, at?: any[]) => (at || S.at).findIndex((b: any) => b === j);
  const placedOf = (at: any[]) => [0, 1, 2].map((j) => { const t = inBox(j, at); return t >= 0 ? tiles[t] : ""; }).join("|");
  const placedN = S.at.filter((b: any) => b !== null).length;

  /* THE ANSWER GATED BY THE ACT (PATTERNS §19): a words question waits for its month to be tapped on the ladder, a phase-1 question for
     its first tile; the lock only in user mode after a real touch (the agent's check() does the act, so toolApi runs are never gated) */
  const needAct = asking && ((k === "place" && placedN === 0) || (k === "words" && !mPick));
  /* once the act is done in this entry the gate never locks again (a miss empties the month box: the card waits for a new tap,
     but the pad, the Hint key and its rungs stay live) */
  const actedNow = asking && ((k === "place" && placedN > 0) || (k === "words" && mPick > 0));
  useEffect(() => { if (actedNow && !S.acted) put({ acted: true }); }, [actedNow, ek]);
  const gateLock = k === "words" && needAct && !S.acted && !actedNow && S.touched && S.user;
  useEffect(() => { if (!free) api.lock(!!S.tr || gateLock); }, [S.tr, gateLock, ek]);
  useEffect(() => { if (card && stage === "ask") api.cardReady(!needAct && !S.tr, needAct); }, [needAct, S.tr, ek, stage]);
  useEffect(() => { if (k === "place") api.answerReady(asking && placedN === 3 && !S.tr); }, [placedN, S.tr, asking, ek]);
  useEffect(() => () => tl.stop(), [ek]);

  const touch = () => {
    if (S.touched) return;
    let user = true;
    try { const g = (window as any).toolApi && (window as any).toolApi.getState(); user = !g || g.mode !== "ai"; } catch (e) { user = true; }
    put({ touched: true, user });
  };
  const typedNow = () => { try { return (window as any).toolApi.getState().typed; } catch (e) { return typed; } };

  /* a box takes 2, 2 and 4 digits: a third digit in the Day box is not kept (the box has room for two) */
  const prevTp = useRef<string[]>(["", "", ""]);
  useEffect(() => {
    const was = prevTp.current;
    prevTp.current = tp;
    if (!card || stage !== "ask" || S.tr) return;
    const c = tp.map((p: string, j: number) => p.slice(0, [2, 2, 4][j]));
    if (c.some((p: string, j: number) => p !== tp[j])) { api.setTyped(c.join("|")); nudge("This box is full.", c.join("|")); return; }
    /* the day (and a DD-MM-YYYY month) filled to two digits as the child types: the caret goes on to the next box */
    if (box.open && part === 0 && tp[0].length === 2 && was[0].length < 2) api.pickPart(k === "words" ? 2 : 1);
    else if (box.open && k === "nums" && part === 1 && tp[1].length === 2 && was[1].length < 2) api.pickPart(2);
  }, [typed]);
  /* a words question: the Month box is filled from the ladder, never typed, so the caret steps over it */
  const prevPart = useRef(0);
  useEffect(() => {
    if (k === "words" && stage === "ask" && part === 1) api.pickPart(prevPart.current === 2 ? 0 : 2);
    prevPart.current = part;
  }, [part, k, stage]);

  /* THE MONTH LADDER: a tap carries the month's name into the Month box (the hand, api.act) */
  const playing = useRef(false);
  const carry = (m: number, done: () => void) => {
    if (playing.current) return;
    if (!api.act) { done(); return; }
    const a = wdTile(m), b = G.boxes[1], name = tx(WD_MONTHS[m - 1]), fs = wdFit(name, 200, 34);
    playing.current = true;
    put({ fly: m });
    api.act({ tool: "hand", moves: "carry", from: { x: a.x + a.w / 2, y: a.y + a.h / 2 }, at: [{ x: b.x + b.w / 2, y: b.y + b.h / 2 }],
      hold: <g><rect x={-108} y={-30} width={216} height={60} rx={12} fill="#FFFFFF" stroke="#6F6553" strokeWidth={3} filter="url(#wdShadowLift)" /><text y={fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill={WD_INK}>{name}</text></g> })
      .then((ok: any) => { playing.current = false; put({ fly: 0 }); if (ok) { api.sfx.settle(); done(); } });
  };
  const ladderTap = (m: number, viaEnter?: boolean) => {
    if (!viaEnter) touch();
    if (stage === "demo") {
      if (k === "warmw" && m === it.m && !S.wm) carry(m, () => { put({ wm: m }); api.did("month-" + m); });
      else api.did("month-" + m);
      return;
    }
    if (free) { carry(m, () => put((b: any) => ({ fp: { ...b.fp, m } }))); return; }
    if (asking && !S.tr && k === "words") {
      carry(m, () => { const ps = slotPartsOf(typedNow(), 3); api.setTyped([ps[0], wdPad(m), ps[2]].join("|")); });
      return;
    }
    put({ light: S.light === m ? 0 : m });                                /* a DD-MM-YYYY question: the ladder is to read; the tile lights */
    api.sfx.tick();
  };
  /* THE TOGGLE: the month as a word or as a number (live in the warm-up of phase 3, at a win and in free play; a question's form is fixed) */
  const lastTog = useRef(0);
  const togLive = (stage === "demo" && k === "warmt") || free || (won && card && n === 3);
  const toggle = (viaEnter?: boolean) => {
    if (!viaEnter) { const t = Date.now(); if (t - lastTog.current < 400) return; lastTog.current = t; touch(); }
    if (stage === "demo") { if (k === "warmt") { put((b: any) => ({ form: b.form === "words" ? "numbers" : "words" })); api.sfx.tick(); } api.did("toggle"); return; }
    if (free) { put((b: any) => ({ fp: { ...b.fp, form: b.fp.form === "words" ? "numbers" : "words" } })); api.sfx.tick(); return; }
    if (won && card && n === 3) { put((b: any) => ({ wf: b.wf ? 0 : 1 })); api.sfx.tick(); }
  };
  /* Enter, the agent's toolApi.check() and the dev solve() perform the current guide step */
  /* phase 1's warm-up: a tap on a part of the card's date names it (Day, Month or Year) */
  const warmTap = (t: number, viaEnter?: boolean) => {
    if (!viaEnter) touch();
    const name = "warm-" + WD_PART[t];
    if (stage !== "demo") return;
    if (stepOn === name) { put((b: any) => ({ wk: b.wk.map((x: boolean, i: number) => x || i === t) })); api.sfx.tick(); }
    api.did(name);
  };
  const act = (on: any) => {
    if (on === "toggle") toggle(true);
    else if (/^month-\d+$/.test(String(on))) ladderTap(Number(String(on).slice(6)), true);
    else if (/^warm-/.test(String(on))) warmTap(WD_PART.indexOf(String(on).slice(5)), true);
  };
  HOOK.demo = stage === "demo" && stepOn ? () => act(stepOn) : null;
  const lastKeyEnter = useRef(0), lastStepAt = useRef(0), nudgeRef = useRef<any>(null);
  /* a nudge: one line on the bubble, kept until the board changes from the state it was said at */
  const nudge = (line: string, sig?: string) => {
    /* a hint on show (keyOnly: it stands in place of the line) is cleared first by the runtime's own card tap, or the nudge stays hidden */
    try { const g = (window as any).toolApi.getState(); if (g.hint && g.hintKind !== "type" && api.openAnswer) api.openAnswer(); } catch (e) { /* no toolApi */ }
    api.say(line);
    put({ nudged: sig !== undefined ? sig : k === "place" ? placedOf(atNow()) : String(typedNow()) }); };
  useEffect(() => {
    /* the keyboard's Enter (never one pressed on a focused control: a month tile's Enter is its own act) */
    const h = (e: any) => {
      if (e.key !== "Enter") return;
      lastKeyEnter.current = Date.now();
      const tg = e.target && e.target.closest ? e.target.closest("[data-control]") : null;
      if (!tg && nudgeRef.current) nudgeRef.current("enter");
    };
    /* the pad's own keys (a touch-only child): its Enter and its digits, after the runtime has taken the tap */
    const c = (e: any) => {
      const tg = e.target && e.target.closest ? e.target.closest("[data-control]") : null, id = tg ? String(tg.getAttribute("data-control")) : "";
      if (!/^key-/.test(id)) return;
      setTimeout(() => { if (nudgeRef.current) nudgeRef.current(id === "key-enter" ? "enter" : "digit"); }, 0);
    };
    window.addEventListener("keydown", h, true);
    window.addEventListener("click", c, true);
    return () => { window.removeEventListener("keydown", h, true); window.removeEventListener("click", c, true); };
  }, []);
  const stepEnter = () => {
    const t = Date.now();
    if (t - lastKeyEnter.current < 150 && t - lastStepAt.current < 450) return;   /* the second press of a doubled Enter */
    lastStepAt.current = t;
    act(stepOn);
  };
  /* a words question before its month is tapped: Enter (keyboard or the pad's key) or a pad digit says what to do first; a DD-MM-YYYY or
     words question with nothing typed says so at Enter (only before a miss: after one the runtime keeps its hint on an empty Enter) */
  nudgeRef.current = asking && card && !S.tr ? (key: string) => {
    if (k === "words" && !mPick) {
      if (wrong && api.openAnswer) api.openAnswer();   /* a hint stands after a miss: the runtime's card tap clears it (the Enter of a stale miss does not) */
      nudge("First tap this card's month on the ladder.");
    } else if (key === "enter" && !wrong && tp[0] === "" && tp[2] === "" && (k === "words" || tp[1] === "")) nudge("Type the date first.");
  } : null;
  /* the state the nudge was said at changed (a tile moved, a month tapped, a digit typed): the question comes back on the bubble */
  const nudgeSig = k === "place" ? placedOf(S.at) : card ? String(typed) : "";
  const overFull = card && tp.some((p: string, j: number) => p.length > [2, 2, 4][j]);   /* a digit a full box will not keep: the trim's nudge speaks */
  useEffect(() => { if (overFull) return; if (typeof S.nudged === "string" && nudgeSig !== S.nudged) { api.say(it.say); put({ nudged: false }); } }, [nudgeSig, S.nudged]);
  /* phase 1: the berry Enter key sends what the three boxes hold (never the same miss twice) */
  const sendPlace = () => {
    if (S.tr) return;
    const v = placedOf(atNow());
    if (v === "||") { nudge("Drag a tile into a box first.", v); return; }
    if (wrong && String(wrong.value) === v) { nudge("Change a tile first.", v); return; }
    api.submit(v);
  };
  api.onEnter(stage === "demo" && stepOn ? stepEnter : asking && k === "place" ? sendPlace : null);
  /* the agent: phase 1 places the tiles as a child would; a words question taps its month (the act) before Enter */
  HOOK.set = asking && k === "place" ? (v: any) => {
    const g = Array.isArray(v) ? v.map(String) : String(v ?? "").split("|");
    const at: any[] = [null, null, null];
    g.slice(0, 3).forEach((x: string, j: number) => { const t = tiles.findIndex((s, i) => s === String(x).trim() && at[i] === null); if (t >= 0) at[t] = j; });
    setAt(at);
    put({ sel: -1 });
    return true;
  } : null;
  /* a words question: check() taps the month when it still waits (the act), then sends the three boxes itself (the caret may stand
     on any box: the Month box is never typed) */
  HOOK.check = asking && k === "words" ? () => {
    const ps = slotPartsOf(typedNow(), 3);
    if (!ps[1]) { ps[1] = wdPad(it.m); api.setTyped(ps.join("|")); }
    if (ps[0] === "" || ps[2] === "") return undefined;
    api.submit(ps.join("|"));
    return true;
  } : null;
  HOOK.fill = asking && k === "words" ? (v: any) => {
    const ps = wdPartsOf(v);
    if (ps.some((x) => x === "")) return false;
    api.setTyped(ps.join("|"));
    return true;
  } : null;

  /* PHASE 1: the tiles of the card's date, dragged (or tapped, then a box tapped) into the boxes */
  const placeTile = (t: number, j: number) => {
    const at = atNow().slice();
    if (j >= 0) { const o = at.findIndex((b: any) => b === j); if (o >= 0 && o !== t) at[o] = null; }   /* the box's old tile goes home */
    at[t] = j >= 0 ? j : null;
    setAt(at);
    put({ sel: -1 });
    api.sfx.tick();
  };
  /* a tile tapped, then a box tapped: the hand carries it there (api.act, PATTERNS §15); a drag is the child's own carry */
  const carryTile = (t: number, j: number) => {
    if (playing.current) return;
    if (!api.act) { placeTile(t, j); return; }
    const r = tileRect(t), b = G.boxes[j], s = tx(tiles[t]), fs = Math.min(G.tile, wdFit(s, r.w - 20, 60));
    playing.current = true;
    put({ fly: 100 + t, sel: -1 });
    api.act({ tool: "hand", moves: "carry", from: { x: r.x + r.w / 2, y: r.y + r.h / 2 }, at: [{ x: b.x + b.w / 2, y: b.y + b.h / 2 }],
      hold: <g><rect x={-r.w / 2} y={-36} width={r.w} height={72} rx={14} fill="#FFFFFF" stroke="#6F6553" strokeWidth={3} filter="url(#wdShadowLift)" /><text y={fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill={WD_INK}>{s}</text></g> })
      .then((ok: any) => { playing.current = false; put({ fly: 0 }); if (ok) placeTile(t, j); });
  };
  const lastTileAct = useRef(0);
  const tileTap = (t: number) => {
    const now = Date.now();
    if (now - lastTileAct.current < 300) return;
    lastTileAct.current = now;
    const at = atNow();
    if (S.sel >= 0 && S.sel !== t && at[t] !== null) { carryTile(S.sel, at[t]); return; }
    if (at[t] !== null) { placeTile(t, -1); return; }
    put({ sel: S.sel === t ? -1 : t });
    api.sfx.tick();
  };
  const drag = useDrag((t: any, p: any, moved: boolean) => {
    if (k !== "place" || S.tr || won || playing.current) return;
    touch();
    if (!moved) { tileTap(t); return; }
    const j = G.boxes.findIndex((b: any) => p.x >= b.x - 16 && p.x <= b.x + b.w + 16 && p.y >= b.y - 16 && p.y <= b.y + b.h + 16);
    placeTile(t, j);
  });
  const boxTap = (j: number) => {
    touch();
    const now = Date.now();
    if (now - lastTileAct.current < 300) return;
    lastTileAct.current = now;
    if (S.sel >= 0) carryTile(S.sel, j);
  };

  /* FREE PLAY: the Day and Year boxes borrow the keypad (api.capture), the ladder sets the month, the toggle turns the form */
  const fpKey = (field: string) => (key: string) => {
    if (key === "enter") { api.capture(null); put({ cap: "" }); return; }
    put((b: any) => {
      const max = field === "d" ? 2 : 4;
      let s = String(b.fp[field] ?? "");
      if (key === "back") s = s.slice(0, -1);
      else if (key === "clear") s = "";
      else if (/^\d$/.test(key)) s = s.length >= max ? key : s + key;
      else return {};
      if (field === "y" && s.length === 4) s = String(Math.max(1901, Math.min(2099, Number(s))));
      return { fp: { ...b.fp, [field]: s } };
    });
  };
  const fpOpen = (field: string) => { touch(); put({ cap: field }); api.capture(fpKey(field)); };

  /* THE CORRECTION: unmarked; the right boxes keep a green frame and a tick (never their digits), the wrong tiles go home, the labels
     light Day, Month, Year in turn with what fits in each, then one note; it stops there, a step before the answer */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free || warm) return;
    api.lock(true);   /* at once, in the miss's own commit (the lock effect below holds it while S.tr is set) */
    const rv = wdReview(it, wrong.value);
    const upd: any = { tr: true, rv, lit: -1, sel: -1 };
    if (k === "place") {
      const at0 = atNow(), at = at0.map((b: any) => (b !== null && !rv.ok[b] ? null : b));
      atRef.current = { ek, at };
      upd.at = at;
      upd.kept = [0, 1, 2].map((j) => inBox(j, at));
      if (at.some((b: any, t: number) => b !== at0[t])) api.sfx.settle();
    }
    put(upd);
    tl.run([[350, () => put({ lit: 0 })], [650, () => put({ lit: 1 })], [950, () => put({ lit: 2 })], [1250, () => put({ lit: 3 })]], () => put({ tr: false }));
  }, [wrong]);
  /* the win: the date reads whole, then the toggle turns it to the other way (the day and the year stay where they are) */
  useEffect(() => {
    if (stage !== "win" || free || warm || !it.win) return;
    api.say(it.win);
    if (card && n === 3) tl.run([[1100, () => put({ wf: 1 })]], () => {});   /* phase 3 only: phase 2 ends on the date in words */
  }, [stage, ek]);

  /* what the host and the agent read back (toolApi.getState): only what the child has entered */
  const boxForm = free ? S.fp.form : k === "warmt" ? S.form : k === "nums" ? (won && S.wf ? "words" : "numbers") : card && won && S.wf ? "numbers" : "words";
  const entered = k === "place" ? [0, 1, 2].map((j) => { const t = inBox(j); return t >= 0 ? tiles[t] : ""; }) : free ? [S.fp.d, wdPad(S.fp.m), S.fp.y] : card ? tp : ["", "", ""];
  api.share({ phase: n, day: entered[0], month: entered[1], year: entered[2], form: boxForm });

  /* ── drawing ── */
  const cardB = wdCardBox(free ? "invitation" : it.obj || "notice", G.card.cx, G.card.y, G.card.h);
  const rv = asking && wrong ? S.rv : null;
  const noteText = (nt: string) => { const mm = /^days:(\d+):(\d+)$/.exec(String(nt || "")); return mm ? wdDaysLine(+mm[1], +mm[2], lang, tx) : tx(nt); };
  const litOf = (j: number) => (rv ? (S.tr ? S.lit >= j : true) : false);
  const boxVals: string[] = (() => {
    if (free) return [S.fp.form === "numbers" && S.fp.d !== "" ? wdPad(S.fp.d) : S.fp.d, S.fp.form === "words" ? tx(WD_MONTHS[S.fp.m - 1]) : wdPad(S.fp.m), S.fp.y];
    if (k === "warmw") return [String(it.d), S.wm ? tx(WD_MONTHS[S.wm - 1]) : "", String(it.y)];
    if (k === "warmt") return S.form === "words" ? [String(it.d), tx(WD_MONTHS[it.m - 1]), String(it.y)] : [wdPad(it.d), wdPad(it.m), String(it.y)];
    if (won && card) return boxForm === "numbers" ? [wdPad(it.d), wdPad(it.m), String(it.y)] : [String(it.d), tx(WD_MONTHS[it.m - 1]), String(it.y)];
    if (k === "nums") return tp;
    if (k === "words") return [tp[0], mPick >= 1 && mPick <= 12 ? tx(WD_MONTHS[mPick - 1]) : "", tp[2]];
    return ["", "", ""];
  })();
  const caretOn = (j: number) => (card && asking && !S.tr && box.open && part === j) || (free && captured && S.cap === (j === 0 ? "d" : j === 2 ? "y" : "-"));
  const cardLines: string[] = free
    ? (() => {
      const d = Number(S.fp.d), y = Number(S.fp.y), m = S.fp.m, name = tx(WD_MONTHS[m - 1]);
      const real = S.fp.d !== "" && d >= 1 && /^\d{4}$/.test(S.fp.y) && d <= wdDays(m, y);
      const why = S.fp.d === "" || d < 1 ? tx("Type a day") : !/^\d{4}$/.test(S.fp.y) ? tx("Year: 4 digits") : wdDaysLine(m, wdDays(m, y), lang, tx);
      return real ? [`${d} ${name} ${S.fp.y}`, `${wdPad(d)}-${wdPad(m)}-${S.fp.y}`] : [tx("Not a real date"), why];
    })()
    : k === "place" || k === "warmp" ? [] : (it.lines || []).map((l: string) => tx(l));
  /* the card's lines stay inside its printed border (about 0.1 h from each edge) */
  const lineSize = cardLines.length >= 3 ? 30 : cardLines.length === 2 ? 36 : 42;
  const lineY = (i: number) => cardB.y + cardB.h * (cardLines.length >= 3 ? [0.44, 0.61, 0.78][i] : cardLines.length === 2 ? [0.52, 0.74][i] : 0.64);

  /* phase 1's tiles: at home in the card's date line, or in a box */
  const tileW = (s: string) => Math.max(84, Math.round(s.length * 0.6 * G.tile + 32));
  const order: number[] = k === "place" && Array.isArray(it.order) ? it.order : [0, 1, 2];   /* the tiles left to right on the card */
  const homes = (() => {
    const ws = order.map((t) => tileW(tiles[t] || "")), gap = 14, tot = ws.reduce((a, b) => a + b, 0) + gap * Math.max(0, ws.length - 1);
    let x = cardB.x + cardB.w / 2 - tot / 2;
    const out: any[] = [];
    order.forEach((t, p) => { out[t] = { x, y: cardB.y + cardB.h * (G.row || 0.68) - 36, w: ws[p], h: 72 }; x += ws[p] + gap; });
    return out;
  })();
  const atShow = won && k === "place" ? [0, 1, 2] : S.at;
  const tileRect = (t: number) => {
    const j = atShow[t];
    if (j === null || j === undefined) return homes[t];
    const b = G.boxes[j];
    return { x: b.x + 8, y: b.y + 14, w: b.w - 16, h: b.h - 28 };
  };
  const dragging = drag.drag && drag.drag.moved ? drag.drag : null;
  const drawTile = (t: number, r: any, live: boolean, lifted: boolean, faded?: boolean) => {
    const s = tx(tiles[t]), fs = Math.min(G.tile + (atShow[t] !== null ? 6 : 0), wdFit(s, r.w - 20, 60));
    const body = (
      <g opacity={faded ? 0.3 : 1}>
        <rect x={r.x} y={r.y + (lifted ? -6 : 0)} width={r.w} height={r.h} rx={14} fill="url(#wdTileGrad)" stroke={lifted ? WD_LIT : "#6F6553"} strokeWidth={lifted ? 5 : 3} filter={lifted ? "url(#wdShadowLift)" : "url(#wdShadowSoft)"} />
        <rect x={r.x + 3} y={r.y + (lifted ? -3 : 3)} width={r.w - 6} height={r.h / 2} rx={11} fill="#FFFFFF" fillOpacity={0.4} pointerEvents="none" />
        <text x={r.x + r.w / 2} y={r.y + r.h / 2 + fs * 0.36 + (lifted ? -6 : 0)} textAnchor="middle" fontSize={fs} fontWeight={700} fill={WD_INK}>{s}</text>
      </g>
    );
    if (!live) return <g key={"t" + t}>{body}</g>;
    return (
      <g key={"t" + t} {...control("tile-" + (order.indexOf(t) + 1), tiles[t])} {...drag.bind(t)} {...drag.keys(t)} style={{ cursor: "grab" } as any}>
        <rect x={r.x - 4} y={r.y - 4} width={r.w + 8} height={Math.max(72, r.h + 8)} fill="transparent" />
        {body}
      </g>
    );
  };

  const formIs = boxForm;
  const bs = G.boxes;
  return (
    <g>
      <defs>
        <linearGradient id="wdTileGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F7F5EE" />
        </linearGradient>
        <linearGradient id="wdTileGradLit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF9EB" />
          <stop offset="100%" stopColor="#FFECB3" />
        </linearGradient>
        <linearGradient id="wdBoxBgOk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EBF8F3" />
          <stop offset="100%" stopColor="#D1F0E3" />
        </linearGradient>
        <linearGradient id="wdTogGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3A82A7" />
          <stop offset="100%" stopColor="#245A77" />
        </linearGradient>
        <filter id="wdShadowSoft" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#1A2835" floodOpacity="0.12" />
        </filter>
        <filter id="wdShadowLift" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#1A2835" floodOpacity="0.22" />
        </filter>
      </defs>

      {/* the card with its event line and its date, written in code over the made picture */}
      {wdCard(free ? "invitation" : it.obj || "notice", cardB, free ? "My Date" : it.title || "", tx, "card")}
      {cardLines.map((l: string, i: number) => (
        <text key={"l" + i} x={cardB.x + cardB.w / 2} y={lineY(i) + lineSize * 0.36} textAnchor="middle" fontSize={wdFit(l, cardB.w * 0.84, lineSize)} fontWeight={600} fill={WD_INK}>{l}</text>
      ))}
      {k === "place" && !won && homes.map((h: any, t: number) => (atShow[t] !== null ? (
        <rect key={"home" + t} x={h.x} y={h.y} width={h.w} height={h.h} rx={14} fill="#FFFFFF" fillOpacity={0.35} stroke="#6F6553" strokeWidth={2} strokeDasharray="8 8" />
      ) : null))}
      {k === "place" && won && (
        <text x={cardB.x + cardB.w / 2} y={cardB.y + cardB.h * G.row + 15} textAnchor="middle" fontSize={G.tile} fontWeight={700} fill={WD_INK}>{`${it.d} ${tx(WD_MONTHS[it.m - 1])} ${it.y}`}</text>
      )}

      {/* the three boxes, Day, Month and Year, in that order, each with its label under it */}
      {bs.map((b: any, j: number) => {
        const val = boxVals[j] || "";
        const placedOk = k === "place" && rv && rv.ok[j] && S.kept && S.kept[j] >= 0 && inBox(j) === S.kept[j];
        const okNow = won || (rv && litOf(j) && rv.ok[j] && (k === "place" ? placedOk : val === ""));
        const ghost = rv && litOf(j) && !rv.ok[j] && (k === "place" ? inBox(j) < 0 : val === "") ? tx(rv.ghost[j]) : "";
        const isWord = j === 1 && formIs === "words" && k !== "place";
        const fs = isWord ? wdFit(val, b.w - 40, 46) : Math.min(G.digits, wdFit(val, b.w - 24, G.digits));
        const gs = ghost ? Math.max(30, Math.min(T.label, Math.floor((b.w - (caretOn(j) ? 34 : 16)) / (String(ghost).length * 0.5)))) : 0;
        const okEmpty = okNow && !won && k !== "place" && val === "" && !caretOn(j);   /* a right box, emptied by the miss */
        return (
          <g key={"b" + j}>
            {wdBox(b, ["Day", "Month", "Year"][j], G.labelY, G.labelSize, { ok: okNow, tick: okNow && !won && !caretOn(j), lit: rv && S.tr && S.lit === j, active: caretOn(j) }, tx)}
            {ghost ? <text x={b.x + b.w / 2 + (caretOn(j) ? 8 : 0)} y={b.y + b.h / 2 + 11} textAnchor="middle" fontSize={gs} fontWeight={600} fill={WD_GHOST}>{ghost}</text> : null}
            {okEmpty ? <text x={b.x + b.w / 2} y={b.y + b.h / 2 + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={WD_GREEN_INK}>{tx("OK")}</text> : null}
            {k !== "place" && val ? (
              <text x={b.x + b.w / 2} y={b.y + b.h / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700}
                fill={won ? WD_GREEN_INK : WD_INK} {...(won ? { "data-reveals": "answer" } : {})}>{val}</text>
            ) : null}
            {caretOn(j) ? <rect className="c4-caret" x={val ? b.x + b.w / 2 + String(val).length * fs * 0.3 + 4 : ghost ? b.x + 12 : b.x + b.w / 2 - 2} y={b.y + 22} width={4} height={b.h - 44} fill={WD_INK} /> : null}
          </g>
        );
      })}
      {/* DD-MM-YYYY: short dashes between the boxes when the month is a number */}
      {formIs === "numbers" && k !== "place" && [0, 1].map((j) => {
        const x = (bs[j].x + bs[j].w + bs[j + 1].x) / 2, y = bs[j].y + bs[j].h / 2;
        return <rect key={"dash" + j} x={x - 13} y={y - 4} width={26} height={8} rx={4} fill={WD_INK} />;
      })}

      {/* one note under the boxes: after a miss, what is wrong in words; at the win, the date both ways */}
      {rv && rv.note && litOf(3) ? (() => {
        const nt = noteText(rv.note), pw = Math.min(G.note.w, nt.length * 19 + 52);
        const at = typeof rv.noteAt === "number" && rv.noteAt >= 0 ? rv.noteAt : -1;
        const want = at < 0 ? G.note.x + G.note.w / 2 : at === 0.5 ? (bs[0].x + bs[0].w / 2 + bs[1].x + bs[1].w / 2) / 2 : bs[at].x + bs[at].w / 2;
        const cx = Math.max(G.note.x + pw / 2, Math.min(G.note.x + G.note.w - pw / 2, want));
        return (
          <g>
            <rect x={cx - pw / 2} y={G.note.y} width={pw} height={G.note.h} rx={G.note.h / 2} fill="#FFF1D6" stroke={WD_LIT} strokeWidth={2} filter="url(#wdShadowSoft)" />
            <text x={cx} y={G.note.y + G.note.h / 2 + (lang === "en" ? 11 : 13)} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={WD_INK}>{nt}</text>
          </g>
        );
      })() : null}
      {k === "warmt" && S.form === "numbers" ? bs.map((b: any, j: number) => (
        <text key={"dmy" + j} x={b.x + b.w / 2} y={G.note.y + G.note.h / 2 + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={WD_LIT}>{["DD", "MM", "YYYY"][j]}</text>
      )) : null}
      {won && card && n === 3 ? (() => {
        const t1 = `${it.d} ${tx(WD_MONTHS[it.m - 1])} ${it.y}`, t2 = `${wdPad(it.d)}-${wdPad(it.m)}-${it.y}`, room = G.note.w - 24;
        const fz = Math.max(28, Math.min(T.label, Math.floor((room - 40) / ((t1.length + t2.length) * 0.56 + 0.6))));
        const w1 = t1.length * 0.56 * fz, w2 = t2.length * 0.56 * fz, we = 0.6 * fz, tot = w1 + w2 + we + 40;
        const x0 = G.note.x + Math.max(12, (G.note.w - tot) / 2), yb = G.note.y + G.note.h / 2 + 11, eq = x0 + w1 + 20 + we / 2;
        /* each date is anchored at the "=" (the first ends, the second starts, 18 from it), so the gaps are equal */
        return (
          <g data-reveals="answer">
            <text x={eq - we / 2 - 18} y={yb} textAnchor="end" fontSize={fz} fontWeight={700} fill={WD_GREEN_INK}>{t1}</text>
            <text x={eq} y={yb} textAnchor="middle" fontSize={fz} fontWeight={700} fill={WD_GREEN_INK}>=</text>
            <text x={eq + we / 2 + 18} y={yb} textAnchor="start" fontSize={fz} fontWeight={700} fill={WD_GREEN_INK}>{t2}</text>
          </g>
        );
      })() : null}

      {/* the date boxes answer the question (cardAnswer, PATTERNS 9e): one blinking tap target while the keypad is shut, a box each while open */}
      {card && asking && !S.tr && !needAct && !box.open && (
        <g>
          <BlinkRing x={bs[0].x} y={bs[0].y} w={bs[2].x + bs[2].w - bs[0].x} h={bs[0].h} rx={16} C={C} sw={5} m={4} />
          <SlotPartBox id="answer-open" label="Date" x={bs[0].x} y={bs[0].y} w={bs[2].x + bs[2].w - bs[0].x} h={bs[0].h} on={false} enabled={true} onPick={api.openAnswer} />
        </g>
      )}
      {card && asking && !S.tr && box.open && bs.map((b: any, j: number) => (k === "words" && j === 1 ? null : (
        <SlotPartBox key={"pb" + j} id={"part-" + (j + 1)} label={["Day", "Month", "Year"][j]} x={b.x} y={b.y} w={b.w} h={b.h} on={part === j} enabled={true} onPick={() => api.pickPart(j)} />
      )))}
      {/* the toggle: the month in words or in numbers (phases 2 and 3 and free play) */}
      {G === WD_G2 && (() => {
        const T2 = G.toggle, half = T2.w / 2, onW = formIs === "words";
        const look = (
          <g>
            <text x={6} y={T2.y + T2.h / 2 + 12} textAnchor="start" fontSize={T.label} fontWeight={700} fill={WD_INK}>{tx("Month")}</text>
            <rect x={T2.x} y={T2.y} width={T2.w} height={T2.h} rx={T2.h / 2} fill="#F0EAE1" stroke="#6F6553" strokeWidth={3} filter="url(#wdShadowSoft)" />
            <rect x={T2.x + (onW ? 4 : half)} y={T2.y + 4} width={half - 4} height={T2.h - 8} rx={(T2.h - 8) / 2} fill={togLive ? "url(#wdTogGrad)" : "#56707F"} filter="url(#wdShadowSoft)" />
            <rect x={T2.x + (onW ? 6 : half + 2)} y={T2.y + 6} width={half - 8} height={(T2.h - 12) / 2} rx={(T2.h - 12) / 4} fill="#FFFFFF" fillOpacity={0.25} pointerEvents="none" />
            <text x={T2.x + half / 2} y={T2.y + T2.h / 2 + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={onW ? "#FFFFFF" : WD_INK}>{tx("in words")}</text>
            <text x={T2.x + half * 1.5} y={T2.y + T2.h / 2 + 11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={!onW ? "#FFFFFF" : WD_INK}>{tx("in numbers")}</text>
          </g>
        );
        return togLive ? (
          <g key="tog">{look}<Hit id="toggle" x={T2.x} y={T2.y} w={T2.w} h={T2.h} onPress={() => toggle()} label={onW ? "Month in words" : "Month in numbers"} /></g>
        ) : asking && card && !S.tr ? (
          <g key="tog">{look}<Hit id="toggle" x={T2.x} y={T2.y} w={T2.w} h={T2.h} onPress={() => nudge("The toggle works after you answer.")} label="Month toggle" /></g>
        ) : <g key="tog" aria-disabled="true">{look}</g>;
      })()}

      {/* the month ladder: January 01 to December 12, an always-printed table (data-scale: never the answer on show) */}
      {G === WD_G2 && (
        <g data-scale="ladder">
          {WD_MONTHS.map((name, i) => {
            const m = i + 1, r = wdTile(m), lit = S.light === m || S.fly === m || (k === "warmw" && S.wm === m) || (free && S.fp.m === m);
            const nm = tx(name);
            return (
              <g key={"m" + m}>
                <rect x={r.x} y={r.y} width={r.w} height={r.h} rx={12} fill={lit ? "url(#wdTileGradLit)" : "url(#wdTileGrad)"} stroke={lit ? WD_LIT : "#8A7F6C"} strokeWidth={lit ? 4 : 2} filter="url(#wdShadowSoft)" />
                <rect x={r.x + 2} y={r.y + 2} width={r.w - 4} height={r.h / 2.5} rx={10} fill="#FFFFFF" fillOpacity={0.4} pointerEvents="none" />
                <text x={r.x + 14} y={r.y + r.h / 2 + 10} fontSize={Math.max(28, Math.min(T.label, Math.floor((r.w - 84) / (String(nm).length * 0.58))))} fontWeight={600} fill={WD_INK}>{nm}</text>
                <rect x={r.x + r.w - 52} y={r.y + r.h / 2 - 16} width={42} height={32} rx={8} fill={lit ? "#E67E22" : "#1E4F7A"} fillOpacity={lit ? 0.15 : 0.08} />
                <text x={r.x + r.w - 31} y={r.y + r.h / 2 + 10} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={lit ? WD_LIT : "#1E4F7A"}>{wdPad(m)}</text>
                <Hit id={"month-" + m} x={r.x} y={r.y} w={r.w} h={r.h} onPress={() => ladderTap(m)} label={name + " " + wdPad(m)} />
              </g>
            );
          })}
        </g>
      )}

      {/* phase 1's tiles (drawn after the boxes, so a tile in a box lies on it) */}
      {k === "place" && order.map((t) => {
        /* the piece being dragged stays mounted (faded) where it was: the drag and the real-input check keep their element */
        const live = !won && !S.tr, held = (!!dragging && dragging.payload === t) || S.fly === 100 + t;
        return drawTile(t, tileRect(t), live, live && !held && S.sel === t, held);
      })}
      {/* phase 1's warm-up: the date's three parts on the card, each named when it is tapped (no drag here) */}
      {k === "warmp" && tiles.map((s0, t) => {
        const r = homes[t], on = S.wk[t];
        return (
          <g key={"w" + t}>
            {drawTile(t, r, false, on)}
            {on ? (
              <g>
                <rect x={r.x} y={r.y - 50} width={r.w} height={40} rx={20} fill="#FFFFFF" stroke={WD_LIT} strokeWidth={3} filter="url(#wdShadowSoft)" />
                <text x={r.x + r.w / 2} y={r.y - 19} textAnchor="middle" fontSize={wdFit(tx(["Day", "Month", "Year"][t]), r.w - 14, T.label)} fontWeight={700} fill={WD_LIT}>{tx(["Day", "Month", "Year"][t])}</text>
              </g>
            ) : null}
            {stage === "demo" && stepOn && /^warm-/.test(stepOn) ? <Hit id={"warm-" + WD_PART[t]} x={r.x} y={r.y} w={r.w} h={r.h} onPress={() => warmTap(t)} label={tiles[t]} /> : null}
          </g>
        );
      })}
      {k === "place" && dragging && tiles[dragging.payload] !== undefined && (() => {
        const w = tileW(tiles[dragging.payload]);
        return <g pointerEvents="none">{drawTile(dragging.payload, { x: dragging.x - w / 2, y: dragging.y - 36, w, h: 72 }, false, true)}</g>;
      })()}
      {/* an empty box takes the selected tile on a tap (a box that holds a tile: the tile is the control) */}
      {k === "place" && !won && !S.tr && bs.map((b: any, j: number) => (inBox(j) < 0 ? (
        <Hit key={"bx" + j} id={"box-" + WD_PART[j]} x={b.x} y={b.y} w={b.w} h={b.h} onPress={() => boxTap(j)} label={["Day", "Month", "Year"][j] + " box"} />
      ) : null))}

      {/* free play: the Day and Year boxes borrow the keypad */}
      {free && [0, 2].map((j) => (
        <Hit key={"fp" + j} id={j === 0 ? "fp-day" : "fp-year"} x={bs[j].x} y={bs[j].y} w={bs[j].w} h={bs[j].h}
          onPress={() => fpOpen(j === 0 ? "d" : "y")} label={j === 0 ? "Day box" : "Year box"} enabled={!(captured && S.cap === (j === 0 ? "d" : "y"))} />
      ))}

      {/* the one invite: on the control the guide step waits for */}
      {stage === "demo" && stepOn && /^month-\d+$/.test(stepOn) && !S.wm && (() => { const r = wdTile(Number(stepOn.slice(6))); return <Invite x={r.x + r.w / 2} y={r.y + r.h / 2} w={r.w} h={r.h} rx={12} C={C} />; })()}
      {stage === "demo" && stepOn === "toggle" && <Invite x={G.toggle.x + G.toggle.w / 2} y={G.toggle.y + G.toggle.h / 2} w={G.toggle.w} h={G.toggle.h} rx={G.toggle.h / 2} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: the date both ways (r24: `it` is the item) */
function Thumb({ result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  const item = it || (last && last.it);
  if (!item || !item.m) return null;
  if (item.kind !== "nums") {
    /* phases 1 and 2: the date with its month in words (through TR), on two lines */
    const l1 = `${item.d} ${tx(WD_MONTHS[item.m - 1])}`, l2 = String(item.y);
    return (
      <g>
        <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
        <text x={w / 2} y={h / 2 - 4} textAnchor="middle" fontSize={wdFit(l1, w - 44, 34)} fontWeight={700} fill={WD_GREEN_INK}>{l1}</text>
        <text x={w / 2} y={h / 2 + 30} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={WD_GREEN_INK}>{l2}</text>
      </g>
    );
  }
  /* phase 3: DD | MM | YYYY in three small boxes */
  const vals = [wdPad(item.d), wdPad(item.m), String(item.y)], gap = 16, ws = [50, 50, 82], bh = Math.min(52, h - 20);   /* 182 + 32 = 214: 11 clear of the plate each side */
  let x = (w - (ws[0] + ws[1] + ws[2] + 2 * gap)) / 2;
  const cells = ws.map((cw) => { const c = { x, w: cw }; x += cw + gap; return c; });
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {cells.map((c, j) => (
        <g key={j}>
          <rect x={c.x} y={(h - bh) / 2} width={c.w} height={bh} rx={8} fill="#FFFFFF" stroke={WD_GREEN} strokeWidth={3} />
          <text x={c.x + c.w / 2} y={h / 2 + 10} textAnchor="middle" fontSize={wdFit(vals[j], c.w - 10, T.label)} fontWeight={700} fill={WD_GREEN_INK}>{vals[j]}</text>
          {j < 2 ? <rect x={c.x + c.w + gap / 2 - 4} y={h / 2 - 3} width={8} height={6} rx={3} fill={WD_INK} /> : null}
        </g>
      ))}
    </g>
  );
}

function WriteTheDate(props: any) {
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
         delete it) when the picture needs the full 1086 width: `check`'s board-fit names what runs under the panel.
         OFF here: the card, the three boxes AND the month ladder (2 x 6 tiles of a full month name and its number) must all stay in
         view while the child types DD-MM-YYYY, which needs the standard open width (1086). */
      bigPad: false,
      /* ANSWERING ON THE CARD (PATTERNS.md 9e): a phase-2 or phase-3 question is answered in the three date boxes under the card
         (parts with `at`: Day, Month, Year); the drawer holds only the keypad */
      cardAnswer: true,
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

export default WriteTheDate;
