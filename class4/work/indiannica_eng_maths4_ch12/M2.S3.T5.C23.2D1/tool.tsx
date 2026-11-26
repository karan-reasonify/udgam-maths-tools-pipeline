/* ═══ M2.S3.T5.C23.2D1 · timeline_board · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ mascot) is prepended at build: header, canvas, key corner, drawer + pad, bubble + Kiko, nav dots,
   window.toolApi, sounds, scoring, events, idle and restart. THE LESSON IS SILENT (r30); the bubble is the guide. The new
   look (keyOnly, navDots, nextKey; LAYOUT §1d-§1e, PATTERNS §15-§16): the question lives only in the bubble.
   One day on one line: a timeline from midnight to midnight, a marker the hand slides, a 12-hour readout and four places for
   the 24-hour time; phase 4 changes train-ticket times back with Take 12 and the a.m. / p.m. keys.
   Edit, never rewrite. Built by `node cli.mjs scaffold`; concepts are verbatim (check compares them). */

const TOOL_ID = "timeline_board";
const MEDIA_ID = "M2.S3.T5.C23.2D1";
const TOOL_NAME = "Timeline Board";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (not shown: phase 1 has steps) */
const OPENING = ["One day on one line, read two ways. How many hours have passed since midnight?"];
const FINISH_LINE = "Times written in four digits, noon and the hour after midnight read off the line, and each one changed back.";
/* printed when the child opens Free play; every control it names is in the stage === "free" branch */
const FREE_LINE = "Free play: drag the marker along the day and read both readouts.";

/* the chapter's content colours (brief): hours vermilion, minutes deep blue, a.m. sky blue, p.m. amber; inks a shade deeper */
const TB_HR = "#D55E00", TB_MN = "#0072B2", TB_AM = "#56B4E9", TB_PM = "#E69F00";
const TB_OFF = "#6B5B45", TB_HRI = "#A04600", TB_MNI = "#005A8C", TB_AMI = "#1F6C99", TB_PMI = "#8A5A00", TB_GREY = "#666666";

/* the 12-hour name of a moment (minutes since midnight): the digits and the half, apart, so the half goes through tx() */
const tbHalf = (m: number) => (m % 1440 === 0 ? "midnight" : m === 720 ? "noon" : m < 720 ? "a.m." : "p.m.");
const tbClock = (m: number) => {
  const h = Math.floor(m / 60) % 24, mm = m % 60;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m % 720 === 0 ? "12" : h12 + ":" + String(mm).padStart(2, "0");
};
/* width of a string in em (spacing characters only: Devanagari and Gujarati zero-advance marks are skipped, PATTERNS §18) */
const tbEm = (s: string) => {
  let n = 0;
  for (const ch of String(s)) {
    const c = ch.codePointAt(0) || 0;
    if ((c >= 0x900 && c <= 0x902) || c === 0x93c || (c >= 0x941 && c <= 0x948) || c === 0x94d || (c >= 0x951 && c <= 0x957) || (c >= 0x962 && c <= 0x963)) continue;
    if ((c >= 0xa81 && c <= 0xa82) || c === 0xabc || (c >= 0xac1 && c <= 0xac8) || c === 0xacd || (c >= 0xae2 && c <= 0xae3)) continue;
    n += ch === " " ? 0.3 : ch === ":" || ch === "." ? 0.32 : c >= 0x900 ? 0.56 : 0.62;
  }
  return n;
};
/* a label's size: English at `base`; Hindi and Gujarati 1.18 x (their glyphs read smaller at one size), both fitted to `w` */
const tbFit = (s: string, w: number, base: number, lang: string) => Math.max(28, Math.min(lang === "en" ? base : Math.round(base * 1.18), Math.floor(w / Math.max(1, tbEm(s)))));
const tbFour = (m: number) => String(Math.floor(m / 60) % 24).padStart(2, "0") + String(m % 60).padStart(2, "0");

/* THE START PAGE (LAYOUT §1c) */
const START_HOOK = "How many hours have passed since midnight?";
function StartArt({ box, C, lang, tx = (v: any) => v }: any) {
  const x0 = 120, x1 = box.w - 120, X = (h: number) => x0 + ((x1 - x0) * h) / 24, mid = X(12);
  const posts = [0, 12, 24];
  const skinned = posts.length > 0 && posts.length <= 40;
  return (
    <g>
      <defs>
        <filter id="saShadow" x="-10%" y="-10%" width="125%" height="125%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#2B2B2B" floodOpacity="0.15" />
        </filter>
        <linearGradient id="saGradAm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7CD2FB" />
          <stop offset="100%" stopColor="#419ECE" />
        </linearGradient>
        <linearGradient id="saGradPm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F9C24A" />
          <stop offset="100%" stopColor="#D98A00" />
        </linearGradient>
      </defs>

      {/* AM and PM timeline tracks */}
      <rect x={x0} y={150} width={mid - x0} height={64} fill="url(#saGradAm)" />
      <rect x={mid} y={150} width={x1 - mid} height={64} fill="url(#saGradPm)" />
      <rect x={x0} y={150} width={x1 - x0} height={64} rx={8} fill="none" stroke={C.ink} strokeWidth={4} />

      {/* Hour ticks */}
      {Array.from({ length: 25 }, (_, h) => (
        <line
          key={h}
          x1={X(h)}
          y1={150}
          x2={X(h)}
          y2={h % 12 === 0 ? 236 : 172}
          stroke={C.ink}
          strokeWidth={h % 12 === 0 ? 5 : 2.5}
        />
      ))}

      {/* Sun & Moon posts */}
      {posts.map((h) => (
        <g key={h} filter="url(#saShadow)">
          <circle cx={X(h)} cy={92} r={46} fill={h === 12 ? "#FFE082" : "#FFF5C0"} stroke={C.ink} strokeWidth={2.5} />
          {skinned && <Skin name={h === 12 ? "sun" : "moon"} x={X(h) - 52} y={40} w={104} h={104} />}
        </g>
      ))}

      {/* AM / PM labels */}
      <text x={(x0 + mid) / 2} y={286} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={TB_AMI}>{tx("a.m.")}</text>
      <text x={(mid + x1) / 2} y={286} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={TB_PMI}>{tx("p.m.")}</text>

      {/* Marker pin illustration */}
      <line x1={X(16.25)} y1={124} x2={X(16.25)} y2={240} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
      <circle cx={X(16.25)} cy={182} r={18} fill={C.ink} stroke="#FFFFFF" strokeWidth={4} filter="url(#saShadow)" />
    </g>
  );
}

/* Hindi and Gujarati (PATTERNS §11): filled in the language pass, once the English is final */
const TR: any = {
  hi: {
    "Timeline Board": "समय रेखा बोर्ड",
    "One day on one line, read two ways. How many hours have passed since midnight?": "एक दिन एक रेखा पर, दो तरह से पढ़ो। मध्यरात्रि से कितने घंटे बीते?",
    "Times written in four digits, noon and the hour after midnight read off the line, and each one changed back.": "समय चार अंकों में लिखे, दोपहर और मध्यरात्रि के बाद का घंटा रेखा से पढ़ा, और हर समय वापस बदला।",
    "Free play: drag the marker along the day and read both readouts.": "खुला खेल: मार्कर को पूरे दिन पर खिसकाओ और दोनों समय पढ़ो।",
    "How many hours have passed since midnight?": "मध्यरात्रि से कितने घंटे बीत चुके हैं?",
    "Four digits, no a.m. or p.m.": "चार अंक, पूर्वाह्न या अपराह्न नहीं",
    "Read the four digits. Which two are the hours, and which two are the minutes?": "चार अंक पढ़ो। कौन-से दो घंटे हैं, और कौन-से दो मिनट?",
    "Tap Slide to carry the marker to 9:30 a.m.": "खिसकाओ बटन दबाकर मार्कर को 9:30 पूर्वाह्न पर ले जाओ।",
    "Tap the Slide key under the line.": "रेखा के नीचे खिसकाओ बटन दबाओ।",
    "Now tap the four boxes to read it in four digits.": "अब चार अंकों में पढ़ने के लिए चारों खाने दबाओ।",
    "Tap the four boxes above the line.": "रेखा के ऊपर के चारों खाने दबाओ।",
    "Which two digits are the hours, and which two the minutes?": "कौन-से दो अंक घंटे हैं, और कौन-से दो मिनट?",
    "Fill both hour places first, then both minute places.": "पहले घंटे के दोनों खाने भरो, फिर मिनट के दोनों।",
    "The 24-hour clock writes four digits, two for the hours and two for the minutes.": "24 घंटे की घड़ी चार अंक लिखती है, दो घंटों के और दो मिनटों के।",
    "You learned: four digits, two for the hours and two for the minutes.": "तुमने सीखा: चार अंक, दो घंटों के और दो मिनटों के।",
    "On the 24-hour clock, write 7:05 a.m.": "24 घंटे की घड़ी में 7:05 पूर्वाह्न लिखो।",
    "7:05 a.m. in four digits?": "7:05 पूर्वाह्न चार अंकों में?",
    "How many digits does a 24-hour time have?": "24 घंटे के समय में कितने अंक होते हैं?",
    "Yes, 0705 hours is 7:05 a.m.": "हाँ, 0705 घंटे यानी 7:05 पूर्वाह्न।",
    "Now write the same way for 6:20 a.m.": "अब इसी तरह 6:20 पूर्वाह्न लिखो।",
    "6:20 a.m. in four digits?": "6:20 पूर्वाह्न चार अंकों में?",
    "A one-digit hour still takes two places.": "एक अंक का घंटा भी दो खाने लेता है।",
    "Yes, 0620 hours is 6:20 a.m.": "हाँ, 0620 घंटे यानी 6:20 पूर्वाह्न।",
    "Write four digits for 11:08 a.m.": "11:08 पूर्वाह्न के लिए चार अंक लिखो।",
    "11:08 a.m. in four digits?": "11:08 पूर्वाह्न चार अंकों में?",
    "The minutes take two places as well.": "मिनट भी दो खाने लेते हैं।",
    "Yes, 1108 hours is 11:08 a.m.": "हाँ, 1108 घंटे यानी 11:08 पूर्वाह्न।",
    "Afternoon hours gain twelve": "दोपहर बाद के घंटों में बारह जुड़ते हैं",
    "Past one in the afternoon, add twelve to the hour. What do you get?": "दोपहर एक बजे के बाद, घंटे में बारह जोड़ो। क्या मिला?",
    "Tap Slide to carry the marker to 4:15 p.m.": "खिसकाओ बटन दबाकर मार्कर को 4:15 अपराह्न पर ले जाओ।",
    "The gate is open, so tap the four boxes to read it.": "फाटक खुला है, तो पढ़ने के लिए चारों खाने दबाओ।",
    "Is it one o'clock in the afternoon or later?": "क्या दोपहर का एक बजा है या उसके बाद का समय है?",
    "Count twelve more than the hour, and keep the minutes.": "घंटे से बारह आगे गिनो, और मिनट वैसे ही रखो।",
    "From one o'clock in the afternoon on, add twelve to the hour.": "दोपहर एक बजे से आगे, घंटे में बारह जोड़ो।",
    "You learned: from 1 p.m. to just before midnight, add 12 to the hour.": "तुमने सीखा: 1 अपराह्न से मध्यरात्रि तक, घंटे में 12 जोड़ो।",
    "On the 24-hour clock, write 9:25 p.m.": "24 घंटे की घड़ी में 9:25 अपराह्न लिखो।",
    "9:25 p.m. in four digits?": "9:25 अपराह्न चार अंकों में?",
    "Is the time before noon or after it?": "यह समय दोपहर से पहले का है या बाद का?",
    "Yes, 2125 hours is 9:25 p.m.": "हाँ, 2125 घंटे यानी 9:25 अपराह्न।",
    "Now write the same way for 3:40 p.m.": "अब इसी तरह 3:40 अपराह्न लिखो।",
    "3:40 p.m. in four digits?": "3:40 अपराह्न चार अंकों में?",
    "Add twelve to the hour, never to the minutes.": "बारह घंटे में जोड़ो, मिनट में कभी नहीं।",
    "Yes, 1540 hours is 3:40 p.m.": "हाँ, 1540 घंटे यानी 3:40 अपराह्न।",
    "Write four digits for a film that starts at 10:40 p.m.": "10:40 अपराह्न पर शुरू होने वाली फ़िल्म के चार अंक लिखो।",
    "10:40 p.m. in four digits?": "10:40 अपराह्न चार अंकों में?",
    "A film at night is past one in the afternoon.": "रात की फ़िल्म दोपहर एक बजे के बाद होती है।",
    "Yes, the film starts at 2240 hours.": "हाँ, फ़िल्म 2240 घंटे पर शुरू होती है।",
    "The twelve o'clock hours": "बारह बजे वाले घंटे",
    "Is twelve noon twelve hours after midnight, or twenty-four? How many whole hours have passed just after midnight?": "क्या दोपहर 12 बजे मध्यरात्रि के बारह घंटे बाद है, या चौबीस? मध्यरात्रि के ठीक बाद कितने पूरे घंटे बीते?",
    "Tap Slide to carry the marker to 12:20 a.m.": "खिसकाओ बटन दबाकर मार्कर को 12:20 पूर्वाह्न पर ले जाओ।",
    "No whole hour has passed yet, so tap the four boxes.": "अभी एक भी पूरा घंटा नहीं बीता, तो चारों खाने दबाओ।",
    "How many whole hours have passed since midnight?": "मध्यरात्रि से कितने पूरे घंटे बीते हैं?",
    "Count the hours along the top of the line from the left post.": "बाएँ खंभे से रेखा के ऊपर घंटे गिनो।",
    "12 noon is 1200 hours, and a time just after midnight begins with 00.": "दोपहर 12 बजे 1200 घंटे है, और मध्यरात्रि के ठीक बाद का समय 00 से शुरू होता है।",
    "You learned: noon is 1200 hours, and just after midnight starts 00.": "तुमने सीखा: दोपहर 1200 घंटे है, मध्यरात्रि के बाद 00 से शुरू।",
    "On the 24-hour clock, write 12:35 p.m.": "24 घंटे की घड़ी में 12:35 अपराह्न लिखो।",
    "12:35 p.m. in four digits?": "12:35 अपराह्न चार अंकों में?",
    "Is the time just after noon, or just after midnight?": "यह समय दोपहर के ठीक बाद का है, या मध्यरात्रि के ठीक बाद का?",
    "Yes, 1235 hours is 12:35 p.m.": "हाँ, 1235 घंटे यानी 12:35 अपराह्न।",
    "Now write the same way for 12:48 a.m.": "अब इसी तरह 12:48 पूर्वाह्न लिखो।",
    "12:48 a.m. in four digits?": "12:48 पूर्वाह्न चार अंकों में?",
    "Look where the marker stands on the line.": "देखो, मार्कर रेखा पर कहाँ खड़ा है।",
    "Yes, 0048 hours is 12:48 a.m.": "हाँ, 0048 घंटे यानी 12:48 पूर्वाह्न।",
    "A child adds twelve to 12 noon, so what should noon really be?": "एक बच्चा दोपहर 12 में बारह जोड़ता है, तो दोपहर असल में क्या होनी चाहिए?",
    "12 noon in four digits?": "दोपहर 12 बजे चार अंकों में?",
    "Noon is the middle of the day, not its end.": "दोपहर दिन का बीच है, उसका अंत नहीं।",
    "Yes, noon is 1200 hours, and 2400 hours ends the day.": "हाँ, दोपहर 1200 घंटे है, और 2400 घंटे दिन का अंत है।",
    "Back to the 12-hour clock": "वापस 12 घंटे की घड़ी पर",
    "Is the hour more than twelve? Then take twelve away and write p.m.": "क्या घंटा बारह से ज़्यादा है? तो बारह घटाओ और अपराह्न लिखो।",
    "Tap Take 12 to change the hour of 2140 hours.": "2140 घंटे का घंटा बदलने के लिए 12 घटाओ बटन दबाओ।",
    "Tap the Take 12 key beside the ticket.": "टिकट के पास का 12 घटाओ बटन दबाओ।",
    "The hour was more than twelve, so tap p.m.": "घंटा बारह से ज़्यादा था, तो अपराह्न दबाओ।",
    "Tap the right-hand key under the twin box.": "जवाब के खानों के नीचे दाईं ओर का बटन दबाओ।",
    "Find the hour on top of the line and read the number under it.": "रेखा के ऊपर घंटा ढूँढो और उसके नीचे की संख्या पढ़ो।",
    "Before noon the time is a.m., and from noon on it is p.m.": "दोपहर से पहले पूर्वाह्न, और दोपहर से आगे अपराह्न।",
    "Take twelve from an hour of 13 to 23, and call an hour of 00 or 12 twelve.": "13 से 23 के घंटे में से बारह घटाओ, और 00 या 12 के घंटे को बारह कहो।",
    "You learned: take 12 from 13 to 23, and call an hour of 00 or 12 twelve.": "तुमने सीखा: 13 से 23 में से 12 घटाओ, और 00 या 12 के घंटे को बारह कहो।",
    "Change 1650 hours into a 12-hour time.": "1650 घंटे को 12 घंटे वाले समय में बदलो।",
    "1650 hours on the 12-hour clock?": "12 घंटे की घड़ी पर 1650 घंटे?",
    "Is the hour more than twelve, twelve itself, or less?": "घंटा बारह से ज़्यादा है, ठीक बारह है, या कम?",
    "Yes, 1650 hours is 4:50 p.m.": "हाँ, 1650 घंटे यानी 4:50 अपराह्न।",
    "Now change 1219 hours the same way.": "अब इसी तरह 1219 घंटे बदलो।",
    "1219 hours on the 12-hour clock?": "12 घंटे की घड़ी पर 1219 घंटे?",
    "The hour is 12, so what does a clock call it?": "घंटा 12 है, तो घड़ी उसे क्या कहती है?",
    "Yes, 1219 hours is 12:19 p.m.": "हाँ, 1219 घंटे यानी 12:19 अपराह्न।",
    "Change 0026 hours into a 12-hour time too.": "0026 घंटे को भी 12 घंटे वाले समय में बदलो।",
    "0026 hours on the 12-hour clock?": "12 घंटे की घड़ी पर 0026 घंटे?",
    "No hour on a clock face is called 0.": "घड़ी पर किसी भी घंटे को 0 नहीं कहते।",
    "Yes, 0026 hours is 12:26 a.m.": "हाँ, 0026 घंटे यानी 12:26 पूर्वाह्न।",
    "Hours": "घंटे",
    "Minutes": "मिनट",
    "Now tap one of the two keys under the twin box.": "अब जवाब के खानों के नीचे के दो बटनों में से एक दबाओ।",
    "Now tap Take 12 to change the hour.": "अब घंटा बदलने के लिए 12 घटाओ बटन दबाओ।",
    "Your digits were right: tap the right key under the twin box, then type again.": "तुम्हारे अंक सही थे: खानों के नीचे सही बटन दबाओ, फिर दोबारा लिखो।",
    "Now type the time again.": "अब समय फिर से लिखो।",
    "a.m.": "पूर्वाह्न",
    "p.m.": "अपराह्न",
    "noon": "दोपहर",
    "midnight": "मध्यरात्रि",
    "hours": "घंटे",
    "add 12": "12 जोड़ो",
    "you wrote": "तुमने लिखा",
    "Day's end": "दिन का अंत",
    "2400 hours": "2400 घंटे",
    "Slide": "खिसकाओ",
    "Take 12": "12 घटाओ",
    "Four boxes": "चार खाने",
    "Marker": "मार्कर",
    "5 min back": "5 मिनट पीछे",
    "5 min on": "5 मिनट आगे",
  },
  gu: {
    "Timeline Board": "સમય રેખા બોર્ડ",
    "One day on one line, read two ways. How many hours have passed since midnight?": "એક દિવસ એક રેખા પર, બે રીતે વાંચો. મધ્યરાત્રિથી કેટલા કલાક વીત્યા?",
    "Times written in four digits, noon and the hour after midnight read off the line, and each one changed back.": "સમય ચાર અંકમાં લખ્યા, બપોર અને મધ્યરાત્રિ પછીનો કલાક રેખા પરથી વાંચ્યો, અને દરેક પાછો બદલ્યો.",
    "Free play: drag the marker along the day and read both readouts.": "મુક્ત રમત: માર્કરને આખા દિવસ પર ખસેડો અને બંને સમય વાંચો.",
    "How many hours have passed since midnight?": "મધ્યરાત્રિથી કેટલા કલાક વીતી ગયા છે?",
    "Four digits, no a.m. or p.m.": "ચાર અંક, પૂર્વાહ્ન કે અપરાહ્ન નહીં",
    "Read the four digits. Which two are the hours, and which two are the minutes?": "ચાર અંક વાંચો. કયા બે કલાક છે અને કયા બે મિનિટ?",
    "Tap Slide to carry the marker to 9:30 a.m.": "ખસેડો બટન દબાવી માર્કરને 9:30 પૂર્વાહ્ન પર લઈ જાઓ.",
    "Tap the Slide key under the line.": "રેખા નીચે ખસેડો બટન દબાવો.",
    "Now tap the four boxes to read it in four digits.": "હવે ચાર અંકમાં વાંચવા ચારેય ખાના દબાવો.",
    "Tap the four boxes above the line.": "રેખા ઉપરના ચારેય ખાના દબાવો.",
    "Which two digits are the hours, and which two the minutes?": "કયા બે અંક કલાક છે અને કયા બે મિનિટ?",
    "Fill both hour places first, then both minute places.": "પહેલાં કલાકના બંને ખાના ભરો, પછી મિનિટના બંને.",
    "The 24-hour clock writes four digits, two for the hours and two for the minutes.": "24 કલાકની ઘડિયાળ ચાર અંક લખે છે, બે કલાકના અને બે મિનિટના.",
    "You learned: four digits, two for the hours and two for the minutes.": "તમે શીખ્યા: ચાર અંક, બે કલાકના અને બે મિનિટના.",
    "On the 24-hour clock, write 7:05 a.m.": "24 કલાકની ઘડિયાળમાં 7:05 પૂર્વાહ્ન લખો.",
    "7:05 a.m. in four digits?": "7:05 પૂર્વાહ્ન ચાર અંકમાં?",
    "How many digits does a 24-hour time have?": "24 કલાકના સમયમાં કેટલા અંક હોય છે?",
    "Yes, 0705 hours is 7:05 a.m.": "હા, 0705 કલાક એટલે 7:05 પૂર્વાહ્ન.",
    "Now write the same way for 6:20 a.m.": "હવે આ જ રીતે 6:20 પૂર્વાહ્ન લખો.",
    "6:20 a.m. in four digits?": "6:20 પૂર્વાહ્ન ચાર અંકમાં?",
    "A one-digit hour still takes two places.": "એક અંકનો કલાક પણ બે ખાના લે છે.",
    "Yes, 0620 hours is 6:20 a.m.": "હા, 0620 કલાક એટલે 6:20 પૂર્વાહ્ન.",
    "Write four digits for 11:08 a.m.": "11:08 પૂર્વાહ્ન માટે ચાર અંક લખો.",
    "11:08 a.m. in four digits?": "11:08 પૂર્વાહ્ન ચાર અંકમાં?",
    "The minutes take two places as well.": "મિનિટ પણ બે ખાના લે છે.",
    "Yes, 1108 hours is 11:08 a.m.": "હા, 1108 કલાક એટલે 11:08 પૂર્વાહ્ન.",
    "Afternoon hours gain twelve": "બપોર પછીના કલાકોમાં બાર ઉમેરાય",
    "Past one in the afternoon, add twelve to the hour. What do you get?": "બપોરે એક વાગ્યા પછી, કલાકમાં બાર ઉમેરો. શું મળ્યું?",
    "Tap Slide to carry the marker to 4:15 p.m.": "ખસેડો બટન દબાવી માર્કરને 4:15 અપરાહ્ન પર લઈ જાઓ.",
    "The gate is open, so tap the four boxes to read it.": "દરવાજો ખુલ્લો છે, તો વાંચવા ચારેય ખાના દબાવો.",
    "Is it one o'clock in the afternoon or later?": "શું બપોરનો એક વાગ્યો છે કે પછીનો સમય છે?",
    "Count twelve more than the hour, and keep the minutes.": "કલાકથી બાર આગળ ગણો, અને મિનિટ એમ જ રાખો.",
    "From one o'clock in the afternoon on, add twelve to the hour.": "બપોરે એક વાગ્યાથી આગળ, કલાકમાં બાર ઉમેરો.",
    "You learned: from 1 p.m. to just before midnight, add 12 to the hour.": "તમે શીખ્યા: 1 અપરાહ્નથી મધ્યરાત્રિ સુધી, કલાકમાં 12 ઉમેરો.",
    "On the 24-hour clock, write 9:25 p.m.": "24 કલાકની ઘડિયાળમાં 9:25 અપરાહ્ન લખો.",
    "9:25 p.m. in four digits?": "9:25 અપરાહ્ન ચાર અંકમાં?",
    "Is the time before noon or after it?": "આ સમય બપોર પહેલાંનો છે કે પછીનો?",
    "Yes, 2125 hours is 9:25 p.m.": "હા, 2125 કલાક એટલે 9:25 અપરાહ્ન.",
    "Now write the same way for 3:40 p.m.": "હવે આ જ રીતે 3:40 અપરાહ્ન લખો.",
    "3:40 p.m. in four digits?": "3:40 અપરાહ્ન ચાર અંકમાં?",
    "Add twelve to the hour, never to the minutes.": "બાર કલાકમાં ઉમેરો, મિનિટમાં ક્યારેય નહીં.",
    "Yes, 1540 hours is 3:40 p.m.": "હા, 1540 કલાક એટલે 3:40 અપરાહ્ન.",
    "Write four digits for a film that starts at 10:40 p.m.": "10:40 અપરાહ્ને શરૂ થતી ફિલ્મ માટે ચાર અંક લખો.",
    "10:40 p.m. in four digits?": "10:40 અપરાહ્ન ચાર અંકમાં?",
    "A film at night is past one in the afternoon.": "રાતની ફિલ્મ બપોરે એક વાગ્યા પછી હોય છે.",
    "Yes, the film starts at 2240 hours.": "હા, ફિલ્મ 2240 કલાકે શરૂ થાય છે.",
    "The twelve o'clock hours": "બાર વાગ્યાના કલાકો",
    "Is twelve noon twelve hours after midnight, or twenty-four? How many whole hours have passed just after midnight?": "શું બપોરના 12 મધ્યરાત્રિ પછી બાર કલાકે છે કે ચોવીસ? મધ્યરાત્રિ પછી તરત કેટલા પૂરા કલાક વીત્યા?",
    "Tap Slide to carry the marker to 12:20 a.m.": "ખસેડો બટન દબાવી માર્કરને 12:20 પૂર્વાહ્ન પર લઈ જાઓ.",
    "No whole hour has passed yet, so tap the four boxes.": "હજી એક પણ પૂરો કલાક વીત્યો નથી, તો ચારેય ખાના દબાવો.",
    "How many whole hours have passed since midnight?": "મધ્યરાત્રિથી કેટલા પૂરા કલાક વીત્યા છે?",
    "Count the hours along the top of the line from the left post.": "ડાબા થાંભલાથી રેખા ઉપર કલાક ગણો.",
    "12 noon is 1200 hours, and a time just after midnight begins with 00.": "બપોરના 12 એટલે 1200 કલાક, અને મધ્યરાત્રિ પછી તરતનો સમય 00થી શરૂ થાય છે.",
    "You learned: noon is 1200 hours, and just after midnight starts 00.": "તમે શીખ્યા: બપોર 1200 કલાક છે, મધ્યરાત્રિ પછી 00થી શરૂ.",
    "On the 24-hour clock, write 12:35 p.m.": "24 કલાકની ઘડિયાળમાં 12:35 અપરાહ્ન લખો.",
    "12:35 p.m. in four digits?": "12:35 અપરાહ્ન ચાર અંકમાં?",
    "Is the time just after noon, or just after midnight?": "આ સમય બપોર પછી તરતનો છે કે મધ્યરાત્રિ પછી તરતનો?",
    "Yes, 1235 hours is 12:35 p.m.": "હા, 1235 કલાક એટલે 12:35 અપરાહ્ન.",
    "Now write the same way for 12:48 a.m.": "હવે આ જ રીતે 12:48 પૂર્વાહ્ન લખો.",
    "12:48 a.m. in four digits?": "12:48 પૂર્વાહ્ન ચાર અંકમાં?",
    "Look where the marker stands on the line.": "જુઓ, માર્કર રેખા પર ક્યાં ઊભો છે.",
    "Yes, 0048 hours is 12:48 a.m.": "હા, 0048 કલાક એટલે 12:48 પૂર્વાહ્ન.",
    "A child adds twelve to 12 noon, so what should noon really be?": "એક બાળક બપોરના 12માં બાર ઉમેરે છે, તો બપોર ખરેખર શું હોવી જોઈએ?",
    "12 noon in four digits?": "બપોરના 12 ચાર અંકમાં?",
    "Noon is the middle of the day, not its end.": "બપોર દિવસની વચ્ચે છે, તેનો અંત નહીં.",
    "Yes, noon is 1200 hours, and 2400 hours ends the day.": "હા, બપોર 1200 કલાક છે, અને 2400 કલાક દિવસનો અંત છે.",
    "Back to the 12-hour clock": "પાછા 12 કલાકની ઘડિયાળ પર",
    "Is the hour more than twelve? Then take twelve away and write p.m.": "શું કલાક બારથી વધુ છે? તો બાર બાદ કરો અને અપરાહ્ન લખો.",
    "Tap Take 12 to change the hour of 2140 hours.": "2140 કલાકનો કલાક બદલવા 12 બાદ કરો બટન દબાવો.",
    "Tap the Take 12 key beside the ticket.": "ટિકિટ પાસેનું 12 બાદ કરો બટન દબાવો.",
    "The hour was more than twelve, so tap p.m.": "કલાક બારથી વધુ હતો, તો અપરાહ્ન દબાવો.",
    "Tap the right-hand key under the twin box.": "જવાબના ખાના નીચે જમણી બાજુનું બટન દબાવો.",
    "Find the hour on top of the line and read the number under it.": "રેખા ઉપર કલાક શોધો અને તેની નીચેની સંખ્યા વાંચો.",
    "Before noon the time is a.m., and from noon on it is p.m.": "બપોર પહેલાં પૂર્વાહ્ન, અને બપોરથી આગળ અપરાહ્ન.",
    "Take twelve from an hour of 13 to 23, and call an hour of 00 or 12 twelve.": "13 થી 23ના કલાકમાંથી બાર બાદ કરો, અને 00 કે 12ના કલાકને બાર કહો.",
    "You learned: take 12 from 13 to 23, and call an hour of 00 or 12 twelve.": "તમે શીખ્યા: 13 થી 23માંથી 12 બાદ કરો, અને 00 કે 12ના કલાકને બાર કહો.",
    "Change 1650 hours into a 12-hour time.": "1650 કલાકને 12 કલાકના સમયમાં બદલો.",
    "1650 hours on the 12-hour clock?": "12 કલાકની ઘડિયાળમાં 1650 કલાક?",
    "Is the hour more than twelve, twelve itself, or less?": "કલાક બારથી વધુ છે, બરાબર બાર છે કે ઓછો?",
    "Yes, 1650 hours is 4:50 p.m.": "હા, 1650 કલાક એટલે 4:50 અપરાહ્ન.",
    "Now change 1219 hours the same way.": "હવે આ જ રીતે 1219 કલાક બદલો.",
    "1219 hours on the 12-hour clock?": "12 કલાકની ઘડિયાળમાં 1219 કલાક?",
    "The hour is 12, so what does a clock call it?": "કલાક 12 છે, તો ઘડિયાળ તેને શું કહે છે?",
    "Yes, 1219 hours is 12:19 p.m.": "હા, 1219 કલાક એટલે 12:19 અપરાહ્ન.",
    "Change 0026 hours into a 12-hour time too.": "0026 કલાકને પણ 12 કલાકના સમયમાં બદલો.",
    "0026 hours on the 12-hour clock?": "12 કલાકની ઘડિયાળમાં 0026 કલાક?",
    "No hour on a clock face is called 0.": "ઘડિયાળ પર કોઈ કલાકને 0 નથી કહેતા.",
    "Yes, 0026 hours is 12:26 a.m.": "હા, 0026 કલાક એટલે 12:26 પૂર્વાહ્ન.",
    "Hours": "કલાક",
    "Minutes": "મિનિટ",
    "Now tap one of the two keys under the twin box.": "હવે જવાબના ખાના નીચેના બે બટનમાંથી એક દબાવો.",
    "Now tap Take 12 to change the hour.": "હવે કલાક બદલવા 12 બાદ કરો બટન દબાવો.",
    "Your digits were right: tap the right key under the twin box, then type again.": "તમારા અંક સાચા હતા: ખાના નીચે સાચું બટન દબાવો, પછી ફરી લખો.",
    "Now type the time again.": "હવે સમય ફરી લખો.",
    "a.m.": "પૂર્વાહ્ન",
    "p.m.": "અપરાહ્ન",
    "noon": "બપોર",
    "midnight": "મધ્યરાત્રિ",
    "hours": "કલાક",
    "add 12": "12 ઉમેરો",
    "you wrote": "તમે લખ્યું",
    "Day's end": "દિવસનો અંત",
    "2400 hours": "2400 કલાક",
    "Slide": "ખસેડો",
    "Take 12": "12 બાદ કરો",
    "Four boxes": "ચાર ખાના",
    "Marker": "માર્કર",
    "5 min back": "5 મિનિટ પાછળ",
    "5 min on": "5 મિનિટ આગળ",
  },
};

/* a.m. / p.m. picked on the ticket in phase 4 (the runtime cannot hold a parts answer and choice keys in one item:
   NOTES.md runtime-gap list). Work writes it while a phase 4 question is open; judge reads it, so right digits with the
   wrong half is a miss. With no Work mounted (the static rows) live is false and judge reads the digits alone. */
const TB: any = { live: false, half: null };

const PHASES = [
  {
    n: 1,
    concept: "Four digits, no a.m. or p.m.",
    conceptId: "M2.S3.T5.C20", objectiveIds: ["O7"],
    says: ["Read the four digits. Which two are the hours, and which two are the minutes?"],
    steps: [
      { say: "Tap Slide to carry the marker to 9:30 a.m.", on: "slide", hint: "Tap the Slide key under the line." },
      { say: "Now tap the four boxes to read it in four digits.", on: "read", hint: "Tap the four boxes above the line." },
    ],
    ladder: ["Which two digits are the hours, and which two the minutes?", "Fill both hour places first, then both minute places."],
    closing: "The 24-hour clock writes four digits, two for the hours and two for the minutes.",
    learned: "You learned: four digits, two for the hours and two for the minutes.",
    traceback: "The four places above the line fill with the right digits, the nought in front lit as part of the hours; what the child wrote shows beside the Slide key.",
    items: [
      /* learn ML1: answer in the plan = 0705 hours */
      { qid: "M2.S3.T5.C20:ML1", kind: "four", clock: "7:05 a.m.", t: 425, answer: "0705", near: "705", forms: ["0705", "0705 hours"],
        say: "On the 24-hour clock, write 7:05 a.m.", ask: "7:05 a.m. in four digits?",
        miss: "How many digits does a 24-hour time have?", win: "Yes, 0705 hours is 7:05 a.m." },
      /* practice 1: answer in the plan = 0620 hours */
      { qid: "M2.S3.T5.C20:1", kind: "four", clock: "6:20 a.m.", t: 380, answer: "0620", near: "620", forms: ["0620", "0620 hours"],
        say: "Now write the same way for 6:20 a.m.", ask: "6:20 a.m. in four digits?",
        miss: "A one-digit hour still takes two places.", win: "Yes, 0620 hours is 6:20 a.m." },
      /* AUTHORED: phase 1 had two plan questions; this one tests the nought in the MINUTES (the brief's misconception "075") */
      { qid: null, kind: "four", clock: "11:08 a.m.", t: 668, answer: "1108", near: "118", forms: ["1108", "1108 hours"],
        say: "Write four digits for 11:08 a.m.", ask: "11:08 a.m. in four digits?",
        miss: "The minutes take two places as well.", win: "Yes, 1108 hours is 11:08 a.m." },
    ],
  },
  {
    n: 2,
    concept: "Afternoon hours gain twelve",
    conceptId: "M2.S3.T5.C21", objectiveIds: ["O7"],
    says: ["Past one in the afternoon, add twelve to the hour. What do you get?"],
    steps: [
      { say: "Tap Slide to carry the marker to 4:15 p.m.", on: "slide", hint: "Tap the Slide key under the line." },
      { say: "The gate is open, so tap the four boxes to read it.", on: "read", hint: "Tap the four boxes above the line." },
    ],
    ladder: ["Is it one o'clock in the afternoon or later?", "Count twelve more than the hour, and keep the minutes."],
    closing: "From one o'clock in the afternoon on, add twelve to the hour.",
    learned: "You learned: from 1 p.m. to just before midnight, add 12 to the hour.",
    traceback: "The marker stands in the amber half with the add 12 gate open, the four places fill with the hour plus twelve, and a pale pin shows the child's time.",
    items: [
      /* learn ML2: answer in the plan = 2125 hours */
      { qid: "M2.S3.T5.C21:ML2", kind: "four", clock: "9:25 p.m.", t: 1285, answer: "2125", near: "0925", forms: ["2125", "2125 hours"],
        say: "On the 24-hour clock, write 9:25 p.m.", ask: "9:25 p.m. in four digits?",
        miss: "Is the time before noon or after it?", win: "Yes, 2125 hours is 9:25 p.m." },
      /* practice 2: answer in the plan = 1540 hours */
      { qid: "M2.S3.T5.C21:2", kind: "four", clock: "3:40 p.m.", t: 940, answer: "1540", near: "0340", forms: ["1540", "1540 hours"],
        say: "Now write the same way for 3:40 p.m.", ask: "3:40 p.m. in four digits?",
        miss: "Add twelve to the hour, never to the minutes.", win: "Yes, 1540 hours is 3:40 p.m." },
      /* practice 4: answer in the plan = 2240 hours */
      { qid: "M2.S3.T5.C21:4", kind: "four", clock: "10:40 p.m.", t: 1360, answer: "2240", near: "1040", forms: ["2240", "2240 hours"],
        say: "Write four digits for a film that starts at 10:40 p.m.", ask: "10:40 p.m. in four digits?",
        miss: "A film at night is past one in the afternoon.", win: "Yes, the film starts at 2240 hours." },
      /* practice 8 (the clock that gains 3 minutes an hour, 1332 hours) is unused: phase 2 had four questions, and it tests
         a clock's error more than adding twelve */
    ],
  },
  {
    n: 3,
    concept: "The twelve o'clock hours",
    conceptId: "M2.S3.T5.C22", objectiveIds: ["O8"],
    says: ["Is twelve noon twelve hours after midnight, or twenty-four? How many whole hours have passed just after midnight?"],
    steps: [
      { say: "Tap Slide to carry the marker to 12:20 a.m.", on: "slide", hint: "Tap the Slide key under the line." },
      { say: "No whole hour has passed yet, so tap the four boxes.", on: "read", hint: "Tap the four boxes above the line." },
    ],
    ladder: ["How many whole hours have passed since midnight?", "Count the hours along the top of the line from the left post."],
    closing: "12 noon is 1200 hours, and a time just after midnight begins with 00.",
    learned: "You learned: noon is 1200 hours, and just after midnight starts 00.",
    traceback: "The marker stands at the time with the gate shut, the four places fill with the hours since the left midnight post, and a pale pin shows the child's time.",
    items: [
      /* learn ML3: answer in the plan = 12:35 p.m. is 1235 hours, and 12:35 a.m. is 0035 hours (one time a question: 12:35 p.m.) */
      { qid: "M2.S3.T5.C22:ML3", kind: "four", clock: "12:35 p.m.", t: 755, answer: "1235", near: "2435", forms: ["1235", "1235 hours"],
        say: "On the 24-hour clock, write 12:35 p.m.", ask: "12:35 p.m. in four digits?",
        miss: "Is the time just after noon, or just after midnight?", win: "Yes, 1235 hours is 12:35 p.m." },
      /* practice 5: answer in the plan = 0048 hours */
      { qid: "M2.S3.T5.C22:5", kind: "four", clock: "12:48 a.m.", t: 48, answer: "0048", near: "1248", forms: ["0048", "0048 hours"],
        say: "Now write the same way for 12:48 a.m.", ask: "12:48 a.m. in four digits?",
        miss: "Look where the marker stands on the line.", win: "Yes, 0048 hours is 12:48 a.m." },
      /* practice 6: the child's 2400 names midnight at the end of a day; noon is 1200 hours (asked: what noon should be) */
      { qid: "M2.S3.T5.C22:6", kind: "four", clock: "12:00 p.m.", t: 720, answer: "1200", near: "2400", forms: ["1200", "1200 hours"],
        say: "A child adds twelve to 12 noon, so what should noon really be?", ask: "12 noon in four digits?",
        miss: "Noon is the middle of the day, not its end.", win: "Yes, noon is 1200 hours, and 2400 hours ends the day." },
    ],
  },
  {
    n: 4,
    concept: "Back to the 12-hour clock",
    conceptId: "M2.S3.T5.C23", objectiveIds: ["O8"],
    says: ["Is the hour more than twelve? Then take twelve away and write p.m."],
    steps: [
      { say: "Tap Take 12 to change the hour of 2140 hours.", on: "take", hint: "Tap the Take 12 key beside the ticket." },
      { say: "The hour was more than twelve, so tap p.m.", on: "pm", hint: "Tap the right-hand key under the twin box." },
    ],
    ladder: ["Find the hour on top of the line and read the number under it.", "Before noon the time is a.m., and from noon on it is p.m."],
    closing: "Take twelve from an hour of 13 to 23, and call an hour of 00 or 12 twelve.",
    learned: "You learned: take 12 from 13 to 23, and call an hour of 00 or 12 twelve.",
    traceback: "Take 12 is written out where it is needed, the marker lands on the time and its 12-hour readout fills the twin box, and a pale pin shows the child's time.",
    items: [
      /* learn ML4: answer in the plan = 4:50 p.m. and 3:40 a.m. (one time a question: 1650 hours) */
      { qid: "M2.S3.T5.C23:ML4", kind: "back", given: "1650", t: 1010, half: "p.m.", parts: [{ label: "Hours" }, { label: "Minutes" }],
        answer: [4, 50], near: "6|50", forms: ["4:50", "4:50 p.m."],
        say: "Change 1650 hours into a 12-hour time.", ask: "1650 hours on the 12-hour clock?",
        miss: "Is the hour more than twelve, twelve itself, or less?", win: "Yes, 1650 hours is 4:50 p.m." },
      /* practice 7: answer in the plan = 12:26 a.m. and 12:19 p.m. (this question: 1219 hours, an hour of 12 that keeps its twelve) */
      { qid: "M2.S3.T5.C23:7", kind: "back", given: "1219", t: 739, half: "p.m.", parts: [{ label: "Hours" }, { label: "Minutes" }],
        answer: [12, 19], near: "0|19", forms: ["12:19", "12:19 p.m."],
        say: "Now change 1219 hours the same way.", ask: "1219 hours on the 12-hour clock?",
        miss: "The hour is 12, so what does a clock call it?", win: "Yes, 1219 hours is 12:19 p.m." },
      /* practice 7's other half, 0026 hours = 12:26 a.m. (qid null: the plan id is on the 1219 item; practice 3, 0850, is unused) */
      { qid: null, kind: "back", given: "0026", t: 26, half: "a.m.", parts: [{ label: "Hours" }, { label: "Minutes" }],
        answer: [12, 26], near: "0|26", forms: ["12:26", "12:26 a.m."],
        say: "Change 0026 hours into a 12-hour time too.", ask: "0026 hours on the 12-hour clock?",
        miss: "No hour on a clock face is called 0.", win: "Yes, 0026 hours is 12:26 a.m." },
    ],
  },
];

/* where each phase's marker opens, and the warm-up each phase's guide steps work (none of them a question's answer) */
const MODEL = {
  start: [480, 790, 0, null],
  warm: [{ t: 570 }, { t: 975 }, { t: 20 }, { t: 1300, given: "2140", half: "p.m." }],
  gateAt: 780,
};

/* ── the maths ─────────────────────────────────────────────────────────────────────────── */
/* phase 4, right digits with a wrong or missing half: the runtime's rung (rungOf reads item.miss / item.ladder at the miss) would
   talk about the hour, which was right, and r31 has no verb to set a hint, so judge swaps this question's rungs for the half line
   and puts them back on its next judge. ponytail: mutates the item; a runtime hint verb would remove it (NOTES.md gap list). */
const TB_HALF_HINT = "Your digits were right: tap the right key under the twin box, then type again.";
const tbHalfRung = (item: any, on: boolean) => {
  if (on) {
    if (!item.__rung) item.__rung = { miss: item.miss, ladder: item.ladder };
    item.miss = TB_HALF_HINT; item.ladder = [TB_HALF_HINT, TB_HALF_HINT];
  } else if (item.__rung) {
    item.miss = item.__rung.miss;
    if (item.__rung.ladder) item.ladder = item.__rung.ladder; else delete item.ladder;
    delete item.__rung;
  }
};
const judge = (item: any, v: any) => {
  if (item.half) {
    const p = slotPartsOf(v, 2);
    const ok = p[0] !== "" && p[1].length === 2 && Number(p[0]) === item.answer[0] && Number(p[1]) === item.answer[1];
    const halfBad = ok && TB.live && TB.half !== item.half;
    tbHalfRung(item, halfBad);
    return ok && !halfBad;
  }
  const d = String(v ?? "").replace(/[^0-9]/g, "");
  return d.length === 4 && d === item.answer;
};
/* second route: from the words of the given time, never from t or the picture */
const oracle = () => PHASES.every((p: any) => p.items.every((it: any) => {
  if (it.given) {
    const h = Number(it.given.slice(0, 2)), m = Number(it.given.slice(2));
    const h12 = h % 12 === 0 ? 12 : h % 12, half = h < 12 ? "a.m." : "p.m.";
    return it.answer[0] === h12 && it.answer[1] === m && it.half === half && it.t === h * 60 + m;
  }
  const mt = /^(\d+):(\d\d) (a|p)\.m\.$/.exec(it.clock);
  if (!mt) return false;
  const h = (Number(mt[1]) % 12) + (mt[3] === "p" ? 12 : 0);
  return it.answer === (h < 10 ? "0" : "") + h + mt[2] && it.t === h * 60 + Number(mt[2]);
}));
const nearMiss = (item: any) => item.near;
const answerForms = (item: any) => item.forms;
const agentKey = (item: any) => item.answer;

const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (T.state().stage === "demo") return HOOK.demo && HOOK.demo();
  if (HOOK.check) HOOK.check();
  return T.submit(item.answer);
};
/* the agent's answer(): a phase 4 half named in the answer is picked; otherwise the act is done for it, then v is typed */
const answer = (item: any, v: any) => {
  if (item.half && HOOK.pick) {
    const s = String(v);
    HOOK.pick(/p\.?m/i.test(s) ? "p.m." : /a\.?m/i.test(s) ? "a.m." : item.half);
  }
  return undefined;
};
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area: 64,108, 1472 x 520 shut, 900 x 520 open (bigPad); box.key is the key's corner ── */
function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const free = stage === "free";
  const warm = !free && (stage === "demo" || stage === "teach");
  const W4 = MODEL.warm[n - 1];
  const cur: any = free ? null : warm ? W4 : item;
  const target = cur ? cur.t : null;
  const done = stage === "win" || stage === "idle";
  const corr = !!wrong && stage === "ask";
  const P4 = !free && n === 4;

  /* the board is keyed to the ENTRY (PATTERNS §18): a fresh board each time a question or warm-up is entered */
  const qk = n + "." + (free ? "f" : warm ? "w" : index);
  const ent = useRef({ qk: "", c: 0 });
  if (ent.current.qk !== qk) ent.current = { qk, c: ent.current.c + 1 };
  const ek = qk + "#" + ent.current.c;
  const startT = free ? 600 : MODEL.start[n - 1];
  const fresh = () => ({ k: ek, t: startT, acted: false, pc: 0, took: false, tc: 0, half: null as any, touched: false, tb: false });
  const [raw, setRaw] = useState(fresh);
  const S = raw.k === ek ? raw : fresh();
  const put = (f: any) => setRaw((p: any) => ({ ...(p.k === ek ? p : fresh()), ...f }));
  /* a real touch in this phase (a tap on a control, or a PHYSICAL Enter on a guide step; PATTERNS §20) arms the answer gate for its
     questions; toolApi.check() never counts (AI mode and the host stay ungated). Work remounts on a restart, so this resets with it. */
  const [ptouch, setPt] = useState(0);
  const touch = () => { put({ touched: true }); setPt(n); };
  useEffect(() => {
    if (free) return;
    const onKey = (e: any) => { if ((e.key === "Enter" || e.key === " ") && stage === "demo" && !e.repeat) setPt(n); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stage, n, free]);
  const busy = useRef(false);
  const tbRun = useRef(false);
  const mine = useRef(false);
  /* while the marker slides (its own move: no api.act, so r31's workTap guard `actor.busy()` cannot see it; NOTES runtime-gap list),
     a click on the working area, the dimmed Answer key or the Hint key is swallowed before the runtime reads it as a wrong act.
     Restart, sound and the phase dots stay live. ponytail: a window capture listener; a tool busy flag in the runtime removes it. */
  useEffect(() => {
    const swallow = (e: any) => {
      if (!busy.current || !slideT.current.raf) return;
      const el: any = e.target;
      if (el && el.closest && el.closest('[data-zone="work"], [data-zone="ask"], [data-control="again"]')) { e.stopPropagation(); e.preventDefault(); }
    };
    /* the keys press on pointer down (usePress), the ask zone's dimmed-key tap is a click: both */
    window.addEventListener("pointerdown", swallow, true);
    window.addEventListener("click", swallow, true);
    return () => { window.removeEventListener("pointerdown", swallow, true); window.removeEventListener("click", swallow, true); };
  }, []);

  /* geometry: the bar ends before the key's corner, so the moon on its right post never sits under the key */
  const kx = box.key ? box.key.x - 12 : box.w;
  const x0 = 28, x1 = Math.min(box.w - 50, kx - 40);
  const X = (m: number) => x0 + ((x1 - x0) * m) / 1440;
  const Tof = (x: number) => ((x - x0) * 1440) / (x1 - x0);
  const every = (x1 - x0) / 24 >= 44 ? 1 : 2;
  /* the timeline group sits in the middle of the working area (educator, 2026-11-16: "place it in a centre, not the top"): phases 1 to 3
     and free play carry the four places ABOVE it and the key below; phase 4 keeps its ticket board below, so its line sits as low as
     that board allows. DY moves the whole group (moons, a.m. / p.m., hour numbers, bar, 12-hour names, Day's end).
     Phases 1 to 3 (round 2, the reviewers): the clearance from the four-box tag's bottom (tagY + TH below: 156 en, 152 hi/gu) to the
     group's top (the moons at DY + 12, phase 3's glow and Day's end at DY + 10) equals the clearance from the 12-hour names (ink
     bottom = their baseline, DY + 234) to the Slide key's guide ring (top 436). Phase 4: the whole column (the 12-hour card's place at
     DY + 4 - rh4, the group, the ticket board from DY + 258 and the a.m. / p.m. keys to DY + 427 with their edge) is centred in the
     520 tall area: the card's top margin equals the keys' bottom margin.
     Phases 1 to 3 carry the hour row, bar and names 3 lower than phase 4, so the Day's end tag clears the hour digits. */
  const cardB = lang !== "en" ? 152 : 156, topOff = n === 3 && !free ? 10 : 12, rh4 = lang !== "en" ? 78 : 66;
  const DY = P4 ? Math.round((89 + rh4) / 2) : Math.round((cardB + 436 - 234 - topOff) / 2);
  const barY = (P4 ? 131 : 134) + DY, barH = 56, barMid = barY + barH / 2;

  /* phase 4: the ticket's numbers */
  const g4 = P4 ? (warm ? W4.given : item.given) : "";
  const h4 = g4 ? Number(g4.slice(0, 2)) : 0;
  const big4 = h4 >= 13;
  const h12of = (h: number) => (h % 12 === 0 ? 12 : h % 12);
  const takeLine = big4 ? h4 + "-12=" + (h4 - 12) : "";
  const half4 = P4 ? (warm ? W4.half : item.half) : null;

  /* drag (free play only): the marker follows the finger, snapping to 5 minutes */
  const snap = (m: number) => Math.max(0, Math.min(1435, Math.round(m / 5) * 5));
  const drag = useDrag((p: any, at: any, moved: boolean) => {
    if (!free || !moved || !isFinite(at.x)) return;
    put({ t: snap(Tof(at.x)) });
    api.sfx.tick();
  });
  const tNow = free && drag.drag && drag.drag.moved ? snap(Tof(drag.drag.x)) : S.t;

  /* the acts ------------------------------------------------------------------------------- */
  const slide = async (real: boolean) => {
    if (real) touch();
    if (busy.current) return;
    if (S.acted || P4 || target === null) { if (warm) api.did("slide"); return; }
    busy.current = true;
    const from = S.t === null ? target : S.t;
    /* no drawn hand (the owner, 2026-11-16): the marker slides by itself in ONE smooth glide (requestAnimationFrame, linear, whole
       minutes so the readout's digits follow the pin), about 2 s like the old act, a long slide up to 2.5 s so no frame jumps far;
       `acted` (and with it the answer gate's lock) changes only at the end. Reduced motion: at once. A new entry stops it (stopSlide
       in the qk cleanup); the timeout ends it if the page stops painting (a hidden tab pauses requestAnimationFrame). */
    const id = ++slideN.current;
    const end = () => { if (slideN.current !== id || !busy.current) return; stopSlide(); put({ t: target, acted: true }); api.sfx.settle(); if (warm) api.did("slide"); refocus(); };
    if (reducedMotion()) { end(); return; }
    const dur = Math.min(2500, Math.max(2100, Math.abs(X(target) - X(from)) * 4.3));
    const t0 = performance.now();
    let last = from;
    const frame = (now: number) => {
      if (slideN.current !== id) return;
      const k = (now - t0) / dur;
      if (k >= 1) { end(); return; }
      const m = Math.round(from + (target - from) * Math.max(0, k));
      if (m !== last) { last = m; put({ t: m }); }
      slideT.current.raf = requestAnimationFrame(frame);
    };
    slideT.current.raf = requestAnimationFrame(frame);
    slideT.current.to = setTimeout(end, dur + 400);
  };
  const slideT = useRef<any>({});
  const slideN = useRef(0);
  const stopSlide = () => { cancelAnimationFrame(slideT.current.raf); clearTimeout(slideT.current.to); slideT.current = {}; slideN.current++; busy.current = false; };
  /* keyboard: after the slide the focus goes to the next control (the four boxes in a guide step, the Answer key at a question) */
  const refocusNow = () => {
    const a: any = document.activeElement;
    if (a && a !== document.body && a.isConnected && !(a.getAttribute && a.getAttribute("data-control") === "slide")) return;
    const q = (c: string) => document.querySelector('[data-control="' + c + '"]') as any;
    const el = q("read") || q("answer-open");
    if (el && el.focus) el.focus();
  };
  /* twice: the Answer key re-renders as the lock opens and can drop a focus given too early */
  const refocus = () => { setTimeout(refocusNow, 120); setTimeout(refocusNow, 450); };
  /* geometry of the four places above the line (the tag rides with the marker, clear of the key's corner) */
  const dev = lang !== "en";
  const TW = 470, headH = dev ? 72 : 68, tagY = 2;
  const tagX = (m: number) => Math.max(0, Math.min(Math.min(box.w, kx) - TW, X(m) - TW / 2));
  const cellX = (m: number) => tagX(m) + 20;
  const cellY = tagY + headH, cellH = dev ? 68 : 76, pitch = 80, dSize = dev ? 56 : 62;
  const TH = headH + cellH + 10;
  const read = async () => {
    if (busy.current) return;   /* the marker is still sliding (or the pencil writing): a tap now is not a wrong act */
    if (!warm || !S.acted || S.pc >= 4) { api.did("read"); return; }
    busy.current = true;
    const four = tbFour(target), cx = cellX(target), by = cellY + cellH / 2 + dSize * 0.36;
    const ok = await api.act({ tool: "pencil", moves: "write", text: [four.slice(0, 2), four.slice(2)],
      at: [{ x: cx - 4, y: by }, { x: cx + 2 * pitch - 4, y: by }], size: dSize, step: pitch, align: "start", color: [TB_HRI, TB_MNI],
      onPoint: (j: number) => put({ pc: j + 1 }) });
    busy.current = false;
    if (!ok) return;
    put({ pc: 4 });
    api.did("read");
  };
  /* phase 4 geometry: ticket, Take 12, the twin and the a.m. / p.m. keys, centred in the room */
  const ox = Math.max(0, (box.w - 870) / 2);
  const BY = barY + 127;   /* the board's top: 16 clear of the 12-hour names' text box (it ends 11 under their baseline, barY + 100) */
  const TK = { x: ox + 10, y: BY, w: 290, h: 164 };
  const TAKE = { x: ox + 322, y: BY + 4, w: 190, h: 72 };
  const lineAt = { x: ox + 326, y: BY + 142 };
  const TWIN = { x: ox + 532, y: BY, h: 80 };
  /* the a.m. / p.m. keys are wider in Hindi and Gujarati (पूर्वाह्न / અપરાહ્ન are longer words) */
  const kw = lang === "en" ? 100 : 150;
  const AMK = { x: ox + 532, y: BY + 92, w: kw, h: 72 }, PMK = { x: ox + 532 + kw + 12, y: BY + 92, w: kw, h: 72 };
  const take = async (real: boolean) => {
    if (real) touch();
    if (busy.current) return;
    if (!big4 || S.took) { if (warm) api.did("take"); return; }
    if (warm && stepOn !== "take") { api.did("take"); return; }
    busy.current = true;
    const ok = await api.act({ tool: "pencil", moves: "write", text: takeLine, at: [{ x: lineAt.x, y: lineAt.y }], size: 44, align: "start", color: TB_HRI,
      onPoint: (j: number) => put({ tc: j + 1 }) });
    busy.current = false;
    if (!ok) return;
    put({ took: true, tc: takeLine.length });
    if (warm) api.did("take");
  };
  const pick = (h: string, real: boolean) => {
    const on = h === "a.m." ? "am" : "pm";
    if (real) touch();
    if (warm) { if (stepOn === on && S.took) { put({ half: h }); api.sfx.tick(); } api.did(on); return; }
    if (stage !== "ask") return;
    if (corrBusy()) { queued.current = h; return; }   /* tapped during the correction: applied 1 s after the unlock */
    put({ half: h });
    TB.half = h;
    api.sfx.tick();
    /* a half tap never judges; Enter does. After a miss the slot is empty (r31 MISS CLEARS THE SLOT): say so and open the keypad
       (openAnswer also takes the old hint off the bubble) */
    if (wrong && !typed) { api.say("Now type the time again."); setTimeout(() => { try { api.openAnswer && api.openAnswer(); } catch (e) {} }, 160); }
  };
  const queued = useRef<any>(null);
  const pickRef = useRef<any>(null);
  pickRef.current = pick;
  const corrBusy = () => tbRun.current;
  const halfMiss = corr && P4 && !!item.half && (() => { const p = slotPartsOf(wrong.value, 2); return p[0] !== "" && p[1] !== "" && Number(p[0]) === item.answer[0] && Number(p[1]) === item.answer[1]; })();
  const act = (on: any) => {
    if (on === "slide") slide(false);
    else if (on === "read") read();
    else if (on === "take") take(false);
    else if (on === "am") pick("a.m.", false);
    else if (on === "pm") pick("p.m.", false);
  };
  api.onEnter(stage === "demo" && stepOn ? () => act(stepOn) : null);

  /* the agent's hooks: check() performs the act at once (never gated), answer() picks the half */
  HOOK.demo = () => act(stepOn);
  const release = () => { if (mine.current) { mine.current = false; api.lock(false); } };
  HOOK.check = stage === "ask" ? () => {
    if (!P4 && !S.acted) { stopSlide(); put({ t: target, acted: true }); return true; }
    if (P4 && (!S.half || (big4 && !S.took))) {
      put({ half: S.half || item.half, took: big4, tc: takeLine.length });
      TB.half = S.half || item.half;
      release();
      return true;
    }
    return undefined;
  } : null;
  HOOK.pick = stage === "ask" && P4 ? (h: string) => { put({ half: h, took: big4, tc: takeLine.length }); TB.half = h; release(); } : null;
  TB.live = P4 && stage === "ask";
  TB.half = TB.live ? S.half : null;

  /* the answer gated by the act (PATTERNS §20): only after a real touch, only while the act is still undone */
  const needAct = stage === "ask" && (P4 ? !S.half || (big4 && !S.took) : !S.acted);
  /* only after a real touch: a lock at the question's open refuses toolApi.answer in user mode (PATTERNS §20 side effect 2; the
     host emulator's user-mode walk then never finishes). A miss with no half picked rings the two keys in the correction instead. */
  const touchedNow = S.touched || ptouch === n;
  const want = needAct && touchedNow;
  useEffect(() => {
    if (tbRun.current || want === mine.current) return;
    mine.current = want;
    api.lock(want);
  }, [want]);
  /* phase 4 nudges while the key is locked, and the question back once both acts are done */
  const nudged = useRef("");
  useEffect(() => {
    if (!P4 || stage !== "ask" || !touchedNow) return;
    if (big4 && S.took && !S.half) { nudged.current = ek; api.say("Now tap one of the two keys under the twin box."); }
    else if (big4 && S.half && !S.took) { nudged.current = ek; api.say("Now tap Take 12 to change the hour."); }
    else if (nudged.current === ek && S.half && (!big4 || S.took)) { nudged.current = ""; api.say(item.say); }
  }, [S.took, S.half, touchedNow]);

  /* a 24-hour answer has four digits: the pad would take nine */
  useEffect(() => {
    if (P4 || stage !== "ask" || tbRun.current) return;
    const d = String(typed || "");
    if (d.length > 4) api.setTyped(d.slice(0, 4));
  }, [typed]);

  /* the win line */
  useEffect(() => {
    if (stage === "win" && item && item.win) api.say(item.win);
  }, [stage]);

  /* the traceback: lock, redraw the right answer beside the child's, unlock */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    tbRun.current = true;
    put({ tb: true });
    api.lock(true);
    queued.current = null;
    tl.run([[1600, () => {}]], () => {
      tbRun.current = false; mine.current = false; put({ tb: false }); api.lock(false);
      if (queued.current) { const h = queued.current; queued.current = null; setTimeout(() => pickRef.current && pickRef.current(h, true), 1000); }
    });
  }, [wrong]);
  useEffect(() => () => {
    tl.stop();
    stopSlide();
    if (tbRun.current) { tbRun.current = false; api.lock(false); }
    if (mine.current) { mine.current = false; api.lock(false); }
  }, [qk]);

  /* what the host and the agent read back: never an answer before it is given */
  const showFour = free || done || corr;
  api.share({
    phase: n, markerMinutes: P4 && !(done || corr || (warm && S.half)) ? null : tNow,
    twelveHour: P4 ? (done ? item.answer[0] + ":" + String(item.answer[1]).padStart(2, "0") + " " + item.half : null) : tNow === null ? null : tbClock(tNow) + " " + tbHalf(tNow),
    fourDigit: P4 ? g4 : showFour && tNow !== null ? tbFour(tNow) : null,
    gateOpen: tNow !== null && tNow >= MODEL.gateAt, boardRow: P4 ? g4 : null, half: P4 ? S.half : null, complete: stage === "idle",
  });

  /* ── drawing ─────────────────────────────────────────────────────────────────────────── */
  const hourLabels = () => Array.from({ length: 25 }, (_, h) => h).filter((h) => h % every === 0);
  const halfColour = (m: number) => (m < 720 ? TB_AMI : TB_PMI);
  const clockText = (m: number, size: number, x: number, y: number, anchor = "start") => (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={C.ink}>
      <tspan>{tbClock(m)}</tspan><tspan dx={10} fill={halfColour(m)}>{tx(tbHalf(m))}</tspan>
    </text>
  );

  const Timeline = () => {
    const xn = X(720), lit3 = n === 3 && !free;
    const posts = [0, 720, 1440];
    const skinned = posts.length > 0 && posts.length <= 40;
    return (
      <g data-tb="group">
        {/* the top band: the moons over the midnight posts, the sun over the noon post, the two halves named */}
        {posts.map((m) => {
          const cx = Math.max(46, X(m)), sun = m === 720;
          return (
            <g key={m} filter="url(#tbSoftShadow)">
              {lit3 && m !== 1440 && <circle cx={cx} cy={50 + DY} r={40} fill="#FFF1B8" />}
              <circle cx={cx} cy={50 + DY} r={34} fill={sun ? "url(#tbGradSun)" : "url(#tbGradMoon)"} stroke={C.ink} strokeWidth={2.5} />
              {skinned && <Skin name={sun ? "sun" : "moon"} x={cx - 38} y={12 + DY} w={76} h={76} />}
            </g>
          );
        })}
        <text x={(X(0) + xn) / 2} y={64 + DY} textAnchor="middle" fontSize={T.prompt} fontWeight={700} fill={TB_AMI}>{tx("a.m.")}</text>
        {(() => {
          /* phase 3: between the sun's glow and the Day's end tag (laid out so the word keeps 40 like a.m., open or shut) */
          const pm = tx("p.m."), l = xn + (lit3 ? 46 : 54), r = lit3 ? dayCard().x - 6 : X(1440) - 40;
          return <text data-tb="pm" x={(l + r) / 2} y={64 + DY} textAnchor="middle" fontSize={Math.max(28, Math.min(T.prompt, Math.floor((r - l) / Math.max(1, tbEm(pm)))))} fontWeight={700} fill={TB_PMI}>{pm}</text>;
        })()}

        {/* hours since midnight along the top edge */}
        {hourLabels().map((h) => <text key={"t" + h} data-tb="hr" x={X(h * 60)} y={barY - 10} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink}>{h}</text>)}

        {/* the bar: sky blue to noon, amber after */}
        <g filter="url(#tbBarShadow)">
          <rect x={x0} y={barY} width={xn - x0} height={barH} fill="url(#tbGradAm)" />
          <rect x={xn} y={barY} width={X(1440) - xn} height={barH} fill="url(#tbGradPm)" />
          {/* Subtle top gloss highlight */}
          <rect x={x0} y={barY + 2} width={X(1440) - x0} height={10} fill="#FFFFFF" fillOpacity={0.25} rx={2} />
          {Array.from({ length: 25 }, (_, h) => h).map((h) => (
            <line key={"k" + h} x1={X(h * 60)} y1={barY} x2={X(h * 60)} y2={h % 12 === 0 ? barY + barH + 14 : barY + 16} stroke={C.ink} strokeWidth={h % 12 === 0 ? 5 : 2.5} />
          ))}
          <rect x={x0} y={barY} width={X(1440) - x0} height={barH} rx={4} fill="none" stroke={C.ink} strokeWidth={3} />
        </g>

        {lit3 && <rect x={xn - 9} y={barY - 6} width={18} height={barH + 16} rx={6} fill="none" stroke={C.ink} strokeWidth={3.5} />}
        {lit3 && <rect x={x0 - 9} y={barY - 6} width={18} height={barH + 16} rx={6} fill="none" stroke={C.ink} strokeWidth={3.5} />}

        {/* the 12-hour names under the bar */}
        {hourLabels().map((h) => <text key={"b" + h} data-tb="nm" x={X(h * 60)} y={barY + 100} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={h < 12 || h === 24 ? TB_AMI : TB_PMI}>{h % 12 === 0 ? 12 : h % 12}</text>)}

        {/* the add 12 gate at the one o'clock mark of the afternoon */}
        {(n === 2 || free) && Gate()}
      </g>
    );
  };

  const Gate = () => {
    const gx = X(MODEL.gateAt), open = tNow !== null && tNow >= MODEL.gateAt;
    return (
      <g pointerEvents="none" filter="url(#tbSoftShadow)">
        <rect x={gx - 5} y={barY - 2} width={10} height={barH + 10} rx={3} fill={C.ink} />
        <g transform={`rotate(${open ? -70 : 0} ${gx} ${barY + barH})`}>
          <rect x={gx + 4} y={barY + 6} width={10} height={barH - 12} rx={3} fill="#FFFFFF" stroke={C.ink} strokeWidth={2.5} />
          <line x1={gx + 4} y1={barY + 16} x2={gx + 14} y2={barY + 26} stroke={C.ink} strokeWidth={3} />
          <line x1={gx + 4} y1={barY + 36} x2={gx + 14} y2={barY + 46} stroke={C.ink} strokeWidth={3} />
        </g>
      </g>
    );
  };

  const Pin = (m: number, pale: boolean) => {
    const xm = X(m);
    return (
      <g pointerEvents="none" data-tb={pale ? "pale" : "pin"}>
        <line x1={xm} y1={barY + 3} x2={xm} y2={barY + barH - 3} stroke={pale ? TB_GREY : C.ink} strokeWidth={pale ? 4 : 5} strokeDasharray={pale ? "8 6" : undefined} strokeLinecap="round" />
        <circle cx={xm} cy={barMid} r={pale ? 11 : 15} fill={pale ? "#FFFFFF" : C.ink} stroke={pale ? TB_GREY : "#FFFFFF"} strokeWidth={4} filter={pale ? undefined : "url(#tbSoftShadow)"} />
      </g>
    );
  };

  /* the child's four digits as a moment, when they name one (a pale pin) */
  const childT = (v: any) => {
    const d = String(v ?? "").replace(/[^0-9]/g, "");
    if (d.length !== 4) return null;
    const h = Number(d.slice(0, 2)), m = Number(d.slice(2));
    if (h === 24 && m === 0) return 1440;
    return h < 24 && m < 60 ? h * 60 + m : null;
  };

  const Cells = (m: number, digits: string, mode: "empty" | "full" | "pen") => {
    const cx = cellX(m), four = tbFour(m), by = cellY + cellH / 2 + dSize * 0.36;
    return (
      <g pointerEvents="none">
        {[0, 1, 2, 3].map((k) => (
          <g key={k}>
            <rect x={cx + k * pitch} y={cellY} width={72} height={cellH} rx={10} fill="#FAF8F5" stroke={k < 2 ? TB_HR : TB_MN} strokeWidth={4} />
            <rect x={cx + k * pitch + 3} y={cellY + 3} width={66} height={12} rx={6} fill="#000000" fillOpacity={0.04} />
          </g>
        ))}
        {mode === "full" && digits.split("").map((d, k) => (
          <text key={k} x={cx + k * pitch + 36} y={by} textAnchor="middle" fontSize={dSize} fontWeight={700} fill={k < 2 ? TB_HRI : TB_MNI}>{d}</text>
        ))}
        {mode === "pen" && <PencilText text={four.slice(0, 2)} x={cx - 4} y={by} size={dSize} step={pitch} align="start" color={TB_HRI} chars={Math.min(2, S.pc)} />}
        {mode === "pen" && <PencilText text={four.slice(2)} x={cx + 2 * pitch - 4} y={by} size={dSize} step={pitch} align="start" color={TB_MNI} chars={Math.max(0, S.pc - 2)} />}
        <text x={cx + 4 * pitch + 6} y={cellY + cellH / 2 + (dev ? 17 : 11)} fontSize={tbFit(tx("hours"), 104, T.label, lang)} fontWeight={600} fill={C.ink}>{tx("hours")}</text>
      </g>
    );
  };

  const Tag = (m: number, digits: string, mode: "empty" | "full" | "pen", note: any) => {
    const x = tagX(m);
    return (
      <g pointerEvents="none">
        <rect x={x} y={tagY} width={TW} height={TH} rx={18} fill="url(#tbGradCard)" stroke={C.ink} strokeWidth={3} filter="url(#tbCardShadow)" />
        <rect x={x + 3} y={tagY + 3} width={TW - 6} height={20} rx={10} fill="#FFFFFF" fillOpacity={0.6} />
        {clockText(m, dev ? T.prompt : T.speech, x + 22, tagY + (dev ? 54 : 48))}
        {Cells(m, digits, mode)}
        {note}
      </g>
    );
  };

  /* phase 3: "Day's end / 2400 hours" beside the right-hand post, in the top band (the p.m. word moves left to make room) */
  const dayCard = () => {
    const a = tx("Day's end"), b = tx("2400 hours"), fs = 30;
    const cw = Math.ceil(Math.max(tbEm(a), tbEm(b)) * fs) + 24;
    /* close to the right moon (its picture starts at X(1440) - 38), so the p.m. word keeps its size */
    return { a, b, fs, cw, x: X(1440) - 44 - cw };
  };
  /* top level with the glow (DY + 10), bottom 14 above the hour digits' ink (their tops at about DY + 98) */
  const DayEnd = (lit: boolean) => {
    const { a, b, fs, cw, x } = dayCard();
    return (
      <g pointerEvents="none" filter="url(#tbSoftShadow)">
        <rect x={x} y={10 + DY} width={cw} height={74} rx={14} fill={lit ? "#FFF1B8" : "#FFFFFF"} stroke={C.ink} strokeWidth={lit ? 5 : 2.5} />
        <text x={x + cw / 2} y={43 + DY} textAnchor="middle" fontSize={fs} fontWeight={600} fill={C.ink}>{a}</text>
        <text x={x + cw / 2} y={74 + DY} textAnchor="middle" fontSize={fs} fontWeight={700} fill={C.ink}>{b}</text>
      </g>
    );
  };

  const SlideKey = (enabled: boolean) => {
    const k = { x: box.w / 2 - 120, y: 442, w: 240, h: 72 };
    return (
      <g data-tb="slidekey">
        <Key id="slide" label={tx("Slide")} x={k.x} y={k.y} w={k.w} h={k.h} C={C} tone="key" disabled={!enabled} onClick={() => slide(true)}>
          {/* Devanagari and Gujarati ink rides above the line (matras): 6 lower to sit centred like English */}
          <text y={dev ? 17 : 11} textAnchor="middle" fontSize={tbFit(tx("Slide"), 210, T.label, lang)} fontWeight={700} fill={enabled ? toneInk("key", C.ink) : TB_OFF}>{tx("Slide")}</text>
        </Key>
        {warm && stepOn === "slide" && <Invite x={k.x + k.w / 2} y={k.y + k.h / 2} w={k.w} h={k.h} rx={RAD.key} C={C} />}
      </g>
    );
  };

  /* phases 1 to 3, and free play: the marker, its tag, the Slide key */
  const Read = () => {
    const m0 = tNow === null ? 0 : tNow;
    const m = corr && !S.acted && target !== null ? target : m0;
    const gateOpen = (n === 2 || free) && m >= MODEL.gateAt;
    const pinT = corr ? childT(wrong.value) : null;
    const mode = free || done || corr ? "full" : warm ? "pen" : "empty";
    const digits = free ? tbFour(m0) : corr || done ? item.answer : "";
    const note = (
      <g>
        {gateOpen && (
          <g filter="url(#tbSoftShadow)">
            <rect x={tagX(m) + TW - (dev ? 152 : 176)} y={tagY + 8} width={dev ? 132 : 156} height={headH - 14} rx={(headH - 14) / 2} fill="#FFF3E6" stroke={TB_HR} strokeWidth={2.5} />
            <text x={tagX(m) + TW - (dev ? 86 : 98)} y={tagY + 8 + (headH - 14) / 2 + (dev ? 10 : 11)} textAnchor="middle" fontSize={dev ? 30 : T.label} fontWeight={700} fill={TB_HRI}>{tx("add 12")}</text>
          </g>
        )}
      </g>
    );
    const readOn = warm && S.acted;
    const day24 = corr && String(wrong.value).replace(/[^0-9]/g, "") === "2400";
    return (
      <g>
        {pinT !== null && pinT !== m && Pin(pinT, true)}
        {Pin(m, false)}
        {Tag(m, digits, mode, note)}
        {warm && (
          <g>
            <Hit id="read" x={cellX(m) - 8} y={cellY - 8} w={4 * pitch + 8} h={cellH + 16} onPress={() => { touch(); read(); }} label={tx("Four boxes")} />
            {readOn && stepOn === "read" && <Invite x={cellX(m) + 2 * pitch - 4} y={cellY + cellH / 2} w={4 * pitch} h={cellH} rx={12} C={C} />}
          </g>
        )}
        {free && (
          <g {...control("marker", tx("Marker"))} {...drag.bind("m")} onKeyDown={(e: any) => {
            const d = e.key === "ArrowLeft" || e.key === "ArrowDown" ? -5 : e.key === "ArrowRight" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " " ? 5 : 0;
            if (!d) return;
            e.preventDefault(); e.stopPropagation();
            if (e.repeat && (e.key === "Enter" || e.key === " ")) return;
            put({ t: snap((S.t || 0) + d) }); api.sfx.tick();
          }}>
            <rect x={X(m) - 40} y={barY - 20} width={80} height={barH + 44} rx={14} fill="transparent" />
          </g>
        )}
        {free ? FreeKeys() : SlideKey(!S.acted && (stage === "ask" || warm))}
        {/* what the child sent (the slot is empty from the miss on), left of the Slide key */}
        {corr && (
          <text x={box.w / 2 - 136} y={442 + 36 + 11} textAnchor="end" fontSize={T.micro} fontWeight={600} fill={C.ink} pointerEvents="none">
            <tspan>{tx("you wrote")}</tspan><tspan dx={10}>{String(wrong.value)}</tspan>
          </text>
        )}
        {n === 3 && !free && DayEnd(day24)}
      </g>
    );
  };

  const FreeKeys = () => {
    const y = 442, w = 280, h = 72, xa = box.w / 2 - w - 10, xb = box.w / 2 + 10;
    return (
      <g>
        <Key id="back5" label={tx("5 min back")} x={xa} y={y} w={w} h={h} C={C} tone="key" onClick={() => { put({ t: snap((S.t || 0) - 5) }); api.sfx.tick(); }}>
          <text y={11} textAnchor="middle" fontSize={tbFit(tx("5 min back"), w - 28, T.label, lang)} fontWeight={700} fill={toneInk("key", C.ink)}>{tx("5 min back")}</text>
        </Key>
        <Key id="on5" label={tx("5 min on")} x={xb} y={y} w={w} h={h} C={C} tone="key" onClick={() => { put({ t: snap((S.t || 0) + 5) }); api.sfx.tick(); }}>
          <text y={11} textAnchor="middle" fontSize={tbFit(tx("5 min on"), w - 28, T.label, lang)} fontWeight={700} fill={toneInk("key", C.ink)}>{tx("5 min on")}</text>
        </Key>
      </g>
    );
  };

  /* phase 4: the train ticket, Take 12, the twin box and the a.m. / p.m. keys */
  const Board = () => {
    const showT = done || corr || (warm && S.half);
    const tt = warm ? W4.t : item.t;
    const picked = S.half;
    const twinH = done || corr ? String(warm ? h12of(h4) : item.answer[0]) : warm && S.half ? String(h12of(h4)) : "";
    const twinM = done || corr || (warm && S.half) ? g4.slice(2) : "";
    const twinHalf = done || corr ? (warm ? W4.half : item.half) : warm && S.half ? S.half : "";
    const pinT = corr ? (() => {
      const p = slotPartsOf(wrong.value, 2), hh = Number(p[0]), mm = Number(p[1]);
      if (p[0] === "" || p[1] === "" || !(hh >= 1 && hh <= 12) || mm > 59) return null;
      const hf = S.half || item.half;
      return ((hh % 12) + (hf === "p.m." ? 12 : 0)) * 60 + mm;
    })() : null;
    const keyBtn = (id: string, h: string, r: any) => {
      const on = picked === h, tone = on ? "enter" : "key", off = !(warm || stage === "ask");
      return (
        <g key={id}>
          <Key id={id} label={tx(h)} x={r.x} y={r.y} w={r.w} h={r.h} C={C} tone={tone} disabled={off} onClick={() => pick(h, true)}>
            <text y={11} textAnchor="middle" fontSize={tbFit(tx(h), r.w - 28, T.label, lang)} fontWeight={700} fill={off ? TB_OFF : toneInk(tone, C.ink)}>{tx(h)}</text>
          </Key>
          {warm && stepOn === id && <Invite x={r.x + r.w / 2} y={r.y + r.h / 2} w={r.w} h={r.h} rx={RAD.key} C={C} />}
        </g>
      );
    };
    const takeOn = big4 && !S.took && (warm || stage === "ask") && !S.tb;
    const writtenTc = S.took || corr || done ? takeLine.length : S.tc;
    return (
      <g>
        {pinT !== null && pinT !== tt && Pin(pinT, true)}
        {showT && (
          <g pointerEvents="none">
            {Pin(tt, false)}
            {(() => {
              const rw = Math.ceil((tbEm(tbClock(tt)) + tbEm(tx(tbHalf(tt)))) * T.prompt) + 10 + 48, rh = dev ? 78 : 66;
              const rx = Math.max(0, Math.min(Math.min(box.w, kx) - rw, X(tt) - rw / 2));
              return (
                <g>
                  <rect x={rx} y={DY + 4 - rh} width={rw} height={rh} rx={16} fill="url(#tbGradCard)" stroke={C.ink} strokeWidth={3} filter="url(#tbCardShadow)" />
                  {clockText(tt, T.prompt, rx + rw / 2, DY + 4 - rh + (dev ? 52 : 47), "middle")}
                </g>
              );
            })()}
          </g>
        )}
        {/* the ticket: a plain card under the picture, the given time in code over it */}
        <g pointerEvents="none" filter="url(#tbCardShadow)">
          <rect x={TK.x} y={TK.y} width={TK.w} height={TK.h} rx={14} fill="#FCEFC7" stroke={C.ink} strokeWidth={2.5} />
          <rect x={TK.x} y={TK.y} width={34} height={TK.h} rx={10} fill="#D9822B" />
          <Skin name="train_ticket" x={TK.x} y={TK.y} w={TK.w} h={TK.h} fit="stretch" />
          <rect x={TK.x + 50} y={TK.y + 14} width={TK.w - 66} height={TK.h - 28} rx={12} fill="#FFFFFF" fillOpacity={0.92} stroke="#E5D6B8" strokeWidth={1.5} />
          <text x={TK.x + 50 + (TK.w - 66) / 2} y={TK.y + 82} textAnchor="middle" fontSize={T.display} fontWeight={700}>
            <tspan fill={TB_HRI}>{g4.slice(0, 2)}</tspan><tspan fill={TB_MNI}>{g4.slice(2)}</tspan>
          </text>
          <text x={TK.x + 50 + (TK.w - 66) / 2} y={TK.y + 132} textAnchor="middle" fontSize={tbFit(tx("hours"), TK.w - 90, T.label, lang)} fontWeight={600} fill={C.ink}>{tx("hours")}</text>
        </g>
        {/* Take 12, and what the pencil wrote under it */}
        <Key id="take" label={tx("Take 12")} x={TAKE.x} y={TAKE.y} w={TAKE.w} h={TAKE.h} C={C} tone="key" disabled={!takeOn} onClick={() => take(true)}>
          <text y={11} textAnchor="middle" fontSize={tbFit(tx("Take 12"), TAKE.w - 20, T.label, lang)} fontWeight={700} fill={takeOn ? toneInk("key", C.ink) : TB_OFF}>{tx("Take 12")}</text>
        </Key>
        {warm && stepOn === "take" && <Invite x={TAKE.x + TAKE.w / 2} y={TAKE.y + TAKE.h / 2} w={TAKE.w} h={TAKE.h} rx={RAD.key} C={C} />}
        {big4 && writtenTc > 0 && <PencilText text={takeLine} x={lineAt.x} y={lineAt.y} size={44} align="start" color={TB_HRI} chars={writtenTc} />}
        {/* the twin: hours : minutes and the half, empty until it is earned */}
        <g pointerEvents="none" filter="url(#tbCardShadow)">
          <rect x={TWIN.x} y={TWIN.y} width={92} height={TWIN.h} rx={12} fill="#FAF8F5" stroke={TB_HR} strokeWidth={4} />
          <text x={TWIN.x + 106} y={TWIN.y + 58} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={C.ink}>:</text>
          <rect x={TWIN.x + 120} y={TWIN.y} width={92} height={TWIN.h} rx={12} fill="#FAF8F5" stroke={TB_MN} strokeWidth={4} />
          <text x={TWIN.x + 46} y={TWIN.y + 62} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={TB_HRI}>{twinH}</text>
          <text x={TWIN.x + 166} y={TWIN.y + 62} textAnchor="middle" fontSize={T.xl} fontWeight={700} fill={TB_MNI}>{twinM}</text>
          {twinHalf && <text x={TWIN.x + 222} y={TWIN.y + 56} fontSize={tbFit(tx(twinHalf), Math.min(lang === "en" ? 110 : 130, box.w - TWIN.x - 222 - 20), T.prompt, "en")} fontWeight={700} fill={twinHalf === "a.m." ? TB_AMI : TB_PMI}>{tx(twinHalf)}</text>}
        </g>
        {keyBtn("am", "a.m.", AMK)}
        {keyBtn("pm", "p.m.", PMK)}
        {corr && (() => {
          /* what the child sent, from wrong.value (the slot is empty from the miss on) */
          const p = slotPartsOf(wrong.value, 2);
          /* in the band above the line, on the side away from the readout card (under the board it ran into the a.m. key) */
          const room = Math.min(box.w, kx), right = X(tt) < room / 2;
          return <text x={right ? room - 12 : 12} y={DY + 4 - (dev ? 78 : 66) / 2 + 10} textAnchor={right ? "end" : "start"} fontSize={T.micro} fontWeight={600} fill={C.ink} pointerEvents="none">
            <tspan>{tx("you wrote")}</tspan><tspan dx={10}>{(p[0] || "?") + ":" + (p[1] || "?")}</tspan>
          </text>;
        })()}
        {halfMiss && <rect x={AMK.x - 8} y={AMK.y - 8} width={PMK.x + PMK.w - AMK.x + 16} height={AMK.h + 18} rx={RAD.key + 6} fill="none" stroke={C.ink} strokeWidth={5} pointerEvents="none" />}
      </g>
    );
  };

  return (
    <g>
      <defs>
        <filter id="tbCardShadow" x="-10%" y="-10%" width="125%" height="125%">
          <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#2B2B2B" floodOpacity="0.12" />
        </filter>
        <filter id="tbBarShadow" x="-5%" y="-10%" width="110%" height="135%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#2B2B2B" floodOpacity="0.18" />
        </filter>
        <filter id="tbSoftShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#2B2B2B" floodOpacity="0.14" />
        </filter>
        <linearGradient id="tbGradAm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7CD2FB" />
          <stop offset="100%" stopColor="#419ECE" />
        </linearGradient>
        <linearGradient id="tbGradPm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F9C24A" />
          <stop offset="100%" stopColor="#D98A00" />
        </linearGradient>
        <linearGradient id="tbGradSun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF2A3" />
          <stop offset="100%" stopColor="#F6C445" />
        </linearGradient>
        <linearGradient id="tbGradMoon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F3E7A8" />
        </linearGradient>
        <linearGradient id="tbGradCard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FAF8F3" />
        </linearGradient>
      </defs>
      {Timeline()}
      {P4 ? Board() : Read()}
    </g>
  );
}

/* the summary page's drawing of the child's last right answer in a phase */
function Thumb({ result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  const item = it || (last && last.it) || {};
  if (!last || !item.answer) return null;
  if (item.half) {
    /* one row, the tile tinted by its half: the child's 12-hour time and its half, both at 32 */
    const [hh, mm] = slotPartsOf(last.value, 2);
    const am = item.half === "a.m.", t12 = hh + ":" + mm, hw = tx(item.half);
    const fs = Math.min(T.label, Math.floor((w - 40) / (tbEm(t12) + tbEm(hw) + 0.3)));
    return (
      <g>
        <rect x={0} y={0} width={w} height={h} rx={14} fill={am ? "#DCEFFB" : "#FBEBCB"} stroke={C.rule} strokeWidth={1.5} />
        <text x={w / 2} y={h / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight={700} fill={C.ink}>
          <tspan>{t12}</tspan><tspan dx={fs * 0.3} fill={am ? TB_AMI : TB_PMI}>{hw}</tspan>
        </text>
      </g>
    );
  }
  const d = String(last.value ?? "").replace(/[^0-9]/g, "").padStart(4, "0").slice(0, 4);
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill="#FFFFFF" stroke={C.rule} strokeWidth={1.5} />
      {d.split("").map((c, k) => (
        <g key={k}>
          <rect x={10 + k * 36} y={h / 2 - 22} width={32} height={44} rx={6} fill="#FFFFFF" stroke={k < 2 ? TB_HR : TB_MN} strokeWidth={2.5} />
          <text x={26 + k * 36} y={h / 2 + 10} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={k < 2 ? TB_HRI : TB_MNI}>{c}</text>
        </g>
      ))}
    </g>
  );
}

function TimelineBoard(props: any) {
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

export default TimelineBoard;