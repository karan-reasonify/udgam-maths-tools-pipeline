/* ═══ M1.S2.T6.C28.2D1 · calendar_explorer · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, the sound effects, the printed bubble, scoring, the
   events, idle and restart. THE LESSON IS SILENT (runtime r30): nothing is spoken; every line is
   printed on the bubble, which is the guide. The lesson is action-driven: nothing moves on unless the
   child acts. THE NEW LOOK (keyOnly, navDots): the question lives only in the bubble; every act is
   performed on screen (api.act). Edit, never rewrite. Concepts are verbatim (check compares them).

   Calendar Explorer: a real wall calendar, computed for its real year (the weekday of the 1st and the
   days of each month come from ceDow / ceLen below, never typed in), two drawn fists for the knuckle
   method, a four-year strip with a year ruler for leap years, and a pencil that circles a date and
   hops seven days at a time. No skins: the image pass made none on purpose (every element is the
   maths, drawn in code). */

const TOOL_ID = "calendar_explorer";
const MEDIA_ID = "M1.S2.T6.C28.2D1";
const TOOL_NAME = "Calendar Explorer";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (not shown: phase 1 has steps) */
const OPENING = ["A calendar on the wall, waiting to be flipped."];
/* the whole-tool line (not shown from r44; kept for the sidecar) */
const FINISH_LINE = "You found each day by counting weeks and months.";
/* printed when the child opens Free play: everything it names is live in the free branch of Work */
const FREE_LINE = "Free play: flip the months, circle a date and hop in sevens.";

/* THE START PAGE (docs/LAYOUT.md §1c): a wall calendar with blank boxes (no date is drawn: dates are answers here)
   and the two fists of the knuckle method */
const START_HOOK = "How can two fists tell you the days in each month?";
function StartArt({ box, C, lang, tx }: any) {
  const px = 150, py = 40, cw = 42, ch = 38, gx = px + 3, gy = py + 56 + 30;
  return (
    <g>
      <defs>
        <filter id="sa-sh" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.12" />
        </filter>
      </defs>
      <path d={`M ${px + 60} ${py + 4} L ${px + 150} ${py - 24} L ${px + 240} ${py + 4}`} fill="none" stroke="#6B5B45" strokeWidth={3.5} strokeLinecap="round" />
      <circle cx={px + 150} cy={py - 24} r={7} fill="#6B5B45" stroke="#FFFDF7" strokeWidth={2} />
      <rect x={px} y={py} width={300} height={56 + 30 + 5 * ch + 10} rx={16} fill={CE.paper} stroke={CE.ink} strokeWidth={3} filter="url(#sa-sh)" />
      <path d={`M ${px} ${py + 56} V ${py + 16} Q ${px} ${py} ${px + 16} ${py} H ${px + 284} Q ${px + 300} ${py} ${px + 300} ${py + 16} V ${py + 56} Z`} fill={CE.ink} />
      <text x={px + 150} y={py + 38} textAnchor="middle" fontSize={T.label} fontWeight={700} fill="#FFFFFF">2026</text>
      <rect x={gx} y={py + 56} width={7 * cw} height={30} fill="#F2E4CE" stroke={CE.ink} strokeWidth={2} />
      {Array.from({ length: 35 }, (_, k) => {
        const r = Math.floor(k / 7), c = k % 7, hop = c === 3 && r < 4;
        return <rect key={k} x={gx + c * cw} y={gy + r * ch} width={cw} height={ch} fill={hop ? mix(CE.hop, "#FFFFFF", 0.6) : "#FFFFFF"} stroke={CE.ink} strokeWidth={2} />;
      })}
      {[0, 1, 2].map((r) => (
        <path key={r} d={`M ${gx + 3 * cw + 26} ${gy + r * ch + 22} Q ${gx + 3 * cw + 52} ${gy + r * ch + 38} ${gx + 3 * cw + 26} ${gy + (r + 1) * ch + 14}`} fill="none" stroke="#4A4A4A" strokeWidth={3.5} strokeLinecap="round" />
      ))}
      {ceFistG(590, 30, 1.45, true, CE_FIST.show)}{ceFistG(850, 30, 1.45, false, CE_FIST.show)}
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): filled at the language pass, once the English is final. */
const TR: any = {
  hi: {
    "2046": "2046",
    "2048": "2048",
    "Calendar Explorer": "कैलेंडर की खोज",
    "Free play: flip the months, circle a date and hop in sevens.": "मुक्त खेल: महीने पलटो, तारीख पर घेरा लगाओ और सात-सात कूदो।",
    "How can two fists tell you the days in each month?": "दो मुट्ठियाँ महीने के दिन कैसे बताती हैं?",
    "A calendar on the wall, waiting to be flipped.": "दीवार पर एक कैलेंडर, पलटे जाने के इंतज़ार में।",
    "You found each day by counting weeks and months.": "तुमने सप्ताह और महीने गिनकर हर दिन ढूँढा।",
    "Days, weeks, months and a year": "दिन, सप्ताह, महीने और एक वर्ष",
    "Flip the pages of the wall calendar.": "दीवार कैलेंडर के पन्ने पलटो।",
    "Tap a full row of the calendar to count one week.": "एक सप्ताह गिनने के लिए कैलेंडर की एक पूरी पंक्ति पर टैप करो।",
    "Pick a row with a date in every box.": "ऐसी पंक्ति चुनो जिसके हर खाने में तारीख हो।",
    "Tap the January card to see how many days it has.": "जनवरी के कार्ड पर टैप करो और देखो उसमें कितने दिन हैं।",
    "January is the first month card.": "जनवरी पहला महीना-कार्ड है।",
    "Now tap the arrow on the page to turn to February.": "अब फ़रवरी पर जाने के लिए पन्ने के तीर पर टैप करो।",
    "The arrow is at the right end of the dark bar.": "तीर काली पट्टी के दाएँ सिरे पर है।",
    "Count the days one row of seven at a time.": "सात-सात की एक-एक पंक्ति करके दिन गिनो।",
    "Try it on one month of the calendar first.": "पहले कैलेंडर के एक महीने पर करके देखो।",
    "A week has 7 days, and a year has 365 days, a little more than 52 weeks.": "एक सप्ताह में 7 दिन, और एक वर्ष में 365 दिन, 52 सप्ताह से थोड़ा ज़्यादा।",
    "You learned: 7 days make a week, and a year has 365 days.": "तुमने सीखा: 7 दिन का एक सप्ताह, और एक वर्ष में 365 दिन।",
    "A school trip lasts 4 weeks, so how many days is that?": "स्कूल की यात्रा 4 सप्ताह की है, तो यह कितने दिन की हुई?",
    "4 weeks = ? days": "4 सप्ताह = ? दिन",
    "Each full row is one week of 7 days; count the days in 4 rows.": "हर पूरी पंक्ति 7 दिनों का एक सप्ताह है, 4 पंक्तियों के दिन गिनो।",
    "Count the lit boxes row by row, in sevens.": "चमकते खानों को पंक्ति-पंक्ति करके सात-सात में गिनो।",
    "Add 7 four times: 7, 14, then two more sevens.": "7 को चार बार जोड़ो: 7, 14, फिर दो और सात।",
    "Yes, 4 weeks of 7 days make 28 days.": "हाँ, 7 दिनों के 4 सप्ताह यानी 28 दिन।",
    "days": "दिन",
    "A wall calendar has one page for each month, so how many pages does it have?": "दीवार कैलेंडर में हर महीने का एक पन्ना है, तो उसमें कितने पन्ने हैं?",
    "Pages in a year?": "एक वर्ष में पन्ने?",
    "Count every month card from January to December.": "जनवरी से दिसंबर तक हर महीना-कार्ड गिनो।",
    "Each month card stands for one page of the calendar.": "हर महीना-कार्ड कैलेंडर का एक पन्ना है।",
    "The lit cards stop at November; add December too.": "चमकते कार्ड नवंबर पर रुकते हैं, दिसंबर को भी जोड़ो।",
    "Yes, 12 months make 12 pages.": "हाँ, 12 महीने यानी 12 पन्ने।",
    "pages": "पन्ने",
    "A bus pass is good for 52 weeks and 1 more day; how many days does it last?": "एक बस पास 52 सप्ताह और 1 दिन चलता है, वह कुल कितने दिन चलता है?",
    "52 weeks + 1 day?": "52 सप्ताह + 1 दिन?",
    "Find the days in 52 weeks first, then add the extra day.": "पहले 52 सप्ताह के दिन निकालो, फिर बचा एक दिन जोड़ो।",
    "52 weeks make 364 days, as the week counter shows.": "सप्ताह-गिनती दिखाती है कि 52 सप्ताह में 364 दिन होते हैं।",
    "Look for the day left over after the 52 weeks.": "52 सप्ताह के बाद बचा हुआ दिन ढूँढो।",
    "Yes, 364 days and 1 more make 365 days, a whole year.": "हाँ, 364 दिन और 1 दिन मिलकर 365 दिन, यानी पूरा एक वर्ष।",
    "How many days in a month: the knuckle method": "एक महीने में कितने दिन: मुट्ठी की विधि",
    "Say the months along the knuckles and the dips.": "उभारों और गड्ढों पर महीनों के नाम बोलो।",
    "Tap the January card to put it on the first knuckle.": "जनवरी के कार्ड पर टैप करो, वह पहले उभार पर जाएगा।",
    "January is the first card in the row.": "पहला कार्ड जनवरी का है।",
    "Now put February in the dip next to it.": "अब फ़रवरी को उसके पास वाले गड्ढे में रखो।",
    "Tap the February card, the second in the row.": "फ़रवरी के कार्ड पर टैप करो, वह पंक्ति में दूसरा है।",
    "March goes on the next knuckle, so tap its card.": "मार्च अगले उभार पर जाता है, उसके कार्ड पर टैप करो।",
    "March is the third card in the row.": "मार्च पंक्ति का तीसरा कार्ड है।",
    "Start at January on the first knuckle and say each month in turn.": "पहले उभार पर जनवरी से शुरू करो और बारी-बारी हर महीना बोलो।",
    "Go from the last knuckle of the first fist to the first knuckle of the second.": "पहली मुट्ठी के आख़िरी उभार से दूसरी मुट्ठी के पहले उभार पर जाओ।",
    "Knuckle months have 31 days, dip months have 30, and February has 28 or 29.": "उभार वाले महीने में 31 दिन, गड्ढे वाले में 30, फ़रवरी में 28 या 29।",
    "You learned: knuckle months have 31 days and dip months have 30.": "तुमने सीखा: उभार वाले महीने में 31 दिन, गड्ढे वाले में 30।",
    "Is July a knuckle or a dip month, and how many days does July have?": "जुलाई उभार वाला महीना है या गड्ढे वाला, और उसमें कितने दिन हैं?",
    "Days in July?": "जुलाई में दिन?",
    "Say the months along the fist from January to find where July goes.": "जुलाई की जगह ढूँढने के लिए जनवरी से मुट्ठी पर महीने बोलो।",
    "July comes just after June, which sits in a dip.": "जुलाई, जून के ठीक बाद आता है, और जून गड्ढे में है।",
    "Count one more spot after June's dip to find July's.": "जुलाई की जगह के लिए जून के गड्ढे के बाद एक जगह और गिनो।",
    "Yes, July is a knuckle month with 31 days.": "हाँ, जुलाई उभार वाला महीना है, उसमें 31 दिन हैं।",
    "A school term ends in June; use the fists to find how many days June has.": "मुट्ठियों से बताओ, जून में कितने दिन होते हैं?",
    "Days in June?": "जून में दिन?",
    "Count along from April: May, then June.": "अप्रैल से आगे गिनो: मई, फिर जून।",
    "June sits between the May and July knuckles.": "जून, मई और जुलाई के उभारों के बीच है।",
    "Check whether June's spot is a knuckle or a dip.": "देखो जून की जगह उभार है या गड्ढा।",
    "Yes, June is a dip month with 30 days.": "हाँ, जून गड्ढे वाला महीना है, उसमें 30 दिन हैं।",
    "Which has more days, September or October, and how many more?": "किसमें ज़्यादा दिन हैं, सितंबर या अक्टूबर, और कितने ज़्यादा?",
    "How many more days?": "कितने दिन ज़्यादा?",
    "Say August, September, October along the second fist to find their own spots.": "दूसरी मुट्ठी पर अगस्त, सितंबर, अक्टूबर बोलो, जगह ढूँढो।",
    "September sits in a dip and October on a knuckle.": "सितंबर गड्ढे में है और अक्टूबर उभार पर।",
    "Take September's days away from October's days.": "अक्टूबर के दिनों में से सितंबर के दिन घटाओ।",
    "Yes, October has 1 more day.": "हाँ, अक्टूबर में 1 दिन ज़्यादा है।",
    "more day": "दिन ज़्यादा",
    "Leap year: every fourth year has 366 days": "लीप वर्ष: हर चौथे वर्ष में 366 दिन",
    "Look at the four Februaries on the strip.": "पट्टी पर चारों फ़रवरी देखो।",
    "Tap 2026 on the strip to see its February.": "पट्टी के 2026 पर टैप करो और उसकी फ़रवरी देखो।",
    "2026 is the first year on the strip.": "2026 पट्टी का पहला वर्ष है।",
    "Now tap 2028 and watch its February grow a day.": "अब 2028 पर टैप करो और देखो उसकी फ़रवरी में एक दिन बढ़ता है।",
    "2028 is the third year on the strip.": "2028 पट्टी का तीसरा वर्ष है।",
    "Tap On 4 to step the marker four years on.": "निशान को चार वर्ष आगे ले जाने के लिए आगे 4 पर टैप करो।",
    "On 4 is the key under the year ruler.": "आगे 4 का बटन वर्ष-पैमाने के नीचे है।",
    "Count on in fours from a leap year.": "लीप वर्ष से चार-चार करके आगे गिनो।",
    "Only the years the marker lands on are leap years.": "निशान जिन वर्षों पर रुकता है, बस वही लीप वर्ष हैं।",
    "Every fourth year is a leap year, with 366 days and a 29 February.": "हर चौथा वर्ष लीप वर्ष है, उसमें 366 दिन और 29 फ़रवरी होती है।",
    "You learned: every fourth year is a leap year with 366 days.": "तुमने सीखा: हर चौथा वर्ष 366 दिनों का लीप वर्ष है।",
    "A school calendar is printed for 2044; how many days does its February have?": "स्कूल का कैलेंडर 2044 का है, उसकी फ़रवरी में कितने दिन हैं?",
    "February 2044?": "फ़रवरी 2044?",
    "Keep tapping On 4 from 2028 and watch the years it lands on.": "2028 से आगे 4 दबाते जाओ, निशान किन वर्षों पर रुकता है?",
    "Does the marker ever land on 2044?": "क्या निशान कभी 2044 पर रुकता है?",
    "A leap February has one more day than the February of 2026.": "लीप वर्ष की फ़रवरी में 2026 की फ़रवरी से एक दिन ज़्यादा होता है।",
    "Yes, leap year 2044 has a 29 February.": "हाँ, लीप वर्ष 2044 में 29 फ़रवरी होती है।",
    "A birthday card says 29 February; which year on the keys can have that date?": "कार्ड पर 29 फ़रवरी लिखा है, यह किस वर्ष में आ सकती है?",
    "Which year?": "कौन-सा वर्ष?",
    "Use On 4 once more from 2044.": "2044 से एक बार और आगे 4 दबाओ।",
    "An even year is not always a leap year.": "हर सम वर्ष लीप वर्ष नहीं होता।",
    "Which key is on the marker's path?": "कौन-सा बटन निशान के रास्ते पर है?",
    "Yes, 2048 is the next leap year.": "हाँ, 2048 अगला लीप वर्ष है।",
    "Last year was a leap year and the next one is 2048; what year is it now?": "पिछला वर्ष लीप वर्ष था और अगला 2048 है, अभी कौन-सा वर्ष है?",
    "This year?": "यह वर्ष?",
    "Go back from 2048 to the leap year just before it.": "2048 से पीछे, उससे ठीक पहले वाले लीप वर्ष पर जाओ।",
    "Tap Back 4 and see where the marker stops.": "पीछे 4 पर टैप करो और देखो निशान कहाँ रुकता है।",
    "This year is the year after the leap year the marker shows.": "यह वर्ष, निशान वाले लीप वर्ष के बाद का वर्ष है।",
    "Yes, it is 2045 now.": "हाँ, अभी 2045 है।",
    "Finding a day and a date on a calendar": "कैलेंडर पर दिन और तारीख ढूँढना",
    "Circle a date and hop seven days at a time.": "एक तारीख पर घेरा लगाओ और सात-सात दिन कूदो।",
    "Tap the 2nd to circle it with the pencil.": "2 तारीख पर टैप करो, पेंसिल उस पर घेरा लगाएगी।",
    "The 2nd is in the top row of the page.": "2 तारीख पन्ने की सबसे ऊपर वाली पंक्ति में है।",
    "Tap Hop 7: the circled date is not counted, so one hop is 7 days on.": "कूदो 7 पर टैप करो: घेरे वाली तारीख नहीं गिनी जाती, एक कूद 7 दिन आगे है।",
    "Hop 7 is the key under the week counter.": "कूदो 7 का बटन सप्ताह-गिनती के नीचे है।",
    "Hop again and see that the day stays the same.": "फिर से कूदो और देखो कि दिन वही रहता है।",
    "Tap Hop 7 one more time.": "कूदो 7 पर एक बार और टैप करो।",
    "Hop 7 days and read the day at the top of the column.": "7 दिन कूदो और स्तंभ के ऊपर लिखा दिन पढ़ो।",
    "Hop once for every week the question names.": "प्रश्न में जितने सप्ताह हैं, उतनी बार कूदो।",
    "The same day of the week comes back every 7 days.": "हर 7 दिन बाद सप्ताह का वही दिन फिर आता है।",
    "You learned: the same weekday comes back every 7 days.": "तुमने सीखा: हर 7 दिन बाद वही दिन फिर आता है।",
    "A plant took from 3 to 31 October 2026 to flower; how many weeks is that?": "पौधे पर फूल आने में 3 से 31 अक्टूबर 2026 तक लगे, यह कितने सप्ताह हुए?",
    "Weeks, 3rd to 31st?": "3 से 31 तक सप्ताह?",
    "Circle the 3rd and hop in sevens to the 31st, not counting the 3rd.": "3 पर घेरा लगाओ और 3 को गिने बिना सात-सात करके 31 तक कूदो।",
    "Each hop is one week; count the hops, not the dates.": "हर कूद एक सप्ताह है, तारीखें नहीं, कूदें गिनो।",
    "Count each hop until the pencil reaches the ringed 31st.": "पेंसिल घेरे वाली 31 तारीख तक पहुँचे, तब तक हर कूद गिनो।",
    "Yes, 4 hops of 7 days make 4 weeks.": "हाँ, 7 दिन की 4 कूदें यानी 4 सप्ताह।",
    "weeks": "सप्ताह",
    "1 November 2026 is a Sunday; which day is a book due 2 weeks after the 6th?": "1 नवंबर 2026 रविवार है, 6 तारीख के 2 सप्ताह बाद कौन-सा दिन है?",
    "Due on which day?": "किस दिन लौटानी है?",
    "Circle the 6th and hop 7 days twice.": "6 पर घेरा लगाओ और 7 दिन दो बार कूदो।",
    "Each hop of 7 days stays in one column of the page.": "7 दिन की हर कूद पन्ने के एक ही स्तंभ में रहती है।",
    "Count from Sunday the 1st along the top row to the 6th.": "रविवार 1 तारीख से ऊपर वाली पंक्ति में 6 तक गिनो।",
    "Yes, 2 weeks on, it is Friday again.": "हाँ, 2 सप्ताह बाद फिर शुक्रवार है।",
    "The exam is on 24 June 2026 and 1 June is a Monday; which day is the exam?": "परीक्षा 24 जून 2026 को है और 1 जून सोमवार है, परीक्षा किस दिन है?",
    "Exam day?": "परीक्षा का दिन?",
    "Hop from Monday the 1st in sevens, then count on to the 24th.": "सोमवार 1 तारीख से सात-सात कूदो, फिर 24 तक आगे गिनो।",
    "The 22nd is a Monday too; count on from there.": "22 तारीख भी सोमवार है, वहाँ से आगे गिनो।",
    "Two days after a Monday is the day you want.": "सोमवार से दो दिन बाद वाला दिन ढूँढो।",
    "Yes, 24 June 2026 is a Wednesday.": "हाँ, 24 जून 2026 बुधवार है।",
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
    "Jan": "जन",
    "Feb": "फ़र",
    "Mar": "मार्च",
    "Apr": "अप्रै",
    "Jun": "जून",
    "Jul": "जुला",
    "Aug": "अग",
    "Sep": "सित",
    "Oct": "अक्टू",
    "Nov": "नव",
    "Dec": "दिस",
    "Sun": "रवि",
    "Mon": "सोम",
    "Tue": "मंगल",
    "Wed": "बुध",
    "Thu": "गुरु",
    "Fri": "शुक्र",
    "Sat": "शनि",
    "Su": "र",
    "Mo": "सो",
    "Tu": "मं",
    "We": "बु",
    "Th": "गु",
    "Fr": "शु",
    "Sa": "श",
    "Sunday": "रविवार",
    "Monday": "सोमवार",
    "Tuesday": "मंगलवार",
    "Wednesday": "बुधवार",
    "Thursday": "गुरुवार",
    "Friday": "शुक्रवार",
    "Saturday": "शनिवार",
    "Week counter": "सप्ताह-गिनती",
    "52 weeks": "52 सप्ताह",
    "1 day left": "1 दिन बचा",
    "Flip year": "वर्ष पलटो",
    "Count weeks": "सप्ताह गिनो",
    "Grid view": "सादी तालिका",
    "Wall view": "दीवार कैलेंडर",
    "Last month": "पिछला महीना",
    "Next month": "अगला महीना",
    "Calendar rows": "कैलेंडर की पंक्तियाँ",
    "Calendar dates": "कैलेंडर की तारीखें",
    "Leap year": "लीप वर्ष",
    "Back 4": "पीछे 4",
    "On 4": "आगे 4",
    "Hop 7": "कूदो 7",
    "28 or 29": "28 या 29",
    "Knuckle": "उभार",
    "Dip": "गड्ढा",
    "Circle the date": "तारीख पर घेरा",
    "First tap 4 full rows of the calendar.": "पहले कैलेंडर की 4 पूरी पंक्तियों पर टैप करो।",
    "First turn every page, or tap Flip year.": "पहले हर पन्ना पलटो, या वर्ष पलटो पर टैप करो।",
    "First tap Count weeks.": "पहले सप्ताह गिनो पर टैप करो।",
    "First put the July card on a knuckle or a dip.": "पहले जुलाई का कार्ड किसी उभार या गड्ढे पर रखो।",
    "First put the June card on a knuckle or a dip.": "पहले जून का कार्ड किसी उभार या गड्ढे पर रखो।",
    "First put the September and October cards on the fists.": "पहले सितंबर और अक्टूबर के कार्ड मुट्ठी पर रखो।",
    "First step the marker on with On 4.": "पहले आगे 4 से निशान को आगे बढ़ाओ।",
    "First tap On 4 to move the marker.": "पहले निशान चलाने के लिए आगे 4 पर टैप करो।",
    "First tap Back 4 to move the marker.": "पहले निशान चलाने के लिए पीछे 4 पर टैप करो।",
    "First circle the 3rd, then hop down to the 31st.": "पहले 3 पर घेरा लगाओ, फिर 31 तक कूदो।",
    "First circle the 6th, then hop twice.": "पहले 6 पर घेरा लगाओ, फिर दो बार कूदो।",
    "First circle the 1st, then hop to the 22nd.": "पहले 1 पर घेरा लगाओ, फिर 22 तक कूदो।",
    "Year": "वर्ष",
  },
  gu: {
    "2046": "2046",
    "2048": "2048",
    "Calendar Explorer": "કૅલેન્ડરની શોધ",
    "Free play: flip the months, circle a date and hop in sevens.": "મુક્ત રમત: મહિના ફેરવો, તારીખ પર ગોળ કરો અને સાત-સાત કૂદો.",
    "How can two fists tell you the days in each month?": "બે મુઠ્ઠી દરેક મહિનાના દિવસ કેવી રીતે કહી શકે?",
    "A calendar on the wall, waiting to be flipped.": "દીવાલ પર એક કૅલેન્ડર, ફેરવાવાની રાહ જુએ છે.",
    "You found each day by counting weeks and months.": "તમે અઠવાડિયાં અને મહિના ગણીને દરેક દિવસ શોધ્યો.",
    "Days, weeks, months and a year": "દિવસ, અઠવાડિયાં, મહિના અને એક વર્ષ",
    "Flip the pages of the wall calendar.": "દીવાલ કૅલેન્ડરનાં પાનાં ફેરવો.",
    "Tap a full row of the calendar to count one week.": "એક અઠવાડિયું ગણવા કૅલેન્ડરની એક આખી હરોળ પર ટૅપ કરો.",
    "Pick a row with a date in every box.": "એવી હરોળ પસંદ કરો જેના દરેક ખાનામાં તારીખ હોય.",
    "Tap the January card to see how many days it has.": "જાન્યુઆરીના કાર્ડ પર ટૅપ કરો અને જુઓ તેમાં કેટલા દિવસ છે.",
    "January is the first month card.": "જાન્યુઆરી પહેલું મહિના-કાર્ડ છે.",
    "Now tap the arrow on the page to turn to February.": "હવે ફેબ્રુઆરી પર જવા પાનાના તીર પર ટૅપ કરો.",
    "The arrow is at the right end of the dark bar.": "તીર કાળી પટ્ટીના જમણા છેડે છે.",
    "Count the days one row of seven at a time.": "સાત-સાતની એક-એક હરોળ કરીને દિવસ ગણો.",
    "Try it on one month of the calendar first.": "પહેલાં કૅલેન્ડરના એક મહિના પર કરી જુઓ.",
    "A week has 7 days, and a year has 365 days, a little more than 52 weeks.": "અઠવાડિયામાં 7 દિવસ, અને વર્ષમાં 365 દિવસ, 52 અઠવાડિયાંથી થોડું વધારે.",
    "You learned: 7 days make a week, and a year has 365 days.": "તમે શીખ્યા: 7 દિવસનું અઠવાડિયું, અને વર્ષમાં 365 દિવસ.",
    "A school trip lasts 4 weeks, so how many days is that?": "શાળાનો પ્રવાસ 4 અઠવાડિયાંનો છે, તો તે કેટલા દિવસ થયા?",
    "4 weeks = ? days": "4 અઠવાડિયાં = ? દિવસ",
    "Each full row is one week of 7 days; count the days in 4 rows.": "દરેક આખી હરોળ 7 દિવસનું અઠવાડિયું છે, 4 હરોળના દિવસ ગણો.",
    "Count the lit boxes row by row, in sevens.": "ચમકતાં ખાનાં હરોળ પ્રમાણે સાત-સાતમાં ગણો.",
    "Add 7 four times: 7, 14, then two more sevens.": "7 ને ચાર વાર ઉમેરો: 7, 14, પછી બીજા બે સાત.",
    "Yes, 4 weeks of 7 days make 28 days.": "હા, 7 દિવસનાં 4 અઠવાડિયાં એટલે 28 દિવસ.",
    "days": "દિવસ",
    "A wall calendar has one page for each month, so how many pages does it have?": "દીવાલ કૅલેન્ડરમાં દરેક મહિનાનું એક પાનું છે, તો તેમાં કેટલાં પાનાં છે?",
    "Pages in a year?": "એક વર્ષમાં પાનાં?",
    "Count every month card from January to December.": "જાન્યુઆરીથી ડિસેમ્બર સુધી દરેક મહિના-કાર્ડ ગણો.",
    "Each month card stands for one page of the calendar.": "દરેક મહિના-કાર્ડ કૅલેન્ડરનું એક પાનું છે.",
    "The lit cards stop at November; add December too.": "ચમકતાં કાર્ડ નવેમ્બરે અટકે છે, ડિસેમ્બર પણ ઉમેરો.",
    "Yes, 12 months make 12 pages.": "હા, 12 મહિના એટલે 12 પાનાં.",
    "pages": "પાનાં",
    "A bus pass is good for 52 weeks and 1 more day; how many days does it last?": "એક બસ પાસ 52 અઠવાડિયાં અને 1 દિવસ ચાલે છે, તે કુલ કેટલા દિવસ ચાલે?",
    "52 weeks + 1 day?": "52 અઠવાડિયાં + 1 દિવસ?",
    "Find the days in 52 weeks first, then add the extra day.": "પહેલાં 52 અઠવાડિયાંના દિવસ શોધો, પછી વધારાનો દિવસ ઉમેરો.",
    "52 weeks make 364 days, as the week counter shows.": "અઠવાડિયાં-ગણતરી બતાવે છે કે 52 અઠવાડિયાંમાં 364 દિવસ થાય.",
    "Look for the day left over after the 52 weeks.": "52 અઠવાડિયાં પછી બચેલો દિવસ શોધો.",
    "Yes, 364 days and 1 more make 365 days, a whole year.": "હા, 364 દિવસ અને 1 દિવસ મળીને 365 દિવસ, એટલે આખું એક વર્ષ.",
    "How many days in a month: the knuckle method": "એક મહિનામાં કેટલા દિવસ: મુઠ્ઠીની રીત",
    "Say the months along the knuckles and the dips.": "ઉભાર અને ખાડા પર મહિનાનાં નામ બોલો.",
    "Tap the January card to put it on the first knuckle.": "જાન્યુઆરીના કાર્ડ પર ટૅપ કરો, તે પહેલા ઉભાર પર જશે.",
    "January is the first card in the row.": "જાન્યુઆરી હરોળનું પહેલું કાર્ડ છે.",
    "Now put February in the dip next to it.": "હવે ફેબ્રુઆરીને તેની બાજુના ખાડામાં મૂકો.",
    "Tap the February card, the second in the row.": "ફેબ્રુઆરીના કાર્ડ પર ટૅપ કરો, તે હરોળમાં બીજું છે.",
    "March goes on the next knuckle, so tap its card.": "માર્ચ પછીના ઉભાર પર જાય છે, તેના કાર્ડ પર ટૅપ કરો.",
    "March is the third card in the row.": "માર્ચ હરોળનું ત્રીજું કાર્ડ છે.",
    "Start at January on the first knuckle and say each month in turn.": "પહેલા ઉભાર પર જાન્યુઆરીથી શરૂ કરો અને વારાફરતી દરેક મહિનો બોલો.",
    "Go from the last knuckle of the first fist to the first knuckle of the second.": "પહેલી મુઠ્ઠીના છેલ્લા ઉભારથી બીજી મુઠ્ઠીના પહેલા ઉભાર પર જાઓ.",
    "Knuckle months have 31 days, dip months have 30, and February has 28 or 29.": "ઉભારવાળા મહિનામાં 31, ખાડાવાળામાં 30, ફેબ્રુઆરીમાં 28 કે 29 દિવસ.",
    "You learned: knuckle months have 31 days and dip months have 30.": "તમે શીખ્યા: ઉભારવાળા મહિનામાં 31 દિવસ, ખાડાવાળામાં 30.",
    "Is July a knuckle or a dip month, and how many days does July have?": "જુલાઈ ઉભારવાળો મહિનો છે કે ખાડાવાળો, અને તેમાં કેટલા દિવસ છે?",
    "Days in July?": "જુલાઈમાં દિવસ?",
    "Say the months along the fist from January to find where July goes.": "જુલાઈની જગ્યા શોધવા જાન્યુઆરીથી મુઠ્ઠી પર મહિના બોલો.",
    "July comes just after June, which sits in a dip.": "જુલાઈ જૂન પછી તરત આવે છે, અને જૂન ખાડામાં છે.",
    "Count one more spot after June's dip to find July's.": "જુલાઈની જગ્યા માટે જૂનના ખાડા પછી એક જગ્યા વધુ ગણો.",
    "Yes, July is a knuckle month with 31 days.": "હા, જુલાઈ ઉભારવાળો મહિનો છે, તેમાં 31 દિવસ છે.",
    "A school term ends in June; use the fists to find how many days June has.": "શાળાનું સત્ર જૂનમાં પૂરું થાય છે, મુઠ્ઠીથી કહો જૂનમાં કેટલા દિવસ છે.",
    "Days in June?": "જૂનમાં દિવસ?",
    "Count along from April: May, then June.": "એપ્રિલથી આગળ ગણો: મે, પછી જૂન.",
    "June sits between the May and July knuckles.": "જૂન, મે અને જુલાઈના ઉભાર વચ્ચે છે.",
    "Check whether June's spot is a knuckle or a dip.": "જુઓ જૂનની જગ્યા ઉભાર છે કે ખાડો.",
    "Yes, June is a dip month with 30 days.": "હા, જૂન ખાડાવાળો મહિનો છે, તેમાં 30 દિવસ છે.",
    "Which has more days, September or October, and how many more?": "કયામાં વધુ દિવસ છે, સપ્ટેમ્બર કે ઑક્ટોબર, અને કેટલા વધુ?",
    "How many more days?": "કેટલા દિવસ વધુ?",
    "Say August, September, October along the second fist to find their own spots.": "બીજી મુઠ્ઠી પર ઑગસ્ટ, સપ્ટેમ્બર, ઑક્ટોબર બોલો અને તેમની પોતાની જગ્યા શોધો.",
    "September sits in a dip and October on a knuckle.": "સપ્ટેમ્બર ખાડામાં છે અને ઑક્ટોબર ઉભાર પર.",
    "Take September's days away from October's days.": "ઑક્ટોબરના દિવસમાંથી સપ્ટેમ્બરના દિવસ બાદ કરો.",
    "Yes, October has 1 more day.": "હા, ઑક્ટોબરમાં 1 દિવસ વધુ છે.",
    "more day": "દિવસ વધુ",
    "Leap year: every fourth year has 366 days": "લીપ વર્ષ: દર ચોથા વર્ષમાં 366 દિવસ",
    "Look at the four Februaries on the strip.": "પટ્ટી પરના ચારેય ફેબ્રુઆરી જુઓ.",
    "Tap 2026 on the strip to see its February.": "પટ્ટી પરના 2026 પર ટૅપ કરો અને તેનો ફેબ્રુઆરી જુઓ.",
    "2026 is the first year on the strip.": "2026 પટ્ટીનું પહેલું વર્ષ છે.",
    "Now tap 2028 and watch its February grow a day.": "હવે 2028 પર ટૅપ કરો અને જુઓ તેના ફેબ્રુઆરીમાં એક દિવસ વધે છે.",
    "2028 is the third year on the strip.": "2028 પટ્ટીનું ત્રીજું વર્ષ છે.",
    "Tap On 4 to step the marker four years on.": "નિશાનને ચાર વર્ષ આગળ લઈ જવા આગળ 4 પર ટૅપ કરો.",
    "On 4 is the key under the year ruler.": "આગળ 4 નું બટન વર્ષ-માપપટ્ટીની નીચે છે.",
    "Count on in fours from a leap year.": "લીપ વર્ષથી ચાર-ચાર કરીને આગળ ગણો.",
    "Only the years the marker lands on are leap years.": "નિશાન જે વર્ષો પર અટકે, ફક્ત તે જ લીપ વર્ષ છે.",
    "Every fourth year is a leap year, with 366 days and a 29 February.": "દર ચોથું વર્ષ લીપ વર્ષ છે, તેમાં 366 દિવસ અને 29 ફેબ્રુઆરી હોય.",
    "You learned: every fourth year is a leap year with 366 days.": "તમે શીખ્યા: દર ચોથું વર્ષ 366 દિવસનું લીપ વર્ષ છે.",
    "A school calendar is printed for 2044; how many days does its February have?": "શાળાનું કૅલેન્ડર 2044નું છે, તેના ફેબ્રુઆરીમાં કેટલા દિવસ છે?",
    "February 2044?": "ફેબ્રુઆરી 2044?",
    "Keep tapping On 4 from 2028 and watch the years it lands on.": "2028થી આગળ 4 દબાવતા જાઓ અને જે વર્ષો પર નિશાન અટકે તે જુઓ.",
    "Does the marker ever land on 2044?": "શું નિશાન ક્યારેય 2044 પર અટકે છે?",
    "A leap February has one more day than the February of 2026.": "લીપ વર્ષના ફેબ્રુઆરીમાં 2026ના ફેબ્રુઆરી કરતાં એક દિવસ વધુ હોય.",
    "Yes, leap year 2044 has a 29 February.": "હા, લીપ વર્ષ 2044માં 29 ફેબ્રુઆરી હોય છે.",
    "A birthday card says 29 February; which year on the keys can have that date?": "જન્મદિવસના કાર્ડ પર 29 ફેબ્રુઆરી છે, બટનમાંથી કયા વર્ષમાં આ તારીખ આવે?",
    "Which year?": "કયું વર્ષ?",
    "Use On 4 once more from 2044.": "2044થી એક વાર ફરી આગળ 4 દબાવો.",
    "An even year is not always a leap year.": "દરેક બેકી વર્ષ લીપ વર્ષ નથી હોતું.",
    "Which key is on the marker's path?": "કયું બટન નિશાનના રસ્તા પર છે?",
    "Yes, 2048 is the next leap year.": "હા, 2048 પછીનું લીપ વર્ષ છે.",
    "Last year was a leap year and the next one is 2048; what year is it now?": "ગયું વર્ષ લીપ વર્ષ હતું અને પછીનું 2048 છે, હમણાં કયું વર્ષ છે?",
    "This year?": "આ વર્ષ?",
    "Go back from 2048 to the leap year just before it.": "2048થી પાછળ, તેની બરાબર પહેલાંના લીપ વર્ષ પર જાઓ.",
    "Tap Back 4 and see where the marker stops.": "પાછળ 4 પર ટૅપ કરો અને જુઓ નિશાન ક્યાં અટકે છે.",
    "This year is the year after the leap year the marker shows.": "આ વર્ષ, નિશાનવાળા લીપ વર્ષ પછીનું વર્ષ છે.",
    "Yes, it is 2045 now.": "હા, હમણાં 2045 છે.",
    "Finding a day and a date on a calendar": "કૅલેન્ડર પર વાર અને તારીખ શોધવી",
    "Circle a date and hop seven days at a time.": "એક તારીખ પર ગોળ કરો અને સાત-સાત દિવસ કૂદો.",
    "Tap the 2nd to circle it with the pencil.": "2 તારીખ પર ટૅપ કરો, પેન્સિલ તેના પર ગોળ કરશે.",
    "The 2nd is in the top row of the page.": "2 તારીખ પાનાની સૌથી ઉપરની હરોળમાં છે.",
    "Tap Hop 7: the circled date is not counted, so one hop is 7 days on.": "કૂદો 7 પર ટૅપ કરો: ગોળ કરેલી તારીખ ગણાતી નથી, એક કૂદકો 7 દિવસ આગળ છે.",
    "Hop 7 is the key under the week counter.": "કૂદો 7 નું બટન અઠવાડિયાં-ગણતરીની નીચે છે.",
    "Hop again and see that the day stays the same.": "ફરી કૂદો અને જુઓ કે વાર એ જ રહે છે.",
    "Tap Hop 7 one more time.": "કૂદો 7 પર એક વાર વધુ ટૅપ કરો.",
    "Hop 7 days and read the day at the top of the column.": "7 દિવસ કૂદો અને સ્તંભની ઉપર લખેલો વાર વાંચો.",
    "Hop once for every week the question names.": "પ્રશ્નમાં જેટલાં અઠવાડિયાં છે, તેટલી વાર કૂદો.",
    "The same day of the week comes back every 7 days.": "દર 7 દિવસે અઠવાડિયાનો એ જ વાર ફરી આવે છે.",
    "You learned: the same weekday comes back every 7 days.": "તમે શીખ્યા: દર 7 દિવસે એ જ વાર ફરી આવે છે.",
    "A plant took from 3 to 31 October 2026 to flower; how many weeks is that?": "છોડને ફૂલ આવતાં 3 થી 31 ઑક્ટોબર 2026 લાગ્યા, તે કેટલાં અઠવાડિયાં થયાં?",
    "Weeks, 3rd to 31st?": "3 થી 31 સુધી અઠવાડિયાં?",
    "Circle the 3rd and hop in sevens to the 31st, not counting the 3rd.": "3 પર ગોળ કરો અને 3 ને ગણ્યા વગર સાત-સાત કરીને 31 સુધી કૂદો.",
    "Each hop is one week; count the hops, not the dates.": "દરેક કૂદકો એક અઠવાડિયું છે, તારીખો નહીં, કૂદકા ગણો.",
    "Count each hop until the pencil reaches the ringed 31st.": "પેન્સિલ ગોળ કરેલી 31 તારીખે પહોંચે ત્યાં સુધી દરેક કૂદકો ગણો.",
    "Yes, 4 hops of 7 days make 4 weeks.": "હા, 7 દિવસના 4 કૂદકા એટલે 4 અઠવાડિયાં.",
    "weeks": "અઠવાડિયાં",
    "1 November 2026 is a Sunday; which day is a book due 2 weeks after the 6th?": "1 નવેમ્બર 2026 રવિવાર છે, 6 તારીખથી 2 અઠવાડિયે પુસ્તક કયા વારે આપવું?",
    "Due on which day?": "કયા વારે આપવું?",
    "Circle the 6th and hop 7 days twice.": "6 પર ગોળ કરો અને 7 દિવસ બે વાર કૂદો.",
    "Each hop of 7 days stays in one column of the page.": "7 દિવસનો દરેક કૂદકો પાનાના એક જ સ્તંભમાં રહે છે.",
    "Count from Sunday the 1st along the top row to the 6th.": "રવિવાર 1 તારીખથી ઉપરની હરોળમાં 6 સુધી ગણો.",
    "Yes, 2 weeks on, it is Friday again.": "હા, 2 અઠવાડિયાં પછી ફરી શુક્રવાર છે.",
    "The exam is on 24 June 2026 and 1 June is a Monday; which day is the exam?": "પરીક્ષા 24 જૂન 2026એ છે અને 1 જૂન સોમવાર છે, પરીક્ષા કયા વારે છે?",
    "Exam day?": "પરીક્ષાનો વાર?",
    "Hop from Monday the 1st in sevens, then count on to the 24th.": "સોમવાર 1 તારીખથી સાત-સાત કૂદો, પછી 24 સુધી આગળ ગણો.",
    "The 22nd is a Monday too; count on from there.": "22 તારીખ પણ સોમવાર છે, ત્યાંથી આગળ ગણો.",
    "Two days after a Monday is the day you want.": "સોમવાર પછી બે દિવસ પછીનો વાર શોધો.",
    "Yes, 24 June 2026 is a Wednesday.": "હા, 24 જૂન 2026 બુધવાર છે.",
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
    "Jan": "જાન્યુ",
    "Feb": "ફેબ્રુ",
    "Mar": "માર્ચ",
    "Apr": "એપ્રિ",
    "Jun": "જૂન",
    "Jul": "જુલા",
    "Aug": "ઑગ",
    "Sep": "સપ્ટે",
    "Oct": "ઑક્ટો",
    "Nov": "નવે",
    "Dec": "ડિસે",
    "Sun": "રવિ",
    "Mon": "સોમ",
    "Tue": "મંગળ",
    "Wed": "બુધ",
    "Thu": "ગુરુ",
    "Fri": "શુક્ર",
    "Sat": "શનિ",
    "Su": "ર",
    "Mo": "સો",
    "Tu": "મં",
    "We": "બુ",
    "Th": "ગુ",
    "Fr": "શુ",
    "Sa": "શ",
    "Sunday": "રવિવાર",
    "Monday": "સોમવાર",
    "Tuesday": "મંગળવાર",
    "Wednesday": "બુધવાર",
    "Thursday": "ગુરુવાર",
    "Friday": "શુક્રવાર",
    "Saturday": "શનિવાર",
    "Week counter": "અઠવાડિયાં-ગણતરી",
    "52 weeks": "52 અઠવાડિયાં",
    "1 day left": "1 દિવસ બાકી",
    "Flip year": "વર્ષ ફેરવો",
    "Count weeks": "અઠવાડિયાં ગણો",
    "Grid view": "સાદું કોષ્ટક",
    "Wall view": "દીવાલ કૅલેન્ડર",
    "Last month": "ગયો મહિનો",
    "Next month": "આવતો મહિનો",
    "Calendar rows": "કૅલેન્ડરની હરોળ",
    "Calendar dates": "કૅલેન્ડરની તારીખો",
    "Leap year": "લીપ વર્ષ",
    "Back 4": "પાછળ 4",
    "On 4": "આગળ 4",
    "Hop 7": "કૂદો 7",
    "28 or 29": "28 કે 29",
    "Knuckle": "ઉભાર",
    "Dip": "ખાડો",
    "Circle the date": "તારીખ પર ગોળ",
    "First tap 4 full rows of the calendar.": "પહેલાં કૅલેન્ડરની 4 આખી હરોળ પર ટૅપ કરો.",
    "First turn every page, or tap Flip year.": "પહેલાં દરેક પાનું ફેરવો, અથવા વર્ષ ફેરવો પર ટૅપ કરો.",
    "First tap Count weeks.": "પહેલાં અઠવાડિયાં ગણો પર ટૅપ કરો.",
    "First put the July card on a knuckle or a dip.": "પહેલાં જુલાઈનું કાર્ડ કોઈ ઉભાર કે ખાડા પર મૂકો.",
    "First put the June card on a knuckle or a dip.": "પહેલાં જૂનનું કાર્ડ કોઈ ઉભાર કે ખાડા પર મૂકો.",
    "First put the September and October cards on the fists.": "પહેલાં સપ્ટેમ્બર અને ઑક્ટોબરનાં કાર્ડ મુઠ્ઠી પર મૂકો.",
    "First step the marker on with On 4.": "પહેલાં આગળ 4 વડે નિશાનને આગળ ખસેડો.",
    "First tap On 4 to move the marker.": "પહેલાં નિશાન ખસેડવા આગળ 4 પર ટૅપ કરો.",
    "First tap Back 4 to move the marker.": "પહેલાં નિશાન ખસેડવા પાછળ 4 પર ટૅપ કરો.",
    "First circle the 3rd, then hop down to the 31st.": "પહેલાં 3 પર ગોળ કરો, પછી 31 સુધી કૂદો.",
    "First circle the 6th, then hop twice.": "પહેલાં 6 પર ગોળ કરો, પછી બે વાર કૂદો.",
    "First circle the 1st, then hop to the 22nd.": "પહેલાં 1 પર ગોળ કરો, પછી 22 સુધી કૂદો.",
    "Year": "વર્ષ",
  },
};

/* ── the calendar, computed for its real year (never typed in) ─────────────────────────────── */
const CE_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const CE_MON3 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const CE_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const CE_DAY3 = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const CE_DAY2 = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const CE_DAYID = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const CE_WEEKDAY_KEYS = CE_DAY3.map((s, k) => ({ id: CE_DAYID[k], label: s }));
/* the leap rule in full (every fourth year; a century only when it divides by 400): for 1901 to 2099 it IS the
   every-fourth-year rule the chapter teaches, and the tool never leaves 2000 to 2099 */
const ceLeap = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
const ceLen = (y: number, m: number) => (m === 1 ? (ceLeap(y) ? 29 : 28) : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m]);
/* the weekday of a date (0 = Sunday), by counting days from 1 January 1900, a Monday */
const ceDow = (y: number, m: number, d: number) => {
  let t = 0;
  for (let k = 1900; k < y; k++) t += ceLeap(k) ? 366 : 365;
  for (let k = 0; k < m; k++) t += ceLen(y, k);
  return (1 + t + d - 1) % 7;
};
const ceRC = (y: number, m: number, d: number) => { const k = ceDow(y, m, 1) + d - 1; return { r: Math.floor(k / 7), c: k % 7 }; };
const ceStep = (p: any, dir: number) => { let m = p.m + dir, y = p.y; if (m > 11) { m = 0; y += 1; } if (m < 0) { m = 11; y -= 1; } return { y, m }; };
/* the rows of a page that hold a whole week (seven dates, Sunday to Saturday) */
const ceFullRows = (y: number, m: number) => {
  const f = ceDow(y, m, 1), L = ceLen(y, m), out: number[] = [];
  for (let r = 0; r < 6; r++) { const first = r * 7 - f + 1; if (first >= 1 && first + 6 <= L) out.push(r); }
  return out;
};
const ceAddU = (a: any[], v: any) => (a.indexOf(v) >= 0 ? a : [...a, v]);
/* the size of a short label in a box: 32, or 28 when a long Hindi or Gujarati form would touch the sides (marks that take no width are not counted) */
const CE_ZERO_W = /[ऀ-ं़ु-ै्॑-ॗॢॣઁં઼ુ-ૈ્ૢૣ]/;
const ceFitFs = (s: string, w: number) => (Array.from(String(s)).filter((ch) => !CE_ZERO_W.test(ch)).length * 0.62 * T.label <= w - 12 ? T.label : T.micro);

/* colours: real things keep their own; the hop lights one weekday in blue, the answer and a reached date are green,
   the one day left over is amber (content colours, docs/LAYOUT.md §9) */
const CE = { ink: "#2B2B2B", paper: "#FFFDF7", hop: CONTENT.hundred, ans: CONTENT.one, amber: CONTENT.ten, extra: CONTENT.bead,
  skin: "#F2C9A0", skinEdge: "#A8724B", crease: "#C99466", pencil: "#4A4A4A" };
/* the big wall calendar page and the small one (phase 2) */
const CEB = { x: 8, y: 18, w: 462, bar: 84, head: 44, cw: 64, ch: 47, rows: 6 };
const CEM = { x: 1080, y: 118, w: 380, bar: 56, head: 40, cw: 52, ch: 41, rows: 6 };
const ceGX = (g: any) => g.x + (g.w - 7 * g.cw) / 2;
const ceGY = (g: any) => g.y + g.bar + g.head;
const ceCellC = (g: any, y: number, m: number, d: number) => { const { r, c } = ceRC(y, m, d); return { x: ceGX(g) + c * g.cw + g.cw / 2, y: ceGY(g) + r * g.ch + g.ch / 2 }; };
const ceCellAt = (g: any, y: number, m: number, p: any) => {
  if (!p || !isFinite(p.x) || !isFinite(p.y)) return null;
  const c = Math.floor((p.x - ceGX(g)) / g.cw), r = Math.floor((p.y - ceGY(g)) / g.ch);
  if (c < 0 || c > 6 || r < 0 || r >= g.rows) return null;
  const d = r * 7 + c - ceDow(y, m, 1) + 1;
  return { r, c, d: d >= 1 && d <= ceLen(y, m) ? d : null };
};
/* a ring round a date (the pencil's circle) and a hop arc down one week, as point lists */
const ceRingPts = (p: any, k: number) => Array.from({ length: k + 1 }, (_, i) => { const a = -Math.PI / 2 + (i / k) * Math.PI * 2; return { x: p.x + 27 * Math.cos(a), y: p.y + 21 * Math.sin(a) }; });
const ceArcPts = (a: any, b: any, k: number) => Array.from({ length: k + 1 }, (_, i) => {
  /* the hop runs down the cell's LEFT margin, clear of the centred digits and inside the page */
  const t = i / k, p0 = { x: a.x - 24, y: a.y + 8 }, q = { x: a.x - 34, y: (a.y + b.y) / 2 }, p1 = { x: b.x - 24, y: b.y - 8 };
  return { x: (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * q.x + t * t * p1.x, y: (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * q.y + t * t * p1.y };
});
const cePath = (pts: any[], t: number) => {
  const n = Math.max(1, Math.round((pts.length - 1) * Math.max(0, Math.min(1, t))));
  return pts.slice(0, n + 1).map((p, i) => (i ? "L " : "M ") + p.x.toFixed(1) + " " + p.y.toFixed(1)).join(" ");
};

/* one calendar page, drawn (called, never mounted). o: { view, tx, arrows, lit: {day: colour}, under, over, sq29 } */
function cePageG(g: any, y: number, m: number, o: any) {
  const tx = o.tx || ((v: any) => v), wall = o.view !== "grid";
  const gx = ceGX(g), gy = ceGY(g), f = ceDow(y, m, 1), L = ceLen(y, m);
  const H = g.bar + g.head + g.rows * g.ch + 8, fs = g.ch >= 46 ? T.label : T.micro;
  const title = tx(CE_MONTHS[m]) + " " + y;
  const room = g.w - (o.arrows ? 176 : 28);
  const tfs = (g.bar >= 70 ? [T.prompt, T.label, T.micro] : [T.label, T.micro]).find((s) => title.length * s * 0.6 <= room) || T.micro;
  const cx = (c: number) => gx + c * g.cw + g.cw / 2, cy = (r: number) => gy + r * g.ch + g.ch / 2;
  const lit = o.lit || {}, cells: any[] = [], nums: any[] = [];
  for (let r = 0; r < g.rows; r++) for (let c = 0; c < 7; c++) {
    const d = r * 7 + c - f + 1, has = d >= 1 && d <= L;
    const s = has && d === 29 && m === 1 && o.sq29 !== undefined && o.sq29 < 1 ? Math.max(0, o.sq29) : 1;
    const blank = wall ? "#EFE8DA" : "#F4F4F4";
    if (s < 1) cells.push(<rect key={"b" + r + "." + c} x={gx + c * g.cw} y={gy + r * g.ch} width={g.cw} height={g.ch} fill={blank} stroke={CE.ink} strokeWidth={2.4} />);
    cells.push(<rect key={"c" + r + "." + c} x={gx + c * g.cw + ((1 - s) * g.cw) / 2} y={gy + r * g.ch + ((1 - s) * g.ch) / 2} width={g.cw * s} height={g.ch * s}
      fill={has && lit[d] ? mix(lit[d], "#FFFFFF", 0.6) : has ? "#FFFFFF" : blank} stroke={CE.ink} strokeWidth={2.4} />);
    if (has && s > 0.5 && (o.upto === undefined || d <= o.upto)) nums.push(<text key={"d" + d} x={cx(c)} y={cy(r) + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill={CE.ink}>{d}</text>);
  }
  return (
    <g>
      {wall && <g>
        <path d={`M ${g.x + 80} ${g.y + 4} L ${g.x + g.w / 2} ${g.y - 13} L ${g.x + g.w - 80} ${g.y + 4}`} fill="none" stroke="#6B5B45" strokeWidth={3} strokeLinecap="round" />
        <circle cx={g.x + g.w / 2} cy={g.y - 13} r={6} fill="#6B5B45" stroke="#FFFDF7" strokeWidth={1.5} />
      </g>}
      <rect x={g.x} y={g.y} width={g.w} height={H} rx={wall ? 16 : 2} fill={wall ? CE.paper : "#FFFFFF"} stroke={CE.ink} strokeWidth={wall ? 3 : 4.5} filter={wall ? "url(#ce-sh)" : undefined} />
      {wall
        ? <path d={`M ${g.x} ${g.y + g.bar} V ${g.y + 16} Q ${g.x} ${g.y} ${g.x + 16} ${g.y} H ${g.x + g.w - 16} Q ${g.x + g.w} ${g.y} ${g.x + g.w} ${g.y + 16} V ${g.y + g.bar} Z`} fill="url(#ce-hdr-grad)" />
        : <line x1={g.x} y1={g.y + g.bar} x2={g.x + g.w} y2={g.y + g.bar} stroke={CE.ink} strokeWidth={3} />}
      {wall && (g.w >= 440 ? [g.x + 92, g.x + g.w - 92] : [g.x + 18, g.x + g.w - 18]).map((rx, k) => (
        <g key={"ring" + k}>
          <circle cx={rx} cy={g.y + 8} r={8} fill="none" stroke="#2B2B2B" strokeWidth={2} opacity={0.3} />
          <circle cx={rx} cy={g.y + 8} r={6} fill="url(#ce-ring-grad)" stroke="#2B2B2B" strokeWidth={2} />
        </g>
      ))}
      <g data-scale="title"><text x={g.x + g.w / 2} y={g.y + g.bar / 2 + tfs * 0.36} textAnchor="middle" fontSize={tfs} fontWeight={700} fill={wall ? "#FFFFFF" : CE.ink}>{title}</text></g>
      <rect x={gx} y={g.y + g.bar} width={7 * g.cw} height={g.head} fill={wall ? "#F2E4CE" : "#FFFFFF"} stroke={CE.ink} strokeWidth={2.4} />
      <g data-scale="weekdays">{(g.cw >= 60 && (!o.lang || o.lang === "en") ? CE_DAY3 : CE_DAY2).map((s, c) => o.headsOnly && o.headsOnly.indexOf(c) < 0 ? null : <text key={s} x={cx(c)} y={g.y + g.bar + g.head / 2 + (!o.lang || o.lang === "en" ? 10 : 7)} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={CE.ink}>{tx(s)}</text>)}</g>
      {cells}
      <rect x={gx} y={gy} width={7 * g.cw} height={g.rows * g.ch} fill="none" stroke={CE.ink} strokeWidth={4.5} />
      {o.under}
      <g data-scale="dates">{nums}</g>
      {o.over}
    </g>
  );
}

/* THE FIST (owner 2026-10-28): a real photo, skin "fist" (images.json): the back of a closed RIGHT fist, thumb at its
   left, a 146 x 220 tile drawn uniformly scaled. Its knuckle (K) and dip (D) marks in tile px, left to right K1 D1 K2 D2 K3
   D3 K4 (K1 is the index knuckle, next to the thumb). The first fist (on the left) is the LEFT hand: the same photo
   mirrored (x -> 146 - x), so its index knuckle is at its right end, next to the other thumb. The months run left to
   right: the left fist from its little-finger knuckle (January) to its index knuckle (July), then the right fist from
   its index knuckle (August) on, as the brief has it (July and August both on a knuckle). */
const CE_FIST = { w: 146, h: 220, s: 1.9, y: 100, show: 172, marks: [[44, 16], [59, 22], [75, 16], [90, 28], [103, 26], [118, 36], [130, 40]] };
const CE_FX = [204, 692];   /* the left edge of each fist's tile, in Work units */
const ceMark = (f: number, i: number) => {
  const mk = f === 0 ? CE_FIST.marks.slice().reverse().map(([x, y]) => [CE_FIST.w - x, y]) : CE_FIST.marks;
  return { x: CE_FX[f] + mk[i][0] * CE_FIST.s, y: CE_FIST.y + mk[i][1] * CE_FIST.s };
};
/* the plain fist under the photo (the fallback), in the tile's own px: humps on the marks, the thumb at the left */
function ceFistTile() {
  return (
    <g>
      <ellipse cx={36} cy={96} rx={10} ry={26} fill={CE.skin} stroke={CE.skinEdge} strokeWidth={2.5} />
      <path d="M 40 40 H 134 V 100 L 126 168 H 50 L 42 100 Z" fill={CE.skin} stroke={CE.skinEdge} strokeWidth={2.5} strokeLinejoin="round" />
      {[[44, 30, 13], [75, 30, 13], [103, 39, 12], [128, 51, 10]].map(([x, y, r], k) => <circle key={"h" + k} cx={x} cy={y} r={r} fill={CE.skin} stroke={CE.skinEdge} strokeWidth={2.5} />)}
      <rect x={40} y={36} width={94} height={56} fill={CE.skin} />
      {[[59, 22], [90, 28], [118, 36]].map(([x, y], k) => <path key={"d" + k} d={`M ${x} ${y + 10} L ${x + 2} 120`} stroke={CE.crease} strokeWidth={2.5} strokeLinecap="round" />)}
    </g>
  );
}
/* one fist: the plain drawing, then the photo over it (mirrored for the left hand); `cut` hides the wrist below that tile row
   (the photo keeps its own aspect: it is clipped, never squeezed) */
function ceFistG(x0: number, y0: number, s: number, mirror: boolean, cut?: number) {
  const tr = mirror ? `translate(${x0 + CE_FIST.w * s} ${y0}) scale(${-s} ${s})` : `translate(${x0} ${y0}) scale(${s})`;
  const id = "ce-fist-" + (mirror ? "l" : "r") + (cut || CE_FIST.h);
  return (
    <g transform={tr}>
      {/* the wrist ends round and narrow (no flat cut, no light strips at its sides) */}
      <defs><clipPath id={id}><path d={`M -30 -10 H 176 V 96 C 176 128 134 132 130 ${(cut || 172) - 18} Q 87 ${(cut || 172) + 10} 44 ${(cut || 172) - 18} C 40 132 -30 128 -30 96 Z`} /></clipPath></defs>
      <g clipPath={`url(#${id})`}>{ceFistTile()}</g>
      <Skin name="fist" x={0} y={0} w={CE_FIST.w} h={CE_FIST.h} clip={`url(#${id})`} />
    </g>
  );
}
/* the knuckle method's twelve spots, in the order the months are said: left fist k d k d k d k, then the right fist k d k d k.
   Each spot has its mark on the fist and a slot in the row above, where the month card sits (February's slot is wider) */
const ceSlotW = (j: number) => (j === 1 ? 132 : 72);
const ceSlotX = (j: number) => { if (j >= 7) return 640 + (j - 7) * 78; let x = 16; for (let k = 0; k < j; k++) x += ceSlotW(k) + 6; return x; };
const ceSpot = (j: number) => { const f = j < 7 ? 0 : 1, i = j < 7 ? j : j - 7, mk = ceMark(f, i), w = ceSlotW(j); return { j, x: ceSlotX(j) + w / 2, w, k: i % 2 === 0, cy: 42, px: mk.x, py: mk.y }; };
const ceCard2 = (m: number) => ({ x: 14 + m * 88, y: 440, w: 80, h: 72 });
const ceChipDays = (m: number, j: number) => (ceSpot(j).k ? "31" : m === 1 ? "28 or 29" : "30");
/* phase 1 month cards, phase 3 strip tiles and year ruler */
const ceCard1 = (m: number) => ({ x: 490 + (m % 6) * 98, y: m < 6 ? 8 : 92, w: 90, h: 76 });
const CE_TILE = (j: number) => ({ x: 490 + j * 148, y: 8, w: 136, h: 132 });
const CE_RL = { x0: 512, x1: 1050, y: 286, y0: 2024, y1: 2052 };
const ceRX = (yr: number) => CE_RL.x0 + ((yr - CE_RL.y0) * (CE_RL.x1 - CE_RL.x0)) / (CE_RL.y1 - CE_RL.y0);

/* a real touch on the board (a press or a drag of the child's own, never toolApi): only then does the answer gate lock */
const CE_TOUCH = { v: false, arm: "" };
/* the last REAL Enter or Space keydown (an event the keyboard sent): an Enter that performs a guide step arms the gate of the
   question the steps open (PATTERNS §19); toolApi.check() presses Enter without a keydown, so the agent is never gated */
const CE_KEY = { t: 0 };
/* phase 2 question 3: true while September or October sits on a spot that is not its own (judge then refuses the 1) */
const CE_P2 = { bad: false };

/* One entry per phase = one mount. Lines are ONE sentence each (keyOnly). */
const PHASES = [
  {
    n: 1,
    concept: "Days, weeks, months and a year",
    conceptId: "M1.S2.T6.C28", objectiveIds: ["O9"],
    says: ["Flip the pages of the wall calendar."],
    steps: [
      { say: "Tap a full row of the calendar to count one week.", on: "week", hint: "Pick a row with a date in every box." },
      { say: "Tap the January card to see how many days it has.", on: "card-jan", hint: "January is the first month card." },
      { say: "Now tap the arrow on the page to turn to February.", on: "next", hint: "The arrow is at the right end of the dark bar." },
    ],
    ladder: ["Count the days one row of seven at a time.", "Try it on one month of the calendar first."],
    closing: "A week has 7 days, and a year has 365 days, a little more than 52 weeks.",
    learned: "You learned: 7 days make a week, and a year has 365 days.",
    traceback: "Full rows light one week at a time and stop one week short; the month cards light up to November; the 52 weeks fill and the one day left over is lit amber.",
    items: [
      /* learn CE1: answer in the plan = 28 days (plan: A school trip lasts 4 weeks. How many days is that?) */
      { qid: "M1.S2.T6.C28:CE1", kind: "weeks", page: 9, nudge: "First tap 4 full rows of the calendar.", answer: 28, near: 11, unit: "days",
        say: "A school trip lasts 4 weeks, so how many days is that?", ask: "4 weeks = ? days",
        miss: "Each full row is one week of 7 days; count the days in 4 rows.",
        ladder: ["Count the lit boxes row by row, in sevens.", "Add 7 four times: 7, 14, then two more sevens."],
        win: "Yes, 4 weeks of 7 days make 28 days." },
      /* practice 1: answer in the plan = 12 pages, one for each of the 12 months */
      { qid: "M1.S2.T6.C28:1", kind: "pages", page: 0, nudge: "First turn every page, or tap Flip year.", answer: 12, near: 11, unit: "pages",
        say: "A wall calendar has one page for each month, so how many pages does it have?", ask: "Pages in a year?",
        miss: "Count every month card from January to December.",
        ladder: ["Each month card stands for one page of the calendar.", "The lit cards stop at November; add December too."],
        win: "Yes, 12 months make 12 pages." },
      /* practice 5: answer in the plan = 365 days, because 52 weeks is 364 days and 1 more day makes 365 */
      { qid: "M1.S2.T6.C28:5", kind: "year", page: 0, nudge: "First tap Count weeks.", answer: 365, near: 364, unit: "days",
        say: "A bus pass is good for 52 weeks and 1 more day; how many days does it last?", ask: "52 weeks + 1 day?",
        miss: "Find the days in 52 weeks first, then add the extra day.",
        ladder: ["52 weeks make 364 days, as the week counter shows.", "Look for the day left over after the 52 weeks."],
        win: "Yes, 364 days and 1 more make 365 days, a whole year." },
    ],
  },
  {
    n: 2,
    concept: "How many days in a month: the knuckle method",
    conceptId: "M1.S2.T6.C29", objectiveIds: ["O9"],
    says: ["Say the months along the knuckles and the dips."],
    steps: [
      { say: "Tap the January card to put it on the first knuckle.", on: "m1", hint: "January is the first card in the row." },
      { say: "Now put February in the dip next to it.", on: "m2", hint: "Tap the February card, the second in the row." },
      { say: "March goes on the next knuckle, so tap its card.", on: "m3", hint: "March is the third card in the row." },
    ],
    ladder: ["Start at January on the first knuckle and say each month in turn.", "Go from the last knuckle of the first fist to the first knuckle of the second."],
    closing: "Knuckle months have 31 days, dip months have 30, and February has 28 or 29.",
    learned: "You learned: knuckle months have 31 days and dip months have 30.",
    traceback: "The months are said along the fists from January and stop just before the asked month; its calendar page lights its days a week at a time and stops before the last day.",
    items: [
      /* learn CE2: answer in the plan = A knuckle month. July has 31 days. */
      { qid: "M1.S2.T6.C29:CE2", kind: "knuckle", months: [6], nudge: "First put the July card on a knuckle or a dip.", answer: 31, near: 30, unit: "days",
        say: "Is July a knuckle or a dip month, and how many days does July have?", ask: "Days in July?",
        miss: "Say the months along the fist from January to find where July goes.",
        ladder: ["July comes just after June, which sits in a dip.", "Count one more spot after June's dip to find July's."],
        win: "Yes, July is a knuckle month with 31 days." },
      /* practice 2: answer in the plan = A dip month. June has 30 days. */
      { qid: "M1.S2.T6.C29:2", kind: "knuckle", months: [5], nudge: "First put the June card on a knuckle or a dip.", answer: 30, near: 31, unit: "days",
        say: "A school term ends in June; use the fists to find how many days June has.", ask: "Days in June?",
        miss: "Count along from April: May, then June.",
        ladder: ["June sits between the May and July knuckles.", "Check whether June's spot is a knuckle or a dip."],
        win: "Yes, June is a dip month with 30 days." },
      /* practice 6: answer in the plan = October has 1 more day (October 31, September 30) */
      { qid: "M1.S2.T6.C29:6", kind: "knuckle", months: [8, 9], nudge: "First put the September and October cards on the fists.", answer: 1, near: 31, unit: "more day",
        say: "Which has more days, September or October, and how many more?", ask: "How many more days?",
        miss: "Say August, September, October along the second fist to find their own spots.",
        ladder: ["September sits in a dip and October on a knuckle.", "Take September's days away from October's days."],
        win: "Yes, October has 1 more day." },
    ],
  },
  {
    n: 3,
    concept: "Leap year: every fourth year has 366 days",
    conceptId: "M1.S2.T6.C30", objectiveIds: ["O10"],
    says: ["Look at the four Februaries on the strip."],
    steps: [
      { say: "Tap 2026 on the strip to see its February.", on: "y2026", hint: "2026 is the first year on the strip." },
      { say: "Now tap 2028 and watch its February grow a day.", on: "y2028", hint: "2028 is the third year on the strip." },
      { say: "Tap On 4 to step the marker four years on.", on: "on4", hint: "On 4 is the key under the year ruler." },
    ],
    ladder: ["Count on in fours from a leap year.", "Only the years the marker lands on are leap years."],
    closing: "Every fourth year is a leap year, with 366 days and a 29 February.",
    learned: "You learned: every fourth year is a leap year with 366 days.",
    traceback: "The marker steps in fours from a leap year, lighting only the leap years while the years between stay dark, and stops one hop short.",
    items: [
      /* learn CE3: answer in the plan = 29 days, because 2044 is a leap year (the plan's "28 or 29" would print the answer) */
      { qid: "M1.S2.T6.C30:CE3", kind: "leap", target: 2044, mk0: 2028, lit0: [2028], dir: 1, nudge: "First step the marker on with On 4.", answer: 29, near: 28, unit: "days",
        say: "A school calendar is printed for 2044; how many days does its February have?", ask: "February 2044?",
        miss: "Keep tapping On 4 from 2028 and watch the years it lands on.",
        ladder: ["Does the marker ever land on 2044?", "A leap February has one more day than the February of 2026."],
        win: "Yes, leap year 2044 has a 29 February." },
      /* practice 3: answer in the plan = 2048, because 2048 is a leap year and 2046 is not (the two years are the keys) */
      { qid: "M1.S2.T6.C30:3", kind: "leap", target: 2048, mk0: 2044, lit0: [2028, 2032, 2036, 2040, 2044], dir: 1, nudge: "First tap On 4 to move the marker.",
        choices: [{ id: "2046", label: "2046" }, { id: "2048", label: "2048" }], answer: "2048", near: "2046", unit: "",
        say: "A birthday card says 29 February; which year on the keys can have that date?", ask: "Which year?",
        miss: "Use On 4 once more from 2044.",
        ladder: ["An even year is not always a leap year.", "Which key is on the marker's path?"],
        win: "Yes, 2048 is the next leap year." },
      /* practice 7: answer in the plan = 2045 (the leap year before 2048 is 2044, and this year is 1 year later) */
      { qid: "M1.S2.T6.C30:7", kind: "leap", target: 2044, mk0: 2048, lit0: [2048], dir: -1, pre: "Year", nudge: "First tap Back 4 to move the marker.", answer: 2045, near: 2044, unit: "",
        say: "Last year was a leap year and the next one is 2048; what year is it now?", ask: "This year?",
        miss: "Go back from 2048 to the leap year just before it.",
        ladder: ["Tap Back 4 and see where the marker stops.", "This year is the year after the leap year the marker shows."],
        win: "Yes, it is 2045 now." },
    ],
  },
  {
    n: 4,
    concept: "Finding a day and a date on a calendar",
    conceptId: "M1.S2.T6.C31", objectiveIds: ["O10"],
    says: ["Circle a date and hop seven days at a time."],
    steps: [
      { say: "Tap the 2nd to circle it with the pencil.", on: "date", hint: "The 2nd is in the top row of the page." },
      { say: "Tap Hop 7: the circled date is not counted, so one hop is 7 days on.", on: "hop", hint: "Hop 7 is the key under the week counter." },
      { say: "Hop again and see that the day stays the same.", on: "hop", hint: "Tap Hop 7 one more time." },
    ],
    ladder: ["Hop 7 days and read the day at the top of the column.", "Hop once for every week the question names."],
    closing: "The same day of the week comes back every 7 days.",
    learned: "You learned: the same weekday comes back every 7 days.",
    traceback: "The first date is circled and left out of the count, the pencil hops a week at a time down the same column, and it stops one hop or one day short.",
    items: [
      /* learn CE4: answer in the plan = 4 weeks (3 October to 31 October 2026, counting on from the 3rd) */
      { qid: "M1.S2.T6.C31:CE4", kind: "weeks", page: [2026, 9], from: 3, to: 31, nudge: "First circle the 3rd, then hop down to the 31st.", answer: 4, near: 5, unit: "weeks",
        say: "A plant took from 3 to 31 October 2026 to flower; how many weeks is that?", ask: "Weeks, 3rd to 31st?",
        miss: "Circle the 3rd and hop in sevens to the 31st, not counting the 3rd.",
        ladder: ["Each hop is one week; count the hops, not the dates.", "Count each hop until the pencil reaches the ringed 31st."],
        win: "Yes, 4 hops of 7 days make 4 weeks." },
      /* practice 4: answer in the plan = Friday (2 weeks later is the same day). The question names no weekday that is the answer
         and the page hides its weekday headings until the win (the owner, 2026-10-28): it is anchored on Sunday 1 November */
      { qid: "M1.S2.T6.C31:4", kind: "due", page: [2026, 10], head: 0, from: 6, to: 20, nudge: "First circle the 6th, then hop twice.", choices: CE_WEEKDAY_KEYS, answer: "fri", near: "thu", unit: "",
        say: "1 November 2026 is a Sunday; which day is a book due 2 weeks after the 6th?", ask: "Due on which day?",
        miss: "Circle the 6th and hop 7 days twice.",
        ladder: ["Each hop of 7 days stays in one column of the page.", "Count from Sunday the 1st along the top row to the 6th."],
        win: "Yes, 2 weeks on, it is Friday again." },
      /* practice 8: answer in the plan = Wednesday, because 22 June is a Monday and 24 June is 2 days later */
      { qid: "M1.S2.T6.C31:8", kind: "weekday", page: [2026, 5], head: 1, from: 1, to: 22, date: 24, winMs: 5200, nudge: "First circle the 1st, then hop to the 22nd.", choices: CE_WEEKDAY_KEYS, answer: "wed", near: "tue", unit: "",
        say: "The exam is on 24 June 2026 and 1 June is a Monday; which day is the exam?", ask: "Exam day?",
        miss: "Hop from Monday the 1st in sevens, then count on to the 24th.",
        ladder: ["The 22nd is a Monday too; count on from there.", "Two days after a Monday is the day you want."],
        win: "Yes, 24 June 2026 is a Wednesday." },
    ],
  },
];

/* The numbers the working area needs (they go into the sidecar too). */
const MODEL = {
  weekStarts: "Sunday", practiceYear: 2026, strip: [2026, 2027, 2028, 2029], ruler: [CE_RL.y0, CE_RL.y1], years: [2000, 2099],
  pages: "computed: the weekday of the 1st by a day count from 1 January 1900 (a Monday); month lengths 28/29/30/31 with the leap rule",
  between: "the days between two dates count on from the first date, never counting it",
};

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

const judge = (item: any, v: any) => {
  if (item.months && CE_P2.bad) return false;   /* the number, but a card sits on the wrong kind of spot (Q3: off its own spot) */
  if (item.choices) return String(v ?? "").trim().toLowerCase() === String(item.answer).toLowerCase();
  return leadNumber(v) === item.answer;
};
/* oracle: every answer again by a second route (the browser's own Date, no code shared with judge or the pages) */
const oracle = () => {
  const len = (y: number, m: number) => new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  const day = (y: number, m: number, d: number) => new Date(Date.UTC(y, m, d)).getUTCDay();
  const gap = (a: number[], b: number[]) => Math.round((Date.UTC(b[0], b[1], b[2]) - Date.UTC(a[0], a[1], a[2])) / 86400000);
  const ids = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const [p1, p2, p3, p4]: any[] = PHASES.map((p: any) => p.items);
  const yearDays = gap([2026, 0, 1], [2027, 0, 1]);
  let months = 0;
  for (let k = 0; k < yearDays; k++) if (new Date(Date.UTC(2026, 0, 1 + k)).getUTCDate() === 1) months++;
  let lastLeap = 2047;
  while (len(lastLeap, 1) !== 29) lastLeap--;
  let fullRows = 0;
  for (let d = 1; d <= len(2026, p1[0].page); d++) if (day(2026, p1[0].page, d) === 0 && d + 6 <= len(2026, p1[0].page)) fullRows++;
  const ok = [
    p1[0].answer === 4 * 7 && fullRows >= 4,
    p1[1].answer === months,
    p1[2].answer === yearDays && yearDays === 52 * 7 + 1,
    p2[0].answer === len(2026, 6), p2[1].answer === len(2026, 5), p2[2].answer === len(2026, 9) - len(2026, 8),
    p3[0].answer === len(2044, 1),
    p3[1].answer === String([2046, 2048].find((y) => len(y, 1) === 29)),
    p3[2].answer === lastLeap + 1,
    p4[0].answer === gap([2026, 9, 3], [2026, 9, 31]) / 7 && day(2026, 9, 3) === day(2026, 9, 31),
    p4[1].answer === ids[day(2026, 10, 6 + 14)] && day(2026, 10, 1) === 0,
    p4[2].answer === ids[day(2026, 5, 24)] && day(2026, 5, 1) === 1,
  ];
  /* and every page the tool can draw starts on the weekday, and holds the days, that the second route gives */
  for (let y = 2000; y <= 2099; y++) for (let m = 0; m < 12; m++) ok.push(ceDow(y, m, 1) === day(y, m, 1) && ceLen(y, m) === len(y, m));
  return ok.every(Boolean);
};
/* the misconception of each item (judge must reject it) */
const nearMiss = (item: any) => item.near;
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => {
  if (item.choices) {
    const k = CE_DAYID.indexOf(String(item.answer));
    return k >= 0 ? [CE_DAYS[k], CE_DAY3[k]] : [String(item.answer)];
  }
  return [String(item.answer), indian(item.answer), words(item.answer)];
};
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
const answer = (item: any, v: any) => (item.pad === "enter" && HOOK.set ? HOOK.set(v) : undefined);
/* the agent's check() before Enter: it does the question's act at once (the agent is never gated), then Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the board of each entry (a question, the guide steps, free play) ─────────────────────── */
function ceFresh(n: number, i: number, demo: boolean, free: boolean) {
  const b: any = { pg: { y: 2026, m: 0 }, rows: [], weeks: 0, hot: null, seen: [], open: [], wk52: 0, yearDone: false,
    placed: {}, side: null, carrying: null, pick: null, tiles: [], sel: null, mk: 2028, mkv: null, moving: false, lit: [2028], backed: false, sq: 1,
    circ: null, ring: 1, hops: [], arc: null, circ2: null, ring2: 1, gate: false, trace: null };
  if (free) return { ...b, pg: { y: 2026, m: 5 } };
  const it: any = (PHASES[n - 1] && PHASES[n - 1].items[i]) || {};
  /* Q1.2: the page that shows at the start (January) counts as turned */
  if (n === 1) return { ...b, pg: { y: 2026, m: demo ? 0 : it.page }, seen: !demo && it.kind === "pages" ? [0] : [] };
  if (n === 2) {
    const upto = demo ? 0 : i === 2 ? 7 : 3, pl: any = {};
    for (let m = 0; m < upto; m++) pl[m] = m;
    if (!demo && i === 1) { pl[3] = 3; pl[6] = 6; }   /* Q2.2: April (a dip, 30) and July on the board */
    return { ...b, placed: pl, side: demo ? null : i === 1 ? 6 : upto - 1 };
  }
  if (n === 3) return { ...b, pg: { y: 2026, m: 1 }, tiles: demo ? [] : [2026, 2028], sel: demo ? null : 2026, mk: demo ? 2028 : it.mk0, lit: demo ? [2028] : it.lit0 };
  return { ...b, pg: demo ? { y: 2026, m: 8 } : { y: it.page[0], m: it.page[1] } };
}
/* has the child done the question's act (the answer gate opens) */
function ceActDone(n: number, it: any, S: any) {
  if (n === 1) return it.kind === "weeks" ? S.weeks >= 4 : it.kind === "pages" ? S.seen.length >= 12 : !!S.yearDone;
  if (n === 2) return (it.months || []).every((m: number) => S.placed[m] !== undefined);
  if (n === 3) return it.dir < 0 ? !!S.backed : S.lit.indexOf(it.target) >= 0;
  if (n === 4) return S.circ === it.from && S.hops.indexOf(it.to) >= 0;
  return true;
}
/* the agent's act, done at once (no animation) */
/* the win picture is the WHOLE route, whatever the correction left: every row, page, card, leap year and hop, no trace marks */
function ceWinView(n: number, qi: number, it: any, S: any) {
  if (n === 1) {
    if (it.kind === "weeks") { const rows = ceFullRows(2026, it.page).map((r) => "2026-" + it.page + "-" + r); return { pg: { y: 2026, m: it.page }, rows, weeks: rows.length, hot: null }; }
    if (it.kind === "pages") return { seen: CE_MON3.map((_, k) => k), pg: { y: 2026, m: 11 } };
    return { wk52: 4, yearDone: true, pg: { y: 2026, m: 11 } };
  }
  if (n === 2) {
    const pl: any = { ...S.placed };
    (qi === 2 ? CE_MON3.map((_, k) => k) : it.months || []).forEach((m: number) => { Object.keys(pl).forEach((k) => { if (pl[k] === m && +k !== m) delete pl[k]; }); pl[m] = m; });
    return { placed: pl, pick: null, carrying: null };
  }
  if (n === 3) {
    let lit = S.lit.slice();
    for (let y = Math.min(it.mk0, it.target); y <= Math.max(it.mk0, it.target); y += 4) lit = ceAddU(lit, y);
    return { mk: it.target, mkv: null, moving: false, lit };
  }
  if (n === 4) { const hops: number[] = []; for (let d = it.from + 7; d <= it.to; d += 7) hops.push(d); return { circ: it.from, ring: 1, hops, arc: null, circ2: it.date || null, ring2: 1 }; }
  return {};
}
function ceInstant(n: number, it: any, S: any) {
  if (n === 1) {
    if (it.kind === "weeks") { const keys = ceFullRows(S.pg.y, S.pg.m).map((r) => S.pg.y + "-" + S.pg.m + "-" + r); return { rows: keys, weeks: keys.length, gate: true }; }
    if (it.kind === "pages") return { seen: CE_MON3.map((_, k) => k), pg: { y: 2026, m: 11 }, gate: true };
    return { wk52: 4, yearDone: true, pg: { y: 2026, m: 11 }, gate: true };
  }
  if (n === 2) { const pl = { ...S.placed }; (it.months || []).forEach((m: number) => { pl[m] = m; }); return { placed: pl, side: it.months[it.months.length - 1], gate: true }; }
  if (n === 3) { let lit = S.lit; for (let y = S.mk; it.dir > 0 ? y <= it.target : y >= it.target; y += 4 * it.dir) lit = ceAddU(lit, y); return { mk: it.target, lit, backed: true, gate: true }; }
  if (n === 4) {
    const hops: number[] = [];
    for (let d = it.from + 7; d <= it.to; d += 7) hops.push(d);
    return { circ: it.from, ring: 1, hops, gate: true };
  }
  return { gate: true };
}

/* ── the working area ────────────────────────────────────────────────────────────────────────
   keyOnly: 64,108, 1472 x 520 shut, 1086 x 520 open (bigPad is off: a seven-column page plus the fists or the
   strip needs the classic width). Everything is laid out for the open width (x 0 to 1076) and stays put when the
   keypad opens; nothing stands under box.key. Phase 2's small calendar page shows only while the keypad is shut. */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const tlFx = useTimeline();
  const demo = stage === "demo" || stage === "teach";
  const free = stage === "free";
  const ask = stage === "ask";
  const won = stage === "win" || stage === "idle";
  const live = stage === "demo" || ask || free;
  const it: any = item || {};
  const qi = index || 0;
  const P = free ? 4 : n;

  /* the board belongs to the ENTRY (PATTERNS §18): a question entered again opens fresh */
  const busy = useRef(false);
  const traceBusy = useRef(false);
  const lockMemo = useRef<any>(null);
  const qk = free ? "free" : stage === "summary" ? "sum" : demo ? n + ":demo" : n + ":" + qi;
  const E = useRef<any>({ qk: "", k: 0, fresh: null });
  const pend = useRef<any[]>([]);       /* acts asked for while another plays: they run after it, in order */
  const lastStep = useRef(0);
  const fromQueue = useRef(false), directStart = useRef(0);
  const nudged = useRef(-1);
  if (E.current.qk !== qk) { E.current = { qk, k: E.current.k + 1, fresh: ceFresh(n, qi, demo, free) }; lockMemo.current = null; pend.current = []; }
  const ek = E.current.k;
  const [raw, setRaw] = useState<any>({ ek: -1 });
  const S0: any = raw.ek === ek ? raw : { ...E.current.fresh, ek };
  /* at the win (and while the phase's last win stays) the picture is complete and the correction's marks are gone */
  const S: any = won && !free ? { ...S0, ...ceWinView(n, qi, it, S0), trace: null } : S0;
  const upd = (fn: any) => {
    const k = ek;
    setRaw((p: any) => {
      if (E.current.k !== k) return p;
      const b = p.ek === k ? p : { ...E.current.fresh, ek: k };
      return { ...b, ...(typeof fn === "function" ? fn(b) : fn) };
    });
  };
  const [view, setView] = useState("wall");
  const [leaf, setLeaf] = useState<any>(null);
  const [, bump] = useState(0);
  const touch = () => { if (!CE_TOUCH.v) { CE_TOUCH.v = true; bump((x: number) => x + 1); } };
  const did = (name: string) => { if (stage === "demo") api.did(name); };
  const wipe = () => { if (S.trace) upd({ trace: null }); };
  const idle = () => !busy.current && !traceBusy.current;
  /* a tap while an act plays is kept and done right after it (never swallowed); nothing is queued in a guide step */
  const queued = (req: any) => {
    if (traceBusy.current) return true;
    if (busy.current) { if (stage !== "demo" && pend.current.length < 12) pend.current.push(req); return true; }
    return false;
  };
  useEffect(() => {
    const h = (e: any) => { if (e.isTrusted !== false && (e.key === "Enter" || e.key === " ")) CE_KEY.t = Date.now(); };   /* a key the keyboard sent, never a scripted one */
    window.addEventListener("keydown", h, true);
    return () => window.removeEventListener("keydown", h, true);
  }, []);

  /* an act performed on screen (PATTERNS §15): react only when it resolves true */
  const runAct = (o: any, done: () => void, fail?: () => void) => {
    if (busy.current) return false;
    busy.current = true;
    if (!fromQueue.current) directStart.current = Date.now();
    bump((x: number) => x + 1);
    api.act(o).then((ok: boolean) => {
      busy.current = false; lockMemo.current = null;
      if (ok) done(); else if (fail) fail();
      bump((x: number) => x + 1);
    });
    return true;
  };

  /* ── the answer gate (PATTERNS §19): locked while the act is undone, in user mode, after a real touch ── */
  const gateNow = !!S.gate || ceActDone(n, it, S);
  const needLock = ask && !gateNow && (CE_TOUCH.v || CE_TOUCH.arm === qk);
  /* while the gate is shut, a tap on the dim Answer key, the Hint key, the pad or a dead spot of the board says what to do first */
  const gateRef = useRef<any>({});
  gateRef.current = { on: ask && lockMemo.current === true, nudge: it.nudge, ek };
  const sayNudge = () => { const g = gateRef.current; if (!g.on || !g.nudge) return; nudged.current = g.ek; setTimeout(() => { if (gateRef.current.on) api.say(g.nudge); }, 350); };
  useEffect(() => {
    const down = (e: any) => {
      if (e.isTrusted === false) return;
      const t = e.target && e.target.closest ? e.target : null;
      if (!t) return;
      if (t.closest('[data-control="answer-open"]') || t.closest('[data-control="again"]') || t.closest('[data-zone="pad"]')
        || (t.closest('[data-zone="work"]') && !t.closest("[data-control]"))) sayNudge();
    };
    const key = (e: any) => {
      if (e.isTrusted === false || !(/^[0-9]$/.test(e.key) || e.key === "Enter")) return;
      const t = e.target && e.target.closest ? e.target : null;
      /* Enter on a focused board control performs that act: never a nudge over it */
      if (t && t.closest("[data-control]") && !t.closest('[data-control="answer-open"]') && !t.closest('[data-control="again"]') && !t.closest('[data-zone="pad"]')) return;
      sayNudge();
    };
    window.addEventListener("pointerdown", down, true);
    window.addEventListener("keydown", key, true);
    return () => { window.removeEventListener("pointerdown", down, true); window.removeEventListener("keydown", key, true); };
  }, []);
  /* the act is done: the question comes back in place of the nudge */
  useEffect(() => { if (ask && gateNow && nudged.current === ek) { nudged.current = -1; api.say(it.say); } }, [gateNow, ek]);
  CE_P2.bad = n === 2 && !free && (it.months || []).some((m: number) => { const j = S.placed[m]; return j !== undefined && (it.months.length === 2 ? j !== m : ceSpot(j).k !== ceSpot(m).k); });
  /* the gate opens once and stays open for the question (circling the 24th after the hops is fine) */
  useEffect(() => { if (ask && !S.gate && ceActDone(n, it, S)) upd({ gate: true }); });
  useEffect(() => {
    if (!ask || busy.current || traceBusy.current) return;
    if (lockMemo.current !== needLock) { lockMemo.current = needLock; api.lock(needLock); }
  });

  const pg = S.pg;
  const gx = ceGX(CEB), gy = ceGY(CEB);

  /* ── phase 1: rows, cards, pages, weeks ── */
  const firstFreeRow = () => { const full = ceFullRows(pg.y, pg.m); const r = full.find((k) => S.rows.indexOf(pg.y + "-" + pg.m + "-" + k) < 0); return r === undefined ? null : r; };
  const countRow = (r: any) => {
    if (queued({ k: "row", r })) return;
    if (stage === "demo" && stepOn !== "week") { did("week"); return; }
    if (r === "free") r = firstFreeRow();
    const full = ceFullRows(pg.y, pg.m);
    if (r === null || full.indexOf(r) < 0) { if (stage === "demo") did("partrow"); else if (ask && it.nudge) api.say(it.nudge); return; }
    const key = pg.y + "-" + pg.m + "-" + r;
    if (S.rows.indexOf(key) >= 0) return;
    wipe();
    const f = ceDow(pg.y, pg.m, 1);
    const at = Array.from({ length: 7 }, (_, c) => ceCellC(CEB, pg.y, pg.m, r * 7 - f + 1 + c));
    upd({ hot: { key, k: 0 } });
    runAct({ tool: "hand", moves: "tap", at, ms: 1100, onPoint: (i: number) => upd({ hot: { key, k: i + 1 } }) },
      () => { upd((p: any) => ({ rows: [...p.rows, key], weeks: p.weeks + 1, hot: null })); did("week"); },
      () => upd({ hot: null }));
  };
  const tapCard = (m: number) => {
    if (queued({ k: "card", m })) return;
    const name = "card-" + CE_MON3[m].toLowerCase();
    if (stage === "demo" && stepOn !== name) { did(name); return; }
    wipe();
    const b = ceCard1(m);
    runAct({ tool: "hand", moves: "tap", at: [{ x: b.x + b.w / 2, y: b.y + b.h / 2 }], ms: 900 },
      () => { upd((p: any) => ({ open: ceAddU(p.open, m), seen: ceAddU(p.seen, m), pg: { y: 2026, m } })); api.sfx.tick(); did(name); });
  };
  const flip = (dir: number) => {
    if (!idle()) return;
    const name = dir > 0 ? "next" : "prev";
    const np = ceStep(S.pg, dir);
    if (np.y < 2000 || np.y > 2099) return;
    wipe();
    upd((p: any) => ({ pg: np, seen: n === 1 && !free && np.y === 2026 ? ceAddU(p.seen, np.m) : p.seen, circ: free ? null : p.circ, hops: free ? [] : p.hops, ring: 1 }));
    api.sfx.tick();
    tlFx.run([[0, () => setLeaf({ dir, k: 1 })], [110, () => setLeaf({ dir, k: 2 })], [110, () => setLeaf({ dir, k: 3 })], [110, () => setLeaf(null)]]);
    /* the arrows are live in a guide step: they never count as a wrong act, and they move the step only onto February 2026 */
    if (stage === "demo" && stepOn === name && np.y === 2026 && np.m === 1) did(name);
  };
  const flipYear = () => {
    if (!idle()) return;
    wipe();
    runAct({ tool: "hand", moves: "tap", ms: 1100, at: CE_MON3.map((_, m) => { const b = ceCard1(m); return { x: b.x + b.w / 2, y: b.y + b.h / 2 }; }),
      onPoint: (i: number) => upd((p: any) => ({ pg: { y: 2026, m: i }, seen: ceAddU(p.seen, i) })) }, () => api.sfx.settle());
  };
  const countWeeks = () => {
    if (!idle() || S.yearDone) return;
    wipe();
    runAct({ tool: "hand", moves: "sweep", ms: 1100, at: [0, 1, 2, 3].map((c) => ({ x: 562 + c * 118, y: 300 })), onPoint: (i: number) => upd({ wk52: i + 1 }) },
      () => { upd({ wk52: 4, yearDone: true, pg: { y: 2026, m: 11 } }); api.sfx.settle(); });
  };

  /* ── phase 2: the month cards and the fists ── */
  const freeSpot = (j: number) => !Object.keys(S.placed).some((k) => S.placed[k] === j);
  const nearSpot = (p: any) => {
    if (!p || !isFinite(p.x)) return null;
    let best: any = null, bd = 56;
    for (let j = 0; j < 12; j++) { const s = ceSpot(j); const d = Math.min(Math.hypot(p.x - s.x, p.y - s.cy), Math.hypot(p.x - s.px, p.y - s.py) * 1.6); if (d < bd) { bd = d; best = j; } }
    return best;
  };
  const cardNode = (m: number) => (
    <g>
      <rect x={-40} y={-36} width={80} height={72} rx={12} fill="#FFFFFF" stroke={CE.ink} strokeWidth={2.4} />
      <rect x={-40} y={-36} width={80} height={14} rx={6} fill={C.panel} />
      <text x={0} y={18} textAnchor="middle" fontSize={ceFitFs(tx(CE_MON3[m]), 80)} fontWeight={700} fill={CE.ink}>{tx(CE_MON3[m])}</text>
    </g>
  );
  const carry = (m: number) => {
    if (!idle() || !freeSpot(m)) return;
    wipe();
    const b = ceCard2(m), s = ceSpot(m);
    upd({ carrying: m });
    runAct({ tool: "hand", moves: "carry", ms: 1000, from: { x: b.x + 40, y: b.y + 36 }, at: [{ x: s.x, y: s.cy }], hold: cardNode(m) },
      () => { upd((p: any) => ({ placed: { ...p.placed, [m]: m }, side: m, carrying: null })); api.sfx.tick(); did("m" + (m + 1)); },
      () => upd({ carrying: null }));
  };
  const onDrop2 = (m: any, p: any, moved: boolean) => {
    if (P !== 2 || !live || !idle()) return;
    touch();
    const name = "m" + (m + 1);
    const fixed = E.current.fresh && E.current.fresh.placed && E.current.fresh.placed[m] !== undefined;
    if (S.placed[m] !== undefined) {   /* a card the child put on the fist: a tap takes it back, a drag moves it */
      if (fixed || stage === "demo") { did(name); return; }
      const j = moved ? nearSpot(p) : null;
      upd((q: any) => { const pl = { ...q.placed }; delete pl[m]; if (j !== null && freeSpot(j)) pl[m] = j; return { placed: pl, trace: null, pick: null }; });
      if (j !== null) api.sfx.tick();
      return;
    }
    if (stage === "demo") {
      if (stepOn !== name) { did(name); return; }
      if (!moved) { carry(m); return; }
      if (nearSpot(p) === m) { upd((q: any) => ({ placed: { ...q.placed, [m]: m }, side: m })); api.sfx.tick(); did(name); } else did("spot");
      return;
    }
    /* a question: the child decides where the card goes. A tap (or Enter) only picks the card up; a tap on a slot puts it there */
    if (!moved) { wipe(); upd((q: any) => ({ pick: q.pick === m ? null : m })); api.sfx.tick(); return; }
    const j = nearSpot(p);
    if (j === null || !freeSpot(j)) return;
    wipe();
    upd((q: any) => ({ placed: { ...q.placed, [m]: j }, pick: null }));
    api.sfx.tick();
  };
  const putPicked = (j: number) => {
    if (P !== 2 || !ask || !idle() || S.pick === null || S.pick === undefined || !freeSpot(j)) return;
    touch(); wipe();
    const m = S.pick;
    upd((q: any) => ({ placed: { ...q.placed, [m]: j }, pick: null }));
    api.sfx.tick();
  };
  const drag = useDrag(onDrop2);

  /* ── phase 3: the strip and the year ruler ── */
  const tapTile = (yr: number) => {
    if (queued({ k: "tile", yr })) return;
    const name = "y" + yr;
    if (stage === "demo" && stepOn !== name) { did(name); return; }
    wipe();
    const b = CE_TILE(yr - 2026);
    runAct({ tool: "hand", moves: "tap", ms: 900, at: [{ x: b.x + b.w / 2, y: b.y + b.h / 2 }] }, () => {
      const leap = ceLeap(yr);
      upd((p: any) => ({ tiles: ceAddU(p.tiles, yr), sel: yr, pg: { y: yr, m: 1 }, sq: leap ? 0 : 1 }));
      if (leap) tlFx.run([[120, () => upd({ sq: 0.45 })], [110, () => upd({ sq: 0.8 })], [110, () => { upd({ sq: 1 }); api.sfx.tick(); }]]);
      else api.sfx.tick();
      did(name);
    });
  };
  const hop4 = (dir: number) => {
    if (queued({ k: "hop4", dir })) return;
    const name = dir > 0 ? "on4" : "back4";
    if (stage === "demo" && stepOn !== name) { did(name); return; }
    const from = S.mk, to = from + 4 * dir;
    if (to < CE_RL.y0 || to > CE_RL.y1) { did(name); return; }
    wipe();
    upd({ moving: true });
    runAct({ tool: "hand", moves: "push", ms: 1000, from: { x: ceRX(from), y: CE_RL.y - 18 }, at: [1, 2, 3, 4].map((k) => ({ x: ceRX(from + k * dir), y: CE_RL.y - 18 })),
      onPoint: (i: number) => upd({ mkv: from + (i + 1) * dir }) },
      () => { upd((p: any) => ({ mk: to, mkv: null, moving: false, lit: ceLeap(to) ? ceAddU(p.lit, to) : p.lit, backed: p.backed || (dir < 0 && to === 2044) })); api.sfx.tick(); did(name); },
      () => upd({ moving: false, mkv: null }));
  };

  /* ── phase 4 and free play: the pencil circles a date and hops a week at a time ── */
  const circle = (d: number) => {
    if (!idle()) return;
    if (stage === "demo" && stepOn !== "date") { did("date"); return; }
    if (S.circ === d && !free) return;
    if (!free && ask && it.date && d === it.date) {
      if (S.circ2 === d) return;
      wipe();
      const at2 = ceRingPts(ceCellC(CEB, pg.y, pg.m, d), 14);
      upd({ circ2: d, ring2: 0 });
      runAct({ tool: "pencil", moves: "draw", marks: true, ms: 800, from: at2[0], at: at2, onPoint: (i: number) => upd({ ring2: (i + 1) / at2.length }) },
        () => upd({ ring2: 1 }), () => upd({ ring2: 1 }));
      return;
    }
    wipe();
    const at = ceRingPts(ceCellC(CEB, pg.y, pg.m, d), 14);
    upd({ circ: d, hops: [], ring: 0, arc: null });
    runAct({ tool: "pencil", moves: "draw", marks: true, ms: 800, from: at[0], at, onPoint: (i: number) => upd({ ring: (i + 1) / at.length }) },
      () => { upd({ ring: 1 }); did("date"); }, () => upd({ ring: 1 }));
  };
  const lastHop = S.hops.length ? S.hops[S.hops.length - 1] : S.circ;
  const canHop = S.circ !== null && lastHop + 7 <= ceLen(pg.y, pg.m);
  const hop = () => {
    if (queued({ k: "hop" })) return;
    if (stage === "demo" && stepOn !== "hop") { did("hop"); return; }
    if (!canHop) { did("hop"); return; }
    wipe();
    const a = lastHop, b = a + 7;
    const pts = ceArcPts(ceCellC(CEB, pg.y, pg.m, a), ceCellC(CEB, pg.y, pg.m, b), 8);
    upd({ arc: { a, b, t: 0 } });
    runAct({ tool: "pencil", moves: "draw", marks: true, ms: 800, from: pts[0], at: pts.slice(1), onPoint: (i: number) => upd({ arc: { a, b, t: (i + 1) / (pts.length - 1) } }) },
      () => { upd((p: any) => ({ hops: [...p.hops, b], arc: null })); api.sfx.tick(); did("hop"); }, () => upd({ arc: null }));
  };

  /* the calendar grid as ONE control where any row or date may be tapped (phase 1 rows, free play dates) */
  const pt = useRef<any>(null);
  const capPt = (e: any) => { const s = stagePoint(e, e.clientX, e.clientY); pt.current = s ? { x: s.x - W.x, y: s.y - W.y, t: Date.now() } : null; };
  const gridMode = P === 1 && !free && (stage === "demo" || (ask && it.kind === "weeks")) ? "week" : free ? "date" : null;
  const gridTap = () => {
    touch();
    const p = pt.current && Date.now() - pt.current.t < 1500 ? pt.current : null;
    pt.current = null;
    const cell = ceCellAt(CEB, pg.y, pg.m, p);
    if (gridMode === "week") countRow(cell ? cell.r : p ? null : firstFreeRow());
    else if (gridMode === "date") { const d = cell ? cell.d : 1; if (d) circle(d); }
  };
  const gridPress = usePress(gridTap, !!gridMode && live);
  /* a real Enter or Space on the focused rows control counts the next free row and keeps the focus there,
     so a keyboard-only child presses it four times (synthetic keys keep the runtime's path) */
  const gridKeys = (e: any) => {
    if (gridMode === "week" && e.isTrusted !== false && (e.key === "Enter" || e.key === " " || e.key === "Spacebar")) {
      /* every full row counted: the key leaves the grid and goes on to the Answer key, as anywhere else */
      if (!busy.current && pend.current.length === 0 && firstFreeRow() === null) { if (e.currentTarget && e.currentTarget.blur) e.currentTarget.blur(); return; }
      e.preventDefault(); e.stopPropagation();
      if (e.repeat) return;
      pt.current = null; touch(); countRow("free");
      return;
    }
    gridPress.keys(e);
  };

  /* the guide steps: Enter, the agent's check() and the dev solve() do the current step */
  const doStep = (on: any) => {
    if (!on) return;
    const now = Date.now(), realKey = now - CE_KEY.t < 300;
    if (realKey && now - lastStep.current < 200) return;
    lastStep.current = now;
    if (realKey) CE_TOUCH.arm = n + ":0";
    if (on === "week") countRow(firstFreeRow());
    else if (on.indexOf("card-") === 0) tapCard(CE_MON3.findIndex((s) => "card-" + s.toLowerCase() === on));
    else if (on === "next") flip(1);
    else if (/^m\d+$/.test(on)) carry(+on.slice(1) - 1);
    else if (/^y\d+$/.test(on)) tapTile(+on.slice(1));
    else if (on === "on4") hop4(1);
    else if (on === "date") circle(2);
    else if (on === "hop") hop();
  };
  /* an act asked for while another played runs now, with this render's state */
  useEffect(() => {
    while (pend.current.length && pend.current[0].t && directStart.current > pend.current[0].t) pend.current.shift();   /* that press acted on its own release */
    if (!pend.current.length || busy.current || traceBusy.current) return;
    const r = pend.current.shift();
    setTimeout(() => {
      fromQueue.current = true;
      if (r.k === "row") countRow(r.r); else if (r.k === "card") tapCard(r.m); else if (r.k === "tile") tapTile(r.yr);
      else if (r.k === "hop4") hop4(r.dir); else if (r.k === "hop") hop();
      fromQueue.current = false;
    }, 30);
  });
  /* the runtime takes no tap on the board while an act plays: a tap then is read here (which card, row, key or tile) and queued */
  const tapRef = useRef<any>(null);
  tapRef.current = (e: any) => {
    if (e.isTrusted === false || !busy.current || traceBusy.current || !(ask || free) || pend.current.length >= 12) return;
    const sp = stagePoint(e, e.clientX, e.clientY);
    if (!sp) return;
    const p = { x: sp.x - W.x, y: sp.y - W.y }, inB = (b: any) => p.x >= b.x && p.x <= b.x + b.w && p.y >= b.y && p.y <= b.y + b.h;
    let req: any = null;
    if (P === 1 && !free && !(ask && it.kind === "weeks")) { const m = CE_MON3.findIndex((_, k) => inB(ceCard1(k))); if (m >= 0) req = { k: "card", m }; }
    else if (P === 1 && ask) { const cell = ceCellAt(CEB, pg.y, pg.m, p); if (cell) req = { k: "row", r: cell.r }; }
    else if (P === 3) { if (inB({ x: 806, y: 440, w: 220, h: 72 })) req = { k: "hop4", dir: 1 }; else if (inB({ x: 556, y: 440, w: 220, h: 72 })) req = { k: "hop4", dir: -1 }; else { const j = [0, 1, 2, 3].find((q) => inB(CE_TILE(q))); if (j !== undefined) req = { k: "tile", yr: 2026 + j }; } }
    else if (P === 4 && inB({ x: 660, y: 440, w: 240, h: 72 })) req = { k: "hop" };
    if (req) pend.current.push({ ...req, t: Date.now() });
  };
  useEffect(() => {
    const h = (e: any) => tapRef.current && tapRef.current(e);
    window.addEventListener("pointerdown", h, true);
    return () => window.removeEventListener("pointerdown", h, true);
  }, []);
  api.onEnter(stage === "demo" && stepOn ? () => doStep(stepOn) : null);
  HOOK.demo = () => doStep(stepOn);
  HOOK.check = () => { if (ask && !gateNow) upd(ceInstant(n, it, S)); return undefined; };

  /* ── the traceback: the child's act is undone (its result named the answer), the working is replayed and stops
     one step before the answer (MISS HIDES THE ANSWER); the gate stays open ── */
  const traceSteps = () => {
    const st: any[] = [[380, null]];
    if (n === 1 && it.kind === "weeks") {
      ceFullRows(2026, it.page).slice(0, 3).forEach((r) => st.push([620, () => upd((p: any) => ({ rows: ceAddU(p.rows, "2026-" + it.page + "-" + r), weeks: p.weeks + 1 }))]));
    } else if (n === 1 && it.kind === "pages") {
      for (let m = 0; m < 11; m++) st.push([300, () => upd((p: any) => ({ pg: { y: 2026, m }, seen: ceAddU(p.seen, m) }))]);
    } else if (n === 1) {
      for (let c = 1; c <= 4; c++) st.push([420, () => upd({ wk52: c })]);
      st.push([600, () => upd({ yearDone: true, pg: { y: 2026, m: 11 } })]);
    } else if (n === 2) {
      const [w0, w1] = qi === 0 ? [0, 5] : qi === 1 ? [0, 4] : [7, 9];
      for (let j = w0; j <= w1; j++) st.push([420, () => upd({ trace: { on: true, w0, walk: j } })]);
      /* the asked month`s page, lit a week at a time: Q1 and Q2 stop one day short; Q3 lights September, then October, to the 28th */
      (qi === 2 ? [8, 9] : [it.months[0]]).forEach((sm: number) => {
        st.push([350, () => upd((p: any) => ({ trace: { ...p.trace, sm, wk: 0, upto: 0 } }))]);
        for (let k = 1; k <= 4; k++) st.push([450, () => upd((p: any) => ({ trace: { ...p.trace, wk: k, upto: 7 * k } }))]);
        if (qi < 2) st.push([500, () => upd((p: any) => ({ trace: { ...p.trace, upto: ceLen(2026, sm) - 1 } }))]);
        else st.push([700, null]);
      });
    } else if (n === 3) {
      if (qi === 0) [2032, 2036, 2040, 2044].forEach((y) => st.push([600, () => upd((p: any) => ({ mk: y, lit: ceAddU(p.lit, y) }))]));
      else if (qi === 1) { st.push([600, () => upd({ trace: { on: true, dim: [2042] } })]); st.push([600, () => upd({ trace: { on: true, dim: [2042, 2046] } })]); }
      else st.push([700, () => upd((p: any) => ({ mk: 2044, lit: ceAddU(p.lit, 2044) }))]);
    } else {
      const d0 = it.from, hopsTo = qi === 0 ? [10, 17, 24] : qi === 1 ? [13] : [8, 15, 22];
      st.push([500, () => upd({ circ: d0, ring: 1, hops: [] })]);
      hopsTo.forEach((d) => st.push([600, () => upd((p: any) => ({ hops: [...p.hops, d] }))]));
      if (it.date) st.push([600, () => upd({ trace: { on: true, extra: [23] } })]);
    }
    st.push([420, null]);
    return st;
  };
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    traceBusy.current = true; lockMemo.current = true;
    api.lock(true);
    upd(() => ({ ...E.current.fresh, gate: true, trace: { on: true } }));
    tl.run(traceSteps(), () => {
      traceBusy.current = false; lockMemo.current = null;
      upd((p: any) => ({ trace: { ...(p.trace || {}), on: false } }));
      api.lock(false);
    });
  }, [wrong]);
  useEffect(() => () => { tl.stop(); traceBusy.current = false; }, [ek]);

  /* the win line, once */
  const saidWin = useRef(-1);
  useEffect(() => { if (stage === "win" && saidWin.current !== ek && it.win) { saidWin.current = ek; api.say(it.win); } }, [stage, ek]);

  /* what the host and the agent read back (no answer before it is given) */
  api.share({ month: CE_MONTHS[pg.m], year: pg.y, view, knuckles: Object.keys(S.placed).map((k) => CE_MONTHS[+k]), circled: S.circ,
    hop: S.hops.length ? S.hops[S.hops.length - 1] : null, ...(won ? { weeks: S.hops.length || S.weeks, answer: typed } : {}) });

  /* ── drawing ─────────────────────────────────────────────────────────────────────────────── */
  const tr = S.trace;
  /* o.fit: the room a label has; a longer word (a Gujarati month) is squeezed into it, never cut */
  const label = (x: number, y: number, s: any, o: any = {}) => {
    const fs = o.fs || T.micro;
    const est = o.fit ? Array.from(String(s)).filter((ch) => !CE_ZERO_W.test(ch)).length * 0.62 * fs : 0;
    const sq = o.fit && est > o.fit ? { textLength: o.fit, lengthAdjust: "spacingAndGlyphs" } : {};
    return <text x={x} y={y} textAnchor={o.a || "start"} fontSize={fs} fontWeight={o.fw || 600} fill={o.c || CE.ink} {...(sq as any)}>{s}</text>;
  };
  const chipW = (s: string, min: number) => Math.max(min, Math.round(Array.from(s).length * 0.64 * T.label) + 36);
  const winChip = (ax: number, y: number, min: number, s: string, align: string = "end") => { const w = chipW(s, min), x = align === "end" ? ax - w : ax - w / 2; return (
    <g data-reveals="answer" filter="url(#ce-sh)">
      <rect x={x} y={y} width={w} height={48} rx={14} fill={mix(CE.ans, "#FFFFFF", 0.88)} stroke={shade(CE.ans, 0.25)} strokeWidth={3} />
      <text x={x + w / 2} y={y + 33} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(CE.ans, 0.45)}>{s}</text>
    </g>
  ); };
  const keyText = (s: string, on: boolean) => <text y={11} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={on ? CE.ink : mix(CE.ink, "#FFFFFF", 0.22)}>{tx(s)}</text>;
  const arrowGlyph = (dir: number, on: boolean) => <path d={dir > 0 ? "M -7 -16 L 9 0 L -7 16" : "M 7 -16 L -9 0 L 7 16"} fill="none" stroke={on ? CE.ink : mix(CE.ink, "#FFFFFF", 0.3)} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />;
  let inv: any = null;   /* the one invite */

  /* the big calendar: phases 1, 3, 4 and free play */
  const bigCal = () => {
    const shownPg = won && P === 3 && it.dir === 1 && it.answer === 29 ? { y: 2044, m: 1 } : pg;
    const lit: any = {}, overs: any[] = [], unders: any[] = [];
    const cell = (d: number) => ceCellC(CEB, shownPg.y, shownPg.m, d);
    if (P === 1) {
      const f = ceDow(pg.y, pg.m, 1);
      S.rows.forEach((key: string) => { const [y, m, r] = key.split("-").map(Number); if (y === pg.y && m === pg.m) for (let c = 0; c < 7; c++) lit[r * 7 - f + 1 + c] = CE.hop; });
      if (S.hot) { const [y, m, r] = S.hot.key.split("-").map(Number); if (y === pg.y && m === pg.m) for (let c = 0; c < S.hot.k; c++) lit[r * 7 - f + 1 + c] = CE.hop; }
      if (S.yearDone && pg.y === 2026 && pg.m === 11) lit[31] = CE.amber;
    }
    if (P === 4) {
      S.hops.forEach((d: number) => { lit[d] = CE.hop; });
      if (tr && tr.extra) tr.extra.forEach((d: number) => { lit[d] = CE.extra; });
      const chain = [S.circ, ...S.hops];
      for (let k = 1; k < chain.length; k++) {
        const pts = ceArcPts(cell(chain[k - 1]), cell(chain[k]), 12);
        unders.push(<path key={"arc" + k} d={cePath(pts, 1)} fill="none" stroke={CE.pencil} strokeWidth={4} strokeLinecap="round" />);
        const e = pts[pts.length - 1];
        overs.push(<path key={"tick" + k} d={`M ${e.x - 4} ${e.y - 10} l 4 5 l 8 -10`} fill="none" stroke={shade(CE.hop, 0.3)} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />);
      }
      if (S.arc) unders.push(<path key="arcnow" d={cePath(ceArcPts(cell(S.arc.a), cell(S.arc.b), 12), S.arc.t)} fill="none" stroke={CE.pencil} strokeWidth={4} strokeLinecap="round" />);
      if (S.circ !== null) overs.push(<path key="ring" d={cePath(ceRingPts(cell(S.circ), 28), S.ring)} fill="none" stroke={CE.ink} strokeWidth={4.5} strokeLinecap="round" />);
      if (S.circ2) overs.push(<path key="ring2" d={cePath(ceRingPts(cell(S.circ2), 28), S.ring2)} fill="none" stroke={CE.ink} strokeWidth={4.5} strokeLinecap="round" />);
      if (!free && !demo && it.to && it.kind === "weeks") overs.push(<path key="end" d={cePath(ceRingPts(cell(it.to), 28), 1)} fill="none" stroke={CE.ink} strokeWidth={3} strokeDasharray="7 6" />);
      if (won && !free) {
        const ad = it.kind === "weeks" ? it.to : it.kind === "due" ? it.to : it.date;
        const ac = ceRC(shownPg.y, shownPg.m, ad).c;
        overs.push(<g key="won" data-reveals="answer">
          <path d={cePath(ceRingPts(cell(ad), 28), 1)} fill="none" stroke={CE.ans} strokeWidth={5} />
          {it.choices && <rect x={gx + ac * CEB.cw + 2} y={CEB.y + CEB.bar + 2} width={CEB.cw - 4} height={CEB.head - 4} rx={8} fill="none" stroke={CE.ans} strokeWidth={4} />}
        </g>);
      }
    }
    if (P === 3 && won && it.answer === 29) overs.push(<g key="won29" data-reveals="answer"><path d={cePath(ceRingPts(cell(29), 28), 1)} fill="none" stroke={CE.ans} strokeWidth={5} /></g>);
    const arrowsOn = live && (P === 1 || (P === 3 && stage === "demo") || free) && !(P === 1 && ask && it.kind === "weeks");
    const sq29 = P === 3 ? S.sq : undefined;
    return (
      <g>
        {cePageG(CEB, shownPg.y, shownPg.m, { view, tx, lang, headsOnly: P === 4 && !free && !demo && !won && it.choices ? [it.head] : null, arrows: true, lit, under: unders, over: overs, sq29 })}
        {leaf && (() => {
          const L = gx, R = gx + 7 * CEB.cw, Y0 = gy, Y1 = gy + CEB.rows * CEB.ch, mid = (L + R) / 2;
          const xs = leaf.k === 2 ? [mid - 14, mid + 14] : (leaf.k === 1) === (leaf.dir > 0) ? [mid, R] : [L, mid];
          return <polygon points={`${xs[0]},${Y0} ${xs[1]},${Y0 + 16} ${xs[1]},${Y1 - 16} ${xs[0]},${Y1}`} fill={CE.paper} stroke={C.rule} strokeWidth={3} pointerEvents="none" />;
        })()}
        {(() => {
          /* the calendars run January 2000 to December 2099: an arrow at the end of that range is dim */
          const prevOn = arrowsOn && !(pg.y <= 2000 && pg.m === 0), nextOn = arrowsOn && !(pg.y >= 2099 && pg.m === 11);
          return <g>
            <Key id="prev" label={tx("Last month")} x={CEB.x + 6} y={CEB.y + 6} w={72} h={72} C={C} disabled={!prevOn} onClick={() => { touch(); flip(-1); }}>{arrowGlyph(-1, prevOn)}</Key>
            <Key id="next" label={tx("Next month")} x={CEB.x + CEB.w - 78} y={CEB.y + 6} w={72} h={72} C={C} disabled={!nextOn} onClick={() => { touch(); flip(1); }}>{arrowGlyph(1, nextOn)}</Key>
          </g>;
        })()}
        {gridMode && live && (
          <g data-control={gridMode} role="button" tabIndex={0} style={{ touchAction: "none" } as any} aria-label={tx(gridMode === "week" ? "Calendar rows" : "Calendar dates")}
            {...gridPress.bind()} onKeyDown={gridKeys} onPointerDownCapture={capPt}>
            <rect x={gx} y={gy} width={7 * CEB.cw} height={CEB.rows * CEB.ch} fill="transparent" />
          </g>
        )}
        <Key id="grid" label={tx(view === "grid" ? "Wall view" : "Grid view")} x={8} y={440} w={200} h={72} C={C} disabled={!(live || won)}
          onClick={() => { touch(); setView((v: string) => (v === "grid" ? "wall" : "grid")); }}>{keyText(view === "grid" ? "Wall view" : "Grid view", live || won)}</Key>
      </g>
    );
  };

  /* phase 1: month cards and the week counter */
  const phase1 = () => {
    const cardsOn = live && !(ask && it.kind === "weeks");
    const big52 = S.wk52 > 0 || S.yearDone;
    const blocks = Math.min(6, S.weeks + (S.hot ? 1 : 0));
    const showSums = (tr && it.kind === "weeks") || (won && it.kind === "weeks");
    return (
      <g>
        {CE_MON3.map((s, m) => {
          const b = ceCard1(m), seen = S.seen.indexOf(m) >= 0, open = S.open.indexOf(m) >= 0;
          return (
            <g key={"card" + m} filter="url(#ce-sh)">
              <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={12} fill={seen ? mix(CE.hop, "#FFFFFF", 0.78) : cardsOn || won ? "#FFFFFF" : "#F1EEE7"} stroke={cardsOn || won ? CE.ink : mix(CE.ink, "#FFFFFF", 0.45)} strokeWidth={2.4} />
              <rect x={b.x + 2} y={b.y + 2} width={b.w - 4} height={12} rx={6} fill={seen ? CE.hop : C.panel} />
              {open
                ? <g>{label(b.x + b.w / 2, b.y + 38, tx(s), { a: "middle", fw: 700 })}{label(b.x + b.w / 2, b.y + 68, String(ceLen(2026, m)), { a: "middle", fw: 700, c: shade(CE.hop, 0.35) })}</g>
                : label(b.x + b.w / 2, b.y + 50, tx(s), { a: "middle", fs: ceFitFs(tx(s), b.w), fw: 700, c: cardsOn || won ? CE.ink : mix(CE.ink, "#FFFFFF", 0.3) })}
              {cardsOn && <Hit id={"card-" + s.toLowerCase()} x={b.x} y={b.y} w={b.w} h={b.h} label={tx(CE_MONTHS[m])} onPress={() => { touch(); tapCard(m); }} />}
            </g>
          );
        })}
        <rect x={490} y={180} width={580} height={246} rx={18} fill={mix(C.panel, "#FFFFFF", 0.55)} stroke={C.rule} strokeWidth={2.4} filter="url(#ce-sh)" />
        {label(510, 214, tx(big52 ? "52 weeks" : "Week counter"), { fw: 700 })}
        {!big52 && Array.from({ length: blocks }, (_, k) => {
          const bx = 512, by = 232 + k * (blocks > 4 ? 32 : 48), n7 = k < S.weeks ? 7 : S.hot ? S.hot.k : 0;
          return (
            <g key={"blk" + k}>
              {Array.from({ length: 7 }, (_, s) => <rect key={s} x={bx + s * 32} y={by} width={28} height={28} rx={6} fill={s < n7 ? mix(CE.hop, "#FFFFFF", 0.35) : "#FFFFFF"} stroke={CE.ink} strokeWidth={2.4} />)}
              {showSums && k < 3 && label(bx + 234, by + 26, String(7 * (k + 1)), { fs: T.label, fw: 700 })}
              {showSums && k === 3 && won && <g data-reveals="answer">{label(bx + 234, by + 26, String(28), { fs: T.label, fw: 700, c: shade(CE.ans, 0.4) })}</g>}
            </g>
          );
        })}
        {big52 && <g>
          {[0, 1, 2, 3].map((col) => Array.from({ length: 13 }, (_, r) => (
            <g key={"w" + col + "." + r}>
              {Array.from({ length: 7 }, (_, s) => <rect key={s} x={518 + col * 118 + s * 13} y={246 + r * 11} width={11} height={9} fill={col < S.wk52 ? mix(CE.hop, "#FFFFFF", 0.3) : "#FFFFFF"} stroke={CE.ink} strokeWidth={1.5} />)}
            </g>
          )))}
          {S.yearDone && <g>
            <rect x={968} y={344} width={30} height={30} rx={6} fill={CE.amber} stroke={CE.ink} strokeWidth={2.4} />
            {label(518, 416, "364 " + tx("days"), { fw: 700 })}
            {label(900, 416, tx("1 day left"), { fw: 700 })}
          </g>}
        </g>}
        {won && winChip(1060, 190, 176, it.kind === "pages" ? "12 " + tx("pages") : it.kind === "year" ? "365 " + tx("days") : "28 " + tx("days"))}
        {it.kind === "pages" && !free && <Key id="flip" label={tx("Flip year")} x={660} y={440} w={240} h={72} C={C} disabled={!(ask)} onClick={() => { touch(); flipYear(); }}>{keyText("Flip year", ask)}</Key>}
        {it.kind === "year" && !demo && !free && <Key id="count" label={tx("Count weeks")} x={660} y={440} w={240} h={72} C={C} disabled={!(ask && !S.yearDone)} onClick={() => { touch(); countWeeks(); }}>{keyText("Count weeks", ask && !S.yearDone)}</Key>}
      </g>
    );
  };

  /* phase 2: two fists, the month cards and (keypad shut) the month's own page */
  const phase2 = () => {
    const asked: number[] = !demo && it.months ? it.months : [];
    const placed: any = { ...S.placed };
    if (won) asked.forEach((m) => { Object.keys(placed).forEach((k) => { if (placed[k] === m && +k !== m) delete placed[k]; }); placed[m] = m; });
    const dragging = drag.drag && drag.drag.moved ? drag.drag : null;
    const sideM = won && asked.length ? asked[asked.length - 1] : tr && tr.sm !== undefined ? tr.sm : S.side;
    const sideLit: any = {};
    if (won && sideM !== null) for (let d = 1; d <= ceLen(2026, sideM); d++) sideLit[d] = CE.ans;
    else if (tr && tr.sm !== undefined) {
      for (let d = 1; d <= 7 * (tr.wk || 0); d++) sideLit[d] = CE.extra;
      if (tr.upto) for (let d = 29; d <= tr.upto; d++) sideLit[d] = CE.extra;
    }
    /* in a correction no date is printed past the lit run: the child counts on the blank boxes (MISS HIDES THE ANSWER) */
    const sideUpto = won ? undefined : tr && tr.sm !== undefined ? tr.upto || 0 : undefined;
    /* where the month's page stands: right of the fists while the keypad is shut; with the keypad open (it comes back after a
       miss) only while the correction stands, over the fist this question does not use, so the highlighted month stays in view */
    const sideRows = sideM !== null && sideM !== undefined ? Math.ceil((ceDow(2026, sideM, 1) + ceLen(2026, sideM)) / 7) : 6;
    const sideG = sideM === null || sideM === undefined ? null
      : box && box.w >= 1360 ? { ...CEM, rows: sideRows }
      : tr && tr.sm !== undefined && !won ? { ...CEM, rows: sideRows, x: qi === 2 ? 16 : 692, y: 100 } : null;
    const chip = (m: number, j: number, ghost: boolean) => {
      const s = ceSpot(j), days = ceChipDays(m, j), w = s.w, x = s.x - w / 2, y = s.cy - 36;
      const live2 = !ghost && ask && E.current.fresh.placed[m] === undefined;
      /* the owner (2026-10-28): the card of a month this question asks about shows its NAME only; its days appear at the win */
      const hide = !ghost && ((!won && asked.indexOf(m) >= 0) || j !== m), reveal = !ghost && won && asked.indexOf(m) >= 0;
      return (
        <g key={(ghost ? "g" : "p") + m} filter={ghost ? undefined : "url(#ce-sh)"}>
          <rect x={x} y={y} width={w} height={72} rx={12} fill={ghost ? CE.paper : "#FFFFFF"} stroke={CE.ink} strokeWidth={2.4} strokeDasharray={ghost ? "8 6" : undefined} />
          {!ghost && !hide && <rect x={x + 4} y={y + 3} width={w - 8} height={6} rx={3} fill={s.k ? CE.hop : CE.amber} />}
          {ghost || hide ? label(s.x, y + 46, tx(CE_MON3[m]), { a: "middle", fw: 700, fit: w - 16 })
            : <g>{label(s.x, y + 39, tx(CE_MON3[m]), { a: "middle", fw: 700, fit: w - 16 })}<g {...(reveal ? { "data-reveals": "answer" } : {})}>{label(s.x, y + 66, tx(days), { a: "middle", fw: 700, fit: w - 14, c: shade(s.k ? CE.hop : CE.amber, 0.45) })}</g></g>}
          {live2 && <g {...control("m" + (m + 1), tx(CE_MONTHS[m]))} {...drag.bind(m)} {...drag.keys(m)}><rect x={x} y={y} width={w} height={72} rx={12} fill="transparent" /></g>}
        </g>
      );
    };
    const filled = (j: number) => Object.keys(placed).some((k) => placed[k] === j);
    return (
      <g>
        {ceFistG(CE_FX[0], CE_FIST.y, CE_FIST.s, true, CE_FIST.show)}{ceFistG(CE_FX[1], CE_FIST.y, CE_FIST.s, false, CE_FIST.show)}
        {Array.from({ length: 12 }, (_, j) => { const s = ceSpot(j), full = filled(j), open = (dragging || (ask && S.pick !== null && S.pick !== undefined)) && !full; return (
          <g key={"spot" + j}>
            <path d={`M ${s.x} 80 L ${s.px} ${s.py - 9}`} stroke={CE.ink} strokeWidth={2.4} strokeDasharray={full ? undefined : "5 5"} />
            {!full && <rect x={s.x - s.w / 2} y={6} width={s.w} height={72} rx={12} fill={open ? mix(CE.hop, "#FFFFFF", 0.85) : CE.paper} stroke={open ? CE.hop : mix(CE.ink, "#FFFFFF", 0.35)} strokeWidth={open ? 4 : 2} strokeDasharray={open ? "9 5" : "6 6"} />}
            <circle cx={s.px} cy={s.py} r={11} fill={s.k ? CE.hop : CE.amber} stroke="#FFFFFF" strokeWidth={2.5} />
            {!full && ask && S.pick !== null && S.pick !== undefined && <Hit id={"slot-" + (j + 1)} x={s.x - s.w / 2} y={6} w={s.w} h={72} label={tx(s.k ? "Knuckle" : "Dip")} onPress={() => putPicked(j)} />}
          </g>
        ); })}
        {tr && tr.walk !== undefined && Array.from({ length: tr.walk - tr.w0 + 1 }, (_, k) => tr.w0 + k).map((j) => (
          <g key={"walk" + j} pointerEvents="none">
            {!filled(j) && chip(j, j, true)}
            {j === tr.walk && <circle cx={ceSpot(j).px} cy={ceSpot(j).py} r={16} fill="none" stroke="#FFFFFF" strokeWidth={4} />}
          </g>
        ))}
        {Object.keys(placed).map((k) => chip(+k, placed[k], false))}
        {won && asked.length > 0 && <g data-reveals="answer">{asked.map((m) => { const s = ceSpot(m); return <rect key={"wr" + m} x={s.x - s.w / 2 + 2} y={8} width={s.w - 4} height={68} rx={11} fill="none" stroke={CE.ans} strokeWidth={4} />; })}</g>}
        {CE_MON3.map((s, m) => {
          const b = ceCard2(m), gone = placed[m] !== undefined || S.carrying === m || (dragging && dragging.payload === m);
          if (gone) return <rect key={"slot" + m} x={b.x} y={b.y} width={b.w} height={b.h} rx={12} fill="none" stroke={C.rule} strokeWidth={2} strokeDasharray="6 6" />;
          const on = live && !won;
          return (
            <g key={"c2" + m} transform={`translate(${b.x + 40} ${b.y + 36 - (S.pick === m ? 8 : 0)})`} filter={on ? "url(#ce-sh)" : undefined}>
              {cardNode(m)}
              {S.pick === m && <rect x={-46} y={-42} width={92} height={84} rx={16} fill="none" stroke={CE.hop} strokeWidth={4} />}
              {on && <g {...control("m" + (m + 1), tx(CE_MONTHS[m]))} {...drag.bind(m)} {...drag.keys(m)}><rect x={-40} y={-36} width={80} height={72} rx={12} fill="transparent" /></g>}
            </g>
          );
        })}
        {won && asked.length > 0 && winChip(586, 232, 204, it.answer === 1 ? "1 " + tx("more day") : String(it.answer) + " " + tx("days"), "middle")}
        {sideG && (
          <g pointerEvents="none" {...(won ? { "data-reveals": "answer" } : {})}>{cePageG(sideG, 2026, sideM, { view, tx, lang, lit: sideLit, upto: sideUpto })}</g>
        )}
        {dragging && <g transform={`translate(${dragging.x} ${dragging.y})`} pointerEvents="none" filter="url(#fLift)">{cardNode(dragging.payload)}</g>}
      </g>
    );
  };

  /* phase 3: the four-year strip and the year ruler */
  const phase3 = () => {
    const mkShown = S.mkv !== null && S.mkv !== undefined ? S.mkv : S.mk;
    const on = live && !won;
    return (
      <g>
        {[2026, 2027, 2028, 2029].map((yr, j) => {
          const b = CE_TILE(j), shown = S.tiles.indexOf(yr) >= 0, leap = ceLeap(yr), sel = S.sel === yr;
          return (
            <g key={"tile" + yr} filter="url(#ce-sh)">
              <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={14} fill="#FFFFFF" stroke={sel ? CE.hop : CE.ink} strokeWidth={sel ? 5 : 2.4} />
              <rect x={b.x} y={b.y} width={b.w} height={42} rx={14} fill={CE.ink} />
              <rect x={b.x} y={b.y + 26} width={b.w} height={16} fill={CE.ink} />
              {label(b.x + b.w / 2, b.y + 31, tx("Feb"), { a: "middle", fw: 700, c: "#FFFFFF" })}
              {label(b.x + b.w / 2, b.y + 84, String(yr), { a: "middle", fs: T.prompt, fw: 700 })}
              {shown && label(b.x + b.w / 2, b.y + 118, (leap ? "366 " : "365 ") + tx("days"), { a: "middle", fw: 700 })}
              {shown && leap && <g filter="url(#ce-sh)">
                <rect x={b.x - 8} y={b.y + b.h + 10} width={b.w + 16} height={46} rx={12} fill={mix(CE.ans, "#FFFFFF", 0.8)} stroke={shade(CE.ans, 0.2)} strokeWidth={2.4} />
                {label(b.x + b.w / 2, b.y + b.h + 44, tx("Leap year"), { a: "middle", fw: 700, c: shade(CE.ans, 0.45) })}
              </g>}
              {on && <Hit id={"y" + yr} x={b.x} y={b.y} w={b.w} h={b.h} label={String(yr)} onPress={() => { touch(); tapTile(yr); }} />}
            </g>
          );
        })}
        <line x1={CE_RL.x0} y1={CE_RL.y} x2={CE_RL.x1} y2={CE_RL.y} stroke={CE.ink} strokeWidth={6} strokeLinecap="round" />
        {Array.from({ length: CE_RL.y1 - CE_RL.y0 + 1 }, (_, k) => <line key={"t" + k} x1={ceRX(CE_RL.y0 + k)} y1={CE_RL.y - 10} x2={ceRX(CE_RL.y0 + k)} y2={CE_RL.y + 10} stroke={CE.ink} strokeWidth={2.5} />)}
        <g data-scale="ruler">
          {S.lit.map((yr: number) => <g key={"lit" + yr}>
            <circle cx={ceRX(yr)} cy={CE_RL.y} r={11} fill={CE.ans} stroke={CE.ink} strokeWidth={2.4} />
            {yr !== mkShown && label(ceRX(yr), CE_RL.y + ((yr / 4) % 2 ? 74 : 44), String(yr), { a: "middle", fw: 700, c: shade(CE.ans, 0.45) })}
          </g>)}
        </g>
        {tr && tr.dim && tr.dim.map((yr: number) => <g key={"dim" + yr} pointerEvents="none">
          <circle cx={ceRX(yr)} cy={CE_RL.y} r={13} fill="#FFFFFF" stroke="#5A5A5A" strokeWidth={3} strokeDasharray="5 4" />
          {label(ceRX(yr), CE_RL.y + 106, String(yr), { a: "middle", fw: 600, c: "#555555" })}
        </g>)}
        <g>
          <path d={`M ${ceRX(mkShown) - 13} ${CE_RL.y - 34} L ${ceRX(mkShown) + 13} ${CE_RL.y - 34} L ${ceRX(mkShown)} ${CE_RL.y - 12} Z`} fill={CE.hop} stroke={CE.ink} strokeWidth={2} />
          {!S.moving && <g filter="url(#ce-sh)">
            <rect x={ceRX(mkShown) - 52} y={CE_RL.y - 86} width={104} height={46} rx={10} fill="#FFFFFF" stroke={CE.hop} strokeWidth={3} />
            {label(ceRX(mkShown), CE_RL.y - 52, String(mkShown), { a: "middle", fs: T.label, fw: 700 })}
          </g>}
        </g>
        {won && (it.answer === 2045 ? winChip(780, 380, 220, tx("Year") + " 2045", "middle") : it.answer === "2048" ? winChip(780, 380, 220, "2048", "middle") : winChip(780, 380, 220, "29 " + tx("days"), "middle"))}
        <Key id="back4" label={tx("Back 4")} x={556} y={440} w={220} h={72} C={C} disabled={!on} onClick={() => { touch(); hop4(-1); }}>{keyText("Back 4", on)}</Key>
        <Key id="on4" label={tx("On 4")} x={806} y={440} w={220} h={72} C={C} disabled={!on} onClick={() => { touch(); hop4(1); }}>{keyText("On 4", on)}</Key>
      </g>
    );
  };

  /* phase 4 and free play: the week counter, the date to circle and Hop 7 */
  const phase4 = () => {
    const targets: number[] = free ? [] : demo ? [2] : it.date ? [it.from, it.date] : [it.from];
    const hopOn = live && !won && canHop;
    return (
      <g>
        <rect x={490} y={0} width={580} height={330} rx={18} fill={mix(C.panel, "#FFFFFF", 0.55)} stroke={C.rule} strokeWidth={2.4} filter="url(#ce-sh)" />
        {label(510, 36, tx("Week counter"), { fw: 700 })}
        {S.hops.slice(0, 5).map((d: number, k: number) => (
          <g key={"wb" + k}>
            {Array.from({ length: 7 }, (_, s) => <rect key={s} x={514 + s * 38} y={68 + k * 54} width={34} height={34} rx={6} fill={mix(CE.hop, "#FFFFFF", 0.35)} stroke={CE.ink} strokeWidth={2.4} />)}
            {label(800, 68 + k * 54 + 28, String(7 * (k + 1)) + " " + tx("days"), { fs: T.label, fw: 700 })}
          </g>
        ))}
        {won && !free && winChip(1060, 6, 176, it.kind === "weeks" ? "4 " + tx("weeks") : tx(CE_DAYS[CE_DAYID.indexOf(String(it.answer))]))}
        {live && !won && targets.map((d) => { const c = ceCellC(CEB, pg.y, pg.m, d); return <Hit key={"date" + d} id={!free && it.date && d === it.date ? "date-end" : "date"} x={c.x - 36} y={c.y - 36} w={72} h={72} label={tx("Circle the date") + " " + d} onPress={() => { touch(); circle(d); }} />; })}
        <Key id="hop" label={tx("Hop 7")} x={660} y={440} w={240} h={72} C={C} disabled={!hopOn} onClick={() => { touch(); hop(); }}>{keyText("Hop 7", hopOn)}</Key>
      </g>
    );
  };

  /* the one invite: the control the step waits for, or the question's act while it is undone */
  if (stage === "demo" && stepOn && !busy.current) {
    if (stepOn === "week") { const r = firstFreeRow(); if (r !== null) inv = { x: gx + 3.5 * CEB.cw, y: gy + r * CEB.ch + CEB.ch / 2, w: 7 * CEB.cw, h: CEB.ch, rx: 6 }; }
    else if (stepOn.indexOf("card-") === 0) { const b = ceCard1(CE_MON3.findIndex((s) => "card-" + s.toLowerCase() === stepOn)); inv = { x: b.x + b.w / 2, y: b.y + b.h / 2, w: b.w, h: b.h, rx: 12 }; }
    else if (stepOn === "next") inv = { x: CEB.x + CEB.w - 42, y: CEB.y + 42, w: 72, h: 72 };
    else if (/^m\d+$/.test(stepOn)) { const b = ceCard2(+stepOn.slice(1) - 1); inv = { x: b.x + 40, y: b.y + 36, w: 80, h: 72, rx: 12 }; }
    else if (/^y\d+$/.test(stepOn)) { const b = CE_TILE(+stepOn.slice(1) - 2026); inv = { x: b.x + b.w / 2, y: b.y + b.h / 2, w: b.w, h: b.h, rx: 14 }; }
    else if (stepOn === "on4") inv = { x: 916, y: 476, w: 220, h: 72 };
    else if (stepOn === "date") { const c = ceCellC(CEB, pg.y, pg.m, 2); inv = { x: c.x, y: c.y, w: CEB.cw - 9, h: CEB.ch - 9, rx: 8 }; }
    else if (stepOn === "hop") inv = { x: 780, y: 476, w: 240, h: 72 };
  } else if (free && S.circ === null && !busy.current) {
    const c = ceCellC(CEB, pg.y, pg.m, 1); inv = { x: c.x, y: c.y, w: CEB.cw - 9, h: CEB.ch - 9, rx: 8 };
  } else if (ask && !gateNow && !busy.current && !traceBusy.current) {
    if (n === 1 && it.kind === "weeks") { const r = firstFreeRow(); if (r !== null) inv = { x: gx + 3.5 * CEB.cw, y: gy + r * CEB.ch + CEB.ch / 2, w: 7 * CEB.cw, h: CEB.ch, rx: 6 }; }
    else if (n === 1 && it.kind === "pages") inv = { x: 780, y: 476, w: 240, h: 72 };
    else if (n === 1) inv = { x: 780, y: 476, w: 240, h: 72 };
    else if (n === 2) { const m = (it.months || []).find((k: number) => S.placed[k] === undefined); if (m !== undefined && S.pick !== m) { const b = ceCard2(m); inv = { x: b.x + 40, y: b.y + 36, w: 80, h: 72, rx: 12 }; } }
    else if (n === 3) inv = it.dir < 0 ? { x: 666, y: 476, w: 220, h: 72 } : { x: 916, y: 476, w: 220, h: 72 };
    else if (n === 4) {
      const d = it.from;
      if (S.circ !== it.from && !gateNow) { const c = ceCellC(CEB, pg.y, pg.m, d); inv = { x: c.x, y: c.y, w: CEB.cw - 9, h: CEB.ch - 9, rx: 8 }; }
      else if (canHop && !gateNow) inv = { x: 780, y: 476, w: 240, h: 72 };
    }
  }

  return (
    <g>
      <defs>
        <filter id="ce-sh" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.12" />
        </filter>
        <linearGradient id="ce-hdr-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3A3A3A" />
          <stop offset="100%" stopColor="#2B2B2B" />
        </linearGradient>
        <linearGradient id="ce-ring-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#B0A48E" />
          <stop offset="50%" stopColor="#ECE5D8" />
          <stop offset="100%" stopColor="#9E927C" />
        </linearGradient>
      </defs>
      {P !== 2 && bigCal()}
      {P === 1 && phase1()}
      {P === 2 && phase2()}
      {P === 3 && phase3()}
      {P === 4 && phase4()}
      {inv && <Invite x={inv.x} y={inv.y} w={inv.w} h={inv.h} rx={inv.rx} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const L = result && result.last;
  if (!L) return null;
  const item: any = it || L.it || (PHASES[(n || 1) - 1] && PHASES[(n || 1) - 1].items[L.item]) || {};
  const v = L.value;
  const k = CE_DAYID.indexOf(String(v));
  /* a word is drawn only in a language that has it (English, or a TR line); otherwise the picture says it */
  const has = (s: string) => lang === "en" || tx(s) !== s;
  const day = item.choices && k >= 0;
  const pre = item.pre && has(item.pre) ? tx(item.pre) + " " : "";
  const txt = day ? (has(CE_DAYS[k]) ? tx(CE_DAYS[k]) : "") : pre + String(v) + (item.unit && has(item.unit) ? " " + tx(item.unit) : "");
  const H = h || 80, ih = Math.min(44, H - 16), iy = (H - ih) / 2, tx0 = ih + 24;
  /* a picture per phase (a page counted in weeks, a fist, a leap February, hops down a column), then the child's answer */
  const ph = n || 1;
  const icon = ph === 2
    ? <g>{[0, 1, 2, 3].map((c) => <circle key={c} cx={16 + c * (ih - 8) / 4 + 6} cy={iy + 14} r={(ih - 8) / 8 + 2} fill={CE.skin} stroke={CE.skinEdge} strokeWidth={1.5} />)}
        <rect x={14} y={iy + 14} width={ih - 4} height={ih - 16} rx={8} fill={CE.skin} stroke={CE.skinEdge} strokeWidth={1.5} /></g>
    : <g>
        <rect x={12} y={iy} width={ih} height={ih} rx={6} fill="#FFFFFF" stroke={CE.ink} strokeWidth={2} />
        <rect x={12} y={iy} width={ih} height={ih * 0.3} rx={4} fill={CE.ink} />
        {ph === 3 && <circle cx={12 + ih * 0.72} cy={iy + ih * 0.66} r={ih * 0.16} fill="none" stroke={CE.ans} strokeWidth={3} />}
        {ph === 4 && <path d={`M ${12 + ih * 0.3} ${iy + ih * 0.42} q -8 ${ih * 0.2} 0 ${ih * 0.42}`} fill="none" stroke={CE.pencil} strokeWidth={2.5} />}
        {ph === 1 && [0, 1, 2].map((c) => <rect key={c} x={18 + c * ((ih - 12) / 3)} y={iy + ih * 0.42} width={(ih - 12) / 3 - 3} height={ih * 0.22} fill={mix(CE.hop, "#FFFFFF", 0.4)} stroke={CE.ink} strokeWidth={1} />)}
      </g>;
  const est = (size: number) => Array.from(txt).filter((ch) => !CE_ZERO_W.test(ch)).length * 0.66 * size;
  const room = w - tx0 - 10, fs = est(T.label) <= room ? T.label : T.micro, squeeze = est(T.micro) > room;
  return (
    <g>
      <rect x={0} y={0} width={w} height={H} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      {icon}
      {txt ? <text x={tx0} y={H / 2 + fs * 0.36} textAnchor="start" fontSize={fs} fontWeight={700} fill={C.ink} {...(squeeze ? { textLength: room, lengthAdjust: "spacingAndGlyphs" } : {})}>{txt}</text>
        : day && Array.from({ length: 7 }, (_, c) => <rect key={"wk" + c} x={tx0 + c * 20} y={H / 2 - 9} width={17} height={18} rx={3} fill={c === k ? CE.ans : "#FFFFFF"} stroke={CE.ink} strokeWidth={1.5} />)}
    </g>
  );
}

function CalendarExplorer(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b) */
      board: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d, PATTERNS.md §16): no question bar, only its blinking key at the top right */
      keyOnly: true,
      /* the standard keypad, not the wide one: the seven-column page beside the fists, the strip and the week counter
         needs the classic open width (1086); with bigPad it would run under the panel (PATTERNS 9g) */
      bigPad: false,
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself */
      nextKey: true,
      /* NAV DOTS (LAYOUT.md §1d) */
      navDots: true,
      /* the start page: the tool's name, StartArt, START_HOOK, a Start key */
      StartArt, START_HOOK,
      }} />
  );
}

export default CalendarExplorer;