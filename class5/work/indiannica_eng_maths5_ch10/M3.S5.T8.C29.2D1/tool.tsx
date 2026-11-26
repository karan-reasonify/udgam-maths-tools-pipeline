/* ═══ M3.S5.T8.C29.2D1 · month_calendar · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists. THE LESSON IS SILENT (runtime r30): every line is printed on the bubble.
   THE NEW LOOK (keyOnly, navDots): the question lives only in the bubble; every act is performed on screen (api.act).
   Phase 1 counts rows of a week and sorts the twelve month cards; phase 2 reads a year's February; phase 3 jumps
   down a column of a month's calendar (7 days a jump); phase 4 cuts the whole weeks off a month and carries on.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "month_calendar";
const MEDIA_ID = "M3.S5.T8.C29.2D1";
const TOOL_NAME = "Month Calendar";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

const OPENING = ["A month calendar, with seven columns waiting for dates."];
const FINISH_LINE = "You built a calendar, found a leap year and carried the days on.";
const FREE_LINE = "Free play. Change the days and the first day, then cut the weeks and jump on.";

const START_HOOK = "Why does a new month usually begin on a different day of the week?";

/* the chapter's content colours: Given deep blue, Answer green, the one being worked on amber, a Jump violet */
const MC_BLUE = "#0072B2", MC_GREEN = "#009E73", MC_AMBER = "#E69F00", MC_VIOLET = "#7B52AB";
const MC_INK = "#2B2B2B";
const MC_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MC_DAY_FULL = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MC_DAY_IDS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const MC_MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/* the days of each month in an ordinary year (February 28, or 29 in a leap year) */
const MC_MLEN = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const MC_DAY_CHOICES = MC_DAY_IDS.map((id, k) => ({ id, label: MC_DAY_FULL[k] }));

function StartArt({ box, C, lang, tx }: any) {
  /* a wall calendar page: rings, a header of day names, blank dates, one blue date and a violet jump down its column */
  const pw = 640, x0 = (box.w - pw) / 2, cw = pw / 7, top = 70, ch = 46;
  return (
    <g>
      <defs>
        <linearGradient id="mcStartRingGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5A6068" />
          <stop offset="50%" stopColor="#A0A5AC" />
          <stop offset="100%" stopColor="#3F444C" />
        </linearGradient>
        <linearGradient id="mcStartHeaderGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F6ECDF" />
          <stop offset="100%" stopColor="#E5D6BD" />
        </linearGradient>
      </defs>
      <rect x={x0 - 16} y={8} width={pw + 32} height={box.h - 16} rx={22} fill="#FFFFFF" stroke={MC_INK} strokeWidth={3} filter="url(#fShadowSoft)" />
      {[0, 1, 2, 3, 4, 5].map((k) => <rect key={"r" + k} x={x0 + 40 + k * ((pw - 80) / 5) - 7} y={-4} width={14} height={30} rx={7} fill="url(#mcStartRingGrad)" stroke="#2B2B2B" strokeWidth={1.5} />)}
      {MC_DAYS.map((d, c) => (
        <g key={d}>
          <rect x={x0 + c * cw} y={top - 44} width={cw} height={44} fill={c === 1 ? tint(MC_AMBER, 0.55) : "url(#mcStartHeaderGrad)"} stroke={MC_INK} strokeWidth={2} />
          <text x={x0 + c * cw + cw / 2} y={top - 14} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={MC_INK}>{tx(d)}</text>
        </g>
      ))}
      {Array.from({ length: 35 }).map((_, k) => {
        const r = Math.floor(k / 7), c = k % 7;
        return <rect key={k} x={x0 + c * cw} y={top + r * ch} width={cw} height={ch} fill={k === 1 ? MC_BLUE : "#FFFFFF"} stroke={MC_INK} strokeWidth={2} />;
      })}
      {[0, 1, 2].map((k) => (
        <path key={"j" + k} d={`M ${x0 + 1.5 * cw + 18} ${top + k * ch + ch / 2} q 30 ${ch / 2} 0 ${ch}`} fill="none" stroke={MC_VIOLET} strokeWidth={5} strokeLinecap="round" />
      ))}
    </g>
  );
}

/* Hindi and Gujarati, keyed by the English byte for byte (numerals stay Latin; the grader compares the canonical English ids) */
const TR: any = {
  hi: {
    "Count row": "पंक्ति गिनो",
    "Sort": "छाँटो",
    "Jump 7 days down": "7 दिन नीचे कूदो",
    "Days": "दिन",
    "First day": "पहला दिन",
    "Tap a card and the hand carries it to its lane; how many months have 31 days?": "कार्ड टैप करो, हाथ उसे उसकी पंक्ति में ले जाता है; कितने महीनों में 31 दिन हैं?",
    "Whole weeks never move the day, so only the days left over decide it.": "पूरे सप्ताह दिन नहीं बदलते, इसलिए बचे दिन ही उसे तय करते हैं।",
    "You do not need all 31 days, only the ones left over.": "सारे 31 दिन नहीं चाहिए, सिर्फ़ बचे हुए।",
    "Tap each blue row to count it first.": "पहले हर नीली पंक्ति टैप करके गिनो।",
    "Count each row with a tap first.": "पहले हर पंक्ति को टैप करके गिनो।",
    "Tap the month cards until all 12 are sorted.": "सारे 12 कार्ड छँटने तक महीनों के कार्ड टैप करो।",
    "Tap 2044 on the strip first.": "पहले पट्टी पर 2044 टैप करो।",
    "Tap Add 29 Feb first.": "पहले 29 फ़रवरी जोड़ो पर टैप करो।",
    "Drag the Jump down the Tuesday column first.": "पहले कूद को मंगलवार के स्तंभ में नीचे खींचो।",
    "Drag the Jump down one row first.": "पहले कूद को एक पंक्ति नीचे खींचो।",
    "Drag the Jump down the Sunday column first.": "पहले कूद को रविवार के स्तंभ में नीचे खींचो।",
    "Tap Weeks, then Jump.": "सप्ताह टैप करो, फिर कूद।",
    "Cut the weeks, then jump the days left.": "सप्ताह काटो, फिर बचे दिन कूदो।",
    "Use Weeks, then Jump, on this month first.": "पहले इस महीने पर सप्ताह, फिर कूद लगाओ।",
    "Answer": "उत्तर",
    "Month Calendar": "महीने का कैलेंडर",
    "Weeks, fortnights and months": "सप्ताह, पखवाड़े और महीने",
    "Leap years": "लीप वर्ष",
    "Reading a month's calendar": "महीने का कैलेंडर पढ़ना",
    "Into the next month": "अगले महीने में",
    "A month calendar, with seven columns waiting for dates.": "महीने का कैलेंडर, जिसके सात स्तंभ तारीखों की राह देख रहे हैं।",
    "Free play. Change the days and the first day, then cut the weeks and jump on.": "मुक्त खेल। दिन और पहला दिन बदलो, फिर सप्ताह काटो और आगे कूदो।",
    "You built a calendar, found a leap year and carried the days on.": "तुमने कैलेंडर बनाया, लीप वर्ष ढूँढा और दिन आगे बढ़ाए।",
    "Why does a new month usually begin on a different day of the week?": "नया महीना अक्सर सप्ताह के अलग दिन से क्यों शुरू होता है?",
    "Count along the row of a week, then sort the month cards.": "एक सप्ताह की पंक्ति गिनो, फिर महीनों के कार्ड छाँटो।",
    "Look at the February of a year and count its cells.": "किसी वर्ष की फ़रवरी देखो और उसके खाने गिनो।",
    "Dates down one column of a calendar are a week apart.": "कैलेंडर के एक स्तंभ में नीचे की तारीखें एक सप्ताह के अंतर पर हैं।",
    "Cut off the whole weeks and carry the days that are left.": "पूरे सप्ताह काटो और बचे दिन आगे ले जाओ।",
    "Tap the first blue row to count the days of one week.": "एक सप्ताह के दिन गिनने के लिए पहली नीली पंक्ति पर टैप करो।",
    "Tap anywhere on the top blue row.": "ऊपर की नीली पंक्ति पर कहीं भी टैप करो।",
    "Two weeks make a fortnight, so tap the other row too.": "दो सप्ताह का एक पखवाड़ा होता है, तो दूसरी पंक्ति भी टैप करो।",
    "Tap the other blue row.": "दूसरी नीली पंक्ति पर टैप करो।",
    "Tap 2026 on the strip to read its February.": "पट्टी पर 2026 टैप करो और उसकी फ़रवरी पढ़ो।",
    "Find 2026 on the year strip.": "वर्षों की पट्टी पर 2026 ढूँढो।",
    "Now tap 2028 and see its February.": "अब 2028 टैप करो और उसकी फ़रवरी देखो।",
    "Find 2028 on the year strip.": "वर्षों की पट्टी पर 2028 ढूँढो।",
    "Drag the Jump down the column to the date 7 days on.": "कूद को स्तंभ में नीचे 7 दिन बाद की तारीख तक खींचो।",
    "Drag the violet Jump down one row.": "बैंगनी कूद को एक पंक्ति नीचे खींचो।",
    "Now jump again to the next row down.": "अब फिर से नीचे की अगली पंक्ति में कूदो।",
    "Tap or drag the violet Jump again.": "बैंगनी कूद को फिर टैप करो या खींचो।",
    "Tap Weeks to cut the whole weeks off this month.": "इस महीने से पूरे सप्ताह काटने के लिए सप्ताह पर टैप करो।",
    "Tap the Weeks key.": "सप्ताह बटन पर टैप करो।",
    "Now tap Jump to hop over the days that are left.": "अब बचे दिनों पर कूदने के लिए कूद पर टैप करो।",
    "Tap the Jump key.": "कूद बटन पर टैप करो।",
    "Each full row is one whole week.": "हर पूरी पंक्ति एक पूरा सप्ताह है।",
    "Add the numbers written at the end of the rows.": "पंक्तियों के अंत में लिखी संख्याएँ जोड़ो।",
    "Read the number written at the end of each row.": "हर पंक्ति के अंत में लिखी संख्या पढ़ो।",
    "Add the fortnight's two counts, then the 3 more days.": "पखवाड़े की दोनों गिनतियाँ जोड़ो, फिर 3 और दिन।",
    "Three rows means three weeks of the same count.": "तीन पंक्तियाँ यानी एक जैसी गिनती के तीन सप्ताह।",
    "Add the same row count three times over.": "पंक्ति की वही गिनती तीन बार जोड़ो।",
    "Point at each card in the top row as you count.": "गिनते समय ऊपर की पंक्ति के हर कार्ड पर उँगली रखो।",
    "The 30 days row has 4 cards, and February sits alone.": "30 दिन वाली पंक्ति में 4 कार्ड हैं, और फ़रवरी अकेली है।",
    "A leap year's February has a 29th day.": "लीप वर्ष की फ़रवरी में 29वाँ दिन होता है।",
    "Add 1 day to an ordinary year for a leap year.": "लीप वर्ष के लिए साधारण वर्ष में 1 दिन जोड़ो।",
    "Leap years come every fourth year, like 2044 and 2048.": "लीप वर्ष हर चौथे वर्ष आता है, जैसे 2044 और 2048।",
    "After 2048 the next leap year is 4 years on, not 2.": "2048 के बाद अगला लीप वर्ष 4 वर्ष बाद है, 2 नहीं।",
    "Each jump down the column adds 7 to the date.": "स्तंभ में नीचे हर कूद तारीख में 7 जोड़ती है।",
    "Start from the blue date and add 7 for each jump you made.": "नीली तारीख से शुरू करो और हर कूद के लिए 7 जोड़ो।",
    "15 August is a Sunday, so count on from there.": "15 अगस्त रविवार है, तो वहाँ से आगे गिनो।",
    "Count 16, 17, 18 and 19 along the row from Sunday.": "रविवार से पंक्ति में 16, 17, 18 और 19 गिनो।",
    "28 days is 4 whole weeks, so look at the days after them.": "28 दिन यानी 4 पूरे सप्ताह, तो उनके बाद के दिन देखो।",
    "The next month begins on the day after the last day you jumped.": "अगला महीना उस दिन के बाद शुरू होता है जिस पर तुम आख़िर में कूदे।",
    "A week is 7 days, a fortnight 14, and February has 28 or 29 days.": "सप्ताह में 7 दिन, पखवाड़े में 14, और फ़रवरी में 28 या 29 दिन होते हैं।",
    "Every fourth year from 2000 to 2099 is a leap year with a 29 February.": "2000 से 2099 तक हर चौथा वर्ष 29 फ़रवरी वाला लीप वर्ष है।",
    "Each column is one day of the week, so dates down a column are 7 apart.": "हर स्तंभ सप्ताह का एक दिन है, इसलिए स्तंभ की तारीखें 7 के अंतर पर हैं।",
    "You learned: 7 days a week, 14 a fortnight, months of 28 to 31 days.": "तुमने सीखा: सप्ताह में 7 दिन, पखवाड़े में 14, महीने में 28 से 31 दिन।",
    "You learned: a leap year has 366 days, every fourth year from 2000.": "तुमने सीखा: लीप वर्ष में 366 दिन, 2000 से हर चौथे वर्ष।",
    "You learned: dates down one column of a calendar are 7 apart.": "तुमने सीखा: कैलेंडर के एक स्तंभ की तारीखें 7 के अंतर पर हैं।",
    "You learned: 31 days is 4 weeks 3 days, so the next month moves on 3.": "तुमने सीखा: 31 दिन यानी 4 सप्ताह 3 दिन, अगला महीना 3 दिन आगे।",
    "Count the rows: how many days make a fortnight and 3 more days?": "पंक्तियाँ गिनो: एक पखवाड़ा और 3 दिन मिलकर कितने दिन होते हैं?",
    "Fortnight and 3 days?": "पखवाड़ा और 3 दिन?",
    "Add the two full rows, then the 3 days in the last row.": "दोनों पूरी पंक्तियाँ जोड़ो, फिर आख़िरी पंक्ति के 3 दिन।",
    "Yes, 7 + 7 + 3 makes 17 days.": "हाँ, 7 + 7 + 3 से 17 दिन होते हैं।",
    "Count the rows again: how many days make 3 weeks?": "फिर पंक्तियाँ गिनो: 3 सप्ताह में कितने दिन होते हैं?",
    "Days in 3 weeks?": "3 सप्ताह में दिन?",
    "Count every row, and each row is a week.": "हर पंक्ति गिनो, हर पंक्ति एक सप्ताह है।",
    "Yes, 3 weeks make 21 days.": "हाँ, 3 सप्ताह में 21 दिन होते हैं।",
    "Months of 31 days?": "31 दिन वाले महीने?",
    "Count the cards in the 31 days row.": "31 दिन वाली पंक्ति के कार्ड गिनो।",
    "Yes, 7 months have 31 days, and February has 28 or 29.": "हाँ, 7 महीनों में 31 दिन हैं, और फ़रवरी में 28 या 29।",
    "Tap 2044 on the strip, then find how many days the year 2044 has.": "पट्टी पर 2044 टैप करो, फिर बताओ वर्ष 2044 में कितने दिन हैं।",
    "Days in 2044?": "2044 में दिन?",
    "Read the February of 2044 on the card.": "कार्ड पर 2044 की फ़रवरी पढ़ो।",
    "Yes, 2044 gets 29 February, so it has 366 days.": "हाँ, 2044 में 29 फ़रवरी है, इसलिए उसमें 366 दिन हैं।",
    "Tap Add 29 Feb, then type how many days a year and a leap year have.": "29 फ़रवरी जोड़ो पर टैप करो, फिर वर्ष और लीप वर्ष के दिन लिखो।",
    "A year, a leap year?": "वर्ष, लीप वर्ष?",
    "Count the cells on the February card you just made.": "अभी बने फ़रवरी कार्ड के खाने गिनो।",
    "Yes, 365 days, and one more day in a leap year.": "हाँ, 365 दिन, और लीप वर्ष में एक दिन ज़्यादा।",
    "Between 2000 and 2099, is 2050 a leap year?": "2000 और 2099 के बीच, क्या 2050 लीप वर्ष है?",
    "Is 2050 a leap year?": "क्या 2050 लीप वर्ष है?",
    "Count on in fours from 2044 along the strip.": "पट्टी पर 2044 से चार-चार आगे गिनो।",
    "Right, 2050 has an ordinary February of 28 days.": "सही, 2050 में 28 दिन की साधारण फ़रवरी है।",
    "1 September 2026 is a Tuesday, so on which dates are the Tuesdays of that month?": "1 सितंबर 2026 मंगलवार है, तो उस महीने के मंगलवार किन तारीखों को हैं?",
    "Tuesdays of September?": "सितंबर के मंगलवार?",
    "The Tuesdays all sit in one column, not along a row.": "सारे मंगलवार एक स्तंभ में हैं, पंक्ति में नहीं।",
    "Yes, the Tuesdays are 1, 8, 15, 22 and 29 September.": "हाँ, मंगलवार 1, 8, 15, 22 और 29 सितंबर को हैं।",
    "12 is under Wednesday, so which date is under Wednesday in the next row?": "12 बुधवार के नीचे है, तो अगली पंक्ति में बुधवार के नीचे कौन-सी तारीख है?",
    "Next Wednesday?": "अगला बुधवार?",
    "The next row down is one week later.": "नीचे की अगली पंक्ति एक सप्ताह बाद है।",
    "Yes, 12 + 7 = 19.": "हाँ, 12 + 7 = 19।",
    "1 August 2027 is a Sunday, so which day of the week is 19 August 2027?": "1 अगस्त 2027 रविवार है, तो 19 अगस्त 2027 सप्ताह का कौन-सा दिन है?",
    "19 August 2027?": "19 अगस्त 2027?",
    "Jump down to the Sunday just before the 19th, then count along.": "19 से ठीक पहले वाले रविवार तक नीचे कूदो, फिर आगे गिनो।",
    "Yes, 19 August 2027 is a Thursday.": "हाँ, 19 अगस्त 2027 गुरुवार है।",
    "January 2027 starts on a Friday with 31 days, so which day starts February?": "31 दिन की जनवरी 2027 शुक्रवार से शुरू है, तो फ़रवरी किस दिन शुरू होगी?",
    "February 2027 begins?": "फ़रवरी 2027 की शुरुआत?",
    "Yes, February 2027 begins on a Monday.": "हाँ, फ़रवरी 2027 सोमवार से शुरू होती है।",
    "A 31 day month starts on a Monday, so on which day does the next month start?": "31 दिन का महीना सोमवार से शुरू है, तो अगला महीना किस दिन शुरू होगा?",
    "Next month begins?": "अगले महीने की शुरुआत?",
    "Start on Monday and move on one day for each day left.": "सोमवार से शुरू करो और हर बचे दिन के लिए एक दिन आगे बढ़ो।",
    "Yes, the next month begins on a Thursday.": "हाँ, अगला महीना गुरुवार से शुरू होता है।",
    "February 2028 starts on a Tuesday with 29 days, so which day starts March?": "29 दिन की फ़रवरी 2028 मंगलवार से शुरू है, तो मार्च किस दिन शुरू होगा?",
    "March 2028 begins?": "मार्च 2028 की शुरुआत?",
    "29 days is 4 weeks and 1 day.": "29 दिन यानी 4 सप्ताह और 1 दिन।",
    "Yes, March 2028 begins on a Wednesday.": "हाँ, मार्च 2028 बुधवार से शुरू होता है।",
    "1st": "पहला",
    "2nd": "दूसरा",
    "3rd": "तीसरा",
    "4th": "चौथा",
    "5th": "पाँचवाँ",
    "year": "वर्ष",
    "leap year": "लीप वर्ष",
    "days": "दिन",
    "Yes": "हाँ",
    "No": "नहीं",
    "September 2026": "सितंबर 2026",
    "October 2026": "अक्टूबर 2026",
    "August 2026": "अगस्त 2026",
    "August 2027": "अगस्त 2027",
    "January 2027": "जनवरी 2027",
    "February 2028": "फ़रवरी 2028",
    "30 days": "30 दिन",
    "31 days": "31 दिन",
    "28 or 29": "28 या 29",
    "Mon": "सोम",
    "Tue": "मंगल",
    "Wed": "बुध",
    "Thu": "गुरु",
    "Fri": "शुक्र",
    "Sat": "शनि",
    "Sun": "रवि",
    "Monday": "सोमवार",
    "Tuesday": "मंगलवार",
    "Wednesday": "बुधवार",
    "Thursday": "गुरुवार",
    "Friday": "शुक्रवार",
    "Saturday": "शनिवार",
    "Sunday": "रविवार",
    "Jan": "जन॰",
    "Feb": "फ़र॰",
    "Mar": "मार्च",
    "Apr": "अप्रैल",
    "May": "मई",
    "Jun": "जून",
    "Jul": "जुला॰",
    "Aug": "अग॰",
    "Sep": "सित॰",
    "Oct": "अक्टू॰",
    "Nov": "नव॰",
    "Dec": "दिस॰",
    "February": "फ़रवरी",
    "100 years": "100 वर्ष",
    "1 century": "1 शताब्दी",
    "Add 29 Feb": "29 फ़रवरी जोड़ो",
    "Not a leap year": "लीप वर्ष नहीं",
    "Year": "वर्ष",
    "Leap year": "लीप वर्ष",
    "months": "महीने",
    "Given": "ज्ञात",
    "Jump": "कूद",
    "Weeks": "सप्ताह",
    "Left over": "बचे दिन",
    "Day 1": "दिन 1",
    "Next month": "अगला महीना",
  },
  gu: {
    "Count row": "હરોળ ગણો",
    "Sort": "ગોઠવો",
    "Jump 7 days down": "7 દિવસ નીચે કૂદો",
    "Days": "દિવસ",
    "First day": "પહેલો દિવસ",
    "Tap a card and the hand carries it to its lane; how many months have 31 days?": "કાર્ડ ટૅપ કરો, હાથ તેને તેની હરોળમાં લઈ જાય; કેટલા મહિનામાં 31 દિવસ છે?",
    "Whole weeks never move the day, so only the days left over decide it.": "પૂરાં અઠવાડિયાં દિવસ બદલતાં નથી, તેથી બાકી દિવસો જ તે નક્કી કરે.",
    "You do not need all 31 days, only the ones left over.": "બધા 31 દિવસ નહીં, ફક્ત બાકી રહેલા જોઈએ.",
    "Tap each blue row to count it first.": "પહેલાં દરેક વાદળી હરોળ ટૅપ કરી ગણો.",
    "Count each row with a tap first.": "પહેલાં દરેક હરોળ ટૅપથી ગણો.",
    "Tap the month cards until all 12 are sorted.": "બધાં 12 કાર્ડ ગોઠવાય ત્યાં સુધી મહિનાનાં કાર્ડ ટૅપ કરો.",
    "Tap 2044 on the strip first.": "પહેલાં પટ્ટી પર 2044 ટૅપ કરો.",
    "Tap Add 29 Feb first.": "પહેલાં 29 ફેબ્રુ ઉમેરો પર ટૅપ કરો.",
    "Drag the Jump down the Tuesday column first.": "પહેલાં કૂદને મંગળવારના સ્તંભમાં નીચે ખેંચો.",
    "Drag the Jump down one row first.": "પહેલાં કૂદને એક હરોળ નીચે ખેંચો.",
    "Drag the Jump down the Sunday column first.": "પહેલાં કૂદને રવિવારના સ્તંભમાં નીચે ખેંચો.",
    "Tap Weeks, then Jump.": "અઠવાડિયાં ટૅપ કરો, પછી કૂદ.",
    "Cut the weeks, then jump the days left.": "અઠવાડિયાં કાપો, પછી બાકી દિવસ કૂદો.",
    "Use Weeks, then Jump, on this month first.": "પહેલાં આ મહિના પર અઠવાડિયાં, પછી કૂદ વાપરો.",
    "Answer": "જવાબ",
    "Month Calendar": "મહિનાનું કૅલેન્ડર",
    "Weeks, fortnights and months": "અઠવાડિયાં, પખવાડિયાં અને મહિના",
    "Leap years": "લીપ વર્ષ",
    "Reading a month's calendar": "મહિનાનું કૅલેન્ડર વાંચવું",
    "Into the next month": "આવતા મહિનામાં",
    "A month calendar, with seven columns waiting for dates.": "મહિનાનું કૅલેન્ડર, જેના સાત સ્તંભ તારીખોની રાહ જુએ છે.",
    "Free play. Change the days and the first day, then cut the weeks and jump on.": "મુક્ત રમત. દિવસો અને પહેલો દિવસ બદલો, પછી અઠવાડિયાં કાપો અને આગળ કૂદો.",
    "You built a calendar, found a leap year and carried the days on.": "તમે કૅલેન્ડર બનાવ્યું, લીપ વર્ષ શોધ્યું અને દિવસો આગળ લઈ ગયા.",
    "Why does a new month usually begin on a different day of the week?": "નવો મહિનો ઘણી વાર અઠવાડિયાના જુદા દિવસે કેમ શરૂ થાય છે?",
    "Count along the row of a week, then sort the month cards.": "એક અઠવાડિયાની હરોળ ગણો, પછી મહિનાનાં કાર્ડ ગોઠવો.",
    "Look at the February of a year and count its cells.": "કોઈ વર્ષનો ફેબ્રુઆરી જુઓ અને તેનાં ખાનાં ગણો.",
    "Dates down one column of a calendar are a week apart.": "કૅલેન્ડરના એક સ્તંભમાં નીચેની તારીખો એક અઠવાડિયાના અંતરે છે.",
    "Cut off the whole weeks and carry the days that are left.": "પૂરાં અઠવાડિયાં કાપો અને બાકી દિવસો આગળ લઈ જાઓ.",
    "Tap the first blue row to count the days of one week.": "એક અઠવાડિયાના દિવસો ગણવા પહેલી વાદળી હરોળ પર ટૅપ કરો.",
    "Tap anywhere on the top blue row.": "ઉપરની વાદળી હરોળ પર ક્યાંય પણ ટૅપ કરો.",
    "Two weeks make a fortnight, so tap the other row too.": "બે અઠવાડિયાંનું એક પખવાડિયું થાય, તો બીજી હરોળ પણ ટૅપ કરો.",
    "Tap the other blue row.": "બીજી વાદળી હરોળ પર ટૅપ કરો.",
    "Tap 2026 on the strip to read its February.": "પટ્ટી પર 2026 ટૅપ કરો અને તેનો ફેબ્રુઆરી વાંચો.",
    "Find 2026 on the year strip.": "વર્ષોની પટ્ટી પર 2026 શોધો.",
    "Now tap 2028 and see its February.": "હવે 2028 ટૅપ કરો અને તેનો ફેબ્રુઆરી જુઓ.",
    "Find 2028 on the year strip.": "વર્ષોની પટ્ટી પર 2028 શોધો.",
    "Drag the Jump down the column to the date 7 days on.": "કૂદને સ્તંભમાં નીચે 7 દિવસ પછીની તારીખ સુધી ખેંચો.",
    "Drag the violet Jump down one row.": "જાંબલી કૂદને એક હરોળ નીચે ખેંચો.",
    "Now jump again to the next row down.": "હવે ફરી નીચેની હરોળમાં કૂદો.",
    "Tap or drag the violet Jump again.": "જાંબલી કૂદને ફરી ટૅપ કરો અથવા ખેંચો.",
    "Tap Weeks to cut the whole weeks off this month.": "આ મહિનામાંથી પૂરાં અઠવાડિયાં કાપવા અઠવાડિયાં પર ટૅપ કરો.",
    "Tap the Weeks key.": "અઠવાડિયાં બટન પર ટૅપ કરો.",
    "Now tap Jump to hop over the days that are left.": "હવે બાકી દિવસો પર કૂદવા કૂદ પર ટૅપ કરો.",
    "Tap the Jump key.": "કૂદ બટન પર ટૅપ કરો.",
    "Each full row is one whole week.": "દરેક પૂરી હરોળ એક આખું અઠવાડિયું છે.",
    "Add the numbers written at the end of the rows.": "હરોળના છેડે લખેલી સંખ્યાઓ ઉમેરો.",
    "Read the number written at the end of each row.": "દરેક હરોળના છેડે લખેલી સંખ્યા વાંચો.",
    "Add the fortnight's two counts, then the 3 more days.": "પખવાડિયાની બંને ગણતરી ઉમેરો, પછી 3 વધુ દિવસ.",
    "Three rows means three weeks of the same count.": "ત્રણ હરોળ એટલે સરખી ગણતરીનાં ત્રણ અઠવાડિયાં.",
    "Add the same row count three times over.": "હરોળની એ જ ગણતરી ત્રણ વાર ઉમેરો.",
    "Point at each card in the top row as you count.": "ગણતી વખતે ઉપરની હરોળના દરેક કાર્ડ પર આંગળી મૂકો.",
    "The 30 days row has 4 cards, and February sits alone.": "30 દિવસની હરોળમાં 4 કાર્ડ છે, અને ફેબ્રુઆરી એકલો છે.",
    "A leap year's February has a 29th day.": "લીપ વર્ષના ફેબ્રુઆરીમાં 29મો દિવસ હોય છે.",
    "Add 1 day to an ordinary year for a leap year.": "લીપ વર્ષ માટે સાદા વર્ષમાં 1 દિવસ ઉમેરો.",
    "Leap years come every fourth year, like 2044 and 2048.": "લીપ વર્ષ દર ચોથા વર્ષે આવે છે, જેમ કે 2044 અને 2048.",
    "After 2048 the next leap year is 4 years on, not 2.": "2048 પછી આવતું લીપ વર્ષ 4 વર્ષ પછી છે, 2 નહીં.",
    "Each jump down the column adds 7 to the date.": "સ્તંભમાં નીચે દરેક કૂદ તારીખમાં 7 ઉમેરે છે.",
    "Start from the blue date and add 7 for each jump you made.": "વાદળી તારીખથી શરૂ કરો અને દરેક કૂદ માટે 7 ઉમેરો.",
    "15 August is a Sunday, so count on from there.": "15 ઑગસ્ટ રવિવાર છે, તો ત્યાંથી આગળ ગણો.",
    "Count 16, 17, 18 and 19 along the row from Sunday.": "રવિવારથી હરોળમાં 16, 17, 18 અને 19 ગણો.",
    "28 days is 4 whole weeks, so look at the days after them.": "28 દિવસ એટલે 4 પૂરાં અઠવાડિયાં, તો તે પછીના દિવસો જુઓ.",
    "The next month begins on the day after the last day you jumped.": "આવતો મહિનો તમે છેલ્લે કૂદ્યા તે દિવસ પછી શરૂ થાય છે.",
    "A week is 7 days, a fortnight 14, and February has 28 or 29 days.": "અઠવાડિયામાં 7 દિવસ, પખવાડિયામાં 14, અને ફેબ્રુઆરીમાં 28 કે 29 દિવસ હોય છે.",
    "Every fourth year from 2000 to 2099 is a leap year with a 29 February.": "2000 થી 2099 સુધી દર ચોથું વર્ષ 29 ફેબ્રુઆરીવાળું લીપ વર્ષ છે.",
    "Each column is one day of the week, so dates down a column are 7 apart.": "દરેક સ્તંભ અઠવાડિયાનો એક દિવસ છે, તેથી સ્તંભની તારીખો 7ના અંતરે છે.",
    "You learned: 7 days a week, 14 a fortnight, months of 28 to 31 days.": "તમે શીખ્યા: અઠવાડિયે 7 દિવસ, પખવાડિયે 14, મહિને 28 થી 31 દિવસ.",
    "You learned: a leap year has 366 days, every fourth year from 2000.": "તમે શીખ્યા: લીપ વર્ષમાં 366 દિવસ, 2000 થી દર ચોથે વર્ષે.",
    "You learned: dates down one column of a calendar are 7 apart.": "તમે શીખ્યા: કૅલેન્ડરના એક સ્તંભની તારીખો 7ના અંતરે છે.",
    "You learned: 31 days is 4 weeks 3 days, so the next month moves on 3.": "તમે શીખ્યા: 31 દિવસ એટલે 4 અઠવાડિયાં 3 દિવસ, આવતો મહિનો 3 દિવસ આગળ.",
    "Count the rows: how many days make a fortnight and 3 more days?": "હરોળ ગણો: એક પખવાડિયું અને 3 દિવસ મળીને કેટલા દિવસ થાય?",
    "Fortnight and 3 days?": "પખવાડિયું અને 3 દિવસ?",
    "Add the two full rows, then the 3 days in the last row.": "બંને પૂરી હરોળ ઉમેરો, પછી છેલ્લી હરોળના 3 દિવસ.",
    "Yes, 7 + 7 + 3 makes 17 days.": "હા, 7 + 7 + 3 થી 17 દિવસ થાય છે.",
    "Count the rows again: how many days make 3 weeks?": "ફરી હરોળ ગણો: 3 અઠવાડિયામાં કેટલા દિવસ થાય?",
    "Days in 3 weeks?": "3 અઠવાડિયામાં દિવસ?",
    "Count every row, and each row is a week.": "દરેક હરોળ ગણો, દરેક હરોળ એક અઠવાડિયું છે.",
    "Yes, 3 weeks make 21 days.": "હા, 3 અઠવાડિયામાં 21 દિવસ થાય છે.",
    "Months of 31 days?": "31 દિવસવાળા મહિના?",
    "Count the cards in the 31 days row.": "31 દિવસની હરોળનાં કાર્ડ ગણો.",
    "Yes, 7 months have 31 days, and February has 28 or 29.": "હા, 7 મહિનામાં 31 દિવસ છે, અને ફેબ્રુઆરીમાં 28 કે 29.",
    "Tap 2044 on the strip, then find how many days the year 2044 has.": "પટ્ટી પર 2044 ટૅપ કરો, પછી શોધો વર્ષ 2044માં કેટલા દિવસ છે.",
    "Days in 2044?": "2044માં દિવસ?",
    "Read the February of 2044 on the card.": "કાર્ડ પર 2044નો ફેબ્રુઆરી વાંચો.",
    "Yes, 2044 gets 29 February, so it has 366 days.": "હા, 2044માં 29 ફેબ્રુઆરી છે, તેથી તેમાં 366 દિવસ છે.",
    "Tap Add 29 Feb, then type how many days a year and a leap year have.": "29 ફેબ્રુ ઉમેરો પર ટૅપ કરો, પછી વર્ષ અને લીપ વર્ષના દિવસ લખો.",
    "A year, a leap year?": "વર્ષ, લીપ વર્ષ?",
    "Count the cells on the February card you just made.": "હમણાં બનેલા ફેબ્રુઆરી કાર્ડનાં ખાનાં ગણો.",
    "Yes, 365 days, and one more day in a leap year.": "હા, 365 દિવસ, અને લીપ વર્ષમાં એક દિવસ વધુ.",
    "Between 2000 and 2099, is 2050 a leap year?": "2000 અને 2099 વચ્ચે, શું 2050 લીપ વર્ષ છે?",
    "Is 2050 a leap year?": "શું 2050 લીપ વર્ષ છે?",
    "Count on in fours from 2044 along the strip.": "પટ્ટી પર 2044 થી ચાર-ચાર આગળ ગણો.",
    "Right, 2050 has an ordinary February of 28 days.": "સાચું, 2050માં 28 દિવસનો સાદો ફેબ્રુઆરી છે.",
    "1 September 2026 is a Tuesday, so on which dates are the Tuesdays of that month?": "1 સપ્ટેમ્બર 2026 મંગળવાર છે, તો તે મહિનાના મંગળવાર કઈ તારીખે છે?",
    "Tuesdays of September?": "સપ્ટેમ્બરના મંગળવાર?",
    "The Tuesdays all sit in one column, not along a row.": "બધા મંગળવાર એક સ્તંભમાં છે, હરોળમાં નહીં.",
    "Yes, the Tuesdays are 1, 8, 15, 22 and 29 September.": "હા, મંગળવાર 1, 8, 15, 22 અને 29 સપ્ટેમ્બરે છે.",
    "12 is under Wednesday, so which date is under Wednesday in the next row?": "12 બુધવાર નીચે છે, તો આવતી હરોળમાં બુધવાર નીચે કઈ તારીખ છે?",
    "Next Wednesday?": "આવતો બુધવાર?",
    "The next row down is one week later.": "નીચેની આવતી હરોળ એક અઠવાડિયા પછી છે.",
    "Yes, 12 + 7 = 19.": "હા, 12 + 7 = 19.",
    "1 August 2027 is a Sunday, so which day of the week is 19 August 2027?": "1 ઑગસ્ટ 2027 રવિવાર છે, તો 19 ઑગસ્ટ 2027 અઠવાડિયાનો કયો દિવસ છે?",
    "19 August 2027?": "19 ઑગસ્ટ 2027?",
    "Jump down to the Sunday just before the 19th, then count along.": "19 પહેલાંના રવિવાર સુધી નીચે કૂદો, પછી આગળ ગણો.",
    "Yes, 19 August 2027 is a Thursday.": "હા, 19 ઑગસ્ટ 2027 ગુરુવાર છે.",
    "January 2027 starts on a Friday with 31 days, so which day starts February?": "31 દિવસનો જાન્યુઆરી 2027 શુક્રવારે શરૂ થાય, તો ફેબ્રુઆરી કયા દિવસે શરૂ થશે?",
    "February 2027 begins?": "ફેબ્રુઆરી 2027ની શરૂઆત?",
    "Yes, February 2027 begins on a Monday.": "હા, ફેબ્રુઆરી 2027 સોમવારે શરૂ થાય છે.",
    "A 31 day month starts on a Monday, so on which day does the next month start?": "31 દિવસનો મહિનો સોમવારે શરૂ થાય, તો આવતો મહિનો કયા દિવસે શરૂ થશે?",
    "Next month begins?": "આવતા મહિનાની શરૂઆત?",
    "Start on Monday and move on one day for each day left.": "સોમવારથી શરૂ કરો અને દરેક બાકી દિવસ માટે એક દિવસ આગળ વધો.",
    "Yes, the next month begins on a Thursday.": "હા, આવતો મહિનો ગુરુવારે શરૂ થાય છે.",
    "February 2028 starts on a Tuesday with 29 days, so which day starts March?": "29 દિવસનો ફેબ્રુઆરી 2028 મંગળવારે શરૂ થાય, તો માર્ચ કયા દિવસે શરૂ થશે?",
    "March 2028 begins?": "માર્ચ 2028ની શરૂઆત?",
    "29 days is 4 weeks and 1 day.": "29 દિવસ એટલે 4 અઠવાડિયાં અને 1 દિવસ.",
    "Yes, March 2028 begins on a Wednesday.": "હા, માર્ચ 2028 બુધવારે શરૂ થાય છે.",
    "1st": "પહેલો",
    "2nd": "બીજો",
    "3rd": "ત્રીજો",
    "4th": "ચોથો",
    "5th": "પાંચમો",
    "year": "વર્ષ",
    "leap year": "લીપ વર્ષ",
    "days": "દિવસ",
    "Yes": "હા",
    "No": "ના",
    "September 2026": "સપ્ટેમ્બર 2026",
    "October 2026": "ઑક્ટોબર 2026",
    "August 2026": "ઑગસ્ટ 2026",
    "August 2027": "ઑગસ્ટ 2027",
    "January 2027": "જાન્યુઆરી 2027",
    "February 2028": "ફેબ્રુઆરી 2028",
    "30 days": "30 દિવસ",
    "31 days": "31 દિવસ",
    "28 or 29": "28 કે 29",
    "Mon": "સોમ",
    "Tue": "મંગળ",
    "Wed": "બુધ",
    "Thu": "ગુરુ",
    "Fri": "શુક્ર",
    "Sat": "શનિ",
    "Sun": "રવિ",
    "Monday": "સોમવાર",
    "Tuesday": "મંગળવાર",
    "Wednesday": "બુધવાર",
    "Thursday": "ગુરુવાર",
    "Friday": "શુક્રવાર",
    "Saturday": "શનિવાર",
    "Sunday": "રવિવાર",
    "Jan": "જાન્યુ",
    "Feb": "ફેબ્રુ",
    "Mar": "માર્ચ",
    "Apr": "એપ્રિ",
    "May": "મે",
    "Jun": "જૂન",
    "Jul": "જુલા",
    "Aug": "ઑગ",
    "Sep": "સપ્ટે",
    "Oct": "ઑક્ટો",
    "Nov": "નવે",
    "Dec": "ડિસે",
    "February": "ફેબ્રુઆરી",
    "100 years": "100 વર્ષ",
    "1 century": "1 સદી",
    "Add 29 Feb": "29 ફેબ્રુ ઉમેરો",
    "Not a leap year": "લીપ વર્ષ નથી",
    "Year": "વર્ષ",
    "Leap year": "લીપ વર્ષ",
    "months": "મહિના",
    "Given": "આપેલું",
    "Jump": "કૂદ",
    "Weeks": "અઠવાડિયાં",
    "Left over": "બાકી દિવસ",
    "Day 1": "દિવસ 1",
    "Next month": "આવતો મહિનો",
  },
};

const PHASES = [
  {
    n: 1,
    concept: "Weeks, fortnights and months",
    conceptId: "M3.S5.T8.C35", objectiveIds: ["O13"],
    says: ["Count along the row of a week, then sort the month cards."],
    steps: [
      { say: "Tap the first blue row to count the days of one week.", on: "count", hint: "Tap anywhere on the top blue row." },
      { say: "Two weeks make a fortnight, so tap the other row too.", on: "count", hint: "Tap the other blue row." },
    ],
    /* warm-up board for the steps: two rows of a week, a fortnight */
    warm: { kind: "rows", rows: [7, 7] },
    ladder: ["Each full row is one whole week.", "Add the numbers written at the end of the rows."],
    closing: "A week is 7 days, a fortnight 14, and February has 28 or 29 days.",
    learned: "You learned: 7 days a week, 14 a fortnight, months of 28 to 31 days.",
    traceback: "Each row is outlined amber and counted in ink at its end, then the counts are added to the whole number of days.",
    items: [
      /* learn MC1: answer in the plan = 17 days. */
      { qid: "M3.S5.T8.C35:MC1", kind: "rows", rows: [7, 7, 3], nm: 15, unit: "days", nudge: "Tap each blue row to count it first.",
        say: "Count the rows: how many days make a fortnight and 3 more days?", ask: "Fortnight and 3 days?", answer: 17,
        miss: "Add the two full rows, then the 3 days in the last row.",
        ladder: ["Read the number written at the end of each row.", "Add the fortnight's two counts, then the 3 more days."],
        winLine: "Yes, 7 + 7 + 3 makes 17 days." },
      /* practice 1: answer in the plan = 21 days, because 3 x 7 = 21 */
      { qid: "M3.S5.T8.C35:1", kind: "rows", rows: [7, 7, 7], nm: 10, unit: "days", nudge: "Count each row with a tap first.",
        say: "Count the rows again: how many days make 3 weeks?", ask: "Days in 3 weeks?", answer: 21,
        miss: "Count every row, and each row is a week.",
        ladder: ["Three rows means three weeks of the same count.", "Add the same row count three times over."],
        winLine: "Yes, 3 weeks make 21 days." },
      /* practice 5: answer in the plan = Seven months have 31 days, and February has 28 or 29 days
         (the count is typed; February is the odd card that sorts alone, shown on the board and in the win line) */
      { qid: "M3.S5.T8.C35:5", kind: "cards", nm: 6, unit: "months", nudge: "Tap the month cards until all 12 are sorted.",
        say: "Tap a card and the hand carries it to its lane; how many months have 31 days?", ask: "Months of 31 days?", answer: 7,
        miss: "Count the cards in the 31 days row.",
        ladder: ["Point at each card in the top row as you count.", "The 30 days row has 4 cards, and February sits alone."],
        winLine: "Yes, 7 months have 31 days, and February has 28 or 29." },
    ],
  },
  {
    n: 2,
    concept: "Leap years",
    conceptId: "M3.S5.T8.C36", objectiveIds: ["O13"],
    says: ["Look at the February of a year and count its cells."],
    steps: [
      { say: "Tap 2026 on the strip to read its February.", on: "year", hint: "Find 2026 on the year strip." },
      { say: "Now tap 2028 and see its February.", on: "year", hint: "Find 2028 on the year strip." },
    ],
    warm: { kind: "year", from: 2024, targets: [2026, 2028] },
    ladder: ["A leap year's February has a 29th day.", "Add 1 day to an ordinary year for a leap year."],
    closing: "Every fourth year from 2000 to 2099 is a leap year with a 29 February.",
    learned: "You learned: a leap year has 366 days, every fourth year from 2000.",
    traceback: "The year's February is read with its cells, the 29th day lit amber, and the year's days are added up to the whole answer.",
    items: [
      /* learn MC2: answer in the plan = Yes, 2044 is a leap year, and it has 366 days.
         (the days are typed; the February card shows the leap year by its 29th cell) */
      { qid: "M3.S5.T8.C36:MC2", kind: "year", from: 2040, yr: 2044, nm: 365, unit: "days", nudge: "Tap 2044 on the strip first.",
        say: "Tap 2044 on the strip, then find how many days the year 2044 has.", ask: "Days in 2044?", answer: 366,
        miss: "Read the February of 2044 on the card.", winLine: "Yes, 2044 gets 29 February, so it has 366 days." },
      /* practice 2: answer in the plan = 365 days, and 366 days in a leap year */
      { qid: "M3.S5.T8.C36:2", kind: "add", nm: "365|365", nudge: "Tap Add 29 Feb first.",
        parts: [{ label: "year", unit: "days" }, { label: "leap year", unit: "days" }],
        say: "Tap Add 29 Feb, then type how many days a year and a leap year have.", ask: "A year, a leap year?", answer: [365, 366],
        miss: "Count the cells on the February card you just made.", winLine: "Yes, 365 days, and one more day in a leap year." },
      /* practice 6: answer in the plan = No. Between 2000 and 2099 the leap years come every fourth year, 2048 and then 2052, so 2050 is not a leap year */
      { qid: "M3.S5.T8.C36:6", kind: "year", from: 2044, yr: 2050, nm: "yes",
        choices: [{ id: "yes", label: "Yes" }, { id: "no", label: "No" }],
        say: "Between 2000 and 2099, is 2050 a leap year?", ask: "Is 2050 a leap year?", answer: "no",
        miss: "Count on in fours from 2044 along the strip.",
        ladder: ["Leap years come every fourth year, like 2044 and 2048.", "After 2048 the next leap year is 4 years on, not 2."],
        winLine: "Right, 2050 has an ordinary February of 28 days." },
    ],
  },
  {
    n: 3,
    concept: "Reading a month's calendar",
    conceptId: "M3.S5.T8.C37", objectiveIds: ["O14"],
    says: ["Dates down one column of a calendar are a week apart."],
    steps: [
      { say: "Drag the Jump down the column to the date 7 days on.", on: "jump", hint: "Drag the violet Jump down one row." },
      { say: "Now jump again to the next row down.", on: "jump", hint: "Tap or drag the violet Jump again." },
    ],
    warm: { kind: "jump", title: "October 2026", len: 31, st: 3, from: 2, need: 2 },
    ladder: ["Each jump down the column adds 7 to the date.", "Start from the blue date and add 7 for each jump you made."],
    closing: "Each column is one day of the week, so dates down a column are 7 apart.",
    learned: "You learned: dates down one column of a calendar are 7 apart.",
    traceback: "The row counted along is lit amber, then the violet jump goes down the column 7 days at a time, each date written in its cell, ending on the dates asked for.",
    items: [
      /* learn MC3: answer in the plan = 1, 8, 15, 22 and 29 September 2026. */
      { qid: "M3.S5.T8.C37:MC3", kind: "jump", title: "September 2026", len: 30, st: 1, from: 1, need: 4, nm: "1|2|3|4|5", nudge: "Drag the Jump down the Tuesday column first.",
        parts: [{ label: "1st" }, { label: "2nd" }, { label: "3rd" }, { label: "4th" }, { label: "5th" }],
        say: "1 September 2026 is a Tuesday, so on which dates are the Tuesdays of that month?", ask: "Tuesdays of September?", answer: [1, 8, 15, 22, 29],
        miss: "The Tuesdays all sit in one column, not along a row.", winLine: "Yes, the Tuesdays are 1, 8, 15, 22 and 29 September." },
      /* practice 3: answer in the plan = 19, because the dates in one column are 7 apart and 12 + 7 = 19 */
      { qid: "M3.S5.T8.C37:3", kind: "jump", title: "August 2026", len: 31, st: 5, from: 12, need: 1, nm: 13, nudge: "Drag the Jump down one row first.",
        say: "12 is under Wednesday, so which date is under Wednesday in the next row?", ask: "Next Wednesday?", answer: 19,
        miss: "The next row down is one week later.", winLine: "Yes, 12 + 7 = 19." },
      /* practice 7: answer in the plan = A Thursday, because 15 August 2027 is a Sunday and 19 August 2027 is 4 days on */
      { qid: "M3.S5.T8.C37:7", kind: "jump", title: "August 2027", len: 31, st: 6, from: 1, need: 2, nm: "sun", choices: MC_DAY_CHOICES, nudge: "Drag the Jump down the Sunday column first.",
        say: "1 August 2027 is a Sunday, so which day of the week is 19 August 2027?", ask: "19 August 2027?", answer: "thu",
        miss: "Jump down to the Sunday just before the 19th, then count along.",
        ladder: ["15 August is a Sunday, so count on from there.", "Count 16, 17, 18 and 19 along the row from Sunday."],
        winLine: "Yes, 19 August 2027 is a Thursday." },
    ],
  },
  {
    n: 4,
    concept: "Into the next month",
    conceptId: "M3.S5.T8.C38", objectiveIds: ["O14"],
    says: ["Cut off the whole weeks and carry the days that are left."],
    steps: [
      { say: "Tap Weeks to cut the whole weeks off this month.", on: "weeks", hint: "Tap the Weeks key." },
      { say: "Now tap Jump to hop over the days that are left.", on: "jumpon", hint: "Tap the Jump key." },
    ],
    warm: { kind: "weeks", title: "30 days", len: 30, st: 2 },
    ladder: ["28 days is 4 whole weeks, so look at the days after them.", "The next month begins on the day after the last day you jumped."],
    closing: "Whole weeks never move the day, so only the days left over decide it.",
    learned: "You learned: 31 days is 4 weeks 3 days, so the next month moves on 3.",
    traceback: "The whole weeks are cut off in ink, the hand jumps the days left over, lit amber and counted, and the next day is lit green with its day name.",
    items: [
      /* learn MC4: answer in the plan = Monday. */
      { qid: "M3.S5.T8.C38:MC4", kind: "weeks", title: "January 2027", len: 31, st: 4, nm: "sun", choices: MC_DAY_CHOICES, nudge: "Tap Weeks, then Jump.",
        say: "January 2027 starts on a Friday with 31 days, so which day starts February?", ask: "February 2027 begins?", answer: "mon",
        miss: "You do not need all 31 days, only the ones left over.", winLine: "Yes, February 2027 begins on a Monday." },
      /* practice 4: answer in the plan = Thursday, because 31 days is 4 weeks 3 days, and 3 days on from a Monday is a Thursday */
      { qid: "M3.S5.T8.C38:4", kind: "weeks", title: "31 days", len: 31, st: 0, nm: "wed", choices: MC_DAY_CHOICES, nudge: "Cut the weeks, then jump the days left.",
        say: "A 31 day month starts on a Monday, so on which day does the next month start?", ask: "Next month begins?", answer: "thu",
        miss: "Start on Monday and move on one day for each day left.", winLine: "Yes, the next month begins on a Thursday." },
      /* practice 8: answer in the plan = A Wednesday, because 29 days is 4 weeks 1 day, and 1 March 2028 is a Wednesday */
      { qid: "M3.S5.T8.C38:8", kind: "weeks", title: "February 2028", len: 29, st: 1, nm: "tue", choices: MC_DAY_CHOICES, nudge: "Use Weeks, then Jump, on this month first.",
        say: "February 2028 starts on a Tuesday with 29 days, so which day starts March?", ask: "March 2028 begins?", answer: "wed",
        miss: "29 days is 4 weeks and 1 day.", winLine: "Yes, March 2028 begins on a Wednesday." },
    ],
  },
];

const MODEL = { days: MC_DAYS, months: MC_MON, monthDays: MC_MLEN, jump: 7, week: 7, fortnight: 14, year: 365, leapYear: 366, century: 100 };

const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};

const oracle = () => {
  const dow = (y: number, m: number, d: number) => (new Date(Date.UTC(y, m, d)).getUTCDay() + 6) % 7;   /* 0 = Monday */
  const mlen = (y: number, m: number) => new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  const yearLen = (y: number) => (mlen(y, 1) === 29 ? 366 : 365);
  const [p1, p2, p3, p4] = PHASES.map((p: any) => p.items);
  const ok: boolean[] = [];
  ok.push(p1[0].answer === p1[0].rows.reduce((a: number, b: number) => a + b, 0) && p1[0].answer === 2 * 7 + 3);
  ok.push(p1[1].answer === 3 * 7);
  ok.push(p1[2].answer === Array.from({ length: 12 }, (_, m) => mlen(2026, m)).filter((d) => d === 31).length);
  ok.push(p2[0].answer === yearLen(2044) && yearLen(2044) === 366);
  ok.push(p2[1].answer[0] === yearLen(2026) && p2[1].answer[1] === yearLen(2028));
  ok.push(p2[2].answer === (yearLen(2050) === 366 ? "yes" : "no"));
  ok.push(JSON.stringify(p3[0].answer) === JSON.stringify(Array.from({ length: 30 }, (_, k) => k + 1).filter((d) => dow(2026, 8, d) === 1)));
  ok.push(dow(2026, 7, 12) === 2 && p3[1].answer === 12 + 7 && dow(2026, 7, p3[1].answer) === 2);
  ok.push(p3[2].answer === MC_DAY_IDS[dow(2027, 7, 19)]);
  ok.push(p4[0].answer === MC_DAY_IDS[dow(2027, 1, 1)]);
  ok.push(p4[1].answer === MC_DAY_IDS[(0 + 31) % 7]);
  ok.push(p4[2].answer === MC_DAY_IDS[dow(2028, 2, 1)]);
  /* the boards' own data agree with the calendar too */
  [[p3[0], 2026, 8], [p3[1], 2026, 7], [p3[2], 2027, 7], [p4[0], 2027, 0], [p4[2], 2028, 1]].forEach(([it, y, m]: any) =>
    ok.push(it.st === dow(y, m, 1) && it.len === mlen(y, m)));
  return ok.every(Boolean);
};

const nearMiss = (item: any) => (item.nm !== undefined ? item.nm : typeof item.answer === "number" ? item.answer + 1 : "~");

const answerForms = (item: any) => (item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : item.choices ? item.choices.filter((c: any) => c.id === item.answer).map((c: any) => c.label)
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)]
  : [String(item.answer)]);

const agentKey = (item: any) => item.answer;

const HOOK: any = {};

const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));

const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);

const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area ──────────────────────────────────────────────────────────────────────── */

/* layout (Work coordinates; the picture keeps x 0 to 900 so it is the same size with the keypad open or shut) */
/* a month's calendar: phase 3 is 110 a column (its legend on the title line), phase 4 and free play 90 (legend and keys in the column at
   MC_COL). Work picks the grid during render (MC_G), so every helper below reads the one the board is drawn with. */
const MC_G3 = { x: 8, cw: 126, head: 44, headH: 44, top: 88, ch: 72, rows: 6 };
const MC_G4 = { x: 20, cw: 90, head: 44, headH: 44, top: 88, ch: 72, rows: 6 };
/* a header row's shared baseline, from the ink of all seven names (an i-dot or a matra counts) */
const mcRowBase = (names: string[], size: number, top: number, hh: number) => {
  const ink = names.map((x) => mcInk(x, size)), asc = Math.max(...ink.map((q) => q.asc)), desc = Math.max(...ink.map((q) => q.desc));
  return top + hh / 2 + (asc - desc) / 2;
};
let MC_G = MC_G3;
const MC_R = { x: 20, cw: 100, top: 52, ch: 96 };                                 /* the rows of a week (phase 1) */
const MC_F = { x: 20, y: 52, cw: 72, ch: 56 };                                    /* the February card (phase 2) */
const MC_COL = 664;                                                               /* phase 4's right column: legend, chip and keys */
/* a label's width in stage units (Poppins ~0.62 em a letter; Devanagari / Gujarati marks that take no width are skipped) */
/* a label's width in stage units, MEASURED in the tool's own font (a canvas 2d context); the estimate (Poppins ~0.62 em a letter,
   Devanagari / Gujarati 0.74, zero-width marks skipped) only where no canvas exists */
let MC_CTX: any = null;
const mcTextW = (s: string, size: number) => {
  try {
    if (!MC_CTX) MC_CTX = document.createElement("canvas").getContext("2d");
    MC_CTX.font = "700 " + size + "px " + FONT;
    return MC_CTX.measureText(String(s)).width;
  } catch (e) { return Array.from(String(s)).filter((ch) => !/[\u0900-\u0902\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962\u0963\u0A81\u0A82\u0ABC\u0AC1-\u0AC8\u0ACD\u0AE2\u0AE3]/.test(ch)).reduce((a, ch) => a + (/[\u0900-\u0AFF]/.test(ch) ? 0.74 : 0.62), 0) * size; }
};
/* a label's INK above and below its baseline, measured on the canvas in the drawn font (a top matra or a ु counts); estimate without one */
const mcInk = (s: string, size: number) => {
  try {
    if (!MC_CTX) MC_CTX = document.createElement("canvas").getContext("2d");
    MC_CTX.font = "700 " + size + "px " + FONT;
    const m = MC_CTX.measureText(String(s));
    if (isFinite(m.actualBoundingBoxAscent)) return { asc: m.actualBoundingBoxAscent, desc: m.actualBoundingBoxDescent };
  } catch (e) { /* the estimate below */ }
  return /[\u0900-\u0AFF]/.test(String(s)) ? { asc: size * 0.95, desc: size * 0.35 } : { asc: size * 0.72, desc: 0 };
};
/* one type size for a set of labels so the widest keeps `pad` each side in `room`; never under the 28 floor, never cut */
const mcFit = (labels: string[], room: number, pad: number, size = T.label) =>
  Math.max(T.micro, Math.min(size, Math.floor(size * (room - 2 * pad) / Math.max(1, ...labels.map((l) => mcTextW(l, size))))));

const mcCell = (idx: number) => ({ x: MC_G.x + (idx % 7) * MC_G.cw, y: MC_G.top + Math.floor(idx / 7) * MC_G.ch, w: MC_G.cw, h: MC_G.ch });
const mcLeap = (y: number) => y % 4 === 0;   /* every fourth year is a leap year between 2000 and 2099 */
const mcCardGroup = (m: number) => (MC_MLEN[m] === 31 ? 0 : MC_MLEN[m] === 30 ? 1 : 2);
const mcCardHome = (m: number) => ({ x: 26 + (m % 6) * 144, y: 326 + Math.floor(m / 6) * 96, w: 128, h: 84 });
const mcCardSorted = (g: number, j: number) => ({ x: 164 + j * 105, y: 56 + g * 90, w: 102, h: 76 });
const mcYearCell = (k: number) => ({ x: 6 + (k % 8) * 112, y: 352 + Math.floor(k / 8) * 84, w: 104, h: 76 });
const mcFebCell = (d: number) => ({ x: MC_F.x + ((d - 1) % 7) * MC_F.cw, y: MC_F.y + Math.floor((d - 1) / 7) * MC_F.ch, w: MC_F.cw, h: MC_F.ch });
/* phase 4: the cut points after each whole week (dates 7, 14, 21, 28) */
const mcCuts = (st: number) => [7, 14, 21, 28].map((d) => { const c = mcCell(st + d - 1); return { x: c.x + c.w, y: c.y + c.h / 2 }; });
/* how many correction steps an item's traceback has */
const mcTbMax = (it: any) => (it.kind === "rows" ? it.rows.length + 1 : it.kind === "cards" ? 3 : it.kind === "year" || it.kind === "add" ? 3
  : it.kind === "jump" ? it.need + (it.choices ? 4 : 0) + 2 : 3);

function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const warmup = (stage === "demo" || stage === "teach") && !!phase.warm;
  const it: any = free ? { kind: "weeks", title: "", free: true } : warmup ? phase.warm : item;
  const k = it.kind;
  const dev = lang === "hi" || lang === "gu";
  const [, setFontTick] = useState(0);
  useEffect(() => {
    const redraw = () => setFontTick((x: number) => x + 1);
    try {
      const F: any = (document as any).fonts;
      F.ready.then(redraw);
      F.addEventListener("loadingdone", redraw);
      F.load("700 28px 'C4 Poppins'", "Jump कूद").then(redraw, () => {});
      return () => F.removeEventListener("loadingdone", redraw);
    } catch (e) { /* no font API: the estimate stands */ }
  }, []);
  /* Devanagari and Gujarati need a taller day-name row (matras above, vowel signs below) */
  MC_G = { ...(k === "jump" ? MC_G3 : MC_G4), ...(dev ? { headH: 56, top: 100, ch: 70 } : {}) };

  /* the board is keyed to the ENTRY of a question (PATTERNS §18): a fresh board on every new question, phase, warm-up or free play */
  const qk = free ? "free" : n + "." + (warmup ? "w" : index);
  const entry = useRef({ qk: "", n: 0 });
  if (entry.current.qk !== qk) entry.current = { qk, n: entry.current.n + 1 };
  const tag = qk + "#" + entry.current.n;
  const fresh = () => ({ tag, counted: [] as number[], sorted: [] as number[], moving: -1, year: 0, read: [] as number[], add: false,
    jumps: 0, cutN: 0, cut: false, hop: 0, hopped: false, tb: 0, len: 31, st: 0 });
  const [raw, setRaw] = useState<any>(fresh);
  const S = raw.tag === tag ? raw : fresh();
  const put = (o: any) => setRaw((p: any) => ({ ...(p.tag === tag ? p : fresh()), ...o }));
  const playing = useRef(false);
  const [touched, setTouched] = useState(false);
  const [tbRun, setTbRun] = useState(false);
  const mark = () => { if (!touched) setTouched(true); };
  const rootRef = useRef<any>(null);
  const nudged = useRef(false);
  const live = useRef<any>({});

  const demo = stage === "demo";
  const len = free ? S.len : it.len, st = free ? S.st : it.st;

  /* is the act this question needs done? (the answer is gated by it, PATTERNS §19) */
  const actDone = free ? true : k === "rows" ? it.rows.every((_: any, r: number) => S.counted.includes(r)) : k === "cards" ? S.sorted.length === 12
    : k === "year" ? (it.choices ? true : S.read.includes(it.yr)) : k === "add" ? S.add : k === "jump" ? S.jumps >= it.need : k === "weeks" ? S.cut && S.hopped : true;
  const won = !free && (stage === "win" || stage === "idle");
  const tbShown = won ? mcTbMax(it) : S.tb;

  /* a real child arms the gate (PATTERNS §19): a trusted pointer on the working area, or a trusted Enter / Space on a guide step or on one
     of the board's own controls (every phase opens on guide steps, so a keyboard child arms it there too). While the act still waits, a tap
     or key away from the act's own controls shows the item's nudge (the Hint key re-shows the question). The agent's toolApi sends no
     trusted event, so AI mode and approve stay ungated. */
  live.current = { stage, free, actDone, tbRun, item, touched, tag };
  /* the gate is the child's: user mode only (the bar's data-mode is the runtime's own word for it) */
  const userMode = () => { try { const b = document.querySelector('[data-zone="bar"]'); return !b || b.getAttribute("data-mode") !== "ai"; } catch (e) { return true; } };
  /* a question's first 900 ms are held: a late second tap or Enter from the last guide step never acts on (or nudges) the question */
  const openAt = useRef(0), lastPress = useRef(0);
  useEffect(() => { if (stage === "ask") openAt.current = Date.now(); }, [stage, tag]);
  const held = () => live.current.stage === "ask" && !live.current.free && Date.now() - openAt.current < 900;
  /* every act key and piece: one act per press (400 ms), nothing in the hold or between the last guide step and the question */
  const ui = (fn: () => void) => () => {
    const now = Date.now();
    if (now - lastPress.current < 400 || held() || (demo && !stepOn)) return;
    lastPress.current = now; fn();
  };
  /* THE one way a nudge is said: it marks the nudge, and after max(2.6 s, 68 ms a character) the question comes back (also on the Hint key
     and when the act is done) */
  const mcSayNudge = () => {
    const M = live.current;
    if (!(M.stage === "ask" && !M.actDone && !M.tbRun && M.item && M.item.nudge)) return;
    nudged.current = true; api.say(M.item.nudge);
    clearTimeout(nudgeBack.current);
    const tg = M.tag, wait = Math.max(2600, 68 * String(M.item.nudge).length);
    nudgeBack.current = setTimeout(() => { const Q = live.current; if (Q.tag === tg && Q.stage === "ask" && nudged.current) { nudged.current = false; api.say(Q.item.say); } }, wait);
  };
  const nudgeBack = useRef<any>(null), actAt = useRef(0);   /* no act nudge for 900 ms after any act (a double click's second press) */
  useEffect(() => {
    const on = (e: any) => {
      if (!e.isTrusted || e.repeat || (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift"))) return;
      const L = live.current, t = e.target && e.target.closest ? e.target : null;
      const onBoard = !!(t && ((rootRef.current && rootRef.current.contains(t)) || t.closest('[data-zone="work"]')));
      if (e.type === "pointerdown" ? onBoard : (onBoard || (L.stage === "demo" && (e.key === "Enter" || e.key === " ")))) setTouched(true);
      if (L.stage !== "ask" || L.free || L.actDone || L.tbRun || !L.item || !L.item.nudge || !(L.touched || onBoard) || !userMode() || held() || Date.now() - actAt.current < 900) return;
      /* the Hint key after a nudge shows the question again */
      if (t && t.closest('[data-control="again"]')) { if (nudged.current) { nudged.current = false; setTimeout(() => api.say(live.current.item.say), 80); } return; }
      const mine = t && rootRef.current && rootRef.current.contains(t) && t.closest("[data-control]");
      if (mine) return;
      setTimeout(() => { if (live.current.touched) mcSayNudge(); }, 60);
    };
    window.addEventListener("pointerdown", on, true);
    window.addEventListener("keydown", on, true);
    return () => { clearTimeout(nudgeBack.current); window.removeEventListener("pointerdown", on, true); window.removeEventListener("keydown", on, true); };
  }, []);
  /* the act answers the nudge: the question comes back (PATTERNS §18) */
  useEffect(() => { if (actDone && nudged.current && stage === "ask") { clearTimeout(nudgeBack.current); nudged.current = false; api.say(item.say); } }, [actDone]);
  useEffect(() => { nudged.current = false; }, [tag]);
  /* a win reached without the act (the agent, a skip) still shows the act's result */
  useEffect(() => { if ((stage === "win" || stage === "idle") && !free && !actDone) actNow(); }, [stage, tag]);
  /* the five Tuesday boxes take a date of two digits at most */
  useEffect(() => {
    if (stage !== "ask" || !item.parts || k !== "jump" || !typed) return;
    const ps = slotPartsOf(typed, item.parts.length);
    if (ps.some((x: string) => x.length > 2)) api.setTyped(ps.map((x: string) => x.slice(0, 2)).join("|"));
  }, [typed]);

  /* the gate and the traceback share one lock */
  const lockedRef = useRef(false), lockTag = useRef("");
  useEffect(() => {
    const want = tbRun || (stage === "ask" && touched && !actDone && userMode());
    if (want !== lockedRef.current || lockTag.current !== tag) { lockedRef.current = want; lockTag.current = tag; api.lock(want); }
  });
  /* a correction replay never outlives its question */
  useEffect(() => () => { tl.stop(); setTbRun(false); }, [tag]);

  /* ── the acts ───────────────────────────────────────────────────────────────────────── */
  const run = (o: any, done: () => void, fail?: () => void) => {
    if (playing.current) return;
    playing.current = true;
    actAt.current = Date.now();
    api.act(o).then((ok: boolean) => { playing.current = false; actAt.current = Date.now(); if (ok) done(); else if (fail) fail(); });
  };
  const r0 = MC_R.top + (dev ? 12 : 2), rhH = dev ? 58 : 46;
  const rowY = (r: number) => r0 + r * MC_R.ch;
  const countAt = (r: number) => ({ x: MC_R.x + 7 * MC_R.cw + 56, y: rowY(r) + MC_R.ch / 2 + T.xl * 0.36 });
  const countRow = (r: number) => {
    if (S.counted.includes(r) || S.tb) { if (demo) api.did("count-again"); return; }
    run({ tool: "pencil", moves: "write", text: String(it.rows[r]), at: [countAt(r)], size: T.xl, align: "middle" }, () => {
      put({ counted: [...S.counted, r] });
      if (demo) api.did("count");
    });
  };
  const sortedIn = (g: number, list: number[]) => list.filter((m) => mcCardGroup(m) === g);
  const cardSpot = (m: number, list: number[]) => {
    if (!list.includes(m)) return mcCardHome(m);
    const g = mcCardGroup(m);
    return mcCardSorted(g, sortedIn(g, list).indexOf(m));
  };
  const cardFace = (m: number, w: number, h: number, big: boolean) => (
    <g filter="url(#fShadowSoft)">
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={12} fill="url(#mcCardPaper)" stroke={MC_INK} strokeWidth={3} />
      <rect x={-w / 2} y={-h / 2} width={w} height={14} rx={6} fill={tint(MC_BLUE, 0.35)} />
      {(() => { const sz = mcFit(MC_MON.map((x) => tx(x)), 102, 8), ink = MC_MON.map((x) => mcInk(tx(x), sz)), asc = Math.max(...ink.map((q) => q.asc)), desc = Math.max(...ink.map((q) => q.desc));
        return <text x={0} y={7 + (asc - desc) / 2 - (lang === "hi" ? 1 : 0)} textAnchor="middle" fontSize={sz} fontWeight={700} fill={MC_INK}>{tx(MC_MON[m])}</text>; })()}
    </g>
  );
  const sortCard = (m: number) => {
    if (S.sorted.includes(m) || playing.current) return;
    const a = mcCardHome(m), g = mcCardGroup(m), b = mcCardSorted(g, sortedIn(g, S.sorted).length);
    put({ moving: m });
    run({ tool: "hand", moves: "carry", from: { x: a.x + a.w / 2, y: a.y + a.h / 2 }, to: { x: b.x + b.w / 2, y: b.y + b.h / 2 }, ms: 700,
      hold: cardFace(m, 100, 76, false) }, () => { api.sfx.tick(); put({ sorted: [...S.sorted, m], moving: -1 }); }, () => put({ moving: -1 }));
  };
  const yearsOf = () => Array.from({ length: 16 }, (_, j) => it.from + j);
  const readYear = (y: number) => {
    const target = demo && phase.warm && phase.warm.targets ? phase.warm.targets[Math.min(step || 0, phase.warm.targets.length - 1)] : null;
    if (playing.current) return;
    const kk = yearsOf().indexOf(y), c = mcYearCell(kk);
    run({ tool: "hand", moves: "tap", at: [{ x: c.x + c.w / 2, y: c.y + c.h / 2 }] }, () => {
      api.sfx.tick();
      put({ year: y, read: S.read.includes(y) ? S.read : [...S.read, y] });
      if (demo) api.did(y === target ? "year" : "year-other");
    });
  };
  const febAt = () => { const c = mcFebCell(29); return { x: c.x + c.w / 2, y: c.y + c.h / 2 + 30 * 0.36 }; };
  const add29 = () => {
    if (S.add) return;
    run({ tool: "pencil", moves: "write", text: "29", at: [febAt()], size: 30, align: "middle" }, () => put({ add: true }));
  };
  const srcDate = () => (it.from || 1) + 7 * S.jumps;
  const canJump = () => !!it.from && srcDate() + 7 <= it.len && S.jumps < (it.need || 99);
  /* the Jump pill: its word + 24, inside the cell */
  /* the pill: the measured word + 8 each side; its own ring 2 outside (stroke 2.5) stays 8 inside the 126 column */
  const pillW = mcTextW(tx("Jump"), T.micro) + (lang === "gu" ? 22 : lang === "hi" ? 24 : 16), pillH = lang === "gu" ? 46 : 44;   /* gu is drawn in the system face: 2 more */
  const dragStart = useRef<any>(null);
  const jump = (viaHand: boolean) => {
    if (!canJump() || S.tb) { if (demo) api.did("jump-end"); return; }
    const a = mcCell(it.st + srcDate() - 1), b = mcCell(it.st + srcDate() + 6);
    const land = () => { actAt.current = Date.now(); api.sfx.tick(); put({ jumps: S.jumps + 1 }); if (demo) api.did("jump"); };
    if (!viaHand) { if (!playing.current) land(); return; }
    run({ tool: "hand", moves: "carry", from: { x: a.x + a.w / 2, y: a.y + a.h }, to: { x: b.x + b.w / 2, y: b.y + b.h }, ms: 800,
      hold: (<g filter="url(#fShadowSoft)"><rect x={-pillW / 2} y={-pillH / 2} width={pillW} height={pillH} rx={pillH / 2} fill="url(#mcPillViolet)" stroke="#FFFFFF" strokeWidth={2} /><text x={0} y={lang === "gu" ? 5 : dev ? 6 : 8} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF">{tx("Jump")}</text></g>) }, land);
  };
  const cutWeeks = () => {
    if (S.cut && !(free && S.hopped)) { if (demo) api.did("weeks-again"); return; }
    if (free) put({ cut: false, cutN: 0, hop: 0, hopped: false });
    run({ tool: "knife", moves: "slice", at: mcCuts(st), onPoint: (i: number) => put({ cutN: i + 1 }) }, () => {
      api.sfx.settle(); put({ cut: true, cutN: 4 });
      if (demo) api.did("weeks");
    });
  };
  /* the second act of phase 4: the hand jumps over each day left after the whole weeks, lighting it amber */
  const leftCells = () => Array.from({ length: Math.max(0, len - 28) }, (_, j) => st + 28 + j);
  const hopOn = () => {
    if (!S.cut || S.hopped) { if (demo) api.did(S.cut ? "jumpon-again" : "jumpon-early"); return; }
    const cells = leftCells();
    if (!cells.length) { put({ hopped: true }); if (demo) api.did("jumpon"); return; }
    run({ tool: "hand", moves: "tap", at: cells.map((idx) => { const c = mcCell(idx); return { x: c.x + c.w / 2, y: c.y + c.h / 2 }; }),
      onPoint: (i: number) => { api.sfx.tick(); put({ hop: i + 1 }); } }, () => {
      put({ hopped: true, hop: cells.length });
      if (demo) api.did("jumpon");
    });
  };
  /* Enter, the agent's check() and the dev solve() perform the CURRENT step */
  const stepAct = (on: any) => {
    if (on === "count") countRow(Math.max(0, it.rows.findIndex((_: any, r: number) => !S.counted.includes(r))));
    else if (on === "year") readYear(phase.warm.targets[Math.min(step || 0, phase.warm.targets.length - 1)]);
    else if (on === "jump") jump(true);
    else if (on === "weeks") cutWeeks();
    else if (on === "jumpon") hopOn();
  };
  api.onEnter(demo && stepOn ? () => stepAct(stepOn) : null);
  HOOK.demo = demo && stepOn ? () => stepAct(stepOn) : null;
  /* the agent's check(): do the act at once (AI mode is never gated), then Enter answers */
  const actNow = () => {
    if (k === "rows") put({ counted: it.rows.map((_: any, r: number) => r) });
    else if (k === "cards") put({ sorted: Array.from({ length: 12 }, (_, m) => m), moving: -1 });
    else if (k === "year") put({ year: it.yr, read: S.read.includes(it.yr) ? S.read : [...S.read, it.yr] });
    else if (k === "add") put({ add: true });
    else if (k === "jump") put({ jumps: Math.max(S.jumps, it.need) });
    else if (k === "weeks") put({ cut: true, cutN: 4, hopped: true, hop: Math.max(0, len - 28) });
  };
  HOOK.check = stage === "ask" && !free ? () => { if (!actDone) actNow(); return undefined; } : null;

  /* the win line (the phase's closing replaces the last one) */
  useEffect(() => { if (stage === "win" && !free && item.winLine) api.say(item.winLine); }, [stage, tag]);
  /* phase 4's delight: at the win the first date of the next month drops in under its day */
  const [drop, setDrop] = useState(0);
  useEffect(() => {
    if (stage !== "win" || free || k !== "weeks") return;
    setDrop(-80);
    tl.run([[90, () => setDrop(-50)], [90, () => setDrop(-22)], [90, () => setDrop(6)], [90, () => setDrop(0)]], () => api.sfx.settle());
  }, [stage, tag]);

  /* the traceback: redraw the maths step by step, ending on the whole right answer */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free) return;
    const N = mcTbMax(it);
    setTbRun(true);
    actNow();
    put({ tb: 0 });
    /* a jump question's step 1 (the row counted along) stands alone for 1.3 s before the jumps */
    tl.run(Array.from({ length: N }, (_, j) => [k === "jump" && j === 0 ? 1300 : 650, () => put({ tb: j + 1 })] as any), () => setTbRun(false));
  }, [wrong]);

  /* a read-off question (is 2050 a leap year?) carries no year or leap truth in getState before the answer or its correction */
  const yearShown = k === "year" && (!it.choices || won || S.tb >= 1);
  api.share({ phase: n, month: it.title || "", year: yearShown ? S.year || null : null, dates: k === "jump" ? S.jumps : null,
    jumps: S.jumps, leap: yearShown && S.year ? mcLeap(S.year) && S.read.length > 0 : null, next_month: k === "weeks" ? S.cut : null,
    answer: won ? item.answer : null, complete: stage === "idle" });

  /* ── drawing ─────────────────────────────────────────────────────────────────────────── */
  const deep = (c: string) => shade(c, 0.25);
  /* a chip; an array label is laid out as separate tokens (an addition), each its own short text */
  const chip = (x: number, y: number, w: number, h: number, col: string, label: any, size = T.label) => {
    const toks: string[] = Array.isArray(label) ? label : [label];
    const tw = (t: string) => mcTextW(t, size), gap = size * 0.32;
    /* centred by the ink of all its tokens together (a top matra, a ु or a descender moves the baseline) */
    const ink = toks.map((t) => mcInk(t, size)), asc = Math.max(...ink.map((q) => q.asc)), desc = Math.max(...ink.map((q) => q.desc));
    const base = y + h / 2 + (asc - desc) / 2;
    const total = toks.reduce((a, t) => a + tw(t), 0) + gap * (toks.length - 1);
    let cx = x + w / 2 - total / 2;
    return (
      <g filter="url(#fShadowSoft)">
        <rect x={x} y={y} width={w} height={h} rx={14} fill={tint(col, 0.85)} stroke={col} strokeWidth={3} />
        {toks.map((t, j) => { const mid = cx + tw(t) / 2; cx += tw(t) + gap; return (
          <text key={j} x={mid} y={base} textAnchor="middle" fontSize={size} fontWeight={700} fill={deep(col)}>{t}</text>
        ); })}
      </g>
    );
  };
  /* the legend: a swatch and its name, ONE line each; in a column (x, y down) or in a row (across from x) */
  const legend = (items: [string, string][], x = MC_COL, y = 0, across = false) => {
    let cx = x, cy = y;
    return (
      <g>
        {items.map(([col, label]) => {
          const x0 = cx, y0 = cy;
          if (across) cx += 44 + mcTextW(tx(label), T.label) + 24; else cy += 52;
          return (
            <g key={label}>
              <rect x={x0 + 4} y={y0 + 6} width={30} height={30} rx={8} fill={col} stroke={MC_INK} strokeWidth={2.4} filter="url(#fShadowSoft)" />
              <text x={x0 + 44} y={y0 + 32} fontSize={T.label} fontWeight={700} fill={MC_INK}>{tx(label)}</text>
            </g>
          );
        })}
      </g>
    );
  };
  const invite = (x: number, y: number, w: number, h: number) => (!won && !S.tb ? <Invite x={x + w / 2} y={y + h / 2} w={w} h={h} rx={12} C={C} /> : null);

  /* phase 1: rows of a week */
  const drawRows = () => {
    const rows: number[] = it.rows, nextR = rows.findIndex((_, r) => !S.counted.includes(r));
    const tbSum = tbShown > rows.length;
    return (
      <g>
        {MC_DAYS.map((d, c) => (
          <g key={d}>
            <rect x={MC_R.x + c * MC_R.cw} y={r0 - rhH - 4} width={MC_R.cw} height={rhH} fill={C.panel} stroke={MC_INK} strokeWidth={2.4} />
            <text x={MC_R.x + c * MC_R.cw + MC_R.cw / 2} y={mcRowBase(MC_DAYS.map((x) => tx(x)), mcFit(MC_DAYS.map((x) => tx(x)), MC_R.cw, 8), r0 - rhH - 4, rhH)} textAnchor="middle" fontSize={mcFit(MC_DAYS.map((x) => tx(x)), MC_R.cw, 8)} fontWeight={700} fill={MC_INK}>{tx(d)}</text>
          </g>
        ))}
        {rows.map((cnt, r) => (
          <g key={r}>
            {MC_DAYS.map((_, c) => (
              <rect key={c} x={MC_R.x + c * MC_R.cw} y={rowY(r)} width={MC_R.cw} height={MC_R.ch} fill={c < cnt ? MC_BLUE : "#FFFFFF"} stroke={MC_INK} strokeWidth={2.4} />
            ))}
            <rect x={MC_R.x} y={rowY(r)} width={7 * MC_R.cw} height={MC_R.ch} fill="none" stroke={MC_INK} strokeWidth={4.5} />
            {S.counted.includes(r) && <PencilText text={String(cnt)} x={countAt(r).x} y={countAt(r).y} size={T.xl} align="middle" />}
            {!free && stage !== "win" && stage !== "idle" && (
              <Hit id={"row-" + (r + 1)} x={MC_R.x} y={rowY(r)} w={7 * MC_R.cw} h={MC_R.ch} label={tx("Count row") + " " + (r + 1)}
                onPress={ui(() => { mark(); countRow(r); })} enabled={!S.tb} />
            )}
          </g>
        ))}
        {nextR >= 0 && (demo || stage === "ask") && (lang === "hi" ? invite(MC_R.x, rowY(nextR) + 6, 7 * MC_R.cw, MC_R.ch - 12) : invite(MC_R.x, rowY(nextR), 7 * MC_R.cw, MC_R.ch))}
        {/* the correction and the win: each row counted in turn, then the counts added */}
        <g pointerEvents="none">
          {rows.map((cnt, r) => tbShown > r && (
            <g key={"tb" + r}>
              {lang === "hi" ? <rect x={MC_R.x + 3} y={rowY(r) + 3} width={7 * MC_R.cw - 6} height={MC_R.ch - 6} fill="none" stroke={MC_AMBER} strokeWidth={6} />
                : <rect x={MC_R.x - 3} y={rowY(r) - 3} width={7 * MC_R.cw + 6} height={MC_R.ch + 6} fill="none" stroke={MC_AMBER} strokeWidth={6} />}
              {!S.counted.includes(r) && <text x={countAt(r).x} y={countAt(r).y} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={MC_INK}>{cnt}</text>}
            </g>
          ))}
          {tbSum && chip(MC_R.x, rowY(rows.length) + 24, 7 * MC_R.cw, 72, MC_GREEN, [...rows.flatMap((c, j) => (j ? ["+", String(c)] : [String(c)])), "=", String(item.answer)], T.prompt)}
        </g>
        {legend([[MC_BLUE, "Given"], [MC_GREEN, "Answer"]], MC_R.x, rowY(rows.length) + (tbSum ? 108 : 20), true)}
      </g>
    );
  };

  /* phase 1: the twelve month cards */
  const drawCards = () => {
    const nextM = Array.from({ length: 12 }, (_, m) => m).find((m) => !S.sorted.includes(m) && S.moving !== m);
    const top7 = sortedIn(0, S.sorted);
    return (
      <g>
        {["31 days", "30 days", "28 or 29"].map((lb, g) => (
          <g key={lb}>
            <rect x={160} y={52 + g * 90} width={740} height={84} rx={14} fill={tint(C.panel, 0.4)} stroke={C.rule} strokeWidth={2} />
            <text x={8} y={g * 90 + 106} fontSize={T.label} fontWeight={700} fill={MC_INK}>{tx(lb)}</text>
          </g>
        ))}
        {Array.from({ length: 12 }, (_, m) => m).map((m) => {
          if (S.moving === m) return null;
          const b = cardSpot(m, S.sorted), done = S.sorted.includes(m);
          const lit = tbShown >= 2 && m === 1;
          return (
            <g key={m} transform={`translate(${b.x + b.w / 2}, ${b.y + b.h / 2})`}>
              {cardFace(m, b.w, b.h, !done)}
              {lit && <rect x={-b.w / 2 - 4} y={-b.h / 2 - 4} width={b.w + 8} height={b.h + 8} rx={14} fill="none" stroke={MC_AMBER} strokeWidth={6} pointerEvents="none" />}
              {!done && !free && stage === "ask" && (
                <rect {...control("card-" + MC_MON[m].toLowerCase(), tx("Sort") + " " + tx(MC_MON[m]))} x={-b.w / 2} y={-b.h / 2} width={b.w} height={b.h} fill="transparent"
                  onPointerDown={ui(() => { mark(); sortCard(m); })} onKeyDown={(e: any) => { if ((e.key === "Enter" || e.key === " ") && !e.repeat) { e.preventDefault(); e.stopPropagation(); ui(() => { mark(); sortCard(m); })(); } }} />
              )}
            </g>
          );
        })}
        {nextM !== undefined && stage === "ask" && (() => { const b = mcCardHome(nextM); return invite(b.x, b.y, b.w, b.h); })()}
        <g pointerEvents="none">
          {tbShown >= 2 && top7.map((m, j) => { const b = mcCardSorted(0, j); return (
            <g key={"n" + m}>
              <circle cx={b.x + b.w / 2} cy={24} r={17} fill={MC_AMBER} stroke={MC_INK} strokeWidth={2} filter="url(#fShadowSoft)" />
              <text x={b.x + b.w / 2} y={24 + 10} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={MC_INK}>{j + 1}</text>
            </g>
          ); })}
          {tbShown >= 3 && chip(176, 352, 400, 80, MC_GREEN, item.answer + " " + tx("months"), T.prompt)}
          {tbShown >= 3 && legend([[MC_GREEN, "Answer"]], 600, 370)}
        </g>
      </g>
    );
  };

  /* phase 2: the February card, the century bar and the year strip */
  const drawFeb = () => {
    /* Q3 (is 2050 a leap year?) is a read-off: a tap on the strip only selects a year, and 2050's February is drawn only in the correction and at the win */
    const showYear = k === "year" ? (it.choices ? (tbShown >= 1 ? it.yr : 0) : S.year) : 0;
    const has29 = k === "year" ? !!showYear && mcLeap(showYear) : S.add;
    const title = k === "year" ? (showYear ? tx("February") + " " + showYear : tx("February")) : tx("February");
    const years = k === "year" ? yearsOf() : [];
    const target = k === "year" ? (demo && phase.warm.targets ? phase.warm.targets[Math.min(step || 0, phase.warm.targets.length - 1)] : it.choices ? 0 : it.yr) : 0;
    const tCell = target ? mcYearCell(years.indexOf(target)) : null;
    const c29 = mcFebCell(29);
    const live = !free && (demo || stage === "ask") && !S.tb;
    return (
      <g>
        <text x={MC_F.x} y={34} fontSize={T.label} fontWeight={700} fill={MC_INK}>{title}</text>
        {(k === "add" || showYear) ? Array.from({ length: 28 }, (_, j) => j + 1).map((d) => { const c = mcFebCell(d); return (
          <g key={d}>
            <rect x={c.x} y={c.y} width={c.w} height={c.h} fill="#FFFFFF" stroke={MC_INK} strokeWidth={2.4} />
            <text x={c.x + c.w / 2} y={c.y + c.h / 2 + 11} textAnchor="middle" fontSize={T.micro + 2} fontWeight={600} fill={MC_INK}>{d}</text>
          </g>
        ); }) : <rect x={MC_F.x} y={MC_F.y} width={7 * MC_F.cw} height={4 * MC_F.ch} rx={6} fill={tint(C.panel, 0.4)} stroke={MC_INK} strokeWidth={2.4} strokeDasharray="10 8" />}
        {(k === "add" || showYear) && <rect x={MC_F.x} y={MC_F.y} width={7 * MC_F.cw} height={4 * MC_F.ch} fill="none" stroke={MC_INK} strokeWidth={4.5} />}
        {has29 && (
          <g>
            <rect x={c29.x} y={c29.y} width={c29.w} height={c29.h} fill={tint(MC_AMBER, 0.45)} stroke={MC_INK} strokeWidth={4.5} />
            {k === "add" ? <PencilText text="29" x={febAt().x} y={febAt().y} size={30} align="middle" />
              : <text x={c29.x + c29.w / 2} y={c29.y + c29.h / 2 + 11} textAnchor="middle" fontSize={T.micro + 2} fontWeight={700} fill={MC_INK}>29</text>}
          </g>
        )}
        {/* the century bar */}
        <g>
          <text x={570} y={44} fontSize={T.label} fontWeight={700} fill={MC_INK}>2000</text>
          <text x={890} y={44} textAnchor="end" fontSize={T.label} fontWeight={700} fill={MC_INK}>2099</text>
          <rect x={570} y={58} width={320} height={36} rx={18} fill={tint(MC_BLUE, 0.7)} stroke={MC_INK} strokeWidth={2.4} filter="url(#fShadowSoft)" />
          <text x={730} y={136} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={MC_INK}>{tx("100 years")}</text>
          <text x={730} y={176} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={MC_INK}>{tx("1 century")}</text>
        </g>
        {k === "year" && years.map((y, j) => { const c = mcYearCell(j), on = S.year === y; return (
          <g key={y} filter="url(#fShadowSoft)">
            <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={12} fill={on ? tint(MC_AMBER, 0.45) : "#FFFFFF"} stroke={MC_INK} strokeWidth={on ? 4 : 2.4} />
            <text x={c.x + c.w / 2} y={c.y + c.h / 2 + 12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={MC_INK}>{y}</text>
            {live && <Hit id={"year-" + y} x={c.x} y={c.y} w={c.w} h={c.h} label={tx("Year") + " " + y} onPress={ui(() => { mark(); readYear(y); })} />}
          </g>
        ); })}
        {k === "year" && tCell && !S.read.includes(target) && live && invite(tCell.x, tCell.y, tCell.w, tCell.h)}
        {k === "add" && !free && !S.add && (
          <g>
            <Key id="add29" label={tx("Add 29 Feb")} x={152} y={392} w={240} h={84} C={C} tone="key" disabled={!live || stage !== "ask"} onClick={ui(() => { mark(); add29(); })}>
              <text y={12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={!live || stage !== "ask" ? mix(C.ink, C.panel, 0.4) : toneInk("key", C.ink)}>{tx("Add 29 Feb")}</text>
            </Key>
            {!S.add && stage === "ask" && invite(152, 392, 240, 84)}
          </g>
        )}
        <g pointerEvents="none">
          {k === "year" && tbShown >= 2 && it.choices && years.filter((y) => mcLeap(y)).map((y) => { const c = mcYearCell(years.indexOf(y)); return (
            <rect key={"l" + y} x={c.x + 4} y={c.y + 4} width={c.w - 8} height={c.h - 8} rx={10} fill="none" stroke={MC_VIOLET} strokeWidth={4} />
          ); })}
          {k === "year" && tbShown >= 2 && !it.choices && <rect x={c29.x + 4} y={c29.y + 4} width={c29.w - 8} height={c29.h - 8} rx={4} fill="none" stroke={MC_AMBER} strokeWidth={5} />}
          {k === "year" && tbShown >= 2 && !it.choices && chip(560, 192, 340, 60, MC_AMBER, ["365", "+", "1", "=", "366"])}
          {k === "year" && tbShown >= 3 && !it.choices && chip(560, 262, 340, 60, MC_GREEN, "366 " + tx("days"))}
          {k === "year" && tbShown >= 3 && it.choices && chip(560, 192, 340, 68, MC_GREEN, tx("Not a leap year"))}
          {k === "year" && tbShown >= 2 && it.choices && legend([[MC_VIOLET, "Leap year"]], 566, 282)}
          {k === "add" && tbShown >= 2 && chip(560, 192, 340, 60, MC_AMBER, tx("Year") + " 365 " + tx("days"))}
          {k === "add" && tbShown >= 3 && chip(560, 262, 340, 60, MC_GREEN, tx("Leap year") + " 366 " + tx("days"))}
        </g>
      </g>
    );
  };

  /* phases 3 and 4 (and free play): a month's calendar */
  /* Hindi header names take phase 4's (smaller) fitted size in phase 3 too, so their ink keeps 6+ above and below */
  const headSz = lang === "hi" ? Math.min(mcFit(MC_DAYS.map((x) => tx(x)), MC_G.cw, 9), mcFit(MC_DAYS.map((x) => tx(x)), MC_G4.cw, 9)) : mcFit(MC_DAYS.map((x) => tx(x)), MC_G.cw, 9);
  const grid = (cellFill: (idx: number) => string | null, headFill: (c: number) => string | null) => (
    <g>
      {it.title ? <text x={MC_G.x} y={MC_G.head - 18} fontSize={T.label} fontWeight={700} fill={MC_INK}>{tx(it.title)}</text> : null}
      {MC_DAYS.map((d, c) => { const hf = headFill(c); return (
        <g key={d}>
          <rect x={MC_G.x + c * MC_G.cw} y={MC_G.head} width={MC_G.cw} height={MC_G.headH} fill={hf || C.panel} stroke={MC_INK} strokeWidth={2.4} />
          <text x={MC_G.x + c * MC_G.cw + MC_G.cw / 2} y={mcRowBase(MC_DAYS.map((x) => tx(x)), headSz, MC_G.head, MC_G.headH)} textAnchor="middle" fontSize={headSz} fontWeight={700} fill={hf ? "#FFFFFF" : MC_INK}>{tx(d)}</text>
        </g>
      ); })}
      {Array.from({ length: 7 * MC_G.rows }, (_, idx) => { const c = mcCell(idx), f = cellFill(idx); return f === null
        ? <rect key={idx} x={c.x + 3} y={c.y + 3} width={c.w - 6} height={c.h - 6} rx={6} fill="none" stroke={C.rule} strokeWidth={1.5} strokeDasharray="6 6" />
        : <rect key={idx} x={c.x} y={c.y} width={c.w} height={c.h} fill={f} stroke={MC_INK} strokeWidth={2.4} />; })}
    </g>
  );
  const dateText = (idx: number, d: number, col: string, white = false) => { const c = mcCell(idx); return (
    <text key={"d" + idx} x={c.x + c.w / 2} y={c.y + 44} textAnchor="middle" fontSize={T.prompt - 4} fontWeight={700} fill={white ? "#FFFFFF" : col}>{d}</text>
  ); };

  const drawJump = () => {
    const first = it.st, last = it.st + it.len - 1;
    const tracing = !won && (tbRun || S.tb > 0);
    const landed = Array.from({ length: tracing ? Math.min(Math.max(0, S.tb - 1), it.need) : S.jumps }, (_, j) => it.st + it.from - 1 + 7 * (j + 1));
    const src = it.st + srcDate() - 1, sc = mcCell(src);
    const fromIdx = it.st + it.from - 1;
    const dd = drag.drag;
    /* the pill waits in the landing cell, under the date it jumps from */
    const tc = mcCell(src + 7);
    if (dd && !dragStart.current) dragStart.current = { x: dd.x, y: dd.y };
    const pillX = dd ? dd.x : tc.x + tc.w / 2, pillY = dd ? dd.y : tc.y + tc.h / 2;
    const live = !free && (demo || stage === "ask") && !S.tb && canJump();
    /* the correction: the jumps the child has not made, each date written, then (a day question) the count along the row */
    const tbJ = Math.min(Math.max(0, tbShown - 1), it.need);
    const tbDates = Array.from({ length: tbJ }, (_, j) => it.from + 7 * (j + 1));
    const along = it.choices ? Math.max(0, Math.min(4, tbShown - 1 - it.need)) : 0;
    const lastJ = it.from + 7 * it.need;
    const tbEnd = tbShown >= mcTbMax(it);
    const ansIdx = it.choices ? it.st + lastJ + 4 - 1 : -1;
    const nArc = tracing ? tbJ : Math.max(S.jumps, tbJ);
    const ansName = ansIdx >= 0 ? tx(MC_DAY_FULL[ansIdx % 7]) : "", chipSz = mcFit([ansName], MC_G.cw - 8, 8), dayChipW = Math.max(mcTextW(ansName, chipSz) + 16, Math.min(mcTextW(ansName, chipSz) + 28, MC_G.cw - 8));
    /* a word that does not fit the column even at the 28 floor (en "Thursday", "Wednesday") keeps 8 each side and spans the empty cells beside it */
    const chipX = Math.max(MC_G.x + 8, Math.min(MC_G.x + 7 * MC_G.cw - 8 - dayChipW, MC_G.x + (ansIdx % 7 + 0.5) * MC_G.cw - dayChipW / 2));
    const lgX = 352;
    return (
      <g>
        {grid((idx) => (idx < first || idx > last ? null : idx === fromIdx ? MC_BLUE : landed.includes(idx) ? tint(MC_VIOLET, 0.45) : "#FFFFFF"),
          (c) => (tbEnd && it.choices && c === ansIdx % 7 ? MC_GREEN : null))}
        <rect x={MC_G.x} y={MC_G.top} width={7 * MC_G.cw} height={MC_G.rows * MC_G.ch} fill="none" stroke={MC_INK} strokeWidth={4.5} />
        {dateText(fromIdx, it.from, MC_INK, true)}
        {warmup && landed.map((idx, j) => dateText(idx, it.from + 7 * (j + 1), MC_INK))}
        {canJump() && !free && !(won) && (
          <g {...(live ? control("jump", tx("Jump 7 days down")) : {})} {...(live ? drag.bind({ src }) : {})} {...(live ? drag.keys({ src }) : {})}
            aria-disabled={live ? undefined : "true"} style={{ cursor: live ? "grab" : "default" } as any}
            onPointerDownCapture={() => mark()}>
            <rect x={sc.x} y={sc.y} width={sc.w} height={sc.h} fill="transparent" />
            <g filter="url(#fShadowSoft)">
              <rect x={pillX - pillW / 2} y={pillY - pillH / 2} width={pillW} height={pillH} rx={pillH / 2} fill="url(#mcPillViolet)" stroke="#FFFFFF" strokeWidth={2} />
              <text x={pillX} y={pillY + (lang === "gu" ? 5 : dev ? 6 : 8)} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill="#FFFFFF">{tx("Jump")}</text>
            </g>
          </g>
        )}
        {/* the one invite: a ring hugging the pill that blinks (no growth, so it never reaches a rule); still under reduced motion */}
        {live && !dd && !won && !S.tb && (
          <rect x={pillX - pillW / 2 - 2} y={pillY - pillH / 2 - 2} width={pillW + 4} height={pillH + 4} rx={pillH / 2 + 2} fill="none"
            stroke={(THEME && THEME.enter && THEME.enter[1]) || C.accent} strokeWidth={2.5} pointerEvents="none">
            {!reducedMotion() && <animate attributeName="stroke-opacity" values="1;0.25;1" dur="1.6s" repeatCount="indefinite" />}
          </rect>
        )}
        <g pointerEvents="none">
          {S.tb === 1 && !won && (() => { const rc = mcCell(fromIdx - (fromIdx % 7)); return (
            <rect x={rc.x + 4} y={rc.y + 4} width={7 * MC_G.cw - 8} height={MC_G.ch - 8} rx={8} fill="none" stroke={MC_AMBER} strokeWidth={6} strokeDasharray="14 8" />
          ); })()}
          {tbDates.map((d, j) => { const idx = it.st + d - 1, c = mcCell(idx); return (
            <g key={"t" + j}>
              <rect x={c.x + 4} y={c.y + 4} width={c.w - 8} height={c.h - 8} rx={6} fill={tbEnd && !it.choices ? tint(MC_GREEN, 0.6) : tint(MC_VIOLET, 0.45)} />
              {dateText(idx, d, tbEnd && !it.choices ? deep(MC_GREEN) : MC_INK)}
            </g>
          ); })}
          {Array.from({ length: along }, (_, j) => { const d = lastJ + j + 1, idx = it.st + d - 1, c = mcCell(idx), isAns = tbEnd && j === 3; return (
            <g key={"g" + j}>
              {isAns && <rect x={c.x + 4} y={c.y + 4} width={c.w - 8} height={c.h - 8} rx={6} fill={tint(MC_GREEN, 0.75)} />}
              {dateText(idx, d, isAns ? deep(MC_GREEN) : MC_INK)}
            </g>
          ); })}
          {/* one violet arc per jump, date to date, with its +7 */}
          {Array.from({ length: nArc }, (_, j) => { const a = mcCell(fromIdx + 7 * j), b = mcCell(fromIdx + 7 * (j + 1)), cx = a.x + a.w / 2; return (
            <g key={"arc" + j}>
              <path d={`M ${cx + 34} ${a.y + a.h - 12} Q ${cx + 58} ${a.y + a.h + 1} ${cx + 34} ${b.y + 14}`} fill="none" stroke={MC_VIOLET} strokeWidth={4} strokeLinecap="round" />
              <circle cx={cx + 34} cy={b.y + 14} r={5} fill={MC_VIOLET} />
              <text x={(fromIdx % 7) === 6 ? a.x - 30 : a.x + a.w + 30} y={a.y + a.h - 12} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={deep(MC_VIOLET)} stroke="#FFFFFF" strokeWidth={4} paintOrder="stroke">+7</text>
            </g>
          ); })}
          {tbEnd && it.choices && chip(chipX, MC_G.top + (MC_G.ch - 50) / 2, dayChipW, 50, MC_GREEN, ansName, chipSz)}
        </g>
        {legend([[MC_BLUE, "Given"], [MC_VIOLET, "Jump"], [MC_GREEN, "Answer"]], lgX, lang === "gu" ? -6 : -4, true)}
      </g>
    );
  };

  const drawWeeks = () => {
    const first = st, last = st + len - 1, next = last + 1;
    const cutN = S.cut ? 4 : S.cutN;
    const weekOf = (idx: number) => Math.floor((idx - st) / 7);   /* 0..3 whole weeks, 4 = left over */
    const showNext = free ? S.hopped : tbShown >= 3;
    const hopN = S.hopped || tbShown >= 1 ? len - 28 : S.hop;   /* the days left over that the hand has jumped */
    const seqKey = !S.cut ? "weeks" : !S.hopped ? "jumpon" : free ? "weeks" : null;
    const dayChipW = mcTextW(tx(MC_DAY_FULL[next % 7]), T.label) + 28;
    return (
      <g>
        {grid((idx) => (idx < first ? null : idx > last ? "#FFFFFF" : idx === first ? MC_BLUE
          : weekOf(idx) < cutN && weekOf(idx) < 4 ? (weekOf(idx) % 2 ? "#DCD5C8" : "#EAE5DB") : weekOf(idx) >= 4 && idx - st - 28 < hopN ? tint(MC_AMBER, 0.4) : "#FFFFFF"),
          (c) => (showNext && c === next % 7 ? MC_GREEN : null))}
        <rect x={MC_G.x} y={MC_G.top} width={7 * MC_G.cw} height={MC_G.rows * MC_G.ch} fill="none" stroke={MC_INK} strokeWidth={4.5} />
        {dateText(first, 1, MC_INK, true)}
        {mcCuts(st).slice(0, cutN).map((p, j) => (
          <line key={"c" + j} x1={p.x} y1={p.y - MC_G.ch / 2} x2={p.x} y2={p.y + MC_G.ch / 2} stroke={MC_INK} strokeWidth={8} strokeLinecap="butt" pointerEvents="none" />
        ))}
        <g pointerEvents="none">
          {Array.from({ length: hopN }, (_, j) => { const a = mcCell(st + 27 + j), b = mcCell(st + 28 + j), wrap = (st + 28 + j) % 7 === 0; return (
            <path key={"h" + j} d={wrap ? `M ${b.x + 8} ${b.y + 8} Q ${b.x + b.w * 0.3} ${b.y - 16} ${b.x + b.w / 2} ${b.y + 6}`
              : `M ${a.x + a.w / 2} ${a.y + 6} Q ${(a.x + b.x + b.w) / 2} ${Math.min(a.y, b.y) - 26} ${b.x + b.w / 2} ${b.y + 6}`}
              fill="none" stroke={MC_VIOLET} strokeWidth={4} strokeLinecap="round" />
          ); })}
          {Array.from({ length: hopN }, (_, j) => { const b = mcCell(st + 28 + j), x = b.x + b.w / 2, y = b.y + 10; return <path key={"he" + j} d={`M ${x - 6} ${y - 7} L ${x + 6} ${y - 7} L ${x} ${y} Z`} fill={MC_VIOLET} />; })}
          {tbShown >= 2 && !free && Array.from({ length: len - 28 }, (_, j) => { const c = mcCell(st + 28 + j); return (
            <text key={"l" + j} x={c.x + c.w / 2} y={c.y + 46} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={MC_INK}>{j + 1}</text>
          ); })}
          {showNext && (() => { const c = mcCell(next); return (
            <g transform={`translate(0, ${won ? drop : 0})`}>
              <rect x={c.x + 4} y={c.y + 4} width={c.w - 8} height={c.h - 8} rx={6} fill={MC_GREEN} />
              {dateText(next, 1, MC_INK, true)}
            </g>
          ); })()}
          {showNext && !free && chip(MC_COL + 6, 272, dayChipW, 50, MC_GREEN, tx(MC_DAY_FULL[next % 7]))}
        </g>
        {free ? (
          <g>
            <Key id="days" label={tx("Days")} x={MC_COL + 6} y={272} w={200} h={72} C={C} tone="key" onClick={ui(() => put({ len: S.len >= 31 ? 28 : S.len + 1, cut: false, cutN: 0, hop: 0, hopped: false }))}>
              <text y={12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{len + " " + tx("days")}</text>
            </Key>
            <Key id="start" label={tx("First day")} x={MC_COL + 6} y={356} w={200} h={72} C={C} tone="key" onClick={ui(() => put({ st: (S.st + 1) % 7, cut: false, cutN: 0, hop: 0, hopped: false }))}>
              <text y={12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{tx(MC_DAYS[st])}</text>
            </Key>
            {seqKey && <Key key="seq" id={seqKey} label={tx(seqKey === "weeks" ? "Weeks" : "Jump")} x={MC_COL + 6} y={440} w={200} h={72} C={C} tone="key"
              onClick={ui(() => (seqKey === "weeks" ? cutWeeks() : hopOn()))}>
              <text y={12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{tx(seqKey === "weeks" ? "Weeks" : "Jump")}</text>
            </Key>}
          </g>
        ) : seqKey && (
          <g>
            {/* ONE key whose label follows the act: Weeks, then Jump (PATTERNS §16c) */}
            <Key key="seq" id={seqKey} label={tx(seqKey === "weeks" ? "Weeks" : "Jump")} x={MC_COL + 6} y={420} w={200} h={88} C={C} tone="key" disabled={!!S.tb || !(demo || stage === "ask")}
              onClick={ui(() => { mark(); if (seqKey === "weeks") cutWeeks(); else hopOn(); })}>
              <text y={12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={!!S.tb || !(demo || stage === "ask") ? mix(C.ink, C.panel, 0.4) : toneInk("key", C.ink)}>{tx(seqKey === "weeks" ? "Weeks" : "Jump")}</text>
            </Key>
            {(demo || stage === "ask") && invite(MC_COL + 6, 420, 200, 88)}
          </g>
        )}
        {legend(free ? [[MC_BLUE, "Day 1"], ["#DCD5C8", "Weeks"], [MC_AMBER, "Left over"], [MC_VIOLET, "Jump"], [MC_GREEN, "Next month"]]
          : [[MC_BLUE, "Given"], ["#DCD5C8", "Weeks"], [MC_AMBER, "Left over"], [MC_VIOLET, "Jump"], [MC_GREEN, "Answer"]])}
      </g>
    );
  };

  /* the jump token is dragged down a column (a tap or Enter jumps too, by the hand) */
  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (k !== "jump") return;
    const now = Date.now();
    if (now - lastPress.current < 400 || held() || (demo && !stepOn)) return;
    lastPress.current = now;
    const b = mcCell(pay.src + 7);
    const st0 = dragStart.current; dragStart.current = null;
    if (!moved) { jump(true); if (isNaN(p.x)) { const a: any = document.activeElement; if (a && a.blur) a.blur(); } return; }
    if (st0 && p.y - st0.y >= 36 && Math.abs(p.x - (b.x + b.w / 2)) < b.w) { jump(false); return; }
    if (demo) api.did("jump-short");
    else if (stage === "ask" && !actDone && userMode()) mcSayNudge();
  });

  return (
    <g ref={rootRef} onPointerDownCapture={mark}>
      <defs>
        <linearGradient id="mcPillViolet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9164C6" />
          <stop offset="100%" stopColor="#673F94" />
        </linearGradient>
        <linearGradient id="mcCardPaper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F8F6F0" />
        </linearGradient>
      </defs>
      {k === "rows" ? drawRows() : k === "cards" ? drawCards() : k === "year" || k === "add" ? drawFeb() : k === "jump" ? drawJump() : drawWeeks()}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase (digits and shapes only, so every language reads it) */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const item = it || (result && result.last && PHASES[n - 1] && PHASES[n - 1].items[result.last.item]) || {};
  const v = result && result.last ? result.last.value : null;
  if (v === null || v === undefined) return null;
  const frame = <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} filter="url(#fShadowSoft)" />;
  const ink = shade(MC_GREEN, 0.25);
  const di = MC_DAY_IDS.indexOf(String(v));
  if (item.choices && di >= 0) {
    /* a day: a week strip with that day's cell green */
    const cw = (w * 0.55 - 12) / 7, y = h / 2 - 13;
    return (
      <g>{frame}
        {MC_DAY_IDS.map((_, c) => <rect key={c} x={12 + c * cw} y={y} width={cw} height={36} fill={c === di ? MC_GREEN : "#FFFFFF"} stroke={MC_INK} strokeWidth={2} />)}
        <rect x={12} y={y - 10} width={7 * cw} height={10} fill={MC_BLUE} stroke={MC_INK} strokeWidth={1.5} />
        <text x={w - 14} y={h / 2 + T.label * 0.36} textAnchor="end" fontSize={T.label} fontWeight={700} fill={ink}>{tx(MC_DAYS[di])}</text>
      </g>
    );
  }
  if (item.choices) {
    /* a year that is not a leap year: its February of 28 cells, and the year */
    const cw = 8, ch = 7, x0 = 14, y0 = h / 2 - 2 * ch;
    return (
      <g>{frame}
        {Array.from({ length: 28 }, (_, d) => <rect key={d} x={x0 + (d % 7) * cw} y={y0 + Math.floor(d / 7) * ch} width={cw} height={ch} fill="#FFFFFF" stroke={MC_INK} strokeWidth={1.2} />)}
        <text x={x0 + 7 * cw + 12} y={h / 2 + 10} fontSize={T.micro} fontWeight={700} fill={ink}>{item.yr || ""}</text>
        <text x={w - 12} y={h / 2 + 10} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={ink}>{tx(String(v) === "no" ? "No" : "Yes")}</text>
      </g>
    );
  }
  const text = (item.parts ? slotPartsOf(v, item.parts.length).join(", ") : String(v)) + (item.unit ? " " + tx(item.unit) : "");
  /* the small calendar icon at the left, the answer right-aligned with at least 12 clear of it */
  const size = mcTextW(text, T.label) <= w - 12 - 56 - 12 ? T.label : T.micro;
  return (
    <g>{frame}
      <rect x={12} y={h / 2 - 20} width={40} height={40} rx={5} fill="#FFFFFF" stroke={MC_INK} strokeWidth={2} />
      <rect x={12} y={h / 2 - 20} width={40} height={11} rx={4} fill={MC_BLUE} />
      <line x1={12} y1={h / 2 + 5} x2={52} y2={h / 2 + 5} stroke={MC_INK} strokeWidth={1.5} />
      <line x1={32} y1={h / 2 - 9} x2={32} y2={h / 2 + 20} stroke={MC_INK} strokeWidth={1.5} />
      <text x={w - 12} y={h / 2 + size * 0.36} textAnchor="end" fontSize={size} fontWeight={700} fill={ink}>{text}</text>
    </g>
  );
}

function MonthCalendar(props: any) {
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

export default MonthCalendar;