/* ═══ M1.S1.T3.C11.2D1 · morning_or_night · tool-specific part ═══════════════════════════════
   runtime/runtime.tsx (+ runtime/mascot.tsx) is prepended at build: header, canvas, slot + pad, bubble + mascot, phase dots,
   window.toolApi, sound effects, the printed bubble, scoring, events, idle and restart are the runtime's (r3, SILENT: the bubble is
   the guide; Hindi and Gujarati come from the TR table). NO imports; only the five host hooks. Follow docs/LAYOUT.md, PATTERNS.md.
   THREE phases (the owner, 2026-10-28): 1 a day has 24 hours (two rounds of the hour hand), 2 noon and midnight (the sun or
   moon marker on the day strip), 3 a.m. and p.m. (a time card of everyday situations: choose, drop, or type the time and tap
   the label). One shared clock family: hour hand vermilion, minute hand deep blue, a.m. sky blue, p.m. amber, reached green.
   Edit, never rewrite. Concepts are verbatim (check compares them). */

const TOOL_ID = "morning_or_night";
const MEDIA_ID = "M1.S1.T3.C11.2D1";
const TOOL_NAME = "Morning or Night";
const CHROME = {"dim":"#9AA4AC","ink":"#2B2B2B","rule":"#C9BCA6","panel":"#F2E4CE","paper":"#FFFDF7","accent":"#5B6770"};
/* kept for the tool object's shape (and the sidecar); nothing speaks from r30 */
const VOICE = {"rate":0.92,"pitch":1.06};

/* printed on the bubble before phase 1's teach lines only (not shown when phase 1 has steps) */
const OPENING = ["A whole day on one strip, sun and moon."];
const FINISH_LINE = "You put every time on the right half of the day.";
/* printed when the child opens Free play: the sun slides (drag it, or turn the red hand) and a picture card sets its own time */
const FREE_LINE = "Free play. Slide the marker, or tap a picture to see its time.";

/* THE START PAGE: the day strip with its sun and its two moons, a wall clock and the school, drawn in the 1200 x 340 box. */
const START_HOOK = "A whole day on one strip, sun and moon.";
function StartArt({ box, C, lang, tx }: any) {
  const sx = 70, sw = box.w - 140, sy = 236, sh = 70;
  const cells: any[] = [];
  for (let i = 0; i < 24; i++) cells.push(<rect key={i} x={sx + (i * sw) / 24} y={sy} width={sw / 24} height={sh} fill={i < 12 ? MN_AM : MN_PM} stroke={C.ink} strokeWidth={2.2} />);
  const mid = sx + sw / 2;
  return (
    <g>
      <defs>
        <linearGradient id="mn-start-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#87CEEB" />
          <stop offset="100%" stopColor="#BFE3F5" />
        </linearGradient>
      </defs>
      <rect x={sx - 10} y={20} width={sw + 20} height={206} rx={RAD.panel} fill="url(#mn-start-sky)" stroke={C.rule} strokeWidth={2} />
      <rect x={sx - 10} y={196} width={sw + 20} height={30} fill="#99B855" />
      <circle cx={mid} cy={104} r={64} fill="#F6C945" />
      <Skin name="sun" x={mid - 66} y={38} w={132} h={133} />
      <circle cx={sx + 36} cy={150} r={40} fill="#F4E9C4" />
      <Skin name="moon" x={sx + 36 - 37} y={150 - 40} w={74} h={80} />
      <circle cx={sx + sw - 36} cy={150} r={40} fill="#F4E9C4" />
      <Skin name="moon" x={sx + sw - 36 - 37} y={150 - 40} w={74} h={80} />
      <rect x={sx + sw * 0.25 - 70} y={100} width={140} height={96} rx={8} fill="#EFD9B0" />
      <Skin name="school" x={sx + sw * 0.25 - 80} y={96} w={160} h={100} />
      <circle cx={sx + sw * 0.75} cy={110} r={74} fill="#DCE5EC" stroke={C.ink} strokeWidth={2} />
      <circle cx={sx + sw * 0.75} cy={110} r={70} fill={C.paper} stroke={C.ink} strokeWidth={5} />
      <line x1={sx + sw * 0.75} y1={110} x2={sx + sw * 0.75} y2={66} stroke={MN_HR} strokeWidth={11} strokeLinecap="round" />
      <line x1={sx + sw * 0.75} y1={110} x2={sx + sw * 0.75} y2={52} stroke={MN_MIN} strokeWidth={7} strokeLinecap="round" />
      <circle cx={sx + sw * 0.75} cy={110} r={8} fill={C.ink} />
      <circle cx={sx + sw * 0.75} cy={110} r={3} fill="#FFFFFF" />
      {cells}
      <rect x={sx} y={sy} width={sw} height={sh} rx={6} fill="none" stroke={C.ink} strokeWidth={4.5} />
      <line x1={mid} y1={sy - 8} x2={mid} y2={sy + sh + 8} stroke={C.ink} strokeWidth={6} />
    </g>
  );
}

/* Hindi and Gujarati (docs/PATTERNS.md §11): the English stays exactly as the checks read it; this table is keyed by that English,
   byte for byte. Filled in the language pass, once the English is final. Empty = English only. */
const TR: any = {
  hi: {
    "Morning or Night": "सुबह या रात",
    "A day has twenty-four hours": "एक दिन में चौबीस घंटे होते हैं",
    "Noon and midnight": "दोपहर और आधी रात",
    "a.m. and p.m.": "पूर्वाह्न और अपराह्न",
    "Turn the hour hand round the clock. How many times does it go round in a day?": "घंटे की सुई को घड़ी में घुमाओ। वह एक दिन में कितनी बार घूमती है?",
    "Both hands are at the twelve. Is the sun high, or is the moon out?": "दोनों सुइयाँ 12 पर हैं। सूरज ऊपर है या चाँद निकला है?",
    "Is it before noon or after noon? Drop it on its half.": "यह दोपहर से पहले है या बाद में? इसे इसके भाग पर रखो।",
    "Turn the short red hand, the hour hand, once round the clock.": "छोटी लाल सुई (घंटे की सुई) को घड़ी में एक चक्कर घुमाओ।",
    "Drag the red hand, or tap it.": "लाल सुई को खींचो, या उसे छुओ।",
    "Turn the red hand round the clock a second time.": "लाल सुई को घड़ी में दूसरी बार घुमाओ।",
    "The red hand goes round once more.": "लाल सुई एक चक्कर और लगाती है।",
    "Slide the marker along the strip to the very middle.": "सूरज या चाँद को पट्टी पर खिसकाकर ठीक बीच में लाओ।",
    "Drag the marker, or tap it, to the middle.": "सूरज या चाँद को बीच तक खींचो, या उसे छुओ।",
    "Now slide the marker on to the far end of the strip.": "अब सूरज या चाँद को पट्टी के दूसरे छोर तक खिसकाओ।",
    "Keep going to the right end.": "दाएँ छोर तक चलते रहो।",
    "Slide the marker to a time before the middle mark.": "सूरज या चाँद को बीच के निशान से पहले वाले समय पर खिसकाओ।",
    "Drag the marker to the left of the middle.": "सूरज या चाँद को बीच से बाईं ओर खींचो।",
    "Now slide the marker to a time after the middle mark.": "अब सूरज या चाँद को बीच के निशान के बाद वाले समय पर खिसकाओ।",
    "Drag the marker to the right of the middle.": "सूरज या चाँद को बीच से दाईं ओर खींचो।",
    "Count the rounds, then add up their hours.": "चक्कर गिनो, फिर उनके घंटे जोड़ो।",
    "Each round has the same hours, so add them.": "हर चक्कर में उतने ही घंटे हैं, इसलिए जोड़ो।",
    "Say what you see in the sky at that 12.": "उस 12 बजे आसमान में जो दिखे, वह बताओ।",
    "Each of these twelves is written as a word.": "इन बारह बजे वाले हर समय को एक शब्द से लिखते हैं।",
    "Say what the sky looks like at that time of day.": "बताओ, उस समय आसमान कैसा दिखता है।",
    "Blue is the half before noon, and orange is the half after noon.": "नीला भाग दोपहर से पहले का है, और नारंगी भाग दोपहर के बाद का।",
    "The hour hand goes round twice in a day, so a day has 24 hours.": "घंटे की सुई एक दिन में दो बार घूमती है, इसलिए एक दिन में 24 घंटे होते हैं।",
    "Noon and midnight both show 12 o'clock: one is by day, one is by night.": "दोपहर और आधी रात, दोनों में 12 बजे होते हैं: एक दिन में, एक रात में।",
    "Morning times end in a.m., and afternoon and evening times end in p.m.": "सुबह के समय के साथ पूर्वाह्न और दोपहर के बाद के समय के साथ अपराह्न लिखो।",
    "You learned: a day has 24 hours, two rounds of the hour hand.": "तुमने सीखा: एक दिन में 24 घंटे, घंटे की सुई के दो चक्कर।",
    "You learned: noon and midnight stand alone, with no a.m./p.m.": "तुमने सीखा: दोपहर और आधी रात के साथ पूर्वाह्न/अपराह्न नहीं लगता।",
    "You learned: write a.m. before noon and p.m. after it.": "तुमने सीखा: दोपहर से पहले पूर्वाह्न और बाद में अपराह्न लिखो।",
    "Turn the hour hand twice round the clock: how many hours pass in all?": "घंटे की सुई को घड़ी में दो बार घुमाओ: कुल कितने घंटे बीते?",
    "Hours in two rounds?": "दो चक्कर में कितने घंटे?",
    "One round of the hour hand is 12 hours.": "घंटे की सुई का एक चक्कर 12 घंटे का होता है।",
    "Slide the marker across the whole day: how many rounds does the hour hand make?": "सूरज या चाँद को पूरे दिन खिसकाओ: घंटे की सुई कितने चक्कर लगाती है?",
    "Rounds in a day?": "एक दिन में कितने चक्कर?",
    "Watch the red hand while the marker slides along.": "सूरज या चाँद के खिसकते समय लाल सुई को देखो।",
    "Slide the marker from midnight to midnight: how many rounds, and how many hours?": "सूरज या चाँद को आधी रात से आधी रात तक खिसकाओ: कितने चक्कर और कितने घंटे?",
    "Rounds and hours?": "चक्कर और घंटे?",
    "The first box is the rounds and the second is the hours.": "पहला खाना चक्कर का है और दूसरा घंटों का।",
    "rounds": "चक्कर",
    "hours": "घंटे",
    "hour": "घंटा",
    "minutes": "मिनट",
    "The cook sees both hands at 12 and the sun is high: is it noon or midnight?": "रसोइये ने देखा कि दोनों सुइयाँ 12 पर हैं और सूरज ऊपर है: दोपहर या आधी रात?",
    "Which 12 is it?": "यह कौन-सा 12 है?",
    "Both hands are at 12, so the sky must tell you.": "दोनों सुइयाँ 12 पर हैं, इसलिए आसमान ही बताएगा।",
    "The moon is out: slide it to the 12 of the night, then press Enter.": "चाँद निकला है: उसे रात के 12 पर खिसकाओ, फिर दर्ज करें बटन दबाओ।",
    "Slide to the 12": "12 तक खिसकाओ",
    "Is the sun or the moon out at the 12 you chose?": "तुम्हारे चुने 12 पर सूरज निकला है या चाँद?",
    "The lunch bell rings at the highest sun: what is this 12 called?": "सूरज सबसे ऊपर होने पर खाने की घंटी बजती है: इस 12 को क्या कहते हैं?",
    "What is it called?": "इसे क्या कहते हैं?",
    "Is the sun up when the lunch bell rings?": "खाने की घंटी बजने पर क्या सूरज ऊपर है?",
    "The street lamp switches on at 5:40 in the evening: is that a.m., or p.m.?": "शाम 5:40 पर सड़क की बत्ती जलती है: यह पूर्वाह्न है या अपराह्न?",
    "Which half?": "कौन-सा भाग?",
    "Is the evening before noon, or after noon?": "क्या शाम दोपहर से पहले है या बाद में?",
    "Ria packs her bag at 7:15 in the morning: drop the card on its half.": "रिया सुबह 7:15 पर बस्ता लगाती है: कार्ड को उसके भाग पर रखो।",
    "Drop on its half": "अपने भाग पर रखो",
    "Look at the middle mark: noon is there.": "बीच का निशान देखो: वहाँ दोपहर है।",
    "Lunch is in the afternoon: type the clock's time, tap the label, then Enter.": "दोपहर के बाद खाना है: घड़ी का समय लिखो, सही नाम छुओ, फिर दर्ज करें।",
    "Write the time": "समय लिखो",
    "Check both the time and the label on the card.": "कार्ड पर समय और नाम, दोनों जाँचो।",
    "noon": "दोपहर",
    "midnight": "आधी रात",
    "a.m.": "पूर्वाह्न",
    "p.m.": "अपराह्न",
    "A whole day on one strip, sun and moon.": "एक पट्टी पर पूरा दिन, सूरज और चाँद।",
    "Free play. Slide the marker, or tap a picture to see its time.": "मुक्त खेल। सूरज या चाँद को खिसकाओ, या कोई चित्र छूकर उसका समय देखो।",
    "You put every time on the right half of the day.": "तुमने हर समय को दिन के सही भाग पर रखा।",
    "Every hour of the day is on the strip now.": "दिन का हर घंटा अब पट्टी पर है।",
    "One round for each half of the day.": "दिन के हर आधे भाग में एक चक्कर।",
    "Two rounds of 12 hours make 24 hours.": "12 घंटे के दो चक्कर मिलकर 24 घंटे बनते हैं।",
    "The sun is high at 12 in the day, so it is noon.": "दिन में 12 बजे सूरज ऊपर होता है, इसलिए यह दोपहर है।",
    "The moon is out at night, so it is midnight, with no a.m./p.m.": "रात को चाँद निकलता है, इसलिए यह आधी रात है, पूर्वाह्न/अपराह्न नहीं।",
    "Noon is written as a word of its own.": "दोपहर एक अलग शब्द से लिखा जाता है।",
    "After noon is p.m., so it is 5:40 p.m.": "दोपहर के बाद अपराह्न होता है, इसलिए यह 5:40 अपराह्न है।",
    "Before noon is a.m., so it is 7:15 a.m.": "दोपहर से पहले पूर्वाह्न होता है, इसलिए यह 7:15 पूर्वाह्न है।",
    "Lunch is after noon, so it is 1:30 p.m.": "खाना दोपहर के बाद है, इसलिए यह 1:30 अपराह्न है।",
    "24 hours": "24 घंटे",
    "2 rounds": "2 चक्कर",
    "2 rounds, 24 hours": "2 चक्कर, 24 घंटे",
    "Hour hand": "घंटे की सुई",
    "Marker": "सूरज या चाँद",
    "Picture card": "चित्र कार्ड",
    "Slide the moon first, then press Enter.": "पहले चाँद को खिसकाओ, फिर दर्ज करें बटन दबाओ।",
    "Drop the card on a half first, then press Enter.": "पहले कार्ड को किसी भाग पर रखो, फिर दर्ज करें बटन दबाओ।",
    "lunch box": "टिफिन",
  },
  gu: {
    "Morning or Night": "સવાર કે રાત",
    "A day has twenty-four hours": "એક દિવસમાં ચોવીસ કલાક હોય છે",
    "Noon and midnight": "બપોર અને અડધી રાત",
    "a.m. and p.m.": "પૂર્વાહ્ન અને અપરાહ્ન",
    "Turn the hour hand round the clock. How many times does it go round in a day?": "કલાકના કાંટાને ઘડિયાળમાં ફેરવો. તે એક દિવસમાં કેટલી વાર ફરે છે?",
    "Both hands are at the twelve. Is the sun high, or is the moon out?": "બંને કાંટા 12 પર છે. સૂરજ ઉપર છે કે ચાંદો નીકળ્યો છે?",
    "Is it before noon or after noon? Drop it on its half.": "આ બપોર પહેલાં છે કે પછી? તેને તેના ભાગ પર મૂકો.",
    "Turn the short red hand, the hour hand, once round the clock.": "નાના લાલ કાંટાને (કલાકના કાંટાને) ઘડિયાળમાં એક આંટો ફેરવો.",
    "Drag the red hand, or tap it.": "લાલ કાંટાને ખેંચો, અથવા તેને સ્પર્શ કરો.",
    "Turn the red hand round the clock a second time.": "લાલ કાંટાને ઘડિયાળમાં બીજી વાર ફેરવો.",
    "The red hand goes round once more.": "લાલ કાંટો એક આંટો વધુ ફરે છે.",
    "Slide the marker along the strip to the very middle.": "સૂરજ કે ચાંદાને પટ્ટી પર સરકાવીને બરાબર વચ્ચે લાવો.",
    "Drag the marker, or tap it, to the middle.": "સૂરજ કે ચાંદાને વચ્ચે સુધી ખેંચો, અથવા તેને સ્પર્શ કરો.",
    "Now slide the marker on to the far end of the strip.": "હવે સૂરજ કે ચાંદાને પટ્ટીના બીજા છેડા સુધી સરકાવો.",
    "Keep going to the right end.": "જમણા છેડા સુધી ચાલુ રાખો.",
    "Slide the marker to a time before the middle mark.": "સૂરજ કે ચાંદાને વચ્ચેના નિશાન પહેલાંના સમય પર સરકાવો.",
    "Drag the marker to the left of the middle.": "સૂરજ કે ચાંદાને વચ્ચેથી ડાબી બાજુ ખેંચો.",
    "Now slide the marker to a time after the middle mark.": "હવે સૂરજ કે ચાંદાને વચ્ચેના નિશાન પછીના સમય પર સરકાવો.",
    "Drag the marker to the right of the middle.": "સૂરજ કે ચાંદાને વચ્ચેથી જમણી બાજુ ખેંચો.",
    "Count the rounds, then add up their hours.": "આંટા ગણો, પછી તેના કલાક ઉમેરો.",
    "Each round has the same hours, so add them.": "દરેક આંટામાં સરખા કલાક છે, તેથી ઉમેરો.",
    "Say what you see in the sky at that 12.": "તે 12 વાગ્યે આકાશમાં જે દેખાય તે કહો.",
    "Each of these twelves is written as a word.": "આ બધા બાર વાગ્યા એક શબ્દથી લખાય છે.",
    "Say what the sky looks like at that time of day.": "કહો, તે સમયે આકાશ કેવું દેખાય છે.",
    "Blue is the half before noon, and orange is the half after noon.": "વાદળી ભાગ બપોર પહેલાંનો છે, અને નારંગી ભાગ બપોર પછીનો.",
    "The hour hand goes round twice in a day, so a day has 24 hours.": "કલાકનો કાંટો એક દિવસમાં બે વાર ફરે છે, તેથી એક દિવસમાં 24 કલાક હોય છે.",
    "Noon and midnight both show 12 o'clock: one is by day, one is by night.": "બપોર અને અડધી રાત, બંનેમાં 12 વાગે છે: એક દિવસે, એક રાત્રે.",
    "Morning times end in a.m., and afternoon and evening times end in p.m.": "સવારના સમય સાથે પૂર્વાહ્ન અને બપોર પછીના સમય સાથે અપરાહ્ન લખો.",
    "You learned: a day has 24 hours, two rounds of the hour hand.": "તમે શીખ્યા: એક દિવસમાં 24 કલાક, કલાકના કાંટાના બે આંટા.",
    "You learned: noon and midnight stand alone, with no a.m./p.m.": "તમે શીખ્યા: બપોર અને અડધી રાત સાથે પૂર્વાહ્ન/અપરાહ્ન લખાતું નથી.",
    "You learned: write a.m. before noon and p.m. after it.": "તમે શીખ્યા: બપોર પહેલાં પૂર્વાહ્ન અને પછી અપરાહ્ન લખો.",
    "Turn the hour hand twice round the clock: how many hours pass in all?": "કલાકના કાંટાને ઘડિયાળમાં બે વાર ફેરવો: કુલ કેટલા કલાક થયા?",
    "Hours in two rounds?": "બે આંટામાં કેટલા કલાક?",
    "One round of the hour hand is 12 hours.": "કલાકના કાંટાનો એક આંટો 12 કલાકનો હોય છે.",
    "Slide the marker across the whole day: how many rounds does the hour hand make?": "સૂરજ કે ચાંદાને આખા દિવસ સુધી સરકાવો: કલાકનો કાંટો કેટલા આંટા ફરે છે?",
    "Rounds in a day?": "એક દિવસમાં કેટલા આંટા?",
    "Watch the red hand while the marker slides along.": "સૂરજ કે ચાંદો સરકે ત્યારે લાલ કાંટાને જુઓ.",
    "Slide the marker from midnight to midnight: how many rounds, and how many hours?": "સૂરજ કે ચાંદાને આખા દિવસ સુધી સરકાવો: કેટલા આંટા અને કેટલા કલાક?",
    "Rounds and hours?": "આંટા અને કલાક?",
    "The first box is the rounds and the second is the hours.": "પહેલું ખાનું આંટાનું અને બીજું કલાકનું છે.",
    "rounds": "આંટા",
    "hours": "કલાક",
    "hour": "કલાક",
    "minutes": "મિનિટ",
    "The cook sees both hands at 12 and the sun is high: is it noon or midnight?": "રસોઈયો જુએ છે કે બંને કાંટા 12 પર છે અને સૂરજ ઉપર છે: બપોર કે અડધી રાત?",
    "Which 12 is it?": "આ કયા બાર વાગ્યા છે?",
    "Both hands are at 12, so the sky must tell you.": "બંને કાંટા 12 પર છે, તેથી આકાશ જ કહેશે.",
    "The moon is out: slide it to the 12 of the night, then press Enter.": "ચાંદો નીકળ્યો છે: તેને રાતના 12 પર સરકાવો, પછી દાખલ કરો બટન દબાવો.",
    "Slide to the 12": "12 સુધી સરકાવો",
    "Is the sun or the moon out at the 12 you chose?": "તમે પસંદ કરેલા 12 પર સૂરજ છે કે ચાંદો?",
    "The lunch bell rings at the highest sun: what is this 12 called?": "સૂરજ સૌથી ઉપર હોય ત્યારે જમવાની ઘંટડી વાગે છે: આ 12 ને શું કહેવાય?",
    "What is it called?": "આને શું કહેવાય?",
    "Is the sun up when the lunch bell rings?": "જમવાની ઘંટડી વાગે ત્યારે શું સૂરજ ઉપર છે?",
    "The street lamp switches on at 5:40 in the evening: is that a.m., or p.m.?": "સાંજે 5:40 વાગ્યે શેરીનો દીવો ચાલુ થાય છે: આ પૂર્વાહ્ન છે કે અપરાહ્ન?",
    "Which half?": "કયો ભાગ?",
    "Is the evening before noon, or after noon?": "શું સાંજ બપોર પહેલાં છે કે પછી?",
    "Ria packs her bag at 7:15 in the morning: drop the card on its half.": "રિયા સવારે 7:15 વાગ્યે દફતર ભરે છે: કાર્ડ તેના ભાગ પર મૂકો.",
    "Drop on its half": "તેના ભાગ પર મૂકો",
    "Look at the middle mark: noon is there.": "વચ્ચેનું નિશાન જુઓ: ત્યાં બપોર છે.",
    "Lunch is in the afternoon: type the clock's time, tap the label, then Enter.": "બપોર પછી જમવાનું છે: ઘડિયાળનો સમય લખો, સાચું નામ સ્પર્શ કરો, પછી દાખલ કરો.",
    "Write the time": "સમય લખો",
    "Check both the time and the label on the card.": "કાર્ડ પર સમય અને નામ, બંને તપાસો.",
    "noon": "બપોર",
    "midnight": "અડધી રાત",
    "a.m.": "પૂર્વાહ્ન",
    "p.m.": "અપરાહ્ન",
    "A whole day on one strip, sun and moon.": "એક પટ્ટી પર આખો દિવસ, સૂરજ અને ચાંદો.",
    "Free play. Slide the marker, or tap a picture to see its time.": "મુક્ત રમત. સૂરજ કે ચાંદાને સરકાવો, અથવા કોઈ ચિત્રને સ્પર્શ કરી તેનો સમય જુઓ.",
    "You put every time on the right half of the day.": "તમે દરેક સમયને દિવસના સાચા ભાગ પર મૂક્યો.",
    "Every hour of the day is on the strip now.": "દિવસનો દરેક કલાક હવે પટ્ટી પર છે.",
    "One round for each half of the day.": "દિવસના દરેક અડધા ભાગમાં એક આંટો.",
    "Two rounds of 12 hours make 24 hours.": "12 કલાકના બે આંટા મળીને 24 કલાક થાય છે.",
    "The sun is high at 12 in the day, so it is noon.": "દિવસે 12 વાગ્યે સૂરજ ઉપર હોય છે, તેથી આ બપોર છે.",
    "The moon is out at night, so it is midnight, with no a.m./p.m.": "રાત્રે ચાંદો નીકળે છે, તેથી આ અડધી રાત છે, પૂર્વાહ્ન/અપરાહ્ન નહીં.",
    "Noon is written as a word of its own.": "બપોર એક અલગ શબ્દથી લખાય છે.",
    "After noon is p.m., so it is 5:40 p.m.": "બપોર પછી અપરાહ્ન હોય છે, તેથી આ 5:40 અપરાહ્ન છે.",
    "Before noon is a.m., so it is 7:15 a.m.": "બપોર પહેલાં પૂર્વાહ્ન હોય છે, તેથી આ 7:15 પૂર્વાહ્ન છે.",
    "Lunch is after noon, so it is 1:30 p.m.": "જમવાનું બપોર પછી છે, તેથી આ 1:30 અપરાહ્ન છે.",
    "24 hours": "24 કલાક",
    "2 rounds": "2 આંટા",
    "2 rounds, 24 hours": "2 આંટા, 24 કલાક",
    "Hour hand": "કલાકનો કાંટો",
    "Marker": "સૂરજ કે ચાંદો",
    "Picture card": "ચિત્ર કાર્ડ",
    "Slide the moon first, then press Enter.": "પહેલાં ચાંદાને સરકાવો, પછી દાખલ કરો બટન દબાવો.",
    "Drop the card on a half first, then press Enter.": "પહેલાં કાર્ડને કોઈ ભાગ પર મૂકો, પછી દાખલ કરો બટન દબાવો.",
    "lunch box": "ટિફિન",
  },
};

/* ── the day, in minutes since midnight ───────────────────────────────────────────────────────
   MODEL holds every number the working area and the second-route oracle use. A time is a number of minutes (0 = midnight,
   720 = noon, 1440 = the next midnight); the hour hand, the minute hand, the strip, the sky and the sun or moon all read it. */
const MODEL: any = {
  dayMin: 1440, noonMin: 720, roundMin: 720,
  /* phase 1: every question is answered after the day has been crossed (the sun reaches the far midnight) */
  p1: [{ goal: 1440 }, { goal: 1440 }, { goal: 1440 }],
  /* phase 2: t = a scene shown as it is; t0 = where the marker starts and the child sets it */
  p2: [{ t: 720, kind: "read" }, { t0: 1200, kind: "place" }, { t: 720, kind: "read" }],
  /* phase 3: tq = the time of the situation (new times: 5:40 p.m., 7:15 a.m., 1:30 p.m.) and the card that stands for it */
  p3: [{ tq: 1060, kind: "pick", card: "lamp" }, { tq: 435, kind: "drop", card: "bag" }, { tq: 810, kind: "write", card: "lunchbox" }],
  /* the warm-ups and free play (not questions) */
  warm: { p3: [570, 915] },
  routines: [{ id: "alarm", t: 390 }, { id: "bag", t: 465 }, { id: "lunchbox", t: 760 }, { id: "football", t: 990 }, { id: "plate", t: 1200 }, { id: "bed", t: 1290 }],
};

/* One entry per phase = one mount. Three phases; each has exactly three questions. */
const PHASES = [
  {
    n: 1,
    concept: "A day has twenty-four hours",
    conceptId: "M1.S1.T3.C11", objectiveIds: ["O3"],
    says: ["Turn the hour hand round the clock. How many times does it go round in a day?"],
    steps: [
      { say: "Turn the short red hand, the hour hand, once round the clock.", on: "turn", hint: "Drag the red hand, or tap it." },
      { say: "Turn the red hand round the clock a second time.", on: "turn", hint: "The red hand goes round once more." },
    ],
    ladder: ["Count the rounds, then add up their hours.", "Each round has the same hours, so add them."],
    closing: "The hour hand goes round twice in a day, so a day has 24 hours.",
    learned: "You learned: a day has 24 hours, two rounds of the hour hand.",
    traceback: "The sun and the red hand are sent round the day again, one hour at a time, and stop one hour before the far midnight, so the child finishes the count.",
    items: [
      /* plan MN1: 12 hours a round, two rounds: 24 hours */
      { qid: "M1.S1.T3.C11:MN1", kind: "sweep", say: "Turn the hour hand twice round the clock: how many hours pass in all?", ask: "Hours in two rounds?", answer: 24,
        miss: "One round of the hour hand is 12 hours." },
      /* plan 1: two rounds in a whole day */
      { qid: "M1.S1.T3.C11:1", kind: "sweep", say: "Slide the marker across the whole day: how many rounds does the hour hand make?", ask: "Rounds in a day?", answer: 2,
        miss: "Watch the red hand while the marker slides along." },
      /* plan 5: the train from one midnight to the next: 2 rounds and 24 hours */
      { qid: "M1.S1.T3.C11:5", kind: "sweep", say: "Slide the marker from midnight to midnight: how many rounds, and how many hours?", ask: "Rounds and hours?",
        parts: [{ label: "rounds" }, { label: "hours" }], answer: [2, 24], miss: "The first box is the rounds and the second is the hours." },
    ],
  },
  {
    n: 2,
    concept: "Noon and midnight",
    conceptId: "M1.S1.T3.C12", objectiveIds: ["O3"],
    says: ["Both hands are at the twelve. Is the sun high, or is the moon out?"],
    steps: [
      { say: "Slide the marker along the strip to the very middle.", on: "slide", hint: "Drag the marker, or tap it, to the middle." },
      { say: "Now slide the marker on to the far end of the strip.", on: "slide", hint: "Keep going to the right end." },
    ],
    ladder: ["Say what you see in the sky at that 12.", "Each of these twelves is written as a word."],
    closing: "Noon and midnight both show 12 o'clock: one is by day, one is by night.",
    learned: "You learned: noon and midnight stand alone, with no a.m./p.m.",
    traceback: "The sun is sent along the strip again and stops one hour before the twelve, so the child finishes the slide.",
    items: [
      /* plan MN2: both hands at 12, the sun high: noon (the choice id never appears in a printed line) */
      { qid: "M1.S1.T3.C12:MN2", kind: "read", say: "The cook sees both hands at 12 and the sun is high: is it noon or midnight?", ask: "Which 12 is it?",
        choices: [{ id: "day12", label: "noon" }, { id: "night12", label: "midnight" }], answer: "day12", miss: "Both hands are at 12, so the sky must tell you." },
      /* plan 2: the moon is out: the 12 of the night (answered on the strip: slide the moon, press Enter) */
      { qid: "M1.S1.T3.C12:2", kind: "place", pad: "enter", say: "The moon is out: slide it to the 12 of the night, then press Enter.", ask: "Slide to the 12",
        answer: "night12", winMs: 4400, miss: "Is the sun or the moon out at the 12 you chose?" },
      /* plan 6: a child wrote 12 p.m. at the lunch bell: the word instead */
      { qid: "M1.S1.T3.C12:6", kind: "read", say: "The lunch bell rings at the highest sun: what is this 12 called?", ask: "What is it called?",
        choices: [{ id: "day12", label: "noon" }, { id: "night12", label: "midnight" }], answer: "day12", miss: "Is the sun up when the lunch bell rings?" },
    ],
  },
  {
    n: 3,
    concept: "a.m. and p.m.",
    conceptId: "M1.S1.T3.C13", objectiveIds: ["O4"],
    says: ["Is it before noon or after noon? Drop it on its half."],
    steps: [
      { say: "Slide the marker to a time before the middle mark.", on: "slide", hint: "Drag the marker to the left of the middle." },
      { say: "Now slide the marker to a time after the middle mark.", on: "slide", hint: "Drag the marker to the right of the middle." },
    ],
    ladder: ["Say what the sky looks like at that time of day.", "Blue is the half before noon, and orange is the half after noon."],
    closing: "Morning times end in a.m., and afternoon and evening times end in p.m.",
    learned: "You learned: write a.m. before noon and p.m. after it.",
    traceback: "The sun is carried along the strip from midnight to the noon mark and stops there; the time's own place is drawn only at the win.",
    items: [
      /* plan MN3: choose a.m. or p.m. for the street lamp at 5:40 in the evening */
      { qid: "M1.S1.T3.C13:MN3", kind: "pick", say: "The street lamp switches on at 5:40 in the evening: is that a.m., or p.m.?", ask: "Which half?",
        choices: [{ id: "morn", label: "a.m." }, { id: "eve", label: "p.m." }], answer: "eve", miss: "Is the evening before noon, or after noon?" },
      /* authored fresh (the plan's other phase 3 questions use printed times): drop the card on its half */
      { qid: null, kind: "drop", pad: "enter", say: "Ria packs her bag at 7:15 in the morning: drop the card on its half.", ask: "Drop on its half",
        answer: "morn", miss: "Look at the middle mark: noon is there." },
      /* authored fresh (a plan 4 idea, folded in): complete the time card for an afternoon time, the time typed and the label tapped */
      { qid: null, kind: "write", say: "Lunch is in the afternoon: type the clock's time, tap the label, then Enter.", ask: "Write the time",
        parts: [{ label: "hour" }, { label: "minutes" }], answer: [1, 30], label: "eve", miss: "Check both the time and the label on the card." },
    ],
  },
];

/* ── the maths, checked by `node cli.mjs check` ──────────────────────────────────────────── */

/* the label tapped on the time card (phase 3, question 3): the typed boxes are the slot's, the label is the working area's */
let MN_LABEL: any = { v: null };

const judge = (item: any, v: any) => {
  if (item.kind === "write") { const lab = String(v).split("|")[2]; return judgeSlotParts(item, v) && (lab !== undefined && lab !== "" ? lab : MN_LABEL.v) === item.label; }
  if (item.parts) return judgeSlotParts(item, v);
  if (typeof item.answer === "number") return leadNumber(v) === item.answer;
  return String(v).trim() === String(item.answer);
};

/* oracle: every answer re-derived from the minutes of the day in MODEL (a second route: no judge, no picture, no item.answer) */
const oracle = () => {
  const day = MODEL.dayMin, rnd = MODEL.roundMin;
  const okP1 = MODEL.p1.every((s: any) => s.goal === day && day / rnd === 2 && day / 60 === 24)
    && PHASES[0].items[0].answer === day / 60 && PHASES[0].items[1].answer === day / rnd
    && (PHASES[0].items[2].answer as any)[0] === day / rnd && (PHASES[0].items[2].answer as any)[1] === day / 60;
  const word = (t: number) => (t % day === 0 ? "night12" : t === MODEL.noonMin ? "day12" : "");
  const okP2 = word(MODEL.p2[0].t) === PHASES[1].items[0].answer && word(day) === PHASES[1].items[1].answer && word(0) === PHASES[1].items[1].answer
    && word(MODEL.p2[2].t) === PHASES[1].items[2].answer && word(MODEL.p2[1].t0) === "";
  const half = (t: number) => (t < MODEL.noonMin ? "morn" : "eve");
  const okP3 = half(MODEL.p3[0].tq) === PHASES[2].items[0].answer && half(MODEL.p3[1].tq) === PHASES[2].items[1].answer
    && half(MODEL.p3[2].tq) === PHASES[2].items[2].label
    && Math.floor((MODEL.p3[2].tq % 720) / 60) === (PHASES[2].items[2].answer as any)[0] && MODEL.p3[2].tq % 60 === (PHASES[2].items[2].answer as any)[1];
  return okP1 && okP2 && okP3;
};
/* the most likely wrong answer (the misconception): 12 for a day, the wrong half, the card left unlabelled */
const nearMiss = (item: any) => {
  if (item.kind === "place") return "day12";
  if (item.choices) return item.choices.map((c: any) => c.id).filter((i: any) => i !== item.answer)[0];
  if (item.kind === "drop") return item.answer === "morn" ? "eve" : "morn";
  if (item.kind === "write") return item.answer.join("|") + "|" + (item.label === "eve" ? "morn" : "eve");
  if (item.kind === "sweep") return item.parts ? "1|12" : item.answer === 24 ? 12 : 1;
  if (item.parts) return item.answer.map((x: any, k: number, a: any[]) => (k === a.length - 1 ? x + 1 : x)).join("|");
  return typeof item.answer === "number" ? item.answer + 1 : "~";
};
/* the forms of an answer that no question, hint or ladder line may print (a word answer is an id that is never printed) */
const answerForms = (item: any) => (item.parts ? item.answer.filter((x: number) => x >= 10).flatMap((x: number) => [String(x), indian(x), words(x)])
  : typeof item.answer === "number" ? [String(item.answer), indian(item.answer), words(item.answer)] : []);
const agentKey = (item: any) => (item.kind === "write" ? item.answer.join("|") + "|" + item.label : item.answer);

/* the dev driver (stripped at port) and the agent reach the working area only through HOOK */
const HOOK: any = {};
const solve = (item: any, T: any) => {
  if (T.state().stage === "demo") return HOOK.demo && HOOK.demo();
  if (item.kind === "write") MN_LABEL.v = item.label;
  return T.submit(item.answer);
};
const answer = (item: any, v: any) => (HOOK.set ? HOOK.set(item, v) : undefined);
const check = () => (HOOK.check ? HOOK.check() : undefined);

/* ── the working area ────────────────────────────────────────────────────────────────────────
   64,108, 1472 x 520 shut; 900 x 520 with the wide keypad open. Origin at the area's top-left. keyOnly: nothing under box.key.
   The wall clock stands top left, the day strip runs across the foot with the sky and the sun or moon above it, and the
   time card, its label keys and the picture cards wait in the bottom row. */
const MN_AM = "#5BB8E8", MN_PM = "#F2A531", MN_HR = "#E5531A", MN_MIN = "#1F4E9C", MN_GO = "#2E9E5B", MN_NEUTRAL = "#E9DEC8";
const MN_SK: any = { sun: [159, 160], moon: [147, 160], school: [200, 188], alarm: [138, 160], bag: [161, 180], lunchbox: [160, 115], football: [159, 160], plate: [160, 160], bed: [104, 160] };

const mnClamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const mnPad = (v: number) => (v < 10 ? "0" : "") + v;
const mnHour12 = (t: number) => { const h = Math.floor((((Math.round(t) % 1440) + 1440) % 1440) / 60) % 12; return h === 0 ? 12 : h; };
const mnMin = (t: number) => ((Math.round(t) % 60) + 60) % 60;
/* the strip's magnets: the three twelves catch a marker that is near, everything else snaps to five minutes */
const mnSnap = (t: number, mag = 25) => { const c = mnClamp(t, 0, 1440); for (const m of [0, 720, 1440]) if (Math.abs(c - m) < mag) return m; return Math.round(c / 5) * 5; };
const mnWordOf = (t: number) => (Math.round(t) % 1440 === 0 ? "midnight" : Math.round(t) === 720 ? "noon" : t < 720 ? "a.m." : "p.m.");
const mnPlaceVal = (t: number) => (Math.round(t) === 720 ? "day12" : Math.round(t) % 1440 === 0 ? "night12" : "t:" + Math.round(t));
const mnIsSun = (t: number) => t >= 360 && t < 1080;
const mnNight = (t: number) => (t < 330 ? 1 : t < 420 ? (420 - t) / 90 : t < 1050 ? 0 : t < 1140 ? (t - 1050) / 90 : 1);
const MN_SKY: any[] = [[0, "#1B2A55"], [300, "#26356B"], [345, "#6E5A8E"], [390, "#E9A36B"], [430, "#F5DDA9"], [470, "#BFE3F5"], [600, "#A9DBF2"], [900, "#A9DBF2"], [1020, "#F2B25E"], [1065, "#E58A5B"], [1110, "#8C5A86"], [1170, "#2E3A72"], [1230, "#1B2A55"], [1440, "#1B2A55"]];
const mnSky = (t: number) => {
  const c = mnClamp(t, 0, 1440);
  for (let i = 1; i < MN_SKY.length; i++) if (c <= MN_SKY[i][0]) { const a = MN_SKY[i - 1], b = MN_SKY[i]; return mix(a[1], b[1], (c - a[0]) / (b[0] - a[0])); }
  return MN_SKY[MN_SKY.length - 1][1];
};
/* a text's width in characters: Devanagari and Gujarati combining marks take no room (PATTERNS 18) */
const mnLen = (s: string) => Array.from(String(s)).filter((ch) => { const c = ch.codePointAt(0) || 0; return !((c >= 0x900 && c <= 0x902) || c === 0x93c || (c >= 0x941 && c <= 0x948) || c === 0x94d || (c >= 0x951 && c <= 0x957) || c === 0x962 || c === 0x963 || (c >= 0xa81 && c <= 0xa82) || c === 0xabc || (c >= 0xac1 && c <= 0xac8) || c === 0xacd || c === 0xae2 || c === 0xae3); }).length;
const mnChipFill = (w: string) => (w === "a.m." ? MN_AM : w === "p.m." ? MN_PM : MN_NEUTRAL);

/* a card for each everyday thing: the plain shape is the fallback, the picture is drawn over it (the lamp is drawn in code only) */
function mnPlain(kind: string, cx: number, cy: number, s: number) {
  const h = s / 2;
  if (kind === "alarm") return <g><circle cx={cx} cy={cy + 4} r={h * 0.78} fill="#E8B730" stroke="#8A6A10" strokeWidth={3} /><circle cx={cx} cy={cy + 4} r={h * 0.54} fill="#FFF6DD" /><circle cx={cx - h * 0.55} cy={cy - h * 0.68} r={h * 0.2} fill="#8A6A10" /><circle cx={cx + h * 0.55} cy={cy - h * 0.68} r={h * 0.2} fill="#8A6A10" /></g>;
  if (kind === "bag") return <g><rect x={cx - h * 0.7} y={cy - h * 0.8} width={h * 1.4} height={h * 1.6} rx={14} fill="#E8782B" stroke="#8A3F0F" strokeWidth={3} /><rect x={cx - h * 0.45} y={cy + h * 0.05} width={h * 0.9} height={h * 0.5} rx={8} fill="#F3A15F" stroke="#8A3F0F" strokeWidth={2} /></g>;
  if (kind === "lunchbox") return <g><path d={`M ${cx - h * 0.28} ${cy - h * 0.5} v ${-h * 0.2} h ${h * 0.56} v ${h * 0.2}`} fill="none" stroke="#6B4A22" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" /><rect x={cx - h * 0.8} y={cy - h * 0.5} width={h * 1.6} height={h * 1.05} rx={12} fill="#F08A24" stroke="#8A4A0F" strokeWidth={3} /><rect x={cx - h * 0.8} y={cy - h * 0.5} width={h * 1.6} height={h * 0.42} rx={10} fill="#F7B35E" stroke="#8A4A0F" strokeWidth={3} /><rect x={cx - h * 0.5} y={cy - h * 0.12} width={h * 0.22} height={h * 0.26} rx={4} fill="#FFE27A" stroke="#8A4A0F" strokeWidth={2} /><rect x={cx + h * 0.28} y={cy - h * 0.12} width={h * 0.22} height={h * 0.26} rx={4} fill="#FFE27A" stroke="#8A4A0F" strokeWidth={2} /></g>;
  if (kind === "football") return <g><circle cx={cx} cy={cy} r={h * 0.78} fill="#F08A24" stroke="#2B2B2B" strokeWidth={3} /><circle cx={cx} cy={cy} r={h * 0.26} fill="#2B2B2B" /></g>;
  if (kind === "plate") return <g><circle cx={cx} cy={cy} r={h * 0.82} fill="#E2733C" stroke="#8A3F0F" strokeWidth={3} /><circle cx={cx} cy={cy} r={h * 0.52} fill="#F3A478" /></g>;
  if (kind === "bed") return <g><rect x={cx - h * 0.5} y={cy - h * 0.8} width={h} height={h * 1.6} rx={10} fill="#D9A55F" stroke="#7A4A14" strokeWidth={3} /><rect x={cx - h * 0.4} y={cy - h * 0.7} width={h * 0.8} height={h * 0.45} rx={8} fill="#F4C9A8" /><rect x={cx - h * 0.4} y={cy - h * 0.15} width={h * 0.8} height={h * 0.85} rx={6} fill="#E8B730" /></g>;
  /* the street lamp: always code (a lantern on a pole with a roof and a foot) */
  return <g><rect x={cx - 4} y={cy - h * 0.18} width={8} height={h * 0.95} rx={3} fill="#5B3A1E" /><rect x={cx - 14} y={cy + h * 0.72} width={28} height={8} rx={3} fill="#5B3A1E" /><rect x={cx - 15} y={cy - h * 0.62} width={30} height={h * 0.44} rx={6} fill="#FFE27A" stroke="#5B3A1E" strokeWidth={3} /><path d={`M ${cx - 19} ${cy - h * 0.62} L ${cx} ${cy - h * 0.88} L ${cx + 19} ${cy - h * 0.62} Z`} fill="#5B3A1E" /></g>;
}
function mnSkinOf(kind: string, cx: number, cy: number, s: number) {
  const d = MN_SK[kind];
  if (!d) return null;
  const k = Math.min(s / d[0], s / d[1]), w = d[0] * k, h = d[1] * k, x = cx - w / 2, y = cy - h / 2;
  if (kind === "alarm") return <Skin name="alarm" x={x} y={y} w={w} h={h} />;
  if (kind === "bag") return <Skin name="bag" x={x} y={y} w={w} h={h} />;
  if (kind === "lunchbox") return <Skin name="lunchbox" x={x} y={y} w={w} h={h} />;
  if (kind === "football") return <Skin name="football" x={x} y={y} w={w} h={h} />;
  if (kind === "plate") return <Skin name="plate" x={x} y={y} w={w} h={h} />;
  if (kind === "bed") return <Skin name="bed" x={x} y={y} w={w} h={h} />;
  return null;
}
function mnCard(kind: string, cx: number, cy: number, s: number, C: any, lift?: boolean) {
  return (
    <g filter={lift ? "url(#fLift)" : "url(#fShadowSoft)"}>
      <rect x={cx - s / 2} y={cy - s / 2} width={s} height={s} rx={RAD.panel} fill="#FFFDF7" stroke={C.rule} strokeWidth={3} />
      <rect x={cx - s / 2 + 3} y={cy - s / 2 + 3} width={s - 6} height={s - 6} rx={RAD.panel - 2} fill="none" stroke="#FFFFFF" strokeWidth={2} opacity={0.8} />
      {mnPlain(kind, cx, cy, s * 0.82)}
      {mnSkinOf(kind, cx, cy, s * 0.82)}
    </g>
  );
}

/* the wall clock, drawn exactly: the hour hand creeps with the minutes, the minute hand turns once an hour */
function mnClock(cx: number, cy: number, R: number, t: number, C: any) {
  const ha = ((((t % 720) + 720) % 720) / 720) * 360, ma = ((((t % 60) + 60) % 60) / 60) * 360;
  const pt = (deg: number, r: number) => ({ x: cx + r * Math.sin((deg * Math.PI) / 180), y: cy - r * Math.cos((deg * Math.PI) / 180) });
  const ticks: any[] = [], nums: any[] = [];
  for (let i = 0; i < 60; i++) {
    const a = pt(i * 6, R - 5), b = pt(i * 6, i % 5 === 0 ? R - 17 : R - 10);
    ticks.push(<line key={"k" + i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={C.ink} strokeWidth={i % 5 === 0 ? 3.5 : 1.8} strokeLinecap="round" opacity={i % 5 === 0 ? 0.9 : 0.6} />);
  }
  for (let i = 1; i <= 12; i++) {
    const p = pt(i * 30, R * 0.72);
    nums.push(<text key={"n" + i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="central" fontSize={T.label} fontWeight={700} fill={C.ink}>{i}</text>);
  }
  const hp = pt(ha, R * 0.42), mp = pt(ma, R * 0.56);   /* the minute hand ends at the numerals' inner edge; the wide hour hand is drawn last, so at 12:00 it still reads */
  return (
    <g filter="url(#fShadowSoft)">
      <circle cx={cx} cy={cy} r={R} fill={C.paper} stroke={C.ink} strokeWidth={5} />
      <circle cx={cx} cy={cy} r={R - 3} fill="none" stroke="#FFFFFF" strokeWidth={2} opacity={0.8} />
      {ticks}
      {nums}
      {/* Minute hand */}
      <line x1={cx} y1={cy} x2={mp.x} y2={mp.y} stroke={MN_MIN} strokeWidth={7} strokeLinecap="round" />
      {/* Hour hand */}
      <line x1={cx} y1={cy} x2={hp.x} y2={hp.y} stroke={MN_HR} strokeWidth={15} strokeLinecap="round" />
      {/* Center cap */}
      <circle cx={cx} cy={cy} r={9} fill={C.ink} />
    </g>
  );
}

/* a pill with a label word (a.m., p.m., noon, midnight), its left edge at x, the digital time's baseline at y */
function mnChip(x: number, y: number, word: string, C: any, tx: any) {
  const cw = Math.max(96, 0.62 * 40 * mnLen(tx(word)) + 36);
  return (
    <g filter="url(#fShadowSoft)">
      <rect x={x} y={y - 46} width={cw} height={60} rx={30} fill={mnChipFill(word)} stroke={C.ink} strokeWidth={2.5} />
      <rect x={x + 2} y={y - 44} width={cw - 4} height={26} rx={14} fill="#FFFFFF" opacity={0.25} />
      <text x={x + cw / 2} y={y - 14} textAnchor="middle" dominantBaseline="central" fontSize={T.prompt} fontWeight={700} fill={shade(C.ink, 0.2)}>{tx(word)}</text>
    </g>
  );
}
/* the digital time: hours vermilion, minutes deep blue, and (when asked) a chip with its label word */
function mnDigital(x: number, y: number, t: number, size: number, C: any, tx: any, chip?: string) {
  const h = mnHour12(t), m = mnPad(mnMin(t));
  const wText = size * 0.6 * (String(h).length + 3);
  return (
    <g>
      <text x={x} y={y} fontSize={size} fontWeight={700}>
        <tspan fill={shade(MN_HR, 0.25)}>{h}</tspan><tspan fill={C.ink}>:</tspan><tspan fill={shade(MN_MIN, 0.2)}>{m}</tspan>
      </text>
      {chip && mnChip(x + wText + 16, y, chip, C, tx)}
    </g>
  );
}

function Work({ phase, n, item, index, stage, wrong, typed, api, MODEL, step, stepOn, box, lang = "en", tx = (v: any) => v }: any) {
  const C = api.C;
  const tl = useTimeline();
  const P = n || 1;
  const free = stage === "free", warm = stage === "demo" || stage === "teach", showAns = stage === "win" || stage === "idle";
  const sc: any = free || warm ? null : (MODEL["p" + P] || [])[index] || null;
  const mag = free || P === 3 ? 9 : 25;   /* free play and phase 3 can set 11:40 to 12:20; phase 2 wants the three twelves to catch the marker */

  /* geometry: laid out ONCE from the open keypad's width (900) and kept at the same size and place whether the keypad is open or shut, so the strip never jumps */
  const L = 780, x0 = 60;
  const RR = 118, cx = x0 - 40 + RR + 4, cy = 124, ax = cx + RR + 40;
  const bandY = 254, bandH = 120, stripY = 384, stripH = 70, rowY = 150, gY = bandY + bandH - 14;
  const mx = (t: number) => x0 + (L * t) / 1440;
  const my = (t: number) => bandY + bandH - 44 - 28 * Math.sin((Math.PI * t) / 1440);
  const handPt = (t: number, r: number) => { const a = ((((t % 720) + 720) % 720) / 720) * 2 * Math.PI; return { x: cx + r * Math.sin(a), y: cy - r * Math.cos(a) }; };
  const tipOf = (t: number) => handPt(t, RR * 0.42);
  const cardPos = (half: string) => ({ x: x0 + L * (half === "morn" ? 0.4 : 0.6), y: bandY + 58 });

  /* the question's own state, rebuilt whenever the question (or the warm-up, or free play) changes */
  const qk = P + ":" + (free ? "f" : warm ? "w" : index);
  const startT = () => (free ? 480 : warm ? (P === 3 ? 720 : 0) : sc ? (sc.t0 !== undefined ? sc.t0 : sc.t !== undefined ? sc.t : sc.tq !== undefined ? sc.tq : 0) : 0);
  const fresh = (): any => ({ qk, t: startT(), moved: false, placed: null, label: null, touched: false, rp: null, missed: false, picked: null });
  const [raw, setRaw] = useState<any>(fresh);
  const S = raw.qk === qk ? raw : fresh();
  const R = useRef<any>(S);
  R.current = S;
  const put = (p: any) => {
    R.current = { ...(R.current.qk === qk ? R.current : fresh()), ...p };
    setRaw((prev: any) => ({ ...(prev.qk === qk ? prev : fresh()), ...p }));
  };
  const busy = useRef(false);
  const liveRef = useRef<any>(null);

  /* a hand, a marker or a card dragged on the picture: the clock and the strip follow the pointer (useDrag's own `drag`: payload, x, y, moved);
     a time is judged on Enter, never on release */
  const lastDid = useRef(0);
  const dragGen = useRef(0);
  /* one guide step is credited once: a second credit within 150 ms (a double Enter, a double click) is ignored */
  const did1 = (name: string) => { const now = Date.now(); if (now - lastDid.current < 150) return; lastDid.current = now; api.did(name); };
  /* the time the red hand shows when the pointer is at (px, py): the turn nearest the last time, never more than half a round away */
  const handT = (px: number, py: number, last: number) => {
    if (Math.hypot(px - cx, py - cy) < 16) return last;
    const base = (((Math.atan2(px - cx, -(py - cy)) * 180) / Math.PI + 360) % 360) * 2;
    let best = base, bd = 1e9;
    for (const k of [-720, 0, 720, 1440]) { const c = base + k, d = Math.abs(c - last); if (d < bd) { bd = d; best = c; } }
    return mnSnap(best, 12);
  };
  const dr = useDrag((payload: any, p: any, moved: boolean) => {
    if (R.current.rp !== null) return;   /* nothing the child does while the correction replays is kept */
    put({ touched: true });
    dragGen.current++;
    if (payload === "sun") {
      if (!moved) { tapSun(); return; }
      const t = mnSnap(((p.x - x0) / L) * 1440, mag);
      put({ t, moved: true }); api.sfx.tick();
      if (warm) stepDone(t);
    } else if (payload === "hand") {
      if (!moved) { tapHand(); return; }
      const t = handT(p.x, p.y, liveRef.current !== null ? liveRef.current : R.current.t);
      put({ t, moved: true }); api.sfx.tick();
      if (warm && P === 1 && t >= (step === 0 ? 720 : 1440)) did1("turn");
    } else if (payload === "card") {
      if (!moved) return;
      const inBand = p.y > bandY - 10 && p.y < stripY + stripH + 40 && p.x > x0 - 20 && p.x < x0 + L + 20;
      put({ placed: inBand ? (p.x < x0 + L / 2 ? "morn" : "eve") : null });
      api.sfx.settle();
    }
  });
  const dg = dr.drag;
  const dk = dr.keys;
  useEffect(() => { if (dg) put({ touched: true }); }, [!!dg]);
  /* the tapped label is what judge reads: it follows the card (never reset by a state rebuild) */
  useEffect(() => { MN_LABEL.v = S.label === "morn" || S.label === "eve" ? S.label : S.label ? "none" : null; }, [S.label, qk]);

  /* the live time while a hand or a marker is being dragged */
  let dragT: number | null = null;
  if (dg && dg.moved && dg.payload === "sun") dragT = mnSnap(((dg.x - x0) / L) * 1440, mag);
  if (dg && dg.moved && dg.payload === "hand") dragT = handT(dg.x, dg.y, liveRef.current !== null ? liveRef.current : S.t);
  liveRef.current = dg && dg.payload === "hand" ? dragT : null;

  /* which time the clock, the strip and the sun show */
  let tShow: number;
  if (S.rp !== null) tShow = S.rp;
  else if (showAns && P === 1) tShow = 1440;   /* the win always shows the whole day: all 24 hours, both hands at 12 */
  else if (sc && sc.t !== undefined) tShow = sc.t;
  else if (sc && sc.tq !== undefined) tShow = sc.tq;
  else tShow = dragT !== null ? dragT : S.t;

  const markerOn = free || warm || P < 3 || S.rp !== null || (showAns && P === 3);
  const sunDrag = free || (warm && P >= 2) || (stage === "ask" && !showAns && (P === 1 || (sc && sc.kind === "place")));
  const handDrag = free || (P === 1 && (warm || stage === "ask") && !showAns);
  const isEnterQ = stage === "ask" && item && item.pad === "enter";
  const ready = isEnterQ && ((item.kind === "place" && S.moved) || (item.kind === "drop" && S.placed !== null));
  const needsAct = stage === "ask" && ((P === 1 && S.t < 1440) || (isEnterQ && !ready));
  /* the one invite: on the thing the question names, again after a miss */
  const inviteOn = stage === "ask" && !showAns && needsAct && (!S.touched || S.missed);

  /* ── the acts: a hand pushes the marker along the strip, or the red hand round the clock ── */
  const pendingGlide = useRef<any>(null);
  const glide = (toT: number, via: string): Promise<boolean> => {
    const t0 = R.current.t;
    if (busy.current) { if (stage === "free") pendingGlide.current = { toT, via }; return Promise.resolve(false); }
    if (Math.abs(toT - t0) < 1) return Promise.resolve(false);
    const k = Math.max(3, Math.ceil(Math.abs(toT - t0) / 30));
    const ts = Array.from({ length: k }, (_: any, i: number) => t0 + ((toT - t0) * (i + 1)) / k);
    const pt = (tt: number) => (via === "clock" ? tipOf(tt) : { x: mx(tt), y: my(tt) });
    busy.current = true;
    return api.act({ tool: "hand", moves: "push", ms: Math.round(700 + (500 * Math.abs(toT - t0)) / 1440), from: pt(t0), at: ts.map(pt), onPoint: (i: number) => put({ t: ts[i] }) }).then((ok: boolean) => {
      busy.current = false;
      if (ok) { put({ t: toT, moved: true }); api.sfx.settle(); }
      const nx = pendingGlide.current; pendingGlide.current = null;
      if (nx) glide(nx.toT, nx.via);
      return ok;
    });
  };
  const stepDone = (t: number) => {
    if (P === 2) did1(step === 0 ? (t === 720 ? "slide" : "slide-more") : (t === 1440 ? "slide" : "slide-more"));
    if (P === 3) did1(step === 0 ? (t > 0 && t < 720 ? "slide" : "slide-more") : (t > 720 && t < 1440 ? "slide" : "slide-more"));
  };
  /* one click of the awaited control does the CURRENT step, and only that step (also Enter, the agent's check and the dev solve) */
  const act = (on: any) => {
    if (!on || busy.current || R.current.rp !== null || Date.now() - lastDid.current < 150) return;
    const t = R.current.t, k = step || 0;
    if (P === 1) {
      const to = k === 0 ? 720 : 1440;
      if (t >= to) { did1("turn"); return; }
      glide(to, "clock").then((ok: boolean) => { if (ok) did1("turn"); });
    } else if (P === 2) {
      const to = k === 0 ? 720 : 1440;
      if (k === 0 ? t === 720 : t >= 1440) { did1("slide"); return; }
      glide(to, "strip").then((ok: boolean) => { if (ok) did1("slide"); });
    } else if (P === 3) {
      if ((k === 0 && t > 0 && t < 720) || (k === 1 && t > 720 && t < 1440)) { did1("slide"); return; }
      glide(k === 0 ? 570 : 915, "strip").then((ok: boolean) => { if (ok) did1("slide"); });
    }
  };
  const lastTap = useRef(0);
  const doubleTap = () => { const now = Date.now(); if (now - lastTap.current < 300) return true; lastTap.current = now; return false; };
  const tapSun = () => {
    if (R.current.rp !== null || doubleTap()) return;
    if (warm) act(stepOn);
    else if (stage === "ask" && P === 1) glide(1440, "strip");
  };
  const tapHand = () => {
    if (R.current.rp !== null || doubleTap()) return;
    if (warm) act(stepOn);
    else if (stage === "ask" && P === 1) glide(R.current.t < 720 ? 720 : 1440, "clock");
    else if (free) glide(R.current.t >= 1440 ? 0 : Math.min(1440, R.current.t + 60), "clock");
  };
  const placeCard = (half: string) => {
    if (busy.current || stage !== "ask" || R.current.rp !== null) return;
    put({ touched: true });
    const gen = ++dragGen.current;
    const from = R.current.placed ? cardPos(R.current.placed) : { x: ax + 56, y: 70 }, target = cardPos(half);
    busy.current = true;
    api.act({ tool: "hand", moves: "push", from, at: [target], to: target }).then((ok: boolean) => {
      busy.current = false;
      if (ok && dragGen.current === gen) { put({ placed: half }); api.sfx.settle(); }   /* a drag made meanwhile keeps the child's own drop */
    });
  };
  /* keyboard: arrows move the marker (30 min) or the hour hand (1 h), or put the card on its half */
  const keysOf = (payload: string) => ({
    onKeyDown: (e: any) => {
      /* a piece that has done its part lets Enter pass to the window, so a keyboard child can answer (PATTERNS 5b) */
      if (e.key === "Enter" && ((payload === "card" && R.current.placed) || (payload === "sun" && isEnterQ && R.current.moved))) return;
      const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (dir && R.current.rp === null) {
        if (payload === "sun" && sunDrag) {
          e.preventDefault(); e.stopPropagation();
          const t = mnSnap(R.current.t + dir * 30, mag);
          put({ t, moved: true, touched: true });
          if (warm) stepDone(t);
          return;
        }
        if (payload === "hand" && handDrag) {
          e.preventDefault(); e.stopPropagation();
          const t = mnSnap(R.current.t + dir * 60, mag);
          put({ t, moved: true, touched: true });
          if (warm && P === 1 && t >= (step === 0 ? 720 : 1440)) did1("turn");
          return;
        }
        if (payload === "card" && sc && sc.kind === "drop") {
          e.preventDefault(); e.stopPropagation();
          dragGen.current++;
          put({ placed: dir > 0 ? "eve" : "morn", touched: true }); api.sfx.settle();
          return;
        }
      }
      dk(payload).onKeyDown(e);
    },
  });

  const nudged = useRef(false);
  api.onEnter(warm && stepOn ? () => act(stepOn)
    : isEnterQ ? () => {
        const r = R.current;
        if (item.kind === "place" && r.moved) api.submit(mnPlaceVal(r.t));
        else if (item.kind === "drop" && r.placed) api.submit(r.placed);
        else if (item.kind === "place") { nudged.current = true; api.say("Slide the moon first, then press Enter."); }
        else { nudged.current = true; api.say("Drop the card on a half first, then press Enter."); }
      }
    : null);
  useEffect(() => { nudged.current = false; }, [qk]);
  useEffect(() => { if (isEnterQ) api.answerReady(!!ready); }, [ready, qk, isEnterQ]);
  /* the nudge said at a refused Enter is put away once the act is done: the question comes back */
  useEffect(() => { if (ready && nudged.current) { nudged.current = false; api.say(item.say); } }, [ready]);

  /* the answer is gated by the act: the keys stay shut until the child has done it (user mode, after a real touch of the board) */
  useEffect(() => { api.lock(!!(needsAct && S.touched)); }, [needsAct, S.touched, qk]);

  /* a warm-up step that is already met when it opens (one long drag did both) */
  useEffect(() => {
    if (!warm || step === null || step === undefined) return;
    if ((P === 1 || P === 2) && step === 1 && S.t >= 1440) { const id = setTimeout(() => did1(P === 1 ? "turn" : "slide"), 520); return () => clearTimeout(id); }
  }, [step, S.t]);

  /* the traceback after a miss: the working is replayed, unmarked, and stops ONE step before the answer; the child finishes it */
  useEffect(() => {
    if (!wrong || stage !== "ask") return;
    api.lock(true);
    const run = (a: number, b: number, k: number, ms: number) => {
      const steps: any[] = [[260, () => put({ rp: a, label: null, placed: null, moved: false, missed: true })]];
      for (let i = 1; i <= k; i++) steps.push([ms, () => put({ rp: a + ((b - a) * i) / k })]);
      steps.push([700, () => {}]);
      return steps;
    };
    let steps: any[];
    if (P === 1) steps = run(0, 1380, 23, 80);
    else if (P === 2) steps = sc && sc.kind === "place" ? run(1200, 1380, 6, 160) : run(0, 660, 11, 150);
    else steps = run(0, 720, 12, 150);
    tl.run(steps, () => {
      put(P === 1 || (sc && sc.kind === "place") ? { rp: null, t: 1380 } : { rp: null });   /* the strip (or the moon) stays one hour short, so the child finishes it */
      const r = R.current, again = P === 1 ? r.t < 1440 : isEnterQ && !((item.kind === "place" && r.moved) || (item.kind === "drop" && r.placed));
      api.lock(!!(again && r.touched));
    });
  }, [wrong]);
  useEffect(() => () => tl.stop(), [qk]);

  /* a one-sentence win line for every question (the closing replaces the last of a phase) */
  useEffect(() => {
    if (stage !== "win") return;
    if (P === 1 && index === 0) api.say("Every hour of the day is on the strip now.");
    if (P === 1 && index === 1) api.say("One round for each half of the day.");
    if (P === 1 && index === 2) api.say("Two rounds of 12 hours make 24 hours.");
    if (P === 2 && index === 0) api.say("The sun is high at 12 in the day, so it is noon.");
    if (P === 2 && index === 1) api.say("The moon is out at night, so it is midnight, with no a.m./p.m.");
    if (P === 2 && index === 2) api.say("Noon is written as a word of its own.");
    if (P === 3 && index === 0) api.say("After noon is p.m., so it is 5:40 p.m.");
    if (P === 3 && index === 1) api.say("Before noon is a.m., so it is 7:15 a.m.");
    if (P === 3 && index === 2) api.say("Lunch is after noon, so it is 1:30 p.m.");
  }, [stage]);

  /* what the agent and the dev driver do on the working area: check() only does the act when the agent has not answered yet */
  HOOK.demo = () => act(stepOn);
  HOOK.check = () => {
    if (stage !== "ask" || !item) return undefined;
    const r = R.current;
    if (P === 1) put({ t: 1440 });
    else if (item.kind === "place") { if (!r.moved) put({ t: 1440, moved: true }); }
    else if (item.kind === "drop") { if (r.placed === null) put({ placed: item.answer }); }
    return undefined;
  };
  HOOK.set = (it: any, v: any) => {
    if (it.kind === "write") {
      const lab = String(v).split("|")[2], l = ["morn", "eve", "noon", "night"].includes(lab) ? lab : null;
      MN_LABEL.v = l === "morn" || l === "eve" ? l : l ? "none" : null; put({ label: l }); return undefined;
    }
    if (it.kind === "place") { const m = /^t:(\d+)$/.exec(String(v)); put({ t: v === "day12" ? 720 : v === "night12" ? 1440 : m ? Number(m[1]) : 1440, moved: true }); return true; }
    if (it.kind === "drop") { put({ placed: String(v) }); return true; }
    return undefined;
  };
  api.share({ sun: Math.round(tShow), hour: mnHour12(tShow), minute: mnMin(tShow), rounds: Math.floor(tShow / 720), placed: S.placed, label: S.label, plainClock: false, complete: stage === "idle" });

  /* ── the picture ── */
  const sky = mnSky(tShow), night = mnNight(tShow), sunUp = mnIsSun(tShow);
  const halfOfT = Math.round(tShow) % 1440 === 0 || Math.round(tShow) === 720 ? "" : tShow < 720 ? "morn" : "eve";
  const cellsOn = P >= 2 || free;
  const strip: any[] = [];
  for (let i = 0; i < 24; i++) {
    const col = i < 12 ? MN_AM : MN_PM, cw = L / 24, cxx = x0 + i * cw;
    const f = cellsOn ? 1 : mnClamp((tShow - i * 60) / 60, 0, 1);
    strip.push(<g key={"c" + i}>
      <rect x={cxx} y={stripY} width={cw} height={stripH} fill={C.paper} />
      {f > 0 && <rect x={cxx} y={stripY} width={cw * f} height={stripH} fill={col} />}
      <rect x={cxx} y={stripY} width={cw} height={stripH} fill="none" stroke={C.ink} strokeWidth={2.2} />
    </g>);
  }
  const showWords = P === 3 || free || (P === 2 && (warm || showAns));
  const wordFs = lang === "en" ? T.label : T.prompt;
  const word = (txt: string, x: number, anchor: string) => (
    <text x={x} y={stripY + stripH + 46} textAnchor={anchor} fontSize={wordFs} fontWeight={700} fill={C.ink} stroke="#FFFDF7" strokeWidth={5} paintOrder="stroke">{tx(txt)}</text>
  );
  /* the a.m. and p.m. labels sit on a pill of their own colour, so no cell divider or tick runs through the letters */
  const halfLabel = (txt: string, cxl: number, col: string) => {
    const w = Math.max(96, Math.round(mnLen(tx(txt)) * 0.62 * T.prompt) + 40);
    return <g>
      <rect x={cxl - w / 2} y={stripY + stripH / 2 - 27} width={w} height={54} rx={27} fill={tint(col, 0.55)} stroke={C.ink} strokeWidth={2.5} />
      <text x={cxl} y={stripY + stripH / 2 + 1} textAnchor="middle" dominantBaseline="central" fontSize={T.prompt} fontWeight={700} fill={C.ink}>{tx(txt)}</text>
    </g>;
  };
  const label = (id: string, w: number, nx: number) => ({ id, w, x: nx });
  const lampAt = (x: number) => (
    <g>
      <circle cx={x} cy={gY - 56} r={46} fill="url(#mn-glow)" opacity={night} />
      <rect x={x - 3} y={gY - 48} width={6} height={50} rx={2} fill="#5B3A1E" />
      <rect x={x - 11} y={gY - 66} width={22} height={20} rx={7} fill="#FFE27A" stroke="#5B3A1E" strokeWidth={2.5} />
    </g>
  );
  const typedP = slotPartsOf(typed, 2);
  /* the label chip beside the digital time: free play and the phase 3 warm-up name every time; the phase 2 warm-up names only the twelves;
     a twelve never takes a.m. or p.m., so no question card shows one (the phase 2 win names the twelve in a reveal chip) */
  const chipFor = P === 3 ? (free || warm ? mnWordOf(tShow) : undefined)
    : P === 2 && warm ? (Math.round(tShow) % 720 === 0 ? mnWordOf(tShow) : undefined) : undefined;
  /* the label keys and the card's label chip: English keeps its sizes; Hindi and Gujarati words are longer, so their keys and chip grow with the word at the micro size */
  const kf = lang === "en" ? T.label : T.micro;
  const lblWords = ["a.m.", "p.m.", "noon", "midnight"];
  const keyW = lblWords.map((w, j) => (lang === "en" ? [96, 96, 112, 160][j] : Math.max([96, 96, 112, 160][j], Math.round(mnLen(tx(w)) * 0.62 * kf) + 30)));
  const keyX = [0, keyW[0] + 10, keyW[0] + keyW[1] + 20, keyW[0] + keyW[1] + keyW[2] + 30];
  const chipW = lang === "en" ? 108 : Math.max(108, ...lblWords.map((w) => Math.round(mnLen(tx(w)) * 0.62 * kf) + 34));
  const tcardW = 222 + chipW;
  const tagFs = lang === "en" ? T.prompt : T.label;
  const p1Tag = index === 0 ? tx("24 hours") : index === 1 ? tx("2 rounds") : tx("2 rounds, 24 hours");
  const p1TagW = Math.max(240, Math.round(mnLen(p1Tag) * 0.62 * tagFs) + 56);
  const p3TagTxt = sc && sc.tq !== undefined ? mnHour12(sc.tq) + ":" + mnPad(mnMin(sc.tq)) + " " + tx(mnWordOf(sc.tq)) : "";
  const p3TagW = Math.max(240, Math.round(mnLen(p3TagTxt) * 0.62 * tagFs) + 56);
  const p3TagX = ax + (sc && sc.kind === "write" ? 0 : 130);
  const cardLabel = S.label || (showAns && item && item.kind === "write" ? item.label : null);

  return (
    <g>
      <defs>
        <radialGradient id="mn-glow"><stop offset="0" stopColor="#FFE27A" stopOpacity="0.95" /><stop offset="1" stopColor="#FFE27A" stopOpacity="0" /></radialGradient>
        <clipPath id="mn-band"><rect x={x0 - 40} y={bandY} width={L + 80} height={bandH} rx={16} /></clipPath>
      </defs>

      {/* the wall clock: hour hand vermilion, minute hand deep blue; both follow the sun */}
      {mnClock(cx, cy, RR, tShow, C)}
      {handDrag && <g {...control("turn", tx("Hour hand"))} {...dr.bind("hand")} {...keysOf("hand")} style={{ cursor: "grab" }}>
        <line x1={cx} y1={cy} x2={tipOf(tShow).x} y2={tipOf(tShow).y} stroke="transparent" strokeWidth={48} strokeLinecap="round" />
        <circle cx={tipOf(tShow).x} cy={tipOf(tShow).y} r={40} fill="transparent" />
      </g>}

      {/* the time beside the clock; before the label is asked for there is none */}
      {(P === 1 || P === 2 || (P === 3 && (free || warm || (sc && sc.kind !== "write")))) && mnDigital(ax + (P === 3 && sc ? 140 : 0), 86, tShow, 72, C, tx, chipFor)}
      {P === 2 && sc && showAns && <g data-reveals="answer">{mnChip(ax + 72 * 0.6 * 5 + 16, 86, mnWordOf(sc.t !== undefined ? sc.t : tShow), C, tx)}</g>}
      {P === 3 && sc && sc.card && !(isEnterQ && item.kind === "drop") && mnCard(sc.card, ax + 56, sc.card === "lunchbox" ? 62 : 70, sc.card === "lunchbox" ? 92 : 108, C)}
      {P === 3 && sc && sc.card === "lunchbox" && <text x={ax + 56} y={134} textAnchor="middle" fontSize={T.label} fontWeight={700} fill={C.ink} stroke="#FFFDF7" strokeWidth={4} paintOrder="stroke">{tx("lunch box")}</text>}
      {/* the sky over the strip: it follows the sun; the school and the street lamps stand on the ground */}
      <g clipPath="url(#mn-band)">
        <rect x={x0 - 40} y={bandY} width={L + 80} height={bandH} fill={sky} />
        <rect x={x0 - 40} y={gY} width={L + 80} height={14} fill="#8DA64B" />
        {lampAt(x0 + 24)}{lampAt(x0 + L - 52)}
        <g filter="url(#fShadowSoft)">
          <rect x={x0 + L * 0.12 - 44} y={gY - 70} width={88} height={72} rx={6} fill="#EFD9B0" stroke="#8A5A2B" strokeWidth={3} />
          <Skin name="school" x={x0 + L * 0.12 - 52} y={gY - 90} w={104} h={98} />
        </g>
      </g>
      <rect x={x0 - 40} y={bandY} width={L + 80} height={bandH} rx={16} fill="none" stroke={C.ink} strokeWidth={4} filter="url(#fShadowSoft)" />

      {/* phase 3, question 2: the card the child drops on its half, drawn above the sky so it is always seen; it can be picked up again */}
      {P === 3 && sc && sc.kind === "drop" && (() => {
        const dragging = dg && dg.payload === "card";
        const pos = dragging ? { x: dg.x, y: dg.y } : S.placed ? cardPos(S.placed) : { x: ax + 56, y: 70 };
        return <g {...control("card", tx("Picture card"))} {...dr.bind("card")} {...keysOf("card")} style={{ cursor: "grab" }}>
          <rect x={pos.x - 54} y={pos.y - 54} width={108} height={108} fill="transparent" />
          {mnCard(sc.card, pos.x, pos.y, S.placed && !dragging ? 88 : 108, C, !!dragging)}
        </g>;
      })()}

      {/* the sun by day, the moon by night: one marker, dragged along the sky */}
      {markerOn && <g filter="url(#fShadowSoft)" {...(sunDrag ? { ...control("slide", tx("Marker")), ...dr.bind("sun"), ...keysOf("sun"), style: { cursor: "grab" } } : {})}>
        {sunDrag && <circle cx={mx(tShow)} cy={my(tShow)} r={46} fill="transparent" />}
        {(showAns && P === 3 && !free) && <circle cx={mx(tShow)} cy={my(tShow)} r={42} fill="none" stroke={MN_GO} strokeWidth={7} />}
        <circle cx={mx(tShow)} cy={my(tShow)} r={34} fill={mnIsSun(tShow) ? "#F6C945" : "#F4E9C4"} stroke="#00000033" strokeWidth={2} />
        {mnIsSun(tShow) ? <Skin name="sun" x={mx(tShow) - 34} y={my(tShow) - 34} w={68} h={68} /> : <Skin name="moon" x={mx(tShow) - 31} y={my(tShow) - 34} w={62} h={68} />}
      </g>}

      {/* the day strip: 24 hours, the left half sky blue (a.m.), the right half amber (p.m.) */}
      <g filter="url(#fShadowSoft)">
        {strip}
        <rect x={x0} y={stripY} width={L} height={stripH} rx={6} fill="none" stroke={C.ink} strokeWidth={4.5} />
      </g>
      {(free || warm || stage === "ask") && P === 3 && halfOfT && !(sc && sc.tq !== undefined) &&
        <rect x={halfOfT === "morn" ? x0 : x0 + L / 2} y={stripY - 3} width={L / 2} height={stripH + 6} rx={6} fill="none" stroke={C.ink} strokeWidth={7} />}
      <line x1={x0} y1={stripY - 6} x2={x0} y2={stripY + stripH + 4} stroke={C.ink} strokeWidth={6} />
      <line x1={x0 + L / 2} y1={stripY - 6} x2={x0 + L / 2} y2={stripY + stripH + 4} stroke={C.ink} strokeWidth={6} />
      <line x1={x0 + L} y1={stripY - 6} x2={x0 + L} y2={stripY + stripH + 4} stroke={C.ink} strokeWidth={6} />
      {/* at the win: the half the time belongs to and the time's own place (under the labels) */}
      {showAns && P === 3 && sc && <g data-reveals="answer">
        <rect x={halfOfT === "morn" ? x0 : x0 + L / 2} y={stripY - 3} width={L / 2} height={stripH + 6} rx={6} fill="none" stroke={MN_GO} strokeWidth={8} />
        <line x1={mx(sc.tq)} y1={bandY + bandH - 6} x2={mx(sc.tq)} y2={stripY + stripH + 4} stroke={C.ink} strokeWidth={5} strokeDasharray="10 7" />
      </g>}
      {P === 3 && <g data-scale="halves">{halfLabel("a.m.", x0 + L / 4, MN_AM)}{halfLabel("p.m.", x0 + (3 * L) / 4, MN_PM)}</g>}
      {showWords && (P === 2 && !free && !warm
        ? <g data-reveals="answer">{word("midnight", x0, "start")}{word("noon", x0 + L / 2, "middle")}{word("midnight", x0 + L, "end")}</g>
        : <g data-scale="words">{word("midnight", x0, "start")}{word("noon", x0 + L / 2, "middle")}{word("midnight", x0 + L, "end")}</g>)}
      {/* the answer tag, only at the win; its pill is as wide as its words */}
      {showAns && P === 1 && <g data-reveals="answer" filter="url(#fShadowSoft)">
        <rect x={ax} y={rowY} width={p1TagW} height={64} rx={32} fill={shade(MN_GO, 0.25)} stroke="#FFFFFF" strokeWidth={2} />
        <text x={ax + p1TagW / 2} y={rowY + 34} textAnchor="middle" dominantBaseline="central" fontSize={tagFs} fontWeight={700} fill="#FFFFFF">{p1Tag}</text>
      </g>}
      {showAns && P === 3 && sc && <g data-reveals="answer" filter="url(#fShadowSoft)">
        <rect x={p3TagX} y={rowY} width={p3TagW} height={64} rx={32} fill={shade(MN_GO, 0.25)} stroke="#FFFFFF" strokeWidth={2} />
        <text x={p3TagX + p3TagW / 2} y={rowY + 34} textAnchor="middle" dominantBaseline="central" fontSize={tagFs} fontWeight={700} fill="#FFFFFF">{p3TagTxt}</text>
      </g>}

      {/* phase 3, question 3: the time card, its label keys (a.m., p.m., and the two words that take no label) */}
      {P === 3 && sc && sc.kind === "write" && <g>
        <g filter="url(#fShadowSoft)">
          <rect x={ax + 130} y={24} width={tcardW} height={72} rx={RAD.panel} fill={C.paper} stroke={C.rule} strokeWidth={3} />
          <rect x={ax + 144} y={34} width={70} height={52} rx={10} fill="#FFFFFF" stroke={C.ink} strokeWidth={2.5} />
          <rect x={ax + 242} y={34} width={96} height={52} rx={10} fill="#FFFFFF" stroke={C.ink} strokeWidth={2.5} />
          <text x={ax + 179} y={60} textAnchor="middle" dominantBaseline="central" fontSize={T.speech} fontWeight={700} fill={shade(MN_HR, 0.25)}>{typedP[0]}</text>
          <text x={ax + 228} y={58} textAnchor="middle" dominantBaseline="central" fontSize={T.speech} fontWeight={700} fill={C.ink}>:</text>
          <text x={ax + 290} y={60} textAnchor="middle" dominantBaseline="central" fontSize={T.speech} fontWeight={700} fill={shade(MN_MIN, 0.2)}>{typedP[1]}</text>
          {cardLabel && <g>
            <rect x={ax + 348} y={34} width={chipW} height={52} rx={26} fill={mnChipFill(cardLabel === "morn" ? "a.m." : cardLabel === "eve" ? "p.m." : "noon")} stroke={C.ink} strokeWidth={2.5} />
            <text x={ax + 348 + chipW / 2} y={60} textAnchor="middle" dominantBaseline="central" fontSize={kf} fontWeight={700} fill={C.ink}>{tx(cardLabel === "morn" ? "a.m." : cardLabel === "eve" ? "p.m." : cardLabel === "noon" ? "noon" : "midnight")}</text>
          </g>}
        </g>
        {!showAns && [label("morn", keyW[0], 0), label("eve", keyW[1], 1), label("noon", keyW[2], 2), label("night", keyW[3], 3)].map((k: any, j: number) => {
          const kx0 = ax + keyX[j], sel = S.label === k.id;
          const txt = k.id === "morn" ? "a.m." : k.id === "eve" ? "p.m." : k.id === "noon" ? "noon" : "midnight";
          return <Key key={k.id} id={"label-" + k.id} x={kx0} y={rowY} w={k.w} h={72} C={C} primary={sel} tone={sel ? "enter" : "soft"} label={tx(txt)}
            onClick={() => { MN_LABEL.v = k.id === "morn" || k.id === "eve" ? k.id : "none"; put({ label: k.id, touched: true }); api.sfx.tick(); }}>
            <text y={0} textAnchor="middle" dominantBaseline="central" fontSize={kf} fontWeight={700} fill={sel ? "#FFFFFF" : C.ink}>{tx(txt)}</text>
          </Key>;
        })}
      </g>}

      {/* phase 3, question 2: the two halves are also buttons, so the card can be placed by a tap */}
      {isEnterQ && item.kind === "drop" && <g>
        <Hit id="half-morn" x={x0} y={stripY - 8} w={L / 2} h={stripH + 16} label={tx("a.m.")} onPress={() => placeCard("morn")} />
        <Hit id="half-eve" x={x0 + L / 2} y={stripY - 8} w={L / 2} h={stripH + 16} label={tx("p.m.")} onPress={() => placeCard("eve")} />
      </g>}

      {/* free play: the six everyday pictures set their own time on the strip */}
      {free && MODEL.routines.map((r: any, j: number) => {
        const rx = ax + j * 100, fy = 112, on = Math.round(tShow) === r.t;
        return <g key={r.id}>
          <Hit id={"routine-" + r.id} x={rx} y={fy} w={84} h={84} label={r.id} onPress={() => { glide(r.t, "strip"); }} />
          <g pointerEvents="none">{mnCard(r.id, rx + 42, fy + 42, 84, C)}{on && <rect x={rx - 3} y={fy - 3} width={90} height={90} rx={RAD.panel} fill="none" stroke={MN_GO} strokeWidth={6} />}
            {r.id === "lunchbox" && <text x={rx + 42} y={fy + 112} textAnchor="middle" fontSize={T.micro} fontWeight={700} fill={C.ink} stroke="#FFFDF7" strokeWidth={4} paintOrder="stroke">{tx("lunch box")}</text>}</g>
        </g>;
      })}

      {/* the one invite: on the thing to touch */}
      {warm && stepOn === "turn" && P === 1 && <Invite x={handPt(tShow, RR * 0.26).x} y={handPt(tShow, RR * 0.26).y} r={30} C={C} />}
      {warm && stepOn === "slide" && <Invite x={mx(tShow)} y={my(tShow)} r={56} C={C} />}
      {inviteOn && P === 1 && index === 0 && <Invite x={handPt(tShow, RR * 0.26).x} y={handPt(tShow, RR * 0.26).y} r={30} C={C} />}
      {inviteOn && P === 1 && index > 0 && <Invite x={mx(tShow)} y={my(tShow)} r={56} C={C} />}
      {inviteOn && sc && sc.kind === "place" && <Invite x={mx(tShow)} y={my(tShow)} r={56} C={C} />}
      {inviteOn && sc && sc.kind === "drop" && <Invite x={ax + 56} y={70} r={72} C={C} />}
    </g>
  );
}

/* the summary page's small drawing of the child's last right answer in a phase: digits and shapes only (no letters to translate) */
function Thumb({ n, result, it, C, w, h, lang = "en", tx = (v: any) => v }: any) {
  const last = result && result.last;
  if (!last) return null;
  const item = it || PHASES[n - 1].items[last.item] || {};
  const sh = 14, sx = 16, sw = w - 32, sy = h - sh - 12;
  const t = n === 3 ? MODEL.p3[last.item].tq : n === 2 ? (item.kind === "place" ? 1440 : 720) : 1440;
  const mk = sx + (sw * t) / 1440, sun = mnIsSun(t);
  const txt = n === 1 ? tx(last.item === 1 ? "2 rounds" : "24 hours") : n === 2 ? tx(mnWordOf(t)) : mnHour12(t) + ":" + mnPad(mnMin(t)) + " " + tx(mnWordOf(t));
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} rx={14} fill={tint(C.panel, 0.55)} stroke={C.rule} strokeWidth={1.5} />
      <text x={w / 2} y={sy / 2 + 1} textAnchor="middle" dominantBaseline="central" fontSize={lang === "en" ? T.label : T.micro} fontWeight={700} fill={C.ink}>{txt}</text>
      <rect x={sx} y={sy} width={sw / 2} height={sh} fill={MN_AM} stroke={C.ink} strokeWidth={1.5} />
      <rect x={sx + sw / 2} y={sy} width={sw / 2} height={sh} fill={MN_PM} stroke={C.ink} strokeWidth={1.5} />
      <circle cx={mk} cy={sy + sh / 2} r={8} fill={sun ? "#F6C945" : "#F4E9C4"} stroke={C.ink} strokeWidth={2} />
    </g>
  );
}

function MorningOrNight(props: any) {
  return (
    <ToolFrame props={props} tool={{ TOOL_ID, MEDIA_ID, TOOL_NAME, CHROME, VOICE, OPENING, FINISH_LINE, FREE_LINE, TR, freePlay: true, Thumb, PHASES, MODEL, Work,
      judge, oracle, nearMiss, answerForms, agentKey, solve, answer, check, fitHost: () => null,
      /* the board layout: the working area is the whole card until the child taps Answer, then the keypad slides in */
      board: true,
      /* KEY ONLY (the new look): no question bar, only its blinking key at the top right; the question lives in the bubble */
      keyOnly: true,
      /* the wide keypad: the picture is laid out from box.w and fits x 64 to 964 while the panel is open */
      bigPad: true,
      /* the Next key: nothing moves on by itself */
      nextKey: true,
      /* NAV DOTS: one small clickable dot per phase */
      navDots: true,
      StartArt, START_HOOK,
      }} />
  );
}

export default MorningOrNight;