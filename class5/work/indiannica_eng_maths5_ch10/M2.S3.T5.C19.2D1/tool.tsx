/* ═══ M2.S3.T5.C19.2D1 · day_bar_clocks · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build, so everything outside the
   working area already exists: header + its three controls, canvas, slot + pad, bubble + mascot,
   phase dots (user / AI mode), window.toolApi, the sound effects, the printed bubble, scoring, the
   events, idle and restart. THE LESSON IS SILENT (runtime r30): nothing is spoken; every line is
   printed on the bubble, which is the guide. NO imports in this file; only the five host hooks.
   Follow docs/LAYOUT.md and docs/PATTERNS.md. Edit, never rewrite. Concepts are verbatim (check compares them).

   THE TOOL: one day bar from 12 midnight to 12 midnight, 24-hour times above it and 12-hour times below, a marker,
   a violet 12 h tile, a Given card (deep blue) and an Answer card (green at the win).
   Owner decisions (NOTES.md 2026-11-16): a 24-hour time is FOUR digits in ONE box, judged as the typed STRING with its
   leading zeros ("0040" right, "40" a miss whose hint names the zeros): a plain item, never `parts`. A 12-hour time is
   `parts` hours | minutes plus the a.m. / p.m. card on the working area, judged once both are given. */

const TOOL_ID = "day_bar_clocks";
const MEDIA_ID = "M2.S3.T5.C19.2D1";
const TOOL_NAME = "Day Bar Clocks";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (phase 1 has steps, so it is not shown) */
const OPENING = ["A day bar, from one midnight to the next."];
/* not shown from r44; kept for the sidecar */
const FINISH_LINE = "You read one time on both clocks and kept the twelve o'clock hour apart.";
/* printed when the child opens Free play: the marker is dragged (or tapped: one hour on) in free play */
const FREE_LINE = "Free play. Slide the marker anywhere and read it on both clocks.";

/* THE START PAGE: one question to wonder at, and the day bar itself */
const START_HOOK = "How can one clock count all 24 hours of a day?";
function StartArt({ box, C, lang = "en", tx = (v: any) => v }: any) {
  const x0 = 100, L = box.w - 200, y = 130, h = 96;
  return (
    <g>
      <defs>
        <clipPath id="dbcStartBar"><rect x={x0} y={y} width={L} height={h} rx={18} /></clipPath>
        <linearGradient id="dbc-grad-start-am" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFBF2" />
          <stop offset="100%" stopColor="#FFEACC" />
        </linearGradient>
        <linearGradient id="dbc-grad-start-pm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF0F3" />
          <stop offset="100%" stopColor="#F8CBD6" />
        </linearGradient>
        <filter id="dbc-shadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx={0} dy={4} stdDeviation={4} floodColor="#000000" floodOpacity={0.14} />
        </filter>
        <linearGradient id="dbc-grad-tile" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9275CE" />
          <stop offset="100%" stopColor="#6C4CB0" />
        </linearGradient>
        <linearGradient id="dbc-grad-marker-0072B2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2995D9" />
          <stop offset="100%" stopColor="#005B92" />
        </linearGradient>
        <linearGradient id="dbc-grad-marker-E69F00" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFB733" />
          <stop offset="100%" stopColor="#C78200" />
        </linearGradient>
      </defs>
      <g filter="url(#dbc-shadow)">
        <g clipPath="url(#dbcStartBar)">
          <rect x={x0} y={y} width={L / 2} height={h} fill="url(#dbc-grad-start-am)" />
          <rect x={x0 + L / 2} y={y} width={L / 2} height={h} fill="url(#dbc-grad-start-pm)" />
          <line x1={x0 + L / 2} y1={y} x2={x0 + L / 2} y2={y + h} stroke={shade(DBC_C.amber, 0.3)} strokeWidth={2} strokeDasharray="4 4" />
        </g>
        <rect x={x0} y={y} width={L} height={h} rx={18} fill="none" stroke={C.ink} strokeWidth={4} />
      </g>
      {Array.from({ length: 25 }, (_, i) => (
        <line key={i} x1={x0 + (i * L) / 24} y1={y + h - (i % 3 === 0 ? 28 : 16)} x2={x0 + (i * L) / 24} y2={y + h} stroke={C.ink} strokeWidth={i % 3 === 0 ? 3 : 2} />
      ))}
      <text x={x0 + L / 4} y={y + h / 2 - 10} textAnchor="middle" dominantBaseline="central" fontSize={T.label} fontWeight={700} fill={shade(DBC_C.amber, 0.4)}>{tx("a.m.")}</text>
      <text x={x0 + (3 * L) / 4} y={y + h / 2 - 10} textAnchor="middle" dominantBaseline="central" fontSize={T.label} fontWeight={700} fill={shade(DBC_C.rose, 0.5)}>{tx("p.m.")}</text>
      <g transform={`translate(${x0 + L * 0.62},${y + h / 2})`}>{dbcMarkerArt(h, DBC_C.blue)}</g>
      <text x={x0} y={y + h + 46} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("midnight")}</text>
      <text x={x0 + L / 2} y={y + h + 46} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("noon")}</text>
      <text x={x0 + L} y={y + h + 46} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("midnight")}</text>
      <g transform={`translate(${x0 + 120},${y - 70})`}>{dbcTileArt(150, 84, tx("12 h"), 40)}</g>
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): filled in the language pass, once the English is final. */
const TR: any = {
  hi: {
    "Tap the tile, then the half of the day.": "पहले टाइल दबाओ, फिर दिन का आधा भाग।",
    "Tap the 12 h tile first.": "पहले 12 घंटे की टाइल दबाओ।",
    "Tap Slide first.": "पहले खिसकाओ दबाओ।",
    "A 24-hour time has four digits: hold the empty places with zeros.": "24-घंटे के समय में चार अंक होते हैं: खाली जगह शून्य से भरो।",
    "Four digits after midnight": "मध्यरात्रि के बाद चार अंक",
    "Tap Slide to move the marker from midnight to 0715 hours.": "खिसकाओ दबाकर सूचक को 0715 घंटे तक ले जाओ।",
    "Tap the Slide key under the bar.": "पट्टी के नीचे खिसकाओ बटन दबाओ।",
    "Now tap the marker to count the time after midnight.": "अब सूचक दबाओ और मध्यरात्रि के बाद का समय गिनो।",
    "Tap the blue marker on the bar.": "पट्टी पर नीला सूचक दबाओ।",
    "The grey zero in front holds the place for an early hour.": "आगे का धूसर शून्य सुबह के घंटे की जगह भरता है।",
    "You learned: four digits give the hours after midnight, then minutes.": "तुमने सीखा: चार अंक, पहले मध्यरात्रि के बाद के घंटे, फिर मिनट।",
    "A ferry leaves at 0925 hours, so how long after midnight is that?": "एक नाव 0925 घंटे पर चलती है, यह मध्यरात्रि के कितनी देर बाद है?",
    "How long after midnight?": "मध्यरात्रि के कितनी देर बाद?",
    "The first two digits count the whole hours.": "पहले दो अंक पूरे घंटे गिनते हैं।",
    "Yes, 0925 hours is 9 h 25 min after midnight.": "हाँ, 0925 घंटे मध्यरात्रि के 9 घंटे 25 मिनट बाद है।",
    "How many hours and minutes after midnight is 0450 hours?": "0450 घंटे मध्यरात्रि के कितने घंटे और मिनट बाद है?",
    "Hours and minutes?": "घंटे और मिनट?",
    "The last two digits are the minutes.": "आखिरी दो अंक मिनट हैं।",
    "Yes, 0450 hours is 4 h 50 min after midnight.": "हाँ, 0450 घंटे मध्यरात्रि के 4 घंटे 50 मिनट बाद है।",
    "Write 6 h 40 min after midnight as a 24-hour time.": "मध्यरात्रि के 6 घंटे 40 मिनट बाद को 24-घंटे के समय में लिखो।",
    "As a 24-hour time?": "24-घंटे के समय में?",
    "An early hour needs a zero in front, to make four digits.": "सुबह के घंटे के आगे शून्य लगाओ, ताकि चार अंक बनें।",
    "Yes, 6 h 40 min after midnight is 0640 hours.": "हाँ, मध्यरात्रि के 6 घंटे 40 मिनट बाद 0640 घंटे है।",
    "Adding 12 after one o'clock": "एक बजे के बाद 12 जोड़ना",
    "Tap the 12 h tile to fit it onto the hour of 3:40 p.m.": "3:40 अपराह्न के घंटे पर लगाने के लिए 12 घंटे की टाइल दबाओ।",
    "Tap the violet 12 h tile.": "बैंगनी 12 घंटे की टाइल दबाओ।",
    "Now tap the marker to read it on the 24-hour clock.": "अब सूचक दबाओ और 24-घंटे की घड़ी पर पढ़ो।",
    "Tap the marker in the rose half.": "गुलाबी हिस्से में सूचक दबाओ।",
    "After 1 o'clock in the afternoon, add 12 to the hour and keep the minutes.": "दोपहर 1 बजे के बाद घंटे में 12 जोड़ो और मिनट वैसे ही रखो।",
    "You learned: after 1 p.m., add 12 to the hour and keep the minutes.": "तुमने सीखा: 1 अपराह्न के बाद घंटे में 12 जोड़ो, मिनट वही रहते हैं।",
    "On the 24-hour clock, what is 6:20 p.m.?": "6:20 अपराह्न, 24-घंटे की घड़ी पर क्या है?",
    "6:20 p.m. in 24-hour time?": "6:20 अपराह्न, 24-घंटे के समय में?",
    "Fit the 12 h tile onto the hour, not the minutes.": "12 घंटे की टाइल घंटे पर लगाओ, मिनट पर नहीं।",
    "Yes, 6 + 12 = 18, so 1820 hours is 6:20 p.m.": "हाँ, 6 + 12 = 18, तो 1820 घंटे का अर्थ 6:20 अपराह्न है।",
    "Write 7:10 p.m., in four digits.": "7:10 अपराह्न को चार अंकों में लिखो।",
    "7:10 p.m. in 24-hour time?": "7:10 अपराह्न, 24-घंटे के समय में?",
    "An afternoon hour needs the 12 h tile.": "दोपहर बाद के घंटे पर 12 घंटे की टाइल लगती है।",
    "Yes, 7 + 12 = 19, so 1910 hours is 7:10 p.m.": "हाँ, 7 + 12 = 19, तो 1910 घंटे का अर्थ 7:10 अपराह्न है।",
    "A train leaves at 11:25 p.m., so what is that in 24-hour time?": "रेलगाड़ी 11:25 अपराह्न पर चलती है, 24-घंटे के समय में यह क्या है?",
    "11:25 p.m. in 24-hour time?": "11:25 अपराह्न, 24-घंटे के समय में?",
    "The tile goes on the 11, and the 25 minutes stay as they are.": "टाइल 11 पर लगती है, और 25 मिनट वैसे ही रहते हैं।",
    "Yes, 11 + 12 = 23, so 2325 hours is 11:25 p.m.": "हाँ, 11 + 12 = 23, तो 2325 घंटे का अर्थ 11:25 अपराह्न है।",
    "The 12 o'clock hour": "12 बजे वाला घंटा",
    "Tap the 12 h tile to try it on 12:40 p.m.": "12 घंटे की टाइल दबाओ और उसे 12:40 अपराह्न पर आज़माओ।",
    "Tap the violet tile once.": "बैंगनी टाइल एक बार दबाओ।",
    "Now tap the marker to read it without the tile.": "अब सूचक दबाओ और इसे बिना टाइल के पढ़ो।",
    "Tap the marker just after noon.": "दोपहर के ठीक बाद वाला सूचक दबाओ।",
    "0050 hours is 12:50 a.m., 1250 is 12:50 p.m.: in the 12 o'clock hour add no 12.": "0050 घंटे = 12:50 पूर्वाह्न, 1250 घंटे = 12:50 अपराह्न: 12 के घंटे में 12 नहीं।",
    "You learned: never add 12 in the 12 o'clock hour; midnight is 0000.": "तुमने सीखा: 12 बजे वाले घंटे में 12 मत जोड़ो; मध्यरात्रि 0000 है।",
    "On the 24-hour clock, what is 12:35 a.m.?": "12:35 पूर्वाह्न, 24-घंटे की घड़ी पर क्या है?",
    "12:35 a.m. in 24-hour time?": "12:35 पूर्वाह्न, 24-घंटे के समय में?",
    "Find the 12 o'clock hour that comes just after midnight.": "मध्यरात्रि के ठीक बाद आने वाला 12 बजे का घंटा ढूँढो।",
    "Yes, 0035 hours is just after midnight, at 12:35 a.m.": "हाँ, 0035 घंटे मध्यरात्रि के ठीक बाद है, 12:35 पूर्वाह्न पर।",
    "How is 12 midnight written on the 24-hour clock?": "24-घंटे की घड़ी पर 12 मध्यरात्रि कैसे लिखते हैं?",
    "12 midnight in 24-hour time?": "12 मध्यरात्रि, 24-घंटे के समय में?",
    "Where is the marker, and how many hours has it gone since midnight?": "सूचक कहाँ है, और मध्यरात्रि से कितने घंटे बीते?",
    "Yes, 12 midnight is 0000 hours, and 12 noon is 1200 hours.": "हाँ, 12 मध्यरात्रि 0000 घंटे है, और 12 दोपहर 1200 घंटे।",
    "In four digits, what is 12:50 p.m.?": "चार अंकों में 12:50 अपराह्न क्या है?",
    "12:50 p.m. in 24-hour time?": "12:50 अपराह्न, 24-घंटे के समय में?",
    "The tile slid off this hour, so leave the 12 as it is.": "टाइल इस घंटे से फिसल गई, तो 12 को वैसा ही रहने दो।",
    "Yes, just after noon, 1250 hours is 12:50 p.m.": "हाँ, दोपहर के ठीक बाद, 1250 घंटे यानी 12:50 अपराह्न।",
    "Back to the 12-hour clock": "वापस 12-घंटे की घड़ी पर",
    "Tap the 12 h tile to lift it off the hours of 2110 hours.": "12 घंटे की टाइल दबाओ और उसे 2110 घंटे से हटाओ।",
    "Tap the violet tile beside the bar.": "पट्टी के पास वाली बैंगनी टाइल दबाओ।",
    "2110 hours is after noon, so now tap p.m.": "2110 घंटे दोपहर के बाद है, तो अब अपराह्न दबाओ।",
    "After noon, the tag is p.m.": "दोपहर के बाद टैग अपराह्न है।",
    "Just after midnight, the 12-hour clock reads 12 and the tag is a.m.": "मध्यरात्रि के ठीक बाद 12-घंटे की घड़ी 12 दिखाती है और टैग पूर्वाह्न है।",
    "You learned: from 1300 hours take away 12, then tag a.m. or p.m.": "तुमने सीखा: 1300 घंटे से 12 घटाओ, फिर पूर्वाह्न या अपराह्न लगाओ।",
    "What is 2245 hours on the 12-hour clock?": "12-घंटे की घड़ी पर 2245 घंटे क्या है?",
    "2245 hours, 12-hour time?": "2245 घंटे, 12-घंटे का समय?",
    "2245 hours is after 1300 hours, so the tile comes off the hours.": "2245 घंटे 1300 घंटे के बाद है, तो टाइल घंटों से हटती है।",
    "Yes, 22 minus 12 is 10, so 2245 hours is 10:45 p.m.": "हाँ, 22 में से 12 घटाकर 10, तो 2245 घंटे यानी 10:45 अपराह्न।",
    "Now write 1735 hours as a 12-hour time.": "अब 1735 घंटे को 12-घंटे के समय में लिखो।",
    "1735 hours, 12-hour time?": "1735 घंटे, 12-घंटे का समय?",
    "Take 12 away from the hours, then keep the minutes.": "घंटों में से 12 घटाओ, फिर मिनट वही रखो।",
    "Yes, 17 minus 12 is 5, so 1735 hours is 5:35 p.m.": "हाँ, 17 में से 12 घटाकर 5, तो 1735 घंटे यानी 5:35 अपराह्न।",
    "And 0005 hours, on the 12-hour clock?": "और 0005 घंटे, 12-घंटे की घड़ी पर?",
    "0005 hours, 12-hour time?": "0005 घंटे, 12-घंटे का समय?",
    "0005 hours is in the hour just after midnight.": "0005 घंटे मध्यरात्रि के ठीक बाद वाले घंटे में है।",
    "Yes, just after midnight, 0005 hours is 12:05 a.m.": "हाँ, 12:05 पूर्वाह्न यानी 0005 घंटे, मध्यरात्रि के ठीक बाद।",
    "How many hours after midnight? Then how many minutes?": "मध्यरात्रि के कितने घंटे बाद? फिर कितने मिनट?",
    "Count the whole hours from the left end of the bar to the marker.": "पट्टी के बाएँ सिरे से सूचक तक पूरे घंटे गिनो।",
    "Match each part of the blue time to its own box on the Answer card.": "नीले समय का हर भाग उत्तर कार्ड के अपने खाने से मिलाओ।",
    "Is it after one o'clock in the afternoon? Then what do you add to the hour?": "क्या दोपहर एक बजे के बाद है? तो घंटे में क्या जोड़ोगे?",
    "Count the hours from the left end of the bar to the marker.": "पट्टी के बाएँ सिरे से सूचक तक घंटे गिनो।",
    "Write those hours as two digits, then the two minute digits from the blue time.": "उन घंटों को दो अंकों में लिखो, फिर नीले समय के मिनट वाले दो अंक।",
    "The hour that begins at twelve is special. What would adding twelve do here?": "12 बजे से शुरू होने वाला घंटा खास है। यहाँ 12 जोड़ने से क्या होगा?",
    "Find the noon mark on the bar and see where the marker sits beside it.": "पट्टी पर दोपहर का निशान ढूँढो और देखो सूचक उसके पास कहाँ है।",
    "Just after noon, how many whole hours have gone since midnight?": "दोपहर के ठीक बाद, मध्यरात्रि से कितने पूरे घंटे बीते?",
    "At 12:35 a.m., how many whole hours have gone since midnight?": "12:35 पूर्वाह्न पर मध्यरात्रि से कितने पूरे घंटे बीते?",
    "Hours since midnight make the first two digits, minutes the last two.": "मध्यरात्रि से बीते घंटे पहले दो अंक हैं, मिनट आखिरी दो।",
    "Each of the four places needs a digit.": "चारों जगह पर एक अंक चाहिए।",
    "At 12 midnight, how many hours and minutes have gone by?": "12 मध्यरात्रि पर कितने घंटे और मिनट बीते हैं?",
    "Is it before noon or after? What do you do to the hours?": "दोपहर से पहले है या बाद में? घंटों का क्या करोगे?",
    "Look at which half of the bar the marker sits in.": "देखो सूचक पट्टी के किस आधे भाग में है।",
    "Read the 12-hour row under the marker, then keep the minutes.": "सूचक के नीचे 12-घंटे की पंक्ति पढ़ो, फिर मिनट वही रखो।",
    "The left half of the bar is a.m., and this is the hour after midnight.": "पट्टी का बायाँ आधा पूर्वाह्न है, और यह मध्यरात्रि के बाद का घंटा है।",
    "On a clock face, which number is at the top, where a new day starts?": "घड़ी के मुख पर सबसे ऊपर कौन-सी संख्या है, जहाँ नया दिन शुरू होता है?",
    "Day Bar Clocks": "दिन-पट्टी घड़ियाँ",
    "Free play. Slide the marker anywhere and read it on both clocks.": "मुक्त खेल। सूचक को कहीं भी खिसकाओ और दोनों घड़ियों पर पढ़ो।",
    "How can one clock count all 24 hours of a day?": "एक घड़ी दिन के सारे 24 घंटे कैसे गिन सकती है?",
    "First tap the tag for the half of the day.": "पहले दिन के आधे भाग का टैग दबाओ।",
    "A day bar, from one midnight to the next.": "एक दिन-पट्टी, एक मध्यरात्रि से अगली तक।",
    "a.m.": "पूर्वाह्न",
    "p.m.": "अपराह्न",
    "midnight": "मध्यरात्रि",
    "noon": "दोपहर",
    "12 h": "12 घंटे",
    "hours": "घंटे",
    "minutes": "मिनट",
    "h": "घं",
    "min": "मिनट",
    "Marker": "सूचक",
    "Slide": "खिसकाओ",
    "12 h tile": "12 घंटे की टाइल",
    "24-hour": "24-घंटे",
    "Given": "दिया है",
    "12-hour": "12-घंटे",
    "Answer": "उत्तर",
    "hours, then minutes": "पहले घंटे, फिर मिनट",
    "Place holder": "स्थानधारक",
    "hour plus 12": "घंटा + 12",
    "at midnight": "ठीक मध्यरात्रि",
    "just after midnight": "मध्यरात्रि के ठीक बाद",
    "just after noon": "दोपहर के ठीक बाद",
    "after midnight, so a.m.": "मध्यरात्रि बाद, पूर्वाह्न",
    "before noon, so a.m.": "दोपहर से पहले, पूर्वाह्न",
    "after noon, so p.m.": "दोपहर बाद, अपराह्न",
  },
  gu: {
    "Tap the tile, then the half of the day.": "પહેલાં ટાઇલ દબાવો, પછી દિવસનો અડધો ભાગ.",
    "Tap the 12 h tile first.": "પહેલાં 12 કલાકની ટાઇલ દબાવો.",
    "Tap Slide first.": "પહેલાં ખસેડો દબાવો.",
    "A 24-hour time has four digits: hold the empty places with zeros.": "24-કલાકના સમયમાં ચાર અંક હોય: ખાલી જગ્યા શૂન્યથી ભરો.",
    "Four digits after midnight": "મધ્યરાત્રિ પછી ચાર અંક",
    "Tap Slide to move the marker from midnight to 0715 hours.": "ખસેડો દબાવી સૂચકને 0715 કલાક સુધી લઈ જાઓ.",
    "Tap the Slide key under the bar.": "પટ્ટી નીચે ખસેડો બટન દબાવો.",
    "Now tap the marker to count the time after midnight.": "હવે સૂચક દબાવો અને મધ્યરાત્રિ પછીનો સમય ગણો.",
    "Tap the blue marker on the bar.": "પટ્ટી પરનો વાદળી સૂચક દબાવો.",
    "The grey zero in front holds the place for an early hour.": "આગળનો રાખોડી શૂન્ય વહેલા કલાકની જગ્યા રાખે છે.",
    "You learned: four digits give the hours after midnight, then minutes.": "તમે શીખ્યા: ચાર અંક, પહેલાં મધ્યરાત્રિ પછીના કલાક, પછી મિનિટ.",
    "A ferry leaves at 0925 hours, so how long after midnight is that?": "એક હોડી 0925 કલાકે ઊપડે છે, તે મધ્યરાત્રિ પછી કેટલા સમયે છે?",
    "How long after midnight?": "મધ્યરાત્રિ પછી કેટલો સમય?",
    "The first two digits count the whole hours.": "પહેલા બે અંક પૂરા કલાક ગણે છે.",
    "Yes, 0925 hours is 9 h 25 min after midnight.": "હા, 0925 કલાક એટલે મધ્યરાત્રિ પછી 9 કલાક 25 મિનિટ.",
    "How many hours and minutes after midnight is 0450 hours?": "0450 કલાક મધ્યરાત્રિ પછી કેટલા કલાક અને મિનિટ છે?",
    "Hours and minutes?": "કલાક અને મિનિટ?",
    "The last two digits are the minutes.": "છેલ્લા બે અંક મિનિટ છે.",
    "Yes, 0450 hours is 4 h 50 min after midnight.": "હા, 0450 કલાક એટલે મધ્યરાત્રિ પછી 4 કલાક 50 મિનિટ.",
    "Write 6 h 40 min after midnight as a 24-hour time.": "મધ્યરાત્રિ પછી 6 કલાક 40 મિનિટને 24-કલાકના સમયમાં લખો.",
    "As a 24-hour time?": "24-કલાકના સમયમાં?",
    "An early hour needs a zero in front, to make four digits.": "વહેલા કલાક આગળ શૂન્ય મૂકો, જેથી ચાર અંક થાય.",
    "Yes, 6 h 40 min after midnight is 0640 hours.": "હા, મધ્યરાત્રિ પછી 6 કલાક 40 મિનિટ એટલે 0640 કલાક.",
    "Adding 12 after one o'clock": "એક વાગ્યા પછી 12 ઉમેરવા",
    "Tap the 12 h tile to fit it onto the hour of 3:40 p.m.": "3:40 અપરાહ્નના કલાક પર બેસાડવા 12 કલાકની ટાઇલ દબાવો.",
    "Tap the violet 12 h tile.": "જાંબલી 12 કલાકની ટાઇલ દબાવો.",
    "Now tap the marker to read it on the 24-hour clock.": "હવે સૂચક દબાવો અને 24-કલાકની ઘડિયાળ પર વાંચો.",
    "Tap the marker in the rose half.": "ગુલાબી ભાગમાં સૂચક દબાવો.",
    "After 1 o'clock in the afternoon, add 12 to the hour and keep the minutes.": "બપોરે 1 વાગ્યા પછી કલાકમાં 12 ઉમેરો અને મિનિટ એમ જ રાખો.",
    "You learned: after 1 p.m., add 12 to the hour and keep the minutes.": "તમે શીખ્યા: બપોરે 1 વાગ્યા પછી કલાકમાં 12 ઉમેરો, મિનિટ એ જ રહે.",
    "On the 24-hour clock, what is 6:20 p.m.?": "6:20 અપરાહ્ન, 24-કલાકની ઘડિયાળ પર શું છે?",
    "6:20 p.m. in 24-hour time?": "6:20 અપરાહ્ન, 24-કલાકના સમયમાં?",
    "Fit the 12 h tile onto the hour, not the minutes.": "12 કલાકની ટાઇલ કલાક પર મૂકો, મિનિટ પર નહીં.",
    "Yes, 6 + 12 = 18, so 1820 hours is 6:20 p.m.": "હા, 6 + 12 = 18, તેથી 1820 કલાક એટલે 6:20 અપરાહ્ન.",
    "Write 7:10 p.m., in four digits.": "7:10 અપરાહ્નને ચાર અંકમાં લખો.",
    "7:10 p.m. in 24-hour time?": "7:10 અપરાહ્ન, 24-કલાકના સમયમાં?",
    "An afternoon hour needs the 12 h tile.": "બપોર પછીના કલાકને 12 કલાકની ટાઇલ જોઈએ.",
    "Yes, 7 + 12 = 19, so 1910 hours is 7:10 p.m.": "હા, 7 + 12 = 19, તેથી 1910 કલાક એટલે 7:10 અપરાહ્ન.",
    "A train leaves at 11:25 p.m., so what is that in 24-hour time?": "ટ્રેન 11:25 અપરાહ્ને ઊપડે છે, 24-કલાકના સમયમાં તે શું છે?",
    "11:25 p.m. in 24-hour time?": "11:25 અપરાહ્ન, 24-કલાકના સમયમાં?",
    "The tile goes on the 11, and the 25 minutes stay as they are.": "ટાઇલ 11 પર બેસે છે, અને 25 મિનિટ એમ જ રહે છે.",
    "Yes, 11 + 12 = 23, so 2325 hours is 11:25 p.m.": "હા, 11 + 12 = 23, તેથી 2325 કલાક એટલે 11:25 અપરાહ્ન.",
    "The 12 o'clock hour": "12 વાગ્યાનો કલાક",
    "Tap the 12 h tile to try it on 12:40 p.m.": "12 કલાકની ટાઇલ દબાવો અને તેને 12:40 અપરાહ્ન પર અજમાવો.",
    "Tap the violet tile once.": "જાંબલી ટાઇલ એક વાર દબાવો.",
    "Now tap the marker to read it without the tile.": "હવે સૂચક દબાવો અને તેને ટાઇલ વગર વાંચો.",
    "Tap the marker just after noon.": "બપોર પછી તરત આવેલો સૂચક દબાવો.",
    "0050 hours is 12:50 a.m., 1250 is 12:50 p.m.: in the 12 o'clock hour add no 12.": "0050 કલાક = 12:50 પૂર્વાહ્ન, 1250 કલાક = 12:50 અપરાહ્ન: 12ના કલાકમાં 12 નહીં.",
    "You learned: never add 12 in the 12 o'clock hour; midnight is 0000.": "તમે શીખ્યા: 12 વાગ્યાના કલાકમાં 12 ઉમેરશો નહીં; મધ્યરાત્રિ 0000 છે.",
    "On the 24-hour clock, what is 12:35 a.m.?": "12:35 પૂર્વાહ્ન, 24-કલાકની ઘડિયાળ પર શું છે?",
    "12:35 a.m. in 24-hour time?": "12:35 પૂર્વાહ્ન, 24-કલાકના સમયમાં?",
    "Find the 12 o'clock hour that comes just after midnight.": "મધ્યરાત્રિ પછી તરત આવતો 12 વાગ્યાનો કલાક શોધો.",
    "Yes, 0035 hours is just after midnight, at 12:35 a.m.": "હા, 0035 કલાક મધ્યરાત્રિ પછી તરત છે, 12:35 પૂર્વાહ્ને.",
    "How is 12 midnight written on the 24-hour clock?": "24-કલાકની ઘડિયાળ પર 12 મધ્યરાત્રિ કેવી રીતે લખાય?",
    "12 midnight in 24-hour time?": "12 મધ્યરાત્રિ, 24-કલાકના સમયમાં?",
    "Where is the marker, and how many hours has it gone since midnight?": "સૂચક ક્યાં છે, અને મધ્યરાત્રિથી કેટલા કલાક થયા?",
    "Yes, 12 midnight is 0000 hours, and 12 noon is 1200 hours.": "હા, 12 મધ્યરાત્રિ 0000 કલાક છે, અને 12 બપોર 1200 કલાક.",
    "In four digits, what is 12:50 p.m.?": "ચાર અંકમાં 12:50 અપરાહ્ન શું છે?",
    "12:50 p.m. in 24-hour time?": "12:50 અપરાહ્ન, 24-કલાકના સમયમાં?",
    "The tile slid off this hour, so leave the 12 as it is.": "ટાઇલ આ કલાક પરથી સરકી ગઈ, તેથી 12 ને એમ જ રહેવા દો.",
    "Yes, just after noon, 1250 hours is 12:50 p.m.": "હા, બપોર પછી તરત, 1250 કલાક એટલે 12:50 અપરાહ્ન.",
    "Back to the 12-hour clock": "પાછા 12-કલાકની ઘડિયાળ પર",
    "Tap the 12 h tile to lift it off the hours of 2110 hours.": "12 કલાકની ટાઇલ દબાવો અને તેને 2110 કલાકમાંથી કાઢો.",
    "Tap the violet tile beside the bar.": "પટ્ટી પાસેની જાંબલી ટાઇલ દબાવો.",
    "2110 hours is after noon, so now tap p.m.": "2110 કલાક બપોર પછી છે, તેથી હવે અપરાહ્ન દબાવો.",
    "After noon, the tag is p.m.": "બપોર પછી નિશાન અપરાહ્ન છે.",
    "Just after midnight, the 12-hour clock reads 12 and the tag is a.m.": "મધ્યરાત્રિ પછી તરત 12-કલાકની ઘડિયાળ 12 બતાવે છે અને નિશાન પૂર્વાહ્ન છે.",
    "You learned: from 1300 hours take away 12, then tag a.m. or p.m.": "તમે શીખ્યા: 1300 કલાકથી 12 બાદ કરો, પછી પૂર્વાહ્ન કે અપરાહ્ન લગાવો.",
    "What is 2245 hours on the 12-hour clock?": "12-કલાકની ઘડિયાળ પર 2245 કલાક શું છે?",
    "2245 hours, 12-hour time?": "2245 કલાક, 12-કલાકનો સમય?",
    "2245 hours is after 1300 hours, so the tile comes off the hours.": "2245 કલાક 1300 કલાક પછી છે, તેથી ટાઇલ કલાકમાંથી નીકળે છે.",
    "Yes, 22 minus 12 is 10, so 2245 hours is 10:45 p.m.": "હા, 10:45 અપરાહ્ન એટલે 2245 કલાક, કારણ કે 22 માંથી 12 બાદ કરતાં 10.",
    "Now write 1735 hours as a 12-hour time.": "હવે 1735 કલાકને 12-કલાકના સમયમાં લખો.",
    "1735 hours, 12-hour time?": "1735 કલાક, 12-કલાકનો સમય?",
    "Take 12 away from the hours, then keep the minutes.": "કલાકમાંથી 12 બાદ કરો, પછી મિનિટ એ જ રાખો.",
    "Yes, 17 minus 12 is 5, so 1735 hours is 5:35 p.m.": "હા, 5:35 અપરાહ્ન એટલે 1735 કલાક, કારણ કે 17 માંથી 12 બાદ કરતાં 5.",
    "And 0005 hours, on the 12-hour clock?": "અને 0005 કલાક, 12-કલાકની ઘડિયાળ પર?",
    "0005 hours, 12-hour time?": "0005 કલાક, 12-કલાકનો સમય?",
    "0005 hours is in the hour just after midnight.": "0005 કલાક મધ્યરાત્રિ પછી તરતના કલાકમાં છે.",
    "Yes, just after midnight, 0005 hours is 12:05 a.m.": "હા, 12:05 પૂર્વાહ્ન એટલે 0005 કલાક, મધ્યરાત્રિ પછી તરત.",
    "How many hours after midnight? Then how many minutes?": "મધ્યરાત્રિ પછી કેટલા કલાક? પછી કેટલી મિનિટ?",
    "Count the whole hours from the left end of the bar to the marker.": "પટ્ટીના ડાબા છેડેથી સૂચક સુધી પૂરા કલાક ગણો.",
    "Match each part of the blue time to its own box on the Answer card.": "વાદળી સમયનો દરેક ભાગ જવાબ કાર્ડના પોતાના ખાના સાથે મેળવો.",
    "Is it after one o'clock in the afternoon? Then what do you add to the hour?": "શું બપોરે એક વાગ્યા પછી છે? તો કલાકમાં શું ઉમેરશો?",
    "Count the hours from the left end of the bar to the marker.": "પટ્ટીના ડાબા છેડેથી સૂચક સુધી કલાક ગણો.",
    "Write those hours as two digits, then the two minute digits from the blue time.": "એ કલાકને બે અંકમાં લખો, પછી વાદળી સમયના મિનિટના બે અંક.",
    "The hour that begins at twelve is special. What would adding twelve do here?": "12 વાગ્યે શરૂ થતો કલાક ખાસ છે. અહીં 12 ઉમેરવાથી શું થાય?",
    "Find the noon mark on the bar and see where the marker sits beside it.": "પટ્ટી પર બપોરનું નિશાન શોધો અને જુઓ સૂચક તેની પાસે ક્યાં છે.",
    "Just after noon, how many whole hours have gone since midnight?": "બપોર પછી તરત, મધ્યરાત્રિથી કેટલા પૂરા કલાક થયા?",
    "At 12:35 a.m., how many whole hours have gone since midnight?": "12:35 પૂર્વાહ્ને મધ્યરાત્રિથી કેટલા પૂરા કલાક થયા?",
    "Hours since midnight make the first two digits, minutes the last two.": "મધ્યરાત્રિથી થયેલા કલાક પહેલા બે અંક, મિનિટ છેલ્લા બે.",
    "Each of the four places needs a digit.": "ચારેય જગ્યાએ એક અંક જોઈએ.",
    "At 12 midnight, how many hours and minutes have gone by?": "12 મધ્યરાત્રિએ કેટલા કલાક અને મિનિટ થયા છે?",
    "Is it before noon or after? What do you do to the hours?": "બપોર પહેલાં છે કે પછી? કલાકનું શું કરશો?",
    "Look at which half of the bar the marker sits in.": "જુઓ સૂચક પટ્ટીના કયા અડધા ભાગમાં છે.",
    "Read the 12-hour row under the marker, then keep the minutes.": "સૂચક નીચે 12-કલાકની હાર વાંચો, પછી મિનિટ એ જ રાખો.",
    "The left half of the bar is a.m., and this is the hour after midnight.": "પટ્ટીનો ડાબો અડધો પૂર્વાહ્ન છે, અને આ મધ્યરાત્રિ પછીનો કલાક છે.",
    "On a clock face, which number is at the top, where a new day starts?": "ઘડિયાળના ચહેરા પર સૌથી ઉપર કઈ સંખ્યા છે, જ્યાં નવો દિવસ શરૂ થાય?",
    "Day Bar Clocks": "દિવસ-પટ્ટી ઘડિયાળો",
    "Free play. Slide the marker anywhere and read it on both clocks.": "મુક્ત રમત. સૂચકને ક્યાંય પણ ખસેડો અને બંને ઘડિયાળ પર વાંચો.",
    "How can one clock count all 24 hours of a day?": "એક ઘડિયાળ દિવસના બધા 24 કલાક કેવી રીતે ગણી શકે?",
    "First tap the tag for the half of the day.": "પહેલાં દિવસના અડધા ભાગનું નિશાન દબાવો.",
    "A day bar, from one midnight to the next.": "એક દિવસ-પટ્ટી, એક મધ્યરાત્રિથી બીજી સુધી.",
    "a.m.": "પૂર્વાહ્ન",
    "p.m.": "અપરાહ્ન",
    "midnight": "મધ્યરાત્રિ",
    "noon": "બપોર",
    "12 h": "12 કલાક",
    "hours": "કલાક",
    "minutes": "મિનિટ",
    "h": "ક.",
    "min": "મિનિટ",
    "Marker": "સૂચક",
    "Slide": "ખસેડો",
    "12 h tile": "12 કલાકની ટાઇલ",
    "24-hour": "24-કલાક",
    "Given": "આપેલું",
    "12-hour": "12-કલાક",
    "Answer": "જવાબ",
    "hours, then minutes": "પહેલાં કલાક, પછી મિનિટ",
    "Place holder": "સ્થાનધારક",
    "hour plus 12": "કલાક + 12",
    "at midnight": "બરાબર મધ્યરાત્રિ",
    "just after midnight": "મધ્યરાત્રિ પછી તરત",
    "just after noon": "બપોર પછી તરત",
    "after midnight, so a.m.": "મધ્યરાત્રિ પછી, પૂર્વાહ્ન",
    "before noon, so a.m.": "બપોર પહેલાં, પૂર્વાહ્ન",
    "after noon, so p.m.": "બપોર પછી, અપરાહ્ન",
  },
};

/* the two boxes of a 12-hour time and of a time after midnight (one set, so the checks see one kind) */
const HM = [{ label: "hours" }, { label: "minutes" }];

/* One entry per phase = one mount. `warm` is the guide steps' warm-up time (never one of the phase's answers).
   Item fields of this tool: kind (after | write24 | to24 | noon | to12), t = minutes after midnight of the time the
   question gives, win = the one-sentence win line, half = the a.m. / p.m. of a 12-hour answer. */
const PHASES = [
  {
    n: 1,
    concept: "Four digits after midnight",
    conceptId: "M2.S3.T5.C20", objectiveIds: ["O7"],
    says: ["How many hours after midnight? Then how many minutes?"],
    warm: { kind: "after", t: 435 },
    steps: [
      { say: "Tap Slide to move the marker from midnight to 0715 hours.", on: "slide", hint: "Tap the Slide key under the bar." },
      { say: "Now tap the marker to count the time after midnight.", on: "marker", hint: "Tap the blue marker on the bar." },
    ],
    ladder: ["Count the whole hours from the left end of the bar to the marker.", "Match each part of the blue time to its own box on the Answer card."],
    closing: "The grey zero in front holds the place for an early hour.",
    learned: "You learned: four digits give the hours after midnight, then minutes.",
    traceback: "The hour digits light up over the hours from midnight on the bar, then the time after midnight is written in full (a grey zero holds the front place of an early hour).",
    items: [
      /* learn DB1: answer in the plan = 9 h 25 min after midnight, so it is 9:25 a.m. (the morning half is left to phase 4) */
      { qid: "M2.S3.T5.C20:DB1", kind: "after", t: 565, parts: HM, answer: [9, 25],
        say: "A ferry leaves at 0925 hours, so how long after midnight is that?", ask: "How long after midnight?",
        miss: "The first two digits count the whole hours.", win: "Yes, 0925 hours is 9 h 25 min after midnight." },
      /* practice 1: answer in the plan = 4 h 50 min after midnight */
      { qid: "M2.S3.T5.C20:1", kind: "after", t: 290, parts: HM, answer: [4, 50],
        say: "How many hours and minutes after midnight is 0450 hours?", ask: "Hours and minutes?",
        miss: "The last two digits are the minutes.", win: "Yes, 0450 hours is 4 h 50 min after midnight." },
      /* practice 5: answer in the plan = 0640 hours */
      { qid: "M2.S3.T5.C20:5", kind: "write24", t: 400, answer: "0640",
        say: "Write 6 h 40 min after midnight as a 24-hour time.", ask: "As a 24-hour time?",
        miss: "An early hour needs a zero in front, to make four digits.", win: "Yes, 6 h 40 min after midnight is 0640 hours." },
    ],
  },
  {
    n: 2,
    concept: "Adding 12 after one o'clock",
    conceptId: "M2.S3.T5.C21", objectiveIds: ["O7"],
    says: ["Is it after one o'clock in the afternoon? Then what do you add to the hour?"],
    warm: { kind: "to24", t: 940 },
    steps: [
      { say: "Tap the 12 h tile to fit it onto the hour of 3:40 p.m.", on: "tile", hint: "Tap the violet 12 h tile." },
      { say: "Now tap the marker to read it on the 24-hour clock.", on: "marker", hint: "Tap the marker in the rose half." },
    ],
    ladder: ["Count the hours from the left end of the bar to the marker.", "Write those hours as two digits, then the two minute digits from the blue time."],
    closing: "After 1 o'clock in the afternoon, add 12 to the hour and keep the minutes.",
    learned: "You learned: after 1 p.m., add 12 to the hour and keep the minutes.",
    traceback: "The hour of the given time lights amber, the 12 h tile sits on it, and the 24-hour time is written: the new hour, then the same minutes.",
    items: [
      /* learn DB2: answer in the plan = 1820 hours */
      { qid: "M2.S3.T5.C21:DB2", kind: "to24", t: 1100, answer: "1820",
        say: "On the 24-hour clock, what is 6:20 p.m.?", ask: "6:20 p.m. in 24-hour time?",
        miss: "Fit the 12 h tile onto the hour, not the minutes.", win: "Yes, 6 + 12 = 18, so 1820 hours is 6:20 p.m." },
      /* practice 2: answer in the plan = 1910 hours, because 7 + 12 = 19 */
      { qid: "M2.S3.T5.C21:2", kind: "to24", t: 1150, answer: "1910",
        say: "Write 7:10 p.m., in four digits.", ask: "7:10 p.m. in 24-hour time?",
        miss: "An afternoon hour needs the 12 h tile.", win: "Yes, 7 + 12 = 19, so 1910 hours is 7:10 p.m." },
      /* practice 6: answer in the plan = 2325 hours, because 11 + 12 = 23 */
      { qid: "M2.S3.T5.C21:6", kind: "to24", t: 1405, answer: "2325",
        say: "A train leaves at 11:25 p.m., so what is that in 24-hour time?", ask: "11:25 p.m. in 24-hour time?",
        miss: "The tile goes on the 11, and the 25 minutes stay as they are.", win: "Yes, 11 + 12 = 23, so 2325 hours is 11:25 p.m." },
    ],
  },
  {
    n: 3,
    concept: "The 12 o'clock hour",
    conceptId: "M2.S3.T5.C22", objectiveIds: ["O8"],
    says: ["The hour that begins at twelve is special. What would adding twelve do here?"],
    warm: { kind: "noon", t: 760 },
    steps: [
      { say: "Tap the 12 h tile to try it on 12:40 p.m.", on: "tile", hint: "Tap the violet tile once." },
      { say: "Now tap the marker to read it without the tile.", on: "marker", hint: "Tap the marker just after noon." },
    ],
    ladder: ["Find the noon mark on the bar and see where the marker sits beside it.", "Just after noon, how many whole hours have gone since midnight?"],
    closing: "0050 hours is 12:50 a.m., 1250 is 12:50 p.m.: in the 12 o'clock hour add no 12.",
    learned: "You learned: never add 12 in the 12 o'clock hour; midnight is 0000.",
    traceback: "The 12 o'clock hour of the given time lights amber on the bar, the tile stays off beside it, and the four digits are written with the hours after midnight.",
    items: [
      /* learn DB3: answer in the plan = 0035 hours for 12:35 a.m., and 1235 hours for 12:35 p.m. (one box holds one time:
         the a.m. one is asked, the p.m. one is said in the win line) */
      { qid: "M2.S3.T5.C22:DB3", kind: "noon", t: 35, answer: "0035",
        say: "On the 24-hour clock, what is 12:35 a.m.?", ask: "12:35 a.m. in 24-hour time?",
        miss: "Find the 12 o'clock hour that comes just after midnight.",
        ladder: ["At 12:35 a.m., how many whole hours have gone since midnight?", "Hours since midnight make the first two digits, minutes the last two."], win: "Yes, 0035 hours is just after midnight, at 12:35 a.m." },
      /* practice 3: answer in the plan = 12 noon is 1200 hours, and 12 midnight is 0000 hours (midnight is asked) */
      { qid: "M2.S3.T5.C22:3", kind: "noon", t: 0, answer: "0000",
        say: "How is 12 midnight written on the 24-hour clock?", ask: "12 midnight in 24-hour time?",
        miss: "Where is the marker, and how many hours has it gone since midnight?",
        ladder: ["Each of the four places needs a digit.", "At 12 midnight, how many hours and minutes have gone by?"], win: "Yes, 12 midnight is 0000 hours, and 12 noon is 1200 hours." },
      /* practice 7: answer in the plan = 12:50 a.m. is 0050 hours, and 12:50 p.m. is 1250 hours (the p.m. one is asked) */
      { qid: "M2.S3.T5.C22:7", kind: "noon", t: 770, answer: "1250",
        say: "In four digits, what is 12:50 p.m.?", ask: "12:50 p.m. in 24-hour time?",
        miss: "The tile slid off this hour, so leave the 12 as it is.", win: "Yes, just after noon, 1250 hours is 12:50 p.m." },
    ],
  },
  {
    n: 4,
    concept: "Back to the 12-hour clock",
    conceptId: "M2.S3.T5.C23", objectiveIds: ["O8"],
    says: ["Is it before noon or after? What do you do to the hours?"],
    warm: { kind: "to12", t: 1270 },
    steps: [
      { say: "Tap the 12 h tile to lift it off the hours of 2110 hours.", on: "tile", hint: "Tap the violet tile beside the bar." },
      { say: "2110 hours is after noon, so now tap p.m.", on: "pm", hint: "After noon, the tag is p.m." },
    ],
    ladder: ["Look at which half of the bar the marker sits in.", "Read the 12-hour row under the marker, then keep the minutes."],
    closing: "Just after midnight, the 12-hour clock reads 12 and the tag is a.m.",
    learned: "You learned: from 1300 hours take away 12, then tag a.m. or p.m.",
    traceback: "The half of the bar the marker sits in lights amber with its tag, the tile comes off the hours from 1300 hours on, and the 12-hour time is written with a.m. or p.m.",
    items: [
      /* learn DB4: answer in the plan = 10:45 p.m. */
      { qid: "M2.S3.T5.C23:DB4", kind: "to12", t: 1365, parts: HM, answer: [10, 45], half: "pm",
        say: "What is 2245 hours on the 12-hour clock?", ask: "2245 hours, 12-hour time?",
        miss: "2245 hours is after 1300 hours, so the tile comes off the hours.", win: "Yes, 22 minus 12 is 10, so 2245 hours is 10:45 p.m." },
      /* practice 4: answer in the plan = 5:35 p.m., because 17 - 12 = 5 */
      { qid: "M2.S3.T5.C23:4", kind: "to12", t: 1055, parts: HM, answer: [5, 35], half: "pm",
        say: "Now write 1735 hours as a 12-hour time.", ask: "1735 hours, 12-hour time?",
        miss: "Take 12 away from the hours, then keep the minutes.", win: "Yes, 17 minus 12 is 5, so 1735 hours is 5:35 p.m." },
      /* practice 8: answer in the plan = 12:05 a.m., because 0005 hours is in the hour just after midnight */
      { qid: "M2.S3.T5.C23:8", kind: "to12", t: 5, parts: HM, answer: [12, 5], half: "am",
        say: "And 0005 hours, on the 12-hour clock?", ask: "0005 hours, 12-hour time?",
        miss: "0005 hours is in the hour just after midnight.",
        ladder: ["The left half of the bar is a.m., and this is the hour after midnight.", "On a clock face, which number is at the top, where a new day starts?"], win: "Yes, just after midnight, 0005 hours is 12:05 a.m." },
    ],
  },
];

/* The numbers the working area needs (they go into the sidecar too). */
const MODEL = { dayMinutes: 1440, tileHours: 12, bar: "12 midnight to 12 midnight, a.m. half warm white, p.m. half rose" };

/* ── shared drawing helpers and the clock arithmetic of the PICTURE (judge and oracle use none of it) ──── */
const DBC_C = { blue: "#0072B2", green: "#009E73", amber: "#E69F00", violet: "#7B5CB8", rose: "#F6D2DC", warm: "#FFF8EC", grey: "#767676" };
/* the a.m. / p.m. the child has picked on the card (Work writes it each render; judge reads it for a typed answer) */
const DBC: any = { half: null, touched: 0, asked: {} };
/* user mode: the runtime's phase bar says which (data-mode "ai" for the teacher agent) */
const dbcUser = () => { const b = typeof document !== "undefined" ? document.querySelector("[data-zone=\"bar\"]") : null; return !b || b.getAttribute("data-mode") !== "ai"; };
/* every toolApi verb clears the board touch (the runtime sets window.toolApi once, after Work first mounts: wrap it lazily) */
const DBC_WRAPPED = new WeakSet();
const dbcWrapApi = () => {
  const ta: any = typeof window !== "undefined" ? (window as any).toolApi : null;
  if (!ta || DBC_WRAPPED.has(ta)) return;   /* no property of our own on the proxy: the tool-api row counts its keys */
  ["answer", "check"].forEach((v) => { const f = ta[v]; if (typeof f === "function") ta[v] = (...a: any[]) => { DBC.touched = 0; return f(...a); }; });
  DBC_WRAPPED.add(ta);
};
const dbcP2 = (v: number) => (v < 10 ? "0" : "") + v;
const dbc24 = (t: number) => dbcP2(Math.floor(t / 60)) + dbcP2(t % 60);
/* a.m. / p.m. carried in a value ("10|45|pm", [10, 45, "pm"], "10:45 p.m."), else null */
const dbcHalfOf = (v: any) => {
  const m = String(Array.isArray(v) ? v.join(" ") : v ?? "").toLowerCase().match(/(^|[^a-z])([ap])\.?m\b/);
  return m ? (m[2] === "a" ? "am" : "pm") : null;
};
/* a rough width in em (Poppins): digits 0.6, space 0.28, : and . 0.3, letters 0.56 */
const DBC_INK: any = {};
const dbcInk = (s: string, size: number) => {
  const key = size + "|" + s;
  if (DBC_INK[key]) return DBC_INK[key];
  let r: any = null;
  try {
    const cv = DBC.cv || (DBC.cv = document.createElement("canvas")), c = cv.getContext("2d");
    c.font = "700 " + size + "px " + FONT;
    const m = c.measureText(s);
    r = { w: m.width, l: m.actualBoundingBoxLeft, r: m.actualBoundingBoxRight, a: m.actualBoundingBoxAscent, d: m.actualBoundingBoxDescent };
    const fs: any = document.fonts;
    /* cache only once the bundled face itself is in the set and loaded (a direct mount renders before the font kit has landed, and
       check() is true for a face that is not in the set yet), and the set is idle; until then every render measures again */
    const kitIn = fs && fs.status === "loaded" && Array.from(fs as any).some((f: any) => /C4 Poppins/.test(f.family) && f.status === "loaded");
    if (kitIn && fs.check(c.font, s)) DBC_INK[key] = r;
    else if (fs && fs.load && !DBC.asked[c.font + s]) { DBC.asked[c.font + s] = 1; fs.load(c.font, s).then(() => DBC.fontKick && DBC.fontKick(), () => {}); }
  } catch (e) { /* no canvas: the estimate below */ }
  return r && r.w ? r : { w: dbcEm(s) * size, l: 0, r: dbcEm(s) * size, a: size * 0.75, d: size * 0.2 };
};
const dbcEm = (s: string) => Array.from(String(s)).reduce((a, ch) => a + (/[0-9]/.test(ch) ? 0.6 : ch === " " ? 0.28 : /[:.]/.test(ch) ? 0.3 : 0.56), 0);

function dbcMarkerArt(bh: number, col: string) {
  /* drawn round 0,0 (the bar's middle): a tactile knob pointer above the bar and a line through it */
  const cleanHex = col.replace('#', '').toUpperCase();
  const gradId = cleanHex === 'E69F00' ? 'dbc-grad-marker-E69F00' : 'dbc-grad-marker-0072B2';
  const darkCol = shade(col, 0.35);
  return (
    <g filter="url(#dbc-shadow)">
      <path d={`M ${-16} ${-bh / 2 - 18} L ${16} ${-bh / 2 - 18} L 0 ${-bh / 2 + 2} Z`} fill={`url(#${gradId})`} stroke={darkCol} strokeWidth={2} strokeLinejoin="round" />
      <path d={`M ${-10} ${-bh / 2 - 15} L ${10} ${-bh / 2 - 15} L 0 ${-bh / 2 - 3} Z`} fill="#FFFFFF" fillOpacity={0.35} />
      <rect x={-4} y={-bh / 2} width={8} height={bh} rx={4} fill={`url(#${gradId})`} stroke={darkCol} strokeWidth={1.5} />
      <rect x={-1.5} y={-bh / 2 + 4} width={3} height={bh - 8} rx={1.5} fill="#FFFFFF" fillOpacity={0.6} />
    </g>
  );
}

function dbcTileArt(w: number, h: number, label: string, size: number) {
  /* drawn round 0,0: toy-like rounded tile with top-light sheen & bevel shadow */
  return (
    <g filter="url(#dbc-shadow)">
      <rect x={-w / 2} y={-h / 2 + 5} width={w} height={h} rx={16} fill={shade(DBC_C.violet, 0.4)} />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={16} fill="url(#dbc-grad-tile)" stroke={shade(DBC_C.violet, 0.35)} strokeWidth={2} />
      <rect x={-w / 2 + 4} y={-h / 2 + 3} width={w - 8} height={Math.max(4, h / 2 - 4)} rx={12} fill="#FFFFFF" fillOpacity={0.2} />
      <text x={0} y={0} textAnchor="middle" dominantBaseline="central" fontSize={size} fontWeight={700} fill="#FFFFFF" style={{ textShadow: "0px 1.5px 2px rgba(0,0,0,0.3)" }}>{label}</text>
    </g>
  );
}

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* judge: a 24-hour time is a STRING judged with its leading zeros; a time after midnight is two boxes (numbers);
   a 12-hour time is two boxes AND the half (carried in the value, else the card the child picked) */
/* ponytail: the runtime reads item.miss when it shows the first rung, so a short entry swaps it here (the plan's line comes back
   on a four-digit miss); the static checks only ever judge four-digit keys, so they read the authored line */
const DBC_SHORT = "A 24-hour time has four digits: hold the empty places with zeros.";
const DBC_MISS: any = {};
const judge = (item: any, v: any) => {
  if (item.kind === "noon") {
    if (!(item.qid in DBC_MISS)) DBC_MISS[item.qid] = item.miss;
    const d = String(v ?? "").replace(/[^0-9]/g, "");
    item.miss = d.length >= 1 && d.length <= 3 ? DBC_SHORT : DBC_MISS[item.qid];
  }
  if (item.half) return judgeSlotParts(item, v) && (dbcHalfOf(v) || DBC.half) === item.half;
  if (item.parts) return judgeSlotParts(item, v);
  return String(v ?? "").replace(/\s*hours?\s*$/i, "").trim() === String(item.answer);
};
/* oracle: every answer read again from the question's own words by string arithmetic (no code shared with judge or Work) */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  const s = String(it.say);
  const four = s.match(/(\d\d)(\d\d) hours/), dur = s.match(/(\d+) h (\d+) min/), clock = s.match(/(\d+):(\d\d) ([ap])\.m\./);
  const two = (x: number) => ("0" + x).slice(-2);
  let want: any = null;
  if (it.kind === "after" && four) want = [Number(four[1]), Number(four[2])];
  else if (it.kind === "write24" && dur) want = two(Number(dur[1])) + two(Number(dur[2]));
  else if ((it.kind === "to24" || it.kind === "noon") && clock) want = two((Number(clock[1]) % 12) + (clock[3] === "p" ? 12 : 0)) + clock[2];
  else if (it.kind === "noon" && /12 midnight/.test(s)) want = "0000";
  else if (it.kind === "to12" && four) { const H = Number(four[1]); want = [H % 12 === 0 ? 12 : H % 12, Number(four[2]), H < 12 ? "a.m." : "p.m."]; }
  return want !== null && JSON.stringify(want) === JSON.stringify(agentKey(it));
}));
/* the misconception of each kind; judge must reject it */
const nearMiss = (item: any) => {
  const h = Math.floor(item.t / 60), m = item.t % 60;
  if (item.kind === "after") return [item.answer[1], item.answer[0]];                     /* the first two digits read as minutes */
  if (item.kind === "write24") return String(Number(item.answer));                        /* the zero in front left off: "640" */
  if (item.kind === "to24") return dbcP2(h - 12) + dbcP2(m + 12);                          /* 12 added to the minutes: "0632" */
  if (item.kind === "noon") return item.t === 0 ? "1200" : dbcP2(h + 12) + dbcP2(m);      /* 12 added in the 12 o'clock hour */
  if (item.t < 60) return [0, item.answer[1], "a.m."];                                     /* the hour just after midnight read as 0 */
  return [item.answer[0], item.answer[1], item.half === "pm" ? "a.m." : "p.m."];              /* the wrong half */
};
/* the forms of an answer that no question, hint or ladder line may print */
const answerForms = (item: any) => (item.kind === "after" ? [item.answer[0] + " h " + item.answer[1] + " min"]
  : item.half ? [item.answer[0] + ":" + dbcP2(item.answer[1])] : [String(item.answer)]);
/* the answer as the teacher agent gives it: a 24-hour time as its four-digit STRING, a 12-hour time with its half */
const agentKey = (item: any) => (item.half ? [item.answer[0], item.answer[1], item.half === "am" ? "a.m." : "p.m."] : item.answer);

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => (T.state().stage === "demo" ? HOOK.demo && HOOK.demo() : T.submit(agentKey(item)));
/* the agent's answer(): a 12-hour time sets the half from the value, then the runtime fills the two boxes */
const answer = (item: any, v: any) => {
  if (item.half) { const h = dbcHalfOf(v); if (h) { DBC.half = h; if (HOOK.half) HOOK.half(h); } }
  return undefined;
};
/* the agent's check() before Enter: it performs the question's act at once (undefined = press Enter) */
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area ────────────────────────────────────────────────────────────────────────
   keyOnly + bigPad: 1472 x 520 with the panel shut, 900 x 520 open. The picture is laid out in a 900-wide frame,
   centred in the room (so it is the same size open or shut), clear of box.key at every width. */
function Work({ phase, n, item, index, stage, wrong, typed, api, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();   /* the traceback */
  const tm = useTimeline();   /* the tile's shiver */
  const free = stage === "free";
  const warmOn = !free && (stage === "demo" || stage === "teach") && !!phase.warm;
  const it: any = free ? { kind: "free", t: 0 } : warmOn ? phase.warm : item || {};
  /* the board belongs to the ENTRY of a question (PATTERNS §18) */
  const qk = n + "." + (free ? "f" : warmOn ? "w" : index);
  const entry = useRef<any>({ qk: null, n: 0 });
  if (entry.current.qk !== qk) entry.current = { qk, n: entry.current.n + 1 };
  const ek = qk + "#" + entry.current.n;
  const fresh = () => ({ ek, slid: false, fly: null, tile: "home", half: null, read: false, touched: false, acted: false, nudged: false,
    glow: false, sk: 0, tf: 0, tb: 0, missHalf: null, ft: 600 });
  const [raw, setRaw] = useState<any>(fresh);
  const [, setFontsIn] = useState(0);
  DBC.fontKick = () => setFontsIn((v) => v + 1);
  useEffect(() => {
    const fs: any = document.fonts, kick = () => setFontsIn((v) => v + 1);
    try { fs.ready.then(kick); fs.addEventListener("loadingdone", kick); } catch (e) { /* no font API */ }
    return () => { try { fs.removeEventListener("loadingdone", kick); } catch (e) { /* none */ } };
  }, []);
  const S = raw.ek === ek ? raw : fresh();
  const put = (o: any) => setRaw((p: any) => ({ ...(p.ek === ek ? p : fresh()), ...o }));
  if (!free) DBC.half = S.half;
  const playing = useRef(false);

  /* geometry: a 900-wide frame */
  const FW = 900, ox = Math.max(0, (box.w - FW) / 2);
  const X0 = ox + 30, L = 840, BY = 252, BH = 78, MID = BY + BH / 2;
  const bx = (t: number) => X0 + (t / 1440) * L;
  const GC = { x: ox + 10, y: 8, w: 420, h: 182 }, AC = { x: ox + 450, y: 8, w: 440, h: 182 };
  const TH = { x: ox + 40, y: 430, w: 150, h: 80 };
  const SK = { x: ox + 330, y: 430, w: 240, h: 80 };
  const AMK = { x: ox + 584, y: 430, w: 140, h: 80 }, PMK = { x: ox + 740, y: 430, w: 140, h: 80 };
  const k = it.kind;

  /* free play: the marker is dragged (snap 5 min) or tapped (one hour on) */
  const drag = useDrag((pay: any, p: any, moved: boolean) => {
    if (stage !== "free") return;
    if (!moved || !isFinite(p.x)) { const now = Date.now(); if (now - (DBC.mTap || 0) < 400) return; DBC.mTap = now; put({ ft: (S.ft + 60) % 1440 }); api.sfx.tick(); return; }
    put({ ft: Math.max(0, Math.min(1435, Math.round((((p.x - X0) / L) * 1440) / 5) * 5)) });
    api.sfx.tick();
  });
  const dragT = free && drag.drag ? Math.max(0, Math.min(1435, Math.round((((drag.drag.x - X0) / L) * 1440) / 5) * 5)) : null;
  const t = free ? (dragT !== null ? dragT : S.ft) : it.t || 0;
  const hr = Math.floor(t / 60), mn = t % 60;
  const hasTile = !free && n >= 2;
  const hasHalf = !free && n === 4;
  const won = !free && !warmOn && (stage === "win" || stage === "idle");
  const fits = k === "to24" || (k === "to12" && hr >= 13);
  const warmDone = warmOn && (n === 4 ? S.half === "pm" : S.read);

  /* the Given card: the hour (what the tile acts on), then the rest */
  const h12 = (hr + 11) % 12 + 1;
  let gHour = "", gRest = "";
  if (k === "after" || k === "to12" || k === "free") { const s = dbc24(t); gHour = s.slice(0, 2); gRest = s.slice(2) + " " + tx("hours"); }
  else if (k === "write24") { gHour = String(hr); gRest = " " + tx(lang === "en" ? "h" : "hours") + " " + mn + " " + tx("min"); }
  else if (t === 0) { gHour = "12"; gRest = " " + tx("midnight"); }
  else if (t === 720) { gHour = "12"; gRest = " " + tx("noon"); }
  else { gHour = String(h12); gRest = ":" + dbcP2(mn) + " " + tx(hr < 12 ? "a.m." : "p.m."); }
  const pillLow = free && gHour[0] === "0";
  const gEm = dbcEm(gHour + gRest), GS = Math.max(36, Math.min(pillLow ? 48 : 56, (GC.w - 44) / gEm));
  const gx = GC.x + (GC.w - gEm * GS) / 2, hourCx = gx + (dbcEm(gHour) * GS) / 2, gBase = GC.y + (pillLow ? 108 : k === "to24" || (k === "to12" && hr >= 13) ? 114 : (k === "after" || k === "to12") && gHour[0] === "0" ? 126 : 120);
  const hInk = dbcInk(gHour, GS);
  const land = { x: Math.max(GC.x + 82, Math.min(GC.x + GC.w - 82, hourCx)), y: GC.y + 146 };   /* the tile chip: just under the hour digits, inside the card */
  const tagW = lang === "en" ? 110 : 146, tagF = T.label;
  const twelve = free ? (t === 0 ? "12 " + tx("midnight") : t === 720 ? "12 " + tx("noon") : h12 + ":" + dbcP2(mn) + " " + tx(hr < 12 ? "a.m." : "p.m.")) : "";

  /* the acts: each performed on screen through api.act; in a guide step reported with api.did */
  const finish = (name: string, o: any) => {
    if (stage === "demo") { put(o); api.did(name); return; }
    if (stage === "ask") { const was = S.nudged || DBC.nudgedEk === ek; DBC.nudgedEk = null; clearTimeout(DBC.nudgeT); put({ ...o, nudged: false }); if (was && item) api.say(item.say); return; }
    put(o);
  };
  const doSlide = () => {
    if (S.slid) { if (stage === "demo") api.did("slide"); return; }
    if (playing.current) return;
    playing.current = true; put({ fly: "marker" });
    api.act({ tool: "hand", moves: "push", from: { x: bx(0), y: MID }, at: [{ x: bx(t), y: MID }], hold: dbcMarkerArt(BH, DBC_C.amber) })
      .then((ok: boolean) => {
        playing.current = false;
        if (!ok) { put({ fly: null }); return; }
        api.sfx.settle(); finish("slide", { slid: true, fly: null, acted: true });
      });
  };
  const doMarker = () => {
    if (S.read) { if (stage === "demo") api.did("marker"); return; }
    if (playing.current) return;
    playing.current = true;
    api.act({ tool: "hand", moves: "tap", at: [{ x: bx(t), y: MID }] }).then((ok: boolean) => {
      playing.current = false;
      if (!ok) return;
      api.sfx.tick(); finish("marker", { read: true });
    });
  };
  const doTile = () => {
    if (S.tile !== "home") { if (stage === "demo") api.did("tile"); return; }
    if (playing.current) return;
    playing.current = true; put({ tile: "fly" });
    api.act({ tool: "hand", moves: "carry", from: { x: TH.x + TH.w / 2, y: TH.y + TH.h / 2 }, at: [land], hold: dbcTileArt(104, 36, tx("12 h"), T.micro) })
      .then((ok: boolean) => {
        playing.current = false;
        if (!ok) { put({ tile: "home" }); return; }
        if (fits) { api.sfx.tick(); finish("tile", { tile: "on", acted: true }); return; }
        /* it will not settle: it shivers and slides back, and the 12 o'clock hours glow */
        put({ tile: "shake", sk: -10, glow: true }); api.sfx.settle();
        tm.run([[90, () => put({ sk: 10 })], [180, () => put({ sk: -7 })], [270, () => put({ sk: 6 })], [360, () => put({ sk: 0, tile: "back", tf: 0.35 })],
          [450, () => put({ tf: 0.7 })], [540, () => put({ tile: "home", tf: 0 })], [900, () => put({ glow: false })]],
          () => finish("tile", { tile: "home", acted: true }));
      });
  };
  const tagAt = { x: AC.x + 331, y: AC.y + 124 };
  const doHalf = (h: string) => {
    if (playing.current) return;
    if (S.half === h) { if (stage === "demo") api.did(h); return; }
    const K = h === "am" ? AMK : PMK;
    playing.current = true;
    api.act({ tool: "hand", moves: "carry", from: { x: K.x + K.w / 2, y: K.y + K.h / 2 }, at: [tagAt],
      hold: <g><rect x={-tagW / 2} y={-30} width={tagW} height={60} rx={14} fill={tint(DBC_C.green, 0.8)} stroke={shade(DBC_C.green, 0.25)} strokeWidth={2.5} />
        <text x={0} y={0} textAnchor="middle" dominantBaseline="central" fontSize={tagF} fontWeight={700} fill={shade(DBC_C.green, 0.35)}>{tx(h === "am" ? "a.m." : "p.m.")}</text></g> })
      .then((ok: boolean) => {
        playing.current = false;
        if (!ok) return;
        api.sfx.tick(); DBC.half = h; finish(h, { half: h });
      });
  };
  const act = (on: any) => {
    if (on === "slide") doSlide();
    else if (on === "marker") doMarker();
    else if (on === "tile") doTile();
    else if (on === "am" || on === "pm") doHalf(on);
  };
  /* the child's own tap: a wrong control during a step shows its hint; at a question it counts as touching the board */
  /* a question just opened holds the child's act taps and the act nudge for 1200 ms: the second press of a double tap or a held key on
     the last guide step (or on the Next key) lands on the new question and must not act on it or nudge it (toolApi and the dev driver
     never come through here) */
  if (stage === "ask" && DBC.askEk !== ek) { DBC.askEk = ek; DBC.askAt = Date.now(); }
  const held = () => stage === "ask" && Date.now() - (DBC.askAt || 0) < 1200;   /* not 900: under reduced motion the question opens as the last step's act ends, so a tap 1.1 s later still reaches it */
  DBC.held = held;
  const tap = (name: string) => {
    if (held()) return;
    if (stage === "demo" || stage === "ask") DBC.touched = n;   /* a real tap on the board (never onEnter, HOOK.demo or HOOK.check) */
    if (stage === "demo") { if (name !== stepOn) { api.did(name); return; } act(name); return; }
    if (stage === "ask") { if (S.tb === 1 || S.tb === 2) return; if (!S.touched) put({ touched: true }); act(name); }
  };

  /* the answer gated by the act (PATTERNS §19): only after a real tap on the board, in the question it belongs to */
  const needAct = stage === "ask" && !!item && (!S.acted || (!!item.half && !S.half));
  /* touched: a real tap on this question, or on this phase's guide steps (PATTERNS §19) */
  const gate = needAct && (S.touched || DBC.touched === n);
  useEffect(() => {
    if (!gate || !dbcUser()) return;   /* user mode only: the teacher agent (AI mode) is never locked out */
    DBC.gated = true; api.lock(true);
    return () => { DBC.gated = false; api.lock(false); };
  }, [gate, ek]);
  /* a REAL Enter (a trusted keydown) is remembered, so a guide step done by Enter counts as touching the board; the agent's answer() and
     check() clear the touch (next/gotoStep keep it, so a gated question re-locks on an ask-to-ask jump) */
  useEffect(() => {
    const kd = (e: any) => {
      if (!e.isTrusted || e.repeat) return;
      if (e.key === "Enter") DBC.enterAt = Date.now();
      if (DBC.gated && !(DBC.held && DBC.held()) && (e.key === "Enter" || /^[0-9]$/.test(e.key))) DBC.nudge && DBC.nudge();
      if ((e.key === "Enter" || e.key === " ") && e.target && e.target.closest && e.target.closest("[data-control=again]")) setTimeout(() => DBC.sayQ && DBC.sayQ(), 40);
    };
    const pd = (e: any) => { const el = e.target && e.target.closest ? e.target.closest("[data-zone=ask], [data-control^=key-]") : null; if (DBC.gated && el && e.isTrusted && !(DBC.held && DBC.held())) DBC.nudge && DBC.nudge(); };
    /* the Hint key after a nudge shows the QUESTION again (the runtime would repeat the nudge) */
    const ck = (e: any) => { if (e.isTrusted && e.target && e.target.closest && e.target.closest("[data-control=again]")) setTimeout(() => DBC.sayQ && DBC.sayQ(), 40); };
    window.addEventListener("click", ck, true);
    window.addEventListener("keydown", kd, true); window.addEventListener("pointerdown", pd, true);
    const t = setTimeout(dbcWrapApi, 0);
    return () => { clearTimeout(t); clearTimeout(DBC.nudgeT); window.removeEventListener("keydown", kd, true); window.removeEventListener("pointerdown", pd, true); window.removeEventListener("click", ck, true); };
  }, []);
  dbcWrapApi();
  /* 6: the act nudge on a locked question (the next act brings the question back) */
  DBC.sayQ = () => {
    if (!item || DBC.nudgedEk !== ek) return;
    DBC.nudgedEk = null; clearTimeout(DBC.nudgeT); put({ nudged: false }); api.say(item.say);
  };
  DBC.nudge = () => {
    if (!item) return;
    put({ nudged: true }); DBC.nudgedEk = ek;
    const line = n === 1 ? "Tap Slide first." : n === 4 && S.acted ? "First tap the tag for the half of the day." : n === 4 ? "Tap the tile, then the half of the day." : "Tap the 12 h tile first.";
    if (n === 1) api.say("Tap Slide first.");
    else if (n === 4 && S.acted) api.say("First tap the tag for the half of the day.");
    else if (n === 4) api.say("Tap the tile, then the half of the day.");
    else api.say("Tap the 12 h tile first.");
    clearTimeout(DBC.nudgeT);
    DBC.nudgeT = setTimeout(() => DBC.sayQ && DBC.sayQ(), Math.max(2600, 68 * line.length));
  };

  /* Enter: in a step it performs the step; at a 12-hour question it is judged only once the half is picked */
  api.onEnter(stage === "demo" && stepOn ? () => { if (Date.now() - (DBC.enterAt || 0) < 400 && dbcUser()) DBC.touched = n; act(stepOn); }
    : stage === "ask" && item && item.half ? (v: any) => {
      if (DBC.half) { api.submit(v); return; }
      put({ nudged: true }); api.say("First tap the tag for the half of the day.");
    } : null);
  HOOK.demo = () => (stepOn ? act(stepOn) : undefined);
  HOOK.half = (h: string) => put({ half: h });
  HOOK.check = needAct ? () => {
    put(k === "after" || k === "write24" ? { slid: true, acted: true } : { tile: fits ? "on" : "home", acted: true });
    return undefined;
  } : null;

  /* the traceback: lock, redraw the maths in steps, end on the whole right answer, unlock */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    put({ tb: 0, missHalf: dbcHalfOf(wrong.value) || DBC.half, ...(k === "after" || k === "write24" ? { slid: true, acted: true } : {}) });
    tl.run([[350, () => put({ tb: 1 })], [1250, () => put({ tb: 2 })], [2150, () => put({ tb: 3 })]], () => api.lock(false));
  }, [wrong]);
  useEffect(() => () => { tl.stop(); tm.stop(); }, [ek]);

  /* the win line (one sentence; at a phase's last question the runtime shows the closing instead) */
  useEffect(() => { if (stage === "win" && item && item.win) api.say(item.win); }, [stage, index]);

  /* what the host and the agent read back (toolApi.getState) */
  const typedStr = String(typed ?? "");
  useEffect(() => { if (stage === "ask" && item && typeof item.answer === "string" && typedStr.length > 4) api.setTyped(typedStr.slice(0, 4)); }, [typedStr]);
  api.share({ phase: n, marker: dbc24(t), given_clock: k === "to12" || k === "after" || k === "free" ? "24-hour" : k === "write24" ? "after midnight" : "12-hour",
    tile: S.tile, half: S.half, digits: won ? null : typedStr, answer_ready: !needAct, complete: stage === "idle" });

  /* ── the Answer card: what it shows ── */
  const showFix = stage === "ask" && !!wrong && S.tb >= 1 && typedStr === "";
  const hlHour = showFix && (k === "after" || k === "to24");
  const hlPad = k === "after" ? 9.5 : 5.5;
  const gY = gBase + (hlHour && k !== "after" ? 2 : 0);   /* p2 correction: 4 of air between the Given chip and the box; the + 12 tile on the hour moves down with it */   /* p2: 4 of air above and below the ink, so the box clears the Given chip and the + 12 tile */   /* the amber box round the hour ink in a correction */
  const ansOf = (x: any): string[] => {
    const h = Math.floor(x.t / 60), m = x.t % 60;
    if (x.kind === "after") return [String(h), String(m)];
    if (x.kind === "to12") return [String((h + 11) % 12 + 1), dbcP2(m), h < 12 ? "am" : "pm"];
    return dbc24(x.t).split("");
  };
  const ink = C.ink, gInk = shade(DBC_C.green, 0.3), bInk = shade(DBC_C.blue, 0.25);
  let shown: string[] = [], shownInk = ink;
  if (!free) {
    if (won || warmDone) { shown = ansOf(it); shownInk = gInk; }
    else if (showFix && S.tb >= 2) { const a = ansOf(it); shown = S.tb >= 3 ? a : k === "after" || k === "to12" ? [a[0], "", ""] : [a[0], a[1], "", ""]; }
    else if (k === "after" || k === "to12") { const ps = slotPartsOf(typedStr, 2); shown = [ps[0], ps[1], S.half || ""]; }
    else shown = typedStr.split("");
  }
  const lead = (v: string[]) => (v[0] === "0" ? (v[1] === "0" ? 2 : 1) : 0);
  const cellsAt = (vals: string[], x: number, cw: number, col: string, greys: number) => vals.map((v, j) => (
    <g key={"c" + j}>
      <rect x={x + j * (cw + 8)} y={AC.y + 82} width={cw} height={84} rx={14} fill="#F8FAF9" stroke={C.ink} strokeWidth={2.5} />
      <rect x={x + j * (cw + 8) + 3} y={AC.y + 85} width={cw - 6} height={12} rx={6} fill="#FFFFFF" fillOpacity={0.8} />
      {v ? <text x={x + j * (cw + 8) + cw / 2} y={AC.y + 124} textAnchor="middle" dominantBaseline="central" fontSize={T.xl} fontWeight={700} fill={j < greys ? DBC_C.grey : col}>{v}</text> : null}
    </g>));
  const answerBody = () => {
    if (free) return <text x={AC.x + AC.w / 2} y={AC.y + 126} textAnchor="middle" dominantBaseline="central" fontSize={Math.max(T.micro, Math.min(56, (AC.w - 40) / dbcEm(twelve)))} fontWeight={700} fill={gInk}>{twelve}</text>;
    if (k === "after") {
      const x = AC.x + 67;
      return (
        <g>
          {cellsAt([shown[0] || ""], x, 86, shownInk, 0)}
          <text x={x + 98} y={AC.y + 124} dominantBaseline="central" fontSize={T.label} fontWeight={700} fill={ink}>{tx("h")}</text>
          {cellsAt([shown[1] || ""], x + 140, 86, shownInk, 0)}
          <text x={x + 238} y={AC.y + 124} dominantBaseline="central" fontSize={T.label} fontWeight={700} fill={ink}>{tx("min")}</text>
        </g>
      );
    }
    if (k === "to12") {
      const x = AC.x + 27, hf = shown[2];
      return (
        <g>
          {cellsAt([shown[0] || ""], x, 86, shownInk, 0)}
          <text x={x + 106} y={AC.y + 124} textAnchor="middle" dominantBaseline="central" fontSize={T.xl} fontWeight={700} fill={ink}>:</text>
          {cellsAt([shown[1] || ""], x + 126, 86, shownInk, lead([shown[1] || ""]) ? 0 : 0)}
          <rect x={tagAt.x - tagW / 2} y={tagAt.y - 30} width={tagW} height={60} rx={14} fill={hf ? tint(DBC_C.green, 0.8) : "#FFFFFF"}
            stroke={hf ? shade(DBC_C.green, 0.25) : C.dim} strokeWidth={2.5} strokeDasharray={hf ? undefined : "8 7"} />
          {hf ? <text x={tagAt.x} y={tagAt.y} textAnchor="middle" dominantBaseline="central" fontSize={tagF} fontWeight={700} fill={won || warmDone ? gInk : shade(DBC_C.green, 0.35)}>{tx(hf === "am" ? "a.m." : "p.m.")}</text> : null}
        </g>
      );
    }
    const nC = Math.max(4, shown.length), cw = Math.min(60, (AC.w - 140 - (nC - 1) * 8) / nC);
    const tot = nC * cw + (nC - 1) * 8 + 14 + dbcEm(tx("hours")) * T.label, x = AC.x + (AC.w - tot) / 2;
    const vals = Array.from({ length: nC }, (_, j) => shown[j] || "");
    return (
      <g>
        {cellsAt(vals, x, cw, shownInk, lead(vals))}
        {lead(vals) ? <DbcPill right={AC.x + AC.w - 14} y={AC.y + 10} h={52} label={tx("Place holder")} mid={AC.y + 72} to={{ x: x + cw / 2, y: AC.y + 78 }} /> : null}
        <text x={x + nC * cw + (nC - 1) * 8 + 14} y={AC.y + 124} dominantBaseline="central" fontSize={T.label} fontWeight={700} fill={ink}>{tx("hours")}</text>
      </g>
    );
  };
  /* the caption the correction sets in the Answer card's top right (at most 4 words) */
  const fixCaption = !showFix ? "" : k === "after" ? "hours, then minutes" : k === "write24" ? "" : k === "to24" ? "hour plus 12"
    : k === "noon" ? (t === 0 ? "at midnight" : t < 60 ? "just after midnight" : "just after noon") : hr < 12 ? (hr === 0 ? "after midnight, so a.m." : "before noon, so a.m.") : "after noon, so p.m.";

  const chip = (x: number, y: number, label: string, col: string) => <DbcChip x={x} y={y} label={label} col={col} />;
  const markerX = k === "after" || k === "write24" ? (S.slid || won || (showFix && S.tb >= 1) ? bx(t) : bx(0)) : bx(t);
  const markerCol = free && drag.drag ? DBC_C.amber : DBC_C.blue;
  const span = (k === "after" || k === "write24") && (S.slid || won || (showFix && S.tb >= 1));
  const lit12 = n === 3 && !free;
  const tileDrawn = hasTile && !(S.tile === "on" && stage !== "ask" && !warmOn && !won);
  /* where the tile is drawn: home, landed on the hour (a chip), shaking there, or sliding back */
  const tilePos = S.tile === "shake" ? { x: land.x + S.sk, y: land.y } : S.tile === "back" ? { x: land.x + (TH.x + TH.w / 2 - land.x) * S.tf, y: land.y + (TH.y + TH.h / 2 - land.y) * S.tf } : null;
  const invite = free ? { x: markerX, y: MID - 8, w: 40, h: BH + 4 }
    : stage === "demo" && stepOn === "slide" && !S.slid ? { x: SK.x + SK.w / 2, y: SK.y + SK.h / 2, w: SK.w, h: SK.h }
    : stage === "demo" && stepOn === "marker" ? { x: markerX, y: MID - 8, w: 56, h: BH + 34 }
    : stage === "demo" && stepOn === "tile" && S.tile === "home" ? { x: TH.x + TH.w / 2, y: TH.y + TH.h / 2, w: TH.w, h: TH.h }
    : stage === "demo" && stepOn === "pm" ? { x: PMK.x + PMK.w / 2, y: PMK.y + PMK.h / 2, w: PMK.w, h: PMK.h }
    : stage === "ask" && !S.acted && !wrong ? (n === 1 ? { x: SK.x + SK.w / 2, y: SK.y + SK.h / 2, w: SK.w, h: SK.h } : { x: TH.x + TH.w / 2, y: TH.y + TH.h / 2, w: TH.w, h: TH.h })
    : stage === "ask" && item && item.half && !S.half ? { x: (AMK.x + PMK.x + PMK.w) / 2, y: AMK.y + AMK.h / 2, w: PMK.x + PMK.w - AMK.x, h: AMK.h }
    : null;
  /* a half tag sits on a paper pill at the first place clear of the marker and of a lit 12 o'clock band; drawn over the marker */
  /* a half tag on a paper pill, inside its own half (never across noon or over a lit 12 o'clock band), at its usual place unless
     that is within reach of the marker's ring (the pill's half width + 14 + 32), then at the end of its half farthest from the marker */
  const halfTag = (label: string, at: number[], col: string, pm: boolean) => {
    const m = dbcInk(label, T.label), w = m.w + 28, h = 54;
    const lo = (pm ? bx(lit12 ? 780 : 720) : lit12 ? bx(60) : X0) + w / 2 + 12, hi = (pm ? X0 + L : bx(720)) - w / 2 - 12;
    const need = w / 2 + 14 + 32, d = Math.max(lo, Math.min(hi, bx(at[0])));
    const cx = Math.abs(d - markerX) > need ? d : Math.abs(lo - markerX) >= Math.abs(hi - markerX) ? lo : hi;
    return (
      <g pointerEvents="none">
        <rect x={cx - w / 2} y={BY + 6} width={w} height={h} rx={h / 2} fill="#FFFDF7" fillOpacity={0.92} stroke={col} strokeOpacity={0.35} strokeWidth={1.5} />
        <text x={cx} y={BY + 6 + h / 2 + (m.a - m.d) / 2} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={col}>{label}</text>
      </g>
    );
  };
  const tickLabels = ["12", "3", "6", "9", "12", "3", "6", "9", "12"];
  /* while a question is open no bar label stands on the ANSWER's own hour tick (restored at the win); in phase 3 the 0000 and
     1200 labels stay hidden until the win (0000 and 1250 are its answers) */
  const open = stage === "ask" && !free && !won && !!item;
  const hA = open && typeof item.answer === "string" ? Number(item.answer.slice(0, 2)) : null;
  const hideTop = (i: number) => (n === 3 && open && i % 2 === 0) || (hA !== null && (i * 360 === hA * 60 || (hA === 0 && i === 4)));
  const hideLow = (i: number) => open && k === "to12" && (i * 180 === hr * 60 || (hr === 0 && i === 8));

  return (
    <g>
      <defs>
        <filter id="dbc-shadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx={0} dy={4} stdDeviation={4} floodColor="#000000" floodOpacity={0.14} />
        </filter>
        <clipPath id="dbcBar"><rect x={X0} y={BY} width={L} height={BH} rx={16} /></clipPath>
        <linearGradient id="dbc-grad-given" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={tint(DBC_C.blue, 0.95)} />
          <stop offset="100%" stopColor={tint(DBC_C.blue, 0.88)} />
        </linearGradient>
        <linearGradient id="dbc-grad-ans-won" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={tint(DBC_C.green, 0.94)} />
          <stop offset="100%" stopColor={tint(DBC_C.green, 0.84)} />
        </linearGradient>
        <linearGradient id="dbc-grad-am" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFBF2" />
          <stop offset="100%" stopColor="#FFEACC" />
        </linearGradient>
        <linearGradient id="dbc-grad-pm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF0F3" />
          <stop offset="100%" stopColor="#F8CBD6" />
        </linearGradient>
        <linearGradient id="dbc-grad-tile" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9275CE" />
          <stop offset="100%" stopColor="#6C4CB0" />
        </linearGradient>
        <linearGradient id="dbc-grad-marker-0072B2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2995D9" />
          <stop offset="100%" stopColor="#005B92" />
        </linearGradient>
        <linearGradient id="dbc-grad-marker-E69F00" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFB733" />
          <stop offset="100%" stopColor="#C78200" />
        </linearGradient>
      </defs>

      {/* the Given card (deep blue) */}
      <g filter="url(#dbc-shadow)">
        <rect x={GC.x} y={GC.y} width={GC.w} height={GC.h} rx={RAD.card} fill="url(#dbc-grad-given)" stroke={tint(DBC_C.blue, 0.3)} strokeWidth={3} />
        <rect x={GC.x + 4} y={GC.y + 4} width={GC.w - 8} height={16} rx={12} fill="#FFFFFF" fillOpacity={0.4} />
      </g>
      {chip(GC.x + 16, GC.y + 10, tx(free ? "24-hour" : "Given"), DBC_C.blue)}
      {hlHour ? <rect x={gx - hInk.l - 9.5} y={gY - hInk.a - hlPad} width={hInk.l + hInk.r + 19} height={hInk.a + hInk.d + 2 * hlPad} rx={10}
        fill={DBC_C.amber} fillOpacity={0.3} stroke={DBC_C.amber} strokeWidth={3} pointerEvents="none" /> : null}
      {(k === "after" || k === "to12" || k === "free") && gHour[0] === "0" ? <DbcPill right={GC.x + GC.w - 14} y={pillLow ? GC.y + 124 : GC.y + 10} h={pillLow ? 44 : 52} label={tx("Place holder")} up={pillLow} cornerMax={gx + dbcInk(gHour + gRest.slice(0, 3), GS).w - dbcInk(gRest.slice(3), GS).l - 9}
        mid={GC.y + 72} /* no leader while the correction's amber box marks the hour: there is no room between the chip row and the box */ to={hlHour ? null : pillLow ? { x: gx + GS * 0.3, y: gBase + 6 } : { x: gx + GS * 0.3, y: Math.max(GC.y + 72, gBase - hInk.a - 6) }} /> : null}
      <text x={gx} y={gY} fontSize={GS} fontWeight={700} fill={bInk}>
        {(k === "after" || k === "to12" || k === "free") && gHour[0] === "0"
          ? <tspan><tspan fill={DBC_C.grey}>{gHour[0]}</tspan><tspan fill={gHour[1] === "0" ? DBC_C.grey : bInk}>{gHour[1]}</tspan></tspan>
          : <tspan>{gHour}</tspan>}
        <tspan dx={hlHour ? (k === "after" ? 14 : Math.max(0, Math.round(hInk.r + 12.5 - hInk.w))) : 0}>{gRest}</tspan>
      </text>

      {/* the Answer card (green at the win) */}
      <g filter="url(#dbc-shadow)">
        <rect x={AC.x} y={AC.y} width={AC.w} height={AC.h} rx={RAD.card} fill={won || warmDone || free ? "url(#dbc-grad-ans-won)" : "#FFFFFF"} stroke={tint(DBC_C.green, 0.25)} strokeWidth={3} />
        <rect x={AC.x + 4} y={AC.y + 4} width={AC.w - 8} height={16} rx={12} fill="#FFFFFF" fillOpacity={0.5} />
      </g>
      {chip(AC.x + 16, AC.y + 10, tx(free ? "12-hour" : "Answer"), DBC_C.green)}
      <g pointerEvents="none">{answerBody()}</g>
      {fixCaption ? <g pointerEvents="none">
        <rect x={ox + 405 - (dbcEm(tx(fixCaption)) * T.micro) / 2 - 16} y={430} width={dbcEm(tx(fixCaption)) * T.micro + 32} height={58} rx={16} fill="#FFFFFF" stroke={k === "write24" ? DBC_C.grey : DBC_C.amber} strokeWidth={3} />
        <text x={ox + 405} y={469} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={k === "write24" ? DBC_C.grey : shade(DBC_C.amber, 0.5)}>{tx(fixCaption)}</text>
      </g> : null}

      {/* the day bar */}
      <g filter="url(#dbc-shadow)">
        <g clipPath="url(#dbcBar)">
          <rect x={X0} y={BY} width={L / 2} height={BH} fill="url(#dbc-grad-am)" />
          <rect x={X0 + L / 2} y={BY} width={L / 2} height={BH} fill="url(#dbc-grad-pm)" />
          <line x1={X0 + L / 2} y1={BY} x2={X0 + L / 2} y2={BY + BH} stroke={shade(DBC_C.amber, 0.3)} strokeWidth={2} strokeDasharray="4 4" />
          {lit12 ? [0, 720].map((a) => <rect key={a} x={bx(a)} y={BY} width={L / 24} height={BH} fill={DBC_C.amber} fillOpacity={S.glow || (showFix && ((a === 0 && t < 60) || (a === 720 && t >= 720) || t === 0)) ? 0.85 : 0.45} />) : null}
          {span ? <rect x={X0} y={BY} width={markerX - X0} height={BH} fill={DBC_C.amber} fillOpacity={0.35} /> : null}
          {showFix && k === "to12" ? <rect x={hr < 12 ? X0 : X0 + L / 2} y={BY} width={hr === 0 ? L / 24 : L / 2} height={BH} fill={DBC_C.amber} fillOpacity={0.5} /> : null}
          <rect x={X0} y={BY} width={L} height={6} fill="#FFFFFF" fillOpacity={0.4} />
        </g>
        <rect x={X0} y={BY} width={L} height={BH} rx={16} fill="none" stroke={C.ink} strokeWidth={3} />
      </g>
      {Array.from({ length: 25 }, (_, i) => (
        <line key={"t" + i} x1={bx(i * 60)} y1={BY + BH - (i % 3 === 0 ? 14 : 10)} x2={bx(i * 60)} y2={BY + BH} stroke={C.ink} strokeWidth={i % 3 === 0 ? 3 : 1.6} />
      ))}
      {/* 24-hour times above, 12-hour times below */}
      {Array.from({ length: 5 }, (_, i) => hideTop(i) ? null : (
        <text key={"a" + i} x={bx(i * 360)} y={BY - 30} textAnchor={i === 0 ? "start" : i === 4 ? "end" : "middle"} fontSize={T.label} fontWeight={700} fill={C.ink}>{dbc24((i * 360) % 1440)}</text>
      ))}
      {tickLabels.map((s, i) => hideLow(i) ? null : (
        <text key={"b" + i} x={bx(i * 180)} y={BY + BH + 32} textAnchor={i === 0 ? "start" : i === 8 ? "end" : "middle"} fontSize={T.label} fontWeight={700} fill={C.ink}>{s}</text>
      ))}
      <text x={X0} y={BY + BH + 76} fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("midnight")}</text>
      <text x={bx(720)} y={BY + BH + 76} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("noon")}</text>
      <text x={X0 + L} y={BY + BH + 76} textAnchor="end" fontSize={T.label} fontWeight={700} fill={C.ink}>{tx("midnight")}</text>

      {/* the marker */}
      {S.fly === "marker" ? null : <g transform={`translate(${markerX},${MID})`} pointerEvents="none">{dbcMarkerArt(BH, markerCol)}</g>}
      {halfTag(tx("a.m."), [300, 150, 480, 600], shade(DBC_C.amber, 0.4), false)}
      {halfTag(tx("p.m."), [1020, 1230, 1110, 900], shade(DBC_C.rose, 0.5), true)}
      {free ? (
        <g {...control("marker", tx("Marker"))} {...drag.bind("marker")} onKeyDown={(e: any) => {
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); e.stopPropagation(); const d = (e.shiftKey ? 60 : 5) * (e.key === "ArrowRight" ? 1 : -1); put({ ft: (S.ft + d + 1440) % 1440 }); api.sfx.tick(); return; }
          drag.keys("marker").onKeyDown(e);
        }}>
          <rect x={markerX - 36} y={BY - 24} width={72} height={BH + 30} fill="transparent" />
        </g>
      ) : stage === "demo" && (n !== 1 || S.slid) ? <Hit id="marker" x={markerX - 36} y={BY - 24} w={72} h={BH + 30} label={tx("Marker")} onPress={() => tap("marker")} /> : null}

      {/* the Slide key (phase 1), until the marker has slid */}
      {n === 1 && !free && !S.slid && S.fly !== "marker" && (stage === "demo" || stage === "ask") && !won ? (
        <Key id="slide" x={SK.x} y={SK.y} w={SK.w} h={SK.h} C={C} tone="key" label={tx("Slide")} onClick={() => tap("slide")}>
          <text y={12} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={toneInk("key", C.ink)}>{tx("Slide")}</text>
        </Key>
      ) : null}

      {/* the 12 h tile */}
      {hasTile && S.tile === "on" ? (
        <g pointerEvents="none" transform={`translate(${land.x},${land.y + gY - gBase})`}>{dbcTileArt(104, 36, n === 4 ? "− 12" : "+ 12", T.micro)}</g>
      ) : null}
      {hasTile && tilePos ? <g pointerEvents="none" transform={`translate(${tilePos.x},${tilePos.y})`}>{dbcTileArt(104, 36, tx("12 h"), T.micro)}</g> : null}
      {hasTile && S.tile === "home" && tileDrawn ? (
        <g>
          <g pointerEvents="none" transform={`translate(${TH.x + TH.w / 2},${TH.y + TH.h / 2})`}>{dbcTileArt(TH.w, TH.h, tx("12 h"), 40)}</g>
          {(stage === "demo" || stage === "ask") && !won ? (
            <g onPointerDown={(e: any) => { const x0 = e.clientX, y0 = e.clientY; const up = (u: any) => { window.removeEventListener("pointerup", up, true); if (Math.hypot(u.clientX - x0, u.clientY - y0) > 12) tap("tile"); }; window.addEventListener("pointerup", up, true); }}>
              <Hit id="tile" x={TH.x} y={TH.y} w={TH.w} h={TH.h} label={tx("12 h tile")} onPress={() => tap("tile")} />
            </g>) : null}
        </g>
      ) : null}
      {/* the correction's own tile, on the hour of a p.m. time (or lifted off the hours from 1300 on) */}
      {showFix && S.tile !== "on" && ((k === "to24") || (k === "to12" && hr >= 13)) ? (
        <g pointerEvents="none" transform={`translate(${land.x},${land.y + gY - gBase})`}>{dbcTileArt(104, 36, k === "to12" ? "− 12" : "+ 12", T.micro)}</g>
      ) : null}

      {/* the a.m. / p.m. card (phase 4) */}
      {hasHalf && (stage === "demo" || stage === "ask") && !won ? (["am", "pm"] as string[]).map((h) => {
        const K = h === "am" ? AMK : PMK;
        return (
          <g key={h}>
            <Key id={h} x={K.x} y={K.y} w={K.w} h={K.h} C={C} tone="key" label={tx(h === "am" ? "a.m." : "p.m.")} onClick={() => tap(h)}>
              <text y={10} textAnchor="middle" fontSize={tagF} fontWeight={700} fill={toneInk("key", C.ink)}>{tx(h === "am" ? "a.m." : "p.m.")}</text>
            </Key>
            {S.half === h ? <rect x={K.x - 6} y={K.y - 6} width={K.w + 12} height={K.h + 12} rx={RAD.key + 6} fill="none" stroke={shade(DBC_C.green, 0.2)} strokeWidth={5} pointerEvents="none" /> : null}
          </g>
        );
      }) : null}

      {invite ? <Invite x={invite.x} y={invite.y} w={invite.w} h={invite.h} C={C} /> : null}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase */
/* a grey "Place holder" pill at T.label, its width measured from its own text, right-aligned, with a dashed leader to the zero */
/* a card chip at T.label, as wide as its own measured text */
function DbcChip({ x, y, label, col }: any) {
  const m = dbcInk(label, T.label), w = m.w + 32, h = 52;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={tint(col, 0.86)} stroke={shade(col, 0.2)} strokeWidth={2} />
      <text x={x + w / 2} y={y + h / 2 + (m.a - m.d) / 2} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(col, 0.35)}>{label}</text>
    </g>
  );
}

function DbcPill({ right, y, label, to, up = false, h = 44, mid, cornerMax }: any) {
  const m = dbcInk(label, T.label), w = m.w + 28, x = right - w;
  /* the leader leaves the pill straight down at cx (its first corner), moved left when a glyph mark stands just right of it, starting on the
     pill's rounded end when cx is under it, or from the pill's left end when it is past it */
  const r = h / 2, cx = Math.min(x + 14, cornerMax === undefined ? Infinity : cornerMax);
  const start = cx >= x + r ? `M ${cx} ${y + h}` : cx >= x ? `M ${cx} ${y + r + Math.sqrt(Math.max(0, r * r - (x + r - cx) * (x + r - cx)))}` : `M ${x} ${y + r} H ${cx}`;
  return (
    <g pointerEvents="none">
      {to ? <path d={up || mid === undefined ? `M ${x + 14} ${up ? y : y + h} L ${to.x} ${to.y}` : `${start} V ${mid} H ${to.x} V ${to.y}`} fill="none" stroke={DBC_C.grey} strokeWidth={2.5} strokeDasharray="5 4" /> : null}
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill="#FFFFFF" stroke={DBC_C.grey} strokeWidth={2} />
      <text x={x + w / 2} y={y + h / 2 + (m.a - m.d) / 2} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={shade(DBC_C.grey, 0.15)}>{label}</text>
    </g>
  );
}

function Thumb({ result, it, C, w, h, lang = "en", tx: tr = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last) return null;
  const tx = tr;
  const item = it || last.it || {};
  const a = item.answer;
  const text = item.kind === "after" ? a[0] + " " + tx("h") + " " + a[1] + " " + tx("min")
    : item.half ? a[0] + ":" + dbcP2(a[1]) + " " + tx(item.half === "am" ? "a.m." : "p.m.")
    : a !== undefined && a !== null ? String(a) + " " + tx("hours") : "";
  const size = Math.max(T.micro, Math.min(T.label, (w - 40) / Math.max(1, dbcEm(text))));
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(DBC_C.green, 0.88)} stroke={tint(DBC_C.green, 0.3)} strokeWidth={1.5} />
      <rect x={12} y={h - 16} width={(w - 24) / 2} height={8} rx={4} fill={DBC_C.warm} stroke={C.ink} strokeWidth={1} />
      <rect x={12 + (w - 24) / 2} y={h - 16} width={(w - 24) / 2} height={8} rx={4} fill={DBC_C.rose} stroke={C.ink} strokeWidth={1} />
      {typeof item.t === "number" ? <g transform={`translate(${12 + ((w - 24) * item.t) / 1440},${h - 12})`}>
        <path d="M -7 -14 L 7 -14 L 0 -4 Z" fill={DBC_C.blue} /><rect x={-2} y={-6} width={4} height={12} rx={2} fill={DBC_C.blue} /></g> : null}
      <text x={w / 2} y={h / 2 + 2} textAnchor="middle" fontSize={size} fontWeight={700} fill={shade(DBC_C.green, 0.3)}>{text}</text>
    </g>
  );
}

function DayBarClocks(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout (LAYOUT.md §1b) */
      board: true,
      /* KEY ONLY (the new look; LAYOUT.md §1d, PATTERNS.md §16) */
      keyOnly: true,
      /* the wide keypad: the picture is a 900-wide frame, so it fits x 64 to 964 */
      bigPad: true,
      /* the Next key (PATTERNS.md 9d): nothing moves on by itself */
      nextKey: true,
      /* NAV DOTS (the new look; LAYOUT.md §1d) */
      navDots: true,
      /* the start page */
      StartArt, START_HOOK,
      }} />
  );
}

export default DayBarClocks;