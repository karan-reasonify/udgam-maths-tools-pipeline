/* ═══ M3.S5.T9.C30.2D1 · date_counter · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build. THE LESSON IS SILENT (runtime r30): every line is
   printed on the bubble. keyOnly + navDots (the new look, LAYOUT §1d-§1e, PATTERNS §15-§16). NO imports in this file.
   The calendar is drawn in code (IMAGES §3: dates and marks), so there is no <Skin> anywhere.
   The picture is laid out in the OPEN width (x 0 to 900, bigPad) and never moves when the keypad opens (LAYOUT §3).
   A date answer: the DAY is typed on the pad and the MONTH is tapped on its card (the month name above each calendar);
   Enter sends "7 December" through api.onEnter (the owner, 2026-11-16, NOTES "Owner decisions").
   Edit, never rewrite. */

const TOOL_ID = "date_counter";
const MEDIA_ID = "M3.S5.T9.C30.2D1";
const TOOL_NAME = "Date Counter";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (not shown: phase 1 has steps) */
const OPENING = ["A calendar with two dates marked, waiting to be counted."];
/* the whole-tool line (not shown from r44) */
const FINISH_LINE = "You counted the days between dates and found a date some days after.";
/* printed when the child opens Free play */
const FREE_LINE = "Free play. Move the start and end dates and count the days between.";

/* THE START PAGE: a calendar of two months, no digits (no answer can show), a run of days and a jump */
const START_HOOK = "How many days does a fair last, from its first day to its last?";
function StartArt({ box, C }: any) {
  const pw = 420, gap = 60, x0 = (box.w - 2 * pw - gap) / 2, cw = pw / 7, ch = 44, top = 70;
  const page = (px: number, run: (k: number) => boolean, ends: number[]) => (
    <g>
      <rect x={px} y={0} width={pw} height={300} rx={18} fill={C.paper} stroke={C.ink} strokeWidth={4} />
      <rect x={px} y={0} width={pw} height={56} rx={18} fill={tint(DC_BLUE, 0.2)} />
      <rect x={px} y={36} width={pw} height={20} fill={tint(DC_BLUE, 0.2)} />
      {Array.from({ length: 35 }, (_, k) => {
        const x = px + (k % 7) * cw, y = top + Math.floor(k / 7) * ch;
        const end = ends.includes(k), on = run(k);
        return <rect key={k} x={x + 3} y={y + 3} width={cw - 6} height={ch - 6} rx={6}
          fill={end ? DC_BLUE : on ? tint(DC_BLUE, 0.7) : "#FFFFFF"} stroke={C.ink} strokeWidth={2.4} />;
      })}
    </g>
  );
  const p2 = x0 + pw + gap;
  return (
    <g>
      <defs>
        <filter id="start-shadow" x="-5%" y="-5%" width="110%" height="110%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000000" floodOpacity="0.12" />
        </filter>
      </defs>
      <g filter="url(#start-shadow)">
        {page(x0, (k) => k >= 26, [26])}
        {page(p2, (k) => k <= 7, [7])}
      </g>
      <path d={`M ${p2 + 0.5 * cw} ${top + ch + 6} Q ${p2 + 2 * cw} ${top + ch - 40} ${p2 + 3.5 * cw} ${top + ch + 6}`}
        fill="none" stroke={DC_VIOLET} strokeWidth={6} strokeLinecap="round" />
    </g>
  );
}

/* Hindi and Gujarati, keyed by the English byte for byte (PATTERNS §11). Month names translate for DISPLAY only;
   the answer sent on Enter stays the English "7 December" the judge compares. */
const TR: any = {
  hi: {
    "Date Counter": "तारीख गिनती",
    "How many days does a fair last, from its first day to its last?": "मेला पहले दिन से आखिरी दिन तक कितने दिन चलता है?",
    "Free play. Move the start and end dates and count the days between.": "मुक्त खेल। पहला और आखिरी दिन खिसकाओ और बीच के दिन गिनो।",
    "A calendar with two dates marked, waiting to be counted.": "दो तारीखों वाला कैलेंडर, गिनने को तैयार।",
    "You counted the days between dates and found a date some days after.": "तुमने तारीखों के बीच दिन गिने और कुछ दिन बाद की तारीख ढूँढी।",
    "Counting both days": "दोनों दिन गिनना",
    "Tap Shade to shade the days from 3 March to 5 March.": "3 मार्च से 5 मार्च तक के दिन रंगने के लिए रंगो दबाओ।",
    "The Shade key is under the calendar.": "रंगो बटन नीचे है।",
    "Tap Count to count the shaded days, the first and the last too.": "गिनो दबाकर रंगे दिन गिनो, पहला और आखिरी भी।",
    "Now press the Count key.": "अब गिनो बटन दबाओ।",
    "Counting both days, the days are the end date minus the start date, then add 1.": "दोनों दिन गिनने पर, आखिरी दिन में से पहला दिन घटाकर 1 जोड़ो।",
    "You learned: counting both days is end date minus start date, plus 1.": "तुमने सीखा: दोनों दिन = आखिरी दिन − पहला दिन + 1।",
    "A book fair is open from 8 to 16 September; how many days, both days counted?": "मेला 8 से 16 सितंबर तक खुला है; दोनों दिन गिनकर कितने दिन?",
    "Days the fair is open?": "मेला कितने दिन?",
    "The first day of the fair, 8 September, is counted too.": "मेले का पहला दिन, 8 सितंबर, भी गिना जाता है।",
    "Yes, the fair is open for 9 days.": "हाँ, मेला 9 दिन खुला है।",
    "From 2 October to 7 October, counting both days, how many days is that?": "2 अक्टूबर से 7 अक्टूबर तक, दोनों दिन गिनकर, कितने दिन हुए?",
    "Days, both counted?": "दोनों गिनकर कितने दिन?",
    "Both 2 October and 7 October are counted as days.": "2 अक्टूबर और 7 अक्टूबर, दोनों दिन गिने जाते हैं।",
    "Yes, that is 6 days with both ends.": "हाँ, दोनों छोर गिनकर 6 दिन।",
    "first date": "पहली तारीख",
    "last date": "आखिरी तारीख",
    "Two friends say when the visit was; on which dates could it be?": "दो मित्र बताते हैं कि मुलाक़ात कब थी; वह किन तारीखों को हो सकती है?",
    "Dates in both lists?": "दोनों सूचियों की तारीखें?",
    "After a date leaves that date out, and so does before.": "'के बाद' उस तारीख को छोड़ देता है, और 'से पहले' भी।",
    "Yes, the visit was on the 9th or the 10th.": "हाँ, मुलाक़ात 9 या 10 तारीख को थी।",
    "Across a month end": "महीने के अंत के पार",
    "Tap Cut to cut the run at the end of April.": "अप्रैल के अंत पर दिनों की कतार काटने के लिए काटो दबाओ।",
    "The Cut key is under the calendars.": "काटो बटन नीचे है।",
    "Tap Count to count each part of the run.": "गिनो दबाकर हर भाग गिनो।",
    "Now press Count.": "अब गिनो दबाओ।",
    "Across a month end, count each month's part and add the two.": "महीने के अंत के पार, हर महीने का भाग गिनो और दोनों जोड़ो।",
    "You learned: across a month end, count each month's part, then add.": "तुमने सीखा: महीने के अंत के पार, हर महीने का भाग गिनकर जोड़ो।",
    "A camp runs from 27 July to 8 August; how many days, both days counted?": "शिविर 27 जुलाई से 8 अगस्त तक है; दोनों दिन गिनकर कितने दिन?",
    "Days of the camp?": "शिविर के दिन?",
    "Count from 27 July to the last day of July first.": "पहले 27 जुलाई से जुलाई के आखिरी दिन तक गिनो।",
    "Yes, 5 days in July and 8 in August make 13.": "हाँ, जुलाई के 5 और अगस्त के 8 दिन मिलकर 13।",
    "From 29 October to 2 November, counting both days, how many days is that?": "29 अक्टूबर से 2 नवंबर तक, दोनों दिन गिनकर, कितने दिन हुए?",
    "Days across the month end?": "महीने के अंत के पार दिन?",
    "Count the last day of the first month, then the first days of the next.": "पहले महीने का आखिरी दिन गिनो, फिर अगले महीने के पहले दिन।",
    "Yes, 3 days and 2 days make 5.": "हाँ, 3 दिन और 2 दिन मिलकर 5।",
    "How many days are there from 22 August to 5 September, with both days counted?": "22 अगस्त से 5 सितंबर तक कितने दिन हैं, दोनों दिन शामिल करके?",
    "Days, August to September?": "अगस्त से सितंबर, दिन?",
    "August has 31 days, so count up to the 31st first.": "अगस्त में 31 दिन होते हैं, तो पहले 31 तक गिनो।",
    "Yes, 10 days and 5 days make 15.": "हाँ, 10 और 5 दिन मिलकर 15।",
    "Finding the last day": "आखिरी दिन ढूँढना",
    "A 3-day fair begins on 5 June; tap Mark to make 5 June day 1.": "3 दिन का मेला 5 जून को शुरू होता है; 5 जून को दिन 1 बनाने के लिए निशान दबाओ।",
    "The Mark key is under the calendars.": "निशान बटन नीचे है।",
    "Tap Count to count on to day 3, the last day.": "गिनो दबाकर दिन 3 तक गिनो, जो आखिरी दिन है।",
    "Now press Count to go on.": "आगे बढ़ने को गिनो दबाओ।",
    "The last day is the start date plus one day fewer than the number of days.": "आखिरी दिन पाने को शुरू की तारीख में दिनों से एक कम जोड़ो।",
    "You learned: the last day is the start plus one day fewer than the days.": "तुमने सीखा: आखिरी दिन = शुरू + दिनों से एक कम।",
    "A 16-day course begins on 22 November; on which date does it end?": "16 दिन का कोर्स 22 नवंबर को शुरू होता है; वह किस तारीख को खत्म होगा?",
    "Last day of the course?": "कोर्स का आखिरी दिन?",
    "22 November is day 1, so count on from there.": "22 नवंबर दिन 1 है, तो वहाँ से आगे गिनो।",
    "Yes, day 16 falls on 7 December.": "हाँ, 16वाँ दिन 7 दिसंबर को आता है।",
    "A fair of 6 days starts on 10 October; what is its last day?": "6 दिन का मेला 10 अक्टूबर को शुरू होता है; उसका आखिरी दिन कौन-सा है?",
    "Last day of the fair?": "मेले का आखिरी दिन?",
    "Start on 10 October as day 1 and count to day 6.": "10 अक्टूबर को दिन 1 मानकर दिन 6 तक गिनो।",
    "Yes, the fair ends on 15 October.": "हाँ, मेला 15 अक्टूबर को खत्म होता है।",
    "A 40-day course ended on 10 August; when did it begin, both days counted?": "कोर्स 40 दिन चला और 10 अगस्त को खत्म हुआ; दोनों दिन गिनकर वह कब शुरू हुआ?",
    "First day of the course?": "कोर्स का पहला दिन?",
    "10 August is day 40, so count back to day 1.": "10 अगस्त दिन 40 है, तो दिन 1 तक पीछे गिनो।",
    "Yes, the course began on 2 July.": "हाँ, शुरुआत 2 जुलाई को हुई।",
    "Days after and a fortnight later": "कुछ दिन बाद और एक पखवाड़े बाद",
    "For 3 days after 20 March, tap Jump to jump to the next day.": "20 मार्च के 3 दिन बाद के लिए, अगले दिन पर जाने को छलाँग दबाओ।",
    "The Jump key is under the calendars.": "छलाँग बटन नीचे है।",
    "Tap Count to jump on, 3 jumps in all.": "गिनो दबाकर आगे छलाँग लगाओ, कुल 3 छलाँगें।",
    "Now press Count for the next jumps.": "अगली छलाँगें: गिनो दबाओ।",
    "After and later mean add the days, without counting the first day again.": "‘बाद’ का मतलब दिन जोड़ना, पहला दिन दोबारा गिने बिना।",
    "You learned: days after are added to the date; a fortnight is 14 days.": "तुमने सीखा: बाद के दिन तारीख में जोड़ो; एक पखवाड़ा 14 दिन का।",
    "A plant is watered on 12 April and again 25 days after; on which date is that?": "पौधे को 12 अप्रैल को पानी दिया, फिर 25 दिन बाद दोबारा; दूसरी बार किस तारीख को?",
    "Second watering?": "दूसरी बार पानी?",
    "12 April is not counted again; the first day after is 13 April.": "12 अप्रैल दोबारा नहीं गिना जाता; उसके बाद का पहला दिन 13 अप्रैल है।",
    "Yes, 25 days after 12 April is 7 May.": "हाँ, 12 अप्रैल के 25 दिन बाद 7 मई है।",
    "What date is 10 days after 6 October?": "6 अक्टूबर के 10 दिन बाद कौन-सी तारीख है?",
    "Date 10 days on?": "10 दिन बाद की तारीख?",
    "Jump from 6 October; the first jump lands on 7 October.": "6 अक्टूबर से छलाँग लगाओ; पहली छलाँग 7 अक्टूबर पर आती है।",
    "Yes, 10 days after 6 October is 16 October.": "हाँ, 6 अक्टूबर के 10 दिन बाद 16 अक्टूबर है।",
    "A jar is filled on 27 October and opened a fortnight later; which date?": "एक बरनी 27 अक्टूबर को भरी और एक पखवाड़े बाद खोली; कौन-सी तारीख?",
    "A fortnight after?": "एक पखवाड़े बाद?",
    "A fortnight is longer than one week of jumps.": "पखवाड़ा एक सप्ताह की छलाँगों से लंबा है।",
    "Yes, a fortnight after 27 October is 10 November.": "हाँ, 27 अक्टूबर के एक पखवाड़े बाद 10 नवंबर है।",
    "Count the shaded cells again, and do not skip the first one.": "रंगे खाने फिर से गिनो, और पहला मत छोड़ो।",
    "Say 1 on the start date and keep counting up to the end date.": "पहले दिन पर 1 बोलो और आखिरी दिन तक गिनते जाओ।",
    "Friend 1": "मित्र 1",
    "Friend 2": "मित्र 2",
    "after 6th,": "6 के बाद,",
    "after 8th,": "8 के बाद,",
    "before 11th": "11 से पहले",
    "before 12th": "12 से पहले",
    "List the dates for each friend, then keep the dates in both lists.": "हर मित्र की तारीखें लिखो, फिर दोनों सूचियों वाली तारीखें रखो।",
    "The dates shaded twice are in both lists.": "दो बार रंगी तारीखें दोनों सूचियों में हैं।",
    "The second part starts on the 1st of the next month.": "दूसरा भाग अगले महीने की 1 तारीख से शुरू होता है।",
    "Last day of the first month minus the start date, plus 1, gives the first part.": "पहले महीने का आखिरी दिन घटा शुरू की तारीख, जोड़ 1, पहला भाग देता है।",
    "The start date is day 1, not day 0.": "शुरू की तारीख दिन 1 है, दिन 0 नहीं।",
    "If the days run past the month's last day, go on from the 1st.": "अगर दिन महीने के आखिरी दिन से आगे जाएँ, तो 1 तारीख से आगे गिनो।",
    "Count back to the start of August, then on into the month before.": "अगस्त की शुरुआत तक पीछे गिनो, फिर उससे पहले वाले महीने में।",
    "Day 1 comes 39 days before 10 August.": "दिन 1, 10 अगस्त से 39 दिन पहले आता है।",
    "Count the jumps, not the cells, starting after the given date.": "खाने नहीं, छलाँगें गिनो, दी गई तारीख के बाद से।",
    "Past the month's last day, the jumps carry on from the 1st.": "महीने के आखिरी दिन के बाद, छलाँगें 1 तारीख से चलती हैं।",
    "A fortnight is two weeks.": "पखवाड़ा यानी दो सप्ताह।",
    "Start": "शुरू",
    "End": "अंत",
    "Lasts": "अवधि",
    "days": "दिन",
    "Date": "तारीख",
    "Jump": "छलाँग",
    "a fortnight": "एक पखवाड़ा",
    "Both": "दोनों",
    "Day": "दिन",
    "Shade": "रंगो",
    "Cut": "काटो",
    "Mark": "निशान",
    "Count": "गिनो",
    "Now tap the month the date falls in.": "अब वह महीना दबाओ जिसमें तारीख आती है।",
    "Tap Jump first, then tap a month.": "पहले छलाँग, फिर महीना दबाओ।",
    "Tap Mark first, then tap a month.": "पहले निशान, फिर महीना दबाओ।",
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
    "Tap Shade first.": "पहले रंगो दबाओ।",
    "Tap Cut first.": "पहले काटो दबाओ।",
    "Tap Mark first.": "पहले निशान दबाओ।",
    "Tap Jump first.": "पहले छलाँग दबाओ।",
    "Type the day, then press Enter.": "पहले दिन की संख्या लिखो।",
    "day": "दिन",
  },
  gu: {
    "Date Counter": "તારીખ ગણતરી",
    "How many days does a fair last, from its first day to its last?": "એક મેળો તેના પહેલા દિવસથી છેલ્લા દિવસ સુધી કુલ કેટલા દિવસ ચાલે?",
    "Free play. Move the start and end dates and count the days between.": "મુક્ત રમત. શરૂ અને અંતની તારીખો ખસેડો અને વચ્ચેના દિવસ ગણો.",
    "A calendar with two dates marked, waiting to be counted.": "બે તારીખવાળું કૅલેન્ડર, ગણવા તૈયાર.",
    "You counted the days between dates and found a date some days after.": "તમે તારીખો વચ્ચેના દિવસ ગણ્યા અને થોડા દિવસ પછીની તારીખ શોધી.",
    "Counting both days": "બંને દિવસ ગણવા",
    "Tap Shade to shade the days from 3 March to 5 March.": "3 માર્ચથી 5 માર્ચ સુધીના દિવસ રંગવા રંગો દબાવો.",
    "The Shade key is under the calendar.": "રંગો બટન નીચે છે.",
    "Tap Count to count the shaded days, the first and the last too.": "ગણો દબાવીને રંગેલા દિવસ ગણો, પહેલો અને છેલ્લો પણ.",
    "Now press the Count key.": "હવે ગણો બટન દબાવો.",
    "Counting both days, the days are the end date minus the start date, then add 1.": "બંને દિવસ ગણતાં, છેલ્લી તારીખમાંથી શરૂની તારીખ બાદ કરી 1 ઉમેરો.",
    "You learned: counting both days is end date minus start date, plus 1.": "તમે શીખ્યા: બંને દિવસ = છેલ્લી તારીખ − શરૂની તારીખ + 1.",
    "A book fair is open from 8 to 16 September; how many days, both days counted?": "પુસ્તક મેળો 8 થી 16 સપ્ટેમ્બર ખુલ્લો છે; બંને દિવસ ગણીને કુલ કેટલા દિવસ?",
    "Days the fair is open?": "મેળો કેટલા દિવસ?",
    "The first day of the fair, 8 September, is counted too.": "મેળાનો પહેલો દિવસ, 8 સપ્ટેમ્બર, પણ ગણાય છે.",
    "Yes, the fair is open for 9 days.": "હા, મેળો 9 દિવસ ખુલ્લો છે.",
    "From 2 October to 7 October, counting both days, how many days is that?": "2 ઑક્ટોબરથી 7 ઑક્ટોબર સુધી, બંને દિવસ ગણીને, કેટલા દિવસ થયા?",
    "Days, both counted?": "બંને ગણીને કેટલા દિવસ?",
    "Both 2 October and 7 October are counted as days.": "2 ઑક્ટોબર અને 7 ઑક્ટોબર, બંને દિવસ ગણાય છે.",
    "Yes, that is 6 days with both ends.": "હા, બંને છેડા ગણીને 6 દિવસ.",
    "first date": "પહેલી તારીખ",
    "last date": "છેલ્લી તારીખ",
    "Two friends say when the visit was; on which dates could it be?": "બે મિત્રો કહે છે મુલાકાત ક્યારે હતી; તે કઈ તારીખોએ હોઈ શકે?",
    "Dates in both lists?": "બંને યાદીની તારીખો?",
    "After a date leaves that date out, and so does before.": "'પછી' એ તારીખને છોડી દે છે, અને 'પહેલાં' પણ.",
    "Yes, the visit was on the 9th or the 10th.": "હા, મુલાકાત 9 કે 10 તારીખે.",
    "Across a month end": "મહિનાના અંતની પાર",
    "Tap Cut to cut the run at the end of April.": "એપ્રિલના અંતે દિવસોની હરોળ કાપવા કાપો દબાવો.",
    "The Cut key is under the calendars.": "કાપો બટન નીચે છે.",
    "Tap Count to count each part of the run.": "ગણો દબાવી દરેક ભાગ ગણો.",
    "Now press Count.": "હવે ગણો દબાવો.",
    "Across a month end, count each month's part and add the two.": "મહિનાના અંતની પાર, દરેક મહિનાનો ભાગ ગણો અને બંને ઉમેરો.",
    "You learned: across a month end, count each month's part, then add.": "તમે શીખ્યા: મહિનાના અંતની પાર, દરેક મહિનાનો ભાગ ગણીને ઉમેરો.",
    "A camp runs from 27 July to 8 August; how many days, both days counted?": "શિબિર 27 જુલાઈથી 8 ઑગસ્ટ સુધી છે; બંને દિવસ ગણીને કેટલા દિવસ?",
    "Days of the camp?": "શિબિરના દિવસ?",
    "Count from 27 July to the last day of July first.": "પહેલાં 27 જુલાઈથી જુલાઈના છેલ્લા દિવસ સુધી ગણો.",
    "Yes, 5 days in July and 8 in August make 13.": "હા, જુલાઈના 5 અને ઑગસ્ટના 8 દિવસ મળીને 13.",
    "From 29 October to 2 November, counting both days, how many days is that?": "29 ઑક્ટોબરથી 2 નવેમ્બર સુધી, બંને દિવસ ગણીને, કેટલા દિવસ થયા?",
    "Days across the month end?": "મહિનાના અંતની પાર દિવસ?",
    "Count the last day of the first month, then the first days of the next.": "પહેલા મહિનાનો છેલ્લો દિવસ ગણો, પછી આવતા મહિનાના પહેલા દિવસો.",
    "Yes, 3 days and 2 days make 5.": "હા, 3 અને 2 દિવસ મળીને 5.",
    "How many days are there from 22 August to 5 September, with both days counted?": "22 ઑગસ્ટથી 5 સપ્ટેમ્બર સુધી કેટલા દિવસ છે, બંને દિવસ સાથે?",
    "Days, August to September?": "ઑગસ્ટથી સપ્ટેમ્બર, દિવસ?",
    "August has 31 days, so count up to the 31st first.": "ઑગસ્ટમાં 31 દિવસ હોય, તો પહેલાં 31 સુધી ગણો.",
    "Yes, 10 days and 5 days make 15.": "હા, 10 અને 5 દિવસ મળીને 15.",
    "Finding the last day": "છેલ્લો દિવસ શોધવો",
    "A 3-day fair begins on 5 June; tap Mark to make 5 June day 1.": "3 દિવસનો મેળો 5 જૂને શરૂ થાય છે; 5 જૂનને દિવસ 1 બનાવવા નિશાન દબાવો.",
    "The Mark key is under the calendars.": "નિશાન બટન નીચે છે.",
    "Tap Count to count on to day 3, the last day.": "ગણો દબાવીને દિવસ 3 સુધી ગણો, જે છેલ્લો દિવસ છે.",
    "Now press Count to go on.": "આગળ વધવા હવે ગણો દબાવો.",
    "The last day is the start date plus one day fewer than the number of days.": "છેલ્લો દિવસ શોધવા, શરૂની તારીખમાં દિવસોથી એક ઓછું ઉમેરો.",
    "You learned: the last day is the start plus one day fewer than the days.": "તમે શીખ્યા: છેલ્લો દિવસ = શરૂ + દિવસોથી એક ઓછું.",
    "A 16-day course begins on 22 November; on which date does it end?": "16 દિવસનો કોર્સ 22 નવેમ્બરથી; તે કઈ તારીખે પૂરો થશે?",
    "Last day of the course?": "કોર્સનો છેલ્લો દિવસ?",
    "22 November is day 1, so count on from there.": "22 નવેમ્બર દિવસ 1 છે, તો ત્યાંથી આગળ ગણો.",
    "Yes, day 16 falls on 7 December.": "હા, 16મો દિવસ 7 ડિસેમ્બરે આવે છે.",
    "A fair of 6 days starts on 10 October; what is its last day?": "10 ઑક્ટોબરે 6 દિવસનો મેળો શરૂ થયો; તેનો છેલ્લો દિવસ કયો?",
    "Last day of the fair?": "મેળાનો છેલ્લો દિવસ?",
    "Start on 10 October as day 1 and count to day 6.": "10 ઑક્ટોબરને દિવસ 1 ગણીને દિવસ 6 સુધી ગણો.",
    "Yes, the fair ends on 15 October.": "હા, મેળો 15 ઑક્ટોબરે પૂરો.",
    "A 40-day course ended on 10 August; when did it begin, both days counted?": "કોર્સ 40 દિવસ ચાલ્યો અને 10 ઑગસ્ટે પૂરો થયો; બંને દિવસ ગણીને તે ક્યારે શરૂ થયો?",
    "First day of the course?": "કોર્સનો પહેલો દિવસ?",
    "10 August is day 40, so count back to day 1.": "10 ઑગસ્ટ દિવસ 40 છે, તો દિવસ 1 સુધી પાછળ ગણો.",
    "Yes, the course began on 2 July.": "હા, કોર્સ 2 જુલાઈએ શરૂ થયો.",
    "Days after and a fortnight later": "થોડા દિવસ પછી અને એક પખવાડિયા પછી",
    "For 3 days after 20 March, tap Jump to jump to the next day.": "20 માર્ચના 3 દિવસ પછી શોધવા, બીજા દિવસે જવા કૂદકો દબાવો.",
    "The Jump key is under the calendars.": "કૂદકો બટન નીચે છે.",
    "Tap Count to jump on, 3 jumps in all.": "ગણો દબાવીને આગળ કૂદો, કુલ 3 કૂદકા.",
    "Now press Count for the next jumps.": "હવે આગળ કૂદવા ગણો દબાવો.",
    "After and later mean add the days, without counting the first day again.": "‘પછી’ એટલે દિવસ ઉમેરવા, પહેલો દિવસ ફરી ગણ્યા વગર.",
    "You learned: days after are added to the date; a fortnight is 14 days.": "તમે શીખ્યા: પછીના દિવસ તારીખમાં ઉમેરો; પખવાડિયું 14 દિવસનું.",
    "A plant is watered on 12 April and again 25 days after; on which date is that?": "છોડને 12 એપ્રિલે અને ફરી 25 દિવસ પછી પાણી પાયું; તે કઈ તારીખે?",
    "Second watering?": "બીજી વાર પાણી?",
    "12 April is not counted again; the first day after is 13 April.": "12 એપ્રિલ ફરી ન ગણાય; પછીનો પહેલો દિવસ 13 એપ્રિલ છે.",
    "Yes, 25 days after 12 April is 7 May.": "હા, 12 એપ્રિલના 25 દિવસ પછી 7 મે છે.",
    "What date is 10 days after 6 October?": "6 ઑક્ટોબરના 10 દિવસ પછી કઈ તારીખ છે?",
    "Date 10 days on?": "10 દિવસ પછીની તારીખ?",
    "Jump from 6 October; the first jump lands on 7 October.": "6 ઑક્ટોબરથી કૂદો; પહેલો કૂદકો 7 ઑક્ટોબરે આવે છે.",
    "Yes, 10 days after 6 October is 16 October.": "હા, 6 ઑક્ટોબરના 10 દિવસ પછી 16 ઑક્ટોબર છે.",
    "A jar is filled on 27 October and opened a fortnight later; which date?": "એક બરણી 27 ઑક્ટોબરે ભરી અને એક પખવાડિયા પછી ખોલી; કઈ તારીખ?",
    "A fortnight after?": "એક પખવાડિયા પછી?",
    "A fortnight is longer than one week of jumps.": "પખવાડિયું એક અઠવાડિયાના કૂદકાથી લાંબું છે.",
    "Yes, a fortnight after 27 October is 10 November.": "હા, 27 ઑક્ટોબરના એક પખવાડિયા પછી 10 નવેમ્બર છે.",
    "Count the shaded cells again, and do not skip the first one.": "રંગેલાં ખાનાં ફરી ગણો, અને પહેલું ન છોડો.",
    "Say 1 on the start date and keep counting up to the end date.": "શરૂની તારીખે 1 બોલો અને છેલ્લી તારીખ સુધી ગણતા જાઓ.",
    "Friend 1": "મિત્ર 1",
    "Friend 2": "મિત્ર 2",
    "after 6th,": "6 પછી,",
    "after 8th,": "8 પછી,",
    "before 11th": "11 પહેલાં",
    "before 12th": "12 પહેલાં",
    "List the dates for each friend, then keep the dates in both lists.": "દરેક મિત્રની તારીખો લખો, પછી બંને યાદીમાંની તારીખો રાખો.",
    "The dates shaded twice are in both lists.": "બે વાર રંગેલી તારીખો બંને યાદીમાં છે.",
    "The second part starts on the 1st of the next month.": "બીજો ભાગ આવતા મહિનાની 1 તારીખથી શરૂ થાય છે.",
    "Last day of the first month minus the start date, plus 1, gives the first part.": "પહેલા મહિનાનો છેલ્લો દિવસ બાદ શરૂની તારીખ, વત્તા 1, પહેલો ભાગ આપે છે.",
    "The start date is day 1, not day 0.": "શરૂની તારીખ દિવસ 1 છે, દિવસ 0 નહીં.",
    "If the days run past the month's last day, go on from the 1st.": "જો દિવસ મહિનાના છેલ્લા દિવસથી આગળ જાય, તો 1 તારીખથી આગળ ગણો.",
    "Count back to the start of August, then on into the month before.": "ઑગસ્ટની શરૂઆત સુધી પાછળ ગણો, પછી તેની પહેલાંના મહિનામાં.",
    "Day 1 comes 39 days before 10 August.": "દિવસ 1, 10 ઑગસ્ટથી 39 દિવસ પહેલાં આવે છે.",
    "Count the jumps, not the cells, starting after the given date.": "ખાનાં નહીં, કૂદકા ગણો, આપેલી તારીખ પછીથી.",
    "Past the month's last day, the jumps carry on from the 1st.": "મહિનાના છેલ્લા દિવસ પછી, કૂદકા 1 તારીખથી ચાલે છે.",
    "A fortnight is two weeks.": "એક પખવાડિયું બે અઠવાડિયાંનું હોય છે.",
    "Start": "શરૂ",
    "End": "અંત",
    "Lasts": "અવધિ",
    "days": "દિવસ",
    "Date": "તારીખ",
    "Jump": "કૂદકો",
    "a fortnight": "એક પખવાડિયું",
    "Both": "બંને",
    "Day": "દિવસ",
    "Shade": "રંગો",
    "Cut": "કાપો",
    "Mark": "નિશાન",
    "Count": "ગણો",
    "Now tap the month the date falls in.": "હવે એ મહિનો દબાવો જેમાં તારીખ આવે છે.",
    "Tap Jump first, then tap a month.": "કૂદકો દબાવો, પછી મહિનો.",
    "Tap Mark first, then tap a month.": "નિશાન દબાવો, પછી મહિનો.",
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
    "Tap Shade first.": "પહેલાં રંગો દબાવો.",
    "Tap Cut first.": "પહેલાં કાપો દબાવો.",
    "Tap Mark first.": "પહેલાં નિશાન દબાવો.",
    "Tap Jump first.": "પહેલાં કૂદકો દબાવો.",
    "Type the day, then press Enter.": "પહેલાં દિવસનો આંક લખો.",
    "day": "દિવસ",
  },
};

/* ── the calendar: data and geometry, one function for the acts and the drawing ─────────────── */
const DC_LEN: any = { January: 31, February: 28, March: 31, April: 30, May: 31, June: 30, July: 31, August: 31,
  September: 30, October: 31, November: 30, December: 31 };
const DC_BLUE = "#0072B2", DC_GREEN = "#009E73", DC_GREEN_D = "#007E5C", DC_VIOLET = "#6A3D9A", DC_AMBER = "#E69F00";
/* the act each kind of question asks for, and the key's label */
const DC_ACT: any = { count: "shade", share: "shade", cross: "cut", finish: "mark", begin: "mark", after: "jump" };
const DC_KEY: any = { shade: "Shade", cut: "Cut", mark: "Mark", jump: "Jump", count: "Count" };
/* the nudge while the answer waits for the act (a key, Enter or the dim Answer key pressed for real) */
const DC_NUDGE: any = { shade: "Tap Shade first.", cut: "Tap Cut first.", mark: "Tap Mark first.", jump: "Tap Jump first." };
/* the answer gate arms on the child's first REAL press in this mount (a guide step done by a real tap or Enter, the act key, the
   board), user mode only; toolApi, HOOK.check and HOOK.demo never arm it, so AI mode and approve stay ungated (as C15) */
const DC_T = { touched: false };
const dcUser = () => { try { const b = document.querySelector('[data-zone="bar"]'); return !!b && b.getAttribute("data-mode") === "user"; } catch (e) { return false; } };
/* rows of the layout (Work coordinates; the picture never passes x 900, so the open keypad covers nothing) */
const DC_ROW = { y: 424, h: 88 };
function dcGeo(m: string[], side = false) {
  const two = m.length > 1, MW = two ? 428 : 620, xs = two ? [4, 468] : [side ? 4 : 140];
  const cw = MW / 7, ch = 66, top = 84, lenA = DC_LEN[m[0]];
  /* month B starts where month A stops in the week, and neither needs a sixth row */
  const firsts = [0, lenA % 7];
  const cell = (i: number) => {
    const mi = i < lenA ? 0 : 1, d = mi ? i - lenA + 1 : i + 1, k = firsts[mi] + d - 1;
    return { mi, d, x: xs[mi] + (k % 7) * cw, y: top + Math.floor(k / 7) * ch, w: cw, h: ch };
  };
  return { two, MW, xs, cw, ch, top, lenA, total: lenA + (two ? DC_LEN[m[1]] : 0), cell,
    head: (mi: number) => ({ x: xs[mi], y: 4, w: MW, h: 72 }),
    pen: (i: number) => { const c = cell(i); return { x: c.x + c.w - 7, y: c.y + c.h - 7 }; },
    mid: (i: number) => { const c = cell(i); return { x: c.x + c.w / 2, y: c.y + c.h / 2 }; } };
}
const dcIdx = (b: any, p: any) => (p[0] === 0 ? 0 : DC_LEN[b.m[0]]) + p[1] - 1;
/* the solution count: each cell with the number it gets, in counting order */
function dcSol(b: any) {
  const lenA = DC_LEN[b.m[0]], out: any[] = [];
  if (b.kind === "count" || b.kind === "cross") {
    const s = dcIdx(b, b.s), e = dcIdx(b, b.e);
    for (let i = s; i <= e; i++) out.push({ i, t: String(b.kind === "cross" && i >= lenA ? i - lenA + 1 : i - s + 1) });
  }
  if (b.kind === "finish") { const s = dcIdx(b, b.s); for (let k = 0; k < b.days; k++) out.push({ i: s + k, t: String(k + 1) }); }
  if (b.kind === "begin") { const e = dcIdx(b, b.e); for (let k = 0; k < b.days; k++) out.push({ i: e - k, t: String(b.days - k) }); }
  if (b.kind === "after") { const s = dcIdx(b, b.s); for (let k = 1; k <= b.days; k++) out.push({ i: s + k, t: String(k) }); }
  return out;
}
/* the cells the Shade act colours: the run, or both friends' lists one after the other */
function dcShade(b: any) {
  const out: number[] = [];
  if (b.kind === "share") { for (let d = b.ra[0]; d <= b.ra[1]; d++) out.push(d - 1); for (let d = b.rb[0]; d <= b.rb[1]; d++) out.push(d - 1); }
  else { for (let i = dcIdx(b, b.s); i <= dcIdx(b, b.e); i++) out.push(i); }
  return out;
}
const dcBoth = (b: any) => { const out: number[] = []; for (let d = b.ra[0]; d <= b.ra[1]; d++) if (d >= b.rb[0] && d <= b.rb[1]) out.push(d); return out; };
/* the cell the correction lights amber: the day a child most often drops */
function dcFocus(b: any) {
  if (b.kind === "count" || b.kind === "finish") return dcIdx(b, b.s);
  if (b.kind === "cross") return DC_LEN[b.m[0]] - 1;
  if (b.kind === "begin") return dcIdx(b, b.e);
  if (b.kind === "after") return dcIdx(b, b.s) + 1;
  return -1;
}
/* the two lines of each info card under the calendar (the givens only, never the answer) */
function dcInfo(b: any, tx: any) {
  const d = (p: any) => p[1] + " " + tx(b.m[p[0]]);
  if (b.kind === "count" || b.kind === "cross") return [[tx("Start"), d(b.s)], [tx("End"), d(b.e)]];
  if (b.kind === "share") return [];   /* the friends' cards stand in the column right of the month */
  if (b.kind === "finish") return [[tx("Start"), d(b.s)], [tx("Lasts"), b.days + " " + tx("days")]];
  if (b.kind === "begin") return [[tx("End"), d(b.e)], [tx("Lasts"), b.days + " " + tx("days")]];
  return [[tx("Date"), d(b.s)], [tx("Jump"), b.fort ? tx("a fortnight") : b.days + " " + tx("days")]];
}

/* One entry per phase = one mount. `warm` is the board the guide steps work on (never question 1's own). */
const PHASES = [
  {
    n: 1,
    concept: "Counting both days",
    conceptId: "M3.S5.T9.C40", objectiveIds: ["O15"],
    says: ["Count the first day and the last day. Then take one date from the other and add one."],
    warm: { kind: "count", m: ["March"], s: [0, 3], e: [0, 5] },
    steps: [
      { say: "Tap Shade to shade the days from 3 March to 5 March.", on: "shade", hint: "The Shade key is under the calendar." },
      { say: "Tap Count to count the shaded days, the first and the last too.", on: "count", hint: "Now press the Count key." },
    ],
    /* tries, as the plan writes it: First rung: count the cells of a short run with both end days. Second rung: check by taking one date from the other and adding one. Third rung: the same task on a longer run, before the question's own dates return. */
    ladder: ["Count the shaded cells again, and do not skip the first one.", "Say 1 on the start date and keep counting up to the end date."],
    closing: "Counting both days, the days are the end date minus the start date, then add 1.",
    learned: "You learned: counting both days is end date minus start date, plus 1.",
    traceback: "Each shaded day is counted from 1, the first day included, and end date minus start date plus 1 is written below.",
    items: [
      /* learn DC1: answer in the plan = 9 days. */
      { qid: "M3.S5.T9.C40:DC1", kind: "count", m: ["September"], s: [0, 8], e: [0, 16],
        say: "A book fair is open from 8 to 16 September; how many days, both days counted?", ask: "Days the fair is open?",
        answer: 9, near: 8, miss: "The first day of the fair, 8 September, is counted too.", win: "Yes, the fair is open for 9 days." },
      /* practice 1: answer in the plan = 6 days, because 7 - 2 + 1 = 6 */
      { qid: "M3.S5.T9.C40:1", kind: "count", m: ["October"], s: [0, 2], e: [0, 7],
        say: "From 2 October to 7 October, counting both days, how many days is that?", ask: "Days, both counted?",
        answer: 6, near: 5, miss: "Both 2 October and 7 October are counted as days.", win: "Yes, that is 6 days with both ends." },
      /* practice 5: answer in the plan = The 9th and the 10th, because those are the dates after the 8th and before the 11th.
         Two boxes (first and last date of the shared run): the answer is a list of two dates. */
      { qid: "M3.S5.T9.C40:5", kind: "share", m: ["May"], ra: [7, 10], rb: [9, 11],
        tags: [["Friend 1", "after 6th,", "before 11th"], ["Friend 2", "after 8th,", "before 12th"]],
        parts: [{ label: "first date" }, { label: "last date" }], answer: [9, 10], near: "8|10",
        say: "Two friends say when the visit was; on which dates could it be?",
        ask: "Dates in both lists?", miss: "After a date leaves that date out, and so does before.",
        ladder: ["List the dates for each friend, then keep the dates in both lists.", "The dates shaded twice are in both lists."],
        win: "Yes, the visit was on the 9th or the 10th." },
    ],
  },
  {
    n: 2,
    concept: "Across a month end",
    conceptId: "M3.S5.T9.C41", objectiveIds: ["O15"],
    says: ["Where does the first month end? Count that part, then the rest."],
    warm: { kind: "cross", m: ["April", "May"], s: [0, 30], e: [1, 2] },
    steps: [
      { say: "Tap Cut to cut the run at the end of April.", on: "cut", hint: "The Cut key is under the calendars." },
      { say: "Tap Count to count each part of the run.", on: "count", hint: "Now press Count." },
    ],
    /* tries, as the plan writes it: First rung: count only the part in the first month. Second rung: count the part in the second month as well and add. Third rung: the same task with a month of thirty days, before the question's own dates return. */
    ladder: ["The second part starts on the 1st of the next month.", "Last day of the first month minus the start date, plus 1, gives the first part."],
    closing: "Across a month end, count each month's part and add the two.",
    learned: "You learned: across a month end, count each month's part, then add.",
    traceback: "The run is cut at the last day of the first month, each part is counted from 1, and the two parts are added.",
    items: [
      /* learn DC2: answer in the plan = 13 days. */
      { qid: "M3.S5.T9.C41:DC2", kind: "cross", m: ["July", "August"], s: [0, 27], e: [1, 8],
        say: "A camp runs from 27 July to 8 August; how many days, both days counted?", ask: "Days of the camp?",
        answer: 13, near: 12, miss: "Count from 27 July to the last day of July first.", win: "Yes, 5 days in July and 8 in August make 13." },
      /* practice 2: answer in the plan = 5 days, because 3 days are in October and 2 days are in November */
      { qid: "M3.S5.T9.C41:2", kind: "cross", m: ["October", "November"], s: [0, 29], e: [1, 2],
        say: "From 29 October to 2 November, counting both days, how many days is that?", ask: "Days across the month end?",
        answer: 5, near: 4, miss: "Count the last day of the first month, then the first days of the next.", win: "Yes, 3 days and 2 days make 5." },
      /* practice 6: answer in the plan = 15 days, because 10 days are in August and 5 days are in September */
      { qid: "M3.S5.T9.C41:6", kind: "cross", m: ["August", "September"], s: [0, 22], e: [1, 5],
        say: "How many days are there from 22 August to 5 September, with both days counted?", ask: "Days, August to September?",
        answer: 15, near: 14, miss: "August has 31 days, so count up to the 31st first.", win: "Yes, 10 days and 5 days make 15." },
    ],
  },
  {
    n: 3,
    concept: "Finding the last day",
    conceptId: "M3.S5.T9.C42", objectiveIds: ["O16"],
    says: ["The first day is day one. On which date does the last day fall?"],
    warm: { kind: "finish", m: ["June", "July"], s: [0, 5], days: 3 },
    steps: [
      { say: "A 3-day fair begins on 5 June; tap Mark to make 5 June day 1.", on: "mark", hint: "The Mark key is under the calendars." },
      { say: "Tap Count to count on to day 3, the last day.", on: "count", hint: "Now press Count to go on." },
    ],
    /* tries, as the plan writes it: First rung: count out a short run from a start date and mark its last day. Second rung: count back from the last day to check. Third rung: the same task with a run that crosses a month end, before the question's own dates return. */
    ladder: ["The start date is day 1, not day 0.", "If the days run past the month's last day, go on from the 1st."],
    closing: "The last day is the start date plus one day fewer than the number of days.",
    learned: "You learned: the last day is the start plus one day fewer than the days.",
    traceback: "The days are counted from the start date as day 1 to the last day, which turns green.",
    items: [
      /* learn DC3: answer in the plan = 7 December. */
      { qid: "M3.S5.T9.C42:DC3", kind: "finish", m: ["November", "December"], s: [0, 22], days: 16, month: "December",
        say: "A 16-day course begins on 22 November; on which date does it end?", ask: "Last day of the course?",
        answer: "7 December", near: "8 December", miss: "22 November is day 1, so count on from there.", win: "Yes, day 16 falls on 7 December." },
      /* practice 3: answer in the plan = 15 October, because 5 days after 10 October is 15 October */
      { qid: "M3.S5.T9.C42:3", kind: "finish", m: ["October", "November"], s: [0, 10], days: 6, month: "October",
        say: "A fair of 6 days starts on 10 October; what is its last day?", ask: "Last day of the fair?",
        answer: "15 October", near: "16 October", miss: "Start on 10 October as day 1 and count to day 6.", win: "Yes, the fair ends on 15 October." },
      /* practice 7: answer in the plan = 2 July, because 39 days before 10 August is 2 July */
      { qid: "M3.S5.T9.C42:7", kind: "begin", m: ["July", "August"], e: [1, 10], days: 40, month: "July",
        say: "A 40-day course ended on 10 August; when did it begin, both days counted?", ask: "First day of the course?",
        answer: "2 July", near: "1 July", miss: "10 August is day 40, so count back to day 1.",
        ladder: ["Count back to the start of August, then on into the month before.", "Day 1 comes 39 days before 10 August."],
        win: "Yes, the course began on 2 July." },
    ],
  },
  {
    n: 4,
    concept: "Days after and a fortnight later",
    conceptId: "M3.S5.T9.C43", objectiveIds: ["O16"],
    says: ["After means add the days. Do you count the first day again?"],
    warm: { kind: "after", m: ["March", "April"], s: [0, 20], days: 3 },
    steps: [
      { say: "For 3 days after 20 March, tap Jump to jump to the next day.", on: "jump", hint: "The Jump key is under the calendars." },
      { say: "Tap Count to jump on, 3 jumps in all.", on: "count", hint: "Now press Count for the next jumps." },
    ],
    /* tries, as the plan writes it: First rung: jump a few days after a date. Second rung: jump a fortnight. Third rung: the same task across a month end, before the question's own date returns. */
    ladder: ["Count the jumps, not the cells, starting after the given date.", "If the days run past the month's last day, go on from the 1st."],
    closing: "After and later mean add the days, without counting the first day again.",
    learned: "You learned: days after are added to the date; a fortnight is 14 days.",
    traceback: "Jumps are counted from the day after the date, and the date the last jump lands on turns green.",
    items: [
      /* learn DC4: answer in the plan = 7 May. */
      { qid: "M3.S5.T9.C43:DC4", kind: "after", m: ["April", "May"], s: [0, 12], days: 25, month: "May",
        say: "A plant is watered on 12 April and again 25 days after; on which date is that?", ask: "Second watering?",
        answer: "7 May", near: "6 May", miss: "12 April is not counted again; the first day after is 13 April.", win: "Yes, 25 days after 12 April is 7 May." },
      /* practice 4: answer in the plan = 16 October */
      { qid: "M3.S5.T9.C43:4", kind: "after", m: ["October", "November"], s: [0, 6], days: 10, month: "October",
        say: "What date is 10 days after 6 October?", ask: "Date 10 days on?",
        answer: "16 October", near: "15 October", miss: "Jump from 6 October; the first jump lands on 7 October.", win: "Yes, 10 days after 6 October is 16 October." },
      /* practice 8: answer in the plan = 10 November, because 14 days after 27 October is 10 November */
      { qid: "M3.S5.T9.C43:8", kind: "after", m: ["October", "November"], s: [0, 27], days: 14, fort: true, month: "November",
        say: "A jar is filled on 27 October and opened a fortnight later; which date?", ask: "A fortnight after?",
        answer: "10 November", near: "3 November", miss: "A fortnight is longer than one week of jumps.",
        ladder: ["Past the month's last day, the jumps carry on from the 1st.", "A fortnight is two weeks."], win: "Yes, a fortnight after 27 October is 10 November." },
    ],
  },
];

/* The numbers the working area needs (they go into the sidecar too). */
const MODEL = { monthDays: DC_LEN, cell: { w2: 428 / 7, w1: 620 / 7, h: 66 }, rows: 5, row: DC_ROW };

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* a date answer is "<day> <Month>" (the day typed, the month tapped); either order is read */
const dcParseDate = (v: any) => {
  const s = String(Array.isArray(v) ? v.join(" ") : v ?? "").trim();
  const a = s.match(/^(\d{1,2})\s+([A-Za-z]+)$/), b = s.match(/^([A-Za-z]+)\s+(\d{1,2})$/);
  return a ? { d: Number(a[1]), m: a[2].toLowerCase() } : b ? { d: Number(b[2]), m: b[1].toLowerCase() } : null;
};
const judge = (item: any, v: any) => {
  if (item.parts) return judgeSlotParts(item, v);
  if (item.month) { const g = dcParseDate(v), w = dcParseDate(item.answer); return !!g && !!w && g.d === w.d && g.m === w.m; }
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim().toLowerCase() === String(item.answer).trim().toLowerCase();
};
/* oracle: every answer re-derived by day-of-the-year sums (no code shared with judge or the picture) */
const oracle = () => {
  const order = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const len = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const doy = (m: string, d: number) => { let t = 0; for (let k = 0; k < order.indexOf(m); k++) t += len[k]; return t + d; };
  const back = (n: number) => { let k = 0; while (n > len[k]) { n -= len[k]; k++; } return n + " " + order[k]; };
  return PHASES.every((p: any) => p.items.every((it: any) => {
    const ms = it.m, at = (q: any) => doy(ms[q[0]], q[1]);
    if (it.kind === "count" || it.kind === "cross") return it.answer === at(it.e) - at(it.s) + 1;
    if (it.kind === "share") {
      const fit: number[] = [];
      for (let d = 1; d <= 31; d++) if (d > it.ra[0] - 1 && d < it.ra[1] + 1 && d > it.rb[0] - 1 && d < it.rb[1] + 1) fit.push(d);
      return fit.length === 2 && fit[0] === it.answer[0] && fit[1] === it.answer[1];
    }
    if (it.kind === "finish") return back(at(it.s) + it.days - 1) === it.answer;
    if (it.kind === "begin") return back(at(it.e) - it.days + 1) === it.answer;
    if (it.kind === "after") return back(at(it.s) + it.days) === it.answer && (!it.fort || it.days === 14);
    return false;
  }));
};
/* the most likely wrong answer (the item's misconception); judge must reject it */
const nearMiss = (item: any) => (item.near !== undefined ? item.near : typeof item.answer === "number" ? item.answer + 1 : "~");
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => {
  if (item.parts) return item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)]);
  if (item.month) { const g = dcParseDate(item.answer) as any; return [String(item.answer), item.month + " " + g.d]; }
  return [String(item.answer), indian(item.answer), words(item.answer)];
};
/* the answer as the teacher agent gives it (toolApi.answer) and the sidecar lists it */
const agentKey = (item: any) => item.answer;

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(item.answer));
/* the agent's answer(): a date's month is tapped on the board (HOOK.setMonth), then undefined lets the runtime type the day */
const answer = (item: any, v: any) => {
  if (item.month && HOOK.setMonth) { const g = dcParseDate(v); if (g) HOOK.setMonth(g.m); }
  return undefined;
};
/* the agent's check() before Enter: the question's act is done at once (AI mode is never gated); undefined = press Enter */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area ──────────────────────────────────────────────────────────────────────── */
function Work({ phase, n, item, index, stage, wrong, typed, api, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const warmOn = !free && (stage === "demo" || stage === "teach") && phase && phase.warm;
  const B: any = free ? { kind: "free", m: ["October", "November"] } : warmOn ? phase.warm : item;
  const G = dcGeo(B && B.m ? B.m : ["October"], !!B && B.kind === "share");
  const qk = free ? "free" : warmOn ? "w" + n : n + "." + index;
  /* the board belongs to the ENTRY (PATTERNS §18): a question entered again starts fresh */
  const ent = useRef({ qk: "", k: 0 });
  if (ent.current.qk !== qk) ent.current = { qk, k: ent.current.k + 1 };
  const tag = qk + "#" + ent.current.k;
  const fresh = () => ({ tag, done: false, shadeN: 0, cut: false, marks: [] as any[], jumps: 0, counted: false, pick: -1,
    touched: false, tb: -1, fs: 11, fe: 22 });   /* free play opens on 12 to 23 October (12 days), numbers no question uses */
  const [raw, setRaw] = useState<any>(null);
  const S = raw && raw.tag === tag ? raw : fresh();
  const put = (o: any) => setRaw((p: any) => { const b = p && p.tag === tag ? p : fresh(); return { ...b, ...(typeof o === "function" ? o(b) : o) }; });
  const playing = useRef(false), lastKey = useRef(0), pickRef = useRef(-1), nudged = useRef(false);
  /* the answer pill measures its own text (getBBox) and is sized from it on the next frame */
  const pillRef = useRef<any>(null), pillKey = useRef(""), [pillM, setPillM] = useState<any>({ k: "", w: 0 }), [, setFontTick] = useState(0);
  /* a direct mount can draw before the bundled Poppins has loaded: when the fonts arrive, draw again so the pill measures the real face */
  useEffect(() => {
    const f: any = (document as any).fonts;
    if (!f) return;
    let live = true;
    const bump = () => { if (live) setFontTick((x: number) => x + 1); };
    try { f.ready.then(bump); if (f.addEventListener) f.addEventListener("loadingdone", bump); } catch (e) { /* no font API */ }
    return () => { live = false; try { if (f.removeEventListener) f.removeEventListener("loadingdone", bump); } catch (e) { /* none */ } };
  }, []);
  useEffect(() => {
    const el = pillRef.current, k = pillKey.current;
    if (!el || !k) return;
    try { const w = el.getBBox().width; if (w > 0 && (pillM.k !== k || Math.abs(pillM.w - w) > 1)) setPillM({ k, w }); } catch (e) { /* not drawn */ }
  });
  /* a real press is held for 800 ms after the LAST guide step's act and whenever a question opens (its entry changes: the next question,
     next(), gotoStep(), restart), so the second tap of a double tap never lands on the new board's key (reduced motion opens Q1 at once) */
  const holdUntil = useRef(0);
  useEffect(() => { pickRef.current = -1; nudged.current = false; if (!warmOn) holdUntil.current = Date.now() + 800; return () => { tl.stop(); playing.current = false; }; }, [tag]);

  const dateQ = !free && stage === "ask" && !!(item && item.month);
  const won = !free && (stage === "win" || stage === "idle");
  const sol = !free && B && B.kind !== "free" ? dcSol(B) : [];
  const solOn = won || S.tb >= 0;
  const solN = won ? sol.length : Math.max(0, Math.min(sol.length, S.tb));
  const solText = won || S.tb > sol.length;

  /* ── the acts, each performed on screen (api.act), the state changing only when it resolves true ── */
  const penWrite = (toks: any[]) => {
    const base = S.marks.length, starts: number[] = [];
    let acc = 0;
    toks.forEach((k) => { starts.push(acc); acc += k.t.length; });
    put((p: any) => ({ marks: [...p.marks, ...toks.map((k) => ({ ...k, c: 0 }))] }));
    return {
      base, o: { tool: "pencil", moves: "write", text: toks.map((k) => k.t), at: toks.map((k) => G.pen(k.i)), size: T.micro, align: "end",
        onPoint: (j: number) => put((p: any) => ({ marks: p.marks.map((m: any, q: number) => (q < base ? m
          : { ...m, c: Math.max(m.c, Math.min(m.t.length, j + 1 - starts[q - base])) })) })) },
    };
  };
  const markToks = () => (B.kind === "begin" ? [{ i: dcIdx(B, B.e), t: String(B.days) }]
    : B.kind === "after" ? [{ i: dcIdx(B, B.s) + 1, t: "1" }] : [{ i: dcIdx(B, B.s), t: "1" }]);
  const countToks = () => (B.kind === "finish" || B.kind === "after" ? dcSol(B).slice(1) : dcSol(B));
  const act = (on: string) => {
    if (playing.current || !B || free) return;
    const warm = stage === "demo";
    if (!warm && (stage !== "ask" || S.done)) return;
    let o: any = null, base = -1, after: any = {};
    if (on === "shade") {
      const cells = dcShade(B);
      o = { tool: "pencil", moves: "draw", marks: true, ms: 900, at: cells.map((i) => G.mid(i)), onPoint: (k: number) => put({ shadeN: k + 1 }) };
      after = { shadeN: cells.length };
    } else if (on === "cut") {
      const c = G.cell(G.lenA - 1);
      o = { tool: "scissors", moves: "snip", ms: 800, at: [{ x: (G.xs[0] + G.MW + G.xs[1]) / 2, y: c.y + c.h / 2 }], onPoint: () => put({ cut: true }) };
      after = { cut: true };
    } else if (on === "mark" || on === "jump" || on === "count") {
      const w = penWrite(on === "count" ? countToks() : markToks());
      o = w.o; base = w.base;
      after = on === "jump" ? { jumps: 1 } : on === "count" ? { counted: true, jumps: B.kind === "after" ? B.days : 0 } : {};
    }
    if (!o) return;
    playing.current = true;
    api.act(o).then((ok: boolean) => {
      playing.current = false;
      if (!ok) { if (base >= 0) put((p: any) => ({ marks: p.marks.slice(0, base) })); return; }
      put((p: any) => ({ ...after, marks: p.marks.map((m: any) => ({ ...m, c: m.t.length })), done: warm ? p.done : true }));
      if (warm) { if (phase.steps && step >= phase.steps.length - 1) holdUntil.current = Date.now() + 800; api.did(on); }
      else if (nudged.current) { nudged.current = false; api.say(item.say); }
    });
  };
  const pressKey = (on: string) => {
    const t = Date.now();
    if (t - lastKey.current < 400 || t < holdUntil.current) return;
    lastKey.current = t;
    const ev: any = (window as any).event;
    if (ev && ev.isTrusted) DC_T.touched = true;
    act(on);
  };
  /* the agent's check(): the act at once, no animation (AI mode and toolApi runs are never gated) */
  const instant = () => {
    const on = DC_ACT[B.kind];
    if (on === "shade") put({ shadeN: dcShade(B).length, done: true });
    else if (on === "cut") put({ cut: true, done: true });
    else put((p: any) => ({ marks: [...p.marks, ...markToks().map((k) => ({ ...k, c: k.t.length }))], jumps: on === "jump" ? 1 : 0, done: true }));
  };
  HOOK.check = !free && stage === "ask" && B && !S.done ? () => { instant(); return undefined; } : null;
  HOOK.setMonth = dateQ ? (name: string) => {
    const mi = B.m.findIndex((x: string) => x.toLowerCase() === String(name).toLowerCase());
    if (mi >= 0) { pickRef.current = mi; put({ pick: mi }); }
  } : null;
  const pickMonth = (mi: number) => {
    if (!dateQ || !S.done || (S.tb >= 0 && !S.tbEnd) || Date.now() < holdUntil.current) return;   /* not while the correction plays (the keys come back with the cards) */
    pickRef.current = mi; put({ pick: mi }); api.sfx.tick();
    if (nudged.current) { nudged.current = false; api.say(item.say); }
  };
  /* a nudge says what to do, then the question comes back by itself after 2.6 s (or at once on the child's next press) */
  const nudgeT = useRef<any>(null), sayQ = useRef<any>(null);
  sayQ.current = stage === "ask" && item ? item.say : null;
  const sayNudge = (line: string) => {
    nudged.current = true; api.say(line);
    clearTimeout(nudgeT.current);
    nudgeT.current = setTimeout(() => { if (nudged.current && sayQ.current) { nudged.current = false; api.say(sayQ.current); } }, 2600);
  };
  useEffect(() => () => clearTimeout(nudgeT.current), [tag]);
  /* Enter on a date question: the typed day and the tapped month go together as "7 December" */
  const commitDate = (v: any) => {
    const day = String(v ?? "").replace(/[^0-9]/g, "");
    if (!day) { if (pickRef.current >= 0) sayNudge("Type the day, then press Enter."); return; }
    if (pickRef.current < 0) {
      sayNudge(S.done ? "Now tap the month the date falls in." : B.kind === "after" ? "Tap Jump first, then tap a month." : "Tap Mark first, then tap a month.");
      return;
    }
    clearTimeout(nudgeT.current); nudged.current = false;
    api.submit(day + " " + B.m[pickRef.current]);
  };
  api.onEnter(stage === "demo" && stepOn ? () => {
    const ev: any = (window as any).event;
    if (ev && ev.isTrusted) DC_T.touched = true;   /* a real Enter or a real tap on the Enter key; toolApi.check() has no event */
    act(stepOn);
  } : dateQ ? (v: any) => commitDate(v) : null);

  /* the answer is gated by the act (PATTERNS §19): locked only while the act waits, after a real touch on the board */
  const needAct = !free && stage === "ask" && !!B && !S.done;
  const armed = (DC_T.touched || S.touched) && dcUser();
  /* the question key is a dep too: an ask -> ask jump (next(), prev(), gotoStep) keeps needAct and armed, and the runtime unlocks the new question */
  useEffect(() => { if (stage === "ask" && !free && S.tb < 0) api.lock(needAct && armed); }, [needAct, armed, tag]);
  /* real presses the runtime swallows while locked: Enter, a digit, the dim Answer or Enter key -> the act's nudge; the Hint key brings
     the question back over a nudge (the nudge returns on the next press) */
  const liveR = useRef<any>({});
  liveR.current = { stage, gated: needAct && armed, say: item && item.say, act: B ? DC_ACT[B.kind] : null };
  useEffect(() => {
    const L = () => liveR.current;
    const nudge = () => { if (L().gated && DC_NUDGE[L().act] && Date.now() >= holdUntil.current) sayNudge(DC_NUDGE[L().act]); };
    /* a nudge that is no longer true (a digit typed after "Type the day") gives the question back at once */
    const back = () => { if (nudged.current && sayQ.current && !L().gated) { nudged.current = false; clearTimeout(nudgeT.current); api.say(sayQ.current); } };
    const onKey = (e: any) => {
      if (!e.isTrusted) return;
      if (L().stage === "demo" && (e.key === "Enter" || e.key === " ")) DC_T.touched = true;
      if (L().gated && (e.key === "Enter" || /^[0-9]$/.test(e.key))) setTimeout(nudge, 60);
      else if (/^[0-9]$/.test(e.key)) setTimeout(back, 60);
    };
    const onClick = (e: any) => {
      if (!e.isTrusted) return;
      const c = e.target && e.target.closest ? e.target.closest("[data-control]") : null, id = c ? c.getAttribute("data-control") : "";
      /* a restart or a phase dot starts clean; in a guide step only the tool's own controls arm the gate (never Hint, sound, Answer or the pad) */
      if (id === "restart" || id === "phase-dot") { DC_T.touched = false; return; }
      if (L().stage === "demo" && id && id !== "again" && id !== "sound" && id !== "answer-open" && !/^key-/.test(id)) DC_T.touched = true;
      if (id === "again" && L().stage === "ask" && (L().gated || nudged.current) && L().say) { nudged.current = false; setTimeout(() => api.say(L().say), 60); return; }
      if (L().gated && (id === "answer-open" || /^key-/.test(id))) setTimeout(nudge, 60);
      else if (/^key-[0-9]$/.test(id)) setTimeout(back, 60);
    };
    window.addEventListener("keydown", onKey, true);
    window.addEventListener("click", onClick, true);
    return () => { window.removeEventListener("keydown", onKey, true); window.removeEventListener("click", onClick, true); };
  }, []);

  /* the traceback: the count is written cell by cell, then the sum below; it ends on the whole right answer */
  useEffect(() => {
    if (!wrong || stage !== "ask" || free || !B) return;
    api.lock(true); pickRef.current = -1; nudged.current = false;
    const L = dcSol(B).length;
    put({ pick: -1, tb: 0 });
    const gap = Math.max(40, Math.min(110, Math.round(2600 / Math.max(1, L))));
    const steps: any[] = Array.from({ length: L }, (_, k) => [gap, () => put({ tb: k + 1 })]);
    steps.push([700, () => put({ tb: L + 1 })]);
    tl.run(steps, () => { put({ tbEnd: true }); api.lock(false); });
  }, [wrong]);

  /* the win line (the phase's closing takes the last one's place) */
  useEffect(() => { if (stage === "win" && item && item.win) api.say(item.win); }, [stage]);

  /* free play: two dates to move */
  const nudgeFree = (k: string) => {
    api.sfx.tick();
    put((p: any) => k === "sb" ? { fs: Math.max(0, p.fs - 1) } : k === "sn" ? { fs: Math.min(p.fe, p.fs + 1) }
      : k === "eb" ? { fe: Math.max(p.fs, p.fe - 1) } : { fe: Math.min(G.total - 1, p.fe + 1) });
  };

  api.share({ phase: n, kind: B ? B.kind : null, shaded: S.shadeN, cut: S.cut, jump: S.jumps,
    month: S.pick >= 0 && B && B.m ? B.m[S.pick] : null, complete: stage === "idle" });

  if (!B) return null;
  const inkOn = (bg: string) => (bg === DC_BLUE || bg === DC_GREEN_D ? "#FFFFFF" : C.ink);
  const sIdx = B.s ? dcIdx(B, B.s) : -1, eIdx = B.e ? dcIdx(B, B.e) : -1;
  /* what the Shade act has coloured so far: the run, or (two lists) friend A's cells then friend B's */
  const shList = B.kind === "count" || B.kind === "share" ? dcShade(B) : [], shN = solOn ? shList.length : S.shadeN;
  const nA = B.kind === "share" ? B.ra[1] - B.ra[0] + 1 : shList.length;
  const shadeSet = new Set(shList.slice(0, Math.min(shN, nA))), bandSet = new Set(shList.slice(nA, Math.max(nA, shN)));
  const both = B.kind === "share" ? dcBoth(B).map((d) => d - 1) : [];
  const solMap: any = {};
  sol.slice(0, solN).forEach((x: any) => { solMap[x.i] = x.t; });
  const hitCell = (B.kind === "finish" || B.kind === "after" || B.kind === "begin") && ((solOn && solN >= sol.length) || S.counted) ? sol[sol.length - 1].i : -1;
  const focus = S.tb >= 0 && !won ? dcFocus(B) : -1;
  const cutOn = B.kind === "cross" && (S.cut || solOn);
  const fillOf = (i: number) => {
    if (free) return i === S.fs || i === S.fe ? DC_BLUE : i > S.fs && i < S.fe ? tint(DC_BLUE, 0.72) : C.paper;
    if (i === hitCell) return DC_GREEN_D;
    if (i === sIdx || i === eIdx) return DC_BLUE;
    if (B.kind === "share") return solOn && both.includes(i) ? tint(DC_GREEN, 0.55) : shadeSet.has(i) ? tint(DC_BLUE, 0.72) : C.paper;
    const run = (B.kind === "count" && shadeSet.has(i)) || (B.kind === "cross" && i > sIdx && i < eIdx);
    if (run) return won ? tint(DC_GREEN, 0.62) : tint(DC_BLUE, 0.72);
    return C.paper;
  };
  const kOn = !free && !solOn && (stage === "demo" ? stepOn : stage === "ask" && !S.done ? DC_ACT[B.kind] : null);
  const KW = 180, midX = G.xs[0] + (G.two ? 892 : G.MW) / 2, KX = midX - KW / 2;   /* the key and the sum sit under the calendar's middle */
  const info = !free && B.kind !== "free" ? dcInfo(B, tx) : [];
  /* title and value: the title sits 8+ clear of the top outline (Devanagari / Gujarati matras rise over it), the value close under it */
  const dev = lang === "hi" || lang === "gu";
  /* hi / gu: 95 tall (to the working area's foot) and the extra split: 3 more above the title, 5 more between title and value
     (matras and the u-hooks of the value), the rest below; a Gujarati value is 2 smaller (its u-signs hang lowest) */
  /* hi: both lines 28 (their full ink, i-curls above and u-hooks below, needs it), the value lifted 3 */
  const CD = lang === "hi" ? { h: 95, band: 42, ty: 28, vy: 68, fs: T.micro } : dev ? { h: 95, band: 42, ty: 30, vy: 70, fs: T.label } : { h: DC_ROW.h, band: 38, ty: 25, vy: 63, fs: T.label };
  const card = (x: number, w: number, lines: any[], k: string, small = false) => (
    <g key={k}>
      <rect x={x} y={DC_ROW.y} width={w} height={CD.h} rx={16} fill="url(#dc-card-grad)" stroke={C.rule} strokeWidth={2.4} filter="url(#dc-card-shadow)" />
      <rect x={x + 4} y={DC_ROW.y + 6} width={w - 8} height={CD.band} rx={10} fill={tint(C.panel, 0.4)} />
      <text x={x + w / 2} y={DC_ROW.y + CD.ty} textAnchor="middle" dominantBaseline="central" fontSize={CD.fs} fontWeight={700} fill={shade(DC_BLUE, 0.25)} letterSpacing={0.5}>{lines[0].toUpperCase()}</text>
      <text x={x + w / 2} y={DC_ROW.y + CD.vy} textAnchor="middle" dominantBaseline="central" fontSize={small || lang === "hi" ? T.micro : lang === "gu" ? T.label - 2 : w < 300 ? T.label : T.prompt} fontWeight={700} fill={C.ink}>{lines[1]}</text>
    </g>
  );
  const solLine = () => {
    const lenA = G.lenA, dOf = (i: number) => { const c = G.cell(i); return c.d + " " + tx(B.m[c.mi]); };
    /* one run of symbols, no spaces: a sum, not a sentence (labels-short) */
    if (B.kind === "count") return B.e[1] + "−" + B.s[1] + "+1=" + (B.e[1] - B.s[1] + 1);
    if (B.kind === "share") return tx("Both") + ": " + dcBoth(B).join(", ");
    if (B.kind === "cross") { const a = lenA - B.s[1] + 1; return a + "+" + B.e[1] + "=" + (a + B.e[1]); }
    if (B.kind === "begin") return tx("Day") + " 1: " + dOf(sol[sol.length - 1].i);
    if (B.kind === "after") return "+" + B.days + " " + tx("days") + ": " + dOf(sol[sol.length - 1].i);
    return tx("Day") + " " + B.days + ": " + dOf(sol[sol.length - 1].i);
  };
  /* the answer pill: the text's width (Poppins bold, about 0.62 em a character) + 28 a side; a long one drops to 32 */
  const pill = (() => {
    if (!solOn || free) return { w: 0, fs: T.prompt, k: "" };
    const t = solLine(), n = t.length, room = G.two ? 880 : G.MW - 8;
    const fs = n * T.prompt * 0.62 + 56 <= room ? T.prompt : T.label, k = t + "|" + fs;
    /* the drawn text's own width once measured (getBBox), the estimate only for the first frame */
    const tw = pillM.k === k && pillM.w > 0 ? pillM.w : n * fs * 0.62;
    return { fs, k, w: Math.min(room, Math.round(tw + 56)) };
  })();
  pillKey.current = pill.k;
  const arcs = Array.from({ length: S.jumps }, (_, k) => {
    const a = G.mid(sIdx + k), b = G.mid(sIdx + k + 1), ay = a.y - G.ch / 2 + 8, by = b.y - G.ch / 2 + 8;
    return (
      <g key={"j" + k}>
        <path d={`M ${a.x} ${ay} Q ${(a.x + b.x) / 2} ${Math.min(ay, by) - 28} ${b.x} ${by}`} fill="none" stroke={DC_VIOLET} strokeWidth={5} strokeLinecap="round" />
        <circle cx={b.x} cy={by} r={4} fill={DC_VIOLET} />
      </g>
    );
  });

  return (
    <g onPointerDownCapture={(e: any) => { if (e && e.isTrusted) DC_T.touched = true; if (stage === "ask" && !S.touched) put({ touched: true }); }}>
      <defs>
        <filter id="dc-card-shadow" x="-4%" y="-4%" width="108%" height="108%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.08" />
        </filter>
        <linearGradient id="dc-card-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFDF7" />
          <stop offset="100%" stopColor="#F5ECE0" />
        </linearGradient>
        <linearGradient id="dc-head-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={tint(DC_BLUE, 0.88)} />
          <stop offset="100%" stopColor={tint(DC_BLUE, 0.76)} />
        </linearGradient>
        <linearGradient id="dc-cell-highlight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.25} />
          <stop offset="100%" stopColor="#000000" stopOpacity={0.05} />
        </linearGradient>
      </defs>

      {/* the month cards: the calendar's titles, and on a date question the cards the month is tapped on */}
      {B.m.map((name: string, mi: number) => {
        const h = G.head(mi);
        /* the month cards are live only once the act is done (before it they look like the plain titles, as in the guide steps),
           and come back once the correction has finished writing, so the child can answer again */
        if (dateQ && S.done && (!solOn || S.tbEnd)) return (
          <g key={"m" + mi}>
            <Key id={"month-" + (mi + 1)} label={tx(name)} x={h.x} y={h.y} w={h.w} h={h.h} C={C} tone="key" onClick={() => pickMonth(mi)}>
              <text y={lang === "hi" ? 9 : 11} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={toneInk("key", C.ink)}>{tx(name)}</text>
            </Key>
            {S.pick === mi && <rect x={h.x - 1} y={h.y - 1} width={h.w + 2} height={h.h + 2} rx={RAD.key + 1} fill="none" stroke={DC_AMBER} strokeWidth={6} pointerEvents="none" />}
            {S.pick < 0 && !(S.tb >= 0 && !S.tbEnd) && <BlinkRing x={h.x} y={h.y} w={h.w} h={h.h} C={C} />}
          </g>
        );
        return (
          <g key={"m" + mi} filter="url(#dc-card-shadow)">
            <rect x={h.x} y={h.y} width={h.w} height={h.h} rx={16} fill="url(#dc-head-grad)" stroke={C.ink} strokeWidth={2.4} />
            <rect x={h.x + 3} y={h.y + 3} width={h.w - 6} height={h.h / 2 - 3} rx={13} fill="#FFFFFF" fillOpacity={0.25} pointerEvents="none" />
            <text x={h.x + h.w / 2} y={h.y + h.h / 2 - (lang === "hi" ? 2 : 0)} textAnchor="middle" dominantBaseline="central" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{tx(name)}</text>
          </g>
        );
      })}

      {/* the days: every cell outlined dark; the run, the given dates and the answer filled */}
      {Array.from({ length: G.total }, (_, i) => {
        const c = G.cell(i), bg = fillOf(i);
        const isDarkBg = bg === DC_BLUE || bg === DC_GREEN_D;
        return (
          <g key={"c" + i}>
            {/* Base dark-outlined unit cell */}
            <rect x={c.x + 2} y={c.y + 2} width={c.w - 4} height={c.h - 4} rx={10} fill={bg} stroke={C.ink} strokeWidth={2.4} />
            {/* Top rounded sheen light */}
            <rect x={c.x + 4} y={c.y + 4} width={c.w - 8} height={(c.h - 8) * 0.4} rx={7} fill="url(#dc-cell-highlight)" pointerEvents="none" />
            
            {B.kind === "share" && shadeSet.has(i) && bg !== tint(DC_BLUE, 0.72) &&
              <rect x={c.x + 5} y={c.y + c.h - 28} width={c.w - 10} height={8} rx={3} fill={DC_BLUE} />}
            {bandSet.has(i) &&
              <rect x={c.x + 5} y={c.y + c.h - 18} width={c.w - 10} height={14} rx={4} fill={DC_VIOLET} />}
            <text x={c.x + 8} y={c.y + 31} fontSize={T.label} fontWeight={700} fill={inkOn(bg)}>{c.d}</text>
          </g>
        );
      })}

      {/* the cut at the month end, and the last day of the first month marked in ink */}
      {cutOn && (() => {
        const c = G.cell(G.lenA - 1), gx = (G.xs[0] + G.MW + G.xs[1]) / 2;
        return (
          <g pointerEvents="none">
            <rect x={c.x + 1} y={c.y + 1} width={c.w - 2} height={c.h - 2} rx={11} fill="none" stroke={C.ink} strokeWidth={5} />
            <line x1={gx} y1={G.top} x2={gx} y2={G.top + 5 * G.ch} stroke={C.ink} strokeWidth={4} strokeDasharray="12 10" />
          </g>
        );
      })()}

      {/* the violet jumps */}
      <g pointerEvents="none">{arcs}</g>

      {/* what the pencil wrote (hidden while the correction writes its own count) */}
      {!solOn && S.marks.map((m: any, k: number) => { const p = G.pen(m.i); return <PencilText key={"w" + k} text={m.t} x={p.x} y={p.y} size={T.micro} align="end" chars={m.c} />; })}

      {/* free play: the two dates move, and the count of days (both counted) shows */}
      {free && (() => {
        const lab = (i: number) => { const c = G.cell(i); return c.d + " " + tx(B.m[c.mi]); };
        /* key 72, 16, card 204, 16, key 72 a side; the count chip 100 wide in the middle, 16 clear of both keys */
        const side = (x: number, top: string, i: number, kb: string, kn: string) => (
          <g key={kb}>
            <Key id={kb === "sb" ? "start-back" : "end-back"} label={top + " −"} x={x} y={DC_ROW.y + 8} w={72} h={72} C={C} tone="key" onClick={() => nudgeFree(kb)}>
              <text y={16} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={toneInk("key", C.ink)}>−</text>
            </Key>
            {card(x + 88, 204, [top, lab(i)], "fc" + kb, true)}
            <Key id={kn === "sn" ? "start-next" : "end-next"} label={top + " +"} x={x + 308} y={DC_ROW.y + 8} w={72} h={72} C={C} tone="key" onClick={() => nudgeFree(kn)}>
              <text y={16} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={toneInk("key", C.ink)}>+</text>
            </Key>
          </g>
        );
        return (
          <g>
            {side(4, tx("Start"), S.fs, "sb", "sn")}
            <g filter="url(#dc-card-shadow)">
              <rect x={400} y={DC_ROW.y} width={100} height={DC_ROW.h} rx={16} fill="url(#dc-card-grad)" stroke={C.ink} strokeWidth={2.4} />
              <text x={450} y={DC_ROW.y + 40} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={shade(DC_GREEN_D, 0.2)}>{S.fe - S.fs + 1}</text>
              <text x={450} y={DC_ROW.y + 72} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={shade(DC_GREEN_D, 0.2)}>{S.fe === S.fs ? tx("day") : tx("days")}</text>
            </g>
            {side(516, tx("End"), S.fe, "eb", "en")}
          </g>
        );
      })()}

      {/* the givens under the calendar, and the one key whose label follows the act */}
      {!free && !solOn && info.length === 2 && card(4, 320, info[0], "ia")}
      {!free && !solOn && info.length === 2 && card(576, 320, info[1], "ib")}

      {/* the two friends' dates, in a column right of the month; they stay through the correction, so the child answers again with them */}
      {!free && B.kind === "share" && B.tags.map((t: any, k: number) => {
        const x = G.xs[0] + G.MW + 20, y = G.top + k * 178, w = 896 - x, col = k ? DC_VIOLET : DC_BLUE;
        return (
          <g key={"f" + k} filter="url(#dc-card-shadow)">
            <rect x={x} y={y} width={w} height={168} rx={16} fill="url(#dc-card-grad)" stroke={col} strokeWidth={3} />
            {k ? <rect x={x + 16} y={y + 26} width={36} height={14} rx={4} fill={DC_VIOLET} /> : <rect x={x + 16} y={y + 20} width={36} height={24} rx={6} fill={tint(DC_BLUE, 0.72)} stroke={C.ink} strokeWidth={2} />}
            <text x={x + 64} y={y + 44} fontSize={T.label} fontWeight={700} fill={shade(col, 0.25)}>{tx(t[0])}</text>
            <text x={x + w / 2} y={y + 96} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(t[1])}</text>
            <text x={x + w / 2} y={y + 146} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx(t[2])}</text>
          </g>
        );
      })}

      {kOn && (
        <g filter="url(#dc-card-shadow)">
          <Key id={kOn} label={tx(DC_KEY[kOn])} x={KX} y={DC_ROW.y} w={KW} h={DC_ROW.h} C={C} tone="key" onClick={() => pressKey(kOn)}>
            <text y={11} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={toneInk("key", C.ink)}>{tx(DC_KEY[kOn])}</text>
          </Key>
          <Invite x={KX + KW / 2} y={DC_ROW.y + DC_ROW.h / 2} w={KW} h={DC_ROW.h} C={C} />
        </g>
      )}

      {/* the correction (after a miss) and the win: the count written cell by cell, then the whole answer below */}
      {solOn && (
        <g pointerEvents="none">
          {focus >= 0 && (() => { const c = G.cell(focus); return <rect x={c.x + 1} y={c.y + 1} width={c.w - 2} height={c.h - 2} rx={9} fill="none" stroke={DC_AMBER} strokeWidth={6} />; })()}
          {Object.keys(solMap).map((k) => {
            const i = Number(k), p = G.pen(i), bg = fillOf(i);
            return <text key={"s" + k} x={p.x} y={p.y} textAnchor="end" fontSize={T.micro} fontWeight={700} fill={bg === DC_BLUE || bg === DC_GREEN_D ? "#FFFFFF" : DC_VIOLET}>{solMap[k]}</text>;
          })}
          {solText && (
            <g filter="url(#dc-card-shadow)">
              {/* hi: 76 tall and the type 6% smaller (its u-hooks hang lowest); gu 70; en 60 with the text 3 higher for a y's tail */}
              <rect x={midX - pill.w / 2} y={DC_ROW.y + (lang === "hi" ? 8 : dev ? 10 : 14)} width={pill.w} height={lang === "hi" ? 78 : dev ? 70 : 60} rx={16} fill="url(#dc-card-grad)" stroke={DC_GREEN_D} strokeWidth={2.4} />
              <text ref={pillRef} x={midX} y={DC_ROW.y + (lang === "hi" ? 48 : dev ? 51 : 41)} textAnchor="middle" dominantBaseline="central" fontSize={lang === "hi" ? Math.round(pill.fs * 0.94) : pill.fs} fontWeight={700} fill={shade(DC_GREEN_D, 0.25)}>{solLine()}</text>
            </g>
          )}
        </g>
      )}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
function Thumb({ result, it, n, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last || last.value === null || last.value === undefined) return null;
  const item = it || (PHASES[(n || 1) - 1] && PHASES[(n || 1) - 1].items[last.item]) || {};
  /* a word with no translation yet is left out in hi / gu (the digits and the little calendar carry it) */
  const word = (en: string) => { const v = tx(en); return lang !== "en" && /[A-Za-z]/.test(v) ? "" : " " + v; };
  /* the answer beside a little calendar that shows what kind it was: a run of days (counts), two days (both lists), a landing day (dates) */
  let txt = "", kind = "run";
  if (item.parts) { const p = slotPartsOf(last.value, 2); txt = word("Both").trim() + (word("Both").trim() ? ": " : "") + p[0] + ", " + p[1]; kind = "two"; }
  else if (item.month) { const g = dcParseDate(last.value); txt = g ? g.d + (lang === "en" ? " " + item.month.slice(0, 3) : word(item.month)) : String(last.value).replace(/[^0-9]/g, ""); kind = "day"; }
  else txt = leadNumber(last.value) + word("days");
  const s = Math.min(40, h - 16), ix = 10, iy = (h - s) / 2, tx0 = ix + s + 10, room = w - tx0 - 12;
  /* one line when it fits (about 0.6 em a character at 28), else two: the first word, then the rest */
  /* every answer fits one line now ("Both: 9, 10", "10 Nov", "9 days"), so the line sits centred with room above and below */
  const sp = txt.indexOf(" "), two = false && sp > 0 && room > 0;
  const lines = two ? [txt.slice(0, sp), txt.slice(sp + 1)] : [txt];
  const cs = (s - 8) / 3, cell = (k: number) => {
    const on = kind === "run" ? true : kind === "two" ? k === 4 || k === 5 : k === 4;
    return <rect key={k} x={ix + 4 + (k % 3) * cs} y={iy + s * 0.3 + 2 + Math.floor(k / 3) * (cs * 0.66)} width={cs - 2} height={cs * 0.66 - 2} rx={2}
      fill={on && kind !== "run" ? DC_GREEN_D : on ? tint(DC_BLUE, 0.55) : "#FFFFFF"} stroke={C.ink} strokeWidth={1} />;
  };
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <rect x={ix} y={iy} width={s} height={s} rx={6} fill="#FFFFFF" stroke={C.ink} strokeWidth={2} />
      <rect x={ix} y={iy} width={s} height={s * 0.3} rx={4} fill={DC_BLUE} />
      {[0, 1, 2, 3, 4, 5].map(cell)}
      {lines.map((l, k) => (
        <text key={k} x={tx0} y={h / 2 + 10 + (lines.length === 2 ? (k ? 16 : -16) : 0)} fontSize={T.micro} fontWeight={700} fill={C.ink}>{l}</text>
      ))}
    </g>
  );
}

function DateCounter(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      board: true,
      keyOnly: true,
      /* the picture is laid out in x 0 to 900, so the wide keypad covers none of it */
      bigPad: true,
      nextKey: true,
      navDots: true,
      StartArt, START_HOOK,
      }} />
  );
}

export default DateCounter;